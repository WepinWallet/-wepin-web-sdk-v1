function t(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=Array(r);e<r;e++)n[e]=t[e];return n}function r(t){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function e(t,r){return(e=Object.setPrototypeOf||function(t,r){return t.__proto__=r,t})(t,r)}import{EventEmitter as n}from"events";function o(t,r,e){try{Reflect.apply(t,r,e)}catch(t){setTimeout(function(){throw t})}}export var SafeEventEmitter=function(n){!function(t,r){if("function"!=typeof r&&null!==r)throw TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&e(t,r)}(f,n);var i,u,c=(i=function(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}(),function(){var t,e=r(f);return t=i?Reflect.construct(e,arguments,r(this).constructor):e.apply(this,arguments),t&&("object"==(t&&"undefined"!=typeof Symbol&&t.constructor===Symbol?"symbol":typeof t)||"function"==typeof t)?t:function(t){if(void 0===t)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(this)});function f(){return!function(t,r){if(!(t instanceof r))throw TypeError("Cannot call a class as a function")}(this,f),c.apply(this,arguments)}return u=[{key:"emit",value:function(r){for(var e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];var u="error"===r,c=this._events;if(void 0!==c)u=u&&void 0===c.error;else if(!u)return!1;if(u){if(n.length>0&&(l=(function(t){if(Array.isArray(t))return t}(n)||function(t,r){var e,n,o=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=o){var i=[],u=!0,c=!1;try{for(o=o.call(t);!(u=(e=o.next()).done)&&(i.push(e.value),1!==i.length);u=!0);}catch(t){c=!0,n=t}finally{try{u||null==o.return||o.return()}finally{if(c)throw n}}return i}}(n,1)||function(r,e){if(r){if("string"==typeof r)return t(r,1);var n=Object.prototype.toString.call(r).slice(8,-1);if("Object"===n&&r.constructor&&(n=r.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return t(r,1)}}(n,1)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0]),f=l,null!=(a=Error)&&"undefined"!=typeof Symbol&&a[Symbol.hasInstance]?!!a[Symbol.hasInstance](f):f instanceof a)throw l;var f,a,l,s=Error("Unhandled error.".concat(l?" (".concat(l.message,")"):""));throw s.context=l,s}var y=c[r];if(void 0===y)return!1;if("function"==typeof y)o(y,this,n);else for(var p=y.length,h=function(t){for(var r=t.length,e=Array(r),n=0;n<r;n+=1)e[n]=t[n];return e}(y),b=0;b<p;b+=1)o(h[b],this,n);return!0}}],function(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}(f.prototype,u),f}(n);