"use strict";

//map使用测试
var m1 = new Map([[1, 'a'], [2, 'b'], [2, 'c'], [0, 'e']]);
console.log(m1.get(2), m1.has(2)); //c

console.log(m1.get(3), m1.has(3)); //undefined

m1.set(4, 'd');
console.log(m1, m1.size); //Map(4) { 1 => 'a', 2 => 'c', 0 => 'e', 4 => 'd' } 4

var keys = [];
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = m1.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var x = _step.value;
    keys.push(x);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

console.log(keys); //[ 1, 2, 0, 4 ]
//array使用测试

var a1 = [1, 2, 3, 4];
console.log(a1[2]); //3

console.log(a1[5]); //undefined，数组越界不会报错会undefined

a1.push(5);
var sum = 0;
a1.forEach(function (x) {
  return sum += x;
});
console.log(sum); //15

a1.push({
  a: 5
});
console.log(a1); //[ 1, 2, 3, 4, 5, { a: 5 } ]

for (var i = 0; i < a1.length; i++) {
  //数组遍历
  console.log(a1[i], a1.at(i)); //数组寻址
}

a1[7] = 7;
console.log(a1); //[ 1, 2, 3, 4, 5, { a: 5 }, <1 empty item>, 7 ]，越界赋值也不会报错

console.log(a1[6] == undefined); //true，中间遗漏的元素是undefined
//array提取数组中对象的指定域的值

var a2 = [{
  a: 1
}, {
  a: 2
}, {
  a: 3
}];
var a3 = [];

for (var _i = 0, _a = a2; _i < _a.length; _i++) {
  var _x = _a[_i];

  if ('a' in _x) {
    a3.push(_x['a']);
  }
}

console.log(a3); //[ 1, 2, 3 ]