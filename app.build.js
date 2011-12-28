({
	appDir: 'public/',
	baseUrl: 'javascripts',
	dir: 'public/optimized',
	optimizeCss: 'standard',
	optimize: 'none',	
	paths: {
		jquery: 'empty:',
		underscore: 'lib/underscore'
	},
	modules: [
		{
				name: 'application'
		}
	]
})
