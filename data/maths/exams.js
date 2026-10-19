/* Maths (examen 1 : OBM et DP) — notions et sujets connus.
   MATHS_TOPICS : notions (filtres de l’entraînement, tableau des annales, QCM), ids fixés par le brief de la section.
   MATHS_ECUE   : l’ECUE de chaque notion ('obm' ou 'dp' ; null pour « hors programme »).
   MATHS_EXAMS  : les 11 sujets, du plus récent au plus ancien. Depuis octobre 2023, deux épreuves séparées par ECUE
     (clés p2024-dp, p2024-obm, p2023-dp, p2023-le ; LE = « logique et ensembles », l’ancêtre d’OBM) ; avant, un
     contrôle combiné par an (p2022 … p2016), surtout de l’analyse. Clé pAAAA = année de l’automne où le sujet a été
     posé (promo = AAAA + 5, dossier Epidocs).
     Champs : key, ecue ('obm' | 'dp' | 'mixte'), title, meta, progPts (part du barème au programme de l’examen 1
     cette année), note (ce qui distingue le sujet), files (PDF des annales Epidocs, vérifiés sur disque dans un clone
     de Past-Exams), parts : { ex, t, pts, topics, card (fiche d’exercice de data/maths/ex-annales.js), prog }.
     Hors programme (prog: false) : analyse (dérivées, limites, développements limités, valeurs intermédiaires),
     intégrales, suites, nombres complexes. Le séminaire 2026 (programme d’OBM) ne contient ni complexes ni
     intégrales ; les intégrales relèvent d’APIS (examen 2).
     Source : $S/analysis/maths_midterms.md (§0.2, §3, §4, §6). */
