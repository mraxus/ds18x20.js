'use strict';

require('./initialize')().resolve(function (err, c, deviceLister) {

	if (err) {
		console.log(err);
		process.exit(1);
	}

	c('App is starting...');


	c('  deviceLister.get with no args:');
	deviceLister.get();

	c('  deviceLister.get with an string arg:');
	deviceLister.get('with some args');

	c('  deviceLister.get with callback:');
	deviceLister.get(function (err) {
		c('done');
	});

});