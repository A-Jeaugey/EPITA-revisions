/* Exercices d’électronique : partiels nov. 2021 (promo 2026) et oct. 2022 (promo 2027).
   Énoncés verbatim. Corrections conformes aux corrigés officiels, revérifiées par analyse nodale exacte.
   Les QCM de l’exercice 1 de ces deux sujets sont dans data/qcm/elec-p2021-2022.js. */
(function () {
  var L = window.ELEC_EX = window.ELEC_EX || [];

  /* ---------- notations ---------- */
  var R = '<var>R</var>', E = '<var class="u">E</var>', Rp = '<var>R</var>′';
  function u(k) { return '<var class="u">U</var>' + (k ? '<sub>' + k + '</sub>' : ''); }
  function cur(k) { return '<var class="i">I</var>' + (k ? '<sub>' + k + '</sub>' : ''); }
  function rk(k) { return '<var>R</var><sub>' + k + '</sub>'; }
  function fr(n, d) { return '<span class="frac"><span>' + n + '</span><span>' + d + '</span></span>'; }
  var Q_REQ = 'Quelle est la résistance équivalente totale vue depuis les points A et B ? (détaillez votre raisonnement – On imagine que le courant « entre » par le point A et « ressort » en B)';

  /* =====================================================================
     Partiel nov. 2021 · Ex 2 · Q1 : réseau à huit résistances
     Grille : branche du haut y=40, rangée 3R y=105, ligne A–B y=170, rangée du bas y=240.
     Nœuds de la ligne : A x=75, C x=190, D x=320, B x=440 (C et D ne sont pas nommés sur le sujet).
     ===================================================================== */
  function net21(named) {
    var p = [
      { t: 'R', x: 230, y: 40, l: '2R' }, { t: 'R', x: 330, y: 40, l: 'R' },
      { t: 'R', x: 190, y: 105, l: '3R' },
      { t: 'R', x: 132, y: 170, l: '2R' }, { t: 'R', x: 255, y: 170, l: '2R' }, { t: 'R', x: 380, y: 170, l: '4R' },
      { t: 'R', x: 132, y: 240, l: '2R' }, { t: 'R', x: 380, y: 240, l: '4R' },
      { t: 'dot', x: 75, y: 170 }, { t: 'dot', x: 190, y: 170 }, { t: 'dot', x: 320, y: 170 }, { t: 'dot', x: 440, y: 170 },
      { t: 'term', x: 20, y: 170, l: 'A', lp: 'n' }, { t: 'term', x: 470, y: 170, l: 'B', lp: 'n' }];
    if (named) p.push({ t: 'dot', x: 75, y: 105 }, { t: 'txt', x: 190, y: 157, s: 'C', c: 'cz-n' }, { t: 'txt', x: 329, y: 160, s: 'D', c: 'cz-n', a: 'start' });
    return { w: 490, h: 262,
      aria: 'Réseau de résistances entre A et B. Sur la ligne A–B : 2R, un premier nœud, 2R, un deuxième nœud, 4R. Au-dessus : une branche 2R puis R qui va de A à B, et une 3R qui part de A et redescend sur le deuxième nœud. En dessous : une 2R qui part de A et remonte sur le premier nœud, et une 4R du deuxième nœud à B.',
      wires: ['M20 170H470', 'M75 40V240H190V170', 'M75 40H440V240H320V105H75'], parts: p };
  }
  var net21s1 = { w: 490, h: 192, aria: 'Après la première étape : 3R de A à B en haut ; 3R de A à D ; sur la ligne, R de A à C, 2R de C à D, 2R de D à B.',
    wires: ['M20 170H470', 'M75 170V40H440V170', 'M75 105H320V170'],
    parts: [{ t: 'R', x: 257, y: 40, l: '3R', c: 'cz-hl' }, { t: 'R', x: 190, y: 105, l: '3R' },
      { t: 'R', x: 132, y: 170, l: 'R', c: 'cz-hl' }, { t: 'R', x: 255, y: 170, l: '2R' }, { t: 'R', x: 380, y: 170, l: '2R', c: 'cz-hl' },
      { t: 'dot', x: 75, y: 170 }, { t: 'dot', x: 75, y: 105 }, { t: 'dot', x: 320, y: 170 }, { t: 'dot', x: 440, y: 170 },
      { t: 'txt', x: 190, y: 160, s: 'C', c: 'cz-n' }, { t: 'txt', x: 329, y: 160, s: 'D', c: 'cz-n', a: 'start' },
      { t: 'term', x: 20, y: 170, l: 'A', lp: 'n' }, { t: 'term', x: 470, y: 170, l: 'B', lp: 'n' }] };
  var net21s2 = { w: 490, h: 142, aria: 'Après la deuxième étape : 3R de A à B en haut ; sur la ligne, 3R/2 de A à D puis 2R de D à B.',
    wires: ['M20 120H470', 'M75 120V40H440V120'],
    parts: [{ t: 'R', x: 257, y: 40, l: '3R' }, { t: 'R', x: 190, y: 120, l: '3R/2', c: 'cz-hl' }, { t: 'R', x: 380, y: 120, l: '2R' },
      { t: 'dot', x: 75, y: 120 }, { t: 'dot', x: 440, y: 120 }, { t: 'txt', x: 320, y: 110, s: 'D', c: 'cz-n' },
      { t: 'term', x: 20, y: 120, l: 'A', lp: 'n' }, { t: 'term', x: 470, y: 120, l: 'B', lp: 'n' }] };
  var net21s3 = { w: 490, h: 142, aria: 'Dernière étape : deux branches en parallèle entre A et B, 7R/2 et 3R.',
    wires: ['M20 120H470', 'M75 120V40H440V120'],
    parts: [{ t: 'R', x: 257, y: 40, l: '3R' }, { t: 'R', x: 257, y: 120, l: '7R/2', c: 'cz-hl' },
      { t: 'dot', x: 75, y: 120 }, { t: 'dot', x: 440, y: 120 },
      { t: 'term', x: 20, y: 120, l: 'A', lp: 'n' }, { t: 'term', x: 470, y: 120, l: 'B', lp: 'n' }] };

  L.push({
    id: 'p2021-ex2a', exam: 'p2021', kind: 'partiel', order: 2.1,
    src: 'Partiel nov. 2021 · Ex 2 · Q1',
    title: 'Résistance équivalente d’un réseau à huit résistances',
    topics: ['req'], lvl: 2, time: 12,
    figs: [{ spec: net21(false) }],
    questions: ['<b>1.</b> ' + Q_REQ],
    hints: [
      'Donne un nom aux deux nœuds sans nom de la ligne A–B, puis suis chaque fil jusqu’au bout. Où arrive le fil de la 3' + R + ' ? Où remonte celui de la 2' + R + ' du bas ?',
      'Cherche les résistances branchées entre les deux mêmes nœuds : elles sont en parallèle. La branche du haut, elle, va directement de A à B.',
      'Réduis en avançant vers le nœud où arrive la 3' + R + ' : parallèle, série, parallèle. Termine par le parallèle avec la branche du haut.'],
    solution: [
      { t: 'Lire le schéma', html: '<p>Nomme <b>C</b> le nœud entre les deux 2' + R + ' de la ligne A–B et <b>D</b> le nœud suivant, avant le premier 4' + R + '. Puis suis chaque fil jusqu’au bout :</p>' +
        '<ul><li>la 3' + R + ' part de A et son fil redescend sur <b>D</b>, pas sur B ;</li>' +
        '<li>la 2' + R + ' du bas part de A et son fil remonte sur <b>C</b> ;</li>' +
        '<li>la 4' + R + ' du bas part de D et rejoint B par le fil vertical de droite ;</li>' +
        '<li>la branche du haut, 2' + R + ' puis ' + R + ', relie directement A et B.</li></ul>',
        figs: [{ spec: net21(true), cap: 'Le réseau avec ses nœuds nommés' }] },
      { t: 'Étape 1 : les regroupements évidents', html: '<ul>' +
        '<li>Les deux 2' + R + ' relient A et C : elles sont en parallèle. 2' + R + ' // 2' + R + ' = ' + R + ' (deux résistances égales en parallèle : la moitié).</li>' +
        '<li>Les deux 4' + R + ' relient D et B : parallèle. 4' + R + ' // 4' + R + ' = 2' + R + '.</li>' +
        '<li>En haut, 2' + R + ' et ' + R + ' se suivent sans nœud entre elles : série. 2' + R + ' + ' + R + ' = 3' + R + ', branchée de A à B.</li></ul>',
        figs: [{ spec: net21s1, cap: 'Schéma intermédiaire 1 (en couleur, ce qui vient d’être regroupé)' }] },
      { t: 'Étape 2 : de A jusqu’à D', html: '<p>Sur la ligne, ' + R + ' (de A à C) puis 2' + R + ' (de C à D) sont en série : 3' + R + ' de A à D. Cette branche est en parallèle avec la 3' + R + ' qui va, elle aussi, de A à D :</p>' +
        '<p class="f-block">3' + R + ' // 3' + R + ' = ' + fr('3' + R, '2') + '</p>',
        figs: [{ spec: net21s2, cap: 'Schéma intermédiaire 2' }] },
      { t: 'Étape 3 : la série, puis la branche du haut', html: '<p>De A à B par la ligne : 3' + R + '/2 puis 2' + R + ' en série, soit 3' + R + '/2 + 4' + R + '/2 = 7' + R + '/2. Cette branche est en parallèle avec la branche du haut, 3' + R + ' :</p>' +
        '<p class="f-block">' + rk('AB') + ' = ' + fr('(7' + R + '/2) × 3' + R, '7' + R + '/2 + 3' + R) + ' = ' + fr('7' + R + ' × 3' + R, '7' + R + ' + 6' + R) + ' = ' + fr('21' + R + '²', '13' + R) + ' = ' + fr('21', '13') + R + '</p>' +
        '<p>Pour passer de la première fraction à la deuxième, multiplie le haut et le bas par 2. Contrôle : 21' + R + '/13 ≈ 1,6' + R + ' est plus petit que 3' + R + ', la branche du haut seule. C’est normal : ajouter une branche en parallèle fait toujours baisser la résistance.</p>',
        figs: [{ spec: net21s3, cap: 'Schéma intermédiaire 3 : deux branches en parallèle entre A et B' }] }],
    answer: '<p>' + rk('AB') + ' = 21' + R + '/13 ≈ 1,6' + R + '</p>',
    traps: [
      'Croire que la 3' + R + ' va jusqu’à B : son fil redescend sur le nœud D, entre la deuxième 2' + R + ' et le premier 4' + R + '.',
      'Croire que la 2' + R + ' du bas rejoint D : elle remonte sur C, en parallèle avec la première 2' + R + '.',
      'Oublier la branche du haut (2' + R + ' + ' + R + ' = 3' + R + ') : elle relie directement A et B et se met en parallèle avec tout le reste, à la toute fin.',
      'Additionner avant d’avoir regroupé les parallèles, ou se tromper dans 7' + R + '/2 // 3' + R + ' : multiplie le haut et le bas par 2 pour chasser les demis.'],
    official: true
  });

  /* =====================================================================
     Partiel nov. 2021 · Ex 2 · Q2 : trouver R′
     Rectangle x 60 → 350, y 40 → 200 ; branche du milieu en x=220.
     ===================================================================== */
  var src21b = { w: 400, h: 228,
    aria: 'Source E à gauche, flèche vers le haut. En haut, R/3 puis un nœud, puis R jusqu’au coin droit. Du nœud descend une branche R puis R′ jusqu’au fil du bas. Le fil de droite descend sans composant jusqu’au fil du bas.',
    wires: ['M60 40H350V200H60Z', 'M220 40V200'],
    parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' },
      { t: 'R', x: 140, y: 40, l: 'R/3', lp: 's' }, { t: 'R', x: 285, y: 40, l: 'R', lp: 's' },
      { t: 'R', x: 220, y: 88, d: 'v', l: 'R' }, { t: 'R', x: 220, y: 152, d: 'v', l: 'R′' }] };
  var src21b1 = { w: 400, h: 228,
    aria: 'Même circuit redessiné : la R du haut à droite est posée sur le fil vertical de droite, entre le nœud du haut et le fil du bas.',
    wires: ['M60 40H350V200H60Z', 'M220 40V200'],
    parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' },
      { t: 'R', x: 140, y: 40, l: 'R/3', lp: 's' },
      { t: 'R', x: 220, y: 88, d: 'v', l: 'R' }, { t: 'R', x: 220, y: 152, d: 'v', l: 'R′' }, { t: 'R', x: 350, y: 120, d: 'v', l: 'R', c: 'cz-hl' },
      { t: 'dot', x: 220, y: 40 }, { t: 'dot', x: 220, y: 200 }] };
  var src21b2 = { w: 400, h: 228,
    aria: 'R et R′ regroupées en une branche R + R′, en parallèle avec R, le tout en série avec R/3.',
    wires: ['M60 40H350V200H60Z', 'M220 40V200'],
    parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' },
      { t: 'R', x: 140, y: 40, l: 'R/3', lp: 's' },
      { t: 'R', x: 220, y: 120, d: 'v', l: 'R + R′', c: 'cz-hl' }, { t: 'R', x: 350, y: 120, d: 'v', l: 'R' },
      { t: 'dot', x: 220, y: 40 }, { t: 'dot', x: 220, y: 200 }] };

  L.push({
    id: 'p2021-ex2b', exam: 'p2021', kind: 'partiel', order: 2.2,
    src: 'Partiel nov. 2021 · Ex 2 · Q2',
    title: 'Trouver R′ pour que le générateur voie R',
    topics: ['req', 'calcul'], lvl: 2, time: 8,
    figs: [{ spec: src21b }],
    questions: ['<b>2.</b> Soit le circuit ci-contre. Que doit valoir ' + Rp + ' pour que la résistance équivalente vue depuis le générateur ' + E + ' soit égale à ' + R + ' ? Vous donnerez votre réponse en fonction de ' + R + '.'],
    hints: [
      'Suis le fil vertical de droite : où arrive l’autre borne de la ' + R + ' du haut à droite ?',
      'Cette ' + R + ' est en parallèle avec la branche ' + R + ' + ' + Rp + ', et ce bloc est en série avec ' + R + '/3.',
      'Écris ' + rk('eq') + ' en fonction de ' + Rp + ', puis pose ' + rk('eq') + ' = ' + R + ' : le bloc parallèle doit valoir ' + R + ' − ' + R + '/3. Termine par un produit en croix.'],
    solution: [
      { t: 'Lire le schéma', html: '<p>Suis le fil vertical de droite : il descend sans aucun composant jusqu’au fil du bas. La ' + R + ' du haut à droite relie donc le nœud du haut (le point d’où part la branche du milieu) au fil du bas, exactement comme la branche du milieu.</p>' +
        '<ul><li>' + R + ' et ' + Rp + ' se suivent sans nœud entre elles : série, ' + R + ' + ' + Rp + '.</li>' +
        '<li>Cette branche et la ' + R + ' de droite relient les deux mêmes nœuds : parallèle.</li>' +
        '<li>Le tout est en série avec ' + R + '/3, entre les deux bornes de ' + E + '.</li></ul>',
        figs: [{ spec: src21b1, cap: 'Même circuit : la ' + R + ' de droite redessinée sur le fil vertical, les nœuds sont inchangés' }] },
      { t: 'Résistance vue par E', html: '<p class="f-block">' + rk('eq') + ' = ' + fr(R, '3') + ' + ' + fr('(' + R + ' + ' + Rp + ') × ' + R, '(' + R + ' + ' + Rp + ') + ' + R) + ' = ' + fr(R, '3') + ' + ' + fr(R + '(' + R + ' + ' + Rp + ')', '2' + R + ' + ' + Rp) + '</p>',
        figs: [{ spec: src21b2, cap: 'Deux branches en parallèle, en série avec ' + R + '/3' }] },
      { t: 'Imposer une résistance vue égale à R', html: '<p>On veut ' + rk('eq') + ' = ' + R + ' : le bloc parallèle doit valoir ' + R + ' − ' + R + '/3 = 2' + R + '/3.</p>' +
        '<p class="f-block">' + fr(R + '(' + R + ' + ' + Rp + ')', '2' + R + ' + ' + Rp) + ' = ' + fr('2' + R, '3') + '</p>' +
        '<p>Simplifie par ' + R + ' et fais le produit en croix : 3(' + R + ' + ' + Rp + ') = 2(2' + R + ' + ' + Rp + '), soit 3' + R + ' + 3' + Rp + ' = 4' + R + ' + 2' + Rp + '. Donc :</p>' +
        '<p class="f-block"><b>' + Rp + ' = ' + R + '</b></p>' +
        '<p>Contrôle : ' + R + ' + ' + R + ' = 2' + R + ' ; 2' + R + ' // ' + R + ' = 2' + R + '²/(3' + R + ') = 2' + R + '/3 ; 2' + R + '/3 + ' + R + '/3 = ' + R + '. On retrouve bien ' + R + '.</p>' }],
    answer: '<p>' + Rp + ' = ' + R + '</p>',
    traps: [
      'Ne pas voir que la ' + R + ' du haut à droite revient au fil du bas par le fil vertical de droite : elle est en parallèle avec la branche ' + R + ' + ' + Rp + ', pas en série.',
      'Mettre ' + Rp + ' en parallèle avec la ' + R + ' verticale : elles sont dans la même branche, sans nœud entre elles, donc en série.',
      'Oublier ' + R + '/3, en série avec tout le reste.',
      'Se tromper dans le produit en croix : 3(' + R + ' + ' + Rp + ') = 2(2' + R + ' + ' + Rp + ').'],
    official: true
  });

  /* =====================================================================
     Partiel nov. 2021 · Ex 3 : lois de Kirchhoff
     Énoncé : fil gauche x=50, fil droit x=290, rangée du haut y=110 (nœud entre R et 4R en x=165),
     boucle de 2R en y=45, rangée 3R y=185, source E en bas y=250.
     Schémas de correction : même dessin remonté de 40 (pas de boucle 2R).
     ===================================================================== */
  var k21 = { w: 340, h: 308,
    aria: 'En haut, R puis 4R en série, avec 2R au-dessus de 4R, en parallèle avec elle. Au milieu, 3R entre le fil de gauche et le fil de droite. En bas, la source E, fléchée vers la gauche. Flèche U au-dessus de R, vers la gauche. Flèche I vers le bas sur le fil de droite, sous le raccordement de 3R.',
    wires: ['M50 110H290V250H50Z', 'M165 110V45H290V110', 'M50 185H290'],
    parts: [{ t: 'R', x: 105, y: 110, l: 'R', lp: 's' }, { t: 'R', x: 228, y: 110, l: '4R', lp: 's' },
      { t: 'R', x: 228, y: 45, l: '2R' }, { t: 'R', x: 170, y: 185, l: '3R' },
      { t: 'E', x: 170, y: 250, d: 'h', p: 'w', l: 'E', as: 's' },
      { t: 'U', a: [135, 86], b: [70, 86], l: 'U' },
      { t: 'I', x: 290, y: 218, d: 's', l: 'I' }] };
  var k21s1 = { w: 340, h: 268,
    aria: 'Schéma équivalent : en haut R puis 4R/3 en série, au milieu 3R, en bas la source E. Flèche U au-dessus de R, vers la gauche ; flèche I vers le bas sur le fil de droite.',
    wires: ['M50 70H290V210H50Z', 'M50 145H290'],
    parts: [{ t: 'R', x: 105, y: 70, l: 'R', lp: 's' }, { t: 'R', x: 228, y: 70, l: '4R/3', lp: 's', c: 'cz-hl' },
      { t: 'R', x: 170, y: 145, l: '3R' },
      { t: 'E', x: 170, y: 210, d: 'h', p: 'w', l: 'E', as: 's' },
      { t: 'U', a: [135, 46], b: [70, 46], l: 'U' },
      { t: 'I', x: 290, y: 178, d: 's', l: 'I' },
      { t: 'dot', x: 50, y: 145 }, { t: 'dot', x: 290, y: 145 }] };
  var k21s2 = { w: 340, h: 268,
    aria: 'Le générateur E ne voit plus qu’une résistance, R_eq = 21R/16. Tension U_eq fléchée vers la gauche au-dessus de R_eq ; courant I vers le bas sur le fil de droite.',
    wires: ['M50 70H290V210H50Z'],
    parts: [{ t: 'R', x: 170, y: 70, l: 'R_eq = 21R/16', lp: 's', c: 'cz-hl' },
      { t: 'E', x: 170, y: 210, d: 'h', p: 'w', l: 'E', as: 's' },
      { t: 'U', a: [205, 46], b: [135, 46], l: 'U_eq' },
      { t: 'I', x: 290, y: 140, d: 's', l: 'I' }] };

  L.push({
    id: 'p2021-ex3', exam: 'p2021', kind: 'partiel', order: 3,
    src: 'Partiel nov. 2021 · Ex 3',
    title: 'Parallèle, diviseur de tension et courant débité',
    pts: 6, topics: ['kirchhoff', 'req', 'diviseurs'], lvl: 2, time: 15,
    intro: '<p>On considère le circuit ci-contre.</p>',
    figs: [{ spec: k21 }],
    questions: [
      '<b>1. a.</b> Que peut-on dire des résistances 2' + R + ' et 4' + R + ' ?',
      '<b>1. b.</b> Quelle est la résistance équivalente à ces 2 résistances.',
      '<b>1. c.</b> En déduire l’expression de la tension ' + u() + ' en fonction de ' + E + ' et de ' + R + '.',
      '<b>2. a.</b> Quelle est la résistance équivalente vue par le générateur de tension ' + E + ' ?',
      '<b>2. b.</b> En déduire l’expression de l’intensité du courant ' + cur() + ' en fonction de ' + E + ' et de ' + R + '.'],
    hints: [
      'Regarde où arrivent les deux fils de la 2' + R + ' : entre quels points est-elle branchée ? Et la 4' + R + ' ?',
      'La branche du haut (' + R + ' puis le bloc 2' + R + ' // 4' + R + ') est branchée directement aux bornes de la source idéale : sa tension vaut ' + E + ', quoi qu’il y ait à côté. Applique le diviseur de tension sur cette seule branche.',
      'La flèche ' + cur() + ' est sous le raccordement de la 3' + R + ' : c’est tout le courant débité par ' + E + '. Calcule la résistance vue par la source, puis applique la loi d’Ohm.'],
    solution: [
      { t: 'Question 1. a', html: '<p>Le fil de la 2' + R + ' part du point situé entre ' + R + ' et 4' + R + ' et redescend sur le coin en haut à droite. La 4' + R + ' relie ces deux mêmes points. Les deux résistances sont branchées entre les deux mêmes nœuds : elles sont <b>en parallèle</b> (en dérivation).</p>' },
      { t: 'Question 1. b', html: '<p class="f-block">2' + R + ' // 4' + R + ' = ' + fr('2' + R + ' × 4' + R, '2' + R + ' + 4' + R) + ' = ' + fr('8' + R + '²', '6' + R) + ' = ' + fr('4' + R, '3') + '</p>' },
      { t: 'Question 1. c', html: '<p>Remplace les deux résistances par 4' + R + '/3. La branche du haut, ' + R + ' puis 4' + R + '/3 en série, est branchée directement entre les deux bornes de la source idéale : la loi des mailles lui impose la tension ' + E + '. La 3' + R + ', elle aussi aux bornes de ' + E + ', ne change rien à cette tension.</p>' +
        '<p>Diviseur de tension sur la branche du haut :</p>' +
        '<p class="f-block">' + u() + ' = ' + fr(R, R + ' + 4' + R + '/3') + ' · ' + E + ' = ' + fr(R, '7' + R + '/3') + ' · ' + E + ' = ' + fr('3', '7') + E + '</p>' +
        '<p>Signe : ' + u() + ' et ' + E + ' sont fléchées toutes les deux vers la gauche, vers la borne + de la source. Le courant traverse ' + R + ' de gauche à droite, à l’opposé de la flèche ' + u() + ' (convention récepteur) : ' + u() + ' est positive.</p>',
        figs: [{ spec: k21s1, cap: 'Schéma équivalent : 2' + R + ' // 4' + R + ' remplacées par 4' + R + '/3' }] },
      { t: 'Question 2. a', html: '<p>La source voit deux branches en parallèle : la 3' + R + ' et la branche du haut, ' + R + ' + 4' + R + '/3 = 7' + R + '/3.</p>' +
        '<p class="f-block">' + rk('eq') + ' = ' + fr('3' + R + ' × 7' + R + '/3', '3' + R + ' + 7' + R + '/3') + ' = ' + fr('7' + R + '²', '16' + R + '/3') + ' = ' + fr('21', '16') + R + '</p>' +
        '<p>Contrôle : 21' + R + '/16 ≈ 1,3' + R + ', plus petit que 7' + R + '/3 ≈ 2,3' + R + ' et que 3' + R + ', comme tout parallèle.</p>' },
      { t: 'Question 2. b', html: '<p>Avec ' + rk('eq') + ' seule aux bornes de la source, la loi des mailles donne ' + u('eq') + ' = ' + E + ', et la loi d’Ohm ' + u('eq') + ' = ' + rk('eq') + '·' + cur() + ' :</p>' +
        '<p class="f-block">' + cur() + ' = ' + fr(E, rk('eq')) + ' = ' + fr('16', '21') + '·' + fr(E, R) + '</p>' +
        '<p>Contrôle par la loi des nœuds : ' + cur() + ' est la somme des courants des deux branches, ' + E + '/(3' + R + ') + ' + E + '/(7' + R + '/3) = ' + E + '/(3' + R + ') + 3' + E + '/(7' + R + ') = (7' + E + ' + 9' + E + ')/(21' + R + ') = 16' + E + '/(21' + R + ').</p>',
        figs: [{ spec: k21s2, cap: 'Le générateur ne voit plus que ' + rk('eq') }] }],
    answer: '<p><b>1.</b> a. 2' + R + ' et 4' + R + ' sont en parallèle ; b. 2' + R + ' // 4' + R + ' = 4' + R + '/3 ; c. ' + u() + ' = 3' + E + '/7.<br>' +
      '<b>2.</b> a. ' + rk('eq') + ' = 21' + R + '/16 ; b. ' + cur() + ' = 16' + E + '/(21' + R + ').</p>',
    traps: [
      'Mettre la 3' + R + ' dans le diviseur de tension : la source idéale impose ' + E + ' à chaque branche branchée à ses bornes, la 3' + R + ' ne change pas ' + u() + '.',
      'Prendre ' + cur() + ' pour le courant de la 3' + R + ' seule : la flèche est sous le raccordement de la 3' + R + ', c’est le courant total débité par ' + E + '.',
      'Se tromper de signe sur ' + u() + ' : ' + u() + ' et ' + E + ' sont fléchées toutes les deux vers la borne + de la source, donc ' + u() + ' > 0.',
      'Mal réduire ' + R + ' + 4' + R + '/3 : c’est 3' + R + '/3 + 4' + R + '/3 = 7' + R + '/3.'],
    official: true
  });

  /* =====================================================================
     Partiel oct. 2022 · Ex 2 : réseau à huit résistances
     Grille : boucle du haut y=40, ligne A–B y=110, rangée 3R y=180, rangée du bas y=250.
     Nœuds : A x=75, C x=205, D x=322 (fil vertical de D de y=40 à y=250), B x=439.
     Sur le sujet, les jonctions en T de la 3R et de la rangée du bas avec le fil de D n’ont pas de point noir.
     ===================================================================== */
  function net22(named) {
    var p = [
      { t: 'R', x: 140, y: 110, l: '2R', lp: 's' }, { t: 'R', x: 263, y: 110, l: '2R', lp: 's' }, { t: 'R', x: 380, y: 110, l: '4R', lp: 's' },
      { t: 'R', x: 263, y: 40, l: '2R', lp: 's' },
      { t: 'R', x: 200, y: 180, l: '3R', lp: 's' },
      { t: 'R', x: 135, y: 250, l: '2R', lp: 's' }, { t: 'R', x: 215, y: 250, l: 'R', lp: 's' }, { t: 'R', x: 380, y: 250, l: '4R', lp: 's' },
      { t: 'dot', x: 75, y: 110 }, { t: 'dot', x: 205, y: 110 }, { t: 'dot', x: 322, y: 110 }, { t: 'dot', x: 439, y: 110, r: 5 },
      { t: 'term', x: 20, y: 110, l: 'A', lp: 's' }, { t: 'term', x: 470, y: 110, l: 'B', lp: 's' }];
    if (named) p.push({ t: 'dot', x: 75, y: 180 }, { t: 'dot', x: 322, y: 180 }, { t: 'dot', x: 322, y: 250 },
      { t: 'txt', x: 196, y: 100, s: 'C', c: 'cz-n', a: 'end' }, { t: 'txt', x: 331, y: 100, s: 'D', c: 'cz-n', a: 'start' });
    return { w: 490, h: 282,
      aria: 'Réseau de résistances entre A et B. Sur la ligne A–B : 2R, un premier nœud, 2R, un deuxième nœud, 4R. Au-dessus de la deuxième 2R, une autre 2R relie le premier et le deuxième nœud. Un fil vertical passe par le deuxième nœud et descend jusqu’en bas. Une 3R relie A à ce fil vertical. En bas, 2R puis R relient A au pied de ce fil vertical, d’où une 4R remonte vers B.',
      wires: ['M20 110H470', 'M75 110V250H439V110', 'M75 180H322', 'M205 110V40H322V250'], parts: p };
  }
  /* schémas intermédiaires : sans la boucle du haut, tout est remonté de 50 (ligne y=60, 3R y=130, bas y=200) */
  var net22s1 = { w: 490, h: 232, aria: 'Après la première étape : sur la ligne, 2R de A à C, R de C à D, 4R de D à B ; 3R de A à D ; en bas, 3R de A à D, puis 4R de D à B.',
    wires: ['M20 60H470', 'M75 60V200H439V60', 'M75 130H322', 'M322 60V200'],
    parts: [{ t: 'R', x: 140, y: 60, l: '2R', lp: 's' }, { t: 'R', x: 263, y: 60, l: 'R', lp: 's', c: 'cz-hl' }, { t: 'R', x: 380, y: 60, l: '4R', lp: 's' },
      { t: 'R', x: 200, y: 130, l: '3R', lp: 's' },
      { t: 'R', x: 200, y: 200, l: '3R', lp: 's', c: 'cz-hl' }, { t: 'R', x: 380, y: 200, l: '4R', lp: 's' },
      { t: 'dot', x: 75, y: 60 }, { t: 'dot', x: 322, y: 60 }, { t: 'dot', x: 439, y: 60 },
      { t: 'dot', x: 75, y: 130 }, { t: 'dot', x: 322, y: 130 }, { t: 'dot', x: 322, y: 200 },
      { t: 'txt', x: 205, y: 50, s: 'C', c: 'cz-n' }, { t: 'txt', x: 331, y: 50, s: 'D', c: 'cz-n', a: 'start' },
      { t: 'term', x: 20, y: 60, l: 'A', lp: 's' }, { t: 'term', x: 470, y: 60, l: 'B', lp: 's' }] };
  var net22s2 = { w: 490, h: 232, aria: 'Après la deuxième étape : trois résistances 3R en parallèle entre A et D, deux 4R en parallèle entre D et B.',
    wires: ['M20 60H470', 'M75 60V200H439V60', 'M75 130H322', 'M322 60V200'],
    parts: [{ t: 'R', x: 200, y: 60, l: '3R', lp: 's', c: 'cz-hl' }, { t: 'R', x: 380, y: 60, l: '4R', lp: 's' },
      { t: 'R', x: 200, y: 130, l: '3R', lp: 's' },
      { t: 'R', x: 200, y: 200, l: '3R', lp: 's' }, { t: 'R', x: 380, y: 200, l: '4R', lp: 's' },
      { t: 'dot', x: 75, y: 60 }, { t: 'dot', x: 322, y: 60 }, { t: 'dot', x: 439, y: 60 },
      { t: 'dot', x: 75, y: 130 }, { t: 'dot', x: 322, y: 130 }, { t: 'dot', x: 322, y: 200 },
      { t: 'txt', x: 331, y: 50, s: 'D', c: 'cz-n', a: 'start' },
      { t: 'term', x: 20, y: 60, l: 'A', lp: 's' }, { t: 'term', x: 470, y: 60, l: 'B', lp: 's' }] };
  var net22s3 = { w: 490, h: 100, aria: 'Dernière étape : R de A à D, puis 2R de D à B, en série.',
    wires: ['M20 50H470'],
    parts: [{ t: 'R', x: 200, y: 50, l: 'R', lp: 's', c: 'cz-hl' }, { t: 'R', x: 380, y: 50, l: '2R', lp: 's', c: 'cz-hl' },
      { t: 'txt', x: 322, y: 40, s: 'D', c: 'cz-n' },
      { t: 'term', x: 20, y: 50, l: 'A', lp: 's' }, { t: 'term', x: 470, y: 50, l: 'B', lp: 's' }] };

  L.push({
    id: 'p2022-ex2', exam: 'p2022', kind: 'partiel', order: 2,
    src: 'Partiel oct. 2022 · Ex 2',
    title: 'Résistance équivalente : trois chemins vers le nœud central',
    pts: 6, topics: ['req'], lvl: 2, time: 10,
    figs: [{ spec: net22(false) }],
    questions: [Q_REQ],
    hints: [
      'Nomme C le nœud entre les deux premières 2' + R + ' de la ligne et D le nœud suivant. Une jonction en T sans point noir est quand même une connexion : à quel nœud arrivent la 3' + R + ' et la branche du bas ?',
      'La 2' + R + ' du haut relie C et D, comme la 2' + R + ' juste en dessous. Les deux 4' + R + ' relient D et B.',
      'Entre A et D, tu dois finir avec plusieurs branches de même valeur : <var>n</var> résistances égales en parallèle valent la valeur d’une seule divisée par <var>n</var>.'],
    solution: [
      { t: 'Lire le schéma', html: '<p>Nomme <b>C</b> le nœud entre la première et la deuxième 2' + R + ' de la ligne A–B, et <b>D</b> le nœud suivant, avant le premier 4' + R + '. Le fil vertical qui passe par D descend jusqu’à la rangée du bas. Les jonctions en T sans point noir sont bien des connexions :</p>' +
        '<ul><li>la 2' + R + ' du haut part de C et redescend sur D ;</li>' +
        '<li>la 3' + R + ' va de A au fil vertical de D ;</li>' +
        '<li>la branche du bas, 2' + R + ' puis ' + R + ', va de A au pied du fil vertical de D ;</li>' +
        '<li>la 4' + R + ' du bas part de ce même point, donc de D, et remonte sur B.</li></ul>',
        figs: [{ spec: net22(true), cap: 'Le réseau avec ses nœuds nommés (points ajoutés sur les jonctions en T)' }] },
      { t: 'Étape 1 : un parallèle et une série', html: '<ul>' +
        '<li>Les deux 2' + R + ' entre C et D sont en parallèle : 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
        '<li>En bas, 2' + R + ' et ' + R + ' se suivent sans nœud entre elles : série, 2' + R + ' + ' + R + ' = 3' + R + '.</li></ul>' +
        '<p>Entre A et D, il y a maintenant trois chemins : 2' + R + ' puis ' + R + ' par la ligne, la 3' + R + ' du milieu et la 3' + R + ' du bas.</p>',
        figs: [{ spec: net22s1, cap: 'Schéma intermédiaire 1 (en couleur, ce qui vient d’être regroupé)' }] },
      { t: 'Étape 2 : trois branches de 3R', html: '<p>Sur la ligne, 2' + R + ' (de A à C) puis ' + R + ' (de C à D) sont en série : 3' + R + '. Il y a donc trois branches de 3' + R + ' en parallèle entre A et D :</p>' +
        '<p class="f-block">3' + R + ' // 3' + R + ' // 3' + R + ' = ' + fr('3' + R, '3') + ' = ' + R + '</p>' +
        '<p><var>n</var> résistances égales en parallèle : la valeur d’une seule divisée par <var>n</var>.</p>',
        figs: [{ spec: net22s2, cap: 'Schéma intermédiaire 2 : trois 3' + R + ' entre A et D, deux 4' + R + ' entre D et B' }] },
      { t: 'Étape 3 : la fin', html: '<p>Les deux 4' + R + ' entre D et B sont en parallèle : 4' + R + ' // 4' + R + ' = 2' + R + '. Il reste ' + R + ' (de A à D) puis 2' + R + ' (de D à B), en série :</p>' +
        '<p class="f-block">' + rk('AB') + ' = ' + R + ' + 2' + R + ' = 3' + R + '</p>',
        figs: [{ spec: net22s3, cap: 'Schéma intermédiaire 3' }] }],
    answer: '<p>' + rk('AB') + ' = 3' + R + '</p>',
    traps: [
      'Ne pas voir que les jonctions en T sans point noir, au bout de la 3' + R + ' et au bout de la branche du bas, sont reliées au nœud D.',
      'Croire que la 2' + R + ' du haut est en parallèle avec la première 2' + R + ' (de A à C) : elle relie C et D.',
      'Traiter 2' + R + ' et ' + R + ' du bas comme un parallèle : aucun nœud entre elles, c’est une série.',
      'Oublier que trois résistances égales de 3' + R + ' en parallèle valent 3' + R + '/3 = ' + R + '.'],
    official: true
  });

  /* =====================================================================
     Partiel oct. 2022 · Ex 3 : généralités et lois de Kirchhoff
     Rails y=60 (haut) et y=225 (bas). Verticales : E x=60, A/G x=120, B/F x=270, C/D x=440, R7 x=500.
     o.node : nœud D = F surligné ; o.mesh : maille B → C → D → F → B surlignée ;
     o.extra : flèches ajoutées par le corrigé officiel (I2, U4, I4, I8).
     ===================================================================== */
  function circ22(o) {
    o = o || {};
    var hm = o.mesh ? 'cz-hl' : '';
    var w = ['M60 60H500V225H60Z', 'M120 60V225', 'M270 60V225', 'M440 60V225'];
    if (o.node) w.push({ d: 'M270 153V225H500V173M440 173V225', c: 'cz-hl' });
    if (o.mesh) w.push({ d: 'M270 60H500V225H270Z', c: 'cz-hl' });
    var p = [
      { t: 'E', x: 60, y: 142, d: 'v', p: 'n', l: 'E', as: 'w' },
      { t: 'R', x: 120, y: 142, d: 'v', l: 'R_2', lp: 'e' },
      { t: 'R', x: 190, y: 60, l: 'R_1' },
      { t: 'R', x: 270, y: 130, d: 'v', l: 'R_3', lp: 'w', c: hm },
      { t: 'R', x: 352, y: 60, l: 'R_5', lp: 's', c: hm },
      { t: 'R', x: 440, y: 150, d: 'v', l: 'R_6', lp: 'w' },
      { t: 'R', x: 500, y: 150, d: 'v', l: 'R_7', lp: 'e', c: hm },
      { t: 'R', x: 195, y: 225, l: 'R_4', lp: 's' },
      { t: 'I', x: 236, y: 60, d: 'e', l: 'I_1' },
      { t: 'U', a: [218, 84], b: [158, 84], l: 'U_1', lp: 's' },
      { t: 'I', x: 270, y: 190, d: 's', l: 'I_3', lp: 'w' },
      { t: 'U', a: [302, 175], b: [302, 95], l: 'U_3' },
      { t: 'U', a: [312, 36], b: [392, 36], l: 'U_5' },
      { t: 'I', x: 408, y: 60, d: 'w', l: 'I_5', lp: 's' },
      { t: 'I', x: 440, y: 86, d: 's', l: 'I_6' },
      { t: 'U', a: [548, 85], b: [548, 215], l: 'U_7' },
      { t: 'I', x: 470, y: 225, d: 'e', l: 'I_7' },
      { t: 'dot', x: 60, y: 60 }, { t: 'dot', x: 120, y: 60 }, { t: 'dot', x: 270, y: 60 }, { t: 'dot', x: 440, y: 60 },
      { t: 'dot', x: 120, y: 225 }, { t: 'dot', x: 270, y: 225 }, { t: 'dot', x: 440, y: 225 },
      { t: 'txt', x: 120, y: 46, s: 'A', c: 'cz-n' }, { t: 'txt', x: 270, y: 46, s: 'B', c: 'cz-n' }, { t: 'txt', x: 440, y: 46, s: 'C', c: 'cz-n' },
      { t: 'txt', x: 120, y: 248, s: 'G', c: 'cz-n' }, { t: 'txt', x: 270, y: 248, s: 'F', c: 'cz-n' }, { t: 'txt', x: 440, y: 248, s: 'D', c: 'cz-n' }];
    if (o.extra) p.push(
      { t: 'I', x: 120, y: 195, d: 's', l: 'I_2', lp: 'e' },
      { t: 'U', a: [165, 203], b: [225, 203], l: 'U_4' },
      { t: 'I', x: 243, y: 225, d: 'w', l: 'I_4', lp: 's' },
      { t: 'I', x: 355, y: 225, d: 'w', l: 'I_8' });
    return { w: 590, h: 262,
      aria: 'Circuit entre deux rails. Branches verticales, de gauche à droite : la source E (flèche vers le haut), R2 entre A et G, R3 entre B et F, R6 entre C et D, R7 tout à droite. Sur le rail du haut : R1 entre A et B, R5 entre B et C. Sur le rail du bas : R4 entre G et F, puis un simple fil de F à D. Flèches : I1 vers B, U1 vers A, I3 vers le bas, U3 vers B, U5 vers C, I5 vers B, I6 vers le bas, U7 vers le bas, I7 vers la droite sous R7.' +
        (o.extra ? ' Flèches ajoutées : I2 vers le bas dans R2, U4 vers F, I4 de F vers G, I8 de D vers F.' : ''),
      wires: w, parts: p };
  }

  L.push({
    id: 'p2022-ex3', exam: 'p2022', kind: 'partiel', order: 3,
    src: 'Partiel oct. 2022 · Ex 3',
    title: 'Nœuds, mailles et lois de Kirchhoff avec des flèches imposées',
    pts: 9, topics: ['vocabulaire', 'kirchhoff', 'potentiels'], lvl: 3, time: 25,
    intro: '<p>On considère le circuit ci-contre.</p><p>On donne :</p><ul>' +
      '<li>' + u('1') + ' = 5 V ; ' + u('3') + ' = 5 V ; ' + u('7') + ' = −2,5 V</li>' +
      '<li>' + E + ' = 15 V ; ' + rk('1') + ' = 500 Ω ; ' + rk('2') + ' = 1 kΩ ; ' + rk('3') + ' = 1 kΩ</li></ul>',
    figs: [{ spec: circ22() }],
    questions: [
      '<b>1.</b> Dans ce circuit, combien y-a-t-il de : <b>a.</b> Nœuds ? <b>b.</b> Branches ? <b>c.</b> Mailles ?',
      '<b>2.</b> Donner l’expression, puis la valeur numérique de ' + u('5') + ' ?',
      '<b>3.</b> Donner l’expression, puis la valeur numérique de ' + cur('5') + ' ?',
      '<b>4.</b> En déduire la valeur de ' + rk('5') + '.',
      '<b>5.</b> Flécher et déterminer la valeur du courant dans ' + rk('2') + '.',
      '<b>6.</b> Que vaut ' + rk('4') + ' ?'],
    hints: [
      'Avant de compter, colorie chaque nœud : un fil sans composant ne sépare jamais deux nœuds. Regarde bien le fil entre F et D. Pour les mailles, le corrigé compte tous les tours fermés, pas seulement les « fenêtres » du dessin.',
      'Pour ' + u('5') + ', fais le tour B → C → D → F → B : tu connais ' + u('3') + ' et ' + u('7') + '. Pour ' + cur('5') + ', écris la loi des nœuds en B en lisant le sens des flèches, puis la loi d’Ohm dans ' + rk('1') + ' et ' + rk('3') + ' (flèches de tension et de courant opposées : convention récepteur).',
      'Quelle tension la source impose-t-elle à ' + rk('2') + ' ? Pour ' + rk('4') + ', trouve sa tension par la maille A → B → F → G → A, et son courant en remarquant que seules ' + rk('1') + ' et ' + rk('4') + ' relient la partie gauche du circuit (A et G) à la partie droite.'],
    solution: [
      { t: 'Question 1 : nœuds, branches, mailles', html: '<p><b>a. 5 nœuds</b> : A, B, C, G, et D confondu avec F. Le fil qui relie F à D ne contient aucun composant : F et D sont le même point électrique. Le point noir du coin en haut à gauche est relié à A par un simple fil, c’est encore A. Les deux coins de droite ne sont que des coudes.</p>' +
        '<p><b>b. 8 branches</b> : ' + E + ' et ' + rk('2') + ' (de A à G), ' + rk('1') + ' (A–B), ' + rk('3') + ' (B–DF), ' + rk('5') + ' (B–C), ' + rk('6') + ' et ' + rk('7') + ' (C–DF), ' + rk('4') + ' (G–DF).</p>' +
        '<p><b>c. 10 mailles</b> : le corrigé compte tous les tours fermés qui ne repassent pas deux fois par le même nœud.</p>' +
        '<ul><li>deux tours de 2 branches : {' + E + ', ' + rk('2') + '} et {' + rk('6') + ', ' + rk('7') + '} ;</li>' +
        '<li>deux tours de 3 branches : {' + rk('3') + ', ' + rk('5') + ', ' + rk('6') + '} et {' + rk('3') + ', ' + rk('5') + ', ' + rk('7') + '} ;</li>' +
        '<li>deux tours de 4 branches : {' + E + ', ' + rk('1') + ', ' + rk('3') + ', ' + rk('4') + '} et {' + rk('2') + ', ' + rk('1') + ', ' + rk('3') + ', ' + rk('4') + '} ;</li>' +
        '<li>quatre tours de 5 branches : (' + E + ' ou ' + rk('2') + '), ' + rk('1') + ', ' + rk('5') + ', (' + rk('6') + ' ou ' + rk('7') + '), ' + rk('4') + '.</li></ul>' +
        '<p>Parmi ces 10 mailles, seules 8 − 5 + 1 = <b>4 sont indépendantes</b> : les quatre « fenêtres » du dessin, {' + E + ', ' + rk('2') + '}, {' + rk('2') + ', ' + rk('1') + ', ' + rk('3') + ', ' + rk('4') + '}, {' + rk('3') + ', ' + rk('5') + ', ' + rk('6') + '} et {' + rk('6') + ', ' + rk('7') + '}. Les autres s’obtiennent en les recollant. Le corrigé officiel attend 10 : à l’examen, écris « 10 mailles, dont 4 indépendantes ».</p>',
        figs: [{ spec: circ22({ node: true }), cap: 'En couleur, le nœud D = F : un seul nœud, malgré ses deux noms' }] },
      { t: 'Question 2 : U5', html: '<p>Fais le tour de la maille B → C → D → F → B, par ' + rk('5') + ', ' + rk('7') + ', le fil D–F, puis ' + rk('3') + '. Une flèche dans le sens du parcours compte +, contre le parcours −.</p>' +
        '<ul><li>de B vers C, ' + u('5') + ' pointe vers C, dans ton sens : + ' + u('5') + ' ;</li>' +
        '<li>de C vers D en descendant dans ' + rk('7') + ', ' + u('7') + ' pointe vers le bas, dans ton sens : + ' + u('7') + ' ;</li>' +
        '<li>de D vers F, simple fil : 0 ;</li>' +
        '<li>de F vers B en montant dans ' + rk('3') + ', ' + u('3') + ' pointe vers B, dans ton sens : + ' + u('3') + '.</li></ul>' +
        '<p class="f-block">' + u('5') + ' + ' + u('7') + ' + ' + u('3') + ' = 0 ⇒ <b>' + u('5') + ' = −' + u('3') + ' − ' + u('7') + '</b> = −5 − (−2,5) = <b>−2,5 V</b></p>' +
        '<p>Avec les potentiels : ' + u('3') + ' + ' + u('5') + ' + ' + u('7') + ' = (<var class="v">V</var><sub>B</sub> − <var class="v">V</var><sub>F</sub>) + (<var class="v">V</var><sub>C</sub> − <var class="v">V</var><sub>B</sub>) + (<var class="v">V</var><sub>D</sub> − <var class="v">V</var><sub>C</sub>) = <var class="v">V</var><sub>D</sub> − <var class="v">V</var><sub>F</sub> = 0.</p>',
        figs: [{ spec: circ22({ mesh: true }), cap: 'La maille B → C → D → F → B' }] },
      { t: 'Question 3 : I5', html: '<p>Loi des nœuds en B : ' + cur('1') + ' arrive de A, ' + cur('5') + ' arrive de C (sa flèche pointe vers B), ' + cur('3') + ' repart vers F.</p>' +
        '<p class="f-block">' + cur('1') + ' + ' + cur('5') + ' = ' + cur('3') + ' ⇒ ' + cur('5') + ' = ' + cur('3') + ' − ' + cur('1') + '</p>' +
        '<p>' + rk('1') + ' et ' + rk('3') + ' sont en convention récepteur (flèches de tension et de courant opposées) : ' + cur('1') + ' = ' + u('1') + '/' + rk('1') + ' = 5/500 = 10 mA et ' + cur('3') + ' = ' + u('3') + '/' + rk('3') + ' = 5/1000 = 5 mA.</p>' +
        '<p class="f-block"><b>' + cur('5') + ' = ' + fr(u('3'), rk('3')) + ' − ' + fr(u('1'), rk('1')) + '</b> = 5 − 10 = <b>−5 mA</b></p>' +
        '<p>Le signe moins dit que le vrai courant dans ' + rk('5') + ' circule de B vers C.</p>' },
      { t: 'Question 4 : R5', html: '<p>' + u('5') + ' pointe vers la droite et ' + cur('5') + ' vers la gauche : flèches opposées, convention récepteur, donc ' + u('5') + '&nbsp;=&nbsp;' + rk('5') + '·' + cur('5') + '.</p>' +
        '<p class="f-block">' + rk('5') + ' = ' + fr(u('5'), cur('5')) + ' = ' + fr('−2,5', '−5·10<sup>−3</sup>') + ' = <b>500 Ω</b></p>' +
        '<p>Les deux signes moins se compensent. Une résistance est toujours positive : c’est un bon contrôle.</p>' },
      { t: 'Question 5 : courant dans R2', html: '<p>' + rk('2') + ' est branchée entre A et G, comme la source : elle est en parallèle avec elle et sa tension vaut ' + E + '. Flèche le courant ' + cur('2') + ' dans ' + rk('2') + ' de A vers G (vers le bas) : il est opposé à la flèche de tension ' + E + ', c’est la convention récepteur.</p>' +
        '<p class="f-block"><b>' + cur('2') + ' = ' + fr(E, rk('2')) + '</b> = ' + fr('15', '1000') + ' = <b>15 mA</b></p>' },
      { t: 'Question 6 : R4', html: '<p>Flèche ' + u('4') + ' au-dessus de ' + rk('4') + ' vers F, le courant ' + cur('4') + ' dans ' + rk('4') + ' de F vers G (convention récepteur), et ' + cur('8') + ' dans le fil de D vers F.</p>' +
        '<ul><li>Maille A → B → F → G → A : ' + E + ' = ' + u('1') + ' + ' + u('3') + ' + ' + u('4') + ', donc ' + u('4') + ' = ' + E + ' − ' + u('1') + ' − ' + u('3') + ' = 15 − 5 − 5 = 5 V.</li>' +
        '<li>Nœud C : ' + cur('7') + ' = ' + cur('5') + ' + ' + cur('6') + '. Nœud D : ' + cur('6') + ' = ' + cur('7') + ' + ' + cur('8') + '. Donc ' + cur('8') + ' = −' + cur('5') + ' = 5 mA.</li>' +
        '<li>Nœud F : ' + cur('4') + ' = ' + cur('3') + ' + ' + cur('8') + ' = ' + cur('3') + ' − ' + cur('5') + ' = 5 + 5 = 10 mA.</li></ul>' +
        '<p class="f-block"><b>' + rk('4') + ' = ' + fr(u('4'), cur('4')) + ' = ' + fr(E + ' − ' + u('1') + ' − ' + u('3'), cur('3') + ' − ' + cur('5')) + '</b> = ' + fr('5', '10·10<sup>−3</sup>') + ' = <b>500 Ω</b></p>' +
        '<p>Raccourci : la partie droite (B, C, D, F) n’est reliée à la partie gauche (A, G) que par ' + rk('1') + ' et ' + rk('4') + '. Tout le courant qui part par ' + rk('1') + ' revient par ' + rk('4') + ' : ' + cur('4') + ' = ' + cur('1') + ' = 10 mA, directement.</p>',
        figs: [{ spec: circ22({ extra: true }), cap: 'Flèches ajoutées pour la correction : ' + cur('2') + ' (question 5), ' + u('4') + ', ' + cur('4') + ' et ' + cur('8') + ' (question 6)' }] }],
    answer: '<p><b>1.</b> 5 nœuds, 8 branches, 10 mailles (dont 4 indépendantes).<br>' +
      '<b>2.</b> ' + u('5') + ' = −' + u('3') + ' − ' + u('7') + ' = −2,5 V.<br>' +
      '<b>3.</b> ' + cur('5') + ' = ' + u('3') + '/' + rk('3') + ' − ' + u('1') + '/' + rk('1') + ' = −5 mA.<br>' +
      '<b>4.</b> ' + rk('5') + ' = ' + u('5') + '/' + cur('5') + ' = 500 Ω.<br>' +
      '<b>5.</b> ' + cur('2') + ' = ' + E + '/' + rk('2') + ' = 15 mA, fléché de A vers G.<br>' +
      '<b>6.</b> ' + rk('4') + ' = (' + E + ' − ' + u('1') + ' − ' + u('3') + ')/(' + cur('3') + ' − ' + cur('5') + ') = 500 Ω.</p>',
    traps: [
      'Compter D et F comme deux nœuds (6 au lieu de 5) : le fil qui les relie ne contient aucun composant.',
      'Répondre 4 mailles : c’est le nombre de mailles indépendantes (branches − nœuds + 1). Le corrigé attend toutes les mailles, soit 10.',
      'Écrire la loi des mailles sans regarder le sens de chaque flèche, ou oublier que ' + u('7') + ' est négative.',
      'Écrire la loi des nœuds en B sans lire les flèches : ' + cur('1') + ' et ' + cur('5') + ' arrivent en B, ' + cur('3') + ' en repart.',
      'Trouver ' + rk('5') + ' &lt; 0 : ' + u('5') + ' et ' + cur('5') + ' sont fléchées en convention récepteur et toutes deux négatives, leur quotient est positif.',
      'Ne pas voir que ' + rk('2') + ' est directement aux bornes de la source, ou chercher ' + cur('4') + ' par un long système alors que ' + cur('4') + ' = ' + cur('1') + '.'],
    official: true
  });
})();
