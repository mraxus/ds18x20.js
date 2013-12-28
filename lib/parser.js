"use strict";

function round(number, places, increment) {
    increment = increment || 1e-20;
    var factor = 10 / (10 * (increment || 10));
    return (Math.ceil(factor * +number) / factor).toFixed(places) * 1; // Number
}

module.exports = function (input) {

    if (input && input.indexOf('YES') > -1) {
        var temp = input.match(/t=(-?(\d+))/);

        if (temp)
            return round(parseInt(temp[1], 10) / 1000, 1);
    }

    return false;
};
