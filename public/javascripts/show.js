app.Show = Backbone.View.extend({
	el: $('#show'),
	initialize: function() {
		var data = this.el.data();
		this.map = new google.maps.Map(this.el[0], {
			zoom: data.zoom,
			center: new google.maps.LatLng(data.lat, data.lon),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
	}
});

$(function() {
	app.show = new app.Show();
});
