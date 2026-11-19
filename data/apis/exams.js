/* Maths · APIS (analyse : primitives, intégrales et suites numériques), bimestre 2 — notions et sujets.
   Deux périmètres, voulus par l'annonce du 16 novembre 2026 :
     'cc'    : contrôle de cours du lundi 23 novembre 2026 (1 h) : cours 3 du Moodle en entier (primitives, aires,
               intégrales, intégration par parties, changement de variable) et cours 4 jusqu'aux exemples remarquables
               (introduction, limites, suites géométriques, critère du quotient) ;
     'final' : ce qui s'ajoute pour l'examen final de décembre (théorèmes de convergence, suites extraites, suites
               récurrentes, comparaisons de Landau).
   APIS_TOPICS : notions (filtres de l'entraînement).   APIS_STAGE : périmètre de chaque notion.
   APIS_EXAMS  : sujets cités par les fiches, du plus récent au plus ancien. Clés : ccAAAAm = contrôle de cours
     (année, o = octobre, n = novembre, d = décembre), pAAAA = partiel de novembre AAAA, obm2024 = examen OBM
     d'octobre 2024, fAAAA = examen de janvier AAAA (f2024 : ASI, f2025 : SR). Champs : key, title, meta, stage, files (PDF d'Epidocs/Past-Exams,
     chemins vérifiés dans un clone), note.
   Dates : promo = année du dossier Epidocs ; un partiel de novembre AAAA est dans Midterms/…/AAAA+5, un examen de
   janvier AAAA dans Finals/…/AAAA+4, un contrôle de cours de l'automne AAAA dans TDs/AAAA+5. */
