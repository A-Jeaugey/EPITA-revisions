/* Questions de cours (Ex 1) des partiels d’électronique nov. 2017 (promo 2022), oct. 2018 (promo 2023) et nov. 2020 (promo 2025).
   Énoncés et options verbatim, dans l’ordre du sujet. Déjà présentes dans data/qcm/elec.js, donc non reprises ici :
   2017 Q3 (elec-c2-05, courant dans un générateur), 2017 Q5 (elec-c2-09, parallèle), 2018 Q2 (elec-c2-02, définition d’une branche). */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var C1 = 'elec/cours-1-bases.html', C2 = 'elec/cours-2-lois.html';

  /* notation */
  function sub(i) { return i == null ? '' : '<sub>' + i + '</sub>'; }
  function v(s, i) { return '<var>' + s + '</var>' + sub(i); }
  function u(s, i) { return '<var class="u">' + s + '</var>' + sub(i); }
  function c(s, i) { return '<var class="i">' + s + '</var>' + sub(i); }
  var R = v('R'), R1 = v('R', 1), R2 = v('R', 2), R3 = v('R', 3), R4 = v('R', 4), E = u('E'), U = u('U');
  var VF = ['VRAI', 'FAUX'];

  /* flèche de courant rouge dans une direction quelconque (pointe en b) */
  function ia(ax, ay, bx, by) {
    function r(x) { return Math.round(x * 10) / 10; }
    var dx = bx - ax, dy = by - ay, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L, hx = bx - ux * 9, hy = by - uy * 9;
    return '<path class="cz-i" d="M' + r(ax) + ' ' + r(ay) + 'L' + r(bx - ux * 6) + ' ' + r(by - uy * 6) + '"/>' +
      '<path class="cz-ih" d="M' + r(bx) + ' ' + r(by) + 'L' + r(hx - uy * 4.6) + ' ' + r(hy + ux * 4.6) + 'L' + r(hx + uy * 4.6) + ' ' + r(hy - ux * 4.6) + 'Z"/>';
  }

  /* 2017 Q4 : un nœud, cinq fils */
  var STAR = { w: 260, h: 200, aria: 'Un nœud et cinq fils : I1, I2 et I4 arrivent au nœud, I3 et I en repartent',
    wires: ['M130 100L58 28', 'M130 100L202 28', 'M130 100H236', 'M130 100L58 172', 'M130 100L166 188'],
    parts: [{ t: 'raw', svg: ia(72, 42, 104, 74) + ia(188, 42, 156, 74) + ia(214, 100, 174, 100) + ia(116, 114, 84, 146) + ia(138, 120, 153, 157) },
      { t: 'dot', x: 130, y: 100, r: 5 },
      { t: 'txt', x: 100, y: 46, s: 'I_1', c: 'cz-l cz-li', a: 'start' }, { t: 'txt', x: 196, y: 64, s: 'I_2', c: 'cz-l cz-li', a: 'start' },
      { t: 'txt', x: 196, y: 124, s: 'I_4', c: 'cz-l cz-li' }, { t: 'txt', x: 86, y: 124, s: 'I_3', c: 'cz-l cz-li', a: 'end' },
      { t: 'txt', x: 138, y: 164, s: 'I', c: 'cz-l cz-li', a: 'end' }] };

  /* 2018 Q9 et Q10 : circuit de départ et circuit équivalent */
  function eq18(lab) {
    return { w: 485, h: 205, aria: 'À gauche : source E, R1 sur le fil du haut, R3 et R4 en série vers le fil du bas, R2 puis un fil vers le bas. À droite : source E et une seule résistance ' + lab,
      wires: ['M60 30H290V170H60Z', 'M170 30V170', 'M365 30H445V170H365Z'],
      parts: [{ t: 'E', x: 60, y: 100, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 115, y: 30, l: 'R_1', lp: 's' }, { t: 'R', x: 230, y: 30, l: 'R_2', lp: 's' },
        { t: 'R', x: 170, y: 72, d: 'v', l: 'R_3' }, { t: 'R', x: 170, y: 128, d: 'v', l: 'R_4' }, { t: 'dot', x: 170, y: 30 }, { t: 'dot', x: 170, y: 170 },
        { t: 'E', x: 365, y: 100, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 445, y: 100, d: 'v', l: lab },
        { t: 'txt', x: 175, y: 196, s: 'circuit de départ', c: 'cz-tiny' }, { t: 'txt', x: 405, y: 196, s: 'circuit équivalent', c: 'cz-tiny' }] };
  }

  /* 2020 Q6 : E, R, interrupteur K ouvert, R ; U aux bornes de la branche de droite */
  var K20 = { w: 320, h: 200, aria: 'Source E, résistance R en haut, branche de droite formée de l’interrupteur K ouvert puis d’une résistance R ; flèche U sur toute la branche de droite',
    wires: ['M250 62V40H50V180H250V98'],
    parts: [{ t: 'E', x: 50, y: 110, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 150, y: 40, l: 'R', lp: 's' },
      { t: 'K', x: 250, y: 80, d: 'v', open: true, l: 'K', lp: [-26, 5, 'end'] }, { t: 'R', x: 250, y: 140, d: 'v', l: 'R', lp: 'w' },
      { t: 'U', a: [285, 170], b: [285, 50], l: 'U' }] };

  var Q = [
    /* ---------- Partiel nov. 2017, Ex 1 (A : QCM) ---------- */
    { id: 'elec-p2017-q1', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2017 · Ex 1 · Q1',
      q: 'Une différence de potentiels entre 2 points est aussi appelée :',
      o: ['Une intensité', 'Une tension', 'Une puissance', 'Une conductance'], a: 1,
      x: 'Par définition, la tension entre A et B est la différence de potentiels ' + u('U', 'AB') + ' = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub>. L’intensité mesure un débit de charges, la puissance une énergie par seconde, la conductance est l’inverse d’une résistance.', ref: C1 + '#s1' },
    { id: 'elec-p2017-q2', topic: 'appareils', lvl: 1, type: 'single', keep: true, src: 'Partiel 2017 · Ex 1 · Q2',
      q: 'Pour mesurer l’intensité d’un courant dans un dipôle, on utilise un ampèremètre branché en série avec ce dipôle.',
      o: VF, a: 0,
      x: 'L’ampèremètre doit être traversé par le courant à mesurer : on ouvre la branche et on l’y insère, en série. C’est le voltmètre qui se branche en parallèle.', ref: C1 + '#s6' },
    { id: 'elec-p2017-q4', topic: 'kirchhoff', lvl: 2, type: 'single', keep: true, src: 'Partiel 2017 · Ex 1 · Q4',
      q: 'Dans le schéma ci-dessous, on a les courants suivants : ' + c('I', 1) + ' = 5 mA ; ' + c('I', 2) + ' = 1 mA ; ' + c('I', 3) + ' = 1 mA ; ' + c('I', 4) + ' = −3 mA. Calculer le courant ' + c('I') + '.',
      fig: STAR,
      o: [c('I') + ' = 4 mA', c('I') + ' = 2 mA', c('I') + ' = 10 mA', c('I') + ' = 8 mA'], a: 1,
      x: 'Loi des nœuds : ce qui arrive (' + c('I', 1) + ', ' + c('I', 2) + ', ' + c('I', 4) + ') égale ce qui repart (' + c('I', 3) + ', ' + c('I') + '). ' + c('I', 1) + ' + ' + c('I', 2) + ' + ' + c('I', 4) + ' = ' + c('I', 3) + ' + ' + c('I') + ', donc ' + c('I') + ' = 5 + 1 + (−3) − 1 = 2 mA. Les autres propositions sont des erreurs de signe : 8 mA si on oublie le signe de ' + c('I', 4) + ', 4 mA si on compte ' + c('I', 3) + ' comme entrant, 10 mA si on additionne tout en valeur absolue.', ref: C2 + '#s2' },

    /* ---------- Partiel nov. 2017, Ex 1 (B : résistances équivalentes) ---------- */
    { id: 'elec-p2017-b1', topic: 'req', lvl: 1, type: 'num', unit: 'kΩ', a: 2, keep: true, src: 'Partiel 2017 · Ex 1 · B1',
      q: 'Soit des résistances de valeurs ' + R1 + ' = 1 Ω et ' + R2 + ' = 1 kΩ. Calculer la résistance équivalente : <b>' + R2 + ' et ' + R2 + ' en série</b>.',
      x: 'En série, les résistances s’additionnent : ' + R2 + ' + ' + R2 + ' = 1 + 1 = 2 kΩ.', ref: C2 + '#s5' },
    { id: 'elec-p2017-b2', topic: 'req', lvl: 1, type: 'num', unit: 'Ω', a: 1001, tol: 0.0002, keep: true, src: 'Partiel 2017 · Ex 1 · B2',
      q: 'Soit des résistances de valeurs ' + R1 + ' = 1 Ω et ' + R2 + ' = 1 kΩ. Calculer la résistance équivalente : <b>' + R1 + ' et ' + R2 + ' en série</b>.',
      x: 'Convertis avant d’additionner : 1 kΩ = 1000 Ω, donc ' + R1 + ' + ' + R2 + ' = 1 + 1000 = 1001 Ω. En pratique, ' + R1 + ' est négligeable devant ' + R2 + ' : 1001 Ω ≈ 1 kΩ.', ref: C2 + '#s5' },
    { id: 'elec-p2017-b3', topic: 'req', lvl: 1, type: 'num', unit: 'Ω', a: 0.5, keep: true, src: 'Partiel 2017 · Ex 1 · B3',
      q: 'Soit des résistances de valeurs ' + R1 + ' = 1 Ω et ' + R2 + ' = 1 kΩ. Calculer la résistance équivalente : <b>' + R1 + ' et ' + R1 + ' en parallèle</b>.',
      x: 'Deux résistances égales en parallèle valent la moitié de l’une : ' + R1 + '·' + R1 + '/(' + R1 + ' + ' + R1 + ') = ' + R1 + '/2 = 0,5 Ω.', ref: C2 + '#s5' },
    { id: 'elec-p2017-b4', topic: 'req', lvl: 1, type: 'num', unit: 'Ω', a: 10, keep: true, src: 'Partiel 2017 · Ex 1 · B4',
      q: 'Soit des résistances de valeurs ' + R1 + ' = 1 Ω et ' + R2 + ' = 1 kΩ. Calculer la résistance équivalente : <b>10 résistances ' + R1 + ' en série</b>.',
      x: 'En série, on additionne : 10 × ' + R1 + ' = 10 Ω.', ref: C2 + '#s5' },
    { id: 'elec-p2017-b5', topic: 'req', lvl: 1, type: 'num', unit: 'Ω', a: 100, keep: true, src: 'Partiel 2017 · Ex 1 · B5',
      q: 'Soit des résistances de valeurs ' + R1 + ' = 1 Ω et ' + R2 + ' = 1 kΩ. Calculer la résistance équivalente : <b>10 résistances ' + R2 + ' en parallèle</b>.',
      x: '<var>n</var> résistances égales en parallèle valent ' + R + '/<var>n</var> : 1000/10 = 100 Ω. Le piège est d’écrire 10 × ' + R2 + ' : en parallèle, la résistance équivalente est plus petite que chacune.', ref: C2 + '#s5' },

    /* ---------- Partiel oct. 2018, Ex 1 ---------- */
    { id: 'elec-p2018-q1', topic: 'vocabulaire', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q1',
      q: 'Un nœud d’un circuit correspond à',
      o: ['Une borne d’une résistance', 'L’interconnexion d’au moins 3 fils', 'Une borne de générateur', 'L’interconnexion de 2 fils ou plus'], a: 1,
      x: 'Un nœud est un carrefour : au moins trois fils s’y rejoignent. Un point qui ne relie que deux fils est une simple connexion, et les deux dipôles de part et d’autre sont en série.', ref: C2 + '#s1' },
    { id: 'elec-p2018-q3', topic: 'appareils', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q3',
      q: 'Pour mesurer la tension aux bornes d’un dipôle, on utilise un voltmètre branché en série avec ce dipôle.',
      o: VF, a: 1,
      x: 'Une tension se mesure entre deux points : le voltmètre se branche en parallèle (en dérivation) aux bornes du dipôle. C’est l’ampèremètre qui se branche en série.', ref: C1 + '#s6' },
    { id: 'elec-p2018-q4', topic: 'kirchhoff', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q4',
      q: 'L’intensité du courant qui entre dans un dipôle passif est supérieure à l’intensité de celui qui en ressort.',
      o: VF, a: 1,
      x: 'Un dipôle ne stocke pas de charges : tout le courant qui entre ressort, qu’il soit passif ou non. Une résistance consomme de l’énergie, pas du courant.', ref: C2 + '#s2' },
    { id: 'elec-p2018-q5', topic: 'serie-parallele', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q5',
      q: 'Si deux dipôles sont parcourus par le même courant, on dit qu’ils sont :',
      o: ['En série', 'En parallèle'], a: 0,
      x: 'Définition du cours : des dipôles en série sont traversés par le même courant. Des dipôles en parallèle ont la même tension.', ref: C2 + '#s4' },
    { id: 'elec-p2018-q6', topic: 'serie-parallele', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q6',
      q: 'Si deux dipôles appartiennent à la même maille, on dit qu’ils sont :',
      o: ['En série', 'En parallèle', 'On ne peut rien dire'], a: 2,
      x: 'Une maille est une boucle fermée qui peut traverser plusieurs nœuds. Deux dipôles d’une même maille peuvent être séparés par un nœud (donc pas en série) sans relier les deux mêmes nœuds (donc pas en parallèle) : on ne peut rien dire. Pour une même branche, en revanche, ils sont en série.', ref: C2 + '#s4' },
    { id: 'elec-p2018-q7', topic: 'appareils', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q7',
      q: 'Un interrupteur fermé a :',
      o: ['un courant infini qui le traverse', 'une tension nulle à ses bornes', 'une tension infinie à ses bornes', 'Aucune de ces réponses'], a: 1,
      x: 'Fermé, c’est un fil parfait : la tension à ses bornes est nulle. Le courant qui le traverse est fixé par le reste du circuit, il n’a aucune raison d’être infini.', ref: C1 + '#s6' },
    { id: 'elec-p2018-q8', topic: 'appareils', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q8',
      q: 'Un interrupteur ouvert a :',
      o: ['un courant infini qui le traverse', 'une tension nulle à ses bornes', 'une tension infinie à ses bornes', 'Aucune de ces réponses'], a: 3,
      x: 'Ouvert, c’est un trou : le courant est nul. La tension à ses bornes est imposée par le reste du circuit ; en général elle n’est ni nulle ni infinie. Aucune proposition ne convient.', ref: C1 + '#s6' },
    { id: 'elec-p2018-q9', topic: 'req', lvl: 2, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q9',
      q: 'Soit le circuit suivant (à gauche). Si ' + R1 + ' = ' + R2 + ' = ' + R3 + ' = ' + R4 + ' = ' + R + ', alors ce circuit est alors équivalent au circuit suivant (à droite), avec :',
      fig: eq18('R′'),
      o: [R + '′ = 4' + R, R + '′ = ' + R, R + '′ = (5/3)·' + R, R + '′ = 3/' + R], a: 2,
      x: 'Le fil de droite relie ' + R2 + ' au fil du bas : ' + R2 + ' est en parallèle sur ' + R3 + ' + ' + R4 + '. ' + R + ' // 2' + R + ' = 2' + R + '/3, puis en série avec ' + R1 + ' : ' + R + ' + 2' + R + '/3 = 5' + R + '/3. La réponse 3/' + R + ' n’est même pas homogène à une résistance.', ref: C2 + '#s5' },
    { id: 'elec-p2018-q10', topic: 'req', lvl: 2, type: 'single', keep: true, src: 'Partiel 2018 · Ex 1 · Q10',
      q: 'Soit le circuit suivant (à gauche). Si ' + R2 + ' = ' + R3 + ' = ' + R4 + ' = ' + R + ', que doit valoir ' + R1 + ' pour que ce circuit soit équivalent au circuit suivant (à droite) :',
      fig: eq18('R'),
      o: [R1 + ' = ' + R, R1 + ' = 2' + R, R1 + ' = (1/3)·' + R, R1 + ' = 1/(3' + R + ')'], a: 2,
      x: 'Il faut ' + R1 + ' + ' + R + ' // 2' + R + ' = ' + R + ', soit ' + R1 + ' + 2' + R + '/3 = ' + R + ', donc ' + R1 + ' = ' + R + '/3. La proposition 1/(3' + R + ') n’est pas homogène à une résistance : à éliminer d’office.', ref: C2 + '#s5' },

    /* ---------- Partiel nov. 2020, Ex 1 ---------- */
    { id: 'elec-p2020-q1', topic: 'vocabulaire', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · Ex 1 · Q1',
      q: 'Une maille d’un circuit correspond à une portion de circuit située entre 2 nœuds consécutifs.',
      o: VF, a: 1,
      x: 'C’est la définition d’une branche. Une maille est un chemin fermé du circuit, qui revient à son point de départ.', ref: C2 + '#s1' },
    { id: 'elec-p2020-q2', same: 'elec-p2017-q2', topic: 'appareils', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · Ex 1 · Q2',
      q: 'Pour mesurer l’intensité du courant qui traverse un dipôle, on utilise un ampèremètre branché en série avec ce dipôle.',
      o: VF, a: 0,
      x: 'L’ampèremètre doit être traversé par le courant à mesurer, il se place en série. La même affirmation était déjà posée en 2017.', ref: C1 + '#s6' },
    { id: 'elec-p2020-q3', same: 'elec-p2024-q4', topic: 'kirchhoff', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · Ex 1 · Q3',
      q: 'L’intensité du courant qui entre dans un dipôle récepteur est supérieure à l’intensité de celui qui en ressort.',
      o: VF, a: 1,
      x: 'Le courant se conserve : ce qui entre dans un dipôle en ressort, qu’il soit récepteur ou générateur. Un récepteur consomme de l’énergie, pas des charges. La question revient chaque année sous une forme voisine (générateur en 2017, dipôle passif en 2018).', ref: C2 + '#s2' },
    { id: 'elec-p2020-q4', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · Ex 1 · Q4',
      q: 'Une différence de potentiels entre 2 points est aussi appelée :',
      o: ['Une intensité', 'Une tension', 'Une puissance', 'Une conductance'], a: 1,
      x: u('U', 'AB') + ' = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub> : c’est la tension entre A et B. Question posée mot pour mot en 2017.', ref: C1 + '#s1' },
    { id: 'elec-p2020-q5', topic: 'serie-parallele', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · Ex 1 · Q5',
      q: 'Si deux dipôles appartiennent à la même branche : on dit qu’ils sont :',
      o: ['En série', 'En parallèle', 'On ne peut rien dire'], a: 0,
      x: 'Une branche va d’un nœud au suivant, sans autre nœud entre les deux : tous ses dipôles sont parcourus par le même courant, ils sont en série. À ne pas confondre avec la même maille, où on ne peut rien dire.', ref: C2 + '#s4' },
    { id: 'elec-p2020-q6', topic: 'appareils', lvl: 2, type: 'single', keep: true, src: 'Partiel 2020 · Ex 1 · Q6',
      q: 'Soit le schéma suivant : Que vaut la tension ' + U + ' si l’interrupteur <var>K</var> est ouvert ?',
      fig: K20,
      o: [U + ' = 0', U + ' = ' + E + '/2', U + ' = ' + E, U + ' = −' + E], a: 2,
      x: '<var>K</var> ouvert : aucun courant ne circule. La résistance du haut a donc une tension nulle (' + R + ' × 0 = 0), et toute la tension ' + E + ' se retrouve aux bornes de la branche de droite : ' + U + ' = ' + E + '. Répondre 0, c’est croire que la tension aux bornes d’un trou est nulle ; répondre ' + E + '/2, c’est appliquer un pont diviseur alors qu’aucun courant ne passe.', ref: C1 + '#s6' }
  ];
  Q.forEach(function (q) { q.s = 'elec'; });
  Array.prototype.push.apply(B, Q);
})();
