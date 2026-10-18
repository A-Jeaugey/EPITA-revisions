/* Caml — notions des exercices et sujets d’examen connus.
   CAML_TOPICS : notions (filtres de l’entraînement, tableau des annales), communes aux fiches des sujets
     (data/caml/ex-annales.js) et à celles des exercices de l’année (data/caml/ex-td.js).
   CAML_EXAMS  : sujets d’algo de mi-semestre (clé pAAAA = année de l’examen ; promo = AAAA + 5), complétés avec
     l’analyse des annales. Un objet par sujet, du plus récent au plus ancien : title, meta, camlPts (part de Caml
     dans la note), note, files (PDF des annales, vérifiés sur disque dans un clone d’Epidocs/Past-Exams,
     S1/Midterms/Algo), parts : { ex, t, pts, topics, card (fiche de data/caml/ex-annales.js) } pour les exercices
     Caml, { ex, t, pts, caml: false } pour ceux de types abstraits (fiches dans data/taa/ex-annales.js).
     p2019d est le contrôle n° 1 du groupe S1# (23 avril 2019, dossier « 2024# » des annales).
     Trois exercices sont retombés tels quels et n’ont qu’une fiche : assoc (2017 et 2019d → p2019d-ex3),
     for_all2 (2017 et 2019 → p2019-ex4), insert_nth (2018 et 2020 → p2018-ex4). */
