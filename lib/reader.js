"use strict";

var path = require('path');

function checkErrors(err, deviceName) {

    if (err.code === 'ENOENT' && err.errno === 34) {
        err = new Error('Could not read device content. Device \'' + deviceName + '\' not found');
    }

    return err;
}

var DeviceReader = function (fs, basePath) {
	this.fs = fs;
	this.basePath = basePath;
};

DeviceReader.prototype._getFileName = function (deviceName) {
	return path.resolve(this.basePath, deviceName, 'w1_slave');
};

DeviceReader.prototype._readAsync = function (deviceName, callback) {

	this.fs.readFile(this._getFileName(deviceName), function (err, result) {
        if (err) {
            return callback(checkErrors(err, deviceName));
        }
		return callback(null, result.toString());
	});
};

DeviceReader.prototype._readSync = function (deviceName) {

    try {
        var filename = this._getFileName(deviceName),
            result = this.fs.readFileSync(filename);

        return result.toString();

    } catch (err) {
        throw checkErrors(err, deviceName);
    }
};

DeviceReader.prototype.read = function (deviceName, callback) {

	var err,
		isAsyncRequest = (typeof callback === "function");

	if (!deviceName) {
		err = new Error('deviceName was not provided');
		if (isAsyncRequest) { return callback(err); }
		throw err;
	}

	if (isAsyncRequest) {
		return this._readAsync(deviceName, callback);
	}

	return this._readSync(deviceName);
};

module.exports = DeviceReader;
