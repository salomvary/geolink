define(['google!maps/3/sensor=false'], function() {

var Map = Backbone.View.extend({

	defaultLocation: new google.maps.LatLng(47.3, 19.5),

	initialize: function() {
		var container = $('<div/>', {css: {width:'100%', height:'100%'}})
			.appendTo(this.el);
		var center = google.loader.ClientLocation 
			?	new google.maps.LatLng(
				google.loader.ClientLocation.latitude, 
				google.loader.ClientLocation.longitude)
			: this.defaultLocation;
		this.map = new google.maps.Map(container[0], {
			zoom: 8,
			center: center,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
	}	
});

return Map;

});
