'use strict';

var test = require('tap').test,

    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    execSync = require('execSync'),

    Driver = require('../../lib/driver');

function testIsLoaded(t, testDirName, expectedResult) {

    var driver = new Driver(fs, exec, execSync, path.resolve(__dirname, testDirName));

    t.test('... synchronous...', function (t) {

        var result = driver.isLoaded();
        t.equal(result, expectedResult, 'the results should be ' + expectedResult);
        t.end();
    });
    t.test('... asynchronous...', function (t) {

        driver.isLoaded(function (err, result) {

            t.notOk(err, 'should not error');
            t.equal(result, expectedResult, 'the results should be ' + expectedResult);
            t.end();
        });
    });
    t.end();
}

test('Given an existing drivers catalogue...', function (t) {
    testIsLoaded(t, 'data', true);
});
test('Given a non-existing drivers catalogue...', function (t) {
    testIsLoaded(t, 'no-folder', false);
});