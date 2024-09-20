"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function(r,t){for(var n in t)Object.defineProperty(r,n,{enumerable:!0,get:t[n]})}(exports,{getNetworkByChainId:function(){return l},getNetworkInfoByName:function(){return s}});var r,t,n,e=require("../const/infoUrl.js"),o=require("./utils.js");function i(r,t,n,e,o,i,a){try{var u=r[i](a),c=u.value}catch(r){n(r);return}u.done?t(c):Promise.resolve(c).then(e,o)}function a(r){return function(){var t=this,n=arguments;return new Promise(function(e,o){var a=r.apply(t,n);function u(r){i(a,e,o,u,c,"next",r)}function c(r){i(a,e,o,u,c,"throw",r)}u(void 0)})}}function u(r,t){var n,e,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw TypeError("Generator is already executing.");for(;a;)try{if(n=1,e&&(o=2&i[0]?e.return:i[0]?e.throw||((o=e.return)&&o.call(e),0):e.next)&&!(o=o.call(e,i[1])).done)return o;switch(e=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,e=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(r,a)}catch(r){i=[6,r],e=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}}var c=(r=a(function(r){return u(this,function(t){switch(t.label){case 0:return[4,fetch(e.InfoUrl,{method:"GET",cache:r?"reload":void 0})];case 1:return[4,t.sent().json()];case 2:return[2,t.sent()]}})}),function(t){return r.apply(this,arguments)}),s=(t=a(function(r,t){var n;return u(this,function(e){switch(e.label){case 0:return[4,c(t)];case 1:var o;if(!(n=e.sent().networks.find(function(t){return t.id.toLowerCase()===r.toLowerCase()})))throw Error("There is No network info about provided network : ".concat(r));return[2,{rpcUrl:n.rpcUrl,chainId:"number"==typeof(o=n.chainId)?"0x"+o.toString(16):("string"==typeof o&&o.startsWith("0x"),o)}]}})}),function(r,n){return t.apply(this,arguments)}),l=(n=a(function(r,t){var n;return u(this,function(e){switch(e.label){case 0:if(!(0,o.isValidChainId)(r))throw Error("Invalid chain ID: ".concat(r));return[4,c(t)];case 1:if(!(n=e.sent().networks.find(function(t){return"number"==typeof t.chainId||t.chainId.startsWith("0x")?t.chainId===Number(r):t.chainId===r})))throw Error("Invalid chain ID: ".concat(r));return[2,n.id.toLowerCase()]}})}),function(r,t){return n.apply(this,arguments)});