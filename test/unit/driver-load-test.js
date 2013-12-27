'use strict';

var test = require('tap').test,

    fs = require('fs'),
    path = require('path'),
    exec, execSync,

    Driver = require('../../lib/driver'),
    driver;

exec = function (cmd, callback) {
    process.nextTick(function () { callback(null, true); });
};
execSync = function () {
    return true;
};
driver = new Driver(fs, exec, execSync, __dirname);

function testLoadNotRoot(t) {

    t.test('... synchronous...', function (t) {

        try {
            driver.load();
        } catch (err) {
            t.ok(err, 'should error');
            t.equal(err.message, 'Cannot load modprobe driver when not root user', 'should return expected error message');
            t.end();
            return;
        }
        t.notOk(true, 'should not be able to load driver.');
        t.end();
    });
    t.test('... asynchronous...', function (t) {

        driver.load(function (err) {

            t.ok(err, 'should error');
            t.equal(err.message, 'Cannot load modprobe driver when not root user', 'should return expected error message');
            t.end();
        });
    });
    t.end();
}

function testLoad(t) {

    t.test('... synchronous...', function (t) {

        var result = driver.load();
        t.ok(true, 'should not throw an error');
        t.equal(result, true, 'should return true');
        t.end();
    });
    t.test('... asynchronous...', function (t) {

        driver.load(function (err, result) {

            t.notOk(err, 'should not error');
            t.equal(result, true, 'should return true');
            t.end();
        });
    });
    t.end();
}

test('Testing to load the driver not being root user...', function (t) {
    testLoadNotRoot(t);
});
test('Testing to load the driver being root user...', function (t) {
    process.env['USER'] = 'root';
    testLoad(t);
});