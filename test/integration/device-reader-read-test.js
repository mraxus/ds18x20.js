"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),
	DeviceReader = require('../../lib/device-reader');

function readTester(t, testDirName, deviceName, expectedOutput) {

	var deviceReader = new DeviceReader(fs, path.resolve(__dirname, 'dirs', testDirName));

	t.test('... synchronous...', function (t) {

		var result = deviceReader.read(deviceName);
		t.equal(result, expectedOutput, 'should return expected temperature');
		t.end();
	});
	t.test('... asynchronous...', function (t) {

		deviceReader.read(deviceName, function (err, result) {

			t.notOk(err, 'should not error');
			t.equal(result, expectedOutput, 'should return expected temperature');
			t.end();
		});
	});
	t.end();
}

//test('Getting no device names from directory...', function (t) {
//	readTester(t, '0-devices', '28-011111111111', true);
//});
test('Getting temperature from one existing device...', function (t) {
	readTester(t, '1-device', '28-011111111111', 24.312);
});
test('Getting temperature from another existing device...', function (t) {
	readTester(t, '2-devices', '28-011111111111', 24.562);
});
test('Getting temperature from yet another existing device...', function (t) {
	readTester(t, '2-devices', '28-022222222222', 24.562);
});
//test('Getting five device names from directory...', function (t) {
//	readTester(t, 'five-devices', ['28-011111111111', '28-022222222222', '28-033333333333', '28-044444444444', '28-055555555555']);
//});
