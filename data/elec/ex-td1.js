/* Exercices d’électronique : TD 1 « Généralités, lois fondamentales » (promo 2031).
   Pas de corrigé officiel : corrections rédigées et vérifiées par calcul (solveur nodal). */
(function () {
  var L = window.ELEC_EX = window.ELEC_EX || [];
  /* notation : tensions en bleu, courants en rouge, potentiels en violet */
  function u(n, s) { return '<var class="u">' + n + '</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  function i(n, s) { return '<var class="i">' + n + '</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  function r(s) { return '<var>R</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  function v(s) { return '<var class="v">V</var><sub>' + s + '</sub>'; }
  function fr(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  var E = u('E'), U = u('U'), I = i('I'), R = '<var>R</var>';

  /* ================= Ex 1 ================= */
  function ex1Spec(extra, aria) {
    return { w: 460, h: 330, aria: aria || 'R2 en haut et R1 en dessous entre le fil de gauche et B, R3 vertical à droite, R4 et R5 en série au milieu, générateur E en bas',
      wires: ['M40 40H210V120', 'M40 120H400V200', 'M40 200H400', 'M40 40V270H400V200'],
      parts: [{ t: 'R', x: 125, y: 40, l: 'R_2' }, { t: 'R', x: 125, y: 120, l: 'R_1', lp: 's' }, { t: 'U', a: [85, 92], b: [170, 92], l: 'U_1' },
        { t: 'R', x: 400, y: 160, d: 'v', l: 'R_3' },
        { t: 'R', x: 125, y: 200, l: 'R_4', lp: 's' }, { t: 'R', x: 300, y: 200, l: 'R_5', lp: 's' }, { t: 'U', a: [335, 172], b: [85, 172], l: 'U' },
        { t: 'E', x: 220, y: 270, d: 'h', p: 'w', l: 'E', as: 's' }, { t: 'I', x: 85, y: 270, d: 'w', l: 'I', lp: 's' },
        { t: 'dot', x: 40, y: 120 }, { t: 'dot', x: 40, y: 200 }, { t: 'dot', x: 210, y: 120 }, { t: 'dot', x: 400, y: 200 }, { t: 'dot', x: 210, y: 200, r: 3 }].concat(extra || []) };
  }
  var ex1Nodes = [{ t: 'txt', x: 22, y: 166, s: 'A', c: 'cz-n' }, { t: 'txt', x: 226, y: 110, s: 'B', c: 'cz-n' }, { t: 'txt', x: 416, y: 222, s: 'C', c: 'cz-n' }];
  /* étapes de réduction : même squelette, résistances regroupées */
  function ex1Step(topL, midL, r3) {
    var parts = [{ t: 'R', x: 120, y: 50, l: topL, c: 'cz-hl' }, { t: 'R', x: 210, y: 170, l: midL, lp: 's', c: 'cz-hl' },
      { t: 'E', x: 210, y: 240, d: 'h', p: 'w', l: 'E', as: 's' }, { t: 'I', x: 80, y: 240, d: 'w', l: 'I', lp: 's' },
      { t: 'dot', x: 40, y: 170 }, { t: 'dot', x: 380, y: 170 },
      { t: 'txt', x: 22, y: 116, s: 'A', c: 'cz-n' }, { t: 'txt', x: 396, y: 192, s: 'C', c: 'cz-n' }];
    if (r3) parts.push({ t: 'R', x: 380, y: 110, d: 'v', l: 'R_3 = R' }, { t: 'dot', x: 230, y: 50, r: 3 }, { t: 'txt', x: 230, y: 38, s: 'B', c: 'cz-n' });
    return { w: 460, h: 290, aria: 'Circuit du TD 1 Ex 1 après regroupement des résistances',
      wires: ['M40 50H380V170', 'M40 170H380', 'M40 50V240H380V170'], parts: parts };
  }

  L.push({
    id: 'td1-ex1', exam: null, kind: 'td', order: 1, src: 'TD 1 · Ex 1', official: false,
    title: 'Carte embarquée : nœuds, mailles et résistance équivalente',
    topics: ['vocabulaire', 'req'], lvl: 1, time: 15,
    intro: '<p><b>Carte de développement embarquée.</b> Une carte microcontrôleur est alimentée par une source de 12 V. Le circuit comporte cinq résistances. (voir schéma ci-contre).</p>',
    figs: [{ spec: ex1Spec(), cap: 'Circuit de la carte (figure du TD)' }],
    questions: [
      '<b>1.</b> Combien y-a-t-il de nœuds ? de branches ? de mailles ?',
      '<b>2.</b> Y-a-t-il des résistances en série ? Si oui, lesquelles ?',
      '<b>3.</b> Y-a-t-il des résistances en parallèle (dérivation) ? Si oui, lesquelles ?',
      'On a : ' + r('1') + ' = ' + r('2') + ' = 4' + R + ', ' + r('3') + ' = ' + r('4') + ' = ' + R + ' et ' + r('5') + ' = 2' + R + '<br><b>4.</b> Quelle est la résistance équivalente vue depuis le générateur idéal de tension ' + E + ' ?',
      '<b>5.</b> Donnez les expressions des tensions ' + U + ' et de l’intensité du courant ' + I + '.'
    ],
    hints: [
      'Colorie le fil : tout ce qui est relié par du fil seul est un même point. Un nœud relie au moins trois fils. Regarde bien le petit point entre ' + r('4') + ' et ' + r('5') + '.',
      'Deux résistances sont en parallèle si elles relient les deux mêmes nœuds. Elles sont en série si aucun nœud ne les sépare : le même courant les traverse.',
      'Pour ' + r('eq') + ', pars du bout le plus loin du générateur : ' + r('1') + ' // ' + r('2') + ', puis la série avec ' + r('3') + ', puis compare avec la branche ' + r('4') + ' + ' + r('5') + '. Pour ' + U + ', regarde entre quels nœuds est branchée cette branche.'
    ],
    solution: [
      { t: 'Question 1 · nœuds, branches, mailles',
        html: '<p>Tout ce qui est relié par du fil seul est un même point :</p><ul>' +
          '<li><b>A</b> : tout le fil de gauche (' + r('2') + ', ' + r('1') + ', ' + r('4') + ' et la borne + de ' + E + ' s’y rejoignent) ;</li>' +
          '<li><b>B</b> : à droite de ' + r('1') + ' et de ' + r('2') + ', relié à ' + r('3') + ' ;</li>' +
          '<li><b>C</b> : sous ' + r('3') + ', au bout de ' + r('5') + ', relié à l’autre borne de ' + E + ' par le fil de droite.</li></ul>' +
          '<p>Le petit point entre ' + r('4') + ' et ' + r('5') + ' ne relie que deux fils : ce n’est pas un nœud. Il y a donc <b>3 nœuds</b>.</p>' +
          '<p><b>5 branches</b> (d’un nœud à un autre) : ' + r('1') + ' (A–B), ' + r('2') + ' (A–B), ' + r('3') + ' (B–C), ' + r('4') + ' + ' + r('5') + ' (A–C) et le générateur ' + E + ' (A–C).</p>' +
          '<p><b>3 mailles indépendantes</b> (branches − nœuds + 1 = 5 − 3 + 1) : les trois « fenêtres » du dessin, {' + r('2') + ', ' + r('1') + '}, {' + r('1') + ', ' + r('3') + ', ' + r('5') + ', ' + r('4') + '} et {' + r('4') + ', ' + r('5') + ', ' + E + '}. ' +
          'En comptant aussi les tours qui en assemblent plusieurs ({' + r('2') + ', ' + r('3') + ', ' + r('5') + ', ' + r('4') + '}, {' + r('1') + ', ' + r('3') + ', ' + E + '}, {' + r('2') + ', ' + r('3') + ', ' + E + '}), on trouve <b>6 mailles</b> en tout.</p>',
        figs: [{ spec: ex1Spec(ex1Nodes, 'Le circuit avec ses trois nœuds A, B et C'), cap: 'Les trois nœuds A, B et C. Le point entre R₄ et R₅ n’en est pas un.' }] },
      { t: 'Question 2 · série',
        html: '<p><b>' + r('4') + ' et ' + r('5') + '</b> sont en série : le point qui les sépare n’est pas un nœud, le même courant les traverse.</p>' +
          '<p>' + r('3') + ' est en série avec le <b>bloc</b> (' + r('1') + ' // ' + r('2') + '), mais pas avec ' + r('1') + ' seule ni avec ' + r('2') + ' seule : en B, le courant de ' + r('3') + ' se partage entre elles.</p>' },
      { t: 'Question 3 · parallèle',
        html: '<p><b>' + r('1') + ' et ' + r('2') + '</b> sont en parallèle : elles relient toutes les deux A et B, elles ont la même tension.</p>' +
          '<p>À plus grande échelle, la branche ' + r('4') + ' + ' + r('5') + ', la branche (' + r('1') + ' // ' + r('2') + ') + ' + r('3') + ' et le générateur relient tous les trois A et C : ils sont en parallèle.</p>' },
      { t: 'Question 4 · résistance équivalente',
        html: '<p>On réduit en partant du bout le plus loin du générateur.</p><ol>' +
          '<li>' + r('1') + ' // ' + r('2') + ' = 4' + R + ' // 4' + R + ' = 2' + R + ' (deux résistances égales en parallèle : la moitié). Et ' + r('4') + ' + ' + r('5') + ' = ' + R + ' + 2' + R + ' = 3' + R + '.</li>' +
          '<li>Le bloc 2' + R + ' est en série avec ' + r('3') + ' : 2' + R + ' + ' + R + ' = 3' + R + '.</li>' +
          '<li>Il reste deux branches de 3' + R + ' entre A et C, en parallèle : 3' + R + ' // 3' + R + ' = 3' + R + '/2.</li></ol>' +
          '<p><span class="f-inline">' + r('eq') + ' = ' + fr('3' + R, '2') + ' = 1,5' + R + '</span></p>',
        figs: [{ spec: ex1Step('R_1 // R_2 = 2R', 'R_4 + R_5 = 3R', true), cap: 'Étape 1 : R₁ // R₂ = 2R et R₄ + R₅ = 3R.' },
          { spec: ex1Step('2R + R_3 = 3R', '3R', false), cap: 'Étape 2 : 2R en série avec R₃ donne 3R. Deux branches de 3R entre A et C.' },
          { spec: { w: 460, h: 290, aria: 'Générateur E qui alimente une seule résistance équivalente 3R/2',
            wires: ['M40 50H380V240H40Z'],
            parts: [{ t: 'R', x: 210, y: 50, l: 'R_{eq} = 3R/2', c: 'cz-hl' },
              { t: 'E', x: 210, y: 240, d: 'h', p: 'w', l: 'E', as: 's' }, { t: 'I', x: 80, y: 240, d: 'w', l: 'I', lp: 's' },
              { t: 'txt', x: 22, y: 150, s: 'A', c: 'cz-n' }, { t: 'txt', x: 398, y: 150, s: 'C', c: 'cz-n' }] },
            cap: 'Étape 3 : 3R // 3R = 3R/2, la seule résistance que voit le générateur.' }] },
      { t: 'Question 5 · U et I',
        html: '<p>La flèche ' + U + ' est aux bornes de la branche ' + r('4') + ' + ' + r('5') + ', qui relie A et C comme le générateur. Les deux flèches pointent vers A : ' + U + ' = ' + v('A') + ' − ' + v('C') + ' = ' + E + '.</p>' +
          '<p><span class="f-inline">' + U + ' = ' + E + ' = 12 V</span></p>' +
          '<p>' + I + ' sort de la borne + du générateur, qui ne voit que ' + r('eq') + ' :</p>' +
          '<p><span class="f-inline">' + I + ' = ' + fr(E, r('eq')) + ' = ' + fr(E, '3' + R + '/2') + ' = ' + fr('2' + E, '3' + R) + '</span> (soit 8/' + R + ' avec ' + E + ' = 12 V).</p>' +
          '<p class="sol-note">Pour t’entraîner, la flèche ' + u('U', '1') + ' (non demandée) : la branche du haut est parcourue par ' + E + '/(3' + R + '), donc ' + r('1') + ' // ' + r('2') + ' = 2' + R + ' a 2' + E + '/3 à ses bornes, A étant plus haut que B. ' + u('U', '1') + ' pointe vers B : ' + u('U', '1') + ' = ' + v('B') + ' − ' + v('A') + ' = −2' + E + '/3 = −8 V.</p>' }
    ],
    answer: '<p>3 nœuds, 5 branches, 6 mailles (3 indépendantes). ' + r('4') + ' et ' + r('5') + ' en série ; ' + r('1') + ' et ' + r('2') + ' en parallèle.</p>' +
      '<p>' + r('eq') + ' = 3' + R + '/2 · ' + U + ' = ' + E + ' = 12 V · ' + I + ' = 2' + E + '/(3' + R + ')</p>',
    traps: [
      'Compter le point entre ' + r('4') + ' et ' + r('5') + ' comme un nœud : il ne relie que deux fils.',
      'Dire que ' + r('3') + ' est en série avec ' + r('1') + ' : son courant se partage entre ' + r('1') + ' et ' + r('2') + '. Elle est en série avec le bloc ' + r('1') + ' // ' + r('2') + ' seulement.',
      'Chercher ' + U + ' avec un diviseur de tension : la branche ' + r('4') + ' + ' + r('5') + ' est directement branchée aux bornes du générateur, donc ' + U + ' = ' + E + '.',
      'Se tromper de signe : ' + U + ' et ' + E + ' pointent tous les deux vers A, d’où ' + U + ' = +' + E + '.'
    ]
  });

  /* ================= Ex 2 ================= */
  function ex2Spec(extra, aria) {
    return { w: 480, h: 300, aria: aria || 'Trois étages : R1 et R2 en haut, R3, R4, R5 au milieu, générateur E en bas ; flèches U6 et U7 entre le point du haut et les points du milieu',
      wires: ['M30 60H450V260H30Z', 'M30 170H450'],
      parts: [{ t: 'R', x: 120, y: 60, l: 'R_1', lp: 's' }, { t: 'R', x: 345, y: 60, l: 'R_2', lp: 's' },
        { t: 'U', a: [92, 36], b: [150, 36], l: 'U_1' }, { t: 'U', a: [375, 36], b: [317, 36], l: 'U_2' }, { t: 'I', x: 412, y: 60, d: 'w', l: 'I_1' },
        { t: 'R', x: 100, y: 170, l: 'R_3', lp: 's' }, { t: 'R', x: 240, y: 170, l: 'R_4', lp: 's' }, { t: 'R', x: 375, y: 170, l: 'R_5', lp: 's' },
        { t: 'U', a: [75, 146], b: [125, 146], l: 'U_3' }, { t: 'U', a: [268, 146], b: [212, 146], l: 'U_4' }, { t: 'U', a: [350, 146], b: [402, 146], l: 'U_5' },
        { t: 'U', a: [231.6, 73.2], b: [178.4, 156.8], l: 'U_6', lp: 'w' }, { t: 'U', a: [301.6, 156.8], b: [248.4, 73.2], l: 'U_7', lp: 'e' },
        { t: 'I', x: 425, y: 170, d: 'e', l: 'I_2', lp: 's' },
        { t: 'E', x: 240, y: 260, d: 'h', p: 'e', l: 'E', as: 'n' }, { t: 'I', x: 450, y: 215, d: 'n', l: 'I' },
        { t: 'dot', x: 240, y: 60 }, { t: 'dot', x: 30, y: 170 }, { t: 'dot', x: 170, y: 170 }, { t: 'dot', x: 310, y: 170 }, { t: 'dot', x: 450, y: 170 }].concat(extra || []) };
  }
  var ex2Pts = [{ t: 'txt', x: 240, y: 48, s: 'F', c: 'cz-n' }, { t: 'txt', x: 16, y: 164, s: 'B', c: 'cz-n' }, { t: 'txt', x: 170, y: 196, s: 'C', c: 'cz-n' },
    { t: 'txt', x: 310, y: 196, s: 'D', c: 'cz-n' }, { t: 'txt', x: 466, y: 164, s: 'A', c: 'cz-n' }];

  L.push({
    id: 'td1-ex2', exam: null, kind: 'td', order: 2, src: 'TD 1 · Ex 2', official: false,
    title: 'Placer les points, enchaîner les tensions, trouver les courants',
    topics: ['potentiels', 'kirchhoff'], lvl: 2, time: 20,
    intro: '<p>Soit le schéma ci-contre. On donne :</p><ul>' +
      '<li>' + E + ' = ' + v('A') + ' − ' + v('B') + ' = 240 V</li>' +
      '<li>' + u('U', '1') + ' = ' + v('F') + ' − ' + v('B') + ' = 184 V</li>' +
      '<li>' + u('U', '4') + ' = ' + v('C') + ' − ' + v('D') + ' = −110 V</li>' +
      '<li>' + u('U', '5') + ' = ' + u('U', 'AD') + ' = 46 V</li></ul>',
    figs: [{ spec: ex2Spec(), cap: 'Figure du TD : les cinq points sont à nommer' }],
    questions: [
      '<b>1.</b> Placer les points A, B, C, D et F sur la figure.',
      '<b>2.</b> Calculer les valeurs des tensions ' + u('U', '2') + ', ' + u('U', '3') + ', ' + u('U', '6') + ' et ' + u('U', '7') + '.',
      '<b>3.</b> Déterminer les intensités des courants ' + i('I', '1') + ', ' + i('I', '2') + ' et ' + I + ' représentés sur le schéma. On prendra ' + r('1') + ' = ' + r('3') + ' = 100 Ω. Que peut-on dire des sens choisis pour les flèches ?'
    ],
    hints: [
      'Une flèche de tension pointe vers le point écrit en premier : ' + E + ' = ' + v('A') + ' − ' + v('B') + ' pointe vers A. Sers-toi des flèches ' + E + ', ' + u('U', '1') + ' et ' + u('U', '4') + ' pour placer les points.',
      'Prends ' + v('B') + ' = 0 et calcule le potentiel de chaque point : ' + v('A') + ', ' + v('F') + ', puis ' + v('D') + ' avec ' + u('U', '5') + ' et ' + v('C') + ' avec ' + u('U', '4') + '. Chaque tension demandée devient une simple soustraction.',
      'F ne relie que ' + r('1') + ' et ' + r('2') + ' : le même courant les traverse. Pareil pour ' + r('3') + ', ' + r('4') + ', ' + r('5') + '. Applique la loi d’Ohm à ' + r('1') + ' et à ' + r('3') + ' en vérifiant la convention (flèches opposées ou non), puis la loi des nœuds en A.'
    ],
    solution: [
      { t: 'Question 1 · placer les points',
        html: '<ul><li>' + E + ' = ' + v('A') + ' − ' + v('B') + ' et la flèche ' + E + ' pointe vers la droite : <b>A</b> est le point de droite, <b>B</b> celui de gauche.</li>' +
          '<li>' + u('U', '1') + ' = ' + v('F') + ' − ' + v('B') + ' : la flèche ' + u('U', '1') + ' pointe vers le point du haut, c’est <b>F</b>.</li>' +
          '<li>' + u('U', '4') + ' = ' + v('C') + ' − ' + v('D') + ' : la flèche ' + u('U', '4') + ' pointe vers la gauche, donc <b>C</b> est à gauche de ' + r('4') + ' et <b>D</b> à droite.</li>' +
          '<li>Contrôle : ' + u('U', '5') + ' = ' + v('A') + ' − ' + v('D') + ' pointe bien vers A.</li></ul>' +
          '<p>Les flèches ' + u('U', '6') + ' et ' + u('U', '7') + ' ne sont pas des fils : ce sont des tensions entre deux points. F ne relie donc que ' + r('1') + ' et ' + r('2') + '.</p>',
        figs: [{ spec: ex2Spec(ex2Pts, 'Le même circuit avec les points A, B, C, D et F placés'), cap: 'Les points placés : B à gauche, A à droite, F en haut, C et D au milieu.' }] },
      { t: 'Question 2 · tensions',
        html: '<p>Avec ' + v('B') + ' = 0 :</p><ul>' +
          '<li>' + v('A') + ' = ' + E + ' = 240 V et ' + v('F') + ' = ' + u('U', '1') + ' = 184 V ;</li>' +
          '<li>' + v('D') + ' = ' + v('A') + ' − ' + u('U', '5') + ' = 240 − 46 = 194 V ;</li>' +
          '<li>' + v('C') + ' = ' + v('D') + ' + ' + u('U', '4') + ' = 194 − 110 = 84 V.</li></ul>' +
          '<p>Chaque flèche pointe vers le point écrit en premier :</p><ul>' +
          '<li>' + u('U', '2') + ' = ' + v('F') + ' − ' + v('A') + ' = 184 − 240 = <b>−56 V</b> ;</li>' +
          '<li>' + u('U', '3') + ' = ' + v('C') + ' − ' + v('B') + ' = <b>84 V</b> ;</li>' +
          '<li>' + u('U', '6') + ' = ' + v('C') + ' − ' + v('F') + ' = 84 − 184 = <b>−100 V</b> ;</li>' +
          '<li>' + u('U', '7') + ' = ' + v('F') + ' − ' + v('D') + ' = 184 − 194 = <b>−10 V</b>.</li></ul>' +
          '<p>Avec les lois des mailles, c’est la même chose : maille (' + E + ', ' + r('2') + ', ' + r('1') + ') : ' + E + ' + ' + u('U', '2') + ' − ' + u('U', '1') + ' = 0, donc ' + u('U', '2') + ' = ' + u('U', '1') + ' − ' + E + ' ; maille (' + E + ', ' + r('5') + ', ' + r('4') + ', ' + r('3') + ') : ' + u('U', '3') + ' = ' + E + ' + ' + u('U', '4') + ' − ' + u('U', '5') + ' ; puis ' + u('U', '6') + ' = ' + u('U', '3') + ' − ' + u('U', '1') + ' et ' + u('U', '7') + ' = ' + u('U', '5') + ' + ' + u('U', '1') + ' − ' + E + '.</p>' },
      { t: 'Question 3 · courants',
        html: '<ul><li><b>' + i('I', '1') + '</b> : F ne relie que ' + r('1') + ' et ' + r('2') + ', donc ' + i('I', '1') + ' (fléché de A vers F dans ' + r('2') + ') traverse ensuite ' + r('1') + ' de F vers B. Dans ' + r('1') + ', ' + i('I', '1') + ' va vers la gauche et ' + u('U', '1') + ' pointe vers la droite : flèches opposées, convention récepteur, ' + u('U', '1') + ' = ' + r('1') + i('I', '1') + '.<br>' +
          '<span class="f-inline">' + i('I', '1') + ' = ' + u('U', '1') + '/' + r('1') + ' = 184/100 = 1,84 A</span></li>' +
          '<li><b>' + i('I', '2') + '</b> : C et D ne relient que deux résistances, donc ' + r('3') + ', ' + r('4') + ', ' + r('5') + ' sont en série. ' + i('I', '2') + ' (fléché de D vers A) traverse ' + r('3') + ' de B vers C, dans le même sens que ' + u('U', '3') + ' : convention générateur, ' + u('U', '3') + ' = −' + r('3') + i('I', '2') + '.<br>' +
          '<span class="f-inline">' + i('I', '2') + ' = −' + u('U', '3') + '/' + r('3') + ' = −84/100 = −0,84 A</span></li>' +
          '<li><b>' + I + '</b> : loi des nœuds en A. ' + I + ' et ' + i('I', '2') + ' arrivent en A, ' + i('I', '1') + ' en repart : ' + I + ' + ' + i('I', '2') + ' = ' + i('I', '1') + '.<br>' +
          '<span class="f-inline">' + I + ' = ' + i('I', '1') + ' − ' + i('I', '2') + ' = 1,84 + 0,84 = 2,68 A</span></li></ul>' +
          '<p><b>Sens des flèches.</b> Les flèches de courant sont des choix arbitraires : le signe du résultat donne le vrai sens. ' + i('I', '1') + ' et ' + I + ' sont positifs, les flèches sont dans le sens réel. ' + i('I', '2') + ' est négatif : le courant circule en réalité de A vers B à travers ' + r('5') + ', ' + r('4') + ' et ' + r('3') + ' (normal, A est le point le plus haut, à 240 V). ' + I + ' sort par la borne + de ' + E + ' et vaut +2,68 A : ' + E + ' fonctionne bien en générateur et fournit 240 × 2,68 = 643,2 W.</p>' },
      { t: 'Au partiel',
        html: '<p>Cet exercice est tombé tel quel au partiel de nov. 2020 (Ex 3, 6 points), avec deux flèches de courant inversées : au partiel, ' + i('I', '1') + ' pointe vers la droite et ' + i('I', '2') + ' vers la gauche. On y trouve donc ' + i('I', '1') + ' = −1,84 A et ' + i('I', '2') + ' = 0,84 A ; ' + I + ' = 2,68 A ne change pas.</p>' }
    ],
    answer: '<p>Points : B à gauche, A à droite, F en haut, C puis D au milieu.</p>' +
      '<p>' + u('U', '2') + ' = −56 V · ' + u('U', '3') + ' = 84 V · ' + u('U', '6') + ' = −100 V · ' + u('U', '7') + ' = −10 V</p>' +
      '<p>' + i('I', '1') + ' = 1,84 A · ' + i('I', '2') + ' = −0,84 A · ' + I + ' = 2,68 A</p>',
    traps: [
      'Placer A à gauche : la flèche ' + E + ' pointe vers la borne +, donc vers A.',
      'Prendre ' + u('U', '6') + ' et ' + u('U', '7') + ' pour des fils : aucun courant ne passe par là, F ne relie que ' + r('1') + ' et ' + r('2') + '.',
      'Écrire ' + u('U', '3') + ' = ' + r('3') + i('I', '2') + ' : sur ' + r('3') + ', ' + u('U', '3') + ' et ' + i('I', '2') + ' sont fléchés dans le même sens (convention générateur), il faut un signe moins.',
      'Chercher ' + r('2') + ', ' + r('4') + ' ou ' + r('5') + ' : inutile, ' + r('1') + ' et ' + r('3') + ' suffisent puisque chaque branche est une série.',
      'Recopier les signes du corrigé du partiel 2020 : ' + i('I', '1') + ' et ' + i('I', '2') + ' y sont fléchés dans l’autre sens.'
    ]
  });

  /* ================= Ex 3 ================= */
  var ex3Spec = { w: 380, h: 220, aria: 'Générateur E à gauche, R1 en haut, R2 à droite ; U1 fléchée vers la gauche, U2 vers le haut, courant I vers la droite',
    wires: ['M80 60H280V180H80Z'],
    parts: [{ t: 'E', x: 80, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'I', x: 108, y: 60, d: 'e', l: 'I' },
      { t: 'R', x: 185, y: 60, l: 'R_1', lp: 's' }, { t: 'U', a: [220, 36], b: [150, 36], l: 'U_1' },
      { t: 'R', x: 280, y: 120, d: 'v', l: 'R_2', lp: 'w' }, { t: 'U', a: [318, 175], b: [318, 65], l: 'U_2' }] };

  L.push({
    id: 'td1-ex3', exam: null, kind: 'td', order: 3, src: 'TD 1 · Ex 3', official: false,
    title: 'Pont diviseur de tension : alimenter le capteur d’un rover',
    topics: ['diviseurs', 'kirchhoff', 'req'], lvl: 1, time: 15,
    intro: '<p><b>Pont diviseur de tension.</b> Soit le circuit ci-contre :</p>',
    figs: [{ spec: ex3Spec, cap: 'Figure du TD' }],
    questions: [
      '<b>1.</b> Ecrire la loi des mailles.',
      '<b>2.</b> Que peut-on dire des résistances ' + r('1') + ' et ' + r('2') + ' ? Donner l’expression de ' + r('eq') + ', la résistance équivalente à l’association de ' + r('1') + ' et de ' + r('2') + '. Redessiner alors le schéma. Peut-on encore flécher la tension ' + u('U', '1') + ' ? la tension ' + u('U', '2') + ' ? le courant ' + I + ' ?',
      '<b>3.</b> Donner l’expression de ' + I + ' en fonction de ' + E + ' et de ' + r('eq') + ', puis en fonction de ' + E + ', ' + r('1') + ' et ' + r('2') + '.',
      '<b>4.</b> En déduire l’expression de ' + u('U', '2') + ' en fonction de ' + E + ', ' + r('1') + ' et ' + r('2') + '.',
      '<b>Application :</b> Un rover se déplaçant sur Mars doit mesurer la durée d’exposition à la lumière d’une région de la planète. Pour cela, on dispose :<ul><li>d’un capteur de luminosité doit être alimenté par une tension de 3,3 V</li><li>d’une alimentation de 12 V.</li></ul>On utilise un pont diviseur de tension tel que celui présenté précédemment. Déterminer le rapport ' + r('2') + '/' + r('1') + ' pour alimenter correctement ce capteur.'
    ],
    hints: [
      'Fais le tour de la maille dans un sens : compte une tension en + quand sa flèche va dans ton sens de parcours, en − quand elle va contre.',
      'Aucun nœud ne sépare ' + r('1') + ' et ' + r('2') + ' : le même courant ' + I + ' les traverse. Sur le schéma réduit, demande-toi quelles flèches ont encore un dipôle sur lequel s’appuyer.',
      'Pour l’application, le capteur se branche aux bornes de ' + r('2') + ' : écris ' + u('U', '2') + ' = 3,3 V avec ' + E + ' = 12 V, fais le produit en croix et regroupe les ' + r('1') + ' d’un côté, les ' + r('2') + ' de l’autre.'
    ],
    solution: [
      { t: 'Question 1 · loi des mailles',
        html: '<p>On part du coin en bas à gauche et on tourne dans le sens des aiguilles d’une montre. On monte à travers le générateur : ' + E + ' va dans notre sens, +' + E + '. On traverse ' + r('1') + ' vers la droite : ' + u('U', '1') + ' pointe vers la gauche, contre nous, −' + u('U', '1') + '. On descend à travers ' + r('2') + ' : ' + u('U', '2') + ' pointe vers le haut, contre nous, −' + u('U', '2') + '.</p>' +
          '<p><span class="f-inline">' + E + ' − ' + u('U', '1') + ' − ' + u('U', '2') + ' = 0, soit ' + E + ' = ' + u('U', '1') + ' + ' + u('U', '2') + '</span></p>' },
      { t: 'Question 2 · association et schéma réduit',
        html: '<p>' + r('1') + ' et ' + r('2') + ' sont <b>en série</b> : aucun nœud entre elles, le même courant ' + I + ' les traverse.</p>' +
          '<p><span class="f-inline">' + r('eq') + ' = ' + r('1') + ' + ' + r('2') + '</span></p>' +
          '<p>Sur le schéma réduit, ' + r('1') + ' et ' + r('2') + ' ont disparu dans ' + r('eq') + ' : on ne peut plus flécher ' + u('U', '1') + ' ni ' + u('U', '2') + ' (leur somme, la tension de ' + r('eq') + ', vaut ' + E + '). Le courant ' + I + ' se flèche toujours : c’est le même dans toute la maille.</p>',
        figs: [{ spec: { w: 380, h: 220, aria: 'Générateur E qui alimente la seule résistance Req = R1 + R2, parcourue par I',
          wires: ['M80 60H280V180H80Z'],
          parts: [{ t: 'E', x: 80, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'I', x: 150, y: 60, d: 'e', l: 'I' },
            { t: 'R', x: 280, y: 120, d: 'v', l: 'R_{eq} = R_1 + R_2', lp: 'w', c: 'cz-hl' }] },
          cap: 'Schéma redessiné : I existe toujours, U₁ et U₂ n’ont plus de résistance où se poser.' }] },
      { t: 'Question 3 · courant',
        html: '<p>' + r('eq') + ' a la tension ' + E + ' à ses bornes et ' + I + ' y entre par le côté + : convention récepteur, loi d’Ohm.</p>' +
          '<p><span class="f-inline">' + I + ' = ' + fr(E, r('eq')) + ' = ' + fr(E, r('1') + ' + ' + r('2')) + '</span></p>' },
      { t: 'Question 4 · tension de sortie',
        html: '<p>Sur ' + r('2') + ', ' + I + ' descend et ' + u('U', '2') + ' monte : convention récepteur, ' + u('U', '2') + ' = ' + r('2') + I + '.</p>' +
          '<p><span class="f-inline">' + u('U', '2') + ' = ' + fr(r('2'), r('1') + ' + ' + r('2')) + ' ' + E + '</span></p>' +
          '<p>C’est la formule du <b>diviseur de tension</b> : la tension se partage entre les résistances en série, en proportion de leur valeur.</p>' },
      { t: 'Application · rover',
        html: '<p>On veut ' + u('U', '2') + ' = 3,3 V avec ' + E + ' = 12 V :</p>' +
          '<p><span class="f-inline">3,3 = 12 × ' + fr(r('2'), r('1') + ' + ' + r('2')) + '</span></p>' +
          '<p>Produit en croix : 3,3' + r('1') + ' + 3,3' + r('2') + ' = 12' + r('2') + ', donc 3,3' + r('1') + ' = 8,7' + r('2') + '.</p>' +
          '<p><span class="f-inline">' + fr(r('2'), r('1')) + ' = ' + fr('3,3', '8,7') + ' = ' + fr('11', '29') + ' ≈ 0,38</span></p>' +
          '<p>Plus vite : ' + r('1') + ' prend le reste, ' + u('U', '1') + ' = 12 − 3,3 = 8,7 V, et comme le courant est le même, les tensions sont proportionnelles aux résistances. Par exemple ' + r('1') + ' = 8,7 kΩ et ' + r('2') + ' = 3,3 kΩ.</p>' +
          '<p class="sol-note">En vrai, le capteur consomme un peu de courant et se retrouve en parallèle sur ' + r('2') + ' : le calcul ne reste juste que si sa résistance est bien plus grande que ' + r('2') + '.</p>' }
    ],
    answer: '<p>' + E + ' = ' + u('U', '1') + ' + ' + u('U', '2') + ' · ' + r('eq') + ' = ' + r('1') + ' + ' + r('2') + ' · ' + I + ' = ' + E + '/(' + r('1') + ' + ' + r('2') + ') · ' + u('U', '2') + ' = ' + r('2') + E + '/(' + r('1') + ' + ' + r('2') + ')</p>' +
      '<p>Rover : ' + r('2') + '/' + r('1') + ' = 3,3/8,7 = 11/29 ≈ 0,38</p>',
    traps: [
      'Se tromper de signe dans la maille : en tournant dans le sens horaire, ' + u('U', '1') + ' (vers la gauche) et ' + u('U', '2') + ' (vers le haut) vont toutes les deux contre le sens de parcours, d’où ' + E + ' = ' + u('U', '1') + ' + ' + u('U', '2') + '.',
      'Répondre ' + r('2') + '/' + r('1') + ' = 3,3/12 ≈ 0,28 : 3,3/12 est le rapport ' + r('2') + '/(' + r('1') + ' + ' + r('2') + '), pas ' + r('2') + '/' + r('1') + '.',
      'Vouloir encore flécher ' + u('U', '1') + ' ou ' + u('U', '2') + ' sur le schéma réduit : ' + r('1') + ' et ' + r('2') + ' n’y existent plus.'
    ]
  });

  /* ================= Ex 4 ================= */
  var ex4Spec = { w: 380, h: 220, aria: 'Source de courant I à gauche, R1 et R2 en parallèle ; courants I1 et I2 vers le bas, tension U vers le haut',
    wires: ['M80 45H310V185H80Z', 'M200 45V185'],
    parts: [{ t: 'J', x: 80, y: 115, d: 'v', to: 'n', l: 'I', as: 'w' },
      { t: 'I', x: 200, y: 72, d: 's', l: 'I_1', lp: 'w' }, { t: 'R', x: 200, y: 128, d: 'v', l: 'R_1', lp: 'w' },
      { t: 'I', x: 310, y: 72, d: 's', l: 'I_2', lp: 'w' }, { t: 'R', x: 310, y: 128, d: 'v', l: 'R_2', lp: 'w' },
      { t: 'U', a: [348, 180], b: [348, 50], l: 'U' }, { t: 'dot', x: 200, y: 45 }, { t: 'dot', x: 200, y: 185 }] };

  L.push({
    id: 'td1-ex4', exam: null, kind: 'td', order: 4, src: 'TD 1 · Ex 4', official: false,
    title: 'Pont diviseur de courant : deux périphériques USB',
    topics: ['diviseurs', 'kirchhoff', 'req', 'source-courant'], lvl: 1, time: 15,
    intro: '<p><b>Pont diviseur de courant.</b> Deux périphériques USB, représentés par ' + r('1') + ' et ' + r('2') + ' partagent le courant fourni par une batterie (voir le circuit ci-contre).</p>',
    figs: [{ spec: ex4Spec, cap: 'Figure du TD' }],
    questions: [
      '<b>1.</b> Ecrire la loi des nœuds.',
      '<b>2.</b> Que peut-on dire des résistances ' + r('1') + ' et ' + r('2') + ' ? Donner l’expression de ' + r('eq') + ', la résistance équivalente à l’association de ' + r('1') + ' et de ' + r('2') + '. Redessiner alors le schéma. Peut-on encore flécher le courant ' + i('I', '1') + ' ? le courant ' + i('I', '2') + ' ? la tension ' + U + ' ?',
      '<b>3.</b> Donner l’expression de ' + U + ' en fonction de ' + I + ' et de ' + r('eq') + ', puis en fonction de ' + I + ', ' + r('1') + ' et ' + r('2') + '.',
      '<b>4.</b> En déduire les expression des intensités des courants dans chaque périphériques en fonction de ' + I + ', de ' + r('1') + ' et de ' + r('2') + '.'
    ],
    hints: [
      'Au nœud du haut, ' + I + ' arrive, ' + i('I', '1') + ' et ' + i('I', '2') + ' repartent.',
      r('1') + ' et ' + r('2') + ' relient les deux mêmes nœuds : elles ont la même tension ' + U + '. En parallèle, ce sont les inverses des résistances qui s’ajoutent.',
      'Une fois ' + U + ' connue, applique la loi d’Ohm à ' + r('1') + ' seule, puis à ' + r('2') + ' seule.'
    ],
    solution: [
      { t: 'Question 1 · loi des nœuds',
        html: '<p>Au nœud du haut, ce qui arrive est égal à ce qui repart :</p><p><span class="f-inline">' + I + ' = ' + i('I', '1') + ' + ' + i('I', '2') + '</span></p>' },
      { t: 'Question 2 · association et schéma réduit',
        html: '<p>' + r('1') + ' et ' + r('2') + ' sont <b>en parallèle</b> : elles relient les deux mêmes nœuds et ont la même tension ' + U + '. Les inverses s’ajoutent : 1/' + r('eq') + ' = 1/' + r('1') + ' + 1/' + r('2') + ' = (' + r('1') + ' + ' + r('2') + ')/(' + r('1') + r('2') + ').</p>' +
          '<p><span class="f-inline">' + r('eq') + ' = ' + fr(r('1') + r('2'), r('1') + ' + ' + r('2')) + '</span></p>' +
          '<p>Sur le schéma réduit, les deux branches n’en font plus qu’une : on ne peut plus flécher ' + i('I', '1') + ' ni ' + i('I', '2') + '. La tension ' + U + ' se flèche toujours, aux bornes de ' + r('eq') + ' (et ' + I + ' aussi).</p>',
        figs: [{ spec: { w: 380, h: 220, aria: 'Source de courant I qui alimente la seule résistance Req ; la tension U est toujours fléchée',
          wires: ['M80 45H250V185H80Z'],
          parts: [{ t: 'J', x: 80, y: 115, d: 'v', to: 'n', l: 'I', as: 'w' },
            { t: 'R', x: 250, y: 115, d: 'v', l: 'R_{eq}', lp: 'w', c: 'cz-hl' }, { t: 'U', a: [290, 180], b: [290, 50], l: 'U' }] },
          cap: 'Schéma redessiné : U existe toujours, I₁ et I₂ ont disparu avec leurs branches.' }] },
      { t: 'Question 3 · tension',
        html: '<p>' + I + ' entre dans ' + r('eq') + ' par le haut et ' + U + ' pointe vers le haut : convention récepteur, ' + U + ' = ' + r('eq') + I + '.</p>' +
          '<p><span class="f-inline">' + U + ' = ' + fr(r('1') + r('2'), r('1') + ' + ' + r('2')) + ' ' + I + '</span></p>' },
      { t: 'Question 4 · courants dans les périphériques',
        html: '<p>' + U + ' est aussi la tension de chaque résistance (convention récepteur pour chacune) : ' + i('I', '1') + ' = ' + U + '/' + r('1') + ' et ' + i('I', '2') + ' = ' + U + '/' + r('2') + '.</p>' +
          '<p><span class="f-inline">' + i('I', '1') + ' = ' + fr(r('2'), r('1') + ' + ' + r('2')) + ' ' + I + '</span> et <span class="f-inline">' + i('I', '2') + ' = ' + fr(r('1'), r('1') + ' + ' + r('2')) + ' ' + I + '</span></p>' +
          '<p>C’est le <b>diviseur de courant</b> : au numérateur, on trouve l’<b>autre</b> résistance, et la plus petite résistance reçoit le plus gros courant. Contrôle : ' + i('I', '1') + ' + ' + i('I', '2') + ' = ' + I + '.</p>' }
    ],
    answer: '<p>' + I + ' = ' + i('I', '1') + ' + ' + i('I', '2') + ' · ' + r('eq') + ' = ' + r('1') + r('2') + '/(' + r('1') + ' + ' + r('2') + ') · ' + U + ' = ' + r('1') + r('2') + I + '/(' + r('1') + ' + ' + r('2') + ')</p>' +
      '<p>' + i('I', '1') + ' = ' + r('2') + I + '/(' + r('1') + ' + ' + r('2') + ') · ' + i('I', '2') + ' = ' + r('1') + I + '/(' + r('1') + ' + ' + r('2') + ')</p>',
    traps: [
      'Mettre ' + r('1') + ' au numérateur de ' + i('I', '1') + ' : c’est l’autre résistance. Contrôle avec un cas limite : si ' + r('2') + ' = 0, tout le courant passe par ' + r('2') + ' et ' + i('I', '1') + ' doit valoir 0.',
      'Écrire ' + r('eq') + ' = ' + r('1') + ' + ' + r('2') + ' : c’est la formule de la série.',
      'Ajouter 1/' + r('1') + ' + 1/' + r('2') + ' et oublier de prendre l’inverse à la fin.'
    ]
  });

  /* ================= Ex 5 ================= */
  var ex5Spec = { w: 380, h: 210, aria: 'Générateur E en série avec R, qui alimente la charge RC ; tension U aux bornes de RC',
    wires: ['M80 50H280V170H80Z'],
    parts: [{ t: 'E', x: 80, y: 110, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 180, y: 50, l: 'R', lp: 's' },
      { t: 'R', x: 280, y: 110, d: 'v', l: 'R_C', lp: 'w' }, { t: 'U', a: [318, 165], b: [318, 55], l: 'U' }] };

  L.push({
    id: 'td1-ex5', exam: null, kind: 'td', order: 5, src: 'TD 1 · Ex 5', official: false,
    title: 'Retrouver E et R à partir de deux charges',
    topics: ['generateurs', 'diviseurs', 'calcul'], lvl: 2, time: 15,
    intro: '<p>Le générateur (' + E + ', ' + R + ') impose ' + U + ' = 2 V si ' + r('C') + ' = 10 Ω et le double si ' + r('C') + ' = 25 Ω.</p>',
    figs: [{ spec: ex5Spec, cap: 'Figure du TD' }],
    questions: ['Donner l’expression de ' + U + ' en fonction de ' + E + ', ' + R + ' et ' + r('C') + '. En déduire ' + E + ' et ' + R + '.'],
    hints: [
      R + ' et ' + r('C') + ' sont parcourues par le même courant : ' + U + ' s’obtient avec un diviseur de tension.',
      '« Le double » veut dire ' + U + ' = 4 V quand ' + r('C') + ' = 25 Ω. Deux situations donnent deux équations, pour deux inconnues ' + E + ' et ' + R + '.',
      'Fais le produit en croix dans chaque équation, isole ' + R + ' dans la première et remplace-la dans la seconde.'
    ],
    solution: [
      { t: 'Expression de U',
        html: '<p>' + R + ' et ' + r('C') + ' sont en série (même courant) : diviseur de tension.</p>' +
          '<p><span class="f-inline">' + U + ' = ' + fr(r('C'), R + ' + ' + r('C')) + ' ' + E + '</span></p>' },
      { t: 'Valeurs de E et R',
        html: '<p>Deux situations, deux équations :</p><ul>' +
          '<li>' + r('C') + ' = 10 Ω et ' + U + ' = 2 V : 2(' + R + ' + 10) = 10' + E + ', soit ' + R + ' + 10 = 5' + E + ' et <b>' + R + ' = 5' + E + ' − 10</b> ;</li>' +
          '<li>' + r('C') + ' = 25 Ω et ' + U + ' = 4 V : 4(' + R + ' + 25) = 25' + E + ', soit 4' + R + ' + 100 = 25' + E + '.</li></ul>' +
          '<p>On remplace ' + R + ' dans la seconde : 4(5' + E + ' − 10) + 100 = 25' + E + ', donc 20' + E + ' + 60 = 25' + E + ' et 5' + E + ' = 60.</p>' +
          '<p><span class="f-inline">' + E + ' = 12 V</span> puis <span class="f-inline">' + R + ' = 5 × 12 − 10 = 50 Ω</span></p>' +
          '<p>Contrôle : 12 × 10/60 = 2 V et 12 × 25/75 = 4 V.</p>' }
    ],
    answer: '<p>' + U + ' = ' + r('C') + E + '/(' + R + ' + ' + r('C') + ') · ' + E + ' = 12 V · ' + R + ' = 50 Ω</p>',
    traps: [
      'Faire doubler la mauvaise grandeur : c’est ' + U + ' qui double (4 V) ; ' + r('C') + ' passe de 10 à 25 Ω.',
      'Oublier ' + R + ' au dénominateur : ' + U + ' = ' + r('C') + E + '/(' + R + ' + ' + r('C') + '). Ici ' + R + ' est la résistance interne du générateur, elle prend sa part de la tension.',
      'Ne pas vérifier : remplace tes valeurs dans les deux situations, une erreur de calcul se voit tout de suite.'
    ]
  });

  /* ================= Ex 6 ================= */
  function ex6Spec(meter, aria) {
    var wires = [{ d: 'M28 22H300V200H28Z', c: 'cz-muted' }, 'M90 55H360', 'M90 165H360', 'M90 55V165', 'M250 55V165'];
    var parts = [{ t: 'E', x: 90, y: 110, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 170, y: 55, l: 'R_1', lp: 's' },
      { t: 'R', x: 250, y: 110, d: 'v', l: 'R_2', lp: 'w', c: meter === 'A' ? 'cz-ghost' : '' }, { t: 'dot', x: 250, y: 55 }, { t: 'dot', x: 250, y: 165 },
      { t: 'term', x: 360, y: 55, l: 'A', lp: 'n' }, { t: 'term', x: 360, y: 165, l: 'B', lp: 's' }];
    if (meter) {
      wires.push('M360 55V165');
      parts.push({ t: 'M', x: 360, y: 110, d: 'v', k: meter, l: meter === 'V' ? '4 V' : '0,5 A' });
      if (meter === 'A') parts.push({ t: 'I', x: 222, y: 55, d: 'e', l: 'I' });
    }
    return { w: 420, h: 230, aria: aria || 'Boîte noire en pointillés contenant E, R1 et R2 ; bornes A et B à droite', wires: wires, parts: parts };
  }

  L.push({
    id: 'td1-ex6', exam: null, kind: 'td', order: 6, src: 'TD 1 · Ex 6', official: false,
    title: 'Diagnostic d’une boîte noire au voltmètre et à l’ampèremètre',
    topics: ['appareils', 'diviseurs'], lvl: 2, time: 15,
    intro: '<p><b>Diagnostic d’une boîte noire.</b> Une interface inconnue (boite noire) contient 3 dipôles ' + E + ', ' + r('1') + ' et ' + r('2') + '. On sait que ' + E + ' = 6 V, mais, ' + r('1') + ' et ' + r('2') + ' sont inconnues. On souhaite identifier les 2 résistances à partir de mesures réalisées.</p>' +
      '<p>Si on place un voltmètre entre les points A et B, on mesure 4 V. Si on place un ampèremètre entre les points A et B, on mesure 0,5 A.</p>' +
      '<p><i>Précisions :</i></p><ul>' +
      '<li><i>Un ampèremètre sert à mesurer l’intensité du courant qui traverse un composant. Pour ce faire, il faut brancher l’ampèremètre en série avec le composant concerné. Dans des résistances en série, le courant est le même. <b>Il faut savoir qu’un ampèremètre présente une résistance négligeable, il ne modifie donc pas le courant qui circule dans le circuit.</b></i></li>' +
      '<li><i>Un voltmètre sert à mesurer la différence de potentiel électrique aux bornes d’un composant. Pour ce faire, il faut brancher le voltmètre en parallèle avec le composant concerné, car la différence de potentiel aux bornes de composants en parallèle est la même. <b>Comme la résistance du voltmètre est bien plus élevée que celle du composant aux bornes duquel il est branché, très peu de courant y passe. L’effet sur le circuit est donc négligeable. On peut généralement considérer la résistance du voltmètre comme infinie.</b></i></li></ul>',
    figs: [{ spec: ex6Spec(), cap: 'Figure du TD : la boîte noire et ses bornes A et B' }],
    questions: ['Que valent ' + r('1') + ' et ' + r('2') + ' ?'],
    hints: [
      'Voltmètre idéal : résistance infinie, aucun courant ne sort par A. Comment sont alors branchées ' + r('1') + ' et ' + r('2') + ' ?',
      'Ampèremètre idéal : résistance nulle, c’est un fil entre A et B. Que devient ' + r('2') + ' avec un fil branché à ses bornes ?',
      'La mesure à l’ampèremètre donne directement ' + r('1') + ' ; reporte-la dans l’équation du voltmètre.'
    ],
    solution: [
      { t: 'Mesure au voltmètre',
        html: '<p>Le voltmètre a une résistance infinie : aucun courant ne sort par A. ' + r('1') + ' et ' + r('2') + ' sont parcourues par le même courant, en série : diviseur de tension.</p>' +
          '<p><span class="f-inline">' + u('U', 'AB') + ' = ' + fr(r('2'), r('1') + ' + ' + r('2')) + ' ' + E + ' = 4 V</span></p>' +
          '<p>Avec ' + E + ' = 6 V : 6' + r('2') + ' = 4' + r('1') + ' + 4' + r('2') + ', donc <b>' + r('2') + ' = 2' + r('1') + '</b>.</p>',
        figs: [{ spec: ex6Spec('V', 'Voltmètre branché entre A et B'), cap: 'Voltmètre entre A et B : aucun courant ne sort de la boîte.' }] },
      { t: 'Mesure à l’ampèremètre',
        html: '<p>L’ampèremètre a une résistance nulle : c’est un fil entre A et B, donc aux bornes de ' + r('2') + '. ' + r('2') + ' est <b>court-circuitée</b> : tension nulle, aucun courant. Tout le courant passe par ' + r('1') + ' et l’ampèremètre, et ' + r('1') + ' reçoit toute la tension ' + E + '.</p>' +
          '<p><span class="f-inline">' + I + ' = ' + fr(E, r('1')) + ' = 0,5 A, donc ' + r('1') + ' = ' + fr('6', '0,5') + ' = 12 Ω</span></p>',
        figs: [{ spec: ex6Spec('A', 'Ampèremètre branché entre A et B, R2 court-circuitée'), cap: 'Ampèremètre entre A et B : R₂ est court-circuitée (estompée).' }] },
      { t: 'Conclusion',
        html: '<p><span class="f-inline">' + r('1') + ' = 12 Ω</span> et <span class="f-inline">' + r('2') + ' = 2' + r('1') + ' = 24 Ω</span></p>' +
          '<p>Contrôle : 6 × 24/(12 + 24) = 6 × 2/3 = 4 V.</p>' }
    ],
    answer: '<p>' + r('1') + ' = 12 Ω · ' + r('2') + ' = 24 Ω</p>',
    traps: [
      'Garder ' + r('2') + ' dans le calcul avec l’ampèremètre : le fil de l’ampèremètre la court-circuite, aucun courant ne la traverse.',
      'Prendre 4 V/0,5 A = 8 Ω pour ' + r('1') + ' ou pour ' + r('2') + ' : ce rapport vaut ' + r('1') + ' // ' + r('2') + ' = 12 × 24/36 = 8 Ω, la résistance vue entre A et B.',
      'Imaginer les deux appareils branchés en même temps : ce sont deux mesures séparées, chacune dans son propre circuit.'
    ]
  });

  /* ================= Ex 7 ================= */
  var K1 = 'K<sub>1</sub>', K2 = 'K<sub>2</sub>';
  /* k1, k2 : true = fermé ; mod(parts) permet d’estomper ou de surligner */
  function ex7Spec(k1, k2, uLab, note, mod, aria) {
    var parts = [{ t: 'E', x: 70, y: 155, d: 'v', p: 'n', l: 'E', as: 'w' },
      { t: 'R', x: 230, y: 40, l: 'R', lp: 's' }, { t: 'K', x: 230, y: 120, d: 'h', open: !k1, l: 'K_1', lp: 's' },
      { t: 'K', x: 370, y: 120, d: 'v', open: !k2, l: 'K_2', lp: [-22, 6, 'end'] }, { t: 'R', x: 370, y: 185, d: 'v', l: 'R', lp: 'w' },
      { t: 'U', a: [412, 225], b: [412, 85], l: uLab || 'U' }];
    if (note) parts.push({ t: 'txt', x: 220, y: 256, s: note, c: 'cz-tiny' });
    if (mod) mod(parts);
    return { w: 500, h: 266, aria: aria || 'Générateur E ; en haut, R en parallèle avec l’interrupteur K1 ; à droite, l’interrupteur K2 en série avec R ; U aux bornes de K2 et R',
      wires: ['M170 80H70V230H370V80H290', 'M170 40H290V120H170Z'], parts: parts };
  }
  function ghostTop(p) { p[1].c = 'cz-ghost'; }

  L.push({
    id: 'td1-ex7', exam: null, kind: 'td', order: 7, src: 'TD 1 · Ex 7', official: false,
    title: 'Deux interrupteurs, quatre cas',
    topics: ['interrupteurs', 'diviseurs'], lvl: 1, time: 10,
    intro: '<p>Soit le circuit ci-contre.</p>',
    figs: [{ spec: ex7Spec(false, false), cap: 'Figure du TD (K₁ et K₂ dessinés ouverts)' }],
    questions: ['Donner l’expression de ' + U + ' dans les 4 cas possibles'],
    hints: [
      'Un interrupteur fermé est un fil, un interrupteur ouvert est un trou : redessine le circuit dans chacun des 4 cas.',
      'Regarde bien jusqu’où va la flèche ' + U + ' : elle couvre toute la branche de droite, ' + K2 + ' compris.',
      'Quand aucun courant ne circule, une résistance a une tension nulle à ses bornes : une loi des mailles suffit. Quand un courant circule, pense au diviseur de tension.'
    ],
    solution: [
      { t: 'Méthode',
        html: '<p>Fermé = fil, ouvert = trou. La flèche ' + U + ' couvre toute la branche de droite : ' + U + ' est la tension aux bornes de l’ensemble ' + K2 + ' + ' + R + '. Il n’y a qu’une boucle, et la loi des mailles donne toujours ' + E + ' = (tension du bloc ' + R + ' // ' + K1 + ') + ' + U + '.</p>' },
      { t: 'Cas 1 · K₁ ouvert, K₂ ouvert',
        html: '<p>' + K2 + ' ouvert coupe la seule boucle : <b>aucun courant</b>. La résistance du haut, sans courant, a une tension nulle : ' + E + ' = 0 + ' + U + '.</p>' +
          '<p><span class="f-inline">' + U + ' = ' + E + '</span></p><p>Toute la tension se retrouve aux bornes de l’interrupteur ouvert ' + K2 + ' ; la résistance du bas, sans courant, a 0 V.</p>',
        figs: [{ spec: ex7Spec(false, false, 'U = E', 'aucun courant'), cap: 'Cas 1 : la boucle est coupée par K₂.' }] },
      { t: 'Cas 2 · K₁ ouvert, K₂ fermé',
        html: '<p>Les deux résistances ' + R + ' sont en série dans la boucle, parcourues par ' + I + ' = ' + E + '/(2' + R + '). ' + K2 + ' fermé est un fil : ' + U + ' est la tension de la résistance du bas. Diviseur de tension avec deux résistances égales :</p>' +
          '<p><span class="f-inline">' + U + ' = ' + fr(R, R + ' + ' + R) + ' ' + E + ' = ' + fr(E, '2') + '</span></p>',
        figs: [{ spec: ex7Spec(false, true, 'U = E/2', 'courant E/(2R)', function (p) { p[1].c = 'cz-hl'; p[4].c = 'cz-hl'; }), cap: 'Cas 2 : les deux R en série se partagent E.' }] },
      { t: 'Cas 3 · K₁ fermé, K₂ ouvert',
        html: '<p>' + K2 + ' est toujours ouvert : aucun courant, comme au cas 1. Fermer ' + K1 + ' ne change rien à la tension de la branche de droite.</p>' +
          '<p><span class="f-inline">' + U + ' = ' + E + '</span></p>',
        figs: [{ spec: ex7Spec(true, false, 'U = E', 'aucun courant', ghostTop), cap: 'Cas 3 : K₁ court-circuite R du haut, mais K₂ coupe la boucle.' }] },
      { t: 'Cas 4 · K₁ fermé, K₂ fermé',
        html: '<p>' + K1 + ' fermé est un fil branché aux bornes de la résistance du haut : elle est <b>court-circuitée</b>, sa tension est nulle. La résistance du bas reçoit toute la tension, parcourue par ' + E + '/' + R + '.</p>' +
          '<p><span class="f-inline">' + U + ' = ' + E + '</span></p>',
        figs: [{ spec: ex7Spec(true, true, 'U = E', 'courant E/R', function (p) { ghostTop(p); p[4].c = 'cz-hl'; }), cap: 'Cas 4 : R du haut court-circuitée (estompée), toute la tension E sur R du bas.' }] }
    ],
    answer: '<ul><li>' + K1 + ' ouvert, ' + K2 + ' ouvert : ' + U + ' = ' + E + '</li><li>' + K1 + ' ouvert, ' + K2 + ' fermé : ' + U + ' = ' + E + '/2</li>' +
      '<li>' + K1 + ' fermé, ' + K2 + ' ouvert : ' + U + ' = ' + E + '</li><li>' + K1 + ' fermé, ' + K2 + ' fermé : ' + U + ' = ' + E + '</li></ul>',
    traps: [
      'Lire ' + U + ' comme la tension de la seule résistance du bas : avec ' + K2 + ' ouvert, tu trouverais 0, alors que la flèche ' + U + ' englobe ' + K2 + ' et vaut ' + E + '.',
      'Croire qu’un interrupteur ouvert a une tension nulle : c’est son courant qui est nul ; ici, toute la tension ' + E + ' se retrouve à ses bornes.',
      'Oublier que ' + K1 + ' fermé court-circuite la résistance du haut : elle ne prend plus aucune tension.'
    ]
  });

  /* ================= Ex 8 ================= */
  var ex8Spec = { w: 520, h: 210, aria: 'Source de courant I, puis une échelle : 2R vertical, R en haut, 2R vertical, R en haut, R vertical ; U1, U2, U3 aux bornes des résistances verticales',
    wires: ['M60 40H440V170H60Z', 'M160 40V170', 'M300 40V170'],
    parts: [{ t: 'J', x: 60, y: 105, d: 'v', to: 'n', l: 'I', as: 'w' },
      { t: 'R', x: 160, y: 105, d: 'v', l: '2R' }, { t: 'U', a: [134, 145], b: [134, 65], l: 'U_1', lp: 'w' },
      { t: 'R', x: 230, y: 40, l: 'R', lp: 's' },
      { t: 'R', x: 300, y: 105, d: 'v', l: '2R' }, { t: 'U', a: [274, 145], b: [274, 65], l: 'U_2', lp: 'w' },
      { t: 'R', x: 370, y: 40, l: 'R', lp: 's' },
      { t: 'R', x: 440, y: 105, d: 'v', l: 'R', lp: 'w' }, { t: 'U', a: [470, 145], b: [470, 65], l: 'U_3' },
      { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 160, y: 170 }, { t: 'dot', x: 300, y: 40 }, { t: 'dot', x: 300, y: 170 }] };

  L.push({
    id: 'td1-ex8', exam: null, kind: 'td', order: 8, src: 'TD 1 · Ex 8', official: false,
    title: 'Échelle de résistances alimentée par une source de courant',
    topics: ['req', 'diviseurs', 'source-courant'], lvl: 2, time: 15,
    intro: '<p>Soit le circuit ci-contre où : ' + I + ' = 2 mA et ' + R + ' = 1 kΩ</p>',
    figs: [{ spec: ex8Spec, cap: 'Figure du TD' }],
    questions: ['Donner les expressions, puis les valeurs de ' + u('U', '1') + ', ' + u('U', '2') + ' et ' + u('U', '3')],
    hints: [
      'Pars du bout de droite : la résistance ' + R + ' du haut et la résistance ' + R + ' verticale sont parcourues par le même courant.',
      'À chaque étage, tu retrouves 2' + R + ' en parallèle avec 2' + R + '. Combien cela fait-il ?',
      'Une fois ' + u('U', '1') + ' connue, redescends étage par étage avec un diviseur de tension : chaque fois, une résistance ' + R + ' du haut en série avec un bloc déjà réduit.'
    ],
    solution: [
      { t: 'Réduction depuis la droite',
        html: '<ol><li>Dernier étage : ' + R + ' (en haut) + ' + R + ' (vertical) = 2' + R + ', en série car aucun nœud ne les sépare.</li>' +
          '<li>Ces 2' + R + ' sont en parallèle avec la 2' + R + ' verticale du milieu : 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
          '<li>On recommence : ' + R + ' (en haut) + ' + R + ' = 2' + R + ', en parallèle avec la première 2' + R + ' : encore ' + R + '.</li></ol>' +
          '<p>La source de courant voit donc <span class="f-inline">' + r('eq') + ' = ' + R + '</span>.</p>',
        figs: [{ spec: { w: 520, h: 210, aria: 'Échelle après réduction du dernier étage : un bloc R à la place des deux derniers étages',
            wires: ['M60 40H300V170H60Z', 'M160 40V170'],
            parts: [{ t: 'J', x: 60, y: 105, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 160, y: 105, d: 'v', l: '2R' }, { t: 'U', a: [134, 145], b: [134, 65], l: 'U_1', lp: 'w' },
              { t: 'R', x: 230, y: 40, l: 'R', lp: 's' }, { t: 'R', x: 300, y: 105, d: 'v', l: '2R // 2R = R', c: 'cz-hl' }, { t: 'U', a: [274, 145], b: [274, 65], l: 'U_2', lp: 'w' },
              { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 160, y: 170 }] },
          cap: 'Étape 1 : R + R = 2R, en parallèle avec 2R : il reste un bloc R, aux bornes duquel on lit U₂.' },
          { spec: { w: 520, h: 210, aria: 'La source de courant I alimente une seule résistance équivalente R',
            wires: ['M200 40H300V170H200Z'],
            parts: [{ t: 'J', x: 200, y: 105, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 300, y: 105, d: 'v', l: 'R_{eq} = R', c: 'cz-hl' },
              { t: 'U', a: [410, 145], b: [410, 65], l: 'U_1' }] },
          cap: 'Étape 2 : R + R = 2R, en parallèle avec 2R : la source voit R.' }] },
      { t: 'Tension U₁',
        html: '<p>' + I + ' sort par le haut de la source et traverse ' + r('eq') + ' de haut en bas ; ' + u('U', '1') + ' pointe vers le haut : convention récepteur.</p>' +
          '<p><span class="f-inline">' + u('U', '1') + ' = ' + r('eq') + I + ' = ' + R + I + ' = 1 kΩ × 2 mA = 2 V</span></p>' },
      { t: 'Tensions U₂ et U₃',
        html: '<p>Après le premier nœud, on a une résistance ' + R + ' en série avec un bloc qui vaut ' + R + ' (étape 1), et ' + u('U', '2') + ' est la tension de ce bloc. Diviseur de tension :</p>' +
          '<p><span class="f-inline">' + u('U', '2') + ' = ' + fr(R, R + ' + ' + R) + ' ' + u('U', '1') + ' = ' + fr(R + I, '2') + ' = 1 V</span></p>' +
          '<p>Même chose au dernier étage : ' + R + ' en haut, ' + R + ' verticale, et ' + u('U', '3') + ' aux bornes de la verticale.</p>' +
          '<p><span class="f-inline">' + u('U', '3') + ' = ' + fr(R, R + ' + ' + R) + ' ' + u('U', '2') + ' = ' + fr(R + I, '4') + ' = 0,5 V</span></p>' +
          '<p>Contrôle par les courants : à chaque nœud, le courant se partage en deux moitiés (deux branches de 2' + R + '). ' + I + '/2 entre dans le deuxième étage, ' + I + '/4 dans le dernier, et ' + u('U', '3') + ' = ' + R + ' × ' + I + '/4 = 0,5 V.</p>' }
    ],
    answer: '<p>' + u('U', '1') + ' = ' + R + I + ' = 2 V · ' + u('U', '2') + ' = ' + R + I + '/2 = 1 V · ' + u('U', '3') + ' = ' + R + I + '/4 = 0,5 V</p>',
    traps: [
      'Partager en trois à chaque étage parce qu’on voit trois résistances : à chaque étage, il y a ' + R + ' en série avec un bloc qui vaut ' + R + ', donc un partage en deux.',
      'Écrire ' + u('U', '2') + ' = ' + u('U', '1') + ' : les deux branches sont séparées par une résistance ' + R + ' traversée par un courant, elle prend sa part de la tension.',
      'Se perdre dans les unités : kΩ × mA donne directement des volts.'
    ]
  });

  /* ================= Ex 9 ================= */
  function ex9Spec(extra, aria) {
    return { w: 380, h: 240, aria: aria || 'Générateur E à gauche ; au milieu, source de courant I1 (flèche vers le haut) au-dessus de R1, avec U aux bornes de la source ; R2 à droite ; courant I sur le fil du haut',
      wires: ['M70 40H310V200H70Z', 'M190 40V200'],
      parts: [{ t: 'E', x: 70, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'I', x: 112, y: 40, d: 'e', l: 'I', lp: 's' },
        { t: 'J', x: 190, y: 88, d: 'v', to: 'n', l: 'I_1', as: 'e' }, { t: 'R', x: 190, y: 155, d: 'v', l: 'R_1' },
        { t: 'U', a: [158, 112], b: [158, 64], l: 'U', lp: 'w' }, { t: 'R', x: 310, y: 120, d: 'v', l: 'R_2' },
        { t: 'dot', x: 190, y: 40 }, { t: 'dot', x: 190, y: 200 }].concat(extra || []) };
  }

  L.push({
    id: 'td1-ex9', exam: null, kind: 'td', order: 9, src: 'TD 1 · Ex 9', official: false,
    title: 'Source de courant et générateur de tension dans le même circuit',
    topics: ['source-courant', 'kirchhoff'], lvl: 2, time: 15,
    intro: '<p>Soit le circuit ci-contre où :</p><ul><li>' + E + ' = 15 V et ' + r('1') + ' = 200 Ω</li><li>' + i('I', '1') + ' = 0,1 A et ' + r('2') + ' = 100 Ω</li></ul>',
    figs: [{ spec: ex9Spec(), cap: 'Figure du TD : la flèche I₁ monte' }],
    questions: ['Donner les expressions, puis les valeurs de ' + U + ' et ' + I],
    hints: [
      'Les trois branches relient les deux mêmes fils : chacune a la tension ' + E + ' à ses bornes. ' + r('2') + ' est donc parcourue par ' + E + '/' + r('2') + '.',
      'La source impose ' + i('I', '1') + ' dans sa branche, donc aussi dans ' + r('1') + '. Regarde le sens de la flèche ' + i('I', '1') + ' pour savoir dans quel sens ' + r('1') + ' est traversée, et donc où est son côté +.',
      'Pour ' + U + ', écris la loi des mailles dans la boucle (' + E + ', source de courant, ' + r('1') + '). Pour ' + I + ', écris la loi des nœuds au nœud du haut.'
    ],
    solution: [
      { t: 'Tension de R₁',
        html: '<p>La source impose ' + i('I', '1') + ' = 0,1 A dans la branche du milieu. La flèche ' + i('I', '1') + ' monte : le courant traverse ' + r('1') + ' de bas en haut. En convention récepteur, la tension de ' + r('1') + ' se flèche vers le bas (côté + en bas) et vaut ' + r('1') + i('I', '1') + ' = 200 × 0,1 = 20 V : le bas de ' + r('1') + ' est 20 V plus haut que son sommet.</p>',
        figs: [{ spec: ex9Spec([{ t: 'U', a: [160, 132], b: [160, 178], l: 'R_1 I_1', lp: 'w' }, { t: 'I', x: 310, y: 66, d: 's', l: 'E/R_2', lp: 'w' }], 'Le circuit avec la tension de R1 fléchée vers le bas et le courant E/R2 dans R2'),
          cap: 'Tension de R₁ en convention récepteur (vers le bas) et courant E/R₂ dans R₂.' }] },
      { t: 'Tension U',
        html: '<p>On parcourt la boucle (' + E + ', source, ' + r('1') + ') en montant dans la branche du milieu puis en redescendant par le générateur : ' + r('1') + ' est traversée contre sa flèche (−' + r('1') + i('I', '1') + '), la source dans le sens de ' + U + ' (+' + U + '), le générateur contre ' + E + ' (−' + E + ').</p>' +
          '<p>−' + r('1') + i('I', '1') + ' + ' + U + ' − ' + E + ' = 0</p>' +
          '<p><span class="f-inline">' + U + ' = ' + E + ' + ' + r('1') + i('I', '1') + ' = 15 + 20 = 35 V</span></p>' +
          '<p>Avec les potentiels (fil du bas à 0 V) : le fil du haut est à ' + E + ' = 15 V, le point entre la source et ' + r('1') + ' à −20 V, d’où ' + U + ' = 15 − (−20) = 35 V.</p>' },
      { t: 'Courant I',
        html: '<p>' + r('2') + ' a ' + E + ' à ses bornes : elle est parcourue par ' + E + '/' + r('2') + ' = 15/100 = 0,15 A vers le bas. Au nœud du haut, ' + I + ' et ' + i('I', '1') + ' arrivent, le courant de ' + r('2') + ' repart :</p>' +
          '<p>' + I + ' + ' + i('I', '1') + ' = ' + E + '/' + r('2') + '</p>' +
          '<p><span class="f-inline">' + I + ' = ' + fr(E, r('2')) + ' − ' + i('I', '1') + ' = 0,15 − 0,1 = 0,05 A</span> (50 mA)</p>' +
          '<p class="sol-note">Bilan de puissance : la source de courant fournit ' + U + i('I', '1') + ' = 3,5 W et le générateur ' + E + I + ' = 0,75 W ; les résistances reçoivent ' + r('1') + i('I', '1') + '² = 2 W et ' + E + '²/' + r('2') + ' = 2,25 W. Total 4,25 W des deux côtés.</p>' }
    ],
    answer: '<p>' + U + ' = ' + E + ' + ' + r('1') + i('I', '1') + ' = 35 V · ' + I + ' = ' + E + '/' + r('2') + ' − ' + i('I', '1') + ' = 0,05 A</p>',
    traps: [
      'Lire la flèche ' + i('I', '1') + ' vers le bas : on trouverait ' + U + ' = ' + E + ' − ' + r('1') + i('I', '1') + ' = −5 V et ' + I + ' = ' + E + '/' + r('2') + ' + ' + i('I', '1') + ' = 0,25 A. Sur la figure du TD, ' + i('I', '1') + ' monte.',
      'Croire que la tension d’une source de courant est nulle, ou égale à ' + E + ' : elle se calcule avec une loi des mailles.',
      'Oublier ' + r('1') + ' : la branche du milieu contient la source et ' + r('1') + ', donc ' + U + ' n’est pas égale à ' + E + '.'
    ]
  });

  /* ================= Ex 10 ================= */
  var Rp = '<var>R′</var>', Up = '<var class="u">U′</var>';
  function ex10Spec(mid, midL, right, rightL, aria) {
    var parts = [{ t: 'E', x: 60, y: 137, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 145, y: 45, l: 'R′', lp: 's' },
      { t: 'U', a: [198, 222], b: [198, 55], l: 'U', lp: 'w' }, { t: 'dot', x: 230, y: 45 }, { t: 'dot', x: 230, y: 230 }];
    var wires = ['M60 45H390V230H60Z', 'M230 45V230'];
    if (!mid) parts.push({ t: 'R', x: 230, y: 100, d: 'v', l: '2R' }, { t: 'R', x: 230, y: 172, d: 'v', l: '2R' });
    else parts.push({ t: 'R', x: 230, y: 137, d: 'v', l: midL, c: 'cz-hl' });
    if (right === 'none') { wires = ['M60 45H230V230H60Z']; parts.splice(3, 2); }
    else if (right) parts.push({ t: 'R', x: 390, y: 137, d: 'v', l: rightL, c: 'cz-hl' });
    else parts.push({ t: 'R', x: 310, y: 45, l: 'R' }, { t: 'R', x: 390, y: 137, d: 'v', l: '2R' }, { t: 'R', x: 310, y: 230, l: '3R' }, { t: 'U', a: [445, 225], b: [445, 50], l: 'U′' });
    return { w: 500, h: 270, aria: aria || 'Générateur E, R′ en série, puis au nœud : 2R et 2R vers le bas, et R, 2R, 3R en chemin vers la droite ; U aux bornes de la branche du milieu, U′ aux bornes de la 2R de droite',
      wires: wires, parts: parts };
  }

  L.push({
    id: 'td1-ex10', exam: null, kind: 'td', order: 10, src: 'TD 1 · Ex 10', official: false,
    title: 'Régler R′ pour obtenir U = E/4',
    topics: ['req', 'diviseurs'], lvl: 2, time: 20,
    intro: '<p>Soit le circuit ci-contre. On veut que ' + U + ' = ' + E + '/4. Donner alors l’expression de :</p>',
    figs: [{ spec: ex10Spec(), cap: 'Figure du TD' }],
    questions: [Rp + ' en fonction de ' + R, Up + ' en fonction de ' + E + '.'],
    hints: [
      'À droite du nœud, deux chemins descendent vers le fil du bas : 2' + R + ' + 2' + R + ' d’un côté, ' + R + ', 2' + R + ' et 3' + R + ' de l’autre. Les coins ne sont pas des nœuds.',
      'Remplace tout ce qui est à droite de ' + Rp + ' par une seule résistance, puis écris ' + U + ' avec un diviseur de tension entre ' + Rp + ' et cette résistance.',
      'Pour ' + Up + ', la branche ' + R + ', 2' + R + ', 3' + R + ' a la tension ' + U + ' à ses bornes : diviseur de tension sur cette branche.'
    ],
    solution: [
      { t: 'Réduction',
        html: '<ol><li>Branche du milieu : 2' + R + ' + 2' + R + ' = 4' + R + '.</li>' +
          '<li>Chemin de droite : ' + R + ', 2' + R + ' et 3' + R + ' sont traversées par le même courant (les coins ne relient que deux fils) : ' + R + ' + 2' + R + ' + 3' + R + ' = 6' + R + '.</li>' +
          '<li>Ces deux branches relient le nœud du haut au fil du bas, en parallèle : 4' + R + ' // 6' + R + ' = 24' + R + '²/(10' + R + ') = 12' + R + '/5.</li></ol>',
        figs: [{ spec: ex10Spec(true, '2R + 2R = 4R', true, '6R', 'Branche du milieu réduite à 4R, chemin de droite réduit à 6R'), cap: 'Étape 1 : 2R + 2R = 4R au milieu ; R + 2R + 3R = 6R à droite.' },
          { spec: ex10Spec(true, '4R // 6R = 12R/5', 'none', '', 'R′ en série avec un seul bloc 12R/5, U aux bornes du bloc'), cap: 'Étape 2 : 4R // 6R = 12R/5, en série avec R′.' }] },
      { t: 'Expression de R′',
        html: '<p>' + Rp + ' est en série avec le bloc 12' + R + '/5, et ' + U + ' est la tension de ce bloc. Diviseur de tension :</p>' +
          '<p><span class="f-inline">' + U + ' = ' + fr('12' + R + '/5', Rp + ' + 12' + R + '/5') + ' ' + E + '</span></p>' +
          '<p>On veut ' + U + ' = ' + E + '/4, donc ' + Rp + ' + 12' + R + '/5 = 4 × 12' + R + '/5, soit ' + Rp + ' = 3 × 12' + R + '/5.</p>' +
          '<p><span class="f-inline">' + Rp + ' = ' + fr('36' + R, '5') + ' = 7,2' + R + '</span></p>' +
          '<p>Raisonnement rapide : ' + U + ' = ' + E + '/4 veut dire que le bloc prend 1/4 de la tension et ' + Rp + ' les 3/4. ' + Rp + ' vaut donc 3 fois le bloc.</p>' },
      { t: 'Expression de U′',
        html: '<p>Le chemin ' + R + ', 2' + R + ', 3' + R + ' (6' + R + ' en tout) a la tension ' + U + ' à ses bornes, et ' + Up + ' est la tension de la 2' + R + ' de droite :</p>' +
          '<p><span class="f-inline">' + Up + ' = ' + fr('2' + R, '6' + R) + ' ' + U + ' = ' + fr(U, '3') + ' = ' + fr(E, '12') + '</span></p>' }
    ],
    answer: '<p>' + Rp + ' = 36' + R + '/5 = 7,2' + R + ' · ' + Up + ' = ' + E + '/12</p>',
    traps: [
      'Mettre 3' + R + ' en parallèle avec la branche du milieu : ' + R + ', 2' + R + ' et 3' + R + ' sont parcourues par le même courant, en série.',
      'Prendre ' + Up + ' pour la tension de tout le chemin de droite : la flèche ' + Up + ' ne couvre que la 2' + R + ' verticale, soit 2/6 de ' + U + '.',
      'Inverser le diviseur : la résistance aux bornes de laquelle on lit ' + U + ' (le bloc 12' + R + '/5) va au numérateur.'
    ]
  });
})();
