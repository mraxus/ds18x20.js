"use strict";

var fs = require('fs');

var DeviceLister = function (listPath) {
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
	fs.readFile(this.path, function (err, content) {
        if (err) { return callback(err); }
		return callback(null, toArray(content));
	});
};

DeviceLister.prototype._readSync = function () {
	return toArray(fs.readFileSync(this.path));
};

DeviceLister.prototype.get = function (callback) {
	var isAsyncRequest = (!!callback && typeof callback === "function");

	if (isAsyncRequest) {
		return this._readAsync(callback);
	}

	return this._readSync();
};

module.exports = DeviceLister;
