/* Physique B2 — exercices des examens de fin de semestre de physique S1 (Epidocs S1/Finals/Phys), corrigés.
   Une fiche par exercice au programme : coordonnées polaires et mouvement circulaire (chapitre 1), 2e loi et énergie
   sur un cercle (chapitre 2), et ce qui reste du B1 (2e loi sur un plan incliné, cinématique cartésienne).
   Sans fiche : la statique (moments, équilibre d’un solide), pas encore au cours, et les questions de Frenet sur une
   courbe quelconque. Exercices qui ont déjà une fiche du B1 : spirale de 2016 et 2017 (partie B) = partiel nov. 2017
   Ex 2 (p2017-ex2) ; cycloïde de 2017 (partie A) = partiel 2019-2020 (p2019-ex1) ; hélice de 2016 = mai 2018 (p2018s-ex2).
   Énoncés verbatim ; chaque résultat recalculé (sympy) et comparé aux corrigés officiels quand ils existent.
   Format : celui de window.PHYS_EX (data/physique/ex-annales.js), poussé dans window.PHYS2_EX ; mêmes outils de
   notation ($…$, @f, @r) et de figures (Fig), recopiés ci-dessous ; les figures sont exposées dans window.PHYS2_FIGS
   (une fonction par figure, qui prend le texte pour lecteur d’écran) pour le fichier anglais. */