(function () {
  window.APIS_TOPICS = {
    'primitives': 'Primitives usuelles et composées',
    'aires': 'Intégrale et aires',
    'rectangles': 'Méthode des rectangles',
    'integrales': 'Calcul d’intégrales par une primitive',
    'ipp': 'Intégration par parties',
    'cdv': 'Changement de variable',
    'definitions': 'Suites : bornes, monotonie',
    'limites': 'Limites de suites',
    'geometriques': 'Suites géométriques, exemples remarquables',
    'exemples': 'Exemples et contre-exemples',
    'demonstrations': 'Démonstrations de cours',
    'convergence': 'Théorèmes de convergence',
    'extraites': 'Suites extraites',
    'recurrentes': 'Suites récurrentes',
    'landau': 'Comparaisons de Landau'
  };
  window.APIS_STAGE = {
    primitives: 'cc', aires: 'cc', rectangles: 'cc', integrales: 'cc', ipp: 'cc', cdv: 'cc', definitions: 'cc', limites: 'cc',
    geometriques: 'cc', exemples: 'cc', demonstrations: 'cc', convergence: 'final', extraites: 'final', recurrentes: 'final', landau: 'final'
  };
  function pdf(path) { return 'https://past-exams.epidocs.eu/' + path.split('/').map(encodeURIComponent).join('/'); }
  function f(label, path) { return { t: label, url: pdf(path) }; }
  window.APIS_EXAMS = [
    { key: 'cc2026o', title: 'Contrôle de cours 1 · 12 octobre 2026', meta: 'OBM et DP · 1 h · le format de cette année', stage: 'cc',
      files: [f('Sujet', 'S1/CC/2031/cc-2031-s1-maths-subject-fr.pdf')],
      note: 'Même professeure, même promotion : c’est le modèle de forme du contrôle du 23 novembre (sections « Cours N », questions indépendantes, réponses sur le sujet).' },
    { key: 'f2025', title: 'Examen SR · janvier 2025', meta: 'Suites réelles · 1 h 30 · sur 30', stage: 'final',
      files: [f('Sujet', 'S1/Finals/Maths PC/2029/PC/SR/final-2029-s1-maths-subject-fr.pdf')],
      note: 'Sans corrigé publié : réponses rédigées pour le site. Même architecture que janvier 2024, sans les intégrales.' },
    { key: 'obm2024', title: 'Examen OBM · octobre 2024', meta: 'Exercice 5 : intégrales, 6 points', stage: 'cc',
      files: [f('Sujet', 'S1/Midterms/Maths PC/2029/PC/OBM/midterm-2029-s1-maths-subject-fr.pdf')], note: 'Sans corrigé publié : résultats calculés.' },
    { key: 'f2024', title: 'Examen ASI · janvier 2024', meta: 'Suites et intégrales · 2 h · sur 40', stage: 'final',
      files: [f('Sujet', 'S1/Finals/Maths PC/2028/PC/ASI/final-2028-s1-maths-subject-fr.pdf'), f('Corrigé', 'S1/Finals/Maths PC/2028/PC/ASI/final-2028-s1-maths-correction-fr.pdf')],
      note: 'Le meilleur modèle de l’examen final. L’exercice 1 (intégrales, 10 points) est dans le périmètre du contrôle.' },
    { key: 'cc2023n', title: 'Contrôle de cours · 27 novembre 2023', meta: 'Partie ASI : suites · 15 min · sur 10', stage: 'cc',
      files: [f('Sujet', 'S1/TDs/2028/td2-2028-s1-maths-subject-fr.pdf')], note: 'Deux sections : « Cours 1 : définitions », « Cours 2 : convergence ou divergence ».' },
    { key: 'f2023', title: 'Partiel · janvier 2023', meta: 'Exercice 1 : une intégrale, 3 points', stage: 'cc',
      files: [f('Sujet', 'S1/Finals/Maths PC/2027/final-2027-s1-maths-subject-fr.pdf'), f('Corrigé', 'S1/Finals/Maths PC/2027/final-2027-s1-maths-correction-fr.pdf')], note: '' },
    { key: 'cc2022d', title: 'Contrôle de cours · 5 décembre 2022', meta: 'Exercice 5 : suites · 6 points', stage: 'cc',
      files: [f('Sujet', 'S1/TDs/2027/td2-2027-s1-maths-subject-fr.pdf')], note: '' },
    { key: 'p2022', title: 'Partiel · novembre 2022', meta: 'Exercice d’intégrales : primitive, IPP, changement de variable', stage: 'cc',
      files: [f('Sujet', 'S1/Midterms/Maths PC/2027/midterm-2027-s1-maths-subject.pdf'), f('Corrigé', 'S1/Midterms/Maths PC/2027/midterm-2027-s1-maths-correction-fr.pdf')], note: '' },
    { key: 'cc2022o', title: 'Contrôle de cours · 3 octobre 2022', meta: 'Exercice 3 : intégrale et théorème d’IPP · 4,5 points', stage: 'cc',
      files: [f('Sujet', 'S1/TDs/2027/td1-2027-s1-maths-subject-fr.pdf')], note: 'Demande l’énoncé du théorème d’intégration par parties, puis sa démonstration.' },
    { key: 'p2021', title: 'Partiel · novembre 2021', meta: 'Exercice d’intégrales : primitive, IPP, changement de variable', stage: 'cc',
      files: [f('Sujet', 'S1/Midterms/Maths PC/2026/midterm-2026-s1-maths-subject-fr.pdf'), f('Corrigé', 'S1/Midterms/Maths PC/2026/midterm-2026-s1-maths-correction-fr.pdf')], note: '' },
    { key: 'p2020', title: 'Partiel · novembre 2020', meta: 'Dérivée, changement de variable, IPP', stage: 'cc',
      files: [f('Sujet', 'S1/Midterms/Maths PC/2025/midterm-2025-s1-maths-subject-fr.pdf'), f('Corrigé', 'S1/Midterms/Maths PC/2025/midterm-2025-s1-maths-correction-fr.pdf')], note: '' },
    { key: 'cc2020o', title: 'Contrôle de cours · octobre 2020', meta: 'Deux intégrales', stage: 'cc',
      files: [f('Sujet', 'S1/TDs/2025/td1-2025-s1-maths-subject-fr.pdf')], note: '' }
  ];
})();
