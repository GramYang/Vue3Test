"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var modeClass = {};

modeClass.op1 = function () {
  console.log('modeclass op1');
};

modeClass.op2 = function () {
  modeClass.op1();
  console.log('modeclass op2');
  modeClass.op3();
};

modeClass.op3 = function () {
  console.log('modeclass op3');
};

var _default = modeClass;
exports["default"] = _default;