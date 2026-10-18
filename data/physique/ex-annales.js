/* Physique — exercices des sujets de partiel de physique S1 (contrôle 1, mécanique du point), corrigés.
   Source : analyse des annales Epidocs (sujets de novembre 2017 à octobre 2022, dont le contrôle S1# de mai 2018,
   noté p2018s). Une fiche par exercice au programme de cette année (cinématique cartésienne, tir, mouvement
   circulaire, coordonnées polaires). Énoncés verbatim ; les remarques ajoutées par le site sont en gris.
   Hors programme, sans fiche : base de Frenet, abscisse curviligne, produit vectoriel, exercices en coordonnées
   cylindriques (2018-2019 Ex 2, 2019-2020 Ex 3, 2020-2021 Ex 3, nov. 2017 Ex 3). Questions retirées d’une fiche :
   nov. 2017 Ex 2 Q4 et 2018-2019 Ex 3 Q3-4 (Frenet), mai 2018 Ex 2 partie B (cylindriques).
   Regroupements : l’ellipse de 2018-2019 (Ex 1) est le mouvement de mai 2018 (Ex 1) : une fiche, p2018s-ex1 ;
   l’hélice de 2019-2020 (Ex 2, Q1-2) est celle de mai 2018 (Ex 2, partie A) : une fiche, p2018s-ex2.
   Les QCM des sujets 2017 à 2020 restent dans la banque de QCM ; ceux de 2021 et 2022 (exercices notés) ont aussi
   leur fiche. Chaque résultat a été vérifié par un script node (dérivées, normes, trajectoires, valeurs).

   Format d’une fiche (window.PHYS_EX) : { id, exam, kind, order, src, title, pts, topics, lvl, time, intro,
   figs: [{ svg, cap }], questions, hints, solution: [{ t, html }], answer, traps, grading, official, note }.
   Les figures des corrections sont dans le html de l’étape (<figure class="fig">).
   window.PHYS_FIGS : les figures (SVG, classes .mk de physique.css), une fonction par figure qui prend le texte
   pour lecteur d’écran ; le fichier anglais (data/en/physique/ex-annales.js) s’en sert aussi.

   Notation (fonction M, reprise telle quelle dans le fichier anglais) : lettres en italique, sin cos tan ln droits,
   « d » droit devant une lettre (dt, dθ, dOM⃗), vecteur = nom suivi de U+20D7 (OM⃗, v⃗, a⃗, u⃗…), _x ou _{…} indice,
   ^{…} exposant, @f{num}{dén} fraction, @r{…} racine, @c{…}{…} colonne, @t{…} texte droit. X('texte $formule$')
   met en forme les formules d’un texte, E('ligne', …) une équation centrée. */
