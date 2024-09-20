"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"BaseProvider",{enumerable:!0,get:function(){return m}});var e=/*#__PURE__*/y(require("@metamask/safe-event-emitter")),t=require("eth-json-rpc-middleware"),n=require("eth-rpc-errors"),r=/*#__PURE__*/y(require("fast-deep-equal")),i=require("json-rpc-engine"),a=/*#__PURE__*/y(require("./const/gatewayUrl.js")),o=require("./middlewares/eth-json-rpc-wepin.js"),s=require("./middlewares/klay-json-rpc-wepin.js"),c=require("./middlewares/solana-json-rpc-wepin.js"),u=require("./utils/paramChecker.js"),l=require("./utils/selectedAddress.js"),d=require("./utils/utils.js");function h(e,t,n,r,i,a,o){try{var s=e[a](o),c=s.value}catch(e){n(e);return}s.done?t(c):Promise.resolve(c).then(r,i)}function p(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var a=e.apply(t,n);function o(e){h(a,r,i,o,s,"next",e)}function s(e){h(a,r,i,o,s,"throw",e)}o(void 0)})}}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e){return e&&e.__esModule?e:{default:e}}function g(e,t){return(g=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e){return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e}function b(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(b=function(){return!!e})()}function w(e,t){var n,r,i,a,o={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return a={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function s(a){return function(s){return function(a){if(n)throw TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(i=2&a[0]?r.return:a[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,a[1])).done)return i;switch(r=0,i&&(a=[2&a[0],i.value]),a[0]){case 0:case 1:i=a;break;case 4:return o.label++,{value:a[1],done:!1};case 5:o.label++,r=a[1],a=[0];continue;case 7:a=o.ops.pop(),o.trys.pop();continue;default:if(!(i=(i=o.trys).length>0&&i[i.length-1])&&(6===a[0]||2===a[0])){o=0;continue}if(3===a[0]&&(!i||a[1]>i[0]&&a[1]<i[3])){o.label=a[1];break}if(6===a[0]&&o.label<i[1]){o.label=i[1],i=a;break}if(i&&o.label<i[2]){o.label=i[2],o.ops.push(a);break}i[2]&&o.ops.pop(),o.trys.pop();continue}a=t.call(e,o)}catch(e){a=[6,e],r=0}finally{n=i=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,s])}}}var m=/*#__PURE__*/function(e){"use strict";var h;function y(){var e,t,n,r,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=a.logger,s=void 0===o?console:o,c=a.maxEventListeners,u=a.rpcMiddleware;!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,y),t=v(t=y),f(r=(e=b()?Reflect.construct(t,[],v(this).constructor):t.apply(this,n))&&("object"===_(e)||"function"==typeof e)?e:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(this),"_rpcEngine",void 0),f(r,"_log",void 0),f(r,"_state",void 0),f(r,"chainId",void 0),f(r,"selectedAddress",void 0),f(r,"publicKey",void 0),f(r,"uuid","wepinprovider"),f(r,"name","Wepin"),f(r,"icon",void 0),f(r,"description",void 0),r._log=s,r.setMaxListeners(void 0===c?100:c),r._state=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){f(e,t,n[t])})}return e}({},y._defaultState),r.selectedAddress=null,r.publicKey=null,r.chainId=null,r._handleAccountsChanged=r._handleAccountsChanged.bind(r),r._handleConnect=r._handleConnect.bind(r),r._handleChainChanged=r._handleChainChanged.bind(r),r._handleDisconnect=r._handleDisconnect.bind(r),r._rpcRequest=r._rpcRequest.bind(r),r.request=r.request.bind(r);var l=new i.JsonRpcEngine;return(void 0===u?[]:u).forEach(function(e){return l.push(e)}),r._rpcEngine=l,r}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&g(e,t)}(y,e),h=[{key:"request",value:function(e){var t=this;return p(function(){var r,i,a,o;return w(this,function(s){if(!e||(void 0===e?"undefined":_(e))!=="object"||Array.isArray(e))throw n.ethErrors.rpc.invalidRequest({message:"Invalid request arguments",data:e});if(t._log.debug("[RPC Request]: requesting args",e),r=e.method,i=e.params,o=void 0===(a=e.id)?new Date().getTime():a,"string"!=typeof r||0===r.length)throw n.ethErrors.rpc.invalidRequest({message:"Invalid request methods",data:e});if(void 0!==i&&!Array.isArray(i)&&((void 0===i?"undefined":_(i))!=="object"||null===i))throw n.ethErrors.rpc.invalidRequest({message:"Invalid request params",data:e});return[2,new Promise(function(e,n){t._rpcRequest({method:r,params:i,id:o},(0,d.getRpcPromiseCallback)(e,n))})]})})()}},{key:"_initializeState",value:function(e){if(!0===this._state.initialized)throw Error("Provider already initialized.");if(e){var t=e.accounts,n=e.chainId,r=e.networkVersion;this._handleConnect(n),this._handleChainChanged({chainId:n,networkVersion:r}),this._handleAccountsChanged(t)}this._state.initialized=!0,this.emit("_initialized")}},{key:"_rpcRequest",value:function(e,t){var n=this,r=t;return Array.isArray(e)||(e.jsonrpc||(e.jsonrpc="2.0"),("eth_accounts"===e.method||"klay_accounts"===e.method||"eth_requestAccounts"===e.method||"klay_requestAccounts"===e.method)&&(r=function(e,r){n._log.debug("_rpcRequest to handler account changes",e,r),n._handleAccountsChanged(r.result||[]),t(e,r)}),"connect"===e.method&&(r=function(e,r){n._log.debug("_rpcRequest to handler account changes",e,r),n._handleAccountsChanged(r.result||[]),t(e,{result:{publicKey:n.publicKey}})}),"signTransaction"===e.method&&(r=function(n,r){Object.keys(e.params).includes("message")?t(n,{result:(0,u.decodeTransaction)(Object.values(e.params)[0],r.result)}):t(n,r)}),"signAndSendTransaction"===e.method&&(r=function(e,n){t(e,{result:{signature:n.result}})}),"wallet_switchEthereumChain"!==e.method&&"changeNetwork"!==e.method||(r=function(e,r){n._log.debug("_rpcRequest to handler chain changes",e,r);var i,a,o=r.result,s=o.rpcUrl,c=o.wepinProvider,u=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(o,["rpcUrl","wepinProvider"]);try{n.changeChain({wepinProvider:c,rpcUrl:s,network:null===(i=r.result)||void 0===i?void 0:i.network,address:null===(a=r.result)||void 0===a?void 0:a.address}).then(function(){}).catch(function(t){e=t}).finally(function(){var i;r.result=u,(null===(i=r.result)||void 0===i?void 0:i.chainId)&&n._handleChainChanged({chainId:r.result.chainId}),t(e,r)})}catch(n){t(e=n,r)}})),this._rpcEngine.handle(e,r)}},{key:"setRpcEngine",value:function(e){var t=new i.JsonRpcEngine;e.forEach(function(e){return t.push(e)}),this._rpcEngine=t}},{key:"changeChain",value:function(e){var n=e.wepinProvider,r=e.network,i=e.rpcUrl,u=e.address,h=this;return p(function(){var e,p,f,v,y,g,_,b;return w(this,function(w){switch(w.label){case 0:if(e=[],h._log.debug("changeChain rpcMiddlewareList",e),!((p=r.toLowerCase()).startsWith("evm")||"ethereum"===p))return[3,2];return f=(0,o.createWepinMiddleware)({wepinProvider:n,network:r}),(v=[]).push(f),null==i||i.forEach(function(e){var n=e.url;"internal"===e.type&&(n=a.default.Gateway+e.url),v.push((0,t.createFetchMiddleware)({rpcUrl:n}))}),h.setRpcEngine(v),h.selectedAddress=h.publicKey=(0,d.getAddress)(r,u),[4,(0,l.setSelectedAddress)(n.wepinStorage,n.wepinAppId,r,u)];case 1:case 3:case 5:return w.sent(),[3,7];case 2:if(!p.startsWith("klaytn"))return[3,4];return y=(0,s.createWepinMiddleware)({wepinProvider:n,network:r}),(g=[]).push(y),null==i||i.forEach(function(e){var n=e.url;"internal"===e.type&&(n=a.default.Gateway+e.url),g.push((0,t.createFetchMiddleware)({rpcUrl:n}))}),h._log.debug("changeChain middlewareList",g),h.setRpcEngine(g),h.selectedAddress=h.publicKey=(0,d.getAddress)(r,u),[4,(0,l.setSelectedAddress)(n.wepinStorage,n.wepinAppId,r,u)];case 4:if(!p.startsWith("solana"))return[3,6];return _=(0,c.createWepinMiddleware)({wepinProvider:n,network:r}),(b=[]).push(_),null==i||i.forEach(function(e){var n=e.url;"internal"===e.type&&(n=a.default.Gateway+e.url),b.push((0,t.createFetchMiddleware)({rpcUrl:n}))}),h._log.debug("changeChain middlewareList",b),h.setRpcEngine(b),h.selectedAddress=h.publicKey=(0,d.getAddress)(r,u),[4,(0,l.setSelectedAddress)(n.wepinStorage,n.wepinAppId,r,u)];case 6:throw Error("Can not resolve network name: ".concat(r));case 7:return[2]}})})()}},{key:"_handleConnect",value:function(e){this._state.isConnected||(this._state.isConnected=!0,this.emit("connect",{chainId:e}))}},{key:"_handleDisconnect",value:function(e,t){if(this._state.isConnected||!this._state.isPermanentlyDisconnected&&!e){var r;this._state.isConnected=!1,e?(r=new n.EthereumRpcError(1013,t||"Provider disconnected"),this._log.debug(r)):(r=new n.EthereumRpcError(1011,t||"Provider permanently disconnected"),this._log.error(r),this.chainId=null,this._state.accounts=null,this.selectedAddress=null,this.publicKey=null,this._state.isPermanentlyDisconnected=!0),this.emit("disconnect",r)}}},{key:"_handleChainChanged",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).chainId;if(!(0,d.isValidChainId)(e)){this._log.error("Invalid network params",{chainId:e});return}this._handleConnect(e),e!==this.chainId&&(this.chainId=e,this._state.initialized&&this.emit("chainChanged",this.chainId))}},{key:"_handleAccountsChanged",value:function(e){var t=e;Array.isArray(e)||(this._log.error("Received invalid accounts parameter. Please report this bug.",e),t=[]);var n=!0,i=!1,a=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done);n=!0){var c=o.value;if("string"!=typeof c){this._log.error("Received non-string account. Please report this bug.",e),t=[];break}}}catch(e){i=!0,a=e}finally{try{n||null==s.return||s.return()}finally{if(i)throw a}}!(0,r.default)(this._state.accounts,t)&&(this._state.accounts=t,this.selectedAddress!==t[0]&&(this.selectedAddress=this.publicKey=t[0]||null),this._state.initialized&&this.emit("accountsChanged",t))}}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(y.prototype,h),y}(e.default);f(m,"_defaultState",{accounts:null,isConnected:!1,initialized:!1,isPermanentlyDisconnected:!1});