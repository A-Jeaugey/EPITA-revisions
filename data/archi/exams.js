/* Archi (Architecture des ordinateurs · Numération) — notions et sujets connus.
   ARCHI_TOPICS : notions (filtres de l’entraînement, tableau des annales, QCM), ids fixés par le brief de la section.
   ARCHI_EXAMS  : les 10 sujets, du plus récent au plus ancien. Clé pAAAA = année de l’automne où le sujet a été posé
     (promo = AAAA + 5, dossier Epidocs) : p2025 = examen B1 2025-2026 du Moodle, p2024 = examen 1 2024-2025 (promo
     2029) … p2016 = midterm 2016-2017 (promo 2021). Les dates exactes ne sont imprimées sur aucun sujet : seule
     l’année scolaire est connue.
     Champs : title, meta, progPts (part du barème au programme de cette année, estimée quand une partie seulement d’un
     exercice l’est), note, files (PDF des annales, vérifiés sur disque dans un clone d’Epidocs/Past-Exams ; dossier
     Moodle pour p2025), parts : { ex, t, pts, topics, card (fiche d’exercice), prog (au programme de cette année) }.
     Hors programme cette année (absents du chapitre 1, du plan Moodle et des TD) : puissances de deux à simplifier,
     préfixes binaires (Ki, Mi, Gi), bases inconnues, plans mémoire et fils d’adresse, addition en base 8.
     Source : $S/analysis/archi_midterms.md (§3, §4). */
