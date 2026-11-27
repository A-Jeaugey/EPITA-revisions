/* Physique B2 — examens de fin de semestre de physique S1 (« Partiel de physique » de janvier ou de décembre), notions
   et sujets. Source : Epidocs Past-Exams, S1/Finals/Phys/<promo>. Clé fAAAA = année de l’examen : janvier AAAA, promo
   AAAA + 4 ; f2018j = juin 2018 (S1 décalé, dossier « 2023# ») ; f2022d = décembre 2022 (promo 2027).
   Au programme : coordonnées polaires et mouvement circulaire (chapitre 1), 2e loi et énergie sur un cercle (chapitre
   2), et ce qui reste du B1 (2e loi, énergie, cinématique cartésienne). Pas encore au cours : la statique (moments
   d’une force, équilibre d’un solide), à 6 sujets sur 7 : parties prog: false, notion « statique ». Les questions en
   base de Frenet se lisent avec le chapitre 2, partie 6 (notion « frenet »).
   Le cours complet (Moodle, novembre 2026 : « Cours_cinématique_V4 », 24 pages) ne contient aucun moment de force : la statique
   des anciens sujets relève de l’ancienne ECUE. Les oscillateurs et les ondes (chapitres 3 à 5), au cours cette année, ne sont
   dans aucun de ces sujets ; leurs exercices (TD 6 à 8, partiel d’octobre 2025) sont dans data/phys2/ex-td.js.
   cards : fiches corrigées (window.PHYS2_EX, ou une fiche du B1 dans window.PHYS_EX). Réponses recalculées (sympy). */
