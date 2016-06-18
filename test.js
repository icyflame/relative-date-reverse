import test from 'ava';
var relative = require('./');
var dateable = require('dateable');
var day = 24 * 60 * 60 * 1000;

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

	var returned = relative("5 days ago")
	var expected = new Date(new Date().getTime() - 5 * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("last Tuesday")
	var expected = new Date(new Date().getTime() - (7 - Math.abs(new Date().getDay() - 2)) * day);

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

	var returned = relative("7th April")
	var expected = new Date(new Date(new Date().setMonth(3)).setDate(7));

	t.true(returned[0]);
	t.true(dateable(returned[1], 'YYYY-MM-DD') === dateable(expected, 'YYYY-MM-DD'));

});
