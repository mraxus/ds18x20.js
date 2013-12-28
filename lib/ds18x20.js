'use strict';

var async = require('async');

var Ds18x20 = function (driver, lister, reader, parser) {
    this.driver = driver;
    this.lister = lister;
    this.reader = reader;
    this.parser = parser;
};

Ds18x20.prototype.isDriverLoaded = function (callback) {
	return this.driver.isLoaded(callback);
};

Ds18x20.prototype.loadDriver = function (callback) {
	return this.driver.load(callback);
};

Ds18x20.prototype.list = function (callback) {
    return this.lister.get(callback);
};

Ds18x20.prototype.get = function (ids, callback) {

    var that = this;

    if (typeof callback === "function") {

        return async.map(ids, function (id, done) {that.reader.read(id, done); }, function (err, results) {
            if (err) return callback(err);

            return callback(null, results.map(that.parser));
        });
    }

    return ids.map(function (id) { return that.reader.read(id); }).map(that.parser);
};

Ds18x20.prototype.getAll = function (callback) {

    if (typeof callback === "function") {

        var that = this;

        return this.list(function (err, ids) {
            that.get(ids, callback);
        });
    }

    return this.get(this.list());
};

module.exports = Ds18x20;
