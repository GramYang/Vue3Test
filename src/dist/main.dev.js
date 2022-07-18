"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("@/router"));

var _index = _interopRequireDefault(require("@/store/index.js"));

var _elementPlus = _interopRequireDefault(require("element-plus"));

require("element-plus/dist/index.css");

var _bag = _interopRequireDefault(require("@/net/bag.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _vue.createApp)(_App["default"]);
app.use(_elementPlus["default"]);
app.use(_router["default"]);
app.use(_index["default"]);
app.mount('#app');
app.config.globalProperties.bag = _bag["default"];