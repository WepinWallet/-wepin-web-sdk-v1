"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"WepinModal",{enumerable:!0,get:function(){return l}});var e,n=(e=require("@wepin/modal-js/package.json"))&&e.__esModule?e:{default:e},t=require("./widget/WidgetFrame.js"),r=require("./widget/WidgetWindow.js");function o(e,n,t,r,o,i,a){try{var u=e[i](a),l=u.value}catch(e){t(e);return}u.done?n(l):Promise.resolve(l).then(r,o)}function i(e){return function(){var n=this,t=arguments;return new Promise(function(r,i){var a=e.apply(n,t);function u(e){o(a,r,i,u,l,"next",e)}function l(e){o(a,r,i,u,l,"throw",e)}u(void 0)})}}function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function u(e,n){var t,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(t)throw TypeError("Generator is already executing.");for(;a;)try{if(t=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=n.call(e,a)}catch(e){i=[6,e],r=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var l=function(){"use strict";var e;function o(){!function(e,n){if(!(e instanceof n))throw TypeError("Cannot call a class as a function")}(this,o),a(this,"platformType","web"),a(this,"domain",void 0),a(this,"_modalWindow",null),a(this,"_modalFrame",null),console.log("WepinModal v".concat(n.default.version)),this.domain=window.location.origin}return e=[{key:"openAuthBrowser",value:function(e,n){var t=this;return i(function(){return u(this,function(o){switch(o.label){case 0:return[4,r.WidgetWindow.openNew({url:e,EL:n})];case 1:return t._modalWindow=o.sent(),[2,t._modalWindow]}})})()}},{key:"openModal",value:function(e,n,r){var o=this;return i(function(){return u(this,function(i){switch(i.label){case 0:return[4,t.WidgetFrame.openNew({url:e,EL:n,widgetOptions:r})];case 1:return o._modalFrame=i.sent(),[2,o._modalFrame]}})})()}},{key:"closeAuthBrowser",value:function(){var e=this;return i(function(){return u(this,function(n){return e._modalWindow&&e._modalWindow.close(),[2]})})()}},{key:"closeModal",value:function(){var e=this;return i(function(){return u(this,function(n){return e._modalFrame&&e._modalFrame.close(),[2]})})()}}],function(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(o.prototype,e),o}();