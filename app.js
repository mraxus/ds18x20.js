'use strict';

var Driver = require('./index'),
    c = console.log,

    driver = new Driver();

c('list', driver.list());
c('getAll', driver.getAll());
