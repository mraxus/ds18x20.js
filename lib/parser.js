"use strict";

function round(number, places) {
	var pow = Math.pow(10, places);
	return Math.round(number * pow) / pow;
}

module.exports = function (input) {

    if (input && input.indexOf('YES') > -1) {
        var temp = input.match(/t=(-?(\d+))/);

        if (temp)
            return round(parseInt(temp[1], 10) / 1000, 1);
    }

    return false;
};
