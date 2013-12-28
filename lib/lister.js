"use strict";

var path = require('path');

var DeviceLister = function (fs, listPath) {
	this.fs = fs;
	this.path = listPath;
};

function toArray(buffer) {

	var result = buffer
        .toString()
        .split('\n')
        .map(function (i) { return i.trim(); });
	
	return result.filter(function (item) { return !!item; });
}

DeviceLister.prototype._readAsync = function (callback) {

	this.fs.readFile(this.path, function (err, content) {
        if (err) { return callback(err); }
		return callback(null, toArray(content));
	});
};

DeviceLister.prototype._readSync = function () {

	return toArray(this.fs.readFileSync(this.path));
};

DeviceLister.prototype.get = function (callback) {

	var isAsyncRequest = (!!callback && typeof callback === "function");

	if (isAsyncRequest) {
		return this._readAsync(callback);
	}

	return this._readSync();
};

module.exports = DeviceLister;
