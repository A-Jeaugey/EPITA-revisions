/* Physique (mécanique du point) — notions des exercices et sujets de partiel connus.
   PHYS_TOPICS : notions (filtres de l’entraînement, tableau des annales), pour les fiches des partiels
     (data/physique/ex-annales.js) comme pour celles des TD.
   PHYS_EXAMS  : sujets du contrôle 1 de physique S1 trouvés dans les annales Epidocs (S1/Midterms/Phys), un objet par
     sujet, du plus récent au plus ancien. Clé pAAAA = année du partiel (promo = AAAA + 5) ; p2018s = contrôle du
     groupe S1# de mai 2018 (dossier « 2023# »). Aucun sujet de partiel 1 de physique pour 2023 à 2025.
     Champs : title, meta, progPts (part du barème au programme de cette année, estimation), note, files (PDF des
     annales, vérifiés sur disque), parts : { ex, t, pts, topics, card (fiche d’exercice), prog (au programme de
     cette année ou non) }. Hors programme cette année : base de Frenet, abscisse curviligne, produit vectoriel,
     coordonnées cylindriques. Les sept sujets ne portent que sur la cinématique (ni forces, ni énergie).
     Coordonnées polaires et mouvement circulaire en polaires : absents de la liste des notions envoyée par le prof
     (octobre 2026 : cinématique cartésienne, 2e loi, forces, travail et énergie, projections) : parties prog: false,
     progPts recalculés (estimations, barème par question rarement imprimé). */
