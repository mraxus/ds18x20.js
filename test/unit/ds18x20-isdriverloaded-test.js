'use strict';

var test = require('tap').test,

    fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    execSync = require('sync-exec'),

	Driver = require('../../lib/driver'),
	Ds18x20 = require('../../lib/ds18x20');

function testIsLoaded(t, testDirName, expectedResult) {

	var driver = new Driver(fs, exec, execSync, path.resolve(__dirname, testDirName)),
		ds18x20 = new Ds18x20(driver, null, null, null);

	function verify(t, err, result) {

		t.notOk(err, 'should not error');
		t.equal(result, expectedResult, 'the results should be ' + expectedResult);
		t.end();
	}

    t.test('... synchronous...', function (t) {
        verify(t, null, ds18x20.isDriverLoaded());
    });
    t.test('... asynchronous...', function (t) {
		ds18x20.isDriverLoaded(function (err, result) {
			verify(t, err, result);
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
