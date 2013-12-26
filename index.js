'use strict';

require('./initialize')().resolve(

    // Synchrounus callback
    function (err, ds18x20) {

        if (err) { throw err; }

        module.exports = ds18x20;
    }
);
