/* Élec B2 — examens de fin de semestre d’électronique S1 (« Partiel Electronique » de janvier), notions et sujets.
   Source : Epidocs Past-Exams, S1/Finals/Elec/<promo> ; l’examen a lieu en janvier de l’année promo − 4.
   Clé fAAAA = année de l’examen (f2023 = janvier 2023, promo 2027) ; f2018j = juin 2018 (S1 décalé, « S1# »).
   Les exercices de théorèmes sont corrigés dans data/elec2/ex-finals.js (window.ELEC2_EX, clé « exam »).
   Toutes les réponses des corrigés ont été recalculées par analyse nodale symbolique : elles sont justes, à deux
   coquilles près (relevées dans les notes). Le sujet de janvier 2024 (régimes sinusoïdaux, ECUE ELEC-2) est hors
   programme : le cours de cette année ne traite que le régime continu. */
(function () {
  var EP = 'https://past-exams.epidocs.eu/S1/Finals/Elec/';
  function f(promo, list) { return list.map(function (x) { return { k: x[0], l: x[1], u: EP + promo + '/final-' + promo + '-s1-elec-' + x[2] + '.pdf' }; }); }
  window.ELEC2_TOPICS = {
    thevenin: 'Thévenin', norton: 'Norton', equivalences: 'Équivalences Thévenin/Norton', millman: 'Millman',
    superposition: 'Superposition', 'source-courant': 'Sources de courant', diviseurs: 'Diviseurs', numerique: 'Application numérique', qcm: 'Questions de cours'
  };
  window.ELEC2_EXAMS = [
    { key: 'f2024', label: 'Examen janv. 2024', promo: 2028, date: 'Janvier 2024', prog: false, progPts: '0 / 20',
      files: f(2028, [['Sujet', 'fr', 'subject-fr'], ['Sujet', 'en', 'subject-en'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'QCM sur le régime sinusoïdal', pts: 4, topics: [], prog: false }, { ex: 2, t: 'Régime sinusoïdal forcé : étude d’un filtre', pts: 7, topics: [], prog: false }, { ex: 3, t: 'Régime sinusoïdal forcé : étude d’un filtre', pts: 9, topics: [], prog: false }],
      note: 'Examen d’un autre cours, « Études des régimes sinusoïdaux » (SI-S1-ELEC-2-ERS) : condensateurs, bobines, impédances complexes, filtres. Hors programme cette année, le cours ne traitant que le régime continu. Cette année-là, Thévenin et Norton étaient au partiel de novembre (voir les annales du B1).' },
    { key: 'f2023', label: 'Examen janv. 2023', promo: 2027, date: 'Janvier 2023', official: true, progPts: '20 / 20',
      files: f(2027, [['Sujet', 'fr', 'subject-fr'], ['Sujet', 'en', 'subject-en'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'Questions de cours : QCM (8 questions)', pts: 6, topics: ['qcm'] },
        { ex: 2, t: 'Équivalences Thévenin/Norton : Norton vu par 2R, puis U par transformations', pts: 14, topics: ['equivalences', 'norton', 'source-courant', 'diviseurs'], cards: ['f2023-ex2a', 'f2023-ex2b'] }],
      note: 'Le format actuel : un QCM de cours sur tout le semestre, puis un grand exercice d’équivalences Thévenin/Norton (14 points).' },
    { key: 'f2022', label: 'Examen janv. 2022', promo: 2026, date: 'Janvier 2022', official: true, progPts: '20 / 20',
      files: f(2026, [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'Questions de cours (8 questions)', pts: 8, topics: ['qcm'] },
        { ex: 2, t: 'Équivalences Thévenin/Norton : Norton vu par R′, puis U', pts: 12, topics: ['equivalences', 'norton', 'source-courant', 'diviseurs'], cards: ['f2022-ex2a', 'f2022-ex2b'] }],
      note: 'Même plan qu’en 2023 : QCM, puis équivalences Thévenin/Norton (12 points). La question 2 se résout en passant toutes les branches en Norton.' },
    { key: 'f2021', label: 'Examen janv. 2021', promo: 2025, date: 'Janvier 2021', official: true, progPts: '20 / 20',
      files: f(2025, [['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'QCM (10 questions)', pts: 5, topics: ['qcm'] },
        { ex: 2, t: 'Théorème de superposition (application numérique)', pts: 5, topics: ['superposition', 'numerique'], cards: ['f2021-ex2'] },
        { ex: 3, t: 'Théorème de Thévenin', pts: 5, topics: ['thevenin', 'equivalences'], cards: ['f2021-ex3'] },
        { ex: 4, t: 'Théorème de Norton', pts: 5, topics: ['norton', 'equivalences'], cards: ['f2021-ex4'] }],
      note: 'Seul le corrigé est publié (les énoncés y sont recopiés). Trois théorèmes, cinq points chacun.' },
    { key: 'f2020', label: 'Examen janv. 2020', promo: 2024, date: 'Janvier 2020', official: true, progPts: '20 / 20',
      files: f(2024, [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'Questions de cours : QCM (9 questions)', pts: 5, topics: ['qcm'] },
        { ex: 2, t: 'Théorème de superposition (application numérique)', pts: 4.5, topics: ['superposition', 'numerique'], cards: ['f2020-ex2'] },
        { ex: 3, t: 'Théorème de Norton', pts: 4, topics: ['norton'], cards: ['f2020-ex3'] },
        { ex: 4, t: 'Théorème de Thévenin, puis application numérique', pts: 6.5, topics: ['thevenin', 'superposition', 'numerique'], cards: ['f2020-ex4'] }],
      note: 'Superposition, Norton et Thévenin dans des exercices séparés, chacun nommé par sa méthode.' },
    { key: 'f2019', label: 'Examen janv. 2019', promo: 2023, date: 'Janvier 2019', official: true, progPts: '20 / 20',
      files: f(2023, [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'Questions de cours : QCM (12 questions)', pts: 6, topics: ['qcm'] },
        { ex: 2, t: 'Théorème de Thévenin', pts: 6, topics: ['thevenin', 'equivalences'], cards: ['f2019-ex2'] },
        { ex: 3, t: 'Théorèmes : tension aux bornes de R₁, méthode au choix', pts: 8, topics: ['thevenin', 'superposition', 'source-courant'], cards: ['f2019-ex3'] },
        { ex: 'Bonus', t: 'Théorème de Millman', pts: 0, topics: ['millman'], cards: ['f2019-bonus'] }],
      note: 'Corrigé manuscrit juste, avec une coquille à l’exercice 2 : « 2E » pour 2E₃. Dans l’exercice 3, la source E disparaît du résultat.' },
    { key: 'f2018j', label: 'Examen juin 2018 (S1#)', promo: 2023, variant: 'S1#', date: 'Juin 2018', official: true, progPts: '20 / 20',
      files: f('2023#', [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'QCM (10 questions)', pts: 5.5, topics: ['qcm'] },
        { ex: 2, t: 'Lois et théorèmes : superposition, puis Thévenin vu par 2R', pts: 7.5, topics: ['superposition', 'thevenin', 'equivalences'], cards: ['f2018j-ex2'] },
        { ex: 3, t: 'Théorèmes : tension aux bornes de R₁, méthode au choix', pts: 7, topics: ['thevenin', 'superposition', 'source-courant'], cards: ['f2018j-ex3'] }],
      note: 'Session du S1 décalé. Coquille du corrigé à la question 2b : il encadre la tension de Thévenin (dénominateur 11) au lieu de U (dénominateur 14).' },
    { key: 'f2018', label: 'Examen janv. 2018', promo: 2022, date: 'Janvier 2018', official: true, progPts: '20 / 20',
      files: f(2022, [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'Questions de cours : QCM (11 questions)', pts: 6, topics: ['qcm'] },
        { ex: 2, t: 'Théorème de Thévenin', pts: 5, topics: ['thevenin'], cards: ['f2018-ex2'] },
        { ex: 3, t: 'Théorèmes : tension aux bornes de R₁, méthode au choix', pts: 7, topics: ['equivalences', 'superposition', 'source-courant'], cards: ['f2018-ex3'] },
        { ex: 4, t: 'Théorème de Millman', pts: 2, topics: ['millman'], cards: ['f2018-ex4'] }],
      note: 'Le seul sujet avec un exercice de Millman noté (2 points) ; les autres le mettent en bonus.' },
    { key: 'f2017', label: 'Examen janv. 2017', promo: 2021, date: 'Janvier 2017', official: true, progPts: '20 / 20',
      files: f(2021, [['Sujet', 'fr', 'subject-fr'], ['Sujet', 'en', 'subject-en'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 1, t: 'Questions de cours : QCM', pts: 7, topics: ['qcm'] },
        { ex: 2, t: 'Théorème de Norton (application numérique)', pts: 6, topics: ['norton', 'equivalences', 'numerique'], cards: ['f2017-ex2'] },
        { ex: 3, t: 'Théorèmes et lois fondamentales : U, puis R₄ pour que U = 0', pts: 7, topics: ['millman', 'numerique'], cards: ['f2017-ex3'] },
        { ex: 'Bonus', t: 'Théorème de Millman', pts: 0, topics: ['millman'], cards: ['f2017-bonus'] }],
      note: 'Valeurs numériques en kΩ et en mA : le corrigé choisit Millman pour l’exercice 3.' },
    { key: 'f2016', label: 'Examen janv. 2016', promo: 2020, date: 'Janvier 2016', official: false, progPts: '20 / 20',
      files: f(2020, [['Sujet', 'fr', 'subject-fr'], ['Sujet', 'en', 'subject-en']]),
      parts: [{ ex: 1, t: 'Questions de cours : QCM (13 questions)', pts: 6.5, topics: ['qcm'] },
        { ex: 2, t: 'Théorème de Norton', pts: 6, topics: ['norton', 'equivalences'], cards: ['f2016-ex2'] },
        { ex: 3, t: 'Théorèmes : tension aux bornes de R₁ (même montage qu’en juin 2018)', pts: 7.5, topics: ['thevenin', 'superposition'], cards: ['f2018j-ex3'] },
        { ex: 'Bonus', t: 'Théorème de Millman (même réponse qu’en 2017)', pts: 0, topics: ['millman'], cards: ['f2017-bonus'] }],
      note: 'Pas de corrigé publié : réponses calculées. Le circuit de l’exercice 2 revient en 2019 (Thévenin), celui de l’exercice 3 en juin 2018.' }
  ];
})();
