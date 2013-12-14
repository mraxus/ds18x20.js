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
		.service('deviceLister', require('./lib/device-lister'))

		// Logger functionality
		.object('logger', console)
		.factory('c', function (logger) { return logger.log; })
	;

	return sandal;

};