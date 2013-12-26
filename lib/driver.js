"use strict";

function isSuperUser() { return (process.env.USER === 'root'); }


var Driver = function (fs, execSync, driverBasePath) {
    this.fs = fs;
    this.execSync = execSync;
    this.path = driverBasePath;
};

Driver.prototype._isLoadedAsync = function (callback) {

	this.fs.exists(this.path, function (err, content) {
		return callback(err, content);
	});
}
Driver.prototype._isLoadedSync = function () {

	return this.fs.existsSync(this.path);
}

Driver.prototype.isLoaded = function (callback) {

	var isAsyncRequest = (typeof callback === "function");

	if (isAsyncRequest) {
		return this._isLoadedAsync(callback);
	}

	return this._isLoadedSync();
};
Driver.prototype.load = function () {

	if (!isSuperUser()) {
		throw new Error('Cannot load modprobe driver when not root user');
	}
	return (sh.run('modprobe w1-gpio') && sh.run('modprobe w1-therm'));
};

module.exports = Driver;
