"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vueRouter = require("vue-router");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var route1 = [{
  path: '/test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/Test1'));
    });
  }
}, {
  path: '/slot_test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/slot_test/s1'));
    });
  }
}, {
  path: '/transition_test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/transition_test/t1'));
    });
  }
}, {
  path: '/loader_test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/loader_test/l1'));
    });
  }
}, {
  path: '/elementplus_test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/elementplus_test/et1'));
    });
  }
}, {
  path: '/composite_api_test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/composite_api_test/c1'));
    });
  }
}, {
  path: '/teleport_test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/teleport_test/t1'));
    });
  }
}, {
  path: '/vuex_test1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/vuex_test/t1'));
    });
  }
}, {
  path: '/vuex_test2',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/vuex_test/t2'));
    });
  }
}, {
  path: '/router_test/:id/route/:name',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/router_test/t1'));
    });
  }
}, {
  path: '/router_test2',
  name: 'RouterTest2',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/router_test/t2'));
    });
  },
  // eslint-disable-next-line no-unused-vars
  beforeEnter: function beforeEnter(to, from, next) {
    console.log('router_test2 beforeEnter');
    next();
  } //路由独享的守卫只有beforeEnter，对离开路由没有监控

}, {
  path: '/websocket_test1',
  name: 'WebsocketTest1',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/components/websocket_test/t1'));
    });
  }
}]; //大坑，定义route1一定要写在上面

var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(),
  routes: route1
});
var _default = router;
exports["default"] = _default;