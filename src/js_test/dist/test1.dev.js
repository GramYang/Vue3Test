"use strict";

var m1 = new Map([[1, 'a'], [2, 'b'], [2, 'c']]);
console.log(m1.get(2), m1.has(2)); //c

console.log(m1.get(3), m1.has(3)); //undefined

m1.set(4, 'd');
console.log(m1, m1.size);
var a1 = [1, 2, 3, 4];
console.log(a1[2]); //3

a1.push(5);
a1.push({
  a: 5
});
console.log(a1);
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