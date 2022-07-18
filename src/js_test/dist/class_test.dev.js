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

for (var i in b) {
  console.log(i, ':', b[i]);
} //遍历对象


var o = {};
o.a = 1;
o.b = 2;
b = o; //类实例和对象可以相互赋值

console.log(o, b); //{ a: 1, b: 2 } { a: 1, b: 2 }

var o1 = {
  a: null,
  b: function b() {
    console.log('this is b');

    if (this.c) {
      this.c();
    }
  },
  c: function c() {}
}; // o1.c=function(){
//     console.log('this is c')
// }

o1.b();
o1 = o; //对象之间可以相互赋值这不用说

console.log(o1); //{ a: 1, b: 2 }

var Bean2 = function Bean2() {
  _classCallCheck(this, Bean2);

  this.a = 1;
  this.b;
};

var b1 = new Bean2();
console.log(b1); //Bean2 { a: 1 }，可见类成员必须赋初始值
//判断对象中是否有某个域

var o2 = {
  a: 1
};
console.log('a' in o2); //true
// console.log(o2.hasOwnProperty('a'))//true，可以运行但是eslint提示你别用
//对象域名规则测试

var o3 = {};
o3.e1 = 'a'; //域名不能是数字，但是可以带上数字

console.log(o3); //对象的this污染测试

var o4 = {
  a: 100,
  b: {
    x: 10
  },
  c: function c() {
    var that = this; //只能这么写

    this.b.op1 = function () {
      console.log(this.x); //10

      console.log(that.a); //100
    };

    this.b.op1();
  }
};
o4.c();