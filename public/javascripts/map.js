define(['google!maps/3/sensor=false'], function() {

var Map = Backbone.View.extend({

	defaultLocation: new google.maps.LatLng(47.3, 19.5),

	initialize: function(options) {
		var container = $('<div/>', {css: {width:'100%', height:'100%'}})
			.appendTo(this.el),
			center;
		if(options.center) {
			center = new google.maps.LatLng(
				options.center.lat,
				options.center.lon);
		} else if(google.loader.ClientLocation) {
			center = new google.maps.LatLng(
				google.loader.ClientLocation.latitude,
				google.loader.ClientLocation.longitude);
		} else {
			center = this.defaultLocation;
		}
		var mapOptions =  {
			zoom: (options.center && options.center.zoom) ? options.center.zoom :  8,
			center: center,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		if(options.controlsToRight) {
			$.extend(mapOptions, {
				panControl: false,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_TOP
				}
			});
		}
		this.map = new google.maps.Map(container[0], mapOptions);
		if(options.marker) {
			this.marker = new google.maps.Marker({
				map: this.map
			});
			this.marker.setPosition(center);
		}
	}	
});

return Map;

});
