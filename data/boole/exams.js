/* Archi B2 (Architecture des ordinateurs · Algèbre de Boole) — notions et sujets connus.
   BOOLE_TOPICS : notions (filtres de l’entraînement, tableau des annales, QCM).
   BOOLE_EXAMS  : les sujets qui contiennent de l’algèbre de Boole, du plus récent au plus ancien. Clé pAAAA = année de
     l’automne où l’année scolaire commence (promo = AAAA + 5, dossier Epidocs S1/Finals/Archi/<promo>) : p2025 = examen
     B2 2025-2026 (Moodle, moodle: true : absent d’Epidocs), p2024 = examen 2 2024-2025 … p2014 = partiel 2014-2015 ;
     r2016, r2017 : rattrapages (retake: true, dossier S1/Retakes/Archi). p2018j : partiel de juin 2018 du S1 décalé
     (« S1# », dossier 2023#). Le dossier Epidocs 2023 est une copie du sujet 2019-2020 (dossier 2024) : non repris.
     Jusqu’en 2022-2023, l’examen de fin de S1 mêlait numération (exercices 1 et 2 : programme du B1, prog: false ici)
     et algèbre de Boole ; depuis 2023-2024 (« Examen 2 », puis « Examen B2 »), il ne porte que sur l’algèbre de Boole.
     Champs : title, meta, when (libellé court), promo (variant : « version B » pour un dossier 2023# ; alsoPromo : dossier
     Epidocs qui contient une copie du même sujet), progPts (points d’algèbre de Boole), note, files, parts :
     { ex, t, pts, topics, card (fiche d’exercice de data/boole/ex-annales.js), prog }.
     Toutes les réponses des corrigés ont été recalculées par programme (tables de vérité exhaustives) : elles sont
     justes ; coquille relevée : rattrapage 2017-2018, « Y = B̄.D̄ – B.C » pour « + ». Sujets sans corrigé (2014-2015,
     2024-2025) : réponses calculées. */
