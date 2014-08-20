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

Ds18x20.prototype.get = function (input, callback) {

    var that = this,
        isArray = (input instanceof Array),
        ids = (isArray ? input : [input]);

    function parseResult(input) {

        var result = input.map(function (item) { return that.parser(item); });
        return (isArray ? result : result[0]);
    }

    if (typeof callback === "function") {

        return async.map(ids, function (id, done) {
            that.reader.read(id, function (err, result) {

                if (err) { return done(err); }
                return done(null, result);
            });
        }, function (err, results) {
            if (err) return callback(err);

            return callback(null, parseResult(results));
        });
    }

    return parseResult(ids.map(function (id) { return that.reader.read(id); }));
};

Ds18x20.prototype.getAll = function (callback) {

    function compileResult(idList, input) {

        var result = {};

        idList.forEach(function (key, index) { result[key] = input[index]; });

        return result;
    }

    if (typeof callback === "function") {

        var that = this;

        return this.list(function (err, idList) {

            if (err) { return callback(err); }
            that.get(idList, function (err, result) {

                if (err) { return callback(err); }
                callback(null, compileResult(idList, result));
            });
        });
    }

    var idList = this.list(),
        result = this.get(idList);

    return compileResult(idList, result);
};

Ds18x20.prototype.configure =  function(driverBasePath,basePath,listPath){
    if(driverBasePath !== undefined){
        this.driver.path=driverBasePath;
    }
    if(listPath !== undefined){
        this.lister.path=listPath;
    }
    if(basePath !== undefined){
        this.reader.basePath=basePath;
    }

};

module.exports = Ds18x20;
