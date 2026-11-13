/* Banque de questions — Élec B2 (Outils d’analyse de circuits : Thévenin, Norton, Millman, superposition).
   Chargé APRÈS data/qcm/elec.js et data/qcm/elec-hebdo.js : les questions de théorèmes de ces deux banques (celles
   qui renvoient à l’ancien chapitre 3, elec/cours-3-theoremes.html) passent à la matière du B2 (s: 'elec2') et
   renvoient aux deux fiches du B2. Leurs ids ne changent pas (progression conservée).
   Puis les questions des parties ajoutées au B2 (elec-c3-18 et suivantes) et les questions de cours des examens de
   fin de semestre (elec-fAAAA-qN, AAAA = année de l’examen de janvier ; f2018j = juin 2018, S1#), relues sur les
   sujets d’Epidocs (S1/Finals/Elec) et leurs corrigés. Les questions à schéma des sujets sont dans l’entraînement. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var T = window.QCM_TOPICS = window.QCM_TOPICS || {};
  T.thevenin = 'Thévenin'; T.norton = 'Norton et équivalences'; T.millman = 'Millman'; T.superposition = 'Superposition';
  T['elec2-methode'] = 'Choisir et vérifier une méthode';
  /* au B1, ces notions étaient décochées (hors examen 1) : au B2, elles sont le programme */
  if (window.QCM_OFF) window.QCM_OFF = window.QCM_OFF.filter(function (t) { return ['thevenin', 'norton', 'millman', 'superposition'].indexOf(t) < 0; });

  var OLD = 'elec/cours-3-theoremes.html', F1 = 'elec2/cours-1-thevenin.html', F2 = 'elec2/cours-2-millman.html';
  /* ancien chapitre 3 → fiches du B2 : parties 1 à 6 → fiche 1 ; 7 (Millman) → fiche 2 partie 1 ; 8 (superposition) → fiche 2 partie 3 */
  var MOVE = { 'elec-c3-17': F1 + '#s8' };
  B.forEach(function (q) {
    if (!q.ref || q.ref.indexOf(OLD) !== 0) return;
    var n = +(q.ref.split('#s')[1] || 1);
    q.s = 'elec2';
    q.ref = MOVE[q.id] || (n <= 6 ? F1 + '#s' + n : n === 7 ? F2 + '#s1' : F2 + '#s3');
  });

  var R = '<var>R</var>', E = '<var class="u">E</var>', I = '<var class="i">I</var>', U = '<var class="u">U</var>';
  function r(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function e(n) { return '<var class="u">E</var><sub>' + n + '</sub>'; }
  function i(n) { return '<var class="i">I</var><sub>' + n + '</sub>'; }
  var Eth = e('th'), Rth = r('th'), IN = i('N'), RN = r('N');

  var Q = [
    /* ================= fiche 1, partie 7 : ce qui ne compte pas ================= */
    { id: 'elec-c3-18', topic: 'thevenin', lvl: 1, type: 'single', q: 'Une résistance ' + r('0') + ' est en série avec une source de courant idéale ' + i('0') + '. Pour le reste du circuit…',
      o: ['elle ne change rien : le courant de la branche vaut ' + i('0') + ' quoi qu’il arrive', 'elle s’ajoute à ' + Rth, 'elle divise le courant ' + i('0') + ' par deux', 'elle court-circuite la source'], a: 0,
      x: 'La source de courant impose le courant de sa branche. ' + r('0') + ' change seulement la tension aux bornes de la source, pas ce que voit le reste du circuit : dans Millman, Thévenin ou Norton, on l’ignore (sujets 2017 et 2019).', ref: F1 + '#s7' },
    { id: 'elec-c3-19', topic: 'thevenin', lvl: 1, type: 'single', q: 'Une résistance ' + r('4') + ' est branchée en parallèle sur une source de tension idéale ' + e('3') + '. Pour le reste du circuit…',
      o: ['elle ne change rien : la tension entre ces deux points vaut ' + e('3') + ' quoi qu’il arrive', 'elle s’ajoute en série avec ' + e('3'), 'elle annule ' + e('3'), 'elle se met en parallèle sur ' + Rth], a: 0,
      x: 'La source de tension impose la tension entre ses bornes ; ce qui est branché en parallèle consomme du courant de la source, sans rien changer ailleurs (sujets 2018 et 2020). En revanche, quand on éteint la source pour ' + Rth + ', elle devient un fil qui court-circuite ' + r('4') + '.', ref: F1 + '#s7' },
    { id: 'elec-c3-20', topic: 'superposition', lvl: 2, type: 'tf', q: 'Si une source n’apparaît pas dans le résultat final, le calcul est forcément faux.',
      a: false,
      x: 'Faux. Deux sources peuvent avoir des contributions opposées qui s’annulent : dans le sujet de janvier 2019, celles de 2' + E + ' et de ' + E + ' se compensent et ' + U + ' ne dépend que de ' + I + ' ; en juin 2018, ce sont celles de 2' + I + ' et de ' + I + '. La superposition le montre.', ref: F1 + '#s7' },
    /* ================= fiche 1, partie 8 : à l’examen ================= */
    { id: 'elec-c3-21', topic: 'norton', lvl: 2, type: 'single', src: 'Examen janv. 2022 · Ex 2', q: 'Une source ' + I + ' est en parallèle avec ' + R + ', le tout en série avec 3' + R + ', le tout en parallèle avec 6' + R + '. Quel générateur de Norton voit-on aux bornes de 6' + R + ' ?',
      o: [IN + ' = ' + I + '/4, ' + RN + ' = 12' + R + '/5', IN + ' = ' + I + '/4, ' + RN + ' = 4' + R, IN + ' = ' + I + ', ' + RN + ' = 12' + R + '/5', IN + ' = ' + I + '/3, ' + RN + ' = 2' + R], a: 0,
      x: I + ' // ' + R + ' devient ' + R + I + ' en série avec ' + R + ' ; avec 3' + R + ' : ' + R + I + ' en série avec 4' + R + ', soit un Norton ' + I + '/4 // 4' + R + ' ; enfin 4' + R + ' // 6' + R + ' = 24' + R + '/10 = 12' + R + '/5.', ref: F1 + '#s8' },
    { id: 'elec-c3-22', topic: 'thevenin', lvl: 1, type: 'single', q: 'À l’examen, « Déterminer le générateur de Thévenin vu par ' + r('4') + ' » : que représente ' + r('4') + ' ?',
      o: ['La charge : on la débranche, et on cherche ce qui l’alimente', 'Une résistance à garder dans ' + Rth, 'La résistance de Thévenin elle-même', 'Une résistance à court-circuiter'], a: 0,
      x: 'La résistance « vue » est la charge : ' + Eth + ' est la tension à ses bornes quand elle est débranchée, ' + Rth + ' la résistance vue depuis ses bornes, sources éteintes. On la rebranche à la fin (diviseur de tension).', ref: F1 + '#s8' },
    /* ================= fiche 2, partie 1 : Millman ================= */
    { id: 'elec-c3-23', topic: 'millman', lvl: 1, type: 'single', q: 'Le théorème de Millman vient…',
      o: ['de la loi des nœuds', 'de la loi des mailles', 'du théorème de Thévenin', 'du théorème de superposition'], a: 0,
      x: 'Millman, c’est la loi des nœuds au nœud A, chaque courant de branche étant écrit avec la loi d’Ohm. Question de cours de janvier 2016.', ref: F2 + '#s1', also: ['elec-f2016-q13'] },
    /* ================= fiche 2, partie 2 : branches particulières ================= */
    { id: 'elec-c3-24', topic: 'millman', lvl: 1, type: 'single', q: 'Dans Millman, une branche faite d’une résistance ' + r('k') + ' seule entre le nœud A et la masse apporte…',
      o: ['0 au numérateur et 1/' + r('k') + ' au dénominateur', '1/' + r('k') + ' au numérateur et rien au dénominateur', 'rien du tout', r('k') + ' au dénominateur'], a: 0,
      x: 'L’autre bout de la branche est à 0 V : la branche « pousse » 0/' + r('k') + ' vers A, mais sa conductance 1/' + r('k') + ' compte au dénominateur.', ref: F2 + '#s2' },
    { id: 'elec-c3-25', topic: 'millman', lvl: 2, type: 'single', q: 'Dans Millman, une source de courant ' + i('2') + ' qui arrive en A, en série avec une résistance ' + r('2') + '…',
      o: ['donne + ' + i('2') + ' au numérateur, et ' + r('2') + ' n’apparaît nulle part', 'donne + ' + i('2') + ' au numérateur et 1/' + r('2') + ' au dénominateur', 'donne ' + i('2') + '/' + r('2') + ' au numérateur', 'ne compte pas'], a: 0,
      x: 'La source impose le courant de la branche : ' + r('2') + ' ne change rien (sujets 2016, 2017, 2018, 2019). Le courant entre en A : + ' + i('2') + ' au numérateur.', ref: F2 + '#s2' },
    { id: 'elec-c3-26', topic: 'millman', lvl: 2, type: 'single', src: 'Examen janv. 2018 · Ex 4', q: 'Une branche arrive en A par ' + r('3') + ', dont l’autre bout est relié à la masse par une source ' + e('3') + ' fléchée vers le bas (vers la masse), avec ' + r('4') + ' en parallèle sur ' + e('3') + '. Que donne-t-elle dans Millman ?',
      o: ['−' + e('3') + '/' + r('3') + ' au numérateur et 1/' + r('3') + ' au dénominateur', '+' + e('3') + '/' + r('3') + ' au numérateur et 1/' + r('3') + ' + 1/' + r('4') + ' au dénominateur', '−' + e('3') + '/(' + r('3') + ' + ' + r('4') + ') au numérateur', 'rien : ' + r('4') + ' la court-circuite'], a: 0,
      x: 'L’autre bout de ' + r('3') + ' est au potentiel −' + e('3') + ' (flèche vers la masse) quoi que fasse ' + r('4') + ', placée en parallèle sur la source. Corrigé : U = (' + e('1') + '/' + r('1') + ' − ' + i('1') + ' + ' + i('2') + ' − ' + e('3') + '/' + r('3') + ')/(1/' + r('1') + ' + 1/' + r('3') + ').', ref: F2 + '#s2' },
    /* ================= fiche 2, partie 3 : superposition ================= */
    { id: 'elec-f2018j-q7', topic: 'superposition', lvl: 1, type: 'multi', src: 'Examen juin 2018 · Q7', q: 'On ne peut pas appliquer le théorème de superposition si… (2 réponses)',
      o: ['les sources ne sont pas indépendantes', 'le circuit est linéaire', 'les sources sont indépendantes', 'le circuit n’est pas linéaire'], a: [0, 3],
      x: 'La superposition demande un circuit linéaire (résistances, sources) et des sources indépendantes : une source dont la valeur dépend d’une autre grandeur du circuit ne peut pas être éteinte seule.', ref: F2 + '#s3' },
    /* ================= fiche 2, partie 4 : superposition à l’examen ================= */
    { id: 'elec-c3-28', topic: 'superposition', lvl: 2, type: 'num', unit: 'mA', a: 2.5, tol: 0, src: 'Examen janv. 2021 · Ex 2', q: 'Superposition : la source ' + e('1') + ' = 15 V seule donne ' + i('2') + '′ = ' + e('1') + '/(6' + R + '), la source ' + i('0') + ' = 45 mA seule donne ' + i('2') + '″ = −' + i('0') + '/18, avec ' + R + ' = 500 Ω. Que vaut ' + i('2') + ' (en mA) ?',
      x: i('2') + ' = 15/3 000 − 45/18 mA = 5 − 2,5 = 2,5 mA. On additionne les contributions avec leur signe, puis on fait l’application numérique.', ref: F2 + '#s4' },
    { id: 'elec-c3-29', topic: 'superposition', lvl: 1, type: 'single', q: 'Un circuit contient quatre sources indépendantes. Combien de schémas (« états ») faut-il étudier en superposition ?',
      o: ['4, un par source', '2', '1', '16'], a: 0,
      x: 'Un état par source : on la garde, on éteint les trois autres (tension → fil, courant → trou), puis on additionne les quatre contributions (sujet de janvier 2020, Ex 2).', ref: F2 + '#s4' },
    /* ================= fiche 2, partie 5 : vérifier ================= */
    { id: 'elec-c3-30', topic: 'elec2-methode', lvl: 1, type: 'single', q: 'On trouve ' + U + ' = (' + E + ' + ' + R + I + ')/5. Lequel de ces contrôles est valable ?',
      o: ['Annuler ' + I + ' et vérifier la tension due à ' + E + ' seule', 'Vérifier que ' + U + ' est positive', 'Vérifier que ' + U + ' ne dépend pas de ' + R, 'Remplacer ' + R + ' par 0 et vérifier que ' + U + ' = 0'], a: 0,
      x: I + ' = 0, c’est éteindre la source de courant : on retrouve la contribution de ' + E + ' seule, souvent facile à calculer par un diviseur. Une tension peut être négative, et elle dépend en général de ' + R + '.', ref: F2 + '#s5' },
    { id: 'elec-c3-31', topic: 'elec2-methode', lvl: 1, type: 'single', q: 'Quelle expression ne peut pas être une tension ?',
      o: ['(' + E + ' + ' + I + ')/' + R, '(' + E + ' + ' + R + I + ')/5', '2' + R + I + ' − ' + E, R + '(' + I + ' + ' + E + '/' + R + ')'], a: 0,
      x: 'On n’additionne pas des volts et des ampères : ' + E + ' + ' + I + ' n’a pas de sens. ' + R + I + ' est une tension (loi d’Ohm), ' + E + '/' + R + ' un courant.', ref: F2 + '#s5' },
    /* ================= fiche 2, partie 6 : choisir ================= */
    { id: 'elec-c3-32', topic: 'elec2-methode', lvl: 2, type: 'single', q: '« Déterminer ' + U + ' en utilisant le théorème de Millman » : ' + U + ' est la tension entre deux nœuds A et B où arrivent toutes les branches. Que fais-tu d’abord ?',
      o: ['Je prends B comme masse : ' + U + ' = ' + '<var class="v">V</var><sub>A</sub>', 'Je débranche la charge', 'J’éteins toutes les sources', 'J’écris une loi des mailles par maille'], a: 0,
      x: 'Millman donne un potentiel : on choisit la référence (B), et ' + U + ' = ' + '<var class="v">V</var><sub>A</sub> − <var class="v">V</var><sub>B</sub> = <var class="v">V</var><sub>A</sub>. C’est la première ligne de tous les corrigés.', ref: F2 + '#s6' },

    /* ================= questions de cours des examens de fin de semestre ================= */
    { id: 'elec-f2018j-q9', topic: 'thevenin', lvl: 1, type: 'single', src: 'Examen juin 2018 · Q9', q: 'Le théorème de Thévenin remplace un dipôle générateur complexe par une :',
      o: ['source de tension idéale en parallèle avec une résistance', 'source de courant idéale en parallèle avec une résistance', 'source de tension idéale en série avec une résistance', 'source de courant idéale en série avec une résistance'], a: 2,
      x: 'Thévenin : ' + Eth + ' en série avec ' + Rth + '. Norton : ' + IN + ' en parallèle avec ' + RN + '.', ref: F1 + '#s3' },
    { id: 'elec-f2018j-q10', topic: 'thevenin', lvl: 1, type: 'single', src: 'Examen juin 2018 · Q10', q: 'Dans le théorème de Thévenin, la tension ' + Eth + ' du générateur est aussi appelée :',
      o: ['la tension à vide', 'la tension de court-circuit', 'aucune de ces réponses'], a: 0,
      x: Eth + ' est la tension entre A et B quand rien n’est branché : la tension à vide. Le court-circuit donne le courant de Norton.', ref: F1 + '#s3' },
    { id: 'elec-f2016-q9', topic: 'thevenin', lvl: 1, type: 'single', src: 'Examen janv. 2016 · Q9', q: 'Pour annuler une source de courant, on la remplace par :',
      o: ['un fil', 'un interrupteur ouvert', 'une résistance', 'un générateur de tension'], a: 1,
      x: 'Courant nul : plus rien ne passe, c’est un trou (interrupteur ouvert). Questions de cours de janvier 2016 et 2017.', ref: F1 + '#s2', also: ['elec-f2017-q7'] },
    { id: 'elec-f2016-q10', topic: 'thevenin', lvl: 1, type: 'single', src: 'Examen janv. 2016 · Q10', q: 'Pour annuler une source de tension, on la remplace par :',
      o: ['un interrupteur fermé', 'une résistance', 'un interrupteur ouvert', 'un générateur de courant'], a: 0,
      x: 'Tension nulle : ses deux bornes sont au même potentiel, c’est un fil (interrupteur fermé).', ref: F1 + '#s2' },
    { id: 'elec-f2016-q11', topic: 'norton', lvl: 1, type: 'single', src: 'Examen janv. 2016 · Q11', q: 'Une source de courant ' + I + ' en parallèle avec ' + R + ' est équivalente à une source de tension ' + E + ' en série avec ' + R + '′ si et seulement si ' + E + ' =',
      o: [I, R + '·' + I, R + '′' + R + '/(' + R + ' + ' + R + '′)·' + I, 'aucune de ces réponses'], a: 1,
      x: 'Transformation Norton → Thévenin : ' + E + ' = ' + R + I + ', et la même résistance ' + R + '′ = ' + R + '. Même question en janvier 2019.', ref: F1 + '#s5', also: ['elec-f2019-q11'] },
    { id: 'elec-f2016-q12', topic: 'norton', lvl: 1, type: 'single', src: 'Examen janv. 2016 · Q12', q: 'Même équivalence (source ' + I + ' // ' + R + ' et source ' + E + ' en série avec ' + R + '′) : ' + R + '′ =',
      o: [R, R + '·' + R + '′/(' + R + ' + ' + R + '′)', R + '/(' + R + ' + ' + R + '′)', 'aucune de ces réponses'], a: 0,
      x: 'La résistance ne change pas dans une transformation de source : ' + R + '′ = ' + R + ' (sources éteintes, les deux circuits se réduisent à cette résistance).', ref: F1 + '#s5', also: ['elec-f2019-q12'] },
    { id: 'elec-f2018-q10', topic: 'norton', lvl: 1, type: 'single', src: 'Examen janv. 2018 · Q10', q: 'Un générateur de tension ' + E + ' en série avec une résistance ' + R + ' est équivalent à un générateur de courant ' + I + ' en parallèle avec une résistance <var>r</var> si :',
      o: ['<var>r</var> = ' + R + ' et ' + E + ' = ' + R + '·' + I, R + '·' + E + ' = (' + R + '/<var>r</var>)·' + I + ' et <var>r</var> = ' + R, R + ' = <var>r</var> et ' + E + ' = ' + I + '/' + R, E + ' = ' + R + '·' + I + ' et <var>r</var> = ' + R + '/2'], a: 0,
      x: 'Même résistance, et ' + I + ' = ' + E + '/' + R + ', soit ' + E + ' = ' + R + I + '.', ref: F1 + '#s5' }
  ];
  Q.forEach(function (q) { q.s = 'elec2'; });
  Array.prototype.push.apply(B, Q);
})();
