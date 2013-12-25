"use strict";

module.exports = function (content) {

    content = content.toString();

    if (content && content.indexOf('YES') > -1) {
        var temp = content.match(/t=(-?(\d+))/);

        if (temp)
            return parseInt(temp[1]) / 1000;
    }

    return false;
};
