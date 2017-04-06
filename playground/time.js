var moment = require('moment');

// var date = moment();
// date.add(21, 'year').subtract(9, 'months');
// console.log(date.format('LT'));
// console.log(date.format('h:mm A'));

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('LT'));
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);