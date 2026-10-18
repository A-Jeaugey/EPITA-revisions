/* Archi — exercices des TD 1 « Bases de numération » et TD 2 « Encodage d’entiers » (Moodle 2026-27, David Bouchet).
   Une fiche par exercice, kind 'td', exam null, ids td<N>-ex<M>. Les exercices longs sont coupés : td1-ex2a et
   td1-ex2b (questions 2.1 et 2.2 : deux tableaux de 12 conversions), td1-ex3a … td1-ex3e (questions 3.1 à 3.5 :
   une sorte d’opération par fiche, pour le filtre par notion). Le TD 3 n’est pas fourni : aucune fiche.
   - Énoncés verbatim (TD_01.pdf, TD_02.pdf, tableaux relus sur les pages), signe moins « − ». Coquilles des
     énoncés signalées dans la fiche (<p class="sol-note">) : « en hexadécimale » (TD 2, 3.2 et 3.3), « positif »
     non défini pour 0 (TD 2, 3.4 et 3.5).
   - Aucun corrigé officiel des TD : corrections rédigées. Chaque résultat est recalculé deux fois (fractions
     exactes en Python ; REV.archi sous node), ce que montrent les outils compris. « n chiffres après la virgule » :
     on tronque, comme le cours et les corrigés des sujets ; la fiche dit quand l’arrondi donnerait autre chose.
   - Corrigés : la méthode du cours, puis l’outil de assets/js/archi.js qui montre le calcul :
     <div data-archi="place|divs|mults|groups|posed|register|wheel|drill" data-opts='{…}'> (monté par archi.js,
     aussi quand la correction est ajoutée plus tard à la page).
   - near : fiches de sujets du même type (ids pAAAA-exN de data/archi/ex-annales.js).
   - Nombres : écrits à la française dans ce fichier (virgule, paquets de 4 bits, espace des milliers) ; num() les
     affiche dans la langue de la page (en anglais : point décimal, y compris en binaire et en hexadécimal, et
     virgule des milliers en décimal, comme Chapter_1.pdf et Tutorial_01.pdf). Mots de 8 bits sans espace, comme
     dans le TD 2.
   - window.ARCHI_TD : les outils d’écriture, les données chiffrées (DATA) et les constructeurs de tableaux et
     d’étapes, repris par data/en/archi/ex-td.js, qui n’écrit que les mots anglais. */
