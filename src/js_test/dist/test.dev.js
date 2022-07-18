"use strict";

function setCookie(json) {
  var date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString();
  var cookie = '';

  for (var o in json) {
    cookie += o + '=' + json[o] + "; expires=" + date + ";";
  }

  console.log('cookie:' + cookie);
}

setCookie({
  a: '1',
  b: 2
});