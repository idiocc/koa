#!/usr/bin/env node
'use strict';
const http = require('http');
const stream = require('stream');
const events = require('events');
const util = require('util');
const tty = require('tty');
const assert = require('assert');
const path = require('path');
const fs = require('fs');
const _crypto = require('crypto');
const url = require('url');
const net = require('net');
const querystring = require('querystring');             
var aa = tty;
const {format:m, inspect:p} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function ba(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return ca(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.G ? (b = Math.abs(a), a = 864E5 <= b ? q(a, b, 864E5, "day") : 36E5 <= b ? q(a, b, 36E5, "hour") : 6E4 <= b ? q(a, b, 6E4, "minute") : 1000 <= b ? q(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function ca(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
    var b = parseFloat(a[1]);
    switch((a[2] || "ms").toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return 315576E5 * b;
      case "weeks":
      case "week":
      case "w":
        return 6048E5 * b;
      case "days":
      case "day":
      case "d":
        return 864E5 * b;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return 36E5 * b;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return 6E4 * b;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return 1000 * b;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return b;
    }
  }
}
function q(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const da = /\B(?=(\d{3})+(?!\d))/g, ea = /(?:\.0*|(\.[^0]+)0+)$/, r = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function u(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.I || "", e = b && b.K || "", f = b && void 0 !== b.w ? b.w : 2, g = !(!b || !b.F);
  (b = b && b.J || "") && r[b.toLowerCase()] || (b = c >= r.pb ? "PB" : c >= r.tb ? "TB" : c >= r.gb ? "GB" : c >= r.mb ? "MB" : c >= r.kb ? "KB" : "B");
  a = (a / r[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(ea, "$1"));
  d && (a = a.replace(da, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const fa = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function v(a, b) {
  return (b = fa[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var ha = {f:u, ["fy"](a) {
  return v(u(a) || "", "yellow");
}, ["fr"](a) {
  return v(u(a) || "", "red");
}, ["fb"](a) {
  return v(u(a) || "", "blue");
}, ["fg"](a) {
  return v(u(a) || "", "green");
}, ["fc"](a) {
  return v(u(a) || "", "cyan");
}, ["fm"](a) {
  return v(u(a) || "", "magenta");
}};
const w = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), ia = Object.assign({}, {o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return p(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return p(a, b);
}}, ha), y = {init:function(a) {
  a.inspectOpts = Object.assign({}, w);
}, log:function(...a) {
  return process.stderr.write(m(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), g = `  ${f};1m${b} \u001B[0m`;
    a[0] = g + a[0].split("\n").join("\n" + g);
    a.push(f + "m+" + ba(e) + "\u001b[0m");
  } else {
    a[0] = (w.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in w ? !!w.colors : aa.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:w, formatters:ia};
function ja(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = ka(g[0]);
      "string" != typeof g[0] && g.unshift("%O");
      var k = 0;
      g[0] = g[0].replace(/%([a-zA-Z%]+)/g, (l, n) => {
        if ("%%" == l) {
          return l;
        }
        k++;
        if (n = c[n]) {
          l = n.call(b, g[k]), g.splice(k, 1), k--;
        }
        return l;
      });
      d.call(b, g);
      (b.log || e).apply(b, g);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let f;
  return b;
}
function la(a) {
  const b = ja(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function ma(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function na(a) {
  var b = y.load();
  a.save(b);
  a.i = [];
  a.l = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.l.push(new RegExp("^" + b.substr(1) + "$")) : a.i.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class oa {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.i = [];
    this.l = [];
  }
  destroy(a) {
    a = this.a.indexOf(a);
    return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
  }
  enabled(a) {
    if ("*" == a[a.length - 1]) {
      return !0;
    }
    let b, c;
    b = 0;
    for (c = this.l.length; b < c; b++) {
      if (this.l[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.i.length; b < c; b++) {
      if (this.i[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function ka(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;/*
 MIT 2014 Jordan Harband
 https://github.com/ljharb/is-generator-function
*/
const pa = Object.prototype.toString, qa = Function.prototype.toString, ra = /^\s*(?:function)?\*/, z = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, A = Object.getPrototypeOf;
var B;
a: {
  if (z) {
    try {
      B = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    B = void 0;
  } else {
    B = !1;
  }
}
const C = B, sa = C ? A(C) : {};
const {OutgoingMessage:ta, createServer:ua} = http;
var D = stream;
var va = events;
var E = assert;
const {basename:F, extname:G} = path;
var H = {[100]:"Continue", [101]:"Switching Protocols", [102]:"Processing", [103]:"Early Hints", [200]:"OK", [201]:"Created", [202]:"Accepted", [203]:"Non-Authoritative Information", [204]:"No Content", [205]:"Reset Content", [206]:"Partial Content", [207]:"Multi-Status", [208]:"Already Reported", [226]:"IM Used", [300]:"Multiple Choices", [301]:"Moved Permanently", [302]:"Found", [303]:"See Other", [304]:"Not Modified", [305]:"Use Proxy", [306]:"(Unused)", [307]:"Temporary Redirect", [308]:"Permanent Redirect", 
[400]:"Bad Request", [401]:"Unauthorized", [402]:"Payment Required", [403]:"Forbidden", [404]:"Not Found", [405]:"Method Not Allowed", [406]:"Not Acceptable", [407]:"Proxy Authentication Required", [408]:"Request Timeout", [409]:"Conflict", [410]:"Gone", [411]:"Length Required", [412]:"Precondition Failed", [413]:"Payload Too Large", [414]:"URI Too Long", [415]:"Unsupported Media Type", [416]:"Range Not Satisfiable", [417]:"Expectation Failed", [418]:"I'm a teapot", [421]:"Misdirected Request", [422]:"Unprocessable Entity", 
[423]:"Locked", [424]:"Failed Dependency", [425]:"Unordered Collection", [426]:"Upgrade Required", [428]:"Precondition Required", [429]:"Too Many Requests", [431]:"Request Header Fields Too Large", [451]:"Unavailable For Legal Reasons", [500]:"Internal Server Error", [501]:"Not Implemented", [502]:"Bad Gateway", [503]:"Service Unavailable", [504]:"Gateway Timeout", [505]:"HTTP Version Not Supported", [506]:"Variant Also Negotiates", [507]:"Insufficient Storage", [508]:"Loop Detected", [509]:"Bandwidth Limit Exceeded", 
[510]:"Not Extended", [511]:"Network Authentication Required"};
/*
 statuses
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
const xa = wa(), ya = {[300]:!0, [301]:!0, [302]:!0, [303]:!0, [305]:!0, [307]:!0, [308]:!0}, I = {[204]:!0, [205]:!0, [304]:!0};
function wa() {
  var a = J;
  const b = [];
  Object.keys(H).forEach(c => {
    const d = H[c];
    c = Number(c);
    a[c] = d;
    a[d] = c;
    a[d.toLowerCase()] = c;
    b.push(c);
  });
  return b;
}
function J(a) {
  if ("number" == typeof a) {
    if (!J[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!J[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = J[a.toLowerCase()];
  if (!b) {
    throw Error('invalid status message: "' + a + '"');
  }
  return b;
}
;/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function K(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var x, M = 0; M < f.length; M++) {
      x = f[M], x.A.removeListener(x.event, x.B);
    }
  }
  function e(x) {
    b = x;
  }
  if (!Array.isArray(a)) {
    throw new TypeError("arg must be an array of [ee, events...] arrays");
  }
  for (var f = [], g = 0; g < a.length; g++) {
    var h = a[g];
    if (!Array.isArray(h) || 2 > h.length) {
      throw new TypeError("each array member must be [ee, events...]");
    }
    for (var k = h[0], l = 1; l < h.length; l++) {
      var n = h[l], t = za(n, c);
      k.on(n, t);
      f.push({A:k, event:n, B:t});
    }
  }
  e.cancel = d;
  return e;
}
function za(a, b) {
  return function(c) {
    for (var d = Array(arguments.length), e = "error" == a ? c : null, f = 0; f < d.length; f++) {
      d[f] = arguments[f];
    }
    b(e, this, a, d);
  };
}
;/*
 on-finished
 Copyright(c) 2013 Jonathan Ong
 Copyright(c) 2014 Douglas Christopher Wilson
 MIT Licensed
*/
function L(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.s || (c = a.__onFinished = Aa(a), Ba(a, c)), c.s.push(b));
}
function Ba(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = K([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = K([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function Aa(a) {
  function b(c) {
    a.__onFinished === b && (a.__onFinished = null);
    if (b.s) {
      var d = b.s;
      b.s = null;
      for (var e = 0; e < d.length; e++) {
        d[e](c, a);
      }
    }
  }
  b.s = [];
  return b;
}
;const {ReadStream:Ca} = fs;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 https://npmjs.org/destroy
*/
function Da(a) {
  if (a instanceof Ca) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", Ea);
    }
    return a;
  }
  if (!(a instanceof D)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function Ea() {
  "number" == typeof this.fd && this.close();
}
;/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const Fa = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function Ga(a) {
  for (var b = 0, c = [], d = 0, e = 0, f = a.length; e < f; e++) {
    switch(a.charCodeAt(e)) {
      case 32:
        d == b && (d = b = e + 1);
        break;
      case 44:
        c.push(a.substring(d, b));
        d = b = e + 1;
        break;
      default:
        b = e + 1;
    }
  }
  c.push(a.substring(d, b));
  return c;
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const N = require("mime-db"), Ha = /^\s*([^;\s]*)(?:;|\s|$)/, Ia = /^text\//i, Ja = Object.create(null), O = Object.create(null);
Ka();
function P(a) {
  return a && "string" == typeof a ? (a = G("x." + a).toLowerCase().substr(1)) ? O[a] || !1 : !1 : !1;
}
function Ka() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(N).forEach(b => {
    const c = N[b], d = c.extensions;
    if (d && d.length) {
      Ja[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (O[f]) {
          const g = a.indexOf(N[O[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != O[f] && (g > h || g == h && "application/" == O[f].substr(0, 12))) {
            continue;
          }
        }
        O[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const La = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, Ma = /\\([\u000b\u0020-\u00ff])/g, Na = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function Oa(a) {
  if (!a) {
    throw new TypeError("argument string is required");
  }
  if ("object" == typeof a) {
    if ("function" == typeof a.getHeader) {
      var b = a.getHeader("content-type");
    } else {
      "object" == typeof a.headers && (b = (a = a.headers) && a["content-type"]);
    }
    if ("string" != typeof b) {
      throw new TypeError("content-type header is missing from object");
    }
    a = b;
  }
  if ("string" != typeof a) {
    throw new TypeError("argument string is required to be a string");
  }
  b = a.indexOf(";");
  var c = -1 != b ? a.substr(0, b).trim() : a.trim();
  if (!Na.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new Pa(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (La.lastIndex = b; d = La.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(Ma, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class Pa {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const Qa = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function Ra(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = Oa(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = Qa.test(e.toLowerCase()) ? e : null;
    } catch (g) {
      d = null;
    }
  }
  a = d;
  if (!a) {
    return !1;
  }
  b && !Array.isArray(b) && (b = [b, ...c]);
  if (!b || !b.length) {
    return a;
  }
  for (c = 0; c < b.length; c++) {
    var f = Sa(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function Ta(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return Ra(a.headers["content-type"], b);
}
function Sa(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? P(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var Ua = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, Va = /%[0-9A-Fa-f]{2}/, Wa = /[^\x20-\x7e\xa0-\xff]/g, Xa = /([\\"])/g, Ya = /^[\x20-\x7e\x80-\xff]+$/, Za = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function $a(a, b) {
  var c = b || {};
  b = c.type || "attachment";
  var d = c.fallback;
  if (void 0 !== a) {
    c = {};
    if ("string" !== typeof a) {
      throw new TypeError("filename must be a string");
    }
    void 0 === d && (d = !0);
    if ("string" !== typeof d && "boolean" !== typeof d) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" === typeof d && Wa.test(d)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = F(a);
    var e = Ya.test(a);
    d = "string" !== typeof d ? d && String(a).replace(Wa, "?") : F(d);
    var f = "string" === typeof d && d !== a;
    if (f || !e || Va.test(a)) {
      c["filename*"] = a;
    }
    if (e || f) {
      c.filename = f ? d : a;
    }
  } else {
    c = void 0;
  }
  c = new ab(b, c);
  b = c.parameters;
  c = c.type;
  if (!c || "string" !== typeof c || !Za.test(c)) {
    throw new TypeError("invalid type");
  }
  c = String(c).toLowerCase();
  if (b && "object" === typeof b) {
    for (e = Object.keys(b).sort(), d = 0; d < e.length; d++) {
      a = e[d], f = "*" === a.substr(-1) ? "UTF-8''" + encodeURIComponent(String(b[a])).replace(Ua, bb) : '"' + String(b[a]).replace(Xa, "\\$1") + '"', c += "; " + a + "=" + f;
    }
  }
  return c;
}
function bb(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
function ab(a, b) {
  this.type = a;
  this.parameters = b;
}
;/*
 MIT
 Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/error-inject
*/
function cb(a, b) {
  if (a instanceof D && !a.listeners("error").includes(b)) {
    a.on("error", b);
  }
}
;/*
 MIT
 [cache-content-type] Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/cache-content-type
 [ylru] Author fengmk2
 https://github.com/node-modules/ylru
*/
function db(a, b, c) {
  a.cache.set(b, c);
  a.a++;
  a.a >= a.max && (a.a = 0, a.i = a.cache, a.cache = new Map);
}
class eb {
  constructor(a) {
    this.max = a;
    this.a = 0;
    this.cache = new Map;
    this.i = new Map;
  }
  get(a, b = {}) {
    function c() {
      return e = e || Date.now();
    }
    let d = this.cache.get(a);
    ({maxAge:b} = b);
    let e;
    if (d) {
      return d.j && c() > d.j ? (d.j = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.j = a), d.value;
    }
    if (d = this.i.get(a)) {
      return d.j && c() > d.j ? (d.j = 0, d.value = void 0) : (db(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.j = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    ({maxAge:c} = c);
    c = c ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.j = c, d.value = b) : (d = {value:b, j:c}, db(this, a, d));
  }
  keys() {
    function a(d) {
      const e = d[0], f = d[1];
      (d[1].value && !d[1].j || f.j >= c) && b.add(e);
    }
    const b = new Set, c = Date.now();
    for (const d of this.cache.entries()) {
      a(d);
    }
    for (const d of this.i.entries()) {
      a(d);
    }
    return Array.from(b.keys());
  }
}
const fb = new eb(100);
/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function gb(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var hb = /["'&<>]/;
const {createHmac:ib} = _crypto;
/*
 keygrip
 Copyright(c) 2011-2014 Jed Schmidt
 MIT Licensed
*/
class jb {
  constructor(a, b = "sha1", c = "base64") {
    if (!(a && 0 in a)) {
      throw Error("Keys must be provided.");
    }
    this.a = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return kb(a, this.a, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = kb(a, this.a, this.keys[c], this.encoding);
      if (lb(b, e)) {
        return c;
      }
    }
    return -1;
  }
}
function kb(a, b, c, d) {
  return ib(b, c).update(a).digest(d).replace(/\/|\+|=/g, e => ({"/":"_", "+":"-", "=":""})[e]);
}
function lb(a, b) {
  if (null == a && null != b || null == b && null != a) {
    return !1;
  }
  if (null == a && null == b) {
    return !0;
  }
  if (a.length != b.length) {
    return !1;
  }
  for (var c = 0, d = 0; d < a.length; d++) {
    c |= a.charCodeAt(d) ^ b.charCodeAt(d);
  }
  return 0 === c;
}
;const Q = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, mb = /^(?:lax|strict)$/i;
function nb(a) {
  var b = a.toString();
  a.maxAge && (a.expires = new Date(Date.now() + a.maxAge));
  a.path && (b += "; path=" + a.path);
  a.expires && (b += "; expires=" + a.expires.toUTCString());
  a.domain && (b += "; domain=" + a.domain);
  a.sameSite && (b += "; samesite=", b = !0 === a.sameSite ? b + "strict" : b + a.sameSite.toLowerCase());
  a.secure && (b += "; secure");
  a.httpOnly && (b += "; httponly");
  return b;
}
class ob {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!Q.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !Q.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !Q.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !Q.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !mb.test(this.sameSite)) {
      throw new TypeError("option sameSite is invalid");
    }
  }
  toString() {
    return this.name + "=" + this.value;
  }
}
;/*
 cookies
 Copyright(c) 2014 Jed Schmidt, http://jed.is/
 Copyright(c) 2015-2016 Douglas Christopher Wilson
 MIT Licensed
*/
const R = {};
class pb {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.a = b;
    c && (this.keys = Array.isArray(c.keys) ? new jb(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    var c = a + ".sig", d, e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(R[a] ? R[a] : R[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
        d = d[1];
        if (!b || !e) {
          return d;
        }
        if (b = this.get(c)) {
          a = a + "=" + d;
          if (!this.keys) {
            throw Error(".keys required for signed cookies");
          }
          b = this.keys.index(a, b);
          if (0 > b) {
            this.set(c, null, {path:"/", signed:!1});
          } else {
            return b && this.set(c, this.keys.sign(a), {signed:!1}), d;
          }
        }
      }
    }
  }
  set(a, b, c) {
    c = void 0 === c ? {} : c;
    const {a:d, request:e} = this;
    let f = d.getHeader("Set-Cookie") || [];
    "string" == typeof f && (f = [f]);
    var g = e.protocol, h = e.connection.encrypted;
    g = void 0 !== this.secure ? !!this.secure : "https" == g || h;
    h = c;
    var k = Object.assign({}, h);
    h = void 0 === h.signed ? !!this.keys : h.signed;
    k = (delete k.signed, k);
    a = new ob(a, b, k);
    if (!g && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    "secure" in c || (a.secure = g);
    qb(f, a);
    if (c && h) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      qb(f, a);
    }
    (d.set ? ta.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function qb(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(nb(b));
}
;const rb = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function sb(a) {
  return a.split(",").map((b, c) => {
    var d = rb.exec(b.trim());
    if (d) {
      b = d[1];
      var e = 1;
      if (d[2]) {
        d = d[2].split(";");
        for (let f = 0; f < d.length; f++) {
          const g = d[f].trim().split("=");
          if ("q" == g[0]) {
            e = parseFloat(g[1]);
            break;
          }
        }
      }
      c = {charset:b, q:e, h:c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function tb(a, b) {
  const c = sb(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(ub).sort(vb).map(wb);
  }
  const d = b.map((e, f) => {
    {
      let h = {c:-1, q:0, g:0};
      for (let k = 0; k < c.length; k++) {
        a: {
          var g = c[k];
          let l = 0;
          if (g.charset.toLowerCase() === e.toLowerCase()) {
            l |= 1;
          } else {
            if ("*" != g.charset) {
              g = null;
              break a;
            }
          }
          g = {h:f, g:l, c:g.h, q:g.q};
        }
        g && 0 > (h.g - g.g || h.q - g.q || h.c - g.c) && (h = g);
      }
      e = h;
    }
    return e;
  });
  return d.filter(ub).sort(vb).map(e => b[d.indexOf(e)]);
}
function vb(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function wb(a) {
  return a.charset;
}
function ub(a) {
  return 0 < a.q;
}
;const xb = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function yb(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = xb.exec(a[d].trim());
    if (g) {
      var h = g[1], k = 1;
      if (g[2]) {
        g = g[2].split(";");
        for (var l = 0; l < g.length; l++) {
          var n = g[l].trim().split("=");
          if ("q" == n[0]) {
            k = parseFloat(n[1]);
            break;
          }
        }
      }
      f = {encoding:h, q:k, h:f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || zb("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, h:d});
  a.length = e;
  return a;
}
function zb(a, b, c) {
  var d = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    d |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {h:c, c:b.h, q:b.q, g:d};
}
function Ab(a, b) {
  var c = yb(a || "");
  if (!b) {
    return c.filter(Bb).sort(Cb).map(Db);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      var k = zb(e, c[h], f);
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(Bb).sort(Cb).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Cb(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function Db(a) {
  return a.encoding;
}
function Bb(a) {
  return 0 < a.q;
}
;const Eb = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function Fb(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = Gb(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Gb(a, b) {
  var c = Eb.exec(a);
  if (!c) {
    return null;
  }
  a = c[1];
  var d = c[2], e = a;
  d && (e += "-" + d);
  var f = 1;
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 0; g < c.length; g++) {
      var h = c[g].split("=");
      "q" == h[0] && (f = parseFloat(h[1]));
    }
  }
  return {prefix:a, H:d, q:f, h:b, m:e};
}
function Hb(a, b) {
  var c = Fb(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Ib).sort(Jb).map(Kb);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, n = Gb(e, void 0);
        if (n) {
          var t = 0;
          if (k.m.toLowerCase() === n.m.toLowerCase()) {
            t |= 4;
          } else {
            if (k.prefix.toLowerCase() === n.m.toLowerCase()) {
              t |= 2;
            } else {
              if (k.m.toLowerCase() === n.prefix.toLowerCase()) {
                t |= 1;
              } else {
                if ("*" !== k.m) {
                  k = null;
                  break a;
                }
              }
            }
          }
          k = {h:l, c:k.h, q:k.q, g:t};
        } else {
          k = null;
        }
      }
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(Ib).sort(Jb).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Jb(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function Kb(a) {
  return a.m;
}
function Ib(a) {
  return 0 < a.q;
}
;const Lb = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function Mb(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == Nb(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = Ob(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Ob(a, b) {
  var c = Lb.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == Nb(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(Pb);
    for (g = 0; g < c.length; g++) {
      var k = c[g];
      h = k[0].toLowerCase();
      k = (k = k[1]) && '"' === k[0] && '"' === k[k.length - 1] ? k.substr(1, k.length - 2) : k;
      if ("q" === h) {
        d = parseFloat(k);
        break;
      }
      a[h] = k;
    }
  }
  return {type:f, v:e, u:a, q:d, h:b};
}
function Qb(a, b, c) {
  var d = Ob(a, void 0);
  a = 0;
  if (!d) {
    return null;
  }
  if (b.type.toLowerCase() == d.type.toLowerCase()) {
    a |= 4;
  } else {
    if ("*" != b.type) {
      return null;
    }
  }
  if (b.v.toLowerCase() == d.v.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.v) {
      return null;
    }
  }
  var e = Object.keys(b.u);
  if (0 < e.length) {
    if (e.every(function(f) {
      return "*" == b.u[f] || (b.u[f] || "").toLowerCase() == (d.u[f] || "").toLowerCase();
    })) {
      a |= 1;
    } else {
      return null;
    }
  }
  return {h:c, c:b.h, q:b.q, g:a};
}
function Rb(a, b) {
  var c = Mb(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(Sb).sort(Tb).map(Ub);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      var k = Qb(e, c[h], f);
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(Sb).sort(Tb).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Tb(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function Ub(a) {
  return a.type + "/" + a.v;
}
function Sb(a) {
  return 0 < a.q;
}
function Nb(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function Pb(a) {
  var b = a.indexOf("=");
  if (-1 === b) {
    var c = a;
  } else {
    c = a.substr(0, b);
    var d = a.substr(b + 1);
  }
  return [c, d];
}
;/*
 MIT
 Copyright(c) 2012 Federico Romero
 Copyright(c) 2012-2014 Isaac Z. Schlueter
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/negotiator
*/
class Vb {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return tb(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return Ab(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return Hb(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return Rb(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class Wb {
  constructor(a) {
    this.headers = a.headers;
    this.a = new Vb(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(Xb);
    var c = this.a.mediaTypes(b.filter(Yb));
    [c] = c;
    return c ? a[b.indexOf(c)] : !1;
  }
  get type() {
    return this.types;
  }
  encodings(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.encodings(a)[0] || !1 : this.a.encodings();
  }
  get encoding() {
    return this.encodings;
  }
  charsets(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.charsets(a)[0] || !1 : this.a.charsets();
  }
  get charset() {
    return this.charsets;
  }
  languages(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.languages(a)[0] || !1 : this.a.languages();
  }
  get lang() {
    return this.languages;
  }
  get langs() {
    return this.languages;
  }
  get language() {
    return this.languages;
  }
}
function Xb(a) {
  return -1 == a.indexOf("/") ? P(a) : a;
}
function Yb(a) {
  return "string" == typeof a;
}
;/*
 http-errors
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
 toidentifier
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
function S(...a) {
  let b = 500, c = {};
  for (var d = 0; d < a.length; d++) {
    var e = a[d];
    if (e instanceof Error) {
      var f = e;
      b = f.status || f.statusCode || b;
    } else {
      switch(typeof e) {
        case "string":
          var g = e;
          break;
        case "number":
          b = e;
          0 !== d && process.emitWarning("non-first-argument status code; replace with createError(" + e + ", ...)", "DeprecationWarning");
          break;
        case "object":
          c = e;
      }
    }
  }
  "number" == typeof b && (400 > b || 600 <= b) && process.emitWarning("non-error status code; use only 4xx or 5xx status codes", "DeprecationWarning");
  if ("number" != typeof b || !J[b] && (400 > b || 600 <= b)) {
    b = 500;
  }
  a = S[b] || S[Number(String(b).charAt(0) + "00")];
  f || (f = a ? new a(g) : Error(g || J[b]), Error.captureStackTrace(f, S));
  a && f instanceof a && f.status === b || (f.expose = 500 > b, f.status = f.statusCode = b);
  for (let h in c) {
    "status" != h && "statusCode" != h && (f[h] = c[h]);
  }
  return f;
}
class Zb extends Error {
  constructor(a) {
    super();
    this.message = a;
    this.statusCode = this.status = null;
  }
  set code(a) {
    this.statusCode = this.status = a;
    this.message || (this.message = J[a]);
  }
}
xa.forEach(a => {
  let b;
  const c = $b(J[a]), d = c.match(/Error$/) ? c : c + "Error";
  switch(Number(String(a).charAt(0) + "00")) {
    case 400:
      b = class extends Zb {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !0;
        }
      };
      break;
    case 500:
      b = class extends Zb {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !1;
        }
      };
  }
  b && (S[a] = b, S[c] = b);
}, {});
function $b(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://npmjs.org/delegates
*/
function T(a, b) {
  const c = a.a, d = a.target;
  a.l.push(b);
  c.__defineGetter__(b, function() {
    return this[d][b];
  });
  return a;
}
function ac(a, b) {
  var c = a.a, d = a.target;
  a.C.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class bc {
  constructor(a, b) {
    this.a = a;
    this.target = b;
    this.i = [];
    this.l = [];
    this.C = [];
  }
  method(a) {
    const b = this.a, c = this.target;
    this.i.push(a);
    b[a] = function() {
      return this[c][a].apply(this[c], arguments);
    };
    return this;
  }
  access(a) {
    return ac(T(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function cc(a, b, c, d) {
  if (!a) {
    throw S(b, c, d);
  }
}
;const {URL:dc, Url:U, format:ec, parse:fc} = url;
const {isIP:gc} = net;
const {parse:hc, stringify:ic} = querystring;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function V(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === U || c instanceof U) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = fc(b);
      } else {
        c = b;
        for (var d = null, e = null, f = 1; f < b.length; f++) {
          switch(b.charCodeAt(f)) {
            case 63:
              null === e && (c = b.substring(0, f), d = b.substring(f + 1), e = b.substring(f));
              break;
            case 9:
            case 10:
            case 12:
            case 13:
            case 32:
            case 35:
            case 160:
            case 65279:
              c = fc(b);
              break a;
          }
        }
        f = void 0 !== U ? new U : {};
        f.path = b;
        f.href = b;
        f.pathname = c;
        null !== e && (f.query = d, f.search = e);
        c = f;
      }
    }
    c._raw = b;
    return a._parsedUrl = c;
  }
}
;/*
 fresh
 Copyright(c) 2012 TJ Holowaychuk
 Copyright(c) 2016-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var jc = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function kc(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && jc.test(a)) {
    return !1;
  }
  if (d && "*" !== d) {
    a = b.etag;
    if (!a) {
      return !1;
    }
    for (var e = !0, f = 0, g = [], h = 0, k = 0, l = d.length; k < l; k++) {
      switch(d.charCodeAt(k)) {
        case 32:
          h === f && (h = f = k + 1);
          break;
        case 44:
          g.push(d.substring(h, f));
          h = f = k + 1;
          break;
        default:
          f = k + 1;
      }
    }
    g.push(d.substring(h, f));
    for (d = 0; d < g.length; d++) {
      if (f = g[d], f === a || f === "W/" + a || "W/" + f === a) {
        e = !1;
        break;
      }
    }
    if (e) {
      return !1;
    }
  }
  return !c || (b = b["last-modified"], b && lc(b) <= lc(c)) ? !0 : !1;
}
function lc(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const W = Symbol("context#ip");
class mc {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.l = {};
    this.i = this.a = null;
  }
  get header() {
    return this.req.headers;
  }
  set header(a) {
    this.req.headers = a;
  }
  get headers() {
    return this.req.headers;
  }
  set headers(a) {
    this.req.headers = a;
  }
  get url() {
    return this.req.url;
  }
  set url(a) {
    this.req.url = a;
  }
  get origin() {
    return `${this.protocol}://${this.host}`;
  }
  get href() {
    return /^https?:\/\//i.test(this.originalUrl) ? this.originalUrl : this.origin + this.originalUrl;
  }
  get method() {
    return this.req.method;
  }
  set method(a) {
    this.req.method = a;
  }
  get path() {
    return V(this.req).pathname;
  }
  set path(a) {
    const b = V(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = ec(b));
  }
  get query() {
    const a = this.querystring, b = this.l = this.l || {};
    return b[a] || (b[a] = hc(a));
  }
  set query(a) {
    this.querystring = ic(a);
  }
  get querystring() {
    return this.req ? V(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = V(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = ec(b));
  }
  get search() {
    return this.querystring ? `?${this.querystring}` : "";
  }
  set search(a) {
    this.querystring = a;
  }
  get host() {
    var {proxy:a} = this.app;
    a = a && this.get("X-Forwarded-Host");
    a || (2 <= this.req.httpVersionMajor && (a = this.get(":authority")), a || (a = this.get("Host")));
    return a ? a.split(/\s*,\s*/, 1)[0] : "";
  }
  get hostname() {
    const a = this.host;
    return a ? "[" == a[0] ? this.URL.hostname || "" : a.split(":", 1)[0] : "";
  }
  get URL() {
    if (!this.a) {
      const a = this.protocol, b = this.host, c = this.originalUrl || "";
      try {
        this.a = new dc(`${a}://${b}${c}`);
      } catch (d) {
        this.a = Object.create(null);
      }
    }
    return this.a;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? kc(this.header, this.response.header) : !1;
  }
  get stale() {
    return !this.fresh;
  }
  get idempotent() {
    return "GET HEAD PUT DELETE OPTIONS TRACE".split(" ").includes(this.method);
  }
  get socket() {
    return this.req.socket;
  }
  get charset() {
    try {
      const {parameters:a} = Oa(this.req);
      return a.charset || "";
    } catch (a) {
      return "";
    }
  }
  get length() {
    const a = this.get("Content-Length");
    return "" == a ? null : ~~a;
  }
  get protocol() {
    if (this.socket.encrypted) {
      return "https";
    }
    if (!this.app.proxy) {
      return "http";
    }
    const a = this.get("X-Forwarded-Proto");
    return a ? a.split(/\s*,\s*/, 1)[0] : "http";
  }
  get secure() {
    return "https" == this.protocol;
  }
  get ips() {
    const {proxy:a} = this.app, b = this.get("X-Forwarded-For");
    return a && b ? b.split(/\s*,\s*/) : [];
  }
  get ip() {
    this[W] || (this[W] = this.ips[0] || this.socket.remoteAddress || "");
    return this[W];
  }
  set ip(a) {
    this[W] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return gc(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.i || (this.i = new Wb(this.req));
  }
  set accept(a) {
    this.i = a;
  }
  accepts(a, ...b) {
    return this.accept.types(a, ...b);
  }
  acceptsEncodings(a, ...b) {
    return this.accept.encodings(a, ...b);
  }
  acceptsCharsets(a, ...b) {
    return this.accept.charsets(a, ...b);
  }
  acceptsLanguages(a, ...b) {
    return this.accept.languages(a, ...b);
  }
  is(a, ...b) {
    if (!a) {
      return Ta(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Ta(this.req, a);
  }
  get type() {
    const a = this.get("Content-Type");
    return a ? a.split(";")[0] : "";
  }
  get(a) {
    const b = this.req;
    switch(a = a.toLowerCase()) {
      case "referer":
      case "referrer":
        return b.headers.referrer || b.headers.referer || "";
      default:
        return b.headers[a] || "";
    }
  }
  inspect() {
    if (this.req) {
      return this.toJSON();
    }
  }
  toJSON() {
    return {method:this.method, url:this.url, header:this.header};
  }
  [p.custom]() {
    return this.inspect();
  }
}
;const X = Symbol("context#cookies");
class Y {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[X] = null;
    this.respond = !0;
    this.url = this.path = this.query = this.method = this.search = this.socket = this.idempotent = this.querystring = this.is = this.get = this.accepts = this.acceptsCharsets = this.acceptsEncodings = this.acceptsLanguages = void 0;
    this.accept = null;
    this.etag = this.lastModified = this.type = this.length = this.body = this.message = this.status = this.flushHeaders = this.append = this.set = this.vary = this.remove = this.redirect = this.attachment = this.ip = this.ips = this.fresh = this.stale = this.secure = this.headers = this.header = this.URL = this.hostname = this.host = this.protocol = this.subdomains = this.href = this.origin = void 0;
    this.writable = this.headerSent = !1;
  }
  inspect() {
    return this.toJSON();
  }
  toJSON() {
    return {request:this.request.toJSON(), response:this.response.toJSON(), app:this.app.toJSON(), originalUrl:this.originalUrl, req:"<original node req>", res:"<original node res>", socket:"<original node socket>"};
  }
  get assert() {
    return cc;
  }
  throw(...a) {
    throw S(...a);
  }
  onerror(a) {
    if (null != a) {
      a instanceof Error || (a = Error(m("non-error thrown: %j", a)));
      var b = !1;
      if (this.headerSent || !this.writable) {
        b = a.headerSent = !0;
      }
      this.app.emit("error", a, this);
      if (!b) {
        var {res:c} = this;
        "function" == typeof c.getHeaderNames ? c.getHeaderNames().forEach(d => c.removeHeader(d)) : c._headers = {};
        this.set(a.headers);
        this.type = "text";
        "ENOENT" == a.code && (a.status = 404);
        "number" == typeof a.status && J[a.status] || (a.status = 500);
        b = J[a.status];
        b = a.expose ? a.message : b;
        this.status = a.status;
        this.length = Buffer.byteLength(b);
        c.end(b);
      }
    }
  }
  get cookies() {
    this[X] || (this[X] = new pb(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[X];
  }
  set cookies(a) {
    this[X] = a;
  }
  [p.custom]() {
    return this.inspect();
  }
}
T(T((new bc(Y.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
T(T(T(T(T(T(T(T(T(T(T(T(T(T((new bc(Y.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class nc {
  constructor() {
    this.i = this.res = this.req = this.request = this.ctx = this.app = null;
    this.a = void 0;
  }
  get socket() {
    return this.res.socket;
  }
  get header() {
    return this.res.getHeaders();
  }
  get headers() {
    return this.header;
  }
  get status() {
    return this.res.statusCode;
  }
  set status(a) {
    this.headerSent || (E(Number.isInteger(a), "status code must be a number"), E(100 <= a && 999 >= a, `invalid status code: ${a}`), this.i = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = J[a]), this.body && I[a] && (this.body = null));
  }
  get message() {
    return this.res.statusMessage || J[this.status];
  }
  set message(a) {
    this.res.statusMessage = a;
  }
  get body() {
    return this.a;
  }
  set body(a) {
    const b = this.a;
    this.a = a;
    if (null == a) {
      I[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.i || (this.status = 200);
      var c = !this.header["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (L(this.res, Da.bind(null, a)), cb(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.header["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : gb(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
  }
  get headerSent() {
    return this.res.headersSent;
  }
  vary(a) {
    if (!this.headerSent) {
      {
        var b = this.res;
        if (!b || !b.getHeader || !b.setHeader) {
          throw new TypeError("res argument is required");
        }
        let e = b.getHeader("Vary") || "";
        var c = Array.isArray(e) ? e.join(", ") : `${e}`;
        if ("string" != typeof c) {
          throw new TypeError("header argument is required");
        }
        if (!a) {
          throw new TypeError("field argument is required");
        }
        a = Array.isArray(a) ? a : Ga(`${a}`);
        for (var d = 0; d < a.length; d++) {
          if (!Fa.test(a[d])) {
            throw new TypeError("field argument contains an invalid header name");
          }
        }
        if ("*" == c) {
          a = c;
        } else {
          if (d = c, c = Ga(c.toLowerCase()), a.includes("*") || c.includes("*")) {
            a = "*";
          } else {
            for (let f = 0; f < a.length; f++) {
              const g = a[f].toLowerCase();
              c.includes(g) || (c.push(g), d = d ? d + ", " + a[f] : a[f]);
            }
            a = d;
          }
        }
        (e = a) && b.setHeader("Vary", e);
      }
    }
  }
  redirect(a, b) {
    "back" == a && (a = this.ctx.get("Referrer") || b || "/");
    this.set("Location", a);
    ya[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = hb.exec(a);
      if (c) {
        b = "";
        var d, e = 0;
        for (d = c.index; d < a.length; d++) {
          switch(a.charCodeAt(d)) {
            case 34:
              c = "&quot;";
              break;
            case 38:
              c = "&amp;";
              break;
            case 39:
              c = "&#39;";
              break;
            case 60:
              c = "&lt;";
              break;
            case 62:
              c = "&gt;";
              break;
            default:
              continue;
          }
          e !== d && (b += a.substring(e, d));
          e = d + 1;
          b += c;
        }
        a = e !== d ? b + a.substring(e, d) : b;
      }
      this.type = "text/html; charset=utf-8";
      this.body = `Redirecting to <a href="${a}">${a}</a>.`;
    } else {
      this.type = "text/plain; charset=utf-8", this.body = `Redirecting to ${a}.`;
    }
  }
  attachment(a, b) {
    a && (this.type = G(a));
    this.set("Content-Disposition", $a(a, b));
  }
  set type(a) {
    var b = fb.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? P(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = Ha.exec(b)) && N[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && Ia.test(c[1]) ? "UTF-8" : !1;
            } else {
              c = !1;
            }
            c && (b += "; charset=" + c.toLowerCase());
          }
        } else {
          b = !1;
        }
      } else {
        b = !1;
      }
      fb.set(a, b);
    }
    (a = b) ? this.set("Content-Type", a) : this.remove("Content-Type");
  }
  set lastModified(a) {
    "string" == typeof a && (a = new Date(a));
    this.set("Last-Modified", a.toUTCString());
  }
  get lastModified() {
    const a = this.get("last-modified");
    return a ? new Date(a) : null;
  }
  set etag(a) {
    /^(W\/)?"/.test(a) || (a = `"${a}"`);
    this.set("ETag", a);
  }
  get etag() {
    return this.get("ETag");
  }
  get type() {
    const a = this.get("Content-Type");
    return a ? a.split(";", 1)[0] : "";
  }
  is(a, ...b) {
    const c = this.type;
    if (!a) {
      return c || !1;
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Ra(c, a);
  }
  get(a) {
    return this.header[a.toLowerCase()] || "";
  }
  set(a, b) {
    if (!this.headerSent) {
      if (2 == arguments.length) {
        Array.isArray(b) ? b = b.map(c => "string" == typeof c ? c : String(c)) : "string" != typeof b && (b = String(b)), this.res.setHeader(a, b);
      } else {
        for (const c in a) {
          this.set(c, a[c]);
        }
      }
    }
  }
  append(a, b) {
    const c = this.get(a);
    c && (b = Array.isArray(c) ? c.concat(b) : [c].concat(b));
    return this.set(a, b);
  }
  remove(a) {
    this.headerSent || this.res.removeHeader(a);
  }
  get writable() {
    if (this.res.finished) {
      return !1;
    }
    const a = this.res.socket;
    return a ? a.writable : !0;
  }
  inspect() {
    if (this.res) {
      var a = this.toJSON();
      a.body = this.body;
      return a;
    }
  }
  toJSON() {
    return {status:this.status, message:this.message, header:this.header};
  }
  flushHeaders() {
    this.res.flushHeaders();
  }
  [p.custom]() {
    return this.inspect();
  }
}
;/*
 MIT
 (c) dead-horse
 https://npmjs.org/koa-compose
*/
function oc(a) {
  if (!Array.isArray(a)) {
    throw new TypeError("Middleware stack must be an array!");
  }
  for (const b of a) {
    if ("function" != typeof b) {
      throw new TypeError("Middleware must be composed of functions!");
    }
  }
  return function(b, c) {
    function d(f) {
      if (f <= e) {
        return Promise.reject(Error("next() called multiple times"));
      }
      e = f;
      let g = a[f];
      f === a.length && (g = c);
      if (!g) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(g(b, d.bind(null, f + 1)));
      } catch (h) {
        return Promise.reject(h);
      }
    }
    let e = -1;
    return d(0);
  };
}
;var Z;
Z = function() {
  const a = new oa(y);
  return function(b) {
    const c = la(a);
    c.namespace = b;
    c.useColors = y.useColors();
    c.enabled = a.enabled(b);
    c.color = ma(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    na(a);
    return c;
  };
}()("@goa/koa:application");
async function pc(a, b) {
  const c = a.res;
  c.statusCode = 404;
  L(c, d => a.onerror(d));
  try {
    return await b(a), await qc(a);
  } catch (d) {
    a.onerror(d);
  }
}
class rc extends va {
  constructor() {
    super();
    this.silent = this.proxy = !1;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || "development";
    this.context = Object.create(Y.prototype);
    this.request = Object.create(mc.prototype);
    this.response = Object.create(nc.prototype);
    this.keys = void 0;
  }
  [p.custom]() {
    return this.inspect();
  }
  listen(...a) {
    Z("listen");
    return ua(this.callback()).listen(...a);
  }
  toJSON() {
    return {subdomainOffset:this.subdomainOffset, proxy:this.proxy, env:this.env};
  }
  inspect() {
    return this.toJSON();
  }
  use(a) {
    if ("function" != typeof a) {
      throw new TypeError("middleware must be a function!");
    }
    if ("function" != typeof a ? 0 : ra.test(qa.call(a)) || (z ? A(a) == sa : "[object GeneratorFunction]" == pa.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    Z("use %s", a.D || a.name || "-");
    this.middleware.push(a);
    return this;
  }
  callback() {
    const a = oc(this.middleware);
    if (!this.listenerCount("error")) {
      this.on("error", this.onerror);
    }
    return (b, c) => {
      b = this.createContext(b, c);
      return pc(b, a);
    };
  }
  createContext(a, b) {
    const c = Object.create(this.context), d = c.request = Object.create(this.request), e = c.response = Object.create(this.response);
    c.app = d.app = e.app = this;
    c.req = d.req = e.req = a;
    c.res = d.res = e.res = b;
    d.ctx = e.ctx = c;
    d.response = e;
    e.request = d;
    c.originalUrl = d.originalUrl = a.url;
    c.state = {};
    return c;
  }
  onerror(a) {
    if (!(a instanceof Error)) {
      throw new TypeError(m("non-error thrown: %j", a));
    }
    404 == a.status || a.expose || this.silent || (a = a.stack || a.toString(), console.error(), console.error(a.replace(/^/gm, "  ")), console.error());
  }
}
function qc(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.body, d = a.status;
    if (I[d]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && gb(c) && (a.length = Buffer.byteLength(JSON.stringify(c))), b.end();
    }
    if (null == c) {
      return 2 <= a.req.httpVersionMajor ? c = String(d) : c = a.message || String(d), b.headersSent || (a.type = "text", a.length = Buffer.byteLength(c)), b.end(c);
    }
    if (Buffer.isBuffer(c)) {
      return b.end(c);
    }
    if ("string" == typeof c) {
      return b.end(c);
    }
    if (c instanceof D) {
      return c.pipe(b);
    }
    c = JSON.stringify(c);
    b.headersSent || (a.length = Buffer.byteLength(c));
    b.end(c);
  }
}
;module.exports = rc;


//# sourceMappingURL=koa.js.map