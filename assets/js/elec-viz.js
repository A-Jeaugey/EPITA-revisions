/* Élec — deux visuels de cours, chargés après les scripts de la page et montés au DOMContentLoaded.
   - <div class="bench viz-kvl" data-viz="kvl-floors"></div> (chapitre 2, partie 3) : la grande maille du TD1 Ex 2
     (partiel nov. 2020, Ex 3) parcourue composant par composant ; un graphe dessine l'étage (potentiel) de chaque
     point. Chaque terme de la loi des mailles fait monter ou descendre, et le tour retombe au même étage.
   - <div class="bench viz-sup" data-viz="superposition"></div> (chapitre 3, partie 8) : le circuit du partiel
     nov. 2017 (Ex 4) = « E₁ seule » + « I₃ seule » ; les courants réels sont dessinés (bandes), la flèche I₁ de
     l'énoncé reste la même dans les trois schémas, et la somme des contributions retombe sur le courant du circuit
     complet (calculé à part, par Millman).
   Textes : REV.t() ; traductions anglaises déclarées ci-dessous. Calculs exposés dans REV.elecViz (tests node). */
(function () {
  'use strict';
  var R = window.REV;
  if (!R || !R.circuit) return;
  var U = R.util, t = R.t, nf = U.nf, esc = U.esc, NS = 'http://www.w3.org/2000/svg';

  R.i18n.add({
    /* loi des mailles */
    'La loi des mailles en étages': 'Kirchhoff’s voltage law, floor by floor',
    'TD1 · Ex 2 · partiel 2020': 'TD1 · Ex 2 · midterm 2020',
    'Grande maille du TD1 Ex 2 : de B à C par R₃, de C à D par R₄, de D à A par R₅, et la source E entre B et A, fléchée vers A': 'Outer loop of TD1 Ex 2: from B to C through R₃, from C to D through R₄, from D to A through R₅, and the source E between B and A, arrow pointing to A',
    'Étage (potentiel) de chaque point visité pendant le tour': 'Floor (potential) of each point visited along the loop',
    '◀ Pas précédent': '◀ Previous step',
    'Avancer d’un pas ▶': 'Step forward ▶',
    'Recommencer': 'Start over',
    'masse': 'ground',
    'même étage qu’au départ': 'same floor as the start',
    'Départ en B, à la masse : 0 V. On fait le tour B → A → D → C → B, dans le sens de la flèche violette.': 'Start at B, the ground: 0 V. You go around B → A → D → C → B, in the direction of the purple arrow.',
    'dans ton sens': 'in your direction',
    'contre toi': 'against you',
    'De {a} à {b} à travers {el}. La flèche {u} pointe vers {tip}, {sens} : tu écris <b>{term}</b>.': 'From {a} to {b} through {el}. The arrow {u} points to {tip}, {sens}: you write <b>{term}</b>.',
    'Tu montes de {d} V : {b} est à {v} V.': 'You go up {d} V: {b} is at {v} V.',
    'Tu descends de {d} V : {b} est à {v} V.': 'You go down {d} V: {b} is at {v} V.',
    'Mais {u} = {val} V est négative : le + vient de la flèche, la valeur fait descendre.': 'But {u} = {val} V is negative: the + comes from the arrow, the value takes you down.',
    'Pour retomber au même étage qu’au départ ({v0} V), il faut descendre de {d} V : <b>{u} = {val} V</b>.': 'To land back on the starting floor ({v0} V), you must go down {d} V: <b>{u} = {val} V</b>.',
    'Pour retomber au même étage qu’au départ ({v0} V), il faut monter de {d} V : <b>{u} = {val} V</b>.': 'To land back on the starting floor ({v0} V), you must go up {d} V: <b>{u} = {val} V</b>.',
    'retour en {b} : {terms} = {v0}, donc {u} = {val} V': 'back at {b}: {terms} = {v0}, so {u} = {val} V',
    'étape {k} / {n}': 'step {k} / {n}',
    /* superposition */
    'Superposition, signe compris': 'Superposition, signs included',
    'Partiel nov. 2017 · Ex 4': 'Midterm Nov. 2017 · Ex 4',
    'Les deux sources': 'Both sources',
    '{e} seule · {o} éteinte, trou': '{e} alone · {o} turned off, open',
    '{e} seule · {o} éteinte, fil': '{e} alone · {o} turned off, wire',
    'trou': 'open',
    'fil': 'wire',
    'Circuit complet : source E₁ à gauche, R₁ en haut avec la flèche I₁ vers A, R₃ entre A et B, source de courant I₃ vers A à droite, R₂ en bas': 'Full circuit: source E₁ on the left, R₁ at the top with the arrow I₁ toward A, R₃ between A and B, current source I₃ toward A on the right, R₂ at the bottom',
    'E₁ seule : la branche de I₃ est ouverte, il reste une seule maille': 'E₁ alone: the branch of I₃ is open, a single loop remains',
    'I₃ seule : E₁ est remplacée par un fil, R₁ + R₂ est en parallèle sur R₃': 'I₃ alone: E₁ is replaced by a wire, R₁ + R₂ is in parallel with R₃',
    'dans le sens de la flèche': 'in the direction of the arrow',
    'contre la flèche': 'against the arrow',
    'aucun courant': 'no current',
    'calcul direct (Millman en A)': 'direct calculation (Millman at A)',
    'une seule maille': 'a single loop',
    'diviseur de courant, contre la flèche': 'current divider, against the arrow',
    'Bande rouge pâle : le courant qui circule vraiment, d’autant plus large qu’il est fort. Flèche fine : la flèche de l’énoncé, la même dans les trois schémas.': 'Pale red band: the current that actually flows, wider when it is stronger. Thin arrow: the arrow of the problem statement, the same in all three diagrams.',
    'R₁ = 2 kΩ, R₂ = 1 kΩ, R₃ = 3 kΩ (V/kΩ = mA)': 'R₁ = 2 kΩ, R₂ = 1 kΩ, R₃ = 3 kΩ (V/kΩ = mA)',
    'C’est bien le courant du circuit complet ✓': 'This is exactly the current of the full circuit ✓',
    'Même chose dans R₃ : {a} + {b} = {c} mA.': 'Same in R₃: {a} + {b} = {c} mA.'
  });

  var reduce = U.reduceMotion();
  function r1(v) { return Math.round(v * 10) / 10; }
  function clean(x) { return Math.abs(x) < 1e-9 ? 0 : x; }
  /* nombre avec le vrai signe moins ; signé : +2 / −1 / 0 */
  function num(x, d) { x = clean(x); return x < 0 ? '−' + nf(-x, d) : nf(x, d); }
  function sgn(x, d) { x = clean(x); return x > 0 ? '+' + nf(x, d) : x < 0 ? '−' + nf(-x, d) : '0'; }
  function par(x, d) { x = clean(x); return x < 0 ? '(' + num(x, d) + ')' : num(x, d); }
  /* 'U_5' → U₅ en HTML ; cls = u (tension), i (courant) */
  function sym(s, cls) {
    var k = s.indexOf('_'), base = k < 0 ? s : s.slice(0, k), sub = k < 0 ? '' : s.slice(k + 1);
    var m = /^([A-Za-z]+)(.*)$/.exec(base) || [base, base, ''];
    return '<var' + (cls ? ' class="' + cls + '"' : '') + '>' + m[1] + '</var>' + m[2] + (sub ? '<sub>' + sub.replace(/[′″]/g, '') + '</sub>' + (sub.match(/[′″]/g) || []).join('') : '');
  }
  function poly(pts) { return 'M' + pts.map(function (p) { return r1(p[0]) + ' ' + r1(p[1]); }).join('L'); }
  function len(pts) { var s = 0; for (var i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return s; }
  function at(pts, d) {
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (d <= L || i === pts.length - 1) { var k = L ? Math.min(1, d / L) : 1; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; }
      d -= L;
    }
    return pts[pts.length - 1];
  }
  function tri(x, y, ux, uy, L, W, cls) {
    var bx = x - ux * L, by = y - uy * L, nx = -uy, ny = ux;
    return '<path class="' + cls + '" d="M' + r1(x) + ' ' + r1(y) + 'L' + r1(bx + nx * W) + ' ' + r1(by + ny * W) + 'L' + r1(bx - nx * W) + ' ' + r1(by - ny * W) + 'Z"/>';
  }
  /* flèche circulaire de sens de parcours (ccw : sens inverse des aiguilles d'une montre) */
  function turnArrow(cx, cy, r, ccw, cls) {
    var a = Math.PI / 6, s = ccw ? -1 : 1;
    var p1 = [cx - s * r * Math.sin(a), cy - r * Math.cos(a)], p2 = [cx + s * r * Math.sin(a), cy - r * Math.cos(a)];
    var v = ccw ? [-Math.cos(a), -Math.sin(a)] : [-Math.cos(a), Math.sin(a)];
    if (!ccw) v = [Math.cos(a), Math.sin(a)];
    return '<path class="' + cls + '" d="M' + r1(p1[0]) + ' ' + r1(p1[1]) + 'A' + r + ' ' + r + ' 0 1 ' + (ccw ? 0 : 1) + ' ' + r1(p2[0]) + ' ' + r1(p2[1]) + '"/>' +
      tri(p2[0] + v[0] * 4, p2[1] + v[1] * 4, v[0], v[1], 8, 4.2, cls + '-h');
  }

  /* =====================================================================================================
     1. Loi des mailles en étages — grande maille du TD1 Ex 2 (partiel nov. 2020, Ex 3)
     Données de l'énoncé : E = VA − VB = 240 V, U4 = VC − VD = −110 V, U5 = VA − VD = 46 V ; U3 = VC − VB inconnue.
     Une flèche de tension pointe vers le point écrit en premier : U = V(pointe) − V(queue).
     ===================================================================================================== */
  var KVL = {
    start: 0,
    pts: ['B', 'A', 'D', 'C', 'B'],
    steps: [
      { el: 'E', u: 'E', val: 240, tip: 'A' },
      { el: 'R5', u: 'U_5', val: 46, tip: 'A' },
      { el: 'R4', u: 'U_4', val: -110, tip: 'C' },
      { el: 'R3', u: 'U_3', val: null, tip: 'C' } /* inconnue : le tour doit se refermer */
    ]
  };
  /* potentiel de chaque point visité ; terme + si la flèche pointe vers le point d'arrivée, − sinon */
  function kvlSolve(m) {
    var V = [m.start], rows = [];
    m.steps.forEach(function (s, i) {
      var b = m.pts[i + 1], sign = s.tip === b ? 1 : -1, val = s.val, unknown = val == null;
      if (unknown) val = sign * (m.start - V[i]);
      var d = sign * val;
      V.push(V[i] + d);
      rows.push({ a: m.pts[i], b: b, sign: sign, val: val, d: d, unknown: unknown, el: s.el, u: s.u, tip: s.tip });
    });
    return { V: V, rows: rows };
  }

  var KX = { B: [40, 72], C: [167, 72], D: [293, 72], A: [420, 72] };
  var KPATH = [[[40, 72], [40, 176], [420, 176], [420, 72]], [[420, 72], [293, 72]], [[293, 72], [167, 72]], [[167, 72], [40, 72]]];

  function kvlCircuit(sol, k) {
    var hl = k > 0 ? sol.rows[k - 1].el : '', under = [], i;
    function c(id) { return id === hl ? 'cz-hl' : ''; }
    for (i = 0; i < k; i++) under.push({ t: 'raw', svg: '<path class="vk-trail' + (i === k - 1 ? ' on' : '') + '" d="' + poly(KPATH[i]) + '"/>' });
    var lab = {};
    sol.rows.forEach(function (r) { lab[r.u] = r.u + (r.unknown && k < sol.rows.length ? '' : ' = ' + num(r.val) + ' V'); });
    return { w: 460, h: 200, aria: t('Grande maille du TD1 Ex 2 : de B à C par R₃, de C à D par R₄, de D à A par R₅, et la source E entre B et A, fléchée vers A'),
      under: under, wires: ['M40 72H420V176H40Z'],
      parts: [
        { t: 'R', x: 103, y: 72, l: 'R_3', lp: 's', c: c('R3') },
        { t: 'R', x: 230, y: 72, l: 'R_4', lp: 's', c: c('R4') },
        { t: 'R', x: 357, y: 72, l: 'R_5', lp: 's', c: c('R5') },
        { t: 'E', x: 230, y: 176, d: 'h', p: 'e', l: lab.E, as: 'n', c: c('E') },
        { t: 'U', a: [80, 46], b: [126, 46], l: lab.U_3 },
        { t: 'U', a: [253, 46], b: [207, 46], l: lab.U_4 },
        { t: 'U', a: [334, 46], b: [380, 46], l: lab.U_5 },
        { t: 'raw', svg: turnArrow(110, 132, 16, true, 'vk-turn') },
        { t: 'dot', x: 167, y: 72, r: 3.5 }, { t: 'dot', x: 293, y: 72, r: 3.5 }, { t: 'dot', x: 40, y: 72, r: 3.5 }, { t: 'dot', x: 420, y: 72, r: 3.5 },
        { t: 'txt', x: 30, y: 66, s: 'B', c: 'cz-n', a: 'end' }, { t: 'txt', x: 432, y: 66, s: 'A', c: 'cz-n', a: 'start' },
        { t: 'txt', x: 167, y: 98, s: 'C', c: 'cz-n' }, { t: 'txt', x: 293, y: 98, s: 'D', c: 'cz-n' }] };
  }

  function kvlChart(sol, k, fresh) {
    var X = [50, 120, 190, 260, 330], H = 18, n = sol.rows.length;
    var top = Math.max.apply(null, sol.V), bot = Math.min.apply(null, sol.V);
    function y(v) { return 222 - (v - bot) * 160 / ((top - bot) || 1); }
    var s = '<svg class="cz vk-chart" viewBox="0 0 360 262" role="img" aria-label="' + esc(t('Étage (potentiel) de chaque point visité pendant le tour')) + '">', i, seen = {};
    for (i = 0; i <= k; i++) {
      var v = sol.V[i]; if (seen[v]) continue; seen[v] = 1;
      s += '<path class="vk-floor' + (k === n && v === sol.V[0] ? ' ok' : '') + '" d="M24 ' + r1(y(v)) + 'H352"/>';
    }
    for (i = 0; i < k; i++) {
      var r = sol.rows[i], xr = (X[i] + X[i + 1]) / 2, y0 = y(sol.V[i]), y1 = y(sol.V[i + 1]), dir = y1 < y0 ? -1 : 1;
      var cls = 'vk-rise' + (i === k - 1 ? ' on' : '') + (fresh && i === k - 1 ? ' vk-new' : '');
      if (Math.abs(y1 - y0) > 1) s += '<g class="' + cls + '"><path d="M' + xr + ' ' + r1(y0) + 'V' + r1(y1 - dir * 7) + '"/>' + tri(xr, y1, 0, dir, 9, 4.6, 'vk-rise-h') + '</g>';
      var neg = r.d * r.sign < 0;
      s += '<text class="vk-term" x="' + xr + '" y="18" text-anchor="middle">' + (r.sign > 0 ? '+' : '−') + R.circuit.label(r.u) + '</text>';
      s += '<text class="vk-dv' + (neg ? ' neg' : '') + '" x="' + xr + '" y="36" text-anchor="middle">' + sgn(r.d) + ' V</text>';
    }
    for (i = 0; i <= k; i++) {
      var yy = r1(y(sol.V[i]));
      s += '<path class="vk-land' + (i === k ? ' on' : '') + '" d="M' + (X[i] - H) + ' ' + yy + 'H' + (X[i] + H) + '"/>';
      s += '<text class="vk-pv" x="' + X[i] + '" y="' + r1(yy - 8) + '" text-anchor="middle">' + num(sol.V[i]) + ' V</text>';
    }
    for (i = 0; i < sol.V.length; i++) s += '<text class="vk-st' + (i <= k ? '' : ' off') + '" x="' + X[i] + '" y="250" text-anchor="middle">' + sol.rows.concat([{ b: sol.rows[n - 1].b }])[i].a.replace(/^$/, '') + '</text>';
    s += '<text class="vk-gnd" x="24" y="' + r1(y(sol.V[0]) + 14) + '">' + esc(t('masse')) + '</text>';
    s += '<circle class="vk-me" cx="' + X[k] + '" cy="' + r1(y(sol.V[k])) + '" r="6"/>';
    if (k === n && sol.V[n] === sol.V[0]) s += '<text class="vk-ok" x="190" y="' + r1(y(sol.V[0]) - 10) + '" text-anchor="middle">' + esc(t('même étage qu’au départ')) + ' ✓</text>';
    return s + '</svg>';
  }

  function kvlText(sol, k) {
    var n = sol.rows.length, eq, note;
    function term(r, first) { return (first && r.sign > 0 ? '' : r.sign > 0 ? ' + ' : (first ? '−' : ' − ')) + sym(r.u, 'u'); }
    function numTerm(r, first) { return r.unknown ? (r.sign > 0 ? ' + ' : ' − ') + sym(r.u, 'u') : (first ? (r.sign > 0 ? '' : '−') + par(r.val) : (r.sign > 0 ? ' + ' : ' − ') + par(r.val)); }
    var V = function (p) { return sym('V_' + p, 'v'); };
    if (k === 0) {
      eq = V(sol.rows[0].a) + ' = ' + num(sol.V[0]) + ' V (' + t('masse') + ')';
      note = t('Départ en B, à la masse : 0 V. On fait le tour B → A → D → C → B, dans le sens de la flèche violette.');
    } else {
      var rows = sol.rows.slice(0, k), r = rows[k - 1];
      var terms = rows.map(function (x, i) { return term(x, i === 0); }).join('');
      var nums = rows.map(function (x, i) { return numTerm(x, i === 0); }).join('');
      if (r.unknown) {
        eq = t('retour en {b} : {terms} = {v0}, donc {u} = {val} V', { b: r.b, terms: terms, v0: num(sol.V[0]), u: sym(r.u, 'u'), val: num(r.val) });
      } else {
        eq = V(r.b) + ' = ' + (sol.V[0] ? num(sol.V[0]) + ' + ' : '') + terms + ' = ' + nums + ' = ' + num(sol.V[k]) + ' V';
      }
      var el = r.el === 'E' ? sym('E', 'u') : sym('R_' + r.el.slice(1));
      note = t('De {a} à {b} à travers {el}. La flèche {u} pointe vers {tip}, {sens} : tu écris <b>{term}</b>.', {
        a: r.a, b: r.b, el: el, u: sym(r.u, 'u'), tip: r.tip, sens: t(r.sign > 0 ? 'dans ton sens' : 'contre toi'), term: (r.sign > 0 ? '+' : '−') + sym(r.u, 'u') });
      if (r.unknown) note += ' ' + t(r.d < 0 ? 'Pour retomber au même étage qu’au départ ({v0} V), il faut descendre de {d} V : <b>{u} = {val} V</b>.' : 'Pour retomber au même étage qu’au départ ({v0} V), il faut monter de {d} V : <b>{u} = {val} V</b>.', { v0: num(sol.V[0]), d: nf(Math.abs(r.d)), u: sym(r.u, 'u'), val: num(r.val) });
      else {
        if (r.d * r.sign < 0) note += ' ' + t('Mais {u} = {val} V est négative : le + vient de la flèche, la valeur fait descendre.', { u: sym(r.u, 'u'), val: num(r.val) });
        note += ' ' + t(r.d >= 0 ? 'Tu montes de {d} V : {b} est à {v} V.' : 'Tu descends de {d} V : {b} est à {v} V.', { d: nf(Math.abs(r.d)), b: r.b, v: num(sol.V[k]) });
      }
    }
    return { eq: eq, note: note };
  }

  function mountKvl(host) {
    var sol = kvlSolve(KVL), n = sol.rows.length, k = 0, raf = 0, saved = null;
    host.innerHTML =
      '<div class="bench-head"><span>' + t('La loi des mailles en étages') + '</span><span class="td">' + t('TD1 · Ex 2 · partiel 2020') + '</span></div>' +
      '<div class="vk-figs"><div class="fig vk-circ"></div><div class="fig vk-plot"></div></div>' +
      '<div class="viz-read readout" aria-live="polite"><div class="vk-eq f-inline"></div><div class="vk-note"></div></div>' +
      '<div class="ctrls"><div class="viz-nav"><button class="btn" type="button" data-k="prev">' + t('◀ Pas précédent') + '</button>' +
      '<button class="btn primary" type="button" data-k="next">' + t('Avancer d’un pas ▶') + '</button>' +
      '<button class="btn" type="button" data-k="reset">' + t('Recommencer') + '</button><span class="mono viz-count"></span></div></div>';
    var circ = host.querySelector('.vk-circ'), plot = host.querySelector('.vk-plot');
    var bPrev = host.querySelector('[data-k=prev]'), bNext = host.querySelector('[data-k=next]'), bReset = host.querySelector('[data-k=reset]');
    function station(i) { return KX[sol.rows.concat([{ a: sol.rows[n - 1].b }])[i].a]; }
    function render(animate) {
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      circ.innerHTML = R.circuit(kvlCircuit(sol, k));
      var svg = circ.querySelector('svg'), dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('class', 'vk-walker'); dot.setAttribute('r', '8');
      svg.appendChild(dot);
      var end = station(k);
      function put(p) { dot.setAttribute('cx', r1(p[0])); dot.setAttribute('cy', r1(p[1])); }
      if (animate && !reduce && k > 0) {
        var path = KPATH[k - 1], L = len(path), dur = Math.min(1100, 300 + L * 1.4), t0 = null;
        put(path[0]);
        var f = function (ts) {
          if (t0 === null) t0 = ts;
          var q = Math.min(1, (ts - t0) / dur), e = q < .5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
          put(at(path, e * L));
          raf = q < 1 ? requestAnimationFrame(f) : 0;
        };
        raf = requestAnimationFrame(f);
      } else put(end);
      plot.innerHTML = kvlChart(sol, k, animate && !reduce);
      var tx = kvlText(sol, k);
      host.querySelector('.vk-eq').innerHTML = tx.eq;
      host.querySelector('.vk-note').innerHTML = tx.note;
      host.querySelector('.viz-count').textContent = t('étape {k} / {n}', { k: k, n: n });
      bPrev.disabled = k === 0; bNext.disabled = k === n;
    }
    bNext.addEventListener('click', function () { if (k < n) { k++; render(true); } });
    bPrev.addEventListener('click', function () { if (k > 0) { k--; render(false); } });
    bReset.addEventListener('click', function () { k = 0; render(false); });
    /* impression : état final, sans animation */
    window.addEventListener('beforeprint', function () { saved = k; k = n; render(false); });
    window.addEventListener('afterprint', function () { if (saved !== null) { k = saved; saved = null; render(false); } });
    render(false);
  }

  /* =====================================================================================================
     2. Superposition — partiel nov. 2017, Ex 4 (corrigé officiel : I1 = (E1 − R3·I3)/(R1 + R2 + R3))
     Masse en B. Courant de la branche gauche I1 (flèche vers A dans R1), de R3 (de A vers B), de la source (vers A).
     Unités : kΩ, V, mA.
     ===================================================================================================== */
  var SR = { R1: 2, R2: 1, R3: 3 }, IMAX = 6;
  /* résolution directe (Millman en A), une source éteinte vaut 0 */
  function supSolve(E1, I3, eOn, iOn, r) {
    r = r || SR;
    var Rl = r.R1 + r.R2, e = eOn ? E1 : 0, j = iOn ? I3 : 0;
    var VA = (e / Rl + j) / (1 / Rl + 1 / r.R3);
    return { I1: (e - VA) / Rl, IR3: VA / r.R3, IJ: j, VA: VA };
  }
  /* formules de superposition du corrigé */
  function supFormulas(E1, I3, r) {
    r = r || SR;
    var S = r.R1 + r.R2 + r.R3;
    return { I1p: E1 / S, I1pp: -r.R3 * I3 / S, I1: (E1 - r.R3 * I3) / S };
  }
  var FL = { L: [[200, 180], [40, 180], [40, 40], [200, 40]], R3: [[200, 40], [200, 180]], J: [[200, 180], [270, 180], [270, 40], [200, 40]] };
  function flow(pts, I) {
    if (Math.abs(I) < 1e-9) return '';
    if (I < 0) pts = pts.slice().reverse();
    var w = 3 + 11 * Math.min(1, Math.abs(I) / IMAX), s = '<path class="vs-flow" style="stroke-width:' + r1(w) + 'px" d="' + poly(pts) + '"/>';
    var step = 44, pos = 24;
    for (var i = 1; i < pts.length; i++) {
      var a = pts[i - 1], b = pts[i], L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
      while (pos <= L - 6) { s += tri(a[0] + ux * (pos + 4), a[1] + uy * (pos + 4), ux, uy, 8, 4.5, 'vs-chev'); pos += step; }
      pos = Math.max(6, pos - L);
    }
    return s;
  }
  function supSpec(st, cur) {
    var mark = st === 'all' ? 'I_1' : st === 'E' ? 'I_1′' : 'I_1″';
    var wires = ['M40 40H200', 'M40 180H200', 'M200 40V180'];
    var parts = [{ t: 'R', x: 100, y: 40, l: 'R_1', lp: 's' }, { t: 'R', x: 100, y: 180, l: 'R_2', lp: 'n' }, { t: 'R', x: 200, y: 110, d: 'v', l: 'R_3', lp: 'w' },
      { t: 'I', x: 152, y: 40, d: 'e', l: mark }];
    if (st !== 'I') { wires.push('M40 40V180'); parts.push({ t: 'E', x: 40, y: 110, d: 'v', p: 'n', l: 'E_1', as: 'e' }); }
    else { wires.push({ d: 'M40 40V180', c: 'cz-hl' }); parts.push({ t: 'txt', x: 50, y: 114, s: t('fil'), c: 'cz-tiny', a: 'start' }); }
    if (st !== 'E') { wires.push('M200 40H270V180H200'); parts.push({ t: 'J', x: 270, y: 110, d: 'v', to: 'n', l: 'I_3', as: 'w' }); }
    else {
      wires.push('M200 40H270V96', 'M270 124V180H200');
      parts.push({ t: 'term', x: 270, y: 100 }, { t: 'term', x: 270, y: 120 }, { t: 'txt', x: 258, y: 114, s: t('trou'), c: 'cz-tiny', a: 'end' });
    }
    parts.push({ t: 'dot', x: 200, y: 40 }, { t: 'dot', x: 200, y: 180 }, { t: 'txt', x: 208, y: 30, s: 'A', c: 'cz-n', a: 'start' }, { t: 'txt', x: 208, y: 202, s: 'B', c: 'cz-n', a: 'start' });
    var aria = st === 'all' ? t('Circuit complet : source E₁ à gauche, R₁ en haut avec la flèche I₁ vers A, R₃ entre A et B, source de courant I₃ vers A à droite, R₂ en bas')
      : st === 'E' ? t('E₁ seule : la branche de I₃ est ouverte, il reste une seule maille') : t('I₃ seule : E₁ est remplacée par un fil, R₁ + R₂ est en parallèle sur R₃');
    return { w: 300, h: 214, aria: aria, wires: wires, parts: parts,
      under: [{ t: 'raw', svg: flow(FL.L, cur.I1) + flow(FL.R3, cur.IR3) + flow(FL.J, cur.IJ) }] };
  }

  function mountSup(host) {
    var E1 = 12, I3 = 2;
    var I1s = sym('I_1', 'i'), I1p = sym('I_1′', 'i'), I1pp = sym('I_1″', 'i'), E1s = sym('E_1', 'u'), I3s = sym('I_3', 'i');
    host.innerHTML =
      '<div class="bench-head"><span>' + t('Superposition, signe compris') + '</span><span class="td x">' + t('Partiel nov. 2017 · Ex 4') + '</span></div>' +
      '<div class="vs-row">' +
      '<figure class="vs-panel" data-st="all"><figcaption class="vs-cap">' + t('Les deux sources') + '</figcaption><div class="vs-svg"></div><div class="vs-val"></div><div class="vs-how"></div></figure>' +
      '<div class="vs-op" aria-hidden="true">=</div>' +
      '<figure class="vs-panel" data-st="E"><figcaption class="vs-cap">' + t('{e} seule · {o} éteinte, trou', { e: E1s, o: I3s }) + '</figcaption><div class="vs-svg"></div><div class="vs-val"></div><div class="vs-how"></div></figure>' +
      '<div class="vs-op" aria-hidden="true">+</div>' +
      '<figure class="vs-panel" data-st="I"><figcaption class="vs-cap">' + t('{e} seule · {o} éteinte, fil', { e: I3s, o: E1s }) + '</figcaption><div class="vs-svg"></div><div class="vs-val"></div><div class="vs-how"></div></figure>' +
      '</div>' +
      '<p class="vs-key"><span class="vs-swatch" aria-hidden="true"></span>' + t('Bande rouge pâle : le courant qui circule vraiment, d’autant plus large qu’il est fort. Flèche fine : la flèche de l’énoncé, la même dans les trois schémas.') + '</p>' +
      '<div class="viz-read readout" aria-live="polite"></div>' +
      '<div class="ctrls"><div class="grid2">' +
      '<div class="slider"><label for="vsE">' + E1s + '</label><output id="vsEv" for="vsE"></output><input id="vsE" type="range" min="0" max="18" step="3" value="' + E1 + '"></div>' +
      '<div class="slider"><label for="vsI">' + I3s + '</label><output id="vsIv" for="vsI"></output><input id="vsI" type="range" min="0" max="6" step="1" value="' + I3 + '"></div>' +
      '</div><p class="vs-vals">' + t('R₁ = 2 kΩ, R₂ = 1 kΩ, R₃ = 3 kΩ (V/kΩ = mA)') + '</p></div>';
    var S = SR.R1 + SR.R2 + SR.R3;
    function sense(x) { x = clean(x); return x > 0 ? '<span class="vs-tag ok">' + t('dans le sens de la flèche') + '</span>' : x < 0 ? '<span class="vs-tag no">' + t('contre la flèche') + '</span>' : '<span class="vs-tag">' + t('aucun courant') + '</span>'; }
    function render() {
      E1 = +host.querySelector('#vsE').value; I3 = +host.querySelector('#vsI').value;
      host.querySelector('#vsEv').textContent = E1 + ' V'; host.querySelector('#vsIv').textContent = I3 + ' mA';
      var full = supSolve(E1, I3, true, true), a = supSolve(E1, I3, true, false), b = supSolve(E1, I3, false, true);
      var P = {
        all: { cur: full, name: I1s, how: t('calcul direct (Millman en A)') },
        E: { cur: a, name: I1p, how: t('une seule maille') + ' : ' + E1s + '/(' + sym('R_1') + ' + ' + sym('R_2') + ' + ' + sym('R_3') + ') = ' + E1 + '/' + S },
        I: { cur: b, name: I1pp, how: t('diviseur de courant, contre la flèche') + ' : −' + sym('R_3') + I3s + '/(' + sym('R_1') + ' + ' + sym('R_2') + ' + ' + sym('R_3') + ') = −' + SR.R3 + ' × ' + I3 + '/' + S }
      };
      U.$$('.vs-panel', host).forEach(function (fig) {
        var p = P[fig.getAttribute('data-st')];
        fig.querySelector('.vs-svg').innerHTML = R.circuit(supSpec(fig.getAttribute('data-st'), p.cur));
        fig.querySelector('.vs-val').innerHTML = '<span class="f-inline">' + p.name + ' = ' + sgn(p.cur.I1) + ' mA</span>' + sense(p.cur.I1);
        fig.querySelector('.vs-how').innerHTML = p.how;
      });
      host.querySelector('.viz-read').innerHTML =
        '<div class="f-inline">' + I1p + ' + ' + I1pp + ' = ' + par(a.I1) + ' + ' + par(b.I1) + ' = <span class="big">' + num(a.I1 + b.I1) + ' mA</span> = ' + I1s + '</div>' +
        '<div>' + t('C’est bien le courant du circuit complet ✓') + ' <span class="muted">' + t('Même chose dans R₃ : {a} + {b} = {c} mA.', { a: num(a.IR3), b: num(b.IR3), c: num(full.IR3) }) + '</span></div>';
    }
    host.querySelector('#vsE').addEventListener('input', render);
    host.querySelector('#vsI').addEventListener('input', render);
    render();
  }

  var MOUNT = { 'kvl-floors': mountKvl, superposition: mountSup };
  function init() { U.$$('[data-viz]').forEach(function (el) { var f = MOUNT[el.getAttribute('data-viz')]; if (f && !el.hasAttribute('data-viz-on')) { el.setAttribute('data-viz-on', ''); f(el); } }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  R.elecViz = { KVL: KVL, kvlSolve: kvlSolve, kvlText: kvlText, SR: SR, supSolve: supSolve, supFormulas: supFormulas };
})();
