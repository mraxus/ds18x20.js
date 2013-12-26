'use strict';

var path = require('path'),
    interpreted = require('interpreted'),
    parser = require('../../lib/parser');

interpreted({
    source: path.resolve(__dirname, 'data', 'parser', 'source'),
    expected: path.resolve(__dirname, 'data', 'parser', 'expected'),

    test: function (name, input, callback) {

        callback(null, parser(input));
    },

    update: process.env.UPDATE_TEST === 'true'

});