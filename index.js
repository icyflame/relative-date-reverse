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
var days = { 'Sun': 0, 'Mon': 1, 'Tues': 2, 'Tue': 2, 'Wednes': 3, 'Wed': 3, 'Thurs': 4, 'Fri': 5, 'Sat': 6, 'Satur': 6 };

var months = {'January': 0, 'Jan': 0, 'February': 1, 'Feb': 1, 'March': 2, 'Mar': 2, 'April': 3, 'Apr': 3, 'May': 4,
  'June': 5, 'Jun': 5, 'July': 6, 'Jul': 6, 'August': 7, 'Aug': 7, 'September': 8, 'Sept': 8, 'October': 9, 'Oct': 9,
'November': 10, 'Nov': 10, 'December': 11, 'Dec': 11 };

module.exports = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string!');
  }

  var defaultReturn = [false, ''];
  var match;

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

    return [true, new Date(new Date(new Date().setMonth(months[month])).setDate(day))];
  }

  return defaultReturn;
};

function getNewDate (difference) {
  return new Date(new Date().getTime() + difference);
}
