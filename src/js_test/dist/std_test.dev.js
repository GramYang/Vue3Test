"use strict";

//Date使用测试
var now = new Date();
console.log(now.getTime(), Date.now()); //获取毫秒时间戳

console.log(now.getDate()); //获取月中的日数1-31

console.log(now.getDay()); //获取星期数，0-1，0代表星期天

console.log(now.getFullYear()); //获取年份，此方法替代getYear

console.log(now.getHours()); //获取当前小时数，0-23

console.log(now.getMilliseconds()); //获取当前毫秒数

console.log(now.getMinutes()); //获取分钟数

console.log(now.getMonth()); //获取月份数，0表示1月

console.log(now.getSeconds()); //获取秒数

var ts1 = Date.UTC(2022, 5, 9, 3, 4, 5);
console.log('utc ', ts1); //utc  1654743845000

var date1 = new Date(ts1);
console.log(ts1, date1.toUTCString()); //Thu, 09 Jun 2022 03:04:05 GMT

var id = setTimeout(function () {
  console.log('this is test');
}, 3000);
console.log(id);
var id1 = {};
var id2 = null;
clearTimeout(id);
clearTimeout(id1);
clearTimeout(id2);