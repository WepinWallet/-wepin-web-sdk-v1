function e(e,r,t,n,o,i,a){try{var c=e[i](a),u=c.value}catch(e){t(e);return}c.done?r(u):Promise.resolve(u).then(n,o)}function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function t(e,r){return(t=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}function n(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(n=function(){return!!e})()}import{createFetchMiddleware as o}from"@metamask/eth-json-rpc-middleware";import{BaseProvider as i}from"../BaseProvider.js";import a from"../const/gatewayUrl.js";import{createWepinMiddleware as c}from"../middlewares/klay-json-rpc-wepin.js";import{getNetworkInfoByName as u}from"../utils/info.js";var l=/*#__PURE__*/function(i){var l;function f(e){var t,i,u,l,s=e.network,p=e.rpcUrl,d=e.chainId,v=e.wepinProvider;!function(e,r){if(!(e instanceof r))throw TypeError("Cannot call a class as a function")}(this,f);var h=[],w=c({wepinProvider:v,network:s});return h.push(w),p.forEach(function(e){var r=e.url;"internal"===e.type&&(r=a.Gateway+e.url),h.push(o({rpcUrl:r,btoa:btoa,fetch:fetch}))}),i=f,u=[{rpcMiddleware:h}],i=r(i),(l=(t=n()?Reflect.construct(i,u||[],r(this).constructor):i.apply(this,u))&&("object"==(t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t)||"function"==typeof t)?t:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(this))._initializeState({accounts:[],chainId:d}),l}return!function(e,r){if("function"!=typeof r&&null!==r)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&t(e,r)}(f,i),l=[{key:"generate",value:function(r){var t;return(t=function(){var e,t,n,o,i;return function(e,r){var t,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(t)throw TypeError("Generator is already executing.");for(;a;)try{if(t=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=r.call(e,a)}catch(e){i=[6,e],n=0}finally{t=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}(this,function(a){switch(a.label){case 0:return[4,u(r.network,!0)];case 1:return n=(t=a.sent()).rpcUrl,o=t.chainId,i=new f({network:r.network,rpcUrl:n,chainId:o,wepinProvider:r.wepinProvider}),window.evmproviders=window.evmproviders||{},window.evmproviders[i.name]=i,window.evmproviders[i.name].selectedAddress=null===(e=r.address)||void 0===e?void 0:e.toLowerCase(),[2,i]}})},function(){var r=this,n=arguments;return new Promise(function(o,i){var a=t.apply(r,n);function c(r){e(a,o,i,c,u,"next",r)}function u(r){e(a,o,i,c,u,"throw",r)}c(void 0)})})()}}],function(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(f,l),f}(i);export{l as default};