/* TAA — trois visuels pour les cours, chargés après taa.js. Montage : <div class="viz-…" data-viz="nom">, au DOMContentLoaded.

   data-viz="axiomes" (cours 2, partie 4) : « Teste tes axiomes ». L'élève choisit une opération sur la liste récursive
     (longueur, concaténer, est-présent, supprime-sup, dernier), écrit ses préconditions et ses axiomes ; l'atelier les
     essaie sur toutes les petites listes, de la plus courte à la plus longue, et montre le premier exemple qui coince :
     aucun axiome ne s'applique (incomplétude), deux axiomes donnent deux résultats (inconsistance), un calcul passe par
     un terme indéfini, la précondition est trop forte ou manque, ou le résultat est faux. Avec la réécriture pas à pas.
     Saisie tolérante : -> => ⇒, != ≠, <= ≤, >= ≥, & et, l pour λ, noms français ou anglais, numéros en début de ligne.
     Moteur : axParse (lecture et contrôle des types), axRun (essais), axTrace (réécriture d'un exemple).
   data-viz="arbre" (cours 1, partie 7) : un terme de pile dessiné en arbre ; à chaque axiome, trois temps : le motif
     (sous-arbre surligné), les variables (sous-arbres liés à p et e), le remplacement. Pas à pas, sans lecture auto.
   data-viz="file" (cours 3, partie 5) : défiler(enfiler(f, e)) et enfiler(défiler(f), e) côte à côte sur une file
     dessinée ; avec f vide, le second n'existe pas, d'où la condition estvide(f) = Faux.

   Pages anglaises : textes via REV.t (traductions ci-dessous), noms d'opérations anglais (EN_NAMES de taa.js pour la
   pile et la file ; table AX_EN ici pour la liste). */
