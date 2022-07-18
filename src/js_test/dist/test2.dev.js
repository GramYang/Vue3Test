"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bean1 = function Bean1(a, b, c, d, e) {
  _classCallCheck(this, Bean1);

  this.a = a;
  this.b = b;
  this.c = c;
  this.d = d;
  this.e = e;
};

var b = new Bean1(1, 2, 3, 4, 5);
console.log(b); //Bean1 { a: 1, b: 2, c: 3, d: 4, e: 5 }，所有的域都在成员提示里面

b.f = 6;
console.log(b); //Bean1 { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }，f不在类成员提示里面

var o = {};
o.a = 1;
o.b = 2; // let b=o//对象和类实例不能赋值

console.log(o); //{ a: 1, b: 2 }，类实例也有成员提示

var Bean2 = function Bean2() {
  _classCallCheck(this, Bean2);

  this.a;
  this.b;
};

var b1 = new Bean2();
console.log(b1); //Bean2 {}，可见类成员必须赋初始值