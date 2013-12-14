"use strict";

var path = require('path');

var DeviceLister = function (fs, listPath) {
	this.fs = fs;
	this.path = listPath;
};

DeviceLister.prototype._readAsync = function (callback) {

	this.fs.readFile(this.path, function (err, content) {

		return callback(err, content);
	});
};

DeviceLister.prototype._readSync = function () {

	return this.fs.readFileSync(this.path);
};

DeviceLister.prototype.get = function (callback) {

	var isAsyncRequest = (!!callback && typeof callback === "function");

	if (isAsyncRequest) {
		return this._readAsync(callback);
	}

	return this._readSync();
};

module.exports = DeviceLister;