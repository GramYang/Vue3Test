"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = send;
exports.setHeartBeat = setHeartBeat;
exports.websocketConnect = websocketConnect;
exports.websocketClose = websocketClose;

var _bean_meta = _interopRequireDefault(require("./bean_meta.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//websocketClient的心跳有3种触发方式：
//1，连接服务端成功后会触发一次延迟心跳包发送。
//2，服务端每次响应都会触发一次延迟心跳包发送。
//3，心跳包发送服务端一段时间内无响应会触发一次断线重连，重连成功会触发1。
//流程整理
//1，websocketClient连接成功后延迟15秒发送心跳包，其中也可能会发送消息。
//2，websocketClient收到响应，这个响应可能是消息响应而不是心跳包响应。响应触发另一次延迟心跳包，但是这个心跳包可能会被响应给重置导致发不出去。
//3，如果服务端不响应消息，或者客户端没有消息发送触发响应。那么websocketClient会延迟发送一次心跳包，这个心跳包需要服务端响应。
//总结：
//1，如果消息和响应够密集，那么websocketClient会一个心跳包也发不出去，这就需要服务端将所有的消息请求都看作心跳包。
//2，如果消息和响应不够密集，触发了websocketClient发送的心跳包，也应该响应此心跳包以触发websocketClient后续的心跳包。
var addr = "ws://127.0.0.1:8104/entry";
var reconnectTimeout = 5000;
var pingTimeout = 15000;
var pongTimeout = 10000;
var heartbeat = null; //此变量在连接前必须赋值！

var ws = null;
var isOpen = false;
var lockReconnect = false;
var forbidReconnect = false;
var repeat = 0;
var repeatLimit = 10;
var pingTimeoutId = null;
var pongTimeoutId = null;

function handleMessage(evt) {
  if (evt.data instanceof ArrayBuffer) {
    var dv = new DataView(evt.data);
    var msgid = dv.getUint16(0, true);
    var msg = JSON.parse(new TextDecoder('utf8').decode(evt.data.slice(2)));

    if (_bean_meta["default"].responseMap.has(msgid)) {
      console.log('websocket handle msg' + msgid + '|' + msg);
    } else {
      console.log('websocket handle unknown message:', msg);
    }
  }

  heartCheck();
}

function reconnect() {
  if (repeatLimit <= repeat) {
    return;
  }

  if (lockReconnect || forbidReconnect) {
    return;
  }

  lockReconnect = true;
  repeat++;
  setTimeout(function () {
    websocketConnect();
    console.log('重连');
    lockReconnect = false;
  }, reconnectTimeout);
}

function send(id, msg) {
  if (ws != null && isOpen) {
    var msgData = new TextEncoder('utf8').encode(JSON.stringify(msg));
    var dv = new DataView(new ArrayBuffer(msgData.length + 2));
    dv.setUint16(0, id, true);

    for (var i = 0; i < msgData.length; i++) {
      dv.setUint8(2 + i, msgData[i]);
    }

    ws.send(dv);
    console.log('websocket send:' + id + '|' + msg);
  }
}

function heartReset() {
  clearTimeout(pingTimeoutId);
  clearTimeout(pongTimeoutId);
}

function heartStart() {
  if (forbidReconnect) {
    return;
  }

  pingTimeoutId = setTimeout(function () {
    send(_bean_meta["default"].ClientHeartBeat, heartbeat);
    pongTimeoutId = setTimeout(function () {
      ws.close();
    }, pongTimeout);
  }, pingTimeout);
}

function heartCheck() {
  heartReset();
  heartStart();
}

function setHeartBeat(o) {
  if (heartbeat == null) {
    heartbeat = o;
  }
}

function websocketConnect() {
  if (isOpen) {
    return;
  }

  console.log('websocket connecting...');
  ws = new WebSocket(addr);
  ws.binaryType = 'arraybuffer';

  ws.onopen = function (evt) {
    console.log('websocket open' + evt);
    repeat = 0;
    isOpen = true;
    heartCheck();
  };

  ws.onerror = function (evt) {
    console.log('websocket connect failure' + evt);
    isOpen = false;
    reconnect();
  };

  ws.onclose = function (evt) {
    console.log('websocket close' + evt);
    isOpen = false;
    reconnect();
  };

  ws.onmessage = handleMessage;
}

function websocketClose() {
  isOpen = false;
  forbidReconnect = true;
  heartReset();
  ws.close();
  ws = null;
}