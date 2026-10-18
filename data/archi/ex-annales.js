/* Archi (Architecture des ordinateurs · Numération) — exercices des sujets, corrigés.
   Source : analyse des 10 sujets (examen B1 2025-2026 du Moodle, sujets d’automne 2016 à 2024 des annales Epidocs),
   $S/analysis/archi_midterms.md. Une fiche par exercice au programme de cette année (chapitre 1, TD 1 et 2, IEEE 754
   d’après les sujets 2023 à 2025). Énoncés verbatim (p2016 n’existe qu’en anglais : énoncé français traduit avec les
   consignes des sujets suivants ; p2019 n’a pas de sujet français : énoncé repris du corrigé français).
   Hors programme, sans fiche : puissances de deux à simplifier, préfixes binaires (Ki, Mi, Gi), bases inconnues,
   plans mémoire (fils d’adresse). Question retirée d’une fiche : l’addition en base 8 des opérations posées (2016 à
   2022, sauf 2020) ; le cours ne fait aucune opération en base 8.
   Regroupements : l’exercice 4 de 2019-2020 (250 + 10, 4 − 10, 120 + 10, −126 − 10) est celui de 2022-2023 : une
   fiche, p2022-ex4 ; les questions sur n bits de 2016-2017 (Ex 6) et 2018-2019 (Ex 6) sont les questions 1 à 5 de
   2020-2021 (Ex 5) : une fiche, p2020-ex5.

   Format d’une fiche (window.ARCHI_EX) : { id, exam, kind: 'partiel', order, src, title, pts, topics, lvl, time,
   intro, questions, hints, solution: [{ t, html }], answer (HTML), traps, grading, official, note }.
   Les corrigés montrent chaque calcul avec les outils déclaratifs d’assets/js/archi.js
   (<div data-archi="divs|mults|place|groups|posed|ieee|register|wheel|drill" data-opts='{…}'>, montés quand la
   correction s’ouvre). Les réponses sont écrites en clair ; chaque ligne des tableaux de réponses porte data-chk
   (ce qui est demandé), que le script de vérification relit pour tout recalculer avec REV.archi.

   Fabrique des fiches (window.ARCHI_EXB.make(langue)), partagée avec le fichier anglais : conv (tableau de
   conversions), ops (opérations posées), n8 (opérations sur 8 bits), ieee (IEEE 754), ans (tableau de réponses).
   Les données de chaque fiche fabriquée (window.ARCHI_EXS[id]) servent aussi au fichier anglais.
     conv : rows [[nombre tel qu’imprimé, base de départ, base d’arrivée, chiffres après la virgule (0 = sans
            consigne), réponse]] ; les lignes avec un nombre de chiffres reçoivent d’office une remarque calculée
            (développement fini ou non, ce que donnerait l’arrondi).
     ops  : rows [['sub' | 'add' | 'div' | 'mul', base, [opérandes], réponse]].
     n8   : rows [[a, '+' | '-', b, mot résultat, non signé ou 'E', signé ou 'E']] ; g4 : opérandes imprimés par 4.
     ieee : enc [[nombre, S, E, M]] (simple précision) ; dec [[mot hexadécimal, 'k|n' | 'NaN' | '+inf']] (double).
   Textes propres à une langue : l’objet L passé à make (FR ci-dessous, EN dans data/en/archi/ex-annales.js). */
