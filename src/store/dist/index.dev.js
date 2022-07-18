"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vuex = require("vuex");

var _elementPlus = require("element-plus");

var A = {
  namespaced: true,
  state: function state() {
    return {
      v1: '1',
      v2: false,
      v3: 10,
      v4: {},
      get1: [{
        id: 1,
        text: '...',
        done: true
      }, {
        id: 2,
        text: '...',
        done: false
      }],
      get2: [1, 2, 3, 4],
      obj1: {
        a: 1,
        b: 'a',
        c: [1, 2, 3, 4],
        d: {
          x: 10,
          y: 20.2,
          z: 'asdasd'
        },
        e: [{
          a: 1
        }, {
          a: 2
        }, {
          a: 3
        }]
      },
      obj2: {
        a: 1,
        b: 'a',
        c: [1, 2, 3, 4],
        d: {
          x: 10,
          y: 20.2,
          z: 'asdasd'
        },
        e: [{
          a: 1
        }, {
          a: 2
        }, {
          a: 3
        }]
      },
      map1: new Map([['a', {
        x: 1
      }]])
    };
  },
  getters: {
    get1opt1: function get1opt1(state) {
      return state.get1.filter(function (v) {
        return v.done;
      });
    },
    get1opt2: function get1opt2(state, getters) {
      return getters.get1opt1.length;
    },
    //这里不能传参id，只能写成这种闭包的方式
    get1opt3: function get1opt3(state) {
      return function (id) {
        return state.get1.find(function (v) {
          return v.id === id;
        });
      };
    },
    //复合多对象获取
    get2: function get2(state) {
      return state.obj1;
    },
    get3: function get3(state) {
      return state.obj2;
    }
  },
  mutations: {
    change1: function change1(state) {
      state.v1 += '1';
      console.log('invoke store change1', state);
    },
    change11: function change11(state, msg) {
      state.v1 = msg;
      (0, _elementPlus.ElMessage)(msg);
    },
    change2: function change2(state, n) {
      state.v3 += n;
      console.log('invoke store change2', state);
    },
    change3: function change3(state, n) {
      state.v1 + n.n1;
      state.v2 = !n.n2;
      state.v3 += n.n3;
      console.log('invoke store change3', state);
    },
    change4: function change4(state, payload) {
      state.v3 += payload.n;
      console.log('invoke store change4', state);
    },
    //复合对象修改
    change5: function change5(state, n) {
      state.obj1.d.x += n;
      console.log('invoke store change5');
    },
    change6: function change6(state, n) {
      state.obj2.e[1].a += n;
      console.log('invoke store change6');
    },
    change7: function change7(state, o) {
      state.v4 = o;
      console.log('invoke store change7', state.v4);
    },
    change8: function change8(state, n) {
      state.obj2.d.x += n;
      console.log('invoke store change8');
    },
    change9: function change9(state, n) {
      var v = state.map1.get(n.key);
      v.x += n.value;
      state.map1.set(n.key, v);
      console.log('invoke store change9');
    },
    change10: function change10(state, n) {
      state.get1[0].id += n;
      state.get2[1] += n;
    }
  },
  actions: {
    change1: function change1(context) {
      context.commit('change1');
    },
    change1async: function change1async(_ref) {
      var commit = _ref.commit;
      setTimeout(function () {
        commit('change1');
      }, 3000);
    },
    change2: function change2(_ref2, n) {
      var commit = _ref2.commit;
      commit('change2', n);
    },
    change4: function change4(context, payload) {
      context.commit('change4', payload);
    },
    change1promise: function change1promise(_ref3, n) {
      var commit = _ref3.commit;
      commit('change1');
      return new Promise(function (resolve, reject) {
        if (n > 5) {
          resolve('ok');
        } else {
          reject('error');
        }
      });
    }
  }
}; //定义的子模块一定要写在上面

var store = (0, _vuex.createStore)({
  modules: {
    a: A
  }
});
var _default = store;
exports["default"] = _default;