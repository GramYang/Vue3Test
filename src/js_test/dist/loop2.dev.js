"use strict";

//settimeout+promise实现无线递归循环
var isLoop = true;

function loop(f, t1, t2) {
  return new Promise(function (resolve) {
    if (isLoop) {
      f(t1);
    }

    return resolve();
  }).then(function () {
    if (isLoop) {
      setTimeout(function () {
        loop(f, t1, t2);
      }, t2);
    }
  });
}

loop(function (t) {
  console.log('this is loop1 with param ', t);
}, 20, 2000);
loop(function (t) {
  console.log('this is loop2 with param ', t);
}, 30, 2500);
loop(function (t) {
  console.log('this is loop3 with param ', t);
}, 40, 3000);
setTimeout(function () {
  isLoop = false;
  console.log('stop loop');
}, 30000);