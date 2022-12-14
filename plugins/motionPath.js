/*!
 * MotionPathPlugin 3.0.2
 * https://greensock.com
 *
 * @license Copyright 2019, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e(((t = t || self).window = t.window || {}));
})(this, function (t) {
  'use strict';
  function p(t) {
    return 'string' == typeof t;
  }
  function x(t, e, n, r) {
    var a = t[e],
      o = 1 === r ? 6 : subdivideSegment(a, n, r);
    if (o && o + n + 2 < a.length)
      return t.splice(e, 0, a.slice(0, n + o + 2)), a.splice(0, n + o), 1;
  }
  function A(t, e) {
    var n = t.length,
      r = t[n - 1] || [],
      a = r.length;
    e[0] === r[a - 2] && e[1] === r[a - 1] && ((e = r.concat(e.slice(2))), n--),
      (t[n] = e);
  }
  var y = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    T = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    b = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    r = /(^[#\.][a-z]|[a-y][a-z])/i,
    q = Math.PI / 180,
    s = 180 / Math.PI,
    F = Math.sin,
    Z = Math.cos,
    H = Math.abs,
    Q = Math.sqrt,
    L = Math.atan2,
    C = 1e8,
    l = function _isNumber(t) {
      return 'number' == typeof t;
    },
    _ = {},
    N = {},
    e = 1e5,
    d = function _wrapProgress(t) {
      return Math.round(((t + C) % 1) * e) / e || (t < 0 ? 0 : 1);
    },
    O = function _round(t) {
      return ~~(t * e + (t < 0 ? -0.5 : 0.5)) / e;
    },
    D = function _copyMetaData(t, e) {
      return (
        (e.totalLength = t.totalLength),
        t.samples
          ? ((e.samples = t.samples.slice(0)),
            (e.lookup = t.lookup.slice(0)),
            (e.minLength = t.minLength),
            (e.resolution = t.resolution))
          : (e.totalPoints = t.totalPoints),
        e
      );
    };
  function getRawPath(t) {
    var e,
      n = (t = (p(t) && r.test(t) && document.querySelector(t)) || t)
        .getAttribute
        ? t
        : 0;
    return n && (t = t.getAttribute('d'))
      ? (n._gsPath || (n._gsPath = {}),
        (e = n._gsPath[t]) && !e._dirty
          ? e
          : (n._gsPath[t] = stringToRawPath(t)))
      : t
      ? p(t)
        ? stringToRawPath(t)
        : l(t[0])
        ? [t]
        : t
      : console.warn('Expecting a <path> element or an SVG path data string');
  }
  function reverseSegment(t) {
    var e,
      n = 0;
    for (t.reverse(); n < t.length; n += 2)
      (e = t[n]), (t[n] = t[n + 1]), (t[n + 1] = e);
    t.reversed = !t.reversed;
  }
  var z = {
    rect: 'rx,ry,x,y,width,height',
    circle: 'r,cx,cy',
    ellipse: 'rx,ry,cx,cy',
    line: 'x1,x2,y1,y2',
  };
  function convertToPath(t, e) {
    var n,
      r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      g,
      f,
      c,
      p,
      d,
      m,
      P,
      v,
      w,
      x,
      y,
      b,
      M,
      R = t.tagName.toLowerCase(),
      L = 0.552284749831;
    return 'path' !== R && t.getBBox
      ? ((s = (function _createPath(t, e) {
          var n,
            r = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
            a = [].slice.call(t.attributes),
            o = a.length;
          for (e = ',' + e + ','; -1 < --o; )
            (n = a[o].nodeName.toLowerCase()),
              e.indexOf(',' + n + ',') < 0 &&
                r.setAttributeNS(null, n, a[o].nodeValue);
          return r;
        })(t, 'x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points')),
        (M = (function _attrToObj(t, e) {
          for (var n = e ? e.split(',') : [], r = {}, a = n.length; -1 < --a; )
            r[n[a]] = +t.getAttribute(n[a]) || 0;
          return r;
        })(t, z[R])),
        'rect' === R
          ? ((o = M.rx),
            (i = M.ry),
            (r = M.x),
            (a = M.y),
            (g = M.width - 2 * o),
            (f = M.height - 2 * i),
            (n =
              o || i
                ? 'M' +
                  (P = (d = (p = r + o) + g) + o) +
                  ',' +
                  (w = a + i) +
                  ' V' +
                  (x = w + f) +
                  ' C' +
                  [
                    P,
                    (y = x + i * L),
                    (m = d + o * L),
                    (b = x + i),
                    d,
                    b,
                    d - (d - p) / 3,
                    b,
                    p + (d - p) / 3,
                    b,
                    p,
                    b,
                    (c = r + o * (1 - L)),
                    b,
                    r,
                    y,
                    r,
                    x,
                    r,
                    x - (x - w) / 3,
                    r,
                    w + (x - w) / 3,
                    r,
                    w,
                    r,
                    (v = a + i * (1 - L)),
                    c,
                    a,
                    p,
                    a,
                    p + (d - p) / 3,
                    a,
                    d - (d - p) / 3,
                    a,
                    d,
                    a,
                    m,
                    a,
                    P,
                    v,
                    P,
                    w,
                  ].join(',') +
                  'z'
                : 'M' +
                  (r + g) +
                  ',' +
                  a +
                  ' v' +
                  f +
                  ' h' +
                  -g +
                  ' v' +
                  -f +
                  ' h' +
                  g +
                  'z'))
          : 'circle' === R || 'ellipse' === R
          ? ((h =
              'circle' === R
                ? (o = i = M.r) * L
                : ((o = M.rx), (i = M.ry) * L)),
            (n =
              'M' +
              ((r = M.cx) + o) +
              ',' +
              (a = M.cy) +
              ' C' +
              [
                r + o,
                a + h,
                r + (l = o * L),
                a + i,
                r,
                a + i,
                r - l,
                a + i,
                r - o,
                a + h,
                r - o,
                a,
                r - o,
                a - h,
                r - l,
                a - i,
                r,
                a - i,
                r + l,
                a - i,
                r + o,
                a - h,
                r + o,
                a,
              ].join(',') +
              'z'))
          : 'line' === R
          ? (n = 'M' + M.x1 + ',' + M.y1 + ' L' + M.x2 + ',' + M.y2)
          : ('polyline' !== R && 'polygon' !== R) ||
            ((n =
              'M' +
              (r = (u =
                (t.getAttribute('points') + '').match(T) || []).shift()) +
              ',' +
              (a = u.shift()) +
              ' L' +
              u.join(',')),
            'polygon' === R && (n += ',' + r + ',' + a + 'z')),
        s.setAttribute(
          'd',
          rawPathToString((s._gsRawPath = stringToRawPath(n)))
        ),
        e &&
          t.parentNode &&
          (t.parentNode.insertBefore(s, t), t.parentNode.removeChild(t)),
        s)
      : t;
  }
  function getRotationAtBezierT(t, e, n) {
    var r,
      a = t[e],
      o = t[e + 2],
      i = t[e + 4];
    return (
      (a += (o - a) * n),
      (a += ((o += (i - o) * n) - a) * n),
      (r = o + (i + (t[e + 6] - i) * n - o) * n - a),
      (a = t[e + 1]),
      (a += ((o = t[e + 3]) - a) * n),
      (a += ((o += ((i = t[e + 5]) - o) * n) - a) * n),
      O(L(o + (i + (t[e + 7] - i) * n - o) * n - a, r) * s)
    );
  }
  function sliceRawPath(t, e, n) {
    !(function _isUndefined(t) {
      return void 0 === t;
    })(n) || (n = 1);
    var r = n < (e = e || 0),
      a = Math.max(0, ~~(H(n - e) - 1e-8));
    if (
      (r && ((r = n), (n = e), (e = r), (r = 1), (a -= a ? 1 : 0)),
      e < 0 || n < 0)
    ) {
      var o = 1 + ~~Math.min(e, n);
      (e += o), (n += o);
    }
    var i,
      s,
      l,
      h,
      u,
      g,
      f,
      c = (function copyRawPath(t) {
        for (var e = [], n = 0; n < t.length; n++)
          e[n] = D(t[n], t[n].slice(0));
        return D(t, e);
      })(t.totalLength ? t : cacheRawPathMeasurements(t)),
      p = 1 < n,
      d = getProgressData(c, e, _),
      m = getProgressData(c, n, N),
      P = m.segment,
      v = d.segment,
      w = m.segIndex,
      y = d.segIndex,
      b = m.i,
      M = d.i,
      R = y === w,
      L = b === M && R,
      T = (R && b < M) || (L && d.t > m.t);
    if (p || a) {
      if (
        (x(c, y, M, d.t) &&
          ((i = 1),
          y++,
          L
            ? T
              ? (m.t /= d.t)
              : ((m.t = (m.t - d.t) / (1 - d.t)), w++, (b = 0))
            : y <= w + 1 && !T && (w++, R && (b -= M))),
        m.t ? x(c, w, b, m.t) && (T && i && y++, r && w++) : (w--, r && y--),
        (h = []),
        (g = 1 + (u = c.length) * a),
        (f = y),
        r)
      )
        for (g += (u - (w = (w || u) - 1) + y) % u, l = 0; l < g; l++)
          A(h, c[f]), (f = (f || u) - 1);
      else for (g += (u - y + w) % u, l = 0; l < g; l++) A(h, c[f++ % u]);
      c = h;
    } else if (((s = 1 === m.t ? 6 : subdivideSegment(P, b, m.t)), e !== n))
      for (
        i = subdivideSegment(v, M, L ? d.t / m.t : d.t),
          R && (s += i),
          P.splice(b + s + 2),
          i && v.splice(0, M + i),
          l = c.length;
        l--;

      )
        (l < y || w < l) && c.splice(l, 1);
    else
      (P.angle = getRotationAtBezierT(P, b + s, 0)),
        (d = P[(b += s)]),
        (m = P[b + 1]),
        (P.length = P.totalLength = 0),
        (P.totalPoints = c.totalPoints = 8),
        P.push(d, m, d, m, d, m, d, m);
    return (
      r &&
        (function _reverseRawPath(t, e) {
          var n = t.length;
          for (e || t.reverse(); n--; ) t[n].reversed || reverseSegment(t[n]);
        })(c, p || a),
      (c.totalLength = 0),
      c
    );
  }
  function measureSegment(t, e, n) {
    (e = e || 0), t.samples || ((t.samples = []), (t.lookup = []));
    var r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      g,
      f,
      c,
      p,
      d,
      m,
      P,
      v,
      w,
      x = ~~t.resolution || 12,
      y = 1 / x,
      b = n ? e + 6 * n + 1 : t.length,
      M = t[e],
      R = t[e + 1],
      L = e ? (e / 6) * x : 0,
      T = t.samples,
      S = t.lookup,
      _ = (e ? t.minLength : C) || C,
      N = T[L + n * x - 1],
      A = e ? T[L - 1] : 0;
    for (T.length = S.length = 0, a = e + 2; a < b; a += 6) {
      if (
        ((o = t[a + 4] - M),
        (i = t[a + 2] - M),
        (s = t[a] - M),
        (u = t[a + 5] - R),
        (g = t[a + 3] - R),
        (f = t[a + 1] - R),
        (l = h = c = p = 0),
        H(o) < 1e-5 && H(u) < 1e-5 && H(s) + H(f) < 1e-5)
      )
        8 < t.length && (t.splice(a, 6), (a -= 6), (b -= 6));
      else
        for (r = 1; r <= x; r++)
          (l =
            h -
            (h =
              ((m = y * r) * m * o + 3 * (d = 1 - m) * (m * i + d * s)) * m)),
            (c = p - (p = (m * m * u + 3 * d * (m * g + d * f)) * m)),
            (v = Q(c * c + l * l)) < _ && (_ = v),
            (A += v),
            (T[L++] = A);
      (M += o), (R += u);
    }
    if (N) for (N -= A; L < T.length; L++) T[L] += N;
    if (T.length && _)
      for (
        t.totalLength = w = T[T.length - 1] || 0,
          t.minLength = _,
          v = P = 0,
          r = 0;
        r < w;
        r += _
      )
        S[v++] = T[P] < r ? ++P : P;
    else t.totalLength = T[0] = 0;
    return e ? A - T[e / 2 - 1] : A;
  }
  function cacheRawPathMeasurements(t, e) {
    var n, r, a;
    for (a = n = r = 0; a < t.length; a++)
      (t[a].resolution = ~~e || 12),
        (r += t[a].length),
        (n += measureSegment(t[a]));
    return (t.totalPoints = r), (t.totalLength = n), t;
  }
  function subdivideSegment(t, e, n) {
    if (n <= 0 || 1 <= n) return 0;
    var r = t[e],
      a = t[e + 1],
      o = t[e + 2],
      i = t[e + 3],
      s = t[e + 4],
      l = t[e + 5],
      h = r + (o - r) * n,
      u = o + (s - o) * n,
      g = a + (i - a) * n,
      f = i + (l - i) * n,
      c = h + (u - h) * n,
      p = g + (f - g) * n,
      d = s + (t[e + 6] - s) * n,
      m = l + (t[e + 7] - l) * n;
    return (
      (u += (d - u) * n),
      (f += (m - f) * n),
      t.splice(
        e + 2,
        4,
        O(h),
        O(g),
        O(c),
        O(p),
        O(c + (u - c) * n),
        O(p + (f - p) * n),
        O(u),
        O(f),
        O(d),
        O(m)
      ),
      t.samples &&
        t.samples.splice(((e / 6) * t.resolution) | 0, 0, 0, 0, 0, 0, 0, 0),
      6
    );
  }
  function getProgressData(t, e, n) {
    (n = n || {}),
      t.totalLength || cacheRawPathMeasurements(t),
      (e < 0 || 1 < e) && (e = d(e));
    var r,
      a,
      o,
      i,
      s,
      l,
      h = 0,
      u = t[0];
    if (1 < t.length) {
      for (o = t.totalLength * e, s = l = 0; (s += t[l++].totalLength) < o; )
        h = l;
      e = (o - (i = s - (u = t[h]).totalLength)) / (s - i) || 0;
    }
    return (
      (r = u.samples),
      (a = u.resolution),
      (o = u.totalLength * e),
      (i = (l = u.lookup[~~(o / u.minLength)] || 0) ? r[l - 1] : 0),
      (s = r[l]) < o && ((i = s), (s = r[++l])),
      (n.path = t),
      (n.segment = u),
      (n.segIndex = h),
      (n.i = 6 * ~~(l / a)),
      (n.t = (1 / a) * ((o - i) / (s - i) + (l % a))),
      n
    );
  }
  function getPositionOnPath(t, e, n, r) {
    var a,
      o,
      i,
      s,
      l,
      h,
      u,
      g,
      f,
      c = t[0],
      p = r || {};
    if (((e < 0 || 1 < e) && (e = d(e)), 1 < t.length)) {
      for (i = t.totalLength * e, l = h = 0; (l += t[h++].totalLength) < i; )
        c = t[h];
      e = (i - (s = l - c.totalLength)) / (l - s) || 0;
    }
    return (
      (a = c.samples),
      (o = c.resolution),
      (i = c.totalLength * e),
      (s = (h = c.lookup[~~(i / c.minLength)] || 0) ? a[h - 1] : 0),
      (l = a[h]) < i && ((s = l), (l = a[++h])),
      (f = 1 - (u = (1 / o) * ((i - s) / (l - s) + (h % o)) || 0)),
      (g = c[(h = 6 * ~~(h / o))]),
      (p.x = O(
        (u * u * (c[h + 6] - g) +
          3 * f * (u * (c[h + 4] - g) + f * (c[h + 2] - g))) *
          u +
          g
      )),
      (p.y = O(
        (u * u * (c[h + 7] - (g = c[h + 1])) +
          3 * f * (u * (c[h + 5] - g) + f * (c[h + 3] - g))) *
          u +
          g
      )),
      n &&
        (p.angle = c.totalLength
          ? getRotationAtBezierT(c, h, 1 <= u ? 1 - 1e-9 : u || 1e-9)
          : c.angle || 0),
      p
    );
  }
  function transformRawPath(t, e, n, r, a, o, i) {
    for (var s, l, h, u, g, f = t.length; -1 < --f; )
      for (l = (s = t[f]).length, h = 0; h < l; h += 2)
        (u = s[h]),
          (g = s[h + 1]),
          (s[h] = u * e + g * r + o),
          (s[h + 1] = u * n + g * a + i);
    return (t._dirty = 1), t;
  }
  function arcToSegment(t, e, n, r, a, o, i, s, l) {
    if (t !== s || e !== l) {
      (n = H(n)), (r = H(r));
      var h = (a % 360) * q,
        u = Z(h),
        g = F(h),
        f = Math.PI,
        c = 2 * f,
        p = (t - s) / 2,
        d = (e - l) / 2,
        m = u * p + g * d,
        P = -g * p + u * d,
        v = m * m,
        w = P * P,
        x = v / (n * n) + w / (r * r);
      1 < x && ((n = Q(x) * n), (r = Q(x) * r));
      var y = n * n,
        b = r * r,
        M = (y * b - y * w - b * v) / (y * w + b * v);
      M < 0 && (M = 0);
      var R = (o === i ? -1 : 1) * Q(M),
        L = ((n * P) / r) * R,
        T = ((-r * m) / n) * R,
        S = u * L - g * T + (t + s) / 2,
        _ = g * L + u * T + (e + l) / 2,
        N = (m - L) / n,
        A = (P - T) / r,
        C = (-m - L) / n,
        O = (-P - T) / r,
        D = N * N + A * A,
        z = (A < 0 ? -1 : 1) * Math.acos(N / Q(D)),
        B =
          (N * O - A * C < 0 ? -1 : 1) *
          Math.acos((N * C + A * O) / Q(D * (C * C + O * O)));
      isNaN(B) && (B = f),
        !i && 0 < B ? (B -= c) : i && B < 0 && (B += c),
        (z %= c),
        (B %= c);
      var G,
        I = Math.ceil(H(B) / (c / 4)),
        U = [],
        k = B / I,
        E = ((4 / 3) * F(k / 2)) / (1 + Z(k / 2)),
        j = u * n,
        V = g * n,
        X = g * -r,
        Y = u * r;
      for (G = 0; G < I; G++)
        (m = Z((a = z + G * k))),
          (P = F(a)),
          (N = Z((a += k))),
          (A = F(a)),
          U.push(m - E * P, P + E * m, N + E * A, A - E * N, N, A);
      for (G = 0; G < U.length; G += 2)
        (m = U[G]),
          (P = U[G + 1]),
          (U[G] = m * j + P * X + S),
          (U[G + 1] = m * V + P * Y + _);
      return (U[G - 2] = s), (U[G - 1] = l), U;
    }
  }
  function stringToRawPath(t) {
    function gf(t, e, n, r) {
      (u = (n - t) / 3),
        (g = (r - e) / 3),
        s.push(t + u, e + g, n - u, r - g, n, r);
    }
    var e,
      n,
      r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      g,
      f,
      c,
      p =
        (t + '')
          .replace(b, function (t) {
            var e = +t;
            return e < 1e-4 && -1e-4 < e ? 0 : e;
          })
          .match(y) || [],
      d = [],
      m = 0,
      P = 0,
      v = p.length,
      w = 0,
      x = 'ERROR: malformed path: ' + t;
    if (!t || !isNaN(p[0]) || isNaN(p[1])) return console.log(x), d;
    for (e = 0; e < v; e++)
      if (
        ((c = o),
        isNaN(p[e]) ? (i = (o = p[e].toUpperCase()) !== p[e]) : e--,
        (r = +p[e + 1]),
        (a = +p[e + 2]),
        i && ((r += m), (a += P)),
        e || ((l = r), (h = a)),
        'M' === o)
      )
        s && (s.length < 8 ? (d.length -= 1) : (w += s.length)),
          (m = l = r),
          (P = h = a),
          (s = [r, a]),
          d.push(s),
          (e += 2),
          (o = 'L');
      else if ('C' === o)
        i || (m = P = 0),
          (s = s || [0, 0]).push(
            r,
            a,
            m + 1 * p[e + 3],
            P + 1 * p[e + 4],
            (m += 1 * p[e + 5]),
            (P += 1 * p[e + 6])
          ),
          (e += 6);
      else if ('S' === o)
        (u = m),
          (g = P),
          ('C' !== c && 'S' !== c) ||
            ((u += m - s[s.length - 4]), (g += P - s[s.length - 3])),
          i || (m = P = 0),
          s.push(u, g, r, a, (m += 1 * p[e + 3]), (P += 1 * p[e + 4])),
          (e += 4);
      else if ('Q' === o)
        (u = m + (2 / 3) * (r - m)),
          (g = P + (2 / 3) * (a - P)),
          i || (m = P = 0),
          (m += 1 * p[e + 3]),
          (P += 1 * p[e + 4]),
          s.push(u, g, m + (2 / 3) * (r - m), P + (2 / 3) * (a - P), m, P),
          (e += 4);
      else if ('T' === o)
        (u = m - s[s.length - 4]),
          (g = P - s[s.length - 3]),
          s.push(
            m + u,
            P + g,
            r + (2 / 3) * (m + 1.5 * u - r),
            a + (2 / 3) * (P + 1.5 * g - a),
            (m = r),
            (P = a)
          ),
          (e += 2);
      else if ('H' === o) gf(m, P, (m = r), P), (e += 1);
      else if ('V' === o) gf(m, P, m, (P = r + (i ? P - m : 0))), (e += 1);
      else if ('L' === o || 'Z' === o)
        'Z' === o && ((r = l), (a = h), (s.closed = !0)),
          ('L' === o || 0.5 < H(m - r) || 0.5 < H(P - a)) &&
            (gf(m, P, r, a), 'L' === o && (e += 2)),
          (m = r),
          (P = a);
      else if ('A' === o) {
        if (
          (f = arcToSegment(
            m,
            P,
            +p[e + 1],
            +p[e + 2],
            +p[e + 3],
            +p[e + 4],
            +p[e + 5],
            (i ? m : 0) + 1 * p[e + 6],
            (i ? P : 0) + 1 * p[e + 7]
          ))
        )
          for (n = 0; n < f.length; n++) s.push(f[n]);
        (m = s[s.length - 2]), (P = s[s.length - 1]), (e += 7);
      } else console.log(x);
    return (
      (e = s.length) < 6
        ? (d.pop(), (e = 0))
        : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0),
      (d.totalPoints = w + e),
      d
    );
  }
  function flatPointsToSegment(t, e) {
    void 0 === e && (e = 1);
    for (var n = t[0], r = 0, a = [n, r], o = 2; o < t.length; o += 2)
      a.push(n, r, t[o], (r = ((t[o] - n) * e) / 2), (n = t[o]), -r);
    return a;
  }
  function pointsToSegment(t, e, n) {
    var r,
      a,
      o,
      i,
      s,
      l,
      h,
      u,
      g,
      f,
      c,
      p,
      d,
      m,
      P = t.length - 2,
      v = +t[0],
      w = +t[1],
      x = +t[2],
      y = +t[3],
      b = [v, w, v, w],
      M = x - v,
      R = y - w;
    for (
      isNaN(n) && (n = Math.PI / 10), e = e || 0 === e ? +e : 1, s = 2;
      s < P;
      s += 2
    )
      (r = v),
        (a = w),
        (v = x),
        (w = y),
        (p = (l = M) * l + (u = R) * u),
        (d = (M = (x = +t[s + 2]) - v) * M + (R = (y = +t[s + 3]) - w) * R),
        (m = (h = x - r) * h + (g = y - a) * g),
        (c = ((o = Math.acos((p + d - m) / Q(4 * p * d))) / Math.PI) * e),
        (f = Q(p) * c),
        (c *= Q(d)),
        (v === r && w === a) ||
          (n < o
            ? ((i = L(g, h)),
              b.push(
                O(v - Z(i) * f),
                O(w - F(i) * f),
                O(v),
                O(w),
                O(v + Z(i) * c),
                O(w + F(i) * c)
              ))
            : ((i = L(u, l)),
              b.push(O(v - Z(i) * f), O(w - F(i) * f)),
              (i = L(R, M)),
              b.push(O(v), O(w), O(v + Z(i) * c), O(w + F(i) * c))));
    return b.push(O(x), O(y), O(x), O(y)), b;
  }
  function rawPathToString(t) {
    l(t[0]) && (t = [t]);
    var e,
      n,
      r,
      a,
      o = '',
      i = t.length;
    for (n = 0; n < i; n++) {
      for (
        a = t[n],
          o += 'M' + O(a[0]) + ',' + O(a[1]) + ' C',
          e = a.length,
          r = 2;
        r < e;
        r++
      )
        o +=
          O(a[r++]) +
          ',' +
          O(a[r++]) +
          ' ' +
          O(a[r++]) +
          ',' +
          O(a[r++]) +
          ' ' +
          O(a[r++]) +
          ',' +
          O(a[r]) +
          ' ';
      a.closed && (o += 'z');
    }
    return o;
  }
  function S(t) {
    return (
      t.ownerSVGElement || ('svg' === (t.tagName + '').toLowerCase() ? t : null)
    );
  }
  function U(t, e) {
    if (
      t.parentNode &&
      (u ||
        (function _setDoc(t) {
          var e = t.ownerDocument || t;
          !(w in t.style) &&
            'msTransform' in t.style &&
            (M = (w = 'msTransform') + 'Origin');
          for (; e.parentNode && (e = e.parentNode); );
          return (
            (g = window),
            (v = new G()),
            e && ((f = (u = e).documentElement), (c = e.body)),
            e
          );
        })(t))
    ) {
      var n = S(t),
        r = n
          ? n.getAttribute('xmlns') || 'http://www.w3.org/2000/svg'
          : 'http://www.w3.org/1999/xhtml',
        a = n ? (e ? 'rect' : 'g') : 'div',
        o = 2 !== e ? 0 : 100,
        i = 3 === e ? 100 : 0,
        s = 'position:absolute;display:block;',
        l = u.createElementNS
          ? u.createElementNS(r.replace(/^https/, 'http'), a)
          : u.createElement(a);
      return (
        e &&
          (n
            ? ((P = P || U(t)),
              l.setAttribute('width', 1),
              l.setAttribute('height', 1),
              l.setAttribute('transform', 'translate(' + o + ',' + i + ')'),
              P.appendChild(l))
            : (m || ((m = U(t)).style.cssText = s),
              (l.style.cssText =
                s + 'width:1px;height:1px;top:' + i + 'px;left:' + o + 'px'),
              m.appendChild(l))),
        l
      );
    }
    throw 'Need document and parent.';
  }
  function W(t, e, n, r, a, o, i) {
    return (t.a = e), (t.b = n), (t.c = r), (t.d = a), (t.e = o), (t.f = i), t;
  }
  var u,
    g,
    f,
    c,
    m,
    P,
    v,
    n,
    w = 'transform',
    M = w + 'Origin',
    R = [],
    B = [],
    G =
      (((n = Matrix2D.prototype).inverse = function inverse() {
        var t = this.a,
          e = this.b,
          n = this.c,
          r = this.d,
          a = this.e,
          o = this.f,
          i = t * r - e * n;
        return W(
          this,
          r / i,
          -e / i,
          -n / i,
          t / i,
          (n * o - r * a) / i,
          -(t * o - e * a) / i
        );
      }),
      (n.multiply = function multiply(t) {
        var e = this.a,
          n = this.b,
          r = this.c,
          a = this.d,
          o = this.e,
          i = this.f,
          s = t.a,
          l = t.c,
          h = t.b,
          u = t.d,
          g = t.e,
          f = t.f;
        return W(
          this,
          s * e + h * r,
          s * n + h * a,
          l * e + u * r,
          l * n + u * a,
          o + g * e + f * r,
          i + g * n + f * a
        );
      }),
      (n.equals = function equals(t) {
        var e = this.a,
          n = this.b,
          r = this.c,
          a = this.d,
          o = this.e,
          i = this.f;
        return (
          e === t.a &&
          n === t.b &&
          r === t.c &&
          a === t.d &&
          o === t.e &&
          i === t.f
        );
      }),
      (n.apply = function apply(t, e) {
        void 0 === e && (e = {});
        var n = t.x,
          r = t.y,
          a = this.a,
          o = this.b,
          i = this.c,
          s = this.d,
          l = this.e,
          h = this.f;
        return (e.x = n * a + r * i + l), (e.y = n * o + r * s + h), e;
      }),
      Matrix2D);
  function Matrix2D(t, e, n, r, a, o) {
    void 0 === t && (t = 1),
      void 0 === e && (e = 0),
      void 0 === n && (n = 0),
      void 0 === r && (r = 1),
      void 0 === a && (a = 0),
      void 0 === o && (o = 0),
      W(this, t, e, n, r, a, o);
  }
  function getGlobalMatrix(t, e) {
    if (!t || !t.parentNode) return new G();
    var n = S(t) ? R : B,
      r = (function _placeSiblings(t) {
        var e,
          n,
          r,
          a,
          o,
          i = S(t),
          s = t === i,
          l = i ? R : B;
        return t === g
          ? t
          : (l.length || l.push(U(t, 1), U(t, 2), U(t, 3)),
            (e = i ? P : m),
            i
              ? ((r = s ? { x: 0, y: 0 } : t.getBBox()),
                (n = t.transform ? t.transform.baseVal : []).length
                  ? ((a = (n = n.consolidate().matrix).a * r.x + n.c * r.y),
                    (o = n.b * r.x + n.d * r.y))
                  : ((n = v),
                    'g' === t.tagName.toLowerCase()
                      ? (a = o = 0)
                      : ((a = r.x), (o = r.y))),
                e.setAttribute(
                  'transform',
                  'matrix(' +
                    n.a +
                    ',' +
                    n.b +
                    ',' +
                    n.c +
                    ',' +
                    n.d +
                    ',' +
                    (n.e + a) +
                    ',' +
                    (n.f + o) +
                    ')'
                ),
                (s ? i : t.parentNode).appendChild(e))
              : ((e.style.top = t.offsetTop + 'px'),
                (e.style.left = t.offsetLeft + 'px'),
                (n = g.getComputedStyle(t)),
                (e.style[w] = n[w]),
                (e.style[M] = n[M]),
                (e.style.position =
                  'fixed' === n.position ? 'fixed' : 'absolute'),
                t.parentNode.appendChild(e)),
            e);
      })(t),
      a = n[0].getBoundingClientRect(),
      o = n[1].getBoundingClientRect(),
      i = n[2].getBoundingClientRect(),
      s = r.parentNode,
      l = (function _isFixed(t) {
        return (
          'fixed' === g.getComputedStyle(t).position ||
          ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t) : void 0)
        );
      })(t),
      h = new G(
        (o.left - a.left) / 100,
        (o.top - a.top) / 100,
        (i.left - a.left) / 100,
        (i.top - a.top) / 100,
        a.left +
          (l
            ? 0
            : (function _getDocScrollLeft() {
                return (
                  g.pageXOffset ||
                  u.scrollLeft ||
                  f.scrollLeft ||
                  c.scrollLeft ||
                  0
                );
              })()),
        a.top +
          (l
            ? 0
            : (function _getDocScrollTop() {
                return (
                  g.pageYOffset ||
                  u.scrollTop ||
                  f.scrollTop ||
                  c.scrollTop ||
                  0
                );
              })())
      );
    return s.removeChild(r), e ? h.inverse() : h;
  }
  function ea(t, e, n, r) {
    for (var a = e.length, o = r, i = 0; i < a; i++)
      (t[o] = parseFloat(e[i][n])), (o += 2);
    return t;
  }
  function fa(t, e, n) {
    return parseFloat(t._gsap.get(t, e, n || 'px')) || 0;
  }
  function ga(t) {
    var e,
      n = t[0],
      r = t[1];
    for (e = 2; e < t.length; e += 2) (n = t[e] += n), (r = t[e + 1] += r);
  }
  function ha(t, e, n, r, a, o, i) {
    return (
      (e =
        'cubic' === i.type
          ? [e]
          : (e.unshift(fa(n, r, i.unitX), a ? fa(n, a, i.unitY) : 0),
            i.relative && ga(e),
            [(a ? pointsToSegment : flatPointsToSegment)(e, i.curviness)])),
      (e = o(X(e, n, i))),
      Y(t, n, r, e, 'x', i.unitX),
      a && Y(t, n, a, e, 'y', i.unitY),
      cacheRawPathMeasurements(e, i.resolution || (0 === i.curviness ? 20 : 12))
    );
  }
  function ia(t) {
    return t;
  }
  var I,
    h,
    k,
    E,
    j = ['x', 'translateX', 'left', 'marginLeft'],
    V = ['y', 'translateY', 'top', 'marginTop'],
    o = Math.PI / 180,
    X = function _align(t, e, n) {
      var r,
        a,
        o,
        i,
        s,
        l,
        h,
        u,
        g,
        f,
        c = n.align,
        p = n.matrix,
        d = n.offsetX,
        m = n.offsetY;
      return t && t.length
        ? (c &&
            ('self' === c || (s = E(c)[0] || e) === e
              ? transformRawPath(
                  t,
                  1,
                  0,
                  0,
                  1,
                  (r = fa(e, 'x') - t[0][0]),
                  (a = fa(e, 'y') - t[0][1])
                )
              : ((o = I.to(e, {
                  xPercent: 0,
                  yPercent: 0,
                  x: 0,
                  y: 0,
                }).progress(1)),
                (i = getGlobalMatrix(e)),
                o.render(-1).kill(),
                (a =
                  s.getTotalLength && 'path' === s.tagName.toLowerCase()
                    ? ((l = getRawPath(s)),
                      (h = getGlobalMatrix(s.parentNode)),
                      (r = l[0][0]),
                      l[0][1])
                    : ((h = getGlobalMatrix(s)), (r = 0))),
                (g = h.a * r + h.c * a + h.e - i.e),
                (f = h.b * r + h.d * a + h.f - i.f),
                (r = (u = getGlobalMatrix(e.parentNode, !0)).a * g + u.c * f),
                (a = u.b * g + u.d * f),
                (g = t[0][0]),
                (f = t[0][1]),
                h.multiply(u),
                (r -= h.a * g + h.c * f),
                (a -= h.b * g + h.d * f),
                transformRawPath(t, h.a, h.b, h.c, h.d, r, a))),
          p
            ? transformRawPath(t, p.a, p.b, p.c, p.d, p.e, p.f)
            : (d || m) && transformRawPath(t, 1, 0, 0, 1, d || 0, m || 0),
          t)
        : getRawPath('M0,0L0,0');
    },
    Y = function _addDimensionalPropTween(t, e, n, r, a, o) {
      var i = e._gsap,
        s = (t._pt = new h(t._pt, e, n, 0, 0, ia, 0, i.set(e, n, t)));
      (s.u = k(i.get(e, n, o)) || 0),
        (s.path = r),
        (s.pp = a),
        t._props.push(n);
    },
    a = {
      version: '3.0.2',
      name: 'motionPath',
      register: function register(t, e, n) {
        (k = (I = t).utils.getUnit), (E = I.utils.toArray), (h = n);
      },
      init: function init(t, e) {
        if (!I)
          return (
            console.warn('Please gsap.registerPlugin(MotionPathPlugin)'), !1
          );
        ('object' == typeof e && !e.style && e.path) || (e = { path: e });
        var n,
          r,
          a,
          o,
          i = [],
          s = e.path,
          l = s[0],
          h = e.autoRotate,
          u = (function _sliceModifier(e, n) {
            return function (t) {
              return e || 1 !== n ? sliceRawPath(t, e, n) : t;
            };
          })(e.start, 'end' in e ? e.end : 1);
        if (
          ((this.rawPaths = i),
          (this.target = t),
          (this.rotate = h || 0 === h) &&
            ((this.rOffset = parseFloat(h) || 0),
            (this.radians = !!e.useRadians),
            (this.rProp = e.rotation || 'rotation'),
            (this.rSet = t._gsap.set(t, this.rProp, this)),
            (this.ru = k(t._gsap.get(t, this.rProp)) || 0)),
          !Array.isArray(s) || 'closed' in s || 'number' == typeof l)
        )
          cacheRawPathMeasurements(
            (n = u(X(getRawPath(e.path), t, e))),
            e.resolution
          ),
            i.push(n),
            Y(this, t, e.x || 'x', n, 'x', e.unitX || 'px'),
            Y(this, t, e.y || 'y', n, 'y', e.unitY || 'px');
        else {
          for (r in l) ~j.indexOf(r) ? (a = r) : ~V.indexOf(r) && (o = r);
          for (r in (a && o
            ? i.push(
                ha(
                  this,
                  ea(ea([], s, a, 0), s, o, 1),
                  t,
                  e.x || a,
                  e.y || o,
                  u,
                  e
                )
              )
            : (a = o = 0),
          l))
            r !== a &&
              r !== o &&
              i.push(ha(this, ea([], s, r, 0), t, r, 0, u, e));
        }
      },
      render: function render(t, e) {
        var n = e.rawPaths,
          r = n.length,
          a = e._pt;
        for (1 < t ? (t = 1) : t < 0 && (t = 0); r--; )
          getPositionOnPath(n[r], t, !r && e.rotate, n[r]);
        for (; a; ) a.set(a.t, a.p, a.path[a.pp] + a.u, a.d, t), (a = a._next);
        e.rotate &&
          e.rSet(
            e.target,
            e.rProp,
            n[0].angle * (e.radians ? o : 1) + e.rOffset + e.ru,
            e,
            t
          );
      },
      getLength: function getLength(t) {
        return cacheRawPathMeasurements(getRawPath(t)).totalLength;
      },
      sliceRawPath: sliceRawPath,
      getRawPath: getRawPath,
      pointsToSegment: pointsToSegment,
      stringToRawPath: stringToRawPath,
      rawPathToString: rawPathToString,
      transformRawPath: transformRawPath,
      convertToPath: function convertToPath$1(t, e) {
        return E(t).map(function (t) {
          return convertToPath(t, !1 !== e);
        });
      },
      getGlobalMatrix: getGlobalMatrix,
      getPositionOnPath: getPositionOnPath,
      cacheRawPathMeasurements: cacheRawPathMeasurements,
      arrayToRawPath: function arrayToRawPath(t, e) {
        var n = ea(ea([], t, (e = e || {}).x || 'x', 0), t, e.y || 'y', 1);
        return (
          e.relative && ga(n),
          ['cubic' === e.type ? n : pointsToSegment(n, e.curviness)]
        );
      },
    };
  !(function _getGSAP() {
    return (
      I ||
      ('undefined' != typeof window &&
        (I = window.gsap) &&
        I.registerPlugin &&
        I)
    );
  })() || I.registerPlugin(a),
    (t.MotionPathPlugin = a),
    (t.default = a),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
//# sourceMappingURL=MotionPathPlugin.min.js.map