(function () {
  'use strict';
  var R = window.REV, X = window.ARCHI_EX = window.ARCHI_EX || [];
  var EN = !!(R && R.lang === 'en');
  var MINUS = '−';

  /* ================================================================== écriture */
  /* texte décimal écrit à la française → langue de la page (virgule décimale, espace des milliers) */
  function dtext(s) {
    s = String(s);
    if (EN) return s.replace(/(\d),(\d)/g, '$1.$2').replace(/(\d) (?=\d{3}(?!\d))/g, '$1,');
    return s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u202f');
  }
  /* un nombre écrit à la française → <span class="bn">…<sub>base</sub></span>. b : 2, 16 ou 10 ;
     sub : false pour ne pas écrire l’indice de base. En base 2 et 16, les espaces sont des paquets de 4. */
  function num(s, b, sub) {
    s = String(s).replace(/^-/, MINUS);
    if (b === 10) s = dtext(s);
    else if (EN) s = s.replace(/,/g, '.');
    return '<span class="bn">' + s + (sub === false ? '' : '<sub>' + b + '</sub>') + '</span>';
  }
  function B(s) { return num(s, 2); }
  function H(s) { return num(s, 16); }
  function D(s) { return num(s, 10, false); }
  function W(s) { return num(s, 2, false); }                  /* mot de n bits, sans indice */
  function pw(b, k) { return b + '<sup>' + (typeof k === 'number' && k < 0 ? MINUS + (-k) : k) + '</sup>'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/'/g, '&#39;'); }
  /* outil déclaratif de archi.js */
  function tool(kind, o) { return '<div data-archi="' + kind + '" data-opts=\'' + esc(JSON.stringify(o)) + '\'></div>'; }
  function calc(lines) { return '<div class="calc">' + lines.map(function (l) { return '<div>' + l + '</div>'; }).join('') + '</div>'; }
  /* tableau : head = lignes d’en-tête (cellule : texte ou { h, cs, rs, cls }), rows = lignes du corps ;
     o.th : la première cellule de chaque ligne est un en-tête de ligne ; o.cls : classe du cadre ; o.w : largeur
     maximale du cadre (rem), pour qu’un petit tableau ne s’étale pas sur toute la largeur. */
  function cell(tag, c) {
    if (c && typeof c === 'object') return '<' + tag + (c.cs ? ' colspan="' + c.cs + '"' : '') + (c.rs ? ' rowspan="' + c.rs + '"' : '') + (c.cls ? ' class="' + c.cls + '"' : '') + '>' + c.h + '</' + tag + '>';
    return '<' + tag + '>' + (c == null ? '' : c) + '</' + tag + '>';
  }
  function tbl(head, rows, o) {
    o = o || {};
    if (head.length && !Array.isArray(head[0])) head = [head];
    return '<div class="tbl' + (o.cls ? ' ' + o.cls : '') + '"' + (o.w ? ' style="max-width:' + o.w + 'rem;margin-block:.45rem"' : '') + '><table>' + (o.cap ? '<caption>' + o.cap + '</caption>' : '') +
      (head.length ? '<thead>' + head.map(function (r) { return '<tr>' + r.map(function (c) { return cell('th', c); }).join('') + '</tr>'; }).join('') + '</thead>' : '') +
      '<tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return cell(i === 0 && o.th ? 'th' : 'td', c); }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  function ul(items) { return '<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  /* dans les textes : « 1 0001₂ », « 1C₁₆ », « 0,0110 0110…₂ » → num() (indice en <sub>, séparateur de la langue) */
  function M(s) {
    return String(s).replace(/([0-9A-F]+(?:[ ,.][0-9A-F]+)*)(…?)(₂|₁₆)/g, function (m, n, more, b) { return num(n + more, b === '₂' ? 2 : 16); });
  }
  function fmt(o, k) {
    if (typeof o === 'string') return /^(id|exam|kind|src|near|topics)$/.test(k) ? o : M(o);
    if (Array.isArray(o)) return o.map(function (x) { return fmt(x, k); });
    if (o && typeof o === 'object') { var r = {}; Object.keys(o).forEach(function (kk) { r[kk] = fmt(o[kk], kk); }); return r; }
    return o;
  }

  /* ================================================================== données (toutes vérifiées par programme) */
  var POW_POS = ['1', '2', '4', '8', '16', '32', '64', '128', '256', '512', '1 024', '2 048', '4 096', '8 192', '16 384', '32 768', '65 536',
    '131 072', '262 144', '524 288', '1 048 576'];
  var POW_NEG = ['0,5', '0,25', '0,125', '0,0625', '0,03125', '0,015625', '0,0078125', '0,00390625', '0,001953125', '0,0009765625'];

  /* conversions : n = nombre écrit comme dans le TD (FR), f → t, d = chiffres demandés après la virgule, res = résultat
     (binaire en paquets de 4 depuis la virgule), tools = outils du corrigé */
  function pl(b, v) { return ['place', { base: b, value: v, edit: false, also: [10] }]; }
  function dv(n, b) { return ['divs', { n: n, base: b }]; }
  function mu(x, b, d) { return ['mults', { x: x, base: b, digits: d }]; }
  function gp(v, f, t) { return ['groups', { value: v, from: f, to: t }]; }
  var CONV21 = [
    { n: '10101011', f: 2, t: 10, res: '171', tools: [pl(2, '10101011')] },
    { n: 'A9B', f: 16, t: 10, res: '2 715', tools: [pl(16, 'A9B')] },
    { n: '218', f: 10, t: 2, res: '1101 1010', tools: [dv('218', 2)] },
    { n: '603', f: 10, t: 16, res: '25B', tools: [dv('603', 16)] },
    { n: 'B8E', f: 16, t: 2, res: '1011 1000 1110', tools: [gp('B8E', 16, 2)] },
    { n: '1011110111100110', f: 2, t: 16, res: 'BDE6', tools: [gp('1011110111100110', 2, 16)] },
    { n: '1010,101', f: 2, t: 10, res: '10,625', tools: [pl(2, '1010,101')] },
    { n: '44,44', f: 16, t: 10, res: '68,265625', tools: [pl(16, '44,44')] },
    { n: '17,42', f: 10, t: 2, d: 5, res: '1 0001,0110 1', tools: [dv('17', 2), mu('0,42', 2, 5)] },
    { n: '17,42', f: 10, t: 16, d: 3, res: '11,6B8', tools: [dv('17', 16), mu('0,42', 16, 3)] },
    { n: 'B6,F3', f: 16, t: 2, res: '1011 0110,1111 0011', tools: [gp('B6,F3', 16, 2)] },
    { n: '100101,110011', f: 2, t: 16, res: '25,CC', tools: [gp('100101,110011', 2, 16)] }
  ];
  var CONV22 = [
    { n: '1001100101101100', f: 2, t: 10, res: '39 276', tools: [gp('1001100101101100', 2, 16), pl(16, '996C')] },
    { n: '12BE', f: 16, t: 10, res: '4 798', tools: [pl(16, '12BE')] },
    { n: '631', f: 10, t: 2, res: '10 0111 0111', tools: [dv('631', 2)] },
    { n: '3 129', f: 10, t: 16, res: 'C39', tools: [dv('3129', 16)] },
    { n: 'BD9F', f: 16, t: 2, res: '1011 1101 1001 1111', tools: [gp('BD9F', 16, 2)] },
    { n: '110111011010011001', f: 2, t: 16, res: '37699', tools: [gp('110111011010011001', 2, 16)] },
    { n: '110101,1011001', f: 2, t: 10, res: '53,6953125', tools: [pl(2, '110101,1011001')] },
    { n: 'A4C,148', f: 16, t: 10, res: '2 636,080078125', tools: [pl(16, 'A4C,148')] },
    { n: '48,12', f: 10, t: 2, d: 7, res: '11 0000,0001 111', tools: [dv('48', 2), mu('0,12', 2, 7)] },
    { n: '92,47', f: 10, t: 16, d: 4, res: '5C,7851', round: '5C,7852', tools: [dv('92', 16), mu('0,47', 16, 4)] },
    { n: '8,DECA', f: 16, t: 2, res: '1000,1101 1110 1100 101', tools: [gp('8,DECA', 16, 2)] },
    { n: '11001010110,01101011', f: 2, t: 16, res: '656,6B', tools: [gp('11001010110,01101011', 2, 16)] }
  ];
  /* opérations posées : res en paquets de 4 (binaire) ; dec = contrôle en décimal */
  var OPS = {
    add: [{ op: 'add', ops: ['10101010', '11001110'], base: 2, res: '1 0111 1000', dec: '170 + 206 = 376' },
      { op: 'add', ops: ['1100011', '1110111', '1001011', '101'], base: 2, res: '1 0010 1010', dec: '99 + 119 + 75 + 5 = 298' }],
    sub: [{ op: 'sub', ops: ['11100001', '10011011'], base: 2, res: '100 0110', dec: '225 − 155 = 70' },
      { op: 'sub', ops: ['11101100110', '110110110'], base: 2, res: '101 1011 0000', dec: '1 894 − 438 = 1 456' }],
    mul: [{ op: 'mul', ops: ['1101011', '10101'], base: 2, res: '1000 1100 0111', dec: '107 × 21 = 2 247', zeros: true },
      { op: 'mul', ops: ['10001100', '100101'], base: 2, res: '1 0100 0011 1100', dec: '140 × 37 = 5 180', zeros: false }],
    div: [{ op: 'div', ops: ['1100110', '101'], base: 2, digits: 6, res: '1 0100,0110 01', rem: '11', dec: '102 / 5 = 20,4' },
      { op: 'div', ops: ['1011000100', '1101'], base: 2, digits: 4, res: '11 0110,0111', rem: '101', dec: '708 / 13 = 54,461…' }],
    hex: [{ op: 'add', ops: ['BEBE', 'CAFE'], base: 16, res: '189BC', dec: '48 830 + 51 966 = 100 796' },
      { op: 'add', ops: ['467', '94C', 'F1A'], base: 16, res: '1CCD', dec: '1 127 + 2 380 + 3 866 = 7 373' }]
  };
  function posedTool(o) {
    var p = { op: o.op, ops: o.ops, base: o.base };
    if (o.digits) p.digits = o.digits;
    if (o.zeros === false) p.zeros = false;
    return tool('posed', p);
  }
  /* TD 2 */
  var RANGES = [
    { n: 4, umax: '15', smin: '−8', smax: '7' },
    { n: 8, umax: '255', smin: '−128', smax: '127' },
    { n: 16, umax: '65 535', smin: '−32 768', smax: '32 767' },
    { n: 32, umax: '4 294 967 295', smin: '−2 147 483 648', smax: '2 147 483 647' }
  ];
  var NEG8 = [
    { v: -1, abs: '00000001', one: '11111110', w: '11111111', hex: 'FF', u: '255' },
    { v: -33, abs: '00100001', one: '11011110', w: '11011111', hex: 'DF', u: '223' },
    { v: -60, abs: '00111100', one: '11000011', w: '11000100', hex: 'C4', u: '196' },
    { v: -127, abs: '01111111', one: '10000000', w: '10000001', hex: '81', u: '129' },
    { v: -128, abs: '10000000', one: '01111111', w: '10000000', hex: '80', u: '128' }
  ];
  var SIGNS = [
    { h: 'FF', w: '11111111', neg: true, v: '−1' }, { h: '27', w: '00100111', neg: false, v: '39' },
    { h: '7E', w: '01111110', neg: false, v: '126' }, { h: '9A', w: '10011010', neg: true, v: '−102' },
    { h: 'B7', w: '10110111', neg: true, v: '−73' }, { h: '6D', w: '01101101', neg: false, v: '109' },
    { h: '81', w: '10000001', neg: true, v: '−127' }
  ];
  /* règles du dépassement signé (P = positif ou nul, N = négatif), avec un exemple sur 8 bits par ligne :
     a op b = w ; sa, sb valeurs signées des opérandes, ex = résultat exact, rd = lecture signée du mot */
  var OV_ADD = [
    { a: 'P', b: 'P', r: 'P', ov: false, x: ['00000101', '00000011', '00001000'], sa: 5, sb: 3, ex: 8, rd: 8 },
    { a: 'P', b: 'P', r: 'N', ov: true, x: ['01111000', '00001010', '10000010'], sa: 120, sb: 10, ex: 130, rd: -126 },
    { a: 'P', b: 'N', r: 'P', ov: false, x: ['01111111', '11111111', '01111110'], sa: 127, sb: -1, ex: 126, rd: 126 },
    { a: 'P', b: 'N', r: 'N', ov: false, x: ['00000001', '11111110', '11111111'], sa: 1, sb: -2, ex: -1, rd: -1 },
    { a: 'N', b: 'N', r: 'P', ov: true, x: ['10000000', '11111111', '01111111'], sa: -128, sb: -1, ex: -129, rd: 127 },
    { a: 'N', b: 'N', r: 'N', ov: false, x: ['11111111', '11111111', '11111110'], sa: -1, sb: -1, ex: -2, rd: -2 }
  ];
  var OV_SUB = [
    { a: 'P', b: 'P', r: 'P', ov: false, x: ['00000101', '00000011', '00000010'], sa: 5, sb: 3, ex: 2, rd: 2 },
    { a: 'P', b: 'P', r: 'N', ov: false, x: ['00000011', '00000101', '11111110'], sa: 3, sb: 5, ex: -2, rd: -2 },
    { a: 'P', b: 'N', r: 'P', ov: false, x: ['00000101', '11111101', '00001000'], sa: 5, sb: -3, ex: 8, rd: 8 },
    { a: 'P', b: 'N', r: 'N', ov: true, x: ['01111000', '11110110', '10000010'], sa: 120, sb: -10, ex: 130, rd: -126 },
    { a: 'N', b: 'P', r: 'P', ov: true, x: ['10000010', '00001010', '01111000'], sa: -126, sb: 10, ex: -136, rd: 120 },
    { a: 'N', b: 'P', r: 'N', ov: false, x: ['11111011', '00000011', '11111000'], sa: -5, sb: 3, ex: -8, rd: -8 },
    { a: 'N', b: 'N', r: 'P', ov: false, x: ['11111101', '11111011', '00000010'], sa: -3, sb: -5, ex: 2, rd: 2 },
    { a: 'N', b: 'N', r: 'N', ov: false, x: ['11111011', '11111101', '11111110'], sa: -5, sb: -3, ex: -2, rd: -2 }
  ];
  /* TD 2 ex. 4 : u, s = réponses (null = ERREUR) ; ua, ub, sa, sb = lectures des opérandes ; ru, rs = lectures du mot */
  var T8 = [
    { a: '11101111', op: '+', b: '11111010', w: '11101001', u: null, s: -23, ua: 239, ub: 250, sa: -17, sb: -6, ru: 233, rs: -23, carry: true },
    { a: '11101000', op: '-', b: '11001011', w: '00011101', u: 29, s: 29, ua: 232, ub: 203, sa: -24, sb: -53, ru: 29, rs: 29 },
    { a: '01011010', op: '-', b: '10011010', w: '11000000', u: null, s: null, ua: 90, ub: 154, sa: 90, sb: -102, ru: 192, rs: -64, borrow: true },
    { a: '01111010', op: '+', b: '00001001', w: '10000011', u: 131, s: null, ua: 122, ub: 9, sa: 122, sb: 9, ru: 131, rs: -125 },
    { a: '11011011', op: '-', b: '00011001', w: '11000010', u: 194, s: -62, ua: 219, ub: 25, sa: -37, sb: 25, ru: 194, rs: -62 },
    { a: '10000000', op: '+', b: '11110010', w: '01110010', u: null, s: null, ua: 128, ub: 242, sa: -128, sb: -14, ru: 114, rs: 114, carry: true },
    { a: '10010011', op: '-', b: '00001110', w: '10000101', u: 133, s: -123, ua: 147, ub: 14, sa: -109, sb: 14, ru: 133, rs: -123 }
  ];
  /* outil de la ligne : addition posée, ou soustraction posée ; quand le haut est plus petit (non signé), l’emprunt
     sort du mot : on le montre en ajoutant un 1 devant le nombre du haut (2⁸ + a). */
  function t8Tool(r) {
    if (r.op === '+') return tool('posed', { op: 'add', ops: [r.a, r.b], base: 2 });
    return tool('posed', { op: 'sub', ops: [(r.borrow ? '1' : '') + r.a, r.b], base: 2 });
  }

  /* ================================================================== constructeurs communs (L = mots de la langue) */
  function sgn(v) { return v < 0 ? MINUS + (-v) : String(v); }
  function par(v) { return v < 0 ? '(' + MINUS + (-v) + ')' : String(v); }
  /* tableaux des puissances de 2 (énoncé : cases vides ; réponse : valeurs) */
  function powStatement(neg) {
    var cols = neg ? 2 : 3, per = neg ? 5 : 7, rows = [];
    for (var i = 0; i < per; i++) {
      var r = [];
      for (var c = 0; c < cols; c++) { var k = c * per + i; r.push(pw(2, neg ? -(k + 1) : k) + ' =\u00a0…'); }
      rows.push(r);
    }
    return tbl([], rows, { w: neg ? 20 : 30 });
  }
  function powAnswer(neg, L) {
    var cols = neg ? 2 : 3, per = neg ? 5 : 7, head = [], rows = [];
    for (var c = 0; c < cols; c++) head.push(L.power, { h: L.value, cls: 'n' });
    for (var i = 0; i < per; i++) {
      var r = [];
      for (var c2 = 0; c2 < cols; c2++) { var k = c2 * per + i; r.push(pw(2, neg ? -(k + 1) : k), { h: D(neg ? POW_NEG[k] : POW_POS[k]), cls: 'n' }); }
      rows.push(r);
    }
    return tbl(head, rows, { w: neg ? 26 : 40 });
  }
  /* conversions : L.conv = { head: [4 titres], forms: { 2, 10, 16 }, digits(d), ans: [2 titres], res, base(b) } */
  function convStatement(rows, L) {
    return tbl(L.conv.head, rows.map(function (r) {
      return [num(r.n, r.f, false), L.conv.forms[r.f], L.conv.forms[r.t] + (r.d ? '<br><small>' + L.conv.digits(r.d) + '</small>' : ''), ''];
    }), { w: 46 });
  }
  function convAnswer(rows, L) {
    return tbl(L.conv.ans, rows.map(function (r) {
      return [num(r.n, r.f), '<b>' + num(r.res, r.t) + '</b>' + (r.d ? '<br><small>' + L.conv.digits(r.d) + '</small>' : '')];
    }));
  }
  function convSteps(rows, texts, L) {
    return rows.map(function (r, i) {
      var t = (i + 1) + '. ' + (r.f === 10 ? dtext(r.n) : EN ? r.n.replace(/,/g, '.') : r.n) + ' → ' + L.conv.base(r.t) + (r.d ? ', ' + L.conv.digits(r.d).replace(/[()]/g, '') : '');
      return { t: t, html: '<p>' + texts[i] + '</p>' + r.tools.map(function (x) { return tool(x[0], x[1]); }).join('') +
        '<p>' + L.conv.res + ' ' + num(r.n, r.f) + ' = <b>' + num(r.res, r.t) + '</b></p>' };
    });
  }
  /* opérations posées : énoncé (liste), réponse (tableau) */
  var SIGN = { add: '+', sub: MINUS, mul: '×', div: '/' };
  function opText(o) { return o.ops.map(function (x) { return W(x); }).join('\u00a0' + SIGN[o.op] + ' '); }   /* le signe reste avec l’opérande de gauche */
  function opsQuestions(list, L) {
    return list.map(function (o) { return opText(o) + (o.digits ? ' ' + L.digitsQ(o.digits) : ''); });
  }
  function opsAnswer(list, L) {
    return tbl(L.opsHead, list.map(function (o) {
      return [opText(o), '<b>' + num(o.res, o.base) + '</b>' + (o.rem ? ' <small>(' + L.rem + ' ' + B(o.rem) + ')</small>' : ''), dtext(o.dec)];
    }));
  }
  /* TD 2 */
  function rangesTable(L, empty) {
    var head = [[{ h: L.bits, rs: 2 }, { h: L.uns, cs: 2 }, { h: L.sig, cs: 2 }], ['Min', 'Max', 'Min', 'Max']];
    var rows = RANGES.map(function (r) {
      if (empty) return [String(r.n), '', '', '', ''];
      if (r.n === 32) return ['32', D('0'), pw(2, 32) + ' − 1 = ' + D(r.umax), MINUS + pw(2, 31) + ' = ' + D(r.smin), pw(2, 31) + ' − 1 = ' + D(r.smax)];
      return [String(r.n), D('0'), D(r.umax), D(r.smin), D(r.smax)];
    });
    rows.push(empty ? ['<var>n</var>', '', '', '', ''] : ['<var>n</var>', D('0'), pw(2, '<var>n</var>') + ' − 1', MINUS + pw(2, '<var>n</var>−1'), pw(2, '<var>n</var>−1') + ' − 1']);
    return tbl(head, rows, { th: true, w: empty ? 30 : 0 });
  }
  function ovTable(list, op, L, empty) {
    var head = [L.op1, op === '+' ? '+' : MINUS, L.op2, '=', L.result, L.ov];
    if (!empty) head.push(L.example);
    return tbl(head, list.map(function (r) {
      var row = [L[r.a], op === '+' ? '+' : MINUS, L[r.b], '=', L[r.r], empty ? '' : '<b>' + (r.ov ? L.yes : L.no) + '</b>'];
      if (!empty) row.push('<span style="white-space:nowrap">' + W(r.x[0]) + ' ' + (op === '+' ? '+' : MINUS) + ' ' + W(r.x[1]) + ' = ' + W(r.x[2]) + '</span><br><small>' +
        sgn(r.sa) + ' ' + (op === '+' ? '+' : MINUS) + ' ' + par(r.sb) + ' = ' + sgn(r.ex) + (r.ov ? ' ; ' + L.reads(sgn(r.rd)) : '') + '</small>');
      return row;
    }), { w: empty ? 38 : 0 });
  }
  function t8Table(L, empty) {
    var head = [[{ h: L.operation, rs: 2 }, { h: L.binres, rs: 2 }, { h: L.decval, cs: 2 }], [L.u, L.s]];
    return tbl(head, T8.map(function (r) {
      var o = '<span style="white-space:nowrap">' + W(r.a) + ' ' + (r.op === '+' ? '+' : MINUS) + ' ' + W(r.b) + '</span>';
      if (empty) return [o, '', '', ''];
      o = W(r.a) + '<br><span style="white-space:nowrap">' + (r.op === '+' ? '+' : MINUS) + ' ' + W(r.b) + '</span>';   /* réponse : sur deux lignes, plus étroit */
      return [o, '<b>' + W(r.w) + '</b>', r.u == null ? '<b>' + L.err + '</b>' : D(sgn(r.u)), r.s == null ? '<b>' + L.err + '</b>' : D(sgn(r.s))];
    }), { w: 44 });
  }

  /* ================================================================== mots français */
  var FR = {
    power: 'Puissance', value: 'Valeur', word: 'Mot', binary: 'Binaire', sign: 'Signe',
    conv: {
      head: ['Nombre à convertir', 'Forme de départ', 'Forme d’arrivée', 'Résultat'],
      forms: { 2: 'Binaire', 10: 'Décimale', 16: 'Hexadécimale' },
      digits: function (d) { return '(' + d + ' chiffres après la virgule)'; },
      ans: ['Nombre à convertir', 'Résultat'],
      res: 'Résultat :',
      base: function (b) { return { 2: 'binaire', 10: 'décimal', 16: 'hexadécimal' }[b]; }
    },
    digitsQ: function (d) { return '(' + d + ' chiffres après la virgule)'; },
    opsHead: ['Opération', 'Résultat', 'Contrôle en décimal'], rem: 'reste',
    bits: 'Bits', uns: 'Non signé', sig: 'Signé',
    op1: '1<sup>er</sup> opérande', op2: '2<sup>e</sup> opérande', result: 'Résultat', ov: 'Dépassement signé', example: 'Exemple sur 8 bits',
    P: 'Positif', N: 'Négatif', yes: 'Oui', no: 'Non', reads: function (v) { return 'le mot se lit ' + v; },
    operation: 'Opération', binres: 'Résultat binaire', decval: 'Valeur décimale', u: 'Non signée', s: 'Signée', err: 'ERREUR'
  };
  var NOTE = 'Pas de corrigé officiel du TD : correction rédigée, chaque résultat recalculé par programme (fractions exactes).';

  /* ================================================================== fiches */
  function add(ex) { X.push(fmt(ex)); }

  /* ---------------------------------------------------------------- TD 1 · Exercice 1 */
  add({
    id: 'td1-ex1', exam: null, kind: 'td', order: 11, src: 'TD 1 · Ex 1', title: 'Puissances de 2',
    topics: ['bases'], lvl: 1, time: 10, near: ['p2021-ex5'],
    intro: '',
    questions: [
      '<b>1.</b> Calculez les puissances positives de 2 suivantes.' + powStatement(false) +
        '<p><b>Dorénavant, vous devez connaître par cœur les premières puissances positives de 2 (de ' + pw(2, 0) + ' à ' + pw(2, 16) + ').</b></p>',
      '<b>2.</b> Calculez les puissances négatives de 2 suivantes.' + powStatement(true) +
        '<p><b>Dorénavant, vous devez connaître par cœur les premières puissances négatives de 2 (de ' + pw(2, -1) + ' à ' + pw(2, -5) + ').</b></p>'],
    hints: [
      'Chaque puissance positive est le double de la précédente : ' + pw(2, '<var>n</var>+1') + ' = 2 × ' + pw(2, '<var>n</var>') + '. Repère : ' + pw(2, 10) + ' = 1 024, un peu plus que mille.',
      'Une puissance négative est un inverse : ' + pw(2, '−<var>n</var>') + ' = 1 / ' + pw(2, '<var>n</var>') + '. Chacune est la moitié de la précédente : 0,5 ; 0,25 ; 0,125…',
      'Contrôle : ' + pw(2, '−<var>n</var>') + ' a exactement <var>n</var> chiffres après la virgule, et ce sont ceux de ' + pw(5, '<var>n</var>') + ' (' + pw(2, -3) + ' = 0,125 et ' + pw(5, 3) + ' = 125).'],
    solution: [
      { t: 'Question 1 · puissances positives', html: '<p>On part de ' + pw(2, 0) + ' = 1 (toute puissance 0 vaut 1) et on double à chaque fois. Quelques calculs qui évitent de tout refaire :</p>' +
        calc([pw(2, 11) + ' = 2 × 1 024 = 2 048', pw(2, 16) + ' = ' + pw(2, 8) + ' × ' + pw(2, 8) + ' = 256 × 256 = 65 536', pw(2, 20) + ' = ' + pw(2, 10) + ' × ' + pw(2, 10) + ' = 1 024 × 1 024 = 1 048 576'].map(dtext)) +
        '<p>À savoir sans calcul : ' + pw(2, 8) + ' = 256 (un octet a 256 combinaisons), ' + pw(2, 10) + ' = 1 024, ' + pw(2, 16) + ' = 65 536.</p>' },
      { t: 'Question 2 · puissances négatives', html: '<p>' + pw(2, '−<var>n</var>') + ' = 1 / ' + pw(2, '<var>n</var>') + ' : on part de ' + pw(2, -1) + ' = 0,5 et on divise par 2 à chaque fois.</p>' +
        calc([pw(2, -4) + ' = 0,125 / 2 = 0,0625', pw(2, -5) + ' = 0,0625 / 2 = 0,03125', pw(2, -10) + ' = 0,0009765625']) +
        '<p>Contrôle sans division : ' + pw(2, '−<var>n</var>') + ' = ' + pw(5, '<var>n</var>') + ' / ' + pw(10, '<var>n</var>') + '. Comme ' + pw(5, 10) + ' = 9 765 625, ' + pw(2, -10) + ' s’écrit 9765625 avec 10 chiffres après la virgule : 0,0009765625.</p>' },
      { t: 'À quoi elles servent', html: '<p>Ce sont les poids des chiffres d’un nombre binaire : ' + pw(2, 0) + ', ' + pw(2, 1) + ', ' + pw(2, 2) + '… à gauche de la virgule, ' + pw(2, -1) + ', ' + pw(2, -2) + '… à droite. Par exemple ' + B('101,01') + ' = 4 + 1 + 0,25 = 5,25. Entraîne-toi jusqu’à répondre sans réfléchir :</p>' +
        tool('drill', { kind: 'pow2' }) }],
    answer: powAnswer(false, FR) + powAnswer(true, FR),
    traps: [
      pw(2, 0) + ' = 1, pas 0 ni 2.',
      pw(2, 10) + ' = 1 024, pas 1 000 ; l’écart grandit : ' + pw(2, 20) + ' = 1 048 576, pas 1 000 000.',
      'Un zéro de trop ou de moins après la virgule : ' + pw(2, -4) + ' = 0,0625 (pas 0,625). ' + pw(2, '−<var>n</var>') + ' a exactement <var>n</var> chiffres après la virgule.',
      pw(2, '−<var>n</var>') + ' n’est pas négatif : c’est 1 / ' + pw(2, '<var>n</var>') + ', un nombre entre 0 et 1.'],
    official: false, note: NOTE
  });

  /* ---------------------------------------------------------------- TD 1 · Exercice 2.1 */
  var CONSIGNE = 'Convertissez les nombres suivants de la forme de départ vers la forme d’arrivée. Ne pas écrire le résultat sous forme de fraction ou de puissance (p. ex. écrire 0,25 et non pas ¼ ou ' + pw(2, -2) + ').';
  var CONV_HINTS = [
    'Vers la base 10 : écris la somme des produits chiffre × poids. Après la virgule, en hexadécimal, les poids sont ' + pw(16, -1) + ' = 0,0625 et ' + pw(16, -2) + ' = 0,00390625.',
    'Depuis la base 10 : divisions successives pour la partie entière (restes lus du dernier au premier), multiplications successives pour la partie fractionnaire (parties entières lues du premier au dernier). Arrête-toi au nombre de chiffres demandé, sans arrondir.',
    'Entre la base 2 et la base 16 : un chiffre hexadécimal = 4 bits. Groupe les bits par 4 à partir de la virgule ; complète par des 0 à gauche de la partie entière et à droite de la partie fractionnaire.'];
  add({
    id: 'td1-ex2a', exam: null, kind: 'td', order: 12, src: 'TD 1 · Ex 2.1', title: 'Conversions entre les bases 2, 10 et 16',
    topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 1, time: 25, near: ['p2025-ex1', 'p2024-ex1', 'p2023-ex1'],
    intro: '<p><b>1.</b> ' + CONSIGNE + '</p>' + convStatement(CONV21, FR),
    questions: [],
    hints: CONV_HINTS,
    solution: convSteps(CONV21, [
      'Somme des produits : les bits à 1 ont pour poids ' + pw(2, 7) + ', ' + pw(2, 5) + ', ' + pw(2, 3) + ', ' + pw(2, 1) + ' et ' + pw(2, 0) + ' : 128 + 32 + 8 + 2 + 1 = 171.',
      'A = 10 et B = 11 ; les poids sont ' + pw(16, 2) + ' = 256, ' + pw(16, 1) + ' = 16 et ' + pw(16, 0) + ' = 1 : 10 × 256 + 9 × 16 + 11 = 2 560 + 144 + 11 = 2 715.',
      'Divisions successives par 2 jusqu’à un quotient nul, puis les restes lus du dernier au premier. Contrôle : 128 + 64 + 16 + 8 + 2 = 218.',
      'Divisions successives par 16 : 603 = 16 × 37 + 11, 37 = 16 × 2 + 5, 2 = 16 × 0 + 2. Le reste 11 s’écrit B. Contrôle : 2 × 256 + 5 × 16 + 11 = 603.',
      'Chaque chiffre hexadécimal donne exactement 4 bits : B = 1011, 8 = 1000, E = 1110.',
      '16 bits, donc 4 paquets complets à partir de la droite : 1011 1101 1110 0110, soit B, D, E et 6.',
      'Poids 8 et 2 pour la partie entière, ' + pw(2, -1) + ' = 0,5 et ' + pw(2, -3) + ' = 0,125 après la virgule : 8 + 2 + 0,5 + 0,125 = 10,625.',
      'Partie entière : 4 × 16 + 4 = 68. Après la virgule : 4 × ' + pw(16, -1) + ' + 4 × ' + pw(16, -2) + ' = 0,25 + 0,015625 = 0,265625.',
      'On convertit les deux parties séparément. Partie entière : 17 = 16 + 1 = 1 0001₂. Partie fractionnaire, multiplications successives par 2 : 0,84 → 0 ; 1,68 → 1 ; 1,36 → 1 ; 0,72 → 0 ; 1,44 → 1. On garde les 5 chiffres demandés. (Le développement ne s’arrête jamais : 0,42 n’a pas d’écriture binaire finie.)',
      'Partie entière : 17 = 16 + 1 = 11₁₆. Partie fractionnaire, multiplications successives par 16 : 0,42 × 16 = 6,72 → 6 ; 0,72 × 16 = 11,52 → B ; 0,52 × 16 = 8,32 → 8. On garde les 3 chiffres demandés.',
      'Chaque chiffre donne 4 bits, de part et d’autre de la virgule : B = 1011, 6 = 0110, F = 1111, 3 = 0011.',
      'Paquets de 4 à partir de la virgule. Vers la gauche : 10 0101 → 0010 0101 (deux 0 ajoutés à gauche). Vers la droite : 1100 11 → 1100 1100 (deux 0 ajoutés à droite). 0010 = 2, 0101 = 5, 1100 = C.'
    ], FR),
    answer: convAnswer(CONV21, FR),
    traps: [
      '100101,110011 → 25,CC et non 25,33 : la partie fractionnaire se groupe à partir de la virgule et se complète à droite (1100 11 → 1100 1100).',
      '44,44₁₆ ne vaut pas 68,44 : après la virgule, les poids sont ' + pw(16, -1) + ' = 0,0625 puis ' + pw(16, -2) + ' = 0,00390625.',
      'Multiplier tout le produit : après 0,42 × 16 = 6,72, on garde le chiffre 6 et on continue avec 0,72, pas avec 6,72.',
      '603 → 25B : un reste de 11 s’écrit B en base 16 (« 2511 » est faux).',
      'Les restes des divisions se lisent du dernier au premier ; les parties entières des multiplications, du premier au dernier.'],
    official: false, note: NOTE + ' « 5 (ou 3) chiffres après la virgule » : on tronque, comme le cours et les corrigés de sujets ; ici l’arrondi donnerait le même résultat.'
  });

  /* ---------------------------------------------------------------- TD 1 · Exercice 2.2 */
  add({
    id: 'td1-ex2b', exam: null, kind: 'td', order: 13, src: 'TD 1 · Ex 2.2', title: 'Conversions : même question (travail à la maison)',
    topics: ['vers-10', 'depuis-10', 'fraction', 'paquets'], lvl: 2, time: 30, near: ['p2025-ex1', 'p2024-ex1', 'p2023-ex1'],
    intro: '<p><b>2.</b> Même question (travail à la maison).</p><p class="muted">Rappel de la question 1 : ' + CONSIGNE + '</p>' + convStatement(CONV22, FR),
    questions: [],
    hints: CONV_HINTS,
    solution: convSteps(CONV22, [
      '16 bits : le plus court est de passer par l’hexadécimal. Paquets de 4 : 1001 1001 0110 1100 = 996C₁₆, puis 9 × 4 096 + 9 × 256 + 6 × 16 + 12 = 36 864 + 2 304 + 96 + 12 = 39 276. (Directement : 32 768 + 4 096 + 2 048 + 256 + 64 + 32 + 8 + 4, même total.)',
      'Poids ' + pw(16, 3) + ' = 4 096, ' + pw(16, 2) + ' = 256, 16 et 1 ; B = 11, E = 14 : 4 096 + 2 × 256 + 11 × 16 + 14 = 4 096 + 512 + 176 + 14 = 4 798.',
      'Dix divisions par 2 ; les restes lus du dernier au premier. Contrôle plus rapide par la base 16 : 631 = 2 × 256 + 7 × 16 + 7 = 277₁₆ = 0010 0111 0111₂.',
      '3 129 = 16 × 195 + 9 ; 195 = 16 × 12 + 3 ; 12 = 16 × 0 + 12. Le reste 12 s’écrit C. Contrôle : 12 × 256 + 3 × 16 + 9 = 3 129.',
      'Un chiffre, 4 bits : B = 1011, D = 1101, 9 = 1001, F = 1111.',
      '18 bits : à partir de la droite, quatre paquets complets ; il reste 11 à gauche, complété en 0011. 0011 0111 0110 1001 1001 donne 3, 7, 6, 9, 9.',
      'Partie entière : 32 + 16 + 4 + 1 = 53. Après la virgule, les bits à 1 sont en positions −1, −3, −4 et −7 : 0,5 + 0,125 + 0,0625 + 0,0078125 = 0,6953125.',
      'Partie entière : 10 × 256 + 4 × 16 + 12 = 2 636. Après la virgule : 1 × ' + pw(16, -1) + ' + 4 × ' + pw(16, -2) + ' + 8 × ' + pw(16, -3) + ' = 0,0625 + 0,015625 + 0,001953125 = 0,080078125.',
      'Partie entière : 48 = 32 + 16 = 11 0000₂. Partie fractionnaire, par 2 : 0,24 → 0 ; 0,48 → 0 ; 0,96 → 0 ; 1,92 → 1 ; 1,84 → 1 ; 1,68 → 1 ; 1,36 → 1. On garde les 7 chiffres demandés.',
      'Partie entière : 92 = 16 × 5 + 12, soit 5C. Partie fractionnaire, par 16 : 0,47 × 16 = 7,52 → 7 ; 0,52 × 16 = 8,32 → 8 ; 0,32 × 16 = 5,12 → 5 ; 0,12 × 16 = 1,92 → 1. Le chiffre suivant serait E (0,92 × 16 = 14,72) : arrondir donnerait 5C,7852, mais on s’arrête au 4e chiffre sans arrondir.',
      '8 = 1000 ; D = 1101, E = 1110, C = 1100, A = 1010. Le dernier 0 de la partie fractionnaire peut tomber : 1000,1101 1110 1100 1010₂ est juste aussi.',
      'Paquets à partir de la virgule. Partie entière : 110 0101 0110 → 0110 0101 0110 (un 0 ajouté à gauche) = 656. Partie fractionnaire : 0110 1011 = 6B (paquets déjà complets).'
    ], FR),
    answer: convAnswer(CONV22, FR),
    traps: [
      '92,47 → 5C,7851 et non 5C,7852 : on s’arrête au 4e chiffre, sans arrondir.',
      '110111011010011001 a 18 bits : le paquet de gauche n’a que 2 bits (11 → 3). Grouper à partir de la gauche (1101 1101 1010 0110 01…) donne un faux résultat.',
      '8,DECA : chaque chiffre donne exactement 4 bits, zéros compris (C = 1100, A = 1010).',
      'A4C,148₁₆ : 0,148₁₆ ne vaut pas 0,148 mais 1/16 + 4/256 + 8/4 096 = 0,080078125.',
      '3 129 se lit « trois mille cent vingt-neuf » : l’espace sépare les milliers (en anglais, c’est une virgule : 3,129).'],
    official: false, note: NOTE + ' « n chiffres après la virgule » : on tronque, comme le cours et les corrigés de sujets ; pour 92,47, l’arrondi donnerait 5C,7852.'
  });

  /* ---------------------------------------------------------------- TD 1 · Exercice 3 (une fiche par question) */
  var NEAR_OPS = ['p2025-ex2', 'p2024-ex2', 'p2023-ex2'];
  add({
    id: 'td1-ex3a', exam: null, kind: 'td', order: 14, src: 'TD 1 · Ex 3.1', title: 'Additions binaires',
    topics: ['addition'], lvl: 1, time: 8,
    intro: '<p><b>1.</b> Effectuez les additions binaires suivantes :</p>',
    questions: opsQuestions(OPS.add, FR),
    hints: [
      'Colonne par colonne, de droite à gauche : 1 + 1 = 10 (on pose 0, on retient 1) ; 1 + 1 + 1 = 11 (on pose 1, on retient 1).',
      'Avec quatre nombres, une colonne peut valoir 100₂ (quatre) : on pose 0 et on retient 10₂ = 2.',
      'Contrôle en décimal : 170 + 206 = 376 ; 99 + 119 + 75 + 5 = 298.'],
    solution: [
      { t: '10101010 + 11001110', html: '<p>On aligne les deux nombres à droite et on additionne colonne par colonne, de droite à gauche, en écrivant les retenues au-dessus.</p>' +
        posedTool(OPS.add[0]) + '<p>La dernière retenue crée un 9e chiffre : <b>' + B(OPS.add[0].res) + '</b>. Contrôle : ' + dtext('170 + 206 = 376 = 256 + 64 + 32 + 16 + 8') + '.</p>' },
      { t: '1100011 + 1110111 + 1001011 + 101', html: '<p>Même méthode, mais une colonne peut contenir jusqu’à quatre 1, plus la retenue. On écrit la somme de la colonne en binaire, on pose son dernier chiffre et on retient le reste : 1 + 1 + 1 + 1 = 100₂, on pose 0 et on retient 10₂ (la colonne suivante reçoit 2, autant qu’un 1 deux colonnes plus à gauche).</p>' +
        posedTool(OPS.add[1]) + '<p>Résultat : <b>' + B(OPS.add[1].res) + '</b>. Contrôle : 99 + 119 + 75 + 5 = 298 = 256 + 32 + 8 + 2.</p>' +
        '<p class="sol-note">Si les retenues de 10 te gênent, additionne deux nombres à la fois : 1100011 + 1110111 = 11011010 ; + 1001011 = 100100101 ; + 101 = 100101010.</p>' }],
    answer: opsAnswer(OPS.add, FR),
    traps: [
      'Oublier la dernière retenue : 10101010 + 11001110 a 9 chiffres (1 0111 1000), pas 8.',
      'Dans une colonne qui vaut 4 = 100₂, retenir 1 au lieu de 10₂.',
      'Aligner 101 à gauche : les nombres s’alignent à droite, sur le chiffre des unités.'],
    official: false, note: NOTE
  });
  add({
    id: 'td1-ex3b', exam: null, kind: 'td', order: 15, src: 'TD 1 · Ex 3.2', title: 'Soustractions binaires',
    topics: ['soustraction'], lvl: 1, time: 8, near: NEAR_OPS,
    intro: '<p><b>2.</b> Effectuez les soustractions binaires suivantes :</p>',
    questions: opsQuestions(OPS.sub, FR),
    hints: [
      'De droite à gauche : 1 − 0 = 1, 1 − 1 = 0, 0 − 0 = 0. Pour 0 − 1, on emprunte.',
      'Méthode du cours : le chiffre du haut trop petit reçoit 10₂ (on écrit un petit 1 devant lui), et le chiffre du bas de la colonne suivante reçoit + 1.',
      'Contrôle : résultat + nombre du bas = nombre du haut ; en décimal, 225 − 155 = 70 et 1 894 − 438 = 1 456.'],
    solution: [
      { t: '11100001 − 10011011', html: '<p>Méthode du cours, de droite à gauche. Quand le chiffre du haut est trop petit, on emprunte 1 : il devient 10₂ ou 11₂, et le chiffre du bas de la colonne suivante reçoit + 1. Si ce chiffre du bas vaut déjà 1, on soustrait 1 + 1 = 10₂, et il faut souvent emprunter encore.</p>' +
        posedTool(OPS.sub[0]) + '<p>Résultat : <b>' + B(OPS.sub[0].res) + '</b>. Contrôle : 225 − 155 = 70 = 64 + 4 + 2 ; ou 1000110 + 10011011 = 11100001.</p>' },
      { t: '11101100110 − 110110110', html: '<p>Le nombre du bas n’a que 9 chiffres : on le complète par des 0 à gauche (00110110110) pour l’aligner sur les 11 chiffres du haut.</p>' +
        posedTool(OPS.sub[1]) + '<p>Résultat : <b>' + B(OPS.sub[1].res) + '</b>. Contrôle : ' + dtext('1 894 − 438 = 1 456 = 1 024 + 256 + 128 + 32 + 16') + '.</p>' }],
    answer: opsAnswer(OPS.sub, FR),
    traps: [
      'Ajouter l’emprunt au chiffre du haut de la colonne suivante et au chiffre du bas : l’emprunt se reporte une seule fois (le cours le met en bas).',
      'Une colonne « 0 − (1 + 1) » : c’est 0 − 10₂ ; on emprunte, 10 − 10 = 0, et l’emprunt continue.',
      'Ne pas vérifier : une addition (résultat + nombre du bas) suffit à retrouver le nombre du haut.'],
    official: false, note: NOTE
  });
  add({
    id: 'td1-ex3c', exam: null, kind: 'td', order: 16, src: 'TD 1 · Ex 3.3', title: 'Multiplications binaires',
    topics: ['multiplication'], lvl: 1, time: 10, near: NEAR_OPS,
    intro: '<p><b>3.</b> Effectuez les multiplications binaires suivantes :</p>',
    questions: opsQuestions(OPS.mul, FR),
    hints: [
      'Un produit partiel par chiffre du multiplicateur, de droite à gauche : chiffre 1 → on recopie le multiplicande ; chiffre 0 → une ligne de 0. Chaque ligne est décalée d’un rang de plus vers la gauche.',
      'Puis on additionne les produits partiels, avec les retenues : trois 1 dans une colonne font 11₂.',
      'Contrôle : 107 × 21 = 2 247 ; 140 × 37 = 5 180.'],
    solution: [
      { t: '1101011 × 10101', html: '<p>Le multiplicateur 10101 a cinq chiffres : cinq produits partiels, chacun décalé d’un rang de plus. Le cours écrit aussi les lignes de 0 :</p>' +
        posedTool(OPS.mul[0]) + '<p>Somme des produits partiels : <b>' + B(OPS.mul[0].res) + '</b>. Contrôle : ' + dtext(OPS.mul[0].dec) + '.</p>' },
      { t: '10001100 × 100101', html: '<p>Les corrigés de sujets sautent les lignes de 0 : seules les lignes des chiffres 1 de 100101 (poids ' + pw(2, 0) + ', ' + pw(2, 2) + ' et ' + pw(2, 5) + ') sont écrites, décalées de 0, 2 et 5 rangs.</p>' +
        posedTool(OPS.mul[1]) + '<p>Résultat : <b>' + B(OPS.mul[1].res) + '</b>. Contrôle : ' + dtext(OPS.mul[1].dec) + '.</p>' +
        '<p class="sol-note">Le produit ne change pas si l’on échange les deux nombres : prendre comme multiplicateur celui qui a le moins de 1 donne moins de lignes.</p>' }],
    answer: opsAnswer(OPS.mul, FR),
    traps: [
      'Sauter une ligne de 0 sans décaler la suivante : le produit partiel du chiffre de poids ' + pw(2, '<var>k</var>') + ' est décalé de <var>k</var> rangs, que les lignes de 0 soient écrites ou non.',
      'Oublier les retenues de l’addition finale (trois 1 dans une colonne : on pose 1, on retient 1).'],
    official: false, note: NOTE
  });
  add({
    id: 'td1-ex3d', exam: null, kind: 'td', order: 17, src: 'TD 1 · Ex 3.4', title: 'Divisions binaires avec chiffres après la virgule',
    topics: ['division'], lvl: 2, time: 12, near: NEAR_OPS,
    intro: '<p><b>4.</b> Effectuez les divisions binaires suivantes :</p>',
    questions: opsQuestions(OPS.div, FR),
    hints: [
      'Division posée comme en décimal : on cherche le plus petit début du dividende qui contient le diviseur. En binaire, le diviseur y va 0 ou 1 fois.',
      'À chaque étape : 1 au quotient et on soustrait le diviseur, ou 0 au quotient si le reste partiel est plus petit ; puis on abaisse le chiffre suivant.',
      'Quand tous les chiffres du dividende sont abaissés : virgule au quotient, puis un 0 ajouté au reste à chaque étape, autant de fois que de chiffres demandés. On s’arrête là, sans arrondir.'],
    solution: [
      { t: '1100110 / 101, 6 chiffres', html: '<p>101 ne va ni dans 1 ni dans 11 : il va une fois dans 110. On écrit 1 au quotient, on soustrait (110 − 101 = 1), on abaisse le chiffre suivant, et ainsi de suite ; un 0 au quotient chaque fois que le reste partiel est plus petit que 101. Après le dernier chiffre du dividende, on écrit la virgule et on ajoute des 0 au reste.</p>' +
        posedTool(OPS.div[0]) + '<p>Quotient : <b>' + B(OPS.div[0].res) + '</b> (reste ' + B('11') + '). Contrôle : 102 / 5 = 20,4 ; 20 = 10100₂ et 0,4 = 0,0110 0110…₂ (le motif 0110 se répète). Le 7e chiffre serait 1 : arrondir donnerait 10100,011010, mais on s’arrête au 6e.</p>' },
      { t: '1011000100 / 1101, 4 chiffres', html: '<p>1101 va une fois dans 10110, les cinq premiers chiffres du dividende. Même méthode ensuite.</p>' +
        posedTool(OPS.div[1]) + '<p>Quotient : <b>' + B(OPS.div[1].res) + '</b> (reste ' + B('101') + '). Contrôle : 708 / 13 = 54 reste 6 ; 54 = 110110₂, et 6/13 ≈ 0,46 commence par 0,0111₂ (0,4375).</p>' }],
    answer: opsAnswer(OPS.div, FR),
    traps: [
      'Oublier un 0 au quotient quand le reste partiel est plus petit que le diviseur : tous les chiffres suivants sont alors décalés.',
      'Arrondir le dernier chiffre : 1100110 / 101 donne 10100,011001 ; le 7e chiffre (1) ne s’ajoute pas.',
      'Placer la virgule trop tôt ou trop tard : elle s’écrit quand on abaisse le premier 0 ajouté, après le dernier chiffre du dividende.'],
    official: false, note: NOTE + ' « n chiffres après la virgule » : on arrête la division, donc on tronque.'
  });
  add({
    id: 'td1-ex3e', exam: null, kind: 'td', order: 18, src: 'TD 1 · Ex 3.5', title: 'Additions hexadécimales',
    topics: ['addition'], lvl: 1, time: 8, near: ['p2025-ex2', 'p2024-ex2', 'p2023-ex2'],
    intro: '<p><b>5.</b> Effectuez les additions hexadécimales suivantes :</p>',
    questions: opsQuestions(OPS.hex, FR),
    hints: [
      'Méthode du cours : additionne chaque colonne avec les valeurs décimales des chiffres (A = 10 … F = 15), puis convertis la somme en hexadécimal : on pose le chiffre de droite et on retient celui de gauche.',
      'Une somme de 16 à 31 donne une retenue de 1 (E + E = 28 = 1C₁₆). Avec trois nombres, une colonne vaut au plus 15 × 3 + 2 = 47 = 2F₁₆ : la retenue peut valoir 2.',
      'Contrôle en décimal : ' + dtext('48 830 + 51 966 = 100 796') + '.'],
    solution: [
      { t: 'BEBE + CAFE', html: '<p>Colonne par colonne, de droite à gauche, en valeurs décimales :</p>' +
        calc(['E + E = 14 + 14 = 28 = 1C₁₆ → on pose C, retenue 1', 'B + F + 1 = 11 + 15 + 1 = 27 = 1B₁₆ → B, retenue 1', 'E + A + 1 = 14 + 10 + 1 = 25 = 19₁₆ → 9, retenue 1', 'B + C + 1 = 11 + 12 + 1 = 24 = 18₁₆ → 8, retenue 1', 'la dernière retenue s’écrit à gauche : 1']) +
        posedTool(OPS.hex[0]) + '<p>Résultat : <b>' + H(OPS.hex[0].res) + '</b>. Contrôle : ' + dtext(OPS.hex[0].dec) + ' = 189BC₁₆.</p>' },
      { t: '467 + 94C + F1A', html: '<p>Trois nombres, comme dans l’exemple du cours :</p>' +
        calc(['7 + C + A = 7 + 12 + 10 = 29 = 1D₁₆ → on pose D, retenue 1', '6 + 4 + 1 + 1 = 12 = C₁₆ → C, pas de retenue', '4 + 9 + F = 4 + 9 + 15 = 28 = 1C₁₆ → C, retenue 1', 'la dernière retenue s’écrit à gauche : 1']) +
        posedTool(OPS.hex[1]) + '<p>Résultat : <b>' + H(OPS.hex[1].res) + '</b>. Contrôle : ' + dtext(OPS.hex[1].dec) + '.</p>' }],
    answer: opsAnswer(OPS.hex, FR),
    traps: [
      'Écrire la somme décimale d’une colonne (28) au lieu de son chiffre hexadécimal (C, retenue 1).',
      'Se tromper sur une lettre : B = 11, C = 12, D = 13, E = 14, F = 15 ; une unité d’écart fausse toute la colonne.',
      'Oublier la retenue finale : BEBE + CAFE a 5 chiffres.'],
    official: false, note: NOTE
  });

  /* ---------------------------------------------------------------- TD 2 · Exercice 1 */
  add({
    id: 'td2-ex1', exam: null, kind: 'td', order: 21, src: 'TD 2 · Ex 1', title: 'Plages des entiers non signés et signés',
    topics: ['plages', 'non-signe', 'signe'], lvl: 1, time: 10, near: ['p2020-ex5', 'p2021-ex5'],
    intro: '<p>Donnez, en représentation décimale, les valeurs minimales et maximales que peuvent prendre des nombres signés et non signés codés sur 4, 8, 16, 32 et n bits. (pour 32 et <var>n</var> bits, vous pouvez utiliser une notation à base de puissance de deux).</p>' + rangesTable(FR, true),
    questions: [],
    hints: [
      'Sur <var>n</var> bits, il y a ' + pw(2, '<var>n</var>') + ' mots. En non signé, ils codent les entiers de 0 à ' + pw(2, '<var>n</var>') + ' − 1.',
      'En signé (complément à deux), la moitié des mots, ceux dont le bit de poids fort vaut 1, code les négatifs : de −' + pw(2, '<var>n</var>−1') + ' à −1. L’autre moitié code 0 et les positifs : de 0 à ' + pw(2, '<var>n</var>−1') + ' − 1.',
      'Puissances utiles : ' + pw(2, 7) + ' = 128, ' + pw(2, 15) + ' = 32 768, ' + pw(2, 16) + ' = 65 536, ' + pw(2, 31) + ' = 2 147 483 648, ' + pw(2, 32) + ' = 4 294 967 296.'],
    solution: [
      { t: 'Non signé', html: '<p>Le plus petit mot, 00…0, vaut 0. Le plus grand, 11…1, vaut ' + pw(2, '<var>n</var>−1') + ' + … + 2 + 1 = ' + pw(2, '<var>n</var>') + ' − 1 : un de moins que 100…0 = ' + pw(2, '<var>n</var>') + ', qui a un bit de trop.</p>' +
        calc(['4 bits : 1111 = ' + pw(2, 4) + ' − 1 = 15', '8 bits : 1111 1111 = ' + pw(2, 8) + ' − 1 = 255', dtext('16 bits : ' + pw(2, 16) + ' − 1 = 65 535'), dtext('32 bits : ' + pw(2, 32) + ' − 1 = 4 294 967 295')]) },
      { t: 'Signé (complément à deux)', html: '<p>Le bit de poids fort est le bit de signe. Le plus grand positif est 0111…1 = ' + pw(2, '<var>n</var>−1') + ' − 1 ; le plus petit négatif est 1000…0 = −' + pw(2, '<var>n</var>−1') + ' (son complément à deux redonne le même mot). Il y a un négatif de plus que de positifs, parce que 0 est dans la moitié « bit de signe à 0 ».</p>' +
        calc(['4 bits : 1000 = −8 … 0111 = 7', '8 bits : 1000 0000 = −128 … 0111 1111 = 127', dtext('16 bits : −' + pw(2, 15) + ' = −32 768 … ' + pw(2, 15) + ' − 1 = 32 767'), dtext('32 bits : −' + pw(2, 31) + ' = −2 147 483 648 … ' + pw(2, 31) + ' − 1 = 2 147 483 647')]) +
        '<p>Sur la roue des mots de 4 bits, on lit les deux plages à la fois : 0 à 15 à l’intérieur, −8 à 7 à l’extérieur.</p>' + tool('wheel', { value: 7 }) },
      { t: 'Le voir sur 8 bits', html: '<p>Dans ce registre, 0111 1111 vaut 127 en signé. Clique sur + 1 : il devient 1000 0000, soit −128 en signé (dépassement signé). Change la taille du mot pour voir 4 et 16 bits.</p>' +
        tool('register', { n: 8, value: '01111111', sizes: [4, 8, 16] }) }],
    answer: rangesTable(FR, false),
    traps: [
      'Le maximum non signé est ' + pw(2, '<var>n</var>') + ' − 1, pas ' + pw(2, '<var>n</var>') + ' : 256 ne tient pas sur 8 bits (1 0000 0000 en a 9).',
      'La plage signée n’est pas symétrique : −128 à 127 sur 8 bits (ni −127 à 127, ni −128 à 128).',
      'En signé, c’est ' + pw(2, '<var>n</var>−1') + ' et non ' + pw(2, '<var>n</var>') + ' : −' + pw(2, '<var>n</var>−1') + ' à ' + pw(2, '<var>n</var>−1') + ' − 1. Il y a ' + pw(2, '<var>n</var>') + ' valeurs dans les deux codages.'],
    official: false, note: NOTE
  });

  /* ---------------------------------------------------------------- TD 2 · Exercice 2 */
  add({
    id: 'td2-ex2', exam: null, kind: 'td', order: 22, src: 'TD 2 · Ex 2', title: 'Encoder des entiers négatifs sur 8 bits',
    topics: ['signe'], lvl: 1, time: 8,
    intro: '<p>Encodez les entiers négatifs suivants sur 8 bits signés : −1, −33, −60, −127, −128.</p>',
    questions: [],
    hints: [
      'Méthode du cours : écris la valeur absolue en binaire sur 8 bits, puis prends son complément à deux (inverser tous les bits, puis ajouter 1).',
      'Raccourci du cours : en partant de la droite, garde les bits jusqu’au premier 1 inclus et inverse tous les autres.',
      'Contrôle : le mot de −<var>v</var>, lu en non signé, vaut 256 − <var>v</var> (−1 → 255 = FF₁₆).'],
    solution: [
      { t: 'Méthode, sur −33', html: '<p>Un entier négatif s’encode en deux temps : sa valeur absolue en binaire sur 8 bits, puis le complément à deux de ce mot.</p>' +
        calc(['33 = 32 + 1 = ' + W('00100001'), 'inverser tous les bits : ' + W('11011110'), '+ 1 : ' + W('11011111') + ' = DF₁₆']) +
        '<p>Avec le raccourci : 0010000<b>1</b> → on garde le dernier 1, on inverse le reste → 1101111<b>1</b>. Dans le registre, clique sur « Complément à deux » :</p>' +
        tool('register', { n: 8, value: '00100001', sizes: [8] }) },
      { t: '−1, −60, −127', html: calc([
        '−1 : ' + W('00000001') + ' → ' + W('11111110') + ' + 1 = ' + W('11111111'),
        '−60 : ' + W('00111100') + ' → ' + W('11000011') + ' + 1 = ' + W('11000100'),
        '−127 : ' + W('01111111') + ' → ' + W('10000000') + ' + 1 = ' + W('10000001')]) +
        '<p>Tous commencent par 1 : c’est le bit de signe des négatifs.</p>' },
      { t: '−128, le cas limite', html: '<p>128 ne tient pas sur 8 bits signés (le plus grand positif est 127) : la méthode « valeur absolue puis complément à deux » ne part pas d’un mot signé. Mais −128 est le plus petit entier signé sur 8 bits, le mot ' + W('10000000') + '. Le calcul mécanique donne le même mot : 128 = 10000000 en non signé ; inverser → 01111111 ; + 1 → 10000000.</p>' },
      { t: 'Vérification', html: '<p>Lu en non signé, le mot de −<var>v</var> vaut 256 − <var>v</var> :</p>' +
        calc(NEG8.map(function (r) { return W(r.w) + ' = ' + r.hex + '₁₆ = ' + r.u + ' = 256 − ' + (-r.v); })) }],
    answer: tbl(['Entier', 'Valeur absolue', 'Complément à un', 'Mot de 8 bits', 'Hexadécimal'], NEG8.map(function (r) {
      return [D(sgn(r.v)), W(r.abs) + (r.v === -128 ? '<br><small>(non signé)</small>' : ''), W(r.one), '<b>' + W(r.w) + '</b>', H(r.hex)];
    })),
    traps: [
      'S’arrêter au complément à un (oublier le + 1) : 11011110 vaut −34, pas −33.',
      'Mettre seulement un 1 devant la valeur absolue (10100001 pour −33) : ce n’est pas l’encodage du cours ; en complément à deux, 10100001 vaut −95.',
      'Prendre le complément à deux d’une valeur absolue écrite sur moins de 8 bits : complète d’abord à 8 bits (33 = 00100001).'],
    official: false, note: NOTE
  });

  /* ---------------------------------------------------------------- TD 2 · Exercice 3 */
  var SIGN_TBL = function (L) {
    return tbl([L.word, L.binary, 'MSB', L.sign, L.value], SIGNS.map(function (r) {
      return [H(r.h), W(r.w), r.w.charAt(0), '<b>' + (r.neg ? L.N : L.P) + '</b>', D(r.v)];
    }), { w: 36 });
  };
  add({
    id: 'td2-ex3', exam: null, kind: 'td', order: 23, src: 'TD 2 · Ex 3', title: 'Signe d’un mot et dépassement signé',
    topics: ['signe', 'depassement'], lvl: 2, time: 15, near: ['p2025-ex3', 'p2022-ex4'],
    intro: '<p><b>Pour tout l’exercice, on utilisera l’encodage du complément à deux (utilisé pour les entiers signés).</b></p>',
    questions: [
      '<b>1.</b> Soit les mots sur 8 bits suivants (dans leur forme hexadécimale) : FF, 27, 7E, 9A, B7, 6D, 81. Représentent-ils des entiers positifs ou négatifs ?',
      '<b>2.</b> Donnez, en hexadécimale, la plage de valeurs des mots servant à coder les entiers positifs sur 8 bits.',
      '<b>3.</b> Donnez, en hexadécimale, la plage de valeurs des mots servant à coder les entiers négatifs sur 8 bits.',
      '<b>4.</b> Complétez le tableau suivant pour les additions (écrivez <i>Oui</i> ou <i>Non</i> pour le dépassement signé).' + ovTable(OV_ADD, '+', FR, true),
      '<b>5.</b> Complétez le tableau suivant pour les soustractions (écrivez <i>Oui</i> ou <i>Non</i> pour le dépassement signé).' + ovTable(OV_SUB, '-', FR, true)],
    hints: [
      'Le signe se lit sur le bit de poids fort, donc sur le premier chiffre hexadécimal : 0 à 7 (0xxx) → positif, 8 à F (1xxx) → négatif.',
      'Sur 8 bits signés, le résultat exact doit rester entre −128 et 127. Un positif et un négatif additionnés ne peuvent pas en sortir.',
      'Pour une soustraction, pense a − b = a + (−b) : « positif − négatif » se comporte comme « positif + positif ».'],
    solution: [
      { t: 'Question 1 · le signe d’un mot', html: '<p>On écrit chaque chiffre hexadécimal sur 4 bits ; le bit de poids fort (MSB) donne le signe : 0 → positif, 1 → négatif. Il suffit donc de regarder le premier chiffre : 8 ou plus → négatif.</p>' +
        SIGN_TBL(FR) + '<p class="sol-note">La valeur n’est pas demandée ; elle se lit avec le complément à deux pour les négatifs (81 = 1000 0001 → complément à deux 0111 1111 = 127 → −127).</p>' },
      { t: 'Questions 2 et 3 · les plages en hexadécimal', html: '<p>Positifs : bit de poids fort à 0, de ' + W('00000000') + ' à ' + W('01111111') + ', soit <b>' + H('00') + ' à ' + H('7F') + '</b> (0 à 127, zéro compris). Négatifs : bit de poids fort à 1, de ' + W('10000000') + ' à ' + W('11111111') + ', soit <b>' + H('80') + ' à ' + H('FF') + '</b> (−128 à −1).</p>' +
        '<p class="sol-note">Coquille de l’énoncé : « en hexadécimale » ; lire « en hexadécimal ».</p>' },
      { t: 'Question 4 · additions', html: '<p>Raisonne sur le résultat exact. Positif + positif : entre 0 et 254 ; au-delà de 127, il ne tient pas, et le mot obtenu a son bit de signe à 1 : un résultat « négatif » signale le dépassement. Négatif + négatif : entre −256 et −2 ; en dessous de −128, le mot obtenu a son bit de signe à 0. Positif + négatif : entre −128 et 126, toujours représentable : jamais de dépassement.</p>' +
        ovTable(OV_ADD, '+', FR, false) +
        '<p>Sur la roue des mots de 4 bits, le dépassement signé est le passage entre 0111 (7) et 1000 (−8) :</p>' + tool('wheel', { value: 6 }) },
      { t: 'Question 5 · soustractions', html: '<p>a − b = a + (−b) : changer le signe du 2e opérande ramène aux additions. Positif − négatif = positif + positif : dépassement si le résultat est négatif. Négatif − positif = négatif + négatif : dépassement si le résultat est positif. Positif − positif et négatif − négatif : jamais.</p>' +
        ovTable(OV_SUB, '-', FR, false) },
      { t: 'La règle à retenir', html: '<p>Dépassement signé <b>seulement</b> quand on additionne deux nombres de même signe et que le résultat a l’autre signe : P + P = N, N + N = P, P − N = N, N − P = P. La retenue sortante n’a rien à voir : 11111111 + 11111111 = 1 11111110 a une retenue, mais −1 + (−1) = −2 est juste.</p>' +
        '<p class="sol-note">L’énoncé ne dit pas où ranger 0 ; ici « positif » veut dire « bit de signe à 0 », zéro compris. Les réponses ne changent pas si l’on exclut 0 (vérifié sur les 65 536 couples de mots de 8 bits).</p>' }],
    answer: '<p>1. ' + SIGNS.map(function (r) { return H(r.h) + ' ' + (r.neg ? 'négatif' : 'positif'); }).join(' ; ') + '.</p>' +
      '<p>2. ' + H('00') + ' à ' + H('7F') + '. 3. ' + H('80') + ' à ' + H('FF') + '.</p>' +
      '<p>4. Additions : Oui pour P + P = N et N + N = P ; Non pour les quatre autres lignes.</p>' +
      tbl([FR.op1, '+', FR.op2, '=', FR.result, FR.ov], OV_ADD.map(function (r) { return [FR[r.a], '+', FR[r.b], '=', FR[r.r], '<b>' + (r.ov ? FR.yes : FR.no) + '</b>']; })) +
      '<p>5. Soustractions : Oui pour P − N = N et N − P = P ; Non pour les six autres lignes.</p>' +
      tbl([FR.op1, MINUS, FR.op2, '=', FR.result, FR.ov], OV_SUB.map(function (r) { return [FR[r.a], MINUS, FR[r.b], '=', FR[r.r], '<b>' + (r.ov ? FR.yes : FR.no) + '</b>']; })),
    traps: [
      'Juger le signe sur la valeur décimale apparente : 81₁₆ « ressemble » à un positif, mais 1000 0001 commence par 1 : négatif (−127).',
      'Confondre retenue et dépassement signé : la retenue sortante signale un dépassement non signé, pas un dépassement signé.',
      'Appliquer la règle des additions telle quelle aux soustractions : « positif − positif » ne déborde jamais, « positif − négatif » peut déborder.'],
    official: false, note: NOTE + ' Tableaux des questions 4 et 5 vérifiés sur tous les couples de mots de 8 bits.'
  });

  /* ---------------------------------------------------------------- TD 2 · Exercice 4 */
  var T8_TXT = [
    'L’addition donne 9 bits : 1 11101001. La retenue sortante est perdue : le mot est 11101001. Non signé : 239 + 250 = 489 > 255, ERREUR (c’est la retenue). Signé : −17 + (−6) = −23, et 11101001 = −(00010111) = −23 : juste (négatif + négatif = négatif).',
    'Résultat 00011101 = 29. Non signé : 232 − 203 = 29. Signé : −24 − (−53) = 29. Aucun dépassement.',
    'Le nombre du bas est plus grand en non signé (154 > 90) : la soustraction doit emprunter au-delà du 8e bit. On le montre en ajoutant un 1 devant le nombre du haut (256 + 90 = 346) : 1 01011010 − 10011010 = 11000000. Non signé : 90 − 154 < 0, ERREUR (l’emprunt sorti du mot). Signé : 90 − (−102) = 192 > 127, ERREUR (positif − négatif = négatif). Le mot 11000000 se lit 192 ou −64 : aucune des deux lectures n’est le vrai résultat.',
    'Résultat 10000011, sans retenue. Non signé : 122 + 9 = 131, juste. Signé : 122 + 9 = 131 > 127, ERREUR : positif + positif = négatif (le mot se lit −125).',
    'Résultat 11000010. Non signé : 219 − 25 = 194. Signé : −37 − 25 = −62, et 11000010 = −(00111110) = −62.',
    'L’addition donne 1 01110010 : retenue perdue, le mot est 01110010 (114). Non signé : 128 + 242 = 370 > 255, ERREUR. Signé : −128 + (−14) = −142 < −128, ERREUR (négatif + négatif = positif).',
    'Résultat 10000101. Non signé : 147 − 14 = 133. Signé : −109 − 14 = −123, et 10000101 = −(01111011) = −123.'
  ];
  add({
    id: 'td2-ex4', exam: null, kind: 'td', order: 24, src: 'TD 2 · Ex 4', title: 'Opérations sur 8 bits : non signé, signé, dépassements',
    topics: ['non-signe', 'signe', 'depassement', 'addition', 'soustraction'], lvl: 2, time: 20, near: ['p2025-ex3', 'p2024-ex3', 'p2023-ex3', 'p2017-ex3'],
    intro: '<p>Effectuez les opérations suivantes en binaire (les deux opérandes et le résultat sont codés sur 8 bits). Convertissez le résultat en une valeur décimale non signée et signée. Si un dépassement apparaît, écrire « ERREUR » à la place de la valeur décimale.</p>' + t8Table(FR, true),
    questions: [],
    hints: [
      'Pose chaque opération en binaire : le mot résultat, ce sont les 8 bits de droite. Une retenue ou un emprunt qui sort du mot est perdu.',
      'Non signé : dépassement si une addition produit une retenue sortante (résultat > 255), ou si une soustraction a − b a a < b (résultat < 0).',
      'Signé : dépassement pour P + P = N, N + N = P, P − N = N, N − P = P (exercice 3). Contrôle : refais le calcul en décimal avec les valeurs signées des opérandes.'],
    solution: [
      { t: 'Méthode', html: '<ol><li>Poser l’opération en binaire et garder les 8 bits de droite : c’est le « résultat binaire », toujours écrit, même en cas de dépassement.</li>' +
        '<li>Lire ce mot en non signé (somme des poids) et en signé (bit de poids fort à 1 : complément à deux, puis signe −).</li>' +
        '<li>Contrôler chaque colonne en décimal : opérandes non signés pour « Non signée », opérandes signés pour « Signée ». Si le résultat exact sort de 0 … 255 ou de −128 … 127, on écrit ERREUR dans cette colonne.</li></ol>' +
        '<p>Le registre lit un mot dans les deux codages ; clique sur les bits pour changer le mot :</p>' + tool('register', { n: 8, value: '11101001', sizes: [8] }) }
    ].concat(T8.map(function (r, i) {
      return { t: (i + 1) + '. ' + r.a + ' ' + (r.op === '+' ? '+' : MINUS) + ' ' + r.b, html: t8Tool(r) + '<p>' + T8_TXT[i] + '</p>' +
        (r.borrow ? '<p class="sol-note">Même mot par la méthode du cours IV.2.2 : a − b = a + complément à deux de b. 01011010 + 01100110 = 11000000, sans retenue sortante : pour une soustraction, l’absence de retenue signale l’emprunt.</p>' : '') };
    })),
    answer: t8Table(FR, false),
    traps: [
      'Laisser la case « Résultat binaire » vide en cas de dépassement : on écrit toujours le mot de 8 bits ; ERREUR ne va que dans la colonne décimale concernée.',
      'Prendre la retenue pour un dépassement signé : 11101111 + 11111010 a une retenue (non signé faux), mais le résultat signé −23 est juste.',
      'Écrire la lecture non signée dans la colonne signée : 11000010 vaut 194 en non signé mais −62 en signé.',
      'Oublier que P + P peut déborder sans retenue : 01111010 + 00001001 = 10000011, 131 en non signé mais ERREUR en signé.'],
    official: false, note: NOTE
  });

  /* ================================================================== pour le fichier anglais */
  window.ARCHI_TD = {
    EN: EN, num: num, B: B, H: H, D: D, W: W, pw: pw, tool: tool, calc: calc, tbl: tbl, ul: ul, dtext: dtext, sgn: sgn, par: par, M: M, fmt: fmt,
    posedTool: posedTool, t8Tool: t8Tool, powStatement: powStatement, powAnswer: powAnswer, convStatement: convStatement, convAnswer: convAnswer,
    convSteps: convSteps, opsQuestions: opsQuestions, opsAnswer: opsAnswer, rangesTable: rangesTable, ovTable: ovTable, t8Table: t8Table,
    DATA: { POW_POS: POW_POS, POW_NEG: POW_NEG, CONV21: CONV21, CONV22: CONV22, OPS: OPS, RANGES: RANGES, NEG8: NEG8, SIGNS: SIGNS, OV_ADD: OV_ADD, OV_SUB: OV_SUB, T8: T8 }
  };
})();
