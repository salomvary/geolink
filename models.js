var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId,
	idgenerator = require('./idgenerator.js');

var Location = new Schema({
	_id: String,
	lat: Number,
	lon: Number,
	zoom: Number
});

Location.pre('save', function(next) {
	if(! this._id) {
		// TODO: implement optimistic loop on save
		// http://www.mongodb.org/display/DOCS/How+to+Make+an+Auto+Incrementing+Field
		this._id = idgenerator.generate();
	}
	next();
});

exports.Location = function() {
	return mongoose.model('Location', Location);
};

