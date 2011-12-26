require([
	'order!http://code.jquery.com/jquery-1.6.3.js', 
	'order!underscore', 
	'order!backbone', 
	'order!jquery.ba-throttle-debounce'], 
function() {

var router = new (Backbone.Router.extend({
	routes: {
		'':         'edit',
		':id':      'show'
	},
	edit: function() {
		require(['edit'], function(Edit) {
			var edit = new Edit();
		});
	},
	show: function(id) {
		require(['show'], function(Show) {
			var show = new Show();
		});
	}
}));


$(function() {
	Backbone.history.start({pushState: true});
});

});
