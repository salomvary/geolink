var app = {};

//FIXME json2

require([
	'order!http://code.jquery.com/jquery-1.6.3.js', 
	'order!underscore', 
	'order!backbone', 
	'order!jquery.ba-throttle-debounce', 
	'https://www.google.com/jsapi'], 
function() {

	app.router = new (Backbone.Router.extend({
		routes: {
			'':               'edit',
			'locations/:id':  'show'
		},
		edit: function() {
			require(['edit'], function() {
				app.edit = new app.Edit();
			});
		},
		show: function(id) {
			require(['show'], function() {
				app.show = new app.Show();
			});
		}
	}));

	$(function() {
		Backbone.history.start({pushState: true});
	});

});

app.requireMaps = function(callback) {
	google.load("maps", "3", {other_params: "sensor=false", callback : callback});
};
