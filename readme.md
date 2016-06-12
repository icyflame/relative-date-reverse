# relative-date-reverse

> Convert from commonly used relative date strings like `yesterday` and `tomorrow` to `Date` objects

[![Build Status](https://travis-ci.org/icyflame/relative-date-reverse.svg?branch=master)](https://travis-ci.org/icyflame/relative-date-reverse)

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

## Install

```
$ npm install --save relative-date-reverse
```


## Usage

```js
var relativeDateReverse = require('relative-date-reverse');

// if you run this on 12th June, 2016
relativeDateReverse('yesterday');
//=> [true, new Date('2016-06-11')]

relativeDateReverse('some days ago');
//=> [false, '']
```


## API

### relativeDateReverse(input)

#### input

*Required*  
Type: `string`

The relative date string to be parsed. (Can be anything like `yesterday`, `day before yesterday`, `4 days ago`, etc)


## TODO

- [ ] Incorporate support for `#{n} (days|weeks|months|years) ago`


## License

MIT © [Siddharth Kannan](http://icyflame.github.io)