(function () {
  window.PHYS_TOPICS = {
    'cours': 'Questions de cours',
    'cinematique': 'Cinématique en cartésiennes',
    'trajectoire': 'Équation de la trajectoire',
    'nature': 'Nature du mouvement',
    'tir': 'Tir et chute libre',
    'circulaire': 'Mouvement circulaire',
    'polaire': 'Coordonnées polaires (hors partiel 1)',
    'forces': 'Forces et bilan des forces',
    'newton': 'Lois de Newton',
    'plan-incline': 'Plan incliné',
    'travail': 'Travail et puissance',
    'energie': 'Énergie cinétique et mécanique'
  };

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Phys/';

  window.PHYS_EXAMS = [
    { key: 'p2022', title: 'Contrôle d’octobre 2022', meta: 'promo 2027 · 1 h · 20 points', progPts: '≈ 13 / 20',
      note: 'Pas de corrigé officiel : les annales contiennent une copie d’élève notée (10,5/20). C’est le format le plus proche de celui qu’on peut attendre cette année : questions de cours, puis deux exercices. La question 2.a de l’exercice 3 impose une expression fausse (voir la fiche).',
      files: [{ t: 'Sujet (copie d’élève notée, 10,5/20)', url: PE + '2027/midterm-2027-s1-phys-subject-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Questions de cours (QCM, plusieurs réponses possibles ; hors programme : la question 4, en cylindriques, et les questions 5 et 6, en polaires)', pts: 6, topics: ['cours', 'nature', 'polaire', 'circulaire'], card: 'p2022-ex1', prog: true },
        { ex: '2', t: 'Cinématique en coordonnées cartésiennes : tir d’une balle', pts: 8, topics: ['tir', 'trajectoire', 'cinematique', 'nature'], card: 'p2022-ex2', prog: true },
        { ex: '3', t: 'Vilebrequin : la partie 2, en cartésiennes, est au programme ; la partie 1, en polaires, ne l’est pas', pts: 6, topics: ['polaire', 'circulaire', 'cinematique'], card: 'p2022-ex3', prog: true }] },

    { key: 'p2021', title: 'Contrôle de novembre 2021', meta: 'promo 2026 · durée non indiquée · 20 points', progPts: '≈ 8,5 / 20',
      note: 'Corrigé officiel manuscrit, avec un barème « donné à titre indicatif ». Le sujet existe aussi en anglais. Les polaires (exercices 2 et 4) ne sont pas au programme du partiel 1 cette année ; à la question de cours 1, le corrigé entoure une mauvaise réponse.',
      files: [{ t: 'Sujet', url: PE + '2026/midterm-2026-s1-phys-subject-fr.pdf' },
        { t: 'Corrigé avec barème', url: PE + '2026/midterm-2026-s1-phys-correction-fr.pdf' }],
      parts: [
        { ex: '1', t: 'Questions de cours (QCM, 5 questions)', pts: 2.5, topics: ['cours', 'nature', 'polaire'], card: 'p2021-ex1', prog: true },
        { ex: '2', t: 'Base polaire, dérivées, vitesse en polaires (hors partiel 1)', pts: 8, topics: ['polaire'], card: 'p2021-ex2', prog: false },
        { ex: '3', t: 'Mouvement d’un projectile', pts: 5.5, topics: ['tir', 'trajectoire', 'cinematique'], card: 'p2021-ex3', prog: true },
        { ex: '4', t: 'Accélération en coordonnées polaires (hors partiel 1)', pts: 4, topics: ['polaire', 'circulaire'], card: 'p2021-ex4', prog: false }] },

    { key: 'p2020', title: 'Contrôle 1 de 2020-2021', meta: 'promo 2025 · durée non indiquée · 20 points', progPts: '≈ 11,5 / 20',
      note: 'Les annales n’ont que le corrigé officiel, écrit à la main sur le sujet (l’énoncé reste lisible). Il se trompe à la question 2 de l’exercice 2. L’exercice 3 (cylindriques, base de Frenet) est hors programme cette année.',
      files: [{ t: 'Corrigé, écrit sur le sujet', url: PE + '2025/midterm-2025-s1-phys-correction-fr.pdf' }],
      parts: [
        { ex: 'QCM', t: 'QCM, 8 questions (les questions 5 et 6, sur la base de Frenet, sont hors programme)', pts: 4, topics: ['cours', 'polaire', 'cinematique', 'trajectoire'], prog: true },
        { ex: '1', t: 'Ellipse : trajectoire, vitesse, accélération', pts: 5, topics: ['cinematique', 'trajectoire'], card: 'p2020-ex1', prog: true },
        { ex: '2', t: 'Trajectoire rectiligne : un segment', pts: 5, topics: ['trajectoire', 'cinematique'], card: 'p2020-ex2', prog: true },
        { ex: '3', t: 'Hélice : base cylindrique, base de Frenet', pts: 6, topics: [], prog: false }] },

    { key: 'p2019', title: 'Contrôle 1 de 2019-2020', meta: 'promo 2024 · durée non indiquée · 20 points', progPts: '≈ 10 / 20',
      note: 'Corrigé officiel manuscrit avec barème. Hors programme cette année : l’exercice 3 (abscisse curviligne, base de Frenet), la question 3 de l’exercice 2 et les questions 3 et 5 du QCM (produit vectoriel, cylindriques).',
      files: [{ t: 'Sujet', url: PE + '2024/midterm-2024-s1-phys-subject-fr.pdf' },
        { t: 'Corrigé avec barème', url: PE + '2024/midterm-2024-s1-phys-correction-fr.pdf' }],
      parts: [
        { ex: 'QCM', t: 'QCM, 8 questions (les questions 3 et 5 sont hors programme)', pts: 4, topics: ['cours', 'polaire', 'circulaire'], prog: true },
        { ex: '1', t: 'La cycloïde', pts: 6, topics: ['cinematique', 'trajectoire'], card: 'p2019-ex1', prog: true },
        { ex: '2', t: 'Mouvement hélicoïdal : cartésiennes (Q1-2, même mouvement qu’en mai 2018) ; cylindriques (Q3, hors programme)', pts: 6, topics: ['cinematique', 'circulaire'], card: 'p2018s-ex2', prog: true },
        { ex: '3', t: 'Abscisse curviligne et base de Frenet', pts: 4, topics: [], prog: false }] },

    { key: 'p2018', title: 'Contrôle 1 de 2018-2019', meta: 'promo 2023 · durée non indiquée · 20 points', progPts: '≈ 7 / 20',
      note: 'Pas de corrigé. Le mois n’est pas imprimé (année 2018-2019, sans doute novembre 2018) et le QCM saute la question 5. L’exercice 1 est le mouvement de mai 2018 : il est corrigé sur la même fiche.',
      files: [{ t: 'Sujet', url: PE + '2023/midterm-2023-s1-phys-subject-fr.pdf' }],
      parts: [
        { ex: 'QCM', t: 'QCM, 7 questions (les questions 3, 7 et 8 sont hors programme : produit vectoriel, base de Frenet)', pts: 4, topics: ['cours', 'polaire', 'circulaire'], prog: true },
        { ex: '1', t: 'Ellipse (même mouvement qu’en mai 2018, plus le lien entre accélération et position)', pts: 4, topics: ['cinematique', 'trajectoire'], card: 'p2018s-ex1', prog: true },
        { ex: '2', t: 'Spirale tracée sur un cône : coordonnées cylindriques', pts: 8, topics: [], prog: false },
        { ex: '3', t: 'Cercle : trajectoire, vitesse, accélération (Q1-2 ; Q3-4, base de Frenet, hors programme)', pts: 4, topics: ['cinematique', 'trajectoire', 'circulaire'], card: 'p2018-ex3', prog: true }] },

    { key: 'p2018s', title: 'Contrôle de mai 2018 (groupe S1#)', meta: 'promo 2023, groupe S1# · durée non indiquée · 20 points', progPts: '≈ 12 / 20',
      note: 'Contrôle du groupe S1# (rentrée décalée), avec un corrigé officiel manuscrit, sans barème détaillé. Hors programme cette année : la partie B de l’exercice 2 (cylindriques) et les questions 4, 7 et 8 du QCM.',
      files: [{ t: 'Sujet', url: PE + '2023%23/midterm-2023%23-s1-phys-subject-fr.pdf' },
        { t: 'Corrigé', url: PE + '2023%23/midterm-2023%23-s1-phys-correction-fr.pdf' }],
      parts: [
        { ex: 'QCM', t: 'QCM, 8 questions (les questions 4, 7 et 8 sont hors programme)', pts: 5, topics: ['cours', 'polaire', 'circulaire'], prog: true },
        { ex: '1', t: 'Ellipse : trajectoire, vitesse, accélération', pts: 6, topics: ['cinematique', 'trajectoire'], card: 'p2018s-ex1', prog: true },
        { ex: '2', t: 'Hélice : partie A en cartésiennes ; partie B en cylindriques (hors programme)', pts: 9, topics: ['cinematique', 'circulaire', 'trajectoire', 'nature'], card: 'p2018s-ex2', prog: true }] },

    { key: 'p2017', title: 'Contrôle 1 de novembre 2017', meta: 'promo 2022 · durée non indiquée · 20 points', progPts: '≈ 6 / 20',
      note: 'Pas de corrigé. Le sujet existe aussi en anglais. Hors programme cette année : l’exercice 3 et la question 4 de l’exercice 2 (base de Frenet), les questions 4, 6 et 7 du QCM (produit vectoriel, abscisse curviligne).',
      files: [{ t: 'Sujet', url: PE + '2022/midterm-2022-s1-phys-subject-fr.pdf' }],
      parts: [
        { ex: 'QCM', t: 'QCM, 8 questions (les questions 4, 6 et 7 sont hors programme)', pts: 4, topics: ['cours', 'polaire', 'trajectoire'], prog: true },
        { ex: '1', t: 'Mouvement circulaire de centre C(1 ; 2)', pts: 4, topics: ['cinematique', 'trajectoire', 'circulaire'], card: 'p2017-ex1', prog: true },
        { ex: '2', t: 'Spirale en coordonnées polaires (hors partiel 1 ; Q4, base de Frenet, hors programme)', pts: 6, topics: ['polaire'], card: 'p2017-ex2', prog: false },
        { ex: '3', t: 'Base de Frenet : vitesse, accélération, rayon de courbure', pts: 6, topics: [], prog: false }] }
  ];
  window.PHYS_EX = window.PHYS_EX || [];
})();