(function () {
  window.MATHS_TOPICS = {
    'logique': 'Logique : connecteurs, implication',
    'quantificateurs': 'Quantificateurs, négation',
    'ensembles': 'Ensembles, inclusion',
    'cardinal': 'Cardinal, crible',
    'fonctions': 'Fonctions, composition',
    'images': 'Image directe, image réciproque',
    'injections': 'Injection, surjection, bijection',
    'usuelles': 'Fonctions usuelles',
    'raisonnement': 'Raisonnements : contraposée, double inclusion',
    'relations': 'Relations binaires',
    'recurrence': 'Récurrence',
    'sommes': 'Sommes',
    'denombrement': 'Dénombrement',
    'binomial': 'Coefficients binomiaux, binôme',
    'probabilites': 'Probabilités, équiprobabilité',
    'conditionnelles': 'Probabilités conditionnelles et totales',
    'independance': 'Indépendance',
    'bayes': 'Formule de Bayes',
    'variables': 'Variables aléatoires, loi',
    'esperance': 'Espérance, variance',
    'lois': 'Lois de Bernoulli, binomiale',
    'demonstrations': 'Démonstrations de cours',
    'hors-programme': 'Hors programme'
  };
  window.MATHS_ECUE = {
    'logique': 'obm', 'quantificateurs': 'obm', 'ensembles': 'obm', 'cardinal': 'obm', 'fonctions': 'obm', 'images': 'obm',
    'injections': 'obm', 'usuelles': 'obm', 'raisonnement': 'obm', 'relations': 'obm', 'recurrence': 'obm', 'sommes': 'obm',
    'denombrement': 'dp', 'binomial': 'dp', 'probabilites': 'dp', 'conditionnelles': 'dp', 'independance': 'dp', 'bayes': 'dp',
    'variables': 'dp', 'esperance': 'dp', 'lois': 'dp', 'demonstrations': 'dp',
    'hors-programme': null
  };

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Maths%20PC/';
  var HP = ['hors-programme'];
  /* fichiers : [libellé, chemin dans le dossier de la promo] */
  function files(dir, list) { return list.map(function (f) { return { t: f[0], url: PE + dir + '/' + f[1] }; }); }
  function std(promo, kinds) {
    var n = 'midterm-' + promo + '-s1-maths-', L = { s: ['Sujet', 'subject-fr'], se: ['Sujet en anglais', 'subject-en'], c: ['Corrigé', 'correction-fr'], ce: ['Corrigé en anglais', 'correction-en'] };
    return kinds.map(function (k) { return [L[k][0], n + L[k][1] + '.pdf']; });
  }

  window.MATHS_EXAMS = [
    { key: 'p2024-dp', ecue: 'dp', title: 'Examen DP d’octobre 2024', meta: 'promo 2029 · 2 h · 40 points ramenés sur 20', progPts: '40 / 40',
      note: 'Le sujet le plus proche de ton examen DP : même durée, même plan que l’examen DP 2023 pour les exercices 2 à 6 (dénombrement concret, identité binomiale, probabilités conditionnelles avec seuil, démonstration de cours, binomiale sur 20 tirages). Nouveauté : l’exercice 1 demande d’inventer une situation de tirage pour une formule donnée. Les annales n’ont pas de corrigé : toutes les réponses du site sont recalculées par programme. Coquille de l’énoncé : « k ∈ ⟦1, n⟧ » à l’exercice 6.2, lire ⟦1, 20⟧.',
      files: files('2029/PC/DP', std(2029, ['s'])),
      parts: [
        { ex: '1', t: 'Proposer une situation de tirage de 5 cartes pour quatre formules données', pts: 4, topics: ['denombrement', 'binomial'], card: 'p2024-dp-ex1', prog: true },
        { ex: '2', t: 'Digicode : codes à chiffres distincts, avec répétition, impairs, au moins un 4', pts: 6, topics: ['denombrement'], card: 'p2024-dp-ex2', prog: true },
        { ex: '3', t: 'Jetons de Teddy : double dénombrement de \\(\\binom{n}{p}\\binom{p}{k}\\), preuve par le calcul, somme', pts: 8.5, topics: ['binomial', 'denombrement'], card: 'p2024-dp-ex3', prog: true },
        { ex: '4', t: 'Probabilités conditionnelles : traduire, probabilités totales, Bayes, proportion minimale', pts: 6.5, topics: ['conditionnelles', 'bayes'], card: 'p2024-dp-ex4', prog: true },
        { ex: '5', t: 'Cours : espérance et variance, \\(\\E(aX+b)\\) et \\(\\mathrm{Var}(aX+b)\\) démontrées', pts: 6, topics: ['esperance', 'demonstrations'], card: 'p2024-dp-ex5', prog: true },
        { ex: '6', t: 'Urne 0, 1, 1, 2 : loi, espérance, variance, Bernoulli, binomiale sur 20 tirages', pts: 9, topics: ['variables', 'esperance', 'lois'], card: 'p2024-dp-ex6', prog: true }] },

    { key: 'p2024-obm', ecue: 'obm', title: 'Examen OBM d’octobre 2024', meta: 'promo 2029 · 2 h 30 · 40 points ramenés sur 20', progPts: '24 / 40',
      note: 'Le premier examen OBM, sans corrigé dans les annales : les réponses du site sont recalculées. Il durait 2 h 30 et contenait 16 points d’intégrales (exercice 5) et de nombres complexes (exercice 6), absents du séminaire 2026 : ton examen OBM dure 2 h et porte sur le séminaire seul. Les exercices 1 à 4 sont au programme : logique (10 points), images et injectivité sur un produit cartésien, tableau d’images par exp et cos, relation \\(|a| \\leq |b|\\).',
      files: files('2029/PC/OBM', std(2029, ['s'])),
      parts: [
        { ex: '1', t: 'Logique : conditions nécessaires et suffisantes, quantificateurs, contraposée, double inclusion', pts: 10, topics: ['logique', 'quantificateurs', 'raisonnement', 'ensembles'], card: 'p2024-obm-ex1', prog: true },
        { ex: '2', t: 'Fonction \\((x, y) \\mapsto x + y\\) sur \\(E \\times F\\) : images, injectivité, surjectivité, restrictions', pts: 7, topics: ['images', 'injections', 'ensembles'], card: 'p2024-obm-ex2', prog: true },
        { ex: '3', t: 'Tableau d’images directes et réciproques par exp et cos', pts: 3, topics: ['images', 'usuelles'], card: 'p2024-obm-ex3', prog: true },
        { ex: '4', t: 'Relation \\(a \\mathrel{\\mathcal{R}} b \\Leftrightarrow |a| \\leq |b|\\) sur \\(\\R\\)', pts: 4, topics: ['relations'], card: 'p2024-obm-ex4', prog: true },
        { ex: '5', t: 'Intégrales : primitive, intégration par parties, changement de variable', pts: 6, topics: HP, prog: false },
        { ex: '6', t: 'Nombres complexes : questions de cours et exercices types', pts: 10, topics: HP, prog: false }] },

    { key: 'p2023-dp', ecue: 'dp', title: 'Examen DP d’octobre 2023', meta: 'promo 2028 · 2 h · 30 points ramenés sur 20', progPts: '30 / 30',
      note: 'Le premier examen DP séparé, avec corrigé officiel en français et en anglais (énoncés anglais repris sur le site). Tout est au programme. L’exercice 6 est l’exercice 5.21 du TD 2. Le corrigé est juste ; seules coquilles : « P(X = 0) » et « E(X) » sans l’indice k à l’exercice 6, et « Ils doivent être justifier » dans l’énoncé de l’exercice 4.',
      files: files('2028/PC/DP', std(2028, ['s', 'c', 'ce'])),
      parts: [
        { ex: '1', t: 'Cardinal : union disjointe, partition, crible démontré', pts: 3, topics: ['cardinal'], card: 'p2023-dp-ex1', prog: true },
        { ex: '2', t: 'Podiums d’une course de 20 cyclistes', pts: 7, topics: ['denombrement'], card: 'p2023-dp-ex2', prog: true },
        { ex: '3', t: 'Urne de boules vertes et rouges : formule de Vandermonde', pts: 5, topics: ['denombrement', 'binomial'], card: 'p2023-dp-ex3', prog: true },
        { ex: '4', t: 'Soutien en maths : probabilités totales, Bayes, seuil', pts: 5, topics: ['conditionnelles', 'bayes'], card: 'p2023-dp-ex4', prog: true },
        { ex: '5', t: 'Cours : \\(\\E(X + Y)\\), \\(\\E(aX + b)\\) et \\(\\mathrm{Var}(X) = \\E(X^2) - (\\E(X))^2\\) démontrée', pts: 4, topics: ['esperance', 'demonstrations'], card: 'p2023-dp-ex5', prog: true },
        { ex: '6', t: 'QCM de 20 questions au hasard : Bernoulli, binomiale', pts: 6, topics: ['variables', 'esperance', 'lois'], card: 'p2023-dp-ex6', prog: true }] },

    { key: 'p2023-le', ecue: 'obm', title: 'Examen LE d’octobre 2023', meta: 'promo 2028 · 1 h · 20 points', progPts: '18 / 20',
      note: 'Examen « logique et ensembles », l’ancêtre de l’OBM, en 1 h seulement. Corrigé officiel en français et en anglais, juste (énoncés anglais repris sur le site). L’exercice 1 (équation du second degré dans \\(\\mathbb{C}\\)) est hors programme. La relation de l’exercice 4 est réflexive, transitive et antisymétrique : c’est une relation d’ordre, ce que le corrigé ne dit pas.',
      files: files('2028/PC/LE', std(2028, ['s', 'c', 'ce'])),
      parts: [
        { ex: '1', t: 'Équation du second degré dans \\(\\mathbb{C}\\), forme exponentielle', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Logique : traduire, nier, cocher les implications vraies', pts: 6, topics: ['quantificateurs', 'logique'], card: 'p2023-le-ex2', prog: true },
        { ex: '3', t: 'Ensembles et fonctions : définitions, fonction à construire, \\(x \\mapsto |x - 1|\\)', pts: 8, topics: ['images', 'injections', 'usuelles'], card: 'p2023-le-ex3', prog: true },
        { ex: '4', t: 'Relation \\(a \\mathrel{\\mathcal{R}} b \\Leftrightarrow \\exists n \\in \\N,\\ b = a^n\\)', pts: 4, topics: ['relations'], card: 'p2023-le-ex4', prog: true }] },

    { key: 'p2022', ecue: 'mixte', title: 'Contrôle S1 de novembre 2022', meta: 'promo 2027 · 3 h · 40 points ramenés sur 20', progPts: '35 / 40',
      note: 'Le dernier contrôle combiné, et le plus proche du programme actuel : seul l’exercice 1 (intégrales) est hors programme. Corrigé officiel juste. L’exercice 4.2 est l’exercice 3.18 du TD 1 ; sa question (d) se lit de deux façons (voir la fiche). Coquille du corrigé : « E(X) » et « V(X) » pour la variable Y à l’exercice 5.',
      files: files('2027', [['Sujet', 'midterm-2027-s1-maths-subject.pdf'], ['Corrigé', 'midterm-2027-s1-maths-correction-fr.pdf']]),
      parts: [
        { ex: '1', t: 'Intégrales', pts: 5, topics: HP, prog: false },
        { ex: '2', t: 'Ensembles et fonctions : images, \\(x \\mapsto |x| + 1\\), composée d’injections, de surjections', pts: 8.5, topics: ['images', 'injections', 'fonctions'], card: 'p2022-ex2', prog: true },
        { ex: '3', t: 'Relations : réflexive, antisymétrique, transitive, négations, relation d’ordre', pts: 4, topics: ['relations', 'quantificateurs'], card: 'p2022-ex3', prog: true },
        { ex: '4', t: 'Comités et groupes de responsables dans une classe de 20', pts: 6.5, topics: ['denombrement'], card: 'p2022-ex4', prog: true },
        { ex: '5', t: 'Urne : Bernoulli, binomiale, rang de la première boule blanche', pts: 6.5, topics: ['variables', 'esperance', 'lois'], card: 'p2022-ex5', prog: true },
        { ex: '6', t: 'Deux boîtes de sucettes : probabilités totales, Bayes', pts: 2.5, topics: ['conditionnelles', 'bayes'], card: 'p2022-ex6', prog: true },
        { ex: '7', t: 'Démonstration : \\(\\E(aX + b) = a\\E(X) + b\\)', pts: 3, topics: ['esperance', 'demonstrations'], card: 'p2022-ex7', prog: true },
        { ex: '8', t: 'Binôme et coloriage : \\(\\sum \\binom{n}{k} 3^{n-k} = 4^n\\)', pts: 4, topics: ['binomial', 'denombrement'], card: 'p2022-ex8', prog: true }] },

    { key: 'p2021', ecue: 'mixte', title: 'Contrôle S1 de novembre 2021', meta: 'promo 2026 · 3 h · 30 points ramenés sur 20', progPts: '25,5 / 30',
      note: 'Le seul sujet des annales qui existe aussi en anglais (énoncé anglais officiel repris sur le site). Seul l’exercice 3 (intégrales) est hors programme. Corrigé officiel en français, juste ; il arrondit les probabilités de l’exercice 7 (0,40 et 0,62) alors que les valeurs exactes sont 159/400 et 33/53.',
      files: files('2026', std(2026, ['s', 'se', 'c'])),
      parts: [
        { ex: '1', t: 'Relation \\(x^2 \\leq y^2\\) : est-ce une relation d’ordre ?', pts: 3, topics: ['relations'], card: 'p2021-ex1', prog: true },
        { ex: '2', t: 'Traduire trois phrases avec des quantificateurs', pts: 3, topics: ['quantificateurs'], card: 'p2021-ex2', prog: true },
        { ex: '3', t: 'Intégrales', pts: 4.5, topics: HP, prog: false },
        { ex: '4', t: 'Fonction de \\(\\N\\) dans \\(\\N\\) : injectivité, surjectivité, images', pts: 3.5, topics: ['images', 'injections'], card: 'p2021-ex4', prog: true },
        { ex: '5', t: 'Formule de Pascal : par les tirages, puis par le calcul', pts: 5, topics: ['binomial', 'denombrement'], card: 'p2021-ex5', prog: true },
        { ex: '6', t: 'Dé : Bernoulli, binomiale, loi d’un gain', pts: 5, topics: ['variables', 'esperance', 'lois'], card: 'p2021-ex6', prog: true },
        { ex: '7', t: 'Test de dépistage : probabilités totales, Bayes', pts: 4, topics: ['conditionnelles', 'bayes'], card: 'p2021-ex7', prog: true },
        { ex: '8', t: 'Somme géométrique par récurrence', pts: 2, topics: ['recurrence', 'sommes'], card: 'p2021-ex8', prog: true }] },

    { key: 'p2020', ecue: 'mixte', title: 'Contrôle 1 de novembre 2020', meta: 'promo 2025 · 3 h · 30 points ramenés sur 20', progPts: '25 / 30',
      note: 'Corrigé manuscrit, juste. Seul l’exercice 3 (dérivée, intégrales) est hors programme. La relation « habiter à moins de 5 min » des exercices 1 et 2 est imprécise : un élève est à moins de 5 min de lui-même, il faut donc lire « camarade » comme « autre élève » (voir la fiche).',
      files: files('2025', std(2025, ['s', 'c'])),
      parts: [
        { ex: '1', t: 'Traduire des phrases sur une relation entre élèves', pts: 3, topics: ['quantificateurs', 'relations'], card: 'p2020-ex1', prog: true },
        { ex: '2', t: 'Cette relation est-elle une relation d’ordre ?', pts: 4, topics: ['relations'], card: 'p2020-ex2', prog: true },
        { ex: '3', t: 'Dérivée et intégrales', pts: 5, topics: HP, prog: false },
        { ex: '4', t: 'Fonction \\(x \\mapsto (x - 2)^2 - 1\\) : rendre injective, rendre surjective', pts: 3, topics: ['injections', 'usuelles'], card: 'p2020-ex4', prog: true },
        { ex: '5', t: 'Symétrie des coefficients binomiaux : par le calcul, par les parties', pts: 4, topics: ['binomial'], card: 'p2020-ex5', prog: true },
        { ex: '6', t: 'Récurrence : \\(\\frac{2^n}{n!} \\leq \\frac{9}{2}\\left(\\frac{2}{3}\\right)^n\\)', pts: 4, topics: ['recurrence'], card: 'p2020-ex6', prog: true },
        { ex: '7', t: 'Mots de 5 lettres, avec ou sans répétition, anagrammes', pts: 7, topics: ['denombrement'], card: 'p2020-ex7', prog: true }] },

    { key: 'p2019', ecue: 'mixte', title: 'Contrôle 1 d’octobre 2019', meta: 'promo 2024 · 3 h · 20,5 points annoncés', progPts: '16,5 / 20,5',
      note: 'Le corrigé officiel contient trois erreurs, corrigées sur le site : « tableau » a 7 lettres, donc 7!/2! = 2 520 anagrammes (pas 60) ; à l’exercice 7, \\(\\P_B(A) = 3/4\\) (le corrigé divise par P(A) et trouve 3/7) ; à l’exercice 8, la probabilité d’être malade sans être vacciné est 47/200 = 23,5 % (le corrigé trouve 15,6 %). Les points annoncés font 20,5 (exercice 2 : 4 points au sujet, 3,5 au corrigé). L’exercice 2 (dérivée, intégrales) est hors programme.',
      files: files('2024', std(2024, ['s', 'c'])),
      parts: [
        { ex: '1', t: 'Vrai ou faux : quatre assertions quantifiées sur \\(x + y^2 = 0\\)', pts: 2, topics: ['quantificateurs'], card: 'p2019-ex1', prog: true },
        { ex: '2', t: 'Dérivée et intégrales', pts: 4, topics: HP, prog: false },
        { ex: '3', t: 'Injectivité et surjectivité de \\(x \\mapsto 2x + 4\\) et \\(x \\mapsto \\frac{x}{2} + 2\\)', pts: 2, topics: ['injections'], card: 'p2019-ex3', prog: true },
        { ex: '4', t: 'Relation d’équivalence sur \\(\\Z \\times \\Z^*\\)', pts: 1.5, topics: ['relations'], card: 'p2019-ex4', prog: true },
        { ex: '5', t: 'Tirages de balles, anagrammes, bureaux d’une association', pts: 3, topics: ['denombrement'], card: 'p2019-ex5', prog: true },
        { ex: '6', t: 'Trois balles tirées dans un sac de trois couleurs', pts: 3, topics: ['probabilites', 'denombrement'], card: 'p2019-ex6', prog: true },
        { ex: '7', t: 'Dé à 8 faces : indépendance et incompatibilité', pts: 2, topics: ['independance', 'probabilites'], card: 'p2019-ex7', prog: true },
        { ex: '8', t: 'Vaccination et grippe : probabilités conditionnelles, taux de vaccination', pts: 3, topics: ['conditionnelles', 'bayes'], card: 'p2019-ex8', prog: true }] },

    { key: 'p2018', ecue: 'mixte', title: 'Contrôle 1 d’octobre 2018', meta: 'promo 2023 · 3 h · 21 points', progPts: '12 / 21',
      note: 'Sujet scanné, sans corrigé dans les annales : les réponses du site sont recalculées. Les exercices 3 (dérivées), 4 (intégrales) et 5 (équation complexe) sont hors programme. À l’exercice 1, le graphe en escalier n’est dessiné que sur [−6, 6[ : f(ℝ) dépend de ce qu’on suppose hors du dessin.',
      files: files('2023', std(2023, ['s'])),
      parts: [
        { ex: '1', t: 'Images directes et réciproques lues sur un graphe en escalier', pts: 2.5, topics: ['images'], card: 'p2018-ex1', prog: true },
        { ex: '2', t: 'Images réciproques par une fonction de \\(\\N\\) dans \\(\\N\\)', pts: 1.5, topics: ['images'], card: 'p2018-ex2', prog: true },
        { ex: '3', t: 'Dérivées', pts: 2, topics: HP, prog: false },
        { ex: '4', t: 'Intégrales', pts: 4, topics: HP, prog: false },
        { ex: '5', t: 'Équation du second degré dans \\(\\mathbb{C}\\)', pts: 3, topics: HP, prog: false },
        { ex: '6', t: 'Injectivité, surjectivité, composées de \\((x, y) \\mapsto xy\\) et \\(x \\mapsto (x, x^2)\\)', pts: 3, topics: ['injections', 'fonctions'], card: 'p2018-ex6', prog: true },
        { ex: '7', t: 'Mains de 5 cartes : au moins un as, roi de carreau et trois trèfles', pts: 2, topics: ['probabilites', 'denombrement'], card: 'p2018-ex7', prog: true },
        { ex: '8', t: 'Vaccination et grippe : probabilités totales, Bayes', pts: 3, topics: ['conditionnelles', 'bayes'], card: 'p2018-ex8', prog: true }] },

    { key: 'p2017', ecue: 'mixte', title: 'Contrôle 1 de novembre 2017', meta: 'promo 2022 · 3 h · 21 points', progPts: '0 / 21',
      note: 'Rien n’est au programme de l’examen 1 : dérivées, nombres complexes, intégrales, développements limités et limites, théorème des valeurs intermédiaires. À garder pour l’examen 2 (APIS).',
      files: files('2022', std(2022, ['s', 'se', 'c'])),
      parts: [
        { ex: '1', t: 'Dérivées', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Nombres complexes : forme exponentielle, module, argument', pts: 3, topics: HP, prog: false },
        { ex: '3', t: 'Intégrales', pts: 6, topics: HP, prog: false },
        { ex: '4', t: 'Équation du second degré dans \\(\\mathbb{C}\\)', pts: 4, topics: HP, prog: false },
        { ex: '5', t: 'Développements limités et limites', pts: 4, topics: HP, prog: false },
        { ex: '6', t: 'Théorème des valeurs intermédiaires', pts: 2, topics: HP, prog: false }] },

    { key: 'p2016', ecue: 'mixte', title: 'Contrôle 1 d’octobre 2016', meta: 'promo 2021 · corrigé seul · 21 points', progPts: '0 / 21',
      note: 'Les annales n’ont que le corrigé (scan en partie illisible). Rien n’est au programme de l’examen 1 : dérivées, nombres complexes, intégrales, développements limités, théorème des valeurs intermédiaires.',
      files: files('2021', std(2021, ['c'])),
      parts: [
        { ex: '1', t: 'Dérivées', pts: 2, topics: HP, prog: false },
        { ex: '2', t: 'Nombres complexes', pts: 4, topics: HP, prog: false },
        { ex: '3', t: 'Intégrales', pts: 6, topics: HP, prog: false },
        { ex: '4', t: 'Équation du second degré dans \\(\\mathbb{C}\\)', pts: 3, topics: HP, prog: false },
        { ex: '5', t: 'Développements limités et limites', pts: 4, topics: HP, prog: false },
        { ex: '6', t: 'Théorème des valeurs intermédiaires', pts: 2, topics: HP, prog: false }] }
  ];
})();
