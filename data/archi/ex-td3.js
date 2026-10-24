/* Archi — TD 3 « Systèmes de numération flottante » (Moodle 2026-27, David Bouchet), exercices 1 à 4 : les seuls
   au programme de l’examen (« Tutorials 3 (exercises from 1 to 4 only) »). Les exercices 5 et 6 (plus petit et plus
   grand flottant, epsilon, programme C) ne sont pas repris. Ids td3-ex1 … td3-ex4, kind 'td', exam null.
   - Énoncés verbatim (TD_03.pdf / Tutorial_03.pdf). Corrections : les cinq étapes du chapitre 2 (III.1 et III.2),
     dans l’ordre et avec les écritures du corrigé officiel publié le 24 octobre 2026 (TD_03_Corrige.pdf), dont
     « E = e + biais = 7 + 127 = 6 + 128 ». Le corrigé est juste : chaque mot a été recalculé par programme (struct
     de Python, puis REV.archi.ieeeEncode / ieeeDecode sous node).
   - Les données d’encodage (ENC1, ENC2) sont écrites à la main et vérifiées ; les décodages (DEC3, DEC4) sont
     calculés ici à partir des mots.
   - build(L) construit les quatre fiches avec les mots de la langue L ; data/en/archi/ex-td3.js l’appelle avec les
     mots anglais (window.ARCHI_TD3). Outils de data/archi/ex-td.js (window.ARCHI_TD), chargé avant ce fichier. */
