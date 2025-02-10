'use strict';

var Constants = require('./constants');

var Ds18x20 = require('./lib/ds18x20');

var Driver = require('./lib/driver');
var Lister = require('./lib/lister');
var Reader = require('./lib/reader');
var parser = require('./lib/parser');

var driver = new Driver(Constants.driverBasePath);
var lister = new Lister(Constants.listPath);
var reader = new Reader(Constants.basePath);

module.exports = new Ds18x20(driver, lister, reader, parser);
