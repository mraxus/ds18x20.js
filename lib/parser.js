"use strict";

module.exports = function (input) {

    if (input && input.indexOf('YES') > -1) {
        var temp = input.match(/t=(-?(\d+))/);

        if (temp)
            return parseInt(temp[1], 10);
    }

    return false;
};
