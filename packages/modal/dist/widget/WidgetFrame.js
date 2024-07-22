var e,t;function r(e,t,r,o,n,i,u){try{var l=e[i](u),c=l.value}catch(e){r(e);return}l.done?t(c):Promise.resolve(c).then(o,n)}function o(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}import{Widget as u}from"./Widget";import{getIFrameElement as l}from"./utils";export var WidgetFrame=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}(s,e);var t,c,a,f=(t=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}(),function(){var e,r=n(s);return e=t?Reflect.construct(r,arguments,n(this).constructor):r.apply(this,arguments),e&&("object"==(e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e)||"function"==typeof e)?e:function(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(this)});function s(e){var t,r=e.url,o=e.frame,n=e.EL,i=e.isHide;!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,s),t=f.call(this,r,o,"Frame",n,i),o.src=r,o.id=t.id;var u=document.querySelector("body");return s.scrollPosition=window.scrollY||window.pageYOffset||document.documentElement.scrollTop,u.style.overflow="hidden",document.body.appendChild(o),window.scrollTo({top:s.scrollPosition}),t}return c=[{key:"expand",value:function(){var e=u.getWebview(this.id);e.style.height="100%",e.style.borderRadius="0"}},{key:"shrink",value:function(){var e=u.getWebview(this.id);e.style.height="604px",e.style.borderRadius="12px 12px 0 0 "}},{key:"_closeWebview",value:function(){var e=this,t=setTimeout(function(){var r=u.getWebview(e.id);document.querySelector("body").style.removeProperty("overflow"),r&&document.body.removeChild(r),u.clearWebview(e.id),clearTimeout(t)},500)}},{key:"_post",value:function(e){u.getWebview(this.id).contentWindow.postMessage(e,this.url)}}],a=[{key:"openNew",value:function(e){var t,o=e.url,n=e.EL,i=e.widgetOptions;return(t=function(){return function(e,t){var r,o,n,i,u={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function l(i){return function(l){return function(i){if(r)throw TypeError("Generator is already executing.");for(;u;)try{if(r=1,o&&(n=2&i[0]?o.return:i[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,i[1])).done)return n;switch(o=0,n&&(i=[2&i[0],n.value]),i[0]){case 0:case 1:n=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,o=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(n=(n=u.trys).length>0&&n[n.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!n||i[1]>n[0]&&i[1]<n[3])){u.label=i[1];break}if(6===i[0]&&u.label<n[1]){u.label=n[1],n=i;break}if(n&&u.label<n[2]){u.label=n[2],u.ops.push(i);break}n[2]&&u.ops.pop(),u.trys.pop();continue}i=t.call(e,u)}catch(e){i=[6,e],o=0}finally{r=n=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}}(this,function(e){return[2,new s({url:o,frame:l({isHide:null==i?void 0:i.isHide}),EL:n,isHide:null==i?void 0:i.isHide})]})},function(){var e=this,o=arguments;return new Promise(function(n,i){var u=t.apply(e,o);function l(e){r(u,n,i,l,c,"next",e)}function c(e){r(u,n,i,l,c,"throw",e)}l(void 0)})})()}}],c&&o(s.prototype,c),a&&o(s,a),s}(u);t=void 0,(e="scrollPosition")in WidgetFrame?Object.defineProperty(WidgetFrame,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):WidgetFrame[e]=t;