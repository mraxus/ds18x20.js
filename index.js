'use strict';

var async = require('async'),
    fs = require('fs'),

    driver, parser, lister, reader;

require('./initialize')().resolve( ['driver', 'lister', 'reader', 'parser'],
    // Synchrounus callback
    function (err, d, l, r, p) {
        if (err) { console.error(err); process.exit(255); }
        driver = d; lister = l; reader = r; parser = p;
    }
);

var Ds18x20 = function () {

};

Ds18x20.prototype.list = function (callback) {
    return lister.get(callback);
};

Ds18x20.prototype.get = function (ids, callback) {

    if (typeof callback === "function") {

        return async.map(ids, function (id, done) {reader.read(id, done); }, function (err, results) {
            if (err) return callback(err);

            return callback(null, results.map(parser));
        });
    }

    return ids.map(function (id) { return reader.read(id); }).map(parser);
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
