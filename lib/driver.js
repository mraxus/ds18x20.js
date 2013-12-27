"use strict";

function isSuperUser() { return (process.env['USER'] === 'root'); }


var Driver = function (fs, exec, execSync, driverBasePath) {
    this.fs = fs;
    this.exec = exec;
    this.execSync = execSync;
    this.path = driverBasePath;
};

Driver.prototype._isLoadedAsync = function (callback) {

	this.fs.exists(this.path, function (exists) {
		return callback(null, exists);
	});
};
Driver.prototype._isLoadedSync = function () {

	return this.fs.existsSync(this.path);
};

Driver.prototype._loadAsync = function (callback) {

    var that = this

    that.exec('modprobe w1-gpio', function (err) {

        if (err) { return callback(err); }

        return that.exec('modprobe w1-therm', function (err) {

            if (err) { return callback(err); }

            return callback();
        });
    });
};
Driver.prototype._loadSync = function () {

    return (this.execSync('modprobe w1-gpio') && this.execSync('modprobe w1-therm'));
};

Driver.prototype.isLoaded = function (callback) {

	if (typeof callback === "function") {
		return this._isLoadedAsync(callback);
	}

	return this._isLoadedSync();
};
Driver.prototype.load = function (callback) {

    var isAsync = (typeof callback === "function"),
        err;

	if (!isSuperUser()) {
        err = new Error('Cannot load modprobe driver when not root user');
        if (isAsync) { return callback(err); }
        throw err;
	}

    if (typeof callback === "function") {
        return this._loadAsync(callback);
    }

	return this._loadSync();
};

module.exports = Driver;
