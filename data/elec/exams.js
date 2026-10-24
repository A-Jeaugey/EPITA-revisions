/* Sujets de partiel d'électronique S1 (mi-semestre) : métadonnées et structure.
   Les corrigés détaillés et les énoncés sont dans data/elec/ex-*.js (window.ELEC_EX), clé « exam ». */
(function () {
  var EP = 'https://past-exams.epidocs.eu/S1/Midterms/Elec/';
  window.ELEC_CATS = { qcm: 'Questions de cours', req: 'Résistances équivalentes', lois: 'Lois fondamentales', inter: 'Interrupteurs', div: 'Diviseurs et générateur réel', sup: 'Superposition', thev: 'Thévenin et Norton' };
  window.ELEC_TOPICS = {
    vocabulaire: 'Nœuds, branches, mailles', potentiels: 'Potentiels et flèches', kirchhoff: 'Lois de Kirchhoff', req: 'Résistance équivalente',
    diviseurs: 'Diviseurs', interrupteurs: 'Interrupteurs', appareils: 'Appareils de mesure', generateurs: 'Générateurs réels',
    'source-courant': 'Sources de courant', thevenin: 'Thévenin et Norton (hors examen 1)', millman: 'Millman (hors examen 1)', superposition: 'Superposition (hors examen 1)',
    calcul: 'Calcul littéral', qcm: 'Questions de cours'
  };
  window.ELEC_EXAMS = [
    { key: 'p2024', label: 'Partiel oct. 2024', promo: 2029, date: 'Octobre 2024', official: false,
      files: [{ k: 'Sujet', u: EP + '2029/midterm-2029-s1-elec-subject-fr.pdf' }],
      parts: [{ ex: 1, t: 'Questions de cours (QCM, 5 questions)', cat: 'qcm', pts: 2.5, topics: ['qcm'] },
        { ex: 2, t: 'Lois fondamentales', cat: 'lois', pts: 6.5, topics: ['kirchhoff', 'vocabulaire', 'potentiels'] },
        { ex: 3, t: 'Équivalences Thévenin/Norton', cat: 'thev', pts: 11, topics: ['thevenin', 'source-courant', 'diviseurs'] }],
      note: 'Même gabarit que 2023, avec des pièges de signe (source 2E fléchée vers le bas, source I qui prélève du courant). Pas de corrigé officiel : corrigé rédigé et vérifié par trois méthodes.' },
    { key: 'p2023', label: 'Partiel nov. 2023', promo: 2028, date: 'Novembre 2023', official: true,
      files: [{ k: 'Sujet', u: EP + '2028/midterm-2028-s1-elec-subject-fr.pdf' }, { k: 'Sujet', l: 'en', u: EP + '2028/midterm-2028-s1-elec-subject-en.pdf' }, { k: 'Corrigé', u: EP + '2028/midterm-2028-s1-elec-correction-fr.pdf' }],
      parts: [{ ex: 1, t: 'Questions de cours (QCM, 5 questions)', cat: 'qcm', pts: 3.5, topics: ['qcm'] },
        { ex: 2, t: 'Lois fondamentales', cat: 'lois', pts: 5, topics: ['kirchhoff', 'potentiels'] },
        { ex: 3, t: 'Équivalences Thévenin/Norton', cat: 'thev', pts: 11.5, topics: ['thevenin', 'vocabulaire', 'source-courant', 'diviseurs'] }],
      note: 'Premier sujet du nouveau format : Thévenin/Norton pèse plus de la moitié de la note, avec une charge 2R entre A et B.' },
    { key: 'p2022', label: 'Partiel oct. 2022', promo: 2027, date: 'Octobre 2022', official: true,
      files: [{ k: 'Sujet', u: EP + '2027/midterm-2027-s1-elec-subject-fr.pdf' }, { k: 'Corrigé', u: EP + '2027/midterm-2027-s1-elec-correction-fr.pdf' }],
      parts: [{ ex: 1, t: 'Questions de cours (QCM, 6 questions)', cat: 'qcm', pts: 6, topics: ['qcm'] },
        { ex: 2, t: 'Associations de résistances', cat: 'req', pts: 6, topics: ['req'] },
        { ex: 3, t: 'Généralités et lois de Kirchhoff', cat: 'lois', pts: 9, topics: ['kirchhoff', 'vocabulaire', 'potentiels'] }],
      note: 'Barème imprimé sur 21. La question « mailles » attend toutes les boucles (10).' },
    { key: 'p2021', label: 'Partiel nov. 2021', promo: 2026, date: 'Novembre 2021', official: true,
      files: [{ k: 'Sujet', u: EP + '2026/midterm-2026-s1-elec-subject-fr.pdf' }, { k: 'Sujet', l: 'en', u: EP + '2026/midterm-2026-s1-elec-subject-en.pdf' }, { k: 'Corrigé', u: EP + '2026/midterm-2026-s1-elec-correction-fr.pdf' }],
      parts: [{ ex: 1, t: 'Questions de cours (QCM, 6 questions)', cat: 'qcm', pts: 6, topics: ['qcm'] },
        { ex: 2, t: 'Associations de résistances', cat: 'req', pts: 8, topics: ['req', 'calcul'] },
        { ex: 3, t: 'Lois de Kirchhoff', cat: 'lois', pts: 6, topics: ['kirchhoff', 'req', 'diviseurs'] }],
      note: 'Réseau de résistances sur le même squelette qu’en 2022, et une question inverse : trouver R′.' },
    { key: 'p2020', label: 'Partiel nov. 2020', promo: 2025, date: 'Novembre 2020', official: true,
      files: [{ k: 'Sujet', u: EP + '2025/midterm-2025-s1-elec-subject-fr.pdf' }, { k: 'Corrigé', u: EP + '2025/midterm-2025-s1-elec-correction-fr.pdf' }],
      parts: [{ ex: 1, t: 'Questions de cours (QCM, 6 questions)', cat: 'qcm', pts: 3, topics: ['qcm'] },
        { ex: 2, t: 'Association de résistances', cat: 'req', pts: 4.5, topics: ['req'] },
        { ex: 3, t: 'Généralités et lois de Kirchhoff', cat: 'lois', pts: 6, topics: ['potentiels', 'kirchhoff'] },
        { ex: 4, t: 'Lois de Kirchhoff, ponts diviseurs', cat: 'div', pts: 6.5, topics: ['diviseurs', 'generateurs', 'req'] }],
      note: 'L’exercice 3 est exactement le TD 1 Ex 2 de ta promo (avec deux flèches de courant inversées).' },
    { key: 'p2018', label: 'Partiel oct. 2018', promo: 2023, date: 'Octobre 2018', official: false,
      files: [{ k: 'Sujet', u: EP + '2023/midterm-2023-s1-elec-subject-fr.pdf' }],
      parts: [{ ex: 1, t: 'Questions de cours (QCM, 10 questions)', cat: 'qcm', pts: 5, topics: ['qcm'] },
        { ex: 2, t: 'Lois de Kirchhoff', cat: 'lois', pts: 6, topics: ['kirchhoff', 'req', 'diviseurs'] },
        { ex: 3, t: 'Interrupteurs et source de courant', cat: 'inter', pts: 6, topics: ['interrupteurs', 'source-courant', 'diviseurs'] },
        { ex: 4, t: 'Association de résistances', cat: 'req', pts: 3, topics: ['req'] }],
      note: 'Pas de corrigé officiel : corrigé rédigé et vérifié par calcul.' },
    { key: 'p2017', label: 'Partiel nov. 2017', promo: 2022, date: 'Novembre 2017', official: true,
      files: [{ k: 'Sujet', u: EP + '2022/midterm-2022-s1-elec-subject-fr.pdf' }, { k: 'Sujet', l: 'en', u: EP + '2022/midterm-2022-s1-elec-subject-en.pdf' }, { k: 'Corrigé', u: EP + '2022/midterm-2022-s1-elec-correction-fr.pdf' }],
      parts: [{ ex: 1, t: 'Questions de cours et résistances équivalentes', cat: 'qcm', pts: 5, topics: ['qcm', 'req'] },
        { ex: 2, t: 'Généralités et lois de Kirchhoff', cat: 'lois', pts: 6, topics: ['source-courant', 'req', 'diviseurs'] },
        { ex: 3, t: 'Interrupteurs', cat: 'inter', pts: 4.5, topics: ['interrupteurs', 'diviseurs'] },
        { ex: 4, t: 'Théorème de superposition', cat: 'sup', pts: 2.5, topics: ['superposition', 'source-courant'] },
        { ex: 5, t: 'Association de résistances', cat: 'req', pts: 2, topics: ['req'] }],
      note: 'Le format le plus ancien, en cinq petits exercices.' }
  ];
})();
