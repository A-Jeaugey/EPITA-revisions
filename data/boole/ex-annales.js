/* Archi B2 (algèbre de Boole) — fiches d’exercices des sujets (examens de fin de S1, examens 2 et B2, rattrapages).
   Une fiche par exercice d’algèbre de Boole ; un exercice retombé tel quel n’a qu’une fiche (src le dit, et
   BOOLE_EXAMS y renvoie depuis chaque sujet) : montage du cours (2014, 2019, 2022, rattrapage 2017 → p2019-ex3),
   comparateur 2 bits et six sorties (2014 = 2019), code Aiken (2016 = 2020 → p2020-ex3). Les exercices de numération
   des anciens sujets relèvent du B1 et n’ont pas de fiche ici.
   Format : { id, exam, kind: 'partiel', order, src, title, pts, topics, lvl, time, intro, questions, hints,
   solution: [{ t, html }], answer, traps, grading, official, note, near }.
   Écriture : les expressions sont en notation source (~A, ., +, ^) dans <span class="bx">, réécrites avec leurs barres
   par assets/js/boole.js ; les outils (tableaux de Karnaugh, tables, schémas) sont des <div data-boole> montés quand
   la correction s’ouvre. Toutes les réponses et toutes les étapes de calcul sont vérifiées par programme.
   window.BOOLE_K : les petits outils d’écriture, repris par data/boole/ex-td.js. */
