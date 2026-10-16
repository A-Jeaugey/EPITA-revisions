/* Révisions S1 — schémas électriques en SVG à partir d'une description compacte.
   Symboles du cours (norme française) :
   - résistance : rectangle ;
   - source de tension : rond traversé par le fil (enlever le rond laisse un fil) ;
   - source de courant : rond barré perpendiculairement au fil (enlever le rond laisse un trou).
   Couleurs fournies par la page via --cz-ink, --cz-bg, --cz-volt, --cz-amp, --cz-pot, --cz-muted.

   spec = { w, h, aria, wires:[ 'M…' ], parts:[ … ] }
   parts :
     {t:'R', x, y, d:'h'|'v', l:'R_1', lp:'n'|'s'|'e'|'w', len}         résistance centrée en (x,y)
     {t:'E', x, y, d:'v'|'h', p:'n'|'s'|'e'|'w', l:'E', as:'w'|'e'|'n'|'s'}  source de tension, + du côté p, flèche du côté as
     {t:'J', x, y, d:'v'|'h', to:'n'|'s'|'e'|'w', l:'I_0', lp}           source de courant, courant vers to
     {t:'K', x, y, d:'h'|'v', open:true, l:'K_1', lp}                     interrupteur
     {t:'M', x, y, d:'h'|'v', k:'V'|'A', l, lp}                           voltmètre / ampèremètre
     {t:'U', a:[x,y], b:[x,y], l:'U_1', lp}                               flèche de tension (pointe en b)
     {t:'I', x, y, d:'e'|'w'|'n'|'s', l:'I_1', lp, len}                   flèche de courant sur un fil
     {t:'gnd', x, y}   masse ;  {t:'dot', x, y} nœud ;  {t:'term', x, y} borne ouverte
     {t:'txt', x, y, s:'A', a:'start'|'middle'|'end', c:'cz-n'|'cz-tiny'}
   Chaque part accepte aussi id (→ data-id) et c (classe CSS en plus). */
