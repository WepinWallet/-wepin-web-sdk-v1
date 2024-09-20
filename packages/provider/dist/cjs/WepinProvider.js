"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"WepinProvider",{enumerable:!0,get:function(){return g}});var e=require("@wepin/common"),n=require("@wepin/fetch-js"),t=require("@wepin/modal-js"),i=/*#__PURE__*/f(require("@wepin/provider-js/package.json")),r=/*#__PURE__*/f(require("@wepin/storage-js")),a=require("jwt-decode"),o=require("./const/cookieName.js"),s=/*#__PURE__*/f(require("./ethereum/inPageProvider.js")),u=/*#__PURE__*/f(require("./klaytn/inPageProvider.js")),p=/*#__PURE__*/f(require("./solana/inPageProvider.js")),l=require("./utils/info.js"),d=require("./utils/utils.js");function c(e,n,t,i,r,a,o){try{var s=e[a](o),u=s.value}catch(e){t(e);return}s.done?n(u):Promise.resolve(u).then(i,r)}function w(e){return function(){var n=this,t=arguments;return new Promise(function(i,r){var a=e.apply(n,t);function o(e){c(a,i,r,o,s,"next",e)}function s(e){c(a,i,r,o,s,"throw",e)}o(void 0)})}}function v(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function f(e){return e&&e.__esModule?e:{default:e}}function h(e,n){var t,i,r,a,o={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(t)throw TypeError("Generator is already executing.");for(;o;)try{if(t=1,i&&(r=2&a[0]?i.return:a[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,a[1])).done)return r;switch(i=0,r&&(a=[2&a[0],r.value]),a[0]){case 0:case 1:r=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,i=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(r=(r=o.trys).length>0&&r[r.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!r||a[1]>r[0]&&a[1]<r[3])){o.label=a[1];break}if(6===a[0]&&o.label<r[1]){o.label=r[1],r=a;break}if(r&&o.label<r[2]){o.label=r[2],o.ops.push(a);break}r[2]&&o.ops.pop(),o.trys.pop();continue}a=n.call(e,o)}catch(e){a=[6,e],i=0}finally{t=r=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}var g=/*#__PURE__*/function(){"use strict";var c;function f(n){var a=this,o=n.appId,s=n.appKey,u=n.modal,p=n.storage;!function(e,n){if(!(e instanceof n))throw TypeError("Cannot call a class as a function")}(this,f),v(this,"version",void 0),v(this,"type",void 0),v(this,"wepinDomain",void 0),v(this,"wepinAppAttributes",void 0),v(this,"wepinAppId",void 0),v(this,"_wepinAppKey",void 0),v(this,"_wepinFetch",void 0),v(this,"_wepinModal",void 0),v(this,"_widget",void 0),v(this,"_wepinStorage",void 0),v(this,"_isInitialized",!1),v(this,"_url",void 0),v(this,"webviewEventHandler",void 0),v(this,"queue",void 0),this.wepinAppId=o,this._wepinAppKey=s,this.version=i.default.version,this._wepinModal=null!=u?u:new t.WepinModal,this._wepinStorage=null!=p?p:new r.default,this.type=this._wepinStorage.platform,this.wepinDomain=this._wepinModal.domain,this.webviewEventHandler=new e.WebviewEventHandler({checkValidEvent:function(e){return!!(a.wepinWidget.url.includes("/wepin-sdk-login")||a.wepinWidget.url.includes(e.origin))||e.origin===a.wepinWidget.url}}),this.initEventHandler()}return c=[{key:"wepinStorage",get:function(){return this._wepinStorage}},{key:"initEventHandler",value:function(){var n,t,i=this;t="local_ak_dev_"===this._wepinAppKey.slice(0,13)?this._wepinAppKey.slice(6):this._wepinAppKey,this.webviewEventHandler.addRequestHandler("ready_to_widget",function(n){i.wepinStorage.getAllLocalStorage(i.wepinAppId).then(function(r){var a,o=Object.assign({},i.wepinAppAttributes),s=(0,e.makeWepinResponseMessage)(n,"SUCCESS",{appKey:t,appId:i.wepinAppId,domain:i.wepinDomain,platform:e.Platform[i.type],attributes:o,type:"".concat(i.type,"-provider"),version:i.version.includes("-alpha")?i.version.substring(0,i.version.indexOf("-")):i.version,localDate:null!=r?r:{}});(null===(a=i.wepinWidget)||void 0===a?void 0:a.isOpen)&&i.wepinWidget.response(s)})}),this.webviewEventHandler.addRequestHandler("close_wepin_widget",function(){i.wepinWidget.close()}),this.webviewEventHandler.addRequestHandler("dequeue_request",function(n){if(i.queue[0]){var t,r,a=(0,e.proxyToObject)(i.queue[0]);r=(0,e.makeWepinResponseMessage)(n,"SUCCESS",a)}else r=(0,e.makeWepinResponseMessage)(n,"ERROR",null);(null===(t=i.wepinWidget)||void 0===t?void 0:t.isOpen)&&i.wepinWidget.response(r)});var r=this;this.webviewEventHandler.addRequestHandler("set_local_storage",(n=w(function(n){var t,i;return h(this,function(a){switch(a.label){case 0:return[4,r.wepinStorage.setAllLocalStorage(r.wepinAppId,n.body.parameter.data)];case 1:return a.sent(),i=(0,e.makeWepinResponseMessage)(n,"SUCCESS",""),(null===(t=r.wepinWidget)||void 0===t?void 0:t.isOpen)&&r.wepinWidget.response(i),[2]}})}),function(e){return n.apply(this,arguments)})),this.webviewEventHandler.addGlobalHandler("pre_response",function(e){var n=i.queue.findIndex(function(n){return n.header.id===e.header.id});-1!==n&&i.queue.splice(n,1)})}},{key:"_initQueue",value:function(){var e=this;this.queue=new Proxy([],{set:function(n,t,i){var r=Reflect.set(n,t,i);return e._widget&&e._widget.isOpen&&e._widget.request({header:{request_from:"web",request_to:"wepin_widget",id:new Date().getTime()},body:{command:"provider_request",parameter:""}}),r}})}},{key:"wepinModal",get:function(){return this._wepinModal}},{key:"wepinWidget",get:function(){return this._widget},set:function(e){this._widget=e}},{key:"changeLanguage",value:function(e){this.wepinAppAttributes={defaultLanguage:e.language,defaultCurrency:e.currency}}},{key:"init",value:function(t){var i=this;return w(function(){var r;return h(this,function(a){switch(a.label){case 0:return i._wepinFetch=new n.WepinFetch({appId:i.wepinAppId,appKey:i._wepinAppKey,domain:i.wepinDomain,sdk:{version:i.version,type:"".concat(i.type,"-provider")},storage:i._wepinStorage}),[4,i._wepinFetch.init()];case 1:return a.sent(),[4,i._wepinFetch.wepinApi.app.getAppInfo({platform:n.WepinPlatformType[i.type],withNetwork:!1})];case 2:if(r=a.sent(),(0,n.isErrorResponse)(r))throw Error(r.message);return i.wepinAppId=i._wepinFetch.appId=r.appInfo.id,i._url=(0,e.getUrlsByMode)((0,e.getModeByAppKey)(i._wepinAppKey)).wepinWebview,i._isInitialized=!0,i.wepinAppAttributes=null!=t?t:{defaultCurrency:"USD",defaultLanguage:"en"},i._initQueue(),[2]}})})()}},{key:"isInitialized",value:function(){return this._isInitialized}},{key:"checkExpiredToken",value:function(){var e=this;return w(function(){var t,i,r;return h(this,function(o){switch(o.label){case 0:return o.trys.push([0,8,,9]),[4,e._wepinStorage.getLocalStorage(e.wepinAppId,"wepin:connectUser")];case 1:if(!(t=o.sent()))return[2,!0];if(!((0,a.jwtDecode)(t.accessToken).exp<Math.floor(Date.now()/1e3)+60))return[3,6];return[4,e._wepinFetch.setToken(t)];case 2:return o.sent(),[4,e._wepinStorage.getLocalStorage(e.wepinAppId,"user_id")];case 3:return i=o.sent(),[4,e._wepinFetch.wepinApi.user.refreshToken({userId:i})];case 4:if(r=o.sent(),(0,n.isErrorResponse)(r))return[2,!0];return t.accessToken=r.token,[4,e._wepinStorage.setLocalStorage(e.wepinAppId,"wepin:connectUser",t)];case 5:return o.sent(),[2,!1];case 6:return[2,!1];case 7:return[3,9];case 8:return o.sent(),[2,!0];case 9:return[2]}})})()}},{key:"getProvider",value:function(e){var t=this;return w(function(){var i,r,a,o,c,w,v,f,g,_,y,b,A,k,m,I,E,S,W,P,q,R,L,j,M,C;return h(this,function(h){switch(h.label){case 0:if(!1===t._isInitialized)throw Error("WepinProvider is not initialized yet. Please call init() method first.");if(!(null===(i=window.evmproviders)||void 0===i?void 0:i.Wepin))return[3,7];return w=null===(o=window.evmproviders)||void 0===o?void 0:o.Wepin.chainId,[4,(0,l.getNetworkByChainId)(w,!0)];case 1:return v=h.sent(),f=(0,d.getAddress)(v,null===(c=window.evmproviders)||void 0===c?void 0:c.Wepin.selectedAddress),[4,t.checkExpiredToken()];case 2:if(h.sent())return[3,6];return[4,t._wepinStorage.getLocalStorage(t.wepinAppId,"wallet_id")];case 3:return g=h.sent(),[4,t._wepinStorage.getLocalStorage(t.wepinAppId,"user_id")];case 4:return _=h.sent(),[4,t._wepinFetch.wepinApi.account.getAppAccountList({walletId:g,userId:_,localeId:"ko"===t.wepinAppAttributes.defaultLanguage?1:"ja"===t.wepinAppAttributes.defaultLanguage?3:2})];case 5:if(y=h.sent(),!(0,n.isErrorResponse)(y)&&((null===(b=y.aa_accounts)||void 0===b?void 0:b.length)?y.accounts.concat(y.aa_accounts):null!==(A=y.accounts)&&void 0!==A?A:[]).filter(function(e){return(0,d.getAddress)(v,e.address)===f&&e.network.toLowerCase()===v}).length)return[2,window.evmproviders.Wepin];h.label=6;case 6:return[3,13];case 7:if(!(null===(a=window.wepin)||void 0===a?void 0:null===(r=a.solana)||void 0===r?void 0:r.Wepin))return[3,13];return S=null===(m=window.wepin)||void 0===m?void 0:null===(k=m.solana)||void 0===k?void 0:k.Wepin.chainId,[4,(0,l.getNetworkByChainId)(S,!0)];case 8:return W=h.sent(),P=(0,d.getAddress)(W,null===(E=window.wepin)||void 0===E?void 0:null===(I=E.solana)||void 0===I?void 0:I.Wepin.publicKey),[4,t.checkExpiredToken()];case 9:if(h.sent())return[3,13];return[4,t._wepinStorage.getLocalStorage(t.wepinAppId,"wallet_id")];case 10:return q=h.sent(),[4,t._wepinStorage.getLocalStorage(t.wepinAppId,"user_id")];case 11:return R=h.sent(),[4,t._wepinFetch.wepinApi.account.getAppAccountList({walletId:q,userId:R,localeId:"ko"===t.wepinAppAttributes.defaultLanguage?1:"ja"===t.wepinAppAttributes.defaultLanguage?3:2})];case 12:if(L=h.sent(),!(0,n.isErrorResponse)(L)&&((null===(j=L.aa_accounts)||void 0===j?void 0:j.length)?L.accounts.concat(L.aa_accounts):null!==(M=L.accounts)&&void 0!==M?M:[]).filter(function(e){return(0,d.getAddress)(W,e.address)===P&&e.network.toLowerCase()===W}).length)return[2,window.wepin.solana.Wepin];h.label=13;case 13:if(!((C=e.toLowerCase()).startsWith("evm")||"ethereum"===C))return[3,15];return[4,s.default.generate({network:C,wepinProvider:t})];case 14:case 16:case 18:return[2,h.sent()];case 15:if(!C.startsWith("klaytn"))return[3,17];return[4,u.default.generate({network:C,wepinProvider:t})];case 17:if(!C.startsWith("solana"))return[3,19];return[4,p.default.generate({network:C,wepinProvider:t})];case 19:throw Error("Can not resolve network name: ".concat(e));case 20:return[2]}})})()}},{key:"openModal",value:function(){var e=this;return w(function(){return h(this,function(n){switch(n.label){case 0:return[4,e.wepinModal.openModal(e._url,e.webviewEventHandler.getEventListenerFunction())];case 1:return e._widget=n.sent(),[2]}})})()}},{key:"finalize",value:function(){var e=this;return w(function(){var n;return h(this,function(t){switch(t.label){case 0:return[4,e._wepinStorage.clearLocalStorage(o.PROVIDER_COOKIE_NAME+e.wepinAppId,"selectedAddress")];case 1:return t.sent(),e._initQueue(),window.evmproviders&&(window.evmproviders.Wepin=null),(null===(n=window.wepin)||void 0===n?void 0:n.solana)&&(window.wepin.solana.Wepin=null),e._isInitialized=!1,[2]}})})()}}],function(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(f.prototype,c),f}();