(function () {
  'use strict';
  var X0 = window.ARCHI_EX = window.ARCHI_EX || [];
  var SPEC = window.ARCHI_EXS = window.ARCHI_EXS || {};

  /* =====================================================================
     Fabrique commune (français et anglais)
     ===================================================================== */
  window.ARCHI_EXB = { make: make };
  function make(L) {
    var NB = ' ', MINUS = '−', TIMES = '×';
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
    /* écriture canonique d’un nombre : sans espaces, virgule */
    function canon(s) { return String(s).replace(/[\s  ]/g, '').replace('.', ','); }
    function split(s) { var c = canon(s), i = c.indexOf(','); return i < 0 ? { int: c, frac: '' } : { int: c.slice(0, i) || '0', frac: c.slice(i + 1) }; }
    function gInt(s, g) { if (!g || s.length <= g) return [s]; var o = [], i = s.length; while (i > 0) { o.unshift(s.slice(Math.max(0, i - g), i)); i -= g; } return o; }
    function gFrac(s, g) { if (!g || s.length <= g) return [s]; var o = []; for (var i = 0; i < s.length; i += g) o.push(s.slice(i, i + g)); return o; }
    function zeros(n) { return new Array(n + 1).join('0'); }
    /* texte d’un nombre, comme REV.archi.fmt : paquets de 4 en binaire, milliers en décimal, rien sinon */
    function fmt(s, base, o) {
      o = o || {};
      var p = split(s), neg = /^[-−]/.test(p.int), g = o.group != null ? o.group : base === 2 ? 4 : base === 10 ? 3 : 0;
      if (neg) p.int = p.int.slice(1);
      var ip = base === 10 && p.int.length < 4 ? [p.int] : gInt(p.int, g);
      var t = (neg ? MINUS : '') + ip.join(base === 10 ? L.th : NB);
      if (p.frac) t += L.sep + (base === 10 ? p.frac : gFrac(p.frac, g).join(NB));
      return t;
    }
    function bn(s, base, o) { o = o || {}; return '<span class="bn">' + esc(fmt(s, base, o)) + (o.sub === false ? '' : '<sub>' + base + '</sub>') + '</span>'; }
    /* un nombre tel qu’il est imprimé dans le sujet (séparateur de la langue) */
    function prT(s) { return String(s).replace(/,/g, L.sep); }
    function pr(s, base, wrap) { return '<span class="bn' + (wrap ? ' w' : '') + '">' + esc(wrap ? prT(s) : prT(s).replace(/ /g, NB)) + (base ? '<sub>' + base + '</sub>' : '') + '</span>'; }
    function w8(s, wrap) { return '<span class="bn' + (wrap ? ' w' : '') + '">' + esc(s) + '</span>'; }
    function dec(n) { return fmt(String(n), 10); }
    function sgn(n) { return n < 0 ? '(' + dec(n) + ')' : dec(n); }
    function P(s) { return '<p>' + s + '</p>'; }
    function tool(name, o) { return '<div data-archi="' + name + '" data-opts=\'' + JSON.stringify(o) + '\'></div>'; }
    function td(h, cls) { return '<td' + (cls ? ' class="' + cls + '"' : '') + '>' + h + '</td>'; }
    function tr(cells, chk) { return '<tr' + (chk ? ' data-chk=\'' + JSON.stringify(chk) + '\'' : '') + '>' + cells.join('') + '</tr>'; }
    function grp(label, n, rows, chk) {
      return '<tbody' + (chk ? ' data-chk=\'' + JSON.stringify(chk) + '\'' : '') + '><tr><th scope="rowgroup" colspan="' + n + '" style="font-weight:600;background:var(--surface-2)">' + label + '</th></tr>' + rows.join('') + '</tbody>';
    }
    /* tableau : head = liste d’en-têtes ou <thead> tout fait */
    function tbl(head, rows, o) {
      o = o || {};
      var h = typeof head === 'string' ? head : '<thead><tr>' + head.map(function (x) { return '<th scope="col">' + x + '</th>'; }).join('') + '</tr></thead>';
      var body = rows.join('');
      return '<div class="tbl"><table>' + (o.cap ? '<caption>' + o.cap + '</caption>' : '') + h + (/^<tbody/.test(body) ? body : '<tbody>' + body + '</tbody>') + '</table></div>';
    }
    /* tableau de réponses : rows [[cellule, …, cellule-réponse…], chk] ; nr = nombre de cellules-réponses (à droite) */
    function ans(head, rows, nr) {
      return tbl(head, rows.map(function (r) {
        var cells = r[0], k = cells.length - (nr || 1);
        return tr(cells.map(function (c, i) { return td(c, i >= k ? 'r' : ''); }), r[1]);
      }));
    }
    function out(txt, o) {
      var r = {};
      ['src', 'title', 'questions', 'hints', 'traps', 'grading', 'note'].forEach(function (k) { if (txt[k] != null) r[k] = txt[k]; });
      for (var k in o) r[k] = o[k];
      if (txt.pre) r.solution = txt.pre.concat(r.solution || []);
      if (txt.post) r.solution = (r.solution || []).concat(txt.post);
      return r;
    }

    /* ---------- conversions ---------- */
    function lg2(b) { return { 2: 1, 4: 2, 8: 3, 16: 4 }[b] || 0; }
    function route(f, t) {
      if (t === 10) return 'to10';
      if (f === 10) return 'from10';
      if (f === 2 && lg2(t)) return 'grp';
      if (t === 2 && lg2(f)) return 'ungrp';
      if (lg2(f) && lg2(t)) return 'via2';
      if (f === t * t) return 'pow';
      return 'via10';
    }
    function bitsOf(s, k) { return s.split('').map(function (c) { var b = parseInt(c, 36).toString(2); while (b.length < k) b = '0' + b; return b; }).join(''); }
    function toBin(x, k) { var p = split(x), i = bitsOf(p.int, k).replace(/^0+(?=.)/, ''), f = bitsOf(p.frac, k).replace(/0+$/, ''); return i + (f ? ',' + f : ''); }
    function padInfo(p, k) {
      var ip = (k - p.int.length % k) % k, fp = p.frac ? (k - p.frac.length % k) % k : 0;
      return { ip: ip, fp: fp, int: gInt(zeros(ip) + p.int, k).join(NB), frac: gFrac(p.frac + zeros(fp), k).join(NB), frac0: gFrac(p.frac, k).join(NB) };
    }
    /* partie fractionnaire décimale 0,f en base b : multiplications successives sur des entiers (exact) */
    function fracDigits(f, b, want) {
      var D = Math.pow(10, f.length), n = parseInt(f, 10) || 0, ds = [], end = null, up = false;
      for (var i = 0; i < 400 && n; i++) { n *= b; ds.push(Math.floor(n / D)); n %= D; if (i + 1 === want) up = 2 * n >= D; if (!n) end = i + 1; }
      return { ds: ds.slice(0, want), end: end, up: up };
    }
    function digitsStr(a) { return a.map(function (v) { return v.toString(36).toUpperCase(); }).join(''); }
    /* troncature et arrondi au plus proche à d chiffres d’un nombre décimal en base b */
    function roundOf(x, b, d) {
      var p = split(x), fd = fracDigits(p.frac, b, d), keep = fd.ds.slice(0, d);
      while (keep.length < d) keep.push(0);
      var ip = parseInt(p.int, 10).toString(b).toUpperCase(), tr0 = ip + ',' + digitsStr(keep), all = parseInt(p.int, 10).toString(b).split('').map(function (c) { return parseInt(c, 36); }).concat(keep), L0 = ip.length;
      if (fd.up) { for (var i = all.length - 1; i >= 0; i--) { all[i]++; if (all[i] < b) break; all[i] = 0; if (i === 0) { all.unshift(1); L0++; } } }
      return { trunc: tr0, round: digitsStr(all.slice(0, L0)) + ',' + digitsStr(all.slice(L0)), end: fd.end };
    }
    function conv(spec, txt) {
      var rows = spec.rows, notes = txt.notes || {}, C = L.conv;
      var st = tbl(C.head.slice(0, 3), rows.map(function (r) {
        return tr([td(pr(r[0])), td(L.form(r[1])), td(L.form(r[2]) + (r[3] ? '<br><small>' + L.digits(r[3]) + '</small>' : ''))]);
      }));
      var sol = rows.map(function (r, i) { return convStep(r, i, notes[i]); });
      var a = tbl([C.head[0], C.head[3]], rows.map(function (r) {
        return tr([td(pr(r[0], r[1], true) + (r[3] ? '<br><small>' + L.digits(r[3]) + '</small>' : '')), td(bn(r[4], r[2]), 'r')],
          { t: 'conv', x: r[0], f: r[1], to: r[2], d: r[3] || null });
      }));
      return out(txt, { intro: (txt.intro || '') + st, solution: sol, answer: a });
    }
    function convStep(r, i, note) {
      var x = r[0], f = r[1], t = r[2], d = r[3], c = canon(x), p = split(c), kind = route(f, t), h = [], v = c.replace(',', L.sep), C = L.conv;
      if (kind === 'to10') {
        h.push(P(C.to10(f, p)));
        h.push(tool('place', { base: f, value: v, edit: false, also: [10] }));
      } else if (kind === 'from10') {
        h.push(P(C.from10(t, p, d)));
        h.push(tool('divs', { n: p.int, base: t, step: false }));
        if (p.frac) {
          var mo = { x: '0' + L.sep + p.frac, base: t, step: false };
          if (d) mo.digits = d;
          h.push(tool('mults', mo));
        }
        if (d) { var ro = roundOf(c, t, d); h.push(P(C.round(p.frac, t, d, ro.end, ro.trunc === ro.round ? null : bn(ro.round, t)))); }
      } else if (kind === 'grp') {
        h.push(P(C.grp(t, lg2(t), padInfo(p, lg2(t)))));
        h.push(tool('groups', { value: v, from: 2, to: t }));
      } else if (kind === 'ungrp') {
        h.push(P(C.ungrp(f, lg2(f))));
        h.push(tool('groups', { value: v, from: f, to: 2 }));
      } else if (kind === 'via2') {
        h.push(P(C.via2(f, t, lg2(f), lg2(t))));
        h.push(tool('groups', { value: v, from: f, to: 2 }));
        h.push(tool('groups', { value: toBin(c, lg2(f)).replace(',', L.sep), from: 2, to: t }));
      } else {
        var n10 = parseInt(c, f);
        if (kind === 'pow') {
          var pairs = c.split('').map(function (ch) { var dv = parseInt(ch, 36); return { c: ch, p: String(Math.floor(dv / t)) + String(dv % t) }; });
          h.push(P(C.pow(f, t, pairs.map(function (q) { return q.c + ' → ' + q.p; }).join(', '), bn(pairs.map(function (q) { return q.p; }).join(''), t), bn(r[4], t))));
        } else h.push(P(C.via10(f, t)));
        h.push(tool('place', { base: f, value: v, edit: false, also: [10] }));
        h.push(tool('divs', { n: String(n10), base: t, step: false }));
      }
      h.push(P(C.result(pr(x, f), bn(r[4], t))));
      if (note) h.push(P(note));
      return { t: C.stepTitle(i + 1, prT(x), f, t), html: h.join('') };
    }

    /* ---------- opérations posées ---------- */
    var SIGN = { sub: MINUS, add: '+', mul: TIMES, div: '/' };
    function opStr(r) { return r[2].join(' ' + SIGN[r[0]] + ' '); }
    function addCols(o, b) {
      var n = Math.max.apply(null, o.map(function (s) { return s.length; })), carry = 0, cols = [];
      for (var k = 0; k < n || carry; k++) {
        var cs = o.map(function (s) { return s.charAt(s.length - 1 - k); }).filter(Boolean), sum = carry;
        cs.forEach(function (ch) { sum += parseInt(ch, 36); });
        cols.push({ cin: carry, cs: cs, sum: sum, d: (sum % b).toString(b).toUpperCase(), cout: Math.floor(sum / b) });
        carry = Math.floor(sum / b);
      }
      return cols;
    }
    function ops(spec, txt) {
      var rows = spec.rows, O = L.ops;
      var st = tbl(O.head, rows.map(function (r) { return tr([td(O.base(r[1])), td(w8(opStr(r), true))]); }));
      var sol = rows.map(function (r, i) { return opStep(r, (txt.notes || {})[i]); });
      var a = tbl([O.ahead[1]], rows.map(function (r) {
        return grp(w8(opStr(r), true) + ' <small>(' + O.base(r[1]).toLowerCase() + ')</small>', 1, [tr([td(bn(r[3], r[1]), 'r')])], { t: 'op', op: r[0], b: r[1], o: r[2] });
      }));
      return out(txt, { intro: (txt.intro || '') + st, solution: sol, answer: a });
    }
    function opStep(r, note) {
      var op = r[0], b = r[1], o = r[2], res = r[3], h = [], O = L.ops, v = o.map(function (s) { return parseInt(s, b); });
      if (op === 'sub') {
        h.push(P(O.sub(b)));
        h.push(tool('posed', { op: 'sub', ops: o, base: b, pad: true, step: false }));
        h.push(P(O.check(dec(v[0]) + ' ' + MINUS + ' ' + dec(v[1]) + ' = ' + dec(v[0] - v[1]), bn(res, b))));
      } else if (op === 'add') {
        var sum = v.reduce(function (a, x) { return a + x; }, 0);
        h.push(P(O.add(b, o.length)));
        h.push(tool('posed', { op: 'add', ops: o, base: b, step: false }));
        if (b !== 2) h.push(O.cols(addCols(o, b), b));
        h.push(P(O.check(v.map(dec).join(' + ') + ' = ' + dec(sum), bn(res, b))));
      } else if (op === 'mul') {
        var pos = [];
        o[1].split('').reverse().forEach(function (ch, k) { if (ch === '1') pos.push(k); });
        h.push(P(O.mul(pos)));
        h.push(tool('posed', { op: 'mul', ops: o, base: b, zeros: false, step: false }));
        h.push(P(O.check(dec(v[0]) + ' ' + TIMES + ' ' + dec(v[1]) + ' = ' + dec(v[0] * v[1]), bn(res, b))));
      } else {
        h.push(P(O.div()));
        h.push(tool('posed', { op: 'div', ops: o, base: b, step: false }));
        h.push(P(O.check(dec(v[0]) + ' / ' + dec(v[1]) + ' = ' + dec(v[0] / v[1]), bn(res, b)) + ' ' + O.rem0));
      }
      if (note) h.push(P(note));
      return { t: O.title(op, b, opStr(r)), html: h.join('') };
    }

    /* ---------- opérations sur 8 bits ---------- */
    function u8(w) { return parseInt(w, 2); }
    function s8(w) { var u = parseInt(w, 2); return w.charAt(0) === '1' ? u - Math.pow(2, w.length) : u; }
    function c2(w) { var n = w.length, m = Math.pow(2, n), s = ((m - parseInt(w, 2)) % m).toString(2); while (s.length < n) s = '0' + s; return s; }
    function n8(spec, txt) {
      var rows = spec.rows, N = L.n8;
      function opP(r) { var a = spec.g4 ? gInt(r[0], 4).join(NB) : r[0], b = spec.g4 ? gInt(r[2], 4).join(NB) : r[2]; return a + ' ' + (r[1] === '-' ? MINUS : '+') + ' ' + b; }
      var head = '<thead><tr><th scope="col" rowspan="2">' + N.op + '</th><th scope="col" rowspan="2">' + N.bin + '</th><th scope="colgroup" colspan="2">' + N.dec + '</th></tr>' +
        '<tr><th scope="col">' + N.u + '</th><th scope="col">' + N.s + '</th></tr></thead>';
      var st = tbl(head, rows.map(function (r) { return tr([td(w8(opP(r))), td(''), td(''), td('')]); }));
      var sol = rows.map(function (r, i) { return n8Step(r, i, opP(r), (txt.notes || {})[i]); });
      function val(x) { return x === 'E' ? N.err : dec(+x); }
      var a = tbl([N.bin, N.u, N.s], rows.map(function (r) {
        return grp(w8(opP(r)), 3, [tr([td(w8(gInt(r[3], 4).join(NB)), 'r'), td(val(r[4]), 'r'), td(val(r[5]), 'r')])], { t: 'n8', a: r[0], op: r[1], b: r[2] });
      }));
      return out(txt, { intro: (txt.intro || '') + st, solution: sol, answer: a });
    }
    function n8Step(r, i, label, note) {
      var a = r[0], op = r[1], b = r[2], res = r[3], N = L.n8, h = [];
      var ua = u8(a), ub = u8(b), sa = s8(a), sb = s8(b);
      h.push(P(N.read(w8(a), ua, sa, w8(c2(a))) + ' ' + N.read(w8(b), ub, sb, w8(c2(b)))));
      if (op === '+') {
        h.push(tool('posed', { op: 'add', ops: [a, b], base: 2, step: false }));
        h.push(P(N.addRes(w8(res), ua + ub > 255)));
      } else if (ua >= ub) {
        h.push(tool('posed', { op: 'sub', ops: [a, b], base: 2, pad: true, step: false }));
        h.push(P(N.subRes(w8(res), false)));
      } else {
        h.push(tool('posed', { op: 'sub', ops: ['1' + a, b], base: 2, pad: true, step: false }));
        h.push(P(N.subRes(w8(res), true)));
      }
      var o = op === '-' ? MINUS : '+', eu = op === '+' ? ua + ub : ua - ub, es = op === '+' ? sa + sb : sa - sb;
      var okU = eu >= 0 && eu <= 255, okS = es >= -128 && es <= 127;
      h.push(P(N.uns(dec(ua) + ' ' + o + ' ' + dec(ub) + ' = ' + dec(eu), okU ? dec(u8(res)) : null)));
      h.push(P(N.sig(dec(sa) + ' ' + o + ' ' + sgn(sb) + ' = ' + dec(es), okS ? dec(s8(res)) : null, okS && s8(res) < 0 ? N.neg(w8(res), w8(c2(res)), dec(-s8(res))) : '')));
      if (!okS) h.push(P(N.rule(sa < 0, sb < 0, s8(res) < 0, op)));
      if (note) h.push(P(note));
      return { t: N.title(i + 1, label), html: h.join('') };
    }

    /* ---------- IEEE 754 ---------- */
    function hexBits(w) { return canon(w).split('').map(function (c) { var b = parseInt(c, 16).toString(2); while (b.length < 4) b = '0' + b; return b; }).join(''); }
    /* 1,m × 2^e écrit en binaire positionnel */
    function binOf(m, e) {
      var s = '1' + m;
      if (e >= 0) { while (s.length < e + 1) s += '0'; return s.slice(0, e + 1) + (s.length > e + 1 ? ',' + s.slice(e + 1) : ''); }
      return '0,' + zeros(-e - 1) + s;
    }
    function pow2(n) { return '2<sup>' + (n < 0 ? MINUS + (-n) : n) + '</sup>'; }
    function kv(a) {
      if (a === 'NaN') return 'NaN';
      if (a === '+inf') return '+∞';
      var kn = a.split('|');
      return dec(+kn[0]) + ' ' + TIMES + ' ' + pow2(+kn[1]);
    }
    function ieee(spec, txt) {
      var I = L.ie;
      var q1 = txt.q1 + tbl(I.h1, spec.enc.map(function (r) { return tr([td(pr(r[0])), td(''), td(''), td('')]); }));
      var q2 = txt.q2 + tbl(I.h2, spec.dec.map(function (r) { return tr([td(w8(r[0].replace(/ /g, NB))), td('')]); }));
      var sol = spec.enc.map(function (r) { return encStep(r, (txt.notes || {})[r[0]]); }).concat(spec.dec.map(function (r) { return decStep(r, (txt.notes || {})[r[0]]); }));
      var a1 = tbl([I.field, I.val], spec.enc.map(function (r) {
        return grp(pr(r[0]), 2, [tr([td('S'), td(w8(r[1]), 'r')]), tr([td('E'), td(w8(r[2]), 'r')]), tr([td('M'), td(w8(r[3]), 'r')])], { t: 'ieeeE', x: r[0] });
      }));
      var a2 = tbl(I.h2, spec.dec.map(function (r) { return tr([td(w8(r[0], true)), td(kv(r[1]), 'r')], { t: 'ieeeD', w: r[0] }); }));
      return out(txt, { questions: [q1, q2], solution: sol, answer: P(I.a1) + a1 + P(I.a2) + a2 });
    }
    function encStep(r, note) {
      var x = r[0], E10 = parseInt(r[2], 2), e = E10 - 127, m = r[3].replace(/0+$/, ''), I = L.ie, h = [];
      h.push(P(I.enc(pr(x, 10), bn(binOf(m, e), 2), bn('1' + (m ? ',' + m : ''), 2) + ' ' + TIMES + ' ' + pow2(e), e, E10, w8(r[2]), m ? w8(m) : '0', r[1])));
      h.push(tool('ieee', { fmt: 'single', value: canon(x).replace(',', L.sep), input: false }));
      h.push(P(I.copy(w8(r[1]), w8(r[2]), w8(r[3]))));
      if (note) h.push(P(note));
      return { t: I.encTitle(prT(x)), html: h.join('') };
    }
    function decStep(r, note) {
      var w = canon(r[0]), b = hexBits(w), S = b.charAt(0), Eb = b.slice(1, 12), M = b.slice(12), E10 = parseInt(Eb, 2), mt = M.replace(/0+$/, ''), I = L.ie, h = [];
      var head3 = w.slice(0, 3), b12 = gInt(b.slice(0, 12), 4).join(NB), mHex = gInt(w.slice(3), 4).join(NB);
      h.push(P(I.fields(w8(head3), w8(b12), S, w8(gInt(Eb, 4).join(NB)), E10, w8(mHex))));
      if (E10 === 2047) h.push(P(mt ? I.nan(S) : I.inf(S)));
      else if (E10 === 0) {
        var k0 = parseInt(mt, 2), n0 = -1022 - mt.length;
        h.push(P(I.sub(bn('0,' + mt, 2), pow2(-1022), bn(mt, 2), mt.length, pow2(n0), dec(k0) + ' ' + TIMES + ' ' + pow2(n0))));
      } else {
        var k = parseInt('1' + mt, 2), n = E10 - 1023 - mt.length;
        h.push(P(I.norm(E10, E10 - 1023, bn('1' + (mt ? ',' + mt : ''), 2), pow2(E10 - 1023), bn('1' + mt, 2), mt.length, pow2(n), dec(k) + ' ' + TIMES + ' ' + pow2(n))));
      }
      h.push(tool('ieee', { fmt: 'double', hex: r[0], input: false }));
      if (note) h.push(P(note));
      return { t: I.decTitle(r[0]), html: h.join('') };
    }

    return { conv: conv, ops: ops, n8: n8, ieee: ieee, ans: ans, tbl: tbl, tr: tr, td: td, grp: grp, tool: tool, bn: bn, pr: pr, w8: w8, dec: dec, fmt: fmt, P: P, pow2: pow2, kv: kv, roundOf: roundOf, addCols: addCols, c2: c2, s8: s8, u8: u8 };
  }

  /* =====================================================================
     Textes français
     ===================================================================== */
  var NB = ' ';
  function nm(b) { return { 2: 'binaire', 10: 'décimal', 16: 'hexadécimal', 8: 'octal' }[b] || 'base ' + b; }
  function ord(n) { return n === 1 ? '1<sup>er</sup>' : n + '<sup>e</sup>'; }
  function zs(n) { return n + (n > 1 ? ' zéros' : ' zéro'); }
  var FR = {
    sep: ',', th: ' ',
    form: function (b) { return { 2: 'Binaire', 10: 'Décimale', 16: 'Hexadécimale' }[b] || 'Base ' + b; },
    digits: function (n) { return '(' + n + ' chiffres après la virgule)'; },
    conv: {
      head: ['Nombre à convertir', 'Forme de départ', 'Forme d’arrivée', 'Résultat'],
      stepTitle: function (i, x, f, t) { return 'Ligne ' + i + ' · ' + x + ' : ' + nm(f) + ' → ' + nm(t); },
      to10: function (f, p) {
        if (f === 2) return 'Somme des produits : chaque bit à 1 apporte son poids, une puissance de 2' + (p.frac ? ' (après la virgule : 2<sup>−1</sup> = 0,5 ; 2<sup>−2</sup> = 0,25 ; 2<sup>−3</sup> = 0,125…)' : '') + '. On additionne les poids des bits à 1.';
        if (f === 16) return 'Somme des produits : chaque chiffre (A = 10 … F = 15) multiplié par son poids, une puissance de 16' + (p.frac ? ' (après la virgule : 16<sup>−1</sup> = 0,0625 ; 16<sup>−2</sup> = 0,00390625)' : '') + '.';
        return 'Somme des produits : chaque chiffre multiplié par son poids, une puissance de ' + f + '.';
      },
      from10: function (t, p, d) {
        var s = 'Partie entière ' + p.int + ' : divisions successives par ' + t + ', restes lus de bas en haut' + (t > 10 ? ' (un reste de 10 à ' + (t - 1) + ' s’écrit avec une lettre : 10 = A, 11 = B…)' : '') + '.';
        if (p.frac) s += ' Partie fractionnaire 0,' + p.frac + ' : multiplications successives par ' + t + ' ; la partie entière de chaque produit donne un chiffre (lus de haut en bas) et seule la partie fractionnaire passe à la ligne suivante' +
          (d ? ', jusqu’au ' + ord(d) + ' chiffre.' : ', jusqu’à une partie fractionnaire nulle.');
        return s;
      },
      round: function (f, t, d, end, rd) {
        var s = end && end <= d ? 'Le développement s’arrête de lui-même au ' + ord(end) + ' chiffre.' : end ? 'Le développement s’arrête au ' + ord(end) + ' chiffre, mais on n’en garde que ' + d + ', sans arrondir.' : 'Le développement de 0,' + f + ' en base ' + t + ' est infini : on s’arrête au ' + ord(d) + ' chiffre, sans arrondir.';
        return s + (rd ? ' L’arrondi donnerait ' + rd + ' : c’est faux, les corrigés tronquent toujours.' : end && end <= d ? '' : ' Ici, l’arrondi donnerait le même résultat.');
      },
      grp: function (t, k, pi) {
        var s = 'Paquets de ' + k + ' bits à partir de la virgule : vers la gauche pour la partie entière, vers la droite pour la partie fractionnaire ; chaque paquet donne un chiffre ' + nm(t) + '.';
        if (pi.ip) s += ' La partie entière est complétée à gauche par ' + zs(pi.ip) + ' : <span class="bn">' + pi.int + '</span>.';
        if (pi.fp) s += ' La partie fractionnaire est complétée à droite par ' + zs(pi.fp) + ' : <span class="bn">' + pi.frac0 + '</span> devient <span class="bn">' + pi.frac + '</span>.';
        return s;
      },
      ungrp: function (f, k) { return 'Chaque chiffre ' + nm(f) + ' donne exactement ' + k + ' bits, zéros compris (sinon les poids se décalent). À la fin, les 0 en tête de la partie entière et en fin de partie fractionnaire peuvent disparaître.'; },
      via2: function (f, t, kf, kt) { return 'Les bases ' + f + ' et ' + t + ' sont deux puissances de 2 (' + f + ' = 2<sup>' + kf + '</sup>, ' + t + ' = 2<sup>' + kt + '</sup>) : on passe par la base 2, ' + kf + ' bits par chiffre ' + nm(f) + ', puis des paquets de ' + kt + ' bits à partir de la virgule.'; },
      pow: function (f, t, pairs, raw, res) { return f + ' = ' + t + '<sup>2</sup> : chaque chiffre en base ' + f + ' s’écrit avec deux chiffres en base ' + t + ' (' + pairs + '), d’où ' + raw + ' = ' + res + '. On peut aussi passer par la base 10 (outils ci-dessous).'; },
      via10: function (f, t) { return f + ' et ' + t + ' ne sont pas des puissances d’un même entier : on passe par la base 10 (somme des produits, puis divisions successives par ' + t + ').'; },
      result: function (src, res) { return 'Résultat : ' + src + ' = <strong>' + res + '</strong>.'; }
    },
    ops: {
      head: ['Base', 'Opération'], ahead: ['Opération', 'Résultat'],
      base: function (b) { return 'Base ' + b; },
      title: function (op, b, s) { return { sub: 'Soustraction', add: 'Addition', div: 'Division', mul: 'Multiplication' }[op] + ' en base ' + b + ' · ' + s; },
      sub: function () { return 'Soustraction posée, de droite à gauche, avec la méthode du cours : quand le chiffre du haut est trop petit, on emprunte 1 ; il gagne <span class="bn">10<sub>2</sub></span> (2) et le chiffre du bas de la colonne suivante gagne 1. Le nombre du bas est complété à gauche par des 0.'; },
      add: function (b, n) {
        return b === 16 ? 'On additionne chaque colonne avec les valeurs décimales des chiffres (A = 10 … F = 15), on convertit le total en hexadécimal, on pose le chiffre de droite et on reporte la retenue.' + (n > 2 ? ' Avec trois termes, une colonne vaut au plus 15 × 3 + 2 = 47 : la retenue peut valoir 2.' : '')
          : 'On additionne colonne par colonne, de droite à gauche : 1 + 1 = <span class="bn">10<sub>2</sub></span> (on pose 0, retenue 1), 1 + 1 + 1 = <span class="bn">11<sub>2</sub></span> (on pose 1, retenue 1).';
      },
      cols: function (cols, b) {
        return '<ul>' + cols.map(function (c, k) {
          if (!c.cs.length) return '<li>Il reste la retenue ' + c.cin + ' : c’est le chiffre de tête.</li>';
          var terms = (c.cin ? [String(c.cin)] : []).concat(c.cs), vals = (c.cin ? [c.cin] : []).concat(c.cs.map(function (ch) { return parseInt(ch, 36); }));
          var lit = terms.join(' + '), num = vals.join(' + ');
          return '<li>Colonne ' + (k + 1) + ' : ' + lit + (lit !== num ? ' = ' + num : '') + ' = ' + c.sum + ' = <span class="bn">' + c.sum.toString(b).toUpperCase() + '<sub>' + b + '</sub></span> : on pose ' + c.d + (c.cout ? ', retenue ' + c.cout + '.' : ', pas de retenue.') + '</li>';
        }).join('') + '</ul>';
      },
      mul: function (pos) { return 'Un produit partiel par chiffre 1 du multiplicateur, décalé de la position de ce chiffre ; un chiffre 0 ne donnerait qu’une ligne de zéros, que les corrigés sautent. Ici, les 1 du multiplicateur sont aux positions ' + pos.join(', ') + ' : ' + pos.length + ' produits partiels, décalés de ' + pos.join(', ') + ' rang' + (pos.length > 1 || pos[0] > 1 ? 's' : '') + ', puis on les additionne colonne par colonne avec les retenues.'; },
      div: function () { return 'Division posée comme en base 10 : on prend le plus petit début du dividende qui contient le diviseur, on écrit 1 au quotient et on soustrait le diviseur ; puis on abaisse le chiffre suivant : si le reste est plus petit que le diviseur, on écrit 0 au quotient, sinon 1 et on soustrait.'; },
      check: function (expr, res) { return 'Vérification en base 10 : ' + expr + ', et ' + res + ' vaut bien ce nombre.'; },
      rem0: 'Le dernier reste vaut 0 : la division est exacte, comme dans tous les sujets.'
    },
    n8: {
      op: 'Opération', bin: 'Résultat binaire', dec: 'Valeur décimale', u: 'Non signée', s: 'Signée', err: 'ERREUR',
      title: function (i, s) { return 'Ligne ' + i + ' · ' + s; },
      read: function (w, u, s, c) {
        return s >= 0 ? w + ' : bit de poids fort 0, il vaut ' + u + ' en non signé comme en signé.'
          : w + ' vaut ' + u + ' en non signé ; en signé, son bit de poids fort est 1 : C2(' + w + ') = ' + c + ' = ' + (-s) + ', il vaut ' + s + '.';
      },
      addRes: function (r, carry) { return carry ? 'Le 9<sup>e</sup> bit est la retenue sortante : il est perdu, il reste ' + r + ' sur 8 bits. Cette retenue signale un dépassement non signé.' : 'Pas de retenue sortante : le résultat sur 8 bits est ' + r + '.'; },
      subRes: function (r, borrow) { return borrow ? 'Le premier nombre est le plus petit en non signé : la soustraction emprunte au-delà du bit 7 (le 1 ajouté devant, qui n’existe pas sur 8 bits). On garde les 8 bits : ' + r + '. Cet emprunt sortant signale un dépassement non signé.' : 'Pas d’emprunt au-delà du bit 7 : le résultat sur 8 bits est ' + r + '.'; },
      uns: function (e, v) { return 'Non signé : ' + e + (v == null ? ', hors de 0 … 255 : <strong>ERREUR</strong>.' : ' : <strong>' + v + '</strong>.'); },
      sig: function (e, v, extra) { return 'Signé : ' + e + (v == null ? ', hors de −128 … 127 : <strong>ERREUR</strong>.' : ' : <strong>' + v + '</strong>' + (extra ? ' (' + extra + ')' : '') + '.'); },
      neg: function (w, c, m) { return 'le mot ' + w + ' commence par 1 : C2 = ' + c + ' = ' + m + ', d’où le signe moins'; },
      rule: function (na, nb, nr, op) {
        var s = function (n) { return n ? 'négatif' : 'positif'; };
        return op === '+' ? 'Règle des signes (TD 2) : ' + s(na) + ' + ' + s(nb) + ' donne un ' + s(nr) + ' : deux opérandes de même signe et un résultat de l’autre signe, c’est un dépassement signé.'
          : 'Règle des signes (TD 2) : ' + s(na) + ' − ' + s(nb) + ' donne un ' + s(nr) + ' : opérandes de signes contraires et résultat qui n’a pas le signe du premier, c’est un dépassement signé.';
      }
    },
    ie: {
      h1: ['Nombre', 'S', 'E', 'M'], h2: ['Représentation IEEE 754 (base 16)', 'Représentation associée'], field: 'Champ', val: 'Valeur (binaire)',
      a1: 'Simple précision : les trois champs en binaire, sans espace, comme sur la copie.', a2: 'Double précision :',
      encTitle: function (x) { return 'Encoder ' + x + ' en simple précision'; },
      decTitle: function (w) { return 'Décoder ' + w + ' (double précision)'; },
      enc: function (x, bin, nrm, e, E10, Eb, m, S) {
        return x + ' = ' + bin + ' = ' + nrm + ' : on déplace la virgule derrière le premier 1, de ' + Math.abs(e) + ' rang' + (Math.abs(e) > 1 ? 's' : '') + ' vers la ' + (e >= 0 ? 'gauche' : 'droite') + (e >= 0 ? '' : ' (exposant négatif)') + '. ' +
          'S = ' + S + ' (nombre positif). E = ' + (e < 0 ? '−' + (-e) : e) + ' + 127 = ' + E10 + ' = ' + Eb + ', écrit sur 8 bits. M = les chiffres après la virgule, ' + m + ', complétés à droite par des 0 jusqu’à 23 bits (le 1 avant la virgule n’est pas stocké).';
      },
      copy: function (S, E, M) { return 'Sur la copie : S = ' + S + ' ; E = ' + E + ' ; M = ' + M + '.'; },
      fields: function (h3, b12, S, Eb, E10, mh) { return 'Les 3 premiers chiffres hexadécimaux ' + h3 + ' donnent les 12 premiers bits ' + b12 + ' : S = ' + S + ' (premier bit), E = ' + Eb + ' (les 11 suivants) = ' + E10 + '. M = les 13 derniers chiffres hexadécimaux, ' + mh + ' (52 bits).'; },
      nan: function (S) { return 'E est rempli de 1 (2047 = 7FF<sub>16</sub>) et M n’est pas nul : ce n’est pas un nombre, la représentation est <strong>NaN</strong>' + (S === '1' ? ' (le signe d’un NaN ne compte pas : on n’écrit pas « −NaN »)' : ' (un seul bit à 1 dans M suffit)') + '.'; },
      inf: function (S) { return 'E est rempli de 1 (2047 = 7FF<sub>16</sub>) et M est nul : c’est l’infini, ' + (S === '1' ? '<strong>−∞</strong>' : '<strong>+∞</strong>') + ' puisque S = ' + S + '. Ce sujet n’a pas de corrigé : l’écriture attendue est très probablement « +∞ ».'; },
      sub: function (v, p1022, mt, f, pn, res) { return 'E = 0 et M n’est pas nul : nombre dénormalisé. Pas de 1 implicite, et l’exposant vaut −1022 (et non 0 − 1023) : la valeur est ' + v + ' × ' + p1022 + '. On déplace la virgule de ' + f + ' rangs vers la droite et on retire ' + f + ' à l’exposant : ' + mt + ' × ' + pn + ' = <strong>' + res + '</strong>.'; },
      norm: function (E10, e, v, pe, kb, f, pn, res) {
        return 'E n’est ni 0 ni 2047 : nombre normalisé, exposant ' + E10 + ' − 1023 = ' + (e < 0 ? '−' + (-e) : e) + ' ; la valeur est ' + v + ' × ' + pe + '. ' +
          (f ? 'On déplace la virgule de ' + f + ' rang' + (f > 1 ? 's' : '') + ' vers la droite pour obtenir un entier (impair) et on retire ' + f + ' à l’exposant : ' + kb + ' × ' + pn + ' = <strong>' + res + '</strong>.' : 'Représentation : <strong>' + res + '</strong>.');
      }
    }
  };
  var K = make(FR);
  var bn = K.bn, pr = K.pr, w8 = K.w8, P = K.P, tool = K.tool, pow2 = K.pow2;

  /* ajoute une fiche ; type = conv | ops | n8 | ieee (fabriquée) ou null (fiche écrite à la main) */
  function card(base, type, spec, txt) {
    if (type) SPEC[base.id] = { type: type, spec: spec };
    var c = Object.assign({ kind: 'partiel' }, base, type ? K[type](spec, txt) : txt);
    X0.push(c);
  }

  /* ---------- consignes (verbatim) et textes communs ---------- */
  var K_CONV = P('Convertissez les nombres suivants de la forme de départ vers la forme d’arrivée. Ne pas écrire le résultat sous forme de fraction ou de puissance (p. ex. écrire 0,25 et non pas ¼ ou 2<sup>–2</sup>). Le résultat seul est attendu (pas de détail).');
  var K_OP = P('Effectuez les opérations suivantes. <strong>Le détail des calculs devra apparaître.</strong>');
  var K_8 = 'Effectuez les opérations suivantes en binaire (les deux opérandes et le résultat sont codés sur 8 bits). Convertissez le résultat en une valeur décimale non signée et signée. Si un dépassement apparaît, écrire « ERREUR » à la place de la valeur décimale.';
  var K_IE1 = '1. Convertissez les nombres ci-dessous dans le format IEEE754 <strong>simple précision</strong>. Vous exprimerez le résultat final sous <strong>forme binaire</strong> en précisant les trois champs.';
  var K_IE2 = '2. Donnez la représentation associée aux mots binaires codés au format IEEE754 <strong>double précision</strong> présents ci-dessous. Si une représentation est un nombre, vous l’exprimerez en base 10 sous la forme <i>k</i>×2<sup><i>n</i></sup> où <i>k</i> et <i>n</i> sont des entiers relatifs.';
  function base8(op) { return '<p class="muted">Le sujet pose aussi une addition en base 8 (' + op + '), hors programme cette année : elle est retirée de la fiche.</p>'; }
  var OLD = 'Les lignes en base 8 et dans les autres bases suivent les méthodes du cours, mais ce type de ligne n’est plus tombé depuis 2023 (bases 2, 10 et 16 seulement).';
  var H_TO10 = 'Vers la base 10 : écris la somme des produits, chiffre × poids. Après la virgule, les poids sont 2<sup>−1</sup> = 0,5 ; 2<sup>−2</sup> = 0,25 ; 2<sup>−3</sup> = 0,125… en binaire et 16<sup>−1</sup> = 0,0625 ; 16<sup>−2</sup> = 0,00390625 en hexadécimal.';
  var H_FROM10 = 'Depuis la base 10 : divisions successives pour la partie entière (restes lus de bas en haut), multiplications successives pour la partie fractionnaire (parties entières lues de haut en bas). « n chiffres après la virgule » : tu t’arrêtes au n-ième chiffre, sans arrondir.';
  var H_GRP = 'Base 2 ↔ base 16 : des paquets de 4 bits à partir de la virgule, complétés par des 0 à gauche de la partie entière et à droite de la partie fractionnaire. Chaque chiffre hexadécimal donne exactement 4 bits.';
  var H_OLD = 'Bases 8 et 16 : deux puissances de 2, on passe par la base 2 (3 bits par chiffre octal, 4 par chiffre hexadécimal). Base 9 → base 3 : 9 = 3<sup>2</sup>, chaque chiffre donne deux chiffres. Sinon, on passe par la base 10.';
  var T_ROUND = 'Arrondir le dernier chiffre demandé : les corrigés tronquent toujours, on arrête simplement les multiplications.';
  var H_SUB = 'Soustraction : de droite à gauche ; quand tu empruntes, le chiffre du haut gagne 2 et le chiffre du bas de la colonne suivante gagne 1.';
  var H_HEX = 'Addition hexadécimale : additionne chaque colonne en décimal (A = 10 … F = 15), puis réécris le total en base 16 : 19 = 13<sub>16</sub>, on pose 3 et on retient 1.';
  var T_DIV0 = 'Oublier un 0 au quotient quand le reste est plus petit que le diviseur : le quotient perd un chiffre et tout se décale.';
  var T_HEXCOL = 'Laisser un total de colonne en décimal : en base 16, 28 s’écrit 1C, on pose C et on retient 1.';
  var T_BORROW = 'Reporter l’emprunt sur le chiffre du haut de la colonne suivante : avec la méthode du cours, c’est le chiffre du bas qui gagne 1.';
  var H_N8 = ['Calcule d’abord le mot de 8 bits (addition ou soustraction posée) et garde les 8 bits de droite, même s’il y a une retenue ou un emprunt au-delà.',
    'Pour les colonnes décimales, refais l’opération sur les valeurs : en non signé, le résultat doit rester entre 0 et 255 ; en signé, entre −128 et 127. Sinon : ERREUR.',
    'Un mot qui commence par 1 est négatif en signé : prends son complément à deux pour lire sa valeur absolue.'];
  var T_N8 = ['Laisser le résultat binaire vide en cas de dépassement : on écrit toujours le mot de 8 bits ; ERREUR ne va que dans la colonne décimale concernée.',
    'Confondre retenue et dépassement signé : la retenue (ou l’emprunt) qui sort du bit 7 signale le dépassement non signé ; le dépassement signé se lit sur les signes.'];
  var H_IE = ['Encoder : écris le nombre en binaire, normalise-le en 1,… × 2<sup><i>e</i></sup>, puis E = <i>e</i> + 127 sur 8 bits et M = les chiffres après la virgule, complétés à droite jusqu’à 23 bits.',
    'Décoder un mot double précision : les 3 premiers chiffres hexadécimaux donnent S et E (11 bits, biais 1023), les 13 derniers donnent M (52 bits).',
    'E rempli de 1 : infini si M = 0, NaN sinon ; E = 0 : dénormalisé, 0,M × 2<sup>−1022</sup>. Pour <i>k</i> × 2<sup><i>n</i></sup>, déplace la virgule jusqu’à obtenir un entier impair et retire autant à l’exposant.'];
  var T_IE = ['Prendre le biais 127 pour un mot double précision : c’est 1023 (11 bits d’exposant).',
    'Stocker le 1 qui précède la virgule dans M : il est implicite.'];
  var NOTE_B1 = 'Corrigé officiel du Moodle, réservé aux élèves : chaque réponse a été recalculée par programme et concorde.';
  var NOTE_NONE = 'Pas de corrigé officiel (les annales n’ont que le sujet, en version adaptée) : réponses recalculées par programme et vérifiées.';
  var NOTE_OK = 'Toutes les réponses ont été recalculées par programme : le corrigé est juste.';

  /* =====================================================================
     Examen B1 2025-2026 (promo 2030), 1 h, 20 points : Moodle, corrigé officiel FR et EN
     ===================================================================== */
  card({ id: 'p2025-ex1', exam: 'p2025', order: 1, pts: 4, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 1, time: 12, official: true }, 'conv', {
    rows: [['1 0110 1101', 2, 10, 0, '365'], ['1A5', 16, 10, 0, '421'], ['528', 10, 16, 0, '210'], ['1101,1000 1', 2, 10, 0, '13,53125'],
      ['28,28', 16, 10, 0, '40,15625'], ['40,35', 10, 2, 5, '101000,01011'], ['22,84', 10, 16, 2, '16,D7'], ['1011 1011,1011 01', 2, 16, 0, 'BB,B4']]
  }, {
    src: 'Examen B1 2025-2026 · Ex 1', title: 'Conversions entre les bases 2, 10 et 16', intro: K_CONV,
    notes: {
      2: 'Piège : le résultat 210 a l’air décimal. En base 16, 210<sub>16</sub> = 2 × 256 + 1 × 16 + 0 = 528.',
      4: 'Piège : 0,28<sub>16</sub> ne vaut pas 0,28. 0,28<sub>16</sub> = 2/16 + 8/256 = 0,125 + 0,03125 = 0,15625.',
      7: 'Compléter à gauche (<span class="bn">0010 1101</span> = 2D) donnerait BB,2D : faux.'
    },
    hints: ['Lignes 1, 2, 4 et 5. ' + H_TO10, 'Lignes 3, 6 et 7. ' + H_FROM10, 'Ligne 8. ' + H_GRP],
    traps: ['Compléter le dernier paquet du mauvais côté : <span class="bn">1011 01</span> après la virgule devient <span class="bn">1011 0100</span> (B4), pas <span class="bn">0010 1101</span> (2D).',
      'Lire 28,28<sub>16</sub> comme 28,28 : la partie entière vaut 2 × 16 + 8 = 40 et la partie fractionnaire 0,15625.',
      'Écrire un chiffre hexadécimal en décimal : 0,84 × 16 = 13,44 donne le chiffre D, pas « 13 ».', T_ROUND],
    grading: '4 points pour les 8 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_B1
  });

  card({ id: 'p2025-ex2', exam: 'p2025', order: 2, pts: 6, topics: ['soustraction', 'addition', 'division', 'multiplication'], lvl: 2, time: 18, official: true }, 'ops', {
    rows: [['sub', 2, ['101110110', '11011011'], '10011011'], ['add', 16, ['763', 'FAA', '5B6'], '1CC3'], ['div', 2, ['101001101', '1001'], '100101'],
      ['mul', 2, ['10101010100', '101010'], '1101111111001000']]
  }, {
    src: 'Examen B1 2025-2026 · Ex 2', title: 'Opérations posées : soustraction, addition hexadécimale à trois termes, division, multiplication', intro: K_OP,
    notes: { 3: 'C’est exactement la multiplication de l’examen 1 de 2023-2024 (Ex 2).' },
    hints: [H_SUB, H_HEX, 'Division : 1001 va une fois dans 1010 ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon. Multiplication : une ligne par 1 du multiplicateur, décalée de sa position.'],
    traps: [T_DIV0, 'Mal décaler les produits partiels quand on saute les 0 du multiplicateur : 101010 a ses 1 aux positions 1, 3 et 5, donc des décalages de 1, 3 et 5 rangs.', T_HEXCOL, T_BORROW],
    grading: '6 points pour les 4 opérations ; la répartition n’est pas imprimée. Le détail des calculs est exigé.', note: NOTE_B1
  });

  card({ id: 'p2025-ex3', exam: 'p2025', order: 3, pts: 6, topics: ['non-signe', 'signe', 'depassement'], lvl: 2, time: 15, official: true }, 'n8', {
    rows: [['01010100', '-', '10011100', '10111000', 'E', 'E'], ['01110110', '+', '00011001', '10001111', '143', 'E'], ['11010011', '-', '00010110', '10111101', '189', '-67']]
  }, {
    src: 'Examen B1 2025-2026 · Ex 3', title: 'Opérations sur 8 bits : non signé, signé, dépassements', intro: P(K_8),
    hints: H_N8,
    traps: T_N8.concat(['Lire 10111101 comme 189 dans la colonne « Signée » : en signé, il vaut −67.',
      'Croire qu’une soustraction « positif − négatif » ne peut pas déborder : 84 − (−100) = 184 > 127.']),
    grading: '6 points pour 3 lignes de 3 cases ; la répartition n’est pas imprimée.', note: NOTE_B1
  });

  card({ id: 'p2025-ex4', exam: 'p2025', order: 4, pts: 4, topics: ['ieee-encodage', 'ieee-decodage', 'ieee-special'], lvl: 3, time: 12, official: true }, 'ieee', {
    enc: [['320', '0', '10000111', '01000000000000000000000'], ['0,09375', '0', '01111011', '10000000000000000000000']],
    dec: [['2844 0000 0000 0000', '5|-381'], ['7FF0 0001 0000 0000', 'NaN']]
  }, {
    src: 'Examen B1 2025-2026 · Ex 4', title: 'IEEE 754 : encoder en simple précision, décoder des mots double précision', q1: K_IE1, q2: K_IE2,
    hints: H_IE,
    traps: ['Écrire E sans ses zéros de tête : 0,09375 = <span class="bn">1,1<sub>2</sub></span> × 2<sup>−4</sup>, E = 123 = <span class="bn">01111011</span>, sur 8 bits.',
      'Stocker le 1 avant la virgule : 320 = <span class="bn">1,01<sub>2</sub></span> × 2<sup>8</sup> donne M = <span class="bn">0100…0</span>, pas <span class="bn">1010…0</span>.',
      T_IE[0], 'Croire qu’il faut beaucoup de bits à 1 dans M pour un NaN : 7FF0 0001 0000 0000 en est un.'],
    grading: '4 points pour 4 lignes (2 encodages, 2 décodages) ; la répartition n’est pas imprimée.', note: NOTE_B1
  });

  /* =====================================================================
     Examen 1 2024-2025 (promo 2029), 1 h 30, 20 points : version adaptée, sans corrigé
     ===================================================================== */
  card({ id: 'p2024-ex1', exam: 'p2024', order: 1, pts: 5, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 1, time: 18, official: false }, 'conv', {
    rows: [['1 1011 1011', 2, 10, 0, '443'], ['1BA', 16, 10, 0, '442'], ['171', 10, 2, 0, '10101011'], ['632', 10, 16, 0, '278'], ['1 0101,1101 1', 2, 10, 0, '21,84375'],
      ['18,5', 16, 10, 0, '24,3125'], ['38,42', 10, 2, 5, '100110,01101'], ['28,35', 10, 16, 4, '1C,5999'], ['B7,53', 16, 2, 0, '10110111,01010011'], ['1010 1101,1111 11', 2, 16, 0, 'AD,FC']]
  }, {
    src: 'Examen 1 2024-2025 · Ex 1', title: 'Conversions entre les bases 2, 10 et 16', intro: K_CONV,
    notes: { 1: 'Piège de lecture : 1BA suit une ligne qui donne 443. 1BA<sub>16</sub> = 256 + 11 × 16 + 10 = 256 + 176 + 10 = 442.' },
    hints: ['Lignes 1, 2, 5 et 6. ' + H_TO10, 'Lignes 3, 4, 7 et 8. ' + H_FROM10, 'Lignes 9 et 10. ' + H_GRP],
    traps: ['Arrondir le 4<sup>e</sup> chiffre de 28,35 : 0,35 × 16 = 5,6 puis 0,6 × 16 = 9,6 sans fin ; on garde 1C,5999, pas 1C,599A.',
      'Compléter <span class="bn">1111 11</span> à gauche : après la virgule, on complète à droite, <span class="bn">1111 1100</span> = FC.',
      'Perdre des zéros en hexadécimal → binaire : B7,53 → <span class="bn">1011 0111,0101 0011</span> (le 5 et le 3 gardent leurs 4 bits).',
      'Recopier une valeur voisine : <span class="bn">1 1011 1011<sub>2</sub></span> = 443 et <span class="bn">1BA<sub>16</sub></span> = 442.'],
    grading: '5 points pour les 10 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_NONE
  });

  card({ id: 'p2024-ex2', exam: 'p2024', order: 2, pts: 4, topics: ['soustraction', 'addition', 'division', 'multiplication'], lvl: 2, time: 18, official: false }, 'ops', {
    rows: [['sub', 2, ['110101101', '11011011'], '11010010'], ['add', 16, ['854', 'EB9', '6A7'], '1DB4'], ['div', 2, ['101101000', '1010'], '100100'],
      ['mul', 2, ['10011001100', '101100'], '1101001100010000']]
  }, {
    src: 'Examen 1 2024-2025 · Ex 2', title: 'Opérations posées : soustraction, addition hexadécimale à trois termes, division, multiplication', intro: K_OP,
    notes: { 1: 'Première addition hexadécimale à trois termes dans un sujet, comme l’exemple du cours (3B5 + C1A + D2F) ; l’examen B1 2025-2026 reprend ce format.' },
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', '20 = 14<sub>16</sub>, on pose 4 et on retient 1'),
      'Division : 1010 va une fois dans 1011 ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon. Multiplication : une ligne par 1 du multiplicateur, décalée de sa position.'],
    traps: [T_DIV0, 'Mal décaler les produits partiels : 101100 a ses 1 aux positions 2, 3 et 5, donc des décalages de 2, 3 et 5 rangs.', T_HEXCOL, T_BORROW],
    grading: '4 points pour les 4 opérations ; la répartition n’est pas imprimée. Le détail des calculs est exigé.', note: NOTE_NONE
  });

  card({ id: 'p2024-ex3', exam: 'p2024', order: 3, pts: 5, topics: ['non-signe', 'signe', 'depassement'], lvl: 2, time: 18, official: false }, 'n8', {
    g4: true,
    rows: [['01010011', '-', '10010111', '10111100', 'E', 'E'], ['00100101', '+', '00101010', '01001111', '79', '79'], ['11010110', '-', '00101110', '10101000', '168', '-88'],
      ['01111111', '+', '00000001', '10000000', '128', 'E'], ['11111111', '+', '00000001', '00000000', 'E', '0']]
  }, {
    src: 'Examen 1 2024-2025 · Ex 3', title: 'Opérations sur 8 bits : non signé, signé, dépassements', intro: P(K_8),
    notes: {
      3: 'Cas limite du cours : 127 + 1 donne <span class="bn">1000 0000</span>, qui est 128 en non signé mais −128 en signé.',
      4: 'Autre cas limite : 255 + 1 « fait le tour » et redonne 0 ; en signé, −1 + 1 = 0 est juste.'
    },
    hints: H_N8,
    traps: T_N8.concat(['<span class="bn">0111 1111</span> + 1 : pas de retenue, donc 128 est juste en non signé ; mais en signé, 127 + 1 = 128 > 127 : ERREUR.',
      '<span class="bn">1111 1111</span> + 1 : la retenue sort (non signé ERREUR) alors qu’en signé −1 + 1 = 0 est juste.',
      'Lire <span class="bn">1010 1000</span> comme 168 en signé : il vaut −88 (C2 = <span class="bn">0101 1000</span> = 88).']),
    grading: '5 points pour 5 lignes de 3 cases ; la répartition n’est pas imprimée.', note: NOTE_NONE
  });

  card({ id: 'p2024-ex4', exam: 'p2024', order: 4, pts: 6, topics: ['ieee-encodage', 'ieee-decodage', 'ieee-special'], lvl: 3, time: 20, official: false }, 'ieee', {
    enc: [['298', '0', '10000111', '00101010000000000000000'], ['59,75', '0', '10000100', '11011110000000000000000'], ['0,15625', '0', '01111100', '01000000000000000000000']],
    dec: [['3688 0000 0000 0000', '3|-152'], ['0015 8000 0000 0000', '43|-1027'], ['7FF0 0000 0000 0000', '+inf']]
  }, {
    src: 'Examen 1 2024-2025 · Ex 4', title: 'IEEE 754 : encoder en simple précision, décoder des mots double précision', q1: K_IE1, q2: K_IE2,
    notes: { '0015 8000 0000 0000': 'Piège : 0015… ressemble à un dénormalisé, mais E = <span class="bn">000 0000 0001</span> = 1 n’est pas nul : le nombre est normalisé, avec le plus petit exposant possible, 1 − 1023 = −1022.' },
    hints: H_IE,
    traps: ['Prendre 0015 8000 0000 0000 pour un dénormalisé : E = 1, il est normalisé (1,M × 2<sup>−1022</sup>).',
      'Répondre NaN pour 7FF0 0000 0000 0000 : M est nul, c’est +∞.',
      'Se tromper de sens pour l’exposant : 0,15625 = <span class="bn">0,00101<sub>2</sub></span> = <span class="bn">1,01<sub>2</sub></span> × 2<sup>−3</sup>, donc E = 124.',
      T_IE[0]],
    grading: '6 points pour 6 lignes (3 encodages, 3 décodages) ; la répartition n’est pas imprimée.', note: NOTE_NONE
  });

  /* =====================================================================
     Examen 1 2023-2024 (promo 2028), 1 h 30, 20 points : premier sujet au format actuel
     ===================================================================== */
  card({ id: 'p2023-ex1', exam: 'p2023', order: 1, pts: 5, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 1, time: 18, official: true }, 'conv', {
    rows: [['11011011', 2, 10, 0, '219'], ['1DB', 16, 10, 0, '475'], ['147', 10, 2, 0, '10010011'], ['524', 10, 16, 0, '20C'], ['11001,1011', 2, 10, 0, '25,6875'],
      ['25,B', 16, 10, 0, '37,6875'], ['57,48', 10, 2, 5, '111001,01111'], ['18,24', 10, 16, 3, '12,3D7'], ['DC,81', 16, 2, 0, '11011100,10000001'], ['1010100,10111', 2, 16, 0, '54,B8']]
  }, {
    src: 'Examen 1 2023-2024 · Ex 1', title: 'Conversions entre les bases 2, 10 et 16', intro: K_CONV,
    notes: { 8: 'Chaque chiffre donne 4 bits : 8 → <span class="bn">1000</span> et 1 → <span class="bn">0001</span>. Écrire « <span class="bn">1101 1100,11</span> » perd les zéros internes.' },
    hints: ['Lignes 1, 2, 5 et 6. ' + H_TO10, 'Lignes 3, 4, 7 et 8. ' + H_FROM10, 'Lignes 9 et 10. ' + H_GRP],
    traps: ['Écrire 12,3137 au lieu de 12,3D7 : la partie entière 13 d’un produit s’écrit D en hexadécimal.',
      'Perdre les zéros internes : DC,81 → <span class="bn">1101 1100,1000 0001</span>.',
      'Compléter <span class="bn">1010100,10111</span> du mauvais côté : <span class="bn">0101 0100,1011 1000</span> = 54,B8.', T_ROUND],
    grading: '5 points pour les 10 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK
  });

  card({ id: 'p2023-ex2', exam: 'p2023', order: 2, pts: 4, topics: ['soustraction', 'addition', 'division', 'multiplication'], lvl: 2, time: 18, official: true }, 'ops', {
    rows: [['sub', 2, ['110011001', '11111111'], '10011010'], ['add', 16, ['4854', 'CEB9'], '1170D'], ['div', 2, ['100101100', '1100'], '11001'],
      ['mul', 2, ['10101010100', '101010'], '1101111111001000']]
  }, {
    src: 'Examen 1 2023-2024 · Ex 2', title: 'Opérations posées : soustraction, addition hexadécimale, division, multiplication', intro: K_OP,
    notes: { 3: 'L’examen B1 2025-2026 reprend exactement cette multiplication.' },
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', '4 + 9 = 13 = D<sub>16</sub>, on pose D sans retenue'),
      'Division : 1100 va une fois dans 10010 (mais pas dans 1001) ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon.'],
    traps: [T_DIV0, 'Mal décaler les produits partiels : 101010 a ses 1 aux positions 1, 3 et 5.', T_HEXCOL,
      'Soustraire <span class="bn">11111111</span> « de tête » : les emprunts se propagent sur presque toutes les colonnes ; pose l’opération.'],
    grading: '4 points pour les 4 opérations ; la répartition n’est pas imprimée. Le détail des calculs est exigé.', note: NOTE_OK
  });

  card({ id: 'p2023-ex3', exam: 'p2023', order: 3, pts: 5, topics: ['non-signe', 'signe', 'depassement'], lvl: 2, time: 18, official: true }, 'n8', {
    rows: [['11010011', '-', '10011111', '00110100', '52', '52'], ['01101001', '+', '01101110', '11010111', '215', 'E'], ['01011010', '-', '10101110', '10101100', 'E', 'E'],
      ['11001000', '-', '11100010', '11100110', 'E', '-26'], ['01101111', '+', '10000001', '11110000', '240', '-16']]
  }, {
    src: 'Examen 1 2023-2024 · Ex 3', title: 'Opérations sur 8 bits : non signé, signé, dépassements', intro: P(K_8),
    notes: { 3: 'Ici le non signé déborde (200 − 226 < 0) mais le signé est juste : −56 − (−30) = −26.' },
    hints: H_N8,
    traps: T_N8.concat(['Mettre ERREUR dans les deux colonnes dès qu’une seule déborde : <span class="bn">11001000 − 11100010</span> donne ERREUR en non signé mais −26 en signé.',
      'Croire qu’une addition sans retenue ne déborde jamais : <span class="bn">01101001 + 01101110 = 11010111</span>, pas de retenue, mais 105 + 110 = 215 > 127 en signé.']),
    grading: '5 points pour 5 lignes de 3 cases ; la répartition n’est pas imprimée.', note: NOTE_OK
  });

  card({ id: 'p2023-ex4', exam: 'p2023', order: 4, pts: 6, topics: ['ieee-encodage', 'ieee-decodage', 'ieee-special'], lvl: 3, time: 20, official: true }, 'ieee', {
    enc: [['325', '0', '10000111', '01000101000000000000000'], ['67,375', '0', '10000101', '00001101100000000000000'], ['0,6875', '0', '01111110', '01100000000000000000000']],
    dec: [['3548 0000 0000 0000', '3|-172'], ['000A 8000 0000 0000', '21|-1027'], ['FFFF 0000 0000 0000', 'NaN']]
  }, {
    src: 'Examen 1 2023-2024 · Ex 4', title: 'IEEE 754 : encoder en simple précision, décoder des mots double précision', q1: K_IE1, q2: K_IE2,
    notes: { '000A 8000 0000 0000': 'C’est le seul dénormalisé corrigé dans les sujets : le corrigé applique bien 0,M × 2<sup>−1022</sup> ; avec −1023, on trouverait 21 × 2<sup>−1028</sup>, faux.' },
    hints: H_IE,
    traps: ['Prendre −1023 comme exposant d’un dénormalisé : c’est −1022, comme le plus petit normalisé.',
      'Donner 6 × 2<sup>−173</sup> au lieu de 3 × 2<sup>−172</sup> : c’est la même valeur, mais les corrigés donnent toujours <i>k</i> impair.',
      'Écrire « −NaN » pour FFFF 0000 0000 0000 : le signe d’un NaN ne compte pas, le corrigé écrit NaN.', T_IE[1]],
    grading: '6 points pour 6 lignes (3 encodages, 3 décodages) ; la répartition n’est pas imprimée.', note: NOTE_OK
  });

  /* =====================================================================
     Contrôle S1 2022-2023 (promo 2027), 1 h 30 : dernier sujet à l’ancien format
     ===================================================================== */
  card({ id: 'p2022-ex3', exam: 'p2022', order: 3, pts: 5, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 22, official: true }, 'conv', {
    rows: [['10111001,01101', 2, 10, 0, '185,40625'], ['CE,68', 16, 10, 0, '206,40625'], ['88,88', 10, 16, 2, '58,E1'], ['105,40625', 10, 2, 0, '1101001,01101'],
      ['151,32', 8, 2, 0, '1101001,01101'], ['151,32', 8, 16, 0, '69,68'], ['151,32', 16, 8, 0, '521,144'], ['59,27', 10, 7, 3, '113,161'], ['32', 4, 5, 0, '24'],
      ['101110101,01011', 2, 16, 0, '175,58']]
  }, {
    src: 'Contrôle 2022-2023 · Ex 3', title: 'Conversions, dont les bases 8, 7, 4 et 5', intro: K_CONV,
    notes: {
      4: '151,32<sub>8</sub> vaut 105,40625 : même résultat qu’à la ligne 4.',
      6: 'Piège : même écriture qu’aux deux lignes précédentes, mais 151,32 est ici en base 16.'
    },
    hints: [H_TO10 + ' ' + H_FROM10.split(' « ')[0], H_GRP, H_OLD],
    traps: ['Lire 151,32<sub>16</sub> (ligne 7) comme 151,32<sub>8</sub> : la forme de départ change d’une ligne à l’autre.',
      'Multiplier tout le produit : 0,88 × 16 = 14,08 donne E, puis on continue avec 0,08 (0,08 × 16 = 1,28 donne 1).',
      T_ROUND + ' En base 7 : 59,27 → 113,161.'],
    grading: '5 points pour les 10 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK + ' ' + OLD
  });

  card({ id: 'p2022-ex4', exam: 'p2022', order: 4, pts: 2, topics: ['non-signe', 'signe', 'depassement'], lvl: 1, time: 8, official: true }, null, null, {
    src: 'Contrôle 2022-2023 · Ex 4 (et 2019-2020 · Ex 4)', title: 'Sur 8 bits : 250 + 10, 4 − 10, 120 + 10, −126 − 10',
    questions: [
      '<b>Partie 1 : Encodage d’entiers non signés</b><br>1. Soit l’addition sur 8 bits suivante : 250 + 10<br>Les deux opérandes et le résultat sont sur 8 bits. Donnez la représentation du résultat sur 8 bits. Utilisez la base 10.',
      '2. Soit la soustraction sur 8 bits suivante : 4 − 10<br>Les deux opérandes et le résultat sont sur 8 bits. Donnez la représentation du résultat sur 8 bits. Utilisez la base 10.',
      '<b>Partie 2 : Encodage d’entiers signés</b><br>1. Soit l’addition sur 8 bits suivante : 120 + 10<br>Les deux opérandes et le résultat sont sur 8 bits. Donnez la représentation du résultat sur 8 bits. Utilisez la base 10.',
      '2. Soit la soustraction sur 8 bits suivante : −126 − 10<br>Les deux opérandes et le résultat sont sur 8 bits. Donnez la représentation du résultat sur 8 bits. Utilisez la base 10.'],
    hints: ['Écris chaque nombre sur 8 bits (le complément à deux pour −126), fais l’opération et garde les 8 bits de droite.',
      'Puis relis le mot obtenu : en non signé (partie 1), il vaut de 0 à 255 ; en signé (partie 2), de −128 à 127.'],
    solution: [
      { t: 'L’idée : sur 8 bits, les mots forment un cycle', html: P('Un mot de 8 bits n’a pas de 9<sup>e</sup> bit : la retenue ou l’emprunt qui sort à gauche est perdu. Après le plus grand mot, on repart du plus petit : en non signé, 255 + 1 donne 0 et 0 − 1 donne 255 ; en signé, 127 + 1 donne −128. La roue montre la même chose sur 4 bits (16 mots).') + tool('wheel', { value: 7 }) },
      { t: 'Partie 1, question 1 · 250 + 10', html: P('250 = ' + w8('1111 1010') + ' et 10 = ' + w8('0000 1010') + '.') + tool('posed', { op: 'add', ops: ['11111010', '00001010'], base: 2, step: false }) +
        P('Le 9<sup>e</sup> bit (la retenue) est perdu : il reste ' + w8('0000 0100') + ' = <strong>4</strong>. Le résultat exact, 260, dépasse 255 (dépassement non signé) : le mot vaut 260 − 256 = 4.') },
      { t: 'Partie 1, question 2 · 4 − 10', html: P('4 = ' + w8('0000 0100') + ' et 10 = ' + w8('0000 1010') + ' ; 4 est le plus petit : la soustraction emprunte au-delà du bit 7 (le 1 ajouté devant).') + tool('posed', { op: 'sub', ops: ['100000100', '00001010'], base: 2, pad: true, step: false }) +
        P('On garde les 8 bits : ' + w8('1111 1010') + ' = <strong>250</strong>. Le résultat exact, −6, est sous 0 (dépassement non signé) : le mot vaut −6 + 256 = 250.') },
      { t: 'Partie 2, question 1 · 120 + 10', html: P('120 = ' + w8('0111 1000') + ' et 10 = ' + w8('0000 1010') + ', deux positifs.') + tool('posed', { op: 'add', ops: ['01111000', '00001010'], base: 2, step: false }) +
        P(w8('1000 0010') + ' commence par 1 : il est négatif. C2(1000 0010) = ' + w8('0111 1110') + ' = 126, donc le mot vaut <strong>−126</strong>. Le résultat exact, 130, dépasse 127 (dépassement signé : positif + positif = négatif) : 130 − 256 = −126.') },
      { t: 'Partie 2, question 2 · −126 − 10', html: P('−126 s’encode C2(' + w8('0111 1110') + ') = ' + w8('1000 0010') + ' ; 10 = ' + w8('0000 1010') + '.') + tool('posed', { op: 'sub', ops: ['10000010', '00001010'], base: 2, pad: true, step: false }) +
        P(w8('0111 1000') + ' commence par 0 : il vaut <strong>120</strong>. Le résultat exact, −136, est sous −128 (dépassement signé : négatif − positif = positif) : −136 + 256 = 120.') }],
    answer: K.ans(['Opération sur 8 bits', 'Résultat (base 10)'], [
      [['Non signé : 250 + 10', '4'], { t: 'cyc', a: 250, op: '+', b: 10, sg: false }],
      [['Non signé : 4 − 10', '250'], { t: 'cyc', a: 4, op: '-', b: 10, sg: false }],
      [['Signé : 120 + 10', '−126'], { t: 'cyc', a: 120, op: '+', b: 10, sg: true }],
      [['Signé : −126 − 10', '120'], { t: 'cyc', a: -126, op: '-', b: 10, sg: true }]]),
    traps: ['Répondre « ERREUR » : la question demande ce que contient vraiment le mot de 8 bits (4, 250, −126, 120).',
      'Lire <span class="bn">1000 0010</span> comme 130 dans la partie 2 : en signé, c’est −126.',
      'Garder le 9<sup>e</sup> bit : sur 8 bits, la retenue ou l’emprunt qui sort à gauche est perdu.'],
    grading: '2 points pour les 4 questions (dans les deux sujets) ; la répartition n’est pas imprimée.',
    note: 'Mêmes questions aux exercices 4 de 2019-2020 et de 2022-2023 : ce sont les exemples du cours (IV.1.4 et IV.2.5). Réponses recalculées par programme.'
  });

  card({ id: 'p2022-ex5', exam: 'p2022', order: 5, pts: 4, topics: ['soustraction', 'addition', 'division'], lvl: 2, time: 15, official: true }, 'ops', {
    rows: [['sub', 2, ['110001110', '11100111'], '10100111'], ['add', 16, ['9CA8', 'BFCE'], '15C76'], ['div', 2, ['10101000', '1100'], '1110']]
  }, {
    src: 'Contrôle 2022-2023 · Ex 5', title: 'Opérations posées : soustraction, addition hexadécimale, division', intro: K_OP + base8('7246 + 2653'),
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', '8 + E = 22 = 16<sub>16</sub>, on pose 6 et on retient 1'),
      'Division : 1100 va une fois dans 10101 ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon.'],
    traps: [T_DIV0, T_HEXCOL, T_BORROW],
    grading: '4 points pour les 4 opérations du sujet (dont l’addition en base 8) ; la répartition n’est pas imprimée.', note: NOTE_OK
  });

  /* =====================================================================
     Contrôle S1 2021-2022 (promo 2026), 1 h 30
     ===================================================================== */
  card({ id: 'p2021-ex3', exam: 'p2021', order: 3, pts: 5, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 22, official: true }, 'conv', {
    rows: [['11101001,00011', 2, 10, 0, '233,09375'], ['DA,18', 16, 10, 0, '218,09375'], ['99,99', 10, 16, 2, '63,FD'], ['103,09375', 10, 2, 0, '1100111,00011'],
      ['134,64', 8, 2, 0, '1011100,1101'], ['741,735', 8, 16, 0, '1E1,EE8'], ['D9,B7', 16, 8, 0, '331,556'], ['80,25', 10, 13, 2, '62,33'], ['42', 5, 7, 0, '31'],
      ['100110011,10011', 2, 16, 0, '133,98']]
  }, {
    src: 'Contrôle 2021-2022 · Ex 3', title: 'Conversions, dont les bases 8, 13, 5 et 7', intro: K_CONV,
    notes: { 9: 'Même ligne qu’au contrôle 2020-2021 (Ex 3).' },
    hints: [H_TO10 + ' ' + H_FROM10.split(' « ')[0], H_GRP, H_OLD],
    traps: ['En base 13, un reste ou une partie entière de 10, 11 ou 12 s’écrit A, B ou C (ici 80 = 6 × 13 + 2 : pas de lettre).',
      'Perdre des zéros en base 8 → base 2 : chaque chiffre donne 3 bits, 0,64<sub>8</sub> → <span class="bn">0,110 100</span>, puis on retire seulement les 0 de la fin : <span class="bn">0,1101<sub>2</sub></span>.', T_ROUND],
    grading: '5 points pour les 10 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK + ' ' + OLD
  });

  card({ id: 'p2021-ex4', exam: 'p2021', order: 4, pts: 5, topics: ['soustraction', 'addition', 'division', 'multiplication'], lvl: 2, time: 20, official: true }, 'ops', {
    rows: [['sub', 2, ['101011010', '10100111'], '10110011'], ['add', 16, ['5987', 'DFA7'], '1392E'], ['div', 2, ['10101000', '1110'], '1100'],
      ['mul', 2, ['10001111100', '1010110'], '11000000110101000']]
  }, {
    src: 'Contrôle 2021-2022 · Ex 4', title: 'Opérations posées : soustraction, addition hexadécimale, division, multiplication', intro: K_OP + base8('5472 + 3521'),
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', '7 + 7 = 14 = E<sub>16</sub>, on pose E sans retenue'),
      'Multiplication : 1010110 a ses 1 aux positions 1, 2, 4 et 6 ; quatre produits partiels à additionner.'],
    traps: [T_DIV0, 'Additionner quatre produits partiels d’un coup : une colonne peut valoir 4 = 100<sub>2</sub>, la retenue part alors deux rangs plus loin.', T_HEXCOL],
    grading: '5 points pour les 5 opérations du sujet (dont l’addition en base 8) ; la répartition n’est pas imprimée.', note: NOTE_OK
  });

  card({ id: 'p2021-ex5', exam: 'p2021', order: 5, pts: 4, topics: ['bases', 'plages', 'signe'], lvl: 1, time: 10, official: true }, null, null, {
    src: 'Contrôle 2021-2022 · Ex 5', title: 'Puissances négatives de 2, combinaisons d’un octet, nombre de bits en signé',
    questions: [
      '1. Calculez les puissances négatives de deux suivantes :' + K.tbl(['Puissance', 'Réponse'], ['2<sup>-8</sup>', '2<sup>-9</sup>', '2<sup>-10</sup>'].map(function (p) { return K.tr([K.td(p), K.td('')]); })),
      '2. Combien de combinaisons possède un octet ?',
      '3. Combien faut-il de bits, au minimum, pour représenter en binaire signé le nombre 8192 ?',
      '4. Combien faut-il de bits, au minimum, pour représenter en binaire signé le nombre -8192 ?'],
    hints: ['Question 1 : pars de 2<sup>−5</sup> = 0,03125 (à connaître) et divise par 2 à chaque fois.',
      'Questions 3 et 4 : sur n bits signés, la plage va de −2<sup>n−1</sup> à 2<sup>n−1</sup> − 1. Et 8192 = 2<sup>13</sup>.'],
    solution: [
      { t: 'Question 1 · diviser par 2 à chaque fois', html: P('Chaque puissance négative de 2 est la moitié de la précédente :') +
        K.ans(['Puissance', 'Valeur'], [-5, -6, -7, -8, -9, -10].map(function (k) {
          return [[pow2(k), { '-5': '0,03125', '-6': '0,015625', '-7': '0,0078125', '-8': '0,00390625', '-9': '0,001953125', '-10': '0,0009765625' }[k]], { t: 'pow2', k: k }];
        })) + P('Pour t’entraîner aux puissances de 2 :') + tool('drill', { kind: 'pow2' }) },
      { t: 'Question 2 · les combinaisons d’un octet', html: P('Un octet a 8 bits, chacun vaut 0 ou 1 : 2<sup>8</sup> = <strong>256</strong> combinaisons, de <span class="bn">0000 0000</span> à <span class="bn">1111 1111</span>.') },
      { t: 'Question 3 · 8192 en signé', html: P('Sur n bits signés, le plus grand entier est 2<sup>n−1</sup> − 1. Comme 8192 = 2<sup>13</sup>, il faut 2<sup>n−1</sup> − 1 ≥ 2<sup>13</sup>, donc n − 1 ≥ 14 : <strong>15 bits</strong>. Sur 14 bits, le plus grand est 2<sup>13</sup> − 1 = 8191 : il manque 1.') +
        P('En binaire, 8192 = ' + bn('10000000000000', 2) + ' (14 chiffres) ; il faut un 0 devant pour le signe. Clique sur 14 : des bits utiles sont perdus.') + tool('register', { n: 15, value: '010000000000000', sizes: [14, 15, 16] }) },
      { t: 'Question 4 · −8192 en signé', html: P('Le plus petit entier sur n bits signés est −2<sup>n−1</sup>. Comme −8192 = −2<sup>13</sup>, n − 1 = 13 suffit : <strong>14 bits</strong>, le mot ' + bn('10000000000000', 2) + ' (bit de signe à 1, tout le reste à 0). La plage n’est pas symétrique : −8192 tient sur 14 bits, 8192 non.') +
        tool('register', { n: 14, value: '10000000000000', sizes: [14, 15, 16] }) }],
    answer: K.ans(['Question', 'Réponse'], [
      [['1. 2<sup>−8</sup>', '0,00390625'], { t: 'pow2', k: -8 }], [['1. 2<sup>−9</sup>', '0,001953125'], { t: 'pow2', k: -9 }], [['1. 2<sup>−10</sup>', '0,0009765625'], { t: 'pow2', k: -10 }],
      [['2. Combinaisons d’un octet', '256'], { t: 'patterns', n: 8 }],
      [['3. 8192 en signé', '15 bits'], { t: 'minbits', v: 8192 }], [['4. −8192 en signé', '14 bits'], { t: 'minbits', v: -8192 }]]),
    traps: ['Donner la même réponse pour 8192 et −8192 : la plage signée n’est pas symétrique (15 bits contre 14).',
      'Compter les chiffres binaires de 8192 (14) sans ajouter le bit de signe.',
      'Oublier un zéro : 2<sup>−8</sup> = 0,00390625, pas 0,0390625. Chaque division par 2 ajoute un chiffre après la virgule.'],
    grading: '4 points pour les 4 questions ; la répartition n’est pas imprimée.', note: NOTE_OK
  });

  /* =====================================================================
     Contrôle S1 2020-2021 (promo 2025), 1 h 30 : barème différent en français et en anglais
     ===================================================================== */
  card({ id: 'p2020-ex3', exam: 'p2020', order: 3, pts: 5, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 22, official: true }, 'conv', {
    rows: [['10111001,0101', 2, 10, 0, '185,3125'], ['E8,5', 16, 10, 0, '232,3125'], ['167,7', 10, 16, 2, 'A7,B3'], ['92,3125', 10, 2, 0, '1011100,0101'],
      ['13,25', 8, 2, 0, '1011,010101'], ['2705,14', 8, 16, 0, '5C5,3'], ['4BC,23', 16, 8, 0, '2274,106'], ['80,25', 10, 5, 2, '310,11'], ['40', 9, 3, 0, '1100'],
      ['100110011,10011', 2, 16, 0, '133,98']]
  }, {
    src: 'Contrôle 2020-2021 · Ex 3', title: 'Conversions, dont les bases 8, 5, 9 et 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10.split(' « ')[0], H_GRP, H_OLD],
    traps: ['Hexadécimal → base 8 : on ne convertit pas chiffre à chiffre ; on passe par la base 2, puis des paquets de 3 bits à partir de la virgule.',
      'Oublier un chiffre nul en base 3 : 40<sub>9</sub> donne 11 et 00, soit <span class="bn">1100<sub>3</sub></span>, pas <span class="bn">11<sub>3</sub></span>.', T_ROUND],
    grading: '5 points pour les 10 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK + ' ' + OLD
  });

  card({ id: 'p2020-ex5', exam: 'p2020', order: 5, pts: 6, topics: ['plages', 'non-signe', 'signe'], lvl: 1, time: 10, official: true }, null, null, {
    src: 'Contrôle 2020-2021 · Ex 5 (et 2016-2017, 2018-2019 · Ex 6)', title: 'Sur n bits : combien d’entiers, le plus grand, le plus petit',
    questions: [
      '1. En fonction de n, combien d’entiers non signés peut-on coder sur n bits ?',
      '2. En fonction de n, combien d’entiers signés peut-on coder sur n bits ?',
      '3. En fonction de n, quel est le plus grand entier non signé que l’on peut coder sur n bits ?',
      '4. En fonction de n, quel est le plus grand entier signé que l’on peut coder sur n bits ?',
      '5. En fonction de n, quel est le plus petit entier signé que l’on peut coder sur n bits ?',
      '6. Le complément à un d’un mot s’obtient en inversant chacun de ses bits. Répondre vrai ou faux. <span class="muted">(2020-2021 seulement)</span>'],
    hints: ['Teste avec n = 4 : 16 mots, de <span class="bn">0000</span> à <span class="bn">1111</span>.', 'En signé (complément à deux), le bit de poids fort est le bit de signe : la moitié des mots sont négatifs.'],
    solution: [
      { t: 'Questions 1 et 2 · combien de mots ?', html: P('Chaque bit vaut 0 ou 1 : un mot de n bits a 2 × 2 × … × 2 = <strong>2<sup>n</sup></strong> combinaisons. En non signé, elles codent 0 … 2<sup>n</sup> − 1. En signé, ce sont les mêmes 2<sup>n</sup> mots, partagés en deux moitiés (bit de poids fort 0 : zéro et positifs ; 1 : négatifs) : encore <strong>2<sup>n</sup></strong> entiers.') +
        P('Sur 4 bits : 16 mots, de 0 à 15 en non signé (dedans), de −8 à 7 en signé (dehors).') + tool('wheel', { value: 7 }) },
      { t: 'Question 3 · le plus grand non signé', html: P('Tous les bits à 1 : 1 + 2 + 4 + … + 2<sup>n−1</sup> = <strong>2<sup>n</sup> − 1</strong>. Sur 8 bits : <span class="bn">1111 1111</span> = 255 = 2<sup>8</sup> − 1.') },
      { t: 'Questions 4 et 5 · les signés', html: P('La moitié des mots, 2<sup>n−1</sup>, codent les négatifs −2<sup>n−1</sup> … −1 ; les 2<sup>n−1</sup> autres codent 0 … 2<sup>n−1</sup> − 1. Le plus grand est <span class="bn">0111…1</span> = <strong>2<sup>n−1</sup> − 1</strong>, le plus petit <span class="bn">1000…0</span> = <strong>−2<sup>n−1</sup></strong> : il y a un négatif de plus que de positifs.') +
        K.ans(['Bits', 'Non signé', 'Signé'], [4, 8, 16].map(function (n) {
          return [[String(n), '0 … ' + K.dec(Math.pow(2, n) - 1), K.dec(-Math.pow(2, n - 1)) + ' … ' + K.dec(Math.pow(2, n - 1) - 1)], { t: 'range', n: n }];
        }), 2) + P('Le registre montre les deux lectures d’un même mot ; change sa taille avec 4, 8, 16.') + tool('register', { n: 8, value: '01111111', sizes: [4, 8, 16] }) },
      { t: 'Question 6 · le complément à un', html: P('<strong>Vrai</strong> : c’est la définition du cours (III.2). Par exemple, <span class="bn">0011 0110</span> devient <span class="bn">1100 1001</span>. Le complément à deux, lui, ajoute 1 au complément à un. Essaie avec le bouton « Complément à un ».') +
        tool('register', { n: 8, value: '00110110', sizes: [8] }) }],
    answer: K.ans(['Question', 'Réponse'], [
      [['1. Entiers non signés sur n bits', '2<sup>n</sup>'], { t: 'kn', q: 'countU' }], [['2. Entiers signés sur n bits', '2<sup>n</sup>'], { t: 'kn', q: 'countS' }],
      [['3. Plus grand non signé', '2<sup>n</sup> − 1'], { t: 'kn', q: 'maxU' }], [['4. Plus grand signé', '2<sup>n−1</sup> − 1'], { t: 'kn', q: 'maxS' }],
      [['5. Plus petit signé', '−2<sup>n−1</sup>'], { t: 'kn', q: 'minS' }], [['6. Complément à un', 'Vrai'], { t: 'ones', w: '00110110' }]]),
    traps: ['Répondre 2<sup>n</sup> pour le plus grand non signé : on commence à 0, donc on s’arrête à 2<sup>n</sup> − 1.',
      'Répondre 2<sup>n−1</sup> pour le nombre d’entiers signés : il y en a autant qu’en non signé, 2<sup>n</sup>.',
      'Écrire −(2<sup>n−1</sup> − 1) pour le plus petit signé : c’est −2<sup>n−1</sup> (−128 sur 8 bits).'],
    grading: '2020-2021 : 6 points pour les 6 questions dans le sujet français, 4 points dans le sujet anglais. 2016-2017 et 2018-2019 : 4 points pour les questions 1 à 5.',
    note: 'Questions 1 à 5 identiques en 2016-2017 (Ex 6) et 2018-2019 (Ex 6) ; la question 6 n’existe qu’en 2020-2021. Les trois corrigés donnent ces réponses, recalculées par programme.'
  });

  /* =====================================================================
     Contrôle S1 2019-2020 (promo 2024) : pas de sujet français, énoncé repris du corrigé
     ===================================================================== */
  card({ id: 'p2019-ex3', exam: 'p2019', order: 3, pts: 4, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 18, official: true }, 'conv', {
    rows: [['11101101,1011', 2, 10, 0, '237,6875'], ['23F,B', 16, 10, 0, '575,6875'], ['1027,5', 10, 16, 0, '403,8'], ['221,3125', 10, 2, 0, '11011101,0101'],
      ['335,24', 8, 16, 0, 'DD,5'], ['105,34', 10, 7, 3, '210,224'], ['36', 9, 3, 0, '1020'], ['1011001101,01101', 2, 16, 0, '2CD,68']]
  }, {
    src: 'Contrôle 2019-2020 · Ex 3', title: 'Conversions, dont les bases 8, 7, 9 et 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10.split(' « ')[0], H_GRP, H_OLD],
    traps: ['Écrire 403,5 pour 1027,5 : 0,5 × 16 = 8, la partie fractionnaire en base 16 est 8.',
      'Garder les zéros de tête : <span class="bn">0000 1101 1101,0101</span> s’écrit DD,5 (et non 0DD,50).', T_ROUND],
    grading: '4 points pour les 8 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK + ' ' + OLD + ' Pas de sujet français dans les annales : l’énoncé vient du corrigé français.'
  });

  card({ id: 'p2019-ex5', exam: 'p2019', order: 5, pts: 4, topics: ['soustraction', 'addition', 'division'], lvl: 2, time: 15, official: true }, 'ops', {
    rows: [['sub', 2, ['100110110', '10011111'], '10010111'], ['add', 16, ['6CD9', '8FA1'], 'FC7A'], ['div', 2, ['10001111', '1011'], '1101']]
  }, {
    src: 'Contrôle 2019-2020 · Ex 5', title: 'Opérations posées : soustraction, addition hexadécimale, division', intro: K_OP + base8('4257 + 7777'),
    notes: { 1: 'Ici, pas de 5<sup>e</sup> chiffre : la dernière colonne ne produit pas de retenue.', 2: 'C’est la division du contrôle 2016-2017 (Ex 5).' },
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', '9 + 1 = 10 = A<sub>16</sub>, on pose A sans retenue'),
      'Division : 1011 va une fois dans 1100 ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon.'],
    traps: [T_DIV0, 'Ajouter un chiffre de tête par habitude : 6CD9 + 8FA1 = FC7A, sans retenue finale.', T_HEXCOL],
    grading: '4 points pour les 4 opérations du sujet (dont l’addition en base 8) ; la répartition n’est pas imprimée.', note: NOTE_OK
  });

  /* =====================================================================
     Contrôle S1 2018-2019 (promo 2023) : corrigé anglais seulement
     ===================================================================== */
  card({ id: 'p2018-ex3', exam: 'p2018', order: 3, pts: 4, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 18, official: true }, 'conv', {
    rows: [['10101101,0011', 2, 10, 0, '173,1875'], ['D7,3', 16, 10, 0, '215,1875'], ['141,3', 10, 16, 2, '8D,4C'], ['87,1875', 10, 2, 0, '1010111,0011'],
      ['3071,16', 8, 16, 0, '639,38'], ['104,28', 10, 5, 2, '404,12'], ['42', 9, 3, 0, '1102'], ['1011101101,0110111', 2, 16, 0, '2ED,6E']]
  }, {
    src: 'Contrôle 2018-2019 · Ex 3', title: 'Conversions, dont les bases 8, 5, 9 et 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10.split(' « ')[0], H_GRP, H_OLD],
    traps: ['Arrondir 141,3 : 0,3 × 16 = 4,8 (4), puis 0,8 × 16 = 12,8 (C) ; on écrit 8D,4C, comme le corrigé, et non 8D,4D.',
      'Compléter <span class="bn">0110111</span> à gauche : après la virgule, <span class="bn">0110 1110</span> = 6E.', 'Lire 0,3<sub>16</sub> comme 0,3 : D7,3<sub>16</sub> = 215 + 3/16 = 215,1875.'],
    grading: '4 points pour les 8 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK + ' ' + OLD + ' Pas de corrigé français : le corrigé anglais fait foi.'
  });

  card({ id: 'p2018-ex5', exam: 'p2018', order: 5, pts: 4, topics: ['soustraction', 'addition', 'division'], lvl: 2, time: 15, official: true }, 'ops', {
    rows: [['sub', 2, ['100011010', '10101101'], '1101101'], ['add', 16, ['3C28', 'D8A4'], '114CC'], ['div', 2, ['10011010', '1110'], '1011']]
  }, {
    src: 'Contrôle 2018-2019 · Ex 5', title: 'Opérations posées : soustraction, addition hexadécimale, division', intro: K_OP + base8('7654 + 3210'),
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', '8 + 4 = 12 = C<sub>16</sub>, on pose C sans retenue'),
      'Division : 1110 va une fois dans 10011 ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon.'],
    traps: [T_DIV0, T_HEXCOL, T_BORROW],
    grading: '4 points pour les 4 opérations du sujet (dont l’addition en base 8) ; la répartition n’est pas imprimée.', note: NOTE_OK + ' Pas de corrigé français : le corrigé anglais fait foi.'
  });

  /* =====================================================================
     Contrôle S1 2017-2018 (promo 2022)
     ===================================================================== */
  card({ id: 'p2017-ex2', exam: 'p2017', order: 2, pts: 4, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 18, official: true }, 'conv', {
    rows: [['11110001,0001', 2, 10, 0, '241,0625'], ['3FA,1', 16, 10, 0, '1018,0625'], ['125,4', 10, 16, 2, '7D,66'], ['52,0625', 10, 2, 0, '110100,0001'],
      ['6142,153', 8, 16, 0, 'C62,358'], ['7,25', 10, 5, 3, '12,111'], ['67', 9, 3, 0, '2021'], ['1110101011,111011', 2, 16, 0, '3AB,EC']]
  }, {
    src: 'Contrôle 2017-2018 · Ex 2', title: 'Conversions, dont les bases 8, 5, 9 et 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10.split(' « ')[0], H_GRP, H_OLD],
    traps: ['0,4 en base 16 : 0,4 × 16 = 6,4, puis 0,4 revient, d’où 0,666… ; avec 2 chiffres, 7D,66.',
      'Oublier des 0 dans la partie fractionnaire : 0,0625 = 2<sup>−4</sup> s’écrit <span class="bn">0,0001<sub>2</sub></span>.', T_ROUND],
    grading: '4 points pour les 8 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK + ' ' + OLD
  });

  card({ id: 'p2017-ex3', exam: 'p2017', order: 3, pts: 4, topics: ['non-signe', 'signe', 'depassement'], lvl: 2, time: 15, official: true }, 'n8', {
    rows: [['01100110', '-', '10011011', '11001011', 'E', 'E'], ['10001100', '+', '01111110', '00001010', 'E', '10'], ['01111011', '+', '10000011', '11111110', '254', '-2'],
      ['10010011', '-', '10001101', '00000110', '6', '6']]
  }, {
    src: 'Contrôle 2017-2018 · Ex 3', title: 'Opérations sur 8 bits : non signé, signé, dépassements', intro: P(K_8 + ' Le résultat seul est attendu (pas de détail).'),
    notes: { 1: 'Ici la retenue sort (non signé ERREUR) mais le signé est juste : −116 + 126 = 10.' },
    hints: H_N8,
    traps: T_N8.concat(['Mettre ERREUR en signé à cause de la retenue de 10001100 + 01111110 : en signé, −116 + 126 = 10 est juste.']),
    grading: '4 points pour 4 lignes de 3 cases ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK
  });

  card({ id: 'p2017-ex4', exam: 'p2017', order: 4, pts: 4, topics: ['soustraction', 'addition', 'division'], lvl: 2, time: 15, official: true }, 'ops', {
    rows: [['sub', 2, ['101101101', '10100110'], '11000111'], ['add', 16, ['F8CC', '32BB'], '12B87'], ['div', 2, ['10001111', '1101'], '1011']]
  }, {
    src: 'Contrôle 2017-2018 · Ex 4', title: 'Opérations posées : soustraction, addition hexadécimale, division', intro: K_OP + base8('3734 + 4725'),
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', 'C + B = 23 = 17<sub>16</sub>, on pose 7 et on retient 1'),
      'Division : 1101 va une fois dans 10001 ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon.'],
    traps: [T_DIV0, T_HEXCOL, T_BORROW],
    grading: '4 points pour les 4 opérations du sujet (dont l’addition en base 8) ; la répartition n’est pas imprimée.', note: NOTE_OK
  });

  /* =====================================================================
     Midterm Exam S1 2016-2017 (promo 2021) : sujet et corrigé en anglais seulement
     ===================================================================== */
  var TRAD = ' Le sujet n’existe qu’en anglais : énoncé traduit avec les consignes des sujets suivants.';
  card({ id: 'p2016-ex3', exam: 'p2016', order: 3, pts: 4, topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 18, official: true }, 'conv', {
    rows: [['10011101,1001', 2, 10, 0, '157,5625'], ['1AD,9', 16, 10, 0, '429,5625'], ['515,3', 10, 16, 2, '203,4C'], ['78,6875', 10, 2, 0, '1001110,1011'],
      ['427,316', 8, 16, 0, '117,67'], ['9,99', 10, 7, 3, '12,663'], ['24', 9, 3, 0, '211'], ['1010101111,10101', 2, 16, 0, '2AF,A8']]
  }, {
    src: 'Midterm 2016-2017 · Ex 3', title: 'Conversions, dont les bases 8, 7, 9 et 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10.split(' « ')[0], H_GRP, H_OLD],
    traps: ['Arrondir 515,3 : 0,3 × 16 = 4,8 (4), puis 0,8 × 16 = 12,8 (C) ; le corrigé écrit 203,4C, pas 203,4D. C’est la preuve que les corrigés tronquent.',
      'Oublier le zéro de tête d’un paquet de 2 chiffres en base 3 : 24<sub>9</sub> donne 02 et 11, soit <span class="bn">211<sub>3</sub></span>.', 'Lire 0,9<sub>16</sub> comme 0,9 : 1AD,9<sub>16</sub> = 429 + 9/16 = 429,5625.'],
    grading: '4 points pour les 8 lignes ; la répartition n’est pas imprimée. Seul le résultat est attendu.', note: NOTE_OK + ' ' + OLD + TRAD
  });

  card({ id: 'p2016-ex5', exam: 'p2016', order: 5, pts: 4, topics: ['soustraction', 'addition', 'division'], lvl: 2, time: 15, official: true }, 'ops', {
    rows: [['sub', 2, ['100101010', '10111011'], '1101111'], ['add', 16, ['C3AB', '5EA9'], '12254'], ['div', 2, ['10001111', '1011'], '1101']]
  }, {
    src: 'Midterm 2016-2017 · Ex 5', title: 'Opérations posées : soustraction, addition hexadécimale, division', intro: K_OP + base8('5633 + 7247'),
    notes: { 2: 'Le contrôle 2019-2020 reprend cette division.' },
    hints: [H_SUB, H_HEX.replace('19 = 13<sub>16</sub>, on pose 3 et on retient 1', 'B + 9 = 20 = 14<sub>16</sub>, on pose 4 et on retient 1'),
      'Division : 1011 va une fois dans 1100 ; à chaque chiffre abaissé, écris 1 au quotient si le reste contient le diviseur, 0 sinon.'],
    traps: [T_DIV0, 'Garder les zéros de tête du résultat de la soustraction : <span class="bn">0 0110 1111</span> s’écrit <span class="bn">110 1111</span>.', T_HEXCOL],
    grading: '4 points pour les 4 opérations du sujet (dont l’addition en base 8) ; la répartition n’est pas imprimée.', note: NOTE_OK + TRAD
  });
})();
