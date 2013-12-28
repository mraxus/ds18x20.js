"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),
	Lister = require('../../lib/lister');

function getTester(t, testDirName, expectedResult) {

	var lister = new Lister(fs, path.resolve(__dirname, 'data', 'dirs', testDirName, 'w1_master_slaves'));

	function verify(t, err, result) {

		t.notOk(err, 'should not error');
		t.deepEqual(result, expectedResult, 'should return a list with the expected device name(s)');
		t.end();
	}

	t.test('... synchronous...', function (t) {
		verify(t, null, lister.get());
	});
	t.test('... asynchronous...', function (t) {
		lister.get(function (err, result) {
			verify(t, err, result);
		});
	});
	t.end();
}

test('Getting no device names from directory...', function (t) {
	getTester(t, '0-devices', []);
});
test('Getting one device name from directory...', function (t) {
	getTester(t, '1-device', ['28-011111111111']);
});
test('Getting two device names from directory...', function (t) {
	getTester(t, '2-devices', ['28-011111111111', '28-022222222222']);
});
test('Getting five device names from directory...', function (t) {
	getTester(t, '6-devices', [
		'28-011111111111',
		'28-022222222222',
		'28-033333333333',
		'28-044444444444',
		'28-055555555555',
		'28-066666666666']);
});
