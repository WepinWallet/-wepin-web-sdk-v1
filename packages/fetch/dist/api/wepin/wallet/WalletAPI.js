function e(e,t,n,r,a,i,u){try{var o=e[i](u),c=o.value}catch(e){n(e);return}o.done?t(c):Promise.resolve(c).then(r,a)}function t(t){return function(){var n=this,r=arguments;return new Promise(function(a,i){var u=t.apply(n,r);function o(t){e(u,a,i,o,c,"next",t)}function c(t){e(u,a,i,o,c,"throw",t)}o(void 0)})}}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n,r,a,i,u={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(i){return function(o){return function(i){if(n)throw TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(a=(a=u.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){u.label=i[1];break}if(6===i[0]&&u.label<a[1]){u.label=a[1],a=i;break}if(a&&u.label<a[2]){u.label=a[2],u.ops.push(i);break}a[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,o])}}}import a from"../../APIRequest";var i=function(){var e;function i(e){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,i),n(this,"fetcher",void 0),n(this,"basePath",void 0),this.fetcher=e,this.basePath="/wallet"}return e=[{key:"verifyPin",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath,"/pin/verify"),data:e,method:"POST",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"changePin",value:function(e){var n=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(n.basePath,"/pin/change"),data:e,method:"PATCH",withCredentials:!0}),[4,n.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"fetchWalletInfo",value:function(e,n){var i=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(i.basePath,"/").concat(e.walletId),query:n,method:"GET",withCredentials:!0}),[4,i.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"getWalletKeyInfo",value:function(e,n){var i=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(i.basePath,"/").concat(e.walletId,"/wallet-keyinfo"),query:n,method:"GET",withCredentials:!0}),[4,i.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}},{key:"resetPinTryCount",value:function(e,n){var i=this;return t(function(){var t;return r(this,function(r){switch(r.label){case 0:return t=new a({url:"".concat(i.basePath,"/").concat(e.walletId,"/pin/reset-try-count"),query:n,method:"GET",withCredentials:!0}),[4,i.fetcher.send(t)];case 1:return[2,r.sent().data]}})})()}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(i.prototype,e),i}();export default i;