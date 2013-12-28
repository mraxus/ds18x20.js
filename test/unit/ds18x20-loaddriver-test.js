'use strict';

var test = require('tap').test,

    fs = require('fs'),
    exec, execSync,

    Driver = require('../../lib/driver'),
	Ds18x20 = require('../../lib/ds18x20'),
	driver,
	ds18x20;

exec = function (cmd, callback) {
    process.nextTick(function () { callback(null, true); });
};
execSync = function () {
    return true;
};
driver = new Driver(fs, exec, execSync, __dirname);
ds18x20 = new Ds18x20(driver, null, null, null);


function testLoadNotRoot(t) {

	function verify(t, err) {

		t.ok(err, 'should error');
		t.equal(err.message, 'Cannot load modprobe driver when not root user', 'should return expected error message');
		t.end();
	}

    t.test('... synchronous...', function (t) {

        try {
			ds18x20.loadDriver();
			t.notOk(true, 'should not be able to load driver.');
			t.end();
        } catch (err) {
			verify(t, err);
        }
    });
    t.test('... asynchronous...', function (t) {

		ds18x20.loadDriver(function (err) {
			verify(t, err);
        });
    });
    t.end();
}

function testLoad(t) {

    t.test('... synchronous...', function (t) {

        var result = ds18x20.loadDriver();
        t.ok(true, 'should not throw an error');
        t.equal(result, true, 'should return true');
        t.end();
    });
    t.test('... asynchronous...', function (t) {

		ds18x20.loadDriver(function (err) {

            t.notOk(err, 'should not error');
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