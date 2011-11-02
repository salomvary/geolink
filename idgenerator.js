var alphabet = 'abcdefghjklmnpqrstuvwxyz0123456789'.split(''),
	//I and O intentionally left out
	base = alphabet.length;

exports.encode = function(number) {
	if(number === 0) {
		return alphabet[0];
	}
	var encoded = '';
	while(number > 0) {
		encoded = alphabet[number % base] + encoded;
		number = Math.floor(number / base);
	}
	return encoded;
};

exports.decode = function(string) {
	var number = 0;
	for(var c in string) {
		number = number * base + alphabet.indexOf(string[c]);
	}
	return number;
};

exports.generate = function() {
	var min = exports.decode('baaaaa'), max = exports.decode('999999');
	return exports.encode(min + Math.floor(Math.random() * (max - min + 1)));
};
