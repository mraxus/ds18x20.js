'use strict';

var driver = require('../index'),
    c = console.log;

c('list sync', driver.list());
c('getAll sync', driver.getAll());

driver.list(function (err, results) { c('list async', results); });
driver.getAll(function (err, results) { c('getAlli async', results); });
