// credits:
// http://groups.google.com/group/requirejs/browse_thread/thread/599db983ef51805f/678dca46081eabdc
define(['http://www.google.com/jsapi?callback=define'], { 
	load: function( name, req, load, config ) { 
		if(config.isBuild) {
			load(null);
		} else {
			var request = name.split( '/' ); 
			google.load( request[0], request[1], { 
					callback: load, 
					language: 'en', 
					other_params: ((typeof request[2] === 'string')?request[2]:'') 
			} ); 
		}
	} 
}); 

