'use strict';
var regexps = require('./regexps.json');
var dayMilliSeconds = 24 * 60 * 60 * 1000;
// A list of strings along with the offset to the date that they create
var specialStrings = {
  'yesterday': -1 * dayMilliSeconds,
  'tomorrow': +1 * dayMilliSeconds,
  'day before yesterday': -2 * dayMilliSeconds,
  'day after tomorrow': +2 * dayMilliSeconds
};

var periods = {
  'day': dayMilliSeconds,
  'week': 7 * dayMilliSeconds
};

var days = {
  'sun': 0,
  'mon': 1,
  'tues': 2,
  'tue': 2,
  'wednes': 3,
  'wed': 3,
  'thurs': 4,
  'fri': 5,
  'sat': 6,
  'satur': 6
};

var months = {
  'january': 0,
  'jan': 0,
  'february': 1,
  'feb': 1,
  'march': 2,
  'mar': 2,
  'april': 3,
  'apr': 3,
  'may': 4,
  'june': 5,
  'jun': 5,
  'july': 6,
  'jul': 6,
  'august': 7,
  'aug': 7,
  'september': 8,
  'sept': 8,
  'october': 9,
  'oct': 9,
  'november': 10,
  'nov': 10,
  'december': 11,
  'dec': 11
};

module.exports = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string!');
  }

  var defaultReturn = [ false, '' ];
  var match;

  str = str.toLowerCase();

  if (specialStrings.hasOwnProperty(str)) {
    return [true, getNewDate(specialStrings[str])];
  } else if ((match = str.match(new RegExp(regexps['re1'], 'i')))) {
    let days = match[1];
    let period = match[2];

    return [true, getNewDate(-1 * parseInt(days, 10) * periods[period])];
  } else if ((match = str.match(new RegExp(regexps['re2'], 'i')))) {
    let day = match[1];
    let diff = (7 - Math.abs(new Date().getDay() - days[day])) * dayMilliSeconds;

    return [true, getNewDate(-1 * diff)];
  } else if ((match = str.match(new RegExp(regexps['re3'], 'i')))) {
    let day = match[1];
    let month = match[2];

    let retVal = new Date();
    retVal.setMonth(months[month]);
    retVal.setDate(day);

    return [true, retVal];
  }

  return defaultReturn;
};

function getNewDate (difference) {
  return new Date(new Date().getTime() + difference);
}