(function () {
  window.BOOLE_TOPICS = {
    'schema': 'Portes et schémas',
    'simplification': 'Simplifier une expression',
    'xor': 'OU exclusif',
    'canon1': 'Première forme canonique',
    'canon2': 'Seconde forme canonique',
    'karnaugh': 'Tableaux de Karnaugh',
    'indefini': 'Cases indéfinies (Φ)',
    'probleme': 'Problème : de l’énoncé aux équations',
    'transcodeur': 'Transcodeurs (BCD, Aiken)',
    'arith': 'Additionneur, comparateur',
    'nand': 'Portes NON-ET seules',
    'hors-programme': 'Numération (programme du B1)'
  };

  var PE = 'https://past-exams.epidocs.eu/S1/', HP = ['hors-programme'];
  function fl(kind, promo, base, list) {
    /* list : [['subject', 'fr'], …] → fichiers d’Epidocs */
    var dir = PE + kind + '/Archi/' + encodeURIComponent(promo) + '/';
    return list.map(function (x) {
      var t = (x[0] === 'subject' ? 'Sujet' : 'Corrigé') + (x[1] === 'en' ? ' en anglais' : '');
      return { t: t, url: dir + encodeURIComponent(base + x[0] + '-' + x[1] + '.pdf') };
    });
  }
  function fin(promo, list) { return fl('Finals', promo, 'final-' + promo + '-s1-archi-', list); }

  window.BOOLE_EXAMS = [
    { key: 'p2025', moodle: true, promo: 2030, when: 'examen B2 · 2025-2026', title: 'Examen B2 de 2025-2026', meta: 'promo 2030 · 1 h 30 · 20 points', progPts: '20 / 20',
      note: 'Le sujet de l’an dernier, fourni sur le Moodle avec son corrigé, en français et en anglais : le meilleur modèle. Cinq exercices, tous d’algèbre de Boole : simplifications, formes canoniques, tableaux de Karnaugh, un problème (la cuve), et les portes NON-ET. Trois des quatre expressions de l’exercice 1 sont celles du TD 1.',
      files: [{ t: 'Sujet et corrigé, français et anglais : dossier Moodle « Examen terminal 2025-2026 » (réservé aux élèves inscrits)', url: 'https://moodle.epita.fr/mod/folder/view.php?id=108720' }],
      parts: [
        { ex: '1', t: 'Simplifier au maximum, sans parenthèses (4 expressions)', pts: 4, topics: ['simplification'], card: 'p2025-ex1', prog: true },
        { ex: '2', t: 'Première et seconde formes canoniques (2 + 2 expressions)', pts: 4, topics: ['canon1', 'canon2'], card: 'p2025-ex2', prog: true },
        { ex: '3', t: 'Tableaux de Karnaugh à 4 variables avec Φ, puis S1 avec un OU exclusif', pts: 5, topics: ['karnaugh', 'indefini', 'xor'], card: 'p2025-ex3', prog: true },
        { ex: '4', t: 'Problème : la cuve à trois capteurs et cinq voyants', pts: 4, topics: ['probleme', 'karnaugh'], card: 'p2025-ex4', prog: true },
        { ex: '5', t: 'ET, OU, OU exclusif avec des portes NON-ET seules (2, 3, 5 portes)', pts: 3, topics: ['nand', 'schema'], card: 'p2025-ex5', prog: true }] },

    { key: 'p2024', promo: 2029, when: 'examen 2 · 2024-2025', title: 'Examen 2 de 2024-2025', meta: 'promo 2029 · 1 h 30 · 20 points', progPts: '20 / 20',
      note: 'Les annales n’ont que le sujet français, en version adaptée (8 pages) : pas de corrigé. Les réponses du site sont calculées par programme. Même plan que 2023-2024 et 2025-2026 ; le problème (deux réservoirs) demande d’écrire Φ pour les cas impossibles.',
      files: fin(2029, [['subject', 'fr']]).map(function (f) { f.t = 'Sujet (version adaptée)'; return f; }),
      parts: [
        { ex: '1', t: 'Simplifier au maximum, sans parenthèses (5 expressions)', pts: 5, topics: ['simplification'], card: 'p2024-ex1', prog: true },
        { ex: '2', t: 'Première et seconde formes canoniques (3 + 2 expressions)', pts: 5, topics: ['canon1', 'canon2'], card: 'p2024-ex2', prog: true },
        { ex: '3', t: 'Tableaux de Karnaugh : 2 à 3 variables, 4 à 4 variables, avec Φ', pts: 6, topics: ['karnaugh', 'indefini'], card: 'p2024-ex3', prog: true },
        { ex: '4', t: 'Problème : deux réservoirs, trois voyants, cas impossibles en Φ', pts: 4, topics: ['probleme', 'karnaugh', 'indefini'], card: 'p2024-ex4', prog: true }] },

    { key: 'p2023', promo: 2028, when: 'examen 2 · 2023-2024', title: 'Examen 2 de 2023-2024', meta: 'promo 2028 · 1 h 30 · 20 points', progPts: '20 / 20',
      note: 'Le premier examen de fin de S1 entièrement consacré à l’algèbre de Boole, avec son corrigé (en français). Les tableaux de Karnaugh S1 à S4 et S6 sont ceux de 2021-2022 ; une expression de la seconde forme canonique est reprise dans le TD 1.',
      files: fin(2028, [['subject', 'fr'], ['correction', 'fr']]),
      parts: [
        { ex: '1', t: 'Simplifier au maximum, sans parenthèses (5 expressions)', pts: 5, topics: ['simplification'], card: 'p2023-ex1', prog: true },
        { ex: '2', t: 'Première et seconde formes canoniques (2 + 2 expressions)', pts: 4, topics: ['canon1', 'canon2'], card: 'p2023-ex2', prog: true },
        { ex: '3', t: 'Tableaux de Karnaugh : 2 à 3 variables, 4 à 4 variables, avec Φ', pts: 6, topics: ['karnaugh', 'indefini'], card: 'p2023-ex3', prog: true },
        { ex: '4', t: 'Problème : le coffre aux quatre clés', pts: 3, topics: ['probleme', 'karnaugh'], card: 'p2023-ex4', prog: true },
        { ex: '5', t: 'Comparateur de deux bits, avec le OU exclusif', pts: 2, topics: ['arith', 'xor'], card: 'p2023-ex5', prog: true }] },

    { key: 'p2022', promo: 2027, when: 'partiel S1 · 2022-2023', title: 'Partiel S1 de 2022-2023', meta: 'promo 2027 · 1 h 30 · 20 points', progPts: '13 / 20',
      note: 'Examen de fin de S1 : deux exercices de numération (programme du B1), puis 13 points d’algèbre de Boole. La table de vérité de l’exercice 3 est celle du transcodeur BCD × 4 de 2017-2018, sans l’histoire ; le montage de l’exercice 4 est celui du cours.',
      files: fin(2027, [['subject', 'fr'], ['correction', 'fr']]),
      parts: [
        { ex: '1', t: 'Conversions entre bases (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '3', t: 'Tableaux de Karnaugh depuis une table de vérité (W, X, Y, Z), puis Y avec un OU exclusif', pts: 5, topics: ['karnaugh', 'indefini', 'xor', 'transcodeur'], card: 'p2022-ex3', prog: true },
        { ex: '4', t: 'Simplifier le montage du cours et le redessiner', pts: 3, topics: ['schema', 'simplification'], card: 'p2022-ex4', prog: true },
        { ex: '5', t: 'Expressions : forme simplifiée, formes canoniques, S2 = S3 ? (et une question de numération, B1)', pts: 5, topics: ['simplification', 'canon1', 'canon2', 'xor'], card: 'p2022-ex5', prog: true }] },

    { key: 'p2021', promo: 2026, when: 'partiel S1 · 2021-2022', title: 'Partiel S1 de 2021-2022', meta: 'promo 2026 · 1 h 30 · 20 points', progPts: '13 / 20',
      note: 'Deux exercices de numération (B1), puis des tableaux de Karnaugh (repris en 2023-2024) et un exercice d’expressions de 7 points, dont deux simplifications avec le OU exclusif.',
      files: fin(2026, [['subject', 'fr'], ['correction', 'fr'], ['subject', 'en'], ['correction', 'en']]),
      parts: [
        { ex: '1', t: 'Conversions entre bases (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '3', t: 'Tableaux de Karnaugh : 2 à 3 variables, 4 à 4 variables, avec Φ', pts: 6, topics: ['karnaugh', 'indefini'], card: 'p2021-ex3', prog: true },
        { ex: '4', t: 'Expressions : simplifier, formes canoniques, cas A = 1, deux OU exclusifs', pts: 7, topics: ['simplification', 'canon1', 'canon2', 'xor'], card: 'p2021-ex4', prog: true }] },

    { key: 'p2020', promo: 2025, when: 'examen final · 2020-2021', title: 'Examen final S1 de 2020-2021', meta: 'promo 2025 · 1 h 30 · 20 points', progPts: '10 / 20',
      note: 'Sujet et corrigé en anglais seulement. Le transcodeur binaire → code Aiken (5 points) est celui de 2016-2017.',
      files: fin(2025, [['subject', 'en'], ['correction', 'en']]),
      parts: [
        { ex: '1', t: 'Conversions entre bases (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '3', t: 'Transcodeur binaire naturel → code Aiken (table, Karnaugh avec Φ)', pts: 5, topics: ['transcodeur', 'karnaugh', 'indefini', 'probleme'], card: 'p2020-ex3', prog: true },
        { ex: '4', t: 'Expressions : simplifier, OU exclusif, formes canoniques', pts: 5, topics: ['simplification', 'xor', 'canon1', 'canon2'], card: 'p2020-ex4', prog: true },
        { ex: '5', t: 'Opérations posées en base 2 et 16 (B1)', pts: 3, topics: HP, prog: false }] },

    { key: 'p2019', promo: 2024, alsoPromo: 2023, when: 'partiel S1 · 2019-2020', title: 'Partiel S1 de 2019-2020', meta: 'promo 2024 · 1 h 30 · 20 points', progPts: '13 / 20',
      note: 'Le montage du cours, le comparateur de deux nombres de 2 bits et six sorties à exploiter (formes canoniques, Karnaugh, OU exclusif). Le sujet de 2014-2015 contient les mêmes exercices d’algèbre de Boole.',
      files: fin(2024, [['subject', 'fr'], ['correction', 'fr'], ['subject', 'en'], ['correction', 'en']]),
      parts: [
        { ex: '1', t: 'Conversions entre bases (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '3', t: 'Simplifier le montage du cours et le redessiner', pts: 3, topics: ['schema', 'simplification'], card: 'p2019-ex3', prog: true },
        { ex: '4', t: 'Comparateur de deux nombres de 2 bits', pts: 4, topics: ['arith', 'karnaugh', 'xor', 'probleme'], card: 'p2019-ex4', prog: true },
        { ex: '5', t: 'Six sorties : formes canoniques, Karnaugh (avec Φ), OU exclusif', pts: 6, topics: ['canon1', 'canon2', 'karnaugh', 'indefini', 'xor'], card: 'p2019-ex5', prog: true }] },

    { key: 'p2018j', promo: 2023, variant: 'version B', when: 'partiel de juin 2018 · S1#', title: 'Partiel S1# de juin 2018', meta: 'S1 décalé · 1 h 30 · 20 points', progPts: '14 / 20',
      note: 'Sujet d’une autre équipe (le S1 décalé, « S1# »), corrigé manuscrit : toutes ses réponses ont été recalculées et sont justes. Un gros problème (multiplier un chiffre BCD par 3, 9 points) et l’additionneur de deux nombres de 2 bits (le corrigé l’appelle « comparateur » par erreur).',
      files: fin('2023#', [['subject', 'fr'], ['correction', 'fr']]),
      parts: [
        { ex: '1', t: 'Conversions (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 4, topics: HP, prog: false },
        { ex: '3', t: 'Problème : multiplier un chiffre BCD par 3', pts: 9, topics: ['transcodeur', 'karnaugh', 'indefini', 'xor', 'probleme'], card: 'p2018j-ex3', prog: true },
        { ex: '4', t: 'Additionneur de deux nombres de 2 bits (+ 1 point bonus)', pts: 5, topics: ['arith', 'karnaugh', 'canon1', 'xor'], card: 'p2018j-ex4', prog: true }] },

    { key: 'p2017', promo: 2022, when: 'partiel S1 · 2017-2018', title: 'Partiel S1 de 2017-2018', meta: 'promo 2022 · 1 h 30 · 20 points', progPts: '10 / 20',
      note: 'Le transcodeur « 4 × N en BCD », dont la table revient en 2022-2023, et un exercice d’expressions en X, Y, Z.',
      files: fin(2022, [['subject', 'fr'], ['correction', 'fr'], ['subject', 'en'], ['correction', 'en']]),
      parts: [
        { ex: '1', t: 'Conversions (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '3', t: 'Problème : multiplier un chiffre BCD par 4', pts: 6, topics: ['transcodeur', 'karnaugh', 'indefini', 'xor', 'probleme'], card: 'p2017-ex3', prog: true },
        { ex: '4', t: 'Expressions : simplifier, formes canoniques', pts: 4, topics: ['simplification', 'canon1', 'canon2'], card: 'p2017-ex4', prog: true },
        { ex: '5', t: 'Nombre de bits pour coder ±2²² (B1)', pts: 3, topics: HP, prog: false }] },

    { key: 'p2016', promo: 2021, when: 'partiel S1 · 2016-2017', title: 'Partiel S1 de 2016-2017', meta: 'promo 2021 · 1 h 30 · 20 points', progPts: '10 / 20',
      note: 'Le premier transcodeur Aiken (repris en 2020-2021) et un exercice d’expressions dont S1 est l’expression S6 du TD 1.',
      files: fin(2021, [['subject', 'fr'], ['correction', 'fr']]),
      parts: [
        { ex: '1', t: 'Conversions (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '3', t: 'Transcodeur binaire naturel → code Aiken', pts: 5, topics: ['transcodeur', 'karnaugh', 'indefini', 'probleme'], card: 'p2020-ex3', prog: true },
        { ex: '4', t: 'Expressions : simplifier, OU exclusif, formes canoniques', pts: 5, topics: ['simplification', 'xor', 'canon1', 'canon2'], card: 'p2016-ex4', prog: true },
        { ex: '5', t: 'Opérations posées en base 2 et 16 (B1)', pts: 3, topics: HP, prog: false }] },

    { key: 'p2014', promo: 2020, when: 'partiel S1 · 2014-2015', title: 'Partiel S1 de 2014-2015', meta: 'promo 2020 · 1 h 30 · 20 points', progPts: '13 / 20',
      note: 'Sujet scanné, sans corrigé. Ses trois exercices d’algèbre de Boole sont ceux de 2019-2020 (comparateur de 2 bits, montage du cours, six sorties) ; seule différence : le montage se simplifie « à l’aide de la méthode algébrique », avec le détail des calculs.',
      files: fin(2020, [['subject', 'fr'], ['subject', 'en']]),
      parts: [
        { ex: '1', t: 'Conversions (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '3', t: 'Comparateur de deux nombres de 2 bits', pts: 4, topics: ['arith', 'karnaugh', 'xor', 'probleme'], card: 'p2019-ex4', prog: true },
        { ex: '4', t: 'Simplifier le montage du cours, avec le détail des calculs', pts: 3, topics: ['schema', 'simplification'], card: 'p2019-ex3', prog: true },
        { ex: '5', t: 'Six sorties : formes canoniques, Karnaugh, OU exclusif', pts: 6, topics: ['canon1', 'canon2', 'karnaugh', 'indefini', 'xor'], card: 'p2019-ex5', prog: true }] },

    { key: 'r2017', retake: true, promo: 2022, when: 'rattrapage · 2017-2018', title: 'Rattrapage de 2017-2018', meta: 'promo 2022 · 45 min · anglais', progPts: '5 / 13',
      note: 'Rattrapage en anglais, sujet et corrigé : le montage du cours avec le détail du calcul, puis deux tableaux de Karnaugh. Coquille du corrigé : « Y = B̄.D̄ – B.C » pour « + ».',
      files: fl('Retakes', 2022, 'retake-2022-s1-archi-', [['subject', 'en'], ['correction', 'en']]),
      parts: [
        { ex: '1', t: 'Conversions (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Simplifier le montage du cours par la méthode algébrique, et le redessiner', pts: 3, topics: ['schema', 'simplification'], card: 'r2017-ex3', prog: true },
        { ex: '4', t: 'Deux tableaux de Karnaugh à 4 variables, X avec un OU exclusif', pts: 2, topics: ['karnaugh', 'xor'], card: 'r2017-ex4', prog: true }] },

    { key: 'r2016', retake: true, promo: 2021, when: 'rattrapage · 2016-2017', title: 'Rattrapage de 2016-2017', meta: 'promo 2021 · 45 min · anglais', progPts: '5 / 12',
      note: 'Rattrapage en anglais, sujet et corrigé (il n’a pas d’exercice 3) : une expression à simplifier et à mettre sous ses deux formes canoniques, puis deux tableaux de Karnaugh.',
      files: fl('Retakes', 2021, 'retake-2021-s1-archi-', [['subject', 'en'], ['correction', 'en']]),
      parts: [
        { ex: '1', t: 'Conversions (B1)', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Opérations sur 8 bits (B1)', pts: 5, topics: HP, prog: false },
        { ex: '4', t: 'Expression : simplifier, formes canoniques, puis deux tableaux de Karnaugh', pts: 5, topics: ['simplification', 'canon1', 'canon2', 'karnaugh'], card: 'r2016-ex4', prog: true }] }
  ];
})();
