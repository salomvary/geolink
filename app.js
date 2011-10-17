
/**
 * Module dependencies.
 */

var express = require('express'),
	mongoose = require('mongoose'),
	db, Location,
	app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
	db = mongoose.connect('mongodb://localhost/geolink-development');
});

app.configure('test', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/geolink-test');
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

Location = require('./models.js').Location(db);

// Routes

app.get('/', function(req, res) {
  res.render('locations/create', {
    js: 'edit',
    title: 'Express'
  });
});

app.post('/locations', function(req, res) {
	var location = new Location(req.body);
	location.save(function(){
		if(req.is('json')) {
			res.send(location.toObject());
		} else {
			res.send('created '+location.lat +' '+ location.lon);
		}
	});
});

app.put('/locations/:id', function(req, res) {
	Location.findById(req.params.id, function(err, location) {
		if(location) {
			location.lat = req.body.lat;
			location.lon = req.body.lon;
			location.zoom = req.body.zoom;
			location.save(function(err){
				if(req.is('json')) {
					res.send(location.toObject());
				} else {
					res.send('updated');
				}
			});
		}
	});
});

app.get('/locations', function(req, res) {
	Location.find({}, function(err, locations) {
    res.render('locations/index', {
      js: null,//FIXME
      locations: locations
    });
  });
});

app.get('/locations/:id.:format?', function(req, res) {
	Location.findOne({_id: req.params.id}, function(err, location) {
		if(location) {
			switch(req.params.format) {
				case 'json':
					res.send(location.toObject());
					break;
				default:
					res.render('locations/show', {
						js:'show',
						location: location
					});
				}
		} else {
			res.send('not found');
		}
	});
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
