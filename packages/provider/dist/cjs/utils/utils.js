"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function(t,r){for(var e in r)Object.defineProperty(t,e,{enumerable:!0,get:r[e]})}(exports,{getAddress:function(){return i},getRpcPromiseCallback:function(){return t},isEthChainId:function(){return e},isSolChain:function(){return n},isValidChainId:function(){return r}});var t=function(t,r){var e=!(arguments.length>2)||void 0===arguments[2]||arguments[2];return function(n,i){n||i.error?r(n||i.error):!e||Array.isArray(i)?t(i):t(i.result)}},r=function(t){return!!t&&"string"==typeof t&&(t.startsWith("0x")||n(t))},e=function(t){return!!t&&"string"==typeof t&&t.startsWith("0x")},n=function(t){return!!t&&"string"==typeof t&&t.startsWith("solana")},i=function(t,r){switch(t){case"ethereum":case"klaytn":default:return null==r?void 0:r.toLowerCase();case"solana":case"solana-devnet":return r}};