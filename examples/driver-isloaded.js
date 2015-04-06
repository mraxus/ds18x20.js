'use strict';

var Driver = require('../lib/driver'),
    exec = require('child_process').exec,
    execSync = require('sync-exec').run,
    fs = require('fs'),

    driver = new Driver(fs, exec, execSync, '/sys/bus/w1'),
    c = console.log,
    isLoaded;

isLoaded = driver.isLoaded();
c('isLoaded sync', isLoaded);

driver.isLoaded(function (err, results) { c('isLoaded async', results); });

if (1 || !isLoaded) {
    
    driver.load(function (err) {
        c('load async');
        if (err) { c(err); c('try running with sudo...'); }
        else { c('load async successful.'); }
    });

    c('load sync', driver.load());
}
