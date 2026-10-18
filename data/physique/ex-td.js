/* Physique — exercices des TD 1 à 5 (Moodle 2026-27 : cinématique cartésienne, équilibre et 2e loi de Newton,
   dynamique, étude énergétique, cinématique polaire). Une fiche par exercice, kind 'td', ids td<N>-ex<M>.
   Les anciens partiels ne portent que sur la cinématique : pour les forces, la 2e loi de Newton et l’énergie,
   ces fiches sont le seul entraînement.
   - Énoncés verbatim (TD FR/02 à 06), décimales à virgule ; figures redessinées en SVG (à l’échelle quand c’est
     possible), les mots des légendes vont dans cap (traduits par data/en/physique/ex-td.js).
   - TD 1 à 3 : corrigés officiels (Corrections TD/11-13) suivis ; leurs erreurs sont signalées dans la fiche
     (<p class="sol-note">) et official vaut false quand une réponse finale diffère du corrigé.
   - TD 4 et 5 : pas de corrigé officiel, corrections rédigées et vérifiées (valeurs recalculées sous node).
   - Énoncés incohérents : TD 4 Ex 3 (le robot n’atteint jamais C ; partie 3 traitée avec vC = 0) et TD 5 Ex 2 Q6
     (facteur ω oublié dans v) : dit dans la fiche, avec la lecture retenue.
   Notation dans les chaînes (convertie par fmt au chargement) : @v, @OM → vecteur (couleur du cours : position,
   vitesse, accélération, force), @{AB} pour un nom de deux lettres, @u_x → u⃗ indice x, @0 → vecteur nul ;
   $x, $v_0, $v_{sol} → variable en italique avec indice. Les figures sont exposées dans window.PHYS_TD_FIG
   (avec fmt) pour le fichier anglais : PHYS_TD_FIG.<figure>({ en: true }). */
