const angular = require('angular');

function dayName(dayNames) {
    return (input) => angular.isNumber(input) ? dayNames[input % 7] : input;
}

module.exports = [dayName];