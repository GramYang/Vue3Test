"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//js位运算测试
var a = 4;
console.log(a >> 1 & 1); //0

var b = '1';
console.log(parseInt(b)); //1

console.log(parseInt('a')); //NaN

var c = 1 + '';
console.log(_typeof(c)); //string测试

var arr1 = ['a', 'b', 'c'];
var s1 = arr1.concat(arr1);
console.log(s1); //concat不能指示连接符号