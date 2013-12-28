"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),

    Lister = require('../../lib/lister'),
    Reader = require('../../lib/reader'),
	parser = require('../../lib/parser'),
	Ds18x20 = require('../../lib/ds18x20');

function getAllTester(t, deviceChoice, expectedCount) {

	var lister = new Lister(fs, path.resolve(__dirname, 'data', 'dirs', deviceChoice, 'w1_master_slaves')),
        reader = new Reader(fs, path.resolve(__dirname, 'data', 'dirs', deviceChoice)),
        ds18x20 = new Ds18x20(null, lister, reader, parser);

    function generateExpectedResult() {

        var result = {}, i;

        for (i = 1; i <= expectedCount; i++) {
            var key = '28-0xxxxxxxxxxx'.replace(/x/g, '' + i);
            result[key] = 100.0;
        }

        return result;
    }

	function verify(t, err, result) {

		t.notOk(err, 'should not error');
        t.deepEqual(result, generateExpectedResult());
		t.end();
	}

	t.test('... synchronous...', function (t) {
		verify(t, null, ds18x20.getAll(deviceChoice));
	});
	t.test('... asynchronous...', function (t) {
		ds18x20.getAll(function (err, result) {
			verify(t, err, result);
		});
	});
	t.end();
}

test('Getting the temperature from all devices (which is zero)...', function (t) {
    getAllTester(t, '0-devices', 0);
});
test('Getting the temperature from all devices (which is one)...', function (t) {
    getAllTester(t, '1-device', 1);
});
test('Getting the temperature from all devices (which is two)...', function (t) {
    getAllTester(t, '2-devices', 2);
});
test('Getting the temperature from all devices (which is six)...', function (t) {
    getAllTester(t, '6-devices', 6);
});
