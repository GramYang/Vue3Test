"use strict";

//switch测试
var a = 2;

switch (a) {
  case 1:
    console.log(1);
    break;

  case 2:
    console.log(2);
    console.log(2);
    break;

  case 3:
    //要在case里面执行复制语句需要放到代码块里面
    {
      var a1 = 10;
      console.log(a1);
    }
}

console.log(12 / 10, parseInt(1.2)); //1.2 1，使用parseInt将浮点数转换为整数

var b = 12;

switch (b / 10) {
  case 1:
    console.log('b get 1'); //

    break;

  case 1.2:
    console.log('b get 1.2');
    break;
} //if条件判断测试


var o1 = {};
o1.a = '';
console.log(o1.a ? 1 : 0); //0

if (!o1.a) {
  console.log(0); //0
}

o1.a = '0';
console.log(o1.a ? 1 : 0); //1

if (o1.a) {
  console.log(1); //1
}