(function () {
  'use strict';
  var X = window.PHYS_EX = window.PHYS_EX || [];

  /* ---------- notation ---------- */
  var VEC_K = { OM: 'kp', v: 'kv', a: 'ka', P: 'kf', R: 'kf', f: 'kf', F: 'kf', T: 'kf', W: 'kf' };
  function subH(s) { return /^(x|y|z|r|θ)$/.test(s) ? '<var>' + s + '</var>' : s; }
  function M(s) {
    return String(s)
      .replace(/@(\{[A-Za-z’']+\}|[A-Za-z0])(?:_\{([^}]*)\}|_([A-Za-z0-9θ]+))?/g, function (_, b, s1, s2) {
        b = b.replace(/[{}]/g, ''); var sub = s1 != null ? s1 : s2, k = VEC_K[b];
        return '<var class="vec' + (b === '0' ? ' up' : k ? ' ' + k : '') + '">' + b + '</var>' + (sub ? '<sub>' + subH(sub) + '</sub>' : '');
      })
      .replace(/\$([A-Za-zα-ω])([̀-ͯ]*)(?:_\{([^}]*)\}|_([A-Za-z0-9θ]+))?/g, function (_, b, c, s1, s2) {
        var sub = s1 != null ? s1 : s2;
        return '<var>' + b + c + '</var>' + (sub ? '<sub>' + subH(sub) + '</sub>' : '');
      });
  }
  /* applique M à toutes les chaînes d’un objet, sauf aux figures SVG */
  function fmt(o) {
    if (typeof o === 'string') return M(o);
    if (Array.isArray(o)) return o.map(fmt);
    if (o && typeof o === 'object') { var r = {}; Object.keys(o).forEach(function (k) { r[k] = k === 'svg' ? o[k] : fmt(o[k]); }); return r; }
    return o;
  }
  /* dérivées pointées (lettre + diacritique combinant) */
  var thd = '<var>θ̇</var>', thdd = '<var>θ̈</var>', rd = '<var>ṙ</var>', rdd = '<var>r̈</var>';
  function eq() { return '<div class="eq">' + Array.prototype.map.call(arguments, function (l) { return '<span class="nw">' + l + '</span>'; }).join('') + '</div>'; }
  function fr(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function col(a, b) { return '<span class="col"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function sq(x) { return '<span class="sqrt">√<span>' + x + '</span></span>'; }
  function fig(svg, cap) { return '<figure class="fig"><div style="padding:8px 10px">' + svg + '</div>' + (cap ? '<figcaption>' + cap + '</figcaption>' : '') + '</figure>'; }
  function tbl(head, rows) {
    return '<div class="tbl"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return i ? '<td>' + c + '</td>' : '<th>' + c + '</th>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  var NOTE = 'Pas de corrigé officiel (le Moodle n’en donne que pour les TD 1 à 3) : correction rédigée et vérifiée.';

  /* ---------- dessin SVG (couleurs du cours, lisibles en clair et en sombre) ---------- */
  var C = { ink: 'currentColor', mut: 'var(--muted,#5B6072)', frc: 'var(--frc,#7A3EC4)', pos: 'var(--pos,#1F5CCB)', vel: 'var(--vel,#08714F)',
    acc: 'var(--acc,#C21D4A)', key: 'var(--accent,#9A4B00)', grid: 'var(--line,#DDD5C3)' };
  var RAD = Math.PI / 180;
  function n1(x) { return Math.round(x * 10) / 10; }
  function svg(w, h, label, body, maxw) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + label + '" style="display:block;width:100%;max-width:' + (maxw || w + 60) + 'px;height:auto;margin:0 auto" fill="none">' + body + '</svg>';
  }
  function L(x1, y1, x2, y2, c, w, dash) {
    return '<line x1="' + n1(x1) + '" y1="' + n1(y1) + '" x2="' + n1(x2) + '" y2="' + n1(y2) + '" style="stroke:' + (c || C.ink) + ';stroke-width:' + (w || 1.3) + (dash ? ';stroke-dasharray:' + dash : '') + ';stroke-linecap:round"/>';
  }
  function P(d, c, w, dash) { return '<path d="' + d + '" style="fill:none;stroke:' + (c || C.ink) + ';stroke-width:' + (w || 1.4) + (dash ? ';stroke-dasharray:' + dash : '') + ';stroke-linejoin:round;stroke-linecap:round"/>'; }
  /* flèche pleine de (x1, y1) à (x2, y2) */
  function A(x1, y1, x2, y2, c, o) {
    o = o || {}; c = c || C.ink;
    var w = o.w || 2.2, hs = o.hs || 9, dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy), ux = dx / len, uy = dy / len;
    var bx = x2 - ux * hs, by = y2 - uy * hs, px = -uy * hs * 0.42, py = ux * hs * 0.42;
    return L(x1, y1, bx + ux, by + uy, c, w, o.dash) + '<path d="M' + n1(x2) + ' ' + n1(y2) + 'L' + n1(bx + px) + ' ' + n1(by + py) + 'L' + n1(bx - px) + ' ' + n1(by - py) + 'Z" style="fill:' + c + '"/>';
  }
  /* cote à deux flèches */
  function DIM(x1, y1, x2, y2, c) { var mx = (x1 + x2) / 2, my = (y1 + y2) / 2, o = { w: 1.1, hs: 7 }; return A(mx, my, x1, y1, c || C.mut, o) + A(mx, my, x2, y2, c || C.mut, o); }
  function T(x, y, s, o) {
    o = o || {};
    return '<text x="' + n1(x) + '" y="' + n1(y) + '" text-anchor="' + (o.a || 'middle') + '" style="fill:' + (o.c || C.ink) + ';font-size:' + (o.fs || 14) + 'px;font-family:var(--font-body,sans-serif)">' + s + '</text>';
  }
  /* symbole en italique : vec (flèche au-dessus), sub (indice), subUp (indice droit) */
  function Y(x, y, s, o) {
    o = o || {}; var fs = o.fs || 16, c = o.c || C.ink, a = o.a || 'middle', sfs = Math.round(fs * 0.7);
    var sub = o.sub ? '<tspan style="font-size:' + sfs + 'px' + (o.subUp ? ';font-style:normal' : '') + '" dy="' + Math.round(fs * 0.3) + '">' + o.sub + '</tspan>' : '';
    var t = '<text x="' + n1(x) + '" y="' + n1(y) + '" text-anchor="' + a + '" style="fill:' + c + ';font-size:' + fs + 'px;font-family:var(--font-math,serif);font-style:italic">' + s + sub + '</text>';
    if (!o.vec) return t;
    var wm = s.length * fs * 0.56, wt = wm + (o.sub ? o.sub.length * sfs * 0.52 : 0);
    var x0 = (a === 'start' ? x : a === 'end' ? x - wt : x - wt / 2) + fs * 0.12, yy = y - fs * 0.88, x1 = x0 + wm;
    return t + L(x0, yy, x1 - 2, yy, c, 1.1) + '<path d="M' + n1(x1 + 1) + ' ' + n1(yy) + 'l-4.5 -2.6v5.2z" style="fill:' + c + '"/>';
  }
  /* arc d’angle, angles en degrés comptés dans le sens direct (y vers le haut) */
  function ARC(cx, cy, r, a1, a2, c) {
    var x1 = cx + r * Math.cos(a1 * RAD), y1 = cy - r * Math.sin(a1 * RAD), x2 = cx + r * Math.cos(a2 * RAD), y2 = cy - r * Math.sin(a2 * RAD);
    return P('M' + n1(x1) + ' ' + n1(y1) + 'A' + r + ' ' + r + ' 0 ' + (a2 - a1 > 180 ? 1 : 0) + ' 0 ' + n1(x2) + ' ' + n1(y2), c || C.ink, 1.2);
  }
  function DOT(x, y, r, c) { return '<circle cx="' + n1(x) + '" cy="' + n1(y) + '" r="' + (r || 3) + '" style="fill:' + (c || C.ink) + '"/>'; }
  function CROSS(x, y, s, c) { s = s || 4.5; return L(x - s, y - s, x + s, y + s, c || C.key, 1.6) + L(x - s, y + s, x + s, y - s, c || C.key, 1.6); }
  function HATCH(x1, x2, y) { var s = ''; for (var x = x1 + 8; x <= x2; x += 11) s += L(x, y, x - 7, y + 7, C.mut, 1); return s; }
  function WAVE(x1, x2, y) { var d = 'M' + x1 + ' ' + y; for (var x = x1; x < x2; x += 20) d += 'q5 -4 10 0t10 0'; return P(d, C.mut, 1.3); }
  function AXES(ox, oy, x2, y2) { var o = { w: 1.2, hs: 7 }; return A(ox, oy, x2, oy, C.ink, o) + A(ox, oy, ox, y2, C.ink, o); }

  /* TD 1 Ex 3 : tir parabolique depuis O */
  function figParab(o) {
    o = o || {};
    var a = Math.atan2(220, 260), b = AXES(40, 170, 345, 14);
    b += Y(336, 188, 'x', { fs: 15 }) + Y(26, 26, 'y', { fs: 15 }) + T(30, 188, 'O');
    b += P('M40 170Q170 60 300 170', C.mut, 1.6, '5 4');
    b += A(40, 170, 40 + 64 * Math.cos(a), 170 - 64 * Math.sin(a), C.vel) + Y(64, 126, 'v', { vec: 1, sub: '0', a: 'end', c: C.vel });
    b += ARC(40, 170, 26, 0, a / RAD) + Y(76, 163, 'α', { fs: 14 });
    b += DOT(170, 115) + T(170, 106, 'S') + DOT(300, 170) + T(308, 162, 'P', { a: 'start' });
    return svg(360, 200, o.en ? 'Projectile launched from O with initial velocity v0 at an angle alpha to the horizontal; parabola up to the top S, then down to the impact point P on the x axis'
      : 'Projectile lancé de O avec la vitesse v0 faisant l’angle alpha avec l’horizontale ; parabole jusqu’au sommet S puis au point d’impact P sur l’axe x', b);
  }
  /* TD 2 Ex 2 : pente, vue d’ensemble */
  function figSlope1(o) {
    o = o || {};
    var b = L(70, 160, 286.5, 35, C.ink, 1.8) + L(70, 160, 300, 160, C.mut, 1, '2 3');
    b += CROSS(225.9, 70) + T(222, 56, 'B') + T(84, 178, 'A');
    b += ARC(70, 160, 46, 0, 30) + Y(126, 151, 'α', { fs: 15 });
    b += A(70, 160, 38.8, 178, C.key, { w: 1.8, hs: 7 }) + A(70, 160, 52, 128.8, C.key, { w: 1.8, hs: 7 });
    b += Y(26, 176, 'u', { vec: 1, sub: 'x', c: C.key, fs: 15 }) + Y(46, 124, 'u', { vec: 1, sub: 'y', a: 'end', c: C.key, fs: 15 });
    return svg(360, 190, o.en ? 'Slope rising from A to B at an angle alpha to the horizontal; unit vector u_x points down the slope, u_y is perpendicular to it'
      : 'Pente qui monte de A vers B avec l’angle alpha ; u_x descend le long de la pente, u_y lui est perpendiculaire', b);
  }
  /* TD 2 Ex 2 : zoom sur B */
  function figSlope2(o) {
    o = o || {};
    var b = L(30, 175, 290, 25, C.ink, 1.8) + CROSS(160, 100) + T(148, 92, 'B', { a: 'end' });
    b += A(322, 150, 290.8, 168, C.key, { w: 1.8, hs: 7 }) + A(322, 150, 304, 118.8, C.key, { w: 1.8, hs: 7 });
    b += Y(280, 186, 'u', { vec: 1, sub: 'x', c: C.key, fs: 15 }) + Y(312, 118, 'u', { vec: 1, sub: 'y', a: 'start', c: C.key, fs: 15 });
    return svg(360, 195, o.en ? 'Zoom on point B of the slope, with the tilted basis u_x, u_y' : 'Zoom sur le point B de la pente, avec la base inclinée u_x, u_y', b);
  }
  /* TD 2 Ex 2 : forces sur le robot et décomposition du poids */
  function figSlopeForces(o) {
    o = o || {}; var W = o.en ? 'W' : 'P', f = { c: C.frc, vec: 1 };
    var b = L(28.4, 217.5, 331.6, 42.5, C.ink, 1.8);
    b += L(180, 240, 132.4, 157.5, C.mut, 1, '4 3') + L(180, 240, 227.6, 212.5, C.mut, 1, '4 3');
    b += A(180, 130, 132.4, 157.5, C.frc, { w: 1.8, dash: '5 3' }) + A(180, 130, 227.6, 212.5, C.frc, { w: 1.8, dash: '5 3' });
    b += A(180, 130, 180, 240, C.frc) + A(180, 130, 132.4, 47.5, C.frc) + A(180, 130, 227.6, 102.5, C.frc);
    b += ARC(180, 130, 32, -90, -60) + Y(192, 177, 'α', { fs: 14 });
    b += DOT(180, 130, 3.5) + T(195, 143, 'B', { a: 'start' });
    b += Y(124, 46, 'R', { vec: 1, a: 'end', c: C.frc }) + Y(192, 252, W, { vec: 1, a: 'start', c: C.frc }) + Y(236, 100, 'f', { vec: 1, a: 'start', c: C.frc });
    b += Y(122, 168, W, { vec: 1, sub: 'x', a: 'end', c: C.frc }) + Y(236, 222, W, { vec: 1, sub: 'y', a: 'start', c: C.frc });
    b += A(60, 100, 34, 115, C.key, { w: 1.6, hs: 7 }) + A(60, 100, 45, 74, C.key, { w: 1.6, hs: 7 });
    b += Y(28, 134, 'u', { vec: 1, sub: 'x', c: C.key, fs: 15 }) + Y(40, 72, 'u', { vec: 1, sub: 'y', a: 'end', c: C.key, fs: 15 });
    return svg(360, 265, o.en ? 'Robot at B on the slope: weight W straight down, split into W_x down the slope and W_y into the slope; reaction R perpendicular to the slope; friction f up the slope; angle alpha between W and the normal'
      : 'Robot en B sur la pente : poids P vertical, décomposé en P_x le long de la pente et P_y vers la pente ; réaction R perpendiculaire à la pente ; frottement f vers le haut de la pente ; angle alpha entre P et la normale', b);
  }
  /* TD 2 Ex 1 : quatre schémas de forces */
  function figFour(o) {
    o = o || {}; var W = o.en ? 'W' : 'P', BU = o.en ? 'F' : 'P', HAND = o.en ? 'hand' : 'main', fc = { vec: 1, a: 'start', c: C.frc };
    var b = L(180, 8, 180, 322, C.grid, 1) + L(8, 165, 352, 165, C.grid, 1);
    b += T(14, 22, '1', { c: C.mut, fs: 13 }) + T(194, 22, '2', { c: C.mut, fs: 13 }) + T(14, 187, '3', { c: C.mut, fs: 13 }) + T(194, 187, '4', { c: C.mut, fs: 13 });
    /* 1 : livre sur la table */
    b += L(25, 105, 155, 105, C.ink, 1.6) + HATCH(25, 155, 105) + '<rect x="62" y="91" width="56" height="14" rx="2" style="fill:none;stroke:' + C.mut + ';stroke-width:1"/>';
    b += A(90, 98, 90, 40, C.frc) + A(90, 98, 90, 156, C.frc) + CROSS(90, 98, 3.5, C.ink);
    b += Y(102, 52, 'R', fc) + Y(102, 152, W, fc);
    /* 2 : bille au bout d’un fil */
    b += L(225, 28, 315, 28, C.ink, 1.6) + (function () { var s = ''; for (var x = 232; x <= 315; x += 11) s += L(x, 28, x - 7, 21, C.mut, 1); return s; })();
    b += P('M230 97.3A80 80 0 0 0 310 97.3', C.mut, 1.2, '2 4') + L(270, 28, 310, 97.3, C.ink, 1.2);
    b += '<circle cx="310" cy="97.3" r="7" style="fill:none;stroke:' + C.ink + ';stroke-width:1.2"/>';
    b += A(310, 97.3, 287, 57.5, C.frc) + A(310, 97.3, 310, 150, C.frc) + DOT(310, 97.3, 2.5);
    b += Y(298, 64, 'T', fc) + Y(322, 146, W, fc);
    /* 3 : ballon qui flotte */
    b += WAVE(20, 160, 265) + '<circle cx="90" cy="265" r="13" style="fill:none;stroke:' + C.ink + ';stroke-width:1.2"/>';
    b += A(90, 265, 90, 212, C.frc) + A(90, 265, 90, 318, C.frc) + DOT(90, 265, 2.5);
    b += Y(102, 224, BU, { vec: 1, sub: 'A', subUp: 1, a: 'start', c: C.frc }) + Y(102, 314, W, fc);
    /* 4 : ballon maintenu sous l’eau */
    b += WAVE(200, 340, 200) + '<circle cx="270" cy="265" r="12" style="fill:none;stroke:' + C.ink + ';stroke-width:1.2"/>';
    b += A(270, 265, 270, 207, C.frc) + A(264, 265, 264, 286, C.frc) + A(276, 265, 276, 302, C.frc) + DOT(270, 265, 2.5);
    b += Y(282, 222, BU, { vec: 1, sub: 'A', subUp: 1, a: 'start', c: C.frc }) + Y(256, 292, W, { vec: 1, a: 'end', c: C.frc }) + Y(286, 306, 'F', { vec: 1, sub: HAND, subUp: 1, a: 'start', c: C.frc });
    return svg(360, 330, o.en ? 'Four force diagrams: 1 book on a table, weight and reaction; 2 ball on a string, weight and tension along the string; 3 floating ball, weight and buoyant force; 4 ball held under water, buoyant force up, weight and hand force down'
      : 'Quatre schémas de forces : 1 livre sur une table, poids et réaction ; 2 bille au bout d’un fil, poids et tension le long du fil ; 3 ballon qui flotte, poids et poussée d’Archimède ; 4 ballon tenu sous l’eau, poussée vers le haut, poids et force de la main vers le bas', b);
  }
  /* TD 2 Ex 3 : robot sur sol horizontal */
  function figRobot(o) {
    o = o || {}; var W = o.en ? 'W' : 'P';
    var b = L(30, 150, 330, 150, C.ink, 1.6) + HATCH(30, 330, 150) + '<rect x="150" y="112" width="40" height="38" rx="3" style="fill:none;stroke:' + C.mut + ';stroke-width:1"/>';
    b += A(170, 131, 170, 71, C.frc) + A(170, 131, 170, 191, C.frc) + A(170, 131, 245, 131, C.frc) + A(170, 131, 125, 131, C.frc, { dash: '4 3' }) + DOT(170, 131, 3);
    b += Y(182, 82, 'R', { vec: 1, a: 'start', c: C.frc }) + Y(182, 190, W, { vec: 1, a: 'start', c: C.frc }) + Y(236, 122, 'F', { vec: 1, c: C.frc }) + Y(132, 122, 'f', { vec: 1, c: C.frc });
    b += A(50, 70, 85, 70, C.key, { w: 1.6, hs: 7 }) + A(50, 70, 50, 35, C.key, { w: 1.6, hs: 7 });
    b += Y(92, 75, 'u', { vec: 1, sub: 'x', a: 'start', c: C.key, fs: 15 }) + Y(50, 28, 'u', { vec: 1, sub: 'y', c: C.key, fs: 15 });
    return svg(360, 200, o.en ? 'Robot on horizontal ground: weight W down, reaction R up, motor force F towards increasing x, and in part II friction f (dashed) towards decreasing x'
      : 'Robot sur un sol horizontal : poids P vers le bas, réaction R vers le haut, force du moteur F vers les x croissants et, en partie II, frottement f (pointillés) vers les x décroissants', b);
  }
  /* TD 3 Ex 1 : norme de la vitesse avec frottement linéaire */
  function figVlim(o) {
    o = o || {}; var tau = 69.5 / 9.81, b = AXES(52, 200, 342, 16);
    function X(t) { return 52 + 7 * t; } function V(v) { return 200 - 2.4 * v; }
    [0, 10, 20, 30, 40].forEach(function (t) { b += L(X(t), 200, X(t), 204, C.ink, 1) + T(X(t), 217, String(t), { fs: 11, c: C.mut }); });
    [20, 40, 60].forEach(function (v) { b += L(48, V(v), 52, V(v), C.ink, 1) + T(44, V(v) + 4, String(v), { a: 'end', fs: 11, c: C.mut }); });
    b += T(44, 204, '0', { a: 'end', fs: 11, c: C.mut });
    b += L(52, V(69.5), 335, V(69.5), C.mut, 1, '5 4') + T(44, V(69.5) + 4, o.en ? '69.5' : '69,5', { a: 'end', fs: 11, c: C.mut });
    b += Y(300, 26, 'v', { sub: 'lim', subUp: 1, fs: 14 });
    var d = ''; for (var t = 0; t <= 40; t += 0.5) d += (t ? 'L' : 'M') + n1(X(t)) + ' ' + n1(V(69.5 * (1 - Math.exp(-t / tau))));
    b += P(d, C.vel, 2.2);
    b += T(62, 14, '|v| (m·s⁻¹)', { a: 'start', fs: 12, c: C.mut }) + T(197, 234, 't (s)', { fs: 12, c: C.mut });
    return svg(360, 240, o.en ? 'Graph of the speed |v| against time t from 0 to 40 s: the curve starts at 0 and levels off at v_lim = 69.5 m/s'
      : 'Graphe de la vitesse |v| en fonction du temps de 0 à 40 s : la courbe part de 0 et tend vers v_lim = 69,5 m/s', b);
  }
  /* TD 3 Ex 1 : forces pendant la chute avec frottement */
  function figChute(o) {
    o = o || {}; var W = o.en ? 'W' : 'P';
    var b = L(20, 190, 220, 190, C.ink, 1.4) + HATCH(20, 220, 190) + A(40, 190, 40, 24, C.ink, { w: 1.2, hs: 7 }) + Y(28, 30, 'y', { fs: 15 }) + T(30, 182, 'O', { a: 'end' });
    b += A(40, 190, 40, 158, C.key, { w: 2, hs: 7 }) + Y(50, 172, 'u', { vec: 1, sub: 'y', a: 'start', c: C.key, fs: 15 });
    b += A(130, 105, 130, 170, C.frc) + A(130, 105, 130, 62, C.frc) + DOT(130, 105, 3.5);
    b += A(165, 90, 165, 140, C.vel) + Y(176, 124, 'v', { vec: 1, a: 'start', c: C.vel });
    b += Y(142, 166, W, { vec: 1, a: 'start', c: C.frc }) + Y(142, 74, 'f', { vec: 1, a: 'start', c: C.frc });
    return svg(240, 210, o.en ? 'Parachutist as a point: weight W down, friction f up, velocity v down; axis y pointing up from the ground'
      : 'Parachutiste (un point) : poids P vers le bas, frottement f vers le haut, vitesse v vers le bas ; axe y vers le haut depuis le sol', b, 300);
  }
  /* TD 3 Ex 2 : pénalité au rugby, à l’échelle (6,6 px par mètre) */
  function figRugby(o) {
    o = o || {};
    var k = 6.6, g = 9.81, v0 = 23, be = 38 * RAD;
    function X(x) { return 30 + k * x; } function Yp(y) { return 158 - k * y; }
    var b = AXES(30, 158, 345, 12) + Y(338, 150, 'x', { fs: 15 }) + Y(20, 22, 'y', { fs: 15 }) + T(22, 174, 'O');
    b += L(X(40), 158, X(40), Yp(8), C.ink, 3) + L(X(40) - 8, Yp(3), X(40) + 8, Yp(3), C.ink, 3);
    b += T(X(40) + 6, Yp(8) + 4, '8 m', { a: 'start', fs: 12, c: C.mut }) + T(X(40) + 12, Yp(3) + 4, '3 m', { a: 'start', fs: 12, c: C.mut });
    b += A(30, 158, 30 + 50 * Math.cos(be), 158 - 50 * Math.sin(be), C.vel) + Y(58, 122, 'v', { vec: 1, sub: '0', a: 'end', c: C.vel });
    b += ARC(30, 158, 22, 0, 38) + Y(60, 152, 'β', { fs: 14 });
    b += DIM(30, 176, X(40), 176) + T(162, 192, 'd = 40 m', { fs: 12, c: C.mut });
    if (o.traj) {
      var d = '';
      for (var x = 0; x <= 48; x += 1) { var y = -g * x * x / (2 * v0 * v0 * Math.cos(be) * Math.cos(be)) + x * Math.tan(be); d += (x ? 'L' : 'M') + n1(X(x)) + ' ' + n1(Yp(y)); }
      var y40 = -g * 1600 / (2 * v0 * v0 * Math.cos(be) * Math.cos(be)) + 40 * Math.tan(be);
      b += P(d, C.ink, 1.5, '5 4') + DOT(X(40), Yp(y40), 4, C.key) + T(X(40) - 8, Yp(y40) + 16, o.en ? '7.36 m' : '7,36 m', { a: 'end', fs: 12, c: C.key });
    }
    return svg(360, 196, o.en ? 'Kick from O with velocity v0 at angle beta; goal post 8 m high with the crossbar at 3 m, d = 40 m away' + (o.traj ? '; the parabola passes the post at 7.36 m' : '')
      : 'Coup de pied depuis O, vitesse v0 inclinée de bêta ; poteau de 8 m avec la barre à 3 m, à d = 40 m' + (o.traj ? ' ; la parabole passe au poteau à 7,36 m' : ''), b);
  }
  /* TD 4 Ex 2 : travail d’une force constante */
  function figWork(o) {
    o = o || {};
    var b = L(20, 50, 340, 50, C.mut, 1.2, '5 4') + DOT(60, 50) + DOT(230, 50) + DOT(300, 50);
    b += T(60, 68, 'B') + T(230, 68, 'M') + T(300, 68, 'A');
    b += A(230, 50, 230 - 80 * Math.cos(30 * RAD), 50 - 80 * Math.sin(30 * RAD), C.frc) + Y(150, 18, 'F', { vec: 1, a: 'end', c: C.frc });
    b += ARC(230, 50, 45, 150, 180, C.key) + T(160, 44, 'α = 30°', { fs: 12, c: C.key });
    b += DIM(60, 90, 300, 90) + T(180, 108, '50 cm', { fs: 12, c: C.mut });
    return svg(360, 118, o.en ? 'Points B, M, A on a horizontal line, B on the left; force F at M points up and to the left, at 30 degrees to the line on the side of B; AB = 50 cm'
      : 'Points B, M, A sur une droite horizontale, B à gauche ; la force F en M est dirigée vers le haut et la gauche, à 30° de la droite du côté de B ; AB = 50 cm', b);
  }
  /* TD 4 Ex 3 : route, montée, descente (à l’échelle) */
  function figRamp(o) {
    o = o || {};
    var b = L(10, 110, 350, 110, C.ink, 1.4) + L(67.8, 110, 198.7, 34.4, C.ink, 1.8) + L(198.7, 34.4, 329.7, 110, C.ink, 1.8);
    [30, 67.8, 329.7].forEach(function (x) { b += L(x, 105, x, 115, C.key, 1.4); });
    b += ARC(67.8, 110, 28, 0, 30) + ARC(329.7, 110, 28, 150, 180) + Y(106, 104, 'α', { fs: 13 }) + Y(292, 104, 'α', { fs: 13 });
    b += L(198.7, 34.4, 198.7, 110, C.mut, 1, '4 3') + Y(206, 80, 'h', o.en ? { a: 'start', fs: 15 } : { sub: 'C', subUp: 1, a: 'start', fs: 15 });
    b += T(30, 128, 'A') + T(67.8, 128, 'B') + T(198.7, 26, 'C') + T(329.7, 128, 'D');
    return svg(360, 136, o.en ? 'Horizontal road from A to B, then a climb at angle alpha up to C, at height h above the road, then a descent at angle alpha down to D'
      : 'Route horizontale de A à B, puis montée d’angle alpha jusqu’à C, à la hauteur h_C au-dessus de la route, puis descente d’angle alpha jusqu’à D', b);
  }
  /* TD 4 Ex 3 : forces sur AB et sur BC */
  function figRampForces(o) {
    o = o || {}; var W = o.en ? 'W' : 'P', fc = { vec: 1, c: C.frc };
    var b = L(178, 10, 178, 200, C.grid, 1);
    b += L(20, 150, 165, 150, C.ink, 1.6) + HATCH(20, 165, 150) + '<rect x="74" y="124" width="36" height="26" rx="3" style="fill:none;stroke:' + C.mut + ';stroke-width:1"/>';
    b += A(92, 137, 92, 82, C.frc) + A(92, 137, 92, 192, C.frc) + A(92, 137, 142, 137, C.frc) + A(92, 137, 70, 137, C.frc) + DOT(92, 137, 3);
    b += Y(102, 92, 'R', { vec: 1, a: 'start', c: C.frc }) + Y(102, 190, W, { vec: 1, a: 'start', c: C.frc }) + Y(140, 120, 'F', { vec: 1, sub: 'p', subUp: 1, c: C.frc }) + Y(66, 120, 'f', fc);
    b += L(190, 195, 350, 102.6, C.ink, 1.6);
    b += A(263.6, 152.5, 239.6, 110.9, C.frc) + A(263.6, 152.5, 263.6, 202.5, C.frc) + A(263.6, 152.5, 306.9, 127.5, C.frc) + A(263.6, 152.5, 244.5, 163.5, C.frc) + DOT(263.6, 152.5, 3);
    b += Y(232, 114, 'R', { vec: 1, a: 'end', c: C.frc }) + Y(274, 204, W, { vec: 1, a: 'start', c: C.frc }) + Y(312, 126, 'F', { vec: 1, sub: 'p', subUp: 1, a: 'start', c: C.frc }) + Y(236, 156, 'f', { vec: 1, a: 'end', c: C.frc });
    return svg(360, 210, o.en ? 'Left: robot on the horizontal road AB, with weight W, reaction R, thrust F_p forwards and friction f backwards. Right: robot on the climb BC, reaction perpendicular to the slope, thrust up the slope, friction down the slope'
      : 'À gauche : robot sur la route AB, poids P, réaction R, poussée F_p vers l’avant, frottement f vers l’arrière. À droite : robot dans la montée BC, réaction perpendiculaire à la pente, poussée vers le haut de la pente, frottement vers le bas', b);
  }
  /* TD 4 Ex 4 : arc de cercle AB puis segment BC */
  function figArc(o) {
    o = o || {};
    var b = P('M78.8 98A140 140 0 0 0 200 168', C.ink, 1.8) + L(200, 168, 345, 168, C.ink, 1.8);
    b += L(200, 28, 78.8, 98, C.mut, 1, '4 3') + L(200, 28, 200, 168, C.mut, 1, '4 3');
    b += ARC(200, 28, 26, -150, -90) + Y(181, 66, 'θ', { fs: 14 }) + Y(208, 104, 'R', { a: 'start', fs: 15 });
    b += L(78.8, 98, 40, 98, C.mut, 1, '2 3') + L(150, 168, 40, 168, C.mut, 1, '2 3') + DIM(48, 98, 48, 168, C.ink) + Y(34, 138, 'h', { fs: 15 });
    b += CROSS(200, 28) + CROSS(78.8, 98) + CROSS(200, 168) + CROSS(300, 168);
    b += T(212, 24, 'O', { a: 'start' }) + T(72, 90, 'A', { a: 'end' }) + T(210, 160, 'B', { a: 'start' }) + T(300, 158, 'C');
    return svg(360, 182, o.en ? 'Arc of circle AB with centre O and radius R, O directly above B, angle theta between OA and OB; h is the drop from A to B; then a horizontal segment BC'
      : 'Arc de cercle AB de centre O et de rayon R, O à la verticale de B, angle thêta entre OA et OB ; h est la différence d’altitude entre A et B ; puis segment horizontal BC', b);
  }
  /* TD 4 Ex 5 : jeu de palet */
  function figPuck(o) {
    o = o || {};
    var b = L(20, 160, 190, 160, C.ink, 2) + P('M190 160A80 80 0 0 0 251.3 131.4', C.ink, 2) + L(251.3, 131.4, 336.4, 30, C.ink, 2);
    b += L(190, 80, 190, 160, C.mut, 1, '4 3') + L(190, 80, 251.3, 131.4, C.mut, 1, '4 3') + L(336.4, 30, 336.4, 160, C.mut, 1, '4 3') + L(190, 160, 336.4, 160, C.mut, 1, '4 3');
    b += ARC(190, 80, 22, -90, -40) + Y(204, 113, 'θ', { fs: 13 });
    b += L(20, 155, 20, 165, C.ink, 1.4) + L(100, 155, 100, 165, C.ink, 1.4);
    b += A(34, 160, 80, 160, C.frc, { w: 2.6 }) + DOT(34, 160, 4, C.key);
    b += T(20, 150, 'A') + T(37, 150, 'G') + Y(64, 150, 'F', { vec: 1, c: C.frc }) + T(100, 150, 'A’') + T(190, 177, 'B') + T(184, 76, 'O', { a: 'end' });
    b += T(262, 140, 'C', { a: 'start' }) + T(336.4, 22, 'D') + T(336.4, 177, 'D’') + Y(346, 100, 'h', { a: 'start', fs: 15 });
    b += DIM(20, 178, 100, 178) + Y(60, 196, 'L', { fs: 15 });
    return svg(360, 200, o.en ? 'Track: horizontal part from A through A prime to B, the force F pushes the puck G from A to A prime over the length L; arc BC of centre O and angle theta; straight incline CD up to D, at height h above AB'
      : 'Piste : partie horizontale de A à B en passant par A’, la force F pousse le palet G de A à A’ sur la longueur L ; arc BC de centre O et d’angle thêta ; plan incliné CD jusqu’à D, à la hauteur h au-dessus de AB', b);
  }
  /* TD 5 Ex 1 : coordonnées polaires de M (base polaire si o.base) */
  function figPolar(o) {
    o = o || {};
    var b = AXES(50, 195, 285, 15) + T(282, 214, 'x') + T(38, 24, 'y') + T(40, 212, 'O');
    b += o.base ? A(50, 195, 146.4, 80.1, C.pos) : L(50, 195, 146.4, 80.1, C.mut, 1.2, '2 3');
    b += CROSS(146.4, 80.1, 5) + T(156, 96, 'M', { a: 'start' });
    b += ARC(50, 195, 30, 0, 50) + Y(90, 183, 'θ', { fs: 15 }) + Y(92, 130, 'r', { a: 'end', fs: 15 });
    if (o.base) {
      b += A(146.4, 80.1, 173.4, 47.9, C.key, { w: 1.8, hs: 7 }) + A(146.4, 80.1, 114.2, 53.1, C.key, { w: 1.8, hs: 7 });
      b += Y(180, 48, 'u', { vec: 1, sub: 'r', a: 'start', c: C.key, fs: 15 }) + Y(108, 50, 'u', { vec: 1, sub: 'θ', a: 'end', c: C.key, fs: 15 });
    }
    return svg(300, 225, o.en ? 'Point M located by its distance r to O and the angle theta from the x axis' + (o.base ? '; at M, u_r points away from O along OM and u_theta is u_r turned by +90 degrees' : '')
      : 'Point M repéré par sa distance r à O et l’angle thêta depuis l’axe x' + (o.base ? ' ; en M, u_r est dirigé selon OM, vers l’extérieur, et u_thêta est u_r tourné de +90°' : ''), b, 340);
  }
  /* TD 5 Ex 2 : manège (o.kin : vitesse et accélération) */
  function figManege(o) {
    o = o || {}; var mx = 207.8, my = 85.5;
    var b = '<circle cx="130" cy="140" r="95" style="fill:none;stroke:' + C.mut + ';stroke-width:1.2;stroke-dasharray:4 4"/>';
    b += A(20, 140, 285, 140, C.ink, { w: 1.2, hs: 7 }) + A(130, 262, 130, 14, C.ink, { w: 1.2, hs: 7 }) + T(282, 158, 'x') + T(118, 24, 'y') + T(120, 158, 'O');
    b += o.kin ? L(130, 140, mx, my, C.mut, 1, '3 3') : A(130, 140, mx, my, C.pos);
    b += ARC(130, 140, 26, 0, 35) + Y(167, 134, 'θ', { fs: 14 });
    if (!o.kin) b += Y(156, 104, 'r', { a: 'end', fs: 15 });
    if (o.kin) {
      b += A(mx, my, 172.2, 34.7, C.vel, { w: 2.6 }) + Y(166, 34, 'v', { vec: 1, a: 'end', c: C.vel });
      b += A(mx, my, 165.2, 115.3, C.acc, { w: 2.6 }) + Y(176, 126, 'a', { vec: 1, a: 'start', c: C.acc });
    }
    b += A(mx, my, 232.4, 68.3, C.key, { w: 1.6, hs: 7 }) + A(mx, my, 190.6, 60.9, C.key, { w: 1.6, hs: 7 }) + DOT(mx, my, 3.5);
    b += Y(240, 70, 'u', { vec: 1, sub: 'r', a: 'start', c: C.key, fs: 15 }) + Y(198, 60, 'u', { vec: 1, sub: 'θ', a: 'start', c: C.key, fs: 15 });
    b += T(mx + 8, my + 18, 'M', { a: 'start' });
    return svg(300, 270, o.en ? (o.kin ? 'Uniform circular motion: at M the velocity v is tangent to the circle, along u_theta, and the acceleration a points towards the centre O' : 'Point M on the circle of radius r0 centred on O, angle theta = omega t; position vector OM and polar basis u_r, u_theta at M')
      : (o.kin ? 'Mouvement circulaire uniforme : en M la vitesse v est tangente au cercle, selon u_thêta, et l’accélération a est dirigée vers le centre O' : 'Point M sur le cercle de rayon r0 et de centre O, angle thêta = oméga t ; vecteur position OM et base polaire u_r, u_thêta en M'), b, 340);
  }
  /* TD 5 Ex 3 : satellite en orbite circulaire */
  function figSat(o) {
    o = o || {};
    var b = '<circle cx="140" cy="125" r="48" style="fill:var(--surface-2,transparent);stroke:' + C.ink + ';stroke-width:1.4"/>';
    b += '<circle cx="140" cy="125" r="96" style="fill:none;stroke:' + C.ink + ';stroke-width:1.2;stroke-dasharray:2 3"/>';
    b += A(20, 125, 292, 125, C.ink, { w: 1.1, hs: 7 }) + A(140, 240, 140, 10, C.ink, { w: 1.1, hs: 7 }) + T(288, 142, 'x') + T(128, 18, 'y');
    b += A(140, 125, 218.6, 69.9, C.pos) + DOT(218.6, 69.9, 4.5) + Y(228, 66, 'm', { a: 'start', fs: 15 }) + T(132, 141, 'O', { a: 'end' });
    b += ARC(140, 125, 24, 0, 35) + Y(173, 119, 'θ', { fs: 13 }) + Y(172, 90, 'r', { a: 'end', fs: 15 });
    b += DIM(140, 125, 164, 166.6, C.ink) + Y(162, 142, 'R', { sub: 'T', subUp: 1, a: 'start', fs: 14 });
    b += DIM(164, 166.6, 188, 208.1, C.ink) + Y(186, 184, 'h', { a: 'start', fs: 15 });
    b += Y(116, 108, 'M', { sub: 'T', subUp: 1, fs: 14 });
    return svg(300, 245, o.en ? 'Earth of radius R_T and mass M_T centred on O; satellite of mass m on a circular orbit of radius r = R_T + h, at angle theta from the x axis'
      : 'Terre de rayon R_T et de masse M_T, de centre O ; satellite de masse m sur une orbite circulaire de rayon r = R_T + h, à l’angle thêta de l’axe x', b, 340);
  }

  window.PHYS_TD_FIG = { fmt: fmt, M: M, eq: eq, fr: fr, col: col, sq: sq, fig: fig, tbl: tbl, thd: thd, thdd: thdd, rd: rd, rdd: rdd,
    parab: figParab, slope1: figSlope1, slope2: figSlope2, slopeForces: figSlopeForces, four: figFour, robot: figRobot, vlim: figVlim,
    chute: figChute, rugby: figRugby, work: figWork, ramp: figRamp, rampForces: figRampForces, arc: figArc, puck: figPuck,
    polar: figPolar, manege: figManege, sat: figSat };
  function add(ex) { X.push(fmt(ex)); }

  /* =====================================================================
     TD 1 — Cinématique en cartésien (corrigé officiel : Corrections TD/11)
     ===================================================================== */
  add({
    id: 'td1-ex1', exam: null, kind: 'td', order: 11, src: 'TD 1 · Ex 1', title: 'Mouvement d’une voiture',
    topics: ['cinematique'], lvl: 1, time: 10,
    intro: '<p>Une voiture est initialement immobile et se met en mouvement jusqu’à atteindre une vitesse de 10 m/s. On suppose que sa trajectoire est rectiligne et on étudie son mouvement dans un repère dont l’origine coïncide avec la porte d’entrée du domicile de l’automobiliste.</p>' +
      '<p>À partir de l’instant où la voiture démarre, l’abscisse du point étudié satisfait l’équation (valable en mètre) :</p>' + eq('$x($t) = 1,25$t² + 7'),
    questions: [
      '<b>1.</b> Avant qu’elle ne démarre, calculer à quelle distance du domicile la voiture était garée.',
      '<b>2.</b> Exprimer en fonction du temps la valeur de la vitesse de cette voiture. Calculer la durée au bout de laquelle la vitesse atteint la valeur de 10 m/s.',
      '<b>3.</b> Quelle distance a-t-elle parcouru alors ?',
      '<b>4.</b> Calculer la valeur de l’accélération de la voiture pendant cette phase de démarrage.',
      '<b>5.</b> Que doit valoir l’accélération de cette voiture si l’automobiliste souhaite atteindre sa vitesse de 10 m/s en seulement 2s ?',
      '<b>6.</b> Si l’automobiliste maintient l’accélération calculée à la question 5 pendant 4s, quelle vitesse atteint-elle ? Quelle est la distance parcourue ?'],
    hints: [
      'La voiture démarre à $t = 0 : sa position de départ est $x(0). La vitesse est la dérivée de la position : $v($t) = d$x/d$t.',
      '« Distance parcourue » n’est pas « position » : la voiture part de $x(0) = 7 m, la distance parcourue vaut $x($t) − $x(0).',
      'Questions 5 et 6 : avec une accélération constante $a et un départ arrêté, $v($t) = $a$t. Intègre encore une fois sans oublier la position de départ.'],
    solution: [
      { t: 'Question 1 · position de départ', html: '<p>La voiture démarre à $t = 0. Avant, elle était garée à la position :</p>' + eq('$x(0) = 1,25 × 0² + 7 = 7 m') + '<p>Elle était garée à <b>7 m</b> de la porte d’entrée.</p>' },
      { t: 'Question 2 · vitesse', html: '<p>La vitesse est la dérivée de la position par rapport au temps :</p>' + eq('$v($t) = ' + fr('d$x', 'd$t') + ' = 2,5 $t') +
        '<p>($v en m·s⁻¹, $t en s.) La vitesse vaut 10 m/s quand 2,5 $t = 10, soit $t = 10/2,5 = <b>4 s</b>.</p>' },
      { t: 'Question 3 · distance parcourue', html: '<p>La distance parcourue depuis le démarrage est la différence des positions :</p>' +
        eq('$d = $x(4) − $x(0)', '= (1,25 × 4² + 7) − 7', '= 27 − 7 = 20 m') + '<p>La voiture a parcouru <b>20 m</b> ; elle se trouve alors à 27 m du domicile.</p>' +
        '<p class="sol-note">Corrigé officiel : il répond « $x(4) = 27 m ». C’est la position de la voiture (sa distance au domicile), pas la distance parcourue depuis le démarrage.</p>' },
      { t: 'Question 4 · accélération', html: '<p>L’accélération est la dérivée de la vitesse :</p>' + eq('$a = ' + fr('d$v', 'd$t') + ' = 2,5 m·s⁻²') +
        '<p>Elle est constante : le mouvement est rectiligne uniformément accéléré.</p>' },
      { t: 'Question 5 · démarrer en 2 s', html: '<p>L’accélération $a est constante, donc $v($t) = ∫ $a d$t = $a$t + $v(0), avec $v(0) = 0 (voiture à l’arrêt au départ) :</p>' +
        eq('$v($t) = $a$t', '$v(2) = 2$a = 10 ⇒ $a = 5 m·s⁻²') },
      { t: 'Question 6 · pendant 4 s', html: '<p>Vitesse au bout de 4 s :</p>' + eq('$v(4) = 5 × 4 = 20 m·s⁻¹') +
        '<p>Position : on intègre $v($t) = 5$t ; la constante est la position de départ, $x(0) = 7 m :</p>' + eq('$x($t) = ' + fr('5', '2') + ' $t² + 7 = 2,5 $t² + 7', '$x(4) = 2,5 × 16 + 7 = 47 m') +
        '<p>Distance parcourue : $x(4) − $x(0) = 47 − 7 = <b>40 m</b>.</p><p class="sol-note">Corrigé officiel : il s’arrête à « $x(4) = 47 m », qui est la position et non la distance parcourue.</p>' }],
    answer: '<ul><li>1. Garée à 7 m du domicile.</li><li>2. $v($t) = 2,5 $t ; 10 m/s atteints à $t = 4 s.</li><li>3. 20 m parcourus (la voiture est alors à 27 m du domicile).</li><li>4. $a = 2,5 m·s⁻² (constante).</li><li>5. $a = 5 m·s⁻².</li><li>6. $v(4) = 20 m·s⁻¹ ; 40 m parcourus (position 47 m).</li></ul>',
    traps: [
      'Répondre 27 m (ou 47 m) à « quelle distance a-t-elle parcouru » : c’est la position. La distance parcourue vaut $x($t) − $x(0).',
      'Oublier la constante d’intégration : en intégrant $v($t) = 5$t, la position de départ (7 m) reste dans $x($t).',
      'Prendre $v(0) ≠ 0 : « initialement immobile » donne $v(0) = 0, donc $a = Δ$v/Δ$t = 10/2.'],
    official: false, note: 'Corrigé officiel suivi, sauf aux questions 3 et 6 : il y donne la position (27 m, 47 m) au lieu de la distance parcourue (20 m, 40 m).'
  });

  add({
    id: 'td1-ex2', exam: null, kind: 'td', order: 12, src: 'TD 1 · Ex 2', title: 'Mouvement d’un TGV',
    topics: ['cinematique'], lvl: 1, time: 10,
    intro: '<p>Lorsqu’il quitte la gare de Strasbourg, le TGV de la ligne grand Est quitte l’agglomération de à très basse vitesse, jusqu’à atteindre la ligne à grande vitesse qui débute dans une commune voisine. Le TGV pénètre sur cette ligne à la vitesse de 90 km/h et atteint 320 km/h en 5 min et 20s.</p>',
    questions: [
      '<b>1.</b> Que vaut l’accélération moyenne du TGV à partir de l’instant où il a atteint la ligne à grande vitesse ?',
      '<b>2.</b> Les sportifs automobiles ont l’habitude d’exprimer la valeur d’une accélération en « g ». g désigne le champ de pesanteur terrestre : avoir une accélération de « 1 g » signifie avoir une accélération égale à celle d’un corps en chute libre. (g=10m/s²) Exprimer l’accélération du TGV « en g » et montrer que cette valeur justifier que les passagers ne soient pas secoués lorsque le train aborde la ligne à grande vitesse.',
      '<b>3.</b> Une formule 1 passe d’une vitesse nulle à une vitesse de 180 km/h en 4s : exprimer son accélération en fonction de g et commenter la différence avec celle du TGV.'],
    hints: [
      'Accélération moyenne : $a = Δ$v/Δ$t, avec Δ$v en m·s⁻¹ et Δ$t en s. Pour passer de km/h à m/s, divise par 3,6.',
      '5 min et 20 s, c’est 5 × 60 + 20 = 320 s. « En g » : divise l’accélération par $g = 10 m·s⁻².'],
    solution: [
      { t: 'Question 1 · accélération moyenne', html: '<p>On passe en unités SI (km/h → m/s : diviser par 3,6) :</p>' +
        eq('$v_1 = 90 km/h = 25 m·s⁻¹', '$v_2 = 320 km/h ≈ 88,9 m·s⁻¹', 'Δ$t = 5 × 60 + 20 = 320 s') + '<p>Accélération moyenne :</p>' +
        eq('$a = ' + fr('Δ$v', 'Δ$t') + ' = ' + fr('88,9 − 25', '320') + ' ≈ 0,20 m·s⁻²') +
        '<p>Le corrigé officiel convertit directement l’écart : 320 − 90 = 230 km/h ≈ 64 m/s, puis 64/320 = 0,2 m·s⁻².</p>' },
      { t: 'Question 2 · en « g »', html: eq('$a/$g = 0,20/10 = 0,02', '$a ≈ 0,02 $g') +
        '<p>L’accélération du TGV vaut 2 % de celle d’une chute libre : elle est très faible, les passagers ne sont pas secoués.</p>' },
      { t: 'Question 3 · formule 1', html: eq('180 km/h = 180/3,6 = 50 m·s⁻¹', '$a = ' + fr('50 − 0', '4') + ' = 12,5 m·s⁻²', '$a/$g = 12,5/10 = 1,25') +
        '<p>La formule 1 accélère à <b>1,25 $g</b> : plus qu’un corps en chute libre, et environ 60 fois plus que le TGV (12,5/0,20 ≈ 63). Le pilote est plaqué contre son siège.</p>' +
        '<p class="sol-note">Corrigé officiel : il écrit 50/4 = 12 m·s⁻² et 1,2 $g ; le calcul exact donne 12,5 m·s⁻² et 1,25 $g.</p>' }],
    answer: '<ul><li>1. $a ≈ 0,20 m·s⁻² (Δ$v ≈ 63,9 m·s⁻¹ en 320 s).</li><li>2. $a ≈ 0,02 $g : très faible, pas de secousse.</li><li>3. Formule 1 : $a = 12,5 m·s⁻² = 1,25 $g, environ 60 fois l’accélération du TGV.</li></ul>',
    traps: [
      'Diviser des km/h par des secondes : convertis d’abord en m/s (÷ 3,6).',
      'Écrire 5 min 20 s = 5,20 min : c’est 320 s.',
      'Arrondir trop tôt : 50/4 vaut 12,5, pas 12.'],
    official: false, note: 'Corrigé officiel suivi, sauf à la question 3 : 50/4 = 12,5 m·s⁻² (1,25 g) et non 12 m·s⁻² (1,2 g).'
  });

  add({
    id: 'td1-ex3', exam: null, kind: 'td', order: 13, src: 'TD 1 · Ex 3', title: 'Mouvement parabolique',
    topics: ['cinematique', 'trajectoire', 'nature', 'tir'], lvl: 2, time: 25,
    intro: '<p>On étudie la chute libre d’un projectile lancé du point (0,0) à t=0 avec une vitesse initiale @v_0 faisant un $α angle avec l’horizontale.</p><p>On donne les équations du mouvement :</p>' +
      eq('$x($t) = $v_0.cos($α).$t', '$y($t) = $v_0.sin($α).$t − ' + fr('$g', '2') + ' $t²'),
    figs: [{ svg: figParab(), cap: 'Figure de l’énoncé : tir depuis O, sommet S, point d’impact P.' }],
    questions: [
      '<b>1.</b> Donner le cadre d’étude (référentiel, système étudié, système de coordonnées).',
      '<b>2.</b> Donner l’expression du vecteur position dans la base cartésienne.',
      '<b>3.</b> Etablir l’équation de la trajectoire y(x).',
      '<b>4.</b> Donner l’expression du vecteur vitesse ainsi que sa norme.',
      '<b>5.</b> Donner l’expression du vecteur accélération ainsi que sa norme.',
      '<b>6.</b> Caractériser, sur chaque axe, la nature du mouvement. (Accéléré, ralenti, uniforme ; ainsi que l’orientation : positif ou négatif par rapport à l’axe)',
      '<b>7.</b> Donner l’expression de la portée, c’est-à-dire x<sub>max</sub>.',
      '<b>8.</b> Donner l’expression du sommet de la trajectoire, c’est-à-dire x<sub>s</sub> et y<sub>s</sub>.'],
    hints: [
      'Le cadre d’étude tient en trois lignes : référentiel (terrestre, supposé galiléen), système, système de coordonnées. Pour $y($x), tire $t de l’équation de $x($t) et remplace-le dans $y($t).',
      'Dérive chaque coordonnée : $v_x = d$x/d$t, $v_y = d$y/d$t, puis encore une fois pour @a. Sur $y, compare le signe de $v_y à celui de $a_y.',
      'Portée : le projectile retombe à $y = 0 avec $t ≠ 0. Sommet : la composante verticale de la vitesse s’annule, $v_y = 0.'],
    solution: [
      { t: 'Question 1 · cadre d’étude', html: '<ul><li>Référentiel : terrestre, supposé galiléen.</li><li>Système : le projectile, assimilé à un point matériel.</li><li>Système de coordonnées : cartésien, repère (O, @u_x, @u_y), @u_y vertical vers le haut ; origine des temps au lancer.</li></ul>' },
      { t: 'Question 2 · vecteur position', html: eq('@OM($t) = $x @u_x + $y @u_y', '@OM($t) = ' + col('$v_0 cos$α · $t', '$v_0 sin$α · $t − ' + fr('$g', '2') + ' $t²')) },
      { t: 'Question 3 · équation de la trajectoire', html: '<p>De $x($t) = $v_0 cos$α · $t on tire (pour $α ≠ 90°) :</p>' + eq('$t = ' + fr('$x', '$v_0 cos$α')) +
        '<p>On remplace dans $y($t) :</p>' + eq('$y = $v_0 sin$α · ' + fr('$x', '$v_0 cos$α') + ' − ' + fr('$g', '2') + ' ' + fr('$x²', '$v_0² cos²$α'), '$y($x) = −' + fr('$g', '2 $v_0² cos²$α') + ' $x² + $x tan$α') +
        '<p>C’est une parabole tournée vers le bas. Il ne reste plus de $t : c’est le but.</p>' },
      { t: 'Question 4 · vecteur vitesse', html: eq('@v = ' + fr('d@OM', 'd$t') + ' = ' + col('$v_0 cos$α', '$v_0 sin$α − $g$t')) +
        eq('‖@v‖ = ' + sq('$v_x² + $v_y²'), '= ' + sq('($v_0 cos$α)² + ($v_0 sin$α − $g$t)²')) },
      { t: 'Question 5 · vecteur accélération', html: eq('@a = ' + fr('d@v', 'd$t') + ' = ' + col('0', '−$g') + ' = −$g @u_y', '‖@a‖ = $g') +
        '<p>L’accélération est constante, verticale, vers le bas : c’est la chute libre (@a = @g).</p>' +
        '<p class="sol-note">Corrigé officiel : il écrit ‖@a‖ = 10 m·s⁻², ce qui suppose $g = 10 m·s⁻², valeur que cet exercice ne donne pas ; écris ‖@a‖ = $g.</p>' },
      { t: 'Question 6 · nature du mouvement', html: '<ul><li>Sur $x : $v_x = $v_0 cos$α est constante et positive, $a_x = 0 : mouvement <b>uniforme</b>, dans le sens <b>positif</b>.</li>' +
        '<li>Sur $y : $a_y = −$g &lt; 0. Tant que $t &lt; $v_0 sin$α/$g, $v_y &gt; 0 : le projectile monte (sens <b>positif</b>) ; $v_y et $a_y sont de signes opposés : mouvement <b>ralenti</b> (décéléré). Ensuite $v_y &lt; 0 : il descend (sens <b>négatif</b>) ; $v_y et $a_y ont le même signe : mouvement <b>accéléré</b>.</li></ul>' },
      { t: 'Question 7 · portée', html: '<p>La portée est l’abscisse du point d’impact P, où $y = 0 :</p>' + eq('$y($t) = $t ($v_0 sin$α − ' + fr('$g', '2') + ' $t) = 0') +
        '<p>Solutions : $t = 0 (le départ) ou</p>' + eq('$t_P = ' + fr('2 $v_0 sin$α', '$g')) + '<p>On remplace dans $x($t) :</p>' +
        eq('$x_{max} = $v_0 cos$α · $t_P', '= ' + fr('2 $v_0² sin$α cos$α', '$g') + ' = ' + fr('$v_0² sin(2$α)', '$g')) },
      { t: 'Question 8 · sommet', html: '<p>Au sommet S, la vitesse verticale est nulle :</p>' + eq('$v_y($t_S) = $v_0 sin$α − $g$t_S = 0', '$t_S = ' + fr('$v_0 sin$α', '$g')) +
        '<p>On remplace dans @OM($t) :</p>' + eq('$x_S = ' + fr('$v_0² sin$α cos$α', '$g') + ' = ' + fr('$x_{max}', '2'), '$y_S = ' + fr('$v_0² sin²$α', '$g') + ' − ' + fr('$v_0² sin²$α', '2$g') + ' = ' + fr('$v_0² sin²$α', '2$g')) +
        '<p>Le sommet est à mi-portée, atteint à mi-parcours ($t_S = $t_P/2) : la parabole est symétrique.</p>' }],
    answer: '<ul><li>@OM = ($v_0 cos$α · $t ; $v_0 sin$α · $t − $g$t²/2)</li><li>$y($x) = −$g$x²/(2$v_0² cos²$α) + $x tan$α</li><li>@v = ($v_0 cos$α ; $v_0 sin$α − $g$t) ; @a = (0 ; −$g), ‖@a‖ = $g</li><li>$x_{max} = 2$v_0² sin$α cos$α/$g = $v_0² sin(2$α)/$g</li><li>$x_S = $v_0² sin$α cos$α/$g ; $y_S = $v_0² sin²$α/(2$g)</li></ul>',
    traps: [
      'Laisser du $t dans $y($x) : l’équation de la trajectoire ne dépend que de $x.',
      'Dire que l’accélération est nulle au sommet : @a = −$g @u_y partout. C’est $v_y qui s’annule, pas @v (il reste $v_x = $v_0 cos$α).',
      'Qualifier le mouvement sur $y d’un seul mot : il est ralenti à la montée puis accéléré à la descente.',
      'Confondre $t_S (sommet) et $t_P = 2$t_S (impact).'],
    official: true
  });

  add({
    id: 'td1-ex4', exam: null, kind: 'td', order: 14, src: 'TD 1 · Ex 4', title: 'Mesure de la profondeur d’un puits',
    topics: ['cinematique', 'nature', 'tir'], lvl: 1, time: 15,
    intro: '<p>Afin d’établir une méthode de mesure de la profondeur d’un puits, on cherche à déterminer la nature du mouvement d’un caillou lancé horizontalement au-dessus du sol. Le mouvement est filmé et étudié à l’aide d’un logiciel de pointage. Les positions du caillou sont étudiées dans un repère (O,x,y) dont l’origine coïncide avec la position de départ du caillou (après qu’il a quitté la main du lanceur). La modélisation donne les expressions des coordonnées de position du caillou (en mètre) en fonction du temps :</p>' +
      eq('$x($t) = 0,5$t   et   $y($t) = −5$t²'),
    questions: [
      '<b>1.</b> Déterminer les expressions (ou les valeurs si elles sont constantes) des coordonnées $v_x($t) et $v_y($t) du vecteur vitesse du caillou. Commenter les signes de ces grandeurs.',
      '<b>2.</b> Calculer les valeurs initiales $v_x(0) et $v_y(0) de ces coordonnées et vérifier qu’elles sont en accord avec le fait que le caillou ait été lancé horizontalement.',
      '<b>3.</b> Au cours de la chute, le mouvement est-il rectiligne ? Est-il uniforme ? Justifier en exploitant les expressions de $v_x($t) et $v_y($t).',
      '<b>4.</b> Déterminer les expressions des coordonnées $a_x($t) et $a_y($t) du vecteur accélération du caillou.',
      '<b>5.</b> En déduire toutes les caractéristiques (direction, sens et valeur) du vecteur accélération en justifiant chacune d’elles à l’aide de la réponse précédente.',
      '<b>6.</b> Ce caillou est-il en chute libre ? Justifier à l’aide du document donné en début d’énoncé. On pourra prendre $g ≈ 10 m·s⁻².',
      '<b>7.</b> Le même lancé est ensuite réalisé depuis le bord d’un puits. Le caillou atteint le sol après une durée de 2,0 s. Que vaut la profondeur de ce puits ?'],
    hints: [
      'Dérive $x($t) et $y($t) : $v_x = d$x/d$t, $v_y = d$y/d$t. Une coordonnée constante ne dépend pas de $t.',
      'Rectiligne : la direction de @v reste-t-elle la même ? Uniforme : la norme ‖@v‖ reste-t-elle constante ?',
      'Chute libre : le poids est la seule force, donc @a = @g (vertical, vers le bas, de valeur $g). Pour le puits, $y(2) donne la position du caillou au fond.'],
    solution: [
      { t: 'Question 1 · coordonnées de la vitesse', html: eq('$v_x = ' + fr('d$x', 'd$t') + ' = 0,5 m·s⁻¹', '$v_y = ' + fr('d$y', 'd$t') + ' = −10 $t') +
        '<p>$v_x &gt; 0 : le caillou avance vers les $x croissants (vers la droite). $v_y &lt; 0 pour $t &gt; 0 : il descend.</p>' },
      { t: 'Question 2 · valeurs initiales', html: eq('$v_x(0) = 0,5 m·s⁻¹ ; $v_y(0) = 0') + '<p>Au lancer, la vitesse n’a pas de composante verticale : elle est horizontale, en accord avec un lancer horizontal.</p>' },
      { t: 'Question 3 · rectiligne ? uniforme ?', html: '<p><b>Rectiligne ?</b> Non. Le rapport $v_y/$v_x = −20 $t change avec le temps : la direction de @v tourne, la trajectoire est courbe (en éliminant $t : $y = −20 $x², une parabole).</p>' +
        '<p><b>Uniforme ?</b> Non. ‖@v‖ = ' + sq('0,25 + 100 $t²') + ' augmente avec $t : le mouvement est accéléré.</p>' +
        '<p>Axe par axe, comme le corrigé officiel : sur $x, mouvement rectiligne uniforme ; sur $y, mouvement rectiligne accéléré ; au total, mouvement curviligne accéléré.</p>' },
      { t: 'Question 4 · coordonnées de l’accélération', html: eq('$a_x = ' + fr('d$v_x', 'd$t') + ' = 0', '$a_y = ' + fr('d$v_y', 'd$t') + ' = −10 m·s⁻²') },
      { t: 'Question 5 · caractéristiques de @a', html: '<ul><li>Direction : verticale ($a_x = 0).</li><li>Sens : vers le bas ($a_y &lt; 0).</li><li>Valeur : ‖@a‖ = 10 m·s⁻², constante.</li></ul>' },
      { t: 'Question 6 · chute libre ?', html: '<p>Oui. @a est vertical, vers le bas, de valeur 10 m·s⁻² ≈ $g : c’est l’accélération d’un corps en chute libre (soumis à son seul poids), d’après la définition du « 1 g » donnée à l’exercice 2.</p>' +
        '<p class="sol-note">L’énoncé renvoie à un « document donné en début d’énoncé » qui ne figure pas dans le TD : on s’appuie sur cette définition.</p>' },
      { t: 'Question 7 · profondeur du puits', html: '<p>L’origine est au point de départ, au bord du puits. Le caillou touche le fond à $t = 2,0 s :</p>' + eq('$y(2) = −5 × 2² = −20 m') +
        '<p>Le fond est 20 m sous le point de départ : le puits a une profondeur de <b>20 m</b>.</p>' }],
    answer: '<ul><li>1-2. $v_x = 0,5 m·s⁻¹ (constante, vers la droite), $v_y = −10$t (vers le bas) ; $v_y(0) = 0 : lancer horizontal.</li><li>3. Ni rectiligne (parabole) ni uniforme (‖@v‖ augmente).</li><li>4-5. $a_x = 0, $a_y = −10 m·s⁻² : vertical, vers le bas, 10 m·s⁻².</li><li>6. @a = @g : chute libre.</li><li>7. Profondeur : 20 m.</li></ul>',
    traps: [
      'Dire que le mouvement est rectiligne parce que chaque coordonnée évolue sur un axe : c’est la trajectoire entière qu’il faut regarder, ici une parabole.',
      'Confondre « uniforme sur $x » ($v_x constant) et « mouvement uniforme » (‖@v‖ constante).',
      'Donner une profondeur négative : $y(2) = −20 m est une coordonnée ; la profondeur vaut 20 m.'],
    official: true
  });

  /* =====================================================================
     TD 2 — Équilibre et 2e loi de Newton (corrigé officiel : Corrections TD/12)
     ===================================================================== */
  add({
    id: 'td2-ex1', exam: null, kind: 'td', order: 21, src: 'TD 2 · Ex 1', title: 'Schéma des forces',
    topics: ['forces'], lvl: 1, time: 10,
    intro: '<p>Schématiser chacune des situations suivantes en ajoutant les vecteurs représentant les forces qui s’exercent sur le système étudié.</p>',
    questions: [
      '<b>1.</b> Un livre immobile sur une table',
      '<b>2.</b> Une bille attachée à un fil, qui se balance en ayant une trajectoire circulaire',
      '<b>3.</b> Un ballon qui flotte sur l’eau',
      '<b>4.</b> Un ballon maintenu immobile sous l’eau par une personne'],
    hints: [
      'Le système est un point (mécanique du point) : dessine une croix et fais partir chaque force de cette croix.',
      'Fais la liste des actions : la Terre (le poids, toujours), puis chaque objet en contact avec le système (table, fil, eau, main). Pas de contact, pas de force (sauf le poids).',
      'Système immobile : la somme des forces est nulle, les flèches se compensent. La bille qui se balance n’est pas à l’équilibre.'],
    solution: [
      { t: 'Schémas', html: fig(figFour(), 'Chaque système est un point, chaque flèche une force. En 4, les deux forces vers le bas sont légèrement décalées pour rester lisibles : elles s’appliquent au même point.') +
        '<ol><li>Livre : poids @P (vertical, vers le bas) et réaction de la table @R (perpendiculaire à la table, vers le haut).</li>' +
        '<li>Bille : poids @P et tension du fil @T (le long du fil, de la bille vers le point d’attache). Frottements de l’air négligés.</li>' +
        '<li>Ballon qui flotte : poids @P et poussée d’Archimède @P_A (verticale, vers le haut), exercée par l’eau.</li>' +
        '<li>Ballon sous l’eau : poids @P, poussée d’Archimède @P_A vers le haut et force de la main @F_{main} vers le bas.</li></ol>' },
      { t: 'Équilibre ou pas', html: '<p>« Les situations d’équilibre se traduisent par une somme vectorielle nulle » (corrigé officiel) :</p>' +
        '<ul><li>1 : @P + @R = @0, donc $R = $P.</li><li>3 : @P + @P_A = @0, donc $P_A = $P.</li><li>4 : @P + @P_A + @F_{main} = @0, donc $P_A = $P + $F_{main} : la poussée d’Archimède dépasse le poids, c’est pourquoi il faut tenir le ballon.</li>' +
        '<li>2 : la bille n’est pas à l’équilibre (la direction de sa vitesse change) : @P + @T ≠ @0.</li></ul>' +
        '<p class="sol-note">La poussée d’Archimède n’est pas dans le cours ; elle figure dans le corrigé officiel. C’est la force verticale, vers le haut, qu’un fluide exerce sur un objet immergé.</p>' }],
    answer: '<p>1. @P, @R · 2. @P, @T · 3. @P, @P_A · 4. @P, @P_A, @F_{main}.</p>',
    traps: [
      'Ajouter une « force du mouvement » dans le sens de la vitesse (bille) : une force vient toujours d’un objet qui agit sur le système.',
      'Dessiner la tension du fil vers le bas : @T tire la bille vers le point d’attache.',
      'Dessiner @R et @P de longueurs différentes pour le livre immobile : à l’équilibre, elles se compensent.'],
    official: true
  });

  add({
    id: 'td2-ex2', exam: null, kind: 'td', order: 22, src: 'TD 2 · Ex 2', title: 'Détermination de force à l’équilibre',
    topics: ['forces', 'newton', 'plan-incline'], lvl: 2, time: 20,
    intro: '<p>Un robot ayant une masse de m est posé au point B sur une pente telle que $α = 30°.</p>',
    figs: [{ svg: figSlope1(), cap: 'Schéma 1 : vue d’ensemble' }, { svg: figSlope2(), cap: 'Schéma 2 : zoom' }],
    questions: [
      '<b>1.</b> Ajouter sur le schéma 1 les forces subies par le robot : poids, réaction du support et frottements avec le sol (qui s’oppose au mouvement) sachant qu’il reste immobile',
      '<b>2.</b> Recommencer le schéma 2, en décomposant les vecteurs afin qu’ils soient orientés selon les vecteurs de la base.',
      '<b>3.</b> Donner l’expression du poids @P en fonction de m, g et $α.',
      '<b>4.</b> En utilisant le principe fondamental de la dynamique, donner l’expression de la force de réaction @R et de la force de frottement @f en fonction de m, g et $α.'],
    hints: [
      '@P est vertical ; @R est perpendiculaire à la pente ; le frottement est parallèle à la pente et empêche le robot de glisser vers le bas.',
      'La base est inclinée : @u_x descend le long de la pente, @u_y lui est perpendiculaire. L’angle entre @P et −@u_y vaut $α (côtés perpendiculaires deux à deux). Le côté opposé à $α porte le sinus.',
      'Robot immobile : @a = @0, donc @P + @R + @f = @0. Projette cette égalité sur $x puis sur $y.'],
    solution: [
      { t: 'Questions 1 et 2 · schéma et décomposition', html: fig(figSlopeForces(), 'Forces sur le robot en B et décomposition du poids dans la base (@u_x, @u_y).') +
        '<ul><li>@P : vertical, vers le bas.</li><li>@R : perpendiculaire à la pente, vers le haut (réaction normale).</li><li>@f : parallèle à la pente, vers le haut de la pente : sans lui, le robot glisserait vers le bas.</li></ul>' +
        '<p>On décompose le poids avec la relation de Chasles : @P = @P_x + @P_y, avec @P_x le long de la pente (vers le bas, selon @u_x) et @P_y perpendiculaire à la pente (selon −@u_y). @R et @f sont déjà portés par les axes.</p>' },
      { t: 'Question 3 · expression du poids', html: '<p>L’angle entre @P (vertical) et la normale à la pente vaut $α : ces deux angles ont leurs côtés perpendiculaires deux à deux (la verticale est perpendiculaire à l’horizontale, la normale à la pente). Dans le triangle rectangle de la décomposition, $P_x est le côté opposé à $α et $P_y le côté adjacent :</p>' +
        eq('@P = $m @g = ' + col('$m$g sin$α', '−$m$g cos$α'), '@P = $m$g sin$α @u_x − $m$g cos$α @u_y') },
      { t: 'Question 4 · réaction et frottement', html: '<p>Système : le robot (point matériel). Référentiel terrestre, supposé galiléen. Le robot reste immobile : @a = @0. La 2e loi de Newton (PFD) donne :</p>' + eq('@P + @R + @f = $m @a = @0') +
        '<p>Avec @R = $R @u_y et @f = $f @u_x ($f est une composante, de signe inconnu) :</p>' + eq(col('$m$g sin$α', '−$m$g cos$α') + ' + ' + col('0', '$R') + ' + ' + col('$f', '0') + ' = ' + col('0', '0')) +
        '<p>Sur $x : $m$g sin$α + $f = 0, donc $f = −$m$g sin$α. Sur $y : −$m$g cos$α + $R = 0, donc $R = $m$g cos$α.</p>' + eq('@R = $m$g cos$α @u_y', '@f = −$m$g sin$α @u_x') +
        '<p>@f est dirigé vers le haut de la pente (signe −), de norme $m$g sin$α. Avec $α = 30° : $R = (√3/2) $m$g ≈ 0,87 $m$g et ‖@f‖ = $m$g/2.</p>' }],
    answer: '<p>@P = ($m$g sin$α ; −$m$g cos$α) ; @R = $m$g cos$α @u_y ; @f = −$m$g sin$α @u_x (norme $m$g sin$α, vers le haut de la pente). Pour $α = 30° : $R ≈ 0,87 $m$g, ‖@f‖ = 0,5 $m$g.</p>',
    traps: [
      'Échanger sinus et cosinus : la composante le long de la pente vaut $m$g sin$α (elle s’annule quand la pente est plate, $α = 0).',
      'Écrire $R = $m$g : sur une pente, la réaction ne compense que la composante normale du poids, $m$g cos$α.',
      'Dessiner @R vertical : la réaction du support est perpendiculaire au support.',
      'Lire « $f = −$m$g sin$α » comme une norme négative : c’est la composante sur @u_x ; la norme vaut $m$g sin$α.'],
    official: true
  });

  add({
    id: 'td2-ex3', exam: null, kind: 'td', order: 23, src: 'TD 2 · Ex 3', title: 'Mouvement d’un robot',
    topics: ['forces', 'newton'], lvl: 2, time: 25,
    intro: '<p>Un robot ayant une masse de <b>m = 10 kg</b> est au point A sur un sol horizontal. Sa vitesse initiale est de 2 m/s. Son moteur exerce une force @F dont la norme vaut <b>50N</b>, parallèle au sol, dirigé vers les x croissants.</p>',
    questions: [
      '<b>Partie I : On considère les frottements négligeables</b><br><b>1.</b> Schématiser le robot ainsi que les forces s’exerçant sur lui.',
      '<b>2.</b> En utilisant le principe fondamental de la dynamique, donner l’expression de l’accélération ainsi que sa valeur.',
      '<b>3.</b> En déduire l’expression de sa vitesse.',
      '<b>4.</b> En déduire l’expression de sa position.',
      '<b>5.</b> Combien de mètres parcourt-il en une minute ?',
      '<b>Partie II : Les frottements ne sont plus négligés</b><br>Les frottements sont modélisés de la manière suivante : @f = −$α @v, avec @v la vitesse du système et $α un coefficient de proportionnalité valant 0,5 S.I. (Système International d’unité)<br><b>1.</b> Comment le signe «−» présent dans la formule de la force de frottement.',
      '<b>2.</b> Quelle est l’unité du coefficient de proportionnalité ?',
      'En raison de la forme de la force de frottement, lorsque la vitesse du robot augmente, la norme de la force de frottement augmente également. Le robot accélère donc de moins en moins, jusqu’à ce que son accélération devienne nulle. Le mouvement du robot devient alors uniforme, avec une vitesse maximale constante.<br><b>3.</b> À cette vitesse maximale, que peut-on dire de l’accélération et des forces qui s’exercent sur le robot ? Utiliser le principe fondamental de la dynamique pour déterminer la vitesse maximale $v_{max} que le robot peut atteindre.'],
    hints: [
      'Forces : poids, réaction du sol, force du moteur. Le sol est horizontal et le robot ne décolle pas : $a_y = 0.',
      'Accélération constante : intègre deux fois ; les constantes sont $v(0) = 2 m/s et $x(0) = 0 (origine en A, $t = 0 au départ).',
      'Partie II : unité de $α par homogénéité ([$f] = N = kg·m·s⁻²). À la vitesse maximale, la vitesse ne change plus : que vaut @a ?'],
    solution: [
      { t: 'Partie I · question 1 · schéma', html: fig(figRobot(), 'Le robot (un point) : poids, réaction du sol, force du moteur ; en partie II s’ajoute le frottement @f (pointillés), opposé à @v.') +
        '<p>@P vertical vers le bas, @R vertical vers le haut (sol horizontal), @F horizontal vers les $x croissants.</p>' },
      { t: 'Partie I · question 2 · accélération', html: '<p>Système : le robot. Référentiel terrestre, supposé galiléen. Repère : @u_x horizontal dans le sens de @F, @u_y vertical vers le haut, origine en A ; $t = 0 au point A.</p><p>2e loi de Newton (PFD) :</p>' +
        eq('@P + @R + @F = $m @a') + eq(col('0', '−$m$g') + ' + ' + col('0', '$R') + ' + ' + col('$F', '0') + ' = ' + col('$m$a_x', '$m$a_y')) +
        '<p>Le robot reste au sol : $a_y = 0, donc $R = $m$g. Sur $x :</p>' + eq('$a_x = ' + fr('$F', '$m') + ' = ' + fr('50', '10') + ' = 5 m·s⁻²') +
        '<p>Pour une même force, l’accélération est d’autant plus faible que la masse est grande : c’est l’inertie.</p>' +
        '<p class="sol-note">Corrigé officiel : sur son schéma, la force verticale vers le haut est étiquetée @P ; c’est @R. Dans sa projection, « P » désigne la composante algébrique du poids, −$m$g.</p>' },
      { t: 'Partie I · question 3 · vitesse', html: eq('$v($t) = ∫ ' + fr('$F', '$m') + ' d$t = ' + fr('$F', '$m') + ' $t + $v(0)', '$v($t) = 5 $t + 2') + '<p>($v en m·s⁻¹, $t en s.)</p>' },
      { t: 'Partie I · question 4 · position', html: eq('$x($t) = ' + fr('$F', '2$m') + ' $t² + $v(0) $t + $x(0)', '$x($t) = 2,5 $t² + 2 $t') + '<p>(Origine en A : $x(0) = 0.)</p>' },
      { t: 'Partie I · question 5 · en une minute', html: eq('$x(60) = 2,5 × 60² + 2 × 60', '= 9000 + 120 = 9120 m') +
        '<p>Le robot parcourt <b>9120 m ≈ 9,1 km</b> en une minute. Il roule alors à $v(60) = 302 m·s⁻¹ : sans frottements, la vitesse augmente sans limite.</p>' },
      { t: 'Partie II · question 1 · le signe « − »', html: '<p>(Comprendre : que signifie le signe « − » ?) Il indique que @f est de sens opposé à @v : le frottement s’oppose toujours au mouvement. Sa norme vaut $α$v.</p>' },
      { t: 'Partie II · question 2 · unité de $α', html: '<p>L’équation doit être homogène : [$f] = [$α][$v]. Une force s’exprime en newtons : [$P] = [$m][$g] = kg·m·s⁻².</p>' +
        eq('[$α] = ' + fr('[$f]', '[$v]') + ' = ' + fr('kg·m·s⁻²', 'm·s⁻¹') + ' = kg·s⁻¹') },
      { t: 'Partie II · question 3 · vitesse maximale', html: '<p>À la vitesse maximale, le mouvement est rectiligne uniforme : @v est constant, donc @a = @0. D’après la 2e loi de Newton, la somme des forces est nulle : les forces se compensent.</p>' +
        eq('@P + @R + @F + @f = @0') + '<p>Sur $x : $F − $α$v_{max} = 0, d’où :</p>' + eq('$v_{max} = ' + fr('$F', '$α') + ' = ' + fr('50', '0,5') + ' = 100 m·s⁻¹') + '<p>(Soit 360 km/h.)</p>' }],
    answer: '<ul><li>$a = $F/$m = 5 m·s⁻² ($R = $m$g) ; $v($t) = 5$t + 2 ; $x($t) = 2,5$t² + 2$t ; $x(60) = 9120 m.</li><li>Le « − » : @f opposé à @v ; $α en kg·s⁻¹.</li><li>À $v_{max} : @a = @0, forces compensées, $v_{max} = $F/$α = 100 m·s⁻¹.</li></ul>',
    traps: [
      'Écrire @F = $m@a en oubliant @P et @R : la 2e loi porte sur la somme de toutes les forces (ici @P et @R se compensent).',
      'Oublier la vitesse initiale : $v(0) = 2 m/s donne le terme 2$t dans $x($t).',
      'Donner $α en newtons : par homogénéité, il s’exprime en kg·s⁻¹.',
      'Croire que la force du moteur s’annule à la vitesse maximale : c’est la somme des forces qui est nulle ; le moteur pousse toujours.'],
    official: true
  });

  /* =====================================================================
     TD 3 — Dynamique (corrigé officiel : Corrections TD/13)
     ===================================================================== */
  add({
    id: 'td3-ex1', exam: null, kind: 'td', order: 31, src: 'TD 3 · Ex 1', title: 'Chute libre d’un parachutiste',
    topics: ['newton', 'forces'], lvl: 3, time: 35,
    intro: '<p>On étudie la chute libre d’un parachutiste de masse m=80kg sautant d’une hauteur y(0)= 3000m sans vitesse initiale.</p>',
    figs: [{ svg: figVlim(), cap: 'Courbe de l’énoncé (question 10) : cas des frottements linéaires.' }],
    questions: [
      '<b>a. Etude sans vitesse initiale, sans frottement :</b><br><b>1.</b> Donner le cadre d’étude (référentiel, système étudié, système de coordonnées).',
      '<b>2.</b> En appliquant le PFD, donner l’expression du vecteur l’accélération.',
      '<b>3.</b> Donner l’expression du vecteur vitesse.',
      '<b>4.</b> Donner l’expression du vecteur position.',
      '<b>5.</b> Calculer la durée de la chute.',
      '<b>6.</b> Quelle vitesse atteint l’objet quand il touche le sol. Commenter ce résultat.',
      '<b>b. Etude sans vitesse initiale, avec frottement :</b><br><b>7.</b> En appliquant le PFD, donner l’expression du vecteur l’accélération.',
      '<b>8.</b> Montrer que l’on peut réécrire cette équation de la manière suivante : ' + fr('d$v', 'd$t') + ' + ' + fr('$v', '$τ') + ' = −$g. Que vaut $τ ? Comment se nomme ce type d’équation ?',
      '<b>9.</b> Donner la solution $v($t).',
      '<b>10.</b> On souhaite visualiser la norme de la vitesse en fonction du temps, c’est-à-dire la fonction : |$v($t)| = $g$τ (1 − exp(−$t/$τ)). On obtient la courbe ci-contre :',
      '<b>11.</b> Quelle est la vitesse maximale ? Commenter par rapport à la question 6.'],
    hints: [
      'Axe vertical $y vers le haut, origine au sol : le poids s’écrit −$m$g @u_y. Le PFD donne @a, puis on intègre deux fois avec $v(0) = 0 et $y(0) = 3000 m.',
      'La chute se termine quand $y($T) = 0. Pour la vitesse au sol, distingue la composante $v_y (négative) et la norme (positive).',
      'Avec frottement : @f = −$α @v (modèle du cours). Projette sur @u_y, divise par $m et identifie $τ. Solution : celle de l’équation sans second membre ($A e<sup>−$t/$τ</sup>) plus une solution constante.'],
    solution: [
      { t: 'Question 1 · cadre d’étude', html: '<ul><li>Référentiel : terrestre, supposé galiléen.</li><li>Système : le parachutiste, assimilé à un point matériel de masse $m = 80 kg.</li><li>Système de coordonnées : cartésien, axe (O, @u_y) vertical vers le haut, O au sol ; $t = 0 au moment du saut.</li></ul>' },
      { t: 'Question 2 · accélération', html: '<p>Bilan des forces : le poids seul (frottements négligés). 2e loi de Newton (PFD) :</p>' + eq('Σ@F = $m @a ⇒ @P = $m @a', '$m @g = $m @a ⇒ @a = @g = −$g @u_y') + '<p>L’accélération ne dépend pas de la masse.</p>' },
      { t: 'Question 3 · vitesse', html: eq('$v_y($t) = ∫ −$g d$t = −$g$t + $c_1') + '<p>Sans vitesse initiale, $v_y(0) = 0, donc $c_1 = 0 :</p>' + eq('@v($t) = −$g$t @u_y') },
      { t: 'Question 4 · position', html: eq('$y($t) = ∫ −$g$t d$t = −' + fr('$g$t²', '2') + ' + $c_2') + '<p>$y(0) = 3000 m, donc $c_2 = 3000 m :</p>' + eq('@OM($t) = (3000 − ' + fr('$g$t²', '2') + ') @u_y') },
      { t: 'Question 5 · durée de la chute', html: '<p>Le parachutiste touche le sol à l’instant $T où $y($T) = 0 :</p>' + eq('3000 − ' + fr('$g$T²', '2') + ' = 0 ⇒ $T = ' + sq(fr('6000', '$g')), '$T = ' + sq(fr('6000', '9,81')) + ' ≈ 24,7 s') + '<p>(24,5 s avec $g = 10 m·s⁻².)</p>' },
      { t: 'Question 6 · vitesse au sol', html: eq('$v_y($T) = −$g$T ≈ −242,6 m·s⁻¹') +
        '<p>La vitesse atteinte est la norme : ‖@v‖ ≈ 243 m·s⁻¹, soit environ 873 km/h (on retrouve ' + sq('2$g$h') + ' avec $h = 3000 m).</p>' +
        '<p>Commentaire : c’est irréaliste. Sur 3000 m de chute, on ne peut pas négliger les frottements de l’air : c’est l’objet de la partie b.</p>' +
        '<p class="sol-note">Corrigé officiel : il écrit « $v($t) = −$g$t = 242 m/s ». La composante $v_y vaut −242 m·s⁻¹ (le parachutiste descend) ; 242 m/s est la norme.</p>' },
      { t: 'Question 7 · accélération avec frottement', html: '<p>On prend le modèle du cours (frottement fluide) : @f = −$α @v, opposé à la vitesse. Bilan des forces : @P et @f.</p>' +
        fig(figChute(), 'Pendant la descente, @v est vers le bas : @f = −$α @v est vers le haut.') +
        eq('@P + @f = $m @a', '−$m$g @u_y − $α$v_y @u_y = $m @a', '@a = (−$g − ' + fr('$α', '$m') + ' $v_y) @u_y') +
        '<p>Pendant la chute $v_y &lt; 0, donc −$α$v_y &gt; 0 : la composante du frottement est bien vers le haut.</p>' +
        '<p class="sol-note">Corrigé officiel : sa ligne intermédiaire « $m$g − $α$v = $m$a » perd le signe du poids ; la projection du poids sur @u_y vaut −$m$g, comme dans sa ligne suivante.</p>' },
      { t: 'Question 8 · équation différentielle', html: '<p>Avec $a_y = d$v/d$t (on note $v = $v_y) :</p>' + eq(fr('d$v', 'd$t') + ' = −$g − ' + fr('$α', '$m') + ' $v ⇒ ' + fr('d$v', 'd$t') + ' + ' + fr('$v', '$τ') + ' = −$g', '$τ = ' + fr('$m', '$α')) +
        '<p>$τ s’exprime en secondes ([$m]/[$α] = kg/(kg·s⁻¹) = s) : c’est un temps caractéristique. C’est une <b>équation différentielle linéaire du premier ordre</b>, à coefficients constants, avec un second membre constant (−$g).</p>' },
      { t: 'Question 9 · solution', html: '<p>Solution de l’équation homogène ' + fr('d$v', 'd$t') + ' + ' + fr('$v', '$τ') + ' = 0 : $v_h = $A e<sup>−$t/$τ</sup>.</p>' +
        '<p>Le second membre est constant : on cherche une solution particulière constante $v_p. Alors d$v_p/d$t = 0 et $v_p/$τ = −$g, soit $v_p = −$g$τ.</p>' + eq('$v($t) = $A e<sup>−$t/$τ</sup> − $g$τ') +
        '<p>Condition initiale $v(0) = 0 : $A − $g$τ = 0, donc $A = $g$τ.</p>' + eq('$v($t) = $g$τ (e<sup>−$t/$τ</sup> − 1)') +
        '<p>$v($t) &lt; 0 pour $t &gt; 0 : le parachutiste descend. Sa norme est |$v($t)| = $g$τ (1 − e<sup>−$t/$τ</sup>), la fonction tracée à la question 10.</p>' },
      { t: 'Questions 10 et 11 · vitesse limite', html: '<p>La courbe part de 0 et tend vers une asymptote horizontale : quand $t → ∞, e<sup>−$t/$τ</sup> → 0 et |$v| → $g$τ. Au bout de 3$τ, on est déjà à 95 % de cette valeur.</p>' +
        '<p>Vitesse maximale (vitesse limite), lue sur le graphe :</p>' + eq('$v_{lim} = $g$τ = 69,5 m·s⁻¹') +
        '<p>Soit 250 km/h : bien moins que les 243 m·s⁻¹ de la question 6. C’est normal : les frottements de l’air s’opposent au mouvement. On retrouve $v_{lim} sans résoudre l’équation : à vitesse constante, @a = @0, donc @P + @f = @0 et $m$g = $α$v_{lim}.</p>' +
        '<p>On en déduit (non demandé) $τ = 69,5/9,81 ≈ 7,1 s et $α = $m/$τ ≈ 11,3 kg·s⁻¹.</p>' +
        '<p class="sol-note">Corrigé officiel : il numérote « 10 » la réponse à la question 11 (l’énoncé a 11 questions ; la 10 ne demande que de regarder la courbe).</p>' }],
    answer: '<ul><li>Sans frottement : @a = −$g @u_y ; @v = −$g$t @u_y ; @OM = (3000 − $g$t²/2) @u_y ; $T ≈ 24,7 s ; ‖@v‖ ≈ 243 m·s⁻¹ au sol (irréaliste).</li>' +
      '<li>Avec frottement : @a = (−$g − $α$v_y/$m) @u_y ; $τ = $m/$α ; équation différentielle linéaire du premier ordre ; $v($t) = $g$τ(e<sup>−$t/$τ</sup> − 1) ; $v_{lim} = $g$τ = 69,5 m·s⁻¹.</li></ul>',
    traps: [
      'Écrire @a = +$g @u_y avec un axe vers le haut : le poids est vers le bas, @a = −$g @u_y.',
      'Donner « $v = −242 m/s » comme vitesse atteinte : la composante est négative, la vitesse (norme) est positive.',
      'Oublier la condition initiale dans la solution de l’équation différentielle : la constante $A vient de $v(0) = 0.',
      'Écrire $τ = $α/$m : par homogénéité, $τ = $m/$α est un temps.'],
    official: true
  });

  add({
    id: 'td3-ex2', exam: null, kind: 'td', order: 32, src: 'TD 3 · Ex 2', title: 'Pénalité au rugby',
    topics: ['newton', 'trajectoire', 'tir'], lvl: 2, time: 25,
    intro: '<p>« Au rugby, un joueur marque un but sur coup de pied de pénalité lorsqu’il botte le ballon au-dessus de la barre transversale et entre les poteaux de but de l’équipe adverse ». (Extrait de la règle 2, « règles du jeu » FFR).</p>' +
      '<p>Dans cette étude, le ballon de rugby sera considéré comme un point matériel de centre M et de masse m = 420 g. L’origine du repère (O, x, y) coïncide avec la position du ballon au départ du coup de pied.</p>' +
      '<p>Le ballon est botté par le joueur avec une vitesse initiale @v(0), de norme ‖@v(0)‖ = 23 m·s⁻¹ faisant un angle β=38° avec le sol. On considère que le joueur est parfaitement dans l’axe des poteaux de but de l’équipe adverse à une distance d = 40 m de ceux-ci. La hauteur de la barre transversale est de 3m, celle des poteaux verticaux de 8m. On néglige ici les frottements de l’air sur le ballon.</p>',
    figs: [{ svg: figRugby(), cap: 'Figure de l’énoncé, ici à l’échelle : poteau de 8 m, barre transversale à 3 m, à d = 40 m du point de départ O.' }],
    questions: [
      '<b>1.</b> Donner le cadre d’étude (référentiel, système étudié, système de coordonnées).',
      '<b>2.</b> En appliquant le PFD, donner l’expression du vecteur l’accélération.',
      '<b>3.</b> Donner l’expression du vecteur vitesse.',
      '<b>4.</b> Donner l’expression du vecteur position.',
      '<b>5.</b> Etablir l’équation de la trajectoire, c’est-à-dire, y(x). Quelle est le type de trajectoire ?',
      '<b>6.</b> Le joueur a-t-il marqué le but ?'],
    hints: [
      'Même démarche que la chute libre : bilan des forces (le poids seul), 2e loi de Newton, puis deux intégrations. Les constantes viennent de @v(0) = ($v_0 cos$β ; $v_0 sin$β) et @OM(0) = @0.',
      'Pour $y($x), tire $t de $x($t) et remplace-le dans $y($t).',
      'But marqué si, en $x = $d = 40 m, le ballon est au-dessus de la barre (3 m) et sous le haut des poteaux (8 m).'],
    solution: [
      { t: 'Question 1 · cadre d’étude', html: '<ul><li>Référentiel : terrestre, supposé galiléen.</li><li>Système : le ballon, point matériel M de masse $m = 420 g.</li><li>Système de coordonnées : cartésien, repère (O, @u_x, @u_y), @u_x horizontal vers les poteaux, @u_y vertical vers le haut ; $t = 0 au coup de pied.</li></ul>' },
      { t: 'Question 2 · accélération', html: '<p>Frottements de l’air négligés : le poids est la seule force. 2e loi de Newton (PFD) :</p>' + eq('@P = $m @a ⇒ $m @g = $m @a', '@a = @g = ' + col('0', '−$g')) },
      { t: 'Question 3 · vitesse', html: '<p>On intègre chaque composante ; les constantes sont les composantes de la vitesse initiale, $v_0 cos$β et $v_0 sin$β :</p>' + eq('@v($t) = ' + col('$v_0 cos$β', '−$g$t + $v_0 sin$β')) },
      { t: 'Question 4 · position', html: '<p>On intègre encore ; @OM(0) = @0 (origine au point de départ) :</p>' + eq('@OM($t) = ' + col('$v_0 $t cos$β', '−' + fr('$g$t²', '2') + ' + $v_0 $t sin$β')) },
      { t: 'Question 5 · trajectoire', html: '<p>De $x($t) : $t = ' + fr('$x', '$v_0 cos$β') + '. On remplace dans $y($t) :</p>' + eq('$y($x) = −' + fr('$g$x²', '2 $v_0² cos²$β') + ' + $x tan$β') + '<p>C’est une <b>parabole</b> (tournée vers le bas).</p>' },
      { t: 'Question 6 · but ?', html: '<p>Au niveau des poteaux, $x = $d = 40 m (avec $g = 9,81 m·s⁻²) :</p>' +
        eq('$y(40) = −' + fr('9,81 × 40²', '2 × 23² × cos²38°') + ' + 40 tan 38°', '$y(40) ≈ −23,9 + 31,3 ≈ 7,36 m') +
        '<p>3 m &lt; 7,36 m &lt; 8 m : le ballon passe au-dessus de la barre transversale et sous le haut des poteaux, dans l’axe. <b>Le but est marqué.</b></p>' +
        fig(figRugby({ traj: true }), 'Trajectoire à l’échelle : sommet en $x_S ≈ 26,2 m, à $y_S ≈ 10,2 m ; le ballon redescend quand il passe les poteaux, à 7,36 m de haut.') +
        '<p>Avec $g = 10 m·s⁻², on trouve 6,90 m : même conclusion.</p>' +
        '<p class="sol-note">Le corrigé officiel s’arrête à « $y(40) ≈ 7,36 m » et ne vérifie pas que le ballon passe sous le haut des poteaux (8 m).</p>' }],
    answer: '<ul><li>@a = @g = (0 ; −$g) ; @v = ($v_0 cos$β ; −$g$t + $v_0 sin$β) ; @OM = ($v_0$t cos$β ; −$g$t²/2 + $v_0$t sin$β).</li><li>$y($x) = −$g$x²/(2$v_0² cos²$β) + $x tan$β : parabole.</li><li>$y(40) ≈ 7,36 m, entre 3 m et 8 m : but marqué.</li></ul>',
    traps: [
      'Mal projeter la vitesse initiale : $v_x(0) = $v_0 cos$β, $v_y(0) = $v_0 sin$β (le cosinus va avec l’angle mesuré depuis l’horizontale).',
      'Calculatrice en radians : cos 38° ≈ 0,788 seulement en degrés.',
      'Conclure avec « 7,36 m &gt; 3 m » seulement : il faut aussi rester sous le haut des poteaux (8 m).',
      'Chercher à utiliser la masse (420 g) : elle se simplifie dans la 2e loi de Newton.'],
    official: true
  });

  /* =====================================================================
     TD 4 — Étude énergétique (pas de corrigé officiel)
     ===================================================================== */
  var TAB_E = ['', 'y(0) = h', 'y(t) = 0'];
  add({
    id: 'td4-ex1', exam: null, kind: 'td', order: 41, src: 'TD 4 · Ex 1', title: 'Chute libre : énergie',
    topics: ['energie'], lvl: 1, time: 10,
    intro: '<p>Une balle de masse <b>m</b> est lâchée sans vitesse initiale d’une hauteur y(0) = <b>h</b>. On étudie son mouvement en négligeant les frottements jusqu’à ce qu’elle tombe sur le sol où l’on notera sa vitesse $v_{sol}.</p>',
    questions: [
      '<b>1.</b> Compléter le tableau suivant en donnant l’expression des énergies à l’instant initial et au moment où il touche le sol :' + tbl(TAB_E, [['Energie cinétique', '', ''], ['Energie potentielle.', '', '']]),
      '<b>2.</b> En utilisant le théorème de l’énergie mécanique, retrouver l’expression de $v_{sol}. Justifier le fait que l’on puisse utiliser ce théorème.',
      '<b>3.</b> En utilisant le théorème de l’énergie cinétique, retrouver l’expression de $v_{sol}.'],
    hints: [
      'Énergie cinétique : $E_c = ½ $m$v² ; énergie potentielle de pesanteur : $E_p = $m$g$y, nulle au sol.',
      'Le théorème de l’énergie mécanique s’applique quand les seules forces qui travaillent sont conservatives. Quelles forces s’exercent sur la balle ?',
      'Théorème de l’énergie cinétique : $E_c(sol) − $E_c(0) = $W(@P). Le travail du poids vaut $m$g × (hauteur descendue).'],
    solution: [
      { t: 'Question 1 · tableau des énergies', html: '<p>Axe $y vertical vers le haut, origine de l’énergie potentielle au sol ($E_p = $m$g$y).</p>' +
        tbl(TAB_E, [['Énergie cinétique', '0 (lâchée sans vitesse)', '½ $m $v_{sol}²'], ['Énergie potentielle', '$m$g$h', '0']]) },
      { t: 'Question 2 · énergie mécanique', html: '<p>Système : la balle. Référentiel terrestre, supposé galiléen. Forces : le poids seul (frottements négligés). Le poids est une force conservative : l’énergie mécanique $E_M = $E_c + $E_p se conserve.</p>' +
        eq('$E_M(0) = $E_M(sol)', '0 + $m$g$h = ½ $m $v_{sol}² + 0', '$v_{sol} = ' + sq('2$g$h')) },
      { t: 'Question 3 · énergie cinétique', html: '<p>Théorème de l’énergie cinétique entre le lâcher et le sol : la variation d’énergie cinétique est égale à la somme des travaux des forces, ici le seul travail du poids. La balle descend de $h : $W(@P) = $m$g$h &gt; 0 (travail moteur).</p>' +
        eq('½ $m $v_{sol}² − 0 = $m$g$h', '$v_{sol} = ' + sq('2$g$h')) + '<p>Les deux théorèmes donnent le même résultat : pour le poids, $W(@P) = −Δ$E_p.</p>' }],
    answer: '<p>En $y = $h : $E_c = 0, $E_p = $m$g$h. Au sol : $E_c = ½ $m $v_{sol}², $E_p = 0. Seul le poids (conservatif) travaille : $v_{sol} = ' + sq('2$g$h') + ' par les deux théorèmes.</p>',
    traps: [
      'Écrire $v_{sol} = 2$g$h : n’oublie pas la racine (vérifie l’unité : ' + sq('m·s⁻² × m') + ' = m·s⁻¹).',
      'Mettre $E_c = $m$g$h au départ : la balle est lâchée sans vitesse, $E_c(0) = 0.',
      'Appliquer la conservation de l’énergie mécanique sans la justifier : il faut dire que seul le poids, force conservative, travaille.'],
    official: false, note: NOTE
  });

  add({
    id: 'td4-ex2', exam: null, kind: 'td', order: 42, src: 'TD 4 · Ex 2', title: 'Travail d’une force',
    topics: ['travail'], lvl: 1, time: 15,
    figs: [{ svg: figWork(), cap: 'Figure de l’énoncé : M se déplace de A vers B ; @F fait 30° avec la droite (AB), du côté de B.' }],
    questions: [
      '<b>1.</b> À l’aide de la figure ci-dessus, calculer le travail de la force constante @F dont la norme est ‖@F‖ = 3N lors d’un déplacement du point d’application M de A à B.',
      '<b>2.</b> Lors d’un déplacement d’un point A d’altitude $y_A à un point B d’altitude $y_B le travail du poids d’un ballon de masse m = 500 g vaut $W_{AB} = 5,4 J.<br>a. Le ballon monte-t-il ou descend-il lors de ce déplacement ?<br>b. Calculer la différence d’altitude.',
      '<b>3.</b> Un enfant traîne un jouet par l’intermédiaire d’une cordelette qui fait un angle α = 40° avec le sol horizontal de la pièce. Il exerce une traction @T de norme 10 N sur le jouet et parcourt une distance AB = 5,0 m. Calculer le travail $W_{AB}(@T).'],
    hints: [
      'Force constante : $W_{A→B} = @F · @{AB} = $F × AB × cos(angle entre @F et @{AB}). Repère bien le sens de @{AB} (de A vers B) sur la figure.',
      'Travail du poids : $W(@P) = $m$g($y_A − $y_B). Il est positif quand l’objet descend. Masse en kg !',
      'Le jouet glisse sur le sol horizontal : le déplacement est horizontal, et la cordelette fait 40° avec lui.'],
    solution: [
      { t: 'Question 1 · travail de @F', html: '<p>Le déplacement va de A vers B : @{AB} est dirigé vers la gauche, de longueur AB = 50 cm = 0,50 m. Sur la figure, @F fait un angle de 30° avec la droite (AB), du côté de B : l’angle entre @F et @{AB} vaut 30°.</p>' +
        eq('$W_{A→B}(@F) = @F · @{AB} = $F × AB × cos 30°', '= 3 × 0,50 × ' + fr('√3', '2') + ' = 0,75 √3 ≈ 1,3 J') +
        '<p>$W &gt; 0 : le travail est <b>moteur</b> (@F a une composante dans le sens du déplacement).</p>' },
      { t: 'Question 2 · travail du poids', html: '<p><b>a.</b> Travail du poids : $W_{AB}(@P) = $m$g($y_A − $y_B) = 5,4 J &gt; 0, donc $y_A &gt; $y_B : le ballon <b>descend</b> (le poids est moteur).</p>' +
        '<p><b>b.</b> Avec $m = 500 g = 0,500 kg et $g = 10 m·s⁻² :</p>' + eq('$y_A − $y_B = ' + fr('$W_{AB}', '$m$g') + ' = ' + fr('5,4', '0,500 × 10') + ' = 1,08 m') +
        '<p>Le ballon descend d’environ 1,1 m (1,10 m avec $g = 9,81 m·s⁻² : l’exercice ne donne pas $g).</p>' },
      { t: 'Question 3 · travail de la traction', html: '<p>Le jouet se déplace horizontalement de A à B ; @T fait 40° avec le sol, donc avec @{AB} :</p>' +
        eq('$W_{AB}(@T) = $T × AB × cos 40°', '= 10 × 5,0 × 0,766 ≈ 38 J') + '<p>Travail moteur. (cos 40° ≈ 0,766 demande une calculatrice : sans elle, on laisse 50 cos 40° J.)</p>' }],
    answer: '<ul><li>1. $W_{A→B}(@F) = 3 × 0,50 × cos 30° ≈ 1,3 J (moteur).</li><li>2. $W(@P) &gt; 0 : le ballon descend, de 1,08 m (avec $g = 10 m·s⁻²).</li><li>3. $W_{AB}(@T) = 50 cos 40° ≈ 38 J.</li></ul>',
    traps: [
      'Prendre l’angle avec la mauvaise direction : c’est l’angle entre la force et le déplacement @{AB} (de A vers B). Avec 150°, on trouverait −1,3 J.',
      'Oublier de convertir : 50 cm = 0,50 m, 500 g = 0,500 kg.',
      'Se tromper de signe pour le poids : $W(@P) &gt; 0 quand l’objet descend.',
      'Écrire $W = $F × AB sans cosinus : seule la composante de la force le long du déplacement travaille.'],
    official: false, note: NOTE
  });

  add({
    id: 'td4-ex3', exam: null, kind: 'td', order: 43, src: 'TD 4 · Ex 3', title: 'Robot sur un plan incliné',
    topics: ['travail', 'energie', 'plan-incline'], lvl: 3, time: 30,
    intro: '<p>On voudrait déplacer un robot de masse <b>m</b> est du point A avec une vitesse initiale nulle. Il est équipé d’un moteur pouvant exercer une force de poussée dont la norme vaut : ‖@F_p‖ = 250N. Les forces de frottements sont modélisées par une force de norme constante : ‖@f‖ = 50N.</p>' +
      '<p>Données : $α = 30°, $m = 100 kg et $g = 10 m·s⁻², AB=10m, h<sub>c</sub>=20m</p>',
    figs: [{ svg: figRamp(), cap: 'Figure de l’énoncé, redessinée à l’échelle : C est à h<sub>c</sub> = 20 m au-dessus de la route, les deux pentes font $α = 30°.' }],
    questions: [
      '<b>1. Etude sur le trajet AB</b><br>a. Représenter les forces extérieures exercées sur le robot au cours du trajet AB.<br>b. Quelles sont les forces qui travaillent ?<br>c. Utiliser le théorème de l’énergie cinétique entre A et B pour calculer la vitesse du robot',
      '<b>2. Etude sur le trajet BC</b><br>a. Représenter les forces appliquées sur le robot sur le trajet BC.<br>b. Quelles sont les forces qui travaillent ? Quelles sont les forces motrices ? Quelles sont les forces résistantes ?<br>c. On souhaite que le robot puisse atteindre le point C. Son moteur est-il assez puissant ?',
      '<b>3. Etude sur le trajet CD</b><br>Durant les descentes, le robot coupe le moteur afin de ne pas gaspiller d’énergie. Mieux encore, s’il atteint la vitesse de 5 m·s⁻¹ il active un mécanisme stabilisant la vitesse et permettant de transformer le surplus d’énergie gagné en descendant en énergie stockée dans la batterie.<br>a. Calculer l’énergie que le robot est capable de stocker entre C et D.<br>b. Si on revient sur une route horizontale, sur quelle distance l’énergie accumulée durant la phase précédente permet d’activer le moteur ?'],
    hints: [
      'Une force perpendiculaire au déplacement ne travaille pas. Une force constante parallèle au déplacement travaille ±$F × longueur (+ si elle va dans le sens du mouvement).',
      'Sur BC, calcule d’abord la longueur BC = h<sub>c</sub>/sin $α, puis le travail de chaque force ; le poids travaille −$m$g h<sub>c</sub> à la montée. Si le théorème donne une énergie cinétique négative en C, que conclure ?',
      'Partie 3 : l’énoncé ne donne pas la vitesse en C. Prends $v_C = 0, fais le bilan des travaux sur CD, puis retire l’énergie cinétique que le robot garde à 5 m·s⁻¹.'],
    solution: [
      { t: 'Question 1 · trajet AB', html: fig(figRampForces(), 'Forces sur le robot : à gauche sur AB (route horizontale), à droite sur BC (montée). Longueurs non à l’échelle.') +
        '<p><b>a.</b> Sur AB : le poids @P (vertical), la réaction de la route @R (perpendiculaire à la route), la poussée @F_p (dans le sens du mouvement) et le frottement @f (opposé au mouvement).</p>' +
        '<p><b>b.</b> @P et @R sont perpendiculaires au déplacement horizontal : leur travail est nul. Travaillent : @F_p (travail moteur, $F_p × AB) et @f (travail résistant, −$f × AB).</p>' +
        '<p><b>c.</b> Système : le robot ; référentiel terrestre, supposé galiléen. Théorème de l’énergie cinétique entre A ($v_A = 0) et B :</p>' +
        eq('½ $m $v_B² − 0 = $F_p · AB − $f · AB', '= (250 − 50) × 10 = 2000 J', '$v_B = ' + sq(fr('2 × 2000', '100')) + ' = √40 ≈ 6,3 m·s⁻¹') },
      { t: 'Question 2 · trajet BC', html: '<p><b>a.</b> Sur BC : @P (vertical), @R (perpendiculaire à la pente), @F_p (vers le haut de la pente), @f (vers le bas de la pente) : figure ci-dessus, à droite.</p>' +
        '<p><b>b.</b> @R ne travaille pas (perpendiculaire au déplacement). Force motrice : @F_p. Forces résistantes : @P (le robot monte) et @f.</p>' +
        '<p><b>c.</b> Longueur de la pente : BC = h<sub>c</sub>/sin $α = 20/0,5 = 40 m. Travaux de B à C :</p>' +
        eq('$W(@F_p) = 250 × 40 = 10 000 J', '$W(@f) = −50 × 40 = −2000 J', '$W(@P) = −$m$g h<sub>c</sub> = −20 000 J') + '<p>Théorème de l’énergie cinétique de B à C :</p>' +
        eq('½ $m $v_C² = ½ $m $v_B² + Σ$W', '= 2000 + 10 000 − 2000 − 20 000', '= −10 000 J &lt; 0') +
        '<p>Une énergie cinétique ne peut pas être négative : le robot <b>n’atteint pas C</b>, son moteur n’est pas assez puissant. Le long de la pente, $F_p − $f − $m$g sin $α = 250 − 50 − 500 = −300 N : le robot ralentit dès B et s’arrête après 2000/300 ≈ 6,7 m de montée.</p>' +
        '<p>Pour atteindre C, il faudrait (même poussée sur AB et BC, théorème de l’énergie cinétique de A à C avec $v_C ≥ 0) $F_p(AB + BC) − $f(AB + BC) − $m$g h<sub>c</sub> ≥ 0, soit $F_p ≥ 50 + 20 000/50 = 450 N.</p>' },
      { t: 'Question 3 · trajet CD', html: '<p class="sol-note">L’énoncé est incohérent : avec ces données, le robot n’arrive jamais en C (question 2c). La partie 3 suppose pourtant qu’il y arrive, sans donner sa vitesse en C. Lecture retenue : le robot part de C avec une vitesse nulle ($v_C = 0) ; la pente CD fait aussi $α = 30°, donc CD = 40 m.</p>' +
        '<p><b>a.</b> Sur CD, moteur coupé : @P est moteur ($W = +$m$g h<sub>c</sub> = 20 000 J), @f est résistant ($W = −50 × 40 = −2000 J), @R ne travaille pas. Sans le mécanisme, le robot gagnerait 18 000 J d’énergie cinétique. Le mécanisme le maintient à 5 m·s⁻¹ : il garde ½ × 100 × 5² = 1250 J d’énergie cinétique, le reste est stocké.</p>' +
        eq('$E_{stockée} = 20 000 − 2000 − 1250', '= 16 750 J ≈ 1,7 × 10⁴ J') +
        '<p><b>b.</b> Sur route horizontale, le moteur pousse avec $F_p = 250 N ; sur une distance $d il fournit le travail $F_p × $d :</p>' + eq('$d = ' + fr('$E_{stockée}', '$F_p') + ' = ' + fr('16 750', '250') + ' = 67 m') +
        '<p>Autre lecture possible : si le robot roule à vitesse constante, le moteur ne compense que le frottement (50 N) et la distance vaut 16 750/50 = 335 m.</p>' }],
    answer: '<ul><li>AB : @F_p et @f travaillent ; $v_B = √40 ≈ 6,3 m·s⁻¹.</li><li>BC : @F_p motrice, @P et @f résistantes ; ½ $m $v_C² = −10 000 J &lt; 0 : le moteur n’est pas assez puissant (il faudrait $F_p ≥ 450 N).</li><li>CD (avec $v_C = 0) : 16 750 J stockés ; 67 m de moteur à 250 N.</li></ul>',
    traps: [
      'Compter le travail de @R : elle est perpendiculaire au déplacement, son travail est nul.',
      'Prendre BC = h<sub>c</sub> = 20 m : la longueur de la pente vaut h<sub>c</sub>/sin $α = 40 m.',
      'Oublier le signe du travail du poids : à la montée, $W(@P) = −$m$g h<sub>c</sub>.',
      'Écrire $v_C = √(−200) et continuer : $v_C² &lt; 0 veut dire que le robot n’arrive pas en C.',
      'Compter comme stockée l’énergie cinétique que le robot garde à 5 m·s⁻¹.'],
    official: false, note: 'Pas de corrigé officiel : correction rédigée et vérifiée. L’énoncé est incohérent (le robot n’atteint pas C) : la partie 3 est traitée avec l’hypothèse vC = 0.'
  });

  add({
    id: 'td4-ex4', exam: null, kind: 'td', order: 44, src: 'TD 4 · Ex 4', title: 'Mouvement sur un arc de cercle',
    topics: ['energie', 'travail'], lvl: 2, time: 20,
    intro: '<p>Un solide ponctuel de masse m se déplace sur la piste schématisée ci-dessous. La portion AB est un arc de cercle de rayon R, d’angle θ, de centre O ; la portion BC est un segment horizontal. Les frottements sont négligeables sur la partie circulaire. Sur la partie BC les frottements sont assimilables à une force constante colinéaire au vecteur vitesse, de norme $f. On lance le solide du point A avec une vitesse initiale $v_A tangente au cercle</p>' +
      '<p>Données : m = 0,10 kg ; $g = 10 m·s⁻² ; R = 1,6 m ; $v_C = $v_A = 3,0 m·s⁻¹ ; θ = 60° ; BC = 2,0 m</p>',
    figs: [{ svg: figArc(), cap: 'Figure de l’énoncé : O est à la verticale de B, OA = OB = R.' }],
    questions: [
      '<b>1.</b> Sur le trajet AB, comment évoluent l’énergie cinétique et l’énergie potentielle au cours du mouvement. Que peut-on dire de l’énergie mécanique ?',
      '<b>2.</b> On note $h, la différence d’altitude entre les points A et B. Montrer que $h = $R × (1 − cos$θ)',
      '<b>3.</b> Exprimer la vitesse en B notée $v_B en fonction de R, $g, $v_A et θ. Donner sa valeur.',
      '<b>4.</b> Sur le trajet BC, exprimer puis calculer la force de frottement $f en fonction de m, $v_B, $v_C et BC.'],
    hints: [
      'Sur l’arc, la réaction est perpendiculaire à la trajectoire et il n’y a pas de frottement : seul le poids travaille.',
      'Repère les altitudes depuis O : B est à $R sous O ; A est à $R cos$θ sous O (projection de OA sur la verticale).',
      'Conservation de l’énergie mécanique entre A et B (origine de $E_p au niveau de B), puis théorème de l’énergie cinétique sur BC, où seul le frottement travaille.'],
    solution: [
      { t: 'Question 1 · évolution des énergies', html: '<p>De A à B, le solide descend : le poids fait un travail moteur, l’énergie cinétique <b>augmente</b> et l’énergie potentielle <b>diminue</b>. Les frottements sont négligeables et la réaction du support est perpendiculaire à la trajectoire (elle ne travaille pas) : seul le poids, force conservative, travaille. L’énergie mécanique <b>se conserve</b> : ce que perd $E_p, $E_c le gagne.</p>' },
      { t: 'Question 2 · différence d’altitude', html: '<p>Axe vertical vers le haut, d’origine O. B est à la verticale de O, à la distance $R : son altitude est −$R. Le rayon OA fait l’angle $θ avec la verticale OB : la projection de OA sur la verticale vaut $R cos$θ, et l’altitude de A est −$R cos$θ.</p>' +
        eq('$h = $z_A − $z_B = −$R cos$θ − (−$R)', '$h = $R (1 − cos$θ)') + '<p>Application numérique : $h = 1,6 × (1 − 0,5) = 0,80 m.</p>' },
      { t: 'Question 3 · vitesse en B', html: '<p>Conservation de l’énergie mécanique entre A et B, origine de l’énergie potentielle au niveau de B :</p>' +
        eq('½ $m $v_A² + $m$g$h = ½ $m $v_B² + 0', '$v_B = ' + sq('$v_A² + 2$g$R(1 − cos$θ)'), '$v_B = ' + sq('9 + 2 × 10 × 1,6 × 0,5') + ' = √25 = 5,0 m·s⁻¹') },
      { t: 'Question 4 · force de frottement', html: '<p>Sur BC (horizontal) : @P et @R sont perpendiculaires au déplacement, seul le frottement travaille. Il est colinéaire à la vitesse et de sens opposé (c’est un frottement) : $W(@f) = −$f × BC. Théorème de l’énergie cinétique de B à C :</p>' +
        eq('½ $m $v_C² − ½ $m $v_B² = −$f · BC', '$f = ' + fr('$m($v_B² − $v_C²)', '2 BC'), '$f = ' + fr('0,10 × (25 − 9)', '2 × 2,0') + ' = 0,40 N') }],
    answer: '<ul><li>1. $E_c augmente, $E_p diminue, $E_M constante.</li><li>2. $h = $R(1 − cos$θ) = 0,80 m.</li><li>3. $v_B = ' + sq('$v_A² + 2$g$R(1 − cos$θ)') + ' = 5,0 m·s⁻¹.</li><li>4. $f = $m($v_B² − $v_C²)/(2 BC) = 0,40 N.</li></ul>',
    traps: [
      'Prendre $h = $R cos$θ ou $R sin$θ : dessine le triangle, la hauteur de chute vaut $R − $R cos$θ.',
      'Oublier l’énergie cinétique initiale : le solide est lancé, $v_A = 3,0 m·s⁻¹.',
      'Donner un frottement négatif : $f est une norme ; c’est son travail qui est négatif.',
      'Appliquer la conservation de l’énergie mécanique sur BC : avec un frottement, elle diminue.'],
    official: false, note: NOTE
  });

  add({
    id: 'td4-ex5', exam: null, kind: 'td', order: 45, src: 'TD 4 · Ex 5', title: 'Jeu de palet',
    topics: ['energie', 'travail'], lvl: 2, time: 25,
    intro: '<p>Un joueur dispose d’une piste sur laquelle il propulse puis abandonne un palet de masse. La piste située dans un plan vertical est formée d’une partie rectiligne horizontale (AB) raccordée tangentiellement à un arc de cercle (BC), raccordé lui-même à une partie rectiligne inclinée (CD). Le schéma ci-dessous représente la trajectoire suivie par le centre d’inertie G du palet.</p>' +
      '<p>L’épreuve est réussie si G parvient en D, à une hauteur $h au-dessus du plan horizontal qui contient AB.</p>' +
      '<p>Les frottements sont négligés dans tout l’exercice.<br>Une force de propulsion @F, constante, est exercée sur le palet entre les points A et A’, trajet de longueur L.</p>' +
      '<p>Données : $L = 0,50 m ; $h = 1,5 m ; $g = 10 m·s⁻² ; $m = 5,0 kg ; On pose : OC = OB = R ; $v_A = 0 m·s⁻¹</p>',
    figs: [{ svg: figPuck(), cap: 'Figure de l’énoncé : arc BC de centre O et d’angle θ, D à la hauteur h au-dessus de AB.' }],
    questions: [
      '<b>1. Sur le trajet AA’</b><br>a. Représenter les forces extérieures appliquées sur le palet entre A et A’.<br>b. A l’aide du théorème de l’énergie cinétique entre A et A’, déterminer l’expression littérale de la norme de la force @F en fonction de L, m et de la vitesse du palet en A’.',
      '<b>2. Sur le trajet A’B</b>, quelle est la relation entre la vitesse au point B et celle au point A’ ? Justifier votre réponse.',
      '<b>3. Sur le trajet BD</b><br>a. Déterminer, en utilisant le théorème de l’énergie mécanique, l’expression de la vitesse au point B, en fonction de $g et $h, pour que le palet atteigne <b>le point D avec une vitesse nulle.</b><br>b. En déduire l’expression de la norme de la force @F exercée entre A et A’ en fonction de $g, $h, m et L. Faire l’application numérique.',
      '<b>4. Sur le trajet BC</b>, utiliser le théorème d’énergie mécanique pour exprimer la vitesse au point C, en fonction de $g, $h, R et θ.'],
    hints: [
      'Entre A et A’ : poids, réaction de la piste, force de propulsion. Seule @F est parallèle au déplacement.',
      'Sans frottement et sans propulsion, sur une portion horizontale, aucune force ne travaille.',
      'Entre B et D, seul le poids travaille : l’énergie mécanique se conserve. Pour C, même géométrie qu’à l’exercice 4 : C est à $R(1 − cos$θ) au-dessus de B.'],
    solution: [
      { t: 'Question 1 · trajet AA’', html: '<p><b>a.</b> Entre A et A’ : le poids @P (vertical, vers le bas), la réaction de la piste @R (verticale, vers le haut : pas de frottement) et la force de propulsion @F (horizontale, dans le sens du mouvement).</p>' +
        '<p><b>b.</b> @P et @R sont perpendiculaires au déplacement : travail nul. @F est constante et parallèle au déplacement : $W(@F) = $F$L. Théorème de l’énergie cinétique entre A ($v_A = 0) et A’ :</p>' +
        eq('½ $m $v_{A’}² − 0 = $F$L', '$F = ' + fr('$m $v_{A’}²', '2$L')) },
      { t: 'Question 2 · trajet A’B', html: '<p>Entre A’ et B, la piste est horizontale, sans propulsion ni frottement : @P et @R sont perpendiculaires au déplacement, la somme des travaux est nulle. D’après le théorème de l’énergie cinétique, Δ$E_c = 0 :</p>' + eq('$v_B = $v_{A’}') +
        '<p>(Les forces se compensent : le palet a un mouvement rectiligne uniforme, c’est la 1re loi de Newton.)</p>' },
      { t: 'Question 3 · trajet BD', html: '<p><b>a.</b> Entre B et D, seul le poids travaille (@R est perpendiculaire à la trajectoire, pas de frottement) : l’énergie mécanique se conserve. Origine de l’énergie potentielle sur AB ; $v_D = 0 :</p>' +
        eq('½ $m $v_B² + 0 = 0 + $m$g$h', '$v_B = ' + sq('2$g$h') + ' = √30 ≈ 5,5 m·s⁻¹') +
        '<p><b>b.</b> Avec $v_{A’} = $v_B (question 2) :</p>' + eq('$F = ' + fr('$m $v_B²', '2$L') + ' = ' + fr('$m$g$h', '$L'), '$F = ' + fr('5,0 × 10 × 1,5', '0,50') + ' = 150 N') },
      { t: 'Question 4 · vitesse en C', html: '<p>O est à la verticale de B, à la distance $R ; C est sur le cercle, avec l’angle $θ entre OB et OC. Comme à l’exercice 4, C est à la hauteur $R(1 − cos$θ) au-dessus de B. Conservation de l’énergie mécanique entre B et C :</p>' +
        eq('½ $m $v_B² = ½ $m $v_C² + $m$g$R(1 − cos$θ)', '$v_C = ' + sq('$v_B² − 2$g$R(1 − cos$θ)'), '$v_C = ' + sq('2$g($h − $R(1 − cos$θ))')) }],
    answer: '<ul><li>1. @P, @R, @F ; $F = $m $v_{A’}²/(2$L).</li><li>2. $v_B = $v_{A’} (aucune force ne travaille).</li><li>3. $v_B = ' + sq('2$g$h') + ' ≈ 5,5 m·s⁻¹ ; $F = $m$g$h/$L = 150 N.</li><li>4. $v_C = ' + sq('2$g($h − $R(1 − cos$θ))') + '.</li></ul>',
    traps: [
      'Compter le travail de la réaction : sans frottement, elle est perpendiculaire à la piste et ne travaille pas.',
      'Oublier que $v_{A’} = $v_B : c’est ce qui fait passer de la question 3a à la question 3b.',
      'Écrire l’altitude de C avec $R cos$θ : la hauteur de C au-dessus de B vaut $R − $R cos$θ.',
      'Chercher la masse dans la première phrase (« un palet de masse. ») : elle est dans les données, $m = 5,0 kg, et sert seulement à l’application numérique de $F.'],
    official: false, note: NOTE
  });

  /* =====================================================================
     TD 5 — Cinématique en polaire (pas de corrigé officiel)
     ===================================================================== */
  add({
    id: 'td5-ex1', exam: null, kind: 'td', order: 51, src: 'TD 5 · Ex 1', title: 'Base polaire',
    topics: ['polaire'], lvl: 2, time: 15,
    figs: [{ svg: figPolar(), cap: 'Schéma de l’énoncé : M repéré par r = OM et par l’angle θ.' }],
    questions: [
      '<b>1.</b> Compléter le schéma ci-contre en ajoutant les vecteurs de la base polaire.',
      '<b>2.</b> Donner l’expression du vecteur position dans la base polaire.',
      '<b>3.</b> Quelle relation mathématique permet de relier la position à la vitesse ? L’exploiter afin de retrouver l’expression du vecteur vitesse.',
      '<b>4.</b> Même question pour l’accélération.'],
    hints: [
      '@u_r part de M dans le sens de O vers M ; @u_θ s’obtient en tournant @u_r de +π/2 (sens direct, celui des $θ croissants).',
      'Le vecteur position n’a qu’une composante, sur @u_r. Pour la vitesse, dérive @OM = $r @u_r comme un produit : @u_r dépend du temps par $θ.',
      'Exprime @u_r et @u_θ dans la base cartésienne (fixe) pour les dériver : d@u_r/d$t = ' + thd + ' @u_θ et d@u_θ/d$t = −' + thd + ' @u_r.'],
    solution: [
      { t: 'Question 1 · base polaire', html: fig(figPolar({ base: true }), 'Base polaire en M : @u_r selon @OM, @u_θ tourné de +π/2.') +
        '<p>@u_r : vecteur unitaire porté par (OM), dirigé de O vers M (@u_r = @OM/‖@OM‖). @u_θ : vecteur unitaire perpendiculaire, obtenu en tournant @u_r de +π/2 (sens des $θ croissants). Dans la base cartésienne :</p>' +
        eq('@u_r = cos$θ @u_x + sin$θ @u_y', '@u_θ = −sin$θ @u_x + cos$θ @u_y') + '<p>Cette base est mobile : elle tourne avec M.</p>' },
      { t: 'Question 2 · vecteur position', html: eq('@OM = $r @u_r') + '<p>Pas de composante sur @u_θ : par définition, @u_r pointe vers M.</p>' },
      { t: 'Question 3 · vecteur vitesse', html: '<p>La vitesse est la dérivée du vecteur position par rapport au temps : @v = d@OM/d$t. On dérive le produit $r @u_r :</p>' +
        eq('@v = ' + rd + ' @u_r + $r ' + fr('d@u_r', 'd$t')) + '<p>@u_r dépend du temps par $θ($t) :</p>' +
        eq(fr('d@u_r', 'd$t') + ' = ' + fr('d@u_r', 'd$θ') + ' ' + thd, '= ' + thd + ' (−sin$θ @u_x + cos$θ @u_y) = ' + thd + ' @u_θ') + eq('@v = ' + rd + ' @u_r + $r' + thd + ' @u_θ') },
      { t: 'Question 4 · vecteur accélération', html: '<p>L’accélération est la dérivée de la vitesse : @a = d@v/d$t. De même, d@u_θ/d$t = ' + thd + ' (−cos$θ @u_x − sin$θ @u_y) = −' + thd + ' @u_r. On dérive chaque produit :</p>' +
        eq('@a = ' + rdd + ' @u_r + ' + rd + ' ' + thd + ' @u_θ', '+ (' + rd + ' ' + thd + ' + $r' + thdd + ') @u_θ + $r' + thd + ' (−' + thd + ' @u_r)') +
        eq('@a = ($r̈ − $r' + thd + '²) @u_r', '+ (2' + rd + thd + ' + $r' + thdd + ') @u_θ') }],
    answer: '<ul><li>@u_r = cos$θ @u_x + sin$θ @u_y ; @u_θ = −sin$θ @u_x + cos$θ @u_y.</li><li>@OM = $r @u_r.</li><li>@v = ' + rd + ' @u_r + $r' + thd + ' @u_θ.</li><li>@a = (' + rdd + ' − $r' + thd + '²) @u_r + (2' + rd + thd + ' + $r' + thdd + ') @u_θ.</li></ul>',
    traps: [
      'Écrire @OM = $r @u_r + $θ @u_θ : le vecteur position n’a pas de composante sur @u_θ (et $θ est un angle, pas une longueur).',
      'Oublier que @u_r et @u_θ tournent : on obtiendrait @v = ' + rd + ' @u_r, faux pour un mouvement circulaire.',
      'Se tromper de signe dans @u_θ : c’est −sin$θ @u_x + cos$θ @u_y (pour $θ = 0, @u_θ = @u_y).',
      'Oublier le facteur 2 devant ' + rd + thd + ' : il vient de deux termes ' + rd + thd + ' @u_θ.'],
    official: false, note: NOTE
  });

  add({
    id: 'td5-ex2', exam: null, kind: 'td', order: 52, src: 'TD 5 · Ex 2', title: 'Mouvement d’un manège',
    topics: ['polaire', 'circulaire', 'nature'], lvl: 2, time: 25,
    intro: '<p>Dans le plan rapporté à un repère orthonormé (Oxy), les coordonnées du cheval en bois d’un manège, assimilé à un point matériel M, sont définies en fonction du temps par les équations dites paramétriques suivantes :</p>' +
      eq('$x($t) = $r_0 cos($ω$t)', '$y($t) = $r_0 sin($ω$t)'),
    questions: [
      '<b>1.</b> Quelles sont les unités des constantes $r_0 et $ω ?',
      '<b>2.</b> Sur un schéma, représenter les vecteurs de la base polaire pour une position quelconque du point matériel. Y indiquer les coordonnées associées ainsi que le vecteur position @OM.',
      '<b>3.</b> Définir le vecteur position @OM($t) dans la base polaire puis l’exprimer en fonction des données de l’exercice.',
      '<b>4.</b> Pour un instant t quelconque, déterminer l’expression du vecteur vitesse @v dans la base polaire.',
      '<b>5.</b> En déduire sa norme ‖@v‖ et vérifier l’homogénéité du résultat obtenu.',
      '<b>6.</b> Montrer qu’en coordonnées cartésiennes le vecteur vitesse s’écrit : @v = −$r_0 sin($ω$t) @u_x + $r_0 cos($ω$t) @u_y. Calculer sa norme et en déduire le lien entre $ω et la vitesse angulaire ' + thd + '.',
      '<b>7.</b> En déduire la nature du mouvement du point matériel.',
      '<b>8.</b> Déterminer les composantes du vecteur accélération @a dans la base polaire, calculer sa norme et préciser l’orientation de ce vecteur.'],
    hints: [
      'Identifie $x = $r cos$θ et $y = $r sin$θ : que valent $r et $θ ici ?',
      'Avec $r constant, ' + rd + ' = ' + rdd + ' = 0 : il ne reste que $r' + thd + ' (vitesse) et −$r' + thd + '² (accélération), plus $r' + thdd + ' si ' + thd + ' varie.',
      'Question 6 : dérive $x($t) et $y($t) ; la dérivée de cos($ω$t) est −$ω sin($ω$t). Compare avec l’expression de l’énoncé.'],
    solution: [
      { t: 'Question 1 · unités', html: '<p>$x est une longueur et cos($ω$t) est sans dimension : $r_0 s’exprime en <b>mètres</b>. L’argument d’un cosinus est un angle (en radians, sans dimension) : $ω$t en rad, donc $ω en <b>rad·s⁻¹</b>.</p>' },
      { t: 'Question 2 · schéma', html: fig(figManege(), 'M sur le cercle de rayon $r_0 : coordonnées polaires ($r, $θ), vecteur position @OM et base (@u_r, @u_θ) en M.') +
        '<p>@u_r part de M dans le sens de @OM ; @u_θ est tangent au cercle, tourné de +π/2. Les coordonnées polaires de M sont $r = OM et $θ, l’angle entre @u_x et @OM.</p>' },
      { t: 'Question 3 · vecteur position', html: '<p>Définition : @OM = $r @u_r, avec $r = OM. Ici $x et $y ont la forme $x = $r cos$θ, $y = $r sin$θ avec :</p>' +
        eq('$r = ' + sq('$x² + $y²') + ' = $r_0   et   $θ = $ω$t', '@OM($t) = $r_0 @u_r') + '<p>(@u_r tourne avec M : il dépend de $t par $θ = $ω$t.)</p>' },
      { t: 'Question 4 · vecteur vitesse', html: '<p>$r = $r_0 constant : ' + rd + ' = 0. $θ = $ω$t : ' + thd + ' = $ω. Avec @v = ' + rd + ' @u_r + $r' + thd + ' @u_θ :</p>' + eq('@v = $r_0 $ω @u_θ') },
      { t: 'Question 5 · norme et homogénéité', html: eq('‖@v‖ = $r_0 $ω') + '<p>Homogénéité : [$r_0 $ω] = m × rad·s⁻¹ = m·s⁻¹ (le radian est sans dimension) : c’est bien une vitesse.</p>' },
      { t: 'Question 6 · en cartésien', html: '<p class="sol-note">L’expression de l’énoncé contient une erreur : il manque le facteur $ω. Telle qu’elle est écrite, $r_0 sin($ω$t) est en mètres, pas en m·s⁻¹ : elle n’est pas homogène à une vitesse. Lecture retenue : on montre l’expression corrigée.</p><p>On dérive les coordonnées :</p>' +
        eq('$v_x = ' + fr('d$x', 'd$t') + ' = −$r_0 $ω sin($ω$t)', '$v_y = ' + fr('d$y', 'd$t') + ' = $r_0 $ω cos($ω$t)') +
        eq('@v = −$r_0 $ω sin($ω$t) @u_x', '+ $r_0 $ω cos($ω$t) @u_y') + '<p>Norme :</p>' +
        eq('‖@v‖ = $r_0 $ω ' + sq('sin²($ω$t) + cos²($ω$t)') + ' = $r_0 $ω') +
        '<p>En polaire, ‖@v‖ = $r_0 |' + thd + '|. Les deux normes sont égales et $θ = $ω$t augmente : <b>' + thd + ' = $ω</b>. La vitesse angulaire est la constante $ω.</p>' +
        '<p>Remarque : @v = $r_0$ω (−sin$θ @u_x + cos$θ @u_y) = $r_0$ω @u_θ, on retrouve la question 4.</p>' },
      { t: 'Question 7 · nature du mouvement', html: '<p>$r = $r_0 est constant : la trajectoire est un cercle de centre O et de rayon $r_0. ‖@v‖ = $r_0$ω est constante : le mouvement est uniforme. C’est un <b>mouvement circulaire uniforme</b>.</p>' },
      { t: 'Question 8 · vecteur accélération', html: '<p>Avec ' + rd + ' = ' + rdd + ' = 0 et ' + thdd + ' = 0 (' + thd + ' = $ω constante) :</p>' +
        eq('@a = ($r̈ − $r' + thd + '²) @u_r + (2' + rd + thd + ' + $r' + thdd + ') @u_θ', '@a = −$r_0 $ω² @u_r', '‖@a‖ = $r_0 $ω²') +
        fig(figManege({ kin: true }), 'Mouvement circulaire uniforme : @v tangent au cercle, @a dirigé vers le centre O.') +
        '<p>@a est dirigée selon −@u_r, de M vers le centre O : l’accélération est <b>centripète</b>. Elle n’est pas nulle bien que le mouvement soit uniforme : la direction de @v change sans cesse. (On peut aussi écrire @a = −$ω² @OM.)</p>' }],
    answer: '<ul><li>1. $r_0 en m, $ω en rad·s⁻¹.</li><li>3. @OM = $r_0 @u_r ($r = $r_0, $θ = $ω$t).</li><li>4-5. @v = $r_0$ω @u_θ, ‖@v‖ = $r_0$ω (m·s⁻¹).</li><li>6. @v = −$r_0$ω sin($ω$t) @u_x + $r_0$ω cos($ω$t) @u_y (facteur $ω oublié par l’énoncé) ; ' + thd + ' = $ω.</li><li>7. Mouvement circulaire uniforme.</li><li>8. @a = −$r_0$ω² @u_r, ‖@a‖ = $r_0$ω², centripète.</li></ul>',
    traps: [
      '« Uniforme » ne veut pas dire « accélération nulle » : en mouvement circulaire uniforme, @a = −$r_0$ω² @u_r ≠ @0.',
      'Recopier l’expression de l’énoncé à la question 6 sans vérifier l’homogénéité : il manque le facteur $ω.',
      'Donner $ω en rad (ou en degrés) : c’est une vitesse angulaire, en rad·s⁻¹.',
      'Écrire @OM = $r_0 @u_r + $ω$t @u_θ : pas de composante sur @u_θ.'],
    official: false, note: 'Pas de corrigé officiel : correction rédigée et vérifiée. L’énoncé de la question 6 oublie le facteur ω dans v⃗ : la fiche montre l’expression corrigée.'
  });

  add({
    id: 'td5-ex3', exam: null, kind: 'td', order: 53, src: 'TD 5 · Ex 3', title: 'Mouvement d’un satellite',
    topics: ['polaire', 'circulaire', 'newton'], lvl: 3, time: 30,
    intro: '<p>Un satellite de masse m = 300 kg se déplace sur une orbite circulaire autour de la Terre à une hauteur h = 6400 km du sol terrestre. Le rayon terrestre vaut R<sub>T</sub> = 6400 km. Au temps t, il est localisé au point M de coordonnées polaires (r, θ) comme le montre la figure. L’origine des axes O se situe au centre de la Terre.</p>',
    figs: [{ svg: figSat(), cap: 'Figure de l’énoncé : orbite circulaire de rayon $r = R<sub>T</sub> + $h autour du centre O de la Terre.' }],
    questions: [
      '<b>1.</b> Donner l’expression du vecteur position @OM en coordonnées polaires.',
      '<b>2.</b> Donner l’expression du vecteur vitesse @v en coordonnées polaires en utilisant le fait que le rayon r est constant, ainsi que sa norme.',
      '<b>3.</b> Donner l’expression du vecteur accélération.',
      '<b>4.</b> Donner l’expression de la force gravitationnelle qui s’exerce sur le satellite.',
      '<b>5.</b> En appliquant le PFD, donner l’expression du vecteur l’accélération.',
      '<b>6.</b> En utilisant les équations établies précédemment, montrer que ' + thd + ' = $ω est constant, puis montrer que la norme du vecteur vitesse peut s’écrire : ‖@v‖ = $v = $r$ω.',
      '<b>7.</b> Montrer que la norme du vecteur accélération peut s’écrire : ‖@a‖ = $a = ' + fr('$v²', '$r') + '.',
      '<b>8.</b> En utilisant les résultats précédents, déterminer $v en fonction de G, M<sub>T</sub>, et r. (G = 6,67 · 10⁻¹¹ N·m²/kg² et M<sub>T</sub> = 6 · 10²⁴ kg.)',
      '<b>9.</b> Donner l’expression de la période T de révolution du satellite. Calculer sa valeur en heures.'],
    hints: [
      'Le rayon est constant : ' + rd + ' = ' + rdd + ' = 0 dans les formules générales de @v et @a en polaire.',
      'La gravitation est attractive : elle est dirigée de M vers O, c’est-à-dire selon −@u_r, de norme $G$M_T$m/$r².',
      'Projette la 2e loi de Newton sur @u_θ (la force n’a pas de composante orthoradiale), puis sur @u_r. Période : temps pour faire un tour, 2π$r, à la vitesse $v.'],
    solution: [
      { t: 'Question 1 · vecteur position', html: '<p>Cadre : référentiel géocentrique, supposé galiléen ; système : le satellite (point M de masse $m) ; coordonnées polaires de centre O, le centre de la Terre.</p>' +
        eq('@OM = $r @u_r', '$r = R<sub>T</sub> + $h = 12 800 km = 1,28 × 10⁷ m') },
      { t: 'Question 2 · vecteur vitesse', html: '<p>$r constant : ' + rd + ' = 0, donc</p>' + eq('@v = $r' + thd + ' @u_θ', '‖@v‖ = $r |' + thd + '|') },
      { t: 'Question 3 · vecteur accélération', html: '<p>Avec ' + rd + ' = ' + rdd + ' = 0 :</p>' + eq('@a = −$r' + thd + '² @u_r + $r' + thdd + ' @u_θ') },
      { t: 'Question 4 · force gravitationnelle', html: '<p>La gravitation est attractive : la Terre attire le satellite vers son centre O, selon −@u_r.</p>' + eq('@F = −' + fr('$G $M_T $m', '$r²') + ' @u_r') +
        '<p class="sol-note">Le cours écrit la loi de gravitation sans signe « − » ; la forme sûre est celle-ci, avec @u_r dirigé de O (la Terre) vers M (le satellite).</p>' },
      { t: 'Question 5 · 2e loi de Newton', html: '<p>Seule force : la gravitation. PFD : $m @a = @F, donc</p>' + eq('@a = −' + fr('$G $M_T', '$r²') + ' @u_r') },
      { t: 'Question 6 · vitesse angulaire constante', html: '<p>On identifie les deux expressions de @a (questions 3 et 5), composante par composante.</p><p>Sur @u_θ : $r' + thdd + ' = 0, donc ' + thdd + ' = 0 : la vitesse angulaire ' + thd + ' est constante ; on la note $ω. Alors :</p>' + eq('‖@v‖ = $v = $r$ω') + '<p>(Avec $ω &gt; 0, rotation dans le sens direct.)</p>' },
      { t: 'Question 7 · norme de l’accélération', html: '<p>Sur @u_r : la composante de l’accélération vaut −$r$ω², donc ‖@a‖ = $r$ω². Avec $ω = $v/$r :</p>' + eq('$a = $r ' + fr('$v²', '$r²') + ' = ' + fr('$v²', '$r')) },
      { t: 'Question 8 · vitesse', html: '<p>Sur @u_r, la 2e loi de Newton donne aussi $a = $G$M_T/$r². On égale :</p>' + eq(fr('$v²', '$r') + ' = ' + fr('$G $M_T', '$r²') + ' ⇒ $v = ' + sq(fr('$G $M_T', '$r'))) +
        eq('$v = ' + sq(fr('6,67 × 10⁻¹¹ × 6 × 10²⁴', '1,28 × 10⁷')), '$v ≈ 5,6 × 10³ m·s⁻¹') + '<p>Environ 5,6 km/s. La masse du satellite n’intervient pas.</p>' },
      { t: 'Question 9 · période', html: '<p>En une période $T, le satellite parcourt la circonférence 2π$r à la vitesse $v :</p>' + eq('$T = ' + fr('2π$r', '$v') + ' = 2π ' + sq(fr('$r³', '$G $M_T'))) +
        eq('$T = ' + fr('2π × 1,28 × 10⁷', '5,59 × 10³'), '$T ≈ 1,44 × 10⁴ s ≈ 4,0 h') }],
    answer: '<ul><li>@OM = $r @u_r ($r = 1,28 × 10⁷ m) ; @v = $r' + thd + ' @u_θ ; @a = −$r' + thd + '² @u_r + $r' + thdd + ' @u_θ.</li><li>@F = −($G$M_T$m/$r²) @u_r ; @a = −($G$M_T/$r²) @u_r.</li><li>' + thd + ' = $ω constante, $v = $r$ω, $a = $v²/$r.</li><li>$v = ' + sq('$G$M_T/$r') + ' ≈ 5,6 × 10³ m·s⁻¹ ; $T = 2π$r/$v ≈ 1,44 × 10⁴ s ≈ 4,0 h.</li></ul>',
    traps: [
      'Prendre $r = $h = 6400 km : le rayon de l’orbite se mesure depuis le centre de la Terre, $r = R<sub>T</sub> + $h.',
      'Oublier le signe « − » de la gravitation : la force est attractive, dirigée vers O.',
      'Oublier de convertir les km en m avant l’application numérique.',
      'Dire que l’accélération est nulle parce que la vitesse est constante en norme : elle est centripète et vaut $v²/$r.'],
    official: false, note: NOTE
  });
})();
