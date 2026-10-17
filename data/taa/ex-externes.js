/* TAA — exercices pris hors des annales Past-Exams : le partiel de janvier 2018 (HyperAnnales, corrigé officiel)
   et des exercices du cours en ligne de Krisboul, du Moodle ou construits sur le cours. Corrigés et vérifiés.
   Même format que data/taa/ex-annales.js (voir taa/entrainement.html). */
(function () {
  var X = window.TAA_EX = window.TAA_EX || [];

  /* ---------- petites aides ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  /* terme en ligne, échappé ; <wbr> après une parenthèse suivie d’un appel imbriqué (« sommet(<wbr>dépiler(… ») :
     un long terme peut passer à la ligne sur mobile, un appel court comme bornesup(v) ne se coupe pas */
  function c(s) { return '<code>' + esc(s).replace(/\((?=[^\s(),]+\()/g, '(<wbr>') + '</code>'; }
  function L() { return Array.prototype.slice.call(arguments).join('\n'); }   /* lignes d’une spécification */
  function ol(items) { return '<ol>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  /* tableau ; l’enveloppe « width:0;min-width:100% » empêche un tableau large d’élargir la carte (il défile dans .tbl) */
  function table(head, rows) {
    return '<div style="width:0;min-width:100%"><div class="tbl"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + x + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div></div>';
  }

  /* ---------- types du cours (notation du site) ---------- */
  var VECTEUR = L('types', '    vecteur', 'utilise', '    entier, booléen, élément', 'opérations',
    '             vect : entier × entier → vecteur',
    '        modifième : vecteur × entier × élément → vecteur',
    '             ième : vecteur × entier → élément',
    '    estinitialisé : vecteur × entier → booléen',
    '         bornesup : vecteur → entier',
    '         borneinf : vecteur → entier',
    'préconditions',
    '    ième(v, i) est-défini-ssi borneinf(v) ≤ i ≤ bornesup(v)',
    '                              & estinitialisé(v, i) = vrai',
    'axiomes',
    '    borneinf(v) ≤ i ≤ bornesup(v) ⇒ ième(modifième(v, i, e), i) = e',
    '    borneinf(v) ≤ i ≤ bornesup(v) & borneinf(v) ≤ j ≤ bornesup(v) & i ≠ j',
    '                ⇒ ième(modifième(v, i, e), j) = ième(v, j)',
    '    estinitialisé(vect(i, j), k) = Faux',
    '    borneinf(v) ≤ i ≤ bornesup(v) ⇒ estinitialisé(modifième(v, i, e), i) = Vrai',
    '    borneinf(v) ≤ i ≤ bornesup(v) & borneinf(v) ≤ j ≤ bornesup(v) & i ≠ j',
    '                ⇒ estinitialisé(modifième(v, i, e), j) = estinitialisé(v, j)',
    '    borneinf(vect(i, j)) = i',
    '    borneinf(modifième(v, i, e)) = borneinf(v)',
    '    bornesup(vect(i, j)) = j',
    '    bornesup(modifième(v, i, e)) = bornesup(v)',
    'avec', '    vecteur v', '    entier i, j, k', '    élément e');

  var LREC = L('types', '    liste, place', 'utilise', '    élément', 'opérations',
    '    listevide : → liste',
    '         cons : élément × liste → liste',
    '          fin : liste → liste',
    '         tête : liste → place',
    '      contenu : place → élément',
    '      premier : liste → élément',
    '         succ : place → place',
    'préconditions',
    '    fin(λ) est-défini-ssi λ ≠ listevide',
    '    tête(λ) est-défini-ssi λ ≠ listevide',
    '    premier(λ) est-défini-ssi λ ≠ listevide',
    'axiomes',
    '    premier(λ) = contenu(tête(λ))',
    '    fin(cons(e, λ)) = λ',
    '    premier(cons(e, λ)) = e',
    '    succ(tête(λ)) = tête(fin(λ))',
    'avec', '    liste λ', '    élément e');

  var PILE = L('types', '    pile', 'utilise', '    booléen, élément', 'opérations',
    '    pilevide : → pile',
    '     empiler : pile × élément → pile',
    '     dépiler : pile → pile',
    '      sommet : pile → élément',
    '     estvide : pile → booléen',
    'préconditions',
    '    dépiler(p) est-défini-ssi estvide(p) = Faux',
    '    sommet(p) est-défini-ssi estvide(p) = Faux',
    'axiomes',
    '    dépiler(empiler(p, e)) = p',
    '    sommet(empiler(p, e)) = e',
    '    estvide(pilevide) = Vrai',
    '    estvide(empiler(p, e)) = Faux',
    'avec', '    pile p', '    élément e');

  var FILE = L('types', '    file', 'utilise', '    booléen, élément', 'opérations',
    '    filevide : → file',
    '     enfiler : file × élément → file',
    '     défiler : file → file',
    '     premier : file → élément',
    '     estvide : file → booléen',
    'préconditions',
    '    défiler(f) est-défini-ssi estvide(f) = Faux',
    '    premier(f) est-défini-ssi estvide(f) = Faux',
    'axiomes',
    '    estvide(f) = Vrai ⇒ premier(enfiler(f, e)) = e',
    '    estvide(f) = Faux ⇒ premier(enfiler(f, e)) = premier(f)',
    '    estvide(f) = Vrai ⇒ défiler(enfiler(f, e)) = filevide',
    '    estvide(f) = Faux ⇒ défiler(enfiler(f, e)) = enfiler(défiler(f), e)',
    '    estvide(filevide) = Vrai',
    '    estvide(enfiler(f, e)) = Faux',
    'avec', '    file f', '    élément e');

  var ENSEMBLE = L('types', '    ensemble', 'utilise', '    élément, booléen, entier', 'opérations',
    '    ensemblevide : → ensemble',
    '         ajouter : élément × ensemble → ensemble',
    '       supprimer : élément × ensemble → ensemble',
    '           _ ∈ _ : élément × ensemble → booléen',
    '            card : ensemble → entier',
    'axiomes',
    '    x ∈ ensemblevide = faux',
    '    x = y ⇒ (x ∈ ajouter(y, e)) = vrai',
    '    x ≠ y ⇒ (x ∈ ajouter(y, e)) = (x ∈ e)',
    '    x = y ⇒ (x ∈ supprimer(y, e)) = faux',
    '    x ≠ y ⇒ (x ∈ supprimer(y, e)) = (x ∈ e)',
    '    card(ensemblevide) = 0',
    '    x ∈ e = vrai ⇒ card(ajouter(x, e)) = card(e)',
    '    x ∈ e = faux ⇒ card(ajouter(x, e)) = card(e) + 1',
    '    x ∈ e = vrai ⇒ card(supprimer(x, e)) = card(e) − 1',
    '    x ∈ e = faux ⇒ card(supprimer(x, e)) = card(e)',
    'avec', '    ensemble e', '    élément x, y');

  var MULTI = L('types', '    multiensemble', 'utilise', '    élément, booléen, entier', 'opérations',
    '    multiensemblevide : → multiensemble',
    '              ajouter : élément × multiensemble → multiensemble',
    '            supprimer : élément × multiensemble → multiensemble',
    '                _ ∈ _ : élément × multiensemble → booléen',
    '                 card : multiensemble → entier',
    '        nboccurrences : élément × multiensemble → entier',
    'axiomes',
    '    (x ∈ multiensemblevide) = faux',
    '    x = y ⇒ (x ∈ ajouter(y, me)) = vrai',
    '    x ≠ y ⇒ (x ∈ ajouter(y, me)) = (x ∈ me)',
    '    nboccurrences(x, me) ≤ 1 ⇒ (x ∈ supprimer(x, me)) = faux',
    '    x ≠ y ⇒ (x ∈ supprimer(y, me)) = (x ∈ me)',
    '',
    '    card(multiensemblevide) = 0',
    '    card(ajouter(x, me)) = card(me) + 1',
    '    x ∈ me = vrai ⇒ card(supprimer(x, me)) = card(me) − 1',
    '    x ∈ me = faux ⇒ card(supprimer(x, me)) = card(me)',
    '',
    '    nboccurrences(x, multiensemblevide) = 0',
    '    x = y ⇒ nboccurrences(x, ajouter(y, me)) = nboccurrences(x, me) + 1',
    '    x ≠ y ⇒ nboccurrences(x, ajouter(y, me)) = nboccurrences(x, me)',
    '    nboccurrences(x, me) = 0 ⇒ nboccurrences(x, supprimer(x, me)) = 0',
    '    nboccurrences(x, me) ≥ 1 ⇒',
    '            nboccurrences(x, supprimer(x, me)) = nboccurrences(x, me) − 1',
    '    x ≠ y ⇒ nboccurrences(x, supprimer(y, me)) = nboccurrences(x, me)',
    'avec', '    multiensemble me', '    élément x, y');

  /* =====================================================================
     Partiel n° 1 du 9 janvier 2018 (promo 2022), absent de Past-Exams
     ===================================================================== */
  var ORDRES = ['A B C D E F', 'B D E F A C', 'D E C B F A', 'F E D C B A'];
  function ord(o) { return c(o.replace(/ /g, '\u00a0')); }   /* un ordre de sortie ne se coupe pas en fin de ligne */
  var OK = '<b>✓</b>';
  X.push({ id: 'hyp-2018-p1-ex1', exam: null, kind: 'archive', order: 1, src: 'Partiel de janvier 2018 · Ex 1',
    title: 'Pile ou file ?', pts: 2, topics: ['piles', 'files'], lvl: 1, time: 8,
    intro: '<p>Partiel n° 1 d’algorithmique du 9 janvier 2018 (promo 2022). Ce sujet n’est pas dans les annales Past-Exams : il vient d’HyperAnnales, avec son corrigé officiel.</p>' +
      '<p><b>Exercice 1 (Pile ou file ? – 2 points)</b></p>' +
      '<p>On ajoute, dans cet ordre, les valeurs A, B, C, D, E et F à une structure linéaire vide. Pour chacun des ordres de sortie donnés sur les feuilles de réponses, indiquer si la structure en question peut être : une pile, une file (ce peut être les deux), ou aucune des deux (ni une pile, ni une file).</p>' +
      table(['Ordre de sortie', 'pile', 'file', 'aucune'], ORDRES.map(function (o) { return [ord(o), '', '', '']; })),
    questions: ['Pour chacun des quatre ordres de sortie, coche pile, file ou aucune, comme sur la feuille de réponses.'],
    hints: [
      'Une file (FIFO) rend les éléments dans l’ordre où ils sont entrés. Un seul des quatre ordres convient à une file.',
      'Pour une pile (LIFO), simule : empile A, B, C… jusqu’à avoir au sommet la lettre à sortir, puis dépile-la. Tu peux dépiler entre deux empilements.',
      'Si la lettre à sortir est déjà dans la pile mais pas au sommet, l’ordre est impossible pour une pile.'
    ],
    solution: [
      { t: 'La file', html: '<p>Une file rend toujours les éléments dans leur ordre d’entrée. La seule sortie possible est ' + ord('A B C D E F') + ' : les trois autres ordres ne sont pas des files.</p>' },
      { t: 'A B C D E F', html: '<p>Empiler A, dépiler A, empiler B, dépiler B, et ainsi de suite : une pile le permet. C’est aussi l’ordre de la file. On coche <b>pile et file</b>.</p>' },
      { t: 'B D E F A C', html: '<p>Empiler A et B, dépiler B. Empiler C et D, dépiler D. Empiler E, dépiler E. Empiler F, dépiler F. Il faut maintenant sortir A, mais le sommet est C (A est dessous) : impossible. Ni pile ni file : <b>aucune</b>.</p>' },
      { t: 'D E C B F A', html: '<p>Empiler A, B, C et D, dépiler D. Empiler E, dépiler E. Dépiler C, puis B. Empiler F, dépiler F. Dépiler A. Tout passe : <b>pile</b>.</p>' },
      { t: 'F E D C B A', html: '<p>Tout empiler, puis tout dépiler : l’ordre est renversé. <b>Pile</b>.</p>' },
      { t: 'Règle rapide', html: '<p>Trois lettres entrées dans l’ordre x, y, z ne peuvent pas sortir d’une pile dans l’ordre z, x, y. Dans ' + ord('B D E F A C') + ', D sort avant A, et A avant C : c’est ce motif. Sur les 720 ordres possibles de A à F, 132 sont réalisables par une pile, un seul par une file.</p>' }
    ],
    answer: { html: '<ul style="margin:0;padding-left:1.2rem"><li>' + ord(ORDRES[0]) + ' : pile ' + OK + ' et file ' + OK + '</li><li>' + ord(ORDRES[1]) + ' : aucune ' + OK + '</li><li>' +
      ord(ORDRES[2]) + ' : pile ' + OK + '</li><li>' + ord(ORDRES[3]) + ' : pile ' + OK + '</li></ul>' },
    traps: [
      ord('A B C D E F') + ' : coche les deux colonnes, pile et file.',
      'Une pile ne fait pas que renverser l’ordre : on peut dépiler entre deux empilements (' + ord('D E C B F A') + ').',
      'Une file ne change jamais l’ordre.'
    ],
    grading: '2 points pour l’exercice ; le corrigé ne détaille pas par ligne.',
    official: true });

  /* =====================================================================
     Exercices de cours : cours en ligne (Krisboul), Moodle, construits
     ===================================================================== */

  /* ---------- Booléen ---------- */
  X.push({ id: 'kb-booleen', exam: null, kind: 'cours', order: 1, src: 'Exercice d’application du Moodle',
    title: 'Les axiomes du type Booléen', topics: ['axiomes', 'autres'], lvl: 1, time: 10,
    intro: '<p>Exercice d’application du Moodle (1<sup>er</sup> octobre), dont la correction était annoncée « ultérieurement ». Le cours en ligne de Krisboul donne la même signature, sans les axiomes.</p>',
    specs: [{ code: L('types', '    booléen', 'opérations',
      '      vrai : → booléen',
      '      faux : → booléen',
      '       non : booléen → booléen',
      '    _ et _ : booléen × booléen → booléen',
      '    _ ou _ : booléen × booléen → booléen'),
      cap: 'Le caractère _ marque la place d’un argument : on écrit ' + c('b1 et b2') + ', ' + c('b1 ou b2') + '.' }],
    questions: [
      '1. Classe les opérations : constantes, opérations internes, observateurs. Y a-t-il des préconditions ?',
      '2. Écris les axiomes de ' + c('non') + ', ' + c('_ et _') + ' et ' + c('_ ou _') + '.',
      '3. Calcule ' + c('non((vrai et faux) ou non(faux))') + ' avec tes seuls axiomes.'
    ],
    hints: [
      'Ici, ' + c('booléen') + ' est le type défini. Regarde le type du résultat de chaque opération.',
      'Toute valeur booléenne s’écrit ' + c('vrai') + ' ou ' + c('faux') + '. Décris chaque opération sur ces deux constantes.',
      'Pour ' + c('_ et _') + ' et ' + c('_ ou _') + ', pas besoin des quatre combinaisons : fais un cas sur le premier argument et garde le second comme variable ' + c('b') + '.'
    ],
    solution: [
      { t: 'Classer les opérations', html: '<p>' + c('booléen') + ' est le seul type, listé dans ' + c('types') + ' : c’est le type défini. ' + c('vrai') + ' et ' + c('faux') + ' n’ont aucun argument : ce sont des <b>constantes</b>. Elles retournent un type défini (booléen) : ce sont donc aussi des opérations internes, sans argument.</p>' +
        '<p>' + c('non') + ', ' + c('_ et _') + ' et ' + c('_ ou _') + ' retournent un booléen : opérations internes. Aucune opération ne retourne un type prédéfini : il n’y a pas d’observateur. Toutes sont définies partout : <b>aucune précondition</b>.</p>' },
      { t: 'Méthode', html: '<p>Sans observateur à appliquer, on décrit chaque opération interne sur les deux valeurs possibles, ' + c('vrai') + ' et ' + c('faux') + '.</p>' },
      { t: 'non', html: '<p>Deux cas : ' + c('non(vrai) = faux') + ' et ' + c('non(faux) = vrai') + '.</p>' },
      { t: 'et, ou', html: '<p>Cas sur le premier argument. ' + c('vrai et b') + ' vaut ce que vaut ' + c('b') + ' ; ' + c('faux et b') + ' vaut ' + c('faux') + ', quel que soit b. Pour ou, c’est l’inverse : ' + c('vrai ou b = vrai') + ' et ' + c('faux ou b = b') + '.</p>' +
        '<p>Variante sans variable : les dix lignes des tables de vérité (2 pour non, 4 pour et, 4 pour ou). Elle est juste aussi, mais plus longue.</p>' },
      { t: 'Le calcul de la question 3', html: ol([
        c('non((vrai et faux) ou non(faux))'),
        c('= non((vrai et faux) ou vrai)') + ' : ' + c('non(faux) = vrai'),
        c('= non(faux ou vrai)') + ' : ' + c('vrai et b = b') + ', avec b = faux',
        c('= non(vrai)') + ' : ' + c('faux ou b = b') + ', avec b = vrai',
        c('= faux') + ' : ' + c('non(vrai) = faux')]) }
    ],
    answer: { html: '<p>1. ' + c('vrai') + ' et ' + c('faux') + ' : constantes (elles retournent le type défini, booléen). ' + c('non') + ', ' + c('_ et _') + ', ' + c('_ ou _') + ' : opérations internes. Pas d’observateur, pas de précondition.</p><p>2. Les axiomes ci-dessous. 3. ' + c('faux') + '.</p>',
      spec: L('axiomes', '    non(vrai) = faux', '    non(faux) = vrai', '    vrai et b = b', '    faux et b = faux', '    vrai ou b = vrai', '    faux ou b = b', 'avec', '    booléen b') },
    traps: [
      c('vrai et b = b') + ', pas ' + c('= vrai') + ' ; ' + c('faux ou b = b') + ', pas ' + c('= faux') + '.',
      'N’ajoute pas d’axiome faux « en plus », comme ' + c('b et vrai = vrai') + ' : il contredirait ' + c('faux et vrai = faux') + ' (consistance).',
      'N’oublie pas ' + c('non(faux) = vrai') + '.',
      'Une constante retourne un type <b>défini</b> : ici, ' + c('vrai : → booléen') + ' dans le type booléen lui-même. Au partiel 2023, la réponse « prédéfini » a eu 0.',
      'Avec le profil ' + c('et : booléen × booléen → booléen') + ' du cours en ligne, on écrit ' + c('et(vrai, b)') + ' ; avec ' + c('_ et _') + ', on écrit ' + c('vrai et b') + '.'
    ],
    official: false, note: 'Pas de corrigé officiel (le Moodle l’annonçait « ultérieurement ») : correction rédigée et vérifiée sur toutes les tables de vérité.' });

  /* ---------- Vecteur (1) ---------- */
  X.push({ id: 'kb-vecteur-a', exam: null, kind: 'cours', order: 2, src: 'Exercice construit sur le cours',
    title: 'Le type Vecteur : classer les opérations, calculer', topics: ['hierarchie', 'precond', 'autres'], lvl: 1, time: 12,
    intro: '<p>Le type Vecteur du cours en ligne de Krisboul, repris en annexe du Moodle. Un vecteur a deux bornes et des cases que l’on remplit une à une avec ' + c('modifième') + '.</p>',
    specs: [{ code: VECTEUR, cap: 'Le type Vecteur du cours, notation du site.' }],
    questions: [
      '1. Donne le type défini et les types prédéfinis, puis classe chaque opération : opération interne ou observateur.',
      '2. Quelle opération est partielle ? Laquelle est une opération auxiliaire, et pourquoi le cours l’a-t-il ajoutée ?',
      '3. Avec ' + c('v = modifième(modifième(vect(1, 3), 2, a), 2, b)') + ', calcule ' + c('ième(v, 2)') + ', ' + c('estinitialisé(v, 1)') + ', ' + c('ième(v, 1)') + ', ' + c('borneinf(v)') + ' et ' + c('bornesup(v)') + '.'
    ],
    hints: [
      'Défini : listé dans ' + c('types') + '. Prédéfini : listé dans ' + c('utilise') + '. Interne : résultat de type défini. Observateur : au moins un argument de type défini et un résultat de type prédéfini.',
      'Une opération partielle a une précondition. Regarde quelle opération sert à écrire cette précondition.',
      'Lis ' + c('v') + ' de l’intérieur vers l’extérieur. À chaque étape, vérifie la condition de l’axiome (i entre les bornes, ' + c('i = j') + ' ou ' + c('i ≠ j') + '). Pour ' + c('ième') + ', vérifie d’abord la précondition.'
    ],
    solution: [
      { t: 'Les types', html: '<p>' + c('vecteur') + ' est dans ' + c('types') + ' : type défini. ' + c('entier') + ', ' + c('booléen') + ' et ' + c('élément') + ' sont dans ' + c('utilise') + ' : types prédéfinis.</p>' },
      { t: 'Les opérations', html: table(['Opération', 'Résultat et rôle'], [
          [c('vect'), 'vecteur : opération interne. Aucun argument de type défini : elle crée le vecteur à partir de ses bornes.'],
          [c('modifième'), 'vecteur : opération interne.'],
          [c('ième'), 'élément : observateur.'],
          [c('estinitialisé'), 'booléen : observateur.'],
          [c('borneinf') + '<br>' + c('bornesup'), 'entier : observateurs.']]) +
        '<p>Le cours le dit ainsi : « vecteur est un type défini, entier et élément sont des types prédéfinis ce qui fait de modifième une opération interne et de ième, borneinf et bornesup des observateurs ».</p>' },
      { t: 'Partielle et auxiliaire', html: '<p>' + c('ième') + ' est la seule opération partielle : on ne lit ni une case hors des bornes, ni une case jamais remplie. Pour écrire sa précondition, il faut savoir si une case a été remplie : c’est le rôle de ' + c('estinitialisé') + '.</p>' +
        '<p>Une opération qui sert à spécifier le domaine de définition d’une autre est une <b>opération auxiliaire</b>. Le cours : « nous avons donc dû rajouter une opération auxiliaire estinitialisé dont le seul but est de permettre l’écriture d’une précondition sur ième ».</p>' },
      { t: 'Les bornes', html: '<p>Pose ' + c('v1 = modifième(vect(1, 3), 2, a)') + ', donc ' + c('v = modifième(v1, 2, b)') + '. Les axiomes des bornes n’ont pas de condition : ' + c('borneinf(v) = borneinf(v1) = borneinf(vect(1, 3)) = 1') + '. De même, ' + c('bornesup(v) = 3') + '.</p>' },
      { t: 'ième(v, 2)', html: '<p>Précondition : 1 ≤ 2 ≤ 3, et ' + c('estinitialisé(v, 2) = Vrai') + ' (axiome de la case modifiée, 2 est entre les bornes de v1). Puis ' + c('ième(modifième(v1, 2, b), 2) = b') + ' : premier axiome, même case. La seconde écriture dans la case 2 a remplacé a.</p>' },
      { t: 'estinitialisé(v, 1) et ième(v, 1)', html: '<p>' + c('estinitialisé(modifième(v1, 2, b), 1)') + ' : i = 2, j = 1, tous deux entre les bornes, i ≠ j. Donc ' + c('= estinitialisé(v1, 1)') + '. Même axiome : ' + c('= estinitialisé(vect(1, 3), 1) = Faux') + '.</p>' +
        '<p>La précondition de ' + c('ième(v, 1)') + ' demande ' + c('estinitialisé(v, 1) = vrai') + ' : elle est fausse. ' + c('ième(v, 1)') + ' n’est <b>pas défini</b>.</p>' },
      { t: 'Une coquille de la source', html: '<p>Sur la page du cours en ligne, l’axiome du cas i ≠ j de estinitialisé se termine par ' + c('init(v, j)') + ' : lis ' + c('estinitialisé(v, j)') + '.</p>' }
    ],
    answer: { html: '<p>Défini : vecteur. Prédéfinis : entier, booléen, élément. Opérations internes : ' + c('vect') + ', ' + c('modifième') + '. Observateurs : ' + c('ième') + ', ' + c('estinitialisé') + ', ' + c('borneinf') + ', ' + c('bornesup') + '.</p>' +
      '<p>' + c('ième') + ' est partielle ; ' + c('estinitialisé') + ' est l’opération auxiliaire : elle sert à écrire la précondition de ième.</p>' +
      '<p>' + c('ième(v, 2) = b') + ' ; ' + c('estinitialisé(v, 1) = Faux') + ' ; ' + c('ième(v, 1)') + ' non défini ; ' + c('borneinf(v) = 1') + ' ; ' + c('bornesup(v) = 3') + '.</p>' },
    traps: [
      c('vect(1, 3)') + ' donne les <b>bornes</b> du vecteur, pas des valeurs de cases.',
      'Une case jamais remplie : ' + c('ième') + ' n’est pas défini. Ce n’est pas Faux : c’est ' + c('estinitialisé') + ' qui vaut Faux.',
      c('vect') + ' n’est pas une constante : elle a deux arguments (des entiers). C’est une opération interne.',
      'Les bornes ne changent jamais : ' + c('borneinf(modifième(v, i, e)) = borneinf(v)') + '.'
    ],
    official: false, note: 'Exercice construit sur le type du cours : le classement reprend les phrases du cours en ligne, les calculs sont rédigés et vérifiés.' });

  /* ---------- Vecteur (2) ---------- */
  X.push({ id: 'kb-vecteur-b', exam: null, kind: 'cours', order: 3, src: 'Exercice construit sur le cours',
    title: 'Le type Vecteur : deux cas sans axiome', topics: ['precond', 'axiomes', 'autres'], lvl: 3, time: 15,
    intro: '<p>On reprend le type Vecteur du cours (fiche précédente). La <b>complétude</b>, selon le cours : avoir écrit assez d’axiomes pour « pouvoir déduire une valeur pour toute application d’un observateur à une opération interne ».</p>' +
      '<p>Le partiel d’avril 2019 (groupe S1#) cherchait deux autres défauts dans ce type : voir la fiche <a href="#p2019d-ex1">p2019d-ex1</a>.</p>',
    specs: [{ code: VECTEUR, cap: 'Le type Vecteur du cours, notation du site.' }],
    questions: [
      '1. Soit ' + c('w = modifième(vect(1, 3), 5, a)') + ' : l’indice 5 est hors des bornes. Les axiomes donnent-ils une valeur à ' + c('estinitialisé(w, 5)') + ' ? à ' + c('estinitialisé(w, 2)') + ' ? Propose une correction.',
      '2. Soit ' + c('u = modifième(vect(1, 3), 2, a)') + '. Que vaut ' + c('estinitialisé(u, 7)') + ' d’après les axiomes ? Quelle valeur attends-tu ? Corrige l’axiome en cause.'
    ],
    hints: [
      'Pour chaque terme, cherche un axiome dont la partie gauche a la même forme et dont la condition (avant ⇒) est vraie.',
      'Écrire hors des bornes n’a pas de sens. Deux choix existent, comme pour ajouter et supprimer dans les ensembles : une précondition, ou une opération « sans effet ».',
      'Question 2 : regarde l’axiome du cas i ≠ j de estinitialisé. Quelle condition porte sur j ? Une case hors des bornes n’est jamais remplie.'
    ],
    solution: [
      { t: 'Question 1 : i hors des bornes', html: '<p>Les deux axiomes de ' + c('estinitialisé') + ' sur ' + c('modifième(v, i, e)') + ' demandent ' + c('borneinf(v) ≤ i ≤ bornesup(v)') + '. Ici v = vect(1, 3) et i = 5 : la condition est fausse. Aucun axiome ne donne ' + c('estinitialisé(w, 5)') + ' ni ' + c('estinitialisé(w, 2)') + '. ' + c('ième(w, 2)') + ' non plus : sa précondition passe par estinitialisé. Seules les bornes sont connues, car leurs axiomes n’ont pas de condition.</p>' +
        '<p>Il manque des axiomes, aucun ne se contredit : c’est un défaut de <b>complétude</b>.</p>' },
      { t: 'Le trou du cours', html: '<p>Dans le cours en ligne et l’annexe du Moodle, ' + c('modifième') + ' n’a pas de précondition, alors que les axiomes de estinitialisé et de ième ne couvrent que i entre les bornes.</p>' },
      { t: 'Correction : une précondition sur modifième', html: '<p>Écrire dans une case qui n’existe pas n’a pas de sens : on rend ' + c('modifième') + ' partielle. Un terme comme w n’est alors plus défini, il n’y a plus rien à calculer. Les conditions ' + c('borneinf(v) ≤ i ≤ bornesup(v)') + ' des axiomes deviennent redondantes ; tu peux les laisser.</p>' +
        '<p>Autre choix : déclarer modifième « sans effet » hors des bornes, comme le cours le fait pour ajouter et supprimer dans les ensembles. Il faut alors écrire des axiomes pour ce cas.</p>',
        spec: L('préconditions', '    modifième(v, i, e) est-défini-ssi borneinf(v) ≤ i ≤ bornesup(v)') },
      { t: 'Question 2 : j hors des bornes', html: '<p>Dans ' + c('estinitialisé(u, 7)') + ', i = 2 est entre les bornes, mais j = 7 ne l’est pas. L’axiome du cas i = j ne s’applique pas (7 ≠ 2). Celui du cas i ≠ j demande aussi ' + c('borneinf(v) ≤ j ≤ bornesup(v)') + ' : faux. Aucun axiome, alors qu’on attend Faux : la case 7 n’existe pas, elle n’est jamais remplie. La précondition sur modifième n’y change rien.</p>' +
        '<p>Correction : retirer la condition sur j de cet axiome. On remonte alors jusqu’à vect, dont l’axiome vaut pour tout k : ' + c('estinitialisé(u, 7) = estinitialisé(vect(1, 3), 7) = Faux') + '. L’axiome de ième peut garder sa condition sur j : hors des bornes, la précondition de ième exclut déjà le cas.</p>',
        spec: L('axiomes', '    borneinf(v) ≤ i ≤ bornesup(v) & i ≠ j', '                ⇒ estinitialisé(modifième(v, i, e), j) = estinitialisé(v, j)') }
    ],
    answer: { html: '<p>1. Aucun axiome ne s’applique : la condition ' + c('borneinf(v) ≤ i ≤ bornesup(v)') + ' est fausse. Défaut de complétude. Correction : une précondition sur modifième.</p>' +
      '<p>2. Aucun axiome non plus, alors qu’on attend Faux. Correction : retirer la condition sur j dans l’axiome du cas i ≠ j de estinitialisé.</p>',
      spec: L('préconditions',
        '    ième(v, i) est-défini-ssi borneinf(v) ≤ i ≤ bornesup(v)',
        '                              & estinitialisé(v, i) = vrai',
        '    modifième(v, i, e) est-défini-ssi borneinf(v) ≤ i ≤ bornesup(v)',
        'axiomes',
        '    …',
        '    borneinf(v) ≤ i ≤ bornesup(v) & i ≠ j',
        '                ⇒ estinitialisé(modifième(v, i, e), j) = estinitialisé(v, j)',
        '    …') },
    traps: [
      'Ne confonds pas les deux défauts : un terme sans axiome, c’est la <b>complétude</b> ; deux axiomes qui donnent deux valeurs différentes, c’est la <b>consistance</b>.',
      'Pas besoin d’axiome pour ' + c('ième(modifième(v, i, e), j)') + ' avec j hors des bornes : la précondition de ième exclut ce cas.',
      'Les bornes ont toujours une valeur : leurs axiomes n’ont pas de condition.'
    ],
    official: false, note: 'Exercice construit : le cours ne signale pas ces deux cas. Correction rédigée et vérifiée.' });

  /* ---------- Places ---------- */
  X.push({ id: 'kb-places', exam: null, kind: 'cours', order: 4, src: 'Exercice construit sur le cours',
    title: 'Places : avancer avec succ, lire avec contenu', topics: ['liste-rec', 'liste-iter'], lvl: 2, time: 10,
    intro: '<p>Une <b>place</b> est la case qui contient un élément. Dans la liste récursive, on y accède par ' + c('tête') + ', on avance avec ' + c('succ') + ' et on lit l’élément avec ' + c('contenu') + '. La question 3 vient de l’erratum du Moodle sur la vidéo des listes itératives.</p>',
    specs: [
      { code: LREC, cap: 'Le type liste récursive du cours.' },
      { code: L('préconditions', '    accès(λ, k) est-défini-ssi λ ≠ listevide & 1 ≤ k ≤ longueur(λ)', 'axiomes', '    contenu(accès(λ, k)) = ième(λ, k)', '    succ(accès(λ, k)) = accès(λ, k + 1)'),
        cap: 'Liste itérative : la précondition de accès et les deux axiomes des places.' },
      { code: L('p2 ← accès(li, 2)', 'e ← contenu(succ(p2))'), cap: 'L’utilisation de succ sur l’erratum du Moodle.' }
    ],
    questions: [
      '1. Avec ' + c('λ = cons(a, cons(b, cons(c, listevide)))') + ', calcule ' + c('contenu(succ(succ(tête(λ))))') + ' en citant l’axiome utilisé à chaque étape.',
      '2. Que vaut ' + c('succ(tête(cons(a, listevide)))') + ' ?',
      '3. Liste itérative. ' + c('li') + ' est la liste (éclair, soleil, nuage, lune). Que vaut ' + c('e') + ' après les deux lignes de l’erratum ? Justifie avec les axiomes.'
    ],
    hints: [
      'L’axiome ' + c('succ(tête(λ)) = tête(fin(λ))') + ' transforme « avancer d’une place » en « regarder la tête de la fin ».',
      'Pour lire une place ' + c('tête(…)') + ', lis l’axiome ' + c('premier(λ) = contenu(tête(λ))') + ' de droite à gauche.',
      'Dans la liste itérative, ' + c('succ') + ' fait passer du rang k au rang k + 1.'
    ],
    solution: [
      { t: 'Question 1 : avancer de deux places', html: ol([
        c('succ(tête(λ)) = tête(fin(λ))') + ' (axiome de succ) ' + c('= tête(cons(b, cons(c, listevide)))') + ' (' + c('fin(cons(e, λ)) = λ') + ').',
        c('succ(tête(cons(b, cons(c, listevide)))) = tête(fin(cons(b, cons(c, listevide)))) = tête(cons(c, listevide))') + ' (mêmes axiomes).',
        c('contenu(tête(cons(c, listevide))) = premier(cons(c, listevide))') + ' (' + c('premier(λ) = contenu(tête(λ))') + ', lu de droite à gauche) ' + c('= c') + ' (' + c('premier(cons(e, λ)) = e') + ').']) +
        '<p>Deux places après la tête : le 3<sup>e</sup> élément, ' + c('c') + '.</p>' },
      { t: 'Question 2 : après la dernière place', html: '<p>' + c('succ(tête(cons(a, listevide))) = tête(fin(cons(a, listevide))) = tête(listevide)') + '. Or ' + c('tête(λ)') + ' n’est défini que si ' + c('λ ≠ listevide') + ' : le terme n’est <b>pas défini</b>. Il n’y a pas de place après la dernière.</p>' },
      { t: 'Question 3 : succ dans la liste itérative', html: '<p>' + c('e = contenu(succ(accès(li, 2))) = contenu(accès(li, 3))') + ' (' + c('succ(accès(λ, k)) = accès(λ, k + 1)') + ') ' + c('= ième(li, 3)') + ' (' + c('contenu(accès(λ, k)) = ième(λ, k)') + ') = nuage.</p>' +
        '<p>La précondition de accès est respectée : li n’est pas vide et 1 ≤ 3 ≤ 4. ' + c('p2') + ' est la place du soleil ; ' + c('succ(p2)') + ', celle du nuage.</p>' },
      { t: 'Une coquille de l’erratum', html: '<p>Sur l’image de l’erratum, la ligne s’écrit ' + c('e ← contenu ( succ( p2 ))))') + ' : les deux parenthèses en trop sont une coquille, lis ' + c('contenu(succ(p2))') + '.</p>' }
    ],
    answer: { html: '<p>1. ' + c('c') + ' : on avance de deux places depuis la tête. 2. Non défini : on arrive à ' + c('tête(listevide)') + '. 3. ' + c('e') + ' = nuage, le 3<sup>e</sup> élément de li.</p>' },
    traps: [
      c('contenu') + ' s’applique à une place, ' + c('premier') + ' à une liste : ' + c('contenu(λ)') + ' et ' + c('premier(tête(λ))') + ' ne veulent rien dire.',
      c('succ') + ' rend une place, pas un élément : c’est ' + c('contenu(succ(p2))') + ' qui vaut nuage.',
      'L’axiome ' + c('premier(λ) = contenu(tête(λ))') + ' s’utilise dans les deux sens.'
    ],
    official: false, note: 'Question 3 : réponse donnée par l’erratum du Moodle (le 3e élément). Questions 1 et 2 construites : correction rédigée et vérifiée.' });

  /* ---------- Opérations itératives écrites sur la liste récursive (1) ---------- */
  X.push({ id: 'kb-trad-a', exam: null, kind: 'cours', order: 5, src: 'Cours en ligne (Krisboul)',
    title: 'Liste récursive : longueur, ième et accès', topics: ['liste-rec', 'precond', 'axiomes'], lvl: 2, time: 15,
    intro: '<p>Le cours en ligne montre que la liste récursive et la liste itérative décrivent la même donnée : « seule la manière de s’en servir diffère ». Il donne ces correspondances, écrit insérer avec les opérations récursives, puis ajoute : « La traduction des autres opérations est laissée en exercices. »</p>' +
      table(['Liste récursive', 'Liste itérative'], [[c('tête(l)'), c('accès(l, 1)')], [c('premier(l)'), c('ième(l, 1)')], [c('fin(l)'), c('supprimer(l, 1)')], [c('cons(e, l)'), c('insérer(l, 1, e)')]]) +
      '<p>On ajoute à la liste récursive trois opérations de la liste itérative.</p>',
    specs: [
      { code: LREC, cap: 'Le type liste récursive du cours.' },
      { code: L('utilise', '    élément, entier', 'opérations', '    longueur : liste → entier', '        ième : liste × entier → élément', '       accès : liste × entier → place'),
        cap: 'Les trois opérations à ajouter. La liste récursive n’utilisait pas entier : on l’ajoute.' }
    ],
    questions: [
      '1. Lesquelles de ces opérations sont partielles ? Écris leurs préconditions.',
      '2. Écris les axiomes de ' + c('longueur') + ', ' + c('ième') + ' et ' + c('accès') + ' avec les opérations de la liste récursive (listevide, cons, tête, succ…).'
    ],
    hints: [
      'Une liste récursive est soit ' + c('listevide') + ', soit ' + c('cons(e, λ)') + ' : écris un axiome par forme.',
      'Pour ' + c('ième(cons(e, λ), i)') + ', distingue i = 1 (c’est e) et i ≥ 2 : on cherche alors dans λ, au rang i − 1.',
      'Pour ' + c('accès') + ', pars de la correspondance ' + c('tête(l) ⇔ accès(l, 1)') + ', puis avance avec ' + c('succ') + '.'
    ],
    solution: [
      { t: 'Préconditions', html: '<p>' + c('longueur') + ' a un sens pour toute liste : la liste vide a 0 élément. ' + c('ième') + ' et ' + c('accès') + ' n’ont de sens que pour un rang qui existe, de 1 à la longueur. Comme ' + c('longueur(λ) ≥ 1') + ' entraîne ' + c('λ ≠ listevide') + ', la condition sur le rang suffit ; écrire aussi ' + c('λ ≠ listevide &') + ', comme le cours pour accès, est juste.</p>',
        spec: L('préconditions', '    ième(λ, i) est-défini-ssi 1 ≤ i ≤ longueur(λ)', '    accès(λ, i) est-défini-ssi 1 ≤ i ≤ longueur(λ)') },
      { t: 'longueur', html: '<p>Un axiome par forme de liste : la liste vide a 0 élément, ' + c('cons') + ' en ajoute un.</p>',
        spec: L('axiomes', '    longueur(listevide) = 0', '    longueur(cons(e, λ)) = longueur(λ) + 1') },
      { t: 'ième', html: '<p>' + c('ième(listevide, i)') + ' est exclu par la précondition. Pour ' + c('cons(e, λ)') + ' : le rang 1 est e ; pour un rang i ≥ 2, l’élément est dans λ, un rang plus tôt. La borne ' + c('longueur(λ) + 1') + ' est la longueur de ' + c('cons(e, λ)') + '.</p>',
        spec: L('axiomes', '    ième(cons(e, λ), 1) = e', '    2 ≤ i ≤ longueur(λ) + 1 ⇒ ième(cons(e, λ), i) = ième(λ, i − 1)') },
      { t: 'accès', html: '<p>Le rang 1 est la tête. Pour le rang i, on part de la place du rang i − 1 et on avance d’une place : c’est l’axiome ' + c('succ(accès(l, k)) = accès(l, k + 1)') + ' de la liste itérative, lu dans l’autre sens.</p>',
        spec: L('axiomes', '    accès(λ, 1) = tête(λ)', '    2 ≤ i ≤ longueur(λ) ⇒ accès(λ, i) = succ(accès(λ, i − 1))') },
      { t: 'Vérifier sur un exemple', html: '<p>Avec ' + c('λ = cons(a, cons(b, listevide))') + ' : ' + c('ième(λ, 2) = ième(cons(b, listevide), 1) = b') + '. Et ' + c('contenu(accès(λ, 2)) = contenu(succ(tête(λ))) = contenu(tête(fin(λ))) = premier(cons(b, listevide)) = b') + ' : on retrouve ' + c('contenu(accès(l, k)) = ième(l, k)') + '.</p>' },
      { t: 'Deux remarques sur les sources', html: '<p>Dans le type liste itérative du cours, ' + c('ième') + ' est partielle mais n’a pas de précondition : la tienne en a une, comme il se doit. Sur la page du cours en ligne, le profil de cons est écrit ' + c('cons : liste x élément → liste') + ' alors que ses axiomes écrivent ' + c('cons(e, l)') + ' : retiens ' + c('cons : élément × liste → liste') + ', comme le Moodle et la fiche 02.</p>' }
    ],
    answer: { html: '<p>' + c('longueur') + ' est définie partout ; ' + c('ième') + ' et ' + c('accès') + ' sont partielles.</p>',
      spec: L('utilise', '    élément, entier', 'opérations', '    longueur : liste → entier', '        ième : liste × entier → élément', '       accès : liste × entier → place',
        'préconditions', '    ième(λ, i) est-défini-ssi 1 ≤ i ≤ longueur(λ)', '    accès(λ, i) est-défini-ssi 1 ≤ i ≤ longueur(λ)',
        'axiomes', '    longueur(listevide) = 0', '    longueur(cons(e, λ)) = longueur(λ) + 1',
        '    ième(cons(e, λ), 1) = e', '    2 ≤ i ≤ longueur(λ) + 1 ⇒ ième(cons(e, λ), i) = ième(λ, i − 1)',
        '    accès(λ, 1) = tête(λ)', '    2 ≤ i ≤ longueur(λ) ⇒ accès(λ, i) = succ(accès(λ, i − 1))',
        'avec', '    liste λ', '    entier i', '    élément e') },
    traps: [
      'Décalage des rangs : quand on passe sous le ' + c('cons') + ', le rang i devient i − 1.',
      c('accès') + ' rend une <b>place</b> (on lit son élément avec contenu), ' + c('ième') + ' rend un <b>élément</b>.',
      'Pas d’axiome pour ' + c('ième(listevide, i)') + ' : la précondition exclut ce cas.',
      'La liste récursive n’utilise pas ' + c('entier') + ' : ajoute-le dans ' + c('utilise') + '.'
    ],
    official: false, note: 'Exercice laissé au lecteur par le cours en ligne : correction rédigée et vérifiée.' });

  /* ---------- Opérations itératives écrites sur la liste récursive (2) ---------- */
  X.push({ id: 'kb-trad-b', exam: null, kind: 'cours', order: 6, src: 'Cours en ligne (Krisboul)',
    title: 'Liste récursive : supprimer et insérer', topics: ['liste-rec', 'precond', 'axiomes'], lvl: 3, time: 20,
    intro: '<p>Suite de la fiche précédente : on ajoute à la liste récursive les deux opérations internes de la liste itérative. Tu peux utiliser ' + c('longueur') + ', définie dans la fiche précédente.</p>' +
      '<p>Le cours en ligne écrit insérer sous forme d’algorithme : il met de côté les i − 1 premiers éléments dans une liste l2, ajoute e, puis les remet devant.</p>',
    specs: [
      { code: L('opérations', '    supprimer : liste × entier → liste', '      insérer : liste × entier × élément → liste'),
        cap: c('supprimer(λ, i)') + ' retire l’élément de rang i ; ' + c('insérer(λ, i, e)') + ' place e au rang i.' },
      { code: L('l2 ← listevide', '(i − 1) fois { l2 ← cons(premier(l), l2) ; l ← fin(l) }', 'l ← cons(e, l)', '(i − 1) fois { l ← cons(premier(l2), l) ; l2 ← fin(l2) }'),
        cap: 'L’algorithme d’insérer du cours en ligne.' }
    ],
    questions: [
      '1. Écris les préconditions de ' + c('supprimer') + ' et de ' + c('insérer') + '.',
      '2. Écris leurs axiomes avec ' + c('listevide') + ' et ' + c('cons') + ', sans boucle.',
      '3. Vérifie : calcule ' + c('insérer(cons(a, cons(b, listevide)), 3, c)') + ' et ' + c('supprimer(cons(a, cons(b, listevide)), 2)') + '.'
    ],
    hints: [
      c('insérer') + ' accepte un rang de plus que ' + c('supprimer') + ' : on peut ajouter en fin de liste.',
      'Rang 1 : utilise les correspondances ' + c('fin(l) ⇔ supprimer(l, 1)') + ' et ' + c('cons(e, l) ⇔ insérer(l, 1, e)') + '.',
      'Rang i ≥ 2 : le premier élément ne bouge pas. Garde-le en tête avec ' + c('cons') + ' et travaille sur le reste, au rang i − 1.'
    ],
    solution: [
      { t: 'Préconditions', html: '<p>On ne supprime qu’un élément qui existe : rang de 1 à ' + c('longueur(λ)') + '. On insère à un rang de 1 à ' + c('longueur(λ) + 1') + ' : le dernier ajoute en fin de liste, et la liste vide accepte le rang 1.</p>',
        spec: L('préconditions', '    supprimer(λ, i) est-défini-ssi 1 ≤ i ≤ longueur(λ)', '    insérer(λ, i, e) est-défini-ssi 1 ≤ i ≤ longueur(λ) + 1') },
      { t: 'supprimer', html: '<p>Rang 1 : on retire la tête, il reste λ. Rang i ≥ 2 : la tête reste, et on supprime dans λ au rang i − 1.</p>',
        spec: L('axiomes', '    supprimer(cons(e, λ), 1) = λ', '    2 ≤ i ≤ longueur(λ) + 1 ⇒', '                supprimer(cons(e, λ), i) = cons(e, supprimer(λ, i − 1))') },
      { t: 'insérer', html: '<p>Rang 1 : e passe devant, c’est ' + c('cons') + ' ; cet axiome vaut aussi pour la liste vide. Rang i ≥ 2 : la liste n’est pas vide, sa tête e2 reste en place et on insère dans le reste au rang i − 1. Ici λ est le reste : ' + c('longueur(λ) + 2') + ' est la longueur de la liste entière, plus 1.</p>',
        spec: L('axiomes', '    insérer(λ, 1, e) = cons(e, λ)', '    2 ≤ i ≤ longueur(λ) + 2 ⇒', '                insérer(cons(e2, λ), i, e) = cons(e2, insérer(λ, i − 1, e))') },
      { t: 'Les calculs de la question 3', html: ol([
        c('insérer(cons(a, cons(b, listevide)), 3, c)') + ' ' + c('= cons(a, insérer(cons(b, listevide), 2, c))') + ' ' + c('= cons(a, cons(b, insérer(listevide, 1, c)))') + ' ' + c('= cons(a, cons(b, cons(c, listevide)))') + '.',
        c('supprimer(cons(a, cons(b, listevide)), 2)') + ' ' + c('= cons(a, supprimer(cons(b, listevide), 1))') + ' ' + c('= cons(a, listevide)') + '.']) },
      { t: 'Lien avec l’algorithme du cours', html: '<p>L’algorithme fait la même chose en deux boucles : il met de côté les i − 1 premiers éléments, ajoute e, puis les remet. Les axiomes le disent sans boucle, un élément à la fois.</p>' }
    ],
    answer: { html: '<p>3. ' + c('cons(a, cons(b, cons(c, listevide)))') + ' et ' + c('cons(a, listevide)') + '.</p>',
      spec: L('préconditions', '    supprimer(λ, i) est-défini-ssi 1 ≤ i ≤ longueur(λ)', '    insérer(λ, i, e) est-défini-ssi 1 ≤ i ≤ longueur(λ) + 1',
        'axiomes', '    supprimer(cons(e, λ), 1) = λ', '    2 ≤ i ≤ longueur(λ) + 1 ⇒', '                supprimer(cons(e, λ), i) = cons(e, supprimer(λ, i − 1))',
        '    insérer(λ, 1, e) = cons(e, λ)', '    2 ≤ i ≤ longueur(λ) + 2 ⇒', '                insérer(cons(e2, λ), i, e) = cons(e2, insérer(λ, i − 1, e))',
        'avec', '    liste λ', '    entier i', '    élément e, e2') },
    traps: [
      c('insérer') + ' accepte i = longueur(λ) + 1 (ajout en fin) ; ' + c('supprimer') + ' non.',
      'Dans le cas i ≥ 2, garde la tête : ' + c('cons(e, supprimer(λ, i − 1))') + ', pas ' + c('supprimer(λ, i − 1)') + ' seul.',
      'Ordre des arguments : ' + c('cons(élément, liste)') + ', mais ' + c('insérer(liste, rang, élément)') + '.'
    ],
    official: false, note: 'Exercice laissé au lecteur par le cours en ligne : correction rédigée et vérifiée, y compris contre l’algorithme d’insérer du cours.' });

  /* ---------- Concaténer, liste itérative ---------- */
  X.push({ id: 'kb-concat', exam: null, kind: 'cours', order: 7, src: 'Cours en ligne (Krisboul)',
    title: 'Concaténer deux listes itératives', topics: ['liste-iter', 'axiomes'], lvl: 2, time: 12,
    intro: '<p>Extension du type liste dans le cours en ligne : « La concaténation de deux listes est l’opération qui permet de les rassembler en les mettant bout à bout. Les éléments de chacune conservent leur place d’origine au sein de leur propre liste, la deuxième liste étant accrochée à la suite de la première. »</p>' +
      '<p>Le cours demande les éventuelles préconditions et les axiomes « pour une liste itérative et pour une liste récursive ». La version récursive est tombée aux partiels de 2018, 2020 et 2023 (fiches <a href="#p2018-ex1">p2018-ex1</a> et <a href="#p2023-ex1b">p2023-ex1b</a>) : ici, tu fais la version itérative.</p>',
    specs: [{ code: L('opérations', '    concaténer : liste × liste → liste'),
      cap: 'Sur la liste itérative, on observe une liste avec ' + c('longueur : liste → entier') + ' et ' + c('ième : liste × entier → élément') + '.' }],
    questions: [
      '1. concaténer est-elle partielle ? Donne ses éventuelles préconditions.',
      '2. Écris ses axiomes pour la liste itérative : applique les observateurs ' + c('longueur') + ' et ' + c('ième') + ' à ' + c('concaténer(λ, λ2)') + '.',
      '3. Vérifie avec λ = {a, b} et λ2 = {c} : donne la longueur du résultat et son élément à chaque rang.'
    ],
    hints: [
      'Concaténer deux listes, même vides, a toujours un sens.',
      'Combien d’éléments a le résultat ? C’est l’axiome de longueur.',
      'Découpe les rangs du résultat en deux zones : ceux qui viennent de λ (1 à longueur(λ)), puis ceux qui viennent de λ2. Dans la seconde zone, le rang i du résultat est le rang ' + c('i − longueur(λ)') + ' de λ2.'
    ],
    solution: [
      { t: 'Préconditions', html: '<p>Aucune : concaténer est définie pour toutes les listes, vides comprises.</p>' },
      { t: 'longueur', html: '<p>Le résultat a les éléments des deux listes : ' + c('longueur(concaténer(λ, λ2)) = longueur(λ) + longueur(λ2)') + '.</p>' },
      { t: 'ième, zone par zone', html: '<p>Rangs 1 à longueur(λ) : les éléments de λ, à leur place. Rangs longueur(λ) + 1 à longueur(λ) + longueur(λ2) : les éléments de λ2, décalés de longueur(λ). Avec des bornes larges (≤), chaque rang du résultat est dans exactement une zone.</p>',
        spec: L('axiomes', '    1 ≤ i ≤ longueur(λ) ⇒ ième(concaténer(λ, λ2), i) = ième(λ, i)', '    longueur(λ) + 1 ≤ i ≤ longueur(λ) + longueur(λ2)', '                ⇒ ième(concaténer(λ, λ2), i) = ième(λ2, i − longueur(λ))') },
      { t: 'Question 3', html: '<p>Longueur : 2 + 1 = 3. Rangs 1 et 2, première zone : ' + c('ième(λ, 1) = a') + ', ' + c('ième(λ, 2) = b') + '. Rang 3, seconde zone (3 ≤ 3 ≤ 3) : ' + c('ième(λ2, 3 − 2) = c') + '. Le résultat est {a, b, c}.</p>' },
      { t: 'Les bornes du cours en ligne', html: '<p>Le cours en ligne écrit ces conditions avec des inégalités strictes (' + c('1 < i < longueur(l)') + ' et ' + c('longueur(l) + 1 < i < longueur(l) + longueur(l2)') + ') : les rangs 1, longueur(l), longueur(l) + 1 et longueur(l) + longueur(l2) n’ont alors aucun axiome (sur l’exemple, aucun des trois rangs), il faut ≤.</p>' },
      { t: 'Et sur la liste récursive ?', html: '<p>Pas d’observateur à appliquer : on fait un cas sur la forme de la première liste. ' + c('concaténer(listevide, λ2) = λ2') + ' et ' + c('concaténer(cons(e, λ), λ2) = cons(e, concaténer(λ, λ2))') + '. C’est la version que demandaient les partiels de 2018, 2020 et 2023.</p>' }
    ],
    answer: { html: '<p>Pas de précondition. Exemple : la concaténation de {a, b} et {c} est {a, b, c}.</p>',
      spec: L('opérations', '    concaténer : liste × liste → liste', 'préconditions', '    aucune', 'axiomes',
        '    longueur(concaténer(λ, λ2)) = longueur(λ) + longueur(λ2)',
        '    1 ≤ i ≤ longueur(λ) ⇒ ième(concaténer(λ, λ2), i) = ième(λ, i)',
        '    longueur(λ) + 1 ≤ i ≤ longueur(λ) + longueur(λ2)',
        '                ⇒ ième(concaténer(λ, λ2), i) = ième(λ2, i − longueur(λ))',
        'avec', '    liste λ, λ2', '    entier i') },
    traps: [
      'Oublier l’axiome de ' + c('longueur') + ' : sans lui, on ne sait pas combien de rangs a le résultat.',
      'Oublier le décalage : dans la seconde zone, on lit ' + c('ième(λ2, i − longueur(λ))') + ', pas ' + c('ième(λ2, i)') + '.',
      'Bornes strictes : avec &lt; au lieu de ≤, les rangs aux bords de chaque zone n’ont plus d’axiome.',
      'Inventer une précondition (' + c('λ ≠ listevide') + ') : il n’y en a pas.'
    ],
    official: false, note: 'Le cours en ligne donne une correction, mais avec des bornes strictes : correction rédigée d’après elle, bornes corrigées et vérifiées.' });

  /* ---------- Rechercher, liste itérative ---------- */
  X.push({ id: 'kb-recherche', exam: null, kind: 'cours', order: 8, src: 'Cours en ligne (Krisboul)',
    title: 'Rechercher dans une liste itérative', topics: ['liste-iter', 'precond', 'axiomes'], lvl: 3, time: 20,
    intro: '<p>Extension du type liste dans le cours en ligne : « La recherche consiste à trouver un élément dans une liste et à retourner sa place si celui-ci existe dans la liste. […] le problème est que la recherche n’est pas définie pour un élément non présent. Il faut donc une précondition sur la recherche que l’on décrira à l’aide d’une opération auxiliaire existe. »</p>' +
      '<p>La version récursive, avec ' + c('est-présent') + ', est tombée aux partiels de 2018 et 2020 : voir la fiche <a href="#p2018-ex1">p2018-ex1</a>. Ici, on travaille sur la liste itérative. Le cours donne pour elle :</p>',
    specs: [{ code: L('opérations', '    rechercher : élément × liste → place', '        existe : élément × liste → booléen',
      'préconditions', '    rechercher(e, λ) est-défini-ssi existe(e, λ) = vrai',
      'axiomes', '    existe(e, listevide) = faux', '    e = e2 ⇒ existe(e2, insérer(λ, i, e)) = vrai', '    e ≠ e2 ⇒ existe(e2, insérer(λ, i, e)) = existe(e2, λ)', '    existe(e, λ) = vrai ⇒ contenu(rechercher(e, λ)) = e',
      'avec', '    liste λ', '    entier i', '    élément e, e2'),
      cap: 'Les axiomes du cours en ligne pour la liste itérative, notation du site.' }],
    questions: [
      '1. Pourquoi ' + c('rechercher') + ' est-elle partielle, et pas ' + c('existe') + ' ? Comment le cours appelle-t-il une opération comme existe ?',
      '2. Calcule ' + c('existe(a, supprimer(insérer(listevide, 1, a), 1))') + ' avec ces axiomes. Que constates-tu ?',
      '3. Propose des axiomes qui donnent une valeur à existe pour toute liste itérative, en n’utilisant que les observateurs ' + c('longueur') + ' et ' + c('ième') + '.'
    ],
    hints: [
      'Une place n’existe que si l’élément est dans la liste. Une réponse vrai ou faux, elle, existe toujours.',
      'Une liste itérative se construit avec listevide, insérer et supprimer. Pour chacune de ces opérations, cherche un axiome de existe.',
      'Question 3 : parcours la liste rang par rang, comme une boucle. Ajoute une opération ' + c('existe-depuis(e, λ, i)') + ' qui dit si e apparaît entre le rang i et la fin.'
    ],
    solution: [
      { t: 'Partielle et auxiliaire', html: '<p>' + c('rechercher') + ' rend une place : si e n’est pas dans λ, il n’y a pas de place à rendre. Elle est partielle, et sa précondition demande ' + c('existe(e, λ) = vrai') + '. ' + c('existe') + ' répond vrai ou faux pour toute liste : elle est définie partout. existe sert à spécifier le domaine de définition de rechercher : c’est une <b>opération auxiliaire</b>.</p>' },
      { t: 'Question 2 : le cas de supprimer', html: '<p>Dans le cours en ligne, les axiomes de existe pour la liste itérative ne traitent que listevide et insérer, rien pour supprimer. Le terme ' + c('existe(a, supprimer(…))') + ' n’a donc aucun axiome, alors qu’on attend faux : la liste est vide. C’est un défaut de <b>complétude</b>.</p>' +
        '<p>Un axiome simple sur supprimer ne suffit pas : si l’élément retiré vaut e2, e2 peut encore être ailleurs dans la liste.</p>' },
      { t: 'Question 3 : une version complète', html: '<p>Dans une liste itérative, on lit les éléments par leur rang. On décrit donc existe avec longueur et ième, grâce à une opération de plus, ' + c('existe-depuis(e, λ, i)') + ' : e est-il dans λ entre le rang i et la fin ? Après le dernier rang, la réponse est faux. Au rang i, soit on trouve e (vrai), soit on continue au rang i + 1.</p>',
        spec: L('opérations', '    existe-depuis : élément × liste × entier → booléen',
          'préconditions', '    existe-depuis(e, λ, i) est-défini-ssi i ≥ 1',
          'axiomes', '    existe(e, λ) = existe-depuis(e, λ, 1)',
          '    i > longueur(λ) ⇒ existe-depuis(e, λ, i) = faux',
          '    1 ≤ i ≤ longueur(λ) & ième(λ, i) = e ⇒ existe-depuis(e, λ, i) = vrai',
          '    1 ≤ i ≤ longueur(λ) & ième(λ, i) ≠ e',
          '                ⇒ existe-depuis(e, λ, i) = existe-depuis(e, λ, i + 1)') },
      { t: 'Pourquoi ça marche', html: '<p>Ces axiomes valent pour toute liste, construite avec insérer ou avec supprimer : longueur et ième ont des axiomes pour les deux. Ceux du cours pour listevide et insérer restent vrais ; tu peux les garder. existe-depuis n’est pas une opération auxiliaire au sens du cours : elle ne sert pas à écrire une précondition, mais les axiomes de existe.</p>' },
      { t: 'Retour à la question 2', html: '<p>Avec λ = ' + c('supprimer(insérer(listevide, 1, a), 1)') + ' : ' + c('longueur(λ) = (0 + 1) − 1 = 0') + '. Puis ' + c('existe(a, λ) = existe-depuis(a, λ, 1)') + ', et 1 > 0 donne ' + c('faux') + '.</p>' },
      { t: 'Ce que dit l’axiome de rechercher', html: '<p>' + c('contenu(rechercher(e, λ)) = e') + ' fixe seulement le contenu de la place rendue. Si e apparaît plusieurs fois, n’importe laquelle de ses places convient.</p>' }
    ],
    answer: { html: '<p>1. rechercher rend une place, qui n’existe que si e est dans λ : elle est partielle. existe est définie partout ; elle sert à écrire la précondition de rechercher : c’est une opération auxiliaire.</p>' +
      '<p>2. Aucun axiome ne s’applique (rien pour supprimer) : défaut de complétude. La valeur attendue est faux.</p><p>3. Par exemple :</p>',
      spec: L('opérations', '       rechercher : élément × liste → place', '           existe : élément × liste → booléen', '    existe-depuis : élément × liste × entier → booléen',
        'préconditions', '    rechercher(e, λ) est-défini-ssi existe(e, λ) = vrai', '    existe-depuis(e, λ, i) est-défini-ssi i ≥ 1',
        'axiomes', '    existe(e, λ) = existe-depuis(e, λ, 1)',
        '    i > longueur(λ) ⇒ existe-depuis(e, λ, i) = faux',
        '    1 ≤ i ≤ longueur(λ) & ième(λ, i) = e ⇒ existe-depuis(e, λ, i) = vrai',
        '    1 ≤ i ≤ longueur(λ) & ième(λ, i) ≠ e',
        '                ⇒ existe-depuis(e, λ, i) = existe-depuis(e, λ, i + 1)',
        '    existe(e, λ) = vrai ⇒ contenu(rechercher(e, λ)) = e',
        'avec', '    liste λ', '    entier i', '    élément e') },
    traps: [
      c('rechercher') + ' est partielle (précondition), ' + c('existe') + ' est définie partout.',
      'Profils : élément d’abord, liste ensuite : ' + c('existe(e, λ)') + ', pas ' + c('existe(λ, e)') + '.',
      'Dans le cas ' + c('e = e2') + ', on s’arrête sur vrai : pas d’appel récursif.',
      'La liste itérative a trois opérations internes de liste (listevide, insérer, supprimer) : un axiome par cas ne doit en oublier aucune.'
    ],
    official: false, note: 'Le cours en ligne donne les axiomes de listevide et insérer, rien pour supprimer : correction complétée et vérifiée.' });

  /* ---------- Pile ---------- */
  X.push({ id: 'kb-pile', exam: null, kind: 'cours', order: 9, src: 'Exercice construit sur le cours',
    title: 'Pile : calculer, puis ajouter hauteur et fond', topics: ['piles', 'axiomes'], lvl: 1, time: 12,
    intro: '<p>Le type pile du cours : le même sur le cours en ligne, le Moodle et la fiche 03.</p>',
    specs: [{ code: PILE, cap: 'Le type pile du cours.' }],
    questions: [
      '1. Calcule ' + c('sommet(dépiler(empiler(empiler(pilevide, a), b)))') + ' et ' + c('estvide(dépiler(empiler(pilevide, a)))') + '.',
      '2. On ajoute ' + c('hauteur : pile → entier') + ' (le nombre d’éléments) et ' + c('fond : pile → élément') + ' (l’élément du bas, le premier empilé). Donne leurs préconditions et leurs axiomes.'
    ],
    hints: [
      'Réduis d’abord le morceau le plus intérieur qui a la forme d’un axiome : ' + c('dépiler(empiler(p, e)) = p') + '.',
      'Applique chaque nouvel observateur aux deux façons de construire une pile : ' + c('pilevide') + ' et ' + c('empiler(p, e)') + '.',
      'Pour fond, il faut un cas : la pile p était-elle vide avant d’empiler e ?'
    ],
    solution: [
      { t: 'Question 1', html: ol([
        c('dépiler(empiler(empiler(pilevide, a), b)) = empiler(pilevide, a)') + ' (' + c('dépiler(empiler(p, e)) = p') + '), puis ' + c('sommet(empiler(pilevide, a)) = a') + '.',
        c('estvide(dépiler(empiler(pilevide, a))) = estvide(pilevide) = Vrai') + '.']) },
      { t: 'Préconditions', html: '<p>hauteur a un sens pour toute pile : 0 pour la pile vide. fond n’a pas de sens sur la pile vide.</p>',
        spec: L('préconditions', '    fond(p) est-défini-ssi estvide(p) = Faux') },
      { t: 'hauteur', html: '<p>Un axiome par forme de pile : la pile vide a 0 élément, empiler en ajoute un.</p>',
        spec: L('axiomes', '    hauteur(pilevide) = 0', '    hauteur(empiler(p, e)) = hauteur(p) + 1') },
      { t: 'fond', html: '<p>' + c('fond(pilevide)') + ' est exclu par la précondition. Sur ' + c('empiler(p, e)') + ' : si p était vide, e est seul, donc au fond ; sinon le fond ne change pas.</p>',
        spec: L('axiomes', '    estvide(p) = Vrai ⇒ fond(empiler(p, e)) = e', '    estvide(p) = Faux ⇒ fond(empiler(p, e)) = fond(p)') },
      { t: 'Et dépiler ?', html: '<p>Pas d’axiome pour ' + c('hauteur(dépiler(p))') + ' ni pour ' + c('fond(dépiler(p))') + '. dépiler n’a qu’un argument, de type défini : on remplace p par ' + c('empiler(p, e)') + ', et ' + c('dépiler(empiler(p, e)) = p') + ' ramène le calcul aux cas déjà traités. Le cours fait de même : il n’écrit pas d’axiome pour ' + c('sommet(dépiler(p))') + '.</p>' }
    ],
    answer: { html: '<p>1. ' + c('a') + ' et ' + c('Vrai') + '.</p><p>2. On ajoute ' + c('entier') + ' aux types utilisés :</p>',
      spec: L('utilise', '    booléen, élément, entier', 'opérations', '    hauteur : pile → entier', '       fond : pile → élément',
        'préconditions', '    fond(p) est-défini-ssi estvide(p) = Faux',
        'axiomes', '    hauteur(pilevide) = 0', '    hauteur(empiler(p, e)) = hauteur(p) + 1',
        '    estvide(p) = Vrai ⇒ fond(empiler(p, e)) = e', '    estvide(p) = Faux ⇒ fond(empiler(p, e)) = fond(p)',
        'avec', '    pile p', '    élément e') },
    traps: [
      'fond se comporte comme ' + c('premier') + ' dans une file : il faut le cas ' + c('estvide(p) = Vrai') + ' ou ' + c('Faux') + '. sommet, lui, n’a pas de cas.',
      'Un axiome ' + c('hauteur(dépiler(p)) = hauteur(p) − 1') + ' est inutile ; écrit pour une pile p quelconque, il viserait aussi la pile vide, où dépiler n’est pas défini.',
      'Ajoute ' + c('entier') + ' dans ' + c('utilise') + ' : le type pile du cours ne l’utilise pas.'
    ],
    official: false, note: 'Exercice construit sur le type pile du cours : correction rédigée et vérifiée.' });

  /* ---------- File ---------- */
  X.push({ id: 'kb-file', exam: null, kind: 'cours', order: 10, src: 'Exercice construit sur le cours',
    title: 'File : calculer, puis ajouter longueur et dernier', topics: ['files', 'axiomes'], lvl: 2, time: 15,
    intro: '<p>Le type file du cours : le même sur le cours en ligne, le Moodle et la fiche 04.</p>',
    specs: [{ code: FILE, cap: 'Le type file du cours.' }],
    questions: [
      '1. Avec ' + c('f3 = enfiler(enfiler(enfiler(filevide, a), b), c)') + ', calcule ' + c('premier(défiler(f3))') + ' et ' + c('défiler(défiler(f3))') + '.',
      '2. On ajoute ' + c('longueur : file → entier') + ' et ' + c('dernier : file → élément') + ' (le dernier entré). Donne leurs préconditions et leurs axiomes.'
    ],
    hints: [
      'Pour ' + c('défiler(enfiler(f, e))') + ', l’axiome dépend de f : si f est vide, on obtient filevide ; sinon ' + c('enfiler(défiler(f), e)') + '. Descends ainsi jusqu’au premier élément entré.',
      'Dans le terme, le premier entré est le plus enfoui ; le dernier entré est le plus à l’extérieur.',
      'Compare dernier avec premier : l’un a besoin d’un cas sur ' + c('estvide(f)') + ', l’autre non.'
    ],
    solution: [
      { t: 'premier(défiler(f3))', html: '<p>Pose ' + c('f2 = enfiler(enfiler(filevide, a), b)') + ' : f2 n’est pas vide.</p>' + ol([
        c('défiler(enfiler(f2, c)) = enfiler(défiler(f2), c)') + ' (' + c('estvide(f2) = Faux') + ').',
        c('défiler(f2) = enfiler(défiler(enfiler(filevide, a)), b)') + ' (' + c('estvide(enfiler(filevide, a)) = Faux') + ').',
        c('défiler(enfiler(filevide, a)) = filevide') + ' (' + c('estvide(filevide) = Vrai') + ').',
        'Donc ' + c('défiler(f3) = enfiler(enfiler(filevide, b), c)') + '.',
        c('premier(enfiler(enfiler(filevide, b), c)) = premier(enfiler(filevide, b))') + ' (la file intérieure n’est pas vide) ' + c('= b') + ' (' + c('estvide(filevide) = Vrai') + ').']) },
      { t: 'défiler(défiler(f3))', html: '<p>' + c('défiler(enfiler(enfiler(filevide, b), c)) = enfiler(défiler(enfiler(filevide, b)), c) = enfiler(filevide, c)') + '. Il ne reste que c, le dernier entré.</p>' },
      { t: 'Préconditions', html: '<p>longueur est définie partout ; dernier n’a pas de sens sur la file vide.</p>',
        spec: L('préconditions', '    dernier(f) est-défini-ssi estvide(f) = Faux') },
      { t: 'longueur et dernier', html: '<p>On applique chaque observateur à ' + c('filevide') + ' et à ' + c('enfiler(f, e)') + '. Le dernier entré est e, quelle que soit f : pas de cas, contrairement à premier.</p>',
        spec: L('axiomes', '    longueur(filevide) = 0', '    longueur(enfiler(f, e)) = longueur(f) + 1', '    dernier(enfiler(f, e)) = e') },
      { t: 'Et défiler ?', html: '<p>Comme pour la pile, pas d’axiome sur ' + c('défiler(f)') + ' : les axiomes de la file réécrivent ' + c('défiler(enfiler(f, e))') + ' en filevide ou en ' + c('enfiler(défiler(f), e)') + ', puis on applique longueur ou dernier.</p>' },
      { t: 'Une coquille de la source', html: '<p>Sur la page du cours en ligne, le titre au-dessus de la file dit « Le type abstrait d’une pile est le suivant » (et la fiche 04 écrit ' + c('sorte Pile') + ') : c’est bien le type file.</p>' }
    ],
    answer: { html: '<p>1. ' + c('premier(défiler(f3)) = b') + ' ; ' + c('défiler(défiler(f3)) = enfiler(filevide, c)') + '.</p><p>2. On ajoute ' + c('entier') + ' aux types utilisés :</p>',
      spec: L('utilise', '    booléen, élément, entier', 'opérations', '    longueur : file → entier', '     dernier : file → élément',
        'préconditions', '    dernier(f) est-défini-ssi estvide(f) = Faux',
        'axiomes', '    longueur(filevide) = 0', '    longueur(enfiler(f, e)) = longueur(f) + 1', '    dernier(enfiler(f, e)) = e',
        'avec', '    file f', '    élément e') },
    traps: [
      'premier est le plus ancien (il faut le cas ' + c('estvide(f)') + '), dernier le plus récent (pas de cas).',
      c('défiler(enfiler(f, e))') + ' n’est pas f en général : c’est ' + c('enfiler(défiler(f), e)') + ' si f n’est pas vide.',
      'File FIFO : premier entré, premier sorti. Après deux défiler, il reste le troisième entré.'
    ],
    official: false, note: 'Exercice construit sur le type file du cours : correction rédigée et vérifiée.' });

  /* ---------- Ensembles : union, intersection, inclusion ---------- */
  X.push({ id: 'kb-ens-a', exam: null, kind: 'cours', order: 11, src: 'Exercice construit sur le cours',
    title: 'Ensembles : union, intersection, inclusion', topics: ['ensembles', 'axiomes'], lvl: 3, time: 20,
    intro: '<p>Le cours en ligne termine le type ensemble par cette remarque : « Il serait tout aussi envisageable d’y ajouter les opérations classiques sur les ensembles telles que union, intersection, complémentaire et sous-ensemble. » On le fait ici pour l’union, l’intersection et l’inclusion. Rappel : ajouter un élément déjà présent, ou supprimer un élément absent, est sans effet.</p>',
    specs: [
      { code: ENSEMBLE, cap: 'Le type ensemble du cours. Dans ces axiomes, e désigne un ensemble ; x et y, des éléments.' },
      { code: L('opérations', '     _ ∪ _ : ensemble × ensemble → ensemble', '     _ ∩ _ : ensemble × ensemble → ensemble', '    inclus : ensemble × ensemble → booléen'),
        cap: c('inclus(e1, e2)') + ' vaut vrai si tout élément de e1 est dans e2.' }
    ],
    questions: [
      '1. Écris les axiomes qui donnent ' + c('x ∈ (e1 ∪ e2)') + ' et ' + c('x ∈ (e1 ∩ e2)') + '.',
      '2. Écris les axiomes de ' + c('inclus') + ', par cas sur la façon dont le premier ensemble est construit : ensemblevide, ajouter, supprimer.',
      '3. Tes axiomes permettent-ils de calculer ' + c('card(e1 ∪ e2)') + ' ? Que faudrait-il ?'
    ],
    hints: [
      'Méthode du cours : applique l’observateur ∈ aux nouvelles opérations internes ∪ et ∩. Fais un cas sur ' + c('x ∈ e1') + '.',
      'ensemblevide est inclus dans tout ensemble. ' + c('ajouter(x, e1)') + ' est inclus dans e2 si x est dans e2 et si e1 est inclus dans e2.',
      'Pour ' + c('supprimer(x, e1)') + ' : e1 privé de x est inclus dans e2 exactement quand e1 est inclus dans e2 augmenté de x.'
    ],
    solution: [
      { t: 'Union et intersection', html: '<p>On applique ∈ à ' + c('e1 ∪ e2') + ' et à ' + c('e1 ∩ e2') + ', par cas sur ' + c('x ∈ e1') + '. Union : si x est dans e1, il est dans l’union ; sinon, tout dépend de e2. Intersection : si x n’est pas dans e1, il n’est pas dans l’intersection ; sinon, tout dépend de e2.</p>',
        spec: L('axiomes', '    x ∈ e1 = vrai ⇒ (x ∈ (e1 ∪ e2)) = vrai', '    x ∈ e1 = faux ⇒ (x ∈ (e1 ∪ e2)) = (x ∈ e2)', '    x ∈ e1 = faux ⇒ (x ∈ (e1 ∩ e2)) = faux', '    x ∈ e1 = vrai ⇒ (x ∈ (e1 ∩ e2)) = (x ∈ e2)') },
      { t: 'Variante courte', html: '<p>Avec les opérations du type booléen, qui est utilisé : ' + c('(x ∈ (e1 ∪ e2)) = (x ∈ e1) ou (x ∈ e2)') + ' et ' + c('(x ∈ (e1 ∩ e2)) = (x ∈ e1) et (x ∈ e2)') + '.</p>' },
      { t: 'inclus', html: '<p>inclus est un observateur (résultat booléen), défini par cas sur le premier ensemble. Le cas de supprimer se ramène à un ensemble plus petit à gauche : e1 privé de x est inclus dans e2 si et seulement si e1 est inclus dans ' + c('ajouter(x, e2)') + '.</p>',
        spec: L('axiomes', '    inclus(ensemblevide, e2) = vrai', '    inclus(ajouter(x, e1), e2) = (x ∈ e2) et inclus(e1, e2)', '    inclus(supprimer(x, e1), e2) = inclus(e1, ajouter(x, e2))') },
      { t: 'Question 3 : et card ?', html: '<p>Non. Les axiomes de card ne parlent que de ensemblevide, ajouter et supprimer : rien pour ' + c('card(e1 ∪ e2)') + ', ni pour ' + c('inclus(e1 ∪ e2, e3)') + '. Pour un type complet, il faut appliquer <b>chaque</b> observateur (∈, card, inclus) à chaque nouvelle opération interne.</p>' +
        '<p>Le plus simple : définir ∪ et ∩ par cas sur le premier ensemble, comme concaténer sur la liste récursive. Tout terme se ramène alors à ensemblevide, ajouter et supprimer, et les valeurs de ∈, card et inclus en découlent.</p>',
        spec: L('axiomes', '    ensemblevide ∪ e2 = e2', '    ajouter(x, e1) ∪ e2 = ajouter(x, e1 ∪ e2)',
          '    x ∈ e2 = vrai ⇒ supprimer(x, e1) ∪ e2 = e1 ∪ e2', '    x ∈ e2 = faux ⇒ supprimer(x, e1) ∪ e2 = supprimer(x, e1 ∪ e2)',
          '    ensemblevide ∩ e2 = ensemblevide',
          '    x ∈ e2 = vrai ⇒ ajouter(x, e1) ∩ e2 = ajouter(x, e1 ∩ e2)', '    x ∈ e2 = faux ⇒ ajouter(x, e1) ∩ e2 = e1 ∩ e2',
          '    supprimer(x, e1) ∩ e2 = supprimer(x, e1 ∩ e2)') },
      { t: 'Et le complémentaire ?', html: '<p>Le complémentaire suppose un ensemble de référence (tous les éléments possibles), absent du type : on le laisse de côté.</p>' }
    ],
    answer: { html: '<p>Questions 1 et 2 ci-dessous. Question 3 : non, il faut aussi appliquer card (et inclus) à ∪ et à ∩ ; le plus simple est de définir ∪ et ∩ par cas sur le premier ensemble (étape « Question 3 »).</p>',
      spec: L('opérations', '     _ ∪ _ : ensemble × ensemble → ensemble', '     _ ∩ _ : ensemble × ensemble → ensemble', '    inclus : ensemble × ensemble → booléen',
        'axiomes', '    x ∈ e1 = vrai ⇒ (x ∈ (e1 ∪ e2)) = vrai', '    x ∈ e1 = faux ⇒ (x ∈ (e1 ∪ e2)) = (x ∈ e2)', '    x ∈ e1 = faux ⇒ (x ∈ (e1 ∩ e2)) = faux', '    x ∈ e1 = vrai ⇒ (x ∈ (e1 ∩ e2)) = (x ∈ e2)',
        '    inclus(ensemblevide, e2) = vrai', '    inclus(ajouter(x, e1), e2) = (x ∈ e2) et inclus(e1, e2)', '    inclus(supprimer(x, e1), e2) = inclus(e1, ajouter(x, e2))',
        'avec', '    ensemble e1, e2', '    élément x') },
    traps: [
      'Dans les axiomes du cours, ' + c('e') + ' désigne un <b>ensemble</b> ; x et y sont des éléments.',
      'Union et intersection n’ont pas de précondition : elles ont un sens pour tous les ensembles, vides compris.',
      'N’oublie pas le cas supprimer de inclus : supprimer est une opération interne du type.',
      'Appliquer ∈ ne suffit pas toujours : card est aussi un observateur.'
    ],
    official: false, note: 'Exercice construit sur une remarque du cours en ligne : correction rédigée et vérifiée.' });

  /* ---------- Multi-ensembles ---------- */
  X.push({ id: 'kb-ens-b', exam: null, kind: 'cours', order: 12, src: 'Exercice construit sur le cours',
    title: 'Multi-ensembles : un axiome manque', topics: ['ensembles', 'axiomes'], lvl: 2, time: 10,
    intro: '<p>Dans un multi-ensemble, un élément peut apparaître plusieurs fois. ajouter augmente toujours le cardinal ; supprimer n’enlève qu’une occurrence. Voici le type du cours en ligne, identique à la fiche 05.</p>',
    specs: [{ code: MULTI, cap: 'Le type multi-ensemble du cours, notation du site.' }],
    questions: [
      '1. Soit ' + c('m = ajouter(a, ajouter(a, multiensemblevide))') + '. Calcule ' + c('nboccurrences(a, m)') + ', puis ' + c('a ∈ supprimer(a, m)') + ' avec ces axiomes. Que constates-tu ?',
      '2. Quel axiome faut-il ajouter ?',
      '3. Pourquoi le calcul de ' + c('card(supprimer(a, supprimer(a, m)))') + ' est-il bloqué lui aussi ?'
    ],
    hints: [
      'Pour chaque terme, liste les axiomes dont la partie gauche a la même forme, puis regarde leur condition.',
      'Pour ' + c('x ∈ supprimer(x, me)') + ', le cours traite le cas ' + c('nboccurrences(x, me) ≤ 1') + '. Et s’il y a au moins deux occurrences ?',
      c('card(supprimer(x, me))') + ' passe par ' + c('x ∈ me') + '.'
    ],
    solution: [
      { t: 'nboccurrences(a, m)', html: '<p>' + c('nboccurrences(a, ajouter(a, ajouter(a, multiensemblevide)))') + ' ' + c('= nboccurrences(a, ajouter(a, multiensemblevide)) + 1') + ' ' + c('= nboccurrences(a, multiensemblevide) + 1 + 1 = 2') + ' (axiomes du cas x = y, puis de multiensemblevide).</p>' },
      { t: 'a ∈ supprimer(a, m)', html: '<p>Deux axiomes de ∈ portent sur supprimer. ' + c('nboccurrences(x, me) ≤ 1 ⇒ …') + ' : ici nboccurrences(a, m) = 2. ' + c('x ≠ y ⇒ …') + ' : ici x = y = a. Aucun ne s’applique. On attend pourtant vrai : il reste une occurrence de a. C’est un défaut de <b>complétude</b>.</p>' },
      { t: 'L’axiome manquant', html: '<p>Le cours en ligne et la fiche 05 n’ont pas d’axiome pour ' + c('x ∈ supprimer(x, me)') + ' quand x apparaît au moins deux fois dans me ; il faut ajouter :</p>',
        spec: L('axiomes', '    nboccurrences(x, me) ≥ 2 ⇒ (x ∈ supprimer(x, me)) = vrai') },
      { t: 'card bloqué aussi', html: '<p>Les deux axiomes de card sur supprimer demandent la valeur de ' + c('x ∈ me') + '. Pour ' + c('card(supprimer(a, supprimer(a, m)))') + ', c’est ' + c('a ∈ supprimer(a, m)') + ' : sans valeur, card est bloqué.</p>' +
        '<p>Avec l’axiome ajouté, ' + c('a ∈ supprimer(a, m) = vrai') + ', donc ' + c('card(supprimer(a, supprimer(a, m))) = card(supprimer(a, m)) − 1 = (card(m) − 1) − 1 = 0') + '.</p>' },
      { t: 'Comparer avec l’ensemble', html: '<p>Dans un ensemble, supprimer retire l’élément pour de bon : ' + c('x = y ⇒ (x ∈ supprimer(y, e)) = faux') + ', sans condition. Dans un multi-ensemble, il faut compter les occurrences : c’est le rôle de nboccurrences.</p>' }
    ],
    answer: { html: '<p>1. ' + c('nboccurrences(a, m) = 2') + ' ; aucun axiome ne donne ' + c('a ∈ supprimer(a, m)') + ', qui devrait valoir vrai. 2. L’axiome ci-dessous. 3. ' + c('card(supprimer(x, me))') + ' passe par ' + c('x ∈ me') + ', ici ' + c('a ∈ supprimer(a, m)') + ', qui n’a pas de valeur. Avec l’axiome ajouté, card vaut 0.</p>',
      spec: L('axiomes', '    nboccurrences(x, me) ≥ 2 ⇒ (x ∈ supprimer(x, me)) = vrai') },
    traps: [
      'Ensemble : ajouter un élément présent ne change rien. Multi-ensemble : card augmente toujours de 1.',
      'card compte toutes les occurrences, nboccurrences celles d’un seul élément.',
      'Un axiome qui manque est un problème de complétude, pas de consistance.'
    ],
    official: false, note: 'Exercice construit : le trou vient des axiomes du cours (page en ligne et fiche 05). Correction vérifiée.' });
})();
