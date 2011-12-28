require.config({
	paths: {
		jquery: 'http://code.jquery.com/jquery-1.7.1',
		underscore: 'lib/underscore' //backbone.js refers to it
	}
});

require(['jquery', 'lib/backbone'], function($, Backbone) {

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
