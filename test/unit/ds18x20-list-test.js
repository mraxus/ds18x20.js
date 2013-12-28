"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),

	Lister = require('../../lib/lister'),
	Ds18x20 = require('../../lib/ds18x20');

function getTester(t, testDirName, expectedResult) {

	var lister = new Lister(fs, path.resolve(__dirname, 'data', 'dirs', testDirName, 'w1_master_slaves')),
		ds18x20 = new Ds18x20(null, lister, null, null);

	function verify(t, err, result) {

		t.notOk(err, 'should not error');
		t.deepEqual(result, expectedResult, 'should return a list with the expected device name(s)');
		t.end();
	}

	t.test('... synchronous...', function (t) {
		verify(t, null, ds18x20.list());
	});
	t.test('... asynchronous...', function (t) {
		ds18x20.list(function (err, result) {
			verify(t, err, result);
		});
	});
	t.end();
}

test('Getting no device ids from directory...', function (t) {
	getTester(t, '0-devices', []);
});
test('Getting one device id from directory...', function (t) {
	getTester(t, '1-device', ['28-011111111111']);
});
test('Getting two device ids from directory...', function (t) {
	getTester(t, '2-devices', ['28-011111111111', '28-022222222222']);
});
test('Getting five device ids from directory...', function (t) {
	getTester(t, '6-devices', [
		'28-011111111111',
		'28-022222222222',
		'28-033333333333',
		'28-044444444444',
		'28-055555555555',
		'28-066666666666']);
});
