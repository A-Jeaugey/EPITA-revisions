/* TAA — exercices des sujets d’algo de mi-semestre (partie types abstraits), corrigés. Source : analyse des annales.
   Une fiche par exercice de types abstraits des 9 sujets retrouvés (2017 à 2024, dont le contrôle S1# d’avril 2019,
   noté p2019d). Énoncés verbatim (≤ partout, ⩽ dans certains sujets ; les lignes de suite des axiomes sont moins
   indentées que dans le sujet, pour rester visibles sur un téléphone). Cas particuliers :
   - l’exercice 1 de 2020 est mot pour mot celui de 2018 : une seule fiche, p2018-ex1 ;
   - l’exercice 1 de 2021 est celui de 2017 (modifier) : une seule fiche, p2017-ex1, corrigée par le corrigé de 2021 ;
   - l’exercice 1 de 2023 est coupé en deux fiches : p2023-ex1a (questions 1 à 4) et p2023-ex1b (concaténer).
   Les réponses ont été vérifiées sur des modèles (listes, vecteur) en appliquant les axiomes terme à terme.
   Les questions de cours sont aussi dans le QCM (data/qcm/taa-annales.js). */
(function () {
  var X = window.TAA_EX = window.TAA_EX || [];
  /* bloc de spécification (assets/js/spec.js) : une ligne par argument */
  function sp() { return Array.prototype.slice.call(arguments).join('\n'); }
  var NOTE_REDIGE = 'Pas de corrigé officiel : correction rédigée et vérifiée.';
  var NOTE_COPIE = 'Corrigé d’après une copie notée (08/10), avec les ajouts du correcteur.';

  /* ---------- types rappelés par les sujets ---------- */
  var ITER_2017 = sp(
    'types',
    '    liste, place',
    'utilise',
    '    entier, élément',
    'opérations',
    '    liste-vide : → liste',
    '    accès      : liste × entier → place',
    '    contenu    : place → élément',
    '    ième       : liste × entier → élément',
    '    longueur   : liste → entier',
    '    insérer    : liste × entier × élément → liste',
    '    supprimer  : liste × entier → liste',
    '    succ       : place → place');
  var REC_2017 = sp(
    'types',
    '    liste, place',
    'utilise',
    '    élément',
    'opérations',
    '    liste-vide : → liste',
    '    tête       : liste → place',
    '    fin        : liste → liste',
    '    cons       : élément × liste → liste',
    '    premier    : liste → élément',
    '    contenu    : place → élément',
    '    succ       : place → place');
  var REC_PLACES = sp(
    'types',
    '    liste, place',
    'utilise',
    '    élément',
    'opérations',
    '    listevide : → liste',
    '    tête      : liste → place',
    '    contenu   : place → élément',
    '    premier   : liste → élément',
    '    cons      : élément × liste → liste',
    '    fin       : liste → liste',
    '    succ      : place → place',
    'préconditions',
    '    tête(λ) est-défini-ssi λ ≠ listevide',
    '    fin(λ) est-défini-ssi λ ≠ listevide',
    '    premier(λ) est-défini-ssi λ ≠ listevide',
    'axiomes',
    '    premier(cons(e, λ)) = e',
    '    fin(cons(e, λ)) = λ',
    '    contenu(tête(λ)) = premier(λ)',
    '    succ(tête(λ)) = tête(fin(λ))',
    'avec',
    '    liste   λ',
    '    élément e');
  var REC_SANS_PLACES = sp(
    'types',
    '    liste',
    'utilise',
    '    élément',
    'opérations',
    '    listevide : → liste',
    '    premier   : liste → élément',
    '    cons      : élément × liste → liste',
    '    fin       : liste → liste',
    'préconditions',
    '    fin(λ) est-défini-ssi λ ≠ listevide',
    '    premier(λ) est-défini-ssi λ ≠ listevide',
    'axiomes',
    '    premier(cons(e, λ)) = e',
    '    fin(cons(e, λ)) = λ',
    'avec',
    '    liste   λ',
    '    élément e');
  var ITER_2024 = sp(
    'types',
    '    liste, place',
    'utilise',
    '    entier, élément',
    'opérations',
    '    liste-vide : → liste',
    '    accès      : liste × entier → place',
    '    contenu    : place → élément',
    '    ième       : liste × entier → élément',
    '    longueur   : liste → entier');
  var MYSTERE = sp(
    'opérations',
    '    mystère : Liste × Entier × Entier → Liste',
    'préconditions',
    '    mystère(λ, x, y) est-défini-ssi 1 ≤ x ≤ y ≤ longueur(λ)',
    'axiomes',
    '    1 ≤ x ≤ y ≤ longueur(λ) ⇒ longueur(mystère(λ, x, y)) = longueur(λ) − y + x − 1',
    '    1 ≤ x ≤ y ≤ longueur(λ) & 1 ≤ i < x ⇒ ième(mystère(λ, x, y), i) = ième(λ, i)',
    '    1 ≤ x ≤ y ≤ longueur(λ) & x ≤ i ≤ longueur(λ) − y + x − 1 ⇒',
    '            ième(mystère(λ, x, y), i) = ieme(λ, i + y − x + 1)',
    'avec',
    '    λ : Liste',
    '    x, y, i : Entier');
  var VECTEUR = sp(
    'types',
    '    vecteur',
    'utilise',
    '    entier, élément, booléen',
    'opérations',
    '    vect          : entier × entier → vecteur',
    '    modifième     : vecteur × entier × élément → vecteur',
    '    ième          : vecteur × entier → élément',
    '    estinitialisé : vecteur × entier → booléen',
    '    borneinf      : vecteur → entier',
    '    bornesup      : vecteur → entier',
    'préconditions',
    '    ième(v,i) est-défini-ssi borneinf(v) ≤ i ≤ bornesup(v) & estinitialisé(v,i)=vrai',
    'axiomes',
    '    borneinf(v) ≤ i ≤ bornesup(v) ⇒ ième(modifième(v,i,e),i) = e',
    '    borneinf(v) ≤ i ≤ bornesup(v) & borneinf(v) ≤ j ≤ bornesup(v) & i≠j',
    '            ⇒ ième(modifième(v,i,e),j) = ième(v,j)',
    '',
    '    borneinf(v) ≤ i ≤ bornesup(v) ⇒ estinitialisé(modifième(v,i,e),i)=vrai',
    '    borneinf(v) ≤ i ≤ bornesup(v) & borneinf(v) ≤ j ≤ bornesup(v)',
    '            ⇒ estinitialisé(modifième(v,i,e),j)=estinitialisé(v, j)',
    '',
    '    borneinf(vect(i,j))=i',
    '    borneinf(v) ≤ i ≤ bornesup(v) ⇒ borneinf(modifième(v,i,e))=borneinf(v)',
    '',
    '    bornesup(vect(i,j))=j',
    '    borneinf(v) ≤ i ≤ bornesup(v) ⇒ bornesup(modifième(v,i,e))=bornesup(v)',
    'avec',
    '    vecteur v',
    '    entier  i, j, k',
    '    element e');

  /* =====================================================================
     Partiel oct. 2024 (promo 2029), épreuve TAA de 30 min sur 10 points
     ===================================================================== */
  var CALLS_2024 = ['mystère(λ,3,5)', 'mystère(λ,1,4)', 'mystère(λ,6,9)', 'mystère(λ,8,8)', 'mystère(λ,1,9)'];
  /* tableau du sujet : deux colonnes seulement (la liste d’origine est la même sur les cinq lignes),
     pour tenir sur un téléphone */
  function tab2024(res) {
    return '<div class="tbl"><table><thead><tr><th>Opération</th><th>Liste résultante</th></tr></thead><tbody>' +
      CALLS_2024.map(function (c, i) { return '<tr><td>' + c + '</td><td>' + (res ? res[i] : '') + '</td></tr>'; }).join('') +
      '</tbody></table></div>';
  }

  X.push({
    id: 'p2024-ex1', exam: 'p2024', kind: 'partiel', order: 1, src: 'Partiel oct. 2024 · Ex 1',
    title: 'Listes itératives : opération mystère', pts: 5, topics: ['mystere', 'liste-iter'], lvl: 2, time: 12,
    intro: '<p>Supposons la signature du type abstrait algébrique <em>liste itérative</em> vu en cours et dont voici un extrait.</p>',
    specs: [
      { code: ITER_2024, cap: 'Supposons l’opération mystère suivante :' },
      { code: MYSTERE }],
    questions: ['Pour chaque liste proposée, indiquer quelle sera la liste résultante après application de l’opération mystère pour les arguments proposés. Sur les cinq lignes du sujet, la liste d’origine est la même : λ={1,1,2,3,5,5,8,9,9}.' + tab2024(null)],
    hints: [
      'Commence par la longueur du résultat : le premier axiome la donne directement. Puis regarde quels rangs i chacun des deux axiomes sur ième couvre.',
      'Pour mystère(λ, 3, 5) : les rangs 1 et 2 sont recopiés. Pour i ≥ 3, l’axiome lit le rang i + 5 − 3 + 1 de λ. Quels rangs de λ ne sont jamais lus ?',
      'Une fois une ligne calculée, nomme ce que fait mystère, puis contrôle chaque ligne avec la longueur. Vérifie aussi la précondition : un terme hors du domaine serait indéfini.'],
    solution: [
      { t: 'Lire les axiomes', html: '<p>La précondition demande 1 ≤ x ≤ y ≤ longueur(λ). Ici longueur(λ) = 9 et les cinq appels la respectent : aucun n’est indéfini. (Le sujet écrit « ieme » sans accent dans le dernier axiome : c’est bien ième.)</p>' +
        '<ul><li>Longueur : longueur(λ) − y + x − 1 = longueur(λ) − (y − x + 1). La liste perd y − x + 1 éléments, autant qu’il y a de rangs de x à y.</li>' +
        '<li>Rangs 1 ≤ i &lt; x : ième(λ, i). Le début est recopié.</li>' +
        '<li>Rangs x ≤ i ≤ longueur du résultat : ième(λ, i + y − x + 1). On saute y − x + 1 rangs.</li></ul>' +
        '<p>Les rangs x à y de λ ne sont jamais lus : <strong>mystère(λ, x, y) supprime les éléments de rang x à y</strong> (inclus).</p>' },
      { t: 'Calcul détaillé de mystère(λ, 3, 5)', html: '<p>Longueur : 9 − 5 + 3 − 1 = 6.</p>' +
        '<ul><li>i = 1 et i = 2 (i &lt; 3) : ième(λ, 1) = 1 et ième(λ, 2) = 1.</li>' +
        '<li>3 ≤ i ≤ 6 : on lit le rang i + 5 − 3 + 1 = i + 3, soit les rangs 6, 7, 8 et 9 de λ : 5, 8, 9, 9.</li></ul>' +
        '<p>Résultat : {1, 1, 5, 8, 9, 9}. Les éléments retirés sont ceux des rangs 3, 4 et 5 : 2, 3 et 5.</p>' },
      { t: 'Les quatre autres lignes', html: '<ul>' +
        '<li>mystère(λ, 1, 4) : longueur 9 − 4 + 1 − 1 = 5. Aucun rang avant x = 1. Le rang i lit le rang i + 4 : 5, 5, 8, 9, 9.</li>' +
        '<li>mystère(λ, 6, 9) : longueur 9 − 9 + 6 − 1 = 5. Les rangs 1 à 5 sont recopiés ; le dernier axiome demanderait 6 ≤ i ≤ 5 : il ne s’applique à aucun rang.</li>' +
        '<li>mystère(λ, 8, 8) : longueur 9 − 8 + 8 − 1 = 8. Les rangs 1 à 7 sont recopiés, le rang 8 lit le rang 9. Un seul élément est retiré : le 8e, un 9.</li>' +
        '<li>mystère(λ, 1, 9) : longueur 9 − 9 + 1 − 1 = 0. La précondition 1 ≤ 1 ≤ 9 ≤ 9 est vraie : le terme est défini, c’est la liste vide.</li></ul>' }],
    answer: { html: tab2024(['{1, 1, 5, 8, 9, 9}', '{5, 5, 8, 9, 9}', '{1, 1, 2, 3, 5}', '{1, 1, 2, 3, 5, 5, 8, 9}', '{} (liste vide)']) +
      '<p>mystère(λ, x, y) supprime les éléments de rang x à y.</p>' },
    traps: [
      'Lire mystère comme « garder les rangs x à y » : c’est faux pour les cinq lignes du sujet.',
      'Se tromper de décalage : le rang i ≥ x du résultat vient du rang i + (y − x + 1) de λ, pas du rang i + y − x.',
      'Répondre « indéfini » pour mystère(λ, 1, 9) : la précondition est vraie, le résultat est la liste vide.',
      'Retirer deux éléments pour mystère(λ, 8, 8) : avec x = y, un seul élément disparaît, le 8e.',
      'Compter les rangs à partir de 0 : dans le cours, le premier élément est au rang 1.'],
    grading: '5 points pour le tableau (cinq lignes ; le partage n’est pas indiqué).',
    official: false, note: NOTE_REDIGE
  });

  X.push({
    id: 'p2024-ex2', exam: 'p2024', kind: 'partiel', order: 2, src: 'Partiel oct. 2024 · Ex 2',
    title: 'Listes récursives : supprime-sup', pts: 5, topics: ['axiomes', 'liste-rec', 'precond'], lvl: 2, time: 15,
    intro: '<p>Supposons le type abstrait algébrique <em>Liste récursive</em> vu en cours et rappelé ci-dessous.</p>' +
      '<p>On ajoute l’opération <em>supprime-sup</em> qui permet de supprimer dans une liste tous les éléments strictement supérieurs à un élément donné.</p>',
    specs: [
      { code: REC_PLACES },
      { code: sp('opérations', '    supprime-sup : liste × élément → liste') }],
    questions: ['Donner les axiomes déduisant une valeur pour la suppression des éléments strictement supérieurs à l’élément <em>x</em> dans la <em>liste récursive</em> λ. Vous préciserez les PRÉCONDITIONS s’il y en a.'],
    hints: [
      'Préconditions : que doit rendre supprime-sup sur une liste vide ? Y a-t-il une liste pour laquelle l’opération n’a pas de sens ?',
      'Écris les axiomes sur les deux façons de construire une liste : listevide, puis cons(e, λ).',
      'Pour cons(e, λ), sépare deux cas qui ne se recouvrent pas, selon e et x : e est-il gardé ou supprimé ? Dans les deux cas, il faut continuer sur λ.'],
    solution: [
      { t: 'Les préconditions', html: '<p>supprime-sup est définie pour toute liste : sur la liste vide, il n’y a rien à supprimer, et le résultat est la liste vide. Il n’y a <strong>aucune précondition</strong>. En mettre une (λ ≠ listevide) casserait la récursion, qui finit toujours sur supprime-sup(listevide, x).</p>' },
      { t: 'Le cas listevide', html: '<p>Rien à supprimer :</p>', spec: sp('axiomes', '    supprime-sup(listevide, x) = listevide') },
      { t: 'Le cas cons(e, λ) : deux cas disjoints', html: '<ul><li>e &gt; x : e est strictement supérieur à x. On le supprime et on continue sur λ.</li>' +
        '<li>e ≤ x : on garde e en tête et on continue sur λ.</li></ul>' +
        '<p>Les deux conditions ne se recouvrent pas (consistance) et couvrent tous les cas (complétude). On suppose, comme le sujet, que les éléments se comparent.</p>',
        spec: sp('axiomes', '    e > x ⇒ supprime-sup(cons(e, λ), x) = supprime-sup(λ, x)', '    e ≤ x ⇒ supprime-sup(cons(e, λ), x) = cons(e, supprime-sup(λ, x))') },
      { t: 'Vérifier sur un exemple', html: '<p>supprime-sup(cons(3, cons(1, cons(4, listevide))), 3) : 3 ≤ 3, on garde 3 ; 1 ≤ 3, on garde 1 ; 4 &gt; 3, on supprime 4 ; il reste supprime-sup(listevide, 3) = listevide. Résultat : cons(3, cons(1, listevide)).</p>' },
      { t: 'Variante acceptée', html: '<p>Avec premier et fin, en gardant le cas listevide : « λ ≠ listevide &amp; premier(λ) &gt; x ⇒ supprime-sup(λ, x) = supprime-sup(fin(λ), x) » et « λ ≠ listevide &amp; premier(λ) ≤ x ⇒ supprime-sup(λ, x) = cons(premier(λ), supprime-sup(fin(λ), x)) ». Tu peux aussi écrire non(e &gt; x) au lieu de e ≤ x.</p>' }],
    answer: { html: '<p>Aucune précondition. Un axiome pour listevide, deux pour cons(e, λ) :</p>',
      spec: sp('préconditions', '    aucune', 'axiomes',
        '    supprime-sup(listevide, x) = listevide',
        '    e > x ⇒ supprime-sup(cons(e, λ), x) = supprime-sup(λ, x)',
        '    e ≤ x ⇒ supprime-sup(cons(e, λ), x) = cons(e, supprime-sup(λ, x))',
        'avec', '    liste λ', '    élément e, x') },
    traps: [
      'Écrire ≥ au lieu de &gt; : on supprimerait aussi les éléments égaux à x.',
      'S’arrêter au premier élément trop grand (e &gt; x ⇒ … = λ) : les éléments suivants ne sont plus filtrés.',
      'Inverser la condition : on garderait les éléments trop grands.',
      'Inventer la précondition λ ≠ listevide : l’axiome récursif finirait sur un terme indéfini.',
      'Oublier le cas listevide (défaut de complétude), ou rendre une place : le profil rend une liste.'],
    grading: '5 points pour l’exercice, sans détail.',
    official: false, note: NOTE_REDIGE
  });

  /* =====================================================================
     Partiel oct. 2023 (promo 2028), épreuve TAA sur 10 points.
     Pas de corrigé officiel : une copie d’élève corrigée (08/10), barème en marge.
     ===================================================================== */
  X.push({
    id: 'p2023-ex1a', exam: 'p2023', kind: 'partiel', order: 1.1, src: 'Partiel oct. 2023 · Ex 1, Q1 à Q4',
    title: 'Un peu de cours… : opération, liste itérative, constante, observateur', pts: 6, topics: ['cours', 'hierarchie', 'liste-iter'], lvl: 1, time: 8,
    intro: '<p>Les questions 1 à 4 de l’exercice 1 (10 points). La question 5, les axiomes de concaténer, est corrigée dans la <a href="#p2023-ex1b">fiche suivante</a>.</p>',
    questions: [
      '<b>1.</b> La définition d’une opération est composée de ?',
      '<b>2.</b> Donnez deux opérations définissant une liste itérative (sans places).',
      '<b>3.</b> Quel type de données retourne une constante ?',
      '<b>4.</b> Quelles sont les spécifications du profil d’un observateur ?'],
    hints: [
      'Question 1 : dans la partie opérations, comment déclare-t-on chaque opération ? Deux mots du cours.',
      'Question 3 : une constante est une opération sans argument. Regarde listevide : → liste dans la liste, pilevide : → pile dans la pile. Le type qu’elle rend est-il celui que l’on définit, ou un type déjà conçu ?',
      'Question 4 : un observateur doit remplir deux conditions, l’une sur ses arguments, l’autre sur son résultat.'],
    solution: [
      { t: 'D’où vient la correction', html: '<p>Pas de corrigé officiel pour 2023 : les annales contiennent une copie d’élève corrigée, notée 08/10. Le correcteur a coché en rouge, puis ajouté en vert le barème et les réponses attendues. Les réponses ci-dessous suivent ces ajouts et le cours.</p>' },
      { t: 'Question 1 (1 pt)', html: '<p><strong>Un nom (identifiant) et un profil</strong> : les types des arguments et le type du résultat. C’est l’ajout vert de la copie : « Composé d’un nom et d’un profil ». La copie décrivait le profil sans employer le mot : crédit partiel.</p>' },
      { t: 'Question 2 (2 pts)', html: '<p>Deux opérations de la liste itérative qui n’utilisent pas les places, par exemple <strong>longueur et ième</strong> : ce sont les deux observateurs qui décrivent une liste itérative (longueur(λ) = 3, ième(λ, 1) = e1…). Tout couple parmi liste-vide, ième, longueur, insérer et supprimer convient : la copie a eu 2 points sur 2 avec « longueur et supprimer ». Pas accès, contenu ni succ, qui utilisent les places.</p>' },
      { t: 'Question 3 (1 pt)', html: '<p><strong>Un type défini.</strong> Une constante est une opération sans argument. Dans chaque type du cours, elle crée la valeur de départ du type que l’on définit : listevide : → liste, pilevide : → pile, filevide : → file, et vrai : → booléen dans le type booléen. Elle rend un résultat de type défini : c’est une opération interne. Elle ne peut pas être un observateur, puisqu’elle n’a aucun argument de type défini.</p>' +
        '<p>Sur la copie, l’élève avait écrit « prédéfini » et a eu 0. Les lettres « pré » ont ensuite été rayées en vert, la couleur des réponses attendues.</p>' },
      { t: 'Question 4 (2 pts)', html: '<p>Un observateur a <strong>au moins un argument de type défini</strong> et un <strong>résultat de type prédéfini</strong>. La copie ne donnait que la seconde condition : crédit partiel, et l’ajout vert « et prend un argument de type défini ».</p>' },
      { t: 'Pourquoi « prédéfini » tente en question 3', html: '<p>La fiche du cours donne « Faux : → booléen » comme exemple de constante, puis un exemple où booléen est dans utilise, donc prédéfini. Mais Faux est la constante du type booléen lui-même : là, booléen est le type défini.</p>' }],
    answer: { html: '<ol><li>Un nom et un profil (types des arguments et type du résultat).</li>' +
      '<li>Par exemple longueur et ième (insérer, supprimer ou liste-vide conviennent aussi).</li>' +
      '<li>Un type défini.</li>' +
      '<li>Au moins un argument de type défini et un résultat de type prédéfini.</li></ol>' +
      '<p><a href="../qcm/index.html#taa-p2023">Les questions de ce sujet dans le QCM →</a></p>' },
    traps: [
      'Question 3 : répondre « prédéfini ». La constante rend le type que l’on définit.',
      'Question 4 : ne donner qu’une des deux conditions du profil.',
      'Question 1 : décrire le profil sans employer le mot « profil ».',
      'Question 2 : citer accès, contenu ou succ, qui utilisent les places.'],
    grading: 'd’après la marge de la copie (en vert), Q1 1 pt, Q2 2 pts, Q3 1 pt, Q4 2 pts ; la question 5 vaut 4 pts.',
    official: false, note: NOTE_COPIE
  });

  X.push({
    id: 'p2023-ex1b', exam: 'p2023', kind: 'partiel', order: 1.2, src: 'Partiel oct. 2023 · Ex 1, Q5',
    title: 'Liste récursive sans places : concaténer', pts: 4, topics: ['axiomes', 'liste-rec', 'precond'], lvl: 2, time: 10,
    intro: '<p><b>5.</b> Supposons le type abstrait algébrique <em>Liste récursive</em> (sans places) vu en cours et rappelé ci-dessous.</p>' +
      '<p>On se propose d’étendre les propriétés de ce type en lui permettant de concaténer deux listes, en considérant l’opération suivante :</p>',
    specs: [
      { code: sp('opérations', '    concaténer : liste × liste → liste') },
      { code: REC_SANS_PLACES, cap: 'Le type <em>Liste récursive</em> (sans places) rappelé par le sujet.' }],
    questions: ['Donner les axiomes déduisant une valeur pour l’opération de concaténation de deux <em>listes récursives</em> λ et λ2. Vous préciserez les PRÉCONDITIONS s’il y en a.'],
    hints: [
      'Préconditions : y a-t-il un couple de listes, vides comprises, pour lequel la concaténation n’a pas de sens ?',
      'Raisonne sur la première liste, avec ses deux formes : listevide et cons(e, λ).',
      'Dans le cas cons(e, λ), e reste en tête du résultat. Que reste-t-il à concaténer derrière lui ?'],
    solution: [
      { t: 'Les préconditions', html: '<p>concaténer est définie pour tout couple de listes, vides comprises : il n’y a <strong>aucune précondition</strong>. Sur la copie, l’élève avait commencé une précondition puis l’avait rayée : la réponse a eu le point.</p>' },
      { t: 'Les deux cas de la première liste', html: '<ul><li>Première liste vide : le résultat est λ2.</li><li>Première liste cons(e, λ) : e reste en tête et, derrière lui, on concatène λ et λ2.</li></ul>',
        spec: sp('axiomes', '    concaténer(listevide, λ2) = λ2', '    concaténer(cons(e, λ), λ2) = cons(e, concaténer(λ, λ2))') },
      { t: 'Vérifier sur un exemple', html: '<p>concaténer(cons(a, cons(b, listevide)), cons(c, listevide)) = cons(a, concaténer(cons(b, listevide), cons(c, listevide))) = cons(a, cons(b, concaténer(listevide, cons(c, listevide)))) = cons(a, cons(b, cons(c, listevide))).</p>' },
      { t: 'Ce qu’a écrit la copie', html: '<p>La copie a écrit concaténer(listevide, λ2) = λ2 et concaténer(λ, listevide) = λ (1 pt), puis concat(λ, λ2) = cons(premier(λ), concat(fin(λ), λ2)) (2 pts). Ce dernier axiome a été validé alors que son membre droit n’est pas défini pour λ = listevide : écris plutôt « λ ≠ listevide ⇒ … ». Le deuxième axiome de base est vrai, mais inutile : c’est une conséquence des deux autres.</p>' }],
    answer: { html: '<p>Aucune précondition. Deux axiomes, en raisonnant sur la première liste (c’est aussi le corrigé officiel de 2018) :</p>',
      spec: sp('préconditions', '    aucune', 'axiomes',
        '    concaténer(listevide, λ2) = λ2',
        '    concaténer(cons(e, λ), λ2) = cons(e, concaténer(λ, λ2))',
        'avec', '    liste λ, λ2', '    élément e') },
    traps: [
      'Inventer la précondition λ ≠ listevide : concaténer est définie pour toutes les listes.',
      'Utiliser tête ou succ : le type est « sans places ».',
      'Écrire cons(premier(λ), concaténer(fin(λ), λ2)) sans la condition λ ≠ listevide : pour λ = listevide, le membre droit n’est pas défini.',
      'Échanger les listes dans l’appel récursif, ou raisonner sur la deuxième liste : l’ordre des éléments n’est plus conservé.',
      'Oublier le cas de base concaténer(listevide, λ2) = λ2 : aucune concaténation ne se calcule jusqu’au bout (défaut de complétude).'],
    grading: 'd’après la marge de la copie, préconditions 1 pt, axiomes de base 1 pt (lecture la plus probable du chiffre), axiome récursif 2 pts.',
    official: false, note: NOTE_COPIE
  });

  /* =====================================================================
     Partiel oct. 2022 (promo 2027), partie 1 sur 4 points
     ===================================================================== */
  X.push({
    id: 'p2022-ex1', exam: 'p2022', kind: 'partiel', order: 1, src: 'Partiel oct. 2022 · Ex 1',
    title: 'Un peu de cours… : observateur, partielle, listes, signature', pts: 4, topics: ['cours', 'hierarchie', 'precond', 'liste-rec', 'liste-iter'], lvl: 1, time: 8,
    questions: [
      '<b>1.</b> Quel type de données retourne un observateur ?',
      '<b>2.</b> Comment appelle-t-on une opération qui n’est pas définie partout ?',
      '<b>3.</b> Quelles sont les deux façons de définir une liste ?',
      '<b>4.</b> Quelles zones constituent la signature d’un type abstrait ?',
      '<b>5.</b> Donnez trois opérations définissant une liste récursive (sans places).'],
    hints: [
      'Questions 1 et 2 : relis la hiérarchie des opérations (types définis et prédéfinis) et la partie sur les préconditions.',
      'Question 3 : une même liste se décrit soit par la manière de la construire (un élément suivi d’une liste), soit par les rangs de ses éléments.',
      'Question 5 : écarte toute opération qui utilise une place (tête, contenu, succ) et toute opération de l’autre façon de décrire une liste.'],
    solution: [
      { t: 'Question 1', html: '<p><strong>Un type prédéfini</strong> (un type déjà conçu, cité dans utilise). Exemple : longueur : liste → entier. Corrigé officiel : « Un observateur retourne un type prédéfini. »</p>' },
      { t: 'Question 2', html: '<p><strong>Une opération partielle.</strong> Son domaine de définition s’écrit dans la partie préconditions, avec est-défini-ssi. Corrigé officiel : « Une opération qui n’est pas définie partout est une opération partielle ».</p>' },
      { t: 'Question 3', html: '<p><strong>Récursive et itérative.</strong> C’est la même donnée, seule la manière de s’en servir change. « Chaînée et contiguë » parle de la représentation en mémoire, pas du type abstrait. Corrigé officiel : « Les deux manières de définir une liste sont la récursive et l’itérative. »</p>' },
      { t: 'Question 4', html: '<p><strong>Les zones types, utilise et opérations.</strong> préconditions, axiomes et avec n’en font pas partie. Corrigé officiel : « […] les zones TYPES, UTILISE et OPERATIONS. »</p>' },
      { t: 'Question 5', html: '<p><strong>Trois parmi listevide, cons, fin et premier.</strong> tête et succ sont exclues : elles utilisent les places. Le corrigé officiel en cite quatre pour « trois » : « listevide, cons, fin, premier ».</p>' }],
    answer: { html: '<ol><li>Un type prédéfini.</li><li>Une opération partielle.</li><li>Récursive et itérative.</li><li>Les zones types, utilise et opérations.</li><li>Trois parmi listevide, cons, fin, premier.</li></ol>' +
      '<p><a href="../qcm/index.html#taa-p2022">Les questions de ce sujet dans le QCM →</a></p>' },
    traps: [
      'Question 1 : répondre « un type défini » : c’est ce que retourne une opération interne.',
      'Question 5 : citer tête, contenu ou succ (des places), ou une opération de la liste itérative comme ième, longueur ou insérer.',
      'Question 3 : répondre « chaînée et contiguë », qui parle de la mémoire et pas du type abstrait.',
      'Question 4 : oublier utilise, ou ajouter préconditions, axiomes, avec.'],
    grading: '4 points pour les cinq questions, sans détail.',
    official: true
  });

  /* =====================================================================
     Partiel nov. 2021 (promo 2026), partie 1 sur 6 points.
     L’exercice 1 (modifier) est celui de 2017 : fiche p2017-ex1.
     ===================================================================== */
  X.push({
    id: 'p2021-ex2', exam: 'p2021', kind: 'partiel', order: 2, src: 'Partiel nov. 2021 · Ex 2',
    title: 'Un peu de cours… : observateur, partielle, signature, axiomes', pts: 4, topics: ['cours', 'hierarchie', 'precond', 'axiomes'], lvl: 1, time: 8,
    questions: [
      '<b>1.</b> Que retourne un observateur ?',
      '<b>2.</b> Comment appelle-t-on une opération qui n’est pas définie partout ?',
      '<b>3.</b> Quels problèmes se posent lors de la conception de l’ensemble des axiomes ?',
      '<b>4.</b> Dans un type algébrique abstrait, quelles zones ne constituent pas la signature d’un type abstrait ?',
      '<b>5.</b> Comment écrit-on des axiomes ?'],
    hints: [
      'Question 1 : un observateur interroge la donnée sans la changer. Ce qu’il rend est-il du type que l’on définit ?',
      'Question 2 : le domaine de définition d’une telle opération s’écrit dans la partie préconditions. Quel adjectif le cours lui donne-t-il ?',
      'Question 4 : c’est l’inverse de « quelles zones constituent la signature ». Liste les six zones d’une spécification, puis retire celles de la signature.'],
    solution: [
      { t: 'Question 1', html: '<p><strong>Un type prédéfini.</strong> Plus précisément, un observateur a au moins un argument de type défini et un résultat de type prédéfini, comme longueur : liste → entier. Corrigé officiel : « Un observateur retourne un type prédéfini. »</p>' },
      { t: 'Question 2', html: '<p><strong>Une opération partielle.</strong> Son domaine de définition s’écrit dans les préconditions. « Auxiliaire » est la réponse d’une autre question (2019). Corrigé officiel : « Une opération qui n’est pas définie partout est une opération partielle. »</p>' },
      { t: 'Question 3', html: '<p><strong>La complétude et la consistance.</strong> Consistance : pas d’axiomes contradictoires. Complétude : avoir écrit suffisamment d’axiomes. Corrigé officiel : « […] sont la complétude et la consistance. »</p>' },
      { t: 'Question 4', html: '<p><strong>Les zones préconditions, axiomes et avec.</strong> La signature, ce sont les zones types, utilise et opérations ; les préconditions et les axiomes donnent les propriétés des opérations, et avec donne le type des variables. Corrigé officiel : « […] les zones PRECONDITIONS, AXIOMES et AVEC. »</p>' },
      { t: 'Question 5', html: '<p><strong>En appliquant les observateurs aux opérations internes.</strong> Exemple : sommet(empiler(p, e)) = e. L’observateur sommet est à l’extérieur, l’opération interne empiler à l’intérieur. Corrigé officiel : « Nous écrivons des axiomes en appliquant des observateurs aux opérations internes. »</p>' }],
    answer: { html: '<ol><li>Un type prédéfini.</li><li>Une opération partielle.</li><li>La complétude et la consistance.</li><li>Les zones préconditions, axiomes et avec.</li><li>En appliquant des observateurs aux opérations internes.</li></ol>' +
      '<p><a href="../qcm/index.html#taa-p2021">Les questions de ce sujet dans le QCM →</a></p>' },
    traps: [
      'Question 4 : c’est l’inverse de la question de 2019 et de 2022. Lis bien « ne constituent pas ».',
      'Question 2 : répondre « auxiliaire », la réponse d’une autre question (2019).',
      'Question 3 : écrire « cohérence » au lieu de « consistance ».',
      'Question 5 : écrire l’inverse, « appliquer les opérations internes aux observateurs ».'],
    grading: '4 points pour les cinq questions, sans détail.',
    official: true
  });

  /* =====================================================================
     Partiel oct. 2019 (promo 2024), partie 1 sur 4 points
     ===================================================================== */
  X.push({
    id: 'p2019-ex1', exam: 'p2019', kind: 'partiel', order: 1, src: 'Partiel oct. 2019 · Ex 1',
    title: 'Un peu de cours… : interne, auxiliaire, signature, axiomes', pts: 4, topics: ['cours', 'hierarchie', 'precond', 'axiomes'], lvl: 1, time: 8,
    questions: [
      '<b>1.</b> Que retourne une opération interne ?',
      '<b>2.</b> Comment appelle-t-on une opération servant à spécifier le domaine de définition d’un autre ?',
      '<b>3.</b> Quels problèmes se posent lors de la conception de l’ensemble des axiomes ?',
      '<b>4.</b> Quelles zones constituent la signature d’un type abstrait ?',
      '<b>5.</b> Comment écrit-on des axiomes ?'],
    hints: [
      'Questions 1 et 4 : relis la hiérarchie des types (définis dans types, prédéfinis dans utilise) et l’ordre des zones d’une spécification.',
      'Question 2 : pense à est-présent, ajoutée seulement pour écrire la précondition de rechercher. Quel nom le cours donne-t-il à ce rôle ?',
      'Questions 3 et 5 : les deux propriétés que l’ensemble des axiomes doit respecter, puis la méthode du cours (qui s’applique à qui ?).'],
    solution: [
      { t: 'Question 1', html: '<p><strong>Un type défini</strong> : le type que l’on est en train de définir, déclaré dans la partie types. Exemple : cons : élément × liste → liste. Corrigé officiel : « Une opération interne retourne un type défini. »</p>' },
      { t: 'Question 2', html: '<p><strong>Une opération auxiliaire.</strong> Exemples : est-présent sert à écrire la précondition de rechercher, rechercher(e, λ) est-défini-ssi est-présent(e, λ) = vrai ; estinitialisé, celle de ième dans le vecteur. Ce n’est pas « une précondition » (ce n’est pas une opération), ni « une opération partielle » (c’est l’opération dont on décrit le domaine). Corrigé officiel : « […] est une opération auxiliaire ».</p>' },
      { t: 'Question 3', html: '<p><strong>La complétude et la consistance.</strong> Consistance : pas d’axiomes contradictoires. Complétude : avoir écrit suffisamment d’axiomes. Le mot du cours est « consistance », pas « cohérence ». Corrigé officiel : « […] sont la complétude et la consistance. »</p>' },
      { t: 'Question 4', html: '<p><strong>Les zones types, utilise et opérations.</strong> préconditions, axiomes et avec n’en font pas partie. Corrigé officiel : « […] les zones TYPES, UTILISE et OPERATIONS. »</p>' },
      { t: 'Question 5', html: '<p><strong>En appliquant les observateurs aux opérations internes.</strong> Exemple : sommet(empiler(p, e)) = e. L’observateur sommet est à l’extérieur, l’opération interne empiler à l’intérieur. Corrigé officiel : « Nous écrivons des axiomes en appliquant des observateurs aux opérations internes ».</p>' }],
    answer: { html: '<ol><li>Un type défini.</li><li>Une opération auxiliaire.</li><li>La complétude et la consistance.</li><li>Les zones types, utilise et opérations.</li><li>En appliquant des observateurs aux opérations internes.</li></ol>' +
      '<p><a href="../qcm/index.html#taa-p2019">Les questions de ce sujet dans le QCM →</a></p>' },
    traps: [
      'Inverser opération interne (résultat de type défini) et observateur (résultat de type prédéfini).',
      'Question 2 : répondre « une précondition » ou « une opération partielle ».',
      'Question 3 : écrire « cohérence » au lieu de « consistance ».',
      'Question 4 : oublier utilise, ou ajouter préconditions, axiomes, avec.',
      'Question 5 : écrire l’inverse, « appliquer les opérations internes aux observateurs ».'],
    grading: '4 points pour les cinq questions, sans détail.',
    official: true
  });

  /* =====================================================================
     Contrôle S1# du 23 avril 2019 (promo 2024, groupe S1#), 2 h sur 20 points
     ===================================================================== */
  X.push({
    id: 'p2019d-ex1', exam: 'p2019d', kind: 'partiel', order: 1, src: 'Partiel S1# avr. 2019 · Ex 1',
    title: 'Vecteur : deux erreurs à corriger, puis réinitialise', pts: 6, topics: ['axiomes', 'autres', 'precond'], lvl: 3, time: 25,
    intro: '<p>Supposons le type abstrait algébrique <em>Vecteur</em> vu en cours rappelé ci-dessous.</p>',
    specs: [{ code: VECTEUR }],
    questions: [
      '<b>1.</b> Cette définition est incorrecte. En effet l’ensemble des axiomes donné présente deux problèmes. Pour chacun d’eux, vous préciserez sa nature, vous le détaillerez et vous proposerez ensuite une solution pour le régler.',
      '<b>2.</b> Maintenant que les problèmes sont réglés, nous sommes à nouveau en possession du type abstrait algébrique <em>Vecteur</em>. On se propose alors de faire une extension à ce type en définissant une nouvelle opération : <em>réinitialise</em>. Celle-ci nous permettra de remettre un emplacement du vecteur en état initial (à savoir : <em>non initialisé</em>). Son profil est le suivant : <code>réinitialise : vecteur × entier → vecteur</code>',
      '<b>(a)</b> Précisez l’éventuel domaine de définition de cette opération (les préconditions).',
      '<b>(b)</b> Donner les axiomes définissant de manière suffisamment complète cette opération.'],
    hints: [
      'Deux natures de problème seulement : un axiome qui manque (complétude) ou deux axiomes qui se contredisent (consistance). Pour chaque observateur, vérifie qu’il est appliqué à vect et à modifième.',
      'Regarde les deux axiomes d’estinitialisé sur modifième : que donne chacun quand j = i ?',
      'Question 2 : applique à réinitialise tous les observateurs du type (estinitialisé, ième, borneinf, bornesup), en séparant la case i des autres cases.'],
    solution: [
      { t: 'La méthode', html: '<p>On passe en revue chaque observateur (ième, estinitialisé, borneinf, bornesup) appliqué à chaque opération interne (vect, modifième). borneinf et bornesup sont complets : un axiome sur vect, un sur modifième. ième n’a pas d’axiome sur vect, et c’est normal : sa précondition demande une case initialisée. Il reste estinitialisé.</p>' },
      { t: 'Problème 1 : complétude', html: '<p><strong>Nature</strong> : complétude, il manque un axiome. <strong>Détail</strong> : aucun axiome n’applique l’observateur estinitialisé à vect. On ne sait donc pas si une case d’un vecteur neuf est initialisée, ni si ième(vect(i, j), k) est défini, puisque sa précondition utilise estinitialisé. <strong>Solution</strong> : ajouter cet axiome.</p>',
        spec: sp('axiomes', '    estinitialisé(vect(i, j), k) = faux') },
      { t: 'Problème 2 : consistance', html: '<p><strong>Nature</strong> : consistance, deux axiomes se contredisent. <strong>Détail</strong> : le second axiome d’estinitialisé sur modifième n’exclut pas j = i. Pour j = i, il donne estinitialisé(modifième(v, i, e), i) = estinitialisé(v, i), alors que le premier donne vrai. Exemple : v = vect(1, 3) et i = j = 2 donnent vrai d’un côté, faux de l’autre (une fois le premier problème corrigé). <strong>Solution</strong> : ajouter « &amp; i ≠ j » à sa condition.</p>',
        spec: sp('axiomes', '    borneinf(v) ≤ i ≤ bornesup(v) & borneinf(v) ≤ j ≤ bornesup(v) & i ≠ j', '            ⇒ estinitialisé(modifième(v, i, e), j) = estinitialisé(v, j)') },
      { t: 'Question 2 (a) : pas de précondition', html: '<p>On peut remettre à l’état initial n’importe quelle case entre les bornes, même une case déjà non initialisée : elle le reste. Comme pour modifième, la condition sur i se place dans les axiomes. Le corrigé officiel : « Il n’y a pas de préconditions. »</p>' },
      { t: 'Question 2 (b) : les axiomes', html: '<p>réinitialise rend un vecteur : c’est une opération interne. On lui applique les quatre observateurs :</p>' +
        '<ul><li>estinitialisé : faux pour la case i, inchangé pour les autres cases (j ≠ i) ;</li><li>ième : inchangé pour j ≠ i ;</li><li>borneinf et bornesup : inchangés.</li></ul>' +
        '<p>Pas d’axiome pour ième(réinitialise(v, i), i) : ce terme est indéfini, car la précondition de ième demande estinitialisé = vrai. Si la case j n’était pas initialisée, les deux membres du troisième axiome sont indéfinis : pas de contradiction.</p>' },
      { t: 'Variantes acceptées', html: '<ul><li>Une précondition réinitialise(v, i) est-défini-ssi borneinf(v) ≤ i ≤ bornesup(v), puis des axiomes sans cette condition : défendable, mais le corrigé dit qu’il n’y a pas de préconditions.</li><li>Deux axiomes, i &lt; j et j &lt; i, au lieu de i ≠ j.</li></ul>' },
      { t: 'Le corrigé officiel', html: '<p>Notre réponse le suit ; il contient seulement quelques coquilles (« dans les postulat », « element », « Entier »).</p>' }],
    answer: { html: '<p><strong>Question 1.</strong> Complétude : ajouter estinitialisé(vect(i, j), k) = faux. Consistance : ajouter « &amp; i ≠ j » au second axiome d’estinitialisé sur modifième.</p><p><strong>Question 2.</strong> (a) Aucune précondition. (b) Axiomes :</p>',
      spec: sp('axiomes',
        '    borneinf(v) ≤ i ≤ bornesup(v) ⇒ estinitialisé(réinitialise(v, i), i) = faux',
        '    borneinf(v) ≤ i ≤ bornesup(v) & borneinf(v) ≤ j ≤ bornesup(v) & i ≠ j',
        '            ⇒ estinitialisé(réinitialise(v, i), j) = estinitialisé(v, j)',
        '    borneinf(v) ≤ i ≤ bornesup(v) & borneinf(v) ≤ j ≤ bornesup(v) & i ≠ j',
        '            ⇒ ième(réinitialise(v, i), j) = ième(v, j)',
        '    borneinf(réinitialise(v, i)) = borneinf(v)',
        '    bornesup(réinitialise(v, i)) = bornesup(v)',
        'avec', '    vecteur v', '    entier i, j') },
    traps: [
      'Croire que l’erreur porte sur ième ou sur les bornes : seuls les axiomes d’estinitialisé sont fautifs.',
      'Confondre les deux natures : un axiome qui manque, c’est la complétude ; deux axiomes qui se contredisent, c’est la consistance.',
      'Écrire un axiome pour ième(réinitialise(v, i), i) : ce terme est indéfini.',
      'Inventer la précondition estinitialisé(v, i) = vrai : réinitialiser une case vide n’est pas une erreur.',
      'Oublier borneinf et bornesup : sans eux, on ne sait plus si les bornes changent (défaut de complétude).',
      'Oublier « i ≠ j » dans les nouveaux axiomes : on recrée le problème 2.'],
    grading: '6 points pour l’exercice, sans détail par question.',
    official: true
  });

  /* =====================================================================
     Partiel oct. 2018 (promo 2023), partie 1 sur 5 points ; repris mot pour mot en 2020
     ===================================================================== */
  X.push({
    id: 'p2018-ex1', exam: 'p2018', kind: 'partiel', order: 1, src: 'Partiels 2018 et 2020 · Ex 1',
    title: 'Listes récursives : rechercher un élément, concaténer', pts: 5, topics: ['axiomes', 'liste-rec', 'precond'], lvl: 2, time: 20,
    intro: '<p>Supposons le type abstrait algébrique <em>Liste récursive</em> vu en cours et rappelé ci-dessous.</p>' +
      '<p>On se propose d’étendre les propriétés de ce type en lui permettant :</p><ul><li>de rechercher un élément dans une liste</li><li>de concaténer deux listes.</li></ul>' +
      '<p>La recherche d’un élément parmi ceux d’une liste ne retournera la place correspondante à celui-ci que s’il existe. Dès lors nous avons deux opérations pour la recherche, celle qui détermine la présence effective de l’élément et celle qui détermine la place de ce dernier s’il est présent. La concaténation n’a quant à elle besoin d’aucune opération auxiliaire. Nous considérerons donc les trois opérations suivantes :</p>',
    specs: [
      { code: sp('opérations', '    est-présent : élément × liste → booléen', '    rechercher : élément × liste → place.', '', '    concaténer : liste × liste → liste') },
      { code: REC_PLACES, cap: 'Le type <em>Liste récursive</em> rappelé par le sujet.' }],
    questions: [
      '<b>1.</b> Donner les axiomes déduisant une valeur pour la recherche d’un élément <em>e</em> parmi ceux d’une liste récursive λ. Vous préciserez les préconditions s’il y en a.',
      '<b>2.</b> Donner les axiomes déduisant une valeur pour l’opération de concaténation de deux listes récursives λ et λ2. Vous préciserez les préconditions s’il y en a.'],
    hints: [
      'Classe d’abord les trois opérations : est-présent rend un booléen ; rechercher n’a de sens que si l’élément est présent ; concaténer rend une liste. Lesquelles sont partielles ?',
      'Pour est-présent, applique-la aux deux façons de construire une liste : listevide et cons(e′, λ). Dans le cas cons, sépare e = e′ et e ≠ e′.',
      'Pour concaténer, raisonne sur la première liste : que vaut concaténer(listevide, λ2) ? Et concaténer(cons(e, λ), λ2) ?'],
    solution: [
      { t: 'Question 1 : est-présent', html: '<p>est-présent rend un booléen, un type prédéfini : c’est un observateur, défini pour toute liste. On l’applique aux deux façons de construire une liste :</p>' +
        '<ul><li>listevide : aucun élément, donc faux ;</li><li>cons(e′, λ) avec e = e′ : e est en tête, donc vrai ;</li><li>cons(e′, λ) avec e ≠ e′ : on cherche plus loin, dans λ.</li></ul>' +
        '<p>est-présent utilise le type booléen : ajoute-le dans utilise.</p>',
        spec: sp('axiomes', '    est-présent(e, listevide) = faux', '    e = e′ ⇒ est-présent(e, cons(e′, λ)) = vrai', '    e ≠ e′ ⇒ est-présent(e, cons(e′, λ)) = est-présent(e, λ)') },
      { t: 'Question 1 : rechercher', html: '<p>rechercher n’a de sens que si e est dans la liste : c’est une opération partielle. Sa précondition utilise est-présent, qui sert d’opération auxiliaire. Un axiome dit ensuite que la place rendue contient e.</p>',
        spec: sp('préconditions', '    rechercher(e, λ) est-défini-ssi est-présent(e, λ) = vrai', 'axiomes', '    contenu(rechercher(e, λ)) = e') },
      { t: 'Pour aller plus loin : quelle place ?', html: '<p>Si e figure plusieurs fois, contenu(rechercher(e, λ)) = e (l’axiome du corrigé officiel) ne dit pas quelle place est rendue. Pour rendre la première occurrence, tu peux ajouter ces deux axiomes, ou les mettre à sa place. Dans le cas e ≠ e′, la place trouvée dans λ est aussi une place de cons(e′, λ) : c’est ce que dit l’axiome du cours succ(tête(λ)) = tête(fin(λ)).</p>',
        spec: sp('axiomes', '    e = e′ ⇒ rechercher(e, cons(e′, λ)) = tête(cons(e′, λ))', '    e ≠ e′ ⇒ rechercher(e, cons(e′, λ)) = rechercher(e, λ)') },
      { t: 'Question 2 : concaténer', html: '<p>concaténer est définie pour tout couple de listes, vides comprises : <strong>aucune précondition</strong>. On raisonne sur la première liste. Si elle est vide, le résultat est λ2 ; sinon, sa tête reste en tête et on concatène le reste.</p>' +
        '<p>Exemple : concaténer(cons(a, cons(b, listevide)), λ2) = cons(a, concaténer(cons(b, listevide), λ2)) = cons(a, cons(b, λ2)).</p>',
        spec: sp('axiomes', '    concaténer(listevide, λ2) = λ2', '    concaténer(cons(e, λ), λ2) = cons(e, concaténer(λ, λ2))') },
      { t: 'Variantes acceptées', html: '<ul><li>concaténer avec premier et fin, en gardant le cas listevide : λ ≠ listevide ⇒ concaténer(λ, λ2) = cons(premier(λ), concaténer(fin(λ), λ2)).</li><li>Ajouter concaténer(λ, listevide) = λ : c’est vrai (une conséquence des deux axiomes), mais inutile.</li></ul>' },
      { t: 'Le corrigé officiel', html: '<p>Il donne ces axiomes (2018, repris tel quel en 2020), mais il n’ajoute pas booléen dans utilise et son commentaire parle de « la liste λ » pour un axiome qui écrit λ2.</p>' }],
    answer: { html: '<p>Une seule précondition, pour rechercher : est-présent et concaténer sont définies partout.</p>',
      spec: sp('utilise', '    élément, booléen', 'préconditions',
        '    rechercher(e, λ) est-défini-ssi est-présent(e, λ) = vrai', 'axiomes',
        '    est-présent(e, listevide) = faux',
        '    e = e′ ⇒ est-présent(e, cons(e′, λ)) = vrai',
        '    e ≠ e′ ⇒ est-présent(e, cons(e′, λ)) = est-présent(e, λ)',
        '    contenu(rechercher(e, λ)) = e',
        '    concaténer(listevide, λ2) = λ2',
        '    concaténer(cons(e, λ), λ2) = cons(e, concaténer(λ, λ2))',
        'avec', '    liste λ, λ2', '    élément e, e′') },
    traps: [
      'Prendre λ ≠ listevide comme précondition de rechercher : elle laisse passer les listes où e est absent.',
      'Écrire le troisième axiome d’est-présent sans « e ≠ e′ » : quand e est en tête et absent du reste, deux axiomes donnent vrai et faux (défaut de consistance).',
      'Inventer une précondition pour est-présent ou pour concaténer : les deux sont définies partout.',
      'Échanger les listes dans l’appel récursif, cons(e, concaténer(λ2, λ)), ou raisonner sur la deuxième liste : l’ordre des éléments n’est plus conservé.',
      'Oublier le cas de base concaténer(listevide, λ2) = λ2 : aucune concaténation ne se calcule jusqu’au bout (défaut de complétude).'],
    grading: '5 points pour l’exercice (questions 1 et 2, sans détail).',
    official: true
  });

  /* =====================================================================
     Partiel nov. 2017 (promo 2022), contrôle unique de 2 h sur 20 points.
     Pas de corrigé (feuilles de réponses vierges). L’exercice 1 est retombé en 2021, avec un corrigé officiel.
     ===================================================================== */
  X.push({
    id: 'p2017-ex1', exam: 'p2017', kind: 'partiel', order: 1, src: 'Partiels 2017 et 2021 · Ex 1',
    title: 'Liste itérative : modifier', pts: 2, topics: ['axiomes', 'liste-iter', 'precond'], lvl: 2, time: 10,
    intro: '<p>Supposons le type abstrait algébrique <em>liste itérative</em> vu en cours et dont la signature est rappelée ci-dessous.</p>' +
      '<p>On se propose de faire une extension à ce type en définissant une nouvelle opération : <em>modifier</em>. Celle-ci nous permettra de changer la valeur d’un élément existant. Son profil est le suivant :</p>',
    specs: [
      { code: sp('opérations', '    modifier : liste × entier × élément → liste'), cap: 'où <em>modifier(l,i,e)</em> modifie la valeur du i<sup>ème</sup> élément de la liste <em>l</em> en le remplaçant par l’élément <em>e</em>.' },
      { code: ITER_2017, cap: 'La signature de la liste itérative rappelée par le sujet.' }],
    questions: [
      '<b>1.</b> Précisez l’éventuel domaine de définition de cette opération.',
      '<b>2.</b> Donner les axiomes définissant de manière suffisamment complète cette opération.'],
    hints: [
      'Question 1 : modifier change un élément qui existe déjà. Pour quels rangs i y a-t-il un élément à changer ? Compare avec les préconditions d’insérer et de supprimer.',
      'Question 2 : modifier rend une liste, c’est une opération interne. Applique-lui les observateurs de la liste itérative : longueur, puis ième.',
      'Pour ième(modifier(λ, i, e), k), sépare deux cas qui ne se recouvrent pas : k = i et k ≠ i.'],
    solution: [
      { t: 'La méthode', html: '<p>modifier rend une liste, le type défini : c’est une opération interne. Pour dire ce qu’elle fait, on lui applique les observateurs de la liste itérative. Une liste itérative est entièrement décrite par sa longueur et ses ième : ce sont ces deux observateurs qu’il faut appliquer à modifier(λ, i, e).</p>' },
      { t: 'Question 1 : la précondition', html: '<p>On ne peut changer qu’un élément existant, donc de rang 1 à longueur(λ) : modifier est partielle. C’est le domaine de supprimer, pas celui d’insérer (1 ≤ i ≤ longueur(λ) + 1) : modifier ne crée pas de case. λ ≠ liste-vide est redondant avec 1 ≤ i ≤ longueur(λ), puisque longueur(liste-vide) = 0 ; le corrigé l’écrit quand même.</p>',
        spec: sp('préconditions', '    modifier(λ, i, e) est-défini-ssi λ ≠ liste-vide & 1 ≤ i ≤ longueur(λ)') },
      { t: 'Question 2 : longueur', html: '<p>Changer un élément ne change pas le nombre d’éléments :</p>', spec: sp('axiomes', '    longueur(modifier(λ, i, e)) = longueur(λ)') },
      { t: 'Question 2 : ième, deux cas', html: '<p>On observe le rang k du résultat :</p><ul><li>k = i : c’est la case modifiée, elle contient e ;</li><li>k ≠ i, entre 1 et longueur(λ) : la case n’a pas changé, elle contient ième(λ, k).</li></ul>' +
        '<p>Sans « k ≠ i », le second axiome s’appliquerait aussi à k = i et donnerait ième(λ, i), alors que le premier donne e : deux valeurs pour un même terme, un défaut de consistance.</p>',
        spec: sp('axiomes', '    k = i ⇒ ième(modifier(λ, i, e), k) = e', '    1 ≤ k ≤ longueur(λ) & k ≠ i ⇒ ième(modifier(λ, i, e), k) = ième(λ, k)') },
      { t: 'Ce qu’on n’écrit pas', html: '<p>Rien pour accès et contenu : l’axiome du type, contenu(accès(λ, k)) = ième(λ, k), s’applique déjà à modifier(λ, i, e). Et modifier ne décale aucun rang : pas de ième(λ, k + 1) ni de ième(λ, k − 1), comme pour insérer ou supprimer.</p>' },
      { t: 'Variantes acceptées', html: '<ul><li>Pas de précondition, mais la condition 1 ≤ i ≤ longueur(λ) en tête de chaque axiome. Le corrigé de 2021 le dit : « Ne pas la préciser ici n’est pas grave si le postulat existe au niveau des axiomes. »</li>' +
        '<li>ième(modifier(λ, i, e), i) = e au lieu de k = i ⇒ ième(modifier(λ, i, e), k) = e.</li>' +
        '<li>Deux axiomes, 1 ≤ k &lt; i et i &lt; k ≤ longueur(λ), au lieu de k ≠ i.</li>' +
        '<li>modifier(λ, i, e) = insérer(supprimer(λ, i), i, e) est juste, mais ce n’est pas la méthode du cours : on n’y applique aucun observateur. Ne la donne pas seule.</li></ul>' }],
    answer: { html: '<p>Celle du corrigé officiel de 2021 (le sujet de 2017 n’en a pas), écrite avec λ :</p>',
      spec: sp('préconditions', '    modifier(λ, i, e) est-défini-ssi λ ≠ liste-vide & 1 ≤ i ≤ longueur(λ)', 'axiomes',
        '    longueur(modifier(λ, i, e)) = longueur(λ)',
        '    k = i ⇒ ième(modifier(λ, i, e), k) = e',
        '    1 ≤ k ≤ longueur(λ) & k ≠ i ⇒ ième(modifier(λ, i, e), k) = ième(λ, k)',
        'avec', '    liste λ', '    entier i, k', '    élément e') },
    traps: [
      'Recopier la précondition d’insérer (1 ≤ i ≤ longueur(λ) + 1) : modifier ne crée pas de case.',
      'Oublier « k ≠ i » dans le dernier axiome : pour k = i, deux axiomes donnent e et ième(λ, i). C’est un défaut de consistance dès que e ≠ ième(λ, i).',
      'Oublier l’axiome sur longueur : on ne sait plus combien d’éléments a la liste (défaut de complétude).',
      'Décaler les rangs comme pour insérer ou supprimer (ième(λ, k + 1), ième(λ, k − 1)) : modifier ne décale rien.',
      'Écrire un axiome sans observateur à gauche, comme « modifier(λ, i, e) = … » seul, ou seulement sur contenu(accès(…)).'],
    grading: '2 points pour l’exercice, sans détail par question (en 2017 comme en 2021).',
    official: true
  });

  X.push({
    id: 'p2017-ex2', exam: 'p2017', kind: 'partiel', order: 2, src: 'Partiel nov. 2017 · Ex 2',
    title: 'Liste récursive arrière', pts: 4, topics: ['axiomes', 'liste-rec', 'precond'], lvl: 3, time: 20,
    intro: '<p>Supposons le type abstrait algébrique <em>liste récursive</em> vu en cours et dont la signature est rappelée ci-dessous.</p>' +
      '<p>On se propose de définir le type <em>liste récursive arrière</em> en remplaçant les opérations <em>tête</em>, <em>fin</em>, <em>premier</em> et <em>succ</em> par les opérations <em>queue</em>, <em>début</em>, <em>dernier</em> et <em>pred</em> telles que :</p>' +
      '<ul><li>L’opération <em>queue</em> donne, pour une liste non vide, la dernière place de la liste,</li>' +
      '<li>L’opération <em>début</em> donne, pour une liste non vide, la liste privée de son dernier élément,</li>' +
      '<li>L’opération <em>dernier</em> donne, pour une liste non vide, le dernier élément de la liste,</li>' +
      '<li>L’opération <em>pred</em> donne la place précédente d’une place dans la liste.</li></ul>',
    specs: [{ code: REC_2017 }],
    questions: [
      '<b>1.</b> Précisez les éventuels domaines de définitions de ces opérations.',
      '<b>2.</b> Donner les axiomes définissant de manière suffisamment complète le type <em>liste récursive arrière</em>.'],
    hints: [
      'Le sujet ne remplace pas cons : elle garde son sens du cours et ajoute toujours en tête. On construit donc par la tête et on observe par la fin, comme dans une file.',
      'Pour dernier et début, traite les deux cas de cons(e, λ) : λ vide (e est alors le seul élément) et λ non vide (le dernier élément est dans λ).',
      'Pour les places, écris le miroir des deux axiomes du cours : premier(λ) = contenu(tête(λ)) et succ(tête(λ)) = tête(fin(λ)).'],
    solution: [
      { t: 'Lecture retenue', html: '<p>Le sujet remplace tête, fin, premier et succ, mais garde cons. On lui laisse son sens du cours : cons(e, λ) ajoute e en tête. On construit donc par la tête et on observe par la fin. C’est le schéma des files : on ajoute d’un côté, on lit de l’autre, d’où un cas « liste vide » et un cas « liste non vide ».</p>' },
      { t: 'Question 1 : les préconditions', html: '<p>queue, début et dernier n’ont de sens que pour une liste non vide. pred n’est pas définie sur la première place, mais aucune opération ne permet de tester « première place » : comme succ dans le cours, on ne lui met pas de précondition. cons est définie partout.</p>',
        spec: sp('préconditions', '    queue(λ) est-défini-ssi λ ≠ liste-vide', '    début(λ) est-défini-ssi λ ≠ liste-vide', '    dernier(λ) est-défini-ssi λ ≠ liste-vide') },
      { t: 'Question 2 : les places', html: '<p>Les deux axiomes sur les places sont le miroir de ceux du cours, premier(λ) = contenu(tête(λ)) et succ(tête(λ)) = tête(fin(λ)) :</p>',
        spec: sp('axiomes', '    dernier(λ) = contenu(queue(λ))', '    pred(queue(λ)) = queue(début(λ))') },
      { t: 'Question 2 : dernier et début sur cons', html: '<p>On applique dernier et début aux deux cas de cons(e, λ) :</p>' +
        '<ul><li>λ = liste-vide : e est le seul élément. Il est le dernier, et sans lui il ne reste rien.</li><li>λ ≠ liste-vide : le dernier élément est celui de λ. Pour début, on retire le dernier élément de λ et on garde e en tête.</li></ul>',
        spec: sp('axiomes', '    dernier(cons(e, liste-vide)) = e', '    λ ≠ liste-vide ⇒ dernier(cons(e, λ)) = dernier(λ)', '    début(cons(e, liste-vide)) = liste-vide', '    λ ≠ liste-vide ⇒ début(cons(e, λ)) = cons(e, début(λ))') },
      { t: 'Vérifier : lire la liste à l’envers', html: '<p>Avec λ = cons(a, cons(b, cons(c, liste-vide))) :</p>' +
        '<ul><li>dernier(λ) = dernier(cons(b, cons(c, liste-vide))) = dernier(cons(c, liste-vide)) = c ;</li>' +
        '<li>début(λ) = cons(a, début(cons(b, cons(c, liste-vide)))) = cons(a, cons(b, liste-vide)) ;</li>' +
        '<li>contenu(pred(queue(λ))) = contenu(queue(début(λ))) = dernier(début(λ)) = b.</li></ul>' +
        '<p>De même, contenu(pred<sup>k</sup>(queue(λ))) = dernier(début<sup>k</sup>(λ)) : chaque élément se lit en partant de la fin, et dernier, début se calculent pour toute liste. Les axiomes sont complets.</p>' },
      { t: 'L’autre lecture possible', html: '<p>Sans corrigé, une seconde lecture existe : dans le type arrière, cons(e, λ) placerait e <em>après</em> le dernier élément. Les axiomes deviennent un simple renommage : début(cons(e, λ)) = λ et dernier(cons(e, λ)) = e, avec les deux mêmes axiomes sur les places. Cette lecture change le sens de cons sans que le sujet le dise : si tu la choisis, écris l’hypothèse en une phrase. Avec cons en tête, ces deux axiomes sont faux.</p>' }],
    answer: { html: '<p>Lecture retenue : cons garde son sens du cours (ajout en tête).</p>',
      spec: sp('types', '    liste, place', 'utilise', '    élément', 'opérations',
        '    liste-vide : → liste',
        '    cons       : élément × liste → liste',
        '    queue      : liste → place',
        '    début      : liste → liste',
        '    dernier    : liste → élément',
        '    contenu    : place → élément',
        '    pred       : place → place',
        'préconditions',
        '    queue(λ) est-défini-ssi λ ≠ liste-vide',
        '    début(λ) est-défini-ssi λ ≠ liste-vide',
        '    dernier(λ) est-défini-ssi λ ≠ liste-vide',
        'axiomes',
        '    dernier(λ) = contenu(queue(λ))',
        '    pred(queue(λ)) = queue(début(λ))',
        '    dernier(cons(e, liste-vide)) = e',
        '    λ ≠ liste-vide ⇒ dernier(cons(e, λ)) = dernier(λ)',
        '    début(cons(e, liste-vide)) = liste-vide',
        '    λ ≠ liste-vide ⇒ début(cons(e, λ)) = cons(e, début(λ))',
        'avec', '    liste λ', '    élément e') },
    traps: [
      'Écrire début(cons(e, λ)) = λ et dernier(cons(e, λ)) = e alors que cons ajoute en tête : c’est la lecture « miroir », valable seulement si tu l’annonces.',
      'Oublier le cas cons(e, liste-vide) : dernier(liste-vide) est indéfini, donc l’axiome récursif seul ne conclut jamais (défaut de complétude).',
      'Écrire queue(cons(e, λ)) = queue(λ) : ces deux places ne sont pas les mêmes. En remontant par pred, on atteint e dans cons(e, λ), jamais dans λ.',
      'Garder premier, fin, tête ou succ dans le nouveau type : le sujet dit qu’on les remplace.',
      'Mettre une précondition sur cons : cons est définie partout.'],
    grading: '4 points pour l’exercice, sans détail.',
    official: false, note: 'Pas de corrigé officiel (feuilles de réponses vierges) : correction rédigée et vérifiée sur un modèle, avec la lecture retenue.'
  });
})();
