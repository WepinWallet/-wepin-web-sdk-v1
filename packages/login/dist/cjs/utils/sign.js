"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"getSignForLogin",{enumerable:!0,get:function(){return f}});var e=require("buffer"),r=/*#__PURE__*/u(require("secp256k1")),t=/*#__PURE__*/u(require("sha256"));function u(e){return e&&e.__esModule?e:{default:e}}function f(u,f){var n=e.Buffer.from(u,"hex"),o=(0,t.default)(f),i=e.Buffer.from(o,"hex"),_=r.default.ecdsaSign(i,n);return e.Buffer.from(_.signature).toString("hex")}