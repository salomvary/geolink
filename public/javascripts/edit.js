define(['jquery', 'lib/backbone', 'map','util', 
'lib/jquery.ba-throttle-debounce'], function($, Backbone, Map, util) {

var Location = Backbone.Model.extend({
	urlRoot: '/',
	idAttribute: '_id'
});


var Edit = Backbone.View.extend({
	el: $('#edit'),
	events: {
		'keyup input[name=search]': 'search'
	},
	initialize: function() {
		this.geocoded = $.proxy(this, 'geocoded');
		this.map = new Map({el: this.$('.map')[0], controlsToRight: true});
		this.geocoder = new google.maps.Geocoder();
		this.input = this.$('input[name=search]');
		this.hint = this.$('.input label[for=search]');
		this.url = this.$('input[name=url]');
		this.urlContainer = this.$('.input.url').hide();

		new SelectAll({el: this.url});
	},
	search: $.debounce(250, function(event) {
		var val = $.trim($(event.target).val());
		if(val.length) {
			this.geocoder.geocode({address: val}, this.geocoded);
		} else {
			this.input.removeClass('error warn ok');
			this.hint.hide();
		}
	}),
	geocoded: function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			if(results.length == 1) {
				this.input
					.removeClass('warn error')
					.addClass('ok');
				this.hint.html('<b>☺</b> We found it!')
					.show();
				this.urlContainer.show();
			} else {
				this.input
					.removeClass('error ok')
					.addClass('warn');
				this.hint.html('<b>☺</b> We found more than one!')
					.show();
				this.urlContainer.show();
			}
			if(! this.marker) {
				this.marker = new google.maps.Marker({
					map: this.map.map,
					draggable: true
				});
				google.maps.event.addListener(this.marker, 'dragend',
					$.proxy(this, 'save'));

			}
			var geometry = results[0].geometry;
			this.marker.setPosition(geometry.location);
			this.map.map.fitBounds(geometry.viewport);
			if(! this.location) {
				this.location = new Location();
			}
			this.save();
		} else {
			this.input
				.removeClass('warn ok')
				.addClass('error');
			this.hint.html('<b>☹</b> Nothing found, try something else')
				.show();
		}
	},
	save: function() {
		var position = this.marker.getPosition();
		this.location.set({
			lat: position.lat(),
			lon: position.lng(),
			zoom: this.map.map.getZoom()
		});
		this.location.save(null, {
			success: $.proxy(this, 'saved')
		});
	},
	saved: function(model, resp, xhr) {
		this.url.val(
			util.baseUrl + this.location.urlRoot + model.id);
	}
});

var SelectAll = Backbone.View.extend({
	events: {
		'focus': 'select',
		'click': 'select'
	},
	select: function(e) {
		e.target.focus();
		setTimeout(function() {
			e.target.select();
		}, 1);
	}
});

return Edit;

});
