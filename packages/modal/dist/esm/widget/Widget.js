function e(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function t(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){return(o=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}import{uuidv4 as i}from"@wepin/common";import{Overlay as c}from"../widget/overlay/Overlay.js";export var Widget=function(c){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}(f,c);var u,s,a,l=(u=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var t,n=o(f);return t=u?Reflect.construct(n,arguments,o(this).constructor):n.apply(this,arguments),t&&("object"==(t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t)||"function"==typeof t)?t:e(this)});function f(t,o,r,c,u){var s;return!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,f),n(e(s=l.call(this)),"id",void 0),n(e(s),"url",void 0),n(e(s),"type",void 0),n(e(s),"isHide",void 0),n(e(s),"isWidgetReady",!1),n(e(s),"EL",void 0),n(e(s),"_open",void 0),s.url=t,s.id="id-".concat(i()),s.isHide=u,u||f.openOverlay(s.id),f._webview[s.id]=o,s.type=r,s.EL=c,window.addEventListener("message",s.EL),s._open=!0,s}return s=[{key:"isOpen",get:function(){return this._open}},{key:"close",value:function(){this.isHide||f.closeOverlay(this.id),window.removeEventListener("message",this.EL),this._open=!1,this.isWidgetReady=!1,this._closeWebview()}},{key:"response",value:function(e){try{this._post(e)}catch(e){console.error("Can not response message to the webview",e)}}},{key:"request",value:function(e){try{this._post(e)}catch(e){console.error("Can not send message to the webview",e)}}}],a=[{key:"getWebview",value:function(e){return f._webview[e]}},{key:"clearWebview",value:function(e){delete f._webview[e]}},{key:"clearAllWebview",value:function(){this._webview={}}}],s&&t(f.prototype,s),a&&t(f,a),f}(c);n(Widget,"_webview",{});