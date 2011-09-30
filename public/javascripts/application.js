var app = {};

app.router = new (Backbone.Router.extend({
	routes: {
		'':               'edit',
		'locations/:id':  'show'
	},
	edit: function() {
		app.edit = new app.Edit();
	},
	show: function(id) {
		app.show = new app.Show();
	}
}));

$(function() {
	Backbone.history.start({pushState: true});
});
