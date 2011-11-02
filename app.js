
/**
 * Module dependencies.
 */

var express = require('express'),
	mongoose = require('mongoose'),
	sys = require('sys'),	
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
	db = mongoose.connect('mongodb://localhost/geolink-development');
});

app.configure('test', function() {
  db = mongoose.connect('mongodb://localhost/geolink-test');
});

app.configure('production', function(){
  db = mongoose.connect('mongodb://localhost/geolink');
});

Location = require('./models.js').Location(db);

app.param(':locationId', function(req, res, next, id) {
	Location.findById(id, function(err, location) {
		if(location) {
			req.location = location;
			next();
		} else {
			throw new NotFound('Location ('+id+') not found');
		}
	});
});

// Routes
app.get('/', function(req, res) {
  res.render('locations/create', {
    title: 'Express'
  });
});

app.post('/', function(req, res) {
	var location = new Location(req.body);
	location.save(function(){
		if(req.is('json')) {
			res.send(location.toObject());
		} else {
			res.send(400);
		}
	});
});

app.put('/locations/:locationId', function(req, res) {
	var location = req.location;
	location.lat = req.body.lat;
	location.lon = req.body.lon;
	location.zoom = req.body.zoom;
	location.save(function(err){
		if(req.is('json')) {
			res.send(location.toObject());
		} else {
			res.send(400);
		}
	});
});

app.get('/locations', function(req, res) {
	Location.find({}, function(err, locations) {
    res.render('locations/index', {
      locations: locations
    });
  });
});

app.get('/:locationId.:format?', function(req, res) {
	var location = req.location;
	switch(req.params.format) {
		case 'json':
			res.send(location.toObject());
			break;
		default:
			res.render('locations/show', {
				location: location
			});
		}
});

/*
app.get('/*', function() {
	throw new NotFound;
});
*/

// error handling
function NotFound(msg) {
	this.name = 'NotFound';
	this.message = msg || "Sorry, it's not here :(";
}
sys.inherits(NotFound, Error);

app.error(function(err, req, res, next) {
	if (err instanceof NotFound) {
		if(req.accepts('html')) {
			res.render('404', {error: err, status: 404});
		} else {
			res.send({error: err.message}, 404);
		} 
	} else {
		next(err);
	}	
});
  
// Only listen on $ node app.js

if (!module.parent) {
  app.listen(app.settings.env == 'production' ? 80 : 3000);
  console.log("Express server listening on port %d", app.address().port);
}
