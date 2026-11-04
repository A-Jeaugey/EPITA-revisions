/* Archi B2 (Architecture des ordinateurs · Algèbre de Boole) — moteur logique, écriture des expressions et outils
   des pages. Chargé après core.js (et qcm-engine.js s'il y a des QCM).

   NOTATION DES SOURCES (données, pages) : ~A = A barre, ~(A + B) = barre sur le groupe, . ET, + OU, ^ OU exclusif,
     0 et 1 ; variables : une lettre suivie de chiffres (A, b, A0, C3). Priorités : ~ puis . puis ^ puis +.
     ex('~(A.B) + ~A.~B.C') → HTML : barres en <span class="ov">, ⊕ pour ^, l'écriture de l'auteur (parenthèses,
     espaces) est conservée ; une barre sur un groupe n'affiche pas les parenthèses du groupe. Dans une page,
     <span class="bx">~A.B + C</span> (ou <code class="bx">) est réécrit au chargement ; ajouté plus tard aussi.
   MOTEUR (REV.boole)
     parse(s) → arbre { t: 'v' | 'c' | 'not' | 'and' | 'or' | 'xor', … } ; evalAst(arbre, valeurs) ; varsOf(s).
     table(s, vars) → [0/1 …] dans l'ordre binaire des variables (la première est le poids fort).
     minimize(n, ones, dc) → impliquants [{ v, m }] (m : bits indifférents) : couverture exacte minimale (nombre
       de termes, puis de littéraux), les cases indéfinies (dc) aident sans être obligatoires.
     sop(impl, vars) → 'A.~B + C' ; canon1(ones, vars), canon2(ones, vars) ; equiv(a, b, vars) ; simplify(s, vars).
     gray(k) → code Gray sur k bits (['00', '01', '11', '10']).
   OUTILS (déclarés dans le HTML : <div data-boole="kmap" data-opts='{…}'>, montés aussi quand un script les ajoute)
     kmap   { vars: ['D','C','B','A'], rows: 2, ones: [..], dc: [..], name: 'S', mode: 'show' | 'play' | 'free',
              expr (au lieu de ones), xor: 'B ^ (C.D)' (forme avec OU exclusif à montrer), title, steps }
            show : tableau rempli, cercles et expression, détail de chaque cercle ; play : tableau vide à remplir
            (clic : 0 → 1 → Φ), puis vérification, cercles et expression ; free : tableau libre, expression en direct.
     truth  { exprs: ['A.B', …], vars, names, cols: { S: [..] } , hl: [lignes] } table de vérité.
     gate   { type: 'and' | 'or' | 'not' | 'nand' | 'nor' | 'xor' | 'xnor' | 'buf', n: 2, inv: [0,1], neg: false,
              rect: true } porte cliquable : entrées à basculer, sortie, table de vérité, symbole rectangulaire.
     schema { w, h, inputs: [{ id, x }], gates: [{ id, type, x, y, in: ['a', 'g1'], inv, neg }], outputs: [{ from,
              label }], labels, live } schéma dessiné ; live : entrées cliquables, fils colorés selon leur niveau.
     check  { ref: 'A.~B + C', vars, kind: 'min' | 'nopar' | 'canon1' | 'canon2' | 'any', label } champ de réponse
            vérifié (équivalence, forme demandée, nombre de termes) ; saisie : ~A, A', /A, !A ; . * ou rien pour ET.
     block  { kind: 'decoder' | 'mux' | 'demux' | 'adder' | 'comparator' | 'half', n } bloc combinatoire cliquable.
     simplifier { value } : saisie libre d'une expression → table, forme la plus simple, formes canoniques.
   Textes affichés : REV.t('français') ; anglais déclaré ci-dessous (REV.i18n.add). */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t, EN = R.lang === 'en';
  R.i18n.add({
    'Tableau de Karnaugh': 'Karnaugh map', 'Table de vérité': 'Truth table', 'Vérifier le tableau': 'Check the map', 'Montrer les cercles': 'Show the circles',
    'Effacer': 'Clear', 'Recommencer': 'Start again', 'Solution': 'Solution', 'Vérifier': 'Check',
    'Clique sur une case : 0, puis 1, puis Φ (indéfinie).': 'Click a cell: 0, then 1, then Φ (undefined).',
    'Le tableau est juste.': 'The map is correct.', '{n} case(s) fausse(s), entourée(s) en rouge.': '{n} wrong cell(s), outlined in red.',
    'Expression la plus simplifiée': 'Most simplified expression', 'Avec un OU exclusif': 'With an exclusive OR',
    'cercle {i}': 'circle {i}', '{v} varie : absente.': '{v} varies: left out.', '{v} vaut toujours 0 : {x}.': '{v} is always 0: {x}.', '{v} vaut toujours 1 : {x}.': '{v} is always 1: {x}.',
    'Le produit est {p}.': 'The product is {p}.', 'case': 'cell', 'cases': 'cells',
    'Pas de 1 : la sortie vaut toujours 0.': 'No 1: the output is always 0.', 'Que des 1 : la sortie vaut toujours 1.': 'Only 1s: the output is always 1.',
    'Entrées': 'Inputs', 'Sortie': 'Output', 'Clique sur une entrée pour la basculer.': 'Click an input to toggle it.',
    'Symbole à forme distincte': 'Distinctive-shape symbol', 'Symbole à forme rectangulaire': 'Rectangular symbol',
    'Ta réponse': 'Your answer', 'Écris ton expression : ~A ou A’ pour A barre, . pour ET, + pour OU, ^ pour OU exclusif.': 'Type your expression: ~A or A’ for NOT A, . for AND, + for OR, ^ for exclusive OR.',
    'Je ne comprends pas cette expression.': 'I cannot read this expression.', 'Variable inconnue : {v}.': 'Unknown variable: {v}.',
    'Juste et la plus simple possible.': 'Correct and as simple as possible.', 'Juste.': 'Correct.',
    'Équivalente, mais pas la plus simple : {a} termes et {b} littéraux, la plus simple en a {c} et {d}.': 'Equivalent, but not the simplest: {a} terms and {b} literals; the simplest has {c} and {d}.',
    'Équivalente, mais il reste des parenthèses : le sujet les interdit.': 'Equivalent, but there are still parentheses: the paper forbids them.',
    'Équivalente, mais ce n’est pas une somme de mintermes (chaque produit doit contenir toutes les variables, une seule fois chacun).': 'Equivalent, but this is not a sum of minterms (each product must contain every variable, once).',
    'Équivalente, mais ce n’est pas un produit de maxtermes (chaque somme doit contenir toutes les variables, une seule fois chacune).': 'Equivalent, but this is not a product of maxterms (each sum must contain every variable, once).',
    'Fausse : elle diffère pour {l}.': 'Wrong: it differs for {l}.', 'Il manque {k} terme(s) : {t}.': '{k} term(s) missing: {t}.',
    'Voir la réponse': 'Show the answer', 'Réponse : {r}': 'Answer: {r}',
    'Simplificateur': 'Simplifier', 'Expression': 'Expression', 'Ton expression': 'Your expression',
    'Forme la plus simple (somme de produits)': 'Simplest form (sum of products)', 'Première forme canonique': 'Minterm canonical form (first form)',
    'Seconde forme canonique': 'Maxterm canonical form (second form)', 'mintermes : {l}': 'minterms: {l}', 'maxtermes : {l}': 'maxterms: {l}',
    'Décodeur 1 parmi {n}': '1-of-{n} decoder', 'Multiplexeur {n} vers 1': '{n}-to-1 multiplexer', 'Démultiplexeur 1 vers {n}': '1-to-{n} demultiplexer',
    'Additionneur {n} bits': '{n}-bit adder', 'Comparateur {n} bits': '{n}-bit comparator', 'Demi-additionneur': 'Half adder',
    'sélection': 'select', 'donnée': 'data', 'retenue': 'carry', 'Clique sur les bits.': 'Click the bits.',
    'La sortie Q{k} est à 1 : le nombre {k} est sur les entrées.': 'Output Q{k} is 1: the number {k} is on the inputs.',
    'Q recopie D{k} (sélection {k}).': 'Q copies D{k} (select {k}).', 'D est recopiée sur Q{k} (sélection {k}) ; les autres sorties valent 0.': 'D is copied to Q{k} (select {k}); the other outputs are 0.',
    'Outil indisponible : {m}': 'Tool unavailable: {m}', 'Niveau': 'Level', 'au niveau {v}': 'at level {v}'
  });

  /* ================================================================== moteur */
  var TOK = /\s*([A-Za-z][0-9]*'?|[01]|[~.+^()'])/y;
  function tokens(s) {
    var out = [], m; TOK.lastIndex = 0; s = String(s).replace(/⊕/g, '^').replace(/[·×*]/g, '.').replace(/\s+$/, '');
    while (TOK.lastIndex < s.length) {
      var at = TOK.lastIndex; m = TOK.exec(s);
      if (!m) throw new Error('syntax@' + at);
      out.push(m[1]);
    }
    return out;
  }
  function parse(s) {
    var t = tokens(s), i = 0;
    function peek() { return t[i]; }
    function atom() {
      var c = t[i++], a;
      if (c === undefined) throw new Error('end');
      if (c === '~') return { t: 'not', a: atom() };
      if (c === '(') { a = or(); if (t[i++] !== ')') throw new Error('paren'); a = { t: 'par', a: a }; }
      else if (c === '0' || c === '1') a = { t: 'c', v: +c };
      else if (/^[A-Za-z]/.test(c)) { a = { t: 'v', n: c.replace(/'$/, '') }; if (/'$/.test(c)) a = { t: 'not', a: a }; }
      else throw new Error('token ' + c);
      while (peek() === "'") { i++; a = { t: 'not', a: a }; }
      return a;
    }
    function and() { var a = atom(); while (peek() === '.') { i++; a = { t: 'and', a: a, b: atom() }; } return a; }
    function xor() { var a = and(); while (peek() === '^') { i++; a = { t: 'xor', a: a, b: and() }; } return a; }
    function or() { var a = xor(); while (peek() === '+') { i++; a = { t: 'or', a: a, b: xor() }; } return a; }
    var e = or();
    if (i !== t.length) throw new Error('trailing');
    return e;
  }
  function ev(e, env) {
    switch (e.t) {
      case 'v': if (!(e.n in env)) throw new Error('var ' + e.n); return env[e.n];
      case 'c': return e.v;
      case 'par': return ev(e.a, env);
      case 'not': return 1 - ev(e.a, env);
      case 'and': return ev(e.a, env) & ev(e.b, env);
      case 'or': return ev(e.a, env) | ev(e.b, env);
      case 'xor': return ev(e.a, env) ^ ev(e.b, env);
    }
    throw new Error('node');
  }
  function varsAst(e, acc) {
    acc = acc || [];
    if (e.t === 'v') { if (acc.indexOf(e.n) < 0) acc.push(e.n); }
    else if (e.a) { varsAst(e.a, acc); if (e.b) varsAst(e.b, acc); }
    return acc;
  }
  function varsOf(s) { return varsAst(parse(s)).sort(); }
  function table(s, vars) {
    var e = typeof s === 'string' ? parse(s) : s, n = vars.length, out = [];
    for (var k = 0; k < (1 << n); k++) {
      var env = {};
      for (var j = 0; j < n; j++) env[vars[j]] = (k >> (n - 1 - j)) & 1;
      out.push(ev(e, env));
    }
    return out;
  }
  function onesOf(s, vars) { return table(s, vars).reduce(function (a, v, i) { if (v) a.push(i); return a; }, []); }
  function equiv(a, b, vars) {
    vars = vars || varsOf(a).concat(varsOf(b)).filter(function (v, i, l) { return l.indexOf(v) === i; }).sort();
    var ta = table(a, vars), tb = table(b, vars);
    for (var i = 0; i < ta.length; i++) if (ta[i] !== tb[i]) return false;
    return true;
  }
  function bitcount(x) { var c = 0; while (x) { c += x & 1; x >>= 1; } return c; }
  /* Quine-McCluskey puis couverture exacte (n ≤ 6) : moins de termes, puis moins de littéraux ; à égalité, l'ordre
     des cases (impliquants trouvés en premier) */
  function minimize(n, ones, dc) {
    dc = dc || [];
    if (!ones.length) return [];
    var all = ones.concat(dc), terms = [], seen = {}, primes = [];
    all.forEach(function (m) { if (!seen[m + ':0']) { seen[m + ':0'] = 1; terms.push({ v: m, m: 0 }); } });
    while (terms.length) {
      var next = [], used = {}, nk = {};
      for (var a = 0; a < terms.length; a++) for (var b = a + 1; b < terms.length; b++) {
        var x = terms[a], y = terms[b];
        if (x.m !== y.m) continue;
        var d = x.v ^ y.v;
        if (d && !(d & (d - 1))) {
          used[a] = used[b] = 1;
          var k = (x.v & ~d) + ':' + (x.m | d);
          if (!nk[k]) { nk[k] = 1; next.push({ v: x.v & ~d, m: x.m | d }); }
        }
      }
      terms.forEach(function (t, i) { if (!used[i]) primes.push(t); });
      terms = next;
    }
    function covers(p, m) { return (m & ~p.m) === p.v; }
    function lits(p) { return n - bitcount(p.m); }
    /* essentiels d'abord, puis recherche exhaustive sur le reste */
    var need = ones.slice(), chosen = [];
    var changed = true;
    while (changed) {
      changed = false;
      for (var i = 0; i < need.length; i++) {
        var cov = primes.filter(function (p) { return covers(p, need[i]); });
        if (cov.length === 1 && chosen.indexOf(cov[0]) < 0) {
          chosen.push(cov[0]); need = need.filter(function (m) { return !covers(cov[0], m); }); changed = true; break;
        }
      }
    }
    var rest = primes.filter(function (p) { return chosen.indexOf(p) < 0 && need.some(function (m) { return covers(p, m); }); });
    var best = null;
    for (var size = 0; size <= rest.length && !best; size++) {
      (function comb(start, pick) {
        if (pick.length === size) {
          if (need.every(function (m) { return pick.some(function (p) { return covers(p, m); }); })) {
            var l = pick.reduce(function (s, p) { return s + lits(p); }, 0);
            if (!best || l < best.l) best = { l: l, pick: pick.slice() };
          }
          return;
        }
        for (var j = start; j < rest.length; j++) { pick.push(rest[j]); comb(j + 1, pick); pick.pop(); }
      })(0, []);
    }
    return chosen.concat(best ? best.pick : []).sort(function (p, q) { return lits(p) - lits(q) || order(p, q, n); });
  }
  /* à nombre de littéraux égal : les termes dont les premières variables apparaissent d'abord, non complémentées
     avant complémentées (A + C, A.~B + ~B.~C, comme les corrigés) */
  function order(p, q, n) {
    for (var j = n - 1; j >= 0; j--) {
      var b = 1 << j, ip = !(p.m & b), iq = !(q.m & b);
      if (ip !== iq) return ip ? -1 : 1;
      if (ip && (p.v & b) !== (q.v & b)) return p.v & b ? -1 : 1;
    }
    return 0;
  }
  function term(p, vars) {
    var n = vars.length, l = [];
    for (var j = 0; j < n; j++) { var bit = 1 << (n - 1 - j); if (p.m & bit) continue; l.push((p.v & bit ? '' : '~') + vars[j]); }
    return l.join('.') || '1';
  }
  function sop(impl, vars) { return impl.length ? impl.map(function (p) { return term(p, vars); }).join(' + ') : '0'; }
  function minterm(k, vars) { var n = vars.length; return vars.map(function (v, j) { return ((k >> (n - 1 - j)) & 1 ? '' : '~') + v; }).join('.'); }
  function maxterm(k, vars) { var n = vars.length; return '(' + vars.map(function (v, j) { return ((k >> (n - 1 - j)) & 1 ? '~' : '') + v; }).join(' + ') + ')'; }
  function canon1(ones, vars) { return ones.length ? ones.slice().sort(function (a, b) { return b - a; }).map(function (k) { return minterm(k, vars); }).join(' + ') : '0'; }
  function canon2(ones, vars) {
    var z = []; for (var k = 0; k < (1 << vars.length); k++) if (ones.indexOf(k) < 0) z.push(k);
    return z.length ? z.map(function (k) { return maxterm(k, vars); }).join('.') : '1';
  }
  function simplify(s, vars) { vars = vars || varsOf(s); return sop(minimize(vars.length, onesOf(s, vars)), vars); }
  function gray(k) { if (k === 0) return ['']; var g = gray(k - 1); return g.map(function (x) { return '0' + x; }).concat(g.slice().reverse().map(function (x) { return '1' + x; })); }
  /* forme d'une expression : nombre de termes et de littéraux d'une somme de produits (sinon null) */
  function sopShape(e) {
    var ts = [];
    (function flat(x) { if (x.t === 'or') { flat(x.a); flat(x.b); } else ts.push(x); })(e);
    var lits = 0;
    for (var i = 0; i < ts.length; i++) {
      var ok = true, n = 0;
      (function prod(x) {
        if (x.t === 'and') { prod(x.a); prod(x.b); }
        else if (x.t === 'v' || (x.t === 'not' && x.a.t === 'v')) n++;
        else if (x.t === 'c') { /* constante seule */ }
        else ok = false;
      })(ts[i]);
      if (!ok) return null;
      lits += n;
    }
    return { terms: ts.length, lits: lits, list: ts };
  }
  function hasPar(e) { if (!e) return false; if (e.t === 'par') return true; if (e.t === 'not' && e.a.t === 'par') return true; return hasPar(e.a) || hasPar(e.b); }
  function isXorFree(e) { if (!e) return true; if (e.t === 'xor') return false; return isXorFree(e.a) && isXorFree(e.b); }
  /* 1re forme : somme de produits dont chaque produit a toutes les variables une fois */
  function isCanon1(e, vars) {
    var sh = sopShape(e); if (!sh) return false;
    return sh.list.every(function (p) { var vs = []; var ok = true; (function f(x) { if (x.t === 'and') { f(x.a); f(x.b); } else { var v = x.t === 'v' ? x.n : x.a.n; if (vs.indexOf(v) >= 0) ok = false; vs.push(v); } })(p); return ok && vs.length === vars.length; });
  }
  function isCanon2(e, vars) {
    var fs = [];
    (function flat(x) { if (x.t === 'and') { flat(x.a); flat(x.b); } else fs.push(x.t === 'par' ? x.a : x); })(e);
    return fs.every(function (s) {
      var vs = [], ok = true;
      (function f(x) { if (x.t === 'or') { f(x.a); f(x.b); } else if (x.t === 'v' || (x.t === 'not' && x.a.t === 'v')) { var v = x.t === 'v' ? x.n : x.a.n; if (vs.indexOf(v) >= 0) ok = false; vs.push(v); } else ok = false; })(s);
      return ok && vs.length === vars.length;
    });
  }

  /* ================================================================== écriture */
  function esc(s) { return U.esc(String(s)); }
  /* source → HTML avec barres ; l'écriture de l'auteur est gardée */
  function ex(src) {
    var s = String(src), out = '', i = 0;
    function grab() {
      var c = s.charAt(i);
      if (c === '(') {
        var depth = 0, j = i;
        for (; j < s.length; j++) { if (s.charAt(j) === '(') depth++; else if (s.charAt(j) === ')') { depth--; if (!depth) break; } }
        var inner = s.slice(i + 1, j); i = j + 1;
        return ex(inner);
      }
      var m = /^[A-Za-z][0-9]*|^[01]/.exec(s.slice(i));
      if (m) { i += m[0].length; return name(m[0]); }
      if (c === '~') { i++; return '<span class="ov">' + grab() + '</span>'; }
      i++; return esc(c);
    }
    while (i < s.length) {
      var c = s.charAt(i);
      if (c === '~') { i++; out += '<span class="ov">' + grab() + '</span>'; }
      else if (c === '^') { out += '<span class="xo">⊕</span>'; i++; }
      else if (c === '.') { out += '.'; i++; }
      else if (c === ' ') { out += ' '; i++; }
      else if (/[A-Za-z]/.test(c)) { var m = /^[A-Za-z][0-9]*/.exec(s.slice(i)); out += name(m[0]); i += m[0].length; }
      else { out += esc(c); i++; }
    }
    return out;
  }
  function name(n) { return esc(n); }
  /* même chose dans un <text> SVG : barres en tspan (une seule hauteur de barre) */
  function exSVG(src) { return ex(src).replace(/<span class="xo">⊕<\/span>/g, '⊕').replace(/<span class="ov">/g, '<tspan text-decoration="overline">').replace(/<\/span>/g, '</tspan>'); }
  function exHTML(src, cls) { return '<span class="bx' + (cls ? ' ' + cls : '') + '">' + ex(src) + '</span>'; }

  /* ================================================================== outils : utilitaires */
  function head(title, right) { return '<div class="bench-head"><span class="bh-t">' + title + '</span>' + (right ? '<span class="bh-r">' + right + '</span>' : '') + '</div>'; }
  function cellsOf(o) {
    var vars = o.vars, n = vars.length, val = [];
    for (var k = 0; k < (1 << n); k++) val.push(0);
    if (o.expr) onesOf(o.expr, vars).forEach(function (k) { val[k] = 1; });
    (o.ones || []).forEach(function (k) { val[k] = 1; });
    (o.dc || []).forEach(function (k) { val[k] = 2; });
    return val;
  }
  /* indices de lignes et de colonnes du tableau : ordre de Gray sur les variables de ligne puis de colonne */
  function layout(vars, rows) {
    var rv = vars.slice(0, rows), cv = vars.slice(rows), rg = gray(rv.length), cg = gray(cv.length), n = vars.length;
    function idx(r, c) {
      var bits = (rg[r] + cg[c]).split(''), k = 0;
      for (var j = 0; j < n; j++) k = k * 2 + +bits[j];
      return k;
    }
    return { rv: rv, cv: cv, rg: rg, cg: cg, idx: idx, R: rg.length, C: cg.length };
  }
  var GC = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'];
  /* morceaux rectangulaires d'un groupe (un groupe qui passe par un bord est coupé en deux ou quatre) */
  function pieces(p, L) {
    var rows = [], cols = [];
    for (var r = 0; r < L.R; r++) for (var c = 0; c < L.C; c++) {
      var k = L.idx(r, c);
      if ((k & ~p.m) === p.v) { if (rows.indexOf(r) < 0) rows.push(r); if (cols.indexOf(c) < 0) cols.push(c); }
    }
    function segs(list, N) {
      list.sort(function (a, b) { return a - b; });
      if (list.length === N) return [[0, N - 1, 0]];
      var s = [], start = list[0], prev = list[0];
      for (var i = 1; i < list.length; i++) { if (list[i] !== prev + 1) { s.push([start, prev]); start = list[i]; } prev = list[i]; }
      s.push([start, prev]);
      if (s.length === 2 && s[0][0] === 0 && s[1][1] === N - 1) return [[s[1][0], s[1][1], 1], [s[0][0], s[0][1], 2]]; // 1 : ouvert à droite (bord), 2 : ouvert à gauche
      return s.map(function (x) { return [x[0], x[1], 0]; });
    }
    var out = [];
    segs(rows, L.R).forEach(function (rs) { segs(cols, L.C).forEach(function (cs) { out.push({ r0: rs[0], r1: rs[1], ro: rs[2], c0: cs[0], c1: cs[1], co: cs[2] }); }); });
    return out;
  }
  /* explication d'un groupe : chaque variable varie, vaut 0 ou vaut 1 */
  function explain(p, vars) {
    var n = vars.length, lines = [];
    vars.forEach(function (v, j) {
      var bit = 1 << (n - 1 - j);
      if (p.m & bit) lines.push(T('{v} varie : absente.', { v: v }));
      else if (p.v & bit) lines.push(T('{v} vaut toujours 1 : {x}.', { v: v, x: exHTML(v) }));
      else lines.push(T('{v} vaut toujours 0 : {x}.', { v: v, x: exHTML('~' + v) }));
    });
    return lines;
  }

  /* ================================================================== kmap */
  function kmap(el, o) {
    o = o || {};
    var vars = o.vars || ['A', 'B', 'C'], rows = o.rows != null ? o.rows : Math.floor(vars.length / 2), L = layout(vars, rows), n = vars.length;
    var want = cellsOf(o), mode = o.mode || 'show', name = o.name || 'S';
    var cur = mode === 'play' ? want.map(function () { return 0; }) : want.slice(), shown = mode === 'show' && o.circles !== false, wrong = [];
    el.classList.add('bench', 'km');
    function onesNow(v) { return v.reduce(function (a, x, i) { if (x === 1) a.push(i); return a; }, []); }
    function dcNow(v) { return v.reduce(function (a, x, i) { if (x === 2) a.push(i); return a; }, []); }
    function paint() {
      var vals = cur, impl = minimize(n, onesNow(vals), dcNow(vals));
      var cw = 46, ch = 36, ox = 46 + (L.rv.length ? 10 : 0), oy = 46, W = ox + L.C * cw + 14, H = oy + L.R * ch + 12;
      var svg = '<svg class="km-svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(T('Tableau de Karnaugh') + ' ' + name) + '">';
      svg += '<text class="km-v" x="' + (ox + L.C * cw / 2) + '" y="14" text-anchor="middle">' + esc(L.cv.join('')) + '</text>';
      if (L.rv.length) svg += '<text class="km-v" x="12" y="' + (oy + L.R * ch / 2 + 4) + '" text-anchor="middle">' + esc(L.rv.join('')) + '</text>';
      svg += '<text class="km-n" x="' + (ox - 20) + '" y="' + (oy - 12) + '" text-anchor="middle">' + esc(name) + '</text>';
      for (var c = 0; c < L.C; c++) svg += '<text class="km-g" x="' + (ox + c * cw + cw / 2) + '" y="' + (oy - 12) + '" text-anchor="middle">' + (L.cg[c] || '') + '</text>';
      for (var r = 0; r < L.R; r++) svg += '<text class="km-g" x="' + (ox - 20) + '" y="' + (oy + r * ch + ch / 2 + 4) + '" text-anchor="middle">' + (L.rg[r] || '') + '</text>';
      for (r = 0; r < L.R; r++) for (c = 0; c < L.C; c++) {
        var k = L.idx(r, c), v = vals[k], bad = wrong.indexOf(k) >= 0;
        svg += '<g class="km-cell' + (mode !== 'show' ? ' click' : '') + (bad ? ' bad' : '') + '" data-k="' + k + '"' + (mode !== 'show' ? ' tabindex="0" role="button" aria-label="' + esc(vars.map(function (vn, j) { return vn + '=' + ((k >> (n - 1 - j)) & 1); }).join(', ') + ' : ' + (v === 2 ? 'Φ' : v)) + '"' : '') + '>' +
          '<rect x="' + (ox + c * cw) + '" y="' + (oy + r * ch) + '" width="' + cw + '" height="' + ch + '"/>' +
          '<text x="' + (ox + c * cw + cw / 2) + '" y="' + (oy + r * ch + ch / 2 + 5) + '" text-anchor="middle" class="km-val v' + v + '">' + (v === 2 ? 'Φ' : v) + '</text>' +
          (o.num ? '<text x="' + (ox + c * cw + 4) + '" y="' + (oy + r * ch + 10) + '" class="km-k">' + k + '</text>' : '') + '</g>';
      }
      svg += '<rect class="km-frame" x="' + ox + '" y="' + oy + '" width="' + L.C * cw + '" height="' + L.R * ch + '"/>';
      if (shown) impl.forEach(function (p, gi) {
        pieces(p, L).forEach(function (q) {
          var x0 = ox + q.c0 * cw + 5 + gi % 3, y0 = oy + q.r0 * ch + 5 + gi % 3, x1 = ox + (q.c1 + 1) * cw - 5 - gi % 3, y1 = oy + (q.r1 + 1) * ch - 5 - gi % 3;
          if (q.co === 1) x1 += 9; if (q.co === 2) x0 -= 9; if (q.ro === 1) y1 += 9; if (q.ro === 2) y0 -= 9;
          svg += '<rect class="km-grp ' + GC[gi % GC.length] + '" x="' + x0 + '" y="' + y0 + '" width="' + (x1 - x0) + '" height="' + (y1 - y0) + '" rx="12"/>';
        });
      });
      svg += '</svg>';
      var out = '', ones = onesNow(vals);
      if (shown) {
        var e = !ones.length ? '0' : sop(impl, vars);
        out += '<p class="km-res">' + esc(name) + ' = ' + exHTML(e) + '</p>';
        if (o.xor) out += '<p class="km-res sm">' + T('Avec un OU exclusif') + ' : ' + esc(name) + ' = ' + exHTML(o.xor) + '</p>';
        if (o.steps !== false && impl.length) out += '<ol class="km-steps">' + impl.map(function (p, gi) {
          var nb = 1 << bitcount(p.m);
          return '<li><span class="km-sw ' + GC[gi % GC.length] + '" aria-hidden="true"></span><b>' + T('cercle {i}', { i: gi + 1 }) + '</b> (' + nb + ' ' + (nb > 1 ? T('cases') : T('case')) + ') : ' + explain(p, vars).join(' ') + ' ' + T('Le produit est {p}.', { p: exHTML(term(p, vars)) }) + '</li>';
        }).join('') + '</ol>';
        if (!ones.length) out += '<p class="muted">' + T('Pas de 1 : la sortie vaut toujours 0.') + '</p>';
      }
      var tools = '';
      if (mode === 'play') tools = '<p class="km-hint muted">' + T('Clique sur une case : 0, puis 1, puis Φ (indéfinie).') + '</p><div class="row"><button type="button" class="btn" data-a="check">' + T('Vérifier le tableau') + '</button><button type="button" class="btn ghost" data-a="sol">' + T('Solution') + '</button><button type="button" class="btn ghost" data-a="clear">' + T('Effacer') + '</button></div>';
      if (mode === 'free') tools = '<p class="km-hint muted">' + T('Clique sur une case : 0, puis 1, puis Φ (indéfinie).') + '</p><div class="row"><button type="button" class="btn ghost" data-a="clear">' + T('Effacer') + '</button></div>';
      el.innerHTML = head(esc(o.title || T('Tableau de Karnaugh')), esc(vars.join(', '))) + '<div class="bench-body"><div class="km-wrap">' + svg + '</div>' + '<div class="km-msg" aria-live="polite"></div>' + out + tools + '</div>';
      U.$$('.km-cell.click', el).forEach(function (g) {
        function bump() { var k = +g.getAttribute('data-k'); cur[k] = (cur[k] + 1) % 3; wrong = []; if (mode === 'free') shown = true; paint(); var f = el.querySelector('.km-cell[data-k="' + k + '"]'); if (f) f.focus(); }
        g.addEventListener('click', bump);
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bump(); } });
      });
      U.$$('[data-a]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var a = b.getAttribute('data-a');
          if (a === 'clear') { cur = cur.map(function () { return 0; }); wrong = []; shown = mode === 'free' ? true : false; paint(); return; }
          if (a === 'sol') { cur = want.slice(); wrong = []; shown = true; paint(); return; }
          if (a === 'check') {
            wrong = []; cur.forEach(function (v, k) { if (v !== want[k]) wrong.push(k); });
            if (!wrong.length) shown = true;
            paint();
            el.querySelector('.km-msg').innerHTML = wrong.length ? '<p class="km-bad">' + T('{n} case(s) fausse(s), entourée(s) en rouge.', { n: wrong.length }) + '</p>' : '<p class="km-ok">' + T('Le tableau est juste.') + '</p>';
          }
        });
      });
    }
    if (mode === 'free') shown = true;
    paint();
  }

  /* ================================================================== table de vérité */
  function truthHTML(o) {
    var vars = o.vars, n = vars.length, exprs = o.exprs || [], names = o.names || exprs, cols = o.cols || {}, hl = o.hl || [];
    var heads = vars.map(function (v) { return '<th>' + esc(v) + '</th>'; }).join('') +
      exprs.map(function (e, i) { return '<th class="out">' + (o.raw ? exHTML(names[i]) : esc(names[i])) + '</th>'; }).join('') +
      Object.keys(cols).map(function (k) { return '<th class="out">' + esc(k) + '</th>'; }).join('');
    var tabs = exprs.map(function (e) { return table(e, vars); }), body = '';
    for (var k = 0; k < (1 << n); k++) {
      body += '<tr' + (hl.indexOf(k) >= 0 ? ' class="hl"' : '') + '>' + vars.map(function (v, j) { return '<td>' + ((k >> (n - 1 - j)) & 1) + '</td>'; }).join('') +
        tabs.map(function (t) { return '<td class="out v' + t[k] + '">' + t[k] + '</td>'; }).join('') +
        Object.keys(cols).map(function (c) { var v = cols[c][k]; return '<td class="out v' + (v === 'x' || v === 2 ? 2 : v) + '">' + (v === 'x' || v === 2 ? 'Φ' : v) + '</td>'; }).join('') + '</tr>';
    }
    return '<div class="tv-wrap"><table class="tv"><thead><tr>' + heads + '</tr></thead><tbody>' + body + '</tbody></table></div>';
  }
  function truth(el, o) { el.classList.add('tv-host'); el.innerHTML = (o.title ? '<p class="tv-cap">' + esc(o.title) + '</p>' : '') + truthHTML(o); }

  /* ================================================================== symboles de portes (SVG) */
  /* corps d'une porte à forme distincte, entrées à gauche (x), sortie à droite ; h : hauteur ; renvoie le chemin et
     les points d'entrée / de sortie. type de base : and, or, xor, not, buf. */
  function gateShape(type, x, y, h, nIn) {
    var w = type === 'not' || type === 'buf' ? h * .9 : h * 1.25, p = '', pins = [], outx;
    var ys = []; for (var i = 0; i < nIn; i++) ys.push(y + h * (i + 1) / (nIn + 1));
    if (type === 'and') {
      p = 'M' + x + ' ' + y + 'H' + (x + w - h / 2) + 'A' + h / 2 + ' ' + h / 2 + ' 0 0 1 ' + (x + w - h / 2) + ' ' + (y + h) + 'H' + x + 'Z';
      outx = x + w; ys.forEach(function (yy) { pins.push([x, yy]); });
    } else if (type === 'or' || type === 'xor') {
      var k = h * .28;
      p = 'M' + x + ' ' + y + 'Q' + (x + w * .62) + ' ' + y + ' ' + (x + w) + ' ' + (y + h / 2) + 'Q' + (x + w * .62) + ' ' + (y + h) + ' ' + x + ' ' + (y + h) + 'Q' + (x + k) + ' ' + (y + h / 2) + ' ' + x + ' ' + y + 'Z';
      if (type === 'xor') p += 'M' + (x - 7) + ' ' + y + 'Q' + (x - 7 + k) + ' ' + (y + h / 2) + ' ' + (x - 7) + ' ' + (y + h);
      outx = x + w;
      ys.forEach(function (yy) { var t = (yy - y) / h, bow = 2 * k * t * (1 - t); pins.push([x + bow - (type === 'xor' ? 7 : 0), yy]); });
    } else {
      p = 'M' + x + ' ' + y + 'L' + (x + w) + ' ' + (y + h / 2) + 'L' + x + ' ' + (y + h) + 'Z';
      outx = x + w; pins.push([x, y + h / 2]);
    }
    return { d: p, pins: pins, out: [outx, y + h / 2], w: w };
  }
  var BASE = { and: 'and', nand: 'and', or: 'or', nor: 'or', xor: 'xor', xnor: 'xor', not: 'not', buf: 'buf' };
  var NEG = { nand: 1, nor: 1, xnor: 1, not: 1 };
  function gateOut(type, ins) {
    var b = BASE[type], v;
    if (b === 'and') v = ins.every(function (x) { return x; }) ? 1 : 0;
    else if (b === 'or') v = ins.some(function (x) { return x; }) ? 1 : 0;
    else if (b === 'xor') v = ins.reduce(function (a, x) { return a ^ x; }, 0);
    else v = ins[0];
    return NEG[type] ? 1 - v : v;
  }
  /* dessin d'une porte : bulles d'entrée inv[i], bulle de sortie selon le type (ou neg) */
  function gateSVG(g, vals) {
    var nIn = BASE[g.type] === 'not' || BASE[g.type] === 'buf' ? 1 : (g.n || (g.in ? g.in.length : 2)), h = g.h || (nIn > 2 ? 18 * nIn : 40);
    var s = gateShape(BASE[g.type], g.x, g.y, h, nIn), inv = g.inv || [], negOut = g.neg != null ? g.neg : !!NEG[g.type];
    var h2 = '<path class="gt" d="' + s.d + '"/>';
    var pins = s.pins.map(function (pt, i) {
      if (inv[i]) { h2 += '<circle class="gt bub" cx="' + (pt[0] - 4) + '" cy="' + pt[1] + '" r="4"/>'; return [pt[0] - 8, pt[1]]; }
      return pt;
    });
    var out = s.out.slice();
    if (negOut) { h2 += '<circle class="gt bub" cx="' + (out[0] + 4) + '" cy="' + out[1] + '" r="4"/>'; out[0] += 8; }
    return { svg: h2, pins: pins, out: out, h: h, w: s.w };
  }

  /* ================================================================== gate : une porte cliquable */
  var NAMES = { not: 'NON', and: 'ET', nand: 'NON-ET', or: 'OU', nor: 'NON-OU', xor: 'OU EXCLUSIF', xnor: 'NON-OU EXCLUSIF', buf: 'OUI' };
  var NAMES_EN = { not: 'NOT', and: 'AND', nand: 'NAND', or: 'OR', nor: 'NOR', xor: 'XOR', xnor: 'XNOR', buf: 'BUFFER' };
  var RECT = { and: '&', nand: '&', or: '≥1', nor: '≥1', xor: '=1', xnor: '=1', not: '1', buf: '1' };
  function gate(el, o) {
    var type = o.type || 'and', n = BASE[type] === 'not' || BASE[type] === 'buf' ? 1 : (o.n || 2), inv = o.inv || [], names = o.names || ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, n);
    var vals = names.map(function () { return 0; });
    el.classList.add('bench', 'gate');
    function eff(i) { return inv[i] ? 1 - vals[i] : vals[i]; }
    function paint() {
      var outv = gateOut(type, names.map(function (x, i) { return eff(i); }));
      if (o.neg != null && o.neg !== !!NEG[type]) outv = 1 - outv;
      /* entrées espacées de 32 px à gauche, fils coudés jusqu'aux broches de la porte */
      var step = 32, top = 14, insH = (n - 1) * step, gh = n > 2 ? 18 * n : 40, gy = top + insH / 2 - gh / 2 + 4;
      if (gy < 8) { top += 8 - gy; gy = 8; }
      var g = gateSVG({ type: type, x: 104, y: gy, n: n, inv: inv, neg: o.neg, h: gh }), W = g.out[0] + 70, H = Math.max(top + insH + 30, gy + gh + 16);
      var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" class="gate-svg" role="img" aria-label="' + esc((EN ? NAMES_EN : NAMES)[type]) + '">' + g.svg;
      g.pins.forEach(function (pt, i) {
        var yy = top + i * step, mx = 66 + (n > 1 ? (i < n / 2 ? i : n - 1 - i) * 6 : 0);
        svg += '<polyline class="w lv' + vals[i] + '" points="32,' + yy + ' ' + mx + ',' + yy + ' ' + mx + ',' + pt[1] + ' ' + pt[0] + ',' + pt[1] + '"/>' +
          '<g class="pin" data-i="' + i + '" tabindex="0" role="switch" aria-checked="' + (vals[i] ? 'true' : 'false') + '" aria-label="' + esc(names[i]) + '"><rect x="4" y="' + (yy - 11) + '" width="28" height="22" rx="5" class="pin-b lv' + vals[i] + '"/>' +
          '<text x="18" y="' + (yy + 5) + '" text-anchor="middle">' + vals[i] + '</text></g>' +
          '<text class="pin-n" x="38" y="' + (yy - 5) + '">' + esc(names[i]) + '</text>';
      });
      svg += '<line class="w lv' + outv + '" x1="' + g.out[0] + '" y1="' + g.out[1] + '" x2="' + (W - 30) + '" y2="' + g.out[1] + '"/>' +
        '<circle class="led lv' + outv + '" cx="' + (W - 18) + '" cy="' + g.out[1] + '" r="11"/><text class="led-t" x="' + (W - 18) + '" y="' + (g.out[1] + 5) + '" text-anchor="middle">' + outv + '</text></svg>';
      var rect = '';
      if (o.rect) {
        rect = '<figure class="rect-sym"><svg viewBox="0 0 120 70" width="120" height="70" aria-hidden="true"><rect class="gt" x="35" y="8" width="44" height="54"/><text x="57" y="40" text-anchor="middle" class="rect-t">' + esc(RECT[type]) + '</text>' +
          names.map(function (x, i) { var yy = 8 + 54 * (i + 1) / (n + 1); return '<line class="w" x1="10" y1="' + yy + '" x2="35" y2="' + yy + '"/><text x="6" y="' + (yy + 4) + '" class="pin-n" text-anchor="end">' + esc(x) + '</text>'; }).join('') +
          (NEG[type] ? '<circle class="gt bub" cx="83" cy="35" r="4"/><line class="w" x1="87" y1="35" x2="108" y2="35"/>' : '<line class="w" x1="79" y1="35" x2="108" y2="35"/>') + '</svg><figcaption>' + T('Symbole à forme rectangulaire') + '</figcaption></figure>';
      }
      var expr = o.expr ? '<p class="gate-eq">' + exHTML(o.expr) + '</p>' : '';
      var tt = o.table !== false ? truthHTML({ vars: names, cols: (function () { var c = {}, col = []; for (var k = 0; k < (1 << n); k++) { var vv = names.map(function (x, j) { var b = (k >> (n - 1 - j)) & 1; return inv[j] ? 1 - b : b; }); var ov = gateOut(type, vv); if (o.neg != null && o.neg !== !!NEG[type]) ov = 1 - ov; col.push(ov); } c[o.out || 'X'] = col; return c; })(), hl: [vals.reduce(function (a, v) { return a * 2 + v; }, 0)] }) : '';
      el.innerHTML = head(esc(o.title || (EN ? NAMES_EN : NAMES)[type]), T('Clique sur une entrée pour la basculer.')) + '<div class="bench-body gate-body"><figure class="gate-fig">' + svg + '<figcaption>' + T('Symbole à forme distincte') + '</figcaption></figure>' + rect + '<div class="gate-side">' + expr + tt + '</div></div>';
      U.$$('.pin', el).forEach(function (p) {
        function tog() { var i = +p.getAttribute('data-i'); vals[i] = 1 - vals[i]; paint(); var f = el.querySelector('.pin[data-i="' + i + '"]'); if (f) f.focus(); }
        p.addEventListener('click', tog);
        p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      });
    }
    paint();
  }

  /* ================================================================== schema : schéma de portes */
  /* inputs : [{ id, x, label }] — bus verticaux descendant depuis le haut ; gates : [{ id, type, x, y, in: [...],
     inv, neg, n }] ; outputs : [{ from, label, x }] ; une entrée de porte reliée à un bus : trait horizontal depuis
     le bus avec un point de jonction ; reliée à une porte : trait horizontal, vertical, horizontal (milieu : mx). */
  function schema(el, o) {
    var W = o.w || 520, H = o.h || 260, live = !!o.live, ins = o.inputs || [], gates = o.gates || [], outs = o.outputs || [];
    var vals = {}; ins.forEach(function (p) { vals[p.id] = p.v || 0; });
    el.classList.add('bench', 'sch');
    function compute() {
      var v = {}; ins.forEach(function (p) { v[p.id] = vals[p.id]; });
      for (var pass = 0; pass < gates.length + 1; pass++) gates.forEach(function (g) {
        var iv = (g.in || []).map(function (s, i) { var x = v[s]; if (x === undefined) return undefined; return (g.inv || [])[i] ? 1 - x : x; });
        if (iv.some(function (x) { return x === undefined; })) return;
        var o2 = gateOut(g.type, iv); if (g.neg != null && g.neg !== !!NEG[g.type]) o2 = 1 - o2; v[g.id] = o2;
      });
      return v;
    }
    function paint() {
      var v = live ? compute() : {}, drawn = {}, svg = '', wires = '';
      gates.forEach(function (g) { drawn[g.id] = gateSVG({ type: g.type, x: g.x, y: g.y, n: g.n || (g.in || []).length, inv: g.inv, neg: g.neg, h: g.h }); });
      var top = 22, busBottom = H - 10;
      ins.forEach(function (p) {
        wires += '<line class="w' + (live ? ' lv' + v[p.id] : '') + '" x1="' + p.x + '" y1="' + top + '" x2="' + p.x + '" y2="' + (p.y2 || busBottom) + '"/>';
        svg += live ? '<g class="pin" data-id="' + esc(p.id) + '" tabindex="0" role="switch" aria-checked="' + (vals[p.id] ? 'true' : 'false') + '" aria-label="' + esc(p.label || p.id) + '"><rect x="' + (p.x - 13) + '" y="0" width="26" height="20" rx="5" class="pin-b lv' + vals[p.id] + '"/><text x="' + p.x + '" y="14" text-anchor="middle">' + esc(p.label || p.id) + '</text></g>'
          : '<text class="pin-n" x="' + p.x + '" y="14" text-anchor="middle">' + esc(p.label || p.id) + '</text>';
      });
      gates.forEach(function (g) {
        var d = drawn[g.id];
        (g.in || []).forEach(function (src, i) {
          var pt = d.pins[i], lv = live && typeof src === 'string' ? ' lv' + v[src] : '';
          var bus = ins.filter(function (p) { return p.id === src; })[0];
          if (src && typeof src === 'object') wires += '<line class="w" x1="' + src.x + '" y1="' + pt[1] + '" x2="' + pt[0] + '" y2="' + pt[1] + '"/>';
          else if (bus) wires += '<line class="w' + lv + '" x1="' + bus.x + '" y1="' + pt[1] + '" x2="' + pt[0] + '" y2="' + pt[1] + '"/><circle class="jn' + lv + '" cx="' + bus.x + '" cy="' + pt[1] + '" r="2.6"/>';
          else if (drawn[src]) {
            var s = drawn[src].out, mx = (g.mx && g.mx[i]) || (s[0] + pt[0]) / 2;
            wires += '<polyline class="w' + lv + '" points="' + s[0] + ',' + s[1] + ' ' + mx + ',' + s[1] + ' ' + mx + ',' + pt[1] + ' ' + pt[0] + ',' + pt[1] + '"/>';
          }
        });
        svg += '<g class="gate-g">' + d.svg + '</g>';
        if (g.label) svg += '<text class="g-lab" x="' + (d.out[0] + 4) + '" y="' + (d.out[1] - 8) + '">' + exSVG(g.label) + '</text>';
      });
      outs.forEach(function (op) {
        var d = drawn[op.from]; if (!d) return;
        var x2 = op.x || W - 60, lv = live ? ' lv' + v[op.from] : '';
        wires += '<line class="w' + lv + '" x1="' + d.out[0] + '" y1="' + d.out[1] + '" x2="' + x2 + '" y2="' + d.out[1] + '"/>';
        svg += (live ? '<circle class="led' + lv + '" cx="' + (x2 + 12) + '" cy="' + d.out[1] + '" r="10"/><text class="led-t" x="' + (x2 + 12) + '" y="' + (d.out[1] + 4) + '" text-anchor="middle">' + v[op.from] + '</text>' : '') +
          '<text class="o-lab" x="' + (x2 + (live ? 28 : 4)) + '" y="' + (d.out[1] + 4) + '">' + exSVG(op.label || 'S') + '</text>';
      });
      (o.labels || []).forEach(function (lb) { svg += '<text class="g-lab" x="' + lb.x + '" y="' + lb.y + '">' + exSVG(lb.t) + '</text>'; });
      el.innerHTML = (o.title ? head(esc(o.title), live ? T('Clique sur une entrée pour la basculer.') : '') : '') + '<div class="bench-body"><div class="sch-wrap"><svg class="sch-svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(o.alt || o.title || 'schéma') + '">' + wires + svg + '</svg></div>' + (o.caption ? '<p class="sch-cap">' + o.caption + '</p>' : '') + '</div>';
      U.$$('.pin', el).forEach(function (p) {
        function tog() { var id = p.getAttribute('data-id'); vals[id] = 1 - vals[id]; paint(); var f = el.querySelector('.pin[data-id="' + id + '"]'); if (f) f.focus(); }
        p.addEventListener('click', tog);
        p.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(); } });
      });
    }
    paint();
  }

  /* ================================================================== check : réponse vérifiée */
  /* saisie de l'élève → source du moteur : A' → ~A, /A et !A → ~A, juxtaposition de lettres seules → ET */
  function normalize(s, vars) {
    s = String(s).replace(/[¬!/]/g, '~').replace(/[·×*∙]/g, '.').replace(/⊕/g, '^').replace(/’/g, "'").replace(/\bxor\b/gi, '^');
    var single = vars.every(function (v) { return v.length === 1; });
    if (single) {
      /* ET implicite : deux opérandes collés (lettre, ')' ou "'" suivis de lettre, '(' ou '~') */
      s = s.replace(/\s+/g, ' ');
      var out = '', prev = '';
      for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (c === ' ') continue;
        if (/[A-Za-z(~01]/.test(c) && /[A-Za-z)'01]/.test(prev)) out += '.';
        out += c; prev = c;
      }
      s = out;
    }
    return s;
  }
  function check(el, o) {
    /* référence : une expression (ref) ou des numéros (ones, dc : cases indéfinies, où toute valeur est acceptée) */
    var vars = o.vars || varsOf(o.ref), kind = o.kind || 'min', refOnes = o.ones || onesOf(o.ref, vars), dc = o.dc || [];
    var best = minimize(vars.length, refOnes, dc), bestSh = sopShape(parse(sop(best, vars)));
    el.classList.add('bench', 'chk');
    el.innerHTML = head(esc(o.title || T('Ta réponse')), '') + '<div class="bench-body"><label class="chk-l">' + (o.label ? exHTML(o.label) + ' = ' : '') +
      '<input type="text" class="chk-in" autocomplete="off" spellcheck="false" autocapitalize="characters" placeholder="' + esc(o.placeholder || 'A.~B + C') + '" aria-label="' + esc(T('Ta réponse')) + '"></label>' +
      '<p class="chk-pre" aria-hidden="true"></p><p class="muted chk-help">' + T('Écris ton expression : ~A ou A’ pour A barre, . pour ET, + pour OU, ^ pour OU exclusif.') + '</p>' +
      '<div class="row"><button type="button" class="btn" data-a="go">' + T('Vérifier') + '</button><button type="button" class="btn ghost" data-a="sol">' + T('Voir la réponse') + '</button></div><div class="chk-msg" aria-live="polite"></div></div>';
    var inp = el.querySelector('.chk-in'), pre = el.querySelector('.chk-pre'), msg = el.querySelector('.chk-msg');
    function cur() { return normalize(inp.value, vars); }
    inp.addEventListener('input', function () { try { parse(cur()); pre.innerHTML = exHTML(cur()); } catch (e) { pre.textContent = ''; } });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } });
    function line(k) { return vars.map(function (v, j) { return v + ' = ' + ((k >> (vars.length - 1 - j)) & 1); }).join(', '); }
    function go() {
      var s = cur(), e;
      try { e = parse(s); } catch (x) { msg.innerHTML = '<p class="km-bad">' + T('Je ne comprends pas cette expression.') + '</p>'; return; }
      var unk = varsAst(e).filter(function (v) { return vars.indexOf(v) < 0; });
      if (unk.length) { msg.innerHTML = '<p class="km-bad">' + T('Variable inconnue : {v}.', { v: esc(unk[0]) }) + '</p>'; return; }
      var t = table(e, vars), diff = -1;
      for (var k = 0; k < t.length; k++) if (dc.indexOf(k) < 0 && t[k] !== (refOnes.indexOf(k) >= 0 ? 1 : 0)) { diff = k; break; }
      if (diff >= 0) { msg.innerHTML = '<p class="km-bad">' + T('Fausse : elle diffère pour {l}.', { l: esc(line(diff)) }) + '</p>'; return; }
      if (kind === 'canon1' && !isCanon1(e, vars)) { msg.innerHTML = '<p class="km-warn">' + T('Équivalente, mais ce n’est pas une somme de mintermes (chaque produit doit contenir toutes les variables, une seule fois chacun).') + '</p>'; return; }
      if (kind === 'canon2' && !isCanon2(e, vars)) { msg.innerHTML = '<p class="km-warn">' + T('Équivalente, mais ce n’est pas un produit de maxtermes (chaque somme doit contenir toutes les variables, une seule fois chacune).') + '</p>'; return; }
      if ((kind === 'min' || kind === 'nopar') && hasPar(e)) { msg.innerHTML = '<p class="km-warn">' + T('Équivalente, mais il reste des parenthèses : le sujet les interdit.') + '</p>'; return; }
      if (kind === 'min') {
        var sh = sopShape(e);
        if (sh && bestSh && (sh.terms > bestSh.terms || (sh.terms === bestSh.terms && sh.lits > bestSh.lits))) {
          msg.innerHTML = '<p class="km-warn">' + T('Équivalente, mais pas la plus simple : {a} termes et {b} littéraux, la plus simple en a {c} et {d}.', { a: sh.terms, b: sh.lits, c: bestSh.terms, d: bestSh.lits }) + '</p>'; return;
        }
        if (!sh && isXorFree(e)) { msg.innerHTML = '<p class="km-ok">' + T('Juste.') + '</p>'; return; }
        msg.innerHTML = '<p class="km-ok">' + T('Juste et la plus simple possible.') + '</p>'; return;
      }
      msg.innerHTML = '<p class="km-ok">' + T('Juste.') + '</p>';
    }
    el.querySelector('[data-a="go"]').addEventListener('click', go);
    el.querySelector('[data-a="sol"]').addEventListener('click', function () {
      var r = o.answer || (kind === 'canon1' ? canon1(refOnes, vars) : kind === 'canon2' ? canon2(refOnes, vars) : sop(best, vars));
      msg.innerHTML = '<p>' + T('Réponse : {r}', { r: exHTML(r) }) + '</p>';
    });
  }

  /* ================================================================== simplifier : expression libre */
  function simplifier(el, o) {
    el.classList.add('bench', 'simp');
    el.innerHTML = head(T('Simplificateur'), '') + '<div class="bench-body"><label class="chk-l">' + T('Ton expression') + ' <input type="text" class="chk-in" autocomplete="off" spellcheck="false" value="' + esc(o.value || '') + '"></label><p class="muted chk-help">' + T('Écris ton expression : ~A ou A’ pour A barre, . pour ET, + pour OU, ^ pour OU exclusif.') + '</p><div class="simp-out" aria-live="polite"></div></div>';
    var inp = el.querySelector('input'), out = el.querySelector('.simp-out');
    function run() {
      var s = inp.value, vars, e;
      try { vars = varsOf(normalize(s, ['A'])); s = normalize(s, vars); e = parse(s); } catch (x) { out.innerHTML = s ? '<p class="km-bad">' + T('Je ne comprends pas cette expression.') + '</p>' : ''; return; }
      if (vars.length > 5) { out.innerHTML = '<p class="km-bad">5 max.</p>'; return; }
      var ones = onesOf(e, vars), zeros = []; for (var k = 0; k < (1 << vars.length); k++) if (ones.indexOf(k) < 0) zeros.push(k);
      out.innerHTML = '<p class="simp-src">' + exHTML(s) + '</p>' +
        '<dl class="simp-dl"><dt>' + T('Forme la plus simple (somme de produits)') + '</dt><dd>' + exHTML(sop(minimize(vars.length, ones), vars)) + '</dd>' +
        '<dt>' + T('Première forme canonique') + ' <span class="muted">(' + T('mintermes : {l}', { l: ones.join(', ') || '—' }) + ')</span></dt><dd>' + exHTML(canon1(ones, vars)) + '</dd>' +
        '<dt>' + T('Seconde forme canonique') + ' <span class="muted">(' + T('maxtermes : {l}', { l: zeros.join(', ') || '—' }) + ')</span></dt><dd>' + exHTML(canon2(ones, vars)) + '</dd></dl>' +
        (vars.length <= 4 ? truthHTML({ vars: vars, exprs: [s], names: ['S'] }) : '');
    }
    inp.addEventListener('input', run); run();
  }

  /* ================================================================== block : circuits combinatoires */
  function bitsUI(id, n, vals, label) {
    var h = '<span class="blk-in"><span class="blk-l">' + label + '</span>';
    for (var j = n - 1; j >= 0; j--) h += '<button type="button" class="bit lv' + vals[j] + '" data-g="' + id + '" data-j="' + j + '" aria-pressed="' + (vals[j] ? 'true' : 'false') + '" aria-label="' + label + j + '">' + vals[j] + '</button>';
    return h + '</span>';
  }
  function num(v) { return v.reduce(function (a, b, j) { return a + (b << j); }, 0); }
  function block(el, o) {
    var kind = o.kind || 'decoder', n = o.n || (kind === 'adder' || kind === 'comparator' ? 4 : kind === 'half' ? 1 : 3);
    var A = [], B = [], S = [], Dv = [], st = { cin: 0, d: 1 };
    for (var j = 0; j < 8; j++) { A.push(0); B.push(0); S.push(0); Dv.push(0); }
    el.classList.add('bench', 'blk');
    function title() {
      return kind === 'decoder' ? T('Décodeur 1 parmi {n}', { n: 1 << n }) : kind === 'mux' ? T('Multiplexeur {n} vers 1', { n: 1 << n }) : kind === 'demux' ? T('Démultiplexeur 1 vers {n}', { n: 1 << n })
        : kind === 'adder' ? T('Additionneur {n} bits', { n: n }) : kind === 'half' ? T('Demi-additionneur') : T('Comparateur {n} bits', { n: n });
    }
    function paint() {
      var body = '', outs = '';
      if (kind === 'decoder') {
        var k = num(A.slice(0, n));
        body = bitsUI('A', n, A, 'A');
        for (var q = 0; q < (1 << n); q++) outs += '<span class="q lv' + (q === k ? 1 : 0) + '">Q' + q + ' = ' + (q === k ? 1 : 0) + '</span>';
        outs += '<p class="blk-say">' + T('La sortie Q{k} est à 1 : le nombre {k} est sur les entrées.', { k: k }) + '</p>';
      } else if (kind === 'mux') {
        var s = num(S.slice(0, n));
        body = bitsUI('S', n, S, 'S') + bitsUI('D', 1 << n, Dv, 'D');
        outs = '<span class="q lv' + Dv[s] + '">Q = D' + s + ' = ' + Dv[s] + '</span><p class="blk-say">' + T('Q recopie D{k} (sélection {k}).', { k: s }) + '</p>';
      } else if (kind === 'demux') {
        var s2 = num(S.slice(0, n));
        body = bitsUI('S', n, S, 'S') + '<span class="blk-in"><span class="blk-l">D</span><button type="button" class="bit lv' + st.d + '" data-g="d" data-j="0" aria-pressed="' + (st.d ? 'true' : 'false') + '">' + st.d + '</button></span>';
        for (var q2 = 0; q2 < (1 << n); q2++) { var v = q2 === s2 ? st.d : 0; outs += '<span class="q lv' + v + '">Q' + q2 + ' = ' + v + '</span>'; }
        outs += '<p class="blk-say">' + T('D est recopiée sur Q{k} (sélection {k}) ; les autres sorties valent 0.', { k: s2 }) + '</p>';
      } else if (kind === 'adder' || kind === 'half') {
        var a = num(A.slice(0, n)), b = num(B.slice(0, n)), sum = a + b + (kind === 'adder' ? st.cin : 0), sb = '';
        body = bitsUI('A', n, A, 'A') + bitsUI('B', n, B, 'B') + (kind === 'adder' ? '<span class="blk-in"><span class="blk-l">Cin</span><button type="button" class="bit lv' + st.cin + '" data-g="cin" data-j="0">' + st.cin + '</button></span>' : '');
        for (var j2 = n - 1; j2 >= 0; j2--) sb += (sum >> j2) & 1;
        outs = '<span class="q lv' + ((sum >> n) & 1) + '">' + (kind === 'half' ? 'R' : 'Cout') + ' = ' + ((sum >> n) & 1) + '</span><span class="q">S = ' + sb + '</span><p class="blk-say">' + a + ' + ' + b + (kind === 'adder' ? ' + ' + st.cin : '') + ' = ' + sum + '</p>';
      } else {
        var a2 = num(A.slice(0, n)), b2 = num(B.slice(0, n));
        body = bitsUI('A', n, A, 'A') + bitsUI('B', n, B, 'B');
        outs = '<span class="q lv' + (a2 > b2 ? 1 : 0) + '">A &gt; B = ' + (a2 > b2 ? 1 : 0) + '</span><span class="q lv' + (a2 === b2 ? 1 : 0) + '">A = B = ' + (a2 === b2 ? 1 : 0) + '</span><span class="q lv' + (a2 < b2 ? 1 : 0) + '">A &lt; B = ' + (a2 < b2 ? 1 : 0) + '</span><p class="blk-say">A = ' + a2 + ', B = ' + b2 + '</p>';
      }
      el.innerHTML = head(esc(o.title || title()), T('Clique sur les bits.')) + '<div class="bench-body"><div class="blk-ins">' + body + '</div><div class="blk-outs" aria-live="polite">' + outs + '</div></div>';
      U.$$('.bit', el).forEach(function (bt) {
        bt.addEventListener('click', function () {
          var g = bt.getAttribute('data-g'), j3 = +bt.getAttribute('data-j');
          if (g === 'A') A[j3] ^= 1; else if (g === 'B') B[j3] ^= 1; else if (g === 'S') S[j3] ^= 1; else if (g === 'D') Dv[j3] ^= 1; else if (g === 'cin') st.cin ^= 1; else if (g === 'd') st.d ^= 1;
          paint(); var f = el.querySelector('.bit[data-g="' + g + '"][data-j="' + j3 + '"]'); if (f) f.focus();
        });
      });
    }
    paint();
  }

  /* ================================================================== montage */
  var MOUNT = { kmap: kmap, truth: truth, gate: gate, schema: schema, check: check, simplifier: simplifier, block: block };
  function mount(root) {
    if (!root || root.nodeType !== 1) return;
    function all(sel) { var l = U.$$(sel, root); if (root.matches && root.matches(sel)) l.unshift(root); return l; }
    all('.bx:not([data-bx])').forEach(function (s) { s.setAttribute('data-bx', '1'); s.innerHTML = ex(s.textContent); });
    all('[data-boole]').forEach(function (el) {
      if (el.getAttribute('data-boole-done')) return;
      var f = MOUNT[el.getAttribute('data-boole')], op = {};
      if (!f) return;
      el.setAttribute('data-boole-done', '1');
      try { op = JSON.parse(el.getAttribute('data-opts') || '{}'); } catch (e) { op = {}; }
      try { f(el, op); } catch (e) { el.innerHTML = '<p class="km-bad">' + esc(T('Outil indisponible : {m}', { m: e.message })) + '</p>'; }
    });
    all('.plate[data-n]').forEach(function (s) { if (s.getAttribute('data-p')) return; s.setAttribute('data-p', '1'); s.setAttribute('aria-hidden', 'true'); s.textContent = 'U' + s.getAttribute('data-n'); });
  }
  function init() {
    mount(document.body);
    if (window.MutationObserver) new MutationObserver(function (list) {
      for (var a = 0; a < list.length; a++) for (var b = 0; b < list[a].addedNodes.length; b++) {
        var nd = list[a].addedNodes[b];
        if (nd.nodeType === 1 && (nd.hasAttribute('data-boole') || (nd.classList && nd.classList.contains('bx')) || (nd.querySelector && nd.querySelector('[data-boole],.bx,.plate[data-n]')))) mount(nd);
      }
    }).observe(document.body, { childList: true, subtree: true });
    var links = U.$$('.toc a[href^="#"]'), secs = U.$$('.sec[id]');
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1)), bt = sec && sec.querySelector('[data-done]');
      if (bt) { a.setAttribute('data-toc-key', bt.getAttribute('data-done')); a.classList.toggle('done', R.progress.isRead(bt.getAttribute('data-done'))); }
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
      var ids = R.quiz ? R.quiz.bank().filter(function (x) { return x.ref === ref; }).slice(0, n).map(function (x) { return x.id; }) : [];
      if (ids.length) R.quiz.mountCheck(el, ids, el.getAttribute('data-title')); else el.hidden = true;
    });
    R.wireDoneButtons();
  }
  if (typeof document !== 'undefined' && document.addEventListener && document.querySelectorAll) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  }

  R.boole = {
    parse: parse, evalAst: ev, varsOf: varsOf, table: table, onesOf: onesOf, equiv: equiv, minimize: minimize, sop: sop, term: term,
    canon1: canon1, canon2: canon2, simplify: simplify, gray: gray, normalize: normalize, sopShape: sopShape, hasPar: hasPar,
    ex: ex, exHTML: exHTML, truthHTML: truthHTML, gateSVG: gateSVG,
    kmap: kmap, truth: truth, gate: gate, schema: schema, check: check, simplifier: simplifier, block: block, mount: mount
  };
})();
