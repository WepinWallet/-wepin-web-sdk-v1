var e,r;function t(e,r,t,n,o,s,u){try{var a=e[s](u),i=a.value}catch(e){t(e);return}a.done?r(i):Promise.resolve(i).then(n,o)}function n(e){return function(){var r=this,n=arguments;return new Promise(function(o,s){var u=e.apply(r,n);function a(e){t(u,o,s,a,i,"next",e)}function i(e){t(u,o,s,a,i,"throw",e)}a(void 0)})}}function o(e,r){var t,n,o,s,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(t)throw TypeError("Generator is already executing.");for(;u;)try{if(t=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return u.label++,{value:s[1],done:!1};case 5:u.label++,n=s[1],s=[0];continue;case 7:s=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===s[0]||2===s[0])){u=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){u.label=s[1];break}if(6===s[0]&&u.label<o[1]){u.label=o[1],o=s;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(s);break}o[2]&&u.ops.pop(),u.trys.pop();continue}s=r.call(e,u)}catch(e){s=[6,e],n=0}finally{t=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}}import{PROVIDER_COOKIE_NAME as s}from"../const/cookieName.js";import{getAddress as u}from"./utils.js";export var getSelectedAddress=(e=n(function(e,r,t){var n,u;return o(this,function(o){switch(o.label){case 0:return[4,e.getLocalStorage(s+r,"selectedAddress")];case 1:if(!(n=o.sent())||!(null==n?void 0:n.length))return[2,void 0];return[4,e.getLocalStorage(r,"user_id")];case 2:return u=o.sent(),[2,null==n?void 0:n.find(function(e){return e.network===t&&e.userId===u})]}})}),function(r,t,n){return e.apply(this,arguments)});export var setSelectedAddress=(r=n(function(e,r,t,n){var a,i,l;return o(this,function(o){switch(o.label){case 0:return[4,e.getLocalStorage(s+r,"selectedAddress")];case 1:return a=o.sent(),[4,e.getLocalStorage(r,"user_id")];case 2:if(i=o.sent(),!(!a||!(null==a?void 0:a.length)))return[3,4];return[4,e.setLocalStorage(s+r,"selectedAddress",[{userId:i,network:t,address:u(t,n)}])];case 3:case 5:return o.sent(),[2];case 4:return -1!==(l=null==a?void 0:a.findIndex(function(e){return e.network===t&&e.userId===i}))?a[l].address=u(t,n):a.push({userId:i,network:t,address:u(t,n)}),[4,e.setLocalStorage(s+r,"selectedAddress",a)]}})}),function(e,t,n,o){return r.apply(this,arguments)});