(function () {
  window.ARCHI_TOPICS = {
    'bases': 'Numération de position',
    'vers-10': 'Vers la base 10',
    'depuis-10': 'Depuis la base 10',
    'fraction': 'Parties fractionnaires, troncature',
    'paquets': 'Base 2 ↔ base 16 (paquets)',
    'addition': 'Addition (bases 2 et 16)',
    'soustraction': 'Soustraction binaire',
    'multiplication': 'Multiplication binaire',
    'division': 'Division binaire',
    'non-signe': 'Entiers non signés',
    'signe': 'Entiers signés (complément à deux)',
    'depassement': 'Dépassements',
    'plages': 'Plages de valeurs',
    'ieee-encodage': 'IEEE 754 : encoder',
    'ieee-decodage': 'IEEE 754 : décoder',
    'ieee-special': 'IEEE 754 : valeurs particulières',
    'codes': 'BCD, Gray, ASCII',
    'hors-programme': 'Hors programme'
  };

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Archi/';
  var CONV = ['vers-10', 'depuis-10', 'fraction', 'paquets'], OPS = ['soustraction', 'addition', 'division'], N8 = ['non-signe', 'signe', 'depassement'],
    IEEE = ['ieee-encodage', 'ieee-decodage', 'ieee-special'], HP = ['hors-programme'];
  function f4(promo, sfr, cfr, sen, cen) {
    var o = [], d = PE + promo + '/';
    if (sfr) o.push({ t: 'Sujet', url: d + sfr });
    if (cfr) o.push({ t: 'Corrigé', url: d + cfr });
    if (sen) o.push({ t: 'Sujet en anglais', url: d + sen });
    if (cen) o.push({ t: 'Corrigé en anglais', url: d + cen });
    return o;
  }
  function std(promo) { var n = 'midterm-' + promo + '-s1-archi-'; return f4(promo, n + 'subject-fr.pdf', n + 'correction-fr.pdf', n + 'subject-en.pdf', n + 'correction-en.pdf'); }

  window.ARCHI_EXAMS = [
    { key: 'p2025', title: 'Examen B1 de 2025-2026', meta: 'promo 2030 · 1 h · 20 points', progPts: '20 / 20',
      note: 'L’examen de fin de semestre de l’an dernier, fourni sur le Moodle avec son corrigé, en français et en anglais. Il dure 1 h, contre 1 h 30 pour les sujets précédents, avec moins de lignes. Même plan que depuis 2023 : conversions, opérations posées, opérations sur 8 bits, IEEE 754. La multiplication reprend celle de 2023-2024. Corrigé officiel entièrement juste (recalculé).',
      files: [{ t: 'Sujet et corrigé, français et anglais : dossier Moodle « Examen terminal 2025-2026 » (réservé aux élèves inscrits)', url: 'https://moodle.epita.fr/mod/folder/view.php?id=108465' }],
      parts: [
        { ex: '1', t: 'Conversions entre les bases 2, 10 et 16 (8 lignes)', pts: 4, topics: CONV, card: 'p2025-ex1', prog: true },
        { ex: '2', t: 'Opérations posées : soustraction binaire, addition hexadécimale à trois termes, division et multiplication binaires', pts: 6, topics: OPS.concat('multiplication'), card: 'p2025-ex2', prog: true },
        { ex: '3', t: 'Opérations sur 8 bits : résultat binaire, valeurs non signée et signée (3 lignes)', pts: 6, topics: N8, card: 'p2025-ex3', prog: true },
        { ex: '4', t: 'IEEE 754 : encoder en simple précision, décoder des mots double précision', pts: 4, topics: IEEE, card: 'p2025-ex4', prog: true }] },

    { key: 'p2024', title: 'Examen 1 de 2024-2025', meta: 'promo 2029 · 1 h 30 · 20 points', progPts: '20 / 20',
      note: 'Les annales n’ont que le sujet français, en version adaptée (police OpenDyslexic, 6 pages) : ni version anglaise ni corrigé. Les réponses du site sont recalculées par programme. Nouveautés reprises en 2025-2026 : addition hexadécimale à trois termes, nombres binaires écrits par paquets de 4.',
      files: f4(2029, 'midterm-2029-s1-archi-subject-fr.pdf').map(function (f) { f.t = 'Sujet (version adaptée)'; return f; }),
      parts: [
        { ex: '1', t: 'Conversions entre les bases 2, 10 et 16 (10 lignes)', pts: 5, topics: CONV, card: 'p2024-ex1', prog: true },
        { ex: '2', t: 'Opérations posées : soustraction binaire, addition hexadécimale à trois termes, division et multiplication binaires', pts: 4, topics: OPS.concat('multiplication'), card: 'p2024-ex2', prog: true },
        { ex: '3', t: 'Opérations sur 8 bits (5 lignes, dont 127 + 1 et 255 + 1)', pts: 5, topics: N8, card: 'p2024-ex3', prog: true },
        { ex: '4', t: 'IEEE 754 : encoder en simple précision, décoder des mots double précision (dont +∞)', pts: 6, topics: IEEE, card: 'p2024-ex4', prog: true }] },

    { key: 'p2023', title: 'Examen 1 de 2023-2024', meta: 'promo 2028 · 1 h 30 · 20 points', progPts: '20 / 20',
      note: 'Premier sujet au format actuel : quatre exercices (conversions, opérations posées, opérations sur 8 bits, IEEE 754), plus de puissances de deux, de préfixes binaires ni de base 8. Corrigé officiel en français et en anglais, entièrement juste (recalculé), avec le seul nombre dénormalisé corrigé des sujets.',
      files: std(2028),
      parts: [
        { ex: '1', t: 'Conversions entre les bases 2, 10 et 16 (10 lignes)', pts: 5, topics: CONV, card: 'p2023-ex1', prog: true },
        { ex: '2', t: 'Opérations posées : soustraction binaire, addition hexadécimale, division et multiplication binaires', pts: 4, topics: OPS.concat('multiplication'), card: 'p2023-ex2', prog: true },
        { ex: '3', t: 'Opérations sur 8 bits (5 lignes)', pts: 5, topics: N8, card: 'p2023-ex3', prog: true },
        { ex: '4', t: 'IEEE 754 : encoder en simple précision, décoder des mots double précision (dont un dénormalisé et un NaN)', pts: 6, topics: IEEE, card: 'p2023-ex4', prog: true }] },

    { key: 'p2022', title: 'Contrôle S1 de 2022-2023', meta: 'promo 2027 · 1 h 30 · 20 points', progPts: '≈ 10 / 20',
      note: 'Dernier sujet à l’ancien format. Hors programme cette année : les exercices 1 (puissances de deux), 2 (préfixes binaires) et 6 (plan mémoire), et l’addition en base 8 de l’exercice 5. L’exercice 4 reprend celui de 2019-2020. Corrigé officiel en français et en anglais, juste.',
      files: std(2027),
      parts: [
        { ex: '1', t: 'Simplifier des expressions en puissance de deux', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Préfixes binaires : octets et bits (Ki, Mi, Gi)', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Conversions, dont les bases 8, 7, 4 et 5 (10 lignes)', pts: 5, topics: CONV, card: 'p2022-ex3', prog: true },
        { ex: '4', t: 'Sur 8 bits : 250 + 10, 4 − 10, 120 + 10, −126 − 10', pts: 2, topics: N8, card: 'p2022-ex4', prog: true },
        { ex: '5', t: 'Opérations posées : soustraction binaire, addition hexadécimale, division binaire (l’addition en base 8 est hors programme)', pts: 4, topics: OPS, card: 'p2022-ex5', prog: true },
        { ex: '6', t: 'Mémoires : fils d’adresse, adresses hautes, plan mémoire', pts: 4, topics: HP, prog: false }] },

    { key: 'p2021', title: 'Contrôle S1 de 2021-2022', meta: 'promo 2026 · 1 h 30 · 20 points', progPts: '≈ 13 / 20',
      note: 'Les fichiers anglais des annales sont des PDF images (même contenu que le français). Hors programme cette année : les exercices 1 (puissances de deux) et 2 (préfixes binaires), et l’addition en base 8 de l’exercice 4. Le corrigé écrit « 1 Go = 8 Gib » (exercice 2, hors programme) : juste seulement si Go se lit Gio. Corrigé officiel juste pour le reste.',
      files: std(2026),
      parts: [
        { ex: '1', t: 'Simplifier des expressions en puissance de deux', pts: 3, topics: HP, prog: false },
        { ex: '2', t: 'Préfixes binaires : octets et bits (Ki, Mi, Gi)', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Conversions, dont les bases 8, 13, 5 et 7 (10 lignes)', pts: 5, topics: CONV, card: 'p2021-ex3', prog: true },
        { ex: '4', t: 'Opérations posées : soustraction, addition hexadécimale, division, multiplication (l’addition en base 8 est hors programme)', pts: 5, topics: OPS.concat('multiplication'), card: 'p2021-ex4', prog: true },
        { ex: '5', t: 'Puissances négatives de 2, combinaisons d’un octet, nombre de bits pour ±8192 en signé', pts: 4, topics: ['bases', 'plages', 'signe'], card: 'p2021-ex5', prog: true }] },

    { key: 'p2020', title: 'Contrôle S1 de 2020-2021', meta: 'promo 2025 · 1 h 30 · 20 points', progPts: '11 / 20',
      note: 'Pas d’opérations posées dans ce sujet. Les fichiers anglais sont rangés dans le dossier 2025 sous le nom « midterm-2024 » : ce sont bien les versions anglaises de 2020-2021. Le barème diffère : exercice 4 sur 3 points en français, 5 en anglais ; exercice 5 sur 6 points en français, 4 en anglais (le site suit le français). Hors programme cette année : les exercices 1, 2 et 4. Corrigé officiel juste.',
      files: f4(2025, 'midterm-2025-s1-archi-subject-fr.pdf', 'midterm-2025-s1-archi-correction-fr.pdf', 'midterm-2024-s1-archi-subject-en.pdf', 'midterm-2024-s1-archi-correction-en.pdf'),
      parts: [
        { ex: '1', t: 'Simplifier des expressions en puissance de deux', pts: 3, topics: HP, prog: false },
        { ex: '2', t: 'Préfixes binaires : bits et octets (Ki, Mi, Gi)', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Conversions, dont les bases 8, 5, 9 et 3 (10 lignes)', pts: 5, topics: CONV, card: 'p2020-ex3', prog: true },
        { ex: '4', t: 'Bases inconnues : 22<sub>b</sub> × 25<sub>b</sub> = 50A<sub>b</sub>, 208<sub>a</sub> = 808<sub>b</sub>', pts: 3, topics: HP, prog: false },
        { ex: '5', t: 'Sur n bits : nombre d’entiers, plus grand et plus petit ; complément à un (vrai ou faux)', pts: 6, topics: ['plages', 'non-signe', 'signe'], card: 'p2020-ex5', prog: true }] },

    { key: 'p2019', title: 'Contrôle S1 de 2019-2020', meta: 'promo 2024 · 1 h 30 · 20 points', progPts: '≈ 9 / 20',
      note: 'Les annales n’ont pas le sujet français : l’énoncé français vient du corrigé français. La division reprend celle de 2016-2017 et l’exercice 4 les exemples du cours (même exercice en 2022-2023). Hors programme cette année : les exercices 1, 2 et 6, et l’addition en base 8 de l’exercice 5. Corrigé officiel juste.',
      files: f4(2024, null, 'midterm-2024-s1-archi-correction-fr.pdf', 'midterm-2024-s1-archi-subject-en.pdf', 'midterm-2024-s1-archi-correction-en.pdf'),
      parts: [
        { ex: '1', t: 'Simplifier des expressions en puissance de deux', pts: 3, topics: HP, prog: false },
        { ex: '2', t: 'Préfixes binaires : bits et octets (Ki, Mi, Gi)', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Conversions, dont les bases 8, 7, 9 et 3 (8 lignes)', pts: 4, topics: CONV, card: 'p2019-ex3', prog: true },
        { ex: '4', t: 'Sur 8 bits : 250 + 10, 4 − 10, 120 + 10, −126 − 10', pts: 2, topics: N8, card: 'p2022-ex4', prog: true },
        { ex: '5', t: 'Opérations posées : soustraction binaire, addition hexadécimale, division binaire (l’addition en base 8 est hors programme)', pts: 4, topics: OPS, card: 'p2019-ex5', prog: true },
        { ex: '6', t: 'Mémoires : fils d’adresse, adresses hautes, plan mémoire', pts: 4, topics: HP, prog: false }] },

    { key: 'p2018', title: 'Contrôle S1 de 2018-2019', meta: 'promo 2023 · 1 h 30 · 20 points', progPts: '≈ 11 / 20',
      note: 'Pas de corrigé français dans les annales : le corrigé anglais fait foi. Hors programme cette année : les exercices 1 (puissances de deux), 2 (préfixes binaires) et 4 (bases inconnues), et l’addition en base 8 de l’exercice 5. L’exercice 6 est repris en 2020-2021. Corrigé officiel juste.',
      files: f4(2023, 'midterm-2023-s1-archi-subject-fr.pdf', null, 'midterm-2023-s1-archi-subject-en.pdf', 'midterm-2023-s1-archi-correction-en.pdf'),
      parts: [
        { ex: '1', t: 'Simplifier des expressions en puissance de deux', pts: 3, topics: HP, prog: false },
        { ex: '2', t: 'Préfixes binaires : bits et octets (Ki, Mi, Gi)', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Conversions, dont les bases 8, 5, 9 et 3 (8 lignes)', pts: 4, topics: CONV, card: 'p2018-ex3', prog: true },
        { ex: '4', t: 'Bases inconnues : 124<sub>b</sub> = 103<sub>8</sub>, 208<sub>a</sub> = 808<sub>b</sub>', pts: 2, topics: HP, prog: false },
        { ex: '5', t: 'Opérations posées : soustraction binaire, addition hexadécimale, division binaire (l’addition en base 8 est hors programme)', pts: 4, topics: OPS, card: 'p2018-ex5', prog: true },
        { ex: '6', t: 'Sur n bits : nombre d’entiers, plus grand et plus petit', pts: 4, topics: ['plages', 'non-signe', 'signe'], card: 'p2020-ex5', prog: true }] },

    { key: 'p2017', title: 'Contrôle S1 de 2017-2018', meta: 'promo 2022 · 1 h 30 · 20 points', progPts: '≈ 11 / 20',
      note: 'Hors programme cette année : l’exercice 1 (puissances de deux, préfixes binaires), l’exercice 5 (plan mémoire) et l’addition en base 8 de l’exercice 4. Corrigé officiel en français et en anglais, juste.',
      files: std(2022),
      parts: [
        { ex: '1', t: 'Puissances de deux et préfixes binaires', pts: 4, topics: HP, prog: false },
        { ex: '2', t: 'Conversions, dont les bases 8, 5, 9 et 3 (8 lignes)', pts: 4, topics: CONV, card: 'p2017-ex2', prog: true },
        { ex: '3', t: 'Opérations sur 8 bits (4 lignes, résultat seul)', pts: 4, topics: N8, card: 'p2017-ex3', prog: true },
        { ex: '4', t: 'Opérations posées : soustraction binaire, addition hexadécimale, division binaire (l’addition en base 8 est hors programme)', pts: 4, topics: OPS, card: 'p2017-ex4', prog: true },
        { ex: '5', t: 'Mémoires : fils d’adresse, adresses hautes, plan mémoire', pts: 4, topics: HP, prog: false }] },

    { key: 'p2016', title: 'Midterm S1 de 2016-2017', meta: 'promo 2021 · 1 h 30 · 20 points', progPts: '≈ 11 / 20',
      note: 'Sujet et corrigé en anglais seulement (énoncés traduits sur le site). À l’exercice 2 (hors programme), le sujet écrit « 4³⁷ bytes » et le corrigé « 2³⁷ bytes = 128 GiB » : coquille du sujet. Hors programme cette année : les exercices 1, 2 et 4, et l’addition en base 8 de l’exercice 5. Corrigé officiel juste.',
      files: f4(2021, null, null, 'midterm-2021-s1-archi-subject-en.pdf', 'midterm-2021-s1-archi-correction-en.pdf'),
      parts: [
        { ex: '1', t: 'Simplifier des expressions en puissance de deux', pts: 3, topics: HP, prog: false },
        { ex: '2', t: 'Préfixes binaires : bits et octets (Ki, Mi, Gi)', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Conversions, dont les bases 8, 7, 9 et 3 (8 lignes)', pts: 4, topics: CONV, card: 'p2016-ex3', prog: true },
        { ex: '4', t: 'Bases inconnues : 111<sub>b</sub> = 1121<sub>3</sub>, 200<sub>a</sub> = 20402<sub>b</sub>', pts: 2, topics: HP, prog: false },
        { ex: '5', t: 'Opérations posées : soustraction binaire, addition hexadécimale, division binaire (l’addition en base 8 est hors programme)', pts: 4, topics: OPS, card: 'p2016-ex5', prog: true },
        { ex: '6', t: 'Sur n bits : nombre d’entiers, plus grand et plus petit', pts: 4, topics: ['plages', 'non-signe', 'signe'], card: 'p2020-ex5', prog: true }] }
  ];
  window.ARCHI_EX = window.ARCHI_EX || [];
})();
