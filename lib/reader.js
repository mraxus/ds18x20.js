"use strict";

var path = require('path');

function checkErrors(err, deviceId) {

    if (err.code === 'ENOENT') {
        err = new Error('Could not read device content. Device \'' + deviceId + '\' not found');
    }

    return err;
}

var DeviceReader = function (fs, basePath) {
	this.fs = fs;
	this.basePath = basePath;
};

DeviceReader.prototype._getFileName = function (deviceId) {
	return path.resolve(this.basePath, deviceId, 'w1_slave');
};

DeviceReader.prototype._readAsync = function (deviceId, callback) {

	this.fs.readFile(this._getFileName(deviceId), function (err, result) {
        if (err) {
            return callback(checkErrors(err, deviceId));
        }
		return callback(null, result.toString());
	});
};

DeviceReader.prototype._readSync = function (deviceId) {

    try {
        var filename = this._getFileName(deviceId),
            result = this.fs.readFileSync(filename);

        return result.toString();

    } catch (err) {
        throw checkErrors(err, deviceId);
    }
};

DeviceReader.prototype.read = function (deviceId, callback) {

	var err,
		isAsyncRequest = (typeof callback === "function");

	if (!deviceId) {
		err = new Error('deviceId was not provided');
		if (isAsyncRequest) { return callback(err); }
		throw err;
	}

	if (isAsyncRequest) {
		return this._readAsync(deviceId, callback);
	}

	return this._readSync(deviceId);
};

module.exports = DeviceReader;
