/* Maths · APIS (analyse) — trois figures pour les pages apis/, montées sur <div data-apis="…" data-opts='{…}'>.

   data-apis="area"   aire entre une courbe et l'axe des abscisses, de a à b (au-dessus de l'axe : compté en plus,
                      en dessous : compté en moins). opts : { f, a, b, x:[min,max], y:[min,max], title, labels:[…] }
                      f : nom d'une fonction de FN (ci-dessous) ou { m, p } pour la droite y = m x + p.
   data-apis="rect"   méthode des rectangles : choix de la fonction (PRESETS_RECT) et du nombre n d'intervalles ;
                      rectangles inférieurs et supérieurs, les deux sommes, l'écart, la valeur exacte.
                      opts : { preset: 'x2' | 'sqrt' | 'ln' | 'inv', n, title }
   data-apis="seq"    termes d'une suite, sa limite ℓ, la bande ]ℓ − ε, ℓ + ε[ et le rang à partir duquel tous les
                      termes tracés y sont. opts : { preset, eps, title, only:[…] } (PRESETS_SEQ).

   Textes : REV.t('français') + REV.i18n.add en bas ; nombres : REV.util.nf (virgule en français, point en anglais).
   Couleurs : jetons de maths.css (--ink, --muted, --line, --accent, --z2, --ok). Rien n'est animé. */
