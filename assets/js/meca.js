/* Physique (mécanique du point) — comportements communs des pages et outils de dessin.

   PAGES
   Numéros de parties en chronophotographie : <span class="frames" data-n="3"></span> dessine les 3 premières
   poses d’un même tir (la partie 8 montre la parabole entière). Sommaire actif (.toc a[href^="#"] + .sec[id]),
   barre de lecture (#prog), vérifications de fin de partie (<div data-check="id1,id2"> ou
   <div data-check-ref="physique/cours-1-cinematique.html#s2" data-n="3"> : les premières questions de la banque
   dont ref vaut cette partie ; le bloc se masque si la banque n’en a pas), boutons « J’ai compris »
   (data-done="physique:<chapitre>:sN", via REV.wireDoneButtons).

   COULEURS (assets/css/physique.css), les mêmes partout, dans le texte comme dans les figures :
   position = bleu (k-pos), vitesse = vert (k-vel), accélération = rouge (k-acc), force = violet (k-frc).
   Dans le texte : <var class="vec kp">OM</var>, <var class="vec kv">v</var>, <var class="vec ka">a</var>,
   <var class="vec kf">F</var> (flèche dessinée en CSS au-dessus du symbole).

   DESSIN — R.meca.plot(opts) : un repère en unités du monde (m, s, m·s⁻¹…) converti en pixels SVG.
     var p = R.meca.plot({ x: [-1, 10], y: [-1, 6], w: 520, equal: true, pad: [12, 12, 26, 30] });
       x, y : fenêtre du monde ; w : largeur en px ; h : hauteur (calculée si equal ou absente) ;
       equal : même échelle sur les deux axes (angles justes) ; pad : marges [haut, droite, bas, gauche] en px.
     p.grid({ x: [0.5, 1], y: [0.5, 1] })         papier millimétré : [pas fin, pas épais] par axe
      .axes({ x: { v: 'x', u: 'm' }, y: { v: 'y', u: 'm' }, tx: 1, ty: 1, lx: 2, ly: 2, origin: 'O' })
          axes fléchés et gradués : tx/ty pas des graduations, lx/ly pas des nombres, at: [x, y] croisement,
          dec : décimales des nombres, origin : nom de l’origine ; un nom d’axe est une chaîne ou { v, sub, u }
      .curve(function (x) { return 2 * x; }, { from: 0, to: 3 })            courbe y = f(x)
      .param(function (t) { return [x(t), y(t)]; }, 0, 2, { cls: 'mk-traj' }) courbe paramétrée
      .chrono(function (t) { return [x(t), y(t)]; }, 0, 2, 0.2, { hl: 3 })    poses tous les Δt (chronophotographie)
      .vec([x, y], [dx, dy], { kind: 'vel', label: 'v', scale: 0.3 })        vecteur fléché étiqueté
          kind : 'pos' | 'vel' | 'acc' | 'frc' | 'ink' ; label, sub (indice), arrow (flèche sur l’étiquette,
          vraie par défaut) ; scale : unités du monde par unité du vecteur ; px: true → [dx, dy] en pixels
          (y vers le haut) ; lab: [dx, dy] décalage de l’étiquette en px ; w : épaisseur ; head : taille de la pointe
      .point([x, y], { label: 'S', dx: 7, dy: -7 })  .line(a, b, { cls: 'mk-dash' })  .text([x, y], 't', { anchor })
      .area(f, a, b, { cls })   aire entre y = f(x) et l’axe y = 0, de x = a à x = b
     p.svg({ label: 'description pour lecteur d’écran' }) rend la chaîne <svg…> ; p.X(x), p.Y(y) en px.
   R.meca.mount(el, function (w) { return '<svg…>'; }) dessine à la largeur réelle du conteneur (texte net sur
   téléphone) et redessine quand cette largeur change ; renvoie { redraw }.
   R.meca.label(x, y, 'v', { sub: '0', kind: 'vel', anchor: 'start', fs: 16 }) : symbole fléché seul (SVG).

   CALCULS (purs, testables sous node) — R.meca.calc :
     projectile({ v0, alpha (degrés), g = 10, h = 0 }) → { vx0, vy0, tS, xS, yS, tP, xP, at(t) }
       at(t) → { x, y, vx, vy, ax, ay, v } ; S = sommet (vy = 0), P = impact au sol (y = 0, t > 0).
     uva({ x0, v0, a }) → { at(t) → { x, v, a } } (rectiligne uniformément varié ; a = 0 : uniforme)
     nice(lo, hi, n) → { lo, hi, step } graduations « rondes » qui couvrent [lo, hi].

   VISUELS PRÊTS À L’EMPLOI
     R.meca.launcher(el, { v0: 20, alpha: 30, g: 10, dt: 0.2 }) : plaque chronophotographique d’un tir depuis le
       sol ; réglages v0, α et instant t, bouton « Lancer » (une seule fois, rien en boucle ; immédiat si
       l’utilisateur réduit les animations) ; poses tous les Δt, v⃗ et a⃗ à chaque pose, OM⃗ à l’instant t,
       sommet S, impact P, lecture des coordonnées et du signe de v⃗·a⃗.
     R.meca.linked(el, { presets: [{ name, x0, v0, a }], start: 1, T: 4 }) : mouvement rectiligne ;
       bande de poses et graphes x(t), v(t), a(t) liés (tangente = pente, aires sous les courbes).
   Textes affichés : REV.t('français') ; l’anglais est déclaré ci-dessous (REV.i18n.add).
   Nombres : REV.util.nf (virgule en français, point en anglais, vrai signe moins). */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t;
  var NB = ' ';
  R.i18n.add({
    'Plaque chronophotographique': 'Chronophotographic plate',
    'Vitesse initiale': 'Initial speed', 'Angle de tir': 'Launch angle', 'Instant': 'Instant',
    'à chaque pose': 'at each exposure', 'à l’instant t': 'at instant t', 'Lancer': 'Launch',
    'Position': 'Position', 'Vitesse': 'Velocity', 'Accélération': 'Acceleration',
    'Sommet': 'Top', 'Impact': 'Impact', 'portée': 'range',
    'Plaque : tir à {v} avec un angle de {a}. Sommet à {ys} de haut, impact à {xp}.':
      'Plate: launch at {v} at an angle of {a}. Top at a height of {ys}, impact at {xp}.',
    'Montée : v⃗·a⃗ < 0, le mouvement est <b>ralenti</b> (‖v⃗‖ diminue).': 'Going up: v⃗·a⃗ < 0, the motion is <b>decelerated</b> (‖v⃗‖ decreases).',
    'Sommet : v⃗·a⃗ = 0, v⃗ ⊥ a⃗. Ni accéléré ni ralenti à cet instant : seule la direction de v⃗ change.':
      'Top: v⃗·a⃗ = 0, v⃗ ⊥ a⃗. Neither accelerated nor decelerated at this instant: only the direction of v⃗ changes.',
    'Descente : v⃗·a⃗ > 0, le mouvement est <b>accéléré</b> (‖v⃗‖ augmente).': 'Going down: v⃗·a⃗ > 0, the motion is <b>accelerated</b> (‖v⃗‖ increases).',
    'Sommet S : t<sub>S</sub> = {ts} · x<sub>S</sub> = {xs} · y<sub>S</sub> = {ys}. Impact P : t<sub>P</sub> = {tp} · portée x<sub>P</sub> = {xp}.':
      'Top S: t<sub>S</sub> = {ts} · x<sub>S</sub> = {xs} · y<sub>S</sub> = {ys}. Impact P: t<sub>P</sub> = {tp} · range x<sub>P</sub> = {xp}.',
    'Mouvement rectiligne : trois courbes liées': 'Rectilinear motion: three linked graphs',
    'Uniforme': 'Uniform', 'Voiture du TD 1': 'Car from tutorial 1', 'Freinage': 'Braking',
    'Position initiale': 'Initial position', 'Accélération (constante)': 'Acceleration (constant)',
    'pente = v': 'slope = v', 'aire = Δx': 'area = Δx', 'aire = Δv': 'area = Δv',
    'Bande de poses (toutes les {dt}) et graphes x(t), v(t), a(t).': 'Strip of exposures (every {dt}) and graphs x(t), v(t), a(t).',
    'À t = {t} : x = {x} · v = {v} · a = {a}.': 'At t = {t}: x = {x} · v = {v} · a = {a}.',
    'Pente de la tangente à x(t) : {v} = v(t). Aire sous v(t) de 0 à t : {dx} = x(t) − x(0). Aire sous a(t) : {dv} = v(t) − v(0).':
      'Slope of the tangent to x(t): {v} = v(t). Area under v(t) from 0 to t: {dx} = x(t) − x(0). Area under a(t): {dv} = v(t) − v(0).',
    'Mouvement <b>uniforme</b> : a = 0, v constante.': '<b>Uniform</b> motion: a = 0, v constant.',
    'Mouvement <b>accéléré</b> : v et a de même signe.': '<b>Accelerated</b> motion: v and a have the same sign.',
    'Mouvement <b>ralenti</b> : v et a de signes opposés.': '<b>Decelerated</b> motion: v and a have opposite signs.',
    'Arrêt instantané : v = 0 mais a ≠ 0, le mobile repart en sens inverse.': 'Momentary stop: v = 0 but a ≠ 0, the body moves off the other way.',
    'Immobile : v = 0 et a = 0.': 'At rest: v = 0 and a = 0.',
    'Préréglages': 'Presets'
  });

  function esc(s) { return U.esc(String(s)); }
  function nf(x, d) { return U.nf(Math.abs(x) < 1e-9 ? 0 : x, d); }
  function r1(v) { return Math.round(v * 10) / 10; }
  function unit(x, d, u) { return nf(x, d) + NB + u; }
  var MS = 'm·s⁻¹', MS2 = 'm·s⁻²';

  /* ------------------------------------------------------------------ numéros de parties */
  /* Les 8 poses d'un même tir ; la partie n montre les n premières, la dernière en couleur pleine. */
  function framesSVG(n) {
    n = Math.max(1, Math.min(8, n | 0));
    var s = '<svg viewBox="0 0 34 22" aria-hidden="true" focusable="false">';
    for (var k = 0; k < n; k++) {
      var x = 3 + 4 * k, y = 19 - 1.143 * k * (7 - k);
      s += '<circle cx="' + x + '" cy="' + y.toFixed(1) + '" r="' + (k === n - 1 ? 2.7 : 2) + '"' + (k === n - 1 ? ' class="now"' : '') + '/>';
    }
    return s + '</svg>';
  }

  function init() {
    U.$$('.frames[data-n]').forEach(function (el) { el.innerHTML = framesSVG(+el.dataset.n); el.setAttribute('aria-hidden', 'true'); });
    var links = U.$$('.toc a[href^="#"]'), secs = U.$$('.sec[id]');
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      var b = sec && sec.querySelector('[data-done]');
      if (b) { a.setAttribute('data-toc-key', b.getAttribute('data-done')); a.classList.toggle('done', R.progress.isRead(b.getAttribute('data-done'))); }
    });
    if ('IntersectionObserver' in window && links.length) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); });
      }, { rootMargin: '-35% 0px -60% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    }
    var prog = document.getElementById('prog');
    if (prog) {
      var onScroll = function () { var h = document.documentElement.scrollHeight - window.innerHeight; prog.style.width = (h > 0 ? 100 * window.scrollY / h : 0) + '%'; };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    if (R.quiz) U.$$('[data-check]').forEach(function (el) { R.quiz.mountCheck(el, el.getAttribute('data-check').split(',').map(function (s) { return s.trim(); }), el.getAttribute('data-title')); });
    U.$$('[data-check-ref]').forEach(function (el) {
      var ref = el.getAttribute('data-check-ref'), n = +el.getAttribute('data-n') || 3;
      var ids = R.quiz ? R.quiz.bank().filter(function (q) { return q.ref === ref; }).slice(0, n).map(function (q) { return q.id; }) : [];
      if (ids.length) R.quiz.mountCheck(el, ids, el.getAttribute('data-title')); else el.hidden = true;
    });
    R.wireDoneButtons();
  }
  document.addEventListener('DOMContentLoaded', init);

  /* ------------------------------------------------------------------ calculs */
  var calc = {
    projectile: function (o) {
      var g = o.g == null ? 10 : o.g, h = o.h || 0, al = (o.alpha || 0) * Math.PI / 180, v0 = o.v0 || 0;
      var vx0 = v0 * Math.cos(al), vy0 = v0 * Math.sin(al);
      function at(t) {
        var vy = vy0 - g * t;
        return { t: t, x: vx0 * t, y: h + vy0 * t - g * t * t / 2, vx: vx0, vy: vy, ax: 0, ay: -g, v: Math.sqrt(vx0 * vx0 + vy * vy) };
      }
      var tS = Math.max(0, vy0 / g), S = at(tS);
      var tP = (vy0 + Math.sqrt(vy0 * vy0 + 2 * g * h)) / g;
      return { g: g, h: h, v0: v0, alpha: o.alpha, vx0: vx0, vy0: vy0, tS: tS, xS: S.x, yS: S.y, tP: tP, xP: vx0 * tP, at: at };
    },
    uva: function (o) {
      var x0 = o.x0 || 0, v0 = o.v0 || 0, a = o.a || 0;
      return { x0: x0, v0: v0, a: a, at: function (t) { return { t: t, x: x0 + v0 * t + a * t * t / 2, v: v0 + a * t, a: a }; } };
    },
    nice: function (lo, hi, n) {
      n = n || 4;
      if (!(hi - lo > 1e-9)) { lo -= 1; hi += 1; }
      var raw = (hi - lo) / n, mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)), f = raw / mag;
      var step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * mag;
      return { lo: Math.floor(lo / step + 1e-9) * step, hi: Math.ceil(hi / step - 1e-9) * step, step: step };
    }
  };

  /* ------------------------------------------------------------------ dessin */
  var uid = 0;
  function isMult(v, step) { var q = v / step; return Math.abs(q - Math.round(q)) < 1e-6; }
  /* largeur approchée d'un symbole en italique (police mathématique) */
  function textW(s, fs) {
    var w = 0; s = String(s);
    for (var i = 0; i < s.length; i++) w += (/[A-Z]/.test(s[i]) ? 0.68 : /[mw]/.test(s[i]) ? 0.72 : 0.5) * fs;
    return w;
  }
  /* symbole mathématique (italique), indice éventuel, flèche de vecteur au-dessus */
  function label(x, y, name, o) {
    o = o || {};
    var fs = o.fs || 16, kind = o.kind || 'ink';
    var wn = textW(name, fs), ws = o.sub != null && o.sub !== '' ? textW(o.sub, fs * 0.7) + fs * 0.06 : 0, w = wn + ws;
    var xs = o.anchor === 'end' ? x - w : o.anchor === 'middle' ? x - w / 2 : x;
    var s = '<text class="mk-math k-' + kind + (o.it === false ? ' up' : '') + '" x="' + r1(xs) + '" y="' + r1(y) + '" font-size="' + fs + '">' + esc(name) +
      (ws ? '<tspan class="mk-sub" dy="' + r1(fs * 0.3) + '" font-size="' + r1(fs * 0.7) + '">' + esc(o.sub) + '</tspan>' : '') + '</text>';
    if (o.arrow) {
      var ya = y - fs * 0.86, xa0 = xs + fs * 0.12, xa1 = xs + wn + fs * 0.1, hd = Math.max(2.6, fs * 0.17);
      s += '<path class="mk-varrow k-' + kind + '" d="M' + r1(xa0) + ' ' + r1(ya) + 'H' + r1(xa1) + 'M' + r1(xa1 - hd) + ' ' + r1(ya - hd * 0.8) + 'L' + r1(xa1) + ' ' + r1(ya) + 'L' + r1(xa1 - hd) + ' ' + r1(ya + hd * 0.8) + '"/>';
    }
    return s;
  }
  /* flèche de (x0, y0) à (x1, y1) en px, pointe pleine */
  function arrow(x0, y0, x1, y1, o) {
    o = o || {};
    var dx = x1 - x0, dy = y1 - y0, L = Math.sqrt(dx * dx + dy * dy), kind = o.kind || 'ink';
    if (L < 0.8) return o.zero ? '<circle class="vk-zero k-' + kind + '" cx="' + r1(x0) + '" cy="' + r1(y0) + '" r="2.4"/>' : '';
    var ux = dx / L, uy = dy / L, hl = Math.min(o.head || 9, L * 0.7), hw = hl * 0.45;
    var bx = x1 - ux * hl, by = y1 - uy * hl;
    var s = '<g class="vk k-' + kind + (o.cls ? ' ' + o.cls : '') + '">';
    if (L > hl) s += '<path d="M' + r1(x0) + ' ' + r1(y0) + 'L' + r1(bx + ux * 0.5) + ' ' + r1(by + uy * 0.5) + '"' + (o.w ? ' stroke-width="' + o.w + '"' : '') + '/>';
    s += '<polygon points="' + r1(x1) + ',' + r1(y1) + ' ' + r1(bx - uy * hw) + ',' + r1(by + ux * hw) + ' ' + r1(bx + uy * hw) + ',' + r1(by - ux * hw) + '"/></g>';
    if (o.label) {
      var lx = x1 + ux * 11 + (o.lab ? o.lab[0] : 0), ly = y1 + uy * 11 + 5 + (o.lab ? o.lab[1] : 0);
      var an = o.anchor || (ux > 0.35 ? 'start' : ux < -0.35 ? 'end' : 'middle');
      if (uy < -0.5 && !o.lab) ly -= 3;
      s += label(lx, ly, o.label, { sub: o.sub, kind: kind, anchor: an, fs: o.fs, arrow: o.arrow !== false });
    }
    return s;
  }
  function axisName(v) {
    if (v == null) return '';
    if (typeof v === 'string') return esc(v);
    return '<tspan class="mk-it">' + esc(v.v) + '</tspan>' + (v.sub ? '<tspan class="mk-it" dy="4" font-size="10">' + esc(v.sub) + '</tspan><tspan dy="-4"> </tspan>' : ' ') + (v.u ? '(' + esc(v.u) + ')' : '');
  }

  function Plot(o) {
    o = o || {};
    this.pad = o.pad || [12, 12, 26, 32];
    this.xr = o.x || [0, 10]; this.yr = o.y || [0, 10];
    this.w = Math.round(o.w || 520);
    var iw = this.w - this.pad[1] - this.pad[3];
    this.sx = iw / (this.xr[1] - this.xr[0]);
    if (o.equal || !o.h) { this.sy = this.sx; this.h = Math.round(this.pad[0] + this.pad[2] + (this.yr[1] - this.yr[0]) * this.sy); }
    else { this.h = Math.round(o.h); this.sy = (this.h - this.pad[0] - this.pad[2]) / (this.yr[1] - this.yr[0]); }
    this.id = 'mkc' + (++uid);
    this.parts = [];
  }
  Plot.prototype = {
    X: function (x) { return this.pad[3] + (x - this.xr[0]) * this.sx; },
    Y: function (y) { return this.pad[0] + (this.yr[1] - y) * this.sy; },
    add: function (s) { this.parts.push(s); return this; },
    clip: function (o) { return o && o.clip === false ? '' : ' clip-path="url(#' + this.id + ')"'; },
    grid: function (o) {
      o = o || {};
      var gx = o.x || [o.minor || 1, o.major || 5], gy = o.y || gx, s = '', v, self = this;
      var X0 = r1(this.X(this.xr[0])), X1 = r1(this.X(this.xr[1])), Y0 = r1(this.Y(this.yr[0])), Y1 = r1(this.Y(this.yr[1]));
      function cls(v, g) { return isMult(v, g[1]) ? 'mk-gM' : 'mk-gm'; }
      for (v = Math.ceil(this.xr[0] / gx[0] - 1e-9) * gx[0]; v <= this.xr[1] + 1e-9; v += gx[0]) s += '<path class="' + cls(v, gx) + '" d="M' + r1(self.X(v)) + ' ' + Y0 + 'V' + Y1 + '"/>';
      for (v = Math.ceil(this.yr[0] / gy[0] - 1e-9) * gy[0]; v <= this.yr[1] + 1e-9; v += gy[0]) s += '<path class="' + cls(v, gy) + '" d="M' + X0 + ' ' + r1(self.Y(v)) + 'H' + X1 + '"/>';
      return this.add('<g class="mk-grid">' + s + '</g>');
    },
    axes: function (o) {
      o = o || {};
      var xr = this.xr, yr = this.yr, self = this;
      var ox = o.at ? o.at[0] : Math.min(Math.max(0, xr[0]), xr[1]), oy = o.at ? o.at[1] : Math.min(Math.max(0, yr[0]), yr[1]);
      var ax = r1(this.Y(oy)), ay = r1(this.X(ox)), X0 = r1(this.X(xr[0])), X1 = r1(this.X(xr[1])), Y0 = r1(this.Y(yr[0])), Y1 = r1(this.Y(yr[1]));
      var s = '<path class="mk-axis" d="M' + X0 + ' ' + ax + 'H' + (X1 - 2) + 'M' + ay + ' ' + Y0 + 'V' + (Y1 + 2) + '"/>' +
        '<path class="mk-axhead" d="M' + X1 + ' ' + ax + 'l-8 -3.6v7.2zM' + ay + ' ' + Y1 + 'l-3.6 8h7.2z"/>';
      var dec = o.dec, v;
      function fmt(v, step) { return nf(v, dec != null ? dec : (step < 1 ? (step < 0.1 ? 2 : 1) : 0)); }
      if (o.tx) for (v = Math.ceil(xr[0] / o.tx - 1e-9) * o.tx; v <= xr[1] - o.tx * 0.4; v += o.tx) {
        var px = r1(self.X(v)), big = o.lx && isMult(v, o.lx);
        s += '<path class="mk-tick" d="M' + px + ' ' + (ax - (big ? 4 : 2.5)) + 'V' + (ax + (big ? 4 : 2.5)) + '"/>';
        if (big && !(Math.abs(v - ox) < 1e-9 && o.origin)) s += '<text class="mk-num" x="' + px + '" y="' + (ax + 16) + '" text-anchor="middle">' + fmt(v, o.lx) + '</text>';
      }
      if (o.ty) for (v = Math.ceil(yr[0] / o.ty - 1e-9) * o.ty; v <= yr[1] - o.ty * 0.4; v += o.ty) {
        var py = r1(self.Y(v)), bg = o.ly && isMult(v, o.ly);
        s += '<path class="mk-tick" d="M' + (ay - (bg ? 4 : 2.5)) + ' ' + py + 'H' + (ay + (bg ? 4 : 2.5)) + '"/>';
        if (bg && !(Math.abs(v - oy) < 1e-9 && (o.origin || o.tx))) s += '<text class="mk-num" x="' + (ay - 7) + '" y="' + (py + 4) + '" text-anchor="end">' + fmt(v, o.ly) + '</text>';
      }
      if (o.origin) s += '<text class="mk-pname" x="' + (ay - 6) + '" y="' + (ax + 16) + '" text-anchor="end">' + esc(o.origin) + '</text>';
      if (o.x) s += '<text class="mk-name" x="' + (X1 - 2) + '" y="' + (ax - 9) + '" text-anchor="end">' + axisName(o.x) + '</text>';
      if (o.y) s += '<text class="mk-name" x="' + (ay + 9) + '" y="' + (Y1 + 10) + '" text-anchor="start">' + axisName(o.y) + '</text>';
      return this.add('<g class="mk-axes">' + s + '</g>');
    },
    param: function (fn, t0, t1, o) {
      o = o || {};
      var n = o.n || 160, d = '';
      for (var i = 0; i <= n; i++) {
        var p = fn(t0 + (t1 - t0) * i / n);
        if (!p || !isFinite(p[0]) || !isFinite(p[1])) continue;
        d += (d ? 'L' : 'M') + r1(this.X(p[0])) + ' ' + r1(this.Y(p[1]));
      }
      return d ? this.add('<path class="' + (o.cls || 'mk-traj') + '" d="' + d + '"' + this.clip(o) + '/>') : this;
    },
    curve: function (f, o) {
      o = o || {};
      return this.param(function (x) { return [x, f(x)]; }, o.from == null ? this.xr[0] : o.from, o.to == null ? this.xr[1] : o.to, o);
    },
    area: function (f, a, b, o) {
      o = o || {};
      if (Math.abs(b - a) < 1e-9) return this;
      var n = o.n || 60, d = 'M' + r1(this.X(a)) + ' ' + r1(this.Y(0));
      for (var i = 0; i <= n; i++) { var x = a + (b - a) * i / n; d += 'L' + r1(this.X(x)) + ' ' + r1(this.Y(f(x))); }
      d += 'L' + r1(this.X(b)) + ' ' + r1(this.Y(0)) + 'Z';
      return this.add('<path class="' + (o.cls || 'mk-area') + '" d="' + d + '"' + this.clip(o) + '/>');
    },
    chrono: function (fn, t0, t1, dt, o) {
      o = o || {};
      var s = '', r = o.r || 5;
      for (var k = 0; t0 + k * dt <= t1 + 1e-9; k++) {
        var t = t0 + k * dt, p = fn(t);
        s += '<circle class="mk-img' + (o.hl === k ? ' hl' : '') + '" cx="' + r1(this.X(p[0])) + '" cy="' + r1(this.Y(p[1])) + '" r="' + r + '"/>';
        if (o.label) { var lb = o.label(k, t); if (lb) s += '<text class="mk-small" x="' + r1(this.X(p[0])) + '" y="' + r1(this.Y(p[1]) - r - 5) + '" text-anchor="middle">' + esc(lb) + '</text>'; }
      }
      return this.add('<g class="' + (o.cls || 'mk-chrono') + '">' + s + '</g>');
    },
    vec: function (at, d, o) {
      o = o || {};
      var x0 = this.X(at[0]), y0 = this.Y(at[1]), dx, dy;
      if (o.px) { dx = d[0]; dy = -d[1]; }
      else { var sc = o.scale == null ? 1 : o.scale; dx = d[0] * sc * this.sx; dy = -d[1] * sc * this.sy; }
      return this.add(arrow(x0, y0, x0 + dx, y0 + dy, o));
    },
    point: function (at, o) {
      o = o || {};
      var x = this.X(at[0]), y = this.Y(at[1]);
      var s = '<circle class="' + (o.cls || 'mk-pt') + '" cx="' + r1(x) + '" cy="' + r1(y) + '" r="' + (o.r || 3.5) + '"/>';
      if (o.label) s += '<text class="mk-pname' + (o.lcls ? ' ' + o.lcls : '') + '" x="' + r1(x + (o.dx == null ? 7 : o.dx)) + '" y="' + r1(y + (o.dy == null ? -7 : o.dy)) + '" text-anchor="' + (o.anchor || 'start') + '">' + esc(o.label) + '</text>';
      return this.add(s);
    },
    line: function (a, b, o) {
      o = o || {};
      return this.add('<path class="' + (o.cls || 'mk-line') + '" d="M' + r1(this.X(a[0])) + ' ' + r1(this.Y(a[1])) + 'L' + r1(this.X(b[0])) + ' ' + r1(this.Y(b[1])) + '"' + (o.clip ? this.clip({}) : '') + '/>');
    },
    text: function (at, str, o) {
      o = o || {};
      return this.add('<text class="' + (o.cls || 'mk-t') + '" x="' + r1(this.X(at[0]) + (o.dx || 0)) + '" y="' + r1(this.Y(at[1]) + (o.dy || 0)) + '" text-anchor="' + (o.anchor || 'start') + '">' + (o.html ? str : esc(str)) + '</text>');
    },
    label: function (at, name, o) {
      o = o || {};
      return this.add(label(this.X(at[0]) + (o.dx || 0), this.Y(at[1]) + (o.dy || 0), name, o));
    },
    svg: function (o) {
      o = o || {};
      var X0 = this.X(this.xr[0]), Y1 = this.Y(this.yr[1]);
      return '<svg class="mk' + (o.cls ? ' ' + o.cls : '') + '" viewBox="0 0 ' + this.w + ' ' + this.h + '" width="' + this.w + '" height="' + this.h + '" role="img" aria-label="' + esc(o.label || '') + '">' +
        '<defs><clipPath id="' + this.id + '"><rect x="' + r1(X0) + '" y="' + r1(Y1) + '" width="' + r1(this.X(this.xr[1]) - X0) + '" height="' + r1(this.Y(this.yr[0]) - Y1) + '"/></clipPath></defs>' +
        this.parts.join('') + '</svg>';
    }
  };
  function plot(o) { return new Plot(o); }

  /* dessine draw(largeur) dans el, à la largeur réelle ; redessine si elle change */
  function mount(el, draw) {
    var last = -1;
    function go(force) {
      var w = Math.round(el.clientWidth || 0);
      if (w < 40) w = 520;
      if (w === last && !force) return;
      last = w;
      el.innerHTML = draw(Math.max(280, w));
    }
    go();
    if (window.ResizeObserver) new ResizeObserver(function () { go(); }).observe(el);
    else window.addEventListener('resize', function () { go(); });
    return { redraw: function () { go(true); } };
  }

  /* curseur avec étiquette et valeur affichée */
  function slider(id, lab, min, max, step, val) {
    return '<div class="slider"><label for="' + id + '">' + lab + '</label><output id="' + id + 'v" for="' + id + '"></output>' +
      '<input id="' + id + '" type="range" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></div>';
  }
  var VEC = function (s, k) { return '<var class="vec ' + k + '">' + s + '</var>'; };

  /* ------------------------------------------------------------------ plaque : le tir */
  function launcher(el, o) {
    if (!el) return null;
    o = o || {};
    var g = o.g || 10, dt = o.dt || 0.2, id = 'pl' + (++uid);
    var st = { v0: o.v0 || 20, al: o.alpha || 30, t: 0, showV: true, showA: false, showR: true, anim: false };
    var XW = [-2.2, 42], YW = [-3, 21.5];
    el.classList.add('plate');
    el.innerHTML =
      '<div class="plate-head"><span>' + T('Plaque chronophotographique') + '</span><span>Δt = ' + unit(dt, 1, 's') + ' · g = ' + unit(g, 0, MS2) + '</span></div>' +
      '<div class="plate-fig mk-host"></div>' +
      '<div class="plate-ctrls">' +
        '<div class="sliders">' +
          slider(id + 'v', T('Vitesse initiale') + ' <var>v</var><sub>0</sub>', 5, 20, 1, st.v0) +
          slider(id + 'a', T('Angle de tir') + ' <var>α</var>', 5, 85, 5, st.al) +
          slider(id + 't', T('Instant') + ' <var>t</var>', 0, 2, 0.05, 0) +
        '</div>' +
        '<div class="row plate-tg">' +
          '<button type="button" class="chip-btn" data-tg="R" aria-pressed="true">' + VEC('OM', 'kp') + ' ' + T('à l’instant t') + '</button>' +
          '<button type="button" class="chip-btn" data-tg="V" aria-pressed="true">' + VEC('v', 'kv') + ' ' + T('à chaque pose') + '</button>' +
          '<button type="button" class="chip-btn" data-tg="A" aria-pressed="false">' + VEC('a', 'ka') + ' ' + T('à chaque pose') + '</button>' +
          '<button type="button" class="btn primary plate-go" data-go><span aria-hidden="true">▶</span> ' + T('Lancer') + '</button>' +
        '</div>' +
        '<div class="plate-read" aria-live="polite"></div>' +
      '</div>';
    var fig = el.querySelector('.plate-fig'), out = el.querySelector('.plate-read');
    var iv = document.getElementById(id + 'v'), ia = document.getElementById(id + 'a'), it = document.getElementById(id + 't');
    var P = null, view = null, raf = 0;

    function draw(w) {
      var p = plot({ x: XW, y: YW, w: w, equal: true, pad: [8, 8, 8, 8] });
      var kv = 0.32, ka = 0.26; // échelles : 1 m·s⁻¹ → 0,32 m ; 1 m·s⁻² → 0,26 m
      p.grid({ x: [1, 5], y: [1, 5] });
      p.add('<path class="mk-ground" d="M' + r1(p.X(XW[0])) + ' ' + r1(p.Y(0)) + 'H' + r1(p.X(XW[1])) + '"/>');
      p.axes({ x: { v: 'x', u: 'm' }, y: { v: 'y', u: 'm' }, tx: 1, ty: 1, lx: 5, ly: 5, origin: 'O' });
      p.param(function (t) { var m = P.at(t); return [m.x, m.y]; }, 0, P.tP, { cls: 'mk-traj' });
      // sommet et impact
      p.line([P.xS, 0], [P.xS, P.yS], { cls: 'mk-dash' });
      p.point([P.xS, P.yS], { cls: 'mk-key', r: 3, label: 'S', dx: 0, dy: -10, anchor: 'middle' });
      p.point([P.xP, 0], { cls: 'mk-key', r: 3, label: 'P', dx: 0, dy: -9, anchor: 'middle' });
      // poses
      var tmax = st.anim ? st.t : P.tP, imgs = '', vecs = '';
      for (var k = 0; k * dt <= P.tP + 1e-9; k++) {
        var t = k * dt; if (t > tmax + 1e-9) break;
        var m = P.at(t), X = p.X(m.x), Y = p.Y(m.y);
        imgs += '<circle class="mk-img" cx="' + r1(X) + '" cy="' + r1(Y) + '" r="4.6"/>';
        if (st.showV) vecs += arrow(X, Y, X + m.vx * kv * p.sx, Y - m.vy * kv * p.sy, { kind: 'vel', head: 6, cls: 'thin' });
        if (st.showA) vecs += arrow(X, Y, X, Y + g * ka * p.sy, { kind: 'acc', head: 6, cls: 'thin' });
      }
      p.add('<g class="mk-chrono">' + imgs + '</g>' + vecs);
      // instant t
      var M = P.at(st.t), MX = p.X(M.x), MY = p.Y(M.y);
      if (st.showR && (Math.abs(M.x) > 0.05 || Math.abs(M.y) > 0.05)) p.add(arrow(p.X(0), p.Y(0), MX, MY, { kind: 'pos', head: 9, w: 2.2 }));
      p.add('<circle class="mk-now" cx="' + r1(MX) + '" cy="' + r1(MY) + '" r="7.5"/>');
      p.add(arrow(MX, MY, MX + M.vx * kv * p.sx, MY - M.vy * kv * p.sy, { kind: 'vel', head: 9, w: 2.4, label: 'v', zero: true }));
      p.add(arrow(MX, MY, MX, MY + g * ka * p.sy, { kind: 'acc', head: 9, w: 2.4, label: 'a', lab: [8, -6], anchor: 'start' }));
      if (st.showR && (Math.abs(M.x) > 1.5 || Math.abs(M.y) > 1.5)) {
        var lx = p.X(M.x / 2), ly = p.Y(M.y / 2);
        p.add(label(lx + (M.y > 0.5 ? 6 : -4), ly + (M.y > 0.5 ? 14 : -6), 'OM', { kind: 'pos', arrow: true, fs: 15 }));
      }
      return p.svg({ cls: 'mk-plate', label: T('Plaque : tir à {v} avec un angle de {a}. Sommet à {ys} de haut, impact à {xp}.', { v: unit(st.v0, 0, MS), a: nf(st.al, 0) + '°', ys: unit(P.yS, 1, 'm'), xp: unit(P.xP, 1, 'm') }) });
    }
    function read() {
      var M = P.at(st.t);
      var line;
      if (Math.abs(M.vy) < 1e-6) line = T('Sommet : v⃗·a⃗ = 0, v⃗ ⊥ a⃗. Ni accéléré ni ralenti à cet instant : seule la direction de v⃗ change.');
      else if (M.vy > 0) line = T('Montée : v⃗·a⃗ < 0, le mouvement est <b>ralenti</b> (‖v⃗‖ diminue).');
      else line = T('Descente : v⃗·a⃗ > 0, le mouvement est <b>accéléré</b> (‖v⃗‖ augmente).');
      out.innerHTML =
        '<div class="ro-t"><var>t</var> = ' + unit(st.t, 2, 's') + '</div>' +
        '<div class="ro-grid">' +
          '<div class="ro k-pos"><b>' + T('Position') + '</b><span><var>x</var> = ' + unit(M.x, 1, 'm') + '</span><span><var>y</var> = ' + unit(M.y, 1, 'm') + '</span></div>' +
          '<div class="ro k-vel"><b>' + T('Vitesse') + '</b><span><var>v</var><sub><var>x</var></sub> = ' + unit(M.vx, 1, MS) + '</span><span><var>v</var><sub><var>y</var></sub> = ' + unit(M.vy, 1, MS) + '</span><span>‖' + VEC('v', 'kv') + '‖ = ' + unit(M.v, 1, MS) + '</span></div>' +
          '<div class="ro k-acc"><b>' + T('Accélération') + '</b><span><var>a</var><sub><var>x</var></sub> = 0</span><span><var>a</var><sub><var>y</var></sub> = ' + unit(-g, 0, MS2) + '</span></div>' +
        '</div>' +
        '<p class="ro-line">' + line + '</p>' +
        '<p class="ro-line muted">' + T('Sommet S : t<sub>S</sub> = {ts} · x<sub>S</sub> = {xs} · y<sub>S</sub> = {ys}. Impact P : t<sub>P</sub> = {tp} · portée x<sub>P</sub> = {xp}.',
          { ts: unit(P.tS, 2, 's'), xs: unit(P.xS, 1, 'm'), ys: unit(P.yS, 1, 'm'), tp: unit(P.tP, 2, 's'), xp: unit(P.xP, 1, 'm') }) + '</p>';
    }
    function paintCtl() {
      document.getElementById(id + 'vv').textContent = unit(st.v0, 0, MS);
      document.getElementById(id + 'av').textContent = nf(st.al, 0) + '°';
      document.getElementById(id + 'tv').textContent = unit(st.t, 2, 's');
    }
    function update(redrawOnly) {
      P = calc.projectile({ v0: st.v0, alpha: st.al, g: g });
      it.max = String(Math.floor(P.tP * 20) / 20);
      if (st.t > P.tP) st.t = P.tP;
      if (Math.abs(st.t - P.tS) < 0.026) st.t = P.tS; // le curseur « accroche » le sommet
      if (!redrawOnly) it.value = String(st.t);
      paintCtl(); read();
      if (view) view.redraw(); else view = mount(fig, draw);
    }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = 0; st.anim = false; }
    iv.addEventListener('input', function () { stop(); st.v0 = +iv.value; update(); });
    ia.addEventListener('input', function () { stop(); st.al = +ia.value; update(); });
    it.addEventListener('input', function () { stop(); st.t = +it.value; update(true); });
    U.$$('[data-tg]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = 'show' + b.getAttribute('data-tg'); st[k] = !st[k];
        b.setAttribute('aria-pressed', String(st[k])); update(true);
      });
    });
    el.querySelector('[data-go]').addEventListener('click', function () {
      stop();
      if (U.reduceMotion()) { st.t = P.tP; update(); return; }
      var t0 = null; st.anim = true; st.t = 0;
      function step(ts) {
        if (t0 === null) t0 = ts;
        st.t = Math.min(P.tP, (ts - t0) / 1000); // temps réel : 1 s du tir = 1 s à l'écran
        if (st.t >= P.tP) { st.anim = false; st.t = P.tP; update(); raf = 0; return; }
        update(); raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    });
    document.addEventListener('rev:theme', function () { if (view) view.redraw(); });
    update();
    return { state: st, set: function (v0, al, t) { stop(); st.v0 = v0; st.al = al; st.t = t || 0; iv.value = v0; ia.value = al; update(); } };
  }

  /* ------------------------------------------------------------------ trois courbes liées */
  function linked(el, o) {
    if (!el) return null;
    o = o || {};
    var Tm = o.T || 4, dt = o.dt || 0.5, id = 'lk' + (++uid);
    var presets = o.presets || [
      { name: T('Uniforme'), x0: 0, v0: 5, a: 0 },
      { name: T('Voiture du TD 1'), x0: 7, v0: 0, a: 2.5 },
      { name: T('Freinage'), x0: 0, v0: 10, a: -2.5 }
    ];
    var p0 = presets[o.start == null ? 1 : o.start];
    var st = { x0: p0.x0, v0: p0.v0, a: p0.a, t: Tm };
    el.classList.add('bench', 'lk');
    el.innerHTML =
      '<div class="bench-head"><span>' + T('Mouvement rectiligne : trois courbes liées') + '</span><span>' + T('Bande de poses (toutes les {dt}) et graphes x(t), v(t), a(t).', { dt: unit(dt, 1, 's') }) + '</span></div>' +
      '<div class="bench-body">' +
        '<div class="row lk-pre" role="group" aria-label="' + esc(T('Préréglages')) + '">' + presets.map(function (q, i) { return '<button type="button" class="chip-btn" data-p="' + i + '">' + esc(q.name) + '</button>'; }).join('') + '</div>' +
        '<div class="lk-figs"><div class="mk-host" data-f="s"></div><div class="mk-host" data-f="x"></div><div class="mk-host" data-f="v"></div><div class="mk-host" data-f="a"></div></div>' +
      '</div>' +
      '<div class="ctrls"><div class="sliders">' +
        slider(id + 'x', T('Position initiale') + ' <var>x</var><sub>0</sub>', -10, 10, 1, st.x0) +
        slider(id + 'v', T('Vitesse initiale') + ' <var>v</var><sub>0</sub>', -10, 10, 1, st.v0) +
        slider(id + 'a', T('Accélération (constante)') + ' <var>a</var>', -5, 5, 0.5, st.a) +
        slider(id + 't', T('Instant') + ' <var>t</var>', 0, Tm, 0.1, st.t) +
      '</div><div class="readout lk-read" aria-live="polite"></div></div>';
    var M, rng = {}, views = {};
    var ins = { x0: document.getElementById(id + 'x'), v0: document.getElementById(id + 'v'), a: document.getElementById(id + 'a'), t: document.getElementById(id + 't') };

    function ranges() {
      var xs = [], vs = [];
      for (var i = 0; i <= 40; i++) { var m = M.at(Tm * i / 40); xs.push(m.x); vs.push(m.v); }
      rng.x = calc.nice(Math.min(0, Math.min.apply(null, xs)), Math.max(0, Math.max.apply(null, xs)), 4);
      rng.v = calc.nice(Math.min(0, Math.min.apply(null, vs)), Math.max(0, Math.max.apply(null, vs)), 3);
      rng.a = calc.nice(Math.min(0, st.a, -1), Math.max(0, st.a, 1), 2);
    }
    function graph(w, key) {
      var r = rng[key], hh = { x: 150, v: 124, a: 104 }[key], kind = { x: 'pos', v: 'vel', a: 'acc' }[key];
      var p = plot({ x: [0, Tm], y: [r.lo, r.hi], w: w, h: hh, pad: [14, 16, 22, 44] });
      var f = function (t) { return M.at(t)[key]; };
      p.grid({ x: [0.5, 1], y: [r.step / 2, r.step] });
      if (key === 'v') p.area(f, 0, st.t, { cls: 'mk-area k-pos' });
      if (key === 'a') p.area(f, 0, st.t, { cls: 'mk-area k-vel' });
      p.axes({ x: { v: 't', u: 's' }, y: { v: key, u: { x: 'm', v: MS, a: MS2 }[key] }, tx: 0.5, lx: 1, ty: r.step, ly: r.step, at: [0, Math.min(Math.max(0, r.lo), r.hi)] });
      p.curve(f, { from: 0, to: Tm, cls: 'mk-curve k-' + kind });
      var m = M.at(st.t);
      p.line([st.t, r.lo], [st.t, r.hi], { cls: 'mk-cursor' });
      if (key === 'x') {
        var d = Math.min(0.9, Tm / 4);
        p.line([st.t - d, m.x - m.v * d], [st.t + d, m.x + m.v * d], { cls: 'mk-tan k-vel', clip: true });
        p.text([Math.min(st.t, Tm - 0.9), m.x], T('pente = v'), { cls: 'mk-note k-vel', dx: 8, dy: m.v >= 0 ? 16 : -10 });
      }
      if (key === 'v' && st.t > 0.6) p.text([st.t / 2, 0], T('aire = Δx'), { cls: 'mk-note k-pos', anchor: 'middle', dy: m.v + st.v0 >= 0 ? -6 : 14 });
      if (key === 'a' && st.t > 0.6 && Math.abs(st.a) > 1e-9) p.text([st.t / 2, 0], T('aire = Δv'), { cls: 'mk-note k-vel', anchor: 'middle', dy: st.a > 0 ? -6 : 14 });
      p.point([st.t, m[key]], { cls: 'mk-dot k-' + kind, r: 4 });
      return p.svg({ label: key + '(t)' });
    }
    function strip(w) {
      var r = rng.x, p = plot({ x: [r.lo, r.hi], y: [-1, 1], w: w, h: 62, pad: [10, 16, 20, 44] });
      p.add('<path class="mk-axis" d="M' + r1(p.X(r.lo)) + ' ' + r1(p.Y(-0.25)) + 'H' + r1(p.X(r.hi) - 2) + '"/><path class="mk-axhead" d="M' + r1(p.X(r.hi)) + ' ' + r1(p.Y(-0.25)) + 'l-8 -3.6v7.2z"/>');
      for (var v = r.lo; v <= r.hi + 1e-9; v += r.step) {
        var px = r1(p.X(v));
        p.add('<path class="mk-tick" d="M' + px + ' ' + r1(p.Y(-0.25) - 3) + 'V' + r1(p.Y(-0.25) + 3) + '"/><text class="mk-num" x="' + px + '" y="' + r1(p.Y(-0.25) + 16) + '" text-anchor="middle">' + nf(v, r.step < 1 ? 1 : 0) + '</text>');
      }
      p.add('<text class="mk-name" x="' + (p.pad[3] - 8) + '" y="' + r1(p.Y(-0.25) + 4) + '" text-anchor="end"><tspan class="mk-it">x</tspan> (m)</text>');
      var s = '';
      for (var k = 0; k * dt <= Tm + 1e-9; k++) s += '<circle class="mk-img" cx="' + r1(p.X(M.at(k * dt).x)) + '" cy="' + r1(p.Y(0.35)) + '" r="5"/>';
      p.add('<g class="mk-chrono light">' + s + '</g>');
      var m = M.at(st.t);
      p.add('<circle class="mk-now" cx="' + r1(p.X(m.x)) + '" cy="' + r1(p.Y(0.35)) + '" r="8"/>');
      return p.svg({ label: T('Bande de poses (toutes les {dt}) et graphes x(t), v(t), a(t).', { dt: unit(dt, 1, 's') }) });
    }
    function read() {
      var m = M.at(st.t), nat;
      if (Math.abs(st.a) < 1e-9) nat = Math.abs(m.v) < 1e-9 ? T('Immobile : v = 0 et a = 0.') : T('Mouvement <b>uniforme</b> : a = 0, v constante.');
      else if (Math.abs(m.v) < 1e-9) nat = T('Arrêt instantané : v = 0 mais a ≠ 0, le mobile repart en sens inverse.');
      else nat = m.v * st.a > 0 ? T('Mouvement <b>accéléré</b> : v et a de même signe.') : T('Mouvement <b>ralenti</b> : v et a de signes opposés.');
      el.querySelector('.lk-read').innerHTML =
        '<p>' + T('À t = {t} : x = {x} · v = {v} · a = {a}.', { t: unit(st.t, 1, 's'), x: unit(m.x, 2, 'm'), v: unit(m.v, 2, MS), a: unit(st.a, 1, MS2) }) + ' ' + nat + '</p>' +
        '<p class="muted">' + T('Pente de la tangente à x(t) : {v} = v(t). Aire sous v(t) de 0 à t : {dx} = x(t) − x(0). Aire sous a(t) : {dv} = v(t) − v(0).',
          { v: unit(m.v, 2, MS), dx: unit(m.x - st.x0, 2, 'm'), dv: unit(m.v - st.v0, 2, MS) }) + '</p>';
    }
    function paint() {
      M = calc.uva({ x0: st.x0, v0: st.v0, a: st.a });
      ranges();
      ['x0', 'v0', 'a', 't'].forEach(function (k) { ins[k].value = String(st[k]); });
      document.getElementById(id + 'xv').textContent = unit(st.x0, 0, 'm');
      document.getElementById(id + 'vv').textContent = unit(st.v0, 0, MS);
      document.getElementById(id + 'av').textContent = unit(st.a, 1, MS2);
      document.getElementById(id + 'tv').textContent = unit(st.t, 1, 's');
      U.$$('[data-p]', el).forEach(function (b) { var q = presets[+b.getAttribute('data-p')]; b.setAttribute('aria-pressed', String(q.x0 === st.x0 && q.v0 === st.v0 && q.a === st.a)); });
      read();
      ['s', 'x', 'v', 'a'].forEach(function (k) {
        var host = el.querySelector('[data-f="' + k + '"]');
        if (views[k]) views[k].redraw(); else views[k] = mount(host, function (w) { return k === 's' ? strip(w) : graph(w, k); });
      });
    }
    ['x0', 'v0', 'a', 't'].forEach(function (k) { ins[k].addEventListener('input', function () { st[k] = +ins[k].value; paint(); }); });
    U.$$('[data-p]', el).forEach(function (b) {
      b.addEventListener('click', function () { var q = presets[+b.getAttribute('data-p')]; st.x0 = q.x0; st.v0 = q.v0; st.a = q.a; paint(); });
    });
    paint();
    return { state: st };
  }

  R.meca = { plot: plot, mount: mount, label: label, arrow: arrow, frames: framesSVG, calc: calc, launcher: launcher, linked: linked };
})();