(function () {
  var X0 = window.PHYS2_EX = window.PHYS2_EX || [];


  /* ---------- notation ---------- */
  var VK = { OM: 'kp', OP: 'kp', OA: 'kp', CM: 'kp', r: 'kp', v: 'kv', V: 'kv', a: 'ka', F: 'kf', P: 'kf', R: 'kf', T: 'kf', f: 'kf' };
  var MARK = '[\\u0300-\\u036f]*';
  var RE_VEC = /^(OM|OP|OA|CM|[A-Za-z]|0)\u20d7/;
  var RE_FN = /^(Arctan|sin|cos|tan|ln)(?![A-Za-z])/;
  var RE_LET = new RegExp('^[A-Za-zÀ-ÖØ-öø-ɏḀ-ỿΑ-Ωα-ω]' + MARK);
  function grp(s, i) {
    for (var d = 0, j = i; j < s.length; j++) {
      if (s[j] === '{') d++;
      else if (s[j] === '}' && --d === 0) return { v: s.slice(i + 1, j), end: j + 1 };
    }
    throw new Error('accolade non fermée : ' + s);
  }
  function M(s) {
    var o = '', i = 0, m, g, c, rest, inner;
    while (i < s.length) {
      c = s[i]; rest = s.slice(i);
      if (c === '<') { var j = s.indexOf('>', i); o += s.slice(i, j + 1); i = j + 1; continue; }
      if (c === '&' && (m = /^&#?\w+;/.exec(rest))) { o += m[0]; i += m[0].length; continue; }
      if (c === '@') {
        var k = s[i + 1], a = [];
        for (i += 2; s[i] === '{'; i = g.end) { g = grp(s, i); a.push(g.v); }
        if (k === 'f') o += '<span class="frac"><span>' + M(a[0]) + '</span><span>' + M(a[1]) + '</span></span>';
        else if (k === 'r') o += '<span class="sqrt">√<span>' + M(a[0]) + '</span></span>';
        else if (k === 'c') o += '<span class="col">' + a.map(function (x) { return '<span>' + M(x) + '</span>'; }).join('') + '</span>';
        else if (k === 't') o += a[0];
        else throw new Error('commande inconnue @' + k);
        continue;
      }
      if (c === '_' || c === '^') {
        if (s[i + 1] === '{') { g = grp(s, i + 1); inner = g.v; i = g.end; }
        else { m = new RegExp('^.' + MARK).exec(s.slice(i + 1)); inner = m[0]; i += 1 + m[0].length; }
        inner = /^[A-Za-z]{2,}$/.test(inner) ? inner : M(inner);
        o += c === '_' ? '<sub>' + inner + '</sub>' : '<sup>' + inner + '</sup>';
        continue;
      }
      if ((m = RE_VEC.exec(rest))) {
        o += m[1] === '0' ? '<var class="vec up">0</var>' : '<var class="vec' + (VK[m[1]] ? ' ' + VK[m[1]] : '') + '">' + m[1] + '</var>';
        i += m[0].length; continue;
      }
      if ((m = RE_FN.exec(rest))) { o += m[1]; i += m[1].length; continue; }
      if ((m = RE_LET.exec(rest))) {
        var nx = s[i + m[0].length] || '';
        if (m[0] === 'd' && (RE_LET.test(s.slice(i + 1)) || nx === '²' || nx === '(' || nx === '')) o += 'd';
        else if (m[0] === 'e' && nx === '^') o += 'e';
        else o += '<var>' + m[0] + '</var>';
        i += m[0].length; continue;
      }
      o += c; i++;
    }
    return o;
  }
  /* texte avec formules entre $…$ */
  function X(s) { return s.replace(/\$([^$]+)\$/g, function (w, f) { return M(f); }); }
  /* équation centrée, une ligne par argument (une ligne trop longue passe à la ligne entre deux termes) */
  function E() { return '<div class="eq">' + Array.prototype.map.call(arguments, function (l) { return '<span>' + M(l) + '</span>'; }).join('') + '</div>'; }
  function ul(items) { return '<ul>' + items.map(function (x) { return '<li>' + X(x) + '</li>'; }).join('') + '</ul>'; }
  function P(s) { return '<p>' + X(s) + '</p>'; }
  function fig(svg, cap) { return '<figure class="fig" style="margin:0"><div class="mk-host">' + svg + '</div>' + (cap ? '<figcaption class="cap">' + X(cap) + '</figcaption>' : '') + '</figure>'; }
  /* QCM d’une question de cours : options a, b, c, d */
  function opts(list) { return '<ol type="a" style="margin:.3rem 0 0;padding-left:1.4rem;display:grid;gap:.15rem">' + list.map(function (x) { return '<li>' + X(x) + '</li>'; }).join('') + '</ol>'; }

  /* ---------- figures : repère en unités du monde, échelle identique sur les deux axes ---------- */
  function r1(v) { return Math.round(v * 10) / 10; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function Fig(o) {
    this.xr = o.x; this.yr = o.y; this.pad = o.pad || [16, 16, 16, 16]; this.w = o.w || 400;
    this.s = (this.w - this.pad[1] - this.pad[3]) / (this.xr[1] - this.xr[0]);
    this.h = Math.round(this.pad[0] + this.pad[2] + (this.yr[1] - this.yr[0]) * this.s);
    this.p = [];
  }
  /* symbole en italique, indice, flèche de vecteur au-dessus (comme R.meca.label) */
  function lab(x, y, name, o) {
    o = o || {};
    var fs = o.fs || 16, kind = o.kind || 'ink', cw = function (t) { var w = 0; for (var i = 0; i < t.length; i++) w += (/[A-Z]/.test(t[i]) ? 0.68 : 0.52) * fs; return w; };
    var wn = cw(name), ws = o.sub ? cw(o.sub) * 0.7 + fs * 0.06 : 0, w = wn + ws;
    var xs = o.anchor === 'end' ? x - w : o.anchor === 'middle' ? x - w / 2 : x;
    var s = '<text class="mk-math k-' + kind + (o.up ? ' up' : '') + '" x="' + r1(xs) + '" y="' + r1(y) + '" font-size="' + fs + '" fill="currentColor">' + esc(name) +
      (ws ? '<tspan dy="' + r1(fs * 0.3) + '" font-size="' + r1(fs * 0.7) + '">' + esc(o.sub) + '</tspan>' : '') + '</text>';
    if (o.arrow) {
      var ya = y - fs * 0.86, xa0 = xs + fs * 0.12, xa1 = xs + wn + fs * 0.1, hd = Math.max(2.6, fs * 0.17);
      s += '<path class="mk-varrow k-' + kind + '" fill="none" stroke="currentColor" d="M' + r1(xa0) + ' ' + r1(ya) + 'H' + r1(xa1) + 'M' + r1(xa1 - hd) + ' ' + r1(ya - hd * 0.8) + 'L' + r1(xa1) + ' ' + r1(ya) + 'L' + r1(xa1 - hd) + ' ' + r1(ya + hd * 0.8) + '"/>';
    }
    return s;
  }
  /* flèche pleine de (x0, y0) à (x1, y1) en px (comme R.meca.arrow) */
  function arrow(x0, y0, x1, y1, o) {
    o = o || {};
    var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), kind = o.kind || 'ink';
    var ux = dx / L, uy = dy / L, hl = Math.min(o.head || 9, L * 0.7), hw = hl * 0.45, bx = x1 - ux * hl, by = y1 - uy * hl;
    var s = '<g class="vk k-' + kind + '" stroke="currentColor" fill="currentColor"' + (o.style ? ' style="' + o.style + '"' : '') + '>' +
      '<path fill="none" stroke-width="2" d="M' + r1(x0) + ' ' + r1(y0) + 'L' + r1(bx + ux * 0.5) + ' ' + r1(by + uy * 0.5) + '"/>' +
      '<polygon stroke="none" points="' + r1(x1) + ',' + r1(y1) + ' ' + r1(bx - uy * hw) + ',' + r1(by + ux * hw) + ' ' + r1(bx + uy * hw) + ',' + r1(by - ux * hw) + '"/></g>';
    if (o.label) {
      var lx = x1 + ux * 11 + (o.lab ? o.lab[0] : 0), ly = y1 + uy * 11 + 5 + (o.lab ? o.lab[1] : 0);
      var an = o.anchor || (ux > 0.35 ? 'start' : ux < -0.35 ? 'end' : 'middle');
      s += (o.style ? '<g style="' + o.style + '">' : '') + lab(lx, ly, o.label, { sub: o.sub, kind: kind, anchor: an, fs: o.fs, arrow: o.arrow !== false }) + (o.style ? '</g>' : '');
    }
    return s;
  }
  Fig.prototype = {
    X: function (x) { return this.pad[3] + (x - this.xr[0]) * this.s; },
    Y: function (y) { return this.pad[0] + (this.yr[1] - y) * this.s; },
    add: function (s) { this.p.push(s); return this; },
    /* axes fléchés passant par at (origine par défaut) ; o.x, o.y : noms ; o.origin : nom de l’origine */
    axes: function (o) {
      o = o || {};
      var at = o.at || [0, 0], ax = r1(this.Y(at[1])), ay = r1(this.X(at[0]));
      var X0 = r1(this.X(o.x0 != null ? o.x0 : this.xr[0])), X1 = r1(this.X(o.x1 != null ? o.x1 : this.xr[1])), Y0 = r1(this.Y(o.y0 != null ? o.y0 : this.yr[0])), Y1 = r1(this.Y(o.y1 != null ? o.y1 : this.yr[1]));
      var s = '<path class="' + (o.dash ? 'mk-dash' : 'mk-axis') + '" fill="none" stroke="currentColor" d="M' + X0 + ' ' + ax + 'H' + (X1 - 2) + 'M' + ay + ' ' + Y0 + 'V' + (Y1 + 2) + '"/>' +
        '<path class="mk-axhead" fill="currentColor" d="M' + X1 + ' ' + ax + 'l-8 -3.6v7.2zM' + ay + ' ' + Y1 + 'l-3.6 8h7.2z"/>';
      if (o.x) s += lab(X1 - 2, ax - 9, o.x, { anchor: 'end', fs: 15 });
      if (o.y) s += lab(ay + 9, Y1 + 12, o.y, { fs: 15 });
      if (o.origin) s += '<text class="mk-pname" x="' + (ay - 6) + '" y="' + (ax + 17) + '" text-anchor="end" font-size="16" fill="currentColor">' + esc(o.origin) + '</text>';
      return this.add('<g class="mk-axes">' + s + '</g>');
    },
    /* graduation : marque et texte sur l’axe x (o.y : sur l’axe y) */
    tick: function (v, text, o) {
      o = o || {};
      var s;
      if (o.y) { var py = r1(this.Y(v)), ay = r1(this.X(o.at || 0)); s = '<path class="mk-tick" stroke="currentColor" d="M' + (ay - 4) + ' ' + py + 'H' + (ay + 4) + '"/><text class="mk-num" x="' + (ay - 7) + '" y="' + (py + 4) + '" text-anchor="end" font-size="11" fill="currentColor">' + esc(text) + '</text>'; }
      else { var px = r1(this.X(v)), ax = r1(this.Y(o.at || 0)); s = '<path class="mk-tick" stroke="currentColor" d="M' + px + ' ' + (ax - 4) + 'V' + (ax + 4) + '"/><text class="mk-num" x="' + px + '" y="' + (ax + 16) + '" text-anchor="middle" font-size="11" fill="currentColor">' + esc(text) + '</text>'; }
      return this.add(s);
    },
    param: function (fn, t0, t1, o) {
      o = o || {};
      for (var n = o.n || 180, d = '', k = 0; k <= n; k++) { var q = fn(t0 + (t1 - t0) * k / n); d += (d ? 'L' : 'M') + r1(this.X(q[0])) + ' ' + r1(this.Y(q[1])); }
      return this.add('<path class="' + (o.cls || 'mk-traj') + '" fill="none" stroke="currentColor" d="' + d + '"/>');
    },
    line: function (a, b, cls) { return this.add('<path class="' + (cls || 'mk-line') + '" fill="none" stroke="currentColor" d="M' + r1(this.X(a[0])) + ' ' + r1(this.Y(a[1])) + 'L' + r1(this.X(b[0])) + ' ' + r1(this.Y(b[1])) + '"/>'); },
    /* vecteur : origine en unités du monde, composantes en px (y vers le haut) */
    vec: function (at, d, o) { var x0 = this.X(at[0]), y0 = this.Y(at[1]); return this.add(arrow(x0, y0, x0 + d[0], y0 - d[1], o)); },
    /* point marqué et son nom */
    pt: function (at, name, o) {
      o = o || {};
      var x = this.X(at[0]), y = this.Y(at[1]);
      return this.add('<circle class="' + (o.cls || 'mk-pt') + '" cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + (o.r || 3.5) + '" fill="currentColor"/>' +
        (name ? '<text class="mk-pname" x="' + r1(x + (o.dx == null ? 7 : o.dx)) + '" y="' + r1(y + (o.dy == null ? -7 : o.dy)) + '" text-anchor="' + (o.anchor || 'start') + '" font-size="16" fill="currentColor">' + esc(name) + '</text>' : ''));
    },
    /* symbole (italique) en unités du monde, décalé de dx, dy px */
    sym: function (at, name, o) { o = o || {}; return this.add(lab(this.X(at[0]) + (o.dx || 0), this.Y(at[1]) + (o.dy || 0), name, o)); },
    /* texte droit (petit) */
    text: function (at, str, o) { o = o || {}; return this.add('<text class="' + (o.cls || 'mk-t') + '" x="' + r1(this.X(at[0]) + (o.dx || 0)) + '" y="' + r1(this.Y(at[1]) + (o.dy || 0)) + '" text-anchor="' + (o.anchor || 'start') + '" font-size="' + (o.fs || 13) + '" fill="currentColor">' + esc(str) + '</text>'); },
    /* arc d’angle de centre c, rayon r (monde), de a0 à a1 (radians), flèche au bout si o.head */
    arc: function (c, r, a0, a1, o) {
      o = o || {};
      var x0 = this.X(c[0] + r * Math.cos(a0)), y0 = this.Y(c[1] + r * Math.sin(a0)), x1 = this.X(c[0] + r * Math.cos(a1)), y1 = this.Y(c[1] + r * Math.sin(a1));
      var R = r * this.s, s = '<path class="' + (o.cls || 'mk-line') + '" fill="none" stroke="currentColor" d="M' + r1(x0) + ' ' + r1(y0) + 'A' + r1(R) + ' ' + r1(R) + ' 0 ' + (Math.abs(a1 - a0) > Math.PI ? 1 : 0) + ' ' + (a1 > a0 ? 0 : 1) + ' ' + r1(x1) + ' ' + r1(y1) + '"/>';
      if (o.head) {
        /* tangente au bout de l’arc, en px (y vers le bas) */
        var sg = a1 > a0 ? 1 : -1, tx = -Math.sin(a1) * sg, ty = -Math.cos(a1) * sg, bx = x1 - tx * 7, by = y1 - ty * 7;
        s += '<polygon class="mk-axhead" fill="currentColor" points="' + r1(x1) + ',' + r1(y1) + ' ' + r1(bx - ty * 3.2) + ',' + r1(by + tx * 3.2) + ' ' + r1(bx + ty * 3.2) + ',' + r1(by - tx * 3.2) + '"/>';
      }
      return this.add(s);
    },
    svg: function (label) {
      return '<svg class="mk" viewBox="0 0 ' + this.w + ' ' + this.h + '" style="display:block;width:100%;max-width:' + this.w + 'px;height:auto;margin:0 auto" role="img" aria-label="' + esc(label || '') + '">' + this.p.join('') + '</svg>';
    }
  };


  /* ---------- les figures ---------- */
  var D = Math.PI / 180, ACC = 'color:var(--accent)';
  var F = window.PHYS2_FIGS = {};
  function circ(f, c, r, a0, a1, cls) { return f.param(function (t) { return [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]; }, a0, a1, { cls: cls || 'mk-curve' }); }

  /* janv. 2017 Ex 3 : arc AB de centre O, rayon R, angle θ = 60°, puis segment horizontal BC */
  F.piste17 = (function () {
    var R = 1.5, O = [0, R], A = [-R * Math.sin(60 * D), R - R * Math.cos(60 * D)];
    var f = new Fig({ x: [-1.75, 2.75], y: [-0.45, 1.95], w: 340, pad: [8, 8, 8, 8] });
    circ(f, O, R, -150 * D, -90 * D).line([0, 0], [2.5, 0], 'mk-curve');
    f.line(O, A, 'mk-dash').line(O, [0, 0], 'mk-dash').arc(O, 0.42, -150 * D, -90 * D).sym(O, 'θ', { dx: -16, dy: 42, fs: 15 });
    f.pt(O, 'O', { dx: 6, dy: -6 }).pt(A, 'A', { dx: -8, dy: -6, anchor: 'end' }).pt([0, 0], 'B', { dx: -4, dy: 18, anchor: 'end' }).pt([2.5, 0], 'C', { dx: 0, dy: 18, anchor: 'middle' });
    f.vec(A, [0.5 * 42, -0.866 * 42], { kind: 'vel', label: 'V', sub: 'A', anchor: 'end', lab: [-12, 8] });
    return f.svg.bind(f);
  })();
  /* janv. 2018 Ex 2 : bille sur une sphère de centre O, rayon r, angle θ depuis la verticale */
  F.sphere18 = (function () {
    var t = 35 * D, Mp = [Math.sin(t), Math.cos(t)];
    var f = new Fig({ x: [-0.3, 1.55], y: [-0.25, 1.55], w: 260, pad: [8, 8, 8, 8] });
    f.axes({ x: 'x', y: 'z', origin: 'O' });
    circ(f, [0, 0], 1, 0, Math.PI / 2);
    f.line([0, 0], Mp, 'mk-dash').arc([0, 0], 0.32, Math.PI / 2 - t, Math.PI / 2).sym([0, 0], 'θ', { dx: 12, dy: -42, fs: 15 });
    f.pt([0, 1], 'A', { dx: -8, dy: -4, anchor: 'end' }).pt(Mp, 'M', { dx: -6, dy: -10, anchor: 'end' });
    f.vec(Mp, [0, -40], { kind: 'frc', label: 'P', lab: [4, 2] });
    f.vec(Mp, [Mp[0] * 34, Mp[1] * 34], { kind: 'frc', label: 'R' });
    return f.svg.bind(f);
  })();
  /* janv. 2018 Ex 3 : guide demi-cylindrique de rayon R, A au bord, B au point le plus bas (z = 0) */
  F.guide18 = (function () {
    var f = new Fig({ x: [-1.35, 1.45], y: [-0.25, 1.75], w: 280, pad: [8, 8, 8, 8] });
    var C = [0, 1];
    circ(f, C, 1, Math.PI, 2 * Math.PI);
    f.line([0, 0], [0, 1.65], 'mk-dash').line(C, [-1, 1], 'mk-dash').sym([-0.5, 1], 'R', { dx: -6, dy: -8, fs: 15 });
    f.pt([1, 1], 'A', { dx: 8, dy: 4 }).pt([0, 0], 'B (z = 0)', { dx: 8, dy: 16 }).sym([0, 1.65], 'z', { dx: 8, dy: 6, fs: 15 });
    return f.svg.bind(f);
  })();
  /* juin 2018 Ex 3 : départ en A à la hauteur h, boucle de centre O et de rayon R, M repéré par θ au-dessus de OO₁ */
  F.loop18 = (function () {
    var h = 2.6, y0 = -1, t = 40 * D, Mp = [Math.cos(t), Math.sin(t)];
    var f = new Fig({ x: [-3.35, 1.6], y: [-1.4, 1.85], w: 380, pad: [8, 8, 8, 8] });
    f.line([-3.3, y0], [1.5, y0], 'mk-curve').param(function (u) { return [-3 + 3 * u, y0 + h * Math.pow(1 - u, 2.2)]; }, 0, 1, { cls: 'mk-curve' });
    circ(f, [0, 0], 1, 0, 2 * Math.PI);
    f.line([-3.2, y0], [-3.2, y0 + h], 'mk-dash').sym([-3.2, y0 + h / 2], 'h', { dx: 6, dy: 4, fs: 15 });
    f.line([0, 0], [1, 0], 'mk-dash').line([0, 0], Mp, 'mk-dash').arc([0, 0], 0.3, 0, t).sym([0, 0], 'θ', { dx: 30, dy: -6, fs: 14 });
    f.pt([-3, y0 + h], 'A', { dx: 8, dy: -4 }).pt([0, y0], 'B', { dx: -6, dy: 18, anchor: 'end' }).pt([0, 0], 'O', { dx: -6, dy: 16, anchor: 'end' }).pt([1, 0], 'O₁', { dx: 6, dy: 16 }).pt([0, 1], 'C', { dx: 0, dy: -9, anchor: 'middle' }).pt(Mp, 'M', { dx: 8, dy: -4 });
    return f.svg.bind(f);
  })();
  /* janv. 2020 Ex 1 : plan incliné d’angle α, poulie au sommet, masse m suspendue */
  F.plan20 = (function () {
    var al = 30 * D, L = 3.2, top = [L * Math.cos(al), L * Math.sin(al)];
    var f = new Fig({ x: [-0.2, 3.5], y: [-0.85, 2.0], w: 320, pad: [8, 8, 8, 8] });
    f.add('<path class="mk-curve" fill="currentColor" fill-opacity=".07" stroke="currentColor" d="M' + f.X(0) + ' ' + f.Y(0) + 'L' + f.X(top[0]) + ' ' + f.Y(top[1]) + 'L' + f.X(top[0]) + ' ' + f.Y(0) + 'Z"/>');
    f.arc([0, 0], 0.55, 0, al).sym([0, 0], 'α', { dx: 46, dy: -5, fs: 15 });
    var s = 1.7, c = [s * Math.cos(al) - 0.16 * Math.sin(al), s * Math.sin(al) + 0.16 * Math.cos(al)], hw = 0.22, hh = 0.16, ux = [Math.cos(al), Math.sin(al)], uy = [-Math.sin(al), Math.cos(al)];
    function P(a, b) { return f.X(c[0] + a * ux[0] + b * uy[0]) + ' ' + f.Y(c[1] + a * ux[1] + b * uy[1]); }
    f.add('<path class="mk-curve" fill="var(--surface)" stroke="currentColor" d="M' + P(-hw, -hh) + 'L' + P(hw, -hh) + 'L' + P(hw, hh) + 'L' + P(-hw, hh) + 'Z"/>');
    f.sym(c, 'm', { sub: '1', dx: -4, dy: -18, fs: 15 });
    var pc = [top[0] + 0.02, top[1] + 0.13], pr = 0.13;
    circ(f, pc, pr, 0, 2 * Math.PI);
    var att = [c[0] + hw * ux[0], c[1] + hw * ux[1]];
    f.line(att, [pc[0] - pr * Math.sin(al), pc[1] + pr * Math.cos(al)], 'mk-curve').line([pc[0] + pr, pc[1]], [pc[0] + pr, 0.75], 'mk-curve');
    f.add('<rect class="mk-curve" fill="var(--surface)" stroke="currentColor" x="' + (f.X(pc[0] + pr) - 13) + '" y="' + f.Y(0.75) + '" width="26" height="24"/>');
    f.text([pc[0] + pr, 0.75], 'm', { dx: 18, dy: 16, cls: 'mk-pname', fs: 15 });
    return f.svg.bind(f);
  })();
  /* janv. 2020 Ex 3 : gouttière en quart de cercle de centre O, rayon r, A au sommet, M repéré par θ */
  F.gout20 = (function () {
    var t = 40 * D, Mp = [Math.sin(t), Math.cos(t)];
    var f = new Fig({ x: [-0.25, 1.4], y: [-0.2, 1.35], w: 240, pad: [8, 8, 8, 8] });
    circ(f, [0, 0], 1, 0, Math.PI / 2).line([0, 0], [0, 1], 'mk-dash').line([0, 0], [1.2, 0], 'mk-dash').line([0, 0], Mp, 'mk-dash');
    f.arc([0, 0], 0.32, Math.PI / 2 - t, Math.PI / 2).sym([0, 0], 'θ', { dx: 10, dy: -40, fs: 15 });
    f.pt([0, 0], 'O', { dx: -6, dy: 14, anchor: 'end' }).pt([0, 1], 'A', { dx: -8, dy: 0, anchor: 'end' }).pt(Mp, 'M', { dx: 8, dy: -6 });
    return f.svg.bind(f);
  })();
  /* déc. 2022 Ex 2 : ellipse de demi-axes a (sur Ox) et b, M₀ = (a ; 0), M repéré par φ */
  F.ell22 = (function () {
    var a = 2, b = 1.2, p = 40 * D, Mp = [a * Math.cos(p), b * Math.sin(p)];
    var f = new Fig({ x: [-2.5, 2.7], y: [-1.6, 1.75], w: 340, pad: [8, 8, 8, 8] });
    f.axes({ x: 'x', y: 'y', origin: 'O' });
    f.param(function (u) { return [a * Math.cos(u), b * Math.sin(u)]; }, 0, 2 * Math.PI, { cls: 'mk-curve k-pos' });
    f.line([0, 0], Mp, 'mk-dash').arc([0, 0], 0.45, 0, Math.atan2(Mp[1], Mp[0])).sym([0, 0], 'φ', { dx: 40, dy: -8, fs: 15 });
    f.pt([a, 0], 'M₀', { dx: 6, dy: 16 }).pt(Mp, 'M', { dx: 6, dy: -6 }).tick(a, 'a').tick(b, 'b', { y: true });
    return f.svg.bind(f);
  })();

  /* ---------- fiches ---------- */
  function site(s) { return '<p class="muted">' + X(s) + '</p>'; }
  var NOTE_OK = 'Réponses recalculées ; conformes au corrigé officiel.', NOTE_REDIGE = 'Pas de corrigé officiel : correction rédigée et vérifiée par calcul.';
  var POL = 'Sur un cercle, la base de Frenet est la base polaire : $u⃗_T = u⃗_θ$, $u⃗_N = −u⃗_ρ$, $a_T = Rθ̈$, $a_N = Rθ̇² = V²/R$ (chapitre 2, partie 6).';

  X0.push({
    id: 'f2022d-ex2', exam: 'f2022d', kind: 'final', order: 2, src: 'Examen déc. 2022 · Ex 2',
    title: 'Mouvement elliptique : conditions initiales, vitesse, accélération', pts: 5.5, topics: ['cinematique', 'trajectoire'], lvl: 2, time: 15,
    intro: P('Un point matériel M se déplace sur une ellipse d’équation en coordonnées cartésiennes : $@f{x²}{a²} + @f{y²}{b²} = 1$ (voir figure). La direction de $OM⃗$ par rapport à l’axe O$x$ est repérée par l’angle φ.') +
      P('Les équations horaires du mouvement de M peuvent se mettre sous la forme :') + E('x(t) = x_0 cos(ωt + φ_0)', 'y(t) = y_0 sin(ωt + φ_0)') +
      P('où ω est une constante, $x_0$, $y_0$, $φ_0$ des constantes à déterminer. Conditions initiales : à l’instant $t$ = 0, le point M se trouve en M₀.'),
    figs: [{ svg: F.ell22('Ellipse de centre O, de demi-axes a sur l’axe x et b sur l’axe y ; M0 en (a ; 0) ; point M repéré par l’angle phi.'), cap: 'L’ellipse ; M₀ = ($a$ ; 0).' }],
    questions: [X('1. Déterminer $x_0$ et $φ_0$ d’après les conditions initiales.'), X('2. En utilisant l’équation de la trajectoire, en déduire que $y = b sin(ωt)$.'),
      X('3. Déterminer les composantes du vecteur vitesse. Calculer sa norme.'), X('4. Déterminer les composantes du vecteur accélération. Calculer sa norme.'),
      X('5. Montrer que l’on peut écrire $a⃗ = k OM⃗$ et déterminer la valeur de $k$.')],
    hints: [X('En $t$ = 0 : $x(0) = x_0 cos φ_0 = a$ et $y(0) = y_0 sin φ_0 = 0$.'), X('Remplace $x = a cos(ωt)$ dans l’équation de l’ellipse : il reste $y² = b² sin²(ωt)$.'), X('Dérive deux fois : chaque coordonnée revient multipliée par $−ω²$.')],
    solution: [
      { t: 'Question 1 : conditions initiales', html: P('$y(0) = y_0 sin φ_0 = 0$ avec $y_0 ≠ 0$ : $φ_0 = 0$. Puis $x(0) = x_0 = a$.') + E('x_0 = a   φ_0 = 0') },
      { t: 'Question 2 : y(t)', html: P('Avec $x = a cos(ωt)$ dans l’équation de la trajectoire :') + E('cos²(ωt) + @f{y²}{b²} = 1  ⇒  y² = b² sin²(ωt)') +
        P('Avec $y = y_0 sin(ωt)$, on identifie $y_0 = b$ (en prenant $y_0 &gt; 0$, sens trigonométrique) : $y = b sin(ωt)$.') },
      { t: 'Question 3 : vitesse', html: E('v⃗ = −aω sin(ωt) u⃗_x + bω cos(ωt) u⃗_y', 'v = ω @r{a² sin²(ωt) + b² cos²(ωt)}') + P('La norme varie : le mouvement n’est pas uniforme (sauf si $a = b$, cercle).') },
      { t: 'Question 4 : accélération', html: E('a⃗ = −aω² cos(ωt) u⃗_x − bω² sin(ωt) u⃗_y', '‖a⃗‖ = ω² @r{a² cos²(ωt) + b² sin²(ωt)}') },
      { t: 'Question 5 : a⃗ = k OM⃗', html: P('$OM⃗ = a cos(ωt) u⃗_x + b sin(ωt) u⃗_y$ : chaque composante de $a⃗$ est celle de $OM⃗$ multipliée par $−ω²$.') + E('a⃗ = −ω² OM⃗   k = −ω²') +
        P('L’accélération est dirigée vers O, comme pour un cercle : c’est le même résultat que l’ellipse du partiel 2018-2019.') }],
    answer: ul(['$x_0 = a$, $φ_0 = 0$ ; $y = b sin(ωt)$', '$v⃗ = (−aω sin(ωt) ; bω cos(ωt))$, $v = ω@r{a² sin²(ωt) + b² cos²(ωt)}$', '$a⃗ = (−aω² cos(ωt) ; −bω² sin(ωt))$', '$a⃗ = −ω² OM⃗$, $k = −ω²$']),
    traps: [X('Écrire $‖v⃗‖ = ω(a + b)$ : on n’additionne pas les composantes, on prend la racine de la somme des carrés.'), X('Oublier le signe de $k$ : l’accélération pointe vers O, $k &lt; 0$.')],
    grading: 'Barème imprimé : 5,5 points pour l’exercice.', official: false, note: 'Seule une copie d’élève corrigée est publiée : correction rédigée et vérifiée par calcul.'
  });

  X0.push({
    id: 'f2022-ex2', exam: 'f2022', kind: 'final', order: 2, src: 'Examen janv. 2022 · Ex 2',
    title: 'Un cercle parcouru en αt² : vitesse, abscisse curviligne, accélération', pts: 11, topics: ['circulaire', 'cinematique', 'frenet'], lvl: 2, time: 25,
    intro: P('Soit un point matériel M dont la cinématique est décrite par les équations horaires suivantes en coordonnées cartésiennes :') + E('x(t) = R cos(αt²)', 'y(t) = R sin(αt²)') + P('où $R$ et α sont des constantes strictement positives.') +
      site('Les questions 5 à 9 sont posées en base de Frenet : sur un cercle, elle se lit avec la base polaire (chapitre 2, partie 6).'),
    questions: [X('1) Montrer que le point M possède une trajectoire circulaire de centre O et de rayon $R$.'), X('2) En coordonnées cartésiennes, écrire le vecteur position puis déterminer le vecteur vitesse en fonction de α, $R$ et $t$.'),
      X('3) En déduire que la norme du vecteur vitesse s’exprime $v(t) = 2αRt$. Le mouvement est-il uniforme ?'), X('4) À l’aide d’une analyse dimensionnelle, donner l’unité de α.'),
      X('5) Le point M est initialement au point A (à $t$ = 0) : représenter la base de Frenet au point A. Vous indiquerez le sens du mouvement sur le cercle.'), X('6) Déduire des questions précédentes le vecteur vitesse en base de Frenet.'),
      X('7) Déterminer l’abscisse curviligne $s(t)$ en fonction de α, $R$ et $t$.'), X('8) Déterminer le temps $t_1$ nécessaire au point M pour effectuer un tour complet, en fonction de α.'),
      X('9) a. Exprimer les composantes normale et tangentielle du vecteur accélération en base de Frenet. b. En déduire la norme de l’accélération du point M en fonction de α, $R$ et $t$.')],
    hints: [X('Calcule $x² + y²$.'), X('Pose θ = α$t²$ : M est en polaires à $ρ = R$, θ = α$t²$, donc $v⃗ = Rθ̇ u⃗_θ$.'), X('$s$ est la longueur parcourue : $s = Rθ$. Un tour : θ = 2π.')],
    solution: [
      { t: 'Questions 1 à 3 : trajectoire et vitesse', html: E('x² + y² = R²(cos² + sin²) = R²') + P('Trajectoire : cercle de centre O, de rayon $R$.') +
        E('OM⃗ = R cos(αt²) u⃗_x + R sin(αt²) u⃗_y', 'v⃗ = −2αRt sin(αt²) u⃗_x + 2αRt cos(αt²) u⃗_y', 'v = 2αRt @r{sin² + cos²} = 2αRt') +
        P('$v$ augmente avec $t$ : le mouvement n’est <b>pas uniforme</b>, il est accéléré.') },
      { t: 'Question 4 : unité de α', html: P('α$t²$ est un angle (sans dimension) : α s’exprime en s⁻² (rad·s⁻²). Vérification : $v = 2αRt$ est bien en m·s⁻¹.') },
      { t: 'Questions 5 et 6 : base de Frenet et vitesse', html: P('À $t$ = 0, M est en A = ($R$ ; 0). θ = α$t²$ augmente : M tourne dans le sens trigonométrique. En A, $u⃗_T$ est tangent dans le sens du mouvement ($u⃗_T = u⃗_y$) et $u⃗_N$ pointe vers le centre ($u⃗_N = −u⃗_x$).') +
        E('v⃗ = v u⃗_T = 2αRt u⃗_T') + P('C’est $Rθ̇ u⃗_θ$ en polaires, avec θ̇ = 2α$t$.') },
      { t: 'Questions 7 et 8 : abscisse curviligne, tour complet', html: E('s(t) = ∫_0^t 2αRt′ dt′ = αRt²   (= Rθ)', 'αt_1² = 2π  ⇒  t_1 = @r{@f{2π}{α}}') },
      { t: 'Question 9 : accélération', html: E('a_T = @f{dv}{dt} = 2αR   a_N = @f{v²}{R} = 4α²Rt²', '‖a⃗‖ = @r{a_T² + a_N²} = 2αR @r{1 + 4α²t⁴}') +
        P(POL + ' Vérification en cartésiennes : en dérivant deux fois $x$ et $y$, on retrouve la même norme.') }],
    answer: ul(['Cercle de centre O, de rayon $R$ ; $v = 2αRt$, mouvement accéléré (non uniforme)', 'α en s⁻²', '$v⃗ = 2αRt u⃗_T$ ; $s = αRt²$ ; $t_1 = @r{2π/α}$', '$a_T = 2αR$, $a_N = 4α²Rt²$, $‖a⃗‖ = 2αR@r{1 + 4α²t⁴}$']),
    traps: [X('Oublier la dérivée de α$t²$ (2α$t$) devant le sinus et le cosinus.'), X('Prendre $a_N = 0$ parce que $a_T$ est constante : dès que M tourne, $a_N = v²/R &gt; 0$.'), X('Écrire $t_1 = 2π/α$ : c’est $t_1²$ qui vaut 2π/α.')],
    grading: 'Barème imprimé : 11 points pour l’exercice.', official: false, note: NOTE_REDIGE
  });

  X0.push({
    id: 'f2022-ex3', exam: 'f2022', kind: 'final', order: 3, src: 'Examen janv. 2022 · Ex 3',
    title: 'Des cartésiennes aux polaires : ρ(t), θ(t), vitesse', pts: 6, topics: ['polaire'], lvl: 2, time: 15,
    intro: P('Un point matériel M décrit, par rapport à un repère cartésien $(u⃗_x, u⃗_y)$, une trajectoire définie par les équations horaires suivantes :') + E('x(t) = b sin(ωt)', 'y(t) = b[1 − cos(ωt)]') + P('avec $b$ une constante strictement positive.'),
    questions: [X('1. a) Donner l’expression de la coordonnée polaire radiale ρ($t$) du mouvement de M. b) Sachant que $1 − cos(ωt) = 2 sin²(ωt/2)$, trouver l’expression simplifiée de ρ($t$).'),
      X('2. a) Donner l’expression de la coordonnée polaire angulaire θ($t$). b) Sachant que $(1 − cos ωt)/sin ωt = tan(ωt/2)$, trouver l’expression simplifiée de θ($t$).'),
      X('3. a) Donner l’expression du vecteur position $OM⃗(t)$ en coordonnées polaires. b) En déduire l’expression en coordonnées polaires du vecteur vitesse $v⃗(t)$ du point M.')],
    hints: [X('ρ = $@r{x² + y²}$ ; développe, puis utilise la formule donnée.'), X('tan θ = $y/x$ : la formule donnée simplifie directement.'), X('$v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$.')],
    solution: [
      { t: 'Question 1 : ρ(t)', html: E('ρ² = b² sin²(ωt) + b²(1 − cos ωt)² = b²(2 − 2cos ωt) = 2b²(1 − cos ωt)', 'ρ² = 4b² sin²(ωt/2)   ρ = 2b sin(ωt/2)') +
        P('Pour $0 &lt; ωt &lt; 2π$, sin($ωt$/2) &gt; 0 : ρ est bien positif. Sinon on écrit ρ = 2$b$|sin($ωt$/2)|.') },
      { t: 'Question 2 : θ(t)', html: E('tan θ = @f{y}{x} = @f{1 − cos ωt}{sin ωt} = tan(ωt/2)   θ = @f{ωt}{2}') +
        P('Vérification : ρ cos θ = 2$b$ sin($ωt$/2) cos($ωt$/2) = $b$ sin($ωt$) = $x$, et ρ sin θ = 2$b$ sin²($ωt$/2) = $y$.') },
      { t: 'Question 3 : position et vitesse', html: E('OM⃗ = 2b sin(ωt/2) u⃗_ρ', 'ρ̇ = bω cos(ωt/2)   θ̇ = ω/2', 'v⃗ = bω cos(ωt/2) u⃗_ρ + bω sin(ωt/2) u⃗_θ') +
        P('Norme : $v = bω$, constante. La trajectoire est le cercle de centre (0 ; $b$) et de rayon $b$, qui passe par O.') }],
    answer: ul(['ρ = 2$b$ sin($ωt$/2)', 'θ = $ωt$/2', '$OM⃗ = 2b sin(ωt/2) u⃗_ρ$ ; $v⃗ = bω cos(ωt/2) u⃗_ρ + bω sin(ωt/2) u⃗_θ$']),
    traps: [X('Écrire $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$ : pas de terme en $u⃗_θ$ dans la position.'), X('Prendre θ = $ωt$ : l’angle polaire est vu depuis O, qui est sur le cercle et non à son centre.')],
    grading: 'Barème imprimé : 6 points pour l’exercice.', official: false, note: NOTE_REDIGE
  });

  X0.push({
    id: 'f2020-ex1', exam: 'f2020', kind: 'final', order: 1, src: 'Examen janv. 2020 · Ex 1',
    title: 'Plan incliné et poulie : accélération, tension, réaction', pts: 5, topics: ['newton'], lvl: 2, time: 15,
    intro: P('On considère un objet de masse $m_1$ qui se déplace sans frottements sur un plan incliné d’un angle α par rapport à l’horizontale ; la poulie est de masse négligeable, les fils sont de masses négligeables et inextensibles. Un objet de masse $m$ se déplace verticalement comme le montre la figure.') +
      P('On donne : α = 30°, $m_1$ = 0,8 kg, $m$ = 1 kg et $g$ = 10 m·s⁻². L’angle α est aussi l’angle entre la verticale du poids et la normale au plan incliné.'),
    figs: [{ svg: F.plan20('Plan incliné d’angle alpha, masse m1 sur le plan, fil passant sur une poulie au sommet, masse m suspendue verticalement.'), cap: 'Figure 1 du sujet (redessinée).' }],
    questions: [X('1- Représenter les forces extérieures appliquées sur les systèmes $m_1$ et $m$.'), X('2- a) Appliquer la deuxième loi de Newton à la masse $m_1$ et à la masse $m$, pour en déduire l’accélération. Donner l’expression littérale en fonction de $m_1$, $m$, α et $g$. b) Faire l’application numérique.'),
      X('3- Calculer la tension du fil.'), X('4- Calculer la réaction du plan incliné exercée sur la masse $m_1$.')],
    hints: [X('Fil inextensible, poulie idéale : même accélération $a$ pour les deux masses, même tension $T$ des deux côtés.'), X('Projette sur l’axe du plan pour $m_1$ (vers le haut) et sur la verticale descendante pour $m$, puis additionne les deux équations.')],
    solution: [
      { t: 'Question 1 : forces', html: ul(['Sur $m_1$ : poids $P⃗_1$, réaction $R⃗$ perpendiculaire au plan, tension $T⃗_1$ le long du fil, vers la poulie.', 'Sur $m$ : poids $P⃗$, tension $T⃗$ vers le haut.']) },
      { t: 'Question 2 : accélération', html: P('Axe O$x$ le long du plan, vers la poulie ; pour $m$, axe vertical vers le bas. Même $a$, même $T$.') +
        E('m_1 : T − m_1g sin α = m_1a', 'm : mg − T = ma', 'a = g @f{m − m_1 sin α}{m + m_1} = 10 × @f{1 − 0,4}{1,8} = @f{10}{3} ≈ 3,3 m·s⁻²') },
      { t: 'Question 3 : tension', html: E('T = m(g − a) = 1 × (10 − 10/3) = @f{20}{3} ≈ 6,7 N') },
      { t: 'Question 4 : réaction', html: P('Sur la normale au plan, $m_1$ ne bouge pas : la réaction compense la composante normale du poids.') + E('R = m_1g cos α = 0,8 × 10 × @f{@r{3}}{2} = 4@r{3} ≈ 6,9 N') }],
    answer: ul(['$a = g(m − m_1 sin α)/(m + m_1) = 10/3 ≈ 3,3$ m·s⁻²', '$T = m(g − a) = 20/3 ≈ 6,7$ N', '$R = m_1g cos α = 4@r{3} ≈ 6,9$ N']),
    traps: [X('Écrire $T = mg$ : la masse accélère, la tension est plus petite que son poids.'), X('Prendre $m_1g sin α$ pour la réaction : sin α est sur l’axe du plan, cos α sur la normale.')],
    grading: 'Corrigé officiel : 1,5 point pour l’expression littérale, 0,5 pour l’application numérique, 1 pour la tension.', official: true, note: NOTE_OK
  });

  X0.push({
    id: 'f2020-ex3', exam: 'f2020', kind: 'final', order: 3, src: 'Examen janv. 2020 · Ex 3',
    title: 'Gouttière en quart de cercle : accélération, réaction, décollage', pts: 6, topics: ['dyncirc', 'energie', 'frenet'], lvl: 3, time: 20,
    intro: P('Un solide (S) de masse $m$, assimilable à un point matériel, glisse sans frottement sur une gouttière ayant la forme d’un quart de cercle de centre O et de rayon $r$. Le solide (S) quitte le sommet A avec une vitesse quasi nulle. Une position M de (S) à un instant $t$ est repérée par l’angle θ. On précise que la gouttière est dans le plan vertical.'),
    figs: [{ svg: F.gout20('Quart de cercle de centre O ; A au sommet ; M repéré par l’angle thêta entre la verticale OA et OM.'), cap: 'Figure 3 du sujet (redessinée).' }],
    questions: [X('1- Représenter les forces extérieures exercées sur le solide (S) au point M.'),
      X('2- Appliquer la deuxième loi de Newton au système (S), en choisissant de travailler dans le repère de Frenet, pour en déduire les expressions de : a) la composante tangentielle $a_T$ du vecteur accélération en fonction de $g$ et θ ; b) la norme de la réaction $R⃗$ de la gouttière sur (S) en fonction de $g$, θ et de la vitesse $V$ au point M.'),
      X('3- a) On montre que le carré de la vitesse au point M s’exprime par : $V² = 2g r(1 − cos θ)$. En déduire l’expression de la norme de la réaction en fonction de $g$, θ et $m$. b) Déterminer l’expression de l’angle θ lorsque le système (S) quitte la gouttière.')],
    hints: [X('Deux forces : le poids et la réaction, perpendiculaire à la gouttière (pas de frottement).'), X('Sur $u⃗_T$ : $mg sin θ = ma_T$. Sur $u⃗_N$ (vers O) : $mg cos θ − R = mV²/r$.'), X('Le solide quitte la gouttière quand $R$ s’annule.')],
    solution: [
      { t: 'Question 1 : forces', html: P('Le poids $P⃗$, vertical vers le bas, et la réaction $R⃗$, perpendiculaire à la gouttière, dirigée vers l’extérieur (de O vers M).') },
      { t: 'Question 2 : 2e loi', html: P('Base de Frenet en M : $u⃗_T$ tangent vers l’avant, $u⃗_N$ vers O. ' + POL) +
        E('sur u⃗_T : mg sin θ = ma_T  ⇒  a_T = g sin θ', 'sur u⃗_N : mg cos θ − R = m@f{V²}{r}  ⇒  R = m(g cos θ − @f{V²}{r})') },
      { t: 'Question 3 : réaction et décollage', html: E('R = m(g cos θ − 2g(1 − cos θ)) = mg(3 cos θ − 2)', 'R = 0  ⇔  cos θ = @f{2}{3}  ⇔  θ = arccos(2/3) ≈ 48°') +
        P('Au-delà, la formule donnerait $R &lt; 0$ : la gouttière ne peut que pousser, le solide l’a quittée.') }],
    answer: ul(['$a_T = g sin θ$', '$R = m(g cos θ − V²/r)$', '$R = mg(3 cos θ − 2)$ ; décollage pour cos θ = 2/3']),
    traps: [X('Oublier le terme $mV²/r$ : $R = mg cos θ$ est la réponse du plan incliné, pas du cercle.'), X('Chercher l’angle où la vitesse s’annule : c’est la réaction qui s’annule.')],
    grading: 'Corrigé officiel : 1 point pour $a_T$, 1 pour $R$, 1,5 pour $R = mg(3 cos θ − 2)$, 1,5 pour l’angle.', official: true, note: NOTE_OK
  });

  X0.push({
    id: 'f2018j-ex1', exam: 'f2018j', kind: 'final', order: 1, src: 'Examen juin 2018 · Ex 1',
    title: 'Cercle parcouru à V₀/(1 + αt) : abscisse curviligne, accélération', pts: 4, topics: ['circulaire', 'frenet'], lvl: 2, time: 10,
    intro: P('Un point matériel décrit un cercle de centre O et de rayon $R$ avec une vitesse $V⃗$ de norme :') + E('V(t) = @f{V_0}{1 + αt}') + P('où $V_0$ et α sont deux constantes positives.'),
    questions: [X('1- Exprimer l’abscisse curviligne $s(t)$, sachant que $s(t = 0) = 0$.'), X('2- Exprimer les composantes du vecteur accélération en base de Frenet.')],
    hints: [X('$V = ds/dt$ : $s$ est la primitive de $V$ nulle en 0.'), X('$a_T = dV/dt$ et $a_N = V²/R$.')],
    solution: [
      { t: 'Question 1 : abscisse curviligne', html: E('s(t) = ∫_0^t @f{V_0}{1 + αt′} dt′ = @f{V_0}{α} ln(1 + αt)') + P('Vérification : la dérivée de $(V_0/α) ln(1 + αt)$ est $V_0/(1 + αt)$, et $s(0) = 0$.') },
      { t: 'Question 2 : accélération', html: E('a_T = @f{dV}{dt} = −@f{αV_0}{(1 + αt)²}   a_N = @f{V²}{R} = @f{V_0²}{R(1 + αt)²}') +
        P('$a_T &lt; 0$ : le mouvement est circulaire décéléré ; $a_N &gt; 0$, comme toujours. ' + POL) }],
    answer: ul(['$s(t) = (V_0/α) ln(1 + αt)$', '$a_T = −αV_0/(1 + αt)²$ ; $a_N = V_0²/(R(1 + αt)²)$']),
    traps: [X('Dériver au lieu d’intégrer pour $s$ : c’est $V$ la dérivée de $s$.'), X('Oublier le signe moins de $a_T$ : la vitesse diminue.')],
    grading: 'Barème imprimé : 4 points pour l’exercice.', official: true, note: NOTE_OK
  });

  X0.push({
    id: 'f2018j-ex3', exam: 'f2018j', kind: 'final', order: 3, src: 'Examen juin 2018 · Ex 3',
    title: 'Le looping : vitesses par l’énergie, réaction par la 2e loi', pts: 6, topics: ['dyncirc', 'energie', 'frenet'], lvl: 3, time: 20,
    intro: P('Une masse $m$ est lâchée sans vitesse initiale du point A ($V_A$ = 0). Au point B, elle suit le profil circulaire décrit par la boucle BCB de centre O et de rayon $R$, en tournant dans le sens trigonométrique à l’intérieur de la boucle. Pour tout l’exercice, les frottements sont négligeables.'),
    figs: [{ svg: F.loop18('Piste descendant de A, à la hauteur h, jusqu’à B, bas d’une boucle circulaire de centre O et de rayon R ; C au sommet ; M repéré par l’angle thêta au-dessus du diamètre horizontal O O1.'), cap: 'La boucle ; M est repéré par θ au-dessus du diamètre horizontal OO₁.' }],
    questions: [X('1- Utiliser le théorème d’énergie mécanique entre A et B pour calculer la vitesse $V_B$. On donne : $g$ = 10 m·s⁻² et $h$ = 1 m.'),
      X('2- Utiliser le théorème d’énergie mécanique entre le point A et le point M pour exprimer la vitesse $V_M$ au point M, en fonction de $g$, $R$ (rayon), $h$ et l’angle θ.'),
      X('3- Représenter la réaction $R⃗_N$ exercée par le support sur la masse $m$ au point M (la masse se trouve à l’intérieur de la boucle) ; exprimer cette réaction en fonction de $g$, $h$, $m$, $R$ et l’angle θ, en utilisant la deuxième loi de Newton en base de Frenet $(u⃗_T, u⃗_N)$.')],
    hints: [X('Sans frottement, l’énergie mécanique se conserve. Hauteur de M au-dessus de B : $R + R sin θ$.'), X('Vers le centre : la réaction (vers O) et la composante $mg sin θ$ du poids.')],
    solution: [
      { t: 'Question 1 : V_B', html: E('mgh = ½mV_B²  ⇒  V_B = @r{2gh} = @r{20} = 2@r{5} ≈ 4,5 m·s⁻¹') },
      { t: 'Question 2 : V_M', html: E('mgh = ½mV_M² + mg(R + R sin θ)', 'V_M² = 2g(h − R − R sin θ)') },
      { t: 'Question 3 : réaction', html: P('$R⃗_N$ est perpendiculaire à la boucle, dirigée vers O ($u⃗_N$). Le poids a sur $u⃗_N$ la composante $mg sin θ$ (M est au-dessus du diamètre). ' + POL) +
        E('R_N + mg sin θ = m@f{V_M²}{R}', 'R_N = mg(@f{2h}{R} − 2 − 3 sin θ)') +
        P('Au sommet C (θ = 90°) : $R_N = mg(2h/R − 5)$, positive seulement si $h ≥ 5R/2$ (chapitre 2, partie 5).') }],
    answer: ul(['$V_B = @r{2gh} = 2@r{5}$ m·s⁻¹', '$V_M² = 2g(h − R − R sin θ)$', '$R_N = mg(2h/R − 2 − 3 sin θ)$']),
    traps: [X('Compter la hauteur de M depuis O ($R sin θ$) au lieu de B ($R + R sin θ$).'), X('Mettre le poids du mauvais côté : au-dessus du diamètre, sa composante pointe vers le centre et s’ajoute à la réaction.')],
    grading: 'Barème imprimé : 6 points pour l’exercice.', official: true, note: 'Réponses recalculées ; le corrigé officiel est manuscrit et partiellement lisible.'
  });

  X0.push({
    id: 'f2018-ex2', exam: 'f2018', kind: 'final', order: 2, src: 'Examen janv. 2018 · Ex 2',
    title: 'Bille sur une sphère : 2e loi, équation du mouvement, réaction', pts: 5, topics: ['dyncirc', 'frenet'], lvl: 2, time: 15,
    intro: P('Une bille de masse $m$ est lâchée sans vitesse initiale du point A d’une sphère de rayon OM = $r$ et de centre O. Les frottements sont négligés. On étudie le mouvement pendant que la bille est encore en contact avec la sphère.'),
    figs: [{ svg: F.sphere18('Quart de sphère de centre O ; A au sommet ; bille en M, repérée par l’angle thêta depuis la verticale ; poids P vers le bas, réaction R vers l’extérieur.'), cap: 'La bille en M, repérée par θ depuis la verticale.' }],
    questions: [X('1- Donner les composantes du vecteur accélération de la bille dans la base de Frenet $(t⃗, n⃗)$, en fonction de θ̈, θ̇, $r$.'),
      X('2- a) Écrire la deuxième loi de Newton dans la base de Frenet. b) En déduire l’équation différentielle du mouvement ainsi que la norme de la réaction $R$.')],
    hints: [X('$V = rθ̇$ : $a_T = rθ̈$, $a_N = rθ̇²$.'), X('Projection du poids : $mg sin θ$ vers l’avant, $mg cos θ$ vers O.')],
    solution: [
      { t: 'Question 1 : accélération', html: E('a⃗ = rθ̈ t⃗ + rθ̇² n⃗') + P(POL) },
      { t: 'Question 2 : 2e loi', html: E('sur t⃗ : mg sin θ = mrθ̈', 'sur n⃗ : mg cos θ − R = mrθ̇²') +
        P('Équation différentielle (tangente) et réaction (normale) :') + E('θ̈ − @f{g}{r} sin θ = 0   R = m(g cos θ − rθ̇²)') +
        P('Pour aller plus loin : avec l’énergie, $rθ̇² = 2g(1 − cos θ)$, d’où $R = mg(3 cos θ − 2)$ et le décollage à cos θ = 2/3 (chapitre 2, parties 3 et 4).') }],
    answer: ul(['$a_T = rθ̈$, $a_N = rθ̇²$', 'θ̈ − ($g/r$) sin θ = 0', '$R = m(g cos θ − rθ̇²)$']),
    traps: [X('Mettre la réaction dans l’équation tangente : sans frottement, elle est normale.'), X('Écrire $a_N = rθ̈$ : la composante normale contient θ̇², la tangente θ̈.')],
    grading: 'Corrigé officiel : 2 points pour l’accélération, 2 pour la 2e loi, 1 pour l’équation et la réaction.', official: true, note: NOTE_OK
  });

  X0.push({
    id: 'f2018-ex3', exam: 'f2018', kind: 'final', order: 3, src: 'Examen janv. 2018 · Ex 3',
    title: 'Guide demi-cylindrique avec frottement : énergies et force de frottement', pts: 5, topics: ['energie'], lvl: 2, time: 15,
    intro: P('Un objet ponctuel de masse $m$ = 10 g est lâché du point A sans vitesse initiale. Le guide hémicylindrique de rayon $R$ est immobile dans le référentiel terrestre. Lorsque l’objet passe pour la première fois par le point B le plus bas du guide, sa vitesse est $V_B$ = 4 m/s. On note $f⃗$ la force de frottement agissant sur $m$ et qui est de norme constante.'),
    figs: [{ svg: F.guide18('Demi-cercle de rayon R sous son diamètre horizontal ; A sur le bord, au niveau du centre ; B au point le plus bas, à z = 0.'), cap: 'Le guide : A au bord, B au fond ($z$ = 0).' }],
    questions: [X('1- Représenter les forces extérieures exercées sur la masse en un point M quelconque entre A et B.'),
      X('2- Calculer la variation d’énergie cinétique Δ$E_c$ et la variation d’énergie potentielle de pesanteur Δ$E_p$ entre les points A et B. En déduire la variation d’énergie mécanique Δ$E_m$. On donne $R$ = 1 m et $g$ = 10 m/s².'),
      X('3- Déterminer le travail de la force de frottement entre A et B en utilisant le théorème d’énergie mécanique. En déduire la norme de cette force supposée constante.')],
    hints: [X('A est à la hauteur $R$ au-dessus de B.'), X('Le trajet AB est un quart de cercle : longueur π$R$/2.')],
    solution: [
      { t: 'Question 1 : forces', html: P('Le poids $P⃗$, la réaction normale $R⃗_N$ (vers le centre du guide) et le frottement $f⃗$, tangent, opposé au mouvement.') },
      { t: 'Question 2 : énergies', html: E('ΔE_c = ½mV_B² − 0 = ½ × 0,01 × 16 = 0,08 J', 'ΔE_p = mg(z_B − z_A) = −0,01 × 10 × 1 = −0,1 J', 'ΔE_m = 0,08 − 0,1 = −0,02 J') },
      { t: 'Question 3 : frottement', html: P('La réaction normale ne travaille pas ; seul le frottement est non conservatif :') +
        E('W(f⃗) = ΔE_m = −0,02 J', 'W(f⃗) = −f × @f{πR}{2}  ⇒  f = @f{0,04}{π} ≈ 1,3·10⁻² N') +
        P('Le corrigé officiel prend π ≈ 3 et trouve 1,33·10⁻² N.') }],
    answer: ul(['Δ$E_c$ = 0,08 J ; Δ$E_p$ = −0,1 J ; Δ$E_m$ = −0,02 J', '$W(f⃗)$ = −0,02 J ; $f$ = 0,04/π ≈ 1,3·10⁻² N']),
    traps: [X('Oublier de convertir 10 g en 0,01 kg.'), X('Prendre la distance AB en ligne droite ($R@r{2}$) au lieu de l’arc π$R$/2.')],
    grading: 'Corrigé officiel : 1 point par variation d’énergie, 0,5 pour Δ$E_m$, 1 pour le travail, 0,5 pour $f$.', official: true, note: NOTE_OK
  });

  X0.push({
    id: 'f2017-ex3', exam: 'f2017', kind: 'final', order: 3, src: 'Examen janv. 2017 · Ex 3',
    title: 'Piste en arc puis en ligne droite : frottements et vitesse', pts: 7, topics: ['energie'], lvl: 2, time: 20,
    intro: P('Un solide ponctuel de masse $m$ se déplace sur la piste schématisée ci-dessous. La portion AB est un arc de cercle de rayon $R$, d’angle θ, de centre O ; la portion BC est un segment horizontal. On lance le solide du point A avec une vitesse $V_A$ tangente au cercle.'),
    figs: [{ svg: F.piste17('Arc AB de centre O et d’angle thêta, B au point le plus bas, puis segment horizontal BC ; vitesse VA tangente en A.'), cap: 'La piste ABC.' }],
    questions: [X('1- a) Faire le bilan des forces extérieures exercées sur le solide entre A et B, sachant que les frottements sur la partie AB sont assimilables à une force constante $f$. Représenter ces forces. b) Utiliser le théorème d’énergie cinétique entre A et B pour exprimer la force de frottement $f$ en fonction de $R$, $g$, $V_A$, $V_B$, $m$ et θ. Faire le calcul avec : $m$ = 0,1 kg, $g$ = 10 m·s⁻², $R$ = 1,5 m, $V_A$ = 2 m·s⁻¹, $V_B$ = 3 m·s⁻¹ ; θ = 60° ≈ 1 rad.'),
      X('2- a) Les frottements sur le trajet BC sont assimilables à une force $f$ = 0,1 N. Calculer la vitesse au point C, sachant que BC = 2 m. b) Calculer la norme de la réaction totale $R⃗$ qui s’exerce sur le solide pendant le trajet BC.')],
    hints: [X('Hauteur de A au-dessus de B : $R(1 − cos θ)$. Travail du frottement sur l’arc : $−fRθ$.'), X('Sur BC, le poids ne travaille pas. La réaction totale est la somme de la réaction normale et du frottement, perpendiculaires.')],
    solution: [
      { t: 'Question 1 : frottement sur l’arc', html: P('Forces : poids $P⃗$, réaction normale $R⃗$ (ne travaille pas), frottement $f⃗$ opposé au mouvement. La vitesse n’est pas une force.') +
        E('½m(V_B² − V_A²) = mgR(1 − cos θ) − fRθ', 'f = @f{1}{Rθ}[mgR(1 − cos θ) − ½m(V_B² − V_A²)]', 'f = @f{0,75 − 0,25}{1,5} = @f{1}{3} N') },
      { t: 'Question 2 : trajet BC', html: E('½m(V_C² − V_B²) = −f × BC  ⇒  V_C² = 9 − @f{2 × 0,1 × 2}{0,1} = 5   V_C = @r{5} m·s⁻¹') +
        E('R_tot = @r{(mg)² + f²} = @r{1 + 0,01} = @r{1,01} ≈ 1 N') }],
    answer: ul(['$f = [mgR(1 − cos θ) − ½m(V_B² − V_A²)]/(Rθ) = 1/3$ N', '$V_C = @r{5}$ m·s⁻¹ ; $R_tot = @r{1,01} ≈ 1$ N']),
    traps: [X('Dessiner $V⃗_A$ comme une force.'), X('Oublier que la réaction totale sur BC inclut le frottement : $@r{R² + f²}$.')],
    grading: 'Barème imprimé : 7 points pour l’exercice.', official: true, note: 'Réponses recalculées ; conformes au corrigé officiel (en anglais).'
  });
})();