(function () {
  var X0 = window.PHYS_EX = window.PHYS_EX || [];

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
  var F = window.PHYS_FIGS = {};

  /* oct. 2022 Ex 2 : tir depuis A(0 ; h). Valeurs du dessin : v0 = 9, α = 55°, g = 10, h = 2 (unités SI). */
  function tir22(vectors) {
    var v0 = 9, al = 55 * D, g = 10, h = 2, vx = v0 * Math.cos(al), vy0 = v0 * Math.sin(al);
    var x = function (t) { return vx * t; }, y = function (t) { return -g * t * t / 2 + vy0 * t + h; };
    var tS = vy0 / g, tP = (vy0 + Math.sqrt(vy0 * vy0 + 2 * g * h)) / g;
    var f = new Fig({ x: [-1.1, 9.9], y: [-0.75, 5.9], w: 420, pad: [8, 10, 10, 10] });
    f.axes({ x: 'x', y: 'y', origin: 'O' }).param(function (t) { return [x(t), y(t)]; }, 0, tP);
    var pts = [[0.3, 'M₁', -10, -8, 'end'], [tS, 'S', 0, -10, 'middle'], [1.05, 'M₂', 8, -8, 'start'], [1.38, 'M₃', 9, -2, 'start']];
    if (!vectors) {
      f.pt([0, h], 'A', { dx: -8, dy: 5, anchor: 'end' }).line([0, h], [2.3, h], 'mk-dash').arc([0, h], 0.75, 0, al).sym([0, h], 'α', { dx: 34, dy: -6, fs: 15 });
      f.vec([0, h], [52 * Math.cos(al), 52 * Math.sin(al)], { kind: 'vel', label: 'v', sub: '0', anchor: 'end', lab: [-14, 10] });
      f.vec([1.7, 1], [0, 0.95 * f.s], { head: 7 }).vec([1.7, 1], [0, -0.95 * f.s], { head: 7 }).sym([1.7, 1], 'h', { dx: 7, dy: 5, fs: 15 });
      f.vec([0, 0], [0, 26], { label: 'u', sub: 'y', anchor: 'end', lab: [-14, 14] }).vec([0, 0], [26, 0], { label: 'u', sub: 'x', lab: [-16, 22] });
      pts.forEach(function (p) { f.pt([x(p[0]), y(p[0])], p[1], { dx: p[2], dy: p[3], anchor: p[4], r: 3 }); });
      f.pt([x(tP), 0], 'P', { dx: 6, dy: -8, r: 3 });
    } else {
      pts.forEach(function (p) {
        var t = p[0], X = x(t), Y = y(t), vy = vy0 - g * t;
        f.pt([X, Y], p[1], { dx: p[2], dy: p[3], anchor: p[4], r: 3 });
        f.vec([X, Y], [vx * 5.4, vy * 5.4], { kind: 'vel', label: t === tS ? 'v' : '', lab: [0, -2] });
        f.vec([X, Y], [0, -30], { kind: 'acc', label: t === tS ? 'a' : '', lab: [12, -4] });
      });
    }
    return f.svg.bind(f);
  }
  F.tir22 = tir22(false);
  F.tir22v = tir22(true);

  /* oct. 2022 Ex 3 : vilebrequin. Valeurs du dessin : R = 1, L = 2,6, θ = 30°. */
  function vil(base) {
    var R = 1, L = 2.6, th = 30 * D, M = [R * Math.cos(th), R * Math.sin(th)], yP = M[1] + Math.sqrt(L * L - M[0] * M[0]);
    var f = new Fig({ x: [-1.75, 1.95], y: [-1.35, 3.75], w: 300, pad: [8, 8, 8, 8] });
    f.param(function (a) { return [R * Math.cos(a), R * Math.sin(a)]; }, 0, 2 * Math.PI, { cls: 'mk-dash' });
    f.axes({ dash: true, x: 'x', y: 'y', x0: -1.6, x1: 1.85, y0: -1.3, y1: 3.65 });
    f.add('<path class="mk-line" fill="none" stroke="currentColor" d="M' + r1(f.X(-0.32)) + ' ' + r1(f.Y(2.45)) + 'V' + r1(f.Y(3.25)) + 'H' + r1(f.X(0.32)) + 'V' + r1(f.Y(2.45)) + '"/>');
    f.add('<path class="mk-axis" fill="none" stroke="currentColor" stroke-width="3" style="stroke-width:3" d="M' + r1(f.X(0)) + ' ' + r1(f.Y(0)) + 'L' + r1(f.X(M[0])) + ' ' + r1(f.Y(M[1])) + 'M' + r1(f.X(0)) + ' ' + r1(f.Y(yP)) + 'L' + r1(f.X(M[0])) + ' ' + r1(f.Y(M[1])) + '"/>');
    f.pt([0, 0], 'O', { dx: -8, dy: 16, anchor: 'end', r: 4 }).pt(M, 'M', { dx: 8, dy: 17, r: 4 }).pt([0, yP], 'P', { dx: -10, dy: 5, anchor: 'end', r: 4 });
    f.sym([M[0] / 2, M[1] / 2], 'R', { dx: -14, dy: -6, fs: 15 }).sym([M[0] / 2, (M[1] + yP) / 2], 'L', { dx: 8, dy: 0, fs: 15 });
    f.arc([0, 0], 0.42, 0, th).sym([0.42, 0.1], 'θ', { dx: 5, dy: 2, fs: 15 });
    f.vec([-1.45, 2.7], [0, 26], { label: 'u', sub: 'y', lab: [-14, 14], anchor: 'end' }).vec([-1.45, 2.7], [26, 0], { label: 'u', sub: 'x', lab: [-2, 4] });
    if (base) {
      f.vec(M, [40 * Math.cos(th), 40 * Math.sin(th)], { label: 'u', sub: 'ρ', style: ACC, lab: [-2, 6] });
      f.vec(M, [-40 * Math.sin(th), 40 * Math.cos(th)], { label: 'u', sub: 'θ', style: ACC, lab: [2, 0] });
    }
    return f.svg.bind(f);
  }
  F.vil = vil(false);
  F.vilBase = vil(true);

  /* nov. 2021 Ex 2 : coordonnées polaires et cartésiennes du point M */
  F.pol21 = (function () {
    var M = [3, 1.9], th = Math.atan2(M[1], M[0]), k = 42;
    var f = new Fig({ x: [-1.25, 4.4], y: [-0.75, 2.95], w: 380, pad: [8, 8, 8, 8] });
    f.axes({ x: 'x', y: 'y', origin: 'O' });
    f.line([M[0], 0], M, 'mk-dash').line([0, M[1]], M, 'mk-dash');
    f.sym([M[0], 0], 'x', { dx: -4, dy: 18, fs: 15 }).sym([0, M[1]], 'y', { dx: -16, dy: 5, fs: 15 });
    f.line([0, 0], M, 'mk-axis').pt(M, 'M', { dx: 6, dy: -6 });
    f.sym([M[0] * 0.62, M[1] * 0.62], 'ρ', { dx: -6, dy: -8, fs: 16 });
    f.arc([0, 0], 1.35, 0, th, { head: true }).sym([1.35 * Math.cos(th / 2), 1.35 * Math.sin(th / 2)], 'θ', { dx: 6, dy: 6, fs: 15 });
    f.vec([0, 0], [k, 0], { label: 'u', sub: 'x', lab: [-10, 22] }).vec([0, 0], [0, k], { label: 'u', sub: 'y', anchor: 'start', lab: [7, 6] });
    f.vec([0, 0], [k * Math.cos(th), k * Math.sin(th)], { label: 'u', sub: 'ρ', style: ACC, lab: [2, 4] });
    f.vec([0, 0], [-k * Math.sin(th), k * Math.cos(th)], { label: 'u', sub: 'θ', style: ACC, anchor: 'end', lab: [-2, 2] });
    return f.svg.bind(f);
  })();

  /* nov. 2021 Ex 3 : projectile lancé depuis O. Valeurs du dessin : v0 = 10, α = 60°, g = 10. */
  F.tir21 = (function () {
    var v0 = 10, al = 60 * D, vx = v0 * Math.cos(al), vy0 = v0 * Math.sin(al), tS = vy0 / 10, tP = 2 * tS;
    var f = new Fig({ x: [-0.9, 9.7], y: [-0.6, 4.55], w: 400, pad: [8, 8, 8, 8] });
    f.axes({ x: 'X', y: 'Y' }).param(function (t) { return [vx * t, vy0 * t - 5 * t * t]; }, 0, tP);
    f.pt([vx * tS, vy0 * tS - 5 * tS * tS], 'S', { dx: 0, dy: -10, anchor: 'middle', r: 3 });
    f.arc([0, 0], 0.9, 0, al).sym([0.9, 0.2], 'α', { dx: 4, dy: 2, fs: 15 });
    f.vec([0, 0], [55 * Math.cos(al), 55 * Math.sin(al)], { kind: 'vel', label: 'v', sub: '0', anchor: 'end', lab: [-14, 12] });
    return f.svg.bind(f);
  })();

  /* 2020-2021 Ex 2 : segment parcouru en allers-retours */
  F.seg20 = (function () {
    var f = new Fig({ x: [-0.45, 2.45], y: [-0.4, 2.55], w: 280, pad: [8, 8, 8, 8] });
    f.axes({ x: 'x', y: 'y', origin: 'O' }).tick(1, '1').tick(2, '2').tick(1, '1', { y: true }).tick(2, '2', { y: true });
    f.line([0, 2], [1, 0], 'mk-curve k-pos');
    f.pt([0, 2], '', { cls: 'mk-key' }).pt([1, 0], '', { cls: 'mk-key' });
    f.vec([0.62, 1.12], [18, -36], { kind: 'pos', head: 7 }).vec([0.38, 0.88], [-18, 36], { kind: 'pos', head: 7 });
    return f.svg.bind(f);
  })();

  /* 2019-2020 Ex 1 : cycloïde sur deux périodes (A = 1 sur le dessin) */
  F.cyclo19 = (function () {
    var f = new Fig({ x: [-0.7, 13.7], y: [-0.55, 2.75], w: 460, pad: [8, 8, 10, 8] });
    f.axes({ x: 'x', y: 'y', origin: 'O' });
    ['πA', '2πA', '3πA', '4πA'].forEach(function (s, i) { f.tick((i + 1) * Math.PI, s); });
    f.tick(1, 'A', { y: true }).tick(2, '2A', { y: true }).line([0, 2], [4 * Math.PI, 2], 'mk-dash');
    f.param(function (u) { return [u - Math.sin(u), 1 - Math.cos(u)]; }, 0, 4 * Math.PI, { cls: 'mk-curve k-pos', n: 240 });
    for (var k = 0; k <= 8; k++) { var u = k * Math.PI / 2; f.pt([u - Math.sin(u), 1 - Math.cos(u)], '', { cls: 'mk-key', r: 3.2 }); }
    return f.svg.bind(f);
  })();

  /* ellipse de centre O, demi-axes A (sur x) et B (sur y) ; M et a⃗ = −ω² OM⃗ */
  function ell(A, B, w, ticks, u) {
    var f = new Fig({ x: [-A - 0.75, A + 0.75], y: [-B - 0.55, B + 0.6], w: w, pad: [8, 8, 8, 8] });
    f.axes({ x: 'x', y: 'y', origin: 'O' });
    ticks.x.forEach(function (t) { f.tick(t[0], t[1]); });
    ticks.y.forEach(function (t) { f.tick(t[0], t[1], { y: true }); });
    f.param(function (a) { return [A * Math.cos(a), B * Math.sin(a)]; }, 0, 2 * Math.PI, { cls: 'mk-curve k-pos' });
    var M = [A * Math.cos(u), B * Math.sin(u)], v = [-A * Math.sin(u), B * Math.cos(u)], nv = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    f.line([0, 0], M, 'mk-dash').pt(M, 'M', { dx: 6, dy: -6 });
    f.vec(M, [-M[0] * 0.5 * f.s, -M[1] * 0.5 * f.s], { kind: 'acc', label: 'a', lab: [2, 10] });
    f.vec(M, [v[0] / nv * 34, v[1] / nv * 34], { kind: 'vel', label: 'v', lab: [0, -2] });
    return f.svg.bind(f);
  }
  F.ell20 = ell(Math.SQRT2, 2 * Math.SQRT2, 260, { x: [[Math.SQRT2, '√2'], [-Math.SQRT2, '−√2']], y: [[2 * Math.SQRT2, '2√2'], [-2 * Math.SQRT2, '−2√2']] }, 0.55);
  F.ell18 = ell(2, 1, 360, { x: [[2, '2a'], [-2, '−2a']], y: [[1, 'a'], [-1, '−a']] }, 0.8);

  /* nov. 2017 Ex 1 : cercle de centre C(1 ; 2), parcouru dans le sens horaire (R > 0, ω > 0) */
  F.circ17 = (function () {
    var R = 1.5, C = [1, 2], u = 0.7, M = [C[0] + R * Math.sin(u), C[1] + R * Math.cos(u)];
    var f = new Fig({ x: [-0.85, 3.25], y: [-0.55, 3.95], w: 300, pad: [8, 8, 8, 8] });
    f.axes({ x: 'x', y: 'y', origin: 'O' }).tick(1, '1').tick(2, '2', { y: true });
    f.line([C[0], 0], C, 'mk-dash').line([0, C[1]], C, 'mk-dash');
    f.param(function (a) { return [C[0] + R * Math.cos(a), C[1] + R * Math.sin(a)]; }, 0, 2 * Math.PI, { cls: 'mk-curve k-pos' });
    f.pt(C, 'C', { dx: 6, dy: 16 }).pt([C[0], C[1] + R], '', { r: 3 }).text([C[0], C[1] + R], 't = 0', { dx: -6, dy: -8, anchor: 'end', cls: 'mk-small', fs: 11 });
    f.line(C, M, 'mk-dash').pt(M, 'M', { dx: 8, dy: -4 });
    f.vec(M, [36 * Math.cos(u), -36 * Math.sin(u)], { kind: 'vel', label: 'V', lab: [0, -2] });
    f.vec(M, [-30 * Math.sin(u), -30 * Math.cos(u)], { kind: 'acc', label: 'a', lab: [-2, 8] });
    return f.svg.bind(f);
  })();

  /* nov. 2017 Ex 2 : spirale ρ = a e^(θ), base polaire en M et V⃗ à 45° de u⃗ρ (a = 1 sur le dessin) */
  F.spir17 = (function () {
    var f = new Fig({ x: [-0.55, 2.3], y: [-0.4, 2.75], w: 300, pad: [8, 8, 8, 8] });
    f.axes({ x: 'x', y: 'y', origin: 'O' });
    f.param(function (t) { var r = Math.exp(t); return [r * Math.cos(t), r * Math.sin(t)]; }, -Math.PI, Math.PI / 3, { cls: 'mk-curve k-pos' });
    var t = 0.35, r = Math.exp(t), M = [r * Math.cos(t), r * Math.sin(t)];
    f.line([0, 0], M, 'mk-dash').pt(M, 'M', { dx: 8, dy: 16 });
    f.vec(M, [30 * Math.cos(t), 30 * Math.sin(t)], { label: 'u', sub: 'ρ', style: ACC, lab: [0, 6] });
    f.vec(M, [-30 * Math.sin(t), 30 * Math.cos(t)], { label: 'u', sub: 'θ', style: ACC, anchor: 'end', lab: [-2, 0] });
    f.vec(M, [50 * Math.cos(t + Math.PI / 4), 50 * Math.sin(t + Math.PI / 4)], { kind: 'vel', label: 'V', lab: [2, 0] });
    return f.svg.bind(f);
  })();

  /* ---------- fiches ---------- */
  var NOTE_REDIGE = 'Pas de corrigé officiel : correction rédigée et vérifiée.';
  function site(s) { return '<p class="muted">' + X(s) + '</p>'; }

  /* =====================================================================
     Contrôle d’octobre 2022 (promo 2027), 1 h, 20 points : copie d’élève notée, pas de corrigé officiel
     ===================================================================== */
  X0.push({
    id: 'p2022-ex1', exam: 'p2022', kind: 'partiel', order: 1, src: 'Partiel oct. 2022 · Ex 1',
    title: 'Questions de cours : unités, nature du mouvement, polaires', pts: 6, topics: ['cours', 'nature', 'polaire', 'circulaire'], lvl: 1, time: 10,
    intro: '<p>Questions de cours (6 points – pas de points négatifs pour le QCM)</p><p>Choisissez la ou les bonnes réponses :</p>',
    questions: [
      '1. L’unité d’une accélération peut être :' + opts(['m.s⁻¹', 'm.s⁻²', 'kg.m.s⁻¹', 'kg.s⁻²']),
      '2. Choisir la ou les affirmations justes :' + opts(['Un mouvement peut être uniforme sur une seule de ses composantes', 'L’équation de la trajectoire permet de dire si le mouvement est uniforme', 'Lors d’un mouvement circulaire uniforme, l’accélération est nulle', 'Lors d’un mouvement rectiligne uniforme, l’accélération est nulle']),
      X('3. Un mouvement a pour équations horaires les suivantes : $x(t) = 4t$ ; $y(t) = 3t² − 6t + 5$') + opts(['Ce mouvement est décéléré', 'Ce mouvement est uniforme', 'La vitesse s’annule en un point de la trajectoire', 'Ce mouvement est parabolique']),
      '4. En coordonnées cylindriques, le vecteur position a pour expression :' + opts(['$OM⃗(t) = ρ u⃗_ρ$', '$OM⃗(t) = ρ u⃗_ρ + θ u⃗_θ$', '$OM⃗(t) = ρ u⃗_ρ + θ u⃗_θ + z u⃗_z$', '$OM⃗(t) = ρ u⃗_ρ + z u⃗_z$']),
      '5. En coordonnées polaires, le vecteur vitesse a pour expression :' + opts(['$v⃗(t) = ρθ̇ u⃗_θ$', '$v⃗(t) = ρ̇ u⃗_ρ$', '$v⃗(t) = ρ u⃗_θ$', '$v⃗(t) = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$']),
      '6. Pour un mouvement circulaire uniforme :' + opts(['$θ̇ =$ constante', '$θ̇ = 0$', '$θ̈ = 0$', '$ρ̇ = 0$'])],
    hints: [
      'Reviens aux définitions du cours : « uniforme » veut dire que la norme de la vitesse est constante ; accéléré ou décéléré se lit sur le signe du produit scalaire ' + M('v⃗·a⃗') + '.',
      X('Question 3 : calcule $v⃗ = (ẋ ; ẏ)$ et $a⃗ = (ẍ ; ÿ)$, puis $v⃗·a⃗$. Pour la forme de la trajectoire, tire t de $x(t)$ et remplace dans $y(t)$.'),
      X('Questions 4 à 6 : le vecteur position n’a jamais de composante sur $u⃗_θ$. Sur un cercle, $ρ = R$ est constant ; « uniforme » ajoute $θ̇$ constant.')],
    solution: [
      { t: 'Question 1 : unité d’une accélération', html: P('$a = @f{dv}{dt}$ : une vitesse (m·s⁻¹) divisée par un temps (s), soit des <strong>m·s⁻²</strong>. Réponse <strong>b</strong>.') +
        P('Les autres : m·s⁻¹ est l’unité d’une vitesse ; kg·m·s⁻¹ celle de la quantité de mouvement $p⃗ = m v⃗$ ; kg·s⁻² celle de la raideur d’un ressort (N·m⁻¹, partiel 2).') },
      { t: 'Question 2 : ce que veut dire « uniforme »', html: ul([
        'a, juste : on peut qualifier chaque composante. Au tir, $x(t) = v_0 cosα · t$ : le mouvement est uniforme sur $(Ox)$, pas sur $(Oy)$.',
        'b, faux : l’équation de la trajectoire $y(x)$ ne contient plus le temps. Elle donne la forme du chemin, pas la façon de le parcourir : un cercle peut être parcouru à vitesse constante ou non.',
        'c, faux : en mouvement circulaire uniforme, $a⃗ = −Rθ̇² u⃗_ρ ≠ 0⃗$ (accélération centripète). C’est la direction de la vitesse qui change.',
        'd, juste : rectiligne uniforme, $v⃗$ est constant en norme et en direction, donc $a⃗ = @f{dv⃗}{dt} = 0⃗$.']) + P('Réponses <strong>a et d</strong>.') },
      { t: 'Question 3 : dériver puis juger', html: E('v⃗ = @c{ẋ}{ẏ} = @c{4}{6t − 6}   a⃗ = @c{ẍ}{ÿ} = @c{0}{6}') + ul([
        'a : $v⃗·a⃗ = 4 × 0 + (6t − 6) × 6 = 36(t − 1)$. Négatif pour $t &lt; 1$ s (décéléré), positif ensuite (accéléré). « Décéléré » tout court est faux.',
        'b : $‖v⃗‖ = @r{16 + (6t − 6)²}$ varie : le mouvement n’est pas uniforme.',
        'c : $v_x = 4$ ne s’annule jamais, donc $v⃗ ≠ 0⃗$ à tout instant : faux.',
        'd : $t = @f{x}{4}$ donne $y = @f{3}{16}x² − @f{3}{2}x + 5$ : une parabole. Juste.']) + P('Réponse <strong>d</strong> seule.') },
      { t: 'Question 4 : coordonnées cylindriques', html: P('Réponse <strong>d</strong> : $OM⃗ = ρ u⃗_ρ + z u⃗_z$. Le vecteur position n’a pas de composante sur $u⃗_θ$ : θ est un angle, pas une longueur.') +
        site('Les coordonnées cylindriques ne sont pas dans le cours écrit de cette année (seulement un schéma dans la fiche d’aide du Moodle) : ce sont les polaires plus une coordonnée $z$. En polaires, $OM⃗ = ρ u⃗_ρ$.') },
      { t: 'Question 5 : vitesse en polaires', html: P('Réponse <strong>d</strong> : $v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$, obtenue en dérivant $ρ u⃗_ρ$ avec $@f{du⃗_ρ}{dt} = θ̇ u⃗_θ$. Les propositions a et b n’en gardent qu’un terme ; c n’a pas l’unité d’une vitesse.') },
      { t: 'Question 6 : circulaire uniforme', html: P('Circulaire : $ρ = R$ est constant, donc $ρ̇ = 0$ (d). Uniforme : $‖v⃗‖ = Rθ̇$ est constante, donc $θ̇$ est constante (a) et $θ̈ = 0$ (c). $θ̇ = 0$ voudrait dire que M ne bouge pas (b faux).') + P('Réponses <strong>a, c et d</strong>. Sur la copie des annales, le correcteur a entouré c, que l’élève avait oubliée.') }],
    answer: '<ol style="margin:0;padding-left:1.3rem"><li>b</li><li>a et d</li><li>d</li><li>d</li><li>d</li><li>a, c et d</li></ol>',
    traps: [
      X('Croire qu’un mouvement circulaire uniforme a une accélération nulle : elle vaut $Rθ̇²$, dirigée vers le centre.'),
      'Répondre « décéléré » à la question 3 : le mouvement est décéléré jusqu’à t = 1 s, puis accéléré.',
      'Oublier qu’il peut y avoir plusieurs bonnes réponses (questions 2 et 6).',
      X('Écrire $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$ : le vecteur position n’a pas de composante sur $u⃗_θ$.')],
    grading: '6 points pour les six questions, sans points négatifs ; le détail n’est pas imprimé.',
    official: false, note: 'Pas de corrigé officiel : correction rédigée et vérifiée ; elle concorde avec les marques du correcteur sur la copie notée des annales.'
  });

  X0.push({
    id: 'p2022-ex2', exam: 'p2022', kind: 'partiel', order: 2, src: 'Partiel oct. 2022 · Ex 2',
    title: 'Tir d’une balle depuis une hauteur h', pts: 8, topics: ['tir', 'trajectoire', 'cinematique', 'nature'], lvl: 2, time: 25,
    intro: P('On étudie la trajectoire d’une balle dans le plan muni d’un repère cartésien. La balle est lancée avec une vitesse $v⃗_0$ faisant un angle $α$ avec l’horizontale depuis le point de coordonnées $(0, h)$. On donne l’expression du vecteur position :') +
      E('OM⃗(t) = (v_0 cosα)t u⃗_x + (−@f{1}{2}gt² + (v_0 sinα)t + h) u⃗_y') + P('où $g$ est l’intensité du champ de pesanteur terrestre.'),
    figs: [{ svg: F.tir22('Trajectoire en arc de parabole de la balle, lancée depuis le point A d’ordonnée h avec la vitesse v0 inclinée de l’angle alpha ; points M1, S au sommet, M2, M3, et P au sol sur l’axe x.'),
      cap: X('Schéma du sujet, redessiné. Le sol est l’axe $(Ox)$ ; S est le sommet, P le point d’impact.') }],
    questions: [
      '1. Donner les équations horaires du mouvement.',
      '2. Etablir l’équation de la trajectoire.',
      X('3. Calculer le vecteur vitesse $v⃗(t)$ en fonction de $v_0$, $α$, $t$ et $g$, et calculer sa norme.'),
      X('4. Calculer le vecteur accélération $a⃗(t)$ et calculer sa norme.'),
      '5. Commenter les résultats des questions 3. et 4. en qualifiant le mouvement sur l’axe Ox et sur l’axe Oy.',
      '6. Sur le schéma, représenter les vecteurs vitesse et accélération aux points M₁, M₂, M₃ et S.',
      X('7. Calculer les coordonnées $(x_S , y_S)$ du sommet S de la trajectoire.'),
      X('8. A quelle date $t′$ la balle atteint-elle le sommet ?')],
    hints: [
      X('Les équations horaires sont les composantes de $OM⃗(t)$ : lis-les devant $u⃗_x$ et $u⃗_y$. Pour la trajectoire, tire t de $x(t)$ et remplace-le dans $y(t)$.'),
      X('Dérive composante par composante : $v⃗ = (ẋ ; ẏ)$, puis $a⃗ = (v̇_x ; v̇_y)$. Pour qualifier le mouvement sur un axe, regarde si la composante de la vitesse est constante, puis compare les signes de $v_y$ et de $a_y$.'),
      X('Au sommet, la vitesse est horizontale : $v_y(t′) = 0$. Traite la question 8 (la date) avant la question 7, puis remplace $t′$ dans $x(t)$ et $y(t)$.')],
    solution: [
      { t: 'Cadre de l’étude', html: P('Système : la balle, assimilée à un point matériel M. Référentiel : terrestre, supposé galiléen. Repère : $(O, u⃗_x, u⃗_y)$, O au sol sous le point de lancement, $u⃗_y$ vers le haut. Origine des temps : le lancer, au point A.') +
        P('Le sujet donne $OM⃗(t)$ : tout se fait en dérivant. C’est la 2e loi de Newton qui donne cette expression : avec le poids seul, $a⃗ = g⃗$, puis deux intégrations avec $v⃗(0) = v⃗_0$ et $OM⃗(0) = OA⃗$.') },
      { t: 'Question 1 : équations horaires', html: P('Ce sont les coordonnées de M, lues devant $u⃗_x$ et $u⃗_y$ :') + E('x(t) = v_0 cosα · t', 'y(t) = −@f{1}{2} g t² + v_0 sinα · t + h') +
        P('Contrôle : à $t = 0$, $x = 0$ et $y = h$ : la balle part bien de A. Ce sont des fonctions à valeurs réelles : pas de $u⃗_x$ ni de $u⃗_y$ dans $x(t)$ et $y(t)$.') },
      { t: 'Question 2 : équation de la trajectoire', html: P('On élimine t. De $x(t)$, $t = @f{x}{v_0 cosα}$ (on a $cosα ≠ 0$). On remplace dans $y(t)$ :') +
        E('y = −@f{1}{2} g @f{x²}{v_0² cos²α} + v_0 sinα · @f{x}{v_0 cosα} + h', 'y(x) = −@f{g}{2v_0² cos²α} x² + x tanα + h') +
        P('C’est une parabole tournée vers le bas (le coefficient de $x²$ est négatif). Il ne reste plus de t.') },
      { t: 'Question 3 : vecteur vitesse', html: E('v⃗(t) = @f{dOM⃗}{dt} = ẋ u⃗_x + ẏ u⃗_y', 'v⃗(t) = v_0 cosα u⃗_x + (v_0 sinα − g t) u⃗_y') + P('Norme :') +
        E('‖v⃗‖ = @r{v_0² cos²α + (v_0 sinα − g t)²}', '‖v⃗‖ = @r{v_0² − 2v_0 g t sinα + g² t²}') + P('Contrôle : à $t = 0$, $‖v⃗‖ = v_0$. Unité : m·s⁻¹.') },
      { t: 'Question 4 : vecteur accélération', html: E('a⃗(t) = @f{dv⃗}{dt} = 0 u⃗_x − g u⃗_y = −g u⃗_y', '‖a⃗‖ = g') + P('L’accélération est constante, verticale, vers le bas : c’est $g⃗$. Le mouvement est une chute libre.') },
      { t: 'Question 5 : le mouvement sur chaque axe', html: ul([
        'Sur $(Ox)$ : $v_x = v_0 cosα$ est constante et $a_x = 0$ : mouvement <strong>uniforme</strong> (rectiligne uniforme en projection sur l’axe).',
        'Sur $(Oy)$ : $a_y = −g$ est constante : mouvement <strong>uniformément varié</strong>. À la montée, $v_y &gt; 0$ et $a_y &lt; 0$ : il est <strong>décéléré</strong>. Après le sommet, $v_y &lt; 0$ : il est <strong>accéléré</strong>.',
        'Pour le mouvement entier, $v⃗·a⃗ = −g(v_0 sinα − g t)$ : même conclusion, décéléré jusqu’au sommet, accéléré ensuite.']) },
      { t: 'Question 6 : les vecteurs sur le schéma', html: fig(F.tir22v('Trajectoire de la balle avec, aux points M1, S, M2 et M3, le vecteur vitesse tangent à la trajectoire et le vecteur accélération vertical vers le bas, identique partout.'), 'Vitesse en vert, accélération en rouge. Dessin fait avec $v_0 = 9$ m·s⁻¹, α = 55° et g = 10 m·s⁻².') +
        ul(['$v⃗$ est tangent à la trajectoire, dans le sens du mouvement. Au sommet, il est horizontal ($v_y = 0$) et sa norme est la plus petite : $v_0 cosα$. Il n’est pas nul.', '$a⃗$ est le même en tout point : vertical, vers le bas, de norme $g$.']) },
      { t: 'Questions 8 puis 7 : date et coordonnées du sommet', html: P('La question 8 sert à la question 7 : lis toujours toutes les questions avant de commencer. Au sommet, la vitesse est horizontale :') +
        E('v_y(t′) = v_0 sinα − g t′ = 0   ⇒   t′ = @f{v_0 sinα}{g}') + P('On remplace dans $x(t)$ et dans $y(t)$ :') +
        E('x_S = v_0 cosα · @f{v_0 sinα}{g}', 'x_S = @f{v_0² sinα cosα}{g} = @f{v_0² sin(2α)}{2g}', 'y_S = −@f{1}{2} g @f{v_0² sin²α}{g²} + @f{v_0² sin²α}{g} + h', 'y_S = h + @f{v_0² sin²α}{2g}') +
        P('Autre méthode : le sommet de la parabole est là où $@f{dy}{dx} = 0$, soit $x = @f{v_0² sinα cosα}{g}$. Sur la copie des annales, l’élève recopie $y(x)$ à la question 7 : aucun point.') }],
    answer: ul([
      '$x(t) = v_0 cosα · t$ ; $y(t) = −½ g t² + v_0 sinα · t + h$',
      '$y(x) = −@f{g}{2v_0² cos²α} x² + x tanα + h$ : une parabole',
      '$v⃗ = v_0 cosα u⃗_x + (v_0 sinα − g t) u⃗_y$ ; $‖v⃗‖ = @r{v_0² cos²α + (v_0 sinα − g t)²}$',
      '$a⃗ = −g u⃗_y$ ; $‖a⃗‖ = g$',
      'Sur $(Ox)$ : uniforme ; sur $(Oy)$ : uniformément décéléré à la montée, puis accéléré',
      '$t′ = @f{v_0 sinα}{g}$ ; $x_S = @f{v_0² sinα cosα}{g}$ ; $y_S = h + @f{v_0² sin²α}{2g}$']),
    traps: [
      X('Mettre $u⃗_x$ et $u⃗_y$ dans les équations horaires : $x(t)$ et $y(t)$ sont des nombres.'),
      X('Laisser du t dans $y(x)$, ou oublier le $+ h$ dans $y(x)$ et dans $y_S$.'),
      'Dire que le mouvement sur (Oy) est « décéléré » sans préciser : décéléré à la montée, accéléré à la descente.',
      X('Dessiner $v⃗$ nul au sommet : seule $v_y$ s’annule, $v⃗ = v_0 cosα u⃗_x$.'),
      X('Dessiner $a⃗$ tangent à la trajectoire : $a⃗ = −g u⃗_y$ en tout point.')],
    grading: '8 points, détail non imprimé ; sur la copie des annales, les questions 1, 2 et 4 valent chacune 1 point.',
    official: false, note: 'Pas de corrigé officiel (les annales contiennent une copie notée) : correction rédigée et vérifiée.'
  });

  X0.push({
    id: 'p2022-ex3', exam: 'p2022', kind: 'partiel', order: 3, src: 'Partiel oct. 2022 · Ex 3',
    title: 'Vilebrequin : M en polaires, P en cartésiennes', pts: 6, topics: ['polaire', 'circulaire', 'cinematique'], lvl: 2, time: 20,
    intro: P('Un vilebrequin est une pièce mécanique d’un moteur thermique permettant la transformation d’un mouvement de translation sur l’axe Oy (piston P) en un mouvement de rotation (point M). On suppose que le moteur possède une rotation à vitesse angulaire $ω$ constante, d’où la position angulaire au cours du temps $θ(t) = ωt$. La longueur $L$ est également constante.') +
      P('On étudie dans un premier temps le mouvement du point M en coordonnées polaires, puis celui du point P en coordonnées cartésiennes.'),
    figs: [{ svg: F.vil('Vilebrequin : M tourne sur un cercle de centre O et de rayon R, repéré par l’angle thêta avec l’axe x ; la bielle PM de longueur L relie M au piston P qui coulisse sur l’axe y.'),
      cap: X('Schéma du sujet, redessiné : M tourne sur le cercle de centre O et de rayon $R$ ; la bielle PM, de longueur $L$, relie M au piston P, qui coulisse sur l’axe $(Oy)$.') }],
    questions: [
      '1. Sur le schéma, représenter la base polaire au point M.',
      '<b>Partie 1 : Description du mouvement du point M en coordonnées polaires.</b><br>' + X('a. Donner l’expression de la dérivée de la position angulaire $θ̇(t)$.'),
      X('b. Donner l’expression du vecteur position $OM⃗(t)$.'),
      X('c. Calculer l’expression du vecteur vitesse $v⃗_M(t)$ en fonction du rayon $R$ et de la vitesse angulaire $ω$.'),
      X('d. Calculer l’expression du vecteur accélération $a⃗_M(t)$ en fonction du rayon $R$ et de la vitesse angulaire $ω$.'),
      '<b>Partie 2 : Description du mouvement du point P en coordonnées cartésiennes.</b><br>' + X('a. En utilisant des relations trigonométriques, et le fait que le mouvement de P se fait sur l’axe Oy, montrer que l’expression du vecteur position du point P est : $OP⃗ = (R.sinθ + L.cosθ) u⃗_y$') +
        '<br><span class="muted">' + X('Remarque du site : avec l’angle θ de la figure, cette expression est fausse (voir la correction). Pour b et c, pars quand même de l’expression donnée, comme au partiel.') + '</span>',
      X('b. Etablir l’expression du vecteur vitesse $v⃗_P(t)$ en fonction de $R$, $L$ et $ω$.'),
      X('c. Etablir l’expression du vecteur accélération $a⃗_P(t)$ en fonction de $R$, $L$ et $ω$.')],
    hints: [
      X('M reste sur le cercle de centre O et de rayon R : $ρ = R$ est constant, donc $ρ̇ = ρ̈ = 0$. Et $θ = ωt$ donne $θ̇ = ω$, $θ̈ = 0$.'),
      X('Utilise les formules du cours, $v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$ et $a⃗ = (ρ̈ − ρθ̇²) u⃗_ρ + (2ρ̇θ̇ + ρθ̈) u⃗_θ$, puis remplace.'),
      X('Pour P, $u⃗_y$ est fixe : il suffit de dériver deux fois la composante $R sin(ωt) + L cos(ωt)$ par rapport au temps.')],
    solution: [
      { t: 'Question 1 : la base polaire en M', html: fig(F.vilBase('Même schéma avec, au point M, le vecteur u rho dirigé de O vers M et le vecteur u thêta tangent au cercle, tourné d’un quart de tour.'), 'La base polaire se dessine au point M : $u⃗_ρ$ (le $u⃗_r$ du cours) dans le sens de $OM⃗$, $u⃗_θ$ tourné de +π/2.') +
        P('$u⃗_ρ = @f{OM⃗}{OM}$ est unitaire, dirigé de O vers M, donc vers l’extérieur du cercle. $u⃗_θ$ s’obtient en tournant $u⃗_ρ$ de +π/2 (sens direct) : il est tangent au cercle, dans le sens des θ croissants.') },
      { t: 'Partie 1, a : vitesse angulaire', html: E('θ(t) = ωt   ⇒   θ̇ = @f{dθ}{dt} = ω') + P('ω est constante, donc $θ̈ = 0$ : la rotation est uniforme. Unité de ω : rad·s⁻¹.') },
      { t: 'Partie 1, b : vecteur position', html: P('M reste sur le cercle de centre O et de rayon R : $ρ = OM = R$, constant.') + E('OM⃗(t) = R u⃗_ρ') +
        P('Pas de terme en $u⃗_θ$ ni en $u⃗_z$ : la copie des annales écrit $ρ u⃗_ρ + z u⃗_z$, sans point. Le temps est caché dans $u⃗_ρ$, qui tourne avec M.') },
      { t: 'Partie 1, c : vecteur vitesse', html: P('Avec $ρ = R$, $ρ̇ = 0$ et $θ̇ = ω$ dans la formule du cours :') + E('v⃗_M = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ = Rω u⃗_θ') +
        P('On peut aussi dériver directement : $@f{d(R u⃗_ρ)}{dt} = R @f{du⃗_ρ}{dt} = Rθ̇ u⃗_θ$. La vitesse est tangente au cercle ; sa norme $Rω$ (m·s⁻¹) est constante.') },
      { t: 'Partie 1, d : vecteur accélération', html: E('a⃗_M = (ρ̈ − ρθ̇²) u⃗_ρ + (2ρ̇θ̇ + ρθ̈) u⃗_θ = −Rω² u⃗_ρ') +
        P('$ρ̈ = 0$, $ρ̇ = 0$ et $θ̈ = 0$ : il ne reste que le terme centripète, de norme $Rω²$ (m·s⁻²), dirigé de M vers O. Une vitesse angulaire constante ne donne pas une accélération nulle : la direction de $v⃗_M$ change sans cesse.') },
      { t: 'Partie 2, a : l’expression du sujet est fausse', html: P('Dans le repère de la figure, $M = (R cosθ ; R sinθ)$ et $P = (0 ; y_P)$. La bielle a pour longueur L :') +
        E('PM² = (R cosθ)² + (y_P − R sinθ)² = L²', 'y_P = R sinθ + @r{L² − R² cos²θ}') +
        P('Si φ est l’angle entre la bielle et l’axe $(Oy)$, la hauteur de P au-dessus de M vaut $L cosφ$, d’où $OP⃗ = (R sinθ + L cosφ) u⃗_y$. L’expression du sujet emploie le même angle θ pour la manivelle et pour la bielle : elle est fausse. Par exemple, à θ = 0 elle donne $OP = L$, donc $PM = @r{R² + L²} ≠ L$.') +
        P('Pour b et c, on part de l’expression du sujet, comme le correcteur, qui a donné 0,5 point à chacune sur la copie des annales.') },
      { t: 'Partie 2, b : vitesse de P', html: P('$u⃗_y$ est fixe : on dérive seulement la composante, avec θ = ωt.') +
        E('OP⃗ = (R sin(ωt) + L cos(ωt)) u⃗_y', 'v⃗_P = @f{dOP⃗}{dt} = (Rω cos(ωt) − Lω sin(ωt)) u⃗_y') +
        site('Avec l’expression exacte, on trouverait $v_P = Rω cos(ωt) + @f{R²ω sin(ωt) cos(ωt)}{@r{L² − R² cos²(ωt)}}$ : ce n’était pas attendu.') },
      { t: 'Partie 2, c : accélération de P', html: E('a⃗_P = @f{dv⃗_P}{dt} = (−Rω² sin(ωt) − Lω² cos(ωt)) u⃗_y = −ω² OP⃗') + P('P se déplace en ligne droite sur $(Oy)$, mais pas à vitesse constante.') }],
    answer: ul([
      'Base polaire en M : $u⃗_ρ$ selon $OM⃗$, $u⃗_θ$ tangent au cercle (rotation de +π/2)',
      '$θ̇ = ω$ ; $OM⃗ = R u⃗_ρ$ ; $v⃗_M = Rω u⃗_θ$ ; $a⃗_M = −Rω² u⃗_ρ$',
      'Expression exacte : $OP⃗ = (R sinθ + @r{L² − R² cos²θ}) u⃗_y$ ; celle du sujet est fausse',
      'Avec l’expression du sujet : $v⃗_P = ω(R cos(ωt) − L sin(ωt)) u⃗_y$ ; $a⃗_P = −ω²(R sin(ωt) + L cos(ωt)) u⃗_y$']),
    traps: [
      X('Écrire $OM⃗ = ρ u⃗_ρ + z u⃗_z$ ou $ρ u⃗_ρ + θ u⃗_θ$ : pour M sur le cercle, $OM⃗ = R u⃗_ρ$.'),
      X('Dériver $R u⃗_ρ$ en oubliant que $u⃗_ρ$ tourne : $@f{du⃗_ρ}{dt} = θ̇ u⃗_θ$, pas $0⃗$.'),
      X('Conclure $a⃗_M = 0⃗$ parce que ω est constante : l’accélération est centripète, de norme $Rω²$.'),
      X('Dériver $u⃗_y$ : c’est un vecteur fixe. Seule la base polaire tourne.')],
    grading: '6 points, détail non imprimé ; sur la copie des annales, la question 1.a vaut 1 point, les questions 2.b et 2.c 0,5 point chacune.',
    official: false, note: 'Pas de corrigé officiel : correction rédigée et vérifiée. L’expression imposée en 2.a ne correspond pas à la figure (voir la correction).'
  });

  /* =====================================================================
     Contrôle de novembre 2021 (promo 2026), 20 points : corrigé officiel manuscrit avec barème, sujet aussi en anglais
     ===================================================================== */
  X0.push({
    id: 'p2021-ex1', exam: 'p2021', kind: 'partiel', order: 1, src: 'Partiel nov. 2021 · Ex 1',
    title: 'Questions de cours : uniforme, polaires, accélération', pts: 2.5, topics: ['cours', 'nature', 'polaire'], lvl: 1, time: 6,
    intro: '<p>Questions de cours [2.5 POINTS] (Pas de points négatifs)</p><p>Choisissez la bonne réponse</p>',
    questions: [
      '1. Un mouvement est dit uniforme si' + opts(['Sa trajectoire est une ligne droite.', 'Son accélération est constante au cours du temps.', 'Sa vitesse est constante au cours du temps.', 'Sa vitesse et son accélération varient très peu avec le temps.']),
      X('2. En coordonnées polaires $(u⃗_ρ, u⃗_θ)$, le vecteur position $OM⃗(t)$ est donné par') + opts(['$OM⃗(t) = ρ u⃗_ρ + θ u⃗_θ$', '$OM⃗(t) = ρ u⃗_ρ$', '$OM⃗(t) = θ u⃗_ρ + ρ u⃗_θ$', '$OM⃗(t) = ρ u⃗_θ$']),
      X('3. Un mobile décrit un trajet rectiligne le long de l’axe (Ox). Son équation horaire s’écrit $x(t) = 10 − 2t²$.') + opts(['Le mouvement est uniforme', 'Le mouvement est uniformément circulaire', 'Le mouvement est décéléré', 'La norme de l’accélération est de 2 m/s²']),
      X('4. Considérons un mobile dont la position à chaque instant est donné par son vecteur position $OM⃗(t)$. L’accélération de ce mouvement est donné par') + opts(['$a⃗(t) = @f{dOM⃗(t)}{dt²}$', '$a⃗(t) = @f{d²OM⃗(t)}{dt²}$', '$a⃗(t) = [@f{dOM⃗(t)}{dt}]²$', '$a⃗(t) = @r{OM⃗(t)}$']),
      '5. Deux vecteurs sont orthogonaux si leur produit scalaire est nul.' + opts(['VRAI', 'FAUX'])],
    hints: [
      '« Uniforme » parle de la norme de la vitesse : ni de l’accélération, ni de la forme de la trajectoire.',
      X('Question 3 : dérive $x(t)$ deux fois, puis regarde le signe du produit $v_x a_x$ : positif, le mouvement est accéléré ; négatif, il est décéléré.'),
      'Le vecteur position en polaires n’a qu’une composante ; l’accélération est la dérivée seconde de la position.'],
    solution: [
      { t: 'Question 1 : uniforme', html: P('Réponse <strong>c</strong> : la vitesse, au sens de sa norme (la « valeur » de la vitesse), est constante. Un mouvement circulaire peut être uniforme ; une ligne droite peut être parcourue en accélérant (a faux) ; une accélération constante non nulle change la vitesse (b faux).') +
        P('Le corrigé officiel entoure d : c’est une erreur, « varient très peu » n’est pas une définition.') },
      { t: 'Question 2 : position en polaires', html: P('Réponse <strong>b</strong> : $OM⃗ = ρ u⃗_ρ$. ρ est la distance OM et $u⃗_ρ$ pointe de O vers M ; θ est un angle, il ne peut pas multiplier un vecteur pour donner une longueur.') },
      { t: 'Question 3 : aucune proposition n’est juste', html: E('v_x = ẋ = −4t   a_x = ẍ = −4 @t{m·s⁻²}') + ul([
        'a : $|v_x| = 4t$ augmente, le mouvement n’est pas uniforme.',
        'b : le trajet est rectiligne, pas circulaire.',
        'c : $v_x a_x = 16t &gt; 0$ pour $t &gt; 0$ : le mouvement est <strong>accéléré</strong>, pas décéléré. x diminue, mais de plus en plus vite.',
        'd : la norme de l’accélération vaut 4 m/s², pas 2.']) + P('Aucune réponse n’est juste ; le corrigé officiel n’entoure rien.') },
      { t: 'Question 4 : dérivée seconde', html: P('Réponse <strong>b</strong> : $a⃗ = @f{dv⃗}{dt} = @f{d²OM⃗}{dt²}$, la dérivée seconde de la position par rapport au temps. La proposition c est le carré de la vitesse, a et d n’ont pas de sens.') },
      { t: 'Question 5 : orthogonalité', html: P('Réponse <strong>a</strong>, VRAI : $u⃗·w⃗ = ‖u⃗‖ ‖w⃗‖ cos(u⃗, w⃗)$ est nul si et seulement si le cosinus est nul (pour des vecteurs non nuls), c’est-à-dire si l’angle vaut 90°.') }],
    answer: '<ol style="margin:0;padding-left:1.3rem"><li>c</li><li>b</li><li>aucune (accéléré ; ' + M('‖a⃗‖ = 4') + ' m/s²)</li><li>b</li><li>a (VRAI)</li></ol>',
    traps: [
      'Croire que « x diminue » veut dire « décéléré » : la vitesse est négative et de plus en plus grande en valeur absolue, le mouvement est accéléré.',
      X('Prendre $‖a⃗‖ = 2$ m/s² : la dérivée seconde de $−2t²$ vaut −4.'),
      X('Confondre $@f{d²OM⃗}{dt²}$ (dérivée seconde) et $(@f{dOM⃗}{dt})²$ (carré de la vitesse).'),
      'Recopier le corrigé officiel à la question 1 : il entoure d, la bonne réponse est c.'],
    grading: '2,5 points d’après le sujet (le corrigé écrit « 3 points » à la main), sans points négatifs ; le détail par question n’est pas donné.',
    official: false, note: 'D’après le corrigé officiel, sauf à la question 1 (il entoure d ; la bonne réponse est c). À la question 3, aucune proposition n’est juste et le corrigé n’entoure rien.'
  });

  X0.push({
    id: 'p2021-ex2', exam: 'p2021', kind: 'partiel', order: 2, src: 'Partiel nov. 2021 · Ex 2',
    title: 'Base polaire, dérivées et vitesse en polaires', pts: 8, topics: ['polaire'], lvl: 1, time: 15,
    intro: P('Le schéma ci-dessous représente, sur le même plan, les coordonnées polaires ainsi que les coordonnées cartésiennes.'),
    figs: [{ svg: F.pol21('Point M de coordonnées cartésiennes x et y et de coordonnées polaires rho et thêta ; en O, les vecteurs u x et u y de la base cartésienne et les vecteurs u rho et u thêta de la base polaire.'),
      cap: X('Schéma du sujet, redessiné. Base cartésienne en noir, base polaire en orange.') }],
    questions: [
      X('1. Exprimer les vecteurs unitaires $u⃗_ρ$ et $u⃗_θ$ de la base polaire en fonction de l’angle $θ$ et des vecteurs unitaires $u⃗_x$ et $u⃗_y$ de la base cartésienne.'),
      X('2. a. Calculer $@f{du⃗_ρ}{dθ}$, la dérivée du vecteur unitaire $u⃗_ρ$ par rapport à l’angle $θ$.<br>b. Exprimer $@f{du⃗_ρ}{dθ}$ en fonction de $u⃗_θ$'),
      X('3. a. Calculer $@f{du⃗_θ}{dθ}$, la dérivée du vecteur unitaire $u⃗_θ$ par rapport à l’angle $θ$.<br>b. Exprimer $@f{du⃗_θ}{dθ}$ en fonction de $u⃗_ρ$'),
      X('4. Le point $M$ représente la position d’un mobile se déplaçant au cours du temps. Exprimer le vecteur position $OM⃗(t)$ dans la base cartésienne ainsi que dans la base polaire.'),
      '5. Ecrire l’expression générale du vecteur vitesse instantanée et donner son expression dans la base polaire en expliquant chaque étape de calcul.'],
    hints: [
      X('$u⃗_ρ$ est un vecteur de norme 1 qui fait l’angle θ avec $u⃗_x$ : projette-le sur $u⃗_x$ et sur $u⃗_y$. $u⃗_θ$ fait l’angle θ + π/2 avec $u⃗_x$.'),
      X('$u⃗_x$ et $u⃗_y$ sont fixes : pour dériver par rapport à θ, on ne dérive que les cosθ et sinθ.'),
      X('Pour la vitesse : $OM⃗ = ρ u⃗_ρ$ est un produit de deux fonctions du temps. Puis $@f{du⃗_ρ}{dt} = @f{du⃗_ρ}{dθ} · @f{dθ}{dt}$.')],
    solution: [
      { t: 'Question 1 : la base polaire en fonction de la base cartésienne', html: P('$u⃗_ρ$ est unitaire et fait l’angle θ avec $u⃗_x$ ; $u⃗_θ$ est tourné de +π/2, il fait l’angle θ + π/2 avec $u⃗_x$. Comme $cos(θ + π/2) = −sinθ$ et $sin(θ + π/2) = cosθ$ :') +
        E('u⃗_ρ = cosθ u⃗_x + sinθ u⃗_y', 'u⃗_θ = −sinθ u⃗_x + cosθ u⃗_y') + P('Contrôle : chaque vecteur a pour norme $@r{cos²θ + sin²θ} = 1$, et $u⃗_ρ·u⃗_θ = −cosθ sinθ + sinθ cosθ = 0$.') },
      { t: 'Question 2 : dérivée du premier vecteur de base', html: P('$u⃗_x$ et $u⃗_y$ ne dépendent pas de θ :') + E('@f{du⃗_ρ}{dθ} = −sinθ u⃗_x + cosθ u⃗_y = u⃗_θ') + P('On reconnaît l’expression de $u⃗_θ$ trouvée à la question 1.') },
      { t: 'Question 3 : dérivée du second vecteur de base', html: E('@f{du⃗_θ}{dθ} = −cosθ u⃗_x − sinθ u⃗_y = −u⃗_ρ') + P('Dériver par rapport à θ fait tourner le vecteur de +π/2 : $u⃗_ρ$ devient $u⃗_θ$, et $u⃗_θ$ devient $−u⃗_ρ$.') },
      { t: 'Question 4 : vecteur position dans les deux bases', html: E('OM⃗(t) = x u⃗_x + y u⃗_y   (x = ρ cosθ, y = ρ sinθ)', 'OM⃗(t) = ρ u⃗_ρ') + P('Le corrigé ajoute $z u⃗_z$ en cartésiennes ; dans le plan du schéma, $z = 0$.') },
      { t: 'Question 5 : vitesse en polaires, étape par étape', html: E('v⃗ = @f{dOM⃗}{dt} = @f{d(ρ u⃗_ρ)}{dt}', 'v⃗ = @f{dρ}{dt} u⃗_ρ + ρ @f{du⃗_ρ}{dt}', 'v⃗ = ρ̇ u⃗_ρ + ρ @f{du⃗_ρ}{dθ} @f{dθ}{dt}', 'v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ') +
        '<ol>' + ['Définition de la vitesse instantanée, avec $OM⃗ = ρ u⃗_ρ$ (question 4).', 'Dérivée d’un produit : ρ et $u⃗_ρ$ dépendent tous deux du temps.', 'Dérivée d’une fonction composée : $u⃗_ρ$ dépend du temps à travers θ.', 'Question 2 : $@f{du⃗_ρ}{dθ} = u⃗_θ$, et $@f{dθ}{dt} = θ̇$.'].map(function (x) { return '<li>' + X(x) + '</li>'; }).join('') + '</ol>' +
        P('$u⃗_ρ$ dépend du temps à travers θ : c’est pour cela que le terme $ρ @f{du⃗_ρ}{dt}$ existe. Le corrigé attend la justification de chaque ligne (2 points).') }],
    answer: ul([
      '$u⃗_ρ = cosθ u⃗_x + sinθ u⃗_y$ ; $u⃗_θ = −sinθ u⃗_x + cosθ u⃗_y$',
      '$@f{du⃗_ρ}{dθ} = −sinθ u⃗_x + cosθ u⃗_y = u⃗_θ$ ; $@f{du⃗_θ}{dθ} = −cosθ u⃗_x − sinθ u⃗_y = −u⃗_ρ$',
      '$OM⃗ = x u⃗_x + y u⃗_y = ρ u⃗_ρ$',
      '$v⃗ = @f{dOM⃗}{dt} = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$']),
    traps: [
      X('Mettre le signe moins au mauvais endroit : $u⃗_θ = −sinθ u⃗_x + cosθ u⃗_y$.'),
      X('Écrire $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$.'),
      X('Dériver $ρ u⃗_ρ$ en oubliant le terme $ρ @f{du⃗_ρ}{dt}$ : on obtient $v⃗ = ρ̇ u⃗_ρ$, faux dès que θ varie.'),
      X('Oublier le facteur $@f{dθ}{dt}$ : $@f{du⃗_ρ}{dt} = θ̇ u⃗_θ$, pas $u⃗_θ$.')],
    grading: 'Question 1 : 0,5 + 0,5 ; question 2 : 1 (a) + 0,5 (b) ; question 3 : 1 + 0,5 ; question 4 : 1 + 1 ; question 5 : 2.',
    official: true
  });

  X0.push({
    id: 'p2021-ex3', exam: 'p2021', kind: 'partiel', order: 3, src: 'Partiel nov. 2021 · Ex 3',
    title: 'Mouvement d’un projectile : trajectoire et hauteur maximale', pts: 5.5, topics: ['tir', 'trajectoire', 'cinematique'], lvl: 1, time: 12,
    intro: P('On considère un projectile lancé à partir du point (0;0) du repère cartésien à l’instant $t = 0$ s. Il est lancé en faisant un angle $α$ avec l’horizontale. Le projectile passe par le point $S$ qui correspond au sommet de la trajectoire.') +
      P('Le vecteur $OM⃗$ vaut :') + E('OM⃗ = (v_0 cosα).t u⃗_x + [(v_0 sinα).t − 5t²] u⃗_y'),
    figs: [{ svg: F.tir21('Trajectoire en arc de parabole d’un projectile lancé depuis l’origine avec la vitesse v0 inclinée de l’angle alpha sur l’horizontale ; S marque le sommet.'), cap: X('Schéma du sujet, redessiné.') }],
    questions: [
      X('1. a. Donner les équations horaires, $x(t)$ et $y(t)$, de ce mouvement.<br>b. Donner l’équation de la trajectoire du point M $(x,y)$.'),
      X('2. Exprimer le vecteur vitesse instantanée $v⃗(t)$. Exprimer sa norme.'),
      X('3. Au sommet de la trajectoire, $V_y$ (la composante suivant l’axe Y du vecteur vitesse) est nulle. Calculer la hauteur maximale atteinte par le projectile en fonction de $V_0$ et de l’angle $α$.')],
    hints: [
      X('Les équations horaires se lisent sur $OM⃗$ : $x(t)$ devant $u⃗_x$, $y(t)$ devant $u⃗_y$.'),
      X('Trajectoire : isole t dans $x(t)$, puis remplace-le dans $y(t)$. Il ne doit plus rester de t.'),
      X('Sommet : $v_y = v_0 sinα − 10t = 0$ donne la date ; remplace-la dans $y(t)$.')],
    solution: [
      { t: 'Cadre de l’étude', html: P('Système : le projectile, assimilé à un point M. Référentiel : terrestre, supposé galiléen. Repère $(O, u⃗_x, u⃗_y)$, $u⃗_y$ vers le haut ; $t = 0$ au lancer. Le terme $5t²$ est $@f{1}{2}gt²$ avec $g = 10$ m·s⁻² : les grandeurs sont en unités SI.') },
      { t: 'Question 1.a : équations horaires', html: E('x(t) = v_0 cosα · t', 'y(t) = v_0 sinα · t − 5t²') },
      { t: 'Question 1.b : équation de la trajectoire', html: P('De $x(t)$ : $t = @f{x}{v_0 cosα}$. Dans $y(t)$ :') + E('y = v_0 sinα · @f{x}{v_0 cosα} − 5 @f{x²}{v_0² cos²α}', 'y(x) = −@f{5}{v_0² cos²α} x² + x tanα') + P('Une parabole, tournée vers le bas.') },
      { t: 'Question 2 : vecteur vitesse et norme', html: E('v⃗(t) = @f{dOM⃗}{dt} = @f{dx}{dt} u⃗_x + @f{dy}{dt} u⃗_y', 'v⃗(t) = v_0 cosα u⃗_x + (v_0 sinα − 10t) u⃗_y', '‖v⃗‖ = @r{v_x² + v_y²} = @r{v_0² cos²α + (v_0 sinα − 10t)²}') },
      { t: 'Question 3 : hauteur maximale', html: E('v_y(t_S) = v_0 sinα − 10 t_S = 0   ⇒   t_S = @f{v_0 sinα}{10}') + P('On remplace dans $y(t)$ :') +
        E('y_{max} = v_0 sinα · @f{v_0 sinα}{10} − 5 @f{v_0² sin²α}{100}', 'y_{max} = @f{v_0² sin²α}{10} − @f{v_0² sin²α}{20} = @f{v_0² sin²α}{20}') + P('C’est la formule générale $@f{v_0² sin²α}{2g}$ avec $g = 10$ m·s⁻² ; elle est en mètres si $v_0$ est en m·s⁻¹.') }],
    answer: ul([
      '$x(t) = v_0 cosα · t$ ; $y(t) = v_0 sinα · t − 5t²$',
      '$y(x) = −@f{5}{v_0² cos²α} x² + x tanα$',
      '$v⃗ = v_0 cosα u⃗_x + (v_0 sinα − 10t) u⃗_y$ ; $‖v⃗‖ = @r{v_0² cos²α + (v_0 sinα − 10t)²}$',
      '$t_S = @f{v_0 sinα}{10}$ ; $y_{max} = @f{v_0² sin²α}{20}$']),
    traps: [
      'Garder du t dans l’équation de la trajectoire.',
      X('Dériver $5t²$ en $5t$ : c’est $10t$.'),
      X('Remplacer la date du sommet dans $x(t)$ : $x(t_S)$ est l’abscisse du sommet, pas sa hauteur.'),
      X('Oublier le carré : $5 t_S² = @f{v_0² sin²α}{20}$, d’où $y_{max} = @f{v_0² sin²α}{10} − @f{v_0² sin²α}{20}$.')],
    grading: 'Question 1.a : 0,5 + 0,5 ; question 1.b : 0,5 + 0,5 ; question 2 : 1 (vecteur) + 1 (norme) ; question 3 : 0,5 (date) + 1 (hauteur).',
    official: true
  });

  X0.push({
    id: 'p2021-ex4', exam: 'p2021', kind: 'partiel', order: 4, src: 'Partiel nov. 2021 · Ex 4',
    title: 'Accélération en polaires : circulaire, puis circulaire uniforme', pts: 4, topics: ['polaire', 'circulaire'], lvl: 1, time: 8,
    intro: P('Pour un mouvement quelconque, l’expression de l’accélération en coordonnées polaires est donnée par :') + E('a⃗(t) = (ρ̈ − ρθ̇²) u⃗_ρ + (ρθ̈ + 2ρ̇θ̇) u⃗_θ'),
    questions: [
      '1. Quelle est l’expression de l’accélération si le mouvement est circulaire ? Justifier.',
      '2. Quelle est l’expression de l’accélération si le mouvement est, en plus d’être circulaire, aussi uniforme. Justifier.'],
    hints: [
      X('Circulaire : le rayon ρ ne change pas. Que valent alors $ρ̇$ et $ρ̈$ ?'),
      X('Uniforme : la norme de la vitesse, $ρ|θ̇|$, est constante. Avec ρ = R constant, que dire de $θ̇$, puis de $θ̈$ ?'),
      X('Le corrigé attend aussi la norme de $a⃗$ dans chaque cas.')],
    solution: [
      { t: 'Question 1 : mouvement circulaire', html: P('Circulaire de centre O : le rayon est constant, $ρ = R$, donc $ρ̇ = 0$ et $ρ̈ = 0$.') +
        E('a⃗ = −Rθ̇² u⃗_ρ + Rθ̈ u⃗_θ', '‖a⃗‖ = @r{(Rθ̇²)² + (Rθ̈)²}') +
        P('La composante $−Rθ̇²$ est dirigée vers le centre (centripète) ; la composante $Rθ̈$, tangente au cercle, fait varier la norme de la vitesse $v = R|θ̇|$.') },
      { t: 'Question 2 : circulaire et uniforme', html: P('Uniforme : $v = R|θ̇|$ est constante, donc $θ̇$ est constante ($θ̇ = ω$) et $θ̈ = 0$.') +
        E('a⃗ = −Rθ̇² u⃗_ρ = −Rω² u⃗_ρ', '‖a⃗‖ = Rθ̇² = @f{v²}{R}') +
        P('L’accélération n’est pas nulle : elle est centripète, dirigée de M vers O.') }],
    answer: ul(['Circulaire : $ρ̇ = ρ̈ = 0$, $a⃗ = −Rθ̇² u⃗_ρ + Rθ̈ u⃗_θ$, $‖a⃗‖ = @r{(Rθ̇²)² + (Rθ̈)²}$', 'Circulaire uniforme : $θ̈ = 0$, $a⃗ = −Rθ̇² u⃗_ρ$, $‖a⃗‖ = Rθ̇²$']),
    traps: [
      X('Conclure $a⃗ = 0⃗$ pour le mouvement circulaire uniforme : il reste $−Rθ̇² u⃗_ρ$.'),
      X('Annuler $θ̇$ au lieu de $θ̈$ : uniforme veut dire $θ̇$ constant, pas nul.'),
      X('Oublier le signe moins : $a⃗$ est dirigée vers le centre, dans le sens de $−u⃗_ρ$.'),
      X('Écrire $‖a⃗‖ = Rθ̇² + Rθ̈$ : les deux composantes sont orthogonales, il faut la racine de la somme des carrés.')],
    grading: X('Question 1 : 0,5 ($ρ̇ = ρ̈ = 0$) + 0,5 (vecteur) + 1 (norme) ; question 2 : 0,5 ($θ̈ = 0$) + 0,5 (vecteur) + 1 (norme).'),
    official: true
  });

  /* =====================================================================
     Contrôle 1 de 2020-2021 (promo 2025) : corrigé officiel manuscrit sur le sujet, 0,5 point par question de QCM
     ===================================================================== */
  X0.push({
    id: 'p2020-ex1', exam: 'p2020', kind: 'partiel', order: 1, src: 'Partiel 2020-2021 · Ex 1',
    title: 'Ellipse : trajectoire, vitesse et accélération', pts: 5, topics: ['cinematique', 'trajectoire'], lvl: 1, time: 12,
    intro: P('Une particule est en mouvement dans le plan (X,Y) dont les équations horaires, en coordonnées cartésiennes, sont données par :') +
      E('x(t) = @r{2} cos(ωt)', 'y(t) = 2@r{2} sin(ωt)') + P('($ω$ est une constante positive exprimé en rad.s⁻¹).'),
    questions: [
      X('1- a) Montrer que l’équation de la trajectoire de ce mouvement est de la forme : $@f{x²}{a²} + @f{y²}{b²} = 1$, équation d’une trajectoire elliptique, avec $a$ et $b$ des constantes positives.<br>b) Préciser les valeurs des constantes $a$ et $b$.'),
      X('2- Exprimer les composantes du vecteur vitesse $V⃗(t)$. Donner sa norme.'),
      X('3- a) Exprimer les composantes du vecteur accélération $a⃗(t)$. Donner sa norme.<br>b) Exprimer le vecteur accélération $a⃗(t)$ en fonction du vecteur position $OM⃗(t)$.')],
    hints: [
      X('Isole $cos(ωt)$ dans $x(t)$ et $sin(ωt)$ dans $y(t)$, puis utilise $cos² + sin² = 1$.'),
      X('Dérive chaque composante : la dérivée de $cos(ωt)$ est $−ω sin(ωt)$, celle de $sin(ωt)$ est $ω cos(ωt)$.'),
      X('Pour la norme, écris $sin² = 1 − cos²$ (ou l’inverse) pour obtenir $1 + 3cos²(ωt)$. Compare ensuite $a⃗$ à $x u⃗_x + y u⃗_y$.')],
    solution: [
      { t: 'Question 1 : équation de la trajectoire', html: P('On isole le cosinus et le sinus, puis on utilise $cos² + sin² = 1$ :') +
        E('cos(ωt) = @f{x}{@r{2}}   sin(ωt) = @f{y}{2@r{2}}', '@f{x²}{2} + @f{y²}{8} = cos²(ωt) + sin²(ωt) = 1') +
        P('C’est la forme demandée avec $a² = 2$ et $b² = 8$ : <strong>$a = @r{2}$ et $b = 2@r{2}$</strong>. L’ellipse est centrée en O ; son grand axe est sur $(Oy)$, car $b &gt; a$.') +
        fig(F.ell20('Ellipse de centre O, de demi-axes racine de 2 sur l’axe x et 2 racine de 2 sur l’axe y ; au point M, la vitesse est tangente et l’accélération pointe vers O.'), 'Ellipse de demi-axes √2 (sur x) et 2√2 (sur y), parcourue dans le sens direct. En M, $a⃗$ pointe vers O (question 3.b).') },
      { t: 'Question 2 : vitesse', html: E('V⃗ = −@r{2}ω sin(ωt) u⃗_x + 2@r{2}ω cos(ωt) u⃗_y', 'V = @r{2ω² sin²(ωt) + 8ω² cos²(ωt)} = @r{2}ω @r{sin²(ωt) + 4cos²(ωt)}', 'V = @r{2}ω @r{1 + 3cos²(ωt)}') +
        P('On a écrit $sin² + 4cos² = (sin² + cos²) + 3cos² = 1 + 3cos²$. La vitesse n’est pas constante : elle vaut $2@r{2}ω$ quand M passe sur l’axe $(Ox)$ et $@r{2}ω$ sur l’axe $(Oy)$.') },
      { t: 'Question 3.a : accélération', html: E('a⃗ = −@r{2}ω² cos(ωt) u⃗_x − 2@r{2}ω² sin(ωt) u⃗_y', 'a = @r{2}ω² @r{cos²(ωt) + 4sin²(ωt)} = @r{2}ω² @r{1 + 3sin²(ωt)}') },
      { t: 'Question 3.b : l’accélération en fonction de la position', html: E('a⃗ = −ω²(@r{2} cos(ωt) u⃗_x + 2@r{2} sin(ωt) u⃗_y)', 'a⃗ = −ω²(x u⃗_x + y u⃗_y) = −ω² OM⃗') +
        P('L’accélération est toujours dirigée vers le centre O de l’ellipse. On retrouve cette relation chaque fois que $x$ et $y$ sont des cosinus et des sinus de même pulsation ω, sans constante ajoutée.') }],
    answer: ul([
      '$@f{x²}{2} + @f{y²}{8} = 1$ : $a = @r{2}$, $b = 2@r{2}$',
      '$V⃗ = −@r{2}ω sin(ωt) u⃗_x + 2@r{2}ω cos(ωt) u⃗_y$ ; $V = @r{2}ω @r{1 + 3cos²(ωt)}$',
      '$a⃗ = −@r{2}ω² cos(ωt) u⃗_x − 2@r{2}ω² sin(ωt) u⃗_y$ ; $a = @r{2}ω² @r{1 + 3sin²(ωt)}$',
      '$a⃗ = −ω² OM⃗$']),
    traps: [
      'Oublier le facteur ω (ou ω²) en dérivant.',
      X('Inverser a et b : $a$ est sous $x²$, $b$ sous $y²$.'),
      X('Couper la racine : $@r{1 + 3cos²}$ ne vaut pas $1 + @r{3} cos$.'),
      X('Écrire $a⃗ = ω² OM⃗$ : il y a un signe moins, l’accélération pointe vers O.')],
    grading: 'Question 1.a : 1 ; 1.b : 0,5 ; question 2 : 0,5 (composantes) + 1 (norme) ; question 3.a : 0,5 + 1 ; 3.b : 0,5.',
    official: true
  });

  X0.push({
    id: 'p2020-ex2', exam: 'p2020', kind: 'partiel', order: 2, src: 'Partiel 2020-2021 · Ex 2',
    title: 'Une trajectoire rectiligne : un segment parcouru en allers-retours', pts: 5, topics: ['trajectoire', 'cinematique'], lvl: 2, time: 12,
    intro: P('On considère un mouvement dans le plan (X,Y), dont les équations horaires sont :') + E('x(t) = sin²(ωt)', 'y(t) = 1 + cos(2ωt)') + P('($ω$ est une constante positive).'),
    questions: [
      X('1- a) Retrouver l’équation de la trajectoire. Préciser sa nature. On donne : $cos(2ωt) = 1 − 2sin²(ωt)$.<br>b) Tracer cette trajectoire, sachant que : $0 ≤ sin²(ωt) ≤ 1$.'),
      '2- Exprimer les composantes du vecteur vitesse en coordonnées cartésiennes. Donner sa norme.'],
    hints: [
      X('Remplace $cos(2ωt)$ par $1 − 2sin²(ωt)$ dans $y(t)$, puis reconnais $x(t)$.'),
      X('Le tracé n’est pas une droite entière : $x = sin²(ωt)$ ne sort jamais de [0 ; 1].'),
      X('Dérivée de $sin²(ωt)$ : $2ω sin(ωt) cos(ωt) = ω sin(2ωt)$. Dérivée de $cos(2ωt)$ : $−2ω sin(2ωt)$. Contrôle avec la trajectoire : $v_y$ doit valoir $−2v_x$.')],
    solution: [
      { t: 'Question 1.a : équation de la trajectoire', html: E('y = 1 + 1 − 2sin²(ωt) = 2 − 2sin²(ωt)', 'y(x) = 2 − 2x') +
        P('C’est l’équation d’une droite de pente −2. Mais $x = sin²(ωt)$ reste entre 0 et 1 : M ne parcourt qu’un <strong>segment</strong> de cette droite.') },
      { t: 'Question 1.b : le tracé', html: fig(F.seg20('Segment de droite entre les points de coordonnées 0, 2 et 1, 0 ; deux flèches indiquent que le point le parcourt dans un sens puis dans l’autre.'), 'Le segment entre (0 ; 2) et (1 ; 0), parcouru en allers-retours.') +
        P('Extrémités : $(0 ; 2)$ quand $sin(ωt) = 0$, et $(1 ; 0)$ quand $sin²(ωt) = 1$. À $t = 0$, M est en (0 ; 2) ; il atteint (1 ; 0) à $ωt = π/2$, revient en (0 ; 2) à $ωt = π$, et ainsi de suite. Le corrigé officiel parle d’« une droite » : précise qu’il s’agit d’un segment.') },
      { t: 'Question 2 : vitesse', html: P('On dérive avec la règle des fonctions composées :') +
        E('v_x = @f{d}{dt} sin²(ωt) = 2ω sin(ωt) cos(ωt) = ω sin(2ωt)', 'v_y = @f{d}{dt}(1 + cos(2ωt)) = −2ω sin(2ωt)') +
        E('V⃗ = ω sin(2ωt) u⃗_x − 2ω sin(2ωt) u⃗_y', 'V = @r{ω² sin²(2ωt) + 4ω² sin²(2ωt)} = @r{5} ω |sin(2ωt)|') +
        P('Contrôle : sur la droite $y = 2 − 2x$, on doit avoir $v_y = −2v_x$ ; c’est bien le cas. La vitesse s’annule aux extrémités du segment ($sin(2ωt) = 0$), là où M fait demi-tour.') },
      { t: 'Le corrigé officiel se trompe à la question 2', html: P('Il écrit $v_y = −2ω sin(ωt) cos(ωt)$ : la dérivée de $cos(2ωt)$ fait sortir $2ω$, pas $ω$. Il trouve donc $V = @r{2} ω |sin(2ωt)|$ au lieu de $@r{5} ω |sin(2ωt)|$.') }],
    answer: ul([
      '$y(x) = 2 − 2x$ avec $0 ≤ x ≤ 1$ : le segment de (0 ; 2) à (1 ; 0), parcouru en allers-retours',
      '$V⃗ = ω sin(2ωt) u⃗_x − 2ω sin(2ωt) u⃗_y$',
      '$V = @r{5} ω |sin(2ωt)|$']),
    traps: [
      'Répondre « une droite » sans préciser : M reste sur un segment, qu’il parcourt dans les deux sens.',
      X('Dériver $cos(2ωt)$ en $−ω sin(2ωt)$ : la dérivée de l’intérieur vaut $2ω$ (c’est l’erreur du corrigé officiel).'),
      X('Oublier la valeur absolue : une norme est positive, $V = @r{5} ω |sin(2ωt)|$.')],
    grading: 'Question 1.a : 2 ; 1.b : 1 ; question 2 : 1 (composantes) + 1 (norme).',
    official: false, note: 'D’après le corrigé officiel, sauf à la question 2 : il oublie un facteur 2 en dérivant y(t) (voir la correction).'
  });

  /* =====================================================================
     Contrôle 1 de 2019-2020 (promo 2024) : corrigé officiel manuscrit avec barème
     ===================================================================== */
  X0.push({
    id: 'p2019-ex1', exam: 'p2019', kind: 'partiel', order: 1, src: 'Partiel 2019-2020 · Ex 1',
    title: 'La cycloïde : vitesse, accélération et tracé', pts: 6, topics: ['cinematique', 'trajectoire'], lvl: 2, time: 20,
    intro: P('La cycloïde est une trajectoire décrite par un point d’un cercle de rayon $R$ roulant sans glisser sur une droite $(D)$. On peut aussi définir la cycloïde comme la trajectoire d’un mouvement composé d’un mouvement rectiligne uniforme et d’un mouvement circulaire uniforme de même vitesse.') +
      P('Les équations horaires en coordonnées cartésiennes de ce mouvement sont :') + E('x(t) = A(ωt − sin(ωt))', 'y(t) = A(1 − cos(ωt))') + P('Où $A$ et $ω$ sont des constantes positives.'),
    questions: [
      '1- Déterminer les composantes cartésiennes des vecteurs vitesse et accélération.',
      X('2- En déduire la norme de chacun de ces vecteurs. On donne : $1 − cos(α) = 2 sin²(α/2)$.'),
      X('3- Tracer la cycloïde $(y = f(x))$, sur un intervalle de temps de 2 périodes $(2T)$. Sachant que la pulsation $ω$ est relié à la période $T$ par : $ω = 2π/T$<br>(On prend les valeurs : $t = 0$ ; $t = T/4$ ; $t = T/2$ ; $t = 3T/4$ ; $t = T$).')],
    hints: [
      X('Dérive $x(t) = Aωt − A sin(ωt)$ et $y(t) = A − A cos(ωt)$ terme à terme.'),
      X('Dans la norme de $V⃗$, développe $(1 − cos)²$ et utilise $cos² + sin² = 1$ : il reste $2(1 − cos(ωt))$. Applique ensuite l’identité donnée avec $α = ωt$.'),
      X('Pour le tracé, $ωt = 2πt/T$ vaut 0, π/2, π, 3π/2 et 2π aux cinq dates proposées. La deuxième période se déduit de la première par un décalage de $2πA$ sur x.')],
    solution: [
      { t: 'Question 1 : vitesse et accélération', html: E('V⃗ = @f{dOM⃗}{dt} = ẋ u⃗_x + ẏ u⃗_y', 'V⃗ = Aω(1 − cos(ωt)) u⃗_x + Aω sin(ωt) u⃗_y', 'a⃗ = @f{dV⃗}{dt} = Aω² sin(ωt) u⃗_x + Aω² cos(ωt) u⃗_y') },
      { t: 'Question 2 : normes', html: E('V = Aω @r{(1 − cos(ωt))² + sin²(ωt)}', 'V = Aω @r{2(1 − cos(ωt))}') + P('car $(1 − cos)² + sin² = 1 − 2cos + (cos² + sin²) = 2 − 2cos$.') +
        P('Avec l’identité donnée et $α = ωt$ : $2(1 − cos(ωt)) = 4 sin²(ωt/2)$, donc') + E('V = 2Aω |sin(ωt/2)|', 'a = @r{A²ω⁴(sin²(ωt) + cos²(ωt))} = Aω²') +
        P('La valeur absolue est indispensable : une norme est positive, et $sin(ωt/2)$ change de signe au bout d’une période. La norme de l’accélération est constante, celle de la vitesse non.') },
      { t: 'Question 3 : tableau de valeurs', html: P('Avec $ω = 2π/T$, les cinq dates donnent $ωt = 0$, π/2, π, 3π/2 et 2π. Sans calculatrice, π ≈ 3,14 suffit.') +
        '<div class="tbl"><table><thead><tr><th>t</th><th>0</th><th>T/4</th><th>T/2</th><th>3T/4</th><th>T</th></tr></thead><tbody>' +
        '<tr><th>x / A</th><td>0</td><td>π/2 − 1 ≈ 0,57</td><td>π ≈ 3,14</td><td>3π/2 + 1 ≈ 5,71</td><td>2π ≈ 6,28</td></tr>' +
        '<tr><th>y / A</th><td>0</td><td>1</td><td>2</td><td>1</td><td>0</td></tr></tbody></table></div>' +
        P('Sur la deuxième période, $x(t + T) = x(t) + 2πA$ et $y(t + T) = y(t)$ : on recopie la première arche, décalée de $2πA$.') },
      { t: 'Question 3 : le tracé', html: fig(F.cyclo19('Cycloïde sur deux périodes : deux arches de hauteur 2A posées sur l’axe x, avec une pointe en x = 0, 2 pi A et 4 pi A ; les points du tableau sont marqués.'), 'Deux arches de hauteur 2A ; les points du tableau sont en orange. Aux dates 0, T et 2T, la vitesse est nulle et la courbe forme une pointe.') +
        P('Les pointes (points de rebroussement) sont en $x = 0$, $2πA$ et $4πA$, sur l’axe $(Ox)$ : c’est là que $V = 2Aω|sin(ωt/2)|$ s’annule, car le point du cercle qui touche le sol est immobile. Le sommet de chaque arche est à la hauteur $2A$, le diamètre du cercle qui roule (ici, son rayon vaut A).') +
        site('Pour aller plus loin : $a⃗ = −ω² CM⃗$, où $C = (Aωt ; A)$ est le centre du cercle qui roule. L’accélération pointe toujours de M vers C, avec la norme constante $Aω²$.') }],
    answer: ul([
      '$V⃗ = Aω(1 − cos(ωt)) u⃗_x + Aω sin(ωt) u⃗_y$ ; $a⃗ = Aω² sin(ωt) u⃗_x + Aω² cos(ωt) u⃗_y$',
      '$V = 2Aω |sin(ωt/2)|$ ; $a = Aω²$',
      'Deux arches de hauteur $2A$ entre $x = 0$, $2πA$ et $4πA$, avec une pointe à chaque retour sur l’axe']),
    traps: [
      X('Oublier la valeur absolue : $@r{sin²} = |sin|$.'),
      X('Simplifier $@r{4 sin²(ωt/2)}$ en $2 sin²(ωt/2)$ : la racine porte aussi sur le carré.'),
      'Tracer des arches arrondies en bas : aux dates 0, T et 2T, la vitesse est nulle et la courbe forme une pointe.',
      'Ne tracer qu’une période : le sujet en demande deux (2T).'],
    grading: 'Question 1 : 1 (vitesse) + 1 (accélération) ; question 2 : 1,5 (norme de la vitesse) + 0,5 (norme de l’accélération) ; question 3 : 2.',
    official: true
  });

  /* =====================================================================
     Contrôle 1 de 2018-2019 (promo 2023) : pas de corrigé ; l’Ex 1 est sur la fiche p2018s-ex1
     ===================================================================== */
  X0.push({
    id: 'p2018-ex3', exam: 'p2018', kind: 'partiel', order: 3, src: 'Partiel 2018-2019 · Ex 3',
    title: 'Mouvement circulaire uniforme en cartésiennes', topics: ['cinematique', 'trajectoire', 'circulaire'], lvl: 1, time: 8,
    intro: P('Les coordonnées cartésiennes d’un point M mobile dans le plan (xOy) sont données par :') + E('x(t) = 2 cos(0,5t)@t{ et }y(t) = 2 sin(0,5t)') +
      site('Les questions 3 et 4 (composantes normale et tangentielle de l’accélération dans un repère de Frenet, rayon de courbure) sont hors programme cette année : elles ne sont pas reprises.'),
    questions: [
      '1- Déterminer l’équation et la nature de la trajectoire.',
      '2- Déterminer les composantes des vecteurs vitesse et accélération ainsi que leurs normes'],
    hints: [
      X('Élève $x$ et $y$ au carré, puis additionne : $cos² + sin² = 1$.'),
      X('La dérivée de $cos(0,5t)$ est $−0,5 sin(0,5t)$ : n’oublie pas le facteur 0,5.'),
      X('Compare $a⃗$ à $OM⃗$ : tu dois trouver un multiple négatif.')],
    solution: [
      { t: 'Question 1 : trajectoire', html: E('x² + y² = 4cos²(0,5t) + 4sin²(0,5t) = 4') +
        P('C’est le <strong>cercle de centre O et de rayon 2</strong> (en mètres, si les grandeurs sont en unités SI ; l’énoncé ne le précise pas).') },
      { t: 'Question 2 : vitesse', html: E('V⃗ = −2 × 0,5 sin(0,5t) u⃗_x + 2 × 0,5 cos(0,5t) u⃗_y', 'V⃗ = −sin(0,5t) u⃗_x + cos(0,5t) u⃗_y', 'V = @r{sin²(0,5t) + cos²(0,5t)} = 1 @t{m·s⁻¹}') +
        P('La norme de la vitesse est constante : le mouvement est circulaire uniforme.') },
      { t: 'Question 2 : accélération', html: E('a⃗ = −0,5 cos(0,5t) u⃗_x − 0,5 sin(0,5t) u⃗_y = −0,25 OM⃗', 'a = 0,5 @t{m·s⁻²}') +
        P('Contrôle avec le cours : rayon $R = 2$ m, vitesse angulaire $ω = 0,5$ rad·s⁻¹, donc $V = Rω = 1$ m·s⁻¹ et $a = Rω² = @f{V²}{R} = 0,5$ m·s⁻², dirigée vers O.') },
      { t: 'Vérification en polaires', html: P('Avec $ρ = 2$ et $θ = 0,5t$ : $OM⃗ = 2 u⃗_ρ$, $V⃗ = ρθ̇ u⃗_θ = u⃗_θ$ et $a⃗ = −ρθ̇² u⃗_ρ = −0,5 u⃗_ρ$. On retrouve les mêmes normes.') }],
    answer: ul([
      '$x² + y² = 4$ : cercle de centre O, de rayon 2',
      '$V⃗ = −sin(0,5t) u⃗_x + cos(0,5t) u⃗_y$ ; $V = 1$ m·s⁻¹, constante',
      '$a⃗ = −0,5 cos(0,5t) u⃗_x − 0,5 sin(0,5t) u⃗_y = −0,25 OM⃗$ ; $a = 0,5$ m·s⁻²']),
    traps: [
      X('Oublier le facteur 0,5 en dérivant $cos(0,5t)$ et $sin(0,5t)$.'),
      X('Conclure $a⃗ = 0⃗$ parce que la vitesse a une norme constante : sa direction change.'),
      X('Écrire $x² + y² = 2$ : le rayon vaut 2, son carré 4.')],
    grading: 'Exercice noté sur 4 points, questions 3 et 4 comprises ; le détail n’est pas imprimé.',
    official: false, note: NOTE_REDIGE
  });

  /* =====================================================================
     Contrôle de mai 2018, groupe S1# (promo 2023) : corrigé officiel manuscrit
     ===================================================================== */
  X0.push({
    id: 'p2018s-ex1', exam: 'p2018s', kind: 'partiel', order: 1, src: 'Partiel mai 2018 (S1#) · Ex 1',
    title: 'Ellipse : trajectoire, vitesse, accélération', pts: 6, topics: ['cinematique', 'trajectoire'], lvl: 1, time: 12,
    intro: P('Les équations horaires dans le plan (xoy) d’un point matériel sont données par :') + E('x(t) = 2a.cos(ω.t)', 'y(t) = a sin(ω.t)') + P('($a$ et $ω$ sont des constantes positives).') +
      site('Le contrôle 1 de 2018-2019 (exercice 1, 4 points) pose le même mouvement, avec une question de plus : la relation entre $a⃗$ et $OM⃗$, traitée à la fin de la correction.'),
    questions: [
      X('1- a) Montrer que la trajectoire de ce point matériel est elliptique. On rappelle l’équation analytique d’une ellipse de centre 0, de demis-axes $A$ et $B$ : $@f{x²}{A²} + @f{y²}{B²} = 1$ ($A$ et $B$ sont des constantes positives).<br>b) Identifier les constantes $A$ et $B$ en fonction de $a$.'),
      '2-Exprimer le vecteur vitesse, en déduire la norme de ce vecteur.',
      '3- Même question pour le vecteur accélération.'],
    hints: [
      X('Divise : $@f{x}{2a} = cos(ωt)$ et $@f{y}{a} = sin(ωt)$. Élève au carré et additionne.'),
      X('Dérive chaque composante ; dans la norme, remplace $4sin²$ par $3sin² + sin²$ pour faire apparaître $sin² + cos² = 1$.'),
      X('Attention aux notations : $a$ est une longueur de l’énoncé, la norme de l’accélération se note $‖a⃗‖$.')],
    solution: [
      { t: 'Question 1 : trajectoire', html: E('@f{x}{2a} = cos(ωt)   @f{y}{a} = sin(ωt)', '@f{x²}{4a²} + @f{y²}{a²} = cos²(ωt) + sin²(ωt) = 1') +
        P('L’égalité vaut pour tout t : la trajectoire est l’ellipse de centre O avec <strong>$A = 2a$</strong> (demi-grand axe, sur $(Ox)$) et <strong>$B = a$</strong> (demi-petit axe, sur $(Oy)$).') +
        fig(F.ell18('Ellipse de centre O, de demi-axes 2a sur l’axe x et a sur l’axe y ; au point M, la vitesse est tangente et l’accélération pointe vers O.'), 'Ellipse de demi-axes 2a et a, parcourue dans le sens direct. En M, $a⃗$ pointe vers O.') },
      { t: 'Question 2 : vitesse', html: E('V⃗ = −2aω sin(ωt) u⃗_x + aω cos(ωt) u⃗_y', 'V = aω @r{4sin²(ωt) + cos²(ωt)} = aω @r{3sin²(ωt) + 1}') +
        P('On a écrit $4sin² + cos² = 3sin² + (sin² + cos²) = 3sin² + 1$.') },
      { t: 'Question 3 : accélération', html: E('a⃗ = −2aω² cos(ωt) u⃗_x − aω² sin(ωt) u⃗_y', '‖a⃗‖ = aω² @r{4cos²(ωt) + sin²(ωt)} = aω² @r{3cos²(ωt) + 1}') },
      { t: 'Accélération et position (2018-2019, question 3.b)', html: E('a⃗ = −ω²(2a cos(ωt) u⃗_x + a sin(ωt) u⃗_y) = −ω² OM⃗') +
        P('L’accélération est dirigée de M vers le centre O de l’ellipse ; sa norme vaut $ω² OM$.') }],
    answer: ul([
      '$@f{x²}{4a²} + @f{y²}{a²} = 1$ : ellipse de centre O, $A = 2a$, $B = a$',
      '$V⃗ = −2aω sin(ωt) u⃗_x + aω cos(ωt) u⃗_y$ ; $V = aω @r{3sin²(ωt) + 1}$',
      '$a⃗ = −2aω² cos(ωt) u⃗_x − aω² sin(ωt) u⃗_y$ ; $‖a⃗‖ = aω² @r{3cos²(ωt) + 1}$',
      '$a⃗ = −ω² OM⃗$ (question 3.b de 2018-2019)']),
    traps: [
      X('Inverser les demi-axes : $A = 2a$ est sous $x²$.'),
      X('Échanger sin et cos dans les normes : $V$ contient $3sin²(ωt)$, $‖a⃗‖$ contient $3cos²(ωt)$.'),
      X('Confondre la constante $a$ et la norme $‖a⃗‖$ de l’accélération.')],
    grading: '6 points pour l’exercice, sans détail par question. En 2018-2019, le même exercice valait 4 points.',
    official: true
  });

  X0.push({
    id: 'p2018s-ex2', exam: 'p2018s', kind: 'partiel', order: 2, src: 'Partiel mai 2018 (S1#) · Ex 2 · Partie A',
    title: 'Hélice : vitesse et accélération en cartésiennes', topics: ['cinematique', 'circulaire', 'trajectoire', 'nature'], lvl: 1, time: 12,
    intro: '<p><b>Partie A</b> Coordonnées cartésiennes</p>' + P('Un point matériel M est repéré dans par ses coordonnées cartésiennes $(x, y, z)$ telles que :') +
      E('x(t) = R.cos(ω.t)', 'y(t) = R.sin(ω.t)', 'z(t) = H.ω.t') + P('Où $R$, $ω$ et $H$ sont des constantes positives.') +
      site('La partie B (même mouvement en coordonnées cylindriques) est hors programme cette année : elle n’est pas reprise. Les questions 1 et 2 de l’exercice 2 du contrôle 2019-2020 (« mouvement hélicoïdal », 1,5 point chacune) sont les mêmes.'),
    questions: [
      X('1- Exprimer le vecteur vitesse du point M dans la base cartésienne $(u⃗_x, u⃗_y, u⃗_z)$. Calculer sa norme.'),
      X('2- Exprimer le vecteur accélération du point M dans la base cartésienne $(u⃗_x, u⃗_y, u⃗_z)$. Calculer sa norme.'),
      '3- a) Quel est le mouvement du point M dans le plan (xOy) ? Justifier votre réponse en donnant l’équation de la trajectoire dans le plan (xoy).<br>b) Quel est le mouvement du point M suivant la direction de l’axe Oz ? Justifier votre réponse.'],
    hints: [
      X('Trois composantes à dériver ; $z(t) = Hωt$ donne $v_z = Hω$.'),
      X('Dans la norme, regroupe $R²ω²(sin² + cos²)$.'),
      X('Pour la question 3, regarde séparément $(x, y)$, puis $z$ : $x² + y²$ d’un côté, $v_z$ de l’autre.')],
    solution: [
      { t: 'Question 1 : vitesse', html: E('V⃗ = −Rω sin(ωt) u⃗_x + Rω cos(ωt) u⃗_y + Hω u⃗_z', 'V = ω@r{R² sin²(ωt) + R² cos²(ωt) + H²}', 'V = ω@r{R² + H²}') +
        P('La norme de la vitesse est constante : le mouvement est uniforme.') },
      { t: 'Question 2 : accélération', html: E('a⃗ = −Rω² cos(ωt) u⃗_x − Rω² sin(ωt) u⃗_y + 0 u⃗_z', 'a = @r{R²ω⁴(cos²(ωt) + sin²(ωt))} = Rω²') +
        P('$a_z = 0$ car $v_z = Hω$ est constante. Le corrigé officiel écrit par lapsus $a_y = −Rω² sin²(ωt)$ ; c’est $−Rω² sin(ωt)$.') +
        P('$a⃗ = −ω²(x u⃗_x + y u⃗_y)$ : l’accélération est horizontale et pointe vers l’axe $(Oz)$.') },
      { t: 'Question 3.a : dans le plan (xOy)', html: E('x² + y² = R²(cos²(ωt) + sin²(ωt)) = R²') +
        P('Dans le plan $(xOy)$, le point (x, y) décrit le cercle de centre O et de rayon R, à la vitesse constante $Rω$ : mouvement <strong>circulaire uniforme</strong>.') },
      { t: 'Question 3.b : suivant (Oz)', html: P('$z = Hωt$ et $v_z = Hω$ constante : mouvement <strong>rectiligne uniforme</strong> suivant $(Oz)$.') +
        P('Les deux ensemble donnent une hélice : à chaque tour, de durée $2π/ω$, M monte de $2πH$.') }],
    answer: ul([
      '$V⃗ = −Rω sin(ωt) u⃗_x + Rω cos(ωt) u⃗_y + Hω u⃗_z$ ; $V = ω@r{R² + H²}$',
      '$a⃗ = −Rω² cos(ωt) u⃗_x − Rω² sin(ωt) u⃗_y$ ; $a = Rω²$',
      'Dans $(xOy)$ : $x² + y² = R²$, mouvement circulaire uniforme ; suivant $(Oz)$ : rectiligne uniforme']),
    traps: [
      X('Oublier la composante $Hω u⃗_z$, dérivée de $z(t) = Hωt$.'),
      X('Écrire $V = Rω + Hω$ : les composantes s’ajoutent en carrés sous la racine.'),
      'Dire que M a un mouvement circulaire : sa trajectoire est une hélice ; seule sa projection dans le plan (xOy) est un cercle.'],
    grading: 'Exercice noté sur 9 points avec la partie B, sans détail. En 2019-2020 : 1,5 point pour la question 1 et 1,5 pour la question 2.',
    official: true
  });

  /* =====================================================================
     Contrôle 1 de novembre 2017 (promo 2022) : pas de corrigé ; sujet aussi en anglais
     ===================================================================== */
  X0.push({
    id: 'p2017-ex1', exam: 'p2017', kind: 'partiel', order: 1, src: 'Partiel nov. 2017 · Ex 1',
    title: 'Mouvement circulaire autour de C(1 ; 2)', pts: 4, topics: ['cinematique', 'trajectoire', 'circulaire'], lvl: 1, time: 10,
    intro: P('Les équations horaires d’un mouvement en coordonnées cartésiennes sont :') + E('x(t) = 1 + R sin(ω.t)', 'y(t) = 2 + R cos(ω.t)') + P('Où $ω$ et $R$ sont des constantes.'),
    questions: [
      X('1-Exprimer les composantes du vecteur vitesse $V⃗$ en fonction du temps. Calculer sa norme.'),
      X('2- Exprimer les composantes du vecteur accélération $a⃗$ en fonction du temps. Calculer sa norme.'),
      X('3- Retrouver l’équation de la trajectoire $y = f(x)$. Préciser sa nature et ses caractéristiques.')],
    hints: [
      'Les constantes 1 et 2 disparaissent en dérivant.',
      X('Isole $sin(ωt) = @f{x − 1}{R}$ et $cos(ωt) = @f{y − 2}{R}$, puis utilise $sin² + cos² = 1$.'),
      X('Compare $a⃗$ au vecteur $CM⃗$, avec C(1 ; 2), plutôt qu’à $OM⃗$.')],
    solution: [
      { t: 'Question 1 : vitesse', html: E('V⃗ = Rω cos(ωt) u⃗_x − Rω sin(ωt) u⃗_y', 'V = @r{R²ω²(cos²(ωt) + sin²(ωt))} = |Rω|') +
        P('L’énoncé ne dit pas que R et ω sont positifs : la norme s’écrit $|Rω|$ ($Rω$ s’ils sont positifs). Elle est constante : le mouvement est uniforme.') },
      { t: 'Question 2 : accélération', html: E('a⃗ = −Rω² sin(ωt) u⃗_x − Rω² cos(ωt) u⃗_y', 'a = |R|ω²') +
        P('Avec $C = (1 ; 2)$ : $CM⃗ = R sin(ωt) u⃗_x + R cos(ωt) u⃗_y$, donc $a⃗ = −ω² CM⃗$. L’accélération pointe vers C, le centre du cercle, et non vers O.') },
      { t: 'Question 3 : trajectoire', html: E('sin(ωt) = @f{x − 1}{R}   cos(ωt) = @f{y − 2}{R}', '(x − 1)² + (y − 2)² = R²') +
        P('C’est le <strong>cercle de centre C(1 ; 2) et de rayon |R|</strong>. Un cercle n’est pas le graphe d’une seule fonction : « $y = f(x)$ » donne deux demi-cercles, $y = 2 ± @r{R² − (x − 1)²}$.') +
        P('Avec R et ω positifs, M part de $(1 ; 2 + R)$, en haut du cercle, avec $V⃗ = Rω u⃗_x$ : il tourne dans le sens horaire. Le mouvement est circulaire uniforme.') +
        fig(F.circ17('Cercle de centre C de coordonnées 1 et 2 ; au point M, la vitesse est tangente au cercle, dans le sens des aiguilles d’une montre, et l’accélération pointe vers C.'), 'Cercle de centre C(1 ; 2). En M, $V⃗$ est tangent (sens horaire) et $a⃗$ pointe vers C.') }],
    answer: ul([
      '$V⃗ = Rω cos(ωt) u⃗_x − Rω sin(ωt) u⃗_y$ ; $V = |Rω|$',
      '$a⃗ = −Rω² sin(ωt) u⃗_x − Rω² cos(ωt) u⃗_y = −ω² CM⃗$ ; $a = |R|ω²$',
      '$(x − 1)² + (y − 2)² = R²$ : cercle de centre C(1 ; 2), de rayon |R| ; mouvement circulaire uniforme']),
    traps: [
      X('Écrire $a⃗ = −ω² OM⃗$ : le centre du cercle est C(1 ; 2), pas O.'),
      'Donner « un cercle de rayon R » sans son centre : la nature et les caractéristiques sont demandées.',
      X('Se tromper de signe : la dérivée de $cos(ωt)$ est $−ω sin(ωt)$.')],
    grading: '4 points, sans détail par question.',
    official: false, note: NOTE_REDIGE
  });

  X0.push({
    id: 'p2017-ex2', exam: 'p2017', kind: 'partiel', order: 2, src: 'Partiel nov. 2017 · Ex 2',
    title: 'Spirale : position, vitesse et accélération en polaires', topics: ['polaire'], lvl: 2, time: 15,
    intro: P('Les composantes du vecteur position $OM⃗$ en coordonnées cartésiennes sont données par :') + E('x(t) = ae^{ω.t} cos(ω.t)', 'y(t) = ae^{ω.t} sin(ω.t)') + P('$a$ et $ω$ sont des constantes positives.') +
      site('La question 4 (composantes de l’accélération en base de Frenet, rayon de courbure) est hors programme cette année : elle n’est pas reprise.'),
    questions: [
      X('1- Ecrire le vecteur position $OM⃗$ en coordonnées polaires de base $(u⃗_ρ, u⃗_θ)$.'),
      X('2- Exprimer en coordonnées polaires le vecteur vitesse $V⃗$. Calculer la norme de $V⃗$. On donne $θ̇ = ω$.'),
      X('3- Exprimer en coordonnées polaires le vecteur accélération $a⃗$. Calculer la norme de $a⃗$')],
    hints: [
      X('Reconnais $x = ρ cosθ$ et $y = ρ sinθ$ : qui sont ρ et θ ?'),
      X('$ρ = a e^{ωt}$ : sa dérivée est $aω e^{ωt}$. Remplace dans $v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$.'),
      X('Calcule séparément $ρ̈ − ρθ̇²$ et $2ρ̇θ̇ + ρθ̈$ : l’une des deux composantes s’annule.')],
    solution: [
      { t: 'Question 1 : vecteur position', html: P('On reconnaît $x = ρ cosθ$ et $y = ρ sinθ$ avec') + E('ρ = @r{x² + y²} = a e^{ωt}   θ = ωt', 'OM⃗ = a e^{ωt} u⃗_ρ') +
        P('ρ est bien positif ($a &gt; 0$). La trajectoire est une spirale : la distance à O grandit pendant que M tourne.') },
      { t: 'Question 2 : vitesse', html: E('ρ̇ = aω e^{ωt}   θ̇ = ω', 'V⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ = aω e^{ωt} (u⃗_ρ + u⃗_θ)', 'V = @r{2} aω e^{ωt}') +
        P('Les deux composantes sont égales : $V⃗$ fait toujours un angle de 45° avec $u⃗_ρ$.') +
        fig(F.spir17('Arc de spirale autour de O ; au point M, les vecteurs u rho et u thêta de la base polaire, et le vecteur vitesse, à 45 degrés de u rho.'), 'Une partie de la spirale ; en M, la base polaire et $V⃗$, à 45° de $u⃗_ρ$.') },
      { t: 'Question 3 : accélération', html: E('ρ̈ = aω² e^{ωt}   θ̈ = 0', 'ρ̈ − ρθ̇² = aω² e^{ωt} − aω² e^{ωt} = 0', '2ρ̇θ̇ + ρθ̈ = 2aω² e^{ωt}', 'a⃗ = 2aω² e^{ωt} u⃗_θ   ‖a⃗‖ = 2aω² e^{ωt}') +
        P('La composante radiale est nulle : l’accélération est perpendiculaire à $OM⃗$.') +
        P('Vérification en cartésiennes : en dérivant deux fois $x(t)$ et $y(t)$, on trouve $ẍ = −2aω² e^{ωt} sin(ωt)$ et $ÿ = 2aω² e^{ωt} cos(ωt)$, d’où la même norme.') }],
    answer: ul([
      '$OM⃗ = a e^{ωt} u⃗_ρ$',
      '$V⃗ = aω e^{ωt} (u⃗_ρ + u⃗_θ)$ ; $V = @r{2} aω e^{ωt}$',
      '$a⃗ = 2aω² e^{ωt} u⃗_θ$ ; $‖a⃗‖ = 2aω² e^{ωt}$']),
    traps: [
      X('Écrire $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$ : pas de composante sur $u⃗_θ$.'),
      X('Oublier le terme $−ρθ̇²$ : on trouverait à tort une composante radiale $aω² e^{ωt}$.'),
      X('Confondre la constante $a$ et la norme $‖a⃗‖$ de l’accélération.')],
    grading: 'Exercice noté sur 6 points, question 4 comprise ; le détail n’est pas imprimé.',
    official: false, note: NOTE_REDIGE
  });
})();
