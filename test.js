import test from 'ava';
var relative = require('./');
var dateable = require('dateable');
var day = 24 * 60 * 60 * 1000;
var week = 7 * day;

test('unformattable returns false', t => {
	var returned = relative('some days ago');
	t.false(returned[0]);
});

test('special strings works', t => {
	var returned;

	var returned = relative("yesterday");
	var expected = new Date(new Date().getTime() - day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("day before yesterday");
	var expected = new Date(new Date().getTime() - 2 * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("tomorrow");
	var expected = new Date(new Date().getTime() + day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("day after tomorrow");
	var expected = new Date(new Date().getTime() + 2 * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test('re1 works: n days ago', t => {

	var returned = relative("5 days ago")
	var expected = new Date(new Date().getTime() - 5 * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("15 days ago")
	var expected = new Date(new Date().getTime() - 15 * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test('re1 works: n weeks ago', t => {

	var returned = relative("5 weeks ago")
	var expected = new Date(new Date().getTime() - 5 * week);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("19 weeks ago")
	var expected = new Date(new Date().getTime() - 19 * week);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

// TODO
test.failing('re1 works: n months ago', t => {

	var returned = relative("5 months ago")
	var expected = new Date();
	expected.setMonth((expected.getMonth() - 5) % 12);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("19 months ago")
	var expected = new Date();
	expected.setMonth((expected.getMonth() - 19) % 12);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test.failing('re1 works: n years ago', t => {

	var returned = relative("5 years ago")
	var expected = new Date();
	expected.setFullYear(expected.getFullYear() - 5);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("19 years ago")
	var expected = new Date();
	expected.setFullYear(expected.getFullYear() - 19);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test('re1 works: n weeks ago', t => {

	var returned = relative("5 weeks ago")
	var expected = new Date(new Date().getTime() - 5 * week);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("19 weeks ago")
	var expected = new Date(new Date().getTime() - 19 * week);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test('re2 works: last <day-name>/<day-abbreviation>', t => {

	var returned = relative("last Tuesday")
	var expected = new Date(new Date().getTime() - (7 - Math.abs(new Date().getDay() - 2)) * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("last Wed")
	var expected = new Date(new Date().getTime() - (7 - Math.abs(new Date().getDay() - 3)) * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("previous Friday")
	var expected = new Date(new Date().getTime() - (7 - Math.abs(new Date().getDay() - 5)) * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test('re2 works: last <day-name>/<day-abbreviation> (starting with lowercase)', t => {

	var returned = relative("last tuesday")
	var expected = new Date(new Date().getTime() - (7 - Math.abs(new Date().getDay() - 2)) * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("last wed")
	var expected = new Date(new Date().getTime() - (7 - Math.abs(new Date().getDay() - 3)) * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("previous friday")
	var expected = new Date(new Date().getTime() - (7 - Math.abs(new Date().getDay() - 5)) * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test('re3 works: absolute date in the past 1 year', t => {

	var returned = relative("7th April")
	var expected = new Date();
	expected.setMonth(3);
	expected.setDate(7);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("12th December")
	var expected = new Date();
	expected.setMonth(11);
	expected.setDate(12);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("19th Nov")
	var expected = new Date();
	expected.setMonth(10);
	expected.setDate(19);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});

test('re3 works: absolute date in the past 1 year (mixed case)', t => {

	var returned = relative("7th aPRIl")
	var expected = new Date();
	expected.setMonth(3);
	expected.setDate(7);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("12th dECEMBer")
	var expected = new Date();
	expected.setMonth(11);
	expected.setDate(12);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("19th noV")
	var expected = new Date();
	expected.setMonth(10);
	expected.setDate(19);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});