(function () {
  'use strict';
  var R = window.REV; if (!R) return;
  var U = R.util, T = R.t;
  function nf(x, d) { return U.nf(Math.abs(x) < 5e-10 ? 0 : x, d); }
  function esc(s) { return U.esc(String(s)); }
  function r1(v) { return Math.round(v * 10) / 10; }

  var FN = {
    x2: function (x) { return x * x; }, sqrt: function (x) { return Math.sqrt(x); }, ln: function (x) { return Math.log(x); },
    inv: function (x) { return 1 / x; }, abs: function (x) { return Math.abs(x); }, sin: function (x) { return Math.sin(x); },
    exp: function (x) { return Math.exp(x); }, hyp: function (x) { return x + 3 / x - 4; }
  };
  function fun(f) { return typeof f === 'string' ? FN[f] : function (x) { return f.m * x + f.p; }; }

  /* ---------- repère : monde → pixels ---------- */
  function Plot(o) {
    this.x = o.x; this.y = o.y; this.w = o.w || 460; this.pad = o.pad || [14, 14, 26, 34];
    this.h = o.h || Math.round(this.w * (o.ratio || 0.62));
    this.sx = (this.w - this.pad[1] - this.pad[3]) / (this.x[1] - this.x[0]);
    this.sy = (this.h - this.pad[0] - this.pad[2]) / (this.y[1] - this.y[0]);
    this.p = [];
  }
  Plot.prototype = {
    X: function (x) { return r1(this.pad[3] + (x - this.x[0]) * this.sx); },
    Y: function (y) { return r1(this.pad[0] + (this.y[1] - y) * this.sy); },
    add: function (s) { this.p.push(s); return this; },
    axes: function (tx, ty, dec) {
      var s = '', x, y, y0 = this.Y(Math.max(this.y[0], Math.min(0, this.y[1]))), x0 = this.X(Math.max(this.x[0], Math.min(0, this.x[1])));
      for (x = Math.ceil(this.x[0] / tx) * tx; x <= this.x[1] + 1e-9; x += tx) {
        s += '<line x1="' + this.X(x) + '" y1="' + this.Y(this.y[0]) + '" x2="' + this.X(x) + '" y2="' + this.Y(this.y[1]) + '" style="stroke:var(--line);stroke-width:1"/>';
        if (Math.abs(x) > 1e-9) s += '<text x="' + this.X(x) + '" y="' + (y0 + 15) + '" text-anchor="middle" style="fill:var(--muted);font:11px var(--font-ui)">' + nf(x, dec || 0) + '</text>';
      }
      for (y = Math.ceil(this.y[0] / ty) * ty; y <= this.y[1] + 1e-9; y += ty) {
        s += '<line x1="' + this.X(this.x[0]) + '" y1="' + this.Y(y) + '" x2="' + this.X(this.x[1]) + '" y2="' + this.Y(y) + '" style="stroke:var(--line);stroke-width:1"/>';
        if (Math.abs(y) > 1e-9) s += '<text x="' + (x0 - 6) + '" y="' + (this.Y(y) + 4) + '" text-anchor="end" style="fill:var(--muted);font:11px var(--font-ui)">' + nf(y, dec || 0) + '</text>';
      }
      s += '<line x1="' + this.X(this.x[0]) + '" y1="' + y0 + '" x2="' + this.X(this.x[1]) + '" y2="' + y0 + '" style="stroke:var(--ink);stroke-width:1.4"/>' +
        '<line x1="' + x0 + '" y1="' + this.Y(this.y[0]) + '" x2="' + x0 + '" y2="' + this.Y(this.y[1]) + '" style="stroke:var(--ink);stroke-width:1.4"/>';
      return this.add(s);
    },
    path: function (f, a, b, n) {
      for (var d = '', k = 0; k <= (n || 160); k++) { var x = a + (b - a) * k / (n || 160), y = f(x); if (!isFinite(y)) continue; d += (d ? 'L' : 'M') + this.X(x) + ' ' + this.Y(Math.max(this.y[0] - 1, Math.min(this.y[1] + 1, y))); }
      return d;
    },
    curve: function (f, a, b) { return this.add('<path d="' + this.path(f, a, b) + '" fill="none" style="stroke:var(--ink);stroke-width:2.2"/>'); },
    /* surface entre la courbe et l'axe, de a à b, coupée en morceaux de signe constant */
    area: function (f, a, b) {
      var n = 240, k, x, parts = [], cur = null;
      for (k = 0; k <= n; k++) {
        x = a + (b - a) * k / n; var y = f(x), sg = y >= 0 ? 1 : -1;
        if (!cur || cur.sg !== sg) { if (cur) cur.pts.push([x, 0]); cur = { sg: sg, pts: [[x, 0]] }; parts.push(cur); }
        cur.pts.push([x, y]);
      }
      if (cur) cur.pts.push([b, 0]);
      var me = this;
      parts.forEach(function (pt) {
        me.add('<path d="M' + pt.pts.map(function (q) { return me.X(q[0]) + ' ' + me.Y(q[1]); }).join('L') + 'Z" style="fill:var(' + (pt.sg > 0 ? '--accent' : '--z2') + ');fill-opacity:.28;stroke:none"/>');
      });
      return this;
    },
    text: function (x, y, s, o) { o = o || {}; return this.add('<text x="' + (this.X(x) + (o.dx || 0)) + '" y="' + (this.Y(y) + (o.dy || 0)) + '" text-anchor="' + (o.anchor || 'middle') + '" style="fill:var(' + (o.c || '--ink') + ');font:' + (o.it ? 'italic ' : '') + (o.fs || 13) + 'px var(--font-body)">' + esc(s) + '</text>'); },
    svg: function (label) { return '<svg viewBox="0 0 ' + this.w + ' ' + this.h + '" role="img" aria-label="' + esc(label || '') + '" style="display:block;width:100%;max-width:' + this.w + 'px;height:auto;margin:0 auto">' + this.p.join('') + '</svg>'; }
  };
  function head(title, right) { return '<div class="bench-head"><span class="bh-t"><span' + (/[∫=]/.test(title) ? ' style="text-transform:none;letter-spacing:.01em"' : '') + '>' + title + '</span></span>' + (right ? '<span class="bh-r">' + right + '</span>' : '') + '</div>'; }

  /* ================================================================ aire sous une courbe */
  function area(el, o) {
    var f = fun(o.f), p = new Plot({ x: o.x, y: o.y, w: o.w || 420, ratio: o.ratio || 0.6 });
    p.axes(o.tx || 1, o.ty || 1).area(f, o.a, o.b).curve(f, o.x[0], o.x[1]);
    [o.a, o.b].forEach(function (v) { p.add('<line x1="' + p.X(v) + '" y1="' + p.Y(0) + '" x2="' + p.X(v) + '" y2="' + p.Y(f(v)) + '" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:4 3"/>'); });
    (o.labels || []).forEach(function (l) { p.text(l[0], l[1], l[2], { c: l[3] === 'neg' ? '--z2' : '--accent', fs: 13 }); });
    el.classList.add('bench');
    el.innerHTML = head(esc(o.title || T('Aire sous la courbe')), '') + '<div class="bench-body">' + p.svg(o.alt || o.title || T('Aire sous la courbe')) + '</div>';
  }

  /* ================================================================ méthode des rectangles */
  var PRESETS_RECT = {
    x2: { f: 'x2', a: 0, b: 1, x: [-0.08, 1.1], y: [-0.08, 1.1], tx: 0.2, ty: 0.2, dec: 1, exact: 1 / 3, name: 'x²', ex: '1/3', nmax: 40 },
    sqrt: { f: 'sqrt', a: 0, b: 4, x: [-0.3, 4.3], y: [-0.2, 2.3], tx: 1, ty: 0.5, dec: 1, exact: 16 / 3, name: '√x', ex: '16/3', nmax: 40 },
    ln: { f: 'ln', a: 1, b: 6, x: [-0.3, 6.4], y: [-0.2, 2.1], tx: 1, ty: 0.5, dec: 1, exact: 6 * Math.log(6) - 5, name: 'ln(x)', ex: '6 ln 6 − 5', nmax: 40 },
    inv: { f: 'inv', a: 1, b: 2, x: [0.9, 2.1], y: [-0.08, 1.1], tx: 0.2, ty: 0.2, dec: 1, exact: Math.log(2), name: '1/x', ex: 'ln 2', nmax: 40 }
  };
  function rect(el, o) {
    var st = { k: o.preset || 'x2', n: o.n || 5 }, id = 'ar' + Math.random().toString(36).slice(2, 7);
    var keys = o.only || ['x2', 'sqrt', 'ln', 'inv'];
    el.classList.add('bench');
    el.innerHTML = head(esc(o.title || T('Méthode des rectangles')), '') + '<div class="bench-body"><div class="ap-fig"></div></div>' +
      '<div class="ctrls"><div class="presets"><span class="hint">' + T('Fonction :') + '</span>' + keys.map(function (k) { return '<button type="button" class="chip-btn" data-k="' + k + '">' + esc(PRESETS_RECT[k].name) + '</button>'; }).join('') + '</div>' +
      '<div class="row" style="align-items:center;gap:.6rem"><label for="' + id + '" style="font-family:var(--font-ui);font-size:.88rem">' + T('Nombre d’intervalles') + ' <var>n</var></label><input id="' + id + '" type="range" min="1" max="40" step="1" value="' + st.n + '" style="flex:1 1 9rem;min-width:0"><output for="' + id + '" style="font-family:var(--font-ui);min-width:2ch"></output></div>' +
      '<div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.ap-fig'), inp = el.querySelector('input'), out = el.querySelector('output'), rd = el.querySelector('.readout');
    function paint() {
      var P = PRESETS_RECT[st.k], f = FN[P.f], n = st.n, h = (P.b - P.a) / n, lo = 0, hi = 0, k, p = new Plot({ x: P.x, y: P.y, w: 480, ratio: 0.6 });
      p.axes(P.tx, P.ty, P.dec);
      for (k = 0; k < n; k++) {
        var x0 = P.a + k * h, x1 = x0 + h, m = Math.min(f(x0), f(x1)), M = Math.max(f(x0), f(x1));
        lo += m * h; hi += M * h;
        p.add('<rect x="' + p.X(x0) + '" y="' + p.Y(M) + '" width="' + r1(p.X(x1) - p.X(x0)) + '" height="' + r1(p.Y(0) - p.Y(M)) + '" style="fill:var(--z2);fill-opacity:.16;stroke:var(--z2);stroke-width:1"/>');
        p.add('<rect x="' + p.X(x0) + '" y="' + p.Y(m) + '" width="' + r1(p.X(x1) - p.X(x0)) + '" height="' + r1(p.Y(0) - p.Y(m)) + '" style="fill:var(--accent);fill-opacity:.3;stroke:var(--accent);stroke-width:1"/>');
      }
      p.curve(f, Math.max(P.x[0], P.f === 'ln' || P.f === 'inv' ? 0.6 : P.f === 'sqrt' ? 0 : P.x[0]), P.x[1]);
      fig.innerHTML = p.svg(T('Rectangles inférieurs et supérieurs pour {f} sur [{a}, {b}] avec {n} intervalles', { f: P.name, a: nf(P.a), b: nf(P.b), n: n }));
      out.textContent = n;
      rd.innerHTML = '<p>' + T('Rectangles inférieurs') + ' : <b>' + nf(lo, 3) + '</b> · ' + T('rectangles supérieurs') + ' : <b>' + nf(hi, 3) + '</b></p>' +
        '<p>' + T('Donc') + ' ' + nf(lo, 3) + ' ≤ ∫ ≤ ' + nf(hi, 3) + ' · ' + T('écart') + ' : ' + nf(hi - lo, 3) + ' · ' + T('valeur exacte') + ' : ' + esc(P.ex) + ' ≈ ' + nf(P.exact, 3) + '</p>' +
        '<p class="muted" style="font-size:.9rem">' + T('L’écart vaut |f(b) − f(a)| × (b − a)/n : il est divisé par 2 quand n double.') + '</p>';
      Array.prototype.forEach.call(el.querySelectorAll('[data-k]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === st.k)); });
    }
    inp.addEventListener('input', function () { st.n = +inp.value; paint(); });
    Array.prototype.forEach.call(el.querySelectorAll('[data-k]'), function (b) { b.addEventListener('click', function () { st.k = b.dataset.k; paint(); }); });
    paint();
  }

  /* ================================================================ termes d'une suite et bande ε */
  var PRESETS_SEQ = {
    hom: { name: 'n/(n + 3)', u: function (n) { return n / (n + 3); }, l: 1, n0: 0, N: 40, y: [-0.1, 1.25], ty: 0.25, dec: 2, note: 'croissante, majorée par 1, converge vers 1' },
    inv2: { name: '1/n²', u: function (n) { return 1 / (n * n); }, l: 0, n0: 1, N: 30, y: [-0.15, 1.1], ty: 0.25, dec: 2, note: 'converge vers 0 : N ≥ 1/√ε convient' },
    alt: { name: '(−1)ⁿ', u: function (n) { return n % 2 ? -1 : 1; }, l: null, n0: 0, N: 30, y: [-1.4, 1.4], ty: 0.5, dec: 1, note: 'bornée, mais pas de limite : deux valeurs d’adhérence, 1 et −1' },
    gend: { name: '(2n + (−1)ⁿ)/(n² + cos n)', u: function (n) { return (2 * n + (n % 2 ? -1 : 1)) / (n * n + Math.cos(n)); }, l: 0, n0: 1, N: 40, y: [-0.15, 1.1], ty: 0.25, dec: 2, note: 'encadrée par deux suites qui tendent vers 0 (gendarmes)' },
    geo: { name: '(−2/3)ⁿ', u: function (n) { return Math.pow(-2 / 3, n); }, l: 0, n0: 0, N: 24, y: [-0.8, 1.1], ty: 0.25, dec: 2, note: 'géométrique, |q| < 1 : converge vers 0 en changeant de signe' },
    ag: { name: '1 + 4/5ⁿ', u: function (n) { return 1 + 4 / Math.pow(5, n); }, l: 1, n0: 0, N: 12, y: [-0.3, 5.3], ty: 1, dec: 0, note: 'arithmético-géométrique du TD 4 (u₀ = 5) : converge vers le point fixe 1' },
    div: { name: 'n + 2(−1)ⁿ', u: function (n) { return n + (n % 2 ? -2 : 2); }, l: Infinity, n0: 0, N: 16, y: [-3, 19], ty: 4, dec: 0, note: 'tend vers +∞ sans être croissante' }
  };
  function seq(el, o) {
    var keys = o.only || ['hom', 'inv2', 'gend', 'geo', 'ag', 'alt', 'div'], st = { k: o.preset || keys[0], e: o.eps || 0.2 }, id = 'as' + Math.random().toString(36).slice(2, 7);
    el.classList.add('bench');
    el.innerHTML = head(esc(o.title || T('Une suite et sa limite')), '') + '<div class="bench-body"><div class="ap-fig"></div></div>' +
      '<div class="ctrls"><div class="presets"><span class="hint">' + T('Suite :') + '</span>' + keys.map(function (k) { return '<button type="button" class="chip-btn" data-k="' + k + '">' + esc(PRESETS_SEQ[k].name) + '</button>'; }).join('') + '</div>' +
      '<div class="row" style="align-items:center;gap:.6rem"><label for="' + id + '" style="font-family:var(--font-ui);font-size:.88rem">' + T('Précision') + ' <var>ε</var></label><input id="' + id + '" type="range" min="0.02" max="0.5" step="0.02" value="' + st.e + '" style="flex:1 1 9rem;min-width:0"><output for="' + id + '" style="font-family:var(--font-ui);min-width:4ch"></output></div>' +
      '<div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.ap-fig'), inp = el.querySelector('input'), out = el.querySelector('output'), rd = el.querySelector('.readout');
    function paint() {
      var P = PRESETS_SEQ[st.k], n, fin = P.l !== null && isFinite(P.l), p = new Plot({ x: [-1, P.N + 1], y: P.y, w: 500, ratio: 0.5 });
      p.axes(P.N > 20 ? 10 : P.N > 12 ? 4 : 2, P.ty, P.dec);
      var rank = null;
      if (fin) {
        p.add('<rect x="' + p.X(-1) + '" y="' + p.Y(P.l + st.e) + '" width="' + r1(p.X(P.N + 1) - p.X(-1)) + '" height="' + r1(p.Y(P.l - st.e) - p.Y(P.l + st.e)) + '" style="fill:var(--ok);fill-opacity:.14;stroke:none"/>');
        p.add('<line x1="' + p.X(-1) + '" y1="' + p.Y(P.l) + '" x2="' + p.X(P.N + 1) + '" y2="' + p.Y(P.l) + '" style="stroke:var(--ok);stroke-width:1.4;stroke-dasharray:6 4"/>');
        p.text(P.N + 1, P.l, 'ℓ = ' + nf(P.l), { anchor: 'end', dy: -6, c: '--ok', fs: 12 });
        for (n = P.N; n >= P.n0; n--) { if (Math.abs(P.u(n) - P.l) >= st.e) break; rank = n; }
      }
      for (n = P.n0; n <= P.N; n++) {
        var v = P.u(n), inside = fin && Math.abs(v - P.l) < st.e;
        p.add('<circle cx="' + p.X(n) + '" cy="' + p.Y(Math.max(P.y[0], Math.min(P.y[1], v))) + '" r="3.4" style="fill:var(' + (inside ? '--ok' : fin ? '--z2' : '--accent') + ')"/>');
      }
      if (fin && rank !== null && rank > P.n0) p.add('<line x1="' + p.X(rank - 0.5) + '" y1="' + p.Y(P.y[0]) + '" x2="' + p.X(rank - 0.5) + '" y2="' + p.Y(P.y[1]) + '" style="stroke:var(--muted);stroke-width:1.2;stroke-dasharray:3 3"/>');
      fig.innerHTML = p.svg(T('Termes de la suite {s}', { s: P.name }));
      out.textContent = nf(st.e, 2);
      inp.disabled = !fin;
      var msg;
      if (fin) msg = rank === null ? T('Sur les termes tracés, aucun rang ne convient encore pour ε = {e} : la suite converge, mais plus lentement. Augmente ε.', { e: nf(st.e, 2) })
        : T('Pour ε = {e} : à partir du rang N = {N}, tous les termes tracés vérifient |uₙ − ℓ| < ε (points verts). Un ε plus petit demande un rang plus grand.', { e: nf(st.e, 2), N: rank });
      else if (P.l === null) msg = T('Pas de limite : aucune bande, aussi étroite soit-elle, ne finit par contenir tous les termes.');
      else msg = T('Limite +∞ : tout seuil A finit par être dépassé pour toujours, même si la suite redescend parfois.');
      rd.innerHTML = '<p><b>' + esc(P.name) + '</b> : ' + T(P.note) + '.</p><p>' + msg + '</p>';
      Array.prototype.forEach.call(el.querySelectorAll('[data-k]'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === st.k)); });
    }
    inp.addEventListener('input', function () { st.e = +inp.value; paint(); });
    Array.prototype.forEach.call(el.querySelectorAll('[data-k]'), function (b) { b.addEventListener('click', function () { st.k = b.dataset.k; paint(); }); });
    paint();
  }

  var MOUNT = { area: area, rect: rect, seq: seq };
  function mountAll(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('[data-apis]'), function (el) {
      if (el.dataset.apisDone) return; el.dataset.apisDone = '1';
      var o = {}; try { o = JSON.parse(el.getAttribute('data-opts') || '{}'); } catch (e) { o = {}; }
      if (MOUNT[el.dataset.apis]) MOUNT[el.dataset.apis](el, o);
    });
  }
  R.apis = { mount: mountAll, FN: FN };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mountAll(); }); else mountAll();

  R.i18n.add({
    'Aire sous la courbe': 'Area under the curve', 'Méthode des rectangles': 'The rectangle method', 'Fonction :': 'Function:',
    'Nombre d’intervalles': 'Number of intervals', 'Rectangles inférieurs': 'Lower rectangles', 'rectangles supérieurs': 'upper rectangles',
    'Donc': 'So', 'écart': 'gap', 'valeur exacte': 'exact value',
    'L’écart vaut |f(b) − f(a)| × (b − a)/n : il est divisé par 2 quand n double.': 'The gap is |f(b) − f(a)| × (b − a)/n: it is halved when n doubles.',
    'Rectangles inférieurs et supérieurs pour {f} sur [{a}, {b}] avec {n} intervalles': 'Lower and upper rectangles for {f} on [{a}, {b}] with {n} intervals',
    'Une suite et sa limite': 'A sequence and its limit', 'Suite :': 'Sequence:', 'Précision': 'Precision', 'Termes de la suite {s}': 'Terms of the sequence {s}',
    'Sur les termes tracés, aucun rang ne convient encore pour ε = {e} : la suite converge, mais plus lentement. Augmente ε.': 'Among the plotted terms, no rank works yet for ε = {e}: the sequence converges, but more slowly. Increase ε.',
    'Pour ε = {e} : à partir du rang N = {N}, tous les termes tracés vérifient |uₙ − ℓ| < ε (points verts). Un ε plus petit demande un rang plus grand.': 'For ε = {e}: from rank N = {N} on, every plotted term satisfies |uₙ − ℓ| < ε (green dots). A smaller ε needs a larger rank.',
    'Pas de limite : aucune bande, aussi étroite soit-elle, ne finit par contenir tous les termes.': 'No limit: no band, however narrow, ends up containing all the terms.',
    'Limite +∞ : tout seuil A finit par être dépassé pour toujours, même si la suite redescend parfois.': 'Limit +∞: every threshold A is eventually exceeded for good, even if the sequence sometimes goes down.',
    'croissante, majorée par 1, converge vers 1': 'increasing, bounded above by 1, converges to 1',
    'converge vers 0 : N ≥ 1/√ε convient': 'converges to 0: N ≥ 1/√ε works',
    'bornée, mais pas de limite : deux valeurs d’adhérence, 1 et −1': 'bounded, but no limit: two accumulation values, 1 and −1',
    'encadrée par deux suites qui tendent vers 0 (gendarmes)': 'squeezed between two sequences that tend to 0 (squeeze theorem)',
    'géométrique, |q| < 1 : converge vers 0 en changeant de signe': 'geometric, |q| < 1: converges to 0 with alternating signs',
    'arithmético-géométrique du TD 4 (u₀ = 5) : converge vers le point fixe 1': 'arithmetico-geometric sequence of TD 4 (u₀ = 5): converges to the fixed point 1',
    'tend vers +∞ sans être croissante': 'tends to +∞ without being increasing'
  });
})();
