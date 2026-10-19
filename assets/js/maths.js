/* Maths (OBM · DP) — comportements communs des pages, calcul exact et outils pas à pas.
   Chargé après core.js, mathrender.js (formules KaTeX) et, s'il y a des QCM, qcm-engine.js et la banque.

   PAGES
   Numéros de parties : <span class="pn" data-n="3"></span> (le chiffre entouré au stylo rouge). Sommaire actif
   (.toc a[href^="#"] + .sec[id]), barre de lecture (#prog), vérifications de fin de partie (<div data-check="id1,id2">
   ou <div data-check-ref="maths/cours-1-logique.html#s2" data-n="3"> : les premières questions de la banque dont ref
   vaut cette partie ; le bloc se masque si la banque n'en a pas), boutons « J'ai compris »
   (data-done="maths:<chapitre>:sN" ; chapitres logique, ensembles, fonctions, raisonnement, denombrement,
   probabilites, variables).
   Outils déclarés dans le HTML : <div data-maths="truth" data-opts='{"f":"P => Q"}'></div> (JSON ; mêmes options que
   l'appel REV.maths.truth(el, opts)). Montés au chargement ET quand un script les ajoute plus tard (corrigés, QCM :
   MutationObserver). REV.maths.mount(root) monte un conteneur à la main ; un bloc monté porte data-maths-done.
   Dans data-opts, le TeX double ses barres (JSON) : "\\forall x \\in \\R, x^2 \\geq 0".

   CALCUL EXACT (REV.maths) — jamais de flottant pour une probabilité : BigInt et fractions { n, d } réduites, d > 0.
     F(n, d) fabrique une fraction (n, d : nombres, BigInt ou chaînes) ; frac(x) convertit '3/8', '0,25', '-2', 5,
       une fraction (null si illisible). fr.add / sub / mul / div / neg / cmp / eq / isZero / pow(f, k) / sum(liste) ;
       fr.str(f) → '3/8' (signe −) ; fr.tex(f) → '\frac{3}{8}' ; fr.dec(f, k) → '0,375' (k chiffres, arrondi exact,
       virgule en français, point en anglais) ; fr.sqrt(f) → { exact, tex, approx } (racine simplifiée).
     binom(n, k) → BigInt ; fact(n) → BigInt.
   LOGIQUE
     logic.parse('P => (Q et non R)') → arbre { t: 'var' | 'not' | 'and' | 'or' | 'xor' | 'imp' | 'iff', n, a, b } ou
       { error } ; connecteurs acceptés : ¬ ! ~ non not \neg · ∧ & et and \land \wedge · ∨ | ou or \lor \vee ·
       ⇒ => -> implique \Rightarrow \implies · ⇔ <=> <-> ssi iff \Leftrightarrow \iff · ⊕ xor ; variables : une
       lettre (P, Q, R…). Priorité : ¬, puis ∧, puis ∨ et ⊕, puis ⇒ (à droite), puis ⇔.
     logic.tex(arbre), logic.vars(arbre), logic.evaluate(arbre, { P: true, … }),
     logic.table(['P => Q', '!Q => !P']) → { vars, cols: [{ tex, node, fin }], rows: [{ env, vals }], finals, same,
       diff } (lignes dans l'ordre du cours : V V, V F, F V, F F) ; logic.equivalent(a, b) → bool.
   NÉGATION D'UNE PHRASE QUANTIFIÉE (TeX, ou ∀ ∃ ∈ ⇒ ∧ ∨ ¬ ≤ ≥ ≠ ℝ, ou forall exists in => et ou non <= >= !=)
     quant.parse('\forall x \in \R, \exists y \in \R, x + y > 0') → arbre { t: 'q' (q: 'A' | 'E', b : liaison) | 'not' |
       'and' | 'or' | 'imp' | 'iff' | 'atom' (s) } ; quant.tex(arbre) ; quant.negate(src) → { steps: [{ tex, rule,
       node }], result } : une règle par étape (¬∀ → ∃¬, ¬∃ → ∀¬, De Morgan, ¬(P ⇒ Q) ≡ P ∧ ¬Q, ¬(P ⇔ Q), ¬¬,
       relation niée : = ↔ ≠, < ↔ ≥, > ↔ ≤, ∈ ↔ ∉ ; double inégalité éclatée en deux).
   ENSEMBLES (diagramme de Venn à n = 2 ou 3 ensembles ; zone z = bits d'appartenance, bit i : dans le i-ème ensemble)
     sets.parse('\overline{A \cup B}', ['A','B'], 'E') → arbre ; sets.zones(arbre, n) → masque des zones (entier) ;
       opérations : ∪ \cup | + union · ∩ \cap & inter · \ \setminus - · complémentaire \overline{X}, X^c, X', !X, ¬X ;
       ∩ est prioritaire sur ∪ et \. sets.name(masque, noms, univers) → la plus courte écriture (TeX) de ces zones ;
       sets.zoneCounts({ A: 10, B: 8, AB: 3, E: 30 }, noms) → effectifs des zones (crible inversé) ou { error }.
   APPLICATIONS (diagramme sagittal)
     fn.props({ E, F, f }) → { app, inj, surj, bij, noImg, multi, collide: [x, y, image], noPre: [...] } ;
     fn.image(f, A) ; fn.preimage(E, f, B).
   ARBRE PONDÉRÉ (probabilités totales, Bayes)
     tree.compute({ first: [{ n, p }], second: { n, nb, p: [...] } }) → { first, cond, joint, total, bayes, error }.
   LOI D'UNE VARIABLE ALÉATOIRE FINIE
     law.make({ x: [...], p: [...] } | { law: 'binom', n, p } | { law: 'bern', p } | { law: 'unif', a, b }) →
       { x: [BigInt…], p: [fractions], sum, E, E2, V, sd, error } (V par Koenig-Huygens : E(X²) − E(X)²).

   OUTILS : REV.maths.tools.<nom>(el, opts), ou <div data-maths="<nom>" data-opts='…'> dans la page
   (rien ne s'anime tout seul ; les pas à pas ont Précédent / Suivant / Tout afficher / Recommencer)
     truth(el, { f: 'P => Q' | [...], sub: true, edit: true, quiz: false, presets: [...], title })
                      table de vérité qui se remplit d'après la formule tapée ; colonnes intermédiaires ; plusieurs
                      formules : verdict d'équivalence ; quiz : l'élève remplit la dernière colonne, puis Vérifier.
     negate(el, { src, edit: true, presets: [...], title })
                      négation d'une phrase quantifiée, une règle par étape, la partie qui change surlignée.
     venn(el, { n: 2 | 3, names, u: 'E', expr, edit, sizes: { A, B, AB, …, E }, compare: [expr1, expr2], title })
                      zones cliquables, expression tapée → zones coloriées, cardinaux et formule du crible.
     sagittal(el, { E: [...], F: [...], f: { a: '1', … }, names: ['E', 'F', 'f'], mode: 'props' | 'image' |
                      'preimage' | 'edit', A: [...], B: [...], title })
                      diagramme sagittal : application, injection, surjection, image directe et réciproque.
     tree(el, { first: [{ n: 'A', p: '1/3' }, { n: '\overline{A}' }], second: { n: 'B', nb: '\overline{B}',
                      p: ['1/2', '1/5'] }, edit: true, title })
                      arbre pondéré en fractions : chemin cliqué, probabilités totales, formule de Bayes.
     law(el, { x, p } | { law, n, p, a, b }, { name: 'X', edit: true, title })
                      diagramme en bâtons, espérance, variance, écart type (exacts, puis valeur approchée).
   À faire (pas encore écrits) : triangle de Pascal, arbre « quelle formule de dénombrement ? », courbe d'une fonction
   usuelle avec image directe ou réciproque d'un intervalle.

   Textes affichés : REV.t('français') ; l'anglais est déclaré ci-dessous (REV.i18n.add). */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t, EN = R.lang === 'en';
  R.i18n.add({
    'Précédent': 'Previous', 'Suivant': 'Next', 'Tout afficher': 'Show all', 'Recommencer': 'Start again',
    'étape {i} / {n}': 'step {i} / {n}', 'Outil indisponible : {m}': 'Tool unavailable: {m}',
    'V': 'T', 'F': 'F', 'vraie': 'true', 'fausse': 'false', 'vrai': 'true', 'faux': 'false',
    /* table de vérité */
    'Table de vérité': 'Truth table', 'Formule': 'Formula', 'Afficher': 'Show',
    'Exemples :': 'Examples:',
    'Connecteurs : ¬ ou !, ∧ ou &, ∨ ou |, ⇒ ou =>, ⇔ ou <=>. Variables : une lettre (P, Q, R…).': 'Connectives: ¬ or !, ∧ or &, ∨ or |, ⇒ or =>, ⇔ or <=>. Variables: one letter (P, Q, R…).',
    'Formule incomplète.': 'Incomplete formula.', 'Parenthèse non fermée.': 'Unclosed bracket.', 'Symbole inconnu : « {c} ».': 'Unknown symbol: “{c}”.',
    'Il manque une proposition après « {c} ».': 'A statement is missing after “{c}”.', 'Mot inconnu : « {c} ».': 'Unknown word: “{c}”.',
    'Trop de variables (au plus 5).': 'Too many variables (5 at most).',
    '{k} variables : {n} lignes, une par combinaison de valeurs.': '{k} variables: {n} rows, one for each combination of values.',
    '1 variable : 2 lignes.': '1 variable: 2 rows.',
    'Ligne {i} : {env}. {res}': 'Row {i}: {env}. {res}',
    'Clique sur une ligne pour la lire.': 'Click a row to read it.',
    'Les colonnes {a} et {b} sont identiques à chaque ligne : les deux propositions sont équivalentes.': 'The columns {a} and {b} are identical on every row: the two statements are equivalent.',
    'Les colonnes {a} et {b} diffèrent à la ligne {i} : les deux propositions ne sont pas équivalentes.': 'The columns {a} and {b} differ on row {i}: the two statements are not equivalent.',
    'Vraie à toutes les lignes : c’est une tautologie.': 'True on every row: it is a tautology.',
    'Fausse à toutes les lignes : c’est une contradiction.': 'False on every row: it is a contradiction.',
    'Remplis la dernière colonne (clique : V, F), puis vérifie.': 'Fill in the last column (click: T, F), then check.',
    'Vérifier': 'Check', 'Solution': 'Solution', '{ok} / {n} cases justes.': '{ok} / {n} cells right.',
    'Tout est juste.': 'All correct.', 'Il reste des cases vides.': 'Some cells are still empty.',
    'case vide': 'empty cell',
    /* négation */
    'Négation pas à pas': 'Negation step by step', 'Phrase': 'Statement',
    'On écrit la négation de toute la phrase.': 'Write the negation of the whole statement.',
    '\\(\\neg\\forall\\) devient \\(\\exists\\) : la négation passe derrière le quantificateur, le domaine ne change pas.': '\\(\\neg\\forall\\) becomes \\(\\exists\\): the negation moves past the quantifier, the domain does not change.',
    '\\(\\neg\\exists\\) devient \\(\\forall\\) : la négation passe derrière le quantificateur, le domaine ne change pas.': '\\(\\neg\\exists\\) becomes \\(\\forall\\): the negation moves past the quantifier, the domain does not change.',
    'Loi de De Morgan : \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\).': 'De Morgan’s law: \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\).',
    'Loi de De Morgan : \\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\).': 'De Morgan’s law: \\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\).',
    'Négation d’une implication : \\(\\neg(P \\Rightarrow Q) \\equiv P \\land \\neg Q\\).': 'Negation of an implication: \\(\\neg(P \\Rightarrow Q) \\equiv P \\land \\neg Q\\).',
    'Négation d’une équivalence : \\(\\neg(P \\Leftrightarrow Q) \\equiv (P \\land \\neg Q) \\lor (\\neg P \\land Q)\\).': 'Negation of an equivalence: \\(\\neg(P \\Leftrightarrow Q) \\equiv (P \\land \\neg Q) \\lor (\\neg P \\land Q)\\).',
    'Double négation : \\(\\neg\\neg P \\equiv P\\).': 'Double negation: \\(\\neg\\neg P \\equiv P\\).',
    'Négation d’une relation : \\({a}\\) devient \\({b}\\).': 'Negation of a relation: \\({a}\\) becomes \\({b}\\).',
    'Une double inégalité, ce sont deux inégalités reliées par « et ».': 'A double inequality is two inequalities joined by “and”.',
    'Négation :': 'Negation:', 'Appuie sur « Suivant » pour la première règle.': 'Press “Next” for the first rule.',
    'Écris une phrase avec \\forall, \\exists, \\in, \\Rightarrow, \\land, \\lor, \\neg (ou ∀ ∃ ∈ ⇒ ∧ ∨ ¬, ou forall, exists, in, =>, et, ou, non).': 'Write a statement with \\forall, \\exists, \\in, \\Rightarrow, \\land, \\lor, \\neg (or ∀ ∃ ∈ ⇒ ∧ ∨ ¬, or forall, exists, in, =>, and, or, not).',
    'Phrase illisible : {m}': 'Cannot read the statement: {m}', 'quantificateur sans virgule': 'quantifier without a comma', 'phrase vide': 'empty statement',
    /* Venn */
    'Diagramme de Venn': 'Venn diagram', 'Ensemble': 'Set', 'Colorier': 'Shade', 'Effacer': 'Clear',
    'Clique sur les zones pour les colorier, ou tape une expression.': 'Click the regions to shade them, or type an expression.',
    'Opérations : ∪ ou |, ∩ ou &, \\ ou -, complémentaire : A\' ou !A ou \\overline{A}.': 'Operations: ∪ or |, ∩ or &, \\ or -, complement: A\' or !A or \\overline{A}.',
    'Zones coloriées : {e}': 'Shaded regions: {e}', 'Aucune zone coloriée.': 'No region shaded.',
    'zone {z}': 'region {z}', 'Cardinal : {c}': 'Cardinality: {c}', 'Formule du crible : ': 'Inclusion–exclusion formula: ',
    'Mêmes zones : les deux ensembles sont égaux.': 'Same regions: the two sets are equal.',
    'Zones différentes : les deux ensembles ne sont pas égaux.': 'Different regions: the two sets are not equal.',
    'Effectifs incohérents : une zone aurait un effectif négatif.': 'Inconsistent sizes: a region would have a negative size.',
    'Expression illisible.': 'Cannot read the expression.',
    /* sagittal */
    'Diagramme sagittal': 'Arrow diagram', 'Propriétés': 'Properties', 'Image directe': 'Direct image', 'Image réciproque': 'Inverse image', 'Modifier les flèches': 'Edit the arrows',
    '{f} est une application : chaque élément de {E} a exactement une image.': '{f} is a map: each element of {E} has exactly one image.',
    '{f} n’est pas une application : {x} n’a pas d’image.': '{f} is not a map: {x} has no image.',
    '{f} n’est pas une application : {x} a plusieurs images.': '{f} is not a map: {x} has several images.',
    'Injective : deux éléments distincts ont toujours des images distinctes.': 'Injective: two distinct elements always have distinct images.',
    'Pas injective : {x} ≠ {y} mais {fx} = {fy} = {z}.': 'Not injective: {x} ≠ {y} but {fx} = {fy} = {z}.',
    'Surjective : chaque élément de {F} a au moins un antécédent.': 'Surjective: every element of {F} has at least one preimage.',
    'Pas surjective : {y} n’a pas d’antécédent.': 'Not surjective: {y} has no preimage.',
    'Pas surjective : {y} n’ont pas d’antécédent.': 'Not surjective: {y} have no preimage.',
    'Bijective : injective et surjective.': 'Bijective: injective and surjective.',
    'Clique sur des éléments de {E} : leurs images s’allument dans {F}.': 'Click elements of {E}: their images light up in {F}.',
    'Clique sur des éléments de {F} : leurs antécédents s’allument dans {E}.': 'Click elements of {F}: their preimages light up in {E}.',
    'Clique sur un élément de {E}, puis sur son image dans {F} (recliquer sur la même image retire la flèche).': 'Click an element of {E}, then its image in {F} (clicking the same image again removes the arrow).',
    /* arbre */
    'Arbre pondéré': 'Probability tree', 'Probabilités totales : ': 'Law of total probability: ', 'Formule de Bayes : ': 'Bayes’ formula: ',
    'Clique sur une feuille : le chemin et son produit.': 'Click a leaf: its path and the product.',
    'Les probabilités des branches issues d’un même nœud doivent avoir pour somme 1.': 'The probabilities of the branches leaving one node must add up to 1.',
    'Probabilité illisible : « {v} ».': 'Cannot read the probability “{v}”.', 'Une probabilité est entre 0 et 1.': 'A probability is between 0 and 1.',
    'Chemin : on multiplie les probabilités le long des branches.': 'Path: multiply the probabilities along the branches.',
    /* loi */
    'Loi de {X}': 'Distribution of {X}', 'loi': 'distribution', 'binomiale': 'binomial', 'Bernoulli': 'Bernoulli', 'uniforme': 'uniform', 'donnée': 'given',
    'La somme des probabilités vaut {s}, pas 1.': 'The probabilities add up to {s}, not 1.',
    'Paramètres illisibles.': 'Cannot read the parameters.',
    'Espérance': 'Expected value', 'Variance (Koenig-Huygens)': 'Variance (König–Huygens)', 'Écart type': 'Standard deviation',
    'trait plein : espérance ; pointillés : espérance ± écart type.': 'solid line: expected value; dashed: expected value ± standard deviation.'
  });

  var esc = U.esc, MINUS = '−';
  function M() { return R.math || window.MathRender || null; }
  /* une formule TeX en HTML (KaTeX) ; sans KaTeX : le source */
  function tx(src, disp) { var m = M(); return m && m.tex ? m.tex(src, { display: !!disp }) : '<span class="katex-src">' + esc(src) + '</span>'; }
  /* un texte qui contient des \( … \) : les formules sont rendues ici (pas d'attente du MutationObserver) */
  function mathify(html) { return String(html).replace(/\\\((.+?)\\\)/g, function (m, s) { return tx(s); }); }
  function sepDec() { return EN ? '.' : ','; }

  /* ================================================================== 1. FRACTIONS EXACTES */
  var Z = BigInt(0), ONE = BigInt(1), TEN = BigInt(10);
  function big(x) { return typeof x === 'bigint' ? x : BigInt(x); }
  function babs(a) { return a < Z ? -a : a; }
  function gcd(a, b) { a = babs(a); b = babs(b); while (b !== Z) { var t = a % b; a = b; b = t; } return a; }
  function F(n, d) {
    n = big(n); d = d == null ? ONE : big(d);
    if (d === Z) throw new Error('division par 0');
    if (d < Z) { n = -n; d = -d; }
    var g = gcd(n, d); if (g > ONE) { n /= g; d /= g; }
    return { n: n, d: d };
  }
  function isF(x) { return x && typeof x === 'object' && typeof x.n === 'bigint' && typeof x.d === 'bigint'; }
  /* '3/8', '-3/8', '0,25', '0.25', '2', 5, 5n, fraction → fraction ; sinon null */
  function frac(x) {
    if (isF(x)) return F(x.n, x.d);
    if (typeof x === 'bigint') return F(x);
    if (typeof x === 'number') { if (!isFinite(x)) return null; x = String(x); }
    if (typeof x !== 'string') return null;
    var s = x.replace(/[\s\u00a0\u202f]/g, '').replace(/[−–]/g, '-').replace(/^\\frac\{(-?\d+)\}\{(-?\d+)\}$/, '$1/$2');
    var m = /^(-?)(\d+)\/(\d+)$/.exec(s);
    if (m) { if (/^0+$/.test(m[3])) return null; return F((m[1] ? -1n : 1n) * BigInt(m[2]), BigInt(m[3])); }
    m = /^(-?)(\d*)(?:[.,](\d+))?$/.exec(s);
    if (!m || (!m[2] && !m[3])) return null;
    var den = m[3] ? TEN ** BigInt(m[3].length) : ONE;
    var num = BigInt((m[2] || '0') + (m[3] || ''));
    return F(m[1] ? -num : num, den);
  }
  var fr = {
    add: function (a, b) { return F(a.n * b.d + b.n * a.d, a.d * b.d); },
    sub: function (a, b) { return F(a.n * b.d - b.n * a.d, a.d * b.d); },
    mul: function (a, b) { return F(a.n * b.n, a.d * b.d); },
    div: function (a, b) { return F(a.n * b.d, a.d * b.n); },
    neg: function (a) { return F(-a.n, a.d); },
    cmp: function (a, b) { var x = a.n * b.d, y = b.n * a.d; return x < y ? -1 : x > y ? 1 : 0; },
    eq: function (a, b) { return a.n === b.n && a.d === b.d; },
    isZero: function (a) { return a.n === Z; },
    pow: function (a, k) { var r = F(1); for (var i = 0; i < k; i++) r = fr.mul(r, a); return r; },
    sum: function (l) { return l.reduce(function (s, x) { return fr.add(s, x); }, F(0)); },
    str: function (a) { var s = (a.n < Z ? MINUS : '') + babs(a.n).toString(); return a.d === ONE ? s : s + '/' + a.d.toString(); },
    tex: function (a) { var s = babs(a.n).toString(); return (a.n < Z ? '-' : '') + (a.d === ONE ? s : '\\frac{' + s + '}{' + a.d.toString() + '}'); },
    /* valeur décimale à k chiffres après la virgule, arrondie au plus proche (exact, sans flottant) */
    dec: function (a, k) {
      k = k == null ? 4 : k;
      var p = TEN ** BigInt(k), neg = a.n < Z, n = babs(a.n) * p * 2n + a.d, q = n / (2n * a.d);
      var s = q.toString(); while (s.length <= k) s = '0' + s;
      var ip = s.slice(0, s.length - k), fp = k ? s.slice(-k).replace(/0+$/, '') : '';
      return (neg && q !== Z ? MINUS : '') + ip + (fp ? sepDec() + fp : '');
    },
    /* racine carrée d'une fraction positive : exacte si possible, sinon k√m / d simplifiée */
    sqrt: function (a, k) {
      if (a.n < Z) return null;
      if (a.n === Z) return { exact: F(0), tex: '0', approx: '0' };
      var nd = a.n * a.d, out = ONE, m = nd, f = 2n;
      while (f * f <= m && f <= 10000n) { while (m % (f * f) === Z) { m /= f * f; out *= f; } f++; }
      var c = F(out, a.d);  /* √(n/d) = √(n d) / d = c × √m */
      var exact = m === ONE ? c : null, t;
      if (exact) t = fr.tex(exact);
      else {
        var rad = '\\sqrt{' + m.toString() + '}';
        t = c.d === ONE ? (c.n === ONE ? rad : c.n.toString() + rad) : '\\frac{' + (c.n === ONE ? '' : c.n.toString()) + rad + '}{' + c.d.toString() + '}';
      }
      /* valeur approchée : isqrt(n d 10^(2k+2)) / (d 10^(k+1)) */
      k = k == null ? 4 : k;
      var sc = TEN ** BigInt(k + 1), v = isqrt(nd * sc * sc);
      return { exact: exact, tex: t, approx: fr.dec(F(v, a.d * sc), k) };
    }
  };
  function isqrt(n) { if (n < 2n) return n; var x = BigInt(Math.floor(Math.sqrt(Number(n)))); while (x * x > n) x--; while ((x + 1n) * (x + 1n) <= n) x++; return x; }
  function fact(n) { var r = ONE; for (var i = 2n; i <= big(n); i++) r *= i; return r; }
  function binom(n, k) { n = big(n); k = big(k); if (k < Z || k > n) return Z; var r = ONE; for (var i = ONE; i <= k; i++) r = r * (n - k + i) / i; return r; }

  /* ================================================================== 2. LOGIQUE DES PROPOSITIONS */
  var PREC = { iff: 1, imp: 2, or: 3, xor: 3, and: 4, not: 5, var: 6 };
  var OPTEX = { and: '\\land', or: '\\lor', xor: '\\oplus', imp: '\\Rightarrow', iff: '\\Leftrightarrow' };
  var WORDS = { non: 'not', not: 'not', et: 'and', and: 'and', ou: 'or', or: 'or', xor: 'xor', implique: 'imp', ssi: 'iff', iff: 'iff' };
  var TEXOPS = { neg: 'not', lnot: 'not', land: 'and', wedge: 'and', lor: 'or', vee: 'or', oplus: 'xor', Rightarrow: 'imp', implies: 'imp', Longrightarrow: 'imp',
    rightarrow: 'imp', Leftrightarrow: 'iff', iff: 'iff', Longleftrightarrow: 'iff', leftrightarrow: 'iff' };
  function lerr(m, v) { var e = new Error(T(m, v)); e.user = true; return e; }
  function ltokens(s) {
    var out = [], i = 0, sym = [['<=>', 'iff'], ['<->', 'iff'], ['=>', 'imp'], ['->', 'imp'], ['/\\', 'and'], ['\\/', 'or'], ['⇔', 'iff'], ['↔', 'iff'], ['⇒', 'imp'], ['→', 'imp'],
      ['∧', 'and'], ['&&', 'and'], ['&', 'and'], ['∨', 'or'], ['||', 'or'], ['|', 'or'], ['⊕', 'xor'], ['¬', 'not'], ['!', 'not'], ['~', 'not'], ['(', '('], [')', ')']];
    s = String(s).replace(/\\left|\\right/g, '');
    outer: while (i < s.length) {
      var c = s.charAt(i);
      if (/\s/.test(c) || c === '{' || c === '}') { i++; continue; }
      if (c === '\\' && /[a-zA-Z]/.test(s.charAt(i + 1))) {
        var m = /^\\([a-zA-Z]+)/.exec(s.slice(i));
        if (TEXOPS[m[1]]) { out.push({ k: TEXOPS[m[1]], s: m[0] }); i += m[0].length; continue; }
        throw lerr('Symbole inconnu : « {c} ».', { c: m[0] });
      }
      for (var j = 0; j < sym.length; j++) if (s.substr(i, sym[j][0].length) === sym[j][0]) { out.push({ k: sym[j][1], s: sym[j][0] }); i += sym[j][0].length; continue outer; }
      if (/[A-Za-zÀ-ÿ]/.test(c)) {
        var w = /^[A-Za-zÀ-ÿ]+\d*/.exec(s.slice(i))[0], lw = w.toLowerCase();
        if (WORDS[lw]) out.push({ k: WORDS[lw], s: w });
        else if (/^[A-Za-z]\d*$/.test(w)) out.push({ k: 'var', s: w });
        else throw lerr('Mot inconnu : « {c} ».', { c: w });
        i += w.length; continue;
      }
      throw lerr('Symbole inconnu : « {c} ».', { c: c });
    }
    return out;
  }
  function lparse(src) {
    var tk, p = 0;
    try { tk = ltokens(src); } catch (e) { return { error: e.message }; }
    if (!tk.length) return { error: T('Formule incomplète.') };
    function peek() { return tk[p] ? tk[p].k : null; }
    function need(prev) { if (p >= tk.length) throw lerr('Il manque une proposition après « {c} ».', { c: prev }); }
    function iff() { var a = imp(); while (peek() === 'iff') { var o = tk[p++].s; need(o); a = { t: 'iff', a: a, b: imp() }; } return a; }
    function imp() { var a = or(); if (peek() === 'imp') { var o = tk[p++].s; need(o); return { t: 'imp', a: a, b: imp() }; } return a; }
    function or() { var a = and(); while (peek() === 'or' || peek() === 'xor') { var k = peek(), o = tk[p++].s; need(o); a = { t: k, a: a, b: and() }; } return a; }
    function and() { var a = un(); while (peek() === 'and') { var o = tk[p++].s; need(o); a = { t: 'and', a: a, b: un() }; } return a; }
    function un() {
      var k = peek();
      if (k === 'not') { var o = tk[p++].s; need(o); return { t: 'not', a: un() }; }
      if (k === '(') { p++; var e = iff(); if (peek() !== ')') throw lerr('Parenthèse non fermée.'); p++; return e; }
      if (k === 'var') return { t: 'var', n: tk[p++].s.toUpperCase() };
      if (k == null) throw lerr('Formule incomplète.');
      throw lerr('Il manque une proposition après « {c} ».', { c: p ? tk[p - 1].s : '' });
    }
    try {
      var r = iff();
      if (p < tk.length) return { error: tk[p].k === ')' ? T('Parenthèse non fermée.') : T('Symbole inconnu : « {c} ».', { c: tk[p].s }) };
      return r;
    } catch (e) { return { error: e.user ? e.message : T('Formule incomplète.') }; }
  }
  function ltex(n) {
    if (n.t === 'var') return n.n;
    if (n.t === 'not') { var c = ltex(n.a); return '\\neg ' + (n.a.t === 'var' || n.a.t === 'not' ? c : '(' + c + ')'); }
    function side(x) { var s = ltex(x); return x.t === 'var' || x.t === 'not' || (x.t === n.t && (n.t === 'and' || n.t === 'or')) ? s : '(' + s + ')'; }
    return side(n.a) + ' ' + OPTEX[n.t] + ' ' + side(n.b);
  }
  function lvars(n, acc) {
    acc = acc || [];
    if (n.t === 'var') { if (acc.indexOf(n.n) < 0) acc.push(n.n); } else { lvars(n.a, acc); if (n.b) lvars(n.b, acc); }
    return acc;
  }
  function leval(n, env) {
    switch (n.t) {
      case 'var': return !!env[n.n];
      case 'not': return !leval(n.a, env);
      case 'and': return leval(n.a, env) && leval(n.b, env);
      case 'or': return leval(n.a, env) || leval(n.b, env);
      case 'xor': return leval(n.a, env) !== leval(n.b, env);
      case 'imp': return !leval(n.a, env) || leval(n.b, env);
      case 'iff': return leval(n.a, env) === leval(n.b, env);
    }
    return false;
  }
  /* table(['P => Q', …]) : variables par ordre alphabétique, première ligne « tout vrai » (ordre du cours) */
  function ltable(list) {
    list = Array.isArray(list) ? list : [list];
    var trees = [];
    for (var i = 0; i < list.length; i++) {
      var t = typeof list[i] === 'string' ? lparse(list[i]) : list[i];
      if (t.error) return { error: t.error, at: i };
      trees.push(t);
    }
    var vars = [];
    trees.forEach(function (t) { lvars(t, vars); });
    vars.sort();
    if (vars.length > 5) return { error: T('Trop de variables (au plus 5).') };
    var cols = [], keys = {};
    function collect(n, fin) {
      if (n.t === 'var') return;
      collect(n.a); if (n.b) collect(n.b);
      var k = ltex(n);
      if (keys[k] != null) { if (fin) cols[keys[k]].fin = true; return; }
      keys[k] = cols.length; cols.push({ tex: k, node: n, fin: !!fin });
    }
    trees.forEach(function (t) { if (t.t === 'var') { var k = t.n; if (keys[k] == null) { keys[k] = cols.length; cols.push({ tex: k, node: t, fin: true, isVar: true }); } } else collect(t, true); });
    /* les colonnes finales viennent en dernier, dans l'ordre des formules */
    var finals = trees.map(function (t) { return keys[ltex(t)]; });
    var order = cols.map(function (c, i) { return i; }).filter(function (i) { return finals.indexOf(i) < 0; }).concat(finals.filter(function (x, i, a) { return a.indexOf(x) === i; }));
    cols = order.map(function (i) { return cols[i]; });
    var fIdx = trees.map(function (t) { var k = ltex(t); for (var j = 0; j < cols.length; j++) if (cols[j].tex === k) return j; return -1; });
    var rows = [], nv = vars.length;
    for (var r = 0; r < (1 << nv); r++) {
      var env = {};
      vars.forEach(function (v, j) { env[v] = !((r >> (nv - 1 - j)) & 1); });
      rows.push({ env: env, vals: cols.map(function (c) { return leval(c.node, env); }) });
    }
    var same = null, diff = [];
    if (fIdx.length >= 2) {
      rows.forEach(function (row, i) { if (row.vals[fIdx[0]] !== row.vals[fIdx[1]]) diff.push(i); });
      same = !diff.length;
    }
    return { vars: vars, cols: cols, rows: rows, finals: fIdx, same: same, diff: diff, trees: trees };
  }
  function lequiv(a, b) { var t = ltable([a, b]); return !t.error && t.same; }

  /* ================================================================== 3. PHRASES QUANTIFIÉES (TeX) */
  /* écriture libre → TeX : symboles Unicode et mots usuels */
  function normQ(s) {
    s = String(s).replace(/[\u00a0\u202f]/g, ' ').replace(/\\text\{\s*(?:et|and)\s*\}/g, ' \\land ').replace(/\\text\{\s*(?:ou|or)\s*\}/g, ' \\lor ');
    var kept = [];   /* les \text{…} ne sont pas traduits */
    s = s.replace(/\\(?:text|mathrm|operatorname)\{[^{}]*\}/g, function (m) { kept.push(m); return '\u0001' + (kept.length - 1) + '\u0002'; });
    var rep = [[/∀/g, '\\forall '], [/∃/g, '\\exists '], [/∉/g, '\\notin '], [/∈/g, '\\in '], [/⇔|<=>/g, '\\Leftrightarrow '], [/⇒|=>/g, '\\Rightarrow '],
      [/∧/g, '\\land '], [/∨/g, '\\lor '], [/¬/g, '\\neg '], [/≤|<=/g, '\\leq '], [/≥|>=/g, '\\geq '], [/≠|!=/g, '\\neq '],
      [/ℝ/g, '\\R '], [/ℕ/g, '\\N '], [/ℤ/g, '\\Z '], [/ℚ/g, '\\Q '], [/ℂ/g, '\\C '], [/−/g, '-'],
      [/(^|[^\\a-zA-Z])(?:pour tout|for all|forall)(?![a-zA-Z])/gi, '$1\\forall '], [/(^|[^\\a-zA-Z])(?:il existe|there exists|exists)(?![a-zA-Z])/gi, '$1\\exists '],
      [/(^|[^\\a-zA-Z])in(?![a-zA-Z])/g, '$1\\in '], [/(^|[^\\a-zA-Z])(?:et|and)(?![a-zA-Z])/g, '$1\\land '], [/(^|[^\\a-zA-Z])(?:ou|or)(?![a-zA-Z])/g, '$1\\lor '],
      [/(^|[^\\a-zA-Z])(?:non|not)(?![a-zA-Z])/g, '$1\\neg ']];
    rep.forEach(function (r) { s = s.replace(r[0], r[1]); });
    s = s.replace(/\\in\s*([RNZQC])([*+])?(?![a-zA-Z{])/g, function (m, l, e) { return '\\in \\' + l + (e ? '^' + e : '') + ' '; });   /* x in R → x \in \R */
    s = s.replace(/\u0001(\d+)\u0002/g, function (m, i) { return kept[+i]; });
    return s.replace(/\s+/g, ' ').trim();
  }
  var QOPS = [['\\Leftrightarrow', 'iff'], ['\\Longleftrightarrow', 'iff'], ['\\iff', 'iff'], ['\\Rightarrow', 'imp'], ['\\Longrightarrow', 'imp'], ['\\implies', 'imp'],
    ['\\land', 'and'], ['\\wedge', 'and'], ['\\lor', 'or'], ['\\vee', 'or'], ['\\text{ et }', 'and'], ['\\text{ ou }', 'or'], ['\\text{ and }', 'and'], ['\\text{ or }', 'or']];
  function cmdAt(s, i) { var m = /^\\[a-zA-Z]+/.exec(s.slice(i)); return m ? m[0] : null; }
  /* repères de premier niveau : opérateurs (hors parenthèses et accolades), arrêt sur un quantificateur */
  function scanTop(s) {
    var ops = [], d = 0, i = 0;
    while (i < s.length) {
      var c = s.charAt(i);
      if (c === '\\') {
        var cm = cmdAt(s, i);
        if (!cm) { i += 2; continue; }
        if (cm === '\\left') { d++; i += 6; continue; }
        if (cm === '\\right') { d--; i += 7; continue; }
        if (cm === '\\llbracket') { d++; i += cm.length; continue; }
        if (cm === '\\rrbracket') { d--; i += cm.length; continue; }
        if (d === 0 && (cm === '\\forall' || cm === '\\exists')) break;
        if (d === 0) {
          var hit = null;
          for (var j = 0; j < QOPS.length; j++) {
            var op = QOPS[j][0];
            if (s.substr(i, op.length) === op && (op.charAt(op.length - 1) === '}' || !/[a-zA-Z]/.test(s.charAt(i + op.length)))) { hit = QOPS[j]; break; }
          }
          if (hit) { ops.push({ i: i, len: hit[0].length, k: hit[1] }); i += hit[0].length; continue; }
        }
        i += cm.length; continue;
      }
      if (c === '{' || c === '(') d++;
      else if (c === '}' || c === ')') d--;
      i++;
    }
    return ops;
  }
  function wrapped(s) {
    var open = s.charAt(0) === '(' ? 1 : s.indexOf('\\left(') === 0 ? 6 : 0;
    if (!open) return null;
    var d = 0, i = 0;
    while (i < s.length) {
      if (s.substr(i, 6) === '\\left(') { d++; i += 6; continue; }
      if (s.substr(i, 7) === '\\right)') { d--; i += 7; if (d === 0) return i === s.length ? s.slice(open, s.length - 7) : null; continue; }
      var c = s.charAt(i);
      if (c === '\\') { i += 2; continue; }
      if (c === '(' || c === '{') d++;
      else if (c === ')' || c === '}') { d--; if (d === 0) return i === s.length - 1 && c === ')' ? s.slice(open, i) : null; }
      i++;
    }
    return null;
  }
  function qerr(m) { var e = new Error(m); e.user = true; return e; }
  function qparse(src) {
    function P(s) {
      s = s.trim();
      if (!s) throw qerr(T('phrase vide'));
      var qm = /^\\(forall|exists)(?![a-zA-Z])/.exec(s);
      if (qm) {
        var rest = s.slice(qm[0].length), d = 0, inter = false, i = 0, cut = -1;
        while (i < rest.length) {
          var c = rest.charAt(i);
          if (c === '\\') { var cm = cmdAt(rest, i) || '\\'; if (cm === '\\left' || cm === '\\llbracket') d++; if (cm === '\\right' || cm === '\\rrbracket') d--; i += Math.max(cm.length, 2); continue; }
          if (c === '{' || c === '(') d++; else if (c === '}' || c === ')') d--;
          else if ((c === '[' || c === ']') && d === 0) inter = !inter;   /* intervalle ]a, b[ : sa virgule ne coupe pas */
          else if (c === ',' && d === 0 && !inter) { cut = i; break; }
          i++;
        }
        if (cut < 0) throw qerr(T('quantificateur sans virgule'));
        return { t: 'q', q: qm[1] === 'forall' ? 'A' : 'E', b: rest.slice(0, cut).trim(), a: P(rest.slice(cut + 1)) };
      }
      var ops = scanTop(s);
      var order = ['iff', 'imp', 'or', 'and'];
      for (var k = 0; k < order.length; k++) {
        var list = ops.filter(function (o) { return o.k === order[k]; });
        if (!list.length) continue;
        var o = order[k] === 'imp' ? list[0] : list[list.length - 1];   /* ⇒ à droite, les autres à gauche */
        return { t: order[k], a: P(s.slice(0, o.i)), b: P(s.slice(o.i + o.len)) };
      }
      var nm = /^\\(neg|lnot)(?![a-zA-Z])/.exec(s);
      if (nm) return { t: 'not', a: P(s.slice(nm[0].length)) };
      var w = wrapped(s);
      if (w != null) return P(w);
      return { t: 'atom', s: s };
    }
    try { return P(normQ(src)); } catch (e) { return { error: e.user ? e.message : String(e.message || e) }; }
  }
  var QSYM = { and: '\\land', or: '\\lor', imp: '\\Rightarrow', iff: '\\Leftrightarrow' };
  function qtex(n, hl) {
    var s;
    function inner(x, parent) {
      var t = qtex(x, hl);
      var need = x.t === 'q' || (x.t !== 'atom' && x.t !== 'not' && !(x.t === parent && (parent === 'and' || parent === 'or')));
      return need ? '\\left(' + t + '\\right)' : t;
    }
    switch (n.t) {
      case 'atom': s = n.s; break;
      case 'q': s = (n.q === 'A' ? '\\forall ' : '\\exists ') + n.b + ',\\ ' + qtex(n.a, hl); break;
      case 'not': s = '\\neg ' + (n.a.t === 'atom' && !REL_RE.test(n.a.s) && !/\s/.test(n.a.s.trim()) ? n.a.s : n.a.t === 'not' ? qtex(n.a, hl) : '\\left(' + qtex(n.a, hl) + '\\right)'); break;
      default: s = inner(n.a, n.t) + ' ' + QSYM[n.t] + ' ' + inner(n.b, n.t);
    }
    return hl && hl.indexOf(n) >= 0 ? '\\hl{' + s + '}' : s;
  }
  /* relations d'un atome (premier niveau) */
  var RELS = ['\\leqslant', '\\geqslant', '\\notin', '\\subseteq', '\\subset', '\\neq', '\\leq', '\\geq', '\\le', '\\ge', '\\ne', '\\in', '=', '<', '>'];
  var REL_RE = /\\(?:leqslant|geqslant|notin|subseteq|subset|neq|leq|geq|le|ge|ne|in)(?![a-zA-Z])|[=<>]/;
  var NEG = { '=': '\\neq', '\\neq': '=', '\\ne': '=', '<': '\\geq', '>': '\\leq', '\\leq': '>', '\\le': '>', '\\leqslant': '>', '\\geq': '<', '\\ge': '<', '\\geqslant': '<',
    '\\in': '\\notin', '\\notin': '\\in', '\\subset': '\\not\\subset', '\\subseteq': '\\not\\subseteq' };
  var FLIP = { '<': '>', '>': '<', '\\leq': '\\geq', '\\geq': '\\leq', '\\le': '\\ge', '\\ge': '\\le', '=': '=', '\\neq': '\\neq' };
  function rels(s) {
    var out = [], d = 0, i = 0;
    while (i < s.length) {
      var c = s.charAt(i);
      if (c === '\\') {
        var cm = cmdAt(s, i);
        if (!cm) { i += 2; continue; }
        if (cm === '\\left') { d++; i += 5; continue; }
        if (cm === '\\right') { d--; i += 6; continue; }
        if (d === 0 && RELS.indexOf(cm) >= 0) { out.push({ i: i, len: cm.length, r: cm }); }
        i += cm.length; continue;
      }
      if (c === '{' || c === '(') d++;
      else if (c === '}' || c === ')') d--;
      else if (d === 0 && (c === '=' || c === '<' || c === '>')) out.push({ i: i, len: 1, r: c });
      i++;
    }
    return out;
  }
  function isConst(s) { return /^[-+]?\s*(?:\d+(?:[.,]\d+|\{,\}\d+)?|\\pi|\\infty|\\frac\{\d+\}\{\d+\})$/.test(s.trim()); }
  function simpleVar(s) { return /^(?:[a-zA-Z]|\\(?:varepsilon|epsilon|alpha|beta|lambda|theta|delta))(?:_\{?\w+\}?)?$/.test(s.trim()); }
  function negAtom(a) {
    var r = rels(a.s);
    if (r.length !== 1 || !NEG[r[0].r]) return null;
    var L = a.s.slice(0, r[0].i).trim(), Rt = a.s.slice(r[0].i + r[0].len).trim(), nr = NEG[r[0].r];
    if (!L || !Rt) return null;
    if (isConst(L) && simpleVar(Rt) && FLIP[nr]) { var t = L; L = Rt; Rt = t; nr = FLIP[nr]; }
    return { node: { t: 'atom', s: L + ' ' + nr + ' ' + Rt }, from: r[0].r, to: NEG[r[0].r] };
  }
  function splitDouble(a) {
    var r = rels(a.s);
    if (r.length !== 2 || !FLIP[r[0].r] || !FLIP[r[1].r]) return null;
    var x = a.s.slice(0, r[0].i).trim(), y = a.s.slice(r[0].i + r[0].len, r[1].i).trim(), z = a.s.slice(r[1].i + r[1].len).trim();
    if (!x || !y || !z) return null;
    /* a < x ≤ b : « x > a et x ≤ b » (le terme du milieu à gauche, comme on l'écrit à la main) */
    return { t: 'and', a: { t: 'atom', s: y + ' ' + FLIP[r[0].r] + ' ' + x }, b: { t: 'atom', s: y + ' ' + r[1].r + ' ' + z } };
  }
  /* une règle, appliquée au premier ¬ réductible (de gauche à droite, de l'extérieur vers l'intérieur) */
  function qstep(n) {
    if (n.t === 'atom') return null;
    if (n.t === 'not') {
      var c = n.a, out = null;
      if (c.t === 'q') out = { n: { t: 'q', q: c.q === 'A' ? 'E' : 'A', b: c.b, a: { t: 'not', a: c.a } }, rule: c.q === 'A' ? '\\(\\neg\\forall\\) devient \\(\\exists\\) : la négation passe derrière le quantificateur, le domaine ne change pas.' : '\\(\\neg\\exists\\) devient \\(\\forall\\) : la négation passe derrière le quantificateur, le domaine ne change pas.' };
      else if (c.t === 'and') out = { n: { t: 'or', a: { t: 'not', a: c.a }, b: { t: 'not', a: c.b } }, rule: 'Loi de De Morgan : \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\).' };
      else if (c.t === 'or') out = { n: { t: 'and', a: { t: 'not', a: c.a }, b: { t: 'not', a: c.b } }, rule: 'Loi de De Morgan : \\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\).' };
      else if (c.t === 'imp') out = { n: { t: 'and', a: c.a, b: { t: 'not', a: c.b } }, rule: 'Négation d’une implication : \\(\\neg(P \\Rightarrow Q) \\equiv P \\land \\neg Q\\).' };
      else if (c.t === 'iff') out = { n: { t: 'or', a: { t: 'and', a: c.a, b: { t: 'not', a: c.b } }, b: { t: 'and', a: { t: 'not', a: c.a }, b: c.b } }, rule: 'Négation d’une équivalence : \\(\\neg(P \\Leftrightarrow Q) \\equiv (P \\land \\neg Q) \\lor (\\neg P \\land Q)\\).' };
      else if (c.t === 'not') out = { n: c.a, rule: 'Double négation : \\(\\neg\\neg P \\equiv P\\).' };
      else if (c.t === 'atom') {
        var na = negAtom(c);
        if (na) out = { n: na.node, rule: 'Négation d’une relation : \\({a}\\) devient \\({b}\\).', vars: { a: na.from, b: na.to } };
        else { var sp = splitDouble(c); if (sp) out = { n: { t: 'not', a: sp }, rule: 'Une double inégalité, ce sont deux inégalités reliées par « et ».', hlChild: true }; }
      }
      if (out) { out.hit = out.hlChild ? out.n.a : out.n; return out; }
      return null;
    }
    var keys = n.t === 'q' ? ['a'] : ['a', 'b'];
    for (var i = 0; i < keys.length; i++) {
      var r = qstep(n[keys[i]]);
      if (r) { var copy = {}; for (var k in n) copy[k] = n[k]; copy[keys[i]] = r.n; r.n = copy; return r; }
    }
    return null;
  }
  function qnegate(src) {
    var t = typeof src === 'string' ? qparse(src) : src;
    if (t.error) return { error: t.error };
    var cur = { t: 'not', a: t }, steps = [{ node: cur, tex: qtex(cur, [cur]), rule: T('On écrit la négation de toute la phrase.') }];
    for (var guard = 0; guard < 60; guard++) {
      var r = qstep(cur);
      if (!r) break;
      cur = r.n;
      steps.push({ node: cur, tex: qtex(cur, [r.hit]), rule: T(r.rule, r.vars) });
    }
    return { steps: steps, result: qtex(cur), node: cur, source: qtex(t) };
  }

  /* ================================================================== 4. ENSEMBLES (Venn) */
  function sparse(src, names, u) {
    names = names || ['A', 'B']; u = u || 'E';
    var s = String(src).replace(/[\u00a0\u202f]/g, ' ').replace(/\\left|\\right/g, '').replace(/\\setminus|\\backslash/g, ' \\ ')
      .replace(/\\cup/g, '∪').replace(/\\cap/g, '∩').replace(/\\(?:emptyset|varnothing)/g, '∅').replace(/\\complement\s*/g, '!')
      .replace(/\\overline\s*\{/g, '¯{').replace(/\\bar\s*\{/g, '¯{').replace(/\bunion\b/g, '∪').replace(/\binter\b/g, '∩');
    var p = 0;
    function ws() { while (/\s/.test(s.charAt(p))) p++; }
    function expr() {
      var a = term();
      for (;;) {
        ws(); var c = s.charAt(p);
        if (c === '∪' || c === '|' || c === '+') { p++; a = { t: 'u', a: a, b: term() }; }
        else if ((c === '\\' && !/[A-Za-z]/.test(s.charAt(p + 1))) || c === '-' || c === '−') { p++; a = { t: 'd', a: a, b: term() }; }
        else return a;
      }
    }
    function term() { var a = fac(); for (;;) { ws(); var c = s.charAt(p); if (c === '∩' || c === '&') { p++; a = { t: 'i', a: a, b: fac() }; } else return a; } }
    function fac() {
      ws(); var c = s.charAt(p), a;
      if (c === '!' || c === '¬') { p++; return post({ t: 'c', a: fac() }); }
      if (c === '(') { p++; a = expr(); ws(); if (s.charAt(p) !== ')') throw new Error('paren'); p++; return post(a); }
      if (c === '¯') { p += 2; a = expr(); ws(); if (s.charAt(p) !== '}') throw new Error('brace'); p++; return post({ t: 'c', a: a }); }
      if (c === '{') { p++; a = expr(); ws(); if (s.charAt(p) !== '}') throw new Error('brace'); p++; return post(a); }
      if (c === '∅') { p++; return post({ t: 'empty' }); }
      if (s.substr(p, 6) === '\\Omega' || c === 'Ω') { p += c === 'Ω' ? 1 : 6; if (u === 'Ω' || u === '\\Omega') return post({ t: 'all' }); throw new Error('name'); }
      if (/[A-Za-z]/.test(c)) {
        var nm = c; p++;
        if (nm === u) return post({ t: 'all' });
        var k = names.indexOf(nm);
        if (k < 0) throw new Error('name');
        return post({ t: 's', k: k });
      }
      throw new Error('syntax');
    }
    function post(a) {
      for (;;) {
        ws();
        if (s.substr(p, 3) === '^{c' && s.charAt(p + 3) === '}') { p += 4; a = { t: 'c', a: a }; }
        else if (s.substr(p, 2) === '^c' || s.substr(p, 2) === "^'") { p += 2; a = { t: 'c', a: a }; }
        else if (s.charAt(p) === "'" || s.charAt(p) === '’') { p++; a = { t: 'c', a: a }; }
        else return a;
      }
    }
    try { var r = expr(); ws(); if (p < s.length) return { error: T('Expression illisible.') }; return r; }
    catch (e) { return { error: T('Expression illisible.') }; }
  }
  function szones(t, n) {
    var full = (1 << (1 << n)) - 1;
    switch (t.t) {
      case 'all': return full;
      case 'empty': return 0;
      case 's': { var m = 0; for (var z = 0; z < (1 << n); z++) if ((z >> t.k) & 1) m |= 1 << z; return m; }
      case 'c': return full & ~szones(t.a, n);
      case 'u': return szones(t.a, n) | szones(t.b, n);
      case 'i': return szones(t.a, n) & szones(t.b, n);
      case 'd': return szones(t.a, n) & ~szones(t.b, n);
    }
    return 0;
  }
  function stex(t, names, u) {
    function w(x, p) { var s = stex(x, names, u); return (x.t === 'u' || x.t === 'd' || x.t === 'i') && x.t !== p ? '(' + s + ')' : (x.t === 'd' && p === 'd') ? '(' + s + ')' : s; }
    switch (t.t) {
      case 'all': return u === 'Ω' ? '\\Omega' : u;
      case 'empty': return '\\varnothing';
      case 's': return names[t.k];
      case 'c': return '\\overline{' + stex(t.a, names, u) + '}';
      case 'u': return w(t.a, 'u') + ' \\cup ' + w(t.b, 'u');
      case 'i': return w(t.a, 'i') + ' \\cap ' + w(t.b, 'i');
      case 'd': return w(t.a, 'x') + ' \\setminus ' + w(t.b, 'x');
    }
    return '';
  }
  /* la plus courte écriture d'un ensemble de zones (recherche en largeur, mémorisée par n) */
  var NAMECACHE = {};
  function sname(mask, names, u) {
    var n = names.length, key = n + ':' + names.join('') + ':' + u, best = NAMECACHE[key];
    if (!best) {
      best = {};
      var full = (1 << (1 << n)) - 1;
      var put = function (m, t, cost) { if (!best[m] || best[m].cost > cost) { best[m] = { t: t, cost: cost }; return true; } return false; };
      put(0, { t: 'empty' }, 1); put(full, { t: 'all' }, 1);
      for (var k = 0; k < n; k++) { var s = { t: 's', k: k }; put(szones(s, n), s, 1); put(szones({ t: 'c', a: s }, n), { t: 'c', a: s }, 2); }
      for (var round = 0; round < 8; round++) {
        var cur = Object.keys(best).map(function (m) { return [+m, best[m]]; }), changed = false;
        for (var i = 0; i < cur.length; i++) {
          var A = cur[i];
          changed = put(full & ~A[0], { t: 'c', a: A[1].t }, A[1].cost + 1) || changed;
          for (var j = 0; j < cur.length; j++) {
            var B = cur[j], c = A[1].cost + B[1].cost + 1;
            if (c > 17) continue;
            if (i < j) { changed = put(A[0] | B[0], { t: 'u', a: A[1].t, b: B[1].t }, c) || changed; changed = put(A[0] & B[0], { t: 'i', a: A[1].t, b: B[1].t }, c) || changed; }
            if (i !== j) changed = put(A[0] & ~B[0], { t: 'd', a: A[1].t, b: B[1].t }, c + 0.5) || changed;
          }
        }
        if (!changed) break;
      }
      NAMECACHE[key] = best;
    }
    if (best[mask]) return stex(best[mask].t, names, u);
    var parts = [];   /* dernier recours : la réunion des zones */
    for (var z = 0; z < (1 << n); z++) if ((mask >> z) & 1) parts.push(zoneTex(z, names, n));
    return parts.map(function (x) { return parts.length > 1 ? '(' + x + ')' : x; }).join(' \\cup ');
  }
  /* effectifs des zones à partir des cardinaux donnés (A, B, AB, …, E) : inversion du crible */
  function zoneCounts(sizes, names) {
    var n = names.length, out = [];
    function inter(mask) {   /* |∩ des ensembles de mask| ; mask 0 : E */
      if (!mask) return sizes.E != null ? frac(sizes.E) : null;
      var key = names.filter(function (x, i) { return (mask >> i) & 1; }).join('');
      var v = sizes[key];
      if (v == null) { var alt = Object.keys(sizes).filter(function (k) { return k.split('').sort().join('') === key.split('').sort().join(''); })[0]; v = alt != null ? sizes[alt] : null; }
      return v == null ? null : frac(v);
    }
    for (var z = 0; z < (1 << n); z++) {
      var tot = F(0), ok = true;
      for (var sup = 0; sup < (1 << n); sup++) {
        if ((sup & z) !== z) continue;
        var v = inter(sup);
        if (v == null) { ok = false; break; }
        var extra = 0; for (var b = 0; b < n; b++) if (((sup ^ z) >> b) & 1) extra++;
        tot = extra % 2 ? fr.sub(tot, v) : fr.add(tot, v);
      }
      out.push(ok ? tot : null);
    }
    if (out.some(function (v) { return v && v.n < Z; })) return { error: T('Effectifs incohérents : une zone aurait un effectif négatif.'), zones: out };
    return { zones: out };
  }

  /* ================================================================== 5. APPLICATIONS (sagittal) */
  function imgs(f, x) { var v = f[x]; return v == null ? [] : Array.isArray(v) ? v : [v]; }
  function fprops(o) {
    var E = o.E, Fs = o.F, f = o.f || {}, res = { app: true, inj: true, surj: true, noImg: [], multi: [], collide: null, noPre: [] };
    E.forEach(function (x) { var l = imgs(f, x); if (!l.length) res.noImg.push(x); if (l.length > 1) res.multi.push(x); });
    res.app = !res.noImg.length && !res.multi.length;
    var seen = {};
    E.forEach(function (x) { imgs(f, x).forEach(function (y) { if (seen[y] != null && seen[y] !== x && !res.collide) res.collide = [seen[y], x, y]; if (seen[y] == null) seen[y] = x; }); });
    res.inj = !res.collide;
    Fs.forEach(function (y) { if (seen[y] == null) res.noPre.push(y); });
    res.surj = !res.noPre.length;
    res.bij = res.app && res.inj && res.surj;
    return res;
  }
  function fimage(f, A) { var out = []; A.forEach(function (x) { imgs(f, x).forEach(function (y) { if (out.indexOf(y) < 0) out.push(y); }); }); return out; }
  function fpre(E, f, B) { return E.filter(function (x) { return imgs(f, x).some(function (y) { return B.indexOf(y) >= 0; }); }); }

  /* ================================================================== 6. ARBRE PONDÉRÉ */
  function tcompute(o) {
    var first = (o.first || []).map(function (b) { return { n: b.n, p: b.p == null || b.p === '' ? null : frac(b.p), raw: b.p }; });
    var err = null;
    first.forEach(function (b) { if (b.raw != null && b.raw !== '' && !b.p) err = T('Probabilité illisible : « {v} ».', { v: b.raw }); });
    var miss = first.filter(function (b) { return !b.p; });
    if (!err && miss.length === 1) miss[0].p = fr.sub(F(1), fr.sum(first.filter(function (b) { return b.p; }).map(function (b) { return b.p; })));
    else if (!err && miss.length > 1) err = T('Les probabilités des branches issues d’un même nœud doivent avoir pour somme 1.');
    var sec = o.second || {}, cond = (sec.p || []).map(function (v) { var f = frac(v); if (!f && !err) err = T('Probabilité illisible : « {v} ».', { v: v }); return f; });
    var all = first.map(function (b) { return b.p; }).concat(cond);
    if (!err && all.some(function (p) { return !p || p.n < Z || fr.cmp(p, F(1)) > 0; })) err = T('Une probabilité est entre 0 et 1.');
    if (!err && !fr.eq(fr.sum(first.map(function (b) { return b.p; })), F(1))) err = T('Les probabilités des branches issues d’un même nœud doivent avoir pour somme 1.');
    if (err) return { error: err, first: first, cond: cond };
    var joint = first.map(function (b, i) { var c = cond[i]; return { B: fr.mul(b.p, c), nB: fr.mul(b.p, fr.sub(F(1), c)) }; });
    var total = fr.sum(joint.map(function (j) { return j.B; })), totalNB = fr.sub(F(1), total);
    var bayes = joint.map(function (j) { return { B: fr.isZero(total) ? null : fr.div(j.B, total), nB: fr.isZero(totalNB) ? null : fr.div(j.nB, totalNB) }; });
    return { first: first, cond: cond, joint: joint, total: total, totalNB: totalNB, bayes: bayes };
  }

  /* ================================================================== 7. LOI D'UNE VARIABLE ALÉATOIRE */
  function lawMake(o) {
    var xs, ps, err = null;
    if (o.law === 'binom') {
      var n = parseInt(o.n, 10), p = frac(o.p);
      if (!(n >= 1 && n <= 40) || !p || p.n < Z || fr.cmp(p, F(1)) > 0) return { error: T('Paramètres illisibles.') };
      xs = []; ps = [];
      for (var k = 0; k <= n; k++) { xs.push(BigInt(k)); ps.push(fr.mul(F(binom(n, k)), fr.mul(fr.pow(p, k), fr.pow(fr.sub(F(1), p), n - k)))); }
    } else if (o.law === 'bern') {
      var q = frac(o.p);
      if (!q || q.n < Z || fr.cmp(q, F(1)) > 0) return { error: T('Paramètres illisibles.') };
      xs = [0n, 1n]; ps = [fr.sub(F(1), q), q];
    } else if (o.law === 'unif') {
      var a = parseInt(o.a, 10), b = parseInt(o.b, 10);
      if (!(isFinite(a) && isFinite(b) && b >= a && b - a <= 40)) return { error: T('Paramètres illisibles.') };
      xs = []; ps = [];
      for (var v = a; v <= b; v++) { xs.push(BigInt(v)); ps.push(F(1, b - a + 1)); }
    } else {
      xs = (o.x || []).map(function (v) { var f = frac(v); return f; });
      ps = (o.p || []).map(function (v) { return frac(v); });
      if (!xs.length || xs.length !== ps.length || xs.some(function (x) { return !x; }) || ps.some(function (x) { return !x || x.n < Z; })) return { error: T('Paramètres illisibles.') };
    }
    xs = xs.map(function (x) { return isF(x) ? x : F(x); });
    var sum = fr.sum(ps);
    if (!fr.eq(sum, F(1))) err = T('La somme des probabilités vaut {s}, pas 1.', { s: fr.str(sum) });
    var E = fr.sum(xs.map(function (x, i) { return fr.mul(x, ps[i]); }));
    var E2 = fr.sum(xs.map(function (x, i) { return fr.mul(fr.mul(x, x), ps[i]); }));
    var V = fr.sub(E2, fr.mul(E, E));
    return { x: xs, p: ps, sum: sum, E: E, E2: E2, V: V, sd: fr.sqrt(V), error: err };
  }

  /* ================================================================== 8. OUTILS (visuels) */
  function head(title, right) {
    return '<div class="bench-head"><span class="bh-t"><span>' + title + '</span></span>' + (right ? '<span class="bh-r">' + right + '</span>' : '') + '</div>';
  }
  /* stepper(el, total, paint, start, offset) : paint(k) dessine l'état après k étapes ; offset décale le numéro affiché */
  function stepper(el, total, paint, start, offset) {
    var k = start == null ? 0 : start, off = offset || 0;
    var c = document.createElement('div');
    c.className = 'ctrls';
    c.innerHTML = '<div class="row">' +
      '<button type="button" class="btn" data-a="prev">' + T('Précédent') + '</button>' +
      '<button type="button" class="btn primary" data-a="next">' + T('Suivant') + '</button>' +
      '<button type="button" class="btn" data-a="end">' + T('Tout afficher') + '</button>' +
      '<button type="button" class="btn ghost" data-a="reset">' + T('Recommencer') + '</button>' +
      '<span class="cnt"></span></div>';
    el.appendChild(c);
    function go(j) {
      k = Math.max(0, Math.min(total, j));
      paint(k);
      c.querySelector('[data-a="prev"]').disabled = k <= 0;
      c.querySelector('[data-a="next"]').disabled = c.querySelector('[data-a="end"]').disabled = k >= total;
      c.querySelector('.cnt').textContent = T('étape {i} / {n}', { i: k + off, n: total + off });
    }
    c.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      go(a === 'prev' ? k - 1 : a === 'next' ? k + 1 : a === 'end' ? total : start == null ? 0 : start);
    });
    go(k);
    return { go: go, get: function () { return k; }, el: c, setTotal: function (t) { total = t; go(Math.min(k, t)); } };
  }
  function presetsHTML(list, attr) {
    if (!list || !list.length) return '';
    return '<div class="presets"><span class="hint">' + T('Exemples :') + '</span>' + list.map(function (p, i) {
      var lab = typeof p === 'string' ? p : Array.isArray(p) ? p.join('  ·  ') : p.label || p.src || (Array.isArray(p.f) ? p.f.join('  ·  ') : p.f);
      return '<button type="button" class="chip-btn" ' + attr + '="' + i + '">' + (typeof p === 'object' && p.tex ? tx(p.tex) : esc(lab)) + '</button>';
    }).join('') + '</div>';
  }
  function VF(b) { return '<span class="' + (b ? 'V' : 'F') + '">' + T(b ? 'V' : 'F') + '</span>'; }

  /* ---------- table de vérité ---------- */
  function truth(el, o) {
    o = o || {};
    var list = Array.isArray(o.f) ? o.f.slice() : [o.f || 'P => Q'];
    var edit = o.edit !== false, sub = o.sub !== false, quiz = !!o.quiz, presets = o.presets || null, guess = {};
    el.classList.add('bench', 'tvb');
    el.innerHTML = head(o.title || T('Table de vérité'), '') + '<div class="bench-body">' +
      (edit ? '<div class="fld-grid">' + list.map(function (f, i) { return '<label class="fld"><span>' + T('Formule') + (list.length > 1 ? ' ' + (i + 1) : '') + '</span><input type="text" spellcheck="false" autocomplete="off" data-i="' + i + '" value="' + esc(f) + '"></label>'; }).join('') + '</div>' +
        '<p class="hint">' + esc(T('Connecteurs : ¬ ou !, ∧ ou &, ∨ ou |, ⇒ ou =>, ⇔ ou <=>. Variables : une lettre (P, Q, R…).')) + '</p>' + presetsHTML(presets, 'data-p') : '') +
      '<div class="tv-scroll"></div><div class="readout" aria-live="polite"></div></div>' +
      (quiz ? '<div class="ctrls"><div class="row"><button type="button" class="btn primary" data-a="check">' + T('Vérifier') + '</button><button type="button" class="btn" data-a="sol">' + T('Solution') + '</button><span class="cnt"></span></div></div>' : '');
    var box = el.querySelector('.tv-scroll'), out = el.querySelector('.readout'), tab = null, sel = -1;
    function build() {
      tab = ltable(list); sel = -1; guess = {};
      if (tab.error) { box.innerHTML = ''; out.innerHTML = '<span class="err">' + esc(tab.error) + '</span>'; return; }
      var cols = tab.cols, fin = tab.finals, quizCols = quiz ? fin.filter(function (x, i, a) { return a.indexOf(x) === i; }) : [];
      var h = '<table class="tv"><thead><tr>' + tab.vars.map(function (v) { return '<th scope="col" class="var">' + tx(v) + '</th>'; }).join('');
      cols.forEach(function (c, j) { if (!sub && !c.fin) return; h += '<th scope="col" class="' + (c.fin ? 'fin' : 'sub') + '">' + tx(c.tex) + '</th>'; });
      h += '</tr></thead><tbody>';
      tab.rows.forEach(function (r, i) {
        h += '<tr data-r="' + i + '">' + tab.vars.map(function (v) { return '<td class="var">' + VF(r.env[v]) + '</td>'; }).join('');
        r.vals.forEach(function (b, j) {
          var c = cols[j]; if (!sub && !c.fin) return;
          h += '<td class="' + (c.fin ? 'fin' : 'sub') + '">' + (quizCols.indexOf(j) >= 0 ? '<button type="button" class="cell" data-c="' + i + ':' + j + '" aria-label="' + esc(T('case vide')) + '">?</button>' : VF(b)) + '</td>';
        });
        h += '</tr>';
      });
      box.innerHTML = h + '</tbody></table>';
      say();
    }
    function verdict() {
      if (tab.same != null) {
        var a = tx(tab.cols[tab.finals[0]].tex), b = tx(tab.cols[tab.finals[1]].tex);
        return tab.same ? T('Les colonnes {a} et {b} sont identiques à chaque ligne : les deux propositions sont équivalentes.', { a: a, b: b })
          : T('Les colonnes {a} et {b} diffèrent à la ligne {i} : les deux propositions ne sont pas équivalentes.', { a: a, b: b, i: tab.diff.map(function (x) { return x + 1; }).join(', ') });
      }
      var f = tab.finals[0], all = tab.rows.every(function (r) { return r.vals[f]; }), none = tab.rows.every(function (r) { return !r.vals[f]; });
      return all ? T('Vraie à toutes les lignes : c’est une tautologie.') : none ? T('Fausse à toutes les lignes : c’est une contradiction.') : '';
    }
    function say() {
      var k = tab.vars.length, h = '<p class="hint">' + (k === 1 ? T('1 variable : 2 lignes.') : T('{k} variables : {n} lignes, une par combinaison de valeurs.', { k: k, n: 1 << k })) + ' ' + (quiz ? T('Remplis la dernière colonne (clique : V, F), puis vérifie.') : T('Clique sur une ligne pour la lire.')) + '</p>';
      if (sel >= 0) {
        var r = tab.rows[sel];
        var env = tab.vars.map(function (v) { return tx(v) + ' ' + (r.env[v] ? T('vraie') : T('fausse')); }).join(', ');
        var res = tab.finals.filter(function (x, i, a) { return a.indexOf(x) === i; }).map(function (j) { return tx(tab.cols[j].tex) + ' ' + (r.vals[j] ? T('vraie') : T('fausse')); }).join(' ; ');
        h += '<p>' + T('Ligne {i} : {env}. {res}', { i: sel + 1, env: env, res: res }) + '.</p>';
      }
      if (!quiz) { var v = verdict(); if (v) h += '<p><b>' + v + '</b></p>'; }
      out.innerHTML = h;
    }
    box.addEventListener('click', function (e) {
      var c = e.target.closest('button.cell');
      if (c) {
        var key = c.getAttribute('data-c'), cur = guess[key];
        guess[key] = cur === true ? false : cur === false ? undefined : true;
        c.className = 'cell' + (guess[key] === true ? ' V' : guess[key] === false ? ' F' : '');
        c.textContent = guess[key] === true ? T('V') : guess[key] === false ? T('F') : '?';
        c.setAttribute('aria-label', guess[key] == null ? T('case vide') : guess[key] ? T('vrai') : T('faux'));
        return;
      }
      var tr = e.target.closest('tr[data-r]');
      if (tr && tab && !tab.error) {
        sel = +tr.getAttribute('data-r');
        U.$$('tr[data-r]', box).forEach(function (x) { x.classList.toggle('hit', x === tr); });
        say();
      }
    });
    if (quiz) el.querySelector('.ctrls').addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b || !tab || tab.error) return;
      var cells = U.$$('button.cell', box), ok = 0, empty = 0;
      cells.forEach(function (c) {
        var p = c.getAttribute('data-c').split(':'), want = tab.rows[+p[0]].vals[+p[1]], key = c.getAttribute('data-c');
        if (b.getAttribute('data-a') === 'sol') { guess[key] = want; c.className = 'cell ' + (want ? 'V' : 'F'); c.textContent = T(want ? 'V' : 'F'); }
        var g = guess[key];
        if (g == null) empty++;
        c.classList.toggle('good', g === want); c.classList.toggle('wrong', g != null && g !== want);
        if (g === want) ok++;
      });
      el.querySelector('.ctrls .cnt').textContent = T('{ok} / {n} cases justes.', { ok: ok, n: cells.length });
      var v = verdict();
      out.innerHTML = '<p><b>' + (ok === cells.length ? T('Tout est juste.') : empty ? T('Il reste des cases vides.') : '') + '</b></p>' + (ok === cells.length && v ? '<p>' + v + '</p>' : '');
    });
    if (edit) {
      U.$$('input[data-i]', el).forEach(function (inp) { inp.addEventListener('input', function () { list[+inp.getAttribute('data-i')] = inp.value; build(); }); });
      if (presets) U.$$('[data-p]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var p = presets[+b.getAttribute('data-p')], v = Array.isArray(p) ? p : typeof p === 'object' ? p.f : p;
          v = Array.isArray(v) ? v : [v];
          U.$$('input[data-i]', el).forEach(function (inp, i) { if (v[i] != null) { inp.value = v[i]; list[i] = v[i]; } });
          build();
        });
      });
    }
    build();
    return { el: el, table: function () { return tab; } };
  }

  /* ---------- négation pas à pas ---------- */
  function negate(el, o) {
    o = o || {};
    var src = o.src || '\\forall x \\in \\R, \\exists y \\in \\R, x + y > 0', edit = o.edit !== false, presets = o.presets || null;
    el.classList.add('bench', 'ngb');
    el.innerHTML = head(o.title || T('Négation pas à pas'), '') + '<div class="bench-body">' +
      (edit ? '<label class="fld"><span>' + T('Phrase') + '</span><input type="text" spellcheck="false" autocomplete="off" value="' + esc(src) + '"></label>' +
        '<p class="hint">' + esc(T('Écris une phrase avec \\forall, \\exists, \\in, \\Rightarrow, \\land, \\lor, \\neg (ou ∀ ∃ ∈ ⇒ ∧ ∨ ¬, ou forall, exists, in, =>, et, ou, non).')) + '</p>' + presetsHTML(presets, 'data-p') : '') +
      '<div class="ng-src"></div><ol class="ng-steps"></ol><div class="readout ng-out" aria-live="polite"></div></div>';
    var list = el.querySelector('.ng-steps'), out = el.querySelector('.ng-out'), srcBox = el.querySelector('.ng-src'), res = null, st = null;
    function paint(k) {
      if (!res || res.error) return;
      U.$$('li', list).forEach(function (li, i) { li.classList.toggle('later', i > k); li.classList.toggle('now', i === k); });
      out.innerHTML = k >= res.steps.length - 1 ? '<p><b>' + T('Négation :') + '</b></p><p class="ng-res">' + tx(res.result) + '</p>' : (k === 0 ? '<p class="hint">' + T('Appuie sur « Suivant » pour la première règle.') + '</p>' : '');
    }
    function build() {
      res = qnegate(src);
      if (res.error) { srcBox.innerHTML = ''; list.innerHTML = ''; out.innerHTML = '<span class="err">' + esc(T('Phrase illisible : {m}', { m: res.error })) + '</span>'; if (st) st.setTotal(0); return; }
      srcBox.innerHTML = '<p class="ng-res">' + tx(res.source) + '</p>';
      list.innerHTML = res.steps.map(function (s) { return '<li><div class="ng-f">' + tx(s.tex) + '</div><div class="ng-rule">' + mathify(s.rule) + '</div></li>'; }).join('');
      if (!st) st = stepper(el, res.steps.length - 1, paint, 0, 1); else { st.setTotal(res.steps.length - 1); st.go(0); }
    }
    if (edit) {
      el.querySelector('input').addEventListener('input', function (e) { src = e.target.value; build(); });
      if (presets) U.$$('[data-p]', el).forEach(function (b) { b.addEventListener('click', function () { var p = presets[+b.getAttribute('data-p')]; src = typeof p === 'object' ? p.src : p; el.querySelector('input').value = src; build(); }); });
    }
    build();
    return { el: el, result: function () { return res; } };
  }

  /* ---------- diagramme de Venn ---------- */
  var VG = {
    2: { w: 400, h: 250, c: [[150, 128, 88], [250, 128, 88]], lab: [[92, 52], [308, 52]], zl: { 0: [40, 225], 1: [112, 132], 2: [288, 132], 3: [200, 132] } },
    3: { w: 400, h: 330, c: [[160, 125, 85], [240, 125, 85], [200, 195, 85]], lab: [[88, 52], [312, 52], [200, 312]], zl: { 0: [36, 312], 1: [128, 102], 2: [272, 102], 3: [200, 92], 4: [200, 240], 5: [150, 178], 6: [250, 178], 7: [200, 160] } }
  };
  function zoneOf(x, y, g, n) { var z = 0; for (var i = 0; i < n; i++) { var c = g.c[i], dx = x - c[0], dy = y - c[1]; if (dx * dx + dy * dy <= c[2] * c[2]) z |= 1 << i; } return z; }
  function zoneTex(z, names, n) { var parts = []; for (var i = 0; i < n; i++) parts.push((z >> i) & 1 ? names[i] : '\\overline{' + names[i] + '}'); return parts.join(' \\cap '); }
  function vennSVG(id, n, names, u, mask, counts) {
    var g = VG[n], h = '<svg viewBox="0 0 ' + g.w + ' ' + g.h + '" role="group" aria-label="' + esc(T('Diagramme de Venn')) + '"><defs>';
    for (var i = 0; i < n; i++) {
      var c = g.c[i];
      h += '<clipPath id="' + id + 'in' + i + '"><circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/></clipPath>';
      h += '<clipPath id="' + id + 'out' + i + '"><path clip-rule="evenodd" d="M0 0H' + g.w + 'V' + g.h + 'H0Z M' + (c[0] - c[2]) + ' ' + c[1] + 'a' + c[2] + ' ' + c[2] + ' 0 1 0 ' + (2 * c[2]) + ' 0a' + c[2] + ' ' + c[2] + ' 0 1 0 ' + (-2 * c[2]) + ' 0Z"/></clipPath>';
    }
    h += '</defs><rect class="vn-u" x="6" y="6" width="' + (g.w - 12) + '" height="' + (g.h - 12) + '" rx="10"/>';
    for (var z = 0; z < (1 << n); z++) {
      var open = '', close = '';
      for (var k = 0; k < n; k++) { open += '<g clip-path="url(#' + id + ((z >> k) & 1 ? 'in' : 'out') + k + ')">'; close += '</g>'; }
      h += open + '<rect class="vn-zone' + ((mask >> z) & 1 ? ' on' : '') + '" data-z="' + z + '" x="7" y="7" width="' + (g.w - 14) + '" height="' + (g.h - 14) + '" rx="9" tabindex="0" role="button" aria-pressed="' + !!((mask >> z) & 1) + '" aria-label="' + esc(T('zone {z}', { z: zoneTex(z, names, n).replace(/\\overline\{(\w)\}/g, '$1̄').replace(/\\cap/g, '∩') })) + '"/>' + close;
    }
    for (var j = 0; j < n; j++) { var cc = g.c[j]; h += '<circle class="vn-set s' + j + '" cx="' + cc[0] + '" cy="' + cc[1] + '" r="' + cc[2] + '"/><text class="vn-name s' + j + '" x="' + g.lab[j][0] + '" y="' + g.lab[j][1] + '" text-anchor="middle">' + esc(names[j]) + '</text>'; }
    h += '<text class="vn-name u" x="' + (g.w - 22) + '" y="30" text-anchor="end">' + esc(u === '\\Omega' ? 'Ω' : u) + '</text>';
    if (counts) for (var q = 0; q < (1 << n); q++) if (counts[q]) h += '<text class="vn-card" x="' + g.zl[q][0] + '" y="' + (g.zl[q][1] + 5) + '">' + esc(fr.str(counts[q])) + '</text>';
    return h + '</svg>';
  }
  var vuid = 0;
  function venn(el, o) {
    o = o || {};
    var n = o.n === 3 || (o.names && o.names.length === 3) ? 3 : 2, names = (o.names || ['A', 'B', 'C']).slice(0, n), u = o.u || 'E';
    var id = 'vn' + (++vuid) + '-', edit = o.edit !== false, mask = 0, counts = null, cerr = null;
    if (o.sizes) { var zc = zoneCounts(o.sizes, names); counts = zc.zones; cerr = zc.error || null; }
    el.classList.add('bench', 'vnb');
    if (o.compare) {
      var A = sparse(o.compare[0], names, u), B = sparse(o.compare[1], names, u);
      if (A.error || B.error) { el.innerHTML = head(o.title || T('Diagramme de Venn'), '') + '<div class="bench-body"><p class="err">' + esc(T('Expression illisible.')) + '</p></div>'; return null; }
      var mA = szones(A, n), mB = szones(B, n);
      el.innerHTML = head(o.title || T('Diagramme de Venn'), '') + '<div class="bench-body"><div class="grid2">' +
        [[A, mA], [B, mB]].map(function (x, i) { return '<figure style="margin:0"><div class="fig">' + vennSVG(id + i, n, names, u, x[1], null) + '</div><figcaption class="fm" style="text-align:center">' + tx(stex(x[0], names, u)) + '</figcaption></figure>'; }).join('') +
        '</div><p class="readout"><b>' + (mA === mB ? T('Mêmes zones : les deux ensembles sont égaux.') : T('Zones différentes : les deux ensembles ne sont pas égaux.')) + '</b></p></div>';
      U.$$('.vn-zone', el).forEach(function (r) { r.removeAttribute('tabindex'); r.removeAttribute('role'); r.style.cursor = 'default'; });
      return { el: el, same: mA === mB };
    }
    el.innerHTML = head(o.title || T('Diagramme de Venn'), '') + '<div class="bench-body">' +
      (edit ? '<div class="fld-row"><label class="fld"><span>' + T('Ensemble') + '</span><input type="text" spellcheck="false" autocomplete="off" value="' + esc(o.expr || '') + '"></label><button type="button" class="btn" data-a="clear">' + T('Effacer') + '</button></div>' +
        '<p class="hint">' + esc(T('Opérations : ∪ ou |, ∩ ou &, \\ ou -, complémentaire : A\' ou !A ou \\overline{A}.')) + '</p>' : '') +
      '<div class="fig"></div><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout'), inp = el.querySelector('input');
    function draw() { fig.innerHTML = vennSVG(id, n, names, u, mask, counts); say(); }
    function say(err) {
      var h = '';
      if (err) h += '<p class="err">' + esc(err) + '</p>';
      else if (!mask) h += '<p class="hint">' + T('Clique sur les zones pour les colorier, ou tape une expression.') + '</p>';
      else h += '<p>' + T('Zones coloriées : {e}', { e: tx(sname(mask, names, u) || '') }) + '</p>';
      if (cerr) h += '<p class="err">' + esc(cerr) + '</p>';
      else if (counts && mask && !err) {
        var c = F(0), okc = true;
        for (var z = 0; z < (1 << n); z++) if ((mask >> z) & 1) { if (!counts[z]) { okc = false; break; } c = fr.add(c, counts[z]); }
        if (okc) h += '<p>' + T('Cardinal : {c}', { c: tx('\\card\\left(' + (sname(mask, names, u) || '') + '\\right) = ' + fr.tex(c)) }) + '</p>';
      }
      if (counts && !cerr) h += crible();
      out.innerHTML = h;
    }
    function inter(sub) { var c = F(0), ok = true; for (var z = 0; z < (1 << n); z++) if ((z & sub) === sub) { if (!counts[z]) ok = false; else c = fr.add(c, counts[z]); } return ok ? c : null; }
    function crible() {
      var subs = []; for (var s = 1; s < (1 << n); s++) subs.push(s);
      subs.sort(function (a, b) { return bits(a) - bits(b) || a - b; });
      var lhs = '\\card(' + names.join(' \\cup ') + ')', t1 = '', t2 = '', tot = F(0);
      for (var i = 0; i < subs.length; i++) {
        var v = inter(subs[i]); if (!v) return '';
        var sg = bits(subs[i]) % 2 ? '+' : '-', nm = names.filter(function (x, k) { return (subs[i] >> k) & 1; }).join(' \\cap ');
        t1 += (i ? ' ' + sg + ' ' : '') + '\\card(' + nm + ')'; t2 += (i ? ' ' + sg + ' ' : '') + fr.tex(v);
        tot = sg === '+' ? fr.add(tot, v) : fr.sub(tot, v);
      }
      return '<p>' + T('Formule du crible : ') + '</p><div class="fm">' + tx(lhs + ' = ' + t1, true) + '</div><div class="fm">' + tx('= ' + t2 + ' = ' + fr.tex(tot), true) + '</div>';
    }
    function bits(x) { var c = 0; while (x) { c += x & 1; x >>= 1; } return c; }
    function fromExpr(v) {
      if (!v.trim()) { mask = 0; draw(); return; }
      var t = sparse(v, names, u);
      if (t.error) { say(t.error); return; }
      mask = szones(t, n); draw();
    }
    function toggle(z) { mask ^= 1 << z; if (inp) inp.value = mask ? sname(mask, names, u) || '' : ''; draw(); var r = fig.querySelector('[data-z="' + z + '"]'); if (r) r.focus({ preventScroll: true }); }
    fig.addEventListener('click', function (e) {
      var svg = fig.querySelector('svg'); if (!svg || !svg.getScreenCTM) return;
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      var m = svg.getScreenCTM(); if (!m) return;
      var p = pt.matrixTransform(m.inverse()), g = VG[n];
      if (p.x < 6 || p.y < 6 || p.x > g.w - 6 || p.y > g.h - 6) return;
      toggle(zoneOf(p.x, p.y, g, n));
    });
    fig.addEventListener('keydown', function (e) { var r = e.target.closest && e.target.closest('[data-z]'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(+r.getAttribute('data-z')); } });
    if (inp) inp.addEventListener('input', function () { fromExpr(inp.value); });
    var cl = el.querySelector('[data-a="clear"]'); if (cl) cl.addEventListener('click', function () { mask = 0; if (inp) inp.value = ''; draw(); });
    if (o.expr) fromExpr(o.expr); else draw();
    return { el: el, mask: function () { return mask; } };
  }

  /* ---------- diagramme sagittal ---------- */
  function sagittal(el, o) {
    o = o || {};
    var E = (o.E || ['a', 'b', 'c', 'd']).map(String), Fs = (o.F || ['1', '2', '3', '4']).map(String), f = {}, nm = o.names || ['E', 'F', 'f'];
    Object.keys(o.f || {}).forEach(function (k) { f[k] = o.f[k] == null ? null : Array.isArray(o.f[k]) ? o.f[k].map(String) : String(o.f[k]); });
    var mode = o.mode || 'props', A = (o.A || []).map(String), B = (o.B || []).map(String), pick = null;
    var modes = o.modes || ['props', 'image', 'preimage'].concat(o.edit ? ['edit'] : []);
    var LAB = { props: T('Propriétés'), image: T('Image directe'), preimage: T('Image réciproque'), edit: T('Modifier les flèches') };
    el.classList.add('bench', 'sgb');
    el.innerHTML = head(o.title || T('Diagramme sagittal'), '') + '<div class="bench-body">' +
      (modes.length > 1 ? '<div class="row" role="group">' + modes.map(function (m) { return '<button type="button" class="chip-btn" data-m="' + m + '" aria-pressed="' + (m === mode) + '">' + LAB[m] + '</button>'; }).join('') + '</div>' : '') +
      '<div class="fig"></div><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout');
    var GAP = 46, W = 420, top = 54, H = Math.max(E.length, Fs.length) * GAP + top + 20, XE = 100, XF = 320;
    function ys(list) { var off = top + (Math.max(E.length, Fs.length) - list.length) * GAP / 2; return list.map(function (x, i) { return off + i * GAP + GAP / 2; }); }
    function setTex(l) { return l.length ? '\\{' + l.map(lbl).join(',\\ ') + '\\}' : '\\varnothing'; }
    function lbl(x) { return /^[A-Za-z]$/.test(x) || /^-?\d+$/.test(x) ? x : '\\text{' + x + '}'; }
    function draw() {
      var yE = ys(E), yF = ys(Fs), img = fimage(f, A), pre = fpre(E, f, B), pr = fprops({ E: E, F: Fs, f: f });
      var h = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + esc(T('Diagramme sagittal')) + '"><defs><marker id="sgm' + el.__sid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sg-mk" d="M0 0L10 5L0 10z"/></marker><marker id="sgh' + el.__sid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sg-mk hl" d="M0 0L10 5L0 10z"/></marker></defs>';
      var ry = (H - top) / 2 + 6;
      h += '<ellipse class="sg-oval" cx="' + XE + '" cy="' + (top + (H - top - 20) / 2) + '" rx="62" ry="' + ry + '"/><ellipse class="sg-oval" cx="' + XF + '" cy="' + (top + (H - top - 20) / 2) + '" rx="62" ry="' + ry + '"/>';
      h += '<text class="sg-name" x="' + XE + '" y="26">' + esc(nm[0]) + '</text><text class="sg-name" x="' + XF + '" y="26">' + esc(nm[1]) + '</text>';
      h += '<text class="sg-name" x="' + ((XE + XF) / 2) + '" y="26" style="font-size:17px">' + esc(nm[2]) + '</text><path class="sg-ar" d="M' + (XE + 40) + ' 34H' + (XF - 40) + '" marker-end="url(#sgm' + el.__sid + ')"/>';
      E.forEach(function (x, i) {
        imgs(f, x).forEach(function (y) {
          var j = Fs.indexOf(y); if (j < 0) return;
          var x1 = XE + 15, y1 = yE[i], x2 = XF - 16, y2 = yF[j], mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 10;
          var hl = (mode === 'image' && A.indexOf(x) >= 0) || (mode === 'preimage' && B.indexOf(y) >= 0) || (mode === 'props' && pr.collide && pr.collide[2] === y);
          h += '<path class="sg-ar' + (hl ? ' hl' : '') + '" d="M' + x1 + ' ' + y1 + 'Q' + mx + ' ' + my + ' ' + x2 + ' ' + y2 + '" marker-end="url(#' + (hl ? 'sgh' : 'sgm') + el.__sid + ')"/>';
        });
      });
      E.forEach(function (x, i) {
        var c = (mode === 'image' && A.indexOf(x) >= 0) ? 'sel' : (mode === 'preimage' && pre.indexOf(x) >= 0) ? 'img' : (mode === 'edit' && pick === x) ? 'pick' : (mode === 'props' && (pr.noImg.indexOf(x) >= 0 || pr.multi.indexOf(x) >= 0 || (pr.collide && (pr.collide[0] === x || pr.collide[1] === x)))) ? 'bad' : '';
        h += '<g class="sg-el ' + c + '" data-e="' + i + '" tabindex="0" role="button" aria-label="' + esc(nm[0] + ' : ' + x) + '"><circle cx="' + XE + '" cy="' + yE[i] + '" r="15"/><text x="' + XE + '" y="' + (yE[i] + 6) + '">' + esc(x) + '</text></g>';
      });
      Fs.forEach(function (y, j) {
        var c = (mode === 'image' && img.indexOf(y) >= 0) ? 'img' : (mode === 'preimage' && B.indexOf(y) >= 0) ? 'sel' : (mode === 'props' && pr.noPre.indexOf(y) >= 0) ? 'bad' : '';
        h += '<g class="sg-el ' + c + '" data-f="' + j + '" tabindex="0" role="button" aria-label="' + esc(nm[1] + ' : ' + y) + '"><circle cx="' + XF + '" cy="' + yF[j] + '" r="15"/><text x="' + XF + '" y="' + (yF[j] + 6) + '">' + esc(y) + '</text></g>';
      });
      fig.innerHTML = h + '</svg>';
      var t = '';
      if (mode === 'props') {
        var fN = tx(nm[2]), eN = tx(nm[0]), fN2 = tx(nm[1]);
        if (!pr.app) t += '<p>' + (pr.noImg.length ? T('{f} n’est pas une application : {x} n’a pas d’image.', { f: fN, x: tx(lbl(pr.noImg[0])) }) : T('{f} n’est pas une application : {x} a plusieurs images.', { f: fN, x: tx(lbl(pr.multi[0])) })) + '</p>';
        else {
          t += '<p>' + T('{f} est une application : chaque élément de {E} a exactement une image.', { f: fN, E: eN }) + '</p>';
          t += '<p>' + (pr.inj ? T('Injective : deux éléments distincts ont toujours des images distinctes.') : T('Pas injective : {x} ≠ {y} mais {fx} = {fy} = {z}.', { x: tx(lbl(pr.collide[0])), y: tx(lbl(pr.collide[1])), fx: tx(nm[2] + '(' + lbl(pr.collide[0]) + ')'), fy: tx(nm[2] + '(' + lbl(pr.collide[1]) + ')'), z: tx(lbl(pr.collide[2])) })) + '</p>';
          t += '<p>' + (pr.surj ? T('Surjective : chaque élément de {F} a au moins un antécédent.', { F: fN2 }) : T(pr.noPre.length > 1 ? 'Pas surjective : {y} n’ont pas d’antécédent.' : 'Pas surjective : {y} n’a pas d’antécédent.', { y: pr.noPre.map(function (y) { return tx(lbl(y)); }).join(', ') })) + '</p>';
          if (pr.bij) t += '<p><b>' + T('Bijective : injective et surjective.') + '</b></p>';
        }
      } else if (mode === 'image') {
        t += '<p class="hint">' + T('Clique sur des éléments de {E} : leurs images s’allument dans {F}.', { E: tx(nm[0]), F: tx(nm[1]) }) + '</p><div class="fm">' + tx(nm[2] + '\\left(' + setTex(A) + '\\right) = ' + setTex(Fs.filter(function (y) { return img.indexOf(y) >= 0; }))) + '</div>';
      } else if (mode === 'preimage') {
        t += '<p class="hint">' + T('Clique sur des éléments de {F} : leurs antécédents s’allument dans {E}.', { E: tx(nm[0]), F: tx(nm[1]) }) + '</p><div class="fm">' + tx(nm[2] + '^{-1}\\left(' + setTex(B) + '\\right) = ' + setTex(pre)) + '</div>';
      } else t += '<p class="hint">' + T('Clique sur un élément de {E}, puis sur son image dans {F} (recliquer sur la même image retire la flèche).', { E: tx(nm[0]), F: tx(nm[1]) }) + '</p>';
      out.innerHTML = t;
    }
    function act(g) {
      if (g.hasAttribute('data-e')) {
        var x = E[+g.getAttribute('data-e')];
        if (mode === 'image') { var i = A.indexOf(x); if (i >= 0) A.splice(i, 1); else A.push(x); A.sort(function (a, b) { return E.indexOf(a) - E.indexOf(b); }); }
        else if (mode === 'edit') pick = pick === x ? null : x;
        else return;
      } else {
        var y = Fs[+g.getAttribute('data-f')];
        if (mode === 'preimage') { var j = B.indexOf(y); if (j >= 0) B.splice(j, 1); else B.push(y); B.sort(function (a, b) { return Fs.indexOf(a) - Fs.indexOf(b); }); }
        else if (mode === 'edit' && pick != null) { f[pick] = f[pick] === y ? null : y; pick = null; }
        else return;
      }
      var key = g.hasAttribute('data-e') ? '[data-e="' + g.getAttribute('data-e') + '"]' : '[data-f="' + g.getAttribute('data-f') + '"]';
      draw(); var again = fig.querySelector(key); if (again) again.focus();
    }
    fig.addEventListener('click', function (e) { var g = e.target.closest('.sg-el'); if (g) act(g); });
    fig.addEventListener('keydown', function (e) { var g = e.target.closest && e.target.closest('.sg-el'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); act(g); } });
    U.$$('[data-m]', el).forEach(function (b) { b.addEventListener('click', function () { mode = b.getAttribute('data-m'); pick = null; U.$$('[data-m]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); draw(); }); });
    el.__sid = ++vuid;
    draw();
    return { el: el, props: function () { return fprops({ E: E, F: Fs, f: f }); } };
  }

  /* ---------- arbre pondéré ---------- */
  function svgName(t) {   /* \overline{A} → A surligné (SVG) */
    var m = /^\\overline\{(.+)\}$/.exec(t);
    var plain = function (s) { return esc(s.replace(/\\|[{}]/g, '').replace(/_(\w)/g, '$1')); };
    return m ? '<tspan style="text-decoration:overline">' + plain(m[1]) + '</tspan>' : plain(t);
  }
  function tree(el, o) {
    o = o || {};
    var first = (o.first || [{ n: 'A', p: '1/3' }, { n: '\\overline{A}' }]).map(function (b) { return { n: b.n, p: b.p == null ? '' : String(b.p) }; });
    var sec = o.second || { n: 'B', nb: '\\overline{B}', p: ['1/2', '1/5'] };
    var cond = sec.p.map(String), edit = o.edit !== false, pick = null;
    el.classList.add('bench', 'trb');
    el.innerHTML = head(o.title || T('Arbre pondéré'), '') + '<div class="bench-body">' +
      (edit ? '<div class="tr-in">' + first.map(function (b, i) { return '<label class="fld"><span>' + tx('\\P(' + b.n + ')') + '</span><input type="text" inputmode="decimal" data-k="f' + i + '" value="' + esc(b.p) + '"></label>'; }).join('') +
        cond.map(function (c, i) { return '<label class="fld"><span>' + tx('\\P_{' + first[i].n + '}(' + sec.n + ')') + '</span><input type="text" inputmode="decimal" data-k="c' + i + '" value="' + esc(c) + '"></label>'; }).join('') + '</div>' : '') +
      '<div class="fig"></div><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout');
    function draw() {
      var r = tcompute({ first: first, second: { n: sec.n, nb: sec.nb, p: cond } });
      var k = first.length, W = 440, rowH = 44, H = k * 2 * rowH + 10, x0 = 22, x1 = 170, x2 = 330;
      var h = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + esc(T('Arbre pondéré')) + '">';
      var yRoot = H / 2;
      first.forEach(function (b, i) {
        var y1 = (2 * i + 1) * rowH + 5, on = pick && pick[0] === i, pv = r.first && r.first[i] && r.first[i].p;
        h += '<path class="tr-edge' + (on ? ' hl' : '') + '" d="M' + (x0 + 8) + ' ' + yRoot + 'L' + (x1 - 14) + ' ' + y1 + '"/>';
        h += '<text class="lw-t" x="' + ((x0 + x1) / 2 - 4) + '" y="' + ((yRoot + y1) / 2 - 8) + '" text-anchor="middle" style="fill:var(--ink);font-weight:600">' + esc(pv ? fr.str(pv) : '?') + '</text>';
        h += '<text class="sg-name" x="' + x1 + '" y="' + (y1 + 6) + '" style="font-size:18px">' + svgName(b.n) + '</text>';
        [[sec.n, cond[i], 0], [sec.nb, null, 1]].forEach(function (leaf, j) {
          var y2 = y1 + (j ? 1 : -1) * rowH / 2, on2 = on && pick[1] === j, cv = r.cond && r.cond[i] ? (j ? fr.sub(F(1), r.cond[i]) : r.cond[i]) : null;
          h += '<path class="tr-edge' + (on2 ? ' hl' : '') + '" d="M' + (x1 + 16) + ' ' + y1 + 'L' + (x2 - 14) + ' ' + y2 + '"/>';
          h += '<text class="lw-t" x="' + ((x1 + x2) / 2 + 4) + '" y="' + ((y1 + y2) / 2 + (j ? 14 : -6)) + '" text-anchor="middle" style="fill:var(--ink);font-weight:600">' + esc(cv ? fr.str(cv) : '?') + '</text>';
          h += '<g class="sg-el' + (on2 ? ' img' : '') + '" data-l="' + i + ':' + j + '" tabindex="0" role="button"><circle cx="' + x2 + '" cy="' + y2 + '" r="15" /><text x="' + x2 + '" y="' + (y2 + 6) + '">' + svgName(leaf[0]) + '</text></g>';
          var jv = r.joint && r.joint[i] ? (j ? r.joint[i].nB : r.joint[i].B) : null;
          if (jv) h += '<text class="lw-t" x="' + (x2 + 24) + '" y="' + (y2 + 5) + '">' + esc(fr.str(jv)) + '</text>';
        });
      });
      h += '<circle class="tr-node" cx="' + x0 + '" cy="' + yRoot + '" r="6"/></svg>';
      fig.innerHTML = h;
      var t = '';
      if (r.error) t = '<p class="err">' + esc(r.error) + '</p>';
      else {
        if (pick) {
          var i = pick[0], j = pick[1], ev = j ? sec.nb : sec.n, c = j ? fr.sub(F(1), r.cond[i]) : r.cond[i], jv = j ? r.joint[i].nB : r.joint[i].B;
          t += '<p>' + T('Chemin : on multiplie les probabilités le long des branches.') + '</p><div class="fm">' + tx('\\P(' + first[i].n + ' \\cap ' + ev + ') = \\P(' + first[i].n + ') \\times \\P_{' + first[i].n + '}(' + ev + ') = ' + fr.tex(r.first[i].p) + ' \\times ' + fr.tex(c) + ' = ' + fr.tex(jv), true) + '</div>';
        } else t += '<p class="hint">' + T('Clique sur une feuille : le chemin et son produit.') + '</p>';
        var terms = first.map(function (b) { return '\\P(' + b.n + ')\\,\\P_{' + b.n + '}(' + sec.n + ')'; }).join(' + ');
        var nums = first.map(function (b, i) { return fr.tex(r.first[i].p) + ' \\times ' + fr.tex(r.cond[i]); }).join(' + ');
        t += '<p>' + T('Probabilités totales : ') + '</p><div class="fm">' + tx('\\P(' + sec.n + ') = ' + terms, true) + '</div><div class="fm">' + tx('= ' + nums + ' = ' + fr.tex(r.total), true) + '</div>';
        var bi = pick ? pick[0] : 0;
        if (!fr.isZero(r.total)) t += '<p>' + T('Formule de Bayes : ') + '</p><div class="fm">' + tx('\\P_{' + sec.n + '}(' + first[bi].n + ') = \\frac{\\P(' + first[bi].n + ' \\cap ' + sec.n + ')}{\\P(' + sec.n + ')} = \\frac{' + fr.tex(r.joint[bi].B) + '}{' + fr.tex(r.total) + '} = ' + fr.tex(r.bayes[bi].B), true) + '</div>';
      }
      out.innerHTML = t;
    }
    function act(g) { var p = g.getAttribute('data-l').split(':').map(Number); pick = pick && pick[0] === p[0] && pick[1] === p[1] ? null : p; draw(); var a = fig.querySelector('[data-l="' + p.join(':') + '"]'); if (a) a.focus({ preventScroll: true }); }
    fig.addEventListener('click', function (e) { var g = e.target.closest('[data-l]'); if (g) act(g); });
    fig.addEventListener('keydown', function (e) { var g = e.target.closest && e.target.closest('[data-l]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); act(g); } });
    U.$$('input[data-k]', el).forEach(function (inp) {
      inp.addEventListener('input', function () { var k = inp.getAttribute('data-k'), i = +k.slice(1); if (k[0] === 'f') first[i].p = inp.value; else cond[i] = inp.value; draw(); });
    });
    draw();
    return { el: el, compute: function () { return tcompute({ first: first, second: { n: sec.n, nb: sec.nb, p: cond } }); } };
  }

  /* ---------- loi d'une variable aléatoire ---------- */
  function law(el, o) {
    o = o || {};
    var name = o.name || 'X', cfg = { law: o.law || '', n: o.n, p: o.p, a: o.a, b: o.b, x: o.x, pList: o.law ? null : o.p };
    var edit = o.edit !== false && !!o.law;
    el.classList.add('bench', 'lwb');
    el.innerHTML = head(o.title || T('Loi de {X}', { X: tx(name) }), '') + '<div class="bench-body">' +
      (edit ? '<div class="tr-in">' + (cfg.law === 'binom' ? '<label class="fld"><span>n</span><input type="number" min="1" max="30" data-k="n" value="' + esc(cfg.n) + '"></label>' : '') +
        (cfg.law === 'unif' ? '<label class="fld"><span>a</span><input type="number" data-k="a" value="' + esc(cfg.a) + '"></label><label class="fld"><span>b</span><input type="number" data-k="b" value="' + esc(cfg.b) + '"></label>' : '') +
        (cfg.law === 'binom' || cfg.law === 'bern' ? '<label class="fld"><span>p</span><input type="text" inputmode="decimal" data-k="p" value="' + esc(cfg.p) + '"></label>' : '') + '</div>' : '') +
      '<div class="fig"></div><p class="hint">' + T('trait plein : espérance ; pointillés : espérance ± écart type.') + '</p><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout');
    function num(f) { return Number(f.n) / Number(f.d); }   /* position sur le dessin seulement */
    function draw() {
      var L = lawMake(cfg.law ? cfg : { x: cfg.x, p: cfg.pList });
      if (!L.x) { fig.innerHTML = ''; out.innerHTML = '<p class="err">' + esc(L.error || T('Paramètres illisibles.')) + '</p>'; return; }
      var W = 460, H = 230, pl = 40, pr = 16, pt = 22, pb = 34, xs = L.x.map(num), ps = L.p.map(num);
      var lo = Math.min.apply(null, xs), hi = Math.max.apply(null, xs), pad = (hi - lo) * 0.06 + 0.5; lo -= pad; hi += pad;
      var pmax = Math.max.apply(null, ps) || 1;
      var X = function (v) { return pl + (v - lo) / (hi - lo) * (W - pl - pr); }, Y = function (v) { return H - pb - v / pmax * (H - pt - pb); };
      var bw = Math.max(4, Math.min(34, (W - pl - pr) / (xs.length * 1.8)));
      var h = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(T('Loi de {X}', { X: name })) + '">';
      h += '<line class="lw-axis" x1="' + pl + '" y1="' + (H - pb) + '" x2="' + (W - pr) + '" y2="' + (H - pb) + '"/>';
      xs.forEach(function (x, i) {
        h += '<rect class="lw-bar" x="' + (X(x) - bw / 2) + '" y="' + Y(ps[i]) + '" width="' + bw + '" height="' + (H - pb - Y(ps[i])) + '"/>';
        h += '<text class="lw-t" x="' + X(x) + '" y="' + (H - pb + 18) + '" text-anchor="middle">' + esc(fr.str(L.x[i])) + '</text>';
        if (xs.length <= 12) h += '<text class="lw-t" x="' + X(x) + '" y="' + (Y(ps[i]) - 6) + '" text-anchor="middle">' + esc(fr.str(L.p[i])) + '</text>';
      });
      if (!L.error) {
        var mu = num(L.E), sd = L.sd ? Number(L.sd.approx.replace(',', '.')) : 0;
        h += '<line class="lw-mu" x1="' + X(mu) + '" y1="' + (pt - 8) + '" x2="' + X(mu) + '" y2="' + (H - pb) + '"/>';
        if (sd > 0) [mu - sd, mu + sd].forEach(function (v) { h += '<line class="lw-sd" x1="' + X(v) + '" y1="' + (pt + 8) + '" x2="' + X(v) + '" y2="' + (H - pb) + '"/>'; });
      }
      fig.innerHTML = h + '</svg>';
      if (L.error) { out.innerHTML = '<p class="err">' + esc(L.error) + '</p>'; return; }
      var xsT = L.x.map(fr.tex), psT = L.p.map(fr.tex), E = fr.tex(L.E);
      var sumE = L.x.length <= 7 ? xsT.map(function (x, i) { return x + ' \\times ' + psT[i]; }).join(' + ') + ' = ' : '';
      var sumE2 = L.x.length <= 7 ? xsT.map(function (x, i) { return (x.charAt(0) === '-' || x.indexOf('frac') >= 0 ? '(' + x + ')' : x) + '^2 \\times ' + psT[i]; }).join(' + ') + ' = ' : '';
      var t = '<p><b>' + T('Espérance') + '</b></p><div class="fm">' + tx('\\E(' + name + ') = \\sum_{k} x_k\\,\\P(' + name + ' = x_k) = ' + sumE + E, true) + '</div>';
      t += '<p><b>' + T('Variance (Koenig-Huygens)') + '</b></p><div class="fm">' + tx('\\E(' + name + '^2) = ' + sumE2 + fr.tex(L.E2), true) + '</div><div class="fm">' + tx('\\V(' + name + ') = \\E(' + name + '^2) - \\E(' + name + ')^2 = ' + fr.tex(L.E2) + ' - \\left(' + E + '\\right)^2 = ' + fr.tex(L.V), true) + '</div>';
      t += '<p><b>' + T('Écart type') + '</b></p><div class="fm">' + tx('\\sigma(' + name + ') = \\sqrt{\\V(' + name + ')} = ' + L.sd.tex + (L.sd.exact ? '' : ' \\approx ' + L.sd.approx.replace(',', '{,}')), true) + '</div>';
      out.innerHTML = t;
    }
    U.$$('input[data-k]', el).forEach(function (inp) { inp.addEventListener('input', function () { cfg[inp.getAttribute('data-k')] = inp.value; draw(); }); });
    draw();
    return { el: el, make: function () { return lawMake(cfg.law ? cfg : { x: cfg.x, p: cfg.pList }); } };
  }

  /* ================================================================== 9. PAGE */
  /* numéro de partie entouré à la main : un cercle un peu irrégulier, toujours le même pour un numéro donné */
  function pnHTML(n) {
    var pts = [], k = 26, start = -1.9 + (n % 3) * 0.35;
    for (var i = 0; i <= k; i++) {
      var a = start + i / k * (Math.PI * 2 + 0.5), r = 12.2 + 0.9 * Math.sin(i * 1.7 + n) + 0.5 * Math.cos(i * 0.9 + n * 2);
      pts.push((Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r * 0.94).toFixed(1));
    }
    return '<svg viewBox="-16 -16 32 32" aria-hidden="true"><path d="M' + pts.join('L') + '"/></svg><b>' + n + '</b>';
  }
  var MOUNT = { truth: truth, negate: negate, venn: venn, sagittal: sagittal, tree: tree, law: law };
  function mount(root) {
    if (!root || root.nodeType !== 1) return;
    function all(sel) { var l = U.$$(sel, root); if (root.matches && root.matches(sel)) l.unshift(root); return l; }
    all('.pn[data-n]').forEach(function (el) {
      if (el.getAttribute('data-pn-done')) return;
      el.setAttribute('data-pn-done', '1'); el.innerHTML = pnHTML(+el.getAttribute('data-n')); el.setAttribute('aria-hidden', 'true');
    });
    all('[data-maths]').forEach(function (el) {
      if (el.getAttribute('data-maths-done')) return;
      var f = MOUNT[el.getAttribute('data-maths')], op = {};
      if (!f) return;
      el.setAttribute('data-maths-done', '1');
      try { op = JSON.parse(el.getAttribute('data-opts') || '{}'); } catch (e) { op = {}; }
      try { f(el, op); } catch (e) { el.innerHTML = '<p class="err">' + esc(T('Outil indisponible : {m}', { m: e.message })) + '</p>'; if (window.console) console.error(e); }
    });
  }
  function init() {
    mount(document.body);
    if (window.MutationObserver) new MutationObserver(function (list) {
      for (var a = 0; a < list.length; a++) for (var b = 0; b < list[a].addedNodes.length; b++) {
        var nd = list[a].addedNodes[b];
        if (nd.nodeType === 1 && (nd.hasAttribute('data-maths') || nd.classList.contains('pn') || (nd.querySelector && nd.querySelector('[data-maths],.pn[data-n]')))) mount(nd);
      }
    }).observe(document.body, { childList: true, subtree: true });
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
      var ids = R.quiz ? R.quiz.bank().filter(function (x) { return x.ref === ref; }).slice(0, n).map(function (x) { return x.id; }) : [];
      if (ids.length) R.quiz.mountCheck(el, ids, el.getAttribute('data-title')); else el.hidden = true;
    });
    R.wireDoneButtons();
  }
  if (typeof document !== 'undefined' && document.addEventListener && document.querySelectorAll) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  }

  R.maths = {
    F: F, frac: frac, fr: fr, binom: binom, fact: fact, tex: tx, mathify: mathify,
    logic: { parse: lparse, tex: ltex, vars: lvars, evaluate: leval, table: ltable, equivalent: lequiv },
    quant: { parse: qparse, tex: qtex, negate: qnegate, normalize: normQ },
    sets: { parse: sparse, zones: szones, tex: stex, name: sname, zoneCounts: zoneCounts },
    fn: { props: fprops, image: fimage, preimage: fpre },
    tree: { compute: tcompute }, law: { make: lawMake },
    tools: { truth: truth, negate: negate, venn: venn, sagittal: sagittal, tree: tree, law: law },
    truth: truth, negate: negate, venn: venn, sagittal: sagittal, stepper: stepper, pn: pnHTML, mount: mount
  };
})();
