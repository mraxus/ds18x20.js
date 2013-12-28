"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),
	DeviceReader = require('../../lib/reader'),

    expectedOutput = ["40 06 4b 46 7f ff 10 10 ae : crc=ae YES",
                        "40 06 4b 46 7f ff 10 10 ae t=100000", ""];

function readTester(t, testDirName, deviceId) {

	var deviceReader = new DeviceReader(fs, path.resolve(__dirname, 'data', 'dirs', testDirName));

	t.test('... synchronous...', function (t) {

		var result = deviceReader.read(deviceId),
            resultArray = result.split('\n').map(function (str) { return str.trim(); })

		t.deepEqual(resultArray, expectedOutput, 'should return expected temperature');
		t.end();
	});
	t.test('... asynchronous...', function (t) {

		deviceReader.read(deviceId, function (err, result) {

            var resultArray = result.split('\n').map(function (str) { return str.trim(); })

			t.notOk(err, 'should not error');
			t.deepEqual(resultArray, expectedOutput, 'should return expected temperature');
			t.end();
		});
	});
	t.end();
}

test('Getting temperature from one existing device...', function (t) {
	readTester(t, '1-device', '28-011111111111');
});
test('Getting temperature from another existing device...', function (t) {
	readTester(t, '2-devices', '28-011111111111');
});
test('Getting temperature from yet another existing device...', function (t) {
	readTester(t, '2-devices', '28-022222222222');
});