(function () {
  'use strict';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function r1(v) { return Math.round(v * 10) / 10; }

  /* « R_th » → R + indice « th » ; « U_AB = 3 V » → indice jusqu'au premier espace */
  function label(s) {
    s = String(s);
    var out = '', i = 0;
    while (i < s.length) {
      var k = s.indexOf('_', i);
      if (k < 0) { out += esc(s.slice(i)); break; }
      out += esc(s.slice(i, k));
      var end = k + 1;
      if (s[end] === '{') { var c = s.indexOf('}', end); end = c < 0 ? s.length : c; out += '<tspan class="cz-s" dy="4">' + esc(s.slice(k + 2, end)) + '</tspan><tspan dy="-4">​</tspan>'; i = end + 1; continue; }
      while (end < s.length && /[^\s=+−\-,;)]/.test(s[end])) end++;
      out += '<tspan class="cz-s" dy="4">' + esc(s.slice(k + 1, end)) + '</tspan><tspan dy="-4">​</tspan>';
      i = end;
    }
    return out;
  }

  function text(x, y, s, cls, anchor, extra) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" class="' + (cls || 'cz-l') + '"' + (anchor && anchor !== 'start' ? ' text-anchor="' + anchor + '"' : '') + (extra || '') + '>' + label(s) + '</text>';
  }

  /* position d'étiquette autour d'un point selon un cap */
  function place(x, y, lp, dist) {
    dist = dist || 14;
    switch (lp) {
      case 'n': return [x, y - dist, 'middle'];
      case 's': return [x, y + dist + 11, 'middle'];
      case 'e': return [x + dist, y + 5.5, 'start'];
      case 'w': return [x - dist, y + 5.5, 'end'];
      case 'ne': return [x + dist * .7, y - dist * .7, 'start'];
      case 'nw': return [x - dist * .7, y - dist * .7, 'end'];
      case 'se': return [x + dist * .7, y + dist * .7 + 10, 'start'];
      case 'sw': return [x - dist * .7, y + dist * .7 + 10, 'end'];
    }
    return [x, y, 'middle'];
  }
  function lbl(p, x, y, def, dist, cls) {
    if (!p.l) return '';
    var lp = p.lp || def, pos;
    if (Array.isArray(lp)) pos = [x + lp[0], y + lp[1], lp[2] || 'middle'];
    else pos = place(x, y, lp, dist);
    return text(pos[0], pos[1], p.l, cls, pos[2]);
  }

  function head(x, y, ux, uy, cls) {
    var L = 9, W = 4.6, bx = x - ux * L, by = y - uy * L, nx = -uy, ny = ux;
    return '<path class="' + cls + '" d="M' + r1(x) + ' ' + r1(y) + 'L' + r1(bx + nx * W) + ' ' + r1(by + ny * W) + 'L' + r1(bx - nx * W) + ' ' + r1(by - ny * W) + 'Z"/>';
  }
  function arrow(ax, ay, bx, by, lineCls, headCls) {
    var dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
    return '<path class="' + lineCls + '" d="M' + r1(ax) + ' ' + r1(ay) + 'L' + r1(bx - ux * 6) + ' ' + r1(by - uy * 6) + '"/>' + head(bx, by, ux, uy, headCls);
  }
  var DIR = { n: [0, -1], s: [0, 1], e: [1, 0], w: [-1, 0] };

  function attrs(p) { return (p.id ? ' data-id="' + esc(p.id) + '"' : '') + ''; }
  function gOpen(p, base) { return '<g class="' + base + (p.c ? ' ' + p.c : '') + '"' + attrs(p) + '>'; }

  var draw = {
    R: function (p) {
      var len = p.len || 46, th = 16, h = p.d !== 'v';
      var w = h ? len : th, hh = h ? th : len;
      return gOpen(p, 'cz-part') + '<rect class="cz-r" x="' + r1(p.x - w / 2) + '" y="' + r1(p.y - hh / 2) + '" width="' + w + '" height="' + hh + '"/>' +
        lbl(p, p.x, p.y, h ? 'n' : 'e', h ? 14 : 15) + '</g>';
    },
    E: function (p) {
      var r = 16, v = p.d !== 'h', s = '';
      s += gOpen(p, 'cz-part');
      s += '<circle class="cz-src" cx="' + p.x + '" cy="' + p.y + '" r="' + r + '"/>';
      s += v ? '<path class="cz-w" d="M' + p.x + ' ' + (p.y - r) + 'V' + (p.y + r) + '"/>' : '<path class="cz-w" d="M' + (p.x - r) + ' ' + p.y + 'H' + (p.x + r) + '"/>';
      if (p.arrow !== false) {
        var side = p.as || (v ? 'w' : 'n'), off = 27, plus = p.p || (v ? 'n' : 'e');
        var sd = DIR[side], pd = DIR[plus];
        var cx = p.x + sd[0] * off, cy = p.y + sd[1] * off, half = 20;
        var ax = cx - pd[0] * half, ay = cy - pd[1] * half, bx = cx + pd[0] * half, by = cy + pd[1] * half;
        s += arrow(ax, ay, bx, by, 'cz-u', 'cz-uh');
        var lp = p.lp || side;
        s += lbl({ l: p.l, lp: lp }, cx, cy, side, 10, 'cz-l cz-lu');
      } else s += lbl(p, p.x, p.y, v ? 'w' : 'n', 24);
      return s + '</g>';
    },
    J: function (p) {
      var r = 16, v = p.d !== 'h', s = gOpen(p, 'cz-part');
      s += '<circle class="cz-src" cx="' + p.x + '" cy="' + p.y + '" r="' + r + '"/>';
      s += v ? '<path class="cz-w" d="M' + (p.x - r) + ' ' + p.y + 'H' + (p.x + r) + '"/>' : '<path class="cz-w" d="M' + p.x + ' ' + (p.y - r) + 'V' + (p.y + r) + '"/>';
      var to = p.to || (v ? 'n' : 'e'), d = DIR[to];
      /* flèche de courant à côté du rond, parallèle au fil */
      var side = p.as || (v ? 'e' : 'n'), sd = DIR[side], off = 25;
      var cx = p.x + sd[0] * off, cy = p.y + sd[1] * off;
      s += arrow(cx - d[0] * 14, cy - d[1] * 14, cx + d[0] * 14, cy + d[1] * 14, 'cz-i', 'cz-ih');
      s += lbl({ l: p.l, lp: p.lp || side }, cx, cy, side, 10, 'cz-l cz-li');
      return s + '</g>';
    },
    K: function (p) {
      var h = p.d !== 'v', s = gOpen(p, 'cz-part'), g = 18;
      var a = h ? [p.x - g, p.y] : [p.x, p.y + g], b = h ? [p.x + g, p.y] : [p.x, p.y - g];
      /* masque le fil entre les deux plots */
      s += h ? '<path class="cz-gap" d="M' + (a[0] + 3) + ' ' + p.y + 'H' + (b[0] - 3) + '"/>' : '<path class="cz-gap" d="M' + p.x + ' ' + (a[1] - 3) + 'V' + (b[1] + 3) + '"/>';
      var tip = p.open === false ? b : (h ? [b[0] - 3, p.y - 17] : [p.x - 17, b[1] + 3]);
      s += '<path class="cz-w cz-lever" d="M' + a[0] + ' ' + a[1] + 'L' + r1(tip[0]) + ' ' + r1(tip[1]) + '"/>';
      s += '<circle class="cz-dot" cx="' + a[0] + '" cy="' + a[1] + '" r="3"/><circle class="cz-dot" cx="' + b[0] + '" cy="' + b[1] + '" r="3"/>';
      s += lbl(p, p.x, p.y, h ? 's' : 'e', h ? 10 : 16);
      return s + '</g>';
    },
    M: function (p) {
      var r = 14, s = gOpen(p, 'cz-part');
      s += '<circle class="cz-src" cx="' + p.x + '" cy="' + p.y + '" r="' + r + '"/>';
      s += '<text x="' + p.x + '" y="' + (p.y + 5) + '" text-anchor="middle" class="cz-meter">' + esc(p.k || 'V') + '</text>';
      s += lbl(p, p.x, p.y, p.d === 'v' ? 'e' : 'n', 20);
      return s + '</g>';
    },
    U: function (p) {
      var s = gOpen(p, 'cz-part') + arrow(p.a[0], p.a[1], p.b[0], p.b[1], 'cz-u', 'cz-uh');
      var mx = (p.a[0] + p.b[0]) / 2, my = (p.a[1] + p.b[1]) / 2, vert = Math.abs(p.b[1] - p.a[1]) > Math.abs(p.b[0] - p.a[0]);
      s += lbl(p, mx, my, vert ? 'e' : 'n', 9, 'cz-l cz-lu');
      return s + '</g>';
    },
    I: function (p) {
      var d = DIR[p.d || 'e'], L = (p.len || 26) / 2, s = gOpen(p, 'cz-part');
      s += arrow(p.x - d[0] * L, p.y - d[1] * L, p.x + d[0] * L, p.y + d[1] * L, 'cz-i', 'cz-ih');
      var horiz = d[1] === 0;
      s += lbl(p, p.x, p.y, horiz ? 'n' : 'e', horiz ? 10 : 10, 'cz-l cz-li');
      return s + '</g>';
    },
    gnd: function (p) {
      var x = p.x, y = p.y, s = gOpen(p, 'cz-part');
      s += '<path class="cz-w" d="M' + x + ' ' + y + 'V' + (y + 10) + 'M' + (x - 12) + ' ' + (y + 10) + 'H' + (x + 12) + '"/>';
      s += '<path class="cz-g" d="M' + (x - 10) + ' ' + (y + 17) + 'L' + (x - 5) + ' ' + (y + 10) + 'M' + (x - 3) + ' ' + (y + 17) + 'L' + (x + 2) + ' ' + (y + 10) + 'M' + (x + 4) + ' ' + (y + 17) + 'L' + (x + 9) + ' ' + (y + 10) + '"/>';
      return s + '</g>';
    },
    dot: function (p) { return '<circle class="cz-dot' + (p.c ? ' ' + p.c : '') + '"' + attrs(p) + ' cx="' + p.x + '" cy="' + p.y + '" r="' + (p.r || 4) + '"/>'; },
    term: function (p) { return '<circle class="cz-term' + (p.c ? ' ' + p.c : '') + '"' + attrs(p) + ' cx="' + p.x + '" cy="' + p.y + '" r="4"/>' + lbl(p, p.x, p.y, 'e', 10); },
    txt: function (p) { return text(p.x, p.y, p.s, (p.c || 'cz-l') + (p.cl ? ' ' + p.cl : ''), p.a || 'middle', p.id ? ' data-id="' + esc(p.id) + '"' : ''); },
    raw: function (p) { return p.svg; }
  };

  function circuit(spec) {
    var w = spec.w || 360, h = spec.h || 220;
    var s = '<svg class="cz' + (spec.c ? ' ' + spec.c : '') + '" viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(spec.aria || 'Schéma électrique') + '">';
    (spec.under || []).forEach(function (p) { s += draw[p.t] ? draw[p.t](p) : ''; });
    var wires = spec.wires || [];
    if (typeof wires === 'string') wires = [wires];
    wires.forEach(function (d) {
      if (typeof d === 'string') s += '<path class="cz-w" d="' + d + '"/>';
      else s += '<path class="cz-w' + (d.c ? ' ' + d.c : '') + '"' + (d.id ? ' data-id="' + esc(d.id) + '"' : '') + ' d="' + d.d + '"/>';
    });
    var parts = spec.parts || [], late = [];
    parts.forEach(function (p) {
      if (p.t === 'U' || p.t === 'I' || p.t === 'txt' || p.t === 'dot' || p.t === 'term') { late.push(p); return; }
      s += draw[p.t] ? draw[p.t](p) : '';
    });
    late.forEach(function (p) { s += draw[p.t](p); });
    return s + '</svg>';
  }

  window.REV = window.REV || {};
  window.REV.circuit = circuit;
  window.REV.circuit.mount = function (el, spec) { if (typeof el === 'string') el = document.querySelector(el); if (el) el.innerHTML = circuit(spec); return el; };
  window.REV.circuit.label = label;
})();
