'use strict';

require('./initialize')().resolve(function (err, c, deviceLister, driver) {

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

	c('  deviceLister.get with no args:', deviceLister.get());

	return;

	c('  deviceLister.get with an string arg:');
	deviceLister.get('with some args');

	c('  deviceLister.get with callback:');
	deviceLister.get(function (err) {
		c('done');
	});

});
