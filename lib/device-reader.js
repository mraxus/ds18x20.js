"use strict";

var path = require('path');

var DeviceReader = function (fs, basePath) {
	this.fs = fs;
	this.basePath = basePath;
};

DeviceReader.prototype.getFileName = function (deviceName) {
	return path.resolve(this.basePath, deviceName, 'w1_slave');
};

DeviceReader.prototype._readAsync = function (fileName, callback) {

	this.fs.readFile(fileName, function (err, content) {
		return callback(err, content);
	});
};

DeviceReader.prototype._readSync = function (fileName) {

	return this.fs.readFileSync(fileName);
};

DeviceReader.prototype.read = function (deviceName, callback) {

	var err,
		fileName,
		isAsyncRequest = (!!callback && typeof callback === "function");

	if (!deviceName) {
		err = new Error('deviceName was not provided');
		if (isAsyncRequest) { return callback(err); }
		throw err;
	}

	fileName = this.getFileName(deviceName);

	if (isAsyncRequest) {
		return this._readAsync(fileName, callback);
	}

	return this._readSync(fileName);
};

module.exports = DeviceReader;
