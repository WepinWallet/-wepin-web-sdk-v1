function e(e,r,t,n,i,o,s){try{var a=e[o](s),u=a.value}catch(e){t(e);return}a.done?r(u):Promise.resolve(u).then(n,i)}function r(r){return function(){var t=this,n=arguments;return new Promise(function(i,o){var s=r.apply(t,n);function a(r){e(s,i,o,a,u,"next",r)}function u(r){e(s,i,o,a,u,"throw",r)}a(void 0)})}}function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function n(e,r){var t,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(t)throw TypeError("Generator is already executing.");for(;s;)try{if(t=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=(i=s.trys).length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=r.call(e,s)}catch(e){o=[6,e],n=0}finally{t=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}}import{getUrlsByMode as i,getModeByAppKey as o,WebviewEventHandler as s,makeWepinResponseMessage as a}from"@wepin/common";import{WepinFetch as u,isErrorResponse as c,isFirebaseErrorResponse as l,WepinPlatformType as p}from"@wepin/fetch-js";import d from"@wepin/login-js/package.json";import{Widget as h,WepinModal as w}from"@wepin/modal-js";import f from"@wepin/storage-js";import{COOKIE_NAME as g}from"./const/CookieName.js";import{OAUTH2 as v}from"./const/Provider.js";import{emailRegExp as k,passwordRegExp as m}from"./const/regExp.js";import{Timer as _,TimerPromise as b}from"./utils/IntervalPromise.js";import T from"./utils/log.js";import{checkExistFirebaseLoginSession as y,checkExistWepinLoginSession as I,getLoginUserStorage as E}from"./utils/loginWepin.js";import{checkAndVerifyEmail as W,signUpEmail as S}from"./utils/signUpEmail.js";export var WepinLogin=function(){var e;function F(e){var r=e.appId,n=e.appKey;!function(e,r){if(!(e instanceof r))throw TypeError("Cannot call a class as a function")}(this,F),t(this,"version",void 0),t(this,"type",void 0),t(this,"appId",void 0),t(this,"_appKey",void 0),t(this,"_isInitialized",void 0),t(this,"_wepinModal",void 0),t(this,"_wepinStorage",void 0),t(this,"_wepinFetch",void 0),t(this,"widget",void 0),t(this,"_url",void 0),t(this,"appEmailVerified",void 0),t(this,"language",void 0),t(this,"webviewEventHandler",new s),this.version=d.version,this.appId=r,this._appKey=n,this._isInitialized=!1,this.widget=void 0,this._wepinModal=new w,this._wepinStorage=new f,this.type=this._wepinStorage.platform,this._url=new URL(i(o(n)).wepinWebview),console.log("WepinLogin v".concat(this.version))}return e=[{key:"init",value:function(e){var t=this;return r(function(){var r;return n(this,function(n){switch(n.label){case 0:if(t._isInitialized)throw Error("Already initialized");return t.language=null!=e?e:"en",t._wepinFetch=new u({appId:t.appId,appKey:t._appKey,domain:t._wepinModal.domain,sdk:{version:t.version,type:"".concat(t.type,"-login")},storage:t._wepinStorage}),[4,t._wepinFetch.init()];case 1:return n.sent(),[4,t._wepinFetch.wepinApi.app.getAppInfo({platform:p[t.type],withNetwork:!1})];case 2:if(c(r=n.sent()))throw Error(r.message);return t.appEmailVerified=r.appInfo.property.emailVerify,t.appId=t._wepinFetch.appId=r.appInfo.id,t._isInitialized=!0,[2]}})})()}},{key:"finalize",value:function(){var e;this._isInitialized=!1,null===(e=this.widget)||void 0===e||e.close()}},{key:"changeLanguage",value:function(e){this.language=e}},{key:"isInitialized",value:function(){return this._isInitialized}},{key:"initCookieData",value:function(e){var t=this;return r(function(){var r;return n(this,function(n){switch(n.label){case 0:return[4,t._wepinStorage.getLocalStorage(t.appId,g)];case 1:if(r=n.sent(),!(e&&r))return[3,4];return[4,t._wepinStorage.clearLocalStorage(t.appId,g)];case 2:return n.sent(),[4,t._wepinStorage.clearAllLocalStorage(t.appId)];case 3:n.sent(),n.label=4;case 4:return[2,r]}})})()}},{key:"setCookieData",value:function(e){var t=this;return r(function(){return n(this,function(r){switch(r.label){case 0:return[4,t._wepinStorage.setLocalStorage(t.appId,g,e)];case 1:return r.sent(),[2]}})})()}},{key:"throwUserCancel",value:function(){var e=this,r=new _;return new b(function(t,n){"Window"===e.widget.type&&r.setInterval(function(){try{var t,i,o=h.getWebview(e.widget.id);(!o||o.closed)&&(r.clearInterval(),null===(i=e.widget)||void 0===i||i.close(),n(Error("User canceled")))}catch(i){r.clearInterval(),null===(t=e.widget)||void 0===t||t.close(),n(Error("Internal error"))}},200)},r)}},{key:"openLoginWidget",value:function(e){var t=this;return r(function(){var i,o;return n(this,function(s){switch(s.label){case 0:return(i=new URL(t._url)).pathname="/before-oauth",i.searchParams.append("move_to",e),i.searchParams.append("token_to","login_lib"),i.searchParams.append("locale",null!==(o=t.language)&&void 0!==o?o:"en"),[4,t.openWidget(i.toString(),"Window")];case 1:return s.sent(),[2,new Promise(function(i,o){var s,u=t.throwUserCancel();u.catch(function(e){u.timer.clearInterval(),t.webviewEventHandler.removeRequestHandler("set_token",c),o(e)});var c=(s=r(function(r){var s,c;return n(this,function(n){switch(n.label){case 0:if(!(s=r.body.parameter.customToken))return[3,4];if(!s.includes("error"))return[3,2];return[4,t._wepinStorage.clearLocalStorage(t.appId,g)];case 1:return n.sent(),o(Error(s)),u.timer.clearInterval(),t.widget.close(),[2];case 2:return[4,t.doFirebaseLoginWithCustomToken(s,e)];case 3:return i.apply(void 0,[n.sent()]),[3,6];case 4:return[4,t._wepinStorage.clearLocalStorage(t.appId,g)];case 5:n.sent(),o(Error("User canceled")),n.label=6;case 6:return u.timer.clearInterval(),t.widget.close(),c=a(r,"SUCCESS",{}),t.widget.response(c),[2]}})}),function(e){return s.apply(this,arguments)});t.webviewEventHandler.addRequestHandler("set_token",c,!0)})]}})})()}},{key:"loginOAuth2",value:function(e){var t=this;return r(function(){var r,i;return n(this,function(n){switch(n.label){case 0:return[4,t._wepinStorage.getLocalStorage(t.appId,g)];case 1:if(!((r=n.sent())&&!e.withLogout))return[3,4];return[4,t._wepinFetch.wepinFirebaseApi.getRefreshIdToken(null==r?void 0:r.refreshToken)];case 2:return i=n.sent(),[4,t.setCookieData({idToken:i,refreshToken:null==r?void 0:r.refreshToken,provider:e.provider})];case 3:return n.sent(),[2,{provider:e.provider,token:{idToken:i,refreshToken:null==r?void 0:r.refreshToken}}];case 4:return[4,t.openLoginWidget(e.provider)];case 5:return[2,n.sent()]}})})()}},{key:"loginWithOauthProvider",value:function(e){var t=this;return r(function(){var r;return n(this,function(n){switch(n.label){case 0:if(!t._isInitialized)throw Error("Wepin login module Not initialized");return[4,t._wepinStorage.getLocalStorage(t.appId,g)];case 1:return r=n.sent(),[4,t.initCookieData(e.withLogout||r&&r.provider!==e.provider)];case 2:if(n.sent(),v.includes(e.provider))return[2,t.loginOAuth2(e)];throw Error("Invalid provider")}})})()}},{key:"logout",value:function(){var e=this;return r(function(){return n(this,function(r){switch(r.label){case 0:if(!e._isInitialized)throw Error("Wepin login module Not initialized");return[4,e.initCookieData(!0)];case 1:if(r.sent())return[2,!0];throw Error("Already logout")}})})()}},{key:"signUpWithEmailAndPassword",value:function(e,t,s){var a=this;return r(function(){var r,u,c;return n(this,function(n){switch(n.label){case 0:if(!a._isInitialized)throw Error("Wepin login module Not initialized");if(e&&!k.test(e))throw Error("The email does not match the correct format.");return[4,a.initCookieData(!0)];case 1:return n.sent(),[4,W({email:e.trim(),locale:a.language,isRequireVerified:a.appEmailVerified,wepinFetch:a._wepinFetch,wepinUrl:new URL(i(o(a._appKey)).wallet),openWepinWallet:s})];case 2:if(u=(r=n.sent()).oobReset,c=r.oobVerify,t&&!m.test(t))throw Error("The password does not match the correct format.");return[4,S({oobReset:u,oobVerify:c,email:e.trim(),password:t,wepinFetch:a._wepinFetch})];case 3:return n.sent(),[4,a.loginWithEmailAndResetPasswordState(e,t)];case 4:return[2,n.sent()]}})})()}},{key:"changePassword",value:function(e,t,i){var o=this;return r(function(){var r,s,a,u,p,d,h;return n(this,function(n){switch(n.label){case 0:return[4,o._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 1:if(c(s=n.sent())){if(400!==s.statusCode||!s.message.includes("not exist"))throw Error(s.message);r=!0}else r=s.isPasswordResetRequired;if(!r)return[2,i];return[4,o._wepinFetch.wepinApi.user.login({idToken:i.idToken})];case 2:if(c(a=n.sent()))throw Error(a.message);return[4,o._wepinFetch.wepinFirebaseApi.updatePassword(i.idToken,t)];case 3:if(l(u=n.sent()))throw Error(null===(p=u.error)||void 0===p?void 0:p.message);return[4,o._wepinFetch.setToken({accessToken:a.token.access,refreshToken:a.token.refresh})];case 4:return n.sent(),[4,o._wepinFetch.wepinApi.user.updateUserPasswordState({userId:a.userInfo.userId},{isPasswordResetRequired:!1})];case 5:if(l(d=n.sent()))throw Error(null===(h=d.error)||void 0===h?void 0:h.message);return[4,o._wepinFetch.wepinApi.user.logout({userId:a.userInfo.userId})];case 6:return n.sent(),[4,o._wepinFetch.setToken(void 0)];case 7:return n.sent(),[2,{idToken:u.idToken,refreshToken:u.refreshToken}]}})})()}},{key:"loginWithEmailAndResetPasswordState",value:function(e,t){var i=this;return r(function(){var r,o,s,a,u,l;return n(this,function(n){switch(n.label){case 0:return[4,i.initCookieData(!0)];case 1:return n.sent(),r=!1,[4,i._wepinFetch.wepinApi.user.getUserPasswordState({email:e.trim()})];case 2:if(c(o=n.sent())){if(400!==o.statusCode||!o.message.includes("not exist"))throw Error(o.message);r=!0}else r=o.isPasswordResetRequired;return[4,i._wepinFetch.wepinFirebaseApi.signInWithEmailPassword(e.trim(),t,!r)];case 3:return a=(s=n.sent()).idToken,u=s.refreshToken,[4,i.changePassword(e,t,{idToken:a,refreshToken:u})];case 4:return l=n.sent(),[4,i.setCookieData({idToken:l.idToken,refreshToken:l.refreshToken,provider:"email"})];case 5:return n.sent(),[2,{provider:"email",token:{idToken:l.idToken,refreshToken:l.refreshToken}}]}})})()}},{key:"loginWithEmailAndPassword",value:function(e,t){var i=this;return r(function(){var r,o,s,a;return n(this,function(n){switch(n.label){case 0:if(!i._isInitialized)throw Error("Wepin login module Not initialized");if(e&&!k.test(e))throw Error("The email does not match the correct format.");if(t&&!m.test(t))throw Error("The password does not match the correct format.");return[4,i._wepinFetch.wepinApi.user.checkEmailExist({email:e})];case 1:if(c(r=n.sent()))throw Error(r.message);if(o=r.isEmailExist,s=r.isEmailverified,a=r.providerIds,!(o&&s&&a.includes("password")))return[3,3];return[4,i.loginWithEmailAndResetPasswordState(e,t)];case 2:return[2,n.sent()];case 3:throw Error("required/signup-email");case 4:return[2]}})})()}},{key:"doFirebaseLoginWithCustomToken",value:function(e,t){var i=this;return r(function(){var r,o,s;return n(this,function(n){switch(n.label){case 0:return[4,i._wepinFetch.wepinFirebaseApi.signInWithCustomToken(e)];case 1:return o=(r=n.sent()).idToken,s=r.refreshToken,[4,i.setCookieData({idToken:o,refreshToken:s,provider:t})];case 2:return n.sent(),[2,{provider:t,token:{idToken:o,refreshToken:s}}]}})})()}},{key:"loginWithIdToken",value:function(e){var t=this;return r(function(){var r;return n(this,function(n){switch(n.label){case 0:if(!t._isInitialized)throw Error("Wepin login module Not initialized");return[4,t.initCookieData(!0)];case 1:return n.sent(),[4,t._wepinFetch.wepinApi.user.loginOAuthIdToken({idToken:e.token,sign:e.sign})];case 2:if(c(r=n.sent()))throw Error(r.message);return[4,t.doFirebaseLoginWithCustomToken(r.token,"external_token")];case 3:return[2,n.sent()]}})})()}},{key:"loginWithAccessToken",value:function(e){var t=this;return r(function(){var r;return n(this,function(n){switch(n.label){case 0:if(!t._isInitialized)throw Error("Wepin login module Not initialized");return[4,t.initCookieData(!0)];case 1:return n.sent(),[4,t._wepinFetch.wepinApi.user.loginOAuthAccessToken({provider:e.provider,accessToken:e.token,sign:e.sign})];case 2:if(c(r=n.sent()))throw Error(r.message);return[4,t.doFirebaseLoginWithCustomToken(r.token,"external_token")];case 3:return[2,n.sent()]}})})()}},{key:"getRefreshFirebaseToken",value:function(){var e=this;return r(function(){var r;return n(this,function(t){switch(t.label){case 0:if(!e._isInitialized)throw Error("Wepin.loginWepin: wepin sdk has to be initialized");return[4,y(e.appId,e._wepinFetch,e._wepinStorage)];case 1:if(!t.sent())return[3,3];return[4,e._wepinStorage.getLocalStorage(e.appId,"firebase:wepin")];case 2:return[2,{provider:(r=t.sent()).provider,token:{idToken:r.idToken,refreshToken:r.refreshToken}}];case 3:throw Error("invalid login session");case 4:return[2]}})})()}},{key:"loginWepin",value:function(e){var t=e.provider,i=e.token,o=this;return r(function(){var e,r,s,a;return n(this,function(n){switch(n.label){case 0:if(!o._isInitialized)throw Error("Wepin.loginWepin: wepin sdk has to be initialized");if(!i.idToken||!i.refreshToken)throw Error("Wepin.loginWepin: idToken and refreshToken are required");return[4,o._wepinFetch.wepinApi.user.login({idToken:i.idToken})];case 1:if(c(e=n.sent()))throw Error(e.message);return[4,o._wepinStorage.setLoginUserLocalStorage(o.appId,{provider:t,token:i},e)];case 2:return r=n.sent(),[4,o._wepinFetch.setToken(r.connectUser)];case 3:return n.sent(),[4,o._wepinStorage.getLocalStorage(o.appId,"user_status")];case 4:return s=n.sent(),[4,o._wepinStorage.getLocalStorage(o.appId,"wallet_id")];case 5:return a=n.sent(),"pinRequired"===s.loginStatus&&(s.pinRequired=!0),[2,Object.assign(r.userInfo,{walletId:a,userStatus:s,token:r.connectUser})]}})})()}},{key:"getCurrentWepinUser",value:function(){var e=this;return r(function(){var r;return n(this,function(t){switch(t.label){case 0:if(!e._isInitialized)throw Error("Wepin.getCurrentWepinUser: wepin sdk has to be initialized");return[4,I(e.appId,e._wepinFetch,e._wepinStorage)];case 1:if(!t.sent())throw Error("invalid login session");return[4,E(e.appId,e._wepinStorage)];case 2:if(!(r=t.sent()))throw Error("invalid login session");return[2,r]}})})()}},{key:"openWidget",value:function(e,t){var i=this;return r(function(){var r,o,s;return n(this,function(n){switch(n.label){case 0:if(n.trys.push([0,7,,8]),r=i.webviewEventHandler.getEventListenerFunction(),"Frame"!=t)return[3,2];return[4,i._wepinModal.openModal(e,r,{isHide:!0})];case 1:return i.widget=n.sent(),h.getWebview(i.widget.id).src=e,[3,6];case 2:return[4,i._wepinModal.openAuthBrowser(e,r)];case 3:if(i.widget=n.sent(),(o=h.getWebview(i.widget.id)).location.href=e,o)return[3,5];return[4,i._wepinModal.openAuthBrowser(e,r)];case 4:return i.widget=n.sent(),o.location.href=e,[3,6];case 5:o.focus(),n.label=6;case 6:return[2,!0];case 7:throw s=n.sent(),T.error(s),Error("Failed to open widget");case 8:return[2]}})})()}},{key:"closeWidget",value:function(){if(this.widget)this.widget.close(),this.widget=void 0;else throw Error("Widget is not exist")}}],function(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(F.prototype,e),F}();