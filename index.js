'use strict';

require('./initialize')().resolve(function (err, c, deviceLister, deviceReader, driver) {

	if (err) {
		console.log(err);
		process.exit(1);
	}

	c('App is starting...');

	var loaded = driver.isLoaded();
	
	c('Driver loaded:', loaded);

	if (!loaded) {
		c('Loading driver...');
		driver.load();
		c('Driver loaded!');
	}

	deviceLister.get(function (err, ids) {
//		c('  deviceLister.get with callback:', ids);
		
		c(ids.map(function (id) { return id + ': ' + deviceReader.read(id) + ' C'; }));
	});

});
