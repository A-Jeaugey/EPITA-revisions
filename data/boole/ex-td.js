/* Archi B2 (algèbre de Boole) — fiches du TD 1 (Moodle, à préparer pour la semaine du 9 novembre 2026).
   Pas de corrigé publié : toutes les réponses et toutes les étapes de calcul sont vérifiées par programme (tables de
   vérité complètes, simplification exacte). Les expressions du TD gardent leurs minuscules.
   Format : celui de data/boole/ex-annales.js, kind: 'td', exam: null ; near = exercices de sujet identiques ou voisins.
   Plusieurs expressions du TD sont retombées telles quelles : S2, S5 et S7 de l’exercice 1 à l’examen B2 2025-2026
   (Ex 1), S6 au partiel 2016-2017 (Ex 4), S1 de l’exercice 3.2 à l’examen 2 2023-2024 (Ex 2). */
(function () {
  'use strict';
  var X = window.BOOLE_EX = window.BOOLE_EX || [];
  var K = window.BOOLE_K;
  var bx = K.bx, calc = K.calc, p = K.p, km = K.km, tt = K.tt, tool = K.tool, pairs = K.pairs;
  var NOTE = 'Pas de corrigé publié : réponses et étapes de calcul vérifiées par programme (tables de vérité complètes).';
  var V3 = ['a', 'b', 'c'], V4 = ['a', 'b', 'c', 'd'];
  function add(ex) { X.push(ex); }

  add({
    id: 'td1-ex1', exam: null, kind: 'td', order: 1, src: 'TD 1 · Ex 1', title: 'Simplifier par la méthode algébrique (7 expressions)', pts: null,
    topics: ['simplification', 'xor'], lvl: 2, time: 25, near: ['p2025-ex1', 'p2016-ex4', 'p2024-ex1'],
    intro: p('Simplifiez les expressions ci-dessous par la méthode algébrique.') + pairs('Expression', 'Expression simplifiée', [
      ['S1 = (a + b).(~a + ~b)'], ['S2 = ~(a.b + ~a.~b + ~a.b)'], ['S3 = (a + ~b).(a + b) + c.(~a + b)'], ['S4 = ~(~a.~c.~d + ~b.~c.~d)'],
      ['S5 = (a + ~b.~c).~(a.b)'], ['S6 = a.b.c + a.~b.~c + ~a.b.~c + ~a.b.c'], ['S7 = a + b.c + ~a.(~b + ~c).(a.d + c)']]),
    hints: K.H_SIMP.concat(['(X + Y).(X + Z) = X + Y.Z : la distributivité du OU règle S3 en une ligne.']),
    solution: [
      { t: 'S1 = (a + b).(~a + ~b)', html: calc([['(a + b).(~a + ~b)', ''], ['a.~a + a.~b + b.~a + b.~b', 'développement'], ['a.~b + ~a.b', 'a.~a = b.~b = 0'], ['a ^ b', 'définition du OU exclusif']]) },
      { t: 'S2 = ~(a.b + ~a.~b + ~a.b)', html: calc([['~(a.b + ~a.~b + ~a.b)', ''], ['~(a.b + ~a.(~b + b))', 'factorisation de ~a'], ['~(a.b + ~a)', '~b + b = 1'], ['~(~a + b)', 'théorème 2 : ~a + a.b = ~a + b'], ['a.~b', 'De Morgan']]) },
      { t: 'S3 = (a + ~b).(a + b) + c.(~a + b)', html: calc([['(a + ~b).(a + b) + c.(~a + b)', ''], ['a + ~b.b + c.(~a + b)', '(X + Y).(X + Z) = X + Y.Z'], ['a + ~a.c + b.c', '~b.b = 0, développement'], ['a + c + b.c', 'théorème 2 : a + ~a.c = a + c'], ['a + c', 'théorème 1 : c absorbe b.c']]) },
      { t: 'S4 = ~(~a.~c.~d + ~b.~c.~d)', html: calc([['~(~a.~c.~d + ~b.~c.~d)', ''], ['~(~c.~d.(~a + ~b))', 'factorisation de ~c.~d'], ['c + d + ~(~a + ~b)', 'De Morgan'], ['c + d + a.b', 'De Morgan']]) },
      { t: 'S5 = (a + ~b.~c).~(a.b)', html: calc([['(a + ~b.~c).~(a.b)', ''], ['(a + ~b.~c).(~a + ~b)', 'De Morgan'], ['a.~a + a.~b + ~a.~b.~c + ~b.~c', 'développement (~b.~b = ~b)'], ['a.~b + ~a.~b.~c + ~b.~c', 'a.~a = 0'], ['a.~b + ~b.~c', 'théorème 1 : ~b.~c absorbe ~a.~b.~c']]) },
      { t: 'S6 = a.b.c + a.~b.~c + ~a.b.~c + ~a.b.c', html: calc([['a.b.c + a.~b.~c + ~a.b.~c + ~a.b.c', ''], ['a.b.c + a.~b.~c + ~a.b.(~c + c)', 'factorisation de ~a.b'], ['a.b.c + a.~b.~c + ~a.b', '~c + c = 1'], ['b.(a.c + ~a) + a.~b.~c', 'factorisation de b'], ['b.(c + ~a) + a.~b.~c', 'théorème 2 : ~a + a.c = ~a + c'], ['b.c + ~a.b + a.~b.~c', 'développement']]) +
        p('Aucun terme ne s’absorbe plus : c’est la forme la plus simple en somme de produits (le tableau de Karnaugh le confirme). Avec le OU exclusif, on peut aller plus loin :') +
        calc([['b.(c + ~a) + ~b.(a.~c)', ''], ['b.~(a.~c) + ~b.(a.~c)', 'De Morgan : ~(a.~c) = ~a + c'], ['b ^ (a.~c)', 'X.~Y + ~X.Y = X ^ Y']]) +
        km({ vars: V3, rows: 1, expr: 'a.b.c + a.~b.~c + ~a.b.~c + ~a.b.c', name: 'S6', title: 'Trois cercles : ~a.b, b.c et a.~b.~c, isolé' }) },
      { t: 'S7 = a + b.c + ~a.(~b + ~c).(a.d + c)', html: calc([['a + b.c + ~a.(~b + ~c).(a.d + c)', ''], ['a + b.c + ~a.(~b + ~c).a.d + ~a.(~b + ~c).c', 'développement'], ['a + b.c + ~a.~b.c + ~a.~c.c', '~a.a = 0, puis développement'], ['a + b.c + ~a.~b.c', '~c.c = 0'], ['a + b.c + ~b.c', 'théorème 2 : a + ~a.X = a + X'], ['a + c', 'b.c + ~b.c = c']]) }],
    answer: '<div class="calc res">' + [['S1 = a.~b + ~a.b', 'a ^ b'], ['S2 = a.~b', ''], ['S3 = a + c', ''], ['S4 = c + d + a.b', ''], ['S5 = a.~b + ~b.~c', ''], ['S6 = b.c + ~a.b + a.~b.~c', 'b ^ (a.~c)'], ['S7 = a + c', '']].map(function (r) {
      return '<div><span>' + bx(r[0]) + '</span>' + (r[1] ? '<span class="why-r">soit ' + bx(r[1]) + '</span>' : '') + '</div>';
    }).join('') + '</div>',
    traps: ['S4 : De Morgan transforme ~(X.Y.Z) en ~X + ~Y + ~Z, pas en ~X.~Y.~Z.', 'S6 : croire que a.~b.~c se simplifie avec un autre terme ; il n’a aucun voisin à 1 dans le tableau.', 'S7 : oublier que ~a.a = 0 supprime tout le produit ~a.(~b + ~c).a.d.'],
    official: false, note: NOTE + ' S2, S5 et S7 sont retombées telles quelles à l’examen B2 2025-2026 (Ex 1, en majuscules), S6 au partiel 2016-2017 (Ex 4).'
  });

  add({
    id: 'td1-ex2', exam: null, kind: 'td', order: 2, src: 'TD 1 · Ex 2', title: 'NON, ET, OU et OU exclusif avec des portes NON-ET seules', pts: null,
    topics: ['nand', 'schema', 'xor'], lvl: 2, time: 15, near: ['p2025-ex5'],
    intro: p('Donnez le schéma de câblage des portes NON, ET, OU et OU EXCLUSIF, en utilisant uniquement des portes NON-ET.'),
    hints: ['Une porte NON-ET dont les deux entrées sont reliées est un inverseur : ~(A.A) = ~A.', 'ET : un NON-ET, puis un inverseur. OU : De Morgan, A + B = ~(~A.~B).', 'OU exclusif : A ^ B = A.~B + ~A.B = ~(~(A.~B).~(~A.B)).'],
    solution: [
      { t: 'NON : 1 porte', html: p(bx('~(A.A) = ~A') + ' : les deux entrées reçoivent A.') + tool('schema', { w: 340, h: 90, live: true, inputs: [{ id: 'A', x: 30, y2: 60 }], gates: [{ id: 'n1', type: 'nand', x: 110, y: 20, in: ['A', 'A'] }], outputs: [{ from: 'n1', label: '~A', x: 240 }] }) },
      { t: 'ET : 2 portes', html: p(bx('A.B = ~~(A.B)') + ' : le premier NON-ET donne ' + bx('~(A.B)') + ', le second, monté en inverseur, l’inverse.') + tool('schema', { w: 440, h: 100, live: true, inputs: [{ id: 'A', x: 26, y2: 70 }, { id: 'B', x: 52, y2: 70 }], gates: [{ id: 'n1', type: 'nand', x: 110, y: 25, in: ['A', 'B'] }, { id: 'n2', type: 'nand', x: 230, y: 25, in: ['n1', 'n1'] }], outputs: [{ from: 'n2', label: 'A.B', x: 340 }] }) },
      { t: 'OU : 3 portes', html: p(bx('A + B = ~(~A.~B)') + ' : deux inverseurs, puis un NON-ET.') + tool('schema', { w: 460, h: 150, live: true, inputs: [{ id: 'A', x: 26, y2: 130 }, { id: 'B', x: 52, y2: 130 }], gates: [{ id: 'n1', type: 'nand', x: 110, y: 20, in: ['A', 'A'] }, { id: 'n2', type: 'nand', x: 110, y: 86, in: ['B', 'B'] }, { id: 'n3', type: 'nand', x: 250, y: 53, in: ['n1', 'n2'] }], outputs: [{ from: 'n3', label: 'A + B', x: 360 }] }) },
      { t: 'OU exclusif : 5 portes', html: calc([['A ^ B', ''], ['A.~B + ~A.B', 'définition'], ['~(~(A.~B).~(~A.B))', 'double barre puis De Morgan']]) + tool('schema', { w: 600, h: 230, live: true, inputs: [{ id: 'A', x: 26, y2: 210 }, { id: 'B', x: 52, y2: 210 }], gates: [{ id: 'na', type: 'nand', x: 100, y: 24, in: ['A', 'A'] }, { id: 'nb', type: 'nand', x: 100, y: 150, in: ['B', 'B'] }, { id: 'n1', type: 'nand', x: 250, y: 40, in: ['A', 'nb'], mx: [0, 205] }, { id: 'n2', type: 'nand', x: 250, y: 130, in: ['na', 'B'], mx: [215, 0] }, { id: 'n3', type: 'nand', x: 400, y: 85, in: ['n1', 'n2'] }], outputs: [{ from: 'n3', label: 'A ^ B', x: 510 }] }) },
      { t: 'Pour aller plus loin : le OU exclusif en 4 portes', html: p('On peut partager une porte : ' + bx('N = ~(A.B)') + ' remplace les deux inverseurs, car ' + bx('A.~(A.B) = A.~B') + ' et ' + bx('B.~(A.B) = ~A.B') + '.') +
        calc([['~(~(A.~(A.B)).~(B.~(A.B)))', ''], ['A.~(A.B) + B.~(A.B)', 'De Morgan'], ['A.~B + ~A.B', 'A.~(A.B) = A.(~A + ~B) = A.~B'], ['A ^ B', 'définition']]) +
        tool('schema', { w: 600, h: 200, live: true, inputs: [{ id: 'A', x: 26, y2: 180 }, { id: 'B', x: 52, y2: 180 }], gates: [{ id: 'n0', type: 'nand', x: 110, y: 75, in: ['A', 'B'], label: 'N' }, { id: 'n1', type: 'nand', x: 260, y: 20, in: ['A', 'n0'] }, { id: 'n2', type: 'nand', x: 260, y: 130, in: ['n0', 'B'] }, { id: 'n3', type: 'nand', x: 410, y: 75, in: ['n1', 'n2'] }], outputs: [{ from: 'n3', label: 'A ^ B', x: 520 }] }) +
        p('À l’examen, le nombre de portes est imposé (5 pour le OU exclusif en 2025-2026) : les deux montages sont acceptés.') }],
    answer: p('NON : un NON-ET aux entrées reliées. ET : NON-ET puis NON-ET en inverseur (2 portes). OU : un inverseur sur A, un sur B, puis un NON-ET (3 portes). OU exclusif : NON-ET de A et ~B, NON-ET de ~A et B, puis NON-ET des deux sorties (5 portes avec les inverseurs, 4 en partageant ~(A.B)).'),
    traps: ['Remplacer chaque porte de A.~B + ~A.B par son équivalent NON-ET : 9 portes au lieu de 5.', 'Oublier de relier les deux entrées d’un NON-ET utilisé comme inverseur.'],
    official: false, note: NOTE + ' La même question (ET, OU, OU exclusif, nombre de portes imposé) est tombée à l’examen B2 2025-2026 (Ex 5).'
  });

  add({
    id: 'td1-ex3a', exam: null, kind: 'td', order: 3, src: 'TD 1 · Ex 3.1', title: 'Première forme canonique (3 expressions)', pts: null,
    topics: ['canon1'], lvl: 2, time: 15, near: ['p2025-ex2', 'p2023-ex2'],
    intro: p('Donnez la première forme canonique des expressions suivantes.') + pairs('Expression', 'Première forme canonique', [['S1 = a.c.d + b.c.~d + ~b.~c.d'], ['S2 = (~a + ~c).(a + ~d + c).b.~c'], ['S3 = b.c.(a + ~d) + ~b.d.(a + ~c)']]),
    hints: K.H_CANON.concat(['Somme de produits : complète chaque produit avec la variable qui manque (X = X.Y + X.~Y). Produit de sommes : passe par la table de vérité, ou développe d’abord.']),
    solution: [
      { t: 'S1 = a.c.d + b.c.~d + ~b.~c.d (variables a, b, c, d)', html: p('Chaque produit n’a que trois variables : on le multiplie par ' + bx('(X + ~X)') + ' pour la variable qui manque.') +
        pairs('Produit', 'Les deux mintermes', [['a.c.d', 'a.b.c.d + a.~b.c.d'], ['b.c.~d', 'a.b.c.~d + ~a.b.c.~d'], ['~b.~c.d', 'a.~b.~c.d + ~a.~b.~c.d']]) +
        p('Aucun minterme n’est en double : six mintermes, rangés dans l’ordre des lignes (1, 6, 9, 11, 14, 15).') },
      { t: 'S2 = (~a + ~c).(a + ~d + c).b.~c', html: p('Le facteur ' + bx('b.~c') + ' impose b = 1 et c = 0. Il reste ' + bx('(~a + 1).(a + ~d + 0)') + ', soit ' + bx('a + ~d') + ' : faux seulement pour a = 0, d = 1. Avec b = 1 et c = 0, les lignes à 1 sont a, d = 00, 10 et 11.') +
        km({ vars: V4, rows: 2, expr: '(~a + ~c).(a + ~d + c).b.~c', name: 'S2', circles: false, num: true, title: 'Trois cases à 1' }) },
      { t: 'S3 = b.c.(a + ~d) + ~b.d.(a + ~c)', html: calc([['b.c.(a + ~d) + ~b.d.(a + ~c)', ''], ['a.b.c + b.c.~d + a.~b.d + ~b.~c.d', 'développement']]) +
        pairs('Produit', 'Mintermes', [['a.b.c', 'a.b.c.d + a.b.c.~d'], ['b.c.~d', 'a.b.c.~d + ~a.b.c.~d'], ['a.~b.d', 'a.~b.c.d + a.~b.~c.d'], ['~b.~c.d', 'a.~b.~c.d + ~a.~b.~c.d']]) +
        p('Les mintermes ' + bx('a.b.c.~d') + ' et ' + bx('a.~b.~c.d') + ' apparaissent deux fois : on ne les écrit qu’une fois. Il en reste six, les mêmes que pour S1 : S1 et S3 sont la même fonction, écrite autrement.') }],
    answer: pairs('Expression', 'Première forme canonique', [['S1', '~a.~b.~c.d + ~a.b.c.~d + a.~b.~c.d + a.~b.c.d + a.b.c.~d + a.b.c.d'], ['S2', '~a.b.~c.~d + a.b.~c.~d + a.b.~c.d'], ['S3', '~a.~b.~c.d + ~a.b.c.~d + a.~b.~c.d + a.~b.c.d + a.b.c.~d + a.b.c.d']]),
    traps: ['Garder un minterme en double (S3 en a deux).', 'Oublier une variable dans un minterme : chacun doit contenir a, b, c et d.', 'S2 : développer les deux sommes à la main ; les contraintes b = 1, c = 0 donnent la réponse en trois lignes.'],
    official: false, note: NOTE + ' Même consigne aux examens 2023-2024 et 2025-2026 (Ex 2, deux expressions par forme).'
  });

  add({
    id: 'td1-ex3b', exam: null, kind: 'td', order: 4, src: 'TD 1 · Ex 3.2', title: 'Seconde forme canonique (2 expressions)', pts: null,
    topics: ['canon2'], lvl: 2, time: 10, near: ['p2023-ex2', 'p2025-ex2'],
    intro: p('Donnez la seconde forme canonique des expressions suivantes.') + pairs('Expression', 'Seconde forme canonique', [['S1 = (a + c).(~a + b + c)'], ['S2 = a.b + a.~c + ~a.~b.c']]),
    hints: K.H_CANON.concat(['Produit de sommes : complète chaque somme avec la variable qui manque (X = (X + Y).(X + ~Y)). Somme de produits : cherche les lignes où elle vaut 0.']),
    solution: [
      { t: 'S1 = (a + c).(~a + b + c) (variables a, b, c)', html: calc([['(a + c).(~a + b + c)', ''], ['(a + b.~b + c).(~a + b + c)', 'il manque b'], ['(a + b + c).(a + ~b + c).(~a + b + c)', '(X + Y.Z) = (X + Y).(X + Z)']]) + p('Trois maxtermes : S1 vaut 0 sur les lignes 000, 010 et 100.') },
      { t: 'S2 = a.b + a.~c + ~a.~b.c', html: p('C’est une somme de produits : on cherche les lignes où elle vaut 0. a.b vaut 1 sur 110 et 111, a.~c sur 100 et 110, ~a.~b.c sur 001. Les lignes à 0 sont 000, 010, 011 et 101 : un maxterme par ligne, les 0 en variables, les 1 barrés.') +
        tt({ vars: V3, exprs: ['a.b + a.~c + ~a.~b.c'], names: ['S2'], hl: [0, 2, 3, 5] }) }],
    answer: pairs('Expression', 'Seconde forme canonique', [['S1', '(a + b + c).(a + ~b + c).(~a + b + c)'], ['S2', '(a + b + c).(a + ~b + c).(a + ~b + ~c).(~a + b + ~c)']]),
    traps: ['Écrire les maxtermes avec la convention des mintermes : dans un maxterme, une variable à 0 s’écrit sans barre.', 'S2 : prendre les lignes à 1 (il y en a quatre aussi) au lieu des lignes à 0.'],
    official: false, note: NOTE + ' S1 est tombée telle quelle à l’examen 2 2023-2024 (Ex 2, en majuscules).'
  });
})();
