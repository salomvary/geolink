app.Edit = Backbone.View.extend({
	el: $('#edit'),
	events: {
		'keypress input[name=search]': 'search'
	},
	initialize: function() {
		this.map = new google.maps.Map(this.$('.map')[0], {
			zoom: 8,
			center: new google.maps.LatLng(47.3, 19.5),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		this.geocoder = new google.maps.Geocoder();
		this.geocoded = $.proxy(this, 'geocoded');
		this.form = this.$('form')[0];
	},
	search: $.debounce(250, function(event) {
		var val = $.trim($(event.target).val());
		if(val.length) {
			this.geocoder.geocode({address: val}, this.geocoded);
		} else {
			this.el.removeClass('error warn ok');
		}
	}),
	setForm: function(latlon) {
		this.form['location[zoom]'].value = this.map.getZoom();
		this.form['location[lat]'].value = latlon.lat();
		this.form['location[lon]'].value = latlon.lng();
	},
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
					map: this.map,
					draggable: true
				});
				google.maps.event.addListener(this.marker, 'dragend',
					$.proxy(this, 'dragged'));

			}
			var geometry = results[0].geometry;
			this.marker.setPosition(geometry.location);
			this.map.fitBounds(geometry.viewport);
			this.setForm(geometry.location);
		} else {
			this.el
				.removeClass('warn ok')
				.addClass('error');
		}
	},
	dragged: function(event) {
		this.setForm(event.latLng);
	}
});


$(function() {
	app.edit = new app.Edit();
});