(function () {
  window.CAML_TOPICS = {
    'bases': 'Expressions et types',
    'fonctions': 'Fonctions et n-uplets',
    'filtrage': 'Filtrage',
    'exceptions': 'Exceptions',
    'recursivite': 'Raisonnement récursif',
    'listes': 'Listes',
    'construire': 'Construire une liste',
    'rangs': 'Rangs et positions',
    'listes-triees': 'Listes triées',
    'deux-listes': 'Deux listes',
    'accumulateur': 'Chapeau, accumulateur, compteur',
    'ordre-superieur': 'Ordre supérieur',
    'mystery': 'Mystery : lire du code',
    'evaluation': 'Réponse de Caml (types)'
  };

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Algo/';
  /* notions des exercices retombés (les mêmes que sur leurs fiches) */
  var T_ASSOC = ['listes', 'listes-triees', 'exceptions', 'filtrage', 'accumulateur'];
  var T_FORALL2 = ['listes', 'ordre-superieur', 'deux-listes', 'exceptions'];
  var T_INSERT_NTH = ['listes', 'rangs', 'exceptions', 'construire', 'filtrage'];

  window.CAML_EXAMS = [
    { key: 'p2024', title: 'Partiel du 30 octobre 2024', meta: 'promo 2029 · épreuve Caml seule · 1 h 30 · 20 points',
      camlPts: '20 / 20', note: 'Le format le plus proche de l’examen de cette année : une épreuve Caml à part (les types abstraits ont la leur, 30 min sur 10), 1 h 30, trois exercices. Aucun corrigé dans les annales : corrections rédigées et exécutées.',
      files: [{ t: 'Sujet Caml', url: PE + '2029/CAML/midterm-2029-s1-algo-subject-fr.pdf' },
        { t: 'Sujet TAA', url: PE + '2029/TAA/midterm-2029-s1-algo-subject-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Vérification liste de listes', pts: 7, topics: ['listes', 'exceptions', 'accumulateur'], card: 'p2024-ex1' },
        { ex: '2', t: 'Tri insertion', pts: 9, topics: ['listes', 'ordre-superieur', 'listes-triees', 'construire', 'recursivite'], card: 'p2024-ex2' },
        { ex: '3', t: 'Mystery', pts: 4, topics: ['listes', 'mystery', 'evaluation', 'accumulateur'], card: 'p2024-ex3' },
        { ex: '1', t: 'Liste itérative : opération mystère', pts: 5, caml: false },
        { ex: '2', t: 'Liste récursive : supprime-sup', pts: 5, caml: false }] },

    { key: 'p2023', title: 'Partiel du 30 octobre 2023', meta: 'promo 2028 · épreuve Caml seule · durée non indiquée · 20 points',
      camlPts: '20 / 20', note: 'Pas de corrigé officiel : les annales contiennent une copie d’élève notée 18/20, dont la marge donne le barème (6,5 ; 5,5 ; 8). Les types abstraits avaient leur propre épreuve, sur 10.',
      files: [{ t: 'Sujet Caml', url: PE + '2028/CAML/midterm-2028-s1-algo-subject-fr.pdf' },
        { t: 'Copie corrigée Caml (18/20)', url: PE + '2028/CAML/midterm-2028-s1-algo-correction-fr.pdf' },
        { t: 'Sujet TAA', url: PE + '2028/TAA/midterm-2028-s1-algo-subject-fr.pdf' },
        { t: 'Copie corrigée TAA (08/10)', url: PE + '2028/TAA/midterm-2028-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Insertion multiple', pts: 6.5, topics: ['listes', 'construire', 'exceptions', 'accumulateur', 'rangs'], card: 'p2023-ex1' },
        { ex: '2', t: 'Suppression doublons', pts: 5.5, topics: ['listes', 'construire', 'recursivite'], card: 'p2023-ex2' },
        { ex: '3', t: 'Split', pts: 8, topics: ['listes', 'construire', 'ordre-superieur', 'recursivite'], card: 'p2023-ex3' },
        { ex: '1a', t: 'Un peu de cours… (questions 1 à 4)', pts: 6, caml: false },
        { ex: '1b', t: 'Liste récursive : concaténer (question 5)', pts: 4, caml: false }] },

    { key: 'p2022', title: 'Partiel du 31 octobre 2022', meta: 'promo 2027 · partie 1 TAA sur 4, partie 2 Caml sur 16',
      camlPts: '16 / 20', note: 'Corrigé officiel (en français) pour toute la partie Caml ; il n’imprime pas les avertissements de Caml (Warning 8) que donnent less2 et le Mystery. Chaque exercice est suivi d’un cadre « Fonction Caml : ».',
      files: [{ t: 'Sujet, partie 1', url: PE + '2027/midterm-2027-s1-algo-subject-part_1-fr.pdf' },
        { t: 'Sujet, partie 2', url: PE + '2027/midterm-2027-s1-algo-subject-part_2-fr.pdf' },
        { t: 'Corrigé', url: PE + '2027/midterm-2027-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Un peu de cours…', pts: 4, caml: false },
        { ex: '2', t: 'Insertion après', pts: 3.5, topics: ['listes', 'ordre-superieur', 'construire', 'exceptions'], card: 'p2022-ex2' },
        { ex: '3', t: 'Position du maximum', pts: 4.5, topics: ['listes', 'accumulateur', 'rangs', 'exceptions'], card: 'p2022-ex3' },
        { ex: '4', t: 'Less', pts: 5, topics: ['listes', 'ordre-superieur', 'deux-listes', 'accumulateur', 'exceptions'], card: 'p2022-ex4' },
        { ex: '5', t: 'Mystery', pts: 3, topics: ['listes', 'mystery', 'evaluation', 'accumulateur'], card: 'p2022-ex5' }] },

    { key: 'p2021', title: 'Partiel du 4 novembre 2021', meta: 'promo 2026 · partie 1 TAA sur 6, partie 2 Caml sur 15',
      camlPts: '15 / 21', note: 'La partie 2 recommence à l’exercice 2 (la partie 1 en a deux, numérotés 1 et 2), et les cadres de note totalisent 21 points. Corrigé officiel en français ; le message « remove_internal » de l’exercice 2 est une coquille du sujet, reprise par le corrigé.',
      files: [{ t: 'Sujet, partie 1', url: PE + '2026/midterm-2026-s1-algo-subject-part_1-fr.pdf' },
        { t: 'Sujet, partie 2', url: PE + '2026/midterm-2026-s1-algo-subject-part_2-fr.pdf' },
        { t: 'Corrigé', url: PE + '2026/midterm-2026-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste itérative : modifier', pts: 2, caml: false },
        { ex: '2', t: 'Un peu de cours…', pts: 4, caml: false },
        { ex: '2', t: 'Suppression intervalle', pts: 6, topics: ['listes', 'rangs', 'exceptions', 'construire', 'accumulateur'], card: 'p2021-ex2' },
        { ex: '3', t: 'Listes alternées', pts: 5, topics: ['listes', 'deux-listes', 'construire', 'recursivite'], card: 'p2021-ex3' },
        { ex: '4', t: 'Mystery', pts: 4, topics: ['listes', 'mystery', 'evaluation', 'ordre-superieur', 'deux-listes'], card: 'p2021-ex4' }] },

    { key: 'p2020', title: 'Partiel du 9 novembre 2020', meta: 'promo 2025 · partie 1 TAA sur 5, partie 2 Caml sur 15',
      camlPts: '15 / 20', note: 'L’exercice 3 reprend mot pour mot celui de 2018 (insertion à la ième place). Le corrigé officiel nomme search v1 v2 l la fonction search_both list a b de l’exercice 4 : à l’examen, garde le nom et l’ordre des paramètres de l’énoncé.',
      files: [{ t: 'Sujet, partie 1', url: PE + '2025/midterm-2025-s1-algo-subject-part_1-fr.pdf' },
        { t: 'Sujet, partie 2', url: PE + '2025/midterm-2025-s1-algo-subject-part_2-fr.pdf' },
        { t: 'Corrigé', url: PE + '2025/midterm-2025-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste récursive : est-présent, rechercher, concaténer', pts: 5, caml: false },
        { ex: '2', t: 'Suppression', pts: 4, topics: ['listes', 'listes-triees', 'construire'], card: 'p2020-ex2' },
        { ex: '3', t: 'Insertion à la ième place', pts: 5, topics: T_INSERT_NTH, card: 'p2018-ex4' },
        { ex: '4', t: 'Recherche double', pts: 4, topics: ['listes', 'accumulateur'], card: 'p2020-ex4' },
        { ex: '5', t: 'Mystery', pts: 2, topics: ['listes', 'mystery', 'evaluation'], card: 'p2020-ex5' }] },

    { key: 'p2019', title: 'Partiel du 28 octobre 2019', meta: 'promo 2024 · partie 1 TAA sur 4, partie 2 Caml sur 16',
      camlPts: '16 / 20', note: 'L’exercice 4 reprend celui de 2017 (for_all2), presque mot pour mot. Le corrigé officiel de l’exercice 3 déclenche Failure au lieu d’Invalid_argument pour un rang négatif ou nul : voir la fiche.',
      files: [{ t: 'Sujet', url: PE + '2024/midterm-2024-s1-algo-subject-fr.pdf' },
        { t: 'Corrigé', url: PE + '2024/midterm-2024-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Un peu de cours…', pts: 4, caml: false },
        { ex: '2', t: 'Dominos', pts: 4, topics: ['listes', 'filtrage'], card: 'p2019-ex2' },
        { ex: '3', t: 'Suppression du ième', pts: 5, topics: ['listes', 'rangs', 'exceptions', 'construire', 'accumulateur'], card: 'p2019-ex3' },
        { ex: '4', t: 'for_all2', pts: 5, topics: T_FORALL2, card: 'p2019-ex4' },
        { ex: '5', t: 'Mystery', pts: 2, topics: ['listes', 'mystery', 'evaluation', 'deux-listes'], card: 'p2019-ex5' }] },

    { key: 'p2019d', title: 'Contrôle du 23 avril 2019 (S1#)', meta: 'promo 2024, groupe S1# · contrôle unique · 2 h · 20 points',
      camlPts: '14 / 20', note: 'Contrôle n° 1 du groupe S1#, qui suit le S1 au second semestre : un sujet différent de celui d’octobre 2019, pas un rattrapage. L’exercice 3 reprend mot pour mot celui de novembre 2017 (assoc). Corrigé officiel « Version profs ».',
      files: [{ t: 'Sujet', url: PE + '2024%23/midterm-2024%23-s1-algo-subject-fr.pdf' },
        { t: 'Feuille de réponses', url: PE + '2024%23/midterm-2024%23-s1-algo-answer_sheet-fr.pdf' },
        { t: 'Corrigé', url: PE + '2024%23/midterm-2024%23-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Vecteur : deux erreurs, puis réinitialise', pts: 6, caml: false },
        { ex: '2', t: 'Tri par insertion', pts: 7, topics: ['listes', 'ordre-superieur', 'listes-triees', 'construire', 'recursivite'], card: 'p2019d-ex2' },
        { ex: '3', t: 'Association', pts: 5, topics: T_ASSOC, card: 'p2019d-ex3' },
        { ex: '4', t: 'Mystery', pts: 2, topics: ['listes', 'mystery', 'evaluation', 'accumulateur', 'filtrage'], card: 'p2019d-ex4' }] },

    { key: 'p2018', title: 'Partiel du 29 octobre 2018', meta: 'promo 2023 · partie 1 TAA sur 5, partie 2 Caml sur 16',
      camlPts: '16 / 21', note: 'Pas de règle « réponse de Caml » cette année-là. L’exercice 4 est retombé tel quel en 2020. À l’exercice 5, le code imprimé de encode ne compile pas (encode-rec) : le corrigé évalue une version corrigée.',
      files: [{ t: 'Sujet', url: PE + '2023/midterm-2023-s1-algo-subject-fr.pdf' },
        { t: 'Corrigé', url: PE + '2023/midterm-2023-s1-algo-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste récursive : est-présent, rechercher, concaténer', pts: 5, caml: false },
        { ex: '2', t: 'is_image', pts: 4, topics: ['listes', 'ordre-superieur', 'deux-listes', 'exceptions'], card: 'p2018-ex2' },
        { ex: '3', t: 'Combien ?', pts: 4, topics: ['listes', 'ordre-superieur'], card: 'p2018-ex3' },
        { ex: '4', t: 'Insertion à la ième place', pts: 5, topics: T_INSERT_NTH, card: 'p2018-ex4' },
        { ex: '5', t: 'Évaluations', pts: 3, topics: ['listes', 'mystery', 'evaluation', 'filtrage'], card: 'p2018-ex5' }] },

    { key: 'p2017', title: 'Partiel du 6 novembre 2017', meta: 'promo 2022 · contrôle unique · 2 h · 20 points',
      camlPts: '14 / 20', note: 'Pas de corrigé : les annales n’ont que le sujet, scanné, et des feuilles de réponses vierges. Les exercices 3 et 4 sont retombés en 2019 (avril, puis octobre), avec un corrigé officiel.',
      files: [{ t: 'Sujet', url: PE + '2022/midterm-2022-s1-algo-subject-fr.pdf' },
        { t: 'Feuilles de réponses (vierges)', url: PE + '2022/midterm-2022-s1-algo-answer_sheet-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Liste itérative : modifier', pts: 2, caml: false },
        { ex: '2', t: 'Liste récursive arrière', pts: 4, caml: false },
        { ex: '3', t: 'Association', pts: 4, topics: T_ASSOC, card: 'p2019d-ex3' },
        { ex: '4', t: 'for_all2', pts: 5, topics: T_FORALL2, card: 'p2019-ex4' },
        { ex: '5', t: 'Combine it', pts: 5, topics: ['listes', 'ordre-superieur', 'deux-listes', 'construire', 'exceptions'], card: 'p2017-ex5' }] }
  ];
  window.CAML_EX = window.CAML_EX || [];
})();
