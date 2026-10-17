/* TAA — notions des exercices et sujets d’examen connus.
   TAA_TOPICS : notions (filtres de l’entraînement, tableau des annales).
   TAA_EXAMS  : sujets (clé pAAAA = année de l’examen ; promo = AAAA + 5), complétés avec l’analyse des annales.
     Un objet par sujet, du plus récent au plus ancien : toutes ses parties, TAA (topics, fiche d’exercice
     dans data/taa/ex-annales.js) et Caml (taa: false). p2019d est le contrôle n° 1 du groupe S1#
     (23 avril 2019, dossier « 2024# » des annales). PDF : clone d’Epidocs/Past-Exams, S1/Midterms/Algo. */
(function () {
  window.TAA_TOPICS = {
    'cours': 'Questions de cours',
    'hierarchie': 'Hiérarchie des opérations',
    'precond': 'Préconditions',
    'axiomes': 'Écrire des axiomes',
    'liste-rec': 'Listes récursives',
    'liste-iter': 'Listes itératives',
    'mystere': 'Opération mystère',
    'piles': 'Piles',
    'files': 'Files',
    'ensembles': 'Ensembles',
    'autres': 'Booléens, vecteurs, autres types'
  };

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Algo/';
  /* notions des exercices de types abstraits (les mêmes que sur leurs fiches) */
  var T_COURS = ['cours', 'hierarchie', 'precond', 'axiomes'];
  var T_REC = ['axiomes', 'liste-rec', 'precond'];
  var T_MODIFIER = ['axiomes', 'liste-iter', 'precond'];

  window.TAA_EXAMS = [
    { key: 'p2024', title: 'Partiel du 30 octobre 2024', meta: 'promo 2029 · épreuve TAA seule · 30 min · 10 points',
      taaPts: '10 / 10', note: 'Les types abstraits ont leur propre épreuve, à part de celle de Caml (1 h 30, sur 20) ; aucun corrigé dans les annales.',
      files: [{ t: 'Sujet TAA', url: PE + '2029/TAA/midterm-2029-s1-algo-subject-fr.pdf' },
        { t: 'Sujet Caml', url: PE + '2029/CAML/midterm-2029-s1-algo-subject-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste itérative : opération mystère', pts: 5, topics: ['mystere', 'liste-iter'], card: 'p2024-ex1' },
        { ex: '2', t: 'Liste récursive : supprime-sup', pts: 5, topics: T_REC, card: 'p2024-ex2' },
        { ex: '1', t: 'Vérification liste de listes', pts: 7, taa: false },
        { ex: '2', t: 'Tri insertion', pts: 9, taa: false },
        { ex: '3', t: 'Mystery', pts: 4, taa: false }] },

    { key: 'p2023', title: 'Partiel du 30 octobre 2023', meta: 'promo 2028 · épreuve TAA seule · durée non indiquée · 10 points',
      taaPts: '10 / 10', note: 'Pas de corrigé officiel : les annales contiennent une copie d’élève corrigée (08/10), dont la marge donne le barème de chaque question.',
      files: [{ t: 'Sujet TAA', url: PE + '2028/TAA/midterm-2028-s1-algo-subject-fr.pdf' },
        { t: 'Copie corrigée TAA (08/10)', url: PE + '2028/TAA/midterm-2028-s1-algo-correction-fr.pdf' },
        { t: 'Sujet Caml', url: PE + '2028/CAML/midterm-2028-s1-algo-subject-fr.pdf' },
        { t: 'Copie corrigée Caml (18/20)', url: PE + '2028/CAML/midterm-2028-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1a', t: 'Un peu de cours… (questions 1 à 4)', pts: 6, topics: ['cours', 'hierarchie', 'liste-iter'], card: 'p2023-ex1a' },
        { ex: '1b', t: 'Liste récursive : concaténer (question 5)', pts: 4, topics: T_REC, card: 'p2023-ex1b' },
        { ex: '1', t: 'Insertion multiple', pts: 6.5, taa: false },
        { ex: '2', t: 'Suppression doublons', pts: 5.5, taa: false },
        { ex: '3', t: 'Split', pts: 8, taa: false }] },

    { key: 'p2022', title: 'Partiel du 31 octobre 2022', meta: 'promo 2027 · partie 1 TAA sur 4, partie 2 Caml sur 16',
      taaPts: '4 / 20',
      files: [{ t: 'Sujet, partie 1', url: PE + '2027/midterm-2027-s1-algo-subject-part_1-fr.pdf' },
        { t: 'Sujet, partie 2', url: PE + '2027/midterm-2027-s1-algo-subject-part_2-fr.pdf' },
        { t: 'Corrigé', url: PE + '2027/midterm-2027-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Un peu de cours…', pts: 4, topics: ['cours', 'hierarchie', 'precond', 'liste-rec', 'liste-iter'], card: 'p2022-ex1' },
        { ex: '2', t: 'Insertion après', pts: 3.5, taa: false },
        { ex: '3', t: 'Position du maximum', pts: 4.5, taa: false },
        { ex: '4', t: 'Less', pts: 5, taa: false },
        { ex: '5', t: 'Mystery', pts: 3, taa: false }] },

    { key: 'p2021', title: 'Partiel du 4 novembre 2021', meta: 'promo 2026 · partie 1 TAA sur 6, partie 2 Caml sur 15',
      taaPts: '6 / 21', note: 'L’exercice 1 reprend mot pour mot celui de 2017 ; la partie 2 recommence à l’exercice 2, et les cadres de note totalisent 21 points.',
      files: [{ t: 'Sujet, partie 1', url: PE + '2026/midterm-2026-s1-algo-subject-part_1-fr.pdf' },
        { t: 'Sujet, partie 2', url: PE + '2026/midterm-2026-s1-algo-subject-part_2-fr.pdf' },
        { t: 'Corrigé', url: PE + '2026/midterm-2026-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste itérative : modifier', pts: 2, topics: T_MODIFIER, card: 'p2017-ex1' },
        { ex: '2', t: 'Un peu de cours…', pts: 4, topics: T_COURS, card: 'p2021-ex2' },
        { ex: '2', t: 'Suppression intervalle', pts: 6, taa: false },
        { ex: '3', t: 'Listes alternées', pts: 5, taa: false },
        { ex: '4', t: 'Mystery', pts: 4, taa: false }] },

    { key: 'p2020', title: 'Partiel du 9 novembre 2020', meta: 'promo 2025 · partie 1 TAA sur 5, partie 2 Caml sur 15',
      taaPts: '5 / 20', note: 'L’exercice de types abstraits reprend mot pour mot celui de 2018, avec le même corrigé.',
      files: [{ t: 'Sujet, partie 1', url: PE + '2025/midterm-2025-s1-algo-subject-part_1-fr.pdf' },
        { t: 'Sujet, partie 2', url: PE + '2025/midterm-2025-s1-algo-subject-part_2-fr.pdf' },
        { t: 'Corrigé', url: PE + '2025/midterm-2025-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste récursive : est-présent, rechercher, concaténer', pts: 5, topics: T_REC, card: 'p2018-ex1' },
        { ex: '2', t: 'Suppression', pts: 4, taa: false },
        { ex: '3', t: 'Insertion à la ième place', pts: 5, taa: false },
        { ex: '4', t: 'Recherche double', pts: 4, taa: false },
        { ex: '5', t: 'Mystery', pts: 2, taa: false }] },

    { key: 'p2019', title: 'Partiel du 28 octobre 2019', meta: 'promo 2024 · partie 1 TAA sur 4, partie 2 Caml sur 16',
      taaPts: '4 / 20', note: 'Le sujet porte seulement « Oct. 2019 » : la date vient de l’en-tête du corrigé.',
      files: [{ t: 'Sujet', url: PE + '2024/midterm-2024-s1-algo-subject-fr.pdf' },
        { t: 'Corrigé', url: PE + '2024/midterm-2024-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Un peu de cours…', pts: 4, topics: T_COURS, card: 'p2019-ex1' },
        { ex: '2', t: 'Dominos', pts: 4, taa: false },
        { ex: '3', t: 'Suppression du ième', pts: 5, taa: false },
        { ex: '4', t: 'for_all2', pts: 5, taa: false },
        { ex: '5', t: 'Mystery', pts: 2, taa: false }] },

    { key: 'p2019d', title: 'Contrôle du 23 avril 2019 (S1#)', meta: 'promo 2024, groupe S1# · contrôle unique · 2 h · 20 points',
      taaPts: '6 / 20', note: 'Contrôle n° 1 du groupe S1#, qui suit le S1 au second semestre : un sujet différent de celui d’octobre 2019, pas un rattrapage.',
      files: [{ t: 'Sujet', url: PE + '2024%23/midterm-2024%23-s1-algo-subject-fr.pdf' },
        { t: 'Feuille de réponses', url: PE + '2024%23/midterm-2024%23-s1-algo-answer_sheet-fr.pdf' },
        { t: 'Corrigé', url: PE + '2024%23/midterm-2024%23-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Vecteur : deux erreurs, puis réinitialise', pts: 6, topics: ['axiomes', 'autres', 'precond'], card: 'p2019d-ex1' },
        { ex: '2', t: 'Tri par insertion', pts: 7, taa: false },
        { ex: '3', t: 'Association', pts: 5, taa: false },
        { ex: '4', t: 'Mystery', pts: 2, taa: false }] },

    { key: 'p2018', title: 'Partiel du 29 octobre 2018', meta: 'promo 2023 · partie 1 TAA sur 5, partie 2 Caml sur 16',
      taaPts: '5 / 21', note: 'Les cadres de note totalisent 21 points, tel qu’imprimé ; l’exercice de types abstraits est retombé tel quel en 2020.',
      files: [{ t: 'Sujet', url: PE + '2023/midterm-2023-s1-algo-subject-fr.pdf' },
        { t: 'Corrigé', url: PE + '2023/midterm-2023-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste récursive : est-présent, rechercher, concaténer', pts: 5, topics: T_REC, card: 'p2018-ex1' },
        { ex: '2', t: 'is_image', pts: 4, taa: false },
        { ex: '3', t: 'Combien ?', pts: 4, taa: false },
        { ex: '4', t: 'Insertion à la ième place', pts: 5, taa: false },
        { ex: '5', t: 'Évaluations', pts: 3, taa: false }] },

    { key: 'p2017', title: 'Partiel du 6 novembre 2017', meta: 'promo 2022 · contrôle unique · 2 h · 20 points',
      taaPts: '6 / 20', note: 'Pas de corrigé : les annales n’ont que le sujet, scanné, et des feuilles de réponses vierges.',
      files: [{ t: 'Sujet', url: PE + '2022/midterm-2022-s1-algo-subject-fr.pdf' },
        { t: 'Feuilles de réponses (vierges)', url: PE + '2022/midterm-2022-s1-algo-answer_sheet-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste itérative : modifier', pts: 2, topics: T_MODIFIER, card: 'p2017-ex1' },
        { ex: '2', t: 'Liste récursive arrière', pts: 4, topics: T_REC, card: 'p2017-ex2' },
        { ex: '3', t: 'Association', pts: 4, taa: false },
        { ex: '4', t: 'for_all2', pts: 5, taa: false },
        { ex: '5', t: 'Combine it', pts: 5, taa: false }] }
  ];
  window.TAA_EX = window.TAA_EX || [];
})();