(function () {
  'use strict';
  var X = window.BOOLE_EX = window.BOOLE_EX || [];
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function bx(s) { return '<span class="bx">' + esc(s) + '</span>'; }
  function tool(kind, o) { return '<div data-boole="' + kind + '" data-opts=\'' + JSON.stringify(o).replace(/'/g, '&#39;') + '\'></div>'; }
  function km(o) { return tool('kmap', o); }
  function tt(o) { return tool('truth', o); }
  /* étapes de calcul : [[expression, règle], …] */
  function calc(rows) { return '<div class="calc">' + rows.map(function (r) { return '<div><span>' + bx(r[0]) + '</span>' + (r[1] ? '<span class="why-r">' + r[1] + '</span>' : '') + '</div>'; }).join('') + '</div>'; }
  /* tableau d’énoncé ou de réponse : [[gauche, droite], …] */
  function pairs(h1, h2, rows, raw) {
    return '<div class="tbl"><table><thead><tr><th>' + h1 + '</th><th>' + h2 + '</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + bx(r[0]) + '</td><td>' + (r[1] == null ? '' : raw ? r[1] : bx(r[1])) + '</td></tr>'; }).join('') + '</tbody></table></div>';
  }
  function ul(items) { return '<ul>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  function p(s) { return '<p>' + s + '</p>'; }
  function add(ex) { X.push(ex); }
  var D4 = ['D', 'C', 'B', 'A'], C3 = ['C', 'B', 'A'];
  var OFF = 'Conforme au corrigé officiel ; toutes les réponses et les étapes de calcul ont été vérifiées par programme (tables de vérité complètes).';
  var NONE = 'Pas de corrigé officiel : réponses calculées par programme (simplification exacte, tables de vérité complètes).';
  var K_SIMP = 'Simplifiez au maximum les expressions ci-dessous. Le résultat ne devra pas contenir de parenthèses.';
  var K_C1 = 'Donnez la première forme canonique des expressions ci-dessous.', K_C2 = 'Donnez la seconde forme canonique des expressions ci-dessous.';
  var K_KM = 'Remplissez les diagrammes de Karnaugh ci-dessous (bulles incluses) et donnez leurs expressions les plus simplifiées. Aucun point ne sera attribué à une expression si son tableau est faux.';
  var H_SIMP = ['Casse d’abord les grandes barres avec De Morgan, en gardant des parenthèses, puis développe.',
    'Supprime les produits qui contiennent X et ~X, puis absorbe : X + X.Y = X (théorème 1), X + ~X.Y = X + Y (théorème 2).',
    'Seul le résultat est demandé : au brouillon, un tableau de Karnaugh donne à coup sûr la forme la plus simple, et permet de vérifier ton calcul.'];
  var H_CANON = ['1re forme : un minterme par ligne où l’expression vaut 1 (variable si 1, variable barrée si 0). 2e forme : un maxterme par ligne où elle vaut 0 (variable si 0, variable barrée si 1).',
    'Les variables sont toutes celles de l’expression, dans l’ordre alphabétique ; chaque terme doit les contenir toutes, une seule fois.',
    'Contrôle : nombre de mintermes + nombre de maxtermes = 2 puissance (nombre de variables).'];
  var H_KM = ['Place les numéros : lignes DC (ou C), colonnes BA dans l’ordre 00, 01, 11, 10. Première ligne 0 1 3 2, puis 4 5 7 6, 12 13 15 14, 8 9 11 10.',
    'Encercle les plus grands rectangles de 1, 2, 4 ou 8 cases ; les bords opposés se touchent. Un Φ peut entrer dans un cercle s’il l’agrandit, jamais seul.',
    'Lis chaque cercle : variable qui varie, absente ; à 0, barrée ; à 1, écrite.'];
  var T_KM = ['Inverser les colonnes 11 et 10 (ordre de Gray) : le tableau est faux, et l’expression ne rapporte aucun point.',
    'Laisser à 0 une case indéfinie qui aurait agrandi un cercle : l’expression est juste mais pas la plus simple.',
    'Oublier que les bords se touchent : les colonnes 00 et 10 (et les lignes 00 et 10) sont voisines.'];
  window.BOOLE_K = { esc: esc, bx: bx, tool: tool, km: km, tt: tt, calc: calc, pairs: pairs, ul: ul, p: p, D4: D4, C3: C3, H_SIMP: H_SIMP, H_CANON: H_CANON, H_KM: H_KM, T_KM: T_KM };

  /* ================================================================ Examen B2 2025-2026 (promo 2030), Moodle */
  add({
    id: 'p2025-ex1', exam: 'p2025', kind: 'partiel', order: 1, src: 'Examen B2 2025-2026 · Ex 1', title: 'Simplifier au maximum, sans parenthèses', pts: 4,
    topics: ['simplification'], lvl: 2, time: 12, near: ['td1-ex1'],
    intro: p(K_SIMP) + pairs('Expression non simplifiée', 'Expression la plus simplifiée', [['(A + ~B.~C).~(A.B)'], ['~(A.B + ~A.~B + ~A.B)'], ['A + B.C + ~A.(~B + ~C).(A.D + C)'], ['~A.~B.~C.~D + ~A.~B.C.~D + A.~B.~C.~D + A.~B.C.~D']]),
    hints: H_SIMP,
    solution: [
      { t: '(A + ~B.~C).~(A.B)', html: calc([['(A + ~B.~C).(~A + ~B)', 'De Morgan'], ['A.~A + A.~B + ~A.~B.~C + ~B.~C', 'développement (~B.~B = ~B)'], ['A.~B + ~A.~B.~C + ~B.~C', 'A.~A = 0'], ['A.~B + ~B.~C', 'théorème 1 : ~B.~C absorbe ~A.~B.~C']]) },
      { t: '~(A.B + ~A.~B + ~A.B)', html: calc([['~(A.B + ~A.(~B + B))', 'factorisation de ~A'], ['~(A.B + ~A)', '~B + B = 1'], ['~(~A + B)', 'théorème 2 : ~A + A.B = ~A + B'], ['A.~B', 'De Morgan']]) + p('Plus court : la somme sous la barre vaut 1 sur trois lignes sur quatre ; son complément vaut 1 sur la seule ligne restante, A = 1, B = 0.') },
      { t: 'A + B.C + ~A.(~B + ~C).(A.D + C)', html: calc([['A + B.C + ~A.(~B + ~C).A.D + ~A.(~B + ~C).C', 'développement'], ['A + B.C + ~A.~B.C + ~A.~C.C', '~A.A = 0, puis développement'], ['A + B.C + ~A.~B.C', '~C.C = 0'], ['A + B.C + ~B.C', 'théorème 2 : A + ~A.X = A + X'], ['A + C', 'B.C + ~B.C = C']]) },
      { t: 'La somme de quatre mintermes', html: calc([['~A.~B.~D.(~C + C) + A.~B.~D.(~C + C)', 'factorisation'], ['~A.~B.~D + A.~B.~D', '~C + C = 1'], ['~B.~D', '~A + A = 1']]) + km({ vars: ['A', 'B', 'C', 'D'], rows: 2, expr: '~A.~B.~C.~D + ~A.~B.C.~D + A.~B.~C.~D + A.~B.C.~D', name: 'S', title: 'Les quatre coins du tableau' }) }],
    answer: pairs('Expression', 'Résultat', [['(A + ~B.~C).~(A.B)', 'A.~B + ~B.~C'], ['~(A.B + ~A.~B + ~A.B)', 'A.~B'], ['A + B.C + ~A.(~B + ~C).(A.D + C)', 'A + C'], ['~A.~B.~C.~D + ~A.~B.C.~D + A.~B.~C.~D + A.~B.C.~D', '~B.~D']]),
    traps: ['Laisser une parenthèse : « le résultat ne devra pas contenir de parenthèses ». A.~B + ~B.~C, pas ~B.(A + ~C).',
      'Oublier une variable qui disparaît : dans la 3e expression, D n’est pas dans le résultat (le terme A.D est absorbé).',
      'Les expressions 1 à 3 sont S5, S2 et S7 du TD 1 : refais le TD, les mêmes reviennent.'],
    grading: '4 points pour 4 expressions ; seul le résultat est attendu.', official: true, note: OFF
  });

  add({
    id: 'p2025-ex2', exam: 'p2025', kind: 'partiel', order: 2, src: 'Examen B2 2025-2026 · Ex 2', title: 'Première et seconde formes canoniques', pts: 4,
    topics: ['canon1', 'canon2'], lvl: 2, time: 12, near: ['td1-ex3a', 'td1-ex3b'],
    intro: p('1. ' + K_C1) + pairs('Expression', 'Première forme canonique', [['A + ~B'], ['(A + ~C).(~A + C + ~D).B.~C']]) + p('2. ' + K_C2) + pairs('Expression', 'Seconde forme canonique', [['(A + ~B).(~B + C)'], ['A + B.~C']]),
    hints: H_CANON,
    solution: [
      { t: 'A + ~B (variables A, B)', html: p('Elle vaut 0 seulement pour A = 0, B = 1 : les trois autres lignes donnent les mintermes.') + tt({ vars: ['A', 'B'], exprs: ['A + ~B'], names: ['S'] }) },
      { t: '(A + ~C).(~A + C + ~D).B.~C', html: p('Le facteur B.~C impose B = 1 et C = 0. Il reste (A + 1).(~A + 0 + ~D) = ~A + ~D : faux seulement pour A = D = 1. Avec B = 1, C = 0, les lignes à 1 sont A, D = 00, 01, 10.') + km({ vars: ['A', 'B', 'C', 'D'], rows: 2, expr: '(A + ~C).(~A + C + ~D).B.~C', name: 'S', circles: false, num: true, title: 'Trois cases à 1' }) },
      { t: '(A + ~B).(~B + C) (variables A, B, C)', html: p('C’est un produit de sommes : on complète chaque somme. (A + ~B) → (A + ~B + C).(A + ~B + ~C) ; (~B + C) → (A + ~B + C).(~A + ~B + C). Le maxterme (A + ~B + C) n’est écrit qu’une fois.') },
      { t: 'A + B.~C', html: p('Elle vaut 0 quand A = 0 et B.~C = 0 : lignes 000, 001, 011. Un maxterme par ligne, les 0 en variables, les 1 barrés.') + tt({ vars: ['A', 'B', 'C'], exprs: ['A + B.~C'], names: ['S'], hl: [0, 1, 3] }) }],
    answer: pairs('Expression', 'Forme canonique', [['A + ~B', 'A.B + A.~B + ~A.~B'], ['(A + ~C).(~A + C + ~D).B.~C', 'A.B.~C.~D + ~A.B.~C.D + ~A.B.~C.~D'], ['(A + ~B).(~B + C)', '(A + ~B + C).(A + ~B + ~C).(~A + ~B + C)'], ['A + B.~C', '(A + B + C).(A + B + ~C).(A + ~B + ~C)']]),
    traps: ['Ajouter une variable absente de l’expression : A + ~B n’a que A et B.', 'Écrire la seconde forme avec les lignes à 1 au lieu des lignes à 0.', 'Garder un maxterme en double après avoir complété deux sommes.'],
    grading: '4 points pour 4 expressions.', official: true, note: OFF
  });

  add({
    id: 'p2025-ex3', exam: 'p2025', kind: 'partiel', order: 3, src: 'Examen B2 2025-2026 · Ex 3', title: 'Tableaux de Karnaugh à 4 variables avec Φ, puis un OU exclusif', pts: 5,
    topics: ['karnaugh', 'indefini', 'xor'], lvl: 2, time: 18,
    intro: p('1. ' + K_KM + ' Ne pas utiliser de simplification à l’aide de OU EXCLUSIF. Soit N un nombre binaire codé sur 4 bits (D, C, B, A). A est le bit de poids faible.') +
      ul(['S1 = 1 ssi N = 2, 3, 6, 7, 10, 11, 12 ou 13', 'S2 = 1 ssi N = 0, 4, 6, 8, 12 ou 14 et S est indéfinie ssi N = 3, 5, 7, 10, 13 ou 15', 'S3 = 1 ssi N = 0, 1, 4, 5, 8, 9, 12 ou 13 et S est indéfinie ssi N = 3, 7, 11 ou 15', 'S4 = 1 ssi N = 8, 10, 14 ou 15 et S est indéfinie ssi N = 0, 1, 2, 3, 4, 5, 6 ou 7']) +
      p('2. Simplifiez S1 à l’aide de l’opérateur OU EXCLUSIF.'),
    hints: H_KM.concat(['S1 : ~D.B + ~C.B = B.(~D + ~C) = B.~(C.D). Compare avec le troisième terme.']),
    solution: [
      { t: 'S1', html: km({ vars: D4, rows: 2, ones: [2, 3, 6, 7, 10, 11, 12, 13], name: 'S1', xor: 'B ^ (C.D)' }) + p('Avec le OU exclusif : ~D.B + ~C.B = B.~(C.D), et D.C.~B = ~B.(C.D). C’est X.~Y + ~X.Y avec X = B, Y = C.D.') },
      { t: 'S2', html: km({ vars: D4, rows: 2, ones: [0, 4, 6, 8, 12, 14], dc: [3, 5, 7, 10, 13, 15], name: 'S2' }) },
      { t: 'S3', html: km({ vars: D4, rows: 2, ones: [0, 1, 4, 5, 8, 9, 12, 13], dc: [3, 7, 11, 15], name: 'S3' }) + p('Les Φ ne servent pas : les deux colonnes BA = 00 et 01 forment déjà un cercle de 8 cases.') },
      { t: 'S4', html: km({ vars: D4, rows: 2, ones: [8, 10, 14, 15], dc: [0, 1, 2, 3, 4, 5, 6, 7], name: 'S4' }) }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = ~D.B + ~C.B + D.C.~B') + '</span></div><div><span>' + bx('S2 = C + ~B.~A') + '</span></div><div><span>' + bx('S3 = ~B') + '</span></div><div><span>' + bx('S4 = ~C.~A + B.C') + '</span></div><div><span>' + bx('S1 = B ^ (C.D)') + '</span><span class="why-r">question 2</span></div></div>',
    traps: T_KM.concat(['Simplifier S1 à 1 avec le OU exclusif : la question 1 l’interdit, la forme avec ⊕ ne va qu’à la question 2.']),
    grading: '5 points : 4 tableaux et leurs expressions, puis S1 avec OU exclusif ; « aucun point ne sera attribué à une expression si son tableau est faux ».', official: true, note: OFF
  });

  add({
    id: 'p2025-ex4', exam: 'p2025', kind: 'partiel', order: 4, src: 'Examen B2 2025-2026 · Ex 4', title: 'Problème : la cuve à trois capteurs', pts: 4,
    topics: ['probleme', 'karnaugh'], lvl: 2, time: 15,
    intro: p('Une cuve de 1 000 litres est équipée de trois capteurs : C1 est placé au quart de la hauteur (à 250 litres), C2 à mi-hauteur (à 500 litres), C3 aux trois quarts (à 750 litres). Quand un capteur est immergé, il fournit un signal logique 1 ; autrement, 0.') +
      p('Le tableau de supervision a cinq voyants L0 à L4. Soit V le volume de liquide : L1 s’allume quand V &lt; 250 litres ; L2 quand 250 ≤ V &lt; 500 ; L3 quand 500 ≤ V &lt; 750 ; L4 quand V ≥ 750. L0 s’allume en cas de défaut (L1 à L4 sont alors éteints). Par exemple, si la cuve est pleine et que les capteurs indiquent C3 = 1, C2 = 1 et C1 = 0, il y a un défaut sur C1 : L0 s’allume.') +
      '<ol><li>Complétez la table de vérité (entrées C3, C2, C1 ; sorties L1, L2, L3, L4, L0).</li><li>Donnez les expressions les plus simplifiées de L1, L2, L3 et L4 (il n’est pas utile d’utiliser des tableaux de Karnaugh).</li><li>Complétez le tableau de Karnaugh pour L0 (dessinez aussi les cercles) et donnez son expression la plus simplifiée.</li></ol>',
    hints: ['Un capteur ne peut être immergé que si ceux du dessous le sont : seules 000, 001, 011 et 111 sont des états normaux.', 'Chaque état normal allume un seul voyant de niveau : sa sortie est le minterme de cette ligne.', 'L0 vaut 1 sur les quatre autres lignes : 010, 100, 101, 110.'],
    solution: [
      { t: 'La table de vérité', html: tt({ vars: ['C3', 'C2', 'C1'], cols: { L1: [1, 0, 0, 0, 0, 0, 0, 0], L2: [0, 1, 0, 0, 0, 0, 0, 0], L3: [0, 0, 0, 1, 0, 0, 0, 0], L4: [0, 0, 0, 0, 0, 0, 0, 1], L0: [0, 0, 1, 0, 1, 1, 1, 0] } }) },
      { t: 'L1 à L4', html: p('Chacun vaut 1 sur une seule ligne : c’est un minterme, impossible à simplifier sans Φ (les lignes de défaut doivent les éteindre).') + '<div class="calc"><div><span>' + bx('L1 = ~C3.~C2.~C1') + '</span></div><div><span>' + bx('L2 = ~C3.~C2.C1') + '</span></div><div><span>' + bx('L3 = ~C3.C2.C1') + '</span></div><div><span>' + bx('L4 = C3.C2.C1') + '</span></div></div>' },
      { t: 'L0', html: km({ vars: ['C3', 'C2', 'C1'], rows: 1, ones: [2, 4, 5, 6], name: 'L0' }) }],
    answer: '<div class="calc res"><div><span>' + bx('L1 = ~C3.~C2.~C1') + '</span></div><div><span>' + bx('L2 = ~C3.~C2.C1') + '</span></div><div><span>' + bx('L3 = ~C3.C2.C1') + '</span></div><div><span>' + bx('L4 = C3.C2.C1') + '</span></div><div><span>' + bx('L0 = C3.~C2 + C2.~C1') + '</span></div></div>',
    traps: ['Mettre des Φ sur les lignes de défaut : l’énoncé les définit (L0 = 1, L1 à L4 = 0).', 'Simplifier L1 en ~C3 : sur la ligne 010 (défaut), L1 doit valoir 0.'],
    grading: '4 points : table, expressions de L1 à L4, tableau et expression de L0.', official: true, note: OFF
  });

  add({
    id: 'p2025-ex5', exam: 'p2025', kind: 'partiel', order: 5, src: 'Examen B2 2025-2026 · Ex 5', title: 'ET, OU et OU exclusif avec des portes NON-ET seules', pts: 3,
    topics: ['nand', 'schema'], lvl: 2, time: 10, near: ['td1-ex2'],
    intro: p('Donnez le schéma de câblage des portes ET, OU et OU EXCLUSIF, en utilisant uniquement des portes NON-ET. Le nombre maximum de portes est précisé : ET (2 portes), OU (3 portes), OU EXCLUSIF (5 portes).'),
    hints: ['Une porte NON-ET dont les deux entrées sont reliées est un inverseur : ~(A.A) = ~A.', 'ET : un NON-ET, puis un inverseur. OU : De Morgan, A + B = ~(~A.~B).', 'OU exclusif : A ^ B = A.~B + ~A.B = ~(~(A.~B).~(~A.B)).'],
    solution: [
      { t: 'ET : 2 portes', html: p(bx('A.B = ~~(A.B)') + ' : le premier NON-ET donne ' + bx('~(A.B)') + ', le second, monté en inverseur, l’inverse.') + tool('schema', { w: 440, h: 100, live: true, inputs: [{ id: 'A', x: 26, y2: 70 }, { id: 'B', x: 52, y2: 70 }], gates: [{ id: 'n1', type: 'nand', x: 110, y: 25, in: ['A', 'B'] }, { id: 'n2', type: 'nand', x: 230, y: 25, in: ['n1', 'n1'] }], outputs: [{ from: 'n2', label: 'A.B', x: 340 }] }) },
      { t: 'OU : 3 portes', html: p(bx('A + B = ~(~A.~B)') + ' : deux inverseurs, puis un NON-ET.') + tool('schema', { w: 460, h: 150, live: true, inputs: [{ id: 'A', x: 26, y2: 130 }, { id: 'B', x: 52, y2: 130 }], gates: [{ id: 'n1', type: 'nand', x: 110, y: 20, in: ['A', 'A'] }, { id: 'n2', type: 'nand', x: 110, y: 86, in: ['B', 'B'] }, { id: 'n3', type: 'nand', x: 250, y: 53, in: ['n1', 'n2'] }], outputs: [{ from: 'n3', label: 'A + B', x: 360 }] }) },
      { t: 'OU exclusif : 5 portes', html: calc([['A ^ B', ''], ['A.~B + ~A.B', 'définition'], ['~(~(A.~B).~(~A.B))', 'double barre puis De Morgan']]) + tool('schema', { w: 600, h: 230, live: true, inputs: [{ id: 'A', x: 26, y2: 210 }, { id: 'B', x: 52, y2: 210 }], gates: [{ id: 'na', type: 'nand', x: 100, y: 24, in: ['A', 'A'] }, { id: 'nb', type: 'nand', x: 100, y: 150, in: ['B', 'B'] }, { id: 'n1', type: 'nand', x: 250, y: 40, in: ['A', 'nb'], mx: [0, 205] }, { id: 'n2', type: 'nand', x: 250, y: 130, in: ['na', 'B'], mx: [215, 0] }, { id: 'n3', type: 'nand', x: 400, y: 85, in: ['n1', 'n2'] }], outputs: [{ from: 'n3', label: 'A ^ B', x: 510 }] }) }],
    answer: p('ET : NON-ET puis NON-ET en inverseur. OU : deux NON-ET en inverseurs (sur A et sur B), puis un NON-ET. OU exclusif : deux inverseurs donnent ~A et ~B ; un NON-ET de A et ~B, un NON-ET de ~A et B ; un dernier NON-ET des deux sorties.'),
    traps: ['Dépasser le nombre de portes : remplacer chaque porte de A.~B + ~A.B par des NON-ET demande 9 portes au lieu de 5.', 'Oublier de relier les deux entrées d’un NON-ET utilisé comme inverseur.'],
    grading: '3 points, un par schéma.', official: true, note: OFF
  });

  /* ================================================================ Examen 2 2024-2025 (promo 2029), sans corrigé */
  add({
    id: 'p2024-ex1', exam: 'p2024', kind: 'partiel', order: 1, src: 'Examen 2 2024-2025 · Ex 1', title: 'Simplifier au maximum, sans parenthèses', pts: 5,
    topics: ['simplification'], lvl: 2, time: 15,
    intro: p(K_SIMP) + pairs('Expression non simplifiée', 'Expression la plus simplifiée', [['(~A + ~B).(~A + ~C) + ~A.~B.C'], ['~(~B.D).~(A.D).(A + D).A.B'], ['(A + ~B + C).(A + ~C).(~A + ~B)'], ['~(~A.B).(A + B) + C.~(A.~B)'], ['A + ~(~B + ~D) + ~A.~(B.D).(A.C + D)']]),
    hints: H_SIMP.concat(['(X + Y).(X + Z) = X + Y.Z : la distributivité du OU sert dans les expressions 1, 3 et 4.']),
    solution: [
      { t: '(~A + ~B).(~A + ~C) + ~A.~B.C', html: calc([['~A + ~B.~C + ~A.~B.C', 'distributivité du OU'], ['~A + ~B.~C', 'théorème 1 : ~A absorbe ~A.~B.C']]) },
      { t: '~(~B.D).~(A.D).(A + D).A.B', html: calc([['(B + ~D).(~A + ~D).(A + D).A.B', 'De Morgan'], ['(B + ~D).B.(A + D).A.(~A + ~D)', 'commutativité'], ['B.A.(~A + ~D)', 'dual du théorème 1 : (X + Y).X = X'], ['A.B.~A + A.B.~D', 'développement'], ['A.B.~D', 'A.~A = 0']]) },
      { t: '(A + ~B + C).(A + ~C).(~A + ~B)', html: calc([['(A + (~B + C).~C).(~A + ~B)', 'distributivité du OU'], ['(A + ~B.~C).(~A + ~B)', 'C.~C = 0'], ['A.~A + A.~B + ~A.~B.~C + ~B.~C', 'développement'], ['A.~B + ~B.~C', 'théorème 1']]) + p('C’est l’expression S1 de l’examen de 2021-2022, dont le corrigé donne le même résultat.') },
      { t: '~(~A.B).(A + B) + C.~(A.~B)', html: calc([['(A + ~B).(A + B) + C.(~A + B)', 'De Morgan'], ['A + ~B.B + ~A.C + B.C', 'distributivité du OU, développement'], ['A + ~A.C + B.C', '~B.B = 0'], ['A + C + B.C', 'théorème 2'], ['A + C', 'théorème 1']]) },
      { t: 'A + ~(~B + ~D) + ~A.~(B.D).(A.C + D)', html: calc([['A + B.D + ~A.(~B + ~D).(A.C + D)', 'De Morgan'], ['A + B.D + ~A.~B.D + ~A.~D.D', 'développement, ~A.A = 0'], ['A + B.D + ~A.~B.D', '~D.D = 0'], ['A + B.D + ~B.D', 'théorème 2'], ['A + D', 'B.D + ~B.D = D']]) }],
    answer: pairs('Expression', 'Résultat', [['(~A + ~B).(~A + ~C) + ~A.~B.C', '~A + ~B.~C'], ['~(~B.D).~(A.D).(A + D).A.B', 'A.B.~D'], ['(A + ~B + C).(A + ~C).(~A + ~B)', 'A.~B + ~B.~C'], ['~(~A.B).(A + B) + C.~(A.~B)', 'A + C'], ['A + ~(~B + ~D) + ~A.~(B.D).(A.C + D)', 'A + D']]),
    traps: ['Dans la 2e, (A + D) et A ne s’annulent pas : (A + D).A = A (dual du théorème 1).', 'Dans la 5e, C disparaît : vérifie toujours quelles variables restent.'],
    grading: '5 points pour 5 expressions ; seul le résultat est attendu.', official: false, note: NONE
  });

  add({
    id: 'p2024-ex2', exam: 'p2024', kind: 'partiel', order: 2, src: 'Examen 2 2024-2025 · Ex 2', title: 'Première et seconde formes canoniques', pts: 5,
    topics: ['canon1', 'canon2'], lvl: 2, time: 15,
    intro: p('1. ' + K_C1) + pairs('Expression', 'Première forme canonique', [['A + B'], ['~A.(~B + ~C)'], ['~(A + B).(~C + ~D)']]) + p('2. ' + K_C2) + pairs('Expression', 'Seconde forme canonique', [['(A + B).(B + C)'], ['A + B + C.D']]),
    hints: H_CANON,
    solution: [
      { t: 'A + B', html: p('Vaut 1 sur trois lignes sur quatre (toutes sauf A = B = 0).') },
      { t: '~A.(~B + ~C)', html: p('A = 0, et B, C pas tous deux à 1 : lignes 000, 001, 010.') },
      { t: '~(A + B).(~C + ~D)', html: p('La barre ne couvre que A + B : ~(A + B) = ~A.~B. Il faut A = B = 0, et C, D pas tous deux à 1 : trois mintermes.') + km({ vars: ['A', 'B', 'C', 'D'], rows: 2, expr: '~(A + B).(~C + ~D)', name: 'S', circles: false, num: true }) },
      { t: '(A + B).(B + C)', html: p('Vaut 0 quand B = 0 et (A = 0 ou C = 0) : lignes 000, 001, 100.') },
      { t: 'A + B + C.D', html: p('Vaut 0 quand A = B = 0 et C.D = 0 : lignes 0000, 0001, 0010.') }],
    answer: pairs('Expression', 'Forme canonique', [['A + B', 'A.B + A.~B + ~A.B'], ['~A.(~B + ~C)', '~A.~B.~C + ~A.~B.C + ~A.B.~C'], ['~(A + B).(~C + ~D)', '~A.~B.~C.~D + ~A.~B.~C.D + ~A.~B.C.~D'], ['(A + B).(B + C)', '(A + B + C).(A + B + ~C).(~A + B + C)'], ['A + B + C.D', '(A + B + C + D).(A + B + C + ~D).(A + B + ~C + D)']]),
    traps: ['Lire ~(A + B) comme ~A + ~B : De Morgan donne ~A.~B.', 'Oublier D dans la dernière : A + B + C.D a quatre variables.'],
    grading: '5 points pour 5 expressions.', official: false, note: NONE
  });

  add({
    id: 'p2024-ex3', exam: 'p2024', kind: 'partiel', order: 3, src: 'Examen 2 2024-2025 · Ex 3', title: 'Tableaux de Karnaugh à 3 et à 4 variables, avec Φ', pts: 6,
    topics: ['karnaugh', 'indefini'], lvl: 2, time: 20,
    intro: p(K_KM) + p('1. Soit N un nombre binaire codé sur 3 bits (C, B, A). A est le bit de poids faible.') + ul(['S1 = 1 pour N = 0, 3, 6, 7', 'S2 = 1 pour N = 0, 2, 4, 6 et S2 n’est pas définie pour N = 1, 5']) +
      p('2. Soit N un nombre binaire codé sur 4 bits (D, C, B, A). A est le bit de poids faible.') + ul(['S3 = 1 pour N = 0, 1, 4, 5, 6, 7, 9, 11', 'S4 = 1 pour N = 0, 1, 2, 3, 4, 6, 8, 9, 10, 11', 'S5 = 1 pour N = 0, 2, 4, 5, 6, 8, 12, 13, 14 et S5 n’est pas définie pour N = 10, 11, 15', 'S6 = 1 pour N = 2, 3, 6, 7, 10, 11, 14, 15 et S6 n’est pas définie pour N = 1, 4, 5, 9, 12, 13']),
    hints: H_KM.concat(['S1 : le 0 (case 000) est isolé de ses voisins à 1 ? Ses voisins sont 1, 2 et 4 : aucun ne vaut 1. Il forme un cercle seul.']),
    solution: [
      { t: 'S1', html: km({ vars: C3, rows: 1, ones: [0, 3, 6, 7], name: 'S1' }) },
      { t: 'S2', html: km({ vars: C3, rows: 1, ones: [0, 2, 4, 6], dc: [1, 5], name: 'S2' }) + p('Les Φ ne servent pas : les colonnes 00 et 10 (les bords) forment déjà un cercle de 4 cases.') },
      { t: 'S3', html: km({ vars: D4, rows: 2, ones: [0, 1, 4, 5, 6, 7, 9, 11], name: 'S3' }) },
      { t: 'S4', html: km({ vars: D4, rows: 2, ones: [0, 1, 2, 3, 4, 6, 8, 9, 10, 11], name: 'S4' }) },
      { t: 'S5', html: km({ vars: D4, rows: 2, ones: [0, 2, 4, 5, 6, 8, 12, 13, 14], dc: [10, 11, 15], name: 'S5' }) },
      { t: 'S6', html: km({ vars: D4, rows: 2, ones: [2, 3, 6, 7, 10, 11, 14, 15], dc: [1, 4, 5, 9, 12, 13], name: 'S6' }) + p('Les 1 remplissent les deux colonnes de droite : un seul cercle de 8 cases, B. Les Φ restent dehors.') }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = B.A + C.B + ~C.~B.~A') + '</span></div><div><span>' + bx('S2 = ~A') + '</span></div><div><span>' + bx('S3 = ~D.~B + ~D.C + D.~C.A') + '</span></div><div><span>' + bx('S4 = ~C + ~D.~A') + '</span></div><div><span>' + bx('S5 = ~A + C.~B') + '</span></div><div><span>' + bx('S6 = B') + '</span></div></div>',
    traps: T_KM.concat(['S3 : un autre regroupement minimal existe (~D.~B + ~D.C + ~C.~B.A au lieu de D.~C.A) ; les deux ont trois termes et sept littéraux.']),
    grading: '6 points pour 6 tableaux ; « aucun point ne sera attribué à une expression si son tableau est faux ».', official: false, note: NONE
  });

  add({
    id: 'p2024-ex4', exam: 'p2024', kind: 'partiel', order: 4, src: 'Examen 2 2024-2025 · Ex 4', title: 'Problème : deux réservoirs et trois voyants', pts: 4,
    topics: ['probleme', 'karnaugh', 'indefini'], lvl: 3, time: 18,
    intro: p('Considérons deux réservoirs R1 et R2. Le niveau de chaque réservoir est contrôlé par un détecteur de niveau haut (A pour R1 et B pour R2) et un détecteur de niveau bas (C pour R1 et D pour R2). A, B, C, D sont à 1 quand il y a du liquide devant le détecteur et à 0 dans le cas contraire. Trois voyants : V1 = 1 si les deux réservoirs sont pleins ; V2 = 1 si les deux réservoirs sont vides ; V3 = 1 dans tous les autres cas.') +
      '<ol><li>Complétez la table de vérité (entrées A, B, C, D ; sorties V1, V2, V3). Si certains cas ne sont pas possibles pour les sorties, utilisez le symbole « Φ » (phi) qui signifie 0 ou 1.</li><li>Remplissez les diagrammes de Karnaugh (bulles incluses) et donnez les expressions les plus simplifiées pour V1, V2 et V3.</li></ol>',
    hints: ['Cas impossible : un détecteur haut immergé avec le détecteur bas du même réservoir à sec (A = 1 et C = 0, ou B = 1 et D = 0) : Φ sur les trois sorties.', 'Plein = détecteur haut à 1 (A pour R1) ; vide = détecteur bas à 0 (C pour R1).', 'Les tableaux ont les lignes AB et les colonnes CD.'],
    solution: [
      { t: 'La table de vérité', html: tt({ vars: ['A', 'B', 'C', 'D'], cols: { V1: [0, 0, 0, 0, 'x', 0, 'x', 0, 'x', 'x', 0, 0, 'x', 'x', 'x', 1], V2: [1, 0, 0, 0, 'x', 0, 'x', 0, 'x', 'x', 0, 0, 'x', 'x', 'x', 0], V3: [0, 1, 1, 1, 'x', 1, 'x', 1, 'x', 'x', 1, 1, 'x', 'x', 'x', 0] } }) + p('Sept lignes impossibles (4, 6, 8, 9, 12, 13, 14) : Φ.') },
      { t: 'V1', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [15], dc: [4, 6, 8, 9, 12, 13, 14], name: 'V1' }) },
      { t: 'V2', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [0], dc: [4, 6, 8, 9, 12, 13, 14], name: 'V2' }) },
      { t: 'V3', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [1, 2, 3, 5, 7, 10, 11], dc: [4, 6, 8, 9, 12, 13, 14], name: 'V3' }) }],
    answer: '<div class="calc res"><div><span>' + bx('V1 = A.B') + '</span></div><div><span>' + bx('V2 = ~C.~D') + '</span></div><div><span>' + bx('V3 = ~A.D + ~B.C') + '</span></div></div>',
    traps: ['Mettre 0 dans les cas impossibles : le sujet demande Φ, et sans eux V1 resterait A.B.C.D.', 'Confondre plein (détecteur haut) et non vide (détecteur bas).'],
    grading: '4 points : la table, puis les trois tableaux et leurs expressions.', official: false, note: NONE + ' La lecture « plein = détecteur haut immergé, vide = détecteur bas à sec » est celle de l’énoncé.'
  });

  /* ================================================================ Examen 2 2023-2024 (promo 2028) */
  add({
    id: 'p2023-ex1', exam: 'p2023', kind: 'partiel', order: 1, src: 'Examen 2 2023-2024 · Ex 1', title: 'Simplifier au maximum, sans parenthèses', pts: 5,
    topics: ['simplification'], lvl: 2, time: 15,
    intro: p(K_SIMP) + pairs('Expression non simplifiée', 'Expression la plus simplifiée', [['~((C + D) + (B + ~D))'], ['(B + ~D).(~A + ~D).(A + D).A.B'], ['~A.~B.~C.~D + ~A.~B.C.~D + A.~B.~C.~D + A.~B.C.~D'], ['~(A.B).(A.B + C) + A.B.C'], ['(B + ~D + C.B).~(~C.B).~(C.B)']]),
    hints: H_SIMP,
    solution: [
      { t: '~((C + D) + (B + ~D))', html: calc([['~(B + C + D + ~D)', 'associativité'], ['~(1)', 'D + ~D = 1, X + 1 = 1'], ['0', '']]) },
      { t: '(B + ~D).(~A + ~D).(A + D).A.B', html: calc([['(B + ~D).B.(A + D).A.(~A + ~D)', 'commutativité'], ['B.A.(~A + ~D)', 'dual du théorème 1'], ['A.B.~A + A.B.~D', 'développement'], ['A.B.~D', 'A.~A = 0']]) },
      { t: 'Quatre mintermes', html: calc([['~A.~B.~D.(~C + C) + A.~B.~D.(~C + C)', 'factorisation'], ['~A.~B.~D + A.~B.~D', ''], ['~B.~D', '']]) + p('C’est la quatrième expression de 2025-2026 : les quatre coins d’un tableau de Karnaugh.') },
      { t: '~(A.B).(A.B + C) + A.B.C', html: calc([['~(A.B).A.B + ~(A.B).C + A.B.C', 'développement'], ['~(A.B).C + A.B.C', 'X.~X = 0'], ['C.(~(A.B) + A.B)', 'factorisation'], ['C', '~X + X = 1']]) },
      { t: '(B + ~D + C.B).~(~C.B).~(C.B)', html: calc([['(B + ~D + C.B).(C + ~B).(~C + ~B)', 'De Morgan'], ['(B + ~D + C.B).(~B + C.~C)', 'distributivité du OU'], ['(B + ~D + C.B).~B', 'C.~C = 0'], ['B.~B + ~D.~B + C.B.~B', 'développement'], ['~B.~D', '']]) }],
    answer: pairs('Expression', 'Résultat', [['~((C + D) + (B + ~D))', '0'], ['(B + ~D).(~A + ~D).(A + D).A.B', 'A.B.~D'], ['~A.~B.~C.~D + ~A.~B.C.~D + A.~B.~C.~D + A.~B.C.~D', '~B.~D'], ['~(A.B).(A.B + C) + A.B.C', 'C'], ['(B + ~D + C.B).~(~C.B).~(C.B)', '~B.~D']]),
    traps: ['Écrire « rien » pour la première : le résultat est la constante 0.', '~(~C.B) donne C + ~B (De Morgan, puis double barre), pas ~C + B.'],
    grading: '5 points pour 5 expressions.', official: true, note: OFF
  });

  add({
    id: 'p2023-ex2', exam: 'p2023', kind: 'partiel', order: 2, src: 'Examen 2 2023-2024 · Ex 2', title: 'Première et seconde formes canoniques', pts: 4,
    topics: ['canon1', 'canon2'], lvl: 2, time: 12, near: ['td1-ex3a', 'td1-ex3b'],
    intro: p('1. ' + K_C1) + pairs('Expression', 'Première forme canonique', [['A.B.C + A.~B'], ['(~A + ~C).(A + C + ~D).B.~C']]) + p('2. ' + K_C2) + pairs('Expression', 'Seconde forme canonique', [['(A + C).(~A + B + C)'], ['A + B.C']]),
    hints: H_CANON,
    solution: [
      { t: 'A.B.C + A.~B', html: calc([['A.B.C + A.~B.(C + ~C)', 'il manque C'], ['A.B.C + A.~B.C + A.~B.~C', '']]) },
      { t: '(~A + ~C).(A + C + ~D).B.~C', html: p('B = 1 et C = 0 ; il reste (~A + 1).(A + ~D) = A + ~D, faux seulement pour A = 0, D = 1.') },
      { t: '(A + C).(~A + B + C)', html: calc([['(A + B.~B + C).(~A + B + C)', 'il manque B'], ['(A + B + C).(A + ~B + C).(~A + B + C)', 'distributivité du OU']]) },
      { t: 'A + B.C', html: p('Vaut 0 quand A = 0 et B.C = 0 : lignes 000, 001, 010.') }],
    answer: pairs('Expression', 'Forme canonique', [['A.B.C + A.~B', 'A.B.C + A.~B.C + A.~B.~C'], ['(~A + ~C).(A + C + ~D).B.~C', '~A.B.~C.~D + A.B.~C.D + A.B.~C.~D'], ['(A + C).(~A + B + C)', '(A + B + C).(A + ~B + C).(~A + B + C)'], ['A + B.C', '(A + B + C).(A + B + ~C).(A + ~B + C)']]),
    traps: ['Pour A + B.C, il faut d’abord un produit de sommes (A + B).(A + C), ou passer par les lignes à 0.'],
    grading: '4 points pour 4 expressions.', official: true, note: OFF
  });

  add({
    id: 'p2023-ex3', exam: 'p2023', kind: 'partiel', order: 3, src: 'Examen 2 2023-2024 · Ex 3', title: 'Tableaux de Karnaugh à 3 et à 4 variables, avec Φ', pts: 6,
    topics: ['karnaugh', 'indefini'], lvl: 2, time: 20, near: ['p2021-ex3'],
    intro: p(K_KM) + p('3. Soit N un nombre binaire codé sur 3 bits (C, B, A). A est le bit de poids faible.') + ul(['S1 = 1 pour N = 1, 3, 4, 5', 'S2 = 1 pour N = 0, 2, 4, 5, 6, 7']) +
      p('4. Soit N un nombre binaire codé sur 4 bits (D, C, B, A). A est le bit de poids faible.') + ul(['S3 = 1 pour N = 0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15', 'S4 = 1 pour N = 0, 1, 4, 6, 8, 9, 12, 14', 'S5 = 1 pour N = 0, 2, 8, 10 et S5 n’est pas définie pour N = 5, 7, 13, 15', 'S6 = 1 pour N = 2, 6 et S6 n’est pas définie pour N = 0, 1, 4, 5, 8, 9, 12, 13']),
    hints: H_KM,
    solution: [
      { t: 'S1', html: km({ vars: C3, rows: 1, ones: [1, 3, 4, 5], name: 'S1' }) },
      { t: 'S2', html: km({ vars: C3, rows: 1, ones: [0, 2, 4, 5, 6, 7], name: 'S2' }) },
      { t: 'S3', html: km({ vars: D4, rows: 2, ones: [0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15], name: 'S3' }) },
      { t: 'S4', html: km({ vars: D4, rows: 2, ones: [0, 1, 4, 6, 8, 9, 12, 14], name: 'S4' }) },
      { t: 'S5', html: km({ vars: D4, rows: 2, ones: [0, 2, 8, 10], dc: [5, 7, 13, 15], name: 'S5' }) + p('Les quatre coins ; les Φ ne servent à rien.') },
      { t: 'S6', html: km({ vars: D4, rows: 2, ones: [2, 6], dc: [0, 1, 4, 5, 8, 9, 12, 13], name: 'S6' }) + p('Avec les Φ 0 et 4, les deux 1 rejoignent les colonnes 00 et 10 des deux premières lignes : un cercle de 4 cases, ~D.~A.') }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = ~C.A + C.~B') + '</span></div><div><span>' + bx('S2 = ~A + C') + '</span></div><div><span>' + bx('S3 = ~D + A') + '</span></div><div><span>' + bx('S4 = ~C.~B + C.~A') + '</span></div><div><span>' + bx('S5 = ~C.~A') + '</span></div><div><span>' + bx('S6 = ~D.~A') + '</span></div></div>',
    traps: T_KM.concat(['S1 à S4 et S6 sont les tableaux de 2021-2022 : les mêmes fonctions reviennent.']),
    grading: '6 points pour 6 tableaux.', official: true, note: OFF
  });

  add({
    id: 'p2023-ex4', exam: 'p2023', kind: 'partiel', order: 4, src: 'Examen 2 2023-2024 · Ex 4', title: 'Problème : le coffre aux quatre clés', pts: 3,
    topics: ['probleme', 'karnaugh'], lvl: 3, time: 12,
    intro: p('Quatre responsables d’une société (A, B, C et D) peuvent avoir accès à un coffre. Ils possèdent chacun une clé différente. Il a été convenu que : A ne peut ouvrir le coffre que si au moins un des responsables B ou C est présent ; B, C et D ne peuvent l’ouvrir que si au moins deux des autres responsables sont présents.') +
      '<ol><li>Dans la table de vérité, A = 0 signifie que A est absent (idem pour B, C, D), A = 1 qu’il est présent ; S = 1 signifie que le coffre peut être ouvert. Complétez la table de vérité.</li><li>Donnez l’expression la plus simplifiée de S (pas de parenthèse dans le résultat).</li></ol>',
    hints: ['Le coffre s’ouvre si l’une des personnes présentes peut l’ouvrir.', 'Sans A : il faut que B, C, D soient là tous les trois (chacun a besoin de deux autres présents). Avec A : il suffit de B ou de C.', 'Remplis un tableau de Karnaugh AB / CD.'],
    solution: [
      { t: 'La table de vérité', html: tt({ vars: ['A', 'B', 'C', 'D'], cols: { S: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1] } }) + p('Avec A et D seuls (1001), personne ne peut ouvrir : A n’a ni B ni C, D n’a qu’un autre responsable.') },
      { t: 'Simplification', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [7, 10, 11, 12, 13, 14, 15], name: 'S' }) }],
    answer: '<div class="calc res"><div><span>' + bx('S = A.B + A.C + B.C.D') + '</span></div></div>',
    traps: ['Oublier la ligne 0111 : sans A, B, C et D ensemble peuvent ouvrir.', 'Ouvrir pour 1001 : D est avec A, mais il lui faut deux autres responsables.'],
    grading: '3 points : la table, puis l’expression.', official: true, note: OFF
  });

  add({
    id: 'p2023-ex5', exam: 'p2023', kind: 'partiel', order: 5, src: 'Examen 2 2023-2024 · Ex 5', title: 'Comparateur de deux bits', pts: 2,
    topics: ['arith', 'xor'], lvl: 1, time: 6, near: ['p2019-ex4'],
    intro: p('On souhaite réaliser un circuit qui compare 2 bits. Entrées : A et B. Sorties : ‘A &gt; B’, ‘A = B’ et ‘A &lt; B’, chacune à 1 ssi la relation est vraie.') + '<ol><li>Remplissez la table de vérité.</li><li>Donnez les expressions les plus simplifiées des sorties. Vous utiliserez le OU EXCLUSIF si cela est possible.</li></ol>',
    hints: ['Quatre lignes : 00, 01, 10, 11.', 'A &gt; B seulement pour A = 1, B = 0.', 'A = B : c’est le NON-OU exclusif.'],
    solution: [{ t: 'Table et expressions', html: tt({ vars: ['A', 'B'], cols: { 'A>B': [0, 0, 1, 0], 'A=B': [1, 0, 0, 1], 'A<B': [0, 1, 0, 0] } }) + p('Chaque sortie vaut 1 sur une seule ligne, sauf ‘A = B’ (deux lignes : ' + bx('~A.~B + A.B = ~(A ^ B)') + ').') }],
    answer: '<div class="calc res"><div><span>' + bx('A.~B') + '</span><span class="why-r">‘A &gt; B’</span></div><div><span>' + bx('~(A ^ B)') + '</span><span class="why-r">‘A = B’</span></div><div><span>' + bx('~A.B') + '</span><span class="why-r">‘A &lt; B’</span></div></div>',
    traps: ['Écrire ‘A = B’ = ~A.~B + A.B : juste, mais la consigne demande le OU exclusif quand c’est possible.'],
    grading: '2 points.', official: true, note: OFF
  });

  /* ================================================================ Partiel S1 2022-2023 (promo 2027) */
  var W = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1], XX = [0, 0, 0, 1, 1, 0, 0, 0, 1, 1], Y = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0], Z = [0, 1, 0, 0, 1, 0, 1, 0, 0, 1];
  function ones(c) { return c.reduce(function (a, v, i) { if (v === 1) a.push(i); return a; }, []); }
  var DC6 = [10, 11, 12, 13, 14, 15];
  add({
    id: 'p2022-ex3', exam: 'p2022', kind: 'partiel', order: 3, src: 'Partiel S1 2022-2023 · Ex 3', title: 'Quatre tableaux de Karnaugh depuis une table de vérité', pts: 5,
    topics: ['karnaugh', 'indefini', 'xor', 'transcodeur'], lvl: 2, time: 18, near: ['p2017-ex3'],
    intro: p('À partir de la table de vérité, remplissez les diagrammes de Karnaugh (bulles incluses) et donnez les expressions les plus simplifiées de W, X, Y et Z (ne pas simplifier à l’aide du OU EXCLUSIF). Aucun point ne sera attribué à une expression si son tableau est faux. Notez que quand DCBA &gt; 1001₂, alors W, X, Y et Z ne sont pas définies. Pour finir, simplifiez Y à l’aide de l’opérateur OU EXCLUSIF.') +
      tt({ vars: D4, cols: { W: W.concat(['x', 'x', 'x', 'x', 'x', 'x']), X: XX.concat(['x', 'x', 'x', 'x', 'x', 'x']), Y: Y.concat(['x', 'x', 'x', 'x', 'x', 'x']), Z: Z.concat(['x', 'x', 'x', 'x', 'x', 'x']) } }),
    hints: H_KM.concat(['Les six combinaisons au-delà de 1001 sont des Φ : les lignes DC = 11 et 10 en sont presque pleines.']),
    solution: [
      { t: 'W', html: km({ vars: D4, rows: 2, ones: ones(W), dc: DC6, name: 'W' }) },
      { t: 'X', html: km({ vars: D4, rows: 2, ones: ones(XX), dc: DC6, name: 'X' }) },
      { t: 'Y', html: km({ vars: D4, rows: 2, ones: ones(Y), dc: DC6, name: 'Y', xor: 'B.~(C ^ A)' }) + calc([['C.B.A + ~C.B.~A', ''], ['B.(C.A + ~C.~A)', 'factorisation'], ['B.~(C ^ A)', 'X.Y + ~X.~Y = ~(X ^ Y)']]) },
      { t: 'Z', html: km({ vars: D4, rows: 2, ones: ones(Z), dc: DC6, name: 'Z' }) }],
    answer: '<div class="calc res"><div><span>' + bx('W = D + C.A + C.B') + '</span></div><div><span>' + bx('X = D + C.~B.~A + ~C.B.A') + '</span></div><div><span>' + bx('Y = C.B.A + ~C.B.~A') + '</span></div><div><span>' + bx('Z = C.~A + ~C.~B.A') + '</span></div><div><span>' + bx('Y = B.~(C ^ A)') + '</span><span class="why-r">avec OU exclusif</span></div></div>',
    traps: T_KM.concat(['Cette table est celle du transcodeur « 4 × N en BCD » de 2017-2018 (W = F’, X = E’, Y = D’, Z = C’) : mêmes réponses.']),
    grading: '5 points.', official: true, note: OFF
  });

  add({
    id: 'p2019-ex3', exam: 'p2019', kind: 'partiel', order: 3, src: 'Partiel S1 2019-2020 · Ex 3 (aussi 2014-2015, 2022-2023, rattrapage 2017-2018)', title: 'Simplifier le montage du cours et le redessiner', pts: 3,
    topics: ['schema', 'simplification'], lvl: 1, time: 10,
    intro: p('On cherche à simplifier le montage ci-dessous :') + tool('schema', { w: 580, h: 270, live: false, alt: 'Montage : deux ET, un NON-OU, deux NON, un ET à trois entrées, un OU', inputs: [{ id: 'a', x: 26 }, { id: 'b', x: 58 }, { id: 'c', x: 90 }], gates: [{ id: 'g1', type: 'and', x: 136, y: 28, in: ['a', 'b'] }, { id: 'g2', type: 'and', x: 136, y: 84, in: ['a', 'c'] }, { id: 'g3', type: 'nor', x: 254, y: 52, in: ['g1', 'g2'] }, { id: 'g4', type: 'not', x: 136, y: 136, h: 30, in: ['a'] }, { id: 'g5', type: 'not', x: 136, y: 178, h: 30, in: ['b'] }, { id: 'g6', type: 'and', x: 254, y: 172, n: 3, in: ['g4', 'g5', 'c'] }, { id: 'g7', type: 'or', x: 392, y: 112, in: ['g3', 'g6'] }], outputs: [{ from: 'g7', label: 'S', x: 490 }] }) +
      '<ol><li>Exprimez, sans simplification, la sortie S en fonction des entrées a, b et c.</li><li>Donnez l’expression la plus simplifiée de S (en 2014-2015 et au rattrapage de 2017-2018 : par la méthode algébrique, avec le détail des calculs).</li><li>À partir de l’expression la plus simplifiée, donnez un nouveau montage constitué de trois portes NON, d’une porte ET à deux entrées et d’une porte OU à deux entrées.</li></ol>',
    hints: ['Écris la sortie de chaque porte, de gauche à droite : a.b, a.c, la NON-OU des deux, ~a, ~b, puis ~a.~b.c.', 'De Morgan deux fois sur ~(a.b + a.c), puis développe.', '~a absorbe ~a.~c, ~a.~b et ~a.~b.c (théorème 1).'],
    solution: [
      { t: 'Sans simplification', html: '<div class="calc"><div><span>' + bx('S = ~(a.b + a.c) + ~a.~b.c') + '</span></div></div>' },
      { t: 'Par la méthode algébrique', html: calc([['~(a.b).~(a.c) + ~a.~b.c', 'De Morgan'], ['(~a + ~b).(~a + ~c) + ~a.~b.c', 'De Morgan'], ['~a.~a + ~a.~c + ~a.~b + ~b.~c + ~a.~b.c', 'développement'], ['~a + ~a.~c + ~a.~b + ~b.~c + ~a.~b.c', '~a.~a = ~a'], ['~a + ~b.~c', 'théorème 1']]) },
      { t: 'Le nouveau montage', html: tool('schema', { w: 460, h: 170, live: true, inputs: [{ id: 'a', x: 26, y2: 150 }, { id: 'b', x: 52, y2: 150 }, { id: 'c', x: 78, y2: 150 }], gates: [{ id: 'na', type: 'not', x: 130, y: 20, h: 30, in: ['a'] }, { id: 'nb', type: 'not', x: 130, y: 70, h: 30, in: ['b'] }, { id: 'nc', type: 'not', x: 130, y: 112, h: 30, in: ['c'] }, { id: 'g', type: 'and', x: 220, y: 80, in: ['nb', 'nc'] }, { id: 'o', type: 'or', x: 320, y: 30, in: ['na', 'g'] }], outputs: [{ from: 'o', label: 'S', x: 410 }] }) }],
    answer: '<div class="calc res"><div><span>' + bx('S = ~(a.b + a.c) + ~a.~b.c') + '</span><span class="why-r">question 1</span></div><div><span>' + bx('S = ~a + ~b.~c') + '</span><span class="why-r">question 2</span></div></div>' + p('Question 3 : NON sur a, b et c ; ET de ~b et ~c ; OU de ~a et de ce ET.'),
    traps: ['Simplifier dès la question 1 : elle demande l’expression sans simplification.', 'Oublier une barre en lisant la porte NON-OU : sa sortie est ~(a.b + a.c), pas a.b + a.c.'],
    grading: '3 points.', official: true, note: OFF + ' C’est le schéma et le calcul du cours (§ III.4).'
  });

  add({
    id: 'p2022-ex5', exam: 'p2022', kind: 'partiel', order: 5, src: 'Partiel S1 2022-2023 · Ex 5', title: 'Trois expressions : simplifier, formes canoniques, S2 = S3 ?', pts: 5,
    topics: ['simplification', 'canon1', 'canon2', 'xor'], lvl: 2, time: 15, near: ['p2016-ex4'],
    intro: p('Soit les trois expressions suivantes :') + '<div class="calc"><div><span>' + bx('S1 = ~((A + ~B + C).(A + ~C).(~A + ~B))') + '</span></div><div><span>' + bx('S2 = A.B.C + A.~B.~C + ~A.B.~C + A.~B.C') + '</span></div><div><span>' + bx('S3 = A ^ (B.~C)') + '</span></div></div>' +
      '<ol><li>Donnez l’expression la plus simplifiée de S1, sous la forme d’une somme de produits (sans parenthèses).</li><li>Donnez la première forme canonique de S1.</li><li>Donnez la seconde forme canonique de S2.</li><li>Est-il vrai que S2 = S3 ? (Répondre « Oui » ou « Non ».)</li><li>Trouvez les deux entiers m et n tels que 2<sup>m</sup> − 2<sup>n</sup> = 4064. (Numération, B1.)</li></ol>',
    hints: ['Le produit sous la barre de S1 se simplifie en A.~B + ~B.~C (voir l’examen de 2021-2022) ; De Morgan donne son complément.', 'Compare les tables de vérité de S2 et de S3, ligne par ligne.', '4064 = 4096 − 32.'],
    solution: [
      { t: 'S1', html: calc([['~(A.~B + ~B.~C)', 'le produit vaut A.~B + ~B.~C'], ['~(~B.(A + ~C))', 'factorisation'], ['B + ~(A + ~C)', 'De Morgan'], ['B + ~A.C', 'De Morgan']]) },
      { t: 'Formes canoniques', html: p('S1 vaut 1 sur cinq lignes (010, 011, 110, 111 pour B, et 001) ; S2 vaut 0 sur 000, 001, 011 et 110.') + tt({ vars: ['A', 'B', 'C'], exprs: ['B + ~A.C', 'A.B.C + A.~B.~C + ~A.B.~C + A.~B.C', 'A ^ (B.~C)'], names: ['S1', 'S2', 'S3'] }) },
      { t: 'S2 = S3 ?', html: p('Les colonnes S2 et S3 sont identiques : oui. En effet ' + bx('A ^ (B.~C) = ~A.B.~C + A.~(B.~C) = ~A.B.~C + A.~B + A.C') + ', qui est la forme simplifiée de S2.') },
      { t: '2^m − 2^n = 4064', html: p('4064 = 4096 − 32 = 2<sup>12</sup> − 2<sup>5</sup> : m = 12, n = 5.') }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = B + ~A.C') + '</span></div><div><span>' + bx('S1 = A.B.C + A.B.~C + ~A.B.C + ~A.B.~C + ~A.~B.C') + '</span></div><div><span>' + bx('S2 = (A + B + C).(A + B + ~C).(A + ~B + ~C).(~A + ~B + C)') + '</span></div></div>' + p('S2 = S3 : oui. m = 12, n = 5.'),
    traps: ['Oublier la grande barre de S1 : sans elle, le résultat serait A.~B + ~B.~C (exercice de 2021-2022).'],
    grading: '5 points.', official: true, note: OFF
  });

  /* ================================================================ Partiel S1 2021-2022 (promo 2026) */
  add({
    id: 'p2021-ex3', exam: 'p2021', kind: 'partiel', order: 3, src: 'Partiel S1 2021-2022 · Ex 3', title: 'Tableaux de Karnaugh à 3 et à 4 variables, avec Φ', pts: 6,
    topics: ['karnaugh', 'indefini'], lvl: 2, time: 20, near: ['p2023-ex3'],
    intro: p('Pour tout l’exercice, les variables S1 à S6 peuvent prendre les valeurs 0 ou 1. ' + K_KM) + p('1. Soit N un nombre binaire codé sur 3 bits (C, B, A). A est le bit de poids faible.') + ul(['S1 = 1 pour N = 1, 3, 4, 5', 'S2 = 1 pour N = 0, 2, 4, 5, 6, 7']) +
      p('2. Soit N un nombre binaire codé sur 4 bits (D, C, B, A).') + ul(['S3 = 1 pour N = 0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15', 'S4 = 1 pour N = 0, 1, 4, 6, 8, 9, 12, 14', 'S5 = 1 pour N = 5, 7, 13, 15 et S5 n’est pas définie pour N = 0, 2, 8, 10', 'S6 = 1 pour N = 2, 6 et S6 n’est pas définie pour N = 0, 1, 4, 5, 8, 9, 12, 13']),
    hints: H_KM,
    solution: [
      { t: 'S1 à S4 et S6', html: p('Ce sont les tableaux de l’examen 2 de 2023-2024 : voir la fiche « Examen 2 2023-2024 · Ex 3 ».') + km({ vars: D4, rows: 2, ones: [0, 1, 4, 6, 8, 9, 12, 14], name: 'S4' }) },
      { t: 'S5', html: km({ vars: D4, rows: 2, ones: [5, 7, 13, 15], dc: [0, 2, 8, 10], name: 'S5' }) + p('Le carré central (lignes 01 et 11, colonnes 01 et 11) : C.A. Les Φ des coins restent dehors.') }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = ~C.A + C.~B') + '</span></div><div><span>' + bx('S2 = ~A + C') + '</span></div><div><span>' + bx('S3 = ~D + A') + '</span></div><div><span>' + bx('S4 = ~C.~B + C.~A') + '</span></div><div><span>' + bx('S5 = C.A') + '</span></div><div><span>' + bx('S6 = ~D.~A') + '</span></div></div>',
    traps: T_KM, grading: '6 points pour 6 tableaux.', official: true, note: OFF
  });

  add({
    id: 'p2021-ex4', exam: 'p2021', kind: 'partiel', order: 4, src: 'Partiel S1 2021-2022 · Ex 4', title: 'Expressions : simplifier, formes canoniques, OU exclusif', pts: 7,
    topics: ['simplification', 'canon1', 'canon2', 'xor'], lvl: 2, time: 20,
    intro: p('Pour tout l’exercice, le résultat seul est attendu. Soit les deux expressions suivantes :') + '<div class="calc"><div><span>' + bx('S1 = (A + ~B + C).(A + ~C).(~A + ~B)') + '</span></div><div><span>' + bx('S2 = ~A.~(A + B.C).(A.D + C) + ~A.C') + '</span></div></div>' +
      '<ol><li>Donnez les expressions les plus simplifiées de S1 et de S2 (sommes de produits, sans parenthèses).</li><li>Donnez la première forme canonique de S1.</li><li>Donnez la seconde forme canonique de S1.</li><li>Si A = 1, donnez l’expression la plus simplifiée de S1.</li><li>Simplifiez à l’aide d’un OU exclusif : ' + bx('A + B.C.D + B.~C.~D') + '.</li><li>Simplifiez à l’aide d’un OU exclusif : ' + bx('B.C + ~A.B + A.~B.~C') + '.</li></ol>',
    hints: H_SIMP.concat(['5 : factorise B dans les deux derniers termes. 6 : regroupe ce qui contient B et ce qui contient ~B.']),
    solution: [
      { t: 'S1', html: calc([['(A + (~B + C).~C).(~A + ~B)', 'distributivité du OU'], ['(A + ~B.~C).(~A + ~B)', 'C.~C = 0'], ['A.~A + A.~B + ~A.~B.~C + ~B.~C', 'développement'], ['A.~B + ~B.~C', 'théorème 1']]) },
      { t: 'S2', html: calc([['~A.~A.(~B + ~C).(A.D + C) + ~A.C', 'De Morgan'], ['~A.(~B + ~C).A.D + ~A.(~B + ~C).C + ~A.C', 'développement'], ['~A.~B.C + ~A.C', '~A.A = 0, ~C.C = 0'], ['~A.C', 'théorème 1']]) },
      { t: 'Formes canoniques et cas A = 1', html: tt({ vars: ['A', 'B', 'C'], exprs: ['A.~B + ~B.~C'], names: ['S1'] }) + p('Si A = 1 : S1 = ~B + ~B.~C = ~B.') },
      { t: 'Les deux OU exclusifs', html: calc([['A + B.(C.D + ~C.~D)', 'factorisation'], ['A + B.~(C ^ D)', 'X.Y + ~X.~Y = ~(X ^ Y)']]) + calc([['B.(C + ~A) + ~B.(A.~C)', 'factorisation'], ['B.~(A.~C) + ~B.(A.~C)', 'De Morgan'], ['B ^ (A.~C)', 'X.~Y + ~X.Y = X ^ Y']]) }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = A.~B + ~B.~C') + '</span></div><div><span>' + bx('S2 = ~A.C') + '</span></div><div><span>' + bx('S1 = A.~B.C + A.~B.~C + ~A.~B.~C') + '</span></div><div><span>' + bx('S1 = (A + B + ~C).(A + ~B + C).(A + ~B + ~C).(~A + ~B + C).(~A + ~B + ~C)') + '</span></div><div><span>' + bx('S1 = ~B') + '</span><span class="why-r">si A = 1</span></div><div><span>' + bx('A + B.~(C ^ D)') + '</span></div><div><span>' + bx('B ^ (~C.A)') + '</span></div></div>',
    traps: ['Question 4 : remplacer A par 1 avant de simplifier : ~A vaut 0.', 'Question 6 : B ^ (~C.A) et B ^ (A.~C) sont la même réponse.'],
    grading: '7 points.', official: true, note: OFF
  });

  /* ================================================================ Examen final 2020-2021 (promo 2025), anglais ; Aiken = 2016-2017 */
  var AIK = [0, 1, 2, 3, 4, 11, 12, 13, 14, 15];
  function bit(k) { return AIK.map(function (v) { return (v >> k) & 1; }); }
  add({
    id: 'p2020-ex3', exam: 'p2020', kind: 'partiel', order: 3, src: 'Examen final 2020-2021 · Ex 3 (aussi partiel 2016-2017, Ex 3)', title: 'Transcodeur binaire naturel → code Aiken', pts: 5,
    topics: ['transcodeur', 'karnaugh', 'indefini', 'probleme'], lvl: 3, time: 20,
    intro: p('Parmi les codes possibles, il existe le code 2421 : les poids des bits ne sont plus 8, 4, 2, 1 mais 2, 4, 2, 1. Plusieurs écritures sont alors possibles pour certains nombres : 5 peut s’écrire 0101 ou 1011 ; 9 s’écrit 1111, et on ne peut pas dépasser 9 avec 4 bits.') +
      p('Le code Aiken est un code 2421 : de 0 à 4, il correspond au code BCD ; de 5 à 9, il correspond aux nombres 11 à 15 du binaire naturel. On veut le transcodeur qui passe du binaire naturel (DCBA) au code Aiken (D’C’B’A’) sur 4 bits. Complétez la table de vérité et les tableaux de Karnaugh (cercles compris), puis donnez les expressions les plus simplifiées. Une solution évidente (sans opération logique hormis le complément) se donne sans tableau.'),
    hints: ['Entrées 0 à 9 seulement : 10 à 15 sont des Φ.', 'De 0 à 4 la sortie recopie l’entrée ; de 5 à 9 elle vaut l’entrée + 6 (5 → 1011 = 11).', 'A’ = A : solution évidente (les deux codes ont la même parité).'],
    solution: [
      { t: 'La table de vérité', html: tt({ vars: D4, cols: { "D'": bit(3).concat(['x', 'x', 'x', 'x', 'x', 'x']), "C'": bit(2).concat(['x', 'x', 'x', 'x', 'x', 'x']), "B'": bit(1).concat(['x', 'x', 'x', 'x', 'x', 'x']), "A'": bit(0).concat(['x', 'x', 'x', 'x', 'x', 'x']) } }) },
      { t: 'D’', html: km({ vars: D4, rows: 2, ones: ones(bit(3)), dc: DC6, name: "D'" }) },
      { t: 'C’', html: km({ vars: D4, rows: 2, ones: ones(bit(2)), dc: DC6, name: "C'" }) },
      { t: 'B’', html: km({ vars: D4, rows: 2, ones: ones(bit(1)), dc: DC6, name: "B'" }) }],
    answer: '<div class="calc res"><div><span>' + bx("D' = D + C.A + C.B") + '</span></div><div><span>' + bx("C' = D + C.~A + C.B") + '</span></div><div><span>' + bx("B' = D + ~C.B + C.~B.A") + '</span></div><div><span>' + bx("A' = A") + '</span></div></div>',
    traps: ['Coder 5 en 0101 : le code Aiken prend 1011 pour 5.', 'Oublier les Φ de 10 à 15.'],
    grading: '5 points.', official: true, note: OFF
  });

  add({
    id: 'p2020-ex4', exam: 'p2020', kind: 'partiel', order: 4, src: 'Examen final 2020-2021 · Ex 4', title: 'Expressions : simplifier, OU exclusif, formes canoniques', pts: 5,
    topics: ['simplification', 'xor', 'canon1', 'canon2'], lvl: 2, time: 15,
    intro: p('Le résultat seul est attendu. Soit les deux expressions suivantes :') + '<div class="calc"><div><span>' + bx('S1 = A.B.C + ~A.B.~C + A.~B.~C + A.~B.C') + '</span></div><div><span>' + bx('S2 = ~(~A.B + ~A.~C)') + '</span></div></div>' +
      '<ol><li>Donnez les expressions les plus simplifiées de S1 et de S2 (sommes de produits, sans OU exclusif).</li><li>Simplifiez S1 à l’aide du OU exclusif.</li><li>Donnez la seconde forme canonique de S1.</li><li>Donnez la première forme canonique de S2.</li></ol>',
    hints: ['S1 : A.B.C + A.~B.C = A.C ; A.~B.~C + A.~B.C = A.~B (on peut réutiliser A.~B.C : X + X = X).', 'S2 : factorise ~A sous la barre, puis De Morgan.', 'OU exclusif : A.C + A.~B = A.(C + ~B) = A.~(B.~C).'],
    solution: [
      { t: 'S1', html: calc([['A.B.C + A.~B.C + A.~B.C + A.~B.~C + ~A.B.~C', 'X = X + X'], ['A.C.(B + ~B) + A.~B.(C + ~C) + ~A.B.~C', 'factorisation'], ['A.C + A.~B + ~A.B.~C', '']]) + calc([['A.(C + ~B) + ~A.(B.~C)', 'factorisation'], ['A.~(B.~C) + ~A.(B.~C)', 'De Morgan'], ['A ^ (B.~C)', 'X.~Y + ~X.Y']]) },
      { t: 'S2', html: calc([['~(~A.(B + ~C))', 'factorisation'], ['A + ~(B + ~C)', 'De Morgan'], ['A + ~B.C', 'De Morgan']]) }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = A.C + A.~B + ~A.B.~C') + '</span></div><div><span>' + bx('S2 = A + ~B.C') + '</span></div><div><span>' + bx('S1 = A ^ (B.~C)') + '</span></div><div><span>' + bx('S1 = (A + B + C).(A + B + ~C).(~A + ~B + C).(A + ~B + ~C)') + '</span></div><div><span>' + bx('S2 = A.B.C + A.B.~C + A.~B.C + A.~B.~C + ~A.~B.C') + '</span></div></div>',
    traps: ['Oublier que A.~B.C peut servir deux fois.'], grading: '5 points.', official: true, note: OFF + ' Sujet et corrigé en anglais seulement.'
  });

  /* ================================================================ Partiel S1 2019-2020 (promo 2024) = 2014-2015 */
  var GT = [4, 8, 9, 12, 13, 14], EQ = [0, 5, 10, 15], LT = [1, 2, 3, 6, 7, 11];
  add({
    id: 'p2019-ex4', exam: 'p2019', kind: 'partiel', order: 4, src: 'Partiel S1 2019-2020 · Ex 4 (aussi 2014-2015, Ex 3)', title: 'Comparateur de deux nombres de 2 bits', pts: 4,
    topics: ['arith', 'karnaugh', 'xor', 'probleme'], lvl: 2, time: 18, near: ['p2023-ex5'],
    intro: p('On souhaite réaliser un comparateur : les entrées A (A1 A0) et B (B1 B0) sont deux entiers non signés sur deux bits (A0 et B0 sont les bits de poids faible). Si A &gt; B, la sortie ‘A &gt; B’ est à 1 et les autres à 0 ; de même pour ‘A = B’ et ‘A &lt; B’.') +
      '<ol><li>Complétez la table de vérité (entrées A1, A0, B1, B0).</li><li>Sans l’aide de tableaux de Karnaugh, donnez l’expression simplifiée de la sortie ‘A = B’. Utilisez une simplification à l’aide de l’opérateur OU EXCLUSIF.</li><li>Remplissez les tableaux de Karnaugh (bulles comprises), puis donnez les expressions simplifiées de ‘A &gt; B’ et ‘A &lt; B’. Aucun point ne sera attribué à une expression si son tableau est faux.</li></ol>',
    hints: ['Ligne par ligne : lis A = 2.A1 + A0 et B = 2.B1 + B0.', 'A = B si A1 = B1 et A0 = B0 : un produit de deux NON-OU exclusifs.', 'Tableaux : lignes A1 A0, colonnes B1 B0.'],
    solution: [
      { t: 'Table de vérité', html: tt({ vars: ['A1', 'A0', 'B1', 'B0'], cols: { 'A>B': [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0], 'A=B': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], 'A<B': [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0] } }) },
      { t: '‘A = B’', html: '<div class="calc"><div><span>' + bx('~(A0 ^ B0).~(A1 ^ B1)') + '</span></div></div>' },
      { t: '‘A > B’', html: km({ vars: ['A1', 'A0', 'B1', 'B0'], rows: 2, ones: GT, name: 'A>B' }) },
      { t: '‘A < B’', html: km({ vars: ['A1', 'A0', 'B1', 'B0'], rows: 2, ones: LT, name: 'A<B' }) }],
    answer: '<div class="calc res"><div><span>' + bx('A1.~B1 + A0.~B1.~B0 + A1.A0.~B0') + '</span><span class="why-r">‘A &gt; B’</span></div><div><span>' + bx('~(A0 ^ B0).~(A1 ^ B1)') + '</span><span class="why-r">‘A = B’</span></div><div><span>' + bx('~A1.B1 + ~A1.~A0.B0 + ~A0.B1.B0') + '</span><span class="why-r">‘A &lt; B’</span></div></div>',
    traps: ['Mettre B1 B0 en lignes : les numéros des cases changent ; recopie l’en-tête du sujet.', 'Écrire ‘A = B’ avec un OU, ~(A0 ^ B0) + ~(A1 ^ B1) : il faut les deux égalités à la fois, c’est un ET.'],
    grading: '4 points.', official: true, note: OFF + ' Le sujet de 2014-2015 (sans corrigé) pose le même exercice.'
  });

  var UU = [0, 1, 0, 1, 0, 0, 0, 0], VV = [1, 1, 1, 1, 1, 0, 0, 1], WW = [0, 1, 1, 0, 0, 1, 1, 0], XW = [0, 1, 1, 1, 1, 0, 0, 0];
  var YY = [0, 0, 0, 'x', 0, 0, 0, 'x', 'x', 'x', 1, 1, 1, 1, 1, 1], ZZ = [1, 0, 1, 0, 0, 'x', 0, 'x', 1, 0, 1, 0, 0, 'x', 0, 'x'];
  function dcs(c) { return c.reduce(function (a, v, i) { if (v === 'x') a.push(i); return a; }, []); }
  add({
    id: 'p2019-ex5', exam: 'p2019', kind: 'partiel', order: 5, src: 'Partiel S1 2019-2020 · Ex 5 (aussi 2014-2015, Ex 5)', title: 'Six sorties : formes canoniques, Karnaugh, OU exclusif', pts: 6,
    topics: ['canon1', 'canon2', 'karnaugh', 'indefini', 'xor'], lvl: 2, time: 20,
    intro: p('Soit les tables de vérité ci-dessous. A, B, C et D sont les entrées ; U, V, W, X, Y et Z sont les sorties.') + tt({ vars: ['A', 'B', 'C'], cols: { U: UU, V: VV, W: WW, X: XW } }) + tt({ vars: ['A', 'B', 'C', 'D'], cols: { Y: YY, Z: ZZ } }) +
      '<ol><li>Donnez la première forme canonique de U.</li><li>Donnez la seconde forme canonique de V.</li><li>Remplissez les diagrammes de Karnaugh (bulles comprises), puis donnez l’expression la plus simplifiée de W, X, Y et Z, sans OU exclusif pour l’instant.</li><li>Parmi W, X, Y et Z, simplifiez celles qui peuvent l’être à l’aide du OU exclusif.</li></ol>',
    hints: ['U : deux lignes à 1 ; V : deux lignes à 0.', 'X : le tableau du sujet a 4 lignes AB et 2 colonnes C.', 'W = ~B.C + B.~C : reconnais un OU exclusif.'],
    solution: [
      { t: 'U et V', html: p('U vaut 1 sur 001 et 011 ; V vaut 0 sur 101 et 110.') },
      { t: 'W', html: km({ vars: ['A', 'B', 'C'], rows: 1, ones: ones(WW), name: 'W', xor: 'B ^ C' }) },
      { t: 'X', html: km({ vars: ['A', 'B', 'C'], rows: 2, ones: ones(XW), name: 'X', xor: 'A ^ (B + C)' }) + calc([['~A.(B + C) + A.~B.~C', 'factorisation'], ['~A.(B + C) + A.~(B + C)', 'De Morgan'], ['A ^ (B + C)', 'X.~Y + ~X.Y']]) },
      { t: 'Y', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: ones(YY), dc: dcs(YY), name: 'Y' }) },
      { t: 'Z', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: ones(ZZ), dc: dcs(ZZ), name: 'Z' }) }],
    answer: '<div class="calc res"><div><span>' + bx('U = ~A.~B.C + ~A.B.C') + '</span></div><div><span>' + bx('V = (~A + B + ~C).(~A + ~B + C)') + '</span></div><div><span>' + bx('W = ~B.C + B.~C = B ^ C') + '</span></div><div><span>' + bx('X = ~A.B + ~A.C + A.~B.~C = A ^ (B + C)') + '</span></div><div><span>' + bx('Y = A') + '</span></div><div><span>' + bx('Z = ~B.~D') + '</span></div></div>',
    traps: ['Simplifier U : la question demande la forme canonique, pas ~A.C.', 'Y : avec les Φ, les deux lignes AB = 11 et 10 forment un cercle de 8 cases, A.'],
    grading: '6 points.', official: true, note: OFF
  });

  /* ================================================================ Partiel de juin 2018 (S1#) */
  function bcd(mult) {
    var c = {};
    for (var n = 0; n < 10; n++) {
      var v = mult * n, t = Math.floor(v / 10), u = v % 10;
      [["H'", t, 3], ["G'", t, 2], ["F'", t, 1], ["E'", t, 0], ["D'", u, 3], ["C'", u, 2], ["B'", u, 1], ["A'", u, 0]].forEach(function (x) { (c[x[0]] = c[x[0]] || []).push((x[1] >> x[2]) & 1); });
    }
    return c;
  }
  var B3 = bcd(3), B4 = bcd(4);
  function bcdTable(c) { var o = {}; Object.keys(c).forEach(function (k) { o[k] = c[k].concat(['x', 'x', 'x', 'x', 'x', 'x']); }); return tt({ vars: D4, cols: o }); }
  add({
    id: 'p2018j-ex3', exam: 'p2018j', kind: 'partiel', order: 3, src: 'Partiel S1# de juin 2018 · Ex 3', title: 'Problème : multiplier un chiffre BCD par 3', pts: 9,
    topics: ['transcodeur', 'karnaugh', 'indefini', 'xor', 'probleme'], lvl: 3, time: 30, near: ['p2017-ex3'],
    intro: p('On veut réaliser un circuit qui multiplie par 3 un nombre N (= DCBA) écrit en code BCD sur un seul chiffre. Le résultat doit être obtenu directement en code BCD, donc sur 2 chiffres (H’G’F’E’ pour le chiffre des dizaines et D’C’B’A’ pour celui des unités, le poids fort toujours à gauche). Complétez les tables de vérité et les tableaux de Karnaugh (les bulles doivent être clairement repérées) pour donner les équations simplifiées de chaque sortie. Si des simplifications à l’aide de OU EXCLUSIF sont possibles, faites-les apparaître. Trois sorties sont évidentes et ne nécessitent pas de tableau.'),
    hints: ['3 × 9 = 27 : le chiffre des dizaines vaut au plus 2, donc H’ = G’ = 0.', '3 × N a la même parité que N : A’ = A.', 'Entrées 10 à 15 : Φ.'],
    solution: [
      { t: 'La table de vérité', html: bcdTable(B3) },
      { t: 'F’ et E’', html: km({ vars: D4, rows: 2, ones: ones(B3["F'"]), dc: DC6, name: "F'" }) + km({ vars: D4, rows: 2, ones: ones(B3["E'"]), dc: DC6, name: "E'" }) },
      { t: 'D’ et C’', html: km({ vars: D4, rows: 2, ones: ones(B3["D'"]), dc: DC6, name: "D'", xor: 'B.(C ^ A)' }) + km({ vars: D4, rows: 2, ones: ones(B3["C'"]), dc: DC6, name: "C'" }) },
      { t: 'B’', html: km({ vars: D4, rows: 2, ones: ones(B3["B'"]), dc: DC6, name: "B'" }) + p('Le corrigé écrit aussi ' + bx("B' = ~B.(C ^ A) + ~C.B.~A") + '.') }],
    answer: '<div class="calc res"><div><span>' + bx("H' = 0") + '</span></div><div><span>' + bx("G' = 0") + '</span></div><div><span>' + bx("A' = A") + '</span></div><div><span>' + bx("F' = D + C.B.A") + '</span></div><div><span>' + bx("E' = C.~B + C.~A") + '</span></div><div><span>' + bx("D' = ~C.B.A + C.B.~A = B.(C ^ A)") + '</span></div><div><span>' + bx("C' = D + C.~B.A + ~C.B.~A") + '</span></div><div><span>' + bx("B' = ~C.~B.A + ~C.B.~A + C.~B.~A") + '</span></div></div>',
    traps: ['Écrire le résultat en binaire pur : 3 × 5 = 15 s’écrit 0001 0101 en BCD, pas 1111.', 'Oublier les Φ : sans eux, F’ et C’ ont des termes en ~D.'],
    grading: '9 points.', official: true, note: 'Corrigé officiel manuscrit (une autre équipe) : chaque sortie a été recalculée par programme, toutes sont justes.'
  });

  var ADD = { R: [], S1: [], S0: [] };
  for (var n = 0; n < 16; n++) { var s = ((n >> 3) & 1) * 2 + ((n >> 2) & 1) + ((n >> 1) & 1) * 2 + (n & 1); if (s & 4) ADD.R.push(n); if (s & 2) ADD.S1.push(n); if (s & 1) ADD.S0.push(n); }
  add({
    id: 'p2018j-ex4', exam: 'p2018j', kind: 'partiel', order: 4, src: 'Partiel S1# de juin 2018 · Ex 4', title: 'Additionneur de deux nombres de 2 bits', pts: 5,
    topics: ['arith', 'karnaugh', 'canon1', 'xor'], lvl: 2, time: 20,
    intro: p('On souhaite réaliser un circuit qui additionne 2 nombres A (A1 A0) et B (B1 B0) de 2 bits. Ce circuit doit générer la somme S (sur 2 bits, S1 S0) et une éventuelle retenue R.') + '<ol><li>Complétez la table de vérité (entrées B1, B0, A1, A0).</li><li>Donnez la première forme canonique de la sortie S1. Bonus : simplifiez S1 à l’aide de OU EXCLUSIF.</li><li>Remplissez les tableaux de Karnaugh et donnez les expressions simplifiées de R et S0, avec des OU EXCLUSIFS si possible.</li></ol>',
    hints: ['Ligne par ligne : calcule (2.B1 + B0) + (2.A1 + A0), entre 0 et 6, et écris-le sur 3 bits R S1 S0.', 'S0 ne dépend que de A0 et B0.', 'S1 = A1 + B1 + retenue du rang 0 (A0.B0), sans retenue : un OU exclusif à trois termes.'],
    solution: [
      { t: 'La table de vérité', html: tt({ vars: ['B1', 'B0', 'A1', 'A0'], cols: { R: ADD.R.reduce(function (a, k) { a[k] = 1; return a; }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), S1: ADD.S1.reduce(function (a, k) { a[k] = 1; return a; }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), S0: ADD.S0.reduce(function (a, k) { a[k] = 1; return a; }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) } }) },
      { t: 'R et S0', html: km({ vars: ['B1', 'B0', 'A1', 'A0'], rows: 2, ones: ADD.R, name: 'R' }) + km({ vars: ['B1', 'B0', 'A1', 'A0'], rows: 2, ones: ADD.S0, name: 'S0', xor: 'B0 ^ A0' }) },
      { t: 'S1', html: p('Huit mintermes (les lignes où S1 vaut 1), puis avec le OU exclusif : ' + bx('S1 = A1 ^ B1 ^ (A0.B0)') + '.') }],
    answer: '<div class="calc res"><div><span>' + bx('R = B1.A1 + B1.B0.A0 + B0.A1.A0') + '</span></div><div><span>' + bx('S0 = B0 ^ A0') + '</span></div><div><span>' + bx('S1 = ~B1.~B0.A1.~A0 + ~B1.~B0.A1.A0 + ~B1.B0.~A1.A0 + ~B1.B0.A1.~A0 + B1.~B0.~A1.~A0 + B1.~B0.~A1.A0 + B1.B0.~A1.~A0 + B1.B0.A1.A0') + '</span></div><div><span>' + bx('S1 = A1 ^ B1 ^ (A0.B0)') + '</span><span class="why-r">bonus</span></div></div>',
    traps: ['Confondre l’additionneur et le OU : 1 + 1 donne 0, avec une retenue.', 'Le corrigé manuscrit titre l’exercice « Comparateur 2 bits » : c’est bien un additionneur.'],
    grading: '5 points + 1 point bonus.', official: true, note: 'Corrigé officiel manuscrit : recalculé par programme, juste.'
  });

  /* ================================================================ Partiel S1 2017-2018 (promo 2022) */
  add({
    id: 'p2017-ex3', exam: 'p2017', kind: 'partiel', order: 3, src: 'Partiel S1 2017-2018 · Ex 3', title: 'Problème : multiplier un chiffre BCD par 4', pts: 6,
    topics: ['transcodeur', 'karnaugh', 'indefini', 'xor', 'probleme'], lvl: 3, time: 25, near: ['p2022-ex3', 'p2018j-ex3'],
    intro: p('On souhaite réaliser un circuit qui multiplie par 4 un nombre N (= DCBA) écrit en code BCD sur un seul chiffre. Le résultat doit être obtenu directement en code BCD, donc sur 2 chiffres (H’G’F’E’ pour le chiffre des dizaines et D’C’B’A’ pour celui des unités, le poids fort toujours à gauche). Complétez la table de vérité et les tableaux de Karnaugh (les bulles doivent être clairement repérées), puis donnez les expressions les plus simplifiées de chaque sortie (pas de simplification à l’aide de OU EXCLUSIF). Trois solutions sont évidentes et ne nécessitent pas de tableau. Pour finir, simplifiez une des sorties à l’aide de l’opérateur OU EXCLUSIF.'),
    hints: ['4 × 9 = 36 : dizaines au plus 3, donc H’ = G’ = 0 ; un multiple de 4 est pair : A’ = 0.', 'E’ et B’ ont la même colonne : un seul tableau.', 'D’ = C.B.A + ~C.B.~A = B.~(C ^ A).'],
    solution: [
      { t: 'La table de vérité', html: bcdTable(B4) },
      { t: 'F’', html: km({ vars: D4, rows: 2, ones: ones(B4["F'"]), dc: DC6, name: "F'" }) },
      { t: 'E’ = B’', html: km({ vars: D4, rows: 2, ones: ones(B4["E'"]), dc: DC6, name: "E'" }) },
      { t: 'D’ et C’', html: km({ vars: D4, rows: 2, ones: ones(B4["D'"]), dc: DC6, name: "D'", xor: 'B.~(C ^ A)' }) + km({ vars: D4, rows: 2, ones: ones(B4["C'"]), dc: DC6, name: "C'" }) }],
    answer: '<div class="calc res"><div><span>' + bx("H' = 0") + '</span></div><div><span>' + bx("G' = 0") + '</span></div><div><span>' + bx("A' = 0") + '</span></div><div><span>' + bx("F' = D + C.A + C.B") + '</span></div><div><span>' + bx("E' = B' = D + C.~B.~A + ~C.B.A") + '</span></div><div><span>' + bx("D' = C.B.A + ~C.B.~A") + '</span></div><div><span>' + bx("C' = C.~A + ~C.~B.A") + '</span></div><div><span>' + bx("D' = B.~(C ^ A)") + '</span><span class="why-r">avec OU exclusif</span></div></div>',
    traps: ['Écrire 4 × 7 = 28 en binaire (11100) : en BCD, c’est 0010 1000.'],
    grading: '6 points.', official: true, note: OFF + ' La table revient en 2022-2023 (exercice 3), sans l’histoire.'
  });

  add({
    id: 'p2017-ex4', exam: 'p2017', kind: 'partiel', order: 4, src: 'Partiel S1 2017-2018 · Ex 4', title: 'Expressions en X, Y, Z : simplifier, formes canoniques', pts: 4,
    topics: ['simplification', 'canon1', 'canon2'], lvl: 2, time: 12,
    intro: p('Soit les deux expressions suivantes :') + '<div class="calc"><div><span>' + bx('S1 = Y.(X + ~Z) + (~X + Z).(X + Z)') + '</span></div><div><span>' + bx('S2 = (~Y + Z).(~X + ~Z).(~X + Y + Z)') + '</span></div></div>' +
      '<ol><li>Donnez les expressions les plus simplifiées de S1 et de S2, sous la forme d’une somme de produits.</li><li>Donnez la première forme canonique de S1 (à partir de la forme la plus simplifiée).</li><li>Donnez la seconde forme canonique de S2.</li></ol>',
    hints: ['(~X + Z).(X + Z) = Z + ~X.X = Z : distributivité du OU.', 'Pour S2, commence par (~X + ~Z).(~X + Y + Z) = ~X + ~Z.(Y + Z).', 'S1 ne dépend que de Y et Z : sa première forme n’a que ces deux variables.'],
    solution: [
      { t: 'S1', html: calc([['Y.(X + ~Z) + Z + ~X.X', 'distributivité du OU'], ['Y.(X + ~Z) + Z', 'X.~X = 0'], ['X.Y + Y.~Z + Z', 'développement'], ['X.Y + Y + Z', 'théorème 2 : Z + ~Z.Y = Z + Y'], ['Y + Z', 'théorème 1']]) },
      { t: 'S2', html: calc([['(~Y + Z).(~X + ~Z.(Y + Z))', 'distributivité du OU'], ['(~Y + Z).(~X + Y.~Z)', '~Z.Z = 0'], ['~X.~Y + Y.~Y.~Z + ~X.Z + Y.~Z.Z', 'développement'], ['~X.~Y + ~X.Z', '']]) }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = Y + Z') + '</span></div><div><span>' + bx('S2 = ~X.Z + ~X.~Y') + '</span></div><div><span>' + bx('S1 = Y.Z + Y.~Z + ~Y.Z') + '</span></div><div><span>' + bx('S2 = (X + ~Y + Z).(~X + ~Y + Z).(~X + Y + ~Z).(~X + ~Y + ~Z).(~X + Y + Z)') + '</span></div></div>',
    traps: ['Ajouter X dans la première forme de S1 : X a disparu de la forme simplifiée, la question part de celle-ci.'],
    grading: '4 points.', official: true, note: OFF
  });

  /* ================================================================ Partiel S1 2016-2017 (promo 2021) */
  add({
    id: 'p2016-ex4', exam: 'p2016', kind: 'partiel', order: 4, src: 'Partiel S1 2016-2017 · Ex 4', title: 'Expressions : simplifier, OU exclusif, formes canoniques', pts: 5,
    topics: ['simplification', 'xor', 'canon1', 'canon2'], lvl: 2, time: 15, near: ['td1-ex1', 'p2022-ex5'],
    intro: p('Le résultat seul est attendu. Soit les deux expressions suivantes :') + '<div class="calc"><div><span>' + bx('S1 = A.B.C + A.~B.~C + ~A.B.~C + ~A.B.C') + '</span></div><div><span>' + bx('S2 = ~((A + ~B + C).(A + ~C).(~A + ~B))') + '</span></div></div>' +
      '<ol><li>Donnez les expressions les plus simplifiées de S1 et de S2 (sommes de produits, sans OU exclusif).</li><li>Simplifiez S1 à l’aide de l’opérateur OU exclusif.</li><li>Donnez la seconde forme canonique de S1.</li><li>Donnez la première forme canonique de S2.</li></ol>',
    hints: ['S1 est l’expression S6 du TD 1 : A.B.C + ~A.B.C = B.C, ~A.B.~C + ~A.B.C = ~A.B.', 'S2 est le complément de A.~B + ~B.~C.', 'OU exclusif : regroupe ce qui contient B et ce qui contient ~B.'],
    solution: [
      { t: 'S1', html: calc([['A.B.C + ~A.B.C + ~A.B.C + ~A.B.~C + A.~B.~C', 'X = X + X'], ['B.C + ~A.B + A.~B.~C', 'factorisations']]) + calc([['B.(C + ~A) + ~B.(A.~C)', 'factorisation'], ['B.~(A.~C) + ~B.(A.~C)', 'De Morgan'], ['B ^ (A.~C)', '']]) },
      { t: 'S2', html: calc([['~(A.~B + ~B.~C)', 'le produit vaut A.~B + ~B.~C'], ['B + ~A.C', 'De Morgan (voir 2022-2023)']]) }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = B.C + ~A.B + A.~B.~C') + '</span></div><div><span>' + bx('S2 = B + ~A.C') + '</span></div><div><span>' + bx('S1 = B ^ (~C.A)') + '</span></div><div><span>' + bx('S1 = (A + B + C).(A + B + ~C).(~A + ~B + C).(~A + B + ~C)') + '</span></div><div><span>' + bx('S2 = A.B.C + A.B.~C + ~A.B.C + ~A.B.~C + ~A.~B.C') + '</span></div></div>',
    traps: ['Prendre S1 = B + A.~B.~C : faux pour A = 1, B = 1, C = 0 (S1 vaut 0).'], grading: '5 points.', official: true, note: OFF
  });

  /* ================================================================ Rattrapages */
  add({
    id: 'r2016-ex4', exam: 'r2016', kind: 'partiel', order: 4, src: 'Rattrapage 2016-2017 · Ex 4', title: 'Une expression, ses formes canoniques, deux tableaux de Karnaugh', pts: 5,
    topics: ['simplification', 'canon1', 'canon2', 'karnaugh'], lvl: 2, time: 15,
    intro: p('Le résultat seul est attendu. Soit l’expression suivante :') + '<div class="calc"><div><span>' + bx('S1 = (~A + B + C).(B + ~C).(~A + ~B)') + '</span></div></div>' +
      '<ol><li>Donnez l’expression la plus simplifiée de S1 (somme de produits).</li><li>Donnez la première forme canonique de S1.</li><li>Donnez la seconde forme canonique de S1.</li><li>Remplissez les tableaux de Karnaugh (lignes AB, colonnes CD) et donnez les expressions les plus simplifiées de X et Y.</li></ol>' +
      tt({ vars: ['A', 'B', 'C', 'D'], cols: { X: [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0], Y: [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1] } }),
    hints: ['(~A + B + C).(~A + ~B) = ~A + (B + C).~B = ~A + ~B.C.', 'X : la colonne CD = 00 et la colonne CD = 10 sont pleines.'],
    solution: [
      { t: 'S1', html: calc([['(~A + (B + C).~B).(B + ~C)', 'distributivité du OU'], ['(~A + ~B.C).(B + ~C)', 'B.~B = 0'], ['~A.B + ~A.~C + ~B.B.C + ~B.C.~C', 'développement'], ['~A.B + ~A.~C', '']]) + tt({ vars: ['A', 'B', 'C'], exprs: ['~A.B + ~A.~C'], names: ['S1'] }) },
      { t: 'X', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [0, 2, 3, 4, 6, 8, 10, 11, 12, 14], name: 'X' }) },
      { t: 'Y', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [0, 2, 3, 6, 8, 10, 14, 15], name: 'Y' }) }],
    answer: '<div class="calc res"><div><span>' + bx('S1 = ~A.B + ~A.~C') + '</span></div><div><span>' + bx('S1 = ~A.B.C + ~A.B.~C + ~A.~B.~C') + '</span></div><div><span>' + bx('S1 = (A + B + ~C).(~A + B + C).(~A + B + ~C).(~A + ~B + C).(~A + ~B + ~C)') + '</span></div><div><span>' + bx('X = ~D + ~B.C') + '</span></div><div><span>' + bx('Y = ~B.~D + C.~D + A.B.C + ~A.~B.C') + '</span></div></div>',
    traps: T_KM, grading: '5 points.', official: true, note: OFF + ' Sujet et corrigé en anglais.'
  });

  add({
    id: 'r2017-ex4', exam: 'r2017', kind: 'partiel', order: 4, src: 'Rattrapage 2017-2018 · Ex 4', title: 'Deux tableaux de Karnaugh à 4 variables', pts: 2,
    topics: ['karnaugh', 'xor'], lvl: 2, time: 8,
    intro: p('Remplissez les tableaux de Karnaugh (lignes AB, colonnes CD, cercles compris) et donnez les expressions les plus simplifiées de X et Y. Aucun point ne sera attribué à une expression si son tableau est faux.') +
      tt({ vars: ['A', 'B', 'C', 'D'], cols: { X: [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1], Y: [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1] } }),
    hints: H_KM.slice(1),
    solution: [
      { t: 'X', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [0, 2, 3, 4, 6, 8, 10, 14, 15], name: 'X', xor: '~B.~D + ~A.~D + C.~(A ^ B)' }) },
      { t: 'Y', html: km({ vars: ['A', 'B', 'C', 'D'], rows: 2, ones: [0, 2, 6, 7, 8, 10, 14, 15], name: 'Y' }) }],
    answer: '<div class="calc res"><div><span>' + bx('X = ~B.~D + ~A.~D + ~A.~B.C + A.B.C') + '</span></div><div><span>' + bx('X = ~B.~D + ~A.~D + C.~(A ^ B)') + '</span><span class="why-r">avec OU exclusif</span></div><div><span>' + bx('Y = ~B.~D + B.C') + '</span></div></div>',
    traps: T_KM.concat(['Le corrigé officiel écrit « Y = B̄.D̄ – B.C » : c’est une coquille, il faut un +.']),
    grading: '2 points.', official: true, note: OFF + ' Coquille du corrigé relevée (« – » pour « + »).'
  });
})();
