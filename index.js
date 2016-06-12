'use strict';
module.exports = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string!');
  }

  var defaultReturn = [false, ''];

  // constants
  var dayMilliSeconds = 24 * 60 * 60 * 1000;

  // A list of strings along with the offset to the date that they create
  var specialStrings = {
    'yesterday': -1 * dayMilliSeconds,
    'tomorrow': +1 * dayMilliSeconds,
    'day before yesterday': -2 * dayMilliSeconds,
    'day after tomorrow': +2 * dayMilliSeconds
  };

  if (specialStrings.hasOwnProperty(str)) {
    return [true, new Date(new Date().getTime() + specialStrings[str])];
  }

  // check for the most common regexes

  // var daysAgo = /([0-9]+) (days|weeks) ago/i;

  return defaultReturn;
};