(function () {
  var EP = 'https://past-exams.epidocs.eu/S1/Finals/Phys/';
  function f(promo, list) { return list.map(function (x) { return { k: x[0], l: x[1], u: EP + encodeURIComponent(promo) + '/final-' + encodeURIComponent(promo) + '-s1-phys-' + x[2] + '.pdf' }; }); }
  window.PHYS2_TOPICS = {
    polaire: 'Coordonnées polaires', circulaire: 'Mouvement circulaire', dyncirc: '2e loi sur un cercle', energie: 'Énergie et frottements',
    newton: '2e loi de Newton', cinematique: 'Cinématique cartésienne', trajectoire: 'Trajectoire', frenet: 'Base de Frenet', statique: 'Statique (moments)', qcm: 'Questions de cours',
    ressort: 'Force de rappel d’un ressort', oscillateur: 'Oscillateur harmonique', pendule: 'Pendule simple', amorti: 'Frottement fluide, amortissement',
    ondes: 'Ondes progressives', dephasage: 'Déphasage, interférences', stationnaire: 'Ondes stationnaires, modes propres'
  };
  /* fiches du B1 qui appartiennent maintenant au B2 (polaires, TD 5) ; elles gardent leur progression « physique-<id> » */
  window.PHYS2_FROM_B1 = ['p2021-ex2', 'p2021-ex4', 'p2017-ex2', 'p2022-ex3', 'td5-ex1', 'td5-ex2', 'td5-ex3'];
  window.PHYS2_EXAMS = [
    { key: 'f2022d', label: 'Examen déc. 2022', promo: 2027, date: 'Décembre 2022', official: false, progPts: '≈ 8 / 20',
      files: f(2027, [['Sujet (copie corrigée)', 'fr', 'subject-fr']]),
      parts: [{ ex: 1, t: 'Questions de cours : cinématique (Q1-2), moments d’une force (Q3-6)', pts: 6, topics: ['qcm', 'statique', 'circulaire'] },
        { ex: 2, t: 'Mouvement elliptique : conditions initiales, vitesse, accélération', pts: 5.5, topics: ['cinematique', 'trajectoire'], cards: ['f2022d-ex2'] },
        { ex: 3, t: 'Forces et moments sur un plongeoir', pts: 4.5, topics: ['statique'], prog: false },
        { ex: 4, t: 'Équilibre d’une masse accrochée à deux fils (+ 2 points de bonus)', pts: 4, topics: ['statique'], prog: false }],
      note: 'Le dernier sujet retrouvé, en 1 h. Seule une copie d’élève corrigée est publiée. La moitié des points porte sur la statique, pas encore au cours.' },
    { key: 'f2022', label: 'Examen janv. 2022', promo: 2026, date: 'Janvier 2022', official: false, progPts: '21 / 21',
      files: f(2026, [['Sujet', 'fr', 'subject-fr']]),
      parts: [{ ex: 1, t: 'QCM : base orthonormée, polaires, base de Frenet, trajectoire, cylindriques', pts: 4, topics: ['qcm', 'polaire', 'frenet'] },
        { ex: 2, t: 'Coordonnées cartésiennes et base de Frenet : un cercle parcouru en αt²', pts: 11, topics: ['circulaire', 'cinematique', 'frenet'], cards: ['f2022-ex2'] },
        { ex: 3, t: 'Coordonnées polaires : ρ(t), θ(t), position et vitesse', pts: 6, topics: ['polaire'], cards: ['f2022-ex3'] }],
      note: 'Le seul sujet sans statique : 100 % cinématique, polaires et cercle. Le barème imprimé totalise 21 points. Pas de corrigé publié : correction rédigée ici.' },
    { key: 'f2020', label: 'Examen janv. 2020', promo: 2024, date: 'Janvier 2020', official: true, progPts: '≈ 13 / 20',
      files: f(2024, [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 'QCM', t: 'Moments d’une force (Q1-3, Q6-7), 2e loi, force à distance, principe d’inertie', pts: 4, topics: ['qcm', 'statique'] },
        { ex: 1, t: 'Plan incliné et poulie : 2e loi, accélération, tension, réaction', pts: 5, topics: ['newton'], cards: ['f2020-ex1'] },
        { ex: 2, t: 'Poutre en équilibre : moments, tension du câble, réaction', pts: 5, topics: ['statique'], prog: false },
        { ex: 3, t: 'Gouttière en quart de cercle : 2e loi en base de Frenet, réaction, décollage', pts: 6, topics: ['dyncirc', 'energie', 'frenet'], cards: ['f2020-ex3'] }],
      note: 'L’exercice 3 est le modèle du chapitre 2 : énergie, réaction, angle de décollage cos θ = 2/3.' },
    { key: 'f2018j', label: 'Examen juin 2018 (S1#)', promo: '2023#', variant: 'S1#', date: 'Juin 2018', official: true, progPts: '≈ 12 / 20',
      files: f('2023#', [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 'QCM', t: 'Base de Frenet, équilibre de rotation, moments, énergie, travail d’un frottement', pts: 4, topics: ['qcm', 'frenet', 'statique'] },
        { ex: 1, t: 'Cercle parcouru à V₀/(1 + αt) : abscisse curviligne, accélération de Frenet', pts: 4, topics: ['circulaire', 'frenet'], cards: ['f2018j-ex1'] },
        { ex: 2, t: 'Enseigne de magasin : moments et équilibre', pts: 6, topics: ['statique'], prog: false },
        { ex: 3, t: 'Looping : vitesses par l’énergie, réaction par la 2e loi', pts: 6, topics: ['dyncirc', 'energie', 'frenet'], cards: ['f2018j-ex3'] }],
      note: 'Session du S1 décalé. Corrigé officiel manuscrit, en partie illisible : réponses recalculées.' },
    { key: 'f2018', label: 'Examen janv. 2018', promo: 2022, date: 'Janvier 2018', official: true, progPts: '≈ 12 / 20',
      files: f(2022, [['Sujet', 'fr', 'subject-fr'], ['Corrigé', 'fr', 'correction-fr']]),
      parts: [{ ex: 'QCM', t: 'Moments (Q1-3), travail, théorèmes de l’énergie', pts: 4, topics: ['qcm', 'statique'] },
        { ex: 1, t: 'Poutre retenue par un câble : moments, tension, réaction', pts: 6, topics: ['statique'], prog: false },
        { ex: 2, t: 'Bille sur une sphère : 2e loi en base de Frenet, équation du mouvement', pts: 5, topics: ['dyncirc', 'frenet'], cards: ['f2018-ex2'] },
        { ex: 3, t: 'Guide demi-cylindrique avec frottement : énergies, force de frottement', pts: 5, topics: ['energie'], cards: ['f2018-ex3'] }],
      note: 'Corrigé officiel juste ; à l’exercice 3, il prend π ≈ 3 et trouve f = 1,33·10⁻² N (0,04/π ≈ 1,27·10⁻² N).' },
    { key: 'f2017', label: 'Examen janv. 2017', promo: 2021, date: 'Janvier 2017', official: true, progPts: '≈ 14 / 20',
      files: f(2021, [['Sujet', 'fr', 'subject-fr'], ['Sujet', 'en', 'subject-en'], ['Corrigé', 'en', 'correction-en']]),
      parts: [{ ex: 1, t: 'Cycloïde en cartésiennes (A), spirale en polaires (B, Q1-2 ; Q3, Frenet)', pts: 7, topics: ['cinematique', 'polaire', 'frenet'], cards: ['p2019-ex1', 'p2017-ex2'] },
        { ex: 2, t: 'Poutre horizontale et câble : moments, tension, réaction du mur', pts: 6, topics: ['statique'], prog: false },
        { ex: 3, t: 'Piste en arc puis en ligne droite : frottements, théorème de l’énergie cinétique', pts: 7, topics: ['energie'], cards: ['f2017-ex3'] }],
      note: 'Corrigé officiel en anglais, juste. La cycloïde et la spirale sont celles des partiels 2019-2020 et de novembre 2017 : mêmes fiches.' },
    { key: 'f2016', label: 'Examen janv. 2016', promo: 2020, date: 'Janvier 2016', official: false, progPts: '≈ 9 / 20',
      files: f(2020, [['Sujet', 'fr', 'subject-fr'], ['Sujet', 'en', 'subject-en']]),
      parts: [{ ex: 1, t: 'Base de Frenet (A) ; spirale en polaires (B)', pts: 7, topics: ['polaire', 'frenet'], cards: ['p2017-ex2'] },
        { ex: 2, t: 'Barre appuyée contre un mur : moments, réaction, coefficient de frottement', pts: 7, topics: ['statique'], prog: false },
        { ex: 3, t: 'Hélice : nature du mouvement, coordonnées cylindriques', pts: 6, topics: ['cinematique', 'circulaire'], cards: ['p2018s-ex2'] }],
      note: 'Pas de corrigé publié. La spirale de la partie B est celle du partiel de novembre 2017 ; l’hélice, celle de mai 2018 (les questions en cylindriques ne sont pas au cours).' }
  ];
})();
