define(['jquery', 'lib/backbone', 'map'], 
function($, Backbone, Map) {

var Show = Backbone.View.extend({
	el: $('#show'),
	initialize: function() {
		var data = this.$el.data();
		this.map = new Map({
			el: this.el,
			center: data,
			marker: true
		});
	}
});

return Show;

});
