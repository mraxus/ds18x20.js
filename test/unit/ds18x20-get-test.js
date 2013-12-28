"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),

	Reader = require('../../lib/reader'),
	parser = require('../../lib/parser'),
	Ds18x20 = require('../../lib/ds18x20'),

	expectedOutput = 100.0;

function getTester(t, deviceId) {

	var reader = new Reader(fs, path.resolve(__dirname, 'data', 'dirs', '6-devices')),
		ds18x20 = new Ds18x20(null, null, reader, parser);

	function verify(t, err, result) {

        var expectedResult = (result instanceof Array ? result.map(function () { return expectedOutput;}) : expectedOutput);

		t.notOk(err, 'should not error');
		t.deepEqual(result, expectedResult, 'should return a list with the expected device id(s)');
		t.end();
	}

	t.test('... synchronous...', function (t) {
		verify(t, null, ds18x20.get(deviceId));
	});
	t.test('... asynchronous...', function (t) {
		ds18x20.get(deviceId, function (err, result) {
			verify(t, err, result);
		});
	});
	t.end();
}

test('Getting the temperature from one device as an array input...', function (t) {
    getTester(t, ['28-011111111111']);
});
test('Getting the temperature from three devices...', function (t) {
    getTester(t, ['28-022222222222', '28-033333333333', '28-044444444444']);
});
test('Getting the temperature from one device as a string input...', function (t) {
    getTester(t, '28-055555555555');
});

test('Getting the temperature from non-existing device...', function (t) {

    var deviceId = '28-077777777777',
        reader = new Reader(fs, path.resolve(__dirname, 'data', 'dirs', '6-devices')),
        ds18x20 = new Ds18x20(null, null, reader, parser);

    function verify(t, err) {

        t.ok(err, 'should error');
        t.equal(err.message, 'Could not read device content. Device \'' + deviceId + '\' not found',
            'should return the expected error message');
        t.end();
    }

    t.test('... synchronous...', function (t) {
        try {
            ds18x20.get(deviceId);
        } catch (err) {
            verify(t, err);
        }
    });
    t.test('... asynchronous...', function (t) {
        ds18x20.get(deviceId, function (err) {
            verify(t, err);
        });
    });
    t.end();
});