(function () {
  'use strict';
  var T = window.ARCHI_TD, X = window.ARCHI_EX = window.ARCHI_EX || [];
  if (!T) return;
  var B = T.B, H = T.H, pw = T.pw, tool = T.tool, calc = T.calc;
  var MINUS = '−', TIMES = '×', SEP = T.EN ? '.' : ',';

  /* ================================================================== données (vérifiées par programme) */
  /* x : nombre de l’énoncé (FR) ; neg ; sum : partie entière en puissances de 2 ; frac / fd : partie fractionnaire et
     nombre de bits ; bin : |x| en binaire ; norm : mantisse normalisée ; e ; Ex : calcul de E ; E : champ E ; Ms : bits
     significatifs de M ; hex : mot complet */
  var ENC1 = [
    { x: '142', sum: '128 + 8 + 4 + 2', bin: '1000 1110', norm: '1,000111', e: 7, Ex: '7 + 127 = 6 + 128', E: '1000 0110', Ms: '000111', hex: '430E 0000' },
    { x: '64,25', neg: true, sum: '64', frac: '0,25', fd: 2, bin: '100 0000,01', norm: '1,00000001', e: 6, Ex: '6 + 127 = 5 + 128', E: '1000 0101', Ms: '00000001', hex: 'C280 8000' },
    { x: '30,625', sum: '16 + 8 + 4 + 2', frac: '0,625', fd: 3, bin: '1 1110,101', norm: '1,1110101', e: 4, Ex: '4 + 127 = 3 + 128', E: '1000 0011', Ms: '1110101', hex: '41F5 0000' },
    { x: '0,3125', frac: '0,3125', fd: 4, bin: '0,0101', norm: '1,01', e: -2, Ex: '−2 + 127 = 125', E: '0111 1101', Ms: '01', hex: '3EA0 0000' }
  ];
  var ENC2 = [
    { x: '256', neg: true, sum: '256', bin: '1 0000 0000', norm: '1,0', e: 8, Ex: '8 + 1023 = 7 + 1024', E: '100 0000 0111', Ms: '', hex: 'C070 0000 0000 0000' },
    { x: '964', sum: '512 + 256 + 128 + 64 + 4', bin: '11 1100 0100', norm: '1,1110001', e: 9, Ex: '9 + 1023 = 8 + 1024', E: '100 0000 1000', Ms: '1110001', hex: '408E 2000 0000 0000' },
    { x: '8,19140625', sum: '8', frac: '0,19140625', fd: 8, bin: '1000,0011 0001', norm: '1,00000110001', e: 3, Ex: '3 + 1023 = 2 + 1024', E: '100 0000 0010', Ms: '00000110001', hex: '4020 6200 0000 0000' },
    { x: '0,2890625', frac: '0,2890625', fd: 7, bin: '0,0100 101', norm: '1,00101', e: -2, Ex: '−2 + 1023 = 1021', E: '011 1111 1101', Ms: '00101', hex: '3FD2 8000 0000 0000' }
  ];
  var DEC3 = ['1011 1101 0010 0000 0000 0000 0000 0000', '0100 1111 0001 0000 0000 0000 0000 0000', '1100 1100 0101 0011 0000 0000 0000 0000',
    '1111 1111 1000 0000 0000 0000 0000 0000', '0000 0000 0011 0000 0000 0000 0000 0000'];
  var DEC4 = ['417C C800 0000 0000', 'C808 0000 0000 0000', '000A 0000 0000 0000', '8000 0000 0000 0000', 'FFF0 0001 0000 0000'];
  var F = { single: { ne: 8, nm: 23, bias: 127 }, double: { ne: 11, nm: 52, bias: 1023 } };

  /* ================================================================== calculs */
  function g4(s) { var r = ''; for (var i = s.length; i > 0; i -= 4) r = s.slice(Math.max(0, i - 4), i) + (r ? ' ' + r : ''); return r; }
  function bitsOf(w, hex) {
    w = w.replace(/ /g, '');
    return hex ? w.split('').map(function (c) { var b = parseInt(c, 16).toString(2); while (b.length < 4) b = '0' + b; return b; }).join('') : w;
  }
  function dec(w, fmt, hex) {
    var f = F[fmt], b = bitsOf(w, hex), E = b.slice(1, 1 + f.ne), Mf = b.slice(1 + f.ne), Mt = Mf.replace(/0+$/, ''), Ev = parseInt(E, 2);
    var r = { w: w, hex: hex, fmt: fmt, f: f, bits: b, S: +b.charAt(0), E: E, Ev: Ev, Mt: Mt };
    if (/^1+$/.test(E)) r.cls = Mt ? 'nan' : 'inf';
    else if (/^0+$/.test(E)) { r.cls = Mt ? 'sub' : 'zero'; r.e = 1 - f.bias; }
    else { r.cls = 'norm'; r.e = Ev - f.bias; }
    if (r.cls === 'norm') { r.k = parseInt('1' + Mt, 2); r.n = r.e - Mt.length; }
    if (r.cls === 'sub') { r.k = parseInt(Mt, 2); r.n = r.e - Mt.length; }
    return r;
  }
  function Mshow(ms) { return ms ? ms + '0…0' : '0…0'; }
  function Mfull(ms, nm) { var s = ms; while (s.length < nm) s += '0'; return s; }
  function word(sign, E, M) { return '<span class="bn" style="white-space:normal;overflow-wrap:anywhere">' + sign + ' ' + E.replace(/ /g, '') + ' ' + M + '</span>'; }
  function kn(r) { return (r.S ? MINUS : '') + r.k + ' ' + TIMES + ' ' + pw(2, r.n); }

  /* ================================================================== fiches */
  function build(L) {
    var D = function (s) { return T.num(s, 10, false); };
    function encSteps(rows, fmt) {
      var f = F[fmt];
      return rows.map(function (r, i) {
        var xs = (r.neg ? MINUS : '') + r.x, Mbits = fmt === 'single' ? Mfull(r.Ms, f.nm) : Mshow(r.Ms), h = [];
        h.push('<p>1. S = ' + (r.neg ? 1 : 0) + ' (' + (r.neg ? L.negative : L.positive) + ').</p>');
        var p2 = '<p>2. ';
        if (r.sum) p2 += L.intPart(D(r.x.split(',')[0]), D(r.sum), r.sum.indexOf('+') < 0) + ' ';
        if (r.frac) p2 += L.fracPart(D(r.frac), r.fd);
        h.push(p2 + '</p>' + (r.frac ? tool('mults', { x: r.frac, base: 2, digits: r.fd }) : '') +
          calc(['|' + D(xs) + '| = ' + D(r.x) + ' = ' + B(r.bin)]));
        h.push('<p>3. ' + L.shift(Math.abs(r.e), r.e >= 0) + '</p>' +
          calc([D(r.x) + ' = ' + par(r.norm) + ' ' + TIMES + ' ' + pw(2, r.e),
            'M = ' + B(Mshow(r.Ms)) + ' ' + L.and + ' e = ' + (r.e < 0 ? MINUS + (-r.e) : r.e)]));
        h.push('<p>4. ' + L.exp(fmt, r.e) + '</p>' +
          calc(['E = e + ' + L.bias + ' = ' + D(r.Ex), 'E = ' + B(r.E)]));
        h.push('<p>5. ' + L.result + '</p>' + calc([D(xs) + ' → ' + word(r.neg ? 1 : 0, r.E, Mbits)]) +
          '<p>' + L.check(H(r.hex)) + '</p>' + tool('ieee', { fmt: fmt, value: (r.neg ? '-' : '') + (T.EN ? r.x.replace(',', '.') : r.x), input: false }));
        return { t: (i + 1) + '. ' + D(xs), html: h.join('') };
      });
    }
    function encAnswer(rows, fmt) {
      var f = F[fmt];
      return calc(rows.map(function (r, i) {
        return (i + 1) + '. ' + D((r.neg ? MINUS : '') + r.x) + ' → ' + word(r.neg ? 1 : 0, r.E, fmt === 'single' ? Mfull(r.Ms, f.nm) : Mshow(r.Ms));
      })) + (fmt === 'double' ? '<p>' + L.dots + '</p>' : '');
    }
    function decSteps(words, fmt, hex) {
      return words.map(function (w, i) {
        var r = dec(w, fmt, hex), f = r.f, h = [], src = hex ? H(w) : B(w);
        if (hex) h.push(calc([src + ' = ' + B(lead(w)) ]));
        h.push(calc([L.fields + ' S = ' + r.S + ', E = ' + B(g4(r.E)) + ', M = ' + B(Mshow(r.Mt))]));
        if (r.cls === 'inf') h.push('<p>' + L.inf(r.S) + '</p>');
        else if (r.cls === 'nan') h.push('<p>' + L.nan + '</p>');
        else if (r.cls === 'zero') h.push('<p>' + L.zero(r.S) + '</p>');
        else if (r.cls === 'sub') {
          h.push('<p>' + L.sub + '</p>');
          h.push(calc(['S = ' + r.S + ' → ' + (r.S ? L.negative : L.positive),
            'e = 1 − ' + L.bias + ' = 1 − ' + f.bias + ' = ' + MINUS + (-r.e),
            'm = (0' + SEP + 'M)<sub>2</sub> = ' + par('0,' + r.Mt),
            (r.S ? MINUS : '+') + 'm ' + TIMES + ' ' + pw(2, 'e') + ' = ' + (r.S ? MINUS : '') + par('0,' + r.Mt) + ' ' + TIMES + ' ' + pw(2, r.e) + ' = ' + (r.S ? MINUS : '') + par(r.Mt.replace(/^0+/, '')) + ' ' + TIMES + ' ' + pw(2, r.n),
            '= ' + kn(r)]));
          h.push('<p>' + L.move(r.Mt.length, r.e, r.n) + '</p>');
        } else {
          h.push(calc(['S = ' + r.S + ' → ' + (r.S ? L.negative : L.positive),
            'e = E − ' + L.bias + ' = ' + B(g4(r.E)) + ' − ' + f.bias + ' = ' + r.Ev + ' − ' + f.bias + ' = ' + (r.e < 0 ? MINUS + (-r.e) : r.e),
            'm = (1' + SEP + 'M)<sub>2</sub> = ' + par('1' + (r.Mt ? ',' + r.Mt : '')),
            (r.S ? MINUS : '+') + 'm ' + TIMES + ' ' + pw(2, 'e') + ' = ' + (r.S ? MINUS : '') + par('1' + (r.Mt ? ',' + r.Mt : '')) + ' ' + TIMES + ' ' + pw(2, r.e) +
              ' = ' + (r.S ? MINUS : '') + par('1' + r.Mt) + ' ' + TIMES + ' ' + pw(2, r.n),
            '= ' + kn(r)]));
          h.push('<p>' + L.move(r.Mt.length, r.e, r.n) + '</p>');
        }
        h.push(tool('ieee', { fmt: fmt, hex: hex ? w : g4hex(r.bits), input: false }));
        return { t: (i + 1) + '. ' + (hex ? H(w) : B(w)), html: h.join('') };
      });
    }
    function decAnswer(words, fmt, hex) {
      return calc(words.map(function (w, i) { var r = dec(w, fmt, hex); return (i + 1) + '. ' + (hex ? H(w) : B(w)) + ' → ' + val(r); }));
    }
    function val(r) {
      if (r.cls === 'inf') return (r.S ? MINUS : '+') + '∞';
      if (r.cls === 'nan') return 'NaN';
      if (r.cls === 'zero') return (r.S ? MINUS : '+') + '0';
      return kn(r) + (r.cls === 'sub' ? ' (' + L.subShort + ')' : '');
    }
    function list(items) { return '<ol>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
    var NEAR = ['p2025-ex4', 'p2024-ex4', 'p2023-ex4'];
    return [
      {
        id: 'td3-ex1', exam: null, kind: 'td', order: 31, src: L.src(1), title: L.t1,
        topics: ['ieee-encodage'], lvl: 2, time: 15, near: NEAR,
        intro: '<p>' + L.q1 + '</p>' + list(ENC1.map(function (r) { return D((r.neg ? '-' : '') + r.x); })),
        questions: [], hints: L.h1, solution: [{ t: L.method, html: L.encMethod('single') }].concat(encSteps(ENC1, 'single')),
        answer: encAnswer(ENC1, 'single'), traps: L.tr1, official: true, note: L.note
      },
      {
        id: 'td3-ex2', exam: null, kind: 'td', order: 32, src: L.src(2), title: L.t2,
        topics: ['ieee-encodage'], lvl: 2, time: 15, near: NEAR,
        intro: '<p>' + L.q2 + '</p>' + list(ENC2.map(function (r) { return D((r.neg ? '-' : '') + r.x); })),
        questions: [], hints: L.h2, solution: [{ t: L.method, html: L.encMethod('double') }].concat(encSteps(ENC2, 'double')),
        answer: encAnswer(ENC2, 'double'), traps: L.tr2, official: true, note: L.note
      },
      {
        id: 'td3-ex3', exam: null, kind: 'td', order: 33, src: L.src(3), title: L.t3,
        topics: ['ieee-decodage', 'ieee-special'], lvl: 3, time: 15, near: NEAR,
        intro: '<p>' + L.q3 + '</p>' + list(DEC3.map(function (w) { return B(w); })),
        questions: [], hints: L.h3, solution: [{ t: L.method, html: L.decMethod('single') }].concat(decSteps(DEC3, 'single', false)),
        answer: decAnswer(DEC3, 'single', false), traps: L.tr3, official: true, note: L.note
      },
      {
        id: 'td3-ex4', exam: null, kind: 'td', order: 34, src: L.src(4), title: L.t4,
        topics: ['ieee-decodage', 'ieee-special'], lvl: 3, time: 15, near: NEAR,
        intro: '<p>' + L.q4 + '</p>' + list(DEC4.map(function (w) { return H(w); })),
        questions: [], hints: L.h4, solution: [{ t: L.method, html: L.decMethod('double') }].concat(decSteps(DEC4, 'double', true)),
        answer: decAnswer(DEC4, 'double', true), traps: L.tr4, official: true, note: L.note
      }
    ];
  }
  /* (1,01)₂ : parenthèses autour d’un nombre binaire, indice après la parenthèse, comme le cours */
  function par(s) { return '(' + T.num(s, 2, false) + ')<sub>2</sub>'; }
  /* mot hexadécimal → binaire jusqu’au dernier chiffre non nul, puis « 0…0 » (comme le corrigé) */
  function lead(w) {
    var h = w.replace(/ /g, '').replace(/0+$/, '');
    return h.split('').map(function (c) { var b = parseInt(c, 16).toString(2); while (b.length < 4) b = '0' + b; return b; }).join(' ') + ' 0…0';
  }
  function g4hex(b) { var h = ''; for (var i = 0; i < b.length; i += 4) h += parseInt(b.slice(i, i + 4), 2).toString(16).toUpperCase(); return g4(h); }

  /* ================================================================== mots français */
  var BIAS = { single: '127', double: '1023' };
  var FR = {
    positive: 'positif', negative: 'négatif', and: 'et', bias: 'biais', method: 'Méthode du cours (chapitre 2)',
    src: function (n) { return 'TD 3 · Ex ' + n + (n === 2 || n === 4 ? ' (maison)' : ''); },
    t1: 'IEEE 754 : encoder en simple précision', t2: 'IEEE 754 : encoder en double précision',
    t3: 'IEEE 754 : décoder des mots simple précision', t4: 'IEEE 754 : décoder des mots double précision',
    q1: 'Convertissez les nombres ci-dessous dans le format IEEE754 simple précision. Vous exprimerez le résultat final sous forme binaire.',
    q2: '<i>(Travail à la maison.)</i> Convertissez les nombres ci-dessous dans le format IEEE754 double précision. Vous exprimerez le résultat final sous forme binaire.',
    q3: 'Donnez la représentation associée aux mots binaires codés au format IEEE754 simple précision présents ci-dessous. Si une représentation est un nombre, vous l’exprimerez en base 10 sous la forme <var>k</var>×2<sup><var>n</var></sup> où <var>k</var> et <var>n</var> sont des entiers relatifs.',
    q4: '<i>(Travail à la maison.)</i> Donnez la représentation associée aux mots binaires codés au format IEEE754 double précision présents ci-dessous. Si une représentation est un nombre, vous l’exprimerez en base 10 sous la forme <var>k</var>×2<sup><var>n</var></sup> où <var>k</var> et <var>n</var> sont des entiers relatifs.',
    intPart: function (i, s, pow) { return 'Partie entière : ' + (pow ? i + ' est une puissance de 2.' : i + ' = ' + s + '.'); },
    fracPart: function (x, d) { return 'Partie fractionnaire : multiplications successives par 2 de ' + x + ', jusqu’à tomber sur 1 (' + d + ' bits).'; },
    shift: function (k, left) { return k === 0 ? 'La mantisse est déjà normalisée.' : 'Normaliser : on déplace la virgule de ' + k + ' rang' + (k > 1 ? 's' : '') + ' vers la ' + (left ? 'gauche' : 'droite') + ', pour n’avoir qu’un 1 devant elle. M = les chiffres après la virgule (le 1 de tête n’est pas stocké).'; },
    exp: function (fmt, e) {
      var p = fmt === 'single' ? ['127', '128', '1000 0000'] : ['1023', '1024', '100 0000 0000'];
      return e < 0 ? 'Exposant biaisé : e est négatif, donc E est inférieur au biais et son bit de poids fort vaut 0.' :
        'Exposant biaisé. Astuce du corrigé : ' + p[0] + ' = ' + p[1] + ' − 1, donc E = (e − 1) + ' + p[1] + ' ; comme ' + p[1] + ' = ' + B(p[2]) + ', il suffit d’écrire e − 1 = ' + (e - 1) + ' sur les bits de droite.';
    },
    result: 'Résultat final, sous forme binaire (S, E, M) :',
    check: function (h) { return 'Contrôle : regroupé en paquets de 4 bits, le mot s’écrit ' + h + '.'; },
    dots: '« 0…0 » : M est complétée par des 0 jusqu’à 52 bits, comme dans le corrigé.',
    fields: 'Champs :', subShort: 'dénormalisé',
    inf: function (s) { return 'E ne contient que des 1 et M = 0 : c’est ' + (s ? '−∞' : '+∞') + ' (S = ' + s + ').'; },
    nan: 'E ne contient que des 1 et M ≠ 0 : c’est un NaN (Not a Number). Un seul bit à 1 dans M suffit.',
    zero: function (s) { return 'E = 0 et M = 0 : c’est ' + (s ? '−0' : '+0') + ' (S = ' + s + '). La norme distingue +0 et −0.'; },
    sub: 'E = 0 et M ≠ 0 : représentation à mantisse dénormalisée. L’exposant est fixe, e = 1 − biais, et m = (0,M)<sub>2</sub> : pas de 1 implicite.',
    move: function (k, e, n) { return k ? 'On supprime la virgule : elle avance de ' + k + ' rang' + (k > 1 ? 's' : '') + ', donc l’exposant perd ' + k + ' (' + (e < 0 ? MINUS + (-e) : e) + ' − ' + k + ' = ' + (n < 0 ? MINUS + (-n) : n) + ').' : 'm = 1 : pas de virgule à supprimer.'; },
    encMethod: function (fmt) {
      var b = BIAS[fmt];
      return '<ol><li>Déterminer la valeur de S en fonction du signe du nombre.</li><li>Convertir la valeur absolue du nombre dans sa représentation binaire (éventuellement fractionnaire).</li>' +
        '<li>Normaliser la représentation binaire et déterminer facilement les valeurs de M et e.</li><li>Déterminer la valeur de E en fonction de e et du biais : E = e + biais.</li>' +
        '<li>Écrire le résultat final dans sa forme binaire.</li></ol><p>' + (fmt === 'single' ? 'Simple précision : S sur 1 bit, E sur 8 bits, M sur 23 bits, biais 127.' : 'Double précision : S sur 1 bit, E sur 11 bits, M sur 52 bits, biais 1023.') +
        ' Astuce du corrigé : ' + b + ' = ' + (fmt === 'single' ? '128' : '1024') + ' − 1, donc E = (e − 1) + ' + (fmt === 'single' ? '128' : '1024') + '.</p>';
    },
    decMethod: function (fmt) {
      return '<p>' + (fmt === 'single' ? 'Simple précision : 1 bit de signe, 8 bits d’exposant, 23 bits de mantisse, biais 127.' : 'Double précision : 1 bit de signe, 11 bits d’exposant, 52 bits de mantisse, biais 1023. Les 3 premiers chiffres hexadécimaux contiennent S et E.') + ' On regarde d’abord E :</p>' +
        '<ul><li>E ne contient que des 0 : ±0 si M = 0, sinon nombre dénormalisé ;</li><li>E ne contient que des 1 : ±∞ si M = 0, sinon NaN ;</li><li>sinon, nombre normalisé :</li></ul>' +
        '<ol><li>Déterminer le signe du nombre en fonction de la valeur de S.</li><li>Déterminer e en fonction de E et du biais : e = E − biais.</li><li>Déterminer m dans sa représentation binaire : m = (1,M)<sub>2</sub>.</li>' +
        '<li>Écrire le résultat sous la forme suivante : ± m × 2<sup>e</sup>.</li><li>Simplifier si nécessaire en déplaçant ou supprimant la virgule et convertir en représentation décimale.</li></ol>';
    },
    h1: ['Les cinq étapes du cours : S, |x| en binaire, normalisation en (1,…)<sub>2</sub> × 2<sup>e</sup>, E = e + 127 sur 8 bits, puis le mot S E M. M = les chiffres après la virgule, complétés à droite par des 0 jusqu’à 23 bits.',
      'Les parties fractionnaires de ce TD s’arrêtent toutes : multiplie par 2 jusqu’à obtenir exactement 1 (0,25 donne 2 bits, 0,625 en donne 3, 0,3125 en donne 4).',
      'Astuce du corrigé : 127 = 128 − 1, donc E = (e − 1) + 128. Comme 128 = <span class="bn">1000 0000</span>, pour e = 7 on écrit 6 = 110 sur les bits de droite : E = <span class="bn">1000 0110</span>. Si e est négatif, E est inférieur à 127 et commence par 0.'],
    h2: ['Mêmes étapes qu’en simple précision, avec E sur 11 bits, M sur 52 bits et le biais 1023.',
      'Astuce : 1023 = 1024 − 1, donc E = (e − 1) + 1024, et 1024 = <span class="bn">100 0000 0000</span> (11 bits). Pour e = 8 : E = <span class="bn">100 0000 0111</span>.',
      '0,19140625 demande 8 multiplications, 0,2890625 en demande 7. Contrôle : 0,19140625 × 256 = 49 = <span class="bn">0011 0001</span>.'],
    h3: ['Coupe le mot : 1 bit de signe, puis 8 bits d’exposant E, puis 23 bits de mantisse M.',
      'Nombre normalisé : e = E − 127 et m = (1,M)<sub>2</sub>. Pour obtenir <var>k</var> entier, supprime la virgule de m : l’exposant diminue d’autant de rangs que de chiffres après la virgule.',
      'Cas particuliers : E = <span class="bn">1111 1111</span> donne ±∞ (M = 0) ou NaN (M ≠ 0) ; E = 0 donne ±0 (M = 0) ou un nombre dénormalisé : m = (0,M)<sub>2</sub> et e = 1 − 127 = −126.'],
    h4: ['Écris d’abord le mot en binaire (4 bits par chiffre hexadécimal) : S est le 1<sup>er</sup> bit, E les 11 suivants (3 premiers chiffres hexadécimaux), M les 52 derniers (13 derniers chiffres).',
      'Nombre normalisé : e = E − 1023 et m = (1,M)<sub>2</sub>, puis supprime la virgule de m en retirant autant à l’exposant.',
      'Dénormalisé (E = 0, M ≠ 0) : e = 1 − 1023 = −1022 et m = (0,M)<sub>2</sub>. E rempli de 1 : ±∞ si M = 0, NaN sinon.'],
    tr1: ['Stocker le 1 avant la virgule dans M : il est implicite. 142 = (1,000111)<sub>2</sub> × 2<sup>7</sup> donne M = <span class="bn">000111</span>0…0.',
      'Compléter M à gauche : les 0 vont à droite, après les chiffres significatifs.',
      'Écrire E sans ses zéros de tête : pour 0,3125, E = 125 = <span class="bn">0111 1101</span>, sur 8 bits.',
      'Coder −64,25 en complément à deux : en IEEE 754, x et −x ne diffèrent que par le bit S.'],
    tr2: ['Prendre le biais 127 : en double précision, c’est 1023, et E a 11 bits.',
      'Normaliser 256 en (0,1)<sub>2</sub> × 2<sup>9</sup> : une mantisse normalisée commence par « 1, », donc 256 = (1,0)<sub>2</sub> × 2<sup>8</sup> et M = 0…0.',
      'Écrire E sur 8 bits par habitude : <span class="bn">100 0000 0111</span> a 11 bits.'],
    tr3: ['Oublier de reporter la virgule sur l’exposant : (1,01)<sub>2</sub> × 2<sup>−5</sup> = (101)<sub>2</sub> × 2<sup>−7</sup> = −5 × 2<sup>−7</sup> pour le mot 1, pas 5 × 2<sup>−5</sup>.',
      'Appliquer m = (1,M)<sub>2</sub> quand E = 0 : c’est (0,M)<sub>2</sub>, avec e = −126 (pas −127).',
      'Prendre FF80 0000 pour un NaN : M = 0, c’est −∞.'],
    tr4: ['Garder le biais 127 : en double précision, e = E − 1023, et e = −1022 pour un dénormalisé.',
      'Croire que 8000 0000 0000 0000 n’est « rien » : c’est −0 (S = 1, E = 0, M = 0).',
      'Croire qu’un NaN demande beaucoup de bits à 1 dans M : FFF0 0001 0000 0000 en a un seul.',
      'Couper le mot au mauvais endroit : E occupe 3 chiffres hexadécimaux moins le bit de signe, soit 11 bits ; il déborde sur le 3<sup>e</sup> chiffre (417 → 0 | 100 0001 0111).'],
    note: 'Correction rédigée selon les étapes du cours et du corrigé officiel du TD 3 publié sur le Moodle ; chaque mot a été recalculé par programme et concorde.'
  };

  build(FR).forEach(function (ex) { X.push(T.fmt(ex)); });
  window.ARCHI_TD3 = { build: build, FR: FR };
})();
