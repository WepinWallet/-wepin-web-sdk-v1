function e(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function t(e,t,n,r,i,o,a){try{var c=e[o](a),s=c.value}catch(e){n(e);return}c.done?t(s):Promise.resolve(s).then(r,i)}function n(e){return function(){var n=this,r=arguments;return new Promise(function(i,o){var a=e.apply(n,r);function c(e){t(a,i,o,c,s,"next",e)}function s(e){t(a,i,o,c,s,"throw",e)}c(void 0)})}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function o(e,t){return(o=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function a(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}function c(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=(i=a.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}import s from"@metamask/safe-event-emitter";import{createFetchMiddleware as l}from"eth-json-rpc-middleware";import{EthereumRpcError as u,ethErrors as d}from"eth-rpc-errors";import h from"fast-deep-equal";import{JsonRpcEngine as f}from"json-rpc-engine";import p from"./const/gatewayUrl";import{createWepinMiddleware as v}from"./middlewares/eth-json-rpc-wepin";import{createWepinMiddleware as y}from"./middlewares/klay-json-rpc-wepin";import{setSelectedAddress as g}from"./utils/selectedAddress";import{getRpcPromiseCallback as m,isValidChainId as _}from"./utils/utils";export var BaseProvider=function(t){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&o(e,t)}(C,t);var s,b,w=(s=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var t,n=i(C);return t=s?Reflect.construct(n,arguments,i(this).constructor):n.apply(this,arguments),t&&("object"===a(t)||"function"==typeof t)?t:e(this)});function C(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=n.logger,o=void 0===i?console:i,a=n.maxEventListeners,c=n.rpcMiddleware;!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,C),r(e(t=w.call(this)),"_rpcEngine",void 0),r(e(t),"_log",void 0),r(e(t),"_state",void 0),r(e(t),"chainId",void 0),r(e(t),"selectedAddress",void 0),r(e(t),"uuid","wepinprovider"),r(e(t),"name","Wepin"),r(e(t),"icon",void 0),r(e(t),"description",void 0),t._log=o,t.setMaxListeners(void 0===a?100:a),t._state=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(t){r(e,t,n[t])})}return e}({},C._defaultState),t.selectedAddress=null,t.chainId=null,t._handleAccountsChanged=t._handleAccountsChanged.bind(e(t)),t._handleConnect=t._handleConnect.bind(e(t)),t._handleChainChanged=t._handleChainChanged.bind(e(t)),t._handleDisconnect=t._handleDisconnect.bind(e(t)),t._rpcRequest=t._rpcRequest.bind(e(t)),t.request=t.request.bind(e(t));var s=new f;return(void 0===c?[]:c).forEach(function(e){return s.push(e)}),t._rpcEngine=s,t}return b=[{key:"request",value:function(e){var t=this;return n(function(){var n,r,i,o;return c(this,function(c){if(!e||(void 0===e?"undefined":a(e))!=="object"||Array.isArray(e))throw d.rpc.invalidRequest({message:"Invalid request arguments",data:e});if(t._log.debug("[RPC Request]: requesting args",e),n=e.method,r=e.params,o=void 0===(i=e.id)?new Date().getTime():i,"string"!=typeof n||0===n.length)throw d.rpc.invalidRequest({message:"Invalid request methods",data:e});if(void 0!==r&&!Array.isArray(r)&&((void 0===r?"undefined":a(r))!=="object"||null===r))throw d.rpc.invalidRequest({message:"Invalid request params",data:e});return[2,new Promise(function(e,i){t._rpcRequest({method:n,params:r,id:o},m(e,i))})]})})()}},{key:"_initializeState",value:function(e){if(!0===this._state.initialized)throw Error("Provider already initialized.");if(e){var t=e.accounts,n=e.chainId,r=e.networkVersion;this._handleConnect(n),this._handleChainChanged({chainId:n,networkVersion:r}),this._handleAccountsChanged(t)}this._state.initialized=!0,this.emit("_initialized")}},{key:"_rpcRequest",value:function(e,t){var n=this,r=t;return Array.isArray(e)||(e.jsonrpc||(e.jsonrpc="2.0"),("eth_accounts"===e.method||"klay_accounts"===e.method||"eth_requestAccounts"===e.method||"klay_requestAccounts"===e.method)&&(r=function(e,r){n._log.debug("_rpcRequest to handler account changes",e,r),n._handleAccountsChanged(r.result||[]),t(e,r)}),"wallet_switchEthereumChain"!==e.method||(r=function(e,r){n._log.debug("_rpcRequest to handler chain changes",e,r);var i,o,a=r.result,c=a.rpcUrl,s=a.wepinProvider,l=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(a,["rpcUrl","wepinProvider"]);try{n.changeChain({wepinProvider:s,rpcUrl:c,network:null===(i=r.result)||void 0===i?void 0:i.network,address:null===(o=r.result)||void 0===o?void 0:o.address}).then(function(){}).catch(function(t){e=t}).finally(function(){var i;r.result=l,(null===(i=r.result)||void 0===i?void 0:i.chainId)&&n._handleChainChanged({chainId:r.result.chainId}),t(e,r)})}catch(n){t(e=n,r)}})),this._rpcEngine.handle(e,r)}},{key:"setRpcEngine",value:function(e){var t=new f;e.forEach(function(e){return t.push(e)}),this._rpcEngine=t}},{key:"changeChain",value:function(e){var t=e.wepinProvider,r=e.network,i=e.rpcUrl,o=e.address,a=this;return n(function(){var e,n,s,u,d,h;return c(this,function(c){switch(c.label){case 0:if(e=[],a._log.debug("changeChain rpcMiddlewareList",e),!((n=r.toLowerCase()).startsWith("evm")||"ethereum"===n))return[3,2];return s=v({wepinProvider:t,network:r}),(u=[]).push(s),null==i||i.forEach(function(e){var t=e.url;"internal"===e.type&&(t=p.Gateway+e.url),u.push(l({rpcUrl:t}))}),a.setRpcEngine(u),a.selectedAddress=null==o?void 0:o.toLowerCase(),[4,g(t.wepinStorage,t.wepinAppId,r,o)];case 1:case 3:return c.sent(),[3,5];case 2:if(!n.startsWith("klaytn"))return[3,4];return d=y({wepinProvider:t,network:r}),(h=[]).push(d),null==i||i.forEach(function(e){var t=e.url;"internal"===e.type&&(t=p.Gateway+e.url),h.push(l({rpcUrl:t}))}),a._log.debug("changeChain middlewareList",h),a.setRpcEngine(h),a.selectedAddress=null==o?void 0:o.toLowerCase(),[4,g(t.wepinStorage,t.wepinAppId,r,o)];case 4:throw Error("Can not resolve network name: ".concat(r));case 5:return[2]}})})()}},{key:"_handleConnect",value:function(e){this._state.isConnected||(this._state.isConnected=!0,this.emit("connect",{chainId:e}))}},{key:"_handleDisconnect",value:function(e,t){if(this._state.isConnected||!this._state.isPermanentlyDisconnected&&!e){var n;this._state.isConnected=!1,e?(n=new u(1013,t||"Provider disconnected"),this._log.debug(n)):(n=new u(1011,t||"Provider permanently disconnected"),this._log.error(n),this.chainId=null,this._state.accounts=null,this.selectedAddress=null,this._state.isPermanentlyDisconnected=!0),this.emit("disconnect",n)}}},{key:"_handleChainChanged",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).chainId;if(!_(e)){this._log.error("Invalid network params",{chainId:e});return}this._handleConnect(e),e!==this.chainId&&(this.chainId=e,this._state.initialized&&this.emit("chainChanged",this.chainId))}},{key:"_handleAccountsChanged",value:function(e){var t=e;Array.isArray(e)||(this._log.error("Received invalid accounts parameter. Please report this bug.",e),t=[]);var n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var c=o.value;if("string"!=typeof c){this._log.error("Received non-string account. Please report this bug.",e),t=[];break}}}catch(e){r=!0,i=e}finally{try{n||null==a.return||a.return()}finally{if(r)throw i}}!h(this._state.accounts,t)&&(this._state.accounts=t,this.selectedAddress!==t[0]&&(this.selectedAddress=t[0]||null),this._state.initialized&&this.emit("accountsChanged",t))}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(C.prototype,b),C}(s);r(BaseProvider,"_defaultState",{accounts:null,isConnected:!1,initialized:!1,isPermanentlyDisconnected:!1});