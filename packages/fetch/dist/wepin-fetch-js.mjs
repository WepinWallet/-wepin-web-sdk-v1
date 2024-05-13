const name$1 = "@wepin/fetch-js", version$1 = "0.0.1", description$1 = "Wepin fetch library for Web", author$1 = "IoTrust, Co., Ltd.", license$1 = "MIT", main$1 = "./dist/wepin-fetch-js.mjs", types$1 = "./dist/src/index.d.ts", files$1 = [
  "dist"
], scripts$1 = {
  build: "vite build --mode production",
  dev: "vite build --mode development",
  watch: "vite build --watch",
  lint: "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix --ignore-path .gitignore"
}, dependencies$1 = {
  "@wepin/storage-js": "link:../storage",
  bcryptjs: "^2.4.3",
  eventemitter2: "^6.4.9",
  "jwt-decode": "^4.0.0"
}, devDependencies$1 = {
  "@types/bcryptjs": "^2.4.6"
}, keywords$1 = [
  "wepin",
  "wepinwallet",
  "wallet",
  "wepin-fetch"
], packageJson = {
  name: name$1,
  version: version$1,
  description: description$1,
  author: author$1,
  license: license$1,
  main: main$1,
  types: types$1,
  files: files$1,
  scripts: scripts$1,
  dependencies: dependencies$1,
  devDependencies: devDependencies$1,
  keywords: keywords$1
};
class APIResponse {
  constructor({
    data: _,
    status: B,
    headers: M,
    request: P
  }) {
    this.data = _, this.status = B, this.headers = M, this.request = P;
  }
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(A) {
  return A && A.__esModule && Object.prototype.hasOwnProperty.call(A, "default") ? A.default : A;
}
var buffer$1 = {}, base64Js = {}, hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js)
    return base64Js;
  hasRequiredBase64Js = 1, base64Js.byteLength = d, base64Js.toByteArray = m, base64Js.fromByteArray = q;
  for (var A = [], _ = [], B = typeof Uint8Array < "u" ? Uint8Array : Array, M = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", P = 0, r = M.length; P < r; ++P)
    A[P] = M[P], _[M.charCodeAt(P)] = P;
  _[45] = 62, _[95] = 63;
  function S(R) {
    var I = R.length;
    if (I % 4 > 0)
      throw new Error("Invalid string. Length must be a multiple of 4");
    var k = R.indexOf("=");
    k === -1 && (k = I);
    var $ = k === I ? 0 : 4 - k % 4;
    return [k, $];
  }
  function d(R) {
    var I = S(R), k = I[0], $ = I[1];
    return (k + $) * 3 / 4 - $;
  }
  function x(R, I, k) {
    return (I + k) * 3 / 4 - k;
  }
  function m(R) {
    var I, k = S(R), $ = k[0], C = k[1], L = new B(x(R, $, C)), H = 0, j = C > 0 ? $ - 4 : $, J;
    for (J = 0; J < j; J += 4)
      I = _[R.charCodeAt(J)] << 18 | _[R.charCodeAt(J + 1)] << 12 | _[R.charCodeAt(J + 2)] << 6 | _[R.charCodeAt(J + 3)], L[H++] = I >> 16 & 255, L[H++] = I >> 8 & 255, L[H++] = I & 255;
    return C === 2 && (I = _[R.charCodeAt(J)] << 2 | _[R.charCodeAt(J + 1)] >> 4, L[H++] = I & 255), C === 1 && (I = _[R.charCodeAt(J)] << 10 | _[R.charCodeAt(J + 1)] << 4 | _[R.charCodeAt(J + 2)] >> 2, L[H++] = I >> 8 & 255, L[H++] = I & 255), L;
  }
  function f(R) {
    return A[R >> 18 & 63] + A[R >> 12 & 63] + A[R >> 6 & 63] + A[R & 63];
  }
  function y(R, I, k) {
    for (var $, C = [], L = I; L < k; L += 3)
      $ = (R[L] << 16 & 16711680) + (R[L + 1] << 8 & 65280) + (R[L + 2] & 255), C.push(f($));
    return C.join("");
  }
  function q(R) {
    for (var I, k = R.length, $ = k % 3, C = [], L = 16383, H = 0, j = k - $; H < j; H += L)
      C.push(y(R, H, H + L > j ? j : H + L));
    return $ === 1 ? (I = R[k - 1], C.push(
      A[I >> 2] + A[I << 4 & 63] + "=="
    )) : $ === 2 && (I = (R[k - 2] << 8) + R[k - 1], C.push(
      A[I >> 10] + A[I >> 4 & 63] + A[I << 2 & 63] + "="
    )), C.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  return hasRequiredIeee754 || (hasRequiredIeee754 = 1, ieee754.read = function(A, _, B, M, P) {
    var r, S, d = P * 8 - M - 1, x = (1 << d) - 1, m = x >> 1, f = -7, y = B ? P - 1 : 0, q = B ? -1 : 1, R = A[_ + y];
    for (y += q, r = R & (1 << -f) - 1, R >>= -f, f += d; f > 0; r = r * 256 + A[_ + y], y += q, f -= 8)
      ;
    for (S = r & (1 << -f) - 1, r >>= -f, f += M; f > 0; S = S * 256 + A[_ + y], y += q, f -= 8)
      ;
    if (r === 0)
      r = 1 - m;
    else {
      if (r === x)
        return S ? NaN : (R ? -1 : 1) * (1 / 0);
      S = S + Math.pow(2, M), r = r - m;
    }
    return (R ? -1 : 1) * S * Math.pow(2, r - M);
  }, ieee754.write = function(A, _, B, M, P, r) {
    var S, d, x, m = r * 8 - P - 1, f = (1 << m) - 1, y = f >> 1, q = P === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, R = M ? 0 : r - 1, I = M ? 1 : -1, k = _ < 0 || _ === 0 && 1 / _ < 0 ? 1 : 0;
    for (_ = Math.abs(_), isNaN(_) || _ === 1 / 0 ? (d = isNaN(_) ? 1 : 0, S = f) : (S = Math.floor(Math.log(_) / Math.LN2), _ * (x = Math.pow(2, -S)) < 1 && (S--, x *= 2), S + y >= 1 ? _ += q / x : _ += q * Math.pow(2, 1 - y), _ * x >= 2 && (S++, x /= 2), S + y >= f ? (d = 0, S = f) : S + y >= 1 ? (d = (_ * x - 1) * Math.pow(2, P), S = S + y) : (d = _ * Math.pow(2, y - 1) * Math.pow(2, P), S = 0)); P >= 8; A[B + R] = d & 255, R += I, d /= 256, P -= 8)
      ;
    for (S = S << P | d, m += P; m > 0; A[B + R] = S & 255, R += I, S /= 256, m -= 8)
      ;
    A[B + R - I] |= k * 128;
  }), ieee754;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var hasRequiredBuffer$1;
function requireBuffer$1() {
  return hasRequiredBuffer$1 || (hasRequiredBuffer$1 = 1, function(A) {
    var _ = requireBase64Js(), B = requireIeee754(), M = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
    A.Buffer = d, A.SlowBuffer = L, A.INSPECT_MAX_BYTES = 50;
    var P = 2147483647;
    A.kMaxLength = P, d.TYPED_ARRAY_SUPPORT = r(), !d.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
    function r() {
      try {
        var Z = new Uint8Array(1), O = { foo: function() {
          return 42;
        } };
        return Object.setPrototypeOf(O, Uint8Array.prototype), Object.setPrototypeOf(Z, O), Z.foo() === 42;
      } catch {
        return !1;
      }
    }
    Object.defineProperty(d.prototype, "parent", {
      enumerable: !0,
      get: function() {
        if (d.isBuffer(this))
          return this.buffer;
      }
    }), Object.defineProperty(d.prototype, "offset", {
      enumerable: !0,
      get: function() {
        if (d.isBuffer(this))
          return this.byteOffset;
      }
    });
    function S(Z) {
      if (Z > P)
        throw new RangeError('The value "' + Z + '" is invalid for option "size"');
      var O = new Uint8Array(Z);
      return Object.setPrototypeOf(O, d.prototype), O;
    }
    function d(Z, O, F) {
      if (typeof Z == "number") {
        if (typeof O == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return y(Z);
      }
      return x(Z, O, F);
    }
    d.poolSize = 8192;
    function x(Z, O, F) {
      if (typeof Z == "string")
        return q(Z, O);
      if (ArrayBuffer.isView(Z))
        return I(Z);
      if (Z == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Z
        );
      if (ae(Z, ArrayBuffer) || Z && ae(Z.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (ae(Z, SharedArrayBuffer) || Z && ae(Z.buffer, SharedArrayBuffer)))
        return k(Z, O, F);
      if (typeof Z == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      var K = Z.valueOf && Z.valueOf();
      if (K != null && K !== Z)
        return d.from(K, O, F);
      var re = $(Z);
      if (re)
        return re;
      if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof Z[Symbol.toPrimitive] == "function")
        return d.from(
          Z[Symbol.toPrimitive]("string"),
          O,
          F
        );
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof Z
      );
    }
    d.from = function(Z, O, F) {
      return x(Z, O, F);
    }, Object.setPrototypeOf(d.prototype, Uint8Array.prototype), Object.setPrototypeOf(d, Uint8Array);
    function m(Z) {
      if (typeof Z != "number")
        throw new TypeError('"size" argument must be of type number');
      if (Z < 0)
        throw new RangeError('The value "' + Z + '" is invalid for option "size"');
    }
    function f(Z, O, F) {
      return m(Z), Z <= 0 ? S(Z) : O !== void 0 ? typeof F == "string" ? S(Z).fill(O, F) : S(Z).fill(O) : S(Z);
    }
    d.alloc = function(Z, O, F) {
      return f(Z, O, F);
    };
    function y(Z) {
      return m(Z), S(Z < 0 ? 0 : C(Z) | 0);
    }
    d.allocUnsafe = function(Z) {
      return y(Z);
    }, d.allocUnsafeSlow = function(Z) {
      return y(Z);
    };
    function q(Z, O) {
      if ((typeof O != "string" || O === "") && (O = "utf8"), !d.isEncoding(O))
        throw new TypeError("Unknown encoding: " + O);
      var F = H(Z, O) | 0, K = S(F), re = K.write(Z, O);
      return re !== F && (K = K.slice(0, re)), K;
    }
    function R(Z) {
      for (var O = Z.length < 0 ? 0 : C(Z.length) | 0, F = S(O), K = 0; K < O; K += 1)
        F[K] = Z[K] & 255;
      return F;
    }
    function I(Z) {
      if (ae(Z, Uint8Array)) {
        var O = new Uint8Array(Z);
        return k(O.buffer, O.byteOffset, O.byteLength);
      }
      return R(Z);
    }
    function k(Z, O, F) {
      if (O < 0 || Z.byteLength < O)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (Z.byteLength < O + (F || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      var K;
      return O === void 0 && F === void 0 ? K = new Uint8Array(Z) : F === void 0 ? K = new Uint8Array(Z, O) : K = new Uint8Array(Z, O, F), Object.setPrototypeOf(K, d.prototype), K;
    }
    function $(Z) {
      if (d.isBuffer(Z)) {
        var O = C(Z.length) | 0, F = S(O);
        return F.length === 0 || Z.copy(F, 0, 0, O), F;
      }
      if (Z.length !== void 0)
        return typeof Z.length != "number" || se(Z.length) ? S(0) : R(Z);
      if (Z.type === "Buffer" && Array.isArray(Z.data))
        return R(Z.data);
    }
    function C(Z) {
      if (Z >= P)
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + P.toString(16) + " bytes");
      return Z | 0;
    }
    function L(Z) {
      return +Z != Z && (Z = 0), d.alloc(+Z);
    }
    d.isBuffer = function(O) {
      return O != null && O._isBuffer === !0 && O !== d.prototype;
    }, d.compare = function(O, F) {
      if (ae(O, Uint8Array) && (O = d.from(O, O.offset, O.byteLength)), ae(F, Uint8Array) && (F = d.from(F, F.offset, F.byteLength)), !d.isBuffer(O) || !d.isBuffer(F))
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (O === F)
        return 0;
      for (var K = O.length, re = F.length, fe = 0, oe = Math.min(K, re); fe < oe; ++fe)
        if (O[fe] !== F[fe]) {
          K = O[fe], re = F[fe];
          break;
        }
      return K < re ? -1 : re < K ? 1 : 0;
    }, d.isEncoding = function(O) {
      switch (String(O).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, d.concat = function(O, F) {
      if (!Array.isArray(O))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (O.length === 0)
        return d.alloc(0);
      var K;
      if (F === void 0)
        for (F = 0, K = 0; K < O.length; ++K)
          F += O[K].length;
      var re = d.allocUnsafe(F), fe = 0;
      for (K = 0; K < O.length; ++K) {
        var oe = O[K];
        if (ae(oe, Uint8Array))
          fe + oe.length > re.length ? d.from(oe).copy(re, fe) : Uint8Array.prototype.set.call(
            re,
            oe,
            fe
          );
        else if (d.isBuffer(oe))
          oe.copy(re, fe);
        else
          throw new TypeError('"list" argument must be an Array of Buffers');
        fe += oe.length;
      }
      return re;
    };
    function H(Z, O) {
      if (d.isBuffer(Z))
        return Z.length;
      if (ArrayBuffer.isView(Z) || ae(Z, ArrayBuffer))
        return Z.byteLength;
      if (typeof Z != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof Z
        );
      var F = Z.length, K = arguments.length > 2 && arguments[2] === !0;
      if (!K && F === 0)
        return 0;
      for (var re = !1; ; )
        switch (O) {
          case "ascii":
          case "latin1":
          case "binary":
            return F;
          case "utf8":
          case "utf-8":
            return N(Z).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return F * 2;
          case "hex":
            return F >>> 1;
          case "base64":
            return G(Z).length;
          default:
            if (re)
              return K ? -1 : N(Z).length;
            O = ("" + O).toLowerCase(), re = !0;
        }
    }
    d.byteLength = H;
    function j(Z, O, F) {
      var K = !1;
      if ((O === void 0 || O < 0) && (O = 0), O > this.length || ((F === void 0 || F > this.length) && (F = this.length), F <= 0) || (F >>>= 0, O >>>= 0, F <= O))
        return "";
      for (Z || (Z = "utf8"); ; )
        switch (Z) {
          case "hex":
            return b(this, O, F);
          case "utf8":
          case "utf-8":
            return e(this, O, F);
          case "ascii":
            return g(this, O, F);
          case "latin1":
          case "binary":
            return h(this, O, F);
          case "base64":
            return o(this, O, F);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return p(this, O, F);
          default:
            if (K)
              throw new TypeError("Unknown encoding: " + Z);
            Z = (Z + "").toLowerCase(), K = !0;
        }
    }
    d.prototype._isBuffer = !0;
    function J(Z, O, F) {
      var K = Z[O];
      Z[O] = Z[F], Z[F] = K;
    }
    d.prototype.swap16 = function() {
      var O = this.length;
      if (O % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (var F = 0; F < O; F += 2)
        J(this, F, F + 1);
      return this;
    }, d.prototype.swap32 = function() {
      var O = this.length;
      if (O % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (var F = 0; F < O; F += 4)
        J(this, F, F + 3), J(this, F + 1, F + 2);
      return this;
    }, d.prototype.swap64 = function() {
      var O = this.length;
      if (O % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (var F = 0; F < O; F += 8)
        J(this, F, F + 7), J(this, F + 1, F + 6), J(this, F + 2, F + 5), J(this, F + 3, F + 4);
      return this;
    }, d.prototype.toString = function() {
      var O = this.length;
      return O === 0 ? "" : arguments.length === 0 ? e(this, 0, O) : j.apply(this, arguments);
    }, d.prototype.toLocaleString = d.prototype.toString, d.prototype.equals = function(O) {
      if (!d.isBuffer(O))
        throw new TypeError("Argument must be a Buffer");
      return this === O ? !0 : d.compare(this, O) === 0;
    }, d.prototype.inspect = function() {
      var O = "", F = A.INSPECT_MAX_BYTES;
      return O = this.toString("hex", 0, F).replace(/(.{2})/g, "$1 ").trim(), this.length > F && (O += " ... "), "<Buffer " + O + ">";
    }, M && (d.prototype[M] = d.prototype.inspect), d.prototype.compare = function(O, F, K, re, fe) {
      if (ae(O, Uint8Array) && (O = d.from(O, O.offset, O.byteLength)), !d.isBuffer(O))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof O
        );
      if (F === void 0 && (F = 0), K === void 0 && (K = O ? O.length : 0), re === void 0 && (re = 0), fe === void 0 && (fe = this.length), F < 0 || K > O.length || re < 0 || fe > this.length)
        throw new RangeError("out of range index");
      if (re >= fe && F >= K)
        return 0;
      if (re >= fe)
        return -1;
      if (F >= K)
        return 1;
      if (F >>>= 0, K >>>= 0, re >>>= 0, fe >>>= 0, this === O)
        return 0;
      for (var oe = fe - re, le = K - F, ce = Math.min(oe, le), ve = this.slice(re, fe), pe = O.slice(F, K), de = 0; de < ce; ++de)
        if (ve[de] !== pe[de]) {
          oe = ve[de], le = pe[de];
          break;
        }
      return oe < le ? -1 : le < oe ? 1 : 0;
    };
    function X(Z, O, F, K, re) {
      if (Z.length === 0)
        return -1;
      if (typeof F == "string" ? (K = F, F = 0) : F > 2147483647 ? F = 2147483647 : F < -2147483648 && (F = -2147483648), F = +F, se(F) && (F = re ? 0 : Z.length - 1), F < 0 && (F = Z.length + F), F >= Z.length) {
        if (re)
          return -1;
        F = Z.length - 1;
      } else if (F < 0)
        if (re)
          F = 0;
        else
          return -1;
      if (typeof O == "string" && (O = d.from(O, K)), d.isBuffer(O))
        return O.length === 0 ? -1 : ie(Z, O, F, K, re);
      if (typeof O == "number")
        return O = O & 255, typeof Uint8Array.prototype.indexOf == "function" ? re ? Uint8Array.prototype.indexOf.call(Z, O, F) : Uint8Array.prototype.lastIndexOf.call(Z, O, F) : ie(Z, [O], F, K, re);
      throw new TypeError("val must be string, number or Buffer");
    }
    function ie(Z, O, F, K, re) {
      var fe = 1, oe = Z.length, le = O.length;
      if (K !== void 0 && (K = String(K).toLowerCase(), K === "ucs2" || K === "ucs-2" || K === "utf16le" || K === "utf-16le")) {
        if (Z.length < 2 || O.length < 2)
          return -1;
        fe = 2, oe /= 2, le /= 2, F /= 2;
      }
      function ce(Re, be) {
        return fe === 1 ? Re[be] : Re.readUInt16BE(be * fe);
      }
      var ve;
      if (re) {
        var pe = -1;
        for (ve = F; ve < oe; ve++)
          if (ce(Z, ve) === ce(O, pe === -1 ? 0 : ve - pe)) {
            if (pe === -1 && (pe = ve), ve - pe + 1 === le)
              return pe * fe;
          } else
            pe !== -1 && (ve -= ve - pe), pe = -1;
      } else
        for (F + le > oe && (F = oe - le), ve = F; ve >= 0; ve--) {
          for (var de = !0, Ne = 0; Ne < le; Ne++)
            if (ce(Z, ve + Ne) !== ce(O, Ne)) {
              de = !1;
              break;
            }
          if (de)
            return ve;
        }
      return -1;
    }
    d.prototype.includes = function(O, F, K) {
      return this.indexOf(O, F, K) !== -1;
    }, d.prototype.indexOf = function(O, F, K) {
      return X(this, O, F, K, !0);
    }, d.prototype.lastIndexOf = function(O, F, K) {
      return X(this, O, F, K, !1);
    };
    function ne(Z, O, F, K) {
      F = Number(F) || 0;
      var re = Z.length - F;
      K ? (K = Number(K), K > re && (K = re)) : K = re;
      var fe = O.length;
      K > fe / 2 && (K = fe / 2);
      for (var oe = 0; oe < K; ++oe) {
        var le = parseInt(O.substr(oe * 2, 2), 16);
        if (se(le))
          return oe;
        Z[F + oe] = le;
      }
      return oe;
    }
    function ee(Z, O, F, K) {
      return W(N(O, Z.length - F), Z, F, K);
    }
    function ue(Z, O, F, K) {
      return W(Q(O), Z, F, K);
    }
    function U(Z, O, F, K) {
      return W(G(O), Z, F, K);
    }
    function E(Z, O, F, K) {
      return W(te(O, Z.length - F), Z, F, K);
    }
    d.prototype.write = function(O, F, K, re) {
      if (F === void 0)
        re = "utf8", K = this.length, F = 0;
      else if (K === void 0 && typeof F == "string")
        re = F, K = this.length, F = 0;
      else if (isFinite(F))
        F = F >>> 0, isFinite(K) ? (K = K >>> 0, re === void 0 && (re = "utf8")) : (re = K, K = void 0);
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      var fe = this.length - F;
      if ((K === void 0 || K > fe) && (K = fe), O.length > 0 && (K < 0 || F < 0) || F > this.length)
        throw new RangeError("Attempt to write outside buffer bounds");
      re || (re = "utf8");
      for (var oe = !1; ; )
        switch (re) {
          case "hex":
            return ne(this, O, F, K);
          case "utf8":
          case "utf-8":
            return ee(this, O, F, K);
          case "ascii":
          case "latin1":
          case "binary":
            return ue(this, O, F, K);
          case "base64":
            return U(this, O, F, K);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return E(this, O, F, K);
          default:
            if (oe)
              throw new TypeError("Unknown encoding: " + re);
            re = ("" + re).toLowerCase(), oe = !0;
        }
    }, d.prototype.toJSON = function() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function o(Z, O, F) {
      return O === 0 && F === Z.length ? _.fromByteArray(Z) : _.fromByteArray(Z.slice(O, F));
    }
    function e(Z, O, F) {
      F = Math.min(Z.length, F);
      for (var K = [], re = O; re < F; ) {
        var fe = Z[re], oe = null, le = fe > 239 ? 4 : fe > 223 ? 3 : fe > 191 ? 2 : 1;
        if (re + le <= F) {
          var ce, ve, pe, de;
          switch (le) {
            case 1:
              fe < 128 && (oe = fe);
              break;
            case 2:
              ce = Z[re + 1], (ce & 192) === 128 && (de = (fe & 31) << 6 | ce & 63, de > 127 && (oe = de));
              break;
            case 3:
              ce = Z[re + 1], ve = Z[re + 2], (ce & 192) === 128 && (ve & 192) === 128 && (de = (fe & 15) << 12 | (ce & 63) << 6 | ve & 63, de > 2047 && (de < 55296 || de > 57343) && (oe = de));
              break;
            case 4:
              ce = Z[re + 1], ve = Z[re + 2], pe = Z[re + 3], (ce & 192) === 128 && (ve & 192) === 128 && (pe & 192) === 128 && (de = (fe & 15) << 18 | (ce & 63) << 12 | (ve & 63) << 6 | pe & 63, de > 65535 && de < 1114112 && (oe = de));
          }
        }
        oe === null ? (oe = 65533, le = 1) : oe > 65535 && (oe -= 65536, K.push(oe >>> 10 & 1023 | 55296), oe = 56320 | oe & 1023), K.push(oe), re += le;
      }
      return v(K);
    }
    var t = 4096;
    function v(Z) {
      var O = Z.length;
      if (O <= t)
        return String.fromCharCode.apply(String, Z);
      for (var F = "", K = 0; K < O; )
        F += String.fromCharCode.apply(
          String,
          Z.slice(K, K += t)
        );
      return F;
    }
    function g(Z, O, F) {
      var K = "";
      F = Math.min(Z.length, F);
      for (var re = O; re < F; ++re)
        K += String.fromCharCode(Z[re] & 127);
      return K;
    }
    function h(Z, O, F) {
      var K = "";
      F = Math.min(Z.length, F);
      for (var re = O; re < F; ++re)
        K += String.fromCharCode(Z[re]);
      return K;
    }
    function b(Z, O, F) {
      var K = Z.length;
      (!O || O < 0) && (O = 0), (!F || F < 0 || F > K) && (F = K);
      for (var re = "", fe = O; fe < F; ++fe)
        re += he[Z[fe]];
      return re;
    }
    function p(Z, O, F) {
      for (var K = Z.slice(O, F), re = "", fe = 0; fe < K.length - 1; fe += 2)
        re += String.fromCharCode(K[fe] + K[fe + 1] * 256);
      return re;
    }
    d.prototype.slice = function(O, F) {
      var K = this.length;
      O = ~~O, F = F === void 0 ? K : ~~F, O < 0 ? (O += K, O < 0 && (O = 0)) : O > K && (O = K), F < 0 ? (F += K, F < 0 && (F = 0)) : F > K && (F = K), F < O && (F = O);
      var re = this.subarray(O, F);
      return Object.setPrototypeOf(re, d.prototype), re;
    };
    function w(Z, O, F) {
      if (Z % 1 !== 0 || Z < 0)
        throw new RangeError("offset is not uint");
      if (Z + O > F)
        throw new RangeError("Trying to access beyond buffer length");
    }
    d.prototype.readUintLE = d.prototype.readUIntLE = function(O, F, K) {
      O = O >>> 0, F = F >>> 0, K || w(O, F, this.length);
      for (var re = this[O], fe = 1, oe = 0; ++oe < F && (fe *= 256); )
        re += this[O + oe] * fe;
      return re;
    }, d.prototype.readUintBE = d.prototype.readUIntBE = function(O, F, K) {
      O = O >>> 0, F = F >>> 0, K || w(O, F, this.length);
      for (var re = this[O + --F], fe = 1; F > 0 && (fe *= 256); )
        re += this[O + --F] * fe;
      return re;
    }, d.prototype.readUint8 = d.prototype.readUInt8 = function(O, F) {
      return O = O >>> 0, F || w(O, 1, this.length), this[O];
    }, d.prototype.readUint16LE = d.prototype.readUInt16LE = function(O, F) {
      return O = O >>> 0, F || w(O, 2, this.length), this[O] | this[O + 1] << 8;
    }, d.prototype.readUint16BE = d.prototype.readUInt16BE = function(O, F) {
      return O = O >>> 0, F || w(O, 2, this.length), this[O] << 8 | this[O + 1];
    }, d.prototype.readUint32LE = d.prototype.readUInt32LE = function(O, F) {
      return O = O >>> 0, F || w(O, 4, this.length), (this[O] | this[O + 1] << 8 | this[O + 2] << 16) + this[O + 3] * 16777216;
    }, d.prototype.readUint32BE = d.prototype.readUInt32BE = function(O, F) {
      return O = O >>> 0, F || w(O, 4, this.length), this[O] * 16777216 + (this[O + 1] << 16 | this[O + 2] << 8 | this[O + 3]);
    }, d.prototype.readIntLE = function(O, F, K) {
      O = O >>> 0, F = F >>> 0, K || w(O, F, this.length);
      for (var re = this[O], fe = 1, oe = 0; ++oe < F && (fe *= 256); )
        re += this[O + oe] * fe;
      return fe *= 128, re >= fe && (re -= Math.pow(2, 8 * F)), re;
    }, d.prototype.readIntBE = function(O, F, K) {
      O = O >>> 0, F = F >>> 0, K || w(O, F, this.length);
      for (var re = F, fe = 1, oe = this[O + --re]; re > 0 && (fe *= 256); )
        oe += this[O + --re] * fe;
      return fe *= 128, oe >= fe && (oe -= Math.pow(2, 8 * F)), oe;
    }, d.prototype.readInt8 = function(O, F) {
      return O = O >>> 0, F || w(O, 1, this.length), this[O] & 128 ? (255 - this[O] + 1) * -1 : this[O];
    }, d.prototype.readInt16LE = function(O, F) {
      O = O >>> 0, F || w(O, 2, this.length);
      var K = this[O] | this[O + 1] << 8;
      return K & 32768 ? K | 4294901760 : K;
    }, d.prototype.readInt16BE = function(O, F) {
      O = O >>> 0, F || w(O, 2, this.length);
      var K = this[O + 1] | this[O] << 8;
      return K & 32768 ? K | 4294901760 : K;
    }, d.prototype.readInt32LE = function(O, F) {
      return O = O >>> 0, F || w(O, 4, this.length), this[O] | this[O + 1] << 8 | this[O + 2] << 16 | this[O + 3] << 24;
    }, d.prototype.readInt32BE = function(O, F) {
      return O = O >>> 0, F || w(O, 4, this.length), this[O] << 24 | this[O + 1] << 16 | this[O + 2] << 8 | this[O + 3];
    }, d.prototype.readFloatLE = function(O, F) {
      return O = O >>> 0, F || w(O, 4, this.length), B.read(this, O, !0, 23, 4);
    }, d.prototype.readFloatBE = function(O, F) {
      return O = O >>> 0, F || w(O, 4, this.length), B.read(this, O, !1, 23, 4);
    }, d.prototype.readDoubleLE = function(O, F) {
      return O = O >>> 0, F || w(O, 8, this.length), B.read(this, O, !0, 52, 8);
    }, d.prototype.readDoubleBE = function(O, F) {
      return O = O >>> 0, F || w(O, 8, this.length), B.read(this, O, !1, 52, 8);
    };
    function a(Z, O, F, K, re, fe) {
      if (!d.isBuffer(Z))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (O > re || O < fe)
        throw new RangeError('"value" argument is out of bounds');
      if (F + K > Z.length)
        throw new RangeError("Index out of range");
    }
    d.prototype.writeUintLE = d.prototype.writeUIntLE = function(O, F, K, re) {
      if (O = +O, F = F >>> 0, K = K >>> 0, !re) {
        var fe = Math.pow(2, 8 * K) - 1;
        a(this, O, F, K, fe, 0);
      }
      var oe = 1, le = 0;
      for (this[F] = O & 255; ++le < K && (oe *= 256); )
        this[F + le] = O / oe & 255;
      return F + K;
    }, d.prototype.writeUintBE = d.prototype.writeUIntBE = function(O, F, K, re) {
      if (O = +O, F = F >>> 0, K = K >>> 0, !re) {
        var fe = Math.pow(2, 8 * K) - 1;
        a(this, O, F, K, fe, 0);
      }
      var oe = K - 1, le = 1;
      for (this[F + oe] = O & 255; --oe >= 0 && (le *= 256); )
        this[F + oe] = O / le & 255;
      return F + K;
    }, d.prototype.writeUint8 = d.prototype.writeUInt8 = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 1, 255, 0), this[F] = O & 255, F + 1;
    }, d.prototype.writeUint16LE = d.prototype.writeUInt16LE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 2, 65535, 0), this[F] = O & 255, this[F + 1] = O >>> 8, F + 2;
    }, d.prototype.writeUint16BE = d.prototype.writeUInt16BE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 2, 65535, 0), this[F] = O >>> 8, this[F + 1] = O & 255, F + 2;
    }, d.prototype.writeUint32LE = d.prototype.writeUInt32LE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 4, 4294967295, 0), this[F + 3] = O >>> 24, this[F + 2] = O >>> 16, this[F + 1] = O >>> 8, this[F] = O & 255, F + 4;
    }, d.prototype.writeUint32BE = d.prototype.writeUInt32BE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 4, 4294967295, 0), this[F] = O >>> 24, this[F + 1] = O >>> 16, this[F + 2] = O >>> 8, this[F + 3] = O & 255, F + 4;
    }, d.prototype.writeIntLE = function(O, F, K, re) {
      if (O = +O, F = F >>> 0, !re) {
        var fe = Math.pow(2, 8 * K - 1);
        a(this, O, F, K, fe - 1, -fe);
      }
      var oe = 0, le = 1, ce = 0;
      for (this[F] = O & 255; ++oe < K && (le *= 256); )
        O < 0 && ce === 0 && this[F + oe - 1] !== 0 && (ce = 1), this[F + oe] = (O / le >> 0) - ce & 255;
      return F + K;
    }, d.prototype.writeIntBE = function(O, F, K, re) {
      if (O = +O, F = F >>> 0, !re) {
        var fe = Math.pow(2, 8 * K - 1);
        a(this, O, F, K, fe - 1, -fe);
      }
      var oe = K - 1, le = 1, ce = 0;
      for (this[F + oe] = O & 255; --oe >= 0 && (le *= 256); )
        O < 0 && ce === 0 && this[F + oe + 1] !== 0 && (ce = 1), this[F + oe] = (O / le >> 0) - ce & 255;
      return F + K;
    }, d.prototype.writeInt8 = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 1, 127, -128), O < 0 && (O = 255 + O + 1), this[F] = O & 255, F + 1;
    }, d.prototype.writeInt16LE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 2, 32767, -32768), this[F] = O & 255, this[F + 1] = O >>> 8, F + 2;
    }, d.prototype.writeInt16BE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 2, 32767, -32768), this[F] = O >>> 8, this[F + 1] = O & 255, F + 2;
    }, d.prototype.writeInt32LE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 4, 2147483647, -2147483648), this[F] = O & 255, this[F + 1] = O >>> 8, this[F + 2] = O >>> 16, this[F + 3] = O >>> 24, F + 4;
    }, d.prototype.writeInt32BE = function(O, F, K) {
      return O = +O, F = F >>> 0, K || a(this, O, F, 4, 2147483647, -2147483648), O < 0 && (O = 4294967295 + O + 1), this[F] = O >>> 24, this[F + 1] = O >>> 16, this[F + 2] = O >>> 8, this[F + 3] = O & 255, F + 4;
    };
    function T(Z, O, F, K, re, fe) {
      if (F + K > Z.length)
        throw new RangeError("Index out of range");
      if (F < 0)
        throw new RangeError("Index out of range");
    }
    function V(Z, O, F, K, re) {
      return O = +O, F = F >>> 0, re || T(Z, O, F, 4), B.write(Z, O, F, K, 23, 4), F + 4;
    }
    d.prototype.writeFloatLE = function(O, F, K) {
      return V(this, O, F, !0, K);
    }, d.prototype.writeFloatBE = function(O, F, K) {
      return V(this, O, F, !1, K);
    };
    function Y(Z, O, F, K, re) {
      return O = +O, F = F >>> 0, re || T(Z, O, F, 8), B.write(Z, O, F, K, 52, 8), F + 8;
    }
    d.prototype.writeDoubleLE = function(O, F, K) {
      return Y(this, O, F, !0, K);
    }, d.prototype.writeDoubleBE = function(O, F, K) {
      return Y(this, O, F, !1, K);
    }, d.prototype.copy = function(O, F, K, re) {
      if (!d.isBuffer(O))
        throw new TypeError("argument should be a Buffer");
      if (K || (K = 0), !re && re !== 0 && (re = this.length), F >= O.length && (F = O.length), F || (F = 0), re > 0 && re < K && (re = K), re === K || O.length === 0 || this.length === 0)
        return 0;
      if (F < 0)
        throw new RangeError("targetStart out of bounds");
      if (K < 0 || K >= this.length)
        throw new RangeError("Index out of range");
      if (re < 0)
        throw new RangeError("sourceEnd out of bounds");
      re > this.length && (re = this.length), O.length - F < re - K && (re = O.length - F + K);
      var fe = re - K;
      return this === O && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(F, K, re) : Uint8Array.prototype.set.call(
        O,
        this.subarray(K, re),
        F
      ), fe;
    }, d.prototype.fill = function(O, F, K, re) {
      if (typeof O == "string") {
        if (typeof F == "string" ? (re = F, F = 0, K = this.length) : typeof K == "string" && (re = K, K = this.length), re !== void 0 && typeof re != "string")
          throw new TypeError("encoding must be a string");
        if (typeof re == "string" && !d.isEncoding(re))
          throw new TypeError("Unknown encoding: " + re);
        if (O.length === 1) {
          var fe = O.charCodeAt(0);
          (re === "utf8" && fe < 128 || re === "latin1") && (O = fe);
        }
      } else
        typeof O == "number" ? O = O & 255 : typeof O == "boolean" && (O = Number(O));
      if (F < 0 || this.length < F || this.length < K)
        throw new RangeError("Out of range index");
      if (K <= F)
        return this;
      F = F >>> 0, K = K === void 0 ? this.length : K >>> 0, O || (O = 0);
      var oe;
      if (typeof O == "number")
        for (oe = F; oe < K; ++oe)
          this[oe] = O;
      else {
        var le = d.isBuffer(O) ? O : d.from(O, re), ce = le.length;
        if (ce === 0)
          throw new TypeError('The value "' + O + '" is invalid for argument "value"');
        for (oe = 0; oe < K - F; ++oe)
          this[oe + F] = le[oe % ce];
      }
      return this;
    };
    var z = /[^+/0-9A-Za-z-_]/g;
    function D(Z) {
      if (Z = Z.split("=")[0], Z = Z.trim().replace(z, ""), Z.length < 2)
        return "";
      for (; Z.length % 4 !== 0; )
        Z = Z + "=";
      return Z;
    }
    function N(Z, O) {
      O = O || 1 / 0;
      for (var F, K = Z.length, re = null, fe = [], oe = 0; oe < K; ++oe) {
        if (F = Z.charCodeAt(oe), F > 55295 && F < 57344) {
          if (!re) {
            if (F > 56319) {
              (O -= 3) > -1 && fe.push(239, 191, 189);
              continue;
            } else if (oe + 1 === K) {
              (O -= 3) > -1 && fe.push(239, 191, 189);
              continue;
            }
            re = F;
            continue;
          }
          if (F < 56320) {
            (O -= 3) > -1 && fe.push(239, 191, 189), re = F;
            continue;
          }
          F = (re - 55296 << 10 | F - 56320) + 65536;
        } else
          re && (O -= 3) > -1 && fe.push(239, 191, 189);
        if (re = null, F < 128) {
          if ((O -= 1) < 0)
            break;
          fe.push(F);
        } else if (F < 2048) {
          if ((O -= 2) < 0)
            break;
          fe.push(
            F >> 6 | 192,
            F & 63 | 128
          );
        } else if (F < 65536) {
          if ((O -= 3) < 0)
            break;
          fe.push(
            F >> 12 | 224,
            F >> 6 & 63 | 128,
            F & 63 | 128
          );
        } else if (F < 1114112) {
          if ((O -= 4) < 0)
            break;
          fe.push(
            F >> 18 | 240,
            F >> 12 & 63 | 128,
            F >> 6 & 63 | 128,
            F & 63 | 128
          );
        } else
          throw new Error("Invalid code point");
      }
      return fe;
    }
    function Q(Z) {
      for (var O = [], F = 0; F < Z.length; ++F)
        O.push(Z.charCodeAt(F) & 255);
      return O;
    }
    function te(Z, O) {
      for (var F, K, re, fe = [], oe = 0; oe < Z.length && !((O -= 2) < 0); ++oe)
        F = Z.charCodeAt(oe), K = F >> 8, re = F % 256, fe.push(re), fe.push(K);
      return fe;
    }
    function G(Z) {
      return _.toByteArray(D(Z));
    }
    function W(Z, O, F, K) {
      for (var re = 0; re < K && !(re + F >= O.length || re >= Z.length); ++re)
        O[re + F] = Z[re];
      return re;
    }
    function ae(Z, O) {
      return Z instanceof O || Z != null && Z.constructor != null && Z.constructor.name != null && Z.constructor.name === O.name;
    }
    function se(Z) {
      return Z !== Z;
    }
    var he = function() {
      for (var Z = "0123456789abcdef", O = new Array(256), F = 0; F < 16; ++F)
        for (var K = F * 16, re = 0; re < 16; ++re)
          O[K + re] = Z[F] + Z[re];
      return O;
    }();
  }(buffer$1)), buffer$1;
}
var bufferExports = requireBuffer$1(), browser$c = { exports: {} }, process = browser$c.exports = {}, cachedSetTimeout, cachedClearTimeout;
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    typeof setTimeout == "function" ? cachedSetTimeout = setTimeout : cachedSetTimeout = defaultSetTimout;
  } catch {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    typeof clearTimeout == "function" ? cachedClearTimeout = clearTimeout : cachedClearTimeout = defaultClearTimeout;
  } catch {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(A) {
  if (cachedSetTimeout === setTimeout)
    return setTimeout(A, 0);
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout)
    return cachedSetTimeout = setTimeout, setTimeout(A, 0);
  try {
    return cachedSetTimeout(A, 0);
  } catch {
    try {
      return cachedSetTimeout.call(null, A, 0);
    } catch {
      return cachedSetTimeout.call(this, A, 0);
    }
  }
}
function runClearTimeout(A) {
  if (cachedClearTimeout === clearTimeout)
    return clearTimeout(A);
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout)
    return cachedClearTimeout = clearTimeout, clearTimeout(A);
  try {
    return cachedClearTimeout(A);
  } catch {
    try {
      return cachedClearTimeout.call(null, A);
    } catch {
      return cachedClearTimeout.call(this, A);
    }
  }
}
var queue = [], draining = !1, currentQueue, queueIndex = -1;
function cleanUpNextTick() {
  !draining || !currentQueue || (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue());
}
function drainQueue() {
  if (!draining) {
    var A = runTimeout(cleanUpNextTick);
    draining = !0;
    for (var _ = queue.length; _; ) {
      for (currentQueue = queue, queue = []; ++queueIndex < _; )
        currentQueue && currentQueue[queueIndex].run();
      queueIndex = -1, _ = queue.length;
    }
    currentQueue = null, draining = !1, runClearTimeout(A);
  }
}
process.nextTick = function(A) {
  var _ = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var B = 1; B < arguments.length; B++)
      _[B - 1] = arguments[B];
  queue.push(new Item(A, _)), queue.length === 1 && !draining && runTimeout(drainQueue);
};
function Item(A, _) {
  this.fun = A, this.array = _;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = !0;
process.env = {};
process.argv = [];
process.version = "";
process.versions = {};
function noop() {
}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(A) {
  return [];
};
process.binding = function(A) {
  throw new Error("process.binding is not supported");
};
process.cwd = function() {
  return "/";
};
process.chdir = function(A) {
  throw new Error("process.chdir is not supported");
};
process.umask = function() {
  return 0;
};
var browserExports = browser$c.exports;
const process$1 = /* @__PURE__ */ getDefaultExportFromCjs(browserExports);
(function(A) {
  function _() {
    var M = this || self;
    return delete A.prototype.__magic__, M;
  }
  if (typeof globalThis == "object")
    return globalThis;
  if (this)
    return _();
  A.defineProperty(A.prototype, "__magic__", {
    configurable: !0,
    get: _
  });
  var B = __magic__;
  return B;
})(Object);
var eventemitter2 = { exports: {} };
(function(A, _) {
  (function(B) {
    var M = Object.hasOwnProperty, P = Array.isArray ? Array.isArray : function(b) {
      return Object.prototype.toString.call(b) === "[object Array]";
    }, r = 10, S = typeof process$1 == "object" && typeof process$1.nextTick == "function", d = typeof Symbol == "function", x = typeof Reflect == "object", m = typeof setImmediate == "function", f = m ? setImmediate : setTimeout, y = d ? x && typeof Reflect.ownKeys == "function" ? Reflect.ownKeys : function(h) {
      var b = Object.getOwnPropertyNames(h);
      return b.push.apply(b, Object.getOwnPropertySymbols(h)), b;
    } : Object.keys;
    function q() {
      this._events = {}, this._conf && R.call(this, this._conf);
    }
    function R(h) {
      h && (this._conf = h, h.delimiter && (this.delimiter = h.delimiter), h.maxListeners !== B && (this._maxListeners = h.maxListeners), h.wildcard && (this.wildcard = h.wildcard), h.newListener && (this._newListener = h.newListener), h.removeListener && (this._removeListener = h.removeListener), h.verboseMemoryLeak && (this.verboseMemoryLeak = h.verboseMemoryLeak), h.ignoreErrors && (this.ignoreErrors = h.ignoreErrors), this.wildcard && (this.listenerTree = {}));
    }
    function I(h, b) {
      var p = "(node) warning: possible EventEmitter memory leak detected. " + h + " listeners added. Use emitter.setMaxListeners() to increase limit.";
      if (this.verboseMemoryLeak && (p += " Event name: " + b + "."), typeof process$1 < "u" && process$1.emitWarning) {
        var w = new Error(p);
        w.name = "MaxListenersExceededWarning", w.emitter = this, w.count = h, process$1.emitWarning(w);
      } else
        console.error(p), console.trace && console.trace();
    }
    var k = function(h, b, p) {
      var w = arguments.length;
      switch (w) {
        case 0:
          return [];
        case 1:
          return [h];
        case 2:
          return [h, b];
        case 3:
          return [h, b, p];
        default:
          for (var a = new Array(w); w--; )
            a[w] = arguments[w];
          return a;
      }
    };
    function $(h, b) {
      for (var p = {}, w, a = h.length, T = b ? b.length : 0, V = 0; V < a; V++)
        w = h[V], p[w] = V < T ? b[V] : B;
      return p;
    }
    function C(h, b, p) {
      this._emitter = h, this._target = b, this._listeners = {}, this._listenersCount = 0;
      var w, a;
      if ((p.on || p.off) && (w = p.on, a = p.off), b.addEventListener ? (w = b.addEventListener, a = b.removeEventListener) : b.addListener ? (w = b.addListener, a = b.removeListener) : b.on && (w = b.on, a = b.off), !w && !a)
        throw Error("target does not implement any known event API");
      if (typeof w != "function")
        throw TypeError("on method must be a function");
      if (typeof a != "function")
        throw TypeError("off method must be a function");
      this._on = w, this._off = a;
      var T = h._observers;
      T ? T.push(this) : h._observers = [this];
    }
    Object.assign(C.prototype, {
      subscribe: function(h, b, p) {
        var w = this, a = this._target, T = this._emitter, V = this._listeners, Y = function() {
          var z = k.apply(null, arguments), D = {
            data: z,
            name: b,
            original: h
          };
          if (p) {
            var N = p.call(a, D);
            N !== !1 && T.emit.apply(T, [D.name].concat(z));
            return;
          }
          T.emit.apply(T, [b].concat(z));
        };
        if (V[h])
          throw Error("Event '" + h + "' is already listening");
        this._listenersCount++, T._newListener && T._removeListener && !w._onNewListener ? (this._onNewListener = function(z) {
          z === b && V[h] === null && (V[h] = Y, w._on.call(a, h, Y));
        }, T.on("newListener", this._onNewListener), this._onRemoveListener = function(z) {
          z === b && !T.hasListeners(z) && V[h] && (V[h] = null, w._off.call(a, h, Y));
        }, V[h] = null, T.on("removeListener", this._onRemoveListener)) : (V[h] = Y, w._on.call(a, h, Y));
      },
      unsubscribe: function(h) {
        var b = this, p = this._listeners, w = this._emitter, a, T, V = this._off, Y = this._target, z;
        if (h && typeof h != "string")
          throw TypeError("event must be a string");
        function D() {
          b._onNewListener && (w.off("newListener", b._onNewListener), w.off("removeListener", b._onRemoveListener), b._onNewListener = null, b._onRemoveListener = null);
          var N = ne.call(w, b);
          w._observers.splice(N, 1);
        }
        if (h) {
          if (a = p[h], !a)
            return;
          V.call(Y, h, a), delete p[h], --this._listenersCount || D();
        } else {
          for (T = y(p), z = T.length; z-- > 0; )
            h = T[z], V.call(Y, h, p[h]);
          this._listeners = {}, this._listenersCount = 0, D();
        }
      }
    });
    function L(h, b, p, w) {
      var a = Object.assign({}, b);
      if (!h)
        return a;
      if (typeof h != "object")
        throw TypeError("options must be an object");
      var T = Object.keys(h), V = T.length, Y, z, D;
      function N(te) {
        throw Error('Invalid "' + Y + '" option value' + (te ? ". Reason: " + te : ""));
      }
      for (var Q = 0; Q < V; Q++) {
        if (Y = T[Q], !w && !M.call(b, Y))
          throw Error('Unknown "' + Y + '" option');
        z = h[Y], z !== B && (D = p[Y], a[Y] = D ? D(z, N) : z);
      }
      return a;
    }
    function H(h, b) {
      return (typeof h != "function" || !h.hasOwnProperty("prototype")) && b("value must be a constructor"), h;
    }
    function j(h) {
      var b = "value must be type of " + h.join("|"), p = h.length, w = h[0], a = h[1];
      return p === 1 ? function(T, V) {
        if (typeof T === w)
          return T;
        V(b);
      } : p === 2 ? function(T, V) {
        var Y = typeof T;
        if (Y === w || Y === a)
          return T;
        V(b);
      } : function(T, V) {
        for (var Y = typeof T, z = p; z-- > 0; )
          if (Y === h[z])
            return T;
        V(b);
      };
    }
    var J = j(["function"]), X = j(["object", "function"]);
    function ie(h, b, p) {
      var w, a, T = 0, V, Y = new h(function(z, D, N) {
        p = L(p, {
          timeout: 0,
          overload: !1
        }, {
          timeout: function(W, ae) {
            return W *= 1, (typeof W != "number" || W < 0 || !Number.isFinite(W)) && ae("timeout must be a positive number"), W;
          }
        }), w = !p.overload && typeof h.prototype.cancel == "function" && typeof N == "function";
        function Q() {
          a && (a = null), T && (clearTimeout(T), T = 0);
        }
        var te = function(W) {
          Q(), z(W);
        }, G = function(W) {
          Q(), D(W);
        };
        w ? b(te, G, N) : (a = [function(W) {
          G(W || Error("canceled"));
        }], b(te, G, function(W) {
          if (V)
            throw Error("Unable to subscribe on cancel event asynchronously");
          if (typeof W != "function")
            throw TypeError("onCancel callback must be a function");
          a.push(W);
        }), V = !0), p.timeout > 0 && (T = setTimeout(function() {
          var W = Error("timeout");
          W.code = "ETIMEDOUT", T = 0, Y.cancel(W), D(W);
        }, p.timeout));
      });
      return w || (Y.cancel = function(z) {
        if (a) {
          for (var D = a.length, N = 1; N < D; N++)
            a[N](z);
          a[0](z), a = null;
        }
      }), Y;
    }
    function ne(h) {
      var b = this._observers;
      if (!b)
        return -1;
      for (var p = b.length, w = 0; w < p; w++)
        if (b[w]._target === h)
          return w;
      return -1;
    }
    function ee(h, b, p, w, a) {
      if (!p)
        return null;
      if (w === 0) {
        var T = typeof b;
        if (T === "string") {
          var V, Y, z = 0, D = 0, N = this.delimiter, Q = N.length;
          if ((Y = b.indexOf(N)) !== -1) {
            V = new Array(5);
            do
              V[z++] = b.slice(D, Y), D = Y + Q;
            while ((Y = b.indexOf(N, D)) !== -1);
            V[z++] = b.slice(D), b = V, a = z;
          } else
            b = [b], a = 1;
        } else
          T === "object" ? a = b.length : (b = [b], a = 1);
      }
      var te = null, G, W, ae, se, he, Z = b[w], O = b[w + 1], F, K;
      if (w === a)
        p._listeners && (typeof p._listeners == "function" ? (h && h.push(p._listeners), te = [p]) : (h && h.push.apply(h, p._listeners), te = [p]));
      else if (Z === "*") {
        for (F = y(p), Y = F.length; Y-- > 0; )
          G = F[Y], G !== "_listeners" && (K = ee(h, b, p[G], w + 1, a), K && (te ? te.push.apply(te, K) : te = K));
        return te;
      } else if (Z === "**") {
        for (he = w + 1 === a || w + 2 === a && O === "*", he && p._listeners && (te = ee(h, b, p, a, a)), F = y(p), Y = F.length; Y-- > 0; )
          G = F[Y], G !== "_listeners" && (G === "*" || G === "**" ? (p[G]._listeners && !he && (K = ee(h, b, p[G], a, a), K && (te ? te.push.apply(te, K) : te = K)), K = ee(h, b, p[G], w, a)) : G === O ? K = ee(h, b, p[G], w + 2, a) : K = ee(h, b, p[G], w, a), K && (te ? te.push.apply(te, K) : te = K));
        return te;
      } else
        p[Z] && (te = ee(h, b, p[Z], w + 1, a));
      if (W = p["*"], W && ee(h, b, W, w + 1, a), ae = p["**"], ae)
        if (w < a)
          for (ae._listeners && ee(h, b, ae, a, a), F = y(ae), Y = F.length; Y-- > 0; )
            G = F[Y], G !== "_listeners" && (G === O ? ee(h, b, ae[G], w + 2, a) : G === Z ? ee(h, b, ae[G], w + 1, a) : (se = {}, se[G] = ae[G], ee(h, b, { "**": se }, w + 1, a)));
        else
          ae._listeners ? ee(h, b, ae, a, a) : ae["*"] && ae["*"]._listeners && ee(h, b, ae["*"], a, a);
      return te;
    }
    function ue(h, b, p) {
      var w = 0, a = 0, T, V = this.delimiter, Y = V.length, z;
      if (typeof h == "string")
        if ((T = h.indexOf(V)) !== -1) {
          z = new Array(5);
          do
            z[w++] = h.slice(a, T), a = T + Y;
          while ((T = h.indexOf(V, a)) !== -1);
          z[w++] = h.slice(a);
        } else
          z = [h], w = 1;
      else
        z = h, w = h.length;
      if (w > 1) {
        for (T = 0; T + 1 < w; T++)
          if (z[T] === "**" && z[T + 1] === "**")
            return;
      }
      var D = this.listenerTree, N;
      for (T = 0; T < w; T++)
        if (N = z[T], D = D[N] || (D[N] = {}), T === w - 1)
          return D._listeners ? (typeof D._listeners == "function" && (D._listeners = [D._listeners]), p ? D._listeners.unshift(b) : D._listeners.push(b), !D._listeners.warned && this._maxListeners > 0 && D._listeners.length > this._maxListeners && (D._listeners.warned = !0, I.call(this, D._listeners.length, N))) : D._listeners = b, !0;
      return !0;
    }
    function U(h, b, p, w) {
      for (var a = y(h), T = a.length, V, Y, z, D = h._listeners, N; T-- > 0; )
        Y = a[T], V = h[Y], Y === "_listeners" ? z = p : z = p ? p.concat(Y) : [Y], N = w || typeof Y == "symbol", D && b.push(N ? z : z.join(this.delimiter)), typeof V == "object" && U.call(this, V, b, z, N);
      return b;
    }
    function E(h) {
      for (var b = y(h), p = b.length, w, a, T; p-- > 0; )
        a = b[p], w = h[a], w && (T = !0, a !== "_listeners" && !E(w) && delete h[a]);
      return T;
    }
    function o(h, b, p) {
      this.emitter = h, this.event = b, this.listener = p;
    }
    o.prototype.off = function() {
      return this.emitter.off(this.event, this.listener), this;
    };
    function e(h, b, p) {
      if (p === !0)
        a = !0;
      else if (p === !1)
        w = !0;
      else {
        if (!p || typeof p != "object")
          throw TypeError("options should be an object or true");
        var w = p.async, a = p.promisify, T = p.nextTick, V = p.objectify;
      }
      if (w || T || a) {
        var Y = b, z = b._origin || b;
        if (T && !S)
          throw Error("process.nextTick is not supported");
        a === B && (a = b.constructor.name === "AsyncFunction"), b = function() {
          var D = arguments, N = this, Q = this.event;
          return a ? T ? Promise.resolve() : new Promise(function(te) {
            f(te);
          }).then(function() {
            return N.event = Q, Y.apply(N, D);
          }) : (T ? process$1.nextTick : f)(function() {
            N.event = Q, Y.apply(N, D);
          });
        }, b._async = !0, b._origin = z;
      }
      return [b, V ? new o(this, h, b) : this];
    }
    function t(h) {
      this._events = {}, this._newListener = !1, this._removeListener = !1, this.verboseMemoryLeak = !1, R.call(this, h);
    }
    t.EventEmitter2 = t, t.prototype.listenTo = function(h, b, p) {
      if (typeof h != "object")
        throw TypeError("target musts be an object");
      var w = this;
      p = L(p, {
        on: B,
        off: B,
        reducers: B
      }, {
        on: J,
        off: J,
        reducers: X
      });
      function a(T) {
        if (typeof T != "object")
          throw TypeError("events must be an object");
        var V = p.reducers, Y = ne.call(w, h), z;
        Y === -1 ? z = new C(w, h, p) : z = w._observers[Y];
        for (var D = y(T), N = D.length, Q, te = typeof V == "function", G = 0; G < N; G++)
          Q = D[G], z.subscribe(
            Q,
            T[Q] || Q,
            te ? V : V && V[Q]
          );
      }
      return P(b) ? a($(b)) : a(typeof b == "string" ? $(b.split(/\s+/)) : b), this;
    }, t.prototype.stopListeningTo = function(h, b) {
      var p = this._observers;
      if (!p)
        return !1;
      var w = p.length, a, T = !1;
      if (h && typeof h != "object")
        throw TypeError("target should be an object");
      for (; w-- > 0; )
        a = p[w], (!h || a._target === h) && (a.unsubscribe(b), T = !0);
      return T;
    }, t.prototype.delimiter = ".", t.prototype.setMaxListeners = function(h) {
      h !== B && (this._maxListeners = h, this._conf || (this._conf = {}), this._conf.maxListeners = h);
    }, t.prototype.getMaxListeners = function() {
      return this._maxListeners;
    }, t.prototype.event = "", t.prototype.once = function(h, b, p) {
      return this._once(h, b, !1, p);
    }, t.prototype.prependOnceListener = function(h, b, p) {
      return this._once(h, b, !0, p);
    }, t.prototype._once = function(h, b, p, w) {
      return this._many(h, 1, b, p, w);
    }, t.prototype.many = function(h, b, p, w) {
      return this._many(h, b, p, !1, w);
    }, t.prototype.prependMany = function(h, b, p, w) {
      return this._many(h, b, p, !0, w);
    }, t.prototype._many = function(h, b, p, w, a) {
      var T = this;
      if (typeof p != "function")
        throw new Error("many only accepts instances of Function");
      function V() {
        return --b === 0 && T.off(h, V), p.apply(this, arguments);
      }
      return V._origin = p, this._on(h, V, w, a);
    }, t.prototype.emit = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || q.call(this);
      var h = arguments[0], b, p = this.wildcard, w, a, T, V, Y;
      if (h === "newListener" && !this._newListener && !this._events.newListener)
        return !1;
      if (p && (b = h, h !== "newListener" && h !== "removeListener" && typeof h == "object")) {
        if (a = h.length, d) {
          for (T = 0; T < a; T++)
            if (typeof h[T] == "symbol") {
              Y = !0;
              break;
            }
        }
        Y || (h = h.join(this.delimiter));
      }
      var z = arguments.length, D;
      if (this._all && this._all.length)
        for (D = this._all.slice(), T = 0, a = D.length; T < a; T++)
          switch (this.event = h, z) {
            case 1:
              D[T].call(this, h);
              break;
            case 2:
              D[T].call(this, h, arguments[1]);
              break;
            case 3:
              D[T].call(this, h, arguments[1], arguments[2]);
              break;
            default:
              D[T].apply(this, arguments);
          }
      if (p)
        D = [], ee.call(this, D, b, this.listenerTree, 0, a);
      else if (D = this._events[h], typeof D == "function") {
        switch (this.event = h, z) {
          case 1:
            D.call(this);
            break;
          case 2:
            D.call(this, arguments[1]);
            break;
          case 3:
            D.call(this, arguments[1], arguments[2]);
            break;
          default:
            for (w = new Array(z - 1), V = 1; V < z; V++)
              w[V - 1] = arguments[V];
            D.apply(this, w);
        }
        return !0;
      } else
        D && (D = D.slice());
      if (D && D.length) {
        if (z > 3)
          for (w = new Array(z - 1), V = 1; V < z; V++)
            w[V - 1] = arguments[V];
        for (T = 0, a = D.length; T < a; T++)
          switch (this.event = h, z) {
            case 1:
              D[T].call(this);
              break;
            case 2:
              D[T].call(this, arguments[1]);
              break;
            case 3:
              D[T].call(this, arguments[1], arguments[2]);
              break;
            default:
              D[T].apply(this, w);
          }
        return !0;
      } else if (!this.ignoreErrors && !this._all && h === "error")
        throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
      return !!this._all;
    }, t.prototype.emitAsync = function() {
      if (!this._events && !this._all)
        return !1;
      this._events || q.call(this);
      var h = arguments[0], b = this.wildcard, p, w, a, T, V, Y;
      if (h === "newListener" && !this._newListener && !this._events.newListener)
        return Promise.resolve([!1]);
      if (b && (p = h, h !== "newListener" && h !== "removeListener" && typeof h == "object")) {
        if (T = h.length, d) {
          for (V = 0; V < T; V++)
            if (typeof h[V] == "symbol") {
              w = !0;
              break;
            }
        }
        w || (h = h.join(this.delimiter));
      }
      var z = [], D = arguments.length, N;
      if (this._all)
        for (V = 0, T = this._all.length; V < T; V++)
          switch (this.event = h, D) {
            case 1:
              z.push(this._all[V].call(this, h));
              break;
            case 2:
              z.push(this._all[V].call(this, h, arguments[1]));
              break;
            case 3:
              z.push(this._all[V].call(this, h, arguments[1], arguments[2]));
              break;
            default:
              z.push(this._all[V].apply(this, arguments));
          }
      if (b ? (N = [], ee.call(this, N, p, this.listenerTree, 0)) : N = this._events[h], typeof N == "function")
        switch (this.event = h, D) {
          case 1:
            z.push(N.call(this));
            break;
          case 2:
            z.push(N.call(this, arguments[1]));
            break;
          case 3:
            z.push(N.call(this, arguments[1], arguments[2]));
            break;
          default:
            for (a = new Array(D - 1), Y = 1; Y < D; Y++)
              a[Y - 1] = arguments[Y];
            z.push(N.apply(this, a));
        }
      else if (N && N.length) {
        if (N = N.slice(), D > 3)
          for (a = new Array(D - 1), Y = 1; Y < D; Y++)
            a[Y - 1] = arguments[Y];
        for (V = 0, T = N.length; V < T; V++)
          switch (this.event = h, D) {
            case 1:
              z.push(N[V].call(this));
              break;
            case 2:
              z.push(N[V].call(this, arguments[1]));
              break;
            case 3:
              z.push(N[V].call(this, arguments[1], arguments[2]));
              break;
            default:
              z.push(N[V].apply(this, a));
          }
      } else if (!this.ignoreErrors && !this._all && h === "error")
        return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
      return Promise.all(z);
    }, t.prototype.on = function(h, b, p) {
      return this._on(h, b, !1, p);
    }, t.prototype.prependListener = function(h, b, p) {
      return this._on(h, b, !0, p);
    }, t.prototype.onAny = function(h) {
      return this._onAny(h, !1);
    }, t.prototype.prependAny = function(h) {
      return this._onAny(h, !0);
    }, t.prototype.addListener = t.prototype.on, t.prototype._onAny = function(h, b) {
      if (typeof h != "function")
        throw new Error("onAny only accepts instances of Function");
      return this._all || (this._all = []), b ? this._all.unshift(h) : this._all.push(h), this;
    }, t.prototype._on = function(h, b, p, w) {
      if (typeof h == "function")
        return this._onAny(h, b), this;
      if (typeof b != "function")
        throw new Error("on only accepts instances of Function");
      this._events || q.call(this);
      var a = this, T;
      return w !== B && (T = e.call(this, h, b, w), b = T[0], a = T[1]), this._newListener && this.emit("newListener", h, b), this.wildcard ? (ue.call(this, h, b, p), a) : (this._events[h] ? (typeof this._events[h] == "function" && (this._events[h] = [this._events[h]]), p ? this._events[h].unshift(b) : this._events[h].push(b), !this._events[h].warned && this._maxListeners > 0 && this._events[h].length > this._maxListeners && (this._events[h].warned = !0, I.call(this, this._events[h].length, h))) : this._events[h] = b, a);
    }, t.prototype.off = function(h, b) {
      if (typeof b != "function")
        throw new Error("removeListener only takes instances of Function");
      var p, w = [];
      if (this.wildcard) {
        var a = typeof h == "string" ? h.split(this.delimiter) : h.slice();
        if (w = ee.call(this, null, a, this.listenerTree, 0), !w)
          return this;
      } else {
        if (!this._events[h])
          return this;
        p = this._events[h], w.push({ _listeners: p });
      }
      for (var T = 0; T < w.length; T++) {
        var V = w[T];
        if (p = V._listeners, P(p)) {
          for (var Y = -1, z = 0, D = p.length; z < D; z++)
            if (p[z] === b || p[z].listener && p[z].listener === b || p[z]._origin && p[z]._origin === b) {
              Y = z;
              break;
            }
          if (Y < 0)
            continue;
          return this.wildcard ? V._listeners.splice(Y, 1) : this._events[h].splice(Y, 1), p.length === 0 && (this.wildcard ? delete V._listeners : delete this._events[h]), this._removeListener && this.emit("removeListener", h, b), this;
        } else
          (p === b || p.listener && p.listener === b || p._origin && p._origin === b) && (this.wildcard ? delete V._listeners : delete this._events[h], this._removeListener && this.emit("removeListener", h, b));
      }
      return this.listenerTree && E(this.listenerTree), this;
    }, t.prototype.offAny = function(h) {
      var b = 0, p = 0, w;
      if (h && this._all && this._all.length > 0) {
        for (w = this._all, b = 0, p = w.length; b < p; b++)
          if (h === w[b])
            return w.splice(b, 1), this._removeListener && this.emit("removeListenerAny", h), this;
      } else {
        if (w = this._all, this._removeListener)
          for (b = 0, p = w.length; b < p; b++)
            this.emit("removeListenerAny", w[b]);
        this._all = [];
      }
      return this;
    }, t.prototype.removeListener = t.prototype.off, t.prototype.removeAllListeners = function(h) {
      if (h === B)
        return !this._events || q.call(this), this;
      if (this.wildcard) {
        var b = ee.call(this, null, h, this.listenerTree, 0), p, w;
        if (!b)
          return this;
        for (w = 0; w < b.length; w++)
          p = b[w], p._listeners = null;
        this.listenerTree && E(this.listenerTree);
      } else
        this._events && (this._events[h] = null);
      return this;
    }, t.prototype.listeners = function(h) {
      var b = this._events, p, w, a, T, V;
      if (h === B) {
        if (this.wildcard)
          throw Error("event name required for wildcard emitter");
        if (!b)
          return [];
        for (p = y(b), T = p.length, a = []; T-- > 0; )
          w = b[p[T]], typeof w == "function" ? a.push(w) : a.push.apply(a, w);
        return a;
      } else {
        if (this.wildcard) {
          if (V = this.listenerTree, !V)
            return [];
          var Y = [], z = typeof h == "string" ? h.split(this.delimiter) : h.slice();
          return ee.call(this, Y, z, V, 0), Y;
        }
        return b ? (w = b[h], w ? typeof w == "function" ? [w] : w : []) : [];
      }
    }, t.prototype.eventNames = function(h) {
      var b = this._events;
      return this.wildcard ? U.call(this, this.listenerTree, [], null, h) : b ? y(b) : [];
    }, t.prototype.listenerCount = function(h) {
      return this.listeners(h).length;
    }, t.prototype.hasListeners = function(h) {
      if (this.wildcard) {
        var b = [], p = typeof h == "string" ? h.split(this.delimiter) : h.slice();
        return ee.call(this, b, p, this.listenerTree, 0), b.length > 0;
      }
      var w = this._events, a = this._all;
      return !!(a && a.length || w && (h === B ? y(w).length : w[h]));
    }, t.prototype.listenersAny = function() {
      return this._all ? this._all : [];
    }, t.prototype.waitFor = function(h, b) {
      var p = this, w = typeof b;
      return w === "number" ? b = { timeout: b } : w === "function" && (b = { filter: b }), b = L(b, {
        timeout: 0,
        filter: B,
        handleError: !1,
        Promise,
        overload: !1
      }, {
        filter: J,
        Promise: H
      }), ie(b.Promise, function(a, T, V) {
        function Y() {
          var z = b.filter;
          if (!(z && !z.apply(p, arguments)))
            if (p.off(h, Y), b.handleError) {
              var D = arguments[0];
              D ? T(D) : a(k.apply(null, arguments).slice(1));
            } else
              a(k.apply(null, arguments));
        }
        V(function() {
          p.off(h, Y);
        }), p._on(h, Y, !1);
      }, {
        timeout: b.timeout,
        overload: b.overload
      });
    };
    function v(h, b, p) {
      p = L(p, {
        Promise,
        timeout: 0,
        overload: !1
      }, {
        Promise: H
      });
      var w = p.Promise;
      return ie(w, function(a, T, V) {
        var Y;
        if (typeof h.addEventListener == "function") {
          Y = function() {
            a(k.apply(null, arguments));
          }, V(function() {
            h.removeEventListener(b, Y);
          }), h.addEventListener(
            b,
            Y,
            { once: !0 }
          );
          return;
        }
        var z = function() {
          D && h.removeListener("error", D), a(k.apply(null, arguments));
        }, D;
        b !== "error" && (D = function(N) {
          h.removeListener(b, z), T(N);
        }, h.once("error", D)), V(function() {
          D && h.removeListener("error", D), h.removeListener(b, z);
        }), h.once(b, z);
      }, {
        timeout: p.timeout,
        overload: p.overload
      });
    }
    var g = t.prototype;
    Object.defineProperties(t, {
      defaultMaxListeners: {
        get: function() {
          return g._maxListeners;
        },
        set: function(h) {
          if (typeof h != "number" || h < 0 || Number.isNaN(h))
            throw TypeError("n must be a non-negative number");
          g._maxListeners = h;
        },
        enumerable: !0
      },
      once: {
        value: v,
        writable: !0,
        configurable: !0
      }
    }), Object.defineProperties(g, {
      _maxListeners: {
        value: r,
        writable: !0,
        configurable: !0
      },
      _observers: { value: null, writable: !0, configurable: !0 }
    }), typeof B == "function" && B.amd ? B(function() {
      return t;
    }) : A.exports = t;
  })();
})(eventemitter2);
var eventemitter2Exports = eventemitter2.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter2Exports);
class FetchAPI extends EventEmitter {
  constructor(_) {
    super(), this.baseUrl = _;
  }
  async send(_, B) {
    const { url: M, query: P, method: r, data: S, headers: d } = _, [x, m] = S instanceof FormData ? [S, {}] : [
      typeof S != "string" ? JSON.stringify(S) : S,
      {
        "Content-Type": "application/json"
      }
    ], f = this.baseUrl + M, y = this.getUrlWithParams(f, P), q = await fetch(y, {
      method: r,
      headers: Object.assign(d || {}, m),
      body: x,
      credentials: _.withCredentials ? "include" : "same-origin"
    }), R = await q.json(), I = this.convertHeadersToPlainObject(q.headers);
    return new APIResponse({
      data: R,
      status: q.status,
      headers: I,
      request: _
    });
  }
  getUrlWithParams(_, B) {
    if (!B)
      return _;
    const M = new URL(_);
    return Object.entries(B).forEach(
      ([P, r]) => {
        M.searchParams.append(P, r);
      }
    ), M.toString();
  }
  convertHeadersToPlainObject(_) {
    const B = {};
    for (const M of Object.keys(_))
      B[M] = _.get(M);
    return B;
  }
  // type override 를 위해서 구현 class 에서 메서드들을 재정의 해줘야함..
  addListener(_, B) {
    return super.addListener(_, B);
  }
  on(_, B, M) {
    return super.on(_, B, M);
  }
  prependListener(_, B, M) {
    return super.prependListener(_, B, M);
  }
  once(_, B, M) {
    return super.once(_, B, M);
  }
  emit(_, ...B) {
    return super.emit(_, ...B);
  }
  emitAsync(_, ...B) {
    return super.emitAsync(_, ...B);
  }
}
function commonjsRequire(A) {
  throw new Error('Could not dynamically require "' + A + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var bcrypt$1 = { exports: {} }, cryptoBrowserify = {}, browser$b = { exports: {} }, safeBuffer$1 = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer$1;
function requireSafeBuffer$1() {
  return hasRequiredSafeBuffer$1 || (hasRequiredSafeBuffer$1 = 1, function(A, _) {
    var B = requireBuffer$1(), M = B.Buffer;
    function P(S, d) {
      for (var x in S)
        d[x] = S[x];
    }
    M.from && M.alloc && M.allocUnsafe && M.allocUnsafeSlow ? A.exports = B : (P(B, _), _.Buffer = r);
    function r(S, d, x) {
      return M(S, d, x);
    }
    r.prototype = Object.create(M.prototype), P(M, r), r.from = function(S, d, x) {
      if (typeof S == "number")
        throw new TypeError("Argument must not be a number");
      return M(S, d, x);
    }, r.alloc = function(S, d, x) {
      if (typeof S != "number")
        throw new TypeError("Argument must be a number");
      var m = M(S);
      return d !== void 0 ? typeof x == "string" ? m.fill(d, x) : m.fill(d) : m.fill(0), m;
    }, r.allocUnsafe = function(S) {
      if (typeof S != "number")
        throw new TypeError("Argument must be a number");
      return M(S);
    }, r.allocUnsafeSlow = function(S) {
      if (typeof S != "number")
        throw new TypeError("Argument must be a number");
      return B.SlowBuffer(S);
    };
  }(safeBuffer$1, safeBuffer$1.exports)), safeBuffer$1.exports;
}
var hasRequiredBrowser$b;
function requireBrowser$b() {
  if (hasRequiredBrowser$b)
    return browser$b.exports;
  hasRequiredBrowser$b = 1;
  var A = 65536, _ = 4294967295;
  function B() {
    throw new Error(`Secure random number generation is not supported by this browser.
Use Chrome, Firefox or Internet Explorer 11`);
  }
  var M = requireSafeBuffer$1().Buffer, P = commonjsGlobal.crypto || commonjsGlobal.msCrypto;
  P && P.getRandomValues ? browser$b.exports = r : browser$b.exports = B;
  function r(S, d) {
    if (S > _)
      throw new RangeError("requested too many random bytes");
    var x = M.allocUnsafe(S);
    if (S > 0)
      if (S > A)
        for (var m = 0; m < S; m += A)
          P.getRandomValues(x.slice(m, m + A));
      else
        P.getRandomValues(x);
    return typeof d == "function" ? process$1.nextTick(function() {
      d(null, x);
    }) : x;
  }
  return browser$b.exports;
}
var inherits_browser = { exports: {} }, hasRequiredInherits_browser;
function requireInherits_browser() {
  return hasRequiredInherits_browser || (hasRequiredInherits_browser = 1, typeof Object.create == "function" ? inherits_browser.exports = function(_, B) {
    B && (_.super_ = B, _.prototype = Object.create(B.prototype, {
      constructor: {
        value: _,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }));
  } : inherits_browser.exports = function(_, B) {
    if (B) {
      _.super_ = B;
      var M = function() {
      };
      M.prototype = B.prototype, _.prototype = new M(), _.prototype.constructor = _;
    }
  }), inherits_browser.exports;
}
var readableBrowser$1 = { exports: {} }, events = { exports: {} }, hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents)
    return events.exports;
  hasRequiredEvents = 1;
  var A = typeof Reflect == "object" ? Reflect : null, _ = A && typeof A.apply == "function" ? A.apply : function(J, X, ie) {
    return Function.prototype.apply.call(J, X, ie);
  }, B;
  A && typeof A.ownKeys == "function" ? B = A.ownKeys : Object.getOwnPropertySymbols ? B = function(J) {
    return Object.getOwnPropertyNames(J).concat(Object.getOwnPropertySymbols(J));
  } : B = function(J) {
    return Object.getOwnPropertyNames(J);
  };
  function M(j) {
    console && console.warn && console.warn(j);
  }
  var P = Number.isNaN || function(J) {
    return J !== J;
  };
  function r() {
    r.init.call(this);
  }
  events.exports = r, events.exports.once = C, r.EventEmitter = r, r.prototype._events = void 0, r.prototype._eventsCount = 0, r.prototype._maxListeners = void 0;
  var S = 10;
  function d(j) {
    if (typeof j != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof j);
  }
  Object.defineProperty(r, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return S;
    },
    set: function(j) {
      if (typeof j != "number" || j < 0 || P(j))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + j + ".");
      S = j;
    }
  }), r.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, r.prototype.setMaxListeners = function(J) {
    if (typeof J != "number" || J < 0 || P(J))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + J + ".");
    return this._maxListeners = J, this;
  };
  function x(j) {
    return j._maxListeners === void 0 ? r.defaultMaxListeners : j._maxListeners;
  }
  r.prototype.getMaxListeners = function() {
    return x(this);
  }, r.prototype.emit = function(J) {
    for (var X = [], ie = 1; ie < arguments.length; ie++)
      X.push(arguments[ie]);
    var ne = J === "error", ee = this._events;
    if (ee !== void 0)
      ne = ne && ee.error === void 0;
    else if (!ne)
      return !1;
    if (ne) {
      var ue;
      if (X.length > 0 && (ue = X[0]), ue instanceof Error)
        throw ue;
      var U = new Error("Unhandled error." + (ue ? " (" + ue.message + ")" : ""));
      throw U.context = ue, U;
    }
    var E = ee[J];
    if (E === void 0)
      return !1;
    if (typeof E == "function")
      _(E, this, X);
    else
      for (var o = E.length, e = I(E, o), ie = 0; ie < o; ++ie)
        _(e[ie], this, X);
    return !0;
  };
  function m(j, J, X, ie) {
    var ne, ee, ue;
    if (d(X), ee = j._events, ee === void 0 ? (ee = j._events = /* @__PURE__ */ Object.create(null), j._eventsCount = 0) : (ee.newListener !== void 0 && (j.emit(
      "newListener",
      J,
      X.listener ? X.listener : X
    ), ee = j._events), ue = ee[J]), ue === void 0)
      ue = ee[J] = X, ++j._eventsCount;
    else if (typeof ue == "function" ? ue = ee[J] = ie ? [X, ue] : [ue, X] : ie ? ue.unshift(X) : ue.push(X), ne = x(j), ne > 0 && ue.length > ne && !ue.warned) {
      ue.warned = !0;
      var U = new Error("Possible EventEmitter memory leak detected. " + ue.length + " " + String(J) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      U.name = "MaxListenersExceededWarning", U.emitter = j, U.type = J, U.count = ue.length, M(U);
    }
    return j;
  }
  r.prototype.addListener = function(J, X) {
    return m(this, J, X, !1);
  }, r.prototype.on = r.prototype.addListener, r.prototype.prependListener = function(J, X) {
    return m(this, J, X, !0);
  };
  function f() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function y(j, J, X) {
    var ie = { fired: !1, wrapFn: void 0, target: j, type: J, listener: X }, ne = f.bind(ie);
    return ne.listener = X, ie.wrapFn = ne, ne;
  }
  r.prototype.once = function(J, X) {
    return d(X), this.on(J, y(this, J, X)), this;
  }, r.prototype.prependOnceListener = function(J, X) {
    return d(X), this.prependListener(J, y(this, J, X)), this;
  }, r.prototype.removeListener = function(J, X) {
    var ie, ne, ee, ue, U;
    if (d(X), ne = this._events, ne === void 0)
      return this;
    if (ie = ne[J], ie === void 0)
      return this;
    if (ie === X || ie.listener === X)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete ne[J], ne.removeListener && this.emit("removeListener", J, ie.listener || X));
    else if (typeof ie != "function") {
      for (ee = -1, ue = ie.length - 1; ue >= 0; ue--)
        if (ie[ue] === X || ie[ue].listener === X) {
          U = ie[ue].listener, ee = ue;
          break;
        }
      if (ee < 0)
        return this;
      ee === 0 ? ie.shift() : k(ie, ee), ie.length === 1 && (ne[J] = ie[0]), ne.removeListener !== void 0 && this.emit("removeListener", J, U || X);
    }
    return this;
  }, r.prototype.off = r.prototype.removeListener, r.prototype.removeAllListeners = function(J) {
    var X, ie, ne;
    if (ie = this._events, ie === void 0)
      return this;
    if (ie.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : ie[J] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete ie[J]), this;
    if (arguments.length === 0) {
      var ee = Object.keys(ie), ue;
      for (ne = 0; ne < ee.length; ++ne)
        ue = ee[ne], ue !== "removeListener" && this.removeAllListeners(ue);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (X = ie[J], typeof X == "function")
      this.removeListener(J, X);
    else if (X !== void 0)
      for (ne = X.length - 1; ne >= 0; ne--)
        this.removeListener(J, X[ne]);
    return this;
  };
  function q(j, J, X) {
    var ie = j._events;
    if (ie === void 0)
      return [];
    var ne = ie[J];
    return ne === void 0 ? [] : typeof ne == "function" ? X ? [ne.listener || ne] : [ne] : X ? $(ne) : I(ne, ne.length);
  }
  r.prototype.listeners = function(J) {
    return q(this, J, !0);
  }, r.prototype.rawListeners = function(J) {
    return q(this, J, !1);
  }, r.listenerCount = function(j, J) {
    return typeof j.listenerCount == "function" ? j.listenerCount(J) : R.call(j, J);
  }, r.prototype.listenerCount = R;
  function R(j) {
    var J = this._events;
    if (J !== void 0) {
      var X = J[j];
      if (typeof X == "function")
        return 1;
      if (X !== void 0)
        return X.length;
    }
    return 0;
  }
  r.prototype.eventNames = function() {
    return this._eventsCount > 0 ? B(this._events) : [];
  };
  function I(j, J) {
    for (var X = new Array(J), ie = 0; ie < J; ++ie)
      X[ie] = j[ie];
    return X;
  }
  function k(j, J) {
    for (; J + 1 < j.length; J++)
      j[J] = j[J + 1];
    j.pop();
  }
  function $(j) {
    for (var J = new Array(j.length), X = 0; X < J.length; ++X)
      J[X] = j[X].listener || j[X];
    return J;
  }
  function C(j, J) {
    return new Promise(function(X, ie) {
      function ne(ue) {
        j.removeListener(J, ee), ie(ue);
      }
      function ee() {
        typeof j.removeListener == "function" && j.removeListener("error", ne), X([].slice.call(arguments));
      }
      H(j, J, ee, { once: !0 }), J !== "error" && L(j, ne, { once: !0 });
    });
  }
  function L(j, J, X) {
    typeof j.on == "function" && H(j, "error", J, X);
  }
  function H(j, J, X, ie) {
    if (typeof j.on == "function")
      ie.once ? j.once(J, X) : j.on(J, X);
    else if (typeof j.addEventListener == "function")
      j.addEventListener(J, function ne(ee) {
        ie.once && j.removeEventListener(J, ne), X(ee);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof j);
  }
  return events.exports;
}
var streamBrowser$1, hasRequiredStreamBrowser$1;
function requireStreamBrowser$1() {
  return hasRequiredStreamBrowser$1 || (hasRequiredStreamBrowser$1 = 1, streamBrowser$1 = requireEvents().EventEmitter), streamBrowser$1;
}
var util$1 = {}, types = {}, shams$1, hasRequiredShams$1;
function requireShams$1() {
  return hasRequiredShams$1 || (hasRequiredShams$1 = 1, shams$1 = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var _ = {}, B = Symbol("test"), M = Object(B);
    if (typeof B == "string" || Object.prototype.toString.call(B) !== "[object Symbol]" || Object.prototype.toString.call(M) !== "[object Symbol]")
      return !1;
    var P = 42;
    _[B] = P;
    for (B in _)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(_).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(_).length !== 0)
      return !1;
    var r = Object.getOwnPropertySymbols(_);
    if (r.length !== 1 || r[0] !== B || !Object.prototype.propertyIsEnumerable.call(_, B))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var S = Object.getOwnPropertyDescriptor(_, B);
      if (S.value !== P || S.enumerable !== !0)
        return !1;
    }
    return !0;
  }), shams$1;
}
var shams, hasRequiredShams;
function requireShams() {
  if (hasRequiredShams)
    return shams;
  hasRequiredShams = 1;
  var A = requireShams$1();
  return shams = function() {
    return A() && !!Symbol.toStringTag;
  }, shams;
}
var esErrors, hasRequiredEsErrors;
function requireEsErrors() {
  return hasRequiredEsErrors || (hasRequiredEsErrors = 1, esErrors = Error), esErrors;
}
var _eval, hasRequired_eval;
function require_eval() {
  return hasRequired_eval || (hasRequired_eval = 1, _eval = EvalError), _eval;
}
var range, hasRequiredRange;
function requireRange() {
  return hasRequiredRange || (hasRequiredRange = 1, range = RangeError), range;
}
var ref, hasRequiredRef;
function requireRef() {
  return hasRequiredRef || (hasRequiredRef = 1, ref = ReferenceError), ref;
}
var syntax, hasRequiredSyntax;
function requireSyntax() {
  return hasRequiredSyntax || (hasRequiredSyntax = 1, syntax = SyntaxError), syntax;
}
var type, hasRequiredType;
function requireType() {
  return hasRequiredType || (hasRequiredType = 1, type = TypeError), type;
}
var uri, hasRequiredUri;
function requireUri() {
  return hasRequiredUri || (hasRequiredUri = 1, uri = URIError), uri;
}
var hasSymbols, hasRequiredHasSymbols;
function requireHasSymbols() {
  if (hasRequiredHasSymbols)
    return hasSymbols;
  hasRequiredHasSymbols = 1;
  var A = typeof Symbol < "u" && Symbol, _ = requireShams$1();
  return hasSymbols = function() {
    return typeof A != "function" || typeof Symbol != "function" || typeof A("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : _();
  }, hasSymbols;
}
var hasProto, hasRequiredHasProto;
function requireHasProto() {
  if (hasRequiredHasProto)
    return hasProto;
  hasRequiredHasProto = 1;
  var A = {
    __proto__: null,
    foo: {}
  }, _ = Object;
  return hasProto = function() {
    return { __proto__: A }.foo === A.foo && !(A instanceof _);
  }, hasProto;
}
var implementation, hasRequiredImplementation;
function requireImplementation() {
  if (hasRequiredImplementation)
    return implementation;
  hasRequiredImplementation = 1;
  var A = "Function.prototype.bind called on incompatible ", _ = Object.prototype.toString, B = Math.max, M = "[object Function]", P = function(x, m) {
    for (var f = [], y = 0; y < x.length; y += 1)
      f[y] = x[y];
    for (var q = 0; q < m.length; q += 1)
      f[q + x.length] = m[q];
    return f;
  }, r = function(x, m) {
    for (var f = [], y = m || 0, q = 0; y < x.length; y += 1, q += 1)
      f[q] = x[y];
    return f;
  }, S = function(d, x) {
    for (var m = "", f = 0; f < d.length; f += 1)
      m += d[f], f + 1 < d.length && (m += x);
    return m;
  };
  return implementation = function(x) {
    var m = this;
    if (typeof m != "function" || _.apply(m) !== M)
      throw new TypeError(A + m);
    for (var f = r(arguments, 1), y, q = function() {
      if (this instanceof y) {
        var C = m.apply(
          this,
          P(f, arguments)
        );
        return Object(C) === C ? C : this;
      }
      return m.apply(
        x,
        P(f, arguments)
      );
    }, R = B(0, m.length - f.length), I = [], k = 0; k < R; k++)
      I[k] = "$" + k;
    if (y = Function("binder", "return function (" + S(I, ",") + "){ return binder.apply(this,arguments); }")(q), m.prototype) {
      var $ = function() {
      };
      $.prototype = m.prototype, y.prototype = new $(), $.prototype = null;
    }
    return y;
  }, implementation;
}
var functionBind, hasRequiredFunctionBind;
function requireFunctionBind() {
  if (hasRequiredFunctionBind)
    return functionBind;
  hasRequiredFunctionBind = 1;
  var A = requireImplementation();
  return functionBind = Function.prototype.bind || A, functionBind;
}
var hasown, hasRequiredHasown;
function requireHasown() {
  if (hasRequiredHasown)
    return hasown;
  hasRequiredHasown = 1;
  var A = Function.prototype.call, _ = Object.prototype.hasOwnProperty, B = requireFunctionBind();
  return hasown = B.call(A, _), hasown;
}
var getIntrinsic, hasRequiredGetIntrinsic;
function requireGetIntrinsic() {
  if (hasRequiredGetIntrinsic)
    return getIntrinsic;
  hasRequiredGetIntrinsic = 1;
  var A, _ = requireEsErrors(), B = require_eval(), M = requireRange(), P = requireRef(), r = requireSyntax(), S = requireType(), d = requireUri(), x = Function, m = function(g) {
    try {
      return x('"use strict"; return (' + g + ").constructor;")();
    } catch {
    }
  }, f = Object.getOwnPropertyDescriptor;
  if (f)
    try {
      f({}, "");
    } catch {
      f = null;
    }
  var y = function() {
    throw new S();
  }, q = f ? function() {
    try {
      return arguments.callee, y;
    } catch {
      try {
        return f(arguments, "callee").get;
      } catch {
        return y;
      }
    }
  }() : y, R = requireHasSymbols()(), I = requireHasProto()(), k = Object.getPrototypeOf || (I ? function(g) {
    return g.__proto__;
  } : null), $ = {}, C = typeof Uint8Array > "u" || !k ? A : k(Uint8Array), L = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError > "u" ? A : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer > "u" ? A : ArrayBuffer,
    "%ArrayIteratorPrototype%": R && k ? k([][Symbol.iterator]()) : A,
    "%AsyncFromSyncIteratorPrototype%": A,
    "%AsyncFunction%": $,
    "%AsyncGenerator%": $,
    "%AsyncGeneratorFunction%": $,
    "%AsyncIteratorPrototype%": $,
    "%Atomics%": typeof Atomics > "u" ? A : Atomics,
    "%BigInt%": typeof BigInt > "u" ? A : BigInt,
    "%BigInt64Array%": typeof BigInt64Array > "u" ? A : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array > "u" ? A : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView > "u" ? A : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": _,
    "%eval%": eval,
    // eslint-disable-line no-eval
    "%EvalError%": B,
    "%Float32Array%": typeof Float32Array > "u" ? A : Float32Array,
    "%Float64Array%": typeof Float64Array > "u" ? A : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? A : FinalizationRegistry,
    "%Function%": x,
    "%GeneratorFunction%": $,
    "%Int8Array%": typeof Int8Array > "u" ? A : Int8Array,
    "%Int16Array%": typeof Int16Array > "u" ? A : Int16Array,
    "%Int32Array%": typeof Int32Array > "u" ? A : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": R && k ? k(k([][Symbol.iterator]())) : A,
    "%JSON%": typeof JSON == "object" ? JSON : A,
    "%Map%": typeof Map > "u" ? A : Map,
    "%MapIteratorPrototype%": typeof Map > "u" || !R || !k ? A : k((/* @__PURE__ */ new Map())[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise > "u" ? A : Promise,
    "%Proxy%": typeof Proxy > "u" ? A : Proxy,
    "%RangeError%": M,
    "%ReferenceError%": P,
    "%Reflect%": typeof Reflect > "u" ? A : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set > "u" ? A : Set,
    "%SetIteratorPrototype%": typeof Set > "u" || !R || !k ? A : k((/* @__PURE__ */ new Set())[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? A : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": R && k ? k(""[Symbol.iterator]()) : A,
    "%Symbol%": R ? Symbol : A,
    "%SyntaxError%": r,
    "%ThrowTypeError%": q,
    "%TypedArray%": C,
    "%TypeError%": S,
    "%Uint8Array%": typeof Uint8Array > "u" ? A : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? A : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array > "u" ? A : Uint16Array,
    "%Uint32Array%": typeof Uint32Array > "u" ? A : Uint32Array,
    "%URIError%": d,
    "%WeakMap%": typeof WeakMap > "u" ? A : WeakMap,
    "%WeakRef%": typeof WeakRef > "u" ? A : WeakRef,
    "%WeakSet%": typeof WeakSet > "u" ? A : WeakSet
  };
  if (k)
    try {
      null.error;
    } catch (g) {
      var H = k(k(g));
      L["%Error.prototype%"] = H;
    }
  var j = function g(h) {
    var b;
    if (h === "%AsyncFunction%")
      b = m("async function () {}");
    else if (h === "%GeneratorFunction%")
      b = m("function* () {}");
    else if (h === "%AsyncGeneratorFunction%")
      b = m("async function* () {}");
    else if (h === "%AsyncGenerator%") {
      var p = g("%AsyncGeneratorFunction%");
      p && (b = p.prototype);
    } else if (h === "%AsyncIteratorPrototype%") {
      var w = g("%AsyncGenerator%");
      w && k && (b = k(w.prototype));
    }
    return L[h] = b, b;
  }, J = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
  }, X = requireFunctionBind(), ie = requireHasown(), ne = X.call(Function.call, Array.prototype.concat), ee = X.call(Function.apply, Array.prototype.splice), ue = X.call(Function.call, String.prototype.replace), U = X.call(Function.call, String.prototype.slice), E = X.call(Function.call, RegExp.prototype.exec), o = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, e = /\\(\\)?/g, t = function(h) {
    var b = U(h, 0, 1), p = U(h, -1);
    if (b === "%" && p !== "%")
      throw new r("invalid intrinsic syntax, expected closing `%`");
    if (p === "%" && b !== "%")
      throw new r("invalid intrinsic syntax, expected opening `%`");
    var w = [];
    return ue(h, o, function(a, T, V, Y) {
      w[w.length] = V ? ue(Y, e, "$1") : T || a;
    }), w;
  }, v = function(h, b) {
    var p = h, w;
    if (ie(J, p) && (w = J[p], p = "%" + w[0] + "%"), ie(L, p)) {
      var a = L[p];
      if (a === $ && (a = j(p)), typeof a > "u" && !b)
        throw new S("intrinsic " + h + " exists, but is not available. Please file an issue!");
      return {
        alias: w,
        name: p,
        value: a
      };
    }
    throw new r("intrinsic " + h + " does not exist!");
  };
  return getIntrinsic = function(h, b) {
    if (typeof h != "string" || h.length === 0)
      throw new S("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof b != "boolean")
      throw new S('"allowMissing" argument must be a boolean');
    if (E(/^%?[^%]*%?$/, h) === null)
      throw new r("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var p = t(h), w = p.length > 0 ? p[0] : "", a = v("%" + w + "%", b), T = a.name, V = a.value, Y = !1, z = a.alias;
    z && (w = z[0], ee(p, ne([0, 1], z)));
    for (var D = 1, N = !0; D < p.length; D += 1) {
      var Q = p[D], te = U(Q, 0, 1), G = U(Q, -1);
      if ((te === '"' || te === "'" || te === "`" || G === '"' || G === "'" || G === "`") && te !== G)
        throw new r("property names with quotes must have matching quotes");
      if ((Q === "constructor" || !N) && (Y = !0), w += "." + Q, T = "%" + w + "%", ie(L, T))
        V = L[T];
      else if (V != null) {
        if (!(Q in V)) {
          if (!b)
            throw new S("base intrinsic for " + h + " exists, but the property is not available.");
          return;
        }
        if (f && D + 1 >= p.length) {
          var W = f(V, Q);
          N = !!W, N && "get" in W && !("originalValue" in W.get) ? V = W.get : V = V[Q];
        } else
          N = ie(V, Q), V = V[Q];
        N && !Y && (L[T] = V);
      }
    }
    return V;
  }, getIntrinsic;
}
var callBind = { exports: {} }, esDefineProperty, hasRequiredEsDefineProperty;
function requireEsDefineProperty() {
  if (hasRequiredEsDefineProperty)
    return esDefineProperty;
  hasRequiredEsDefineProperty = 1;
  var A = requireGetIntrinsic(), _ = A("%Object.defineProperty%", !0) || !1;
  if (_)
    try {
      _({}, "a", { value: 1 });
    } catch {
      _ = !1;
    }
  return esDefineProperty = _, esDefineProperty;
}
var gopd, hasRequiredGopd;
function requireGopd() {
  if (hasRequiredGopd)
    return gopd;
  hasRequiredGopd = 1;
  var A = requireGetIntrinsic(), _ = A("%Object.getOwnPropertyDescriptor%", !0);
  if (_)
    try {
      _([], "length");
    } catch {
      _ = null;
    }
  return gopd = _, gopd;
}
var defineDataProperty, hasRequiredDefineDataProperty;
function requireDefineDataProperty() {
  if (hasRequiredDefineDataProperty)
    return defineDataProperty;
  hasRequiredDefineDataProperty = 1;
  var A = requireEsDefineProperty(), _ = requireSyntax(), B = requireType(), M = requireGopd();
  return defineDataProperty = function(r, S, d) {
    if (!r || typeof r != "object" && typeof r != "function")
      throw new B("`obj` must be an object or a function`");
    if (typeof S != "string" && typeof S != "symbol")
      throw new B("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
      throw new B("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
      throw new B("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
      throw new B("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
      throw new B("`loose`, if provided, must be a boolean");
    var x = arguments.length > 3 ? arguments[3] : null, m = arguments.length > 4 ? arguments[4] : null, f = arguments.length > 5 ? arguments[5] : null, y = arguments.length > 6 ? arguments[6] : !1, q = !!M && M(r, S);
    if (A)
      A(r, S, {
        configurable: f === null && q ? q.configurable : !f,
        enumerable: x === null && q ? q.enumerable : !x,
        value: d,
        writable: m === null && q ? q.writable : !m
      });
    else if (y || !x && !m && !f)
      r[S] = d;
    else
      throw new _("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
  }, defineDataProperty;
}
var hasPropertyDescriptors_1, hasRequiredHasPropertyDescriptors;
function requireHasPropertyDescriptors() {
  if (hasRequiredHasPropertyDescriptors)
    return hasPropertyDescriptors_1;
  hasRequiredHasPropertyDescriptors = 1;
  var A = requireEsDefineProperty(), _ = function() {
    return !!A;
  };
  return _.hasArrayLengthDefineBug = function() {
    if (!A)
      return null;
    try {
      return A([], "length", { value: 1 }).length !== 1;
    } catch {
      return !0;
    }
  }, hasPropertyDescriptors_1 = _, hasPropertyDescriptors_1;
}
var setFunctionLength, hasRequiredSetFunctionLength;
function requireSetFunctionLength() {
  if (hasRequiredSetFunctionLength)
    return setFunctionLength;
  hasRequiredSetFunctionLength = 1;
  var A = requireGetIntrinsic(), _ = requireDefineDataProperty(), B = requireHasPropertyDescriptors()(), M = requireGopd(), P = requireType(), r = A("%Math.floor%");
  return setFunctionLength = function(d, x) {
    if (typeof d != "function")
      throw new P("`fn` is not a function");
    if (typeof x != "number" || x < 0 || x > 4294967295 || r(x) !== x)
      throw new P("`length` must be a positive 32-bit integer");
    var m = arguments.length > 2 && !!arguments[2], f = !0, y = !0;
    if ("length" in d && M) {
      var q = M(d, "length");
      q && !q.configurable && (f = !1), q && !q.writable && (y = !1);
    }
    return (f || y || !m) && (B ? _(
      /** @type {Parameters<define>[0]} */
      d,
      "length",
      x,
      !0,
      !0
    ) : _(
      /** @type {Parameters<define>[0]} */
      d,
      "length",
      x
    )), d;
  }, setFunctionLength;
}
var hasRequiredCallBind;
function requireCallBind() {
  return hasRequiredCallBind || (hasRequiredCallBind = 1, function(A) {
    var _ = requireFunctionBind(), B = requireGetIntrinsic(), M = requireSetFunctionLength(), P = requireType(), r = B("%Function.prototype.apply%"), S = B("%Function.prototype.call%"), d = B("%Reflect.apply%", !0) || _.call(S, r), x = requireEsDefineProperty(), m = B("%Math.max%");
    A.exports = function(q) {
      if (typeof q != "function")
        throw new P("a function is required");
      var R = d(_, S, arguments);
      return M(
        R,
        1 + m(0, q.length - (arguments.length - 1)),
        !0
      );
    };
    var f = function() {
      return d(_, r, arguments);
    };
    x ? x(A.exports, "apply", { value: f }) : A.exports.apply = f;
  }(callBind)), callBind.exports;
}
var callBound, hasRequiredCallBound;
function requireCallBound() {
  if (hasRequiredCallBound)
    return callBound;
  hasRequiredCallBound = 1;
  var A = requireGetIntrinsic(), _ = requireCallBind(), B = _(A("String.prototype.indexOf"));
  return callBound = function(P, r) {
    var S = A(P, !!r);
    return typeof S == "function" && B(P, ".prototype.") > -1 ? _(S) : S;
  }, callBound;
}
var isArguments, hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments)
    return isArguments;
  hasRequiredIsArguments = 1;
  var A = requireShams()(), _ = requireCallBound(), B = _("Object.prototype.toString"), M = function(d) {
    return A && d && typeof d == "object" && Symbol.toStringTag in d ? !1 : B(d) === "[object Arguments]";
  }, P = function(d) {
    return M(d) ? !0 : d !== null && typeof d == "object" && typeof d.length == "number" && d.length >= 0 && B(d) !== "[object Array]" && B(d.callee) === "[object Function]";
  }, r = function() {
    return M(arguments);
  }();
  return M.isLegacyArguments = P, isArguments = r ? M : P, isArguments;
}
var isGeneratorFunction, hasRequiredIsGeneratorFunction;
function requireIsGeneratorFunction() {
  if (hasRequiredIsGeneratorFunction)
    return isGeneratorFunction;
  hasRequiredIsGeneratorFunction = 1;
  var A = Object.prototype.toString, _ = Function.prototype.toString, B = /^\s*(?:function)?\*/, M = requireShams()(), P = Object.getPrototypeOf, r = function() {
    if (!M)
      return !1;
    try {
      return Function("return function*() {}")();
    } catch {
    }
  }, S;
  return isGeneratorFunction = function(x) {
    if (typeof x != "function")
      return !1;
    if (B.test(_.call(x)))
      return !0;
    if (!M) {
      var m = A.call(x);
      return m === "[object GeneratorFunction]";
    }
    if (!P)
      return !1;
    if (typeof S > "u") {
      var f = r();
      S = f ? P(f) : !1;
    }
    return P(x) === S;
  }, isGeneratorFunction;
}
var isCallable, hasRequiredIsCallable;
function requireIsCallable() {
  if (hasRequiredIsCallable)
    return isCallable;
  hasRequiredIsCallable = 1;
  var A = Function.prototype.toString, _ = typeof Reflect == "object" && Reflect !== null && Reflect.apply, B, M;
  if (typeof _ == "function" && typeof Object.defineProperty == "function")
    try {
      B = Object.defineProperty({}, "length", {
        get: function() {
          throw M;
        }
      }), M = {}, _(function() {
        throw 42;
      }, null, B);
    } catch (L) {
      L !== M && (_ = null);
    }
  else
    _ = null;
  var P = /^\s*class\b/, r = function(H) {
    try {
      var j = A.call(H);
      return P.test(j);
    } catch {
      return !1;
    }
  }, S = function(H) {
    try {
      return r(H) ? !1 : (A.call(H), !0);
    } catch {
      return !1;
    }
  }, d = Object.prototype.toString, x = "[object Object]", m = "[object Function]", f = "[object GeneratorFunction]", y = "[object HTMLAllCollection]", q = "[object HTML document.all class]", R = "[object HTMLCollection]", I = typeof Symbol == "function" && !!Symbol.toStringTag, k = !(0 in [,]), $ = function() {
    return !1;
  };
  if (typeof document == "object") {
    var C = document.all;
    d.call(C) === d.call(document.all) && ($ = function(H) {
      if ((k || !H) && (typeof H > "u" || typeof H == "object"))
        try {
          var j = d.call(H);
          return (j === y || j === q || j === R || j === x) && H("") == null;
        } catch {
        }
      return !1;
    });
  }
  return isCallable = _ ? function(H) {
    if ($(H))
      return !0;
    if (!H || typeof H != "function" && typeof H != "object")
      return !1;
    try {
      _(H, null, B);
    } catch (j) {
      if (j !== M)
        return !1;
    }
    return !r(H) && S(H);
  } : function(H) {
    if ($(H))
      return !0;
    if (!H || typeof H != "function" && typeof H != "object")
      return !1;
    if (I)
      return S(H);
    if (r(H))
      return !1;
    var j = d.call(H);
    return j !== m && j !== f && !/^\[object HTML/.test(j) ? !1 : S(H);
  }, isCallable;
}
var forEach_1, hasRequiredForEach;
function requireForEach() {
  if (hasRequiredForEach)
    return forEach_1;
  hasRequiredForEach = 1;
  var A = requireIsCallable(), _ = Object.prototype.toString, B = Object.prototype.hasOwnProperty, M = function(x, m, f) {
    for (var y = 0, q = x.length; y < q; y++)
      B.call(x, y) && (f == null ? m(x[y], y, x) : m.call(f, x[y], y, x));
  }, P = function(x, m, f) {
    for (var y = 0, q = x.length; y < q; y++)
      f == null ? m(x.charAt(y), y, x) : m.call(f, x.charAt(y), y, x);
  }, r = function(x, m, f) {
    for (var y in x)
      B.call(x, y) && (f == null ? m(x[y], y, x) : m.call(f, x[y], y, x));
  }, S = function(x, m, f) {
    if (!A(m))
      throw new TypeError("iterator must be a function");
    var y;
    arguments.length >= 3 && (y = f), _.call(x) === "[object Array]" ? M(x, m, y) : typeof x == "string" ? P(x, m, y) : r(x, m, y);
  };
  return forEach_1 = S, forEach_1;
}
var possibleTypedArrayNames, hasRequiredPossibleTypedArrayNames;
function requirePossibleTypedArrayNames() {
  return hasRequiredPossibleTypedArrayNames || (hasRequiredPossibleTypedArrayNames = 1, possibleTypedArrayNames = [
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array"
  ]), possibleTypedArrayNames;
}
var availableTypedArrays, hasRequiredAvailableTypedArrays;
function requireAvailableTypedArrays() {
  if (hasRequiredAvailableTypedArrays)
    return availableTypedArrays;
  hasRequiredAvailableTypedArrays = 1;
  var A = requirePossibleTypedArrayNames(), _ = typeof globalThis > "u" ? commonjsGlobal : globalThis;
  return availableTypedArrays = function() {
    for (var M = [], P = 0; P < A.length; P++)
      typeof _[A[P]] == "function" && (M[M.length] = A[P]);
    return M;
  }, availableTypedArrays;
}
var whichTypedArray, hasRequiredWhichTypedArray;
function requireWhichTypedArray() {
  if (hasRequiredWhichTypedArray)
    return whichTypedArray;
  hasRequiredWhichTypedArray = 1;
  var A = requireForEach(), _ = requireAvailableTypedArrays(), B = requireCallBind(), M = requireCallBound(), P = requireGopd(), r = M("Object.prototype.toString"), S = requireShams()(), d = typeof globalThis > "u" ? commonjsGlobal : globalThis, x = _(), m = M("String.prototype.slice"), f = Object.getPrototypeOf, y = M("Array.prototype.indexOf", !0) || function($, C) {
    for (var L = 0; L < $.length; L += 1)
      if ($[L] === C)
        return L;
    return -1;
  }, q = { __proto__: null };
  S && P && f ? A(x, function(k) {
    var $ = new d[k]();
    if (Symbol.toStringTag in $) {
      var C = f($), L = P(C, Symbol.toStringTag);
      if (!L) {
        var H = f(C);
        L = P(H, Symbol.toStringTag);
      }
      q["$" + k] = B(L.get);
    }
  }) : A(x, function(k) {
    var $ = new d[k](), C = $.slice || $.set;
    C && (q["$" + k] = B(C));
  });
  var R = function($) {
    var C = !1;
    return A(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      q,
      /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */
      function(L, H) {
        if (!C)
          try {
            "$" + L($) === H && (C = m(H, 1));
          } catch {
          }
      }
    ), C;
  }, I = function($) {
    var C = !1;
    return A(
      // eslint-disable-next-line no-extra-parens
      /** @type {Record<`\$${TypedArrayName}`, Getter>} */
      /** @type {any} */
      q,
      /** @type {(getter: typeof cache, name: `\$${import('.').TypedArrayName}`) => void} */
      function(L, H) {
        if (!C)
          try {
            L($), C = m(H, 1);
          } catch {
          }
      }
    ), C;
  };
  return whichTypedArray = function($) {
    if (!$ || typeof $ != "object")
      return !1;
    if (!S) {
      var C = m(r($), 8, -1);
      return y(x, C) > -1 ? C : C !== "Object" ? !1 : I($);
    }
    return P ? R($) : null;
  }, whichTypedArray;
}
var isTypedArray, hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray)
    return isTypedArray;
  hasRequiredIsTypedArray = 1;
  var A = requireWhichTypedArray();
  return isTypedArray = function(B) {
    return !!A(B);
  }, isTypedArray;
}
var hasRequiredTypes;
function requireTypes() {
  return hasRequiredTypes || (hasRequiredTypes = 1, function(A) {
    var _ = requireIsArguments(), B = requireIsGeneratorFunction(), M = requireWhichTypedArray(), P = requireIsTypedArray();
    function r(K) {
      return K.call.bind(K);
    }
    var S = typeof BigInt < "u", d = typeof Symbol < "u", x = r(Object.prototype.toString), m = r(Number.prototype.valueOf), f = r(String.prototype.valueOf), y = r(Boolean.prototype.valueOf);
    if (S)
      var q = r(BigInt.prototype.valueOf);
    if (d)
      var R = r(Symbol.prototype.valueOf);
    function I(K, re) {
      if (typeof K != "object")
        return !1;
      try {
        return re(K), !0;
      } catch {
        return !1;
      }
    }
    A.isArgumentsObject = _, A.isGeneratorFunction = B, A.isTypedArray = P;
    function k(K) {
      return typeof Promise < "u" && K instanceof Promise || K !== null && typeof K == "object" && typeof K.then == "function" && typeof K.catch == "function";
    }
    A.isPromise = k;
    function $(K) {
      return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? ArrayBuffer.isView(K) : P(K) || T(K);
    }
    A.isArrayBufferView = $;
    function C(K) {
      return M(K) === "Uint8Array";
    }
    A.isUint8Array = C;
    function L(K) {
      return M(K) === "Uint8ClampedArray";
    }
    A.isUint8ClampedArray = L;
    function H(K) {
      return M(K) === "Uint16Array";
    }
    A.isUint16Array = H;
    function j(K) {
      return M(K) === "Uint32Array";
    }
    A.isUint32Array = j;
    function J(K) {
      return M(K) === "Int8Array";
    }
    A.isInt8Array = J;
    function X(K) {
      return M(K) === "Int16Array";
    }
    A.isInt16Array = X;
    function ie(K) {
      return M(K) === "Int32Array";
    }
    A.isInt32Array = ie;
    function ne(K) {
      return M(K) === "Float32Array";
    }
    A.isFloat32Array = ne;
    function ee(K) {
      return M(K) === "Float64Array";
    }
    A.isFloat64Array = ee;
    function ue(K) {
      return M(K) === "BigInt64Array";
    }
    A.isBigInt64Array = ue;
    function U(K) {
      return M(K) === "BigUint64Array";
    }
    A.isBigUint64Array = U;
    function E(K) {
      return x(K) === "[object Map]";
    }
    E.working = typeof Map < "u" && E(/* @__PURE__ */ new Map());
    function o(K) {
      return typeof Map > "u" ? !1 : E.working ? E(K) : K instanceof Map;
    }
    A.isMap = o;
    function e(K) {
      return x(K) === "[object Set]";
    }
    e.working = typeof Set < "u" && e(/* @__PURE__ */ new Set());
    function t(K) {
      return typeof Set > "u" ? !1 : e.working ? e(K) : K instanceof Set;
    }
    A.isSet = t;
    function v(K) {
      return x(K) === "[object WeakMap]";
    }
    v.working = typeof WeakMap < "u" && v(/* @__PURE__ */ new WeakMap());
    function g(K) {
      return typeof WeakMap > "u" ? !1 : v.working ? v(K) : K instanceof WeakMap;
    }
    A.isWeakMap = g;
    function h(K) {
      return x(K) === "[object WeakSet]";
    }
    h.working = typeof WeakSet < "u" && h(/* @__PURE__ */ new WeakSet());
    function b(K) {
      return h(K);
    }
    A.isWeakSet = b;
    function p(K) {
      return x(K) === "[object ArrayBuffer]";
    }
    p.working = typeof ArrayBuffer < "u" && p(new ArrayBuffer());
    function w(K) {
      return typeof ArrayBuffer > "u" ? !1 : p.working ? p(K) : K instanceof ArrayBuffer;
    }
    A.isArrayBuffer = w;
    function a(K) {
      return x(K) === "[object DataView]";
    }
    a.working = typeof ArrayBuffer < "u" && typeof DataView < "u" && a(new DataView(new ArrayBuffer(1), 0, 1));
    function T(K) {
      return typeof DataView > "u" ? !1 : a.working ? a(K) : K instanceof DataView;
    }
    A.isDataView = T;
    var V = typeof SharedArrayBuffer < "u" ? SharedArrayBuffer : void 0;
    function Y(K) {
      return x(K) === "[object SharedArrayBuffer]";
    }
    function z(K) {
      return typeof V > "u" ? !1 : (typeof Y.working > "u" && (Y.working = Y(new V())), Y.working ? Y(K) : K instanceof V);
    }
    A.isSharedArrayBuffer = z;
    function D(K) {
      return x(K) === "[object AsyncFunction]";
    }
    A.isAsyncFunction = D;
    function N(K) {
      return x(K) === "[object Map Iterator]";
    }
    A.isMapIterator = N;
    function Q(K) {
      return x(K) === "[object Set Iterator]";
    }
    A.isSetIterator = Q;
    function te(K) {
      return x(K) === "[object Generator]";
    }
    A.isGeneratorObject = te;
    function G(K) {
      return x(K) === "[object WebAssembly.Module]";
    }
    A.isWebAssemblyCompiledModule = G;
    function W(K) {
      return I(K, m);
    }
    A.isNumberObject = W;
    function ae(K) {
      return I(K, f);
    }
    A.isStringObject = ae;
    function se(K) {
      return I(K, y);
    }
    A.isBooleanObject = se;
    function he(K) {
      return S && I(K, q);
    }
    A.isBigIntObject = he;
    function Z(K) {
      return d && I(K, R);
    }
    A.isSymbolObject = Z;
    function O(K) {
      return W(K) || ae(K) || se(K) || he(K) || Z(K);
    }
    A.isBoxedPrimitive = O;
    function F(K) {
      return typeof Uint8Array < "u" && (w(K) || z(K));
    }
    A.isAnyArrayBuffer = F, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(K) {
      Object.defineProperty(A, K, {
        enumerable: !1,
        value: function() {
          throw new Error(K + " is not supported in userland");
        }
      });
    });
  }(types)), types;
}
var isBufferBrowser, hasRequiredIsBufferBrowser;
function requireIsBufferBrowser() {
  return hasRequiredIsBufferBrowser || (hasRequiredIsBufferBrowser = 1, isBufferBrowser = function(_) {
    return _ && typeof _ == "object" && typeof _.copy == "function" && typeof _.fill == "function" && typeof _.readUInt8 == "function";
  }), isBufferBrowser;
}
var hasRequiredUtil$1;
function requireUtil$1() {
  return hasRequiredUtil$1 || (hasRequiredUtil$1 = 1, function(A) {
    var _ = Object.getOwnPropertyDescriptors || function(T) {
      for (var V = Object.keys(T), Y = {}, z = 0; z < V.length; z++)
        Y[V[z]] = Object.getOwnPropertyDescriptor(T, V[z]);
      return Y;
    }, B = /%[sdj%]/g;
    A.format = function(a) {
      if (!J(a)) {
        for (var T = [], V = 0; V < arguments.length; V++)
          T.push(S(arguments[V]));
        return T.join(" ");
      }
      for (var V = 1, Y = arguments, z = Y.length, D = String(a).replace(B, function(Q) {
        if (Q === "%%")
          return "%";
        if (V >= z)
          return Q;
        switch (Q) {
          case "%s":
            return String(Y[V++]);
          case "%d":
            return Number(Y[V++]);
          case "%j":
            try {
              return JSON.stringify(Y[V++]);
            } catch {
              return "[Circular]";
            }
          default:
            return Q;
        }
      }), N = Y[V]; V < z; N = Y[++V])
        L(N) || !ee(N) ? D += " " + N : D += " " + S(N);
      return D;
    }, A.deprecate = function(a, T) {
      if (typeof process$1 < "u" && process$1.noDeprecation === !0)
        return a;
      if (typeof process$1 > "u")
        return function() {
          return A.deprecate(a, T).apply(this, arguments);
        };
      var V = !1;
      function Y() {
        if (!V) {
          if (process$1.throwDeprecation)
            throw new Error(T);
          process$1.traceDeprecation ? console.trace(T) : console.error(T), V = !0;
        }
        return a.apply(this, arguments);
      }
      return Y;
    };
    var M = {}, P = /^$/;
    if (process$1.env.NODE_DEBUG) {
      var r = process$1.env.NODE_DEBUG;
      r = r.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), P = new RegExp("^" + r + "$", "i");
    }
    A.debuglog = function(a) {
      if (a = a.toUpperCase(), !M[a])
        if (P.test(a)) {
          var T = process$1.pid;
          M[a] = function() {
            var V = A.format.apply(A, arguments);
            console.error("%s %d: %s", a, T, V);
          };
        } else
          M[a] = function() {
          };
      return M[a];
    };
    function S(a, T) {
      var V = {
        seen: [],
        stylize: x
      };
      return arguments.length >= 3 && (V.depth = arguments[2]), arguments.length >= 4 && (V.colors = arguments[3]), C(T) ? V.showHidden = T : T && A._extend(V, T), ie(V.showHidden) && (V.showHidden = !1), ie(V.depth) && (V.depth = 2), ie(V.colors) && (V.colors = !1), ie(V.customInspect) && (V.customInspect = !0), V.colors && (V.stylize = d), f(V, a, V.depth);
    }
    A.inspect = S, S.colors = {
      bold: [1, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      white: [37, 39],
      grey: [90, 39],
      black: [30, 39],
      blue: [34, 39],
      cyan: [36, 39],
      green: [32, 39],
      magenta: [35, 39],
      red: [31, 39],
      yellow: [33, 39]
    }, S.styles = {
      special: "cyan",
      number: "yellow",
      boolean: "yellow",
      undefined: "grey",
      null: "bold",
      string: "green",
      date: "magenta",
      // "name": intentionally not styling
      regexp: "red"
    };
    function d(a, T) {
      var V = S.styles[T];
      return V ? "\x1B[" + S.colors[V][0] + "m" + a + "\x1B[" + S.colors[V][1] + "m" : a;
    }
    function x(a, T) {
      return a;
    }
    function m(a) {
      var T = {};
      return a.forEach(function(V, Y) {
        T[V] = !0;
      }), T;
    }
    function f(a, T, V) {
      if (a.customInspect && T && E(T.inspect) && // Filter out the util module, it's inspect function is special
      T.inspect !== A.inspect && // Also filter out any prototype objects using the circular check.
      !(T.constructor && T.constructor.prototype === T)) {
        var Y = T.inspect(V, a);
        return J(Y) || (Y = f(a, Y, V)), Y;
      }
      var z = y(a, T);
      if (z)
        return z;
      var D = Object.keys(T), N = m(D);
      if (a.showHidden && (D = Object.getOwnPropertyNames(T)), U(T) && (D.indexOf("message") >= 0 || D.indexOf("description") >= 0))
        return q(T);
      if (D.length === 0) {
        if (E(T)) {
          var Q = T.name ? ": " + T.name : "";
          return a.stylize("[Function" + Q + "]", "special");
        }
        if (ne(T))
          return a.stylize(RegExp.prototype.toString.call(T), "regexp");
        if (ue(T))
          return a.stylize(Date.prototype.toString.call(T), "date");
        if (U(T))
          return q(T);
      }
      var te = "", G = !1, W = ["{", "}"];
      if ($(T) && (G = !0, W = ["[", "]"]), E(T)) {
        var ae = T.name ? ": " + T.name : "";
        te = " [Function" + ae + "]";
      }
      if (ne(T) && (te = " " + RegExp.prototype.toString.call(T)), ue(T) && (te = " " + Date.prototype.toUTCString.call(T)), U(T) && (te = " " + q(T)), D.length === 0 && (!G || T.length == 0))
        return W[0] + te + W[1];
      if (V < 0)
        return ne(T) ? a.stylize(RegExp.prototype.toString.call(T), "regexp") : a.stylize("[Object]", "special");
      a.seen.push(T);
      var se;
      return G ? se = R(a, T, V, N, D) : se = D.map(function(he) {
        return I(a, T, V, N, he, G);
      }), a.seen.pop(), k(se, te, W);
    }
    function y(a, T) {
      if (ie(T))
        return a.stylize("undefined", "undefined");
      if (J(T)) {
        var V = "'" + JSON.stringify(T).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return a.stylize(V, "string");
      }
      if (j(T))
        return a.stylize("" + T, "number");
      if (C(T))
        return a.stylize("" + T, "boolean");
      if (L(T))
        return a.stylize("null", "null");
    }
    function q(a) {
      return "[" + Error.prototype.toString.call(a) + "]";
    }
    function R(a, T, V, Y, z) {
      for (var D = [], N = 0, Q = T.length; N < Q; ++N)
        h(T, String(N)) ? D.push(I(
          a,
          T,
          V,
          Y,
          String(N),
          !0
        )) : D.push("");
      return z.forEach(function(te) {
        te.match(/^\d+$/) || D.push(I(
          a,
          T,
          V,
          Y,
          te,
          !0
        ));
      }), D;
    }
    function I(a, T, V, Y, z, D) {
      var N, Q, te;
      if (te = Object.getOwnPropertyDescriptor(T, z) || { value: T[z] }, te.get ? te.set ? Q = a.stylize("[Getter/Setter]", "special") : Q = a.stylize("[Getter]", "special") : te.set && (Q = a.stylize("[Setter]", "special")), h(Y, z) || (N = "[" + z + "]"), Q || (a.seen.indexOf(te.value) < 0 ? (L(V) ? Q = f(a, te.value, null) : Q = f(a, te.value, V - 1), Q.indexOf(`
`) > -1 && (D ? Q = Q.split(`
`).map(function(G) {
        return "  " + G;
      }).join(`
`).slice(2) : Q = `
` + Q.split(`
`).map(function(G) {
        return "   " + G;
      }).join(`
`))) : Q = a.stylize("[Circular]", "special")), ie(N)) {
        if (D && z.match(/^\d+$/))
          return Q;
        N = JSON.stringify("" + z), N.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (N = N.slice(1, -1), N = a.stylize(N, "name")) : (N = N.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), N = a.stylize(N, "string"));
      }
      return N + ": " + Q;
    }
    function k(a, T, V) {
      var Y = a.reduce(function(z, D) {
        return D.indexOf(`
`) >= 0, z + D.replace(/\u001b\[\d\d?m/g, "").length + 1;
      }, 0);
      return Y > 60 ? V[0] + (T === "" ? "" : T + `
 `) + " " + a.join(`,
  `) + " " + V[1] : V[0] + T + " " + a.join(", ") + " " + V[1];
    }
    A.types = requireTypes();
    function $(a) {
      return Array.isArray(a);
    }
    A.isArray = $;
    function C(a) {
      return typeof a == "boolean";
    }
    A.isBoolean = C;
    function L(a) {
      return a === null;
    }
    A.isNull = L;
    function H(a) {
      return a == null;
    }
    A.isNullOrUndefined = H;
    function j(a) {
      return typeof a == "number";
    }
    A.isNumber = j;
    function J(a) {
      return typeof a == "string";
    }
    A.isString = J;
    function X(a) {
      return typeof a == "symbol";
    }
    A.isSymbol = X;
    function ie(a) {
      return a === void 0;
    }
    A.isUndefined = ie;
    function ne(a) {
      return ee(a) && e(a) === "[object RegExp]";
    }
    A.isRegExp = ne, A.types.isRegExp = ne;
    function ee(a) {
      return typeof a == "object" && a !== null;
    }
    A.isObject = ee;
    function ue(a) {
      return ee(a) && e(a) === "[object Date]";
    }
    A.isDate = ue, A.types.isDate = ue;
    function U(a) {
      return ee(a) && (e(a) === "[object Error]" || a instanceof Error);
    }
    A.isError = U, A.types.isNativeError = U;
    function E(a) {
      return typeof a == "function";
    }
    A.isFunction = E;
    function o(a) {
      return a === null || typeof a == "boolean" || typeof a == "number" || typeof a == "string" || typeof a == "symbol" || // ES6 symbol
      typeof a > "u";
    }
    A.isPrimitive = o, A.isBuffer = requireIsBufferBrowser();
    function e(a) {
      return Object.prototype.toString.call(a);
    }
    function t(a) {
      return a < 10 ? "0" + a.toString(10) : a.toString(10);
    }
    var v = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    function g() {
      var a = /* @__PURE__ */ new Date(), T = [
        t(a.getHours()),
        t(a.getMinutes()),
        t(a.getSeconds())
      ].join(":");
      return [a.getDate(), v[a.getMonth()], T].join(" ");
    }
    A.log = function() {
      console.log("%s - %s", g(), A.format.apply(A, arguments));
    }, A.inherits = requireInherits_browser(), A._extend = function(a, T) {
      if (!T || !ee(T))
        return a;
      for (var V = Object.keys(T), Y = V.length; Y--; )
        a[V[Y]] = T[V[Y]];
      return a;
    };
    function h(a, T) {
      return Object.prototype.hasOwnProperty.call(a, T);
    }
    var b = typeof Symbol < "u" ? Symbol("util.promisify.custom") : void 0;
    A.promisify = function(T) {
      if (typeof T != "function")
        throw new TypeError('The "original" argument must be of type Function');
      if (b && T[b]) {
        var V = T[b];
        if (typeof V != "function")
          throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(V, b, {
          value: V,
          enumerable: !1,
          writable: !1,
          configurable: !0
        }), V;
      }
      function V() {
        for (var Y, z, D = new Promise(function(te, G) {
          Y = te, z = G;
        }), N = [], Q = 0; Q < arguments.length; Q++)
          N.push(arguments[Q]);
        N.push(function(te, G) {
          te ? z(te) : Y(G);
        });
        try {
          T.apply(this, N);
        } catch (te) {
          z(te);
        }
        return D;
      }
      return Object.setPrototypeOf(V, Object.getPrototypeOf(T)), b && Object.defineProperty(V, b, {
        value: V,
        enumerable: !1,
        writable: !1,
        configurable: !0
      }), Object.defineProperties(
        V,
        _(T)
      );
    }, A.promisify.custom = b;
    function p(a, T) {
      if (!a) {
        var V = new Error("Promise was rejected with a falsy value");
        V.reason = a, a = V;
      }
      return T(a);
    }
    function w(a) {
      if (typeof a != "function")
        throw new TypeError('The "original" argument must be of type Function');
      function T() {
        for (var V = [], Y = 0; Y < arguments.length; Y++)
          V.push(arguments[Y]);
        var z = V.pop();
        if (typeof z != "function")
          throw new TypeError("The last argument must be of type Function");
        var D = this, N = function() {
          return z.apply(D, arguments);
        };
        a.apply(this, V).then(
          function(Q) {
            process$1.nextTick(N.bind(null, null, Q));
          },
          function(Q) {
            process$1.nextTick(p.bind(null, Q, N));
          }
        );
      }
      return Object.setPrototypeOf(T, Object.getPrototypeOf(a)), Object.defineProperties(
        T,
        _(a)
      ), T;
    }
    A.callbackify = w;
  }(util$1)), util$1;
}
var buffer_list, hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list)
    return buffer_list;
  hasRequiredBuffer_list = 1;
  function A(I, k) {
    var $ = Object.keys(I);
    if (Object.getOwnPropertySymbols) {
      var C = Object.getOwnPropertySymbols(I);
      k && (C = C.filter(function(L) {
        return Object.getOwnPropertyDescriptor(I, L).enumerable;
      })), $.push.apply($, C);
    }
    return $;
  }
  function _(I) {
    for (var k = 1; k < arguments.length; k++) {
      var $ = arguments[k] != null ? arguments[k] : {};
      k % 2 ? A(Object($), !0).forEach(function(C) {
        B(I, C, $[C]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(I, Object.getOwnPropertyDescriptors($)) : A(Object($)).forEach(function(C) {
        Object.defineProperty(I, C, Object.getOwnPropertyDescriptor($, C));
      });
    }
    return I;
  }
  function B(I, k, $) {
    return k = S(k), k in I ? Object.defineProperty(I, k, { value: $, enumerable: !0, configurable: !0, writable: !0 }) : I[k] = $, I;
  }
  function M(I, k) {
    if (!(I instanceof k))
      throw new TypeError("Cannot call a class as a function");
  }
  function P(I, k) {
    for (var $ = 0; $ < k.length; $++) {
      var C = k[$];
      C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(I, S(C.key), C);
    }
  }
  function r(I, k, $) {
    return k && P(I.prototype, k), $ && P(I, $), Object.defineProperty(I, "prototype", { writable: !1 }), I;
  }
  function S(I) {
    var k = d(I, "string");
    return typeof k == "symbol" ? k : String(k);
  }
  function d(I, k) {
    if (typeof I != "object" || I === null)
      return I;
    var $ = I[Symbol.toPrimitive];
    if ($ !== void 0) {
      var C = $.call(I, k || "default");
      if (typeof C != "object")
        return C;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (k === "string" ? String : Number)(I);
  }
  var x = requireBuffer$1(), m = x.Buffer, f = requireUtil$1(), y = f.inspect, q = y && y.custom || "inspect";
  function R(I, k, $) {
    m.prototype.copy.call(I, k, $);
  }
  return buffer_list = /* @__PURE__ */ function() {
    function I() {
      M(this, I), this.head = null, this.tail = null, this.length = 0;
    }
    return r(I, [{
      key: "push",
      value: function($) {
        var C = {
          data: $,
          next: null
        };
        this.length > 0 ? this.tail.next = C : this.head = C, this.tail = C, ++this.length;
      }
    }, {
      key: "unshift",
      value: function($) {
        var C = {
          data: $,
          next: this.head
        };
        this.length === 0 && (this.tail = C), this.head = C, ++this.length;
      }
    }, {
      key: "shift",
      value: function() {
        if (this.length !== 0) {
          var $ = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, $;
        }
      }
    }, {
      key: "clear",
      value: function() {
        this.head = this.tail = null, this.length = 0;
      }
    }, {
      key: "join",
      value: function($) {
        if (this.length === 0)
          return "";
        for (var C = this.head, L = "" + C.data; C = C.next; )
          L += $ + C.data;
        return L;
      }
    }, {
      key: "concat",
      value: function($) {
        if (this.length === 0)
          return m.alloc(0);
        for (var C = m.allocUnsafe($ >>> 0), L = this.head, H = 0; L; )
          R(L.data, C, H), H += L.data.length, L = L.next;
        return C;
      }
      // Consumes a specified amount of bytes or characters from the buffered data.
    }, {
      key: "consume",
      value: function($, C) {
        var L;
        return $ < this.head.data.length ? (L = this.head.data.slice(0, $), this.head.data = this.head.data.slice($)) : $ === this.head.data.length ? L = this.shift() : L = C ? this._getString($) : this._getBuffer($), L;
      }
    }, {
      key: "first",
      value: function() {
        return this.head.data;
      }
      // Consumes a specified amount of characters from the buffered data.
    }, {
      key: "_getString",
      value: function($) {
        var C = this.head, L = 1, H = C.data;
        for ($ -= H.length; C = C.next; ) {
          var j = C.data, J = $ > j.length ? j.length : $;
          if (J === j.length ? H += j : H += j.slice(0, $), $ -= J, $ === 0) {
            J === j.length ? (++L, C.next ? this.head = C.next : this.head = this.tail = null) : (this.head = C, C.data = j.slice(J));
            break;
          }
          ++L;
        }
        return this.length -= L, H;
      }
      // Consumes a specified amount of bytes from the buffered data.
    }, {
      key: "_getBuffer",
      value: function($) {
        var C = m.allocUnsafe($), L = this.head, H = 1;
        for (L.data.copy(C), $ -= L.data.length; L = L.next; ) {
          var j = L.data, J = $ > j.length ? j.length : $;
          if (j.copy(C, C.length - $, 0, J), $ -= J, $ === 0) {
            J === j.length ? (++H, L.next ? this.head = L.next : this.head = this.tail = null) : (this.head = L, L.data = j.slice(J));
            break;
          }
          ++H;
        }
        return this.length -= H, C;
      }
      // Make sure the linked list only shows the minimal necessary information.
    }, {
      key: q,
      value: function($, C) {
        return y(this, _(_({}, C), {}, {
          // Only inspect one level.
          depth: 0,
          // It should not recurse.
          customInspect: !1
        }));
      }
    }]), I;
  }(), buffer_list;
}
var destroy_1$1, hasRequiredDestroy$1;
function requireDestroy$1() {
  if (hasRequiredDestroy$1)
    return destroy_1$1;
  hasRequiredDestroy$1 = 1;
  function A(S, d) {
    var x = this, m = this._readableState && this._readableState.destroyed, f = this._writableState && this._writableState.destroyed;
    return m || f ? (d ? d(S) : S && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, process$1.nextTick(P, this, S)) : process$1.nextTick(P, this, S)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(S || null, function(y) {
      !d && y ? x._writableState ? x._writableState.errorEmitted ? process$1.nextTick(B, x) : (x._writableState.errorEmitted = !0, process$1.nextTick(_, x, y)) : process$1.nextTick(_, x, y) : d ? (process$1.nextTick(B, x), d(y)) : process$1.nextTick(B, x);
    }), this);
  }
  function _(S, d) {
    P(S, d), B(S);
  }
  function B(S) {
    S._writableState && !S._writableState.emitClose || S._readableState && !S._readableState.emitClose || S.emit("close");
  }
  function M() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function P(S, d) {
    S.emit("error", d);
  }
  function r(S, d) {
    var x = S._readableState, m = S._writableState;
    x && x.autoDestroy || m && m.autoDestroy ? S.destroy(d) : S.emit("error", d);
  }
  return destroy_1$1 = {
    destroy: A,
    undestroy: M,
    errorOrDestroy: r
  }, destroy_1$1;
}
var errorsBrowser = {}, hasRequiredErrorsBrowser;
function requireErrorsBrowser() {
  if (hasRequiredErrorsBrowser)
    return errorsBrowser;
  hasRequiredErrorsBrowser = 1;
  function A(d, x) {
    d.prototype = Object.create(x.prototype), d.prototype.constructor = d, d.__proto__ = x;
  }
  var _ = {};
  function B(d, x, m) {
    m || (m = Error);
    function f(q, R, I) {
      return typeof x == "string" ? x : x(q, R, I);
    }
    var y = /* @__PURE__ */ function(q) {
      A(R, q);
      function R(I, k, $) {
        return q.call(this, f(I, k, $)) || this;
      }
      return R;
    }(m);
    y.prototype.name = m.name, y.prototype.code = d, _[d] = y;
  }
  function M(d, x) {
    if (Array.isArray(d)) {
      var m = d.length;
      return d = d.map(function(f) {
        return String(f);
      }), m > 2 ? "one of ".concat(x, " ").concat(d.slice(0, m - 1).join(", "), ", or ") + d[m - 1] : m === 2 ? "one of ".concat(x, " ").concat(d[0], " or ").concat(d[1]) : "of ".concat(x, " ").concat(d[0]);
    } else
      return "of ".concat(x, " ").concat(String(d));
  }
  function P(d, x, m) {
    return d.substr(!m || m < 0 ? 0 : +m, x.length) === x;
  }
  function r(d, x, m) {
    return (m === void 0 || m > d.length) && (m = d.length), d.substring(m - x.length, m) === x;
  }
  function S(d, x, m) {
    return typeof m != "number" && (m = 0), m + x.length > d.length ? !1 : d.indexOf(x, m) !== -1;
  }
  return B("ERR_INVALID_OPT_VALUE", function(d, x) {
    return 'The value "' + x + '" is invalid for option "' + d + '"';
  }, TypeError), B("ERR_INVALID_ARG_TYPE", function(d, x, m) {
    var f;
    typeof x == "string" && P(x, "not ") ? (f = "must not be", x = x.replace(/^not /, "")) : f = "must be";
    var y;
    if (r(d, " argument"))
      y = "The ".concat(d, " ").concat(f, " ").concat(M(x, "type"));
    else {
      var q = S(d, ".") ? "property" : "argument";
      y = 'The "'.concat(d, '" ').concat(q, " ").concat(f, " ").concat(M(x, "type"));
    }
    return y += ". Received type ".concat(typeof m), y;
  }, TypeError), B("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), B("ERR_METHOD_NOT_IMPLEMENTED", function(d) {
    return "The " + d + " method is not implemented";
  }), B("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), B("ERR_STREAM_DESTROYED", function(d) {
    return "Cannot call " + d + " after a stream was destroyed";
  }), B("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), B("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), B("ERR_STREAM_WRITE_AFTER_END", "write after end"), B("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), B("ERR_UNKNOWN_ENCODING", function(d) {
    return "Unknown encoding: " + d;
  }, TypeError), B("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), errorsBrowser.codes = _, errorsBrowser;
}
var state, hasRequiredState;
function requireState() {
  if (hasRequiredState)
    return state;
  hasRequiredState = 1;
  var A = requireErrorsBrowser().codes.ERR_INVALID_OPT_VALUE;
  function _(M, P, r) {
    return M.highWaterMark != null ? M.highWaterMark : P ? M[r] : null;
  }
  function B(M, P, r, S) {
    var d = _(P, S, r);
    if (d != null) {
      if (!(isFinite(d) && Math.floor(d) === d) || d < 0) {
        var x = S ? r : "highWaterMark";
        throw new A(x, d);
      }
      return Math.floor(d);
    }
    return M.objectMode ? 16 : 16 * 1024;
  }
  return state = {
    getHighWaterMark: B
  }, state;
}
var browser$a, hasRequiredBrowser$a;
function requireBrowser$a() {
  if (hasRequiredBrowser$a)
    return browser$a;
  hasRequiredBrowser$a = 1, browser$a = A;
  function A(B, M) {
    if (_("noDeprecation"))
      return B;
    var P = !1;
    function r() {
      if (!P) {
        if (_("throwDeprecation"))
          throw new Error(M);
        _("traceDeprecation") ? console.trace(M) : console.warn(M), P = !0;
      }
      return B.apply(this, arguments);
    }
    return r;
  }
  function _(B) {
    try {
      if (!commonjsGlobal.localStorage)
        return !1;
    } catch {
      return !1;
    }
    var M = commonjsGlobal.localStorage[B];
    return M == null ? !1 : String(M).toLowerCase() === "true";
  }
  return browser$a;
}
var _stream_writable$1, hasRequired_stream_writable$1;
function require_stream_writable$1() {
  if (hasRequired_stream_writable$1)
    return _stream_writable$1;
  hasRequired_stream_writable$1 = 1, _stream_writable$1 = ne;
  function A(z) {
    var D = this;
    this.next = null, this.entry = null, this.finish = function() {
      Y(D, z);
    };
  }
  var _;
  ne.WritableState = X;
  var B = {
    deprecate: requireBrowser$a()
  }, M = requireStreamBrowser$1(), P = requireBuffer$1().Buffer, r = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function S(z) {
    return P.from(z);
  }
  function d(z) {
    return P.isBuffer(z) || z instanceof r;
  }
  var x = requireDestroy$1(), m = requireState(), f = m.getHighWaterMark, y = requireErrorsBrowser().codes, q = y.ERR_INVALID_ARG_TYPE, R = y.ERR_METHOD_NOT_IMPLEMENTED, I = y.ERR_MULTIPLE_CALLBACK, k = y.ERR_STREAM_CANNOT_PIPE, $ = y.ERR_STREAM_DESTROYED, C = y.ERR_STREAM_NULL_VALUES, L = y.ERR_STREAM_WRITE_AFTER_END, H = y.ERR_UNKNOWN_ENCODING, j = x.errorOrDestroy;
  requireInherits_browser()(ne, M);
  function J() {
  }
  function X(z, D, N) {
    _ = _ || require_stream_duplex$1(), z = z || {}, typeof N != "boolean" && (N = D instanceof _), this.objectMode = !!z.objectMode, N && (this.objectMode = this.objectMode || !!z.writableObjectMode), this.highWaterMark = f(this, z, "writableHighWaterMark", N), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var Q = z.decodeStrings === !1;
    this.decodeStrings = !Q, this.defaultEncoding = z.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(te) {
      v(D, te);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = z.emitClose !== !1, this.autoDestroy = !!z.autoDestroy, this.bufferedRequestCount = 0, this.corkedRequestsFree = new A(this);
  }
  X.prototype.getBuffer = function() {
    for (var D = this.bufferedRequest, N = []; D; )
      N.push(D), D = D.next;
    return N;
  }, function() {
    try {
      Object.defineProperty(X.prototype, "buffer", {
        get: B.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var ie;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (ie = Function.prototype[Symbol.hasInstance], Object.defineProperty(ne, Symbol.hasInstance, {
    value: function(D) {
      return ie.call(this, D) ? !0 : this !== ne ? !1 : D && D._writableState instanceof X;
    }
  })) : ie = function(D) {
    return D instanceof this;
  };
  function ne(z) {
    _ = _ || require_stream_duplex$1();
    var D = this instanceof _;
    if (!D && !ie.call(ne, this))
      return new ne(z);
    this._writableState = new X(z, this, D), this.writable = !0, z && (typeof z.write == "function" && (this._write = z.write), typeof z.writev == "function" && (this._writev = z.writev), typeof z.destroy == "function" && (this._destroy = z.destroy), typeof z.final == "function" && (this._final = z.final)), M.call(this);
  }
  ne.prototype.pipe = function() {
    j(this, new k());
  };
  function ee(z, D) {
    var N = new L();
    j(z, N), process$1.nextTick(D, N);
  }
  function ue(z, D, N, Q) {
    var te;
    return N === null ? te = new C() : typeof N != "string" && !D.objectMode && (te = new q("chunk", ["string", "Buffer"], N)), te ? (j(z, te), process$1.nextTick(Q, te), !1) : !0;
  }
  ne.prototype.write = function(z, D, N) {
    var Q = this._writableState, te = !1, G = !Q.objectMode && d(z);
    return G && !P.isBuffer(z) && (z = S(z)), typeof D == "function" && (N = D, D = null), G ? D = "buffer" : D || (D = Q.defaultEncoding), typeof N != "function" && (N = J), Q.ending ? ee(this, N) : (G || ue(this, Q, z, N)) && (Q.pendingcb++, te = E(this, Q, G, z, D, N)), te;
  }, ne.prototype.cork = function() {
    this._writableState.corked++;
  }, ne.prototype.uncork = function() {
    var z = this._writableState;
    z.corked && (z.corked--, !z.writing && !z.corked && !z.bufferProcessing && z.bufferedRequest && b(this, z));
  }, ne.prototype.setDefaultEncoding = function(D) {
    if (typeof D == "string" && (D = D.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((D + "").toLowerCase()) > -1))
      throw new H(D);
    return this._writableState.defaultEncoding = D, this;
  }, Object.defineProperty(ne.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  });
  function U(z, D, N) {
    return !z.objectMode && z.decodeStrings !== !1 && typeof D == "string" && (D = P.from(D, N)), D;
  }
  Object.defineProperty(ne.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function E(z, D, N, Q, te, G) {
    if (!N) {
      var W = U(D, Q, te);
      Q !== W && (N = !0, te = "buffer", Q = W);
    }
    var ae = D.objectMode ? 1 : Q.length;
    D.length += ae;
    var se = D.length < D.highWaterMark;
    if (se || (D.needDrain = !0), D.writing || D.corked) {
      var he = D.lastBufferedRequest;
      D.lastBufferedRequest = {
        chunk: Q,
        encoding: te,
        isBuf: N,
        callback: G,
        next: null
      }, he ? he.next = D.lastBufferedRequest : D.bufferedRequest = D.lastBufferedRequest, D.bufferedRequestCount += 1;
    } else
      o(z, D, !1, ae, Q, te, G);
    return se;
  }
  function o(z, D, N, Q, te, G, W) {
    D.writelen = Q, D.writecb = W, D.writing = !0, D.sync = !0, D.destroyed ? D.onwrite(new $("write")) : N ? z._writev(te, D.onwrite) : z._write(te, G, D.onwrite), D.sync = !1;
  }
  function e(z, D, N, Q, te) {
    --D.pendingcb, N ? (process$1.nextTick(te, Q), process$1.nextTick(T, z, D), z._writableState.errorEmitted = !0, j(z, Q)) : (te(Q), z._writableState.errorEmitted = !0, j(z, Q), T(z, D));
  }
  function t(z) {
    z.writing = !1, z.writecb = null, z.length -= z.writelen, z.writelen = 0;
  }
  function v(z, D) {
    var N = z._writableState, Q = N.sync, te = N.writecb;
    if (typeof te != "function")
      throw new I();
    if (t(N), D)
      e(z, N, Q, D, te);
    else {
      var G = p(N) || z.destroyed;
      !G && !N.corked && !N.bufferProcessing && N.bufferedRequest && b(z, N), Q ? process$1.nextTick(g, z, N, G, te) : g(z, N, G, te);
    }
  }
  function g(z, D, N, Q) {
    N || h(z, D), D.pendingcb--, Q(), T(z, D);
  }
  function h(z, D) {
    D.length === 0 && D.needDrain && (D.needDrain = !1, z.emit("drain"));
  }
  function b(z, D) {
    D.bufferProcessing = !0;
    var N = D.bufferedRequest;
    if (z._writev && N && N.next) {
      var Q = D.bufferedRequestCount, te = new Array(Q), G = D.corkedRequestsFree;
      G.entry = N;
      for (var W = 0, ae = !0; N; )
        te[W] = N, N.isBuf || (ae = !1), N = N.next, W += 1;
      te.allBuffers = ae, o(z, D, !0, D.length, te, "", G.finish), D.pendingcb++, D.lastBufferedRequest = null, G.next ? (D.corkedRequestsFree = G.next, G.next = null) : D.corkedRequestsFree = new A(D), D.bufferedRequestCount = 0;
    } else {
      for (; N; ) {
        var se = N.chunk, he = N.encoding, Z = N.callback, O = D.objectMode ? 1 : se.length;
        if (o(z, D, !1, O, se, he, Z), N = N.next, D.bufferedRequestCount--, D.writing)
          break;
      }
      N === null && (D.lastBufferedRequest = null);
    }
    D.bufferedRequest = N, D.bufferProcessing = !1;
  }
  ne.prototype._write = function(z, D, N) {
    N(new R("_write()"));
  }, ne.prototype._writev = null, ne.prototype.end = function(z, D, N) {
    var Q = this._writableState;
    return typeof z == "function" ? (N = z, z = null, D = null) : typeof D == "function" && (N = D, D = null), z != null && this.write(z, D), Q.corked && (Q.corked = 1, this.uncork()), Q.ending || V(this, Q, N), this;
  }, Object.defineProperty(ne.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function p(z) {
    return z.ending && z.length === 0 && z.bufferedRequest === null && !z.finished && !z.writing;
  }
  function w(z, D) {
    z._final(function(N) {
      D.pendingcb--, N && j(z, N), D.prefinished = !0, z.emit("prefinish"), T(z, D);
    });
  }
  function a(z, D) {
    !D.prefinished && !D.finalCalled && (typeof z._final == "function" && !D.destroyed ? (D.pendingcb++, D.finalCalled = !0, process$1.nextTick(w, z, D)) : (D.prefinished = !0, z.emit("prefinish")));
  }
  function T(z, D) {
    var N = p(D);
    if (N && (a(z, D), D.pendingcb === 0 && (D.finished = !0, z.emit("finish"), D.autoDestroy))) {
      var Q = z._readableState;
      (!Q || Q.autoDestroy && Q.endEmitted) && z.destroy();
    }
    return N;
  }
  function V(z, D, N) {
    D.ending = !0, T(z, D), N && (D.finished ? process$1.nextTick(N) : z.once("finish", N)), D.ended = !0, z.writable = !1;
  }
  function Y(z, D, N) {
    var Q = z.entry;
    for (z.entry = null; Q; ) {
      var te = Q.callback;
      D.pendingcb--, te(N), Q = Q.next;
    }
    D.corkedRequestsFree.next = z;
  }
  return Object.defineProperty(ne.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(D) {
      this._writableState && (this._writableState.destroyed = D);
    }
  }), ne.prototype.destroy = x.destroy, ne.prototype._undestroy = x.undestroy, ne.prototype._destroy = function(z, D) {
    D(z);
  }, _stream_writable$1;
}
var _stream_duplex$1, hasRequired_stream_duplex$1;
function require_stream_duplex$1() {
  if (hasRequired_stream_duplex$1)
    return _stream_duplex$1;
  hasRequired_stream_duplex$1 = 1;
  var A = Object.keys || function(m) {
    var f = [];
    for (var y in m)
      f.push(y);
    return f;
  };
  _stream_duplex$1 = S;
  var _ = require_stream_readable$1(), B = require_stream_writable$1();
  requireInherits_browser()(S, _);
  for (var M = A(B.prototype), P = 0; P < M.length; P++) {
    var r = M[P];
    S.prototype[r] || (S.prototype[r] = B.prototype[r]);
  }
  function S(m) {
    if (!(this instanceof S))
      return new S(m);
    _.call(this, m), B.call(this, m), this.allowHalfOpen = !0, m && (m.readable === !1 && (this.readable = !1), m.writable === !1 && (this.writable = !1), m.allowHalfOpen === !1 && (this.allowHalfOpen = !1, this.once("end", d)));
  }
  Object.defineProperty(S.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  }), Object.defineProperty(S.prototype, "writableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState && this._writableState.getBuffer();
    }
  }), Object.defineProperty(S.prototype, "writableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.length;
    }
  });
  function d() {
    this._writableState.ended || process$1.nextTick(x, this);
  }
  function x(m) {
    m.end();
  }
  return Object.defineProperty(S.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(f) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = f, this._writableState.destroyed = f);
    }
  }), _stream_duplex$1;
}
var string_decoder = {}, hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder)
    return string_decoder;
  hasRequiredString_decoder = 1;
  var A = requireSafeBuffer$1().Buffer, _ = A.isEncoding || function(C) {
    switch (C = "" + C, C && C.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return !0;
      default:
        return !1;
    }
  };
  function B(C) {
    if (!C)
      return "utf8";
    for (var L; ; )
      switch (C) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return C;
        default:
          if (L)
            return;
          C = ("" + C).toLowerCase(), L = !0;
      }
  }
  function M(C) {
    var L = B(C);
    if (typeof L != "string" && (A.isEncoding === _ || !_(C)))
      throw new Error("Unknown encoding: " + C);
    return L || C;
  }
  string_decoder.StringDecoder = P;
  function P(C) {
    this.encoding = M(C);
    var L;
    switch (this.encoding) {
      case "utf16le":
        this.text = y, this.end = q, L = 4;
        break;
      case "utf8":
        this.fillLast = x, L = 4;
        break;
      case "base64":
        this.text = R, this.end = I, L = 3;
        break;
      default:
        this.write = k, this.end = $;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = A.allocUnsafe(L);
  }
  P.prototype.write = function(C) {
    if (C.length === 0)
      return "";
    var L, H;
    if (this.lastNeed) {
      if (L = this.fillLast(C), L === void 0)
        return "";
      H = this.lastNeed, this.lastNeed = 0;
    } else
      H = 0;
    return H < C.length ? L ? L + this.text(C, H) : this.text(C, H) : L || "";
  }, P.prototype.end = f, P.prototype.text = m, P.prototype.fillLast = function(C) {
    if (this.lastNeed <= C.length)
      return C.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    C.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, C.length), this.lastNeed -= C.length;
  };
  function r(C) {
    return C <= 127 ? 0 : C >> 5 === 6 ? 2 : C >> 4 === 14 ? 3 : C >> 3 === 30 ? 4 : C >> 6 === 2 ? -1 : -2;
  }
  function S(C, L, H) {
    var j = L.length - 1;
    if (j < H)
      return 0;
    var J = r(L[j]);
    return J >= 0 ? (J > 0 && (C.lastNeed = J - 1), J) : --j < H || J === -2 ? 0 : (J = r(L[j]), J >= 0 ? (J > 0 && (C.lastNeed = J - 2), J) : --j < H || J === -2 ? 0 : (J = r(L[j]), J >= 0 ? (J > 0 && (J === 2 ? J = 0 : C.lastNeed = J - 3), J) : 0));
  }
  function d(C, L, H) {
    if ((L[0] & 192) !== 128)
      return C.lastNeed = 0, "�";
    if (C.lastNeed > 1 && L.length > 1) {
      if ((L[1] & 192) !== 128)
        return C.lastNeed = 1, "�";
      if (C.lastNeed > 2 && L.length > 2 && (L[2] & 192) !== 128)
        return C.lastNeed = 2, "�";
    }
  }
  function x(C) {
    var L = this.lastTotal - this.lastNeed, H = d(this, C);
    if (H !== void 0)
      return H;
    if (this.lastNeed <= C.length)
      return C.copy(this.lastChar, L, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    C.copy(this.lastChar, L, 0, C.length), this.lastNeed -= C.length;
  }
  function m(C, L) {
    var H = S(this, C, L);
    if (!this.lastNeed)
      return C.toString("utf8", L);
    this.lastTotal = H;
    var j = C.length - (H - this.lastNeed);
    return C.copy(this.lastChar, 0, j), C.toString("utf8", L, j);
  }
  function f(C) {
    var L = C && C.length ? this.write(C) : "";
    return this.lastNeed ? L + "�" : L;
  }
  function y(C, L) {
    if ((C.length - L) % 2 === 0) {
      var H = C.toString("utf16le", L);
      if (H) {
        var j = H.charCodeAt(H.length - 1);
        if (j >= 55296 && j <= 56319)
          return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = C[C.length - 2], this.lastChar[1] = C[C.length - 1], H.slice(0, -1);
      }
      return H;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = C[C.length - 1], C.toString("utf16le", L, C.length - 1);
  }
  function q(C) {
    var L = C && C.length ? this.write(C) : "";
    if (this.lastNeed) {
      var H = this.lastTotal - this.lastNeed;
      return L + this.lastChar.toString("utf16le", 0, H);
    }
    return L;
  }
  function R(C, L) {
    var H = (C.length - L) % 3;
    return H === 0 ? C.toString("base64", L) : (this.lastNeed = 3 - H, this.lastTotal = 3, H === 1 ? this.lastChar[0] = C[C.length - 1] : (this.lastChar[0] = C[C.length - 2], this.lastChar[1] = C[C.length - 1]), C.toString("base64", L, C.length - H));
  }
  function I(C) {
    var L = C && C.length ? this.write(C) : "";
    return this.lastNeed ? L + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : L;
  }
  function k(C) {
    return C.toString(this.encoding);
  }
  function $(C) {
    return C && C.length ? this.write(C) : "";
  }
  return string_decoder;
}
var endOfStream, hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream)
    return endOfStream;
  hasRequiredEndOfStream = 1;
  var A = requireErrorsBrowser().codes.ERR_STREAM_PREMATURE_CLOSE;
  function _(r) {
    var S = !1;
    return function() {
      if (!S) {
        S = !0;
        for (var d = arguments.length, x = new Array(d), m = 0; m < d; m++)
          x[m] = arguments[m];
        r.apply(this, x);
      }
    };
  }
  function B() {
  }
  function M(r) {
    return r.setHeader && typeof r.abort == "function";
  }
  function P(r, S, d) {
    if (typeof S == "function")
      return P(r, null, S);
    S || (S = {}), d = _(d || B);
    var x = S.readable || S.readable !== !1 && r.readable, m = S.writable || S.writable !== !1 && r.writable, f = function() {
      r.writable || q();
    }, y = r._writableState && r._writableState.finished, q = function() {
      m = !1, y = !0, x || d.call(r);
    }, R = r._readableState && r._readableState.endEmitted, I = function() {
      x = !1, R = !0, m || d.call(r);
    }, k = function(H) {
      d.call(r, H);
    }, $ = function() {
      var H;
      if (x && !R)
        return (!r._readableState || !r._readableState.ended) && (H = new A()), d.call(r, H);
      if (m && !y)
        return (!r._writableState || !r._writableState.ended) && (H = new A()), d.call(r, H);
    }, C = function() {
      r.req.on("finish", q);
    };
    return M(r) ? (r.on("complete", q), r.on("abort", $), r.req ? C() : r.on("request", C)) : m && !r._writableState && (r.on("end", f), r.on("close", f)), r.on("end", I), r.on("finish", q), S.error !== !1 && r.on("error", k), r.on("close", $), function() {
      r.removeListener("complete", q), r.removeListener("abort", $), r.removeListener("request", C), r.req && r.req.removeListener("finish", q), r.removeListener("end", f), r.removeListener("close", f), r.removeListener("finish", q), r.removeListener("end", I), r.removeListener("error", k), r.removeListener("close", $);
    };
  }
  return endOfStream = P, endOfStream;
}
var async_iterator, hasRequiredAsync_iterator;
function requireAsync_iterator() {
  if (hasRequiredAsync_iterator)
    return async_iterator;
  hasRequiredAsync_iterator = 1;
  var A;
  function _(H, j, J) {
    return j = B(j), j in H ? Object.defineProperty(H, j, { value: J, enumerable: !0, configurable: !0, writable: !0 }) : H[j] = J, H;
  }
  function B(H) {
    var j = M(H, "string");
    return typeof j == "symbol" ? j : String(j);
  }
  function M(H, j) {
    if (typeof H != "object" || H === null)
      return H;
    var J = H[Symbol.toPrimitive];
    if (J !== void 0) {
      var X = J.call(H, j || "default");
      if (typeof X != "object")
        return X;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (j === "string" ? String : Number)(H);
  }
  var P = requireEndOfStream(), r = Symbol("lastResolve"), S = Symbol("lastReject"), d = Symbol("error"), x = Symbol("ended"), m = Symbol("lastPromise"), f = Symbol("handlePromise"), y = Symbol("stream");
  function q(H, j) {
    return {
      value: H,
      done: j
    };
  }
  function R(H) {
    var j = H[r];
    if (j !== null) {
      var J = H[y].read();
      J !== null && (H[m] = null, H[r] = null, H[S] = null, j(q(J, !1)));
    }
  }
  function I(H) {
    process$1.nextTick(R, H);
  }
  function k(H, j) {
    return function(J, X) {
      H.then(function() {
        if (j[x]) {
          J(q(void 0, !0));
          return;
        }
        j[f](J, X);
      }, X);
    };
  }
  var $ = Object.getPrototypeOf(function() {
  }), C = Object.setPrototypeOf((A = {
    get stream() {
      return this[y];
    },
    next: function() {
      var j = this, J = this[d];
      if (J !== null)
        return Promise.reject(J);
      if (this[x])
        return Promise.resolve(q(void 0, !0));
      if (this[y].destroyed)
        return new Promise(function(ee, ue) {
          process$1.nextTick(function() {
            j[d] ? ue(j[d]) : ee(q(void 0, !0));
          });
        });
      var X = this[m], ie;
      if (X)
        ie = new Promise(k(X, this));
      else {
        var ne = this[y].read();
        if (ne !== null)
          return Promise.resolve(q(ne, !1));
        ie = new Promise(this[f]);
      }
      return this[m] = ie, ie;
    }
  }, _(A, Symbol.asyncIterator, function() {
    return this;
  }), _(A, "return", function() {
    var j = this;
    return new Promise(function(J, X) {
      j[y].destroy(null, function(ie) {
        if (ie) {
          X(ie);
          return;
        }
        J(q(void 0, !0));
      });
    });
  }), A), $), L = function(j) {
    var J, X = Object.create(C, (J = {}, _(J, y, {
      value: j,
      writable: !0
    }), _(J, r, {
      value: null,
      writable: !0
    }), _(J, S, {
      value: null,
      writable: !0
    }), _(J, d, {
      value: null,
      writable: !0
    }), _(J, x, {
      value: j._readableState.endEmitted,
      writable: !0
    }), _(J, f, {
      value: function(ne, ee) {
        var ue = X[y].read();
        ue ? (X[m] = null, X[r] = null, X[S] = null, ne(q(ue, !1))) : (X[r] = ne, X[S] = ee);
      },
      writable: !0
    }), J));
    return X[m] = null, P(j, function(ie) {
      if (ie && ie.code !== "ERR_STREAM_PREMATURE_CLOSE") {
        var ne = X[S];
        ne !== null && (X[m] = null, X[r] = null, X[S] = null, ne(ie)), X[d] = ie;
        return;
      }
      var ee = X[r];
      ee !== null && (X[m] = null, X[r] = null, X[S] = null, ee(q(void 0, !0))), X[x] = !0;
    }), j.on("readable", I.bind(null, X)), X;
  };
  return async_iterator = L, async_iterator;
}
var fromBrowser, hasRequiredFromBrowser;
function requireFromBrowser() {
  return hasRequiredFromBrowser || (hasRequiredFromBrowser = 1, fromBrowser = function() {
    throw new Error("Readable.from is not available in the browser");
  }), fromBrowser;
}
var _stream_readable$1, hasRequired_stream_readable$1;
function require_stream_readable$1() {
  if (hasRequired_stream_readable$1)
    return _stream_readable$1;
  hasRequired_stream_readable$1 = 1, _stream_readable$1 = ee;
  var A;
  ee.ReadableState = ne, requireEvents().EventEmitter;
  var _ = function(W, ae) {
    return W.listeners(ae).length;
  }, B = requireStreamBrowser$1(), M = requireBuffer$1().Buffer, P = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function r(G) {
    return M.from(G);
  }
  function S(G) {
    return M.isBuffer(G) || G instanceof P;
  }
  var d = requireUtil$1(), x;
  d && d.debuglog ? x = d.debuglog("stream") : x = function() {
  };
  var m = requireBuffer_list(), f = requireDestroy$1(), y = requireState(), q = y.getHighWaterMark, R = requireErrorsBrowser().codes, I = R.ERR_INVALID_ARG_TYPE, k = R.ERR_STREAM_PUSH_AFTER_EOF, $ = R.ERR_METHOD_NOT_IMPLEMENTED, C = R.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, L, H, j;
  requireInherits_browser()(ee, B);
  var J = f.errorOrDestroy, X = ["error", "close", "destroy", "pause", "resume"];
  function ie(G, W, ae) {
    if (typeof G.prependListener == "function")
      return G.prependListener(W, ae);
    !G._events || !G._events[W] ? G.on(W, ae) : Array.isArray(G._events[W]) ? G._events[W].unshift(ae) : G._events[W] = [ae, G._events[W]];
  }
  function ne(G, W, ae) {
    A = A || require_stream_duplex$1(), G = G || {}, typeof ae != "boolean" && (ae = W instanceof A), this.objectMode = !!G.objectMode, ae && (this.objectMode = this.objectMode || !!G.readableObjectMode), this.highWaterMark = q(this, G, "readableHighWaterMark", ae), this.buffer = new m(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = G.emitClose !== !1, this.autoDestroy = !!G.autoDestroy, this.destroyed = !1, this.defaultEncoding = G.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, G.encoding && (L || (L = requireString_decoder().StringDecoder), this.decoder = new L(G.encoding), this.encoding = G.encoding);
  }
  function ee(G) {
    if (A = A || require_stream_duplex$1(), !(this instanceof ee))
      return new ee(G);
    var W = this instanceof A;
    this._readableState = new ne(G, this, W), this.readable = !0, G && (typeof G.read == "function" && (this._read = G.read), typeof G.destroy == "function" && (this._destroy = G.destroy)), B.call(this);
  }
  Object.defineProperty(ee.prototype, "destroyed", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(W) {
      this._readableState && (this._readableState.destroyed = W);
    }
  }), ee.prototype.destroy = f.destroy, ee.prototype._undestroy = f.undestroy, ee.prototype._destroy = function(G, W) {
    W(G);
  }, ee.prototype.push = function(G, W) {
    var ae = this._readableState, se;
    return ae.objectMode ? se = !0 : typeof G == "string" && (W = W || ae.defaultEncoding, W !== ae.encoding && (G = M.from(G, W), W = ""), se = !0), ue(this, G, W, !1, se);
  }, ee.prototype.unshift = function(G) {
    return ue(this, G, null, !0, !1);
  };
  function ue(G, W, ae, se, he) {
    x("readableAddChunk", W);
    var Z = G._readableState;
    if (W === null)
      Z.reading = !1, v(G, Z);
    else {
      var O;
      if (he || (O = E(Z, W)), O)
        J(G, O);
      else if (Z.objectMode || W && W.length > 0)
        if (typeof W != "string" && !Z.objectMode && Object.getPrototypeOf(W) !== M.prototype && (W = r(W)), se)
          Z.endEmitted ? J(G, new C()) : U(G, Z, W, !0);
        else if (Z.ended)
          J(G, new k());
        else {
          if (Z.destroyed)
            return !1;
          Z.reading = !1, Z.decoder && !ae ? (W = Z.decoder.write(W), Z.objectMode || W.length !== 0 ? U(G, Z, W, !1) : b(G, Z)) : U(G, Z, W, !1);
        }
      else
        se || (Z.reading = !1, b(G, Z));
    }
    return !Z.ended && (Z.length < Z.highWaterMark || Z.length === 0);
  }
  function U(G, W, ae, se) {
    W.flowing && W.length === 0 && !W.sync ? (W.awaitDrain = 0, G.emit("data", ae)) : (W.length += W.objectMode ? 1 : ae.length, se ? W.buffer.unshift(ae) : W.buffer.push(ae), W.needReadable && g(G)), b(G, W);
  }
  function E(G, W) {
    var ae;
    return !S(W) && typeof W != "string" && W !== void 0 && !G.objectMode && (ae = new I("chunk", ["string", "Buffer", "Uint8Array"], W)), ae;
  }
  ee.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, ee.prototype.setEncoding = function(G) {
    L || (L = requireString_decoder().StringDecoder);
    var W = new L(G);
    this._readableState.decoder = W, this._readableState.encoding = this._readableState.decoder.encoding;
    for (var ae = this._readableState.buffer.head, se = ""; ae !== null; )
      se += W.write(ae.data), ae = ae.next;
    return this._readableState.buffer.clear(), se !== "" && this._readableState.buffer.push(se), this._readableState.length = se.length, this;
  };
  var o = 1073741824;
  function e(G) {
    return G >= o ? G = o : (G--, G |= G >>> 1, G |= G >>> 2, G |= G >>> 4, G |= G >>> 8, G |= G >>> 16, G++), G;
  }
  function t(G, W) {
    return G <= 0 || W.length === 0 && W.ended ? 0 : W.objectMode ? 1 : G !== G ? W.flowing && W.length ? W.buffer.head.data.length : W.length : (G > W.highWaterMark && (W.highWaterMark = e(G)), G <= W.length ? G : W.ended ? W.length : (W.needReadable = !0, 0));
  }
  ee.prototype.read = function(G) {
    x("read", G), G = parseInt(G, 10);
    var W = this._readableState, ae = G;
    if (G !== 0 && (W.emittedReadable = !1), G === 0 && W.needReadable && ((W.highWaterMark !== 0 ? W.length >= W.highWaterMark : W.length > 0) || W.ended))
      return x("read: emitReadable", W.length, W.ended), W.length === 0 && W.ended ? N(this) : g(this), null;
    if (G = t(G, W), G === 0 && W.ended)
      return W.length === 0 && N(this), null;
    var se = W.needReadable;
    x("need readable", se), (W.length === 0 || W.length - G < W.highWaterMark) && (se = !0, x("length less than watermark", se)), W.ended || W.reading ? (se = !1, x("reading or ended", se)) : se && (x("do read"), W.reading = !0, W.sync = !0, W.length === 0 && (W.needReadable = !0), this._read(W.highWaterMark), W.sync = !1, W.reading || (G = t(ae, W)));
    var he;
    return G > 0 ? he = D(G, W) : he = null, he === null ? (W.needReadable = W.length <= W.highWaterMark, G = 0) : (W.length -= G, W.awaitDrain = 0), W.length === 0 && (W.ended || (W.needReadable = !0), ae !== G && W.ended && N(this)), he !== null && this.emit("data", he), he;
  };
  function v(G, W) {
    if (x("onEofChunk"), !W.ended) {
      if (W.decoder) {
        var ae = W.decoder.end();
        ae && ae.length && (W.buffer.push(ae), W.length += W.objectMode ? 1 : ae.length);
      }
      W.ended = !0, W.sync ? g(G) : (W.needReadable = !1, W.emittedReadable || (W.emittedReadable = !0, h(G)));
    }
  }
  function g(G) {
    var W = G._readableState;
    x("emitReadable", W.needReadable, W.emittedReadable), W.needReadable = !1, W.emittedReadable || (x("emitReadable", W.flowing), W.emittedReadable = !0, process$1.nextTick(h, G));
  }
  function h(G) {
    var W = G._readableState;
    x("emitReadable_", W.destroyed, W.length, W.ended), !W.destroyed && (W.length || W.ended) && (G.emit("readable"), W.emittedReadable = !1), W.needReadable = !W.flowing && !W.ended && W.length <= W.highWaterMark, z(G);
  }
  function b(G, W) {
    W.readingMore || (W.readingMore = !0, process$1.nextTick(p, G, W));
  }
  function p(G, W) {
    for (; !W.reading && !W.ended && (W.length < W.highWaterMark || W.flowing && W.length === 0); ) {
      var ae = W.length;
      if (x("maybeReadMore read 0"), G.read(0), ae === W.length)
        break;
    }
    W.readingMore = !1;
  }
  ee.prototype._read = function(G) {
    J(this, new $("_read()"));
  }, ee.prototype.pipe = function(G, W) {
    var ae = this, se = this._readableState;
    switch (se.pipesCount) {
      case 0:
        se.pipes = G;
        break;
      case 1:
        se.pipes = [se.pipes, G];
        break;
      default:
        se.pipes.push(G);
        break;
    }
    se.pipesCount += 1, x("pipe count=%d opts=%j", se.pipesCount, W);
    var he = (!W || W.end !== !1) && G !== process$1.stdout && G !== process$1.stderr, Z = he ? F : pe;
    se.endEmitted ? process$1.nextTick(Z) : ae.once("end", Z), G.on("unpipe", O);
    function O(de, Ne) {
      x("onunpipe"), de === ae && Ne && Ne.hasUnpiped === !1 && (Ne.hasUnpiped = !0, fe());
    }
    function F() {
      x("onend"), G.end();
    }
    var K = w(ae);
    G.on("drain", K);
    var re = !1;
    function fe() {
      x("cleanup"), G.removeListener("close", ce), G.removeListener("finish", ve), G.removeListener("drain", K), G.removeListener("error", le), G.removeListener("unpipe", O), ae.removeListener("end", F), ae.removeListener("end", pe), ae.removeListener("data", oe), re = !0, se.awaitDrain && (!G._writableState || G._writableState.needDrain) && K();
    }
    ae.on("data", oe);
    function oe(de) {
      x("ondata");
      var Ne = G.write(de);
      x("dest.write", Ne), Ne === !1 && ((se.pipesCount === 1 && se.pipes === G || se.pipesCount > 1 && te(se.pipes, G) !== -1) && !re && (x("false write response, pause", se.awaitDrain), se.awaitDrain++), ae.pause());
    }
    function le(de) {
      x("onerror", de), pe(), G.removeListener("error", le), _(G, "error") === 0 && J(G, de);
    }
    ie(G, "error", le);
    function ce() {
      G.removeListener("finish", ve), pe();
    }
    G.once("close", ce);
    function ve() {
      x("onfinish"), G.removeListener("close", ce), pe();
    }
    G.once("finish", ve);
    function pe() {
      x("unpipe"), ae.unpipe(G);
    }
    return G.emit("pipe", ae), se.flowing || (x("pipe resume"), ae.resume()), G;
  };
  function w(G) {
    return function() {
      var ae = G._readableState;
      x("pipeOnDrain", ae.awaitDrain), ae.awaitDrain && ae.awaitDrain--, ae.awaitDrain === 0 && _(G, "data") && (ae.flowing = !0, z(G));
    };
  }
  ee.prototype.unpipe = function(G) {
    var W = this._readableState, ae = {
      hasUnpiped: !1
    };
    if (W.pipesCount === 0)
      return this;
    if (W.pipesCount === 1)
      return G && G !== W.pipes ? this : (G || (G = W.pipes), W.pipes = null, W.pipesCount = 0, W.flowing = !1, G && G.emit("unpipe", this, ae), this);
    if (!G) {
      var se = W.pipes, he = W.pipesCount;
      W.pipes = null, W.pipesCount = 0, W.flowing = !1;
      for (var Z = 0; Z < he; Z++)
        se[Z].emit("unpipe", this, {
          hasUnpiped: !1
        });
      return this;
    }
    var O = te(W.pipes, G);
    return O === -1 ? this : (W.pipes.splice(O, 1), W.pipesCount -= 1, W.pipesCount === 1 && (W.pipes = W.pipes[0]), G.emit("unpipe", this, ae), this);
  }, ee.prototype.on = function(G, W) {
    var ae = B.prototype.on.call(this, G, W), se = this._readableState;
    return G === "data" ? (se.readableListening = this.listenerCount("readable") > 0, se.flowing !== !1 && this.resume()) : G === "readable" && !se.endEmitted && !se.readableListening && (se.readableListening = se.needReadable = !0, se.flowing = !1, se.emittedReadable = !1, x("on readable", se.length, se.reading), se.length ? g(this) : se.reading || process$1.nextTick(T, this)), ae;
  }, ee.prototype.addListener = ee.prototype.on, ee.prototype.removeListener = function(G, W) {
    var ae = B.prototype.removeListener.call(this, G, W);
    return G === "readable" && process$1.nextTick(a, this), ae;
  }, ee.prototype.removeAllListeners = function(G) {
    var W = B.prototype.removeAllListeners.apply(this, arguments);
    return (G === "readable" || G === void 0) && process$1.nextTick(a, this), W;
  };
  function a(G) {
    var W = G._readableState;
    W.readableListening = G.listenerCount("readable") > 0, W.resumeScheduled && !W.paused ? W.flowing = !0 : G.listenerCount("data") > 0 && G.resume();
  }
  function T(G) {
    x("readable nexttick read 0"), G.read(0);
  }
  ee.prototype.resume = function() {
    var G = this._readableState;
    return G.flowing || (x("resume"), G.flowing = !G.readableListening, V(this, G)), G.paused = !1, this;
  };
  function V(G, W) {
    W.resumeScheduled || (W.resumeScheduled = !0, process$1.nextTick(Y, G, W));
  }
  function Y(G, W) {
    x("resume", W.reading), W.reading || G.read(0), W.resumeScheduled = !1, G.emit("resume"), z(G), W.flowing && !W.reading && G.read(0);
  }
  ee.prototype.pause = function() {
    return x("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (x("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this;
  };
  function z(G) {
    var W = G._readableState;
    for (x("flow", W.flowing); W.flowing && G.read() !== null; )
      ;
  }
  ee.prototype.wrap = function(G) {
    var W = this, ae = this._readableState, se = !1;
    G.on("end", function() {
      if (x("wrapped end"), ae.decoder && !ae.ended) {
        var O = ae.decoder.end();
        O && O.length && W.push(O);
      }
      W.push(null);
    }), G.on("data", function(O) {
      if (x("wrapped data"), ae.decoder && (O = ae.decoder.write(O)), !(ae.objectMode && O == null) && !(!ae.objectMode && (!O || !O.length))) {
        var F = W.push(O);
        F || (se = !0, G.pause());
      }
    });
    for (var he in G)
      this[he] === void 0 && typeof G[he] == "function" && (this[he] = /* @__PURE__ */ function(F) {
        return function() {
          return G[F].apply(G, arguments);
        };
      }(he));
    for (var Z = 0; Z < X.length; Z++)
      G.on(X[Z], this.emit.bind(this, X[Z]));
    return this._read = function(O) {
      x("wrapped _read", O), se && (se = !1, G.resume());
    }, this;
  }, typeof Symbol == "function" && (ee.prototype[Symbol.asyncIterator] = function() {
    return H === void 0 && (H = requireAsync_iterator()), H(this);
  }), Object.defineProperty(ee.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), Object.defineProperty(ee.prototype, "readableBuffer", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState && this._readableState.buffer;
    }
  }), Object.defineProperty(ee.prototype, "readableFlowing", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.flowing;
    },
    set: function(W) {
      this._readableState && (this._readableState.flowing = W);
    }
  }), ee._fromList = D, Object.defineProperty(ee.prototype, "readableLength", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.length;
    }
  });
  function D(G, W) {
    if (W.length === 0)
      return null;
    var ae;
    return W.objectMode ? ae = W.buffer.shift() : !G || G >= W.length ? (W.decoder ? ae = W.buffer.join("") : W.buffer.length === 1 ? ae = W.buffer.first() : ae = W.buffer.concat(W.length), W.buffer.clear()) : ae = W.buffer.consume(G, W.decoder), ae;
  }
  function N(G) {
    var W = G._readableState;
    x("endReadable", W.endEmitted), W.endEmitted || (W.ended = !0, process$1.nextTick(Q, W, G));
  }
  function Q(G, W) {
    if (x("endReadableNT", G.endEmitted, G.length), !G.endEmitted && G.length === 0 && (G.endEmitted = !0, W.readable = !1, W.emit("end"), G.autoDestroy)) {
      var ae = W._writableState;
      (!ae || ae.autoDestroy && ae.finished) && W.destroy();
    }
  }
  typeof Symbol == "function" && (ee.from = function(G, W) {
    return j === void 0 && (j = requireFromBrowser()), j(ee, G, W);
  });
  function te(G, W) {
    for (var ae = 0, se = G.length; ae < se; ae++)
      if (G[ae] === W)
        return ae;
    return -1;
  }
  return _stream_readable$1;
}
var _stream_transform$1, hasRequired_stream_transform$1;
function require_stream_transform$1() {
  if (hasRequired_stream_transform$1)
    return _stream_transform$1;
  hasRequired_stream_transform$1 = 1, _stream_transform$1 = d;
  var A = requireErrorsBrowser().codes, _ = A.ERR_METHOD_NOT_IMPLEMENTED, B = A.ERR_MULTIPLE_CALLBACK, M = A.ERR_TRANSFORM_ALREADY_TRANSFORMING, P = A.ERR_TRANSFORM_WITH_LENGTH_0, r = require_stream_duplex$1();
  requireInherits_browser()(d, r);
  function S(f, y) {
    var q = this._transformState;
    q.transforming = !1;
    var R = q.writecb;
    if (R === null)
      return this.emit("error", new B());
    q.writechunk = null, q.writecb = null, y != null && this.push(y), R(f);
    var I = this._readableState;
    I.reading = !1, (I.needReadable || I.length < I.highWaterMark) && this._read(I.highWaterMark);
  }
  function d(f) {
    if (!(this instanceof d))
      return new d(f);
    r.call(this, f), this._transformState = {
      afterTransform: S.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, f && (typeof f.transform == "function" && (this._transform = f.transform), typeof f.flush == "function" && (this._flush = f.flush)), this.on("prefinish", x);
  }
  function x() {
    var f = this;
    typeof this._flush == "function" && !this._readableState.destroyed ? this._flush(function(y, q) {
      m(f, y, q);
    }) : m(this, null, null);
  }
  d.prototype.push = function(f, y) {
    return this._transformState.needTransform = !1, r.prototype.push.call(this, f, y);
  }, d.prototype._transform = function(f, y, q) {
    q(new _("_transform()"));
  }, d.prototype._write = function(f, y, q) {
    var R = this._transformState;
    if (R.writecb = q, R.writechunk = f, R.writeencoding = y, !R.transforming) {
      var I = this._readableState;
      (R.needTransform || I.needReadable || I.length < I.highWaterMark) && this._read(I.highWaterMark);
    }
  }, d.prototype._read = function(f) {
    var y = this._transformState;
    y.writechunk !== null && !y.transforming ? (y.transforming = !0, this._transform(y.writechunk, y.writeencoding, y.afterTransform)) : y.needTransform = !0;
  }, d.prototype._destroy = function(f, y) {
    r.prototype._destroy.call(this, f, function(q) {
      y(q);
    });
  };
  function m(f, y, q) {
    if (y)
      return f.emit("error", y);
    if (q != null && f.push(q), f._writableState.length)
      throw new P();
    if (f._transformState.transforming)
      throw new M();
    return f.push(null);
  }
  return _stream_transform$1;
}
var _stream_passthrough$1, hasRequired_stream_passthrough$1;
function require_stream_passthrough$1() {
  if (hasRequired_stream_passthrough$1)
    return _stream_passthrough$1;
  hasRequired_stream_passthrough$1 = 1, _stream_passthrough$1 = _;
  var A = require_stream_transform$1();
  requireInherits_browser()(_, A);
  function _(B) {
    if (!(this instanceof _))
      return new _(B);
    A.call(this, B);
  }
  return _.prototype._transform = function(B, M, P) {
    P(null, B);
  }, _stream_passthrough$1;
}
var pipeline_1, hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline)
    return pipeline_1;
  hasRequiredPipeline = 1;
  var A;
  function _(q) {
    var R = !1;
    return function() {
      R || (R = !0, q.apply(void 0, arguments));
    };
  }
  var B = requireErrorsBrowser().codes, M = B.ERR_MISSING_ARGS, P = B.ERR_STREAM_DESTROYED;
  function r(q) {
    if (q)
      throw q;
  }
  function S(q) {
    return q.setHeader && typeof q.abort == "function";
  }
  function d(q, R, I, k) {
    k = _(k);
    var $ = !1;
    q.on("close", function() {
      $ = !0;
    }), A === void 0 && (A = requireEndOfStream()), A(q, {
      readable: R,
      writable: I
    }, function(L) {
      if (L)
        return k(L);
      $ = !0, k();
    });
    var C = !1;
    return function(L) {
      if (!$ && !C) {
        if (C = !0, S(q))
          return q.abort();
        if (typeof q.destroy == "function")
          return q.destroy();
        k(L || new P("pipe"));
      }
    };
  }
  function x(q) {
    q();
  }
  function m(q, R) {
    return q.pipe(R);
  }
  function f(q) {
    return !q.length || typeof q[q.length - 1] != "function" ? r : q.pop();
  }
  function y() {
    for (var q = arguments.length, R = new Array(q), I = 0; I < q; I++)
      R[I] = arguments[I];
    var k = f(R);
    if (Array.isArray(R[0]) && (R = R[0]), R.length < 2)
      throw new M("streams");
    var $, C = R.map(function(L, H) {
      var j = H < R.length - 1, J = H > 0;
      return d(L, j, J, function(X) {
        $ || ($ = X), X && C.forEach(x), !j && (C.forEach(x), k($));
      });
    });
    return R.reduce(m);
  }
  return pipeline_1 = y, pipeline_1;
}
var hasRequiredReadableBrowser$1;
function requireReadableBrowser$1() {
  return hasRequiredReadableBrowser$1 || (hasRequiredReadableBrowser$1 = 1, function(A, _) {
    _ = A.exports = require_stream_readable$1(), _.Stream = _, _.Readable = _, _.Writable = require_stream_writable$1(), _.Duplex = require_stream_duplex$1(), _.Transform = require_stream_transform$1(), _.PassThrough = require_stream_passthrough$1(), _.finished = requireEndOfStream(), _.pipeline = requirePipeline();
  }(readableBrowser$1, readableBrowser$1.exports)), readableBrowser$1.exports;
}
var hashBase$1, hasRequiredHashBase$1;
function requireHashBase$1() {
  if (hasRequiredHashBase$1)
    return hashBase$1;
  hasRequiredHashBase$1 = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireReadableBrowser$1().Transform, B = requireInherits_browser();
  function M(r, S) {
    if (!A.isBuffer(r) && typeof r != "string")
      throw new TypeError(S + " must be a string or a buffer");
  }
  function P(r) {
    _.call(this), this._block = A.allocUnsafe(r), this._blockSize = r, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return B(P, _), P.prototype._transform = function(r, S, d) {
    var x = null;
    try {
      this.update(r, S);
    } catch (m) {
      x = m;
    }
    d(x);
  }, P.prototype._flush = function(r) {
    var S = null;
    try {
      this.push(this.digest());
    } catch (d) {
      S = d;
    }
    r(S);
  }, P.prototype.update = function(r, S) {
    if (M(r, "Data"), this._finalized)
      throw new Error("Digest already called");
    A.isBuffer(r) || (r = A.from(r, S));
    for (var d = this._block, x = 0; this._blockOffset + r.length - x >= this._blockSize; ) {
      for (var m = this._blockOffset; m < this._blockSize; )
        d[m++] = r[x++];
      this._update(), this._blockOffset = 0;
    }
    for (; x < r.length; )
      d[this._blockOffset++] = r[x++];
    for (var f = 0, y = r.length * 8; y > 0; ++f)
      this._length[f] += y, y = this._length[f] / 4294967296 | 0, y > 0 && (this._length[f] -= 4294967296 * y);
    return this;
  }, P.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, P.prototype.digest = function(r) {
    if (this._finalized)
      throw new Error("Digest already called");
    this._finalized = !0;
    var S = this._digest();
    r !== void 0 && (S = S.toString(r)), this._block.fill(0), this._blockOffset = 0;
    for (var d = 0; d < 4; ++d)
      this._length[d] = 0;
    return S;
  }, P.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase$1 = P, hashBase$1;
}
var md5_js, hasRequiredMd5_js;
function requireMd5_js() {
  if (hasRequiredMd5_js)
    return md5_js;
  hasRequiredMd5_js = 1;
  var A = requireInherits_browser(), _ = requireHashBase$1(), B = requireSafeBuffer$1().Buffer, M = new Array(16);
  function P() {
    _.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878;
  }
  A(P, _), P.prototype._update = function() {
    for (var f = M, y = 0; y < 16; ++y)
      f[y] = this._block.readInt32LE(y * 4);
    var q = this._a, R = this._b, I = this._c, k = this._d;
    q = S(q, R, I, k, f[0], 3614090360, 7), k = S(k, q, R, I, f[1], 3905402710, 12), I = S(I, k, q, R, f[2], 606105819, 17), R = S(R, I, k, q, f[3], 3250441966, 22), q = S(q, R, I, k, f[4], 4118548399, 7), k = S(k, q, R, I, f[5], 1200080426, 12), I = S(I, k, q, R, f[6], 2821735955, 17), R = S(R, I, k, q, f[7], 4249261313, 22), q = S(q, R, I, k, f[8], 1770035416, 7), k = S(k, q, R, I, f[9], 2336552879, 12), I = S(I, k, q, R, f[10], 4294925233, 17), R = S(R, I, k, q, f[11], 2304563134, 22), q = S(q, R, I, k, f[12], 1804603682, 7), k = S(k, q, R, I, f[13], 4254626195, 12), I = S(I, k, q, R, f[14], 2792965006, 17), R = S(R, I, k, q, f[15], 1236535329, 22), q = d(q, R, I, k, f[1], 4129170786, 5), k = d(k, q, R, I, f[6], 3225465664, 9), I = d(I, k, q, R, f[11], 643717713, 14), R = d(R, I, k, q, f[0], 3921069994, 20), q = d(q, R, I, k, f[5], 3593408605, 5), k = d(k, q, R, I, f[10], 38016083, 9), I = d(I, k, q, R, f[15], 3634488961, 14), R = d(R, I, k, q, f[4], 3889429448, 20), q = d(q, R, I, k, f[9], 568446438, 5), k = d(k, q, R, I, f[14], 3275163606, 9), I = d(I, k, q, R, f[3], 4107603335, 14), R = d(R, I, k, q, f[8], 1163531501, 20), q = d(q, R, I, k, f[13], 2850285829, 5), k = d(k, q, R, I, f[2], 4243563512, 9), I = d(I, k, q, R, f[7], 1735328473, 14), R = d(R, I, k, q, f[12], 2368359562, 20), q = x(q, R, I, k, f[5], 4294588738, 4), k = x(k, q, R, I, f[8], 2272392833, 11), I = x(I, k, q, R, f[11], 1839030562, 16), R = x(R, I, k, q, f[14], 4259657740, 23), q = x(q, R, I, k, f[1], 2763975236, 4), k = x(k, q, R, I, f[4], 1272893353, 11), I = x(I, k, q, R, f[7], 4139469664, 16), R = x(R, I, k, q, f[10], 3200236656, 23), q = x(q, R, I, k, f[13], 681279174, 4), k = x(k, q, R, I, f[0], 3936430074, 11), I = x(I, k, q, R, f[3], 3572445317, 16), R = x(R, I, k, q, f[6], 76029189, 23), q = x(q, R, I, k, f[9], 3654602809, 4), k = x(k, q, R, I, f[12], 3873151461, 11), I = x(I, k, q, R, f[15], 530742520, 16), R = x(R, I, k, q, f[2], 3299628645, 23), q = m(q, R, I, k, f[0], 4096336452, 6), k = m(k, q, R, I, f[7], 1126891415, 10), I = m(I, k, q, R, f[14], 2878612391, 15), R = m(R, I, k, q, f[5], 4237533241, 21), q = m(q, R, I, k, f[12], 1700485571, 6), k = m(k, q, R, I, f[3], 2399980690, 10), I = m(I, k, q, R, f[10], 4293915773, 15), R = m(R, I, k, q, f[1], 2240044497, 21), q = m(q, R, I, k, f[8], 1873313359, 6), k = m(k, q, R, I, f[15], 4264355552, 10), I = m(I, k, q, R, f[6], 2734768916, 15), R = m(R, I, k, q, f[13], 1309151649, 21), q = m(q, R, I, k, f[4], 4149444226, 6), k = m(k, q, R, I, f[11], 3174756917, 10), I = m(I, k, q, R, f[2], 718787259, 15), R = m(R, I, k, q, f[9], 3951481745, 21), this._a = this._a + q | 0, this._b = this._b + R | 0, this._c = this._c + I | 0, this._d = this._d + k | 0;
  }, P.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var f = B.allocUnsafe(16);
    return f.writeInt32LE(this._a, 0), f.writeInt32LE(this._b, 4), f.writeInt32LE(this._c, 8), f.writeInt32LE(this._d, 12), f;
  };
  function r(f, y) {
    return f << y | f >>> 32 - y;
  }
  function S(f, y, q, R, I, k, $) {
    return r(f + (y & q | ~y & R) + I + k | 0, $) + y | 0;
  }
  function d(f, y, q, R, I, k, $) {
    return r(f + (y & R | q & ~R) + I + k | 0, $) + y | 0;
  }
  function x(f, y, q, R, I, k, $) {
    return r(f + (y ^ q ^ R) + I + k | 0, $) + y | 0;
  }
  function m(f, y, q, R, I, k, $) {
    return r(f + (q ^ (y | ~R)) + I + k | 0, $) + y | 0;
  }
  return md5_js = P, md5_js;
}
var hashBase, hasRequiredHashBase;
function requireHashBase() {
  if (hasRequiredHashBase)
    return hashBase;
  hasRequiredHashBase = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireReadableBrowser$1().Transform, B = requireInherits_browser();
  function M(r, S) {
    if (!A.isBuffer(r) && typeof r != "string")
      throw new TypeError(S + " must be a string or a buffer");
  }
  function P(r) {
    _.call(this), this._block = A.allocUnsafe(r), this._blockSize = r, this._blockOffset = 0, this._length = [0, 0, 0, 0], this._finalized = !1;
  }
  return B(P, _), P.prototype._transform = function(r, S, d) {
    var x = null;
    try {
      this.update(r, S);
    } catch (m) {
      x = m;
    }
    d(x);
  }, P.prototype._flush = function(r) {
    var S = null;
    try {
      this.push(this.digest());
    } catch (d) {
      S = d;
    }
    r(S);
  }, P.prototype.update = function(r, S) {
    if (M(r, "Data"), this._finalized)
      throw new Error("Digest already called");
    A.isBuffer(r) || (r = A.from(r, S));
    for (var d = this._block, x = 0; this._blockOffset + r.length - x >= this._blockSize; ) {
      for (var m = this._blockOffset; m < this._blockSize; )
        d[m++] = r[x++];
      this._update(), this._blockOffset = 0;
    }
    for (; x < r.length; )
      d[this._blockOffset++] = r[x++];
    for (var f = 0, y = r.length * 8; y > 0; ++f)
      this._length[f] += y, y = this._length[f] / 4294967296 | 0, y > 0 && (this._length[f] -= 4294967296 * y);
    return this;
  }, P.prototype._update = function() {
    throw new Error("_update is not implemented");
  }, P.prototype.digest = function(r) {
    if (this._finalized)
      throw new Error("Digest already called");
    this._finalized = !0;
    var S = this._digest();
    r !== void 0 && (S = S.toString(r)), this._block.fill(0), this._blockOffset = 0;
    for (var d = 0; d < 4; ++d)
      this._length[d] = 0;
    return S;
  }, P.prototype._digest = function() {
    throw new Error("_digest is not implemented");
  }, hashBase = P, hashBase;
}
var ripemd160, hasRequiredRipemd160;
function requireRipemd160() {
  if (hasRequiredRipemd160)
    return ripemd160;
  hasRequiredRipemd160 = 1;
  var A = requireBuffer$1().Buffer, _ = requireInherits_browser(), B = requireHashBase(), M = new Array(16), P = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], r = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], S = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], d = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ], x = [0, 1518500249, 1859775393, 2400959708, 2840853838], m = [1352829926, 1548603684, 1836072691, 2053994217, 0];
  function f() {
    B.call(this, 64), this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520;
  }
  _(f, B), f.prototype._update = function() {
    for (var C = M, L = 0; L < 16; ++L)
      C[L] = this._block.readInt32LE(L * 4);
    for (var H = this._a | 0, j = this._b | 0, J = this._c | 0, X = this._d | 0, ie = this._e | 0, ne = this._a | 0, ee = this._b | 0, ue = this._c | 0, U = this._d | 0, E = this._e | 0, o = 0; o < 80; o += 1) {
      var e, t;
      o < 16 ? (e = q(H, j, J, X, ie, C[P[o]], x[0], S[o]), t = $(ne, ee, ue, U, E, C[r[o]], m[0], d[o])) : o < 32 ? (e = R(H, j, J, X, ie, C[P[o]], x[1], S[o]), t = k(ne, ee, ue, U, E, C[r[o]], m[1], d[o])) : o < 48 ? (e = I(H, j, J, X, ie, C[P[o]], x[2], S[o]), t = I(ne, ee, ue, U, E, C[r[o]], m[2], d[o])) : o < 64 ? (e = k(H, j, J, X, ie, C[P[o]], x[3], S[o]), t = R(ne, ee, ue, U, E, C[r[o]], m[3], d[o])) : (e = $(H, j, J, X, ie, C[P[o]], x[4], S[o]), t = q(ne, ee, ue, U, E, C[r[o]], m[4], d[o])), H = ie, ie = X, X = y(J, 10), J = j, j = e, ne = E, E = U, U = y(ue, 10), ue = ee, ee = t;
    }
    var v = this._b + J + U | 0;
    this._b = this._c + X + E | 0, this._c = this._d + ie + ne | 0, this._d = this._e + H + ee | 0, this._e = this._a + j + ue | 0, this._a = v;
  }, f.prototype._digest = function() {
    this._block[this._blockOffset++] = 128, this._blockOffset > 56 && (this._block.fill(0, this._blockOffset, 64), this._update(), this._blockOffset = 0), this._block.fill(0, this._blockOffset, 56), this._block.writeUInt32LE(this._length[0], 56), this._block.writeUInt32LE(this._length[1], 60), this._update();
    var C = A.alloc ? A.alloc(20) : new A(20);
    return C.writeInt32LE(this._a, 0), C.writeInt32LE(this._b, 4), C.writeInt32LE(this._c, 8), C.writeInt32LE(this._d, 12), C.writeInt32LE(this._e, 16), C;
  };
  function y(C, L) {
    return C << L | C >>> 32 - L;
  }
  function q(C, L, H, j, J, X, ie, ne) {
    return y(C + (L ^ H ^ j) + X + ie | 0, ne) + J | 0;
  }
  function R(C, L, H, j, J, X, ie, ne) {
    return y(C + (L & H | ~L & j) + X + ie | 0, ne) + J | 0;
  }
  function I(C, L, H, j, J, X, ie, ne) {
    return y(C + ((L | ~H) ^ j) + X + ie | 0, ne) + J | 0;
  }
  function k(C, L, H, j, J, X, ie, ne) {
    return y(C + (L & j | H & ~j) + X + ie | 0, ne) + J | 0;
  }
  function $(C, L, H, j, J, X, ie, ne) {
    return y(C + (L ^ (H | ~j)) + X + ie | 0, ne) + J | 0;
  }
  return ripemd160 = f, ripemd160;
}
var sha_js = { exports: {} }, hash$1, hasRequiredHash$1;
function requireHash$1() {
  if (hasRequiredHash$1)
    return hash$1;
  hasRequiredHash$1 = 1;
  var A = requireSafeBuffer$1().Buffer;
  function _(B, M) {
    this._block = A.alloc(B), this._finalSize = M, this._blockSize = B, this._len = 0;
  }
  return _.prototype.update = function(B, M) {
    typeof B == "string" && (M = M || "utf8", B = A.from(B, M));
    for (var P = this._block, r = this._blockSize, S = B.length, d = this._len, x = 0; x < S; ) {
      for (var m = d % r, f = Math.min(S - x, r - m), y = 0; y < f; y++)
        P[m + y] = B[x + y];
      d += f, x += f, d % r === 0 && this._update(P);
    }
    return this._len += S, this;
  }, _.prototype.digest = function(B) {
    var M = this._len % this._blockSize;
    this._block[M] = 128, this._block.fill(0, M + 1), M >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var P = this._len * 8;
    if (P <= 4294967295)
      this._block.writeUInt32BE(P, this._blockSize - 4);
    else {
      var r = (P & 4294967295) >>> 0, S = (P - r) / 4294967296;
      this._block.writeUInt32BE(S, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4);
    }
    this._update(this._block);
    var d = this._hash();
    return B ? d.toString(B) : d;
  }, _.prototype._update = function() {
    throw new Error("_update must be implemented by subclass");
  }, hash$1 = _, hash$1;
}
var sha$1, hasRequiredSha$1;
function requireSha$1() {
  if (hasRequiredSha$1)
    return sha$1;
  hasRequiredSha$1 = 1;
  var A = requireInherits_browser(), _ = requireHash$1(), B = requireSafeBuffer$1().Buffer, M = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], P = new Array(80);
  function r() {
    this.init(), this._w = P, _.call(this, 64, 56);
  }
  A(r, _), r.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function S(m) {
    return m << 5 | m >>> 27;
  }
  function d(m) {
    return m << 30 | m >>> 2;
  }
  function x(m, f, y, q) {
    return m === 0 ? f & y | ~f & q : m === 2 ? f & y | f & q | y & q : f ^ y ^ q;
  }
  return r.prototype._update = function(m) {
    for (var f = this._w, y = this._a | 0, q = this._b | 0, R = this._c | 0, I = this._d | 0, k = this._e | 0, $ = 0; $ < 16; ++$)
      f[$] = m.readInt32BE($ * 4);
    for (; $ < 80; ++$)
      f[$] = f[$ - 3] ^ f[$ - 8] ^ f[$ - 14] ^ f[$ - 16];
    for (var C = 0; C < 80; ++C) {
      var L = ~~(C / 20), H = S(y) + x(L, q, R, I) + k + f[C] + M[L] | 0;
      k = I, I = R, R = d(q), q = y, y = H;
    }
    this._a = y + this._a | 0, this._b = q + this._b | 0, this._c = R + this._c | 0, this._d = I + this._d | 0, this._e = k + this._e | 0;
  }, r.prototype._hash = function() {
    var m = B.allocUnsafe(20);
    return m.writeInt32BE(this._a | 0, 0), m.writeInt32BE(this._b | 0, 4), m.writeInt32BE(this._c | 0, 8), m.writeInt32BE(this._d | 0, 12), m.writeInt32BE(this._e | 0, 16), m;
  }, sha$1 = r, sha$1;
}
var sha1, hasRequiredSha1;
function requireSha1() {
  if (hasRequiredSha1)
    return sha1;
  hasRequiredSha1 = 1;
  var A = requireInherits_browser(), _ = requireHash$1(), B = requireSafeBuffer$1().Buffer, M = [
    1518500249,
    1859775393,
    -1894007588,
    -899497514
  ], P = new Array(80);
  function r() {
    this.init(), this._w = P, _.call(this, 64, 56);
  }
  A(r, _), r.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function S(f) {
    return f << 1 | f >>> 31;
  }
  function d(f) {
    return f << 5 | f >>> 27;
  }
  function x(f) {
    return f << 30 | f >>> 2;
  }
  function m(f, y, q, R) {
    return f === 0 ? y & q | ~y & R : f === 2 ? y & q | y & R | q & R : y ^ q ^ R;
  }
  return r.prototype._update = function(f) {
    for (var y = this._w, q = this._a | 0, R = this._b | 0, I = this._c | 0, k = this._d | 0, $ = this._e | 0, C = 0; C < 16; ++C)
      y[C] = f.readInt32BE(C * 4);
    for (; C < 80; ++C)
      y[C] = S(y[C - 3] ^ y[C - 8] ^ y[C - 14] ^ y[C - 16]);
    for (var L = 0; L < 80; ++L) {
      var H = ~~(L / 20), j = d(q) + m(H, R, I, k) + $ + y[L] + M[H] | 0;
      $ = k, k = I, I = x(R), R = q, q = j;
    }
    this._a = q + this._a | 0, this._b = R + this._b | 0, this._c = I + this._c | 0, this._d = k + this._d | 0, this._e = $ + this._e | 0;
  }, r.prototype._hash = function() {
    var f = B.allocUnsafe(20);
    return f.writeInt32BE(this._a | 0, 0), f.writeInt32BE(this._b | 0, 4), f.writeInt32BE(this._c | 0, 8), f.writeInt32BE(this._d | 0, 12), f.writeInt32BE(this._e | 0, 16), f;
  }, sha1 = r, sha1;
}
var sha256$1, hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256)
    return sha256$1;
  hasRequiredSha256 = 1;
  var A = requireInherits_browser(), _ = requireHash$1(), B = requireSafeBuffer$1().Buffer, M = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ], P = new Array(64);
  function r() {
    this.init(), this._w = P, _.call(this, 64, 56);
  }
  A(r, _), r.prototype.init = function() {
    return this._a = 1779033703, this._b = 3144134277, this._c = 1013904242, this._d = 2773480762, this._e = 1359893119, this._f = 2600822924, this._g = 528734635, this._h = 1541459225, this;
  };
  function S(q, R, I) {
    return I ^ q & (R ^ I);
  }
  function d(q, R, I) {
    return q & R | I & (q | R);
  }
  function x(q) {
    return (q >>> 2 | q << 30) ^ (q >>> 13 | q << 19) ^ (q >>> 22 | q << 10);
  }
  function m(q) {
    return (q >>> 6 | q << 26) ^ (q >>> 11 | q << 21) ^ (q >>> 25 | q << 7);
  }
  function f(q) {
    return (q >>> 7 | q << 25) ^ (q >>> 18 | q << 14) ^ q >>> 3;
  }
  function y(q) {
    return (q >>> 17 | q << 15) ^ (q >>> 19 | q << 13) ^ q >>> 10;
  }
  return r.prototype._update = function(q) {
    for (var R = this._w, I = this._a | 0, k = this._b | 0, $ = this._c | 0, C = this._d | 0, L = this._e | 0, H = this._f | 0, j = this._g | 0, J = this._h | 0, X = 0; X < 16; ++X)
      R[X] = q.readInt32BE(X * 4);
    for (; X < 64; ++X)
      R[X] = y(R[X - 2]) + R[X - 7] + f(R[X - 15]) + R[X - 16] | 0;
    for (var ie = 0; ie < 64; ++ie) {
      var ne = J + m(L) + S(L, H, j) + M[ie] + R[ie] | 0, ee = x(I) + d(I, k, $) | 0;
      J = j, j = H, H = L, L = C + ne | 0, C = $, $ = k, k = I, I = ne + ee | 0;
    }
    this._a = I + this._a | 0, this._b = k + this._b | 0, this._c = $ + this._c | 0, this._d = C + this._d | 0, this._e = L + this._e | 0, this._f = H + this._f | 0, this._g = j + this._g | 0, this._h = J + this._h | 0;
  }, r.prototype._hash = function() {
    var q = B.allocUnsafe(32);
    return q.writeInt32BE(this._a, 0), q.writeInt32BE(this._b, 4), q.writeInt32BE(this._c, 8), q.writeInt32BE(this._d, 12), q.writeInt32BE(this._e, 16), q.writeInt32BE(this._f, 20), q.writeInt32BE(this._g, 24), q.writeInt32BE(this._h, 28), q;
  }, sha256$1 = r, sha256$1;
}
var sha224$1, hasRequiredSha224;
function requireSha224() {
  if (hasRequiredSha224)
    return sha224$1;
  hasRequiredSha224 = 1;
  var A = requireInherits_browser(), _ = requireSha256(), B = requireHash$1(), M = requireSafeBuffer$1().Buffer, P = new Array(64);
  function r() {
    this.init(), this._w = P, B.call(this, 64, 56);
  }
  return A(r, _), r.prototype.init = function() {
    return this._a = 3238371032, this._b = 914150663, this._c = 812702999, this._d = 4144912697, this._e = 4290775857, this._f = 1750603025, this._g = 1694076839, this._h = 3204075428, this;
  }, r.prototype._hash = function() {
    var S = M.allocUnsafe(28);
    return S.writeInt32BE(this._a, 0), S.writeInt32BE(this._b, 4), S.writeInt32BE(this._c, 8), S.writeInt32BE(this._d, 12), S.writeInt32BE(this._e, 16), S.writeInt32BE(this._f, 20), S.writeInt32BE(this._g, 24), S;
  }, sha224$1 = r, sha224$1;
}
var sha512$1, hasRequiredSha512;
function requireSha512() {
  if (hasRequiredSha512)
    return sha512$1;
  hasRequiredSha512 = 1;
  var A = requireInherits_browser(), _ = requireHash$1(), B = requireSafeBuffer$1().Buffer, M = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ], P = new Array(160);
  function r() {
    this.init(), this._w = P, _.call(this, 128, 112);
  }
  A(r, _), r.prototype.init = function() {
    return this._ah = 1779033703, this._bh = 3144134277, this._ch = 1013904242, this._dh = 2773480762, this._eh = 1359893119, this._fh = 2600822924, this._gh = 528734635, this._hh = 1541459225, this._al = 4089235720, this._bl = 2227873595, this._cl = 4271175723, this._dl = 1595750129, this._el = 2917565137, this._fl = 725511199, this._gl = 4215389547, this._hl = 327033209, this;
  };
  function S(k, $, C) {
    return C ^ k & ($ ^ C);
  }
  function d(k, $, C) {
    return k & $ | C & (k | $);
  }
  function x(k, $) {
    return (k >>> 28 | $ << 4) ^ ($ >>> 2 | k << 30) ^ ($ >>> 7 | k << 25);
  }
  function m(k, $) {
    return (k >>> 14 | $ << 18) ^ (k >>> 18 | $ << 14) ^ ($ >>> 9 | k << 23);
  }
  function f(k, $) {
    return (k >>> 1 | $ << 31) ^ (k >>> 8 | $ << 24) ^ k >>> 7;
  }
  function y(k, $) {
    return (k >>> 1 | $ << 31) ^ (k >>> 8 | $ << 24) ^ (k >>> 7 | $ << 25);
  }
  function q(k, $) {
    return (k >>> 19 | $ << 13) ^ ($ >>> 29 | k << 3) ^ k >>> 6;
  }
  function R(k, $) {
    return (k >>> 19 | $ << 13) ^ ($ >>> 29 | k << 3) ^ (k >>> 6 | $ << 26);
  }
  function I(k, $) {
    return k >>> 0 < $ >>> 0 ? 1 : 0;
  }
  return r.prototype._update = function(k) {
    for (var $ = this._w, C = this._ah | 0, L = this._bh | 0, H = this._ch | 0, j = this._dh | 0, J = this._eh | 0, X = this._fh | 0, ie = this._gh | 0, ne = this._hh | 0, ee = this._al | 0, ue = this._bl | 0, U = this._cl | 0, E = this._dl | 0, o = this._el | 0, e = this._fl | 0, t = this._gl | 0, v = this._hl | 0, g = 0; g < 32; g += 2)
      $[g] = k.readInt32BE(g * 4), $[g + 1] = k.readInt32BE(g * 4 + 4);
    for (; g < 160; g += 2) {
      var h = $[g - 30], b = $[g - 15 * 2 + 1], p = f(h, b), w = y(b, h);
      h = $[g - 2 * 2], b = $[g - 2 * 2 + 1];
      var a = q(h, b), T = R(b, h), V = $[g - 7 * 2], Y = $[g - 7 * 2 + 1], z = $[g - 16 * 2], D = $[g - 16 * 2 + 1], N = w + Y | 0, Q = p + V + I(N, w) | 0;
      N = N + T | 0, Q = Q + a + I(N, T) | 0, N = N + D | 0, Q = Q + z + I(N, D) | 0, $[g] = Q, $[g + 1] = N;
    }
    for (var te = 0; te < 160; te += 2) {
      Q = $[te], N = $[te + 1];
      var G = d(C, L, H), W = d(ee, ue, U), ae = x(C, ee), se = x(ee, C), he = m(J, o), Z = m(o, J), O = M[te], F = M[te + 1], K = S(J, X, ie), re = S(o, e, t), fe = v + Z | 0, oe = ne + he + I(fe, v) | 0;
      fe = fe + re | 0, oe = oe + K + I(fe, re) | 0, fe = fe + F | 0, oe = oe + O + I(fe, F) | 0, fe = fe + N | 0, oe = oe + Q + I(fe, N) | 0;
      var le = se + W | 0, ce = ae + G + I(le, se) | 0;
      ne = ie, v = t, ie = X, t = e, X = J, e = o, o = E + fe | 0, J = j + oe + I(o, E) | 0, j = H, E = U, H = L, U = ue, L = C, ue = ee, ee = fe + le | 0, C = oe + ce + I(ee, fe) | 0;
    }
    this._al = this._al + ee | 0, this._bl = this._bl + ue | 0, this._cl = this._cl + U | 0, this._dl = this._dl + E | 0, this._el = this._el + o | 0, this._fl = this._fl + e | 0, this._gl = this._gl + t | 0, this._hl = this._hl + v | 0, this._ah = this._ah + C + I(this._al, ee) | 0, this._bh = this._bh + L + I(this._bl, ue) | 0, this._ch = this._ch + H + I(this._cl, U) | 0, this._dh = this._dh + j + I(this._dl, E) | 0, this._eh = this._eh + J + I(this._el, o) | 0, this._fh = this._fh + X + I(this._fl, e) | 0, this._gh = this._gh + ie + I(this._gl, t) | 0, this._hh = this._hh + ne + I(this._hl, v) | 0;
  }, r.prototype._hash = function() {
    var k = B.allocUnsafe(64);
    function $(C, L, H) {
      k.writeInt32BE(C, H), k.writeInt32BE(L, H + 4);
    }
    return $(this._ah, this._al, 0), $(this._bh, this._bl, 8), $(this._ch, this._cl, 16), $(this._dh, this._dl, 24), $(this._eh, this._el, 32), $(this._fh, this._fl, 40), $(this._gh, this._gl, 48), $(this._hh, this._hl, 56), k;
  }, sha512$1 = r, sha512$1;
}
var sha384$1, hasRequiredSha384;
function requireSha384() {
  if (hasRequiredSha384)
    return sha384$1;
  hasRequiredSha384 = 1;
  var A = requireInherits_browser(), _ = requireSha512(), B = requireHash$1(), M = requireSafeBuffer$1().Buffer, P = new Array(160);
  function r() {
    this.init(), this._w = P, B.call(this, 128, 112);
  }
  return A(r, _), r.prototype.init = function() {
    return this._ah = 3418070365, this._bh = 1654270250, this._ch = 2438529370, this._dh = 355462360, this._eh = 1731405415, this._fh = 2394180231, this._gh = 3675008525, this._hh = 1203062813, this._al = 3238371032, this._bl = 914150663, this._cl = 812702999, this._dl = 4144912697, this._el = 4290775857, this._fl = 1750603025, this._gl = 1694076839, this._hl = 3204075428, this;
  }, r.prototype._hash = function() {
    var S = M.allocUnsafe(48);
    function d(x, m, f) {
      S.writeInt32BE(x, f), S.writeInt32BE(m, f + 4);
    }
    return d(this._ah, this._al, 0), d(this._bh, this._bl, 8), d(this._ch, this._cl, 16), d(this._dh, this._dl, 24), d(this._eh, this._el, 32), d(this._fh, this._fl, 40), S;
  }, sha384$1 = r, sha384$1;
}
var hasRequiredSha_js;
function requireSha_js() {
  if (hasRequiredSha_js)
    return sha_js.exports;
  hasRequiredSha_js = 1;
  var A = sha_js.exports = function(B) {
    B = B.toLowerCase();
    var M = A[B];
    if (!M)
      throw new Error(B + " is not supported (we accept pull requests)");
    return new M();
  };
  return A.sha = requireSha$1(), A.sha1 = requireSha1(), A.sha224 = requireSha224(), A.sha256 = requireSha256(), A.sha384 = requireSha384(), A.sha512 = requireSha512(), sha_js.exports;
}
var streamBrowserify, hasRequiredStreamBrowserify;
function requireStreamBrowserify() {
  if (hasRequiredStreamBrowserify)
    return streamBrowserify;
  hasRequiredStreamBrowserify = 1, streamBrowserify = B;
  var A = requireEvents().EventEmitter, _ = requireInherits_browser();
  _(B, A), B.Readable = require_stream_readable$1(), B.Writable = require_stream_writable$1(), B.Duplex = require_stream_duplex$1(), B.Transform = require_stream_transform$1(), B.PassThrough = require_stream_passthrough$1(), B.finished = requireEndOfStream(), B.pipeline = requirePipeline(), B.Stream = B;
  function B() {
    A.call(this);
  }
  return B.prototype.pipe = function(M, P) {
    var r = this;
    function S(R) {
      M.writable && M.write(R) === !1 && r.pause && r.pause();
    }
    r.on("data", S);
    function d() {
      r.readable && r.resume && r.resume();
    }
    M.on("drain", d), !M._isStdio && (!P || P.end !== !1) && (r.on("end", m), r.on("close", f));
    var x = !1;
    function m() {
      x || (x = !0, M.end());
    }
    function f() {
      x || (x = !0, typeof M.destroy == "function" && M.destroy());
    }
    function y(R) {
      if (q(), A.listenerCount(this, "error") === 0)
        throw R;
    }
    r.on("error", y), M.on("error", y);
    function q() {
      r.removeListener("data", S), M.removeListener("drain", d), r.removeListener("end", m), r.removeListener("close", f), r.removeListener("error", y), M.removeListener("error", y), r.removeListener("end", q), r.removeListener("close", q), M.removeListener("close", q);
    }
    return r.on("end", q), r.on("close", q), M.on("close", q), M.emit("pipe", r), M;
  }, streamBrowserify;
}
var cipherBase, hasRequiredCipherBase;
function requireCipherBase() {
  if (hasRequiredCipherBase)
    return cipherBase;
  hasRequiredCipherBase = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireStreamBrowserify().Transform, B = requireString_decoder().StringDecoder, M = requireInherits_browser();
  function P(r) {
    _.call(this), this.hashMode = typeof r == "string", this.hashMode ? this[r] = this._finalOrDigest : this.final = this._finalOrDigest, this._final && (this.__final = this._final, this._final = null), this._decoder = null, this._encoding = null;
  }
  return M(P, _), P.prototype.update = function(r, S, d) {
    typeof r == "string" && (r = A.from(r, S));
    var x = this._update(r);
    return this.hashMode ? this : (d && (x = this._toString(x, d)), x);
  }, P.prototype.setAutoPadding = function() {
  }, P.prototype.getAuthTag = function() {
    throw new Error("trying to get auth tag in unsupported state");
  }, P.prototype.setAuthTag = function() {
    throw new Error("trying to set auth tag in unsupported state");
  }, P.prototype.setAAD = function() {
    throw new Error("trying to set aad in unsupported state");
  }, P.prototype._transform = function(r, S, d) {
    var x;
    try {
      this.hashMode ? this._update(r) : this.push(this._update(r));
    } catch (m) {
      x = m;
    } finally {
      d(x);
    }
  }, P.prototype._flush = function(r) {
    var S;
    try {
      this.push(this.__final());
    } catch (d) {
      S = d;
    }
    r(S);
  }, P.prototype._finalOrDigest = function(r) {
    var S = this.__final() || A.alloc(0);
    return r && (S = this._toString(S, r, !0)), S;
  }, P.prototype._toString = function(r, S, d) {
    if (this._decoder || (this._decoder = new B(S), this._encoding = S), this._encoding !== S)
      throw new Error("can't switch encodings");
    var x = this._decoder.write(r);
    return d && (x += this._decoder.end()), x;
  }, cipherBase = P, cipherBase;
}
var browser$9, hasRequiredBrowser$9;
function requireBrowser$9() {
  if (hasRequiredBrowser$9)
    return browser$9;
  hasRequiredBrowser$9 = 1;
  var A = requireInherits_browser(), _ = requireMd5_js(), B = requireRipemd160(), M = requireSha_js(), P = requireCipherBase();
  function r(S) {
    P.call(this, "digest"), this._hash = S;
  }
  return A(r, P), r.prototype._update = function(S) {
    this._hash.update(S);
  }, r.prototype._final = function() {
    return this._hash.digest();
  }, browser$9 = function(d) {
    return d = d.toLowerCase(), d === "md5" ? new _() : d === "rmd160" || d === "ripemd160" ? new B() : new r(M(d));
  }, browser$9;
}
var legacy, hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy)
    return legacy;
  hasRequiredLegacy = 1;
  var A = requireInherits_browser(), _ = requireSafeBuffer$1().Buffer, B = requireCipherBase(), M = _.alloc(128), P = 64;
  function r(S, d) {
    B.call(this, "digest"), typeof d == "string" && (d = _.from(d)), this._alg = S, this._key = d, d.length > P ? d = S(d) : d.length < P && (d = _.concat([d, M], P));
    for (var x = this._ipad = _.allocUnsafe(P), m = this._opad = _.allocUnsafe(P), f = 0; f < P; f++)
      x[f] = d[f] ^ 54, m[f] = d[f] ^ 92;
    this._hash = [x];
  }
  return A(r, B), r.prototype._update = function(S) {
    this._hash.push(S);
  }, r.prototype._final = function() {
    var S = this._alg(_.concat(this._hash));
    return this._alg(_.concat([this._opad, S]));
  }, legacy = r, legacy;
}
var md5, hasRequiredMd5;
function requireMd5() {
  if (hasRequiredMd5)
    return md5;
  hasRequiredMd5 = 1;
  var A = requireMd5_js();
  return md5 = function(_) {
    return new A().update(_).digest();
  }, md5;
}
var browser$8, hasRequiredBrowser$8;
function requireBrowser$8() {
  if (hasRequiredBrowser$8)
    return browser$8;
  hasRequiredBrowser$8 = 1;
  var A = requireInherits_browser(), _ = requireLegacy(), B = requireCipherBase(), M = requireSafeBuffer$1().Buffer, P = requireMd5(), r = requireRipemd160(), S = requireSha_js(), d = M.alloc(128);
  function x(m, f) {
    B.call(this, "digest"), typeof f == "string" && (f = M.from(f));
    var y = m === "sha512" || m === "sha384" ? 128 : 64;
    if (this._alg = m, this._key = f, f.length > y) {
      var q = m === "rmd160" ? new r() : S(m);
      f = q.update(f).digest();
    } else
      f.length < y && (f = M.concat([f, d], y));
    for (var R = this._ipad = M.allocUnsafe(y), I = this._opad = M.allocUnsafe(y), k = 0; k < y; k++)
      R[k] = f[k] ^ 54, I[k] = f[k] ^ 92;
    this._hash = m === "rmd160" ? new r() : S(m), this._hash.update(R);
  }
  return A(x, B), x.prototype._update = function(m) {
    this._hash.update(m);
  }, x.prototype._final = function() {
    var m = this._hash.digest(), f = this._alg === "rmd160" ? new r() : S(this._alg);
    return f.update(this._opad).update(m).digest();
  }, browser$8 = function(f, y) {
    return f = f.toLowerCase(), f === "rmd160" || f === "ripemd160" ? new x("rmd160", y) : f === "md5" ? new _(P, y) : new x(f, y);
  }, browser$8;
}
const sha224WithRSAEncryption = {
  sign: "rsa",
  hash: "sha224",
  id: "302d300d06096086480165030402040500041c"
}, sha256WithRSAEncryption = {
  sign: "rsa",
  hash: "sha256",
  id: "3031300d060960864801650304020105000420"
}, sha384WithRSAEncryption = {
  sign: "rsa",
  hash: "sha384",
  id: "3041300d060960864801650304020205000430"
}, sha512WithRSAEncryption = {
  sign: "rsa",
  hash: "sha512",
  id: "3051300d060960864801650304020305000440"
}, sha256 = {
  sign: "ecdsa",
  hash: "sha256",
  id: ""
}, sha224 = {
  sign: "ecdsa",
  hash: "sha224",
  id: ""
}, sha384 = {
  sign: "ecdsa",
  hash: "sha384",
  id: ""
}, sha512 = {
  sign: "ecdsa",
  hash: "sha512",
  id: ""
}, DSA = {
  sign: "dsa",
  hash: "sha1",
  id: ""
}, ripemd160WithRSA = {
  sign: "rsa",
  hash: "rmd160",
  id: "3021300906052b2403020105000414"
}, md5WithRSAEncryption = {
  sign: "rsa",
  hash: "md5",
  id: "3020300c06082a864886f70d020505000410"
}, require$$6 = {
  sha224WithRSAEncryption,
  "RSA-SHA224": {
    sign: "ecdsa/rsa",
    hash: "sha224",
    id: "302d300d06096086480165030402040500041c"
  },
  sha256WithRSAEncryption,
  "RSA-SHA256": {
    sign: "ecdsa/rsa",
    hash: "sha256",
    id: "3031300d060960864801650304020105000420"
  },
  sha384WithRSAEncryption,
  "RSA-SHA384": {
    sign: "ecdsa/rsa",
    hash: "sha384",
    id: "3041300d060960864801650304020205000430"
  },
  sha512WithRSAEncryption,
  "RSA-SHA512": {
    sign: "ecdsa/rsa",
    hash: "sha512",
    id: "3051300d060960864801650304020305000440"
  },
  "RSA-SHA1": {
    sign: "rsa",
    hash: "sha1",
    id: "3021300906052b0e03021a05000414"
  },
  "ecdsa-with-SHA1": {
    sign: "ecdsa",
    hash: "sha1",
    id: ""
  },
  sha256,
  sha224,
  sha384,
  sha512,
  "DSA-SHA": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  "DSA-SHA1": {
    sign: "dsa",
    hash: "sha1",
    id: ""
  },
  DSA,
  "DSA-WITH-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-SHA224": {
    sign: "dsa",
    hash: "sha224",
    id: ""
  },
  "DSA-WITH-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-SHA256": {
    sign: "dsa",
    hash: "sha256",
    id: ""
  },
  "DSA-WITH-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-SHA384": {
    sign: "dsa",
    hash: "sha384",
    id: ""
  },
  "DSA-WITH-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-SHA512": {
    sign: "dsa",
    hash: "sha512",
    id: ""
  },
  "DSA-RIPEMD160": {
    sign: "dsa",
    hash: "rmd160",
    id: ""
  },
  ripemd160WithRSA,
  "RSA-RIPEMD160": {
    sign: "rsa",
    hash: "rmd160",
    id: "3021300906052b2403020105000414"
  },
  md5WithRSAEncryption,
  "RSA-MD5": {
    sign: "rsa",
    hash: "md5",
    id: "3020300c06082a864886f70d020505000410"
  }
};
var algos, hasRequiredAlgos;
function requireAlgos() {
  return hasRequiredAlgos || (hasRequiredAlgos = 1, algos = require$$6), algos;
}
var browser$7 = {}, precondition, hasRequiredPrecondition;
function requirePrecondition() {
  if (hasRequiredPrecondition)
    return precondition;
  hasRequiredPrecondition = 1;
  var A = Math.pow(2, 30) - 1;
  return precondition = function(_, B) {
    if (typeof _ != "number")
      throw new TypeError("Iterations not a number");
    if (_ < 0)
      throw new TypeError("Bad iterations");
    if (typeof B != "number")
      throw new TypeError("Key length not a number");
    if (B < 0 || B > A || B !== B)
      throw new TypeError("Bad key length");
  }, precondition;
}
var defaultEncoding_1, hasRequiredDefaultEncoding;
function requireDefaultEncoding() {
  if (hasRequiredDefaultEncoding)
    return defaultEncoding_1;
  hasRequiredDefaultEncoding = 1;
  var A;
  if (commonjsGlobal.process && commonjsGlobal.process.browser)
    A = "utf-8";
  else if (commonjsGlobal.process && commonjsGlobal.process.version) {
    var _ = parseInt(process$1.version.split(".")[0].slice(1), 10);
    A = _ >= 6 ? "utf-8" : "binary";
  } else
    A = "utf-8";
  return defaultEncoding_1 = A, defaultEncoding_1;
}
var toBuffer, hasRequiredToBuffer;
function requireToBuffer() {
  if (hasRequiredToBuffer)
    return toBuffer;
  hasRequiredToBuffer = 1;
  var A = requireSafeBuffer$1().Buffer;
  return toBuffer = function(_, B, M) {
    if (A.isBuffer(_))
      return _;
    if (typeof _ == "string")
      return A.from(_, B);
    if (ArrayBuffer.isView(_))
      return A.from(_.buffer);
    throw new TypeError(M + " must be a string, a Buffer, a typed array or a DataView");
  }, toBuffer;
}
var syncBrowser, hasRequiredSyncBrowser;
function requireSyncBrowser() {
  if (hasRequiredSyncBrowser)
    return syncBrowser;
  hasRequiredSyncBrowser = 1;
  var A = requireMd5(), _ = requireRipemd160(), B = requireSha_js(), M = requireSafeBuffer$1().Buffer, P = requirePrecondition(), r = requireDefaultEncoding(), S = requireToBuffer(), d = M.alloc(128), x = {
    md5: 16,
    sha1: 20,
    sha224: 28,
    sha256: 32,
    sha384: 48,
    sha512: 64,
    rmd160: 20,
    ripemd160: 20
  };
  function m(q, R, I) {
    var k = f(q), $ = q === "sha512" || q === "sha384" ? 128 : 64;
    R.length > $ ? R = k(R) : R.length < $ && (R = M.concat([R, d], $));
    for (var C = M.allocUnsafe($ + x[q]), L = M.allocUnsafe($ + x[q]), H = 0; H < $; H++)
      C[H] = R[H] ^ 54, L[H] = R[H] ^ 92;
    var j = M.allocUnsafe($ + I + 4);
    C.copy(j, 0, 0, $), this.ipad1 = j, this.ipad2 = C, this.opad = L, this.alg = q, this.blocksize = $, this.hash = k, this.size = x[q];
  }
  m.prototype.run = function(q, R) {
    q.copy(R, this.blocksize);
    var I = this.hash(R);
    return I.copy(this.opad, this.blocksize), this.hash(this.opad);
  };
  function f(q) {
    function R(k) {
      return B(q).update(k).digest();
    }
    function I(k) {
      return new _().update(k).digest();
    }
    return q === "rmd160" || q === "ripemd160" ? I : q === "md5" ? A : R;
  }
  function y(q, R, I, k, $) {
    P(I, k), q = S(q, r, "Password"), R = S(R, r, "Salt"), $ = $ || "sha1";
    var C = new m($, q, R.length), L = M.allocUnsafe(k), H = M.allocUnsafe(R.length + 4);
    R.copy(H, 0, 0, R.length);
    for (var j = 0, J = x[$], X = Math.ceil(k / J), ie = 1; ie <= X; ie++) {
      H.writeUInt32BE(ie, R.length);
      for (var ne = C.run(H, C.ipad1), ee = ne, ue = 1; ue < I; ue++) {
        ee = C.run(ee, C.ipad2);
        for (var U = 0; U < J; U++)
          ne[U] ^= ee[U];
      }
      ne.copy(L, j), j += J;
    }
    return L;
  }
  return syncBrowser = y, syncBrowser;
}
var async, hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync)
    return async;
  hasRequiredAsync = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requirePrecondition(), B = requireDefaultEncoding(), M = requireSyncBrowser(), P = requireToBuffer(), r, S = commonjsGlobal.crypto && commonjsGlobal.crypto.subtle, d = {
    sha: "SHA-1",
    "sha-1": "SHA-1",
    sha1: "SHA-1",
    sha256: "SHA-256",
    "sha-256": "SHA-256",
    sha384: "SHA-384",
    "sha-384": "SHA-384",
    "sha-512": "SHA-512",
    sha512: "SHA-512"
  }, x = [];
  function m(I) {
    if (commonjsGlobal.process && !commonjsGlobal.process.browser || !S || !S.importKey || !S.deriveBits)
      return Promise.resolve(!1);
    if (x[I] !== void 0)
      return x[I];
    r = r || A.alloc(8);
    var k = q(r, r, 10, 128, I).then(function() {
      return !0;
    }).catch(function() {
      return !1;
    });
    return x[I] = k, k;
  }
  var f;
  function y() {
    return f || (commonjsGlobal.process && commonjsGlobal.process.nextTick ? f = commonjsGlobal.process.nextTick : commonjsGlobal.queueMicrotask ? f = commonjsGlobal.queueMicrotask : commonjsGlobal.setImmediate ? f = commonjsGlobal.setImmediate : f = commonjsGlobal.setTimeout, f);
  }
  function q(I, k, $, C, L) {
    return S.importKey(
      "raw",
      I,
      { name: "PBKDF2" },
      !1,
      ["deriveBits"]
    ).then(function(H) {
      return S.deriveBits({
        name: "PBKDF2",
        salt: k,
        iterations: $,
        hash: {
          name: L
        }
      }, H, C << 3);
    }).then(function(H) {
      return A.from(H);
    });
  }
  function R(I, k) {
    I.then(function($) {
      y()(function() {
        k(null, $);
      });
    }, function($) {
      y()(function() {
        k($);
      });
    });
  }
  return async = function(I, k, $, C, L, H) {
    typeof L == "function" && (H = L, L = void 0), L = L || "sha1";
    var j = d[L.toLowerCase()];
    if (!j || typeof commonjsGlobal.Promise != "function") {
      y()(function() {
        var J;
        try {
          J = M(I, k, $, C, L);
        } catch (X) {
          return H(X);
        }
        H(null, J);
      });
      return;
    }
    if (_($, C), I = P(I, B, "Password"), k = P(k, B, "Salt"), typeof H != "function")
      throw new Error("No callback provided to pbkdf2");
    R(m(j).then(function(J) {
      return J ? q(I, k, $, C, j) : M(I, k, $, C, L);
    }), H);
  }, async;
}
var hasRequiredBrowser$7;
function requireBrowser$7() {
  return hasRequiredBrowser$7 || (hasRequiredBrowser$7 = 1, browser$7.pbkdf2 = requireAsync(), browser$7.pbkdf2Sync = requireSyncBrowser()), browser$7;
}
var browser$6 = {}, des$1 = {}, utils$3 = {}, hasRequiredUtils$3;
function requireUtils$3() {
  if (hasRequiredUtils$3)
    return utils$3;
  hasRequiredUtils$3 = 1, utils$3.readUInt32BE = function(P, r) {
    var S = P[0 + r] << 24 | P[1 + r] << 16 | P[2 + r] << 8 | P[3 + r];
    return S >>> 0;
  }, utils$3.writeUInt32BE = function(P, r, S) {
    P[0 + S] = r >>> 24, P[1 + S] = r >>> 16 & 255, P[2 + S] = r >>> 8 & 255, P[3 + S] = r & 255;
  }, utils$3.ip = function(P, r, S, d) {
    for (var x = 0, m = 0, f = 6; f >= 0; f -= 2) {
      for (var y = 0; y <= 24; y += 8)
        x <<= 1, x |= r >>> y + f & 1;
      for (var y = 0; y <= 24; y += 8)
        x <<= 1, x |= P >>> y + f & 1;
    }
    for (var f = 6; f >= 0; f -= 2) {
      for (var y = 1; y <= 25; y += 8)
        m <<= 1, m |= r >>> y + f & 1;
      for (var y = 1; y <= 25; y += 8)
        m <<= 1, m |= P >>> y + f & 1;
    }
    S[d + 0] = x >>> 0, S[d + 1] = m >>> 0;
  }, utils$3.rip = function(P, r, S, d) {
    for (var x = 0, m = 0, f = 0; f < 4; f++)
      for (var y = 24; y >= 0; y -= 8)
        x <<= 1, x |= r >>> y + f & 1, x <<= 1, x |= P >>> y + f & 1;
    for (var f = 4; f < 8; f++)
      for (var y = 24; y >= 0; y -= 8)
        m <<= 1, m |= r >>> y + f & 1, m <<= 1, m |= P >>> y + f & 1;
    S[d + 0] = x >>> 0, S[d + 1] = m >>> 0;
  }, utils$3.pc1 = function(P, r, S, d) {
    for (var x = 0, m = 0, f = 7; f >= 5; f--) {
      for (var y = 0; y <= 24; y += 8)
        x <<= 1, x |= r >> y + f & 1;
      for (var y = 0; y <= 24; y += 8)
        x <<= 1, x |= P >> y + f & 1;
    }
    for (var y = 0; y <= 24; y += 8)
      x <<= 1, x |= r >> y + f & 1;
    for (var f = 1; f <= 3; f++) {
      for (var y = 0; y <= 24; y += 8)
        m <<= 1, m |= r >> y + f & 1;
      for (var y = 0; y <= 24; y += 8)
        m <<= 1, m |= P >> y + f & 1;
    }
    for (var y = 0; y <= 24; y += 8)
      m <<= 1, m |= P >> y + f & 1;
    S[d + 0] = x >>> 0, S[d + 1] = m >>> 0;
  }, utils$3.r28shl = function(P, r) {
    return P << r & 268435455 | P >>> 28 - r;
  };
  var A = [
    // inL => outL
    14,
    11,
    17,
    4,
    27,
    23,
    25,
    0,
    13,
    22,
    7,
    18,
    5,
    9,
    16,
    24,
    2,
    20,
    12,
    21,
    1,
    8,
    15,
    26,
    // inR => outR
    15,
    4,
    25,
    19,
    9,
    1,
    26,
    16,
    5,
    11,
    23,
    8,
    12,
    7,
    17,
    0,
    22,
    3,
    10,
    14,
    6,
    20,
    27,
    24
  ];
  utils$3.pc2 = function(P, r, S, d) {
    for (var x = 0, m = 0, f = A.length >>> 1, y = 0; y < f; y++)
      x <<= 1, x |= P >>> A[y] & 1;
    for (var y = f; y < A.length; y++)
      m <<= 1, m |= r >>> A[y] & 1;
    S[d + 0] = x >>> 0, S[d + 1] = m >>> 0;
  }, utils$3.expand = function(P, r, S) {
    var d = 0, x = 0;
    d = (P & 1) << 5 | P >>> 27;
    for (var m = 23; m >= 15; m -= 4)
      d <<= 6, d |= P >>> m & 63;
    for (var m = 11; m >= 3; m -= 4)
      x |= P >>> m & 63, x <<= 6;
    x |= (P & 31) << 1 | P >>> 31, r[S + 0] = d >>> 0, r[S + 1] = x >>> 0;
  };
  var _ = [
    14,
    0,
    4,
    15,
    13,
    7,
    1,
    4,
    2,
    14,
    15,
    2,
    11,
    13,
    8,
    1,
    3,
    10,
    10,
    6,
    6,
    12,
    12,
    11,
    5,
    9,
    9,
    5,
    0,
    3,
    7,
    8,
    4,
    15,
    1,
    12,
    14,
    8,
    8,
    2,
    13,
    4,
    6,
    9,
    2,
    1,
    11,
    7,
    15,
    5,
    12,
    11,
    9,
    3,
    7,
    14,
    3,
    10,
    10,
    0,
    5,
    6,
    0,
    13,
    15,
    3,
    1,
    13,
    8,
    4,
    14,
    7,
    6,
    15,
    11,
    2,
    3,
    8,
    4,
    14,
    9,
    12,
    7,
    0,
    2,
    1,
    13,
    10,
    12,
    6,
    0,
    9,
    5,
    11,
    10,
    5,
    0,
    13,
    14,
    8,
    7,
    10,
    11,
    1,
    10,
    3,
    4,
    15,
    13,
    4,
    1,
    2,
    5,
    11,
    8,
    6,
    12,
    7,
    6,
    12,
    9,
    0,
    3,
    5,
    2,
    14,
    15,
    9,
    10,
    13,
    0,
    7,
    9,
    0,
    14,
    9,
    6,
    3,
    3,
    4,
    15,
    6,
    5,
    10,
    1,
    2,
    13,
    8,
    12,
    5,
    7,
    14,
    11,
    12,
    4,
    11,
    2,
    15,
    8,
    1,
    13,
    1,
    6,
    10,
    4,
    13,
    9,
    0,
    8,
    6,
    15,
    9,
    3,
    8,
    0,
    7,
    11,
    4,
    1,
    15,
    2,
    14,
    12,
    3,
    5,
    11,
    10,
    5,
    14,
    2,
    7,
    12,
    7,
    13,
    13,
    8,
    14,
    11,
    3,
    5,
    0,
    6,
    6,
    15,
    9,
    0,
    10,
    3,
    1,
    4,
    2,
    7,
    8,
    2,
    5,
    12,
    11,
    1,
    12,
    10,
    4,
    14,
    15,
    9,
    10,
    3,
    6,
    15,
    9,
    0,
    0,
    6,
    12,
    10,
    11,
    1,
    7,
    13,
    13,
    8,
    15,
    9,
    1,
    4,
    3,
    5,
    14,
    11,
    5,
    12,
    2,
    7,
    8,
    2,
    4,
    14,
    2,
    14,
    12,
    11,
    4,
    2,
    1,
    12,
    7,
    4,
    10,
    7,
    11,
    13,
    6,
    1,
    8,
    5,
    5,
    0,
    3,
    15,
    15,
    10,
    13,
    3,
    0,
    9,
    14,
    8,
    9,
    6,
    4,
    11,
    2,
    8,
    1,
    12,
    11,
    7,
    10,
    1,
    13,
    14,
    7,
    2,
    8,
    13,
    15,
    6,
    9,
    15,
    12,
    0,
    5,
    9,
    6,
    10,
    3,
    4,
    0,
    5,
    14,
    3,
    12,
    10,
    1,
    15,
    10,
    4,
    15,
    2,
    9,
    7,
    2,
    12,
    6,
    9,
    8,
    5,
    0,
    6,
    13,
    1,
    3,
    13,
    4,
    14,
    14,
    0,
    7,
    11,
    5,
    3,
    11,
    8,
    9,
    4,
    14,
    3,
    15,
    2,
    5,
    12,
    2,
    9,
    8,
    5,
    12,
    15,
    3,
    10,
    7,
    11,
    0,
    14,
    4,
    1,
    10,
    7,
    1,
    6,
    13,
    0,
    11,
    8,
    6,
    13,
    4,
    13,
    11,
    0,
    2,
    11,
    14,
    7,
    15,
    4,
    0,
    9,
    8,
    1,
    13,
    10,
    3,
    14,
    12,
    3,
    9,
    5,
    7,
    12,
    5,
    2,
    10,
    15,
    6,
    8,
    1,
    6,
    1,
    6,
    4,
    11,
    11,
    13,
    13,
    8,
    12,
    1,
    3,
    4,
    7,
    10,
    14,
    7,
    10,
    9,
    15,
    5,
    6,
    0,
    8,
    15,
    0,
    14,
    5,
    2,
    9,
    3,
    2,
    12,
    13,
    1,
    2,
    15,
    8,
    13,
    4,
    8,
    6,
    10,
    15,
    3,
    11,
    7,
    1,
    4,
    10,
    12,
    9,
    5,
    3,
    6,
    14,
    11,
    5,
    0,
    0,
    14,
    12,
    9,
    7,
    2,
    7,
    2,
    11,
    1,
    4,
    14,
    1,
    7,
    9,
    4,
    12,
    10,
    14,
    8,
    2,
    13,
    0,
    15,
    6,
    12,
    10,
    9,
    13,
    0,
    15,
    3,
    3,
    5,
    5,
    6,
    8,
    11
  ];
  utils$3.substitute = function(P, r) {
    for (var S = 0, d = 0; d < 4; d++) {
      var x = P >>> 18 - d * 6 & 63, m = _[d * 64 + x];
      S <<= 4, S |= m;
    }
    for (var d = 0; d < 4; d++) {
      var x = r >>> 18 - d * 6 & 63, m = _[4 * 64 + d * 64 + x];
      S <<= 4, S |= m;
    }
    return S >>> 0;
  };
  var B = [
    16,
    25,
    12,
    11,
    3,
    20,
    4,
    15,
    31,
    17,
    9,
    6,
    27,
    14,
    1,
    22,
    30,
    24,
    8,
    18,
    0,
    5,
    29,
    23,
    13,
    19,
    2,
    26,
    10,
    21,
    28,
    7
  ];
  return utils$3.permute = function(P) {
    for (var r = 0, S = 0; S < B.length; S++)
      r <<= 1, r |= P >>> B[S] & 1;
    return r >>> 0;
  }, utils$3.padSplit = function(P, r, S) {
    for (var d = P.toString(2); d.length < r; )
      d = "0" + d;
    for (var x = [], m = 0; m < r; m += S)
      x.push(d.slice(m, m + S));
    return x.join(" ");
  }, utils$3;
}
var minimalisticAssert, hasRequiredMinimalisticAssert;
function requireMinimalisticAssert() {
  if (hasRequiredMinimalisticAssert)
    return minimalisticAssert;
  hasRequiredMinimalisticAssert = 1, minimalisticAssert = A;
  function A(_, B) {
    if (!_)
      throw new Error(B || "Assertion failed");
  }
  return A.equal = function(B, M, P) {
    if (B != M)
      throw new Error(P || "Assertion failed: " + B + " != " + M);
  }, minimalisticAssert;
}
var cipher, hasRequiredCipher;
function requireCipher() {
  if (hasRequiredCipher)
    return cipher;
  hasRequiredCipher = 1;
  var A = requireMinimalisticAssert();
  function _(B) {
    this.options = B, this.type = this.options.type, this.blockSize = 8, this._init(), this.buffer = new Array(this.blockSize), this.bufferOff = 0, this.padding = B.padding !== !1;
  }
  return cipher = _, _.prototype._init = function() {
  }, _.prototype.update = function(M) {
    return M.length === 0 ? [] : this.type === "decrypt" ? this._updateDecrypt(M) : this._updateEncrypt(M);
  }, _.prototype._buffer = function(M, P) {
    for (var r = Math.min(this.buffer.length - this.bufferOff, M.length - P), S = 0; S < r; S++)
      this.buffer[this.bufferOff + S] = M[P + S];
    return this.bufferOff += r, r;
  }, _.prototype._flushBuffer = function(M, P) {
    return this._update(this.buffer, 0, M, P), this.bufferOff = 0, this.blockSize;
  }, _.prototype._updateEncrypt = function(M) {
    var P = 0, r = 0, S = (this.bufferOff + M.length) / this.blockSize | 0, d = new Array(S * this.blockSize);
    this.bufferOff !== 0 && (P += this._buffer(M, P), this.bufferOff === this.buffer.length && (r += this._flushBuffer(d, r)));
    for (var x = M.length - (M.length - P) % this.blockSize; P < x; P += this.blockSize)
      this._update(M, P, d, r), r += this.blockSize;
    for (; P < M.length; P++, this.bufferOff++)
      this.buffer[this.bufferOff] = M[P];
    return d;
  }, _.prototype._updateDecrypt = function(M) {
    for (var P = 0, r = 0, S = Math.ceil((this.bufferOff + M.length) / this.blockSize) - 1, d = new Array(S * this.blockSize); S > 0; S--)
      P += this._buffer(M, P), r += this._flushBuffer(d, r);
    return P += this._buffer(M, P), d;
  }, _.prototype.final = function(M) {
    var P;
    M && (P = this.update(M));
    var r;
    return this.type === "encrypt" ? r = this._finalEncrypt() : r = this._finalDecrypt(), P ? P.concat(r) : r;
  }, _.prototype._pad = function(M, P) {
    if (P === 0)
      return !1;
    for (; P < M.length; )
      M[P++] = 0;
    return !0;
  }, _.prototype._finalEncrypt = function() {
    if (!this._pad(this.buffer, this.bufferOff))
      return [];
    var M = new Array(this.blockSize);
    return this._update(this.buffer, 0, M, 0), M;
  }, _.prototype._unpad = function(M) {
    return M;
  }, _.prototype._finalDecrypt = function() {
    A.equal(this.bufferOff, this.blockSize, "Not enough data to decrypt");
    var M = new Array(this.blockSize);
    return this._flushBuffer(M, 0), this._unpad(M);
  }, cipher;
}
var des, hasRequiredDes$1;
function requireDes$1() {
  if (hasRequiredDes$1)
    return des;
  hasRequiredDes$1 = 1;
  var A = requireMinimalisticAssert(), _ = requireInherits_browser(), B = requireUtils$3(), M = requireCipher();
  function P() {
    this.tmp = new Array(2), this.keys = null;
  }
  function r(d) {
    M.call(this, d);
    var x = new P();
    this._desState = x, this.deriveKeys(x, d.key);
  }
  _(r, M), des = r, r.create = function(x) {
    return new r(x);
  };
  var S = [
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1
  ];
  return r.prototype.deriveKeys = function(x, m) {
    x.keys = new Array(16 * 2), A.equal(m.length, this.blockSize, "Invalid key length");
    var f = B.readUInt32BE(m, 0), y = B.readUInt32BE(m, 4);
    B.pc1(f, y, x.tmp, 0), f = x.tmp[0], y = x.tmp[1];
    for (var q = 0; q < x.keys.length; q += 2) {
      var R = S[q >>> 1];
      f = B.r28shl(f, R), y = B.r28shl(y, R), B.pc2(f, y, x.keys, q);
    }
  }, r.prototype._update = function(x, m, f, y) {
    var q = this._desState, R = B.readUInt32BE(x, m), I = B.readUInt32BE(x, m + 4);
    B.ip(R, I, q.tmp, 0), R = q.tmp[0], I = q.tmp[1], this.type === "encrypt" ? this._encrypt(q, R, I, q.tmp, 0) : this._decrypt(q, R, I, q.tmp, 0), R = q.tmp[0], I = q.tmp[1], B.writeUInt32BE(f, R, y), B.writeUInt32BE(f, I, y + 4);
  }, r.prototype._pad = function(x, m) {
    if (this.padding === !1)
      return !1;
    for (var f = x.length - m, y = m; y < x.length; y++)
      x[y] = f;
    return !0;
  }, r.prototype._unpad = function(x) {
    if (this.padding === !1)
      return x;
    for (var m = x[x.length - 1], f = x.length - m; f < x.length; f++)
      A.equal(x[f], m);
    return x.slice(0, x.length - m);
  }, r.prototype._encrypt = function(x, m, f, y, q) {
    for (var R = m, I = f, k = 0; k < x.keys.length; k += 2) {
      var $ = x.keys[k], C = x.keys[k + 1];
      B.expand(I, x.tmp, 0), $ ^= x.tmp[0], C ^= x.tmp[1];
      var L = B.substitute($, C), H = B.permute(L), j = I;
      I = (R ^ H) >>> 0, R = j;
    }
    B.rip(I, R, y, q);
  }, r.prototype._decrypt = function(x, m, f, y, q) {
    for (var R = f, I = m, k = x.keys.length - 2; k >= 0; k -= 2) {
      var $ = x.keys[k], C = x.keys[k + 1];
      B.expand(R, x.tmp, 0), $ ^= x.tmp[0], C ^= x.tmp[1];
      var L = B.substitute($, C), H = B.permute(L), j = R;
      R = (I ^ H) >>> 0, I = j;
    }
    B.rip(R, I, y, q);
  }, des;
}
var cbc$1 = {}, hasRequiredCbc$1;
function requireCbc$1() {
  if (hasRequiredCbc$1)
    return cbc$1;
  hasRequiredCbc$1 = 1;
  var A = requireMinimalisticAssert(), _ = requireInherits_browser(), B = {};
  function M(r) {
    A.equal(r.length, 8, "Invalid IV length"), this.iv = new Array(8);
    for (var S = 0; S < this.iv.length; S++)
      this.iv[S] = r[S];
  }
  function P(r) {
    function S(f) {
      r.call(this, f), this._cbcInit();
    }
    _(S, r);
    for (var d = Object.keys(B), x = 0; x < d.length; x++) {
      var m = d[x];
      S.prototype[m] = B[m];
    }
    return S.create = function(y) {
      return new S(y);
    }, S;
  }
  return cbc$1.instantiate = P, B._cbcInit = function() {
    var S = new M(this.options.iv);
    this._cbcState = S;
  }, B._update = function(S, d, x, m) {
    var f = this._cbcState, y = this.constructor.super_.prototype, q = f.iv;
    if (this.type === "encrypt") {
      for (var R = 0; R < this.blockSize; R++)
        q[R] ^= S[d + R];
      y._update.call(this, q, 0, x, m);
      for (var R = 0; R < this.blockSize; R++)
        q[R] = x[m + R];
    } else {
      y._update.call(this, S, d, x, m);
      for (var R = 0; R < this.blockSize; R++)
        x[m + R] ^= q[R];
      for (var R = 0; R < this.blockSize; R++)
        q[R] = S[d + R];
    }
  }, cbc$1;
}
var ede, hasRequiredEde;
function requireEde() {
  if (hasRequiredEde)
    return ede;
  hasRequiredEde = 1;
  var A = requireMinimalisticAssert(), _ = requireInherits_browser(), B = requireCipher(), M = requireDes$1();
  function P(S, d) {
    A.equal(d.length, 24, "Invalid key length");
    var x = d.slice(0, 8), m = d.slice(8, 16), f = d.slice(16, 24);
    S === "encrypt" ? this.ciphers = [
      M.create({ type: "encrypt", key: x }),
      M.create({ type: "decrypt", key: m }),
      M.create({ type: "encrypt", key: f })
    ] : this.ciphers = [
      M.create({ type: "decrypt", key: f }),
      M.create({ type: "encrypt", key: m }),
      M.create({ type: "decrypt", key: x })
    ];
  }
  function r(S) {
    B.call(this, S);
    var d = new P(this.type, this.options.key);
    this._edeState = d;
  }
  return _(r, B), ede = r, r.create = function(d) {
    return new r(d);
  }, r.prototype._update = function(d, x, m, f) {
    var y = this._edeState;
    y.ciphers[0]._update(d, x, m, f), y.ciphers[1]._update(m, f, m, f), y.ciphers[2]._update(m, f, m, f);
  }, r.prototype._pad = M.prototype._pad, r.prototype._unpad = M.prototype._unpad, ede;
}
var hasRequiredDes;
function requireDes() {
  return hasRequiredDes || (hasRequiredDes = 1, des$1.utils = requireUtils$3(), des$1.Cipher = requireCipher(), des$1.DES = requireDes$1(), des$1.CBC = requireCbc$1(), des$1.EDE = requireEde()), des$1;
}
var browserifyDes, hasRequiredBrowserifyDes;
function requireBrowserifyDes() {
  if (hasRequiredBrowserifyDes)
    return browserifyDes;
  hasRequiredBrowserifyDes = 1;
  var A = requireCipherBase(), _ = requireDes(), B = requireInherits_browser(), M = requireSafeBuffer$1().Buffer, P = {
    "des-ede3-cbc": _.CBC.instantiate(_.EDE),
    "des-ede3": _.EDE,
    "des-ede-cbc": _.CBC.instantiate(_.EDE),
    "des-ede": _.EDE,
    "des-cbc": _.CBC.instantiate(_.DES),
    "des-ecb": _.DES
  };
  P.des = P["des-cbc"], P.des3 = P["des-ede3-cbc"], browserifyDes = r, B(r, A);
  function r(S) {
    A.call(this);
    var d = S.mode.toLowerCase(), x = P[d], m;
    S.decrypt ? m = "decrypt" : m = "encrypt";
    var f = S.key;
    M.isBuffer(f) || (f = M.from(f)), (d === "des-ede" || d === "des-ede-cbc") && (f = M.concat([f, f.slice(0, 8)]));
    var y = S.iv;
    M.isBuffer(y) || (y = M.from(y)), this._des = x.create({
      key: f,
      iv: y,
      type: m
    });
  }
  return r.prototype._update = function(S) {
    return M.from(this._des.update(S));
  }, r.prototype._final = function() {
    return M.from(this._des.final());
  }, browserifyDes;
}
var browser$5 = {}, encrypter = {}, ecb = {}, hasRequiredEcb;
function requireEcb() {
  return hasRequiredEcb || (hasRequiredEcb = 1, ecb.encrypt = function(A, _) {
    return A._cipher.encryptBlock(_);
  }, ecb.decrypt = function(A, _) {
    return A._cipher.decryptBlock(_);
  }), ecb;
}
var cbc = {}, bufferXor, hasRequiredBufferXor;
function requireBufferXor() {
  return hasRequiredBufferXor || (hasRequiredBufferXor = 1, bufferXor = function(_, B) {
    for (var M = Math.min(_.length, B.length), P = new bufferExports.Buffer(M), r = 0; r < M; ++r)
      P[r] = _[r] ^ B[r];
    return P;
  }), bufferXor;
}
var hasRequiredCbc;
function requireCbc() {
  if (hasRequiredCbc)
    return cbc;
  hasRequiredCbc = 1;
  var A = requireBufferXor();
  return cbc.encrypt = function(_, B) {
    var M = A(B, _._prev);
    return _._prev = _._cipher.encryptBlock(M), _._prev;
  }, cbc.decrypt = function(_, B) {
    var M = _._prev;
    _._prev = B;
    var P = _._cipher.decryptBlock(B);
    return A(P, M);
  }, cbc;
}
var cfb = {}, hasRequiredCfb;
function requireCfb() {
  if (hasRequiredCfb)
    return cfb;
  hasRequiredCfb = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireBufferXor();
  function B(M, P, r) {
    var S = P.length, d = _(P, M._cache);
    return M._cache = M._cache.slice(S), M._prev = A.concat([M._prev, r ? P : d]), d;
  }
  return cfb.encrypt = function(M, P, r) {
    for (var S = A.allocUnsafe(0), d; P.length; )
      if (M._cache.length === 0 && (M._cache = M._cipher.encryptBlock(M._prev), M._prev = A.allocUnsafe(0)), M._cache.length <= P.length)
        d = M._cache.length, S = A.concat([S, B(M, P.slice(0, d), r)]), P = P.slice(d);
      else {
        S = A.concat([S, B(M, P, r)]);
        break;
      }
    return S;
  }, cfb;
}
var cfb8 = {}, hasRequiredCfb8;
function requireCfb8() {
  if (hasRequiredCfb8)
    return cfb8;
  hasRequiredCfb8 = 1;
  var A = requireSafeBuffer$1().Buffer;
  function _(B, M, P) {
    var r = B._cipher.encryptBlock(B._prev), S = r[0] ^ M;
    return B._prev = A.concat([
      B._prev.slice(1),
      A.from([P ? M : S])
    ]), S;
  }
  return cfb8.encrypt = function(B, M, P) {
    for (var r = M.length, S = A.allocUnsafe(r), d = -1; ++d < r; )
      S[d] = _(B, M[d], P);
    return S;
  }, cfb8;
}
var cfb1 = {}, hasRequiredCfb1;
function requireCfb1() {
  if (hasRequiredCfb1)
    return cfb1;
  hasRequiredCfb1 = 1;
  var A = requireSafeBuffer$1().Buffer;
  function _(M, P, r) {
    for (var S, d = -1, x = 8, m = 0, f, y; ++d < x; )
      S = M._cipher.encryptBlock(M._prev), f = P & 1 << 7 - d ? 128 : 0, y = S[0] ^ f, m += (y & 128) >> d % 8, M._prev = B(M._prev, r ? f : y);
    return m;
  }
  function B(M, P) {
    var r = M.length, S = -1, d = A.allocUnsafe(M.length);
    for (M = A.concat([M, A.from([P])]); ++S < r; )
      d[S] = M[S] << 1 | M[S + 1] >> 7;
    return d;
  }
  return cfb1.encrypt = function(M, P, r) {
    for (var S = P.length, d = A.allocUnsafe(S), x = -1; ++x < S; )
      d[x] = _(M, P[x], r);
    return d;
  }, cfb1;
}
var ofb = {}, hasRequiredOfb;
function requireOfb() {
  if (hasRequiredOfb)
    return ofb;
  hasRequiredOfb = 1;
  var A = requireBufferXor();
  function _(B) {
    return B._prev = B._cipher.encryptBlock(B._prev), B._prev;
  }
  return ofb.encrypt = function(B, M) {
    for (; B._cache.length < M.length; )
      B._cache = bufferExports.Buffer.concat([B._cache, _(B)]);
    var P = B._cache.slice(0, M.length);
    return B._cache = B._cache.slice(M.length), A(M, P);
  }, ofb;
}
var ctr = {}, incr32_1, hasRequiredIncr32;
function requireIncr32() {
  if (hasRequiredIncr32)
    return incr32_1;
  hasRequiredIncr32 = 1;
  function A(_) {
    for (var B = _.length, M; B--; )
      if (M = _.readUInt8(B), M === 255)
        _.writeUInt8(0, B);
      else {
        M++, _.writeUInt8(M, B);
        break;
      }
  }
  return incr32_1 = A, incr32_1;
}
var hasRequiredCtr;
function requireCtr() {
  if (hasRequiredCtr)
    return ctr;
  hasRequiredCtr = 1;
  var A = requireBufferXor(), _ = requireSafeBuffer$1().Buffer, B = requireIncr32();
  function M(r) {
    var S = r._cipher.encryptBlockRaw(r._prev);
    return B(r._prev), S;
  }
  var P = 16;
  return ctr.encrypt = function(r, S) {
    var d = Math.ceil(S.length / P), x = r._cache.length;
    r._cache = _.concat([
      r._cache,
      _.allocUnsafe(d * P)
    ]);
    for (var m = 0; m < d; m++) {
      var f = M(r), y = x + m * P;
      r._cache.writeUInt32BE(f[0], y + 0), r._cache.writeUInt32BE(f[1], y + 4), r._cache.writeUInt32BE(f[2], y + 8), r._cache.writeUInt32BE(f[3], y + 12);
    }
    var q = r._cache.slice(0, S.length);
    return r._cache = r._cache.slice(S.length), A(S, q);
  }, ctr;
}
const aes128 = {
  cipher: "AES",
  key: 128,
  iv: 16,
  mode: "CBC",
  type: "block"
}, aes192 = {
  cipher: "AES",
  key: 192,
  iv: 16,
  mode: "CBC",
  type: "block"
}, aes256 = {
  cipher: "AES",
  key: 256,
  iv: 16,
  mode: "CBC",
  type: "block"
}, require$$2 = {
  "aes-128-ecb": {
    cipher: "AES",
    key: 128,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-192-ecb": {
    cipher: "AES",
    key: 192,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-256-ecb": {
    cipher: "AES",
    key: 256,
    iv: 0,
    mode: "ECB",
    type: "block"
  },
  "aes-128-cbc": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-192-cbc": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  "aes-256-cbc": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CBC",
    type: "block"
  },
  aes128,
  aes192,
  aes256,
  "aes-128-cfb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-192-cfb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-256-cfb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB",
    type: "stream"
  },
  "aes-128-cfb8": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-192-cfb8": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-256-cfb8": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB8",
    type: "stream"
  },
  "aes-128-cfb1": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-192-cfb1": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-256-cfb1": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CFB1",
    type: "stream"
  },
  "aes-128-ofb": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-192-ofb": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-256-ofb": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "OFB",
    type: "stream"
  },
  "aes-128-ctr": {
    cipher: "AES",
    key: 128,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-192-ctr": {
    cipher: "AES",
    key: 192,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-256-ctr": {
    cipher: "AES",
    key: 256,
    iv: 16,
    mode: "CTR",
    type: "stream"
  },
  "aes-128-gcm": {
    cipher: "AES",
    key: 128,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-192-gcm": {
    cipher: "AES",
    key: 192,
    iv: 12,
    mode: "GCM",
    type: "auth"
  },
  "aes-256-gcm": {
    cipher: "AES",
    key: 256,
    iv: 12,
    mode: "GCM",
    type: "auth"
  }
};
var modes_1, hasRequiredModes$1;
function requireModes$1() {
  if (hasRequiredModes$1)
    return modes_1;
  hasRequiredModes$1 = 1;
  var A = {
    ECB: requireEcb(),
    CBC: requireCbc(),
    CFB: requireCfb(),
    CFB8: requireCfb8(),
    CFB1: requireCfb1(),
    OFB: requireOfb(),
    CTR: requireCtr(),
    GCM: requireCtr()
  }, _ = require$$2;
  for (var B in _)
    _[B].module = A[_[B].mode];
  return modes_1 = _, modes_1;
}
var aes = {}, hasRequiredAes;
function requireAes() {
  if (hasRequiredAes)
    return aes;
  hasRequiredAes = 1;
  var A = requireSafeBuffer$1().Buffer;
  function _(d) {
    A.isBuffer(d) || (d = A.from(d));
    for (var x = d.length / 4 | 0, m = new Array(x), f = 0; f < x; f++)
      m[f] = d.readUInt32BE(f * 4);
    return m;
  }
  function B(d) {
    for (var x = 0; x < d.length; d++)
      d[x] = 0;
  }
  function M(d, x, m, f, y) {
    for (var q = m[0], R = m[1], I = m[2], k = m[3], $ = d[0] ^ x[0], C = d[1] ^ x[1], L = d[2] ^ x[2], H = d[3] ^ x[3], j, J, X, ie, ne = 4, ee = 1; ee < y; ee++)
      j = q[$ >>> 24] ^ R[C >>> 16 & 255] ^ I[L >>> 8 & 255] ^ k[H & 255] ^ x[ne++], J = q[C >>> 24] ^ R[L >>> 16 & 255] ^ I[H >>> 8 & 255] ^ k[$ & 255] ^ x[ne++], X = q[L >>> 24] ^ R[H >>> 16 & 255] ^ I[$ >>> 8 & 255] ^ k[C & 255] ^ x[ne++], ie = q[H >>> 24] ^ R[$ >>> 16 & 255] ^ I[C >>> 8 & 255] ^ k[L & 255] ^ x[ne++], $ = j, C = J, L = X, H = ie;
    return j = (f[$ >>> 24] << 24 | f[C >>> 16 & 255] << 16 | f[L >>> 8 & 255] << 8 | f[H & 255]) ^ x[ne++], J = (f[C >>> 24] << 24 | f[L >>> 16 & 255] << 16 | f[H >>> 8 & 255] << 8 | f[$ & 255]) ^ x[ne++], X = (f[L >>> 24] << 24 | f[H >>> 16 & 255] << 16 | f[$ >>> 8 & 255] << 8 | f[C & 255]) ^ x[ne++], ie = (f[H >>> 24] << 24 | f[$ >>> 16 & 255] << 16 | f[C >>> 8 & 255] << 8 | f[L & 255]) ^ x[ne++], j = j >>> 0, J = J >>> 0, X = X >>> 0, ie = ie >>> 0, [j, J, X, ie];
  }
  var P = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], r = function() {
    for (var d = new Array(256), x = 0; x < 256; x++)
      x < 128 ? d[x] = x << 1 : d[x] = x << 1 ^ 283;
    for (var m = [], f = [], y = [[], [], [], []], q = [[], [], [], []], R = 0, I = 0, k = 0; k < 256; ++k) {
      var $ = I ^ I << 1 ^ I << 2 ^ I << 3 ^ I << 4;
      $ = $ >>> 8 ^ $ & 255 ^ 99, m[R] = $, f[$] = R;
      var C = d[R], L = d[C], H = d[L], j = d[$] * 257 ^ $ * 16843008;
      y[0][R] = j << 24 | j >>> 8, y[1][R] = j << 16 | j >>> 16, y[2][R] = j << 8 | j >>> 24, y[3][R] = j, j = H * 16843009 ^ L * 65537 ^ C * 257 ^ R * 16843008, q[0][$] = j << 24 | j >>> 8, q[1][$] = j << 16 | j >>> 16, q[2][$] = j << 8 | j >>> 24, q[3][$] = j, R === 0 ? R = I = 1 : (R = C ^ d[d[d[H ^ C]]], I ^= d[d[I]]);
    }
    return {
      SBOX: m,
      INV_SBOX: f,
      SUB_MIX: y,
      INV_SUB_MIX: q
    };
  }();
  function S(d) {
    this._key = _(d), this._reset();
  }
  return S.blockSize = 4 * 4, S.keySize = 256 / 8, S.prototype.blockSize = S.blockSize, S.prototype.keySize = S.keySize, S.prototype._reset = function() {
    for (var d = this._key, x = d.length, m = x + 6, f = (m + 1) * 4, y = [], q = 0; q < x; q++)
      y[q] = d[q];
    for (q = x; q < f; q++) {
      var R = y[q - 1];
      q % x === 0 ? (R = R << 8 | R >>> 24, R = r.SBOX[R >>> 24] << 24 | r.SBOX[R >>> 16 & 255] << 16 | r.SBOX[R >>> 8 & 255] << 8 | r.SBOX[R & 255], R ^= P[q / x | 0] << 24) : x > 6 && q % x === 4 && (R = r.SBOX[R >>> 24] << 24 | r.SBOX[R >>> 16 & 255] << 16 | r.SBOX[R >>> 8 & 255] << 8 | r.SBOX[R & 255]), y[q] = y[q - x] ^ R;
    }
    for (var I = [], k = 0; k < f; k++) {
      var $ = f - k, C = y[$ - (k % 4 ? 0 : 4)];
      k < 4 || $ <= 4 ? I[k] = C : I[k] = r.INV_SUB_MIX[0][r.SBOX[C >>> 24]] ^ r.INV_SUB_MIX[1][r.SBOX[C >>> 16 & 255]] ^ r.INV_SUB_MIX[2][r.SBOX[C >>> 8 & 255]] ^ r.INV_SUB_MIX[3][r.SBOX[C & 255]];
    }
    this._nRounds = m, this._keySchedule = y, this._invKeySchedule = I;
  }, S.prototype.encryptBlockRaw = function(d) {
    return d = _(d), M(d, this._keySchedule, r.SUB_MIX, r.SBOX, this._nRounds);
  }, S.prototype.encryptBlock = function(d) {
    var x = this.encryptBlockRaw(d), m = A.allocUnsafe(16);
    return m.writeUInt32BE(x[0], 0), m.writeUInt32BE(x[1], 4), m.writeUInt32BE(x[2], 8), m.writeUInt32BE(x[3], 12), m;
  }, S.prototype.decryptBlock = function(d) {
    d = _(d);
    var x = d[1];
    d[1] = d[3], d[3] = x;
    var m = M(d, this._invKeySchedule, r.INV_SUB_MIX, r.INV_SBOX, this._nRounds), f = A.allocUnsafe(16);
    return f.writeUInt32BE(m[0], 0), f.writeUInt32BE(m[3], 4), f.writeUInt32BE(m[2], 8), f.writeUInt32BE(m[1], 12), f;
  }, S.prototype.scrub = function() {
    B(this._keySchedule), B(this._invKeySchedule), B(this._key);
  }, aes.AES = S, aes;
}
var ghash, hasRequiredGhash;
function requireGhash() {
  if (hasRequiredGhash)
    return ghash;
  hasRequiredGhash = 1;
  var A = requireSafeBuffer$1().Buffer, _ = A.alloc(16, 0);
  function B(r) {
    return [
      r.readUInt32BE(0),
      r.readUInt32BE(4),
      r.readUInt32BE(8),
      r.readUInt32BE(12)
    ];
  }
  function M(r) {
    var S = A.allocUnsafe(16);
    return S.writeUInt32BE(r[0] >>> 0, 0), S.writeUInt32BE(r[1] >>> 0, 4), S.writeUInt32BE(r[2] >>> 0, 8), S.writeUInt32BE(r[3] >>> 0, 12), S;
  }
  function P(r) {
    this.h = r, this.state = A.alloc(16, 0), this.cache = A.allocUnsafe(0);
  }
  return P.prototype.ghash = function(r) {
    for (var S = -1; ++S < r.length; )
      this.state[S] ^= r[S];
    this._multiply();
  }, P.prototype._multiply = function() {
    for (var r = B(this.h), S = [0, 0, 0, 0], d, x, m, f = -1; ++f < 128; ) {
      for (x = (this.state[~~(f / 8)] & 1 << 7 - f % 8) !== 0, x && (S[0] ^= r[0], S[1] ^= r[1], S[2] ^= r[2], S[3] ^= r[3]), m = (r[3] & 1) !== 0, d = 3; d > 0; d--)
        r[d] = r[d] >>> 1 | (r[d - 1] & 1) << 31;
      r[0] = r[0] >>> 1, m && (r[0] = r[0] ^ 225 << 24);
    }
    this.state = M(S);
  }, P.prototype.update = function(r) {
    this.cache = A.concat([this.cache, r]);
    for (var S; this.cache.length >= 16; )
      S = this.cache.slice(0, 16), this.cache = this.cache.slice(16), this.ghash(S);
  }, P.prototype.final = function(r, S) {
    return this.cache.length && this.ghash(A.concat([this.cache, _], 16)), this.ghash(M([0, r, 0, S])), this.state;
  }, ghash = P, ghash;
}
var authCipher, hasRequiredAuthCipher;
function requireAuthCipher() {
  if (hasRequiredAuthCipher)
    return authCipher;
  hasRequiredAuthCipher = 1;
  var A = requireAes(), _ = requireSafeBuffer$1().Buffer, B = requireCipherBase(), M = requireInherits_browser(), P = requireGhash(), r = requireBufferXor(), S = requireIncr32();
  function d(f, y) {
    var q = 0;
    f.length !== y.length && q++;
    for (var R = Math.min(f.length, y.length), I = 0; I < R; ++I)
      q += f[I] ^ y[I];
    return q;
  }
  function x(f, y, q) {
    if (y.length === 12)
      return f._finID = _.concat([y, _.from([0, 0, 0, 1])]), _.concat([y, _.from([0, 0, 0, 2])]);
    var R = new P(q), I = y.length, k = I % 16;
    R.update(y), k && (k = 16 - k, R.update(_.alloc(k, 0))), R.update(_.alloc(8, 0));
    var $ = I * 8, C = _.alloc(8);
    C.writeUIntBE($, 0, 8), R.update(C), f._finID = R.state;
    var L = _.from(f._finID);
    return S(L), L;
  }
  function m(f, y, q, R) {
    B.call(this);
    var I = _.alloc(4, 0);
    this._cipher = new A.AES(y);
    var k = this._cipher.encryptBlock(I);
    this._ghash = new P(k), q = x(this, q, k), this._prev = _.from(q), this._cache = _.allocUnsafe(0), this._secCache = _.allocUnsafe(0), this._decrypt = R, this._alen = 0, this._len = 0, this._mode = f, this._authTag = null, this._called = !1;
  }
  return M(m, B), m.prototype._update = function(f) {
    if (!this._called && this._alen) {
      var y = 16 - this._alen % 16;
      y < 16 && (y = _.alloc(y, 0), this._ghash.update(y));
    }
    this._called = !0;
    var q = this._mode.encrypt(this, f);
    return this._decrypt ? this._ghash.update(f) : this._ghash.update(q), this._len += f.length, q;
  }, m.prototype._final = function() {
    if (this._decrypt && !this._authTag)
      throw new Error("Unsupported state or unable to authenticate data");
    var f = r(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID));
    if (this._decrypt && d(f, this._authTag))
      throw new Error("Unsupported state or unable to authenticate data");
    this._authTag = f, this._cipher.scrub();
  }, m.prototype.getAuthTag = function() {
    if (this._decrypt || !_.isBuffer(this._authTag))
      throw new Error("Attempting to get auth tag in unsupported state");
    return this._authTag;
  }, m.prototype.setAuthTag = function(y) {
    if (!this._decrypt)
      throw new Error("Attempting to set auth tag in unsupported state");
    this._authTag = y;
  }, m.prototype.setAAD = function(y) {
    if (this._called)
      throw new Error("Attempting to set AAD in unsupported state");
    this._ghash.update(y), this._alen += y.length;
  }, authCipher = m, authCipher;
}
var streamCipher, hasRequiredStreamCipher;
function requireStreamCipher() {
  if (hasRequiredStreamCipher)
    return streamCipher;
  hasRequiredStreamCipher = 1;
  var A = requireAes(), _ = requireSafeBuffer$1().Buffer, B = requireCipherBase(), M = requireInherits_browser();
  function P(r, S, d, x) {
    B.call(this), this._cipher = new A.AES(S), this._prev = _.from(d), this._cache = _.allocUnsafe(0), this._secCache = _.allocUnsafe(0), this._decrypt = x, this._mode = r;
  }
  return M(P, B), P.prototype._update = function(r) {
    return this._mode.encrypt(this, r, this._decrypt);
  }, P.prototype._final = function() {
    this._cipher.scrub();
  }, streamCipher = P, streamCipher;
}
var evp_bytestokey, hasRequiredEvp_bytestokey;
function requireEvp_bytestokey() {
  if (hasRequiredEvp_bytestokey)
    return evp_bytestokey;
  hasRequiredEvp_bytestokey = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireMd5_js();
  function B(M, P, r, S) {
    if (A.isBuffer(M) || (M = A.from(M, "binary")), P && (A.isBuffer(P) || (P = A.from(P, "binary")), P.length !== 8))
      throw new RangeError("salt should be Buffer with 8 byte length");
    for (var d = r / 8, x = A.alloc(d), m = A.alloc(S || 0), f = A.alloc(0); d > 0 || S > 0; ) {
      var y = new _();
      y.update(f), y.update(M), P && y.update(P), f = y.digest();
      var q = 0;
      if (d > 0) {
        var R = x.length - d;
        q = Math.min(d, f.length), f.copy(x, R, 0, q), d -= q;
      }
      if (q < f.length && S > 0) {
        var I = m.length - S, k = Math.min(S, f.length - q);
        f.copy(m, I, q, q + k), S -= k;
      }
    }
    return f.fill(0), { key: x, iv: m };
  }
  return evp_bytestokey = B, evp_bytestokey;
}
var hasRequiredEncrypter;
function requireEncrypter() {
  if (hasRequiredEncrypter)
    return encrypter;
  hasRequiredEncrypter = 1;
  var A = requireModes$1(), _ = requireAuthCipher(), B = requireSafeBuffer$1().Buffer, M = requireStreamCipher(), P = requireCipherBase(), r = requireAes(), S = requireEvp_bytestokey(), d = requireInherits_browser();
  function x(R, I, k) {
    P.call(this), this._cache = new f(), this._cipher = new r.AES(I), this._prev = B.from(k), this._mode = R, this._autopadding = !0;
  }
  d(x, P), x.prototype._update = function(R) {
    this._cache.add(R);
    for (var I, k, $ = []; I = this._cache.get(); )
      k = this._mode.encrypt(this, I), $.push(k);
    return B.concat($);
  };
  var m = B.alloc(16, 16);
  x.prototype._final = function() {
    var R = this._cache.flush();
    if (this._autopadding)
      return R = this._mode.encrypt(this, R), this._cipher.scrub(), R;
    if (!R.equals(m))
      throw this._cipher.scrub(), new Error("data not multiple of block length");
  }, x.prototype.setAutoPadding = function(R) {
    return this._autopadding = !!R, this;
  };
  function f() {
    this.cache = B.allocUnsafe(0);
  }
  f.prototype.add = function(R) {
    this.cache = B.concat([this.cache, R]);
  }, f.prototype.get = function() {
    if (this.cache.length > 15) {
      var R = this.cache.slice(0, 16);
      return this.cache = this.cache.slice(16), R;
    }
    return null;
  }, f.prototype.flush = function() {
    for (var R = 16 - this.cache.length, I = B.allocUnsafe(R), k = -1; ++k < R; )
      I.writeUInt8(R, k);
    return B.concat([this.cache, I]);
  };
  function y(R, I, k) {
    var $ = A[R.toLowerCase()];
    if (!$)
      throw new TypeError("invalid suite type");
    if (typeof I == "string" && (I = B.from(I)), I.length !== $.key / 8)
      throw new TypeError("invalid key length " + I.length);
    if (typeof k == "string" && (k = B.from(k)), $.mode !== "GCM" && k.length !== $.iv)
      throw new TypeError("invalid iv length " + k.length);
    return $.type === "stream" ? new M($.module, I, k) : $.type === "auth" ? new _($.module, I, k) : new x($.module, I, k);
  }
  function q(R, I) {
    var k = A[R.toLowerCase()];
    if (!k)
      throw new TypeError("invalid suite type");
    var $ = S(I, !1, k.key, k.iv);
    return y(R, $.key, $.iv);
  }
  return encrypter.createCipheriv = y, encrypter.createCipher = q, encrypter;
}
var decrypter = {}, hasRequiredDecrypter;
function requireDecrypter() {
  if (hasRequiredDecrypter)
    return decrypter;
  hasRequiredDecrypter = 1;
  var A = requireAuthCipher(), _ = requireSafeBuffer$1().Buffer, B = requireModes$1(), M = requireStreamCipher(), P = requireCipherBase(), r = requireAes(), S = requireEvp_bytestokey(), d = requireInherits_browser();
  function x(R, I, k) {
    P.call(this), this._cache = new m(), this._last = void 0, this._cipher = new r.AES(I), this._prev = _.from(k), this._mode = R, this._autopadding = !0;
  }
  d(x, P), x.prototype._update = function(R) {
    this._cache.add(R);
    for (var I, k, $ = []; I = this._cache.get(this._autopadding); )
      k = this._mode.decrypt(this, I), $.push(k);
    return _.concat($);
  }, x.prototype._final = function() {
    var R = this._cache.flush();
    if (this._autopadding)
      return f(this._mode.decrypt(this, R));
    if (R)
      throw new Error("data not multiple of block length");
  }, x.prototype.setAutoPadding = function(R) {
    return this._autopadding = !!R, this;
  };
  function m() {
    this.cache = _.allocUnsafe(0);
  }
  m.prototype.add = function(R) {
    this.cache = _.concat([this.cache, R]);
  }, m.prototype.get = function(R) {
    var I;
    if (R) {
      if (this.cache.length > 16)
        return I = this.cache.slice(0, 16), this.cache = this.cache.slice(16), I;
    } else if (this.cache.length >= 16)
      return I = this.cache.slice(0, 16), this.cache = this.cache.slice(16), I;
    return null;
  }, m.prototype.flush = function() {
    if (this.cache.length)
      return this.cache;
  };
  function f(R) {
    var I = R[15];
    if (I < 1 || I > 16)
      throw new Error("unable to decrypt data");
    for (var k = -1; ++k < I; )
      if (R[k + (16 - I)] !== I)
        throw new Error("unable to decrypt data");
    if (I !== 16)
      return R.slice(0, 16 - I);
  }
  function y(R, I, k) {
    var $ = B[R.toLowerCase()];
    if (!$)
      throw new TypeError("invalid suite type");
    if (typeof k == "string" && (k = _.from(k)), $.mode !== "GCM" && k.length !== $.iv)
      throw new TypeError("invalid iv length " + k.length);
    if (typeof I == "string" && (I = _.from(I)), I.length !== $.key / 8)
      throw new TypeError("invalid key length " + I.length);
    return $.type === "stream" ? new M($.module, I, k, !0) : $.type === "auth" ? new A($.module, I, k, !0) : new x($.module, I, k);
  }
  function q(R, I) {
    var k = B[R.toLowerCase()];
    if (!k)
      throw new TypeError("invalid suite type");
    var $ = S(I, !1, k.key, k.iv);
    return y(R, $.key, $.iv);
  }
  return decrypter.createDecipher = q, decrypter.createDecipheriv = y, decrypter;
}
var hasRequiredBrowser$6;
function requireBrowser$6() {
  if (hasRequiredBrowser$6)
    return browser$5;
  hasRequiredBrowser$6 = 1;
  var A = requireEncrypter(), _ = requireDecrypter(), B = require$$2;
  function M() {
    return Object.keys(B);
  }
  return browser$5.createCipher = browser$5.Cipher = A.createCipher, browser$5.createCipheriv = browser$5.Cipheriv = A.createCipheriv, browser$5.createDecipher = browser$5.Decipher = _.createDecipher, browser$5.createDecipheriv = browser$5.Decipheriv = _.createDecipheriv, browser$5.listCiphers = browser$5.getCiphers = M, browser$5;
}
var modes = {}, hasRequiredModes;
function requireModes() {
  return hasRequiredModes || (hasRequiredModes = 1, function(A) {
    A["des-ecb"] = {
      key: 8,
      iv: 0
    }, A["des-cbc"] = A.des = {
      key: 8,
      iv: 8
    }, A["des-ede3-cbc"] = A.des3 = {
      key: 24,
      iv: 8
    }, A["des-ede3"] = {
      key: 24,
      iv: 0
    }, A["des-ede-cbc"] = {
      key: 16,
      iv: 8
    }, A["des-ede"] = {
      key: 16,
      iv: 0
    };
  }(modes)), modes;
}
var hasRequiredBrowser$5;
function requireBrowser$5() {
  if (hasRequiredBrowser$5)
    return browser$6;
  hasRequiredBrowser$5 = 1;
  var A = requireBrowserifyDes(), _ = requireBrowser$6(), B = requireModes$1(), M = requireModes(), P = requireEvp_bytestokey();
  function r(f, y) {
    f = f.toLowerCase();
    var q, R;
    if (B[f])
      q = B[f].key, R = B[f].iv;
    else if (M[f])
      q = M[f].key * 8, R = M[f].iv;
    else
      throw new TypeError("invalid suite type");
    var I = P(y, !1, q, R);
    return d(f, I.key, I.iv);
  }
  function S(f, y) {
    f = f.toLowerCase();
    var q, R;
    if (B[f])
      q = B[f].key, R = B[f].iv;
    else if (M[f])
      q = M[f].key * 8, R = M[f].iv;
    else
      throw new TypeError("invalid suite type");
    var I = P(y, !1, q, R);
    return x(f, I.key, I.iv);
  }
  function d(f, y, q) {
    if (f = f.toLowerCase(), B[f])
      return _.createCipheriv(f, y, q);
    if (M[f])
      return new A({ key: y, iv: q, mode: f });
    throw new TypeError("invalid suite type");
  }
  function x(f, y, q) {
    if (f = f.toLowerCase(), B[f])
      return _.createDecipheriv(f, y, q);
    if (M[f])
      return new A({ key: y, iv: q, mode: f, decrypt: !0 });
    throw new TypeError("invalid suite type");
  }
  function m() {
    return Object.keys(M).concat(_.getCiphers());
  }
  return browser$6.createCipher = browser$6.Cipher = r, browser$6.createCipheriv = browser$6.Cipheriv = d, browser$6.createDecipher = browser$6.Decipher = S, browser$6.createDecipheriv = browser$6.Decipheriv = x, browser$6.listCiphers = browser$6.getCiphers = m, browser$6;
}
var browser$4 = {}, bn$2 = { exports: {} };
bn$2.exports;
var hasRequiredBn$2;
function requireBn$2() {
  return hasRequiredBn$2 || (hasRequiredBn$2 = 1, function(A) {
    (function(_, B) {
      function M(U, E) {
        if (!U)
          throw new Error(E || "Assertion failed");
      }
      function P(U, E) {
        U.super_ = E;
        var o = function() {
        };
        o.prototype = E.prototype, U.prototype = new o(), U.prototype.constructor = U;
      }
      function r(U, E, o) {
        if (r.isBN(U))
          return U;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, U !== null && ((E === "le" || E === "be") && (o = E, E = 10), this._init(U || 0, E || 10, o || "be"));
      }
      typeof _ == "object" ? _.exports = r : B.BN = r, r.BN = r, r.wordSize = 26;
      var S;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? S = window.Buffer : S = requireBuffer$1().Buffer;
      } catch {
      }
      r.isBN = function(E) {
        return E instanceof r ? !0 : E !== null && typeof E == "object" && E.constructor.wordSize === r.wordSize && Array.isArray(E.words);
      }, r.max = function(E, o) {
        return E.cmp(o) > 0 ? E : o;
      }, r.min = function(E, o) {
        return E.cmp(o) < 0 ? E : o;
      }, r.prototype._init = function(E, o, e) {
        if (typeof E == "number")
          return this._initNumber(E, o, e);
        if (typeof E == "object")
          return this._initArray(E, o, e);
        o === "hex" && (o = 16), M(o === (o | 0) && o >= 2 && o <= 36), E = E.toString().replace(/\s+/g, "");
        var t = 0;
        E[0] === "-" && (t++, this.negative = 1), t < E.length && (o === 16 ? this._parseHex(E, t, e) : (this._parseBase(E, o, t), e === "le" && this._initArray(this.toArray(), o, e)));
      }, r.prototype._initNumber = function(E, o, e) {
        E < 0 && (this.negative = 1, E = -E), E < 67108864 ? (this.words = [E & 67108863], this.length = 1) : E < 4503599627370496 ? (this.words = [
          E & 67108863,
          E / 67108864 & 67108863
        ], this.length = 2) : (M(E < 9007199254740992), this.words = [
          E & 67108863,
          E / 67108864 & 67108863,
          1
        ], this.length = 3), e === "le" && this._initArray(this.toArray(), o, e);
      }, r.prototype._initArray = function(E, o, e) {
        if (M(typeof E.length == "number"), E.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(E.length / 3), this.words = new Array(this.length);
        for (var t = 0; t < this.length; t++)
          this.words[t] = 0;
        var v, g, h = 0;
        if (e === "be")
          for (t = E.length - 1, v = 0; t >= 0; t -= 3)
            g = E[t] | E[t - 1] << 8 | E[t - 2] << 16, this.words[v] |= g << h & 67108863, this.words[v + 1] = g >>> 26 - h & 67108863, h += 24, h >= 26 && (h -= 26, v++);
        else if (e === "le")
          for (t = 0, v = 0; t < E.length; t += 3)
            g = E[t] | E[t + 1] << 8 | E[t + 2] << 16, this.words[v] |= g << h & 67108863, this.words[v + 1] = g >>> 26 - h & 67108863, h += 24, h >= 26 && (h -= 26, v++);
        return this.strip();
      };
      function d(U, E) {
        var o = U.charCodeAt(E);
        return o >= 65 && o <= 70 ? o - 55 : o >= 97 && o <= 102 ? o - 87 : o - 48 & 15;
      }
      function x(U, E, o) {
        var e = d(U, o);
        return o - 1 >= E && (e |= d(U, o - 1) << 4), e;
      }
      r.prototype._parseHex = function(E, o, e) {
        this.length = Math.ceil((E.length - o) / 6), this.words = new Array(this.length);
        for (var t = 0; t < this.length; t++)
          this.words[t] = 0;
        var v = 0, g = 0, h;
        if (e === "be")
          for (t = E.length - 1; t >= o; t -= 2)
            h = x(E, o, t) << v, this.words[g] |= h & 67108863, v >= 18 ? (v -= 18, g += 1, this.words[g] |= h >>> 26) : v += 8;
        else {
          var b = E.length - o;
          for (t = b % 2 === 0 ? o + 1 : o; t < E.length; t += 2)
            h = x(E, o, t) << v, this.words[g] |= h & 67108863, v >= 18 ? (v -= 18, g += 1, this.words[g] |= h >>> 26) : v += 8;
        }
        this.strip();
      };
      function m(U, E, o, e) {
        for (var t = 0, v = Math.min(U.length, o), g = E; g < v; g++) {
          var h = U.charCodeAt(g) - 48;
          t *= e, h >= 49 ? t += h - 49 + 10 : h >= 17 ? t += h - 17 + 10 : t += h;
        }
        return t;
      }
      r.prototype._parseBase = function(E, o, e) {
        this.words = [0], this.length = 1;
        for (var t = 0, v = 1; v <= 67108863; v *= o)
          t++;
        t--, v = v / o | 0;
        for (var g = E.length - e, h = g % t, b = Math.min(g, g - h) + e, p = 0, w = e; w < b; w += t)
          p = m(E, w, w + t, o), this.imuln(v), this.words[0] + p < 67108864 ? this.words[0] += p : this._iaddn(p);
        if (h !== 0) {
          var a = 1;
          for (p = m(E, w, E.length, o), w = 0; w < h; w++)
            a *= o;
          this.imuln(a), this.words[0] + p < 67108864 ? this.words[0] += p : this._iaddn(p);
        }
        this.strip();
      }, r.prototype.copy = function(E) {
        E.words = new Array(this.length);
        for (var o = 0; o < this.length; o++)
          E.words[o] = this.words[o];
        E.length = this.length, E.negative = this.negative, E.red = this.red;
      }, r.prototype.clone = function() {
        var E = new r(null);
        return this.copy(E), E;
      }, r.prototype._expand = function(E) {
        for (; this.length < E; )
          this.words[this.length++] = 0;
        return this;
      }, r.prototype.strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, r.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, r.prototype.inspect = function() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      };
      var f = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], y = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], q = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      r.prototype.toString = function(E, o) {
        E = E || 10, o = o | 0 || 1;
        var e;
        if (E === 16 || E === "hex") {
          e = "";
          for (var t = 0, v = 0, g = 0; g < this.length; g++) {
            var h = this.words[g], b = ((h << t | v) & 16777215).toString(16);
            v = h >>> 24 - t & 16777215, v !== 0 || g !== this.length - 1 ? e = f[6 - b.length] + b + e : e = b + e, t += 2, t >= 26 && (t -= 26, g--);
          }
          for (v !== 0 && (e = v.toString(16) + e); e.length % o !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        if (E === (E | 0) && E >= 2 && E <= 36) {
          var p = y[E], w = q[E];
          e = "";
          var a = this.clone();
          for (a.negative = 0; !a.isZero(); ) {
            var T = a.modn(w).toString(E);
            a = a.idivn(w), a.isZero() ? e = T + e : e = f[p - T.length] + T + e;
          }
          for (this.isZero() && (e = "0" + e); e.length % o !== 0; )
            e = "0" + e;
          return this.negative !== 0 && (e = "-" + e), e;
        }
        M(!1, "Base should be between 2 and 36");
      }, r.prototype.toNumber = function() {
        var E = this.words[0];
        return this.length === 2 ? E += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? E += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && M(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -E : E;
      }, r.prototype.toJSON = function() {
        return this.toString(16);
      }, r.prototype.toBuffer = function(E, o) {
        return M(typeof S < "u"), this.toArrayLike(S, E, o);
      }, r.prototype.toArray = function(E, o) {
        return this.toArrayLike(Array, E, o);
      }, r.prototype.toArrayLike = function(E, o, e) {
        var t = this.byteLength(), v = e || Math.max(1, t);
        M(t <= v, "byte array longer than desired length"), M(v > 0, "Requested array length <= 0"), this.strip();
        var g = o === "le", h = new E(v), b, p, w = this.clone();
        if (g) {
          for (p = 0; !w.isZero(); p++)
            b = w.andln(255), w.iushrn(8), h[p] = b;
          for (; p < v; p++)
            h[p] = 0;
        } else {
          for (p = 0; p < v - t; p++)
            h[p] = 0;
          for (p = 0; !w.isZero(); p++)
            b = w.andln(255), w.iushrn(8), h[v - p - 1] = b;
        }
        return h;
      }, Math.clz32 ? r.prototype._countBits = function(E) {
        return 32 - Math.clz32(E);
      } : r.prototype._countBits = function(E) {
        var o = E, e = 0;
        return o >= 4096 && (e += 13, o >>>= 13), o >= 64 && (e += 7, o >>>= 7), o >= 8 && (e += 4, o >>>= 4), o >= 2 && (e += 2, o >>>= 2), e + o;
      }, r.prototype._zeroBits = function(E) {
        if (E === 0)
          return 26;
        var o = E, e = 0;
        return o & 8191 || (e += 13, o >>>= 13), o & 127 || (e += 7, o >>>= 7), o & 15 || (e += 4, o >>>= 4), o & 3 || (e += 2, o >>>= 2), o & 1 || e++, e;
      }, r.prototype.bitLength = function() {
        var E = this.words[this.length - 1], o = this._countBits(E);
        return (this.length - 1) * 26 + o;
      };
      function R(U) {
        for (var E = new Array(U.bitLength()), o = 0; o < E.length; o++) {
          var e = o / 26 | 0, t = o % 26;
          E[o] = (U.words[e] & 1 << t) >>> t;
        }
        return E;
      }
      r.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var E = 0, o = 0; o < this.length; o++) {
          var e = this._zeroBits(this.words[o]);
          if (E += e, e !== 26)
            break;
        }
        return E;
      }, r.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, r.prototype.toTwos = function(E) {
        return this.negative !== 0 ? this.abs().inotn(E).iaddn(1) : this.clone();
      }, r.prototype.fromTwos = function(E) {
        return this.testn(E - 1) ? this.notn(E).iaddn(1).ineg() : this.clone();
      }, r.prototype.isNeg = function() {
        return this.negative !== 0;
      }, r.prototype.neg = function() {
        return this.clone().ineg();
      }, r.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, r.prototype.iuor = function(E) {
        for (; this.length < E.length; )
          this.words[this.length++] = 0;
        for (var o = 0; o < E.length; o++)
          this.words[o] = this.words[o] | E.words[o];
        return this.strip();
      }, r.prototype.ior = function(E) {
        return M((this.negative | E.negative) === 0), this.iuor(E);
      }, r.prototype.or = function(E) {
        return this.length > E.length ? this.clone().ior(E) : E.clone().ior(this);
      }, r.prototype.uor = function(E) {
        return this.length > E.length ? this.clone().iuor(E) : E.clone().iuor(this);
      }, r.prototype.iuand = function(E) {
        var o;
        this.length > E.length ? o = E : o = this;
        for (var e = 0; e < o.length; e++)
          this.words[e] = this.words[e] & E.words[e];
        return this.length = o.length, this.strip();
      }, r.prototype.iand = function(E) {
        return M((this.negative | E.negative) === 0), this.iuand(E);
      }, r.prototype.and = function(E) {
        return this.length > E.length ? this.clone().iand(E) : E.clone().iand(this);
      }, r.prototype.uand = function(E) {
        return this.length > E.length ? this.clone().iuand(E) : E.clone().iuand(this);
      }, r.prototype.iuxor = function(E) {
        var o, e;
        this.length > E.length ? (o = this, e = E) : (o = E, e = this);
        for (var t = 0; t < e.length; t++)
          this.words[t] = o.words[t] ^ e.words[t];
        if (this !== o)
          for (; t < o.length; t++)
            this.words[t] = o.words[t];
        return this.length = o.length, this.strip();
      }, r.prototype.ixor = function(E) {
        return M((this.negative | E.negative) === 0), this.iuxor(E);
      }, r.prototype.xor = function(E) {
        return this.length > E.length ? this.clone().ixor(E) : E.clone().ixor(this);
      }, r.prototype.uxor = function(E) {
        return this.length > E.length ? this.clone().iuxor(E) : E.clone().iuxor(this);
      }, r.prototype.inotn = function(E) {
        M(typeof E == "number" && E >= 0);
        var o = Math.ceil(E / 26) | 0, e = E % 26;
        this._expand(o), e > 0 && o--;
        for (var t = 0; t < o; t++)
          this.words[t] = ~this.words[t] & 67108863;
        return e > 0 && (this.words[t] = ~this.words[t] & 67108863 >> 26 - e), this.strip();
      }, r.prototype.notn = function(E) {
        return this.clone().inotn(E);
      }, r.prototype.setn = function(E, o) {
        M(typeof E == "number" && E >= 0);
        var e = E / 26 | 0, t = E % 26;
        return this._expand(e + 1), o ? this.words[e] = this.words[e] | 1 << t : this.words[e] = this.words[e] & ~(1 << t), this.strip();
      }, r.prototype.iadd = function(E) {
        var o;
        if (this.negative !== 0 && E.negative === 0)
          return this.negative = 0, o = this.isub(E), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && E.negative !== 0)
          return E.negative = 0, o = this.isub(E), E.negative = 1, o._normSign();
        var e, t;
        this.length > E.length ? (e = this, t = E) : (e = E, t = this);
        for (var v = 0, g = 0; g < t.length; g++)
          o = (e.words[g] | 0) + (t.words[g] | 0) + v, this.words[g] = o & 67108863, v = o >>> 26;
        for (; v !== 0 && g < e.length; g++)
          o = (e.words[g] | 0) + v, this.words[g] = o & 67108863, v = o >>> 26;
        if (this.length = e.length, v !== 0)
          this.words[this.length] = v, this.length++;
        else if (e !== this)
          for (; g < e.length; g++)
            this.words[g] = e.words[g];
        return this;
      }, r.prototype.add = function(E) {
        var o;
        return E.negative !== 0 && this.negative === 0 ? (E.negative = 0, o = this.sub(E), E.negative ^= 1, o) : E.negative === 0 && this.negative !== 0 ? (this.negative = 0, o = E.sub(this), this.negative = 1, o) : this.length > E.length ? this.clone().iadd(E) : E.clone().iadd(this);
      }, r.prototype.isub = function(E) {
        if (E.negative !== 0) {
          E.negative = 0;
          var o = this.iadd(E);
          return E.negative = 1, o._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(E), this.negative = 1, this._normSign();
        var e = this.cmp(E);
        if (e === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var t, v;
        e > 0 ? (t = this, v = E) : (t = E, v = this);
        for (var g = 0, h = 0; h < v.length; h++)
          o = (t.words[h] | 0) - (v.words[h] | 0) + g, g = o >> 26, this.words[h] = o & 67108863;
        for (; g !== 0 && h < t.length; h++)
          o = (t.words[h] | 0) + g, g = o >> 26, this.words[h] = o & 67108863;
        if (g === 0 && h < t.length && t !== this)
          for (; h < t.length; h++)
            this.words[h] = t.words[h];
        return this.length = Math.max(this.length, h), t !== this && (this.negative = 1), this.strip();
      }, r.prototype.sub = function(E) {
        return this.clone().isub(E);
      };
      function I(U, E, o) {
        o.negative = E.negative ^ U.negative;
        var e = U.length + E.length | 0;
        o.length = e, e = e - 1 | 0;
        var t = U.words[0] | 0, v = E.words[0] | 0, g = t * v, h = g & 67108863, b = g / 67108864 | 0;
        o.words[0] = h;
        for (var p = 1; p < e; p++) {
          for (var w = b >>> 26, a = b & 67108863, T = Math.min(p, E.length - 1), V = Math.max(0, p - U.length + 1); V <= T; V++) {
            var Y = p - V | 0;
            t = U.words[Y] | 0, v = E.words[V] | 0, g = t * v + a, w += g / 67108864 | 0, a = g & 67108863;
          }
          o.words[p] = a | 0, b = w | 0;
        }
        return b !== 0 ? o.words[p] = b | 0 : o.length--, o.strip();
      }
      var k = function(E, o, e) {
        var t = E.words, v = o.words, g = e.words, h = 0, b, p, w, a = t[0] | 0, T = a & 8191, V = a >>> 13, Y = t[1] | 0, z = Y & 8191, D = Y >>> 13, N = t[2] | 0, Q = N & 8191, te = N >>> 13, G = t[3] | 0, W = G & 8191, ae = G >>> 13, se = t[4] | 0, he = se & 8191, Z = se >>> 13, O = t[5] | 0, F = O & 8191, K = O >>> 13, re = t[6] | 0, fe = re & 8191, oe = re >>> 13, le = t[7] | 0, ce = le & 8191, ve = le >>> 13, pe = t[8] | 0, de = pe & 8191, Ne = pe >>> 13, Re = t[9] | 0, be = Re & 8191, Ue = Re >>> 13, Ie = v[0] | 0, ye = Ie & 8191, je = Ie >>> 13, Te = v[1] | 0, me = Te & 8191, He = Te >>> 13, ke = v[2] | 0, ge = ke & 8191, ze = ke >>> 13, Pe = v[3] | 0, we = Pe & 8191, We = Pe >>> 13, Ce = v[4] | 0, xe = Ce & 8191, Ke = Ce >>> 13, $e = v[5] | 0, _e = $e & 8191, Ge = $e >>> 13, De = v[6] | 0, Me = De & 8191, Ve = De >>> 13, Oe = v[7] | 0, Se = Oe & 8191, Je = Oe >>> 13, Le = v[8] | 0, qe = Le & 8191, Ze = Le >>> 13, Fe = v[9] | 0, Ee = Fe & 8191, Xe = Fe >>> 13;
        e.negative = E.negative ^ o.negative, e.length = 19, b = Math.imul(T, ye), p = Math.imul(T, je), p = p + Math.imul(V, ye) | 0, w = Math.imul(V, je);
        var Ae = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, b = Math.imul(z, ye), p = Math.imul(z, je), p = p + Math.imul(D, ye) | 0, w = Math.imul(D, je), b = b + Math.imul(T, me) | 0, p = p + Math.imul(T, He) | 0, p = p + Math.imul(V, me) | 0, w = w + Math.imul(V, He) | 0;
        var Be = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, b = Math.imul(Q, ye), p = Math.imul(Q, je), p = p + Math.imul(te, ye) | 0, w = Math.imul(te, je), b = b + Math.imul(z, me) | 0, p = p + Math.imul(z, He) | 0, p = p + Math.imul(D, me) | 0, w = w + Math.imul(D, He) | 0, b = b + Math.imul(T, ge) | 0, p = p + Math.imul(T, ze) | 0, p = p + Math.imul(V, ge) | 0, w = w + Math.imul(V, ze) | 0;
        var Ye = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (Ye >>> 26) | 0, Ye &= 67108863, b = Math.imul(W, ye), p = Math.imul(W, je), p = p + Math.imul(ae, ye) | 0, w = Math.imul(ae, je), b = b + Math.imul(Q, me) | 0, p = p + Math.imul(Q, He) | 0, p = p + Math.imul(te, me) | 0, w = w + Math.imul(te, He) | 0, b = b + Math.imul(z, ge) | 0, p = p + Math.imul(z, ze) | 0, p = p + Math.imul(D, ge) | 0, w = w + Math.imul(D, ze) | 0, b = b + Math.imul(T, we) | 0, p = p + Math.imul(T, We) | 0, p = p + Math.imul(V, we) | 0, w = w + Math.imul(V, We) | 0;
        var Qe = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, b = Math.imul(he, ye), p = Math.imul(he, je), p = p + Math.imul(Z, ye) | 0, w = Math.imul(Z, je), b = b + Math.imul(W, me) | 0, p = p + Math.imul(W, He) | 0, p = p + Math.imul(ae, me) | 0, w = w + Math.imul(ae, He) | 0, b = b + Math.imul(Q, ge) | 0, p = p + Math.imul(Q, ze) | 0, p = p + Math.imul(te, ge) | 0, w = w + Math.imul(te, ze) | 0, b = b + Math.imul(z, we) | 0, p = p + Math.imul(z, We) | 0, p = p + Math.imul(D, we) | 0, w = w + Math.imul(D, We) | 0, b = b + Math.imul(T, xe) | 0, p = p + Math.imul(T, Ke) | 0, p = p + Math.imul(V, xe) | 0, w = w + Math.imul(V, Ke) | 0;
        var er = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (er >>> 26) | 0, er &= 67108863, b = Math.imul(F, ye), p = Math.imul(F, je), p = p + Math.imul(K, ye) | 0, w = Math.imul(K, je), b = b + Math.imul(he, me) | 0, p = p + Math.imul(he, He) | 0, p = p + Math.imul(Z, me) | 0, w = w + Math.imul(Z, He) | 0, b = b + Math.imul(W, ge) | 0, p = p + Math.imul(W, ze) | 0, p = p + Math.imul(ae, ge) | 0, w = w + Math.imul(ae, ze) | 0, b = b + Math.imul(Q, we) | 0, p = p + Math.imul(Q, We) | 0, p = p + Math.imul(te, we) | 0, w = w + Math.imul(te, We) | 0, b = b + Math.imul(z, xe) | 0, p = p + Math.imul(z, Ke) | 0, p = p + Math.imul(D, xe) | 0, w = w + Math.imul(D, Ke) | 0, b = b + Math.imul(T, _e) | 0, p = p + Math.imul(T, Ge) | 0, p = p + Math.imul(V, _e) | 0, w = w + Math.imul(V, Ge) | 0;
        var rr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, b = Math.imul(fe, ye), p = Math.imul(fe, je), p = p + Math.imul(oe, ye) | 0, w = Math.imul(oe, je), b = b + Math.imul(F, me) | 0, p = p + Math.imul(F, He) | 0, p = p + Math.imul(K, me) | 0, w = w + Math.imul(K, He) | 0, b = b + Math.imul(he, ge) | 0, p = p + Math.imul(he, ze) | 0, p = p + Math.imul(Z, ge) | 0, w = w + Math.imul(Z, ze) | 0, b = b + Math.imul(W, we) | 0, p = p + Math.imul(W, We) | 0, p = p + Math.imul(ae, we) | 0, w = w + Math.imul(ae, We) | 0, b = b + Math.imul(Q, xe) | 0, p = p + Math.imul(Q, Ke) | 0, p = p + Math.imul(te, xe) | 0, w = w + Math.imul(te, Ke) | 0, b = b + Math.imul(z, _e) | 0, p = p + Math.imul(z, Ge) | 0, p = p + Math.imul(D, _e) | 0, w = w + Math.imul(D, Ge) | 0, b = b + Math.imul(T, Me) | 0, p = p + Math.imul(T, Ve) | 0, p = p + Math.imul(V, Me) | 0, w = w + Math.imul(V, Ve) | 0;
        var tr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, b = Math.imul(ce, ye), p = Math.imul(ce, je), p = p + Math.imul(ve, ye) | 0, w = Math.imul(ve, je), b = b + Math.imul(fe, me) | 0, p = p + Math.imul(fe, He) | 0, p = p + Math.imul(oe, me) | 0, w = w + Math.imul(oe, He) | 0, b = b + Math.imul(F, ge) | 0, p = p + Math.imul(F, ze) | 0, p = p + Math.imul(K, ge) | 0, w = w + Math.imul(K, ze) | 0, b = b + Math.imul(he, we) | 0, p = p + Math.imul(he, We) | 0, p = p + Math.imul(Z, we) | 0, w = w + Math.imul(Z, We) | 0, b = b + Math.imul(W, xe) | 0, p = p + Math.imul(W, Ke) | 0, p = p + Math.imul(ae, xe) | 0, w = w + Math.imul(ae, Ke) | 0, b = b + Math.imul(Q, _e) | 0, p = p + Math.imul(Q, Ge) | 0, p = p + Math.imul(te, _e) | 0, w = w + Math.imul(te, Ge) | 0, b = b + Math.imul(z, Me) | 0, p = p + Math.imul(z, Ve) | 0, p = p + Math.imul(D, Me) | 0, w = w + Math.imul(D, Ve) | 0, b = b + Math.imul(T, Se) | 0, p = p + Math.imul(T, Je) | 0, p = p + Math.imul(V, Se) | 0, w = w + Math.imul(V, Je) | 0;
        var ir = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, b = Math.imul(de, ye), p = Math.imul(de, je), p = p + Math.imul(Ne, ye) | 0, w = Math.imul(Ne, je), b = b + Math.imul(ce, me) | 0, p = p + Math.imul(ce, He) | 0, p = p + Math.imul(ve, me) | 0, w = w + Math.imul(ve, He) | 0, b = b + Math.imul(fe, ge) | 0, p = p + Math.imul(fe, ze) | 0, p = p + Math.imul(oe, ge) | 0, w = w + Math.imul(oe, ze) | 0, b = b + Math.imul(F, we) | 0, p = p + Math.imul(F, We) | 0, p = p + Math.imul(K, we) | 0, w = w + Math.imul(K, We) | 0, b = b + Math.imul(he, xe) | 0, p = p + Math.imul(he, Ke) | 0, p = p + Math.imul(Z, xe) | 0, w = w + Math.imul(Z, Ke) | 0, b = b + Math.imul(W, _e) | 0, p = p + Math.imul(W, Ge) | 0, p = p + Math.imul(ae, _e) | 0, w = w + Math.imul(ae, Ge) | 0, b = b + Math.imul(Q, Me) | 0, p = p + Math.imul(Q, Ve) | 0, p = p + Math.imul(te, Me) | 0, w = w + Math.imul(te, Ve) | 0, b = b + Math.imul(z, Se) | 0, p = p + Math.imul(z, Je) | 0, p = p + Math.imul(D, Se) | 0, w = w + Math.imul(D, Je) | 0, b = b + Math.imul(T, qe) | 0, p = p + Math.imul(T, Ze) | 0, p = p + Math.imul(V, qe) | 0, w = w + Math.imul(V, Ze) | 0;
        var nr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, b = Math.imul(be, ye), p = Math.imul(be, je), p = p + Math.imul(Ue, ye) | 0, w = Math.imul(Ue, je), b = b + Math.imul(de, me) | 0, p = p + Math.imul(de, He) | 0, p = p + Math.imul(Ne, me) | 0, w = w + Math.imul(Ne, He) | 0, b = b + Math.imul(ce, ge) | 0, p = p + Math.imul(ce, ze) | 0, p = p + Math.imul(ve, ge) | 0, w = w + Math.imul(ve, ze) | 0, b = b + Math.imul(fe, we) | 0, p = p + Math.imul(fe, We) | 0, p = p + Math.imul(oe, we) | 0, w = w + Math.imul(oe, We) | 0, b = b + Math.imul(F, xe) | 0, p = p + Math.imul(F, Ke) | 0, p = p + Math.imul(K, xe) | 0, w = w + Math.imul(K, Ke) | 0, b = b + Math.imul(he, _e) | 0, p = p + Math.imul(he, Ge) | 0, p = p + Math.imul(Z, _e) | 0, w = w + Math.imul(Z, Ge) | 0, b = b + Math.imul(W, Me) | 0, p = p + Math.imul(W, Ve) | 0, p = p + Math.imul(ae, Me) | 0, w = w + Math.imul(ae, Ve) | 0, b = b + Math.imul(Q, Se) | 0, p = p + Math.imul(Q, Je) | 0, p = p + Math.imul(te, Se) | 0, w = w + Math.imul(te, Je) | 0, b = b + Math.imul(z, qe) | 0, p = p + Math.imul(z, Ze) | 0, p = p + Math.imul(D, qe) | 0, w = w + Math.imul(D, Ze) | 0, b = b + Math.imul(T, Ee) | 0, p = p + Math.imul(T, Xe) | 0, p = p + Math.imul(V, Ee) | 0, w = w + Math.imul(V, Xe) | 0;
        var ar = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, b = Math.imul(be, me), p = Math.imul(be, He), p = p + Math.imul(Ue, me) | 0, w = Math.imul(Ue, He), b = b + Math.imul(de, ge) | 0, p = p + Math.imul(de, ze) | 0, p = p + Math.imul(Ne, ge) | 0, w = w + Math.imul(Ne, ze) | 0, b = b + Math.imul(ce, we) | 0, p = p + Math.imul(ce, We) | 0, p = p + Math.imul(ve, we) | 0, w = w + Math.imul(ve, We) | 0, b = b + Math.imul(fe, xe) | 0, p = p + Math.imul(fe, Ke) | 0, p = p + Math.imul(oe, xe) | 0, w = w + Math.imul(oe, Ke) | 0, b = b + Math.imul(F, _e) | 0, p = p + Math.imul(F, Ge) | 0, p = p + Math.imul(K, _e) | 0, w = w + Math.imul(K, Ge) | 0, b = b + Math.imul(he, Me) | 0, p = p + Math.imul(he, Ve) | 0, p = p + Math.imul(Z, Me) | 0, w = w + Math.imul(Z, Ve) | 0, b = b + Math.imul(W, Se) | 0, p = p + Math.imul(W, Je) | 0, p = p + Math.imul(ae, Se) | 0, w = w + Math.imul(ae, Je) | 0, b = b + Math.imul(Q, qe) | 0, p = p + Math.imul(Q, Ze) | 0, p = p + Math.imul(te, qe) | 0, w = w + Math.imul(te, Ze) | 0, b = b + Math.imul(z, Ee) | 0, p = p + Math.imul(z, Xe) | 0, p = p + Math.imul(D, Ee) | 0, w = w + Math.imul(D, Xe) | 0;
        var fr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, b = Math.imul(be, ge), p = Math.imul(be, ze), p = p + Math.imul(Ue, ge) | 0, w = Math.imul(Ue, ze), b = b + Math.imul(de, we) | 0, p = p + Math.imul(de, We) | 0, p = p + Math.imul(Ne, we) | 0, w = w + Math.imul(Ne, We) | 0, b = b + Math.imul(ce, xe) | 0, p = p + Math.imul(ce, Ke) | 0, p = p + Math.imul(ve, xe) | 0, w = w + Math.imul(ve, Ke) | 0, b = b + Math.imul(fe, _e) | 0, p = p + Math.imul(fe, Ge) | 0, p = p + Math.imul(oe, _e) | 0, w = w + Math.imul(oe, Ge) | 0, b = b + Math.imul(F, Me) | 0, p = p + Math.imul(F, Ve) | 0, p = p + Math.imul(K, Me) | 0, w = w + Math.imul(K, Ve) | 0, b = b + Math.imul(he, Se) | 0, p = p + Math.imul(he, Je) | 0, p = p + Math.imul(Z, Se) | 0, w = w + Math.imul(Z, Je) | 0, b = b + Math.imul(W, qe) | 0, p = p + Math.imul(W, Ze) | 0, p = p + Math.imul(ae, qe) | 0, w = w + Math.imul(ae, Ze) | 0, b = b + Math.imul(Q, Ee) | 0, p = p + Math.imul(Q, Xe) | 0, p = p + Math.imul(te, Ee) | 0, w = w + Math.imul(te, Xe) | 0;
        var sr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, b = Math.imul(be, we), p = Math.imul(be, We), p = p + Math.imul(Ue, we) | 0, w = Math.imul(Ue, We), b = b + Math.imul(de, xe) | 0, p = p + Math.imul(de, Ke) | 0, p = p + Math.imul(Ne, xe) | 0, w = w + Math.imul(Ne, Ke) | 0, b = b + Math.imul(ce, _e) | 0, p = p + Math.imul(ce, Ge) | 0, p = p + Math.imul(ve, _e) | 0, w = w + Math.imul(ve, Ge) | 0, b = b + Math.imul(fe, Me) | 0, p = p + Math.imul(fe, Ve) | 0, p = p + Math.imul(oe, Me) | 0, w = w + Math.imul(oe, Ve) | 0, b = b + Math.imul(F, Se) | 0, p = p + Math.imul(F, Je) | 0, p = p + Math.imul(K, Se) | 0, w = w + Math.imul(K, Je) | 0, b = b + Math.imul(he, qe) | 0, p = p + Math.imul(he, Ze) | 0, p = p + Math.imul(Z, qe) | 0, w = w + Math.imul(Z, Ze) | 0, b = b + Math.imul(W, Ee) | 0, p = p + Math.imul(W, Xe) | 0, p = p + Math.imul(ae, Ee) | 0, w = w + Math.imul(ae, Xe) | 0;
        var or = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, b = Math.imul(be, xe), p = Math.imul(be, Ke), p = p + Math.imul(Ue, xe) | 0, w = Math.imul(Ue, Ke), b = b + Math.imul(de, _e) | 0, p = p + Math.imul(de, Ge) | 0, p = p + Math.imul(Ne, _e) | 0, w = w + Math.imul(Ne, Ge) | 0, b = b + Math.imul(ce, Me) | 0, p = p + Math.imul(ce, Ve) | 0, p = p + Math.imul(ve, Me) | 0, w = w + Math.imul(ve, Ve) | 0, b = b + Math.imul(fe, Se) | 0, p = p + Math.imul(fe, Je) | 0, p = p + Math.imul(oe, Se) | 0, w = w + Math.imul(oe, Je) | 0, b = b + Math.imul(F, qe) | 0, p = p + Math.imul(F, Ze) | 0, p = p + Math.imul(K, qe) | 0, w = w + Math.imul(K, Ze) | 0, b = b + Math.imul(he, Ee) | 0, p = p + Math.imul(he, Xe) | 0, p = p + Math.imul(Z, Ee) | 0, w = w + Math.imul(Z, Xe) | 0;
        var ur = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, b = Math.imul(be, _e), p = Math.imul(be, Ge), p = p + Math.imul(Ue, _e) | 0, w = Math.imul(Ue, Ge), b = b + Math.imul(de, Me) | 0, p = p + Math.imul(de, Ve) | 0, p = p + Math.imul(Ne, Me) | 0, w = w + Math.imul(Ne, Ve) | 0, b = b + Math.imul(ce, Se) | 0, p = p + Math.imul(ce, Je) | 0, p = p + Math.imul(ve, Se) | 0, w = w + Math.imul(ve, Je) | 0, b = b + Math.imul(fe, qe) | 0, p = p + Math.imul(fe, Ze) | 0, p = p + Math.imul(oe, qe) | 0, w = w + Math.imul(oe, Ze) | 0, b = b + Math.imul(F, Ee) | 0, p = p + Math.imul(F, Xe) | 0, p = p + Math.imul(K, Ee) | 0, w = w + Math.imul(K, Xe) | 0;
        var hr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, b = Math.imul(be, Me), p = Math.imul(be, Ve), p = p + Math.imul(Ue, Me) | 0, w = Math.imul(Ue, Ve), b = b + Math.imul(de, Se) | 0, p = p + Math.imul(de, Je) | 0, p = p + Math.imul(Ne, Se) | 0, w = w + Math.imul(Ne, Je) | 0, b = b + Math.imul(ce, qe) | 0, p = p + Math.imul(ce, Ze) | 0, p = p + Math.imul(ve, qe) | 0, w = w + Math.imul(ve, Ze) | 0, b = b + Math.imul(fe, Ee) | 0, p = p + Math.imul(fe, Xe) | 0, p = p + Math.imul(oe, Ee) | 0, w = w + Math.imul(oe, Xe) | 0;
        var cr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, b = Math.imul(be, Se), p = Math.imul(be, Je), p = p + Math.imul(Ue, Se) | 0, w = Math.imul(Ue, Je), b = b + Math.imul(de, qe) | 0, p = p + Math.imul(de, Ze) | 0, p = p + Math.imul(Ne, qe) | 0, w = w + Math.imul(Ne, Ze) | 0, b = b + Math.imul(ce, Ee) | 0, p = p + Math.imul(ce, Xe) | 0, p = p + Math.imul(ve, Ee) | 0, w = w + Math.imul(ve, Xe) | 0;
        var dr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (dr >>> 26) | 0, dr &= 67108863, b = Math.imul(be, qe), p = Math.imul(be, Ze), p = p + Math.imul(Ue, qe) | 0, w = Math.imul(Ue, Ze), b = b + Math.imul(de, Ee) | 0, p = p + Math.imul(de, Xe) | 0, p = p + Math.imul(Ne, Ee) | 0, w = w + Math.imul(Ne, Xe) | 0;
        var lr = (h + b | 0) + ((p & 8191) << 13) | 0;
        h = (w + (p >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, b = Math.imul(be, Ee), p = Math.imul(be, Xe), p = p + Math.imul(Ue, Ee) | 0, w = Math.imul(Ue, Xe);
        var pr = (h + b | 0) + ((p & 8191) << 13) | 0;
        return h = (w + (p >>> 13) | 0) + (pr >>> 26) | 0, pr &= 67108863, g[0] = Ae, g[1] = Be, g[2] = Ye, g[3] = Qe, g[4] = er, g[5] = rr, g[6] = tr, g[7] = ir, g[8] = nr, g[9] = ar, g[10] = fr, g[11] = sr, g[12] = or, g[13] = ur, g[14] = hr, g[15] = cr, g[16] = dr, g[17] = lr, g[18] = pr, h !== 0 && (g[19] = h, e.length++), e;
      };
      Math.imul || (k = I);
      function $(U, E, o) {
        o.negative = E.negative ^ U.negative, o.length = U.length + E.length;
        for (var e = 0, t = 0, v = 0; v < o.length - 1; v++) {
          var g = t;
          t = 0;
          for (var h = e & 67108863, b = Math.min(v, E.length - 1), p = Math.max(0, v - U.length + 1); p <= b; p++) {
            var w = v - p, a = U.words[w] | 0, T = E.words[p] | 0, V = a * T, Y = V & 67108863;
            g = g + (V / 67108864 | 0) | 0, Y = Y + h | 0, h = Y & 67108863, g = g + (Y >>> 26) | 0, t += g >>> 26, g &= 67108863;
          }
          o.words[v] = h, e = g, g = t;
        }
        return e !== 0 ? o.words[v] = e : o.length--, o.strip();
      }
      function C(U, E, o) {
        var e = new L();
        return e.mulp(U, E, o);
      }
      r.prototype.mulTo = function(E, o) {
        var e, t = this.length + E.length;
        return this.length === 10 && E.length === 10 ? e = k(this, E, o) : t < 63 ? e = I(this, E, o) : t < 1024 ? e = $(this, E, o) : e = C(this, E, o), e;
      };
      function L(U, E) {
        this.x = U, this.y = E;
      }
      L.prototype.makeRBT = function(E) {
        for (var o = new Array(E), e = r.prototype._countBits(E) - 1, t = 0; t < E; t++)
          o[t] = this.revBin(t, e, E);
        return o;
      }, L.prototype.revBin = function(E, o, e) {
        if (E === 0 || E === e - 1)
          return E;
        for (var t = 0, v = 0; v < o; v++)
          t |= (E & 1) << o - v - 1, E >>= 1;
        return t;
      }, L.prototype.permute = function(E, o, e, t, v, g) {
        for (var h = 0; h < g; h++)
          t[h] = o[E[h]], v[h] = e[E[h]];
      }, L.prototype.transform = function(E, o, e, t, v, g) {
        this.permute(g, E, o, e, t, v);
        for (var h = 1; h < v; h <<= 1)
          for (var b = h << 1, p = Math.cos(2 * Math.PI / b), w = Math.sin(2 * Math.PI / b), a = 0; a < v; a += b)
            for (var T = p, V = w, Y = 0; Y < h; Y++) {
              var z = e[a + Y], D = t[a + Y], N = e[a + Y + h], Q = t[a + Y + h], te = T * N - V * Q;
              Q = T * Q + V * N, N = te, e[a + Y] = z + N, t[a + Y] = D + Q, e[a + Y + h] = z - N, t[a + Y + h] = D - Q, Y !== b && (te = p * T - w * V, V = p * V + w * T, T = te);
            }
      }, L.prototype.guessLen13b = function(E, o) {
        var e = Math.max(o, E) | 1, t = e & 1, v = 0;
        for (e = e / 2 | 0; e; e = e >>> 1)
          v++;
        return 1 << v + 1 + t;
      }, L.prototype.conjugate = function(E, o, e) {
        if (!(e <= 1))
          for (var t = 0; t < e / 2; t++) {
            var v = E[t];
            E[t] = E[e - t - 1], E[e - t - 1] = v, v = o[t], o[t] = -o[e - t - 1], o[e - t - 1] = -v;
          }
      }, L.prototype.normalize13b = function(E, o) {
        for (var e = 0, t = 0; t < o / 2; t++) {
          var v = Math.round(E[2 * t + 1] / o) * 8192 + Math.round(E[2 * t] / o) + e;
          E[t] = v & 67108863, v < 67108864 ? e = 0 : e = v / 67108864 | 0;
        }
        return E;
      }, L.prototype.convert13b = function(E, o, e, t) {
        for (var v = 0, g = 0; g < o; g++)
          v = v + (E[g] | 0), e[2 * g] = v & 8191, v = v >>> 13, e[2 * g + 1] = v & 8191, v = v >>> 13;
        for (g = 2 * o; g < t; ++g)
          e[g] = 0;
        M(v === 0), M((v & -8192) === 0);
      }, L.prototype.stub = function(E) {
        for (var o = new Array(E), e = 0; e < E; e++)
          o[e] = 0;
        return o;
      }, L.prototype.mulp = function(E, o, e) {
        var t = 2 * this.guessLen13b(E.length, o.length), v = this.makeRBT(t), g = this.stub(t), h = new Array(t), b = new Array(t), p = new Array(t), w = new Array(t), a = new Array(t), T = new Array(t), V = e.words;
        V.length = t, this.convert13b(E.words, E.length, h, t), this.convert13b(o.words, o.length, w, t), this.transform(h, g, b, p, t, v), this.transform(w, g, a, T, t, v);
        for (var Y = 0; Y < t; Y++) {
          var z = b[Y] * a[Y] - p[Y] * T[Y];
          p[Y] = b[Y] * T[Y] + p[Y] * a[Y], b[Y] = z;
        }
        return this.conjugate(b, p, t), this.transform(b, p, V, g, t, v), this.conjugate(V, g, t), this.normalize13b(V, t), e.negative = E.negative ^ o.negative, e.length = E.length + o.length, e.strip();
      }, r.prototype.mul = function(E) {
        var o = new r(null);
        return o.words = new Array(this.length + E.length), this.mulTo(E, o);
      }, r.prototype.mulf = function(E) {
        var o = new r(null);
        return o.words = new Array(this.length + E.length), C(this, E, o);
      }, r.prototype.imul = function(E) {
        return this.clone().mulTo(E, this);
      }, r.prototype.imuln = function(E) {
        M(typeof E == "number"), M(E < 67108864);
        for (var o = 0, e = 0; e < this.length; e++) {
          var t = (this.words[e] | 0) * E, v = (t & 67108863) + (o & 67108863);
          o >>= 26, o += t / 67108864 | 0, o += v >>> 26, this.words[e] = v & 67108863;
        }
        return o !== 0 && (this.words[e] = o, this.length++), this;
      }, r.prototype.muln = function(E) {
        return this.clone().imuln(E);
      }, r.prototype.sqr = function() {
        return this.mul(this);
      }, r.prototype.isqr = function() {
        return this.imul(this.clone());
      }, r.prototype.pow = function(E) {
        var o = R(E);
        if (o.length === 0)
          return new r(1);
        for (var e = this, t = 0; t < o.length && o[t] === 0; t++, e = e.sqr())
          ;
        if (++t < o.length)
          for (var v = e.sqr(); t < o.length; t++, v = v.sqr())
            o[t] !== 0 && (e = e.mul(v));
        return e;
      }, r.prototype.iushln = function(E) {
        M(typeof E == "number" && E >= 0);
        var o = E % 26, e = (E - o) / 26, t = 67108863 >>> 26 - o << 26 - o, v;
        if (o !== 0) {
          var g = 0;
          for (v = 0; v < this.length; v++) {
            var h = this.words[v] & t, b = (this.words[v] | 0) - h << o;
            this.words[v] = b | g, g = h >>> 26 - o;
          }
          g && (this.words[v] = g, this.length++);
        }
        if (e !== 0) {
          for (v = this.length - 1; v >= 0; v--)
            this.words[v + e] = this.words[v];
          for (v = 0; v < e; v++)
            this.words[v] = 0;
          this.length += e;
        }
        return this.strip();
      }, r.prototype.ishln = function(E) {
        return M(this.negative === 0), this.iushln(E);
      }, r.prototype.iushrn = function(E, o, e) {
        M(typeof E == "number" && E >= 0);
        var t;
        o ? t = (o - o % 26) / 26 : t = 0;
        var v = E % 26, g = Math.min((E - v) / 26, this.length), h = 67108863 ^ 67108863 >>> v << v, b = e;
        if (t -= g, t = Math.max(0, t), b) {
          for (var p = 0; p < g; p++)
            b.words[p] = this.words[p];
          b.length = g;
        }
        if (g !== 0)
          if (this.length > g)
            for (this.length -= g, p = 0; p < this.length; p++)
              this.words[p] = this.words[p + g];
          else
            this.words[0] = 0, this.length = 1;
        var w = 0;
        for (p = this.length - 1; p >= 0 && (w !== 0 || p >= t); p--) {
          var a = this.words[p] | 0;
          this.words[p] = w << 26 - v | a >>> v, w = a & h;
        }
        return b && w !== 0 && (b.words[b.length++] = w), this.length === 0 && (this.words[0] = 0, this.length = 1), this.strip();
      }, r.prototype.ishrn = function(E, o, e) {
        return M(this.negative === 0), this.iushrn(E, o, e);
      }, r.prototype.shln = function(E) {
        return this.clone().ishln(E);
      }, r.prototype.ushln = function(E) {
        return this.clone().iushln(E);
      }, r.prototype.shrn = function(E) {
        return this.clone().ishrn(E);
      }, r.prototype.ushrn = function(E) {
        return this.clone().iushrn(E);
      }, r.prototype.testn = function(E) {
        M(typeof E == "number" && E >= 0);
        var o = E % 26, e = (E - o) / 26, t = 1 << o;
        if (this.length <= e)
          return !1;
        var v = this.words[e];
        return !!(v & t);
      }, r.prototype.imaskn = function(E) {
        M(typeof E == "number" && E >= 0);
        var o = E % 26, e = (E - o) / 26;
        if (M(this.negative === 0, "imaskn works only with positive numbers"), this.length <= e)
          return this;
        if (o !== 0 && e++, this.length = Math.min(e, this.length), o !== 0) {
          var t = 67108863 ^ 67108863 >>> o << o;
          this.words[this.length - 1] &= t;
        }
        return this.strip();
      }, r.prototype.maskn = function(E) {
        return this.clone().imaskn(E);
      }, r.prototype.iaddn = function(E) {
        return M(typeof E == "number"), M(E < 67108864), E < 0 ? this.isubn(-E) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) < E ? (this.words[0] = E - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(E), this.negative = 1, this) : this._iaddn(E);
      }, r.prototype._iaddn = function(E) {
        this.words[0] += E;
        for (var o = 0; o < this.length && this.words[o] >= 67108864; o++)
          this.words[o] -= 67108864, o === this.length - 1 ? this.words[o + 1] = 1 : this.words[o + 1]++;
        return this.length = Math.max(this.length, o + 1), this;
      }, r.prototype.isubn = function(E) {
        if (M(typeof E == "number"), M(E < 67108864), E < 0)
          return this.iaddn(-E);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(E), this.negative = 1, this;
        if (this.words[0] -= E, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var o = 0; o < this.length && this.words[o] < 0; o++)
            this.words[o] += 67108864, this.words[o + 1] -= 1;
        return this.strip();
      }, r.prototype.addn = function(E) {
        return this.clone().iaddn(E);
      }, r.prototype.subn = function(E) {
        return this.clone().isubn(E);
      }, r.prototype.iabs = function() {
        return this.negative = 0, this;
      }, r.prototype.abs = function() {
        return this.clone().iabs();
      }, r.prototype._ishlnsubmul = function(E, o, e) {
        var t = E.length + e, v;
        this._expand(t);
        var g, h = 0;
        for (v = 0; v < E.length; v++) {
          g = (this.words[v + e] | 0) + h;
          var b = (E.words[v] | 0) * o;
          g -= b & 67108863, h = (g >> 26) - (b / 67108864 | 0), this.words[v + e] = g & 67108863;
        }
        for (; v < this.length - e; v++)
          g = (this.words[v + e] | 0) + h, h = g >> 26, this.words[v + e] = g & 67108863;
        if (h === 0)
          return this.strip();
        for (M(h === -1), h = 0, v = 0; v < this.length; v++)
          g = -(this.words[v] | 0) + h, h = g >> 26, this.words[v] = g & 67108863;
        return this.negative = 1, this.strip();
      }, r.prototype._wordDiv = function(E, o) {
        var e = this.length - E.length, t = this.clone(), v = E, g = v.words[v.length - 1] | 0, h = this._countBits(g);
        e = 26 - h, e !== 0 && (v = v.ushln(e), t.iushln(e), g = v.words[v.length - 1] | 0);
        var b = t.length - v.length, p;
        if (o !== "mod") {
          p = new r(null), p.length = b + 1, p.words = new Array(p.length);
          for (var w = 0; w < p.length; w++)
            p.words[w] = 0;
        }
        var a = t.clone()._ishlnsubmul(v, 1, b);
        a.negative === 0 && (t = a, p && (p.words[b] = 1));
        for (var T = b - 1; T >= 0; T--) {
          var V = (t.words[v.length + T] | 0) * 67108864 + (t.words[v.length + T - 1] | 0);
          for (V = Math.min(V / g | 0, 67108863), t._ishlnsubmul(v, V, T); t.negative !== 0; )
            V--, t.negative = 0, t._ishlnsubmul(v, 1, T), t.isZero() || (t.negative ^= 1);
          p && (p.words[T] = V);
        }
        return p && p.strip(), t.strip(), o !== "div" && e !== 0 && t.iushrn(e), {
          div: p || null,
          mod: t
        };
      }, r.prototype.divmod = function(E, o, e) {
        if (M(!E.isZero()), this.isZero())
          return {
            div: new r(0),
            mod: new r(0)
          };
        var t, v, g;
        return this.negative !== 0 && E.negative === 0 ? (g = this.neg().divmod(E, o), o !== "mod" && (t = g.div.neg()), o !== "div" && (v = g.mod.neg(), e && v.negative !== 0 && v.iadd(E)), {
          div: t,
          mod: v
        }) : this.negative === 0 && E.negative !== 0 ? (g = this.divmod(E.neg(), o), o !== "mod" && (t = g.div.neg()), {
          div: t,
          mod: g.mod
        }) : this.negative & E.negative ? (g = this.neg().divmod(E.neg(), o), o !== "div" && (v = g.mod.neg(), e && v.negative !== 0 && v.isub(E)), {
          div: g.div,
          mod: v
        }) : E.length > this.length || this.cmp(E) < 0 ? {
          div: new r(0),
          mod: this
        } : E.length === 1 ? o === "div" ? {
          div: this.divn(E.words[0]),
          mod: null
        } : o === "mod" ? {
          div: null,
          mod: new r(this.modn(E.words[0]))
        } : {
          div: this.divn(E.words[0]),
          mod: new r(this.modn(E.words[0]))
        } : this._wordDiv(E, o);
      }, r.prototype.div = function(E) {
        return this.divmod(E, "div", !1).div;
      }, r.prototype.mod = function(E) {
        return this.divmod(E, "mod", !1).mod;
      }, r.prototype.umod = function(E) {
        return this.divmod(E, "mod", !0).mod;
      }, r.prototype.divRound = function(E) {
        var o = this.divmod(E);
        if (o.mod.isZero())
          return o.div;
        var e = o.div.negative !== 0 ? o.mod.isub(E) : o.mod, t = E.ushrn(1), v = E.andln(1), g = e.cmp(t);
        return g < 0 || v === 1 && g === 0 ? o.div : o.div.negative !== 0 ? o.div.isubn(1) : o.div.iaddn(1);
      }, r.prototype.modn = function(E) {
        M(E <= 67108863);
        for (var o = (1 << 26) % E, e = 0, t = this.length - 1; t >= 0; t--)
          e = (o * e + (this.words[t] | 0)) % E;
        return e;
      }, r.prototype.idivn = function(E) {
        M(E <= 67108863);
        for (var o = 0, e = this.length - 1; e >= 0; e--) {
          var t = (this.words[e] | 0) + o * 67108864;
          this.words[e] = t / E | 0, o = t % E;
        }
        return this.strip();
      }, r.prototype.divn = function(E) {
        return this.clone().idivn(E);
      }, r.prototype.egcd = function(E) {
        M(E.negative === 0), M(!E.isZero());
        var o = this, e = E.clone();
        o.negative !== 0 ? o = o.umod(E) : o = o.clone();
        for (var t = new r(1), v = new r(0), g = new r(0), h = new r(1), b = 0; o.isEven() && e.isEven(); )
          o.iushrn(1), e.iushrn(1), ++b;
        for (var p = e.clone(), w = o.clone(); !o.isZero(); ) {
          for (var a = 0, T = 1; !(o.words[0] & T) && a < 26; ++a, T <<= 1)
            ;
          if (a > 0)
            for (o.iushrn(a); a-- > 0; )
              (t.isOdd() || v.isOdd()) && (t.iadd(p), v.isub(w)), t.iushrn(1), v.iushrn(1);
          for (var V = 0, Y = 1; !(e.words[0] & Y) && V < 26; ++V, Y <<= 1)
            ;
          if (V > 0)
            for (e.iushrn(V); V-- > 0; )
              (g.isOdd() || h.isOdd()) && (g.iadd(p), h.isub(w)), g.iushrn(1), h.iushrn(1);
          o.cmp(e) >= 0 ? (o.isub(e), t.isub(g), v.isub(h)) : (e.isub(o), g.isub(t), h.isub(v));
        }
        return {
          a: g,
          b: h,
          gcd: e.iushln(b)
        };
      }, r.prototype._invmp = function(E) {
        M(E.negative === 0), M(!E.isZero());
        var o = this, e = E.clone();
        o.negative !== 0 ? o = o.umod(E) : o = o.clone();
        for (var t = new r(1), v = new r(0), g = e.clone(); o.cmpn(1) > 0 && e.cmpn(1) > 0; ) {
          for (var h = 0, b = 1; !(o.words[0] & b) && h < 26; ++h, b <<= 1)
            ;
          if (h > 0)
            for (o.iushrn(h); h-- > 0; )
              t.isOdd() && t.iadd(g), t.iushrn(1);
          for (var p = 0, w = 1; !(e.words[0] & w) && p < 26; ++p, w <<= 1)
            ;
          if (p > 0)
            for (e.iushrn(p); p-- > 0; )
              v.isOdd() && v.iadd(g), v.iushrn(1);
          o.cmp(e) >= 0 ? (o.isub(e), t.isub(v)) : (e.isub(o), v.isub(t));
        }
        var a;
        return o.cmpn(1) === 0 ? a = t : a = v, a.cmpn(0) < 0 && a.iadd(E), a;
      }, r.prototype.gcd = function(E) {
        if (this.isZero())
          return E.abs();
        if (E.isZero())
          return this.abs();
        var o = this.clone(), e = E.clone();
        o.negative = 0, e.negative = 0;
        for (var t = 0; o.isEven() && e.isEven(); t++)
          o.iushrn(1), e.iushrn(1);
        do {
          for (; o.isEven(); )
            o.iushrn(1);
          for (; e.isEven(); )
            e.iushrn(1);
          var v = o.cmp(e);
          if (v < 0) {
            var g = o;
            o = e, e = g;
          } else if (v === 0 || e.cmpn(1) === 0)
            break;
          o.isub(e);
        } while (!0);
        return e.iushln(t);
      }, r.prototype.invm = function(E) {
        return this.egcd(E).a.umod(E);
      }, r.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, r.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, r.prototype.andln = function(E) {
        return this.words[0] & E;
      }, r.prototype.bincn = function(E) {
        M(typeof E == "number");
        var o = E % 26, e = (E - o) / 26, t = 1 << o;
        if (this.length <= e)
          return this._expand(e + 1), this.words[e] |= t, this;
        for (var v = t, g = e; v !== 0 && g < this.length; g++) {
          var h = this.words[g] | 0;
          h += v, v = h >>> 26, h &= 67108863, this.words[g] = h;
        }
        return v !== 0 && (this.words[g] = v, this.length++), this;
      }, r.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, r.prototype.cmpn = function(E) {
        var o = E < 0;
        if (this.negative !== 0 && !o)
          return -1;
        if (this.negative === 0 && o)
          return 1;
        this.strip();
        var e;
        if (this.length > 1)
          e = 1;
        else {
          o && (E = -E), M(E <= 67108863, "Number is too big");
          var t = this.words[0] | 0;
          e = t === E ? 0 : t < E ? -1 : 1;
        }
        return this.negative !== 0 ? -e | 0 : e;
      }, r.prototype.cmp = function(E) {
        if (this.negative !== 0 && E.negative === 0)
          return -1;
        if (this.negative === 0 && E.negative !== 0)
          return 1;
        var o = this.ucmp(E);
        return this.negative !== 0 ? -o | 0 : o;
      }, r.prototype.ucmp = function(E) {
        if (this.length > E.length)
          return 1;
        if (this.length < E.length)
          return -1;
        for (var o = 0, e = this.length - 1; e >= 0; e--) {
          var t = this.words[e] | 0, v = E.words[e] | 0;
          if (t !== v) {
            t < v ? o = -1 : t > v && (o = 1);
            break;
          }
        }
        return o;
      }, r.prototype.gtn = function(E) {
        return this.cmpn(E) === 1;
      }, r.prototype.gt = function(E) {
        return this.cmp(E) === 1;
      }, r.prototype.gten = function(E) {
        return this.cmpn(E) >= 0;
      }, r.prototype.gte = function(E) {
        return this.cmp(E) >= 0;
      }, r.prototype.ltn = function(E) {
        return this.cmpn(E) === -1;
      }, r.prototype.lt = function(E) {
        return this.cmp(E) === -1;
      }, r.prototype.lten = function(E) {
        return this.cmpn(E) <= 0;
      }, r.prototype.lte = function(E) {
        return this.cmp(E) <= 0;
      }, r.prototype.eqn = function(E) {
        return this.cmpn(E) === 0;
      }, r.prototype.eq = function(E) {
        return this.cmp(E) === 0;
      }, r.red = function(E) {
        return new ee(E);
      }, r.prototype.toRed = function(E) {
        return M(!this.red, "Already a number in reduction context"), M(this.negative === 0, "red works only with positives"), E.convertTo(this)._forceRed(E);
      }, r.prototype.fromRed = function() {
        return M(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, r.prototype._forceRed = function(E) {
        return this.red = E, this;
      }, r.prototype.forceRed = function(E) {
        return M(!this.red, "Already a number in reduction context"), this._forceRed(E);
      }, r.prototype.redAdd = function(E) {
        return M(this.red, "redAdd works only with red numbers"), this.red.add(this, E);
      }, r.prototype.redIAdd = function(E) {
        return M(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, E);
      }, r.prototype.redSub = function(E) {
        return M(this.red, "redSub works only with red numbers"), this.red.sub(this, E);
      }, r.prototype.redISub = function(E) {
        return M(this.red, "redISub works only with red numbers"), this.red.isub(this, E);
      }, r.prototype.redShl = function(E) {
        return M(this.red, "redShl works only with red numbers"), this.red.shl(this, E);
      }, r.prototype.redMul = function(E) {
        return M(this.red, "redMul works only with red numbers"), this.red._verify2(this, E), this.red.mul(this, E);
      }, r.prototype.redIMul = function(E) {
        return M(this.red, "redMul works only with red numbers"), this.red._verify2(this, E), this.red.imul(this, E);
      }, r.prototype.redSqr = function() {
        return M(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, r.prototype.redISqr = function() {
        return M(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, r.prototype.redSqrt = function() {
        return M(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, r.prototype.redInvm = function() {
        return M(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, r.prototype.redNeg = function() {
        return M(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, r.prototype.redPow = function(E) {
        return M(this.red && !E.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, E);
      };
      var H = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function j(U, E) {
        this.name = U, this.p = new r(E, 16), this.n = this.p.bitLength(), this.k = new r(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      j.prototype._tmp = function() {
        var E = new r(null);
        return E.words = new Array(Math.ceil(this.n / 13)), E;
      }, j.prototype.ireduce = function(E) {
        var o = E, e;
        do
          this.split(o, this.tmp), o = this.imulK(o), o = o.iadd(this.tmp), e = o.bitLength();
        while (e > this.n);
        var t = e < this.n ? -1 : o.ucmp(this.p);
        return t === 0 ? (o.words[0] = 0, o.length = 1) : t > 0 ? o.isub(this.p) : o.strip !== void 0 ? o.strip() : o._strip(), o;
      }, j.prototype.split = function(E, o) {
        E.iushrn(this.n, 0, o);
      }, j.prototype.imulK = function(E) {
        return E.imul(this.k);
      };
      function J() {
        j.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      P(J, j), J.prototype.split = function(E, o) {
        for (var e = 4194303, t = Math.min(E.length, 9), v = 0; v < t; v++)
          o.words[v] = E.words[v];
        if (o.length = t, E.length <= 9) {
          E.words[0] = 0, E.length = 1;
          return;
        }
        var g = E.words[9];
        for (o.words[o.length++] = g & e, v = 10; v < E.length; v++) {
          var h = E.words[v] | 0;
          E.words[v - 10] = (h & e) << 4 | g >>> 22, g = h;
        }
        g >>>= 22, E.words[v - 10] = g, g === 0 && E.length > 10 ? E.length -= 10 : E.length -= 9;
      }, J.prototype.imulK = function(E) {
        E.words[E.length] = 0, E.words[E.length + 1] = 0, E.length += 2;
        for (var o = 0, e = 0; e < E.length; e++) {
          var t = E.words[e] | 0;
          o += t * 977, E.words[e] = o & 67108863, o = t * 64 + (o / 67108864 | 0);
        }
        return E.words[E.length - 1] === 0 && (E.length--, E.words[E.length - 1] === 0 && E.length--), E;
      };
      function X() {
        j.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      P(X, j);
      function ie() {
        j.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      P(ie, j);
      function ne() {
        j.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      P(ne, j), ne.prototype.imulK = function(E) {
        for (var o = 0, e = 0; e < E.length; e++) {
          var t = (E.words[e] | 0) * 19 + o, v = t & 67108863;
          t >>>= 26, E.words[e] = v, o = t;
        }
        return o !== 0 && (E.words[E.length++] = o), E;
      }, r._prime = function(E) {
        if (H[E])
          return H[E];
        var o;
        if (E === "k256")
          o = new J();
        else if (E === "p224")
          o = new X();
        else if (E === "p192")
          o = new ie();
        else if (E === "p25519")
          o = new ne();
        else
          throw new Error("Unknown prime " + E);
        return H[E] = o, o;
      };
      function ee(U) {
        if (typeof U == "string") {
          var E = r._prime(U);
          this.m = E.p, this.prime = E;
        } else
          M(U.gtn(1), "modulus must be greater than 1"), this.m = U, this.prime = null;
      }
      ee.prototype._verify1 = function(E) {
        M(E.negative === 0, "red works only with positives"), M(E.red, "red works only with red numbers");
      }, ee.prototype._verify2 = function(E, o) {
        M((E.negative | o.negative) === 0, "red works only with positives"), M(
          E.red && E.red === o.red,
          "red works only with red numbers"
        );
      }, ee.prototype.imod = function(E) {
        return this.prime ? this.prime.ireduce(E)._forceRed(this) : E.umod(this.m)._forceRed(this);
      }, ee.prototype.neg = function(E) {
        return E.isZero() ? E.clone() : this.m.sub(E)._forceRed(this);
      }, ee.prototype.add = function(E, o) {
        this._verify2(E, o);
        var e = E.add(o);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
      }, ee.prototype.iadd = function(E, o) {
        this._verify2(E, o);
        var e = E.iadd(o);
        return e.cmp(this.m) >= 0 && e.isub(this.m), e;
      }, ee.prototype.sub = function(E, o) {
        this._verify2(E, o);
        var e = E.sub(o);
        return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
      }, ee.prototype.isub = function(E, o) {
        this._verify2(E, o);
        var e = E.isub(o);
        return e.cmpn(0) < 0 && e.iadd(this.m), e;
      }, ee.prototype.shl = function(E, o) {
        return this._verify1(E), this.imod(E.ushln(o));
      }, ee.prototype.imul = function(E, o) {
        return this._verify2(E, o), this.imod(E.imul(o));
      }, ee.prototype.mul = function(E, o) {
        return this._verify2(E, o), this.imod(E.mul(o));
      }, ee.prototype.isqr = function(E) {
        return this.imul(E, E.clone());
      }, ee.prototype.sqr = function(E) {
        return this.mul(E, E);
      }, ee.prototype.sqrt = function(E) {
        if (E.isZero())
          return E.clone();
        var o = this.m.andln(3);
        if (M(o % 2 === 1), o === 3) {
          var e = this.m.add(new r(1)).iushrn(2);
          return this.pow(E, e);
        }
        for (var t = this.m.subn(1), v = 0; !t.isZero() && t.andln(1) === 0; )
          v++, t.iushrn(1);
        M(!t.isZero());
        var g = new r(1).toRed(this), h = g.redNeg(), b = this.m.subn(1).iushrn(1), p = this.m.bitLength();
        for (p = new r(2 * p * p).toRed(this); this.pow(p, b).cmp(h) !== 0; )
          p.redIAdd(h);
        for (var w = this.pow(p, t), a = this.pow(E, t.addn(1).iushrn(1)), T = this.pow(E, t), V = v; T.cmp(g) !== 0; ) {
          for (var Y = T, z = 0; Y.cmp(g) !== 0; z++)
            Y = Y.redSqr();
          M(z < V);
          var D = this.pow(w, new r(1).iushln(V - z - 1));
          a = a.redMul(D), w = D.redSqr(), T = T.redMul(w), V = z;
        }
        return a;
      }, ee.prototype.invm = function(E) {
        var o = E._invmp(this.m);
        return o.negative !== 0 ? (o.negative = 0, this.imod(o).redNeg()) : this.imod(o);
      }, ee.prototype.pow = function(E, o) {
        if (o.isZero())
          return new r(1).toRed(this);
        if (o.cmpn(1) === 0)
          return E.clone();
        var e = 4, t = new Array(1 << e);
        t[0] = new r(1).toRed(this), t[1] = E;
        for (var v = 2; v < t.length; v++)
          t[v] = this.mul(t[v - 1], E);
        var g = t[0], h = 0, b = 0, p = o.bitLength() % 26;
        for (p === 0 && (p = 26), v = o.length - 1; v >= 0; v--) {
          for (var w = o.words[v], a = p - 1; a >= 0; a--) {
            var T = w >> a & 1;
            if (g !== t[0] && (g = this.sqr(g)), T === 0 && h === 0) {
              b = 0;
              continue;
            }
            h <<= 1, h |= T, b++, !(b !== e && (v !== 0 || a !== 0)) && (g = this.mul(g, t[h]), b = 0, h = 0);
          }
          p = 26;
        }
        return g;
      }, ee.prototype.convertTo = function(E) {
        var o = E.umod(this.m);
        return o === E ? o.clone() : o;
      }, ee.prototype.convertFrom = function(E) {
        var o = E.clone();
        return o.red = null, o;
      }, r.mont = function(E) {
        return new ue(E);
      };
      function ue(U) {
        ee.call(this, U), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new r(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      P(ue, ee), ue.prototype.convertTo = function(E) {
        return this.imod(E.ushln(this.shift));
      }, ue.prototype.convertFrom = function(E) {
        var o = this.imod(E.mul(this.rinv));
        return o.red = null, o;
      }, ue.prototype.imul = function(E, o) {
        if (E.isZero() || o.isZero())
          return E.words[0] = 0, E.length = 1, E;
        var e = E.imul(o), t = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), v = e.isub(t).iushrn(this.shift), g = v;
        return v.cmp(this.m) >= 0 ? g = v.isub(this.m) : v.cmpn(0) < 0 && (g = v.iadd(this.m)), g._forceRed(this);
      }, ue.prototype.mul = function(E, o) {
        if (E.isZero() || o.isZero())
          return new r(0)._forceRed(this);
        var e = E.mul(o), t = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), v = e.isub(t).iushrn(this.shift), g = v;
        return v.cmp(this.m) >= 0 ? g = v.isub(this.m) : v.cmpn(0) < 0 && (g = v.iadd(this.m)), g._forceRed(this);
      }, ue.prototype.invm = function(E) {
        var o = this.imod(E._invmp(this.m).mul(this.r2));
        return o._forceRed(this);
      };
    })(A, commonjsGlobal);
  }(bn$2)), bn$2.exports;
}
var brorand = { exports: {} }, hasRequiredBrorand;
function requireBrorand() {
  if (hasRequiredBrorand)
    return brorand.exports;
  hasRequiredBrorand = 1;
  var A;
  brorand.exports = function(P) {
    return A || (A = new _(null)), A.generate(P);
  };
  function _(M) {
    this.rand = M;
  }
  if (brorand.exports.Rand = _, _.prototype.generate = function(P) {
    return this._rand(P);
  }, _.prototype._rand = function(P) {
    if (this.rand.getBytes)
      return this.rand.getBytes(P);
    for (var r = new Uint8Array(P), S = 0; S < r.length; S++)
      r[S] = this.rand.getByte();
    return r;
  }, typeof self == "object")
    self.crypto && self.crypto.getRandomValues ? _.prototype._rand = function(P) {
      var r = new Uint8Array(P);
      return self.crypto.getRandomValues(r), r;
    } : self.msCrypto && self.msCrypto.getRandomValues ? _.prototype._rand = function(P) {
      var r = new Uint8Array(P);
      return self.msCrypto.getRandomValues(r), r;
    } : typeof window == "object" && (_.prototype._rand = function() {
      throw new Error("Not implemented yet");
    });
  else
    try {
      var B = requireCryptoBrowserify();
      if (typeof B.randomBytes != "function")
        throw new Error("Not supported");
      _.prototype._rand = function(P) {
        return B.randomBytes(P);
      };
    } catch {
    }
  return brorand.exports;
}
var mr, hasRequiredMr;
function requireMr() {
  if (hasRequiredMr)
    return mr;
  hasRequiredMr = 1;
  var A = requireBn$2(), _ = requireBrorand();
  function B(M) {
    this.rand = M || new _.Rand();
  }
  return mr = B, B.create = function(P) {
    return new B(P);
  }, B.prototype._randbelow = function(P) {
    var r = P.bitLength(), S = Math.ceil(r / 8);
    do
      var d = new A(this.rand.generate(S));
    while (d.cmp(P) >= 0);
    return d;
  }, B.prototype._randrange = function(P, r) {
    var S = r.sub(P);
    return P.add(this._randbelow(S));
  }, B.prototype.test = function(P, r, S) {
    var d = P.bitLength(), x = A.mont(P), m = new A(1).toRed(x);
    r || (r = Math.max(1, d / 48 | 0));
    for (var f = P.subn(1), y = 0; !f.testn(y); y++)
      ;
    for (var q = P.shrn(y), R = f.toRed(x), I = !0; r > 0; r--) {
      var k = this._randrange(new A(2), f);
      S && S(k);
      var $ = k.toRed(x).redPow(q);
      if (!($.cmp(m) === 0 || $.cmp(R) === 0)) {
        for (var C = 1; C < y; C++) {
          if ($ = $.redSqr(), $.cmp(m) === 0)
            return !1;
          if ($.cmp(R) === 0)
            break;
        }
        if (C === y)
          return !1;
      }
    }
    return I;
  }, B.prototype.getDivisor = function(P, r) {
    var S = P.bitLength(), d = A.mont(P), x = new A(1).toRed(d);
    r || (r = Math.max(1, S / 48 | 0));
    for (var m = P.subn(1), f = 0; !m.testn(f); f++)
      ;
    for (var y = P.shrn(f), q = m.toRed(d); r > 0; r--) {
      var R = this._randrange(new A(2), m), I = P.gcd(R);
      if (I.cmpn(1) !== 0)
        return I;
      var k = R.toRed(d).redPow(y);
      if (!(k.cmp(x) === 0 || k.cmp(q) === 0)) {
        for (var $ = 1; $ < f; $++) {
          if (k = k.redSqr(), k.cmp(x) === 0)
            return k.fromRed().subn(1).gcd(P);
          if (k.cmp(q) === 0)
            break;
        }
        if ($ === f)
          return k = k.redSqr(), k.fromRed().subn(1).gcd(P);
      }
    }
    return !1;
  }, mr;
}
var generatePrime, hasRequiredGeneratePrime;
function requireGeneratePrime() {
  if (hasRequiredGeneratePrime)
    return generatePrime;
  hasRequiredGeneratePrime = 1;
  var A = requireBrowser$b();
  generatePrime = $, $.simpleSieve = I, $.fermatTest = k;
  var _ = requireBn$2(), B = new _(24), M = requireMr(), P = new M(), r = new _(1), S = new _(2), d = new _(5);
  new _(16), new _(8);
  var x = new _(10), m = new _(3);
  new _(7);
  var f = new _(11), y = new _(4);
  new _(12);
  var q = null;
  function R() {
    if (q !== null)
      return q;
    var C = 1048576, L = [];
    L[0] = 2;
    for (var H = 1, j = 3; j < C; j += 2) {
      for (var J = Math.ceil(Math.sqrt(j)), X = 0; X < H && L[X] <= J && j % L[X] !== 0; X++)
        ;
      H !== X && L[X] <= J || (L[H++] = j);
    }
    return q = L, L;
  }
  function I(C) {
    for (var L = R(), H = 0; H < L.length; H++)
      if (C.modn(L[H]) === 0)
        return C.cmpn(L[H]) === 0;
    return !0;
  }
  function k(C) {
    var L = _.mont(C);
    return S.toRed(L).redPow(C.subn(1)).fromRed().cmpn(1) === 0;
  }
  function $(C, L) {
    if (C < 16)
      return L === 2 || L === 5 ? new _([140, 123]) : new _([140, 39]);
    L = new _(L);
    for (var H, j; ; ) {
      for (H = new _(A(Math.ceil(C / 8))); H.bitLength() > C; )
        H.ishrn(1);
      if (H.isEven() && H.iadd(r), H.testn(1) || H.iadd(S), L.cmp(S)) {
        if (!L.cmp(d))
          for (; H.mod(x).cmp(m); )
            H.iadd(y);
      } else
        for (; H.mod(B).cmp(f); )
          H.iadd(y);
      if (j = H.shrn(1), I(j) && I(H) && k(j) && k(H) && P.test(j) && P.test(H))
        return H;
    }
  }
  return generatePrime;
}
const modp1 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"
}, modp2 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"
}, modp5 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"
}, modp14 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"
}, modp15 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"
}, modp16 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"
}, modp17 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"
}, modp18 = {
  gen: "02",
  prime: "ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"
}, require$$1$1 = {
  modp1,
  modp2,
  modp5,
  modp14,
  modp15,
  modp16,
  modp17,
  modp18
};
var dh, hasRequiredDh;
function requireDh() {
  if (hasRequiredDh)
    return dh;
  hasRequiredDh = 1;
  var A = requireBn$2(), _ = requireMr(), B = new _(), M = new A(24), P = new A(11), r = new A(10), S = new A(3), d = new A(7), x = requireGeneratePrime(), m = requireBrowser$b();
  dh = I;
  function f($, C) {
    return C = C || "utf8", bufferExports.Buffer.isBuffer($) || ($ = new bufferExports.Buffer($, C)), this._pub = new A($), this;
  }
  function y($, C) {
    return C = C || "utf8", bufferExports.Buffer.isBuffer($) || ($ = new bufferExports.Buffer($, C)), this._priv = new A($), this;
  }
  var q = {};
  function R($, C) {
    var L = C.toString("hex"), H = [L, $.toString(16)].join("_");
    if (H in q)
      return q[H];
    var j = 0;
    if ($.isEven() || !x.simpleSieve || !x.fermatTest($) || !B.test($))
      return j += 1, L === "02" || L === "05" ? j += 8 : j += 4, q[H] = j, j;
    B.test($.shrn(1)) || (j += 2);
    var J;
    switch (L) {
      case "02":
        $.mod(M).cmp(P) && (j += 8);
        break;
      case "05":
        J = $.mod(r), J.cmp(S) && J.cmp(d) && (j += 8);
        break;
      default:
        j += 4;
    }
    return q[H] = j, j;
  }
  function I($, C, L) {
    this.setGenerator(C), this.__prime = new A($), this._prime = A.mont(this.__prime), this._primeLen = $.length, this._pub = void 0, this._priv = void 0, this._primeCode = void 0, L ? (this.setPublicKey = f, this.setPrivateKey = y) : this._primeCode = 8;
  }
  Object.defineProperty(I.prototype, "verifyError", {
    enumerable: !0,
    get: function() {
      return typeof this._primeCode != "number" && (this._primeCode = R(this.__prime, this.__gen)), this._primeCode;
    }
  }), I.prototype.generateKeys = function() {
    return this._priv || (this._priv = new A(m(this._primeLen))), this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed(), this.getPublicKey();
  }, I.prototype.computeSecret = function($) {
    $ = new A($), $ = $.toRed(this._prime);
    var C = $.redPow(this._priv).fromRed(), L = new bufferExports.Buffer(C.toArray()), H = this.getPrime();
    if (L.length < H.length) {
      var j = new bufferExports.Buffer(H.length - L.length);
      j.fill(0), L = bufferExports.Buffer.concat([j, L]);
    }
    return L;
  }, I.prototype.getPublicKey = function(C) {
    return k(this._pub, C);
  }, I.prototype.getPrivateKey = function(C) {
    return k(this._priv, C);
  }, I.prototype.getPrime = function($) {
    return k(this.__prime, $);
  }, I.prototype.getGenerator = function($) {
    return k(this._gen, $);
  }, I.prototype.setGenerator = function($, C) {
    return C = C || "utf8", bufferExports.Buffer.isBuffer($) || ($ = new bufferExports.Buffer($, C)), this.__gen = $, this._gen = new A($), this;
  };
  function k($, C) {
    var L = new bufferExports.Buffer($.toArray());
    return C ? L.toString(C) : L;
  }
  return dh;
}
var hasRequiredBrowser$4;
function requireBrowser$4() {
  if (hasRequiredBrowser$4)
    return browser$4;
  hasRequiredBrowser$4 = 1;
  var A = requireGeneratePrime(), _ = require$$1$1, B = requireDh();
  function M(S) {
    var d = new bufferExports.Buffer(_[S].prime, "hex"), x = new bufferExports.Buffer(_[S].gen, "hex");
    return new B(d, x);
  }
  var P = {
    binary: !0,
    hex: !0,
    base64: !0
  };
  function r(S, d, x, m) {
    return bufferExports.Buffer.isBuffer(d) || P[d] === void 0 ? r(S, "binary", d, x) : (d = d || "binary", m = m || "binary", x = x || new bufferExports.Buffer([2]), bufferExports.Buffer.isBuffer(x) || (x = new bufferExports.Buffer(x, m)), typeof S == "number" ? new B(A(S, x), x, !0) : (bufferExports.Buffer.isBuffer(S) || (S = new bufferExports.Buffer(S, d)), new B(S, x, !0)));
  }
  return browser$4.DiffieHellmanGroup = browser$4.createDiffieHellmanGroup = browser$4.getDiffieHellman = M, browser$4.createDiffieHellman = browser$4.DiffieHellman = r, browser$4;
}
var readableBrowser = { exports: {} }, processNextickArgs = { exports: {} }, hasRequiredProcessNextickArgs;
function requireProcessNextickArgs() {
  if (hasRequiredProcessNextickArgs)
    return processNextickArgs.exports;
  hasRequiredProcessNextickArgs = 1, typeof process$1 > "u" || !process$1.version || process$1.version.indexOf("v0.") === 0 || process$1.version.indexOf("v1.") === 0 && process$1.version.indexOf("v1.8.") !== 0 ? processNextickArgs.exports = { nextTick: A } : processNextickArgs.exports = process$1;
  function A(_, B, M, P) {
    if (typeof _ != "function")
      throw new TypeError('"callback" argument must be a function');
    var r = arguments.length, S, d;
    switch (r) {
      case 0:
      case 1:
        return process$1.nextTick(_);
      case 2:
        return process$1.nextTick(function() {
          _.call(null, B);
        });
      case 3:
        return process$1.nextTick(function() {
          _.call(null, B, M);
        });
      case 4:
        return process$1.nextTick(function() {
          _.call(null, B, M, P);
        });
      default:
        for (S = new Array(r - 1), d = 0; d < S.length; )
          S[d++] = arguments[d];
        return process$1.nextTick(function() {
          _.apply(null, S);
        });
    }
  }
  return processNextickArgs.exports;
}
var isarray, hasRequiredIsarray;
function requireIsarray() {
  if (hasRequiredIsarray)
    return isarray;
  hasRequiredIsarray = 1;
  var A = {}.toString;
  return isarray = Array.isArray || function(_) {
    return A.call(_) == "[object Array]";
  }, isarray;
}
var streamBrowser, hasRequiredStreamBrowser;
function requireStreamBrowser() {
  return hasRequiredStreamBrowser || (hasRequiredStreamBrowser = 1, streamBrowser = requireEvents().EventEmitter), streamBrowser;
}
var safeBuffer = { exports: {} }, hasRequiredSafeBuffer;
function requireSafeBuffer() {
  return hasRequiredSafeBuffer || (hasRequiredSafeBuffer = 1, function(A, _) {
    var B = requireBuffer$1(), M = B.Buffer;
    function P(S, d) {
      for (var x in S)
        d[x] = S[x];
    }
    M.from && M.alloc && M.allocUnsafe && M.allocUnsafeSlow ? A.exports = B : (P(B, _), _.Buffer = r);
    function r(S, d, x) {
      return M(S, d, x);
    }
    P(M, r), r.from = function(S, d, x) {
      if (typeof S == "number")
        throw new TypeError("Argument must not be a number");
      return M(S, d, x);
    }, r.alloc = function(S, d, x) {
      if (typeof S != "number")
        throw new TypeError("Argument must be a number");
      var m = M(S);
      return d !== void 0 ? typeof x == "string" ? m.fill(d, x) : m.fill(d) : m.fill(0), m;
    }, r.allocUnsafe = function(S) {
      if (typeof S != "number")
        throw new TypeError("Argument must be a number");
      return M(S);
    }, r.allocUnsafeSlow = function(S) {
      if (typeof S != "number")
        throw new TypeError("Argument must be a number");
      return B.SlowBuffer(S);
    };
  }(safeBuffer, safeBuffer.exports)), safeBuffer.exports;
}
var util = {}, hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil)
    return util;
  hasRequiredUtil = 1;
  function A(k) {
    return Array.isArray ? Array.isArray(k) : I(k) === "[object Array]";
  }
  util.isArray = A;
  function _(k) {
    return typeof k == "boolean";
  }
  util.isBoolean = _;
  function B(k) {
    return k === null;
  }
  util.isNull = B;
  function M(k) {
    return k == null;
  }
  util.isNullOrUndefined = M;
  function P(k) {
    return typeof k == "number";
  }
  util.isNumber = P;
  function r(k) {
    return typeof k == "string";
  }
  util.isString = r;
  function S(k) {
    return typeof k == "symbol";
  }
  util.isSymbol = S;
  function d(k) {
    return k === void 0;
  }
  util.isUndefined = d;
  function x(k) {
    return I(k) === "[object RegExp]";
  }
  util.isRegExp = x;
  function m(k) {
    return typeof k == "object" && k !== null;
  }
  util.isObject = m;
  function f(k) {
    return I(k) === "[object Date]";
  }
  util.isDate = f;
  function y(k) {
    return I(k) === "[object Error]" || k instanceof Error;
  }
  util.isError = y;
  function q(k) {
    return typeof k == "function";
  }
  util.isFunction = q;
  function R(k) {
    return k === null || typeof k == "boolean" || typeof k == "number" || typeof k == "string" || typeof k == "symbol" || // ES6 symbol
    typeof k > "u";
  }
  util.isPrimitive = R, util.isBuffer = requireBuffer$1().Buffer.isBuffer;
  function I(k) {
    return Object.prototype.toString.call(k);
  }
  return util;
}
var BufferList = { exports: {} }, hasRequiredBufferList;
function requireBufferList() {
  return hasRequiredBufferList || (hasRequiredBufferList = 1, function(A) {
    function _(r, S) {
      if (!(r instanceof S))
        throw new TypeError("Cannot call a class as a function");
    }
    var B = requireSafeBuffer().Buffer, M = requireUtil$1();
    function P(r, S, d) {
      r.copy(S, d);
    }
    A.exports = function() {
      function r() {
        _(this, r), this.head = null, this.tail = null, this.length = 0;
      }
      return r.prototype.push = function(d) {
        var x = { data: d, next: null };
        this.length > 0 ? this.tail.next = x : this.head = x, this.tail = x, ++this.length;
      }, r.prototype.unshift = function(d) {
        var x = { data: d, next: this.head };
        this.length === 0 && (this.tail = x), this.head = x, ++this.length;
      }, r.prototype.shift = function() {
        if (this.length !== 0) {
          var d = this.head.data;
          return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, d;
        }
      }, r.prototype.clear = function() {
        this.head = this.tail = null, this.length = 0;
      }, r.prototype.join = function(d) {
        if (this.length === 0)
          return "";
        for (var x = this.head, m = "" + x.data; x = x.next; )
          m += d + x.data;
        return m;
      }, r.prototype.concat = function(d) {
        if (this.length === 0)
          return B.alloc(0);
        for (var x = B.allocUnsafe(d >>> 0), m = this.head, f = 0; m; )
          P(m.data, x, f), f += m.data.length, m = m.next;
        return x;
      }, r;
    }(), M && M.inspect && M.inspect.custom && (A.exports.prototype[M.inspect.custom] = function() {
      var r = M.inspect({ length: this.length });
      return this.constructor.name + " " + r;
    });
  }(BufferList)), BufferList.exports;
}
var destroy_1, hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy)
    return destroy_1;
  hasRequiredDestroy = 1;
  var A = requireProcessNextickArgs();
  function _(P, r) {
    var S = this, d = this._readableState && this._readableState.destroyed, x = this._writableState && this._writableState.destroyed;
    return d || x ? (r ? r(P) : P && (this._writableState ? this._writableState.errorEmitted || (this._writableState.errorEmitted = !0, A.nextTick(M, this, P)) : A.nextTick(M, this, P)), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(P || null, function(m) {
      !r && m ? S._writableState ? S._writableState.errorEmitted || (S._writableState.errorEmitted = !0, A.nextTick(M, S, m)) : A.nextTick(M, S, m) : r && r(m);
    }), this);
  }
  function B() {
    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1);
  }
  function M(P, r) {
    P.emit("error", r);
  }
  return destroy_1 = {
    destroy: _,
    undestroy: B
  }, destroy_1;
}
var _stream_writable, hasRequired_stream_writable;
function require_stream_writable() {
  if (hasRequired_stream_writable)
    return _stream_writable;
  hasRequired_stream_writable = 1;
  var A = requireProcessNextickArgs();
  _stream_writable = k;
  function _(g) {
    var h = this;
    this.next = null, this.entry = null, this.finish = function() {
      v(h, g);
    };
  }
  var B = !process$1.browser && ["v0.10", "v0.9."].indexOf(process$1.version.slice(0, 5)) > -1 ? setImmediate : A.nextTick, M;
  k.WritableState = R;
  var P = Object.create(requireUtil());
  P.inherits = requireInherits_browser();
  var r = {
    deprecate: requireBrowser$a()
  }, S = requireStreamBrowser(), d = requireSafeBuffer().Buffer, x = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function m(g) {
    return d.from(g);
  }
  function f(g) {
    return d.isBuffer(g) || g instanceof x;
  }
  var y = requireDestroy();
  P.inherits(k, S);
  function q() {
  }
  function R(g, h) {
    M = M || require_stream_duplex(), g = g || {};
    var b = h instanceof M;
    this.objectMode = !!g.objectMode, b && (this.objectMode = this.objectMode || !!g.writableObjectMode);
    var p = g.highWaterMark, w = g.writableHighWaterMark, a = this.objectMode ? 16 : 16 * 1024;
    p || p === 0 ? this.highWaterMark = p : b && (w || w === 0) ? this.highWaterMark = w : this.highWaterMark = a, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var T = g.decodeStrings === !1;
    this.decodeStrings = !T, this.defaultEncoding = g.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function(V) {
      ie(h, V);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new _(this);
  }
  R.prototype.getBuffer = function() {
    for (var h = this.bufferedRequest, b = []; h; )
      b.push(h), h = h.next;
    return b;
  }, function() {
    try {
      Object.defineProperty(R.prototype, "buffer", {
        get: r.deprecate(function() {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch {
    }
  }();
  var I;
  typeof Symbol == "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] == "function" ? (I = Function.prototype[Symbol.hasInstance], Object.defineProperty(k, Symbol.hasInstance, {
    value: function(g) {
      return I.call(this, g) ? !0 : this !== k ? !1 : g && g._writableState instanceof R;
    }
  })) : I = function(g) {
    return g instanceof this;
  };
  function k(g) {
    if (M = M || require_stream_duplex(), !I.call(k, this) && !(this instanceof M))
      return new k(g);
    this._writableState = new R(g, this), this.writable = !0, g && (typeof g.write == "function" && (this._write = g.write), typeof g.writev == "function" && (this._writev = g.writev), typeof g.destroy == "function" && (this._destroy = g.destroy), typeof g.final == "function" && (this._final = g.final)), S.call(this);
  }
  k.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe, not readable"));
  };
  function $(g, h) {
    var b = new Error("write after end");
    g.emit("error", b), A.nextTick(h, b);
  }
  function C(g, h, b, p) {
    var w = !0, a = !1;
    return b === null ? a = new TypeError("May not write null values to stream") : typeof b != "string" && b !== void 0 && !h.objectMode && (a = new TypeError("Invalid non-string/buffer chunk")), a && (g.emit("error", a), A.nextTick(p, a), w = !1), w;
  }
  k.prototype.write = function(g, h, b) {
    var p = this._writableState, w = !1, a = !p.objectMode && f(g);
    return a && !d.isBuffer(g) && (g = m(g)), typeof h == "function" && (b = h, h = null), a ? h = "buffer" : h || (h = p.defaultEncoding), typeof b != "function" && (b = q), p.ended ? $(this, b) : (a || C(this, p, g, b)) && (p.pendingcb++, w = H(this, p, a, g, h, b)), w;
  }, k.prototype.cork = function() {
    var g = this._writableState;
    g.corked++;
  }, k.prototype.uncork = function() {
    var g = this._writableState;
    g.corked && (g.corked--, !g.writing && !g.corked && !g.bufferProcessing && g.bufferedRequest && ue(this, g));
  }, k.prototype.setDefaultEncoding = function(h) {
    if (typeof h == "string" && (h = h.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((h + "").toLowerCase()) > -1))
      throw new TypeError("Unknown encoding: " + h);
    return this._writableState.defaultEncoding = h, this;
  };
  function L(g, h, b) {
    return !g.objectMode && g.decodeStrings !== !1 && typeof h == "string" && (h = d.from(h, b)), h;
  }
  Object.defineProperty(k.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function H(g, h, b, p, w, a) {
    if (!b) {
      var T = L(h, p, w);
      p !== T && (b = !0, w = "buffer", p = T);
    }
    var V = h.objectMode ? 1 : p.length;
    h.length += V;
    var Y = h.length < h.highWaterMark;
    if (Y || (h.needDrain = !0), h.writing || h.corked) {
      var z = h.lastBufferedRequest;
      h.lastBufferedRequest = {
        chunk: p,
        encoding: w,
        isBuf: b,
        callback: a,
        next: null
      }, z ? z.next = h.lastBufferedRequest : h.bufferedRequest = h.lastBufferedRequest, h.bufferedRequestCount += 1;
    } else
      j(g, h, !1, V, p, w, a);
    return Y;
  }
  function j(g, h, b, p, w, a, T) {
    h.writelen = p, h.writecb = T, h.writing = !0, h.sync = !0, b ? g._writev(w, h.onwrite) : g._write(w, a, h.onwrite), h.sync = !1;
  }
  function J(g, h, b, p, w) {
    --h.pendingcb, b ? (A.nextTick(w, p), A.nextTick(e, g, h), g._writableState.errorEmitted = !0, g.emit("error", p)) : (w(p), g._writableState.errorEmitted = !0, g.emit("error", p), e(g, h));
  }
  function X(g) {
    g.writing = !1, g.writecb = null, g.length -= g.writelen, g.writelen = 0;
  }
  function ie(g, h) {
    var b = g._writableState, p = b.sync, w = b.writecb;
    if (X(b), h)
      J(g, b, p, h, w);
    else {
      var a = U(b);
      !a && !b.corked && !b.bufferProcessing && b.bufferedRequest && ue(g, b), p ? B(ne, g, b, a, w) : ne(g, b, a, w);
    }
  }
  function ne(g, h, b, p) {
    b || ee(g, h), h.pendingcb--, p(), e(g, h);
  }
  function ee(g, h) {
    h.length === 0 && h.needDrain && (h.needDrain = !1, g.emit("drain"));
  }
  function ue(g, h) {
    h.bufferProcessing = !0;
    var b = h.bufferedRequest;
    if (g._writev && b && b.next) {
      var p = h.bufferedRequestCount, w = new Array(p), a = h.corkedRequestsFree;
      a.entry = b;
      for (var T = 0, V = !0; b; )
        w[T] = b, b.isBuf || (V = !1), b = b.next, T += 1;
      w.allBuffers = V, j(g, h, !0, h.length, w, "", a.finish), h.pendingcb++, h.lastBufferedRequest = null, a.next ? (h.corkedRequestsFree = a.next, a.next = null) : h.corkedRequestsFree = new _(h), h.bufferedRequestCount = 0;
    } else {
      for (; b; ) {
        var Y = b.chunk, z = b.encoding, D = b.callback, N = h.objectMode ? 1 : Y.length;
        if (j(g, h, !1, N, Y, z, D), b = b.next, h.bufferedRequestCount--, h.writing)
          break;
      }
      b === null && (h.lastBufferedRequest = null);
    }
    h.bufferedRequest = b, h.bufferProcessing = !1;
  }
  k.prototype._write = function(g, h, b) {
    b(new Error("_write() is not implemented"));
  }, k.prototype._writev = null, k.prototype.end = function(g, h, b) {
    var p = this._writableState;
    typeof g == "function" ? (b = g, g = null, h = null) : typeof h == "function" && (b = h, h = null), g != null && this.write(g, h), p.corked && (p.corked = 1, this.uncork()), p.ending || t(this, p, b);
  };
  function U(g) {
    return g.ending && g.length === 0 && g.bufferedRequest === null && !g.finished && !g.writing;
  }
  function E(g, h) {
    g._final(function(b) {
      h.pendingcb--, b && g.emit("error", b), h.prefinished = !0, g.emit("prefinish"), e(g, h);
    });
  }
  function o(g, h) {
    !h.prefinished && !h.finalCalled && (typeof g._final == "function" ? (h.pendingcb++, h.finalCalled = !0, A.nextTick(E, g, h)) : (h.prefinished = !0, g.emit("prefinish")));
  }
  function e(g, h) {
    var b = U(h);
    return b && (o(g, h), h.pendingcb === 0 && (h.finished = !0, g.emit("finish"))), b;
  }
  function t(g, h, b) {
    h.ending = !0, e(g, h), b && (h.finished ? A.nextTick(b) : g.once("finish", b)), h.ended = !0, g.writable = !1;
  }
  function v(g, h, b) {
    var p = g.entry;
    for (g.entry = null; p; ) {
      var w = p.callback;
      h.pendingcb--, w(b), p = p.next;
    }
    h.corkedRequestsFree.next = g;
  }
  return Object.defineProperty(k.prototype, "destroyed", {
    get: function() {
      return this._writableState === void 0 ? !1 : this._writableState.destroyed;
    },
    set: function(g) {
      this._writableState && (this._writableState.destroyed = g);
    }
  }), k.prototype.destroy = y.destroy, k.prototype._undestroy = y.undestroy, k.prototype._destroy = function(g, h) {
    this.end(), h(g);
  }, _stream_writable;
}
var _stream_duplex, hasRequired_stream_duplex;
function require_stream_duplex() {
  if (hasRequired_stream_duplex)
    return _stream_duplex;
  hasRequired_stream_duplex = 1;
  var A = requireProcessNextickArgs(), _ = Object.keys || function(y) {
    var q = [];
    for (var R in y)
      q.push(R);
    return q;
  };
  _stream_duplex = x;
  var B = Object.create(requireUtil());
  B.inherits = requireInherits_browser();
  var M = require_stream_readable(), P = require_stream_writable();
  B.inherits(x, M);
  for (var r = _(P.prototype), S = 0; S < r.length; S++) {
    var d = r[S];
    x.prototype[d] || (x.prototype[d] = P.prototype[d]);
  }
  function x(y) {
    if (!(this instanceof x))
      return new x(y);
    M.call(this, y), P.call(this, y), y && y.readable === !1 && (this.readable = !1), y && y.writable === !1 && (this.writable = !1), this.allowHalfOpen = !0, y && y.allowHalfOpen === !1 && (this.allowHalfOpen = !1), this.once("end", m);
  }
  Object.defineProperty(x.prototype, "writableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._writableState.highWaterMark;
    }
  });
  function m() {
    this.allowHalfOpen || this._writableState.ended || A.nextTick(f, this);
  }
  function f(y) {
    y.end();
  }
  return Object.defineProperty(x.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 || this._writableState === void 0 ? !1 : this._readableState.destroyed && this._writableState.destroyed;
    },
    set: function(y) {
      this._readableState === void 0 || this._writableState === void 0 || (this._readableState.destroyed = y, this._writableState.destroyed = y);
    }
  }), x.prototype._destroy = function(y, q) {
    this.push(null), this.end(), A.nextTick(q, y);
  }, _stream_duplex;
}
var _stream_readable, hasRequired_stream_readable;
function require_stream_readable() {
  if (hasRequired_stream_readable)
    return _stream_readable;
  hasRequired_stream_readable = 1;
  var A = requireProcessNextickArgs();
  _stream_readable = L;
  var _ = requireIsarray(), B;
  L.ReadableState = C, requireEvents().EventEmitter;
  var M = function(D, N) {
    return D.listeners(N).length;
  }, P = requireStreamBrowser(), r = requireSafeBuffer().Buffer, S = (typeof commonjsGlobal < "u" ? commonjsGlobal : typeof window < "u" ? window : typeof self < "u" ? self : {}).Uint8Array || function() {
  };
  function d(D) {
    return r.from(D);
  }
  function x(D) {
    return r.isBuffer(D) || D instanceof S;
  }
  var m = Object.create(requireUtil());
  m.inherits = requireInherits_browser();
  var f = requireUtil$1(), y = void 0;
  f && f.debuglog ? y = f.debuglog("stream") : y = function() {
  };
  var q = requireBufferList(), R = requireDestroy(), I;
  m.inherits(L, P);
  var k = ["error", "close", "destroy", "pause", "resume"];
  function $(D, N, Q) {
    if (typeof D.prependListener == "function")
      return D.prependListener(N, Q);
    !D._events || !D._events[N] ? D.on(N, Q) : _(D._events[N]) ? D._events[N].unshift(Q) : D._events[N] = [Q, D._events[N]];
  }
  function C(D, N) {
    B = B || require_stream_duplex(), D = D || {};
    var Q = N instanceof B;
    this.objectMode = !!D.objectMode, Q && (this.objectMode = this.objectMode || !!D.readableObjectMode);
    var te = D.highWaterMark, G = D.readableHighWaterMark, W = this.objectMode ? 16 : 16 * 1024;
    te || te === 0 ? this.highWaterMark = te : Q && (G || G === 0) ? this.highWaterMark = G : this.highWaterMark = W, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new q(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = D.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, D.encoding && (I || (I = requireString_decoder().StringDecoder), this.decoder = new I(D.encoding), this.encoding = D.encoding);
  }
  function L(D) {
    if (B = B || require_stream_duplex(), !(this instanceof L))
      return new L(D);
    this._readableState = new C(D, this), this.readable = !0, D && (typeof D.read == "function" && (this._read = D.read), typeof D.destroy == "function" && (this._destroy = D.destroy)), P.call(this);
  }
  Object.defineProperty(L.prototype, "destroyed", {
    get: function() {
      return this._readableState === void 0 ? !1 : this._readableState.destroyed;
    },
    set: function(D) {
      this._readableState && (this._readableState.destroyed = D);
    }
  }), L.prototype.destroy = R.destroy, L.prototype._undestroy = R.undestroy, L.prototype._destroy = function(D, N) {
    this.push(null), N(D);
  }, L.prototype.push = function(D, N) {
    var Q = this._readableState, te;
    return Q.objectMode ? te = !0 : typeof D == "string" && (N = N || Q.defaultEncoding, N !== Q.encoding && (D = r.from(D, N), N = ""), te = !0), H(this, D, N, !1, te);
  }, L.prototype.unshift = function(D) {
    return H(this, D, null, !0, !1);
  };
  function H(D, N, Q, te, G) {
    var W = D._readableState;
    if (N === null)
      W.reading = !1, ue(D, W);
    else {
      var ae;
      G || (ae = J(W, N)), ae ? D.emit("error", ae) : W.objectMode || N && N.length > 0 ? (typeof N != "string" && !W.objectMode && Object.getPrototypeOf(N) !== r.prototype && (N = d(N)), te ? W.endEmitted ? D.emit("error", new Error("stream.unshift() after end event")) : j(D, W, N, !0) : W.ended ? D.emit("error", new Error("stream.push() after EOF")) : (W.reading = !1, W.decoder && !Q ? (N = W.decoder.write(N), W.objectMode || N.length !== 0 ? j(D, W, N, !1) : o(D, W)) : j(D, W, N, !1))) : te || (W.reading = !1);
    }
    return X(W);
  }
  function j(D, N, Q, te) {
    N.flowing && N.length === 0 && !N.sync ? (D.emit("data", Q), D.read(0)) : (N.length += N.objectMode ? 1 : Q.length, te ? N.buffer.unshift(Q) : N.buffer.push(Q), N.needReadable && U(D)), o(D, N);
  }
  function J(D, N) {
    var Q;
    return !x(N) && typeof N != "string" && N !== void 0 && !D.objectMode && (Q = new TypeError("Invalid non-string/buffer chunk")), Q;
  }
  function X(D) {
    return !D.ended && (D.needReadable || D.length < D.highWaterMark || D.length === 0);
  }
  L.prototype.isPaused = function() {
    return this._readableState.flowing === !1;
  }, L.prototype.setEncoding = function(D) {
    return I || (I = requireString_decoder().StringDecoder), this._readableState.decoder = new I(D), this._readableState.encoding = D, this;
  };
  var ie = 8388608;
  function ne(D) {
    return D >= ie ? D = ie : (D--, D |= D >>> 1, D |= D >>> 2, D |= D >>> 4, D |= D >>> 8, D |= D >>> 16, D++), D;
  }
  function ee(D, N) {
    return D <= 0 || N.length === 0 && N.ended ? 0 : N.objectMode ? 1 : D !== D ? N.flowing && N.length ? N.buffer.head.data.length : N.length : (D > N.highWaterMark && (N.highWaterMark = ne(D)), D <= N.length ? D : N.ended ? N.length : (N.needReadable = !0, 0));
  }
  L.prototype.read = function(D) {
    y("read", D), D = parseInt(D, 10);
    var N = this._readableState, Q = D;
    if (D !== 0 && (N.emittedReadable = !1), D === 0 && N.needReadable && (N.length >= N.highWaterMark || N.ended))
      return y("read: emitReadable", N.length, N.ended), N.length === 0 && N.ended ? V(this) : U(this), null;
    if (D = ee(D, N), D === 0 && N.ended)
      return N.length === 0 && V(this), null;
    var te = N.needReadable;
    y("need readable", te), (N.length === 0 || N.length - D < N.highWaterMark) && (te = !0, y("length less than watermark", te)), N.ended || N.reading ? (te = !1, y("reading or ended", te)) : te && (y("do read"), N.reading = !0, N.sync = !0, N.length === 0 && (N.needReadable = !0), this._read(N.highWaterMark), N.sync = !1, N.reading || (D = ee(Q, N)));
    var G;
    return D > 0 ? G = p(D, N) : G = null, G === null ? (N.needReadable = !0, D = 0) : N.length -= D, N.length === 0 && (N.ended || (N.needReadable = !0), Q !== D && N.ended && V(this)), G !== null && this.emit("data", G), G;
  };
  function ue(D, N) {
    if (!N.ended) {
      if (N.decoder) {
        var Q = N.decoder.end();
        Q && Q.length && (N.buffer.push(Q), N.length += N.objectMode ? 1 : Q.length);
      }
      N.ended = !0, U(D);
    }
  }
  function U(D) {
    var N = D._readableState;
    N.needReadable = !1, N.emittedReadable || (y("emitReadable", N.flowing), N.emittedReadable = !0, N.sync ? A.nextTick(E, D) : E(D));
  }
  function E(D) {
    y("emit readable"), D.emit("readable"), b(D);
  }
  function o(D, N) {
    N.readingMore || (N.readingMore = !0, A.nextTick(e, D, N));
  }
  function e(D, N) {
    for (var Q = N.length; !N.reading && !N.flowing && !N.ended && N.length < N.highWaterMark && (y("maybeReadMore read 0"), D.read(0), Q !== N.length); )
      Q = N.length;
    N.readingMore = !1;
  }
  L.prototype._read = function(D) {
    this.emit("error", new Error("_read() is not implemented"));
  }, L.prototype.pipe = function(D, N) {
    var Q = this, te = this._readableState;
    switch (te.pipesCount) {
      case 0:
        te.pipes = D;
        break;
      case 1:
        te.pipes = [te.pipes, D];
        break;
      default:
        te.pipes.push(D);
        break;
    }
    te.pipesCount += 1, y("pipe count=%d opts=%j", te.pipesCount, N);
    var G = (!N || N.end !== !1) && D !== process$1.stdout && D !== process$1.stderr, W = G ? se : le;
    te.endEmitted ? A.nextTick(W) : Q.once("end", W), D.on("unpipe", ae);
    function ae(ce, ve) {
      y("onunpipe"), ce === Q && ve && ve.hasUnpiped === !1 && (ve.hasUnpiped = !0, O());
    }
    function se() {
      y("onend"), D.end();
    }
    var he = t(Q);
    D.on("drain", he);
    var Z = !1;
    function O() {
      y("cleanup"), D.removeListener("close", fe), D.removeListener("finish", oe), D.removeListener("drain", he), D.removeListener("error", re), D.removeListener("unpipe", ae), Q.removeListener("end", se), Q.removeListener("end", le), Q.removeListener("data", K), Z = !0, te.awaitDrain && (!D._writableState || D._writableState.needDrain) && he();
    }
    var F = !1;
    Q.on("data", K);
    function K(ce) {
      y("ondata"), F = !1;
      var ve = D.write(ce);
      ve === !1 && !F && ((te.pipesCount === 1 && te.pipes === D || te.pipesCount > 1 && z(te.pipes, D) !== -1) && !Z && (y("false write response, pause", te.awaitDrain), te.awaitDrain++, F = !0), Q.pause());
    }
    function re(ce) {
      y("onerror", ce), le(), D.removeListener("error", re), M(D, "error") === 0 && D.emit("error", ce);
    }
    $(D, "error", re);
    function fe() {
      D.removeListener("finish", oe), le();
    }
    D.once("close", fe);
    function oe() {
      y("onfinish"), D.removeListener("close", fe), le();
    }
    D.once("finish", oe);
    function le() {
      y("unpipe"), Q.unpipe(D);
    }
    return D.emit("pipe", Q), te.flowing || (y("pipe resume"), Q.resume()), D;
  };
  function t(D) {
    return function() {
      var N = D._readableState;
      y("pipeOnDrain", N.awaitDrain), N.awaitDrain && N.awaitDrain--, N.awaitDrain === 0 && M(D, "data") && (N.flowing = !0, b(D));
    };
  }
  L.prototype.unpipe = function(D) {
    var N = this._readableState, Q = { hasUnpiped: !1 };
    if (N.pipesCount === 0)
      return this;
    if (N.pipesCount === 1)
      return D && D !== N.pipes ? this : (D || (D = N.pipes), N.pipes = null, N.pipesCount = 0, N.flowing = !1, D && D.emit("unpipe", this, Q), this);
    if (!D) {
      var te = N.pipes, G = N.pipesCount;
      N.pipes = null, N.pipesCount = 0, N.flowing = !1;
      for (var W = 0; W < G; W++)
        te[W].emit("unpipe", this, { hasUnpiped: !1 });
      return this;
    }
    var ae = z(N.pipes, D);
    return ae === -1 ? this : (N.pipes.splice(ae, 1), N.pipesCount -= 1, N.pipesCount === 1 && (N.pipes = N.pipes[0]), D.emit("unpipe", this, Q), this);
  }, L.prototype.on = function(D, N) {
    var Q = P.prototype.on.call(this, D, N);
    if (D === "data")
      this._readableState.flowing !== !1 && this.resume();
    else if (D === "readable") {
      var te = this._readableState;
      !te.endEmitted && !te.readableListening && (te.readableListening = te.needReadable = !0, te.emittedReadable = !1, te.reading ? te.length && U(this) : A.nextTick(v, this));
    }
    return Q;
  }, L.prototype.addListener = L.prototype.on;
  function v(D) {
    y("readable nexttick read 0"), D.read(0);
  }
  L.prototype.resume = function() {
    var D = this._readableState;
    return D.flowing || (y("resume"), D.flowing = !0, g(this, D)), this;
  };
  function g(D, N) {
    N.resumeScheduled || (N.resumeScheduled = !0, A.nextTick(h, D, N));
  }
  function h(D, N) {
    N.reading || (y("resume read 0"), D.read(0)), N.resumeScheduled = !1, N.awaitDrain = 0, D.emit("resume"), b(D), N.flowing && !N.reading && D.read(0);
  }
  L.prototype.pause = function() {
    return y("call pause flowing=%j", this._readableState.flowing), this._readableState.flowing !== !1 && (y("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  };
  function b(D) {
    var N = D._readableState;
    for (y("flow", N.flowing); N.flowing && D.read() !== null; )
      ;
  }
  L.prototype.wrap = function(D) {
    var N = this, Q = this._readableState, te = !1;
    D.on("end", function() {
      if (y("wrapped end"), Q.decoder && !Q.ended) {
        var ae = Q.decoder.end();
        ae && ae.length && N.push(ae);
      }
      N.push(null);
    }), D.on("data", function(ae) {
      if (y("wrapped data"), Q.decoder && (ae = Q.decoder.write(ae)), !(Q.objectMode && ae == null) && !(!Q.objectMode && (!ae || !ae.length))) {
        var se = N.push(ae);
        se || (te = !0, D.pause());
      }
    });
    for (var G in D)
      this[G] === void 0 && typeof D[G] == "function" && (this[G] = /* @__PURE__ */ function(ae) {
        return function() {
          return D[ae].apply(D, arguments);
        };
      }(G));
    for (var W = 0; W < k.length; W++)
      D.on(k[W], this.emit.bind(this, k[W]));
    return this._read = function(ae) {
      y("wrapped _read", ae), te && (te = !1, D.resume());
    }, this;
  }, Object.defineProperty(L.prototype, "readableHighWaterMark", {
    // making it explicit this property is not enumerable
    // because otherwise some prototype manipulation in
    // userland will fail
    enumerable: !1,
    get: function() {
      return this._readableState.highWaterMark;
    }
  }), L._fromList = p;
  function p(D, N) {
    if (N.length === 0)
      return null;
    var Q;
    return N.objectMode ? Q = N.buffer.shift() : !D || D >= N.length ? (N.decoder ? Q = N.buffer.join("") : N.buffer.length === 1 ? Q = N.buffer.head.data : Q = N.buffer.concat(N.length), N.buffer.clear()) : Q = w(D, N.buffer, N.decoder), Q;
  }
  function w(D, N, Q) {
    var te;
    return D < N.head.data.length ? (te = N.head.data.slice(0, D), N.head.data = N.head.data.slice(D)) : D === N.head.data.length ? te = N.shift() : te = Q ? a(D, N) : T(D, N), te;
  }
  function a(D, N) {
    var Q = N.head, te = 1, G = Q.data;
    for (D -= G.length; Q = Q.next; ) {
      var W = Q.data, ae = D > W.length ? W.length : D;
      if (ae === W.length ? G += W : G += W.slice(0, D), D -= ae, D === 0) {
        ae === W.length ? (++te, Q.next ? N.head = Q.next : N.head = N.tail = null) : (N.head = Q, Q.data = W.slice(ae));
        break;
      }
      ++te;
    }
    return N.length -= te, G;
  }
  function T(D, N) {
    var Q = r.allocUnsafe(D), te = N.head, G = 1;
    for (te.data.copy(Q), D -= te.data.length; te = te.next; ) {
      var W = te.data, ae = D > W.length ? W.length : D;
      if (W.copy(Q, Q.length - D, 0, ae), D -= ae, D === 0) {
        ae === W.length ? (++G, te.next ? N.head = te.next : N.head = N.tail = null) : (N.head = te, te.data = W.slice(ae));
        break;
      }
      ++G;
    }
    return N.length -= G, Q;
  }
  function V(D) {
    var N = D._readableState;
    if (N.length > 0)
      throw new Error('"endReadable()" called on non-empty stream');
    N.endEmitted || (N.ended = !0, A.nextTick(Y, N, D));
  }
  function Y(D, N) {
    !D.endEmitted && D.length === 0 && (D.endEmitted = !0, N.readable = !1, N.emit("end"));
  }
  function z(D, N) {
    for (var Q = 0, te = D.length; Q < te; Q++)
      if (D[Q] === N)
        return Q;
    return -1;
  }
  return _stream_readable;
}
var _stream_transform, hasRequired_stream_transform;
function require_stream_transform() {
  if (hasRequired_stream_transform)
    return _stream_transform;
  hasRequired_stream_transform = 1, _stream_transform = M;
  var A = require_stream_duplex(), _ = Object.create(requireUtil());
  _.inherits = requireInherits_browser(), _.inherits(M, A);
  function B(S, d) {
    var x = this._transformState;
    x.transforming = !1;
    var m = x.writecb;
    if (!m)
      return this.emit("error", new Error("write callback called multiple times"));
    x.writechunk = null, x.writecb = null, d != null && this.push(d), m(S);
    var f = this._readableState;
    f.reading = !1, (f.needReadable || f.length < f.highWaterMark) && this._read(f.highWaterMark);
  }
  function M(S) {
    if (!(this instanceof M))
      return new M(S);
    A.call(this, S), this._transformState = {
      afterTransform: B.bind(this),
      needTransform: !1,
      transforming: !1,
      writecb: null,
      writechunk: null,
      writeencoding: null
    }, this._readableState.needReadable = !0, this._readableState.sync = !1, S && (typeof S.transform == "function" && (this._transform = S.transform), typeof S.flush == "function" && (this._flush = S.flush)), this.on("prefinish", P);
  }
  function P() {
    var S = this;
    typeof this._flush == "function" ? this._flush(function(d, x) {
      r(S, d, x);
    }) : r(this, null, null);
  }
  M.prototype.push = function(S, d) {
    return this._transformState.needTransform = !1, A.prototype.push.call(this, S, d);
  }, M.prototype._transform = function(S, d, x) {
    throw new Error("_transform() is not implemented");
  }, M.prototype._write = function(S, d, x) {
    var m = this._transformState;
    if (m.writecb = x, m.writechunk = S, m.writeencoding = d, !m.transforming) {
      var f = this._readableState;
      (m.needTransform || f.needReadable || f.length < f.highWaterMark) && this._read(f.highWaterMark);
    }
  }, M.prototype._read = function(S) {
    var d = this._transformState;
    d.writechunk !== null && d.writecb && !d.transforming ? (d.transforming = !0, this._transform(d.writechunk, d.writeencoding, d.afterTransform)) : d.needTransform = !0;
  }, M.prototype._destroy = function(S, d) {
    var x = this;
    A.prototype._destroy.call(this, S, function(m) {
      d(m), x.emit("close");
    });
  };
  function r(S, d, x) {
    if (d)
      return S.emit("error", d);
    if (x != null && S.push(x), S._writableState.length)
      throw new Error("Calling transform done when ws.length != 0");
    if (S._transformState.transforming)
      throw new Error("Calling transform done when still transforming");
    return S.push(null);
  }
  return _stream_transform;
}
var _stream_passthrough, hasRequired_stream_passthrough;
function require_stream_passthrough() {
  if (hasRequired_stream_passthrough)
    return _stream_passthrough;
  hasRequired_stream_passthrough = 1, _stream_passthrough = B;
  var A = require_stream_transform(), _ = Object.create(requireUtil());
  _.inherits = requireInherits_browser(), _.inherits(B, A);
  function B(M) {
    if (!(this instanceof B))
      return new B(M);
    A.call(this, M);
  }
  return B.prototype._transform = function(M, P, r) {
    r(null, M);
  }, _stream_passthrough;
}
var hasRequiredReadableBrowser;
function requireReadableBrowser() {
  return hasRequiredReadableBrowser || (hasRequiredReadableBrowser = 1, function(A, _) {
    _ = A.exports = require_stream_readable(), _.Stream = _, _.Readable = _, _.Writable = require_stream_writable(), _.Duplex = require_stream_duplex(), _.Transform = require_stream_transform(), _.PassThrough = require_stream_passthrough();
  }(readableBrowser, readableBrowser.exports)), readableBrowser.exports;
}
var sign = { exports: {} }, bn$1 = { exports: {} };
bn$1.exports;
var hasRequiredBn$1;
function requireBn$1() {
  return hasRequiredBn$1 || (hasRequiredBn$1 = 1, function(A) {
    (function(_, B) {
      function M(o, e) {
        if (!o)
          throw new Error(e || "Assertion failed");
      }
      function P(o, e) {
        o.super_ = e;
        var t = function() {
        };
        t.prototype = e.prototype, o.prototype = new t(), o.prototype.constructor = o;
      }
      function r(o, e, t) {
        if (r.isBN(o))
          return o;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, o !== null && ((e === "le" || e === "be") && (t = e, e = 10), this._init(o || 0, e || 10, t || "be"));
      }
      typeof _ == "object" ? _.exports = r : B.BN = r, r.BN = r, r.wordSize = 26;
      var S;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? S = window.Buffer : S = requireBuffer$1().Buffer;
      } catch {
      }
      r.isBN = function(e) {
        return e instanceof r ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === r.wordSize && Array.isArray(e.words);
      }, r.max = function(e, t) {
        return e.cmp(t) > 0 ? e : t;
      }, r.min = function(e, t) {
        return e.cmp(t) < 0 ? e : t;
      }, r.prototype._init = function(e, t, v) {
        if (typeof e == "number")
          return this._initNumber(e, t, v);
        if (typeof e == "object")
          return this._initArray(e, t, v);
        t === "hex" && (t = 16), M(t === (t | 0) && t >= 2 && t <= 36), e = e.toString().replace(/\s+/g, "");
        var g = 0;
        e[0] === "-" && (g++, this.negative = 1), g < e.length && (t === 16 ? this._parseHex(e, g, v) : (this._parseBase(e, t, g), v === "le" && this._initArray(this.toArray(), t, v)));
      }, r.prototype._initNumber = function(e, t, v) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (M(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), v === "le" && this._initArray(this.toArray(), t, v);
      }, r.prototype._initArray = function(e, t, v) {
        if (M(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var g = 0; g < this.length; g++)
          this.words[g] = 0;
        var h, b, p = 0;
        if (v === "be")
          for (g = e.length - 1, h = 0; g >= 0; g -= 3)
            b = e[g] | e[g - 1] << 8 | e[g - 2] << 16, this.words[h] |= b << p & 67108863, this.words[h + 1] = b >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, h++);
        else if (v === "le")
          for (g = 0, h = 0; g < e.length; g += 3)
            b = e[g] | e[g + 1] << 8 | e[g + 2] << 16, this.words[h] |= b << p & 67108863, this.words[h + 1] = b >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, h++);
        return this._strip();
      };
      function d(o, e) {
        var t = o.charCodeAt(e);
        if (t >= 48 && t <= 57)
          return t - 48;
        if (t >= 65 && t <= 70)
          return t - 55;
        if (t >= 97 && t <= 102)
          return t - 87;
        M(!1, "Invalid character in " + o);
      }
      function x(o, e, t) {
        var v = d(o, t);
        return t - 1 >= e && (v |= d(o, t - 1) << 4), v;
      }
      r.prototype._parseHex = function(e, t, v) {
        this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length);
        for (var g = 0; g < this.length; g++)
          this.words[g] = 0;
        var h = 0, b = 0, p;
        if (v === "be")
          for (g = e.length - 1; g >= t; g -= 2)
            p = x(e, t, g) << h, this.words[b] |= p & 67108863, h >= 18 ? (h -= 18, b += 1, this.words[b] |= p >>> 26) : h += 8;
        else {
          var w = e.length - t;
          for (g = w % 2 === 0 ? t + 1 : t; g < e.length; g += 2)
            p = x(e, t, g) << h, this.words[b] |= p & 67108863, h >= 18 ? (h -= 18, b += 1, this.words[b] |= p >>> 26) : h += 8;
        }
        this._strip();
      };
      function m(o, e, t, v) {
        for (var g = 0, h = 0, b = Math.min(o.length, t), p = e; p < b; p++) {
          var w = o.charCodeAt(p) - 48;
          g *= v, w >= 49 ? h = w - 49 + 10 : w >= 17 ? h = w - 17 + 10 : h = w, M(w >= 0 && h < v, "Invalid character"), g += h;
        }
        return g;
      }
      r.prototype._parseBase = function(e, t, v) {
        this.words = [0], this.length = 1;
        for (var g = 0, h = 1; h <= 67108863; h *= t)
          g++;
        g--, h = h / t | 0;
        for (var b = e.length - v, p = b % g, w = Math.min(b, b - p) + v, a = 0, T = v; T < w; T += g)
          a = m(e, T, T + g, t), this.imuln(h), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
        if (p !== 0) {
          var V = 1;
          for (a = m(e, T, e.length, t), T = 0; T < p; T++)
            V *= t;
          this.imuln(V), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
        }
        this._strip();
      }, r.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var t = 0; t < this.length; t++)
          e.words[t] = this.words[t];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function f(o, e) {
        o.words = e.words, o.length = e.length, o.negative = e.negative, o.red = e.red;
      }
      if (r.prototype._move = function(e) {
        f(e, this);
      }, r.prototype.clone = function() {
        var e = new r(null);
        return this.copy(e), e;
      }, r.prototype._expand = function(e) {
        for (; this.length < e; )
          this.words[this.length++] = 0;
        return this;
      }, r.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, r.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          r.prototype[Symbol.for("nodejs.util.inspect.custom")] = y;
        } catch {
          r.prototype.inspect = y;
        }
      else
        r.prototype.inspect = y;
      function y() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var q = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], R = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], I = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      r.prototype.toString = function(e, t) {
        e = e || 10, t = t | 0 || 1;
        var v;
        if (e === 16 || e === "hex") {
          v = "";
          for (var g = 0, h = 0, b = 0; b < this.length; b++) {
            var p = this.words[b], w = ((p << g | h) & 16777215).toString(16);
            h = p >>> 24 - g & 16777215, g += 2, g >= 26 && (g -= 26, b--), h !== 0 || b !== this.length - 1 ? v = q[6 - w.length] + w + v : v = w + v;
          }
          for (h !== 0 && (v = h.toString(16) + v); v.length % t !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var a = R[e], T = I[e];
          v = "";
          var V = this.clone();
          for (V.negative = 0; !V.isZero(); ) {
            var Y = V.modrn(T).toString(e);
            V = V.idivn(T), V.isZero() ? v = Y + v : v = q[a - Y.length] + Y + v;
          }
          for (this.isZero() && (v = "0" + v); v.length % t !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        M(!1, "Base should be between 2 and 36");
      }, r.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && M(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, r.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, S && (r.prototype.toBuffer = function(e, t) {
        return this.toArrayLike(S, e, t);
      }), r.prototype.toArray = function(e, t) {
        return this.toArrayLike(Array, e, t);
      };
      var k = function(e, t) {
        return e.allocUnsafe ? e.allocUnsafe(t) : new e(t);
      };
      r.prototype.toArrayLike = function(e, t, v) {
        this._strip();
        var g = this.byteLength(), h = v || Math.max(1, g);
        M(g <= h, "byte array longer than desired length"), M(h > 0, "Requested array length <= 0");
        var b = k(e, h), p = t === "le" ? "LE" : "BE";
        return this["_toArrayLike" + p](b, g), b;
      }, r.prototype._toArrayLikeLE = function(e, t) {
        for (var v = 0, g = 0, h = 0, b = 0; h < this.length; h++) {
          var p = this.words[h] << b | g;
          e[v++] = p & 255, v < e.length && (e[v++] = p >> 8 & 255), v < e.length && (e[v++] = p >> 16 & 255), b === 6 ? (v < e.length && (e[v++] = p >> 24 & 255), g = 0, b = 0) : (g = p >>> 24, b += 2);
        }
        if (v < e.length)
          for (e[v++] = g; v < e.length; )
            e[v++] = 0;
      }, r.prototype._toArrayLikeBE = function(e, t) {
        for (var v = e.length - 1, g = 0, h = 0, b = 0; h < this.length; h++) {
          var p = this.words[h] << b | g;
          e[v--] = p & 255, v >= 0 && (e[v--] = p >> 8 & 255), v >= 0 && (e[v--] = p >> 16 & 255), b === 6 ? (v >= 0 && (e[v--] = p >> 24 & 255), g = 0, b = 0) : (g = p >>> 24, b += 2);
        }
        if (v >= 0)
          for (e[v--] = g; v >= 0; )
            e[v--] = 0;
      }, Math.clz32 ? r.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : r.prototype._countBits = function(e) {
        var t = e, v = 0;
        return t >= 4096 && (v += 13, t >>>= 13), t >= 64 && (v += 7, t >>>= 7), t >= 8 && (v += 4, t >>>= 4), t >= 2 && (v += 2, t >>>= 2), v + t;
      }, r.prototype._zeroBits = function(e) {
        if (e === 0)
          return 26;
        var t = e, v = 0;
        return t & 8191 || (v += 13, t >>>= 13), t & 127 || (v += 7, t >>>= 7), t & 15 || (v += 4, t >>>= 4), t & 3 || (v += 2, t >>>= 2), t & 1 || v++, v;
      }, r.prototype.bitLength = function() {
        var e = this.words[this.length - 1], t = this._countBits(e);
        return (this.length - 1) * 26 + t;
      };
      function $(o) {
        for (var e = new Array(o.bitLength()), t = 0; t < e.length; t++) {
          var v = t / 26 | 0, g = t % 26;
          e[t] = o.words[v] >>> g & 1;
        }
        return e;
      }
      r.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var e = 0, t = 0; t < this.length; t++) {
          var v = this._zeroBits(this.words[t]);
          if (e += v, v !== 26)
            break;
        }
        return e;
      }, r.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, r.prototype.toTwos = function(e) {
        return this.negative !== 0 ? this.abs().inotn(e).iaddn(1) : this.clone();
      }, r.prototype.fromTwos = function(e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      }, r.prototype.isNeg = function() {
        return this.negative !== 0;
      }, r.prototype.neg = function() {
        return this.clone().ineg();
      }, r.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, r.prototype.iuor = function(e) {
        for (; this.length < e.length; )
          this.words[this.length++] = 0;
        for (var t = 0; t < e.length; t++)
          this.words[t] = this.words[t] | e.words[t];
        return this._strip();
      }, r.prototype.ior = function(e) {
        return M((this.negative | e.negative) === 0), this.iuor(e);
      }, r.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, r.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, r.prototype.iuand = function(e) {
        var t;
        this.length > e.length ? t = e : t = this;
        for (var v = 0; v < t.length; v++)
          this.words[v] = this.words[v] & e.words[v];
        return this.length = t.length, this._strip();
      }, r.prototype.iand = function(e) {
        return M((this.negative | e.negative) === 0), this.iuand(e);
      }, r.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, r.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, r.prototype.iuxor = function(e) {
        var t, v;
        this.length > e.length ? (t = this, v = e) : (t = e, v = this);
        for (var g = 0; g < v.length; g++)
          this.words[g] = t.words[g] ^ v.words[g];
        if (this !== t)
          for (; g < t.length; g++)
            this.words[g] = t.words[g];
        return this.length = t.length, this._strip();
      }, r.prototype.ixor = function(e) {
        return M((this.negative | e.negative) === 0), this.iuxor(e);
      }, r.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, r.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, r.prototype.inotn = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = Math.ceil(e / 26) | 0, v = e % 26;
        this._expand(t), v > 0 && t--;
        for (var g = 0; g < t; g++)
          this.words[g] = ~this.words[g] & 67108863;
        return v > 0 && (this.words[g] = ~this.words[g] & 67108863 >> 26 - v), this._strip();
      }, r.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, r.prototype.setn = function(e, t) {
        M(typeof e == "number" && e >= 0);
        var v = e / 26 | 0, g = e % 26;
        return this._expand(v + 1), t ? this.words[v] = this.words[v] | 1 << g : this.words[v] = this.words[v] & ~(1 << g), this._strip();
      }, r.prototype.iadd = function(e) {
        var t;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, t = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, t = this.isub(e), e.negative = 1, t._normSign();
        var v, g;
        this.length > e.length ? (v = this, g = e) : (v = e, g = this);
        for (var h = 0, b = 0; b < g.length; b++)
          t = (v.words[b] | 0) + (g.words[b] | 0) + h, this.words[b] = t & 67108863, h = t >>> 26;
        for (; h !== 0 && b < v.length; b++)
          t = (v.words[b] | 0) + h, this.words[b] = t & 67108863, h = t >>> 26;
        if (this.length = v.length, h !== 0)
          this.words[this.length] = h, this.length++;
        else if (v !== this)
          for (; b < v.length; b++)
            this.words[b] = v.words[b];
        return this;
      }, r.prototype.add = function(e) {
        var t;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, t = this.sub(e), e.negative ^= 1, t) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, t = e.sub(this), this.negative = 1, t) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, r.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var t = this.iadd(e);
          return e.negative = 1, t._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var v = this.cmp(e);
        if (v === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var g, h;
        v > 0 ? (g = this, h = e) : (g = e, h = this);
        for (var b = 0, p = 0; p < h.length; p++)
          t = (g.words[p] | 0) - (h.words[p] | 0) + b, b = t >> 26, this.words[p] = t & 67108863;
        for (; b !== 0 && p < g.length; p++)
          t = (g.words[p] | 0) + b, b = t >> 26, this.words[p] = t & 67108863;
        if (b === 0 && p < g.length && g !== this)
          for (; p < g.length; p++)
            this.words[p] = g.words[p];
        return this.length = Math.max(this.length, p), g !== this && (this.negative = 1), this._strip();
      }, r.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function C(o, e, t) {
        t.negative = e.negative ^ o.negative;
        var v = o.length + e.length | 0;
        t.length = v, v = v - 1 | 0;
        var g = o.words[0] | 0, h = e.words[0] | 0, b = g * h, p = b & 67108863, w = b / 67108864 | 0;
        t.words[0] = p;
        for (var a = 1; a < v; a++) {
          for (var T = w >>> 26, V = w & 67108863, Y = Math.min(a, e.length - 1), z = Math.max(0, a - o.length + 1); z <= Y; z++) {
            var D = a - z | 0;
            g = o.words[D] | 0, h = e.words[z] | 0, b = g * h + V, T += b / 67108864 | 0, V = b & 67108863;
          }
          t.words[a] = V | 0, w = T | 0;
        }
        return w !== 0 ? t.words[a] = w | 0 : t.length--, t._strip();
      }
      var L = function(e, t, v) {
        var g = e.words, h = t.words, b = v.words, p = 0, w, a, T, V = g[0] | 0, Y = V & 8191, z = V >>> 13, D = g[1] | 0, N = D & 8191, Q = D >>> 13, te = g[2] | 0, G = te & 8191, W = te >>> 13, ae = g[3] | 0, se = ae & 8191, he = ae >>> 13, Z = g[4] | 0, O = Z & 8191, F = Z >>> 13, K = g[5] | 0, re = K & 8191, fe = K >>> 13, oe = g[6] | 0, le = oe & 8191, ce = oe >>> 13, ve = g[7] | 0, pe = ve & 8191, de = ve >>> 13, Ne = g[8] | 0, Re = Ne & 8191, be = Ne >>> 13, Ue = g[9] | 0, Ie = Ue & 8191, ye = Ue >>> 13, je = h[0] | 0, Te = je & 8191, me = je >>> 13, He = h[1] | 0, ke = He & 8191, ge = He >>> 13, ze = h[2] | 0, Pe = ze & 8191, we = ze >>> 13, We = h[3] | 0, Ce = We & 8191, xe = We >>> 13, Ke = h[4] | 0, $e = Ke & 8191, _e = Ke >>> 13, Ge = h[5] | 0, De = Ge & 8191, Me = Ge >>> 13, Ve = h[6] | 0, Oe = Ve & 8191, Se = Ve >>> 13, Je = h[7] | 0, Le = Je & 8191, qe = Je >>> 13, Ze = h[8] | 0, Fe = Ze & 8191, Ee = Ze >>> 13, Xe = h[9] | 0, Ae = Xe & 8191, Be = Xe >>> 13;
        v.negative = e.negative ^ t.negative, v.length = 19, w = Math.imul(Y, Te), a = Math.imul(Y, me), a = a + Math.imul(z, Te) | 0, T = Math.imul(z, me);
        var Ye = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (Ye >>> 26) | 0, Ye &= 67108863, w = Math.imul(N, Te), a = Math.imul(N, me), a = a + Math.imul(Q, Te) | 0, T = Math.imul(Q, me), w = w + Math.imul(Y, ke) | 0, a = a + Math.imul(Y, ge) | 0, a = a + Math.imul(z, ke) | 0, T = T + Math.imul(z, ge) | 0;
        var Qe = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, w = Math.imul(G, Te), a = Math.imul(G, me), a = a + Math.imul(W, Te) | 0, T = Math.imul(W, me), w = w + Math.imul(N, ke) | 0, a = a + Math.imul(N, ge) | 0, a = a + Math.imul(Q, ke) | 0, T = T + Math.imul(Q, ge) | 0, w = w + Math.imul(Y, Pe) | 0, a = a + Math.imul(Y, we) | 0, a = a + Math.imul(z, Pe) | 0, T = T + Math.imul(z, we) | 0;
        var er = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (er >>> 26) | 0, er &= 67108863, w = Math.imul(se, Te), a = Math.imul(se, me), a = a + Math.imul(he, Te) | 0, T = Math.imul(he, me), w = w + Math.imul(G, ke) | 0, a = a + Math.imul(G, ge) | 0, a = a + Math.imul(W, ke) | 0, T = T + Math.imul(W, ge) | 0, w = w + Math.imul(N, Pe) | 0, a = a + Math.imul(N, we) | 0, a = a + Math.imul(Q, Pe) | 0, T = T + Math.imul(Q, we) | 0, w = w + Math.imul(Y, Ce) | 0, a = a + Math.imul(Y, xe) | 0, a = a + Math.imul(z, Ce) | 0, T = T + Math.imul(z, xe) | 0;
        var rr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, w = Math.imul(O, Te), a = Math.imul(O, me), a = a + Math.imul(F, Te) | 0, T = Math.imul(F, me), w = w + Math.imul(se, ke) | 0, a = a + Math.imul(se, ge) | 0, a = a + Math.imul(he, ke) | 0, T = T + Math.imul(he, ge) | 0, w = w + Math.imul(G, Pe) | 0, a = a + Math.imul(G, we) | 0, a = a + Math.imul(W, Pe) | 0, T = T + Math.imul(W, we) | 0, w = w + Math.imul(N, Ce) | 0, a = a + Math.imul(N, xe) | 0, a = a + Math.imul(Q, Ce) | 0, T = T + Math.imul(Q, xe) | 0, w = w + Math.imul(Y, $e) | 0, a = a + Math.imul(Y, _e) | 0, a = a + Math.imul(z, $e) | 0, T = T + Math.imul(z, _e) | 0;
        var tr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, w = Math.imul(re, Te), a = Math.imul(re, me), a = a + Math.imul(fe, Te) | 0, T = Math.imul(fe, me), w = w + Math.imul(O, ke) | 0, a = a + Math.imul(O, ge) | 0, a = a + Math.imul(F, ke) | 0, T = T + Math.imul(F, ge) | 0, w = w + Math.imul(se, Pe) | 0, a = a + Math.imul(se, we) | 0, a = a + Math.imul(he, Pe) | 0, T = T + Math.imul(he, we) | 0, w = w + Math.imul(G, Ce) | 0, a = a + Math.imul(G, xe) | 0, a = a + Math.imul(W, Ce) | 0, T = T + Math.imul(W, xe) | 0, w = w + Math.imul(N, $e) | 0, a = a + Math.imul(N, _e) | 0, a = a + Math.imul(Q, $e) | 0, T = T + Math.imul(Q, _e) | 0, w = w + Math.imul(Y, De) | 0, a = a + Math.imul(Y, Me) | 0, a = a + Math.imul(z, De) | 0, T = T + Math.imul(z, Me) | 0;
        var ir = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, w = Math.imul(le, Te), a = Math.imul(le, me), a = a + Math.imul(ce, Te) | 0, T = Math.imul(ce, me), w = w + Math.imul(re, ke) | 0, a = a + Math.imul(re, ge) | 0, a = a + Math.imul(fe, ke) | 0, T = T + Math.imul(fe, ge) | 0, w = w + Math.imul(O, Pe) | 0, a = a + Math.imul(O, we) | 0, a = a + Math.imul(F, Pe) | 0, T = T + Math.imul(F, we) | 0, w = w + Math.imul(se, Ce) | 0, a = a + Math.imul(se, xe) | 0, a = a + Math.imul(he, Ce) | 0, T = T + Math.imul(he, xe) | 0, w = w + Math.imul(G, $e) | 0, a = a + Math.imul(G, _e) | 0, a = a + Math.imul(W, $e) | 0, T = T + Math.imul(W, _e) | 0, w = w + Math.imul(N, De) | 0, a = a + Math.imul(N, Me) | 0, a = a + Math.imul(Q, De) | 0, T = T + Math.imul(Q, Me) | 0, w = w + Math.imul(Y, Oe) | 0, a = a + Math.imul(Y, Se) | 0, a = a + Math.imul(z, Oe) | 0, T = T + Math.imul(z, Se) | 0;
        var nr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, w = Math.imul(pe, Te), a = Math.imul(pe, me), a = a + Math.imul(de, Te) | 0, T = Math.imul(de, me), w = w + Math.imul(le, ke) | 0, a = a + Math.imul(le, ge) | 0, a = a + Math.imul(ce, ke) | 0, T = T + Math.imul(ce, ge) | 0, w = w + Math.imul(re, Pe) | 0, a = a + Math.imul(re, we) | 0, a = a + Math.imul(fe, Pe) | 0, T = T + Math.imul(fe, we) | 0, w = w + Math.imul(O, Ce) | 0, a = a + Math.imul(O, xe) | 0, a = a + Math.imul(F, Ce) | 0, T = T + Math.imul(F, xe) | 0, w = w + Math.imul(se, $e) | 0, a = a + Math.imul(se, _e) | 0, a = a + Math.imul(he, $e) | 0, T = T + Math.imul(he, _e) | 0, w = w + Math.imul(G, De) | 0, a = a + Math.imul(G, Me) | 0, a = a + Math.imul(W, De) | 0, T = T + Math.imul(W, Me) | 0, w = w + Math.imul(N, Oe) | 0, a = a + Math.imul(N, Se) | 0, a = a + Math.imul(Q, Oe) | 0, T = T + Math.imul(Q, Se) | 0, w = w + Math.imul(Y, Le) | 0, a = a + Math.imul(Y, qe) | 0, a = a + Math.imul(z, Le) | 0, T = T + Math.imul(z, qe) | 0;
        var ar = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, w = Math.imul(Re, Te), a = Math.imul(Re, me), a = a + Math.imul(be, Te) | 0, T = Math.imul(be, me), w = w + Math.imul(pe, ke) | 0, a = a + Math.imul(pe, ge) | 0, a = a + Math.imul(de, ke) | 0, T = T + Math.imul(de, ge) | 0, w = w + Math.imul(le, Pe) | 0, a = a + Math.imul(le, we) | 0, a = a + Math.imul(ce, Pe) | 0, T = T + Math.imul(ce, we) | 0, w = w + Math.imul(re, Ce) | 0, a = a + Math.imul(re, xe) | 0, a = a + Math.imul(fe, Ce) | 0, T = T + Math.imul(fe, xe) | 0, w = w + Math.imul(O, $e) | 0, a = a + Math.imul(O, _e) | 0, a = a + Math.imul(F, $e) | 0, T = T + Math.imul(F, _e) | 0, w = w + Math.imul(se, De) | 0, a = a + Math.imul(se, Me) | 0, a = a + Math.imul(he, De) | 0, T = T + Math.imul(he, Me) | 0, w = w + Math.imul(G, Oe) | 0, a = a + Math.imul(G, Se) | 0, a = a + Math.imul(W, Oe) | 0, T = T + Math.imul(W, Se) | 0, w = w + Math.imul(N, Le) | 0, a = a + Math.imul(N, qe) | 0, a = a + Math.imul(Q, Le) | 0, T = T + Math.imul(Q, qe) | 0, w = w + Math.imul(Y, Fe) | 0, a = a + Math.imul(Y, Ee) | 0, a = a + Math.imul(z, Fe) | 0, T = T + Math.imul(z, Ee) | 0;
        var fr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, w = Math.imul(Ie, Te), a = Math.imul(Ie, me), a = a + Math.imul(ye, Te) | 0, T = Math.imul(ye, me), w = w + Math.imul(Re, ke) | 0, a = a + Math.imul(Re, ge) | 0, a = a + Math.imul(be, ke) | 0, T = T + Math.imul(be, ge) | 0, w = w + Math.imul(pe, Pe) | 0, a = a + Math.imul(pe, we) | 0, a = a + Math.imul(de, Pe) | 0, T = T + Math.imul(de, we) | 0, w = w + Math.imul(le, Ce) | 0, a = a + Math.imul(le, xe) | 0, a = a + Math.imul(ce, Ce) | 0, T = T + Math.imul(ce, xe) | 0, w = w + Math.imul(re, $e) | 0, a = a + Math.imul(re, _e) | 0, a = a + Math.imul(fe, $e) | 0, T = T + Math.imul(fe, _e) | 0, w = w + Math.imul(O, De) | 0, a = a + Math.imul(O, Me) | 0, a = a + Math.imul(F, De) | 0, T = T + Math.imul(F, Me) | 0, w = w + Math.imul(se, Oe) | 0, a = a + Math.imul(se, Se) | 0, a = a + Math.imul(he, Oe) | 0, T = T + Math.imul(he, Se) | 0, w = w + Math.imul(G, Le) | 0, a = a + Math.imul(G, qe) | 0, a = a + Math.imul(W, Le) | 0, T = T + Math.imul(W, qe) | 0, w = w + Math.imul(N, Fe) | 0, a = a + Math.imul(N, Ee) | 0, a = a + Math.imul(Q, Fe) | 0, T = T + Math.imul(Q, Ee) | 0, w = w + Math.imul(Y, Ae) | 0, a = a + Math.imul(Y, Be) | 0, a = a + Math.imul(z, Ae) | 0, T = T + Math.imul(z, Be) | 0;
        var sr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, w = Math.imul(Ie, ke), a = Math.imul(Ie, ge), a = a + Math.imul(ye, ke) | 0, T = Math.imul(ye, ge), w = w + Math.imul(Re, Pe) | 0, a = a + Math.imul(Re, we) | 0, a = a + Math.imul(be, Pe) | 0, T = T + Math.imul(be, we) | 0, w = w + Math.imul(pe, Ce) | 0, a = a + Math.imul(pe, xe) | 0, a = a + Math.imul(de, Ce) | 0, T = T + Math.imul(de, xe) | 0, w = w + Math.imul(le, $e) | 0, a = a + Math.imul(le, _e) | 0, a = a + Math.imul(ce, $e) | 0, T = T + Math.imul(ce, _e) | 0, w = w + Math.imul(re, De) | 0, a = a + Math.imul(re, Me) | 0, a = a + Math.imul(fe, De) | 0, T = T + Math.imul(fe, Me) | 0, w = w + Math.imul(O, Oe) | 0, a = a + Math.imul(O, Se) | 0, a = a + Math.imul(F, Oe) | 0, T = T + Math.imul(F, Se) | 0, w = w + Math.imul(se, Le) | 0, a = a + Math.imul(se, qe) | 0, a = a + Math.imul(he, Le) | 0, T = T + Math.imul(he, qe) | 0, w = w + Math.imul(G, Fe) | 0, a = a + Math.imul(G, Ee) | 0, a = a + Math.imul(W, Fe) | 0, T = T + Math.imul(W, Ee) | 0, w = w + Math.imul(N, Ae) | 0, a = a + Math.imul(N, Be) | 0, a = a + Math.imul(Q, Ae) | 0, T = T + Math.imul(Q, Be) | 0;
        var or = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, w = Math.imul(Ie, Pe), a = Math.imul(Ie, we), a = a + Math.imul(ye, Pe) | 0, T = Math.imul(ye, we), w = w + Math.imul(Re, Ce) | 0, a = a + Math.imul(Re, xe) | 0, a = a + Math.imul(be, Ce) | 0, T = T + Math.imul(be, xe) | 0, w = w + Math.imul(pe, $e) | 0, a = a + Math.imul(pe, _e) | 0, a = a + Math.imul(de, $e) | 0, T = T + Math.imul(de, _e) | 0, w = w + Math.imul(le, De) | 0, a = a + Math.imul(le, Me) | 0, a = a + Math.imul(ce, De) | 0, T = T + Math.imul(ce, Me) | 0, w = w + Math.imul(re, Oe) | 0, a = a + Math.imul(re, Se) | 0, a = a + Math.imul(fe, Oe) | 0, T = T + Math.imul(fe, Se) | 0, w = w + Math.imul(O, Le) | 0, a = a + Math.imul(O, qe) | 0, a = a + Math.imul(F, Le) | 0, T = T + Math.imul(F, qe) | 0, w = w + Math.imul(se, Fe) | 0, a = a + Math.imul(se, Ee) | 0, a = a + Math.imul(he, Fe) | 0, T = T + Math.imul(he, Ee) | 0, w = w + Math.imul(G, Ae) | 0, a = a + Math.imul(G, Be) | 0, a = a + Math.imul(W, Ae) | 0, T = T + Math.imul(W, Be) | 0;
        var ur = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, w = Math.imul(Ie, Ce), a = Math.imul(Ie, xe), a = a + Math.imul(ye, Ce) | 0, T = Math.imul(ye, xe), w = w + Math.imul(Re, $e) | 0, a = a + Math.imul(Re, _e) | 0, a = a + Math.imul(be, $e) | 0, T = T + Math.imul(be, _e) | 0, w = w + Math.imul(pe, De) | 0, a = a + Math.imul(pe, Me) | 0, a = a + Math.imul(de, De) | 0, T = T + Math.imul(de, Me) | 0, w = w + Math.imul(le, Oe) | 0, a = a + Math.imul(le, Se) | 0, a = a + Math.imul(ce, Oe) | 0, T = T + Math.imul(ce, Se) | 0, w = w + Math.imul(re, Le) | 0, a = a + Math.imul(re, qe) | 0, a = a + Math.imul(fe, Le) | 0, T = T + Math.imul(fe, qe) | 0, w = w + Math.imul(O, Fe) | 0, a = a + Math.imul(O, Ee) | 0, a = a + Math.imul(F, Fe) | 0, T = T + Math.imul(F, Ee) | 0, w = w + Math.imul(se, Ae) | 0, a = a + Math.imul(se, Be) | 0, a = a + Math.imul(he, Ae) | 0, T = T + Math.imul(he, Be) | 0;
        var hr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, w = Math.imul(Ie, $e), a = Math.imul(Ie, _e), a = a + Math.imul(ye, $e) | 0, T = Math.imul(ye, _e), w = w + Math.imul(Re, De) | 0, a = a + Math.imul(Re, Me) | 0, a = a + Math.imul(be, De) | 0, T = T + Math.imul(be, Me) | 0, w = w + Math.imul(pe, Oe) | 0, a = a + Math.imul(pe, Se) | 0, a = a + Math.imul(de, Oe) | 0, T = T + Math.imul(de, Se) | 0, w = w + Math.imul(le, Le) | 0, a = a + Math.imul(le, qe) | 0, a = a + Math.imul(ce, Le) | 0, T = T + Math.imul(ce, qe) | 0, w = w + Math.imul(re, Fe) | 0, a = a + Math.imul(re, Ee) | 0, a = a + Math.imul(fe, Fe) | 0, T = T + Math.imul(fe, Ee) | 0, w = w + Math.imul(O, Ae) | 0, a = a + Math.imul(O, Be) | 0, a = a + Math.imul(F, Ae) | 0, T = T + Math.imul(F, Be) | 0;
        var cr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, w = Math.imul(Ie, De), a = Math.imul(Ie, Me), a = a + Math.imul(ye, De) | 0, T = Math.imul(ye, Me), w = w + Math.imul(Re, Oe) | 0, a = a + Math.imul(Re, Se) | 0, a = a + Math.imul(be, Oe) | 0, T = T + Math.imul(be, Se) | 0, w = w + Math.imul(pe, Le) | 0, a = a + Math.imul(pe, qe) | 0, a = a + Math.imul(de, Le) | 0, T = T + Math.imul(de, qe) | 0, w = w + Math.imul(le, Fe) | 0, a = a + Math.imul(le, Ee) | 0, a = a + Math.imul(ce, Fe) | 0, T = T + Math.imul(ce, Ee) | 0, w = w + Math.imul(re, Ae) | 0, a = a + Math.imul(re, Be) | 0, a = a + Math.imul(fe, Ae) | 0, T = T + Math.imul(fe, Be) | 0;
        var dr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (dr >>> 26) | 0, dr &= 67108863, w = Math.imul(Ie, Oe), a = Math.imul(Ie, Se), a = a + Math.imul(ye, Oe) | 0, T = Math.imul(ye, Se), w = w + Math.imul(Re, Le) | 0, a = a + Math.imul(Re, qe) | 0, a = a + Math.imul(be, Le) | 0, T = T + Math.imul(be, qe) | 0, w = w + Math.imul(pe, Fe) | 0, a = a + Math.imul(pe, Ee) | 0, a = a + Math.imul(de, Fe) | 0, T = T + Math.imul(de, Ee) | 0, w = w + Math.imul(le, Ae) | 0, a = a + Math.imul(le, Be) | 0, a = a + Math.imul(ce, Ae) | 0, T = T + Math.imul(ce, Be) | 0;
        var lr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, w = Math.imul(Ie, Le), a = Math.imul(Ie, qe), a = a + Math.imul(ye, Le) | 0, T = Math.imul(ye, qe), w = w + Math.imul(Re, Fe) | 0, a = a + Math.imul(Re, Ee) | 0, a = a + Math.imul(be, Fe) | 0, T = T + Math.imul(be, Ee) | 0, w = w + Math.imul(pe, Ae) | 0, a = a + Math.imul(pe, Be) | 0, a = a + Math.imul(de, Ae) | 0, T = T + Math.imul(de, Be) | 0;
        var pr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (pr >>> 26) | 0, pr &= 67108863, w = Math.imul(Ie, Fe), a = Math.imul(Ie, Ee), a = a + Math.imul(ye, Fe) | 0, T = Math.imul(ye, Ee), w = w + Math.imul(Re, Ae) | 0, a = a + Math.imul(Re, Be) | 0, a = a + Math.imul(be, Ae) | 0, T = T + Math.imul(be, Be) | 0;
        var vr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (vr >>> 26) | 0, vr &= 67108863, w = Math.imul(Ie, Ae), a = Math.imul(Ie, Be), a = a + Math.imul(ye, Ae) | 0, T = Math.imul(ye, Be);
        var br = (p + w | 0) + ((a & 8191) << 13) | 0;
        return p = (T + (a >>> 13) | 0) + (br >>> 26) | 0, br &= 67108863, b[0] = Ye, b[1] = Qe, b[2] = er, b[3] = rr, b[4] = tr, b[5] = ir, b[6] = nr, b[7] = ar, b[8] = fr, b[9] = sr, b[10] = or, b[11] = ur, b[12] = hr, b[13] = cr, b[14] = dr, b[15] = lr, b[16] = pr, b[17] = vr, b[18] = br, p !== 0 && (b[19] = p, v.length++), v;
      };
      Math.imul || (L = C);
      function H(o, e, t) {
        t.negative = e.negative ^ o.negative, t.length = o.length + e.length;
        for (var v = 0, g = 0, h = 0; h < t.length - 1; h++) {
          var b = g;
          g = 0;
          for (var p = v & 67108863, w = Math.min(h, e.length - 1), a = Math.max(0, h - o.length + 1); a <= w; a++) {
            var T = h - a, V = o.words[T] | 0, Y = e.words[a] | 0, z = V * Y, D = z & 67108863;
            b = b + (z / 67108864 | 0) | 0, D = D + p | 0, p = D & 67108863, b = b + (D >>> 26) | 0, g += b >>> 26, b &= 67108863;
          }
          t.words[h] = p, v = b, b = g;
        }
        return v !== 0 ? t.words[h] = v : t.length--, t._strip();
      }
      function j(o, e, t) {
        return H(o, e, t);
      }
      r.prototype.mulTo = function(e, t) {
        var v, g = this.length + e.length;
        return this.length === 10 && e.length === 10 ? v = L(this, e, t) : g < 63 ? v = C(this, e, t) : g < 1024 ? v = H(this, e, t) : v = j(this, e, t), v;
      }, r.prototype.mul = function(e) {
        var t = new r(null);
        return t.words = new Array(this.length + e.length), this.mulTo(e, t);
      }, r.prototype.mulf = function(e) {
        var t = new r(null);
        return t.words = new Array(this.length + e.length), j(this, e, t);
      }, r.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, r.prototype.imuln = function(e) {
        var t = e < 0;
        t && (e = -e), M(typeof e == "number"), M(e < 67108864);
        for (var v = 0, g = 0; g < this.length; g++) {
          var h = (this.words[g] | 0) * e, b = (h & 67108863) + (v & 67108863);
          v >>= 26, v += h / 67108864 | 0, v += b >>> 26, this.words[g] = b & 67108863;
        }
        return v !== 0 && (this.words[g] = v, this.length++), t ? this.ineg() : this;
      }, r.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, r.prototype.sqr = function() {
        return this.mul(this);
      }, r.prototype.isqr = function() {
        return this.imul(this.clone());
      }, r.prototype.pow = function(e) {
        var t = $(e);
        if (t.length === 0)
          return new r(1);
        for (var v = this, g = 0; g < t.length && t[g] === 0; g++, v = v.sqr())
          ;
        if (++g < t.length)
          for (var h = v.sqr(); g < t.length; g++, h = h.sqr())
            t[g] !== 0 && (v = v.mul(h));
        return v;
      }, r.prototype.iushln = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = e % 26, v = (e - t) / 26, g = 67108863 >>> 26 - t << 26 - t, h;
        if (t !== 0) {
          var b = 0;
          for (h = 0; h < this.length; h++) {
            var p = this.words[h] & g, w = (this.words[h] | 0) - p << t;
            this.words[h] = w | b, b = p >>> 26 - t;
          }
          b && (this.words[h] = b, this.length++);
        }
        if (v !== 0) {
          for (h = this.length - 1; h >= 0; h--)
            this.words[h + v] = this.words[h];
          for (h = 0; h < v; h++)
            this.words[h] = 0;
          this.length += v;
        }
        return this._strip();
      }, r.prototype.ishln = function(e) {
        return M(this.negative === 0), this.iushln(e);
      }, r.prototype.iushrn = function(e, t, v) {
        M(typeof e == "number" && e >= 0);
        var g;
        t ? g = (t - t % 26) / 26 : g = 0;
        var h = e % 26, b = Math.min((e - h) / 26, this.length), p = 67108863 ^ 67108863 >>> h << h, w = v;
        if (g -= b, g = Math.max(0, g), w) {
          for (var a = 0; a < b; a++)
            w.words[a] = this.words[a];
          w.length = b;
        }
        if (b !== 0)
          if (this.length > b)
            for (this.length -= b, a = 0; a < this.length; a++)
              this.words[a] = this.words[a + b];
          else
            this.words[0] = 0, this.length = 1;
        var T = 0;
        for (a = this.length - 1; a >= 0 && (T !== 0 || a >= g); a--) {
          var V = this.words[a] | 0;
          this.words[a] = T << 26 - h | V >>> h, T = V & p;
        }
        return w && T !== 0 && (w.words[w.length++] = T), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, r.prototype.ishrn = function(e, t, v) {
        return M(this.negative === 0), this.iushrn(e, t, v);
      }, r.prototype.shln = function(e) {
        return this.clone().ishln(e);
      }, r.prototype.ushln = function(e) {
        return this.clone().iushln(e);
      }, r.prototype.shrn = function(e) {
        return this.clone().ishrn(e);
      }, r.prototype.ushrn = function(e) {
        return this.clone().iushrn(e);
      }, r.prototype.testn = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = e % 26, v = (e - t) / 26, g = 1 << t;
        if (this.length <= v)
          return !1;
        var h = this.words[v];
        return !!(h & g);
      }, r.prototype.imaskn = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = e % 26, v = (e - t) / 26;
        if (M(this.negative === 0, "imaskn works only with positive numbers"), this.length <= v)
          return this;
        if (t !== 0 && v++, this.length = Math.min(v, this.length), t !== 0) {
          var g = 67108863 ^ 67108863 >>> t << t;
          this.words[this.length - 1] &= g;
        }
        return this._strip();
      }, r.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, r.prototype.iaddn = function(e) {
        return M(typeof e == "number"), M(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, r.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var t = 0; t < this.length && this.words[t] >= 67108864; t++)
          this.words[t] -= 67108864, t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
        return this.length = Math.max(this.length, t + 1), this;
      }, r.prototype.isubn = function(e) {
        if (M(typeof e == "number"), M(e < 67108864), e < 0)
          return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var t = 0; t < this.length && this.words[t] < 0; t++)
            this.words[t] += 67108864, this.words[t + 1] -= 1;
        return this._strip();
      }, r.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, r.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, r.prototype.iabs = function() {
        return this.negative = 0, this;
      }, r.prototype.abs = function() {
        return this.clone().iabs();
      }, r.prototype._ishlnsubmul = function(e, t, v) {
        var g = e.length + v, h;
        this._expand(g);
        var b, p = 0;
        for (h = 0; h < e.length; h++) {
          b = (this.words[h + v] | 0) + p;
          var w = (e.words[h] | 0) * t;
          b -= w & 67108863, p = (b >> 26) - (w / 67108864 | 0), this.words[h + v] = b & 67108863;
        }
        for (; h < this.length - v; h++)
          b = (this.words[h + v] | 0) + p, p = b >> 26, this.words[h + v] = b & 67108863;
        if (p === 0)
          return this._strip();
        for (M(p === -1), p = 0, h = 0; h < this.length; h++)
          b = -(this.words[h] | 0) + p, p = b >> 26, this.words[h] = b & 67108863;
        return this.negative = 1, this._strip();
      }, r.prototype._wordDiv = function(e, t) {
        var v = this.length - e.length, g = this.clone(), h = e, b = h.words[h.length - 1] | 0, p = this._countBits(b);
        v = 26 - p, v !== 0 && (h = h.ushln(v), g.iushln(v), b = h.words[h.length - 1] | 0);
        var w = g.length - h.length, a;
        if (t !== "mod") {
          a = new r(null), a.length = w + 1, a.words = new Array(a.length);
          for (var T = 0; T < a.length; T++)
            a.words[T] = 0;
        }
        var V = g.clone()._ishlnsubmul(h, 1, w);
        V.negative === 0 && (g = V, a && (a.words[w] = 1));
        for (var Y = w - 1; Y >= 0; Y--) {
          var z = (g.words[h.length + Y] | 0) * 67108864 + (g.words[h.length + Y - 1] | 0);
          for (z = Math.min(z / b | 0, 67108863), g._ishlnsubmul(h, z, Y); g.negative !== 0; )
            z--, g.negative = 0, g._ishlnsubmul(h, 1, Y), g.isZero() || (g.negative ^= 1);
          a && (a.words[Y] = z);
        }
        return a && a._strip(), g._strip(), t !== "div" && v !== 0 && g.iushrn(v), {
          div: a || null,
          mod: g
        };
      }, r.prototype.divmod = function(e, t, v) {
        if (M(!e.isZero()), this.isZero())
          return {
            div: new r(0),
            mod: new r(0)
          };
        var g, h, b;
        return this.negative !== 0 && e.negative === 0 ? (b = this.neg().divmod(e, t), t !== "mod" && (g = b.div.neg()), t !== "div" && (h = b.mod.neg(), v && h.negative !== 0 && h.iadd(e)), {
          div: g,
          mod: h
        }) : this.negative === 0 && e.negative !== 0 ? (b = this.divmod(e.neg(), t), t !== "mod" && (g = b.div.neg()), {
          div: g,
          mod: b.mod
        }) : this.negative & e.negative ? (b = this.neg().divmod(e.neg(), t), t !== "div" && (h = b.mod.neg(), v && h.negative !== 0 && h.isub(e)), {
          div: b.div,
          mod: h
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new r(0),
          mod: this
        } : e.length === 1 ? t === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : t === "mod" ? {
          div: null,
          mod: new r(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new r(this.modrn(e.words[0]))
        } : this._wordDiv(e, t);
      }, r.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, r.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, r.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, r.prototype.divRound = function(e) {
        var t = this.divmod(e);
        if (t.mod.isZero())
          return t.div;
        var v = t.div.negative !== 0 ? t.mod.isub(e) : t.mod, g = e.ushrn(1), h = e.andln(1), b = v.cmp(g);
        return b < 0 || h === 1 && b === 0 ? t.div : t.div.negative !== 0 ? t.div.isubn(1) : t.div.iaddn(1);
      }, r.prototype.modrn = function(e) {
        var t = e < 0;
        t && (e = -e), M(e <= 67108863);
        for (var v = (1 << 26) % e, g = 0, h = this.length - 1; h >= 0; h--)
          g = (v * g + (this.words[h] | 0)) % e;
        return t ? -g : g;
      }, r.prototype.modn = function(e) {
        return this.modrn(e);
      }, r.prototype.idivn = function(e) {
        var t = e < 0;
        t && (e = -e), M(e <= 67108863);
        for (var v = 0, g = this.length - 1; g >= 0; g--) {
          var h = (this.words[g] | 0) + v * 67108864;
          this.words[g] = h / e | 0, v = h % e;
        }
        return this._strip(), t ? this.ineg() : this;
      }, r.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, r.prototype.egcd = function(e) {
        M(e.negative === 0), M(!e.isZero());
        var t = this, v = e.clone();
        t.negative !== 0 ? t = t.umod(e) : t = t.clone();
        for (var g = new r(1), h = new r(0), b = new r(0), p = new r(1), w = 0; t.isEven() && v.isEven(); )
          t.iushrn(1), v.iushrn(1), ++w;
        for (var a = v.clone(), T = t.clone(); !t.isZero(); ) {
          for (var V = 0, Y = 1; !(t.words[0] & Y) && V < 26; ++V, Y <<= 1)
            ;
          if (V > 0)
            for (t.iushrn(V); V-- > 0; )
              (g.isOdd() || h.isOdd()) && (g.iadd(a), h.isub(T)), g.iushrn(1), h.iushrn(1);
          for (var z = 0, D = 1; !(v.words[0] & D) && z < 26; ++z, D <<= 1)
            ;
          if (z > 0)
            for (v.iushrn(z); z-- > 0; )
              (b.isOdd() || p.isOdd()) && (b.iadd(a), p.isub(T)), b.iushrn(1), p.iushrn(1);
          t.cmp(v) >= 0 ? (t.isub(v), g.isub(b), h.isub(p)) : (v.isub(t), b.isub(g), p.isub(h));
        }
        return {
          a: b,
          b: p,
          gcd: v.iushln(w)
        };
      }, r.prototype._invmp = function(e) {
        M(e.negative === 0), M(!e.isZero());
        var t = this, v = e.clone();
        t.negative !== 0 ? t = t.umod(e) : t = t.clone();
        for (var g = new r(1), h = new r(0), b = v.clone(); t.cmpn(1) > 0 && v.cmpn(1) > 0; ) {
          for (var p = 0, w = 1; !(t.words[0] & w) && p < 26; ++p, w <<= 1)
            ;
          if (p > 0)
            for (t.iushrn(p); p-- > 0; )
              g.isOdd() && g.iadd(b), g.iushrn(1);
          for (var a = 0, T = 1; !(v.words[0] & T) && a < 26; ++a, T <<= 1)
            ;
          if (a > 0)
            for (v.iushrn(a); a-- > 0; )
              h.isOdd() && h.iadd(b), h.iushrn(1);
          t.cmp(v) >= 0 ? (t.isub(v), g.isub(h)) : (v.isub(t), h.isub(g));
        }
        var V;
        return t.cmpn(1) === 0 ? V = g : V = h, V.cmpn(0) < 0 && V.iadd(e), V;
      }, r.prototype.gcd = function(e) {
        if (this.isZero())
          return e.abs();
        if (e.isZero())
          return this.abs();
        var t = this.clone(), v = e.clone();
        t.negative = 0, v.negative = 0;
        for (var g = 0; t.isEven() && v.isEven(); g++)
          t.iushrn(1), v.iushrn(1);
        do {
          for (; t.isEven(); )
            t.iushrn(1);
          for (; v.isEven(); )
            v.iushrn(1);
          var h = t.cmp(v);
          if (h < 0) {
            var b = t;
            t = v, v = b;
          } else if (h === 0 || v.cmpn(1) === 0)
            break;
          t.isub(v);
        } while (!0);
        return v.iushln(g);
      }, r.prototype.invm = function(e) {
        return this.egcd(e).a.umod(e);
      }, r.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, r.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, r.prototype.andln = function(e) {
        return this.words[0] & e;
      }, r.prototype.bincn = function(e) {
        M(typeof e == "number");
        var t = e % 26, v = (e - t) / 26, g = 1 << t;
        if (this.length <= v)
          return this._expand(v + 1), this.words[v] |= g, this;
        for (var h = g, b = v; h !== 0 && b < this.length; b++) {
          var p = this.words[b] | 0;
          p += h, h = p >>> 26, p &= 67108863, this.words[b] = p;
        }
        return h !== 0 && (this.words[b] = h, this.length++), this;
      }, r.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, r.prototype.cmpn = function(e) {
        var t = e < 0;
        if (this.negative !== 0 && !t)
          return -1;
        if (this.negative === 0 && t)
          return 1;
        this._strip();
        var v;
        if (this.length > 1)
          v = 1;
        else {
          t && (e = -e), M(e <= 67108863, "Number is too big");
          var g = this.words[0] | 0;
          v = g === e ? 0 : g < e ? -1 : 1;
        }
        return this.negative !== 0 ? -v | 0 : v;
      }, r.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0)
          return -1;
        if (this.negative === 0 && e.negative !== 0)
          return 1;
        var t = this.ucmp(e);
        return this.negative !== 0 ? -t | 0 : t;
      }, r.prototype.ucmp = function(e) {
        if (this.length > e.length)
          return 1;
        if (this.length < e.length)
          return -1;
        for (var t = 0, v = this.length - 1; v >= 0; v--) {
          var g = this.words[v] | 0, h = e.words[v] | 0;
          if (g !== h) {
            g < h ? t = -1 : g > h && (t = 1);
            break;
          }
        }
        return t;
      }, r.prototype.gtn = function(e) {
        return this.cmpn(e) === 1;
      }, r.prototype.gt = function(e) {
        return this.cmp(e) === 1;
      }, r.prototype.gten = function(e) {
        return this.cmpn(e) >= 0;
      }, r.prototype.gte = function(e) {
        return this.cmp(e) >= 0;
      }, r.prototype.ltn = function(e) {
        return this.cmpn(e) === -1;
      }, r.prototype.lt = function(e) {
        return this.cmp(e) === -1;
      }, r.prototype.lten = function(e) {
        return this.cmpn(e) <= 0;
      }, r.prototype.lte = function(e) {
        return this.cmp(e) <= 0;
      }, r.prototype.eqn = function(e) {
        return this.cmpn(e) === 0;
      }, r.prototype.eq = function(e) {
        return this.cmp(e) === 0;
      }, r.red = function(e) {
        return new U(e);
      }, r.prototype.toRed = function(e) {
        return M(!this.red, "Already a number in reduction context"), M(this.negative === 0, "red works only with positives"), e.convertTo(this)._forceRed(e);
      }, r.prototype.fromRed = function() {
        return M(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, r.prototype._forceRed = function(e) {
        return this.red = e, this;
      }, r.prototype.forceRed = function(e) {
        return M(!this.red, "Already a number in reduction context"), this._forceRed(e);
      }, r.prototype.redAdd = function(e) {
        return M(this.red, "redAdd works only with red numbers"), this.red.add(this, e);
      }, r.prototype.redIAdd = function(e) {
        return M(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e);
      }, r.prototype.redSub = function(e) {
        return M(this.red, "redSub works only with red numbers"), this.red.sub(this, e);
      }, r.prototype.redISub = function(e) {
        return M(this.red, "redISub works only with red numbers"), this.red.isub(this, e);
      }, r.prototype.redShl = function(e) {
        return M(this.red, "redShl works only with red numbers"), this.red.shl(this, e);
      }, r.prototype.redMul = function(e) {
        return M(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e);
      }, r.prototype.redIMul = function(e) {
        return M(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e);
      }, r.prototype.redSqr = function() {
        return M(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, r.prototype.redISqr = function() {
        return M(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, r.prototype.redSqrt = function() {
        return M(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, r.prototype.redInvm = function() {
        return M(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, r.prototype.redNeg = function() {
        return M(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, r.prototype.redPow = function(e) {
        return M(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e);
      };
      var J = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function X(o, e) {
        this.name = o, this.p = new r(e, 16), this.n = this.p.bitLength(), this.k = new r(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      X.prototype._tmp = function() {
        var e = new r(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, X.prototype.ireduce = function(e) {
        var t = e, v;
        do
          this.split(t, this.tmp), t = this.imulK(t), t = t.iadd(this.tmp), v = t.bitLength();
        while (v > this.n);
        var g = v < this.n ? -1 : t.ucmp(this.p);
        return g === 0 ? (t.words[0] = 0, t.length = 1) : g > 0 ? t.isub(this.p) : t.strip !== void 0 ? t.strip() : t._strip(), t;
      }, X.prototype.split = function(e, t) {
        e.iushrn(this.n, 0, t);
      }, X.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function ie() {
        X.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      P(ie, X), ie.prototype.split = function(e, t) {
        for (var v = 4194303, g = Math.min(e.length, 9), h = 0; h < g; h++)
          t.words[h] = e.words[h];
        if (t.length = g, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var b = e.words[9];
        for (t.words[t.length++] = b & v, h = 10; h < e.length; h++) {
          var p = e.words[h] | 0;
          e.words[h - 10] = (p & v) << 4 | b >>> 22, b = p;
        }
        b >>>= 22, e.words[h - 10] = b, b === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, ie.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var t = 0, v = 0; v < e.length; v++) {
          var g = e.words[v] | 0;
          t += g * 977, e.words[v] = t & 67108863, t = g * 64 + (t / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function ne() {
        X.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      P(ne, X);
      function ee() {
        X.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      P(ee, X);
      function ue() {
        X.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      P(ue, X), ue.prototype.imulK = function(e) {
        for (var t = 0, v = 0; v < e.length; v++) {
          var g = (e.words[v] | 0) * 19 + t, h = g & 67108863;
          g >>>= 26, e.words[v] = h, t = g;
        }
        return t !== 0 && (e.words[e.length++] = t), e;
      }, r._prime = function(e) {
        if (J[e])
          return J[e];
        var t;
        if (e === "k256")
          t = new ie();
        else if (e === "p224")
          t = new ne();
        else if (e === "p192")
          t = new ee();
        else if (e === "p25519")
          t = new ue();
        else
          throw new Error("Unknown prime " + e);
        return J[e] = t, t;
      };
      function U(o) {
        if (typeof o == "string") {
          var e = r._prime(o);
          this.m = e.p, this.prime = e;
        } else
          M(o.gtn(1), "modulus must be greater than 1"), this.m = o, this.prime = null;
      }
      U.prototype._verify1 = function(e) {
        M(e.negative === 0, "red works only with positives"), M(e.red, "red works only with red numbers");
      }, U.prototype._verify2 = function(e, t) {
        M((e.negative | t.negative) === 0, "red works only with positives"), M(
          e.red && e.red === t.red,
          "red works only with red numbers"
        );
      }, U.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (f(e, e.umod(this.m)._forceRed(this)), e);
      }, U.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, U.prototype.add = function(e, t) {
        this._verify2(e, t);
        var v = e.add(t);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v._forceRed(this);
      }, U.prototype.iadd = function(e, t) {
        this._verify2(e, t);
        var v = e.iadd(t);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v;
      }, U.prototype.sub = function(e, t) {
        this._verify2(e, t);
        var v = e.sub(t);
        return v.cmpn(0) < 0 && v.iadd(this.m), v._forceRed(this);
      }, U.prototype.isub = function(e, t) {
        this._verify2(e, t);
        var v = e.isub(t);
        return v.cmpn(0) < 0 && v.iadd(this.m), v;
      }, U.prototype.shl = function(e, t) {
        return this._verify1(e), this.imod(e.ushln(t));
      }, U.prototype.imul = function(e, t) {
        return this._verify2(e, t), this.imod(e.imul(t));
      }, U.prototype.mul = function(e, t) {
        return this._verify2(e, t), this.imod(e.mul(t));
      }, U.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, U.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, U.prototype.sqrt = function(e) {
        if (e.isZero())
          return e.clone();
        var t = this.m.andln(3);
        if (M(t % 2 === 1), t === 3) {
          var v = this.m.add(new r(1)).iushrn(2);
          return this.pow(e, v);
        }
        for (var g = this.m.subn(1), h = 0; !g.isZero() && g.andln(1) === 0; )
          h++, g.iushrn(1);
        M(!g.isZero());
        var b = new r(1).toRed(this), p = b.redNeg(), w = this.m.subn(1).iushrn(1), a = this.m.bitLength();
        for (a = new r(2 * a * a).toRed(this); this.pow(a, w).cmp(p) !== 0; )
          a.redIAdd(p);
        for (var T = this.pow(a, g), V = this.pow(e, g.addn(1).iushrn(1)), Y = this.pow(e, g), z = h; Y.cmp(b) !== 0; ) {
          for (var D = Y, N = 0; D.cmp(b) !== 0; N++)
            D = D.redSqr();
          M(N < z);
          var Q = this.pow(T, new r(1).iushln(z - N - 1));
          V = V.redMul(Q), T = Q.redSqr(), Y = Y.redMul(T), z = N;
        }
        return V;
      }, U.prototype.invm = function(e) {
        var t = e._invmp(this.m);
        return t.negative !== 0 ? (t.negative = 0, this.imod(t).redNeg()) : this.imod(t);
      }, U.prototype.pow = function(e, t) {
        if (t.isZero())
          return new r(1).toRed(this);
        if (t.cmpn(1) === 0)
          return e.clone();
        var v = 4, g = new Array(1 << v);
        g[0] = new r(1).toRed(this), g[1] = e;
        for (var h = 2; h < g.length; h++)
          g[h] = this.mul(g[h - 1], e);
        var b = g[0], p = 0, w = 0, a = t.bitLength() % 26;
        for (a === 0 && (a = 26), h = t.length - 1; h >= 0; h--) {
          for (var T = t.words[h], V = a - 1; V >= 0; V--) {
            var Y = T >> V & 1;
            if (b !== g[0] && (b = this.sqr(b)), Y === 0 && p === 0) {
              w = 0;
              continue;
            }
            p <<= 1, p |= Y, w++, !(w !== v && (h !== 0 || V !== 0)) && (b = this.mul(b, g[p]), w = 0, p = 0);
          }
          a = 26;
        }
        return b;
      }, U.prototype.convertTo = function(e) {
        var t = e.umod(this.m);
        return t === e ? t.clone() : t;
      }, U.prototype.convertFrom = function(e) {
        var t = e.clone();
        return t.red = null, t;
      }, r.mont = function(e) {
        return new E(e);
      };
      function E(o) {
        U.call(this, o), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new r(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      P(E, U), E.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, E.prototype.convertFrom = function(e) {
        var t = this.imod(e.mul(this.rinv));
        return t.red = null, t;
      }, E.prototype.imul = function(e, t) {
        if (e.isZero() || t.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var v = e.imul(t), g = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = v.isub(g).iushrn(this.shift), b = h;
        return h.cmp(this.m) >= 0 ? b = h.isub(this.m) : h.cmpn(0) < 0 && (b = h.iadd(this.m)), b._forceRed(this);
      }, E.prototype.mul = function(e, t) {
        if (e.isZero() || t.isZero())
          return new r(0)._forceRed(this);
        var v = e.mul(t), g = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = v.isub(g).iushrn(this.shift), b = h;
        return h.cmp(this.m) >= 0 ? b = h.isub(this.m) : h.cmpn(0) < 0 && (b = h.iadd(this.m)), b._forceRed(this);
      }, E.prototype.invm = function(e) {
        var t = this.imod(e._invmp(this.m).mul(this.r2));
        return t._forceRed(this);
      };
    })(A, commonjsGlobal);
  }(bn$1)), bn$1.exports;
}
var browserifyRsa, hasRequiredBrowserifyRsa;
function requireBrowserifyRsa() {
  if (hasRequiredBrowserifyRsa)
    return browserifyRsa;
  hasRequiredBrowserifyRsa = 1;
  var A = requireBn$1(), _ = requireBrowser$b();
  function B(r) {
    var S = M(r), d = S.toRed(A.mont(r.modulus)).redPow(new A(r.publicExponent)).fromRed();
    return { blinder: d, unblinder: S.invm(r.modulus) };
  }
  function M(r) {
    var S = r.modulus.byteLength(), d;
    do
      d = new A(_(S));
    while (d.cmp(r.modulus) >= 0 || !d.umod(r.prime1) || !d.umod(r.prime2));
    return d;
  }
  function P(r, S) {
    var d = B(S), x = S.modulus.byteLength(), m = new A(r).mul(d.blinder).umod(S.modulus), f = m.toRed(A.mont(S.prime1)), y = m.toRed(A.mont(S.prime2)), q = S.coefficient, R = S.prime1, I = S.prime2, k = f.redPow(S.exponent1).fromRed(), $ = y.redPow(S.exponent2).fromRed(), C = k.isub($).imul(q).umod(R).imul(I);
    return $.iadd(C).imul(d.unblinder).umod(S.modulus).toArrayLike(bufferExports.Buffer, "be", x);
  }
  return P.getr = M, browserifyRsa = P, browserifyRsa;
}
var elliptic = {};
const name = "elliptic", version = "6.5.5", description = "EC cryptography", main = "lib/elliptic.js", files = [
  "lib"
], scripts = {
  lint: "eslint lib test",
  "lint:fix": "npm run lint -- --fix",
  unit: "istanbul test _mocha --reporter=spec test/index.js",
  test: "npm run lint && npm run unit",
  version: "grunt dist && git add dist/"
}, repository = {
  type: "git",
  url: "git@github.com:indutny/elliptic"
}, keywords = [
  "EC",
  "Elliptic",
  "curve",
  "Cryptography"
], author = "Fedor Indutny <fedor@indutny.com>", license = "MIT", bugs = {
  url: "https://github.com/indutny/elliptic/issues"
}, homepage = "https://github.com/indutny/elliptic", devDependencies = {
  brfs: "^2.0.2",
  coveralls: "^3.1.0",
  eslint: "^7.6.0",
  grunt: "^1.2.1",
  "grunt-browserify": "^5.3.0",
  "grunt-cli": "^1.3.2",
  "grunt-contrib-connect": "^3.0.0",
  "grunt-contrib-copy": "^1.0.0",
  "grunt-contrib-uglify": "^5.0.0",
  "grunt-mocha-istanbul": "^5.0.2",
  "grunt-saucelabs": "^9.0.1",
  istanbul: "^0.4.5",
  mocha: "^8.0.1"
}, dependencies = {
  "bn.js": "^4.11.9",
  brorand: "^1.1.0",
  "hash.js": "^1.0.0",
  "hmac-drbg": "^1.0.1",
  inherits: "^2.0.4",
  "minimalistic-assert": "^1.0.1",
  "minimalistic-crypto-utils": "^1.0.1"
}, require$$0 = {
  name,
  version,
  description,
  main,
  files,
  scripts,
  repository,
  keywords,
  author,
  license,
  bugs,
  homepage,
  devDependencies,
  dependencies
};
var utils$2 = {}, utils$1 = {}, hasRequiredUtils$2;
function requireUtils$2() {
  return hasRequiredUtils$2 || (hasRequiredUtils$2 = 1, function(A) {
    var _ = A;
    function B(r, S) {
      if (Array.isArray(r))
        return r.slice();
      if (!r)
        return [];
      var d = [];
      if (typeof r != "string") {
        for (var x = 0; x < r.length; x++)
          d[x] = r[x] | 0;
        return d;
      }
      if (S === "hex") {
        r = r.replace(/[^a-z0-9]+/ig, ""), r.length % 2 !== 0 && (r = "0" + r);
        for (var x = 0; x < r.length; x += 2)
          d.push(parseInt(r[x] + r[x + 1], 16));
      } else
        for (var x = 0; x < r.length; x++) {
          var m = r.charCodeAt(x), f = m >> 8, y = m & 255;
          f ? d.push(f, y) : d.push(y);
        }
      return d;
    }
    _.toArray = B;
    function M(r) {
      return r.length === 1 ? "0" + r : r;
    }
    _.zero2 = M;
    function P(r) {
      for (var S = "", d = 0; d < r.length; d++)
        S += M(r[d].toString(16));
      return S;
    }
    _.toHex = P, _.encode = function(S, d) {
      return d === "hex" ? P(S) : S;
    };
  }(utils$1)), utils$1;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  return hasRequiredUtils$1 || (hasRequiredUtils$1 = 1, function(A) {
    var _ = A, B = requireBn$2(), M = requireMinimalisticAssert(), P = requireUtils$2();
    _.assert = M, _.toArray = P.toArray, _.zero2 = P.zero2, _.toHex = P.toHex, _.encode = P.encode;
    function r(f, y, q) {
      var R = new Array(Math.max(f.bitLength(), q) + 1), I;
      for (I = 0; I < R.length; I += 1)
        R[I] = 0;
      var k = 1 << y + 1, $ = f.clone();
      for (I = 0; I < R.length; I++) {
        var C, L = $.andln(k - 1);
        $.isOdd() ? (L > (k >> 1) - 1 ? C = (k >> 1) - L : C = L, $.isubn(C)) : C = 0, R[I] = C, $.iushrn(1);
      }
      return R;
    }
    _.getNAF = r;
    function S(f, y) {
      var q = [
        [],
        []
      ];
      f = f.clone(), y = y.clone();
      for (var R = 0, I = 0, k; f.cmpn(-R) > 0 || y.cmpn(-I) > 0; ) {
        var $ = f.andln(3) + R & 3, C = y.andln(3) + I & 3;
        $ === 3 && ($ = -1), C === 3 && (C = -1);
        var L;
        $ & 1 ? (k = f.andln(7) + R & 7, (k === 3 || k === 5) && C === 2 ? L = -$ : L = $) : L = 0, q[0].push(L);
        var H;
        C & 1 ? (k = y.andln(7) + I & 7, (k === 3 || k === 5) && $ === 2 ? H = -C : H = C) : H = 0, q[1].push(H), 2 * R === L + 1 && (R = 1 - R), 2 * I === H + 1 && (I = 1 - I), f.iushrn(1), y.iushrn(1);
      }
      return q;
    }
    _.getJSF = S;
    function d(f, y, q) {
      var R = "_" + y;
      f.prototype[y] = function() {
        return this[R] !== void 0 ? this[R] : this[R] = q.call(this);
      };
    }
    _.cachedProperty = d;
    function x(f) {
      return typeof f == "string" ? _.toArray(f, "hex") : f;
    }
    _.parseBytes = x;
    function m(f) {
      return new B(f, "hex", "le");
    }
    _.intFromLE = m;
  }(utils$2)), utils$2;
}
var curve = {}, base$1, hasRequiredBase$1;
function requireBase$1() {
  if (hasRequiredBase$1)
    return base$1;
  hasRequiredBase$1 = 1;
  var A = requireBn$2(), _ = requireUtils$1(), B = _.getNAF, M = _.getJSF, P = _.assert;
  function r(d, x) {
    this.type = d, this.p = new A(x.p, 16), this.red = x.prime ? A.red(x.prime) : A.mont(this.p), this.zero = new A(0).toRed(this.red), this.one = new A(1).toRed(this.red), this.two = new A(2).toRed(this.red), this.n = x.n && new A(x.n, 16), this.g = x.g && this.pointFromJSON(x.g, x.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
    var m = this.n && this.p.div(this.n);
    !m || m.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red));
  }
  base$1 = r, r.prototype.point = function() {
    throw new Error("Not implemented");
  }, r.prototype.validate = function() {
    throw new Error("Not implemented");
  }, r.prototype._fixedNafMul = function(x, m) {
    P(x.precomputed);
    var f = x._getDoubles(), y = B(m, 1, this._bitLength), q = (1 << f.step + 1) - (f.step % 2 === 0 ? 2 : 1);
    q /= 3;
    var R = [], I, k;
    for (I = 0; I < y.length; I += f.step) {
      k = 0;
      for (var $ = I + f.step - 1; $ >= I; $--)
        k = (k << 1) + y[$];
      R.push(k);
    }
    for (var C = this.jpoint(null, null, null), L = this.jpoint(null, null, null), H = q; H > 0; H--) {
      for (I = 0; I < R.length; I++)
        k = R[I], k === H ? L = L.mixedAdd(f.points[I]) : k === -H && (L = L.mixedAdd(f.points[I].neg()));
      C = C.add(L);
    }
    return C.toP();
  }, r.prototype._wnafMul = function(x, m) {
    var f = 4, y = x._getNAFPoints(f);
    f = y.wnd;
    for (var q = y.points, R = B(m, f, this._bitLength), I = this.jpoint(null, null, null), k = R.length - 1; k >= 0; k--) {
      for (var $ = 0; k >= 0 && R[k] === 0; k--)
        $++;
      if (k >= 0 && $++, I = I.dblp($), k < 0)
        break;
      var C = R[k];
      P(C !== 0), x.type === "affine" ? C > 0 ? I = I.mixedAdd(q[C - 1 >> 1]) : I = I.mixedAdd(q[-C - 1 >> 1].neg()) : C > 0 ? I = I.add(q[C - 1 >> 1]) : I = I.add(q[-C - 1 >> 1].neg());
    }
    return x.type === "affine" ? I.toP() : I;
  }, r.prototype._wnafMulAdd = function(x, m, f, y, q) {
    var R = this._wnafT1, I = this._wnafT2, k = this._wnafT3, $ = 0, C, L, H;
    for (C = 0; C < y; C++) {
      H = m[C];
      var j = H._getNAFPoints(x);
      R[C] = j.wnd, I[C] = j.points;
    }
    for (C = y - 1; C >= 1; C -= 2) {
      var J = C - 1, X = C;
      if (R[J] !== 1 || R[X] !== 1) {
        k[J] = B(f[J], R[J], this._bitLength), k[X] = B(f[X], R[X], this._bitLength), $ = Math.max(k[J].length, $), $ = Math.max(k[X].length, $);
        continue;
      }
      var ie = [
        m[J],
        /* 1 */
        null,
        /* 3 */
        null,
        /* 5 */
        m[X]
        /* 7 */
      ];
      m[J].y.cmp(m[X].y) === 0 ? (ie[1] = m[J].add(m[X]), ie[2] = m[J].toJ().mixedAdd(m[X].neg())) : m[J].y.cmp(m[X].y.redNeg()) === 0 ? (ie[1] = m[J].toJ().mixedAdd(m[X]), ie[2] = m[J].add(m[X].neg())) : (ie[1] = m[J].toJ().mixedAdd(m[X]), ie[2] = m[J].toJ().mixedAdd(m[X].neg()));
      var ne = [
        -3,
        /* -1 -1 */
        -1,
        /* -1 0 */
        -5,
        /* -1 1 */
        -7,
        /* 0 -1 */
        0,
        /* 0 0 */
        7,
        /* 0 1 */
        5,
        /* 1 -1 */
        1,
        /* 1 0 */
        3
        /* 1 1 */
      ], ee = M(f[J], f[X]);
      for ($ = Math.max(ee[0].length, $), k[J] = new Array($), k[X] = new Array($), L = 0; L < $; L++) {
        var ue = ee[0][L] | 0, U = ee[1][L] | 0;
        k[J][L] = ne[(ue + 1) * 3 + (U + 1)], k[X][L] = 0, I[J] = ie;
      }
    }
    var E = this.jpoint(null, null, null), o = this._wnafT4;
    for (C = $; C >= 0; C--) {
      for (var e = 0; C >= 0; ) {
        var t = !0;
        for (L = 0; L < y; L++)
          o[L] = k[L][C] | 0, o[L] !== 0 && (t = !1);
        if (!t)
          break;
        e++, C--;
      }
      if (C >= 0 && e++, E = E.dblp(e), C < 0)
        break;
      for (L = 0; L < y; L++) {
        var v = o[L];
        v !== 0 && (v > 0 ? H = I[L][v - 1 >> 1] : v < 0 && (H = I[L][-v - 1 >> 1].neg()), H.type === "affine" ? E = E.mixedAdd(H) : E = E.add(H));
      }
    }
    for (C = 0; C < y; C++)
      I[C] = null;
    return q ? E : E.toP();
  };
  function S(d, x) {
    this.curve = d, this.type = x, this.precomputed = null;
  }
  return r.BasePoint = S, S.prototype.eq = function() {
    throw new Error("Not implemented");
  }, S.prototype.validate = function() {
    return this.curve.validate(this);
  }, r.prototype.decodePoint = function(x, m) {
    x = _.toArray(x, m);
    var f = this.p.byteLength();
    if ((x[0] === 4 || x[0] === 6 || x[0] === 7) && x.length - 1 === 2 * f) {
      x[0] === 6 ? P(x[x.length - 1] % 2 === 0) : x[0] === 7 && P(x[x.length - 1] % 2 === 1);
      var y = this.point(
        x.slice(1, 1 + f),
        x.slice(1 + f, 1 + 2 * f)
      );
      return y;
    } else if ((x[0] === 2 || x[0] === 3) && x.length - 1 === f)
      return this.pointFromX(x.slice(1, 1 + f), x[0] === 3);
    throw new Error("Unknown point format");
  }, S.prototype.encodeCompressed = function(x) {
    return this.encode(x, !0);
  }, S.prototype._encode = function(x) {
    var m = this.curve.p.byteLength(), f = this.getX().toArray("be", m);
    return x ? [this.getY().isEven() ? 2 : 3].concat(f) : [4].concat(f, this.getY().toArray("be", m));
  }, S.prototype.encode = function(x, m) {
    return _.encode(this._encode(m), x);
  }, S.prototype.precompute = function(x) {
    if (this.precomputed)
      return this;
    var m = {
      doubles: null,
      naf: null,
      beta: null
    };
    return m.naf = this._getNAFPoints(8), m.doubles = this._getDoubles(4, x), m.beta = this._getBeta(), this.precomputed = m, this;
  }, S.prototype._hasDoubles = function(x) {
    if (!this.precomputed)
      return !1;
    var m = this.precomputed.doubles;
    return m ? m.points.length >= Math.ceil((x.bitLength() + 1) / m.step) : !1;
  }, S.prototype._getDoubles = function(x, m) {
    if (this.precomputed && this.precomputed.doubles)
      return this.precomputed.doubles;
    for (var f = [this], y = this, q = 0; q < m; q += x) {
      for (var R = 0; R < x; R++)
        y = y.dbl();
      f.push(y);
    }
    return {
      step: x,
      points: f
    };
  }, S.prototype._getNAFPoints = function(x) {
    if (this.precomputed && this.precomputed.naf)
      return this.precomputed.naf;
    for (var m = [this], f = (1 << x) - 1, y = f === 1 ? null : this.dbl(), q = 1; q < f; q++)
      m[q] = m[q - 1].add(y);
    return {
      wnd: x,
      points: m
    };
  }, S.prototype._getBeta = function() {
    return null;
  }, S.prototype.dblp = function(x) {
    for (var m = this, f = 0; f < x; f++)
      m = m.dbl();
    return m;
  }, base$1;
}
var short, hasRequiredShort;
function requireShort() {
  if (hasRequiredShort)
    return short;
  hasRequiredShort = 1;
  var A = requireUtils$1(), _ = requireBn$2(), B = requireInherits_browser(), M = requireBase$1(), P = A.assert;
  function r(x) {
    M.call(this, "short", x), this.a = new _(x.a, 16).toRed(this.red), this.b = new _(x.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = this.a.fromRed().cmpn(0) === 0, this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0, this.endo = this._getEndomorphism(x), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4);
  }
  B(r, M), short = r, r.prototype._getEndomorphism = function(m) {
    if (!(!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)) {
      var f, y;
      if (m.beta)
        f = new _(m.beta, 16).toRed(this.red);
      else {
        var q = this._getEndoRoots(this.p);
        f = q[0].cmp(q[1]) < 0 ? q[0] : q[1], f = f.toRed(this.red);
      }
      if (m.lambda)
        y = new _(m.lambda, 16);
      else {
        var R = this._getEndoRoots(this.n);
        this.g.mul(R[0]).x.cmp(this.g.x.redMul(f)) === 0 ? y = R[0] : (y = R[1], P(this.g.mul(y).x.cmp(this.g.x.redMul(f)) === 0));
      }
      var I;
      return m.basis ? I = m.basis.map(function(k) {
        return {
          a: new _(k.a, 16),
          b: new _(k.b, 16)
        };
      }) : I = this._getEndoBasis(y), {
        beta: f,
        lambda: y,
        basis: I
      };
    }
  }, r.prototype._getEndoRoots = function(m) {
    var f = m === this.p ? this.red : _.mont(m), y = new _(2).toRed(f).redInvm(), q = y.redNeg(), R = new _(3).toRed(f).redNeg().redSqrt().redMul(y), I = q.redAdd(R).fromRed(), k = q.redSub(R).fromRed();
    return [I, k];
  }, r.prototype._getEndoBasis = function(m) {
    for (var f = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), y = m, q = this.n.clone(), R = new _(1), I = new _(0), k = new _(0), $ = new _(1), C, L, H, j, J, X, ie, ne = 0, ee, ue; y.cmpn(0) !== 0; ) {
      var U = q.div(y);
      ee = q.sub(U.mul(y)), ue = k.sub(U.mul(R));
      var E = $.sub(U.mul(I));
      if (!H && ee.cmp(f) < 0)
        C = ie.neg(), L = R, H = ee.neg(), j = ue;
      else if (H && ++ne === 2)
        break;
      ie = ee, q = y, y = ee, k = R, R = ue, $ = I, I = E;
    }
    J = ee.neg(), X = ue;
    var o = H.sqr().add(j.sqr()), e = J.sqr().add(X.sqr());
    return e.cmp(o) >= 0 && (J = C, X = L), H.negative && (H = H.neg(), j = j.neg()), J.negative && (J = J.neg(), X = X.neg()), [
      { a: H, b: j },
      { a: J, b: X }
    ];
  }, r.prototype._endoSplit = function(m) {
    var f = this.endo.basis, y = f[0], q = f[1], R = q.b.mul(m).divRound(this.n), I = y.b.neg().mul(m).divRound(this.n), k = R.mul(y.a), $ = I.mul(q.a), C = R.mul(y.b), L = I.mul(q.b), H = m.sub(k).sub($), j = C.add(L).neg();
    return { k1: H, k2: j };
  }, r.prototype.pointFromX = function(m, f) {
    m = new _(m, 16), m.red || (m = m.toRed(this.red));
    var y = m.redSqr().redMul(m).redIAdd(m.redMul(this.a)).redIAdd(this.b), q = y.redSqrt();
    if (q.redSqr().redSub(y).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var R = q.fromRed().isOdd();
    return (f && !R || !f && R) && (q = q.redNeg()), this.point(m, q);
  }, r.prototype.validate = function(m) {
    if (m.inf)
      return !0;
    var f = m.x, y = m.y, q = this.a.redMul(f), R = f.redSqr().redMul(f).redIAdd(q).redIAdd(this.b);
    return y.redSqr().redISub(R).cmpn(0) === 0;
  }, r.prototype._endoWnafMulAdd = function(m, f, y) {
    for (var q = this._endoWnafT1, R = this._endoWnafT2, I = 0; I < m.length; I++) {
      var k = this._endoSplit(f[I]), $ = m[I], C = $._getBeta();
      k.k1.negative && (k.k1.ineg(), $ = $.neg(!0)), k.k2.negative && (k.k2.ineg(), C = C.neg(!0)), q[I * 2] = $, q[I * 2 + 1] = C, R[I * 2] = k.k1, R[I * 2 + 1] = k.k2;
    }
    for (var L = this._wnafMulAdd(1, q, R, I * 2, y), H = 0; H < I * 2; H++)
      q[H] = null, R[H] = null;
    return L;
  };
  function S(x, m, f, y) {
    M.BasePoint.call(this, x, "affine"), m === null && f === null ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new _(m, 16), this.y = new _(f, 16), y && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1);
  }
  B(S, M.BasePoint), r.prototype.point = function(m, f, y) {
    return new S(this, m, f, y);
  }, r.prototype.pointFromJSON = function(m, f) {
    return S.fromJSON(this, m, f);
  }, S.prototype._getBeta = function() {
    if (this.curve.endo) {
      var m = this.precomputed;
      if (m && m.beta)
        return m.beta;
      var f = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
      if (m) {
        var y = this.curve, q = function(R) {
          return y.point(R.x.redMul(y.endo.beta), R.y);
        };
        m.beta = f, f.precomputed = {
          beta: null,
          naf: m.naf && {
            wnd: m.naf.wnd,
            points: m.naf.points.map(q)
          },
          doubles: m.doubles && {
            step: m.doubles.step,
            points: m.doubles.points.map(q)
          }
        };
      }
      return f;
    }
  }, S.prototype.toJSON = function() {
    return this.precomputed ? [this.x, this.y, this.precomputed && {
      doubles: this.precomputed.doubles && {
        step: this.precomputed.doubles.step,
        points: this.precomputed.doubles.points.slice(1)
      },
      naf: this.precomputed.naf && {
        wnd: this.precomputed.naf.wnd,
        points: this.precomputed.naf.points.slice(1)
      }
    }] : [this.x, this.y];
  }, S.fromJSON = function(m, f, y) {
    typeof f == "string" && (f = JSON.parse(f));
    var q = m.point(f[0], f[1], y);
    if (!f[2])
      return q;
    function R(k) {
      return m.point(k[0], k[1], y);
    }
    var I = f[2];
    return q.precomputed = {
      beta: null,
      doubles: I.doubles && {
        step: I.doubles.step,
        points: [q].concat(I.doubles.points.map(R))
      },
      naf: I.naf && {
        wnd: I.naf.wnd,
        points: [q].concat(I.naf.points.map(R))
      }
    }, q;
  }, S.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">";
  }, S.prototype.isInfinity = function() {
    return this.inf;
  }, S.prototype.add = function(m) {
    if (this.inf)
      return m;
    if (m.inf)
      return this;
    if (this.eq(m))
      return this.dbl();
    if (this.neg().eq(m))
      return this.curve.point(null, null);
    if (this.x.cmp(m.x) === 0)
      return this.curve.point(null, null);
    var f = this.y.redSub(m.y);
    f.cmpn(0) !== 0 && (f = f.redMul(this.x.redSub(m.x).redInvm()));
    var y = f.redSqr().redISub(this.x).redISub(m.x), q = f.redMul(this.x.redSub(y)).redISub(this.y);
    return this.curve.point(y, q);
  }, S.prototype.dbl = function() {
    if (this.inf)
      return this;
    var m = this.y.redAdd(this.y);
    if (m.cmpn(0) === 0)
      return this.curve.point(null, null);
    var f = this.curve.a, y = this.x.redSqr(), q = m.redInvm(), R = y.redAdd(y).redIAdd(y).redIAdd(f).redMul(q), I = R.redSqr().redISub(this.x.redAdd(this.x)), k = R.redMul(this.x.redSub(I)).redISub(this.y);
    return this.curve.point(I, k);
  }, S.prototype.getX = function() {
    return this.x.fromRed();
  }, S.prototype.getY = function() {
    return this.y.fromRed();
  }, S.prototype.mul = function(m) {
    return m = new _(m, 16), this.isInfinity() ? this : this._hasDoubles(m) ? this.curve._fixedNafMul(this, m) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [m]) : this.curve._wnafMul(this, m);
  }, S.prototype.mulAdd = function(m, f, y) {
    var q = [this, f], R = [m, y];
    return this.curve.endo ? this.curve._endoWnafMulAdd(q, R) : this.curve._wnafMulAdd(1, q, R, 2);
  }, S.prototype.jmulAdd = function(m, f, y) {
    var q = [this, f], R = [m, y];
    return this.curve.endo ? this.curve._endoWnafMulAdd(q, R, !0) : this.curve._wnafMulAdd(1, q, R, 2, !0);
  }, S.prototype.eq = function(m) {
    return this === m || this.inf === m.inf && (this.inf || this.x.cmp(m.x) === 0 && this.y.cmp(m.y) === 0);
  }, S.prototype.neg = function(m) {
    if (this.inf)
      return this;
    var f = this.curve.point(this.x, this.y.redNeg());
    if (m && this.precomputed) {
      var y = this.precomputed, q = function(R) {
        return R.neg();
      };
      f.precomputed = {
        naf: y.naf && {
          wnd: y.naf.wnd,
          points: y.naf.points.map(q)
        },
        doubles: y.doubles && {
          step: y.doubles.step,
          points: y.doubles.points.map(q)
        }
      };
    }
    return f;
  }, S.prototype.toJ = function() {
    if (this.inf)
      return this.curve.jpoint(null, null, null);
    var m = this.curve.jpoint(this.x, this.y, this.curve.one);
    return m;
  };
  function d(x, m, f, y) {
    M.BasePoint.call(this, x, "jacobian"), m === null && f === null && y === null ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new _(0)) : (this.x = new _(m, 16), this.y = new _(f, 16), this.z = new _(y, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one;
  }
  return B(d, M.BasePoint), r.prototype.jpoint = function(m, f, y) {
    return new d(this, m, f, y);
  }, d.prototype.toP = function() {
    if (this.isInfinity())
      return this.curve.point(null, null);
    var m = this.z.redInvm(), f = m.redSqr(), y = this.x.redMul(f), q = this.y.redMul(f).redMul(m);
    return this.curve.point(y, q);
  }, d.prototype.neg = function() {
    return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
  }, d.prototype.add = function(m) {
    if (this.isInfinity())
      return m;
    if (m.isInfinity())
      return this;
    var f = m.z.redSqr(), y = this.z.redSqr(), q = this.x.redMul(f), R = m.x.redMul(y), I = this.y.redMul(f.redMul(m.z)), k = m.y.redMul(y.redMul(this.z)), $ = q.redSub(R), C = I.redSub(k);
    if ($.cmpn(0) === 0)
      return C.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var L = $.redSqr(), H = L.redMul($), j = q.redMul(L), J = C.redSqr().redIAdd(H).redISub(j).redISub(j), X = C.redMul(j.redISub(J)).redISub(I.redMul(H)), ie = this.z.redMul(m.z).redMul($);
    return this.curve.jpoint(J, X, ie);
  }, d.prototype.mixedAdd = function(m) {
    if (this.isInfinity())
      return m.toJ();
    if (m.isInfinity())
      return this;
    var f = this.z.redSqr(), y = this.x, q = m.x.redMul(f), R = this.y, I = m.y.redMul(f).redMul(this.z), k = y.redSub(q), $ = R.redSub(I);
    if (k.cmpn(0) === 0)
      return $.cmpn(0) !== 0 ? this.curve.jpoint(null, null, null) : this.dbl();
    var C = k.redSqr(), L = C.redMul(k), H = y.redMul(C), j = $.redSqr().redIAdd(L).redISub(H).redISub(H), J = $.redMul(H.redISub(j)).redISub(R.redMul(L)), X = this.z.redMul(k);
    return this.curve.jpoint(j, J, X);
  }, d.prototype.dblp = function(m) {
    if (m === 0)
      return this;
    if (this.isInfinity())
      return this;
    if (!m)
      return this.dbl();
    var f;
    if (this.curve.zeroA || this.curve.threeA) {
      var y = this;
      for (f = 0; f < m; f++)
        y = y.dbl();
      return y;
    }
    var q = this.curve.a, R = this.curve.tinv, I = this.x, k = this.y, $ = this.z, C = $.redSqr().redSqr(), L = k.redAdd(k);
    for (f = 0; f < m; f++) {
      var H = I.redSqr(), j = L.redSqr(), J = j.redSqr(), X = H.redAdd(H).redIAdd(H).redIAdd(q.redMul(C)), ie = I.redMul(j), ne = X.redSqr().redISub(ie.redAdd(ie)), ee = ie.redISub(ne), ue = X.redMul(ee);
      ue = ue.redIAdd(ue).redISub(J);
      var U = L.redMul($);
      f + 1 < m && (C = C.redMul(J)), I = ne, $ = U, L = ue;
    }
    return this.curve.jpoint(I, L.redMul(R), $);
  }, d.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl();
  }, d.prototype._zeroDbl = function() {
    var m, f, y;
    if (this.zOne) {
      var q = this.x.redSqr(), R = this.y.redSqr(), I = R.redSqr(), k = this.x.redAdd(R).redSqr().redISub(q).redISub(I);
      k = k.redIAdd(k);
      var $ = q.redAdd(q).redIAdd(q), C = $.redSqr().redISub(k).redISub(k), L = I.redIAdd(I);
      L = L.redIAdd(L), L = L.redIAdd(L), m = C, f = $.redMul(k.redISub(C)).redISub(L), y = this.y.redAdd(this.y);
    } else {
      var H = this.x.redSqr(), j = this.y.redSqr(), J = j.redSqr(), X = this.x.redAdd(j).redSqr().redISub(H).redISub(J);
      X = X.redIAdd(X);
      var ie = H.redAdd(H).redIAdd(H), ne = ie.redSqr(), ee = J.redIAdd(J);
      ee = ee.redIAdd(ee), ee = ee.redIAdd(ee), m = ne.redISub(X).redISub(X), f = ie.redMul(X.redISub(m)).redISub(ee), y = this.y.redMul(this.z), y = y.redIAdd(y);
    }
    return this.curve.jpoint(m, f, y);
  }, d.prototype._threeDbl = function() {
    var m, f, y;
    if (this.zOne) {
      var q = this.x.redSqr(), R = this.y.redSqr(), I = R.redSqr(), k = this.x.redAdd(R).redSqr().redISub(q).redISub(I);
      k = k.redIAdd(k);
      var $ = q.redAdd(q).redIAdd(q).redIAdd(this.curve.a), C = $.redSqr().redISub(k).redISub(k);
      m = C;
      var L = I.redIAdd(I);
      L = L.redIAdd(L), L = L.redIAdd(L), f = $.redMul(k.redISub(C)).redISub(L), y = this.y.redAdd(this.y);
    } else {
      var H = this.z.redSqr(), j = this.y.redSqr(), J = this.x.redMul(j), X = this.x.redSub(H).redMul(this.x.redAdd(H));
      X = X.redAdd(X).redIAdd(X);
      var ie = J.redIAdd(J);
      ie = ie.redIAdd(ie);
      var ne = ie.redAdd(ie);
      m = X.redSqr().redISub(ne), y = this.y.redAdd(this.z).redSqr().redISub(j).redISub(H);
      var ee = j.redSqr();
      ee = ee.redIAdd(ee), ee = ee.redIAdd(ee), ee = ee.redIAdd(ee), f = X.redMul(ie.redISub(m)).redISub(ee);
    }
    return this.curve.jpoint(m, f, y);
  }, d.prototype._dbl = function() {
    var m = this.curve.a, f = this.x, y = this.y, q = this.z, R = q.redSqr().redSqr(), I = f.redSqr(), k = y.redSqr(), $ = I.redAdd(I).redIAdd(I).redIAdd(m.redMul(R)), C = f.redAdd(f);
    C = C.redIAdd(C);
    var L = C.redMul(k), H = $.redSqr().redISub(L.redAdd(L)), j = L.redISub(H), J = k.redSqr();
    J = J.redIAdd(J), J = J.redIAdd(J), J = J.redIAdd(J);
    var X = $.redMul(j).redISub(J), ie = y.redAdd(y).redMul(q);
    return this.curve.jpoint(H, X, ie);
  }, d.prototype.trpl = function() {
    if (!this.curve.zeroA)
      return this.dbl().add(this);
    var m = this.x.redSqr(), f = this.y.redSqr(), y = this.z.redSqr(), q = f.redSqr(), R = m.redAdd(m).redIAdd(m), I = R.redSqr(), k = this.x.redAdd(f).redSqr().redISub(m).redISub(q);
    k = k.redIAdd(k), k = k.redAdd(k).redIAdd(k), k = k.redISub(I);
    var $ = k.redSqr(), C = q.redIAdd(q);
    C = C.redIAdd(C), C = C.redIAdd(C), C = C.redIAdd(C);
    var L = R.redIAdd(k).redSqr().redISub(I).redISub($).redISub(C), H = f.redMul(L);
    H = H.redIAdd(H), H = H.redIAdd(H);
    var j = this.x.redMul($).redISub(H);
    j = j.redIAdd(j), j = j.redIAdd(j);
    var J = this.y.redMul(L.redMul(C.redISub(L)).redISub(k.redMul($)));
    J = J.redIAdd(J), J = J.redIAdd(J), J = J.redIAdd(J);
    var X = this.z.redAdd(k).redSqr().redISub(y).redISub($);
    return this.curve.jpoint(j, J, X);
  }, d.prototype.mul = function(m, f) {
    return m = new _(m, f), this.curve._wnafMul(this, m);
  }, d.prototype.eq = function(m) {
    if (m.type === "affine")
      return this.eq(m.toJ());
    if (this === m)
      return !0;
    var f = this.z.redSqr(), y = m.z.redSqr();
    if (this.x.redMul(y).redISub(m.x.redMul(f)).cmpn(0) !== 0)
      return !1;
    var q = f.redMul(this.z), R = y.redMul(m.z);
    return this.y.redMul(R).redISub(m.y.redMul(q)).cmpn(0) === 0;
  }, d.prototype.eqXToP = function(m) {
    var f = this.z.redSqr(), y = m.toRed(this.curve.red).redMul(f);
    if (this.x.cmp(y) === 0)
      return !0;
    for (var q = m.clone(), R = this.curve.redN.redMul(f); ; ) {
      if (q.iadd(this.curve.n), q.cmp(this.curve.p) >= 0)
        return !1;
      if (y.redIAdd(R), this.x.cmp(y) === 0)
        return !0;
    }
  }, d.prototype.inspect = function() {
    return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">";
  }, d.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, short;
}
var mont, hasRequiredMont;
function requireMont() {
  if (hasRequiredMont)
    return mont;
  hasRequiredMont = 1;
  var A = requireBn$2(), _ = requireInherits_browser(), B = requireBase$1(), M = requireUtils$1();
  function P(S) {
    B.call(this, "mont", S), this.a = new A(S.a, 16).toRed(this.red), this.b = new A(S.b, 16).toRed(this.red), this.i4 = new A(4).toRed(this.red).redInvm(), this.two = new A(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two));
  }
  _(P, B), mont = P, P.prototype.validate = function(d) {
    var x = d.normalize().x, m = x.redSqr(), f = m.redMul(x).redAdd(m.redMul(this.a)).redAdd(x), y = f.redSqrt();
    return y.redSqr().cmp(f) === 0;
  };
  function r(S, d, x) {
    B.BasePoint.call(this, S, "projective"), d === null && x === null ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new A(d, 16), this.z = new A(x, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)));
  }
  return _(r, B.BasePoint), P.prototype.decodePoint = function(d, x) {
    return this.point(M.toArray(d, x), 1);
  }, P.prototype.point = function(d, x) {
    return new r(this, d, x);
  }, P.prototype.pointFromJSON = function(d) {
    return r.fromJSON(this, d);
  }, r.prototype.precompute = function() {
  }, r.prototype._encode = function() {
    return this.getX().toArray("be", this.curve.p.byteLength());
  }, r.fromJSON = function(d, x) {
    return new r(d, x[0], x[1] || d.one);
  }, r.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, r.prototype.isInfinity = function() {
    return this.z.cmpn(0) === 0;
  }, r.prototype.dbl = function() {
    var d = this.x.redAdd(this.z), x = d.redSqr(), m = this.x.redSub(this.z), f = m.redSqr(), y = x.redSub(f), q = x.redMul(f), R = y.redMul(f.redAdd(this.curve.a24.redMul(y)));
    return this.curve.point(q, R);
  }, r.prototype.add = function() {
    throw new Error("Not supported on Montgomery curve");
  }, r.prototype.diffAdd = function(d, x) {
    var m = this.x.redAdd(this.z), f = this.x.redSub(this.z), y = d.x.redAdd(d.z), q = d.x.redSub(d.z), R = q.redMul(m), I = y.redMul(f), k = x.z.redMul(R.redAdd(I).redSqr()), $ = x.x.redMul(R.redISub(I).redSqr());
    return this.curve.point(k, $);
  }, r.prototype.mul = function(d) {
    for (var x = d.clone(), m = this, f = this.curve.point(null, null), y = this, q = []; x.cmpn(0) !== 0; x.iushrn(1))
      q.push(x.andln(1));
    for (var R = q.length - 1; R >= 0; R--)
      q[R] === 0 ? (m = m.diffAdd(f, y), f = f.dbl()) : (f = m.diffAdd(f, y), m = m.dbl());
    return f;
  }, r.prototype.mulAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, r.prototype.jumlAdd = function() {
    throw new Error("Not supported on Montgomery curve");
  }, r.prototype.eq = function(d) {
    return this.getX().cmp(d.getX()) === 0;
  }, r.prototype.normalize = function() {
    return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this;
  }, r.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, mont;
}
var edwards, hasRequiredEdwards;
function requireEdwards() {
  if (hasRequiredEdwards)
    return edwards;
  hasRequiredEdwards = 1;
  var A = requireUtils$1(), _ = requireBn$2(), B = requireInherits_browser(), M = requireBase$1(), P = A.assert;
  function r(d) {
    this.twisted = (d.a | 0) !== 1, this.mOneA = this.twisted && (d.a | 0) === -1, this.extended = this.mOneA, M.call(this, "edwards", d), this.a = new _(d.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new _(d.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new _(d.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), P(!this.twisted || this.c.fromRed().cmpn(1) === 0), this.oneC = (d.c | 0) === 1;
  }
  B(r, M), edwards = r, r.prototype._mulA = function(x) {
    return this.mOneA ? x.redNeg() : this.a.redMul(x);
  }, r.prototype._mulC = function(x) {
    return this.oneC ? x : this.c.redMul(x);
  }, r.prototype.jpoint = function(x, m, f, y) {
    return this.point(x, m, f, y);
  }, r.prototype.pointFromX = function(x, m) {
    x = new _(x, 16), x.red || (x = x.toRed(this.red));
    var f = x.redSqr(), y = this.c2.redSub(this.a.redMul(f)), q = this.one.redSub(this.c2.redMul(this.d).redMul(f)), R = y.redMul(q.redInvm()), I = R.redSqrt();
    if (I.redSqr().redSub(R).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    var k = I.fromRed().isOdd();
    return (m && !k || !m && k) && (I = I.redNeg()), this.point(x, I);
  }, r.prototype.pointFromY = function(x, m) {
    x = new _(x, 16), x.red || (x = x.toRed(this.red));
    var f = x.redSqr(), y = f.redSub(this.c2), q = f.redMul(this.d).redMul(this.c2).redSub(this.a), R = y.redMul(q.redInvm());
    if (R.cmp(this.zero) === 0) {
      if (m)
        throw new Error("invalid point");
      return this.point(this.zero, x);
    }
    var I = R.redSqrt();
    if (I.redSqr().redSub(R).cmp(this.zero) !== 0)
      throw new Error("invalid point");
    return I.fromRed().isOdd() !== m && (I = I.redNeg()), this.point(I, x);
  }, r.prototype.validate = function(x) {
    if (x.isInfinity())
      return !0;
    x.normalize();
    var m = x.x.redSqr(), f = x.y.redSqr(), y = m.redMul(this.a).redAdd(f), q = this.c2.redMul(this.one.redAdd(this.d.redMul(m).redMul(f)));
    return y.cmp(q) === 0;
  };
  function S(d, x, m, f, y) {
    M.BasePoint.call(this, d, "projective"), x === null && m === null && f === null ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new _(x, 16), this.y = new _(m, 16), this.z = f ? new _(f, 16) : this.curve.one, this.t = y && new _(y, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))));
  }
  return B(S, M.BasePoint), r.prototype.pointFromJSON = function(x) {
    return S.fromJSON(this, x);
  }, r.prototype.point = function(x, m, f, y) {
    return new S(this, x, m, f, y);
  }, S.fromJSON = function(x, m) {
    return new S(x, m[0], m[1], m[2]);
  }, S.prototype.inspect = function() {
    return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">";
  }, S.prototype.isInfinity = function() {
    return this.x.cmpn(0) === 0 && (this.y.cmp(this.z) === 0 || this.zOne && this.y.cmp(this.curve.c) === 0);
  }, S.prototype._extDbl = function() {
    var x = this.x.redSqr(), m = this.y.redSqr(), f = this.z.redSqr();
    f = f.redIAdd(f);
    var y = this.curve._mulA(x), q = this.x.redAdd(this.y).redSqr().redISub(x).redISub(m), R = y.redAdd(m), I = R.redSub(f), k = y.redSub(m), $ = q.redMul(I), C = R.redMul(k), L = q.redMul(k), H = I.redMul(R);
    return this.curve.point($, C, H, L);
  }, S.prototype._projDbl = function() {
    var x = this.x.redAdd(this.y).redSqr(), m = this.x.redSqr(), f = this.y.redSqr(), y, q, R, I, k, $;
    if (this.curve.twisted) {
      I = this.curve._mulA(m);
      var C = I.redAdd(f);
      this.zOne ? (y = x.redSub(m).redSub(f).redMul(C.redSub(this.curve.two)), q = C.redMul(I.redSub(f)), R = C.redSqr().redSub(C).redSub(C)) : (k = this.z.redSqr(), $ = C.redSub(k).redISub(k), y = x.redSub(m).redISub(f).redMul($), q = C.redMul(I.redSub(f)), R = C.redMul($));
    } else
      I = m.redAdd(f), k = this.curve._mulC(this.z).redSqr(), $ = I.redSub(k).redSub(k), y = this.curve._mulC(x.redISub(I)).redMul($), q = this.curve._mulC(I).redMul(m.redISub(f)), R = I.redMul($);
    return this.curve.point(y, q, R);
  }, S.prototype.dbl = function() {
    return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl();
  }, S.prototype._extAdd = function(x) {
    var m = this.y.redSub(this.x).redMul(x.y.redSub(x.x)), f = this.y.redAdd(this.x).redMul(x.y.redAdd(x.x)), y = this.t.redMul(this.curve.dd).redMul(x.t), q = this.z.redMul(x.z.redAdd(x.z)), R = f.redSub(m), I = q.redSub(y), k = q.redAdd(y), $ = f.redAdd(m), C = R.redMul(I), L = k.redMul($), H = R.redMul($), j = I.redMul(k);
    return this.curve.point(C, L, j, H);
  }, S.prototype._projAdd = function(x) {
    var m = this.z.redMul(x.z), f = m.redSqr(), y = this.x.redMul(x.x), q = this.y.redMul(x.y), R = this.curve.d.redMul(y).redMul(q), I = f.redSub(R), k = f.redAdd(R), $ = this.x.redAdd(this.y).redMul(x.x.redAdd(x.y)).redISub(y).redISub(q), C = m.redMul(I).redMul($), L, H;
    return this.curve.twisted ? (L = m.redMul(k).redMul(q.redSub(this.curve._mulA(y))), H = I.redMul(k)) : (L = m.redMul(k).redMul(q.redSub(y)), H = this.curve._mulC(I).redMul(k)), this.curve.point(C, L, H);
  }, S.prototype.add = function(x) {
    return this.isInfinity() ? x : x.isInfinity() ? this : this.curve.extended ? this._extAdd(x) : this._projAdd(x);
  }, S.prototype.mul = function(x) {
    return this._hasDoubles(x) ? this.curve._fixedNafMul(this, x) : this.curve._wnafMul(this, x);
  }, S.prototype.mulAdd = function(x, m, f) {
    return this.curve._wnafMulAdd(1, [this, m], [x, f], 2, !1);
  }, S.prototype.jmulAdd = function(x, m, f) {
    return this.curve._wnafMulAdd(1, [this, m], [x, f], 2, !0);
  }, S.prototype.normalize = function() {
    if (this.zOne)
      return this;
    var x = this.z.redInvm();
    return this.x = this.x.redMul(x), this.y = this.y.redMul(x), this.t && (this.t = this.t.redMul(x)), this.z = this.curve.one, this.zOne = !0, this;
  }, S.prototype.neg = function() {
    return this.curve.point(
      this.x.redNeg(),
      this.y,
      this.z,
      this.t && this.t.redNeg()
    );
  }, S.prototype.getX = function() {
    return this.normalize(), this.x.fromRed();
  }, S.prototype.getY = function() {
    return this.normalize(), this.y.fromRed();
  }, S.prototype.eq = function(x) {
    return this === x || this.getX().cmp(x.getX()) === 0 && this.getY().cmp(x.getY()) === 0;
  }, S.prototype.eqXToP = function(x) {
    var m = x.toRed(this.curve.red).redMul(this.z);
    if (this.x.cmp(m) === 0)
      return !0;
    for (var f = x.clone(), y = this.curve.redN.redMul(this.z); ; ) {
      if (f.iadd(this.curve.n), f.cmp(this.curve.p) >= 0)
        return !1;
      if (m.redIAdd(y), this.x.cmp(m) === 0)
        return !0;
    }
  }, S.prototype.toP = S.prototype.normalize, S.prototype.mixedAdd = S.prototype.add, edwards;
}
var hasRequiredCurve;
function requireCurve() {
  return hasRequiredCurve || (hasRequiredCurve = 1, function(A) {
    var _ = A;
    _.base = requireBase$1(), _.short = requireShort(), _.mont = requireMont(), _.edwards = requireEdwards();
  }(curve)), curve;
}
var curves = {}, hash = {}, utils = {}, hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils)
    return utils;
  hasRequiredUtils = 1;
  var A = requireMinimalisticAssert(), _ = requireInherits_browser();
  utils.inherits = _;
  function B(E, o) {
    return (E.charCodeAt(o) & 64512) !== 55296 || o < 0 || o + 1 >= E.length ? !1 : (E.charCodeAt(o + 1) & 64512) === 56320;
  }
  function M(E, o) {
    if (Array.isArray(E))
      return E.slice();
    if (!E)
      return [];
    var e = [];
    if (typeof E == "string")
      if (o) {
        if (o === "hex")
          for (E = E.replace(/[^a-z0-9]+/ig, ""), E.length % 2 !== 0 && (E = "0" + E), v = 0; v < E.length; v += 2)
            e.push(parseInt(E[v] + E[v + 1], 16));
      } else
        for (var t = 0, v = 0; v < E.length; v++) {
          var g = E.charCodeAt(v);
          g < 128 ? e[t++] = g : g < 2048 ? (e[t++] = g >> 6 | 192, e[t++] = g & 63 | 128) : B(E, v) ? (g = 65536 + ((g & 1023) << 10) + (E.charCodeAt(++v) & 1023), e[t++] = g >> 18 | 240, e[t++] = g >> 12 & 63 | 128, e[t++] = g >> 6 & 63 | 128, e[t++] = g & 63 | 128) : (e[t++] = g >> 12 | 224, e[t++] = g >> 6 & 63 | 128, e[t++] = g & 63 | 128);
        }
    else
      for (v = 0; v < E.length; v++)
        e[v] = E[v] | 0;
    return e;
  }
  utils.toArray = M;
  function P(E) {
    for (var o = "", e = 0; e < E.length; e++)
      o += d(E[e].toString(16));
    return o;
  }
  utils.toHex = P;
  function r(E) {
    var o = E >>> 24 | E >>> 8 & 65280 | E << 8 & 16711680 | (E & 255) << 24;
    return o >>> 0;
  }
  utils.htonl = r;
  function S(E, o) {
    for (var e = "", t = 0; t < E.length; t++) {
      var v = E[t];
      o === "little" && (v = r(v)), e += x(v.toString(16));
    }
    return e;
  }
  utils.toHex32 = S;
  function d(E) {
    return E.length === 1 ? "0" + E : E;
  }
  utils.zero2 = d;
  function x(E) {
    return E.length === 7 ? "0" + E : E.length === 6 ? "00" + E : E.length === 5 ? "000" + E : E.length === 4 ? "0000" + E : E.length === 3 ? "00000" + E : E.length === 2 ? "000000" + E : E.length === 1 ? "0000000" + E : E;
  }
  utils.zero8 = x;
  function m(E, o, e, t) {
    var v = e - o;
    A(v % 4 === 0);
    for (var g = new Array(v / 4), h = 0, b = o; h < g.length; h++, b += 4) {
      var p;
      t === "big" ? p = E[b] << 24 | E[b + 1] << 16 | E[b + 2] << 8 | E[b + 3] : p = E[b + 3] << 24 | E[b + 2] << 16 | E[b + 1] << 8 | E[b], g[h] = p >>> 0;
    }
    return g;
  }
  utils.join32 = m;
  function f(E, o) {
    for (var e = new Array(E.length * 4), t = 0, v = 0; t < E.length; t++, v += 4) {
      var g = E[t];
      o === "big" ? (e[v] = g >>> 24, e[v + 1] = g >>> 16 & 255, e[v + 2] = g >>> 8 & 255, e[v + 3] = g & 255) : (e[v + 3] = g >>> 24, e[v + 2] = g >>> 16 & 255, e[v + 1] = g >>> 8 & 255, e[v] = g & 255);
    }
    return e;
  }
  utils.split32 = f;
  function y(E, o) {
    return E >>> o | E << 32 - o;
  }
  utils.rotr32 = y;
  function q(E, o) {
    return E << o | E >>> 32 - o;
  }
  utils.rotl32 = q;
  function R(E, o) {
    return E + o >>> 0;
  }
  utils.sum32 = R;
  function I(E, o, e) {
    return E + o + e >>> 0;
  }
  utils.sum32_3 = I;
  function k(E, o, e, t) {
    return E + o + e + t >>> 0;
  }
  utils.sum32_4 = k;
  function $(E, o, e, t, v) {
    return E + o + e + t + v >>> 0;
  }
  utils.sum32_5 = $;
  function C(E, o, e, t) {
    var v = E[o], g = E[o + 1], h = t + g >>> 0, b = (h < t ? 1 : 0) + e + v;
    E[o] = b >>> 0, E[o + 1] = h;
  }
  utils.sum64 = C;
  function L(E, o, e, t) {
    var v = o + t >>> 0, g = (v < o ? 1 : 0) + E + e;
    return g >>> 0;
  }
  utils.sum64_hi = L;
  function H(E, o, e, t) {
    var v = o + t;
    return v >>> 0;
  }
  utils.sum64_lo = H;
  function j(E, o, e, t, v, g, h, b) {
    var p = 0, w = o;
    w = w + t >>> 0, p += w < o ? 1 : 0, w = w + g >>> 0, p += w < g ? 1 : 0, w = w + b >>> 0, p += w < b ? 1 : 0;
    var a = E + e + v + h + p;
    return a >>> 0;
  }
  utils.sum64_4_hi = j;
  function J(E, o, e, t, v, g, h, b) {
    var p = o + t + g + b;
    return p >>> 0;
  }
  utils.sum64_4_lo = J;
  function X(E, o, e, t, v, g, h, b, p, w) {
    var a = 0, T = o;
    T = T + t >>> 0, a += T < o ? 1 : 0, T = T + g >>> 0, a += T < g ? 1 : 0, T = T + b >>> 0, a += T < b ? 1 : 0, T = T + w >>> 0, a += T < w ? 1 : 0;
    var V = E + e + v + h + p + a;
    return V >>> 0;
  }
  utils.sum64_5_hi = X;
  function ie(E, o, e, t, v, g, h, b, p, w) {
    var a = o + t + g + b + w;
    return a >>> 0;
  }
  utils.sum64_5_lo = ie;
  function ne(E, o, e) {
    var t = o << 32 - e | E >>> e;
    return t >>> 0;
  }
  utils.rotr64_hi = ne;
  function ee(E, o, e) {
    var t = E << 32 - e | o >>> e;
    return t >>> 0;
  }
  utils.rotr64_lo = ee;
  function ue(E, o, e) {
    return E >>> e;
  }
  utils.shr64_hi = ue;
  function U(E, o, e) {
    var t = E << 32 - e | o >>> e;
    return t >>> 0;
  }
  return utils.shr64_lo = U, utils;
}
var common$1 = {}, hasRequiredCommon$1;
function requireCommon$1() {
  if (hasRequiredCommon$1)
    return common$1;
  hasRequiredCommon$1 = 1;
  var A = requireUtils(), _ = requireMinimalisticAssert();
  function B() {
    this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
  }
  return common$1.BlockHash = B, B.prototype.update = function(P, r) {
    if (P = A.toArray(P, r), this.pending ? this.pending = this.pending.concat(P) : this.pending = P, this.pendingTotal += P.length, this.pending.length >= this._delta8) {
      P = this.pending;
      var S = P.length % this._delta8;
      this.pending = P.slice(P.length - S, P.length), this.pending.length === 0 && (this.pending = null), P = A.join32(P, 0, P.length - S, this.endian);
      for (var d = 0; d < P.length; d += this._delta32)
        this._update(P, d, d + this._delta32);
    }
    return this;
  }, B.prototype.digest = function(P) {
    return this.update(this._pad()), _(this.pending === null), this._digest(P);
  }, B.prototype._pad = function() {
    var P = this.pendingTotal, r = this._delta8, S = r - (P + this.padLength) % r, d = new Array(S + this.padLength);
    d[0] = 128;
    for (var x = 1; x < S; x++)
      d[x] = 0;
    if (P <<= 3, this.endian === "big") {
      for (var m = 8; m < this.padLength; m++)
        d[x++] = 0;
      d[x++] = 0, d[x++] = 0, d[x++] = 0, d[x++] = 0, d[x++] = P >>> 24 & 255, d[x++] = P >>> 16 & 255, d[x++] = P >>> 8 & 255, d[x++] = P & 255;
    } else
      for (d[x++] = P & 255, d[x++] = P >>> 8 & 255, d[x++] = P >>> 16 & 255, d[x++] = P >>> 24 & 255, d[x++] = 0, d[x++] = 0, d[x++] = 0, d[x++] = 0, m = 8; m < this.padLength; m++)
        d[x++] = 0;
    return d;
  }, common$1;
}
var sha = {}, common = {}, hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon)
    return common;
  hasRequiredCommon = 1;
  var A = requireUtils(), _ = A.rotr32;
  function B(f, y, q, R) {
    if (f === 0)
      return M(y, q, R);
    if (f === 1 || f === 3)
      return r(y, q, R);
    if (f === 2)
      return P(y, q, R);
  }
  common.ft_1 = B;
  function M(f, y, q) {
    return f & y ^ ~f & q;
  }
  common.ch32 = M;
  function P(f, y, q) {
    return f & y ^ f & q ^ y & q;
  }
  common.maj32 = P;
  function r(f, y, q) {
    return f ^ y ^ q;
  }
  common.p32 = r;
  function S(f) {
    return _(f, 2) ^ _(f, 13) ^ _(f, 22);
  }
  common.s0_256 = S;
  function d(f) {
    return _(f, 6) ^ _(f, 11) ^ _(f, 25);
  }
  common.s1_256 = d;
  function x(f) {
    return _(f, 7) ^ _(f, 18) ^ f >>> 3;
  }
  common.g0_256 = x;
  function m(f) {
    return _(f, 17) ^ _(f, 19) ^ f >>> 10;
  }
  return common.g1_256 = m, common;
}
var _1, hasRequired_1;
function require_1() {
  if (hasRequired_1)
    return _1;
  hasRequired_1 = 1;
  var A = requireUtils(), _ = requireCommon$1(), B = requireCommon(), M = A.rotl32, P = A.sum32, r = A.sum32_5, S = B.ft_1, d = _.BlockHash, x = [
    1518500249,
    1859775393,
    2400959708,
    3395469782
  ];
  function m() {
    if (!(this instanceof m))
      return new m();
    d.call(this), this.h = [
      1732584193,
      4023233417,
      2562383102,
      271733878,
      3285377520
    ], this.W = new Array(80);
  }
  return A.inherits(m, d), _1 = m, m.blockSize = 512, m.outSize = 160, m.hmacStrength = 80, m.padLength = 64, m.prototype._update = function(y, q) {
    for (var R = this.W, I = 0; I < 16; I++)
      R[I] = y[q + I];
    for (; I < R.length; I++)
      R[I] = M(R[I - 3] ^ R[I - 8] ^ R[I - 14] ^ R[I - 16], 1);
    var k = this.h[0], $ = this.h[1], C = this.h[2], L = this.h[3], H = this.h[4];
    for (I = 0; I < R.length; I++) {
      var j = ~~(I / 20), J = r(M(k, 5), S(j, $, C, L), H, R[I], x[j]);
      H = L, L = C, C = M($, 30), $ = k, k = J;
    }
    this.h[0] = P(this.h[0], k), this.h[1] = P(this.h[1], $), this.h[2] = P(this.h[2], C), this.h[3] = P(this.h[3], L), this.h[4] = P(this.h[4], H);
  }, m.prototype._digest = function(y) {
    return y === "hex" ? A.toHex32(this.h, "big") : A.split32(this.h, "big");
  }, _1;
}
var _256, hasRequired_256;
function require_256() {
  if (hasRequired_256)
    return _256;
  hasRequired_256 = 1;
  var A = requireUtils(), _ = requireCommon$1(), B = requireCommon(), M = requireMinimalisticAssert(), P = A.sum32, r = A.sum32_4, S = A.sum32_5, d = B.ch32, x = B.maj32, m = B.s0_256, f = B.s1_256, y = B.g0_256, q = B.g1_256, R = _.BlockHash, I = [
    1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298
  ];
  function k() {
    if (!(this instanceof k))
      return new k();
    R.call(this), this.h = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ], this.k = I, this.W = new Array(64);
  }
  return A.inherits(k, R), _256 = k, k.blockSize = 512, k.outSize = 256, k.hmacStrength = 192, k.padLength = 64, k.prototype._update = function(C, L) {
    for (var H = this.W, j = 0; j < 16; j++)
      H[j] = C[L + j];
    for (; j < H.length; j++)
      H[j] = r(q(H[j - 2]), H[j - 7], y(H[j - 15]), H[j - 16]);
    var J = this.h[0], X = this.h[1], ie = this.h[2], ne = this.h[3], ee = this.h[4], ue = this.h[5], U = this.h[6], E = this.h[7];
    for (M(this.k.length === H.length), j = 0; j < H.length; j++) {
      var o = S(E, f(ee), d(ee, ue, U), this.k[j], H[j]), e = P(m(J), x(J, X, ie));
      E = U, U = ue, ue = ee, ee = P(ne, o), ne = ie, ie = X, X = J, J = P(o, e);
    }
    this.h[0] = P(this.h[0], J), this.h[1] = P(this.h[1], X), this.h[2] = P(this.h[2], ie), this.h[3] = P(this.h[3], ne), this.h[4] = P(this.h[4], ee), this.h[5] = P(this.h[5], ue), this.h[6] = P(this.h[6], U), this.h[7] = P(this.h[7], E);
  }, k.prototype._digest = function(C) {
    return C === "hex" ? A.toHex32(this.h, "big") : A.split32(this.h, "big");
  }, _256;
}
var _224, hasRequired_224;
function require_224() {
  if (hasRequired_224)
    return _224;
  hasRequired_224 = 1;
  var A = requireUtils(), _ = require_256();
  function B() {
    if (!(this instanceof B))
      return new B();
    _.call(this), this.h = [
      3238371032,
      914150663,
      812702999,
      4144912697,
      4290775857,
      1750603025,
      1694076839,
      3204075428
    ];
  }
  return A.inherits(B, _), _224 = B, B.blockSize = 512, B.outSize = 224, B.hmacStrength = 192, B.padLength = 64, B.prototype._digest = function(P) {
    return P === "hex" ? A.toHex32(this.h.slice(0, 7), "big") : A.split32(this.h.slice(0, 7), "big");
  }, _224;
}
var _512, hasRequired_512;
function require_512() {
  if (hasRequired_512)
    return _512;
  hasRequired_512 = 1;
  var A = requireUtils(), _ = requireCommon$1(), B = requireMinimalisticAssert(), M = A.rotr64_hi, P = A.rotr64_lo, r = A.shr64_hi, S = A.shr64_lo, d = A.sum64, x = A.sum64_hi, m = A.sum64_lo, f = A.sum64_4_hi, y = A.sum64_4_lo, q = A.sum64_5_hi, R = A.sum64_5_lo, I = _.BlockHash, k = [
    1116352408,
    3609767458,
    1899447441,
    602891725,
    3049323471,
    3964484399,
    3921009573,
    2173295548,
    961987163,
    4081628472,
    1508970993,
    3053834265,
    2453635748,
    2937671579,
    2870763221,
    3664609560,
    3624381080,
    2734883394,
    310598401,
    1164996542,
    607225278,
    1323610764,
    1426881987,
    3590304994,
    1925078388,
    4068182383,
    2162078206,
    991336113,
    2614888103,
    633803317,
    3248222580,
    3479774868,
    3835390401,
    2666613458,
    4022224774,
    944711139,
    264347078,
    2341262773,
    604807628,
    2007800933,
    770255983,
    1495990901,
    1249150122,
    1856431235,
    1555081692,
    3175218132,
    1996064986,
    2198950837,
    2554220882,
    3999719339,
    2821834349,
    766784016,
    2952996808,
    2566594879,
    3210313671,
    3203337956,
    3336571891,
    1034457026,
    3584528711,
    2466948901,
    113926993,
    3758326383,
    338241895,
    168717936,
    666307205,
    1188179964,
    773529912,
    1546045734,
    1294757372,
    1522805485,
    1396182291,
    2643833823,
    1695183700,
    2343527390,
    1986661051,
    1014477480,
    2177026350,
    1206759142,
    2456956037,
    344077627,
    2730485921,
    1290863460,
    2820302411,
    3158454273,
    3259730800,
    3505952657,
    3345764771,
    106217008,
    3516065817,
    3606008344,
    3600352804,
    1432725776,
    4094571909,
    1467031594,
    275423344,
    851169720,
    430227734,
    3100823752,
    506948616,
    1363258195,
    659060556,
    3750685593,
    883997877,
    3785050280,
    958139571,
    3318307427,
    1322822218,
    3812723403,
    1537002063,
    2003034995,
    1747873779,
    3602036899,
    1955562222,
    1575990012,
    2024104815,
    1125592928,
    2227730452,
    2716904306,
    2361852424,
    442776044,
    2428436474,
    593698344,
    2756734187,
    3733110249,
    3204031479,
    2999351573,
    3329325298,
    3815920427,
    3391569614,
    3928383900,
    3515267271,
    566280711,
    3940187606,
    3454069534,
    4118630271,
    4000239992,
    116418474,
    1914138554,
    174292421,
    2731055270,
    289380356,
    3203993006,
    460393269,
    320620315,
    685471733,
    587496836,
    852142971,
    1086792851,
    1017036298,
    365543100,
    1126000580,
    2618297676,
    1288033470,
    3409855158,
    1501505948,
    4234509866,
    1607167915,
    987167468,
    1816402316,
    1246189591
  ];
  function $() {
    if (!(this instanceof $))
      return new $();
    I.call(this), this.h = [
      1779033703,
      4089235720,
      3144134277,
      2227873595,
      1013904242,
      4271175723,
      2773480762,
      1595750129,
      1359893119,
      2917565137,
      2600822924,
      725511199,
      528734635,
      4215389547,
      1541459225,
      327033209
    ], this.k = k, this.W = new Array(160);
  }
  A.inherits($, I), _512 = $, $.blockSize = 1024, $.outSize = 512, $.hmacStrength = 192, $.padLength = 128, $.prototype._prepareBlock = function(e, t) {
    for (var v = this.W, g = 0; g < 32; g++)
      v[g] = e[t + g];
    for (; g < v.length; g += 2) {
      var h = U(v[g - 4], v[g - 3]), b = E(v[g - 4], v[g - 3]), p = v[g - 14], w = v[g - 13], a = ee(v[g - 30], v[g - 29]), T = ue(v[g - 30], v[g - 29]), V = v[g - 32], Y = v[g - 31];
      v[g] = f(
        h,
        b,
        p,
        w,
        a,
        T,
        V,
        Y
      ), v[g + 1] = y(
        h,
        b,
        p,
        w,
        a,
        T,
        V,
        Y
      );
    }
  }, $.prototype._update = function(e, t) {
    this._prepareBlock(e, t);
    var v = this.W, g = this.h[0], h = this.h[1], b = this.h[2], p = this.h[3], w = this.h[4], a = this.h[5], T = this.h[6], V = this.h[7], Y = this.h[8], z = this.h[9], D = this.h[10], N = this.h[11], Q = this.h[12], te = this.h[13], G = this.h[14], W = this.h[15];
    B(this.k.length === v.length);
    for (var ae = 0; ae < v.length; ae += 2) {
      var se = G, he = W, Z = ie(Y, z), O = ne(Y, z), F = C(Y, z, D, N, Q), K = L(Y, z, D, N, Q, te), re = this.k[ae], fe = this.k[ae + 1], oe = v[ae], le = v[ae + 1], ce = q(
        se,
        he,
        Z,
        O,
        F,
        K,
        re,
        fe,
        oe,
        le
      ), ve = R(
        se,
        he,
        Z,
        O,
        F,
        K,
        re,
        fe,
        oe,
        le
      );
      se = J(g, h), he = X(g, h), Z = H(g, h, b, p, w), O = j(g, h, b, p, w, a);
      var pe = x(se, he, Z, O), de = m(se, he, Z, O);
      G = Q, W = te, Q = D, te = N, D = Y, N = z, Y = x(T, V, ce, ve), z = m(V, V, ce, ve), T = w, V = a, w = b, a = p, b = g, p = h, g = x(ce, ve, pe, de), h = m(ce, ve, pe, de);
    }
    d(this.h, 0, g, h), d(this.h, 2, b, p), d(this.h, 4, w, a), d(this.h, 6, T, V), d(this.h, 8, Y, z), d(this.h, 10, D, N), d(this.h, 12, Q, te), d(this.h, 14, G, W);
  }, $.prototype._digest = function(e) {
    return e === "hex" ? A.toHex32(this.h, "big") : A.split32(this.h, "big");
  };
  function C(o, e, t, v, g) {
    var h = o & t ^ ~o & g;
    return h < 0 && (h += 4294967296), h;
  }
  function L(o, e, t, v, g, h) {
    var b = e & v ^ ~e & h;
    return b < 0 && (b += 4294967296), b;
  }
  function H(o, e, t, v, g) {
    var h = o & t ^ o & g ^ t & g;
    return h < 0 && (h += 4294967296), h;
  }
  function j(o, e, t, v, g, h) {
    var b = e & v ^ e & h ^ v & h;
    return b < 0 && (b += 4294967296), b;
  }
  function J(o, e) {
    var t = M(o, e, 28), v = M(e, o, 2), g = M(e, o, 7), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  function X(o, e) {
    var t = P(o, e, 28), v = P(e, o, 2), g = P(e, o, 7), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  function ie(o, e) {
    var t = M(o, e, 14), v = M(o, e, 18), g = M(e, o, 9), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  function ne(o, e) {
    var t = P(o, e, 14), v = P(o, e, 18), g = P(e, o, 9), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  function ee(o, e) {
    var t = M(o, e, 1), v = M(o, e, 8), g = r(o, e, 7), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  function ue(o, e) {
    var t = P(o, e, 1), v = P(o, e, 8), g = S(o, e, 7), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  function U(o, e) {
    var t = M(o, e, 19), v = M(e, o, 29), g = r(o, e, 6), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  function E(o, e) {
    var t = P(o, e, 19), v = P(e, o, 29), g = S(o, e, 6), h = t ^ v ^ g;
    return h < 0 && (h += 4294967296), h;
  }
  return _512;
}
var _384, hasRequired_384;
function require_384() {
  if (hasRequired_384)
    return _384;
  hasRequired_384 = 1;
  var A = requireUtils(), _ = require_512();
  function B() {
    if (!(this instanceof B))
      return new B();
    _.call(this), this.h = [
      3418070365,
      3238371032,
      1654270250,
      914150663,
      2438529370,
      812702999,
      355462360,
      4144912697,
      1731405415,
      4290775857,
      2394180231,
      1750603025,
      3675008525,
      1694076839,
      1203062813,
      3204075428
    ];
  }
  return A.inherits(B, _), _384 = B, B.blockSize = 1024, B.outSize = 384, B.hmacStrength = 192, B.padLength = 128, B.prototype._digest = function(P) {
    return P === "hex" ? A.toHex32(this.h.slice(0, 12), "big") : A.split32(this.h.slice(0, 12), "big");
  }, _384;
}
var hasRequiredSha;
function requireSha() {
  return hasRequiredSha || (hasRequiredSha = 1, sha.sha1 = require_1(), sha.sha224 = require_224(), sha.sha256 = require_256(), sha.sha384 = require_384(), sha.sha512 = require_512()), sha;
}
var ripemd = {}, hasRequiredRipemd;
function requireRipemd() {
  if (hasRequiredRipemd)
    return ripemd;
  hasRequiredRipemd = 1;
  var A = requireUtils(), _ = requireCommon$1(), B = A.rotl32, M = A.sum32, P = A.sum32_3, r = A.sum32_4, S = _.BlockHash;
  function d() {
    if (!(this instanceof d))
      return new d();
    S.call(this), this.h = [1732584193, 4023233417, 2562383102, 271733878, 3285377520], this.endian = "little";
  }
  A.inherits(d, S), ripemd.ripemd160 = d, d.blockSize = 512, d.outSize = 160, d.hmacStrength = 192, d.padLength = 64, d.prototype._update = function($, C) {
    for (var L = this.h[0], H = this.h[1], j = this.h[2], J = this.h[3], X = this.h[4], ie = L, ne = H, ee = j, ue = J, U = X, E = 0; E < 80; E++) {
      var o = M(
        B(
          r(L, x(E, H, j, J), $[y[E] + C], m(E)),
          R[E]
        ),
        X
      );
      L = X, X = J, J = B(j, 10), j = H, H = o, o = M(
        B(
          r(ie, x(79 - E, ne, ee, ue), $[q[E] + C], f(E)),
          I[E]
        ),
        U
      ), ie = U, U = ue, ue = B(ee, 10), ee = ne, ne = o;
    }
    o = P(this.h[1], j, ue), this.h[1] = P(this.h[2], J, U), this.h[2] = P(this.h[3], X, ie), this.h[3] = P(this.h[4], L, ne), this.h[4] = P(this.h[0], H, ee), this.h[0] = o;
  }, d.prototype._digest = function($) {
    return $ === "hex" ? A.toHex32(this.h, "little") : A.split32(this.h, "little");
  };
  function x(k, $, C, L) {
    return k <= 15 ? $ ^ C ^ L : k <= 31 ? $ & C | ~$ & L : k <= 47 ? ($ | ~C) ^ L : k <= 63 ? $ & L | C & ~L : $ ^ (C | ~L);
  }
  function m(k) {
    return k <= 15 ? 0 : k <= 31 ? 1518500249 : k <= 47 ? 1859775393 : k <= 63 ? 2400959708 : 2840853838;
  }
  function f(k) {
    return k <= 15 ? 1352829926 : k <= 31 ? 1548603684 : k <= 47 ? 1836072691 : k <= 63 ? 2053994217 : 0;
  }
  var y = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ], q = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ], R = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ], I = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ];
  return ripemd;
}
var hmac, hasRequiredHmac;
function requireHmac() {
  if (hasRequiredHmac)
    return hmac;
  hasRequiredHmac = 1;
  var A = requireUtils(), _ = requireMinimalisticAssert();
  function B(M, P, r) {
    if (!(this instanceof B))
      return new B(M, P, r);
    this.Hash = M, this.blockSize = M.blockSize / 8, this.outSize = M.outSize / 8, this.inner = null, this.outer = null, this._init(A.toArray(P, r));
  }
  return hmac = B, B.prototype._init = function(P) {
    P.length > this.blockSize && (P = new this.Hash().update(P).digest()), _(P.length <= this.blockSize);
    for (var r = P.length; r < this.blockSize; r++)
      P.push(0);
    for (r = 0; r < P.length; r++)
      P[r] ^= 54;
    for (this.inner = new this.Hash().update(P), r = 0; r < P.length; r++)
      P[r] ^= 106;
    this.outer = new this.Hash().update(P);
  }, B.prototype.update = function(P, r) {
    return this.inner.update(P, r), this;
  }, B.prototype.digest = function(P) {
    return this.outer.update(this.inner.digest()), this.outer.digest(P);
  }, hmac;
}
var hasRequiredHash;
function requireHash() {
  return hasRequiredHash || (hasRequiredHash = 1, function(A) {
    var _ = A;
    _.utils = requireUtils(), _.common = requireCommon$1(), _.sha = requireSha(), _.ripemd = requireRipemd(), _.hmac = requireHmac(), _.sha1 = _.sha.sha1, _.sha256 = _.sha.sha256, _.sha224 = _.sha.sha224, _.sha384 = _.sha.sha384, _.sha512 = _.sha.sha512, _.ripemd160 = _.ripemd.ripemd160;
  }(hash)), hash;
}
var secp256k1, hasRequiredSecp256k1;
function requireSecp256k1() {
  return hasRequiredSecp256k1 || (hasRequiredSecp256k1 = 1, secp256k1 = {
    doubles: {
      step: 4,
      points: [
        [
          "e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a",
          "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"
        ],
        [
          "8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508",
          "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"
        ],
        [
          "175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739",
          "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"
        ],
        [
          "363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640",
          "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"
        ],
        [
          "8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c",
          "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"
        ],
        [
          "723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda",
          "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"
        ],
        [
          "eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa",
          "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"
        ],
        [
          "100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0",
          "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"
        ],
        [
          "e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d",
          "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"
        ],
        [
          "feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d",
          "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"
        ],
        [
          "da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1",
          "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"
        ],
        [
          "53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0",
          "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"
        ],
        [
          "8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047",
          "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"
        ],
        [
          "385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862",
          "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"
        ],
        [
          "6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7",
          "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"
        ],
        [
          "3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd",
          "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"
        ],
        [
          "85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83",
          "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"
        ],
        [
          "948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a",
          "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"
        ],
        [
          "6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8",
          "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"
        ],
        [
          "e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d",
          "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"
        ],
        [
          "e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725",
          "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"
        ],
        [
          "213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754",
          "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"
        ],
        [
          "4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c",
          "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"
        ],
        [
          "fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6",
          "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"
        ],
        [
          "76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39",
          "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"
        ],
        [
          "c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891",
          "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"
        ],
        [
          "d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b",
          "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"
        ],
        [
          "b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03",
          "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"
        ],
        [
          "e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d",
          "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"
        ],
        [
          "a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070",
          "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"
        ],
        [
          "90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4",
          "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"
        ],
        [
          "8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da",
          "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"
        ],
        [
          "e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11",
          "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"
        ],
        [
          "8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e",
          "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"
        ],
        [
          "e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41",
          "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"
        ],
        [
          "b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef",
          "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"
        ],
        [
          "d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8",
          "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"
        ],
        [
          "324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d",
          "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"
        ],
        [
          "4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96",
          "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"
        ],
        [
          "9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd",
          "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"
        ],
        [
          "6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5",
          "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"
        ],
        [
          "a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266",
          "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"
        ],
        [
          "7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71",
          "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"
        ],
        [
          "928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac",
          "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"
        ],
        [
          "85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751",
          "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"
        ],
        [
          "ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e",
          "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"
        ],
        [
          "827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241",
          "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"
        ],
        [
          "eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3",
          "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"
        ],
        [
          "e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f",
          "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"
        ],
        [
          "1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19",
          "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"
        ],
        [
          "146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be",
          "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"
        ],
        [
          "fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9",
          "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"
        ],
        [
          "da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2",
          "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"
        ],
        [
          "a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13",
          "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"
        ],
        [
          "174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c",
          "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"
        ],
        [
          "959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba",
          "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"
        ],
        [
          "d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151",
          "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"
        ],
        [
          "64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073",
          "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"
        ],
        [
          "8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458",
          "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"
        ],
        [
          "13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b",
          "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"
        ],
        [
          "bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366",
          "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"
        ],
        [
          "8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa",
          "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"
        ],
        [
          "8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0",
          "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"
        ],
        [
          "dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787",
          "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"
        ],
        [
          "f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e",
          "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"
        ]
      ]
    },
    naf: {
      wnd: 7,
      points: [
        [
          "f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
          "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"
        ],
        [
          "2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4",
          "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"
        ],
        [
          "5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc",
          "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"
        ],
        [
          "acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe",
          "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"
        ],
        [
          "774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb",
          "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"
        ],
        [
          "f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
          "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"
        ],
        [
          "d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e",
          "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"
        ],
        [
          "defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34",
          "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"
        ],
        [
          "2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c",
          "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"
        ],
        [
          "352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5",
          "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"
        ],
        [
          "2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f",
          "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"
        ],
        [
          "9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714",
          "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"
        ],
        [
          "daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729",
          "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"
        ],
        [
          "c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db",
          "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"
        ],
        [
          "6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4",
          "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"
        ],
        [
          "1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5",
          "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"
        ],
        [
          "605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479",
          "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"
        ],
        [
          "62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d",
          "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"
        ],
        [
          "80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f",
          "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"
        ],
        [
          "7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb",
          "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"
        ],
        [
          "d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9",
          "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"
        ],
        [
          "49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963",
          "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"
        ],
        [
          "77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74",
          "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"
        ],
        [
          "f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530",
          "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"
        ],
        [
          "463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b",
          "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"
        ],
        [
          "f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247",
          "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"
        ],
        [
          "caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1",
          "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"
        ],
        [
          "2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120",
          "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"
        ],
        [
          "7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435",
          "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"
        ],
        [
          "754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18",
          "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"
        ],
        [
          "e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8",
          "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"
        ],
        [
          "186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb",
          "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"
        ],
        [
          "df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f",
          "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"
        ],
        [
          "5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143",
          "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"
        ],
        [
          "290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba",
          "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"
        ],
        [
          "af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45",
          "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"
        ],
        [
          "766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a",
          "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"
        ],
        [
          "59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e",
          "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"
        ],
        [
          "f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8",
          "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"
        ],
        [
          "7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c",
          "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"
        ],
        [
          "948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519",
          "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"
        ],
        [
          "7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab",
          "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"
        ],
        [
          "3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca",
          "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"
        ],
        [
          "d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf",
          "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"
        ],
        [
          "1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610",
          "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"
        ],
        [
          "733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4",
          "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"
        ],
        [
          "15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c",
          "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"
        ],
        [
          "a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940",
          "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"
        ],
        [
          "e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980",
          "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"
        ],
        [
          "311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3",
          "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"
        ],
        [
          "34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf",
          "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"
        ],
        [
          "f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63",
          "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"
        ],
        [
          "d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448",
          "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"
        ],
        [
          "32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf",
          "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"
        ],
        [
          "7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5",
          "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"
        ],
        [
          "ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6",
          "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"
        ],
        [
          "16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5",
          "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"
        ],
        [
          "eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99",
          "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"
        ],
        [
          "78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51",
          "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"
        ],
        [
          "494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5",
          "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"
        ],
        [
          "a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5",
          "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"
        ],
        [
          "c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997",
          "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"
        ],
        [
          "841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881",
          "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"
        ],
        [
          "5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5",
          "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"
        ],
        [
          "36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66",
          "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"
        ],
        [
          "336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726",
          "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"
        ],
        [
          "8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede",
          "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"
        ],
        [
          "1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94",
          "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"
        ],
        [
          "85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31",
          "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"
        ],
        [
          "29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51",
          "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"
        ],
        [
          "a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252",
          "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"
        ],
        [
          "4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5",
          "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"
        ],
        [
          "d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b",
          "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"
        ],
        [
          "ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4",
          "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"
        ],
        [
          "af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f",
          "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"
        ],
        [
          "e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889",
          "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"
        ],
        [
          "591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246",
          "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"
        ],
        [
          "11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984",
          "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"
        ],
        [
          "3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a",
          "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"
        ],
        [
          "cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030",
          "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"
        ],
        [
          "c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197",
          "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"
        ],
        [
          "c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593",
          "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"
        ],
        [
          "a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef",
          "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"
        ],
        [
          "347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38",
          "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"
        ],
        [
          "da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a",
          "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"
        ],
        [
          "c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111",
          "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"
        ],
        [
          "4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502",
          "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"
        ],
        [
          "3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea",
          "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"
        ],
        [
          "cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26",
          "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"
        ],
        [
          "b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986",
          "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"
        ],
        [
          "d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e",
          "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"
        ],
        [
          "48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4",
          "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"
        ],
        [
          "dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda",
          "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"
        ],
        [
          "6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859",
          "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"
        ],
        [
          "e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f",
          "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"
        ],
        [
          "eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c",
          "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"
        ],
        [
          "13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942",
          "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"
        ],
        [
          "ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a",
          "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"
        ],
        [
          "b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80",
          "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"
        ],
        [
          "ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d",
          "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"
        ],
        [
          "8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1",
          "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"
        ],
        [
          "52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63",
          "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"
        ],
        [
          "e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352",
          "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"
        ],
        [
          "7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193",
          "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"
        ],
        [
          "5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00",
          "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"
        ],
        [
          "32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58",
          "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"
        ],
        [
          "e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7",
          "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"
        ],
        [
          "8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8",
          "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"
        ],
        [
          "4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e",
          "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"
        ],
        [
          "3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d",
          "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"
        ],
        [
          "674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b",
          "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"
        ],
        [
          "d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f",
          "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"
        ],
        [
          "30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6",
          "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"
        ],
        [
          "be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297",
          "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"
        ],
        [
          "93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a",
          "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"
        ],
        [
          "b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c",
          "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"
        ],
        [
          "d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52",
          "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"
        ],
        [
          "d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb",
          "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"
        ],
        [
          "463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065",
          "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"
        ],
        [
          "7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917",
          "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"
        ],
        [
          "74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9",
          "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"
        ],
        [
          "30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3",
          "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"
        ],
        [
          "9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57",
          "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"
        ],
        [
          "176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66",
          "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"
        ],
        [
          "75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8",
          "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"
        ],
        [
          "809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721",
          "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"
        ],
        [
          "1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180",
          "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"
        ]
      ]
    }
  }), secp256k1;
}
var hasRequiredCurves;
function requireCurves() {
  return hasRequiredCurves || (hasRequiredCurves = 1, function(A) {
    var _ = A, B = requireHash(), M = requireCurve(), P = requireUtils$1(), r = P.assert;
    function S(m) {
      m.type === "short" ? this.curve = new M.short(m) : m.type === "edwards" ? this.curve = new M.edwards(m) : this.curve = new M.mont(m), this.g = this.curve.g, this.n = this.curve.n, this.hash = m.hash, r(this.g.validate(), "Invalid curve"), r(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
    }
    _.PresetCurve = S;
    function d(m, f) {
      Object.defineProperty(_, m, {
        configurable: !0,
        enumerable: !0,
        get: function() {
          var y = new S(f);
          return Object.defineProperty(_, m, {
            configurable: !0,
            enumerable: !0,
            value: y
          }), y;
        }
      });
    }
    d("p192", {
      type: "short",
      prime: "p192",
      p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
      b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
      n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
      hash: B.sha256,
      gRed: !1,
      g: [
        "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
        "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"
      ]
    }), d("p224", {
      type: "short",
      prime: "p224",
      p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
      a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
      b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
      n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
      hash: B.sha256,
      gRed: !1,
      g: [
        "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
        "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"
      ]
    }), d("p256", {
      type: "short",
      prime: null,
      p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
      a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
      b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
      n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
      hash: B.sha256,
      gRed: !1,
      g: [
        "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
        "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"
      ]
    }), d("p384", {
      type: "short",
      prime: null,
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
      a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
      b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
      n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
      hash: B.sha384,
      gRed: !1,
      g: [
        "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
        "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"
      ]
    }), d("p521", {
      type: "short",
      prime: null,
      p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
      a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
      b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
      n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
      hash: B.sha512,
      gRed: !1,
      g: [
        "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
        "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"
      ]
    }), d("curve25519", {
      type: "mont",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "76d06",
      b: "1",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: B.sha256,
      gRed: !1,
      g: [
        "9"
      ]
    }), d("ed25519", {
      type: "edwards",
      prime: "p25519",
      p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
      a: "-1",
      c: "1",
      // -121665 * (121666^(-1)) (mod P)
      d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
      n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
      hash: B.sha256,
      gRed: !1,
      g: [
        "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
        // 4/5
        "6666666666666666666666666666666666666666666666666666666666666658"
      ]
    });
    var x;
    try {
      x = requireSecp256k1();
    } catch {
      x = void 0;
    }
    d("secp256k1", {
      type: "short",
      prime: "k256",
      p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
      a: "0",
      b: "7",
      n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
      h: "1",
      hash: B.sha256,
      // Precomputed endomorphism
      beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
      lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
      basis: [
        {
          a: "3086d221a7d46bcde86c90e49284eb15",
          b: "-e4437ed6010e88286f547fa90abfe4c3"
        },
        {
          a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
          b: "3086d221a7d46bcde86c90e49284eb15"
        }
      ],
      gRed: !1,
      g: [
        "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
        "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
        x
      ]
    });
  }(curves)), curves;
}
var hmacDrbg, hasRequiredHmacDrbg;
function requireHmacDrbg() {
  if (hasRequiredHmacDrbg)
    return hmacDrbg;
  hasRequiredHmacDrbg = 1;
  var A = requireHash(), _ = requireUtils$2(), B = requireMinimalisticAssert();
  function M(P) {
    if (!(this instanceof M))
      return new M(P);
    this.hash = P.hash, this.predResist = !!P.predResist, this.outLen = this.hash.outSize, this.minEntropy = P.minEntropy || this.hash.hmacStrength, this._reseed = null, this.reseedInterval = null, this.K = null, this.V = null;
    var r = _.toArray(P.entropy, P.entropyEnc || "hex"), S = _.toArray(P.nonce, P.nonceEnc || "hex"), d = _.toArray(P.pers, P.persEnc || "hex");
    B(
      r.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._init(r, S, d);
  }
  return hmacDrbg = M, M.prototype._init = function(r, S, d) {
    var x = r.concat(S).concat(d);
    this.K = new Array(this.outLen / 8), this.V = new Array(this.outLen / 8);
    for (var m = 0; m < this.V.length; m++)
      this.K[m] = 0, this.V[m] = 1;
    this._update(x), this._reseed = 1, this.reseedInterval = 281474976710656;
  }, M.prototype._hmac = function() {
    return new A.hmac(this.hash, this.K);
  }, M.prototype._update = function(r) {
    var S = this._hmac().update(this.V).update([0]);
    r && (S = S.update(r)), this.K = S.digest(), this.V = this._hmac().update(this.V).digest(), r && (this.K = this._hmac().update(this.V).update([1]).update(r).digest(), this.V = this._hmac().update(this.V).digest());
  }, M.prototype.reseed = function(r, S, d, x) {
    typeof S != "string" && (x = d, d = S, S = null), r = _.toArray(r, S), d = _.toArray(d, x), B(
      r.length >= this.minEntropy / 8,
      "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
    ), this._update(r.concat(d || [])), this._reseed = 1;
  }, M.prototype.generate = function(r, S, d, x) {
    if (this._reseed > this.reseedInterval)
      throw new Error("Reseed is required");
    typeof S != "string" && (x = d, d = S, S = null), d && (d = _.toArray(d, x || "hex"), this._update(d));
    for (var m = []; m.length < r; )
      this.V = this._hmac().update(this.V).digest(), m = m.concat(this.V);
    var f = m.slice(0, r);
    return this._update(d), this._reseed++, _.encode(f, S);
  }, hmacDrbg;
}
var key$1, hasRequiredKey$1;
function requireKey$1() {
  if (hasRequiredKey$1)
    return key$1;
  hasRequiredKey$1 = 1;
  var A = requireBn$2(), _ = requireUtils$1(), B = _.assert;
  function M(P, r) {
    this.ec = P, this.priv = null, this.pub = null, r.priv && this._importPrivate(r.priv, r.privEnc), r.pub && this._importPublic(r.pub, r.pubEnc);
  }
  return key$1 = M, M.fromPublic = function(r, S, d) {
    return S instanceof M ? S : new M(r, {
      pub: S,
      pubEnc: d
    });
  }, M.fromPrivate = function(r, S, d) {
    return S instanceof M ? S : new M(r, {
      priv: S,
      privEnc: d
    });
  }, M.prototype.validate = function() {
    var r = this.getPublic();
    return r.isInfinity() ? { result: !1, reason: "Invalid public key" } : r.validate() ? r.mul(this.ec.curve.n).isInfinity() ? { result: !0, reason: null } : { result: !1, reason: "Public key * N != O" } : { result: !1, reason: "Public key is not a point" };
  }, M.prototype.getPublic = function(r, S) {
    return typeof r == "string" && (S = r, r = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), S ? this.pub.encode(S, r) : this.pub;
  }, M.prototype.getPrivate = function(r) {
    return r === "hex" ? this.priv.toString(16, 2) : this.priv;
  }, M.prototype._importPrivate = function(r, S) {
    this.priv = new A(r, S || 16), this.priv = this.priv.umod(this.ec.curve.n);
  }, M.prototype._importPublic = function(r, S) {
    if (r.x || r.y) {
      this.ec.curve.type === "mont" ? B(r.x, "Need x coordinate") : (this.ec.curve.type === "short" || this.ec.curve.type === "edwards") && B(r.x && r.y, "Need both x and y coordinate"), this.pub = this.ec.curve.point(r.x, r.y);
      return;
    }
    this.pub = this.ec.curve.decodePoint(r, S);
  }, M.prototype.derive = function(r) {
    return r.validate() || B(r.validate(), "public point not validated"), r.mul(this.priv).getX();
  }, M.prototype.sign = function(r, S, d) {
    return this.ec.sign(r, this, S, d);
  }, M.prototype.verify = function(r, S) {
    return this.ec.verify(r, S, this);
  }, M.prototype.inspect = function() {
    return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >";
  }, key$1;
}
var signature$1, hasRequiredSignature$1;
function requireSignature$1() {
  if (hasRequiredSignature$1)
    return signature$1;
  hasRequiredSignature$1 = 1;
  var A = requireBn$2(), _ = requireUtils$1(), B = _.assert;
  function M(x, m) {
    if (x instanceof M)
      return x;
    this._importDER(x, m) || (B(x.r && x.s, "Signature without r or s"), this.r = new A(x.r, 16), this.s = new A(x.s, 16), x.recoveryParam === void 0 ? this.recoveryParam = null : this.recoveryParam = x.recoveryParam);
  }
  signature$1 = M;
  function P() {
    this.place = 0;
  }
  function r(x, m) {
    var f = x[m.place++];
    if (!(f & 128))
      return f;
    var y = f & 15;
    if (y === 0 || y > 4)
      return !1;
    for (var q = 0, R = 0, I = m.place; R < y; R++, I++)
      q <<= 8, q |= x[I], q >>>= 0;
    return q <= 127 ? !1 : (m.place = I, q);
  }
  function S(x) {
    for (var m = 0, f = x.length - 1; !x[m] && !(x[m + 1] & 128) && m < f; )
      m++;
    return m === 0 ? x : x.slice(m);
  }
  M.prototype._importDER = function(m, f) {
    m = _.toArray(m, f);
    var y = new P();
    if (m[y.place++] !== 48)
      return !1;
    var q = r(m, y);
    if (q === !1 || q + y.place !== m.length || m[y.place++] !== 2)
      return !1;
    var R = r(m, y);
    if (R === !1)
      return !1;
    var I = m.slice(y.place, R + y.place);
    if (y.place += R, m[y.place++] !== 2)
      return !1;
    var k = r(m, y);
    if (k === !1 || m.length !== k + y.place)
      return !1;
    var $ = m.slice(y.place, k + y.place);
    if (I[0] === 0)
      if (I[1] & 128)
        I = I.slice(1);
      else
        return !1;
    if ($[0] === 0)
      if ($[1] & 128)
        $ = $.slice(1);
      else
        return !1;
    return this.r = new A(I), this.s = new A($), this.recoveryParam = null, !0;
  };
  function d(x, m) {
    if (m < 128) {
      x.push(m);
      return;
    }
    var f = 1 + (Math.log(m) / Math.LN2 >>> 3);
    for (x.push(f | 128); --f; )
      x.push(m >>> (f << 3) & 255);
    x.push(m);
  }
  return M.prototype.toDER = function(m) {
    var f = this.r.toArray(), y = this.s.toArray();
    for (f[0] & 128 && (f = [0].concat(f)), y[0] & 128 && (y = [0].concat(y)), f = S(f), y = S(y); !y[0] && !(y[1] & 128); )
      y = y.slice(1);
    var q = [2];
    d(q, f.length), q = q.concat(f), q.push(2), d(q, y.length);
    var R = q.concat(y), I = [48];
    return d(I, R.length), I = I.concat(R), _.encode(I, m);
  }, signature$1;
}
var ec, hasRequiredEc;
function requireEc() {
  if (hasRequiredEc)
    return ec;
  hasRequiredEc = 1;
  var A = requireBn$2(), _ = requireHmacDrbg(), B = requireUtils$1(), M = requireCurves(), P = requireBrorand(), r = B.assert, S = requireKey$1(), d = requireSignature$1();
  function x(m) {
    if (!(this instanceof x))
      return new x(m);
    typeof m == "string" && (r(
      Object.prototype.hasOwnProperty.call(M, m),
      "Unknown curve " + m
    ), m = M[m]), m instanceof M.PresetCurve && (m = { curve: m }), this.curve = m.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = m.curve.g, this.g.precompute(m.curve.n.bitLength() + 1), this.hash = m.hash || m.curve.hash;
  }
  return ec = x, x.prototype.keyPair = function(f) {
    return new S(this, f);
  }, x.prototype.keyFromPrivate = function(f, y) {
    return S.fromPrivate(this, f, y);
  }, x.prototype.keyFromPublic = function(f, y) {
    return S.fromPublic(this, f, y);
  }, x.prototype.genKeyPair = function(f) {
    f || (f = {});
    for (var y = new _({
      hash: this.hash,
      pers: f.pers,
      persEnc: f.persEnc || "utf8",
      entropy: f.entropy || P(this.hash.hmacStrength),
      entropyEnc: f.entropy && f.entropyEnc || "utf8",
      nonce: this.n.toArray()
    }), q = this.n.byteLength(), R = this.n.sub(new A(2)); ; ) {
      var I = new A(y.generate(q));
      if (!(I.cmp(R) > 0))
        return I.iaddn(1), this.keyFromPrivate(I);
    }
  }, x.prototype._truncateToN = function(f, y) {
    var q = f.byteLength() * 8 - this.n.bitLength();
    return q > 0 && (f = f.ushrn(q)), !y && f.cmp(this.n) >= 0 ? f.sub(this.n) : f;
  }, x.prototype.sign = function(f, y, q, R) {
    typeof q == "object" && (R = q, q = null), R || (R = {}), y = this.keyFromPrivate(y, q), f = this._truncateToN(new A(f, 16));
    for (var I = this.n.byteLength(), k = y.getPrivate().toArray("be", I), $ = f.toArray("be", I), C = new _({
      hash: this.hash,
      entropy: k,
      nonce: $,
      pers: R.pers,
      persEnc: R.persEnc || "utf8"
    }), L = this.n.sub(new A(1)), H = 0; ; H++) {
      var j = R.k ? R.k(H) : new A(C.generate(this.n.byteLength()));
      if (j = this._truncateToN(j, !0), !(j.cmpn(1) <= 0 || j.cmp(L) >= 0)) {
        var J = this.g.mul(j);
        if (!J.isInfinity()) {
          var X = J.getX(), ie = X.umod(this.n);
          if (ie.cmpn(0) !== 0) {
            var ne = j.invm(this.n).mul(ie.mul(y.getPrivate()).iadd(f));
            if (ne = ne.umod(this.n), ne.cmpn(0) !== 0) {
              var ee = (J.getY().isOdd() ? 1 : 0) | (X.cmp(ie) !== 0 ? 2 : 0);
              return R.canonical && ne.cmp(this.nh) > 0 && (ne = this.n.sub(ne), ee ^= 1), new d({ r: ie, s: ne, recoveryParam: ee });
            }
          }
        }
      }
    }
  }, x.prototype.verify = function(f, y, q, R) {
    f = this._truncateToN(new A(f, 16)), q = this.keyFromPublic(q, R), y = new d(y, "hex");
    var I = y.r, k = y.s;
    if (I.cmpn(1) < 0 || I.cmp(this.n) >= 0 || k.cmpn(1) < 0 || k.cmp(this.n) >= 0)
      return !1;
    var $ = k.invm(this.n), C = $.mul(f).umod(this.n), L = $.mul(I).umod(this.n), H;
    return this.curve._maxwellTrick ? (H = this.g.jmulAdd(C, q.getPublic(), L), H.isInfinity() ? !1 : H.eqXToP(I)) : (H = this.g.mulAdd(C, q.getPublic(), L), H.isInfinity() ? !1 : H.getX().umod(this.n).cmp(I) === 0);
  }, x.prototype.recoverPubKey = function(m, f, y, q) {
    r((3 & y) === y, "The recovery param is more than two bits"), f = new d(f, q);
    var R = this.n, I = new A(m), k = f.r, $ = f.s, C = y & 1, L = y >> 1;
    if (k.cmp(this.curve.p.umod(this.curve.n)) >= 0 && L)
      throw new Error("Unable to find sencond key candinate");
    L ? k = this.curve.pointFromX(k.add(this.curve.n), C) : k = this.curve.pointFromX(k, C);
    var H = f.r.invm(R), j = R.sub(I).mul(H).umod(R), J = $.mul(H).umod(R);
    return this.g.mulAdd(j, k, J);
  }, x.prototype.getKeyRecoveryParam = function(m, f, y, q) {
    if (f = new d(f, q), f.recoveryParam !== null)
      return f.recoveryParam;
    for (var R = 0; R < 4; R++) {
      var I;
      try {
        I = this.recoverPubKey(m, f, R);
      } catch {
        continue;
      }
      if (I.eq(y))
        return R;
    }
    throw new Error("Unable to find valid recovery factor");
  }, ec;
}
var key, hasRequiredKey;
function requireKey() {
  if (hasRequiredKey)
    return key;
  hasRequiredKey = 1;
  var A = requireUtils$1(), _ = A.assert, B = A.parseBytes, M = A.cachedProperty;
  function P(r, S) {
    this.eddsa = r, this._secret = B(S.secret), r.isPoint(S.pub) ? this._pub = S.pub : this._pubBytes = B(S.pub);
  }
  return P.fromPublic = function(S, d) {
    return d instanceof P ? d : new P(S, { pub: d });
  }, P.fromSecret = function(S, d) {
    return d instanceof P ? d : new P(S, { secret: d });
  }, P.prototype.secret = function() {
    return this._secret;
  }, M(P, "pubBytes", function() {
    return this.eddsa.encodePoint(this.pub());
  }), M(P, "pub", function() {
    return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv());
  }), M(P, "privBytes", function() {
    var S = this.eddsa, d = this.hash(), x = S.encodingLength - 1, m = d.slice(0, S.encodingLength);
    return m[0] &= 248, m[x] &= 127, m[x] |= 64, m;
  }), M(P, "priv", function() {
    return this.eddsa.decodeInt(this.privBytes());
  }), M(P, "hash", function() {
    return this.eddsa.hash().update(this.secret()).digest();
  }), M(P, "messagePrefix", function() {
    return this.hash().slice(this.eddsa.encodingLength);
  }), P.prototype.sign = function(S) {
    return _(this._secret, "KeyPair can only verify"), this.eddsa.sign(S, this);
  }, P.prototype.verify = function(S, d) {
    return this.eddsa.verify(S, d, this);
  }, P.prototype.getSecret = function(S) {
    return _(this._secret, "KeyPair is public only"), A.encode(this.secret(), S);
  }, P.prototype.getPublic = function(S) {
    return A.encode(this.pubBytes(), S);
  }, key = P, key;
}
var signature, hasRequiredSignature;
function requireSignature() {
  if (hasRequiredSignature)
    return signature;
  hasRequiredSignature = 1;
  var A = requireBn$2(), _ = requireUtils$1(), B = _.assert, M = _.cachedProperty, P = _.parseBytes;
  function r(S, d) {
    this.eddsa = S, typeof d != "object" && (d = P(d)), Array.isArray(d) && (d = {
      R: d.slice(0, S.encodingLength),
      S: d.slice(S.encodingLength)
    }), B(d.R && d.S, "Signature without R or S"), S.isPoint(d.R) && (this._R = d.R), d.S instanceof A && (this._S = d.S), this._Rencoded = Array.isArray(d.R) ? d.R : d.Rencoded, this._Sencoded = Array.isArray(d.S) ? d.S : d.Sencoded;
  }
  return M(r, "S", function() {
    return this.eddsa.decodeInt(this.Sencoded());
  }), M(r, "R", function() {
    return this.eddsa.decodePoint(this.Rencoded());
  }), M(r, "Rencoded", function() {
    return this.eddsa.encodePoint(this.R());
  }), M(r, "Sencoded", function() {
    return this.eddsa.encodeInt(this.S());
  }), r.prototype.toBytes = function() {
    return this.Rencoded().concat(this.Sencoded());
  }, r.prototype.toHex = function() {
    return _.encode(this.toBytes(), "hex").toUpperCase();
  }, signature = r, signature;
}
var eddsa, hasRequiredEddsa;
function requireEddsa() {
  if (hasRequiredEddsa)
    return eddsa;
  hasRequiredEddsa = 1;
  var A = requireHash(), _ = requireCurves(), B = requireUtils$1(), M = B.assert, P = B.parseBytes, r = requireKey(), S = requireSignature();
  function d(x) {
    if (M(x === "ed25519", "only tested with ed25519 so far"), !(this instanceof d))
      return new d(x);
    x = _[x].curve, this.curve = x, this.g = x.g, this.g.precompute(x.n.bitLength() + 1), this.pointClass = x.point().constructor, this.encodingLength = Math.ceil(x.n.bitLength() / 8), this.hash = A.sha512;
  }
  return eddsa = d, d.prototype.sign = function(m, f) {
    m = P(m);
    var y = this.keyFromSecret(f), q = this.hashInt(y.messagePrefix(), m), R = this.g.mul(q), I = this.encodePoint(R), k = this.hashInt(I, y.pubBytes(), m).mul(y.priv()), $ = q.add(k).umod(this.curve.n);
    return this.makeSignature({ R, S: $, Rencoded: I });
  }, d.prototype.verify = function(m, f, y) {
    m = P(m), f = this.makeSignature(f);
    var q = this.keyFromPublic(y), R = this.hashInt(f.Rencoded(), q.pubBytes(), m), I = this.g.mul(f.S()), k = f.R().add(q.pub().mul(R));
    return k.eq(I);
  }, d.prototype.hashInt = function() {
    for (var m = this.hash(), f = 0; f < arguments.length; f++)
      m.update(arguments[f]);
    return B.intFromLE(m.digest()).umod(this.curve.n);
  }, d.prototype.keyFromPublic = function(m) {
    return r.fromPublic(this, m);
  }, d.prototype.keyFromSecret = function(m) {
    return r.fromSecret(this, m);
  }, d.prototype.makeSignature = function(m) {
    return m instanceof S ? m : new S(this, m);
  }, d.prototype.encodePoint = function(m) {
    var f = m.getY().toArray("le", this.encodingLength);
    return f[this.encodingLength - 1] |= m.getX().isOdd() ? 128 : 0, f;
  }, d.prototype.decodePoint = function(m) {
    m = B.parseBytes(m);
    var f = m.length - 1, y = m.slice(0, f).concat(m[f] & -129), q = (m[f] & 128) !== 0, R = B.intFromLE(y);
    return this.curve.pointFromY(R, q);
  }, d.prototype.encodeInt = function(m) {
    return m.toArray("le", this.encodingLength);
  }, d.prototype.decodeInt = function(m) {
    return B.intFromLE(m);
  }, d.prototype.isPoint = function(m) {
    return m instanceof this.pointClass;
  }, eddsa;
}
var hasRequiredElliptic;
function requireElliptic() {
  return hasRequiredElliptic || (hasRequiredElliptic = 1, function(A) {
    var _ = A;
    _.version = require$$0.version, _.utils = requireUtils$1(), _.rand = requireBrorand(), _.curve = requireCurve(), _.curves = requireCurves(), _.ec = requireEc(), _.eddsa = requireEddsa();
  }(elliptic)), elliptic;
}
var bn = { exports: {} };
bn.exports;
var hasRequiredBn;
function requireBn() {
  return hasRequiredBn || (hasRequiredBn = 1, function(A) {
    (function(_, B) {
      function M(o, e) {
        if (!o)
          throw new Error(e || "Assertion failed");
      }
      function P(o, e) {
        o.super_ = e;
        var t = function() {
        };
        t.prototype = e.prototype, o.prototype = new t(), o.prototype.constructor = o;
      }
      function r(o, e, t) {
        if (r.isBN(o))
          return o;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, o !== null && ((e === "le" || e === "be") && (t = e, e = 10), this._init(o || 0, e || 10, t || "be"));
      }
      typeof _ == "object" ? _.exports = r : B.BN = r, r.BN = r, r.wordSize = 26;
      var S;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? S = window.Buffer : S = requireBuffer$1().Buffer;
      } catch {
      }
      r.isBN = function(e) {
        return e instanceof r ? !0 : e !== null && typeof e == "object" && e.constructor.wordSize === r.wordSize && Array.isArray(e.words);
      }, r.max = function(e, t) {
        return e.cmp(t) > 0 ? e : t;
      }, r.min = function(e, t) {
        return e.cmp(t) < 0 ? e : t;
      }, r.prototype._init = function(e, t, v) {
        if (typeof e == "number")
          return this._initNumber(e, t, v);
        if (typeof e == "object")
          return this._initArray(e, t, v);
        t === "hex" && (t = 16), M(t === (t | 0) && t >= 2 && t <= 36), e = e.toString().replace(/\s+/g, "");
        var g = 0;
        e[0] === "-" && (g++, this.negative = 1), g < e.length && (t === 16 ? this._parseHex(e, g, v) : (this._parseBase(e, t, g), v === "le" && this._initArray(this.toArray(), t, v)));
      }, r.prototype._initNumber = function(e, t, v) {
        e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [e & 67108863], this.length = 1) : e < 4503599627370496 ? (this.words = [
          e & 67108863,
          e / 67108864 & 67108863
        ], this.length = 2) : (M(e < 9007199254740992), this.words = [
          e & 67108863,
          e / 67108864 & 67108863,
          1
        ], this.length = 3), v === "le" && this._initArray(this.toArray(), t, v);
      }, r.prototype._initArray = function(e, t, v) {
        if (M(typeof e.length == "number"), e.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
        for (var g = 0; g < this.length; g++)
          this.words[g] = 0;
        var h, b, p = 0;
        if (v === "be")
          for (g = e.length - 1, h = 0; g >= 0; g -= 3)
            b = e[g] | e[g - 1] << 8 | e[g - 2] << 16, this.words[h] |= b << p & 67108863, this.words[h + 1] = b >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, h++);
        else if (v === "le")
          for (g = 0, h = 0; g < e.length; g += 3)
            b = e[g] | e[g + 1] << 8 | e[g + 2] << 16, this.words[h] |= b << p & 67108863, this.words[h + 1] = b >>> 26 - p & 67108863, p += 24, p >= 26 && (p -= 26, h++);
        return this._strip();
      };
      function d(o, e) {
        var t = o.charCodeAt(e);
        if (t >= 48 && t <= 57)
          return t - 48;
        if (t >= 65 && t <= 70)
          return t - 55;
        if (t >= 97 && t <= 102)
          return t - 87;
        M(!1, "Invalid character in " + o);
      }
      function x(o, e, t) {
        var v = d(o, t);
        return t - 1 >= e && (v |= d(o, t - 1) << 4), v;
      }
      r.prototype._parseHex = function(e, t, v) {
        this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length);
        for (var g = 0; g < this.length; g++)
          this.words[g] = 0;
        var h = 0, b = 0, p;
        if (v === "be")
          for (g = e.length - 1; g >= t; g -= 2)
            p = x(e, t, g) << h, this.words[b] |= p & 67108863, h >= 18 ? (h -= 18, b += 1, this.words[b] |= p >>> 26) : h += 8;
        else {
          var w = e.length - t;
          for (g = w % 2 === 0 ? t + 1 : t; g < e.length; g += 2)
            p = x(e, t, g) << h, this.words[b] |= p & 67108863, h >= 18 ? (h -= 18, b += 1, this.words[b] |= p >>> 26) : h += 8;
        }
        this._strip();
      };
      function m(o, e, t, v) {
        for (var g = 0, h = 0, b = Math.min(o.length, t), p = e; p < b; p++) {
          var w = o.charCodeAt(p) - 48;
          g *= v, w >= 49 ? h = w - 49 + 10 : w >= 17 ? h = w - 17 + 10 : h = w, M(w >= 0 && h < v, "Invalid character"), g += h;
        }
        return g;
      }
      r.prototype._parseBase = function(e, t, v) {
        this.words = [0], this.length = 1;
        for (var g = 0, h = 1; h <= 67108863; h *= t)
          g++;
        g--, h = h / t | 0;
        for (var b = e.length - v, p = b % g, w = Math.min(b, b - p) + v, a = 0, T = v; T < w; T += g)
          a = m(e, T, T + g, t), this.imuln(h), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
        if (p !== 0) {
          var V = 1;
          for (a = m(e, T, e.length, t), T = 0; T < p; T++)
            V *= t;
          this.imuln(V), this.words[0] + a < 67108864 ? this.words[0] += a : this._iaddn(a);
        }
        this._strip();
      }, r.prototype.copy = function(e) {
        e.words = new Array(this.length);
        for (var t = 0; t < this.length; t++)
          e.words[t] = this.words[t];
        e.length = this.length, e.negative = this.negative, e.red = this.red;
      };
      function f(o, e) {
        o.words = e.words, o.length = e.length, o.negative = e.negative, o.red = e.red;
      }
      if (r.prototype._move = function(e) {
        f(e, this);
      }, r.prototype.clone = function() {
        var e = new r(null);
        return this.copy(e), e;
      }, r.prototype._expand = function(e) {
        for (; this.length < e; )
          this.words[this.length++] = 0;
        return this;
      }, r.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, r.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          r.prototype[Symbol.for("nodejs.util.inspect.custom")] = y;
        } catch {
          r.prototype.inspect = y;
        }
      else
        r.prototype.inspect = y;
      function y() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var q = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], R = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], I = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      r.prototype.toString = function(e, t) {
        e = e || 10, t = t | 0 || 1;
        var v;
        if (e === 16 || e === "hex") {
          v = "";
          for (var g = 0, h = 0, b = 0; b < this.length; b++) {
            var p = this.words[b], w = ((p << g | h) & 16777215).toString(16);
            h = p >>> 24 - g & 16777215, g += 2, g >= 26 && (g -= 26, b--), h !== 0 || b !== this.length - 1 ? v = q[6 - w.length] + w + v : v = w + v;
          }
          for (h !== 0 && (v = h.toString(16) + v); v.length % t !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        if (e === (e | 0) && e >= 2 && e <= 36) {
          var a = R[e], T = I[e];
          v = "";
          var V = this.clone();
          for (V.negative = 0; !V.isZero(); ) {
            var Y = V.modrn(T).toString(e);
            V = V.idivn(T), V.isZero() ? v = Y + v : v = q[a - Y.length] + Y + v;
          }
          for (this.isZero() && (v = "0" + v); v.length % t !== 0; )
            v = "0" + v;
          return this.negative !== 0 && (v = "-" + v), v;
        }
        M(!1, "Base should be between 2 and 36");
      }, r.prototype.toNumber = function() {
        var e = this.words[0];
        return this.length === 2 ? e += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? e += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && M(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -e : e;
      }, r.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, S && (r.prototype.toBuffer = function(e, t) {
        return this.toArrayLike(S, e, t);
      }), r.prototype.toArray = function(e, t) {
        return this.toArrayLike(Array, e, t);
      };
      var k = function(e, t) {
        return e.allocUnsafe ? e.allocUnsafe(t) : new e(t);
      };
      r.prototype.toArrayLike = function(e, t, v) {
        this._strip();
        var g = this.byteLength(), h = v || Math.max(1, g);
        M(g <= h, "byte array longer than desired length"), M(h > 0, "Requested array length <= 0");
        var b = k(e, h), p = t === "le" ? "LE" : "BE";
        return this["_toArrayLike" + p](b, g), b;
      }, r.prototype._toArrayLikeLE = function(e, t) {
        for (var v = 0, g = 0, h = 0, b = 0; h < this.length; h++) {
          var p = this.words[h] << b | g;
          e[v++] = p & 255, v < e.length && (e[v++] = p >> 8 & 255), v < e.length && (e[v++] = p >> 16 & 255), b === 6 ? (v < e.length && (e[v++] = p >> 24 & 255), g = 0, b = 0) : (g = p >>> 24, b += 2);
        }
        if (v < e.length)
          for (e[v++] = g; v < e.length; )
            e[v++] = 0;
      }, r.prototype._toArrayLikeBE = function(e, t) {
        for (var v = e.length - 1, g = 0, h = 0, b = 0; h < this.length; h++) {
          var p = this.words[h] << b | g;
          e[v--] = p & 255, v >= 0 && (e[v--] = p >> 8 & 255), v >= 0 && (e[v--] = p >> 16 & 255), b === 6 ? (v >= 0 && (e[v--] = p >> 24 & 255), g = 0, b = 0) : (g = p >>> 24, b += 2);
        }
        if (v >= 0)
          for (e[v--] = g; v >= 0; )
            e[v--] = 0;
      }, Math.clz32 ? r.prototype._countBits = function(e) {
        return 32 - Math.clz32(e);
      } : r.prototype._countBits = function(e) {
        var t = e, v = 0;
        return t >= 4096 && (v += 13, t >>>= 13), t >= 64 && (v += 7, t >>>= 7), t >= 8 && (v += 4, t >>>= 4), t >= 2 && (v += 2, t >>>= 2), v + t;
      }, r.prototype._zeroBits = function(e) {
        if (e === 0)
          return 26;
        var t = e, v = 0;
        return t & 8191 || (v += 13, t >>>= 13), t & 127 || (v += 7, t >>>= 7), t & 15 || (v += 4, t >>>= 4), t & 3 || (v += 2, t >>>= 2), t & 1 || v++, v;
      }, r.prototype.bitLength = function() {
        var e = this.words[this.length - 1], t = this._countBits(e);
        return (this.length - 1) * 26 + t;
      };
      function $(o) {
        for (var e = new Array(o.bitLength()), t = 0; t < e.length; t++) {
          var v = t / 26 | 0, g = t % 26;
          e[t] = o.words[v] >>> g & 1;
        }
        return e;
      }
      r.prototype.zeroBits = function() {
        if (this.isZero())
          return 0;
        for (var e = 0, t = 0; t < this.length; t++) {
          var v = this._zeroBits(this.words[t]);
          if (e += v, v !== 26)
            break;
        }
        return e;
      }, r.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, r.prototype.toTwos = function(e) {
        return this.negative !== 0 ? this.abs().inotn(e).iaddn(1) : this.clone();
      }, r.prototype.fromTwos = function(e) {
        return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone();
      }, r.prototype.isNeg = function() {
        return this.negative !== 0;
      }, r.prototype.neg = function() {
        return this.clone().ineg();
      }, r.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, r.prototype.iuor = function(e) {
        for (; this.length < e.length; )
          this.words[this.length++] = 0;
        for (var t = 0; t < e.length; t++)
          this.words[t] = this.words[t] | e.words[t];
        return this._strip();
      }, r.prototype.ior = function(e) {
        return M((this.negative | e.negative) === 0), this.iuor(e);
      }, r.prototype.or = function(e) {
        return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this);
      }, r.prototype.uor = function(e) {
        return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this);
      }, r.prototype.iuand = function(e) {
        var t;
        this.length > e.length ? t = e : t = this;
        for (var v = 0; v < t.length; v++)
          this.words[v] = this.words[v] & e.words[v];
        return this.length = t.length, this._strip();
      }, r.prototype.iand = function(e) {
        return M((this.negative | e.negative) === 0), this.iuand(e);
      }, r.prototype.and = function(e) {
        return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this);
      }, r.prototype.uand = function(e) {
        return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this);
      }, r.prototype.iuxor = function(e) {
        var t, v;
        this.length > e.length ? (t = this, v = e) : (t = e, v = this);
        for (var g = 0; g < v.length; g++)
          this.words[g] = t.words[g] ^ v.words[g];
        if (this !== t)
          for (; g < t.length; g++)
            this.words[g] = t.words[g];
        return this.length = t.length, this._strip();
      }, r.prototype.ixor = function(e) {
        return M((this.negative | e.negative) === 0), this.iuxor(e);
      }, r.prototype.xor = function(e) {
        return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this);
      }, r.prototype.uxor = function(e) {
        return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this);
      }, r.prototype.inotn = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = Math.ceil(e / 26) | 0, v = e % 26;
        this._expand(t), v > 0 && t--;
        for (var g = 0; g < t; g++)
          this.words[g] = ~this.words[g] & 67108863;
        return v > 0 && (this.words[g] = ~this.words[g] & 67108863 >> 26 - v), this._strip();
      }, r.prototype.notn = function(e) {
        return this.clone().inotn(e);
      }, r.prototype.setn = function(e, t) {
        M(typeof e == "number" && e >= 0);
        var v = e / 26 | 0, g = e % 26;
        return this._expand(v + 1), t ? this.words[v] = this.words[v] | 1 << g : this.words[v] = this.words[v] & ~(1 << g), this._strip();
      }, r.prototype.iadd = function(e) {
        var t;
        if (this.negative !== 0 && e.negative === 0)
          return this.negative = 0, t = this.isub(e), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && e.negative !== 0)
          return e.negative = 0, t = this.isub(e), e.negative = 1, t._normSign();
        var v, g;
        this.length > e.length ? (v = this, g = e) : (v = e, g = this);
        for (var h = 0, b = 0; b < g.length; b++)
          t = (v.words[b] | 0) + (g.words[b] | 0) + h, this.words[b] = t & 67108863, h = t >>> 26;
        for (; h !== 0 && b < v.length; b++)
          t = (v.words[b] | 0) + h, this.words[b] = t & 67108863, h = t >>> 26;
        if (this.length = v.length, h !== 0)
          this.words[this.length] = h, this.length++;
        else if (v !== this)
          for (; b < v.length; b++)
            this.words[b] = v.words[b];
        return this;
      }, r.prototype.add = function(e) {
        var t;
        return e.negative !== 0 && this.negative === 0 ? (e.negative = 0, t = this.sub(e), e.negative ^= 1, t) : e.negative === 0 && this.negative !== 0 ? (this.negative = 0, t = e.sub(this), this.negative = 1, t) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this);
      }, r.prototype.isub = function(e) {
        if (e.negative !== 0) {
          e.negative = 0;
          var t = this.iadd(e);
          return e.negative = 1, t._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
        var v = this.cmp(e);
        if (v === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var g, h;
        v > 0 ? (g = this, h = e) : (g = e, h = this);
        for (var b = 0, p = 0; p < h.length; p++)
          t = (g.words[p] | 0) - (h.words[p] | 0) + b, b = t >> 26, this.words[p] = t & 67108863;
        for (; b !== 0 && p < g.length; p++)
          t = (g.words[p] | 0) + b, b = t >> 26, this.words[p] = t & 67108863;
        if (b === 0 && p < g.length && g !== this)
          for (; p < g.length; p++)
            this.words[p] = g.words[p];
        return this.length = Math.max(this.length, p), g !== this && (this.negative = 1), this._strip();
      }, r.prototype.sub = function(e) {
        return this.clone().isub(e);
      };
      function C(o, e, t) {
        t.negative = e.negative ^ o.negative;
        var v = o.length + e.length | 0;
        t.length = v, v = v - 1 | 0;
        var g = o.words[0] | 0, h = e.words[0] | 0, b = g * h, p = b & 67108863, w = b / 67108864 | 0;
        t.words[0] = p;
        for (var a = 1; a < v; a++) {
          for (var T = w >>> 26, V = w & 67108863, Y = Math.min(a, e.length - 1), z = Math.max(0, a - o.length + 1); z <= Y; z++) {
            var D = a - z | 0;
            g = o.words[D] | 0, h = e.words[z] | 0, b = g * h + V, T += b / 67108864 | 0, V = b & 67108863;
          }
          t.words[a] = V | 0, w = T | 0;
        }
        return w !== 0 ? t.words[a] = w | 0 : t.length--, t._strip();
      }
      var L = function(e, t, v) {
        var g = e.words, h = t.words, b = v.words, p = 0, w, a, T, V = g[0] | 0, Y = V & 8191, z = V >>> 13, D = g[1] | 0, N = D & 8191, Q = D >>> 13, te = g[2] | 0, G = te & 8191, W = te >>> 13, ae = g[3] | 0, se = ae & 8191, he = ae >>> 13, Z = g[4] | 0, O = Z & 8191, F = Z >>> 13, K = g[5] | 0, re = K & 8191, fe = K >>> 13, oe = g[6] | 0, le = oe & 8191, ce = oe >>> 13, ve = g[7] | 0, pe = ve & 8191, de = ve >>> 13, Ne = g[8] | 0, Re = Ne & 8191, be = Ne >>> 13, Ue = g[9] | 0, Ie = Ue & 8191, ye = Ue >>> 13, je = h[0] | 0, Te = je & 8191, me = je >>> 13, He = h[1] | 0, ke = He & 8191, ge = He >>> 13, ze = h[2] | 0, Pe = ze & 8191, we = ze >>> 13, We = h[3] | 0, Ce = We & 8191, xe = We >>> 13, Ke = h[4] | 0, $e = Ke & 8191, _e = Ke >>> 13, Ge = h[5] | 0, De = Ge & 8191, Me = Ge >>> 13, Ve = h[6] | 0, Oe = Ve & 8191, Se = Ve >>> 13, Je = h[7] | 0, Le = Je & 8191, qe = Je >>> 13, Ze = h[8] | 0, Fe = Ze & 8191, Ee = Ze >>> 13, Xe = h[9] | 0, Ae = Xe & 8191, Be = Xe >>> 13;
        v.negative = e.negative ^ t.negative, v.length = 19, w = Math.imul(Y, Te), a = Math.imul(Y, me), a = a + Math.imul(z, Te) | 0, T = Math.imul(z, me);
        var Ye = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (Ye >>> 26) | 0, Ye &= 67108863, w = Math.imul(N, Te), a = Math.imul(N, me), a = a + Math.imul(Q, Te) | 0, T = Math.imul(Q, me), w = w + Math.imul(Y, ke) | 0, a = a + Math.imul(Y, ge) | 0, a = a + Math.imul(z, ke) | 0, T = T + Math.imul(z, ge) | 0;
        var Qe = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (Qe >>> 26) | 0, Qe &= 67108863, w = Math.imul(G, Te), a = Math.imul(G, me), a = a + Math.imul(W, Te) | 0, T = Math.imul(W, me), w = w + Math.imul(N, ke) | 0, a = a + Math.imul(N, ge) | 0, a = a + Math.imul(Q, ke) | 0, T = T + Math.imul(Q, ge) | 0, w = w + Math.imul(Y, Pe) | 0, a = a + Math.imul(Y, we) | 0, a = a + Math.imul(z, Pe) | 0, T = T + Math.imul(z, we) | 0;
        var er = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (er >>> 26) | 0, er &= 67108863, w = Math.imul(se, Te), a = Math.imul(se, me), a = a + Math.imul(he, Te) | 0, T = Math.imul(he, me), w = w + Math.imul(G, ke) | 0, a = a + Math.imul(G, ge) | 0, a = a + Math.imul(W, ke) | 0, T = T + Math.imul(W, ge) | 0, w = w + Math.imul(N, Pe) | 0, a = a + Math.imul(N, we) | 0, a = a + Math.imul(Q, Pe) | 0, T = T + Math.imul(Q, we) | 0, w = w + Math.imul(Y, Ce) | 0, a = a + Math.imul(Y, xe) | 0, a = a + Math.imul(z, Ce) | 0, T = T + Math.imul(z, xe) | 0;
        var rr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (rr >>> 26) | 0, rr &= 67108863, w = Math.imul(O, Te), a = Math.imul(O, me), a = a + Math.imul(F, Te) | 0, T = Math.imul(F, me), w = w + Math.imul(se, ke) | 0, a = a + Math.imul(se, ge) | 0, a = a + Math.imul(he, ke) | 0, T = T + Math.imul(he, ge) | 0, w = w + Math.imul(G, Pe) | 0, a = a + Math.imul(G, we) | 0, a = a + Math.imul(W, Pe) | 0, T = T + Math.imul(W, we) | 0, w = w + Math.imul(N, Ce) | 0, a = a + Math.imul(N, xe) | 0, a = a + Math.imul(Q, Ce) | 0, T = T + Math.imul(Q, xe) | 0, w = w + Math.imul(Y, $e) | 0, a = a + Math.imul(Y, _e) | 0, a = a + Math.imul(z, $e) | 0, T = T + Math.imul(z, _e) | 0;
        var tr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (tr >>> 26) | 0, tr &= 67108863, w = Math.imul(re, Te), a = Math.imul(re, me), a = a + Math.imul(fe, Te) | 0, T = Math.imul(fe, me), w = w + Math.imul(O, ke) | 0, a = a + Math.imul(O, ge) | 0, a = a + Math.imul(F, ke) | 0, T = T + Math.imul(F, ge) | 0, w = w + Math.imul(se, Pe) | 0, a = a + Math.imul(se, we) | 0, a = a + Math.imul(he, Pe) | 0, T = T + Math.imul(he, we) | 0, w = w + Math.imul(G, Ce) | 0, a = a + Math.imul(G, xe) | 0, a = a + Math.imul(W, Ce) | 0, T = T + Math.imul(W, xe) | 0, w = w + Math.imul(N, $e) | 0, a = a + Math.imul(N, _e) | 0, a = a + Math.imul(Q, $e) | 0, T = T + Math.imul(Q, _e) | 0, w = w + Math.imul(Y, De) | 0, a = a + Math.imul(Y, Me) | 0, a = a + Math.imul(z, De) | 0, T = T + Math.imul(z, Me) | 0;
        var ir = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (ir >>> 26) | 0, ir &= 67108863, w = Math.imul(le, Te), a = Math.imul(le, me), a = a + Math.imul(ce, Te) | 0, T = Math.imul(ce, me), w = w + Math.imul(re, ke) | 0, a = a + Math.imul(re, ge) | 0, a = a + Math.imul(fe, ke) | 0, T = T + Math.imul(fe, ge) | 0, w = w + Math.imul(O, Pe) | 0, a = a + Math.imul(O, we) | 0, a = a + Math.imul(F, Pe) | 0, T = T + Math.imul(F, we) | 0, w = w + Math.imul(se, Ce) | 0, a = a + Math.imul(se, xe) | 0, a = a + Math.imul(he, Ce) | 0, T = T + Math.imul(he, xe) | 0, w = w + Math.imul(G, $e) | 0, a = a + Math.imul(G, _e) | 0, a = a + Math.imul(W, $e) | 0, T = T + Math.imul(W, _e) | 0, w = w + Math.imul(N, De) | 0, a = a + Math.imul(N, Me) | 0, a = a + Math.imul(Q, De) | 0, T = T + Math.imul(Q, Me) | 0, w = w + Math.imul(Y, Oe) | 0, a = a + Math.imul(Y, Se) | 0, a = a + Math.imul(z, Oe) | 0, T = T + Math.imul(z, Se) | 0;
        var nr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (nr >>> 26) | 0, nr &= 67108863, w = Math.imul(pe, Te), a = Math.imul(pe, me), a = a + Math.imul(de, Te) | 0, T = Math.imul(de, me), w = w + Math.imul(le, ke) | 0, a = a + Math.imul(le, ge) | 0, a = a + Math.imul(ce, ke) | 0, T = T + Math.imul(ce, ge) | 0, w = w + Math.imul(re, Pe) | 0, a = a + Math.imul(re, we) | 0, a = a + Math.imul(fe, Pe) | 0, T = T + Math.imul(fe, we) | 0, w = w + Math.imul(O, Ce) | 0, a = a + Math.imul(O, xe) | 0, a = a + Math.imul(F, Ce) | 0, T = T + Math.imul(F, xe) | 0, w = w + Math.imul(se, $e) | 0, a = a + Math.imul(se, _e) | 0, a = a + Math.imul(he, $e) | 0, T = T + Math.imul(he, _e) | 0, w = w + Math.imul(G, De) | 0, a = a + Math.imul(G, Me) | 0, a = a + Math.imul(W, De) | 0, T = T + Math.imul(W, Me) | 0, w = w + Math.imul(N, Oe) | 0, a = a + Math.imul(N, Se) | 0, a = a + Math.imul(Q, Oe) | 0, T = T + Math.imul(Q, Se) | 0, w = w + Math.imul(Y, Le) | 0, a = a + Math.imul(Y, qe) | 0, a = a + Math.imul(z, Le) | 0, T = T + Math.imul(z, qe) | 0;
        var ar = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (ar >>> 26) | 0, ar &= 67108863, w = Math.imul(Re, Te), a = Math.imul(Re, me), a = a + Math.imul(be, Te) | 0, T = Math.imul(be, me), w = w + Math.imul(pe, ke) | 0, a = a + Math.imul(pe, ge) | 0, a = a + Math.imul(de, ke) | 0, T = T + Math.imul(de, ge) | 0, w = w + Math.imul(le, Pe) | 0, a = a + Math.imul(le, we) | 0, a = a + Math.imul(ce, Pe) | 0, T = T + Math.imul(ce, we) | 0, w = w + Math.imul(re, Ce) | 0, a = a + Math.imul(re, xe) | 0, a = a + Math.imul(fe, Ce) | 0, T = T + Math.imul(fe, xe) | 0, w = w + Math.imul(O, $e) | 0, a = a + Math.imul(O, _e) | 0, a = a + Math.imul(F, $e) | 0, T = T + Math.imul(F, _e) | 0, w = w + Math.imul(se, De) | 0, a = a + Math.imul(se, Me) | 0, a = a + Math.imul(he, De) | 0, T = T + Math.imul(he, Me) | 0, w = w + Math.imul(G, Oe) | 0, a = a + Math.imul(G, Se) | 0, a = a + Math.imul(W, Oe) | 0, T = T + Math.imul(W, Se) | 0, w = w + Math.imul(N, Le) | 0, a = a + Math.imul(N, qe) | 0, a = a + Math.imul(Q, Le) | 0, T = T + Math.imul(Q, qe) | 0, w = w + Math.imul(Y, Fe) | 0, a = a + Math.imul(Y, Ee) | 0, a = a + Math.imul(z, Fe) | 0, T = T + Math.imul(z, Ee) | 0;
        var fr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (fr >>> 26) | 0, fr &= 67108863, w = Math.imul(Ie, Te), a = Math.imul(Ie, me), a = a + Math.imul(ye, Te) | 0, T = Math.imul(ye, me), w = w + Math.imul(Re, ke) | 0, a = a + Math.imul(Re, ge) | 0, a = a + Math.imul(be, ke) | 0, T = T + Math.imul(be, ge) | 0, w = w + Math.imul(pe, Pe) | 0, a = a + Math.imul(pe, we) | 0, a = a + Math.imul(de, Pe) | 0, T = T + Math.imul(de, we) | 0, w = w + Math.imul(le, Ce) | 0, a = a + Math.imul(le, xe) | 0, a = a + Math.imul(ce, Ce) | 0, T = T + Math.imul(ce, xe) | 0, w = w + Math.imul(re, $e) | 0, a = a + Math.imul(re, _e) | 0, a = a + Math.imul(fe, $e) | 0, T = T + Math.imul(fe, _e) | 0, w = w + Math.imul(O, De) | 0, a = a + Math.imul(O, Me) | 0, a = a + Math.imul(F, De) | 0, T = T + Math.imul(F, Me) | 0, w = w + Math.imul(se, Oe) | 0, a = a + Math.imul(se, Se) | 0, a = a + Math.imul(he, Oe) | 0, T = T + Math.imul(he, Se) | 0, w = w + Math.imul(G, Le) | 0, a = a + Math.imul(G, qe) | 0, a = a + Math.imul(W, Le) | 0, T = T + Math.imul(W, qe) | 0, w = w + Math.imul(N, Fe) | 0, a = a + Math.imul(N, Ee) | 0, a = a + Math.imul(Q, Fe) | 0, T = T + Math.imul(Q, Ee) | 0, w = w + Math.imul(Y, Ae) | 0, a = a + Math.imul(Y, Be) | 0, a = a + Math.imul(z, Ae) | 0, T = T + Math.imul(z, Be) | 0;
        var sr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (sr >>> 26) | 0, sr &= 67108863, w = Math.imul(Ie, ke), a = Math.imul(Ie, ge), a = a + Math.imul(ye, ke) | 0, T = Math.imul(ye, ge), w = w + Math.imul(Re, Pe) | 0, a = a + Math.imul(Re, we) | 0, a = a + Math.imul(be, Pe) | 0, T = T + Math.imul(be, we) | 0, w = w + Math.imul(pe, Ce) | 0, a = a + Math.imul(pe, xe) | 0, a = a + Math.imul(de, Ce) | 0, T = T + Math.imul(de, xe) | 0, w = w + Math.imul(le, $e) | 0, a = a + Math.imul(le, _e) | 0, a = a + Math.imul(ce, $e) | 0, T = T + Math.imul(ce, _e) | 0, w = w + Math.imul(re, De) | 0, a = a + Math.imul(re, Me) | 0, a = a + Math.imul(fe, De) | 0, T = T + Math.imul(fe, Me) | 0, w = w + Math.imul(O, Oe) | 0, a = a + Math.imul(O, Se) | 0, a = a + Math.imul(F, Oe) | 0, T = T + Math.imul(F, Se) | 0, w = w + Math.imul(se, Le) | 0, a = a + Math.imul(se, qe) | 0, a = a + Math.imul(he, Le) | 0, T = T + Math.imul(he, qe) | 0, w = w + Math.imul(G, Fe) | 0, a = a + Math.imul(G, Ee) | 0, a = a + Math.imul(W, Fe) | 0, T = T + Math.imul(W, Ee) | 0, w = w + Math.imul(N, Ae) | 0, a = a + Math.imul(N, Be) | 0, a = a + Math.imul(Q, Ae) | 0, T = T + Math.imul(Q, Be) | 0;
        var or = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (or >>> 26) | 0, or &= 67108863, w = Math.imul(Ie, Pe), a = Math.imul(Ie, we), a = a + Math.imul(ye, Pe) | 0, T = Math.imul(ye, we), w = w + Math.imul(Re, Ce) | 0, a = a + Math.imul(Re, xe) | 0, a = a + Math.imul(be, Ce) | 0, T = T + Math.imul(be, xe) | 0, w = w + Math.imul(pe, $e) | 0, a = a + Math.imul(pe, _e) | 0, a = a + Math.imul(de, $e) | 0, T = T + Math.imul(de, _e) | 0, w = w + Math.imul(le, De) | 0, a = a + Math.imul(le, Me) | 0, a = a + Math.imul(ce, De) | 0, T = T + Math.imul(ce, Me) | 0, w = w + Math.imul(re, Oe) | 0, a = a + Math.imul(re, Se) | 0, a = a + Math.imul(fe, Oe) | 0, T = T + Math.imul(fe, Se) | 0, w = w + Math.imul(O, Le) | 0, a = a + Math.imul(O, qe) | 0, a = a + Math.imul(F, Le) | 0, T = T + Math.imul(F, qe) | 0, w = w + Math.imul(se, Fe) | 0, a = a + Math.imul(se, Ee) | 0, a = a + Math.imul(he, Fe) | 0, T = T + Math.imul(he, Ee) | 0, w = w + Math.imul(G, Ae) | 0, a = a + Math.imul(G, Be) | 0, a = a + Math.imul(W, Ae) | 0, T = T + Math.imul(W, Be) | 0;
        var ur = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (ur >>> 26) | 0, ur &= 67108863, w = Math.imul(Ie, Ce), a = Math.imul(Ie, xe), a = a + Math.imul(ye, Ce) | 0, T = Math.imul(ye, xe), w = w + Math.imul(Re, $e) | 0, a = a + Math.imul(Re, _e) | 0, a = a + Math.imul(be, $e) | 0, T = T + Math.imul(be, _e) | 0, w = w + Math.imul(pe, De) | 0, a = a + Math.imul(pe, Me) | 0, a = a + Math.imul(de, De) | 0, T = T + Math.imul(de, Me) | 0, w = w + Math.imul(le, Oe) | 0, a = a + Math.imul(le, Se) | 0, a = a + Math.imul(ce, Oe) | 0, T = T + Math.imul(ce, Se) | 0, w = w + Math.imul(re, Le) | 0, a = a + Math.imul(re, qe) | 0, a = a + Math.imul(fe, Le) | 0, T = T + Math.imul(fe, qe) | 0, w = w + Math.imul(O, Fe) | 0, a = a + Math.imul(O, Ee) | 0, a = a + Math.imul(F, Fe) | 0, T = T + Math.imul(F, Ee) | 0, w = w + Math.imul(se, Ae) | 0, a = a + Math.imul(se, Be) | 0, a = a + Math.imul(he, Ae) | 0, T = T + Math.imul(he, Be) | 0;
        var hr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (hr >>> 26) | 0, hr &= 67108863, w = Math.imul(Ie, $e), a = Math.imul(Ie, _e), a = a + Math.imul(ye, $e) | 0, T = Math.imul(ye, _e), w = w + Math.imul(Re, De) | 0, a = a + Math.imul(Re, Me) | 0, a = a + Math.imul(be, De) | 0, T = T + Math.imul(be, Me) | 0, w = w + Math.imul(pe, Oe) | 0, a = a + Math.imul(pe, Se) | 0, a = a + Math.imul(de, Oe) | 0, T = T + Math.imul(de, Se) | 0, w = w + Math.imul(le, Le) | 0, a = a + Math.imul(le, qe) | 0, a = a + Math.imul(ce, Le) | 0, T = T + Math.imul(ce, qe) | 0, w = w + Math.imul(re, Fe) | 0, a = a + Math.imul(re, Ee) | 0, a = a + Math.imul(fe, Fe) | 0, T = T + Math.imul(fe, Ee) | 0, w = w + Math.imul(O, Ae) | 0, a = a + Math.imul(O, Be) | 0, a = a + Math.imul(F, Ae) | 0, T = T + Math.imul(F, Be) | 0;
        var cr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (cr >>> 26) | 0, cr &= 67108863, w = Math.imul(Ie, De), a = Math.imul(Ie, Me), a = a + Math.imul(ye, De) | 0, T = Math.imul(ye, Me), w = w + Math.imul(Re, Oe) | 0, a = a + Math.imul(Re, Se) | 0, a = a + Math.imul(be, Oe) | 0, T = T + Math.imul(be, Se) | 0, w = w + Math.imul(pe, Le) | 0, a = a + Math.imul(pe, qe) | 0, a = a + Math.imul(de, Le) | 0, T = T + Math.imul(de, qe) | 0, w = w + Math.imul(le, Fe) | 0, a = a + Math.imul(le, Ee) | 0, a = a + Math.imul(ce, Fe) | 0, T = T + Math.imul(ce, Ee) | 0, w = w + Math.imul(re, Ae) | 0, a = a + Math.imul(re, Be) | 0, a = a + Math.imul(fe, Ae) | 0, T = T + Math.imul(fe, Be) | 0;
        var dr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (dr >>> 26) | 0, dr &= 67108863, w = Math.imul(Ie, Oe), a = Math.imul(Ie, Se), a = a + Math.imul(ye, Oe) | 0, T = Math.imul(ye, Se), w = w + Math.imul(Re, Le) | 0, a = a + Math.imul(Re, qe) | 0, a = a + Math.imul(be, Le) | 0, T = T + Math.imul(be, qe) | 0, w = w + Math.imul(pe, Fe) | 0, a = a + Math.imul(pe, Ee) | 0, a = a + Math.imul(de, Fe) | 0, T = T + Math.imul(de, Ee) | 0, w = w + Math.imul(le, Ae) | 0, a = a + Math.imul(le, Be) | 0, a = a + Math.imul(ce, Ae) | 0, T = T + Math.imul(ce, Be) | 0;
        var lr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (lr >>> 26) | 0, lr &= 67108863, w = Math.imul(Ie, Le), a = Math.imul(Ie, qe), a = a + Math.imul(ye, Le) | 0, T = Math.imul(ye, qe), w = w + Math.imul(Re, Fe) | 0, a = a + Math.imul(Re, Ee) | 0, a = a + Math.imul(be, Fe) | 0, T = T + Math.imul(be, Ee) | 0, w = w + Math.imul(pe, Ae) | 0, a = a + Math.imul(pe, Be) | 0, a = a + Math.imul(de, Ae) | 0, T = T + Math.imul(de, Be) | 0;
        var pr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (pr >>> 26) | 0, pr &= 67108863, w = Math.imul(Ie, Fe), a = Math.imul(Ie, Ee), a = a + Math.imul(ye, Fe) | 0, T = Math.imul(ye, Ee), w = w + Math.imul(Re, Ae) | 0, a = a + Math.imul(Re, Be) | 0, a = a + Math.imul(be, Ae) | 0, T = T + Math.imul(be, Be) | 0;
        var vr = (p + w | 0) + ((a & 8191) << 13) | 0;
        p = (T + (a >>> 13) | 0) + (vr >>> 26) | 0, vr &= 67108863, w = Math.imul(Ie, Ae), a = Math.imul(Ie, Be), a = a + Math.imul(ye, Ae) | 0, T = Math.imul(ye, Be);
        var br = (p + w | 0) + ((a & 8191) << 13) | 0;
        return p = (T + (a >>> 13) | 0) + (br >>> 26) | 0, br &= 67108863, b[0] = Ye, b[1] = Qe, b[2] = er, b[3] = rr, b[4] = tr, b[5] = ir, b[6] = nr, b[7] = ar, b[8] = fr, b[9] = sr, b[10] = or, b[11] = ur, b[12] = hr, b[13] = cr, b[14] = dr, b[15] = lr, b[16] = pr, b[17] = vr, b[18] = br, p !== 0 && (b[19] = p, v.length++), v;
      };
      Math.imul || (L = C);
      function H(o, e, t) {
        t.negative = e.negative ^ o.negative, t.length = o.length + e.length;
        for (var v = 0, g = 0, h = 0; h < t.length - 1; h++) {
          var b = g;
          g = 0;
          for (var p = v & 67108863, w = Math.min(h, e.length - 1), a = Math.max(0, h - o.length + 1); a <= w; a++) {
            var T = h - a, V = o.words[T] | 0, Y = e.words[a] | 0, z = V * Y, D = z & 67108863;
            b = b + (z / 67108864 | 0) | 0, D = D + p | 0, p = D & 67108863, b = b + (D >>> 26) | 0, g += b >>> 26, b &= 67108863;
          }
          t.words[h] = p, v = b, b = g;
        }
        return v !== 0 ? t.words[h] = v : t.length--, t._strip();
      }
      function j(o, e, t) {
        return H(o, e, t);
      }
      r.prototype.mulTo = function(e, t) {
        var v, g = this.length + e.length;
        return this.length === 10 && e.length === 10 ? v = L(this, e, t) : g < 63 ? v = C(this, e, t) : g < 1024 ? v = H(this, e, t) : v = j(this, e, t), v;
      }, r.prototype.mul = function(e) {
        var t = new r(null);
        return t.words = new Array(this.length + e.length), this.mulTo(e, t);
      }, r.prototype.mulf = function(e) {
        var t = new r(null);
        return t.words = new Array(this.length + e.length), j(this, e, t);
      }, r.prototype.imul = function(e) {
        return this.clone().mulTo(e, this);
      }, r.prototype.imuln = function(e) {
        var t = e < 0;
        t && (e = -e), M(typeof e == "number"), M(e < 67108864);
        for (var v = 0, g = 0; g < this.length; g++) {
          var h = (this.words[g] | 0) * e, b = (h & 67108863) + (v & 67108863);
          v >>= 26, v += h / 67108864 | 0, v += b >>> 26, this.words[g] = b & 67108863;
        }
        return v !== 0 && (this.words[g] = v, this.length++), t ? this.ineg() : this;
      }, r.prototype.muln = function(e) {
        return this.clone().imuln(e);
      }, r.prototype.sqr = function() {
        return this.mul(this);
      }, r.prototype.isqr = function() {
        return this.imul(this.clone());
      }, r.prototype.pow = function(e) {
        var t = $(e);
        if (t.length === 0)
          return new r(1);
        for (var v = this, g = 0; g < t.length && t[g] === 0; g++, v = v.sqr())
          ;
        if (++g < t.length)
          for (var h = v.sqr(); g < t.length; g++, h = h.sqr())
            t[g] !== 0 && (v = v.mul(h));
        return v;
      }, r.prototype.iushln = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = e % 26, v = (e - t) / 26, g = 67108863 >>> 26 - t << 26 - t, h;
        if (t !== 0) {
          var b = 0;
          for (h = 0; h < this.length; h++) {
            var p = this.words[h] & g, w = (this.words[h] | 0) - p << t;
            this.words[h] = w | b, b = p >>> 26 - t;
          }
          b && (this.words[h] = b, this.length++);
        }
        if (v !== 0) {
          for (h = this.length - 1; h >= 0; h--)
            this.words[h + v] = this.words[h];
          for (h = 0; h < v; h++)
            this.words[h] = 0;
          this.length += v;
        }
        return this._strip();
      }, r.prototype.ishln = function(e) {
        return M(this.negative === 0), this.iushln(e);
      }, r.prototype.iushrn = function(e, t, v) {
        M(typeof e == "number" && e >= 0);
        var g;
        t ? g = (t - t % 26) / 26 : g = 0;
        var h = e % 26, b = Math.min((e - h) / 26, this.length), p = 67108863 ^ 67108863 >>> h << h, w = v;
        if (g -= b, g = Math.max(0, g), w) {
          for (var a = 0; a < b; a++)
            w.words[a] = this.words[a];
          w.length = b;
        }
        if (b !== 0)
          if (this.length > b)
            for (this.length -= b, a = 0; a < this.length; a++)
              this.words[a] = this.words[a + b];
          else
            this.words[0] = 0, this.length = 1;
        var T = 0;
        for (a = this.length - 1; a >= 0 && (T !== 0 || a >= g); a--) {
          var V = this.words[a] | 0;
          this.words[a] = T << 26 - h | V >>> h, T = V & p;
        }
        return w && T !== 0 && (w.words[w.length++] = T), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, r.prototype.ishrn = function(e, t, v) {
        return M(this.negative === 0), this.iushrn(e, t, v);
      }, r.prototype.shln = function(e) {
        return this.clone().ishln(e);
      }, r.prototype.ushln = function(e) {
        return this.clone().iushln(e);
      }, r.prototype.shrn = function(e) {
        return this.clone().ishrn(e);
      }, r.prototype.ushrn = function(e) {
        return this.clone().iushrn(e);
      }, r.prototype.testn = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = e % 26, v = (e - t) / 26, g = 1 << t;
        if (this.length <= v)
          return !1;
        var h = this.words[v];
        return !!(h & g);
      }, r.prototype.imaskn = function(e) {
        M(typeof e == "number" && e >= 0);
        var t = e % 26, v = (e - t) / 26;
        if (M(this.negative === 0, "imaskn works only with positive numbers"), this.length <= v)
          return this;
        if (t !== 0 && v++, this.length = Math.min(v, this.length), t !== 0) {
          var g = 67108863 ^ 67108863 >>> t << t;
          this.words[this.length - 1] &= g;
        }
        return this._strip();
      }, r.prototype.maskn = function(e) {
        return this.clone().imaskn(e);
      }, r.prototype.iaddn = function(e) {
        return M(typeof e == "number"), M(e < 67108864), e < 0 ? this.isubn(-e) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= e ? (this.words[0] = e - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e);
      }, r.prototype._iaddn = function(e) {
        this.words[0] += e;
        for (var t = 0; t < this.length && this.words[t] >= 67108864; t++)
          this.words[t] -= 67108864, t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
        return this.length = Math.max(this.length, t + 1), this;
      }, r.prototype.isubn = function(e) {
        if (M(typeof e == "number"), M(e < 67108864), e < 0)
          return this.iaddn(-e);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(e), this.negative = 1, this;
        if (this.words[0] -= e, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var t = 0; t < this.length && this.words[t] < 0; t++)
            this.words[t] += 67108864, this.words[t + 1] -= 1;
        return this._strip();
      }, r.prototype.addn = function(e) {
        return this.clone().iaddn(e);
      }, r.prototype.subn = function(e) {
        return this.clone().isubn(e);
      }, r.prototype.iabs = function() {
        return this.negative = 0, this;
      }, r.prototype.abs = function() {
        return this.clone().iabs();
      }, r.prototype._ishlnsubmul = function(e, t, v) {
        var g = e.length + v, h;
        this._expand(g);
        var b, p = 0;
        for (h = 0; h < e.length; h++) {
          b = (this.words[h + v] | 0) + p;
          var w = (e.words[h] | 0) * t;
          b -= w & 67108863, p = (b >> 26) - (w / 67108864 | 0), this.words[h + v] = b & 67108863;
        }
        for (; h < this.length - v; h++)
          b = (this.words[h + v] | 0) + p, p = b >> 26, this.words[h + v] = b & 67108863;
        if (p === 0)
          return this._strip();
        for (M(p === -1), p = 0, h = 0; h < this.length; h++)
          b = -(this.words[h] | 0) + p, p = b >> 26, this.words[h] = b & 67108863;
        return this.negative = 1, this._strip();
      }, r.prototype._wordDiv = function(e, t) {
        var v = this.length - e.length, g = this.clone(), h = e, b = h.words[h.length - 1] | 0, p = this._countBits(b);
        v = 26 - p, v !== 0 && (h = h.ushln(v), g.iushln(v), b = h.words[h.length - 1] | 0);
        var w = g.length - h.length, a;
        if (t !== "mod") {
          a = new r(null), a.length = w + 1, a.words = new Array(a.length);
          for (var T = 0; T < a.length; T++)
            a.words[T] = 0;
        }
        var V = g.clone()._ishlnsubmul(h, 1, w);
        V.negative === 0 && (g = V, a && (a.words[w] = 1));
        for (var Y = w - 1; Y >= 0; Y--) {
          var z = (g.words[h.length + Y] | 0) * 67108864 + (g.words[h.length + Y - 1] | 0);
          for (z = Math.min(z / b | 0, 67108863), g._ishlnsubmul(h, z, Y); g.negative !== 0; )
            z--, g.negative = 0, g._ishlnsubmul(h, 1, Y), g.isZero() || (g.negative ^= 1);
          a && (a.words[Y] = z);
        }
        return a && a._strip(), g._strip(), t !== "div" && v !== 0 && g.iushrn(v), {
          div: a || null,
          mod: g
        };
      }, r.prototype.divmod = function(e, t, v) {
        if (M(!e.isZero()), this.isZero())
          return {
            div: new r(0),
            mod: new r(0)
          };
        var g, h, b;
        return this.negative !== 0 && e.negative === 0 ? (b = this.neg().divmod(e, t), t !== "mod" && (g = b.div.neg()), t !== "div" && (h = b.mod.neg(), v && h.negative !== 0 && h.iadd(e)), {
          div: g,
          mod: h
        }) : this.negative === 0 && e.negative !== 0 ? (b = this.divmod(e.neg(), t), t !== "mod" && (g = b.div.neg()), {
          div: g,
          mod: b.mod
        }) : this.negative & e.negative ? (b = this.neg().divmod(e.neg(), t), t !== "div" && (h = b.mod.neg(), v && h.negative !== 0 && h.isub(e)), {
          div: b.div,
          mod: h
        }) : e.length > this.length || this.cmp(e) < 0 ? {
          div: new r(0),
          mod: this
        } : e.length === 1 ? t === "div" ? {
          div: this.divn(e.words[0]),
          mod: null
        } : t === "mod" ? {
          div: null,
          mod: new r(this.modrn(e.words[0]))
        } : {
          div: this.divn(e.words[0]),
          mod: new r(this.modrn(e.words[0]))
        } : this._wordDiv(e, t);
      }, r.prototype.div = function(e) {
        return this.divmod(e, "div", !1).div;
      }, r.prototype.mod = function(e) {
        return this.divmod(e, "mod", !1).mod;
      }, r.prototype.umod = function(e) {
        return this.divmod(e, "mod", !0).mod;
      }, r.prototype.divRound = function(e) {
        var t = this.divmod(e);
        if (t.mod.isZero())
          return t.div;
        var v = t.div.negative !== 0 ? t.mod.isub(e) : t.mod, g = e.ushrn(1), h = e.andln(1), b = v.cmp(g);
        return b < 0 || h === 1 && b === 0 ? t.div : t.div.negative !== 0 ? t.div.isubn(1) : t.div.iaddn(1);
      }, r.prototype.modrn = function(e) {
        var t = e < 0;
        t && (e = -e), M(e <= 67108863);
        for (var v = (1 << 26) % e, g = 0, h = this.length - 1; h >= 0; h--)
          g = (v * g + (this.words[h] | 0)) % e;
        return t ? -g : g;
      }, r.prototype.modn = function(e) {
        return this.modrn(e);
      }, r.prototype.idivn = function(e) {
        var t = e < 0;
        t && (e = -e), M(e <= 67108863);
        for (var v = 0, g = this.length - 1; g >= 0; g--) {
          var h = (this.words[g] | 0) + v * 67108864;
          this.words[g] = h / e | 0, v = h % e;
        }
        return this._strip(), t ? this.ineg() : this;
      }, r.prototype.divn = function(e) {
        return this.clone().idivn(e);
      }, r.prototype.egcd = function(e) {
        M(e.negative === 0), M(!e.isZero());
        var t = this, v = e.clone();
        t.negative !== 0 ? t = t.umod(e) : t = t.clone();
        for (var g = new r(1), h = new r(0), b = new r(0), p = new r(1), w = 0; t.isEven() && v.isEven(); )
          t.iushrn(1), v.iushrn(1), ++w;
        for (var a = v.clone(), T = t.clone(); !t.isZero(); ) {
          for (var V = 0, Y = 1; !(t.words[0] & Y) && V < 26; ++V, Y <<= 1)
            ;
          if (V > 0)
            for (t.iushrn(V); V-- > 0; )
              (g.isOdd() || h.isOdd()) && (g.iadd(a), h.isub(T)), g.iushrn(1), h.iushrn(1);
          for (var z = 0, D = 1; !(v.words[0] & D) && z < 26; ++z, D <<= 1)
            ;
          if (z > 0)
            for (v.iushrn(z); z-- > 0; )
              (b.isOdd() || p.isOdd()) && (b.iadd(a), p.isub(T)), b.iushrn(1), p.iushrn(1);
          t.cmp(v) >= 0 ? (t.isub(v), g.isub(b), h.isub(p)) : (v.isub(t), b.isub(g), p.isub(h));
        }
        return {
          a: b,
          b: p,
          gcd: v.iushln(w)
        };
      }, r.prototype._invmp = function(e) {
        M(e.negative === 0), M(!e.isZero());
        var t = this, v = e.clone();
        t.negative !== 0 ? t = t.umod(e) : t = t.clone();
        for (var g = new r(1), h = new r(0), b = v.clone(); t.cmpn(1) > 0 && v.cmpn(1) > 0; ) {
          for (var p = 0, w = 1; !(t.words[0] & w) && p < 26; ++p, w <<= 1)
            ;
          if (p > 0)
            for (t.iushrn(p); p-- > 0; )
              g.isOdd() && g.iadd(b), g.iushrn(1);
          for (var a = 0, T = 1; !(v.words[0] & T) && a < 26; ++a, T <<= 1)
            ;
          if (a > 0)
            for (v.iushrn(a); a-- > 0; )
              h.isOdd() && h.iadd(b), h.iushrn(1);
          t.cmp(v) >= 0 ? (t.isub(v), g.isub(h)) : (v.isub(t), h.isub(g));
        }
        var V;
        return t.cmpn(1) === 0 ? V = g : V = h, V.cmpn(0) < 0 && V.iadd(e), V;
      }, r.prototype.gcd = function(e) {
        if (this.isZero())
          return e.abs();
        if (e.isZero())
          return this.abs();
        var t = this.clone(), v = e.clone();
        t.negative = 0, v.negative = 0;
        for (var g = 0; t.isEven() && v.isEven(); g++)
          t.iushrn(1), v.iushrn(1);
        do {
          for (; t.isEven(); )
            t.iushrn(1);
          for (; v.isEven(); )
            v.iushrn(1);
          var h = t.cmp(v);
          if (h < 0) {
            var b = t;
            t = v, v = b;
          } else if (h === 0 || v.cmpn(1) === 0)
            break;
          t.isub(v);
        } while (!0);
        return v.iushln(g);
      }, r.prototype.invm = function(e) {
        return this.egcd(e).a.umod(e);
      }, r.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, r.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, r.prototype.andln = function(e) {
        return this.words[0] & e;
      }, r.prototype.bincn = function(e) {
        M(typeof e == "number");
        var t = e % 26, v = (e - t) / 26, g = 1 << t;
        if (this.length <= v)
          return this._expand(v + 1), this.words[v] |= g, this;
        for (var h = g, b = v; h !== 0 && b < this.length; b++) {
          var p = this.words[b] | 0;
          p += h, h = p >>> 26, p &= 67108863, this.words[b] = p;
        }
        return h !== 0 && (this.words[b] = h, this.length++), this;
      }, r.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, r.prototype.cmpn = function(e) {
        var t = e < 0;
        if (this.negative !== 0 && !t)
          return -1;
        if (this.negative === 0 && t)
          return 1;
        this._strip();
        var v;
        if (this.length > 1)
          v = 1;
        else {
          t && (e = -e), M(e <= 67108863, "Number is too big");
          var g = this.words[0] | 0;
          v = g === e ? 0 : g < e ? -1 : 1;
        }
        return this.negative !== 0 ? -v | 0 : v;
      }, r.prototype.cmp = function(e) {
        if (this.negative !== 0 && e.negative === 0)
          return -1;
        if (this.negative === 0 && e.negative !== 0)
          return 1;
        var t = this.ucmp(e);
        return this.negative !== 0 ? -t | 0 : t;
      }, r.prototype.ucmp = function(e) {
        if (this.length > e.length)
          return 1;
        if (this.length < e.length)
          return -1;
        for (var t = 0, v = this.length - 1; v >= 0; v--) {
          var g = this.words[v] | 0, h = e.words[v] | 0;
          if (g !== h) {
            g < h ? t = -1 : g > h && (t = 1);
            break;
          }
        }
        return t;
      }, r.prototype.gtn = function(e) {
        return this.cmpn(e) === 1;
      }, r.prototype.gt = function(e) {
        return this.cmp(e) === 1;
      }, r.prototype.gten = function(e) {
        return this.cmpn(e) >= 0;
      }, r.prototype.gte = function(e) {
        return this.cmp(e) >= 0;
      }, r.prototype.ltn = function(e) {
        return this.cmpn(e) === -1;
      }, r.prototype.lt = function(e) {
        return this.cmp(e) === -1;
      }, r.prototype.lten = function(e) {
        return this.cmpn(e) <= 0;
      }, r.prototype.lte = function(e) {
        return this.cmp(e) <= 0;
      }, r.prototype.eqn = function(e) {
        return this.cmpn(e) === 0;
      }, r.prototype.eq = function(e) {
        return this.cmp(e) === 0;
      }, r.red = function(e) {
        return new U(e);
      }, r.prototype.toRed = function(e) {
        return M(!this.red, "Already a number in reduction context"), M(this.negative === 0, "red works only with positives"), e.convertTo(this)._forceRed(e);
      }, r.prototype.fromRed = function() {
        return M(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, r.prototype._forceRed = function(e) {
        return this.red = e, this;
      }, r.prototype.forceRed = function(e) {
        return M(!this.red, "Already a number in reduction context"), this._forceRed(e);
      }, r.prototype.redAdd = function(e) {
        return M(this.red, "redAdd works only with red numbers"), this.red.add(this, e);
      }, r.prototype.redIAdd = function(e) {
        return M(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e);
      }, r.prototype.redSub = function(e) {
        return M(this.red, "redSub works only with red numbers"), this.red.sub(this, e);
      }, r.prototype.redISub = function(e) {
        return M(this.red, "redISub works only with red numbers"), this.red.isub(this, e);
      }, r.prototype.redShl = function(e) {
        return M(this.red, "redShl works only with red numbers"), this.red.shl(this, e);
      }, r.prototype.redMul = function(e) {
        return M(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e);
      }, r.prototype.redIMul = function(e) {
        return M(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e);
      }, r.prototype.redSqr = function() {
        return M(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, r.prototype.redISqr = function() {
        return M(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, r.prototype.redSqrt = function() {
        return M(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, r.prototype.redInvm = function() {
        return M(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, r.prototype.redNeg = function() {
        return M(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, r.prototype.redPow = function(e) {
        return M(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e);
      };
      var J = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function X(o, e) {
        this.name = o, this.p = new r(e, 16), this.n = this.p.bitLength(), this.k = new r(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      X.prototype._tmp = function() {
        var e = new r(null);
        return e.words = new Array(Math.ceil(this.n / 13)), e;
      }, X.prototype.ireduce = function(e) {
        var t = e, v;
        do
          this.split(t, this.tmp), t = this.imulK(t), t = t.iadd(this.tmp), v = t.bitLength();
        while (v > this.n);
        var g = v < this.n ? -1 : t.ucmp(this.p);
        return g === 0 ? (t.words[0] = 0, t.length = 1) : g > 0 ? t.isub(this.p) : t.strip !== void 0 ? t.strip() : t._strip(), t;
      }, X.prototype.split = function(e, t) {
        e.iushrn(this.n, 0, t);
      }, X.prototype.imulK = function(e) {
        return e.imul(this.k);
      };
      function ie() {
        X.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      P(ie, X), ie.prototype.split = function(e, t) {
        for (var v = 4194303, g = Math.min(e.length, 9), h = 0; h < g; h++)
          t.words[h] = e.words[h];
        if (t.length = g, e.length <= 9) {
          e.words[0] = 0, e.length = 1;
          return;
        }
        var b = e.words[9];
        for (t.words[t.length++] = b & v, h = 10; h < e.length; h++) {
          var p = e.words[h] | 0;
          e.words[h - 10] = (p & v) << 4 | b >>> 22, b = p;
        }
        b >>>= 22, e.words[h - 10] = b, b === 0 && e.length > 10 ? e.length -= 10 : e.length -= 9;
      }, ie.prototype.imulK = function(e) {
        e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
        for (var t = 0, v = 0; v < e.length; v++) {
          var g = e.words[v] | 0;
          t += g * 977, e.words[v] = t & 67108863, t = g * 64 + (t / 67108864 | 0);
        }
        return e.words[e.length - 1] === 0 && (e.length--, e.words[e.length - 1] === 0 && e.length--), e;
      };
      function ne() {
        X.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      P(ne, X);
      function ee() {
        X.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      P(ee, X);
      function ue() {
        X.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      P(ue, X), ue.prototype.imulK = function(e) {
        for (var t = 0, v = 0; v < e.length; v++) {
          var g = (e.words[v] | 0) * 19 + t, h = g & 67108863;
          g >>>= 26, e.words[v] = h, t = g;
        }
        return t !== 0 && (e.words[e.length++] = t), e;
      }, r._prime = function(e) {
        if (J[e])
          return J[e];
        var t;
        if (e === "k256")
          t = new ie();
        else if (e === "p224")
          t = new ne();
        else if (e === "p192")
          t = new ee();
        else if (e === "p25519")
          t = new ue();
        else
          throw new Error("Unknown prime " + e);
        return J[e] = t, t;
      };
      function U(o) {
        if (typeof o == "string") {
          var e = r._prime(o);
          this.m = e.p, this.prime = e;
        } else
          M(o.gtn(1), "modulus must be greater than 1"), this.m = o, this.prime = null;
      }
      U.prototype._verify1 = function(e) {
        M(e.negative === 0, "red works only with positives"), M(e.red, "red works only with red numbers");
      }, U.prototype._verify2 = function(e, t) {
        M((e.negative | t.negative) === 0, "red works only with positives"), M(
          e.red && e.red === t.red,
          "red works only with red numbers"
        );
      }, U.prototype.imod = function(e) {
        return this.prime ? this.prime.ireduce(e)._forceRed(this) : (f(e, e.umod(this.m)._forceRed(this)), e);
      }, U.prototype.neg = function(e) {
        return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this);
      }, U.prototype.add = function(e, t) {
        this._verify2(e, t);
        var v = e.add(t);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v._forceRed(this);
      }, U.prototype.iadd = function(e, t) {
        this._verify2(e, t);
        var v = e.iadd(t);
        return v.cmp(this.m) >= 0 && v.isub(this.m), v;
      }, U.prototype.sub = function(e, t) {
        this._verify2(e, t);
        var v = e.sub(t);
        return v.cmpn(0) < 0 && v.iadd(this.m), v._forceRed(this);
      }, U.prototype.isub = function(e, t) {
        this._verify2(e, t);
        var v = e.isub(t);
        return v.cmpn(0) < 0 && v.iadd(this.m), v;
      }, U.prototype.shl = function(e, t) {
        return this._verify1(e), this.imod(e.ushln(t));
      }, U.prototype.imul = function(e, t) {
        return this._verify2(e, t), this.imod(e.imul(t));
      }, U.prototype.mul = function(e, t) {
        return this._verify2(e, t), this.imod(e.mul(t));
      }, U.prototype.isqr = function(e) {
        return this.imul(e, e.clone());
      }, U.prototype.sqr = function(e) {
        return this.mul(e, e);
      }, U.prototype.sqrt = function(e) {
        if (e.isZero())
          return e.clone();
        var t = this.m.andln(3);
        if (M(t % 2 === 1), t === 3) {
          var v = this.m.add(new r(1)).iushrn(2);
          return this.pow(e, v);
        }
        for (var g = this.m.subn(1), h = 0; !g.isZero() && g.andln(1) === 0; )
          h++, g.iushrn(1);
        M(!g.isZero());
        var b = new r(1).toRed(this), p = b.redNeg(), w = this.m.subn(1).iushrn(1), a = this.m.bitLength();
        for (a = new r(2 * a * a).toRed(this); this.pow(a, w).cmp(p) !== 0; )
          a.redIAdd(p);
        for (var T = this.pow(a, g), V = this.pow(e, g.addn(1).iushrn(1)), Y = this.pow(e, g), z = h; Y.cmp(b) !== 0; ) {
          for (var D = Y, N = 0; D.cmp(b) !== 0; N++)
            D = D.redSqr();
          M(N < z);
          var Q = this.pow(T, new r(1).iushln(z - N - 1));
          V = V.redMul(Q), T = Q.redSqr(), Y = Y.redMul(T), z = N;
        }
        return V;
      }, U.prototype.invm = function(e) {
        var t = e._invmp(this.m);
        return t.negative !== 0 ? (t.negative = 0, this.imod(t).redNeg()) : this.imod(t);
      }, U.prototype.pow = function(e, t) {
        if (t.isZero())
          return new r(1).toRed(this);
        if (t.cmpn(1) === 0)
          return e.clone();
        var v = 4, g = new Array(1 << v);
        g[0] = new r(1).toRed(this), g[1] = e;
        for (var h = 2; h < g.length; h++)
          g[h] = this.mul(g[h - 1], e);
        var b = g[0], p = 0, w = 0, a = t.bitLength() % 26;
        for (a === 0 && (a = 26), h = t.length - 1; h >= 0; h--) {
          for (var T = t.words[h], V = a - 1; V >= 0; V--) {
            var Y = T >> V & 1;
            if (b !== g[0] && (b = this.sqr(b)), Y === 0 && p === 0) {
              w = 0;
              continue;
            }
            p <<= 1, p |= Y, w++, !(w !== v && (h !== 0 || V !== 0)) && (b = this.mul(b, g[p]), w = 0, p = 0);
          }
          a = 26;
        }
        return b;
      }, U.prototype.convertTo = function(e) {
        var t = e.umod(this.m);
        return t === e ? t.clone() : t;
      }, U.prototype.convertFrom = function(e) {
        var t = e.clone();
        return t.red = null, t;
      }, r.mont = function(e) {
        return new E(e);
      };
      function E(o) {
        U.call(this, o), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new r(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      P(E, U), E.prototype.convertTo = function(e) {
        return this.imod(e.ushln(this.shift));
      }, E.prototype.convertFrom = function(e) {
        var t = this.imod(e.mul(this.rinv));
        return t.red = null, t;
      }, E.prototype.imul = function(e, t) {
        if (e.isZero() || t.isZero())
          return e.words[0] = 0, e.length = 1, e;
        var v = e.imul(t), g = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = v.isub(g).iushrn(this.shift), b = h;
        return h.cmp(this.m) >= 0 ? b = h.isub(this.m) : h.cmpn(0) < 0 && (b = h.iadd(this.m)), b._forceRed(this);
      }, E.prototype.mul = function(e, t) {
        if (e.isZero() || t.isZero())
          return new r(0)._forceRed(this);
        var v = e.mul(t), g = v.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), h = v.isub(g).iushrn(this.shift), b = h;
        return h.cmp(this.m) >= 0 ? b = h.isub(this.m) : h.cmpn(0) < 0 && (b = h.iadd(this.m)), b._forceRed(this);
      }, E.prototype.invm = function(e) {
        var t = this.imod(e._invmp(this.m).mul(this.r2));
        return t._forceRed(this);
      };
    })(A, commonjsGlobal);
  }(bn)), bn.exports;
}
var asn1$1 = {}, asn1 = {}, api = {}, vmBrowserify = {}, hasRequiredVmBrowserify;
function requireVmBrowserify() {
  return hasRequiredVmBrowserify || (hasRequiredVmBrowserify = 1, function(exports) {
    var indexOf = function(A, _) {
      if (A.indexOf)
        return A.indexOf(_);
      for (var B = 0; B < A.length; B++)
        if (A[B] === _)
          return B;
      return -1;
    }, Object_keys = function(A) {
      if (Object.keys)
        return Object.keys(A);
      var _ = [];
      for (var B in A)
        _.push(B);
      return _;
    }, forEach = function(A, _) {
      if (A.forEach)
        return A.forEach(_);
      for (var B = 0; B < A.length; B++)
        _(A[B], B, A);
    }, defineProp = function() {
      try {
        return Object.defineProperty({}, "_", {}), function(A, _, B) {
          Object.defineProperty(A, _, {
            writable: !0,
            enumerable: !1,
            configurable: !0,
            value: B
          });
        };
      } catch {
        return function(_, B, M) {
          _[B] = M;
        };
      }
    }(), globals = [
      "Array",
      "Boolean",
      "Date",
      "Error",
      "EvalError",
      "Function",
      "Infinity",
      "JSON",
      "Math",
      "NaN",
      "Number",
      "Object",
      "RangeError",
      "ReferenceError",
      "RegExp",
      "String",
      "SyntaxError",
      "TypeError",
      "URIError",
      "decodeURI",
      "decodeURIComponent",
      "encodeURI",
      "encodeURIComponent",
      "escape",
      "eval",
      "isFinite",
      "isNaN",
      "parseFloat",
      "parseInt",
      "undefined",
      "unescape"
    ];
    function Context() {
    }
    Context.prototype = {};
    var Script = exports.Script = function(_) {
      if (!(this instanceof Script))
        return new Script(_);
      this.code = _;
    };
    Script.prototype.runInContext = function(A) {
      if (!(A instanceof Context))
        throw new TypeError("needs a 'context' argument.");
      var _ = document.createElement("iframe");
      _.style || (_.style = {}), _.style.display = "none", document.body.appendChild(_);
      var B = _.contentWindow, M = B.eval, P = B.execScript;
      !M && P && (P.call(B, "null"), M = B.eval), forEach(Object_keys(A), function(d) {
        B[d] = A[d];
      }), forEach(globals, function(d) {
        A[d] && (B[d] = A[d]);
      });
      var r = Object_keys(B), S = M.call(B, this.code);
      return forEach(Object_keys(B), function(d) {
        (d in A || indexOf(r, d) === -1) && (A[d] = B[d]);
      }), forEach(globals, function(d) {
        d in A || defineProp(A, d, B[d]);
      }), document.body.removeChild(_), S;
    }, Script.prototype.runInThisContext = function() {
      return eval(this.code);
    }, Script.prototype.runInNewContext = function(A) {
      var _ = Script.createContext(A), B = this.runInContext(_);
      return A && forEach(Object_keys(_), function(M) {
        A[M] = _[M];
      }), B;
    }, forEach(Object_keys(Script.prototype), function(A) {
      exports[A] = Script[A] = function(_) {
        var B = Script(_);
        return B[A].apply(B, [].slice.call(arguments, 1));
      };
    }), exports.isContext = function(A) {
      return A instanceof Context;
    }, exports.createScript = function(A) {
      return exports.Script(A);
    }, exports.createContext = Script.createContext = function(A) {
      var _ = new Context();
      return typeof A == "object" && forEach(Object_keys(A), function(B) {
        _[B] = A[B];
      }), _;
    };
  }(vmBrowserify)), vmBrowserify;
}
var hasRequiredApi;
function requireApi() {
  return hasRequiredApi || (hasRequiredApi = 1, function(A) {
    var _ = requireAsn1$1(), B = requireInherits_browser(), M = A;
    M.define = function(S, d) {
      return new P(S, d);
    };
    function P(r, S) {
      this.name = r, this.body = S, this.decoders = {}, this.encoders = {};
    }
    P.prototype._createNamed = function(S) {
      var d;
      try {
        d = requireVmBrowserify().runInThisContext(
          "(function " + this.name + `(entity) {
  this._initNamed(entity);
})`
        );
      } catch {
        d = function(m) {
          this._initNamed(m);
        };
      }
      return B(d, S), d.prototype._initNamed = function(m) {
        S.call(this, m);
      }, new d(this);
    }, P.prototype._getDecoder = function(S) {
      return S = S || "der", this.decoders.hasOwnProperty(S) || (this.decoders[S] = this._createNamed(_.decoders[S])), this.decoders[S];
    }, P.prototype.decode = function(S, d, x) {
      return this._getDecoder(d).decode(S, x);
    }, P.prototype._getEncoder = function(S) {
      return S = S || "der", this.encoders.hasOwnProperty(S) || (this.encoders[S] = this._createNamed(_.encoders[S])), this.encoders[S];
    }, P.prototype.encode = function(S, d, x) {
      return this._getEncoder(d).encode(S, x);
    };
  }(api)), api;
}
var base = {}, reporter = {}, hasRequiredReporter;
function requireReporter() {
  if (hasRequiredReporter)
    return reporter;
  hasRequiredReporter = 1;
  var A = requireInherits_browser();
  function _(M) {
    this._reporterState = {
      obj: null,
      path: [],
      options: M || {},
      errors: []
    };
  }
  reporter.Reporter = _, _.prototype.isError = function(P) {
    return P instanceof B;
  }, _.prototype.save = function() {
    var P = this._reporterState;
    return { obj: P.obj, pathLen: P.path.length };
  }, _.prototype.restore = function(P) {
    var r = this._reporterState;
    r.obj = P.obj, r.path = r.path.slice(0, P.pathLen);
  }, _.prototype.enterKey = function(P) {
    return this._reporterState.path.push(P);
  }, _.prototype.exitKey = function(P) {
    var r = this._reporterState;
    r.path = r.path.slice(0, P - 1);
  }, _.prototype.leaveKey = function(P, r, S) {
    var d = this._reporterState;
    this.exitKey(P), d.obj !== null && (d.obj[r] = S);
  }, _.prototype.path = function() {
    return this._reporterState.path.join("/");
  }, _.prototype.enterObject = function() {
    var P = this._reporterState, r = P.obj;
    return P.obj = {}, r;
  }, _.prototype.leaveObject = function(P) {
    var r = this._reporterState, S = r.obj;
    return r.obj = P, S;
  }, _.prototype.error = function(P) {
    var r, S = this._reporterState, d = P instanceof B;
    if (d ? r = P : r = new B(S.path.map(function(x) {
      return "[" + JSON.stringify(x) + "]";
    }).join(""), P.message || P, P.stack), !S.options.partial)
      throw r;
    return d || S.errors.push(r), r;
  }, _.prototype.wrapResult = function(P) {
    var r = this._reporterState;
    return r.options.partial ? {
      result: this.isError(P) ? null : P,
      errors: r.errors
    } : P;
  };
  function B(M, P) {
    this.path = M, this.rethrow(P);
  }
  return A(B, Error), B.prototype.rethrow = function(P) {
    if (this.message = P + " at: " + (this.path || "(shallow)"), Error.captureStackTrace && Error.captureStackTrace(this, B), !this.stack)
      try {
        throw new Error(this.message);
      } catch (r) {
        this.stack = r.stack;
      }
    return this;
  }, reporter;
}
var buffer = {}, hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer)
    return buffer;
  hasRequiredBuffer = 1;
  var A = requireInherits_browser(), _ = requireBase().Reporter, B = requireBuffer$1().Buffer;
  function M(r, S) {
    if (_.call(this, S), !B.isBuffer(r)) {
      this.error("Input not Buffer");
      return;
    }
    this.base = r, this.offset = 0, this.length = r.length;
  }
  A(M, _), buffer.DecoderBuffer = M, M.prototype.save = function() {
    return { offset: this.offset, reporter: _.prototype.save.call(this) };
  }, M.prototype.restore = function(S) {
    var d = new M(this.base);
    return d.offset = S.offset, d.length = this.offset, this.offset = S.offset, _.prototype.restore.call(this, S.reporter), d;
  }, M.prototype.isEmpty = function() {
    return this.offset === this.length;
  }, M.prototype.readUInt8 = function(S) {
    return this.offset + 1 <= this.length ? this.base.readUInt8(this.offset++, !0) : this.error(S || "DecoderBuffer overrun");
  }, M.prototype.skip = function(S, d) {
    if (!(this.offset + S <= this.length))
      return this.error(d || "DecoderBuffer overrun");
    var x = new M(this.base);
    return x._reporterState = this._reporterState, x.offset = this.offset, x.length = this.offset + S, this.offset += S, x;
  }, M.prototype.raw = function(S) {
    return this.base.slice(S ? S.offset : this.offset, this.length);
  };
  function P(r, S) {
    if (Array.isArray(r))
      this.length = 0, this.value = r.map(function(d) {
        return d instanceof P || (d = new P(d, S)), this.length += d.length, d;
      }, this);
    else if (typeof r == "number") {
      if (!(0 <= r && r <= 255))
        return S.error("non-byte EncoderBuffer value");
      this.value = r, this.length = 1;
    } else if (typeof r == "string")
      this.value = r, this.length = B.byteLength(r);
    else if (B.isBuffer(r))
      this.value = r, this.length = r.length;
    else
      return S.error("Unsupported type: " + typeof r);
  }
  return buffer.EncoderBuffer = P, P.prototype.join = function(S, d) {
    return S || (S = new B(this.length)), d || (d = 0), this.length === 0 || (Array.isArray(this.value) ? this.value.forEach(function(x) {
      x.join(S, d), d += x.length;
    }) : (typeof this.value == "number" ? S[d] = this.value : typeof this.value == "string" ? S.write(this.value, d) : B.isBuffer(this.value) && this.value.copy(S, d), d += this.length)), S;
  }, buffer;
}
var node, hasRequiredNode;
function requireNode() {
  if (hasRequiredNode)
    return node;
  hasRequiredNode = 1;
  var A = requireBase().Reporter, _ = requireBase().EncoderBuffer, B = requireBase().DecoderBuffer, M = requireMinimalisticAssert(), P = [
    "seq",
    "seqof",
    "set",
    "setof",
    "objid",
    "bool",
    "gentime",
    "utctime",
    "null_",
    "enum",
    "int",
    "objDesc",
    "bitstr",
    "bmpstr",
    "charstr",
    "genstr",
    "graphstr",
    "ia5str",
    "iso646str",
    "numstr",
    "octstr",
    "printstr",
    "t61str",
    "unistr",
    "utf8str",
    "videostr"
  ], r = [
    "key",
    "obj",
    "use",
    "optional",
    "explicit",
    "implicit",
    "def",
    "choice",
    "any",
    "contains"
  ].concat(P), S = [
    "_peekTag",
    "_decodeTag",
    "_use",
    "_decodeStr",
    "_decodeObjid",
    "_decodeTime",
    "_decodeNull",
    "_decodeInt",
    "_decodeBool",
    "_decodeList",
    "_encodeComposite",
    "_encodeStr",
    "_encodeObjid",
    "_encodeTime",
    "_encodeNull",
    "_encodeInt",
    "_encodeBool"
  ];
  function d(m, f) {
    var y = {};
    this._baseState = y, y.enc = m, y.parent = f || null, y.children = null, y.tag = null, y.args = null, y.reverseArgs = null, y.choice = null, y.optional = !1, y.any = !1, y.obj = !1, y.use = null, y.useDecoder = null, y.key = null, y.default = null, y.explicit = null, y.implicit = null, y.contains = null, y.parent || (y.children = [], this._wrap());
  }
  node = d;
  var x = [
    "enc",
    "parent",
    "children",
    "tag",
    "args",
    "reverseArgs",
    "choice",
    "optional",
    "any",
    "obj",
    "use",
    "alteredUse",
    "key",
    "default",
    "explicit",
    "implicit",
    "contains"
  ];
  return d.prototype.clone = function() {
    var f = this._baseState, y = {};
    x.forEach(function(R) {
      y[R] = f[R];
    });
    var q = new this.constructor(y.parent);
    return q._baseState = y, q;
  }, d.prototype._wrap = function() {
    var f = this._baseState;
    r.forEach(function(y) {
      this[y] = function() {
        var R = new this.constructor(this);
        return f.children.push(R), R[y].apply(R, arguments);
      };
    }, this);
  }, d.prototype._init = function(f) {
    var y = this._baseState;
    M(y.parent === null), f.call(this), y.children = y.children.filter(function(q) {
      return q._baseState.parent === this;
    }, this), M.equal(y.children.length, 1, "Root node can have only one child");
  }, d.prototype._useArgs = function(f) {
    var y = this._baseState, q = f.filter(function(R) {
      return R instanceof this.constructor;
    }, this);
    f = f.filter(function(R) {
      return !(R instanceof this.constructor);
    }, this), q.length !== 0 && (M(y.children === null), y.children = q, q.forEach(function(R) {
      R._baseState.parent = this;
    }, this)), f.length !== 0 && (M(y.args === null), y.args = f, y.reverseArgs = f.map(function(R) {
      if (typeof R != "object" || R.constructor !== Object)
        return R;
      var I = {};
      return Object.keys(R).forEach(function(k) {
        k == (k | 0) && (k |= 0);
        var $ = R[k];
        I[$] = k;
      }), I;
    }));
  }, S.forEach(function(m) {
    d.prototype[m] = function() {
      var y = this._baseState;
      throw new Error(m + " not implemented for encoding: " + y.enc);
    };
  }), P.forEach(function(m) {
    d.prototype[m] = function() {
      var y = this._baseState, q = Array.prototype.slice.call(arguments);
      return M(y.tag === null), y.tag = m, this._useArgs(q), this;
    };
  }), d.prototype.use = function(f) {
    M(f);
    var y = this._baseState;
    return M(y.use === null), y.use = f, this;
  }, d.prototype.optional = function() {
    var f = this._baseState;
    return f.optional = !0, this;
  }, d.prototype.def = function(f) {
    var y = this._baseState;
    return M(y.default === null), y.default = f, y.optional = !0, this;
  }, d.prototype.explicit = function(f) {
    var y = this._baseState;
    return M(y.explicit === null && y.implicit === null), y.explicit = f, this;
  }, d.prototype.implicit = function(f) {
    var y = this._baseState;
    return M(y.explicit === null && y.implicit === null), y.implicit = f, this;
  }, d.prototype.obj = function() {
    var f = this._baseState, y = Array.prototype.slice.call(arguments);
    return f.obj = !0, y.length !== 0 && this._useArgs(y), this;
  }, d.prototype.key = function(f) {
    var y = this._baseState;
    return M(y.key === null), y.key = f, this;
  }, d.prototype.any = function() {
    var f = this._baseState;
    return f.any = !0, this;
  }, d.prototype.choice = function(f) {
    var y = this._baseState;
    return M(y.choice === null), y.choice = f, this._useArgs(Object.keys(f).map(function(q) {
      return f[q];
    })), this;
  }, d.prototype.contains = function(f) {
    var y = this._baseState;
    return M(y.use === null), y.contains = f, this;
  }, d.prototype._decode = function(f, y) {
    var q = this._baseState;
    if (q.parent === null)
      return f.wrapResult(q.children[0]._decode(f, y));
    var R = q.default, I = !0, k = null;
    if (q.key !== null && (k = f.enterKey(q.key)), q.optional) {
      var $ = null;
      if (q.explicit !== null ? $ = q.explicit : q.implicit !== null ? $ = q.implicit : q.tag !== null && ($ = q.tag), $ === null && !q.any) {
        var C = f.save();
        try {
          q.choice === null ? this._decodeGeneric(q.tag, f, y) : this._decodeChoice(f, y), I = !0;
        } catch {
          I = !1;
        }
        f.restore(C);
      } else if (I = this._peekTag(f, $, q.any), f.isError(I))
        return I;
    }
    var L;
    if (q.obj && I && (L = f.enterObject()), I) {
      if (q.explicit !== null) {
        var H = this._decodeTag(f, q.explicit);
        if (f.isError(H))
          return H;
        f = H;
      }
      var j = f.offset;
      if (q.use === null && q.choice === null) {
        if (q.any)
          var C = f.save();
        var J = this._decodeTag(
          f,
          q.implicit !== null ? q.implicit : q.tag,
          q.any
        );
        if (f.isError(J))
          return J;
        q.any ? R = f.raw(C) : f = J;
      }
      if (y && y.track && q.tag !== null && y.track(f.path(), j, f.length, "tagged"), y && y.track && q.tag !== null && y.track(f.path(), f.offset, f.length, "content"), q.any ? R = R : q.choice === null ? R = this._decodeGeneric(q.tag, f, y) : R = this._decodeChoice(f, y), f.isError(R))
        return R;
      if (!q.any && q.choice === null && q.children !== null && q.children.forEach(function(ne) {
        ne._decode(f, y);
      }), q.contains && (q.tag === "octstr" || q.tag === "bitstr")) {
        var X = new B(R);
        R = this._getUse(q.contains, f._reporterState.obj)._decode(X, y);
      }
    }
    return q.obj && I && (R = f.leaveObject(L)), q.key !== null && (R !== null || I === !0) ? f.leaveKey(k, q.key, R) : k !== null && f.exitKey(k), R;
  }, d.prototype._decodeGeneric = function(f, y, q) {
    var R = this._baseState;
    return f === "seq" || f === "set" ? null : f === "seqof" || f === "setof" ? this._decodeList(y, f, R.args[0], q) : /str$/.test(f) ? this._decodeStr(y, f, q) : f === "objid" && R.args ? this._decodeObjid(y, R.args[0], R.args[1], q) : f === "objid" ? this._decodeObjid(y, null, null, q) : f === "gentime" || f === "utctime" ? this._decodeTime(y, f, q) : f === "null_" ? this._decodeNull(y, q) : f === "bool" ? this._decodeBool(y, q) : f === "objDesc" ? this._decodeStr(y, f, q) : f === "int" || f === "enum" ? this._decodeInt(y, R.args && R.args[0], q) : R.use !== null ? this._getUse(R.use, y._reporterState.obj)._decode(y, q) : y.error("unknown tag: " + f);
  }, d.prototype._getUse = function(f, y) {
    var q = this._baseState;
    return q.useDecoder = this._use(f, y), M(q.useDecoder._baseState.parent === null), q.useDecoder = q.useDecoder._baseState.children[0], q.implicit !== q.useDecoder._baseState.implicit && (q.useDecoder = q.useDecoder.clone(), q.useDecoder._baseState.implicit = q.implicit), q.useDecoder;
  }, d.prototype._decodeChoice = function(f, y) {
    var q = this._baseState, R = null, I = !1;
    return Object.keys(q.choice).some(function(k) {
      var $ = f.save(), C = q.choice[k];
      try {
        var L = C._decode(f, y);
        if (f.isError(L))
          return !1;
        R = { type: k, value: L }, I = !0;
      } catch {
        return f.restore($), !1;
      }
      return !0;
    }, this), I ? R : f.error("Choice not matched");
  }, d.prototype._createEncoderBuffer = function(f) {
    return new _(f, this.reporter);
  }, d.prototype._encode = function(f, y, q) {
    var R = this._baseState;
    if (!(R.default !== null && R.default === f)) {
      var I = this._encodeValue(f, y, q);
      if (I !== void 0 && !this._skipDefault(I, y, q))
        return I;
    }
  }, d.prototype._encodeValue = function(f, y, q) {
    var R = this._baseState;
    if (R.parent === null)
      return R.children[0]._encode(f, y || new A());
    var C = null;
    if (this.reporter = y, R.optional && f === void 0)
      if (R.default !== null)
        f = R.default;
      else
        return;
    var I = null, k = !1;
    if (R.any)
      C = this._createEncoderBuffer(f);
    else if (R.choice)
      C = this._encodeChoice(f, y);
    else if (R.contains)
      I = this._getUse(R.contains, q)._encode(f, y), k = !0;
    else if (R.children)
      I = R.children.map(function(j) {
        if (j._baseState.tag === "null_")
          return j._encode(null, y, f);
        if (j._baseState.key === null)
          return y.error("Child should have a key");
        var J = y.enterKey(j._baseState.key);
        if (typeof f != "object")
          return y.error("Child expected, but input is not object");
        var X = j._encode(f[j._baseState.key], y, f);
        return y.leaveKey(J), X;
      }, this).filter(function(j) {
        return j;
      }), I = this._createEncoderBuffer(I);
    else if (R.tag === "seqof" || R.tag === "setof") {
      if (!(R.args && R.args.length === 1))
        return y.error("Too many args for : " + R.tag);
      if (!Array.isArray(f))
        return y.error("seqof/setof, but data is not Array");
      var $ = this.clone();
      $._baseState.implicit = null, I = this._createEncoderBuffer(f.map(function(j) {
        var J = this._baseState;
        return this._getUse(J.args[0], f)._encode(j, y);
      }, $));
    } else
      R.use !== null ? C = this._getUse(R.use, q)._encode(f, y) : (I = this._encodePrimitive(R.tag, f), k = !0);
    var C;
    if (!R.any && R.choice === null) {
      var L = R.implicit !== null ? R.implicit : R.tag, H = R.implicit === null ? "universal" : "context";
      L === null ? R.use === null && y.error("Tag could be omitted only for .use()") : R.use === null && (C = this._encodeComposite(L, k, H, I));
    }
    return R.explicit !== null && (C = this._encodeComposite(R.explicit, !1, "context", C)), C;
  }, d.prototype._encodeChoice = function(f, y) {
    var q = this._baseState, R = q.choice[f.type];
    return R || M(
      !1,
      f.type + " not found in " + JSON.stringify(Object.keys(q.choice))
    ), R._encode(f.value, y);
  }, d.prototype._encodePrimitive = function(f, y) {
    var q = this._baseState;
    if (/str$/.test(f))
      return this._encodeStr(y, f);
    if (f === "objid" && q.args)
      return this._encodeObjid(y, q.reverseArgs[0], q.args[1]);
    if (f === "objid")
      return this._encodeObjid(y, null, null);
    if (f === "gentime" || f === "utctime")
      return this._encodeTime(y, f);
    if (f === "null_")
      return this._encodeNull();
    if (f === "int" || f === "enum")
      return this._encodeInt(y, q.args && q.reverseArgs[0]);
    if (f === "bool")
      return this._encodeBool(y);
    if (f === "objDesc")
      return this._encodeStr(y, f);
    throw new Error("Unsupported tag: " + f);
  }, d.prototype._isNumstr = function(f) {
    return /^[0-9 ]*$/.test(f);
  }, d.prototype._isPrintstr = function(f) {
    return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(f);
  }, node;
}
var hasRequiredBase;
function requireBase() {
  return hasRequiredBase || (hasRequiredBase = 1, function(A) {
    var _ = A;
    _.Reporter = requireReporter().Reporter, _.DecoderBuffer = requireBuffer().DecoderBuffer, _.EncoderBuffer = requireBuffer().EncoderBuffer, _.Node = requireNode();
  }(base)), base;
}
var constants = {}, der = {}, hasRequiredDer$2;
function requireDer$2() {
  return hasRequiredDer$2 || (hasRequiredDer$2 = 1, function(A) {
    var _ = requireConstants();
    A.tagClass = {
      0: "universal",
      1: "application",
      2: "context",
      3: "private"
    }, A.tagClassByName = _._reverse(A.tagClass), A.tag = {
      0: "end",
      1: "bool",
      2: "int",
      3: "bitstr",
      4: "octstr",
      5: "null_",
      6: "objid",
      7: "objDesc",
      8: "external",
      9: "real",
      10: "enum",
      11: "embed",
      12: "utf8str",
      13: "relativeOid",
      16: "seq",
      17: "set",
      18: "numstr",
      19: "printstr",
      20: "t61str",
      21: "videostr",
      22: "ia5str",
      23: "utctime",
      24: "gentime",
      25: "graphstr",
      26: "iso646str",
      27: "genstr",
      28: "unistr",
      29: "charstr",
      30: "bmpstr"
    }, A.tagByName = _._reverse(A.tag);
  }(der)), der;
}
var hasRequiredConstants;
function requireConstants() {
  return hasRequiredConstants || (hasRequiredConstants = 1, function(A) {
    var _ = A;
    _._reverse = function(M) {
      var P = {};
      return Object.keys(M).forEach(function(r) {
        (r | 0) == r && (r = r | 0);
        var S = M[r];
        P[S] = r;
      }), P;
    }, _.der = requireDer$2();
  }(constants)), constants;
}
var decoders = {}, der_1$1, hasRequiredDer$1;
function requireDer$1() {
  if (hasRequiredDer$1)
    return der_1$1;
  hasRequiredDer$1 = 1;
  var A = requireInherits_browser(), _ = requireAsn1$1(), B = _.base, M = _.bignum, P = _.constants.der;
  function r(m) {
    this.enc = "der", this.name = m.name, this.entity = m, this.tree = new S(), this.tree._init(m.body);
  }
  der_1$1 = r, r.prototype.decode = function(f, y) {
    return f instanceof B.DecoderBuffer || (f = new B.DecoderBuffer(f, y)), this.tree._decode(f, y);
  };
  function S(m) {
    B.Node.call(this, "der", m);
  }
  A(S, B.Node), S.prototype._peekTag = function(f, y, q) {
    if (f.isEmpty())
      return !1;
    var R = f.save(), I = d(f, 'Failed to peek tag: "' + y + '"');
    return f.isError(I) ? I : (f.restore(R), I.tag === y || I.tagStr === y || I.tagStr + "of" === y || q);
  }, S.prototype._decodeTag = function(f, y, q) {
    var R = d(
      f,
      'Failed to decode tag of "' + y + '"'
    );
    if (f.isError(R))
      return R;
    var I = x(
      f,
      R.primitive,
      'Failed to get length of "' + y + '"'
    );
    if (f.isError(I))
      return I;
    if (!q && R.tag !== y && R.tagStr !== y && R.tagStr + "of" !== y)
      return f.error('Failed to match tag: "' + y + '"');
    if (R.primitive || I !== null)
      return f.skip(I, 'Failed to match body of: "' + y + '"');
    var k = f.save(), $ = this._skipUntilEnd(
      f,
      'Failed to skip indefinite length body: "' + this.tag + '"'
    );
    return f.isError($) ? $ : (I = f.offset - k.offset, f.restore(k), f.skip(I, 'Failed to match body of: "' + y + '"'));
  }, S.prototype._skipUntilEnd = function(f, y) {
    for (; ; ) {
      var q = d(f, y);
      if (f.isError(q))
        return q;
      var R = x(f, q.primitive, y);
      if (f.isError(R))
        return R;
      var I;
      if (q.primitive || R !== null ? I = f.skip(R) : I = this._skipUntilEnd(f, y), f.isError(I))
        return I;
      if (q.tagStr === "end")
        break;
    }
  }, S.prototype._decodeList = function(f, y, q, R) {
    for (var I = []; !f.isEmpty(); ) {
      var k = this._peekTag(f, "end");
      if (f.isError(k))
        return k;
      var $ = q.decode(f, "der", R);
      if (f.isError($) && k)
        break;
      I.push($);
    }
    return I;
  }, S.prototype._decodeStr = function(f, y) {
    if (y === "bitstr") {
      var q = f.readUInt8();
      return f.isError(q) ? q : { unused: q, data: f.raw() };
    } else if (y === "bmpstr") {
      var R = f.raw();
      if (R.length % 2 === 1)
        return f.error("Decoding of string type: bmpstr length mismatch");
      for (var I = "", k = 0; k < R.length / 2; k++)
        I += String.fromCharCode(R.readUInt16BE(k * 2));
      return I;
    } else if (y === "numstr") {
      var $ = f.raw().toString("ascii");
      return this._isNumstr($) ? $ : f.error("Decoding of string type: numstr unsupported characters");
    } else {
      if (y === "octstr")
        return f.raw();
      if (y === "objDesc")
        return f.raw();
      if (y === "printstr") {
        var C = f.raw().toString("ascii");
        return this._isPrintstr(C) ? C : f.error("Decoding of string type: printstr unsupported characters");
      } else
        return /str$/.test(y) ? f.raw().toString() : f.error("Decoding of string type: " + y + " unsupported");
    }
  }, S.prototype._decodeObjid = function(f, y, q) {
    for (var R, I = [], k = 0; !f.isEmpty(); ) {
      var $ = f.readUInt8();
      k <<= 7, k |= $ & 127, $ & 128 || (I.push(k), k = 0);
    }
    $ & 128 && I.push(k);
    var C = I[0] / 40 | 0, L = I[0] % 40;
    if (q ? R = I : R = [C, L].concat(I.slice(1)), y) {
      var H = y[R.join(" ")];
      H === void 0 && (H = y[R.join(".")]), H !== void 0 && (R = H);
    }
    return R;
  }, S.prototype._decodeTime = function(f, y) {
    var q = f.raw().toString();
    if (y === "gentime")
      var R = q.slice(0, 4) | 0, I = q.slice(4, 6) | 0, k = q.slice(6, 8) | 0, $ = q.slice(8, 10) | 0, C = q.slice(10, 12) | 0, L = q.slice(12, 14) | 0;
    else if (y === "utctime") {
      var R = q.slice(0, 2) | 0, I = q.slice(2, 4) | 0, k = q.slice(4, 6) | 0, $ = q.slice(6, 8) | 0, C = q.slice(8, 10) | 0, L = q.slice(10, 12) | 0;
      R < 70 ? R = 2e3 + R : R = 1900 + R;
    } else
      return f.error("Decoding " + y + " time is not supported yet");
    return Date.UTC(R, I - 1, k, $, C, L, 0);
  }, S.prototype._decodeNull = function(f) {
    return null;
  }, S.prototype._decodeBool = function(f) {
    var y = f.readUInt8();
    return f.isError(y) ? y : y !== 0;
  }, S.prototype._decodeInt = function(f, y) {
    var q = f.raw(), R = new M(q);
    return y && (R = y[R.toString(10)] || R), R;
  }, S.prototype._use = function(f, y) {
    return typeof f == "function" && (f = f(y)), f._getDecoder("der").tree;
  };
  function d(m, f) {
    var y = m.readUInt8(f);
    if (m.isError(y))
      return y;
    var q = P.tagClass[y >> 6], R = (y & 32) === 0;
    if ((y & 31) === 31) {
      var I = y;
      for (y = 0; (I & 128) === 128; ) {
        if (I = m.readUInt8(f), m.isError(I))
          return I;
        y <<= 7, y |= I & 127;
      }
    } else
      y &= 31;
    var k = P.tag[y];
    return {
      cls: q,
      primitive: R,
      tag: y,
      tagStr: k
    };
  }
  function x(m, f, y) {
    var q = m.readUInt8(y);
    if (m.isError(q))
      return q;
    if (!f && q === 128)
      return null;
    if (!(q & 128))
      return q;
    var R = q & 127;
    if (R > 4)
      return m.error("length octect is too long");
    q = 0;
    for (var I = 0; I < R; I++) {
      q <<= 8;
      var k = m.readUInt8(y);
      if (m.isError(k))
        return k;
      q |= k;
    }
    return q;
  }
  return der_1$1;
}
var pem$1, hasRequiredPem$1;
function requirePem$1() {
  if (hasRequiredPem$1)
    return pem$1;
  hasRequiredPem$1 = 1;
  var A = requireInherits_browser(), _ = requireBuffer$1().Buffer, B = requireDer$1();
  function M(P) {
    B.call(this, P), this.enc = "pem";
  }
  return A(M, B), pem$1 = M, M.prototype.decode = function(r, S) {
    for (var d = r.toString().split(/[\r\n]+/g), x = S.label.toUpperCase(), m = /^-----(BEGIN|END) ([^-]+)-----$/, f = -1, y = -1, q = 0; q < d.length; q++) {
      var R = d[q].match(m);
      if (R !== null && R[2] === x)
        if (f === -1) {
          if (R[1] !== "BEGIN")
            break;
          f = q;
        } else {
          if (R[1] !== "END")
            break;
          y = q;
          break;
        }
    }
    if (f === -1 || y === -1)
      throw new Error("PEM section not found for: " + x);
    var I = d.slice(f + 1, y).join("");
    I.replace(/[^a-z0-9\+\/=]+/gi, "");
    var k = new _(I, "base64");
    return B.prototype.decode.call(this, k, S);
  }, pem$1;
}
var hasRequiredDecoders;
function requireDecoders() {
  return hasRequiredDecoders || (hasRequiredDecoders = 1, function(A) {
    var _ = A;
    _.der = requireDer$1(), _.pem = requirePem$1();
  }(decoders)), decoders;
}
var encoders = {}, der_1, hasRequiredDer;
function requireDer() {
  if (hasRequiredDer)
    return der_1;
  hasRequiredDer = 1;
  var A = requireInherits_browser(), _ = requireBuffer$1().Buffer, B = requireAsn1$1(), M = B.base, P = B.constants.der;
  function r(m) {
    this.enc = "der", this.name = m.name, this.entity = m, this.tree = new S(), this.tree._init(m.body);
  }
  der_1 = r, r.prototype.encode = function(f, y) {
    return this.tree._encode(f, y).join();
  };
  function S(m) {
    M.Node.call(this, "der", m);
  }
  A(S, M.Node), S.prototype._encodeComposite = function(f, y, q, R) {
    var I = x(f, y, q, this.reporter);
    if (R.length < 128) {
      var C = new _(2);
      return C[0] = I, C[1] = R.length, this._createEncoderBuffer([C, R]);
    }
    for (var k = 1, $ = R.length; $ >= 256; $ >>= 8)
      k++;
    var C = new _(2 + k);
    C[0] = I, C[1] = 128 | k;
    for (var $ = 1 + k, L = R.length; L > 0; $--, L >>= 8)
      C[$] = L & 255;
    return this._createEncoderBuffer([C, R]);
  }, S.prototype._encodeStr = function(f, y) {
    if (y === "bitstr")
      return this._createEncoderBuffer([f.unused | 0, f.data]);
    if (y === "bmpstr") {
      for (var q = new _(f.length * 2), R = 0; R < f.length; R++)
        q.writeUInt16BE(f.charCodeAt(R), R * 2);
      return this._createEncoderBuffer(q);
    } else
      return y === "numstr" ? this._isNumstr(f) ? this._createEncoderBuffer(f) : this.reporter.error("Encoding of string type: numstr supports only digits and space") : y === "printstr" ? this._isPrintstr(f) ? this._createEncoderBuffer(f) : this.reporter.error("Encoding of string type: printstr supports only latin upper and lower case letters, digits, space, apostrophe, left and rigth parenthesis, plus sign, comma, hyphen, dot, slash, colon, equal sign, question mark") : /str$/.test(y) ? this._createEncoderBuffer(f) : y === "objDesc" ? this._createEncoderBuffer(f) : this.reporter.error("Encoding of string type: " + y + " unsupported");
  }, S.prototype._encodeObjid = function(f, y, q) {
    if (typeof f == "string") {
      if (!y)
        return this.reporter.error("string objid given, but no values map found");
      if (!y.hasOwnProperty(f))
        return this.reporter.error("objid not found in values map");
      f = y[f].split(/[\s\.]+/g);
      for (var R = 0; R < f.length; R++)
        f[R] |= 0;
    } else if (Array.isArray(f)) {
      f = f.slice();
      for (var R = 0; R < f.length; R++)
        f[R] |= 0;
    }
    if (!Array.isArray(f))
      return this.reporter.error("objid() should be either array or string, got: " + JSON.stringify(f));
    if (!q) {
      if (f[1] >= 40)
        return this.reporter.error("Second objid identifier OOB");
      f.splice(0, 2, f[0] * 40 + f[1]);
    }
    for (var I = 0, R = 0; R < f.length; R++) {
      var k = f[R];
      for (I++; k >= 128; k >>= 7)
        I++;
    }
    for (var $ = new _(I), C = $.length - 1, R = f.length - 1; R >= 0; R--) {
      var k = f[R];
      for ($[C--] = k & 127; (k >>= 7) > 0; )
        $[C--] = 128 | k & 127;
    }
    return this._createEncoderBuffer($);
  };
  function d(m) {
    return m < 10 ? "0" + m : m;
  }
  S.prototype._encodeTime = function(f, y) {
    var q, R = new Date(f);
    return y === "gentime" ? q = [
      d(R.getFullYear()),
      d(R.getUTCMonth() + 1),
      d(R.getUTCDate()),
      d(R.getUTCHours()),
      d(R.getUTCMinutes()),
      d(R.getUTCSeconds()),
      "Z"
    ].join("") : y === "utctime" ? q = [
      d(R.getFullYear() % 100),
      d(R.getUTCMonth() + 1),
      d(R.getUTCDate()),
      d(R.getUTCHours()),
      d(R.getUTCMinutes()),
      d(R.getUTCSeconds()),
      "Z"
    ].join("") : this.reporter.error("Encoding " + y + " time is not supported yet"), this._encodeStr(q, "octstr");
  }, S.prototype._encodeNull = function() {
    return this._createEncoderBuffer("");
  }, S.prototype._encodeInt = function(f, y) {
    if (typeof f == "string") {
      if (!y)
        return this.reporter.error("String int or enum given, but no values map");
      if (!y.hasOwnProperty(f))
        return this.reporter.error("Values map doesn't contain: " + JSON.stringify(f));
      f = y[f];
    }
    if (typeof f != "number" && !_.isBuffer(f)) {
      var q = f.toArray();
      !f.sign && q[0] & 128 && q.unshift(0), f = new _(q);
    }
    if (_.isBuffer(f)) {
      var R = f.length;
      f.length === 0 && R++;
      var k = new _(R);
      return f.copy(k), f.length === 0 && (k[0] = 0), this._createEncoderBuffer(k);
    }
    if (f < 128)
      return this._createEncoderBuffer(f);
    if (f < 256)
      return this._createEncoderBuffer([0, f]);
    for (var R = 1, I = f; I >= 256; I >>= 8)
      R++;
    for (var k = new Array(R), I = k.length - 1; I >= 0; I--)
      k[I] = f & 255, f >>= 8;
    return k[0] & 128 && k.unshift(0), this._createEncoderBuffer(new _(k));
  }, S.prototype._encodeBool = function(f) {
    return this._createEncoderBuffer(f ? 255 : 0);
  }, S.prototype._use = function(f, y) {
    return typeof f == "function" && (f = f(y)), f._getEncoder("der").tree;
  }, S.prototype._skipDefault = function(f, y, q) {
    var R = this._baseState, I;
    if (R.default === null)
      return !1;
    var k = f.join();
    if (R.defaultBuffer === void 0 && (R.defaultBuffer = this._encodeValue(R.default, y, q).join()), k.length !== R.defaultBuffer.length)
      return !1;
    for (I = 0; I < k.length; I++)
      if (k[I] !== R.defaultBuffer[I])
        return !1;
    return !0;
  };
  function x(m, f, y, q) {
    var R;
    if (m === "seqof" ? m = "seq" : m === "setof" && (m = "set"), P.tagByName.hasOwnProperty(m))
      R = P.tagByName[m];
    else if (typeof m == "number" && (m | 0) === m)
      R = m;
    else
      return q.error("Unknown tag: " + m);
    return R >= 31 ? q.error("Multi-octet tag encoding unsupported") : (f || (R |= 32), R |= P.tagClassByName[y || "universal"] << 6, R);
  }
  return der_1;
}
var pem, hasRequiredPem;
function requirePem() {
  if (hasRequiredPem)
    return pem;
  hasRequiredPem = 1;
  var A = requireInherits_browser(), _ = requireDer();
  function B(M) {
    _.call(this, M), this.enc = "pem";
  }
  return A(B, _), pem = B, B.prototype.encode = function(P, r) {
    for (var S = _.prototype.encode.call(this, P), d = S.toString("base64"), x = ["-----BEGIN " + r.label + "-----"], m = 0; m < d.length; m += 64)
      x.push(d.slice(m, m + 64));
    return x.push("-----END " + r.label + "-----"), x.join(`
`);
  }, pem;
}
var hasRequiredEncoders;
function requireEncoders() {
  return hasRequiredEncoders || (hasRequiredEncoders = 1, function(A) {
    var _ = A;
    _.der = requireDer(), _.pem = requirePem();
  }(encoders)), encoders;
}
var hasRequiredAsn1$1;
function requireAsn1$1() {
  return hasRequiredAsn1$1 || (hasRequiredAsn1$1 = 1, function(A) {
    var _ = A;
    _.bignum = requireBn$2(), _.define = requireApi().define, _.base = requireBase(), _.constants = requireConstants(), _.decoders = requireDecoders(), _.encoders = requireEncoders();
  }(asn1)), asn1;
}
var certificate, hasRequiredCertificate;
function requireCertificate() {
  if (hasRequiredCertificate)
    return certificate;
  hasRequiredCertificate = 1;
  var A = requireAsn1$1(), _ = A.define("Time", function() {
    this.choice({
      utcTime: this.utctime(),
      generalTime: this.gentime()
    });
  }), B = A.define("AttributeTypeValue", function() {
    this.seq().obj(
      this.key("type").objid(),
      this.key("value").any()
    );
  }), M = A.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("parameters").optional(),
      this.key("curve").objid().optional()
    );
  }), P = A.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(M),
      this.key("subjectPublicKey").bitstr()
    );
  }), r = A.define("RelativeDistinguishedName", function() {
    this.setof(B);
  }), S = A.define("RDNSequence", function() {
    this.seqof(r);
  }), d = A.define("Name", function() {
    this.choice({
      rdnSequence: this.use(S)
    });
  }), x = A.define("Validity", function() {
    this.seq().obj(
      this.key("notBefore").use(_),
      this.key("notAfter").use(_)
    );
  }), m = A.define("Extension", function() {
    this.seq().obj(
      this.key("extnID").objid(),
      this.key("critical").bool().def(!1),
      this.key("extnValue").octstr()
    );
  }), f = A.define("TBSCertificate", function() {
    this.seq().obj(
      this.key("version").explicit(0).int().optional(),
      this.key("serialNumber").int(),
      this.key("signature").use(M),
      this.key("issuer").use(d),
      this.key("validity").use(x),
      this.key("subject").use(d),
      this.key("subjectPublicKeyInfo").use(P),
      this.key("issuerUniqueID").implicit(1).bitstr().optional(),
      this.key("subjectUniqueID").implicit(2).bitstr().optional(),
      this.key("extensions").explicit(3).seqof(m).optional()
    );
  }), y = A.define("X509Certificate", function() {
    this.seq().obj(
      this.key("tbsCertificate").use(f),
      this.key("signatureAlgorithm").use(M),
      this.key("signatureValue").bitstr()
    );
  });
  return certificate = y, certificate;
}
var hasRequiredAsn1;
function requireAsn1() {
  if (hasRequiredAsn1)
    return asn1$1;
  hasRequiredAsn1 = 1;
  var A = requireAsn1$1();
  asn1$1.certificate = requireCertificate();
  var _ = A.define("RSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("modulus").int(),
      this.key("publicExponent").int(),
      this.key("privateExponent").int(),
      this.key("prime1").int(),
      this.key("prime2").int(),
      this.key("exponent1").int(),
      this.key("exponent2").int(),
      this.key("coefficient").int()
    );
  });
  asn1$1.RSAPrivateKey = _;
  var B = A.define("RSAPublicKey", function() {
    this.seq().obj(
      this.key("modulus").int(),
      this.key("publicExponent").int()
    );
  });
  asn1$1.RSAPublicKey = B;
  var M = A.define("AlgorithmIdentifier", function() {
    this.seq().obj(
      this.key("algorithm").objid(),
      this.key("none").null_().optional(),
      this.key("curve").objid().optional(),
      this.key("params").seq().obj(
        this.key("p").int(),
        this.key("q").int(),
        this.key("g").int()
      ).optional()
    );
  }), P = A.define("SubjectPublicKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").use(M),
      this.key("subjectPublicKey").bitstr()
    );
  });
  asn1$1.PublicKey = P;
  var r = A.define("PrivateKeyInfo", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("algorithm").use(M),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.PrivateKey = r;
  var S = A.define("EncryptedPrivateKeyInfo", function() {
    this.seq().obj(
      this.key("algorithm").seq().obj(
        this.key("id").objid(),
        this.key("decrypt").seq().obj(
          this.key("kde").seq().obj(
            this.key("id").objid(),
            this.key("kdeparams").seq().obj(
              this.key("salt").octstr(),
              this.key("iters").int()
            )
          ),
          this.key("cipher").seq().obj(
            this.key("algo").objid(),
            this.key("iv").octstr()
          )
        )
      ),
      this.key("subjectPrivateKey").octstr()
    );
  });
  asn1$1.EncryptedPrivateKey = S;
  var d = A.define("DSAPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("p").int(),
      this.key("q").int(),
      this.key("g").int(),
      this.key("pub_key").int(),
      this.key("priv_key").int()
    );
  });
  asn1$1.DSAPrivateKey = d, asn1$1.DSAparam = A.define("DSAparam", function() {
    this.int();
  });
  var x = A.define("ECParameters", function() {
    this.choice({
      namedCurve: this.objid()
    });
  }), m = A.define("ECPrivateKey", function() {
    this.seq().obj(
      this.key("version").int(),
      this.key("privateKey").octstr(),
      this.key("parameters").optional().explicit(0).use(x),
      this.key("publicKey").optional().explicit(1).bitstr()
    );
  });
  return asn1$1.ECPrivateKey = m, asn1$1.signature = A.define("signature", function() {
    this.seq().obj(
      this.key("r").int(),
      this.key("s").int()
    );
  }), asn1$1;
}
const require$$1 = {
  "2.16.840.1.101.3.4.1.1": "aes-128-ecb",
  "2.16.840.1.101.3.4.1.2": "aes-128-cbc",
  "2.16.840.1.101.3.4.1.3": "aes-128-ofb",
  "2.16.840.1.101.3.4.1.4": "aes-128-cfb",
  "2.16.840.1.101.3.4.1.21": "aes-192-ecb",
  "2.16.840.1.101.3.4.1.22": "aes-192-cbc",
  "2.16.840.1.101.3.4.1.23": "aes-192-ofb",
  "2.16.840.1.101.3.4.1.24": "aes-192-cfb",
  "2.16.840.1.101.3.4.1.41": "aes-256-ecb",
  "2.16.840.1.101.3.4.1.42": "aes-256-cbc",
  "2.16.840.1.101.3.4.1.43": "aes-256-ofb",
  "2.16.840.1.101.3.4.1.44": "aes-256-cfb"
};
var fixProc, hasRequiredFixProc;
function requireFixProc() {
  if (hasRequiredFixProc)
    return fixProc;
  hasRequiredFixProc = 1;
  var A = /Proc-Type: 4,ENCRYPTED[\n\r]+DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)[\n\r]+([0-9A-z\n\r+/=]+)[\n\r]+/m, _ = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----/m, B = /^-----BEGIN ((?:.*? KEY)|CERTIFICATE)-----([0-9A-z\n\r+/=]+)-----END \1-----$/m, M = requireEvp_bytestokey(), P = requireBrowser$6(), r = requireSafeBuffer$1().Buffer;
  return fixProc = function(S, d) {
    var x = S.toString(), m = x.match(A), f;
    if (m) {
      var q = "aes" + m[1], R = r.from(m[2], "hex"), I = r.from(m[3].replace(/[\r\n]/g, ""), "base64"), k = M(d, R.slice(0, 8), parseInt(m[1], 10)).key, $ = [], C = P.createDecipheriv(q, k, R);
      $.push(C.update(I)), $.push(C.final()), f = r.concat($);
    } else {
      var y = x.match(B);
      f = r.from(y[2].replace(/[\r\n]/g, ""), "base64");
    }
    var L = x.match(_)[1];
    return {
      tag: L,
      data: f
    };
  }, fixProc;
}
var parseAsn1, hasRequiredParseAsn1;
function requireParseAsn1() {
  if (hasRequiredParseAsn1)
    return parseAsn1;
  hasRequiredParseAsn1 = 1;
  var A = requireAsn1(), _ = require$$1, B = requireFixProc(), M = requireBrowser$6(), P = requireBrowser$7(), r = requireSafeBuffer$1().Buffer;
  function S(x, m) {
    var f = x.algorithm.decrypt.kde.kdeparams.salt, y = parseInt(x.algorithm.decrypt.kde.kdeparams.iters.toString(), 10), q = _[x.algorithm.decrypt.cipher.algo.join(".")], R = x.algorithm.decrypt.cipher.iv, I = x.subjectPrivateKey, k = parseInt(q.split("-")[1], 10) / 8, $ = P.pbkdf2Sync(m, f, y, k, "sha1"), C = M.createDecipheriv(q, $, R), L = [];
    return L.push(C.update(I)), L.push(C.final()), r.concat(L);
  }
  function d(x) {
    var m;
    typeof x == "object" && !r.isBuffer(x) && (m = x.passphrase, x = x.key), typeof x == "string" && (x = r.from(x));
    var f = B(x, m), y = f.tag, q = f.data, R, I;
    switch (y) {
      case "CERTIFICATE":
        I = A.certificate.decode(q, "der").tbsCertificate.subjectPublicKeyInfo;
      case "PUBLIC KEY":
        switch (I || (I = A.PublicKey.decode(q, "der")), R = I.algorithm.algorithm.join("."), R) {
          case "1.2.840.113549.1.1.1":
            return A.RSAPublicKey.decode(I.subjectPublicKey.data, "der");
          case "1.2.840.10045.2.1":
            return I.subjectPrivateKey = I.subjectPublicKey, {
              type: "ec",
              data: I
            };
          case "1.2.840.10040.4.1":
            return I.algorithm.params.pub_key = A.DSAparam.decode(I.subjectPublicKey.data, "der"), {
              type: "dsa",
              data: I.algorithm.params
            };
          default:
            throw new Error("unknown key id " + R);
        }
      case "ENCRYPTED PRIVATE KEY":
        q = A.EncryptedPrivateKey.decode(q, "der"), q = S(q, m);
      case "PRIVATE KEY":
        switch (I = A.PrivateKey.decode(q, "der"), R = I.algorithm.algorithm.join("."), R) {
          case "1.2.840.113549.1.1.1":
            return A.RSAPrivateKey.decode(I.subjectPrivateKey, "der");
          case "1.2.840.10045.2.1":
            return {
              curve: I.algorithm.curve,
              privateKey: A.ECPrivateKey.decode(I.subjectPrivateKey, "der").privateKey
            };
          case "1.2.840.10040.4.1":
            return I.algorithm.params.priv_key = A.DSAparam.decode(I.subjectPrivateKey, "der"), {
              type: "dsa",
              params: I.algorithm.params
            };
          default:
            throw new Error("unknown key id " + R);
        }
      case "RSA PUBLIC KEY":
        return A.RSAPublicKey.decode(q, "der");
      case "RSA PRIVATE KEY":
        return A.RSAPrivateKey.decode(q, "der");
      case "DSA PRIVATE KEY":
        return {
          type: "dsa",
          params: A.DSAPrivateKey.decode(q, "der")
        };
      case "EC PRIVATE KEY":
        return q = A.ECPrivateKey.decode(q, "der"), {
          curve: q.parameters.value,
          privateKey: q.privateKey
        };
      default:
        throw new Error("unknown key type " + y);
    }
  }
  return d.signature = A.signature, parseAsn1 = d, parseAsn1;
}
const require$$4 = {
  "1.3.132.0.10": "secp256k1",
  "1.3.132.0.33": "p224",
  "1.2.840.10045.3.1.1": "p192",
  "1.2.840.10045.3.1.7": "p256",
  "1.3.132.0.34": "p384",
  "1.3.132.0.35": "p521"
};
var hasRequiredSign;
function requireSign() {
  if (hasRequiredSign)
    return sign.exports;
  hasRequiredSign = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireBrowser$8(), B = requireBrowserifyRsa(), M = requireElliptic().ec, P = requireBn(), r = requireParseAsn1(), S = require$$4, d = 1;
  function x(C, L, H, j, J) {
    var X = r(L);
    if (X.curve) {
      if (j !== "ecdsa" && j !== "ecdsa/rsa")
        throw new Error("wrong private key type");
      return m(C, X);
    } else if (X.type === "dsa") {
      if (j !== "dsa")
        throw new Error("wrong private key type");
      return f(C, X, H);
    }
    if (j !== "rsa" && j !== "ecdsa/rsa")
      throw new Error("wrong private key type");
    if (L.padding !== void 0 && L.padding !== d)
      throw new Error("illegal or unsupported padding mode");
    C = A.concat([J, C]);
    for (var ie = X.modulus.byteLength(), ne = [0, 1]; C.length + ne.length + 1 < ie; )
      ne.push(255);
    ne.push(0);
    for (var ee = -1; ++ee < C.length; )
      ne.push(C[ee]);
    var ue = B(ne, X);
    return ue;
  }
  function m(C, L) {
    var H = S[L.curve.join(".")];
    if (!H)
      throw new Error("unknown curve " + L.curve.join("."));
    var j = new M(H), J = j.keyFromPrivate(L.privateKey), X = J.sign(C);
    return A.from(X.toDER());
  }
  function f(C, L, H) {
    for (var j = L.params.priv_key, J = L.params.p, X = L.params.q, ie = L.params.g, ne = new P(0), ee, ue = R(C, X).mod(X), U = !1, E = q(j, X, C, H); U === !1; )
      ee = k(X, E, H), ne = $(ie, ee, J, X), U = ee.invm(X).imul(ue.add(j.mul(ne))).mod(X), U.cmpn(0) === 0 && (U = !1, ne = new P(0));
    return y(ne, U);
  }
  function y(C, L) {
    C = C.toArray(), L = L.toArray(), C[0] & 128 && (C = [0].concat(C)), L[0] & 128 && (L = [0].concat(L));
    var H = C.length + L.length + 4, j = [
      48,
      H,
      2,
      C.length
    ];
    return j = j.concat(C, [2, L.length], L), A.from(j);
  }
  function q(C, L, H, j) {
    if (C = A.from(C.toArray()), C.length < L.byteLength()) {
      var J = A.alloc(L.byteLength() - C.length);
      C = A.concat([J, C]);
    }
    var X = H.length, ie = I(H, L), ne = A.alloc(X);
    ne.fill(1);
    var ee = A.alloc(X);
    return ee = _(j, ee).update(ne).update(A.from([0])).update(C).update(ie).digest(), ne = _(j, ee).update(ne).digest(), ee = _(j, ee).update(ne).update(A.from([1])).update(C).update(ie).digest(), ne = _(j, ee).update(ne).digest(), { k: ee, v: ne };
  }
  function R(C, L) {
    var H = new P(C), j = (C.length << 3) - L.bitLength();
    return j > 0 && H.ishrn(j), H;
  }
  function I(C, L) {
    C = R(C, L), C = C.mod(L);
    var H = A.from(C.toArray());
    if (H.length < L.byteLength()) {
      var j = A.alloc(L.byteLength() - H.length);
      H = A.concat([j, H]);
    }
    return H;
  }
  function k(C, L, H) {
    var j, J;
    do {
      for (j = A.alloc(0); j.length * 8 < C.bitLength(); )
        L.v = _(H, L.k).update(L.v).digest(), j = A.concat([j, L.v]);
      J = R(j, C), L.k = _(H, L.k).update(L.v).update(A.from([0])).digest(), L.v = _(H, L.k).update(L.v).digest();
    } while (J.cmp(C) !== -1);
    return J;
  }
  function $(C, L, H, j) {
    return C.toRed(P.mont(H)).redPow(L).fromRed().mod(j);
  }
  return sign.exports = x, sign.exports.getKey = q, sign.exports.makeKey = k, sign.exports;
}
var verify_1, hasRequiredVerify;
function requireVerify() {
  if (hasRequiredVerify)
    return verify_1;
  hasRequiredVerify = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireBn(), B = requireElliptic().ec, M = requireParseAsn1(), P = require$$4;
  function r(m, f, y, q, R) {
    var I = M(y);
    if (I.type === "ec") {
      if (q !== "ecdsa" && q !== "ecdsa/rsa")
        throw new Error("wrong public key type");
      return S(m, f, I);
    } else if (I.type === "dsa") {
      if (q !== "dsa")
        throw new Error("wrong public key type");
      return d(m, f, I);
    }
    if (q !== "rsa" && q !== "ecdsa/rsa")
      throw new Error("wrong public key type");
    f = A.concat([R, f]);
    for (var k = I.modulus.byteLength(), $ = [1], C = 0; f.length + $.length + 2 < k; )
      $.push(255), C += 1;
    $.push(0);
    for (var L = -1; ++L < f.length; )
      $.push(f[L]);
    $ = A.from($);
    var H = _.mont(I.modulus);
    m = new _(m).toRed(H), m = m.redPow(new _(I.publicExponent)), m = A.from(m.fromRed().toArray());
    var j = C < 8 ? 1 : 0;
    for (k = Math.min(m.length, $.length), m.length !== $.length && (j = 1), L = -1; ++L < k; )
      j |= m[L] ^ $[L];
    return j === 0;
  }
  function S(m, f, y) {
    var q = P[y.data.algorithm.curve.join(".")];
    if (!q)
      throw new Error("unknown curve " + y.data.algorithm.curve.join("."));
    var R = new B(q), I = y.data.subjectPrivateKey.data;
    return R.verify(f, m, I);
  }
  function d(m, f, y) {
    var q = y.data.p, R = y.data.q, I = y.data.g, k = y.data.pub_key, $ = M.signature.decode(m, "der"), C = $.s, L = $.r;
    x(C, R), x(L, R);
    var H = _.mont(q), j = C.invm(R), J = I.toRed(H).redPow(new _(f).mul(j).mod(R)).fromRed().mul(k.toRed(H).redPow(L.mul(j).mod(R)).fromRed()).mod(q).mod(R);
    return J.cmp(L) === 0;
  }
  function x(m, f) {
    if (m.cmpn(0) <= 0)
      throw new Error("invalid sig");
    if (m.cmp(f) >= 0)
      throw new Error("invalid sig");
  }
  return verify_1 = r, verify_1;
}
var browser$3, hasRequiredBrowser$3;
function requireBrowser$3() {
  if (hasRequiredBrowser$3)
    return browser$3;
  hasRequiredBrowser$3 = 1;
  var A = requireSafeBuffer$1().Buffer, _ = requireBrowser$9(), B = requireReadableBrowser(), M = requireInherits_browser(), P = requireSign(), r = requireVerify(), S = require$$6;
  Object.keys(S).forEach(function(y) {
    S[y].id = A.from(S[y].id, "hex"), S[y.toLowerCase()] = S[y];
  });
  function d(y) {
    B.Writable.call(this);
    var q = S[y];
    if (!q)
      throw new Error("Unknown message digest");
    this._hashType = q.hash, this._hash = _(q.hash), this._tag = q.id, this._signType = q.sign;
  }
  M(d, B.Writable), d.prototype._write = function(q, R, I) {
    this._hash.update(q), I();
  }, d.prototype.update = function(q, R) {
    return this._hash.update(typeof q == "string" ? A.from(q, R) : q), this;
  }, d.prototype.sign = function(q, R) {
    this.end();
    var I = this._hash.digest(), k = P(I, q, this._hashType, this._signType, this._tag);
    return R ? k.toString(R) : k;
  };
  function x(y) {
    B.Writable.call(this);
    var q = S[y];
    if (!q)
      throw new Error("Unknown message digest");
    this._hash = _(q.hash), this._tag = q.id, this._signType = q.sign;
  }
  M(x, B.Writable), x.prototype._write = function(q, R, I) {
    this._hash.update(q), I();
  }, x.prototype.update = function(q, R) {
    return this._hash.update(typeof q == "string" ? A.from(q, R) : q), this;
  }, x.prototype.verify = function(q, R, I) {
    var k = typeof R == "string" ? A.from(R, I) : R;
    this.end();
    var $ = this._hash.digest();
    return r(k, $, q, this._signType, this._tag);
  };
  function m(y) {
    return new d(y);
  }
  function f(y) {
    return new x(y);
  }
  return browser$3 = {
    Sign: m,
    Verify: f,
    createSign: m,
    createVerify: f
  }, browser$3;
}
var browser$2, hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2)
    return browser$2;
  hasRequiredBrowser$2 = 1;
  var A = requireElliptic(), _ = requireBn$2();
  browser$2 = function(S) {
    return new M(S);
  };
  var B = {
    secp256k1: {
      name: "secp256k1",
      byteLength: 32
    },
    secp224r1: {
      name: "p224",
      byteLength: 28
    },
    prime256v1: {
      name: "p256",
      byteLength: 32
    },
    prime192v1: {
      name: "p192",
      byteLength: 24
    },
    ed25519: {
      name: "ed25519",
      byteLength: 32
    },
    secp384r1: {
      name: "p384",
      byteLength: 48
    },
    secp521r1: {
      name: "p521",
      byteLength: 66
    }
  };
  B.p224 = B.secp224r1, B.p256 = B.secp256r1 = B.prime256v1, B.p192 = B.secp192r1 = B.prime192v1, B.p384 = B.secp384r1, B.p521 = B.secp521r1;
  function M(r) {
    this.curveType = B[r], this.curveType || (this.curveType = {
      name: r
    }), this.curve = new A.ec(this.curveType.name), this.keys = void 0;
  }
  M.prototype.generateKeys = function(r, S) {
    return this.keys = this.curve.genKeyPair(), this.getPublicKey(r, S);
  }, M.prototype.computeSecret = function(r, S, d) {
    S = S || "utf8", bufferExports.Buffer.isBuffer(r) || (r = new bufferExports.Buffer(r, S));
    var x = this.curve.keyFromPublic(r).getPublic(), m = x.mul(this.keys.getPrivate()).getX();
    return P(m, d, this.curveType.byteLength);
  }, M.prototype.getPublicKey = function(r, S) {
    var d = this.keys.getPublic(S === "compressed", !0);
    return S === "hybrid" && (d[d.length - 1] % 2 ? d[0] = 7 : d[0] = 6), P(d, r);
  }, M.prototype.getPrivateKey = function(r) {
    return P(this.keys.getPrivate(), r);
  }, M.prototype.setPublicKey = function(r, S) {
    return S = S || "utf8", bufferExports.Buffer.isBuffer(r) || (r = new bufferExports.Buffer(r, S)), this.keys._importPublic(r), this;
  }, M.prototype.setPrivateKey = function(r, S) {
    S = S || "utf8", bufferExports.Buffer.isBuffer(r) || (r = new bufferExports.Buffer(r, S));
    var d = new _(r);
    return d = d.toString(16), this.keys = this.curve.genKeyPair(), this.keys._importPrivate(d), this;
  };
  function P(r, S, d) {
    Array.isArray(r) || (r = r.toArray());
    var x = new bufferExports.Buffer(r);
    if (d && x.length < d) {
      var m = new bufferExports.Buffer(d - x.length);
      m.fill(0), x = bufferExports.Buffer.concat([m, x]);
    }
    return S ? x.toString(S) : x;
  }
  return browser$2;
}
var browser$1 = {}, mgf, hasRequiredMgf;
function requireMgf() {
  if (hasRequiredMgf)
    return mgf;
  hasRequiredMgf = 1;
  var A = requireBrowser$9(), _ = requireSafeBuffer$1().Buffer;
  mgf = function(M, P) {
    for (var r = _.alloc(0), S = 0, d; r.length < P; )
      d = B(S++), r = _.concat([r, A("sha1").update(M).update(d).digest()]);
    return r.slice(0, P);
  };
  function B(M) {
    var P = _.allocUnsafe(4);
    return P.writeUInt32BE(M, 0), P;
  }
  return mgf;
}
var xor, hasRequiredXor;
function requireXor() {
  return hasRequiredXor || (hasRequiredXor = 1, xor = function(_, B) {
    for (var M = _.length, P = -1; ++P < M; )
      _[P] ^= B[P];
    return _;
  }), xor;
}
var withPublic_1, hasRequiredWithPublic;
function requireWithPublic() {
  if (hasRequiredWithPublic)
    return withPublic_1;
  hasRequiredWithPublic = 1;
  var A = requireBn$2(), _ = requireSafeBuffer$1().Buffer;
  function B(M, P) {
    return _.from(M.toRed(A.mont(P.modulus)).redPow(new A(P.publicExponent)).fromRed().toArray());
  }
  return withPublic_1 = B, withPublic_1;
}
var publicEncrypt, hasRequiredPublicEncrypt;
function requirePublicEncrypt() {
  if (hasRequiredPublicEncrypt)
    return publicEncrypt;
  hasRequiredPublicEncrypt = 1;
  var A = requireParseAsn1(), _ = requireBrowser$b(), B = requireBrowser$9(), M = requireMgf(), P = requireXor(), r = requireBn$2(), S = requireWithPublic(), d = requireBrowserifyRsa(), x = requireSafeBuffer$1().Buffer;
  publicEncrypt = function(R, I, k) {
    var $;
    R.padding ? $ = R.padding : k ? $ = 1 : $ = 4;
    var C = A(R), L;
    if ($ === 4)
      L = m(C, I);
    else if ($ === 1)
      L = f(C, I, k);
    else if ($ === 3) {
      if (L = new r(I), L.cmp(C.modulus) >= 0)
        throw new Error("data too long for modulus");
    } else
      throw new Error("unknown padding");
    return k ? d(L, C) : S(L, C);
  };
  function m(q, R) {
    var I = q.modulus.byteLength(), k = R.length, $ = B("sha1").update(x.alloc(0)).digest(), C = $.length, L = 2 * C;
    if (k > I - L - 2)
      throw new Error("message too long");
    var H = x.alloc(I - k - L - 2), j = I - C - 1, J = _(C), X = P(x.concat([$, H, x.alloc(1, 1), R], j), M(J, j)), ie = P(J, M(X, C));
    return new r(x.concat([x.alloc(1), ie, X], I));
  }
  function f(q, R, I) {
    var k = R.length, $ = q.modulus.byteLength();
    if (k > $ - 11)
      throw new Error("message too long");
    var C;
    return I ? C = x.alloc($ - k - 3, 255) : C = y($ - k - 3), new r(x.concat([x.from([0, I ? 1 : 2]), C, x.alloc(1), R], $));
  }
  function y(q) {
    for (var R = x.allocUnsafe(q), I = 0, k = _(q * 2), $ = 0, C; I < q; )
      $ === k.length && (k = _(q * 2), $ = 0), C = k[$++], C && (R[I++] = C);
    return R;
  }
  return publicEncrypt;
}
var privateDecrypt, hasRequiredPrivateDecrypt;
function requirePrivateDecrypt() {
  if (hasRequiredPrivateDecrypt)
    return privateDecrypt;
  hasRequiredPrivateDecrypt = 1;
  var A = requireParseAsn1(), _ = requireMgf(), B = requireXor(), M = requireBn$2(), P = requireBrowserifyRsa(), r = requireBrowser$9(), S = requireWithPublic(), d = requireSafeBuffer$1().Buffer;
  privateDecrypt = function(q, R, I) {
    var k;
    q.padding ? k = q.padding : I ? k = 1 : k = 4;
    var $ = A(q), C = $.modulus.byteLength();
    if (R.length > C || new M(R).cmp($.modulus) >= 0)
      throw new Error("decryption error");
    var L;
    I ? L = S(new M(R), $) : L = P(R, $);
    var H = d.alloc(C - L.length);
    if (L = d.concat([H, L], C), k === 4)
      return x($, L);
    if (k === 1)
      return m($, L, I);
    if (k === 3)
      return L;
    throw new Error("unknown padding");
  };
  function x(y, q) {
    var R = y.modulus.byteLength(), I = r("sha1").update(d.alloc(0)).digest(), k = I.length;
    if (q[0] !== 0)
      throw new Error("decryption error");
    var $ = q.slice(1, k + 1), C = q.slice(k + 1), L = B($, _(C, k)), H = B(C, _(L, R - k - 1));
    if (f(I, H.slice(0, k)))
      throw new Error("decryption error");
    for (var j = k; H[j] === 0; )
      j++;
    if (H[j++] !== 1)
      throw new Error("decryption error");
    return H.slice(j);
  }
  function m(y, q, R) {
    for (var I = q.slice(0, 2), k = 2, $ = 0; q[k++] !== 0; )
      if (k >= q.length) {
        $++;
        break;
      }
    var C = q.slice(2, k - 1);
    if ((I.toString("hex") !== "0002" && !R || I.toString("hex") !== "0001" && R) && $++, C.length < 8 && $++, $)
      throw new Error("decryption error");
    return q.slice(k);
  }
  function f(y, q) {
    y = d.from(y), q = d.from(q);
    var R = 0, I = y.length;
    y.length !== q.length && (R++, I = Math.min(y.length, q.length));
    for (var k = -1; ++k < I; )
      R += y[k] ^ q[k];
    return R;
  }
  return privateDecrypt;
}
var hasRequiredBrowser$1;
function requireBrowser$1() {
  return hasRequiredBrowser$1 || (hasRequiredBrowser$1 = 1, function(A) {
    A.publicEncrypt = requirePublicEncrypt(), A.privateDecrypt = requirePrivateDecrypt(), A.privateEncrypt = function(B, M) {
      return A.publicEncrypt(B, M, !0);
    }, A.publicDecrypt = function(B, M) {
      return A.privateDecrypt(B, M, !0);
    };
  }(browser$1)), browser$1;
}
var browser = {}, hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser)
    return browser;
  hasRequiredBrowser = 1;
  function A() {
    throw new Error(`secure random number generation not supported by this browser
use chrome, FireFox or Internet Explorer 11`);
  }
  var _ = requireSafeBuffer$1(), B = requireBrowser$b(), M = _.Buffer, P = _.kMaxLength, r = commonjsGlobal.crypto || commonjsGlobal.msCrypto, S = Math.pow(2, 32) - 1;
  function d(q, R) {
    if (typeof q != "number" || q !== q)
      throw new TypeError("offset must be a number");
    if (q > S || q < 0)
      throw new TypeError("offset must be a uint32");
    if (q > P || q > R)
      throw new RangeError("offset out of range");
  }
  function x(q, R, I) {
    if (typeof q != "number" || q !== q)
      throw new TypeError("size must be a number");
    if (q > S || q < 0)
      throw new TypeError("size must be a uint32");
    if (q + R > I || q > P)
      throw new RangeError("buffer too small");
  }
  r && r.getRandomValues || !process$1.browser ? (browser.randomFill = m, browser.randomFillSync = y) : (browser.randomFill = A, browser.randomFillSync = A);
  function m(q, R, I, k) {
    if (!M.isBuffer(q) && !(q instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    if (typeof R == "function")
      k = R, R = 0, I = q.length;
    else if (typeof I == "function")
      k = I, I = q.length - R;
    else if (typeof k != "function")
      throw new TypeError('"cb" argument must be a function');
    return d(R, q.length), x(I, R, q.length), f(q, R, I, k);
  }
  function f(q, R, I, k) {
    if (process$1.browser) {
      var $ = q.buffer, C = new Uint8Array($, R, I);
      if (r.getRandomValues(C), k) {
        process$1.nextTick(function() {
          k(null, q);
        });
        return;
      }
      return q;
    }
    if (k) {
      B(I, function(H, j) {
        if (H)
          return k(H);
        j.copy(q, R), k(null, q);
      });
      return;
    }
    var L = B(I);
    return L.copy(q, R), q;
  }
  function y(q, R, I) {
    if (typeof R > "u" && (R = 0), !M.isBuffer(q) && !(q instanceof commonjsGlobal.Uint8Array))
      throw new TypeError('"buf" argument must be a Buffer or Uint8Array');
    return d(R, q.length), I === void 0 && (I = q.length - R), x(I, R, q.length), f(q, R, I);
  }
  return browser;
}
var hasRequiredCryptoBrowserify;
function requireCryptoBrowserify() {
  if (hasRequiredCryptoBrowserify)
    return cryptoBrowserify;
  hasRequiredCryptoBrowserify = 1, cryptoBrowserify.randomBytes = cryptoBrowserify.rng = cryptoBrowserify.pseudoRandomBytes = cryptoBrowserify.prng = requireBrowser$b(), cryptoBrowserify.createHash = cryptoBrowserify.Hash = requireBrowser$9(), cryptoBrowserify.createHmac = cryptoBrowserify.Hmac = requireBrowser$8();
  var A = requireAlgos(), _ = Object.keys(A), B = ["sha1", "sha224", "sha256", "sha384", "sha512", "md5", "rmd160"].concat(_);
  cryptoBrowserify.getHashes = function() {
    return B;
  };
  var M = requireBrowser$7();
  cryptoBrowserify.pbkdf2 = M.pbkdf2, cryptoBrowserify.pbkdf2Sync = M.pbkdf2Sync;
  var P = requireBrowser$5();
  cryptoBrowserify.Cipher = P.Cipher, cryptoBrowserify.createCipher = P.createCipher, cryptoBrowserify.Cipheriv = P.Cipheriv, cryptoBrowserify.createCipheriv = P.createCipheriv, cryptoBrowserify.Decipher = P.Decipher, cryptoBrowserify.createDecipher = P.createDecipher, cryptoBrowserify.Decipheriv = P.Decipheriv, cryptoBrowserify.createDecipheriv = P.createDecipheriv, cryptoBrowserify.getCiphers = P.getCiphers, cryptoBrowserify.listCiphers = P.listCiphers;
  var r = requireBrowser$4();
  cryptoBrowserify.DiffieHellmanGroup = r.DiffieHellmanGroup, cryptoBrowserify.createDiffieHellmanGroup = r.createDiffieHellmanGroup, cryptoBrowserify.getDiffieHellman = r.getDiffieHellman, cryptoBrowserify.createDiffieHellman = r.createDiffieHellman, cryptoBrowserify.DiffieHellman = r.DiffieHellman;
  var S = requireBrowser$3();
  cryptoBrowserify.createSign = S.createSign, cryptoBrowserify.Sign = S.Sign, cryptoBrowserify.createVerify = S.createVerify, cryptoBrowserify.Verify = S.Verify, cryptoBrowserify.createECDH = requireBrowser$2();
  var d = requireBrowser$1();
  cryptoBrowserify.publicEncrypt = d.publicEncrypt, cryptoBrowserify.privateEncrypt = d.privateEncrypt, cryptoBrowserify.publicDecrypt = d.publicDecrypt, cryptoBrowserify.privateDecrypt = d.privateDecrypt;
  var x = requireBrowser();
  return cryptoBrowserify.randomFill = x.randomFill, cryptoBrowserify.randomFillSync = x.randomFillSync, cryptoBrowserify.createCredentials = function() {
    throw new Error([
      "sorry, createCredentials is not implemented yet",
      "we accept pull requests",
      "https://github.com/crypto-browserify/crypto-browserify"
    ].join(`
`));
  }, cryptoBrowserify.constants = {
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    NPN_ENABLED: 1,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
  }, cryptoBrowserify;
}
(function(A) {
  /**
   * @license bcrypt.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
   * Released under the Apache License, Version 2.0
   * see: https://github.com/dcodeIO/bcrypt.js for details
   */
  (function(_, B) {
    typeof commonjsRequire == "function" && A && A.exports ? A.exports = B() : (_.dcodeIO = _.dcodeIO || {}).bcrypt = B();
  })(commonjsGlobal, function() {
    var _ = {}, B = null;
    function M(U) {
      if (A && A.exports)
        try {
          return requireCryptoBrowserify().randomBytes(U);
        } catch {
        }
      try {
        var E;
        return (self.crypto || self.msCrypto).getRandomValues(E = new Uint32Array(U)), Array.prototype.slice.call(E);
      } catch {
      }
      if (!B)
        throw Error("Neither WebCryptoAPI nor a crypto module is available. Use bcrypt.setRandomFallback to set an alternative");
      return B(U);
    }
    var P = !1;
    try {
      M(1), P = !0;
    } catch {
    }
    B = null, _.setRandomFallback = function(U) {
      B = U;
    }, _.genSaltSync = function(U, E) {
      if (U = U || k, typeof U != "number")
        throw Error("Illegal arguments: " + typeof U + ", " + typeof E);
      U < 4 ? U = 4 : U > 31 && (U = 31);
      var o = [];
      return o.push("$2a$"), U < 10 && o.push("0"), o.push(U.toString()), o.push("$"), o.push(y(M(I), I)), o.join("");
    }, _.genSalt = function(U, E, o) {
      if (typeof E == "function" && (o = E, E = void 0), typeof U == "function" && (o = U, U = void 0), typeof U > "u")
        U = k;
      else if (typeof U != "number")
        throw Error("illegal arguments: " + typeof U);
      function e(t) {
        S(function() {
          try {
            t(null, _.genSaltSync(U));
          } catch (v) {
            t(v);
          }
        });
      }
      if (o) {
        if (typeof o != "function")
          throw Error("Illegal callback: " + typeof o);
        e(o);
      } else
        return new Promise(function(t, v) {
          e(function(g, h) {
            if (g) {
              v(g);
              return;
            }
            t(h);
          });
        });
    }, _.hashSync = function(U, E) {
      if (typeof E > "u" && (E = k), typeof E == "number" && (E = _.genSaltSync(E)), typeof U != "string" || typeof E != "string")
        throw Error("Illegal arguments: " + typeof U + ", " + typeof E);
      return ue(U, E);
    }, _.hash = function(U, E, o, e) {
      function t(v) {
        typeof U == "string" && typeof E == "number" ? _.genSalt(E, function(g, h) {
          ue(U, h, v, e);
        }) : typeof U == "string" && typeof E == "string" ? ue(U, E, v, e) : S(v.bind(this, Error("Illegal arguments: " + typeof U + ", " + typeof E)));
      }
      if (o) {
        if (typeof o != "function")
          throw Error("Illegal callback: " + typeof o);
        t(o);
      } else
        return new Promise(function(v, g) {
          t(function(h, b) {
            if (h) {
              g(h);
              return;
            }
            v(b);
          });
        });
    };
    function r(U, E) {
      for (var o = 0, e = 0, t = 0, v = U.length; t < v; ++t)
        U.charCodeAt(t) === E.charCodeAt(t) ? ++o : ++e;
      return o < 0 ? !1 : e === 0;
    }
    _.compareSync = function(U, E) {
      if (typeof U != "string" || typeof E != "string")
        throw Error("Illegal arguments: " + typeof U + ", " + typeof E);
      return E.length !== 60 ? !1 : r(_.hashSync(U, E.substr(0, E.length - 31)), E);
    }, _.compare = function(U, E, o, e) {
      function t(v) {
        if (typeof U != "string" || typeof E != "string") {
          S(v.bind(this, Error("Illegal arguments: " + typeof U + ", " + typeof E)));
          return;
        }
        if (E.length !== 60) {
          S(v.bind(this, null, !1));
          return;
        }
        _.hash(U, E.substr(0, 29), function(g, h) {
          g ? v(g) : v(null, r(h, E));
        }, e);
      }
      if (o) {
        if (typeof o != "function")
          throw Error("Illegal callback: " + typeof o);
        t(o);
      } else
        return new Promise(function(v, g) {
          t(function(h, b) {
            if (h) {
              g(h);
              return;
            }
            v(b);
          });
        });
    }, _.getRounds = function(U) {
      if (typeof U != "string")
        throw Error("Illegal arguments: " + typeof U);
      return parseInt(U.split("$")[2], 10);
    }, _.getSalt = function(U) {
      if (typeof U != "string")
        throw Error("Illegal arguments: " + typeof U);
      if (U.length !== 60)
        throw Error("Illegal hash length: " + U.length + " != 60");
      return U.substring(0, 29);
    };
    var S = typeof process$1 < "u" && process$1 && typeof process$1.nextTick == "function" ? typeof setImmediate == "function" ? setImmediate : process$1.nextTick : setTimeout;
    function d(U) {
      var E = [], o = 0;
      return R.encodeUTF16toUTF8(function() {
        return o >= U.length ? null : U.charCodeAt(o++);
      }, function(e) {
        E.push(e);
      }), E;
    }
    var x = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), m = [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      0,
      1,
      54,
      55,
      56,
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
      49,
      50,
      51,
      52,
      53,
      -1,
      -1,
      -1,
      -1,
      -1
    ], f = String.fromCharCode;
    function y(U, E) {
      var o = 0, e = [], t, v;
      if (E <= 0 || E > U.length)
        throw Error("Illegal len: " + E);
      for (; o < E; ) {
        if (t = U[o++] & 255, e.push(x[t >> 2 & 63]), t = (t & 3) << 4, o >= E) {
          e.push(x[t & 63]);
          break;
        }
        if (v = U[o++] & 255, t |= v >> 4 & 15, e.push(x[t & 63]), t = (v & 15) << 2, o >= E) {
          e.push(x[t & 63]);
          break;
        }
        v = U[o++] & 255, t |= v >> 6 & 3, e.push(x[t & 63]), e.push(x[v & 63]);
      }
      return e.join("");
    }
    function q(U, E) {
      var o = 0, e = U.length, t = 0, v = [], g, h, b, p, w, a;
      if (E <= 0)
        throw Error("Illegal len: " + E);
      for (; o < e - 1 && t < E && (a = U.charCodeAt(o++), g = a < m.length ? m[a] : -1, a = U.charCodeAt(o++), h = a < m.length ? m[a] : -1, !(g == -1 || h == -1 || (w = g << 2 >>> 0, w |= (h & 48) >> 4, v.push(f(w)), ++t >= E || o >= e) || (a = U.charCodeAt(o++), b = a < m.length ? m[a] : -1, b == -1) || (w = (h & 15) << 4 >>> 0, w |= (b & 60) >> 2, v.push(f(w)), ++t >= E || o >= e))); )
        a = U.charCodeAt(o++), p = a < m.length ? m[a] : -1, w = (b & 3) << 6 >>> 0, w |= p, v.push(f(w)), ++t;
      var T = [];
      for (o = 0; o < t; o++)
        T.push(v[o].charCodeAt(0));
      return T;
    }
    var R = function() {
      var U = {};
      return U.MAX_CODEPOINT = 1114111, U.encodeUTF8 = function(E, o) {
        var e = null;
        for (typeof E == "number" && (e = E, E = function() {
          return null;
        }); e !== null || (e = E()) !== null; )
          e < 128 ? o(e & 127) : e < 2048 ? (o(e >> 6 & 31 | 192), o(e & 63 | 128)) : e < 65536 ? (o(e >> 12 & 15 | 224), o(e >> 6 & 63 | 128), o(e & 63 | 128)) : (o(e >> 18 & 7 | 240), o(e >> 12 & 63 | 128), o(e >> 6 & 63 | 128), o(e & 63 | 128)), e = null;
      }, U.decodeUTF8 = function(E, o) {
        for (var e, t, v, g, h = function(b) {
          b = b.slice(0, b.indexOf(null));
          var p = Error(b.toString());
          throw p.name = "TruncatedError", p.bytes = b, p;
        }; (e = E()) !== null; )
          if (!(e & 128))
            o(e);
          else if ((e & 224) === 192)
            (t = E()) === null && h([e, t]), o((e & 31) << 6 | t & 63);
          else if ((e & 240) === 224)
            ((t = E()) === null || (v = E()) === null) && h([e, t, v]), o((e & 15) << 12 | (t & 63) << 6 | v & 63);
          else if ((e & 248) === 240)
            ((t = E()) === null || (v = E()) === null || (g = E()) === null) && h([e, t, v, g]), o((e & 7) << 18 | (t & 63) << 12 | (v & 63) << 6 | g & 63);
          else
            throw RangeError("Illegal starting byte: " + e);
      }, U.UTF16toUTF8 = function(E, o) {
        for (var e, t = null; (e = t !== null ? t : E()) !== null; ) {
          if (e >= 55296 && e <= 57343 && (t = E()) !== null && t >= 56320 && t <= 57343) {
            o((e - 55296) * 1024 + t - 56320 + 65536), t = null;
            continue;
          }
          o(e);
        }
        t !== null && o(t);
      }, U.UTF8toUTF16 = function(E, o) {
        var e = null;
        for (typeof E == "number" && (e = E, E = function() {
          return null;
        }); e !== null || (e = E()) !== null; )
          e <= 65535 ? o(e) : (e -= 65536, o((e >> 10) + 55296), o(e % 1024 + 56320)), e = null;
      }, U.encodeUTF16toUTF8 = function(E, o) {
        U.UTF16toUTF8(E, function(e) {
          U.encodeUTF8(e, o);
        });
      }, U.decodeUTF8toUTF16 = function(E, o) {
        U.decodeUTF8(E, function(e) {
          U.UTF8toUTF16(e, o);
        });
      }, U.calculateCodePoint = function(E) {
        return E < 128 ? 1 : E < 2048 ? 2 : E < 65536 ? 3 : 4;
      }, U.calculateUTF8 = function(E) {
        for (var o, e = 0; (o = E()) !== null; )
          e += U.calculateCodePoint(o);
        return e;
      }, U.calculateUTF16asUTF8 = function(E) {
        var o = 0, e = 0;
        return U.UTF16toUTF8(E, function(t) {
          ++o, e += U.calculateCodePoint(t);
        }), [o, e];
      }, U;
    }();
    Date.now = Date.now || function() {
      return +/* @__PURE__ */ new Date();
    };
    var I = 16, k = 10, $ = 16, C = 100, L = [
      608135816,
      2242054355,
      320440878,
      57701188,
      2752067618,
      698298832,
      137296536,
      3964562569,
      1160258022,
      953160567,
      3193202383,
      887688300,
      3232508343,
      3380367581,
      1065670069,
      3041331479,
      2450970073,
      2306472731
    ], H = [
      3509652390,
      2564797868,
      805139163,
      3491422135,
      3101798381,
      1780907670,
      3128725573,
      4046225305,
      614570311,
      3012652279,
      134345442,
      2240740374,
      1667834072,
      1901547113,
      2757295779,
      4103290238,
      227898511,
      1921955416,
      1904987480,
      2182433518,
      2069144605,
      3260701109,
      2620446009,
      720527379,
      3318853667,
      677414384,
      3393288472,
      3101374703,
      2390351024,
      1614419982,
      1822297739,
      2954791486,
      3608508353,
      3174124327,
      2024746970,
      1432378464,
      3864339955,
      2857741204,
      1464375394,
      1676153920,
      1439316330,
      715854006,
      3033291828,
      289532110,
      2706671279,
      2087905683,
      3018724369,
      1668267050,
      732546397,
      1947742710,
      3462151702,
      2609353502,
      2950085171,
      1814351708,
      2050118529,
      680887927,
      999245976,
      1800124847,
      3300911131,
      1713906067,
      1641548236,
      4213287313,
      1216130144,
      1575780402,
      4018429277,
      3917837745,
      3693486850,
      3949271944,
      596196993,
      3549867205,
      258830323,
      2213823033,
      772490370,
      2760122372,
      1774776394,
      2652871518,
      566650946,
      4142492826,
      1728879713,
      2882767088,
      1783734482,
      3629395816,
      2517608232,
      2874225571,
      1861159788,
      326777828,
      3124490320,
      2130389656,
      2716951837,
      967770486,
      1724537150,
      2185432712,
      2364442137,
      1164943284,
      2105845187,
      998989502,
      3765401048,
      2244026483,
      1075463327,
      1455516326,
      1322494562,
      910128902,
      469688178,
      1117454909,
      936433444,
      3490320968,
      3675253459,
      1240580251,
      122909385,
      2157517691,
      634681816,
      4142456567,
      3825094682,
      3061402683,
      2540495037,
      79693498,
      3249098678,
      1084186820,
      1583128258,
      426386531,
      1761308591,
      1047286709,
      322548459,
      995290223,
      1845252383,
      2603652396,
      3431023940,
      2942221577,
      3202600964,
      3727903485,
      1712269319,
      422464435,
      3234572375,
      1170764815,
      3523960633,
      3117677531,
      1434042557,
      442511882,
      3600875718,
      1076654713,
      1738483198,
      4213154764,
      2393238008,
      3677496056,
      1014306527,
      4251020053,
      793779912,
      2902807211,
      842905082,
      4246964064,
      1395751752,
      1040244610,
      2656851899,
      3396308128,
      445077038,
      3742853595,
      3577915638,
      679411651,
      2892444358,
      2354009459,
      1767581616,
      3150600392,
      3791627101,
      3102740896,
      284835224,
      4246832056,
      1258075500,
      768725851,
      2589189241,
      3069724005,
      3532540348,
      1274779536,
      3789419226,
      2764799539,
      1660621633,
      3471099624,
      4011903706,
      913787905,
      3497959166,
      737222580,
      2514213453,
      2928710040,
      3937242737,
      1804850592,
      3499020752,
      2949064160,
      2386320175,
      2390070455,
      2415321851,
      4061277028,
      2290661394,
      2416832540,
      1336762016,
      1754252060,
      3520065937,
      3014181293,
      791618072,
      3188594551,
      3933548030,
      2332172193,
      3852520463,
      3043980520,
      413987798,
      3465142937,
      3030929376,
      4245938359,
      2093235073,
      3534596313,
      375366246,
      2157278981,
      2479649556,
      555357303,
      3870105701,
      2008414854,
      3344188149,
      4221384143,
      3956125452,
      2067696032,
      3594591187,
      2921233993,
      2428461,
      544322398,
      577241275,
      1471733935,
      610547355,
      4027169054,
      1432588573,
      1507829418,
      2025931657,
      3646575487,
      545086370,
      48609733,
      2200306550,
      1653985193,
      298326376,
      1316178497,
      3007786442,
      2064951626,
      458293330,
      2589141269,
      3591329599,
      3164325604,
      727753846,
      2179363840,
      146436021,
      1461446943,
      4069977195,
      705550613,
      3059967265,
      3887724982,
      4281599278,
      3313849956,
      1404054877,
      2845806497,
      146425753,
      1854211946,
      1266315497,
      3048417604,
      3681880366,
      3289982499,
      290971e4,
      1235738493,
      2632868024,
      2414719590,
      3970600049,
      1771706367,
      1449415276,
      3266420449,
      422970021,
      1963543593,
      2690192192,
      3826793022,
      1062508698,
      1531092325,
      1804592342,
      2583117782,
      2714934279,
      4024971509,
      1294809318,
      4028980673,
      1289560198,
      2221992742,
      1669523910,
      35572830,
      157838143,
      1052438473,
      1016535060,
      1802137761,
      1753167236,
      1386275462,
      3080475397,
      2857371447,
      1040679964,
      2145300060,
      2390574316,
      1461121720,
      2956646967,
      4031777805,
      4028374788,
      33600511,
      2920084762,
      1018524850,
      629373528,
      3691585981,
      3515945977,
      2091462646,
      2486323059,
      586499841,
      988145025,
      935516892,
      3367335476,
      2599673255,
      2839830854,
      265290510,
      3972581182,
      2759138881,
      3795373465,
      1005194799,
      847297441,
      406762289,
      1314163512,
      1332590856,
      1866599683,
      4127851711,
      750260880,
      613907577,
      1450815602,
      3165620655,
      3734664991,
      3650291728,
      3012275730,
      3704569646,
      1427272223,
      778793252,
      1343938022,
      2676280711,
      2052605720,
      1946737175,
      3164576444,
      3914038668,
      3967478842,
      3682934266,
      1661551462,
      3294938066,
      4011595847,
      840292616,
      3712170807,
      616741398,
      312560963,
      711312465,
      1351876610,
      322626781,
      1910503582,
      271666773,
      2175563734,
      1594956187,
      70604529,
      3617834859,
      1007753275,
      1495573769,
      4069517037,
      2549218298,
      2663038764,
      504708206,
      2263041392,
      3941167025,
      2249088522,
      1514023603,
      1998579484,
      1312622330,
      694541497,
      2582060303,
      2151582166,
      1382467621,
      776784248,
      2618340202,
      3323268794,
      2497899128,
      2784771155,
      503983604,
      4076293799,
      907881277,
      423175695,
      432175456,
      1378068232,
      4145222326,
      3954048622,
      3938656102,
      3820766613,
      2793130115,
      2977904593,
      26017576,
      3274890735,
      3194772133,
      1700274565,
      1756076034,
      4006520079,
      3677328699,
      720338349,
      1533947780,
      354530856,
      688349552,
      3973924725,
      1637815568,
      332179504,
      3949051286,
      53804574,
      2852348879,
      3044236432,
      1282449977,
      3583942155,
      3416972820,
      4006381244,
      1617046695,
      2628476075,
      3002303598,
      1686838959,
      431878346,
      2686675385,
      1700445008,
      1080580658,
      1009431731,
      832498133,
      3223435511,
      2605976345,
      2271191193,
      2516031870,
      1648197032,
      4164389018,
      2548247927,
      300782431,
      375919233,
      238389289,
      3353747414,
      2531188641,
      2019080857,
      1475708069,
      455242339,
      2609103871,
      448939670,
      3451063019,
      1395535956,
      2413381860,
      1841049896,
      1491858159,
      885456874,
      4264095073,
      4001119347,
      1565136089,
      3898914787,
      1108368660,
      540939232,
      1173283510,
      2745871338,
      3681308437,
      4207628240,
      3343053890,
      4016749493,
      1699691293,
      1103962373,
      3625875870,
      2256883143,
      3830138730,
      1031889488,
      3479347698,
      1535977030,
      4236805024,
      3251091107,
      2132092099,
      1774941330,
      1199868427,
      1452454533,
      157007616,
      2904115357,
      342012276,
      595725824,
      1480756522,
      206960106,
      497939518,
      591360097,
      863170706,
      2375253569,
      3596610801,
      1814182875,
      2094937945,
      3421402208,
      1082520231,
      3463918190,
      2785509508,
      435703966,
      3908032597,
      1641649973,
      2842273706,
      3305899714,
      1510255612,
      2148256476,
      2655287854,
      3276092548,
      4258621189,
      236887753,
      3681803219,
      274041037,
      1734335097,
      3815195456,
      3317970021,
      1899903192,
      1026095262,
      4050517792,
      356393447,
      2410691914,
      3873677099,
      3682840055,
      3913112168,
      2491498743,
      4132185628,
      2489919796,
      1091903735,
      1979897079,
      3170134830,
      3567386728,
      3557303409,
      857797738,
      1136121015,
      1342202287,
      507115054,
      2535736646,
      337727348,
      3213592640,
      1301675037,
      2528481711,
      1895095763,
      1721773893,
      3216771564,
      62756741,
      2142006736,
      835421444,
      2531993523,
      1442658625,
      3659876326,
      2882144922,
      676362277,
      1392781812,
      170690266,
      3921047035,
      1759253602,
      3611846912,
      1745797284,
      664899054,
      1329594018,
      3901205900,
      3045908486,
      2062866102,
      2865634940,
      3543621612,
      3464012697,
      1080764994,
      553557557,
      3656615353,
      3996768171,
      991055499,
      499776247,
      1265440854,
      648242737,
      3940784050,
      980351604,
      3713745714,
      1749149687,
      3396870395,
      4211799374,
      3640570775,
      1161844396,
      3125318951,
      1431517754,
      545492359,
      4268468663,
      3499529547,
      1437099964,
      2702547544,
      3433638243,
      2581715763,
      2787789398,
      1060185593,
      1593081372,
      2418618748,
      4260947970,
      69676912,
      2159744348,
      86519011,
      2512459080,
      3838209314,
      1220612927,
      3339683548,
      133810670,
      1090789135,
      1078426020,
      1569222167,
      845107691,
      3583754449,
      4072456591,
      1091646820,
      628848692,
      1613405280,
      3757631651,
      526609435,
      236106946,
      48312990,
      2942717905,
      3402727701,
      1797494240,
      859738849,
      992217954,
      4005476642,
      2243076622,
      3870952857,
      3732016268,
      765654824,
      3490871365,
      2511836413,
      1685915746,
      3888969200,
      1414112111,
      2273134842,
      3281911079,
      4080962846,
      172450625,
      2569994100,
      980381355,
      4109958455,
      2819808352,
      2716589560,
      2568741196,
      3681446669,
      3329971472,
      1835478071,
      660984891,
      3704678404,
      4045999559,
      3422617507,
      3040415634,
      1762651403,
      1719377915,
      3470491036,
      2693910283,
      3642056355,
      3138596744,
      1364962596,
      2073328063,
      1983633131,
      926494387,
      3423689081,
      2150032023,
      4096667949,
      1749200295,
      3328846651,
      309677260,
      2016342300,
      1779581495,
      3079819751,
      111262694,
      1274766160,
      443224088,
      298511866,
      1025883608,
      3806446537,
      1145181785,
      168956806,
      3641502830,
      3584813610,
      1689216846,
      3666258015,
      3200248200,
      1692713982,
      2646376535,
      4042768518,
      1618508792,
      1610833997,
      3523052358,
      4130873264,
      2001055236,
      3610705100,
      2202168115,
      4028541809,
      2961195399,
      1006657119,
      2006996926,
      3186142756,
      1430667929,
      3210227297,
      1314452623,
      4074634658,
      4101304120,
      2273951170,
      1399257539,
      3367210612,
      3027628629,
      1190975929,
      2062231137,
      2333990788,
      2221543033,
      2438960610,
      1181637006,
      548689776,
      2362791313,
      3372408396,
      3104550113,
      3145860560,
      296247880,
      1970579870,
      3078560182,
      3769228297,
      1714227617,
      3291629107,
      3898220290,
      166772364,
      1251581989,
      493813264,
      448347421,
      195405023,
      2709975567,
      677966185,
      3703036547,
      1463355134,
      2715995803,
      1338867538,
      1343315457,
      2802222074,
      2684532164,
      233230375,
      2599980071,
      2000651841,
      3277868038,
      1638401717,
      4028070440,
      3237316320,
      6314154,
      819756386,
      300326615,
      590932579,
      1405279636,
      3267499572,
      3150704214,
      2428286686,
      3959192993,
      3461946742,
      1862657033,
      1266418056,
      963775037,
      2089974820,
      2263052895,
      1917689273,
      448879540,
      3550394620,
      3981727096,
      150775221,
      3627908307,
      1303187396,
      508620638,
      2975983352,
      2726630617,
      1817252668,
      1876281319,
      1457606340,
      908771278,
      3720792119,
      3617206836,
      2455994898,
      1729034894,
      1080033504,
      976866871,
      3556439503,
      2881648439,
      1522871579,
      1555064734,
      1336096578,
      3548522304,
      2579274686,
      3574697629,
      3205460757,
      3593280638,
      3338716283,
      3079412587,
      564236357,
      2993598910,
      1781952180,
      1464380207,
      3163844217,
      3332601554,
      1699332808,
      1393555694,
      1183702653,
      3581086237,
      1288719814,
      691649499,
      2847557200,
      2895455976,
      3193889540,
      2717570544,
      1781354906,
      1676643554,
      2592534050,
      3230253752,
      1126444790,
      2770207658,
      2633158820,
      2210423226,
      2615765581,
      2414155088,
      3127139286,
      673620729,
      2805611233,
      1269405062,
      4015350505,
      3341807571,
      4149409754,
      1057255273,
      2012875353,
      2162469141,
      2276492801,
      2601117357,
      993977747,
      3918593370,
      2654263191,
      753973209,
      36408145,
      2530585658,
      25011837,
      3520020182,
      2088578344,
      530523599,
      2918365339,
      1524020338,
      1518925132,
      3760827505,
      3759777254,
      1202760957,
      3985898139,
      3906192525,
      674977740,
      4174734889,
      2031300136,
      2019492241,
      3983892565,
      4153806404,
      3822280332,
      352677332,
      2297720250,
      60907813,
      90501309,
      3286998549,
      1016092578,
      2535922412,
      2839152426,
      457141659,
      509813237,
      4120667899,
      652014361,
      1966332200,
      2975202805,
      55981186,
      2327461051,
      676427537,
      3255491064,
      2882294119,
      3433927263,
      1307055953,
      942726286,
      933058658,
      2468411793,
      3933900994,
      4215176142,
      1361170020,
      2001714738,
      2830558078,
      3274259782,
      1222529897,
      1679025792,
      2729314320,
      3714953764,
      1770335741,
      151462246,
      3013232138,
      1682292957,
      1483529935,
      471910574,
      1539241949,
      458788160,
      3436315007,
      1807016891,
      3718408830,
      978976581,
      1043663428,
      3165965781,
      1927990952,
      4200891579,
      2372276910,
      3208408903,
      3533431907,
      1412390302,
      2931980059,
      4132332400,
      1947078029,
      3881505623,
      4168226417,
      2941484381,
      1077988104,
      1320477388,
      886195818,
      18198404,
      3786409e3,
      2509781533,
      112762804,
      3463356488,
      1866414978,
      891333506,
      18488651,
      661792760,
      1628790961,
      3885187036,
      3141171499,
      876946877,
      2693282273,
      1372485963,
      791857591,
      2686433993,
      3759982718,
      3167212022,
      3472953795,
      2716379847,
      445679433,
      3561995674,
      3504004811,
      3574258232,
      54117162,
      3331405415,
      2381918588,
      3769707343,
      4154350007,
      1140177722,
      4074052095,
      668550556,
      3214352940,
      367459370,
      261225585,
      2610173221,
      4209349473,
      3468074219,
      3265815641,
      314222801,
      3066103646,
      3808782860,
      282218597,
      3406013506,
      3773591054,
      379116347,
      1285071038,
      846784868,
      2669647154,
      3771962079,
      3550491691,
      2305946142,
      453669953,
      1268987020,
      3317592352,
      3279303384,
      3744833421,
      2610507566,
      3859509063,
      266596637,
      3847019092,
      517658769,
      3462560207,
      3443424879,
      370717030,
      4247526661,
      2224018117,
      4143653529,
      4112773975,
      2788324899,
      2477274417,
      1456262402,
      2901442914,
      1517677493,
      1846949527,
      2295493580,
      3734397586,
      2176403920,
      1280348187,
      1908823572,
      3871786941,
      846861322,
      1172426758,
      3287448474,
      3383383037,
      1655181056,
      3139813346,
      901632758,
      1897031941,
      2986607138,
      3066810236,
      3447102507,
      1393639104,
      373351379,
      950779232,
      625454576,
      3124240540,
      4148612726,
      2007998917,
      544563296,
      2244738638,
      2330496472,
      2058025392,
      1291430526,
      424198748,
      50039436,
      29584100,
      3605783033,
      2429876329,
      2791104160,
      1057563949,
      3255363231,
      3075367218,
      3463963227,
      1469046755,
      985887462
    ], j = [
      1332899944,
      1700884034,
      1701343084,
      1684370003,
      1668446532,
      1869963892
    ];
    function J(U, E, o, e) {
      var t, v = U[E], g = U[E + 1];
      return v ^= o[0], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[1], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[2], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[3], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[4], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[5], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[6], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[7], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[8], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[9], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[10], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[11], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[12], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[13], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[14], t = e[v >>> 24], t += e[256 | v >> 16 & 255], t ^= e[512 | v >> 8 & 255], t += e[768 | v & 255], g ^= t ^ o[15], t = e[g >>> 24], t += e[256 | g >> 16 & 255], t ^= e[512 | g >> 8 & 255], t += e[768 | g & 255], v ^= t ^ o[16], U[E] = g ^ o[$ + 1], U[E + 1] = v, U;
    }
    function X(U, E) {
      for (var o = 0, e = 0; o < 4; ++o)
        e = e << 8 | U[E] & 255, E = (E + 1) % U.length;
      return { key: e, offp: E };
    }
    function ie(U, E, o) {
      for (var e = 0, t = [0, 0], v = E.length, g = o.length, h, b = 0; b < v; b++)
        h = X(U, e), e = h.offp, E[b] = E[b] ^ h.key;
      for (b = 0; b < v; b += 2)
        t = J(t, 0, E, o), E[b] = t[0], E[b + 1] = t[1];
      for (b = 0; b < g; b += 2)
        t = J(t, 0, E, o), o[b] = t[0], o[b + 1] = t[1];
    }
    function ne(U, E, o, e) {
      for (var t = 0, v = [0, 0], g = o.length, h = e.length, b, p = 0; p < g; p++)
        b = X(E, t), t = b.offp, o[p] = o[p] ^ b.key;
      for (t = 0, p = 0; p < g; p += 2)
        b = X(U, t), t = b.offp, v[0] ^= b.key, b = X(U, t), t = b.offp, v[1] ^= b.key, v = J(v, 0, o, e), o[p] = v[0], o[p + 1] = v[1];
      for (p = 0; p < h; p += 2)
        b = X(U, t), t = b.offp, v[0] ^= b.key, b = X(U, t), t = b.offp, v[1] ^= b.key, v = J(v, 0, o, e), e[p] = v[0], e[p + 1] = v[1];
    }
    function ee(U, E, o, e, t) {
      var v = j.slice(), g = v.length, h;
      if (o < 4 || o > 31)
        if (h = Error("Illegal number of rounds (4-31): " + o), e) {
          S(e.bind(this, h));
          return;
        } else
          throw h;
      if (E.length !== I)
        if (h = Error("Illegal salt length: " + E.length + " != " + I), e) {
          S(e.bind(this, h));
          return;
        } else
          throw h;
      o = 1 << o >>> 0;
      var b, p, w = 0, a;
      Int32Array ? (b = new Int32Array(L), p = new Int32Array(H)) : (b = L.slice(), p = H.slice()), ne(E, U, b, p);
      function T() {
        if (t && t(w / o), w < o)
          for (var Y = Date.now(); w < o && (w = w + 1, ie(U, b, p), ie(E, b, p), !(Date.now() - Y > C)); )
            ;
        else {
          for (w = 0; w < 64; w++)
            for (a = 0; a < g >> 1; a++)
              J(v, a << 1, b, p);
          var z = [];
          for (w = 0; w < g; w++)
            z.push((v[w] >> 24 & 255) >>> 0), z.push((v[w] >> 16 & 255) >>> 0), z.push((v[w] >> 8 & 255) >>> 0), z.push((v[w] & 255) >>> 0);
          if (e) {
            e(null, z);
            return;
          } else
            return z;
        }
        e && S(T);
      }
      if (typeof e < "u")
        T();
      else
        for (var V; ; )
          if (typeof (V = T()) < "u")
            return V || [];
    }
    function ue(U, E, o, e) {
      var t;
      if (typeof U != "string" || typeof E != "string")
        if (t = Error("Invalid string / salt: Not a string"), o) {
          S(o.bind(this, t));
          return;
        } else
          throw t;
      var v, g;
      if (E.charAt(0) !== "$" || E.charAt(1) !== "2")
        if (t = Error("Invalid salt version: " + E.substring(0, 2)), o) {
          S(o.bind(this, t));
          return;
        } else
          throw t;
      if (E.charAt(2) === "$")
        v = "\0", g = 3;
      else {
        if (v = E.charAt(2), v !== "a" && v !== "b" && v !== "y" || E.charAt(3) !== "$")
          if (t = Error("Invalid salt revision: " + E.substring(2, 4)), o) {
            S(o.bind(this, t));
            return;
          } else
            throw t;
        g = 4;
      }
      if (E.charAt(g + 2) > "$")
        if (t = Error("Missing salt rounds"), o) {
          S(o.bind(this, t));
          return;
        } else
          throw t;
      var h = parseInt(E.substring(g, g + 1), 10) * 10, b = parseInt(E.substring(g + 1, g + 2), 10), p = h + b, w = E.substring(g + 3, g + 25);
      U += v >= "a" ? "\0" : "";
      var a = d(U), T = q(w, I);
      function V(Y) {
        var z = [];
        return z.push("$2"), v >= "a" && z.push(v), z.push("$"), p < 10 && z.push("0"), z.push(p.toString()), z.push("$"), z.push(y(T, T.length)), z.push(y(Y, j.length * 4 - 1)), z.join("");
      }
      if (typeof o > "u")
        return V(ee(a, T, p));
      ee(a, T, p, function(Y, z) {
        Y ? o(Y, null) : o(null, V(z));
      }, e);
    }
    return _.encodeBase64 = y, _.decodeBase64 = q, _;
  });
})(bcrypt$1);
var bcryptExports = bcrypt$1.exports;
const bcrypt = /* @__PURE__ */ getDefaultExportFromCjs(bcryptExports);
class FirebaseAuthAPI {
  constructor(_) {
    this.FIREBASE_AUTH_URL = "https://identitytoolkit.googleapis.com/v1/", this.BCRYPT_SALT = "$2a$10$QCJoWqnN.acrjPIgKYCthu";
    const B = new URL(this.FIREBASE_AUTH_URL);
    this.firebaseKey = _.apiKey, this.fetcher = new FetchAPI(B.toString());
  }
  checkError(_) {
    if (_.error)
      throw new Error(
        `Error code: ${_.error.code}, message: ${_.error.message}`
      );
  }
  async signUpWithEmailPassword(_, B, M = !0) {
    let P = B;
    M && (P = bcrypt.hashSync(B, this.BCRYPT_SALT));
    const r = JSON.stringify({
      email: _,
      password: P,
      returnSecureToken: !0
    }), S = await this.fetcher.send({
      url: "accounts:signUp",
      method: "POST",
      data: r,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(S.data), S.data;
  }
  async signInWithEmailPassword(_, B, M = !0) {
    let P = B;
    M && (P = bcrypt.hashSync(B, this.BCRYPT_SALT));
    const r = JSON.stringify({
      email: _,
      password: P,
      returnSecureToken: !0
    }), S = await this.fetcher.send({
      url: "accounts:signInWithPassword",
      method: "POST",
      data: r,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(S.data), S.data;
  }
  async getCurrentUser(_) {
    const B = JSON.stringify({
      idToken: _
    }), M = await this.fetcher.send({
      url: "accounts:lookup",
      method: "POST",
      data: B,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(M.data), M.data;
  }
  async getRefreshIdToken(_) {
    const B = JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: _
    }), M = await this.fetcher.send({
      url: "token",
      method: "POST",
      data: B,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    }), P = M.data;
    return this.checkError(M.data), P.id_token;
  }
  async resetPassword(_, B, M = !0) {
    let P = B;
    M && (P = bcrypt.hashSync(B, this.BCRYPT_SALT));
    const r = JSON.stringify({
      oobCode: _,
      newPassword: P
    }), S = await this.fetcher.send({
      url: "accounts:resetPassword",
      method: "POST",
      data: r,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(S.data), S.data;
  }
  async verifyEmail(_) {
    const B = JSON.stringify({
      oobCode: _
    }), M = await this.fetcher.send({
      url: "accounts:update",
      method: "POST",
      data: B,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(M.data), M.data;
  }
  async signInWithCustomToken(_) {
    const B = JSON.stringify({
      token: _,
      returnSecureToken: !0
    }), M = await this.fetcher.send({
      url: "accounts:signInWithCustomToken",
      data: B,
      query: {
        key: this.firebaseKey
      },
      method: "POST",
      withCredentials: !1
    });
    return this.checkError(M.data), {
      idToken: M.data.idToken,
      refreshToken: M.data.refreshToken
    };
  }
  async updatePassword(_, B) {
    const M = bcrypt.hashSync(B, this.BCRYPT_SALT), P = JSON.stringify({
      idToken: _,
      password: M,
      returnSecureToken: !0
    }), r = await this.fetcher.send({
      url: "accounts:update",
      method: "POST",
      data: P,
      query: {
        key: this.firebaseKey
      },
      withCredentials: !1
    });
    return this.checkError(r.data), r.data;
  }
}
var u = (A, _, B) => {
  if (!_.has(A))
    throw TypeError("Cannot " + B);
}, i = (A, _, B) => (u(A, _, "read from private field"), B ? B.call(A) : _.get(A)), n = (A, _, B) => {
  if (_.has(A))
    throw TypeError("Cannot add the same private member more than once");
  _ instanceof WeakSet ? _.add(A) : _.set(A, B);
}, l;
const s = class yr {
  static getLocalStorageEnabled() {
    let _ = !1;
    try {
      _ = window.localStorage && !0;
    } catch {
      _ = !1;
    }
    return _;
  }
  static setAllLocalStorage(_, B) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const M = JSON.stringify(B);
    localStorage.setItem(i(this, l) + _, M);
  }
  static setLocalStorage(_, B, M) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const P = this.getAllLocalStorage(_);
    if (P) {
      P[B] = M, localStorage.setItem(
        i(this, l) + _,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(P)
      );
      return;
    }
    const r = { [B]: M };
    localStorage.setItem(
      i(this, l) + _,
      // btoa(JSON.stringify(newData)),
      JSON.stringify(r)
    );
  }
  static getLocalStorage(_, B) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const M = this.getAllLocalStorage(_);
    try {
      if (M)
        return JSON.parse(M[B]);
    } catch {
      return M[B];
    }
  }
  static getAllLocalStorage(_) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    try {
      return localStorage.getItem(i(this, l) + _) ? (
        // ? JSON.parse(atob(localStorage.getItem(this.#COOKIE_NAME + appId)))
        JSON.parse(localStorage.getItem(i(this, l) + _))
      ) : void 0;
    } catch {
      return;
    }
  }
  static clearLocalStorage(_, B) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    if (this.getLocalStorage(_, B)) {
      const M = this.getAllLocalStorage(_);
      delete M[B], localStorage.setItem(
        i(this, l) + _,
        // btoa(JSON.stringify(localData)),
        JSON.stringify(M)
      );
    }
  }
  static clearAllLocalStorage(_) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    localStorage.removeItem(i(this, l) + _);
  }
  static setLoginUserLocalStorage(_, B, M) {
    if (!this.getLocalStorageEnabled()) {
      console.error(
        "Local storage is not available. We recommend using local storage to maintain login sessions."
      );
      return;
    }
    const P = {};
    return P["firebase:wepin"] = Object.assign(
      { provider: B == null ? void 0 : B.provider },
      B == null ? void 0 : B.token
    ), P["wepin:connectUser"] = {
      accessToken: M.token.access,
      refreshToken: M.token.refresh
    }, P.user_id = M.userInfo.userId, P.user_info = {
      status: "success",
      userInfo: {
        userId: M.userInfo.userId,
        email: M.userInfo.email,
        provider: B.provider,
        use2FA: M.userInfo.use2FA >= 2
      }
    }, P.user_status = {
      loginStatus: M.loginStatus,
      pinRequired: M.loginStatus === "registerRequired" ? M.pinRequired : !1
    }, M.loginStatus !== "pinRequired" && M.walletId && (P.wallet_id = M.walletId, P.user_info.walletId = M.walletId), P.oauth_provider_pending = B.provider, yr.setAllLocalStorage(_, P), {
      userInfo: P.user_info,
      connectUser: P["wepin:connectUser"]
    };
  }
};
l = /* @__PURE__ */ new WeakMap(), s.platform = "web", n(s, l, "wepin:auth:");
let c = s;
const isErrorResponse = (A) => {
  const _ = A.statusCode !== void 0 || A.status !== void 0, B = A.timestamp !== void 0 && A.message !== void 0 && A.path !== void 0;
  return _ && B;
}, isFirebaseErrorResponse = (A) => {
  var B, M;
  return A.error !== void 0 || ((B = A.error) == null ? void 0 : B.code) !== void 0 || ((M = A.error) == null ? void 0 : M.message) !== void 0;
}, getBaseUrl = (A) => {
  if (A.slice(0, 8) === "ak_live_")
    return "https://sdk.wepin.io/v1";
  if (A.slice(0, 8) === "ak_test_")
    return "https://stage-sdk.wepin.io/v1";
  if (A.slice(0, 7) === "ak_dev_")
    return "https://dev-sdk.wepin.io/v1";
  if (A.slice(0, 13) === "local_ak_dev_")
    return "https://local-sdk.wepin.io/v1";
  throw new Error("Invalid appKey");
};
class APIRequest {
  constructor({
    data: _,
    headers: B,
    url: M,
    query: P,
    withCredentials: r = !1,
    method: S
  }) {
    this.data = _, this.headers = B, this.url = M, this.query = P, this.withCredentials = r, this.method = S;
  }
}
const APIEvents = {
  request: "request",
  response: "response"
};
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(A) {
  return decodeURIComponent(atob(A).replace(/(.)/g, (_, B) => {
    let M = B.charCodeAt(0).toString(16).toUpperCase();
    return M.length < 2 && (M = "0" + M), "%" + M;
  }));
}
function base64UrlDecode(A) {
  let _ = A.replace(/-/g, "+").replace(/_/g, "/");
  switch (_.length % 4) {
    case 0:
      break;
    case 2:
      _ += "==";
      break;
    case 3:
      _ += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(_);
  } catch {
    return atob(_);
  }
}
function jwtDecode(A, _) {
  if (typeof A != "string")
    throw new InvalidTokenError("Invalid token specified: must be a string");
  _ || (_ = {});
  const B = _.header === !0 ? 0 : 1, M = A.split(".")[B];
  if (typeof M != "string")
    throw new InvalidTokenError(`Invalid token specified: missing part #${B + 1}`);
  let P;
  try {
    P = base64UrlDecode(M);
  } catch (r) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${B + 1} (${r.message})`);
  }
  try {
    return JSON.parse(P);
  } catch (r) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${B + 1} (${r.message})`);
  }
}
const checkJwtToken = () => {
  const _ = (M) => {
    var S;
    const P = M;
    return !P || ((S = jwtDecode(P)) == null ? void 0 : S.exp) <= Math.floor(Date.now() / 1e3) + 60;
  };
  return {
    // isExpiredAccessToken,
    checkTokenExpired: (M, P) => {
      if (!(M === "/app/info" || M === "/user/login" || M === "/user/oauth") && _(P)) {
        if (M !== "/access-token")
          throw new Error("token_expired");
        return;
      }
    }
  };
};
class WepinSDKFetchAPI extends FetchAPI {
  constructor(_, B) {
    super(), this.baseUrl = _, this.params = B, this.addListener(APIEvents.request, this.requestCallback), this.addListener(APIEvents.response, this.responseCallback);
  }
  async send(_, B) {
    await this.emitAsync(APIEvents.request, _, B || {});
    const { data: M, url: P, headers: r } = _, S = (() => {
      if (M instanceof FormData)
        return {};
    })();
    _.headers = Object.assign(r || {}, S);
    const d = await super.send(_, B);
    return this.setToken(P, d), await this.emitAsync(
      APIEvents.response,
      d,
      B || {}
    ), d;
  }
  setToken(_, B) {
    var M, P, r, S, d, x;
    isErrorResponse(B.data) || (_ === "user/login" && ((M = B.data) != null && M.token) ? this.params.wepinFetch.setToken({
      accessToken: (P = B.data) == null ? void 0 : P.token.access,
      refreshToken: (r = B.data) == null ? void 0 : r.token.refresh
    }) : _ === "/user/access-token" && ((S = B.data) != null && S.token) ? this.params.wepinFetch.setToken({
      accessToken: (d = B.data) == null ? void 0 : d.token,
      refreshToken: (x = this.params.wepinFetch.Token) == null ? void 0 : x.refreshToken
    }) : _ === "user/logout" && this.params.wepinFetch.setToken());
  }
  async requestCallback(_, B) {
    var M, P, r;
    try {
      _.headers || (_.headers = {}), _.headers["X-API-KEY"] = this.params.appKey;
      const S = this.params.domain && this.params.domain.includes("localhost") ? "" : this.params.domain;
      if (_.headers["X-SDK-TYPE"] = this.params.sdk.type, _.headers["X-SDK-VERSION"] = this.params.sdk.version, _.headers["X-API-DOMAIN"] = S, _.url === "/user/access-token" && (_.query = {
        refresh_token: (M = this.params.wepinFetch.Token) == null ? void 0 : M.refreshToken
      }), B != null && B.ignoreCheckToken)
        return;
      try {
        const x = (P = this.params.wepinFetch.Token) == null ? void 0 : P.accessToken, { checkTokenExpired: m } = checkJwtToken();
        m(_.url, x);
      } catch {
        const m = new APIRequest({
          url: "/user/access-token",
          method: "GET",
          withCredentials: !0
        });
        await this.send(m, { ignoreCheckToken: !0 });
      }
      const d = (r = this.params.wepinFetch.Token) == null ? void 0 : r.accessToken;
      d && (_.headers.Authorization = `Bearer ${d}`);
    } catch {
      throw new Error("Unauthorized Error");
    }
  }
  async responseCallback(_) {
    if (_.status === 401)
      throw new Error("Unauthorized Error");
  }
  // private setUserInfo(url: string, response: any) {
  //   if (!isErrorResponse(response.data) && response.data?.userInfo) {
  //     // set token
  //     if (url === 'user/login') {
  //       WepinStorage.setLocalStorage('userInfo', response.data?.userInfo)
  //       if (response.data?.walletId) {
  //         WepinStorage.setLocalStorage('walletId', response.data?.walletId)
  //       }
  //     } else if (url === '/app/register') {
  //       if (response.data?.walletId) {
  //         WepinStorage.setLocalStorage('walletId', response.data?.walletId)
  //       }
  //     }
  //   }
  // }
}
class UserAPI {
  constructor(_) {
    this.fetcher = _, this.basePath = "/user";
  }
  // 2.1 Check User Email
  async checkEmailExist(_) {
    const B = new APIRequest({
      url: `${this.basePath}/check-user`,
      method: "GET",
      query: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.2 Get User PW State
  async getUserPasswordState(_) {
    const B = new APIRequest({
      url: `${this.basePath}/password-state`,
      method: "GET",
      query: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.3 Provider Login
  async oAuth(_, B) {
    const M = new APIRequest({
      url: `${this.basePath}/oauth/login/${B.provider}`,
      method: "GET",
      query: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(M, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.4 Verify User Email
  async verify(_) {
    const B = new APIRequest({
      url: `${this.basePath}/verify`,
      method: "POST",
      data: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, {
      ignoreCheckToken: !0
    })).data;
  }
  // 2.5 Login
  async login(_) {
    const B = new APIRequest({
      url: `${this.basePath}/login`,
      method: "POST",
      data: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, { ignoreCheckToken: !0 })).data;
  }
  // 2.6 Update User PW State
  async updateUserPasswordState(_, B) {
    const M = new APIRequest({
      url: `${this.basePath}/${_.userId}/password-state`,
      method: "PATCH",
      data: B,
      withCredentials: !0
    });
    return (await this.fetcher.send(M)).data;
  }
  // 2.7 Update Terms Accepted
  async updateTermsAccepted(_, B) {
    const M = new APIRequest({
      url: `${this.basePath}/${_.userId}/terms-accepted`,
      method: "PATCH",
      data: B,
      withCredentials: !0
    });
    return (await this.fetcher.send(M)).data;
  }
  // 2.8 Get Access Token
  async refreshToken() {
    const _ = new APIRequest({
      url: `${this.basePath}/access-token`,
      method: "GET",
      // query: {
      //   refresh_token: WepinStorage.getLocalStorage('token')?.refreshToken,
      // },
      withCredentials: !0
    });
    return (await this.fetcher.send(_, { ignoreCheckToken: !0 })).data;
  }
  // 2.9 Get Public Key
  async fetchKey() {
    const _ = new APIRequest({
      url: `${this.basePath}/pubkey`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(_)).data;
  }
  // 2.11 Get Terms Accepted
  async getTermsAccepted(_) {
    const B = new APIRequest({
      url: `${this.basePath}/${_.userId}/terms-accepted`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 2.12 Logout
  async logout(_) {
    const B = new APIRequest({
      url: `${this.basePath}/${_.userId}/logout`,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 2.13 Get Firebase Config
  async getFirebaseConfig() {
    const _ = new APIRequest({
      url: `${this.basePath}/firebase-config`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(_, { ignoreCheckToken: !0 })).data;
  }
  // 2.14 Login OAuth idToken
  async loginOAuthIdToken(_) {
    const B = new APIRequest({
      url: `${this.basePath}/oauth/login/id-token`,
      method: "POST",
      data: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, { ignoreCheckToken: !0 })).data;
  }
  // 2.15 Login OAuth AccessToken
  async loginOAuthAccessToken(_) {
    const B = new APIRequest({
      url: `${this.basePath}/oauth/login/access-token`,
      method: "POST",
      data: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, { ignoreCheckToken: !0 })).data;
  }
  // 2.18 Get User Info
  async getUserInfo(_) {
    const B = new APIRequest({
      url: `${this.basePath}/${_.userId}/detail`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
}
class WalletAPI {
  constructor(_) {
    this.fetcher = _, this.basePath = "/wallet";
  }
  // 3.1 Verify Wallet PIN
  async verifyPin(_) {
    const B = new APIRequest({
      url: `${this.basePath}/pin/verify`,
      data: _,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 3.2 Change Wallet PIN
  async changePin(_) {
    const B = new APIRequest({
      url: `${this.basePath}/pin/change`,
      data: _,
      method: "PATCH",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 3.3 Get Wallet Info
  async fetchWalletInfo(_, B) {
    const M = new APIRequest({
      url: `${this.basePath}/${_.walletId}`,
      query: B,
      method: "PATCH",
      withCredentials: !0
    });
    return (await this.fetcher.send(M)).data;
  }
  // 3.4 Get Wallet Key Info
  async getWalletKeyInfo(_, B) {
    const M = new APIRequest({
      url: `${this.basePath}/${_.walletId}/wallet-keyinfo`,
      query: B,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(M)).data;
  }
  // 3.5 Reset Wallet PIN Try Count
  async resetPinTryCount(_, B) {
    const M = new APIRequest({
      url: `${this.basePath}/${_.walletId}/pin/reset-try-count`,
      query: B,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(M)).data;
  }
}
class AppAPI {
  constructor(_) {
    this.fetcher = _, this.basePath = "/app";
  }
  // 1.1 Get Theme
  async getThemeById(_) {
    return (await fetch(`${this.fetcher.baseUrl}/app/theme/${_.id}`, {
      method: "GET"
    })).json();
  }
  async getLayoutById(_) {
    return (await fetch(`${this.fetcher.baseUrl}/app/layout/${_.id}`, {
      method: "GET"
    })).json();
  }
  // 1.3 Get App Info
  async getAppInfo(_) {
    const B = new APIRequest({
      url: `${this.basePath}/info`,
      query: _,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B, {
      ignoreCheckToken: !0
    })).data;
  }
  // 1.4 Get App Coins
  async getAppCoins(_) {
    const B = new APIRequest({
      url: `${this.basePath}/coins`,
      method: "GET",
      query: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B, {
      ignoreCheckToken: !0
    })).data;
  }
  // 1.5 Get App Theme
  async getAppTheme() {
    const _ = new APIRequest({
      url: `${this.basePath}/theme`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(_, {
      ignoreCheckToken: !0
    })).data;
  }
  // 1.6 Register
  async register(_) {
    const B = new APIRequest({
      url: `${this.basePath}/register`,
      method: "POST",
      data: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
}
class AccountAPI {
  constructor(_) {
    this.fetcher = _, this.basePath = "/account";
  }
  // 4.1 Readdress
  async readdress(_) {
    const B = new APIRequest({
      url: `${this.basePath}/readdress`,
      data: _,
      method: "PATCH",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 4.2 Get App Account
  async getAppAccountList(_) {
    const B = new APIRequest({
      url: `${this.basePath}`,
      query: _,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
}
class AccountBalanceAPI {
  constructor(_) {
    this.fetcher = _, this.basePath = "/accountbalance";
  }
  // 5.1 Get Account Balance
  async getAccountBalance(_) {
    const B = new APIRequest({
      url: `${this.basePath}/${_.accountId}/balance`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
}
class NFTAPI {
  constructor(_) {
    this.fetcher = _, this.basePath = "/nft";
  }
  // 6.1 Get NFT supporting network list
  async getSupportingNetworkList() {
    const _ = new APIRequest({
      url: `${this.basePath}/support-network`,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(_, {
      // ignoreCheckToken: true,
    })).data;
  }
  // 6.2 Get App NFTs
  async getAppNFTList(_) {
    const B = new APIRequest({
      url: this.basePath,
      method: "GET",
      query: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 6.3 Refresh NFTs
  async refreshAppNFTList(_) {
    const B = new APIRequest({
      url: `${this.basePath}/refresh`,
      method: "GET",
      query: _,
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
}
class TransactionAPI {
  constructor(_) {
    this.fetcher = _, this.basePath = "/tx";
  }
  // 7.1 Sign transaction
  async sign(_) {
    const B = new APIRequest({
      url: `${this.basePath}/sign`,
      data: _,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 7.2 Broadcast Transaction
  async broadCast(_) {
    const B = new APIRequest({
      url: `${this.basePath}/broadcast`,
      data: _,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 7.3 Get prepare transaction data
  async prepareTransaction(_) {
    const B = new APIRequest({
      url: `${this.basePath}/prepare`,
      data: _,
      method: "POST",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
  // 7.4 Check Address validation
  async checkAddressValidation(_) {
    const B = new APIRequest({
      url: `${this.basePath}/check_address`,
      query: _,
      method: "GET",
      withCredentials: !0
    });
    return (await this.fetcher.send(B)).data;
  }
}
class WepinSdkAPI {
  constructor(_, B) {
    const M = new WepinSDKFetchAPI(_, B);
    this.app = new AppAPI(M), this.user = new UserAPI(M), this.wallet = new WalletAPI(M), this.account = new AccountAPI(M), this.balance = new AccountBalanceAPI(M), this.nft = new NFTAPI(M), this.transaction = new TransactionAPI(M);
  }
}
class WepinFetch {
  constructor({
    appId: _,
    appKey: B,
    domain: M,
    sdk: P,
    storage: r
  }) {
    this.version = packageJson.version, this.appId = _, this._appKey = B, this._domain = M, this._token = void 0, this.sdk = P, this._wepinStorage = r ?? c;
  }
  async init() {
    const _ = await WepinFetch.getFirebaseConfig(
      this._appKey,
      this.sdk.type,
      this.sdk.version
    );
    this.wepinFirebaseApi = new FirebaseAuthAPI(_), this.wepinApi = new WepinSdkAPI(getBaseUrl(this._appKey), {
      appId: this.appId,
      appKey: this._appKey,
      domain: this._domain,
      sdk: this.sdk,
      wepinFetch: this
    }), this._isInitialized = !0;
  }
  isInitialized() {
    return this._isInitialized;
  }
  static async getFirebaseConfig(_, B, M) {
    const P = getBaseUrl(_), S = await (await fetch(`${P}/user/firebase-config`, {
      method: "GET",
      headers: {
        "X-API-KEY": _,
        "X-SDK-TYPE": B,
        "X-SDK-VERSION": M,
        "Content-Type": "application/json"
      }
    })).text();
    return JSON.parse(atob(S));
  }
  get Token() {
    return this._token = this._wepinStorage.getLocalStorage(
      this.appId,
      "wepin:connectUser"
    ), this._token;
  }
  setToken(_) {
    this._token = _, _ ? this._wepinStorage.setLocalStorage(this.appId, "wepin:connectUser", _) : this._wepinStorage.clearLocalStorage(this.appId, "wepin:connectUser");
  }
  // public finalize() {
  //   this._wepinStorage.clearLocalStorage(this.appId, 'wepin:connectUser')
  // }
}
var ProjectPlatformKind = /* @__PURE__ */ ((A) => (A[A.web = 1] = "web", A[A.android = 2] = "android", A[A.ios = 3] = "ios", A))(ProjectPlatformKind || {});
export {
  WepinFetch,
  ProjectPlatformKind as WepinPlatformType,
  isErrorResponse,
  isFirebaseErrorResponse
};
