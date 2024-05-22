var events$1 = { exports: {} }, R = typeof Reflect == "object" ? Reflect : null, ReflectApply = R && typeof R.apply == "function" ? R.apply : function(h, U, B) {
  return Function.prototype.apply.call(h, U, B);
}, ReflectOwnKeys;
R && typeof R.ownKeys == "function" ? ReflectOwnKeys = R.ownKeys : Object.getOwnPropertySymbols ? ReflectOwnKeys = function(h) {
  return Object.getOwnPropertyNames(h).concat(Object.getOwnPropertySymbols(h));
} : ReflectOwnKeys = function(h) {
  return Object.getOwnPropertyNames(h);
};
function ProcessEmitWarning($) {
  console && console.warn && console.warn($);
}
var NumberIsNaN = Number.isNaN || function(h) {
  return h !== h;
};
function EventEmitter$1() {
  EventEmitter$1.init.call(this);
}
events$1.exports = EventEmitter$1;
events$1.exports.once = once;
EventEmitter$1.EventEmitter = EventEmitter$1;
EventEmitter$1.prototype._events = void 0;
EventEmitter$1.prototype._eventsCount = 0;
EventEmitter$1.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener($) {
  if (typeof $ != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof $);
}
Object.defineProperty(EventEmitter$1, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return defaultMaxListeners;
  },
  set: function($) {
    if (typeof $ != "number" || $ < 0 || NumberIsNaN($))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + $ + ".");
    defaultMaxListeners = $;
  }
});
EventEmitter$1.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
EventEmitter$1.prototype.setMaxListeners = function(h) {
  if (typeof h != "number" || h < 0 || NumberIsNaN(h))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + h + ".");
  return this._maxListeners = h, this;
};
function _getMaxListeners($) {
  return $._maxListeners === void 0 ? EventEmitter$1.defaultMaxListeners : $._maxListeners;
}
EventEmitter$1.prototype.getMaxListeners = function() {
  return _getMaxListeners(this);
};
EventEmitter$1.prototype.emit = function(h) {
  for (var U = [], B = 1; B < arguments.length; B++)
    U.push(arguments[B]);
  var V = h === "error", t = this._events;
  if (t !== void 0)
    V = V && t.error === void 0;
  else if (!V)
    return !1;
  if (V) {
    var O;
    if (U.length > 0 && (O = U[0]), O instanceof Error)
      throw O;
    var M = new Error("Unhandled error." + (O ? " (" + O.message + ")" : ""));
    throw M.context = O, M;
  }
  var D = t[h];
  if (D === void 0)
    return !1;
  if (typeof D == "function")
    ReflectApply(D, this, U);
  else
    for (var I = D.length, P = arrayClone$1(D, I), B = 0; B < I; ++B)
      ReflectApply(P[B], this, U);
  return !0;
};
function _addListener($, h, U, B) {
  var V, t, O;
  if (checkListener(U), t = $._events, t === void 0 ? (t = $._events = /* @__PURE__ */ Object.create(null), $._eventsCount = 0) : (t.newListener !== void 0 && ($.emit(
    "newListener",
    h,
    U.listener ? U.listener : U
  ), t = $._events), O = t[h]), O === void 0)
    O = t[h] = U, ++$._eventsCount;
  else if (typeof O == "function" ? O = t[h] = B ? [U, O] : [O, U] : B ? O.unshift(U) : O.push(U), V = _getMaxListeners($), V > 0 && O.length > V && !O.warned) {
    O.warned = !0;
    var M = new Error("Possible EventEmitter memory leak detected. " + O.length + " " + String(h) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    M.name = "MaxListenersExceededWarning", M.emitter = $, M.type = h, M.count = O.length, ProcessEmitWarning(M);
  }
  return $;
}
EventEmitter$1.prototype.addListener = function(h, U) {
  return _addListener(this, h, U, !1);
};
EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;
EventEmitter$1.prototype.prependListener = function(h, U) {
  return _addListener(this, h, U, !0);
};
function onceWrapper() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function _onceWrap($, h, U) {
  var B = { fired: !1, wrapFn: void 0, target: $, type: h, listener: U }, V = onceWrapper.bind(B);
  return V.listener = U, B.wrapFn = V, V;
}
EventEmitter$1.prototype.once = function(h, U) {
  return checkListener(U), this.on(h, _onceWrap(this, h, U)), this;
};
EventEmitter$1.prototype.prependOnceListener = function(h, U) {
  return checkListener(U), this.prependListener(h, _onceWrap(this, h, U)), this;
};
EventEmitter$1.prototype.removeListener = function(h, U) {
  var B, V, t, O, M;
  if (checkListener(U), V = this._events, V === void 0)
    return this;
  if (B = V[h], B === void 0)
    return this;
  if (B === U || B.listener === U)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete V[h], V.removeListener && this.emit("removeListener", h, B.listener || U));
  else if (typeof B != "function") {
    for (t = -1, O = B.length - 1; O >= 0; O--)
      if (B[O] === U || B[O].listener === U) {
        M = B[O].listener, t = O;
        break;
      }
    if (t < 0)
      return this;
    t === 0 ? B.shift() : spliceOne(B, t), B.length === 1 && (V[h] = B[0]), V.removeListener !== void 0 && this.emit("removeListener", h, M || U);
  }
  return this;
};
EventEmitter$1.prototype.off = EventEmitter$1.prototype.removeListener;
EventEmitter$1.prototype.removeAllListeners = function(h) {
  var U, B, V;
  if (B = this._events, B === void 0)
    return this;
  if (B.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : B[h] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete B[h]), this;
  if (arguments.length === 0) {
    var t = Object.keys(B), O;
    for (V = 0; V < t.length; ++V)
      O = t[V], O !== "removeListener" && this.removeAllListeners(O);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (U = B[h], typeof U == "function")
    this.removeListener(h, U);
  else if (U !== void 0)
    for (V = U.length - 1; V >= 0; V--)
      this.removeListener(h, U[V]);
  return this;
};
function _listeners($, h, U) {
  var B = $._events;
  if (B === void 0)
    return [];
  var V = B[h];
  return V === void 0 ? [] : typeof V == "function" ? U ? [V.listener || V] : [V] : U ? unwrapListeners(V) : arrayClone$1(V, V.length);
}
EventEmitter$1.prototype.listeners = function(h) {
  return _listeners(this, h, !0);
};
EventEmitter$1.prototype.rawListeners = function(h) {
  return _listeners(this, h, !1);
};
EventEmitter$1.listenerCount = function($, h) {
  return typeof $.listenerCount == "function" ? $.listenerCount(h) : listenerCount.call($, h);
};
EventEmitter$1.prototype.listenerCount = listenerCount;
function listenerCount($) {
  var h = this._events;
  if (h !== void 0) {
    var U = h[$];
    if (typeof U == "function")
      return 1;
    if (U !== void 0)
      return U.length;
  }
  return 0;
}
EventEmitter$1.prototype.eventNames = function() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone$1($, h) {
  for (var U = new Array(h), B = 0; B < h; ++B)
    U[B] = $[B];
  return U;
}
function spliceOne($, h) {
  for (; h + 1 < $.length; h++)
    $[h] = $[h + 1];
  $.pop();
}
function unwrapListeners($) {
  for (var h = new Array($.length), U = 0; U < h.length; ++U)
    h[U] = $[U].listener || $[U];
  return h;
}
function once($, h) {
  return new Promise(function(U, B) {
    function V(O) {
      $.removeListener(h, t), B(O);
    }
    function t() {
      typeof $.removeListener == "function" && $.removeListener("error", V), U([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener($, h, t, { once: !0 }), h !== "error" && addErrorHandlerIfEventEmitter($, V, { once: !0 });
  });
}
function addErrorHandlerIfEventEmitter($, h, U) {
  typeof $.on == "function" && eventTargetAgnosticAddListener($, "error", h, U);
}
function eventTargetAgnosticAddListener($, h, U, B) {
  if (typeof $.on == "function")
    B.once ? $.once(h, U) : $.on(h, U);
  else if (typeof $.addEventListener == "function")
    $.addEventListener(h, function V(t) {
      B.once && $.removeEventListener(h, V), U(t);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof $);
}
var eventsExports = events$1.exports;
function safeApply($, h, U) {
  try {
    Reflect.apply($, h, U);
  } catch (B) {
    setTimeout(() => {
      throw B;
    });
  }
}
function arrayClone($) {
  const h = $.length, U = new Array(h);
  for (let B = 0; B < h; B += 1)
    U[B] = $[B];
  return U;
}
class SafeEventEmitter extends eventsExports.EventEmitter {
  emit(h, ...U) {
    let B = h === "error";
    const V = this._events;
    if (V !== void 0)
      B = B && V.error === void 0;
    else if (!B)
      return !1;
    if (B) {
      let O;
      if (U.length > 0 && ([O] = U), O instanceof Error)
        throw O;
      const M = new Error(`Unhandled error.${O ? ` (${O.message})` : ""}`);
      throw M.context = O, M;
    }
    const t = V[h];
    if (t === void 0)
      return !1;
    if (typeof t == "function")
      safeApply(t, this, U);
    else {
      const O = t.length, M = arrayClone(t);
      for (let D = 0; D < O; D += 1)
        safeApply(M[D], this, U);
    }
    return !0;
  }
}
const name$2 = "@wepin/sdk-js", version$2 = "0.0.3", description$2 = "Wepin Widget Javascript SDK for Web", author$2 = "IoTrust, Co., Ltd.", homepage$1 = "https://github.com/WepinWallet/wepin-web-sdk-v1/", license$2 = "MIT", main$2 = "./dist/wepin-sdk-js.mjs", jsdelivr = "./dist/wepin-sdk-js.umd.js", types$2 = "./dist/src/index.d.ts", files$2 = [
  "dist"
], scripts$2 = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, keywords$2 = [
  "wepin",
  "wepinwallet",
  "wallet"
], dependencies$2 = {
  "@wepin/fetch-js": "^0.0.2",
  "@wepin/modal-js": "^0.0.1",
  "@wepin/storage-js": "^0.0.1",
  events: "^3.3.0",
  "jwt-decode": "^4.0.0"
}, devDependencies$2 = {
  "@types/events": "^3.0.3"
}, PackageJson = {
  name: name$2,
  version: version$2,
  description: description$2,
  author: author$2,
  homepage: homepage$1,
  license: license$2,
  main: main$2,
  jsdelivr,
  types: types$2,
  files: files$2,
  scripts: scripts$2,
  keywords: keywords$2,
  dependencies: dependencies$2,
  devDependencies: devDependencies$2
}, WEPIN_DEFAULT_LANG = "ko", WEPIN_DEFAULT_CURRENCY = "krw", Lt = class Lt {
};
Lt.test = console.warn.bind(window.console, "[SDK][test] "), Lt.warn = console.warn.bind(window.console, "[SDK][warn] "), Lt.error = console.error.bind(window.console, "[SDK][error] "), Lt.todo = console.warn.bind(window.console, "[SDK][todo] "), Lt.assert = console.assert.bind(window.console), Lt.debug = () => {
};
let LOG = Lt;
const Ot = class Ot {
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  static messages(h) {
    return {
      hasValidOrigin: (U) => U.origin === Ot.getUrls(h).wepinWebview
      // hasCorrectCorrelationID(message: MessageEvent,
      //                         correlationID: string | undefined) {
      //     return correlationID && message.data && message.data.correlationID === correlationID;
      // }
    };
  }
  static getUrls(h) {
    switch (h) {
      case "production":
        return {
          wepinWebview: "https://v1-widget.wepin.io"
        };
      case "test":
        return {
          wepinWebview: "https://stage-v1-widget.wepin.io"
        };
      case "development":
        return {
          // wepinWebview: `https://localhost:8989`,
          wepinWebview: "https://dev-v1-widget.wepin.io"
        };
      case "local":
        return {
          wepinWebview: "https://local-widget.wepin.io"
        };
      default:
        throw new Error("Utils.getUrls: invalid mode");
    }
  }
  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function(h) {
        const U = Math.random() * 16 | 0;
        return (h == "x" ? U : U & 3 | 8).toString(16);
      }
    );
  }
};
Ot.checkSameNumber = (h, U, B) => {
  if (B)
    return !1;
  const V = [...Array(10)].map(Number.prototype.valueOf, 0);
  let t = !1;
  return [...h].forEach((M) => {
    if (V[Number(M)]++, V[Number(M)] >= U) {
      t = !0;
      return;
    }
  }), t;
};
let Utils = Ot;
const w = class {
  static closeOverlay(h) {
    const U = document.querySelector(`#${h}`);
    U && U.parentNode && U.parentNode.removeChild(U);
  }
  static openOverlay(h) {
    const U = document.createElement("div");
    U.id = h, U.classList.add(this.CONST.overlayClassName), U.style.zIndex = "2147483647", U.style.display = "flex", U.style.alignItems = "center", U.style.justifyContent = "center", U.style.textAlign = "center", U.style.position = "fixed", U.style.left = "0px", U.style.right = "0px", U.style.top = "0px", U.style.bottom = "0px", U.style.left = "0px", U.style.background = "rgba(0,0,0,0.6)", U.style.color = "white", U.style.border = "2px solid #f1f1f1";
    const B = document.getElementsByClassName(
      this.CONST.overlayClassName
    );
    for (let V = 0; V < B.length; V++) {
      const t = B.item(V);
      t && t.remove();
    }
    document.body.appendChild(U);
  }
};
w.CONST = {
  overlayClassName: "wepin-widget__overlay"
};
let p = w;
const y = ($) => {
  const h = ($ == null ? void 0 : $.width) || 375, U = ($ == null ? void 0 : $.height) || 604, B = $ != null && $.sLeft ? $ == null ? void 0 : $.sLeft : window.screenLeft ? window.screenLeft : window.screenX ? window.screenX : 0, V = $ != null && $.sTop ? $ == null ? void 0 : $.sTop : window.screenTop ? window.screenTop : window.screenY ? window.screenY : 0, t = screen.width / 2 - h / 2 + B, O = screen.height / 2 - U / 2 + V;
  return `width=${h}, height=${U}, left=${t}, top=${O}scrollbars=yes, resizable=1, menubar=no, toolbar=no`;
}, m = ($) => {
  const h = document.createElement("iframe");
  return h.classList.add("wepin-sdk-widget-iframe"), h.setAttribute("frameborder", "0"), h.setAttribute("marginwidth", "0"), h.setAttribute("marginheight", "0"), h.style.width = "100%", $ && $ != null && $.isHide ? h.style.height = "0" : h.style.height = "100%", h.style.maxHeight = "100%", h.style.position = "fixed", h.style.bottom = "0", h.style.left = "0", h.style.zIndex = "408888000000", h.title = "wepin sdk webview", h.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; camera; clipboard-read", h.allowFullscreen = !0, h;
}, v = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function($) {
  const h = Math.random() * 16 | 0;
  return ($ == "x" ? h : h & 3 | 8).toString(16);
}), r = class Ut extends p {
  constructor(h, U, B, V, t) {
    super(), this.isWidgetReady = !1, this.url = h, this.id = `id-${v()}`, this.isHide = t, t || Ut.openOverlay(this.id), Ut._webview[this.id] = U, this.type = B, this.EL = V, window.addEventListener("message", this.EL), this._open = !0;
  }
  get isOpen() {
    return this._open;
  }
  // For communicating with the Wepin instance
  // private _wepin: Wepin
  // public get Wepin() {
  //   return this._wepin
  // }
  // For communicating with the Webview
  // private _webview: HTMLIFrameElement
  static getWebview(h) {
    return Ut._webview[h];
  }
  static clearWebview(h) {
    delete Ut._webview[h];
  }
  static clearAllWebview() {
    this._webview = {};
  }
  close() {
    this.isHide || Ut.closeOverlay(this.id), window.removeEventListener("message", this.EL), this._open = !1, this.isWidgetReady = !1, this._closeWebview();
  }
  response(h) {
    try {
      this._post(h);
    } catch (U) {
      console.error("Can not response message to the webview", U);
    }
  }
  request(h) {
    try {
      this._post(h);
    } catch (U) {
      console.error("Can not send message to the webview", U);
    }
  }
};
r._webview = {};
let l$2 = r;
class a extends l$2 {
  // is it necessary ?
  constructor({
    url: h,
    // wepin,
    frame: U,
    EL: B,
    isHide: V
  }) {
    super(h, U, "Frame", B, V), U.src = h, U.id = this.id;
    const t = document.querySelector("body");
    a.scrollPosition = window.pageYOffset, t.style.overflow = "hidden", t.style.position = "fixed", t.style.top = `-${a.scrollPosition}px`, t.style.width = "100%", document.body.appendChild(U);
  }
  static async openNew({
    url: h,
    EL: U,
    widgetOptions: B
  }) {
    const V = m({ isHide: B == null ? void 0 : B.isHide });
    return new a({
      url: h,
      // wepin,
      frame: V,
      EL: U,
      isHide: B == null ? void 0 : B.isHide
    });
  }
  expand() {
    const h = l$2.getWebview(this.id);
    h.style.height = "100%", h.style.borderRadius = "0";
  }
  shrink() {
    const h = l$2.getWebview(this.id);
    h.style.height = "604px", h.style.borderRadius = "12px 12px 0 0 ";
  }
  _closeWebview() {
    const h = setTimeout(() => {
      const U = l$2.getWebview(this.id), B = document.querySelector("body");
      B.style.removeProperty("overflow"), B.style.removeProperty("position"), B.style.removeProperty("top"), B.style.removeProperty("width"), window.scrollTo(0, a.scrollPosition), U && document.body.removeChild(U), l$2.clearWebview(this.id), clearTimeout(h);
    }, 500);
  }
  _post(h) {
    l$2.getWebview(this.id).contentWindow.postMessage(h, this.url);
  }
}
class d extends l$2 {
  constructor({
    url: h,
    webview: U,
    EL: B
  }) {
    super(h, U, "Window", B, !1);
  }
  //: NodeJS.Timer | number
  static async openNew({
    url: h,
    EL: U,
    widgetFeatures: B
  }) {
    const V = y(B), t = window.open(h, "Wepin_Widget", V), O = new d({
      url: h,
      webview: t,
      EL: U
    });
    if (!t)
      throw O.close(), new Error("popup window blocked");
    return this.timer = setInterval(() => {
      try {
        t && t.closed && (clearInterval(this.timer), O.close());
      } catch {
        clearInterval(this.timer), O.close();
      }
    }, 200), O;
  }
  expand() {
  }
  shrink() {
  }
  _closeWebview() {
    d.timer && (clearInterval(d.timer), d.timer = void 0);
    const h = l$2.getWebview(this.id);
    h && h.close(), l$2.clearWebview(this.id);
  }
  _post(h) {
    l$2.getWebview(this.id).postMessage(h, this.url);
  }
}
const x = "@wepin/modal-js", b = "0.0.1", f = "wepin widget modal", u$2 = "IoTrust, Co., Ltd.", W = "MIT", C = "./dist/wepin-modal-js.mjs", T = "dist/wepin-modal-js.umd.js", L = "./dist/src/index.d.ts", N = [
  "dist"
], _ = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, j = [
  "wepin",
  "wepinwallet",
  "wallet",
  "wepin-modal"
], E = {
  name: x,
  version: b,
  description: f,
  author: u$2,
  license: W,
  main: C,
  jsdelivr: T,
  types: L,
  files: N,
  scripts: _,
  keywords: j
};
class k {
  //   constructor(appKey: string, appId: string) {
  constructor() {
    this.platformType = "web", this._modalWindow = null, this._modalFrame = null, console.log(`WepinModal v${E.version}`), this.domain = window.location.origin;
  }
  //   async init() {
  //     // getAppInfo수행해보고기..
  //     this._appId
  //     this._appKey
  //     this._isInitialized = true
  //     return this._isInitialized
  //   }
  async openAuthBrowser(h, U) {
    return this._modalWindow = await d.openNew({
      url: h,
      EL: U
    }), this._modalWindow;
  }
  async openModal(h, U, B) {
    return this._modalFrame = await a.openNew({
      url: h,
      EL: U,
      widgetOptions: B
    }), this._modalFrame;
  }
  async closeAuthBrowser() {
    this._modalWindow && this._modalWindow.close();
  }
  async closeModal() {
    this._modalFrame && this._modalFrame.close();
  }
}
const proxyToObject = ($) => {
  if (typeof $ != "object" || $ === null)
    return $;
  if (Array.isArray($))
    return $.map(proxyToObject);
  const h = {};
  for (const U of Object.keys($))
    h[U] = proxyToObject($[U]);
  return h;
};
var Platform = /* @__PURE__ */ (($) => ($[$.web = 1] = "web", $[$.android = 2] = "android", $[$.ios = 3] = "ios", $))(Platform || {});
const WebviewRequestHandler = ($, h, U) => {
  var t, O, M;
  const B = {
    header: {
      response_from: "web",
      response_to: "wepin_widget",
      id: $.header.id
    }
  };
  let V = U.appKey;
  switch (U.appKey.slice(0, 13) === "local_ak_dev_" ? V = U.appKey.slice(6) : V = U.appKey, $.body.command) {
    case "ready_to_widget":
      {
        LOG.debug("ready_to_widget");
        const D = Object.assign({}, h.wepinAppAttributes), I = (t = h.wepinAppAttributes.loginProviders) != null && t.length || ((O = h.wepinAppAttributes.loginProviders) == null ? void 0 : O.length) === 0 ? Array.from(h.wepinAppAttributes.loginProviders) : void 0;
        D.loginProviders = I, B.body = {
          command: "ready_to_widget",
          state: "SUCCESS",
          data: {
            appKey: V,
            appId: U.appId,
            domain: h.wepinDomain,
            platform: Platform[h.type],
            attributes: D,
            //Object.assign({}, wepinSDK.wepinAppAttributes),
            version: h.version.includes("-alpha") ? h.version.substring(0, h.version.indexOf("-")) : h.version,
            type: `${h.type}-sdk`,
            localDate: h.wepinStorage.getAllLocalStorage(U.appId) ?? {}
          }
        };
      }
      break;
    case "close_wepin_widget":
      {
        h.wepinWidget && (h.wepinWidget.close(), h.wepinWidget = void 0);
        const D = h.wepinStorage.getLocalStorage(
          U.appId,
          "user_info"
        );
        D ? h.setUserInfo(D, !0) : h.setUserInfo({ status: "fail" }, !0), h.removeAllListeners(), h.specifiedEmail = void 0;
      }
      break;
    case "set_local_storage":
      h.wepinStorage.setAllLocalStorage(
        U.appId,
        $.body.parameter.data
      ), $.body.parameter.data && $.body.parameter.data.user_info && h.setUserInfo($.body.parameter.data.user_info, !0), $.body.parameter.data && $.body.parameter.data["wepin:connectUser"] && h.setToken($.body.parameter.data["wepin:connectUser"]), B.body = {
        command: "set_local_storage",
        state: "SUCCESS",
        data: ""
      };
      break;
    case "set_user_email":
      B.body = {
        command: "set_user_email",
        state: "SUCCESS",
        data: {
          email: h.specifiedEmail
        }
      };
      break;
    case "get_sdk_request":
      LOG.debug("get_sdk_request", h.getSDKRequest() ?? "No request"), B.body = {
        command: "get_sdk_request",
        state: "SUCCESS",
        data: proxyToObject(h.getSDKRequest()) ?? "No request"
      };
      break;
    default:
      throw new Error(`Command ${$.body.command} is not supported.`);
  }
  (M = h.wepinWidget) != null && M.isOpen && h.wepinWidget.response(B);
}, WebviewResponseHandler = ($, h) => {
  LOG.debug("Got Response from webview =>", $), h.emit($.header.id.toString(), $);
}, getEventListener = ($, h) => {
  const U = (B) => !(!($.wepinWidget.url.includes("/wepin-sdk-login") || $.wepinWidget.url.includes(B.origin)) && B.origin !== $.wepinWidget.url || !Object.prototype.hasOwnProperty.call(B.data, "header") || !Object.prototype.hasOwnProperty.call(B.data, "body"));
  return (B) => {
    U(B) && handleMessage(
      B.data,
      $,
      h
    );
  };
}, handleMessage = ($, h, U) => {
  $.header.request_to === "web" ? WebviewRequestHandler($, h, U) : $.header.response_to === "web" ? WebviewResponseHandler($, h) : LOG.error("Failed to handle message:", $);
}, emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
var buffer$2 = {}, base64Js$1 = {};
base64Js$1.byteLength = byteLength;
base64Js$1.toByteArray = toByteArray;
base64Js$1.fromByteArray = fromByteArray;
var lookup = [], revLookup = [], Arr = typeof Uint8Array < "u" ? Uint8Array : Array, code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i$2 = 0, len = code.length; i$2 < len; ++i$2)
  lookup[i$2] = code[i$2], revLookup[code.charCodeAt(i$2)] = i$2;
revLookup[45] = 62;
revLookup[95] = 63;
function getLens($) {
  var h = $.length;
  if (h % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var U = $.indexOf("=");
  U === -1 && (U = h);
  var B = U === h ? 0 : 4 - U % 4;
  return [U, B];
}
function byteLength($) {
  var h = getLens($), U = h[0], B = h[1];
  return (U + B) * 3 / 4 - B;
}
function _byteLength($, h, U) {
  return (h + U) * 3 / 4 - U;
}
function toByteArray($) {
  var h, U = getLens($), B = U[0], V = U[1], t = new Arr(_byteLength($, B, V)), O = 0, M = V > 0 ? B - 4 : B, D;
  for (D = 0; D < M; D += 4)
    h = revLookup[$.charCodeAt(D)] << 18 | revLookup[$.charCodeAt(D + 1)] << 12 | revLookup[$.charCodeAt(D + 2)] << 6 | revLookup[$.charCodeAt(D + 3)], t[O++] = h >> 16 & 255, t[O++] = h >> 8 & 255, t[O++] = h & 255;
  return V === 2 && (h = revLookup[$.charCodeAt(D)] << 2 | revLookup[$.charCodeAt(D + 1)] >> 4, t[O++] = h & 255), V === 1 && (h = revLookup[$.charCodeAt(D)] << 10 | revLookup[$.charCodeAt(D + 1)] << 4 | revLookup[$.charCodeAt(D + 2)] >> 2, t[O++] = h >> 8 & 255, t[O++] = h & 255), t;
}
function tripletToBase64($) {
  return lookup[$ >> 18 & 63] + lookup[$ >> 12 & 63] + lookup[$ >> 6 & 63] + lookup[$ & 63];
}
function encodeChunk($, h, U) {
  for (var B, V = [], t = h; t < U; t += 3)
    B = ($[t] << 16 & 16711680) + ($[t + 1] << 8 & 65280) + ($[t + 2] & 255), V.push(tripletToBase64(B));
  return V.join("");
}
function fromByteArray($) {
  for (var h, U = $.length, B = U % 3, V = [], t = 16383, O = 0, M = U - B; O < M; O += t)
    V.push(encodeChunk($, O, O + t > M ? M : O + t));
  return B === 1 ? (h = $[U - 1], V.push(
    lookup[h >> 2] + lookup[h << 4 & 63] + "=="
  )) : B === 2 && (h = ($[U - 2] << 8) + $[U - 1], V.push(
    lookup[h >> 10] + lookup[h >> 4 & 63] + lookup[h << 2 & 63] + "="
  )), V.join("");
}
var ieee754$1 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754$1.read = function($, h, U, B, V) {
  var t, O, M = V * 8 - B - 1, D = (1 << M) - 1, I = D >> 1, P = -7, Y = U ? V - 1 : 0, X = U ? -1 : 1, ee = $[h + Y];
  for (Y += X, t = ee & (1 << -P) - 1, ee >>= -P, P += M; P > 0; t = t * 256 + $[h + Y], Y += X, P -= 8)
    ;
  for (O = t & (1 << -P) - 1, t >>= -P, P += B; P > 0; O = O * 256 + $[h + Y], Y += X, P -= 8)
    ;
  if (t === 0)
    t = 1 - I;
  else {
    if (t === D)
      return O ? NaN : (ee ? -1 : 1) * (1 / 0);
    O = O + Math.pow(2, B), t = t - I;
  }
  return (ee ? -1 : 1) * O * Math.pow(2, t - B);
};
ieee754$1.write = function($, h, U, B, V, t) {
  var O, M, D, I = t * 8 - V - 1, P = (1 << I) - 1, Y = P >> 1, X = V === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, ee = B ? 0 : t - 1, re = B ? 1 : -1, ie = h < 0 || h === 0 && 1 / h < 0 ? 1 : 0;
  for (h = Math.abs(h), isNaN(h) || h === 1 / 0 ? (M = isNaN(h) ? 1 : 0, O = P) : (O = Math.floor(Math.log(h) / Math.LN2), h * (D = Math.pow(2, -O)) < 1 && (O--, D *= 2), O + Y >= 1 ? h += X / D : h += X * Math.pow(2, 1 - Y), h * D >= 2 && (O++, D /= 2), O + Y >= P ? (M = 0, O = P) : O + Y >= 1 ? (M = (h * D - 1) * Math.pow(2, V), O = O + Y) : (M = h * Math.pow(2, Y - 1) * Math.pow(2, V), O = 0)); V >= 8; $[U + ee] = M & 255, ee += re, M /= 256, V -= 8)
    ;
  for (O = O << V | M, I += V; I > 0; $[U + ee] = O & 255, ee += re, O /= 256, I -= 8)
    ;
  $[U + ee - re] |= ie * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function($) {
  var h = base64Js$1, U = ieee754$1, B = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  $.Buffer = M, $.SlowBuffer = oe, $.INSPECT_MAX_BYTES = 50;
  var V = 2147483647;
  $.kMaxLength = V, M.TYPED_ARRAY_SUPPORT = t(), !M.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function t() {
    try {
      var Q = new Uint8Array(1), K = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(K, Uint8Array.prototype), Object.setPrototypeOf(Q, K), Q.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(M.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (M.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(M.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (M.isBuffer(this))
        return this.byteOffset;
    }
  });
  function O(Q) {
    if (Q > V)
      throw new RangeError('The value "' + Q + '" is invalid for option "size"');
    var K = new Uint8Array(Q);
    return Object.setPrototypeOf(K, M.prototype), K;
  }
  function M(Q, K, te) {
    if (typeof Q == "number") {
      if (typeof K == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return Y(Q);
    }
    return D(Q, K, te);
  }
  M.poolSize = 8192;
  function D(Q, K, te) {
    if (typeof Q == "string")
      return X(Q, K);
    if (ArrayBuffer.isView(Q))
      return re(Q);
    if (Q == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Q
      );
    if (Ee(Q, ArrayBuffer) || Q && Ee(Q.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ee(Q, SharedArrayBuffer) || Q && Ee(Q.buffer, SharedArrayBuffer)))
      return ie(Q, K, te);
    if (typeof Q == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var ae = Q.valueOf && Q.valueOf();
    if (ae != null && ae !== Q)
      return M.from(ae, K, te);
    var ve = ne(Q);
    if (ve)
      return ve;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof Q[Symbol.toPrimitive] == "function")
      return M.from(
        Q[Symbol.toPrimitive]("string"),
        K,
        te
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Q
    );
  }
  M.from = function(Q, K, te) {
    return D(Q, K, te);
  }, Object.setPrototypeOf(M.prototype, Uint8Array.prototype), Object.setPrototypeOf(M, Uint8Array);
  function I(Q) {
    if (typeof Q != "number")
      throw new TypeError('"size" argument must be of type number');
    if (Q < 0)
      throw new RangeError('The value "' + Q + '" is invalid for option "size"');
  }
  function P(Q, K, te) {
    return I(Q), Q <= 0 ? O(Q) : K !== void 0 ? typeof te == "string" ? O(Q).fill(K, te) : O(Q).fill(K) : O(Q);
  }
  M.alloc = function(Q, K, te) {
    return P(Q, K, te);
  };
  function Y(Q) {
    return I(Q), O(Q < 0 ? 0 : se(Q) | 0);
  }
  M.allocUnsafe = function(Q) {
    return Y(Q);
  }, M.allocUnsafeSlow = function(Q) {
    return Y(Q);
  };
  function X(Q, K) {
    if ((typeof K != "string" || K === "") && (K = "utf8"), !M.isEncoding(K))
      throw new TypeError("Unknown encoding: " + K);
    var te = be(Q, K) | 0, ae = O(te), ve = ae.write(Q, K);
    return ve !== te && (ae = ae.slice(0, ve)), ae;
  }
  function ee(Q) {
    for (var K = Q.length < 0 ? 0 : se(Q.length) | 0, te = O(K), ae = 0; ae < K; ae += 1)
      te[ae] = Q[ae] & 255;
    return te;
  }
  function re(Q) {
    if (Ee(Q, Uint8Array)) {
      var K = new Uint8Array(Q);
      return ie(K.buffer, K.byteOffset, K.byteLength);
    }
    return ee(Q);
  }
  function ie(Q, K, te) {
    if (K < 0 || Q.byteLength < K)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (Q.byteLength < K + (te || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var ae;
    return K === void 0 && te === void 0 ? ae = new Uint8Array(Q) : te === void 0 ? ae = new Uint8Array(Q, K) : ae = new Uint8Array(Q, K, te), Object.setPrototypeOf(ae, M.prototype), ae;
  }
  function ne(Q) {
    if (M.isBuffer(Q)) {
      var K = se(Q.length) | 0, te = O(K);
      return te.length === 0 || Q.copy(te, 0, 0, K), te;
    }
    if (Q.length !== void 0)
      return typeof Q.length != "number" || Ie(Q.length) ? O(0) : ee(Q);
    if (Q.type === "Buffer" && Array.isArray(Q.data))
      return ee(Q.data);
  }
  function se(Q) {
    if (Q >= V)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + V.toString(16) + " bytes");
    return Q | 0;
  }
  function oe(Q) {
    return +Q != Q && (Q = 0), M.alloc(+Q);
  }
  M.isBuffer = function(K) {
    return K != null && K._isBuffer === !0 && K !== M.prototype;
  }, M.compare = function(K, te) {
    if (Ee(K, Uint8Array) && (K = M.from(K, K.offset, K.byteLength)), Ee(te, Uint8Array) && (te = M.from(te, te.offset, te.byteLength)), !M.isBuffer(K) || !M.isBuffer(te))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (K === te)
      return 0;
    for (var ae = K.length, ve = te.length, qe = 0, Re = Math.min(ae, ve); qe < Re; ++qe)
      if (K[qe] !== te[qe]) {
        ae = K[qe], ve = te[qe];
        break;
      }
    return ae < ve ? -1 : ve < ae ? 1 : 0;
  }, M.isEncoding = function(K) {
    switch (String(K).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, M.concat = function(K, te) {
    if (!Array.isArray(K))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (K.length === 0)
      return M.alloc(0);
    var ae;
    if (te === void 0)
      for (te = 0, ae = 0; ae < K.length; ++ae)
        te += K[ae].length;
    var ve = M.allocUnsafe(te), qe = 0;
    for (ae = 0; ae < K.length; ++ae) {
      var Re = K[ae];
      if (Ee(Re, Uint8Array))
        qe + Re.length > ve.length ? M.from(Re).copy(ve, qe) : Uint8Array.prototype.set.call(
          ve,
          Re,
          qe
        );
      else if (M.isBuffer(Re))
        Re.copy(ve, qe);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      qe += Re.length;
    }
    return ve;
  };
  function be(Q, K) {
    if (M.isBuffer(Q))
      return Q.length;
    if (ArrayBuffer.isView(Q) || Ee(Q, ArrayBuffer))
      return Q.byteLength;
    if (typeof Q != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof Q
      );
    var te = Q.length, ae = arguments.length > 2 && arguments[2] === !0;
    if (!ae && te === 0)
      return 0;
    for (var ve = !1; ; )
      switch (K) {
        case "ascii":
        case "latin1":
        case "binary":
          return te;
        case "utf8":
        case "utf-8":
          return fe(Q).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return te * 2;
        case "hex":
          return te >>> 1;
        case "base64":
          return pe(Q).length;
        default:
          if (ve)
            return ae ? -1 : fe(Q).length;
          K = ("" + K).toLowerCase(), ve = !0;
      }
  }
  M.byteLength = be;
  function de(Q, K, te) {
    var ae = !1;
    if ((K === void 0 || K < 0) && (K = 0), K > this.length || ((te === void 0 || te > this.length) && (te = this.length), te <= 0) || (te >>>= 0, K >>>= 0, te <= K))
      return "";
    for (Q || (Q = "utf8"); ; )
      switch (Q) {
        case "hex":
          return q(this, K, te);
        case "utf8":
        case "utf-8":
          return o(this, K, te);
        case "ascii":
          return F(this, K, te);
        case "latin1":
        case "binary":
          return A(this, K, te);
        case "base64":
          return e(this, K, te);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return z(this, K, te);
        default:
          if (ae)
            throw new TypeError("Unknown encoding: " + Q);
          Q = (Q + "").toLowerCase(), ae = !0;
      }
  }
  M.prototype._isBuffer = !0;
  function we(Q, K, te) {
    var ae = Q[K];
    Q[K] = Q[te], Q[te] = ae;
  }
  M.prototype.swap16 = function() {
    var K = this.length;
    if (K % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var te = 0; te < K; te += 2)
      we(this, te, te + 1);
    return this;
  }, M.prototype.swap32 = function() {
    var K = this.length;
    if (K % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var te = 0; te < K; te += 4)
      we(this, te, te + 3), we(this, te + 1, te + 2);
    return this;
  }, M.prototype.swap64 = function() {
    var K = this.length;
    if (K % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var te = 0; te < K; te += 8)
      we(this, te, te + 7), we(this, te + 1, te + 6), we(this, te + 2, te + 5), we(this, te + 3, te + 4);
    return this;
  }, M.prototype.toString = function() {
    var K = this.length;
    return K === 0 ? "" : arguments.length === 0 ? o(this, 0, K) : de.apply(this, arguments);
  }, M.prototype.toLocaleString = M.prototype.toString, M.prototype.equals = function(K) {
    if (!M.isBuffer(K))
      throw new TypeError("Argument must be a Buffer");
    return this === K ? !0 : M.compare(this, K) === 0;
  }, M.prototype.inspect = function() {
    var K = "", te = $.INSPECT_MAX_BYTES;
    return K = this.toString("hex", 0, te).replace(/(.{2})/g, "$1 ").trim(), this.length > te && (K += " ... "), "<Buffer " + K + ">";
  }, B && (M.prototype[B] = M.prototype.inspect), M.prototype.compare = function(K, te, ae, ve, qe) {
    if (Ee(K, Uint8Array) && (K = M.from(K, K.offset, K.byteLength)), !M.isBuffer(K))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof K
      );
    if (te === void 0 && (te = 0), ae === void 0 && (ae = K ? K.length : 0), ve === void 0 && (ve = 0), qe === void 0 && (qe = this.length), te < 0 || ae > K.length || ve < 0 || qe > this.length)
      throw new RangeError("out of range index");
    if (ve >= qe && te >= ae)
      return 0;
    if (ve >= qe)
      return -1;
    if (te >= ae)
      return 1;
    if (te >>>= 0, ae >>>= 0, ve >>>= 0, qe >>>= 0, this === K)
      return 0;
    for (var Re = qe - ve, xe = ae - te, Le = Math.min(Re, xe), Te = this.slice(ve, qe), $e = K.slice(te, ae), Ce = 0; Ce < Le; ++Ce)
      if (Te[Ce] !== $e[Ce]) {
        Re = Te[Ce], xe = $e[Ce];
        break;
      }
    return Re < xe ? -1 : xe < Re ? 1 : 0;
  };
  function Se(Q, K, te, ae, ve) {
    if (Q.length === 0)
      return -1;
    if (typeof te == "string" ? (ae = te, te = 0) : te > 2147483647 ? te = 2147483647 : te < -2147483648 && (te = -2147483648), te = +te, Ie(te) && (te = ve ? 0 : Q.length - 1), te < 0 && (te = Q.length + te), te >= Q.length) {
      if (ve)
        return -1;
      te = Q.length - 1;
    } else if (te < 0)
      if (ve)
        te = 0;
      else
        return -1;
    if (typeof K == "string" && (K = M.from(K, ae)), M.isBuffer(K))
      return K.length === 0 ? -1 : ke(Q, K, te, ae, ve);
    if (typeof K == "number")
      return K = K & 255, typeof Uint8Array.prototype.indexOf == "function" ? ve ? Uint8Array.prototype.indexOf.call(Q, K, te) : Uint8Array.prototype.lastIndexOf.call(Q, K, te) : ke(Q, [K], te, ae, ve);
    throw new TypeError("val must be string, number or Buffer");
  }
  function ke(Q, K, te, ae, ve) {
    var qe = 1, Re = Q.length, xe = K.length;
    if (ae !== void 0 && (ae = String(ae).toLowerCase(), ae === "ucs2" || ae === "ucs-2" || ae === "utf16le" || ae === "utf-16le")) {
      if (Q.length < 2 || K.length < 2)
        return -1;
      qe = 2, Re /= 2, xe /= 2, te /= 2;
    }
    function Le(je, at) {
      return qe === 1 ? je[at] : je.readUInt16BE(at * qe);
    }
    var Te;
    if (ve) {
      var $e = -1;
      for (Te = te; Te < Re; Te++)
        if (Le(Q, Te) === Le(K, $e === -1 ? 0 : Te - $e)) {
          if ($e === -1 && ($e = Te), Te - $e + 1 === xe)
            return $e * qe;
        } else
          $e !== -1 && (Te -= Te - $e), $e = -1;
    } else
      for (te + xe > Re && (te = Re - xe), Te = te; Te >= 0; Te--) {
        for (var Ce = !0, Ve = 0; Ve < xe; Ve++)
          if (Le(Q, Te + Ve) !== Le(K, Ve)) {
            Ce = !1;
            break;
          }
        if (Ce)
          return Te;
      }
    return -1;
  }
  M.prototype.includes = function(K, te, ae) {
    return this.indexOf(K, te, ae) !== -1;
  }, M.prototype.indexOf = function(K, te, ae) {
    return Se(this, K, te, ae, !0);
  }, M.prototype.lastIndexOf = function(K, te, ae) {
    return Se(this, K, te, ae, !1);
  };
  function he(Q, K, te, ae) {
    te = Number(te) || 0;
    var ve = Q.length - te;
    ae ? (ae = Number(ae), ae > ve && (ae = ve)) : ae = ve;
    var qe = K.length;
    ae > qe / 2 && (ae = qe / 2);
    for (var Re = 0; Re < ae; ++Re) {
      var xe = parseInt(K.substr(Re * 2, 2), 16);
      if (Ie(xe))
        return Re;
      Q[te + Re] = xe;
    }
    return Re;
  }
  function le(Q, K, te, ae) {
    return ge(fe(K, Q.length - te), Q, te, ae);
  }
  function _e(Q, K, te, ae) {
    return ge(Ae(K), Q, te, ae);
  }
  function G(Q, K, te, ae) {
    return ge(pe(K), Q, te, ae);
  }
  function Z(Q, K, te, ae) {
    return ge(Be(K, Q.length - te), Q, te, ae);
  }
  M.prototype.write = function(K, te, ae, ve) {
    if (te === void 0)
      ve = "utf8", ae = this.length, te = 0;
    else if (ae === void 0 && typeof te == "string")
      ve = te, ae = this.length, te = 0;
    else if (isFinite(te))
      te = te >>> 0, isFinite(ae) ? (ae = ae >>> 0, ve === void 0 && (ve = "utf8")) : (ve = ae, ae = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var qe = this.length - te;
    if ((ae === void 0 || ae > qe) && (ae = qe), K.length > 0 && (ae < 0 || te < 0) || te > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    ve || (ve = "utf8");
    for (var Re = !1; ; )
      switch (ve) {
        case "hex":
          return he(this, K, te, ae);
        case "utf8":
        case "utf-8":
          return le(this, K, te, ae);
        case "ascii":
        case "latin1":
        case "binary":
          return _e(this, K, te, ae);
        case "base64":
          return G(this, K, te, ae);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Z(this, K, te, ae);
        default:
          if (Re)
            throw new TypeError("Unknown encoding: " + ve);
          ve = ("" + ve).toLowerCase(), Re = !0;
      }
  }, M.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function e(Q, K, te) {
    return K === 0 && te === Q.length ? h.fromByteArray(Q) : h.fromByteArray(Q.slice(K, te));
  }
  function o(Q, K, te) {
    te = Math.min(Q.length, te);
    for (var ae = [], ve = K; ve < te; ) {
      var qe = Q[ve], Re = null, xe = qe > 239 ? 4 : qe > 223 ? 3 : qe > 191 ? 2 : 1;
      if (ve + xe <= te) {
        var Le, Te, $e, Ce;
        switch (xe) {
          case 1:
            qe < 128 && (Re = qe);
            break;
          case 2:
            Le = Q[ve + 1], (Le & 192) === 128 && (Ce = (qe & 31) << 6 | Le & 63, Ce > 127 && (Re = Ce));
            break;
          case 3:
            Le = Q[ve + 1], Te = Q[ve + 2], (Le & 192) === 128 && (Te & 192) === 128 && (Ce = (qe & 15) << 12 | (Le & 63) << 6 | Te & 63, Ce > 2047 && (Ce < 55296 || Ce > 57343) && (Re = Ce));
            break;
          case 4:
            Le = Q[ve + 1], Te = Q[ve + 2], $e = Q[ve + 3], (Le & 192) === 128 && (Te & 192) === 128 && ($e & 192) === 128 && (Ce = (qe & 15) << 18 | (Le & 63) << 12 | (Te & 63) << 6 | $e & 63, Ce > 65535 && Ce < 1114112 && (Re = Ce));
        }
      }
      Re === null ? (Re = 65533, xe = 1) : Re > 65535 && (Re -= 65536, ae.push(Re >>> 10 & 1023 | 55296), Re = 56320 | Re & 1023), ae.push(Re), ve += xe;
    }
    return H(ae);
  }
  var g = 4096;
  function H(Q) {
    var K = Q.length;
    if (K <= g)
      return String.fromCharCode.apply(String, Q);
    for (var te = "", ae = 0; ae < K; )
      te += String.fromCharCode.apply(
        String,
        Q.slice(ae, ae += g)
      );
    return te;
  }
  function F(Q, K, te) {
    var ae = "";
    te = Math.min(Q.length, te);
    for (var ve = K; ve < te; ++ve)
      ae += String.fromCharCode(Q[ve] & 127);
    return ae;
  }
  function A(Q, K, te) {
    var ae = "";
    te = Math.min(Q.length, te);
    for (var ve = K; ve < te; ++ve)
      ae += String.fromCharCode(Q[ve]);
    return ae;
  }
  function q(Q, K, te) {
    var ae = Q.length;
    (!K || K < 0) && (K = 0), (!te || te < 0 || te > ae) && (te = ae);
    for (var ve = "", qe = K; qe < te; ++qe)
      ve += Pe[Q[qe]];
    return ve;
  }
  function z(Q, K, te) {
    for (var ae = Q.slice(K, te), ve = "", qe = 0; qe < ae.length - 1; qe += 2)
      ve += String.fromCharCode(ae[qe] + ae[qe + 1] * 256);
    return ve;
  }
  M.prototype.slice = function(K, te) {
    var ae = this.length;
    K = ~~K, te = te === void 0 ? ae : ~~te, K < 0 ? (K += ae, K < 0 && (K = 0)) : K > ae && (K = ae), te < 0 ? (te += ae, te < 0 && (te = 0)) : te > ae && (te = ae), te < K && (te = K);
    var ve = this.subarray(K, te);
    return Object.setPrototypeOf(ve, M.prototype), ve;
  };
  function S(Q, K, te) {
    if (Q % 1 !== 0 || Q < 0)
      throw new RangeError("offset is not uint");
    if (Q + K > te)
      throw new RangeError("Trying to access beyond buffer length");
  }
  M.prototype.readUintLE = M.prototype.readUIntLE = function(K, te, ae) {
    K = K >>> 0, te = te >>> 0, ae || S(K, te, this.length);
    for (var ve = this[K], qe = 1, Re = 0; ++Re < te && (qe *= 256); )
      ve += this[K + Re] * qe;
    return ve;
  }, M.prototype.readUintBE = M.prototype.readUIntBE = function(K, te, ae) {
    K = K >>> 0, te = te >>> 0, ae || S(K, te, this.length);
    for (var ve = this[K + --te], qe = 1; te > 0 && (qe *= 256); )
      ve += this[K + --te] * qe;
    return ve;
  }, M.prototype.readUint8 = M.prototype.readUInt8 = function(K, te) {
    return K = K >>> 0, te || S(K, 1, this.length), this[K];
  }, M.prototype.readUint16LE = M.prototype.readUInt16LE = function(K, te) {
    return K = K >>> 0, te || S(K, 2, this.length), this[K] | this[K + 1] << 8;
  }, M.prototype.readUint16BE = M.prototype.readUInt16BE = function(K, te) {
    return K = K >>> 0, te || S(K, 2, this.length), this[K] << 8 | this[K + 1];
  }, M.prototype.readUint32LE = M.prototype.readUInt32LE = function(K, te) {
    return K = K >>> 0, te || S(K, 4, this.length), (this[K] | this[K + 1] << 8 | this[K + 2] << 16) + this[K + 3] * 16777216;
  }, M.prototype.readUint32BE = M.prototype.readUInt32BE = function(K, te) {
    return K = K >>> 0, te || S(K, 4, this.length), this[K] * 16777216 + (this[K + 1] << 16 | this[K + 2] << 8 | this[K + 3]);
  }, M.prototype.readIntLE = function(K, te, ae) {
    K = K >>> 0, te = te >>> 0, ae || S(K, te, this.length);
    for (var ve = this[K], qe = 1, Re = 0; ++Re < te && (qe *= 256); )
      ve += this[K + Re] * qe;
    return qe *= 128, ve >= qe && (ve -= Math.pow(2, 8 * te)), ve;
  }, M.prototype.readIntBE = function(K, te, ae) {
    K = K >>> 0, te = te >>> 0, ae || S(K, te, this.length);
    for (var ve = te, qe = 1, Re = this[K + --ve]; ve > 0 && (qe *= 256); )
      Re += this[K + --ve] * qe;
    return qe *= 128, Re >= qe && (Re -= Math.pow(2, 8 * te)), Re;
  }, M.prototype.readInt8 = function(K, te) {
    return K = K >>> 0, te || S(K, 1, this.length), this[K] & 128 ? (255 - this[K] + 1) * -1 : this[K];
  }, M.prototype.readInt16LE = function(K, te) {
    K = K >>> 0, te || S(K, 2, this.length);
    var ae = this[K] | this[K + 1] << 8;
    return ae & 32768 ? ae | 4294901760 : ae;
  }, M.prototype.readInt16BE = function(K, te) {
    K = K >>> 0, te || S(K, 2, this.length);
    var ae = this[K + 1] | this[K] << 8;
    return ae & 32768 ? ae | 4294901760 : ae;
  }, M.prototype.readInt32LE = function(K, te) {
    return K = K >>> 0, te || S(K, 4, this.length), this[K] | this[K + 1] << 8 | this[K + 2] << 16 | this[K + 3] << 24;
  }, M.prototype.readInt32BE = function(K, te) {
    return K = K >>> 0, te || S(K, 4, this.length), this[K] << 24 | this[K + 1] << 16 | this[K + 2] << 8 | this[K + 3];
  }, M.prototype.readFloatLE = function(K, te) {
    return K = K >>> 0, te || S(K, 4, this.length), U.read(this, K, !0, 23, 4);
  }, M.prototype.readFloatBE = function(K, te) {
    return K = K >>> 0, te || S(K, 4, this.length), U.read(this, K, !1, 23, 4);
  }, M.prototype.readDoubleLE = function(K, te) {
    return K = K >>> 0, te || S(K, 8, this.length), U.read(this, K, !0, 52, 8);
  }, M.prototype.readDoubleBE = function(K, te) {
    return K = K >>> 0, te || S(K, 8, this.length), U.read(this, K, !1, 52, 8);
  };
  function J(Q, K, te, ae, ve, qe) {
    if (!M.isBuffer(Q))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (K > ve || K < qe)
      throw new RangeError('"value" argument is out of bounds');
    if (te + ae > Q.length)
      throw new RangeError("Index out of range");
  }
  M.prototype.writeUintLE = M.prototype.writeUIntLE = function(K, te, ae, ve) {
    if (K = +K, te = te >>> 0, ae = ae >>> 0, !ve) {
      var qe = Math.pow(2, 8 * ae) - 1;
      J(this, K, te, ae, qe, 0);
    }
    var Re = 1, xe = 0;
    for (this[te] = K & 255; ++xe < ae && (Re *= 256); )
      this[te + xe] = K / Re & 255;
    return te + ae;
  }, M.prototype.writeUintBE = M.prototype.writeUIntBE = function(K, te, ae, ve) {
    if (K = +K, te = te >>> 0, ae = ae >>> 0, !ve) {
      var qe = Math.pow(2, 8 * ae) - 1;
      J(this, K, te, ae, qe, 0);
    }
    var Re = ae - 1, xe = 1;
    for (this[te + Re] = K & 255; --Re >= 0 && (xe *= 256); )
      this[te + Re] = K / xe & 255;
    return te + ae;
  }, M.prototype.writeUint8 = M.prototype.writeUInt8 = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 1, 255, 0), this[te] = K & 255, te + 1;
  }, M.prototype.writeUint16LE = M.prototype.writeUInt16LE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 2, 65535, 0), this[te] = K & 255, this[te + 1] = K >>> 8, te + 2;
  }, M.prototype.writeUint16BE = M.prototype.writeUInt16BE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 2, 65535, 0), this[te] = K >>> 8, this[te + 1] = K & 255, te + 2;
  }, M.prototype.writeUint32LE = M.prototype.writeUInt32LE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 4, 4294967295, 0), this[te + 3] = K >>> 24, this[te + 2] = K >>> 16, this[te + 1] = K >>> 8, this[te] = K & 255, te + 4;
  }, M.prototype.writeUint32BE = M.prototype.writeUInt32BE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 4, 4294967295, 0), this[te] = K >>> 24, this[te + 1] = K >>> 16, this[te + 2] = K >>> 8, this[te + 3] = K & 255, te + 4;
  }, M.prototype.writeIntLE = function(K, te, ae, ve) {
    if (K = +K, te = te >>> 0, !ve) {
      var qe = Math.pow(2, 8 * ae - 1);
      J(this, K, te, ae, qe - 1, -qe);
    }
    var Re = 0, xe = 1, Le = 0;
    for (this[te] = K & 255; ++Re < ae && (xe *= 256); )
      K < 0 && Le === 0 && this[te + Re - 1] !== 0 && (Le = 1), this[te + Re] = (K / xe >> 0) - Le & 255;
    return te + ae;
  }, M.prototype.writeIntBE = function(K, te, ae, ve) {
    if (K = +K, te = te >>> 0, !ve) {
      var qe = Math.pow(2, 8 * ae - 1);
      J(this, K, te, ae, qe - 1, -qe);
    }
    var Re = ae - 1, xe = 1, Le = 0;
    for (this[te + Re] = K & 255; --Re >= 0 && (xe *= 256); )
      K < 0 && Le === 0 && this[te + Re + 1] !== 0 && (Le = 1), this[te + Re] = (K / xe >> 0) - Le & 255;
    return te + ae;
  }, M.prototype.writeInt8 = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 1, 127, -128), K < 0 && (K = 255 + K + 1), this[te] = K & 255, te + 1;
  }, M.prototype.writeInt16LE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 2, 32767, -32768), this[te] = K & 255, this[te + 1] = K >>> 8, te + 2;
  }, M.prototype.writeInt16BE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 2, 32767, -32768), this[te] = K >>> 8, this[te + 1] = K & 255, te + 2;
  }, M.prototype.writeInt32LE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 4, 2147483647, -2147483648), this[te] = K & 255, this[te + 1] = K >>> 8, this[te + 2] = K >>> 16, this[te + 3] = K >>> 24, te + 4;
  }, M.prototype.writeInt32BE = function(K, te, ae) {
    return K = +K, te = te >>> 0, ae || J(this, K, te, 4, 2147483647, -2147483648), K < 0 && (K = 4294967295 + K + 1), this[te] = K >>> 24, this[te + 1] = K >>> 16, this[te + 2] = K >>> 8, this[te + 3] = K & 255, te + 4;
  };
  function ce(Q, K, te, ae, ve, qe) {
    if (te + ae > Q.length)
      throw new RangeError("Index out of range");
    if (te < 0)
      throw new RangeError("Index out of range");
  }
  function ye(Q, K, te, ae, ve) {
    return K = +K, te = te >>> 0, ve || ce(Q, K, te, 4), U.write(Q, K, te, ae, 23, 4), te + 4;
  }
  M.prototype.writeFloatLE = function(K, te, ae) {
    return ye(this, K, te, !0, ae);
  }, M.prototype.writeFloatBE = function(K, te, ae) {
    return ye(this, K, te, !1, ae);
  };
  function Me(Q, K, te, ae, ve) {
    return K = +K, te = te >>> 0, ve || ce(Q, K, te, 8), U.write(Q, K, te, ae, 52, 8), te + 8;
  }
  M.prototype.writeDoubleLE = function(K, te, ae) {
    return Me(this, K, te, !0, ae);
  }, M.prototype.writeDoubleBE = function(K, te, ae) {
    return Me(this, K, te, !1, ae);
  }, M.prototype.copy = function(K, te, ae, ve) {
    if (!M.isBuffer(K))
      throw new TypeError("argument should be a Buffer");
    if (ae || (ae = 0), !ve && ve !== 0 && (ve = this.length), te >= K.length && (te = K.length), te || (te = 0), ve > 0 && ve < ae && (ve = ae), ve === ae || K.length === 0 || this.length === 0)
      return 0;
    if (te < 0)
      throw new RangeError("targetStart out of bounds");
    if (ae < 0 || ae >= this.length)
      throw new RangeError("Index out of range");
    if (ve < 0)
      throw new RangeError("sourceEnd out of bounds");
    ve > this.length && (ve = this.length), K.length - te < ve - ae && (ve = K.length - te + ae);
    var qe = ve - ae;
    return this === K && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(te, ae, ve) : Uint8Array.prototype.set.call(
      K,
      this.subarray(ae, ve),
      te
    ), qe;
  }, M.prototype.fill = function(K, te, ae, ve) {
    if (typeof K == "string") {
      if (typeof te == "string" ? (ve = te, te = 0, ae = this.length) : typeof ae == "string" && (ve = ae, ae = this.length), ve !== void 0 && typeof ve != "string")
        throw new TypeError("encoding must be a string");
      if (typeof ve == "string" && !M.isEncoding(ve))
        throw new TypeError("Unknown encoding: " + ve);
      if (K.length === 1) {
        var qe = K.charCodeAt(0);
        (ve === "utf8" && qe < 128 || ve === "latin1") && (K = qe);
      }
    } else
      typeof K == "number" ? K = K & 255 : typeof K == "boolean" && (K = Number(K));
    if (te < 0 || this.length < te || this.length < ae)
      throw new RangeError("Out of range index");
    if (ae <= te)
      return this;
    te = te >>> 0, ae = ae === void 0 ? this.length : ae >>> 0, K || (K = 0);
    var Re;
    if (typeof K == "number")
      for (Re = te; Re < ae; ++Re)
        this[Re] = K;
    else {
      var xe = M.isBuffer(K) ? K : M.from(K, ve), Le = xe.length;
      if (Le === 0)
        throw new TypeError('The value "' + K + '" is invalid for argument "value"');
      for (Re = 0; Re < ae - te; ++Re)
        this[Re + te] = xe[Re % Le];
    }
    return this;
  };
  var me = /[^+/0-9A-Za-z-_]/g;
  function ue(Q) {
    if (Q = Q.split("=")[0], Q = Q.trim().replace(me, ""), Q.length < 2)
      return "";
    for (; Q.length % 4 !== 0; )
      Q = Q + "=";
    return Q;
  }
  function fe(Q, K) {
    K = K || 1 / 0;
    for (var te, ae = Q.length, ve = null, qe = [], Re = 0; Re < ae; ++Re) {
      if (te = Q.charCodeAt(Re), te > 55295 && te < 57344) {
        if (!ve) {
          if (te > 56319) {
            (K -= 3) > -1 && qe.push(239, 191, 189);
            continue;
          } else if (Re + 1 === ae) {
            (K -= 3) > -1 && qe.push(239, 191, 189);
            continue;
          }
          ve = te;
          continue;
        }
        if (te < 56320) {
          (K -= 3) > -1 && qe.push(239, 191, 189), ve = te;
          continue;
        }
        te = (ve - 55296 << 10 | te - 56320) + 65536;
      } else
        ve && (K -= 3) > -1 && qe.push(239, 191, 189);
      if (ve = null, te < 128) {
        if ((K -= 1) < 0)
          break;
        qe.push(te);
      } else if (te < 2048) {
        if ((K -= 2) < 0)
          break;
        qe.push(
          te >> 6 | 192,
          te & 63 | 128
        );
      } else if (te < 65536) {
        if ((K -= 3) < 0)
          break;
        qe.push(
          te >> 12 | 224,
          te >> 6 & 63 | 128,
          te & 63 | 128
        );
      } else if (te < 1114112) {
        if ((K -= 4) < 0)
          break;
        qe.push(
          te >> 18 | 240,
          te >> 12 & 63 | 128,
          te >> 6 & 63 | 128,
          te & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return qe;
  }
  function Ae(Q) {
    for (var K = [], te = 0; te < Q.length; ++te)
      K.push(Q.charCodeAt(te) & 255);
    return K;
  }
  function Be(Q, K) {
    for (var te, ae, ve, qe = [], Re = 0; Re < Q.length && !((K -= 2) < 0); ++Re)
      te = Q.charCodeAt(Re), ae = te >> 8, ve = te % 256, qe.push(ve), qe.push(ae);
    return qe;
  }
  function pe(Q) {
    return h.toByteArray(ue(Q));
  }
  function ge(Q, K, te, ae) {
    for (var ve = 0; ve < ae && !(ve + te >= K.length || ve >= Q.length); ++ve)
      K[ve + te] = Q[ve];
    return ve;
  }
  function Ee(Q, K) {
    return Q instanceof K || Q != null && Q.constructor != null && Q.constructor.name != null && Q.constructor.name === K.name;
  }
  function Ie(Q) {
    return Q !== Q;
  }
  var Pe = function() {
    for (var Q = "0123456789abcdef", K = new Array(256), te = 0; te < 16; ++te)
      for (var ae = te * 16, ve = 0; ve < 16; ++ve)
        K[ae + ve] = Q[te] + Q[ve];
    return K;
  }();
})(buffer$2);
var process$2 = {}, cachedSetTimeout$1, cachedClearTimeout$1;
function defaultSetTimout$1() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout$1() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? cachedSetTimeout$1 = setTimeout : cachedSetTimeout$1 = defaultSetTimout$1;
  } catch {
    cachedSetTimeout$1 = defaultSetTimout$1;
  }
  try {
    typeof clearTimeout == "function" ? cachedClearTimeout$1 = clearTimeout : cachedClearTimeout$1 = defaultClearTimeout$1;
  } catch {
    cachedClearTimeout$1 = defaultClearTimeout$1;
  }
})();
function runTimeout$1($) {
  if (cachedSetTimeout$1 === setTimeout)
    return setTimeout($, 0);
  if ((cachedSetTimeout$1 === defaultSetTimout$1 || !cachedSetTimeout$1) && setTimeout)
    return cachedSetTimeout$1 = setTimeout, setTimeout($, 0);
  try {
    return cachedSetTimeout$1($, 0);
  } catch {
    try {
      return cachedSetTimeout$1.call(null, $, 0);
    } catch {
      return cachedSetTimeout$1.call(this, $, 0);
    }
  }
}
function runClearTimeout$1($) {
  if (cachedClearTimeout$1 === clearTimeout)
    return clearTimeout($);
  if ((cachedClearTimeout$1 === defaultClearTimeout$1 || !cachedClearTimeout$1) && clearTimeout)
    return cachedClearTimeout$1 = clearTimeout, clearTimeout($);
  try {
    return cachedClearTimeout$1($);
  } catch {
    try {
      return cachedClearTimeout$1.call(null, $);
    } catch {
      return cachedClearTimeout$1.call(this, $);
    }
  }
}
var queue$1 = [], draining$1 = !1, currentQueue$1, queueIndex$1 = -1;
function cleanUpNextTick$1() {
  !draining$1 || !currentQueue$1 || (draining$1 = !1, currentQueue$1.length ? queue$1 = currentQueue$1.concat(queue$1) : queueIndex$1 = -1, queue$1.length && drainQueue$1());
}
function drainQueue$1() {
  if (!draining$1) {
    var $ = runTimeout$1(cleanUpNextTick$1);
    draining$1 = !0;
    for (var h = queue$1.length; h; ) {
      for (currentQueue$1 = queue$1, queue$1 = []; ++queueIndex$1 < h; )
        currentQueue$1 && currentQueue$1[queueIndex$1].run();
      queueIndex$1 = -1, h = queue$1.length;
    }
    currentQueue$1 = null, draining$1 = !1, runClearTimeout$1($);
  }
}
process$2.nextTick = function($) {
  var h = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var U = 1; U < arguments.length; U++)
      h[U - 1] = arguments[U];
  queue$1.push(new Item$1($, h)), queue$1.length === 1 && !draining$1 && runTimeout$1(drainQueue$1);
};
function Item$1($, h) {
  this.fun = $, this.array = h;
}
Item$1.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process$2.title = "browser";
process$2.browser = !0;
process$2.env = {};
process$2.argv = [];
process$2.version = "";
process$2.versions = {};
function noop$1() {
}
process$2.on = noop$1;
process$2.addListener = noop$1;
process$2.once = noop$1;
process$2.off = noop$1;
process$2.removeListener = noop$1;
process$2.removeAllListeners = noop$1;
process$2.emit = noop$1;
process$2.prependListener = noop$1;
process$2.prependOnceListener = noop$1;
process$2.listeners = function($) {
  return [];
};
process$2.binding = function($) {
  throw new Error("process.binding is not supported");
};
process$2.cwd = function() {
  return "/";
};
process$2.chdir = function($) {
  throw new Error("process.chdir is not supported");
};
process$2.umask = function() {
  return 0;
};
var _globalThis = function($) {
  function h() {
    var B = this || self;
    return delete $.prototype.__magic__, B;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return h();
  $.defineProperty($.prototype, "__magic__", {
    configurable: !0,
    get: h
  });
  var U = __magic__;
  return U;
}(Object), _global = _globalThis;
const name$1 = "@wepin/fetch-js", version$1 = "0.0.2", description$1 = "Wepin fetch library for Web", author$1 = "IoTrust, Co., Ltd.", license$1 = "MIT", main$1 = "./dist/wepin-fetch-js.mjs", types$1 = "./dist/src/index.d.ts", files$1 = [
  "dist"
], scripts$1 = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, dependencies$1 = {
  "@wepin/storage-js": "^0.0.1",
  bcryptjs: "^2.4.3",
  eventemitter2: "^6.4.9",
  "jwt-decode": "^4.0.0"
}, devDependencies$1 = {
  "@types/bcryptjs": "^2.4.6"
}, keywords$1 = [
  "wepin",
  "wepinwallet",
  "wallet",
  "wepin-fetch"
], packageJson = {
  name: name$1,
  version: version$1,
  description: description$1,
  author: author$1,
  license: license$1,
  main: main$1,
  types: types$1,
  files: files$1,
  scripts: scripts$1,
  dependencies: dependencies$1,
  devDependencies: devDependencies$1,
  keywords: keywords$1
};
class APIResponse {
  constructor({
    data: h,
    status: U,
    headers: B,
    request: V
  }) {
    this.data = h, this.status = U, this.headers = B, this.request = V;
  }
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof _global < "u" ? _global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs($) {
  return $ && $.__esModule && Object.prototype.hasOwnProperty.call($, "default") ? $.default : $;
}
var buffer$1 = {}, base64Js = {}, hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js)
    return base64Js;
  hasRequiredBase64Js = 1, base64Js.byteLength = M, base64Js.toByteArray = I, base64Js.fromByteArray = X;
  for (var $ = [], h = [], U = typeof Uint8Array < "u" ? Uint8Array : Array, B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", V = 0, t = B.length; V < t; ++V)
    $[V] = B[V], h[B.charCodeAt(V)] = V;
  h[45] = 62, h[95] = 63;
  function O(ee) {
    var re = ee.length;
    if (re % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var ie = ee.indexOf("=");
    ie === -1 && (ie = re);
    var ne = ie === re ? 0 : 4 - ie % 4;
    return [ie, ne];
  }
  function M(ee) {
    var re = O(ee), ie = re[0], ne = re[1];
    return (ie + ne) * 3 / 4 - ne;
  }
  function D(ee, re, ie) {
    return (re + ie) * 3 / 4 - ie;
  }
  function I(ee) {
    var re, ie = O(ee), ne = ie[0], se = ie[1], oe = new U(D(ee, ne, se)), be = 0, de = se > 0 ? ne - 4 : ne, we;
    for (we = 0; we < de; we += 4)
      re = h[ee.charCodeAt(we)] << 18 | h[ee.charCodeAt(we + 1)] << 12 | h[ee.charCodeAt(we + 2)] << 6 | h[ee.charCodeAt(we + 3)], oe[be++] = re >> 16 & 255, oe[be++] = re >> 8 & 255, oe[be++] = re & 255;
    return se === 2 && (re = h[ee.charCodeAt(we)] << 2 | h[ee.charCodeAt(we + 1)] >> 4, oe[be++] = re & 255), se === 1 && (re = h[ee.charCodeAt(we)] << 10 | h[ee.charCodeAt(we + 1)] << 4 | h[ee.charCodeAt(we + 2)] >> 2, oe[be++] = re >> 8 & 255, oe[be++] = re & 255), oe;
  }
  function P(ee) {
    return $[ee >> 18 & 63] + $[ee >> 12 & 63] + $[ee >> 6 & 63] + $[ee & 63];
  }
  function Y(ee, re, ie) {
    for (var ne, se = [], oe = re; oe < ie; oe += 3)
      ne = (ee[oe] << 16 & 16711680) + (ee[oe + 1] << 8 & 65280) + (ee[oe + 2] & 255), se.push(P(ne));
    return se.join("");
  }
  function X(ee) {
    for (var re, ie = ee.length, ne = ie % 3, se = [], oe = 16383, be = 0, de = ie - ne; be < de; be += oe)
      se.push(Y(ee, be, be + oe > de ? de : be + oe));
    return ne === 1 ? (re = ee[ie - 1], se.push(
      $[re >> 2] + $[re << 4 & 63] + "=="
    )) : ne === 2 && (re = (ee[ie - 2] << 8) + ee[ie - 1], se.push(
      $[re >> 10] + $[re >> 4 & 63] + $[re << 2 & 63] + "="
    )), se.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  return hasRequiredIeee754 || (hasRequiredIeee754 = 1, ieee754.read = function($, h, U, B, V) {
    var t, O, M = V * 8 - B - 1, D = (1 << M) - 1, I = D >> 1, P = -7, Y = U ? V - 1 : 0, X = U ? -1 : 1, ee = $[h + Y];
    for (Y += X, t = ee & (1 << -P) - 1, ee >>= -P, P += M; P > 0; t = t * 256 + $[h + Y], Y += X, P -= 8)
      ;
    for (O = t & (1 << -P) - 1, t >>= -P, P += B; P > 0; O = O * 256 + $[h + Y], Y += X, P -= 8)
      ;
    if (t === 0)
      t = 1 - I;
    else {
      if (t === D)
        return O ? NaN : (ee ? -1 : 1) * (1 / 0);
      O = O + Math.pow(2, B), t = t - I;
    }
    return (ee ? -1 : 1) * O * Math.pow(2, t - B);
  }, ieee754.write = function($, h, U, B, V, t) {
    var O, M, D, I = t * 8 - V - 1, P = (1 << I) - 1, Y = P >> 1, X = V === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, ee = B ? 0 : t - 1, re = B ? 1 : -1, ie = h < 0 || h === 0 && 1 / h < 0 ? 1 : 0;
    for (h = Math.abs(h), isNaN(h) || h === 1 / 0 ? (M = isNaN(h) ? 1 : 0, O = P) : (O = Math.floor(Math.log(h) / Math.LN2), h * (D = Math.pow(2, -O)) < 1 && (O--, D *= 2), O + Y >= 1 ? h += X / D : h += X * Math.pow(2, 1 - Y), h * D >= 2 && (O++, D /= 2), O + Y >= P ? (M = 0, O = P) : O + Y >= 1 ? (M = (h * D - 1) * Math.pow(2, V), O = O + Y) : (M = h * Math.pow(2, Y - 1) * Math.pow(2, V), O = 0)); V >= 8; $[U + ee] = M & 255, ee += re, M /= 256, V -= 8)
      ;
    for (O = O << V | M, I += V; I > 0; $[U + ee] = O & 255, ee += re, O /= 256, I -= 8)
      ;
    $[U + ee - re] |= ie * 128;
  }), ieee754;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var hasRequiredBuffer$1;
function requireBuffer$1() {
  return hasRequiredBuffer$1 || (hasRequiredBuffer$1 = 1, function($) {
    var h = requireBase64Js(), U = requireIeee754(), B = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    $.Buffer = M, $.SlowBuffer = oe, $.INSPECT_MAX_BYTES = 50;
    var V = 2147483647;
    $.kMaxLength = V, M.TYPED_ARRAY_SUPPORT = t(), !M.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function t() {
      try {
        var Q = new Uint8Array(1), K = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(K, Uint8Array.prototype), Object.setPrototypeOf(Q, K), Q.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(M.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (M.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(M.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (M.isBuffer(this))
          return this.byteOffset;
      }
    });
    function O(Q) {
      if (Q > V)
        throw new RangeError('The value "' + Q + '" is invalid for option "size"');
      var K = new Uint8Array(Q);
      return Object.setPrototypeOf(K, M.prototype), K;
    }
    function M(Q, K, te) {
      if (typeof Q == "number") {
        if (typeof K == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return Y(Q);
      }
      return D(Q, K, te);
    }
    M.poolSize = 8192;
    function D(Q, K, te) {
      if (typeof Q == "string")
        return X(Q, K);
      if (ArrayBuffer.isView(Q))
        return re(Q);
      if (Q == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Q
        );
      if (Ee(Q, ArrayBuffer) || Q && Ee(Q.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (Ee(Q, SharedArrayBuffer) || Q && Ee(Q.buffer, SharedArrayBuffer)))
        return ie(Q, K, te);
      if (typeof Q == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var ae = Q.valueOf && Q.valueOf();
      if (ae != null && ae !== Q)
        return M.from(ae, K, te);
      var ve = ne(Q);
      if (ve)
        return ve;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof Q[Symbol.toPrimitive] == "function")
        return M.from(
          Q[Symbol.toPrimitive]("string"),
          K,
          te
        );
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Q
      );
    }
    M.from = function(Q, K, te) {
      return D(Q, K, te);
    }, Object.setPrototypeOf(M.prototype, Uint8Array.prototype), Object.setPrototypeOf(M, Uint8Array);
    function I(Q) {
      if (typeof Q != "number")
        throw new TypeError('"size" argument must be of type number');
      if (Q < 0)
        throw new RangeError('The value "' + Q + '" is invalid for option "size"');
    }
    function P(Q, K, te) {
      return I(Q), Q <= 0 ? O(Q) : K !== void 0 ? typeof te == "string" ? O(Q).fill(K, te) : O(Q).fill(K) : O(Q);
    }
    M.alloc = function(Q, K, te) {
      return P(Q, K, te);
    };
    function Y(Q) {
      return I(Q), O(Q < 0 ? 0 : se(Q) | 0);
    }
    M.allocUnsafe = function(Q) {
      return Y(Q);
    }, M.allocUnsafeSlow = function(Q) {
      return Y(Q);
    };
    function X(Q, K) {
      if ((typeof K != "string" || K === "") && (K = "utf8"), !M.isEncoding(K))
        throw new TypeError("Unknown encoding: " + K);
      var te = be(Q, K) | 0, ae = O(te), ve = ae.write(Q, K);
      return ve !== te && (ae = ae.slice(0, ve)), ae;
    }
    function ee(Q) {
      for (var K = Q.length < 0 ? 0 : se(Q.length) | 0, te = O(K), ae = 0; ae < K; ae += 1)
        te[ae] = Q[ae] & 255;
      return te;
    }
    function re(Q) {
      if (Ee(Q, Uint8Array)) {
        var K = new Uint8Array(Q);
        return ie(K.buffer, K.byteOffset, K.byteLength);
      }
      return ee(Q);
    }
    function ie(Q, K, te) {
      if (K < 0 || Q.byteLength < K)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (Q.byteLength < K + (te || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var ae;
      return K === void 0 && te === void 0 ? ae = new Uint8Array(Q) : te === void 0 ? ae = new Uint8Array(Q, K) : ae = new Uint8Array(Q, K, te), Object.setPrototypeOf(ae, M.prototype), ae;
    }
    function ne(Q) {
      if (M.isBuffer(Q)) {
        var K = se(Q.length) | 0, te = O(K);
        return te.length === 0 || Q.copy(te, 0, 0, K), te;
      }
      if (Q.length !== void 0)
        return typeof Q.length != "number" || Ie(Q.length) ? O(0) : ee(Q);
      if (Q.type === "Buffer" && Array.isArray(Q.data))
        return ee(Q.data);
    }
    function se(Q) {
      if (Q >= V)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + V.toString(16) + " bytes");
      return Q | 0;
    }
    function oe(Q) {
      return +Q != Q && (Q = 0), M.alloc(+Q);
    }
    M.isBuffer = function(Q) {
      return Q != null && Q._isBuffer === !0 && Q !== M.prototype;
    }, M.compare = function(Q, K) {
      if (Ee(Q, Uint8Array) && (Q = M.from(Q, Q.offset, Q.byteLength)), Ee(K, Uint8Array) && (K = M.from(K, K.offset, K.byteLength)), !M.isBuffer(Q) || !M.isBuffer(K))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (Q === K)
        return 0;
      for (var te = Q.length, ae = K.length, ve = 0, qe = Math.min(te, ae); ve < qe; ++ve)
        if (Q[ve] !== K[ve]) {
          te = Q[ve], ae = K[ve];
          break;
        }
      return te < ae ? -1 : ae < te ? 1 : 0;
    }, M.isEncoding = function(Q) {
      switch (String(Q).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, M.concat = function(Q, K) {
      if (!Array.isArray(Q))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (Q.length === 0)
        return M.alloc(0);
      var te;
      if (K === void 0)
        for (K = 0, te = 0; te < Q.length; ++te)
          K += Q[te].length;
      var ae = M.allocUnsafe(K), ve = 0;
      for (te = 0; te < Q.length; ++te) {
        var qe = Q[te];
        if (Ee(qe, Uint8Array))
          ve + qe.length > ae.length ? M.from(qe).copy(ae, ve) : Uint8Array.prototype.set.call(
            ae,
            qe,
            ve
          );
        else if (M.isBuffer(qe))
          qe.copy(ae, ve);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        ve += qe.length;
      }
      return ae;
    };
    function be(Q, K) {
      if (M.isBuffer(Q))
        return Q.length;
      if (ArrayBuffer.isView(Q) || Ee(Q, ArrayBuffer))
        return Q.byteLength;
      if (typeof Q != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof Q
        );
      var te = Q.length, ae = arguments.length > 2 && arguments[2] === !0;
      if (!ae && te === 0)
        return 0;
      for (var ve = !1; ; )
        switch (K) {
          case "ascii":
          case "latin1":
          case "binary":
            return te;
          case "utf8":
          case "utf-8":
            return fe(Q).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return te * 2;
          case "hex":
            return te >>> 1;
          case "base64":
            return pe(Q).length;
          default:
            if (ve)
              return ae ? -1 : fe(Q).length;
            K = ("" + K).toLowerCase(), ve = !0;
        }
    }
    M.byteLength = be;
    function de(Q, K, te) {
      var ae = !1;
      if ((K === void 0 || K < 0) && (K = 0), K > this.length || ((te === void 0 || te > this.length) && (te = this.length), te <= 0) || (te >>>= 0, K >>>= 0, te <= K))
        return "";
      for (Q || (Q = "utf8"); ; )
        switch (Q) {
          case "hex":
            return q(this, K, te);
          case "utf8":
          case "utf-8":
            return o(this, K, te);
          case "ascii":
            return F(this, K, te);
          case "latin1":
          case "binary":
            return A(this, K, te);
          case "base64":
            return e(this, K, te);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return z(this, K, te);
          default:
            if (ae)
              throw new TypeError("Unknown encoding: " + Q);
            Q = (Q + "").toLowerCase(), ae = !0;
        }
    }
    M.prototype._isBuffer = !0;
    function we(Q, K, te) {
      var ae = Q[K];
      Q[K] = Q[te], Q[te] = ae;
    }
    M.prototype.swap16 = function() {
      var Q = this.length;
      if (Q % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var K = 0; K < Q; K += 2)
        we(this, K, K + 1);
      return this;
    }, M.prototype.swap32 = function() {
      var Q = this.length;
      if (Q % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var K = 0; K < Q; K += 4)
        we(this, K, K + 3), we(this, K + 1, K + 2);
      return this;
    }, M.prototype.swap64 = function() {
      var Q = this.length;
      if (Q % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var K = 0; K < Q; K += 8)
        we(this, K, K + 7), we(this, K + 1, K + 6), we(this, K + 2, K + 5), we(this, K + 3, K + 4);
      return this;
    }, M.prototype.toString = function() {
      var Q = this.length;
      return Q === 0 ? "" : arguments.length === 0 ? o(this, 0, Q) : de.apply(this, arguments);
    }, M.prototype.toLocaleString = M.prototype.toString, M.prototype.equals = function(Q) {
      if (!M.isBuffer(Q))
        throw new TypeError("Argument must be a Buffer");
      return this === Q ? !0 : M.compare(this, Q) === 0;
    }, M.prototype.inspect = function() {
      var Q = "", K = $.INSPECT_MAX_BYTES;
      return Q = this.toString("hex", 0, K).replace(/(.{2})/g, "$1 ").trim(), this.length > K && (Q += " ... "), "<Buffer " + Q + ">";
    }, B && (M.prototype[B] = M.prototype.inspect), M.prototype.compare = function(Q, K, te, ae, ve) {
      if (Ee(Q, Uint8Array) && (Q = M.from(Q, Q.offset, Q.byteLength)), !M.isBuffer(Q))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof Q
        );
      if (K === void 0 && (K = 0), te === void 0 && (te = Q ? Q.length : 0), ae === void 0 && (ae = 0), ve === void 0 && (ve = this.length), K < 0 || te > Q.length || ae < 0 || ve > this.length)
        throw new RangeError("out of range index");
      if (ae >= ve && K >= te)
        return 0;
      if (ae >= ve)
        return -1;
      if (K >= te)
        return 1;
      if (K >>>= 0, te >>>= 0, ae >>>= 0, ve >>>= 0, this === Q)
        return 0;
      for (var qe = ve - ae, Re = te - K, xe = Math.min(qe, Re), Le = this.slice(ae, ve), Te = Q.slice(K, te), $e = 0; $e < xe; ++$e)
        if (Le[$e] !== Te[$e]) {
          qe = Le[$e], Re = Te[$e];
          break;
        }
      return qe < Re ? -1 : Re < qe ? 1 : 0;
    };
    function Se(Q, K, te, ae, ve) {
      if (Q.length === 0)
        return -1;
      if (typeof te == "string" ? (ae = te, te = 0) : te > 2147483647 ? te = 2147483647 : te < -2147483648 && (te = -2147483648), te = +te, Ie(te) && (te = ve ? 0 : Q.length - 1), te < 0 && (te = Q.length + te), te >= Q.length) {
        if (ve)
          return -1;
        te = Q.length - 1;
      } else if (te < 0)
        if (ve)
          te = 0;
        else
          return -1;
      if (typeof K == "string" && (K = M.from(K, ae)), M.isBuffer(K))
        return K.length === 0 ? -1 : ke(Q, K, te, ae, ve);
      if (typeof K == "number")
        return K = K & 255, typeof Uint8Array.prototype.indexOf == "function" ? ve ? Uint8Array.prototype.indexOf.call(Q, K, te) : Uint8Array.prototype.lastIndexOf.call(Q, K, te) : ke(Q, [K], te, ae, ve);
      throw new TypeError("val must be string, number or Buffer");
    }
    function ke(Q, K, te, ae, ve) {
      var qe = 1, Re = Q.length, xe = K.length;
      if (ae !== void 0 && (ae = String(ae).toLowerCase(), ae === "ucs2" || ae === "ucs-2" || ae === "utf16le" || ae === "utf-16le")) {
        if (Q.length < 2 || K.length < 2)
          return -1;
        qe = 2, Re /= 2, xe /= 2, te /= 2;
      }
      function Le(je, at) {
        return qe === 1 ? je[at] : je.readUInt16BE(at * qe);
      }
      var Te;
      if (ve) {
        var $e = -1;
        for (Te = te; Te < Re; Te++)
          if (Le(Q, Te) === Le(K, $e === -1 ? 0 : Te - $e)) {
            if ($e === -1 && ($e = Te), Te - $e + 1 === xe)
              return $e * qe;
          } else
            $e !== -1 && (Te -= Te - $e), $e = -1;
      } else
        for (te + xe > Re && (te = Re - xe), Te = te; Te >= 0; Te--) {
          for (var Ce = !0, Ve = 0; Ve < xe; Ve++)
            if (Le(Q, Te + Ve) !== Le(K, Ve)) {
              Ce = !1;
              break;
            }
          if (Ce)
            return Te;
        }
      return -1;
    }
    M.prototype.includes = function(Q, K, te) {
      return this.indexOf(Q, K, te) !== -1;
    }, M.prototype.indexOf = function(Q, K, te) {
      return Se(this, Q, K, te, !0);
    }, M.prototype.lastIndexOf = function(Q, K, te) {
      return Se(this, Q, K, te, !1);
    };
    function he(Q, K, te, ae) {
      te = Number(te) || 0;
      var ve = Q.length - te;
      ae ? (ae = Number(ae), ae > ve && (ae = ve)) : ae = ve;
      var qe = K.length;
      ae > qe / 2 && (ae = qe / 2);
      for (var Re = 0; Re < ae; ++Re) {
        var xe = parseInt(K.substr(Re * 2, 2), 16);
        if (Ie(xe))
          return Re;
        Q[te + Re] = xe;
      }
      return Re;
    }
    function le(Q, K, te, ae) {
      return ge(fe(K, Q.length - te), Q, te, ae);
    }
    function _e(Q, K, te, ae) {
      return ge(Ae(K), Q, te, ae);
    }
    function G(Q, K, te, ae) {
      return ge(pe(K), Q, te, ae);
    }
    function Z(Q, K, te, ae) {
      return ge(Be(K, Q.length - te), Q, te, ae);
    }
    M.prototype.write = function(Q, K, te, ae) {
      if (K === void 0)
        ae = "utf8", te = this.length, K = 0;
      else if (te === void 0 && typeof K == "string")
        ae = K, te = this.length, K = 0;
      else if (isFinite(K))
        K = K >>> 0, isFinite(te) ? (te = te >>> 0, ae === void 0 && (ae = "utf8")) : (ae = te, te = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var ve = this.length - K;
      if ((te === void 0 || te > ve) && (te = ve), Q.length > 0 && (te < 0 || K < 0) || K > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      ae || (ae = "utf8");
      for (var qe = !1; ; )
        switch (ae) {
          case "hex":
            return he(this, Q, K, te);
          case "utf8":
          case "utf-8":
            return le(this, Q, K, te);
          case "ascii":
          case "latin1":
          case "binary":
            return _e(this, Q, K, te);
          case "base64":
            return G(this, Q, K, te);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Z(this, Q, K, te);
          default:
            if (qe)
              throw new TypeError("Unknown encoding: " + ae);
            ae = ("" + ae).toLowerCase(), qe = !0;
        }
    }, M.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function e(Q, K, te) {
      return K === 0 && te === Q.length ? h.fromByteArray(Q) : h.fromByteArray(Q.slice(K, te));
    }
    function o(Q, K, te) {
      te = Math.min(Q.length, te);
      for (var ae = [], ve = K; ve < te; ) {
        var qe = Q[ve], Re = null, xe = qe > 239 ? 4 : qe > 223 ? 3 : qe > 191 ? 2 : 1;
        if (ve + xe <= te) {
          var Le, Te, $e, Ce;
          switch (xe) {
            case 1:
              qe < 128 && (Re = qe);
              break;
            case 2:
              Le = Q[ve + 1], (Le & 192) === 128 && (Ce = (qe & 31) << 6 | Le & 63, Ce > 127 && (Re = Ce));
              break;
            case 3:
              Le = Q[ve + 1], Te = Q[ve + 2], (Le & 192) === 128 && (Te & 192) === 128 && (Ce = (qe & 15) << 12 | (Le & 63) << 6 | Te & 63, Ce > 2047 && (Ce < 55296 || Ce > 57343) && (Re = Ce));
              break;
            case 4:
              Le = Q[ve + 1], Te = Q[ve + 2], $e = Q[ve + 3], (Le & 192) === 128 && (Te & 192) === 128 && ($e & 192) === 128 && (Ce = (qe & 15) << 18 | (Le & 63) << 12 | (Te & 63) << 6 | $e & 63, Ce > 65535 && Ce < 1114112 && (Re = Ce));
          }
        }
        Re === null ? (Re = 65533, xe = 1) : Re > 65535 && (Re -= 65536, ae.push(Re >>> 10 & 1023 | 55296), Re = 56320 | Re & 1023), ae.push(Re), ve += xe;
      }
      return H(ae);
    }
    var g = 4096;
    function H(Q) {
      var K = Q.length;
      if (K <= g)
        return String.fromCharCode.apply(String, Q);
      for (var te = "", ae = 0; ae < K; )
        te += String.fromCharCode.apply(
          String,
          Q.slice(ae, ae += g)
        );
      return te;
    }
    function F(Q, K, te) {
      var ae = "";
      te = Math.min(Q.length, te);
      for (var ve = K; ve < te; ++ve)
        ae += String.fromCharCode(Q[ve] & 127);
      return ae;
    }
    function A(Q, K, te) {
      var ae = "";
      te = Math.min(Q.length, te);
      for (var ve = K; ve < te; ++ve)
        ae += String.fromCharCode(Q[ve]);
      return ae;
    }
    function q(Q, K, te) {
      var ae = Q.length;
      (!K || K < 0) && (K = 0), (!te || te < 0 || te > ae) && (te = ae);
      for (var ve = "", qe = K; qe < te; ++qe)
        ve += Pe[Q[qe]];
      return ve;
    }
    function z(Q, K, te) {
      for (var ae = Q.slice(K, te), ve = "", qe = 0; qe < ae.length - 1; qe += 2)
        ve += String.fromCharCode(ae[qe] + ae[qe + 1] * 256);
      return ve;
    }
    M.prototype.slice = function(Q, K) {
      var te = this.length;
      Q = ~~Q, K = K === void 0 ? te : ~~K, Q < 0 ? (Q += te, Q < 0 && (Q = 0)) : Q > te && (Q = te), K < 0 ? (K += te, K < 0 && (K = 0)) : K > te && (K = te), K < Q && (K = Q);
      var ae = this.subarray(Q, K);
      return Object.setPrototypeOf(ae, M.prototype), ae;
    };
    function S(Q, K, te) {
      if (Q % 1 !== 0 || Q < 0)
        throw new RangeError("offset is not uint");
      if (Q + K > te)
        throw new RangeError("Trying to access beyond buffer length");
    }
    M.prototype.readUintLE = M.prototype.readUIntLE = function(Q, K, te) {
      Q = Q >>> 0, K = K >>> 0, te || S(Q, K, this.length);
      for (var ae = this[Q], ve = 1, qe = 0; ++qe < K && (ve *= 256); )
        ae += this[Q + qe] * ve;
      return ae;
    }, M.prototype.readUintBE = M.prototype.readUIntBE = function(Q, K, te) {
      Q = Q >>> 0, K = K >>> 0, te || S(Q, K, this.length);
      for (var ae = this[Q + --K], ve = 1; K > 0 && (ve *= 256); )
        ae += this[Q + --K] * ve;
      return ae;
    }, M.prototype.readUint8 = M.prototype.readUInt8 = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 1, this.length), this[Q];
    }, M.prototype.readUint16LE = M.prototype.readUInt16LE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 2, this.length), this[Q] | this[Q + 1] << 8;
    }, M.prototype.readUint16BE = M.prototype.readUInt16BE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 2, this.length), this[Q] << 8 | this[Q + 1];
    }, M.prototype.readUint32LE = M.prototype.readUInt32LE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 4, this.length), (this[Q] | this[Q + 1] << 8 | this[Q + 2] << 16) + this[Q + 3] * 16777216;
    }, M.prototype.readUint32BE = M.prototype.readUInt32BE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 4, this.length), this[Q] * 16777216 + (this[Q + 1] << 16 | this[Q + 2] << 8 | this[Q + 3]);
    }, M.prototype.readIntLE = function(Q, K, te) {
      Q = Q >>> 0, K = K >>> 0, te || S(Q, K, this.length);
      for (var ae = this[Q], ve = 1, qe = 0; ++qe < K && (ve *= 256); )
        ae += this[Q + qe] * ve;
      return ve *= 128, ae >= ve && (ae -= Math.pow(2, 8 * K)), ae;
    }, M.prototype.readIntBE = function(Q, K, te) {
      Q = Q >>> 0, K = K >>> 0, te || S(Q, K, this.length);
      for (var ae = K, ve = 1, qe = this[Q + --ae]; ae > 0 && (ve *= 256); )
        qe += this[Q + --ae] * ve;
      return ve *= 128, qe >= ve && (qe -= Math.pow(2, 8 * K)), qe;
    }, M.prototype.readInt8 = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 1, this.length), this[Q] & 128 ? (255 - this[Q] + 1) * -1 : this[Q];
    }, M.prototype.readInt16LE = function(Q, K) {
      Q = Q >>> 0, K || S(Q, 2, this.length);
      var te = this[Q] | this[Q + 1] << 8;
      return te & 32768 ? te | 4294901760 : te;
    }, M.prototype.readInt16BE = function(Q, K) {
      Q = Q >>> 0, K || S(Q, 2, this.length);
      var te = this[Q + 1] | this[Q] << 8;
      return te & 32768 ? te | 4294901760 : te;
    }, M.prototype.readInt32LE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 4, this.length), this[Q] | this[Q + 1] << 8 | this[Q + 2] << 16 | this[Q + 3] << 24;
    }, M.prototype.readInt32BE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 4, this.length), this[Q] << 24 | this[Q + 1] << 16 | this[Q + 2] << 8 | this[Q + 3];
    }, M.prototype.readFloatLE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 4, this.length), U.read(this, Q, !0, 23, 4);
    }, M.prototype.readFloatBE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 4, this.length), U.read(this, Q, !1, 23, 4);
    }, M.prototype.readDoubleLE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 8, this.length), U.read(this, Q, !0, 52, 8);
    }, M.prototype.readDoubleBE = function(Q, K) {
      return Q = Q >>> 0, K || S(Q, 8, this.length), U.read(this, Q, !1, 52, 8);
    };
    function J(Q, K, te, ae, ve, qe) {
      if (!M.isBuffer(Q))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (K > ve || K < qe)
        throw new RangeError('"value" argument is out of bounds');
      if (te + ae > Q.length)
        throw new RangeError("Index out of range");
    }
    M.prototype.writeUintLE = M.prototype.writeUIntLE = function(Q, K, te, ae) {
      if (Q = +Q, K = K >>> 0, te = te >>> 0, !ae) {
        var ve = Math.pow(2, 8 * te) - 1;
        J(this, Q, K, te, ve, 0);
      }
      var qe = 1, Re = 0;
      for (this[K] = Q & 255; ++Re < te && (qe *= 256); )
        this[K + Re] = Q / qe & 255;
      return K + te;
    }, M.prototype.writeUintBE = M.prototype.writeUIntBE = function(Q, K, te, ae) {
      if (Q = +Q, K = K >>> 0, te = te >>> 0, !ae) {
        var ve = Math.pow(2, 8 * te) - 1;
        J(this, Q, K, te, ve, 0);
      }
      var qe = te - 1, Re = 1;
      for (this[K + qe] = Q & 255; --qe >= 0 && (Re *= 256); )
        this[K + qe] = Q / Re & 255;
      return K + te;
    }, M.prototype.writeUint8 = M.prototype.writeUInt8 = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 1, 255, 0), this[K] = Q & 255, K + 1;
    }, M.prototype.writeUint16LE = M.prototype.writeUInt16LE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 2, 65535, 0), this[K] = Q & 255, this[K + 1] = Q >>> 8, K + 2;
    }, M.prototype.writeUint16BE = M.prototype.writeUInt16BE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 2, 65535, 0), this[K] = Q >>> 8, this[K + 1] = Q & 255, K + 2;
    }, M.prototype.writeUint32LE = M.prototype.writeUInt32LE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 4, 4294967295, 0), this[K + 3] = Q >>> 24, this[K + 2] = Q >>> 16, this[K + 1] = Q >>> 8, this[K] = Q & 255, K + 4;
    }, M.prototype.writeUint32BE = M.prototype.writeUInt32BE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 4, 4294967295, 0), this[K] = Q >>> 24, this[K + 1] = Q >>> 16, this[K + 2] = Q >>> 8, this[K + 3] = Q & 255, K + 4;
    }, M.prototype.writeIntLE = function(Q, K, te, ae) {
      if (Q = +Q, K = K >>> 0, !ae) {
        var ve = Math.pow(2, 8 * te - 1);
        J(this, Q, K, te, ve - 1, -ve);
      }
      var qe = 0, Re = 1, xe = 0;
      for (this[K] = Q & 255; ++qe < te && (Re *= 256); )
        Q < 0 && xe === 0 && this[K + qe - 1] !== 0 && (xe = 1), this[K + qe] = (Q / Re >> 0) - xe & 255;
      return K + te;
    }, M.prototype.writeIntBE = function(Q, K, te, ae) {
      if (Q = +Q, K = K >>> 0, !ae) {
        var ve = Math.pow(2, 8 * te - 1);
        J(this, Q, K, te, ve - 1, -ve);
      }
      var qe = te - 1, Re = 1, xe = 0;
      for (this[K + qe] = Q & 255; --qe >= 0 && (Re *= 256); )
        Q < 0 && xe === 0 && this[K + qe + 1] !== 0 && (xe = 1), this[K + qe] = (Q / Re >> 0) - xe & 255;
      return K + te;
    }, M.prototype.writeInt8 = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 1, 127, -128), Q < 0 && (Q = 255 + Q + 1), this[K] = Q & 255, K + 1;
    }, M.prototype.writeInt16LE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 2, 32767, -32768), this[K] = Q & 255, this[K + 1] = Q >>> 8, K + 2;
    }, M.prototype.writeInt16BE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 2, 32767, -32768), this[K] = Q >>> 8, this[K + 1] = Q & 255, K + 2;
    }, M.prototype.writeInt32LE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 4, 2147483647, -2147483648), this[K] = Q & 255, this[K + 1] = Q >>> 8, this[K + 2] = Q >>> 16, this[K + 3] = Q >>> 24, K + 4;
    }, M.prototype.writeInt32BE = function(Q, K, te) {
      return Q = +Q, K = K >>> 0, te || J(this, Q, K, 4, 2147483647, -2147483648), Q < 0 && (Q = 4294967295 + Q + 1), this[K] = Q >>> 24, this[K + 1] = Q >>> 16, this[K + 2] = Q >>> 8, this[K + 3] = Q & 255, K + 4;
    };
    function ce(Q, K, te, ae, ve, qe) {
      if (te + ae > Q.length)
        throw new RangeError("Index out of range");
      if (te < 0)
        throw new RangeError("Index out of range");
    }
    function ye(Q, K, te, ae, ve) {
      return K = +K, te = te >>> 0, ve || ce(Q, K, te, 4), U.write(Q, K, te, ae, 23, 4), te + 4;
    }
    M.prototype.writeFloatLE = function(Q, K, te) {
      return ye(this, Q, K, !0, te);
    }, M.prototype.writeFloatBE = function(Q, K, te) {
      return ye(this, Q, K, !1, te);
    };
    function Me(Q, K, te, ae, ve) {
      return K = +K, te = te >>> 0, ve || ce(Q, K, te, 8), U.write(Q, K, te, ae, 52, 8), te + 8;
    }
    M.prototype.writeDoubleLE = function(Q, K, te) {
      return Me(this, Q, K, !0, te);
    }, M.prototype.writeDoubleBE = function(Q, K, te) {
      return Me(this, Q, K, !1, te);
    }, M.prototype.copy = function(Q, K, te, ae) {
      if (!M.isBuffer(Q))
        throw new TypeError("argument should be a Buffer");
      if (te || (te = 0), !ae && ae !== 0 && (ae = this.length), K >= Q.length && (K = Q.length), K || (K = 0), ae > 0 && ae < te && (ae = te), ae === te || Q.length === 0 || this.length === 0)
        return 0;
      if (K < 0)
        throw new RangeError("targetStart out of bounds");
      if (te < 0 || te >= this.length)
        throw new RangeError("Index out of range");
      if (ae < 0)
        throw new RangeError("sourceEnd out of bounds");
      ae > this.length && (ae = this.length), Q.length - K < ae - te && (ae = Q.length - K + te);
      var ve = ae - te;
      return this === Q && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(K, te, ae) : Uint8Array.prototype.set.call(
        Q,
        this.subarray(te, ae),
        K
      ), ve;
    }, M.prototype.fill = function(Q, K, te, ae) {
      if (typeof Q == "string") {
        if (typeof K == "string" ? (ae = K, K = 0, te = this.length) : typeof te == "string" && (ae = te, te = this.length), ae !== void 0 && typeof ae != "string")
          throw new TypeError("encoding must be a string");
        if (typeof ae == "string" && !M.isEncoding(ae))
          throw new TypeError("Unknown encoding: " + ae);
        if (Q.length === 1) {
          var ve = Q.charCodeAt(0);
          (ae === "utf8" && ve < 128 || ae === "latin1") && (Q = ve);
        }
      } else
        typeof Q == "number" ? Q = Q & 255 : typeof Q == "boolean" && (Q = Number(Q));
      if (K < 0 || this.length < K || this.length < te)
        throw new RangeError("Out of range index");
      if (te <= K)
        return this;
      K = K >>> 0, te = te === void 0 ? this.length : te >>> 0, Q || (Q = 0);
      var qe;
      if (typeof Q == "number")
        for (qe = K; qe < te; ++qe)
          this[qe] = Q;
      else {
        var Re = M.isBuffer(Q) ? Q : M.from(Q, ae), xe = Re.length;
        if (xe === 0)
          throw new TypeError('The value "' + Q + '" is invalid for argument "value"');
        for (qe = 0; qe < te - K; ++qe)
          this[qe + K] = Re[qe % xe];
      }
      return this;
    };
    var me = /[^+/0-9A-Za-z-_]/g;
    function ue(Q) {
      if (Q = Q.split("=")[0], Q = Q.trim().replace(me, ""), Q.length < 2)
        return "";
      for (; Q.length % 4 !== 0; )
        Q = Q + "=";
      return Q;
    }
    function fe(Q, K) {
      K = K || 1 / 0;
      for (var te, ae = Q.length, ve = null, qe = [], Re = 0; Re < ae; ++Re) {
        if (te = Q.charCodeAt(Re), te > 55295 && te < 57344) {
          if (!ve) {
            if (te > 56319) {
              (K -= 3) > -1 && qe.push(239, 191, 189);
              continue;
            } else if (Re + 1 === ae) {
              (K -= 3) > -1 && qe.push(239, 191, 189);
              continue;
            }
            ve = te;
            continue;
          }
          if (te < 56320) {
            (K -= 3) > -1 && qe.push(239, 191, 189), ve = te;
            continue;
          }
          te = (ve - 55296 << 10 | te - 56320) + 65536;
        } else
          ve && (K -= 3) > -1 && qe.push(239, 191, 189);
        if (ve = null, te < 128) {
          if ((K -= 1) < 0)
            break;
          qe.push(te);
        } else if (te < 2048) {
          if ((K -= 2) < 0)
            break;
          qe.push(
            te >> 6 | 192,
            te & 63 | 128
          );
        } else if (te < 65536) {
          if ((K -= 3) < 0)
            break;
          qe.push(
            te >> 12 | 224,
            te >> 6 & 63 | 128,
            te & 63 | 128
          );
        } else if (te < 1114112) {
          if ((K -= 4) < 0)
            break;
          qe.push(
            te >> 18 | 240,
            te >> 12 & 63 | 128,
            te >> 6 & 63 | 128,
            te & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return qe;
    }
    function Ae(Q) {
      for (var K = [], te = 0; te < Q.length; ++te)
        K.push(Q.charCodeAt(te) & 255);
      return K;
    }
    function Be(Q, K) {
      for (var te, ae, ve, qe = [], Re = 0; Re < Q.length && !((K -= 2) < 0); ++Re)
        te = Q.charCodeAt(Re), ae = te >> 8, ve = te % 256, qe.push(ve), qe.push(ae);
      return qe;
    }
    function pe(Q) {
      return h.toByteArray(ue(Q));
    }
    function ge(Q, K, te, ae) {
      for (var ve = 0; ve < ae && !(ve + te >= K.length || ve >= Q.length); ++ve)
        K[ve + te] = Q[ve];
      return ve;
    }
    function Ee(Q, K) {
      return Q instanceof K || Q != null && Q.constructor != null && Q.constructor.name != null && Q.constructor.name === K.name;
    }
    function Ie(Q) {
      return Q !== Q;
    }
    var Pe = function() {
      for (var Q = "0123456789abcdef", K = new Array(256), te = 0; te < 16; ++te)
        for (var ae = te * 16, ve = 0; ve < 16; ++ve)
          K[ae + ve] = Q[te] + Q[ve];
      return K;
    }();
  }(buffer$1)), buffer$1;
}
var bufferExports = requireBuffer$1(), browser$c = { exports: {} }, process = browser$c.exports = {}, cachedSetTimeout, cachedClearTimeout;
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? cachedSetTimeout = setTimeout : cachedSetTimeout = defaultSetTimout;
  } catch {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    typeof clearTimeout == "function" ? cachedClearTimeout = clearTimeout : cachedClearTimeout = defaultClearTimeout;
  } catch {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout($) {
  if (cachedSetTimeout === setTimeout)
    return setTimeout($, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout($, 0);
  try {
    return cachedSetTimeout($, 0);
  } catch {
    try {
      return cachedSetTimeout.call(null, $, 0);
    } catch {
      return cachedSetTimeout.call(this, $, 0);
    }
  }
}
function runClearTimeout($) {
  if (cachedClearTimeout === clearTimeout)
    return clearTimeout($);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout($);
  try {
    return cachedClearTimeout($);
  } catch {
    try {
      return cachedClearTimeout.call(null, $);
    } catch {
      return cachedClearTimeout.call(this, $);
    }
  }
}
var queue = [], draining = !1, currentQueue, queueIndex = -1;
function cleanUpNextTick() {
  !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
}
function drainQueue() {
  if (!draining) {
    var $ = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var h = queue.length; h; ) {
      for (currentQueue = queue, queue = []; ++queueIndex < h; )
        currentQueue && currentQueue[queueIndex].run();
      queueIndex = -1, h = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout($);
  }
}
process.nextTick = function($) {
  var h = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var U = 1; U < arguments.length; U++)
      h[U - 1] = arguments[U];
  queue.push(new Item($, h)), queue.length === 1 && !draining && runTimeout(drainQueue);
};
function Item($, h) {
  this.fun = $, this.array = h;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = !0;
process.env = {};
process.argv = [];
process.version = "";
process.versions = {};
function noop() {
}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function($) {
  return [];
};
process.binding = function($) {
  throw new Error("process.binding is not supported");
};
process.cwd = function() {
  return "/";
};
process.chdir = function($) {
  throw new Error("process.chdir is not supported");
};
process.umask = function() {
  return 0;
};
var browserExports = browser$c.exports;
const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
(function($) {
  function h() {
    var B = this || self;
    return delete $.prototype.__magic__, B;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return h();
  $.defineProperty($.prototype, "__magic__", {
    configurable: !0,
    get: h
  });
  var U = __magic__;
  return U;
})(Object);
var eventemitter2 = { exports: {} };
(function($, h) {
  (function(U) {
    var B = Object.hasOwnProperty, V = Array.isArray ? Array.isArray : function(A) {
      return Object.prototype.toString.call(A) === "[object Array]";
    }, t = 10, O = typeof process$1 == "object" && typeof process$1.nextTick == "function", M = typeof Symbol == "function", D = typeof Reflect == "object", I = typeof setImmediate == "function", P = I ? setImmediate : setTimeout, Y = M ? D && typeof Reflect.ownKeys == "function" ? Reflect.ownKeys : function(A) {
      var q = Object.getOwnPropertyNames(A);
      return q.push.apply(q, Object.getOwnPropertySymbols(A)), q;
    } : Object.keys;
    function X() {
      this._events = {}, this._conf && ee.call(this, this._conf);
    }
    function ee(A) {
      A && (this._conf = A, A.delimiter && (this.delimiter = A.delimiter), A.maxListeners !== U && (this._maxListeners = A.maxListeners), A.wildcard && (this.wildcard = A.wildcard), A.newListener && (this._newListener = A.newListener), A.removeListener && (this._removeListener = A.removeListener), A.verboseMemoryLeak && (this.verboseMemoryLeak = A.verboseMemoryLeak), A.ignoreErrors && (this.ignoreErrors = A.ignoreErrors), this.wildcard && (this.listenerTree = {}));
    }
    function re(A, q) {
      var z = "(node) warning: possible EventEmitter memory leak detected. " + A + " listeners added. Use emitter.setMaxListeners() to increase limit.";
      if (this.verboseMemoryLeak && (z += " Event name: " + q + "."), typeof process$1 < "u" && process$1.emitWarning) {
        var S = new Error(z);
        S.name = "MaxListenersExceededWarning", S.emitter = this, S.count = A, process$1.emitWarning(S);
      } else
        console.error(z), console.trace && console.trace();
    }
    var ie = function(A, q, z) {
      var S = arguments.length;
      switch (S) {
        case 0:
          return [];
        case 1:
          return [A];
        case 2:
          return [A, q];
        case 3:
          return [A, q, z];
        default:
          for (var J = new Array(S); S--; )
            J[S] = arguments[S];
          return J;
      }
    };
    function ne(A, q) {
      for (var z = {}, S, J = A.length, ce = q ? q.length : 0, ye = 0; ye < J; ye++)
        S = A[ye], z[S] = ye < ce ? q[ye] : U;
      return z;
    }
    function se(A, q, z) {
      this._emitter = A, this._target = q, this._listeners = {}, this._listenersCount = 0;
      var S, J;
      if ((z.on || z.off) && (S = z.on, J = z.off), q.addEventListener ? (S = q.addEventListener, J = q.removeEventListener) : q.addListener ? (S = q.addListener, J = q.removeListener) : q.on && (S = q.on, J = q.off), !S && !J)
        throw Error("target does not implement any known event API");
      if (typeof S != "function")
        throw TypeError("on method must be a function");
      if (typeof J != "function")
        throw TypeError("off method must be a function");
      this._on = S, this._off = J;
      var ce = A._observers;
      ce ? ce.push(this) : A._observers = [this];
    }
    Object.assign(se.prototype, {
      subscribe: function(A, q, z) {
        var S = this, J = this._target, ce = this._emitter, ye = this._listeners, Me = function() {
          var me = ie.apply(null, arguments), ue = {
            data: me,
            name: q,
            original: A
          };
          if (z) {
            var fe = z.call(J, ue);
            fe !== !1 && ce.emit.apply(ce, [ue.name].concat(me));
            return;
          }
          ce.emit.apply(ce, [q].concat(me));
        };
        if (ye[A])
          throw Error("Event '" + A + "' is already listening");
        this._listenersCount++, ce._newListener && ce._removeListener && !S._onNewListener ? (this._onNewListener = function(me) {
          me === q && ye[A] === null && (ye[A] = Me, S._on.call(J, A, Me));
        }, ce.on("newListener", this._onNewListener), this._onRemoveListener = function(me) {
          me === q && !ce.hasListeners(me) && ye[A] && (ye[A] = null, S._off.call(J, A, Me));
        }, ye[A] = null, ce.on("removeListener", this._onRemoveListener)) : (ye[A] = Me, S._on.call(J, A, Me));
      },
      unsubscribe: function(A) {
        var q = this, z = this._listeners, S = this._emitter, J, ce, ye = this._off, Me = this._target, me;
        if (A && typeof A != "string")
          throw TypeError("event must be a string");
        function ue() {
          q._onNewListener && (S.off("newListener", q._onNewListener), S.off("removeListener", q._onRemoveListener), q._onNewListener = null, q._onRemoveListener = null);
          var fe = he.call(S, q);
          S._observers.splice(fe, 1);
        }
        if (A) {
          if (J = z[A], !J)
            return;
          ye.call(Me, A, J), delete z[A], --this._listenersCount || ue();
        } else {
          for (ce = Y(z), me = ce.length; me-- > 0; )
            A = ce[me], ye.call(Me, A, z[A]);
          this._listeners = {}, this._listenersCount = 0, ue();
        }
      }
    });
    function oe(A, q, z, S) {
      var J = Object.assign({}, q);
      if (!A)
        return J;
      if (typeof A != "object")
        throw TypeError("options must be an object");
      var ce = Object.keys(A), ye = ce.length, Me, me, ue;
      function fe(Be) {
        throw Error('Invalid "' + Me + '" option value' + (Be ? ". Reason: " + Be : ""));
      }
      for (var Ae = 0; Ae < ye; Ae++) {
        if (Me = ce[Ae], !S && !B.call(q, Me))
          throw Error('Unknown "' + Me + '" option');
        me = A[Me], me !== U && (ue = z[Me], J[Me] = ue ? ue(me, fe) : me);
      }
      return J;
    }
    function be(A, q) {
      return (typeof A != "function" || !A.hasOwnProperty("prototype")) && q("value must be a constructor"), A;
    }
    function de(A) {
      var q = "value must be type of " + A.join("|"), z = A.length, S = A[0], J = A[1];
      return z === 1 ? function(ce, ye) {
        if (typeof ce === S)
          return ce;
        ye(q);
      } : z === 2 ? function(ce, ye) {
        var Me = typeof ce;
        if (Me === S || Me === J)
          return ce;
        ye(q);
      } : function(ce, ye) {
        for (var Me = typeof ce, me = z; me-- > 0; )
          if (Me === A[me])
            return ce;
        ye(q);
      };
    }
    var we = de(["function"]), Se = de(["object", "function"]);
    function ke(A, q, z) {
      var S, J, ce = 0, ye, Me = new A(function(me, ue, fe) {
        z = oe(z, {
          timeout: 0,
          overload: !1
        }, {
          timeout: function(ge, Ee) {
            return ge *= 1, (typeof ge != "number" || ge < 0 || !Number.isFinite(ge)) && Ee("timeout must be a positive number"), ge;
          }
        }), S = !z.overload && typeof A.prototype.cancel == "function" && typeof fe == "function";
        function Ae() {
          J && (J = null), ce && (clearTimeout(ce), ce = 0);
        }
        var Be = function(ge) {
          Ae(), me(ge);
        }, pe = function(ge) {
          Ae(), ue(ge);
        };
        S ? q(Be, pe, fe) : (J = [function(ge) {
          pe(ge || Error("canceled"));
        }], q(Be, pe, function(ge) {
          if (ye)
            throw Error("Unable to subscribe on cancel event asynchronously");
          if (typeof ge != "function")
            throw TypeError("onCancel callback must be a function");
          J.push(ge);
        }), ye = !0), z.timeout > 0 && (ce = setTimeout(function() {
          var ge = Error("timeout");
          ge.code = "ETIMEDOUT", ce = 0, Me.cancel(ge), ue(ge);
        }, z.timeout));
      });
      return S || (Me.cancel = function(me) {
        if (J) {
          for (var ue = J.length, fe = 1; fe < ue; fe++)
            J[fe](me);
          J[0](me), J = null;
        }
      }), Me;
    }
    function he(A) {
      var q = this._observers;
      if (!q)
        return -1;
      for (var z = q.length, S = 0; S < z; S++)
        if (q[S]._target === A)
          return S;
      return -1;
    }
    function le(A, q, z, S, J) {
      if (!z)
        return null;
      if (S === 0) {
        var ce = typeof q;
        if (ce === "string") {
          var ye, Me, me = 0, ue = 0, fe = this.delimiter, Ae = fe.length;
          if ((Me = q.indexOf(fe)) !== -1) {
            ye = new Array(5);
            do
              ye[me++] = q.slice(ue, Me), ue = Me + Ae;
            while ((Me = q.indexOf(fe, ue)) !== -1);
            ye[me++] = q.slice(ue), q = ye, J = me;
          } else
            q = [q], J = 1;
        } else
          ce === "object" ? J = q.length : (q = [q], J = 1);
      }
      var Be = null, pe, ge, Ee, Ie, Pe, Q = q[S], K = q[S + 1], te, ae;
      if (S === J)
        z._listeners && (typeof z._listeners == "function" ? (A && A.push(z._listeners), Be = [z]) : (A && A.push.apply(A, z._listeners), Be = [z]));
      else if (Q === "*") {
        for (te = Y(z), Me = te.length; Me-- > 0; )
          pe = te[Me], pe !== "_listeners" && (ae = le(A, q, z[pe], S + 1, J), ae && (Be ? Be.push.apply(Be, ae) : Be = ae));
        return Be;
      } else if (Q === "**") {
        for (Pe = S + 1 === J || S + 2 === J && K === "*", Pe && z._listeners && (Be = le(A, q, z, J, J)), te = Y(z), Me = te.length; Me-- > 0; )
          pe = te[Me], pe !== "_listeners" && (pe === "*" || pe === "**" ? (z[pe]._listeners && !Pe && (ae = le(A, q, z[pe], J, J), ae && (Be ? Be.push.apply(Be, ae) : Be = ae)), ae = le(A, q, z[pe], S, J)) : pe === K ? ae = le(A, q, z[pe], S + 2, J) : ae = le(A, q, z[pe], S, J), ae && (Be ? Be.push.apply(Be, ae) : Be = ae));
        return Be;
      } else
        z[Q] && (Be = le(A, q, z[Q], S + 1, J));
      if (ge = z["*"], ge && le(A, q, ge, S + 1, J), Ee = z["**"], Ee)
        if (S < J)
          for (Ee._listeners && le(A, q, Ee, J, J), te = Y(Ee), Me = te.length; Me-- > 0; )
            pe = te[Me], pe !== "_listeners" && (pe === K ? le(A, q, Ee[pe], S + 2, J) : pe === Q ? le(A, q, Ee[pe], S + 1, J) : (Ie = {}, Ie[pe] = Ee[pe], le(A, q, { "**": Ie }, S + 1, J)));
        else
          Ee._listeners ? le(A, q, Ee, J, J) : Ee["*"] && Ee["*"]._listeners && le(A, q, Ee["*"], J, J);
      return Be;
    }
    function _e(A, q, z) {
      var S = 0, J = 0, ce, ye = this.delimiter, Me = ye.length, me;
      if (typeof A == "string")
        if ((ce = A.indexOf(ye)) !== -1) {
          me = new Array(5);
          do
            me[S++] = A.slice(J, ce), J = ce + Me;
          while ((ce = A.indexOf(ye, J)) !== -1);
          me[S++] = A.slice(J);
        } else
          me = [A], S = 1;
      else
        me = A, S = A.length;
      if (S > 1) {
        for (ce = 0; ce + 1 < S; ce++)
          if (me[ce] === "**" && me[ce + 1] === "**")
            return;
      }
      var ue = this.listenerTree, fe;
      for (ce = 0; ce < S; ce++)
        if (fe = me[ce], ue = ue[fe] || (ue[fe] = {}), ce === S - 1)
          return ue._listeners ? (typeof ue._listeners == "function" && (ue._listeners = [ue._listeners]), z ? ue._listeners.unshift(q) : ue._listeners.push(q), !ue._listeners.warned && this._maxListeners > 0 && ue._listeners.length > this._maxListeners && (ue._listeners.warned = !0, re.call(this, ue._listeners.length, fe))) : ue._listeners = q, !0;
      return !0;
    }
    function G(A, q, z, S) {
      for (var J = Y(A), ce = J.length, ye, Me, me, ue = A._listeners, fe; ce-- > 0; )
        Me = J[ce], ye = A[Me], Me === "_listeners" ? me = z : me = z ? z.concat(Me) : [Me], fe = S || typeof Me == "symbol", ue && q.push(fe ? me : me.join(this.delimiter)), typeof ye == "object" && G.call(this, ye, q, me, fe);
      return q;
    }
    function Z(A) {
      for (var q = Y(A), z = q.length, S, J, ce; z-- > 0; )
        J = q[z], S = A[J], S && (ce = !0, J !== "_listeners" && !Z(S) && delete A[J]);
      return ce;
    }
    function e(A, q, z) {
      this.emitter = A, this.event = q, this.listener = z;
    }
    e.prototype.off = function() {
      return this.emitter.off(this.event, this.listener), this;
    };
    function o(A, q, z) {
      if (z === !0)
        J = !0;
      else if (z === !1)
        S = !0;
      else {
        if (!z || typeof z != "object")
          throw TypeError("options should be an object or true");
        var S = z.async, J = z.promisify, ce = z.nextTick, ye = z.objectify;
      }
      if (S || ce || J) {
        var Me = q, me = q._origin || q;
        if (ce && !O)
          throw Error("process.nextTick is not supported");
        J === U && (J = q.constructor.name === "AsyncFunction"), q = function() {
          var ue = arguments, fe = this, Ae = this.event;
          return J ? ce ? Promise.resolve() : new Promise(function(Be) {
            P(Be);
          }).then(function() {
            return fe.event = Ae, Me.apply(fe, ue);
          }) : (ce ? process$1.nextTick : P)(function() {
            fe.event = Ae, Me.apply(fe, ue);
          });
        }, q._async = !0, q._origin = me;
      }
      return [q, ye ? new e(this, A, q) : this];
    }
    function g(A) {
      this._events = {}, this._newListener = !1, this._removeListener = !1, this.verboseMemoryLeak = !1, ee.call(this, A);
    }
    g.EventEmitter2 = g, g.prototype.listenTo = function(A, q, z) {
      if (typeof A != "object")
        throw TypeError("target musts be an object");
      var S = this;
      z = oe(z, {
        on: U,
        off: U,
        reducers: U
      }, {
        on: we,
        off: we,
        reducers: Se
      });
      function J(ce) {
        if (typeof ce != "object")
          throw TypeError("events must be an object");
        var ye = z.reducers, Me = he.call(S, A), me;
        Me === -1 ? me = new se(S, A, z) : me = S._observers[Me];
        for (var ue = Y(ce), fe = ue.length, Ae, Be = typeof ye == "function", pe = 0; pe < fe; pe++)
          Ae = ue[pe], me.subscribe(
            Ae,
            ce[Ae] || Ae,
            Be ? ye : ye && ye[Ae]
          );
      }
      return V(q) ? J(ne(q)) : J(typeof q == "string" ? ne(q.split(/\s+/)) : q), this;
    }, g.prototype.stopListeningTo = function(A, q) {
      var z = this._observers;
      if (!z)
        return !1;
      var S = z.length, J, ce = !1;
      if (A && typeof A != "object")
        throw TypeError("target should be an object");
      for (; S-- > 0; )
        J = z[S], (!A || J._target === A) && (J.unsubscribe(q), ce = !0);
      return ce;
    }, g.prototype.delimiter = ".", g.prototype.setMaxListeners = function(A) {
      A !== U && (this._maxListeners = A, this._conf || (this._conf = {}), this._conf.maxListeners = A);
    }, g.prototype.getMaxListeners = function() {
      return this._maxListeners;
    }, g.prototype.event = "", g.prototype.once = function(A, q, z) {
      return this._once(A, q, !1, z);
    }, g.prototype.prependOnceListener = function(A, q, z) {
      return this._once(A, q, !0, z);
    }, g.prototype._once = function(A, q, z, S) {
      return this._many(A, 1, q, z, S);
    }, g.prototype.many = function(A, q, z, S) {
      return this._many(A, q, z, !1, S);
    }, g.prototype.prependMany = function(A, q, z, S) {
      return this._many(A, q, z, !0, S);
    }, g.prototype._many = function(A, q, z, S, J) {
      var ce = this;
      if (typeof z != "function")
        throw new Error("many only accepts instances of Function");
      function ye() {
        return --q === 0 && ce.off(A, ye), z.apply(this, arguments);
      }
      return ye._origin = z, this._on(A, ye, S, J);
    }, g.prototype.emit = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || X.call(this);
      var A = arguments[0], q, z = this.wildcard, S, J, ce, ye, Me;
      if (A === "newListener" && !this._newListener && !this._events.newListener)
        return !1;
      if (z && (q = A, A !== "newListener" && A !== "removeListener" && typeof A == "object")) {
        if (J = A.length, M) {
          for (ce = 0; ce < J; ce++)
            if (typeof A[ce] == "symbol") {
              Me = !0;
              break;
            }
        }
        Me || (A = A.join(this.delimiter));
      }
      var me = arguments.length, ue;
      if (this._all && this._all.length)
        for (ue = this._all.slice(), ce = 0, J = ue.length; ce < J; ce++)
          switch (this.event = A, me) {
            case 1:
              ue[ce].call(this, A);
              break;
            case 2:
              ue[ce].call(this, A, arguments[1]);
              break;
            case 3:
              ue[ce].call(this, A, arguments[1], arguments[2]);
              break;
            default:
              ue[ce].apply(this, arguments);
          }
      if (z)
        ue = [], le.call(this, ue, q, this.listenerTree, 0, J);
      else if (ue = this._events[A], typeof ue == "function") {
        switch (this.event = A, me) {
          case 1:
            ue.call(this);
            break;
          case 2:
            ue.call(this, arguments[1]);
            break;
          case 3:
            ue.call(this, arguments[1], arguments[2]);
            break;
          default:
            for (S = new Array(me - 1), ye = 1; ye < me; ye++)
              S[ye - 1] = arguments[ye];
            ue.apply(this, S);
        }
        return !0;
      } else
        ue && (ue = ue.slice());
      if (ue && ue.length) {
        if (me > 3)
          for (S = new Array(me - 1), ye = 1; ye < me; ye++)
            S[ye - 1] = arguments[ye];
        for (ce = 0, J = ue.length; ce < J; ce++)
          switch (this.event = A, me) {
            case 1:
              ue[ce].call(this);
              break;
            case 2:
              ue[ce].call(this, arguments[1]);
              break;
            case 3:
              ue[ce].call(this, arguments[1], arguments[2]);
              break;
            default:
              ue[ce].apply(this, S);
          }
        return !0;
      } else if (!this.ignoreErrors && !this._all && A === "error")
        throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
      return !!this._all;
    }, g.prototype.emitAsync = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || X.call(this);
      var A = arguments[0], q = this.wildcard, z, S, J, ce, ye, Me;
      if (A === "newListener" && !this._newListener && !this._events.newListener)
        return Promise.resolve([!1]);
      if (q && (z = A, A !== "newListener" && A !== "removeListener" && typeof A == "object")) {
        if (ce = A.length, M) {
          for (ye = 0; ye < ce; ye++)
            if (typeof A[ye] == "symbol") {
              S = !0;
              break;
            }
        }
        S || (A = A.join(this.delimiter));
      }
      var me = [], ue = arguments.length, fe;
      if (this._all)
        for (ye = 0, ce = this._all.length; ye < ce; ye++)
          switch (this.event = A, ue) {
            case 1:
              me.push(this._all[ye].call(this, A));
              break;
            case 2:
              me.push(this._all[ye].call(this, A, arguments[1]));
              break;
            case 3:
              me.push(this._all[ye].call(this, A, arguments[1], arguments[2]));
              break;
            default:
              me.push(this._all[ye].apply(this, arguments));
          }
      if (q ? (fe = [], le.call(this, fe, z, this.listenerTree, 0)) : fe = this._events[A], typeof fe == "function")
        switch (this.event = A, ue) {
          case 1:
            me.push(fe.call(this));
            break;
          case 2:
            me.push(fe.call(this, arguments[1]));
            break;
          case 3:
            me.push(fe.call(this, arguments[1], arguments[2]));
            break;
          default:
            for (J = new Array(ue - 1), Me = 1; Me < ue; Me++)
              J[Me - 1] = arguments[Me];
            me.push(fe.apply(this, J));
        }
      else if (fe && fe.length) {
        if (fe = fe.slice(), ue > 3)
          for (J = new Array(ue - 1), Me = 1; Me < ue; Me++)
            J[Me - 1] = arguments[Me];
        for (ye = 0, ce = fe.length; ye < ce; ye++)
          switch (this.event = A, ue) {
            case 1:
              me.push(fe[ye].call(this));
              break;
            case 2:
              me.push(fe[ye].call(this, arguments[1]));
              break;
            case 3:
              me.push(fe[ye].call(this, arguments[1], arguments[2]));
              break;
            default:
              me.push(fe[ye].apply(this, J));
          }
      } else if (!this.ignoreErrors && !this._all && A === "error")
        return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
      return Promise.all(me);
    }, g.prototype.on = function(A, q, z) {
      return this._on(A, q, !1, z);
    }, g.prototype.prependListener = function(A, q, z) {
      return this._on(A, q, !0, z);
    }, g.prototype.onAny = function(A) {
      return this._onAny(A, !1);
    }, g.prototype.prependAny = function(A) {
      return this._onAny(A, !0);
    }, g.prototype.addListener = g.prototype.on, g.prototype._onAny = function(A, q) {
      if (typeof A != "function")
        throw new Error("onAny only accepts instances of Function");
      return this._all || (this._all = []), q ? this._all.unshift(A) : this._all.push(A), this;
    }, g.prototype._on = function(A, q, z, S) {
      if (typeof A == "function")
        return this._onAny(A, q), this;
      if (typeof q != "function")
        throw new Error("on only accepts instances of Function");
      this._events || X.call(this);
      var J = this, ce;
      return S !== U && (ce = o.call(this, A, q, S), q = ce[0], J = ce[1]), this._newListener && this.emit("newListener", A, q), this.wildcard ? (_e.call(this, A, q, z), J) : (this._events[A] ? (typeof this._events[A] == "function" && (this._events[A] = [this._events[A]]), z ? this._events[A].unshift(q) : this._events[A].push(q), !this._events[A].warned && this._maxListeners > 0 && this._events[A].length > this._maxListeners && (this._events[A].warned = !0, re.call(this, this._events[A].length, A))) : this._events[A] = q, J);
    }, g.prototype.off = function(A, q) {
      if (typeof q != "function")
        throw new Error("removeListener only takes instances of Function");
      var z, S = [];
      if (this.wildcard) {
        var J = typeof A == "string" ? A.split(this.delimiter) : A.slice();
        if (S = le.call(this, null, J, this.listenerTree, 0), !S)
          return this;
      } else {
        if (!this._events[A])
          return this;
        z = this._events[A], S.push({ _listeners: z });
      }
      for (var ce = 0; ce < S.length; ce++) {
        var ye = S[ce];
        if (z = ye._listeners, V(z)) {
          for (var Me = -1, me = 0, ue = z.length; me < ue; me++)
            if (z[me] === q || z[me].listener && z[me].listener === q || z[me]._origin && z[me]._origin === q) {
              Me = me;
              break;
            }
          if (Me < 0)
            continue;
          return this.wildcard ? ye._listeners.splice(Me, 1) : this._events[A].splice(Me, 1), z.length === 0 && (this.wildcard ? delete ye._listeners : delete this._events[A]), this._removeListener && this.emit("removeListener", A, q), this;
        } else
          (z === q || z.listener && z.listener === q || z._origin && z._origin === q) && (this.wildcard ? delete ye._listeners : delete this._events[A], this._removeListener && this.emit("removeListener", A, q));
      }
      return this.listenerTree && Z(this.listenerTree), this;
    }, g.prototype.offAny = function(A) {
      var q = 0, z = 0, S;
      if (A && this._all && this._all.length > 0) {
        for (S = this._all, q = 0, z = S.length; q < z; q++)
          if (A === S[q])
            return S.splice(q, 1), this._removeListener && this.emit("removeListenerAny", A), this;
      } else {
        if (S = this._all, this._removeListener)
          for (q = 0, z = S.length; q < z; q++)
            this.emit("removeListenerAny", S[q]);
        this._all = [];
      }
      return this;
    }, g.prototype.removeListener = g.prototype.off, g.prototype.removeAllListeners = function(A) {
      if (A === U)
        return !this._events || X.call(this), this;
      if (this.wildcard) {
        var q = le.call(this, null, A, this.listenerTree, 0), z, S;
        if (!q)
          return this;
        for (S = 0; S < q.length; S++)
          z = q[S], z._listeners = null;
        this.listenerTree && Z(this.listenerTree);
      } else
        this._events && (this._events[A] = null);
      return this;
    }, g.prototype.listeners = function(A) {
      var q = this._events, z, S, J, ce, ye;
      if (A === U) {
        if (this.wildcard)
          throw Error("event name required for wildcard emitter");
        if (!q)
          return [];
        for (z = Y(q), ce = z.length, J = []; ce-- > 0; )
          S = q[z[ce]], typeof S == "function" ? J.push(S) : J.push.apply(J, S);
        return J;
      } else {
        if (this.wildcard) {
          if (ye = this.listenerTree, !ye)
            return [];
          var Me = [], me = typeof A == "string" ? A.split(this.delimiter) : A.slice();
          return le.call(this, Me, me, ye, 0), Me;
        }
        return q ? (S = q[A], S ? typeof S == "function" ? [S] : S : []) : [];
      }
    }, g.prototype.eventNames = function(A) {
      var q = this._events;
      return this.wildcard ? G.call(this, this.listenerTree, [], null, A) : q ? Y(q) : [];
    }, g.prototype.listenerCount = function(A) {
      return this.listeners(A).length;
    }, g.prototype.hasListeners = function(A) {
      if (this.wildcard) {
        var q = [], z = typeof A == "string" ? A.split(this.delimiter) : A.slice();
        return le.call(this, q, z, this.listenerTree, 0), q.length > 0;
      }
      var S = this._events, J = this._all;
      return !!(J && J.length || S && (A === U ? Y(S).length : S[A]));
    }, g.prototype.listenersAny = function() {
      return this._all ? this._all : [];
    }, g.prototype.waitFor = function(A, q) {
      var z = this, S = typeof q;
      return S === "number" ? q = { timeout: q } : S === "function" && (q = { filter: q }), q = oe(q, {
        timeout: 0,
        filter: U,
        handleError: !1,
        Promise,
        overload: !1
      }, {
        filter: we,
        Promise: be
      }), ke(q.Promise, function(J, ce, ye) {
        function Me() {
          var me = q.filter;
          if (!(me && !me.apply(z, arguments)))
            if (z.off(A, Me), q.handleError) {
              var ue = arguments[0];
              ue ? ce(ue) : J(ie.apply(null, arguments).slice(1));
            } else
              J(ie.apply(null, arguments));
        }
        ye(function() {
          z.off(A, Me);
        }), z._on(A, Me, !1);
      }, {
        timeout: q.timeout,
        overload: q.overload
      });
    };
    function H(A, q, z) {
      z = oe(z, {
        Promise,
        timeout: 0,
        overload: !1
      }, {
        Promise: be
      });
      var S = z.Promise;
      return ke(S, function(J, ce, ye) {
        var Me;
        if (typeof A.addEventListener == "function") {
          Me = function() {
            J(ie.apply(null, arguments));
          }, ye(function() {
            A.removeEventListener(q, Me);
          }), A.addEventListener(
            q,
            Me,
            { once: !0 }
          );
          return;
        }
        var me = function() {
          ue && A.removeListener("error", ue), J(ie.apply(null, arguments));
        }, ue;
        q !== "error" && (ue = function(fe) {
          A.removeListener(q, me), ce(fe);
        }, A.once("error", ue)), ye(function() {
          ue && A.removeListener("error", ue), A.removeListener(q, me);
        }), A.once(q, me);
      }, {
        timeout: z.timeout,
        overload: z.overload
      });
    }
    var F = g.prototype;
    Object.defineProperties(g, {
      defaultMaxListeners: {
        get: function() {
          return F._maxListeners;
        },
        set: function(A) {
          if (typeof A != "number" || A < 0 || Number.isNaN(A))
            throw TypeError("n must be a non-negative number");
          F._maxListeners = A;
        },
        enumerable: !0
      },
      once: {
        value: H,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperties(F, {
      _maxListeners: {
        value: t,
        writable: !0,
        configurable: !0
      },
      _observers: { value: null, writable: !0, configurable: !0 }
    }), typeof U == "function" && U.amd ? U(function() {
      return g;
    }) : $.exports = g;
  })();
})(eventemitter2);
var eventemitter2Exports = eventemitter2.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter2Exports);
class FetchAPI extends EventEmitter {
  constructor(h) {
    super(), this.baseUrl = h;
  }
  async send(h, U) {
    const { url: B, query: V, method: t, data: O, headers: M } = h, [D, I] = O instanceof FormData ? [O, {}] : [
      typeof O != "string" ? JSON.stringify(O) : O,
      {
        "Content-Type": "application/json"
      }
    ], P = this.baseUrl + B, Y = this.getUrlWithParams(P, V), X = await fetch(Y, {
      method: t,
      headers: Object.assign(M || {}, I),
      body: D,
      credentials: h.withCredentials ? "include" : "same-origin"
    }), ee = await X.json(), re = this.convertHeadersToPlainObject(X.headers);
    return new APIResponse({
      data: ee,
      status: X.status,
      headers: re,
      request: h
    });
  }
  getUrlWithParams(h, U) {
    if (!U)
      return h;
    const B = new URL(h);
    return Object.entries(U).forEach(
      ([V, t]) => {
        B.searchParams.append(V, t);
      }
    ), B.toString();
  }
  convertHeadersToPlainObject(h) {
    const U = {};
    for (const B of Object.keys(h))
      U[B] = h.get(B);
    return U;
  }
  // type override 를 위해서 구현 class 에서 메서드들을 재정의 해줘야함..
  addListener(h, U) {
    return super.addListener(h, U);
  }
  on(h, U, B) {
    return super.on(h, U, B);
  }
  prependListener(h, U, B) {
    return super.prependListener(h, U, B);
  }
  once(h, U, B) {
    return super.once(h, U, B);
  }
  emit(h, ...U) {
    return super.emit(h, ...U);
  }
  emitAsync(h, ...U) {
    return super.emitAsync(h, ...U);
  }
}
function commonjsRequire($) {
  throw new Error('Could not dynamically require "' + $ + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bcrypt$1 = { exports: {} }, cryptoBrowserify = {}, browser$b = { exports: {} }, safeBuffer$1 = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer$1;
function requireSafeBuffer$1() {
  return hasRequiredSafeBuffer$1 || (hasRequiredSafeBuffer$1 = 1, function($, h) {
    var U = requireBuffer$1(), B = U.Buffer;
    function V(O, M) {
      for (var D in O)
        M[D] = O[D];
    }
    B.from && B.alloc && B.allocUnsafe && B.allocUnsafeSlow ? $.exports = U : (V(U, h), h.Buffer = t);
    function t(O, M, D) {
      return B(O, M, D);
    }
    t.prototype = Object.create(B.prototype), V(B, t), t.from = function(O, M, D) {
      if (typeof O == "number")
        throw new TypeError("Argument must not be a number");
      return B(O, M, D);
    }, t.alloc = function(O, M, D) {
      if (typeof O != "number")
        throw new TypeError("Argument must be a number");
      var I = B(O);
      return M !== void 0 ? typeof D == "string" ? I.fill(M, D) : I.fill(M) : I.fill(0), I;
    }, t.allocUnsafe = function(O) {
      if (typeof O != "number")
        throw new TypeError("Argument must be a number");
      return B(O);
    }, t.allocUnsafeSlow = function(O) {
      if (typeof O != "number")
        throw new TypeError("Argument must be a number");
      return U.SlowBuffer(O);
    };
  }(safeBuffer$1, safeBuffer$1.exports)), safeBuffer$1.exports;
}
var hasRequiredBrowser$b;
function requireBrowser$b() {
  if (hasRequiredBrowser$b)
    return browser$b.exports;
  hasRequiredBrowser$b = 1;
  var $ = 65536, h = 4294967295;
  function U() {
    throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
  }
  var B = requireSafeBuffer$1().Buffer, V = commonjsGlobal.crypto || commonjsGlobal.msCrypto;
  V && V.getRandomValues ? browser$b.exports = t : browser$b.exports = U;
  function t(O, M) {
    if (O > h)
      throw new RangeError("requested too many random bytes");
    var D = B.allocUnsafe(O);
    if (O > 0)
      if (O > $)
        for (var I = 0; I < O; I += $)
          V.getRandomValues(D.slice(I, I + $));
      else
        V.getRandomValues(D);
    return typeof M == "function" ? process$1.nextTick(function() {
      M(null, D);
    }) : D;
  }
  return browser$b.exports;
}
var inherits_browser = { exports: {} }, hasRequiredInherits_browser;
function requireInherits_browser() {
  return hasRequiredInherits_browser || (hasRequiredInherits_browser = 1, typeof Object.create == "function" ? inherits_browser.exports = function($, h) {
    h && ($.super_ = h, $.prototype = Object.create(h.prototype, {
      constructor: {
        value: $,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : inherits_browser.exports = function($, h) {
    if (h) {
      $.super_ = h;
      var U = function() {
      };
      U.prototype = h.prototype, $.prototype = new U(), $.prototype.constructor = $;
    }
  }), inherits_browser.exports;
}
var readableBrowser$1 = { exports: {} }, events = { exports: {} }, hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents)
    return events.exports;
  hasRequiredEvents = 1;
  var $ = typeof Reflect == "object" ? Reflect : null, h = $ && typeof $.apply == "function" ? $.apply : function(de, we, Se) {
    return Function.prototype.apply.call(de, we, Se);
  }, U;
  $ && typeof $.ownKeys == "function" ? U = $.ownKeys : Object.getOwnPropertySymbols ? U = function(de) {
    return Object.getOwnPropertyNames(de).concat(Object.getOwnPropertySymbols(de));
  } : U = function(de) {
    return Object.getOwnPropertyNames(de);
  };
  function B(de) {
    console && console.warn && console.warn(de);
  }
  var V = Number.isNaN || function(de) {
    return de !== de;
  };
  function t() {
    t.init.call(this);
  }
  events.exports = t, events.exports.once = se, t.EventEmitter = t, t.prototype._events = void 0, t.prototype._eventsCount = 0, t.prototype._maxListeners = void 0;
  var O = 10;
  function M(de) {
    if (typeof de != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof de);
  }
  Object.defineProperty(t, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return O;
    },
    set: function(de) {
      if (typeof de != "number" || de < 0 || V(de))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + de + ".");
      O = de;
    }
  }), t.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, t.prototype.setMaxListeners = function(de) {
    if (typeof de != "number" || de < 0 || V(de))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + de + ".");
    return this._maxListeners = de, this;
  };
  function D(de) {
    return de._maxListeners === void 0 ? t.defaultMaxListeners : de._maxListeners;
  }
  t.prototype.getMaxListeners = function() {
    return D(this);
  }, t.prototype.emit = function(de) {
    for (var we = [], Se = 1; Se < arguments.length; Se++)
      we.push(arguments[Se]);
    var ke = de === "error", he = this._events;
    if (he !== void 0)
      ke = ke && he.error === void 0;
    else if (!ke)
      return !1;
    if (ke) {
      var le;
      if (we.length > 0 && (le = we[0]), le instanceof Error)
        throw le;
      var _e = new Error("Unhandled error." + (le ? " (" + le.message + ")" : ""));
      throw _e.context = le, _e;
    }
    var G = he[de];
    if (G === void 0)
      return !1;
    if (typeof G == "function")
      h(G, this, we);
    else
      for (var Z = G.length, e = re(G, Z), Se = 0; Se < Z; ++Se)
        h(e[Se], this, we);
    return !0;
  };
  function I(de, we, Se, ke) {
    var he, le, _e;
    if (M(Se), le = de._events, le === void 0 ? (le = de._events = /* @__PURE__ */ Object.create(null), de._eventsCount = 0) : (le.newListener !== void 0 && (de.emit(
      "newListener",
      we,
      Se.listener ? Se.listener : Se
    ), le = de._events), _e = le[we]), _e === void 0)
      _e = le[we] = Se, ++de._eventsCount;
    else if (typeof _e == "function" ? _e = le[we] = ke ? [Se, _e] : [_e, Se] : ke ? _e.unshift(Se) : _e.push(Se), he = D(de), he > 0 && _e.length > he && !_e.warned) {
      _e.warned = !0;
      var G = new Error("Possible EventEmitter memory leak detected. " + _e.length + " " + String(we) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      G.name = "MaxListenersExceededWarning", G.emitter = de, G.type = we, G.count = _e.length, B(G);
    }
    return de;
  }
  t.prototype.addListener = function(de, we) {
    return I(this, de, we, !1);
  }, t.prototype.on = t.prototype.addListener, t.prototype.prependListener = function(de, we) {
    return I(this, de, we, !0);
  };
  function P() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function Y(de, we, Se) {
    var ke = { fired: !1, wrapFn: void 0, target: de, type: we, listener: Se }, he = P.bind(ke);
    return he.listener = Se, ke.wrapFn = he, he;
  }
  t.prototype.once = function(de, we) {
    return M(we), this.on(de, Y(this, de, we)), this;
  }, t.prototype.prependOnceListener = function(de, we) {
    return M(we), this.prependListener(de, Y(this, de, we)), this;
  }, t.prototype.removeListener = function(de, we) {
    var Se, ke, he, le, _e;
    if (M(we), ke = this._events, ke === void 0)
      return this;
    if (Se = ke[de], Se === void 0)
      return this;
    if (Se === we || Se.listener === we)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete ke[de], ke.removeListener && this.emit("removeListener", de, Se.listener || we));
    else if (typeof Se != "function") {
      for (he = -1, le = Se.length - 1; le >= 0; le--)
        if (Se[le] === we || Se[le].listener === we) {
          _e = Se[le].listener, he = le;
          break;
        }
      if (he < 0)
        return this;
      he === 0 ? Se.shift() : ie(Se, he), Se.length === 1 && (ke[de] = Se[0]), ke.removeListener !== void 0 && this.emit("removeListener", de, _e || we);
    }
    return this;
  }, t.prototype.off = t.prototype.removeListener, t.prototype.removeAllListeners = function(de) {
    var we, Se, ke;
    if (Se = this._events, Se === void 0)
      return this;
    if (Se.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : Se[de] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete Se[de]), this;
    if (arguments.length === 0) {
      var he = Object.keys(Se), le;
      for (ke = 0; ke < he.length; ++ke)
        le = he[ke], le !== "removeListener" && this.removeAllListeners(le);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (we = Se[de], typeof we == "function")
      this.removeListener(de, we);
    else if (we !== void 0)
      for (ke = we.length - 1; ke >= 0; ke--)
        this.removeListener(de, we[ke]);
    return this;
  };
  function X(de, we, Se) {
    var ke = de._events;
    if (ke === void 0)
      return [];
    var he = ke[we];
    return he === void 0 ? [] : typeof he == "function" ? Se ? [he.listener || he] : [he] : Se ? ne(he) : re(he, he.length);
  }
  t.prototype.listeners = function(de) {
    return X(this, de, !0);
  }, t.prototype.rawListeners = function(de) {
    return X(this, de, !1);
  }, t.listenerCount = function(de, we) {
    return typeof de.listenerCount == "function" ? de.listenerCount(we) : ee.call(de, we);
  }, t.prototype.listenerCount = ee;
  function ee(de) {
    var we = this._events;
    if (we !== void 0) {
      var Se = we[de];
      if (typeof Se == "function")
        return 1;
      if (Se !== void 0)
        return Se.length;
    }
    return 0;
  }
  t.prototype.eventNames = function() {
    return this._eventsCount > 0 ? U(this._events) : [];
  };
  function re(de, we) {
    for (var Se = new Array(we), ke = 0; ke < we; ++ke)
      Se[ke] = de[ke];
    return Se;
  }
  function ie(de, we) {
    for (; we + 1 < de.length; we++)
      de[we] = de[we + 1];
    de.pop();
  }
  function ne(de) {
    for (var we = new Array(de.length), Se = 0; Se < we.length; ++Se)
      we[Se] = de[Se].listener || de[Se];
    return we;
  }
  function se(de, we) {
    return new Promise(function(Se, ke) {
      function he(_e) {
        de.removeListener(we, le), ke(_e);
      }
      function le() {
        typeof de.removeListener == "function" && de.removeListener("error", he), Se([].slice.call(arguments));
      }
      be(de, we, le, { once: !0 }), we !== "error" && oe(de, he, { once: !0 });
    });
  }
  function oe(de, we, Se) {
    typeof de.on == "function" && be(de, "error", we, Se);
  }
  function be(de, we, Se, ke) {
    if (typeof de.on == "function")
      ke.once ? de.once(we, Se) : de.on(we, Se);
    else if (typeof de.addEventListener == "function")
      de.addEventListener(we, function he(le) {
        ke.once && de.removeEventListener(we, he), Se(le);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof de);
  }
  return events.exports;
}
var streamBrowser$1, hasRequiredStreamBrowser$1;
function requireStreamBrowser$1() {
  return hasRequiredStreamBrowser$1 || (hasRequiredStreamBrowser$1 = 1, streamBrowser$1 = requireEvents().EventEmitter), streamBrowser$1;
}
var util$1 = {}, types = {}, shams$1, hasRequiredShams$1;
function requireShams$1() {
  return hasRequiredShams$1 || (hasRequiredShams$1 = 1, shams$1 = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var $ = {}, h = Symbol("test"), U = Object(h);
    if (typeof h == "string" || Object.prototype.toString.call(h) !== "[object Symbol]" || Object.prototype.toString.call(U) !== "[object Symbol]")
      return !1;
    var B = 42;
    $[h] = B;
    for (h in $)
      return !1;
    if (typeof Object.keys == "function" && Object.keys($).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames($).length !== 0)
      return !1;
    var V = Object.getOwnPropertySymbols($);
    if (V.length !== 1 || V[0] !== h || !Object.prototype.propertyIsEnumerable.call($, h))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var t = Object.getOwnPropertyDescriptor($, h);
      if (t.value !== B || t.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams$1;
}
var shams, hasRequiredShams;
function requireShams() {
  if (hasRequiredShams)
    return shams;
  hasRequiredShams = 1;
  var $ = requireShams$1();
  return shams = function() {
    return $() && !!Symbol.toStringTag;
  }, shams;
}
var esErrors, hasRequiredEsErrors;
function requireEsErrors() {
  return hasRequiredEsErrors || (hasRequiredEsErrors = 1, esErrors = Error), esErrors;
}
var _eval, hasRequired_eval;
function require_eval() {
  return hasRequired_eval || (hasRequired_eval = 1, _eval = EvalError), _eval;
}
var range, hasRequiredRange;
function requireRange() {
  return hasRequiredRange || (hasRequiredRange = 1, range = RangeError), range;
}
var ref, hasRequiredRef;
function requireRef() {
  return hasRequiredRef || (hasRequiredRef = 1, ref = ReferenceError), ref;
}
var syntax, hasRequiredSyntax;
function requireSyntax() {
  return hasRequiredSyntax || (hasRequiredSyntax = 1, syntax = SyntaxError), syntax;
}
var type, hasRequiredType;
function requireType() {
  return hasRequiredType || (hasRequiredType = 1, type = TypeError), type;
}
var uri, hasRequiredUri;
function requireUri() {
  return hasRequiredUri || (hasRequiredUri = 1, uri = URIError), uri;
}
var hasSymbols, hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols)
    return hasSymbols;
  hasRequiredHasSymbols = 1;
  var $ = typeof Symbol < "u" && Symbol, h = requireShams$1();
  return hasSymbols = function() {
    return typeof $ != "function" || typeof Symbol != "function" || typeof $("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : h();
  }, hasSymbols;
}
var hasProto, hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto)
    return hasProto;
  hasRequiredHasProto = 1;
  var $ = {
    __proto__: null,
    foo: {}
  }, h = Object;
  return hasProto = function() {
    return { __proto__: $ }.foo === $.foo && !($ instanceof h);
  }, hasProto;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation)
    return implementation;
  hasRequiredImplementation = 1;
  var $ = "Function.prototype.bind called on incompatible ", h = Object.prototype.toString, U = Math.max, B = "[object Function]", V = function(M, D) {
    for (var I = [], P = 0; P < M.length; P += 1)
      I[P] = M[P];
    for (var Y = 0; Y < D.length; Y += 1)
      I[Y + M.length] = D[Y];
    return I;
  }, t = function(M, D) {
    for (var I = [], P = D || 0, Y = 0; P < M.length; P += 1, Y += 1)
      I[Y] = M[P];
    return I;
  }, O = function(M, D) {
    for (var I = "", P = 0; P < M.length; P += 1)
      I += M[P], P + 1 < M.length && (I += D);
    return I;
  };
  return implementation = function(M) {
    var D = this;
    if (typeof D != "function" || h.apply(D) !== B)
      throw new TypeError($ + D);
    for (var I = t(arguments, 1), P, Y = function() {
      if (this instanceof P) {
        var ne = D.apply(
          this,
          V(I, arguments)
        );
        return Object(ne) === ne ? ne : this;
      }
      return D.apply(
        M,
        V(I, arguments)
      );
    }, X = U(0, D.length - I.length), ee = [], re = 0; re < X; re++)
      ee[re] = "$" + re;
    if (P = Function("binder", "return function (" + O(ee, ",") + "){ return binder.apply(this,arguments); }")(Y), D.prototype) {
      var ie = function() {
      };
      ie.prototype = D.prototype, P.prototype = new ie(), ie.prototype = null;
    }
    return P;
  }, implementation;
}
var functionBind, hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind)
    return functionBind;
  hasRequiredFunctionBind = 1;
  var $ = requireImplementation();
  return functionBind = Function.prototype.bind || $, functionBind;
}
var hasown, hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown)
    return hasown;
  hasRequiredHasown = 1;
  var $ = Function.prototype.call, h = Object.prototype.hasOwnProperty, U = requireFunctionBind();
  return hasown = U.call($, h), hasown;
}
var getIntrinsic, hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic)
    return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var $, h = requireEsErrors(), U = require_eval(), B = requireRange(), V = requireRef(), t = requireSyntax(), O = requireType(), M = requireUri(), D = Function, I = function(F) {
    try {
      return D('"use strict"; return (' + F + ").constructor;")();
    } catch {
    }
  }, P = Object.getOwnPropertyDescriptor;
  if (P)
    try {
      P({}, "");
    } catch {
      P = null;
    }
  var Y = function() {
    throw new O();
  }, X = P ? function() {
    try {
      return arguments.callee, Y;
    } catch {
      try {
        return P(arguments, "callee").get;
      } catch {
        return Y;
      }
    }
  }() : Y, ee = requireHasSymbols()(), re = requireHasProto()(), ie = Object.getPrototypeOf || (re ? function(F) {
    return F.__proto__;
  } : null), ne = {}, se = typeof Uint8Array > "u" || !ie ? $ : ie(Uint8Array), oe = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? $ : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? $ : ArrayBuffer,
    "%ArrayIteratorPrototype%": ee && ie ? ie([][Symbol.iterator]()) : $,
    "%AsyncFromSyncIteratorPrototype%": $,
    "%AsyncFunction%": ne,
    "%AsyncGenerator%": ne,
    "%AsyncGeneratorFunction%": ne,
    "%AsyncIteratorPrototype%": ne,
    "%Atomics%": typeof Atomics > "u" ? $ : Atomics,
    "%BigInt%": typeof BigInt > "u" ? $ : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? $ : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? $ : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? $ : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": h,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": U,
    "%Float32Array%": typeof Float32Array > "u" ? $ : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? $ : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? $ : FinalizationRegistry,
    "%Function%": D,
    "%GeneratorFunction%": ne,
    "%Int8Array%": typeof Int8Array > "u" ? $ : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? $ : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? $ : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": ee && ie ? ie(ie([][Symbol.iterator]())) : $,
    "%JSON%": typeof JSON == "object" ? JSON : $,
    "%Map%": typeof Map > "u" ? $ : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !ee || !ie ? $ : ie((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? $ : Promise,
    "%Proxy%": typeof Proxy > "u" ? $ : Proxy,
    "%RangeError%": B,
    "%ReferenceError%": V,
    "%Reflect%": typeof Reflect > "u" ? $ : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? $ : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !ee || !ie ? $ : ie((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? $ : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": ee && ie ? ie(""[Symbol.iterator]()) : $,
    "%Symbol%": ee ? Symbol : $,
    "%SyntaxError%": t,
    "%ThrowTypeError%": X,
    "%TypedArray%": se,
    "%TypeError%": O,
    "%Uint8Array%": typeof Uint8Array > "u" ? $ : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? $ : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? $ : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? $ : Uint32Array,
    "%URIError%": M,
    "%WeakMap%": typeof WeakMap > "u" ? $ : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? $ : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? $ : WeakSet
  };
  if (ie)
    try {
      null.error;
    } catch (F) {
      var be = ie(ie(F));
      oe["%Error.prototype%"] = be;
    }
  var de = function F(A) {
    var q;
    if (A === "%AsyncFunction%")
      q = I("async function () {}");
    else if (A === "%GeneratorFunction%")
      q = I("function* () {}");
    else if (A === "%AsyncGeneratorFunction%")
      q = I("async function* () {}");
    else if (A === "%AsyncGenerator%") {
      var z = F("%AsyncGeneratorFunction%");
      z && (q = z.prototype);
    } else if (A === "%AsyncIteratorPrototype%") {
      var S = F("%AsyncGenerator%");
      S && ie && (q = ie(S.prototype));
    }
    return oe[A] = q, q;
  }, we = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, Se = requireFunctionBind(), ke = requireHasown(), he = Se.call(Function.call, Array.prototype.concat), le = Se.call(Function.apply, Array.prototype.splice), _e = Se.call(Function.call, String.prototype.replace), G = Se.call(Function.call, String.prototype.slice), Z = Se.call(Function.call, RegExp.prototype.exec), e = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, o = /\\(\\)?/g, g = function(F) {
    var A = G(F, 0, 1), q = G(F, -1);
    if (A === "%" && q !== "%")
      throw new t("invalid intrinsic syntax, expected closing `%`");
    if (q === "%" && A !== "%")
      throw new t("invalid intrinsic syntax, expected opening `%`");
    var z = [];
    return _e(F, e, function(S, J, ce, ye) {
      z[z.length] = ce ? _e(ye, o, "$1") : J || S;
    }), z;
  }, H = function(F, A) {
    var q = F, z;
    if (ke(we, q) && (z = we[q], q = "%" + z[0] + "%"), ke(oe, q)) {
      var S = oe[q];
      if (S === ne && (S = de(q)), typeof S > "u" && !A)
        throw new O("intrinsic " + F + " exists, but is not available. Please file an issue!");
      return {
        alias: z,
        name: q,
        value: S
      };
    }
    throw new t("intrinsic " + F + " does not exist!");
  };
  return getIntrinsic = function(F, A) {
    if (typeof F != "string" || F.length === 0)
      throw new O("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof A != "boolean")
      throw new O('"allowMissing" argument must be a boolean');
    if (Z(/^%?[^%]*%?$/, F) === null)
      throw new t("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var q = g(F), z = q.length > 0 ? q[0] : "", S = H("%" + z + "%", A), J = S.name, ce = S.value, ye = !1, Me = S.alias;
    Me && (z = Me[0], le(q, he([0, 1], Me)));
    for (var me = 1, ue = !0; me < q.length; me += 1) {
      var fe = q[me], Ae = G(fe, 0, 1), Be = G(fe, -1);
      if ((Ae === '"' || Ae === "'" || Ae === "`" || Be === '"' || Be === "'" || Be === "`") && Ae !== Be)
        throw new t("property names with quotes must have matching quotes");
      if ((fe === "constructor" || !ue) && (ye = !0), z += "." + fe, J = "%" + z + "%", ke(oe, J))
        ce = oe[J];
      else if (ce != null) {
        if (!(fe in ce)) {
          if (!A)
            throw new O("base intrinsic for " + F + " exists, but the property is not available.");
          return;
        }
        if (P && me + 1 >= q.length) {
          var pe = P(ce, fe);
          ue = !!pe, ue && "get" in pe && !("originalValue" in pe.get) ? ce = pe.get : ce = ce[fe];
        } else
          ue = ke(ce, fe), ce = ce[fe];
        ue && !ye && (oe[J] = ce);
      }
    }
    return ce;
  }, getIntrinsic;
}
var callBind = { exports: {} }, esDefineProperty, hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty)
    return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var $ = requireGetIntrinsic(), h = $("%Object.defineProperty%", !0) || !1;
  if (h)
    try {
      h({}, "a", { value: 1 });
    } catch {
      h = !1;
    }
  return esDefineProperty = h, esDefineProperty;
}
var gopd, hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd)
    return gopd;
  hasRequiredGopd = 1;
  var $ = requireGetIntrinsic(), h = $("%Object.getOwnPropertyDescriptor%", !0);
  if (h)
    try {
      h([], "length");
    } catch {
      h = null;
    }
  return gopd = h, gopd;
}
var defineDataProperty, hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty)
    return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var $ = requireEsDefineProperty(), h = requireSyntax(), U = requireType(), B = requireGopd();
  return defineDataProperty = function(V, t, O) {
    if (!V || typeof V != "object" && typeof V != "function")
      throw new U("`obj` must be an object or a function`");
    if (typeof t != "string" && typeof t != "symbol")
      throw new U("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new U("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new U("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new U("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new U("`loose`, if provided, must be a boolean");
    var M = arguments.length > 3 ? arguments[3] : null, D = arguments.length > 4 ? arguments[4] : null, I = arguments.length > 5 ? arguments[5] : null, P = arguments.length > 6 ? arguments[6] : !1, Y = !!B && B(V, t);
    if ($)
      $(V, t, {
        configurable: I === null && Y ? Y.configurable : !I,
        enumerable: M === null && Y ? Y.enumerable : !M,
        value: O,
        writable: D === null && Y ? Y.writable : !D
      });
    else if (P || !M && !D && !I)
      V[t] = O;
    else
      throw new h("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, defineDataProperty;
}
var hasPropertyDescriptors_1, hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors)
    return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var $ = requireEsDefineProperty(), h = function() {
    return !!$;
  };
  return h.hasArrayLengthDefineBug = function() {
    if (!$)
      return null;
    try {
      return $([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, hasPropertyDescriptors_1 = h, hasPropertyDescriptors_1;
}
var setFunctionLength, hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength)
    return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var $ = requireGetIntrinsic(), h = requireDefineDataProperty(), U = requireHasPropertyDescriptors()(), B = requireGopd(), V = requireType(), t = $("%Math.floor%");
  return setFunctionLength = function(O, M) {
    if (typeof O != "function")
      throw new V("`fn` is not a function");
    if (typeof M != "number" || M < 0 || M > 4294967295 || t(M) !== M)
      throw new V("`length` must be a positive 32-bit integer");
    var D = arguments.length > 2 && !!arguments[2], I = !0, P = !0;
    if ("length" in O && B) {
      var Y = B(O, "length");
      Y && !Y.configurable && (I = !1), Y && !Y.writable && (P = !1);
    }
    return (I || P || !D) && (U ? h(
      /** @type {Parameters<define>[0]} */
      O,
      "length",
      M,
      !0,
      !0
    ) : h(
      /** @type {Parameters<define>[0]} */
      O,
      "length",
      M
    )), O;
  }, setFunctionLength;
}
var hasRequiredCallBind;
function requireCallBind() {
  return hasRequiredCallBind || (hasRequiredCallBind = 1, function($) {
    var h = requireFunctionBind(), U = requireGetIntrinsic(), B = requireSetFunctionLength(), V = requireType(), t = U("%Function.prototype.apply%"), O = U("%Function.prototype.call%"), M = U("%Reflect.apply%", !0) || h.call(O, t), D = requireEsDefineProperty(), I = U("%Math.max%");
    $.exports = function(Y) {
      if (typeof Y != "function")
        throw new V("a function is required");
      var X = M(h, O, arguments);
      return B(
        X,
        1 + I(0, Y.length - (arguments.length - 1)),
        !0
      );
    };
    var P = function() {
      return M(h, t, arguments);
    };
    D ? D($.exports, "apply", { value: P }) : $.exports.apply = P;
  }(callBind)), callBind.exports;
}
var callBound, hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound)
    return callBound;
  hasRequiredCallBound = 1;
  var $ = requireGetIntrinsic(), h = requireCallBind(), U = h($("String.prototype.indexOf"));
  return callBound = function(B, V) {
    var t = $(B, !!V);
    return typeof t == "function" && U(B, ".prototype.") > -1 ? h(t) : t;
  }, callBound;
}
var isArguments, hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments)
    return isArguments;
  hasRequiredIsArguments = 1;
  var $ = requireShams()(), h = requireCallBound(), U = h("Object.prototype.toString"), B = function(O) {
    return $ && O && typeof O == "object" && Symbol.toStringTag in O ? !1 : U(O) === "[object Arguments]";
  }, V = function(O) {
    return B(O) ? !0 : O !== null && typeof O == "object" && typeof O.length == "number" && O.length >= 0 && U(O) !== "[object Array]" && U(O.callee) === "[object Function]";
  }, t = function() {
    return B(arguments);
  }();
  return B.isLegacyArguments = V, isArguments = t ? B : V, isArguments;
}
var isGeneratorFunction, hasRequiredIsGeneratorFunction;
function requireIsGeneratorFunction() {
  if (hasRequiredIsGeneratorFunction)
    return isGeneratorFunction;
  hasRequiredIsGeneratorFunction = 1;
  var $ = Object.prototype.toString, h = Function.prototype.toString, U = /^\s*(?:function)?\*/, B = requireShams()(), V = Object.getPrototypeOf, t = function() {
    if (!B)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, O;
  return isGeneratorFunction = function(M) {
    if (typeof M != "function")
      return !1;
    if (U.test(h.call(M)))
      return !0;
    if (!B) {
      var D = $.call(M);
      return D === "[object GeneratorFunction]";
    }
    if (!V)
      return !1;
    if (typeof O > "u") {
      var I = t();
      O = I ? V(I) : !1;
    }
    return V(M) === O;
  }, isGeneratorFunction;
}
var isCallable, hasRequiredIsCallable;
function requireIsCallable() {
  if (hasRequiredIsCallable)
    return isCallable;
  hasRequiredIsCallable = 1;
  var $ = Function.prototype.toString, h = typeof Reflect == "object" && Reflect !== null && Reflect.apply, U, B;
  if (typeof h == "function" && typeof Object.defineProperty == "function")
    try {
      U = Object.defineProperty({}, "length", {
        get: function() {
          throw B;
        }
      }), B = {}, h(function() {
        throw 42;
      }, null, U);
    } catch (oe) {
      oe !== B && (h = null);
    }
  else
    h = null;
  var V = /^\s*class\b/, t = function(oe) {
    try {
      var be = $.call(oe);
      return V.test(be);
    } catch {
      return !1;
    }
  }, O = function(oe) {
    try {
      return t(oe) ? !1 : ($.call(oe), !0);
    } catch {
      return !1;
    }
  }, M = Object.prototype.toString, D = "[object Object]", I = "[object Function]", P = "[object GeneratorFunction]", Y = "[object HTMLAllCollection]", X = "[object HTML document.all class]", ee = "[object HTMLCollection]", re = typeof Symbol == "function" && !!Symbol.toStringTag, ie = !(0 in [,]), ne = function() {
    return !1;
  };
  if (typeof document == "object") {
    var se = document.all;
    M.call(se) === M.call(document.all) && (ne = function(oe) {
      if ((ie || !oe) && (typeof oe > "u" || typeof oe == "object"))
        try {
          var be = M.call(oe);
          return (be === Y || be === X || be === ee || be === D) && oe("") == null;
        } catch {
        }
      return !1;
    });
  }
  return isCallable = h ? function(oe) {
    if (ne(oe))
      return !0;
    if (!oe || typeof oe != "function" && typeof oe != "object")
      return !1;
    try {
      h(oe, null, U);
    } catch (be) {
      if (be !== B)
        return !1;
    }
    return !t(oe) && O(oe);
  } : function(oe) {
    if (ne(oe))
      return !0;
    if (!oe || typeof oe != "function" && typeof oe != "object")
      return !1;
    if (re)
      return O(oe);
    if (t(oe))
      return !1;
    var be = M.call(oe);
    return be !== I && be !== P && !/^\[object HTML/.test(be) ? !1 : O(oe);
  }, isCallable;
}
var forEach_1, hasRequiredForEach;
function requireForEach() {
  if (hasRequiredForEach)
    return forEach_1;
  hasRequiredForEach = 1;
  var $ = requireIsCallable(), h = Object.prototype.toString, U = Object.prototype.hasOwnProperty, B = function(M, D, I) {
    for (var P = 0, Y = M.length; P < Y; P++)
      U.call(M, P) && (I == null ? D(M[P], P, M) : D.call(I, M[P], P, M));
  }, V = function(M, D, I) {
    for (var P = 0, Y = M.length; P < Y; P++)
      I == null ? D(M.charAt(P), P, M) : D.call(I, M.charAt(P), P, M);
  }, t = function(M, D, I) {
    for (var P in M)
      U.call(M, P) && (I == null ? D(M[P], P, M) : D.call(I, M[P], P, M));
  }, O = function(M, D, I) {
    if (!$(D))
      throw new TypeError("iterator must be a function");
    var P;
    arguments.length >= 3 && (P = I), h.call(M) === "[object Array]" ? B(M, D, P) : typeof M == "string" ? V(M, D, P) : t(M, D, P);
  };
  return forEach_1 = O, forEach_1;
}
var possibleTypedArrayNames, hasRequiredPossibleTypedArrayNames;
function requirePossibleTypedArrayNames() {
  return hasRequiredPossibleTypedArrayNames || (hasRequiredPossibleTypedArrayNames = 1, possibleTypedArrayNames = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), possibleTypedArrayNames;
}
var availableTypedArrays, hasRequiredAvailableTypedArrays;
function requireAvailableTypedArrays() {
  if (hasRequiredAvailableTypedArrays)
    return availableTypedArrays;
  hasRequiredAvailableTypedArrays = 1;
  var $ = requirePossibleTypedArrayNames(), h = typeof globalThis > "u" ? commonjsGlobal : globalThis;
  return availableTypedArrays = function() {
    for (var U = [], B = 0; B < $.length; B++)
      typeof h[$[B]] == "function" && (U[U.length] = $[B]);
    return U;
  }, availableTypedArrays;
}
var whichTypedArray, hasRequiredWhichTypedArray;
function requireWhichTypedArray() {
  if (hasRequiredWhichTypedArray)
    return whichTypedArray;
  hasRequiredWhichTypedArray = 1;
  var $ = requireForEach(), h = requireAvailableTypedArrays(), U = requireCallBind(), B = requireCallBound(), V = requireGopd(), t = B("Object.prototype.toString"), O = requireShams()(), M = typeof globalThis > "u" ? commonjsGlobal : globalThis, D = h(), I = B("String.prototype.slice"), P = Object.getPrototypeOf, Y = B("Array.prototype.indexOf", !0) || function(ie, ne) {
    for (var se = 0; se < ie.length; se += 1)
      if (ie[se] === ne)
        return se;
    return -1;
  }, X = { __proto__: null };
  O && V && P ? $(D, function(ie) {
    var ne = new M[ie]();
    if (Symbol.toStringTag in ne) {
      var se = P(ne), oe = V(se, Symbol.toStringTag);
      if (!oe) {
        var be = P(se);
        oe = V(be, Symbol.toStringTag);
      }
      X["$" + ie] = U(oe.get);
    }
  }) : $(D, function(ie) {
    var ne = new M[ie](), se = ne.slice || ne.set;
    se && (X["$" + ie] = U(se));
  });
  var ee = function(ie) {
    var ne = !1;
    return $(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      X,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(se, oe) {
        if (!ne)
          try {
            "$" + se(ie) === oe && (ne = I(oe, 1));
          } catch {
          }
      }
    ), ne;
  }, re = function(ie) {
    var ne = !1;
    return $(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      X,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function(se, oe) {
        if (!ne)
          try {
            se(ie), ne = I(oe, 1);
          } catch {
          }
      }
    ), ne;
  };
  return whichTypedArray = function(ie) {
    if (!ie || typeof ie != "object")
      return !1;
    if (!O) {
      var ne = I(t(ie), 8, -1);
      return Y(D, ne) > -1 ? ne : ne !== "Object" ? !1 : re(ie);
    }
    return V ? ee(ie) : null;
  }, whichTypedArray;
}
var isTypedArray, hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray)
    return isTypedArray;
  hasRequiredIsTypedArray = 1;
  var $ = requireWhichTypedArray();
  return isTypedArray = function(h) {
    return !!$(h);
  }, isTypedArray;
}
var hasRequiredTypes;
function requireTypes() {
  return hasRequiredTypes || (hasRequiredTypes = 1, function($) {
    var h = requireIsArguments(), U = requireIsGeneratorFunction(), B = requireWhichTypedArray(), V = requireIsTypedArray();
    function t(ae) {
      return ae.call.bind(ae);
    }
    var O = typeof BigInt < "u", M = typeof Symbol < "u", D = t(Object.prototype.toString), I = t(Number.prototype.valueOf), P = t(String.prototype.valueOf), Y = t(Boolean.prototype.valueOf);
    if (O)
      var X = t(BigInt.prototype.valueOf);
    if (M)
      var ee = t(Symbol.prototype.valueOf);
    function re(ae, ve) {
      if (typeof ae != "object")
        return !1;
      try {
        return ve(ae), !0;
      } catch {
        return !1;
      }
    }
    $.isArgumentsObject = h, $.isGeneratorFunction = U, $.isTypedArray = V;
    function ie(ae) {
      return typeof Promise < "u" && ae instanceof Promise || ae !== null && typeof ae == "object" && typeof ae.then == "function" && typeof ae.catch == "function";
    }
    $.isPromise = ie;
    function ne(ae) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(ae) : V(ae) || ce(ae);
    }
    $.isArrayBufferView = ne;
    function se(ae) {
      return B(ae) === "Uint8Array";
    }
    $.isUint8Array = se;
    function oe(ae) {
      return B(ae) === "Uint8ClampedArray";
    }
    $.isUint8ClampedArray = oe;
    function be(ae) {
      return B(ae) === "Uint16Array";
    }
    $.isUint16Array = be;
    function de(ae) {
      return B(ae) === "Uint32Array";
    }
    $.isUint32Array = de;
    function we(ae) {
      return B(ae) === "Int8Array";
    }
    $.isInt8Array = we;
    function Se(ae) {
      return B(ae) === "Int16Array";
    }
    $.isInt16Array = Se;
    function ke(ae) {
      return B(ae) === "Int32Array";
    }
    $.isInt32Array = ke;
    function he(ae) {
      return B(ae) === "Float32Array";
    }
    $.isFloat32Array = he;
    function le(ae) {
      return B(ae) === "Float64Array";
    }
    $.isFloat64Array = le;
    function _e(ae) {
      return B(ae) === "BigInt64Array";
    }
    $.isBigInt64Array = _e;
    function G(ae) {
      return B(ae) === "BigUint64Array";
    }
    $.isBigUint64Array = G;
    function Z(ae) {
      return D(ae) === "[object Map]";
    }
    Z.working = typeof Map < "u" && Z(/* @__PURE__ */ new Map());
    function e(ae) {
      return typeof Map > "u" ? !1 : Z.working ? Z(ae) : ae instanceof Map;
    }
    $.isMap = e;
    function o(ae) {
      return D(ae) === "[object Set]";
    }
    o.working = typeof Set < "u" && o(/* @__PURE__ */ new Set());
    function g(ae) {
      return typeof Set > "u" ? !1 : o.working ? o(ae) : ae instanceof Set;
    }
    $.isSet = g;
    function H(ae) {
      return D(ae) === "[object WeakMap]";
    }
    H.working = typeof WeakMap < "u" && H(/* @__PURE__ */ new WeakMap());
    function F(ae) {
      return typeof WeakMap > "u" ? !1 : H.working ? H(ae) : ae instanceof WeakMap;
    }
    $.isWeakMap = F;
    function A(ae) {
      return D(ae) === "[object WeakSet]";
    }
    A.working = typeof WeakSet < "u" && A(/* @__PURE__ */ new WeakSet());
    function q(ae) {
      return A(ae);
    }
    $.isWeakSet = q;
    function z(ae) {
      return D(ae) === "[object ArrayBuffer]";
    }
    z.working = typeof ArrayBuffer < "u" && z(new ArrayBuffer());
    function S(ae) {
      return typeof ArrayBuffer > "u" ? !1 : z.working ? z(ae) : ae instanceof ArrayBuffer;
    }
    $.isArrayBuffer = S;
    function J(ae) {
      return D(ae) === "[object DataView]";
    }
    J.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && J(new DataView(new ArrayBuffer(1), 0, 1));
    function ce(ae) {
      return typeof DataView > "u" ? !1 : J.working ? J(ae) : ae instanceof DataView;
    }
    $.isDataView = ce;
    var ye = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
    function Me(ae) {
      return D(ae) === "[object SharedArrayBuffer]";
    }
    function me(ae) {
      return typeof ye > "u" ? !1 : (typeof Me.working > "u" && (Me.working = Me(new ye())), Me.working ? Me(ae) : ae instanceof ye);
    }
    $.isSharedArrayBuffer = me;
    function ue(ae) {
      return D(ae) === "[object AsyncFunction]";
    }
    $.isAsyncFunction = ue;
    function fe(ae) {
      return D(ae) === "[object Map Iterator]";
    }
    $.isMapIterator = fe;
    function Ae(ae) {
      return D(ae) === "[object Set Iterator]";
    }
    $.isSetIterator = Ae;
    function Be(ae) {
      return D(ae) === "[object Generator]";
    }
    $.isGeneratorObject = Be;
    function pe(ae) {
      return D(ae) === "[object WebAssembly.Module]";
    }
    $.isWebAssemblyCompiledModule = pe;
    function ge(ae) {
      return re(ae, I);
    }
    $.isNumberObject = ge;
    function Ee(ae) {
      return re(ae, P);
    }
    $.isStringObject = Ee;
    function Ie(ae) {
      return re(ae, Y);
    }
    $.isBooleanObject = Ie;
    function Pe(ae) {
      return O && re(ae, X);
    }
    $.isBigIntObject = Pe;
    function Q(ae) {
      return M && re(ae, ee);
    }
    $.isSymbolObject = Q;
    function K(ae) {
      return ge(ae) || Ee(ae) || Ie(ae) || Pe(ae) || Q(ae);
    }
    $.isBoxedPrimitive = K;
    function te(ae) {
      return typeof Uint8Array < "u" && (S(ae) || me(ae));
    }
    $.isAnyArrayBuffer = te, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(ae) {
      Object.defineProperty($, ae, {
        enumerable: !1,
        value: function() {
          throw new Error(ae + " is not supported in userland");
        }
      });
    });
  }(types)), types;
}
var isBufferBrowser, hasRequiredIsBufferBrowser;
function requireIsBufferBrowser() {
  return hasRequiredIsBufferBrowser || (hasRequiredIsBufferBrowser = 1, isBufferBrowser = function($) {
    return $ && typeof $ == "object" && typeof $.copy == "function" && typeof $.fill == "function" && typeof $.readUInt8 == "function";
  }), isBufferBrowser;
}
var hasRequiredUtil$1;
function requireUtil$1() {
  return hasRequiredUtil$1 || (hasRequiredUtil$1 = 1, function($) {
    var h = Object.getOwnPropertyDescriptors || function(J) {
      for (var ce = Object.keys(J), ye = {}, Me = 0; Me < ce.length; Me++)
        ye[ce[Me]] = Object.getOwnPropertyDescriptor(J, ce[Me]);
      return ye;
    }, U = /%[sdj%]/g;
    $.format = function(J) {
      if (!we(J)) {
        for (var ce = [], ye = 0; ye < arguments.length; ye++)
          ce.push(O(arguments[ye]));
        return ce.join(" ");
      }
      for (var ye = 1, Me = arguments, me = Me.length, ue = String(J).replace(U, function(Be) {
        if (Be === "%%")
          return "%";
        if (ye >= me)
          return Be;
        switch (Be) {
          case "%s":
            return String(Me[ye++]);
          case "%d":
            return Number(Me[ye++]);
          case "%j":
            try {
              return JSON.stringify(Me[ye++]);
            } catch {
              return "[Circular]";
            }
          default:
            return Be;
        }
      }), fe = Me[ye]; ye < me; fe = Me[++ye])
        oe(fe) || !le(fe) ? ue += " " + fe : ue += " " + O(fe);
      return ue;
    }, $.deprecate = function(J, ce) {
      if (typeof process$1 < "u" && process$1.noDeprecation === !0)
        return J;
      if (typeof process$1 > "u")
        return function() {
          return $.deprecate(J, ce).apply(this, arguments);
        };
      var ye = !1;
      function Me() {
        if (!ye) {
          if (process$1.throwDeprecation)
            throw new Error(ce);
          process$1.traceDeprecation ? console.trace(ce) : console.error(ce), ye = !0;
        }
        return J.apply(this, arguments);
      }
      return Me;
    };
    var B = {}, V = /^$/;
    if (process$1.env.NODE_DEBUG) {
      var t = process$1.env.NODE_DEBUG;
      t = t.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), V = new RegExp("^" + t + "$", "i");
    }
    $.debuglog = function(J) {
      if (J = J.toUpperCase(), !B[J])
        if (V.test(J)) {
          var ce = process$1.pid;
          B[J] = function() {
            var ye = $.format.apply($, arguments);
            console.error("%s %d: %s", J, ce, ye);
          };
        } else
          B[J] = function() {
          };
      return B[J];
    };
    function O(J, ce) {
      var ye = {
        seen: [],
        stylize: D
      };
      return arguments.length >= 3 && (ye.depth = arguments[2]), arguments.length >= 4 && (ye.colors = arguments[3]), se(ce) ? ye.showHidden = ce : ce && $._extend(ye, ce), ke(ye.showHidden) && (ye.showHidden = !1), ke(ye.depth) && (ye.depth = 2), ke(ye.colors) && (ye.colors = !1), ke(ye.customInspect) && (ye.customInspect = !0), ye.colors && (ye.stylize = M), P(ye, J, ye.depth);
    }
    $.inspect = O, O.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    }, O.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      // "name": intentionally not styling
      regexp: "red"
    };
    function M(J, ce) {
      var ye = O.styles[ce];
      return ye ? "\x1B[" + O.colors[ye][0] + "m" + J + "\x1B[" + O.colors[ye][1] + "m" : J;
    }
    function D(J, ce) {
      return J;
    }
    function I(J) {
      var ce = {};
      return J.forEach(function(ye, Me) {
        ce[ye] = !0;
      }), ce;
    }
    function P(J, ce, ye) {
      if (J.customInspect && ce && Z(ce.inspect) && // Filter out the util module, it's inspect function is special
      ce.inspect !== $.inspect && // Also filter out any prototype objects using the circular check.
      !(ce.constructor && ce.constructor.prototype === ce)) {
        var Me = ce.inspect(ye, J);
        return we(Me) || (Me = P(J, Me, ye)), Me;
      }
      var me = Y(J, ce);
      if (me)
        return me;
      var ue = Object.keys(ce), fe = I(ue);
      if (J.showHidden && (ue = Object.getOwnPropertyNames(ce)), G(ce) && (ue.indexOf("message") >= 0 || ue.indexOf("description") >= 0))
        return X(ce);
      if (ue.length === 0) {
        if (Z(ce)) {
          var Ae = ce.name ? ": " + ce.name : "";
          return J.stylize("[Function" + Ae + "]", "special");
        }
        if (he(ce))
          return J.stylize(RegExp.prototype.toString.call(ce), "regexp");
        if (_e(ce))
          return J.stylize(Date.prototype.toString.call(ce), "date");
        if (G(ce))
          return X(ce);
      }
      var Be = "", pe = !1, ge = ["{", "}"];
      if (ne(ce) && (pe = !0, ge = ["[", "]"]), Z(ce)) {
        var Ee = ce.name ? ": " + ce.name : "";
        Be = " [Function" + Ee + "]";
      }
      if (he(ce) && (Be = " " + RegExp.prototype.toString.call(ce)), _e(ce) && (Be = " " + Date.prototype.toUTCString.call(ce)), G(ce) && (Be = " " + X(ce)), ue.length === 0 && (!pe || ce.length == 0))
        return ge[0] + Be + ge[1];
      if (ye < 0)
        return he(ce) ? J.stylize(RegExp.prototype.toString.call(ce), "regexp") : J.stylize("[Object]", "special");
      J.seen.push(ce);
      var Ie;
      return pe ? Ie = ee(J, ce, ye, fe, ue) : Ie = ue.map(function(Pe) {
        return re(J, ce, ye, fe, Pe, pe);
      }), J.seen.pop(), ie(Ie, Be, ge);
    }
    function Y(J, ce) {
      if (ke(ce))
        return J.stylize("undefined", "undefined");
      if (we(ce)) {
        var ye = "'" + JSON.stringify(ce).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return J.stylize(ye, "string");
      }
      if (de(ce))
        return J.stylize("" + ce, "number");
      if (se(ce))
        return J.stylize("" + ce, "boolean");
      if (oe(ce))
        return J.stylize("null", "null");
    }
    function X(J) {
      return "[" + Error.prototype.toString.call(J) + "]";
    }
    function ee(J, ce, ye, Me, me) {
      for (var ue = [], fe = 0, Ae = ce.length; fe < Ae; ++fe)
        A(ce, String(fe)) ? ue.push(re(
          J,
          ce,
          ye,
          Me,
          String(fe),
          !0
        )) : ue.push("");
      return me.forEach(function(Be) {
        Be.match(/^\d+$/) || ue.push(re(
          J,
          ce,
          ye,
          Me,
          Be,
          !0
        ));
      }), ue;
    }
    function re(J, ce, ye, Me, me, ue) {
      var fe, Ae, Be;
      if (Be = Object.getOwnPropertyDescriptor(ce, me) || { value: ce[me] }, Be.get ? Be.set ? Ae = J.stylize("[Getter/Setter]", "special") : Ae = J.stylize("[Getter]", "special") : Be.set && (Ae = J.stylize("[Setter]", "special")), A(Me, me) || (fe = "[" + me + "]"), Ae || (J.seen.indexOf(Be.value) < 0 ? (oe(ye) ? Ae = P(J, Be.value, null) : Ae = P(J, Be.value, ye - 1), Ae.indexOf(`
`) > -1 && (ue ? Ae = Ae.split(`
`).map(function(pe) {
        return "  " + pe;
      }).join(`
`).slice(2) : Ae = `
` + Ae.split(`
`).map(function(pe) {
        return "   " + pe;
      }).join(`
`))) : Ae = J.stylize("[Circular]", "special")), ke(fe)) {
        if (ue && me.match(/^\d+$/))
          return Ae;
        fe = JSON.stringify("" + me), fe.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (fe = fe.slice(1, -1), fe = J.stylize(fe, "name")) : (fe = fe.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), fe = J.stylize(fe, "string"));
      }
      return fe + ": " + Ae;
    }
    function ie(J, ce, ye) {
      var Me = J.reduce(function(me, ue) {
        return ue.indexOf(`
`) >= 0, me + ue.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return Me > 60 ? ye[0] + (ce === "" ? "" : ce + `
 `) + " " + J.join(`,
  `) + " " + ye[1] : ye[0] + ce + " " + J.join(", ") + " " + ye[1];
    }
    $.types = requireTypes();
    function ne(J) {
      return Array.isArray(J);
    }
    $.isArray = ne;
    function se(J) {
      return typeof J == "boolean";
    }
    $.isBoolean = se;
    function oe(J) {
      return J === null;
    }
    $.isNull = oe;
    function be(J) {
      return J == null;
    }
    $.isNullOrUndefined = be;
    function de(J) {
      return typeof J == "number";
    }
    $.isNumber = de;
    function we(J) {
      return typeof J == "string";
    }
    $.isString = we;
    function Se(J) {
      return typeof J == "symbol";
    }
    $.isSymbol = Se;
    function ke(J) {
      return J === void 0;
    }
    $.isUndefined = ke;
    function he(J) {
      return le(J) && o(J) === "[object RegExp]";
    }
    $.isRegExp = he, $.types.isRegExp = he;
    function le(J) {
      return typeof J == "object" && J !== null;
    }
    $.isObject = le;
    function _e(J) {
      return le(J) && o(J) === "[object Date]";
    }
    $.isDate = _e, $.types.isDate = _e;
    function G(J) {
      return le(J) && (o(J) === "[object Error]" || J instanceof Error);
    }
    $.isError = G, $.types.isNativeError = G;
    function Z(J) {
      return typeof J == "function";
    }
    $.isFunction = Z;
    function e(J) {
      return J === null || typeof J == "boolean" || typeof J == "number" || typeof J == "string" || typeof J == "symbol" || // ES6 symbol
      typeof J > "u";
    }
    $.isPrimitive = e, $.isBuffer = requireIsBufferBrowser();
    function o(J) {
      return Object.prototype.toString.call(J);
    }
    function g(J) {
      return J < 10 ? "0" + J.toString(10) : J.toString(10);
    }
    var H = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function F() {
      var J = /* @__PURE__ */ new Date(), ce = [
        g(J.getHours()),
        g(J.getMinutes()),
        g(J.getSeconds())
      ].join(":");
      return [J.getDate(), H[J.getMonth()], ce].join(" ");
    }
    $.log = function() {
      console.log("%s - %s", F(), $.format.apply($, arguments));
    }, $.inherits = requireInherits_browser(), $._extend = function(J, ce) {
      if (!ce || !le(ce))
        return J;
      for (var ye = Object.keys(ce), Me = ye.length; Me--; )
        J[ye[Me]] = ce[ye[Me]];
      return J;
    };
    function A(J, ce) {
      return Object.prototype.hasOwnProperty.call(J, ce);
    }
    var q = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
    $.promisify = function(J) {
      if (typeof J != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (q && J[q]) {
        var ce = J[q];
        if (typeof ce != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(ce, q, {
          value: ce,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), ce;
      }
      function ce() {
        for (var ye, Me, me = new Promise(function(Ae, Be) {
          ye = Ae, Me = Be;
        }), ue = [], fe = 0; fe < arguments.length; fe++)
          ue.push(arguments[fe]);
        ue.push(function(Ae, Be) {
          Ae ? Me(Ae) : ye(Be);
        });
        try {
          J.apply(this, ue);
        } catch (Ae) {
          Me(Ae);
        }
        return me;
      }
      return Object.setPrototypeOf(ce, Object.getPrototypeOf(J)), q && Object.defineProperty(ce, q, {
        value: ce,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Object.defineProperties(
        ce,
        h(J)
      );
    }, $.promisify.custom = q;
    function z(J, ce) {
      if (!J) {
        var ye = new Error("Promise was rejected with a falsy value");
        ye.reason = J, J = ye;
      }
      return ce(J);
    }
    function S(J) {
      if (typeof J != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function ce() {
        for (var ye = [], Me = 0; Me < arguments.length; Me++)
          ye.push(arguments[Me]);
        var me = ye.pop();
        if (typeof me != "function")
          throw new TypeError("The last argument must be of type Function");
        var ue = this, fe = function() {
          return me.apply(ue, arguments);
        };
        J.apply(this, ye).then(
          function(Ae) {
            process$1.nextTick(fe.bind(null, null, Ae));
          },
          function(Ae) {
            process$1.nextTick(z.bind(null, Ae, fe));
          }
        );
      }
      return Object.setPrototypeOf(ce, Object.getPrototypeOf(J)), Object.defineProperties(
        ce,
        h(J)
      ), ce;
    }
    $.callbackify = S;
  }(util$1)), util$1;
}
var buffer_list, hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list)
    return buffer_list;
  hasRequiredBuffer_list = 1;
  function $(re, ie) {
    var ne = Object.keys(re);
    if (Object.getOwnPropertySymbols) {
      var se = Object.getOwnPropertySymbols(re);
      ie && (se = se.filter(function(oe) {
        return Object.getOwnPropertyDescriptor(re, oe).enumerable;
      })), ne.push.apply(ne, se);
    }
    return ne;
  }
  function h(re) {
    for (var ie = 1; ie < arguments.length; ie++) {
      var ne = arguments[ie] != null ? arguments[ie] : {};
      ie % 2 ? $(Object(ne), !0).forEach(function(se) {
        U(re, se, ne[se]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(re, Object.getOwnPropertyDescriptors(ne)) : $(Object(ne)).forEach(function(se) {
        Object.defineProperty(re, se, Object.getOwnPropertyDescriptor(ne, se));
      });
    }
    return re;
  }
  function U(re, ie, ne) {
    return ie = O(ie), ie in re ? Object.defineProperty(re, ie, { value: ne, enumerable: !0, configurable: !0, writable: !0 }) : re[ie] = ne, re;
  }
  function B(re, ie) {
    if (!(re instanceof ie))
      throw new TypeError("Cannot call a class as a function");
  }
  function V(re, ie) {
    for (var ne = 0; ne < ie.length; ne++) {
      var se = ie[ne];
      se.enumerable = se.enumerable || !1, se.configurable = !0, "value" in se && (se.writable = !0), Object.defineProperty(re, O(se.key), se);
    }
  }
  function t(re, ie, ne) {
    return ie && V(re.prototype, ie), ne && V(re, ne), Object.defineProperty(re, "prototype", { writable: !1 }), re;
  }
  function O(re) {
    var ie = M(re, "string");
    return typeof ie == "symbol" ? ie : String(ie);
  }
  function M(re, ie) {
    if (typeof re != "object" || re === null)
      return re;
    var ne = re[Symbol.toPrimitive];
    if (ne !== void 0) {
      var se = ne.call(re, ie || "default");
      if (typeof se != "object")
        return se;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (ie === "string" ? String : Number)(re);
  }
  var D = requireBuffer$1(), I = D.Buffer, P = requireUtil$1(), Y = P.inspect, X = Y && Y.custom || "inspect";
  function ee(re, ie, ne) {
    I.prototype.copy.call(re, ie, ne);
  }
  return buffer_list = /* @__PURE__ */ function() {
    function re() {
      B(this, re), this.head = null, this.tail = null, this.length = 0;
    }
    return t(re, [{
      key: "push",
      value: function(ie) {
        var ne = {
          data: ie,
          next: null
        };
        this.length > 0 ? this.tail.next = ne : this.head = ne, this.tail = ne, ++this.length;
      }
    }, {
      key: "unshift",
      value: function(ie) {
        var ne = {
          data: ie,
          next: this.head
        };
        this.length === 0 && (this.tail = ne), this.head = ne, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var ie = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, ie;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function(ie) {
        if (this.length === 0)
          return "";
        for (var ne = this.head, se = "" + ne.data; ne = ne.next; )
          se += ie + ne.data;
        return se;
      }
    }, {
      key: "concat",
      value: function(ie) {
        if (this.length === 0)
          return I.alloc(0);
        for (var ne = I.allocUnsafe(ie >>> 0), se = this.head, oe = 0; se; )
          ee(se.data, ne, oe), oe += se.data.length, se = se.next;
        return ne;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function(ie, ne) {
        var se;
        return ie < this.head.data.length ? (se = this.head.data.slice(0, ie), this.head.data = this.head.data.slice(ie)) : ie === this.head.data.length ? se = this.shift() : se = ne ? this._getString(ie) : this._getBuffer(ie), se;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function(ie) {
        var ne = this.head, se = 1, oe = ne.data;
        for (ie -= oe.length; ne = ne.next; ) {
          var be = ne.data, de = ie > be.length ? be.length : ie;
          if (de === be.length ? oe += be : oe += be.slice(0, ie), ie -= de, ie === 0) {
            de === be.length ? (++se, ne.next ? this.head = ne.next : this.head = this.tail = null) : (this.head = ne, ne.data = be.slice(de));
            break;
          }
          ++se;
        }
        return this.length -= se, oe;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function(ie) {
        var ne = I.allocUnsafe(ie), se = this.head, oe = 1;
        for (se.data.copy(ne), ie -= se.data.length; se = se.next; ) {
          var be = se.data, de = ie > be.length ? be.length : ie;
          if (be.copy(ne, ne.length - ie, 0, de), ie -= de, ie === 0) {
            de === be.length ? (++oe, se.next ? this.head = se.next : this.head = this.tail = null) : (this.head = se, se.data = be.slice(de));
            break;
          }
          ++oe;
        }
        return this.length -= oe, ne;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: X,
      value: function(ie, ne) {
        return Y(this, h(h({}, ne), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), re;
  }(), buffer_list;
}
var destroy_1$1, hasRequiredDestroy$1;
function requireDestroy$1() {
  if (hasRequiredDestroy$1)
    return destroy_1$1;
  hasRequiredDestroy$1 = 1;
  function $(O, M) {
    var D = this, I = this._readableState && this._readableState.destroyed, P = this._writableState && this._writableState.destroyed;
    return I || P ? (M ? M(O) : O && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process$1.nextTick(V, this, O)) : process$1.nextTick(V, this, O)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(O || null, function(Y) {
      !M && Y ? D._writableState ? D._writableState.errorEmitted ? process$1.nextTick(U, D) : (D._writableState.errorEmitted = !0, process$1.nextTick(h, D, Y)) : process$1.nextTick(h, D, Y) : M ? (process$1.nextTick(U, D), M(Y)) : process$1.nextTick(U, D);
    }), this);
  }
  function h(O, M) {
    V(O, M), U(O);
  }
  function U(O) {
    O._writableState && !O._writableState.emitClose || O._readableState && !O._readableState.emitClose || O.emit("close");
  }
  function B() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function V(O, M) {
    O.emit("error", M);
  }
  function t(O, M) {
    var D = O._readableState, I = O._writableState;
    D && D.autoDestroy || I && I.autoDestroy ? O.destroy(M) : O.emit("error", M);
  }
  return destroy_1$1 = {
    destroy: $,
    undestroy: B,
    errorOrDestroy: t
  }, destroy_1$1;
}
var errorsBrowser = {}, hasRequiredErrorsBrowser;
function requireErrorsBrowser() {
  if (hasRequiredErrorsBrowser)
    return errorsBrowser;
  hasRequiredErrorsBrowser = 1;
  function $(M, D) {
    M.prototype = Object.create(D.prototype), M.prototype.constructor = M, M.__proto__ = D;
  }
  var h = {};
  function U(M, D, I) {
    I || (I = Error);
    function P(X, ee, re) {
      return typeof D == "string" ? D : D(X, ee, re);
    }
    var Y = /* @__PURE__ */ function(X) {
      $(ee, X);
      function ee(re, ie, ne) {
        return X.call(this, P(re, ie, ne)) || this;
      }
      return ee;
    }(I);
    Y.prototype.name = I.name, Y.prototype.code = M, h[M] = Y;
  }
  function B(M, D) {
    if (Array.isArray(M)) {
      var I = M.length;
      return M = M.map(function(P) {
        return String(P);
      }), I > 2 ? "one of ".concat(D, " ").concat(M.slice(0, I - 1).join(", "), ", or ") + M[I - 1] : I === 2 ? "one of ".concat(D, " ").concat(M[0], " or ").concat(M[1]) : "of ".concat(D, " ").concat(M[0]);
    } else
      return "of ".concat(D, " ").concat(String(M));
  }
  function V(M, D, I) {
    return M.substr(!I || I < 0 ? 0 : +I, D.length) === D;
  }
  function t(M, D, I) {
    return (I === void 0 || I > M.length) && (I = M.length), M.substring(I - D.length, I) === D;
  }
  function O(M, D, I) {
    return typeof I != "number" && (I = 0), I + D.length > M.length ? !1 : M.indexOf(D, I) !== -1;
  }
  return U("ERR_INVALID_OPT_VALUE", function(M, D) {
    return 'The value "' + D + '" is invalid for option "' + M + '"';
  }, TypeError), U("ERR_INVALID_ARG_TYPE", function(M, D, I) {
    var P;
    typeof D == "string" && V(D, "not ") ? (P = "must not be", D = D.replace(/^not /, "")) : P = "must be";
    var Y;
    if (t(M, " argument"))
      Y = "The ".concat(M, " ").concat(P, " ").concat(B(D, "type"));
    else {
      var X = O(M, ".") ? "property" : "argument";
      Y = 'The "'.concat(M, '" ').concat(X, " ").concat(P, " ").concat(B(D, "type"));
    }
    return Y += ". Received type ".concat(typeof I), Y;
  }, TypeError), U("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), U("ERR_METHOD_NOT_IMPLEMENTED", function(M) {
    return "The " + M + " method is not implemented";
  }), U("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), U("ERR_STREAM_DESTROYED", function(M) {
    return "Cannot call " + M + " after a stream was destroyed";
  }), U("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), U("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), U("ERR_STREAM_WRITE_AFTER_END", "write after end"), U("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), U("ERR_UNKNOWN_ENCODING", function(M) {
    return "Unknown encoding: " + M;
  }, TypeError), U("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), errorsBrowser.codes = h, errorsBrowser;
}
var state, hasRequiredState;
function requireState() {
  if (hasRequiredState)
    return state;
  hasRequiredState = 1;
  var $ = requireErrorsBrowser().codes.ERR_INVALID_OPT_VALUE;
  function h(B, V, t) {
    return B.highWaterMark != null ? B.highWaterMark : V ? B[t] : null;
  }
  function U(B, V, t, O) {
    var M = h(V, O, t);
    if (M != null) {
      if (!(isFinite(M) && Math.floor(M) === M) || M < 0) {
        var D = O ? t : "highWaterMark";
        throw new $(D, M);
      }
      return Math.floor(M);
    }
    return B.objectMode ? 16 : 16 * 1024;
  }
  return state = {
    getHighWaterMark: U
  }, state;
}
var browser$a, hasRequiredBrowser$a;
function requireBrowser$a() {
  if (hasRequiredBrowser$a)
    return browser$a;
  hasRequiredBrowser$a = 1, browser$a = $;
  function $(U, B) {
    if (h("noDeprecation"))
      return U;
    var V = !1;
    function t() {
      if (!V) {
        if (h("throwDeprecation"))
          throw new Error(B);
        h("traceDeprecation") ? console.trace(B) : console.warn(B), V = !0;
      }
      return U.apply(this, arguments);
    }
    return t;
  }
  function h(U) {
    try {
      if (!commonjsGlobal.localStorage)
        return !1;
    } catch {
      return !1;
    }
    var B = commonjsGlobal.localStorage[U];
    return B == null ? !1 : String(B).toLowerCase() === "true";
  }
  return browser$a;
}
var _stream_writable$1, hasRequired_stream_writable$1;
function require_stream_writable$1() {
  if (hasRequired_stream_writable$1)
    return _stream_writable$1;
  hasRequired_stream_writable$1 = 1, _stream_writable$1 = he;
  function $(me) {
    var ue = this;
    this.next = null, this.entry = null, this.finish = function() {
      Me(ue, me);
    };
  }
  var h;
  he.WritableState = Se;
  var U = {
    deprecate: requireBrowser$a()
  }, B = requireStreamBrowser$1(), V = requireBuffer$1().Buffer, t = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function O(me) {
    return V.from(me);
  }
  function M(me) {
    return V.isBuffer(me) || me instanceof t;
  }
  var D = requireDestroy$1(), I = requireState(), P = I.getHighWaterMark, Y = requireErrorsBrowser().codes, X = Y.ERR_INVALID_ARG_TYPE, ee = Y.ERR_METHOD_NOT_IMPLEMENTED, re = Y.ERR_MULTIPLE_CALLBACK, ie = Y.ERR_STREAM_CANNOT_PIPE, ne = Y.ERR_STREAM_DESTROYED, se = Y.ERR_STREAM_NULL_VALUES, oe = Y.ERR_STREAM_WRITE_AFTER_END, be = Y.ERR_UNKNOWN_ENCODING, de = D.errorOrDestroy;
  requireInherits_browser()(he, B);
  function we() {
  }
  function Se(me, ue, fe) {
    h = h || require_stream_duplex$1(), me = me || {}, typeof fe != "boolean" && (fe = ue instanceof h), this.objectMode = !!me.objectMode, fe && (this.objectMode = this.objectMode || !!me.writableObjectMode), this.highWaterMark = P(this, me, "writableHighWaterMark", fe), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var Ae = me.decodeStrings === !1;
    this.decodeStrings = !Ae, this.defaultEncoding = me.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(Be) {
      H(ue, Be);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = me.emitClose !== !1, this.autoDestroy = !!me.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new $(this);
  }
  Se.prototype.getBuffer = function() {
    for (var me = this.bufferedRequest, ue = []; me; )
      ue.push(me), me = me.next;
    return ue;
  }, function() {
    try {
      Object.defineProperty(Se.prototype, "buffer", {
        get: U.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var ke;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (ke = Function.prototype[Symbol.hasInstance], Object.defineProperty(he, Symbol.hasInstance, {
    value: function(me) {
      return ke.call(this, me) ? !0 : this !== he ? !1 : me && me._writableState instanceof Se;
    }
  })) : ke = function(me) {
    return me instanceof this;
  };
  function he(me) {
    h = h || require_stream_duplex$1();
    var ue = this instanceof h;
    if (!ue && !ke.call(he, this))
      return new he(me);
    this._writableState = new Se(me, this, ue), this.writable = !0, me && (typeof me.write == "function" && (this._write = me.write), typeof me.writev == "function" && (this._writev = me.writev), typeof me.destroy == "function" && (this._destroy = me.destroy), typeof me.final == "function" && (this._final = me.final)), B.call(this);
  }
  he.prototype.pipe = function() {
    de(this, new ie());
  };
  function le(me, ue) {
    var fe = new oe();
    de(me, fe), process$1.nextTick(ue, fe);
  }
  function _e(me, ue, fe, Ae) {
    var Be;
    return fe === null ? Be = new se() : typeof fe != "string" && !ue.objectMode && (Be = new X("chunk", ["string", "Buffer"], fe)), Be ? (de(me, Be), process$1.nextTick(Ae, Be), !1) : !0;
  }
  he.prototype.write = function(me, ue, fe) {
    var Ae = this._writableState, Be = !1, pe = !Ae.objectMode && M(me);
    return pe && !V.isBuffer(me) && (me = O(me)), typeof ue == "function" && (fe = ue, ue = null), pe ? ue = "buffer" : ue || (ue = Ae.defaultEncoding), typeof fe != "function" && (fe = we), Ae.ending ? le(this, fe) : (pe || _e(this, Ae, me, fe)) && (Ae.pendingcb++, Be = Z(this, Ae, pe, me, ue, fe)), Be;
  }, he.prototype.cork = function() {
    this._writableState.corked++;
  }, he.prototype.uncork = function() {
    var me = this._writableState;
    me.corked && (me.corked--, !me.writing && !me.corked && !me.bufferProcessing && me.bufferedRequest && q(this, me));
  }, he.prototype.setDefaultEncoding = function(me) {
    if (typeof me == "string" && (me = me.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((me + "").toLowerCase()) > -1))
      throw new be(me);
    return this._writableState.defaultEncoding = me, this;
  }, Object.defineProperty(he.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function G(me, ue, fe) {
    return !me.objectMode && me.decodeStrings !== !1 && typeof ue == "string" && (ue = V.from(ue, fe)), ue;
  }
  Object.defineProperty(he.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function Z(me, ue, fe, Ae, Be, pe) {
    if (!fe) {
      var ge = G(ue, Ae, Be);
      Ae !== ge && (fe = !0, Be = "buffer", Ae = ge);
    }
    var Ee = ue.objectMode ? 1 : Ae.length;
    ue.length += Ee;
    var Ie = ue.length < ue.highWaterMark;
    if (Ie || (ue.needDrain = !0), ue.writing || ue.corked) {
      var Pe = ue.lastBufferedRequest;
      ue.lastBufferedRequest = {
        chunk: Ae,
        encoding: Be,
        isBuf: fe,
        callback: pe,
        next: null
      }, Pe ? Pe.next = ue.lastBufferedRequest : ue.bufferedRequest = ue.lastBufferedRequest, ue.bufferedRequestCount += 1;
    } else
      e(me, ue, !1, Ee, Ae, Be, pe);
    return Ie;
  }
  function e(me, ue, fe, Ae, Be, pe, ge) {
    ue.writelen = Ae, ue.writecb = ge, ue.writing = !0, ue.sync = !0, ue.destroyed ? ue.onwrite(new ne("write")) : fe ? me._writev(Be, ue.onwrite) : me._write(Be, pe, ue.onwrite), ue.sync = !1;
  }
  function o(me, ue, fe, Ae, Be) {
    --ue.pendingcb, fe ? (process$1.nextTick(Be, Ae), process$1.nextTick(ce, me, ue), me._writableState.errorEmitted = !0, de(me, Ae)) : (Be(Ae), me._writableState.errorEmitted = !0, de(me, Ae), ce(me, ue));
  }
  function g(me) {
    me.writing = !1, me.writecb = null, me.length -= me.writelen, me.writelen = 0;
  }
  function H(me, ue) {
    var fe = me._writableState, Ae = fe.sync, Be = fe.writecb;
    if (typeof Be != "function")
      throw new re();
    if (g(fe), ue)
      o(me, fe, Ae, ue, Be);
    else {
      var pe = z(fe) || me.destroyed;
      !pe && !fe.corked && !fe.bufferProcessing && fe.bufferedRequest && q(me, fe), Ae ? process$1.nextTick(F, me, fe, pe, Be) : F(me, fe, pe, Be);
    }
  }
  function F(me, ue, fe, Ae) {
    fe || A(me, ue), ue.pendingcb--, Ae(), ce(me, ue);
  }
  function A(me, ue) {
    ue.length === 0 && ue.needDrain && (ue.needDrain = !1, me.emit("drain"));
  }
  function q(me, ue) {
    ue.bufferProcessing = !0;
    var fe = ue.bufferedRequest;
    if (me._writev && fe && fe.next) {
      var Ae = ue.bufferedRequestCount, Be = new Array(Ae), pe = ue.corkedRequestsFree;
      pe.entry = fe;
      for (var ge = 0, Ee = !0; fe; )
        Be[ge] = fe, fe.isBuf || (Ee = !1), fe = fe.next, ge += 1;
      Be.allBuffers = Ee, e(me, ue, !0, ue.length, Be, "", pe.finish), ue.pendingcb++, ue.lastBufferedRequest = null, pe.next ? (ue.corkedRequestsFree = pe.next, pe.next = null) : ue.corkedRequestsFree = new $(ue), ue.bufferedRequestCount = 0;
    } else {
      for (; fe; ) {
        var Ie = fe.chunk, Pe = fe.encoding, Q = fe.callback, K = ue.objectMode ? 1 : Ie.length;
        if (e(me, ue, !1, K, Ie, Pe, Q), fe = fe.next, ue.bufferedRequestCount--, ue.writing)
          break;
      }
      fe === null && (ue.lastBufferedRequest = null);
    }
    ue.bufferedRequest = fe, ue.bufferProcessing = !1;
  }
  he.prototype._write = function(me, ue, fe) {
    fe(new ee("_write()"));
  }, he.prototype._writev = null, he.prototype.end = function(me, ue, fe) {
    var Ae = this._writableState;
    return typeof me == "function" ? (fe = me, me = null, ue = null) : typeof ue == "function" && (fe = ue, ue = null), me != null && this.write(me, ue), Ae.corked && (Ae.corked = 1, this.uncork()), Ae.ending || ye(this, Ae, fe), this;
  }, Object.defineProperty(he.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function z(me) {
    return me.ending && me.length === 0 && me.bufferedRequest === null && !me.finished && !me.writing;
  }
  function S(me, ue) {
    me._final(function(fe) {
      ue.pendingcb--, fe && de(me, fe), ue.prefinished = !0, me.emit("prefinish"), ce(me, ue);
    });
  }
  function J(me, ue) {
    !ue.prefinished && !ue.finalCalled && (typeof me._final == "function" && !ue.destroyed ? (ue.pendingcb++, ue.finalCalled = !0, process$1.nextTick(S, me, ue)) : (ue.prefinished = !0, me.emit("prefinish")));
  }
  function ce(me, ue) {
    var fe = z(ue);
    if (fe && (J(me, ue), ue.pendingcb === 0 && (ue.finished = !0, me.emit("finish"), ue.autoDestroy))) {
      var Ae = me._readableState;
      (!Ae || Ae.autoDestroy && Ae.endEmitted) && me.destroy();
    }
    return fe;
  }
  function ye(me, ue, fe) {
    ue.ending = !0, ce(me, ue), fe && (ue.finished ? process$1.nextTick(fe) : me.once("finish", fe)), ue.ended = !0, me.writable = !1;
  }
  function Me(me, ue, fe) {
    var Ae = me.entry;
    for (me.entry = null; Ae; ) {
      var Be = Ae.callback;
      ue.pendingcb--, Be(fe), Ae = Ae.next;
    }
    ue.corkedRequestsFree.next = me;
  }
  return Object.defineProperty(he.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(me) {
      this._writableState && (this._writableState.destroyed = me);
    }
  }), he.prototype.destroy = D.destroy, he.prototype._undestroy = D.undestroy, he.prototype._destroy = function(me, ue) {
    ue(me);
  }, _stream_writable$1;
}
var _stream_duplex$1, hasRequired_stream_duplex$1;
function require_stream_duplex$1() {
  if (hasRequired_stream_duplex$1)
    return _stream_duplex$1;
  hasRequired_stream_duplex$1 = 1;
  var $ = Object.keys || function(I) {
    var P = [];
    for (var Y in I)
      P.push(Y);
    return P;
  };
  _stream_duplex$1 = O;
  var h = require_stream_readable$1(), U = require_stream_writable$1();
  requireInherits_browser()(O, h);
  for (var B = $(U.prototype), V = 0; V < B.length; V++) {
    var t = B[V];
    O.prototype[t] || (O.prototype[t] = U.prototype[t]);
  }
  function O(I) {
    if (!(this instanceof O))
      return new O(I);
    h.call(this, I), U.call(this, I), this.allowHalfOpen = !0, I && (I.readable === !1 && (this.readable = !1), I.writable === !1 && (this.writable = !1), I.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", M)));
  }
  Object.defineProperty(O.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(O.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(O.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function M() {
    this._writableState.ended || process$1.nextTick(D, this);
  }
  function D(I) {
    I.end();
  }
  return Object.defineProperty(O.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(I) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = I, this._writableState.destroyed = I);
    }
  }), _stream_duplex$1;
}
var string_decoder = {}, hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder)
    return string_decoder;
  hasRequiredString_decoder = 1;
  var $ = requireSafeBuffer$1().Buffer, h = $.isEncoding || function(se) {
    switch (se = "" + se, se && se.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function U(se) {
    if (!se)
      return "utf8";
    for (var oe; ; )
      switch (se) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return se;
        default:
          if (oe)
            return;
          se = ("" + se).toLowerCase(), oe = !0;
      }
  }
  function B(se) {
    var oe = U(se);
    if (typeof oe != "string" && ($.isEncoding === h || !h(se)))
      throw new Error("Unknown encoding: " + se);
    return oe || se;
  }
  string_decoder.StringDecoder = V;
  function V(se) {
    this.encoding = B(se);
    var oe;
    switch (this.encoding) {
      case "utf16le":
        this.text = Y, this.end = X, oe = 4;
        break;
      case "utf8":
        this.fillLast = D, oe = 4;
        break;
      case "base64":
        this.text = ee, this.end = re, oe = 3;
        break;
      default:
        this.write = ie, this.end = ne;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = $.allocUnsafe(oe);
  }
  V.prototype.write = function(se) {
    if (se.length === 0)
      return "";
    var oe, be;
    if (this.lastNeed) {
      if (oe = this.fillLast(se), oe === void 0)
        return "";
      be = this.lastNeed, this.lastNeed = 0;
    } else
      be = 0;
    return be < se.length ? oe ? oe + this.text(se, be) : this.text(se, be) : oe || "";
  }, V.prototype.end = P, V.prototype.text = I, V.prototype.fillLast = function(se) {
    if (this.lastNeed <= se.length)
      return se.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    se.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, se.length), this.lastNeed -= se.length;
  };
  function t(se) {
    return se <= 127 ? 0 : se >> 5 === 6 ? 2 : se >> 4 === 14 ? 3 : se >> 3 === 30 ? 4 : se >> 6 === 2 ? -1 : -2;
  }
  function O(se, oe, be) {
    var de = oe.length - 1;
    if (de < be)
      return 0;
    var we = t(oe[de]);
    return we >= 0 ? (we > 0 && (se.lastNeed = we - 1), we) : --de < be || we === -2 ? 0 : (we = t(oe[de]), we >= 0 ? (we > 0 && (se.lastNeed = we - 2), we) : --de < be || we === -2 ? 0 : (we = t(oe[de]), we >= 0 ? (we > 0 && (we === 2 ? we = 0 : se.lastNeed = we - 3), we) : 0));
  }
  function M(se, oe, be) {
    if ((oe[0] & 192) !== 128)
      return se.lastNeed = 0, "�";
    if (se.lastNeed > 1 && oe.length > 1) {
      if ((oe[1] & 192) !== 128)
        return se.lastNeed = 1, "�";
      if (se.lastNeed > 2 && oe.length > 2 && (oe[2] & 192) !== 128)
        return se.lastNeed = 2, "�";
    }
  }
  function D(se) {
    var oe = this.lastTotal - this.lastNeed, be = M(this, se);
    if (be !== void 0)
      return be;
    if (this.lastNeed <= se.length)
      return se.copy(this.lastChar, oe, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    se.copy(this.lastChar, oe, 0, se.length), this.lastNeed -= se.length;
  }
  function I(se, oe) {
    var be = O(this, se, oe);
    if (!this.lastNeed)
      return se.toString("utf8", oe);
    this.lastTotal = be;
    var de = se.length - (be - this.lastNeed);
    return se.copy(this.lastChar, 0, de), se.toString("utf8", oe, de);
  }
  function P(se) {
    var oe = se && se.length ? this.write(se) : "";
    return this.lastNeed ? oe + "�" : oe;
  }
  function Y(se, oe) {
    if ((se.length - oe) % 2 === 0) {
      var be = se.toString("utf16le", oe);
      if (be) {
        var de = be.charCodeAt(be.length - 1);
        if (de >= 55296 && de <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = se[se.length - 2], this.lastChar[1] = se[se.length - 1], be.slice(0, -1);
      }
      return be;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = se[se.length - 1], se.toString("utf16le", oe, se.length - 1);
  }
  function X(se) {
    var oe = se && se.length ? this.write(se) : "";
    if (this.lastNeed) {
      var be = this.lastTotal - this.lastNeed;
      return oe + this.lastChar.toString("utf16le", 0, be);
    }
    return oe;
  }
  function ee(se, oe) {
    var be = (se.length - oe) % 3;
    return be === 0 ? se.toString("base64", oe) : (this.lastNeed = 3 - be, this.lastTotal = 3, be === 1 ? this.lastChar[0] = se[se.length - 1] : (this.lastChar[0] = se[se.length - 2], this.lastChar[1] = se[se.length - 1]), se.toString("base64", oe, se.length - be));
  }
  function re(se) {
    var oe = se && se.length ? this.write(se) : "";
    return this.lastNeed ? oe + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : oe;
  }
  function ie(se) {
    return se.toString(this.encoding);
  }
  function ne(se) {
    return se && se.length ? this.write(se) : "";
  }
  return string_decoder;
}
var endOfStream, hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream)
    return endOfStream;
  hasRequiredEndOfStream = 1;
  var $ = requireErrorsBrowser().codes.ERR_STREAM_PREMATURE_CLOSE;
  function h(t) {
    var O = !1;
    return function() {
      if (!O) {
        O = !0;
        for (var M = arguments.length, D = new Array(M), I = 0; I < M; I++)
          D[I] = arguments[I];
        t.apply(this, D);
      }
    };
  }
  function U() {
  }
  function B(t) {
    return t.setHeader && typeof t.abort == "function";
  }
  function V(t, O, M) {
    if (typeof O == "function")
      return V(t, null, O);
    O || (O = {}), M = h(M || U);
    var D = O.readable || O.readable !== !1 && t.readable, I = O.writable || O.writable !== !1 && t.writable, P = function() {
      t.writable || X();
    }, Y = t._writableState && t._writableState.finished, X = function() {
      I = !1, Y = !0, D || M.call(t);
    }, ee = t._readableState && t._readableState.endEmitted, re = function() {
      D = !1, ee = !0, I || M.call(t);
    }, ie = function(oe) {
      M.call(t, oe);
    }, ne = function() {
      var oe;
      if (D && !ee)
        return (!t._readableState || !t._readableState.ended) && (oe = new $()), M.call(t, oe);
      if (I && !Y)
        return (!t._writableState || !t._writableState.ended) && (oe = new $()), M.call(t, oe);
    }, se = function() {
      t.req.on("finish", X);
    };
    return B(t) ? (t.on("complete", X), t.on("abort", ne), t.req ? se() : t.on("request", se)) : I && !t._writableState && (t.on("end", P), t.on("close", P)), t.on("end", re), t.on("finish", X), O.error !== !1 && t.on("error", ie), t.on("close", ne), function() {
      t.removeListener("complete", X), t.removeListener("abort", ne), t.removeListener("request", se), t.req && t.req.removeListener("finish", X), t.removeListener("end", P), t.removeListener("close", P), t.removeListener("finish", X), t.removeListener("end", re), t.removeListener("error", ie), t.removeListener("close", ne);
    };
  }
  return endOfStream = V, endOfStream;
}
var async_iterator, hasRequiredAsync_iterator;
function requireAsync_iterator() {
  if (hasRequiredAsync_iterator)
    return async_iterator;
  hasRequiredAsync_iterator = 1;
  var $;
  function h(be, de, we) {
    return de = U(de), de in be ? Object.defineProperty(be, de, { value: we, enumerable: !0, configurable: !0, writable: !0 }) : be[de] = we, be;
  }
  function U(be) {
    var de = B(be, "string");
    return typeof de == "symbol" ? de : String(de);
  }
  function B(be, de) {
    if (typeof be != "object" || be === null)
      return be;
    var we = be[Symbol.toPrimitive];
    if (we !== void 0) {
      var Se = we.call(be, de || "default");
      if (typeof Se != "object")
        return Se;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (de === "string" ? String : Number)(be);
  }
  var V = requireEndOfStream(), t = Symbol("lastResolve"), O = Symbol("lastReject"), M = Symbol("error"), D = Symbol("ended"), I = Symbol("lastPromise"), P = Symbol("handlePromise"), Y = Symbol("stream");
  function X(be, de) {
    return {
      value: be,
      done: de
    };
  }
  function ee(be) {
    var de = be[t];
    if (de !== null) {
      var we = be[Y].read();
      we !== null && (be[I] = null, be[t] = null, be[O] = null, de(X(we, !1)));
    }
  }
  function re(be) {
    process$1.nextTick(ee, be);
  }
  function ie(be, de) {
    return function(we, Se) {
      be.then(function() {
        if (de[D]) {
          we(X(void 0, !0));
          return;
        }
        de[P](we, Se);
      }, Se);
    };
  }
  var ne = Object.getPrototypeOf(function() {
  }), se = Object.setPrototypeOf(($ = {
    get stream() {
      return this[Y];
    },
    next: function() {
      var be = this, de = this[M];
      if (de !== null)
        return Promise.reject(de);
      if (this[D])
        return Promise.resolve(X(void 0, !0));
      if (this[Y].destroyed)
        return new Promise(function(he, le) {
          process$1.nextTick(function() {
            be[M] ? le(be[M]) : he(X(void 0, !0));
          });
        });
      var we = this[I], Se;
      if (we)
        Se = new Promise(ie(we, this));
      else {
        var ke = this[Y].read();
        if (ke !== null)
          return Promise.resolve(X(ke, !1));
        Se = new Promise(this[P]);
      }
      return this[I] = Se, Se;
    }
  }, h($, Symbol.asyncIterator, function() {
    return this;
  }), h($, "return", function() {
    var be = this;
    return new Promise(function(de, we) {
      be[Y].destroy(null, function(Se) {
        if (Se) {
          we(Se);
          return;
        }
        de(X(void 0, !0));
      });
    });
  }), $), ne), oe = function(be) {
    var de, we = Object.create(se, (de = {}, h(de, Y, {
      value: be,
      writable: !0
    }), h(de, t, {
      value: null,
      writable: !0
    }), h(de, O, {
      value: null,
      writable: !0
    }), h(de, M, {
      value: null,
      writable: !0
    }), h(de, D, {
      value: be._readableState.endEmitted,
      writable: !0
    }), h(de, P, {
      value: function(Se, ke) {
        var he = we[Y].read();
        he ? (we[I] = null, we[t] = null, we[O] = null, Se(X(he, !1))) : (we[t] = Se, we[O] = ke);
      },
      writable: !0
    }), de));
    return we[I] = null, V(be, function(Se) {
      if (Se && Se.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var ke = we[O];
        ke !== null && (we[I] = null, we[t] = null, we[O] = null, ke(Se)), we[M] = Se;
        return;
      }
      var he = we[t];
      he !== null && (we[I] = null, we[t] = null, we[O] = null, he(X(void 0, !0))), we[D] = !0;
    }), be.on("readable", re.bind(null, we)), we;
  };
  return async_iterator = oe, async_iterator;
}
var fromBrowser, hasRequiredFromBrowser;
function requireFromBrowser() {
  return hasRequiredFromBrowser || (hasRequiredFromBrowser = 1, fromBrowser = function() {
    throw new Error("Readable.from is not available in the browser");
  }), fromBrowser;
}
var _stream_readable$1, hasRequired_stream_readable$1;
function require_stream_readable$1() {
  if (hasRequired_stream_readable$1)
    return _stream_readable$1;
  hasRequired_stream_readable$1 = 1, _stream_readable$1 = le;
  var $;
  le.ReadableState = he, requireEvents().EventEmitter;
  var h = function(pe, ge) {
    return pe.listeners(ge).length;
  }, U = requireStreamBrowser$1(), B = requireBuffer$1().Buffer, V = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function t(pe) {
    return B.from(pe);
  }
  function O(pe) {
    return B.isBuffer(pe) || pe instanceof V;
  }
  var M = requireUtil$1(), D;
  M && M.debuglog ? D = M.debuglog("stream") : D = function() {
  };
  var I = requireBuffer_list(), P = requireDestroy$1(), Y = requireState(), X = Y.getHighWaterMark, ee = requireErrorsBrowser().codes, re = ee.ERR_INVALID_ARG_TYPE, ie = ee.ERR_STREAM_PUSH_AFTER_EOF, ne = ee.ERR_METHOD_NOT_IMPLEMENTED, se = ee.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, oe, be, de;
  requireInherits_browser()(le, U);
  var we = P.errorOrDestroy, Se = ["error", "close", "destroy", "pause", "resume"];
  function ke(pe, ge, Ee) {
    if (typeof pe.prependListener == "function")
      return pe.prependListener(ge, Ee);
    !pe._events || !pe._events[ge] ? pe.on(ge, Ee) : Array.isArray(pe._events[ge]) ? pe._events[ge].unshift(Ee) : pe._events[ge] = [Ee, pe._events[ge]];
  }
  function he(pe, ge, Ee) {
    $ = $ || require_stream_duplex$1(), pe = pe || {}, typeof Ee != "boolean" && (Ee = ge instanceof $), this.objectMode = !!pe.objectMode, Ee && (this.objectMode = this.objectMode || !!pe.readableObjectMode), this.highWaterMark = X(this, pe, "readableHighWaterMark", Ee), this.buffer = new I(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = pe.emitClose !== !1, this.autoDestroy = !!pe.autoDestroy, this.destroyed = !1, this.defaultEncoding = pe.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, pe.encoding && (oe || (oe = requireString_decoder().StringDecoder), this.decoder = new oe(pe.encoding), this.encoding = pe.encoding);
  }
  function le(pe) {
    if ($ = $ || require_stream_duplex$1(), !(this instanceof le))
      return new le(pe);
    var ge = this instanceof $;
    this._readableState = new he(pe, this, ge), this.readable = !0, pe && (typeof pe.read == "function" && (this._read = pe.read), typeof pe.destroy == "function" && (this._destroy = pe.destroy)), U.call(this);
  }
  Object.defineProperty(le.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(pe) {
      this._readableState && (this._readableState.destroyed = pe);
    }
  }), le.prototype.destroy = P.destroy, le.prototype._undestroy = P.undestroy, le.prototype._destroy = function(pe, ge) {
    ge(pe);
  }, le.prototype.push = function(pe, ge) {
    var Ee = this._readableState, Ie;
    return Ee.objectMode ? Ie = !0 : typeof pe == "string" && (ge = ge || Ee.defaultEncoding, ge !== Ee.encoding && (pe = B.from(pe, ge), ge = ""), Ie = !0), _e(this, pe, ge, !1, Ie);
  }, le.prototype.unshift = function(pe) {
    return _e(this, pe, null, !0, !1);
  };
  function _e(pe, ge, Ee, Ie, Pe) {
    D("readableAddChunk", ge);
    var Q = pe._readableState;
    if (ge === null)
      Q.reading = !1, H(pe, Q);
    else {
      var K;
      if (Pe || (K = Z(Q, ge)), K)
        we(pe, K);
      else if (Q.objectMode || ge && ge.length > 0)
        if (typeof ge != "string" && !Q.objectMode && Object.getPrototypeOf(ge) !== B.prototype && (ge = t(ge)), Ie)
          Q.endEmitted ? we(pe, new se()) : G(pe, Q, ge, !0);
        else if (Q.ended)
          we(pe, new ie());
        else {
          if (Q.destroyed)
            return !1;
          Q.reading = !1, Q.decoder && !Ee ? (ge = Q.decoder.write(ge), Q.objectMode || ge.length !== 0 ? G(pe, Q, ge, !1) : q(pe, Q)) : G(pe, Q, ge, !1);
        }
      else
        Ie || (Q.reading = !1, q(pe, Q));
    }
    return !Q.ended && (Q.length < Q.highWaterMark || Q.length === 0);
  }
  function G(pe, ge, Ee, Ie) {
    ge.flowing && ge.length === 0 && !ge.sync ? (ge.awaitDrain = 0, pe.emit("data", Ee)) : (ge.length += ge.objectMode ? 1 : Ee.length, Ie ? ge.buffer.unshift(Ee) : ge.buffer.push(Ee), ge.needReadable && F(pe)), q(pe, ge);
  }
  function Z(pe, ge) {
    var Ee;
    return !O(ge) && typeof ge != "string" && ge !== void 0 && !pe.objectMode && (Ee = new re("chunk", ["string", "Buffer", "Uint8Array"], ge)), Ee;
  }
  le.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, le.prototype.setEncoding = function(pe) {
    oe || (oe = requireString_decoder().StringDecoder);
    var ge = new oe(pe);
    this._readableState.decoder = ge, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var Ee = this._readableState.buffer.head, Ie = ""; Ee !== null; )
      Ie += ge.write(Ee.data), Ee = Ee.next;
    return this._readableState.buffer.clear(), Ie !== "" && this._readableState.buffer.push(Ie), this._readableState.length = Ie.length, this;
  };
  var e = 1073741824;
  function o(pe) {
    return pe >= e ? pe = e : (pe--, pe |= pe >>> 1, pe |= pe >>> 2, pe |= pe >>> 4, pe |= pe >>> 8, pe |= pe >>> 16, pe++), pe;
  }
  function g(pe, ge) {
    return pe <= 0 || ge.length === 0 && ge.ended ? 0 : ge.objectMode ? 1 : pe !== pe ? ge.flowing && ge.length ? ge.buffer.head.data.length : ge.length : (pe > ge.highWaterMark && (ge.highWaterMark = o(pe)), pe <= ge.length ? pe : ge.ended ? ge.length : (ge.needReadable = !0, 0));
  }
  le.prototype.read = function(pe) {
    D("read", pe), pe = parseInt(pe, 10);
    var ge = this._readableState, Ee = pe;
    if (pe !== 0 && (ge.emittedReadable = !1), pe === 0 && ge.needReadable && ((ge.highWaterMark !== 0 ? ge.length >= ge.highWaterMark : ge.length > 0) || ge.ended))
      return D("read: emitReadable", ge.length, ge.ended), ge.length === 0 && ge.ended ? fe(this) : F(this), null;
    if (pe = g(pe, ge), pe === 0 && ge.ended)
      return ge.length === 0 && fe(this), null;
    var Ie = ge.needReadable;
    D("need readable", Ie), (ge.length === 0 || ge.length - pe < ge.highWaterMark) && (Ie = !0, D("length less than watermark", Ie)), ge.ended || ge.reading ? (Ie = !1, D("reading or ended", Ie)) : Ie && (D("do read"), ge.reading = !0, ge.sync = !0, ge.length === 0 && (ge.needReadable = !0), this._read(ge.highWaterMark), ge.sync = !1, ge.reading || (pe = g(Ee, ge)));
    var Pe;
    return pe > 0 ? Pe = ue(pe, ge) : Pe = null, Pe === null ? (ge.needReadable = ge.length <= ge.highWaterMark, pe = 0) : (ge.length -= pe, ge.awaitDrain = 0), ge.length === 0 && (ge.ended || (ge.needReadable = !0), Ee !== pe && ge.ended && fe(this)), Pe !== null && this.emit("data", Pe), Pe;
  };
  function H(pe, ge) {
    if (D("onEofChunk"), !ge.ended) {
      if (ge.decoder) {
        var Ee = ge.decoder.end();
        Ee && Ee.length && (ge.buffer.push(Ee), ge.length += ge.objectMode ? 1 : Ee.length);
      }
      ge.ended = !0, ge.sync ? F(pe) : (ge.needReadable = !1, ge.emittedReadable || (ge.emittedReadable = !0, A(pe)));
    }
  }
  function F(pe) {
    var ge = pe._readableState;
    D("emitReadable", ge.needReadable, ge.emittedReadable), ge.needReadable = !1, ge.emittedReadable || (D("emitReadable", ge.flowing), ge.emittedReadable = !0, process$1.nextTick(A, pe));
  }
  function A(pe) {
    var ge = pe._readableState;
    D("emitReadable_", ge.destroyed, ge.length, ge.ended), !ge.destroyed && (ge.length || ge.ended) && (pe.emit("readable"), ge.emittedReadable = !1), ge.needReadable = !ge.flowing && !ge.ended && ge.length <= ge.highWaterMark, me(pe);
  }
  function q(pe, ge) {
    ge.readingMore || (ge.readingMore = !0, process$1.nextTick(z, pe, ge));
  }
  function z(pe, ge) {
    for (; !ge.reading && !ge.ended && (ge.length < ge.highWaterMark || ge.flowing && ge.length === 0); ) {
      var Ee = ge.length;
      if (D("maybeReadMore read 0"), pe.read(0), Ee === ge.length)
        break;
    }
    ge.readingMore = !1;
  }
  le.prototype._read = function(pe) {
    we(this, new ne("_read()"));
  }, le.prototype.pipe = function(pe, ge) {
    var Ee = this, Ie = this._readableState;
    switch (Ie.pipesCount) {
      case 0:
        Ie.pipes = pe;
        break;
      case 1:
        Ie.pipes = [Ie.pipes, pe];
        break;
      default:
        Ie.pipes.push(pe);
        break;
    }
    Ie.pipesCount += 1, D("pipe count=%d opts=%j", Ie.pipesCount, ge);
    var Pe = (!ge || ge.end !== !1) && pe !== process$1.stdout && pe !== process$1.stderr, Q = Pe ? te : $e;
    Ie.endEmitted ? process$1.nextTick(Q) : Ee.once("end", Q), pe.on("unpipe", K);
    function K(Ce, Ve) {
      D("onunpipe"), Ce === Ee && Ve && Ve.hasUnpiped === !1 && (Ve.hasUnpiped = !0, qe());
    }
    function te() {
      D("onend"), pe.end();
    }
    var ae = S(Ee);
    pe.on("drain", ae);
    var ve = !1;
    function qe() {
      D("cleanup"), pe.removeListener("close", Le), pe.removeListener("finish", Te), pe.removeListener("drain", ae), pe.removeListener("error", xe), pe.removeListener("unpipe", K), Ee.removeListener("end", te), Ee.removeListener("end", $e), Ee.removeListener("data", Re), ve = !0, Ie.awaitDrain && (!pe._writableState || pe._writableState.needDrain) && ae();
    }
    Ee.on("data", Re);
    function Re(Ce) {
      D("ondata");
      var Ve = pe.write(Ce);
      D("dest.write", Ve), Ve === !1 && ((Ie.pipesCount === 1 && Ie.pipes === pe || Ie.pipesCount > 1 && Be(Ie.pipes, pe) !== -1) && !ve && (D("false write response, pause", Ie.awaitDrain), Ie.awaitDrain++), Ee.pause());
    }
    function xe(Ce) {
      D("onerror", Ce), $e(), pe.removeListener("error", xe), h(pe, "error") === 0 && we(pe, Ce);
    }
    ke(pe, "error", xe);
    function Le() {
      pe.removeListener("finish", Te), $e();
    }
    pe.once("close", Le);
    function Te() {
      D("onfinish"), pe.removeListener("close", Le), $e();
    }
    pe.once("finish", Te);
    function $e() {
      D("unpipe"), Ee.unpipe(pe);
    }
    return pe.emit("pipe", Ee), Ie.flowing || (D("pipe resume"), Ee.resume()), pe;
  };
  function S(pe) {
    return function() {
      var ge = pe._readableState;
      D("pipeOnDrain", ge.awaitDrain), ge.awaitDrain && ge.awaitDrain--, ge.awaitDrain === 0 && h(pe, "data") && (ge.flowing = !0, me(pe));
    };
  }
  le.prototype.unpipe = function(pe) {
    var ge = this._readableState, Ee = {
      hasUnpiped: !1
    };
    if (ge.pipesCount === 0)
      return this;
    if (ge.pipesCount === 1)
      return pe && pe !== ge.pipes ? this : (pe || (pe = ge.pipes), ge.pipes = null, ge.pipesCount = 0, ge.flowing = !1, pe && pe.emit("unpipe", this, Ee), this);
    if (!pe) {
      var Ie = ge.pipes, Pe = ge.pipesCount;
      ge.pipes = null, ge.pipesCount = 0, ge.flowing = !1;
      for (var Q = 0; Q < Pe; Q++)
        Ie[Q].emit("unpipe", this, {
          hasUnpiped: !1
        });
      return this;
    }
    var K = Be(ge.pipes, pe);
    return K === -1 ? this : (ge.pipes.splice(K, 1), ge.pipesCount -= 1, ge.pipesCount === 1 && (ge.pipes = ge.pipes[0]), pe.emit("unpipe", this, Ee), this);
  }, le.prototype.on = function(pe, ge) {
    var Ee = U.prototype.on.call(this, pe, ge), Ie = this._readableState;
    return pe === "data" ? (Ie.readableListening = this.listenerCount("readable") > 0, Ie.flowing !== !1 && this.resume()) : pe === "readable" && !Ie.endEmitted && !Ie.readableListening && (Ie.readableListening = Ie.needReadable = !0, Ie.flowing = !1, Ie.emittedReadable = !1, D("on readable", Ie.length, Ie.reading), Ie.length ? F(this) : Ie.reading || process$1.nextTick(ce, this)), Ee;
  }, le.prototype.addListener = le.prototype.on, le.prototype.removeListener = function(pe, ge) {
    var Ee = U.prototype.removeListener.call(this, pe, ge);
    return pe === "readable" && process$1.nextTick(J, this), Ee;
  }, le.prototype.removeAllListeners = function(pe) {
    var ge = U.prototype.removeAllListeners.apply(this, arguments);
    return (pe === "readable" || pe === void 0) && process$1.nextTick(J, this), ge;
  };
  function J(pe) {
    var ge = pe._readableState;
    ge.readableListening = pe.listenerCount("readable") > 0, ge.resumeScheduled && !ge.paused ? ge.flowing = !0 : pe.listenerCount("data") > 0 && pe.resume();
  }
  function ce(pe) {
    D("readable nexttick read 0"), pe.read(0);
  }
  le.prototype.resume = function() {
    var pe = this._readableState;
    return pe.flowing || (D("resume"), pe.flowing = !pe.readableListening, ye(this, pe)), pe.paused = !1, this;
  };
  function ye(pe, ge) {
    ge.resumeScheduled || (ge.resumeScheduled = !0, process$1.nextTick(Me, pe, ge));
  }
  function Me(pe, ge) {
    D("resume", ge.reading), ge.reading || pe.read(0), ge.resumeScheduled = !1, pe.emit("resume"), me(pe), ge.flowing && !ge.reading && pe.read(0);
  }
  le.prototype.pause = function() {
    return D("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (D("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function me(pe) {
    var ge = pe._readableState;
    for (D("flow", ge.flowing); ge.flowing && pe.read() !== null; )
      ;
  }
  le.prototype.wrap = function(pe) {
    var ge = this, Ee = this._readableState, Ie = !1;
    pe.on("end", function() {
      if (D("wrapped end"), Ee.decoder && !Ee.ended) {
        var K = Ee.decoder.end();
        K && K.length && ge.push(K);
      }
      ge.push(null);
    }), pe.on("data", function(K) {
      if (D("wrapped data"), Ee.decoder && (K = Ee.decoder.write(K)), !(Ee.objectMode && K == null) && !(!Ee.objectMode && (!K || !K.length))) {
        var te = ge.push(K);
        te || (Ie = !0, pe.pause());
      }
    });
    for (var Pe in pe)
      this[Pe] === void 0 && typeof pe[Pe] == "function" && (this[Pe] = /* @__PURE__ */ function(K) {
        return function() {
          return pe[K].apply(pe, arguments);
        };
      }(Pe));
    for (var Q = 0; Q < Se.length; Q++)
      pe.on(Se[Q], this.emit.bind(this, Se[Q]));
    return this._read = function(K) {
      D("wrapped _read", K), Ie && (Ie = !1, pe.resume());
    }, this;
  }, typeof Symbol == "function" && (le.prototype[Symbol.asyncIterator] = function() {
    return be === void 0 && (be = requireAsync_iterator()), be(this);
  }), Object.defineProperty(le.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(le.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(le.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(pe) {
      this._readableState && (this._readableState.flowing = pe);
    }
  }), le._fromList = ue, Object.defineProperty(le.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function ue(pe, ge) {
    if (ge.length === 0)
      return null;
    var Ee;
    return ge.objectMode ? Ee = ge.buffer.shift() : !pe || pe >= ge.length ? (ge.decoder ? Ee = ge.buffer.join("") : ge.buffer.length === 1 ? Ee = ge.buffer.first() : Ee = ge.buffer.concat(ge.length), ge.buffer.clear()) : Ee = ge.buffer.consume(pe, ge.decoder), Ee;
  }
  function fe(pe) {
    var ge = pe._readableState;
    D("endReadable", ge.endEmitted), ge.endEmitted || (ge.ended = !0, process$1.nextTick(Ae, ge, pe));
  }
  function Ae(pe, ge) {
    if (D("endReadableNT", pe.endEmitted, pe.length), !pe.endEmitted && pe.length === 0 && (pe.endEmitted = !0, ge.readable = !1, ge.emit("end"), pe.autoDestroy)) {
      var Ee = ge._writableState;
      (!Ee || Ee.autoDestroy && Ee.finished) && ge.destroy();
    }
  }
  typeof Symbol == "function" && (le.from = function(pe, ge) {
    return de === void 0 && (de = requireFromBrowser()), de(le, pe, ge);
  });
  function Be(pe, ge) {
    for (var Ee = 0, Ie = pe.length; Ee < Ie; Ee++)
      if (pe[Ee] === ge)
        return Ee;
    return -1;
  }
  return _stream_readable$1;
}
var _stream_transform$1, hasRequired_stream_transform$1;
function require_stream_transform$1() {
  if (hasRequired_stream_transform$1)
    return _stream_transform$1;
  hasRequired_stream_transform$1 = 1, _stream_transform$1 = M;
  var $ = requireErrorsBrowser().codes, h = $.ERR_METHOD_NOT_IMPLEMENTED, U = $.ERR_MULTIPLE_CALLBACK, B = $.ERR_TRANSFORM_ALREADY_TRANSFORMING, V = $.ERR_TRANSFORM_WITH_LENGTH_0, t = require_stream_duplex$1();
  requireInherits_browser()(M, t);
  function O(P, Y) {
    var X = this._transformState;
    X.transforming = !1;
    var ee = X.writecb;
    if (ee === null)
      return this.emit("error", new U());
    X.writechunk = null, X.writecb = null, Y != null && this.push(Y), ee(P);
    var re = this._readableState;
    re.reading = !1, (re.needReadable || re.length < re.highWaterMark) && this._read(re.highWaterMark);
  }
  function M(P) {
    if (!(this instanceof M))
      return new M(P);
    t.call(this, P), this._transformState = {
      afterTransform: O.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, P && (typeof P.transform == "function" && (this._transform = P.transform), typeof P.flush == "function" && (this._flush = P.flush)), this.on("prefinish", D);
  }
  function D() {
    var P = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(Y, X) {
      I(P, Y, X);
    }) : I(this, null, null);
  }
  M.prototype.push = function(P, Y) {
    return this._transformState.needTransform = !1, t.prototype.push.call(this, P, Y);
  }, M.prototype._transform = function(P, Y, X) {
    X(new h("_transform()"));
  }, M.prototype._write = function(P, Y, X) {
    var ee = this._transformState;
    if (ee.writecb = X, ee.writechunk = P, ee.writeencoding = Y, !ee.transforming) {
      var re = this._readableState;
      (ee.needTransform || re.needReadable || re.length < re.highWaterMark) && this._read(re.highWaterMark);
    }
  }, M.prototype._read = function(P) {
    var Y = this._transformState;
    Y.writechunk !== null && !Y.transforming ? (Y.transforming = !0, this._transform(Y.writechunk, Y.writeencoding, Y.afterTransform)) : Y.needTransform = !0;
  }, M.prototype._destroy = function(P, Y) {
    t.prototype._destroy.call(this, P, function(X) {
      Y(X);
    });
  };
  function I(P, Y, X) {
    if (Y)
      return P.emit("error", Y);
    if (X != null && P.push(X), P._writableState.length)
      throw new V();
    if (P._transformState.transforming)
      throw new B();
    return P.push(null);
  }
  return _stream_transform$1;
}
var _stream_passthrough$1, hasRequired_stream_passthrough$1;
function require_stream_passthrough$1() {
  if (hasRequired_stream_passthrough$1)
    return _stream_passthrough$1;
  hasRequired_stream_passthrough$1 = 1, _stream_passthrough$1 = h;
  var $ = require_stream_transform$1();
  requireInherits_browser()(h, $);
  function h(U) {
    if (!(this instanceof h))
      return new h(U);
    $.call(this, U);
  }
  return h.prototype._transform = function(U, B, V) {
    V(null, U);
  }, _stream_passthrough$1;
}
var pipeline_1, hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline)
    return pipeline_1;
  hasRequiredPipeline = 1;
  var $;
  function h(X) {
    var ee = !1;
    return function() {
      ee || (ee = !0, X.apply(void 0, arguments));
    };
  }
  var U = requireErrorsBrowser().codes, B = U.ERR_MISSING_ARGS, V = U.ERR_STREAM_DESTROYED;
  function t(X) {
    if (X)
      throw X;
  }
  function O(X) {
    return X.setHeader && typeof X.abort == "function";
  }
  function M(X, ee, re, ie) {
    ie = h(ie);
    var ne = !1;
    X.on("close", function() {
      ne = !0;
    }), $ === void 0 && ($ = requireEndOfStream()), $(X, {
      readable: ee,
      writable: re
    }, function(oe) {
      if (oe)
        return ie(oe);
      ne = !0, ie();
    });
    var se = !1;
    return function(oe) {
      if (!ne && !se) {
        if (se = !0, O(X))
          return X.abort();
        if (typeof X.destroy == "function")
          return X.destroy();
        ie(oe || new V("pipe"));
      }
    };
  }
  function D(X) {
    X();
  }
  function I(X, ee) {
    return X.pipe(ee);
  }
  function P(X) {
    return !X.length || typeof X[X.length - 1] != "function" ? t : X.pop();
  }
  function Y() {
    for (var X = arguments.length, ee = new Array(X), re = 0; re < X; re++)
      ee[re] = arguments[re];
    var ie = P(ee);
    if (Array.isArray(ee[0]) && (ee = ee[0]), ee.length < 2)
      throw new B("streams");
    var ne, se = ee.map(function(oe, be) {
      var de = be < ee.length - 1, we = be > 0;
      return M(oe, de, we, function(Se) {
        ne || (ne = Se), Se && se.forEach(D), !de && (se.forEach(D), ie(ne));
      });
    });
    return ee.reduce(I);
  }
  return pipeline_1 = Y, pipeline_1;
}
var hasRequiredReadableBrowser$1;
function requireReadableBrowser$1() {
  return hasRequiredReadableBrowser$1 || (hasRequiredReadableBrowser$1 = 1, function($, h) {
    h = $.exports = require_stream_readable$1(), h.Stream = h, h.Readable = h, h.Writable = require_stream_writable$1(), h.Duplex = require_stream_duplex$1(), h.Transform = require_stream_transform$1(), h.PassThrough = require_stream_passthrough$1(), h.finished = requireEndOfStream(), h.pipeline = requirePipeline();
  }(readableBrowser$1, readableBrowser$1.exports)), readableBrowser$1.exports;
}
var hashBase$1, hasRequiredHashBase$1;
function requireHashBase$1() {
  if (hasRequiredHashBase$1)
    return hashBase$1;
  hasRequiredHashBase$1 = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireReadableBrowser$1().Transform, U = requireInherits_browser();
  function B(t, O) {
    if (!$.isBuffer(t) && typeof t != "string")
      throw new TypeError(O + " must be a string or a buffer");
  }
  function V(t) {
    h.call(this), this._block = $.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return U(V, h), V.prototype._transform = function(t, O, M) {
    var D = null;
    try {
      this.update(t, O);
    } catch (I) {
      D = I;
    }
    M(D);
  }, V.prototype._flush = function(t) {
    var O = null;
    try {
      this.push(this.digest());
    } catch (M) {
      O = M;
    }
    t(O);
  }, V.prototype.update = function(t, O) {
    if (B(t, "Data"), this._finalized)
      throw new Error("Digest already called");
    $.isBuffer(t) || (t = $.from(t, O));
    for (var M = this._block, D = 0; this._blockOffset + t.length - D >= this._blockSize; ) {
      for (var I = this._blockOffset; I < this._blockSize; )
        M[I++] = t[D++];
      this._update(), this._blockOffset = 0;
    }
    for (; D < t.length; )
      M[this._blockOffset++] = t[D++];
    for (var P = 0, Y = t.length * 8; Y > 0; ++P)
      this._length[P] += Y, Y = this._length[P] / 4294967296 | 0, Y > 0 && (this._length[P] -= 4294967296 * Y);
    return this;
  }, V.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, V.prototype.digest = function(t) {
    if (this._finalized)
      throw new Error("Digest already called");
    this._finalized = !0;
    var O = this._digest();
    t !== void 0 && (O = O.toString(t)), this._block.fill(0), this._blockOffset = 0;
    for (var M = 0; M < 4; ++M)
      this._length[M] = 0;
    return O;
  }, V.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase$1 = V, hashBase$1;
}
var md5_js, hasRequiredMd5_js;
function requireMd5_js() {
  if (hasRequiredMd5_js)
    return md5_js;
  hasRequiredMd5_js = 1;
  var $ = requireInherits_browser(), h = requireHashBase$1(), U = requireSafeBuffer$1().Buffer, B = new Array(16);
  function V() {
    h.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878;
  }
  $(V, h), V.prototype._update = function() {
    for (var P = B, Y = 0; Y < 16; ++Y)
      P[Y] = this._block.readInt32LE(Y * 4);
    var X = this._a, ee = this._b, re = this._c, ie = this._d;
    X = O(X, ee, re, ie, P[0], 3614090360, 7), ie = O(ie, X, ee, re, P[1], 3905402710, 12), re = O(re, ie, X, ee, P[2], 606105819, 17), ee = O(ee, re, ie, X, P[3], 3250441966, 22), X = O(X, ee, re, ie, P[4], 4118548399, 7), ie = O(ie, X, ee, re, P[5], 1200080426, 12), re = O(re, ie, X, ee, P[6], 2821735955, 17), ee = O(ee, re, ie, X, P[7], 4249261313, 22), X = O(X, ee, re, ie, P[8], 1770035416, 7), ie = O(ie, X, ee, re, P[9], 2336552879, 12), re = O(re, ie, X, ee, P[10], 4294925233, 17), ee = O(ee, re, ie, X, P[11], 2304563134, 22), X = O(X, ee, re, ie, P[12], 1804603682, 7), ie = O(ie, X, ee, re, P[13], 4254626195, 12), re = O(re, ie, X, ee, P[14], 2792965006, 17), ee = O(ee, re, ie, X, P[15], 1236535329, 22), X = M(X, ee, re, ie, P[1], 4129170786, 5), ie = M(ie, X, ee, re, P[6], 3225465664, 9), re = M(re, ie, X, ee, P[11], 643717713, 14), ee = M(ee, re, ie, X, P[0], 3921069994, 20), X = M(X, ee, re, ie, P[5], 3593408605, 5), ie = M(ie, X, ee, re, P[10], 38016083, 9), re = M(re, ie, X, ee, P[15], 3634488961, 14), ee = M(ee, re, ie, X, P[4], 3889429448, 20), X = M(X, ee, re, ie, P[9], 568446438, 5), ie = M(ie, X, ee, re, P[14], 3275163606, 9), re = M(re, ie, X, ee, P[3], 4107603335, 14), ee = M(ee, re, ie, X, P[8], 1163531501, 20), X = M(X, ee, re, ie, P[13], 2850285829, 5), ie = M(ie, X, ee, re, P[2], 4243563512, 9), re = M(re, ie, X, ee, P[7], 1735328473, 14), ee = M(ee, re, ie, X, P[12], 2368359562, 20), X = D(X, ee, re, ie, P[5], 4294588738, 4), ie = D(ie, X, ee, re, P[8], 2272392833, 11), re = D(re, ie, X, ee, P[11], 1839030562, 16), ee = D(ee, re, ie, X, P[14], 4259657740, 23), X = D(X, ee, re, ie, P[1], 2763975236, 4), ie = D(ie, X, ee, re, P[4], 1272893353, 11), re = D(re, ie, X, ee, P[7], 4139469664, 16), ee = D(ee, re, ie, X, P[10], 3200236656, 23), X = D(X, ee, re, ie, P[13], 681279174, 4), ie = D(ie, X, ee, re, P[0], 3936430074, 11), re = D(re, ie, X, ee, P[3], 3572445317, 16), ee = D(ee, re, ie, X, P[6], 76029189, 23), X = D(X, ee, re, ie, P[9], 3654602809, 4), ie = D(ie, X, ee, re, P[12], 3873151461, 11), re = D(re, ie, X, ee, P[15], 530742520, 16), ee = D(ee, re, ie, X, P[2], 3299628645, 23), X = I(X, ee, re, ie, P[0], 4096336452, 6), ie = I(ie, X, ee, re, P[7], 1126891415, 10), re = I(re, ie, X, ee, P[14], 2878612391, 15), ee = I(ee, re, ie, X, P[5], 4237533241, 21), X = I(X, ee, re, ie, P[12], 1700485571, 6), ie = I(ie, X, ee, re, P[3], 2399980690, 10), re = I(re, ie, X, ee, P[10], 4293915773, 15), ee = I(ee, re, ie, X, P[1], 2240044497, 21), X = I(X, ee, re, ie, P[8], 1873313359, 6), ie = I(ie, X, ee, re, P[15], 4264355552, 10), re = I(re, ie, X, ee, P[6], 2734768916, 15), ee = I(ee, re, ie, X, P[13], 1309151649, 21), X = I(X, ee, re, ie, P[4], 4149444226, 6), ie = I(ie, X, ee, re, P[11], 3174756917, 10), re = I(re, ie, X, ee, P[2], 718787259, 15), ee = I(ee, re, ie, X, P[9], 3951481745, 21), this._a = this._a + X | 0, this._b = this._b + ee | 0, this._c = this._c + re | 0, this._d = this._d + ie | 0;
  }, V.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var P = U.allocUnsafe(16);
    return P.writeInt32LE(this._a, 0), P.writeInt32LE(this._b, 4), P.writeInt32LE(this._c, 8), P.writeInt32LE(this._d, 12), P;
  };
  function t(P, Y) {
    return P << Y | P >>> 32 - Y;
  }
  function O(P, Y, X, ee, re, ie, ne) {
    return t(P + (Y & X | ~Y & ee) + re + ie | 0, ne) + Y | 0;
  }
  function M(P, Y, X, ee, re, ie, ne) {
    return t(P + (Y & ee | X & ~ee) + re + ie | 0, ne) + Y | 0;
  }
  function D(P, Y, X, ee, re, ie, ne) {
    return t(P + (Y ^ X ^ ee) + re + ie | 0, ne) + Y | 0;
  }
  function I(P, Y, X, ee, re, ie, ne) {
    return t(P + (X ^ (Y | ~ee)) + re + ie | 0, ne) + Y | 0;
  }
  return md5_js = V, md5_js;
}
var hashBase, hasRequiredHashBase;
function requireHashBase() {
  if (hasRequiredHashBase)
    return hashBase;
  hasRequiredHashBase = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireReadableBrowser$1().Transform, U = requireInherits_browser();
  function B(t, O) {
    if (!$.isBuffer(t) && typeof t != "string")
      throw new TypeError(O + " must be a string or a buffer");
  }
  function V(t) {
    h.call(this), this._block = $.allocUnsafe(t), this._blockSize = t, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return U(V, h), V.prototype._transform = function(t, O, M) {
    var D = null;
    try {
      this.update(t, O);
    } catch (I) {
      D = I;
    }
    M(D);
  }, V.prototype._flush = function(t) {
    var O = null;
    try {
      this.push(this.digest());
    } catch (M) {
      O = M;
    }
    t(O);
  }, V.prototype.update = function(t, O) {
    if (B(t, "Data"), this._finalized)
      throw new Error("Digest already called");
    $.isBuffer(t) || (t = $.from(t, O));
    for (var M = this._block, D = 0; this._blockOffset + t.length - D >= this._blockSize; ) {
      for (var I = this._blockOffset; I < this._blockSize; )
        M[I++] = t[D++];
      this._update(), this._blockOffset = 0;
    }
    for (; D < t.length; )
      M[this._blockOffset++] = t[D++];
    for (var P = 0, Y = t.length * 8; Y > 0; ++P)
      this._length[P] += Y, Y = this._length[P] / 4294967296 | 0, Y > 0 && (this._length[P] -= 4294967296 * Y);
    return this;
  }, V.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, V.prototype.digest = function(t) {
    if (this._finalized)
      throw new Error("Digest already called");
    this._finalized = !0;
    var O = this._digest();
    t !== void 0 && (O = O.toString(t)), this._block.fill(0), this._blockOffset = 0;
    for (var M = 0; M < 4; ++M)
      this._length[M] = 0;
    return O;
  }, V.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase = V, hashBase;
}
var ripemd160, hasRequiredRipemd160;
function requireRipemd160() {
  if (hasRequiredRipemd160)
    return ripemd160;
  hasRequiredRipemd160 = 1;
  var $ = requireBuffer$1().Buffer, h = requireInherits_browser(), U = requireHashBase(), B = new Array(16), V = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], t = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], O = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], M = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ], D = [0, 1518500249, 1859775393, 2400959708, 2840853838], I = [1352829926, 1548603684, 1836072691, 2053994217, 0];
  function P() {
    U.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520;
  }
  h(P, U), P.prototype._update = function() {
    for (var se = B, oe = 0; oe < 16; ++oe)
      se[oe] = this._block.readInt32LE(oe * 4);
    for (var be = this._a | 0, de = this._b | 0, we = this._c | 0, Se = this._d | 0, ke = this._e | 0, he = this._a | 0, le = this._b | 0, _e = this._c | 0, G = this._d | 0, Z = this._e | 0, e = 0; e < 80; e += 1) {
      var o, g;
      e < 16 ? (o = X(be, de, we, Se, ke, se[V[e]], D[0], O[e]), g = ne(he, le, _e, G, Z, se[t[e]], I[0], M[e])) : e < 32 ? (o = ee(be, de, we, Se, ke, se[V[e]], D[1], O[e]), g = ie(he, le, _e, G, Z, se[t[e]], I[1], M[e])) : e < 48 ? (o = re(be, de, we, Se, ke, se[V[e]], D[2], O[e]), g = re(he, le, _e, G, Z, se[t[e]], I[2], M[e])) : e < 64 ? (o = ie(be, de, we, Se, ke, se[V[e]], D[3], O[e]), g = ee(he, le, _e, G, Z, se[t[e]], I[3], M[e])) : (o = ne(be, de, we, Se, ke, se[V[e]], D[4], O[e]), g = X(he, le, _e, G, Z, se[t[e]], I[4], M[e])), be = ke, ke = Se, Se = Y(we, 10), we = de, de = o, he = Z, Z = G, G = Y(_e, 10), _e = le, le = g;
    }
    var H = this._b + we + G | 0;
    this._b = this._c + Se + Z | 0, this._c = this._d + ke + he | 0, this._d = this._e + be + le | 0, this._e = this._a + de + _e | 0, this._a = H;
  }, P.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var se = $.alloc ? $.alloc(20) : new $(20);
    return se.writeInt32LE(this._a, 0), se.writeInt32LE(this._b, 4), se.writeInt32LE(this._c, 8), se.writeInt32LE(this._d, 12), se.writeInt32LE(this._e, 16), se;
  };
  function Y(se, oe) {
    return se << oe | se >>> 32 - oe;
  }
  function X(se, oe, be, de, we, Se, ke, he) {
    return Y(se + (oe ^ be ^ de) + Se + ke | 0, he) + we | 0;
  }
  function ee(se, oe, be, de, we, Se, ke, he) {
    return Y(se + (oe & be | ~oe & de) + Se + ke | 0, he) + we | 0;
  }
  function re(se, oe, be, de, we, Se, ke, he) {
    return Y(se + ((oe | ~be) ^ de) + Se + ke | 0, he) + we | 0;
  }
  function ie(se, oe, be, de, we, Se, ke, he) {
    return Y(se + (oe & de | be & ~de) + Se + ke | 0, he) + we | 0;
  }
  function ne(se, oe, be, de, we, Se, ke, he) {
    return Y(se + (oe ^ (be | ~de)) + Se + ke | 0, he) + we | 0;
  }
  return ripemd160 = P, ripemd160;
}
var sha_js = { exports: {} }, hash$1, hasRequiredHash$1;
function requireHash$1() {
  if (hasRequiredHash$1)
    return hash$1;
  hasRequiredHash$1 = 1;
  var $ = requireSafeBuffer$1().Buffer;
  function h(U, B) {
    this._block = $.alloc(U), this._finalSize = B, this._blockSize = U, this._len = 0;
  }
  return h.prototype.update = function(U, B) {
    typeof U == "string" && (B = B || "utf8", U = $.from(U, B));
    for (var V = this._block, t = this._blockSize, O = U.length, M = this._len, D = 0; D < O; ) {
      for (var I = M % t, P = Math.min(O - D, t - I), Y = 0; Y < P; Y++)
        V[I + Y] = U[D + Y];
      M += P, D += P, M % t === 0 && this._update(V);
    }
    return this._len += O, this;
  }, h.prototype.digest = function(U) {
    var B = this._len % this._blockSize;
    this._block[B] = 128, this._block.fill(0, B + 1), B >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var V = this._len * 8;
    if (V <= 4294967295)
      this._block.writeUInt32BE(V, this._blockSize - 4);
    else {
      var t = (V & 4294967295) >>> 0, O = (V - t) / 4294967296;
      this._block.writeUInt32BE(O, this._blockSize - 8), this._block.writeUInt32BE(t, this._blockSize - 4);
    }
    this._update(this._block);
    var M = this._hash();
    return U ? M.toString(U) : M;
  }, h.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, hash$1 = h, hash$1;
}
var sha$1, hasRequiredSha$1;
function requireSha$1() {
  if (hasRequiredSha$1)
    return sha$1;
  hasRequiredSha$1 = 1;
  var $ = requireInherits_browser(), h = requireHash$1(), U = requireSafeBuffer$1().Buffer, B = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], V = new Array(80);
  function t() {
    this.init(), this._w = V, h.call(this, 64, 56);
  }
  $(t, h), t.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function O(I) {
    return I << 5 | I >>> 27;
  }
  function M(I) {
    return I << 30 | I >>> 2;
  }
  function D(I, P, Y, X) {
    return I === 0 ? P & Y | ~P & X : I === 2 ? P & Y | P & X | Y & X : P ^ Y ^ X;
  }
  return t.prototype._update = function(I) {
    for (var P = this._w, Y = this._a | 0, X = this._b | 0, ee = this._c | 0, re = this._d | 0, ie = this._e | 0, ne = 0; ne < 16; ++ne)
      P[ne] = I.readInt32BE(ne * 4);
    for (; ne < 80; ++ne)
      P[ne] = P[ne - 3] ^ P[ne - 8] ^ P[ne - 14] ^ P[ne - 16];
    for (var se = 0; se < 80; ++se) {
      var oe = ~~(se / 20), be = O(Y) + D(oe, X, ee, re) + ie + P[se] + B[oe] | 0;
      ie = re, re = ee, ee = M(X), X = Y, Y = be;
    }
    this._a = Y + this._a | 0, this._b = X + this._b | 0, this._c = ee + this._c | 0, this._d = re + this._d | 0, this._e = ie + this._e | 0;
  }, t.prototype._hash = function() {
    var I = U.allocUnsafe(20);
    return I.writeInt32BE(this._a | 0, 0), I.writeInt32BE(this._b | 0, 4), I.writeInt32BE(this._c | 0, 8), I.writeInt32BE(this._d | 0, 12), I.writeInt32BE(this._e | 0, 16), I;
  }, sha$1 = t, sha$1;
}
var sha1, hasRequiredSha1;
function requireSha1() {
  if (hasRequiredSha1)
    return sha1;
  hasRequiredSha1 = 1;
  var $ = requireInherits_browser(), h = requireHash$1(), U = requireSafeBuffer$1().Buffer, B = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], V = new Array(80);
  function t() {
    this.init(), this._w = V, h.call(this, 64, 56);
  }
  $(t, h), t.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function O(P) {
    return P << 1 | P >>> 31;
  }
  function M(P) {
    return P << 5 | P >>> 27;
  }
  function D(P) {
    return P << 30 | P >>> 2;
  }
  function I(P, Y, X, ee) {
    return P === 0 ? Y & X | ~Y & ee : P === 2 ? Y & X | Y & ee | X & ee : Y ^ X ^ ee;
  }
  return t.prototype._update = function(P) {
    for (var Y = this._w, X = this._a | 0, ee = this._b | 0, re = this._c | 0, ie = this._d | 0, ne = this._e | 0, se = 0; se < 16; ++se)
      Y[se] = P.readInt32BE(se * 4);
    for (; se < 80; ++se)
      Y[se] = O(Y[se - 3] ^ Y[se - 8] ^ Y[se - 14] ^ Y[se - 16]);
    for (var oe = 0; oe < 80; ++oe) {
      var be = ~~(oe / 20), de = M(X) + I(be, ee, re, ie) + ne + Y[oe] + B[be] | 0;
      ne = ie, ie = re, re = D(ee), ee = X, X = de;
    }
    this._a = X + this._a | 0, this._b = ee + this._b | 0, this._c = re + this._c | 0, this._d = ie + this._d | 0, this._e = ne + this._e | 0;
  }, t.prototype._hash = function() {
    var P = U.allocUnsafe(20);
    return P.writeInt32BE(this._a | 0, 0), P.writeInt32BE(this._b | 0, 4), P.writeInt32BE(this._c | 0, 8), P.writeInt32BE(this._d | 0, 12), P.writeInt32BE(this._e | 0, 16), P;
  }, sha1 = t, sha1;
}
var sha256$1, hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256)
    return sha256$1;
  hasRequiredSha256 = 1;
  var $ = requireInherits_browser(), h = requireHash$1(), U = requireSafeBuffer$1().Buffer, B = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], V = new Array(64);
  function t() {
    this.init(), this._w = V, h.call(this, 64, 56);
  }
  $(t, h), t.prototype.init = function() {
    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this;
  };
  function O(X, ee, re) {
    return re ^ X & (ee ^ re);
  }
  function M(X, ee, re) {
    return X & ee | re & (X | ee);
  }
  function D(X) {
    return (X >>> 2 | X << 30) ^ (X >>> 13 | X << 19) ^ (X >>> 22 | X << 10);
  }
  function I(X) {
    return (X >>> 6 | X << 26) ^ (X >>> 11 | X << 21) ^ (X >>> 25 | X << 7);
  }
  function P(X) {
    return (X >>> 7 | X << 25) ^ (X >>> 18 | X << 14) ^ X >>> 3;
  }
  function Y(X) {
    return (X >>> 17 | X << 15) ^ (X >>> 19 | X << 13) ^ X >>> 10;
  }
  return t.prototype._update = function(X) {
    for (var ee = this._w, re = this._a | 0, ie = this._b | 0, ne = this._c | 0, se = this._d | 0, oe = this._e | 0, be = this._f | 0, de = this._g | 0, we = this._h | 0, Se = 0; Se < 16; ++Se)
      ee[Se] = X.readInt32BE(Se * 4);
    for (; Se < 64; ++Se)
      ee[Se] = Y(ee[Se - 2]) + ee[Se - 7] + P(ee[Se - 15]) + ee[Se - 16] | 0;
    for (var ke = 0; ke < 64; ++ke) {
      var he = we + I(oe) + O(oe, be, de) + B[ke] + ee[ke] | 0, le = D(re) + M(re, ie, ne) | 0;
      we = de, de = be, be = oe, oe = se + he | 0, se = ne, ne = ie, ie = re, re = he + le | 0;
    }
    this._a = re + this._a | 0, this._b = ie + this._b | 0, this._c = ne + this._c | 0, this._d = se + this._d | 0, this._e = oe + this._e | 0, this._f = be + this._f | 0, this._g = de + this._g | 0, this._h = we + this._h | 0;
  }, t.prototype._hash = function() {
    var X = U.allocUnsafe(32);
    return X.writeInt32BE(this._a, 0), X.writeInt32BE(this._b, 4), X.writeInt32BE(this._c, 8), X.writeInt32BE(this._d, 12), X.writeInt32BE(this._e, 16), X.writeInt32BE(this._f, 20), X.writeInt32BE(this._g, 24), X.writeInt32BE(this._h, 28), X;
  }, sha256$1 = t, sha256$1;
}
var sha224$1, hasRequiredSha224;
function requireSha224() {
  if (hasRequiredSha224)
    return sha224$1;
  hasRequiredSha224 = 1;
  var $ = requireInherits_browser(), h = requireSha256(), U = requireHash$1(), B = requireSafeBuffer$1().Buffer, V = new Array(64);
  function t() {
    this.init(), this._w = V, U.call(this, 64, 56);
  }
  return $(t, h), t.prototype.init = function() {
    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this;
  }, t.prototype._hash = function() {
    var O = B.allocUnsafe(28);
    return O.writeInt32BE(this._a, 0), O.writeInt32BE(this._b, 4), O.writeInt32BE(this._c, 8), O.writeInt32BE(this._d, 12), O.writeInt32BE(this._e, 16), O.writeInt32BE(this._f, 20), O.writeInt32BE(this._g, 24), O;
  }, sha224$1 = t, sha224$1;
}
var sha512$1, hasRequiredSha512;
function requireSha512() {
  if (hasRequiredSha512)
    return sha512$1;
  hasRequiredSha512 = 1;
  var $ = requireInherits_browser(), h = requireHash$1(), U = requireSafeBuffer$1().Buffer, B = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ], V = new Array(160);
  function t() {
    this.init(), this._w = V, h.call(this, 128, 112);
  }
  $(t, h), t.prototype.init = function() {
    return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this;
  };
  function O(ie, ne, se) {
    return se ^ ie & (ne ^ se);
  }
  function M(ie, ne, se) {
    return ie & ne | se & (ie | ne);
  }
  function D(ie, ne) {
    return (ie >>> 28 | ne << 4) ^ (ne >>> 2 | ie << 30) ^ (ne >>> 7 | ie << 25);
  }
  function I(ie, ne) {
    return (ie >>> 14 | ne << 18) ^ (ie >>> 18 | ne << 14) ^ (ne >>> 9 | ie << 23);
  }
  function P(ie, ne) {
    return (ie >>> 1 | ne << 31) ^ (ie >>> 8 | ne << 24) ^ ie >>> 7;
  }
  function Y(ie, ne) {
    return (ie >>> 1 | ne << 31) ^ (ie >>> 8 | ne << 24) ^ (ie >>> 7 | ne << 25);
  }
  function X(ie, ne) {
    return (ie >>> 19 | ne << 13) ^ (ne >>> 29 | ie << 3) ^ ie >>> 6;
  }
  function ee(ie, ne) {
    return (ie >>> 19 | ne << 13) ^ (ne >>> 29 | ie << 3) ^ (ie >>> 6 | ne << 26);
  }
  function re(ie, ne) {
    return ie >>> 0 < ne >>> 0 ? 1 : 0;
  }
  return t.prototype._update = function(ie) {
    for (var ne = this._w, se = this._ah | 0, oe = this._bh | 0, be = this._ch | 0, de = this._dh | 0, we = this._eh | 0, Se = this._fh | 0, ke = this._gh | 0, he = this._hh | 0, le = this._al | 0, _e = this._bl | 0, G = this._cl | 0, Z = this._dl | 0, e = this._el | 0, o = this._fl | 0, g = this._gl | 0, H = this._hl | 0, F = 0; F < 32; F += 2)
      ne[F] = ie.readInt32BE(F * 4), ne[F + 1] = ie.readInt32BE(F * 4 + 4);
    for (; F < 160; F += 2) {
      var A = ne[F - 30], q = ne[F - 15 * 2 + 1], z = P(A, q), S = Y(q, A);
      A = ne[F - 2 * 2], q = ne[F - 2 * 2 + 1];
      var J = X(A, q), ce = ee(q, A), ye = ne[F - 7 * 2], Me = ne[F - 7 * 2 + 1], me = ne[F - 16 * 2], ue = ne[F - 16 * 2 + 1], fe = S + Me | 0, Ae = z + ye + re(fe, S) | 0;
      fe = fe + ce | 0, Ae = Ae + J + re(fe, ce) | 0, fe = fe + ue | 0, Ae = Ae + me + re(fe, ue) | 0, ne[F] = Ae, ne[F + 1] = fe;
    }
    for (var Be = 0; Be < 160; Be += 2) {
      Ae = ne[Be], fe = ne[Be + 1];
      var pe = M(se, oe, be), ge = M(le, _e, G), Ee = D(se, le), Ie = D(le, se), Pe = I(we, e), Q = I(e, we), K = B[Be], te = B[Be + 1], ae = O(we, Se, ke), ve = O(e, o, g), qe = H + Q | 0, Re = he + Pe + re(qe, H) | 0;
      qe = qe + ve | 0, Re = Re + ae + re(qe, ve) | 0, qe = qe + te | 0, Re = Re + K + re(qe, te) | 0, qe = qe + fe | 0, Re = Re + Ae + re(qe, fe) | 0;
      var xe = Ie + ge | 0, Le = Ee + pe + re(xe, Ie) | 0;
      he = ke, H = g, ke = Se, g = o, Se = we, o = e, e = Z + qe | 0, we = de + Re + re(e, Z) | 0, de = be, Z = G, be = oe, G = _e, oe = se, _e = le, le = qe + xe | 0, se = Re + Le + re(le, qe) | 0;
    }
    this._al = this._al + le | 0, this._bl = this._bl + _e | 0, this._cl = this._cl + G | 0, this._dl = this._dl + Z | 0, this._el = this._el + e | 0, this._fl = this._fl + o | 0, this._gl = this._gl + g | 0, this._hl = this._hl + H | 0, this._ah = this._ah + se + re(this._al, le) | 0, this._bh = this._bh + oe + re(this._bl, _e) | 0, this._ch = this._ch + be + re(this._cl, G) | 0, this._dh = this._dh + de + re(this._dl, Z) | 0, this._eh = this._eh + we + re(this._el, e) | 0, this._fh = this._fh + Se + re(this._fl, o) | 0, this._gh = this._gh + ke + re(this._gl, g) | 0, this._hh = this._hh + he + re(this._hl, H) | 0;
  }, t.prototype._hash = function() {
    var ie = U.allocUnsafe(64);
    function ne(se, oe, be) {
      ie.writeInt32BE(se, be), ie.writeInt32BE(oe, be + 4);
    }
    return ne(this._ah, this._al, 0), ne(this._bh, this._bl, 8), ne(this._ch, this._cl, 16), ne(this._dh, this._dl, 24), ne(this._eh, this._el, 32), ne(this._fh, this._fl, 40), ne(this._gh, this._gl, 48), ne(this._hh, this._hl, 56), ie;
  }, sha512$1 = t, sha512$1;
}
var sha384$1, hasRequiredSha384;
function requireSha384() {
  if (hasRequiredSha384)
    return sha384$1;
  hasRequiredSha384 = 1;
  var $ = requireInherits_browser(), h = requireSha512(), U = requireHash$1(), B = requireSafeBuffer$1().Buffer, V = new Array(160);
  function t() {
    this.init(), this._w = V, U.call(this, 128, 112);
  }
  return $(t, h), t.prototype.init = function() {
    return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this;
  }, t.prototype._hash = function() {
    var O = B.allocUnsafe(48);
    function M(D, I, P) {
      O.writeInt32BE(D, P), O.writeInt32BE(I, P + 4);
    }
    return M(this._ah, this._al, 0), M(this._bh, this._bl, 8), M(this._ch, this._cl, 16), M(this._dh, this._dl, 24), M(this._eh, this._el, 32), M(this._fh, this._fl, 40), O;
  }, sha384$1 = t, sha384$1;
}
var hasRequiredSha_js;
function requireSha_js() {
  if (hasRequiredSha_js)
    return sha_js.exports;
  hasRequiredSha_js = 1;
  var $ = sha_js.exports = function(h) {
    h = h.toLowerCase();
    var U = $[h];
    if (!U)
      throw new Error(h + " is not supported (we accept pull requests)");
    return new U();
  };
  return $.sha = requireSha$1(), $.sha1 = requireSha1(), $.sha224 = requireSha224(), $.sha256 = requireSha256(), $.sha384 = requireSha384(), $.sha512 = requireSha512(), sha_js.exports;
}
var streamBrowserify, hasRequiredStreamBrowserify;
function requireStreamBrowserify() {
  if (hasRequiredStreamBrowserify)
    return streamBrowserify;
  hasRequiredStreamBrowserify = 1, streamBrowserify = U;
  var $ = requireEvents().EventEmitter, h = requireInherits_browser();
  h(U, $), U.Readable = require_stream_readable$1(), U.Writable = require_stream_writable$1(), U.Duplex = require_stream_duplex$1(), U.Transform = require_stream_transform$1(), U.PassThrough = require_stream_passthrough$1(), U.finished = requireEndOfStream(), U.pipeline = requirePipeline(), U.Stream = U;
  function U() {
    $.call(this);
  }
  return U.prototype.pipe = function(B, V) {
    var t = this;
    function O(ee) {
      B.writable && B.write(ee) === !1 && t.pause && t.pause();
    }
    t.on("data", O);
    function M() {
      t.readable && t.resume && t.resume();
    }
    B.on("drain", M), !B._isStdio && (!V || V.end !== !1) && (t.on("end", I), t.on("close", P));
    var D = !1;
    function I() {
      D || (D = !0, B.end());
    }
    function P() {
      D || (D = !0, typeof B.destroy == "function" && B.destroy());
    }
    function Y(ee) {
      if (X(), $.listenerCount(this, "error") === 0)
        throw ee;
    }
    t.on("error", Y), B.on("error", Y);
    function X() {
      t.removeListener("data", O), B.removeListener("drain", M), t.removeListener("end", I), t.removeListener("close", P), t.removeListener("error", Y), B.removeListener("error", Y), t.removeListener("end", X), t.removeListener("close", X), B.removeListener("close", X);
    }
    return t.on("end", X), t.on("close", X), B.on("close", X), B.emit("pipe", t), B;
  }, streamBrowserify;
}
var cipherBase, hasRequiredCipherBase;
function requireCipherBase() {
  if (hasRequiredCipherBase)
    return cipherBase;
  hasRequiredCipherBase = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireStreamBrowserify().Transform, U = requireString_decoder().StringDecoder, B = requireInherits_browser();
  function V(t) {
    h.call(this), this.hashMode = typeof t == "string", this.hashMode ? this[t] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null;
  }
  return B(V, h), V.prototype.update = function(t, O, M) {
    typeof t == "string" && (t = $.from(t, O));
    var D = this._update(t);
    return this.hashMode ? this : (M && (D = this._toString(D, M)), D);
  }, V.prototype.setAutoPadding = function() {
  }, V.prototype.getAuthTag = function() {
    throw new Error("trying to get auth tag in unsupported state");
  }, V.prototype.setAuthTag = function() {
    throw new Error("trying to set auth tag in unsupported state");
  }, V.prototype.setAAD = function() {
    throw new Error("trying to set aad in unsupported state");
  }, V.prototype._transform = function(t, O, M) {
    var D;
    try {
      this.hashMode ? this._update(t) : this.push(this._update(t));
    } catch (I) {
      D = I;
    } finally {
      M(D);
    }
  }, V.prototype._flush = function(t) {
    var O;
    try {
      this.push(this.__final());
    } catch (M) {
      O = M;
    }
    t(O);
  }, V.prototype._finalOrDigest = function(t) {
    var O = this.__final() || $.alloc(0);
    return t && (O = this._toString(O, t, !0)), O;
  }, V.prototype._toString = function(t, O, M) {
    if (this._decoder || (this._decoder = new U(O), this._encoding = O), this._encoding !== O)
      throw new Error("can't switch encodings");
    var D = this._decoder.write(t);
    return M && (D += this._decoder.end()), D;
  }, cipherBase = V, cipherBase;
}
var browser$9, hasRequiredBrowser$9;
function requireBrowser$9() {
  if (hasRequiredBrowser$9)
    return browser$9;
  hasRequiredBrowser$9 = 1;
  var $ = requireInherits_browser(), h = requireMd5_js(), U = requireRipemd160(), B = requireSha_js(), V = requireCipherBase();
  function t(O) {
    V.call(this, "digest"), this._hash = O;
  }
  return $(t, V), t.prototype._update = function(O) {
    this._hash.update(O);
  }, t.prototype._final = function() {
    return this._hash.digest();
  }, browser$9 = function(O) {
    return O = O.toLowerCase(), O === "md5" ? new h() : O === "rmd160" || O === "ripemd160" ? new U() : new t(B(O));
  }, browser$9;
}
var legacy, hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy)
    return legacy;
  hasRequiredLegacy = 1;
  var $ = requireInherits_browser(), h = requireSafeBuffer$1().Buffer, U = requireCipherBase(), B = h.alloc(128), V = 64;
  function t(O, M) {
    U.call(this, "digest"), typeof M == "string" && (M = h.from(M)), this._alg = O, this._key = M, M.length > V ? M = O(M) : M.length < V && (M = h.concat([M, B], V));
    for (var D = this._ipad = h.allocUnsafe(V), I = this._opad = h.allocUnsafe(V), P = 0; P < V; P++)
      D[P] = M[P] ^ 54, I[P] = M[P] ^ 92;
    this._hash = [D];
  }
  return $(t, U), t.prototype._update = function(O) {
    this._hash.push(O);
  }, t.prototype._final = function() {
    var O = this._alg(h.concat(this._hash));
    return this._alg(h.concat([this._opad, O]));
  }, legacy = t, legacy;
}
var md5, hasRequiredMd5;
function requireMd5() {
  if (hasRequiredMd5)
    return md5;
  hasRequiredMd5 = 1;
  var $ = requireMd5_js();
  return md5 = function(h) {
    return new $().update(h).digest();
  }, md5;
}
var browser$8, hasRequiredBrowser$8;
function requireBrowser$8() {
  if (hasRequiredBrowser$8)
    return browser$8;
  hasRequiredBrowser$8 = 1;
  var $ = requireInherits_browser(), h = requireLegacy(), U = requireCipherBase(), B = requireSafeBuffer$1().Buffer, V = requireMd5(), t = requireRipemd160(), O = requireSha_js(), M = B.alloc(128);
  function D(I, P) {
    U.call(this, "digest"), typeof P == "string" && (P = B.from(P));
    var Y = I === "sha512" || I === "sha384" ? 128 : 64;
    if (this._alg = I, this._key = P, P.length > Y) {
      var X = I === "rmd160" ? new t() : O(I);
      P = X.update(P).digest();
    } else
      P.length < Y && (P = B.concat([P, M], Y));
    for (var ee = this._ipad = B.allocUnsafe(Y), re = this._opad = B.allocUnsafe(Y), ie = 0; ie < Y; ie++)
      ee[ie] = P[ie] ^ 54, re[ie] = P[ie] ^ 92;
    this._hash = I === "rmd160" ? new t() : O(I), this._hash.update(ee);
  }
  return $(D, U), D.prototype._update = function(I) {
    this._hash.update(I);
  }, D.prototype._final = function() {
    var I = this._hash.digest(), P = this._alg === "rmd160" ? new t() : O(this._alg);
    return P.update(this._opad).update(I).digest();
  }, browser$8 = function(I, P) {
    return I = I.toLowerCase(), I === "rmd160" || I === "ripemd160" ? new D("rmd160", P) : I === "md5" ? new h(V, P) : new D(I, P);
  }, browser$8;
}
const sha224WithRSAEncryption = {
  sign: "rsa",
  hash: "sha224",
  id: "302d300d06096086480165030402040500041c"
}, sha256WithRSAEncryption = {
  sign: "rsa",
  hash: "sha256",
  id: "3031300d060960864801650304020105000420"
}, sha384WithRSAEncryption = {
  sign: "rsa",
  hash: "sha384",
  id: "3041300d060960864801650304020205000430"
}, sha512WithRSAEncryption = {
  sign: "rsa",
  hash: "sha512",
  id: "3051300d060960864801650304020305000440"
}, sha256 = {
  sign: "ecdsa",
  hash: "sha256",
  id: ""
}, sha224 = {
  sign: "ecdsa",
  hash: "sha224",
  id: ""
}, sha384 = {
  sign: "ecdsa",
  hash: "sha384",
  id: ""
}, sha512 = {
  sign: "ecdsa",
  hash: "sha512",
  id: ""
}, DSA = {
  sign: "dsa",
  hash: "sha1",
  id: ""
}, ripemd160WithRSA = {
  sign: "rsa",
  hash: "rmd160",
  id: "3021300906052b2403020105000414"
}, md5WithRSAEncryption = {
  sign: "rsa",
  hash: "md5",
  id: "3020300c06082a864886f70d020505000410"
}, require$$6 = {
  sha224WithRSAEncryption,
  "RSA-SHA224": {
    sign: "ecdsa/rsa",
    hash: "sha224",
    id: "302d300d06096086480165030402040500041c"
  },
  sha256WithRSAEncryption,
  "RSA-SHA256": {
    sign: "ecdsa/rsa",
    hash: "sha256",
    id: "3031300d060960864801650304020105000420"
  },
  sha384WithRSAEncryption,
  "RSA-SHA384": {
    sign: "ecdsa/rsa",
    hash: "sha384",
    id: "3041300d060960864801650304020205000430"
  },
  sha512WithRSAEncryption,
  "RSA-SHA512": {
    sign: "ecdsa/rsa",
    hash: "sha512",
    id: "3051300d060960864801650304020305000440"
  },
  "RSA-SHA1": {
    sign: "rsa",
    hash: "sha1",
    id: "3021300906052b0e03021a05000414"
  },
  "ecdsa-with-SHA1": {
    sign: "ecdsa",
    hash: "sha1",
    id: ""
  },
  sha256,
  sha224,
  sha384,
  sha512,
  "DSA-SHA": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  "DSA-SHA1": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  DSA,
  "DSA-WITH-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-WITH-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-WITH-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-WITH-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-RIPEMD160": {
    sign: "dsa",
    hash: "rmd160",
    id: ""
  },
  ripemd160WithRSA,
  "RSA-RIPEMD160": {
    sign: "rsa",
    hash: "rmd160",
    id: "3021300906052b2403020105000414"
  },
  md5WithRSAEncryption,
  "RSA-MD5": {
    sign: "rsa",
    hash: "md5",
    id: "3020300c06082a864886f70d020505000410"
  }
};
var algos, hasRequiredAlgos;
function requireAlgos() {
  return hasRequiredAlgos || (hasRequiredAlgos = 1, algos = require$$6), algos;
}
var browser$7 = {}, precondition, hasRequiredPrecondition;
function requirePrecondition() {
  if (hasRequiredPrecondition)
    return precondition;
  hasRequiredPrecondition = 1;
  var $ = Math.pow(2, 30) - 1;
  return precondition = function(h, U) {
    if (typeof h != "number")
      throw new TypeError("Iterations not a number");
    if (h < 0)
      throw new TypeError("Bad iterations");
    if (typeof U != "number")
      throw new TypeError("Key length not a number");
    if (U < 0 || U > $ || U !== U)
      throw new TypeError("Bad key length");
  }, precondition;
}
var defaultEncoding_1, hasRequiredDefaultEncoding;
function requireDefaultEncoding() {
  if (hasRequiredDefaultEncoding)
    return defaultEncoding_1;
  hasRequiredDefaultEncoding = 1;
  var $;
  if (commonjsGlobal.process && commonjsGlobal.process.browser)
    $ = "utf-8";
  else if (commonjsGlobal.process && commonjsGlobal.process.version) {
    var h = parseInt(process$1.version.split(".")[0].slice(1), 10);
    $ = h >= 6 ? "utf-8" : "binary";
  } else
    $ = "utf-8";
  return defaultEncoding_1 = $, defaultEncoding_1;
}
var toBuffer, hasRequiredToBuffer;
function requireToBuffer() {
  if (hasRequiredToBuffer)
    return toBuffer;
  hasRequiredToBuffer = 1;
  var $ = requireSafeBuffer$1().Buffer;
  return toBuffer = function(h, U, B) {
    if ($.isBuffer(h))
      return h;
    if (typeof h == "string")
      return $.from(h, U);
    if (ArrayBuffer.isView(h))
      return $.from(h.buffer);
    throw new TypeError(B + " must be a string, a Buffer, a typed array or a DataView");
  }, toBuffer;
}
var syncBrowser, hasRequiredSyncBrowser;
function requireSyncBrowser() {
  if (hasRequiredSyncBrowser)
    return syncBrowser;
  hasRequiredSyncBrowser = 1;
  var $ = requireMd5(), h = requireRipemd160(), U = requireSha_js(), B = requireSafeBuffer$1().Buffer, V = requirePrecondition(), t = requireDefaultEncoding(), O = requireToBuffer(), M = B.alloc(128), D = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    rmd160: 20,
    ripemd160: 20
  };
  function I(X, ee, re) {
    var ie = P(X), ne = X === "sha512" || X === "sha384" ? 128 : 64;
    ee.length > ne ? ee = ie(ee) : ee.length < ne && (ee = B.concat([ee, M], ne));
    for (var se = B.allocUnsafe(ne + D[X]), oe = B.allocUnsafe(ne + D[X]), be = 0; be < ne; be++)
      se[be] = ee[be] ^ 54, oe[be] = ee[be] ^ 92;
    var de = B.allocUnsafe(ne + re + 4);
    se.copy(de, 0, 0, ne), this.ipad1 = de, this.ipad2 = se, this.opad = oe, this.alg = X, this.blocksize = ne, this.hash = ie, this.size = D[X];
  }
  I.prototype.run = function(X, ee) {
    X.copy(ee, this.blocksize);
    var re = this.hash(ee);
    return re.copy(this.opad, this.blocksize), this.hash(this.opad);
  };
  function P(X) {
    function ee(ie) {
      return U(X).update(ie).digest();
    }
    function re(ie) {
      return new h().update(ie).digest();
    }
    return X === "rmd160" || X === "ripemd160" ? re : X === "md5" ? $ : ee;
  }
  function Y(X, ee, re, ie, ne) {
    V(re, ie), X = O(X, t, "Password"), ee = O(ee, t, "Salt"), ne = ne || "sha1";
    var se = new I(ne, X, ee.length), oe = B.allocUnsafe(ie), be = B.allocUnsafe(ee.length + 4);
    ee.copy(be, 0, 0, ee.length);
    for (var de = 0, we = D[ne], Se = Math.ceil(ie / we), ke = 1; ke <= Se; ke++) {
      be.writeUInt32BE(ke, ee.length);
      for (var he = se.run(be, se.ipad1), le = he, _e = 1; _e < re; _e++) {
        le = se.run(le, se.ipad2);
        for (var G = 0; G < we; G++)
          he[G] ^= le[G];
      }
      he.copy(oe, de), de += we;
    }
    return oe;
  }
  return syncBrowser = Y, syncBrowser;
}
var async, hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync)
    return async;
  hasRequiredAsync = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requirePrecondition(), U = requireDefaultEncoding(), B = requireSyncBrowser(), V = requireToBuffer(), t, O = commonjsGlobal.crypto && commonjsGlobal.crypto.subtle, M = {
    sha: "SHA-1",
    "sha-1": "SHA-1",
    sha1: "SHA-1",
    sha256: "SHA-256",
    "sha-256": "SHA-256",
    sha384: "SHA-384",
    "sha-384": "SHA-384",
    "sha-512": "SHA-512",
    sha512: "SHA-512"
  }, D = [];
  function I(re) {
    if (commonjsGlobal.process && !commonjsGlobal.process.browser || !O || !O.importKey || !O.deriveBits)
      return Promise.resolve(!1);
    if (D[re] !== void 0)
      return D[re];
    t = t || $.alloc(8);
    var ie = X(t, t, 10, 128, re).then(function() {
      return !0;
    }).catch(function() {
      return !1;
    });
    return D[re] = ie, ie;
  }
  var P;
  function Y() {
    return P || (commonjsGlobal.process && commonjsGlobal.process.nextTick ? P = commonjsGlobal.process.nextTick : commonjsGlobal.queueMicrotask ? P = commonjsGlobal.queueMicrotask : commonjsGlobal.setImmediate ? P = commonjsGlobal.setImmediate : P = commonjsGlobal.setTimeout, P);
  }
  function X(re, ie, ne, se, oe) {
    return O.importKey(
      "raw",
      re,
      { name: "PBKDF2" },
      !1,
      ["deriveBits"]
    ).then(function(be) {
      return O.deriveBits({
        name: "PBKDF2",
        salt: ie,
        iterations: ne,
        hash: {
          name: oe
        }
      }, be, se << 3);
    }).then(function(be) {
      return $.from(be);
    });
  }
  function ee(re, ie) {
    re.then(function(ne) {
      Y()(function() {
        ie(null, ne);
      });
    }, function(ne) {
      Y()(function() {
        ie(ne);
      });
    });
  }
  return async = function(re, ie, ne, se, oe, be) {
    typeof oe == "function" && (be = oe, oe = void 0), oe = oe || "sha1";
    var de = M[oe.toLowerCase()];
    if (!de || typeof commonjsGlobal.Promise != "function") {
      Y()(function() {
        var we;
        try {
          we = B(re, ie, ne, se, oe);
        } catch (Se) {
          return be(Se);
        }
        be(null, we);
      });
      return;
    }
    if (h(ne, se), re = V(re, U, "Password"), ie = V(ie, U, "Salt"), typeof be != "function")
      throw new Error("No callback provided to pbkdf2");
    ee(I(de).then(function(we) {
      return we ? X(re, ie, ne, se, de) : B(re, ie, ne, se, oe);
    }), be);
  }, async;
}
var hasRequiredBrowser$7;
function requireBrowser$7() {
  return hasRequiredBrowser$7 || (hasRequiredBrowser$7 = 1, browser$7.pbkdf2 = requireAsync(), browser$7.pbkdf2Sync = requireSyncBrowser()), browser$7;
}
var browser$6 = {}, des$1 = {}, utils$3 = {}, hasRequiredUtils$3;
function requireUtils$3() {
  if (hasRequiredUtils$3)
    return utils$3;
  hasRequiredUtils$3 = 1, utils$3.readUInt32BE = function(B, V) {
    var t = B[0 + V] << 24 | B[1 + V] << 16 | B[2 + V] << 8 | B[3 + V];
    return t >>> 0;
  }, utils$3.writeUInt32BE = function(B, V, t) {
    B[0 + t] = V >>> 24, B[1 + t] = V >>> 16 & 255, B[2 + t] = V >>> 8 & 255, B[3 + t] = V & 255;
  }, utils$3.ip = function(B, V, t, O) {
    for (var M = 0, D = 0, I = 6; I >= 0; I -= 2) {
      for (var P = 0; P <= 24; P += 8)
        M <<= 1, M |= V >>> P + I & 1;
      for (var P = 0; P <= 24; P += 8)
        M <<= 1, M |= B >>> P + I & 1;
    }
    for (var I = 6; I >= 0; I -= 2) {
      for (var P = 1; P <= 25; P += 8)
        D <<= 1, D |= V >>> P + I & 1;
      for (var P = 1; P <= 25; P += 8)
        D <<= 1, D |= B >>> P + I & 1;
    }
    t[O + 0] = M >>> 0, t[O + 1] = D >>> 0;
  }, utils$3.rip = function(B, V, t, O) {
    for (var M = 0, D = 0, I = 0; I < 4; I++)
      for (var P = 24; P >= 0; P -= 8)
        M <<= 1, M |= V >>> P + I & 1, M <<= 1, M |= B >>> P + I & 1;
    for (var I = 4; I < 8; I++)
      for (var P = 24; P >= 0; P -= 8)
        D <<= 1, D |= V >>> P + I & 1, D <<= 1, D |= B >>> P + I & 1;
    t[O + 0] = M >>> 0, t[O + 1] = D >>> 0;
  }, utils$3.pc1 = function(B, V, t, O) {
    for (var M = 0, D = 0, I = 7; I >= 5; I--) {
      for (var P = 0; P <= 24; P += 8)
        M <<= 1, M |= V >> P + I & 1;
      for (var P = 0; P <= 24; P += 8)
        M <<= 1, M |= B >> P + I & 1;
    }
    for (var P = 0; P <= 24; P += 8)
      M <<= 1, M |= V >> P + I & 1;
    for (var I = 1; I <= 3; I++) {
      for (var P = 0; P <= 24; P += 8)
        D <<= 1, D |= V >> P + I & 1;
      for (var P = 0; P <= 24; P += 8)
        D <<= 1, D |= B >> P + I & 1;
    }
    for (var P = 0; P <= 24; P += 8)
      D <<= 1, D |= B >> P + I & 1;
    t[O + 0] = M >>> 0, t[O + 1] = D >>> 0;
  }, utils$3.r28shl = function(B, V) {
    return B << V & 268435455 | B >>> 28 - V;
  };
  var $ = [
    // inL => outL
    14,
    11,
    17,
    4,
    27,
    23,
    25,
    0,
    13,
    22,
    7,
    18,
    5,
    9,
    16,
    24,
    2,
    20,
    12,
    21,
    1,
    8,
    15,
    26,
    // inR => outR
    15,
    4,
    25,
    19,
    9,
    1,
    26,
    16,
    5,
    11,
    23,
    8,
    12,
    7,
    17,
    0,
    22,
    3,
    10,
    14,
    6,
    20,
    27,
    24
  ];
  utils$3.pc2 = function(B, V, t, O) {
    for (var M = 0, D = 0, I = $.length >>> 1, P = 0; P < I; P++)
      M <<= 1, M |= B >>> $[P] & 1;
    for (var P = I; P < $.length; P++)
      D <<= 1, D |= V >>> $[P] & 1;
    t[O + 0] = M >>> 0, t[O + 1] = D >>> 0;
  }, utils$3.expand = function(B, V, t) {
    var O = 0, M = 0;
    O = (B & 1) << 5 | B >>> 27;
    for (var D = 23; D >= 15; D -= 4)
      O <<= 6, O |= B >>> D & 63;
    for (var D = 11; D >= 3; D -= 4)
      M |= B >>> D & 63, M <<= 6;
    M |= (B & 31) << 1 | B >>> 31, V[t + 0] = O >>> 0, V[t + 1] = M >>> 0;
  };
  var h = [
    14,
    0,
    4,
    15,
    13,
    7,
    1,
    4,
    2,
    14,
    15,
    2,
    11,
    13,
    8,
    1,
    3,
    10,
    10,
    6,
    6,
    12,
    12,
    11,
    5,
    9,
    9,
    5,
    0,
    3,
    7,
    8,
    4,
    15,
    1,
    12,
    14,
    8,
    8,
    2,
    13,
    4,
    6,
    9,
    2,
    1,
    11,
    7,
    15,
    5,
    12,
    11,
    9,
    3,
    7,
    14,
    3,
    10,
    10,
    0,
    5,
    6,
    0,
    13,
    15,
    3,
    1,
    13,
    8,
    4,
    14,
    7,
    6,
    15,
    11,
    2,
    3,
    8,
    4,
    14,
    9,
    12,
    7,
    0,
    2,
    1,
    13,
    10,
    12,
    6,
    0,
    9,
    5,
    11,
    10,
    5,
    0,
    13,
    14,
    8,
    7,
    10,
    11,
    1,
    10,
    3,
    4,
    15,
    13,
    4,
    1,
    2,
    5,
    11,
    8,
    6,
    12,
    7,
    6,
    12,
    9,
    0,
    3,
    5,
    2,
    14,
    15,
    9,
    10,
    13,
    0,
    7,
    9,
    0,
    14,
    9,
    6,
    3,
    3,
    4,
    15,
    6,
    5,
    10,
    1,
    2,
    13,
    8,
    12,
    5,
    7,
    14,
    11,
    12,
    4,
    11,
    2,
    15,
    8,
    1,
    13,
    1,
    6,
    10,
    4,
    13,
    9,
    0,
    8,
    6,
    15,
    9,
    3,
    8,
    0,
    7,
    11,
    4,
    1,
    15,
    2,
    14,
    12,
    3,
    5,
    11,
    10,
    5,
    14,
    2,
    7,
    12,
    7,
    13,
    13,
    8,
    14,
    11,
    3,
    5,
    0,
    6,
    6,
    15,
    9,
    0,
    10,
    3,
    1,
    4,
    2,
    7,
    8,
    2,
    5,
    12,
    11,
    1,
    12,
    10,
    4,
    14,
    15,
    9,
    10,
    3,
    6,
    15,
    9,
    0,
    0,
    6,
    12,
    10,
    11,
    1,
    7,
    13,
    13,
    8,
    15,
    9,
    1,
    4,
    3,
    5,
    14,
    11,
    5,
    12,
    2,
    7,
    8,
    2,
    4,
    14,
    2,
    14,
    12,
    11,
    4,
    2,
    1,
    12,
    7,
    4,
    10,
    7,
    11,
    13,
    6,
    1,
    8,
    5,
    5,
    0,
    3,
    15,
    15,
    10,
    13,
    3,
    0,
    9,
    14,
    8,
    9,
    6,
    4,
    11,
    2,
    8,
    1,
    12,
    11,
    7,
    10,
    1,
    13,
    14,
    7,
    2,
    8,
    13,
    15,
    6,
    9,
    15,
    12,
    0,
    5,
    9,
    6,
    10,
    3,
    4,
    0,
    5,
    14,
    3,
    12,
    10,
    1,
    15,
    10,
    4,
    15,
    2,
    9,
    7,
    2,
    12,
    6,
    9,
    8,
    5,
    0,
    6,
    13,
    1,
    3,
    13,
    4,
    14,
    14,
    0,
    7,
    11,
    5,
    3,
    11,
    8,
    9,
    4,
    14,
    3,
    15,
    2,
    5,
    12,
    2,
    9,
    8,
    5,
    12,
    15,
    3,
    10,
    7,
    11,
    0,
    14,
    4,
    1,
    10,
    7,
    1,
    6,
    13,
    0,
    11,
    8,
    6,
    13,
    4,
    13,
    11,
    0,
    2,
    11,
    14,
    7,
    15,
    4,
    0,
    9,
    8,
    1,
    13,
    10,
    3,
    14,
    12,
    3,
    9,
    5,
    7,
    12,
    5,
    2,
    10,
    15,
    6,
    8,
    1,
    6,
    1,
    6,
    4,
    11,
    11,
    13,
    13,
    8,
    12,
    1,
    3,
    4,
    7,
    10,
    14,
    7,
    10,
    9,
    15,
    5,
    6,
    0,
    8,
    15,
    0,
    14,
    5,
    2,
    9,
    3,
    2,
    12,
    13,
    1,
    2,
    15,
    8,
    13,
    4,
    8,
    6,
    10,
    15,
    3,
    11,
    7,
    1,
    4,
    10,
    12,
    9,
    5,
    3,
    6,
    14,
    11,
    5,
    0,
    0,
    14,
    12,
    9,
    7,
    2,
    7,
    2,
    11,
    1,
    4,
    14,
    1,
    7,
    9,
    4,
    12,
    10,
    14,
    8,
    2,
    13,
    0,
    15,
    6,
    12,
    10,
    9,
    13,
    0,
    15,
    3,
    3,
    5,
    5,
    6,
    8,
    11
  ];
  utils$3.substitute = function(B, V) {
    for (var t = 0, O = 0; O < 4; O++) {
      var M = B >>> 18 - O * 6 & 63, D = h[O * 64 + M];
      t <<= 4, t |= D;
    }
    for (var O = 0; O < 4; O++) {
      var M = V >>> 18 - O * 6 & 63, D = h[4 * 64 + O * 64 + M];
      t <<= 4, t |= D;
    }
    return t >>> 0;
  };
  var U = [
    16,
    25,
    12,
    11,
    3,
    20,
    4,
    15,
    31,
    17,
    9,
    6,
    27,
    14,
    1,
    22,
    30,
    24,
    8,
    18,
    0,
    5,
    29,
    23,
    13,
    19,
    2,
    26,
    10,
    21,
    28,
    7
  ];
  return utils$3.permute = function(B) {
    for (var V = 0, t = 0; t < U.length; t++)
      V <<= 1, V |= B >>> U[t] & 1;
    return V >>> 0;
  }, utils$3.padSplit = function(B, V, t) {
    for (var O = B.toString(2); O.length < V; )
      O = "0" + O;
    for (var M = [], D = 0; D < V; D += t)
      M.push(O.slice(D, D + t));
    return M.join(" ");
  }, utils$3;
}
var minimalisticAssert, hasRequiredMinimalisticAssert;
function requireMinimalisticAssert() {
  if (hasRequiredMinimalisticAssert)
    return minimalisticAssert;
  hasRequiredMinimalisticAssert = 1, minimalisticAssert = $;
  function $(h, U) {
    if (!h)
      throw new Error(U || "Assertion failed");
  }
  return $.equal = function(h, U, B) {
    if (h != U)
      throw new Error(B || "Assertion failed: " + h + " != " + U);
  }, minimalisticAssert;
}
var cipher, hasRequiredCipher;
function requireCipher() {
  if (hasRequiredCipher)
    return cipher;
  hasRequiredCipher = 1;
  var $ = requireMinimalisticAssert();
  function h(U) {
    this.options = U, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0, this.padding = U.padding !== !1;
  }
  return cipher = h, h.prototype._init = function() {
  }, h.prototype.update = function(U) {
    return U.length === 0 ? [] : this.type === "decrypt" ? this._updateDecrypt(U) : this._updateEncrypt(U);
  }, h.prototype._buffer = function(U, B) {
    for (var V = Math.min(this.buffer.length - this.bufferOff, U.length - B), t = 0; t < V; t++)
      this.buffer[this.bufferOff + t] = U[B + t];
    return this.bufferOff += V, V;
  }, h.prototype._flushBuffer = function(U, B) {
    return this._update(this.buffer, 0, U, B), this.bufferOff = 0, this.blockSize;
  }, h.prototype._updateEncrypt = function(U) {
    var B = 0, V = 0, t = (this.bufferOff + U.length) / this.blockSize | 0, O = new Array(t * this.blockSize);
    this.bufferOff !== 0 && (B += this._buffer(U, B), this.bufferOff === this.buffer.length && (V += this._flushBuffer(O, V)));
    for (var M = U.length - (U.length - B) % this.blockSize; B < M; B += this.blockSize)
      this._update(U, B, O, V), V += this.blockSize;
    for (; B < U.length; B++, this.bufferOff++)
      this.buffer[this.bufferOff] = U[B];
    return O;
  }, h.prototype._updateDecrypt = function(U) {
    for (var B = 0, V = 0, t = Math.ceil((this.bufferOff + U.length) / this.blockSize) - 1, O = new Array(t * this.blockSize); t > 0; t--)
      B += this._buffer(U, B), V += this._flushBuffer(O, V);
    return B += this._buffer(U, B), O;
  }, h.prototype.final = function(U) {
    var B;
    U && (B = this.update(U));
    var V;
    return this.type === "encrypt" ? V = this._finalEncrypt() : V = this._finalDecrypt(), B ? B.concat(V) : V;
  }, h.prototype._pad = function(U, B) {
    if (B === 0)
      return !1;
    for (; B < U.length; )
      U[B++] = 0;
    return !0;
  }, h.prototype._finalEncrypt = function() {
    if (!this._pad(this.buffer, this.bufferOff))
      return [];
    var U = new Array(this.blockSize);
    return this._update(this.buffer, 0, U, 0), U;
  }, h.prototype._unpad = function(U) {
    return U;
  }, h.prototype._finalDecrypt = function() {
    $.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
    var U = new Array(this.blockSize);
    return this._flushBuffer(U, 0), this._unpad(U);
  }, cipher;
}
var des, hasRequiredDes$1;
function requireDes$1() {
  if (hasRequiredDes$1)
    return des;
  hasRequiredDes$1 = 1;
  var $ = requireMinimalisticAssert(), h = requireInherits_browser(), U = requireUtils$3(), B = requireCipher();
  function V() {
    this.tmp = new Array(2), this.keys = null;
  }
  function t(M) {
    B.call(this, M);
    var D = new V();
    this._desState = D, this.deriveKeys(D, M.key);
  }
  h(t, B), des = t, t.create = function(M) {
    return new t(M);
  };
  var O = [
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1
  ];
  return t.prototype.deriveKeys = function(M, D) {
    M.keys = new Array(16 * 2), $.equal(D.length, this.blockSize, "Invalid key length");
    var I = U.readUInt32BE(D, 0), P = U.readUInt32BE(D, 4);
    U.pc1(I, P, M.tmp, 0), I = M.tmp[0], P = M.tmp[1];
    for (var Y = 0; Y < M.keys.length; Y += 2) {
      var X = O[Y >>> 1];
      I = U.r28shl(I, X), P = U.r28shl(P, X), U.pc2(I, P, M.keys, Y);
    }
  }, t.prototype._update = function(M, D, I, P) {
    var Y = this._desState, X = U.readUInt32BE(M, D), ee = U.readUInt32BE(M, D + 4);
    U.ip(X, ee, Y.tmp, 0), X = Y.tmp[0], ee = Y.tmp[1], this.type === "encrypt" ? this._encrypt(Y, X, ee, Y.tmp, 0) : this._decrypt(Y, X, ee, Y.tmp, 0), X = Y.tmp[0], ee = Y.tmp[1], U.writeUInt32BE(I, X, P), U.writeUInt32BE(I, ee, P + 4);
  }, t.prototype._pad = function(M, D) {
    if (this.padding === !1)
      return !1;
    for (var I = M.length - D, P = D; P < M.length; P++)
      M[P] = I;
    return !0;
  }, t.prototype._unpad = function(M) {
    if (this.padding === !1)
      return M;
    for (var D = M[M.length - 1], I = M.length - D; I < M.length; I++)
      $.equal(M[I], D);
    return M.slice(0, M.length - D);
  }, t.prototype._encrypt = function(M, D, I, P, Y) {
    for (var X = D, ee = I, re = 0; re < M.keys.length; re += 2) {
      var ie = M.keys[re], ne = M.keys[re + 1];
      U.expand(ee, M.tmp, 0), ie ^= M.tmp[0], ne ^= M.tmp[1];
      var se = U.substitute(ie, ne), oe = U.permute(se), be = ee;
      ee = (X ^ oe) >>> 0, X = be;
    }
    U.rip(ee, X, P, Y);
  }, t.prototype._decrypt = function(M, D, I, P, Y) {
    for (var X = I, ee = D, re = M.keys.length - 2; re >= 0; re -= 2) {
      var ie = M.keys[re], ne = M.keys[re + 1];
      U.expand(X, M.tmp, 0), ie ^= M.tmp[0], ne ^= M.tmp[1];
      var se = U.substitute(ie, ne), oe = U.permute(se), be = X;
      X = (ee ^ oe) >>> 0, ee = be;
    }
    U.rip(X, ee, P, Y);
  }, des;
}
var cbc$1 = {}, hasRequiredCbc$1;
function requireCbc$1() {
  if (hasRequiredCbc$1)
    return cbc$1;
  hasRequiredCbc$1 = 1;
  var $ = requireMinimalisticAssert(), h = requireInherits_browser(), U = {};
  function B(t) {
    $.equal(t.length, 8, "Invalid IV length"), this.iv = new Array(8);
    for (var O = 0; O < this.iv.length; O++)
      this.iv[O] = t[O];
  }
  function V(t) {
    function O(P) {
      t.call(this, P), this._cbcInit();
    }
    h(O, t);
    for (var M = Object.keys(U), D = 0; D < M.length; D++) {
      var I = M[D];
      O.prototype[I] = U[I];
    }
    return O.create = function(P) {
      return new O(P);
    }, O;
  }
  return cbc$1.instantiate = V, U._cbcInit = function() {
    var t = new B(this.options.iv);
    this._cbcState = t;
  }, U._update = function(t, O, M, D) {
    var I = this._cbcState, P = this.constructor.super_.prototype, Y = I.iv;
    if (this.type === "encrypt") {
      for (var X = 0; X < this.blockSize; X++)
        Y[X] ^= t[O + X];
      P._update.call(this, Y, 0, M, D);
      for (var X = 0; X < this.blockSize; X++)
        Y[X] = M[D + X];
    } else {
      P._update.call(this, t, O, M, D);
      for (var X = 0; X < this.blockSize; X++)
        M[D + X] ^= Y[X];
      for (var X = 0; X < this.blockSize; X++)
        Y[X] = t[O + X];
    }
  }, cbc$1;
}
var ede, hasRequiredEde;
function requireEde() {
  if (hasRequiredEde)
    return ede;
  hasRequiredEde = 1;
  var $ = requireMinimalisticAssert(), h = requireInherits_browser(), U = requireCipher(), B = requireDes$1();
  function V(O, M) {
    $.equal(M.length, 24, "Invalid key length");
    var D = M.slice(0, 8), I = M.slice(8, 16), P = M.slice(16, 24);
    O === "encrypt" ? this.ciphers = [
      B.create({ type: "encrypt", key: D }),
      B.create({ type: "decrypt", key: I }),
      B.create({ type: "encrypt", key: P })
    ] : this.ciphers = [
      B.create({ type: "decrypt", key: P }),
      B.create({ type: "encrypt", key: I }),
      B.create({ type: "decrypt", key: D })
    ];
  }
  function t(O) {
    U.call(this, O);
    var M = new V(this.type, this.options.key);
    this._edeState = M;
  }
  return h(t, U), ede = t, t.create = function(O) {
    return new t(O);
  }, t.prototype._update = function(O, M, D, I) {
    var P = this._edeState;
    P.ciphers[0]._update(O, M, D, I), P.ciphers[1]._update(D, I, D, I), P.ciphers[2]._update(D, I, D, I);
  }, t.prototype._pad = B.prototype._pad, t.prototype._unpad = B.prototype._unpad, ede;
}
var hasRequiredDes;
function requireDes() {
  return hasRequiredDes || (hasRequiredDes = 1, des$1.utils = requireUtils$3(), des$1.Cipher = requireCipher(), des$1.DES = requireDes$1(), des$1.CBC = requireCbc$1(), des$1.EDE = requireEde()), des$1;
}
var browserifyDes, hasRequiredBrowserifyDes;
function requireBrowserifyDes() {
  if (hasRequiredBrowserifyDes)
    return browserifyDes;
  hasRequiredBrowserifyDes = 1;
  var $ = requireCipherBase(), h = requireDes(), U = requireInherits_browser(), B = requireSafeBuffer$1().Buffer, V = {
    "des-ede3-cbc": h.CBC.instantiate(h.EDE),
    "des-ede3": h.EDE,
    "des-ede-cbc": h.CBC.instantiate(h.EDE),
    "des-ede": h.EDE,
    "des-cbc": h.CBC.instantiate(h.DES),
    "des-ecb": h.DES
  };
  V.des = V["des-cbc"], V.des3 = V["des-ede3-cbc"], browserifyDes = t, U(t, $);
  function t(O) {
    $.call(this);
    var M = O.mode.toLowerCase(), D = V[M], I;
    O.decrypt ? I = "decrypt" : I = "encrypt";
    var P = O.key;
    B.isBuffer(P) || (P = B.from(P)), (M === "des-ede" || M === "des-ede-cbc") && (P = B.concat([P, P.slice(0, 8)]));
    var Y = O.iv;
    B.isBuffer(Y) || (Y = B.from(Y)), this._des = D.create({
      key: P,
      iv: Y,
      type: I
    });
  }
  return t.prototype._update = function(O) {
    return B.from(this._des.update(O));
  }, t.prototype._final = function() {
    return B.from(this._des.final());
  }, browserifyDes;
}
var browser$5 = {}, encrypter = {}, ecb = {}, hasRequiredEcb;
function requireEcb() {
  return hasRequiredEcb || (hasRequiredEcb = 1, ecb.encrypt = function($, h) {
    return $._cipher.encryptBlock(h);
  }, ecb.decrypt = function($, h) {
    return $._cipher.decryptBlock(h);
  }), ecb;
}
var cbc = {}, bufferXor, hasRequiredBufferXor;
function requireBufferXor() {
  return hasRequiredBufferXor || (hasRequiredBufferXor = 1, bufferXor = function($, h) {
    for (var U = Math.min($.length, h.length), B = new bufferExports.Buffer(U), V = 0; V < U; ++V)
      B[V] = $[V] ^ h[V];
    return B;
  }), bufferXor;
}
var hasRequiredCbc;
function requireCbc() {
  if (hasRequiredCbc)
    return cbc;
  hasRequiredCbc = 1;
  var $ = requireBufferXor();
  return cbc.encrypt = function(h, U) {
    var B = $(U, h._prev);
    return h._prev = h._cipher.encryptBlock(B), h._prev;
  }, cbc.decrypt = function(h, U) {
    var B = h._prev;
    h._prev = U;
    var V = h._cipher.decryptBlock(U);
    return $(V, B);
  }, cbc;
}
var cfb = {}, hasRequiredCfb;
function requireCfb() {
  if (hasRequiredCfb)
    return cfb;
  hasRequiredCfb = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireBufferXor();
  function U(B, V, t) {
    var O = V.length, M = h(V, B._cache);
    return B._cache = B._cache.slice(O), B._prev = $.concat([B._prev, t ? V : M]), M;
  }
  return cfb.encrypt = function(B, V, t) {
    for (var O = $.allocUnsafe(0), M; V.length; )
      if (B._cache.length === 0 && (B._cache = B._cipher.encryptBlock(B._prev), B._prev = $.allocUnsafe(0)), B._cache.length <= V.length)
        M = B._cache.length, O = $.concat([O, U(B, V.slice(0, M), t)]), V = V.slice(M);
      else {
        O = $.concat([O, U(B, V, t)]);
        break;
      }
    return O;
  }, cfb;
}
var cfb8 = {}, hasRequiredCfb8;
function requireCfb8() {
  if (hasRequiredCfb8)
    return cfb8;
  hasRequiredCfb8 = 1;
  var $ = requireSafeBuffer$1().Buffer;
  function h(U, B, V) {
    var t = U._cipher.encryptBlock(U._prev), O = t[0] ^ B;
    return U._prev = $.concat([
      U._prev.slice(1),
      $.from([V ? B : O])
    ]), O;
  }
  return cfb8.encrypt = function(U, B, V) {
    for (var t = B.length, O = $.allocUnsafe(t), M = -1; ++M < t; )
      O[M] = h(U, B[M], V);
    return O;
  }, cfb8;
}
var cfb1 = {}, hasRequiredCfb1;
function requireCfb1() {
  if (hasRequiredCfb1)
    return cfb1;
  hasRequiredCfb1 = 1;
  var $ = requireSafeBuffer$1().Buffer;
  function h(B, V, t) {
    for (var O, M = -1, D = 8, I = 0, P, Y; ++M < D; )
      O = B._cipher.encryptBlock(B._prev), P = V & 1 << 7 - M ? 128 : 0, Y = O[0] ^ P, I += (Y & 128) >> M % 8, B._prev = U(B._prev, t ? P : Y);
    return I;
  }
  function U(B, V) {
    var t = B.length, O = -1, M = $.allocUnsafe(B.length);
    for (B = $.concat([B, $.from([V])]); ++O < t; )
      M[O] = B[O] << 1 | B[O + 1] >> 7;
    return M;
  }
  return cfb1.encrypt = function(B, V, t) {
    for (var O = V.length, M = $.allocUnsafe(O), D = -1; ++D < O; )
      M[D] = h(B, V[D], t);
    return M;
  }, cfb1;
}
var ofb = {}, hasRequiredOfb;
function requireOfb() {
  if (hasRequiredOfb)
    return ofb;
  hasRequiredOfb = 1;
  var $ = requireBufferXor();
  function h(U) {
    return U._prev = U._cipher.encryptBlock(U._prev), U._prev;
  }
  return ofb.encrypt = function(U, B) {
    for (; U._cache.length < B.length; )
      U._cache = bufferExports.Buffer.concat([U._cache, h(U)]);
    var V = U._cache.slice(0, B.length);
    return U._cache = U._cache.slice(B.length), $(B, V);
  }, ofb;
}
var ctr = {}, incr32_1, hasRequiredIncr32;
function requireIncr32() {
  if (hasRequiredIncr32)
    return incr32_1;
  hasRequiredIncr32 = 1;
  function $(h) {
    for (var U = h.length, B; U--; )
      if (B = h.readUInt8(U), B === 255)
        h.writeUInt8(0, U);
      else {
        B++, h.writeUInt8(B, U);
        break;
      }
  }
  return incr32_1 = $, incr32_1;
}
var hasRequiredCtr;
function requireCtr() {
  if (hasRequiredCtr)
    return ctr;
  hasRequiredCtr = 1;
  var $ = requireBufferXor(), h = requireSafeBuffer$1().Buffer, U = requireIncr32();
  function B(t) {
    var O = t._cipher.encryptBlockRaw(t._prev);
    return U(t._prev), O;
  }
  var V = 16;
  return ctr.encrypt = function(t, O) {
    var M = Math.ceil(O.length / V), D = t._cache.length;
    t._cache = h.concat([
      t._cache,
      h.allocUnsafe(M * V)
    ]);
    for (var I = 0; I < M; I++) {
      var P = B(t), Y = D + I * V;
      t._cache.writeUInt32BE(P[0], Y + 0), t._cache.writeUInt32BE(P[1], Y + 4), t._cache.writeUInt32BE(P[2], Y + 8), t._cache.writeUInt32BE(P[3], Y + 12);
    }
    var X = t._cache.slice(0, O.length);
    return t._cache = t._cache.slice(O.length), $(O, X);
  }, ctr;
}
const aes128 = {
  cipher: "AES",
  key: 128,
  iv: 16,
  mode: "CBC",
  type: "block"
}, aes192 = {
  cipher: "AES",
  key: 192,
  iv: 16,
  mode: "CBC",
  type: "block"
}, aes256 = {
  cipher: "AES",
  key: 256,
  iv: 16,
  mode: "CBC",
  type: "block"
}, require$$2 = {
  "aes-128-ecb": {
    cipher: "AES",
    key: 128,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-192-ecb": {
    cipher: "AES",
    key: 192,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-256-ecb": {
    cipher: "AES",
    key: 256,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-128-cbc": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-192-cbc": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-256-cbc": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  aes128,
  aes192,
  aes256,
  "aes-128-cfb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-192-cfb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-256-cfb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-128-cfb8": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-192-cfb8": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-256-cfb8": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-128-cfb1": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-192-cfb1": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-256-cfb1": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-128-ofb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-192-ofb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-256-ofb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-128-ctr": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-192-ctr": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-256-ctr": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-128-gcm": {
    cipher: "AES",
    key: 128,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-192-gcm": {
    cipher: "AES",
    key: 192,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-256-gcm": {
    cipher: "AES",
    key: 256,
    iv: 12,
    mode: "GCM",
    type: "auth"
  }
};
var modes_1, hasRequiredModes$1;
function requireModes$1() {
  if (hasRequiredModes$1)
    return modes_1;
  hasRequiredModes$1 = 1;
  var $ = {
    ECB: requireEcb(),
    CBC: requireCbc(),
    CFB: requireCfb(),
    CFB8: requireCfb8(),
    CFB1: requireCfb1(),
    OFB: requireOfb(),
    CTR: requireCtr(),
    GCM: requireCtr()
  }, h = require$$2;
  for (var U in h)
    h[U].module = $[h[U].mode];
  return modes_1 = h, modes_1;
}
var aes = {}, hasRequiredAes;
function requireAes() {
  if (hasRequiredAes)
    return aes;
  hasRequiredAes = 1;
  var $ = requireSafeBuffer$1().Buffer;
  function h(M) {
    $.isBuffer(M) || (M = $.from(M));
    for (var D = M.length / 4 | 0, I = new Array(D), P = 0; P < D; P++)
      I[P] = M.readUInt32BE(P * 4);
    return I;
  }
  function U(M) {
    for (var D = 0; D < M.length; M++)
      M[D] = 0;
  }
  function B(M, D, I, P, Y) {
    for (var X = I[0], ee = I[1], re = I[2], ie = I[3], ne = M[0] ^ D[0], se = M[1] ^ D[1], oe = M[2] ^ D[2], be = M[3] ^ D[3], de, we, Se, ke, he = 4, le = 1; le < Y; le++)
      de = X[ne >>> 24] ^ ee[se >>> 16 & 255] ^ re[oe >>> 8 & 255] ^ ie[be & 255] ^ D[he++], we = X[se >>> 24] ^ ee[oe >>> 16 & 255] ^ re[be >>> 8 & 255] ^ ie[ne & 255] ^ D[he++], Se = X[oe >>> 24] ^ ee[be >>> 16 & 255] ^ re[ne >>> 8 & 255] ^ ie[se & 255] ^ D[he++], ke = X[be >>> 24] ^ ee[ne >>> 16 & 255] ^ re[se >>> 8 & 255] ^ ie[oe & 255] ^ D[he++], ne = de, se = we, oe = Se, be = ke;
    return de = (P[ne >>> 24] << 24 | P[se >>> 16 & 255] << 16 | P[oe >>> 8 & 255] << 8 | P[be & 255]) ^ D[he++], we = (P[se >>> 24] << 24 | P[oe >>> 16 & 255] << 16 | P[be >>> 8 & 255] << 8 | P[ne & 255]) ^ D[he++], Se = (P[oe >>> 24] << 24 | P[be >>> 16 & 255] << 16 | P[ne >>> 8 & 255] << 8 | P[se & 255]) ^ D[he++], ke = (P[be >>> 24] << 24 | P[ne >>> 16 & 255] << 16 | P[se >>> 8 & 255] << 8 | P[oe & 255]) ^ D[he++], de = de >>> 0, we = we >>> 0, Se = Se >>> 0, ke = ke >>> 0, [de, we, Se, ke];
  }
  var V = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], t = function() {
    for (var M = new Array(256), D = 0; D < 256; D++)
      D < 128 ? M[D] = D << 1 : M[D] = D << 1 ^ 283;
    for (var I = [], P = [], Y = [[], [], [], []], X = [[], [], [], []], ee = 0, re = 0, ie = 0; ie < 256; ++ie) {
      var ne = re ^ re << 1 ^ re << 2 ^ re << 3 ^ re << 4;
      ne = ne >>> 8 ^ ne & 255 ^ 99, I[ee] = ne, P[ne] = ee;
      var se = M[ee], oe = M[se], be = M[oe], de = M[ne] * 257 ^ ne * 16843008;
      Y[0][ee] = de << 24 | de >>> 8, Y[1][ee] = de << 16 | de >>> 16, Y[2][ee] = de << 8 | de >>> 24, Y[3][ee] = de, de = be * 16843009 ^ oe * 65537 ^ se * 257 ^ ee * 16843008, X[0][ne] = de << 24 | de >>> 8, X[1][ne] = de << 16 | de >>> 16, X[2][ne] = de << 8 | de >>> 24, X[3][ne] = de, ee === 0 ? ee = re = 1 : (ee = se ^ M[M[M[be ^ se]]], re ^= M[M[re]]);
    }
    return {
      SBOX: I,
      INV_SBOX: P,
      SUB_MIX: Y,
      INV_SUB_MIX: X
    };
  }();
  function O(M) {
    this._key = h(M), this._reset();
  }
  return O.blockSize = 4 * 4, O.keySize = 256 / 8, O.prototype.blockSize = O.blockSize, O.prototype.keySize = O.keySize, O.prototype._reset = function() {
    for (var M = this._key, D = M.length, I = D + 6, P = (I + 1) * 4, Y = [], X = 0; X < D; X++)
      Y[X] = M[X];
    for (X = D; X < P; X++) {
      var ee = Y[X - 1];
      X % D === 0 ? (ee = ee << 8 | ee >>> 24, ee = t.SBOX[ee >>> 24] << 24 | t.SBOX[ee >>> 16 & 255] << 16 | t.SBOX[ee >>> 8 & 255] << 8 | t.SBOX[ee & 255], ee ^= V[X / D | 0] << 24) : D > 6 && X % D === 4 && (ee = t.SBOX[ee >>> 24] << 24 | t.SBOX[ee >>> 16 & 255] << 16 | t.SBOX[ee >>> 8 & 255] << 8 | t.SBOX[ee & 255]), Y[X] = Y[X - D] ^ ee;
    }
    for (var re = [], ie = 0; ie < P; ie++) {
      var ne = P - ie, se = Y[ne - (ie % 4 ? 0 : 4)];
      ie < 4 || ne <= 4 ? re[ie] = se : re[ie] = t.INV_SUB_MIX[0][t.SBOX[se >>> 24]] ^ t.INV_SUB_MIX[1][t.SBOX[se >>> 16 & 255]] ^ t.INV_SUB_MIX[2][t.SBOX[se >>> 8 & 255]] ^ t.INV_SUB_MIX[3][t.SBOX[se & 255]];
    }
    this._nRounds = I, this._keySchedule = Y, this._invKeySchedule = re;
  }, O.prototype.encryptBlockRaw = function(M) {
    return M = h(M), B(M, this._keySchedule, t.SUB_MIX, t.SBOX, this._nRounds);
  }, O.prototype.encryptBlock = function(M) {
    var D = this.encryptBlockRaw(M), I = $.allocUnsafe(16);
    return I.writeUInt32BE(D[0], 0), I.writeUInt32BE(D[1], 4), I.writeUInt32BE(D[2], 8), I.writeUInt32BE(D[3], 12), I;
  }, O.prototype.decryptBlock = function(M) {
    M = h(M);
    var D = M[1];
    M[1] = M[3], M[3] = D;
    var I = B(M, this._invKeySchedule, t.INV_SUB_MIX, t.INV_SBOX, this._nRounds), P = $.allocUnsafe(16);
    return P.writeUInt32BE(I[0], 0), P.writeUInt32BE(I[3], 4), P.writeUInt32BE(I[2], 8), P.writeUInt32BE(I[1], 12), P;
  }, O.prototype.scrub = function() {
    U(this._keySchedule), U(this._invKeySchedule), U(this._key);
  }, aes.AES = O, aes;
}
var ghash, hasRequiredGhash;
function requireGhash() {
  if (hasRequiredGhash)
    return ghash;
  hasRequiredGhash = 1;
  var $ = requireSafeBuffer$1().Buffer, h = $.alloc(16, 0);
  function U(t) {
    return [
      t.readUInt32BE(0),
      t.readUInt32BE(4),
      t.readUInt32BE(8),
      t.readUInt32BE(12)
    ];
  }
  function B(t) {
    var O = $.allocUnsafe(16);
    return O.writeUInt32BE(t[0] >>> 0, 0), O.writeUInt32BE(t[1] >>> 0, 4), O.writeUInt32BE(t[2] >>> 0, 8), O.writeUInt32BE(t[3] >>> 0, 12), O;
  }
  function V(t) {
    this.h = t, this.state = $.alloc(16, 0), this.cache = $.allocUnsafe(0);
  }
  return V.prototype.ghash = function(t) {
    for (var O = -1; ++O < t.length; )
      this.state[O] ^= t[O];
    this._multiply();
  }, V.prototype._multiply = function() {
    for (var t = U(this.h), O = [0, 0, 0, 0], M, D, I, P = -1; ++P < 128; ) {
      for (D = (this.state[~~(P / 8)] & 1 << 7 - P % 8) !== 0, D && (O[0] ^= t[0], O[1] ^= t[1], O[2] ^= t[2], O[3] ^= t[3]), I = (t[3] & 1) !== 0, M = 3; M > 0; M--)
        t[M] = t[M] >>> 1 | (t[M - 1] & 1) << 31;
      t[0] = t[0] >>> 1, I && (t[0] = t[0] ^ 225 << 24);
    }
    this.state = B(O);
  }, V.prototype.update = function(t) {
    this.cache = $.concat([this.cache, t]);
    for (var O; this.cache.length >= 16; )
      O = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(O);
  }, V.prototype.final = function(t, O) {
    return this.cache.length && this.ghash($.concat([this.cache, h], 16)), this.ghash(B([0, t, 0, O])), this.state;
  }, ghash = V, ghash;
}
var authCipher, hasRequiredAuthCipher;
function requireAuthCipher() {
  if (hasRequiredAuthCipher)
    return authCipher;
  hasRequiredAuthCipher = 1;
  var $ = requireAes(), h = requireSafeBuffer$1().Buffer, U = requireCipherBase(), B = requireInherits_browser(), V = requireGhash(), t = requireBufferXor(), O = requireIncr32();
  function M(P, Y) {
    var X = 0;
    P.length !== Y.length && X++;
    for (var ee = Math.min(P.length, Y.length), re = 0; re < ee; ++re)
      X += P[re] ^ Y[re];
    return X;
  }
  function D(P, Y, X) {
    if (Y.length === 12)
      return P._finID = h.concat([Y, h.from([0, 0, 0, 1])]), h.concat([Y, h.from([0, 0, 0, 2])]);
    var ee = new V(X), re = Y.length, ie = re % 16;
    ee.update(Y), ie && (ie = 16 - ie, ee.update(h.alloc(ie, 0))), ee.update(h.alloc(8, 0));
    var ne = re * 8, se = h.alloc(8);
    se.writeUIntBE(ne, 0, 8), ee.update(se), P._finID = ee.state;
    var oe = h.from(P._finID);
    return O(oe), oe;
  }
  function I(P, Y, X, ee) {
    U.call(this);
    var re = h.alloc(4, 0);
    this._cipher = new $.AES(Y);
    var ie = this._cipher.encryptBlock(re);
    this._ghash = new V(ie), X = D(this, X, ie), this._prev = h.from(X), this._cache = h.allocUnsafe(0), this._secCache = h.allocUnsafe(0), this._decrypt = ee, this._alen = 0, this._len = 0, this._mode = P, this._authTag = null, this._called = !1;
  }
  return B(I, U), I.prototype._update = function(P) {
    if (!this._called && this._alen) {
      var Y = 16 - this._alen % 16;
      Y < 16 && (Y = h.alloc(Y, 0), this._ghash.update(Y));
    }
    this._called = !0;
    var X = this._mode.encrypt(this, P);
    return this._decrypt ? this._ghash.update(P) : this._ghash.update(X), this._len += P.length, X;
  }, I.prototype._final = function() {
    if (this._decrypt && !this._authTag)
      throw new Error("Unsupported state or unable to authenticate data");
    var P = t(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID));
    if (this._decrypt && M(P, this._authTag))
      throw new Error("Unsupported state or unable to authenticate data");
    this._authTag = P, this._cipher.scrub();
  }, I.prototype.getAuthTag = function() {
    if (this._decrypt || !h.isBuffer(this._authTag))
      throw new Error("Attempting to get auth tag in unsupported state");
    return this._authTag;
  }, I.prototype.setAuthTag = function(P) {
    if (!this._decrypt)
      throw new Error("Attempting to set auth tag in unsupported state");
    this._authTag = P;
  }, I.prototype.setAAD = function(P) {
    if (this._called)
      throw new Error("Attempting to set AAD in unsupported state");
    this._ghash.update(P), this._alen += P.length;
  }, authCipher = I, authCipher;
}
var streamCipher, hasRequiredStreamCipher;
function requireStreamCipher() {
  if (hasRequiredStreamCipher)
    return streamCipher;
  hasRequiredStreamCipher = 1;
  var $ = requireAes(), h = requireSafeBuffer$1().Buffer, U = requireCipherBase(), B = requireInherits_browser();
  function V(t, O, M, D) {
    U.call(this), this._cipher = new $.AES(O), this._prev = h.from(M), this._cache = h.allocUnsafe(0), this._secCache = h.allocUnsafe(0), this._decrypt = D, this._mode = t;
  }
  return B(V, U), V.prototype._update = function(t) {
    return this._mode.encrypt(this, t, this._decrypt);
  }, V.prototype._final = function() {
    this._cipher.scrub();
  }, streamCipher = V, streamCipher;
}
var evp_bytestokey, hasRequiredEvp_bytestokey;
function requireEvp_bytestokey() {
  if (hasRequiredEvp_bytestokey)
    return evp_bytestokey;
  hasRequiredEvp_bytestokey = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireMd5_js();
  function U(B, V, t, O) {
    if ($.isBuffer(B) || (B = $.from(B, "binary")), V && ($.isBuffer(V) || (V = $.from(V, "binary")), V.length !== 8))
      throw new RangeError("salt should be Buffer with 8 byte length");
    for (var M = t / 8, D = $.alloc(M), I = $.alloc(O || 0), P = $.alloc(0); M > 0 || O > 0; ) {
      var Y = new h();
      Y.update(P), Y.update(B), V && Y.update(V), P = Y.digest();
      var X = 0;
      if (M > 0) {
        var ee = D.length - M;
        X = Math.min(M, P.length), P.copy(D, ee, 0, X), M -= X;
      }
      if (X < P.length && O > 0) {
        var re = I.length - O, ie = Math.min(O, P.length - X);
        P.copy(I, re, X, X + ie), O -= ie;
      }
    }
    return P.fill(0), { key: D, iv: I };
  }
  return evp_bytestokey = U, evp_bytestokey;
}
var hasRequiredEncrypter;
function requireEncrypter() {
  if (hasRequiredEncrypter)
    return encrypter;
  hasRequiredEncrypter = 1;
  var $ = requireModes$1(), h = requireAuthCipher(), U = requireSafeBuffer$1().Buffer, B = requireStreamCipher(), V = requireCipherBase(), t = requireAes(), O = requireEvp_bytestokey(), M = requireInherits_browser();
  function D(ee, re, ie) {
    V.call(this), this._cache = new P(), this._cipher = new t.AES(re), this._prev = U.from(ie), this._mode = ee, this._autopadding = !0;
  }
  M(D, V), D.prototype._update = function(ee) {
    this._cache.add(ee);
    for (var re, ie, ne = []; re = this._cache.get(); )
      ie = this._mode.encrypt(this, re), ne.push(ie);
    return U.concat(ne);
  };
  var I = U.alloc(16, 16);
  D.prototype._final = function() {
    var ee = this._cache.flush();
    if (this._autopadding)
      return ee = this._mode.encrypt(this, ee), this._cipher.scrub(), ee;
    if (!ee.equals(I))
      throw this._cipher.scrub(), new Error("data not multiple of block length");
  }, D.prototype.setAutoPadding = function(ee) {
    return this._autopadding = !!ee, this;
  };
  function P() {
    this.cache = U.allocUnsafe(0);
  }
  P.prototype.add = function(ee) {
    this.cache = U.concat([this.cache, ee]);
  }, P.prototype.get = function() {
    if (this.cache.length > 15) {
      var ee = this.cache.slice(0, 16);
      return this.cache = this.cache.slice(16), ee;
    }
    return null;
  }, P.prototype.flush = function() {
    for (var ee = 16 - this.cache.length, re = U.allocUnsafe(ee), ie = -1; ++ie < ee; )
      re.writeUInt8(ee, ie);
    return U.concat([this.cache, re]);
  };
  function Y(ee, re, ie) {
    var ne = $[ee.toLowerCase()];
    if (!ne)
      throw new TypeError("invalid suite type");
    if (typeof re == "string" && (re = U.from(re)), re.length !== ne.key / 8)
      throw new TypeError("invalid key length " + re.length);
    if (typeof ie == "string" && (ie = U.from(ie)), ne.mode !== "GCM" && ie.length !== ne.iv)
      throw new TypeError("invalid iv length " + ie.length);
    return ne.type === "stream" ? new B(ne.module, re, ie) : ne.type === "auth" ? new h(ne.module, re, ie) : new D(ne.module, re, ie);
  }
  function X(ee, re) {
    var ie = $[ee.toLowerCase()];
    if (!ie)
      throw new TypeError("invalid suite type");
    var ne = O(re, !1, ie.key, ie.iv);
    return Y(ee, ne.key, ne.iv);
  }
  return encrypter.createCipheriv = Y, encrypter.createCipher = X, encrypter;
}
var decrypter = {}, hasRequiredDecrypter;
function requireDecrypter() {
  if (hasRequiredDecrypter)
    return decrypter;
  hasRequiredDecrypter = 1;
  var $ = requireAuthCipher(), h = requireSafeBuffer$1().Buffer, U = requireModes$1(), B = requireStreamCipher(), V = requireCipherBase(), t = requireAes(), O = requireEvp_bytestokey(), M = requireInherits_browser();
  function D(ee, re, ie) {
    V.call(this), this._cache = new I(), this._last = void 0, this._cipher = new t.AES(re), this._prev = h.from(ie), this._mode = ee, this._autopadding = !0;
  }
  M(D, V), D.prototype._update = function(ee) {
    this._cache.add(ee);
    for (var re, ie, ne = []; re = this._cache.get(this._autopadding); )
      ie = this._mode.decrypt(this, re), ne.push(ie);
    return h.concat(ne);
  }, D.prototype._final = function() {
    var ee = this._cache.flush();
    if (this._autopadding)
      return P(this._mode.decrypt(this, ee));
    if (ee)
      throw new Error("data not multiple of block length");
  }, D.prototype.setAutoPadding = function(ee) {
    return this._autopadding = !!ee, this;
  };
  function I() {
    this.cache = h.allocUnsafe(0);
  }
  I.prototype.add = function(ee) {
    this.cache = h.concat([this.cache, ee]);
  }, I.prototype.get = function(ee) {
    var re;
    if (ee) {
      if (this.cache.length > 16)
        return re = this.cache.slice(0, 16), this.cache = this.cache.slice(16), re;
    } else if (this.cache.length >= 16)
      return re = this.cache.slice(0, 16), this.cache = this.cache.slice(16), re;
    return null;
  }, I.prototype.flush = function() {
    if (this.cache.length)
      return this.cache;
  };
  function P(ee) {
    var re = ee[15];
    if (re < 1 || re > 16)
      throw new Error("unable to decrypt data");
    for (var ie = -1; ++ie < re; )
      if (ee[ie + (16 - re)] !== re)
        throw new Error("unable to decrypt data");
    if (re !== 16)
      return ee.slice(0, 16 - re);
  }
  function Y(ee, re, ie) {
    var ne = U[ee.toLowerCase()];
    if (!ne)
      throw new TypeError("invalid suite type");
    if (typeof ie == "string" && (ie = h.from(ie)), ne.mode !== "GCM" && ie.length !== ne.iv)
      throw new TypeError("invalid iv length " + ie.length);
    if (typeof re == "string" && (re = h.from(re)), re.length !== ne.key / 8)
      throw new TypeError("invalid key length " + re.length);
    return ne.type === "stream" ? new B(ne.module, re, ie, !0) : ne.type === "auth" ? new $(ne.module, re, ie, !0) : new D(ne.module, re, ie);
  }
  function X(ee, re) {
    var ie = U[ee.toLowerCase()];
    if (!ie)
      throw new TypeError("invalid suite type");
    var ne = O(re, !1, ie.key, ie.iv);
    return Y(ee, ne.key, ne.iv);
  }
  return decrypter.createDecipher = X, decrypter.createDecipheriv = Y, decrypter;
}
var hasRequiredBrowser$6;
function requireBrowser$6() {
  if (hasRequiredBrowser$6)
    return browser$5;
  hasRequiredBrowser$6 = 1;
  var $ = requireEncrypter(), h = requireDecrypter(), U = require$$2;
  function B() {
    return Object.keys(U);
  }
  return browser$5.createCipher = browser$5.Cipher = $.createCipher, browser$5.createCipheriv = browser$5.Cipheriv = $.createCipheriv, browser$5.createDecipher = browser$5.Decipher = h.createDecipher, browser$5.createDecipheriv = browser$5.Decipheriv = h.createDecipheriv, browser$5.listCiphers = browser$5.getCiphers = B, browser$5;
}
var modes = {}, hasRequiredModes;
function requireModes() {
  return hasRequiredModes || (hasRequiredModes = 1, function($) {
    $["des-ecb"] = {
      key: 8,
      iv: 0
    }, $["des-cbc"] = $.des = {
      key: 8,
      iv: 8
    }, $["des-ede3-cbc"] = $.des3 = {
      key: 24,
      iv: 8
    }, $["des-ede3"] = {
      key: 24,
      iv: 0
    }, $["des-ede-cbc"] = {
      key: 16,
      iv: 8
    }, $["des-ede"] = {
      key: 16,
      iv: 0
    };
  }(modes)), modes;
}
var hasRequiredBrowser$5;
function requireBrowser$5() {
  if (hasRequiredBrowser$5)
    return browser$6;
  hasRequiredBrowser$5 = 1;
  var $ = requireBrowserifyDes(), h = requireBrowser$6(), U = requireModes$1(), B = requireModes(), V = requireEvp_bytestokey();
  function t(P, Y) {
    P = P.toLowerCase();
    var X, ee;
    if (U[P])
      X = U[P].key, ee = U[P].iv;
    else if (B[P])
      X = B[P].key * 8, ee = B[P].iv;
    else
      throw new TypeError("invalid suite type");
    var re = V(Y, !1, X, ee);
    return M(P, re.key, re.iv);
  }
  function O(P, Y) {
    P = P.toLowerCase();
    var X, ee;
    if (U[P])
      X = U[P].key, ee = U[P].iv;
    else if (B[P])
      X = B[P].key * 8, ee = B[P].iv;
    else
      throw new TypeError("invalid suite type");
    var re = V(Y, !1, X, ee);
    return D(P, re.key, re.iv);
  }
  function M(P, Y, X) {
    if (P = P.toLowerCase(), U[P])
      return h.createCipheriv(P, Y, X);
    if (B[P])
      return new $({ key: Y, iv: X, mode: P });
    throw new TypeError("invalid suite type");
  }
  function D(P, Y, X) {
    if (P = P.toLowerCase(), U[P])
      return h.createDecipheriv(P, Y, X);
    if (B[P])
      return new $({ key: Y, iv: X, mode: P, decrypt: !0 });
    throw new TypeError("invalid suite type");
  }
  function I() {
    return Object.keys(B).concat(h.getCiphers());
  }
  return browser$6.createCipher = browser$6.Cipher = t, browser$6.createCipheriv = browser$6.Cipheriv = M, browser$6.createDecipher = browser$6.Decipher = O, browser$6.createDecipheriv = browser$6.Decipheriv = D, browser$6.listCiphers = browser$6.getCiphers = I, browser$6;
}
var browser$4 = {}, bn$2 = { exports: {} }, hasRequiredBn$2;
function requireBn$2() {
  return hasRequiredBn$2 || (hasRequiredBn$2 = 1, function($) {
    (function(h, U) {
      function B(G, Z) {
        if (!G)
          throw new Error(Z || "Assertion failed");
      }
      function V(G, Z) {
        G.super_ = Z;
        var e = function() {
        };
        e.prototype = Z.prototype, G.prototype = new e(), G.prototype.constructor = G;
      }
      function t(G, Z, e) {
        if (t.isBN(G))
          return G;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, G !== null && ((Z === "le" || Z === "be") && (e = Z, Z = 10), this._init(G || 0, Z || 10, e || "be"));
      }
      typeof h == "object" ? h.exports = t : U.BN = t, t.BN = t, t.wordSize = 26;
      var O;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? O = window.Buffer : O = requireBuffer$1().Buffer;
      } catch {
      }
      t.isBN = function(G) {
        return G instanceof t ? !0 : G !== null && typeof G == "object" && G.constructor.wordSize === t.wordSize && Array.isArray(G.words);
      }, t.max = function(G, Z) {
        return G.cmp(Z) > 0 ? G : Z;
      }, t.min = function(G, Z) {
        return G.cmp(Z) < 0 ? G : Z;
      }, t.prototype._init = function(G, Z, e) {
        if (typeof G == "number")
          return this._initNumber(G, Z, e);
        if (typeof G == "object")
          return this._initArray(G, Z, e);
        Z === "hex" && (Z = 16), B(Z === (Z | 0) && Z >= 2 && Z <= 36), G = G.toString().replace(/\s+/g, "");
        var o = 0;
        G[0] === "-" && (o++, this.negative = 1), o < G.length && (Z === 16 ? this._parseHex(G, o, e) : (this._parseBase(G, Z, o), e === "le" && this._initArray(this.toArray(), Z, e)));
      }, t.prototype._initNumber = function(G, Z, e) {
        G < 0 && (this.negative = 1, G = -G), G < 67108864 ? (this.words = [G & 67108863], this.length = 1) : G < 4503599627370496 ? (this.words = [
          G & 67108863,
          G / 67108864 & 67108863
        ], this.length = 2) : (B(G < 9007199254740992), this.words = [
          G & 67108863,
          G / 67108864 & 67108863,
          1
        ], this.length = 3), e === "le" && this._initArray(this.toArray(), Z, e);
      }, t.prototype._initArray = function(G, Z, e) {
        if (B(typeof G.length == "number"), G.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(G.length / 3), this.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          this.words[o] = 0;
        var g, H, F = 0;
        if (e === "be")
          for (o = G.length - 1, g = 0; o >= 0; o -= 3)
            H = G[o] | G[o - 1] << 8 | G[o - 2] << 16, this.words[g] |= H << F & 67108863, this.words[g + 1] = H >>> 26 - F & 67108863, F += 24, F >= 26 && (F -= 26, g++);
        else if (e === "le")
          for (o = 0, g = 0; o < G.length; o += 3)
            H = G[o] | G[o + 1] << 8 | G[o + 2] << 16, this.words[g] |= H << F & 67108863, this.words[g + 1] = H >>> 26 - F & 67108863, F += 24, F >= 26 && (F -= 26, g++);
        return this.strip();
      };
      function M(G, Z) {
        var e = G.charCodeAt(Z);
        return e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : e - 48 & 15;
      }
      function D(G, Z, e) {
        var o = M(G, e);
        return e - 1 >= Z && (o |= M(G, e - 1) << 4), o;
      }
      t.prototype._parseHex = function(G, Z, e) {
        this.length = Math.ceil((G.length - Z) / 6), this.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          this.words[o] = 0;
        var g = 0, H = 0, F;
        if (e === "be")
          for (o = G.length - 1; o >= Z; o -= 2)
            F = D(G, Z, o) << g, this.words[H] |= F & 67108863, g >= 18 ? (g -= 18, H += 1, this.words[H] |= F >>> 26) : g += 8;
        else {
          var A = G.length - Z;
          for (o = A % 2 === 0 ? Z + 1 : Z; o < G.length; o += 2)
            F = D(G, Z, o) << g, this.words[H] |= F & 67108863, g >= 18 ? (g -= 18, H += 1, this.words[H] |= F >>> 26) : g += 8;
        }
        this.strip();
      };
      function I(G, Z, e, o) {
        for (var g = 0, H = Math.min(G.length, e), F = Z; F < H; F++) {
          var A = G.charCodeAt(F) - 48;
          g *= o, A >= 49 ? g += A - 49 + 10 : A >= 17 ? g += A - 17 + 10 : g += A;
        }
        return g;
      }
      t.prototype._parseBase = function(G, Z, e) {
        this.words = [0], this.length = 1;
        for (var o = 0, g = 1; g <= 67108863; g *= Z)
          o++;
        o--, g = g / Z | 0;
        for (var H = G.length - e, F = H % o, A = Math.min(H, H - F) + e, q = 0, z = e; z < A; z += o)
          q = I(G, z, z + o, Z), this.imuln(g), this.words[0] + q < 67108864 ? this.words[0] += q : this._iaddn(q);
        if (F !== 0) {
          var S = 1;
          for (q = I(G, z, G.length, Z), z = 0; z < F; z++)
            S *= Z;
          this.imuln(S), this.words[0] + q < 67108864 ? this.words[0] += q : this._iaddn(q);
        }
        this.strip();
      }, t.prototype.copy = function(G) {
        G.words = new Array(this.length);
        for (var Z = 0; Z < this.length; Z++)
          G.words[Z] = this.words[Z];
        G.length = this.length, G.negative = this.negative, G.red = this.red;
      }, t.prototype.clone = function() {
        var G = new t(null);
        return this.copy(G), G;
      }, t.prototype._expand = function(G) {
        for (; this.length < G; )
          this.words[this.length++] = 0;
        return this;
      }, t.prototype.strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, t.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, t.prototype.inspect = function() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var P = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], Y = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], X = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      t.prototype.toString = function(G, Z) {
        G = G || 10, Z = Z | 0 || 1;
        var e;
        if (G === 16 || G === "hex") {
          e = "";
          for (var o = 0, g = 0, H = 0; H < this.length; H++) {
            var F = this.words[H], A = ((F << o | g) & 16777215).toString(16);
            g = F >>> 24 - o & 16777215, g !== 0 || H !== this.length - 1 ? e = P[6 - A.length] + A + e : e = A + e, o += 2, o >= 26 && (o -= 26, H--);
          }
          for (g !== 0 && (e = g.toString(16) + e); e.length % Z !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        if (G === (G | 0) && G >= 2 && G <= 36) {
          var q = Y[G], z = X[G];
          e = "";
          var S = this.clone();
          for (S.negative = 0; !S.isZero(); ) {
            var J = S.modn(z).toString(G);
            S = S.idivn(z), S.isZero() ? e = J + e : e = P[q - J.length] + J + e;
          }
          for (this.isZero() && (e = "0" + e); e.length % Z !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        B(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var G = this.words[0];
        return this.length === 2 ? G += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? G += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && B(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -G : G;
      }, t.prototype.toJSON = function() {
        return this.toString(16);
      }, t.prototype.toBuffer = function(G, Z) {
        return B(typeof O < "u"), this.toArrayLike(O, G, Z);
      }, t.prototype.toArray = function(G, Z) {
        return this.toArrayLike(Array, G, Z);
      }, t.prototype.toArrayLike = function(G, Z, e) {
        var o = this.byteLength(), g = e || Math.max(1, o);
        B(o <= g, "byte array longer than desired length"), B(g > 0, "Requested array length <= 0"), this.strip();
        var H = Z === "le", F = new G(g), A, q, z = this.clone();
        if (H) {
          for (q = 0; !z.isZero(); q++)
            A = z.andln(255), z.iushrn(8), F[q] = A;
          for (; q < g; q++)
            F[q] = 0;
        } else {
          for (q = 0; q < g - o; q++)
            F[q] = 0;
          for (q = 0; !z.isZero(); q++)
            A = z.andln(255), z.iushrn(8), F[g - q - 1] = A;
        }
        return F;
      }, Math.clz32 ? t.prototype._countBits = function(G) {
        return 32 - Math.clz32(G);
      } : t.prototype._countBits = function(G) {
        var Z = G, e = 0;
        return Z >= 4096 && (e += 13, Z >>>= 13), Z >= 64 && (e += 7, Z >>>= 7), Z >= 8 && (e += 4, Z >>>= 4), Z >= 2 && (e += 2, Z >>>= 2), e + Z;
      }, t.prototype._zeroBits = function(G) {
        if (G === 0)
          return 26;
        var Z = G, e = 0;
        return Z & 8191 || (e += 13, Z >>>= 13), Z & 127 || (e += 7, Z >>>= 7), Z & 15 || (e += 4, Z >>>= 4), Z & 3 || (e += 2, Z >>>= 2), Z & 1 || e++, e;
      }, t.prototype.bitLength = function() {
        var G = this.words[this.length - 1], Z = this._countBits(G);
        return (this.length - 1) * 26 + Z;
      };
      function ee(G) {
        for (var Z = new Array(G.bitLength()), e = 0; e < Z.length; e++) {
          var o = e / 26 | 0, g = e % 26;
          Z[e] = (G.words[o] & 1 << g) >>> g;
        }
        return Z;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var G = 0, Z = 0; Z < this.length; Z++) {
          var e = this._zeroBits(this.words[Z]);
          if (G += e, e !== 26)
            break;
        }
        return G;
      }, t.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, t.prototype.toTwos = function(G) {
        return this.negative !== 0 ? this.abs().inotn(G).iaddn(1) : this.clone();
      }, t.prototype.fromTwos = function(G) {
        return this.testn(G - 1) ? this.notn(G).iaddn(1).ineg() : this.clone();
      }, t.prototype.isNeg = function() {
        return this.negative !== 0;
      }, t.prototype.neg = function() {
        return this.clone().ineg();
      }, t.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, t.prototype.iuor = function(G) {
        for (; this.length < G.length; )
          this.words[this.length++] = 0;
        for (var Z = 0; Z < G.length; Z++)
          this.words[Z] = this.words[Z] | G.words[Z];
        return this.strip();
      }, t.prototype.ior = function(G) {
        return B((this.negative | G.negative) === 0), this.iuor(G);
      }, t.prototype.or = function(G) {
        return this.length > G.length ? this.clone().ior(G) : G.clone().ior(this);
      }, t.prototype.uor = function(G) {
        return this.length > G.length ? this.clone().iuor(G) : G.clone().iuor(this);
      }, t.prototype.iuand = function(G) {
        var Z;
        this.length > G.length ? Z = G : Z = this;
        for (var e = 0; e < Z.length; e++)
          this.words[e] = this.words[e] & G.words[e];
        return this.length = Z.length, this.strip();
      }, t.prototype.iand = function(G) {
        return B((this.negative | G.negative) === 0), this.iuand(G);
      }, t.prototype.and = function(G) {
        return this.length > G.length ? this.clone().iand(G) : G.clone().iand(this);
      }, t.prototype.uand = function(G) {
        return this.length > G.length ? this.clone().iuand(G) : G.clone().iuand(this);
      }, t.prototype.iuxor = function(G) {
        var Z, e;
        this.length > G.length ? (Z = this, e = G) : (Z = G, e = this);
        for (var o = 0; o < e.length; o++)
          this.words[o] = Z.words[o] ^ e.words[o];
        if (this !== Z)
          for (; o < Z.length; o++)
            this.words[o] = Z.words[o];
        return this.length = Z.length, this.strip();
      }, t.prototype.ixor = function(G) {
        return B((this.negative | G.negative) === 0), this.iuxor(G);
      }, t.prototype.xor = function(G) {
        return this.length > G.length ? this.clone().ixor(G) : G.clone().ixor(this);
      }, t.prototype.uxor = function(G) {
        return this.length > G.length ? this.clone().iuxor(G) : G.clone().iuxor(this);
      }, t.prototype.inotn = function(G) {
        B(typeof G == "number" && G >= 0);
        var Z = Math.ceil(G / 26) | 0, e = G % 26;
        this._expand(Z), e > 0 && Z--;
        for (var o = 0; o < Z; o++)
          this.words[o] = ~this.words[o] & 67108863;
        return e > 0 && (this.words[o] = ~this.words[o] & 67108863 >> 26 - e), this.strip();
      }, t.prototype.notn = function(G) {
        return this.clone().inotn(G);
      }, t.prototype.setn = function(G, Z) {
        B(typeof G == "number" && G >= 0);
        var e = G / 26 | 0, o = G % 26;
        return this._expand(e + 1), Z ? this.words[e] = this.words[e] | 1 << o : this.words[e] = this.words[e] & ~(1 << o), this.strip();
      }, t.prototype.iadd = function(G) {
        var Z;
        if (this.negative !== 0 && G.negative === 0)
          return this.negative = 0, Z = this.isub(G), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && G.negative !== 0)
          return G.negative = 0, Z = this.isub(G), G.negative = 1, Z._normSign();
        var e, o;
        this.length > G.length ? (e = this, o = G) : (e = G, o = this);
        for (var g = 0, H = 0; H < o.length; H++)
          Z = (e.words[H] | 0) + (o.words[H] | 0) + g, this.words[H] = Z & 67108863, g = Z >>> 26;
        for (; g !== 0 && H < e.length; H++)
          Z = (e.words[H] | 0) + g, this.words[H] = Z & 67108863, g = Z >>> 26;
        if (this.length = e.length, g !== 0)
          this.words[this.length] = g, this.length++;
        else if (e !== this)
          for (; H < e.length; H++)
            this.words[H] = e.words[H];
        return this;
      }, t.prototype.add = function(G) {
        var Z;
        return G.negative !== 0 && this.negative === 0 ? (G.negative = 0, Z = this.sub(G), G.negative ^= 1, Z) : G.negative === 0 && this.negative !== 0 ? (this.negative = 0, Z = G.sub(this), this.negative = 1, Z) : this.length > G.length ? this.clone().iadd(G) : G.clone().iadd(this);
      }, t.prototype.isub = function(G) {
        if (G.negative !== 0) {
          G.negative = 0;
          var Z = this.iadd(G);
          return G.negative = 1, Z._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(G), this.negative = 1, this._normSign();
        var e = this.cmp(G);
        if (e === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var o, g;
        e > 0 ? (o = this, g = G) : (o = G, g = this);
        for (var H = 0, F = 0; F < g.length; F++)
          Z = (o.words[F] | 0) - (g.words[F] | 0) + H, H = Z >> 26, this.words[F] = Z & 67108863;
        for (; H !== 0 && F < o.length; F++)
          Z = (o.words[F] | 0) + H, H = Z >> 26, this.words[F] = Z & 67108863;
        if (H === 0 && F < o.length && o !== this)
          for (; F < o.length; F++)
            this.words[F] = o.words[F];
        return this.length = Math.max(this.length, F), o !== this && (this.negative = 1), this.strip();
      }, t.prototype.sub = function(G) {
        return this.clone().isub(G);
      };
      function re(G, Z, e) {
        e.negative = Z.negative ^ G.negative;
        var o = G.length + Z.length | 0;
        e.length = o, o = o - 1 | 0;
        var g = G.words[0] | 0, H = Z.words[0] | 0, F = g * H, A = F & 67108863, q = F / 67108864 | 0;
        e.words[0] = A;
        for (var z = 1; z < o; z++) {
          for (var S = q >>> 26, J = q & 67108863, ce = Math.min(z, Z.length - 1), ye = Math.max(0, z - G.length + 1); ye <= ce; ye++) {
            var Me = z - ye | 0;
            g = G.words[Me] | 0, H = Z.words[ye] | 0, F = g * H + J, S += F / 67108864 | 0, J = F & 67108863;
          }
          e.words[z] = J | 0, q = S | 0;
        }
        return q !== 0 ? e.words[z] = q | 0 : e.length--, e.strip();
      }
      var ie = function(G, Z, e) {
        var o = G.words, g = Z.words, H = e.words, F = 0, A, q, z, S = o[0] | 0, J = S & 8191, ce = S >>> 13, ye = o[1] | 0, Me = ye & 8191, me = ye >>> 13, ue = o[2] | 0, fe = ue & 8191, Ae = ue >>> 13, Be = o[3] | 0, pe = Be & 8191, ge = Be >>> 13, Ee = o[4] | 0, Ie = Ee & 8191, Pe = Ee >>> 13, Q = o[5] | 0, K = Q & 8191, te = Q >>> 13, ae = o[6] | 0, ve = ae & 8191, qe = ae >>> 13, Re = o[7] | 0, xe = Re & 8191, Le = Re >>> 13, Te = o[8] | 0, $e = Te & 8191, Ce = Te >>> 13, Ve = o[9] | 0, je = Ve & 8191, at = Ve >>> 13, Qe = g[0] | 0, Ue = Qe & 8191, ut = Qe >>> 13, Ye = g[1] | 0, Oe = Ye & 8191, ft = Ye >>> 13, Ze = g[2] | 0, Ne = Ze & 8191, ht = Ze >>> 13, et = g[3] | 0, De = et & 8191, ct = et >>> 13, tt = g[4] | 0, Fe = tt & 8191, dt = tt >>> 13, rt = g[5] | 0, We = rt & 8191, lt = rt >>> 13, it = g[6] | 0, ze = it & 8191, pt = it >>> 13, nt = g[7] | 0, He = nt & 8191, bt = nt >>> 13, ot = g[8] | 0, Ge = ot & 8191, mt = ot >>> 13, st = g[9] | 0, Ke = st & 8191, yt = st >>> 13;
        e.negative = G.negative ^ Z.negative, e.length = 19, A = Math.imul(J, Ue), q = Math.imul(J, ut), q = q + Math.imul(ce, Ue) | 0, z = Math.imul(ce, ut);
        var Xe = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (Xe >>> 26) | 0, Xe &= 67108863, A = Math.imul(Me, Ue), q = Math.imul(Me, ut), q = q + Math.imul(me, Ue) | 0, z = Math.imul(me, ut), A = A + Math.imul(J, Oe) | 0, q = q + Math.imul(J, ft) | 0, q = q + Math.imul(ce, Oe) | 0, z = z + Math.imul(ce, ft) | 0;
        var Je = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (Je >>> 26) | 0, Je &= 67108863, A = Math.imul(fe, Ue), q = Math.imul(fe, ut), q = q + Math.imul(Ae, Ue) | 0, z = Math.imul(Ae, ut), A = A + Math.imul(Me, Oe) | 0, q = q + Math.imul(Me, ft) | 0, q = q + Math.imul(me, Oe) | 0, z = z + Math.imul(me, ft) | 0, A = A + Math.imul(J, Ne) | 0, q = q + Math.imul(J, ht) | 0, q = q + Math.imul(ce, Ne) | 0, z = z + Math.imul(ce, ht) | 0;
        var gt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, A = Math.imul(pe, Ue), q = Math.imul(pe, ut), q = q + Math.imul(ge, Ue) | 0, z = Math.imul(ge, ut), A = A + Math.imul(fe, Oe) | 0, q = q + Math.imul(fe, ft) | 0, q = q + Math.imul(Ae, Oe) | 0, z = z + Math.imul(Ae, ft) | 0, A = A + Math.imul(Me, Ne) | 0, q = q + Math.imul(Me, ht) | 0, q = q + Math.imul(me, Ne) | 0, z = z + Math.imul(me, ht) | 0, A = A + Math.imul(J, De) | 0, q = q + Math.imul(J, ct) | 0, q = q + Math.imul(ce, De) | 0, z = z + Math.imul(ce, ct) | 0;
        var vt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, A = Math.imul(Ie, Ue), q = Math.imul(Ie, ut), q = q + Math.imul(Pe, Ue) | 0, z = Math.imul(Pe, ut), A = A + Math.imul(pe, Oe) | 0, q = q + Math.imul(pe, ft) | 0, q = q + Math.imul(ge, Oe) | 0, z = z + Math.imul(ge, ft) | 0, A = A + Math.imul(fe, Ne) | 0, q = q + Math.imul(fe, ht) | 0, q = q + Math.imul(Ae, Ne) | 0, z = z + Math.imul(Ae, ht) | 0, A = A + Math.imul(Me, De) | 0, q = q + Math.imul(Me, ct) | 0, q = q + Math.imul(me, De) | 0, z = z + Math.imul(me, ct) | 0, A = A + Math.imul(J, Fe) | 0, q = q + Math.imul(J, dt) | 0, q = q + Math.imul(ce, Fe) | 0, z = z + Math.imul(ce, dt) | 0;
        var wt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, A = Math.imul(K, Ue), q = Math.imul(K, ut), q = q + Math.imul(te, Ue) | 0, z = Math.imul(te, ut), A = A + Math.imul(Ie, Oe) | 0, q = q + Math.imul(Ie, ft) | 0, q = q + Math.imul(Pe, Oe) | 0, z = z + Math.imul(Pe, ft) | 0, A = A + Math.imul(pe, Ne) | 0, q = q + Math.imul(pe, ht) | 0, q = q + Math.imul(ge, Ne) | 0, z = z + Math.imul(ge, ht) | 0, A = A + Math.imul(fe, De) | 0, q = q + Math.imul(fe, ct) | 0, q = q + Math.imul(Ae, De) | 0, z = z + Math.imul(Ae, ct) | 0, A = A + Math.imul(Me, Fe) | 0, q = q + Math.imul(Me, dt) | 0, q = q + Math.imul(me, Fe) | 0, z = z + Math.imul(me, dt) | 0, A = A + Math.imul(J, We) | 0, q = q + Math.imul(J, lt) | 0, q = q + Math.imul(ce, We) | 0, z = z + Math.imul(ce, lt) | 0;
        var _t = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, A = Math.imul(ve, Ue), q = Math.imul(ve, ut), q = q + Math.imul(qe, Ue) | 0, z = Math.imul(qe, ut), A = A + Math.imul(K, Oe) | 0, q = q + Math.imul(K, ft) | 0, q = q + Math.imul(te, Oe) | 0, z = z + Math.imul(te, ft) | 0, A = A + Math.imul(Ie, Ne) | 0, q = q + Math.imul(Ie, ht) | 0, q = q + Math.imul(Pe, Ne) | 0, z = z + Math.imul(Pe, ht) | 0, A = A + Math.imul(pe, De) | 0, q = q + Math.imul(pe, ct) | 0, q = q + Math.imul(ge, De) | 0, z = z + Math.imul(ge, ct) | 0, A = A + Math.imul(fe, Fe) | 0, q = q + Math.imul(fe, dt) | 0, q = q + Math.imul(Ae, Fe) | 0, z = z + Math.imul(Ae, dt) | 0, A = A + Math.imul(Me, We) | 0, q = q + Math.imul(Me, lt) | 0, q = q + Math.imul(me, We) | 0, z = z + Math.imul(me, lt) | 0, A = A + Math.imul(J, ze) | 0, q = q + Math.imul(J, pt) | 0, q = q + Math.imul(ce, ze) | 0, z = z + Math.imul(ce, pt) | 0;
        var Mt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, A = Math.imul(xe, Ue), q = Math.imul(xe, ut), q = q + Math.imul(Le, Ue) | 0, z = Math.imul(Le, ut), A = A + Math.imul(ve, Oe) | 0, q = q + Math.imul(ve, ft) | 0, q = q + Math.imul(qe, Oe) | 0, z = z + Math.imul(qe, ft) | 0, A = A + Math.imul(K, Ne) | 0, q = q + Math.imul(K, ht) | 0, q = q + Math.imul(te, Ne) | 0, z = z + Math.imul(te, ht) | 0, A = A + Math.imul(Ie, De) | 0, q = q + Math.imul(Ie, ct) | 0, q = q + Math.imul(Pe, De) | 0, z = z + Math.imul(Pe, ct) | 0, A = A + Math.imul(pe, Fe) | 0, q = q + Math.imul(pe, dt) | 0, q = q + Math.imul(ge, Fe) | 0, z = z + Math.imul(ge, dt) | 0, A = A + Math.imul(fe, We) | 0, q = q + Math.imul(fe, lt) | 0, q = q + Math.imul(Ae, We) | 0, z = z + Math.imul(Ae, lt) | 0, A = A + Math.imul(Me, ze) | 0, q = q + Math.imul(Me, pt) | 0, q = q + Math.imul(me, ze) | 0, z = z + Math.imul(me, pt) | 0, A = A + Math.imul(J, He) | 0, q = q + Math.imul(J, bt) | 0, q = q + Math.imul(ce, He) | 0, z = z + Math.imul(ce, bt) | 0;
        var St = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, A = Math.imul($e, Ue), q = Math.imul($e, ut), q = q + Math.imul(Ce, Ue) | 0, z = Math.imul(Ce, ut), A = A + Math.imul(xe, Oe) | 0, q = q + Math.imul(xe, ft) | 0, q = q + Math.imul(Le, Oe) | 0, z = z + Math.imul(Le, ft) | 0, A = A + Math.imul(ve, Ne) | 0, q = q + Math.imul(ve, ht) | 0, q = q + Math.imul(qe, Ne) | 0, z = z + Math.imul(qe, ht) | 0, A = A + Math.imul(K, De) | 0, q = q + Math.imul(K, ct) | 0, q = q + Math.imul(te, De) | 0, z = z + Math.imul(te, ct) | 0, A = A + Math.imul(Ie, Fe) | 0, q = q + Math.imul(Ie, dt) | 0, q = q + Math.imul(Pe, Fe) | 0, z = z + Math.imul(Pe, dt) | 0, A = A + Math.imul(pe, We) | 0, q = q + Math.imul(pe, lt) | 0, q = q + Math.imul(ge, We) | 0, z = z + Math.imul(ge, lt) | 0, A = A + Math.imul(fe, ze) | 0, q = q + Math.imul(fe, pt) | 0, q = q + Math.imul(Ae, ze) | 0, z = z + Math.imul(Ae, pt) | 0, A = A + Math.imul(Me, He) | 0, q = q + Math.imul(Me, bt) | 0, q = q + Math.imul(me, He) | 0, z = z + Math.imul(me, bt) | 0, A = A + Math.imul(J, Ge) | 0, q = q + Math.imul(J, mt) | 0, q = q + Math.imul(ce, Ge) | 0, z = z + Math.imul(ce, mt) | 0;
        var qt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, A = Math.imul(je, Ue), q = Math.imul(je, ut), q = q + Math.imul(at, Ue) | 0, z = Math.imul(at, ut), A = A + Math.imul($e, Oe) | 0, q = q + Math.imul($e, ft) | 0, q = q + Math.imul(Ce, Oe) | 0, z = z + Math.imul(Ce, ft) | 0, A = A + Math.imul(xe, Ne) | 0, q = q + Math.imul(xe, ht) | 0, q = q + Math.imul(Le, Ne) | 0, z = z + Math.imul(Le, ht) | 0, A = A + Math.imul(ve, De) | 0, q = q + Math.imul(ve, ct) | 0, q = q + Math.imul(qe, De) | 0, z = z + Math.imul(qe, ct) | 0, A = A + Math.imul(K, Fe) | 0, q = q + Math.imul(K, dt) | 0, q = q + Math.imul(te, Fe) | 0, z = z + Math.imul(te, dt) | 0, A = A + Math.imul(Ie, We) | 0, q = q + Math.imul(Ie, lt) | 0, q = q + Math.imul(Pe, We) | 0, z = z + Math.imul(Pe, lt) | 0, A = A + Math.imul(pe, ze) | 0, q = q + Math.imul(pe, pt) | 0, q = q + Math.imul(ge, ze) | 0, z = z + Math.imul(ge, pt) | 0, A = A + Math.imul(fe, He) | 0, q = q + Math.imul(fe, bt) | 0, q = q + Math.imul(Ae, He) | 0, z = z + Math.imul(Ae, bt) | 0, A = A + Math.imul(Me, Ge) | 0, q = q + Math.imul(Me, mt) | 0, q = q + Math.imul(me, Ge) | 0, z = z + Math.imul(me, mt) | 0, A = A + Math.imul(J, Ke) | 0, q = q + Math.imul(J, yt) | 0, q = q + Math.imul(ce, Ke) | 0, z = z + Math.imul(ce, yt) | 0;
        var At = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, A = Math.imul(je, Oe), q = Math.imul(je, ft), q = q + Math.imul(at, Oe) | 0, z = Math.imul(at, ft), A = A + Math.imul($e, Ne) | 0, q = q + Math.imul($e, ht) | 0, q = q + Math.imul(Ce, Ne) | 0, z = z + Math.imul(Ce, ht) | 0, A = A + Math.imul(xe, De) | 0, q = q + Math.imul(xe, ct) | 0, q = q + Math.imul(Le, De) | 0, z = z + Math.imul(Le, ct) | 0, A = A + Math.imul(ve, Fe) | 0, q = q + Math.imul(ve, dt) | 0, q = q + Math.imul(qe, Fe) | 0, z = z + Math.imul(qe, dt) | 0, A = A + Math.imul(K, We) | 0, q = q + Math.imul(K, lt) | 0, q = q + Math.imul(te, We) | 0, z = z + Math.imul(te, lt) | 0, A = A + Math.imul(Ie, ze) | 0, q = q + Math.imul(Ie, pt) | 0, q = q + Math.imul(Pe, ze) | 0, z = z + Math.imul(Pe, pt) | 0, A = A + Math.imul(pe, He) | 0, q = q + Math.imul(pe, bt) | 0, q = q + Math.imul(ge, He) | 0, z = z + Math.imul(ge, bt) | 0, A = A + Math.imul(fe, Ge) | 0, q = q + Math.imul(fe, mt) | 0, q = q + Math.imul(Ae, Ge) | 0, z = z + Math.imul(Ae, mt) | 0, A = A + Math.imul(Me, Ke) | 0, q = q + Math.imul(Me, yt) | 0, q = q + Math.imul(me, Ke) | 0, z = z + Math.imul(me, yt) | 0;
        var Bt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, A = Math.imul(je, Ne), q = Math.imul(je, ht), q = q + Math.imul(at, Ne) | 0, z = Math.imul(at, ht), A = A + Math.imul($e, De) | 0, q = q + Math.imul($e, ct) | 0, q = q + Math.imul(Ce, De) | 0, z = z + Math.imul(Ce, ct) | 0, A = A + Math.imul(xe, Fe) | 0, q = q + Math.imul(xe, dt) | 0, q = q + Math.imul(Le, Fe) | 0, z = z + Math.imul(Le, dt) | 0, A = A + Math.imul(ve, We) | 0, q = q + Math.imul(ve, lt) | 0, q = q + Math.imul(qe, We) | 0, z = z + Math.imul(qe, lt) | 0, A = A + Math.imul(K, ze) | 0, q = q + Math.imul(K, pt) | 0, q = q + Math.imul(te, ze) | 0, z = z + Math.imul(te, pt) | 0, A = A + Math.imul(Ie, He) | 0, q = q + Math.imul(Ie, bt) | 0, q = q + Math.imul(Pe, He) | 0, z = z + Math.imul(Pe, bt) | 0, A = A + Math.imul(pe, Ge) | 0, q = q + Math.imul(pe, mt) | 0, q = q + Math.imul(ge, Ge) | 0, z = z + Math.imul(ge, mt) | 0, A = A + Math.imul(fe, Ke) | 0, q = q + Math.imul(fe, yt) | 0, q = q + Math.imul(Ae, Ke) | 0, z = z + Math.imul(Ae, yt) | 0;
        var Et = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, A = Math.imul(je, De), q = Math.imul(je, ct), q = q + Math.imul(at, De) | 0, z = Math.imul(at, ct), A = A + Math.imul($e, Fe) | 0, q = q + Math.imul($e, dt) | 0, q = q + Math.imul(Ce, Fe) | 0, z = z + Math.imul(Ce, dt) | 0, A = A + Math.imul(xe, We) | 0, q = q + Math.imul(xe, lt) | 0, q = q + Math.imul(Le, We) | 0, z = z + Math.imul(Le, lt) | 0, A = A + Math.imul(ve, ze) | 0, q = q + Math.imul(ve, pt) | 0, q = q + Math.imul(qe, ze) | 0, z = z + Math.imul(qe, pt) | 0, A = A + Math.imul(K, He) | 0, q = q + Math.imul(K, bt) | 0, q = q + Math.imul(te, He) | 0, z = z + Math.imul(te, bt) | 0, A = A + Math.imul(Ie, Ge) | 0, q = q + Math.imul(Ie, mt) | 0, q = q + Math.imul(Pe, Ge) | 0, z = z + Math.imul(Pe, mt) | 0, A = A + Math.imul(pe, Ke) | 0, q = q + Math.imul(pe, yt) | 0, q = q + Math.imul(ge, Ke) | 0, z = z + Math.imul(ge, yt) | 0;
        var Rt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, A = Math.imul(je, Fe), q = Math.imul(je, dt), q = q + Math.imul(at, Fe) | 0, z = Math.imul(at, dt), A = A + Math.imul($e, We) | 0, q = q + Math.imul($e, lt) | 0, q = q + Math.imul(Ce, We) | 0, z = z + Math.imul(Ce, lt) | 0, A = A + Math.imul(xe, ze) | 0, q = q + Math.imul(xe, pt) | 0, q = q + Math.imul(Le, ze) | 0, z = z + Math.imul(Le, pt) | 0, A = A + Math.imul(ve, He) | 0, q = q + Math.imul(ve, bt) | 0, q = q + Math.imul(qe, He) | 0, z = z + Math.imul(qe, bt) | 0, A = A + Math.imul(K, Ge) | 0, q = q + Math.imul(K, mt) | 0, q = q + Math.imul(te, Ge) | 0, z = z + Math.imul(te, mt) | 0, A = A + Math.imul(Ie, Ke) | 0, q = q + Math.imul(Ie, yt) | 0, q = q + Math.imul(Pe, Ke) | 0, z = z + Math.imul(Pe, yt) | 0;
        var kt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, A = Math.imul(je, We), q = Math.imul(je, lt), q = q + Math.imul(at, We) | 0, z = Math.imul(at, lt), A = A + Math.imul($e, ze) | 0, q = q + Math.imul($e, pt) | 0, q = q + Math.imul(Ce, ze) | 0, z = z + Math.imul(Ce, pt) | 0, A = A + Math.imul(xe, He) | 0, q = q + Math.imul(xe, bt) | 0, q = q + Math.imul(Le, He) | 0, z = z + Math.imul(Le, bt) | 0, A = A + Math.imul(ve, Ge) | 0, q = q + Math.imul(ve, mt) | 0, q = q + Math.imul(qe, Ge) | 0, z = z + Math.imul(qe, mt) | 0, A = A + Math.imul(K, Ke) | 0, q = q + Math.imul(K, yt) | 0, q = q + Math.imul(te, Ke) | 0, z = z + Math.imul(te, yt) | 0;
        var It = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, A = Math.imul(je, ze), q = Math.imul(je, pt), q = q + Math.imul(at, ze) | 0, z = Math.imul(at, pt), A = A + Math.imul($e, He) | 0, q = q + Math.imul($e, bt) | 0, q = q + Math.imul(Ce, He) | 0, z = z + Math.imul(Ce, bt) | 0, A = A + Math.imul(xe, Ge) | 0, q = q + Math.imul(xe, mt) | 0, q = q + Math.imul(Le, Ge) | 0, z = z + Math.imul(Le, mt) | 0, A = A + Math.imul(ve, Ke) | 0, q = q + Math.imul(ve, yt) | 0, q = q + Math.imul(qe, Ke) | 0, z = z + Math.imul(qe, yt) | 0;
        var xt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, A = Math.imul(je, He), q = Math.imul(je, bt), q = q + Math.imul(at, He) | 0, z = Math.imul(at, bt), A = A + Math.imul($e, Ge) | 0, q = q + Math.imul($e, mt) | 0, q = q + Math.imul(Ce, Ge) | 0, z = z + Math.imul(Ce, mt) | 0, A = A + Math.imul(xe, Ke) | 0, q = q + Math.imul(xe, yt) | 0, q = q + Math.imul(Le, Ke) | 0, z = z + Math.imul(Le, yt) | 0;
        var $t = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, A = Math.imul(je, Ge), q = Math.imul(je, mt), q = q + Math.imul(at, Ge) | 0, z = Math.imul(at, mt), A = A + Math.imul($e, Ke) | 0, q = q + Math.imul($e, yt) | 0, q = q + Math.imul(Ce, Ke) | 0, z = z + Math.imul(Ce, yt) | 0;
        var Tt = (F + A | 0) + ((q & 8191) << 13) | 0;
        F = (z + (q >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, A = Math.imul(je, Ke), q = Math.imul(je, yt), q = q + Math.imul(at, Ke) | 0, z = Math.imul(at, yt);
        var Pt = (F + A | 0) + ((q & 8191) << 13) | 0;
        return F = (z + (q >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, H[0] = Xe, H[1] = Je, H[2] = gt, H[3] = vt, H[4] = wt, H[5] = _t, H[6] = Mt, H[7] = St, H[8] = qt, H[9] = At, H[10] = Bt, H[11] = Et, H[12] = Rt, H[13] = kt, H[14] = It, H[15] = xt, H[16] = $t, H[17] = Tt, H[18] = Pt, F !== 0 && (H[19] = F, e.length++), e;
      };
      Math.imul || (ie = re);
      function ne(G, Z, e) {
        e.negative = Z.negative ^ G.negative, e.length = G.length + Z.length;
        for (var o = 0, g = 0, H = 0; H < e.length - 1; H++) {
          var F = g;
          g = 0;
          for (var A = o & 67108863, q = Math.min(H, Z.length - 1), z = Math.max(0, H - G.length + 1); z <= q; z++) {
            var S = H - z, J = G.words[S] | 0, ce = Z.words[z] | 0, ye = J * ce, Me = ye & 67108863;
            F = F + (ye / 67108864 | 0) | 0, Me = Me + A | 0, A = Me & 67108863, F = F + (Me >>> 26) | 0, g += F >>> 26, F &= 67108863;
          }
          e.words[H] = A, o = F, F = g;
        }
        return o !== 0 ? e.words[H] = o : e.length--, e.strip();
      }
      function se(G, Z, e) {
        var o = new oe();
        return o.mulp(G, Z, e);
      }
      t.prototype.mulTo = function(G, Z) {
        var e, o = this.length + G.length;
        return this.length === 10 && G.length === 10 ? e = ie(this, G, Z) : o < 63 ? e = re(this, G, Z) : o < 1024 ? e = ne(this, G, Z) : e = se(this, G, Z), e;
      };
      function oe(G, Z) {
        this.x = G, this.y = Z;
      }
      oe.prototype.makeRBT = function(G) {
        for (var Z = new Array(G), e = t.prototype._countBits(G) - 1, o = 0; o < G; o++)
          Z[o] = this.revBin(o, e, G);
        return Z;
      }, oe.prototype.revBin = function(G, Z, e) {
        if (G === 0 || G === e - 1)
          return G;
        for (var o = 0, g = 0; g < Z; g++)
          o |= (G & 1) << Z - g - 1, G >>= 1;
        return o;
      }, oe.prototype.permute = function(G, Z, e, o, g, H) {
        for (var F = 0; F < H; F++)
          o[F] = Z[G[F]], g[F] = e[G[F]];
      }, oe.prototype.transform = function(G, Z, e, o, g, H) {
        this.permute(H, G, Z, e, o, g);
        for (var F = 1; F < g; F <<= 1)
          for (var A = F << 1, q = Math.cos(2 * Math.PI / A), z = Math.sin(2 * Math.PI / A), S = 0; S < g; S += A)
            for (var J = q, ce = z, ye = 0; ye < F; ye++) {
              var Me = e[S + ye], me = o[S + ye], ue = e[S + ye + F], fe = o[S + ye + F], Ae = J * ue - ce * fe;
              fe = J * fe + ce * ue, ue = Ae, e[S + ye] = Me + ue, o[S + ye] = me + fe, e[S + ye + F] = Me - ue, o[S + ye + F] = me - fe, ye !== A && (Ae = q * J - z * ce, ce = q * ce + z * J, J = Ae);
            }
      }, oe.prototype.guessLen13b = function(G, Z) {
        var e = Math.max(Z, G) | 1, o = e & 1, g = 0;
        for (e = e / 2 | 0; e; e = e >>> 1)
          g++;
        return 1 << g + 1 + o;
      }, oe.prototype.conjugate = function(G, Z, e) {
        if (!(e <= 1))
          for (var o = 0; o < e / 2; o++) {
            var g = G[o];
            G[o] = G[e - o - 1], G[e - o - 1] = g, g = Z[o], Z[o] = -Z[e - o - 1], Z[e - o - 1] = -g;
          }
      }, oe.prototype.normalize13b = function(G, Z) {
        for (var e = 0, o = 0; o < Z / 2; o++) {
          var g = Math.round(G[2 * o + 1] / Z) * 8192 + Math.round(G[2 * o] / Z) + e;
          G[o] = g & 67108863, g < 67108864 ? e = 0 : e = g / 67108864 | 0;
        }
        return G;
      }, oe.prototype.convert13b = function(G, Z, e, o) {
        for (var g = 0, H = 0; H < Z; H++)
          g = g + (G[H] | 0), e[2 * H] = g & 8191, g = g >>> 13, e[2 * H + 1] = g & 8191, g = g >>> 13;
        for (H = 2 * Z; H < o; ++H)
          e[H] = 0;
        B(g === 0), B((g & -8192) === 0);
      }, oe.prototype.stub = function(G) {
        for (var Z = new Array(G), e = 0; e < G; e++)
          Z[e] = 0;
        return Z;
      }, oe.prototype.mulp = function(G, Z, e) {
        var o = 2 * this.guessLen13b(G.length, Z.length), g = this.makeRBT(o), H = this.stub(o), F = new Array(o), A = new Array(o), q = new Array(o), z = new Array(o), S = new Array(o), J = new Array(o), ce = e.words;
        ce.length = o, this.convert13b(G.words, G.length, F, o), this.convert13b(Z.words, Z.length, z, o), this.transform(F, H, A, q, o, g), this.transform(z, H, S, J, o, g);
        for (var ye = 0; ye < o; ye++) {
          var Me = A[ye] * S[ye] - q[ye] * J[ye];
          q[ye] = A[ye] * J[ye] + q[ye] * S[ye], A[ye] = Me;
        }
        return this.conjugate(A, q, o), this.transform(A, q, ce, H, o, g), this.conjugate(ce, H, o), this.normalize13b(ce, o), e.negative = G.negative ^ Z.negative, e.length = G.length + Z.length, e.strip();
      }, t.prototype.mul = function(G) {
        var Z = new t(null);
        return Z.words = new Array(this.length + G.length), this.mulTo(G, Z);
      }, t.prototype.mulf = function(G) {
        var Z = new t(null);
        return Z.words = new Array(this.length + G.length), se(this, G, Z);
      }, t.prototype.imul = function(G) {
        return this.clone().mulTo(G, this);
      }, t.prototype.imuln = function(G) {
        B(typeof G == "number"), B(G < 67108864);
        for (var Z = 0, e = 0; e < this.length; e++) {
          var o = (this.words[e] | 0) * G, g = (o & 67108863) + (Z & 67108863);
          Z >>= 26, Z += o / 67108864 | 0, Z += g >>> 26, this.words[e] = g & 67108863;
        }
        return Z !== 0 && (this.words[e] = Z, this.length++), this;
      }, t.prototype.muln = function(G) {
        return this.clone().imuln(G);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(G) {
        var Z = ee(G);
        if (Z.length === 0)
          return new t(1);
        for (var e = this, o = 0; o < Z.length && Z[o] === 0; o++, e = e.sqr())
          ;
        if (++o < Z.length)
          for (var g = e.sqr(); o < Z.length; o++, g = g.sqr())
            Z[o] !== 0 && (e = e.mul(g));
        return e;
      }, t.prototype.iushln = function(G) {
        B(typeof G == "number" && G >= 0);
        var Z = G % 26, e = (G - Z) / 26, o = 67108863 >>> 26 - Z << 26 - Z, g;
        if (Z !== 0) {
          var H = 0;
          for (g = 0; g < this.length; g++) {
            var F = this.words[g] & o, A = (this.words[g] | 0) - F << Z;
            this.words[g] = A | H, H = F >>> 26 - Z;
          }
          H && (this.words[g] = H, this.length++);
        }
        if (e !== 0) {
          for (g = this.length - 1; g >= 0; g--)
            this.words[g + e] = this.words[g];
          for (g = 0; g < e; g++)
            this.words[g] = 0;
          this.length += e;
        }
        return this.strip();
      }, t.prototype.ishln = function(G) {
        return B(this.negative === 0), this.iushln(G);
      }, t.prototype.iushrn = function(G, Z, e) {
        B(typeof G == "number" && G >= 0);
        var o;
        Z ? o = (Z - Z % 26) / 26 : o = 0;
        var g = G % 26, H = Math.min((G - g) / 26, this.length), F = 67108863 ^ 67108863 >>> g << g, A = e;
        if (o -= H, o = Math.max(0, o), A) {
          for (var q = 0; q < H; q++)
            A.words[q] = this.words[q];
          A.length = H;
        }
        if (H !== 0)
          if (this.length > H)
            for (this.length -= H, q = 0; q < this.length; q++)
              this.words[q] = this.words[q + H];
          else
            this.words[0] = 0, this.length = 1;
        var z = 0;
        for (q = this.length - 1; q >= 0 && (z !== 0 || q >= o); q--) {
          var S = this.words[q] | 0;
          this.words[q] = z << 26 - g | S >>> g, z = S & F;
        }
        return A && z !== 0 && (A.words[A.length++] = z), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
      }, t.prototype.ishrn = function(G, Z, e) {
        return B(this.negative === 0), this.iushrn(G, Z, e);
      }, t.prototype.shln = function(G) {
        return this.clone().ishln(G);
      }, t.prototype.ushln = function(G) {
        return this.clone().iushln(G);
      }, t.prototype.shrn = function(G) {
        return this.clone().ishrn(G);
      }, t.prototype.ushrn = function(G) {
        return this.clone().iushrn(G);
      }, t.prototype.testn = function(G) {
        B(typeof G == "number" && G >= 0);
        var Z = G % 26, e = (G - Z) / 26, o = 1 << Z;
        if (this.length <= e)
          return !1;
        var g = this.words[e];
        return !!(g & o);
      }, t.prototype.imaskn = function(G) {
        B(typeof G == "number" && G >= 0);
        var Z = G % 26, e = (G - Z) / 26;
        if (B(this.negative === 0, "imaskn works only with positive numbers"), this.length <= e)
          return this;
        if (Z !== 0 && e++, this.length = Math.min(e, this.length), Z !== 0) {
          var o = 67108863 ^ 67108863 >>> Z << Z;
          this.words[this.length - 1] &= o;
        }
        return this.strip();
      }, t.prototype.maskn = function(G) {
        return this.clone().imaskn(G);
      }, t.prototype.iaddn = function(G) {
        return B(typeof G == "number"), B(G < 67108864), G < 0 ? this.isubn(-G) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < G ? (this.words[0] = G - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(G), this.negative = 1, this) : this._iaddn(G);
      }, t.prototype._iaddn = function(G) {
        this.words[0] += G;
        for (var Z = 0; Z < this.length && this.words[Z] >= 67108864; Z++)
          this.words[Z] -= 67108864, Z === this.length - 1 ? this.words[Z + 1] = 1 : this.words[Z + 1]++;
        return this.length = Math.max(this.length, Z + 1), this;
      }, t.prototype.isubn = function(G) {
        if (B(typeof G == "number"), B(G < 67108864), G < 0)
          return this.iaddn(-G);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(G), this.negative = 1, this;
        if (this.words[0] -= G, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var Z = 0; Z < this.length && this.words[Z] < 0; Z++)
            this.words[Z] += 67108864, this.words[Z + 1] -= 1;
        return this.strip();
      }, t.prototype.addn = function(G) {
        return this.clone().iaddn(G);
      }, t.prototype.subn = function(G) {
        return this.clone().isubn(G);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(G, Z, e) {
        var o = G.length + e, g;
        this._expand(o);
        var H, F = 0;
        for (g = 0; g < G.length; g++) {
          H = (this.words[g + e] | 0) + F;
          var A = (G.words[g] | 0) * Z;
          H -= A & 67108863, F = (H >> 26) - (A / 67108864 | 0), this.words[g + e] = H & 67108863;
        }
        for (; g < this.length - e; g++)
          H = (this.words[g + e] | 0) + F, F = H >> 26, this.words[g + e] = H & 67108863;
        if (F === 0)
          return this.strip();
        for (B(F === -1), F = 0, g = 0; g < this.length; g++)
          H = -(this.words[g] | 0) + F, F = H >> 26, this.words[g] = H & 67108863;
        return this.negative = 1, this.strip();
      }, t.prototype._wordDiv = function(G, Z) {
        var e = this.length - G.length, o = this.clone(), g = G, H = g.words[g.length - 1] | 0, F = this._countBits(H);
        e = 26 - F, e !== 0 && (g = g.ushln(e), o.iushln(e), H = g.words[g.length - 1] | 0);
        var A = o.length - g.length, q;
        if (Z !== "mod") {
          q = new t(null), q.length = A + 1, q.words = new Array(q.length);
          for (var z = 0; z < q.length; z++)
            q.words[z] = 0;
        }
        var S = o.clone()._ishlnsubmul(g, 1, A);
        S.negative === 0 && (o = S, q && (q.words[A] = 1));
        for (var J = A - 1; J >= 0; J--) {
          var ce = (o.words[g.length + J] | 0) * 67108864 + (o.words[g.length + J - 1] | 0);
          for (ce = Math.min(ce / H | 0, 67108863), o._ishlnsubmul(g, ce, J); o.negative !== 0; )
            ce--, o.negative = 0, o._ishlnsubmul(g, 1, J), o.isZero() || (o.negative ^= 1);
          q && (q.words[J] = ce);
        }
        return q && q.strip(), o.strip(), Z !== "div" && e !== 0 && o.iushrn(e), {
          div: q || null,
          mod: o
        };
      }, t.prototype.divmod = function(G, Z, e) {
        if (B(!G.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var o, g, H;
        return this.negative !== 0 && G.negative === 0 ? (H = this.neg().divmod(G, Z), Z !== "mod" && (o = H.div.neg()), Z !== "div" && (g = H.mod.neg(), e && g.negative !== 0 && g.iadd(G)), {
          div: o,
          mod: g
        }) : this.negative === 0 && G.negative !== 0 ? (H = this.divmod(G.neg(), Z), Z !== "mod" && (o = H.div.neg()), {
          div: o,
          mod: H.mod
        }) : this.negative & G.negative ? (H = this.neg().divmod(G.neg(), Z), Z !== "div" && (g = H.mod.neg(), e && g.negative !== 0 && g.isub(G)), {
          div: H.div,
          mod: g
        }) : G.length > this.length || this.cmp(G) < 0 ? {
          div: new t(0),
          mod: this
        } : G.length === 1 ? Z === "div" ? {
          div: this.divn(G.words[0]),
          mod: null
        } : Z === "mod" ? {
          div: null,
          mod: new t(this.modn(G.words[0]))
        } : {
          div: this.divn(G.words[0]),
          mod: new t(this.modn(G.words[0]))
        } : this._wordDiv(G, Z);
      }, t.prototype.div = function(G) {
        return this.divmod(G, "div", !1).div;
      }, t.prototype.mod = function(G) {
        return this.divmod(G, "mod", !1).mod;
      }, t.prototype.umod = function(G) {
        return this.divmod(G, "mod", !0).mod;
      }, t.prototype.divRound = function(G) {
        var Z = this.divmod(G);
        if (Z.mod.isZero())
          return Z.div;
        var e = Z.div.negative !== 0 ? Z.mod.isub(G) : Z.mod, o = G.ushrn(1), g = G.andln(1), H = e.cmp(o);
        return H < 0 || g === 1 && H === 0 ? Z.div : Z.div.negative !== 0 ? Z.div.isubn(1) : Z.div.iaddn(1);
      }, t.prototype.modn = function(G) {
        B(G <= 67108863);
        for (var Z = (1 << 26) % G, e = 0, o = this.length - 1; o >= 0; o--)
          e = (Z * e + (this.words[o] | 0)) % G;
        return e;
      }, t.prototype.idivn = function(G) {
        B(G <= 67108863);
        for (var Z = 0, e = this.length - 1; e >= 0; e--) {
          var o = (this.words[e] | 0) + Z * 67108864;
          this.words[e] = o / G | 0, Z = o % G;
        }
        return this.strip();
      }, t.prototype.divn = function(G) {
        return this.clone().idivn(G);
      }, t.prototype.egcd = function(G) {
        B(G.negative === 0), B(!G.isZero());
        var Z = this, e = G.clone();
        Z.negative !== 0 ? Z = Z.umod(G) : Z = Z.clone();
        for (var o = new t(1), g = new t(0), H = new t(0), F = new t(1), A = 0; Z.isEven() && e.isEven(); )
          Z.iushrn(1), e.iushrn(1), ++A;
        for (var q = e.clone(), z = Z.clone(); !Z.isZero(); ) {
          for (var S = 0, J = 1; !(Z.words[0] & J) && S < 26; ++S, J <<= 1)
            ;
          if (S > 0)
            for (Z.iushrn(S); S-- > 0; )
              (o.isOdd() || g.isOdd()) && (o.iadd(q), g.isub(z)), o.iushrn(1), g.iushrn(1);
          for (var ce = 0, ye = 1; !(e.words[0] & ye) && ce < 26; ++ce, ye <<= 1)
            ;
          if (ce > 0)
            for (e.iushrn(ce); ce-- > 0; )
              (H.isOdd() || F.isOdd()) && (H.iadd(q), F.isub(z)), H.iushrn(1), F.iushrn(1);
          Z.cmp(e) >= 0 ? (Z.isub(e), o.isub(H), g.isub(F)) : (e.isub(Z), H.isub(o), F.isub(g));
        }
        return {
          a: H,
          b: F,
          gcd: e.iushln(A)
        };
      }, t.prototype._invmp = function(G) {
        B(G.negative === 0), B(!G.isZero());
        var Z = this, e = G.clone();
        Z.negative !== 0 ? Z = Z.umod(G) : Z = Z.clone();
        for (var o = new t(1), g = new t(0), H = e.clone(); Z.cmpn(1) > 0 && e.cmpn(1) > 0; ) {
          for (var F = 0, A = 1; !(Z.words[0] & A) && F < 26; ++F, A <<= 1)
            ;
          if (F > 0)
            for (Z.iushrn(F); F-- > 0; )
              o.isOdd() && o.iadd(H), o.iushrn(1);
          for (var q = 0, z = 1; !(e.words[0] & z) && q < 26; ++q, z <<= 1)
            ;
          if (q > 0)
            for (e.iushrn(q); q-- > 0; )
              g.isOdd() && g.iadd(H), g.iushrn(1);
          Z.cmp(e) >= 0 ? (Z.isub(e), o.isub(g)) : (e.isub(Z), g.isub(o));
        }
        var S;
        return Z.cmpn(1) === 0 ? S = o : S = g, S.cmpn(0) < 0 && S.iadd(G), S;
      }, t.prototype.gcd = function(G) {
        if (this.isZero())
          return G.abs();
        if (G.isZero())
          return this.abs();
        var Z = this.clone(), e = G.clone();
        Z.negative = 0, e.negative = 0;
        for (var o = 0; Z.isEven() && e.isEven(); o++)
          Z.iushrn(1), e.iushrn(1);
        do {
          for (; Z.isEven(); )
            Z.iushrn(1);
          for (; e.isEven(); )
            e.iushrn(1);
          var g = Z.cmp(e);
          if (g < 0) {
            var H = Z;
            Z = e, e = H;
          } else if (g === 0 || e.cmpn(1) === 0)
            break;
          Z.isub(e);
        } while (!0);
        return e.iushln(o);
      }, t.prototype.invm = function(G) {
        return this.egcd(G).a.umod(G);
      }, t.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, t.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, t.prototype.andln = function(G) {
        return this.words[0] & G;
      }, t.prototype.bincn = function(G) {
        B(typeof G == "number");
        var Z = G % 26, e = (G - Z) / 26, o = 1 << Z;
        if (this.length <= e)
          return this._expand(e + 1), this.words[e] |= o, this;
        for (var g = o, H = e; g !== 0 && H < this.length; H++) {
          var F = this.words[H] | 0;
          F += g, g = F >>> 26, F &= 67108863, this.words[H] = F;
        }
        return g !== 0 && (this.words[H] = g, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(G) {
        var Z = G < 0;
        if (this.negative !== 0 && !Z)
          return -1;
        if (this.negative === 0 && Z)
          return 1;
        this.strip();
        var e;
        if (this.length > 1)
          e = 1;
        else {
          Z && (G = -G), B(G <= 67108863, "Number is too big");
          var o = this.words[0] | 0;
          e = o === G ? 0 : o < G ? -1 : 1;
        }
        return this.negative !== 0 ? -e | 0 : e;
      }, t.prototype.cmp = function(G) {
        if (this.negative !== 0 && G.negative === 0)
          return -1;
        if (this.negative === 0 && G.negative !== 0)
          return 1;
        var Z = this.ucmp(G);
        return this.negative !== 0 ? -Z | 0 : Z;
      }, t.prototype.ucmp = function(G) {
        if (this.length > G.length)
          return 1;
        if (this.length < G.length)
          return -1;
        for (var Z = 0, e = this.length - 1; e >= 0; e--) {
          var o = this.words[e] | 0, g = G.words[e] | 0;
          if (o !== g) {
            o < g ? Z = -1 : o > g && (Z = 1);
            break;
          }
        }
        return Z;
      }, t.prototype.gtn = function(G) {
        return this.cmpn(G) === 1;
      }, t.prototype.gt = function(G) {
        return this.cmp(G) === 1;
      }, t.prototype.gten = function(G) {
        return this.cmpn(G) >= 0;
      }, t.prototype.gte = function(G) {
        return this.cmp(G) >= 0;
      }, t.prototype.ltn = function(G) {
        return this.cmpn(G) === -1;
      }, t.prototype.lt = function(G) {
        return this.cmp(G) === -1;
      }, t.prototype.lten = function(G) {
        return this.cmpn(G) <= 0;
      }, t.prototype.lte = function(G) {
        return this.cmp(G) <= 0;
      }, t.prototype.eqn = function(G) {
        return this.cmpn(G) === 0;
      }, t.prototype.eq = function(G) {
        return this.cmp(G) === 0;
      }, t.red = function(G) {
        return new le(G);
      }, t.prototype.toRed = function(G) {
        return B(!this.red, "Already a number in reduction context"), B(this.negative === 0, "red works only with positives"), G.convertTo(this)._forceRed(G);
      }, t.prototype.fromRed = function() {
        return B(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, t.prototype._forceRed = function(G) {
        return this.red = G, this;
      }, t.prototype.forceRed = function(G) {
        return B(!this.red, "Already a number in reduction context"), this._forceRed(G);
      }, t.prototype.redAdd = function(G) {
        return B(this.red, "redAdd works only with red numbers"), this.red.add(this, G);
      }, t.prototype.redIAdd = function(G) {
        return B(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, G);
      }, t.prototype.redSub = function(G) {
        return B(this.red, "redSub works only with red numbers"), this.red.sub(this, G);
      }, t.prototype.redISub = function(G) {
        return B(this.red, "redISub works only with red numbers"), this.red.isub(this, G);
      }, t.prototype.redShl = function(G) {
        return B(this.red, "redShl works only with red numbers"), this.red.shl(this, G);
      }, t.prototype.redMul = function(G) {
        return B(this.red, "redMul works only with red numbers"), this.red._verify2(this, G), this.red.mul(this, G);
      }, t.prototype.redIMul = function(G) {
        return B(this.red, "redMul works only with red numbers"), this.red._verify2(this, G), this.red.imul(this, G);
      }, t.prototype.redSqr = function() {
        return B(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, t.prototype.redISqr = function() {
        return B(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, t.prototype.redSqrt = function() {
        return B(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, t.prototype.redInvm = function() {
        return B(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, t.prototype.redNeg = function() {
        return B(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, t.prototype.redPow = function(G) {
        return B(this.red && !G.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, G);
      };
      var be = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function de(G, Z) {
        this.name = G, this.p = new t(Z, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      de.prototype._tmp = function() {
        var G = new t(null);
        return G.words = new Array(Math.ceil(this.n / 13)), G;
      }, de.prototype.ireduce = function(G) {
        var Z = G, e;
        do
          this.split(Z, this.tmp), Z = this.imulK(Z), Z = Z.iadd(this.tmp), e = Z.bitLength();
        while (e > this.n);
        var o = e < this.n ? -1 : Z.ucmp(this.p);
        return o === 0 ? (Z.words[0] = 0, Z.length = 1) : o > 0 ? Z.isub(this.p) : Z.strip !== void 0 ? Z.strip() : Z._strip(), Z;
      }, de.prototype.split = function(G, Z) {
        G.iushrn(this.n, 0, Z);
      }, de.prototype.imulK = function(G) {
        return G.imul(this.k);
      };
      function we() {
        de.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      V(we, de), we.prototype.split = function(G, Z) {
        for (var e = 4194303, o = Math.min(G.length, 9), g = 0; g < o; g++)
          Z.words[g] = G.words[g];
        if (Z.length = o, G.length <= 9) {
          G.words[0] = 0, G.length = 1;
          return;
        }
        var H = G.words[9];
        for (Z.words[Z.length++] = H & e, g = 10; g < G.length; g++) {
          var F = G.words[g] | 0;
          G.words[g - 10] = (F & e) << 4 | H >>> 22, H = F;
        }
        H >>>= 22, G.words[g - 10] = H, H === 0 && G.length > 10 ? G.length -= 10 : G.length -= 9;
      }, we.prototype.imulK = function(G) {
        G.words[G.length] = 0, G.words[G.length + 1] = 0, G.length += 2;
        for (var Z = 0, e = 0; e < G.length; e++) {
          var o = G.words[e] | 0;
          Z += o * 977, G.words[e] = Z & 67108863, Z = o * 64 + (Z / 67108864 | 0);
        }
        return G.words[G.length - 1] === 0 && (G.length--, G.words[G.length - 1] === 0 && G.length--), G;
      };
      function Se() {
        de.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      V(Se, de);
      function ke() {
        de.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      V(ke, de);
      function he() {
        de.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      V(he, de), he.prototype.imulK = function(G) {
        for (var Z = 0, e = 0; e < G.length; e++) {
          var o = (G.words[e] | 0) * 19 + Z, g = o & 67108863;
          o >>>= 26, G.words[e] = g, Z = o;
        }
        return Z !== 0 && (G.words[G.length++] = Z), G;
      }, t._prime = function(G) {
        if (be[G])
          return be[G];
        var Z;
        if (G === "k256")
          Z = new we();
        else if (G === "p224")
          Z = new Se();
        else if (G === "p192")
          Z = new ke();
        else if (G === "p25519")
          Z = new he();
        else
          throw new Error("Unknown prime " + G);
        return be[G] = Z, Z;
      };
      function le(G) {
        if (typeof G == "string") {
          var Z = t._prime(G);
          this.m = Z.p, this.prime = Z;
        } else
          B(G.gtn(1), "modulus must be greater than 1"), this.m = G, this.prime = null;
      }
      le.prototype._verify1 = function(G) {
        B(G.negative === 0, "red works only with positives"), B(G.red, "red works only with red numbers");
      }, le.prototype._verify2 = function(G, Z) {
        B((G.negative | Z.negative) === 0, "red works only with positives"), B(
          G.red && G.red === Z.red,
          "red works only with red numbers"
        );
      }, le.prototype.imod = function(G) {
        return this.prime ? this.prime.ireduce(G)._forceRed(this) : G.umod(this.m)._forceRed(this);
      }, le.prototype.neg = function(G) {
        return G.isZero() ? G.clone() : this.m.sub(G)._forceRed(this);
      }, le.prototype.add = function(G, Z) {
        this._verify2(G, Z);
        var e = G.add(Z);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
      }, le.prototype.iadd = function(G, Z) {
        this._verify2(G, Z);
        var e = G.iadd(Z);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e;
      }, le.prototype.sub = function(G, Z) {
        this._verify2(G, Z);
        var e = G.sub(Z);
        return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
      }, le.prototype.isub = function(G, Z) {
        this._verify2(G, Z);
        var e = G.isub(Z);
        return e.cmpn(0) < 0 && e.iadd(this.m), e;
      }, le.prototype.shl = function(G, Z) {
        return this._verify1(G), this.imod(G.ushln(Z));
      }, le.prototype.imul = function(G, Z) {
        return this._verify2(G, Z), this.imod(G.imul(Z));
      }, le.prototype.mul = function(G, Z) {
        return this._verify2(G, Z), this.imod(G.mul(Z));
      }, le.prototype.isqr = function(G) {
        return this.imul(G, G.clone());
      }, le.prototype.sqr = function(G) {
        return this.mul(G, G);
      }, le.prototype.sqrt = function(G) {
        if (G.isZero())
          return G.clone();
        var Z = this.m.andln(3);
        if (B(Z % 2 === 1), Z === 3) {
          var e = this.m.add(new t(1)).iushrn(2);
          return this.pow(G, e);
        }
        for (var o = this.m.subn(1), g = 0; !o.isZero() && o.andln(1) === 0; )
          g++, o.iushrn(1);
        B(!o.isZero());
        var H = new t(1).toRed(this), F = H.redNeg(), A = this.m.subn(1).iushrn(1), q = this.m.bitLength();
        for (q = new t(2 * q * q).toRed(this); this.pow(q, A).cmp(F) !== 0; )
          q.redIAdd(F);
        for (var z = this.pow(q, o), S = this.pow(G, o.addn(1).iushrn(1)), J = this.pow(G, o), ce = g; J.cmp(H) !== 0; ) {
          for (var ye = J, Me = 0; ye.cmp(H) !== 0; Me++)
            ye = ye.redSqr();
          B(Me < ce);
          var me = this.pow(z, new t(1).iushln(ce - Me - 1));
          S = S.redMul(me), z = me.redSqr(), J = J.redMul(z), ce = Me;
        }
        return S;
      }, le.prototype.invm = function(G) {
        var Z = G._invmp(this.m);
        return Z.negative !== 0 ? (Z.negative = 0, this.imod(Z).redNeg()) : this.imod(Z);
      }, le.prototype.pow = function(G, Z) {
        if (Z.isZero())
          return new t(1).toRed(this);
        if (Z.cmpn(1) === 0)
          return G.clone();
        var e = 4, o = new Array(1 << e);
        o[0] = new t(1).toRed(this), o[1] = G;
        for (var g = 2; g < o.length; g++)
          o[g] = this.mul(o[g - 1], G);
        var H = o[0], F = 0, A = 0, q = Z.bitLength() % 26;
        for (q === 0 && (q = 26), g = Z.length - 1; g >= 0; g--) {
          for (var z = Z.words[g], S = q - 1; S >= 0; S--) {
            var J = z >> S & 1;
            if (H !== o[0] && (H = this.sqr(H)), J === 0 && F === 0) {
              A = 0;
              continue;
            }
            F <<= 1, F |= J, A++, !(A !== e && (g !== 0 || S !== 0)) && (H = this.mul(H, o[F]), A = 0, F = 0);
          }
          q = 26;
        }
        return H;
      }, le.prototype.convertTo = function(G) {
        var Z = G.umod(this.m);
        return Z === G ? Z.clone() : Z;
      }, le.prototype.convertFrom = function(G) {
        var Z = G.clone();
        return Z.red = null, Z;
      }, t.mont = function(G) {
        return new _e(G);
      };
      function _e(G) {
        le.call(this, G), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      V(_e, le), _e.prototype.convertTo = function(G) {
        return this.imod(G.ushln(this.shift));
      }, _e.prototype.convertFrom = function(G) {
        var Z = this.imod(G.mul(this.rinv));
        return Z.red = null, Z;
      }, _e.prototype.imul = function(G, Z) {
        if (G.isZero() || Z.isZero())
          return G.words[0] = 0, G.length = 1, G;
        var e = G.imul(Z), o = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), g = e.isub(o).iushrn(this.shift), H = g;
        return g.cmp(this.m) >= 0 ? H = g.isub(this.m) : g.cmpn(0) < 0 && (H = g.iadd(this.m)), H._forceRed(this);
      }, _e.prototype.mul = function(G, Z) {
        if (G.isZero() || Z.isZero())
          return new t(0)._forceRed(this);
        var e = G.mul(Z), o = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), g = e.isub(o).iushrn(this.shift), H = g;
        return g.cmp(this.m) >= 0 ? H = g.isub(this.m) : g.cmpn(0) < 0 && (H = g.iadd(this.m)), H._forceRed(this);
      }, _e.prototype.invm = function(G) {
        var Z = this.imod(G._invmp(this.m).mul(this.r2));
        return Z._forceRed(this);
      };
    })($, commonjsGlobal);
  }(bn$2)), bn$2.exports;
}
var brorand = { exports: {} }, hasRequiredBrorand;
function requireBrorand() {
  if (hasRequiredBrorand)
    return brorand.exports;
  hasRequiredBrorand = 1;
  var $;
  brorand.exports = function(B) {
    return $ || ($ = new h(null)), $.generate(B);
  };
  function h(B) {
    this.rand = B;
  }
  if (brorand.exports.Rand = h, h.prototype.generate = function(B) {
    return this._rand(B);
  }, h.prototype._rand = function(B) {
    if (this.rand.getBytes)
      return this.rand.getBytes(B);
    for (var V = new Uint8Array(B), t = 0; t < V.length; t++)
      V[t] = this.rand.getByte();
    return V;
  }, typeof self == "object")
    self.crypto && self.crypto.getRandomValues ? h.prototype._rand = function(B) {
      var V = new Uint8Array(B);
      return self.crypto.getRandomValues(V), V;
    } : self.msCrypto && self.msCrypto.getRandomValues ? h.prototype._rand = function(B) {
      var V = new Uint8Array(B);
      return self.msCrypto.getRandomValues(V), V;
    } : typeof window == "object" && (h.prototype._rand = function() {
      throw new Error("Not implemented yet");
    });
  else
    try {
      var U = requireCryptoBrowserify();
      if (typeof U.randomBytes != "function")
        throw new Error("Not supported");
      h.prototype._rand = function(B) {
        return U.randomBytes(B);
      };
    } catch {
    }
  return brorand.exports;
}
var mr, hasRequiredMr;
function requireMr() {
  if (hasRequiredMr)
    return mr;
  hasRequiredMr = 1;
  var $ = requireBn$2(), h = requireBrorand();
  function U(B) {
    this.rand = B || new h.Rand();
  }
  return mr = U, U.create = function(B) {
    return new U(B);
  }, U.prototype._randbelow = function(B) {
    var V = B.bitLength(), t = Math.ceil(V / 8);
    do
      var O = new $(this.rand.generate(t));
    while (O.cmp(B) >= 0);
    return O;
  }, U.prototype._randrange = function(B, V) {
    var t = V.sub(B);
    return B.add(this._randbelow(t));
  }, U.prototype.test = function(B, V, t) {
    var O = B.bitLength(), M = $.mont(B), D = new $(1).toRed(M);
    V || (V = Math.max(1, O / 48 | 0));
    for (var I = B.subn(1), P = 0; !I.testn(P); P++)
      ;
    for (var Y = B.shrn(P), X = I.toRed(M), ee = !0; V > 0; V--) {
      var re = this._randrange(new $(2), I);
      t && t(re);
      var ie = re.toRed(M).redPow(Y);
      if (!(ie.cmp(D) === 0 || ie.cmp(X) === 0)) {
        for (var ne = 1; ne < P; ne++) {
          if (ie = ie.redSqr(), ie.cmp(D) === 0)
            return !1;
          if (ie.cmp(X) === 0)
            break;
        }
        if (ne === P)
          return !1;
      }
    }
    return ee;
  }, U.prototype.getDivisor = function(B, V) {
    var t = B.bitLength(), O = $.mont(B), M = new $(1).toRed(O);
    V || (V = Math.max(1, t / 48 | 0));
    for (var D = B.subn(1), I = 0; !D.testn(I); I++)
      ;
    for (var P = B.shrn(I), Y = D.toRed(O); V > 0; V--) {
      var X = this._randrange(new $(2), D), ee = B.gcd(X);
      if (ee.cmpn(1) !== 0)
        return ee;
      var re = X.toRed(O).redPow(P);
      if (!(re.cmp(M) === 0 || re.cmp(Y) === 0)) {
        for (var ie = 1; ie < I; ie++) {
          if (re = re.redSqr(), re.cmp(M) === 0)
            return re.fromRed().subn(1).gcd(B);
          if (re.cmp(Y) === 0)
            break;
        }
        if (ie === I)
          return re = re.redSqr(), re.fromRed().subn(1).gcd(B);
      }
    }
    return !1;
  }, mr;
}
var generatePrime, hasRequiredGeneratePrime;
function requireGeneratePrime() {
  if (hasRequiredGeneratePrime)
    return generatePrime;
  hasRequiredGeneratePrime = 1;
  var $ = requireBrowser$b();
  generatePrime = ne, ne.simpleSieve = re, ne.fermatTest = ie;
  var h = requireBn$2(), U = new h(24), B = requireMr(), V = new B(), t = new h(1), O = new h(2), M = new h(5);
  new h(16), new h(8);
  var D = new h(10), I = new h(3);
  new h(7);
  var P = new h(11), Y = new h(4);
  new h(12);
  var X = null;
  function ee() {
    if (X !== null)
      return X;
    var se = 1048576, oe = [];
    oe[0] = 2;
    for (var be = 1, de = 3; de < se; de += 2) {
      for (var we = Math.ceil(Math.sqrt(de)), Se = 0; Se < be && oe[Se] <= we && de % oe[Se] !== 0; Se++)
        ;
      be !== Se && oe[Se] <= we || (oe[be++] = de);
    }
    return X = oe, oe;
  }
  function re(se) {
    for (var oe = ee(), be = 0; be < oe.length; be++)
      if (se.modn(oe[be]) === 0)
        return se.cmpn(oe[be]) === 0;
    return !0;
  }
  function ie(se) {
    var oe = h.mont(se);
    return O.toRed(oe).redPow(se.subn(1)).fromRed().cmpn(1) === 0;
  }
  function ne(se, oe) {
    if (se < 16)
      return oe === 2 || oe === 5 ? new h([140, 123]) : new h([140, 39]);
    oe = new h(oe);
    for (var be, de; ; ) {
      for (be = new h($(Math.ceil(se / 8))); be.bitLength() > se; )
        be.ishrn(1);
      if (be.isEven() && be.iadd(t), be.testn(1) || be.iadd(O), oe.cmp(O)) {
        if (!oe.cmp(M))
          for (; be.mod(D).cmp(I); )
            be.iadd(Y);
      } else
        for (; be.mod(U).cmp(P); )
          be.iadd(Y);
      if (de = be.shrn(1), re(de) && re(be) && ie(de) && ie(be) && V.test(de) && V.test(be))
        return be;
    }
  }
  return generatePrime;
}
const modp1 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
}, modp2 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
}, modp5 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
}, modp14 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
}, modp15 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
}, modp16 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
}, modp17 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
}, modp18 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
}, require$$1$1 = {
  modp1,
  modp2,
  modp5,
  modp14,
  modp15,
  modp16,
  modp17,
  modp18
};
var dh, hasRequiredDh;
function requireDh() {
  if (hasRequiredDh)
    return dh;
  hasRequiredDh = 1;
  var $ = requireBn$2(), h = requireMr(), U = new h(), B = new $(24), V = new $(11), t = new $(10), O = new $(3), M = new $(7), D = requireGeneratePrime(), I = requireBrowser$b();
  dh = re;
  function P(ne, se) {
    return se = se || "utf8", bufferExports.Buffer.isBuffer(ne) || (ne = new bufferExports.Buffer(ne, se)), this._pub = new $(ne), this;
  }
  function Y(ne, se) {
    return se = se || "utf8", bufferExports.Buffer.isBuffer(ne) || (ne = new bufferExports.Buffer(ne, se)), this._priv = new $(ne), this;
  }
  var X = {};
  function ee(ne, se) {
    var oe = se.toString("hex"), be = [oe, ne.toString(16)].join("_");
    if (be in X)
      return X[be];
    var de = 0;
    if (ne.isEven() || !D.simpleSieve || !D.fermatTest(ne) || !U.test(ne))
      return de += 1, oe === "02" || oe === "05" ? de += 8 : de += 4, X[be] = de, de;
    U.test(ne.shrn(1)) || (de += 2);
    var we;
    switch (oe) {
      case "02":
        ne.mod(B).cmp(V) && (de += 8);
        break;
      case "05":
        we = ne.mod(t), we.cmp(O) && we.cmp(M) && (de += 8);
        break;
      default:
        de += 4;
    }
    return X[be] = de, de;
  }
  function re(ne, se, oe) {
    this.setGenerator(se), this.__prime = new $(ne), this._prime = $.mont(this.__prime), this._primeLen = ne.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, oe ? (this.setPublicKey = P, this.setPrivateKey = Y) : this._primeCode = 8;
  }
  Object.defineProperty(re.prototype, "verifyError", {
    enumerable: !0,
    get: function() {
      return typeof this._primeCode != "number" && (this._primeCode = ee(this.__prime, this.__gen)), this._primeCode;
    }
  }), re.prototype.generateKeys = function() {
    return this._priv || (this._priv = new $(I(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey();
  }, re.prototype.computeSecret = function(ne) {
    ne = new $(ne), ne = ne.toRed(this._prime);
    var se = ne.redPow(this._priv).fromRed(), oe = new bufferExports.Buffer(se.toArray()), be = this.getPrime();
    if (oe.length < be.length) {
      var de = new bufferExports.Buffer(be.length - oe.length);
      de.fill(0), oe = bufferExports.Buffer.concat([de, oe]);
    }
    return oe;
  }, re.prototype.getPublicKey = function(ne) {
    return ie(this._pub, ne);
  }, re.prototype.getPrivateKey = function(ne) {
    return ie(this._priv, ne);
  }, re.prototype.getPrime = function(ne) {
    return ie(this.__prime, ne);
  }, re.prototype.getGenerator = function(ne) {
    return ie(this._gen, ne);
  }, re.prototype.setGenerator = function(ne, se) {
    return se = se || "utf8", bufferExports.Buffer.isBuffer(ne) || (ne = new bufferExports.Buffer(ne, se)), this.__gen = ne, this._gen = new $(ne), this;
  };
  function ie(ne, se) {
    var oe = new bufferExports.Buffer(ne.toArray());
    return se ? oe.toString(se) : oe;
  }
  return dh;
}
var hasRequiredBrowser$4;
function requireBrowser$4() {
  if (hasRequiredBrowser$4)
    return browser$4;
  hasRequiredBrowser$4 = 1;
  var $ = requireGeneratePrime(), h = require$$1$1, U = requireDh();
  function B(O) {
    var M = new bufferExports.Buffer(h[O].prime, "hex"), D = new bufferExports.Buffer(h[O].gen, "hex");
    return new U(M, D);
  }
  var V = {
    binary: !0,
    hex: !0,
    base64: !0
  };
  function t(O, M, D, I) {
    return bufferExports.Buffer.isBuffer(M) || V[M] === void 0 ? t(O, "binary", M, D) : (M = M || "binary", I = I || "binary", D = D || new bufferExports.Buffer([2]), bufferExports.Buffer.isBuffer(D) || (D = new bufferExports.Buffer(D, I)), typeof O == "number" ? new U($(O, D), D, !0) : (bufferExports.Buffer.isBuffer(O) || (O = new bufferExports.Buffer(O, M)), new U(O, D, !0)));
  }
  return browser$4.DiffieHellmanGroup = browser$4.createDiffieHellmanGroup = browser$4.getDiffieHellman = B, browser$4.createDiffieHellman = browser$4.DiffieHellman = t, browser$4;
}
var readableBrowser = { exports: {} }, processNextickArgs = { exports: {} }, hasRequiredProcessNextickArgs;
function requireProcessNextickArgs() {
  if (hasRequiredProcessNextickArgs)
    return processNextickArgs.exports;
  hasRequiredProcessNextickArgs = 1, typeof process$1 > "u" || !process$1.version || process$1.version.indexOf("v0.") === 0 || process$1.version.indexOf("v1.") === 0 && process$1.version.indexOf("v1.8.") !== 0 ? processNextickArgs.exports = { nextTick: $ } : processNextickArgs.exports = process$1;
  function $(h, U, B, V) {
    if (typeof h != "function")
      throw new TypeError('"callback" argument must be a function');
    var t = arguments.length, O, M;
    switch (t) {
      case 0:
      case 1:
        return process$1.nextTick(h);
      case 2:
        return process$1.nextTick(function() {
          h.call(null, U);
        });
      case 3:
        return process$1.nextTick(function() {
          h.call(null, U, B);
        });
      case 4:
        return process$1.nextTick(function() {
          h.call(null, U, B, V);
        });
      default:
        for (O = new Array(t - 1), M = 0; M < O.length; )
          O[M++] = arguments[M];
        return process$1.nextTick(function() {
          h.apply(null, O);
        });
    }
  }
  return processNextickArgs.exports;
}
var isarray, hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray)
    return isarray;
  hasRequiredIsarray = 1;
  var $ = {}.toString;
  return isarray = Array.isArray || function(h) {
    return $.call(h) == "[object Array]";
  }, isarray;
}
var streamBrowser, hasRequiredStreamBrowser;
function requireStreamBrowser() {
  return hasRequiredStreamBrowser || (hasRequiredStreamBrowser = 1, streamBrowser = requireEvents().EventEmitter), streamBrowser;
}
var safeBuffer = { exports: {} }, hasRequiredSafeBuffer;
function requireSafeBuffer() {
  return hasRequiredSafeBuffer || (hasRequiredSafeBuffer = 1, function($, h) {
    var U = requireBuffer$1(), B = U.Buffer;
    function V(O, M) {
      for (var D in O)
        M[D] = O[D];
    }
    B.from && B.alloc && B.allocUnsafe && B.allocUnsafeSlow ? $.exports = U : (V(U, h), h.Buffer = t);
    function t(O, M, D) {
      return B(O, M, D);
    }
    V(B, t), t.from = function(O, M, D) {
      if (typeof O == "number")
        throw new TypeError("Argument must not be a number");
      return B(O, M, D);
    }, t.alloc = function(O, M, D) {
      if (typeof O != "number")
        throw new TypeError("Argument must be a number");
      var I = B(O);
      return M !== void 0 ? typeof D == "string" ? I.fill(M, D) : I.fill(M) : I.fill(0), I;
    }, t.allocUnsafe = function(O) {
      if (typeof O != "number")
        throw new TypeError("Argument must be a number");
      return B(O);
    }, t.allocUnsafeSlow = function(O) {
      if (typeof O != "number")
        throw new TypeError("Argument must be a number");
      return U.SlowBuffer(O);
    };
  }(safeBuffer, safeBuffer.exports)), safeBuffer.exports;
}
var util = {}, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil)
    return util;
  hasRequiredUtil = 1;
  function $(ie) {
    return Array.isArray ? Array.isArray(ie) : re(ie) === "[object Array]";
  }
  util.isArray = $;
  function h(ie) {
    return typeof ie == "boolean";
  }
  util.isBoolean = h;
  function U(ie) {
    return ie === null;
  }
  util.isNull = U;
  function B(ie) {
    return ie == null;
  }
  util.isNullOrUndefined = B;
  function V(ie) {
    return typeof ie == "number";
  }
  util.isNumber = V;
  function t(ie) {
    return typeof ie == "string";
  }
  util.isString = t;
  function O(ie) {
    return typeof ie == "symbol";
  }
  util.isSymbol = O;
  function M(ie) {
    return ie === void 0;
  }
  util.isUndefined = M;
  function D(ie) {
    return re(ie) === "[object RegExp]";
  }
  util.isRegExp = D;
  function I(ie) {
    return typeof ie == "object" && ie !== null;
  }
  util.isObject = I;
  function P(ie) {
    return re(ie) === "[object Date]";
  }
  util.isDate = P;
  function Y(ie) {
    return re(ie) === "[object Error]" || ie instanceof Error;
  }
  util.isError = Y;
  function X(ie) {
    return typeof ie == "function";
  }
  util.isFunction = X;
  function ee(ie) {
    return ie === null || typeof ie == "boolean" || typeof ie == "number" || typeof ie == "string" || typeof ie == "symbol" || // ES6 symbol
    typeof ie > "u";
  }
  util.isPrimitive = ee, util.isBuffer = requireBuffer$1().Buffer.isBuffer;
  function re(ie) {
    return Object.prototype.toString.call(ie);
  }
  return util;
}
var BufferList = { exports: {} }, hasRequiredBufferList;
function requireBufferList() {
  return hasRequiredBufferList || (hasRequiredBufferList = 1, function($) {
    function h(t, O) {
      if (!(t instanceof O))
        throw new TypeError("Cannot call a class as a function");
    }
    var U = requireSafeBuffer().Buffer, B = requireUtil$1();
    function V(t, O, M) {
      t.copy(O, M);
    }
    $.exports = function() {
      function t() {
        h(this, t), this.head = null, this.tail = null, this.length = 0;
      }
      return t.prototype.push = function(O) {
        var M = { data: O, next: null };
        this.length > 0 ? this.tail.next = M : this.head = M, this.tail = M, ++this.length;
      }, t.prototype.unshift = function(O) {
        var M = { data: O, next: this.head };
        this.length === 0 && (this.tail = M), this.head = M, ++this.length;
      }, t.prototype.shift = function() {
        if (this.length !== 0) {
          var O = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, O;
        }
      }, t.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, t.prototype.join = function(O) {
        if (this.length === 0)
          return "";
        for (var M = this.head, D = "" + M.data; M = M.next; )
          D += O + M.data;
        return D;
      }, t.prototype.concat = function(O) {
        if (this.length === 0)
          return U.alloc(0);
        for (var M = U.allocUnsafe(O >>> 0), D = this.head, I = 0; D; )
          V(D.data, M, I), I += D.data.length, D = D.next;
        return M;
      }, t;
    }(), B && B.inspect && B.inspect.custom && ($.exports.prototype[B.inspect.custom] = function() {
      var t = B.inspect({ length: this.length });
      return this.constructor.name + " " + t;
    });
  }(BufferList)), BufferList.exports;
}
var destroy_1, hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy)
    return destroy_1;
  hasRequiredDestroy = 1;
  var $ = requireProcessNextickArgs();
  function h(V, t) {
    var O = this, M = this._readableState && this._readableState.destroyed, D = this._writableState && this._writableState.destroyed;
    return M || D ? (t ? t(V) : V && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, $.nextTick(B, this, V)) : $.nextTick(B, this, V)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(V || null, function(I) {
      !t && I ? O._writableState ? O._writableState.errorEmitted || (O._writableState.errorEmitted = !0, $.nextTick(B, O, I)) : $.nextTick(B, O, I) : t && t(I);
    }), this);
  }
  function U() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function B(V, t) {
    V.emit("error", t);
  }
  return destroy_1 = {
    destroy: h,
    undestroy: U
  }, destroy_1;
}
var _stream_writable, hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable)
    return _stream_writable;
  hasRequired_stream_writable = 1;
  var $ = requireProcessNextickArgs();
  _stream_writable = ie;
  function h(F) {
    var A = this;
    this.next = null, this.entry = null, this.finish = function() {
      H(A, F);
    };
  }
  var U = !process$1.browser && ["v0.10", "v0.9."].indexOf(process$1.version.slice(0, 5)) > -1 ? setImmediate : $.nextTick, B;
  ie.WritableState = ee;
  var V = Object.create(requireUtil());
  V.inherits = requireInherits_browser();
  var t = {
    deprecate: requireBrowser$a()
  }, O = requireStreamBrowser(), M = requireSafeBuffer().Buffer, D = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function I(F) {
    return M.from(F);
  }
  function P(F) {
    return M.isBuffer(F) || F instanceof D;
  }
  var Y = requireDestroy();
  V.inherits(ie, O);
  function X() {
  }
  function ee(F, A) {
    B = B || require_stream_duplex(), F = F || {};
    var q = A instanceof B;
    this.objectMode = !!F.objectMode, q && (this.objectMode = this.objectMode || !!F.writableObjectMode);
    var z = F.highWaterMark, S = F.writableHighWaterMark, J = this.objectMode ? 16 : 16 * 1024;
    z || z === 0 ? this.highWaterMark = z : q && (S || S === 0) ? this.highWaterMark = S : this.highWaterMark = J, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var ce = F.decodeStrings === !1;
    this.decodeStrings = !ce, this.defaultEncoding = F.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(ye) {
      ke(A, ye);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new h(this);
  }
  ee.prototype.getBuffer = function() {
    for (var F = this.bufferedRequest, A = []; F; )
      A.push(F), F = F.next;
    return A;
  }, function() {
    try {
      Object.defineProperty(ee.prototype, "buffer", {
        get: t.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var re;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (re = Function.prototype[Symbol.hasInstance], Object.defineProperty(ie, Symbol.hasInstance, {
    value: function(F) {
      return re.call(this, F) ? !0 : this !== ie ? !1 : F && F._writableState instanceof ee;
    }
  })) : re = function(F) {
    return F instanceof this;
  };
  function ie(F) {
    if (B = B || require_stream_duplex(), !re.call(ie, this) && !(this instanceof B))
      return new ie(F);
    this._writableState = new ee(F, this), this.writable = !0, F && (typeof F.write == "function" && (this._write = F.write), typeof F.writev == "function" && (this._writev = F.writev), typeof F.destroy == "function" && (this._destroy = F.destroy), typeof F.final == "function" && (this._final = F.final)), O.call(this);
  }
  ie.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function ne(F, A) {
    var q = new Error("write after end");
    F.emit("error", q), $.nextTick(A, q);
  }
  function se(F, A, q, z) {
    var S = !0, J = !1;
    return q === null ? J = new TypeError("May not write null values to stream") : typeof q != "string" && q !== void 0 && !A.objectMode && (J = new TypeError("Invalid non-string/buffer chunk")), J && (F.emit("error", J), $.nextTick(z, J), S = !1), S;
  }
  ie.prototype.write = function(F, A, q) {
    var z = this._writableState, S = !1, J = !z.objectMode && P(F);
    return J && !M.isBuffer(F) && (F = I(F)), typeof A == "function" && (q = A, A = null), J ? A = "buffer" : A || (A = z.defaultEncoding), typeof q != "function" && (q = X), z.ended ? ne(this, q) : (J || se(this, z, F, q)) && (z.pendingcb++, S = be(this, z, J, F, A, q)), S;
  }, ie.prototype.cork = function() {
    var F = this._writableState;
    F.corked++;
  }, ie.prototype.uncork = function() {
    var F = this._writableState;
    F.corked && (F.corked--, !F.writing && !F.corked && !F.bufferProcessing && F.bufferedRequest && _e(this, F));
  }, ie.prototype.setDefaultEncoding = function(F) {
    if (typeof F == "string" && (F = F.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((F + "").toLowerCase()) > -1))
      throw new TypeError("Unknown encoding: " + F);
    return this._writableState.defaultEncoding = F, this;
  };
  function oe(F, A, q) {
    return !F.objectMode && F.decodeStrings !== !1 && typeof A == "string" && (A = M.from(A, q)), A;
  }
  Object.defineProperty(ie.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function be(F, A, q, z, S, J) {
    if (!q) {
      var ce = oe(A, z, S);
      z !== ce && (q = !0, S = "buffer", z = ce);
    }
    var ye = A.objectMode ? 1 : z.length;
    A.length += ye;
    var Me = A.length < A.highWaterMark;
    if (Me || (A.needDrain = !0), A.writing || A.corked) {
      var me = A.lastBufferedRequest;
      A.lastBufferedRequest = {
        chunk: z,
        encoding: S,
        isBuf: q,
        callback: J,
        next: null
      }, me ? me.next = A.lastBufferedRequest : A.bufferedRequest = A.lastBufferedRequest, A.bufferedRequestCount += 1;
    } else
      de(F, A, !1, ye, z, S, J);
    return Me;
  }
  function de(F, A, q, z, S, J, ce) {
    A.writelen = z, A.writecb = ce, A.writing = !0, A.sync = !0, q ? F._writev(S, A.onwrite) : F._write(S, J, A.onwrite), A.sync = !1;
  }
  function we(F, A, q, z, S) {
    --A.pendingcb, q ? ($.nextTick(S, z), $.nextTick(o, F, A), F._writableState.errorEmitted = !0, F.emit("error", z)) : (S(z), F._writableState.errorEmitted = !0, F.emit("error", z), o(F, A));
  }
  function Se(F) {
    F.writing = !1, F.writecb = null, F.length -= F.writelen, F.writelen = 0;
  }
  function ke(F, A) {
    var q = F._writableState, z = q.sync, S = q.writecb;
    if (Se(q), A)
      we(F, q, z, A, S);
    else {
      var J = G(q);
      !J && !q.corked && !q.bufferProcessing && q.bufferedRequest && _e(F, q), z ? U(he, F, q, J, S) : he(F, q, J, S);
    }
  }
  function he(F, A, q, z) {
    q || le(F, A), A.pendingcb--, z(), o(F, A);
  }
  function le(F, A) {
    A.length === 0 && A.needDrain && (A.needDrain = !1, F.emit("drain"));
  }
  function _e(F, A) {
    A.bufferProcessing = !0;
    var q = A.bufferedRequest;
    if (F._writev && q && q.next) {
      var z = A.bufferedRequestCount, S = new Array(z), J = A.corkedRequestsFree;
      J.entry = q;
      for (var ce = 0, ye = !0; q; )
        S[ce] = q, q.isBuf || (ye = !1), q = q.next, ce += 1;
      S.allBuffers = ye, de(F, A, !0, A.length, S, "", J.finish), A.pendingcb++, A.lastBufferedRequest = null, J.next ? (A.corkedRequestsFree = J.next, J.next = null) : A.corkedRequestsFree = new h(A), A.bufferedRequestCount = 0;
    } else {
      for (; q; ) {
        var Me = q.chunk, me = q.encoding, ue = q.callback, fe = A.objectMode ? 1 : Me.length;
        if (de(F, A, !1, fe, Me, me, ue), q = q.next, A.bufferedRequestCount--, A.writing)
          break;
      }
      q === null && (A.lastBufferedRequest = null);
    }
    A.bufferedRequest = q, A.bufferProcessing = !1;
  }
  ie.prototype._write = function(F, A, q) {
    q(new Error("_write() is not implemented"));
  }, ie.prototype._writev = null, ie.prototype.end = function(F, A, q) {
    var z = this._writableState;
    typeof F == "function" ? (q = F, F = null, A = null) : typeof A == "function" && (q = A, A = null), F != null && this.write(F, A), z.corked && (z.corked = 1, this.uncork()), z.ending || g(this, z, q);
  };
  function G(F) {
    return F.ending && F.length === 0 && F.bufferedRequest === null && !F.finished && !F.writing;
  }
  function Z(F, A) {
    F._final(function(q) {
      A.pendingcb--, q && F.emit("error", q), A.prefinished = !0, F.emit("prefinish"), o(F, A);
    });
  }
  function e(F, A) {
    !A.prefinished && !A.finalCalled && (typeof F._final == "function" ? (A.pendingcb++, A.finalCalled = !0, $.nextTick(Z, F, A)) : (A.prefinished = !0, F.emit("prefinish")));
  }
  function o(F, A) {
    var q = G(A);
    return q && (e(F, A), A.pendingcb === 0 && (A.finished = !0, F.emit("finish"))), q;
  }
  function g(F, A, q) {
    A.ending = !0, o(F, A), q && (A.finished ? $.nextTick(q) : F.once("finish", q)), A.ended = !0, F.writable = !1;
  }
  function H(F, A, q) {
    var z = F.entry;
    for (F.entry = null; z; ) {
      var S = z.callback;
      A.pendingcb--, S(q), z = z.next;
    }
    A.corkedRequestsFree.next = F;
  }
  return Object.defineProperty(ie.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(F) {
      this._writableState && (this._writableState.destroyed = F);
    }
  }), ie.prototype.destroy = Y.destroy, ie.prototype._undestroy = Y.undestroy, ie.prototype._destroy = function(F, A) {
    this.end(), A(F);
  }, _stream_writable;
}
var _stream_duplex, hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex)
    return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var $ = requireProcessNextickArgs(), h = Object.keys || function(Y) {
    var X = [];
    for (var ee in Y)
      X.push(ee);
    return X;
  };
  _stream_duplex = D;
  var U = Object.create(requireUtil());
  U.inherits = requireInherits_browser();
  var B = require_stream_readable(), V = require_stream_writable();
  U.inherits(D, B);
  for (var t = h(V.prototype), O = 0; O < t.length; O++) {
    var M = t[O];
    D.prototype[M] || (D.prototype[M] = V.prototype[M]);
  }
  function D(Y) {
    if (!(this instanceof D))
      return new D(Y);
    B.call(this, Y), V.call(this, Y), Y && Y.readable === !1 && (this.readable = !1), Y && Y.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, Y && Y.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", I);
  }
  Object.defineProperty(D.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function I() {
    this.allowHalfOpen || this._writableState.ended || $.nextTick(P, this);
  }
  function P(Y) {
    Y.end();
  }
  return Object.defineProperty(D.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(Y) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = Y, this._writableState.destroyed = Y);
    }
  }), D.prototype._destroy = function(Y, X) {
    this.push(null), this.end(), $.nextTick(X, Y);
  }, _stream_duplex;
}
var _stream_readable, hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable)
    return _stream_readable;
  hasRequired_stream_readable = 1;
  var $ = requireProcessNextickArgs();
  _stream_readable = oe;
  var h = requireIsarray(), U;
  oe.ReadableState = se, requireEvents().EventEmitter;
  var B = function(ue, fe) {
    return ue.listeners(fe).length;
  }, V = requireStreamBrowser(), t = requireSafeBuffer().Buffer, O = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function M(ue) {
    return t.from(ue);
  }
  function D(ue) {
    return t.isBuffer(ue) || ue instanceof O;
  }
  var I = Object.create(requireUtil());
  I.inherits = requireInherits_browser();
  var P = requireUtil$1(), Y = void 0;
  P && P.debuglog ? Y = P.debuglog("stream") : Y = function() {
  };
  var X = requireBufferList(), ee = requireDestroy(), re;
  I.inherits(oe, V);
  var ie = ["error", "close", "destroy", "pause", "resume"];
  function ne(ue, fe, Ae) {
    if (typeof ue.prependListener == "function")
      return ue.prependListener(fe, Ae);
    !ue._events || !ue._events[fe] ? ue.on(fe, Ae) : h(ue._events[fe]) ? ue._events[fe].unshift(Ae) : ue._events[fe] = [Ae, ue._events[fe]];
  }
  function se(ue, fe) {
    U = U || require_stream_duplex(), ue = ue || {};
    var Ae = fe instanceof U;
    this.objectMode = !!ue.objectMode, Ae && (this.objectMode = this.objectMode || !!ue.readableObjectMode);
    var Be = ue.highWaterMark, pe = ue.readableHighWaterMark, ge = this.objectMode ? 16 : 16 * 1024;
    Be || Be === 0 ? this.highWaterMark = Be : Ae && (pe || pe === 0) ? this.highWaterMark = pe : this.highWaterMark = ge, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new X(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = ue.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, ue.encoding && (re || (re = requireString_decoder().StringDecoder), this.decoder = new re(ue.encoding), this.encoding = ue.encoding);
  }
  function oe(ue) {
    if (U = U || require_stream_duplex(), !(this instanceof oe))
      return new oe(ue);
    this._readableState = new se(ue, this), this.readable = !0, ue && (typeof ue.read == "function" && (this._read = ue.read), typeof ue.destroy == "function" && (this._destroy = ue.destroy)), V.call(this);
  }
  Object.defineProperty(oe.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(ue) {
      this._readableState && (this._readableState.destroyed = ue);
    }
  }), oe.prototype.destroy = ee.destroy, oe.prototype._undestroy = ee.undestroy, oe.prototype._destroy = function(ue, fe) {
    this.push(null), fe(ue);
  }, oe.prototype.push = function(ue, fe) {
    var Ae = this._readableState, Be;
    return Ae.objectMode ? Be = !0 : typeof ue == "string" && (fe = fe || Ae.defaultEncoding, fe !== Ae.encoding && (ue = t.from(ue, fe), fe = ""), Be = !0), be(this, ue, fe, !1, Be);
  }, oe.prototype.unshift = function(ue) {
    return be(this, ue, null, !0, !1);
  };
  function be(ue, fe, Ae, Be, pe) {
    var ge = ue._readableState;
    if (fe === null)
      ge.reading = !1, _e(ue, ge);
    else {
      var Ee;
      pe || (Ee = we(ge, fe)), Ee ? ue.emit("error", Ee) : ge.objectMode || fe && fe.length > 0 ? (typeof fe != "string" && !ge.objectMode && Object.getPrototypeOf(fe) !== t.prototype && (fe = M(fe)), Be ? ge.endEmitted ? ue.emit("error", new Error("stream.unshift() after end event")) : de(ue, ge, fe, !0) : ge.ended ? ue.emit("error", new Error("stream.push() after EOF")) : (ge.reading = !1, ge.decoder && !Ae ? (fe = ge.decoder.write(fe), ge.objectMode || fe.length !== 0 ? de(ue, ge, fe, !1) : e(ue, ge)) : de(ue, ge, fe, !1))) : Be || (ge.reading = !1);
    }
    return Se(ge);
  }
  function de(ue, fe, Ae, Be) {
    fe.flowing && fe.length === 0 && !fe.sync ? (ue.emit("data", Ae), ue.read(0)) : (fe.length += fe.objectMode ? 1 : Ae.length, Be ? fe.buffer.unshift(Ae) : fe.buffer.push(Ae), fe.needReadable && G(ue)), e(ue, fe);
  }
  function we(ue, fe) {
    var Ae;
    return !D(fe) && typeof fe != "string" && fe !== void 0 && !ue.objectMode && (Ae = new TypeError("Invalid non-string/buffer chunk")), Ae;
  }
  function Se(ue) {
    return !ue.ended && (ue.needReadable || ue.length < ue.highWaterMark || ue.length === 0);
  }
  oe.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, oe.prototype.setEncoding = function(ue) {
    return re || (re = requireString_decoder().StringDecoder), this._readableState.decoder = new re(ue), this._readableState.encoding = ue, this;
  };
  var ke = 8388608;
  function he(ue) {
    return ue >= ke ? ue = ke : (ue--, ue |= ue >>> 1, ue |= ue >>> 2, ue |= ue >>> 4, ue |= ue >>> 8, ue |= ue >>> 16, ue++), ue;
  }
  function le(ue, fe) {
    return ue <= 0 || fe.length === 0 && fe.ended ? 0 : fe.objectMode ? 1 : ue !== ue ? fe.flowing && fe.length ? fe.buffer.head.data.length : fe.length : (ue > fe.highWaterMark && (fe.highWaterMark = he(ue)), ue <= fe.length ? ue : fe.ended ? fe.length : (fe.needReadable = !0, 0));
  }
  oe.prototype.read = function(ue) {
    Y("read", ue), ue = parseInt(ue, 10);
    var fe = this._readableState, Ae = ue;
    if (ue !== 0 && (fe.emittedReadable = !1), ue === 0 && fe.needReadable && (fe.length >= fe.highWaterMark || fe.ended))
      return Y("read: emitReadable", fe.length, fe.ended), fe.length === 0 && fe.ended ? ye(this) : G(this), null;
    if (ue = le(ue, fe), ue === 0 && fe.ended)
      return fe.length === 0 && ye(this), null;
    var Be = fe.needReadable;
    Y("need readable", Be), (fe.length === 0 || fe.length - ue < fe.highWaterMark) && (Be = !0, Y("length less than watermark", Be)), fe.ended || fe.reading ? (Be = !1, Y("reading or ended", Be)) : Be && (Y("do read"), fe.reading = !0, fe.sync = !0, fe.length === 0 && (fe.needReadable = !0), this._read(fe.highWaterMark), fe.sync = !1, fe.reading || (ue = le(Ae, fe)));
    var pe;
    return ue > 0 ? pe = z(ue, fe) : pe = null, pe === null ? (fe.needReadable = !0, ue = 0) : fe.length -= ue, fe.length === 0 && (fe.ended || (fe.needReadable = !0), Ae !== ue && fe.ended && ye(this)), pe !== null && this.emit("data", pe), pe;
  };
  function _e(ue, fe) {
    if (!fe.ended) {
      if (fe.decoder) {
        var Ae = fe.decoder.end();
        Ae && Ae.length && (fe.buffer.push(Ae), fe.length += fe.objectMode ? 1 : Ae.length);
      }
      fe.ended = !0, G(ue);
    }
  }
  function G(ue) {
    var fe = ue._readableState;
    fe.needReadable = !1, fe.emittedReadable || (Y("emitReadable", fe.flowing), fe.emittedReadable = !0, fe.sync ? $.nextTick(Z, ue) : Z(ue));
  }
  function Z(ue) {
    Y("emit readable"), ue.emit("readable"), q(ue);
  }
  function e(ue, fe) {
    fe.readingMore || (fe.readingMore = !0, $.nextTick(o, ue, fe));
  }
  function o(ue, fe) {
    for (var Ae = fe.length; !fe.reading && !fe.flowing && !fe.ended && fe.length < fe.highWaterMark && (Y("maybeReadMore read 0"), ue.read(0), Ae !== fe.length); )
      Ae = fe.length;
    fe.readingMore = !1;
  }
  oe.prototype._read = function(ue) {
    this.emit("error", new Error("_read() is not implemented"));
  }, oe.prototype.pipe = function(ue, fe) {
    var Ae = this, Be = this._readableState;
    switch (Be.pipesCount) {
      case 0:
        Be.pipes = ue;
        break;
      case 1:
        Be.pipes = [Be.pipes, ue];
        break;
      default:
        Be.pipes.push(ue);
        break;
    }
    Be.pipesCount += 1, Y("pipe count=%d opts=%j", Be.pipesCount, fe);
    var pe = (!fe || fe.end !== !1) && ue !== process$1.stdout && ue !== process$1.stderr, ge = pe ? Ie : xe;
    Be.endEmitted ? $.nextTick(ge) : Ae.once("end", ge), ue.on("unpipe", Ee);
    function Ee(Le, Te) {
      Y("onunpipe"), Le === Ae && Te && Te.hasUnpiped === !1 && (Te.hasUnpiped = !0, K());
    }
    function Ie() {
      Y("onend"), ue.end();
    }
    var Pe = g(Ae);
    ue.on("drain", Pe);
    var Q = !1;
    function K() {
      Y("cleanup"), ue.removeListener("close", qe), ue.removeListener("finish", Re), ue.removeListener("drain", Pe), ue.removeListener("error", ve), ue.removeListener("unpipe", Ee), Ae.removeListener("end", Ie), Ae.removeListener("end", xe), Ae.removeListener("data", ae), Q = !0, Be.awaitDrain && (!ue._writableState || ue._writableState.needDrain) && Pe();
    }
    var te = !1;
    Ae.on("data", ae);
    function ae(Le) {
      Y("ondata"), te = !1;
      var Te = ue.write(Le);
      Te === !1 && !te && ((Be.pipesCount === 1 && Be.pipes === ue || Be.pipesCount > 1 && me(Be.pipes, ue) !== -1) && !Q && (Y("false write response, pause", Be.awaitDrain), Be.awaitDrain++, te = !0), Ae.pause());
    }
    function ve(Le) {
      Y("onerror", Le), xe(), ue.removeListener("error", ve), B(ue, "error") === 0 && ue.emit("error", Le);
    }
    ne(ue, "error", ve);
    function qe() {
      ue.removeListener("finish", Re), xe();
    }
    ue.once("close", qe);
    function Re() {
      Y("onfinish"), ue.removeListener("close", qe), xe();
    }
    ue.once("finish", Re);
    function xe() {
      Y("unpipe"), Ae.unpipe(ue);
    }
    return ue.emit("pipe", Ae), Be.flowing || (Y("pipe resume"), Ae.resume()), ue;
  };
  function g(ue) {
    return function() {
      var fe = ue._readableState;
      Y("pipeOnDrain", fe.awaitDrain), fe.awaitDrain && fe.awaitDrain--, fe.awaitDrain === 0 && B(ue, "data") && (fe.flowing = !0, q(ue));
    };
  }
  oe.prototype.unpipe = function(ue) {
    var fe = this._readableState, Ae = { hasUnpiped: !1 };
    if (fe.pipesCount === 0)
      return this;
    if (fe.pipesCount === 1)
      return ue && ue !== fe.pipes ? this : (ue || (ue = fe.pipes), fe.pipes = null, fe.pipesCount = 0, fe.flowing = !1, ue && ue.emit("unpipe", this, Ae), this);
    if (!ue) {
      var Be = fe.pipes, pe = fe.pipesCount;
      fe.pipes = null, fe.pipesCount = 0, fe.flowing = !1;
      for (var ge = 0; ge < pe; ge++)
        Be[ge].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var Ee = me(fe.pipes, ue);
    return Ee === -1 ? this : (fe.pipes.splice(Ee, 1), fe.pipesCount -= 1, fe.pipesCount === 1 && (fe.pipes = fe.pipes[0]), ue.emit("unpipe", this, Ae), this);
  }, oe.prototype.on = function(ue, fe) {
    var Ae = V.prototype.on.call(this, ue, fe);
    if (ue === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (ue === "readable") {
      var Be = this._readableState;
      !Be.endEmitted && !Be.readableListening && (Be.readableListening = Be.needReadable = !0, Be.emittedReadable = !1, Be.reading ? Be.length && G(this) : $.nextTick(H, this));
    }
    return Ae;
  }, oe.prototype.addListener = oe.prototype.on;
  function H(ue) {
    Y("readable nexttick read 0"), ue.read(0);
  }
  oe.prototype.resume = function() {
    var ue = this._readableState;
    return ue.flowing || (Y("resume"), ue.flowing = !0, F(this, ue)), this;
  };
  function F(ue, fe) {
    fe.resumeScheduled || (fe.resumeScheduled = !0, $.nextTick(A, ue, fe));
  }
  function A(ue, fe) {
    fe.reading || (Y("resume read 0"), ue.read(0)), fe.resumeScheduled = !1, fe.awaitDrain = 0, ue.emit("resume"), q(ue), fe.flowing && !fe.reading && ue.read(0);
  }
  oe.prototype.pause = function() {
    return Y("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (Y("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function q(ue) {
    var fe = ue._readableState;
    for (Y("flow", fe.flowing); fe.flowing && ue.read() !== null; )
      ;
  }
  oe.prototype.wrap = function(ue) {
    var fe = this, Ae = this._readableState, Be = !1;
    ue.on("end", function() {
      if (Y("wrapped end"), Ae.decoder && !Ae.ended) {
        var Ee = Ae.decoder.end();
        Ee && Ee.length && fe.push(Ee);
      }
      fe.push(null);
    }), ue.on("data", function(Ee) {
      if (Y("wrapped data"), Ae.decoder && (Ee = Ae.decoder.write(Ee)), !(Ae.objectMode && Ee == null) && !(!Ae.objectMode && (!Ee || !Ee.length))) {
        var Ie = fe.push(Ee);
        Ie || (Be = !0, ue.pause());
      }
    });
    for (var pe in ue)
      this[pe] === void 0 && typeof ue[pe] == "function" && (this[pe] = /* @__PURE__ */ function(Ee) {
        return function() {
          return ue[Ee].apply(ue, arguments);
        };
      }(pe));
    for (var ge = 0; ge < ie.length; ge++)
      ue.on(ie[ge], this.emit.bind(this, ie[ge]));
    return this._read = function(Ee) {
      Y("wrapped _read", Ee), Be && (Be = !1, ue.resume());
    }, this;
  }, Object.defineProperty(oe.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), oe._fromList = z;
  function z(ue, fe) {
    if (fe.length === 0)
      return null;
    var Ae;
    return fe.objectMode ? Ae = fe.buffer.shift() : !ue || ue >= fe.length ? (fe.decoder ? Ae = fe.buffer.join("") : fe.buffer.length === 1 ? Ae = fe.buffer.head.data : Ae = fe.buffer.concat(fe.length), fe.buffer.clear()) : Ae = S(ue, fe.buffer, fe.decoder), Ae;
  }
  function S(ue, fe, Ae) {
    var Be;
    return ue < fe.head.data.length ? (Be = fe.head.data.slice(0, ue), fe.head.data = fe.head.data.slice(ue)) : ue === fe.head.data.length ? Be = fe.shift() : Be = Ae ? J(ue, fe) : ce(ue, fe), Be;
  }
  function J(ue, fe) {
    var Ae = fe.head, Be = 1, pe = Ae.data;
    for (ue -= pe.length; Ae = Ae.next; ) {
      var ge = Ae.data, Ee = ue > ge.length ? ge.length : ue;
      if (Ee === ge.length ? pe += ge : pe += ge.slice(0, ue), ue -= Ee, ue === 0) {
        Ee === ge.length ? (++Be, Ae.next ? fe.head = Ae.next : fe.head = fe.tail = null) : (fe.head = Ae, Ae.data = ge.slice(Ee));
        break;
      }
      ++Be;
    }
    return fe.length -= Be, pe;
  }
  function ce(ue, fe) {
    var Ae = t.allocUnsafe(ue), Be = fe.head, pe = 1;
    for (Be.data.copy(Ae), ue -= Be.data.length; Be = Be.next; ) {
      var ge = Be.data, Ee = ue > ge.length ? ge.length : ue;
      if (ge.copy(Ae, Ae.length - ue, 0, Ee), ue -= Ee, ue === 0) {
        Ee === ge.length ? (++pe, Be.next ? fe.head = Be.next : fe.head = fe.tail = null) : (fe.head = Be, Be.data = ge.slice(Ee));
        break;
      }
      ++pe;
    }
    return fe.length -= pe, Ae;
  }
  function ye(ue) {
    var fe = ue._readableState;
    if (fe.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    fe.endEmitted || (fe.ended = !0, $.nextTick(Me, fe, ue));
  }
  function Me(ue, fe) {
    !ue.endEmitted && ue.length === 0 && (ue.endEmitted = !0, fe.readable = !1, fe.emit("end"));
  }
  function me(ue, fe) {
    for (var Ae = 0, Be = ue.length; Ae < Be; Ae++)
      if (ue[Ae] === fe)
        return Ae;
    return -1;
  }
  return _stream_readable;
}
var _stream_transform, hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform)
    return _stream_transform;
  hasRequired_stream_transform = 1, _stream_transform = B;
  var $ = require_stream_duplex(), h = Object.create(requireUtil());
  h.inherits = requireInherits_browser(), h.inherits(B, $);
  function U(O, M) {
    var D = this._transformState;
    D.transforming = !1;
    var I = D.writecb;
    if (!I)
      return this.emit("error", new Error("write callback called multiple times"));
    D.writechunk = null, D.writecb = null, M != null && this.push(M), I(O);
    var P = this._readableState;
    P.reading = !1, (P.needReadable || P.length < P.highWaterMark) && this._read(P.highWaterMark);
  }
  function B(O) {
    if (!(this instanceof B))
      return new B(O);
    $.call(this, O), this._transformState = {
      afterTransform: U.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, O && (typeof O.transform == "function" && (this._transform = O.transform), typeof O.flush == "function" && (this._flush = O.flush)), this.on("prefinish", V);
  }
  function V() {
    var O = this;
    typeof this._flush == "function" ? this._flush(function(M, D) {
      t(O, M, D);
    }) : t(this, null, null);
  }
  B.prototype.push = function(O, M) {
    return this._transformState.needTransform = !1, $.prototype.push.call(this, O, M);
  }, B.prototype._transform = function(O, M, D) {
    throw new Error("_transform() is not implemented");
  }, B.prototype._write = function(O, M, D) {
    var I = this._transformState;
    if (I.writecb = D, I.writechunk = O, I.writeencoding = M, !I.transforming) {
      var P = this._readableState;
      (I.needTransform || P.needReadable || P.length < P.highWaterMark) && this._read(P.highWaterMark);
    }
  }, B.prototype._read = function(O) {
    var M = this._transformState;
    M.writechunk !== null && M.writecb && !M.transforming ? (M.transforming = !0, this._transform(M.writechunk, M.writeencoding, M.afterTransform)) : M.needTransform = !0;
  }, B.prototype._destroy = function(O, M) {
    var D = this;
    $.prototype._destroy.call(this, O, function(I) {
      M(I), D.emit("close");
    });
  };
  function t(O, M, D) {
    if (M)
      return O.emit("error", M);
    if (D != null && O.push(D), O._writableState.length)
      throw new Error("Calling transform done when ws.length != 0");
    if (O._transformState.transforming)
      throw new Error("Calling transform done when still transforming");
    return O.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough, hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough)
    return _stream_passthrough;
  hasRequired_stream_passthrough = 1, _stream_passthrough = U;
  var $ = require_stream_transform(), h = Object.create(requireUtil());
  h.inherits = requireInherits_browser(), h.inherits(U, $);
  function U(B) {
    if (!(this instanceof U))
      return new U(B);
    $.call(this, B);
  }
  return U.prototype._transform = function(B, V, t) {
    t(null, B);
  }, _stream_passthrough;
}
var hasRequiredReadableBrowser;
function requireReadableBrowser() {
  return hasRequiredReadableBrowser || (hasRequiredReadableBrowser = 1, function($, h) {
    h = $.exports = require_stream_readable(), h.Stream = h, h.Readable = h, h.Writable = require_stream_writable(), h.Duplex = require_stream_duplex(), h.Transform = require_stream_transform(), h.PassThrough = require_stream_passthrough();
  }(readableBrowser, readableBrowser.exports)), readableBrowser.exports;
}
var sign = { exports: {} }, bn$1 = { exports: {} }, hasRequiredBn$1;
function requireBn$1() {
  return hasRequiredBn$1 || (hasRequiredBn$1 = 1, function($) {
    (function(h, U) {
      function B(e, o) {
        if (!e)
          throw new Error(o || "Assertion failed");
      }
      function V(e, o) {
        e.super_ = o;
        var g = function() {
        };
        g.prototype = o.prototype, e.prototype = new g(), e.prototype.constructor = e;
      }
      function t(e, o, g) {
        if (t.isBN(e))
          return e;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, e !== null && ((o === "le" || o === "be") && (g = o, o = 10), this._init(e || 0, o || 10, g || "be"));
      }
      typeof h == "object" ? h.exports = t : U.BN = t, t.BN = t, t.wordSize = 26;
      var O;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? O = window.Buffer : O = requireBuffer$1().Buffer;
      } catch {
      }
      t.isBN = function(e) {
        return e instanceof t ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === t.wordSize && Array.isArray(e.words);
      }, t.max = function(e, o) {
        return e.cmp(o) > 0 ? e : o;
      }, t.min = function(e, o) {
        return e.cmp(o) < 0 ? e : o;
      }, t.prototype._init = function(e, o, g) {
        if (typeof e == "number")
          return this._initNumber(e, o, g);
        if (typeof e == "object")
          return this._initArray(e, o, g);
        o === "hex" && (o = 16), B(o === (o | 0) && o >= 2 && o <= 36), e = e.toString().replace(/\s+/g, "");
        var H = 0;
        e[0] === "-" && (H++, this.negative = 1), H < e.length && (o === 16 ? this._parseHex(e, H, g) : (this._parseBase(e, o, H), g === "le" && this._initArray(this.toArray(), o, g)));
      }, t.prototype._initNumber = function(e, o, g) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (B(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), g === "le" && this._initArray(this.toArray(), o, g);
      }, t.prototype._initArray = function(e, o, g) {
        if (B(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var F, A, q = 0;
        if (g === "be")
          for (H = e.length - 1, F = 0; H >= 0; H -= 3)
            A = e[H] | e[H - 1] << 8 | e[H - 2] << 16, this.words[F] |= A << q & 67108863, this.words[F + 1] = A >>> 26 - q & 67108863, q += 24, q >= 26 && (q -= 26, F++);
        else if (g === "le")
          for (H = 0, F = 0; H < e.length; H += 3)
            A = e[H] | e[H + 1] << 8 | e[H + 2] << 16, this.words[F] |= A << q & 67108863, this.words[F + 1] = A >>> 26 - q & 67108863, q += 24, q >= 26 && (q -= 26, F++);
        return this._strip();
      };
      function M(e, o) {
        var g = e.charCodeAt(o);
        if (g >= 48 && g <= 57)
          return g - 48;
        if (g >= 65 && g <= 70)
          return g - 55;
        if (g >= 97 && g <= 102)
          return g - 87;
        B(!1, "Invalid character in " + e);
      }
      function D(e, o, g) {
        var H = M(e, g);
        return g - 1 >= o && (H |= M(e, g - 1) << 4), H;
      }
      t.prototype._parseHex = function(e, o, g) {
        this.length = Math.ceil((e.length - o) / 6), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var F = 0, A = 0, q;
        if (g === "be")
          for (H = e.length - 1; H >= o; H -= 2)
            q = D(e, o, H) << F, this.words[A] |= q & 67108863, F >= 18 ? (F -= 18, A += 1, this.words[A] |= q >>> 26) : F += 8;
        else {
          var z = e.length - o;
          for (H = z % 2 === 0 ? o + 1 : o; H < e.length; H += 2)
            q = D(e, o, H) << F, this.words[A] |= q & 67108863, F >= 18 ? (F -= 18, A += 1, this.words[A] |= q >>> 26) : F += 8;
        }
        this._strip();
      };
      function I(e, o, g, H) {
        for (var F = 0, A = 0, q = Math.min(e.length, g), z = o; z < q; z++) {
          var S = e.charCodeAt(z) - 48;
          F *= H, S >= 49 ? A = S - 49 + 10 : S >= 17 ? A = S - 17 + 10 : A = S, B(S >= 0 && A < H, "Invalid character"), F += A;
        }
        return F;
      }
      t.prototype._parseBase = function(e, o, g) {
        this.words = [0], this.length = 1;
        for (var H = 0, F = 1; F <= 67108863; F *= o)
          H++;
        H--, F = F / o | 0;
        for (var A = e.length - g, q = A % H, z = Math.min(A, A - q) + g, S = 0, J = g; J < z; J += H)
          S = I(e, J, J + H, o), this.imuln(F), this.words[0] + S < 67108864 ? this.words[0] += S : this._iaddn(S);
        if (q !== 0) {
          var ce = 1;
          for (S = I(e, J, e.length, o), J = 0; J < q; J++)
            ce *= o;
          this.imuln(ce), this.words[0] + S < 67108864 ? this.words[0] += S : this._iaddn(S);
        }
        this._strip();
      }, t.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          e.words[o] = this.words[o];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function P(e, o) {
        e.words = o.words, e.length = o.length, e.negative = o.negative, e.red = o.red;
      }
      if (t.prototype._move = function(e) {
        P(e, this);
      }, t.prototype.clone = function() {
        var e = new t(null);
        return this.copy(e), e;
      }, t.prototype._expand = function(e) {
        for (; this.length < e; )
          this.words[this.length++] = 0;
        return this;
      }, t.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, t.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          t.prototype[Symbol.for("nodejs.util.inspect.custom")] = Y;
        } catch {
          t.prototype.inspect = Y;
        }
      else
        t.prototype.inspect = Y;
      function Y() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var X = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], ee = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], re = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      t.prototype.toString = function(e, o) {
        e = e || 10, o = o | 0 || 1;
        var g;
        if (e === 16 || e === "hex") {
          g = "";
          for (var H = 0, F = 0, A = 0; A < this.length; A++) {
            var q = this.words[A], z = ((q << H | F) & 16777215).toString(16);
            F = q >>> 24 - H & 16777215, H += 2, H >= 26 && (H -= 26, A--), F !== 0 || A !== this.length - 1 ? g = X[6 - z.length] + z + g : g = z + g;
          }
          for (F !== 0 && (g = F.toString(16) + g); g.length % o !== 0; )
            g = "0" + g;
          return this.negative !== 0 && (g = "-" + g), g;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var S = ee[e], J = re[e];
          g = "";
          var ce = this.clone();
          for (ce.negative = 0; !ce.isZero(); ) {
            var ye = ce.modrn(J).toString(e);
            ce = ce.idivn(J), ce.isZero() ? g = ye + g : g = X[S - ye.length] + ye + g;
          }
          for (this.isZero() && (g = "0" + g); g.length % o !== 0; )
            g = "0" + g;
          return this.negative !== 0 && (g = "-" + g), g;
        }
        B(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && B(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, t.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, O && (t.prototype.toBuffer = function(e, o) {
        return this.toArrayLike(O, e, o);
      }), t.prototype.toArray = function(e, o) {
        return this.toArrayLike(Array, e, o);
      };
      var ie = function(e, o) {
        return e.allocUnsafe ? e.allocUnsafe(o) : new e(o);
      };
      t.prototype.toArrayLike = function(e, o, g) {
        this._strip();
        var H = this.byteLength(), F = g || Math.max(1, H);
        B(H <= F, "byte array longer than desired length"), B(F > 0, "Requested array length <= 0");
        var A = ie(e, F), q = o === "le" ? "LE" : "BE";
        return this["_toArrayLike" + q](A, H), A;
      }, t.prototype._toArrayLikeLE = function(e, o) {
        for (var g = 0, H = 0, F = 0, A = 0; F < this.length; F++) {
          var q = this.words[F] << A | H;
          e[g++] = q & 255, g < e.length && (e[g++] = q >> 8 & 255), g < e.length && (e[g++] = q >> 16 & 255), A === 6 ? (g < e.length && (e[g++] = q >> 24 & 255), H = 0, A = 0) : (H = q >>> 24, A += 2);
        }
        if (g < e.length)
          for (e[g++] = H; g < e.length; )
            e[g++] = 0;
      }, t.prototype._toArrayLikeBE = function(e, o) {
        for (var g = e.length - 1, H = 0, F = 0, A = 0; F < this.length; F++) {
          var q = this.words[F] << A | H;
          e[g--] = q & 255, g >= 0 && (e[g--] = q >> 8 & 255), g >= 0 && (e[g--] = q >> 16 & 255), A === 6 ? (g >= 0 && (e[g--] = q >> 24 & 255), H = 0, A = 0) : (H = q >>> 24, A += 2);
        }
        if (g >= 0)
          for (e[g--] = H; g >= 0; )
            e[g--] = 0;
      }, Math.clz32 ? t.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : t.prototype._countBits = function(e) {
        var o = e, g = 0;
        return o >= 4096 && (g += 13, o >>>= 13), o >= 64 && (g += 7, o >>>= 7), o >= 8 && (g += 4, o >>>= 4), o >= 2 && (g += 2, o >>>= 2), g + o;
      }, t.prototype._zeroBits = function(e) {
        if (e === 0)
          return 26;
        var o = e, g = 0;
        return o & 8191 || (g += 13, o >>>= 13), o & 127 || (g += 7, o >>>= 7), o & 15 || (g += 4, o >>>= 4), o & 3 || (g += 2, o >>>= 2), o & 1 || g++, g;
      }, t.prototype.bitLength = function() {
        var e = this.words[this.length - 1], o = this._countBits(e);
        return (this.length - 1) * 26 + o;
      };
      function ne(e) {
        for (var o = new Array(e.bitLength()), g = 0; g < o.length; g++) {
          var H = g / 26 | 0, F = g % 26;
          o[g] = e.words[H] >>> F & 1;
        }
        return o;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var e = 0, o = 0; o < this.length; o++) {
          var g = this._zeroBits(this.words[o]);
          if (e += g, g !== 26)
            break;
        }
        return e;
      }, t.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, t.prototype.toTwos = function(e) {
        return this.negative !== 0 ? this.abs().inotn(e).iaddn(1) : this.clone();
      }, t.prototype.fromTwos = function(e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      }, t.prototype.isNeg = function() {
        return this.negative !== 0;
      }, t.prototype.neg = function() {
        return this.clone().ineg();
      }, t.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, t.prototype.iuor = function(e) {
        for (; this.length < e.length; )
          this.words[this.length++] = 0;
        for (var o = 0; o < e.length; o++)
          this.words[o] = this.words[o] | e.words[o];
        return this._strip();
      }, t.prototype.ior = function(e) {
        return B((this.negative | e.negative) === 0), this.iuor(e);
      }, t.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, t.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, t.prototype.iuand = function(e) {
        var o;
        this.length > e.length ? o = e : o = this;
        for (var g = 0; g < o.length; g++)
          this.words[g] = this.words[g] & e.words[g];
        return this.length = o.length, this._strip();
      }, t.prototype.iand = function(e) {
        return B((this.negative | e.negative) === 0), this.iuand(e);
      }, t.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, t.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, t.prototype.iuxor = function(e) {
        var o, g;
        this.length > e.length ? (o = this, g = e) : (o = e, g = this);
        for (var H = 0; H < g.length; H++)
          this.words[H] = o.words[H] ^ g.words[H];
        if (this !== o)
          for (; H < o.length; H++)
            this.words[H] = o.words[H];
        return this.length = o.length, this._strip();
      }, t.prototype.ixor = function(e) {
        return B((this.negative | e.negative) === 0), this.iuxor(e);
      }, t.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, t.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, t.prototype.inotn = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = Math.ceil(e / 26) | 0, g = e % 26;
        this._expand(o), g > 0 && o--;
        for (var H = 0; H < o; H++)
          this.words[H] = ~this.words[H] & 67108863;
        return g > 0 && (this.words[H] = ~this.words[H] & 67108863 >> 26 - g), this._strip();
      }, t.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, t.prototype.setn = function(e, o) {
        B(typeof e == "number" && e >= 0);
        var g = e / 26 | 0, H = e % 26;
        return this._expand(g + 1), o ? this.words[g] = this.words[g] | 1 << H : this.words[g] = this.words[g] & ~(1 << H), this._strip();
      }, t.prototype.iadd = function(e) {
        var o;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, o = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, o = this.isub(e), e.negative = 1, o._normSign();
        var g, H;
        this.length > e.length ? (g = this, H = e) : (g = e, H = this);
        for (var F = 0, A = 0; A < H.length; A++)
          o = (g.words[A] | 0) + (H.words[A] | 0) + F, this.words[A] = o & 67108863, F = o >>> 26;
        for (; F !== 0 && A < g.length; A++)
          o = (g.words[A] | 0) + F, this.words[A] = o & 67108863, F = o >>> 26;
        if (this.length = g.length, F !== 0)
          this.words[this.length] = F, this.length++;
        else if (g !== this)
          for (; A < g.length; A++)
            this.words[A] = g.words[A];
        return this;
      }, t.prototype.add = function(e) {
        var o;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, o = this.sub(e), e.negative ^= 1, o) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, o = e.sub(this), this.negative = 1, o) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, t.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var o = this.iadd(e);
          return e.negative = 1, o._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var g = this.cmp(e);
        if (g === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var H, F;
        g > 0 ? (H = this, F = e) : (H = e, F = this);
        for (var A = 0, q = 0; q < F.length; q++)
          o = (H.words[q] | 0) - (F.words[q] | 0) + A, A = o >> 26, this.words[q] = o & 67108863;
        for (; A !== 0 && q < H.length; q++)
          o = (H.words[q] | 0) + A, A = o >> 26, this.words[q] = o & 67108863;
        if (A === 0 && q < H.length && H !== this)
          for (; q < H.length; q++)
            this.words[q] = H.words[q];
        return this.length = Math.max(this.length, q), H !== this && (this.negative = 1), this._strip();
      }, t.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function se(e, o, g) {
        g.negative = o.negative ^ e.negative;
        var H = e.length + o.length | 0;
        g.length = H, H = H - 1 | 0;
        var F = e.words[0] | 0, A = o.words[0] | 0, q = F * A, z = q & 67108863, S = q / 67108864 | 0;
        g.words[0] = z;
        for (var J = 1; J < H; J++) {
          for (var ce = S >>> 26, ye = S & 67108863, Me = Math.min(J, o.length - 1), me = Math.max(0, J - e.length + 1); me <= Me; me++) {
            var ue = J - me | 0;
            F = e.words[ue] | 0, A = o.words[me] | 0, q = F * A + ye, ce += q / 67108864 | 0, ye = q & 67108863;
          }
          g.words[J] = ye | 0, S = ce | 0;
        }
        return S !== 0 ? g.words[J] = S | 0 : g.length--, g._strip();
      }
      var oe = function(e, o, g) {
        var H = e.words, F = o.words, A = g.words, q = 0, z, S, J, ce = H[0] | 0, ye = ce & 8191, Me = ce >>> 13, me = H[1] | 0, ue = me & 8191, fe = me >>> 13, Ae = H[2] | 0, Be = Ae & 8191, pe = Ae >>> 13, ge = H[3] | 0, Ee = ge & 8191, Ie = ge >>> 13, Pe = H[4] | 0, Q = Pe & 8191, K = Pe >>> 13, te = H[5] | 0, ae = te & 8191, ve = te >>> 13, qe = H[6] | 0, Re = qe & 8191, xe = qe >>> 13, Le = H[7] | 0, Te = Le & 8191, $e = Le >>> 13, Ce = H[8] | 0, Ve = Ce & 8191, je = Ce >>> 13, at = H[9] | 0, Qe = at & 8191, Ue = at >>> 13, ut = F[0] | 0, Ye = ut & 8191, Oe = ut >>> 13, ft = F[1] | 0, Ze = ft & 8191, Ne = ft >>> 13, ht = F[2] | 0, et = ht & 8191, De = ht >>> 13, ct = F[3] | 0, tt = ct & 8191, Fe = ct >>> 13, dt = F[4] | 0, rt = dt & 8191, We = dt >>> 13, lt = F[5] | 0, it = lt & 8191, ze = lt >>> 13, pt = F[6] | 0, nt = pt & 8191, He = pt >>> 13, bt = F[7] | 0, ot = bt & 8191, Ge = bt >>> 13, mt = F[8] | 0, st = mt & 8191, Ke = mt >>> 13, yt = F[9] | 0, Xe = yt & 8191, Je = yt >>> 13;
        g.negative = e.negative ^ o.negative, g.length = 19, z = Math.imul(ye, Ye), S = Math.imul(ye, Oe), S = S + Math.imul(Me, Ye) | 0, J = Math.imul(Me, Oe);
        var gt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, z = Math.imul(ue, Ye), S = Math.imul(ue, Oe), S = S + Math.imul(fe, Ye) | 0, J = Math.imul(fe, Oe), z = z + Math.imul(ye, Ze) | 0, S = S + Math.imul(ye, Ne) | 0, S = S + Math.imul(Me, Ze) | 0, J = J + Math.imul(Me, Ne) | 0;
        var vt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, z = Math.imul(Be, Ye), S = Math.imul(Be, Oe), S = S + Math.imul(pe, Ye) | 0, J = Math.imul(pe, Oe), z = z + Math.imul(ue, Ze) | 0, S = S + Math.imul(ue, Ne) | 0, S = S + Math.imul(fe, Ze) | 0, J = J + Math.imul(fe, Ne) | 0, z = z + Math.imul(ye, et) | 0, S = S + Math.imul(ye, De) | 0, S = S + Math.imul(Me, et) | 0, J = J + Math.imul(Me, De) | 0;
        var wt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, z = Math.imul(Ee, Ye), S = Math.imul(Ee, Oe), S = S + Math.imul(Ie, Ye) | 0, J = Math.imul(Ie, Oe), z = z + Math.imul(Be, Ze) | 0, S = S + Math.imul(Be, Ne) | 0, S = S + Math.imul(pe, Ze) | 0, J = J + Math.imul(pe, Ne) | 0, z = z + Math.imul(ue, et) | 0, S = S + Math.imul(ue, De) | 0, S = S + Math.imul(fe, et) | 0, J = J + Math.imul(fe, De) | 0, z = z + Math.imul(ye, tt) | 0, S = S + Math.imul(ye, Fe) | 0, S = S + Math.imul(Me, tt) | 0, J = J + Math.imul(Me, Fe) | 0;
        var _t = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, z = Math.imul(Q, Ye), S = Math.imul(Q, Oe), S = S + Math.imul(K, Ye) | 0, J = Math.imul(K, Oe), z = z + Math.imul(Ee, Ze) | 0, S = S + Math.imul(Ee, Ne) | 0, S = S + Math.imul(Ie, Ze) | 0, J = J + Math.imul(Ie, Ne) | 0, z = z + Math.imul(Be, et) | 0, S = S + Math.imul(Be, De) | 0, S = S + Math.imul(pe, et) | 0, J = J + Math.imul(pe, De) | 0, z = z + Math.imul(ue, tt) | 0, S = S + Math.imul(ue, Fe) | 0, S = S + Math.imul(fe, tt) | 0, J = J + Math.imul(fe, Fe) | 0, z = z + Math.imul(ye, rt) | 0, S = S + Math.imul(ye, We) | 0, S = S + Math.imul(Me, rt) | 0, J = J + Math.imul(Me, We) | 0;
        var Mt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, z = Math.imul(ae, Ye), S = Math.imul(ae, Oe), S = S + Math.imul(ve, Ye) | 0, J = Math.imul(ve, Oe), z = z + Math.imul(Q, Ze) | 0, S = S + Math.imul(Q, Ne) | 0, S = S + Math.imul(K, Ze) | 0, J = J + Math.imul(K, Ne) | 0, z = z + Math.imul(Ee, et) | 0, S = S + Math.imul(Ee, De) | 0, S = S + Math.imul(Ie, et) | 0, J = J + Math.imul(Ie, De) | 0, z = z + Math.imul(Be, tt) | 0, S = S + Math.imul(Be, Fe) | 0, S = S + Math.imul(pe, tt) | 0, J = J + Math.imul(pe, Fe) | 0, z = z + Math.imul(ue, rt) | 0, S = S + Math.imul(ue, We) | 0, S = S + Math.imul(fe, rt) | 0, J = J + Math.imul(fe, We) | 0, z = z + Math.imul(ye, it) | 0, S = S + Math.imul(ye, ze) | 0, S = S + Math.imul(Me, it) | 0, J = J + Math.imul(Me, ze) | 0;
        var St = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, z = Math.imul(Re, Ye), S = Math.imul(Re, Oe), S = S + Math.imul(xe, Ye) | 0, J = Math.imul(xe, Oe), z = z + Math.imul(ae, Ze) | 0, S = S + Math.imul(ae, Ne) | 0, S = S + Math.imul(ve, Ze) | 0, J = J + Math.imul(ve, Ne) | 0, z = z + Math.imul(Q, et) | 0, S = S + Math.imul(Q, De) | 0, S = S + Math.imul(K, et) | 0, J = J + Math.imul(K, De) | 0, z = z + Math.imul(Ee, tt) | 0, S = S + Math.imul(Ee, Fe) | 0, S = S + Math.imul(Ie, tt) | 0, J = J + Math.imul(Ie, Fe) | 0, z = z + Math.imul(Be, rt) | 0, S = S + Math.imul(Be, We) | 0, S = S + Math.imul(pe, rt) | 0, J = J + Math.imul(pe, We) | 0, z = z + Math.imul(ue, it) | 0, S = S + Math.imul(ue, ze) | 0, S = S + Math.imul(fe, it) | 0, J = J + Math.imul(fe, ze) | 0, z = z + Math.imul(ye, nt) | 0, S = S + Math.imul(ye, He) | 0, S = S + Math.imul(Me, nt) | 0, J = J + Math.imul(Me, He) | 0;
        var qt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, z = Math.imul(Te, Ye), S = Math.imul(Te, Oe), S = S + Math.imul($e, Ye) | 0, J = Math.imul($e, Oe), z = z + Math.imul(Re, Ze) | 0, S = S + Math.imul(Re, Ne) | 0, S = S + Math.imul(xe, Ze) | 0, J = J + Math.imul(xe, Ne) | 0, z = z + Math.imul(ae, et) | 0, S = S + Math.imul(ae, De) | 0, S = S + Math.imul(ve, et) | 0, J = J + Math.imul(ve, De) | 0, z = z + Math.imul(Q, tt) | 0, S = S + Math.imul(Q, Fe) | 0, S = S + Math.imul(K, tt) | 0, J = J + Math.imul(K, Fe) | 0, z = z + Math.imul(Ee, rt) | 0, S = S + Math.imul(Ee, We) | 0, S = S + Math.imul(Ie, rt) | 0, J = J + Math.imul(Ie, We) | 0, z = z + Math.imul(Be, it) | 0, S = S + Math.imul(Be, ze) | 0, S = S + Math.imul(pe, it) | 0, J = J + Math.imul(pe, ze) | 0, z = z + Math.imul(ue, nt) | 0, S = S + Math.imul(ue, He) | 0, S = S + Math.imul(fe, nt) | 0, J = J + Math.imul(fe, He) | 0, z = z + Math.imul(ye, ot) | 0, S = S + Math.imul(ye, Ge) | 0, S = S + Math.imul(Me, ot) | 0, J = J + Math.imul(Me, Ge) | 0;
        var At = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, z = Math.imul(Ve, Ye), S = Math.imul(Ve, Oe), S = S + Math.imul(je, Ye) | 0, J = Math.imul(je, Oe), z = z + Math.imul(Te, Ze) | 0, S = S + Math.imul(Te, Ne) | 0, S = S + Math.imul($e, Ze) | 0, J = J + Math.imul($e, Ne) | 0, z = z + Math.imul(Re, et) | 0, S = S + Math.imul(Re, De) | 0, S = S + Math.imul(xe, et) | 0, J = J + Math.imul(xe, De) | 0, z = z + Math.imul(ae, tt) | 0, S = S + Math.imul(ae, Fe) | 0, S = S + Math.imul(ve, tt) | 0, J = J + Math.imul(ve, Fe) | 0, z = z + Math.imul(Q, rt) | 0, S = S + Math.imul(Q, We) | 0, S = S + Math.imul(K, rt) | 0, J = J + Math.imul(K, We) | 0, z = z + Math.imul(Ee, it) | 0, S = S + Math.imul(Ee, ze) | 0, S = S + Math.imul(Ie, it) | 0, J = J + Math.imul(Ie, ze) | 0, z = z + Math.imul(Be, nt) | 0, S = S + Math.imul(Be, He) | 0, S = S + Math.imul(pe, nt) | 0, J = J + Math.imul(pe, He) | 0, z = z + Math.imul(ue, ot) | 0, S = S + Math.imul(ue, Ge) | 0, S = S + Math.imul(fe, ot) | 0, J = J + Math.imul(fe, Ge) | 0, z = z + Math.imul(ye, st) | 0, S = S + Math.imul(ye, Ke) | 0, S = S + Math.imul(Me, st) | 0, J = J + Math.imul(Me, Ke) | 0;
        var Bt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, z = Math.imul(Qe, Ye), S = Math.imul(Qe, Oe), S = S + Math.imul(Ue, Ye) | 0, J = Math.imul(Ue, Oe), z = z + Math.imul(Ve, Ze) | 0, S = S + Math.imul(Ve, Ne) | 0, S = S + Math.imul(je, Ze) | 0, J = J + Math.imul(je, Ne) | 0, z = z + Math.imul(Te, et) | 0, S = S + Math.imul(Te, De) | 0, S = S + Math.imul($e, et) | 0, J = J + Math.imul($e, De) | 0, z = z + Math.imul(Re, tt) | 0, S = S + Math.imul(Re, Fe) | 0, S = S + Math.imul(xe, tt) | 0, J = J + Math.imul(xe, Fe) | 0, z = z + Math.imul(ae, rt) | 0, S = S + Math.imul(ae, We) | 0, S = S + Math.imul(ve, rt) | 0, J = J + Math.imul(ve, We) | 0, z = z + Math.imul(Q, it) | 0, S = S + Math.imul(Q, ze) | 0, S = S + Math.imul(K, it) | 0, J = J + Math.imul(K, ze) | 0, z = z + Math.imul(Ee, nt) | 0, S = S + Math.imul(Ee, He) | 0, S = S + Math.imul(Ie, nt) | 0, J = J + Math.imul(Ie, He) | 0, z = z + Math.imul(Be, ot) | 0, S = S + Math.imul(Be, Ge) | 0, S = S + Math.imul(pe, ot) | 0, J = J + Math.imul(pe, Ge) | 0, z = z + Math.imul(ue, st) | 0, S = S + Math.imul(ue, Ke) | 0, S = S + Math.imul(fe, st) | 0, J = J + Math.imul(fe, Ke) | 0, z = z + Math.imul(ye, Xe) | 0, S = S + Math.imul(ye, Je) | 0, S = S + Math.imul(Me, Xe) | 0, J = J + Math.imul(Me, Je) | 0;
        var Et = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, z = Math.imul(Qe, Ze), S = Math.imul(Qe, Ne), S = S + Math.imul(Ue, Ze) | 0, J = Math.imul(Ue, Ne), z = z + Math.imul(Ve, et) | 0, S = S + Math.imul(Ve, De) | 0, S = S + Math.imul(je, et) | 0, J = J + Math.imul(je, De) | 0, z = z + Math.imul(Te, tt) | 0, S = S + Math.imul(Te, Fe) | 0, S = S + Math.imul($e, tt) | 0, J = J + Math.imul($e, Fe) | 0, z = z + Math.imul(Re, rt) | 0, S = S + Math.imul(Re, We) | 0, S = S + Math.imul(xe, rt) | 0, J = J + Math.imul(xe, We) | 0, z = z + Math.imul(ae, it) | 0, S = S + Math.imul(ae, ze) | 0, S = S + Math.imul(ve, it) | 0, J = J + Math.imul(ve, ze) | 0, z = z + Math.imul(Q, nt) | 0, S = S + Math.imul(Q, He) | 0, S = S + Math.imul(K, nt) | 0, J = J + Math.imul(K, He) | 0, z = z + Math.imul(Ee, ot) | 0, S = S + Math.imul(Ee, Ge) | 0, S = S + Math.imul(Ie, ot) | 0, J = J + Math.imul(Ie, Ge) | 0, z = z + Math.imul(Be, st) | 0, S = S + Math.imul(Be, Ke) | 0, S = S + Math.imul(pe, st) | 0, J = J + Math.imul(pe, Ke) | 0, z = z + Math.imul(ue, Xe) | 0, S = S + Math.imul(ue, Je) | 0, S = S + Math.imul(fe, Xe) | 0, J = J + Math.imul(fe, Je) | 0;
        var Rt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, z = Math.imul(Qe, et), S = Math.imul(Qe, De), S = S + Math.imul(Ue, et) | 0, J = Math.imul(Ue, De), z = z + Math.imul(Ve, tt) | 0, S = S + Math.imul(Ve, Fe) | 0, S = S + Math.imul(je, tt) | 0, J = J + Math.imul(je, Fe) | 0, z = z + Math.imul(Te, rt) | 0, S = S + Math.imul(Te, We) | 0, S = S + Math.imul($e, rt) | 0, J = J + Math.imul($e, We) | 0, z = z + Math.imul(Re, it) | 0, S = S + Math.imul(Re, ze) | 0, S = S + Math.imul(xe, it) | 0, J = J + Math.imul(xe, ze) | 0, z = z + Math.imul(ae, nt) | 0, S = S + Math.imul(ae, He) | 0, S = S + Math.imul(ve, nt) | 0, J = J + Math.imul(ve, He) | 0, z = z + Math.imul(Q, ot) | 0, S = S + Math.imul(Q, Ge) | 0, S = S + Math.imul(K, ot) | 0, J = J + Math.imul(K, Ge) | 0, z = z + Math.imul(Ee, st) | 0, S = S + Math.imul(Ee, Ke) | 0, S = S + Math.imul(Ie, st) | 0, J = J + Math.imul(Ie, Ke) | 0, z = z + Math.imul(Be, Xe) | 0, S = S + Math.imul(Be, Je) | 0, S = S + Math.imul(pe, Xe) | 0, J = J + Math.imul(pe, Je) | 0;
        var kt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, z = Math.imul(Qe, tt), S = Math.imul(Qe, Fe), S = S + Math.imul(Ue, tt) | 0, J = Math.imul(Ue, Fe), z = z + Math.imul(Ve, rt) | 0, S = S + Math.imul(Ve, We) | 0, S = S + Math.imul(je, rt) | 0, J = J + Math.imul(je, We) | 0, z = z + Math.imul(Te, it) | 0, S = S + Math.imul(Te, ze) | 0, S = S + Math.imul($e, it) | 0, J = J + Math.imul($e, ze) | 0, z = z + Math.imul(Re, nt) | 0, S = S + Math.imul(Re, He) | 0, S = S + Math.imul(xe, nt) | 0, J = J + Math.imul(xe, He) | 0, z = z + Math.imul(ae, ot) | 0, S = S + Math.imul(ae, Ge) | 0, S = S + Math.imul(ve, ot) | 0, J = J + Math.imul(ve, Ge) | 0, z = z + Math.imul(Q, st) | 0, S = S + Math.imul(Q, Ke) | 0, S = S + Math.imul(K, st) | 0, J = J + Math.imul(K, Ke) | 0, z = z + Math.imul(Ee, Xe) | 0, S = S + Math.imul(Ee, Je) | 0, S = S + Math.imul(Ie, Xe) | 0, J = J + Math.imul(Ie, Je) | 0;
        var It = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, z = Math.imul(Qe, rt), S = Math.imul(Qe, We), S = S + Math.imul(Ue, rt) | 0, J = Math.imul(Ue, We), z = z + Math.imul(Ve, it) | 0, S = S + Math.imul(Ve, ze) | 0, S = S + Math.imul(je, it) | 0, J = J + Math.imul(je, ze) | 0, z = z + Math.imul(Te, nt) | 0, S = S + Math.imul(Te, He) | 0, S = S + Math.imul($e, nt) | 0, J = J + Math.imul($e, He) | 0, z = z + Math.imul(Re, ot) | 0, S = S + Math.imul(Re, Ge) | 0, S = S + Math.imul(xe, ot) | 0, J = J + Math.imul(xe, Ge) | 0, z = z + Math.imul(ae, st) | 0, S = S + Math.imul(ae, Ke) | 0, S = S + Math.imul(ve, st) | 0, J = J + Math.imul(ve, Ke) | 0, z = z + Math.imul(Q, Xe) | 0, S = S + Math.imul(Q, Je) | 0, S = S + Math.imul(K, Xe) | 0, J = J + Math.imul(K, Je) | 0;
        var xt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, z = Math.imul(Qe, it), S = Math.imul(Qe, ze), S = S + Math.imul(Ue, it) | 0, J = Math.imul(Ue, ze), z = z + Math.imul(Ve, nt) | 0, S = S + Math.imul(Ve, He) | 0, S = S + Math.imul(je, nt) | 0, J = J + Math.imul(je, He) | 0, z = z + Math.imul(Te, ot) | 0, S = S + Math.imul(Te, Ge) | 0, S = S + Math.imul($e, ot) | 0, J = J + Math.imul($e, Ge) | 0, z = z + Math.imul(Re, st) | 0, S = S + Math.imul(Re, Ke) | 0, S = S + Math.imul(xe, st) | 0, J = J + Math.imul(xe, Ke) | 0, z = z + Math.imul(ae, Xe) | 0, S = S + Math.imul(ae, Je) | 0, S = S + Math.imul(ve, Xe) | 0, J = J + Math.imul(ve, Je) | 0;
        var $t = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, z = Math.imul(Qe, nt), S = Math.imul(Qe, He), S = S + Math.imul(Ue, nt) | 0, J = Math.imul(Ue, He), z = z + Math.imul(Ve, ot) | 0, S = S + Math.imul(Ve, Ge) | 0, S = S + Math.imul(je, ot) | 0, J = J + Math.imul(je, Ge) | 0, z = z + Math.imul(Te, st) | 0, S = S + Math.imul(Te, Ke) | 0, S = S + Math.imul($e, st) | 0, J = J + Math.imul($e, Ke) | 0, z = z + Math.imul(Re, Xe) | 0, S = S + Math.imul(Re, Je) | 0, S = S + Math.imul(xe, Xe) | 0, J = J + Math.imul(xe, Je) | 0;
        var Tt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, z = Math.imul(Qe, ot), S = Math.imul(Qe, Ge), S = S + Math.imul(Ue, ot) | 0, J = Math.imul(Ue, Ge), z = z + Math.imul(Ve, st) | 0, S = S + Math.imul(Ve, Ke) | 0, S = S + Math.imul(je, st) | 0, J = J + Math.imul(je, Ke) | 0, z = z + Math.imul(Te, Xe) | 0, S = S + Math.imul(Te, Je) | 0, S = S + Math.imul($e, Xe) | 0, J = J + Math.imul($e, Je) | 0;
        var Pt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, z = Math.imul(Qe, st), S = Math.imul(Qe, Ke), S = S + Math.imul(Ue, st) | 0, J = Math.imul(Ue, Ke), z = z + Math.imul(Ve, Xe) | 0, S = S + Math.imul(Ve, Je) | 0, S = S + Math.imul(je, Xe) | 0, J = J + Math.imul(je, Je) | 0;
        var Ct = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, z = Math.imul(Qe, Xe), S = Math.imul(Qe, Je), S = S + Math.imul(Ue, Xe) | 0, J = Math.imul(Ue, Je);
        var jt = (q + z | 0) + ((S & 8191) << 13) | 0;
        return q = (J + (S >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, A[0] = gt, A[1] = vt, A[2] = wt, A[3] = _t, A[4] = Mt, A[5] = St, A[6] = qt, A[7] = At, A[8] = Bt, A[9] = Et, A[10] = Rt, A[11] = kt, A[12] = It, A[13] = xt, A[14] = $t, A[15] = Tt, A[16] = Pt, A[17] = Ct, A[18] = jt, q !== 0 && (A[19] = q, g.length++), g;
      };
      Math.imul || (oe = se);
      function be(e, o, g) {
        g.negative = o.negative ^ e.negative, g.length = e.length + o.length;
        for (var H = 0, F = 0, A = 0; A < g.length - 1; A++) {
          var q = F;
          F = 0;
          for (var z = H & 67108863, S = Math.min(A, o.length - 1), J = Math.max(0, A - e.length + 1); J <= S; J++) {
            var ce = A - J, ye = e.words[ce] | 0, Me = o.words[J] | 0, me = ye * Me, ue = me & 67108863;
            q = q + (me / 67108864 | 0) | 0, ue = ue + z | 0, z = ue & 67108863, q = q + (ue >>> 26) | 0, F += q >>> 26, q &= 67108863;
          }
          g.words[A] = z, H = q, q = F;
        }
        return H !== 0 ? g.words[A] = H : g.length--, g._strip();
      }
      function de(e, o, g) {
        return be(e, o, g);
      }
      t.prototype.mulTo = function(e, o) {
        var g, H = this.length + e.length;
        return this.length === 10 && e.length === 10 ? g = oe(this, e, o) : H < 63 ? g = se(this, e, o) : H < 1024 ? g = be(this, e, o) : g = de(this, e, o), g;
      }, t.prototype.mul = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), this.mulTo(e, o);
      }, t.prototype.mulf = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), de(this, e, o);
      }, t.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, t.prototype.imuln = function(e) {
        var o = e < 0;
        o && (e = -e), B(typeof e == "number"), B(e < 67108864);
        for (var g = 0, H = 0; H < this.length; H++) {
          var F = (this.words[H] | 0) * e, A = (F & 67108863) + (g & 67108863);
          g >>= 26, g += F / 67108864 | 0, g += A >>> 26, this.words[H] = A & 67108863;
        }
        return g !== 0 && (this.words[H] = g, this.length++), o ? this.ineg() : this;
      }, t.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(e) {
        var o = ne(e);
        if (o.length === 0)
          return new t(1);
        for (var g = this, H = 0; H < o.length && o[H] === 0; H++, g = g.sqr())
          ;
        if (++H < o.length)
          for (var F = g.sqr(); H < o.length; H++, F = F.sqr())
            o[H] !== 0 && (g = g.mul(F));
        return g;
      }, t.prototype.iushln = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = e % 26, g = (e - o) / 26, H = 67108863 >>> 26 - o << 26 - o, F;
        if (o !== 0) {
          var A = 0;
          for (F = 0; F < this.length; F++) {
            var q = this.words[F] & H, z = (this.words[F] | 0) - q << o;
            this.words[F] = z | A, A = q >>> 26 - o;
          }
          A && (this.words[F] = A, this.length++);
        }
        if (g !== 0) {
          for (F = this.length - 1; F >= 0; F--)
            this.words[F + g] = this.words[F];
          for (F = 0; F < g; F++)
            this.words[F] = 0;
          this.length += g;
        }
        return this._strip();
      }, t.prototype.ishln = function(e) {
        return B(this.negative === 0), this.iushln(e);
      }, t.prototype.iushrn = function(e, o, g) {
        B(typeof e == "number" && e >= 0);
        var H;
        o ? H = (o - o % 26) / 26 : H = 0;
        var F = e % 26, A = Math.min((e - F) / 26, this.length), q = 67108863 ^ 67108863 >>> F << F, z = g;
        if (H -= A, H = Math.max(0, H), z) {
          for (var S = 0; S < A; S++)
            z.words[S] = this.words[S];
          z.length = A;
        }
        if (A !== 0)
          if (this.length > A)
            for (this.length -= A, S = 0; S < this.length; S++)
              this.words[S] = this.words[S + A];
          else
            this.words[0] = 0, this.length = 1;
        var J = 0;
        for (S = this.length - 1; S >= 0 && (J !== 0 || S >= H); S--) {
          var ce = this.words[S] | 0;
          this.words[S] = J << 26 - F | ce >>> F, J = ce & q;
        }
        return z && J !== 0 && (z.words[z.length++] = J), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, t.prototype.ishrn = function(e, o, g) {
        return B(this.negative === 0), this.iushrn(e, o, g);
      }, t.prototype.shln = function(e) {
        return this.clone().ishln(e);
      }, t.prototype.ushln = function(e) {
        return this.clone().iushln(e);
      }, t.prototype.shrn = function(e) {
        return this.clone().ishrn(e);
      }, t.prototype.ushrn = function(e) {
        return this.clone().iushrn(e);
      }, t.prototype.testn = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = e % 26, g = (e - o) / 26, H = 1 << o;
        if (this.length <= g)
          return !1;
        var F = this.words[g];
        return !!(F & H);
      }, t.prototype.imaskn = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = e % 26, g = (e - o) / 26;
        if (B(this.negative === 0, "imaskn works only with positive numbers"), this.length <= g)
          return this;
        if (o !== 0 && g++, this.length = Math.min(g, this.length), o !== 0) {
          var H = 67108863 ^ 67108863 >>> o << o;
          this.words[this.length - 1] &= H;
        }
        return this._strip();
      }, t.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, t.prototype.iaddn = function(e) {
        return B(typeof e == "number"), B(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, t.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var o = 0; o < this.length && this.words[o] >= 67108864; o++)
          this.words[o] -= 67108864, o === this.length - 1 ? this.words[o + 1] = 1 : this.words[o + 1]++;
        return this.length = Math.max(this.length, o + 1), this;
      }, t.prototype.isubn = function(e) {
        if (B(typeof e == "number"), B(e < 67108864), e < 0)
          return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var o = 0; o < this.length && this.words[o] < 0; o++)
            this.words[o] += 67108864, this.words[o + 1] -= 1;
        return this._strip();
      }, t.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, t.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(e, o, g) {
        var H = e.length + g, F;
        this._expand(H);
        var A, q = 0;
        for (F = 0; F < e.length; F++) {
          A = (this.words[F + g] | 0) + q;
          var z = (e.words[F] | 0) * o;
          A -= z & 67108863, q = (A >> 26) - (z / 67108864 | 0), this.words[F + g] = A & 67108863;
        }
        for (; F < this.length - g; F++)
          A = (this.words[F + g] | 0) + q, q = A >> 26, this.words[F + g] = A & 67108863;
        if (q === 0)
          return this._strip();
        for (B(q === -1), q = 0, F = 0; F < this.length; F++)
          A = -(this.words[F] | 0) + q, q = A >> 26, this.words[F] = A & 67108863;
        return this.negative = 1, this._strip();
      }, t.prototype._wordDiv = function(e, o) {
        var g = this.length - e.length, H = this.clone(), F = e, A = F.words[F.length - 1] | 0, q = this._countBits(A);
        g = 26 - q, g !== 0 && (F = F.ushln(g), H.iushln(g), A = F.words[F.length - 1] | 0);
        var z = H.length - F.length, S;
        if (o !== "mod") {
          S = new t(null), S.length = z + 1, S.words = new Array(S.length);
          for (var J = 0; J < S.length; J++)
            S.words[J] = 0;
        }
        var ce = H.clone()._ishlnsubmul(F, 1, z);
        ce.negative === 0 && (H = ce, S && (S.words[z] = 1));
        for (var ye = z - 1; ye >= 0; ye--) {
          var Me = (H.words[F.length + ye] | 0) * 67108864 + (H.words[F.length + ye - 1] | 0);
          for (Me = Math.min(Me / A | 0, 67108863), H._ishlnsubmul(F, Me, ye); H.negative !== 0; )
            Me--, H.negative = 0, H._ishlnsubmul(F, 1, ye), H.isZero() || (H.negative ^= 1);
          S && (S.words[ye] = Me);
        }
        return S && S._strip(), H._strip(), o !== "div" && g !== 0 && H.iushrn(g), {
          div: S || null,
          mod: H
        };
      }, t.prototype.divmod = function(e, o, g) {
        if (B(!e.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var H, F, A;
        return this.negative !== 0 && e.negative === 0 ? (A = this.neg().divmod(e, o), o !== "mod" && (H = A.div.neg()), o !== "div" && (F = A.mod.neg(), g && F.negative !== 0 && F.iadd(e)), {
          div: H,
          mod: F
        }) : this.negative === 0 && e.negative !== 0 ? (A = this.divmod(e.neg(), o), o !== "mod" && (H = A.div.neg()), {
          div: H,
          mod: A.mod
        }) : this.negative & e.negative ? (A = this.neg().divmod(e.neg(), o), o !== "div" && (F = A.mod.neg(), g && F.negative !== 0 && F.isub(e)), {
          div: A.div,
          mod: F
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new t(0),
          mod: this
        } : e.length === 1 ? o === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : o === "mod" ? {
          div: null,
          mod: new t(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new t(this.modrn(e.words[0]))
        } : this._wordDiv(e, o);
      }, t.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, t.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, t.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, t.prototype.divRound = function(e) {
        var o = this.divmod(e);
        if (o.mod.isZero())
          return o.div;
        var g = o.div.negative !== 0 ? o.mod.isub(e) : o.mod, H = e.ushrn(1), F = e.andln(1), A = g.cmp(H);
        return A < 0 || F === 1 && A === 0 ? o.div : o.div.negative !== 0 ? o.div.isubn(1) : o.div.iaddn(1);
      }, t.prototype.modrn = function(e) {
        var o = e < 0;
        o && (e = -e), B(e <= 67108863);
        for (var g = (1 << 26) % e, H = 0, F = this.length - 1; F >= 0; F--)
          H = (g * H + (this.words[F] | 0)) % e;
        return o ? -H : H;
      }, t.prototype.modn = function(e) {
        return this.modrn(e);
      }, t.prototype.idivn = function(e) {
        var o = e < 0;
        o && (e = -e), B(e <= 67108863);
        for (var g = 0, H = this.length - 1; H >= 0; H--) {
          var F = (this.words[H] | 0) + g * 67108864;
          this.words[H] = F / e | 0, g = F % e;
        }
        return this._strip(), o ? this.ineg() : this;
      }, t.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, t.prototype.egcd = function(e) {
        B(e.negative === 0), B(!e.isZero());
        var o = this, g = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), F = new t(0), A = new t(0), q = new t(1), z = 0; o.isEven() && g.isEven(); )
          o.iushrn(1), g.iushrn(1), ++z;
        for (var S = g.clone(), J = o.clone(); !o.isZero(); ) {
          for (var ce = 0, ye = 1; !(o.words[0] & ye) && ce < 26; ++ce, ye <<= 1)
            ;
          if (ce > 0)
            for (o.iushrn(ce); ce-- > 0; )
              (H.isOdd() || F.isOdd()) && (H.iadd(S), F.isub(J)), H.iushrn(1), F.iushrn(1);
          for (var Me = 0, me = 1; !(g.words[0] & me) && Me < 26; ++Me, me <<= 1)
            ;
          if (Me > 0)
            for (g.iushrn(Me); Me-- > 0; )
              (A.isOdd() || q.isOdd()) && (A.iadd(S), q.isub(J)), A.iushrn(1), q.iushrn(1);
          o.cmp(g) >= 0 ? (o.isub(g), H.isub(A), F.isub(q)) : (g.isub(o), A.isub(H), q.isub(F));
        }
        return {
          a: A,
          b: q,
          gcd: g.iushln(z)
        };
      }, t.prototype._invmp = function(e) {
        B(e.negative === 0), B(!e.isZero());
        var o = this, g = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), F = new t(0), A = g.clone(); o.cmpn(1) > 0 && g.cmpn(1) > 0; ) {
          for (var q = 0, z = 1; !(o.words[0] & z) && q < 26; ++q, z <<= 1)
            ;
          if (q > 0)
            for (o.iushrn(q); q-- > 0; )
              H.isOdd() && H.iadd(A), H.iushrn(1);
          for (var S = 0, J = 1; !(g.words[0] & J) && S < 26; ++S, J <<= 1)
            ;
          if (S > 0)
            for (g.iushrn(S); S-- > 0; )
              F.isOdd() && F.iadd(A), F.iushrn(1);
          o.cmp(g) >= 0 ? (o.isub(g), H.isub(F)) : (g.isub(o), F.isub(H));
        }
        var ce;
        return o.cmpn(1) === 0 ? ce = H : ce = F, ce.cmpn(0) < 0 && ce.iadd(e), ce;
      }, t.prototype.gcd = function(e) {
        if (this.isZero())
          return e.abs();
        if (e.isZero())
          return this.abs();
        var o = this.clone(), g = e.clone();
        o.negative = 0, g.negative = 0;
        for (var H = 0; o.isEven() && g.isEven(); H++)
          o.iushrn(1), g.iushrn(1);
        do {
          for (; o.isEven(); )
            o.iushrn(1);
          for (; g.isEven(); )
            g.iushrn(1);
          var F = o.cmp(g);
          if (F < 0) {
            var A = o;
            o = g, g = A;
          } else if (F === 0 || g.cmpn(1) === 0)
            break;
          o.isub(g);
        } while (!0);
        return g.iushln(H);
      }, t.prototype.invm = function(e) {
        return this.egcd(e).a.umod(e);
      }, t.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, t.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, t.prototype.andln = function(e) {
        return this.words[0] & e;
      }, t.prototype.bincn = function(e) {
        B(typeof e == "number");
        var o = e % 26, g = (e - o) / 26, H = 1 << o;
        if (this.length <= g)
          return this._expand(g + 1), this.words[g] |= H, this;
        for (var F = H, A = g; F !== 0 && A < this.length; A++) {
          var q = this.words[A] | 0;
          q += F, F = q >>> 26, q &= 67108863, this.words[A] = q;
        }
        return F !== 0 && (this.words[A] = F, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(e) {
        var o = e < 0;
        if (this.negative !== 0 && !o)
          return -1;
        if (this.negative === 0 && o)
          return 1;
        this._strip();
        var g;
        if (this.length > 1)
          g = 1;
        else {
          o && (e = -e), B(e <= 67108863, "Number is too big");
          var H = this.words[0] | 0;
          g = H === e ? 0 : H < e ? -1 : 1;
        }
        return this.negative !== 0 ? -g | 0 : g;
      }, t.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0)
          return -1;
        if (this.negative === 0 && e.negative !== 0)
          return 1;
        var o = this.ucmp(e);
        return this.negative !== 0 ? -o | 0 : o;
      }, t.prototype.ucmp = function(e) {
        if (this.length > e.length)
          return 1;
        if (this.length < e.length)
          return -1;
        for (var o = 0, g = this.length - 1; g >= 0; g--) {
          var H = this.words[g] | 0, F = e.words[g] | 0;
          if (H !== F) {
            H < F ? o = -1 : H > F && (o = 1);
            break;
          }
        }
        return o;
      }, t.prototype.gtn = function(e) {
        return this.cmpn(e) === 1;
      }, t.prototype.gt = function(e) {
        return this.cmp(e) === 1;
      }, t.prototype.gten = function(e) {
        return this.cmpn(e) >= 0;
      }, t.prototype.gte = function(e) {
        return this.cmp(e) >= 0;
      }, t.prototype.ltn = function(e) {
        return this.cmpn(e) === -1;
      }, t.prototype.lt = function(e) {
        return this.cmp(e) === -1;
      }, t.prototype.lten = function(e) {
        return this.cmpn(e) <= 0;
      }, t.prototype.lte = function(e) {
        return this.cmp(e) <= 0;
      }, t.prototype.eqn = function(e) {
        return this.cmpn(e) === 0;
      }, t.prototype.eq = function(e) {
        return this.cmp(e) === 0;
      }, t.red = function(e) {
        return new G(e);
      }, t.prototype.toRed = function(e) {
        return B(!this.red, "Already a number in reduction context"), B(this.negative === 0, "red works only with positives"), e.convertTo(this)._forceRed(e);
      }, t.prototype.fromRed = function() {
        return B(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, t.prototype._forceRed = function(e) {
        return this.red = e, this;
      }, t.prototype.forceRed = function(e) {
        return B(!this.red, "Already a number in reduction context"), this._forceRed(e);
      }, t.prototype.redAdd = function(e) {
        return B(this.red, "redAdd works only with red numbers"), this.red.add(this, e);
      }, t.prototype.redIAdd = function(e) {
        return B(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e);
      }, t.prototype.redSub = function(e) {
        return B(this.red, "redSub works only with red numbers"), this.red.sub(this, e);
      }, t.prototype.redISub = function(e) {
        return B(this.red, "redISub works only with red numbers"), this.red.isub(this, e);
      }, t.prototype.redShl = function(e) {
        return B(this.red, "redShl works only with red numbers"), this.red.shl(this, e);
      }, t.prototype.redMul = function(e) {
        return B(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e);
      }, t.prototype.redIMul = function(e) {
        return B(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e);
      }, t.prototype.redSqr = function() {
        return B(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, t.prototype.redISqr = function() {
        return B(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, t.prototype.redSqrt = function() {
        return B(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, t.prototype.redInvm = function() {
        return B(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, t.prototype.redNeg = function() {
        return B(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, t.prototype.redPow = function(e) {
        return B(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e);
      };
      var we = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function Se(e, o) {
        this.name = e, this.p = new t(o, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      Se.prototype._tmp = function() {
        var e = new t(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, Se.prototype.ireduce = function(e) {
        var o = e, g;
        do
          this.split(o, this.tmp), o = this.imulK(o), o = o.iadd(this.tmp), g = o.bitLength();
        while (g > this.n);
        var H = g < this.n ? -1 : o.ucmp(this.p);
        return H === 0 ? (o.words[0] = 0, o.length = 1) : H > 0 ? o.isub(this.p) : o.strip !== void 0 ? o.strip() : o._strip(), o;
      }, Se.prototype.split = function(e, o) {
        e.iushrn(this.n, 0, o);
      }, Se.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function ke() {
        Se.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      V(ke, Se), ke.prototype.split = function(e, o) {
        for (var g = 4194303, H = Math.min(e.length, 9), F = 0; F < H; F++)
          o.words[F] = e.words[F];
        if (o.length = H, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var A = e.words[9];
        for (o.words[o.length++] = A & g, F = 10; F < e.length; F++) {
          var q = e.words[F] | 0;
          e.words[F - 10] = (q & g) << 4 | A >>> 22, A = q;
        }
        A >>>= 22, e.words[F - 10] = A, A === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, ke.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var o = 0, g = 0; g < e.length; g++) {
          var H = e.words[g] | 0;
          o += H * 977, e.words[g] = o & 67108863, o = H * 64 + (o / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function he() {
        Se.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      V(he, Se);
      function le() {
        Se.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      V(le, Se);
      function _e() {
        Se.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      V(_e, Se), _e.prototype.imulK = function(e) {
        for (var o = 0, g = 0; g < e.length; g++) {
          var H = (e.words[g] | 0) * 19 + o, F = H & 67108863;
          H >>>= 26, e.words[g] = F, o = H;
        }
        return o !== 0 && (e.words[e.length++] = o), e;
      }, t._prime = function(e) {
        if (we[e])
          return we[e];
        var o;
        if (e === "k256")
          o = new ke();
        else if (e === "p224")
          o = new he();
        else if (e === "p192")
          o = new le();
        else if (e === "p25519")
          o = new _e();
        else
          throw new Error("Unknown prime " + e);
        return we[e] = o, o;
      };
      function G(e) {
        if (typeof e == "string") {
          var o = t._prime(e);
          this.m = o.p, this.prime = o;
        } else
          B(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null;
      }
      G.prototype._verify1 = function(e) {
        B(e.negative === 0, "red works only with positives"), B(e.red, "red works only with red numbers");
      }, G.prototype._verify2 = function(e, o) {
        B((e.negative | o.negative) === 0, "red works only with positives"), B(
          e.red && e.red === o.red,
          "red works only with red numbers"
        );
      }, G.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (P(e, e.umod(this.m)._forceRed(this)), e);
      }, G.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, G.prototype.add = function(e, o) {
        this._verify2(e, o);
        var g = e.add(o);
        return g.cmp(this.m) >= 0 && g.isub(this.m), g._forceRed(this);
      }, G.prototype.iadd = function(e, o) {
        this._verify2(e, o);
        var g = e.iadd(o);
        return g.cmp(this.m) >= 0 && g.isub(this.m), g;
      }, G.prototype.sub = function(e, o) {
        this._verify2(e, o);
        var g = e.sub(o);
        return g.cmpn(0) < 0 && g.iadd(this.m), g._forceRed(this);
      }, G.prototype.isub = function(e, o) {
        this._verify2(e, o);
        var g = e.isub(o);
        return g.cmpn(0) < 0 && g.iadd(this.m), g;
      }, G.prototype.shl = function(e, o) {
        return this._verify1(e), this.imod(e.ushln(o));
      }, G.prototype.imul = function(e, o) {
        return this._verify2(e, o), this.imod(e.imul(o));
      }, G.prototype.mul = function(e, o) {
        return this._verify2(e, o), this.imod(e.mul(o));
      }, G.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, G.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, G.prototype.sqrt = function(e) {
        if (e.isZero())
          return e.clone();
        var o = this.m.andln(3);
        if (B(o % 2 === 1), o === 3) {
          var g = this.m.add(new t(1)).iushrn(2);
          return this.pow(e, g);
        }
        for (var H = this.m.subn(1), F = 0; !H.isZero() && H.andln(1) === 0; )
          F++, H.iushrn(1);
        B(!H.isZero());
        var A = new t(1).toRed(this), q = A.redNeg(), z = this.m.subn(1).iushrn(1), S = this.m.bitLength();
        for (S = new t(2 * S * S).toRed(this); this.pow(S, z).cmp(q) !== 0; )
          S.redIAdd(q);
        for (var J = this.pow(S, H), ce = this.pow(e, H.addn(1).iushrn(1)), ye = this.pow(e, H), Me = F; ye.cmp(A) !== 0; ) {
          for (var me = ye, ue = 0; me.cmp(A) !== 0; ue++)
            me = me.redSqr();
          B(ue < Me);
          var fe = this.pow(J, new t(1).iushln(Me - ue - 1));
          ce = ce.redMul(fe), J = fe.redSqr(), ye = ye.redMul(J), Me = ue;
        }
        return ce;
      }, G.prototype.invm = function(e) {
        var o = e._invmp(this.m);
        return o.negative !== 0 ? (o.negative = 0, this.imod(o).redNeg()) : this.imod(o);
      }, G.prototype.pow = function(e, o) {
        if (o.isZero())
          return new t(1).toRed(this);
        if (o.cmpn(1) === 0)
          return e.clone();
        var g = 4, H = new Array(1 << g);
        H[0] = new t(1).toRed(this), H[1] = e;
        for (var F = 2; F < H.length; F++)
          H[F] = this.mul(H[F - 1], e);
        var A = H[0], q = 0, z = 0, S = o.bitLength() % 26;
        for (S === 0 && (S = 26), F = o.length - 1; F >= 0; F--) {
          for (var J = o.words[F], ce = S - 1; ce >= 0; ce--) {
            var ye = J >> ce & 1;
            if (A !== H[0] && (A = this.sqr(A)), ye === 0 && q === 0) {
              z = 0;
              continue;
            }
            q <<= 1, q |= ye, z++, !(z !== g && (F !== 0 || ce !== 0)) && (A = this.mul(A, H[q]), z = 0, q = 0);
          }
          S = 26;
        }
        return A;
      }, G.prototype.convertTo = function(e) {
        var o = e.umod(this.m);
        return o === e ? o.clone() : o;
      }, G.prototype.convertFrom = function(e) {
        var o = e.clone();
        return o.red = null, o;
      }, t.mont = function(e) {
        return new Z(e);
      };
      function Z(e) {
        G.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      V(Z, G), Z.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, Z.prototype.convertFrom = function(e) {
        var o = this.imod(e.mul(this.rinv));
        return o.red = null, o;
      }, Z.prototype.imul = function(e, o) {
        if (e.isZero() || o.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var g = e.imul(o), H = g.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), F = g.isub(H).iushrn(this.shift), A = F;
        return F.cmp(this.m) >= 0 ? A = F.isub(this.m) : F.cmpn(0) < 0 && (A = F.iadd(this.m)), A._forceRed(this);
      }, Z.prototype.mul = function(e, o) {
        if (e.isZero() || o.isZero())
          return new t(0)._forceRed(this);
        var g = e.mul(o), H = g.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), F = g.isub(H).iushrn(this.shift), A = F;
        return F.cmp(this.m) >= 0 ? A = F.isub(this.m) : F.cmpn(0) < 0 && (A = F.iadd(this.m)), A._forceRed(this);
      }, Z.prototype.invm = function(e) {
        var o = this.imod(e._invmp(this.m).mul(this.r2));
        return o._forceRed(this);
      };
    })($, commonjsGlobal);
  }(bn$1)), bn$1.exports;
}
var browserifyRsa, hasRequiredBrowserifyRsa;
function requireBrowserifyRsa() {
  if (hasRequiredBrowserifyRsa)
    return browserifyRsa;
  hasRequiredBrowserifyRsa = 1;
  var $ = requireBn$1(), h = requireBrowser$b();
  function U(t) {
    var O = B(t), M = O.toRed($.mont(t.modulus)).redPow(new $(t.publicExponent)).fromRed();
    return { blinder: M, unblinder: O.invm(t.modulus) };
  }
  function B(t) {
    var O = t.modulus.byteLength(), M;
    do
      M = new $(h(O));
    while (M.cmp(t.modulus) >= 0 || !M.umod(t.prime1) || !M.umod(t.prime2));
    return M;
  }
  function V(t, O) {
    var M = U(O), D = O.modulus.byteLength(), I = new $(t).mul(M.blinder).umod(O.modulus), P = I.toRed($.mont(O.prime1)), Y = I.toRed($.mont(O.prime2)), X = O.coefficient, ee = O.prime1, re = O.prime2, ie = P.redPow(O.exponent1).fromRed(), ne = Y.redPow(O.exponent2).fromRed(), se = ie.isub(ne).imul(X).umod(ee).imul(re);
    return ne.iadd(se).imul(M.unblinder).umod(O.modulus).toArrayLike(bufferExports.Buffer, "be", D);
  }
  return V.getr = B, browserifyRsa = V, browserifyRsa;
}
var elliptic = {};
const name = "elliptic", version = "6.5.5", description = "EC cryptography", main = "lib/elliptic.js", files = [
  "lib"
], scripts = {
  lint: "eslint lib test",
  "lint:fix": "npm run lint -- --fix",
  unit: "istanbul test _mocha --reporter=spec test/index.js",
  test: "npm run lint && npm run unit",
  version: "grunt dist && git add dist/"
}, repository = {
  type: "git",
  url: "git@github.com:indutny/elliptic"
}, keywords = [
  "EC",
  "Elliptic",
  "curve",
  "Cryptography"
], author = "Fedor Indutny <fedor@indutny.com>", license = "MIT", bugs = {
  url: "https://github.com/indutny/elliptic/issues"
}, homepage = "https://github.com/indutny/elliptic", devDependencies = {
  brfs: "^2.0.2",
  coveralls: "^3.1.0",
  eslint: "^7.6.0",
  grunt: "^1.2.1",
  "grunt-browserify": "^5.3.0",
  "grunt-cli": "^1.3.2",
  "grunt-contrib-connect": "^3.0.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^5.0.0",
  "grunt-mocha-istanbul": "^5.0.2",
  "grunt-saucelabs": "^9.0.1",
  istanbul: "^0.4.5",
  mocha: "^8.0.1"
}, dependencies = {
  "bn.js": "^4.11.9",
  brorand: "^1.1.0",
  "hash.js": "^1.0.0",
  "hmac-drbg": "^1.0.1",
  inherits: "^2.0.4",
  "minimalistic-assert": "^1.0.1",
  "minimalistic-crypto-utils": "^1.0.1"
}, require$$0 = {
  name,
  version,
  description,
  main,
  files,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  dependencies
};
var utils$2 = {}, utils$1 = {}, hasRequiredUtils$2;
function requireUtils$2() {
  return hasRequiredUtils$2 || (hasRequiredUtils$2 = 1, function($) {
    var h = $;
    function U(t, O) {
      if (Array.isArray(t))
        return t.slice();
      if (!t)
        return [];
      var M = [];
      if (typeof t != "string") {
        for (var D = 0; D < t.length; D++)
          M[D] = t[D] | 0;
        return M;
      }
      if (O === "hex") {
        t = t.replace(/[^a-z0-9]+/ig, ""), t.length % 2 !== 0 && (t = "0" + t);
        for (var D = 0; D < t.length; D += 2)
          M.push(parseInt(t[D] + t[D + 1], 16));
      } else
        for (var D = 0; D < t.length; D++) {
          var I = t.charCodeAt(D), P = I >> 8, Y = I & 255;
          P ? M.push(P, Y) : M.push(Y);
        }
      return M;
    }
    h.toArray = U;
    function B(t) {
      return t.length === 1 ? "0" + t : t;
    }
    h.zero2 = B;
    function V(t) {
      for (var O = "", M = 0; M < t.length; M++)
        O += B(t[M].toString(16));
      return O;
    }
    h.toHex = V, h.encode = function(t, O) {
      return O === "hex" ? V(t) : t;
    };
  }(utils$1)), utils$1;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  return hasRequiredUtils$1 || (hasRequiredUtils$1 = 1, function($) {
    var h = $, U = requireBn$2(), B = requireMinimalisticAssert(), V = requireUtils$2();
    h.assert = B, h.toArray = V.toArray, h.zero2 = V.zero2, h.toHex = V.toHex, h.encode = V.encode;
    function t(P, Y, X) {
      var ee = new Array(Math.max(P.bitLength(), X) + 1), re;
      for (re = 0; re < ee.length; re += 1)
        ee[re] = 0;
      var ie = 1 << Y + 1, ne = P.clone();
      for (re = 0; re < ee.length; re++) {
        var se, oe = ne.andln(ie - 1);
        ne.isOdd() ? (oe > (ie >> 1) - 1 ? se = (ie >> 1) - oe : se = oe, ne.isubn(se)) : se = 0, ee[re] = se, ne.iushrn(1);
      }
      return ee;
    }
    h.getNAF = t;
    function O(P, Y) {
      var X = [
        [],
        []
      ];
      P = P.clone(), Y = Y.clone();
      for (var ee = 0, re = 0, ie; P.cmpn(-ee) > 0 || Y.cmpn(-re) > 0; ) {
        var ne = P.andln(3) + ee & 3, se = Y.andln(3) + re & 3;
        ne === 3 && (ne = -1), se === 3 && (se = -1);
        var oe;
        ne & 1 ? (ie = P.andln(7) + ee & 7, (ie === 3 || ie === 5) && se === 2 ? oe = -ne : oe = ne) : oe = 0, X[0].push(oe);
        var be;
        se & 1 ? (ie = Y.andln(7) + re & 7, (ie === 3 || ie === 5) && ne === 2 ? be = -se : be = se) : be = 0, X[1].push(be), 2 * ee === oe + 1 && (ee = 1 - ee), 2 * re === be + 1 && (re = 1 - re), P.iushrn(1), Y.iushrn(1);
      }
      return X;
    }
    h.getJSF = O;
    function M(P, Y, X) {
      var ee = "_" + Y;
      P.prototype[Y] = function() {
        return this[ee] !== void 0 ? this[ee] : this[ee] = X.call(this);
      };
    }
    h.cachedProperty = M;
    function D(P) {
      return typeof P == "string" ? h.toArray(P, "hex") : P;
    }
    h.parseBytes = D;
    function I(P) {
      return new U(P, "hex", "le");
    }
    h.intFromLE = I;
  }(utils$2)), utils$2;
}
var curve = {}, base$1, hasRequiredBase$1;
function requireBase$1() {
  if (hasRequiredBase$1)
    return base$1;
  hasRequiredBase$1 = 1;
  var $ = requireBn$2(), h = requireUtils$1(), U = h.getNAF, B = h.getJSF, V = h.assert;
  function t(M, D) {
    this.type = M, this.p = new $(D.p, 16), this.red = D.prime ? $.red(D.prime) : $.mont(this.p), this.zero = new $(0).toRed(this.red), this.one = new $(1).toRed(this.red), this.two = new $(2).toRed(this.red), this.n = D.n && new $(D.n, 16), this.g = D.g && this.pointFromJSON(D.g, D.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
    var I = this.n && this.p.div(this.n);
    !I || I.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
  }
  base$1 = t, t.prototype.point = function() {
    throw new Error("Not implemented");
  }, t.prototype.validate = function() {
    throw new Error("Not implemented");
  }, t.prototype._fixedNafMul = function(M, D) {
    V(M.precomputed);
    var I = M._getDoubles(), P = U(D, 1, this._bitLength), Y = (1 << I.step + 1) - (I.step % 2 === 0 ? 2 : 1);
    Y /= 3;
    var X = [], ee, re;
    for (ee = 0; ee < P.length; ee += I.step) {
      re = 0;
      for (var ie = ee + I.step - 1; ie >= ee; ie--)
        re = (re << 1) + P[ie];
      X.push(re);
    }
    for (var ne = this.jpoint(null, null, null), se = this.jpoint(null, null, null), oe = Y; oe > 0; oe--) {
      for (ee = 0; ee < X.length; ee++)
        re = X[ee], re === oe ? se = se.mixedAdd(I.points[ee]) : re === -oe && (se = se.mixedAdd(I.points[ee].neg()));
      ne = ne.add(se);
    }
    return ne.toP();
  }, t.prototype._wnafMul = function(M, D) {
    var I = 4, P = M._getNAFPoints(I);
    I = P.wnd;
    for (var Y = P.points, X = U(D, I, this._bitLength), ee = this.jpoint(null, null, null), re = X.length - 1; re >= 0; re--) {
      for (var ie = 0; re >= 0 && X[re] === 0; re--)
        ie++;
      if (re >= 0 && ie++, ee = ee.dblp(ie), re < 0)
        break;
      var ne = X[re];
      V(ne !== 0), M.type === "affine" ? ne > 0 ? ee = ee.mixedAdd(Y[ne - 1 >> 1]) : ee = ee.mixedAdd(Y[-ne - 1 >> 1].neg()) : ne > 0 ? ee = ee.add(Y[ne - 1 >> 1]) : ee = ee.add(Y[-ne - 1 >> 1].neg());
    }
    return M.type === "affine" ? ee.toP() : ee;
  }, t.prototype._wnafMulAdd = function(M, D, I, P, Y) {
    var X = this._wnafT1, ee = this._wnafT2, re = this._wnafT3, ie = 0, ne, se, oe;
    for (ne = 0; ne < P; ne++) {
      oe = D[ne];
      var be = oe._getNAFPoints(M);
      X[ne] = be.wnd, ee[ne] = be.points;
    }
    for (ne = P - 1; ne >= 1; ne -= 2) {
      var de = ne - 1, we = ne;
      if (X[de] !== 1 || X[we] !== 1) {
        re[de] = U(I[de], X[de], this._bitLength), re[we] = U(I[we], X[we], this._bitLength), ie = Math.max(re[de].length, ie), ie = Math.max(re[we].length, ie);
        continue;
      }
      var Se = [
        D[de],
        /* 1 */
        null,
        /* 3 */
        null,
        /* 5 */
        D[we]
        /* 7 */
      ];
      D[de].y.cmp(D[we].y) === 0 ? (Se[1] = D[de].add(D[we]), Se[2] = D[de].toJ().mixedAdd(D[we].neg())) : D[de].y.cmp(D[we].y.redNeg()) === 0 ? (Se[1] = D[de].toJ().mixedAdd(D[we]), Se[2] = D[de].add(D[we].neg())) : (Se[1] = D[de].toJ().mixedAdd(D[we]), Se[2] = D[de].toJ().mixedAdd(D[we].neg()));
      var ke = [
        -3,
        /* -1 -1 */
        -1,
        /* -1 0 */
        -5,
        /* -1 1 */
        -7,
        /* 0 -1 */
        0,
        /* 0 0 */
        7,
        /* 0 1 */
        5,
        /* 1 -1 */
        1,
        /* 1 0 */
        3
        /* 1 1 */
      ], he = B(I[de], I[we]);
      for (ie = Math.max(he[0].length, ie), re[de] = new Array(ie), re[we] = new Array(ie), se = 0; se < ie; se++) {
        var le = he[0][se] | 0, _e = he[1][se] | 0;
        re[de][se] = ke[(le + 1) * 3 + (_e + 1)], re[we][se] = 0, ee[de] = Se;
      }
    }
    var G = this.jpoint(null, null, null), Z = this._wnafT4;
    for (ne = ie; ne >= 0; ne--) {
      for (var e = 0; ne >= 0; ) {
        var o = !0;
        for (se = 0; se < P; se++)
          Z[se] = re[se][ne] | 0, Z[se] !== 0 && (o = !1);
        if (!o)
          break;
        e++, ne--;
      }
      if (ne >= 0 && e++, G = G.dblp(e), ne < 0)
        break;
      for (se = 0; se < P; se++) {
        var g = Z[se];
        g !== 0 && (g > 0 ? oe = ee[se][g - 1 >> 1] : g < 0 && (oe = ee[se][-g - 1 >> 1].neg()), oe.type === "affine" ? G = G.mixedAdd(oe) : G = G.add(oe));
      }
    }
    for (ne = 0; ne < P; ne++)
      ee[ne] = null;
    return Y ? G : G.toP();
  };
  function O(M, D) {
    this.curve = M, this.type = D, this.precomputed = null;
  }
  return t.BasePoint = O, O.prototype.eq = function() {
    throw new Error("Not implemented");
  }, O.prototype.validate = function() {
    return this.curve.validate(this);
  }, t.prototype.decodePoint = function(M, D) {
    M = h.toArray(M, D);
    var I = this.p.byteLength();
    if ((M[0] === 4 || M[0] === 6 || M[0] === 7) && M.length - 1 === 2 * I) {
      M[0] === 6 ? V(M[M.length - 1] % 2 === 0) : M[0] === 7 && V(M[M.length - 1] % 2 === 1);
      var P = this.point(
        M.slice(1, 1 + I),
        M.slice(1 + I, 1 + 2 * I)
      );
      return P;
    } else if ((M[0] === 2 || M[0] === 3) && M.length - 1 === I)
      return this.pointFromX(M.slice(1, 1 + I), M[0] === 3);
    throw new Error("Unknown point format");
  }, O.prototype.encodeCompressed = function(M) {
    return this.encode(M, !0);
  }, O.prototype._encode = function(M) {
    var D = this.curve.p.byteLength(), I = this.getX().toArray("be", D);
    return M ? [this.getY().isEven() ? 2 : 3].concat(I) : [4].concat(I, this.getY().toArray("be", D));
  }, O.prototype.encode = function(M, D) {
    return h.encode(this._encode(D), M);
  }, O.prototype.precompute = function(M) {
    if (this.precomputed)
      return this;
    var D = {
      doubles: null,
      naf: null,
      beta: null
    };
    return D.naf = this._getNAFPoints(8), D.doubles = this._getDoubles(4, M), D.beta = this._getBeta(), this.precomputed = D, this;
  }, O.prototype._hasDoubles = function(M) {
    if (!this.precomputed)
      return !1;
    var D = this.precomputed.doubles;
    return D ? D.points.length >= Math.ceil((M.bitLength() + 1) / D.step) : !1;
  }, O.prototype._getDoubles = function(M, D) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    for (var I = [this], P = this, Y = 0; Y < D; Y += M) {
      for (var X = 0; X < M; X++)
        P = P.dbl();
      I.push(P);
    }
    return {
      step: M,
      points: I
    };
  }, O.prototype._getNAFPoints = function(M) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;
    for (var D = [this], I = (1 << M) - 1, P = I === 1 ? null : this.dbl(), Y = 1; Y < I; Y++)
      D[Y] = D[Y - 1].add(P);
    return {
      wnd: M,
      points: D
    };
  }, O.prototype._getBeta = function() {
    return null;
  }, O.prototype.dblp = function(M) {
    for (var D = this, I = 0; I < M; I++)
      D = D.dbl();
    return D;
  }, base$1;
}
var short, hasRequiredShort;
function requireShort() {
  if (hasRequiredShort)
    return short;
  hasRequiredShort = 1;
  var $ = requireUtils$1(), h = requireBn$2(), U = requireInherits_browser(), B = requireBase$1(), V = $.assert;
  function t(D) {
    B.call(this, "short", D), this.a = new h(D.a, 16).toRed(this.red), this.b = new h(D.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(D), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
  }
  U(t, B), short = t, t.prototype._getEndomorphism = function(D) {
    if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
      var I, P;
      if (D.beta)
        I = new h(D.beta, 16).toRed(this.red);
      else {
        var Y = this._getEndoRoots(this.p);
        I = Y[0].cmp(Y[1]) < 0 ? Y[0] : Y[1], I = I.toRed(this.red);
      }
      if (D.lambda)
        P = new h(D.lambda, 16);
      else {
        var X = this._getEndoRoots(this.n);
        this.g.mul(X[0]).x.cmp(this.g.x.redMul(I)) === 0 ? P = X[0] : (P = X[1], V(this.g.mul(P).x.cmp(this.g.x.redMul(I)) === 0));
      }
      var ee;
      return D.basis ? ee = D.basis.map(function(re) {
        return {
          a: new h(re.a, 16),
          b: new h(re.b, 16)
        };
      }) : ee = this._getEndoBasis(P), {
        beta: I,
        lambda: P,
        basis: ee
      };
    }
  }, t.prototype._getEndoRoots = function(D) {
    var I = D === this.p ? this.red : h.mont(D), P = new h(2).toRed(I).redInvm(), Y = P.redNeg(), X = new h(3).toRed(I).redNeg().redSqrt().redMul(P), ee = Y.redAdd(X).fromRed(), re = Y.redSub(X).fromRed();
    return [ee, re];
  }, t.prototype._getEndoBasis = function(D) {
    for (var I = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), P = D, Y = this.n.clone(), X = new h(1), ee = new h(0), re = new h(0), ie = new h(1), ne, se, oe, be, de, we, Se, ke = 0, he, le; P.cmpn(0) !== 0; ) {
      var _e = Y.div(P);
      he = Y.sub(_e.mul(P)), le = re.sub(_e.mul(X));
      var G = ie.sub(_e.mul(ee));
      if (!oe && he.cmp(I) < 0)
        ne = Se.neg(), se = X, oe = he.neg(), be = le;
      else if (oe && ++ke === 2)
        break;
      Se = he, Y = P, P = he, re = X, X = le, ie = ee, ee = G;
    }
    de = he.neg(), we = le;
    var Z = oe.sqr().add(be.sqr()), e = de.sqr().add(we.sqr());
    return e.cmp(Z) >= 0 && (de = ne, we = se), oe.negative && (oe = oe.neg(), be = be.neg()), de.negative && (de = de.neg(), we = we.neg()), [
      { a: oe, b: be },
      { a: de, b: we }
    ];
  }, t.prototype._endoSplit = function(D) {
    var I = this.endo.basis, P = I[0], Y = I[1], X = Y.b.mul(D).divRound(this.n), ee = P.b.neg().mul(D).divRound(this.n), re = X.mul(P.a), ie = ee.mul(Y.a), ne = X.mul(P.b), se = ee.mul(Y.b), oe = D.sub(re).sub(ie), be = ne.add(se).neg();
    return { k1: oe, k2: be };
  }, t.prototype.pointFromX = function(D, I) {
    D = new h(D, 16), D.red || (D = D.toRed(this.red));
    var P = D.redSqr().redMul(D).redIAdd(D.redMul(this.a)).redIAdd(this.b), Y = P.redSqrt();
    if (Y.redSqr().redSub(P).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var X = Y.fromRed().isOdd();
    return (I && !X || !I && X) && (Y = Y.redNeg()), this.point(D, Y);
  }, t.prototype.validate = function(D) {
    if (D.inf)
      return !0;
    var I = D.x, P = D.y, Y = this.a.redMul(I), X = I.redSqr().redMul(I).redIAdd(Y).redIAdd(this.b);
    return P.redSqr().redISub(X).cmpn(0) === 0;
  }, t.prototype._endoWnafMulAdd = function(D, I, P) {
    for (var Y = this._endoWnafT1, X = this._endoWnafT2, ee = 0; ee < D.length; ee++) {
      var re = this._endoSplit(I[ee]), ie = D[ee], ne = ie._getBeta();
      re.k1.negative && (re.k1.ineg(), ie = ie.neg(!0)), re.k2.negative && (re.k2.ineg(), ne = ne.neg(!0)), Y[ee * 2] = ie, Y[ee * 2 + 1] = ne, X[ee * 2] = re.k1, X[ee * 2 + 1] = re.k2;
    }
    for (var se = this._wnafMulAdd(1, Y, X, ee * 2, P), oe = 0; oe < ee * 2; oe++)
      Y[oe] = null, X[oe] = null;
    return se;
  };
  function O(D, I, P, Y) {
    B.BasePoint.call(this, D, "affine"), I === null && P === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new h(I, 16), this.y = new h(P, 16), Y && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
  }
  U(O, B.BasePoint), t.prototype.point = function(D, I, P) {
    return new O(this, D, I, P);
  }, t.prototype.pointFromJSON = function(D, I) {
    return O.fromJSON(this, D, I);
  }, O.prototype._getBeta = function() {
    if (this.curve.endo) {
      var D = this.precomputed;
      if (D && D.beta)
        return D.beta;
      var I = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (D) {
        var P = this.curve, Y = function(X) {
          return P.point(X.x.redMul(P.endo.beta), X.y);
        };
        D.beta = I, I.precomputed = {
          beta: null,
          naf: D.naf && {
            wnd: D.naf.wnd,
            points: D.naf.points.map(Y)
          },
          doubles: D.doubles && {
            step: D.doubles.step,
            points: D.doubles.points.map(Y)
          }
        };
      }
      return I;
    }
  }, O.prototype.toJSON = function() {
    return this.precomputed ? [this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1)
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1)
      }
    }] : [this.x, this.y];
  }, O.fromJSON = function(D, I, P) {
    typeof I == "string" && (I = JSON.parse(I));
    var Y = D.point(I[0], I[1], P);
    if (!I[2])
      return Y;
    function X(re) {
      return D.point(re[0], re[1], P);
    }
    var ee = I[2];
    return Y.precomputed = {
      beta: null,
      doubles: ee.doubles && {
        step: ee.doubles.step,
        points: [Y].concat(ee.doubles.points.map(X))
      },
      naf: ee.naf && {
        wnd: ee.naf.wnd,
        points: [Y].concat(ee.naf.points.map(X))
      }
    }, Y;
  }, O.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
  }, O.prototype.isInfinity = function() {
    return this.inf;
  }, O.prototype.add = function(D) {
    if (this.inf)
      return D;
    if (D.inf)
      return this;
    if (this.eq(D))
      return this.dbl();
    if (this.neg().eq(D))
      return this.curve.point(null, null);
    if (this.x.cmp(D.x) === 0)
      return this.curve.point(null, null);
    var I = this.y.redSub(D.y);
    I.cmpn(0) !== 0 && (I = I.redMul(this.x.redSub(D.x).redInvm()));
    var P = I.redSqr().redISub(this.x).redISub(D.x), Y = I.redMul(this.x.redSub(P)).redISub(this.y);
    return this.curve.point(P, Y);
  }, O.prototype.dbl = function() {
    if (this.inf)
      return this;
    var D = this.y.redAdd(this.y);
    if (D.cmpn(0) === 0)
      return this.curve.point(null, null);
    var I = this.curve.a, P = this.x.redSqr(), Y = D.redInvm(), X = P.redAdd(P).redIAdd(P).redIAdd(I).redMul(Y), ee = X.redSqr().redISub(this.x.redAdd(this.x)), re = X.redMul(this.x.redSub(ee)).redISub(this.y);
    return this.curve.point(ee, re);
  }, O.prototype.getX = function() {
    return this.x.fromRed();
  }, O.prototype.getY = function() {
    return this.y.fromRed();
  }, O.prototype.mul = function(D) {
    return D = new h(D, 16), this.isInfinity() ? this : this._hasDoubles(D) ? this.curve._fixedNafMul(this, D) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [D]) : this.curve._wnafMul(this, D);
  }, O.prototype.mulAdd = function(D, I, P) {
    var Y = [this, I], X = [D, P];
    return this.curve.endo ? this.curve._endoWnafMulAdd(Y, X) : this.curve._wnafMulAdd(1, Y, X, 2);
  }, O.prototype.jmulAdd = function(D, I, P) {
    var Y = [this, I], X = [D, P];
    return this.curve.endo ? this.curve._endoWnafMulAdd(Y, X, !0) : this.curve._wnafMulAdd(1, Y, X, 2, !0);
  }, O.prototype.eq = function(D) {
    return this === D || this.inf === D.inf && (this.inf || this.x.cmp(D.x) === 0 && this.y.cmp(D.y) === 0);
  }, O.prototype.neg = function(D) {
    if (this.inf)
      return this;
    var I = this.curve.point(this.x, this.y.redNeg());
    if (D && this.precomputed) {
      var P = this.precomputed, Y = function(X) {
        return X.neg();
      };
      I.precomputed = {
        naf: P.naf && {
          wnd: P.naf.wnd,
          points: P.naf.points.map(Y)
        },
        doubles: P.doubles && {
          step: P.doubles.step,
          points: P.doubles.points.map(Y)
        }
      };
    }
    return I;
  }, O.prototype.toJ = function() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);
    var D = this.curve.jpoint(this.x, this.y, this.curve.one);
    return D;
  };
  function M(D, I, P, Y) {
    B.BasePoint.call(this, D, "jacobian"), I === null && P === null && Y === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new h(0)) : (this.x = new h(I, 16), this.y = new h(P, 16), this.z = new h(Y, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
  }
  return U(M, B.BasePoint), t.prototype.jpoint = function(D, I, P) {
    return new M(this, D, I, P);
  }, M.prototype.toP = function() {
    if (this.isInfinity())
      return this.curve.point(null, null);
    var D = this.z.redInvm(), I = D.redSqr(), P = this.x.redMul(I), Y = this.y.redMul(I).redMul(D);
    return this.curve.point(P, Y);
  }, M.prototype.neg = function() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  }, M.prototype.add = function(D) {
    if (this.isInfinity())
      return D;
    if (D.isInfinity())
      return this;
    var I = D.z.redSqr(), P = this.z.redSqr(), Y = this.x.redMul(I), X = D.x.redMul(P), ee = this.y.redMul(I.redMul(D.z)), re = D.y.redMul(P.redMul(this.z)), ie = Y.redSub(X), ne = ee.redSub(re);
    if (ie.cmpn(0) === 0)
      return ne.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var se = ie.redSqr(), oe = se.redMul(ie), be = Y.redMul(se), de = ne.redSqr().redIAdd(oe).redISub(be).redISub(be), we = ne.redMul(be.redISub(de)).redISub(ee.redMul(oe)), Se = this.z.redMul(D.z).redMul(ie);
    return this.curve.jpoint(de, we, Se);
  }, M.prototype.mixedAdd = function(D) {
    if (this.isInfinity())
      return D.toJ();
    if (D.isInfinity())
      return this;
    var I = this.z.redSqr(), P = this.x, Y = D.x.redMul(I), X = this.y, ee = D.y.redMul(I).redMul(this.z), re = P.redSub(Y), ie = X.redSub(ee);
    if (re.cmpn(0) === 0)
      return ie.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var ne = re.redSqr(), se = ne.redMul(re), oe = P.redMul(ne), be = ie.redSqr().redIAdd(se).redISub(oe).redISub(oe), de = ie.redMul(oe.redISub(be)).redISub(X.redMul(se)), we = this.z.redMul(re);
    return this.curve.jpoint(be, de, we);
  }, M.prototype.dblp = function(D) {
    if (D === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!D)
      return this.dbl();
    var I;
    if (this.curve.zeroA || this.curve.threeA) {
      var P = this;
      for (I = 0; I < D; I++)
        P = P.dbl();
      return P;
    }
    var Y = this.curve.a, X = this.curve.tinv, ee = this.x, re = this.y, ie = this.z, ne = ie.redSqr().redSqr(), se = re.redAdd(re);
    for (I = 0; I < D; I++) {
      var oe = ee.redSqr(), be = se.redSqr(), de = be.redSqr(), we = oe.redAdd(oe).redIAdd(oe).redIAdd(Y.redMul(ne)), Se = ee.redMul(be), ke = we.redSqr().redISub(Se.redAdd(Se)), he = Se.redISub(ke), le = we.redMul(he);
      le = le.redIAdd(le).redISub(de);
      var _e = se.redMul(ie);
      I + 1 < D && (ne = ne.redMul(de)), ee = ke, ie = _e, se = le;
    }
    return this.curve.jpoint(ee, se.redMul(X), ie);
  }, M.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
  }, M.prototype._zeroDbl = function() {
    var D, I, P;
    if (this.zOne) {
      var Y = this.x.redSqr(), X = this.y.redSqr(), ee = X.redSqr(), re = this.x.redAdd(X).redSqr().redISub(Y).redISub(ee);
      re = re.redIAdd(re);
      var ie = Y.redAdd(Y).redIAdd(Y), ne = ie.redSqr().redISub(re).redISub(re), se = ee.redIAdd(ee);
      se = se.redIAdd(se), se = se.redIAdd(se), D = ne, I = ie.redMul(re.redISub(ne)).redISub(se), P = this.y.redAdd(this.y);
    } else {
      var oe = this.x.redSqr(), be = this.y.redSqr(), de = be.redSqr(), we = this.x.redAdd(be).redSqr().redISub(oe).redISub(de);
      we = we.redIAdd(we);
      var Se = oe.redAdd(oe).redIAdd(oe), ke = Se.redSqr(), he = de.redIAdd(de);
      he = he.redIAdd(he), he = he.redIAdd(he), D = ke.redISub(we).redISub(we), I = Se.redMul(we.redISub(D)).redISub(he), P = this.y.redMul(this.z), P = P.redIAdd(P);
    }
    return this.curve.jpoint(D, I, P);
  }, M.prototype._threeDbl = function() {
    var D, I, P;
    if (this.zOne) {
      var Y = this.x.redSqr(), X = this.y.redSqr(), ee = X.redSqr(), re = this.x.redAdd(X).redSqr().redISub(Y).redISub(ee);
      re = re.redIAdd(re);
      var ie = Y.redAdd(Y).redIAdd(Y).redIAdd(this.curve.a), ne = ie.redSqr().redISub(re).redISub(re);
      D = ne;
      var se = ee.redIAdd(ee);
      se = se.redIAdd(se), se = se.redIAdd(se), I = ie.redMul(re.redISub(ne)).redISub(se), P = this.y.redAdd(this.y);
    } else {
      var oe = this.z.redSqr(), be = this.y.redSqr(), de = this.x.redMul(be), we = this.x.redSub(oe).redMul(this.x.redAdd(oe));
      we = we.redAdd(we).redIAdd(we);
      var Se = de.redIAdd(de);
      Se = Se.redIAdd(Se);
      var ke = Se.redAdd(Se);
      D = we.redSqr().redISub(ke), P = this.y.redAdd(this.z).redSqr().redISub(be).redISub(oe);
      var he = be.redSqr();
      he = he.redIAdd(he), he = he.redIAdd(he), he = he.redIAdd(he), I = we.redMul(Se.redISub(D)).redISub(he);
    }
    return this.curve.jpoint(D, I, P);
  }, M.prototype._dbl = function() {
    var D = this.curve.a, I = this.x, P = this.y, Y = this.z, X = Y.redSqr().redSqr(), ee = I.redSqr(), re = P.redSqr(), ie = ee.redAdd(ee).redIAdd(ee).redIAdd(D.redMul(X)), ne = I.redAdd(I);
    ne = ne.redIAdd(ne);
    var se = ne.redMul(re), oe = ie.redSqr().redISub(se.redAdd(se)), be = se.redISub(oe), de = re.redSqr();
    de = de.redIAdd(de), de = de.redIAdd(de), de = de.redIAdd(de);
    var we = ie.redMul(be).redISub(de), Se = P.redAdd(P).redMul(Y);
    return this.curve.jpoint(oe, we, Se);
  }, M.prototype.trpl = function() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);
    var D = this.x.redSqr(), I = this.y.redSqr(), P = this.z.redSqr(), Y = I.redSqr(), X = D.redAdd(D).redIAdd(D), ee = X.redSqr(), re = this.x.redAdd(I).redSqr().redISub(D).redISub(Y);
    re = re.redIAdd(re), re = re.redAdd(re).redIAdd(re), re = re.redISub(ee);
    var ie = re.redSqr(), ne = Y.redIAdd(Y);
    ne = ne.redIAdd(ne), ne = ne.redIAdd(ne), ne = ne.redIAdd(ne);
    var se = X.redIAdd(re).redSqr().redISub(ee).redISub(ie).redISub(ne), oe = I.redMul(se);
    oe = oe.redIAdd(oe), oe = oe.redIAdd(oe);
    var be = this.x.redMul(ie).redISub(oe);
    be = be.redIAdd(be), be = be.redIAdd(be);
    var de = this.y.redMul(se.redMul(ne.redISub(se)).redISub(re.redMul(ie)));
    de = de.redIAdd(de), de = de.redIAdd(de), de = de.redIAdd(de);
    var we = this.z.redAdd(re).redSqr().redISub(P).redISub(ie);
    return this.curve.jpoint(be, de, we);
  }, M.prototype.mul = function(D, I) {
    return D = new h(D, I), this.curve._wnafMul(this, D);
  }, M.prototype.eq = function(D) {
    if (D.type === "affine")
      return this.eq(D.toJ());
    if (this === D)
      return !0;
    var I = this.z.redSqr(), P = D.z.redSqr();
    if (this.x.redMul(P).redISub(D.x.redMul(I)).cmpn(0) !== 0)
      return !1;
    var Y = I.redMul(this.z), X = P.redMul(D.z);
    return this.y.redMul(X).redISub(D.y.redMul(Y)).cmpn(0) === 0;
  }, M.prototype.eqXToP = function(D) {
    var I = this.z.redSqr(), P = D.toRed(this.curve.red).redMul(I);
    if (this.x.cmp(P) === 0)
      return !0;
    for (var Y = D.clone(), X = this.curve.redN.redMul(I); ; ) {
      if (Y.iadd(this.curve.n), Y.cmp(this.curve.p) >= 0)
        return !1;
      if (P.redIAdd(X), this.x.cmp(P) === 0)
        return !0;
    }
  }, M.prototype.inspect = function() {
    return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
  }, M.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, short;
}
var mont, hasRequiredMont;
function requireMont() {
  if (hasRequiredMont)
    return mont;
  hasRequiredMont = 1;
  var $ = requireBn$2(), h = requireInherits_browser(), U = requireBase$1(), B = requireUtils$1();
  function V(O) {
    U.call(this, "mont", O), this.a = new $(O.a, 16).toRed(this.red), this.b = new $(O.b, 16).toRed(this.red), this.i4 = new $(4).toRed(this.red).redInvm(), this.two = new $(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two));
  }
  h(V, U), mont = V, V.prototype.validate = function(O) {
    var M = O.normalize().x, D = M.redSqr(), I = D.redMul(M).redAdd(D.redMul(this.a)).redAdd(M), P = I.redSqrt();
    return P.redSqr().cmp(I) === 0;
  };
  function t(O, M, D) {
    U.BasePoint.call(this, O, "projective"), M === null && D === null ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new $(M, 16), this.z = new $(D, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)));
  }
  return h(t, U.BasePoint), V.prototype.decodePoint = function(O, M) {
    return this.point(B.toArray(O, M), 1);
  }, V.prototype.point = function(O, M) {
    return new t(this, O, M);
  }, V.prototype.pointFromJSON = function(O) {
    return t.fromJSON(this, O);
  }, t.prototype.precompute = function() {
  }, t.prototype._encode = function() {
    return this.getX().toArray("be", this.curve.p.byteLength());
  }, t.fromJSON = function(O, M) {
    return new t(O, M[0], M[1] || O.one);
  }, t.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, t.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, t.prototype.dbl = function() {
    var O = this.x.redAdd(this.z), M = O.redSqr(), D = this.x.redSub(this.z), I = D.redSqr(), P = M.redSub(I), Y = M.redMul(I), X = P.redMul(I.redAdd(this.curve.a24.redMul(P)));
    return this.curve.point(Y, X);
  }, t.prototype.add = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.diffAdd = function(O, M) {
    var D = this.x.redAdd(this.z), I = this.x.redSub(this.z), P = O.x.redAdd(O.z), Y = O.x.redSub(O.z), X = Y.redMul(D), ee = P.redMul(I), re = M.z.redMul(X.redAdd(ee).redSqr()), ie = M.x.redMul(X.redISub(ee).redSqr());
    return this.curve.point(re, ie);
  }, t.prototype.mul = function(O) {
    for (var M = O.clone(), D = this, I = this.curve.point(null, null), P = this, Y = []; M.cmpn(0) !== 0; M.iushrn(1))
      Y.push(M.andln(1));
    for (var X = Y.length - 1; X >= 0; X--)
      Y[X] === 0 ? (D = D.diffAdd(I, P), I = I.dbl()) : (I = D.diffAdd(I, P), D = D.dbl());
    return I;
  }, t.prototype.mulAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.jumlAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, t.prototype.eq = function(O) {
    return this.getX().cmp(O.getX()) === 0;
  }, t.prototype.normalize = function() {
    return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this;
  }, t.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, mont;
}
var edwards, hasRequiredEdwards;
function requireEdwards() {
  if (hasRequiredEdwards)
    return edwards;
  hasRequiredEdwards = 1;
  var $ = requireUtils$1(), h = requireBn$2(), U = requireInherits_browser(), B = requireBase$1(), V = $.assert;
  function t(M) {
    this.twisted = (M.a | 0) !== 1, this.mOneA = this.twisted && (M.a | 0) === -1, this.extended = this.mOneA, B.call(this, "edwards", M), this.a = new h(M.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new h(M.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new h(M.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), V(!this.twisted || this.c.fromRed().cmpn(1) === 0), this.oneC = (M.c | 0) === 1;
  }
  U(t, B), edwards = t, t.prototype._mulA = function(M) {
    return this.mOneA ? M.redNeg() : this.a.redMul(M);
  }, t.prototype._mulC = function(M) {
    return this.oneC ? M : this.c.redMul(M);
  }, t.prototype.jpoint = function(M, D, I, P) {
    return this.point(M, D, I, P);
  }, t.prototype.pointFromX = function(M, D) {
    M = new h(M, 16), M.red || (M = M.toRed(this.red));
    var I = M.redSqr(), P = this.c2.redSub(this.a.redMul(I)), Y = this.one.redSub(this.c2.redMul(this.d).redMul(I)), X = P.redMul(Y.redInvm()), ee = X.redSqrt();
    if (ee.redSqr().redSub(X).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var re = ee.fromRed().isOdd();
    return (D && !re || !D && re) && (ee = ee.redNeg()), this.point(M, ee);
  }, t.prototype.pointFromY = function(M, D) {
    M = new h(M, 16), M.red || (M = M.toRed(this.red));
    var I = M.redSqr(), P = I.redSub(this.c2), Y = I.redMul(this.d).redMul(this.c2).redSub(this.a), X = P.redMul(Y.redInvm());
    if (X.cmp(this.zero) === 0) {
      if (D)
        throw new Error("invalid point");
      return this.point(this.zero, M);
    }
    var ee = X.redSqrt();
    if (ee.redSqr().redSub(X).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    return ee.fromRed().isOdd() !== D && (ee = ee.redNeg()), this.point(ee, M);
  }, t.prototype.validate = function(M) {
    if (M.isInfinity())
      return !0;
    M.normalize();
    var D = M.x.redSqr(), I = M.y.redSqr(), P = D.redMul(this.a).redAdd(I), Y = this.c2.redMul(this.one.redAdd(this.d.redMul(D).redMul(I)));
    return P.cmp(Y) === 0;
  };
  function O(M, D, I, P, Y) {
    B.BasePoint.call(this, M, "projective"), D === null && I === null && P === null ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new h(D, 16), this.y = new h(I, 16), this.z = P ? new h(P, 16) : this.curve.one, this.t = Y && new h(Y, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
  }
  return U(O, B.BasePoint), t.prototype.pointFromJSON = function(M) {
    return O.fromJSON(this, M);
  }, t.prototype.point = function(M, D, I, P) {
    return new O(this, M, D, I, P);
  }, O.fromJSON = function(M, D) {
    return new O(M, D[0], D[1], D[2]);
  }, O.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, O.prototype.isInfinity = function() {
    return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
  }, O.prototype._extDbl = function() {
    var M = this.x.redSqr(), D = this.y.redSqr(), I = this.z.redSqr();
    I = I.redIAdd(I);
    var P = this.curve._mulA(M), Y = this.x.redAdd(this.y).redSqr().redISub(M).redISub(D), X = P.redAdd(D), ee = X.redSub(I), re = P.redSub(D), ie = Y.redMul(ee), ne = X.redMul(re), se = Y.redMul(re), oe = ee.redMul(X);
    return this.curve.point(ie, ne, oe, se);
  }, O.prototype._projDbl = function() {
    var M = this.x.redAdd(this.y).redSqr(), D = this.x.redSqr(), I = this.y.redSqr(), P, Y, X, ee, re, ie;
    if (this.curve.twisted) {
      ee = this.curve._mulA(D);
      var ne = ee.redAdd(I);
      this.zOne ? (P = M.redSub(D).redSub(I).redMul(ne.redSub(this.curve.two)), Y = ne.redMul(ee.redSub(I)), X = ne.redSqr().redSub(ne).redSub(ne)) : (re = this.z.redSqr(), ie = ne.redSub(re).redISub(re), P = M.redSub(D).redISub(I).redMul(ie), Y = ne.redMul(ee.redSub(I)), X = ne.redMul(ie));
    } else
      ee = D.redAdd(I), re = this.curve._mulC(this.z).redSqr(), ie = ee.redSub(re).redSub(re), P = this.curve._mulC(M.redISub(ee)).redMul(ie), Y = this.curve._mulC(ee).redMul(D.redISub(I)), X = ee.redMul(ie);
    return this.curve.point(P, Y, X);
  }, O.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
  }, O.prototype._extAdd = function(M) {
    var D = this.y.redSub(this.x).redMul(M.y.redSub(M.x)), I = this.y.redAdd(this.x).redMul(M.y.redAdd(M.x)), P = this.t.redMul(this.curve.dd).redMul(M.t), Y = this.z.redMul(M.z.redAdd(M.z)), X = I.redSub(D), ee = Y.redSub(P), re = Y.redAdd(P), ie = I.redAdd(D), ne = X.redMul(ee), se = re.redMul(ie), oe = X.redMul(ie), be = ee.redMul(re);
    return this.curve.point(ne, se, be, oe);
  }, O.prototype._projAdd = function(M) {
    var D = this.z.redMul(M.z), I = D.redSqr(), P = this.x.redMul(M.x), Y = this.y.redMul(M.y), X = this.curve.d.redMul(P).redMul(Y), ee = I.redSub(X), re = I.redAdd(X), ie = this.x.redAdd(this.y).redMul(M.x.redAdd(M.y)).redISub(P).redISub(Y), ne = D.redMul(ee).redMul(ie), se, oe;
    return this.curve.twisted ? (se = D.redMul(re).redMul(Y.redSub(this.curve._mulA(P))), oe = ee.redMul(re)) : (se = D.redMul(re).redMul(Y.redSub(P)), oe = this.curve._mulC(ee).redMul(re)), this.curve.point(ne, se, oe);
  }, O.prototype.add = function(M) {
    return this.isInfinity() ? M : M.isInfinity() ? this : this.curve.extended ? this._extAdd(M) : this._projAdd(M);
  }, O.prototype.mul = function(M) {
    return this._hasDoubles(M) ? this.curve._fixedNafMul(this, M) : this.curve._wnafMul(this, M);
  }, O.prototype.mulAdd = function(M, D, I) {
    return this.curve._wnafMulAdd(1, [this, D], [M, I], 2, !1);
  }, O.prototype.jmulAdd = function(M, D, I) {
    return this.curve._wnafMulAdd(1, [this, D], [M, I], 2, !0);
  }, O.prototype.normalize = function() {
    if (this.zOne)
      return this;
    var M = this.z.redInvm();
    return this.x = this.x.redMul(M), this.y = this.y.redMul(M), this.t && (this.t = this.t.redMul(M)), this.z = this.curve.one, this.zOne = !0, this;
  }, O.prototype.neg = function() {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg()
    );
  }, O.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, O.prototype.getY = function() {
    return this.normalize(), this.y.fromRed();
  }, O.prototype.eq = function(M) {
    return this === M || this.getX().cmp(M.getX()) === 0 && this.getY().cmp(M.getY()) === 0;
  }, O.prototype.eqXToP = function(M) {
    var D = M.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(D) === 0)
      return !0;
    for (var I = M.clone(), P = this.curve.redN.redMul(this.z); ; ) {
      if (I.iadd(this.curve.n), I.cmp(this.curve.p) >= 0)
        return !1;
      if (D.redIAdd(P), this.x.cmp(D) === 0)
        return !0;
    }
  }, O.prototype.toP = O.prototype.normalize, O.prototype.mixedAdd = O.prototype.add, edwards;
}
var hasRequiredCurve;
function requireCurve() {
  return hasRequiredCurve || (hasRequiredCurve = 1, function($) {
    var h = $;
    h.base = requireBase$1(), h.short = requireShort(), h.mont = requireMont(), h.edwards = requireEdwards();
  }(curve)), curve;
}
var curves = {}, hash = {}, utils = {}, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils;
  hasRequiredUtils = 1;
  var $ = requireMinimalisticAssert(), h = requireInherits_browser();
  utils.inherits = h;
  function U(Z, e) {
    return (Z.charCodeAt(e) & 64512) !== 55296 || e < 0 || e + 1 >= Z.length ? !1 : (Z.charCodeAt(e + 1) & 64512) === 56320;
  }
  function B(Z, e) {
    if (Array.isArray(Z))
      return Z.slice();
    if (!Z)
      return [];
    var o = [];
    if (typeof Z == "string")
      if (e) {
        if (e === "hex")
          for (Z = Z.replace(/[^a-z0-9]+/ig, ""), Z.length % 2 !== 0 && (Z = "0" + Z), H = 0; H < Z.length; H += 2)
            o.push(parseInt(Z[H] + Z[H + 1], 16));
      } else
        for (var g = 0, H = 0; H < Z.length; H++) {
          var F = Z.charCodeAt(H);
          F < 128 ? o[g++] = F : F < 2048 ? (o[g++] = F >> 6 | 192, o[g++] = F & 63 | 128) : U(Z, H) ? (F = 65536 + ((F & 1023) << 10) + (Z.charCodeAt(++H) & 1023), o[g++] = F >> 18 | 240, o[g++] = F >> 12 & 63 | 128, o[g++] = F >> 6 & 63 | 128, o[g++] = F & 63 | 128) : (o[g++] = F >> 12 | 224, o[g++] = F >> 6 & 63 | 128, o[g++] = F & 63 | 128);
        }
    else
      for (H = 0; H < Z.length; H++)
        o[H] = Z[H] | 0;
    return o;
  }
  utils.toArray = B;
  function V(Z) {
    for (var e = "", o = 0; o < Z.length; o++)
      e += M(Z[o].toString(16));
    return e;
  }
  utils.toHex = V;
  function t(Z) {
    var e = Z >>> 24 | Z >>> 8 & 65280 | Z << 8 & 16711680 | (Z & 255) << 24;
    return e >>> 0;
  }
  utils.htonl = t;
  function O(Z, e) {
    for (var o = "", g = 0; g < Z.length; g++) {
      var H = Z[g];
      e === "little" && (H = t(H)), o += D(H.toString(16));
    }
    return o;
  }
  utils.toHex32 = O;
  function M(Z) {
    return Z.length === 1 ? "0" + Z : Z;
  }
  utils.zero2 = M;
  function D(Z) {
    return Z.length === 7 ? "0" + Z : Z.length === 6 ? "00" + Z : Z.length === 5 ? "000" + Z : Z.length === 4 ? "0000" + Z : Z.length === 3 ? "00000" + Z : Z.length === 2 ? "000000" + Z : Z.length === 1 ? "0000000" + Z : Z;
  }
  utils.zero8 = D;
  function I(Z, e, o, g) {
    var H = o - e;
    $(H % 4 === 0);
    for (var F = new Array(H / 4), A = 0, q = e; A < F.length; A++, q += 4) {
      var z;
      g === "big" ? z = Z[q] << 24 | Z[q + 1] << 16 | Z[q + 2] << 8 | Z[q + 3] : z = Z[q + 3] << 24 | Z[q + 2] << 16 | Z[q + 1] << 8 | Z[q], F[A] = z >>> 0;
    }
    return F;
  }
  utils.join32 = I;
  function P(Z, e) {
    for (var o = new Array(Z.length * 4), g = 0, H = 0; g < Z.length; g++, H += 4) {
      var F = Z[g];
      e === "big" ? (o[H] = F >>> 24, o[H + 1] = F >>> 16 & 255, o[H + 2] = F >>> 8 & 255, o[H + 3] = F & 255) : (o[H + 3] = F >>> 24, o[H + 2] = F >>> 16 & 255, o[H + 1] = F >>> 8 & 255, o[H] = F & 255);
    }
    return o;
  }
  utils.split32 = P;
  function Y(Z, e) {
    return Z >>> e | Z << 32 - e;
  }
  utils.rotr32 = Y;
  function X(Z, e) {
    return Z << e | Z >>> 32 - e;
  }
  utils.rotl32 = X;
  function ee(Z, e) {
    return Z + e >>> 0;
  }
  utils.sum32 = ee;
  function re(Z, e, o) {
    return Z + e + o >>> 0;
  }
  utils.sum32_3 = re;
  function ie(Z, e, o, g) {
    return Z + e + o + g >>> 0;
  }
  utils.sum32_4 = ie;
  function ne(Z, e, o, g, H) {
    return Z + e + o + g + H >>> 0;
  }
  utils.sum32_5 = ne;
  function se(Z, e, o, g) {
    var H = Z[e], F = Z[e + 1], A = g + F >>> 0, q = (A < g ? 1 : 0) + o + H;
    Z[e] = q >>> 0, Z[e + 1] = A;
  }
  utils.sum64 = se;
  function oe(Z, e, o, g) {
    var H = e + g >>> 0, F = (H < e ? 1 : 0) + Z + o;
    return F >>> 0;
  }
  utils.sum64_hi = oe;
  function be(Z, e, o, g) {
    var H = e + g;
    return H >>> 0;
  }
  utils.sum64_lo = be;
  function de(Z, e, o, g, H, F, A, q) {
    var z = 0, S = e;
    S = S + g >>> 0, z += S < e ? 1 : 0, S = S + F >>> 0, z += S < F ? 1 : 0, S = S + q >>> 0, z += S < q ? 1 : 0;
    var J = Z + o + H + A + z;
    return J >>> 0;
  }
  utils.sum64_4_hi = de;
  function we(Z, e, o, g, H, F, A, q) {
    var z = e + g + F + q;
    return z >>> 0;
  }
  utils.sum64_4_lo = we;
  function Se(Z, e, o, g, H, F, A, q, z, S) {
    var J = 0, ce = e;
    ce = ce + g >>> 0, J += ce < e ? 1 : 0, ce = ce + F >>> 0, J += ce < F ? 1 : 0, ce = ce + q >>> 0, J += ce < q ? 1 : 0, ce = ce + S >>> 0, J += ce < S ? 1 : 0;
    var ye = Z + o + H + A + z + J;
    return ye >>> 0;
  }
  utils.sum64_5_hi = Se;
  function ke(Z, e, o, g, H, F, A, q, z, S) {
    var J = e + g + F + q + S;
    return J >>> 0;
  }
  utils.sum64_5_lo = ke;
  function he(Z, e, o) {
    var g = e << 32 - o | Z >>> o;
    return g >>> 0;
  }
  utils.rotr64_hi = he;
  function le(Z, e, o) {
    var g = Z << 32 - o | e >>> o;
    return g >>> 0;
  }
  utils.rotr64_lo = le;
  function _e(Z, e, o) {
    return Z >>> o;
  }
  utils.shr64_hi = _e;
  function G(Z, e, o) {
    var g = Z << 32 - o | e >>> o;
    return g >>> 0;
  }
  return utils.shr64_lo = G, utils;
}
var common$1 = {}, hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1)
    return common$1;
  hasRequiredCommon$1 = 1;
  var $ = requireUtils(), h = requireMinimalisticAssert();
  function U() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return common$1.BlockHash = U, U.prototype.update = function(B, V) {
    if (B = $.toArray(B, V), this.pending ? this.pending = this.pending.concat(B) : this.pending = B, this.pendingTotal += B.length, this.pending.length >= this._delta8) {
      B = this.pending;
      var t = B.length % this._delta8;
      this.pending = B.slice(B.length - t, B.length), this.pending.length === 0 && (this.pending = null), B = $.join32(B, 0, B.length - t, this.endian);
      for (var O = 0; O < B.length; O += this._delta32)
        this._update(B, O, O + this._delta32);
    }
    return this;
  }, U.prototype.digest = function(B) {
    return this.update(this._pad()), h(this.pending === null), this._digest(B);
  }, U.prototype._pad = function() {
    var B = this.pendingTotal, V = this._delta8, t = V - (B + this.padLength) % V, O = new Array(t + this.padLength);
    O[0] = 128;
    for (var M = 1; M < t; M++)
      O[M] = 0;
    if (B <<= 3, this.endian === "big") {
      for (var D = 8; D < this.padLength; D++)
        O[M++] = 0;
      O[M++] = 0, O[M++] = 0, O[M++] = 0, O[M++] = 0, O[M++] = B >>> 24 & 255, O[M++] = B >>> 16 & 255, O[M++] = B >>> 8 & 255, O[M++] = B & 255;
    } else
      for (O[M++] = B & 255, O[M++] = B >>> 8 & 255, O[M++] = B >>> 16 & 255, O[M++] = B >>> 24 & 255, O[M++] = 0, O[M++] = 0, O[M++] = 0, O[M++] = 0, D = 8; D < this.padLength; D++)
        O[M++] = 0;
    return O;
  }, common$1;
}
var sha = {}, common = {}, hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon)
    return common;
  hasRequiredCommon = 1;
  var $ = requireUtils(), h = $.rotr32;
  function U(P, Y, X, ee) {
    if (P === 0)
      return B(Y, X, ee);
    if (P === 1 || P === 3)
      return t(Y, X, ee);
    if (P === 2)
      return V(Y, X, ee);
  }
  common.ft_1 = U;
  function B(P, Y, X) {
    return P & Y ^ ~P & X;
  }
  common.ch32 = B;
  function V(P, Y, X) {
    return P & Y ^ P & X ^ Y & X;
  }
  common.maj32 = V;
  function t(P, Y, X) {
    return P ^ Y ^ X;
  }
  common.p32 = t;
  function O(P) {
    return h(P, 2) ^ h(P, 13) ^ h(P, 22);
  }
  common.s0_256 = O;
  function M(P) {
    return h(P, 6) ^ h(P, 11) ^ h(P, 25);
  }
  common.s1_256 = M;
  function D(P) {
    return h(P, 7) ^ h(P, 18) ^ P >>> 3;
  }
  common.g0_256 = D;
  function I(P) {
    return h(P, 17) ^ h(P, 19) ^ P >>> 10;
  }
  return common.g1_256 = I, common;
}
var _1, hasRequired_1;
function require_1() {
  if (hasRequired_1)
    return _1;
  hasRequired_1 = 1;
  var $ = requireUtils(), h = requireCommon$1(), U = requireCommon(), B = $.rotl32, V = $.sum32, t = $.sum32_5, O = U.ft_1, M = h.BlockHash, D = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function I() {
    if (!(this instanceof I))
      return new I();
    M.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return $.inherits(I, M), _1 = I, I.blockSize = 512, I.outSize = 160, I.hmacStrength = 80, I.padLength = 64, I.prototype._update = function(P, Y) {
    for (var X = this.W, ee = 0; ee < 16; ee++)
      X[ee] = P[Y + ee];
    for (; ee < X.length; ee++)
      X[ee] = B(X[ee - 3] ^ X[ee - 8] ^ X[ee - 14] ^ X[ee - 16], 1);
    var re = this.h[0], ie = this.h[1], ne = this.h[2], se = this.h[3], oe = this.h[4];
    for (ee = 0; ee < X.length; ee++) {
      var be = ~~(ee / 20), de = t(B(re, 5), O(be, ie, ne, se), oe, X[ee], D[be]);
      oe = se, se = ne, ne = B(ie, 30), ie = re, re = de;
    }
    this.h[0] = V(this.h[0], re), this.h[1] = V(this.h[1], ie), this.h[2] = V(this.h[2], ne), this.h[3] = V(this.h[3], se), this.h[4] = V(this.h[4], oe);
  }, I.prototype._digest = function(P) {
    return P === "hex" ? $.toHex32(this.h, "big") : $.split32(this.h, "big");
  }, _1;
}
var _256, hasRequired_256;
function require_256() {
  if (hasRequired_256)
    return _256;
  hasRequired_256 = 1;
  var $ = requireUtils(), h = requireCommon$1(), U = requireCommon(), B = requireMinimalisticAssert(), V = $.sum32, t = $.sum32_4, O = $.sum32_5, M = U.ch32, D = U.maj32, I = U.s0_256, P = U.s1_256, Y = U.g0_256, X = U.g1_256, ee = h.BlockHash, re = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function ie() {
    if (!(this instanceof ie))
      return new ie();
    ee.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = re, this.W = new Array(64);
  }
  return $.inherits(ie, ee), _256 = ie, ie.blockSize = 512, ie.outSize = 256, ie.hmacStrength = 192, ie.padLength = 64, ie.prototype._update = function(ne, se) {
    for (var oe = this.W, be = 0; be < 16; be++)
      oe[be] = ne[se + be];
    for (; be < oe.length; be++)
      oe[be] = t(X(oe[be - 2]), oe[be - 7], Y(oe[be - 15]), oe[be - 16]);
    var de = this.h[0], we = this.h[1], Se = this.h[2], ke = this.h[3], he = this.h[4], le = this.h[5], _e = this.h[6], G = this.h[7];
    for (B(this.k.length === oe.length), be = 0; be < oe.length; be++) {
      var Z = O(G, P(he), M(he, le, _e), this.k[be], oe[be]), e = V(I(de), D(de, we, Se));
      G = _e, _e = le, le = he, he = V(ke, Z), ke = Se, Se = we, we = de, de = V(Z, e);
    }
    this.h[0] = V(this.h[0], de), this.h[1] = V(this.h[1], we), this.h[2] = V(this.h[2], Se), this.h[3] = V(this.h[3], ke), this.h[4] = V(this.h[4], he), this.h[5] = V(this.h[5], le), this.h[6] = V(this.h[6], _e), this.h[7] = V(this.h[7], G);
  }, ie.prototype._digest = function(ne) {
    return ne === "hex" ? $.toHex32(this.h, "big") : $.split32(this.h, "big");
  }, _256;
}
var _224, hasRequired_224;
function require_224() {
  if (hasRequired_224)
    return _224;
  hasRequired_224 = 1;
  var $ = requireUtils(), h = require_256();
  function U() {
    if (!(this instanceof U))
      return new U();
    h.call(this), this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  return $.inherits(U, h), _224 = U, U.blockSize = 512, U.outSize = 224, U.hmacStrength = 192, U.padLength = 64, U.prototype._digest = function(B) {
    return B === "hex" ? $.toHex32(this.h.slice(0, 7), "big") : $.split32(this.h.slice(0, 7), "big");
  }, _224;
}
var _512, hasRequired_512;
function require_512() {
  if (hasRequired_512)
    return _512;
  hasRequired_512 = 1;
  var $ = requireUtils(), h = requireCommon$1(), U = requireMinimalisticAssert(), B = $.rotr64_hi, V = $.rotr64_lo, t = $.shr64_hi, O = $.shr64_lo, M = $.sum64, D = $.sum64_hi, I = $.sum64_lo, P = $.sum64_4_hi, Y = $.sum64_4_lo, X = $.sum64_5_hi, ee = $.sum64_5_lo, re = h.BlockHash, ie = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function ne() {
    if (!(this instanceof ne))
      return new ne();
    re.call(this), this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ], this.k = ie, this.W = new Array(160);
  }
  $.inherits(ne, re), _512 = ne, ne.blockSize = 1024, ne.outSize = 512, ne.hmacStrength = 192, ne.padLength = 128, ne.prototype._prepareBlock = function(e, o) {
    for (var g = this.W, H = 0; H < 32; H++)
      g[H] = e[o + H];
    for (; H < g.length; H += 2) {
      var F = G(g[H - 4], g[H - 3]), A = Z(g[H - 4], g[H - 3]), q = g[H - 14], z = g[H - 13], S = le(g[H - 30], g[H - 29]), J = _e(g[H - 30], g[H - 29]), ce = g[H - 32], ye = g[H - 31];
      g[H] = P(
        F,
        A,
        q,
        z,
        S,
        J,
        ce,
        ye
      ), g[H + 1] = Y(
        F,
        A,
        q,
        z,
        S,
        J,
        ce,
        ye
      );
    }
  }, ne.prototype._update = function(e, o) {
    this._prepareBlock(e, o);
    var g = this.W, H = this.h[0], F = this.h[1], A = this.h[2], q = this.h[3], z = this.h[4], S = this.h[5], J = this.h[6], ce = this.h[7], ye = this.h[8], Me = this.h[9], me = this.h[10], ue = this.h[11], fe = this.h[12], Ae = this.h[13], Be = this.h[14], pe = this.h[15];
    U(this.k.length === g.length);
    for (var ge = 0; ge < g.length; ge += 2) {
      var Ee = Be, Ie = pe, Pe = ke(ye, Me), Q = he(ye, Me), K = se(ye, Me, me, ue, fe), te = oe(ye, Me, me, ue, fe, Ae), ae = this.k[ge], ve = this.k[ge + 1], qe = g[ge], Re = g[ge + 1], xe = X(
        Ee,
        Ie,
        Pe,
        Q,
        K,
        te,
        ae,
        ve,
        qe,
        Re
      ), Le = ee(
        Ee,
        Ie,
        Pe,
        Q,
        K,
        te,
        ae,
        ve,
        qe,
        Re
      );
      Ee = we(H, F), Ie = Se(H, F), Pe = be(H, F, A, q, z), Q = de(H, F, A, q, z, S);
      var Te = D(Ee, Ie, Pe, Q), $e = I(Ee, Ie, Pe, Q);
      Be = fe, pe = Ae, fe = me, Ae = ue, me = ye, ue = Me, ye = D(J, ce, xe, Le), Me = I(ce, ce, xe, Le), J = z, ce = S, z = A, S = q, A = H, q = F, H = D(xe, Le, Te, $e), F = I(xe, Le, Te, $e);
    }
    M(this.h, 0, H, F), M(this.h, 2, A, q), M(this.h, 4, z, S), M(this.h, 6, J, ce), M(this.h, 8, ye, Me), M(this.h, 10, me, ue), M(this.h, 12, fe, Ae), M(this.h, 14, Be, pe);
  }, ne.prototype._digest = function(e) {
    return e === "hex" ? $.toHex32(this.h, "big") : $.split32(this.h, "big");
  };
  function se(e, o, g, H, F) {
    var A = e & g ^ ~e & F;
    return A < 0 && (A += 4294967296), A;
  }
  function oe(e, o, g, H, F, A) {
    var q = o & H ^ ~o & A;
    return q < 0 && (q += 4294967296), q;
  }
  function be(e, o, g, H, F) {
    var A = e & g ^ e & F ^ g & F;
    return A < 0 && (A += 4294967296), A;
  }
  function de(e, o, g, H, F, A) {
    var q = o & H ^ o & A ^ H & A;
    return q < 0 && (q += 4294967296), q;
  }
  function we(e, o) {
    var g = B(e, o, 28), H = B(o, e, 2), F = B(o, e, 7), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  function Se(e, o) {
    var g = V(e, o, 28), H = V(o, e, 2), F = V(o, e, 7), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  function ke(e, o) {
    var g = B(e, o, 14), H = B(e, o, 18), F = B(o, e, 9), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  function he(e, o) {
    var g = V(e, o, 14), H = V(e, o, 18), F = V(o, e, 9), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  function le(e, o) {
    var g = B(e, o, 1), H = B(e, o, 8), F = t(e, o, 7), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  function _e(e, o) {
    var g = V(e, o, 1), H = V(e, o, 8), F = O(e, o, 7), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  function G(e, o) {
    var g = B(e, o, 19), H = B(o, e, 29), F = t(e, o, 6), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  function Z(e, o) {
    var g = V(e, o, 19), H = V(o, e, 29), F = O(e, o, 6), A = g ^ H ^ F;
    return A < 0 && (A += 4294967296), A;
  }
  return _512;
}
var _384, hasRequired_384;
function require_384() {
  if (hasRequired_384)
    return _384;
  hasRequired_384 = 1;
  var $ = requireUtils(), h = require_512();
  function U() {
    if (!(this instanceof U))
      return new U();
    h.call(this), this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  return $.inherits(U, h), _384 = U, U.blockSize = 1024, U.outSize = 384, U.hmacStrength = 192, U.padLength = 128, U.prototype._digest = function(B) {
    return B === "hex" ? $.toHex32(this.h.slice(0, 12), "big") : $.split32(this.h.slice(0, 12), "big");
  }, _384;
}
var hasRequiredSha;
function requireSha() {
  return hasRequiredSha || (hasRequiredSha = 1, sha.sha1 = require_1(), sha.sha224 = require_224(), sha.sha256 = require_256(), sha.sha384 = require_384(), sha.sha512 = require_512()), sha;
}
var ripemd = {}, hasRequiredRipemd;
function requireRipemd() {
  if (hasRequiredRipemd)
    return ripemd;
  hasRequiredRipemd = 1;
  var $ = requireUtils(), h = requireCommon$1(), U = $.rotl32, B = $.sum32, V = $.sum32_3, t = $.sum32_4, O = h.BlockHash;
  function M() {
    if (!(this instanceof M))
      return new M();
    O.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  $.inherits(M, O), ripemd.ripemd160 = M, M.blockSize = 512, M.outSize = 160, M.hmacStrength = 192, M.padLength = 64, M.prototype._update = function(ie, ne) {
    for (var se = this.h[0], oe = this.h[1], be = this.h[2], de = this.h[3], we = this.h[4], Se = se, ke = oe, he = be, le = de, _e = we, G = 0; G < 80; G++) {
      var Z = B(
        U(
          t(se, D(G, oe, be, de), ie[Y[G] + ne], I(G)),
          ee[G]
        ),
        we
      );
      se = we, we = de, de = U(be, 10), be = oe, oe = Z, Z = B(
        U(
          t(Se, D(79 - G, ke, he, le), ie[X[G] + ne], P(G)),
          re[G]
        ),
        _e
      ), Se = _e, _e = le, le = U(he, 10), he = ke, ke = Z;
    }
    Z = V(this.h[1], be, le), this.h[1] = V(this.h[2], de, _e), this.h[2] = V(this.h[3], we, Se), this.h[3] = V(this.h[4], se, ke), this.h[4] = V(this.h[0], oe, he), this.h[0] = Z;
  }, M.prototype._digest = function(ie) {
    return ie === "hex" ? $.toHex32(this.h, "little") : $.split32(this.h, "little");
  };
  function D(ie, ne, se, oe) {
    return ie <= 15 ? ne ^ se ^ oe : ie <= 31 ? ne & se | ~ne & oe : ie <= 47 ? (ne | ~se) ^ oe : ie <= 63 ? ne & oe | se & ~oe : ne ^ (se | ~oe);
  }
  function I(ie) {
    return ie <= 15 ? 0 : ie <= 31 ? 1518500249 : ie <= 47 ? 1859775393 : ie <= 63 ? 2400959708 : 2840853838;
  }
  function P(ie) {
    return ie <= 15 ? 1352829926 : ie <= 31 ? 1548603684 : ie <= 47 ? 1836072691 : ie <= 63 ? 2053994217 : 0;
  }
  var Y = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], X = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], ee = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], re = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
  return ripemd;
}
var hmac, hasRequiredHmac;
function requireHmac() {
  if (hasRequiredHmac)
    return hmac;
  hasRequiredHmac = 1;
  var $ = requireUtils(), h = requireMinimalisticAssert();
  function U(B, V, t) {
    if (!(this instanceof U))
      return new U(B, V, t);
    this.Hash = B, this.blockSize = B.blockSize / 8, this.outSize = B.outSize / 8, this.inner = null, this.outer = null, this._init($.toArray(V, t));
  }
  return hmac = U, U.prototype._init = function(B) {
    B.length > this.blockSize && (B = new this.Hash().update(B).digest()), h(B.length <= this.blockSize);
    for (var V = B.length; V < this.blockSize; V++)
      B.push(0);
    for (V = 0; V < B.length; V++)
      B[V] ^= 54;
    for (this.inner = new this.Hash().update(B), V = 0; V < B.length; V++)
      B[V] ^= 106;
    this.outer = new this.Hash().update(B);
  }, U.prototype.update = function(B, V) {
    return this.inner.update(B, V), this;
  }, U.prototype.digest = function(B) {
    return this.outer.update(this.inner.digest()), this.outer.digest(B);
  }, hmac;
}
var hasRequiredHash;
function requireHash() {
  return hasRequiredHash || (hasRequiredHash = 1, function($) {
    var h = $;
    h.utils = requireUtils(), h.common = requireCommon$1(), h.sha = requireSha(), h.ripemd = requireRipemd(), h.hmac = requireHmac(), h.sha1 = h.sha.sha1, h.sha256 = h.sha.sha256, h.sha224 = h.sha.sha224, h.sha384 = h.sha.sha384, h.sha512 = h.sha.sha512, h.ripemd160 = h.ripemd.ripemd160;
  }(hash)), hash;
}
var secp256k1, hasRequiredSecp256k1;
function requireSecp256k1() {
  return hasRequiredSecp256k1 || (hasRequiredSecp256k1 = 1, secp256k1 = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
        ]
      ]
    }
  }), secp256k1;
}
var hasRequiredCurves;
function requireCurves() {
  return hasRequiredCurves || (hasRequiredCurves = 1, function($) {
    var h = $, U = requireHash(), B = requireCurve(), V = requireUtils$1(), t = V.assert;
    function O(I) {
      I.type === "short" ? this.curve = new B.short(I) : I.type === "edwards" ? this.curve = new B.edwards(I) : this.curve = new B.mont(I), this.g = this.curve.g, this.n = this.curve.n, this.hash = I.hash, t(this.g.validate(), "Invalid curve"), t(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    h.PresetCurve = O;
    function M(I, P) {
      Object.defineProperty(h, I, {
        configurable: !0,
        enumerable: !0,
        get: function() {
          var Y = new O(P);
          return Object.defineProperty(h, I, {
            configurable: !0,
            enumerable: !0,
            value: Y
          }), Y;
        }
      });
    }
    M("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: U.sha256,
      gRed: !1,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    }), M("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: U.sha256,
      gRed: !1,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    }), M("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: U.sha256,
      gRed: !1,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    }), M("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: U.sha384,
      gRed: !1,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    }), M("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: U.sha512,
      gRed: !1,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    }), M("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: U.sha256,
      gRed: !1,
      g: [
        "9"
      ]
    }), M("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: U.sha256,
      gRed: !1,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var D;
    try {
      D = requireSecp256k1();
    } catch {
      D = void 0;
    }
    M("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: U.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: !1,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        D
      ]
    });
  }(curves)), curves;
}
var hmacDrbg, hasRequiredHmacDrbg;
function requireHmacDrbg() {
  if (hasRequiredHmacDrbg)
    return hmacDrbg;
  hasRequiredHmacDrbg = 1;
  var $ = requireHash(), h = requireUtils$2(), U = requireMinimalisticAssert();
  function B(V) {
    if (!(this instanceof B))
      return new B(V);
    this.hash = V.hash, this.predResist = !!V.predResist, this.outLen = this.hash.outSize, this.minEntropy = V.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
    var t = h.toArray(V.entropy, V.entropyEnc || "hex"), O = h.toArray(V.nonce, V.nonceEnc || "hex"), M = h.toArray(V.pers, V.persEnc || "hex");
    U(
      t.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._init(t, O, M);
  }
  return hmacDrbg = B, B.prototype._init = function(V, t, O) {
    var M = V.concat(t).concat(O);
    this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
    for (var D = 0; D < this.V.length; D++)
      this.K[D] = 0, this.V[D] = 1;
    this._update(M), this._reseed = 1, this.reseedInterval = 281474976710656;
  }, B.prototype._hmac = function() {
    return new $.hmac(this.hash, this.K);
  }, B.prototype._update = function(V) {
    var t = this._hmac().update(this.V).update([0]);
    V && (t = t.update(V)), this.K = t.digest(), this.V = this._hmac().update(this.V).digest(), V && (this.K = this._hmac().update(this.V).update([1]).update(V).digest(), this.V = this._hmac().update(this.V).digest());
  }, B.prototype.reseed = function(V, t, O, M) {
    typeof t != "string" && (M = O, O = t, t = null), V = h.toArray(V, t), O = h.toArray(O, M), U(
      V.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._update(V.concat(O || [])), this._reseed = 1;
  }, B.prototype.generate = function(V, t, O, M) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    typeof t != "string" && (M = O, O = t, t = null), O && (O = h.toArray(O, M || "hex"), this._update(O));
    for (var D = []; D.length < V; )
      this.V = this._hmac().update(this.V).digest(), D = D.concat(this.V);
    var I = D.slice(0, V);
    return this._update(O), this._reseed++, h.encode(I, t);
  }, hmacDrbg;
}
var key$1, hasRequiredKey$1;
function requireKey$1() {
  if (hasRequiredKey$1)
    return key$1;
  hasRequiredKey$1 = 1;
  var $ = requireBn$2(), h = requireUtils$1(), U = h.assert;
  function B(V, t) {
    this.ec = V, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc);
  }
  return key$1 = B, B.fromPublic = function(V, t, O) {
    return t instanceof B ? t : new B(V, {
      pub: t,
      pubEnc: O
    });
  }, B.fromPrivate = function(V, t, O) {
    return t instanceof B ? t : new B(V, {
      priv: t,
      privEnc: O
    });
  }, B.prototype.validate = function() {
    var V = this.getPublic();
    return V.isInfinity() ? { result: !1, reason: "Invalid public key" } : V.validate() ? V.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
  }, B.prototype.getPublic = function(V, t) {
    return typeof V == "string" && (t = V, V = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, V) : this.pub;
  }, B.prototype.getPrivate = function(V) {
    return V === "hex" ? this.priv.toString(16, 2) : this.priv;
  }, B.prototype._importPrivate = function(V, t) {
    this.priv = new $(V, t || 16), this.priv = this.priv.umod(this.ec.curve.n);
  }, B.prototype._importPublic = function(V, t) {
    if (V.x || V.y) {
      this.ec.curve.type === "mont" ? U(V.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && U(V.x && V.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(V.x, V.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(V, t);
  }, B.prototype.derive = function(V) {
    return V.validate() || U(V.validate(), "public point not validated"), V.mul(this.priv).getX();
  }, B.prototype.sign = function(V, t, O) {
    return this.ec.sign(V, this, t, O);
  }, B.prototype.verify = function(V, t) {
    return this.ec.verify(V, t, this);
  }, B.prototype.inspect = function() {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
  }, key$1;
}
var signature$1, hasRequiredSignature$1;
function requireSignature$1() {
  if (hasRequiredSignature$1)
    return signature$1;
  hasRequiredSignature$1 = 1;
  var $ = requireBn$2(), h = requireUtils$1(), U = h.assert;
  function B(D, I) {
    if (D instanceof B)
      return D;
    this._importDER(D, I) || (U(D.r && D.s, "Signature without r or s"), this.r = new $(D.r, 16), this.s = new $(D.s, 16), D.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = D.recoveryParam);
  }
  signature$1 = B;
  function V() {
    this.place = 0;
  }
  function t(D, I) {
    var P = D[I.place++];
    if (!(P & 128))
      return P;
    var Y = P & 15;
    if (Y === 0 || Y > 4)
      return !1;
    for (var X = 0, ee = 0, re = I.place; ee < Y; ee++, re++)
      X <<= 8, X |= D[re], X >>>= 0;
    return X <= 127 ? !1 : (I.place = re, X);
  }
  function O(D) {
    for (var I = 0, P = D.length - 1; !D[I] && !(D[I + 1] & 128) && I < P; )
      I++;
    return I === 0 ? D : D.slice(I);
  }
  B.prototype._importDER = function(D, I) {
    D = h.toArray(D, I);
    var P = new V();
    if (D[P.place++] !== 48)
      return !1;
    var Y = t(D, P);
    if (Y === !1 || Y + P.place !== D.length || D[P.place++] !== 2)
      return !1;
    var X = t(D, P);
    if (X === !1)
      return !1;
    var ee = D.slice(P.place, X + P.place);
    if (P.place += X, D[P.place++] !== 2)
      return !1;
    var re = t(D, P);
    if (re === !1 || D.length !== re + P.place)
      return !1;
    var ie = D.slice(P.place, re + P.place);
    if (ee[0] === 0)
      if (ee[1] & 128)
        ee = ee.slice(1);
      else
        return !1;
    if (ie[0] === 0)
      if (ie[1] & 128)
        ie = ie.slice(1);
      else
        return !1;
    return this.r = new $(ee), this.s = new $(ie), this.recoveryParam = null, !0;
  };
  function M(D, I) {
    if (I < 128) {
      D.push(I);
      return;
    }
    var P = 1 + (Math.log(I) / Math.LN2 >>> 3);
    for (D.push(P | 128); --P; )
      D.push(I >>> (P << 3) & 255);
    D.push(I);
  }
  return B.prototype.toDER = function(D) {
    var I = this.r.toArray(), P = this.s.toArray();
    for (I[0] & 128 && (I = [0].concat(I)), P[0] & 128 && (P = [0].concat(P)), I = O(I), P = O(P); !P[0] && !(P[1] & 128); )
      P = P.slice(1);
    var Y = [2];
    M(Y, I.length), Y = Y.concat(I), Y.push(2), M(Y, P.length);
    var X = Y.concat(P), ee = [48];
    return M(ee, X.length), ee = ee.concat(X), h.encode(ee, D);
  }, signature$1;
}
var ec, hasRequiredEc;
function requireEc() {
  if (hasRequiredEc)
    return ec;
  hasRequiredEc = 1;
  var $ = requireBn$2(), h = requireHmacDrbg(), U = requireUtils$1(), B = requireCurves(), V = requireBrorand(), t = U.assert, O = requireKey$1(), M = requireSignature$1();
  function D(I) {
    if (!(this instanceof D))
      return new D(I);
    typeof I == "string" && (t(
      Object.prototype.hasOwnProperty.call(B, I),
      "Unknown curve " + I
    ), I = B[I]), I instanceof B.PresetCurve && (I = { curve: I }), this.curve = I.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = I.curve.g, this.g.precompute(I.curve.n.bitLength() + 1), this.hash = I.hash || I.curve.hash;
  }
  return ec = D, D.prototype.keyPair = function(I) {
    return new O(this, I);
  }, D.prototype.keyFromPrivate = function(I, P) {
    return O.fromPrivate(this, I, P);
  }, D.prototype.keyFromPublic = function(I, P) {
    return O.fromPublic(this, I, P);
  }, D.prototype.genKeyPair = function(I) {
    I || (I = {});
    for (var P = new h({
      hash: this.hash,
      pers: I.pers,
      persEnc: I.persEnc || "utf8",
      entropy: I.entropy || V(this.hash.hmacStrength),
      entropyEnc: I.entropy && I.entropyEnc || "utf8",
      nonce: this.n.toArray()
    }), Y = this.n.byteLength(), X = this.n.sub(new $(2)); ; ) {
      var ee = new $(P.generate(Y));
      if (!(ee.cmp(X) > 0))
        return ee.iaddn(1), this.keyFromPrivate(ee);
    }
  }, D.prototype._truncateToN = function(I, P) {
    var Y = I.byteLength() * 8 - this.n.bitLength();
    return Y > 0 && (I = I.ushrn(Y)), !P && I.cmp(this.n) >= 0 ? I.sub(this.n) : I;
  }, D.prototype.sign = function(I, P, Y, X) {
    typeof Y == "object" && (X = Y, Y = null), X || (X = {}), P = this.keyFromPrivate(P, Y), I = this._truncateToN(new $(I, 16));
    for (var ee = this.n.byteLength(), re = P.getPrivate().toArray("be", ee), ie = I.toArray("be", ee), ne = new h({
      hash: this.hash,
      entropy: re,
      nonce: ie,
      pers: X.pers,
      persEnc: X.persEnc || "utf8"
    }), se = this.n.sub(new $(1)), oe = 0; ; oe++) {
      var be = X.k ? X.k(oe) : new $(ne.generate(this.n.byteLength()));
      if (be = this._truncateToN(be, !0), !(be.cmpn(1) <= 0 || be.cmp(se) >= 0)) {
        var de = this.g.mul(be);
        if (!de.isInfinity()) {
          var we = de.getX(), Se = we.umod(this.n);
          if (Se.cmpn(0) !== 0) {
            var ke = be.invm(this.n).mul(Se.mul(P.getPrivate()).iadd(I));
            if (ke = ke.umod(this.n), ke.cmpn(0) !== 0) {
              var he = (de.getY().isOdd() ? 1 : 0) | (we.cmp(Se) !== 0 ? 2 : 0);
              return X.canonical && ke.cmp(this.nh) > 0 && (ke = this.n.sub(ke), he ^= 1), new M({ r: Se, s: ke, recoveryParam: he });
            }
          }
        }
      }
    }
  }, D.prototype.verify = function(I, P, Y, X) {
    I = this._truncateToN(new $(I, 16)), Y = this.keyFromPublic(Y, X), P = new M(P, "hex");
    var ee = P.r, re = P.s;
    if (ee.cmpn(1) < 0 || ee.cmp(this.n) >= 0 || re.cmpn(1) < 0 || re.cmp(this.n) >= 0)
      return !1;
    var ie = re.invm(this.n), ne = ie.mul(I).umod(this.n), se = ie.mul(ee).umod(this.n), oe;
    return this.curve._maxwellTrick ? (oe = this.g.jmulAdd(ne, Y.getPublic(), se), oe.isInfinity() ? !1 : oe.eqXToP(ee)) : (oe = this.g.mulAdd(ne, Y.getPublic(), se), oe.isInfinity() ? !1 : oe.getX().umod(this.n).cmp(ee) === 0);
  }, D.prototype.recoverPubKey = function(I, P, Y, X) {
    t((3 & Y) === Y, "The recovery param is more than two bits"), P = new M(P, X);
    var ee = this.n, re = new $(I), ie = P.r, ne = P.s, se = Y & 1, oe = Y >> 1;
    if (ie.cmp(this.curve.p.umod(this.curve.n)) >= 0 && oe)
      throw new Error("Unable to find sencond key candinate");
    oe ? ie = this.curve.pointFromX(ie.add(this.curve.n), se) : ie = this.curve.pointFromX(ie, se);
    var be = P.r.invm(ee), de = ee.sub(re).mul(be).umod(ee), we = ne.mul(be).umod(ee);
    return this.g.mulAdd(de, ie, we);
  }, D.prototype.getKeyRecoveryParam = function(I, P, Y, X) {
    if (P = new M(P, X), P.recoveryParam !== null)
      return P.recoveryParam;
    for (var ee = 0; ee < 4; ee++) {
      var re;
      try {
        re = this.recoverPubKey(I, P, ee);
      } catch {
        continue;
      }
      if (re.eq(Y))
        return ee;
    }
    throw new Error("Unable to find valid recovery factor");
  }, ec;
}
var key, hasRequiredKey;
function requireKey() {
  if (hasRequiredKey)
    return key;
  hasRequiredKey = 1;
  var $ = requireUtils$1(), h = $.assert, U = $.parseBytes, B = $.cachedProperty;
  function V(t, O) {
    this.eddsa = t, this._secret = U(O.secret), t.isPoint(O.pub) ? this._pub = O.pub : this._pubBytes = U(O.pub);
  }
  return V.fromPublic = function(t, O) {
    return O instanceof V ? O : new V(t, { pub: O });
  }, V.fromSecret = function(t, O) {
    return O instanceof V ? O : new V(t, { secret: O });
  }, V.prototype.secret = function() {
    return this._secret;
  }, B(V, "pubBytes", function() {
    return this.eddsa.encodePoint(this.pub());
  }), B(V, "pub", function() {
    return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
  }), B(V, "privBytes", function() {
    var t = this.eddsa, O = this.hash(), M = t.encodingLength - 1, D = O.slice(0, t.encodingLength);
    return D[0] &= 248, D[M] &= 127, D[M] |= 64, D;
  }), B(V, "priv", function() {
    return this.eddsa.decodeInt(this.privBytes());
  }), B(V, "hash", function() {
    return this.eddsa.hash().update(this.secret()).digest();
  }), B(V, "messagePrefix", function() {
    return this.hash().slice(this.eddsa.encodingLength);
  }), V.prototype.sign = function(t) {
    return h(this._secret, "KeyPair can only verify"), this.eddsa.sign(t, this);
  }, V.prototype.verify = function(t, O) {
    return this.eddsa.verify(t, O, this);
  }, V.prototype.getSecret = function(t) {
    return h(this._secret, "KeyPair is public only"), $.encode(this.secret(), t);
  }, V.prototype.getPublic = function(t) {
    return $.encode(this.pubBytes(), t);
  }, key = V, key;
}
var signature, hasRequiredSignature;
function requireSignature() {
  if (hasRequiredSignature)
    return signature;
  hasRequiredSignature = 1;
  var $ = requireBn$2(), h = requireUtils$1(), U = h.assert, B = h.cachedProperty, V = h.parseBytes;
  function t(O, M) {
    this.eddsa = O, typeof M != "object" && (M = V(M)), Array.isArray(M) && (M = {
      R: M.slice(0, O.encodingLength),
      S: M.slice(O.encodingLength)
    }), U(M.R && M.S, "Signature without R or S"), O.isPoint(M.R) && (this._R = M.R), M.S instanceof $ && (this._S = M.S), this._Rencoded = Array.isArray(M.R) ? M.R : M.Rencoded, this._Sencoded = Array.isArray(M.S) ? M.S : M.Sencoded;
  }
  return B(t, "S", function() {
    return this.eddsa.decodeInt(this.Sencoded());
  }), B(t, "R", function() {
    return this.eddsa.decodePoint(this.Rencoded());
  }), B(t, "Rencoded", function() {
    return this.eddsa.encodePoint(this.R());
  }), B(t, "Sencoded", function() {
    return this.eddsa.encodeInt(this.S());
  }), t.prototype.toBytes = function() {
    return this.Rencoded().concat(this.Sencoded());
  }, t.prototype.toHex = function() {
    return h.encode(this.toBytes(), "hex").toUpperCase();
  }, signature = t, signature;
}
var eddsa, hasRequiredEddsa;
function requireEddsa() {
  if (hasRequiredEddsa)
    return eddsa;
  hasRequiredEddsa = 1;
  var $ = requireHash(), h = requireCurves(), U = requireUtils$1(), B = U.assert, V = U.parseBytes, t = requireKey(), O = requireSignature();
  function M(D) {
    if (B(D === "ed25519", "only tested with ed25519 so far"), !(this instanceof M))
      return new M(D);
    D = h[D].curve, this.curve = D, this.g = D.g, this.g.precompute(D.n.bitLength() + 1), this.pointClass = D.point().constructor, this.encodingLength = Math.ceil(D.n.bitLength() / 8), this.hash = $.sha512;
  }
  return eddsa = M, M.prototype.sign = function(D, I) {
    D = V(D);
    var P = this.keyFromSecret(I), Y = this.hashInt(P.messagePrefix(), D), X = this.g.mul(Y), ee = this.encodePoint(X), re = this.hashInt(ee, P.pubBytes(), D).mul(P.priv()), ie = Y.add(re).umod(this.curve.n);
    return this.makeSignature({ R: X, S: ie, Rencoded: ee });
  }, M.prototype.verify = function(D, I, P) {
    D = V(D), I = this.makeSignature(I);
    var Y = this.keyFromPublic(P), X = this.hashInt(I.Rencoded(), Y.pubBytes(), D), ee = this.g.mul(I.S()), re = I.R().add(Y.pub().mul(X));
    return re.eq(ee);
  }, M.prototype.hashInt = function() {
    for (var D = this.hash(), I = 0; I < arguments.length; I++)
      D.update(arguments[I]);
    return U.intFromLE(D.digest()).umod(this.curve.n);
  }, M.prototype.keyFromPublic = function(D) {
    return t.fromPublic(this, D);
  }, M.prototype.keyFromSecret = function(D) {
    return t.fromSecret(this, D);
  }, M.prototype.makeSignature = function(D) {
    return D instanceof O ? D : new O(this, D);
  }, M.prototype.encodePoint = function(D) {
    var I = D.getY().toArray("le", this.encodingLength);
    return I[this.encodingLength - 1] |= D.getX().isOdd() ? 128 : 0, I;
  }, M.prototype.decodePoint = function(D) {
    D = U.parseBytes(D);
    var I = D.length - 1, P = D.slice(0, I).concat(D[I] & -129), Y = (D[I] & 128) !== 0, X = U.intFromLE(P);
    return this.curve.pointFromY(X, Y);
  }, M.prototype.encodeInt = function(D) {
    return D.toArray("le", this.encodingLength);
  }, M.prototype.decodeInt = function(D) {
    return U.intFromLE(D);
  }, M.prototype.isPoint = function(D) {
    return D instanceof this.pointClass;
  }, eddsa;
}
var hasRequiredElliptic;
function requireElliptic() {
  return hasRequiredElliptic || (hasRequiredElliptic = 1, function($) {
    var h = $;
    h.version = require$$0.version, h.utils = requireUtils$1(), h.rand = requireBrorand(), h.curve = requireCurve(), h.curves = requireCurves(), h.ec = requireEc(), h.eddsa = requireEddsa();
  }(elliptic)), elliptic;
}
var bn = { exports: {} }, hasRequiredBn;
function requireBn() {
  return hasRequiredBn || (hasRequiredBn = 1, function($) {
    (function(h, U) {
      function B(e, o) {
        if (!e)
          throw new Error(o || "Assertion failed");
      }
      function V(e, o) {
        e.super_ = o;
        var g = function() {
        };
        g.prototype = o.prototype, e.prototype = new g(), e.prototype.constructor = e;
      }
      function t(e, o, g) {
        if (t.isBN(e))
          return e;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, e !== null && ((o === "le" || o === "be") && (g = o, o = 10), this._init(e || 0, o || 10, g || "be"));
      }
      typeof h == "object" ? h.exports = t : U.BN = t, t.BN = t, t.wordSize = 26;
      var O;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? O = window.Buffer : O = requireBuffer$1().Buffer;
      } catch {
      }
      t.isBN = function(e) {
        return e instanceof t ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === t.wordSize && Array.isArray(e.words);
      }, t.max = function(e, o) {
        return e.cmp(o) > 0 ? e : o;
      }, t.min = function(e, o) {
        return e.cmp(o) < 0 ? e : o;
      }, t.prototype._init = function(e, o, g) {
        if (typeof e == "number")
          return this._initNumber(e, o, g);
        if (typeof e == "object")
          return this._initArray(e, o, g);
        o === "hex" && (o = 16), B(o === (o | 0) && o >= 2 && o <= 36), e = e.toString().replace(/\s+/g, "");
        var H = 0;
        e[0] === "-" && (H++, this.negative = 1), H < e.length && (o === 16 ? this._parseHex(e, H, g) : (this._parseBase(e, o, H), g === "le" && this._initArray(this.toArray(), o, g)));
      }, t.prototype._initNumber = function(e, o, g) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (B(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), g === "le" && this._initArray(this.toArray(), o, g);
      }, t.prototype._initArray = function(e, o, g) {
        if (B(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var F, A, q = 0;
        if (g === "be")
          for (H = e.length - 1, F = 0; H >= 0; H -= 3)
            A = e[H] | e[H - 1] << 8 | e[H - 2] << 16, this.words[F] |= A << q & 67108863, this.words[F + 1] = A >>> 26 - q & 67108863, q += 24, q >= 26 && (q -= 26, F++);
        else if (g === "le")
          for (H = 0, F = 0; H < e.length; H += 3)
            A = e[H] | e[H + 1] << 8 | e[H + 2] << 16, this.words[F] |= A << q & 67108863, this.words[F + 1] = A >>> 26 - q & 67108863, q += 24, q >= 26 && (q -= 26, F++);
        return this._strip();
      };
      function M(e, o) {
        var g = e.charCodeAt(o);
        if (g >= 48 && g <= 57)
          return g - 48;
        if (g >= 65 && g <= 70)
          return g - 55;
        if (g >= 97 && g <= 102)
          return g - 87;
        B(!1, "Invalid character in " + e);
      }
      function D(e, o, g) {
        var H = M(e, g);
        return g - 1 >= o && (H |= M(e, g - 1) << 4), H;
      }
      t.prototype._parseHex = function(e, o, g) {
        this.length = Math.ceil((e.length - o) / 6), this.words = new Array(this.length);
        for (var H = 0; H < this.length; H++)
          this.words[H] = 0;
        var F = 0, A = 0, q;
        if (g === "be")
          for (H = e.length - 1; H >= o; H -= 2)
            q = D(e, o, H) << F, this.words[A] |= q & 67108863, F >= 18 ? (F -= 18, A += 1, this.words[A] |= q >>> 26) : F += 8;
        else {
          var z = e.length - o;
          for (H = z % 2 === 0 ? o + 1 : o; H < e.length; H += 2)
            q = D(e, o, H) << F, this.words[A] |= q & 67108863, F >= 18 ? (F -= 18, A += 1, this.words[A] |= q >>> 26) : F += 8;
        }
        this._strip();
      };
      function I(e, o, g, H) {
        for (var F = 0, A = 0, q = Math.min(e.length, g), z = o; z < q; z++) {
          var S = e.charCodeAt(z) - 48;
          F *= H, S >= 49 ? A = S - 49 + 10 : S >= 17 ? A = S - 17 + 10 : A = S, B(S >= 0 && A < H, "Invalid character"), F += A;
        }
        return F;
      }
      t.prototype._parseBase = function(e, o, g) {
        this.words = [0], this.length = 1;
        for (var H = 0, F = 1; F <= 67108863; F *= o)
          H++;
        H--, F = F / o | 0;
        for (var A = e.length - g, q = A % H, z = Math.min(A, A - q) + g, S = 0, J = g; J < z; J += H)
          S = I(e, J, J + H, o), this.imuln(F), this.words[0] + S < 67108864 ? this.words[0] += S : this._iaddn(S);
        if (q !== 0) {
          var ce = 1;
          for (S = I(e, J, e.length, o), J = 0; J < q; J++)
            ce *= o;
          this.imuln(ce), this.words[0] + S < 67108864 ? this.words[0] += S : this._iaddn(S);
        }
        this._strip();
      }, t.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          e.words[o] = this.words[o];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function P(e, o) {
        e.words = o.words, e.length = o.length, e.negative = o.negative, e.red = o.red;
      }
      if (t.prototype._move = function(e) {
        P(e, this);
      }, t.prototype.clone = function() {
        var e = new t(null);
        return this.copy(e), e;
      }, t.prototype._expand = function(e) {
        for (; this.length < e; )
          this.words[this.length++] = 0;
        return this;
      }, t.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, t.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          t.prototype[Symbol.for("nodejs.util.inspect.custom")] = Y;
        } catch {
          t.prototype.inspect = Y;
        }
      else
        t.prototype.inspect = Y;
      function Y() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var X = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], ee = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], re = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      t.prototype.toString = function(e, o) {
        e = e || 10, o = o | 0 || 1;
        var g;
        if (e === 16 || e === "hex") {
          g = "";
          for (var H = 0, F = 0, A = 0; A < this.length; A++) {
            var q = this.words[A], z = ((q << H | F) & 16777215).toString(16);
            F = q >>> 24 - H & 16777215, H += 2, H >= 26 && (H -= 26, A--), F !== 0 || A !== this.length - 1 ? g = X[6 - z.length] + z + g : g = z + g;
          }
          for (F !== 0 && (g = F.toString(16) + g); g.length % o !== 0; )
            g = "0" + g;
          return this.negative !== 0 && (g = "-" + g), g;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var S = ee[e], J = re[e];
          g = "";
          var ce = this.clone();
          for (ce.negative = 0; !ce.isZero(); ) {
            var ye = ce.modrn(J).toString(e);
            ce = ce.idivn(J), ce.isZero() ? g = ye + g : g = X[S - ye.length] + ye + g;
          }
          for (this.isZero() && (g = "0" + g); g.length % o !== 0; )
            g = "0" + g;
          return this.negative !== 0 && (g = "-" + g), g;
        }
        B(!1, "Base should be between 2 and 36");
      }, t.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && B(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, t.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, O && (t.prototype.toBuffer = function(e, o) {
        return this.toArrayLike(O, e, o);
      }), t.prototype.toArray = function(e, o) {
        return this.toArrayLike(Array, e, o);
      };
      var ie = function(e, o) {
        return e.allocUnsafe ? e.allocUnsafe(o) : new e(o);
      };
      t.prototype.toArrayLike = function(e, o, g) {
        this._strip();
        var H = this.byteLength(), F = g || Math.max(1, H);
        B(H <= F, "byte array longer than desired length"), B(F > 0, "Requested array length <= 0");
        var A = ie(e, F), q = o === "le" ? "LE" : "BE";
        return this["_toArrayLike" + q](A, H), A;
      }, t.prototype._toArrayLikeLE = function(e, o) {
        for (var g = 0, H = 0, F = 0, A = 0; F < this.length; F++) {
          var q = this.words[F] << A | H;
          e[g++] = q & 255, g < e.length && (e[g++] = q >> 8 & 255), g < e.length && (e[g++] = q >> 16 & 255), A === 6 ? (g < e.length && (e[g++] = q >> 24 & 255), H = 0, A = 0) : (H = q >>> 24, A += 2);
        }
        if (g < e.length)
          for (e[g++] = H; g < e.length; )
            e[g++] = 0;
      }, t.prototype._toArrayLikeBE = function(e, o) {
        for (var g = e.length - 1, H = 0, F = 0, A = 0; F < this.length; F++) {
          var q = this.words[F] << A | H;
          e[g--] = q & 255, g >= 0 && (e[g--] = q >> 8 & 255), g >= 0 && (e[g--] = q >> 16 & 255), A === 6 ? (g >= 0 && (e[g--] = q >> 24 & 255), H = 0, A = 0) : (H = q >>> 24, A += 2);
        }
        if (g >= 0)
          for (e[g--] = H; g >= 0; )
            e[g--] = 0;
      }, Math.clz32 ? t.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : t.prototype._countBits = function(e) {
        var o = e, g = 0;
        return o >= 4096 && (g += 13, o >>>= 13), o >= 64 && (g += 7, o >>>= 7), o >= 8 && (g += 4, o >>>= 4), o >= 2 && (g += 2, o >>>= 2), g + o;
      }, t.prototype._zeroBits = function(e) {
        if (e === 0)
          return 26;
        var o = e, g = 0;
        return o & 8191 || (g += 13, o >>>= 13), o & 127 || (g += 7, o >>>= 7), o & 15 || (g += 4, o >>>= 4), o & 3 || (g += 2, o >>>= 2), o & 1 || g++, g;
      }, t.prototype.bitLength = function() {
        var e = this.words[this.length - 1], o = this._countBits(e);
        return (this.length - 1) * 26 + o;
      };
      function ne(e) {
        for (var o = new Array(e.bitLength()), g = 0; g < o.length; g++) {
          var H = g / 26 | 0, F = g % 26;
          o[g] = e.words[H] >>> F & 1;
        }
        return o;
      }
      t.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var e = 0, o = 0; o < this.length; o++) {
          var g = this._zeroBits(this.words[o]);
          if (e += g, g !== 26)
            break;
        }
        return e;
      }, t.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, t.prototype.toTwos = function(e) {
        return this.negative !== 0 ? this.abs().inotn(e).iaddn(1) : this.clone();
      }, t.prototype.fromTwos = function(e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      }, t.prototype.isNeg = function() {
        return this.negative !== 0;
      }, t.prototype.neg = function() {
        return this.clone().ineg();
      }, t.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, t.prototype.iuor = function(e) {
        for (; this.length < e.length; )
          this.words[this.length++] = 0;
        for (var o = 0; o < e.length; o++)
          this.words[o] = this.words[o] | e.words[o];
        return this._strip();
      }, t.prototype.ior = function(e) {
        return B((this.negative | e.negative) === 0), this.iuor(e);
      }, t.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, t.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, t.prototype.iuand = function(e) {
        var o;
        this.length > e.length ? o = e : o = this;
        for (var g = 0; g < o.length; g++)
          this.words[g] = this.words[g] & e.words[g];
        return this.length = o.length, this._strip();
      }, t.prototype.iand = function(e) {
        return B((this.negative | e.negative) === 0), this.iuand(e);
      }, t.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, t.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, t.prototype.iuxor = function(e) {
        var o, g;
        this.length > e.length ? (o = this, g = e) : (o = e, g = this);
        for (var H = 0; H < g.length; H++)
          this.words[H] = o.words[H] ^ g.words[H];
        if (this !== o)
          for (; H < o.length; H++)
            this.words[H] = o.words[H];
        return this.length = o.length, this._strip();
      }, t.prototype.ixor = function(e) {
        return B((this.negative | e.negative) === 0), this.iuxor(e);
      }, t.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, t.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, t.prototype.inotn = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = Math.ceil(e / 26) | 0, g = e % 26;
        this._expand(o), g > 0 && o--;
        for (var H = 0; H < o; H++)
          this.words[H] = ~this.words[H] & 67108863;
        return g > 0 && (this.words[H] = ~this.words[H] & 67108863 >> 26 - g), this._strip();
      }, t.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, t.prototype.setn = function(e, o) {
        B(typeof e == "number" && e >= 0);
        var g = e / 26 | 0, H = e % 26;
        return this._expand(g + 1), o ? this.words[g] = this.words[g] | 1 << H : this.words[g] = this.words[g] & ~(1 << H), this._strip();
      }, t.prototype.iadd = function(e) {
        var o;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, o = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, o = this.isub(e), e.negative = 1, o._normSign();
        var g, H;
        this.length > e.length ? (g = this, H = e) : (g = e, H = this);
        for (var F = 0, A = 0; A < H.length; A++)
          o = (g.words[A] | 0) + (H.words[A] | 0) + F, this.words[A] = o & 67108863, F = o >>> 26;
        for (; F !== 0 && A < g.length; A++)
          o = (g.words[A] | 0) + F, this.words[A] = o & 67108863, F = o >>> 26;
        if (this.length = g.length, F !== 0)
          this.words[this.length] = F, this.length++;
        else if (g !== this)
          for (; A < g.length; A++)
            this.words[A] = g.words[A];
        return this;
      }, t.prototype.add = function(e) {
        var o;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, o = this.sub(e), e.negative ^= 1, o) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, o = e.sub(this), this.negative = 1, o) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, t.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var o = this.iadd(e);
          return e.negative = 1, o._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var g = this.cmp(e);
        if (g === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var H, F;
        g > 0 ? (H = this, F = e) : (H = e, F = this);
        for (var A = 0, q = 0; q < F.length; q++)
          o = (H.words[q] | 0) - (F.words[q] | 0) + A, A = o >> 26, this.words[q] = o & 67108863;
        for (; A !== 0 && q < H.length; q++)
          o = (H.words[q] | 0) + A, A = o >> 26, this.words[q] = o & 67108863;
        if (A === 0 && q < H.length && H !== this)
          for (; q < H.length; q++)
            this.words[q] = H.words[q];
        return this.length = Math.max(this.length, q), H !== this && (this.negative = 1), this._strip();
      }, t.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function se(e, o, g) {
        g.negative = o.negative ^ e.negative;
        var H = e.length + o.length | 0;
        g.length = H, H = H - 1 | 0;
        var F = e.words[0] | 0, A = o.words[0] | 0, q = F * A, z = q & 67108863, S = q / 67108864 | 0;
        g.words[0] = z;
        for (var J = 1; J < H; J++) {
          for (var ce = S >>> 26, ye = S & 67108863, Me = Math.min(J, o.length - 1), me = Math.max(0, J - e.length + 1); me <= Me; me++) {
            var ue = J - me | 0;
            F = e.words[ue] | 0, A = o.words[me] | 0, q = F * A + ye, ce += q / 67108864 | 0, ye = q & 67108863;
          }
          g.words[J] = ye | 0, S = ce | 0;
        }
        return S !== 0 ? g.words[J] = S | 0 : g.length--, g._strip();
      }
      var oe = function(e, o, g) {
        var H = e.words, F = o.words, A = g.words, q = 0, z, S, J, ce = H[0] | 0, ye = ce & 8191, Me = ce >>> 13, me = H[1] | 0, ue = me & 8191, fe = me >>> 13, Ae = H[2] | 0, Be = Ae & 8191, pe = Ae >>> 13, ge = H[3] | 0, Ee = ge & 8191, Ie = ge >>> 13, Pe = H[4] | 0, Q = Pe & 8191, K = Pe >>> 13, te = H[5] | 0, ae = te & 8191, ve = te >>> 13, qe = H[6] | 0, Re = qe & 8191, xe = qe >>> 13, Le = H[7] | 0, Te = Le & 8191, $e = Le >>> 13, Ce = H[8] | 0, Ve = Ce & 8191, je = Ce >>> 13, at = H[9] | 0, Qe = at & 8191, Ue = at >>> 13, ut = F[0] | 0, Ye = ut & 8191, Oe = ut >>> 13, ft = F[1] | 0, Ze = ft & 8191, Ne = ft >>> 13, ht = F[2] | 0, et = ht & 8191, De = ht >>> 13, ct = F[3] | 0, tt = ct & 8191, Fe = ct >>> 13, dt = F[4] | 0, rt = dt & 8191, We = dt >>> 13, lt = F[5] | 0, it = lt & 8191, ze = lt >>> 13, pt = F[6] | 0, nt = pt & 8191, He = pt >>> 13, bt = F[7] | 0, ot = bt & 8191, Ge = bt >>> 13, mt = F[8] | 0, st = mt & 8191, Ke = mt >>> 13, yt = F[9] | 0, Xe = yt & 8191, Je = yt >>> 13;
        g.negative = e.negative ^ o.negative, g.length = 19, z = Math.imul(ye, Ye), S = Math.imul(ye, Oe), S = S + Math.imul(Me, Ye) | 0, J = Math.imul(Me, Oe);
        var gt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (gt >>> 26) | 0, gt &= 67108863, z = Math.imul(ue, Ye), S = Math.imul(ue, Oe), S = S + Math.imul(fe, Ye) | 0, J = Math.imul(fe, Oe), z = z + Math.imul(ye, Ze) | 0, S = S + Math.imul(ye, Ne) | 0, S = S + Math.imul(Me, Ze) | 0, J = J + Math.imul(Me, Ne) | 0;
        var vt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (vt >>> 26) | 0, vt &= 67108863, z = Math.imul(Be, Ye), S = Math.imul(Be, Oe), S = S + Math.imul(pe, Ye) | 0, J = Math.imul(pe, Oe), z = z + Math.imul(ue, Ze) | 0, S = S + Math.imul(ue, Ne) | 0, S = S + Math.imul(fe, Ze) | 0, J = J + Math.imul(fe, Ne) | 0, z = z + Math.imul(ye, et) | 0, S = S + Math.imul(ye, De) | 0, S = S + Math.imul(Me, et) | 0, J = J + Math.imul(Me, De) | 0;
        var wt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (wt >>> 26) | 0, wt &= 67108863, z = Math.imul(Ee, Ye), S = Math.imul(Ee, Oe), S = S + Math.imul(Ie, Ye) | 0, J = Math.imul(Ie, Oe), z = z + Math.imul(Be, Ze) | 0, S = S + Math.imul(Be, Ne) | 0, S = S + Math.imul(pe, Ze) | 0, J = J + Math.imul(pe, Ne) | 0, z = z + Math.imul(ue, et) | 0, S = S + Math.imul(ue, De) | 0, S = S + Math.imul(fe, et) | 0, J = J + Math.imul(fe, De) | 0, z = z + Math.imul(ye, tt) | 0, S = S + Math.imul(ye, Fe) | 0, S = S + Math.imul(Me, tt) | 0, J = J + Math.imul(Me, Fe) | 0;
        var _t = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (_t >>> 26) | 0, _t &= 67108863, z = Math.imul(Q, Ye), S = Math.imul(Q, Oe), S = S + Math.imul(K, Ye) | 0, J = Math.imul(K, Oe), z = z + Math.imul(Ee, Ze) | 0, S = S + Math.imul(Ee, Ne) | 0, S = S + Math.imul(Ie, Ze) | 0, J = J + Math.imul(Ie, Ne) | 0, z = z + Math.imul(Be, et) | 0, S = S + Math.imul(Be, De) | 0, S = S + Math.imul(pe, et) | 0, J = J + Math.imul(pe, De) | 0, z = z + Math.imul(ue, tt) | 0, S = S + Math.imul(ue, Fe) | 0, S = S + Math.imul(fe, tt) | 0, J = J + Math.imul(fe, Fe) | 0, z = z + Math.imul(ye, rt) | 0, S = S + Math.imul(ye, We) | 0, S = S + Math.imul(Me, rt) | 0, J = J + Math.imul(Me, We) | 0;
        var Mt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Mt >>> 26) | 0, Mt &= 67108863, z = Math.imul(ae, Ye), S = Math.imul(ae, Oe), S = S + Math.imul(ve, Ye) | 0, J = Math.imul(ve, Oe), z = z + Math.imul(Q, Ze) | 0, S = S + Math.imul(Q, Ne) | 0, S = S + Math.imul(K, Ze) | 0, J = J + Math.imul(K, Ne) | 0, z = z + Math.imul(Ee, et) | 0, S = S + Math.imul(Ee, De) | 0, S = S + Math.imul(Ie, et) | 0, J = J + Math.imul(Ie, De) | 0, z = z + Math.imul(Be, tt) | 0, S = S + Math.imul(Be, Fe) | 0, S = S + Math.imul(pe, tt) | 0, J = J + Math.imul(pe, Fe) | 0, z = z + Math.imul(ue, rt) | 0, S = S + Math.imul(ue, We) | 0, S = S + Math.imul(fe, rt) | 0, J = J + Math.imul(fe, We) | 0, z = z + Math.imul(ye, it) | 0, S = S + Math.imul(ye, ze) | 0, S = S + Math.imul(Me, it) | 0, J = J + Math.imul(Me, ze) | 0;
        var St = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (St >>> 26) | 0, St &= 67108863, z = Math.imul(Re, Ye), S = Math.imul(Re, Oe), S = S + Math.imul(xe, Ye) | 0, J = Math.imul(xe, Oe), z = z + Math.imul(ae, Ze) | 0, S = S + Math.imul(ae, Ne) | 0, S = S + Math.imul(ve, Ze) | 0, J = J + Math.imul(ve, Ne) | 0, z = z + Math.imul(Q, et) | 0, S = S + Math.imul(Q, De) | 0, S = S + Math.imul(K, et) | 0, J = J + Math.imul(K, De) | 0, z = z + Math.imul(Ee, tt) | 0, S = S + Math.imul(Ee, Fe) | 0, S = S + Math.imul(Ie, tt) | 0, J = J + Math.imul(Ie, Fe) | 0, z = z + Math.imul(Be, rt) | 0, S = S + Math.imul(Be, We) | 0, S = S + Math.imul(pe, rt) | 0, J = J + Math.imul(pe, We) | 0, z = z + Math.imul(ue, it) | 0, S = S + Math.imul(ue, ze) | 0, S = S + Math.imul(fe, it) | 0, J = J + Math.imul(fe, ze) | 0, z = z + Math.imul(ye, nt) | 0, S = S + Math.imul(ye, He) | 0, S = S + Math.imul(Me, nt) | 0, J = J + Math.imul(Me, He) | 0;
        var qt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (qt >>> 26) | 0, qt &= 67108863, z = Math.imul(Te, Ye), S = Math.imul(Te, Oe), S = S + Math.imul($e, Ye) | 0, J = Math.imul($e, Oe), z = z + Math.imul(Re, Ze) | 0, S = S + Math.imul(Re, Ne) | 0, S = S + Math.imul(xe, Ze) | 0, J = J + Math.imul(xe, Ne) | 0, z = z + Math.imul(ae, et) | 0, S = S + Math.imul(ae, De) | 0, S = S + Math.imul(ve, et) | 0, J = J + Math.imul(ve, De) | 0, z = z + Math.imul(Q, tt) | 0, S = S + Math.imul(Q, Fe) | 0, S = S + Math.imul(K, tt) | 0, J = J + Math.imul(K, Fe) | 0, z = z + Math.imul(Ee, rt) | 0, S = S + Math.imul(Ee, We) | 0, S = S + Math.imul(Ie, rt) | 0, J = J + Math.imul(Ie, We) | 0, z = z + Math.imul(Be, it) | 0, S = S + Math.imul(Be, ze) | 0, S = S + Math.imul(pe, it) | 0, J = J + Math.imul(pe, ze) | 0, z = z + Math.imul(ue, nt) | 0, S = S + Math.imul(ue, He) | 0, S = S + Math.imul(fe, nt) | 0, J = J + Math.imul(fe, He) | 0, z = z + Math.imul(ye, ot) | 0, S = S + Math.imul(ye, Ge) | 0, S = S + Math.imul(Me, ot) | 0, J = J + Math.imul(Me, Ge) | 0;
        var At = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (At >>> 26) | 0, At &= 67108863, z = Math.imul(Ve, Ye), S = Math.imul(Ve, Oe), S = S + Math.imul(je, Ye) | 0, J = Math.imul(je, Oe), z = z + Math.imul(Te, Ze) | 0, S = S + Math.imul(Te, Ne) | 0, S = S + Math.imul($e, Ze) | 0, J = J + Math.imul($e, Ne) | 0, z = z + Math.imul(Re, et) | 0, S = S + Math.imul(Re, De) | 0, S = S + Math.imul(xe, et) | 0, J = J + Math.imul(xe, De) | 0, z = z + Math.imul(ae, tt) | 0, S = S + Math.imul(ae, Fe) | 0, S = S + Math.imul(ve, tt) | 0, J = J + Math.imul(ve, Fe) | 0, z = z + Math.imul(Q, rt) | 0, S = S + Math.imul(Q, We) | 0, S = S + Math.imul(K, rt) | 0, J = J + Math.imul(K, We) | 0, z = z + Math.imul(Ee, it) | 0, S = S + Math.imul(Ee, ze) | 0, S = S + Math.imul(Ie, it) | 0, J = J + Math.imul(Ie, ze) | 0, z = z + Math.imul(Be, nt) | 0, S = S + Math.imul(Be, He) | 0, S = S + Math.imul(pe, nt) | 0, J = J + Math.imul(pe, He) | 0, z = z + Math.imul(ue, ot) | 0, S = S + Math.imul(ue, Ge) | 0, S = S + Math.imul(fe, ot) | 0, J = J + Math.imul(fe, Ge) | 0, z = z + Math.imul(ye, st) | 0, S = S + Math.imul(ye, Ke) | 0, S = S + Math.imul(Me, st) | 0, J = J + Math.imul(Me, Ke) | 0;
        var Bt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Bt >>> 26) | 0, Bt &= 67108863, z = Math.imul(Qe, Ye), S = Math.imul(Qe, Oe), S = S + Math.imul(Ue, Ye) | 0, J = Math.imul(Ue, Oe), z = z + Math.imul(Ve, Ze) | 0, S = S + Math.imul(Ve, Ne) | 0, S = S + Math.imul(je, Ze) | 0, J = J + Math.imul(je, Ne) | 0, z = z + Math.imul(Te, et) | 0, S = S + Math.imul(Te, De) | 0, S = S + Math.imul($e, et) | 0, J = J + Math.imul($e, De) | 0, z = z + Math.imul(Re, tt) | 0, S = S + Math.imul(Re, Fe) | 0, S = S + Math.imul(xe, tt) | 0, J = J + Math.imul(xe, Fe) | 0, z = z + Math.imul(ae, rt) | 0, S = S + Math.imul(ae, We) | 0, S = S + Math.imul(ve, rt) | 0, J = J + Math.imul(ve, We) | 0, z = z + Math.imul(Q, it) | 0, S = S + Math.imul(Q, ze) | 0, S = S + Math.imul(K, it) | 0, J = J + Math.imul(K, ze) | 0, z = z + Math.imul(Ee, nt) | 0, S = S + Math.imul(Ee, He) | 0, S = S + Math.imul(Ie, nt) | 0, J = J + Math.imul(Ie, He) | 0, z = z + Math.imul(Be, ot) | 0, S = S + Math.imul(Be, Ge) | 0, S = S + Math.imul(pe, ot) | 0, J = J + Math.imul(pe, Ge) | 0, z = z + Math.imul(ue, st) | 0, S = S + Math.imul(ue, Ke) | 0, S = S + Math.imul(fe, st) | 0, J = J + Math.imul(fe, Ke) | 0, z = z + Math.imul(ye, Xe) | 0, S = S + Math.imul(ye, Je) | 0, S = S + Math.imul(Me, Xe) | 0, J = J + Math.imul(Me, Je) | 0;
        var Et = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Et >>> 26) | 0, Et &= 67108863, z = Math.imul(Qe, Ze), S = Math.imul(Qe, Ne), S = S + Math.imul(Ue, Ze) | 0, J = Math.imul(Ue, Ne), z = z + Math.imul(Ve, et) | 0, S = S + Math.imul(Ve, De) | 0, S = S + Math.imul(je, et) | 0, J = J + Math.imul(je, De) | 0, z = z + Math.imul(Te, tt) | 0, S = S + Math.imul(Te, Fe) | 0, S = S + Math.imul($e, tt) | 0, J = J + Math.imul($e, Fe) | 0, z = z + Math.imul(Re, rt) | 0, S = S + Math.imul(Re, We) | 0, S = S + Math.imul(xe, rt) | 0, J = J + Math.imul(xe, We) | 0, z = z + Math.imul(ae, it) | 0, S = S + Math.imul(ae, ze) | 0, S = S + Math.imul(ve, it) | 0, J = J + Math.imul(ve, ze) | 0, z = z + Math.imul(Q, nt) | 0, S = S + Math.imul(Q, He) | 0, S = S + Math.imul(K, nt) | 0, J = J + Math.imul(K, He) | 0, z = z + Math.imul(Ee, ot) | 0, S = S + Math.imul(Ee, Ge) | 0, S = S + Math.imul(Ie, ot) | 0, J = J + Math.imul(Ie, Ge) | 0, z = z + Math.imul(Be, st) | 0, S = S + Math.imul(Be, Ke) | 0, S = S + Math.imul(pe, st) | 0, J = J + Math.imul(pe, Ke) | 0, z = z + Math.imul(ue, Xe) | 0, S = S + Math.imul(ue, Je) | 0, S = S + Math.imul(fe, Xe) | 0, J = J + Math.imul(fe, Je) | 0;
        var Rt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Rt >>> 26) | 0, Rt &= 67108863, z = Math.imul(Qe, et), S = Math.imul(Qe, De), S = S + Math.imul(Ue, et) | 0, J = Math.imul(Ue, De), z = z + Math.imul(Ve, tt) | 0, S = S + Math.imul(Ve, Fe) | 0, S = S + Math.imul(je, tt) | 0, J = J + Math.imul(je, Fe) | 0, z = z + Math.imul(Te, rt) | 0, S = S + Math.imul(Te, We) | 0, S = S + Math.imul($e, rt) | 0, J = J + Math.imul($e, We) | 0, z = z + Math.imul(Re, it) | 0, S = S + Math.imul(Re, ze) | 0, S = S + Math.imul(xe, it) | 0, J = J + Math.imul(xe, ze) | 0, z = z + Math.imul(ae, nt) | 0, S = S + Math.imul(ae, He) | 0, S = S + Math.imul(ve, nt) | 0, J = J + Math.imul(ve, He) | 0, z = z + Math.imul(Q, ot) | 0, S = S + Math.imul(Q, Ge) | 0, S = S + Math.imul(K, ot) | 0, J = J + Math.imul(K, Ge) | 0, z = z + Math.imul(Ee, st) | 0, S = S + Math.imul(Ee, Ke) | 0, S = S + Math.imul(Ie, st) | 0, J = J + Math.imul(Ie, Ke) | 0, z = z + Math.imul(Be, Xe) | 0, S = S + Math.imul(Be, Je) | 0, S = S + Math.imul(pe, Xe) | 0, J = J + Math.imul(pe, Je) | 0;
        var kt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (kt >>> 26) | 0, kt &= 67108863, z = Math.imul(Qe, tt), S = Math.imul(Qe, Fe), S = S + Math.imul(Ue, tt) | 0, J = Math.imul(Ue, Fe), z = z + Math.imul(Ve, rt) | 0, S = S + Math.imul(Ve, We) | 0, S = S + Math.imul(je, rt) | 0, J = J + Math.imul(je, We) | 0, z = z + Math.imul(Te, it) | 0, S = S + Math.imul(Te, ze) | 0, S = S + Math.imul($e, it) | 0, J = J + Math.imul($e, ze) | 0, z = z + Math.imul(Re, nt) | 0, S = S + Math.imul(Re, He) | 0, S = S + Math.imul(xe, nt) | 0, J = J + Math.imul(xe, He) | 0, z = z + Math.imul(ae, ot) | 0, S = S + Math.imul(ae, Ge) | 0, S = S + Math.imul(ve, ot) | 0, J = J + Math.imul(ve, Ge) | 0, z = z + Math.imul(Q, st) | 0, S = S + Math.imul(Q, Ke) | 0, S = S + Math.imul(K, st) | 0, J = J + Math.imul(K, Ke) | 0, z = z + Math.imul(Ee, Xe) | 0, S = S + Math.imul(Ee, Je) | 0, S = S + Math.imul(Ie, Xe) | 0, J = J + Math.imul(Ie, Je) | 0;
        var It = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (It >>> 26) | 0, It &= 67108863, z = Math.imul(Qe, rt), S = Math.imul(Qe, We), S = S + Math.imul(Ue, rt) | 0, J = Math.imul(Ue, We), z = z + Math.imul(Ve, it) | 0, S = S + Math.imul(Ve, ze) | 0, S = S + Math.imul(je, it) | 0, J = J + Math.imul(je, ze) | 0, z = z + Math.imul(Te, nt) | 0, S = S + Math.imul(Te, He) | 0, S = S + Math.imul($e, nt) | 0, J = J + Math.imul($e, He) | 0, z = z + Math.imul(Re, ot) | 0, S = S + Math.imul(Re, Ge) | 0, S = S + Math.imul(xe, ot) | 0, J = J + Math.imul(xe, Ge) | 0, z = z + Math.imul(ae, st) | 0, S = S + Math.imul(ae, Ke) | 0, S = S + Math.imul(ve, st) | 0, J = J + Math.imul(ve, Ke) | 0, z = z + Math.imul(Q, Xe) | 0, S = S + Math.imul(Q, Je) | 0, S = S + Math.imul(K, Xe) | 0, J = J + Math.imul(K, Je) | 0;
        var xt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (xt >>> 26) | 0, xt &= 67108863, z = Math.imul(Qe, it), S = Math.imul(Qe, ze), S = S + Math.imul(Ue, it) | 0, J = Math.imul(Ue, ze), z = z + Math.imul(Ve, nt) | 0, S = S + Math.imul(Ve, He) | 0, S = S + Math.imul(je, nt) | 0, J = J + Math.imul(je, He) | 0, z = z + Math.imul(Te, ot) | 0, S = S + Math.imul(Te, Ge) | 0, S = S + Math.imul($e, ot) | 0, J = J + Math.imul($e, Ge) | 0, z = z + Math.imul(Re, st) | 0, S = S + Math.imul(Re, Ke) | 0, S = S + Math.imul(xe, st) | 0, J = J + Math.imul(xe, Ke) | 0, z = z + Math.imul(ae, Xe) | 0, S = S + Math.imul(ae, Je) | 0, S = S + Math.imul(ve, Xe) | 0, J = J + Math.imul(ve, Je) | 0;
        var $t = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + ($t >>> 26) | 0, $t &= 67108863, z = Math.imul(Qe, nt), S = Math.imul(Qe, He), S = S + Math.imul(Ue, nt) | 0, J = Math.imul(Ue, He), z = z + Math.imul(Ve, ot) | 0, S = S + Math.imul(Ve, Ge) | 0, S = S + Math.imul(je, ot) | 0, J = J + Math.imul(je, Ge) | 0, z = z + Math.imul(Te, st) | 0, S = S + Math.imul(Te, Ke) | 0, S = S + Math.imul($e, st) | 0, J = J + Math.imul($e, Ke) | 0, z = z + Math.imul(Re, Xe) | 0, S = S + Math.imul(Re, Je) | 0, S = S + Math.imul(xe, Xe) | 0, J = J + Math.imul(xe, Je) | 0;
        var Tt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Tt >>> 26) | 0, Tt &= 67108863, z = Math.imul(Qe, ot), S = Math.imul(Qe, Ge), S = S + Math.imul(Ue, ot) | 0, J = Math.imul(Ue, Ge), z = z + Math.imul(Ve, st) | 0, S = S + Math.imul(Ve, Ke) | 0, S = S + Math.imul(je, st) | 0, J = J + Math.imul(je, Ke) | 0, z = z + Math.imul(Te, Xe) | 0, S = S + Math.imul(Te, Je) | 0, S = S + Math.imul($e, Xe) | 0, J = J + Math.imul($e, Je) | 0;
        var Pt = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Pt >>> 26) | 0, Pt &= 67108863, z = Math.imul(Qe, st), S = Math.imul(Qe, Ke), S = S + Math.imul(Ue, st) | 0, J = Math.imul(Ue, Ke), z = z + Math.imul(Ve, Xe) | 0, S = S + Math.imul(Ve, Je) | 0, S = S + Math.imul(je, Xe) | 0, J = J + Math.imul(je, Je) | 0;
        var Ct = (q + z | 0) + ((S & 8191) << 13) | 0;
        q = (J + (S >>> 13) | 0) + (Ct >>> 26) | 0, Ct &= 67108863, z = Math.imul(Qe, Xe), S = Math.imul(Qe, Je), S = S + Math.imul(Ue, Xe) | 0, J = Math.imul(Ue, Je);
        var jt = (q + z | 0) + ((S & 8191) << 13) | 0;
        return q = (J + (S >>> 13) | 0) + (jt >>> 26) | 0, jt &= 67108863, A[0] = gt, A[1] = vt, A[2] = wt, A[3] = _t, A[4] = Mt, A[5] = St, A[6] = qt, A[7] = At, A[8] = Bt, A[9] = Et, A[10] = Rt, A[11] = kt, A[12] = It, A[13] = xt, A[14] = $t, A[15] = Tt, A[16] = Pt, A[17] = Ct, A[18] = jt, q !== 0 && (A[19] = q, g.length++), g;
      };
      Math.imul || (oe = se);
      function be(e, o, g) {
        g.negative = o.negative ^ e.negative, g.length = e.length + o.length;
        for (var H = 0, F = 0, A = 0; A < g.length - 1; A++) {
          var q = F;
          F = 0;
          for (var z = H & 67108863, S = Math.min(A, o.length - 1), J = Math.max(0, A - e.length + 1); J <= S; J++) {
            var ce = A - J, ye = e.words[ce] | 0, Me = o.words[J] | 0, me = ye * Me, ue = me & 67108863;
            q = q + (me / 67108864 | 0) | 0, ue = ue + z | 0, z = ue & 67108863, q = q + (ue >>> 26) | 0, F += q >>> 26, q &= 67108863;
          }
          g.words[A] = z, H = q, q = F;
        }
        return H !== 0 ? g.words[A] = H : g.length--, g._strip();
      }
      function de(e, o, g) {
        return be(e, o, g);
      }
      t.prototype.mulTo = function(e, o) {
        var g, H = this.length + e.length;
        return this.length === 10 && e.length === 10 ? g = oe(this, e, o) : H < 63 ? g = se(this, e, o) : H < 1024 ? g = be(this, e, o) : g = de(this, e, o), g;
      }, t.prototype.mul = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), this.mulTo(e, o);
      }, t.prototype.mulf = function(e) {
        var o = new t(null);
        return o.words = new Array(this.length + e.length), de(this, e, o);
      }, t.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, t.prototype.imuln = function(e) {
        var o = e < 0;
        o && (e = -e), B(typeof e == "number"), B(e < 67108864);
        for (var g = 0, H = 0; H < this.length; H++) {
          var F = (this.words[H] | 0) * e, A = (F & 67108863) + (g & 67108863);
          g >>= 26, g += F / 67108864 | 0, g += A >>> 26, this.words[H] = A & 67108863;
        }
        return g !== 0 && (this.words[H] = g, this.length++), o ? this.ineg() : this;
      }, t.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, t.prototype.sqr = function() {
        return this.mul(this);
      }, t.prototype.isqr = function() {
        return this.imul(this.clone());
      }, t.prototype.pow = function(e) {
        var o = ne(e);
        if (o.length === 0)
          return new t(1);
        for (var g = this, H = 0; H < o.length && o[H] === 0; H++, g = g.sqr())
          ;
        if (++H < o.length)
          for (var F = g.sqr(); H < o.length; H++, F = F.sqr())
            o[H] !== 0 && (g = g.mul(F));
        return g;
      }, t.prototype.iushln = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = e % 26, g = (e - o) / 26, H = 67108863 >>> 26 - o << 26 - o, F;
        if (o !== 0) {
          var A = 0;
          for (F = 0; F < this.length; F++) {
            var q = this.words[F] & H, z = (this.words[F] | 0) - q << o;
            this.words[F] = z | A, A = q >>> 26 - o;
          }
          A && (this.words[F] = A, this.length++);
        }
        if (g !== 0) {
          for (F = this.length - 1; F >= 0; F--)
            this.words[F + g] = this.words[F];
          for (F = 0; F < g; F++)
            this.words[F] = 0;
          this.length += g;
        }
        return this._strip();
      }, t.prototype.ishln = function(e) {
        return B(this.negative === 0), this.iushln(e);
      }, t.prototype.iushrn = function(e, o, g) {
        B(typeof e == "number" && e >= 0);
        var H;
        o ? H = (o - o % 26) / 26 : H = 0;
        var F = e % 26, A = Math.min((e - F) / 26, this.length), q = 67108863 ^ 67108863 >>> F << F, z = g;
        if (H -= A, H = Math.max(0, H), z) {
          for (var S = 0; S < A; S++)
            z.words[S] = this.words[S];
          z.length = A;
        }
        if (A !== 0)
          if (this.length > A)
            for (this.length -= A, S = 0; S < this.length; S++)
              this.words[S] = this.words[S + A];
          else
            this.words[0] = 0, this.length = 1;
        var J = 0;
        for (S = this.length - 1; S >= 0 && (J !== 0 || S >= H); S--) {
          var ce = this.words[S] | 0;
          this.words[S] = J << 26 - F | ce >>> F, J = ce & q;
        }
        return z && J !== 0 && (z.words[z.length++] = J), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, t.prototype.ishrn = function(e, o, g) {
        return B(this.negative === 0), this.iushrn(e, o, g);
      }, t.prototype.shln = function(e) {
        return this.clone().ishln(e);
      }, t.prototype.ushln = function(e) {
        return this.clone().iushln(e);
      }, t.prototype.shrn = function(e) {
        return this.clone().ishrn(e);
      }, t.prototype.ushrn = function(e) {
        return this.clone().iushrn(e);
      }, t.prototype.testn = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = e % 26, g = (e - o) / 26, H = 1 << o;
        if (this.length <= g)
          return !1;
        var F = this.words[g];
        return !!(F & H);
      }, t.prototype.imaskn = function(e) {
        B(typeof e == "number" && e >= 0);
        var o = e % 26, g = (e - o) / 26;
        if (B(this.negative === 0, "imaskn works only with positive numbers"), this.length <= g)
          return this;
        if (o !== 0 && g++, this.length = Math.min(g, this.length), o !== 0) {
          var H = 67108863 ^ 67108863 >>> o << o;
          this.words[this.length - 1] &= H;
        }
        return this._strip();
      }, t.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, t.prototype.iaddn = function(e) {
        return B(typeof e == "number"), B(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, t.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var o = 0; o < this.length && this.words[o] >= 67108864; o++)
          this.words[o] -= 67108864, o === this.length - 1 ? this.words[o + 1] = 1 : this.words[o + 1]++;
        return this.length = Math.max(this.length, o + 1), this;
      }, t.prototype.isubn = function(e) {
        if (B(typeof e == "number"), B(e < 67108864), e < 0)
          return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var o = 0; o < this.length && this.words[o] < 0; o++)
            this.words[o] += 67108864, this.words[o + 1] -= 1;
        return this._strip();
      }, t.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, t.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, t.prototype.iabs = function() {
        return this.negative = 0, this;
      }, t.prototype.abs = function() {
        return this.clone().iabs();
      }, t.prototype._ishlnsubmul = function(e, o, g) {
        var H = e.length + g, F;
        this._expand(H);
        var A, q = 0;
        for (F = 0; F < e.length; F++) {
          A = (this.words[F + g] | 0) + q;
          var z = (e.words[F] | 0) * o;
          A -= z & 67108863, q = (A >> 26) - (z / 67108864 | 0), this.words[F + g] = A & 67108863;
        }
        for (; F < this.length - g; F++)
          A = (this.words[F + g] | 0) + q, q = A >> 26, this.words[F + g] = A & 67108863;
        if (q === 0)
          return this._strip();
        for (B(q === -1), q = 0, F = 0; F < this.length; F++)
          A = -(this.words[F] | 0) + q, q = A >> 26, this.words[F] = A & 67108863;
        return this.negative = 1, this._strip();
      }, t.prototype._wordDiv = function(e, o) {
        var g = this.length - e.length, H = this.clone(), F = e, A = F.words[F.length - 1] | 0, q = this._countBits(A);
        g = 26 - q, g !== 0 && (F = F.ushln(g), H.iushln(g), A = F.words[F.length - 1] | 0);
        var z = H.length - F.length, S;
        if (o !== "mod") {
          S = new t(null), S.length = z + 1, S.words = new Array(S.length);
          for (var J = 0; J < S.length; J++)
            S.words[J] = 0;
        }
        var ce = H.clone()._ishlnsubmul(F, 1, z);
        ce.negative === 0 && (H = ce, S && (S.words[z] = 1));
        for (var ye = z - 1; ye >= 0; ye--) {
          var Me = (H.words[F.length + ye] | 0) * 67108864 + (H.words[F.length + ye - 1] | 0);
          for (Me = Math.min(Me / A | 0, 67108863), H._ishlnsubmul(F, Me, ye); H.negative !== 0; )
            Me--, H.negative = 0, H._ishlnsubmul(F, 1, ye), H.isZero() || (H.negative ^= 1);
          S && (S.words[ye] = Me);
        }
        return S && S._strip(), H._strip(), o !== "div" && g !== 0 && H.iushrn(g), {
          div: S || null,
          mod: H
        };
      }, t.prototype.divmod = function(e, o, g) {
        if (B(!e.isZero()), this.isZero())
          return {
            div: new t(0),
            mod: new t(0)
          };
        var H, F, A;
        return this.negative !== 0 && e.negative === 0 ? (A = this.neg().divmod(e, o), o !== "mod" && (H = A.div.neg()), o !== "div" && (F = A.mod.neg(), g && F.negative !== 0 && F.iadd(e)), {
          div: H,
          mod: F
        }) : this.negative === 0 && e.negative !== 0 ? (A = this.divmod(e.neg(), o), o !== "mod" && (H = A.div.neg()), {
          div: H,
          mod: A.mod
        }) : this.negative & e.negative ? (A = this.neg().divmod(e.neg(), o), o !== "div" && (F = A.mod.neg(), g && F.negative !== 0 && F.isub(e)), {
          div: A.div,
          mod: F
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new t(0),
          mod: this
        } : e.length === 1 ? o === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : o === "mod" ? {
          div: null,
          mod: new t(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new t(this.modrn(e.words[0]))
        } : this._wordDiv(e, o);
      }, t.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, t.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, t.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, t.prototype.divRound = function(e) {
        var o = this.divmod(e);
        if (o.mod.isZero())
          return o.div;
        var g = o.div.negative !== 0 ? o.mod.isub(e) : o.mod, H = e.ushrn(1), F = e.andln(1), A = g.cmp(H);
        return A < 0 || F === 1 && A === 0 ? o.div : o.div.negative !== 0 ? o.div.isubn(1) : o.div.iaddn(1);
      }, t.prototype.modrn = function(e) {
        var o = e < 0;
        o && (e = -e), B(e <= 67108863);
        for (var g = (1 << 26) % e, H = 0, F = this.length - 1; F >= 0; F--)
          H = (g * H + (this.words[F] | 0)) % e;
        return o ? -H : H;
      }, t.prototype.modn = function(e) {
        return this.modrn(e);
      }, t.prototype.idivn = function(e) {
        var o = e < 0;
        o && (e = -e), B(e <= 67108863);
        for (var g = 0, H = this.length - 1; H >= 0; H--) {
          var F = (this.words[H] | 0) + g * 67108864;
          this.words[H] = F / e | 0, g = F % e;
        }
        return this._strip(), o ? this.ineg() : this;
      }, t.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, t.prototype.egcd = function(e) {
        B(e.negative === 0), B(!e.isZero());
        var o = this, g = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), F = new t(0), A = new t(0), q = new t(1), z = 0; o.isEven() && g.isEven(); )
          o.iushrn(1), g.iushrn(1), ++z;
        for (var S = g.clone(), J = o.clone(); !o.isZero(); ) {
          for (var ce = 0, ye = 1; !(o.words[0] & ye) && ce < 26; ++ce, ye <<= 1)
            ;
          if (ce > 0)
            for (o.iushrn(ce); ce-- > 0; )
              (H.isOdd() || F.isOdd()) && (H.iadd(S), F.isub(J)), H.iushrn(1), F.iushrn(1);
          for (var Me = 0, me = 1; !(g.words[0] & me) && Me < 26; ++Me, me <<= 1)
            ;
          if (Me > 0)
            for (g.iushrn(Me); Me-- > 0; )
              (A.isOdd() || q.isOdd()) && (A.iadd(S), q.isub(J)), A.iushrn(1), q.iushrn(1);
          o.cmp(g) >= 0 ? (o.isub(g), H.isub(A), F.isub(q)) : (g.isub(o), A.isub(H), q.isub(F));
        }
        return {
          a: A,
          b: q,
          gcd: g.iushln(z)
        };
      }, t.prototype._invmp = function(e) {
        B(e.negative === 0), B(!e.isZero());
        var o = this, g = e.clone();
        o.negative !== 0 ? o = o.umod(e) : o = o.clone();
        for (var H = new t(1), F = new t(0), A = g.clone(); o.cmpn(1) > 0 && g.cmpn(1) > 0; ) {
          for (var q = 0, z = 1; !(o.words[0] & z) && q < 26; ++q, z <<= 1)
            ;
          if (q > 0)
            for (o.iushrn(q); q-- > 0; )
              H.isOdd() && H.iadd(A), H.iushrn(1);
          for (var S = 0, J = 1; !(g.words[0] & J) && S < 26; ++S, J <<= 1)
            ;
          if (S > 0)
            for (g.iushrn(S); S-- > 0; )
              F.isOdd() && F.iadd(A), F.iushrn(1);
          o.cmp(g) >= 0 ? (o.isub(g), H.isub(F)) : (g.isub(o), F.isub(H));
        }
        var ce;
        return o.cmpn(1) === 0 ? ce = H : ce = F, ce.cmpn(0) < 0 && ce.iadd(e), ce;
      }, t.prototype.gcd = function(e) {
        if (this.isZero())
          return e.abs();
        if (e.isZero())
          return this.abs();
        var o = this.clone(), g = e.clone();
        o.negative = 0, g.negative = 0;
        for (var H = 0; o.isEven() && g.isEven(); H++)
          o.iushrn(1), g.iushrn(1);
        do {
          for (; o.isEven(); )
            o.iushrn(1);
          for (; g.isEven(); )
            g.iushrn(1);
          var F = o.cmp(g);
          if (F < 0) {
            var A = o;
            o = g, g = A;
          } else if (F === 0 || g.cmpn(1) === 0)
            break;
          o.isub(g);
        } while (!0);
        return g.iushln(H);
      }, t.prototype.invm = function(e) {
        return this.egcd(e).a.umod(e);
      }, t.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, t.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, t.prototype.andln = function(e) {
        return this.words[0] & e;
      }, t.prototype.bincn = function(e) {
        B(typeof e == "number");
        var o = e % 26, g = (e - o) / 26, H = 1 << o;
        if (this.length <= g)
          return this._expand(g + 1), this.words[g] |= H, this;
        for (var F = H, A = g; F !== 0 && A < this.length; A++) {
          var q = this.words[A] | 0;
          q += F, F = q >>> 26, q &= 67108863, this.words[A] = q;
        }
        return F !== 0 && (this.words[A] = F, this.length++), this;
      }, t.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, t.prototype.cmpn = function(e) {
        var o = e < 0;
        if (this.negative !== 0 && !o)
          return -1;
        if (this.negative === 0 && o)
          return 1;
        this._strip();
        var g;
        if (this.length > 1)
          g = 1;
        else {
          o && (e = -e), B(e <= 67108863, "Number is too big");
          var H = this.words[0] | 0;
          g = H === e ? 0 : H < e ? -1 : 1;
        }
        return this.negative !== 0 ? -g | 0 : g;
      }, t.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0)
          return -1;
        if (this.negative === 0 && e.negative !== 0)
          return 1;
        var o = this.ucmp(e);
        return this.negative !== 0 ? -o | 0 : o;
      }, t.prototype.ucmp = function(e) {
        if (this.length > e.length)
          return 1;
        if (this.length < e.length)
          return -1;
        for (var o = 0, g = this.length - 1; g >= 0; g--) {
          var H = this.words[g] | 0, F = e.words[g] | 0;
          if (H !== F) {
            H < F ? o = -1 : H > F && (o = 1);
            break;
          }
        }
        return o;
      }, t.prototype.gtn = function(e) {
        return this.cmpn(e) === 1;
      }, t.prototype.gt = function(e) {
        return this.cmp(e) === 1;
      }, t.prototype.gten = function(e) {
        return this.cmpn(e) >= 0;
      }, t.prototype.gte = function(e) {
        return this.cmp(e) >= 0;
      }, t.prototype.ltn = function(e) {
        return this.cmpn(e) === -1;
      }, t.prototype.lt = function(e) {
        return this.cmp(e) === -1;
      }, t.prototype.lten = function(e) {
        return this.cmpn(e) <= 0;
      }, t.prototype.lte = function(e) {
        return this.cmp(e) <= 0;
      }, t.prototype.eqn = function(e) {
        return this.cmpn(e) === 0;
      }, t.prototype.eq = function(e) {
        return this.cmp(e) === 0;
      }, t.red = function(e) {
        return new G(e);
      }, t.prototype.toRed = function(e) {
        return B(!this.red, "Already a number in reduction context"), B(this.negative === 0, "red works only with positives"), e.convertTo(this)._forceRed(e);
      }, t.prototype.fromRed = function() {
        return B(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, t.prototype._forceRed = function(e) {
        return this.red = e, this;
      }, t.prototype.forceRed = function(e) {
        return B(!this.red, "Already a number in reduction context"), this._forceRed(e);
      }, t.prototype.redAdd = function(e) {
        return B(this.red, "redAdd works only with red numbers"), this.red.add(this, e);
      }, t.prototype.redIAdd = function(e) {
        return B(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e);
      }, t.prototype.redSub = function(e) {
        return B(this.red, "redSub works only with red numbers"), this.red.sub(this, e);
      }, t.prototype.redISub = function(e) {
        return B(this.red, "redISub works only with red numbers"), this.red.isub(this, e);
      }, t.prototype.redShl = function(e) {
        return B(this.red, "redShl works only with red numbers"), this.red.shl(this, e);
      }, t.prototype.redMul = function(e) {
        return B(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e);
      }, t.prototype.redIMul = function(e) {
        return B(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e);
      }, t.prototype.redSqr = function() {
        return B(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, t.prototype.redISqr = function() {
        return B(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, t.prototype.redSqrt = function() {
        return B(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, t.prototype.redInvm = function() {
        return B(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, t.prototype.redNeg = function() {
        return B(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, t.prototype.redPow = function(e) {
        return B(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e);
      };
      var we = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function Se(e, o) {
        this.name = e, this.p = new t(o, 16), this.n = this.p.bitLength(), this.k = new t(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      Se.prototype._tmp = function() {
        var e = new t(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, Se.prototype.ireduce = function(e) {
        var o = e, g;
        do
          this.split(o, this.tmp), o = this.imulK(o), o = o.iadd(this.tmp), g = o.bitLength();
        while (g > this.n);
        var H = g < this.n ? -1 : o.ucmp(this.p);
        return H === 0 ? (o.words[0] = 0, o.length = 1) : H > 0 ? o.isub(this.p) : o.strip !== void 0 ? o.strip() : o._strip(), o;
      }, Se.prototype.split = function(e, o) {
        e.iushrn(this.n, 0, o);
      }, Se.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function ke() {
        Se.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      V(ke, Se), ke.prototype.split = function(e, o) {
        for (var g = 4194303, H = Math.min(e.length, 9), F = 0; F < H; F++)
          o.words[F] = e.words[F];
        if (o.length = H, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var A = e.words[9];
        for (o.words[o.length++] = A & g, F = 10; F < e.length; F++) {
          var q = e.words[F] | 0;
          e.words[F - 10] = (q & g) << 4 | A >>> 22, A = q;
        }
        A >>>= 22, e.words[F - 10] = A, A === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, ke.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var o = 0, g = 0; g < e.length; g++) {
          var H = e.words[g] | 0;
          o += H * 977, e.words[g] = o & 67108863, o = H * 64 + (o / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function he() {
        Se.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      V(he, Se);
      function le() {
        Se.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      V(le, Se);
      function _e() {
        Se.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      V(_e, Se), _e.prototype.imulK = function(e) {
        for (var o = 0, g = 0; g < e.length; g++) {
          var H = (e.words[g] | 0) * 19 + o, F = H & 67108863;
          H >>>= 26, e.words[g] = F, o = H;
        }
        return o !== 0 && (e.words[e.length++] = o), e;
      }, t._prime = function(e) {
        if (we[e])
          return we[e];
        var o;
        if (e === "k256")
          o = new ke();
        else if (e === "p224")
          o = new he();
        else if (e === "p192")
          o = new le();
        else if (e === "p25519")
          o = new _e();
        else
          throw new Error("Unknown prime " + e);
        return we[e] = o, o;
      };
      function G(e) {
        if (typeof e == "string") {
          var o = t._prime(e);
          this.m = o.p, this.prime = o;
        } else
          B(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null;
      }
      G.prototype._verify1 = function(e) {
        B(e.negative === 0, "red works only with positives"), B(e.red, "red works only with red numbers");
      }, G.prototype._verify2 = function(e, o) {
        B((e.negative | o.negative) === 0, "red works only with positives"), B(
          e.red && e.red === o.red,
          "red works only with red numbers"
        );
      }, G.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (P(e, e.umod(this.m)._forceRed(this)), e);
      }, G.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, G.prototype.add = function(e, o) {
        this._verify2(e, o);
        var g = e.add(o);
        return g.cmp(this.m) >= 0 && g.isub(this.m), g._forceRed(this);
      }, G.prototype.iadd = function(e, o) {
        this._verify2(e, o);
        var g = e.iadd(o);
        return g.cmp(this.m) >= 0 && g.isub(this.m), g;
      }, G.prototype.sub = function(e, o) {
        this._verify2(e, o);
        var g = e.sub(o);
        return g.cmpn(0) < 0 && g.iadd(this.m), g._forceRed(this);
      }, G.prototype.isub = function(e, o) {
        this._verify2(e, o);
        var g = e.isub(o);
        return g.cmpn(0) < 0 && g.iadd(this.m), g;
      }, G.prototype.shl = function(e, o) {
        return this._verify1(e), this.imod(e.ushln(o));
      }, G.prototype.imul = function(e, o) {
        return this._verify2(e, o), this.imod(e.imul(o));
      }, G.prototype.mul = function(e, o) {
        return this._verify2(e, o), this.imod(e.mul(o));
      }, G.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, G.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, G.prototype.sqrt = function(e) {
        if (e.isZero())
          return e.clone();
        var o = this.m.andln(3);
        if (B(o % 2 === 1), o === 3) {
          var g = this.m.add(new t(1)).iushrn(2);
          return this.pow(e, g);
        }
        for (var H = this.m.subn(1), F = 0; !H.isZero() && H.andln(1) === 0; )
          F++, H.iushrn(1);
        B(!H.isZero());
        var A = new t(1).toRed(this), q = A.redNeg(), z = this.m.subn(1).iushrn(1), S = this.m.bitLength();
        for (S = new t(2 * S * S).toRed(this); this.pow(S, z).cmp(q) !== 0; )
          S.redIAdd(q);
        for (var J = this.pow(S, H), ce = this.pow(e, H.addn(1).iushrn(1)), ye = this.pow(e, H), Me = F; ye.cmp(A) !== 0; ) {
          for (var me = ye, ue = 0; me.cmp(A) !== 0; ue++)
            me = me.redSqr();
          B(ue < Me);
          var fe = this.pow(J, new t(1).iushln(Me - ue - 1));
          ce = ce.redMul(fe), J = fe.redSqr(), ye = ye.redMul(J), Me = ue;
        }
        return ce;
      }, G.prototype.invm = function(e) {
        var o = e._invmp(this.m);
        return o.negative !== 0 ? (o.negative = 0, this.imod(o).redNeg()) : this.imod(o);
      }, G.prototype.pow = function(e, o) {
        if (o.isZero())
          return new t(1).toRed(this);
        if (o.cmpn(1) === 0)
          return e.clone();
        var g = 4, H = new Array(1 << g);
        H[0] = new t(1).toRed(this), H[1] = e;
        for (var F = 2; F < H.length; F++)
          H[F] = this.mul(H[F - 1], e);
        var A = H[0], q = 0, z = 0, S = o.bitLength() % 26;
        for (S === 0 && (S = 26), F = o.length - 1; F >= 0; F--) {
          for (var J = o.words[F], ce = S - 1; ce >= 0; ce--) {
            var ye = J >> ce & 1;
            if (A !== H[0] && (A = this.sqr(A)), ye === 0 && q === 0) {
              z = 0;
              continue;
            }
            q <<= 1, q |= ye, z++, !(z !== g && (F !== 0 || ce !== 0)) && (A = this.mul(A, H[q]), z = 0, q = 0);
          }
          S = 26;
        }
        return A;
      }, G.prototype.convertTo = function(e) {
        var o = e.umod(this.m);
        return o === e ? o.clone() : o;
      }, G.prototype.convertFrom = function(e) {
        var o = e.clone();
        return o.red = null, o;
      }, t.mont = function(e) {
        return new Z(e);
      };
      function Z(e) {
        G.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new t(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      V(Z, G), Z.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, Z.prototype.convertFrom = function(e) {
        var o = this.imod(e.mul(this.rinv));
        return o.red = null, o;
      }, Z.prototype.imul = function(e, o) {
        if (e.isZero() || o.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var g = e.imul(o), H = g.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), F = g.isub(H).iushrn(this.shift), A = F;
        return F.cmp(this.m) >= 0 ? A = F.isub(this.m) : F.cmpn(0) < 0 && (A = F.iadd(this.m)), A._forceRed(this);
      }, Z.prototype.mul = function(e, o) {
        if (e.isZero() || o.isZero())
          return new t(0)._forceRed(this);
        var g = e.mul(o), H = g.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), F = g.isub(H).iushrn(this.shift), A = F;
        return F.cmp(this.m) >= 0 ? A = F.isub(this.m) : F.cmpn(0) < 0 && (A = F.iadd(this.m)), A._forceRed(this);
      }, Z.prototype.invm = function(e) {
        var o = this.imod(e._invmp(this.m).mul(this.r2));
        return o._forceRed(this);
      };
    })($, commonjsGlobal);
  }(bn)), bn.exports;
}
var asn1$1 = {}, asn1 = {}, api = {}, vmBrowserify = {}, hasRequiredVmBrowserify;
function requireVmBrowserify() {
  return hasRequiredVmBrowserify || (hasRequiredVmBrowserify = 1, function(exports) {
    var indexOf = function($, h) {
      if ($.indexOf)
        return $.indexOf(h);
      for (var U = 0; U < $.length; U++)
        if ($[U] === h)
          return U;
      return -1;
    }, Object_keys = function($) {
      if (Object.keys)
        return Object.keys($);
      var h = [];
      for (var U in $)
        h.push(U);
      return h;
    }, forEach = function($, h) {
      if ($.forEach)
        return $.forEach(h);
      for (var U = 0; U < $.length; U++)
        h($[U], U, $);
    }, defineProp = function() {
      try {
        return Object.defineProperty({}, "_", {}), function($, h, U) {
          Object.defineProperty($, h, {
            writable: !0,
            enumerable: !1,
            configurable: !0,
            value: U
          });
        };
      } catch {
        return function($, h, U) {
          $[h] = U;
        };
      }
    }(), globals = [
      "Array",
      "Boolean",
      "Date",
      "Error",
      "EvalError",
      "Function",
      "Infinity",
      "JSON",
      "Math",
      "NaN",
      "Number",
      "Object",
      "RangeError",
      "ReferenceError",
      "RegExp",
      "String",
      "SyntaxError",
      "TypeError",
      "URIError",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "undefined",
      "unescape"
    ];
    function Context() {
    }
    Context.prototype = {};
    var Script = exports.Script = function($) {
      if (!(this instanceof Script))
        return new Script($);
      this.code = $;
    };
    Script.prototype.runInContext = function($) {
      if (!($ instanceof Context))
        throw new TypeError("needs a 'context' argument.");
      var h = document.createElement("iframe");
      h.style || (h.style = {}), h.style.display = "none", document.body.appendChild(h);
      var U = h.contentWindow, B = U.eval, V = U.execScript;
      !B && V && (V.call(U, "null"), B = U.eval), forEach(Object_keys($), function(M) {
        U[M] = $[M];
      }), forEach(globals, function(M) {
        $[M] && (U[M] = $[M]);
      });
      var t = Object_keys(U), O = B.call(U, this.code);
      return forEach(Object_keys(U), function(M) {
        (M in $ || indexOf(t, M) === -1) && ($[M] = U[M]);
      }), forEach(globals, function(M) {
        M in $ || defineProp($, M, U[M]);
      }), document.body.removeChild(h), O;
    }, Script.prototype.runInThisContext = function() {
      return eval(this.code);
    }, Script.prototype.runInNewContext = function($) {
      var h = Script.createContext($), U = this.runInContext(h);
      return $ && forEach(Object_keys(h), function(B) {
        $[B] = h[B];
      }), U;
    }, forEach(Object_keys(Script.prototype), function($) {
      exports[$] = Script[$] = function(h) {
        var U = Script(h);
        return U[$].apply(U, [].slice.call(arguments, 1));
      };
    }), exports.isContext = function($) {
      return $ instanceof Context;
    }, exports.createScript = function($) {
      return exports.Script($);
    }, exports.createContext = Script.createContext = function($) {
      var h = new Context();
      return typeof $ == "object" && forEach(Object_keys($), function(U) {
        h[U] = $[U];
      }), h;
    };
  }(vmBrowserify)), vmBrowserify;
}
var hasRequiredApi;
function requireApi() {
  return hasRequiredApi || (hasRequiredApi = 1, function($) {
    var h = requireAsn1$1(), U = requireInherits_browser(), B = $;
    B.define = function(t, O) {
      return new V(t, O);
    };
    function V(t, O) {
      this.name = t, this.body = O, this.decoders = {}, this.encoders = {};
    }
    V.prototype._createNamed = function(t) {
      var O;
      try {
        O = requireVmBrowserify().runInThisContext(
          "(function " + this.name + `(entity) {
  this._initNamed(entity);
})`
        );
      } catch {
        O = function(M) {
          this._initNamed(M);
        };
      }
      return U(O, t), O.prototype._initNamed = function(M) {
        t.call(this, M);
      }, new O(this);
    }, V.prototype._getDecoder = function(t) {
      return t = t || "der", this.decoders.hasOwnProperty(t) || (this.decoders[t] = this._createNamed(h.decoders[t])), this.decoders[t];
    }, V.prototype.decode = function(t, O, M) {
      return this._getDecoder(O).decode(t, M);
    }, V.prototype._getEncoder = function(t) {
      return t = t || "der", this.encoders.hasOwnProperty(t) || (this.encoders[t] = this._createNamed(h.encoders[t])), this.encoders[t];
    }, V.prototype.encode = function(t, O, M) {
      return this._getEncoder(O).encode(t, M);
    };
  }(api)), api;
}
var base = {}, reporter = {}, hasRequiredReporter;
function requireReporter() {
  if (hasRequiredReporter)
    return reporter;
  hasRequiredReporter = 1;
  var $ = requireInherits_browser();
  function h(B) {
    this._reporterState = {
      obj: null,
      path: [],
      options: B || {},
      errors: []
    };
  }
  reporter.Reporter = h, h.prototype.isError = function(B) {
    return B instanceof U;
  }, h.prototype.save = function() {
    var B = this._reporterState;
    return { obj: B.obj, pathLen: B.path.length };
  }, h.prototype.restore = function(B) {
    var V = this._reporterState;
    V.obj = B.obj, V.path = V.path.slice(0, B.pathLen);
  }, h.prototype.enterKey = function(B) {
    return this._reporterState.path.push(B);
  }, h.prototype.exitKey = function(B) {
    var V = this._reporterState;
    V.path = V.path.slice(0, B - 1);
  }, h.prototype.leaveKey = function(B, V, t) {
    var O = this._reporterState;
    this.exitKey(B), O.obj !== null && (O.obj[V] = t);
  }, h.prototype.path = function() {
    return this._reporterState.path.join("/");
  }, h.prototype.enterObject = function() {
    var B = this._reporterState, V = B.obj;
    return B.obj = {}, V;
  }, h.prototype.leaveObject = function(B) {
    var V = this._reporterState, t = V.obj;
    return V.obj = B, t;
  }, h.prototype.error = function(B) {
    var V, t = this._reporterState, O = B instanceof U;
    if (O ? V = B : V = new U(t.path.map(function(M) {
      return "[" + JSON.stringify(M) + "]";
    }).join(""), B.message || B, B.stack), !t.options.partial)
      throw V;
    return O || t.errors.push(V), V;
  }, h.prototype.wrapResult = function(B) {
    var V = this._reporterState;
    return V.options.partial ? {
      result: this.isError(B) ? null : B,
      errors: V.errors
    } : B;
  };
  function U(B, V) {
    this.path = B, this.rethrow(V);
  }
  return $(U, Error), U.prototype.rethrow = function(B) {
    if (this.message = B + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, U), !this.stack)
      try {
        throw new Error(this.message);
      } catch (V) {
        this.stack = V.stack;
      }
    return this;
  }, reporter;
}
var buffer = {}, hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer)
    return buffer;
  hasRequiredBuffer = 1;
  var $ = requireInherits_browser(), h = requireBase().Reporter, U = requireBuffer$1().Buffer;
  function B(t, O) {
    if (h.call(this, O), !U.isBuffer(t)) {
      this.error("Input not Buffer");
      return;
    }
    this.base = t, this.offset = 0, this.length = t.length;
  }
  $(B, h), buffer.DecoderBuffer = B, B.prototype.save = function() {
    return { offset: this.offset, reporter: h.prototype.save.call(this) };
  }, B.prototype.restore = function(t) {
    var O = new B(this.base);
    return O.offset = t.offset, O.length = this.offset, this.offset = t.offset, h.prototype.restore.call(this, t.reporter), O;
  }, B.prototype.isEmpty = function() {
    return this.offset === this.length;
  }, B.prototype.readUInt8 = function(t) {
    return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(t || "DecoderBuffer overrun");
  }, B.prototype.skip = function(t, O) {
    if (!(this.offset + t <= this.length))
      return this.error(O || "DecoderBuffer overrun");
    var M = new B(this.base);
    return M._reporterState = this._reporterState, M.offset = this.offset, M.length = this.offset + t, this.offset += t, M;
  }, B.prototype.raw = function(t) {
    return this.base.slice(t ? t.offset : this.offset, this.length);
  };
  function V(t, O) {
    if (Array.isArray(t))
      this.length = 0, this.value = t.map(function(M) {
        return M instanceof V || (M = new V(M, O)), this.length += M.length, M;
      }, this);
    else if (typeof t == "number") {
      if (!(0 <= t && t <= 255))
        return O.error("non-byte EncoderBuffer value");
      this.value = t, this.length = 1;
    } else if (typeof t == "string")
      this.value = t, this.length = U.byteLength(t);
    else if (U.isBuffer(t))
      this.value = t, this.length = t.length;
    else
      return O.error("Unsupported type: " + typeof t);
  }
  return buffer.EncoderBuffer = V, V.prototype.join = function(t, O) {
    return t || (t = new U(this.length)), O || (O = 0), this.length === 0 || (Array.isArray(this.value) ? this.value.forEach(function(M) {
      M.join(t, O), O += M.length;
    }) : (typeof this.value == "number" ? t[O] = this.value : typeof this.value == "string" ? t.write(this.value, O) : U.isBuffer(this.value) && this.value.copy(t, O), O += this.length)), t;
  }, buffer;
}
var node, hasRequiredNode;
function requireNode() {
  if (hasRequiredNode)
    return node;
  hasRequiredNode = 1;
  var $ = requireBase().Reporter, h = requireBase().EncoderBuffer, U = requireBase().DecoderBuffer, B = requireMinimalisticAssert(), V = [
    "seq",
    "seqof",
    "set",
    "setof",
    "objid",
    "bool",
    "gentime",
    "utctime",
    "null_",
    "enum",
    "int",
    "objDesc",
    "bitstr",
    "bmpstr",
    "charstr",
    "genstr",
    "graphstr",
    "ia5str",
    "iso646str",
    "numstr",
    "octstr",
    "printstr",
    "t61str",
    "unistr",
    "utf8str",
    "videostr"
  ], t = [
    "key",
    "obj",
    "use",
    "optional",
    "explicit",
    "implicit",
    "def",
    "choice",
    "any",
    "contains"
  ].concat(V), O = [
    "_peekTag",
    "_decodeTag",
    "_use",
    "_decodeStr",
    "_decodeObjid",
    "_decodeTime",
    "_decodeNull",
    "_decodeInt",
    "_decodeBool",
    "_decodeList",
    "_encodeComposite",
    "_encodeStr",
    "_encodeObjid",
    "_encodeTime",
    "_encodeNull",
    "_encodeInt",
    "_encodeBool"
  ];
  function M(I, P) {
    var Y = {};
    this._baseState = Y, Y.enc = I, Y.parent = P || null, Y.children = null, Y.tag = null, Y.args = null, Y.reverseArgs = null, Y.choice = null, Y.optional = !1, Y.any = !1, Y.obj = !1, Y.use = null, Y.useDecoder = null, Y.key = null, Y.default = null, Y.explicit = null, Y.implicit = null, Y.contains = null, Y.parent || (Y.children = [], this._wrap());
  }
  node = M;
  var D = [
    "enc",
    "parent",
    "children",
    "tag",
    "args",
    "reverseArgs",
    "choice",
    "optional",
    "any",
    "obj",
    "use",
    "alteredUse",
    "key",
    "default",
    "explicit",
    "implicit",
    "contains"
  ];
  return M.prototype.clone = function() {
    var I = this._baseState, P = {};
    D.forEach(function(X) {
      P[X] = I[X];
    });
    var Y = new this.constructor(P.parent);
    return Y._baseState = P, Y;
  }, M.prototype._wrap = function() {
    var I = this._baseState;
    t.forEach(function(P) {
      this[P] = function() {
        var Y = new this.constructor(this);
        return I.children.push(Y), Y[P].apply(Y, arguments);
      };
    }, this);
  }, M.prototype._init = function(I) {
    var P = this._baseState;
    B(P.parent === null), I.call(this), P.children = P.children.filter(function(Y) {
      return Y._baseState.parent === this;
    }, this), B.equal(P.children.length, 1, "Root node can have only one child");
  }, M.prototype._useArgs = function(I) {
    var P = this._baseState, Y = I.filter(function(X) {
      return X instanceof this.constructor;
    }, this);
    I = I.filter(function(X) {
      return !(X instanceof this.constructor);
    }, this), Y.length !== 0 && (B(P.children === null), P.children = Y, Y.forEach(function(X) {
      X._baseState.parent = this;
    }, this)), I.length !== 0 && (B(P.args === null), P.args = I, P.reverseArgs = I.map(function(X) {
      if (typeof X != "object" || X.constructor !== Object)
        return X;
      var ee = {};
      return Object.keys(X).forEach(function(re) {
        re == (re | 0) && (re |= 0);
        var ie = X[re];
        ee[ie] = re;
      }), ee;
    }));
  }, O.forEach(function(I) {
    M.prototype[I] = function() {
      var P = this._baseState;
      throw new Error(I + " not implemented for encoding: " + P.enc);
    };
  }), V.forEach(function(I) {
    M.prototype[I] = function() {
      var P = this._baseState, Y = Array.prototype.slice.call(arguments);
      return B(P.tag === null), P.tag = I, this._useArgs(Y), this;
    };
  }), M.prototype.use = function(I) {
    B(I);
    var P = this._baseState;
    return B(P.use === null), P.use = I, this;
  }, M.prototype.optional = function() {
    var I = this._baseState;
    return I.optional = !0, this;
  }, M.prototype.def = function(I) {
    var P = this._baseState;
    return B(P.default === null), P.default = I, P.optional = !0, this;
  }, M.prototype.explicit = function(I) {
    var P = this._baseState;
    return B(P.explicit === null && P.implicit === null), P.explicit = I, this;
  }, M.prototype.implicit = function(I) {
    var P = this._baseState;
    return B(P.explicit === null && P.implicit === null), P.implicit = I, this;
  }, M.prototype.obj = function() {
    var I = this._baseState, P = Array.prototype.slice.call(arguments);
    return I.obj = !0, P.length !== 0 && this._useArgs(P), this;
  }, M.prototype.key = function(I) {
    var P = this._baseState;
    return B(P.key === null), P.key = I, this;
  }, M.prototype.any = function() {
    var I = this._baseState;
    return I.any = !0, this;
  }, M.prototype.choice = function(I) {
    var P = this._baseState;
    return B(P.choice === null), P.choice = I, this._useArgs(Object.keys(I).map(function(Y) {
      return I[Y];
    })), this;
  }, M.prototype.contains = function(I) {
    var P = this._baseState;
    return B(P.use === null), P.contains = I, this;
  }, M.prototype._decode = function(I, P) {
    var Y = this._baseState;
    if (Y.parent === null)
      return I.wrapResult(Y.children[0]._decode(I, P));
    var X = Y.default, ee = !0, re = null;
    if (Y.key !== null && (re = I.enterKey(Y.key)), Y.optional) {
      var ie = null;
      if (Y.explicit !== null ? ie = Y.explicit : Y.implicit !== null ? ie = Y.implicit : Y.tag !== null && (ie = Y.tag), ie === null && !Y.any) {
        var ne = I.save();
        try {
          Y.choice === null ? this._decodeGeneric(Y.tag, I, P) : this._decodeChoice(I, P), ee = !0;
        } catch {
          ee = !1;
        }
        I.restore(ne);
      } else if (ee = this._peekTag(I, ie, Y.any), I.isError(ee))
        return ee;
    }
    var se;
    if (Y.obj && ee && (se = I.enterObject()), ee) {
      if (Y.explicit !== null) {
        var oe = this._decodeTag(I, Y.explicit);
        if (I.isError(oe))
          return oe;
        I = oe;
      }
      var be = I.offset;
      if (Y.use === null && Y.choice === null) {
        if (Y.any)
          var ne = I.save();
        var de = this._decodeTag(
          I,
          Y.implicit !== null ? Y.implicit : Y.tag,
          Y.any
        );
        if (I.isError(de))
          return de;
        Y.any ? X = I.raw(ne) : I = de;
      }
      if (P && P.track && Y.tag !== null && P.track(I.path(), be, I.length, "tagged"), P && P.track && Y.tag !== null && P.track(I.path(), I.offset, I.length, "content"), Y.any ? X = X : Y.choice === null ? X = this._decodeGeneric(Y.tag, I, P) : X = this._decodeChoice(I, P), I.isError(X))
        return X;
      if (!Y.any && Y.choice === null && Y.children !== null && Y.children.forEach(function(Se) {
        Se._decode(I, P);
      }), Y.contains && (Y.tag === "octstr" || Y.tag === "bitstr")) {
        var we = new U(X);
        X = this._getUse(Y.contains, I._reporterState.obj)._decode(we, P);
      }
    }
    return Y.obj && ee && (X = I.leaveObject(se)), Y.key !== null && (X !== null || ee === !0) ? I.leaveKey(re, Y.key, X) : re !== null && I.exitKey(re), X;
  }, M.prototype._decodeGeneric = function(I, P, Y) {
    var X = this._baseState;
    return I === "seq" || I === "set" ? null : I === "seqof" || I === "setof" ? this._decodeList(P, I, X.args[0], Y) : /str$/.test(I) ? this._decodeStr(P, I, Y) : I === "objid" && X.args ? this._decodeObjid(P, X.args[0], X.args[1], Y) : I === "objid" ? this._decodeObjid(P, null, null, Y) : I === "gentime" || I === "utctime" ? this._decodeTime(P, I, Y) : I === "null_" ? this._decodeNull(P, Y) : I === "bool" ? this._decodeBool(P, Y) : I === "objDesc" ? this._decodeStr(P, I, Y) : I === "int" || I === "enum" ? this._decodeInt(P, X.args && X.args[0], Y) : X.use !== null ? this._getUse(X.use, P._reporterState.obj)._decode(P, Y) : P.error("unknown tag: " + I);
  }, M.prototype._getUse = function(I, P) {
    var Y = this._baseState;
    return Y.useDecoder = this._use(I, P), B(Y.useDecoder._baseState.parent === null), Y.useDecoder = Y.useDecoder._baseState.children[0], Y.implicit !== Y.useDecoder._baseState.implicit && (Y.useDecoder = Y.useDecoder.clone(), Y.useDecoder._baseState.implicit = Y.implicit), Y.useDecoder;
  }, M.prototype._decodeChoice = function(I, P) {
    var Y = this._baseState, X = null, ee = !1;
    return Object.keys(Y.choice).some(function(re) {
      var ie = I.save(), ne = Y.choice[re];
      try {
        var se = ne._decode(I, P);
        if (I.isError(se))
          return !1;
        X = { type: re, value: se }, ee = !0;
      } catch {
        return I.restore(ie), !1;
      }
      return !0;
    }, this), ee ? X : I.error("Choice not matched");
  }, M.prototype._createEncoderBuffer = function(I) {
    return new h(I, this.reporter);
  }, M.prototype._encode = function(I, P, Y) {
    var X = this._baseState;
    if (!(X.default !== null && X.default === I)) {
      var ee = this._encodeValue(I, P, Y);
      if (ee !== void 0 && !this._skipDefault(ee, P, Y))
        return ee;
    }
  }, M.prototype._encodeValue = function(I, P, Y) {
    var X = this._baseState;
    if (X.parent === null)
      return X.children[0]._encode(I, P || new $());
    var ne = null;
    if (this.reporter = P, X.optional && I === void 0)
      if (X.default !== null)
        I = X.default;
      else
        return;
    var ee = null, re = !1;
    if (X.any)
      ne = this._createEncoderBuffer(I);
    else if (X.choice)
      ne = this._encodeChoice(I, P);
    else if (X.contains)
      ee = this._getUse(X.contains, Y)._encode(I, P), re = !0;
    else if (X.children)
      ee = X.children.map(function(be) {
        if (be._baseState.tag === "null_")
          return be._encode(null, P, I);
        if (be._baseState.key === null)
          return P.error("Child should have a key");
        var de = P.enterKey(be._baseState.key);
        if (typeof I != "object")
          return P.error("Child expected, but input is not object");
        var we = be._encode(I[be._baseState.key], P, I);
        return P.leaveKey(de), we;
      }, this).filter(function(be) {
        return be;
      }), ee = this._createEncoderBuffer(ee);
    else if (X.tag === "seqof" || X.tag === "setof") {
      if (!(X.args && X.args.length === 1))
        return P.error("Too many args for : " + X.tag);
      if (!Array.isArray(I))
        return P.error("seqof/setof, but data is not Array");
      var ie = this.clone();
      ie._baseState.implicit = null, ee = this._createEncoderBuffer(I.map(function(be) {
        var de = this._baseState;
        return this._getUse(de.args[0], I)._encode(be, P);
      }, ie));
    } else
      X.use !== null ? ne = this._getUse(X.use, Y)._encode(I, P) : (ee = this._encodePrimitive(X.tag, I), re = !0);
    var ne;
    if (!X.any && X.choice === null) {
      var se = X.implicit !== null ? X.implicit : X.tag, oe = X.implicit === null ? "universal" : "context";
      se === null ? X.use === null && P.error("Tag could be omitted only for .use()") : X.use === null && (ne = this._encodeComposite(se, re, oe, ee));
    }
    return X.explicit !== null && (ne = this._encodeComposite(X.explicit, !1, "context", ne)), ne;
  }, M.prototype._encodeChoice = function(I, P) {
    var Y = this._baseState, X = Y.choice[I.type];
    return X || B(
      !1,
      I.type + " not found in " + JSON.stringify(Object.keys(Y.choice))
    ), X._encode(I.value, P);
  }, M.prototype._encodePrimitive = function(I, P) {
    var Y = this._baseState;
    if (/str$/.test(I))
      return this._encodeStr(P, I);
    if (I === "objid" && Y.args)
      return this._encodeObjid(P, Y.reverseArgs[0], Y.args[1]);
    if (I === "objid")
      return this._encodeObjid(P, null, null);
    if (I === "gentime" || I === "utctime")
      return this._encodeTime(P, I);
    if (I === "null_")
      return this._encodeNull();
    if (I === "int" || I === "enum")
      return this._encodeInt(P, Y.args && Y.reverseArgs[0]);
    if (I === "bool")
      return this._encodeBool(P);
    if (I === "objDesc")
      return this._encodeStr(P, I);
    throw new Error("Unsupported tag: " + I);
  }, M.prototype._isNumstr = function(I) {
    return /^[0-9 ]*$/.test(I);
  }, M.prototype._isPrintstr = function(I) {
    return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(I);
  }, node;
}
var hasRequiredBase;
function requireBase() {
  return hasRequiredBase || (hasRequiredBase = 1, function($) {
    var h = $;
    h.Reporter = requireReporter().Reporter, h.DecoderBuffer = requireBuffer().DecoderBuffer, h.EncoderBuffer = requireBuffer().EncoderBuffer, h.Node = requireNode();
  }(base)), base;
}
var constants = {}, der = {}, hasRequiredDer$2;
function requireDer$2() {
  return hasRequiredDer$2 || (hasRequiredDer$2 = 1, function($) {
    var h = requireConstants();
    $.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private"
    }, $.tagClassByName = h._reverse($.tagClass), $.tag = {
      0: "end",
      1: "bool",
      2: "int",
      3: "bitstr",
      4: "octstr",
      5: "null_",
      6: "objid",
      7: "objDesc",
      8: "external",
      9: "real",
      10: "enum",
      11: "embed",
      12: "utf8str",
      13: "relativeOid",
      16: "seq",
      17: "set",
      18: "numstr",
      19: "printstr",
      20: "t61str",
      21: "videostr",
      22: "ia5str",
      23: "utctime",
      24: "gentime",
      25: "graphstr",
      26: "iso646str",
      27: "genstr",
      28: "unistr",
      29: "charstr",
      30: "bmpstr"
    }, $.tagByName = h._reverse($.tag);
  }(der)), der;
}
var hasRequiredConstants;
function requireConstants() {
  return hasRequiredConstants || (hasRequiredConstants = 1, function($) {
    var h = $;
    h._reverse = function(U) {
      var B = {};
      return Object.keys(U).forEach(function(V) {
        (V | 0) == V && (V = V | 0);
        var t = U[V];
        B[t] = V;
      }), B;
    }, h.der = requireDer$2();
  }(constants)), constants;
}
var decoders = {}, der_1$1, hasRequiredDer$1;
function requireDer$1() {
  if (hasRequiredDer$1)
    return der_1$1;
  hasRequiredDer$1 = 1;
  var $ = requireInherits_browser(), h = requireAsn1$1(), U = h.base, B = h.bignum, V = h.constants.der;
  function t(I) {
    this.enc = "der", this.name = I.name, this.entity = I, this.tree = new O(), this.tree._init(I.body);
  }
  der_1$1 = t, t.prototype.decode = function(I, P) {
    return I instanceof U.DecoderBuffer || (I = new U.DecoderBuffer(I, P)), this.tree._decode(I, P);
  };
  function O(I) {
    U.Node.call(this, "der", I);
  }
  $(O, U.Node), O.prototype._peekTag = function(I, P, Y) {
    if (I.isEmpty())
      return !1;
    var X = I.save(), ee = M(I, 'Failed to peek tag: "' + P + '"');
    return I.isError(ee) ? ee : (I.restore(X), ee.tag === P || ee.tagStr === P || ee.tagStr + "of" === P || Y);
  }, O.prototype._decodeTag = function(I, P, Y) {
    var X = M(
      I,
      'Failed to decode tag of "' + P + '"'
    );
    if (I.isError(X))
      return X;
    var ee = D(
      I,
      X.primitive,
      'Failed to get length of "' + P + '"'
    );
    if (I.isError(ee))
      return ee;
    if (!Y && X.tag !== P && X.tagStr !== P && X.tagStr + "of" !== P)
      return I.error('Failed to match tag: "' + P + '"');
    if (X.primitive || ee !== null)
      return I.skip(ee, 'Failed to match body of: "' + P + '"');
    var re = I.save(), ie = this._skipUntilEnd(
      I,
      'Failed to skip indefinite length body: "' + this.tag + '"'
    );
    return I.isError(ie) ? ie : (ee = I.offset - re.offset, I.restore(re), I.skip(ee, 'Failed to match body of: "' + P + '"'));
  }, O.prototype._skipUntilEnd = function(I, P) {
    for (; ; ) {
      var Y = M(I, P);
      if (I.isError(Y))
        return Y;
      var X = D(I, Y.primitive, P);
      if (I.isError(X))
        return X;
      var ee;
      if (Y.primitive || X !== null ? ee = I.skip(X) : ee = this._skipUntilEnd(I, P), I.isError(ee))
        return ee;
      if (Y.tagStr === "end")
        break;
    }
  }, O.prototype._decodeList = function(I, P, Y, X) {
    for (var ee = []; !I.isEmpty(); ) {
      var re = this._peekTag(I, "end");
      if (I.isError(re))
        return re;
      var ie = Y.decode(I, "der", X);
      if (I.isError(ie) && re)
        break;
      ee.push(ie);
    }
    return ee;
  }, O.prototype._decodeStr = function(I, P) {
    if (P === "bitstr") {
      var Y = I.readUInt8();
      return I.isError(Y) ? Y : { unused: Y, data: I.raw() };
    } else if (P === "bmpstr") {
      var X = I.raw();
      if (X.length % 2 === 1)
        return I.error("Decoding of string type: bmpstr length mismatch");
      for (var ee = "", re = 0; re < X.length / 2; re++)
        ee += String.fromCharCode(X.readUInt16BE(re * 2));
      return ee;
    } else if (P === "numstr") {
      var ie = I.raw().toString("ascii");
      return this._isNumstr(ie) ? ie : I.error("Decoding of string type: numstr unsupported characters");
    } else {
      if (P === "octstr" || P === "objDesc")
        return I.raw();
      if (P === "printstr") {
        var ne = I.raw().toString("ascii");
        return this._isPrintstr(ne) ? ne : I.error("Decoding of string type: printstr unsupported characters");
      } else
        return /str$/.test(P) ? I.raw().toString() : I.error("Decoding of string type: " + P + " unsupported");
    }
  }, O.prototype._decodeObjid = function(I, P, Y) {
    for (var X, ee = [], re = 0; !I.isEmpty(); ) {
      var ie = I.readUInt8();
      re <<= 7, re |= ie & 127, ie & 128 || (ee.push(re), re = 0);
    }
    ie & 128 && ee.push(re);
    var ne = ee[0] / 40 | 0, se = ee[0] % 40;
    if (Y ? X = ee : X = [ne, se].concat(ee.slice(1)), P) {
      var oe = P[X.join(" ")];
      oe === void 0 && (oe = P[X.join(".")]), oe !== void 0 && (X = oe);
    }
    return X;
  }, O.prototype._decodeTime = function(I, P) {
    var Y = I.raw().toString();
    if (P === "gentime")
      var X = Y.slice(0, 4) | 0, ee = Y.slice(4, 6) | 0, re = Y.slice(6, 8) | 0, ie = Y.slice(8, 10) | 0, ne = Y.slice(10, 12) | 0, se = Y.slice(12, 14) | 0;
    else if (P === "utctime") {
      var X = Y.slice(0, 2) | 0, ee = Y.slice(2, 4) | 0, re = Y.slice(4, 6) | 0, ie = Y.slice(6, 8) | 0, ne = Y.slice(8, 10) | 0, se = Y.slice(10, 12) | 0;
      X < 70 ? X = 2e3 + X : X = 1900 + X;
    } else
      return I.error("Decoding " + P + " time is not supported yet");
    return Date.UTC(X, ee - 1, re, ie, ne, se, 0);
  }, O.prototype._decodeNull = function(I) {
    return null;
  }, O.prototype._decodeBool = function(I) {
    var P = I.readUInt8();
    return I.isError(P) ? P : P !== 0;
  }, O.prototype._decodeInt = function(I, P) {
    var Y = I.raw(), X = new B(Y);
    return P && (X = P[X.toString(10)] || X), X;
  }, O.prototype._use = function(I, P) {
    return typeof I == "function" && (I = I(P)), I._getDecoder("der").tree;
  };
  function M(I, P) {
    var Y = I.readUInt8(P);
    if (I.isError(Y))
      return Y;
    var X = V.tagClass[Y >> 6], ee = (Y & 32) === 0;
    if ((Y & 31) === 31) {
      var re = Y;
      for (Y = 0; (re & 128) === 128; ) {
        if (re = I.readUInt8(P), I.isError(re))
          return re;
        Y <<= 7, Y |= re & 127;
      }
    } else
      Y &= 31;
    var ie = V.tag[Y];
    return {
      cls: X,
      primitive: ee,
      tag: Y,
      tagStr: ie
    };
  }
  function D(I, P, Y) {
    var X = I.readUInt8(Y);
    if (I.isError(X))
      return X;
    if (!P && X === 128)
      return null;
    if (!(X & 128))
      return X;
    var ee = X & 127;
    if (ee > 4)
      return I.error("length octect is too long");
    X = 0;
    for (var re = 0; re < ee; re++) {
      X <<= 8;
      var ie = I.readUInt8(Y);
      if (I.isError(ie))
        return ie;
      X |= ie;
    }
    return X;
  }
  return der_1$1;
}
var pem$1, hasRequiredPem$1;
function requirePem$1() {
  if (hasRequiredPem$1)
    return pem$1;
  hasRequiredPem$1 = 1;
  var $ = requireInherits_browser(), h = requireBuffer$1().Buffer, U = requireDer$1();
  function B(V) {
    U.call(this, V), this.enc = "pem";
  }
  return $(B, U), pem$1 = B, B.prototype.decode = function(V, t) {
    for (var O = V.toString().split(/[\r\n]+/g), M = t.label.toUpperCase(), D = /^-----(BEGIN|END) ([^-]+)-----$/, I = -1, P = -1, Y = 0; Y < O.length; Y++) {
      var X = O[Y].match(D);
      if (X !== null && X[2] === M)
        if (I === -1) {
          if (X[1] !== "BEGIN")
            break;
          I = Y;
        } else {
          if (X[1] !== "END")
            break;
          P = Y;
          break;
        }
    }
    if (I === -1 || P === -1)
      throw new Error("PEM section not found for: " + M);
    var ee = O.slice(I + 1, P).join("");
    ee.replace(/[^a-z0-9\+\/=]+/gi, "");
    var re = new h(ee, "base64");
    return U.prototype.decode.call(this, re, t);
  }, pem$1;
}
var hasRequiredDecoders;
function requireDecoders() {
  return hasRequiredDecoders || (hasRequiredDecoders = 1, function($) {
    var h = $;
    h.der = requireDer$1(), h.pem = requirePem$1();
  }(decoders)), decoders;
}
var encoders = {}, der_1, hasRequiredDer;
function requireDer() {
  if (hasRequiredDer)
    return der_1;
  hasRequiredDer = 1;
  var $ = requireInherits_browser(), h = requireBuffer$1().Buffer, U = requireAsn1$1(), B = U.base, V = U.constants.der;
  function t(I) {
    this.enc = "der", this.name = I.name, this.entity = I, this.tree = new O(), this.tree._init(I.body);
  }
  der_1 = t, t.prototype.encode = function(I, P) {
    return this.tree._encode(I, P).join();
  };
  function O(I) {
    B.Node.call(this, "der", I);
  }
  $(O, B.Node), O.prototype._encodeComposite = function(I, P, Y, X) {
    var ee = D(I, P, Y, this.reporter);
    if (X.length < 128) {
      var ne = new h(2);
      return ne[0] = ee, ne[1] = X.length, this._createEncoderBuffer([ne, X]);
    }
    for (var re = 1, ie = X.length; ie >= 256; ie >>= 8)
      re++;
    var ne = new h(2 + re);
    ne[0] = ee, ne[1] = 128 | re;
    for (var ie = 1 + re, se = X.length; se > 0; ie--, se >>= 8)
      ne[ie] = se & 255;
    return this._createEncoderBuffer([ne, X]);
  }, O.prototype._encodeStr = function(I, P) {
    if (P === "bitstr")
      return this._createEncoderBuffer([I.unused | 0, I.data]);
    if (P === "bmpstr") {
      for (var Y = new h(I.length * 2), X = 0; X < I.length; X++)
        Y.writeUInt16BE(I.charCodeAt(X), X * 2);
      return this._createEncoderBuffer(Y);
    } else
      return P === "numstr" ? this._isNumstr(I) ? this._createEncoderBuffer(I) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : P === "printstr" ? this._isPrintstr(I) ? this._createEncoderBuffer(I) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(P) ? this._createEncoderBuffer(I) : P === "objDesc" ? this._createEncoderBuffer(I) : this.reporter.error("Encoding of string type: " + P + " unsupported");
  }, O.prototype._encodeObjid = function(I, P, Y) {
    if (typeof I == "string") {
      if (!P)
        return this.reporter.error("string objid given, but no values map found");
      if (!P.hasOwnProperty(I))
        return this.reporter.error("objid not found in values map");
      I = P[I].split(/[\s\.]+/g);
      for (var X = 0; X < I.length; X++)
        I[X] |= 0;
    } else if (Array.isArray(I)) {
      I = I.slice();
      for (var X = 0; X < I.length; X++)
        I[X] |= 0;
    }
    if (!Array.isArray(I))
      return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(I));
    if (!Y) {
      if (I[1] >= 40)
        return this.reporter.error("Second objid identifier OOB");
      I.splice(0, 2, I[0] * 40 + I[1]);
    }
    for (var ee = 0, X = 0; X < I.length; X++) {
      var re = I[X];
      for (ee++; re >= 128; re >>= 7)
        ee++;
    }
    for (var ie = new h(ee), ne = ie.length - 1, X = I.length - 1; X >= 0; X--) {
      var re = I[X];
      for (ie[ne--] = re & 127; (re >>= 7) > 0; )
        ie[ne--] = 128 | re & 127;
    }
    return this._createEncoderBuffer(ie);
  };
  function M(I) {
    return I < 10 ? "0" + I : I;
  }
  O.prototype._encodeTime = function(I, P) {
    var Y, X = new Date(I);
    return P === "gentime" ? Y = [
      M(X.getFullYear()),
      M(X.getUTCMonth() + 1),
      M(X.getUTCDate()),
      M(X.getUTCHours()),
      M(X.getUTCMinutes()),
      M(X.getUTCSeconds()),
      "Z"
    ].join("") : P === "utctime" ? Y = [
      M(X.getFullYear() % 100),
      M(X.getUTCMonth() + 1),
      M(X.getUTCDate()),
      M(X.getUTCHours()),
      M(X.getUTCMinutes()),
      M(X.getUTCSeconds()),
      "Z"
    ].join("") : this.reporter.error("Encoding " + P + " time is not supported yet"), this._encodeStr(Y, "octstr");
  }, O.prototype._encodeNull = function() {
    return this._createEncoderBuffer("");
  }, O.prototype._encodeInt = function(I, P) {
    if (typeof I == "string") {
      if (!P)
        return this.reporter.error("String int or enum given, but no values map");
      if (!P.hasOwnProperty(I))
        return this.reporter.error("Values map doesn't contain: " + JSON.stringify(I));
      I = P[I];
    }
    if (typeof I != "number" && !h.isBuffer(I)) {
      var Y = I.toArray();
      !I.sign && Y[0] & 128 && Y.unshift(0), I = new h(Y);
    }
    if (h.isBuffer(I)) {
      var X = I.length;
      I.length === 0 && X++;
      var ee = new h(X);
      return I.copy(ee), I.length === 0 && (ee[0] = 0), this._createEncoderBuffer(ee);
    }
    if (I < 128)
      return this._createEncoderBuffer(I);
    if (I < 256)
      return this._createEncoderBuffer([0, I]);
    for (var X = 1, re = I; re >= 256; re >>= 8)
      X++;
    for (var ee = new Array(X), re = ee.length - 1; re >= 0; re--)
      ee[re] = I & 255, I >>= 8;
    return ee[0] & 128 && ee.unshift(0), this._createEncoderBuffer(new h(ee));
  }, O.prototype._encodeBool = function(I) {
    return this._createEncoderBuffer(I ? 255 : 0);
  }, O.prototype._use = function(I, P) {
    return typeof I == "function" && (I = I(P)), I._getEncoder("der").tree;
  }, O.prototype._skipDefault = function(I, P, Y) {
    var X = this._baseState, ee;
    if (X.default === null)
      return !1;
    var re = I.join();
    if (X.defaultBuffer === void 0 && (X.defaultBuffer = this._encodeValue(X.default, P, Y).join()), re.length !== X.defaultBuffer.length)
      return !1;
    for (ee = 0; ee < re.length; ee++)
      if (re[ee] !== X.defaultBuffer[ee])
        return !1;
    return !0;
  };
  function D(I, P, Y, X) {
    var ee;
    if (I === "seqof" ? I = "seq" : I === "setof" && (I = "set"), V.tagByName.hasOwnProperty(I))
      ee = V.tagByName[I];
    else if (typeof I == "number" && (I | 0) === I)
      ee = I;
    else
      return X.error("Unknown tag: " + I);
    return ee >= 31 ? X.error("Multi-octet tag encoding unsupported") : (P || (ee |= 32), ee |= V.tagClassByName[Y || "universal"] << 6, ee);
  }
  return der_1;
}
var pem, hasRequiredPem;
function requirePem() {
  if (hasRequiredPem)
    return pem;
  hasRequiredPem = 1;
  var $ = requireInherits_browser(), h = requireDer();
  function U(B) {
    h.call(this, B), this.enc = "pem";
  }
  return $(U, h), pem = U, U.prototype.encode = function(B, V) {
    for (var t = h.prototype.encode.call(this, B), O = t.toString("base64"), M = ["-----BEGIN " + V.label + "-----"], D = 0; D < O.length; D += 64)
      M.push(O.slice(D, D + 64));
    return M.push("-----END " + V.label + "-----"), M.join(`
`);
  }, pem;
}
var hasRequiredEncoders;
function requireEncoders() {
  return hasRequiredEncoders || (hasRequiredEncoders = 1, function($) {
    var h = $;
    h.der = requireDer(), h.pem = requirePem();
  }(encoders)), encoders;
}
var hasRequiredAsn1$1;
function requireAsn1$1() {
  return hasRequiredAsn1$1 || (hasRequiredAsn1$1 = 1, function($) {
    var h = $;
    h.bignum = requireBn$2(), h.define = requireApi().define, h.base = requireBase(), h.constants = requireConstants(), h.decoders = requireDecoders(), h.encoders = requireEncoders();
  }(asn1)), asn1;
}
var certificate, hasRequiredCertificate;
function requireCertificate() {
  if (hasRequiredCertificate)
    return certificate;
  hasRequiredCertificate = 1;
  var $ = requireAsn1$1(), h = $.define("Time", function() {
    this.choice({
      utcTime: this.utctime(),
      generalTime: this.gentime()
    });
  }), U = $.define("AttributeTypeValue", function() {
    this.seq().obj(
      this.key("type").objid(),
      this.key("value").any()
    );
  }), B = $.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("parameters").optional(),
      this.key("curve").objid().optional()
    );
  }), V = $.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(B),
      this.key("subjectPublicKey").bitstr()
    );
  }), t = $.define("RelativeDistinguishedName", function() {
    this.setof(U);
  }), O = $.define("RDNSequence", function() {
    this.seqof(t);
  }), M = $.define("Name", function() {
    this.choice({
      rdnSequence: this.use(O)
    });
  }), D = $.define("Validity", function() {
    this.seq().obj(
      this.key("notBefore").use(h),
      this.key("notAfter").use(h)
    );
  }), I = $.define("Extension", function() {
    this.seq().obj(
      this.key("extnID").objid(),
      this.key("critical").bool().def(!1),
      this.key("extnValue").octstr()
    );
  }), P = $.define("TBSCertificate", function() {
    this.seq().obj(
      this.key("version").explicit(0).int().optional(),
      this.key("serialNumber").int(),
      this.key("signature").use(B),
      this.key("issuer").use(M),
      this.key("validity").use(D),
      this.key("subject").use(M),
      this.key("subjectPublicKeyInfo").use(V),
      this.key("issuerUniqueID").implicit(1).bitstr().optional(),
      this.key("subjectUniqueID").implicit(2).bitstr().optional(),
      this.key("extensions").explicit(3).seqof(I).optional()
    );
  }), Y = $.define("X509Certificate", function() {
    this.seq().obj(
      this.key("tbsCertificate").use(P),
      this.key("signatureAlgorithm").use(B),
      this.key("signatureValue").bitstr()
    );
  });
  return certificate = Y, certificate;
}
var hasRequiredAsn1;
function requireAsn1() {
  if (hasRequiredAsn1)
    return asn1$1;
  hasRequiredAsn1 = 1;
  var $ = requireAsn1$1();
  asn1$1.certificate = requireCertificate();
  var h = $.define("RSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("modulus").int(),
      this.key("publicExponent").int(),
      this.key("privateExponent").int(),
      this.key("prime1").int(),
      this.key("prime2").int(),
      this.key("exponent1").int(),
      this.key("exponent2").int(),
      this.key("coefficient").int()
    );
  });
  asn1$1.RSAPrivateKey = h;
  var U = $.define("RSAPublicKey", function() {
    this.seq().obj(
      this.key("modulus").int(),
      this.key("publicExponent").int()
    );
  });
  asn1$1.RSAPublicKey = U;
  var B = $.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("none").null_().optional(),
      this.key("curve").objid().optional(),
      this.key("params").seq().obj(
        this.key("p").int(),
        this.key("q").int(),
        this.key("g").int()
      ).optional()
    );
  }), V = $.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(B),
      this.key("subjectPublicKey").bitstr()
    );
  });
  asn1$1.PublicKey = V;
  var t = $.define("PrivateKeyInfo", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("algorithm").use(B),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.PrivateKey = t;
  var O = $.define("EncryptedPrivateKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").seq().obj(
        this.key("id").objid(),
        this.key("decrypt").seq().obj(
          this.key("kde").seq().obj(
            this.key("id").objid(),
            this.key("kdeparams").seq().obj(
              this.key("salt").octstr(),
              this.key("iters").int()
            )
          ),
          this.key("cipher").seq().obj(
            this.key("algo").objid(),
            this.key("iv").octstr()
          )
        )
      ),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.EncryptedPrivateKey = O;
  var M = $.define("DSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("p").int(),
      this.key("q").int(),
      this.key("g").int(),
      this.key("pub_key").int(),
      this.key("priv_key").int()
    );
  });
  asn1$1.DSAPrivateKey = M, asn1$1.DSAparam = $.define("DSAparam", function() {
    this.int();
  });
  var D = $.define("ECParameters", function() {
    this.choice({
      namedCurve: this.objid()
    });
  }), I = $.define("ECPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("privateKey").octstr(),
      this.key("parameters").optional().explicit(0).use(D),
      this.key("publicKey").optional().explicit(1).bitstr()
    );
  });
  return asn1$1.ECPrivateKey = I, asn1$1.signature = $.define("signature", function() {
    this.seq().obj(
      this.key("r").int(),
      this.key("s").int()
    );
  }), asn1$1;
}
const require$$1 = {
  "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
  "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
  "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
  "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
  "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
  "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
  "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
  "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
  "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
  "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
  "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
  "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};
var fixProc, hasRequiredFixProc;
function requireFixProc() {
  if (hasRequiredFixProc)
    return fixProc;
  hasRequiredFixProc = 1;
  var $ = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m, h = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, U = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m, B = requireEvp_bytestokey(), V = requireBrowser$6(), t = requireSafeBuffer$1().Buffer;
  return fixProc = function(O, M) {
    var D = O.toString(), I = D.match($), P;
    if (I) {
      var Y = "aes" + I[1], X = t.from(I[2], "hex"), ee = t.from(I[3].replace(/[\r\n]/g, ""), "base64"), re = B(M, X.slice(0, 8), parseInt(I[1], 10)).key, ie = [], ne = V.createDecipheriv(Y, re, X);
      ie.push(ne.update(ee)), ie.push(ne.final()), P = t.concat(ie);
    } else {
      var se = D.match(U);
      P = t.from(se[2].replace(/[\r\n]/g, ""), "base64");
    }
    var oe = D.match(h)[1];
    return {
      tag: oe,
      data: P
    };
  }, fixProc;
}
var parseAsn1, hasRequiredParseAsn1;
function requireParseAsn1() {
  if (hasRequiredParseAsn1)
    return parseAsn1;
  hasRequiredParseAsn1 = 1;
  var $ = requireAsn1(), h = require$$1, U = requireFixProc(), B = requireBrowser$6(), V = requireBrowser$7(), t = requireSafeBuffer$1().Buffer;
  function O(D, I) {
    var P = D.algorithm.decrypt.kde.kdeparams.salt, Y = parseInt(D.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), X = h[D.algorithm.decrypt.cipher.algo.join(".")], ee = D.algorithm.decrypt.cipher.iv, re = D.subjectPrivateKey, ie = parseInt(X.split("-")[1], 10) / 8, ne = V.pbkdf2Sync(I, P, Y, ie, "sha1"), se = B.createDecipheriv(X, ne, ee), oe = [];
    return oe.push(se.update(re)), oe.push(se.final()), t.concat(oe);
  }
  function M(D) {
    var I;
    typeof D == "object" && !t.isBuffer(D) && (I = D.passphrase, D = D.key), typeof D == "string" && (D = t.from(D));
    var P = U(D, I), Y = P.tag, X = P.data, ee, re;
    switch (Y) {
      case "CERTIFICATE":
        re = $.certificate.decode(X, "der").tbsCertificate.subjectPublicKeyInfo;
      case "PUBLIC KEY":
        switch (re || (re = $.PublicKey.decode(X, "der")), ee = re.algorithm.algorithm.join("."), ee) {
          case "1.2.840.113549.1.1.1":
            return $.RSAPublicKey.decode(re.subjectPublicKey.data, "der");
          case "1.2.840.10045.2.1":
            return re.subjectPrivateKey = re.subjectPublicKey, {
              type: "ec",
              data: re
            };
          case "1.2.840.10040.4.1":
            return re.algorithm.params.pub_key = $.DSAparam.decode(re.subjectPublicKey.data, "der"), {
              type: "dsa",
              data: re.algorithm.params
            };
          default:
            throw new Error("unknown key id " + ee);
        }
      case "ENCRYPTED PRIVATE KEY":
        X = $.EncryptedPrivateKey.decode(X, "der"), X = O(X, I);
      case "PRIVATE KEY":
        switch (re = $.PrivateKey.decode(X, "der"), ee = re.algorithm.algorithm.join("."), ee) {
          case "1.2.840.113549.1.1.1":
            return $.RSAPrivateKey.decode(re.subjectPrivateKey, "der");
          case "1.2.840.10045.2.1":
            return {
              curve: re.algorithm.curve,
              privateKey: $.ECPrivateKey.decode(re.subjectPrivateKey, "der").privateKey
            };
          case "1.2.840.10040.4.1":
            return re.algorithm.params.priv_key = $.DSAparam.decode(re.subjectPrivateKey, "der"), {
              type: "dsa",
              params: re.algorithm.params
            };
          default:
            throw new Error("unknown key id " + ee);
        }
      case "RSA PUBLIC KEY":
        return $.RSAPublicKey.decode(X, "der");
      case "RSA PRIVATE KEY":
        return $.RSAPrivateKey.decode(X, "der");
      case "DSA PRIVATE KEY":
        return {
          type: "dsa",
          params: $.DSAPrivateKey.decode(X, "der")
        };
      case "EC PRIVATE KEY":
        return X = $.ECPrivateKey.decode(X, "der"), {
          curve: X.parameters.value,
          privateKey: X.privateKey
        };
      default:
        throw new Error("unknown key type " + Y);
    }
  }
  return M.signature = $.signature, parseAsn1 = M, parseAsn1;
}
const require$$4 = {
  "1.3.132.0.10": "secp256k1",
  "1.3.132.0.33": "p224",
  "1.2.840.10045.3.1.1": "p192",
  "1.2.840.10045.3.1.7": "p256",
  "1.3.132.0.34": "p384",
  "1.3.132.0.35": "p521"
};
var hasRequiredSign;
function requireSign() {
  if (hasRequiredSign)
    return sign.exports;
  hasRequiredSign = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireBrowser$8(), U = requireBrowserifyRsa(), B = requireElliptic().ec, V = requireBn(), t = requireParseAsn1(), O = require$$4, M = 1;
  function D(se, oe, be, de, we) {
    var Se = t(oe);
    if (Se.curve) {
      if (de !== "ecdsa" && de !== "ecdsa/rsa")
        throw new Error("wrong private key type");
      return I(se, Se);
    } else if (Se.type === "dsa") {
      if (de !== "dsa")
        throw new Error("wrong private key type");
      return P(se, Se, be);
    }
    if (de !== "rsa" && de !== "ecdsa/rsa")
      throw new Error("wrong private key type");
    if (oe.padding !== void 0 && oe.padding !== M)
      throw new Error("illegal or unsupported padding mode");
    se = $.concat([we, se]);
    for (var ke = Se.modulus.byteLength(), he = [0, 1]; se.length + he.length + 1 < ke; )
      he.push(255);
    he.push(0);
    for (var le = -1; ++le < se.length; )
      he.push(se[le]);
    var _e = U(he, Se);
    return _e;
  }
  function I(se, oe) {
    var be = O[oe.curve.join(".")];
    if (!be)
      throw new Error("unknown curve " + oe.curve.join("."));
    var de = new B(be), we = de.keyFromPrivate(oe.privateKey), Se = we.sign(se);
    return $.from(Se.toDER());
  }
  function P(se, oe, be) {
    for (var de = oe.params.priv_key, we = oe.params.p, Se = oe.params.q, ke = oe.params.g, he = new V(0), le, _e = ee(se, Se).mod(Se), G = !1, Z = X(de, Se, se, be); G === !1; )
      le = ie(Se, Z, be), he = ne(ke, le, we, Se), G = le.invm(Se).imul(_e.add(de.mul(he))).mod(Se), G.cmpn(0) === 0 && (G = !1, he = new V(0));
    return Y(he, G);
  }
  function Y(se, oe) {
    se = se.toArray(), oe = oe.toArray(), se[0] & 128 && (se = [0].concat(se)), oe[0] & 128 && (oe = [0].concat(oe));
    var be = se.length + oe.length + 4, de = [
      48,
      be,
      2,
      se.length
    ];
    return de = de.concat(se, [2, oe.length], oe), $.from(de);
  }
  function X(se, oe, be, de) {
    if (se = $.from(se.toArray()), se.length < oe.byteLength()) {
      var we = $.alloc(oe.byteLength() - se.length);
      se = $.concat([we, se]);
    }
    var Se = be.length, ke = re(be, oe), he = $.alloc(Se);
    he.fill(1);
    var le = $.alloc(Se);
    return le = h(de, le).update(he).update($.from([0])).update(se).update(ke).digest(), he = h(de, le).update(he).digest(), le = h(de, le).update(he).update($.from([1])).update(se).update(ke).digest(), he = h(de, le).update(he).digest(), { k: le, v: he };
  }
  function ee(se, oe) {
    var be = new V(se), de = (se.length << 3) - oe.bitLength();
    return de > 0 && be.ishrn(de), be;
  }
  function re(se, oe) {
    se = ee(se, oe), se = se.mod(oe);
    var be = $.from(se.toArray());
    if (be.length < oe.byteLength()) {
      var de = $.alloc(oe.byteLength() - be.length);
      be = $.concat([de, be]);
    }
    return be;
  }
  function ie(se, oe, be) {
    var de, we;
    do {
      for (de = $.alloc(0); de.length * 8 < se.bitLength(); )
        oe.v = h(be, oe.k).update(oe.v).digest(), de = $.concat([de, oe.v]);
      we = ee(de, se), oe.k = h(be, oe.k).update(oe.v).update($.from([0])).digest(), oe.v = h(be, oe.k).update(oe.v).digest();
    } while (we.cmp(se) !== -1);
    return we;
  }
  function ne(se, oe, be, de) {
    return se.toRed(V.mont(be)).redPow(oe).fromRed().mod(de);
  }
  return sign.exports = D, sign.exports.getKey = X, sign.exports.makeKey = ie, sign.exports;
}
var verify_1, hasRequiredVerify;
function requireVerify() {
  if (hasRequiredVerify)
    return verify_1;
  hasRequiredVerify = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireBn(), U = requireElliptic().ec, B = requireParseAsn1(), V = require$$4;
  function t(I, P, Y, X, ee) {
    var re = B(Y);
    if (re.type === "ec") {
      if (X !== "ecdsa" && X !== "ecdsa/rsa")
        throw new Error("wrong public key type");
      return O(I, P, re);
    } else if (re.type === "dsa") {
      if (X !== "dsa")
        throw new Error("wrong public key type");
      return M(I, P, re);
    }
    if (X !== "rsa" && X !== "ecdsa/rsa")
      throw new Error("wrong public key type");
    P = $.concat([ee, P]);
    for (var ie = re.modulus.byteLength(), ne = [1], se = 0; P.length + ne.length + 2 < ie; )
      ne.push(255), se += 1;
    ne.push(0);
    for (var oe = -1; ++oe < P.length; )
      ne.push(P[oe]);
    ne = $.from(ne);
    var be = h.mont(re.modulus);
    I = new h(I).toRed(be), I = I.redPow(new h(re.publicExponent)), I = $.from(I.fromRed().toArray());
    var de = se < 8 ? 1 : 0;
    for (ie = Math.min(I.length, ne.length), I.length !== ne.length && (de = 1), oe = -1; ++oe < ie; )
      de |= I[oe] ^ ne[oe];
    return de === 0;
  }
  function O(I, P, Y) {
    var X = V[Y.data.algorithm.curve.join(".")];
    if (!X)
      throw new Error("unknown curve " + Y.data.algorithm.curve.join("."));
    var ee = new U(X), re = Y.data.subjectPrivateKey.data;
    return ee.verify(P, I, re);
  }
  function M(I, P, Y) {
    var X = Y.data.p, ee = Y.data.q, re = Y.data.g, ie = Y.data.pub_key, ne = B.signature.decode(I, "der"), se = ne.s, oe = ne.r;
    D(se, ee), D(oe, ee);
    var be = h.mont(X), de = se.invm(ee), we = re.toRed(be).redPow(new h(P).mul(de).mod(ee)).fromRed().mul(ie.toRed(be).redPow(oe.mul(de).mod(ee)).fromRed()).mod(X).mod(ee);
    return we.cmp(oe) === 0;
  }
  function D(I, P) {
    if (I.cmpn(0) <= 0)
      throw new Error("invalid sig");
    if (I.cmp(P) >= 0)
      throw new Error("invalid sig");
  }
  return verify_1 = t, verify_1;
}
var browser$3, hasRequiredBrowser$3;
function requireBrowser$3() {
  if (hasRequiredBrowser$3)
    return browser$3;
  hasRequiredBrowser$3 = 1;
  var $ = requireSafeBuffer$1().Buffer, h = requireBrowser$9(), U = requireReadableBrowser(), B = requireInherits_browser(), V = requireSign(), t = requireVerify(), O = require$$6;
  Object.keys(O).forEach(function(Y) {
    O[Y].id = $.from(O[Y].id, "hex"), O[Y.toLowerCase()] = O[Y];
  });
  function M(Y) {
    U.Writable.call(this);
    var X = O[Y];
    if (!X)
      throw new Error("Unknown message digest");
    this._hashType = X.hash, this._hash = h(X.hash), this._tag = X.id, this._signType = X.sign;
  }
  B(M, U.Writable), M.prototype._write = function(Y, X, ee) {
    this._hash.update(Y), ee();
  }, M.prototype.update = function(Y, X) {
    return this._hash.update(typeof Y == "string" ? $.from(Y, X) : Y), this;
  }, M.prototype.sign = function(Y, X) {
    this.end();
    var ee = this._hash.digest(), re = V(ee, Y, this._hashType, this._signType, this._tag);
    return X ? re.toString(X) : re;
  };
  function D(Y) {
    U.Writable.call(this);
    var X = O[Y];
    if (!X)
      throw new Error("Unknown message digest");
    this._hash = h(X.hash), this._tag = X.id, this._signType = X.sign;
  }
  B(D, U.Writable), D.prototype._write = function(Y, X, ee) {
    this._hash.update(Y), ee();
  }, D.prototype.update = function(Y, X) {
    return this._hash.update(typeof Y == "string" ? $.from(Y, X) : Y), this;
  }, D.prototype.verify = function(Y, X, ee) {
    var re = typeof X == "string" ? $.from(X, ee) : X;
    this.end();
    var ie = this._hash.digest();
    return t(re, ie, Y, this._signType, this._tag);
  };
  function I(Y) {
    return new M(Y);
  }
  function P(Y) {
    return new D(Y);
  }
  return browser$3 = {
    Sign: I,
    Verify: P,
    createSign: I,
    createVerify: P
  }, browser$3;
}
var browser$2, hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2)
    return browser$2;
  hasRequiredBrowser$2 = 1;
  var $ = requireElliptic(), h = requireBn$2();
  browser$2 = function(t) {
    return new B(t);
  };
  var U = {
    secp256k1: {
      name: "secp256k1",
      byteLength: 32
    },
    secp224r1: {
      name: "p224",
      byteLength: 28
    },
    prime256v1: {
      name: "p256",
      byteLength: 32
    },
    prime192v1: {
      name: "p192",
      byteLength: 24
    },
    ed25519: {
      name: "ed25519",
      byteLength: 32
    },
    secp384r1: {
      name: "p384",
      byteLength: 48
    },
    secp521r1: {
      name: "p521",
      byteLength: 66
    }
  };
  U.p224 = U.secp224r1, U.p256 = U.secp256r1 = U.prime256v1, U.p192 = U.secp192r1 = U.prime192v1, U.p384 = U.secp384r1, U.p521 = U.secp521r1;
  function B(t) {
    this.curveType = U[t], this.curveType || (this.curveType = {
      name: t
    }), this.curve = new $.ec(this.curveType.name), this.keys = void 0;
  }
  B.prototype.generateKeys = function(t, O) {
    return this.keys = this.curve.genKeyPair(), this.getPublicKey(t, O);
  }, B.prototype.computeSecret = function(t, O, M) {
    O = O || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, O));
    var D = this.curve.keyFromPublic(t).getPublic(), I = D.mul(this.keys.getPrivate()).getX();
    return V(I, M, this.curveType.byteLength);
  }, B.prototype.getPublicKey = function(t, O) {
    var M = this.keys.getPublic(O === "compressed", !0);
    return O === "hybrid" && (M[M.length - 1] % 2 ? M[0] = 7 : M[0] = 6), V(M, t);
  }, B.prototype.getPrivateKey = function(t) {
    return V(this.keys.getPrivate(), t);
  }, B.prototype.setPublicKey = function(t, O) {
    return O = O || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, O)), this.keys._importPublic(t), this;
  }, B.prototype.setPrivateKey = function(t, O) {
    O = O || "utf8", bufferExports.Buffer.isBuffer(t) || (t = new bufferExports.Buffer(t, O));
    var M = new h(t);
    return M = M.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(M), this;
  };
  function V(t, O, M) {
    Array.isArray(t) || (t = t.toArray());
    var D = new bufferExports.Buffer(t);
    if (M && D.length < M) {
      var I = new bufferExports.Buffer(M - D.length);
      I.fill(0), D = bufferExports.Buffer.concat([I, D]);
    }
    return O ? D.toString(O) : D;
  }
  return browser$2;
}
var browser$1 = {}, mgf, hasRequiredMgf;
function requireMgf() {
  if (hasRequiredMgf)
    return mgf;
  hasRequiredMgf = 1;
  var $ = requireBrowser$9(), h = requireSafeBuffer$1().Buffer;
  mgf = function(B, V) {
    for (var t = h.alloc(0), O = 0, M; t.length < V; )
      M = U(O++), t = h.concat([t, $("sha1").update(B).update(M).digest()]);
    return t.slice(0, V);
  };
  function U(B) {
    var V = h.allocUnsafe(4);
    return V.writeUInt32BE(B, 0), V;
  }
  return mgf;
}
var xor, hasRequiredXor;
function requireXor() {
  return hasRequiredXor || (hasRequiredXor = 1, xor = function($, h) {
    for (var U = $.length, B = -1; ++B < U; )
      $[B] ^= h[B];
    return $;
  }), xor;
}
var withPublic_1, hasRequiredWithPublic;
function requireWithPublic() {
  if (hasRequiredWithPublic)
    return withPublic_1;
  hasRequiredWithPublic = 1;
  var $ = requireBn$2(), h = requireSafeBuffer$1().Buffer;
  function U(B, V) {
    return h.from(B.toRed($.mont(V.modulus)).redPow(new $(V.publicExponent)).fromRed().toArray());
  }
  return withPublic_1 = U, withPublic_1;
}
var publicEncrypt, hasRequiredPublicEncrypt;
function requirePublicEncrypt() {
  if (hasRequiredPublicEncrypt)
    return publicEncrypt;
  hasRequiredPublicEncrypt = 1;
  var $ = requireParseAsn1(), h = requireBrowser$b(), U = requireBrowser$9(), B = requireMgf(), V = requireXor(), t = requireBn$2(), O = requireWithPublic(), M = requireBrowserifyRsa(), D = requireSafeBuffer$1().Buffer;
  publicEncrypt = function(X, ee, re) {
    var ie;
    X.padding ? ie = X.padding : re ? ie = 1 : ie = 4;
    var ne = $(X), se;
    if (ie === 4)
      se = I(ne, ee);
    else if (ie === 1)
      se = P(ne, ee, re);
    else if (ie === 3) {
      if (se = new t(ee), se.cmp(ne.modulus) >= 0)
        throw new Error("data too long for modulus");
    } else
      throw new Error("unknown padding");
    return re ? M(se, ne) : O(se, ne);
  };
  function I(X, ee) {
    var re = X.modulus.byteLength(), ie = ee.length, ne = U("sha1").update(D.alloc(0)).digest(), se = ne.length, oe = 2 * se;
    if (ie > re - oe - 2)
      throw new Error("message too long");
    var be = D.alloc(re - ie - oe - 2), de = re - se - 1, we = h(se), Se = V(D.concat([ne, be, D.alloc(1, 1), ee], de), B(we, de)), ke = V(we, B(Se, se));
    return new t(D.concat([D.alloc(1), ke, Se], re));
  }
  function P(X, ee, re) {
    var ie = ee.length, ne = X.modulus.byteLength();
    if (ie > ne - 11)
      throw new Error("message too long");
    var se;
    return re ? se = D.alloc(ne - ie - 3, 255) : se = Y(ne - ie - 3), new t(D.concat([D.from([0, re ? 1 : 2]), se, D.alloc(1), ee], ne));
  }
  function Y(X) {
    for (var ee = D.allocUnsafe(X), re = 0, ie = h(X * 2), ne = 0, se; re < X; )
      ne === ie.length && (ie = h(X * 2), ne = 0), se = ie[ne++], se && (ee[re++] = se);
    return ee;
  }
  return publicEncrypt;
}
var privateDecrypt, hasRequiredPrivateDecrypt;
function requirePrivateDecrypt() {
  if (hasRequiredPrivateDecrypt)
    return privateDecrypt;
  hasRequiredPrivateDecrypt = 1;
  var $ = requireParseAsn1(), h = requireMgf(), U = requireXor(), B = requireBn$2(), V = requireBrowserifyRsa(), t = requireBrowser$9(), O = requireWithPublic(), M = requireSafeBuffer$1().Buffer;
  privateDecrypt = function(Y, X, ee) {
    var re;
    Y.padding ? re = Y.padding : ee ? re = 1 : re = 4;
    var ie = $(Y), ne = ie.modulus.byteLength();
    if (X.length > ne || new B(X).cmp(ie.modulus) >= 0)
      throw new Error("decryption error");
    var se;
    ee ? se = O(new B(X), ie) : se = V(X, ie);
    var oe = M.alloc(ne - se.length);
    if (se = M.concat([oe, se], ne), re === 4)
      return D(ie, se);
    if (re === 1)
      return I(ie, se, ee);
    if (re === 3)
      return se;
    throw new Error("unknown padding");
  };
  function D(Y, X) {
    var ee = Y.modulus.byteLength(), re = t("sha1").update(M.alloc(0)).digest(), ie = re.length;
    if (X[0] !== 0)
      throw new Error("decryption error");
    var ne = X.slice(1, ie + 1), se = X.slice(ie + 1), oe = U(ne, h(se, ie)), be = U(se, h(oe, ee - ie - 1));
    if (P(re, be.slice(0, ie)))
      throw new Error("decryption error");
    for (var de = ie; be[de] === 0; )
      de++;
    if (be[de++] !== 1)
      throw new Error("decryption error");
    return be.slice(de);
  }
  function I(Y, X, ee) {
    for (var re = X.slice(0, 2), ie = 2, ne = 0; X[ie++] !== 0; )
      if (ie >= X.length) {
        ne++;
        break;
      }
    var se = X.slice(2, ie - 1);
    if ((re.toString("hex") !== "0002" && !ee || re.toString("hex") !== "0001" && ee) && ne++, se.length < 8 && ne++, ne)
      throw new Error("decryption error");
    return X.slice(ie);
  }
  function P(Y, X) {
    Y = M.from(Y), X = M.from(X);
    var ee = 0, re = Y.length;
    Y.length !== X.length && (ee++, re = Math.min(Y.length, X.length));
    for (var ie = -1; ++ie < re; )
      ee += Y[ie] ^ X[ie];
    return ee;
  }
  return privateDecrypt;
}
var hasRequiredBrowser$1;
function requireBrowser$1() {
  return hasRequiredBrowser$1 || (hasRequiredBrowser$1 = 1, function($) {
    $.publicEncrypt = requirePublicEncrypt(), $.privateDecrypt = requirePrivateDecrypt(), $.privateEncrypt = function(h, U) {
      return $.publicEncrypt(h, U, !0);
    }, $.publicDecrypt = function(h, U) {
      return $.privateDecrypt(h, U, !0);
    };
  }(browser$1)), browser$1;
}
var browser = {}, hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser)
    return browser;
  hasRequiredBrowser = 1;
  function $() {
    throw new Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`);
  }
  var h = requireSafeBuffer$1(), U = requireBrowser$b(), B = h.Buffer, V = h.kMaxLength, t = commonjsGlobal.crypto || commonjsGlobal.msCrypto, O = Math.pow(2, 32) - 1;
  function M(X, ee) {
    if (typeof X != "number" || X !== X)
      throw new TypeError("offset must be a number");
    if (X > O || X < 0)
      throw new TypeError("offset must be a uint32");
    if (X > V || X > ee)
      throw new RangeError("offset out of range");
  }
  function D(X, ee, re) {
    if (typeof X != "number" || X !== X)
      throw new TypeError("size must be a number");
    if (X > O || X < 0)
      throw new TypeError("size must be a uint32");
    if (X + ee > re || X > V)
      throw new RangeError("buffer too small");
  }
  t && t.getRandomValues || !process$1.browser ? (browser.randomFill = I, browser.randomFillSync = Y) : (browser.randomFill = $, browser.randomFillSync = $);
  function I(X, ee, re, ie) {
    if (!B.isBuffer(X) && !(X instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    if (typeof ee == "function")
      ie = ee, ee = 0, re = X.length;
    else if (typeof re == "function")
      ie = re, re = X.length - ee;
    else if (typeof ie != "function")
      throw new TypeError('"cb" argument must be a function');
    return M(ee, X.length), D(re, ee, X.length), P(X, ee, re, ie);
  }
  function P(X, ee, re, ie) {
    if (process$1.browser) {
      var ne = X.buffer, se = new Uint8Array(ne, ee, re);
      if (t.getRandomValues(se), ie) {
        process$1.nextTick(function() {
          ie(null, X);
        });
        return;
      }
      return X;
    }
    if (ie) {
      U(re, function(be, de) {
        if (be)
          return ie(be);
        de.copy(X, ee), ie(null, X);
      });
      return;
    }
    var oe = U(re);
    return oe.copy(X, ee), X;
  }
  function Y(X, ee, re) {
    if (typeof ee > "u" && (ee = 0), !B.isBuffer(X) && !(X instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    return M(ee, X.length), re === void 0 && (re = X.length - ee), D(re, ee, X.length), P(X, ee, re);
  }
  return browser;
}
var hasRequiredCryptoBrowserify;
function requireCryptoBrowserify() {
  if (hasRequiredCryptoBrowserify)
    return cryptoBrowserify;
  hasRequiredCryptoBrowserify = 1, cryptoBrowserify.randomBytes = cryptoBrowserify.rng = cryptoBrowserify.pseudoRandomBytes = cryptoBrowserify.prng = requireBrowser$b(), cryptoBrowserify.createHash = cryptoBrowserify.Hash = requireBrowser$9(), cryptoBrowserify.createHmac = cryptoBrowserify.Hmac = requireBrowser$8();
  var $ = requireAlgos(), h = Object.keys($), U = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(h);
  cryptoBrowserify.getHashes = function() {
    return U;
  };
  var B = requireBrowser$7();
  cryptoBrowserify.pbkdf2 = B.pbkdf2, cryptoBrowserify.pbkdf2Sync = B.pbkdf2Sync;
  var V = requireBrowser$5();
  cryptoBrowserify.Cipher = V.Cipher, cryptoBrowserify.createCipher = V.createCipher, cryptoBrowserify.Cipheriv = V.Cipheriv, cryptoBrowserify.createCipheriv = V.createCipheriv, cryptoBrowserify.Decipher = V.Decipher, cryptoBrowserify.createDecipher = V.createDecipher, cryptoBrowserify.Decipheriv = V.Decipheriv, cryptoBrowserify.createDecipheriv = V.createDecipheriv, cryptoBrowserify.getCiphers = V.getCiphers, cryptoBrowserify.listCiphers = V.listCiphers;
  var t = requireBrowser$4();
  cryptoBrowserify.DiffieHellmanGroup = t.DiffieHellmanGroup, cryptoBrowserify.createDiffieHellmanGroup = t.createDiffieHellmanGroup, cryptoBrowserify.getDiffieHellman = t.getDiffieHellman, cryptoBrowserify.createDiffieHellman = t.createDiffieHellman, cryptoBrowserify.DiffieHellman = t.DiffieHellman;
  var O = requireBrowser$3();
  cryptoBrowserify.createSign = O.createSign, cryptoBrowserify.Sign = O.Sign, cryptoBrowserify.createVerify = O.createVerify, cryptoBrowserify.Verify = O.Verify, cryptoBrowserify.createECDH = requireBrowser$2();
  var M = requireBrowser$1();
  cryptoBrowserify.publicEncrypt = M.publicEncrypt, cryptoBrowserify.privateEncrypt = M.privateEncrypt, cryptoBrowserify.publicDecrypt = M.publicDecrypt, cryptoBrowserify.privateDecrypt = M.privateDecrypt;
  var D = requireBrowser();
  return cryptoBrowserify.randomFill = D.randomFill, cryptoBrowserify.randomFillSync = D.randomFillSync, cryptoBrowserify.createCredentials = function() {
    throw new Error([
      "sorry, createCredentials is not implemented yet",
      "we accept pull requests",
      "https://github.com/crypto-browserify/crypto-browserify"
    ].join(`
`));
  }, cryptoBrowserify.constants = {
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    NPN_ENABLED: 1,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
  }, cryptoBrowserify;
}
(function($) {
  /**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   */
  (function(h, U) {
    typeof commonjsRequire == "function" && $ && $.exports ? $.exports = U() : (h.dcodeIO = h.dcodeIO || {}).bcrypt = U();
  })(commonjsGlobal, function() {
    var h = {}, U = null;
    function B(G) {
      if ($ && $.exports)
        try {
          return requireCryptoBrowserify().randomBytes(G);
        } catch {
        }
      try {
        var Z;
        return (self.crypto || self.msCrypto).getRandomValues(Z = new Uint32Array(G)), Array.prototype.slice.call(Z);
      } catch {
      }
      if (!U)
        throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
      return U(G);
    }
    var V = !1;
    try {
      B(1), V = !0;
    } catch {
    }
    U = null, h.setRandomFallback = function(G) {
      U = G;
    }, h.genSaltSync = function(G, Z) {
      if (G = G || ie, typeof G != "number")
        throw Error("Illegal arguments: " + typeof G + ", " + typeof Z);
      G < 4 ? G = 4 : G > 31 && (G = 31);
      var e = [];
      return e.push("$2a$"), G < 10 && e.push("0"), e.push(G.toString()), e.push("$"), e.push(Y(B(re), re)), e.join("");
    }, h.genSalt = function(G, Z, e) {
      if (typeof Z == "function" && (e = Z, Z = void 0), typeof G == "function" && (e = G, G = void 0), typeof G > "u")
        G = ie;
      else if (typeof G != "number")
        throw Error("illegal arguments: " + typeof G);
      function o(g) {
        O(function() {
          try {
            g(null, h.genSaltSync(G));
          } catch (H) {
            g(H);
          }
        });
      }
      if (e) {
        if (typeof e != "function")
          throw Error("Illegal callback: " + typeof e);
        o(e);
      } else
        return new Promise(function(g, H) {
          o(function(F, A) {
            if (F) {
              H(F);
              return;
            }
            g(A);
          });
        });
    }, h.hashSync = function(G, Z) {
      if (typeof Z > "u" && (Z = ie), typeof Z == "number" && (Z = h.genSaltSync(Z)), typeof G != "string" || typeof Z != "string")
        throw Error("Illegal arguments: " + typeof G + ", " + typeof Z);
      return _e(G, Z);
    }, h.hash = function(G, Z, e, o) {
      function g(H) {
        typeof G == "string" && typeof Z == "number" ? h.genSalt(Z, function(F, A) {
          _e(G, A, H, o);
        }) : typeof G == "string" && typeof Z == "string" ? _e(G, Z, H, o) : O(H.bind(this, Error("Illegal arguments: " + typeof G + ", " + typeof Z)));
      }
      if (e) {
        if (typeof e != "function")
          throw Error("Illegal callback: " + typeof e);
        g(e);
      } else
        return new Promise(function(H, F) {
          g(function(A, q) {
            if (A) {
              F(A);
              return;
            }
            H(q);
          });
        });
    };
    function t(G, Z) {
      for (var e = 0, o = 0, g = 0, H = G.length; g < H; ++g)
        G.charCodeAt(g) === Z.charCodeAt(g) ? ++e : ++o;
      return e < 0 ? !1 : o === 0;
    }
    h.compareSync = function(G, Z) {
      if (typeof G != "string" || typeof Z != "string")
        throw Error("Illegal arguments: " + typeof G + ", " + typeof Z);
      return Z.length !== 60 ? !1 : t(h.hashSync(G, Z.substr(0, Z.length - 31)), Z);
    }, h.compare = function(G, Z, e, o) {
      function g(H) {
        if (typeof G != "string" || typeof Z != "string") {
          O(H.bind(this, Error("Illegal arguments: " + typeof G + ", " + typeof Z)));
          return;
        }
        if (Z.length !== 60) {
          O(H.bind(this, null, !1));
          return;
        }
        h.hash(G, Z.substr(0, 29), function(F, A) {
          F ? H(F) : H(null, t(A, Z));
        }, o);
      }
      if (e) {
        if (typeof e != "function")
          throw Error("Illegal callback: " + typeof e);
        g(e);
      } else
        return new Promise(function(H, F) {
          g(function(A, q) {
            if (A) {
              F(A);
              return;
            }
            H(q);
          });
        });
    }, h.getRounds = function(G) {
      if (typeof G != "string")
        throw Error("Illegal arguments: " + typeof G);
      return parseInt(G.split("$")[2], 10);
    }, h.getSalt = function(G) {
      if (typeof G != "string")
        throw Error("Illegal arguments: " + typeof G);
      if (G.length !== 60)
        throw Error("Illegal hash length: " + G.length + " != 60");
      return G.substring(0, 29);
    };
    var O = typeof process$1 < "u" && process$1 && typeof process$1.nextTick == "function" ? typeof setImmediate == "function" ? setImmediate : process$1.nextTick : setTimeout;
    function M(G) {
      var Z = [], e = 0;
      return ee.encodeUTF16toUTF8(function() {
        return e >= G.length ? null : G.charCodeAt(e++);
      }, function(o) {
        Z.push(o);
      }), Z;
    }
    var D = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), I = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      -1,
      -1,
      -1,
      -1,
      -1
    ], P = String.fromCharCode;
    function Y(G, Z) {
      var e = 0, o = [], g, H;
      if (Z <= 0 || Z > G.length)
        throw Error("Illegal len: " + Z);
      for (; e < Z; ) {
        if (g = G[e++] & 255, o.push(D[g >> 2 & 63]), g = (g & 3) << 4, e >= Z) {
          o.push(D[g & 63]);
          break;
        }
        if (H = G[e++] & 255, g |= H >> 4 & 15, o.push(D[g & 63]), g = (H & 15) << 2, e >= Z) {
          o.push(D[g & 63]);
          break;
        }
        H = G[e++] & 255, g |= H >> 6 & 3, o.push(D[g & 63]), o.push(D[H & 63]);
      }
      return o.join("");
    }
    function X(G, Z) {
      var e = 0, o = G.length, g = 0, H = [], F, A, q, z, S, J;
      if (Z <= 0)
        throw Error("Illegal len: " + Z);
      for (; e < o - 1 && g < Z && (J = G.charCodeAt(e++), F = J < I.length ? I[J] : -1, J = G.charCodeAt(e++), A = J < I.length ? I[J] : -1, !(F == -1 || A == -1 || (S = F << 2 >>> 0, S |= (A & 48) >> 4, H.push(P(S)), ++g >= Z || e >= o) || (J = G.charCodeAt(e++), q = J < I.length ? I[J] : -1, q == -1) || (S = (A & 15) << 4 >>> 0, S |= (q & 60) >> 2, H.push(P(S)), ++g >= Z || e >= o))); )
        J = G.charCodeAt(e++), z = J < I.length ? I[J] : -1, S = (q & 3) << 6 >>> 0, S |= z, H.push(P(S)), ++g;
      var ce = [];
      for (e = 0; e < g; e++)
        ce.push(H[e].charCodeAt(0));
      return ce;
    }
    var ee = function() {
      var G = {};
      return G.MAX_CODEPOINT = 1114111, G.encodeUTF8 = function(Z, e) {
        var o = null;
        for (typeof Z == "number" && (o = Z, Z = function() {
          return null;
        }); o !== null || (o = Z()) !== null; )
          o < 128 ? e(o & 127) : o < 2048 ? (e(o >> 6 & 31 | 192), e(o & 63 | 128)) : o < 65536 ? (e(o >> 12 & 15 | 224), e(o >> 6 & 63 | 128), e(o & 63 | 128)) : (e(o >> 18 & 7 | 240), e(o >> 12 & 63 | 128), e(o >> 6 & 63 | 128), e(o & 63 | 128)), o = null;
      }, G.decodeUTF8 = function(Z, e) {
        for (var o, g, H, F, A = function(q) {
          q = q.slice(0, q.indexOf(null));
          var z = Error(q.toString());
          throw z.name = "TruncatedError", z.bytes = q, z;
        }; (o = Z()) !== null; )
          if (!(o & 128))
            e(o);
          else if ((o & 224) === 192)
            (g = Z()) === null && A([o, g]), e((o & 31) << 6 | g & 63);
          else if ((o & 240) === 224)
            ((g = Z()) === null || (H = Z()) === null) && A([o, g, H]), e((o & 15) << 12 | (g & 63) << 6 | H & 63);
          else if ((o & 248) === 240)
            ((g = Z()) === null || (H = Z()) === null || (F = Z()) === null) && A([o, g, H, F]), e((o & 7) << 18 | (g & 63) << 12 | (H & 63) << 6 | F & 63);
          else
            throw RangeError("Illegal starting byte: " + o);
      }, G.UTF16toUTF8 = function(Z, e) {
        for (var o, g = null; (o = g !== null ? g : Z()) !== null; ) {
          if (o >= 55296 && o <= 57343 && (g = Z()) !== null && g >= 56320 && g <= 57343) {
            e((o - 55296) * 1024 + g - 56320 + 65536), g = null;
            continue;
          }
          e(o);
        }
        g !== null && e(g);
      }, G.UTF8toUTF16 = function(Z, e) {
        var o = null;
        for (typeof Z == "number" && (o = Z, Z = function() {
          return null;
        }); o !== null || (o = Z()) !== null; )
          o <= 65535 ? e(o) : (o -= 65536, e((o >> 10) + 55296), e(o % 1024 + 56320)), o = null;
      }, G.encodeUTF16toUTF8 = function(Z, e) {
        G.UTF16toUTF8(Z, function(o) {
          G.encodeUTF8(o, e);
        });
      }, G.decodeUTF8toUTF16 = function(Z, e) {
        G.decodeUTF8(Z, function(o) {
          G.UTF8toUTF16(o, e);
        });
      }, G.calculateCodePoint = function(Z) {
        return Z < 128 ? 1 : Z < 2048 ? 2 : Z < 65536 ? 3 : 4;
      }, G.calculateUTF8 = function(Z) {
        for (var e, o = 0; (e = Z()) !== null; )
          o += G.calculateCodePoint(e);
        return o;
      }, G.calculateUTF16asUTF8 = function(Z) {
        var e = 0, o = 0;
        return G.UTF16toUTF8(Z, function(g) {
          ++e, o += G.calculateCodePoint(g);
        }), [e, o];
      }, G;
    }();
    Date.now = Date.now || function() {
      return +/* @__PURE__ */ new Date();
    };
    var re = 16, ie = 10, ne = 16, se = 100, oe = [
      608135816,
      2242054355,
      320440878,
      57701188,
      2752067618,
      698298832,
      137296536,
      3964562569,
      1160258022,
      953160567,
      3193202383,
      887688300,
      3232508343,
      3380367581,
      1065670069,
      3041331479,
      2450970073,
      2306472731
    ], be = [
      3509652390,
      2564797868,
      805139163,
      3491422135,
      3101798381,
      1780907670,
      3128725573,
      4046225305,
      614570311,
      3012652279,
      134345442,
      2240740374,
      1667834072,
      1901547113,
      2757295779,
      4103290238,
      227898511,
      1921955416,
      1904987480,
      2182433518,
      2069144605,
      3260701109,
      2620446009,
      720527379,
      3318853667,
      677414384,
      3393288472,
      3101374703,
      2390351024,
      1614419982,
      1822297739,
      2954791486,
      3608508353,
      3174124327,
      2024746970,
      1432378464,
      3864339955,
      2857741204,
      1464375394,
      1676153920,
      1439316330,
      715854006,
      3033291828,
      289532110,
      2706671279,
      2087905683,
      3018724369,
      1668267050,
      732546397,
      1947742710,
      3462151702,
      2609353502,
      2950085171,
      1814351708,
      2050118529,
      680887927,
      999245976,
      1800124847,
      3300911131,
      1713906067,
      1641548236,
      4213287313,
      1216130144,
      1575780402,
      4018429277,
      3917837745,
      3693486850,
      3949271944,
      596196993,
      3549867205,
      258830323,
      2213823033,
      772490370,
      2760122372,
      1774776394,
      2652871518,
      566650946,
      4142492826,
      1728879713,
      2882767088,
      1783734482,
      3629395816,
      2517608232,
      2874225571,
      1861159788,
      326777828,
      3124490320,
      2130389656,
      2716951837,
      967770486,
      1724537150,
      2185432712,
      2364442137,
      1164943284,
      2105845187,
      998989502,
      3765401048,
      2244026483,
      1075463327,
      1455516326,
      1322494562,
      910128902,
      469688178,
      1117454909,
      936433444,
      3490320968,
      3675253459,
      1240580251,
      122909385,
      2157517691,
      634681816,
      4142456567,
      3825094682,
      3061402683,
      2540495037,
      79693498,
      3249098678,
      1084186820,
      1583128258,
      426386531,
      1761308591,
      1047286709,
      322548459,
      995290223,
      1845252383,
      2603652396,
      3431023940,
      2942221577,
      3202600964,
      3727903485,
      1712269319,
      422464435,
      3234572375,
      1170764815,
      3523960633,
      3117677531,
      1434042557,
      442511882,
      3600875718,
      1076654713,
      1738483198,
      4213154764,
      2393238008,
      3677496056,
      1014306527,
      4251020053,
      793779912,
      2902807211,
      842905082,
      4246964064,
      1395751752,
      1040244610,
      2656851899,
      3396308128,
      445077038,
      3742853595,
      3577915638,
      679411651,
      2892444358,
      2354009459,
      1767581616,
      3150600392,
      3791627101,
      3102740896,
      284835224,
      4246832056,
      1258075500,
      768725851,
      2589189241,
      3069724005,
      3532540348,
      1274779536,
      3789419226,
      2764799539,
      1660621633,
      3471099624,
      4011903706,
      913787905,
      3497959166,
      737222580,
      2514213453,
      2928710040,
      3937242737,
      1804850592,
      3499020752,
      2949064160,
      2386320175,
      2390070455,
      2415321851,
      4061277028,
      2290661394,
      2416832540,
      1336762016,
      1754252060,
      3520065937,
      3014181293,
      791618072,
      3188594551,
      3933548030,
      2332172193,
      3852520463,
      3043980520,
      413987798,
      3465142937,
      3030929376,
      4245938359,
      2093235073,
      3534596313,
      375366246,
      2157278981,
      2479649556,
      555357303,
      3870105701,
      2008414854,
      3344188149,
      4221384143,
      3956125452,
      2067696032,
      3594591187,
      2921233993,
      2428461,
      544322398,
      577241275,
      1471733935,
      610547355,
      4027169054,
      1432588573,
      1507829418,
      2025931657,
      3646575487,
      545086370,
      48609733,
      2200306550,
      1653985193,
      298326376,
      1316178497,
      3007786442,
      2064951626,
      458293330,
      2589141269,
      3591329599,
      3164325604,
      727753846,
      2179363840,
      146436021,
      1461446943,
      4069977195,
      705550613,
      3059967265,
      3887724982,
      4281599278,
      3313849956,
      1404054877,
      2845806497,
      146425753,
      1854211946,
      1266315497,
      3048417604,
      3681880366,
      3289982499,
      290971e4,
      1235738493,
      2632868024,
      2414719590,
      3970600049,
      1771706367,
      1449415276,
      3266420449,
      422970021,
      1963543593,
      2690192192,
      3826793022,
      1062508698,
      1531092325,
      1804592342,
      2583117782,
      2714934279,
      4024971509,
      1294809318,
      4028980673,
      1289560198,
      2221992742,
      1669523910,
      35572830,
      157838143,
      1052438473,
      1016535060,
      1802137761,
      1753167236,
      1386275462,
      3080475397,
      2857371447,
      1040679964,
      2145300060,
      2390574316,
      1461121720,
      2956646967,
      4031777805,
      4028374788,
      33600511,
      2920084762,
      1018524850,
      629373528,
      3691585981,
      3515945977,
      2091462646,
      2486323059,
      586499841,
      988145025,
      935516892,
      3367335476,
      2599673255,
      2839830854,
      265290510,
      3972581182,
      2759138881,
      3795373465,
      1005194799,
      847297441,
      406762289,
      1314163512,
      1332590856,
      1866599683,
      4127851711,
      750260880,
      613907577,
      1450815602,
      3165620655,
      3734664991,
      3650291728,
      3012275730,
      3704569646,
      1427272223,
      778793252,
      1343938022,
      2676280711,
      2052605720,
      1946737175,
      3164576444,
      3914038668,
      3967478842,
      3682934266,
      1661551462,
      3294938066,
      4011595847,
      840292616,
      3712170807,
      616741398,
      312560963,
      711312465,
      1351876610,
      322626781,
      1910503582,
      271666773,
      2175563734,
      1594956187,
      70604529,
      3617834859,
      1007753275,
      1495573769,
      4069517037,
      2549218298,
      2663038764,
      504708206,
      2263041392,
      3941167025,
      2249088522,
      1514023603,
      1998579484,
      1312622330,
      694541497,
      2582060303,
      2151582166,
      1382467621,
      776784248,
      2618340202,
      3323268794,
      2497899128,
      2784771155,
      503983604,
      4076293799,
      907881277,
      423175695,
      432175456,
      1378068232,
      4145222326,
      3954048622,
      3938656102,
      3820766613,
      2793130115,
      2977904593,
      26017576,
      3274890735,
      3194772133,
      1700274565,
      1756076034,
      4006520079,
      3677328699,
      720338349,
      1533947780,
      354530856,
      688349552,
      3973924725,
      1637815568,
      332179504,
      3949051286,
      53804574,
      2852348879,
      3044236432,
      1282449977,
      3583942155,
      3416972820,
      4006381244,
      1617046695,
      2628476075,
      3002303598,
      1686838959,
      431878346,
      2686675385,
      1700445008,
      1080580658,
      1009431731,
      832498133,
      3223435511,
      2605976345,
      2271191193,
      2516031870,
      1648197032,
      4164389018,
      2548247927,
      300782431,
      375919233,
      238389289,
      3353747414,
      2531188641,
      2019080857,
      1475708069,
      455242339,
      2609103871,
      448939670,
      3451063019,
      1395535956,
      2413381860,
      1841049896,
      1491858159,
      885456874,
      4264095073,
      4001119347,
      1565136089,
      3898914787,
      1108368660,
      540939232,
      1173283510,
      2745871338,
      3681308437,
      4207628240,
      3343053890,
      4016749493,
      1699691293,
      1103962373,
      3625875870,
      2256883143,
      3830138730,
      1031889488,
      3479347698,
      1535977030,
      4236805024,
      3251091107,
      2132092099,
      1774941330,
      1199868427,
      1452454533,
      157007616,
      2904115357,
      342012276,
      595725824,
      1480756522,
      206960106,
      497939518,
      591360097,
      863170706,
      2375253569,
      3596610801,
      1814182875,
      2094937945,
      3421402208,
      1082520231,
      3463918190,
      2785509508,
      435703966,
      3908032597,
      1641649973,
      2842273706,
      3305899714,
      1510255612,
      2148256476,
      2655287854,
      3276092548,
      4258621189,
      236887753,
      3681803219,
      274041037,
      1734335097,
      3815195456,
      3317970021,
      1899903192,
      1026095262,
      4050517792,
      356393447,
      2410691914,
      3873677099,
      3682840055,
      3913112168,
      2491498743,
      4132185628,
      2489919796,
      1091903735,
      1979897079,
      3170134830,
      3567386728,
      3557303409,
      857797738,
      1136121015,
      1342202287,
      507115054,
      2535736646,
      337727348,
      3213592640,
      1301675037,
      2528481711,
      1895095763,
      1721773893,
      3216771564,
      62756741,
      2142006736,
      835421444,
      2531993523,
      1442658625,
      3659876326,
      2882144922,
      676362277,
      1392781812,
      170690266,
      3921047035,
      1759253602,
      3611846912,
      1745797284,
      664899054,
      1329594018,
      3901205900,
      3045908486,
      2062866102,
      2865634940,
      3543621612,
      3464012697,
      1080764994,
      553557557,
      3656615353,
      3996768171,
      991055499,
      499776247,
      1265440854,
      648242737,
      3940784050,
      980351604,
      3713745714,
      1749149687,
      3396870395,
      4211799374,
      3640570775,
      1161844396,
      3125318951,
      1431517754,
      545492359,
      4268468663,
      3499529547,
      1437099964,
      2702547544,
      3433638243,
      2581715763,
      2787789398,
      1060185593,
      1593081372,
      2418618748,
      4260947970,
      69676912,
      2159744348,
      86519011,
      2512459080,
      3838209314,
      1220612927,
      3339683548,
      133810670,
      1090789135,
      1078426020,
      1569222167,
      845107691,
      3583754449,
      4072456591,
      1091646820,
      628848692,
      1613405280,
      3757631651,
      526609435,
      236106946,
      48312990,
      2942717905,
      3402727701,
      1797494240,
      859738849,
      992217954,
      4005476642,
      2243076622,
      3870952857,
      3732016268,
      765654824,
      3490871365,
      2511836413,
      1685915746,
      3888969200,
      1414112111,
      2273134842,
      3281911079,
      4080962846,
      172450625,
      2569994100,
      980381355,
      4109958455,
      2819808352,
      2716589560,
      2568741196,
      3681446669,
      3329971472,
      1835478071,
      660984891,
      3704678404,
      4045999559,
      3422617507,
      3040415634,
      1762651403,
      1719377915,
      3470491036,
      2693910283,
      3642056355,
      3138596744,
      1364962596,
      2073328063,
      1983633131,
      926494387,
      3423689081,
      2150032023,
      4096667949,
      1749200295,
      3328846651,
      309677260,
      2016342300,
      1779581495,
      3079819751,
      111262694,
      1274766160,
      443224088,
      298511866,
      1025883608,
      3806446537,
      1145181785,
      168956806,
      3641502830,
      3584813610,
      1689216846,
      3666258015,
      3200248200,
      1692713982,
      2646376535,
      4042768518,
      1618508792,
      1610833997,
      3523052358,
      4130873264,
      2001055236,
      3610705100,
      2202168115,
      4028541809,
      2961195399,
      1006657119,
      2006996926,
      3186142756,
      1430667929,
      3210227297,
      1314452623,
      4074634658,
      4101304120,
      2273951170,
      1399257539,
      3367210612,
      3027628629,
      1190975929,
      2062231137,
      2333990788,
      2221543033,
      2438960610,
      1181637006,
      548689776,
      2362791313,
      3372408396,
      3104550113,
      3145860560,
      296247880,
      1970579870,
      3078560182,
      3769228297,
      1714227617,
      3291629107,
      3898220290,
      166772364,
      1251581989,
      493813264,
      448347421,
      195405023,
      2709975567,
      677966185,
      3703036547,
      1463355134,
      2715995803,
      1338867538,
      1343315457,
      2802222074,
      2684532164,
      233230375,
      2599980071,
      2000651841,
      3277868038,
      1638401717,
      4028070440,
      3237316320,
      6314154,
      819756386,
      300326615,
      590932579,
      1405279636,
      3267499572,
      3150704214,
      2428286686,
      3959192993,
      3461946742,
      1862657033,
      1266418056,
      963775037,
      2089974820,
      2263052895,
      1917689273,
      448879540,
      3550394620,
      3981727096,
      150775221,
      3627908307,
      1303187396,
      508620638,
      2975983352,
      2726630617,
      1817252668,
      1876281319,
      1457606340,
      908771278,
      3720792119,
      3617206836,
      2455994898,
      1729034894,
      1080033504,
      976866871,
      3556439503,
      2881648439,
      1522871579,
      1555064734,
      1336096578,
      3548522304,
      2579274686,
      3574697629,
      3205460757,
      3593280638,
      3338716283,
      3079412587,
      564236357,
      2993598910,
      1781952180,
      1464380207,
      3163844217,
      3332601554,
      1699332808,
      1393555694,
      1183702653,
      3581086237,
      1288719814,
      691649499,
      2847557200,
      2895455976,
      3193889540,
      2717570544,
      1781354906,
      1676643554,
      2592534050,
      3230253752,
      1126444790,
      2770207658,
      2633158820,
      2210423226,
      2615765581,
      2414155088,
      3127139286,
      673620729,
      2805611233,
      1269405062,
      4015350505,
      3341807571,
      4149409754,
      1057255273,
      2012875353,
      2162469141,
      2276492801,
      2601117357,
      993977747,
      3918593370,
      2654263191,
      753973209,
      36408145,
      2530585658,
      25011837,
      3520020182,
      2088578344,
      530523599,
      2918365339,
      1524020338,
      1518925132,
      3760827505,
      3759777254,
      1202760957,
      3985898139,
      3906192525,
      674977740,
      4174734889,
      2031300136,
      2019492241,
      3983892565,
      4153806404,
      3822280332,
      352677332,
      2297720250,
      60907813,
      90501309,
      3286998549,
      1016092578,
      2535922412,
      2839152426,
      457141659,
      509813237,
      4120667899,
      652014361,
      1966332200,
      2975202805,
      55981186,
      2327461051,
      676427537,
      3255491064,
      2882294119,
      3433927263,
      1307055953,
      942726286,
      933058658,
      2468411793,
      3933900994,
      4215176142,
      1361170020,
      2001714738,
      2830558078,
      3274259782,
      1222529897,
      1679025792,
      2729314320,
      3714953764,
      1770335741,
      151462246,
      3013232138,
      1682292957,
      1483529935,
      471910574,
      1539241949,
      458788160,
      3436315007,
      1807016891,
      3718408830,
      978976581,
      1043663428,
      3165965781,
      1927990952,
      4200891579,
      2372276910,
      3208408903,
      3533431907,
      1412390302,
      2931980059,
      4132332400,
      1947078029,
      3881505623,
      4168226417,
      2941484381,
      1077988104,
      1320477388,
      886195818,
      18198404,
      3786409e3,
      2509781533,
      112762804,
      3463356488,
      1866414978,
      891333506,
      18488651,
      661792760,
      1628790961,
      3885187036,
      3141171499,
      876946877,
      2693282273,
      1372485963,
      791857591,
      2686433993,
      3759982718,
      3167212022,
      3472953795,
      2716379847,
      445679433,
      3561995674,
      3504004811,
      3574258232,
      54117162,
      3331405415,
      2381918588,
      3769707343,
      4154350007,
      1140177722,
      4074052095,
      668550556,
      3214352940,
      367459370,
      261225585,
      2610173221,
      4209349473,
      3468074219,
      3265815641,
      314222801,
      3066103646,
      3808782860,
      282218597,
      3406013506,
      3773591054,
      379116347,
      1285071038,
      846784868,
      2669647154,
      3771962079,
      3550491691,
      2305946142,
      453669953,
      1268987020,
      3317592352,
      3279303384,
      3744833421,
      2610507566,
      3859509063,
      266596637,
      3847019092,
      517658769,
      3462560207,
      3443424879,
      370717030,
      4247526661,
      2224018117,
      4143653529,
      4112773975,
      2788324899,
      2477274417,
      1456262402,
      2901442914,
      1517677493,
      1846949527,
      2295493580,
      3734397586,
      2176403920,
      1280348187,
      1908823572,
      3871786941,
      846861322,
      1172426758,
      3287448474,
      3383383037,
      1655181056,
      3139813346,
      901632758,
      1897031941,
      2986607138,
      3066810236,
      3447102507,
      1393639104,
      373351379,
      950779232,
      625454576,
      3124240540,
      4148612726,
      2007998917,
      544563296,
      2244738638,
      2330496472,
      2058025392,
      1291430526,
      424198748,
      50039436,
      29584100,
      3605783033,
      2429876329,
      2791104160,
      1057563949,
      3255363231,
      3075367218,
      3463963227,
      1469046755,
      985887462
    ], de = [
      1332899944,
      1700884034,
      1701343084,
      1684370003,
      1668446532,
      1869963892
    ];
    function we(G, Z, e, o) {
      var g, H = G[Z], F = G[Z + 1];
      return H ^= e[0], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[1], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[2], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[3], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[4], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[5], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[6], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[7], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[8], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[9], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[10], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[11], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[12], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[13], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[14], g = o[H >>> 24], g += o[256 | H >> 16 & 255], g ^= o[512 | H >> 8 & 255], g += o[768 | H & 255], F ^= g ^ e[15], g = o[F >>> 24], g += o[256 | F >> 16 & 255], g ^= o[512 | F >> 8 & 255], g += o[768 | F & 255], H ^= g ^ e[16], G[Z] = F ^ e[ne + 1], G[Z + 1] = H, G;
    }
    function Se(G, Z) {
      for (var e = 0, o = 0; e < 4; ++e)
        o = o << 8 | G[Z] & 255, Z = (Z + 1) % G.length;
      return { key: o, offp: Z };
    }
    function ke(G, Z, e) {
      for (var o = 0, g = [0, 0], H = Z.length, F = e.length, A, q = 0; q < H; q++)
        A = Se(G, o), o = A.offp, Z[q] = Z[q] ^ A.key;
      for (q = 0; q < H; q += 2)
        g = we(g, 0, Z, e), Z[q] = g[0], Z[q + 1] = g[1];
      for (q = 0; q < F; q += 2)
        g = we(g, 0, Z, e), e[q] = g[0], e[q + 1] = g[1];
    }
    function he(G, Z, e, o) {
      for (var g = 0, H = [0, 0], F = e.length, A = o.length, q, z = 0; z < F; z++)
        q = Se(Z, g), g = q.offp, e[z] = e[z] ^ q.key;
      for (g = 0, z = 0; z < F; z += 2)
        q = Se(G, g), g = q.offp, H[0] ^= q.key, q = Se(G, g), g = q.offp, H[1] ^= q.key, H = we(H, 0, e, o), e[z] = H[0], e[z + 1] = H[1];
      for (z = 0; z < A; z += 2)
        q = Se(G, g), g = q.offp, H[0] ^= q.key, q = Se(G, g), g = q.offp, H[1] ^= q.key, H = we(H, 0, e, o), o[z] = H[0], o[z + 1] = H[1];
    }
    function le(G, Z, e, o, g) {
      var H = de.slice(), F = H.length, A;
      if (e < 4 || e > 31)
        if (A = Error("Illegal number of rounds (4-31): " + e), o) {
          O(o.bind(this, A));
          return;
        } else
          throw A;
      if (Z.length !== re)
        if (A = Error("Illegal salt length: " + Z.length + " != " + re), o) {
          O(o.bind(this, A));
          return;
        } else
          throw A;
      e = 1 << e >>> 0;
      var q, z, S = 0, J;
      Int32Array ? (q = new Int32Array(oe), z = new Int32Array(be)) : (q = oe.slice(), z = be.slice()), he(Z, G, q, z);
      function ce() {
        if (g && g(S / e), S < e)
          for (var Me = Date.now(); S < e && (S = S + 1, ke(G, q, z), ke(Z, q, z), !(Date.now() - Me > se)); )
            ;
        else {
          for (S = 0; S < 64; S++)
            for (J = 0; J < F >> 1; J++)
              we(H, J << 1, q, z);
          var me = [];
          for (S = 0; S < F; S++)
            me.push((H[S] >> 24 & 255) >>> 0), me.push((H[S] >> 16 & 255) >>> 0), me.push((H[S] >> 8 & 255) >>> 0), me.push((H[S] & 255) >>> 0);
          if (o) {
            o(null, me);
            return;
          } else
            return me;
        }
        o && O(ce);
      }
      if (typeof o < "u")
        ce();
      else
        for (var ye; ; )
          if (typeof (ye = ce()) < "u")
            return ye || [];
    }
    function _e(G, Z, e, o) {
      var g;
      if (typeof G != "string" || typeof Z != "string")
        if (g = Error("Invalid string / salt: Not a string"), e) {
          O(e.bind(this, g));
          return;
        } else
          throw g;
      var H, F;
      if (Z.charAt(0) !== "$" || Z.charAt(1) !== "2")
        if (g = Error("Invalid salt version: " + Z.substring(0, 2)), e) {
          O(e.bind(this, g));
          return;
        } else
          throw g;
      if (Z.charAt(2) === "$")
        H = "\0", F = 3;
      else {
        if (H = Z.charAt(2), H !== "a" && H !== "b" && H !== "y" || Z.charAt(3) !== "$")
          if (g = Error("Invalid salt revision: " + Z.substring(2, 4)), e) {
            O(e.bind(this, g));
            return;
          } else
            throw g;
        F = 4;
      }
      if (Z.charAt(F + 2) > "$")
        if (g = Error("Missing salt rounds"), e) {
          O(e.bind(this, g));
          return;
        } else
          throw g;
      var A = parseInt(Z.substring(F, F + 1), 10) * 10, q = parseInt(Z.substring(F + 1, F + 2), 10), z = A + q, S = Z.substring(F + 3, F + 25);
      G += H >= "a" ? "\0" : "";
      var J = M(G), ce = X(S, re);
      function ye(Me) {
        var me = [];
        return me.push("$2"), H >= "a" && me.push(H), me.push("$"), z < 10 && me.push("0"), me.push(z.toString()), me.push("$"), me.push(Y(ce, ce.length)), me.push(Y(Me, de.length * 4 - 1)), me.join("");
      }
      if (typeof e > "u")
        return ye(le(J, ce, z));
      le(J, ce, z, function(Me, me) {
        Me ? e(Me, null) : e(null, ye(me));
      }, o);
    }
    return h.encodeBase64 = Y, h.decodeBase64 = X, h;
  });
})(bcrypt$1);
var bcryptExports = bcrypt$1.exports;
const bcrypt = /* @__PURE__ */ getDefaultExportFromCjs(bcryptExports);
class FirebaseAuthAPI {
  constructor(h) {
    this.FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/", this.BCRYPT_SALT = "$2a$10$QCJoWqnN.acrjPIgKYCthu";
    const U = new URL(this.FIREBASE_AUTH_URL);
    this.firebaseKey = h.apiKey, this.fetcher = new FetchAPI(U.toString());
  }
  checkError(h) {
    if (h.error)
      throw new Error(
        `Error code: ${h.error.code}, message: ${h.error.message}`
      );
  }
  async signUpWithEmailPassword(h, U, B = !0) {
    let V = U;
    B && (V = bcrypt.hashSync(U, this.BCRYPT_SALT));
    const t = JSON.stringify({
      email: h,
      password: V,
      returnSecureToken: !0
    }), O = await this.fetcher.send({
      url: "accounts:signUp",
      method: "POST",
      data: t,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(O.data), O.data;
  }
  async signInWithEmailPassword(h, U, B = !0) {
    let V = U;
    B && (V = bcrypt.hashSync(U, this.BCRYPT_SALT));
    const t = JSON.stringify({
      email: h,
      password: V,
      returnSecureToken: !0
    }), O = await this.fetcher.send({
      url: "accounts:signInWithPassword",
      method: "POST",
      data: t,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(O.data), O.data;
  }
  async getCurrentUser(h) {
    const U = JSON.stringify({
      idToken: h
    }), B = await this.fetcher.send({
      url: "accounts:lookup",
      method: "POST",
      data: U,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(B.data), B.data;
  }
  async getRefreshIdToken(h) {
    const U = JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: h
    }), B = await this.fetcher.send({
      url: "token",
      method: "POST",
      data: U,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    }), V = B.data;
    return this.checkError(B.data), V.id_token;
  }
  async resetPassword(h, U, B = !0) {
    let V = U;
    B && (V = bcrypt.hashSync(U, this.BCRYPT_SALT));
    const t = JSON.stringify({
      oobCode: h,
      newPassword: V
    }), O = await this.fetcher.send({
      url: "accounts:resetPassword",
      method: "POST",
      data: t,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(O.data), O.data;
  }
  async verifyEmail(h) {
    const U = JSON.stringify({
      oobCode: h
    }), B = await this.fetcher.send({
      url: "accounts:update",
      method: "POST",
      data: U,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(B.data), B.data;
  }
  async signInWithCustomToken(h) {
    const U = JSON.stringify({
      token: h,
      returnSecureToken: !0
    }), B = await this.fetcher.send({
      url: "accounts:signInWithCustomToken",
      data: U,
      query: {
        key: this.firebaseKey
      },
      method: "POST",
      withCredentials: !1
    });
    return this.checkError(B.data), {
      idToken: B.data.idToken,
      refreshToken: B.data.refreshToken
    };
  }
  async updatePassword(h, U) {
    const B = bcrypt.hashSync(U, this.BCRYPT_SALT), V = JSON.stringify({
      idToken: h,
      password: B,
      returnSecureToken: !0
    }), t = await this.fetcher.send({
      url: "accounts:update",
      method: "POST",
      data: V,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(t.data), t.data;
  }
}
var u$1 = ($, h, U) => {
  if (!h.has($))
    throw TypeError("Cannot " + U);
}, i$1 = ($, h, U) => (u$1($, h, "read from private field"), U ? U.call($) : h.get($)), n$1 = ($, h, U) => {
  if (h.has($))
    throw TypeError("Cannot add the same private member more than once");
  h instanceof WeakSet ? h.add($) : h.set($, U);
}, l$1;
const s$1 = class Nt {
  static getLocalStorageEnabled() {
    let h = !1;
    try {
      h = window.localStorage && !0;
    } catch {
      h = !1;
    }
    return h;
  }
  static setAllLocalStorage(h, U) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const B = JSON.stringify(U);
    localStorage.setItem(i$1(this, l$1) + h, B);
  }
  static setLocalStorage(h, U, B) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const V = this.getAllLocalStorage(h);
    if (V) {
      V[U] = B, localStorage.setItem(
        i$1(this, l$1) + h,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(V)
      );
      return;
    }
    const t = { [U]: B };
    localStorage.setItem(
      i$1(this, l$1) + h,
      // btoa(JSON.stringify(newData)),
      JSON.stringify(t)
    );
  }
  static getLocalStorage(h, U) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const B = this.getAllLocalStorage(h);
    try {
      if (B)
        return JSON.parse(B[U]);
    } catch {
      return B[U];
    }
  }
  static getAllLocalStorage(h) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    try {
      return localStorage.getItem(i$1(this, l$1) + h) ? (
        // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
        JSON.parse(localStorage.getItem(i$1(this, l$1) + h))
      ) : void 0;
    } catch {
      return;
    }
  }
  static clearLocalStorage(h, U) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    if (this.getLocalStorage(h, U)) {
      const B = this.getAllLocalStorage(h);
      delete B[U], localStorage.setItem(
        i$1(this, l$1) + h,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(B)
      );
    }
  }
  static clearAllLocalStorage(h) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    localStorage.removeItem(i$1(this, l$1) + h);
  }
  static setLoginUserLocalStorage(h, U, B) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const V = {};
    return V["firebase:wepin"] = Object.assign(
      { provider: U == null ? void 0 : U.provider },
      U == null ? void 0 : U.token
    ), V["wepin:connectUser"] = {
      accessToken: B.token.access,
      refreshToken: B.token.refresh
    }, V.user_id = B.userInfo.userId, V.user_info = {
      status: "success",
      userInfo: {
        userId: B.userInfo.userId,
        email: B.userInfo.email,
        provider: U.provider,
        use2FA: B.userInfo.use2FA >= 2
      }
    }, V.user_status = {
      loginStatus: B.loginStatus,
      pinRequired: B.loginStatus === "registerRequired" ? B.pinRequired : !1
    }, B.loginStatus !== "pinRequired" && B.walletId && (V.wallet_id = B.walletId, V.user_info.walletId = B.walletId), V.oauth_provider_pending = U.provider, Nt.setAllLocalStorage(h, V), {
      userInfo: V.user_info,
      connectUser: V["wepin:connectUser"]
    };
  }
};
l$1 = /* @__PURE__ */ new WeakMap(), s$1.platform = "web", n$1(s$1, l$1, "wepin:auth:");
let c$1 = s$1;
const isErrorResponse = ($) => {
  const h = $.statusCode !== void 0 || $.status !== void 0, U = $.timestamp !== void 0 && $.message !== void 0 && $.path !== void 0;
  return h && U;
}, getBaseUrl = ($) => {
  if ($.slice(0, 8) === "ak_live_")
    return "https://sdk.wepin.io/v1";
  if ($.slice(0, 8) === "ak_test_")
    return "https://stage-sdk.wepin.io/v1";
  if ($.slice(0, 7) === "ak_dev_")
    return "https://dev-sdk.wepin.io/v1";
  if ($.slice(0, 13) === "local_ak_dev_")
    return "https://local-sdk.wepin.io/v1";
  throw new Error("Invalid appKey");
};
class APIRequest {
  constructor({
    data: h,
    headers: U,
    url: B,
    query: V,
    withCredentials: t = !1,
    method: O
  }) {
    this.data = h, this.headers = U, this.url = B, this.query = V, this.withCredentials = t, this.method = O;
  }
}
const APIEvents = {
  request: "request",
  response: "response"
};
let InvalidTokenError$1 = class extends Error {
};
InvalidTokenError$1.prototype.name = "InvalidTokenError";
function b64DecodeUnicode$1($) {
  return decodeURIComponent(atob($).replace(/(.)/g, (h, U) => {
    let B = U.charCodeAt(0).toString(16).toUpperCase();
    return B.length < 2 && (B = "0" + B), "%" + B;
  }));
}
function base64UrlDecode$1($) {
  let h = $.replace(/-/g, "+").replace(/_/g, "/");
  switch (h.length % 4) {
    case 0:
      break;
    case 2:
      h += "==";
      break;
    case 3:
      h += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode$1(h);
  } catch {
    return atob(h);
  }
}
function jwtDecode$1($, h) {
  if (typeof $ != "string")
    throw new InvalidTokenError$1("Invalid token specified: must be a string");
  h || (h = {});
  const U = h.header === !0 ? 0 : 1, B = $.split(".")[U];
  if (typeof B != "string")
    throw new InvalidTokenError$1(`Invalid token specified: missing part #${U + 1}`);
  let V;
  try {
    V = base64UrlDecode$1(B);
  } catch (t) {
    throw new InvalidTokenError$1(`Invalid token specified: invalid base64 for part #${U + 1} (${t.message})`);
  }
  try {
    return JSON.parse(V);
  } catch (t) {
    throw new InvalidTokenError$1(`Invalid token specified: invalid json for part #${U + 1} (${t.message})`);
  }
}
const checkJwtToken = () => {
  const $ = (h) => {
    var U;
    const B = h;
    return !B || ((U = jwtDecode$1(B)) == null ? void 0 : U.exp) <= Math.floor(Date.now() / 1e3) + 60;
  };
  return {
    // isExpiredAccessToken,
    checkTokenExpired: (h, U) => {
      if (!(h === "/app/info" || h === "/user/login" || h === "/user/oauth") && $(U)) {
        if (h !== "/access-token")
          throw new Error("token_expired");
        return;
      }
    }
  };
};
class WepinSDKFetchAPI extends FetchAPI {
  constructor(h, U) {
    super(), this.baseUrl = h, this.params = U, this.addListener(APIEvents.request, this.requestCallback), this.addListener(APIEvents.response, this.responseCallback);
  }
  async send(h, U) {
    await this.emitAsync(APIEvents.request, h, U || {});
    const { data: B, url: V, headers: t } = h, O = (() => {
      if (B instanceof FormData)
        return {};
    })();
    h.headers = Object.assign(t || {}, O);
    const M = await super.send(h, U);
    return this.setToken(V, M), await this.emitAsync(
      APIEvents.response,
      M,
      U || {}
    ), M;
  }
  setToken(h, U) {
    var B, V, t, O, M, D;
    isErrorResponse(U.data) || (h === "user/login" && (B = U.data) != null && B.token ? this.params.wepinFetch.setToken({
      accessToken: (V = U.data) == null ? void 0 : V.token.access,
      refreshToken: (t = U.data) == null ? void 0 : t.token.refresh
    }) : h === "/user/access-token" && (O = U.data) != null && O.token ? this.params.wepinFetch.setToken({
      accessToken: (M = U.data) == null ? void 0 : M.token,
      refreshToken: (D = this.params.wepinFetch.Token) == null ? void 0 : D.refreshToken
    }) : h === "user/logout" && this.params.wepinFetch.setToken());
  }
  async requestCallback(h, U) {
    var B, V, t;
    try {
      h.headers || (h.headers = {}), h.headers["X-API-KEY"] = this.params.appKey;
      const O = this.params.domain && this.params.domain.includes("localhost") ? "" : this.params.domain;
      if (h.headers["X-SDK-TYPE"] = this.params.sdk.type, h.headers["X-SDK-VERSION"] = this.params.sdk.version, h.headers["X-API-DOMAIN"] = O, h.url === "/user/access-token" && (h.query = {
        refresh_token: (B = this.params.wepinFetch.Token) == null ? void 0 : B.refreshToken
      }), U != null && U.ignoreCheckToken)
        return;
      try {
        const D = (V = this.params.wepinFetch.Token) == null ? void 0 : V.accessToken, { checkTokenExpired: I } = checkJwtToken();
        I(h.url, D);
      } catch {
        const D = new APIRequest({
          url: "/user/access-token",
          method: "GET",
          withCredentials: !0
        });
        await this.send(D, { ignoreCheckToken: !0 });
      }
      const M = (t = this.params.wepinFetch.Token) == null ? void 0 : t.accessToken;
      M && (h.headers.Authorization = `Bearer ${M}`);
    } catch {
      throw new Error("Unauthorized Error");
    }
  }
  async responseCallback(h) {
    if (h.status === 401)
      throw new Error("Unauthorized Error");
  }
  // private setUserInfo(url: string, response: any) {
  //   if (!isErrorResponse(response.data) && response.data?.userInfo) {
  //     // set token
  //     if (url === 'user/login') {
  //       WepinStorage.setLocalStorage('userInfo', response.data?.userInfo)
  //       if (response.data?.walletId) {
  //         WepinStorage.setLocalStorage('walletId', response.data?.walletId)
  //       }
  //     } else if (url === '/app/register') {
  //       if (response.data?.walletId) {
  //         WepinStorage.setLocalStorage('walletId', response.data?.walletId)
  //       }
  //     }
  //   }
  // }
}
class UserAPI {
  constructor(h) {
    this.fetcher = h, this.basePath = "/user";
  }
  // 2.1 Check User Email
  async checkEmailExist(h) {
    const U = new APIRequest({
      url: `${this.basePath}/check-user`,
      method: "GET",
      query: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.2 Get User PW State
  async getUserPasswordState(h) {
    const U = new APIRequest({
      url: `${this.basePath}/password-state`,
      method: "GET",
      query: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.3 Provider Login
  async oAuth(h, U) {
    const B = new APIRequest({
      url: `${this.basePath}/oauth/login/${U.provider}`,
      method: "GET",
      query: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.4 Verify User Email
  async verify(h) {
    const U = new APIRequest({
      url: `${this.basePath}/verify`,
      method: "POST",
      data: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.5 Login
  async login(h) {
    const U = new APIRequest({
      url: `${this.basePath}/login`,
      method: "POST",
      data: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U, { ignoreCheckToken: !0 })).data;
  }
  // 2.6 Update User PW State
  async updateUserPasswordState(h, U) {
    const B = new APIRequest({
      url: `${this.basePath}/${h.userId}/password-state`,
      method: "PATCH",
      data: U,
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 2.7 Update Terms Accepted
  async updateTermsAccepted(h, U) {
    const B = new APIRequest({
      url: `${this.basePath}/${h.userId}/terms-accepted`,
      method: "PATCH",
      data: U,
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 2.8 Get Access Token
  async refreshToken() {
    const h = new APIRequest({
      url: `${this.basePath}/access-token`,
      method: "GET",
      // query: {
      //   refresh_token: WepinStorage.getLocalStorage('token')?.refreshToken,
      // },
      withCredentials: !0
    });
    return (await this.fetcher.send(h, { ignoreCheckToken: !0 })).data;
  }
  // 2.9 Get Public Key
  async fetchKey() {
    const h = new APIRequest({
      url: `${this.basePath}/pubkey`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(h)).data;
  }
  // 2.11 Get Terms Accepted
  async getTermsAccepted(h) {
    const U = new APIRequest({
      url: `${this.basePath}/${h.userId}/terms-accepted`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 2.12 Logout
  async logout(h) {
    const U = new APIRequest({
      url: `${this.basePath}/${h.userId}/logout`,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 2.13 Get Firebase Config
  async getFirebaseConfig() {
    const h = new APIRequest({
      url: `${this.basePath}/firebase-config`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(h, { ignoreCheckToken: !0 })).data;
  }
  // 2.14 Login OAuth idToken
  async loginOAuthIdToken(h) {
    const U = new APIRequest({
      url: `${this.basePath}/oauth/login/id-token`,
      method: "POST",
      data: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U, { ignoreCheckToken: !0 })).data;
  }
  // 2.15 Login OAuth AccessToken
  async loginOAuthAccessToken(h) {
    const U = new APIRequest({
      url: `${this.basePath}/oauth/login/access-token`,
      method: "POST",
      data: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U, { ignoreCheckToken: !0 })).data;
  }
  // 2.18 Get User Info
  async getUserInfo(h) {
    const U = new APIRequest({
      url: `${this.basePath}/${h.userId}/detail`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
}
class WalletAPI {
  constructor(h) {
    this.fetcher = h, this.basePath = "/wallet";
  }
  // 3.1 Verify Wallet PIN
  async verifyPin(h) {
    const U = new APIRequest({
      url: `${this.basePath}/pin/verify`,
      data: h,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 3.2 Change Wallet PIN
  async changePin(h) {
    const U = new APIRequest({
      url: `${this.basePath}/pin/change`,
      data: h,
      method: "PATCH",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 3.3 Get Wallet Info
  async fetchWalletInfo(h, U) {
    const B = new APIRequest({
      url: `${this.basePath}/${h.walletId}`,
      query: U,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 3.4 Get Wallet Key Info
  async getWalletKeyInfo(h, U) {
    const B = new APIRequest({
      url: `${this.basePath}/${h.walletId}/wallet-keyinfo`,
      query: U,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 3.5 Reset Wallet PIN Try Count
  async resetPinTryCount(h, U) {
    const B = new APIRequest({
      url: `${this.basePath}/${h.walletId}/pin/reset-try-count`,
      query: U,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
}
class AppAPI {
  constructor(h) {
    this.fetcher = h, this.basePath = "/app";
  }
  // 1.1 Get Theme
  async getThemeById(h) {
    return (await fetch(`${this.fetcher.baseUrl}/app/theme/${h.id}`, {
      method: "GET"
    })).json();
  }
  async getLayoutById(h) {
    return (await fetch(`${this.fetcher.baseUrl}/app/layout/${h.id}`, {
      method: "GET"
    })).json();
  }
  // 1.3 Get App Info
  async getAppInfo(h) {
    const U = new APIRequest({
      url: `${this.basePath}/info`,
      query: h,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(U, {
      ignoreCheckToken: !0
    })).data;
  }
  // 1.4 Get App Coins
  async getAppCoins(h) {
    const U = new APIRequest({
      url: `${this.basePath}/coins`,
      method: "GET",
      query: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U, {
      ignoreCheckToken: !0
    })).data;
  }
  // 1.5 Get App Theme
  async getAppTheme() {
    const h = new APIRequest({
      url: `${this.basePath}/theme`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(h, {
      ignoreCheckToken: !0
    })).data;
  }
  // 1.6 Register
  async register(h) {
    const U = new APIRequest({
      url: `${this.basePath}/register`,
      method: "POST",
      data: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
}
class AccountAPI {
  constructor(h) {
    this.fetcher = h, this.basePath = "/account";
  }
  // 4.1 Readdress
  async readdress(h) {
    const U = new APIRequest({
      url: `${this.basePath}/readdress`,
      data: h,
      method: "PATCH",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 4.2 Get App Account
  async getAppAccountList(h) {
    const U = new APIRequest({
      url: `${this.basePath}`,
      query: h,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
}
class AccountBalanceAPI {
  constructor(h) {
    this.fetcher = h, this.basePath = "/accountbalance";
  }
  // 5.1 Get Account Balance
  async getAccountBalance(h) {
    const U = new APIRequest({
      url: `${this.basePath}/${h.accountId}/balance`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
}
class NFTAPI {
  constructor(h) {
    this.fetcher = h, this.basePath = "/nft";
  }
  // 6.1 Get NFT supporting network list
  async getSupportingNetworkList() {
    const h = new APIRequest({
      url: `${this.basePath}/support-network`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(h, {
      // ignoreCheckToken: true,
    })).data;
  }
  // 6.2 Get App NFTs
  async getAppNFTList(h) {
    const U = new APIRequest({
      url: this.basePath,
      method: "GET",
      query: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 6.3 Refresh NFTs
  async refreshAppNFTList(h) {
    const U = new APIRequest({
      url: `${this.basePath}/refresh`,
      method: "GET",
      query: h,
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
}
class TransactionAPI {
  constructor(h) {
    this.fetcher = h, this.basePath = "/tx";
  }
  // 7.1 Sign transaction
  async sign(h) {
    const U = new APIRequest({
      url: `${this.basePath}/sign`,
      data: h,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 7.2 Broadcast Transaction
  async broadCast(h) {
    const U = new APIRequest({
      url: `${this.basePath}/broadcast`,
      data: h,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 7.3 Get prepare transaction data
  async prepareTransaction(h) {
    const U = new APIRequest({
      url: `${this.basePath}/prepare`,
      data: h,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
  // 7.4 Check Address validation
  async checkAddressValidation(h) {
    const U = new APIRequest({
      url: `${this.basePath}/check_address`,
      query: h,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(U)).data;
  }
}
class WepinSdkAPI {
  constructor(h, U) {
    const B = new WepinSDKFetchAPI(h, U);
    this.app = new AppAPI(B), this.user = new UserAPI(B), this.wallet = new WalletAPI(B), this.account = new AccountAPI(B), this.balance = new AccountBalanceAPI(B), this.nft = new NFTAPI(B), this.transaction = new TransactionAPI(B);
  }
}
class WepinFetch {
  constructor({
    appId: h,
    appKey: U,
    domain: B,
    sdk: V,
    storage: t
  }) {
    this.version = packageJson.version, this.appId = h, this._appKey = U, this._domain = B, this._token = void 0, this.sdk = V, this._wepinStorage = t ?? c$1;
  }
  async init() {
    const h = await WepinFetch.getFirebaseConfig(
      this._appKey,
      this.sdk.type,
      this.sdk.version
    );
    this.wepinFirebaseApi = new FirebaseAuthAPI(h), this.wepinApi = new WepinSdkAPI(getBaseUrl(this._appKey), {
      appId: this.appId,
      appKey: this._appKey,
      domain: this._domain,
      sdk: this.sdk,
      wepinFetch: this
    }), this._isInitialized = !0;
  }
  isInitialized() {
    return this._isInitialized;
  }
  static async getFirebaseConfig(h, U, B) {
    const V = getBaseUrl(h), t = await (await fetch(`${V}/user/firebase-config`, {
      method: "GET",
      headers: {
        "X-API-KEY": h,
        "X-SDK-TYPE": U,
        "X-SDK-VERSION": B,
        "Content-Type": "application/json"
      }
    })).text();
    return JSON.parse(atob(t));
  }
  get Token() {
    return this._token = this._wepinStorage.getLocalStorage(
      this.appId,
      "wepin:connectUser"
    ), this._token;
  }
  setToken(h) {
    this._token = h, h ? this._wepinStorage.setLocalStorage(this.appId, "wepin:connectUser", h) : this._wepinStorage.clearLocalStorage(this.appId, "wepin:connectUser");
  }
  // public finalize() {
  //   this._wepinStorage.clearLocalStorage(this.appId, 'wepin:connectUser')
  // }
}
var ProjectPlatformKind = /* @__PURE__ */ (($) => ($[$.web = 1] = "web", $[$.android = 2] = "android", $[$.ios = 3] = "ios", $))(ProjectPlatformKind || {});
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode($) {
  return decodeURIComponent(atob($).replace(/(.)/g, (h, U) => {
    let B = U.charCodeAt(0).toString(16).toUpperCase();
    return B.length < 2 && (B = "0" + B), "%" + B;
  }));
}
function base64UrlDecode($) {
  let h = $.replace(/-/g, "+").replace(/_/g, "/");
  switch (h.length % 4) {
    case 0:
      break;
    case 2:
      h += "==";
      break;
    case 3:
      h += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(h);
  } catch {
    return atob(h);
  }
}
function jwtDecode($, h) {
  if (typeof $ != "string")
    throw new InvalidTokenError("Invalid token specified: must be a string");
  h || (h = {});
  const U = h.header === !0 ? 0 : 1, B = $.split(".")[U];
  if (typeof B != "string")
    throw new InvalidTokenError(`Invalid token specified: missing part #${U + 1}`);
  let V;
  try {
    V = base64UrlDecode(B);
  } catch (t) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${U + 1} (${t.message})`);
  }
  try {
    return JSON.parse(V);
  } catch (t) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${U + 1} (${t.message})`);
  }
}
const getAccountSDK = ($) => {
  let h = [];
  return $ != null && $.length && (h = $.map((U) => U.contract && U.accountTokenId ? {
    network: U.network,
    address: U.address,
    contract: U.contract
    // name: account.name,
  } : {
    network: U.network,
    address: U.address
  })), h;
}, filterAccountList = ($, h) => {
  const { accounts: U, aa_accounts: B } = $;
  return h ? B ? U.concat(B) : U : U.map((t) => {
    const O = B == null ? void 0 : B.find(
      (M) => M.coinId === t.coinId && (M == null ? void 0 : M.contract) === (t == null ? void 0 : t.contract) && (M == null ? void 0 : M.eoaAddress) === t.address
    );
    return O || t;
  });
};
var u = ($, h, U) => {
  if (!h.has($))
    throw TypeError("Cannot " + U);
}, i = ($, h, U) => (u($, h, "read from private field"), U ? U.call($) : h.get($)), n = ($, h, U) => {
  if (h.has($))
    throw TypeError("Cannot add the same private member more than once");
  h instanceof WeakSet ? h.add($) : h.set($, U);
}, l;
const s = class Dt {
  static getLocalStorageEnabled() {
    let h = !1;
    try {
      h = window.localStorage && !0;
    } catch {
      h = !1;
    }
    return h;
  }
  static setAllLocalStorage(h, U) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const B = JSON.stringify(U);
    localStorage.setItem(i(this, l) + h, B);
  }
  static setLocalStorage(h, U, B) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const V = this.getAllLocalStorage(h);
    if (V) {
      V[U] = B, localStorage.setItem(
        i(this, l) + h,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(V)
      );
      return;
    }
    const t = { [U]: B };
    localStorage.setItem(
      i(this, l) + h,
      // btoa(JSON.stringify(newData)),
      JSON.stringify(t)
    );
  }
  static getLocalStorage(h, U) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const B = this.getAllLocalStorage(h);
    try {
      if (B)
        return JSON.parse(B[U]);
    } catch {
      return B[U];
    }
  }
  static getAllLocalStorage(h) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    try {
      return localStorage.getItem(i(this, l) + h) ? (
        // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
        JSON.parse(localStorage.getItem(i(this, l) + h))
      ) : void 0;
    } catch {
      return;
    }
  }
  static clearLocalStorage(h, U) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    if (this.getLocalStorage(h, U)) {
      const B = this.getAllLocalStorage(h);
      delete B[U], localStorage.setItem(
        i(this, l) + h,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(B)
      );
    }
  }
  static clearAllLocalStorage(h) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    localStorage.removeItem(i(this, l) + h);
  }
  static setLoginUserLocalStorage(h, U, B) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const V = {};
    return V["firebase:wepin"] = Object.assign(
      { provider: U == null ? void 0 : U.provider },
      U == null ? void 0 : U.token
    ), V["wepin:connectUser"] = {
      accessToken: B.token.access,
      refreshToken: B.token.refresh
    }, V.user_id = B.userInfo.userId, V.user_info = {
      status: "success",
      userInfo: {
        userId: B.userInfo.userId,
        email: B.userInfo.email,
        provider: U.provider,
        use2FA: B.userInfo.use2FA >= 2
      }
    }, V.user_status = {
      loginStatus: B.loginStatus,
      pinRequired: B.loginStatus === "registerRequired" ? B.pinRequired : !1
    }, B.loginStatus !== "pinRequired" && B.walletId && (V.wallet_id = B.walletId, V.user_info.walletId = B.walletId), V.oauth_provider_pending = U.provider, Dt.setAllLocalStorage(h, V), {
      userInfo: V.user_info,
      connectUser: V["wepin:connectUser"]
    };
  }
};
l = /* @__PURE__ */ new WeakMap(), s.platform = "web", n(s, l, "wepin:auth:");
let c = s;
var isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, mathceil = Math.ceil, mathfloor = Math.floor, bignumberError = "[BigNumber Error] ", tooManyDigits = bignumberError + "Number primitive has more than 15 significant digits: ", BASE = 1e14, LOG_BASE = 14, MAX_SAFE_INTEGER = 9007199254740991, POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], SQRT_BASE = 1e7, MAX = 1e9;
function clone($) {
  var h, U, B, V = oe.prototype = { constructor: oe, toString: null, valueOf: null }, t = new oe(1), O = 20, M = 4, D = -7, I = 21, P = -1e7, Y = 1e7, X = !1, ee = 1, re = 0, ie = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, ne = "0123456789abcdefghijklmnopqrstuvwxyz", se = !0;
  function oe(he, le) {
    var _e, G, Z, e, o, g, H, F, A = this;
    if (!(A instanceof oe))
      return new oe(he, le);
    if (le == null) {
      if (he && he._isBigNumber === !0) {
        A.s = he.s, !he.c || he.e > Y ? A.c = A.e = null : he.e < P ? A.c = [A.e = 0] : (A.e = he.e, A.c = he.c.slice());
        return;
      }
      if ((g = typeof he == "number") && he * 0 == 0) {
        if (A.s = 1 / he < 0 ? (he = -he, -1) : 1, he === ~~he) {
          for (e = 0, o = he; o >= 10; o /= 10, e++)
            ;
          e > Y ? A.c = A.e = null : (A.e = e, A.c = [he]);
          return;
        }
        F = String(he);
      } else {
        if (!isNumeric.test(F = String(he)))
          return B(A, F, g);
        A.s = F.charCodeAt(0) == 45 ? (F = F.slice(1), -1) : 1;
      }
      (e = F.indexOf(".")) > -1 && (F = F.replace(".", "")), (o = F.search(/e/i)) > 0 ? (e < 0 && (e = o), e += +F.slice(o + 1), F = F.substring(0, o)) : e < 0 && (e = F.length);
    } else {
      if (intCheck(le, 2, ne.length, "Base"), le == 10 && se)
        return A = new oe(he), Se(A, O + A.e + 1, M);
      if (F = String(he), g = typeof he == "number") {
        if (he * 0 != 0)
          return B(A, F, g, le);
        if (A.s = 1 / he < 0 ? (F = F.slice(1), -1) : 1, oe.DEBUG && F.replace(/^0\.0*|\./, "").length > 15)
          throw Error(tooManyDigits + he);
      } else
        A.s = F.charCodeAt(0) === 45 ? (F = F.slice(1), -1) : 1;
      for (_e = ne.slice(0, le), e = o = 0, H = F.length; o < H; o++)
        if (_e.indexOf(G = F.charAt(o)) < 0) {
          if (G == ".") {
            if (o > e) {
              e = H;
              continue;
            }
          } else if (!Z && (F == F.toUpperCase() && (F = F.toLowerCase()) || F == F.toLowerCase() && (F = F.toUpperCase()))) {
            Z = !0, o = -1, e = 0;
            continue;
          }
          return B(A, String(he), g, le);
        }
      g = !1, F = U(F, le, 10, A.s), (e = F.indexOf(".")) > -1 ? F = F.replace(".", "") : e = F.length;
    }
    for (o = 0; F.charCodeAt(o) === 48; o++)
      ;
    for (H = F.length; F.charCodeAt(--H) === 48; )
      ;
    if (F = F.slice(o, ++H)) {
      if (H -= o, g && oe.DEBUG && H > 15 && (he > MAX_SAFE_INTEGER || he !== mathfloor(he)))
        throw Error(tooManyDigits + A.s * he);
      if ((e = e - o - 1) > Y)
        A.c = A.e = null;
      else if (e < P)
        A.c = [A.e = 0];
      else {
        if (A.e = e, A.c = [], o = (e + 1) % LOG_BASE, e < 0 && (o += LOG_BASE), o < H) {
          for (o && A.c.push(+F.slice(0, o)), H -= LOG_BASE; o < H; )
            A.c.push(+F.slice(o, o += LOG_BASE));
          o = LOG_BASE - (F = F.slice(o)).length;
        } else
          o -= H;
        for (; o--; F += "0")
          ;
        A.c.push(+F);
      }
    } else
      A.c = [A.e = 0];
  }
  oe.clone = clone, oe.ROUND_UP = 0, oe.ROUND_DOWN = 1, oe.ROUND_CEIL = 2, oe.ROUND_FLOOR = 3, oe.ROUND_HALF_UP = 4, oe.ROUND_HALF_DOWN = 5, oe.ROUND_HALF_EVEN = 6, oe.ROUND_HALF_CEIL = 7, oe.ROUND_HALF_FLOOR = 8, oe.EUCLID = 9, oe.config = oe.set = function(he) {
    var le, _e;
    if (he != null)
      if (typeof he == "object") {
        if (he.hasOwnProperty(le = "DECIMAL_PLACES") && (_e = he[le], intCheck(_e, 0, MAX, le), O = _e), he.hasOwnProperty(le = "ROUNDING_MODE") && (_e = he[le], intCheck(_e, 0, 8, le), M = _e), he.hasOwnProperty(le = "EXPONENTIAL_AT") && (_e = he[le], _e && _e.pop ? (intCheck(_e[0], -MAX, 0, le), intCheck(_e[1], 0, MAX, le), D = _e[0], I = _e[1]) : (intCheck(_e, -MAX, MAX, le), D = -(I = _e < 0 ? -_e : _e))), he.hasOwnProperty(le = "RANGE"))
          if (_e = he[le], _e && _e.pop)
            intCheck(_e[0], -MAX, -1, le), intCheck(_e[1], 1, MAX, le), P = _e[0], Y = _e[1];
          else if (intCheck(_e, -MAX, MAX, le), _e)
            P = -(Y = _e < 0 ? -_e : _e);
          else
            throw Error(bignumberError + le + " cannot be zero: " + _e);
        if (he.hasOwnProperty(le = "CRYPTO"))
          if (_e = he[le], _e === !!_e)
            if (_e)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                X = _e;
              else
                throw X = !_e, Error(bignumberError + "crypto unavailable");
            else
              X = _e;
          else
            throw Error(bignumberError + le + " not true or false: " + _e);
        if (he.hasOwnProperty(le = "MODULO_MODE") && (_e = he[le], intCheck(_e, 0, 9, le), ee = _e), he.hasOwnProperty(le = "POW_PRECISION") && (_e = he[le], intCheck(_e, 0, MAX, le), re = _e), he.hasOwnProperty(le = "FORMAT"))
          if (_e = he[le], typeof _e == "object")
            ie = _e;
          else
            throw Error(bignumberError + le + " not an object: " + _e);
        if (he.hasOwnProperty(le = "ALPHABET"))
          if (_e = he[le], typeof _e == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(_e))
            se = _e.slice(0, 10) == "0123456789", ne = _e;
          else
            throw Error(bignumberError + le + " invalid: " + _e);
      } else
        throw Error(bignumberError + "Object expected: " + he);
    return {
      DECIMAL_PLACES: O,
      ROUNDING_MODE: M,
      EXPONENTIAL_AT: [D, I],
      RANGE: [P, Y],
      CRYPTO: X,
      MODULO_MODE: ee,
      POW_PRECISION: re,
      FORMAT: ie,
      ALPHABET: ne
    };
  }, oe.isBigNumber = function(he) {
    if (!he || he._isBigNumber !== !0)
      return !1;
    if (!oe.DEBUG)
      return !0;
    var le, _e, G = he.c, Z = he.e, e = he.s;
    e:
      if ({}.toString.call(G) == "[object Array]") {
        if ((e === 1 || e === -1) && Z >= -MAX && Z <= MAX && Z === mathfloor(Z)) {
          if (G[0] === 0) {
            if (Z === 0 && G.length === 1)
              return !0;
            break e;
          }
          if (le = (Z + 1) % LOG_BASE, le < 1 && (le += LOG_BASE), String(G[0]).length == le) {
            for (le = 0; le < G.length; le++)
              if (_e = G[le], _e < 0 || _e >= BASE || _e !== mathfloor(_e))
                break e;
            if (_e !== 0)
              return !0;
          }
        }
      } else if (G === null && Z === null && (e === null || e === 1 || e === -1))
        return !0;
    throw Error(bignumberError + "Invalid BigNumber: " + he);
  }, oe.maximum = oe.max = function() {
    return de(arguments, -1);
  }, oe.minimum = oe.min = function() {
    return de(arguments, 1);
  }, oe.random = function() {
    var he = 9007199254740992, le = Math.random() * he & 2097151 ? function() {
      return mathfloor(Math.random() * he);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(_e) {
      var G, Z, e, o, g, H = 0, F = [], A = new oe(t);
      if (_e == null ? _e = O : intCheck(_e, 0, MAX), o = mathceil(_e / LOG_BASE), X)
        if (crypto.getRandomValues) {
          for (G = crypto.getRandomValues(new Uint32Array(o *= 2)); H < o; )
            g = G[H] * 131072 + (G[H + 1] >>> 11), g >= 9e15 ? (Z = crypto.getRandomValues(new Uint32Array(2)), G[H] = Z[0], G[H + 1] = Z[1]) : (F.push(g % 1e14), H += 2);
          H = o / 2;
        } else if (crypto.randomBytes) {
          for (G = crypto.randomBytes(o *= 7); H < o; )
            g = (G[H] & 31) * 281474976710656 + G[H + 1] * 1099511627776 + G[H + 2] * 4294967296 + G[H + 3] * 16777216 + (G[H + 4] << 16) + (G[H + 5] << 8) + G[H + 6], g >= 9e15 ? crypto.randomBytes(7).copy(G, H) : (F.push(g % 1e14), H += 7);
          H = o / 7;
        } else
          throw X = !1, Error(bignumberError + "crypto unavailable");
      if (!X)
        for (; H < o; )
          g = le(), g < 9e15 && (F[H++] = g % 1e14);
      for (o = F[--H], _e %= LOG_BASE, o && _e && (g = POWS_TEN[LOG_BASE - _e], F[H] = mathfloor(o / g) * g); F[H] === 0; F.pop(), H--)
        ;
      if (H < 0)
        F = [e = 0];
      else {
        for (e = -1; F[0] === 0; F.splice(0, 1), e -= LOG_BASE)
          ;
        for (H = 1, g = F[0]; g >= 10; g /= 10, H++)
          ;
        H < LOG_BASE && (e -= LOG_BASE - H);
      }
      return A.e = e, A.c = F, A;
    };
  }(), oe.sum = function() {
    for (var he = 1, le = arguments, _e = new oe(le[0]); he < le.length; )
      _e = _e.plus(le[he++]);
    return _e;
  }, U = /* @__PURE__ */ function() {
    var he = "0123456789";
    function le(_e, G, Z, e) {
      for (var o, g = [0], H, F = 0, A = _e.length; F < A; ) {
        for (H = g.length; H--; g[H] *= G)
          ;
        for (g[0] += e.indexOf(_e.charAt(F++)), o = 0; o < g.length; o++)
          g[o] > Z - 1 && (g[o + 1] == null && (g[o + 1] = 0), g[o + 1] += g[o] / Z | 0, g[o] %= Z);
      }
      return g.reverse();
    }
    return function(_e, G, Z, e, o) {
      var g, H, F, A, q, z, S, J, ce = _e.indexOf("."), ye = O, Me = M;
      for (ce >= 0 && (A = re, re = 0, _e = _e.replace(".", ""), J = new oe(G), z = J.pow(_e.length - ce), re = A, J.c = le(
        toFixedPoint(coeffToString(z.c), z.e, "0"),
        10,
        Z,
        he
      ), J.e = J.c.length), S = le(_e, G, Z, o ? (g = ne, he) : (g = he, ne)), F = A = S.length; S[--A] == 0; S.pop())
        ;
      if (!S[0])
        return g.charAt(0);
      if (ce < 0 ? --F : (z.c = S, z.e = F, z.s = e, z = h(z, J, ye, Me, Z), S = z.c, q = z.r, F = z.e), H = F + ye + 1, ce = S[H], A = Z / 2, q = q || H < 0 || S[H + 1] != null, q = Me < 4 ? (ce != null || q) && (Me == 0 || Me == (z.s < 0 ? 3 : 2)) : ce > A || ce == A && (Me == 4 || q || Me == 6 && S[H - 1] & 1 || Me == (z.s < 0 ? 8 : 7)), H < 1 || !S[0])
        _e = q ? toFixedPoint(g.charAt(1), -ye, g.charAt(0)) : g.charAt(0);
      else {
        if (S.length = H, q)
          for (--Z; ++S[--H] > Z; )
            S[H] = 0, H || (++F, S = [1].concat(S));
        for (A = S.length; !S[--A]; )
          ;
        for (ce = 0, _e = ""; ce <= A; _e += g.charAt(S[ce++]))
          ;
        _e = toFixedPoint(_e, F, g.charAt(0));
      }
      return _e;
    };
  }(), h = /* @__PURE__ */ function() {
    function he(G, Z, e) {
      var o, g, H, F, A = 0, q = G.length, z = Z % SQRT_BASE, S = Z / SQRT_BASE | 0;
      for (G = G.slice(); q--; )
        H = G[q] % SQRT_BASE, F = G[q] / SQRT_BASE | 0, o = S * H + F * z, g = z * H + o % SQRT_BASE * SQRT_BASE + A, A = (g / e | 0) + (o / SQRT_BASE | 0) + S * F, G[q] = g % e;
      return A && (G = [A].concat(G)), G;
    }
    function le(G, Z, e, o) {
      var g, H;
      if (e != o)
        H = e > o ? 1 : -1;
      else
        for (g = H = 0; g < e; g++)
          if (G[g] != Z[g]) {
            H = G[g] > Z[g] ? 1 : -1;
            break;
          }
      return H;
    }
    function _e(G, Z, e, o) {
      for (var g = 0; e--; )
        G[e] -= g, g = G[e] < Z[e] ? 1 : 0, G[e] = g * o + G[e] - Z[e];
      for (; !G[0] && G.length > 1; G.splice(0, 1))
        ;
    }
    return function(G, Z, e, o, g) {
      var H, F, A, q, z, S, J, ce, ye, Me, me, ue, fe, Ae, Be, pe, ge, Ee = G.s == Z.s ? 1 : -1, Ie = G.c, Pe = Z.c;
      if (!Ie || !Ie[0] || !Pe || !Pe[0])
        return new oe(
          // Return NaN if either NaN, or both Infinity or 0.
          !G.s || !Z.s || (Ie ? Pe && Ie[0] == Pe[0] : !Pe) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            Ie && Ie[0] == 0 || !Pe ? Ee * 0 : Ee / 0
          )
        );
      for (ce = new oe(Ee), ye = ce.c = [], F = G.e - Z.e, Ee = e + F + 1, g || (g = BASE, F = bitFloor(G.e / LOG_BASE) - bitFloor(Z.e / LOG_BASE), Ee = Ee / LOG_BASE | 0), A = 0; Pe[A] == (Ie[A] || 0); A++)
        ;
      if (Pe[A] > (Ie[A] || 0) && F--, Ee < 0)
        ye.push(1), q = !0;
      else {
        for (Ae = Ie.length, pe = Pe.length, A = 0, Ee += 2, z = mathfloor(g / (Pe[0] + 1)), z > 1 && (Pe = he(Pe, z, g), Ie = he(Ie, z, g), pe = Pe.length, Ae = Ie.length), fe = pe, Me = Ie.slice(0, pe), me = Me.length; me < pe; Me[me++] = 0)
          ;
        ge = Pe.slice(), ge = [0].concat(ge), Be = Pe[0], Pe[1] >= g / 2 && Be++;
        do {
          if (z = 0, H = le(Pe, Me, pe, me), H < 0) {
            if (ue = Me[0], pe != me && (ue = ue * g + (Me[1] || 0)), z = mathfloor(ue / Be), z > 1)
              for (z >= g && (z = g - 1), S = he(Pe, z, g), J = S.length, me = Me.length; le(S, Me, J, me) == 1; )
                z--, _e(S, pe < J ? ge : Pe, J, g), J = S.length, H = 1;
            else
              z == 0 && (H = z = 1), S = Pe.slice(), J = S.length;
            if (J < me && (S = [0].concat(S)), _e(Me, S, me, g), me = Me.length, H == -1)
              for (; le(Pe, Me, pe, me) < 1; )
                z++, _e(Me, pe < me ? ge : Pe, me, g), me = Me.length;
          } else
            H === 0 && (z++, Me = [0]);
          ye[A++] = z, Me[0] ? Me[me++] = Ie[fe] || 0 : (Me = [Ie[fe]], me = 1);
        } while ((fe++ < Ae || Me[0] != null) && Ee--);
        q = Me[0] != null, ye[0] || ye.splice(0, 1);
      }
      if (g == BASE) {
        for (A = 1, Ee = ye[0]; Ee >= 10; Ee /= 10, A++)
          ;
        Se(ce, e + (ce.e = A + F * LOG_BASE - 1) + 1, o, q);
      } else
        ce.e = F, ce.r = +q;
      return ce;
    };
  }();
  function be(he, le, _e, G) {
    var Z, e, o, g, H;
    if (_e == null ? _e = M : intCheck(_e, 0, 8), !he.c)
      return he.toString();
    if (Z = he.c[0], o = he.e, le == null)
      H = coeffToString(he.c), H = G == 1 || G == 2 && (o <= D || o >= I) ? toExponential(H, o) : toFixedPoint(H, o, "0");
    else if (he = Se(new oe(he), le, _e), e = he.e, H = coeffToString(he.c), g = H.length, G == 1 || G == 2 && (le <= e || e <= D)) {
      for (; g < le; H += "0", g++)
        ;
      H = toExponential(H, e);
    } else if (le -= o, H = toFixedPoint(H, e, "0"), e + 1 > g) {
      if (--le > 0)
        for (H += "."; le--; H += "0")
          ;
    } else if (le += e - g, le > 0)
      for (e + 1 == g && (H += "."); le--; H += "0")
        ;
    return he.s < 0 && Z ? "-" + H : H;
  }
  function de(he, le) {
    for (var _e, G, Z = 1, e = new oe(he[0]); Z < he.length; Z++)
      G = new oe(he[Z]), (!G.s || (_e = compare(e, G)) === le || _e === 0 && e.s === le) && (e = G);
    return e;
  }
  function we(he, le, _e) {
    for (var G = 1, Z = le.length; !le[--Z]; le.pop())
      ;
    for (Z = le[0]; Z >= 10; Z /= 10, G++)
      ;
    return (_e = G + _e * LOG_BASE - 1) > Y ? he.c = he.e = null : _e < P ? he.c = [he.e = 0] : (he.e = _e, he.c = le), he;
  }
  B = /* @__PURE__ */ function() {
    var he = /^(-?)0([xbo])(?=\w[\w.]*$)/i, le = /^([^.]+)\.$/, _e = /^\.([^.]+)$/, G = /^-?(Infinity|NaN)$/, Z = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(e, o, g, H) {
      var F, A = g ? o : o.replace(Z, "");
      if (G.test(A))
        e.s = isNaN(A) ? null : A < 0 ? -1 : 1;
      else {
        if (!g && (A = A.replace(he, function(q, z, S) {
          return F = (S = S.toLowerCase()) == "x" ? 16 : S == "b" ? 2 : 8, !H || H == F ? z : q;
        }), H && (F = H, A = A.replace(le, "$1").replace(_e, "0.$1")), o != A))
          return new oe(A, F);
        if (oe.DEBUG)
          throw Error(bignumberError + "Not a" + (H ? " base " + H : "") + " number: " + o);
        e.s = null;
      }
      e.c = e.e = null;
    };
  }();
  function Se(he, le, _e, G) {
    var Z, e, o, g, H, F, A, q = he.c, z = POWS_TEN;
    if (q) {
      e: {
        for (Z = 1, g = q[0]; g >= 10; g /= 10, Z++)
          ;
        if (e = le - Z, e < 0)
          e += LOG_BASE, o = le, H = q[F = 0], A = mathfloor(H / z[Z - o - 1] % 10);
        else if (F = mathceil((e + 1) / LOG_BASE), F >= q.length)
          if (G) {
            for (; q.length <= F; q.push(0))
              ;
            H = A = 0, Z = 1, e %= LOG_BASE, o = e - LOG_BASE + 1;
          } else
            break e;
        else {
          for (H = g = q[F], Z = 1; g >= 10; g /= 10, Z++)
            ;
          e %= LOG_BASE, o = e - LOG_BASE + Z, A = o < 0 ? 0 : mathfloor(H / z[Z - o - 1] % 10);
        }
        if (G = G || le < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        q[F + 1] != null || (o < 0 ? H : H % z[Z - o - 1]), G = _e < 4 ? (A || G) && (_e == 0 || _e == (he.s < 0 ? 3 : 2)) : A > 5 || A == 5 && (_e == 4 || G || _e == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (e > 0 ? o > 0 ? H / z[Z - o] : 0 : q[F - 1]) % 10 & 1 || _e == (he.s < 0 ? 8 : 7)), le < 1 || !q[0])
          return q.length = 0, G ? (le -= he.e + 1, q[0] = z[(LOG_BASE - le % LOG_BASE) % LOG_BASE], he.e = -le || 0) : q[0] = he.e = 0, he;
        if (e == 0 ? (q.length = F, g = 1, F--) : (q.length = F + 1, g = z[LOG_BASE - e], q[F] = o > 0 ? mathfloor(H / z[Z - o] % z[o]) * g : 0), G)
          for (; ; )
            if (F == 0) {
              for (e = 1, o = q[0]; o >= 10; o /= 10, e++)
                ;
              for (o = q[0] += g, g = 1; o >= 10; o /= 10, g++)
                ;
              e != g && (he.e++, q[0] == BASE && (q[0] = 1));
              break;
            } else {
              if (q[F] += g, q[F] != BASE)
                break;
              q[F--] = 0, g = 1;
            }
        for (e = q.length; q[--e] === 0; q.pop())
          ;
      }
      he.e > Y ? he.c = he.e = null : he.e < P && (he.c = [he.e = 0]);
    }
    return he;
  }
  function ke(he) {
    var le, _e = he.e;
    return _e === null ? he.toString() : (le = coeffToString(he.c), le = _e <= D || _e >= I ? toExponential(le, _e) : toFixedPoint(le, _e, "0"), he.s < 0 ? "-" + le : le);
  }
  return V.absoluteValue = V.abs = function() {
    var he = new oe(this);
    return he.s < 0 && (he.s = 1), he;
  }, V.comparedTo = function(he, le) {
    return compare(this, new oe(he, le));
  }, V.decimalPlaces = V.dp = function(he, le) {
    var _e, G, Z, e = this;
    if (he != null)
      return intCheck(he, 0, MAX), le == null ? le = M : intCheck(le, 0, 8), Se(new oe(e), he + e.e + 1, le);
    if (!(_e = e.c))
      return null;
    if (G = ((Z = _e.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE, Z = _e[Z])
      for (; Z % 10 == 0; Z /= 10, G--)
        ;
    return G < 0 && (G = 0), G;
  }, V.dividedBy = V.div = function(he, le) {
    return h(this, new oe(he, le), O, M);
  }, V.dividedToIntegerBy = V.idiv = function(he, le) {
    return h(this, new oe(he, le), 0, 1);
  }, V.exponentiatedBy = V.pow = function(he, le) {
    var _e, G, Z, e, o, g, H, F, A, q = this;
    if (he = new oe(he), he.c && !he.isInteger())
      throw Error(bignumberError + "Exponent not an integer: " + ke(he));
    if (le != null && (le = new oe(le)), g = he.e > 14, !q.c || !q.c[0] || q.c[0] == 1 && !q.e && q.c.length == 1 || !he.c || !he.c[0])
      return A = new oe(Math.pow(+ke(q), g ? he.s * (2 - isOdd(he)) : +ke(he))), le ? A.mod(le) : A;
    if (H = he.s < 0, le) {
      if (le.c ? !le.c[0] : !le.s)
        return new oe(NaN);
      G = !H && q.isInteger() && le.isInteger(), G && (q = q.mod(le));
    } else {
      if (he.e > 9 && (q.e > 0 || q.e < -1 || (q.e == 0 ? q.c[0] > 1 || g && q.c[1] >= 24e7 : q.c[0] < 8e13 || g && q.c[0] <= 9999975e7)))
        return e = q.s < 0 && isOdd(he) ? -0 : 0, q.e > -1 && (e = 1 / e), new oe(H ? 1 / e : e);
      re && (e = mathceil(re / LOG_BASE + 2));
    }
    for (g ? (_e = new oe(0.5), H && (he.s = 1), F = isOdd(he)) : (Z = Math.abs(+ke(he)), F = Z % 2), A = new oe(t); ; ) {
      if (F) {
        if (A = A.times(q), !A.c)
          break;
        e ? A.c.length > e && (A.c.length = e) : G && (A = A.mod(le));
      }
      if (Z) {
        if (Z = mathfloor(Z / 2), Z === 0)
          break;
        F = Z % 2;
      } else if (he = he.times(_e), Se(he, he.e + 1, 1), he.e > 14)
        F = isOdd(he);
      else {
        if (Z = +ke(he), Z === 0)
          break;
        F = Z % 2;
      }
      q = q.times(q), e ? q.c && q.c.length > e && (q.c.length = e) : G && (q = q.mod(le));
    }
    return G ? A : (H && (A = t.div(A)), le ? A.mod(le) : e ? Se(A, re, M, o) : A);
  }, V.integerValue = function(he) {
    var le = new oe(this);
    return he == null ? he = M : intCheck(he, 0, 8), Se(le, le.e + 1, he);
  }, V.isEqualTo = V.eq = function(he, le) {
    return compare(this, new oe(he, le)) === 0;
  }, V.isFinite = function() {
    return !!this.c;
  }, V.isGreaterThan = V.gt = function(he, le) {
    return compare(this, new oe(he, le)) > 0;
  }, V.isGreaterThanOrEqualTo = V.gte = function(he, le) {
    return (le = compare(this, new oe(he, le))) === 1 || le === 0;
  }, V.isInteger = function() {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  }, V.isLessThan = V.lt = function(he, le) {
    return compare(this, new oe(he, le)) < 0;
  }, V.isLessThanOrEqualTo = V.lte = function(he, le) {
    return (le = compare(this, new oe(he, le))) === -1 || le === 0;
  }, V.isNaN = function() {
    return !this.s;
  }, V.isNegative = function() {
    return this.s < 0;
  }, V.isPositive = function() {
    return this.s > 0;
  }, V.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, V.minus = function(he, le) {
    var _e, G, Z, e, o = this, g = o.s;
    if (he = new oe(he, le), le = he.s, !g || !le)
      return new oe(NaN);
    if (g != le)
      return he.s = -le, o.plus(he);
    var H = o.e / LOG_BASE, F = he.e / LOG_BASE, A = o.c, q = he.c;
    if (!H || !F) {
      if (!A || !q)
        return A ? (he.s = -le, he) : new oe(q ? o : NaN);
      if (!A[0] || !q[0])
        return q[0] ? (he.s = -le, he) : new oe(A[0] ? o : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          M == 3 ? -0 : 0
        ));
    }
    if (H = bitFloor(H), F = bitFloor(F), A = A.slice(), g = H - F) {
      for ((e = g < 0) ? (g = -g, Z = A) : (F = H, Z = q), Z.reverse(), le = g; le--; Z.push(0))
        ;
      Z.reverse();
    } else
      for (G = (e = (g = A.length) < (le = q.length)) ? g : le, g = le = 0; le < G; le++)
        if (A[le] != q[le]) {
          e = A[le] < q[le];
          break;
        }
    if (e && (Z = A, A = q, q = Z, he.s = -he.s), le = (G = q.length) - (_e = A.length), le > 0)
      for (; le--; A[_e++] = 0)
        ;
    for (le = BASE - 1; G > g; ) {
      if (A[--G] < q[G]) {
        for (_e = G; _e && !A[--_e]; A[_e] = le)
          ;
        --A[_e], A[G] += BASE;
      }
      A[G] -= q[G];
    }
    for (; A[0] == 0; A.splice(0, 1), --F)
      ;
    return A[0] ? we(he, A, F) : (he.s = M == 3 ? -1 : 1, he.c = [he.e = 0], he);
  }, V.modulo = V.mod = function(he, le) {
    var _e, G, Z = this;
    return he = new oe(he, le), !Z.c || !he.s || he.c && !he.c[0] ? new oe(NaN) : !he.c || Z.c && !Z.c[0] ? new oe(Z) : (ee == 9 ? (G = he.s, he.s = 1, _e = h(Z, he, 0, 3), he.s = G, _e.s *= G) : _e = h(Z, he, 0, ee), he = Z.minus(_e.times(he)), !he.c[0] && ee == 1 && (he.s = Z.s), he);
  }, V.multipliedBy = V.times = function(he, le) {
    var _e, G, Z, e, o, g, H, F, A, q, z, S, J, ce, ye, Me = this, me = Me.c, ue = (he = new oe(he, le)).c;
    if (!me || !ue || !me[0] || !ue[0])
      return !Me.s || !he.s || me && !me[0] && !ue || ue && !ue[0] && !me ? he.c = he.e = he.s = null : (he.s *= Me.s, !me || !ue ? he.c = he.e = null : (he.c = [0], he.e = 0)), he;
    for (G = bitFloor(Me.e / LOG_BASE) + bitFloor(he.e / LOG_BASE), he.s *= Me.s, H = me.length, q = ue.length, H < q && (J = me, me = ue, ue = J, Z = H, H = q, q = Z), Z = H + q, J = []; Z--; J.push(0))
      ;
    for (ce = BASE, ye = SQRT_BASE, Z = q; --Z >= 0; ) {
      for (_e = 0, z = ue[Z] % ye, S = ue[Z] / ye | 0, o = H, e = Z + o; e > Z; )
        F = me[--o] % ye, A = me[o] / ye | 0, g = S * F + A * z, F = z * F + g % ye * ye + J[e] + _e, _e = (F / ce | 0) + (g / ye | 0) + S * A, J[e--] = F % ce;
      J[e] = _e;
    }
    return _e ? ++G : J.splice(0, 1), we(he, J, G);
  }, V.negated = function() {
    var he = new oe(this);
    return he.s = -he.s || null, he;
  }, V.plus = function(he, le) {
    var _e, G = this, Z = G.s;
    if (he = new oe(he, le), le = he.s, !Z || !le)
      return new oe(NaN);
    if (Z != le)
      return he.s = -le, G.minus(he);
    var e = G.e / LOG_BASE, o = he.e / LOG_BASE, g = G.c, H = he.c;
    if (!e || !o) {
      if (!g || !H)
        return new oe(Z / 0);
      if (!g[0] || !H[0])
        return H[0] ? he : new oe(g[0] ? G : Z * 0);
    }
    if (e = bitFloor(e), o = bitFloor(o), g = g.slice(), Z = e - o) {
      for (Z > 0 ? (o = e, _e = H) : (Z = -Z, _e = g), _e.reverse(); Z--; _e.push(0))
        ;
      _e.reverse();
    }
    for (Z = g.length, le = H.length, Z - le < 0 && (_e = H, H = g, g = _e, le = Z), Z = 0; le; )
      Z = (g[--le] = g[le] + H[le] + Z) / BASE | 0, g[le] = BASE === g[le] ? 0 : g[le] % BASE;
    return Z && (g = [Z].concat(g), ++o), we(he, g, o);
  }, V.precision = V.sd = function(he, le) {
    var _e, G, Z, e = this;
    if (he != null && he !== !!he)
      return intCheck(he, 1, MAX), le == null ? le = M : intCheck(le, 0, 8), Se(new oe(e), he, le);
    if (!(_e = e.c))
      return null;
    if (Z = _e.length - 1, G = Z * LOG_BASE + 1, Z = _e[Z]) {
      for (; Z % 10 == 0; Z /= 10, G--)
        ;
      for (Z = _e[0]; Z >= 10; Z /= 10, G++)
        ;
    }
    return he && e.e + 1 > G && (G = e.e + 1), G;
  }, V.shiftedBy = function(he) {
    return intCheck(he, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER), this.times("1e" + he);
  }, V.squareRoot = V.sqrt = function() {
    var he, le, _e, G, Z, e = this, o = e.c, g = e.s, H = e.e, F = O + 4, A = new oe("0.5");
    if (g !== 1 || !o || !o[0])
      return new oe(!g || g < 0 && (!o || o[0]) ? NaN : o ? e : 1 / 0);
    if (g = Math.sqrt(+ke(e)), g == 0 || g == 1 / 0 ? (le = coeffToString(o), (le.length + H) % 2 == 0 && (le += "0"), g = Math.sqrt(+le), H = bitFloor((H + 1) / 2) - (H < 0 || H % 2), g == 1 / 0 ? le = "5e" + H : (le = g.toExponential(), le = le.slice(0, le.indexOf("e") + 1) + H), _e = new oe(le)) : _e = new oe(g + ""), _e.c[0]) {
      for (H = _e.e, g = H + F, g < 3 && (g = 0); ; )
        if (Z = _e, _e = A.times(Z.plus(h(e, Z, F, 1))), coeffToString(Z.c).slice(0, g) === (le = coeffToString(_e.c)).slice(0, g))
          if (_e.e < H && --g, le = le.slice(g - 3, g + 1), le == "9999" || !G && le == "4999") {
            if (!G && (Se(Z, Z.e + O + 2, 0), Z.times(Z).eq(e))) {
              _e = Z;
              break;
            }
            F += 4, g += 4, G = 1;
          } else {
            (!+le || !+le.slice(1) && le.charAt(0) == "5") && (Se(_e, _e.e + O + 2, 1), he = !_e.times(_e).eq(e));
            break;
          }
    }
    return Se(_e, _e.e + O + 1, M, he);
  }, V.toExponential = function(he, le) {
    return he != null && (intCheck(he, 0, MAX), he++), be(this, he, le, 1);
  }, V.toFixed = function(he, le) {
    return he != null && (intCheck(he, 0, MAX), he = he + this.e + 1), be(this, he, le);
  }, V.toFormat = function(he, le, _e) {
    var G, Z = this;
    if (_e == null)
      he != null && le && typeof le == "object" ? (_e = le, le = null) : he && typeof he == "object" ? (_e = he, he = le = null) : _e = ie;
    else if (typeof _e != "object")
      throw Error(bignumberError + "Argument not an object: " + _e);
    if (G = Z.toFixed(he, le), Z.c) {
      var e, o = G.split("."), g = +_e.groupSize, H = +_e.secondaryGroupSize, F = _e.groupSeparator || "", A = o[0], q = o[1], z = Z.s < 0, S = z ? A.slice(1) : A, J = S.length;
      if (H && (e = g, g = H, H = e, J -= e), g > 0 && J > 0) {
        for (e = J % g || g, A = S.substr(0, e); e < J; e += g)
          A += F + S.substr(e, g);
        H > 0 && (A += F + S.slice(e)), z && (A = "-" + A);
      }
      G = q ? A + (_e.decimalSeparator || "") + ((H = +_e.fractionGroupSize) ? q.replace(
        new RegExp("\\d{" + H + "}\\B", "g"),
        "$&" + (_e.fractionGroupSeparator || "")
      ) : q) : A;
    }
    return (_e.prefix || "") + G + (_e.suffix || "");
  }, V.toFraction = function(he) {
    var le, _e, G, Z, e, o, g, H, F, A, q, z, S = this, J = S.c;
    if (he != null && (g = new oe(he), !g.isInteger() && (g.c || g.s !== 1) || g.lt(t)))
      throw Error(bignumberError + "Argument " + (g.isInteger() ? "out of range: " : "not an integer: ") + ke(g));
    if (!J)
      return new oe(S);
    for (le = new oe(t), F = _e = new oe(t), G = H = new oe(t), z = coeffToString(J), e = le.e = z.length - S.e - 1, le.c[0] = POWS_TEN[(o = e % LOG_BASE) < 0 ? LOG_BASE + o : o], he = !he || g.comparedTo(le) > 0 ? e > 0 ? le : F : g, o = Y, Y = 1 / 0, g = new oe(z), H.c[0] = 0; A = h(g, le, 0, 1), Z = _e.plus(A.times(G)), Z.comparedTo(he) != 1; )
      _e = G, G = Z, F = H.plus(A.times(Z = F)), H = Z, le = g.minus(A.times(Z = le)), g = Z;
    return Z = h(he.minus(_e), G, 0, 1), H = H.plus(Z.times(F)), _e = _e.plus(Z.times(G)), H.s = F.s = S.s, e = e * 2, q = h(F, G, e, M).minus(S).abs().comparedTo(
      h(H, _e, e, M).minus(S).abs()
    ) < 1 ? [F, G] : [H, _e], Y = o, q;
  }, V.toNumber = function() {
    return +ke(this);
  }, V.toPrecision = function(he, le) {
    return he != null && intCheck(he, 1, MAX), be(this, he, le, 2);
  }, V.toString = function(he) {
    var le, _e = this, G = _e.s, Z = _e.e;
    return Z === null ? G ? (le = "Infinity", G < 0 && (le = "-" + le)) : le = "NaN" : (he == null ? le = Z <= D || Z >= I ? toExponential(coeffToString(_e.c), Z) : toFixedPoint(coeffToString(_e.c), Z, "0") : he === 10 && se ? (_e = Se(new oe(_e), O + Z + 1, M), le = toFixedPoint(coeffToString(_e.c), _e.e, "0")) : (intCheck(he, 2, ne.length, "Base"), le = U(toFixedPoint(coeffToString(_e.c), Z, "0"), 10, he, G, !0)), G < 0 && _e.c[0] && (le = "-" + le)), le;
  }, V.valueOf = V.toJSON = function() {
    return ke(this);
  }, V._isBigNumber = !0, V[Symbol.toStringTag] = "BigNumber", V[Symbol.for("nodejs.util.inspect.custom")] = V.valueOf, $ != null && oe.set($), oe;
}
function bitFloor($) {
  var h = $ | 0;
  return $ > 0 || $ === h ? h : h - 1;
}
function coeffToString($) {
  for (var h, U, B = 1, V = $.length, t = $[0] + ""; B < V; ) {
    for (h = $[B++] + "", U = LOG_BASE - h.length; U--; h = "0" + h)
      ;
    t += h;
  }
  for (V = t.length; t.charCodeAt(--V) === 48; )
    ;
  return t.slice(0, V + 1 || 1);
}
function compare($, h) {
  var U, B, V = $.c, t = h.c, O = $.s, M = h.s, D = $.e, I = h.e;
  if (!O || !M)
    return null;
  if (U = V && !V[0], B = t && !t[0], U || B)
    return U ? B ? 0 : -M : O;
  if (O != M)
    return O;
  if (U = O < 0, B = D == I, !V || !t)
    return B ? 0 : !V ^ U ? 1 : -1;
  if (!B)
    return D > I ^ U ? 1 : -1;
  for (M = (D = V.length) < (I = t.length) ? D : I, O = 0; O < M; O++)
    if (V[O] != t[O])
      return V[O] > t[O] ^ U ? 1 : -1;
  return D == I ? 0 : D > I ^ U ? 1 : -1;
}
function intCheck($, h, U, B) {
  if ($ < h || $ > U || $ !== mathfloor($))
    throw Error(bignumberError + (B || "Argument") + (typeof $ == "number" ? $ < h || $ > U ? " out of range: " : " not an integer: " : " not a primitive number: ") + String($));
}
function isOdd($) {
  var h = $.c.length - 1;
  return bitFloor($.e / LOG_BASE) == h && $.c[h] % 2 != 0;
}
function toExponential($, h) {
  return ($.length > 1 ? $.charAt(0) + "." + $.slice(1) : $) + (h < 0 ? "e" : "e+") + h;
}
function toFixedPoint($, h, U) {
  var B, V;
  if (h < 0) {
    for (V = U + "."; ++h; V += U)
      ;
    $ = V + $;
  } else if (B = $.length, ++h > B) {
    for (V = U, h -= B; --h; V += U)
      ;
    $ += V;
  } else
    h < B && ($ = $.slice(0, h) + "." + $.slice(h));
  return $;
}
var BigNumber = clone();
const filterAccountBalance = ($, h, U) => {
  const B = $.filter(
    (t) => t.accountId === h.accountId && t.accountTokenId
  ), V = U.tokens.length ? U.tokens.filter(
    (t) => B.find((O) => O.contract === t.contract)
  ).map((t) => {
    const O = { ...t };
    return delete O.tokenId, delete O.decimals, O.balance = getBalanceWithDecimal(t.balance, t.decimals), O;
  }) : [];
  return {
    network: h.network,
    address: h.address,
    balance: getBalanceWithDecimal(U.balance, U.decimals),
    symbol: h.symbol,
    tokens: V
  };
}, getBalanceWithDecimal = ($, h) => {
  if (!h || !$)
    return "0";
  const U = new BigNumber($).shiftedBy(-h).toFixed();
  return U === "NaN" ? "0" : U;
};
class WepinSDK extends SafeEventEmitter {
  // _userInfo: IWepinUser
  constructor({
    appId: h,
    appKey: U,
    wepinModal: B,
    wepinStorage: V
  }) {
    super(), this.version = PackageJson.version, console.log(`WepinWeb SDK v${this.version}`), this._isInitialized = !1, this._wepinLifeCycle = "not_initialized", this._wepinAppId = h, this._wepinAppKey = U, this._wepinModal = B || new k(), this._wepinStorage = V || c, this.type = this._wepinStorage.platform, this.setModeByAppKey(U);
  }
  setModeByAppKey(h) {
    if (h.slice(0, 8) === "ak_live_") {
      this._modeByAppKey = "production";
      return;
    } else if (h.slice(0, 8) === "ak_test_") {
      this._modeByAppKey = "test";
      return;
    } else if (h.slice(0, 7) === "ak_dev_") {
      this._modeByAppKey = "development";
      return;
    } else if (h.slice(0, 13) === "local_ak_dev_")
      this._modeByAppKey = "local";
    else
      throw new Error("Wepin.setModeByAppKey: Invalid appKey");
  }
  get modeByAppKey() {
    if (this._modeByAppKey === void 0)
      throw new Error("Wepin.modeByAppKey: wepin widget has to be initialized");
    return this._modeByAppKey;
  }
  toJSON() {
    return "";
  }
  get wepinStorage() {
    return this._wepinStorage;
  }
  /**
   * Initialize Wepin Object. It returns widget instance.
   * @param attributes {type: 'show' | 'hide', defaultLanguage: 'ko' | 'en', defaultCurrency: 'KRW' | 'USD', loginProviders?: Array<LoginProviders>}
   * @returns
   */
  async init(h = {
    type: "hide",
    defaultLanguage: WEPIN_DEFAULT_LANG,
    defaultCurrency: WEPIN_DEFAULT_CURRENCY
  }) {
    if (this._isInitialized)
      throw new Error("Wepin is already initialized!");
    LOG.debug("attributes", h), h && (h.defaultLanguage = h.defaultLanguage ?? WEPIN_DEFAULT_LANG, h.defaultCurrency = h.defaultCurrency ?? WEPIN_DEFAULT_CURRENCY, h.type = h.type ?? "hide"), this.wepinAppAttributes = h, LOG.debug("wepinAppAttributes", this.wepinAppAttributes), this.wepinDomain = this._wepinModal.domain, this._isInitialized = !1, this._wepinLifeCycle = "initializing", this._wepinFetch = new WepinFetch({
      appId: this._wepinAppId,
      appKey: this._wepinAppKey,
      domain: this.wepinDomain,
      sdk: { version: this.version, type: `${this.type}-sdk` },
      storage: this._wepinStorage
    }), await this._wepinFetch.init();
    const U = await this._wepinFetch.wepinApi.app.getAppInfo({
      platform: ProjectPlatformKind[this.type],
      withNetwork: !1
    });
    if (isErrorResponse(U))
      throw new Error(U.message);
    this._wepinAppId = this._wepinFetch.appId = U.appInfo.id;
    const B = this._wepinStorage.getLocalStorage(
      this._wepinAppId,
      "wepin:connectUser"
    );
    B && (LOG.debug("wepinToken", B), this._wepinFetch.setToken(B), LOG.debug("token", this._wepinFetch.Token)), this._isInitialized = !0, await this.checkExpiredToken() ? this._wepinLifeCycle = "initialized" : this._wepinLifeCycle = "login";
  }
  get wepinWidget() {
    return this._widget;
  }
  set wepinWidget(h) {
    this._widget = h;
  }
  /**
   * Check if wepin is initialized.
   *
   * @returns
   */
  isInitialized() {
    return !!this._isInitialized;
  }
  /**
   * Change the language and currency of the widget.
   * @param language 'ko'|'en'
   * @param currency 'KRW'|'USD'
   * @returns
   * @example
   * ```typescript
   * wepin.changeLanguage({
   *  currency: 'USD',
   * language: 'en'
   * })
   * ```
   * @example
   * ```typescript
   * wepin.changeLanguage({
   * currency: 'KRW',
   * language: 'ko'
   * })
   * ```
   */
  changeLanguage({
    currency: h,
    language: U
  }) {
    this.wepinAppAttributes.defaultCurrency = h, this.wepinAppAttributes.defaultLanguage = U;
  }
  //init, login되지 않으면 open 못하게!
  /**
   * It opens widget window.
   */
  async openWidget() {
    if (await this.getStatus() !== "login")
      throw new Error(
        "Wepin.openWidget: You can open it only if you are logged in to the wepin."
      );
    await this._open();
  }
  async _open(h) {
    try {
      let U = Utils.getUrls(this._modeByAppKey).wepinWebview;
      if (this._widget && this._widget.isOpen) {
        LOG.debug("already opened widget", this._widget);
        return;
      }
      h != null && h.url && (U += h.url), this._EL = getEventListener(this, {
        appKey: this._wepinAppKey,
        appId: this._wepinAppId
      }), h != null && h.isHide || this.wepinAppAttributes.type !== "show" && (h != null && h.isInit) ? this._widget = await this._wepinModal.openModal(U, this._EL, {
        isHide: !0
      }) : (h == null ? void 0 : h.type) === "WINDOW" ? this._widget = await this._wepinModal.openAuthBrowser(U, this._EL) : this._widget = await this._wepinModal.openModal(U, this._EL), LOG.debug("openWidget this._widget", this._widget);
    } catch (U) {
      throw LOG.error(U), new Error("Wepin.openWidget: Can't open wepin sdk widget");
    }
  }
  /**
   * It closes widget itself.
   */
  closeWidget() {
    if (LOG.debug("closeWidget this._widget", this._widget), !this._isInitialized)
      throw new Error("Wepin.closeWidget: wepin sdk has to be initialized");
    if (this._widget)
      this._close();
    else
      throw new Error("Wepin.closeWidget: wepin sdk widget is not exist");
  }
  _close() {
    LOG.debug("close this._widget", this._widget), this.removeAllListeners(), this._widget && (this._widget.close(), this._widget = void 0), this.specifiedEmail = void 0;
  }
  setToken(h) {
    this._wepinFetch.setToken(h);
  }
  async checkExpiredToken() {
    try {
      const h = this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "wepin:connectUser"
      );
      if (!h)
        return !0;
      if (jwtDecode(h.accessToken).exp < Math.floor(Date.now() / 1e3) + 60) {
        this._wepinFetch.setToken(h);
        const B = await this._wepinFetch.wepinApi.user.refreshToken();
        return isErrorResponse(B) ? !0 : (h.accessToken = B.token, this._wepinStorage.setLocalStorage(
          this._wepinAppId,
          "wepin:connectUser",
          h
        ), !1);
      } else
        return !1;
    } catch {
      return !0;
    }
  }
  /**
   * Returns the user's login information.
   *
   * @param email Encourage users to log in with the email specified in the app.
   * @returns {Promise<IWepinUser>}
   * @example
   * ```typescript
   * wepin.loginWithUI().then((userInfo) => {
   *  console.log(userInfo)
   * })
   * ```
   * @example
   * ```typescript
   * wepin.loginWithUI({ email: 'abc@abc.com' }).then((userInfo) => {
   *  console.log(userInfo)
   * })
   * ```
   */
  async loginWithUI(h) {
    if (!this._isInitialized)
      throw new Error("Wepin.loginWithUI: wepin sdk has to be initialized");
    const U = this._wepinStorage.getLocalStorage(
      this._wepinAppId,
      "wepin:connectUser"
    ), B = this._wepinStorage.getLocalStorage(
      this._wepinAppId,
      "user_info"
    );
    if (h != null && h.email) {
      if (!emailRegExp.test(h == null ? void 0 : h.email))
        throw new Error(
          "Wepin.loginWithUI: The email does not match the correct format."
        );
      this.specifiedEmail = h == null ? void 0 : h.email;
    } else
      this.specifiedEmail = void 0;
    return this._wepinLifeCycle = "before_login", U && B && (B && (U != null && U.refreshToken) && (h != null && h.email) && (B == null ? void 0 : B.userInfo.email) !== (h == null ? void 0 : h.email) && await this.logout(), U != null && U.refreshToken && (LOG.debug("currentUserInfo", B), !await this.checkExpiredToken() && B && B.status === "success")) ? (this._wepinLifeCycle = "login", B) : (await this._open(), new Promise((V, t) => {
      this.once("onUserInfoSet", (O) => {
        try {
          const M = this._wepinStorage.getLocalStorage(
            this._wepinAppId,
            "wepin:connectUser"
          );
          this._close(), this._wepinFetch.setToken(M), this.specifiedEmail = void 0, V(O);
        } catch (M) {
          t(new Error(M));
        }
      });
    }));
  }
  // public async register(pin: string): Promise<IWepinUser> {
  //   // let result = false
  //   if (!this._isInitialized) {
  //     throw new Error('Wepin.register: wepin sdk has to be initialized')
  //   }
  //   if (!pin) {
  //     throw new Error('Wepin.register: pin is required')
  //   }
  //   if (!pinRegExp.test(pin)) {
  //     throw new Error(
  //       'Wepin.register: The PIN must be a string composed of 6 to 8 digits.',
  //     )
  //   }
  //   const userStatus = this._wepinStorage.getLocalStorage(
  //     this._wepinAppId,
  //     'user_status',
  //   )
  //   if (
  //     userStatus.loginStatus === 'registerRequired' ||
  //     userStatus.loginStatus === 'pinRequired'
  //   )
  //     this._wepinLifeCycle === 'login_before_register'
  //   if ((await this.getStatus()) !== 'login_before_register') {
  //     throw new Error(
  //       'Wepin.register: The LifeCycle of wepin sdk has to be login_before_register',
  //     )
  //   }
  //   const userId = this._wepinStorage.getLocalStorage(
  //     this._wepinAppId,
  //     'user_id',
  //   )
  //   const walletId = this._wepinStorage.getLocalStorage(
  //     this._wepinAppId,
  //     'wallet_id',
  //   )
  //   let registerResponse
  //   if (
  //     userStatus?.loginStatus === 'registerRequired' &&
  //     !userStatus?.pinRequired
  //   ) {
  //     registerResponse = await this._wepinFetch.wepinApi.app.register({
  //       appId: this._wepinAppId,
  //       userId,
  //       walletId,
  //       loginStatus: userStatus.loginStatus,
  //     })
  //   } else {
  //     const type =
  //       userStatus?.loginStatus === 'pinRequired' ? VERIFY_CREATE : VERIFY_PIN
  //     const uvd = await getUVD(pin, this._wepinFetch, {
  //       type,
  //       userId,
  //       walletId,
  //     })
  //     registerResponse = await this._wepinFetch.wepinApi.app.register({
  //       appId: this._wepinAppId,
  //       userId,
  //       walletId,
  //       loginStatus: userStatus.loginStatus,
  //       UVD: uvd.UVD,
  //       hint: uvd?.hint,
  //     })
  //   }
  //   if (isErrorResponse(registerResponse)) {
  //     throw new Error(registerResponse.message)
  //   }
  //   const resTempAccepted =
  //     await this._wepinFetch.wepinApi.user.updateTermsAccepted(
  //       { userId },
  //       {
  //         termsAccepted: {
  //           termsOfService: true,
  //           privacyPolicy: true,
  //         },
  //       },
  //     )
  //   if (
  //     isErrorResponse(resTempAccepted) ||
  //     !Object.values(resTempAccepted.termsAccepted).every((x) => x === true)
  //   ) {
  //     throw new Error(`unknown/updateTermsAccepted`)
  //   }
  //   this._wepinStorage.setLocalStorage(this._wepinAppId, 'user_status', {
  //     loginStatus: 'complete',
  //   })
  //   const userInfo = this._wepinStorage.getLocalStorage(
  //     this._wepinAppId,
  //     'user_info',
  //   )
  //   this._userInfo = userInfo
  //   if (registerResponse.walletId) {
  //     this._wepinStorage.setLocalStorage(
  //       this._wepinAppId,
  //       'wallet_id',
  //       registerResponse.walletId,
  //     )
  //     userInfo.walletId = this._userInfo.walletId = registerResponse.walletId
  //     this._wepinStorage.setLocalStorage(
  //       this._wepinAppId,
  //       'user_info',
  //       userInfo,
  //     )
  //   }
  //   this._wepinLifeCycle = 'login'
  //   return this._userInfo
  // }
  /**
   * Function to handle user logout.
   *
   * @returns {Promise<void>}
   */
  async logout() {
    const h = await this.getStatus();
    if (!this._isInitialized)
      throw new Error("Wepin.logout: wepin sdk has to be initialized");
    if (h !== "login" && h !== "login_before_register")
      throw new Error("Wepin.logout: Only if you're logged in to the wepin");
    this._wepinStorage.clearAllLocalStorage(this._wepinAppId), this._wepinLifeCycle = "initialized", this._userInfo = void 0, this._accountInfo = void 0, this._detailAccount = void 0;
  }
  /**
   * Returns available account list. It can be only usable after widget login.
   * It returns all the accounts once parameter is empty.
   *
   * @param options
   *    - networks: list of network wanted to get return
   *    - withEoa: If AA accounts are included, whether to include EOA accounts
   * @returns
   */
  async getAccounts(h) {
    if (!this._isInitialized)
      throw new Error("Wepin.getAccounts: wepin sdk has to be initialized");
    if (await this.getStatus() !== "login")
      throw new Error(
        "Wepin.getAccounts: Only if you're logged in to the wepin"
      );
    const U = this._wepinStorage.getLocalStorage(
      this._wepinAppId,
      "user_id"
    ), B = this._wepinStorage.getLocalStorage(
      this._wepinAppId,
      "wallet_id"
    ), V = await this._wepinFetch.wepinApi.account.getAppAccountList({
      userId: U,
      walletId: B,
      localeId: this.wepinAppAttributes.defaultLanguage === "ko" ? 1 : 2
    });
    if (isErrorResponse(V))
      throw new Error(V.message);
    return this._detailAccount = filterAccountList(V, h == null ? void 0 : h.withEoa), this._accountInfo = getAccountSDK(this._detailAccount), (h == null ? void 0 : h.networks) !== void 0 && (h == null ? void 0 : h.networks.length) > 0 ? this._accountInfo.filter(
      (O) => (h == null ? void 0 : h.networks.findIndex((M) => M === O.network)) >= 0
    ) : this._accountInfo;
  }
  setUserInfo(h, U) {
    this._userInfo = h, h && h.status === "success" ? this._wepinLifeCycle = "login" : this._wepinLifeCycle = "initialized", U && this.emit("onUserInfoSet", h);
  }
  /**
   * Returns lifecycle of wepin.
   * The lifecycle of the wepin is defined as follows.
   *  - 'not_initialized': if wepin is not initialized
   *  - 'initializing': if wepin is initializing
   *  - 'initialized': if wepin is initialized
   *  - 'before_login': if wepin is initialized but the user is not logged in
   *  - 'login': if the user is logged in
   *  - 'login_before_register': if the user is email logged in but the user is NOT registered in wepin
   *
   * @returns Promise<WepinLifeCycle>
   */
  async getStatus() {
    if (await this.checkExpiredToken())
      this._wepinLifeCycle = "initialized";
    else {
      const h = this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "user_status"
      ), U = this._wepinStorage.getLocalStorage(
        this._wepinAppId,
        "user_info"
      );
      this._userInfo = U, h.loginStatus === "registerRequired" || h.loginStatus === "pinRequired" ? this._wepinLifeCycle = "login_before_register" : this._wepinLifeCycle = "login";
    }
    return this._wepinLifeCycle;
  }
  /**
   * Returns balance info of account. It can be only usable after login.
   * It returns all the nft once networks parameter is empty.
   *
   * @param account
   * @returns Promise<AccountBalanceInfo>
   */
  async getBalance(h) {
    if (!this._isInitialized)
      throw new Error("Wepin.getBalance: wepin sdk has to be initialized");
    if (await this.getStatus() !== "login")
      throw new Error(
        "Wepin.getBalance: Only if you're logged in to the wepin."
      );
    const U = !h || h.length === 0, B = [];
    if (await this.getAccounts(), U) {
      for (const V of this._detailAccount)
        if (h && h.findIndex(
          (t) => t.network === V.network && t.address === V.address
        ) >= 0) {
          const t = await this._wepinFetch.wepinApi.balance.getAccountBalance({
            accountId: V.accountId
          });
          if (isErrorResponse(t))
            throw new Error(t.message);
          B.push(
            filterAccountBalance(this._detailAccount, V, t)
          );
        }
    } else
      for (const V of h) {
        const t = this._detailAccount.find(
          (M) => V.network === M.network && V.address === M.address
        );
        if (!t)
          throw new Error("Wepin.getBalance: Account not found");
        const O = await this._wepinFetch.wepinApi.balance.getAccountBalance({
          accountId: t.accountId
        });
        if (isErrorResponse(O))
          throw new Error(O.message);
        B.push(
          filterAccountBalance(this._detailAccount, t, O)
        );
      }
    if (!B.length)
      throw new Error("Wepin.getBalance: Account not found");
    return B;
  }
  getSDKRequest() {
    return this.wepinRequest;
  }
  /**
   * Returns the send transaction information. It can be only usable after widget login.
   *
   * @param account account info
   * @param options send options
   * @returns send transaction response info
   */
  async send({
    account: h,
    txData: U
  }) {
    if (!this._isInitialized)
      throw new Error("Wepin.send: wepin sdk has to be initialized");
    if (await this.getStatus() !== "login")
      throw new Error("Wepin.send: Only if you're logged in to the wepin");
    if (await this.getAccounts(), !this._detailAccount.find(
      (t) => h.network === t.network && h.address === t.address
    ))
      throw new Error("Wepin.send: Account not found");
    const V = (/* @__PURE__ */ new Date()).getTime();
    return this.wepinRequest = {
      header: {
        request_from: "web",
        request_to: "wepin_widget",
        id: V
      },
      body: {
        command: "send_transaction_without_provider",
        parameter: {
          account: {
            address: h.address,
            network: h.network,
            contract: h == null ? void 0 : h.contract
          },
          from: h.address,
          to: U == null ? void 0 : U.toAddress,
          value: U == null ? void 0 : U.amount
        }
      }
    }, new Promise((t, O) => {
      this.once(V.toString(), async (M) => {
        if (LOG.debug("response data: ", M.body.data), this.wepinRequest = void 0, this._close(), M.body.state === "SUCCESS") {
          const D = M.body.data;
          t({ txId: D });
        } else
          M.body.data ? O(new Error(`Wepin.send: ${M.body.data}`)) : O(new Error("unknown/error"));
      }), this._open({ url: "/sdk-send" });
    });
  }
  finalize() {
    this._close(), this._wepinStorage.clearAllLocalStorage(this._wepinAppId), this._isInitialized = !1, this._wepinLifeCycle = "not_initialized", this._userInfo = void 0, this._accountInfo = void 0, this._detailAccount = void 0, this.specifiedEmail = void 0;
  }
}
export {
  WepinSDK
};
