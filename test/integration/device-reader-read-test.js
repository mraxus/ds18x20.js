"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),
	DeviceReader = require('../../lib/device-reader');

function readTester(t, testDirName, deviceName, expectedToReturnData) {

	var deviceReader = new DeviceReader(fs, path.resolve(__dirname, 'dirs', testDirName));

	t.test('... synchronous...', function (t) {

		var result = deviceReader.read(deviceName);
		t.equal(!!result, expectedToReturnData, 'should check if data is returned');
		t.end();
	});
	t.test('... asynchronous...', function (t) {

		deviceReader.read(deviceName, function (err, result) {

			t.notOk(err, 'should not error');
			t.equal(!!result, expectedToReturnData, 'should check if data is returned');
			t.end();
		});
	});
	t.end();
}

test('Getting no device names from directory...', function (t) {
	readTester(t, 'one-device', '28-011111111111', true);
});
//test('Getting one device name from directory...', function (t) {
//	readTester(t, 'one-device', ['28-011111111111']);
//});
//test('Getting two device names from directory...', function (t) {
//	readTester(t, 'two-devices', ['28-011111111111', '28-022222222222']);
//});
//test('Getting five device names from directory...', function (t) {
//	readTester(t, 'five-devices', ['28-011111111111', '28-022222222222', '28-033333333333', '28-044444444444', '28-055555555555']);
//});
