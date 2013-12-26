'use strict';

module.exports = function () {

	var Sandal = require('sandal'),
		sandal = new Sandal();

	sandal
		// External dependencies
		.object('fs', require('fs'))

		// Configurations
		.object('driverBasePath', '/sys/bus/w1')
		.object('listPath', '/sys/devices/w1_bus_master1/w1_master_slaves')
		.object('basePath', '/sys/bus/w1/devices/')

		// Library components
        .service('ds18x20', require('./lib/ds18x20'))

		.object('driver', require('./lib/driver'))
		.service('lister', require('./lib/device-lister'))
		.service('reader', require('./lib/device-reader'))
        .object('parser', require('./lib/parser'))

		// Logger functionality
		.object('logger', console)
	;

	return sandal;

};
