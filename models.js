var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Location = new Schema({
	lat: Number,
	lon: Number,
	zoom: Number
});

exports.Location = function() {
	return mongoose.model('Location', Location);
};

