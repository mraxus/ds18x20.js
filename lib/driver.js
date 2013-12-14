"use strict";

var fs = require('fs'),
	sh = require('execSync'),
	path = '/sys/bus/w1',

	Driver = {};

function isLoadedAsync(callback) {

	fs.exists(path, function (err, content) {
		return callback(err, content);
	});
}
function isLoadedSync() {

	return fs.existsSync(this.path);
}
function isSuperUser() { return (process.env.USER === 'root'); }

Driver.isLoaded = function (callback) {

	var isAsyncRequest = (!!callback && typeof callback === "function");

	if (isAsyncRequest) {
		return this.isLoadedAsync(callback);
	}

	return this.isLoadedSync();
};
Driver.load = function () {
	if (!isSuperUser()) {
		throw new Error('Cannot load modprobe driver when not root user');
	}
	return (sh.run('modprobe w1-gpio') && sh.run('modprobe w1-therm'));
};

module.exports = Driver;