(function () {
  'use strict';
  var R = window.REV;
  if (!R) return;
  var U = R.util, T = R.t, EN = R.lang === 'en';
  function esc(s) { return U.esc(String(s)); }
  function rid() { return Math.random().toString(36).slice(2, 7); }

  R.i18n.add({
    /* communs */
    ' et ': ' and ', 'liste récursive': 'recursive list', 'une liste': 'a list', 'un élément': 'an element', 'un entier': 'an integer', 'un booléen': 'a boolean',
    'liste': 'list', 'élément': 'element', 'entier': 'integer', 'booléen': 'boolean',
    /* atelier « Teste tes axiomes » */
    'Teste tes axiomes': 'Test your axioms', 'Opération à définir': 'Operation to define', 'Préconditions': 'Preconditions', 'Axiomes, un par ligne': 'Axioms, one per line',
    'aucune': 'none', 'Tester': 'Test', 'Brouillon à corriger': 'Draft to fix', 'Effacer': 'Clear',
    'Une condition s’écrit avant ⇒ : {ex}. Tu peux taper -> pour ⇒, != pour ≠, <= pour ≤, >= pour ≥, & pour « et », et l pour λ.':
      'A condition goes before ⇒: {ex}. You can type -> for ⇒, != for ≠, <= for ≤, >= for ≥, & for “and”, and l for λ.',
    'Opérations permises : {ops}, et + − pour les entiers.': 'Allowed operations: {ops}, and + − for integers.',
    'Le nombre d’éléments de λ (exemple 1 ci-dessus).': 'The number of elements of λ (example 1 above).',
    'λ suivie de λ2 (partiels 2018, 2020 et 2023).': 'λ followed by λ2 (midterms 2018, 2020 and 2023).',
    'vrai si e figure dans λ (partiels 2018 et 2020).': 'true if e is in λ (midterms 2018 and 2020).',
    'Supprime de λ tous les éléments strictement supérieurs à x (partiel 2024).': 'Deletes from λ every element strictly greater than x (2024 midterm).',
    'Le dernier élément de λ (partiel 2017). La liste vide n’en a pas.': 'The last element of λ (2017 midterm). The empty list has none.',
    'Ce brouillon contient une erreur fréquente. Clique sur Tester pour la trouver, corrige-la, puis teste à nouveau.':
      'This draft contains a common mistake. Click Test to find it, fix it, then test again.',
    'Écris tes préconditions et tes axiomes, puis clique sur Tester.': 'Write your preconditions and your axioms, then click Test.',
    'Clique sur Tester.': 'Click Test.',
    'Écris au moins un axiome.': 'Write at least one axiom.',
    'Lecture impossible': 'Cannot read this', 'Ligne {n} : {m}': 'Line {n}: {m}', 'Précondition : {m}': 'Precondition: {m}',
    'Axiomes lus': 'Axioms as read', 'Précondition lue : {p}': 'Precondition as read: {p}', 'Précondition lue : aucune': 'Precondition as read: none',
    'caractère inattendu : {c}': 'unexpected character: {c}', 'terme incomplet': 'incomplete term', 'parenthèse non fermée': 'unclosed parenthesis',
    'symbole inattendu : {c}': 'unexpected symbol: {c}', 'parenthèse manquante après {f}': 'missing parenthesis after {f}',
    '{f} s’écrit avec ses arguments entre parenthèses': '{f} needs its arguments in parentheses',
    'deux comparaisons à la suite : sépare-les par &': 'two comparisons in a row: separate them with &',
    'un seul ⇒ par axiome': 'only one ⇒ per axiom',
    'il manque le signe = entre les deux côtés': 'the = sign between the two sides is missing',
    'il manque la condition avant ⇒': 'the condition before ⇒ is missing',
    'c’est une précondition : écris-la dans le champ Préconditions': 'this is a precondition: write it in the Preconditions field',
    'le côté gauche doit commencer par {op}(…)': 'the left-hand side must start with {op}(…)',
    '{f} prend 1 argument, pas {m}': '{f} takes 1 argument, not {m}', '{f} prend {n} arguments, pas {m}': '{f} takes {n} arguments, not {m}',
    'à gauche, sous {op}, écris seulement des variables, {nil} et cons(…, …) : {t} n’est pas permis':
      'on the left, under {op}, write only variables, {nil} and cons(…, …): {t} is not allowed',
    '{t} est une liste, pas {s}': '{t} is a list, not {s}',
    '{v} serait à la fois {a} et {b}': '{v} would be both {a} and {b}',
    'cons prend l’élément d’abord : cons(e, λ)': 'cons takes the element first: cons(e, λ)',
    '{v} n’apparaît pas dans le côté gauche': '{v} does not appear on the left-hand side',
    'opération inconnue ici : {f}': 'unknown operation here: {f}',
    '{f} attend {s} en argument {i}, pas {u}': '{f} expects {s} as argument {i}, not {u}',
    'on ne compare pas {a} et {b}': 'you cannot compare {a} and {b}',
    'les éléments de {op} ne se comparent qu’avec = et ≠': 'the elements of {op} can only be compared with = and ≠',
    '{c} compare deux éléments ou deux entiers': '{c} compares two elements or two integers',
    'la condition doit valoir vrai ou faux, pas {s}': 'the condition must be true or false, not {s}',
    'à droite, tu obtiens {s} ; {op} rend {r}': 'on the right you get {s}; {op} returns {r}',
    'écris-la sur {op} : {call} est-défini-ssi …': 'write it about {op}: {call} is-defined-iaoi …',
    'il manque la condition après est-défini-ssi': 'the condition after is-defined-iaoi is missing',
    'je ne sais pas ce que désigne {v} : écris {call} est-défini-ssi …': 'I do not know what {v} stands for: write {call} is-defined-iaoi …',
    'Tout passe.': 'Everything passes.', 'Incomplet.': 'Incomplete.', 'Inconsistant.': 'Inconsistent.', 'Indéfini.': 'Undefined.',
    'Résultat faux.': 'Wrong result.', 'Sans fin.': 'Never ends.', 'Précondition trop forte.': 'Precondition too strong.', 'Précondition manquante.': 'Missing precondition.',
    '{n} essais, sur toutes les listes de 0 à {m} éléments pris parmi {s}.': '{n} tests, on every list of 0 to {m} elements taken from {s}.',
    '{n} essais, sur tous les couples de listes de 0 à {m} éléments pris parmi {s}.': '{n} tests, on every pair of lists of 0 to {m} elements taken from {s}.',
    ' {p} prend chaque valeur : {s}.': ' {p} takes each value: {s}.',
    'Aucun cas oublié, aucune contradiction, et chaque résultat est juste.': 'No case missing, no contradiction, and every result is right.',
    'Des essais ne prouvent rien, mais ils trouvent vite les erreurs : relis aussi le profil et la partie avec.': 'Tests prove nothing, but they find mistakes fast: also check the profile and the with part.',
    'Exemple de réécriture : {t}': 'Example of rewriting: {t}',
    'Contre-exemple : {t}, avec {a}.': 'Counterexample: {t}, with {a}.', 'Contre-exemple : {t}.': 'Counterexample: {t}.',
    'Aucun axiome ne s’applique à {t}.': 'No axiom applies to {t}.',
    'axiome {i} : forme différente': 'axiom {i}: different shape', 'axiome {i} : condition fausse, {c}': 'axiom {i}: false condition, {c}',
    'Il manque le cas {nil} : écris un axiome pour lui.': 'The {nil} case is missing: write an axiom for it.',
    'Tes conditions ne couvrent pas ce cas : vérifie qu’elles couvrent toutes les possibilités (par exemple e > x et e ≤ x).':
      'Your conditions do not cover this case: check that they cover every possibility (for example e > x and e ≤ x).',
    '{t} n’a pas de sens : un de tes axiomes y mène. Ajoute-lui une condition pour qu’il ne s’applique pas à ce cas.':
      '{t} makes no sense: one of your axioms leads to it. Add a condition so that it does not apply to this case.',
    'Les axiomes {i} et {j} s’appliquent tous les deux à {t}, et donnent deux résultats différents : {a} et {b}.':
      'Axioms {i} and {j} both apply to {t}, and give two different results: {a} and {b}.',
    'Rends leurs conditions disjointes, par exemple e = x d’un côté et e ≠ x de l’autre.': 'Make their conditions disjoint, for example e = x on one side and e ≠ x on the other.',
    'Avec l’axiome {i} :': 'With axiom {i}:',
    'L’axiome {i} s’applique aussi à {t}, mais son calcul passe par {u}, qui n’est pas défini.': 'Axiom {i} also applies to {t}, but its computation goes through {u}, which is undefined.',
    'Ajoute une condition pour que cet axiome ne s’applique pas à ce cas, par exemple {c} ⇒ …': 'Add a condition so that this axiom does not apply to this case, for example {c} ⇒ …',
    'L’axiome {i} s’applique à {t}, mais son calcul mène à {u}, que ta précondition interdit.': 'Axiom {i} applies to {t}, but its computation leads to {u}, which your precondition forbids.',
    'Ajoute à l’axiome {i} une condition qui l’écarte de ce cas, ou revois ta précondition.': 'Add a condition to axiom {i} that keeps it away from this case, or check your precondition.',
    'La condition de l’axiome {i} n’a pas de sens pour {t} : elle passe par {u}, qui n’est pas défini.': 'The condition of axiom {i} makes no sense for {t}: it goes through {u}, which is undefined.',
    'Teste d’abord que la liste n’est pas vide : {c} & …': 'First test that the list is not empty: {c} & …',
    'Ta précondition n’a pas de sens pour {t} : elle passe par {u}, qui n’est pas défini.': 'Your precondition makes no sense for {t}: it goes through {u}, which is undefined.',
    'La réécriture de {t} ne s’arrête pas.': 'Rewriting {t} never stops.',
    'Dans le cas cons(e, λ), l’appel récursif doit porter sur λ, une liste plus courte.': 'In the cons(e, λ) case, the recursive call must be on λ, a shorter list.',
    'Ta précondition interdit {t}. Pourtant ce terme a une valeur : {v}.': 'Your precondition forbids {t}. Yet this term has a value: {v}.',
    'N’invente pas de précondition : {op} a un sens pour toutes les listes, même vides. Les appels récursifs finissent d’ailleurs sur {nil}.':
      'Do not invent a precondition: {op} makes sense for every list, even empty ones. Besides, the recursive calls end on {nil}.',
    '{t} n’a pas de sens : la liste vide n’a pas de dernier élément. Ta précondition doit l’exclure.': '{t} makes no sense: the empty list has no last element. Your precondition must rule it out.',
    ' Tes axiomes lui donnent pourtant une valeur : {v}.': ' Yet your axioms give it a value: {v}.',
    'Écris par exemple : {p}': 'Write for example: {p}',
    'Résultat faux pour {t} : tes axiomes donnent {g}, on attend {e}.': 'Wrong result for {t}: your axioms give {g}, the expected value is {e}.',
    'Suis la réécriture : elle montre où le calcul s’écarte du résultat attendu.': 'Follow the rewriting: it shows where the computation goes wrong.',
    'axiome {i}': 'axiom {i}', 'condition : {c}': 'condition: {c}', 'axiome du cours : {a}': 'course axiom: {a}',
    'calcul': 'arithmetic', 'comparaison': 'comparison', 'booléen : {a}': 'boolean: {a}',
    'aucun axiome ne s’applique': 'no axiom applies', 'indéfini : {m}': 'undefined: {m}', 'interdit par ta précondition': 'forbidden by your precondition',
    'précondition {c}': 'precondition {c}', 'forme finale': 'final form', 'attendu : {e}': 'expected: {e}', '… la réécriture continue sans fin.': '… the rewriting goes on forever.',
    'Erreur interne de l’atelier.': 'Internal error in the workshop.',
    /* arbre */
    'Le terme en arbre': 'The term as a tree', 'axiomes : {s}': 'axioms: {s}', 'Termes proposés': 'Suggested terms',
    'sommet après un dépiler': 'top after a pop', 'pile vide ?': 'empty stack?', 'deux dépiler': 'two pops',
    'Étape précédente': 'Previous step', 'Étape suivante': 'Next step', 'Recommencer': 'Start again', '{i} sur {n}': '{i} of {n}',
    'Le terme {t}, dessiné en arbre': 'The term {t}, drawn as a tree',
    'Chaque opération est un nœud, ses arguments sont ses enfants. La racine, {r}, est l’opération faite en dernier : le calcul part du bas.':
      'Each operation is a node, its arguments are its children. The root, {r}, is the operation done last: the computation starts from the bottom.',
    'Axiome {id} : {a}': 'Axiom {id}: {a}',
    '<b>Étape {n}, le motif.</b> Le sous-arbre surligné, {f} posé directement sur {g}, a la forme du côté gauche de l’axiome {id}.':
      '<b>Step {n}, the pattern.</b> The highlighted subtree, {f} sitting directly on {g}, has the shape of the left-hand side of axiom {id}.',
    ' Au-dessus, {pf} est posé sur {f} : aucun axiome ne commence ainsi. Il faut d’abord réduire le sous-arbre surligné.':
      ' Above it, {pf} sits on {f}: no axiom starts that way. The highlighted subtree has to be reduced first.',
    '<b>Étape {n}, les variables.</b> {list}.': '<b>Step {n}, the variables.</b> {list}.',
    '<b>Étape {n}, le remplacement.</b> Le côté droit de l’axiome est {r} : le sous-arbre surligné devient {v}.':
      '<b>Step {n}, the replacement.</b> The right-hand side of the axiom is {r}: the highlighted subtree becomes {v}.',
    ' Forme finale : {t}. Plus aucun axiome ne s’applique, en {n} étapes.': ' Final form: {t}. No axiom applies any more, after {n} steps.',
    ' Forme finale : {t}. Plus aucun axiome ne s’applique, en 1 étape.': ' Final form: {t}. No axiom applies any more, after 1 step.',
    /* file */
    'Deux ordres, la même file': 'Two orders, the same queue', 'file FIFO': 'FIFO queue', 'File de départ': 'Starting queue',
    '{f} vide': '{f} empty', 'Dans chaque file, la tête, celle qui sort, est à gauche.': 'In each queue, the head, the one that leaves, is on the left.',
    'Enfiler, puis défiler': 'Enqueue, then dequeue', 'Défiler, puis enfiler': 'Dequeue, then enqueue', 'indéfini': 'undefined', 'sort': 'leaves', 'entre': 'enters',
    'Même file des deux côtés : {q}. Enfiler {e} avant ou après le défiler ne change rien, car ce n’est pas {e} qui sort : c’est {a}, le premier de {f}. C’est l’axiome {ax}.':
      'Same queue on both sides: {q}. Enqueuing {e} before or after the dequeue changes nothing, because {e} is not the one that leaves: {a} is, the first of {f}. That is the axiom {ax}.',
    'Ici, les deux côtés ne vont plus ensemble : à gauche, {e} entre puis ressort aussitôt, il reste {nil} ; à droite, {t} n’existe pas (précondition). D’où la condition {c}, et un axiome à part pour ce cas : {ax}.':
      'Here the two sides no longer match: on the left, {e} enters and leaves at once, {nil} remains; on the right, {t} does not exist (precondition). Hence the condition {c}, and a separate axiom for this case: {ax}.'
  });

  /* ================================================================ A. Teste tes axiomes : le moteur */

  /* noms : canoniques en français, affichés en anglais sur une page anglaise (vocabulaire des sujets anglais) */
  var AX_EN = { listevide: 'emptylist', premier: 'first', fin: 'tail', estvide: 'isempty', vrai: 'true', faux: 'false', non: 'not', et: 'and', ou: 'or',
    longueur: 'length', 'est-présent': 'ispresent', 'concaténer': 'concatenate', 'supprime-sup': 'deletegreater', dernier: 'last' };
  function nm(c) { return EN && AX_EN[c] || c; }
  function key(w) { return String(w).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[-_]/g, ''); }
  var ALIAS = {};
  [['listevide', 'emptylist'], ['cons'], ['premier', 'first'], ['fin', 'tail'], ['estvide', 'isempty'], ['vrai', 'true'], ['faux', 'false'],
    ['non', 'not'], ['et', 'and'], ['ou', 'or'], ['longueur', 'length'], ['est-présent', 'ispresent'], ['concaténer', 'concatenate', 'concat'],
    ['supprime-sup', 'deletegreater'], ['dernier', 'last']].forEach(function (g) { g.forEach(function (w) { ALIAS[key(w)] = g[0]; }); });
  var SIG = { cons: [['E', 'L'], 'L'], premier: [['L'], 'E'], fin: [['L'], 'L'], estvide: [['L'], 'B'], non: [['B'], 'B'] };
  var CONSTS = { listevide: 'L', vrai: 'B', faux: 'B' };
  var ROLE = { cons: 'int', fin: 'int', premier: 'obs', estvide: 'obs' };
  function sortUn(s) { return T({ L: 'une liste', E: 'un élément', N: 'un entier', B: 'un booléen' }[s]); }
  function sortName(s) { return T({ L: 'liste', E: 'élément', N: 'entier', B: 'booléen' }[s]); }

  /* les opérations proposées ; ref = résultat attendu (listes en tableaux JS), defined = domaine (sinon partout) */
  var OPS = [
    { id: 'longueur', params: [{ n: 'λ', s: 'L' }], res: 'N', elems: ['a', 'b'], max: 3,
      desc: 'Le nombre d’éléments de λ (exemple 1 ci-dessus).',
      ref: function (l) { return l.length; },
      draft: ['longueur(cons(e, λ)) = longueur(λ) + 1'], ex: [['a', 'b', 'c']] },
    { id: 'concaténer', params: [{ n: 'λ', s: 'L' }, { n: 'λ2', s: 'L' }], res: 'L', elems: ['a', 'b'], max: 2,
      desc: 'λ suivie de λ2 (partiels 2018, 2020 et 2023).',
      ref: function (l, l2) { return l.concat(l2); },
      draft: ['concaténer(listevide, λ2) = λ2', 'concaténer(λ, listevide) = λ', 'concaténer(λ, λ2) = cons(premier(λ), concaténer(fin(λ), λ2))'],
      ex: [['a', 'b'], ['c']] },
    { id: 'est-présent', params: [{ n: 'e', s: 'E' }, { n: 'λ', s: 'L' }], res: 'B', elems: ['a', 'b'], max: 3,
      desc: 'vrai si e figure dans λ (partiels 2018 et 2020).',
      ref: function (e, l) { return l.indexOf(e) >= 0; },
      draft: ['est-présent(e, listevide) = faux', 'e = x ⇒ est-présent(e, cons(x, λ)) = vrai', 'est-présent(e, cons(x, λ)) = est-présent(e, λ)'],
      ex: ['b', ['a', 'b']] },
    { id: 'supprime-sup', params: [{ n: 'λ', s: 'L' }, { n: 'x', s: 'E' }], res: 'L', elems: ['1', '2', '3'], max: 3, ordered: true,
      desc: 'Supprime de λ tous les éléments strictement supérieurs à x (partiel 2024).',
      ref: function (l, x) { return l.filter(function (e) { return +e <= +x; }); },
      draft: ['supprime-sup(listevide, x) = listevide', 'e > x ⇒ supprime-sup(cons(e, λ), x) = λ', 'e ≤ x ⇒ supprime-sup(cons(e, λ), x) = cons(e, supprime-sup(λ, x))'],
      ex: [['3', '1', '4'], '3'] },
    { id: 'dernier', params: [{ n: 'λ', s: 'L' }], res: 'E', elems: ['a', 'b'], max: 3,
      desc: 'Le dernier élément de λ (partiel 2017). La liste vide n’en a pas.',
      ref: function (l) { return l[l.length - 1]; }, defined: function (l) { return l.length > 0; },
      draft: ['dernier(cons(e, listevide)) = e', 'dernier(cons(e, λ)) = dernier(λ)'], ex: [['a', 'b', 'c']] }
  ];
  var OP = {};
  OPS.forEach(function (o) { OP[o.id] = o; });

  function Err(msg) { var e = new Error(msg); e.vz = 'parse'; return e; }

  /* ---------- lecture ---------- */
  var ID = /[A-Za-zÀ-ÖØ-öø-ɏͰ-Ͽ0-9_'′’]/;
  var LETTER = /[A-Za-zÀ-ÖØ-öø-ɏͰ-Ͽ]/;
  function normSym(s) {
    return String(s).replace(/[−–]/g, '-')
      .replace(/-->|==>|=>|->|⟹|⟶|⇨|→|⇒/g, '⇒')
      .replace(/=\/=|!=|\/=|<>|≠/g, '≠')
      .replace(/<=|=<|⩽|≤/g, '≤').replace(/>=|⩾|≥/g, '≥')
      .replace(/&&|∧/g, '&').replace(/\|\||∨/g, ' ou ').replace(/¬/g, ' non ');
  }
  function tokenize(s) {
    var out = [], i = 0;
    while (i < s.length) {
      var c = s.charAt(i);
      if (/\s/.test(c)) { i++; continue; }
      if ('(),⇒≠≤≥<>=+-&'.indexOf(c) >= 0) { out.push(c); i++; continue; }
      if (ID.test(c)) {
        var j = i + 1;
        while (j < s.length && (ID.test(s.charAt(j)) || (s.charAt(j) === '-' && LETTER.test(s.charAt(j - 1)) && LETTER.test(s.charAt(j + 1) || '')))) j++;
        out.push(s.slice(i, j)); i = j; continue;
      }
      throw Err(T('caractère inattendu : {c}', { c: c }));
    }
    return out;
  }
  function isWord(w) { return !!w && ID.test(w.charAt(0)); }
  function canon(w) { return isWord(w) ? ALIAS[key(w)] || null : null; }
  var CMPS = '=≠<≤>≥';
  function isCmp(w) { return !!w && w.length === 1 && CMPS.indexOf(w) >= 0; }
  function parseExpr(tk) {
    var p = 0;
    function orE() { var a = andE(); while (canon(tk[p]) === 'ou') { p++; a = { f: 'ou', args: [a, andE()], infix: true }; } return a; }
    function andE() { var a = cmpE(); while (tk[p] === '&' || canon(tk[p]) === 'et') { p++; a = { f: 'et', args: [a, cmpE()], infix: true }; } return a; }
    function cmpE() {
      var a = addE();
      if (isCmp(tk[p])) {
        var o = tk[p++]; a = { f: o, args: [a, addE()], infix: true };
        if (isCmp(tk[p])) throw Err(T('deux comparaisons à la suite : sépare-les par &'));
      }
      return a;
    }
    function addE() { var a = unary(); while (tk[p] === '+' || tk[p] === '-') { var o = tk[p++]; a = { f: o, args: [a, unary()], infix: true }; } return a; }
    function unary() { if (canon(tk[p]) === 'non' && tk[p + 1] !== '(') { p++; return { f: 'non', args: [unary()] }; } return primary(); }
    function primary() {
      var t = tk[p++];
      if (t === undefined) throw Err(T('terme incomplet'));
      if (t === '(') { var e = orE(); if (tk[p++] !== ')') throw Err(T('parenthèse non fermée')); return e; }
      if (!isWord(t)) throw Err(T('symbole inattendu : {c}', { c: t }));
      if (/^[0-9]+$/.test(t)) return { a: t, num: true };
      var c = canon(t);
      if (tk[p] === '(') {
        p++;
        var args = [];
        if (tk[p] !== ')') { args.push(orE()); while (tk[p] === ',') { p++; args.push(orE()); } }
        if (tk[p++] !== ')') throw Err(T('parenthèse manquante après {f}', { f: t }));
        return c ? { f: c, args: args } : { f: t, args: args, unknown: true };
      }
      if (c && CONSTS[c]) return { a: c };
      if (c) throw Err(T('{f} s’écrit avec ses arguments entre parenthèses', { f: t }));
      return { a: t, v: true };
    }
    var r = orE();
    if (p < tk.length) throw Err(T('symbole inattendu : {c}', { c: tk[p] }));
    return r;
  }
  /* indices des jetons au niveau 0 des parenthèses qui vérifient test */
  function topIdx(tk, test) {
    var d = 0, out = [];
    tk.forEach(function (w, i) { if (w === '(') d++; else if (w === ')') d--; else if (!d && test(w)) out.push(i); });
    return out;
  }

  /* ---------- types ---------- */
  function listLike(name) { return /^(λ|l|L|lambda)[0-9′'’]*$/.test(name); }
  function checkPat(t, s, vars, op) {
    if (t.v) {
      if (vars[t.a] && vars[t.a] !== s) throw Err(T('{v} serait à la fois {a} et {b}', { v: t.a, a: sortUn(vars[t.a]), b: sortUn(s) }));
      vars[t.a] = s; return;
    }
    if (t.a === 'listevide') { if (s !== 'L') throw Err(T('{t} est une liste, pas {s}', { t: nm('listevide'), s: sortUn(s) })); return; }
    if (t.f === 'cons' && t.args.length === 2) {
      if (s !== 'L') throw Err(T('{t} est une liste, pas {s}', { t: 'cons(…)', s: sortUn(s) }));
      var a0 = t.args[0], a1 = t.args[1];
      if (a0.a === 'listevide' || a0.f === 'cons' || (a0.v && listLike(a0.a) && a1.v && !listLike(a1.a))) throw Err(T('cons prend l’élément d’abord : cons(e, λ)'));
      checkPat(a0, 'E', vars, op); checkPat(a1, 'L', vars, op); return;
    }
    throw Err(T('à gauche, sous {op}, écris seulement des variables, {nil} et cons(…, …) : {t} n’est pas permis', { op: nm(op.id), nil: nm('listevide'), t: txt(t) }));
  }
  function arity(f, n, m) { return n === 1 ? T('{f} prend 1 argument, pas {m}', { f: nm(f), m: m }) : T('{f} prend {n} arguments, pas {m}', { f: nm(f), n: n, m: m }); }
  function typeOf(t, vars, op) {
    if (t.v) { if (!vars[t.a]) throw Err(T('{v} n’apparaît pas dans le côté gauche', { v: t.a })); return vars[t.a]; }
    if (t.num) return 'N';
    if (t.a !== undefined) return CONSTS[t.a];
    if (t.unknown) throw Err(T('opération inconnue ici : {f}', { f: t.f }));
    var f = t.f, A = t.args, s0, s1;
    if (f === 'et' || f === 'ou' || f === '+' || f === '-') {
      if (A.length !== 2) throw Err(arity(f, 2, A.length));
      var want = f === '+' || f === '-' ? 'N' : 'B';
      A.forEach(function (a, i) { var s = typeOf(a, vars, op); if (s !== want) throw Err(T('{f} attend {s} en argument {i}, pas {u}', { f: nm(f), s: sortUn(want), i: i + 1, u: sortUn(s) })); });
      return want;
    }
    if (isCmp(f)) {
      s0 = typeOf(A[0], vars, op); s1 = typeOf(A[1], vars, op);
      if (f === '=' || f === '≠') { if (s0 !== s1) throw Err(T('on ne compare pas {a} et {b}', { a: sortUn(s0), b: sortUn(s1) })); return 'B'; }
      if (s0 === 'N' && s1 === 'N') return 'B';
      if (s0 === 'E' && s1 === 'E') { if (!op.ordered) throw Err(T('les éléments de {op} ne se comparent qu’avec = et ≠', { op: nm(op.id) })); return 'B'; }
      throw Err(T('{c} compare deux éléments ou deux entiers', { c: f }));
    }
    var sig = f === op.id ? [op.params.map(function (q) { return q.s; }), op.res] : SIG[f];
    if (!sig) throw Err(T('opération inconnue ici : {f}', { f: nm(f) }));
    if (A.length !== sig[0].length) throw Err(arity(f, sig[0].length, A.length));
    var ss = A.map(function (a) { return typeOf(a, vars, op); });
    if (f === 'cons' && ss[0] === 'L' && ss[1] === 'E') throw Err(T('cons prend l’élément d’abord : cons(e, λ)'));
    ss.forEach(function (s, i) { if (s !== sig[0][i]) throw Err(T('{f} attend {s} en argument {i}, pas {u}', { f: nm(f), s: sortUn(sig[0][i]), i: i + 1, u: sortUn(s) })); });
    return sig[1];
  }

  /* ---------- une ligne d'axiome ---------- */
  var SKIP = /^(axiomes?|axioms?|avec|with|pr[ée]conditions?|op[ée]rations?|utilise|uses|types?|aucune?|none|sorte)\b/i;
  var DECL = /^(liste|list|[ée]l[ée]ment|element|entier|integer|bool[ée]en|boolean)\s+[^=()]*$/i;
  var PRE_RX = /est[\s-]*d[ée]fini|is[\s-]*defined|\bssi\b|\biaoi\b|\biff\b/i;
  function parseAxiom(line, op) {
    var tk = tokenize(normSym(line)), cond = null, im = topIdx(tk, function (w) { return w === '⇒'; });
    if (im.length > 1) throw Err(T('un seul ⇒ par axiome'));
    if (im.length) {
      if (!im[0]) throw Err(T('il manque la condition avant ⇒'));
      cond = parseExpr(tk.slice(0, im[0])); tk = tk.slice(im[0] + 1);
    } else {
      var si = topIdx(tk, function (w) { var k = isWord(w) && key(w); return k === 'si' || k === 'if'; });
      if (si.length) { cond = parseExpr(tk.slice(si[0] + 1)); tk = tk.slice(0, si[0]); }
    }
    var eqs = topIdx(tk, function (w) { return w === '='; });
    if (!eqs.length || !eqs[0]) throw Err(T('il manque le signe = entre les deux côtés'));
    var ax = { lhs: parseExpr(tk.slice(0, eqs[0])), rhs: parseExpr(tk.slice(eqs[0] + 1)), cond: cond };
    if (ax.lhs.f !== op.id) throw Err(T('le côté gauche doit commencer par {op}(…)', { op: nm(op.id) }));
    if (ax.lhs.args.length !== op.params.length) throw Err(arity(op.id, op.params.length, ax.lhs.args.length));
    var vars = {};
    ax.lhs.args.forEach(function (a, i) { checkPat(a, op.params[i].s, vars, op); });
    if (cond) { var c = typeOf(cond, vars, op); if (c !== 'B') throw Err(T('la condition doit valoir vrai ou faux, pas {s}', { s: sortUn(c) })); }
    var r = typeOf(ax.rhs, vars, op);
    if (r !== op.res) throw Err(T('à droite, tu obtiens {s} ; {op} rend {r}', { s: sortUn(r), op: nm(op.id), r: sortUn(op.res) }));
    return ax;
  }
  /* précondition : « aucune », « op(λ) est-défini-ssi … » ou la condition seule (noms du profil, l pour λ) */
  function parsePre(raw, op) {
    var s = String(raw || '').trim().replace(/[.;]+$/, '');
    if (!s || /^(aucune?|none|n[ée]ant|pas de pr[ée]conditions?|no preconditions?|-|—)$/i.test(s)) return null;
    s = s.replace(/si et seulement si|if and only if/gi, ' ssi ')
      .replace(/est[\s-]*d[ée]finie?[\s-]*(ssi|si)?/gi, ' ssi ').replace(/is[\s-]*defined[\s-]*(iaoi|iff|if)?/gi, ' ssi ').replace(/\b(iaoi|iff)\b/gi, ' ssi ');
    var tk = tokenize(normSym(s)), k = -1, names = {}, call = nm(op.id) + '(' + op.params.map(function (q) { return q.n; }).join(', ') + ')';
    tk.forEach(function (w, i) { if (k < 0 && isWord(w) && key(w) === 'ssi') k = i; });
    if (k >= 0) {
      var h = parseExpr(tk.slice(0, k));
      if (h.f !== op.id || h.args.length !== op.params.length || h.args.some(function (a) { return !a.v; })) throw Err(T('écris-la sur {op} : {call} est-défini-ssi …', { op: nm(op.id), call: call }));
      h.args.forEach(function (a, i) { names[a.a] = i; });
      tk = tk.slice(k + 1);
      if (!tk.length) throw Err(T('il manque la condition après est-défini-ssi'));
    } else {
      op.params.forEach(function (q, i) {
        names[q.n] = i;
        var al = q.s === 'L' ? (q.n === 'λ2' ? ['l2', 'L2', 'λ′'] : ['l', 'L', 'lambda']) : ['e', 'x'];
        al.forEach(function (a) { if (names[a] === undefined) names[a] = i; });
      });
    }
    var cond = parseExpr(tk), vars = {};
    Object.keys(names).forEach(function (n) { vars[n] = op.params[names[n]].s; });
    (function walk(t) {
      if (t.v && names[t.a] === undefined) throw Err(k >= 0 ? T('{v} n’apparaît pas dans le côté gauche', { v: t.a }) : T('je ne sais pas ce que désigne {v} : écris {call} est-défini-ssi …', { v: t.a, call: call }));
      (t.args || []).forEach(walk);
    })(cond);
    var c = typeOf(cond, vars, op);
    if (c !== 'B') throw Err(T('la condition doit valoir vrai ou faux, pas {s}', { s: sortUn(c) }));
    return { cond: cond, names: names };
  }
  /* tout le formulaire → { pre, axioms } ou { errors: [texte] } */
  function axParse(op, preText, axText) {
    var errors = [], axioms = [], pre = null;
    try { pre = parsePre(preText, op); } catch (e) { if (!e.vz) throw e; errors.push(T('Précondition : {m}', { m: e.message })); }
    String(axText || '').split(/\r?\n/).forEach(function (raw, i) {
      var line = raw.replace(/^\s*(?:[-•*]\s+|\(?\d+[.)]\s*|[A-Za-z]\d+\s*[:.)]\s*)/, '').replace(/[.;,]+\s*$/, '').trim();
      if (!line || (SKIP.test(line) && line.indexOf('=') < 0) || DECL.test(line) || (/:/.test(line) && /→|->/.test(line) && line.indexOf('=') < 0)) return;
      try {
        if (PRE_RX.test(line)) throw Err(T('c’est une précondition : écris-la dans le champ Préconditions'));
        var ax = parseAxiom(line, op); ax.line = i + 1; axioms.push(ax);
      } catch (e) { if (!e.vz) throw e; errors.push(T('Ligne {n} : {m}', { n: i + 1, m: e.message })); }
    });
    if (!errors.length && !axioms.length) errors.push(T('Écris au moins un axiome.'));
    return errors.length ? { errors: errors } : { pre: pre, axioms: axioms };
  }

  /* ---------- valeurs et calcul ---------- */
  var NIL = { a: 'listevide' }, VRAI = { a: 'vrai' }, FAUX = { a: 'faux' };
  function cons(h, t) { return { f: 'cons', args: [h, t] }; }
  function bool(b) { return b ? VRAI : FAUX; }
  function fromJS(v) {
    if (Array.isArray(v)) return v.reduceRight(function (acc, x) { return cons({ a: String(x) }, acc); }, NIL);
    if (v === true || v === false) return bool(v);
    return { a: String(v) };
  }
  function str(t) { return t.a !== undefined ? t.a : t.f + '(' + t.args.map(str).join(',') + ')'; }
  function eq(a, b) { return str(a) === str(b); }
  function isVal(t) { return t.a !== undefined ? !t.v : t.f === 'cons' && isVal(t.args[0]) && isVal(t.args[1]); }
  function matchP(pat, t, env) {
    if (pat.v) { if (env[pat.a]) return eq(env[pat.a], t); env[pat.a] = t; return true; }
    if (pat.a !== undefined) return t.a === pat.a;
    if (t.f !== pat.f || !t.args || t.args.length !== pat.args.length) return false;
    for (var i = 0; i < pat.args.length; i++) if (!matchP(pat.args[i], t.args[i], env)) return false;
    return true;
  }
  function subst(t, env) {
    if (t.v) return env[t.a];
    if (t.a !== undefined) return t;
    return { f: t.f, args: t.args.map(function (a) { return subst(a, env); }), infix: t.infix };
  }
  function preEnv(pre, call) { var env = {}; Object.keys(pre.names).forEach(function (n) { env[n] = call.args[pre.names[n]]; }); return env; }
  function num(t) { return parseInt(t.a, 10); }
  function builtin(f, A) {
    switch (f) {
      case 'premier': case 'fin':
        if (A[0].a === 'listevide') throw { vz: 'undef', u: { f: f, args: [NIL] }, base: true };
        return A[0].args[f === 'premier' ? 0 : 1];
      case 'estvide': return bool(A[0].a === 'listevide');
      case 'non': return bool(A[0].a === 'faux');
      case '+': return { a: String(num(A[0]) + num(A[1])) };
      case '-': return { a: String(num(A[0]) - num(A[1])) };
      case '=': return bool(eq(A[0], A[1]));
      case '≠': return bool(!eq(A[0], A[1]));
      case '<': return bool(num(A[0]) < num(A[1]));
      case '≤': return bool(num(A[0]) <= num(A[1]));
      case '>': return bool(num(A[0]) > num(A[1]));
      case '≥': return bool(num(A[0]) >= num(A[1]));
    }
    return null;
  }
  function val(t, env, ctx) {
    if (t.v) return env[t.a];
    if (t.a !== undefined) return t;
    var f = t.f;
    if (f === 'et') { var x = val(t.args[0], env, ctx); return x.a === 'faux' ? FAUX : val(t.args[1], env, ctx); }
    if (f === 'ou') { var y = val(t.args[0], env, ctx); return y.a === 'vrai' ? VRAI : val(t.args[1], env, ctx); }
    var A = t.args.map(function (a) { return val(a, env, ctx); });
    if (f === 'cons') return cons(A[0], A[1]);
    if (f === ctx.op.id) return callValue({ f: f, args: A }, ctx);
    return builtin(f, A);
  }
  /* axiomes qui s'appliquent à un appel ; why reçoit les raisons des autres */
  function applicable(call, ctx, why) {
    var apps = [];
    ctx.ax.forEach(function (ax, i) {
      var env = {};
      if (!matchP(ax.lhs, call, env)) { if (why) why.push({ i: i, k: 'form' }); return; }
      if (ax.cond) {
        var c;
        try { c = val(ax.cond, env, ctx); } catch (e) { if (e.vz === 'undef' && !e.call) { e.call = call; e.ax = i; e.inCond = true; } throw e; }
        if (c.a !== 'vrai') { if (why) why.push({ i: i, k: 'cond', c: subst(ax.cond, env) }); return; }
      }
      apps.push({ i: i, env: env });
    });
    return apps;
  }
  var PENDING = {};
  function callValue(call, ctx) {
    var k = str(call), m = ctx.memo[k];
    if (m === PENDING || ctx.depth > 60) throw { vz: 'loop', call: call };
    if (m) { if (m.err) throw m.err; return m.v; }
    ctx.memo[k] = PENDING; ctx.depth++;
    try { var v = callCore(call, ctx); ctx.memo[k] = { v: v }; return v; }
    catch (e) { ctx.memo[k] = { err: e }; throw e; }
    finally { ctx.depth--; }
  }
  function callCore(call, ctx) {
    if (ctx.pre) {
      var pv;
      try { pv = val(ctx.pre.cond, preEnv(ctx.pre, call), ctx); } catch (e) { if (e.vz === 'undef' && !e.call) { e.call = call; e.inPre = true; } throw e; }
      if (pv.a !== 'vrai') throw { vz: 'undef', u: call, own: true };
    }
    var why = [], apps = applicable(call, ctx, why);
    if (!apps.length) throw { vz: 'incomplete', call: call, why: why };
    var vals = apps.map(function (ap) {
      try { return val(ctx.ax[ap.i].rhs, ap.env, ctx); } catch (e) { if (e.vz === 'undef' && !e.call) { e.call = call; e.ax = ap.i; } throw e; }
    });
    for (var j = 1; j < vals.length; j++) if (!eq(vals[j], vals[0])) throw { vz: 'inconsistent', call: call, i: apps[0].i, j: apps[j].i, vi: vals[0], vj: vals[j] };
    return vals[0];
  }

  /* ---------- essais : toutes les petites entrées, de la plus courte à la plus longue ---------- */
  function lists(el, max) {
    var out = [[]], lvl = [[]];
    for (var n = 1; n <= max; n++) {
      var nx = [];
      lvl.forEach(function (l) { el.forEach(function (x) { nx.push(l.concat([x])); }); });
      out = out.concat(nx); lvl = nx;
    }
    return out;
  }
  function domain(op) {
    var out = [[]];
    op.params.forEach(function (q) {
      var vs = q.s === 'L' ? lists(op.elems, op.max) : op.elems, nx = [];
      out.forEach(function (o) { vs.forEach(function (v) { nx.push(o.concat([v])); }); });
      out = nx;
    });
    function size(a) { return a.reduce(function (s, v) { return s + (Array.isArray(v) ? v.length : 0); }, 0); }
    return out.map(function (a, i) { return { a: a, i: i }; }).sort(function (x, y) { return size(x.a) - size(y.a) || x.i - y.i; }).map(function (o) { return o.a; });
  }
  function axRun(op, axioms, pre) {
    var ctx = { op: op, ax: axioms, pre: pre, memo: {}, depth: 0 }, inputs = domain(op), n = 0;
    for (var t = 0; t < inputs.length; t++) {
      var args = inputs[t], call = { f: op.id, args: args.map(fromJS) }, defd = !op.defined || op.defined.apply(null, args), pv = true;
      var expect = defd ? fromJS(op.ref.apply(null, args)) : null;
      if (pre) {
        try { pv = val(pre.cond, preEnv(pre, call), ctx).a === 'vrai'; }
        catch (e) { if (!e.vz) throw e; return { fail: { vz: 'pre-undef', call: call, u: e.u }, n: n, args: args }; }
      }
      if (defd && !pv) return { fail: { vz: 'pre-strict', call: call, expect: expect }, n: n, args: args };
      if (!defd) {
        if (!pv) { n++; continue; }
        var got = null;
        try { got = callValue(call, ctx); } catch (e) { if (!e.vz) throw e; }
        return { fail: { vz: 'pre-missing', call: call, got: got }, n: n, args: args };
      }
      n++;
      var v;
      try { v = callValue(call, ctx); } catch (e) { if (!e.vz) throw e; e.top = call; return { fail: e, n: n, args: args }; }
      if (!eq(v, expect)) return { fail: { vz: 'wrong', call: call, got: v, expect: expect }, n: n, args: args };
    }
    return { ok: true, n: n, ctx: ctx };
  }

  /* ---------- réécriture pas à pas d'un exemple (de l'intérieur vers l'extérieur, comme taa.js) ---------- */
  function at(t, p) { return p.reduce(function (n, i) { return n.args[i]; }, t); }
  function replaceAt(t, p, u) {
    if (!p.length) return u;
    var c = { f: t.f, args: t.args.slice(), infix: t.infix };
    c.args[p[0]] = replaceAt(t.args[p[0]], p.slice(1), u);
    return c;
  }
  function redexPath(t) {
    if (isVal(t)) return null;
    if ((t.f === 'et' || t.f === 'ou') && isVal(t.args[0]) && t.args[0].a === (t.f === 'et' ? 'faux' : 'vrai')) return [];
    for (var i = 0; i < t.args.length; i++) { var p = redexPath(t.args[i]); if (p) return [i].concat(p); }
    return [];
  }
  function reduceStep(sub, ctx, force) {
    var f = sub.f, A = sub.args;
    if (f === 'et') return { t: A[0].a === 'faux' ? FAUX : A[1], k: 'bool' };
    if (f === 'ou') return { t: A[0].a === 'vrai' ? VRAI : A[1], k: 'bool' };
    if (f !== ctx.op.id) {
      try { return { t: builtin(f, A), k: f }; } catch (e) { if (e.vz !== 'undef') throw e; return { stop: 'undef', base: true }; }
    }
    try {
      if (ctx.pre && val(ctx.pre.cond, preEnv(ctx.pre, sub), ctx).a !== 'vrai') return { stop: 'undef', own: true };
      var apps = applicable(sub, ctx);
    } catch (e2) { if (!e2.vz) throw e2; return { stop: 'undef', base: true }; }
    if (!apps.length) return { stop: 'incomplete' };
    var want = force && force[str(sub)], pick = apps[0];
    if (want !== undefined) apps.forEach(function (a) { if (a.i === want) pick = a; });
    var ax = ctx.ax[pick.i];
    return { t: subst(ax.rhs, pick.env), ax: pick.i, cond: ax.cond ? subst(ax.cond, pick.env) : null };
  }
  function axTrace(t0, ctx, force) {
    var steps = [], cur = t0;
    for (var g = 0; g < 40; g++) {
      var p = redexPath(cur);
      if (!p) return { steps: steps, end: cur };
      var r = reduceStep(at(cur, p), ctx, force);
      if (r.stop) { steps.push({ before: cur, path: p, stop: r }); return { steps: steps, stuck: r }; }
      var nx = replaceAt(cur, p, r.t);
      steps.push({ before: cur, path: p, r: r });
      cur = nx;
    }
    return { steps: steps, loop: true, end: cur };
  }

  /* ---------- affichage des termes (noms de la page, rôles en couleur, sous-termes marqués) ---------- */
  var PREC = { ou: 0, et: 1, '=': 2, '≠': 2, '<': 2, '≤': 2, '>': 2, '≥': 2, '+': 3, '-': 3 };
  function isInfix(t) { return t.f !== undefined && PREC[t.f] !== undefined && t.args && t.args.length === 2; }
  function sym(f) { return f === '-' ? '−' : f === 'et' || f === 'ou' ? nm(f) : f; }
  function render(t, o, path) {
    var h, html = o.html;
    if (t.a !== undefined) h = t.v ? t.a : nm(t.a);
    else if (isInfix(t)) {
      var P = PREC[t.f];
      h = side(t.args[0], P, false, path + '.0') + ' ' + sym(t.f) + ' ' + side(t.args[1], P, true, path + '.1');
    } else {
      var r = t.f === o.op ? o.opRole : ROLE[t.f], name = nm(t.f);
      h = (html ? '<span' + (r ? ' class="o-' + r + '"' : '') + '>' + esc(name) + '</span>' : name) + '(' + t.args.map(function (a, i) { return render(a, o, path + '.' + i); }).join(', ') + ')';
    }
    if (html && t.a !== undefined) h = esc(h);
    var m = o.marks && o.marks[path];
    return m && html ? '<span class="' + m + '">' + h + '</span>' : h;
    function side(c, P, right, cp) {
      var s = render(c, o, cp), cP = isInfix(c) ? PREC[c.f] : 99;
      return cP < P || (cP === P && (right || P === 2)) ? '(' + s + ')' : s;
    }
  }
  function pk(p) { return p.length ? '.' + p.join('.') : ''; }
  function txt(t) { return render(t, { html: false }, ''); }
  function axLine(ax) { return (ax.cond ? txt(ax.cond) + ' ⇒ ' : '') + txt(ax.lhs) + ' = ' + txt(ax.rhs); }
  function preLine(pre, op) {
    var inv = [];
    Object.keys(pre.names).forEach(function (n) { if (inv[pre.names[n]] === undefined) inv[pre.names[n]] = n; });
    var call = nm(op.id) + '(' + op.params.map(function (q, i) { return inv[i] || q.n; }).join(', ') + ')';
    return call + (EN ? ' is-defined-iaoi ' : ' est-défini-ssi ') + txt(pre.cond);
  }
  function listNote(t) { /* {a, b} pour une liste de valeurs, listevide pour la liste vide */
    var xs = [];
    while (t && t.f === 'cons') { xs.push(txt(t.args[0])); t = t.args[1]; }
    return t && t.a === 'listevide' ? (xs.length ? '{' + xs.join(', ') + '}' : nm('listevide')) : null;
  }
  function andList(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + T(' et ') + a[a.length - 1]; }

  /* ---------- l'atelier ---------- */
  function head(a, b) { return '<div class="bench-head"><span>' + esc(a) + '</span><span>' + esc(b) + '</span></div>'; }
  function mountAxioms(el) {
    var id = 'vza' + rid(), cur = 'supprime-sup', texts = {};
    el.classList.add('bench', 'vz-ax');
    el.innerHTML = head(T('Teste tes axiomes'), T('liste récursive')) +
      '<div class="bench-body">' +
      '<div class="row" role="group" aria-label="' + esc(T('Opération à définir')) + '">' + OPS.map(function (o) {
        return '<button type="button" class="chip-btn" data-op="' + esc(o.id) + '" aria-pressed="false">' + esc(nm(o.id)) + '</button>';
      }).join('') + '</div>' +
      '<div class="vz-prof"><code data-prof></code><span data-desc></span></div>' +
      '<label class="field" for="' + id + '-pre">' + T('Préconditions') + '<input id="' + id + '-pre" class="term-in" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="' + esc(T('aucune')) + '"></label>' +
      '<label class="field" for="' + id + '-ax">' + T('Axiomes, un par ligne') + '<textarea id="' + id + '-ax" class="term-in vz-ta" rows="4" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea></label>' +
      '<p class="vz-help">' + T('Une condition s’écrit avant ⇒ : {ex}. Tu peux taper -> pour ⇒, != pour ≠, <= pour ≤, >= pour ≥, & pour « et », et l pour λ.', { ex: '<code>e &gt; x ⇒ …</code>' }) +
      ' <span data-allowed></span></p>' +
      '<div class="row"><button type="button" class="btn primary" data-a="test">' + T('Tester') + '</button><button type="button" class="btn" data-a="draft">' + T('Brouillon à corriger') + '</button><button type="button" class="btn" data-a="clear">' + T('Effacer') + '</button></div>' +
      '</div>' +
      '<div class="vz-out"><p class="vz-verdict" aria-live="polite"></p><div class="vz-detail" data-detail></div></div>';
    var preIn = el.querySelector('#' + id + '-pre'), axIn = el.querySelector('#' + id + '-ax'), verdict = el.querySelector('.vz-verdict'), detail = el.querySelector('[data-detail]');
    var chips = U.$$('[data-op]', el);
    function op() { return OP[cur]; }
    function draftOf(o) {
      return { pre: T('aucune'), ax: o.draft.map(function (l) { return axLine(parseAxiom(l, o)); }).join('\n') };
    }
    function setMsg(m) { verdict.innerHTML = m; detail.innerHTML = ''; }
    function load(o, fresh) {
      var d = !fresh && texts[o.id] || draftOf(o);
      preIn.value = d.pre; axIn.value = d.ax;
      var sig = nm(o.id) + ' : ' + o.params.map(function (q) { return sortName(q.s); }).join(' × ') + ' → ' + sortName(o.res);
      el.querySelector('[data-prof]').textContent = sig;
      el.querySelector('[data-desc]').innerHTML = ' ' + esc(nm(o.id) + '(' + o.params.map(function (q) { return q.n; }).join(', ') + ')') + ' : ' + esc(T(o.desc));
      el.querySelector('[data-allowed]').textContent = T('Opérations permises : {ops}, et + − pour les entiers.', { ops: [nm(o.id), 'cons', nm('listevide'), nm('premier'), nm('fin'), nm('vrai'), nm('faux')].join(', ') });
      chips.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.op === o.id)); });
      setMsg(fresh || !texts[o.id] ? T('Ce brouillon contient une erreur fréquente. Clique sur Tester pour la trouver, corrige-la, puis teste à nouveau.') : T('Clique sur Tester.'));
    }
    function save() { texts[cur] = { pre: preIn.value, ax: axIn.value }; }
    chips.forEach(function (b) {
      b.addEventListener('click', function () { save(); cur = b.dataset.op; load(op()); });
    });
    el.querySelector('[data-a="draft"]').addEventListener('click', function () { load(op(), true); save(); });
    el.querySelector('[data-a="clear"]').addEventListener('click', function () { preIn.value = ''; axIn.value = ''; save(); setMsg(T('Écris tes préconditions et tes axiomes, puis clique sur Tester.')); axIn.focus(); });
    el.querySelector('[data-a="test"]').addEventListener('click', test);
    axIn.addEventListener('keydown', function (e) { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); test(); } });
    preIn.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); test(); } });

    function test() {
      save();
      var o = op(), res;
      try { res = report(o, preIn.value, axIn.value); }
      catch (e) { if (window.console) console.error(e); res = { v: '<span class="rw-err">' + T('Erreur interne de l’atelier.') + '</span>', d: '' }; }
      verdict.innerHTML = res.v; detail.innerHTML = res.d;
    }
    load(op());
  }

  /* verdict (v, annoncé) et détails (d) d'un essai */
  function report(o, preText, axText) {
    var P = axParse(o, preText, axText);
    if (P.errors) return { v: '<b class="vz-bad-t">' + T('Lecture impossible') + '</b>', d: '<ul class="vz-errs">' + P.errors.map(function (m) { return '<li>' + esc(m) + '</li>'; }).join('') + '</ul>' };
    var role = o.res === 'L' ? 'int' : 'obs', RO = { html: true, op: o.id, opRole: role };
    function code(t, marks) { return '<code>' + render(t, { html: true, op: o.id, opRole: role, marks: marks }, '') + '</code>'; }
    function vnote(t) { var l = listNote(t); return l && l !== txt(t) ? code(t) + ' = ' + esc(l) : code(t); }
    var read = '<div class="vz-read"><span class="vz-lbl">' + T('Axiomes lus') + '</span><ol class="vz-axl">' + P.axioms.map(function (ax) { return '<li><code>' + esc(axLine(ax)) + '</code></li>'; }).join('') + '</ol>' +
      '<span class="vz-lbl">' + (P.pre ? T('Précondition lue : {p}', { p: '<code>' + esc(preLine(P.pre, o)) + '</code>' }) : T('Précondition lue : aucune')) + '</span></div>';
    var r = axRun(o, P.axioms, P.pre), ctx = { op: o, ax: P.axioms, pre: P.pre, memo: {}, depth: 0 };
    void RO;
    function traceHTML(t0, force, expect) {
      var tr = axTrace(t0, ctx, force), shown = tr.steps.slice(0, 14), h = '<ol class="rw-steps">';
      shown.forEach(function (s) {
        var mk = {}; mk[pk(s.path)] = s.stop ? 'vz-bad' : 'rx';
        h += '<li><div><div class="term">' + render(s.before, { html: true, op: o.id, opRole: role, marks: mk }, '') + '</div><div class="rw-why">' + why(s, at(s.before, s.path)) + '</div></div></li>';
      });
      if (tr.steps.length > shown.length || tr.loop) h += '<li><div class="rw-why">' + T('… la réécriture continue sans fin.') + '</div></li>';
      else if (!tr.stuck) h += '<li><div><div class="term">' + render(tr.end, { html: true, op: o.id, opRole: role }, '') + '</div><div class="rw-why">' + T('forme finale') +
        (expect && !eq(expect, tr.end) ? ' · <span class="rw-err">' + T('attendu : {e}', { e: '<code>' + esc(txt(expect)) + '</code>' }) + '</span>' : '') + '</div></div></li>';
      return h + '</ol>';
    }
    function why(s, sub) {
      if (s.stop) {
        if (s.stop.stop === 'incomplete') return '<span class="rw-err">' + T('aucun axiome ne s’applique') + '</span>';
        if (s.stop.own) return '<span class="rw-err">' + T('indéfini : {m}', { m: T('interdit par ta précondition') }) + '</span>';
        return '<span class="rw-err">' + T('indéfini : {m}', { m: T('précondition {c}', { c: '<code>λ ≠ ' + esc(nm('listevide')) + '</code>' }) }) + '</span>';
      }
      var r2 = s.r;
      if (r2.ax !== undefined) return T('axiome {i}', { i: r2.ax + 1 }) + (EN ? ': ' : ' : ') + '<code>' + esc(axLine(ctx.ax[r2.ax])) + '</code>' +
        (r2.cond ? '<br>' + T('condition : {c}', { c: '<code>' + esc(txt(r2.cond)) + '</code>' }) : '');
      if (r2.k === 'premier') return T('axiome du cours : {a}', { a: '<code>' + esc(nm('premier') + '(cons(e, λ)) = e') + '</code>' });
      if (r2.k === 'fin') return T('axiome du cours : {a}', { a: '<code>' + esc(nm('fin') + '(cons(e, λ)) = λ') + '</code>' });
      if (r2.k === '+' || r2.k === '-') return T('calcul');
      if (isCmp(r2.k)) return T('comparaison');
      return T('booléen : {a}', { a: '<code>' + esc(txt(sub)) + ' = ' + esc(txt(r2.t)) + '</code>' });
    }
    function argsNote(args) {
      return o.params.map(function (q, i) { var v = fromJS(args[i]); return q.n + ' = ' + (listNote(v) || txt(v)); }).join(', ');
    }
    var nilC = '<code>' + esc(nm('listevide')) + '</code>', neq = 'λ ≠ ' + nm('listevide');
    if (r.ok) {
      var two = o.params.filter(function (q) { return q.s === 'L'; }).length > 1, els = andList(o.elems);
      var dom = T(two ? '{n} essais, sur tous les couples de listes de 0 à {m} éléments pris parmi {s}.' : '{n} essais, sur toutes les listes de 0 à {m} éléments pris parmi {s}.', { n: r.n, m: o.max, s: els });
      o.params.forEach(function (q) { if (q.s === 'E') dom += T(' {p} prend chaque valeur : {s}.', { p: q.n, s: els }); });
      var exCall = { f: o.id, args: o.ex.map(fromJS) };
      return {
        v: '<b class="vz-ok-t">' + T('Tout passe.') + '</b> ' + esc(dom) + ' ' + T('Aucun cas oublié, aucune contradiction, et chaque résultat est juste.'),
        d: read + '<p class="vz-note">' + T('Des essais ne prouvent rien, mais ils trouvent vite les erreurs : relis aussi le profil et la partie avec.') + '</p>' +
          '<p class="vz-lbl">' + T('Exemple de réécriture : {t}', { t: '<code>' + esc(txt(exCall)) + '</code>' }) + '</p>' + traceHTML(exCall, null, null)
      };
    }
    var f = r.fail, top = f.top || f.call, kind = f.vz, title, msg = '', hint = '', tr = '';
    var cx = '<p class="vz-cx">' + T('Contre-exemple : {t}, avec {a}.', { t: code(top), a: esc(argsNote(r.args)) }) + '</p>';
    var force = {};
    if (kind === 'incomplete') {
      title = T('Incomplet.');
      msg = T('Aucun axiome ne s’applique à {t}.', { t: code(f.call) });
      var reasons = f.why.map(function (w) { return w.k === 'form' ? T('axiome {i} : forme différente', { i: w.i + 1 }) : T('axiome {i} : condition fausse, {c}', { i: w.i + 1, c: '<code>' + esc(txt(w.c)) + '</code>' }); });
      if (reasons.length) msg += '<ul class="vz-why">' + reasons.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
      var jsArgs = f.call.args, hasNil = jsArgs.some(function (a) { return a.a === 'listevide'; });
      if (o.defined && f.call.args[0].a === 'listevide') hint = T('{t} n’a pas de sens : un de tes axiomes y mène. Ajoute-lui une condition pour qu’il ne s’applique pas à ce cas.', { t: code(f.call) });
      else if (hasNil) hint = T('Il manque le cas {nil} : écris un axiome pour lui.', { nil: nilC });
      else hint = T('Tes conditions ne couvrent pas ce cas : vérifie qu’elles couvrent toutes les possibilités (par exemple e > x et e ≤ x).');
      tr = traceHTML(top, force, null);
    } else if (kind === 'inconsistent') {
      title = T('Inconsistant.');
      msg = T('Les axiomes {i} et {j} s’appliquent tous les deux à {t}, et donnent deux résultats différents : {a} et {b}.', { i: f.i + 1, j: f.j + 1, t: code(f.call), a: vnote(f.vi), b: vnote(f.vj) });
      hint = T('Rends leurs conditions disjointes, par exemple e = x d’un côté et e ≠ x de l’autre.');
      [f.i, f.j].forEach(function (i) { var fo = {}; fo[str(f.call)] = i; tr += '<p class="vz-lbl">' + T('Avec l’axiome {i} :', { i: i + 1 }) + '</p>' + traceHTML(top, fo, null); });
    } else if (kind === 'undef') {
      title = T('Indéfini.');
      var u = code(f.u);
      if (f.inPre) msg = T('Ta précondition n’a pas de sens pour {t} : elle passe par {u}, qui n’est pas défini.', { t: code(f.call), u: u });
      else if (f.inCond) { msg = T('La condition de l’axiome {i} n’a pas de sens pour {t} : elle passe par {u}, qui n’est pas défini.', { i: f.ax + 1, t: code(f.call), u: u }); hint = T('Teste d’abord que la liste n’est pas vide : {c} & …', { c: '<code>' + esc(neq) + '</code>' }); }
      else if (f.own) { msg = T('L’axiome {i} s’applique à {t}, mais son calcul mène à {u}, que ta précondition interdit.', { i: f.ax + 1, t: code(f.call), u: u }); hint = T('Ajoute à l’axiome {i} une condition qui l’écarte de ce cas, ou revois ta précondition.', { i: f.ax + 1 }); }
      else { msg = T('L’axiome {i} s’applique aussi à {t}, mais son calcul passe par {u}, qui n’est pas défini.', { i: f.ax + 1, t: code(f.call), u: u }); hint = T('Ajoute une condition pour que cet axiome ne s’applique pas à ce cas, par exemple {c} ⇒ …', { c: '<code>' + esc(neq) + '</code>' }); }
      if (f.ax !== undefined) force[str(f.call)] = f.ax;
      tr = traceHTML(top, force, null);
    } else if (kind === 'loop') {
      title = T('Sans fin.');
      msg = T('La réécriture de {t} ne s’arrête pas.', { t: code(top) });
      hint = T('Dans le cas cons(e, λ), l’appel récursif doit porter sur λ, une liste plus courte.');
      tr = traceHTML(top, force, null);
    } else if (kind === 'pre-strict') {
      title = T('Précondition trop forte.');
      msg = T('Ta précondition interdit {t}. Pourtant ce terme a une valeur : {v}.', { t: code(f.call), v: vnote(f.expect) });
      hint = T('N’invente pas de précondition : {op} a un sens pour toutes les listes, même vides. Les appels récursifs finissent d’ailleurs sur {nil}.', { op: '<code>' + esc(nm(o.id)) + '</code>', nil: nilC });
    } else if (kind === 'pre-missing') {
      title = T('Précondition manquante.');
      msg = T('{t} n’a pas de sens : la liste vide n’a pas de dernier élément. Ta précondition doit l’exclure.', { t: code(f.call) }) + (f.got ? T(' Tes axiomes lui donnent pourtant une valeur : {v}.', { v: vnote(f.got) }) : '');
      hint = T('Écris par exemple : {p}', { p: '<code>' + esc(nm(o.id) + '(λ) ' + (EN ? 'is-defined-iaoi ' : 'est-défini-ssi ') + neq) + '</code>' });
    } else if (kind === 'pre-undef') {
      title = T('Indéfini.');
      msg = T('Ta précondition n’a pas de sens pour {t} : elle passe par {u}, qui n’est pas défini.', { t: code(f.call), u: code(f.u) });
    } else {
      title = T('Résultat faux.');
      msg = T('Résultat faux pour {t} : tes axiomes donnent {g}, on attend {e}.', { t: code(f.call), g: vnote(f.got), e: vnote(f.expect) });
      hint = T('Suis la réécriture : elle montre où le calcul s’écarte du résultat attendu.');
      tr = traceHTML(top, force, f.expect);
    }
    return { v: '<b class="vz-bad-t">' + title + '</b> ' + msg, d: cx + (hint ? '<p class="vz-hint">' + hint + '</p>' : '') + tr + read };
  }

  /* ================================================================ B. Le terme en arbre (pile) */
  function mountTree(el) {
    var S = R.taa && R.taa.rewrite, TM = R.taa && R.taa.term;
    if (!S || !TM) return;
    var set = S.SETS.PILE; S.compile(set);
    var presets = [
      { name: T('sommet après un dépiler'), t: 'sommet(dépiler(empiler(empiler(pilevide, a), b)))' },
      { name: T('pile vide ?'), t: 'estvide(dépiler(empiler(pilevide, a)))' },
      { name: T('deux dépiler'), t: 'sommet(dépiler(dépiler(empiler(empiler(empiler(pilevide, a), b), c))))' }
    ];
    var phases = [], k = 0;
    el.classList.add('bench', 'vz-tr');
    el.innerHTML = head(T('Le terme en arbre'), T('axiomes : {s}', { s: set.name })) +
      '<div class="bench-body">' +
      '<div class="row" role="group" aria-label="' + esc(T('Termes proposés')) + '">' + presets.map(function (p, i) { return '<button type="button" class="chip-btn" data-p="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(p.name) + '</button>'; }).join('') + '</div>' +
      '<div class="vz-tree" data-tree></div>' +
      '<div class="term" data-lin></div>' +
      '<div class="vz-axrow" data-ax></div>' +
      '<p class="readout" data-msg aria-live="polite"></p></div>' +
      '<div class="ctrls"><div class="row"><button type="button" class="btn" data-a="prev">' + T('Étape précédente') + '</button><button type="button" class="btn primary" data-a="next">' + T('Étape suivante') + '</button>' +
      '<button type="button" class="btn" data-a="reset">' + T('Recommencer') + '</button><span class="vz-count" data-count></span></div></div>';
    var q = function (s) { return el.querySelector(s); };

    function bindPaths(pat, t, path, out) {
      if (pat.a !== undefined) { if (set.vars[pat.a] && !out[pat.a]) out[pat.a] = path; return; }
      pat.args.forEach(function (a, i) { bindPaths(a, t.args[i], path.concat(i), out); });
    }
    function varOrder(pat, out) { if (pat.a !== undefined) { if (set.vars[pat.a] && out.indexOf(pat.a) < 0) out.push(pat.a); } else pat.args.forEach(function (a) { varOrder(a, out); }); return out; }
    function build(src) {
      var t = TM.parse(S.rename(src)), out = [{ k: 'start', t: t }], n = 0;
      for (var g = 0; g < 20; g++) {
        var s = S.step(t, set, 0);
        if (!s || s.undef) break;
        n++;
        var red = at(t, s.path), b = {}, order = varOrder(s.ax.L, []);
        bindPaths(s.ax.L, red, [], b);
        out.push({ k: 'motif', t: t, s: s, n: n });
        if (order.length) out.push({ k: 'vars', t: t, s: s, n: n, b: b, order: order });
        out.push({ k: 'repl', t: s.after, s: s, n: n, b: b, order: order });
        t = s.after;
      }
      out[out.length - 1].last = n;
      return out;
    }
    /* disposition : feuilles de gauche à droite, chaque nœud au-dessus de ses enfants */
    var CH = 7.5, NH = 24, GAP = 12, DY = 46, PAD = 14;
    function layout(t) {
      var nodes = [], cursor = 0, maxD = 0;
      (function go(n, path, d) {
        var lbl = n.a !== undefined ? n.a : n.f, node = { n: n, path: path, d: d, lbl: lbl, w: Math.max(26, lbl.length * CH + 14) };
        nodes.push(node); maxD = Math.max(maxD, d);
        if (n.args && n.args.length) {
          var kids = n.args.map(function (a, i) { return go(a, path.concat(i), d + 1); });
          node.kids = kids; node.x = (kids[0].x + kids[kids.length - 1].x) / 2;
        } else { node.x = cursor + node.w / 2; cursor += node.w + GAP; }
        return node;
      })(t, [], 0);
      return { nodes: nodes, maxD: maxD };
    }
    function under(path, p) { return p.length >= path.length && path.every(function (v, i) { return v === p[i]; }); }
    function bbox(L, path) {
      var b = null;
      L.nodes.forEach(function (n) {
        if (!under(path, n.path)) return;
        var x0 = n.x - n.w / 2, x1 = n.x + n.w / 2, y0 = n.d * DY, y1 = y0 + NH;
        b = b ? { x0: Math.min(b.x0, x0), x1: Math.max(b.x1, x1), y0: Math.min(b.y0, y0), y1: Math.max(b.y1, y1) } : { x0: x0, x1: x1, y0: y0, y1: y1 };
      });
      return b;
    }
    function rect(b, pad, cls) { return '<rect class="' + cls + '" x="' + (b.x0 - pad).toFixed(1) + '" y="' + (b.y0 - pad).toFixed(1) + '" width="' + (b.x1 - b.x0 + 2 * pad).toFixed(1) + '" height="' + (b.y1 - b.y0 + 2 * pad).toFixed(1) + '" rx="8"/>'; }
    function svg(t, hl) {
      var L = layout(t), minX = Infinity, maxX = -Infinity;
      L.nodes.forEach(function (n) { minX = Math.min(minX, n.x - n.w / 2); maxX = Math.max(maxX, n.x + n.w / 2); });
      var W = maxX - minX + 2 * PAD, H = L.maxD * DY + NH + 2 * PAD + 6, dx = PAD - minX, dy = PAD + 6, s = '';
      if (hl.region) s += rect(bbox(L, hl.region.path), 6, hl.region.cls);
      (hl.boxes || []).forEach(function (bx) {
        var b = bbox(L, bx.path);
        s += rect(b, 3, 'vz-box ' + bx.cls) + '<g class="vz-tag ' + bx.cls + '"><rect x="' + (b.x0 - 3).toFixed(1) + '" y="' + (b.y0 - 15).toFixed(1) + '" width="' + (bx.name.length * 7.5 + 8).toFixed(1) + '" height="13" rx="3"/><text x="' + (b.x0 + 1).toFixed(1) + '" y="' + (b.y0 - 5).toFixed(1) + '">' + esc(bx.name) + '</text></g>';
      });
      L.nodes.forEach(function (n) { (n.kids || []).forEach(function (c) { s += '<line class="vz-edge" x1="' + n.x.toFixed(1) + '" y1="' + (n.d * DY + NH) + '" x2="' + c.x.toFixed(1) + '" y2="' + (c.d * DY) + '"/>'; }); });
      L.nodes.forEach(function (n) {
        var role = set.roles[n.lbl] || 'atom';
        s += '<g class="vz-node ' + role + '"><rect x="' + (n.x - n.w / 2).toFixed(1) + '" y="' + n.d * DY + '" width="' + n.w.toFixed(1) + '" height="' + NH + '" rx="6"/><text x="' + n.x.toFixed(1) + '" y="' + (n.d * DY + 16.5) + '" text-anchor="middle">' + esc(n.lbl) + '</text></g>';
      });
      return '<svg viewBox="0 0 ' + W.toFixed(0) + ' ' + H.toFixed(0) + '" width="' + W.toFixed(0) + '" height="' + H.toFixed(0) + '" role="img" aria-label="' + esc(T('Le terme {t}, dessiné en arbre', { t: TM.str(t) })) + '"><g transform="translate(' + dx.toFixed(1) + ',' + dy + ')">' + s + '</g></svg>';
    }
    /* terme écrit, avec des classes sur des sous-termes (chemins) */
    function lin(t, marks) {
      return (function go(n, path) {
        var h = n.a !== undefined ? esc(n.a) : (function () { var r = set.roles[n.f]; return '<span' + (r ? ' class="o-' + r + '"' : '') + '>' + esc(n.f) + '</span>(' + n.args.map(function (a, i) { return go(a, path.concat(i)); }).join(', ') + ')'; })();
        var m = marks[pk(path)];
        return m ? '<span class="' + m + '">' + h + '</span>' : h;
      })(t, []);
    }
    var VC = ['vz-c1', 'vz-c2'];
    function axHTML(ax, order) {
      var cls = {}; order.forEach(function (v, i) { cls[v] = VC[i] || VC[1]; });
      return T('Axiome {id} : {a}', { id: esc(ax.id), a: '<code>' + esc(S.axText(ax)).replace(/[A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ0-9_]*/g, function (w) { return cls[w] ? '<span class="vz-vn ' + cls[w] + '">' + w + '</span>' : w; }) + '</code>' });
    }
    function head0(t) { return t.a !== undefined ? t.a : t.f; }
    function paint() {
      var ph = phases[k], t = ph.t, hl = {}, marks = {}, msg = '', ax = '';
      if (ph.k === 'start') {
        msg = T('Chaque opération est un nœud, ses arguments sont ses enfants. La racine, {r}, est l’opération faite en dernier : le calcul part du bas.', { r: '<code>' + esc(head0(t)) + '</code>' });
      } else {
        var s = ph.s, path = s.path, red = at(ph.k === 'repl' ? phases[k - 1].t : t, path), order = ph.order || varOrder(s.ax.L, []);
        ax = axHTML(s.ax, order);
        if (ph.k === 'motif' || ph.k === 'vars') {
          hl.region = { path: path, cls: 'vz-red' }; marks[pk(path)] = 'rx';
          var inner = s.ax.L.args[0], g = inner.a !== undefined ? inner.a : inner.f;
          if (ph.k === 'motif') {
            msg = T('<b>Étape {n}, le motif.</b> Le sous-arbre surligné, {f} posé directement sur {g}, a la forme du côté gauche de l’axiome {id}.', { n: ph.n, f: '<code>' + esc(red.f) + '</code>', g: '<code>' + esc(g) + '</code>', id: esc(s.ax.id) });
            if (path.length) {
              var par = at(t, path.slice(0, -1)), clash = set.axioms.some(function (a) { return a.L.f === par.f && a.L.args[0] && a.L.args[0].f === red.f; });
              if (!clash) msg += T(' Au-dessus, {pf} est posé sur {f} : aucun axiome ne commence ainsi. Il faut d’abord réduire le sous-arbre surligné.', { pf: '<code>' + esc(par.f) + '</code>', f: '<code>' + esc(red.f) + '</code>' });
            }
          } else {
            hl.boxes = order.map(function (v, i) { var bp = path.concat(ph.b[v]); marks[pk(bp)] = 'vz-vt ' + (VC[i] || VC[1]); return { path: bp, cls: VC[i] || VC[1], name: v }; });
            msg = T('<b>Étape {n}, les variables.</b> {list}.', { n: ph.n, list: order.map(function (v, i) { return '<span class="vz-vn ' + (VC[i] || VC[1]) + '">' + esc(v) + '</span> = <code>' + esc(TM.str(at(red, ph.b[v]))) + '</code>'; }).join(', ') });
          }
        } else {
          var rhs = s.ax.R, vi = rhs.a !== undefined ? order.indexOf(rhs.a) : -1, cls = vi >= 0 ? (VC[vi] || VC[1]) : 'vz-red';
          var newSub = at(t, path);
          if (vi >= 0) hl.boxes = [{ path: path, cls: cls, name: rhs.a }]; else hl.region = { path: path, cls: 'vz-red' };
          marks[pk(path)] = vi >= 0 ? 'vz-vt ' + cls : 'rx';
          msg = T('<b>Étape {n}, le remplacement.</b> Le côté droit de l’axiome est {r} : le sous-arbre surligné devient {v}.', { n: ph.n, r: '<code>' + esc(TM.str(rhs)) + '</code>', v: '<code>' + esc(TM.str(newSub)) + '</code>' });
          if (ph.last) msg += T(ph.last > 1 ? ' Forme finale : {t}. Plus aucun axiome ne s’applique, en {n} étapes.' : ' Forme finale : {t}. Plus aucun axiome ne s’applique, en 1 étape.', { t: '<code>' + esc(TM.str(t)) + '</code>', n: ph.last });
        }
      }
      q('[data-tree]').innerHTML = svg(t, hl);
      q('[data-lin]').innerHTML = lin(t, marks);
      q('[data-ax]').innerHTML = ax;
      q('[data-msg]').innerHTML = msg;
      q('[data-count]').textContent = T('{i} sur {n}', { i: k + 1, n: phases.length });
      q('[data-a="prev"]').disabled = k === 0;
      q('[data-a="next"]').disabled = k === phases.length - 1;
    }
    function load(i) {
      phases = build(presets[i].t); k = 0;
      U.$$('[data-p]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.p === i)); });
      paint();
    }
    q('[data-a="next"]').addEventListener('click', function () { if (k < phases.length - 1) { k++; paint(); } });
    q('[data-a="prev"]').addEventListener('click', function () { if (k > 0) { k--; paint(); } });
    q('[data-a="reset"]').addEventListener('click', function () { k = 0; paint(); });
    U.$$('[data-p]', el).forEach(function (b) { b.addEventListener('click', function () { load(+b.dataset.p); }); });
    window.addEventListener('beforeprint', function () { k = phases.length - 1; paint(); });
    load(0);
  }

  /* ================================================================ C. défiler(enfiler(f, e)) = enfiler(défiler(f), e) */
  function mountQueue(el) {
    var EN_N = R.taa && R.taa.rewrite && R.taa.rewrite.EN_NAMES || {}, F = EN ? 'q' : 'f', E = 'c';
    function qn(s) { return EN ? s.replace(/[A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ0-9_]*/g, function (w) { return w === 'f' ? 'q' : EN_N[w] || w; }) : s; }
    function c(s) { return '<code>' + esc(qn(s)) + '</code>'; }
    var cases = [{ f: ['a', 'b'] }, { f: ['a'] }, { f: [] }], cur = 0;
    el.classList.add('bench', 'vz-q');
    el.innerHTML = head(T('Deux ordres, la même file'), T('file FIFO')) +
      '<div class="bench-body">' +
      '<div class="row" role="group" aria-label="' + esc(T('File de départ')) + '">' + cases.map(function (k, i) {
        return '<button type="button" class="chip-btn" data-c="' + i + '" aria-pressed="' + (i === 0) + '">' + (k.f.length ? esc(F + ' = {' + k.f.join(', ') + '}') : esc(T('{f} vide', { f: F }))) + '</button>';
      }).join('') + '</div>' +
      '<p class="vz-note">' + T('Dans chaque file, la tête, celle qui sort, est à gauche.') + '</p>' +
      '<div class="vz-cols" data-cols></div>' +
      '<p class="readout" data-out aria-live="polite"></p></div>';
    function qbox(items, opt) {
      opt = opt || {};
      if (opt.undef) return '<div class="vz-qbox"><span class="vz-qerr">' + T('indéfini') + '</span></div>';
      var h = opt.out ? '<span class="vz-qp out" title="' + esc(T('sort')) + '">' + esc(opt.out) + '</span><span class="vz-qarrow" aria-hidden="true">←</span>' : '';
      h += items.length ? items.map(function (x, i) { return '<span class="vz-qp' + (opt.isNew && i === items.length - 1 ? ' new' : '') + '">' + esc(x) + '</span>'; }).join('')
        : '<span class="vz-qempty">' + esc(qn('filevide')) + '</span>';
      return '<div class="vz-qbox">' + h + '</div>';
    }
    function col(title, term, rows) {
      return '<div class="vz-col"><div class="vz-col-h"><b>' + esc(title) + '</b>' + c(term) + '</div><ol class="vz-qsteps">' + rows.map(function (r) {
        return '<li>' + (r.op ? '<span class="vz-op" aria-hidden="true">↓ ' + esc(qn(r.op)) + '</span>' : '') + '<span class="vz-qt">' + c(r.t) + '</span>' + r.box + '</li>';
      }).join('') + '</ol></div>';
    }
    function paint() {
      var f = cases[cur].f, withE = f.concat([E]), empty = !f.length;
      var left = col(T('Enfiler, puis défiler'), 'défiler(enfiler(f, ' + E + '))', [
        { t: 'f', box: qbox(f) },
        { op: 'enfiler ' + E, t: 'enfiler(f, ' + E + ')', box: qbox(withE, { isNew: true }) },
        { op: 'défiler', t: 'défiler(enfiler(f, ' + E + '))', box: qbox(withE.slice(1), { out: withE[0] }) }]);
      var right = col(T('Défiler, puis enfiler'), 'enfiler(défiler(f), ' + E + ')', [
        { t: 'f', box: qbox(f) },
        { op: 'défiler', t: 'défiler(f)', box: empty ? qbox([], { undef: true }) : qbox(f.slice(1), { out: f[0] }) },
        { op: 'enfiler ' + E, t: 'enfiler(défiler(f), ' + E + ')', box: empty ? qbox([], { undef: true }) : qbox(f.slice(1).concat([E]), { isNew: true }) }]);
      el.querySelector('[data-cols]').innerHTML = left + right;
      var res = withE.slice(1);
      el.querySelector('[data-out]').innerHTML = !empty
        ? T('Même file des deux côtés : {q}. Enfiler {e} avant ou après le défiler ne change rien, car ce n’est pas {e} qui sort : c’est {a}, le premier de {f}. C’est l’axiome {ax}.', { q: '<b>' + esc(res.join(', ')) + '</b>', e: c(E), a: c(f[0]), f: c('f'), ax: c('estvide(f) = Faux ⇒ défiler(enfiler(f, e)) = enfiler(défiler(f), e)') })
        : T('Ici, les deux côtés ne vont plus ensemble : à gauche, {e} entre puis ressort aussitôt, il reste {nil} ; à droite, {t} n’existe pas (précondition). D’où la condition {c}, et un axiome à part pour ce cas : {ax}.', { e: c(E), nil: c('filevide'), t: c('défiler(filevide)'), c: c('estvide(f) = Faux'), ax: c('estvide(f) = Vrai ⇒ défiler(enfiler(f, e)) = filevide') });
      U.$$('[data-c]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.c === cur)); });
    }
    U.$$('[data-c]', el).forEach(function (b) { b.addEventListener('click', function () { cur = +b.dataset.c; paint(); }); });
    paint();
  }

  var MOUNT = { axiomes: mountAxioms, arbre: mountTree, file: mountQueue };
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
      U.$$('[data-viz]').forEach(function (el) { var m = MOUNT[el.getAttribute('data-viz')]; if (m && !el.dataset.vizOn) { el.dataset.vizOn = '1'; m(el); } });
    });
  }
  /* pour les tests (node) et la console */
  R.taaViz = { OPS: OP, axParse: axParse, axRun: axRun, axTrace: axTrace, report: report, txt: txt, axLine: axLine, listNote: listNote, fromJS: fromJS };
})();
