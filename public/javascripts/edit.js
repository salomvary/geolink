define(['map'], function(Map) {

app.Location = Backbone.Model.extend({
	urlRoot: '/locations',
	idAttribute: '_id'
});


app.Edit = Backbone.View.extend({
	el: $('#edit'),
	events: {
		'keyup input[name=search]': 'search'
	},
	initialize: function() {
		this.geocoded = $.proxy(this, 'geocoded');
		this.form = this.$('form')[0];
		this.map = new Map({el: this.$('.map')[0]});
		this.geocoder = new google.maps.Geocoder();
	},
	search: $.debounce(250, function(event) {
		var val = $.trim($(event.target).val());
		if(val.length) {
			this.geocoder.geocode({address: val}, this.geocoded);
		} else {
			this.el.removeClass('error warn ok');
		}
	}),
	geocoded: function(results, status) {
		if(status == google.maps.GeocoderStatus.OK) {
			if(results.length == 1) {
				this.el
					.removeClass('warn error')
					.addClass('ok');
			} else {
				this.el
					.removeClass('error ok')
					.addClass('warn');
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
				this.location = new app.Location();
			}
			this.save();
		} else {
			this.el
				.removeClass('warn ok')
				.addClass('error');
		}
	},
	save: function() {
		var position = this.marker.getPosition();
		this.location.set({
			lat: position.lat(),
			lon: position.lng(),
			zoom: this.map.map.getZoom()
		});
		this.location.save();
	}
});

});
