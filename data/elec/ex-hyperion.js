/* Exercices d’électronique : anciens TD d’EPITA S1 archivés sur HyperAnnales
   (TD 1 à 3, étude dirigée n° 1, partiel de janvier 2018). Courant continu uniquement.
   Les corrigés archivés des TD et de l’ED sont des notes manuscrites d’étudiant : corrections rédigées et vérifiées par calcul.
   Le partiel a un corrigé officiel (juste), suivi ici. */
(function () {
  var L = window.ELEC_EX = window.ELEC_EX || [];
  var P = 'assets/img/elec/hyp/';
  function sb(s) { return s === undefined || s === '' ? '' : '<sub>' + s + '</sub>'; }
  function R(s) { return '<var>R</var>' + sb(s); }
  function E(s) { return '<var class="u">E</var>' + sb(s); }
  function U(s) { return '<var class="u">U</var>' + sb(s); }
  function I(s) { return '<var class="i">I</var>' + sb(s); }
  function V(s) { return '<var class="v">V</var>' + sb(s); }
  function F(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function img(n, alt, cap) { return { img: P + n + '.png', alt: alt, cap: cap }; }

  /* Modèles équivalents chargés (même gabarit que le cours 3).
     o.dx décale tout vers la droite (place pour une étiquette de source longue), o.a / o.b nomment les bornes,
     o.u nomme la flèche de tension, o.i ajoute une flèche de courant avant la charge. */
  function thevLoad(e, r, load, o) {
    o = o || {};
    var d = o.dx || 0, a = o.a === undefined ? 'A' : o.a, b = o.b === undefined ? 'B' : o.b, u = o.u || 'U';
    var x1 = 50 + d, x2 = 145 + d, x3 = 240 + d;
    var parts = [{ t: 'E', x: x1, y: 110, d: 'v', p: 'n', l: e }, { t: 'R', x: x2, y: 40, l: r }, { t: 'dot', x: x3, y: 40 }, { t: 'dot', x: x3, y: 180 }];
    if (a) parts.push({ t: 'txt', x: x3, y: 26, s: a, c: 'cz-n' });
    if (b) parts.push({ t: 'txt', x: x3, y: 204, s: b, c: 'cz-n' });
    if (load) parts.push({ t: 'R', x: x3, y: 110, d: 'v', l: load, lp: 'w' }, { t: 'U', a: [x3 + 38, 165], b: [x3 + 38, 55], l: u });
    else parts.push({ t: 'U', a: [x3 + 22, 165], b: [x3 + 22, 55], l: u });
    if (o.i) parts.push({ t: 'I', x: x3 - 35, y: 40, d: 'e', l: o.i });
    return { w: (o.w || 330) + d, h: 215, aria: o.aria || 'Générateur de Thévenin équivalent' + (load ? ' chargé' : ''),
      wires: load ? ['M' + x1 + ' 40H' + x3 + 'V180H' + x1 + 'Z'] : ['M' + x1 + ' 40H' + x3, 'M' + x1 + ' 180H' + x3, 'M' + x1 + ' 40V180'], parts: parts };
  }
  function nortLoad(i, r, load, o) {
    o = o || {};
    var d = o.dx || 0, a = o.a === undefined ? 'A' : o.a, b = o.b === undefined ? 'B' : o.b, u = o.u || 'U';
    var x1 = 50 + d, x2 = 145 + d, x3 = 240 + d;
    var parts = [{ t: 'J', x: x1, y: 110, d: 'v', to: 'n', l: i, as: 'e' }, { t: 'R', x: x2, y: 110, d: 'v', l: r },
      { t: 'dot', x: x2, y: 40 }, { t: 'dot', x: x2, y: 180 }, { t: 'R', x: x3, y: 110, d: 'v', l: load, lp: 'w' },
      { t: 'U', a: [x3 + 38, 165], b: [x3 + 38, 55], l: u }];
    if (a) parts.push({ t: 'txt', x: x3, y: 26, s: a, c: 'cz-n' });
    if (b) parts.push({ t: 'txt', x: x3, y: 204, s: b, c: 'cz-n' });
    if (o.i) parts.push({ t: 'I', x: x3 - 35, y: 40, d: 'e', l: o.i });
    return { w: (o.w || 330) + d, h: 215, aria: o.aria || 'Générateur de Norton équivalent chargé',
      wires: ['M' + x1 + ' 40H' + x3 + 'V180H' + x1 + 'Z', 'M' + x2 + ' 40V180'], parts: parts };
  }
  var UV = '<var class="u">V</var>';   /* tension nommée V dans certains énoncés (ce n’est pas un potentiel) */
  var Rp = '<var>R′</var>', Up = '<var class="u">U′</var>', Upp = '<var class="u">U″</var>';

  /* =====================================================================
     TD 1 : associations de résistances
     ===================================================================== */
  var td1q = 'Déterminer la résistance vue depuis les points A et B.';

  L.push({
    id: 'hyp-td1-ex1a', exam: null, kind: 'archive', order: 111,
    src: 'Ancien TD 1 · Ex 1 · a)', title: 'Résistance vue de A et B : deux chemins depuis le même nœud',
    topics: ['req'], lvl: 1, time: 5,
    figs: [img('hyp_td1_ex1_fig1', 'Réseau a) : R entre A et un nœud ; de ce nœud, 2R puis 2R descendent vers le fil de B, et R, 2R, 3R en série font le tour par la droite jusqu’au fil de B', 'Réseau a)')],
    questions: ['<b>a)</b> ' + td1q],
    hints: ['A n’est relié qu’à la première résistance <var>R</var>. Appelle C le nœud où elle arrive : tout le reste est entre C et le fil de B.',
      'Depuis C, compte les chemins qui rejoignent le fil de B. Additionne les résistances de chaque chemin (série), puis mets les chemins en parallèle.'],
    solution: [
      { t: 'Repérer les chemins', html: '<p>Appelle C le nœud en haut, entre la première <var>R</var> et la branche verticale. Depuis C, deux chemins rejoignent le fil du bas, qui est relié à B :</p><ul><li>la branche du milieu : 2' + R() + ' + 2' + R() + ' = 4' + R() + ' (série) ;</li><li>le tour par la droite : ' + R() + ' + 2' + R() + ' + 3' + R() + ' = 6' + R() + ' (série : un seul fil, aucune dérivation).</li></ul>',
        figs: [{ spec: { w: 340, h: 200, aria: 'R entre A et C, puis 4R et 6R en parallèle entre C et le fil de B', wires: ['M40 40H280V160H40', 'M180 40V160'],
          parts: [{ t: 'R', x: 110, y: 40, l: 'R' }, { t: 'R', x: 180, y: 100, d: 'v', l: '4R' }, { t: 'R', x: 280, y: 100, d: 'v', l: '6R' },
            { t: 'term', x: 40, y: 40, l: 'A', lp: 'w' }, { t: 'term', x: 40, y: 160, l: 'B', lp: 'w' }, { t: 'dot', x: 180, y: 40 }, { t: 'dot', x: 180, y: 160 }, { t: 'txt', x: 180, y: 28, s: 'C', c: 'cz-n' }] },
          cap: 'Réseau a) redessiné' }] },
      { t: 'Associer', html: '<p>Les deux chemins sont en parallèle entre C et B :</p><p>4' + R() + ' // 6' + R() + ' = ' + F('4' + R() + ' × 6' + R(), '4' + R() + ' + 6' + R()) + ' = ' + F('24' + R() + '²', '10' + R()) + ' = ' + F('12' + R(), '5') + '.</p><p>Puis la première ' + R() + ' est en série : ' + R('AB') + ' = ' + R() + ' + ' + F('12' + R(), '5') + ' = ' + F('17' + R(), '5') + ' = 3,4' + R() + '.</p>' }
    ],
    answer: '<p>' + R('AB') + ' = 17' + R() + '/5 = 3,4' + R() + '</p>',
    traps: ['La 3' + R() + ' du bas n’est pas branchée sur B toute seule : elle termine le tour par la droite (' + R() + ' + 2' + R() + ' + 3' + R() + '), qui ne rejoint le fil de B qu’après elle.',
      'La ' + R() + ' entre A et C ne fait partie d’aucun parallèle : tout le courant qui entre par A la traverse.'],
    official: false
  });

  L.push({
    id: 'hyp-td1-ex1b', exam: null, kind: 'archive', order: 112,
    src: 'Ancien TD 1 · Ex 1 · b)', title: 'Résistance vue de A et B : une échelle qui retombe sur R',
    topics: ['req'], lvl: 1, time: 5,
    figs: [img('hyp_td1_ex1_fig2', 'Réseau b) : 2R directement entre A et B, puis R en haut vers un nœud, 2R vers le bas, R en haut et R verticale au bout', 'Réseau b)')],
    questions: ['<b>b)</b> ' + td1q],
    hints: ['Commence par le bout le plus éloigné de A et B, à droite, et remonte vers A et B.',
      'À chaque étape, deux résistances égales en parallèle valent la moitié d’une seule.'],
    solution: [
      { t: 'Réduire depuis la droite', html: '<ol><li>Les deux ' + R() + ' du bout droit (celle du haut et la verticale) sont en série : 2' + R() + '.</li><li>Ces 2' + R() + ' sont en parallèle avec la 2' + R() + ' verticale du milieu : 2' + R() + ' // 2' + R() + ' = ' + R() + '.</li><li>On ajoute la ' + R() + ' du haut, en série : ' + R() + ' + ' + R() + ' = 2' + R() + '.</li><li>Enfin, la 2' + R() + ' de gauche est directement entre A et B, en parallèle sur le tout : 2' + R() + ' // 2' + R() + ' = ' + R() + '.</li></ol>' }
    ],
    answer: '<p>' + R('AB') + ' = ' + R() + '</p>',
    traps: ['La 2' + R() + ' de gauche est branchée directement entre A et B : elle se met en parallèle en dernier, sur tout le reste du réseau.'],
    official: false
  });

  L.push({
    id: 'hyp-td1-ex1c', exam: null, kind: 'archive', order: 113,
    src: 'Ancien TD 1 · Ex 1 · c)', title: 'Résistance vue de A et B : les bornes à droite du réseau',
    topics: ['req'], lvl: 2, time: 6,
    figs: [img('hyp_td1_ex1_fig3', 'Réseau c) : A et B à droite, R verticale directement entre A et B ; vers la gauche, R en haut, 2R verticale, R en haut et 2R verticale au bout', 'Réseau c)')],
    questions: ['<b>c)</b> ' + td1q],
    hints: ['Ici A et B sont à droite : le bout « éloigné » est à gauche. Réduis de la gauche vers la droite.',
      'Garde les fractions : la dernière étape est un parallèle de ' + R() + ' avec 11' + R() + '/5.'],
    solution: [
      { t: 'Réduire depuis la gauche', html: '<ol><li>La 2' + R() + ' verticale de gauche et la ' + R() + ' du haut à gauche sont en série : 3' + R() + '.</li><li>En parallèle avec la 2' + R() + ' du milieu : 3' + R() + ' // 2' + R() + ' = ' + F('3' + R() + ' × 2' + R(), '5' + R()) + ' = ' + F('6' + R(), '5') + '.</li><li>On ajoute la ' + R() + ' du haut à droite, en série : ' + R() + ' + ' + F('6' + R(), '5') + ' = ' + F('11' + R(), '5') + '.</li><li>La ' + R() + ' verticale de droite est directement entre A et B, en parallèle : ' + R('AB') + ' = ' + F(R() + ' × 11' + R() + '/5', R() + ' + 11' + R() + '/5') + ' = ' + F('11' + R() + '²/5', '16' + R() + '/5') + ' = ' + F('11' + R(), '16') + '.</li></ol>' }
    ],
    answer: '<p>' + R('AB') + ' = 11' + R() + '/16 ≈ 0,69' + R() + '</p>',
    traps: ['Une résistance équivalente plus petite que la plus petite résistance du dernier parallèle (ici ' + R() + ') est normale : un parallèle donne toujours moins que chacune de ses branches.',
      'Ne commence pas par la ' + R() + ' entre A et B : elle s’associe en dernier.'],
    official: false
  });

  L.push({
    id: 'hyp-td1-ex1d', exam: null, kind: 'archive', order: 114,
    src: 'Ancien TD 1 · Ex 1 · d)', title: 'Résistance vue de A et B : trois 4R accrochées au même fil',
    topics: ['req', 'vocabulaire'], lvl: 2, time: 8,
    figs: [img('hyp_td1_ex1_fig4', 'Réseau d) : un fil vertical à gauche relié par trois 4R au reste ; deux 2R verticales entre le fil de A et le fil de B', 'Réseau d)')],
    questions: ['<b>d)</b> ' + td1q],
    hints: ['Tout le fil vertical de gauche est un seul nœud : appelle-le L. Regarde où arrive l’autre bout de chaque 4' + R() + '.',
      'Le fil vertical qui descend du fil du haut vers la 2' + R() + ' du milieu fait partie du nœud A : la 4' + R() + ' du milieu arrive donc sur A.',
      'Entre A et L, deux 4' + R() + ' en parallèle ; entre L et B, une 4' + R() + '. Ce chemin est ensuite en parallèle avec les deux 2' + R() + '.'],
    solution: [
      { t: 'Repérer les nœuds', html: '<ul><li>Le fil vertical de gauche est un seul nœud L.</li><li>La 4' + R() + ' du haut va de L au fil du haut, relié à A. La 4' + R() + ' du milieu va de L au fil vertical qui descend du fil du haut : c’est aussi A.</li><li>La 4' + R() + ' du bas va de L au fil du bas, relié à B.</li><li>Les deux 2' + R() + ' verticales relient chacune le fil de A au fil de B.</li></ul>',
        figs: [{ spec: { w: 360, h: 220, aria: 'Deux 4R en parallèle entre A et L, 4R entre L et B, et deux 2R entre A et B', wires: ['M40 40H320V180H40', 'M75 40V110H125V40', 'M100 110V180', 'M220 40V180'],
          parts: [{ t: 'R', x: 75, y: 72, d: 'v', l: '4R', lp: 'w' }, { t: 'R', x: 125, y: 72, d: 'v', l: '4R' }, { t: 'R', x: 100, y: 146, d: 'v', l: '4R' },
            { t: 'R', x: 220, y: 110, d: 'v', l: '2R' }, { t: 'R', x: 320, y: 110, d: 'v', l: '2R' },
            { t: 'dot', x: 75, y: 40 }, { t: 'dot', x: 125, y: 40 }, { t: 'dot', x: 100, y: 110 }, { t: 'dot', x: 100, y: 180 }, { t: 'dot', x: 220, y: 40 }, { t: 'dot', x: 220, y: 180 },
            { t: 'txt', x: 92, y: 106, s: 'L', c: 'cz-n', a: 'end' }, { t: 'term', x: 40, y: 40, l: 'A', lp: 'w' }, { t: 'term', x: 40, y: 180, l: 'B', lp: 'w' }] },
          cap: 'Réseau d) redessiné entre A et B' }] },
      { t: 'Associer', html: '<ol><li>Les deux 4' + R() + ' entre A et L : 4' + R() + ' // 4' + R() + ' = 2' + R() + '.</li><li>En série avec la 4' + R() + ' entre L et B (L n’a pas d’autre branche) : 2' + R() + ' + 4' + R() + ' = 6' + R() + '.</li><li>En parallèle avec les deux 2' + R() + ' : ' + F('1', R('AB')) + ' = ' + F('1', '6' + R()) + ' + ' + F('1', '2' + R()) + ' + ' + F('1', '2' + R()) + ' = ' + F('1 + 3 + 3', '6' + R()) + ' = ' + F('7', '6' + R()) + '.</li></ol>' }
    ],
    answer: '<p>' + R('AB') + ' = 6' + R() + '/7 ≈ 0,86' + R() + '</p>',
    traps: ['Les trois 4' + R() + ' ne sont pas en parallèle : deux arrivent sur A, la troisième sur B.',
      'Le petit fil vertical au-dessus de la 2' + R() + ' du milieu relie la 4' + R() + ' du milieu au fil du haut : sans lui, on croirait que cette 4' + R() + ' arrive sur un nœud isolé.'],
    official: false
  });

  L.push({
    id: 'hyp-td1-ex1e', exam: null, kind: 'archive', order: 115,
    src: 'Ancien TD 1 · Ex 1 · e)', title: 'Résistance vue de A et B : un réseau avec une diagonale',
    topics: ['req'], lvl: 2, time: 8,
    figs: [img('hyp_td1_ex1_fig5', 'Réseau e) : A relié par un fil à un nœud haut ; R en haut et R à droite jusqu’au coin bas droit, 2R en diagonale vers ce coin, 3R verticale, 2R en bas, et 2R entre B et le nœud bas', 'Réseau e)')],
    questions: ['<b>e)</b> ' + td1q],
    hints: ['A est relié par un simple fil au nœud du haut d’où partent la 3' + R() + ', la diagonale 2' + R() + ' et la ' + R() + ' du haut.',
      'La diagonale 2' + R() + ' et le chemin ' + R() + ' + ' + R() + ' (par le coin en haut à droite) relient les deux mêmes points : A et le coin en bas à droite S.',
      'Ensuite, la 2' + R() + ' du bas, puis la 3' + R() + ' en parallèle, puis la 2' + R() + ' qui va vers B.'],
    solution: [
      { t: 'Le triangle de droite', html: '<p>Appelle S le coin en bas à droite et T le nœud en bas au milieu (sous la 3' + R() + '). Entre A et S, deux chemins :</p><ul><li>la ' + R() + ' du haut puis la ' + R() + ' de droite : 2' + R() + ' ;</li><li>la diagonale : 2' + R() + '.</li></ul><p>En parallèle : 2' + R() + ' // 2' + R() + ' = ' + R() + '.</p>',
        figs: [{ spec: { w: 380, h: 200, aria: 'B, 2R, nœud T ; de T, 3R vers A et 2R vers S ; entre S et A, l’équivalent R', wires: ['M40 40H330V160H40', 'M160 40V160'],
          parts: [{ t: 'R', x: 100, y: 160, l: '2R', lp: 's' }, { t: 'R', x: 245, y: 160, l: '2R', lp: 's' }, { t: 'R', x: 160, y: 100, d: 'v', l: '3R' },
            { t: 'R', x: 330, y: 100, d: 'v', l: '2R // 2R = R', lp: 'w', c: 'cz-hl' },
            { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 160, y: 160 }, { t: 'txt', x: 168, y: 152, s: 'T', c: 'cz-n', a: 'start' }, { t: 'txt', x: 342, y: 176, s: 'S', c: 'cz-n', a: 'start' },
            { t: 'term', x: 40, y: 40, l: 'A', lp: 'w' }, { t: 'term', x: 40, y: 160, l: 'B', lp: 'w' }] },
          cap: 'Après la première réduction' }] },
      { t: 'Finir la réduction', html: '<ol><li>Entre T et A par S : 2' + R() + ' + ' + R() + ' = 3' + R() + '.</li><li>En parallèle avec la 3' + R() + ' verticale (de T à A) : 3' + R() + ' // 3' + R() + ' = ' + F('3' + R(), '2') + '.</li><li>En série avec la 2' + R() + ' entre B et T : ' + R('AB') + ' = 2' + R() + ' + ' + F('3' + R(), '2') + ' = ' + F('7' + R(), '2') + '.</li></ol>' }
    ],
    answer: '<p>' + R('AB') + ' = 7' + R() + '/2 = 3,5' + R() + '</p>',
    traps: ['La diagonale n’est pas « à part » : ses deux bouts sont A et S, exactement comme le chemin ' + R() + ' + ' + R() + ' par le coin en haut à droite.',
      'La 2' + R() + ' entre B et T est en série avec tout le reste : elle s’ajoute à la fin.'],
    official: false
  });

  L.push({
    id: 'hyp-td1-ex2', exam: null, kind: 'archive', order: 121,
    src: 'Ancien TD 1 · Ex 2', title: 'Grille de quatre carrés : résistance entre un coin et le centre',
    topics: ['req', 'potentiels'], lvl: 3, time: 15,
    intro: '<p>La figure ci-contre représente un réseau réalisé avec un fil homogène de diamètre constant. Sa géométrie est celle d’un ensemble de 4 carrés. On appelle ' + R() + ' la résistance de chacun des côtés.</p>',
    figs: [img('hyp_td1_ex2_fig1', 'Grille de 2 carrés sur 2 : coins A en haut à gauche, B en haut à droite, C en bas à gauche, D en bas à droite, O au centre ; chaque côté de petit carré vaut R', 'Le réseau (12 côtés de résistance R)')],
    questions: ['Calculer la résistance du réseau entre <i>A</i> et <i>O</i>.'],
    hints: ['Aucune résistance n’est simplement en série ou en parallèle : il faut d’abord simplifier le réseau grâce à sa symétrie.',
      'Le réseau est symétrique par rapport à la diagonale qui passe par A, O et D. Deux points symétriques sont au même potentiel quand le courant entre en A et sort en O.',
      'Des points au même potentiel peuvent être reliés par un fil sans rien changer. Relie-les deux à deux, puis réduis.'],
    solution: [
      { t: 'Utiliser la symétrie', html: '<p>Nomme les milieux des côtés : E (haut), F (gauche), G (droite), H (bas). Fais entrer un courant en A et sortir en O. Le réseau, A et O sont symétriques par rapport à la diagonale AOD : le symétrique de E est F, celui de B est C, celui de G est H.</p><p>Deux points symétriques sont donc au même potentiel : ' + V('E') + ' = ' + V('F') + ', ' + V('B') + ' = ' + V('C') + ', ' + V('G') + ' = ' + V('H') + '. On peut relier chaque paire par un fil : aucun courant n’y passerait.</p>' },
      { t: 'Regrouper les résistances', html: '<p>Après fusion, chaque paire de côtés symétriques relie les mêmes nœuds, donc se met en parallèle : ' + R() + ' // ' + R() + ' = ' + R() + '/2.</p><ul><li>A–(E,F) : AE et AF → ' + R() + '/2 ;</li><li>(E,F)–O : EO et FO → ' + R() + '/2 ;</li><li>(E,F)–(B,C) : EB et FC → ' + R() + '/2 ;</li><li>(B,C)–(G,H) : BG et CH → ' + R() + '/2 ;</li><li>(G,H)–O : GO et HO → ' + R() + '/2 ;</li><li>(G,H)–D : GD et HD → ' + R() + '/2, mais D n’est relié à rien d’autre : aucun courant, on l’oublie.</li></ul>',
        figs: [{ spec: { w: 440, h: 210, aria: 'A, R/2 vers le nœud EF ; de EF, R/2 vers O et une chaîne de trois R/2 qui revient sur O ; branche R/2 vers D sans courant', wires: ['M40 40H340', 'M40 170H340', 'M130 40V170', 'M340 40V170', { d: 'M340 40H410', c: 'cz-ghost' }],
          parts: [{ t: 'R', x: 85, y: 40, l: 'R/2', lp: 's' }, { t: 'R', x: 130, y: 105, d: 'v', l: 'R/2' }, { t: 'R', x: 195, y: 40, l: 'R/2', lp: 's' }, { t: 'R', x: 285, y: 40, l: 'R/2', lp: 's' }, { t: 'R', x: 340, y: 105, d: 'v', l: 'R/2' },
            { t: 'R', x: 385, y: 40, l: 'R/2', c: 'cz-ghost', lp: 's' }, { t: 'term', x: 412, y: 40, l: 'D', lp: 'n', c: 'cz-ghost' },
            { t: 'dot', x: 130, y: 40 }, { t: 'dot', x: 240, y: 40 }, { t: 'dot', x: 340, y: 40 }, { t: 'dot', x: 130, y: 170 },
            { t: 'txt', x: 130, y: 26, s: 'E = F', c: 'cz-n' }, { t: 'txt', x: 240, y: 26, s: 'B = C', c: 'cz-n' }, { t: 'txt', x: 340, y: 26, s: 'G = H', c: 'cz-n' },
            { t: 'term', x: 40, y: 40, l: 'A', lp: 'w' }, { t: 'term', x: 40, y: 170, l: 'O', lp: 'w' }] },
          cap: 'Réseau après fusion des points symétriques' }] },
      { t: 'Réduire', html: '<ol><li>Chaîne (E,F) → (B,C) → (G,H) → O : ' + R() + '/2 + ' + R() + '/2 + ' + R() + '/2 = 3' + R() + '/2.</li><li>En parallèle avec ' + R() + '/2 (de (E,F) à O) : ' + F('(' + R() + '/2) × (3' + R() + '/2)', R() + '/2 + 3' + R() + '/2') + ' = ' + F('3' + R() + '²/4', '2' + R()) + ' = ' + F('3' + R(), '8') + '.</li><li>En série avec ' + R() + '/2 entre A et (E,F) : ' + R('AO') + ' = ' + F('4' + R(), '8') + ' + ' + F('3' + R(), '8') + ' = ' + F('7' + R(), '8') + '.</li></ol>' }
    ],
    answer: '<p>' + R('AO') + ' = 7' + R() + '/8</p>',
    traps: ['On ne peut relier par un fil que des points au même potentiel. Ici c’est la symétrie de tout le montage (réseau et points A, O) qui le garantit.',
      'Oublier que D est un cul-de-sac : après fusion de G et H, les deux côtés vers D ne portent aucun courant.'],
    official: false
  });

  /* =====================================================================
     TD 2 : lois fondamentales (lois de Kirchhoff)
     ===================================================================== */
  var td2e1 = '<p><b>Exercice 1 :</b> <i>Donner l’expression littérale avant de faire l’application numérique</i></p>';
  var td2e2 = '<p><b>Exercice 2 :</b> <i>Donner l’expression littérale avant de faire l’application numérique</i></p>';

  L.push({
    id: 'hyp-td2-ex1-q1', exam: null, kind: 'archive', order: 211,
    src: 'Ancien TD 2 · Ex 1 · Q1', title: 'Une maille, deux sources de tension qui se contrarient',
    topics: ['kirchhoff', 'potentiels'], lvl: 1, time: 5,
    intro: td2e1 + '<p>' + E(1) + ' = 10 V ; ' + E(2) + ' = 15 V ; ' + R() + ' = 1 kΩ</p>',
    figs: [img('hyp_td2_ex1_fig1', 'Une seule maille : R et E1 sur le fil du haut, E2 sur le fil du bas ; les flèches de E1 et de E2 pointent vers la gauche ; I est fléché vers le bas sur le fil de gauche', 'Question 1')],
    questions: ['<b>1)</b> Calculer ' + I()],
    hints: ['Il n’y a qu’une maille : le même courant ' + I() + ' traverse ' + R() + ', ' + E(1) + ' et ' + E(2) + '. Repère dans quel sens il traverse ' + R() + '.',
      'Écris la loi des mailles en tournant dans le sens de ' + I() + ' : une flèche dans le sens du parcours compte +, une flèche à contre-sens compte −. Pour ' + R() + ', flèche en convention récepteur.'],
    solution: [
      { t: 'Sens du courant', html: '<p>Une seule maille : le même courant ' + I() + ' traverse tout. Fléché vers le bas sur le fil de gauche, il passe dans ' + E(2) + ' de gauche à droite, remonte à droite, puis traverse ' + E(1) + ' et ' + R() + ' de droite à gauche (sens trigonométrique).</p><p>En convention récepteur, la flèche de ' + U('R') + ' est opposée au courant : elle pointe vers la droite, et ' + U('R') + ' = ' + R() + I() + '.</p>' },
      { t: 'Loi des mailles', html: '<p>Tourne dans le sens de ' + I() + ' : une flèche dans le sens du parcours compte +, une flèche à contre-sens compte −.</p><ul><li>' + E(2) + ' : flèche vers la gauche, parcourue de gauche à droite : −' + E(2) + ' ;</li><li>' + E(1) + ' : flèche vers la gauche, parcourue de droite à gauche : +' + E(1) + ' ;</li><li>' + U('R') + ' : flèche vers la droite, parcourue de droite à gauche : −' + U('R') + '.</li></ul><p>−' + E(2) + ' + ' + E(1) + ' − ' + R() + I() + ' = 0, donc ' + I() + ' = ' + F(E(1) + ' − ' + E(2), R()) + '.</p>' },
      { t: 'Application numérique', html: '<p>' + I() + ' = ' + F('10 − 15', '1 kΩ') + ' = −5 mA.</p><p>Le signe − veut dire que le courant réel tourne dans l’autre sens : ' + E(2) + ', plus grande, impose son sens.</p>' }
    ],
    answer: '<p>' + I() + ' = (' + E(1) + ' − ' + E(2) + ')/' + R() + ' = −5 mA</p>',
    traps: ['Les deux flèches pointent vers la gauche, mais la maille parcourt ' + E(1) + ' et ' + E(2) + ' en sens contraires : leurs effets se retranchent.',
      'Un courant négatif n’est pas une erreur : la flèche de ' + I() + ' est un choix, le signe donne le vrai sens.',
      'Unités : des V divisés par des kΩ donnent des mA.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q2', exam: null, kind: 'archive', order: 212,
    src: 'Ancien TD 2 · Ex 1 · Q2', title: 'Source de courant, résistance et source de tension en série',
    topics: ['kirchhoff', 'source-courant', 'potentiels'], lvl: 2, time: 8,
    intro: td2e1 + '<p>' + I() + ' = 0,3 A ; ' + E() + ' = 5 V ; ' + R() + ' = 8 Ω</p>',
    figs: [img('hyp_td2_ex1_fig2', 'Branche du bas : source de courant I vers la droite, R, puis source E ; un fil en haut relie les deux extrémités. En dessous, U sous la source de courant, E sous la source de tension et V sous R et E, toutes fléchées vers la gauche', 'Question 2')],
    questions: ['<b>2)</b> Calculer ' + U() + ' et ' + UV],
    hints: ['La source de courant impose ' + I() + ' dans toute la maille, y compris dans ' + R() + '.',
      'La flèche ' + UV + ' couvre ' + R() + ' et ' + E() + ' : additionne les deux tensions. Regarde ensuite le fil du haut : il relie les deux bouts des flèches ' + U() + ' et ' + UV + '.'],
    solution: [
      { t: 'Tension aux bornes de R', html: '<p>La source de courant impose ' + I() + ' = 0,3 A dans toute la maille. Dans ' + R() + ', le courant va vers la droite ; en convention récepteur, sa flèche de tension pointe vers la gauche, comme celles de ' + E() + ' et de ' + UV + ' :</p><p>' + U('R') + ' = ' + R() + I() + ' = 8 × 0,3 = 2,4 V.</p>' },
      { t: 'Calcul de V', html: '<p>La flèche ' + UV + ' couvre ' + R() + ' et la source ' + E() + ', et les trois flèches vont dans le même sens : les tensions s’ajoutent.</p><p>' + UV + ' = ' + U('R') + ' + ' + E() + ' = ' + R() + I() + ' + ' + E() + ' = 2,4 + 5 = 7,4 V.</p>' },
      { t: 'Calcul de U', html: '<p>Le fil du haut relie l’entrée de la source de courant (à gauche) à la sortie de ' + E() + ' (à droite) : ces deux points ont le même potentiel. Les flèches ' + U() + ' et ' + UV + ' ferment donc à elles deux une maille : ' + U() + ' + ' + UV + ' = 0.</p><p>' + U() + ' = −' + UV + ' = −(' + R() + I() + ' + ' + E() + ') = −7,4 V.</p><p>Le corrigé manuscrit archivé écrit la maille « E + U<sub>R</sub> + V = 0 », qui donnerait ' + UV + ' = −7,4 V : avec ses propres flèches, c’est ' + UV + ' = ' + E() + ' + ' + U('R') + '. Ses valeurs finales sont pourtant justes.</p>' },
      { t: 'Pour aller plus loin : qui fournit l’énergie ?', html: '<p>Pour la source de courant, ' + I() + ' (vers la droite) et ' + U() + ' (vers la gauche) sont en convention récepteur : elle reçoit ' + U() + I() + ' = −7,4 × 0,3 = −2,22 W, donc elle fournit 2,22 W et fonctionne en générateur. La source ' + E() + ' est traversée de son + vers son − : elle reçoit ' + E() + I() + ' = 1,5 W. La résistance dissipe ' + R() + I() + '² = 0,72 W. Bilan : 1,5 + 0,72 = 2,22 W.</p>' }
    ],
    answer: '<p>' + UV + ' = ' + R() + I() + ' + ' + E() + ' = 7,4 V ; ' + U() + ' = −(' + R() + I() + ' + ' + E() + ') = −7,4 V</p>',
    traps: ['La tension aux bornes d’une source de courant n’est pas donnée : c’est le reste du circuit qui la fixe.',
      'Le fil du haut ferme la maille : ' + U() + ' et ' + UV + ' ne sont pas indépendantes, ' + U() + ' = −' + UV + '.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q3', exam: null, kind: 'archive', order: 213,
    src: 'Ancien TD 2 · Ex 1 · Q3', title: 'Choisir E2 pour imposer le courant',
    topics: ['kirchhoff', 'potentiels'], lvl: 1, time: 6,
    intro: td2e1 + '<p>' + E(1) + ' = 30 V ; ' + R() + ' = 2 kΩ</p>',
    figs: [img('hyp_td2_ex1_fig3', 'Une maille : E1 à gauche fléchée vers le haut, R en haut avec I vers la droite, E2 à droite fléchée vers le bas', 'Question 3')],
    questions: ['<b>3)</b> Calculer ' + E(2) + ' pour que <b>a)</b> ' + I() + ' = 10 mA <b>b)</b> ' + I() + ' = 0'],
    hints: ['Prends le fil du bas à 0 V et écris le potentiel des deux bouts de ' + R() + '.',
      'La flèche de ' + E(2) + ' pointe vers le bas : son + est en bas, donc le haut de ' + E(2) + ' est à −' + E(2) + '.'],
    solution: [
      { t: 'Potentiels', html: '<p>Fil du bas : 0 V. La flèche de ' + E(1) + ' pointe vers le haut : le haut de ' + E(1) + ' est à ' + E(1) + '. La flèche de ' + E(2) + ' pointe vers le bas : le + de ' + E(2) + ' est en bas, donc son haut est à −' + E(2) + '.</p>' },
      { t: 'Loi d’Ohm dans R', html: '<p>' + I() + ' traverse ' + R() + ' de gauche à droite : ' + R() + I() + ' = ' + V('gauche') + ' − ' + V('droite') + ' = ' + E(1) + ' − (−' + E(2) + ') = ' + E(1) + ' + ' + E(2) + '.</p><p>Les deux sources poussent le courant dans le même sens (sens horaire). D’où ' + E(2) + ' = ' + R() + I() + ' − ' + E(1) + '.</p><p>Le corrigé manuscrit archivé écrit « E1 + U<sub>R</sub> + E2 = 0 » avec ' + U('R') + ' fléchée vers la gauche : le bon signe est ' + E(1) + ' − ' + U('R') + ' + ' + E(2) + ' = 0. Sa valeur finale est juste.</p>' },
      { t: 'Applications numériques', html: '<p><b>a)</b> ' + E(2) + ' = 2 kΩ × 10 mA − 30 = 20 − 30 = −10 V.</p><p><b>b)</b> ' + E(2) + ' = 0 − 30 = −30 V.</p><p>' + E(2) + ' est négative : sa vraie polarité est l’inverse de sa flèche (+ en haut). En b), une source de 30 V avec le + en haut s’oppose exactement à ' + E(1) + ' : plus aucun courant.</p>' }
    ],
    answer: '<p>' + E(2) + ' = ' + R() + I() + ' − ' + E(1) + ' : a) −10 V ; b) −30 V</p>',
    traps: ['Avec la flèche de ' + E(2) + ' vers le bas, les deux sources poussent dans le même sens : ' + R() + I() + ' = ' + E(1) + ' + ' + E(2) + ', pas ' + E(1) + ' − ' + E(2) + '.',
      'Un ' + E(2) + ' négatif est une réponse correcte : la vraie polarité est l’inverse de celle de la flèche.',
      'kΩ × mA = V : 2 kΩ × 10 mA = 20 V.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q4', exam: null, kind: 'archive', order: 214,
    src: 'Ancien TD 2 · Ex 1 · Q4', title: 'Retrouver E et R d’un générateur réel à partir de deux mesures',
    topics: ['generateurs', 'diviseurs', 'calcul'], lvl: 2, time: 8,
    intro: td2e1,
    figs: [img('hyp_td2_ex1_fig4', 'Générateur réel : E fléchée vers le haut et R en haut, charge RC à droite, U fléchée vers le haut aux bornes de RC', 'Question 4')],
    questions: ['<b>4)</b> Le générateur (' + E() + ', ' + R() + ') impose ' + U() + ' = 80 V si ' + R('C') + ' = 8 Ω et le double si ' + R('C') + ' = 32 Ω. Calculer ' + E() + ' et ' + R()],
    hints: ['Dans chaque cas, calcule d’abord le courant ' + I() + ' = ' + U() + '/' + R('C') + '.',
      'Pour un générateur réel, ' + U() + ' = ' + E() + ' − ' + R() + I() + '. Les deux cas donnent deux équations à deux inconnues.'],
    solution: [
      { t: 'Le courant dans chaque cas', html: '<p>Une seule maille, donc ' + I() + ' = ' + U() + '/' + R('C') + '.</p><ul><li>Cas 1 : ' + U() + ' = 80 V et ' + R('C') + ' = 8 Ω, donc ' + I() + ' = 10 A.</li><li>Cas 2 : ' + U() + ' = 160 V et ' + R('C') + ' = 32 Ω, donc ' + I() + ' = 5 A.</li></ul>' },
      { t: 'Équation du générateur', html: '<p>Loi des mailles : ' + U() + ' = ' + E() + ' − ' + R() + I() + ' (la résistance interne prend ' + R() + I() + ').</p><ul><li>Cas 1 : 80 = ' + E() + ' − 10' + R() + '.</li><li>Cas 2 : 160 = ' + E() + ' − 5' + R() + '.</li></ul><p>On soustrait : 160 − 80 = 10' + R() + ' − 5' + R() + ', donc 5' + R() + ' = 80 et ' + R() + ' = 16 Ω. Puis ' + E() + ' = 80 + 10 × 16 = 240 V.</p>' },
      { t: 'Vérification', html: '<p>Diviseur de tension : ' + U() + ' = ' + E() + R('C') + '/(' + R() + ' + ' + R('C') + ').</p><ul><li>240 × 8/24 = 80 V ;</li><li>240 × 32/48 = 160 V.</li></ul>' }
    ],
    answer: '<p>' + R() + ' = 16 Ω ; ' + E() + ' = 240 V</p>',
    traps: ['« Le double » porte sur ' + U() + ' : 160 V. Le courant, lui, est divisé par deux (5 A au lieu de 10 A).',
      U() + ' n’est pas égale à ' + E() + ' : la chute ' + R() + I() + ' dans la résistance interne dépend du courant débité.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q5', exam: null, kind: 'archive', order: 215,
    src: 'Ancien TD 2 · Ex 1 · Q5', title: 'Interrupteur en série : les tensions K ouvert et K fermé',
    topics: ['interrupteurs', 'diviseurs', 'kirchhoff'], lvl: 1, time: 6,
    intro: td2e1 + '<p>' + E() + ' = 10 V ; ' + R(1) + ' = 3' + R(2) + '</p>',
    figs: [img('hyp_td2_ex1_fig5', 'E à gauche fléchée vers le haut, R1 en haut avec U1 fléchée vers la gauche, interrupteur K puis R2 sur la branche de droite ; U2 aux bornes de R2, V aux bornes de K et R2 ensemble', 'Question 5')],
    questions: ['<b>5)</b> Calculer ' + U(1) + ', ' + U(2) + ' et ' + UV + ' selon que <i>K</i> est ouvert ou fermé.'],
    hints: ['K ouvert : aucun courant ne circule dans la maille. Que vaut alors la tension aux bornes d’une résistance ?',
      'K fermé : la tension aux bornes de K est nulle, et la maille devient un diviseur de tension.'],
    solution: [
      { t: 'K ouvert', html: '<p>La maille est coupée : ' + I() + ' = 0. Loi d’Ohm : ' + U(1) + ' = ' + R(1) + ' × 0 = 0 et ' + U(2) + ' = ' + R(2) + ' × 0 = 0.</p><p>Loi des mailles : ' + UV + ' = ' + E() + ' − ' + U(1) + ' = ' + E() + ' = 10 V. Toute la tension de la source se retrouve aux bornes de l’interrupteur ouvert.</p>' },
      { t: 'K fermé', html: '<p>' + U('K') + ' = 0 : ' + E() + ', ' + R(1) + ' et ' + R(2) + ' sont en série, ' + I() + ' = ' + E() + '/(' + R(1) + ' + ' + R(2) + ') = ' + E() + '/(4' + R(2) + '). La flèche de ' + U(1) + ' est opposée au courant (convention récepteur) : ' + U(1) + ' est positive.</p><ul><li>' + U(1) + ' = ' + E() + R(1) + '/(' + R(1) + ' + ' + R(2) + ') = 3' + E() + '/4 = 7,5 V ;</li><li>' + U(2) + ' = ' + E() + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = ' + E() + '/4 = 2,5 V ;</li><li>' + UV + ' = ' + U('K') + ' + ' + U(2) + ' = ' + U(2) + ' = 2,5 V.</li></ul>' }
    ],
    answer: '<p>K ouvert : ' + U(1) + ' = ' + U(2) + ' = 0 et ' + UV + ' = ' + E() + ' = 10 V. K fermé : ' + U(1) + ' = 3' + E() + '/4 = 7,5 V, ' + U(2) + ' = ' + UV + ' = ' + E() + '/4 = 2,5 V.</p>',
    traps: ['Interrupteur ouvert : le courant est nul, pas la tension. Ici, la tension aux bornes de K vaut ' + E() + '.',
      'La flèche ' + UV + ' englobe K et ' + R(2) + ' : quand K est fermé, ' + UV + ' = ' + U(2) + ', pas ' + E() + '.',
      'Seul le rapport ' + R(1) + ' = 3' + R(2) + ' compte : la valeur de ' + R(2) + ' n’est pas utile.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q6a', exam: null, kind: 'archive', order: 216.1,
    src: 'Ancien TD 2 · Ex 1 · Q6', title: 'Deux interrupteurs (circuit de gauche) : K2 court-circuite la sortie',
    topics: ['interrupteurs', 'diviseurs'], lvl: 2, time: 6,
    intro: td2e1,
    figs: [img('hyp_td2_ex1_fig6', 'Circuit de gauche : E, puis R et K1 en série sur le fil du haut ; ensuite une R verticale et K2 vertical en parallèle ; U aux bornes de K2', 'Question 6, circuit de gauche')],
    questions: ['<b>6)</b> Calculer ' + U() + ' dans les 4 cas possibles et pour les 2 circuits ci-dessous : <i>ici, le circuit de gauche.</i>'],
    hints: ['K1 est en série avec la source : s’il est ouvert, aucun courant ne circule nulle part.',
      'K2 est branché directement aux bornes de la sortie : fermé, il impose ' + U() + ' = 0.'],
    solution: [
      { t: 'Les quatre cas', html: '<ul><li><b>K1 ouvert, K2 ouvert</b> : aucun courant ; la ' + R() + ' verticale n’est traversée par rien, ' + U() + ' = ' + R() + ' × 0 = 0.</li><li><b>K1 ouvert, K2 fermé</b> : ' + U() + ' = ' + U('K2') + ' = 0.</li><li><b>K1 fermé, K2 ouvert</b> : les deux ' + R() + ' sont en série sous ' + E() + ' ; diviseur : ' + U() + ' = ' + E() + R() + '/(' + R() + ' + ' + R() + ') = ' + E() + '/2.</li><li><b>K1 fermé, K2 fermé</b> : K2 court-circuite la ' + R() + ' verticale ; ' + U() + ' = 0 (le courant ' + E() + '/' + R() + ' passe par la ' + R() + ' du haut et par K2).</li></ul>' }
    ],
    answer: '<p>' + U() + ' = ' + E() + '/2 seulement si K1 est fermé et K2 ouvert ; ' + U() + ' = 0 dans les trois autres cas.</p>',
    traps: ['K1 et K2 ouverts : ' + U() + ' = 0, pas ' + E() + '. La tension ' + E() + ' se retrouve aux bornes de K1, pas aux bornes de la sortie.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q6b', exam: null, kind: 'archive', order: 216.2,
    src: 'Ancien TD 2 · Ex 1 · Q6', title: 'Deux interrupteurs (circuit de droite) : K1 court-circuite une résistance',
    topics: ['interrupteurs', 'diviseurs'], lvl: 2, time: 6,
    intro: td2e1,
    figs: [img('hyp_td2_ex1_fig7', 'Circuit de droite : E, puis une R en parallèle avec K1 sur le fil du haut ; à droite, K2 puis une R en série ; U aux bornes de l’ensemble K2 et R', 'Question 6, circuit de droite')],
    questions: ['<b>6)</b> Calculer ' + U() + ' dans les 4 cas possibles et pour les 2 circuits ci-dessous : <i>ici, le circuit de droite.</i>'],
    hints: ['La flèche ' + U() + ' couvre K2 et la ' + R() + ' du bas : ' + U() + ' = ' + E() + ' − (tension aux bornes du bloc du haut).',
      'K1 fermé court-circuite la ' + R() + ' du haut ; K2 ouvert coupe tout courant.'],
    solution: [
      { t: 'Les quatre cas', html: '<p>Loi des mailles : ' + U() + ' = ' + E() + ' − ' + U('bloc') + ', où ' + U('bloc') + ' est la tension aux bornes du bloc « ' + R() + ' en parallèle avec K1 ».</p><ul><li><b>K2 ouvert</b> (K1 ouvert ou fermé) : aucun courant, donc ' + U('bloc') + ' = 0 et ' + U() + ' = ' + E() + '.</li><li><b>K1 ouvert, K2 fermé</b> : les deux ' + R() + ' sont en série ; diviseur : ' + U() + ' = ' + E() + R() + '/(' + R() + ' + ' + R() + ') = ' + E() + '/2.</li><li><b>K1 fermé, K2 fermé</b> : K1 court-circuite la ' + R() + ' du haut, ' + U('bloc') + ' = 0 et ' + U() + ' = ' + E() + '.</li></ul>' }
    ],
    answer: '<p>' + U() + ' = ' + E() + '/2 seulement si K1 est ouvert et K2 fermé ; ' + U() + ' = ' + E() + ' dans les trois autres cas.</p>',
    traps: ['Ici la flèche englobe K2 : K2 ouvert donne ' + U() + ' = ' + E() + ' (tension aux bornes de l’interrupteur ouvert), pas ' + U() + ' = 0.',
      'K1 fermé : la ' + R() + ' du haut est court-circuitée et ne compte plus dans le diviseur.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q7a', exam: null, kind: 'archive', order: 217.1,
    src: 'Ancien TD 2 · Ex 1 · Q7', title: 'Sortie à vide après un diviseur de tension',
    topics: ['diviseurs'], lvl: 1, time: 4,
    intro: td2e1 + '<p>' + E() + ' = 10 V ; ' + R(1) + ' = 2 kΩ ; ' + R(2) + ' = 8 kΩ ; ' + R(3) + ' = 10 kΩ</p>',
    figs: [img('hyp_td2_ex1_fig8', 'E, R1 en haut, R2 verticale, puis R3 vers une borne de sortie ouverte ; U entre les bornes de sortie', 'Question 7, circuit de gauche')],
    questions: ['<b>7)</b> Calculer ' + U() + ' pour les 2 circuits suivants : <i>ici, le circuit de gauche.</i>'],
    hints: ['La sortie est ouverte : quel courant traverse ' + R(3) + ' ?'],
    solution: [
      { t: 'Sortie à vide', html: '<p>Rien n’est branché sur la sortie : aucun courant dans ' + R(3) + ', donc aucune tension à ses bornes. ' + U() + ' est la tension aux bornes de ' + R(2) + '.</p><p>' + R(1) + ' et ' + R(2) + ' sont parcourues par le même courant : diviseur de tension.</p><p>' + U() + ' = ' + F(E() + R(2), R(1) + ' + ' + R(2)) + ' = ' + F('10 × 8', '2 + 8') + ' = 8 V.</p>' }
    ],
    answer: '<p>' + U() + ' = ' + E() + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = 8 V</p>',
    traps: [R(3) + ' ne compte pas : en sortie ouverte, elle n’est traversée par aucun courant.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex1-q7b', exam: null, kind: 'archive', order: 217.2,
    src: 'Ancien TD 2 · Ex 1 · Q7', title: 'Sortie à vide en H : trois résistances utiles sur cinq',
    topics: ['diviseurs'], lvl: 1, time: 4,
    intro: td2e1 + '<p>' + E() + ' = 12 V</p>',
    figs: [img('hyp_td2_ex1_fig9', 'E à gauche ; une R sur le fil du haut et une R sur le fil du bas vers une R verticale centrale ; puis une R en haut et une R en bas vers les bornes de sortie ouvertes ; U entre ces bornes', 'Question 7, circuit de droite')],
    questions: ['<b>7)</b> Calculer ' + U() + ' pour les 2 circuits suivants : <i>ici, le circuit de droite.</i>'],
    hints: ['Les deux ' + R() + ' qui mènent à la sortie ouverte ne portent aucun courant.', 'Il reste une seule maille : ' + R() + ' en haut, ' + R() + ' verticale, ' + R() + ' en bas.'],
    solution: [
      { t: 'Sortie à vide', html: '<p>Les deux ' + R() + ' de sortie ne sont traversées par aucun courant : pas de tension à leurs bornes. ' + U() + ' est donc la tension aux bornes de la ' + R() + ' verticale centrale.</p><p>La maille ' + E() + ' → ' + R() + ' (haut) → ' + R() + ' (verticale) → ' + R() + ' (bas) est un diviseur de tension :</p><p>' + U() + ' = ' + F(E() + R(), '3' + R()) + ' = ' + F(E(), '3') + ' = 4 V.</p>' }
    ],
    answer: '<p>' + U() + ' = ' + E() + '/3 = 4 V</p>',
    traps: ['La ' + R() + ' du fil du bas compte autant que celle du haut : elles sont en série dans la même maille.',
      'Les deux ' + R() + ' de sortie ne comptent pas (aucun courant).'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex2-q1', exam: null, kind: 'archive', order: 221,
    src: 'Ancien TD 2 · Ex 2 · Q1', title: 'Résistance vue par une source de courant, puis diviseur de courant',
    topics: ['req', 'diviseurs', 'source-courant'], lvl: 1, time: 6,
    intro: td2e2 + '<p>' + R(1) + ' = ' + R(3) + ' = 100 Ω ; ' + R(2) + ' = 200 Ω ; ' + R(4) + ' = 300 Ω ; ' + I() + ' = 1 A</p>',
    figs: [img('hyp_td2_ex2_fig1', 'Source de courant I à gauche (flèche vers le haut), R1 en haut, R2 verticale, puis R3 en haut et R4 verticale à droite', 'Question 1')],
    questions: ['<b>1)</b> Calculer la résistance équivalente « vue » par le générateur de courant et les intensités dans ' + R(2) + ' et ' + R(3) + '.'],
    hints: [R(3) + ' et ' + R(4) + ' sont en série ; l’ensemble est en parallèle avec ' + R(2) + ' ; ' + R(1) + ' est en série avec le tout.',
      'Au nœud après ' + R(1) + ', le courant ' + I() + ' se partage entre ' + R(2) + ' et la branche ' + R(3) + ' + ' + R(4) + ' : diviseur de courant.'],
    solution: [
      { t: 'Résistance vue par la source', html: '<ol><li>' + R(3) + ' + ' + R(4) + ' = 400 Ω (série).</li><li>En parallèle avec ' + R(2) + ' : ' + F('200 × 400', '200 + 400') + ' = ' + F('400', '3') + ' Ω.</li><li>En série avec ' + R(1) + ' : ' + R('éq') + ' = 100 + ' + F('400', '3') + ' = ' + F('700', '3') + ' Ω ≈ 233 Ω.</li></ol><p>Littéralement : ' + R('éq') + ' = ' + R(1) + ' + ' + F(R(2) + '(' + R(3) + ' + ' + R(4) + ')', R(2) + ' + ' + R(3) + ' + ' + R(4)) + '.</p>' },
      { t: 'Courants dans R2 et R3', html: '<p>' + R(1) + ' est en série avec la source : elle porte ' + I() + ' = 1 A. Au nœud, ' + I() + ' se partage entre ' + R(2) + ' et la branche ' + R(3) + ' + ' + R(4) + '. Diviseur de courant (chaque branche reçoit la part proportionnelle à la résistance de l’autre) :</p><ul><li>' + I(2) + ' = ' + I() + ' × ' + F(R(3) + ' + ' + R(4), R(2) + ' + ' + R(3) + ' + ' + R(4)) + ' = 1 × ' + F('400', '600') + ' = ' + F('2', '3') + ' A ≈ 0,67 A ;</li><li>' + I(3) + ' = ' + I() + ' × ' + F(R(2), R(2) + ' + ' + R(3) + ' + ' + R(4)) + ' = 1 × ' + F('200', '600') + ' = ' + F('1', '3') + ' A ≈ 0,33 A.</li></ul><p>Contrôle : ' + I(2) + ' + ' + I(3) + ' = 1 A.</p>' }
    ],
    answer: '<p>' + R('éq') + ' = 700/3 Ω ≈ 233 Ω ; ' + I(2) + ' = 2/3 A ≈ 0,67 A ; ' + I(3) + ' = 1/3 A ≈ 0,33 A</p>',
    traps: ['Dans le diviseur de courant, la plus grande part passe par la branche la moins résistante (ici ' + R(2) + ', 200 Ω contre 400 Ω).',
      R(1) + ' est parcourue par tout le courant ' + I() + ' : elle ne participe pas au partage.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex2-q2', exam: null, kind: 'archive', order: 222,
    src: 'Ancien TD 2 · Ex 2 · Q2', title: 'Flécher et calculer trois courants',
    topics: ['kirchhoff', 'req', 'diviseurs'], lvl: 1, time: 6,
    intro: td2e2 + '<p>' + E() + ' = 64 V ; ' + R(1) + ' = 6,25 kΩ ; ' + R(2) + ' = 10 kΩ ; ' + R(3) + ' = 6 kΩ</p>',
    figs: [img('hyp_td2_ex2_fig2', 'E à gauche, R1 en haut, puis R2 et R3 verticales en parallèle ; U aux bornes de R3', 'Question 2')],
    questions: ['<b>2)</b> Flécher et calculer les 3 courants'],
    hints: ['Fais sortir ' + I(1) + ' du + de ' + E() + ' vers ' + R(1) + ', et fais descendre ' + I(2) + ' et ' + I(3) + ' dans ' + R(2) + ' et ' + R(3) + ' : la loi des nœuds donne ' + I(1) + ' = ' + I(2) + ' + ' + I(3) + '.',
      'Résistance vue par ' + E() + ' : ' + R(1) + ' + ' + R(2) + ' // ' + R(3) + '. Tu en tires ' + I(1) + ', puis la tension ' + U() + ' commune à ' + R(2) + ' et ' + R(3) + '.'],
    solution: [
      { t: 'Flécher', html: '<p>On choisit ' + I(1) + ' sortant du + de ' + E() + ' et traversant ' + R(1) + ', puis ' + I(2) + ' et ' + I(3) + ' descendant dans ' + R(2) + ' et ' + R(3) + '. Loi des nœuds : ' + I(1) + ' = ' + I(2) + ' + ' + I(3) + '.</p>',
        figs: [{ spec: { w: 400, h: 215, aria: 'Fléchage : I1 dans R1, I2 et I3 vers le bas dans R2 et R3, U aux bornes de R3', wires: ['M50 40H340V180H50Z', 'M240 40V180'],
          parts: [{ t: 'E', x: 50, y: 110, d: 'v', p: 'n', l: 'E' }, { t: 'R', x: 150, y: 40, l: 'R_1' }, { t: 'R', x: 240, y: 117, d: 'v', l: 'R_2', lp: 'w' }, { t: 'R', x: 340, y: 117, d: 'v', l: 'R_3', lp: 'w' },
            { t: 'I', x: 92, y: 40, d: 'e', l: 'I_1' }, { t: 'I', x: 240, y: 66, d: 's', l: 'I_2' }, { t: 'I', x: 340, y: 66, d: 's', l: 'I_3' },
            { t: 'U', a: [375, 165], b: [375, 55], l: 'U' }, { t: 'dot', x: 240, y: 40 }, { t: 'dot', x: 240, y: 180 }] },
          cap: 'Un fléchage possible' }] },
      { t: 'Calculer', html: '<ol><li>' + R(2) + ' // ' + R(3) + ' = ' + F('10 × 6', '10 + 6') + ' = ' + F('60', '16') + ' = 3,75 kΩ.</li><li>' + R('éq') + ' = 6,25 + 3,75 = 10 kΩ, donc ' + I(1) + ' = ' + F('64 V', '10 kΩ') + ' = 6,4 mA.</li><li>' + U() + ' = 3,75 kΩ × 6,4 mA = 24 V.</li><li>' + I(2) + ' = ' + U() + '/' + R(2) + ' = 24/10 = 2,4 mA et ' + I(3) + ' = ' + U() + '/' + R(3) + ' = 24/6 = 4 mA.</li></ol><p>Contrôle : 2,4 + 4 = 6,4 mA. Littéralement, avec ' + R('D') + ' = ' + R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3) + ' : ' + I(1) + ' = ' + E() + '(' + R(2) + ' + ' + R(3) + ')/' + R('D') + ', ' + I(2) + ' = ' + E() + R(3) + '/' + R('D') + ', ' + I(3) + ' = ' + E() + R(2) + '/' + R('D') + '.</p>' }
    ],
    answer: '<p>' + I(1) + ' = 6,4 mA ; ' + I(2) + ' = 2,4 mA ; ' + I(3) + ' = 4 mA (et ' + U() + ' = 24 V)</p>',
    traps: ['Flécher, c’est choisir un sens pour chaque courant et s’y tenir. Avec ces sens-là, les trois courants sont positifs.',
      'V/kΩ donne des mA : pas besoin de convertir en ampères.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex2-q3', exam: null, kind: 'archive', order: 223,
    src: 'Ancien TD 2 · Ex 2 · Q3', title: 'Choisir R′ pour que U = E/4, puis en déduire U′',
    topics: ['diviseurs', 'req', 'calcul'], lvl: 2, time: 10,
    intro: td2e2,
    figs: [img('hyp_td2_ex2_fig3', 'E, R′ en haut, puis deux 2R en série verticales avec U à leurs bornes ; R en haut, 2R verticale à droite avec U′, et 3R en bas qui revient au nœud du bas', 'Question 3')],
    questions: ['<b>3)</b> Calculer ' + Rp + ' par rapport à ' + R() + ' pour que ' + U() + ' = ' + E() + '/4', 'Calculer ' + Up + ' par rapport à ' + E() + '.'],
    hints: ['Sous ' + Rp + ', deux branches en parallèle : 2' + R() + ' + 2' + R() + ', et ' + R() + ' + 2' + R() + ' + 3' + R() + ' (la 3' + R() + ' du bas est dans la branche de droite).',
      'Écris ' + U() + ' avec le diviseur de tension entre ' + Rp + ' et cette résistance équivalente, puis résous ' + U() + ' = ' + E() + '/4.',
      'Pour ' + Up + ', fais un second diviseur dans la branche de droite, qui est soumise à ' + U() + '.'],
    solution: [
      { t: 'Résistance sous R′', html: '<ul><li>Branche du milieu : 2' + R() + ' + 2' + R() + ' = 4' + R() + ' ;</li><li>branche de droite : ' + R() + ' + 2' + R() + ' + 3' + R() + ' = 6' + R() + ' (un seul chemin, même courant) ;</li><li>en parallèle : 4' + R() + ' // 6' + R() + ' = ' + F('24' + R() + '²', '10' + R()) + ' = ' + F('12' + R(), '5') + '.</li></ul>',
        figs: [{ spec: thevLoad('E', 'R′', '12R/5', { a: '', b: '', u: 'U', aria: 'Diviseur de tension : E, R′ puis la résistance équivalente 12R/5 aux bornes de laquelle on lit U' }), cap: 'Ce que voit la source : un diviseur de tension' }] },
      { t: 'Condition U = E/4', html: '<p>Diviseur : ' + U() + ' = ' + E() + ' × ' + F('12' + R() + '/5', Rp + ' + 12' + R() + '/5') + '.</p><p>' + U() + ' = ' + E() + '/4 ⇔ ' + Rp + ' + ' + F('12' + R(), '5') + ' = 4 × ' + F('12' + R(), '5') + ' ⇔ ' + Rp + ' = 3 × ' + F('12' + R(), '5') + ' = ' + F('36' + R(), '5') + ' = 7,2' + R() + '.</p>' },
      { t: 'Calcul de U′', html: '<p>La branche de droite (' + R() + ', 2' + R() + ', 3' + R() + ' en série) est soumise à ' + U() + '. ' + Up + ' est la tension aux bornes de sa 2' + R() + ' : diviseur de tension.</p><p>' + Up + ' = ' + U() + ' × ' + F('2' + R(), R() + ' + 2' + R() + ' + 3' + R()) + ' = ' + F(U(), '3') + ' = ' + F(E(), '12') + '.</p>' }
    ],
    answer: '<p>' + Rp + ' = 36' + R() + '/5 = 7,2' + R() + ' ; ' + Up + ' = ' + E() + '/12</p>',
    traps: ['La 3' + R() + ' du bas appartient à la branche de droite : elle ne rejoint le nœud du bas qu’après la 2' + R() + '.',
      U() + ' = ' + E() + '/4 veut dire que ' + Rp + ' prend les trois quarts de ' + E() + ' : ' + Rp + ' vaut trois fois la résistance qu’il alimente.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex2-q4', exam: null, kind: 'archive', order: 224,
    src: 'Ancien TD 2 · Ex 2 · Q4', title: 'Source de courant en série avec R1 au milieu du circuit',
    topics: ['kirchhoff', 'source-courant', 'potentiels'], lvl: 2, time: 8,
    intro: td2e2 + '<p>' + E() + ' = 15 V ; ' + R(1) + ' = 200 Ω ; ' + R(2) + ' = 100 Ω ; ' + I(1) + ' = 0,1 A</p>',
    figs: [img('hyp_td2_ex2_fig4', 'E à gauche ; fil du haut avec I vers la droite ; branche du milieu : source de courant I1 fléchée vers le haut, U à ses bornes, puis R1 en dessous ; R2 à droite', 'Question 4')],
    questions: ['<b>4)</b> Calculer ' + U() + ' et ' + I()],
    hints: ['Fil du bas à 0 V : le fil du haut est relié au + de E, il est donc à ' + E() + '. Tu as directement le courant dans ' + R(2) + '.',
      'Loi des nœuds sur le fil du haut pour ' + I() + '. Pour ' + U() + ', cherche le potentiel du point entre la source et ' + R(1) + ' : ' + R(1) + ' est traversée par ' + I(1) + '.'],
    solution: [
      { t: 'Courant I', html: '<p>Fil du bas : 0 V. Le fil du haut est relié au + de ' + E() + ' : il est à ' + E() + ' = 15 V. Dans ' + R(2) + ' (vers le bas) : ' + I('R2') + ' = ' + E() + '/' + R(2) + ' = 15/100 = 0,15 A.</p><p>Loi des nœuds sur le fil du haut : ' + I() + ' + ' + I(1) + ' = ' + I('R2') + ', donc ' + I() + ' = ' + E() + '/' + R(2) + ' − ' + I(1) + ' = 0,15 − 0,1 = 0,05 A = 50 mA.</p>' },
      { t: 'Tension U', html: '<p>La branche du milieu impose ' + I(1) + ' vers le haut : ' + R(1) + ' est traversée par ' + I(1) + ' de bas en haut. Le point M entre la source et ' + R(1) + ' est donc plus bas que le fil du bas : ' + V('M') + ' = 0 − ' + R(1) + I(1) + ' = −20 V.</p><p>' + U() + ' est fléchée vers le haut aux bornes de la source seule : ' + U() + ' = ' + E() + ' − ' + V('M') + ' = ' + E() + ' + ' + R(1) + I(1) + ' = 15 + 20 = 35 V.</p>' }
    ],
    answer: '<p>' + U() + ' = ' + E() + ' + ' + R(1) + I(1) + ' = 35 V ; ' + I() + ' = ' + E() + '/' + R(2) + ' − ' + I(1) + ' = 50 mA</p>',
    traps: [R(1) + ' en série avec la source de courant ne change pas le courant de la branche, mais elle change la tension ' + U() + ' aux bornes de la source.',
      U() + ' n’est fléchée qu’aux bornes de la source, pas aux bornes de la source et de ' + R(1) + ' ensemble (sinon on trouverait ' + E() + ').'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex2-q5', exam: null, kind: 'archive', order: 225,
    src: 'Ancien TD 2 · Ex 2 · Q5', title: 'Trois branches en parallèle, deux sources : la tension U',
    topics: ['kirchhoff', 'potentiels'], lvl: 2, time: 10,
    intro: td2e2 + '<p>' + E(1) + ' = 10 V ; ' + E(2) + ' = 20 V ; ' + R(1) + ' = 2 kΩ ; ' + R(2) + ' = 5 kΩ ; ' + R(3) + ' = 10 kΩ</p>',
    figs: [img('hyp_td2_ex2_fig5', 'Trois branches entre le fil du haut et le fil du bas : R1 au-dessus de E1 (flèche vers le haut), E2 (flèche vers le bas) au-dessus de R2, et R3 avec U fléchée vers le haut', 'Question 5')],
    questions: ['<b>5)</b> Calculer ' + U()],
    hints: ['Fil du bas à 0 V, fil du haut à ' + U() + ' : exprime le courant de chaque branche en fonction de ' + U() + '.',
      'Le + de ' + E(2) + ' est en bas (flèche vers le bas) : le point entre ' + E(2) + ' et ' + R(2) + ' est à ' + U() + ' + ' + E(2) + '.',
      'Loi des nœuds sur le fil du haut, puis isole ' + U() + '.'],
    solution: [
      { t: 'Courant de chaque branche', html: '<p>Fil du bas : 0 V ; fil du haut : ' + U() + '.</p><ul><li>Branche de gauche : le haut de ' + E(1) + ' est à ' + E(1) + ' ; le courant qui monte dans ' + R(1) + ' vaut ' + I(1) + ' = (' + E(1) + ' − ' + U() + ')/' + R(1) + '.</li><li>Branche du milieu : le + de ' + E(2) + ' est en bas, le point entre ' + E(2) + ' et ' + R(2) + ' est à ' + U() + ' + ' + E(2) + ' ; le courant qui descend dans ' + R(2) + ' vaut ' + I(2) + ' = (' + U() + ' + ' + E(2) + ')/' + R(2) + '.</li><li>Branche de droite : ' + I(3) + ' = ' + U() + '/' + R(3) + ' vers le bas.</li></ul>' },
      { t: 'Loi des nœuds', html: '<p>' + I(1) + ' = ' + I(2) + ' + ' + I(3) + ' : ' + F(E(1) + ' − ' + U(), R(1)) + ' = ' + F(U() + ' + ' + E(2), R(2)) + ' + ' + F(U(), R(3)) + '.</p><p>On regroupe les ' + U() + ' : ' + U() + ' (' + F('1', R(1)) + ' + ' + F('1', R(2)) + ' + ' + F('1', R(3)) + ') = ' + F(E(1), R(1)) + ' − ' + F(E(2), R(2)) + ', d’où ' + U() + ' = ' + F(E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2), '1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3)) + ' = ' + F(R(3) + '(' + R(2) + E(1) + ' − ' + R(1) + E(2) + ')', R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3)) + '.</p><p>C’est la formule de Millman (cours 3), retrouvée avec la loi des nœuds.</p>' },
      { t: 'Application numérique', html: '<p>En kΩ et mA : ' + E(1) + '/' + R(1) + ' = 10/2 = 5 mA ; ' + E(2) + '/' + R(2) + ' = 20/5 = 4 mA ; 1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3) + ' = 0,5 + 0,2 + 0,1 = 0,8 mS.</p><p>' + U() + ' = ' + F('5 − 4', '0,8') + ' = 1,25 V.</p><p>Le TD 3 reprend ce circuit (superposition, question 1) : même résultat.</p>' }
    ],
    answer: '<p>' + U() + ' = (' + E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2) + ')/(1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3) + ') = 1,25 V</p>',
    traps: [E(2) + ' est fléchée vers le bas : elle tire le fil du haut vers le bas, d’où le signe − devant ' + E(2) + '/' + R(2) + '.',
      'N’oublie pas 1/' + R(3) + ' dans la somme : ' + R(3) + ' ne contient pas de source, mais elle tire du courant.'],
    official: false
  });

  L.push({
    id: 'hyp-td2-ex2-q6', exam: null, kind: 'archive', order: 226,
    src: 'Ancien TD 2 · Ex 2 · Q6', title: 'Échelle de résistances alimentée par une source de courant',
    topics: ['req', 'diviseurs', 'source-courant'], lvl: 2, time: 8,
    intro: td2e2 + '<p>' + I() + ' = 2 mA ; ' + R() + ' = 1 kΩ</p>',
    figs: [img('hyp_td2_ex2_fig6', 'Source de courant I à gauche ; 2R verticale (U1), R en haut, 2R verticale (U2), R en haut, R verticale (U3)', 'Question 6')],
    questions: ['<b>6)</b> Calculer ' + U(1) + ', ' + U(2) + ' et ' + U(3)],
    hints: ['Réduis l’échelle depuis la droite pour trouver la résistance vue par la source.',
      U(1) + ' = (résistance vue) × ' + I() + '. Ensuite, chaque étage est un diviseur de tension.'],
    solution: [
      { t: 'Résistance vue par la source', html: '<p>Depuis la droite :</p><ol><li>' + R() + ' (verticale) + ' + R() + ' (en haut) = 2' + R() + ' ;</li><li>2' + R() + ' // 2' + R() + ' (verticale du milieu) = ' + R() + ' ;</li><li>' + R() + ' + ' + R() + ' (en haut) = 2' + R() + ' ;</li><li>2' + R() + ' // 2' + R() + ' (verticale de gauche) = ' + R() + '.</li></ol><p>La source voit ' + R() + ' : ' + U(1) + ' = ' + R() + I() + ' = 1 kΩ × 2 mA = 2 V.</p>' },
      { t: 'U2 et U3 par diviseurs', html: '<p>Derrière la 2' + R() + ' de gauche, la ' + R() + ' du haut est en série avec tout ce qui suit, qui vaut ' + R() + ' (étape 2). Diviseur sous ' + U(1) + ' : ' + U(2) + ' = ' + U(1) + ' × ' + F(R(), R() + ' + ' + R()) + ' = ' + F(U(1), '2') + ' = 1 V.</p><p>De même, sous ' + U(2) + ', la ' + R() + ' du haut est en série avec la ' + R() + ' verticale de droite : ' + U(3) + ' = ' + F(U(2), '2') + ' = 0,5 V.</p>' }
    ],
    answer: '<p>' + U(1) + ' = ' + R() + I() + ' = 2 V ; ' + U(2) + ' = 1 V ; ' + U(3) + ' = 0,5 V</p>',
    traps: ['La source ne voit pas que la première 2' + R() + ' : elle voit tout le réseau, qui vaut ' + R() + '.',
      U(2) + ' ≠ ' + U(1) + ' × 2' + R() + '/(' + R() + ' + 2' + R() + ') : la 2' + R() + ' du milieu est en parallèle avec la suite, il faut d’abord les regrouper.'],
    official: false
  });

  /* =====================================================================
     TD 3 : superposition, Thévenin, Norton
     ===================================================================== */
  var td3s = '<p><b>Théorème de superposition</b></p>', td3t = '<p><b>Théorème de Thévenin</b></p>', td3n = '<p><b>Théorème de Norton</b> · <b>Exercice 5 :</b></p>';
  /* circuit commun à la superposition Q1 : R1 sur E1 | E2 sur R2 | R3 */
  function supQ1(e1On) {
    var p = [{ t: 'R', x: 60, y: 85, d: 'v', l: 'R_1' }, { t: 'R', x: 180, y: 155, d: 'v', l: 'R_2' }, { t: 'R', x: 300, y: 120, d: 'v', l: 'R_3', lp: 'w' },
      { t: 'dot', x: 180, y: 40 }, { t: 'dot', x: 180, y: 200 }];
    if (e1On) p.push({ t: 'E', x: 60, y: 155, d: 'v', p: 'n', l: 'E_1' }, { t: 'txt', x: 192, y: 89, s: 'E_2 → fil', a: 'start', c: 'cz-tiny' }, { t: 'U', a: [340, 175], b: [340, 65], l: 'U′' });
    else p.push({ t: 'E', x: 180, y: 85, d: 'v', p: 's', l: 'E_2' }, { t: 'txt', x: 72, y: 159, s: 'E_1 → fil', a: 'start', c: 'cz-tiny' }, { t: 'U', a: [340, 175], b: [340, 65], l: 'U″' });
    return { w: 400, h: 230, aria: e1On ? 'E1 seule : E2 remplacée par un fil' : 'E2 seule : E1 remplacée par un fil', wires: ['M60 40H300V200H60Z', 'M180 40V200'], parts: p };
  }

  L.push({
    id: 'hyp-td3-ex3-q1', exam: null, kind: 'archive', order: 331,
    src: 'Ancien TD 3 · Superposition · Q1', title: 'Superposition : deux sources de tension, une tension U',
    topics: ['superposition', 'diviseurs'], lvl: 2, time: 10,
    intro: td3s + '<p>' + E(1) + ' = 10 V ; ' + R(1) + ' = 2 kΩ ; ' + E(2) + ' = 20 V ; ' + R(2) + ' = 5 kΩ ; ' + R(3) + ' = 10 kΩ</p>',
    figs: [img('hyp_td3_ex3_fig1', 'Trois branches entre le fil du haut et le fil du bas : R1 au-dessus de E1 (flèche vers le haut), E2 (flèche vers le bas) au-dessus de R2, et R3 avec U fléchée vers le haut', 'Question 1')],
    questions: ['<b>1)</b> Calculer U.'],
    hints: ['Garde ' + E(1) + ' seule (' + E(2) + ' remplacée par un fil) et calcule ' + Up + ' ; puis ' + E(2) + ' seule (' + E(1) + ' remplacée par un fil) et calcule ' + Upp + '.',
      'Dans chaque cas, c’est un diviseur de tension : la source voit sa résistance en série avec les deux autres résistances en parallèle.',
      'La flèche de ' + E(2) + ' pointe vers le bas : sa contribution ' + Upp + ' est négative.'],
    solution: [
      { t: 'E1 seule', html: '<p>' + E(2) + ' remplacée par un fil : ' + R(2) + ' et ' + R(3) + ' sont en parallèle entre le fil du haut et le fil du bas, ' + R(2) + ' // ' + R(3) + ' = ' + F('5 × 10', '15') + ' = ' + F('10', '3') + ' kΩ. Diviseur de tension avec ' + R(1) + ' :</p><p>' + Up + ' = ' + E(1) + ' × ' + F(R(2) + ' // ' + R(3), R(1) + ' + ' + R(2) + ' // ' + R(3)) + ' = 10 × ' + F('10/3', '2 + 10/3') + ' = 10 × ' + F('10', '16') + ' = 6,25 V.</p>',
        figs: [{ spec: supQ1(true), cap: 'E1 seule' }] },
      { t: 'E2 seule', html: '<p>' + E(1) + ' remplacée par un fil : ' + R(1) + ' et ' + R(3) + ' sont en parallèle, ' + R(1) + ' // ' + R(3) + ' = ' + F('2 × 10', '12') + ' = ' + F('5', '3') + ' kΩ. La branche ' + E(2) + ' + ' + R(2) + ' est un générateur dont le + est en bas : à vide, elle mettrait le fil du haut à −' + E(2) + '. Diviseur de tension :</p><p>' + Upp + ' = −' + E(2) + ' × ' + F(R(1) + ' // ' + R(3), R(2) + ' + ' + R(1) + ' // ' + R(3)) + ' = −20 × ' + F('5/3', '5 + 5/3') + ' = −20 × ' + F('5', '20') + ' = −5 V.</p>',
        figs: [{ spec: supQ1(false), cap: 'E2 seule' }] },
      { t: 'Superposition', html: '<p>' + U() + ' = ' + Up + ' + ' + Upp + ' = 6,25 − 5 = 1,25 V.</p><p>Littéralement : ' + U() + ' = ' + F(R(3) + '(' + R(2) + E(1) + ' − ' + R(1) + E(2) + ')', R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3)) + '. C’est le même circuit que le TD 2 (exercice 2, question 5) : même résultat par la loi des nœuds.</p><p>Le corrigé manuscrit archivé oublie le signe − de ' + Upp + ' (il écrit ' + R(1) + R(3) + E(2) + ' au numérateur, sans −) ; sa formule finale, trouvée par Kirchhoff, est juste.</p>' }
    ],
    answer: '<p>' + Up + ' = 6,25 V ; ' + Upp + ' = −5 V ; ' + U() + ' = 1,25 V</p>',
    traps: ['Éteindre une source de tension, c’est la remplacer par un fil : la résistance qui était en série avec elle reste en place.',
      E(2) + ' est fléchée vers le bas : elle fait baisser le fil du haut, d’où ' + Upp + ' < 0.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex3-q2', exam: null, kind: 'archive', order: 332,
    src: 'Ancien TD 3 · Superposition · Q2', title: 'Superposition : une source de tension et une source de courant',
    topics: ['superposition', 'source-courant', 'diviseurs'], lvl: 2, time: 12,
    intro: td3s + '<p>' + E(1) + ' = 20 V ; ' + R(1) + ' = 200 Ω ; ' + I(0) + ' = 0,2 A ; ' + R(2) + ' = 100 Ω ; ' + R(3) + ' = 500 Ω ; ' + R(4) + ' = 400 Ω</p>',
    figs: [img('hyp_td3_ex3_fig2', 'E1 à gauche, R1 en haut avec I1 vers la droite, R3 verticale avec I3 vers le bas, source de courant I0 (flèche vers le haut) en série avec R4 à droite, R2 sur le fil du bas', 'Question 2')],
    questions: ['<b>2)</b> Calculer ' + I(1) + ' et ' + I(3) + '.'],
    hints: [E(1) + ' seule : la source ' + I(0) + ' est remplacée par un interrupteur ouvert ; la branche de ' + R(4) + ' ne porte plus de courant.',
      I(0) + ' seule : ' + E(1) + ' est remplacée par un fil. ' + I(0) + ' arrive en haut de ' + R(3) + ' et se partage entre ' + R(3) + ' et le chemin ' + R(1) + ' + ' + R(2) + '.',
      'Garde les sens de ' + I(1) + ' et ' + I(3) + ' du schéma : une contribution peut être négative.'],
    solution: [
      { t: 'E1 seule (I0 ouverte)', html: '<p>La branche de ' + R(4) + ' est coupée. Il reste une maille ' + E(1) + ', ' + R(1) + ', ' + R(3) + ', ' + R(2) + ' :</p><p>' + I(1) + '′ = ' + I(3) + '′ = ' + F(E(1), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = ' + F('20', '800') + ' = 0,025 A = 25 mA.</p>',
        figs: [{ spec: { w: 420, h: 240, aria: 'E1 seule : la source I0 est ouverte, R4 ne porte aucun courant', wires: ['M60 40H250V200H60Z', { d: 'M250 40H350V95', c: 'cz-ghost' }, { d: 'M350 135V200H250', c: 'cz-ghost' }],
          parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E_1' }, { t: 'R', x: 155, y: 40, l: 'R_1' }, { t: 'R', x: 155, y: 200, l: 'R_2', lp: 's' }, { t: 'R', x: 250, y: 125, d: 'v', l: 'R_3' },
            { t: 'R', x: 350, y: 165, d: 'v', l: 'R_4', c: 'cz-ghost' }, { t: 'txt', x: 350, y: 119, s: 'I_0 ouverte', c: 'cz-tiny' },
            { t: 'I', x: 100, y: 40, d: 'e', l: 'I_{1}′' }, { t: 'I', x: 250, y: 70, d: 's', l: 'I_{3}′' }, { t: 'dot', x: 250, y: 40 }, { t: 'dot', x: 250, y: 200 }] },
          cap: 'E1 seule' }] },
      { t: 'I0 seule (E1 remplacée par un fil)', html: '<p>' + R(4) + ' est en série avec la source de courant : elle ne change rien. ' + I(0) + ' arrive en haut de ' + R(3) + ' et se partage entre ' + R(3) + ' et le chemin ' + R(1) + ' + ' + R(2) + ' (qui passe par le fil qui remplace ' + E(1) + '). Diviseur de courant :</p><ul><li>' + I(3) + '″ = ' + I(0) + ' × ' + F(R(1) + ' + ' + R(2), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = 0,2 × ' + F('300', '800') + ' = 0,075 A ;</li><li>dans ' + R(1) + ', le courant va de droite à gauche, contre la flèche de ' + I(1) + ' : ' + I(1) + '″ = −' + I(0) + ' × ' + F(R(3), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = −0,2 × ' + F('500', '800') + ' = −0,125 A.</li></ul>',
        figs: [{ spec: { w: 420, h: 240, aria: 'I0 seule : E1 remplacée par un fil', wires: ['M60 40H350V200H60Z', 'M250 40V200'],
          parts: [{ t: 'txt', x: 72, y: 124, s: 'E_1 → fil', a: 'start', c: 'cz-tiny' }, { t: 'R', x: 155, y: 40, l: 'R_1' }, { t: 'R', x: 155, y: 200, l: 'R_2', lp: 's' }, { t: 'R', x: 250, y: 125, d: 'v', l: 'R_3' },
            { t: 'J', x: 350, y: 95, d: 'v', to: 'n', l: 'I_0', as: 'e' }, { t: 'R', x: 350, y: 160, d: 'v', l: 'R_4' },
            { t: 'I', x: 100, y: 40, d: 'e', l: 'I_{1}″' }, { t: 'I', x: 250, y: 70, d: 's', l: 'I_{3}″' }, { t: 'dot', x: 250, y: 40 }, { t: 'dot', x: 250, y: 200 }] },
          cap: 'I0 seule' }] },
      { t: 'Superposition', html: '<p>' + I(1) + ' = 0,025 − 0,125 = −0,1 A ; ' + I(3) + ' = 0,025 + 0,075 = 0,1 A.</p><p>Contrôle, loi des nœuds en haut de ' + R(3) + ' : ' + I(1) + ' + ' + I(0) + ' = ' + I(3) + ', soit −0,1 + 0,2 = 0,1 A.</p><p>Le corrigé manuscrit archivé écrit « ' + R(1) + R(2) + ' » là où il faut ' + R(1) + ' + ' + R(2) + ' et oublie le signe − de ' + I(1) + '″.</p>' }
    ],
    answer: '<p>' + I(1) + ' = −0,1 A ; ' + I(3) + ' = 0,1 A</p>',
    traps: [R(4) + ' est en série avec la source de courant : elle ne change aucun courant du circuit.',
      'Éteindre ' + I(0) + ', c’est l’ouvrir, pas la remplacer par un fil.',
      'Sous ' + I(0) + ' seule, le courant dans ' + R(1) + ' va vers ' + E(1) + ' : ' + I(1) + '″ est négatif.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex4-q1', exam: null, kind: 'archive', order: 341,
    src: 'Ancien TD 3 · Thévenin · Q1', title: 'Thévenin vu par R4 : un diviseur suivi d’une résistance',
    topics: ['thevenin', 'diviseurs'], lvl: 1, time: 8,
    intro: td3t + '<p>' + E() + ' = 20 V ; ' + R(1) + ' = 10 kΩ ; ' + R(2) + ' = 15 kΩ ; ' + R(3) + ' = 10 kΩ ; ' + R(4) + ' = 4 kΩ</p>',
    figs: [img('hyp_td3_ex4_fig1', 'E à gauche, R1 en haut, R2 verticale, R3 en haut jusqu’à A, R4 entre A et B avec U fléchée vers le haut', 'Question 1')],
    questions: ['<b>1)</b> Déterminer le générateur de Thévenin « vu » par ' + R(4) + ' et en déduire U'],
    hints: ['Débranche ' + R(4) + ' : sans charge, aucun courant ne passe dans ' + R(3) + '.',
      E('th') + ' est alors la tension aux bornes de ' + R(2) + ' (diviseur). Pour ' + R('th') + ', remplace ' + E() + ' par un fil et regarde depuis A et B.'],
    solution: [
      { t: 'Tension de Thévenin (R4 débranchée)', html: '<p>Sans ' + R(4) + ', ' + R(3) + ' n’est traversée par aucun courant : A est au même potentiel que le haut de ' + R(2) + '. ' + R(1) + ' et ' + R(2) + ' forment un diviseur :</p><p>' + E('th') + ' = ' + E() + ' × ' + F(R(2), R(1) + ' + ' + R(2)) + ' = 20 × ' + F('15', '25') + ' = 12 V.</p>',
        figs: [{ spec: { w: 430, h: 225, aria: 'R4 débranchée : E, R1, R2, R3 et les bornes A et B ouvertes', wires: ['M50 40H360', 'M50 180H360', 'M50 40V180', 'M210 40V180'],
          parts: [{ t: 'E', x: 50, y: 110, d: 'v', p: 'n', l: 'E' }, { t: 'R', x: 130, y: 40, l: 'R_1' }, { t: 'R', x: 210, y: 110, d: 'v', l: 'R_2' }, { t: 'R', x: 290, y: 40, l: 'R_3' },
            { t: 'txt', x: 290, y: 66, s: 'I = 0', c: 'cz-tiny' }, { t: 'term', x: 360, y: 40, l: 'A', lp: 'n' }, { t: 'term', x: 360, y: 180, l: 'B', lp: 's' },
            { t: 'U', a: [385, 165], b: [385, 55], l: 'E_th' }, { t: 'dot', x: 210, y: 40 }, { t: 'dot', x: 210, y: 180 }] },
          cap: 'Charge débranchée : tension à vide' }] },
      { t: 'Résistance de Thévenin (E éteinte)', html: '<p>' + E() + ' remplacée par un fil : ' + R(1) + ' et ' + R(2) + ' sont en parallèle, puis ' + R(3) + ' en série jusqu’à A.</p><p>' + R('th') + ' = ' + R(3) + ' + ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' = 10 + ' + F('150', '25') + ' = 10 + 6 = 16 kΩ.</p>',
        figs: [{ spec: { w: 430, h: 225, aria: 'E remplacée par un fil : R1 et R2 en parallèle, puis R3, vus entre A et B', wires: ['M50 40H360', 'M50 180H360', 'M50 40V180', 'M210 40V180'],
          parts: [{ t: 'txt', x: 62, y: 114, s: 'E → fil', a: 'start', c: 'cz-tiny' }, { t: 'R', x: 130, y: 40, l: 'R_1' }, { t: 'R', x: 210, y: 110, d: 'v', l: 'R_2' }, { t: 'R', x: 290, y: 40, l: 'R_3' },
            { t: 'term', x: 360, y: 40, l: 'A', lp: 'n' }, { t: 'term', x: 360, y: 180, l: 'B', lp: 's' }, { t: 'txt', x: 378, y: 115, s: 'R_th', a: 'start' }, { t: 'dot', x: 210, y: 40 }, { t: 'dot', x: 210, y: 180 }] },
          cap: 'Source éteinte : résistance vue entre A et B' }] },
      { t: 'Retour à R4', html: '<p>Le générateur (' + E('th') + ', ' + R('th') + ') alimente ' + R(4) + ' : diviseur de tension.</p><p>' + U() + ' = ' + E('th') + ' × ' + F(R(4), R('th') + ' + ' + R(4)) + ' = 12 × ' + F('4', '20') + ' = 2,4 V.</p>',
        figs: [{ spec: thevLoad('E_th', 'R_th', 'R_4'), cap: E('th') + ' = 12 V, ' + R('th') + ' = 16 kΩ' }] }
    ],
    answer: '<p>' + E('th') + ' = ' + E() + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = 12 V ; ' + R('th') + ' = ' + R(3) + ' + ' + R(1) + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = 16 kΩ ; ' + U() + ' = 2,4 V</p>',
    traps: ['Sans charge, ' + R(3) + ' ne porte aucun courant : elle ne compte pas pour ' + E('th') + ', mais elle compte pour ' + R('th') + '.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex4-q2', exam: null, kind: 'archive', order: 342,
    src: 'Ancien TD 3 · Thévenin · Q2', title: 'Thévenin vu par RC : deux sources et une résistance inutile',
    topics: ['thevenin', 'superposition'], lvl: 2, time: 15,
    intro: td3t + '<p>' + E(1) + ' = 10 V ; ' + R(1) + ' = 3 kΩ ; ' + R(2) + ' = 3 kΩ ; ' + E(2) + ' = 10 V ; ' + R(3) + ' = 6 kΩ ; ' + R(4) + ' = 10 kΩ ; ' + R(5) + ' = 2 kΩ</p>',
    figs: [img('hyp_td3_ex4_fig2', 'E1 en haut à gauche avec R2 en dessous, R1 en haut vers un nœud, R3 de ce nœud vers un point relié à E2 (flèche vers le haut) et à R4 en parallèle, R5 vers A, RC entre A et B avec U', 'Question 2')],
    questions: ['<b>2)</b> Déterminer le générateur de Thévenin « vu » par ' + R('C') + '.', 'Calculer ' + R('C') + ' telle que U = 2 V.'],
    hints: [R(4) + ' est branchée directement aux bornes de la source idéale ' + E(2) + ' : elle ne change pas la tension ' + E(2) + ', et elle disparaît quand on éteint ' + E(2) + '.',
      'Sans charge, ' + R(5) + ' ne porte aucun courant : ' + E('th') + ' est le potentiel du nœud N au bout de ' + R(1) + '. Calcule-le par superposition (' + E(1) + ' seule, puis ' + E(2) + ' seule).',
      R('th') + ' : ' + E(1) + ' et ' + E(2) + ' remplacées par des fils, puis ' + R(5) + ' + (' + R(1) + ' + ' + R(2) + ') // ' + R(3) + '.'],
    solution: [
      { t: 'Tension de Thévenin (RC débranchée)', html: '<p>Fil du bas : 0 V. Plus de courant dans ' + R(5) + ' : ' + E('th') + ' = ' + V('N') + '. Le point P est relié au + de ' + E(2) + ' : il est à ' + E(2) + ' = 10 V, quelle que soit ' + R(4) + '.</p><ul><li>' + E(1) + ' seule (' + E(2) + ' remplacée par un fil, P à 0 V) : une maille ' + E(1) + ', ' + R(1) + ', ' + R(3) + ', ' + R(2) + '. Diviseur : ' + V('N') + '′ = ' + E(1) + ' × ' + F(R(3), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = 10 × ' + F('6', '12') + ' = 5 V.</li><li>' + E(2) + ' seule (' + E(1) + ' remplacée par un fil) : P à 10 V, puis ' + R(3) + ' et ' + R(1) + ' + ' + R(2) + ' en série jusqu’au fil du bas. Diviseur : ' + V('N') + '″ = ' + E(2) + ' × ' + F(R(1) + ' + ' + R(2), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = 10 × ' + F('6', '12') + ' = 5 V.</li></ul><p>' + E('th') + ' = 5 + 5 = 10 V. (Ici ' + E(1) + ' = ' + E(2) + ' : aucun courant ne circule dans la maille, et N reste à 10 V.)</p>',
        figs: [{ spec: { w: 440, h: 255, aria: 'RC débranchée : E1 et R2 à gauche, R1 vers N, R3 vers P, E2 et R4 en parallèle, R5 vers A', wires: ['M60 40H360', 'M60 220H360', 'M60 40V220', 'M200 40V220', 'M200 140H270V220'],
          parts: [{ t: 'E', x: 60, y: 92, d: 'v', p: 'n', l: 'E_1' }, { t: 'R', x: 60, y: 170, d: 'v', l: 'R_2' }, { t: 'R', x: 130, y: 40, l: 'R_1' },
            { t: 'R', x: 200, y: 92, d: 'v', l: 'R_3' }, { t: 'E', x: 200, y: 182, d: 'v', p: 'n', l: 'E_2' }, { t: 'R', x: 270, y: 182, d: 'v', l: 'R_4' },
            { t: 'R', x: 290, y: 40, l: 'R_5' }, { t: 'txt', x: 290, y: 66, s: 'I = 0', c: 'cz-tiny' },
            { t: 'dot', x: 200, y: 40 }, { t: 'txt', x: 200, y: 28, s: 'N', c: 'cz-n' }, { t: 'dot', x: 200, y: 140 }, { t: 'txt', x: 190, y: 137, s: 'P', c: 'cz-n', a: 'end' }, { t: 'dot', x: 200, y: 220 }, { t: 'dot', x: 270, y: 220 },
            { t: 'term', x: 360, y: 40, l: 'A', lp: 'n' }, { t: 'term', x: 360, y: 220, l: 'B', lp: 's' }, { t: 'U', a: [385, 205], b: [385, 55], l: 'E_th' }] },
          cap: 'Charge débranchée : tension à vide' }] },
      { t: 'Résistance de Thévenin (sources éteintes)', html: '<p>' + E(1) + ' et ' + E(2) + ' remplacées par des fils. Le fil qui remplace ' + E(2) + ' court-circuite ' + R(4) + ' et relie P au fil du bas. Depuis N : ' + R(1) + ' + ' + R(2) + ' = 6 kΩ (série, par le fil qui remplace ' + E(1) + ') en parallèle avec ' + R(3) + ' = 6 kΩ, soit 3 kΩ. Puis ' + R(5) + ' en série :</p><p>' + R('th') + ' = ' + R(5) + ' + (' + R(1) + ' + ' + R(2) + ') // ' + R(3) + ' = 2 + 3 = 5 kΩ.</p>',
        figs: [{ spec: { w: 440, h: 255, aria: 'Sources éteintes : R4 court-circuitée ; R1 + R2 en parallèle avec R3, puis R5', wires: ['M60 40H360', 'M60 220H360', 'M60 40V220', 'M200 40V220', { d: 'M200 140H270V220', c: 'cz-ghost' }],
          parts: [{ t: 'txt', x: 72, y: 96, s: 'E_1 → fil', a: 'start', c: 'cz-tiny' }, { t: 'R', x: 60, y: 170, d: 'v', l: 'R_2' }, { t: 'R', x: 130, y: 40, l: 'R_1' },
            { t: 'R', x: 200, y: 92, d: 'v', l: 'R_3' }, { t: 'txt', x: 190, y: 186, s: 'E_2 → fil', a: 'end', c: 'cz-tiny' }, { t: 'R', x: 270, y: 182, d: 'v', l: 'R_4', c: 'cz-ghost' },
            { t: 'R', x: 290, y: 40, l: 'R_5' }, { t: 'dot', x: 200, y: 40 }, { t: 'txt', x: 200, y: 28, s: 'N', c: 'cz-n' }, { t: 'dot', x: 200, y: 220 },
            { t: 'term', x: 360, y: 40, l: 'A', lp: 'n' }, { t: 'term', x: 360, y: 220, l: 'B', lp: 's' }, { t: 'txt', x: 378, y: 135, s: 'R_th', a: 'start' }] },
          cap: 'Sources éteintes : R4 est court-circuitée' }] },
      { t: 'Choix de RC', html: '<p>' + U() + ' = ' + E('th') + ' × ' + F(R('C'), R('th') + ' + ' + R('C')) + ' = 2 V ⇔ 10' + R('C') + ' = 2(5 + ' + R('C') + ') ⇔ 8' + R('C') + ' = 10 ⇔ ' + R('C') + ' = 1,25 kΩ.</p>',
        figs: [{ spec: thevLoad('E_th', 'R_th', 'R_C'), cap: E('th') + ' = 10 V, ' + R('th') + ' = 5 kΩ' }] }
    ],
    answer: '<p>' + E('th') + ' = 10 V ; ' + R('th') + ' = 5 kΩ ; ' + R('C') + ' = 1,25 kΩ</p>',
    traps: [R(4) + ', en parallèle sur une source de tension idéale, ne joue aucun rôle : ni pour ' + E('th') + ', ni pour ' + R('th') + '.',
      'Pour ' + R('th') + ', le fil qui remplace ' + E(2) + ' court-circuite ' + R(4) + ' : ' + R(3) + ' va directement au fil du bas.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex4-q3', exam: null, kind: 'archive', order: 343,
    src: 'Ancien TD 3 · Thévenin · Q3', title: 'Pont de résistances : Thévenin vu par RC et condition d’équilibre',
    topics: ['thevenin', 'diviseurs', 'calcul'], lvl: 2, time: 12,
    intro: td3t,
    figs: [img('hyp_td3_ex4_fig3', 'Pont : E à gauche ; R1 et R2 en série de haut en bas avec le point A au milieu ; R3 et R4 en série avec B au milieu ; RC entre A et B', 'Question 3')],
    questions: ['<b>3) a)</b> Déterminer la tension ' + E('TH') + ' du générateur de Thévenin « vu » par ' + R('C') + ' et en déduire la relation qui doit exister entre les 4 résistances ' + R(1) + ' à ' + R(4) + ' pour que le courant soit nul dans ' + R('C') + ' quelle que soit la valeur de cette résistance.',
      '<b>b)</b> Déterminer l’expression de ' + R('TH') + '.'],
    hints: ['Sans ' + R('C') + ', ' + R(1) + ' et ' + R(2) + ' forment un diviseur de tension sous ' + E() + ', et ' + R(3) + ' et ' + R(4) + ' un autre.',
      E('TH') + ' = ' + V('A') + ' − ' + V('B') + '. Le courant dans ' + R('C') + ' vaut ' + E('TH') + '/(' + R('TH') + ' + ' + R('C') + ') : il est nul pour toute ' + R('C') + ' si et seulement si ' + E('TH') + ' = 0.',
      'Pour ' + R('TH') + ', le fil qui remplace ' + E() + ' relie le haut et le bas du pont : vus de A, ' + R(1) + ' et ' + R(2) + ' sont en parallèle.'],
    solution: [
      { t: 'a) Tension à vide', html: '<p>Fil du bas : 0 V. Sans ' + R('C') + ', deux diviseurs indépendants sous ' + E() + ' :</p><p>' + V('A') + ' = ' + E() + ' × ' + F(R(2), R(1) + ' + ' + R(2)) + ' et ' + V('B') + ' = ' + E() + ' × ' + F(R(4), R(3) + ' + ' + R(4)) + '.</p><p>' + E('TH') + ' = ' + V('A') + ' − ' + V('B') + ' = ' + E() + ' × ' + F(R(2) + '(' + R(3) + ' + ' + R(4) + ') − ' + R(4) + '(' + R(1) + ' + ' + R(2) + ')', '(' + R(1) + ' + ' + R(2) + ')(' + R(3) + ' + ' + R(4) + ')') + ' = ' + E() + ' × ' + F(R(2) + R(3) + ' − ' + R(1) + R(4), '(' + R(1) + ' + ' + R(2) + ')(' + R(3) + ' + ' + R(4) + ')') + '.</p>',
        figs: [{ spec: { w: 360, h: 230, aria: 'RC débranchée : deux diviseurs R1-R2 et R3-R4 sous E ; E_TH fléchée de B vers A', wires: ['M50 40H300V200H50Z', 'M170 40V200'],
          parts: [{ t: 'E', x: 50, y: 120, d: 'v', p: 'n', l: 'E' }, { t: 'R', x: 170, y: 78, d: 'v', l: 'R_1' }, { t: 'R', x: 170, y: 162, d: 'v', l: 'R_2' }, { t: 'R', x: 300, y: 78, d: 'v', l: 'R_3', lp: 'w' }, { t: 'R', x: 300, y: 162, d: 'v', l: 'R_4', lp: 'w' },
            { t: 'dot', x: 170, y: 120 }, { t: 'dot', x: 300, y: 120 }, { t: 'txt', x: 158, y: 125, s: 'A', c: 'cz-n', a: 'end' }, { t: 'txt', x: 312, y: 125, s: 'B', c: 'cz-n', a: 'start' },
            { t: 'U', a: [290, 120], b: [180, 120], l: 'E_TH' }] },
          cap: 'Charge débranchée : deux diviseurs de tension' }] },
      { t: 'a) Condition de courant nul', html: '<p>Le courant dans ' + R('C') + ' vaut ' + E('TH') + '/(' + R('TH') + ' + ' + R('C') + '). Il est nul quelle que soit ' + R('C') + ' si et seulement si ' + E('TH') + ' = 0 :</p><p>' + R(1) + R(4) + ' = ' + R(2) + R(3) + ', c’est-à-dire ' + R(1) + '/' + R(2) + ' = ' + R(3) + '/' + R(4) + ' (pont équilibré).</p>' },
      { t: 'b) Résistance de Thévenin', html: '<p>' + E() + ' remplacée par un fil : le haut et le bas du pont ne forment plus qu’un seul nœud. Vu de A, ' + R(1) + ' et ' + R(2) + ' vont toutes les deux vers ce nœud : elles sont en parallèle. De même pour ' + R(3) + ' et ' + R(4) + ' côté B. Les deux groupes sont en série :</p><p>' + R('TH') + ' = ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' + ' + F(R(3) + R(4), R(3) + ' + ' + R(4)) + '.</p>',
        figs: [{ spec: { w: 420, h: 150, aria: 'E éteinte : R1 en parallèle avec R2, en série avec R3 en parallèle avec R4, entre A et B', wires: ['M40 75H80', 'M80 40H180V110H80Z', 'M180 75H240', 'M240 40H340V110H240Z', 'M340 75H380'],
          parts: [{ t: 'R', x: 130, y: 40, l: 'R_1' }, { t: 'R', x: 130, y: 110, l: 'R_2', lp: 's' }, { t: 'R', x: 290, y: 40, l: 'R_3' }, { t: 'R', x: 290, y: 110, l: 'R_4', lp: 's' },
            { t: 'term', x: 40, y: 75, l: 'A', lp: 'w' }, { t: 'term', x: 380, y: 75, l: 'B', lp: 'e' }, { t: 'dot', x: 80, y: 75 }, { t: 'dot', x: 180, y: 75 }, { t: 'dot', x: 240, y: 75 }, { t: 'dot', x: 340, y: 75 }] },
          cap: 'Source éteinte : le pont redessiné entre A et B' }] }
    ],
    answer: '<p>' + E('TH') + ' = ' + E() + '(' + R(2) + R(3) + ' − ' + R(1) + R(4) + ')/((' + R(1) + ' + ' + R(2) + ')(' + R(3) + ' + ' + R(4) + ')) ; courant nul pour toute ' + R('C') + ' ⇔ ' + R(1) + R(4) + ' = ' + R(2) + R(3) + ' ; ' + R('TH') + ' = ' + R(1) + R(2) + '/(' + R(1) + ' + ' + R(2) + ') + ' + R(3) + R(4) + '/(' + R(3) + ' + ' + R(4) + ')</p>',
    traps: [E('TH') + ' dépend du sens choisi (' + V('A') + ' − ' + V('B') + ' ou l’inverse) : seul le signe change, la condition d’équilibre reste la même.',
      'Pour ' + R('TH') + ', ' + R(1) + ' et ' + R(2) + ' sont en parallèle (et non en série) une fois ' + E() + ' éteinte.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex4-q4', exam: null, kind: 'archive', order: 344,
    src: 'Ancien TD 3 · Thévenin · Q4', title: 'Thévenin vu par RC entre deux diviseurs : trouver E4 pour que I = 0',
    topics: ['thevenin', 'diviseurs'], lvl: 2, time: 12,
    intro: td3t + '<p>' + E(1) + ' = 10 V ; ' + R(1) + ' = 1 kΩ ; ' + R(2) + ' = 3 kΩ ; ' + R(3) + ' = ' + R(4) + ' = 5 kΩ</p>',
    figs: [img('hyp_td3_ex4_fig4', 'E1 à gauche, R1 en haut, R2 verticale, RC en haut avec I vers la droite, R3 verticale, R4 en haut, E4 à droite fléchée vers le haut', 'Question 4')],
    questions: ['<b>4)</b> Calculer le générateur de Thévenin « vu » par ' + R('C') + ' et en déduire ' + E(4) + ' pour que ' + I() + ' = 0 quelle que soit ' + R('C')],
    hints: ['Débranche ' + R('C') + ' : il reste deux diviseurs indépendants, (' + E(1) + ', ' + R(1) + ', ' + R(2) + ') à gauche et (' + E(4) + ', ' + R(4) + ', ' + R(3) + ') à droite.',
      'Avec ' + I() + ' fléché de gauche à droite dans ' + R('C') + ', prends ' + E('th') + ' = (potentiel à gauche de ' + R('C') + ') − (potentiel à droite).',
      I() + ' = ' + E('th') + '/(' + R('th') + ' + ' + R('C') + ') est nul pour toute ' + R('C') + ' si ' + E('th') + ' = 0.'],
    solution: [
      { t: 'Tension de Thévenin (RC débranchée)', html: '<p>Fil du bas : 0 V. Appelle A le bout gauche de ' + R('C') + ' (haut de ' + R(2) + ') et B le bout droit (haut de ' + R(3) + ').</p><ul><li>' + V('A') + ' = ' + E(1) + ' × ' + F(R(2), R(1) + ' + ' + R(2)) + ' = 10 × ' + F('3', '4') + ' = 7,5 V ;</li><li>' + V('B') + ' = ' + E(4) + ' × ' + F(R(3), R(3) + ' + ' + R(4)) + ' = ' + F(E(4), '2') + '.</li></ul><p>' + E('th') + ' = ' + V('A') + ' − ' + V('B') + ' = 7,5 − ' + E(4) + '/2 (en V).</p>',
        figs: [{ spec: { w: 470, h: 230, aria: 'RC débranchée : diviseur E1, R1, R2 à gauche et diviseur E4, R4, R3 à droite ; E_th entre A et B', wires: ['M55 60H210', 'M270 60H415', 'M55 200H415', 'M55 60V200', 'M180 60V200', 'M300 60V200', 'M415 60V200'],
          parts: [{ t: 'E', x: 55, y: 130, d: 'v', p: 'n', l: 'E_1' }, { t: 'R', x: 118, y: 60, l: 'R_1' }, { t: 'R', x: 180, y: 130, d: 'v', l: 'R_2' }, { t: 'R', x: 300, y: 130, d: 'v', l: 'R_3' }, { t: 'R', x: 358, y: 60, l: 'R_4' },
            { t: 'E', x: 415, y: 130, d: 'v', p: 'n', l: 'E_4', as: 'e' }, { t: 'dot', x: 180, y: 60 }, { t: 'dot', x: 300, y: 60 }, { t: 'dot', x: 180, y: 200 }, { t: 'dot', x: 300, y: 200 },
            { t: 'term', x: 210, y: 60, l: 'A', lp: 's' }, { t: 'term', x: 270, y: 60, l: 'B', lp: 's' }, { t: 'U', a: [265, 34], b: [215, 34], l: 'E_th' }] },
          cap: 'Charge débranchée : deux diviseurs indépendants' }] },
      { t: 'Résistance de Thévenin (sources éteintes)', html: '<p>' + E(1) + ' et ' + E(4) + ' remplacées par des fils : à gauche, ' + R(1) + ' // ' + R(2) + ' ; à droite, ' + R(3) + ' // ' + R(4) + ' ; les deux sont en série par le fil du bas.</p><p>' + R('th') + ' = ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' + ' + F(R(3) + R(4), R(3) + ' + ' + R(4)) + ' = 0,75 + 2,5 = 3,25 kΩ.</p>' },
      { t: 'Condition I = 0', html: '<p>' + I() + ' = ' + F(E('th'), R('th') + ' + ' + R('C')) + ' est nul pour toute ' + R('C') + ' si et seulement si ' + E('th') + ' = 0 :</p><p>' + E(4) + ' = 2 × 7,5 = 15 V, soit littéralement ' + E(4) + ' = ' + F(E(1) + R(2) + '(' + R(3) + ' + ' + R(4) + ')', R(3) + '(' + R(1) + ' + ' + R(2) + ')') + '.</p><p>Le corrigé manuscrit archivé part de la bonne égalité ' + R(2) + '(' + R(3) + ' + ' + R(4) + ')' + E(1) + ' = ' + R(3) + '(' + R(1) + ' + ' + R(2) + ')' + E(4) + ', mais isole mal ' + E(4) + ' : il écrit ' + R(3) + R(2) + ' au dénominateur, ce qui donnerait 20 V. Le bon dénominateur est ' + R(3) + '(' + R(1) + ' + ' + R(2) + ') : ' + E(4) + ' = 15 V.</p>',
        figs: [{ spec: thevLoad('E_th', 'R_th', 'R_C', { i: 'I' }), cap: E('th') + ' = 7,5 − ' + E(4) + '/2 (V), ' + R('th') + ' = 3,25 kΩ' }] }
    ],
    answer: '<p>' + E('th') + ' = ' + E(1) + R(2) + '/(' + R(1) + ' + ' + R(2) + ') − ' + E(4) + R(3) + '/(' + R(3) + ' + ' + R(4) + ') = 7,5 − ' + E(4) + '/2 (V) ; ' + R('th') + ' = 3,25 kΩ ; ' + E(4) + ' = 15 V</p>',
    traps: [E('th') + ' est une différence de deux potentiels : choisis le sens (gauche moins droite) en accord avec la flèche de ' + I() + '.',
      'Quand ' + R('C') + ' est débranchée, les deux diviseurs sont indépendants : aucun courant ne passe de l’un à l’autre.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex4-q5', exam: null, kind: 'archive', order: 345,
    src: 'Ancien TD 3 · Thévenin · Q5', title: 'Thévenin vu par la R2 de droite, puis la valeur de R2 qui rend U maximale',
    topics: ['thevenin', 'calcul'], lvl: 3, time: 25,
    intro: td3t,
    figs: [img('hyp_td3_ex4_fig5', 'E1 en haut à gauche fléchée vers le bas et E2 en dessous fléchée vers le haut, reliées au milieu ; R2 du haut et R2 du milieu vers le nœud de droite ; R1 sur le fil du bas et R1 verticale ; R2 de droite aux bornes de laquelle on mesure U', 'Question 5')],
    questions: ['<b>5) a)</b> Calculer le générateur de Thévenin « vu » par la résistance ' + R(2) + ' de droite.',
      '<b>b)</b> Si l’on suppose que ' + R(2) + ' varie, pour quelle valeur de cette résistance (par rapport à ' + R(1) + ') la tension U est-elle maximum ?'],
    hints: ['Nomme X le nœud en haut à droite, Y le nœud en bas à droite, et M le point du milieu à gauche. Les flèches de ' + E(1) + ' et ' + E(2) + ' pointent toutes les deux vers M : prends M comme référence (0 V).',
      'Les deux ' + R(2) + ' qui partent de X vont vers deux points de potentiels connus (−' + E(1) + ' et 0) : remplace-les par un seul générateur de Thévenin (−' + E(1) + '/2, ' + R(2) + '/2). Sans charge, il ne reste qu’une maille.',
      'b) Toutes les ' + R(2) + ' du schéma varient ensemble. Écris ' + U() + ' = ' + E('th') + R(2) + '/(' + R('th') + ' + ' + R(2) + '), divise par ' + R(2) + ' et cherche le minimum du dénominateur.'],
    solution: [
      { t: 'Nommer les points', html: '<p>À gauche, de haut en bas : H (haut de ' + E(1) + '), M (entre ' + E(1) + ' et ' + E(2) + '), Q (bas de ' + E(2) + '). À droite : X en haut, Y en bas ; ' + U() + ' = ' + V('X') + ' − ' + V('Y') + '. Les flèches de ' + E(1) + ' et de ' + E(2) + ' pointent vers M : leurs + sont en M. Avec ' + V('M') + ' = 0 : ' + V('H') + ' = −' + E(1) + ' et ' + V('Q') + ' = −' + E(2) + '.</p><p>Branches : ' + R(2) + ' de H à X, ' + R(2) + ' de M à X, ' + R(1) + ' de Q à Y (fil du bas), ' + R(1) + ' de X à Y (verticale), et la charge ' + R(2) + ' de X à Y.</p>' },
      { t: 'Regrouper les deux R2 de gauche', html: '<p>Vu de X, les deux ' + R(2) + ' relient X à des points de potentiels −' + E(1) + ' et 0. Millman (ou Thévenin) : elles équivalent à une source de ' + F('−' + E(1) + '/' + R(2) + ' + 0', '2/' + R(2)) + ' = −' + E(1) + '/2 (par rapport à M) en série avec ' + R(2) + ' // ' + R(2) + ' = ' + R(2) + '/2. On la dessine fléchée vers M avec la valeur ' + E(1) + '/2.</p>',
        figs: [{ spec: { w: 390, h: 240, aria: 'Les deux R2 de gauche remplacées par une source E1/2 fléchée vers M et R2/2 : une seule maille avec R1, R1 et E2', wires: ['M90 40H240', 'M90 200H240', 'M90 40V200', 'M240 40V200', 'M240 40H310', 'M240 200H310'],
          parts: [{ t: 'E', x: 90, y: 160, d: 'v', p: 'n', l: 'E_2' }, { t: 'E', x: 90, y: 82, d: 'v', p: 's', l: 'E_{1}/2', c: 'cz-hl' }, { t: 'R', x: 165, y: 40, l: 'R_{2}/2', c: 'cz-hl' },
            { t: 'R', x: 240, y: 120, d: 'v', l: 'R_1', lp: 'w' }, { t: 'R', x: 165, y: 200, l: 'R_1', lp: 's' }, { t: 'dot', x: 90, y: 122 }, { t: 'txt', x: 102, y: 127, s: 'M', a: 'start', c: 'cz-n' },
            { t: 'I', x: 240, y: 66, d: 's', l: 'J' }, { t: 'dot', x: 240, y: 40 }, { t: 'dot', x: 240, y: 200 },
            { t: 'term', x: 310, y: 40, l: 'X', lp: 'n' }, { t: 'term', x: 310, y: 200, l: 'Y', lp: 's' }, { t: 'U', a: [335, 185], b: [335, 55], l: 'E_th' }] },
          cap: 'Charge débranchée, après regroupement : une seule maille' }] },
      { t: 'a) Tension de Thévenin', html: '<p>Sans charge, une seule maille M → X → Y → Q → M, parcourue par un courant ' + I('J') + ' (de X vers Y dans la ' + R(1) + ' verticale). En suivant ce sens, la source équivalente compte −' + E(1) + '/2 et ' + E(2) + ' compte +' + E(2) + ' ; résistance totale ' + R(2) + '/2 + 2' + R(1) + ' :</p><p>' + I('J') + ' = ' + F(E(2) + ' − ' + E(1) + '/2', '2' + R(1) + ' + ' + R(2) + '/2') + ' = ' + F('2' + E(2) + ' − ' + E(1), '4' + R(1) + ' + ' + R(2)) + ', puis ' + E('th') + ' = ' + V('X') + ' − ' + V('Y') + ' = ' + R(1) + I('J') + ' = ' + F(R(1) + '(2' + E(2) + ' − ' + E(1) + ')', '4' + R(1) + ' + ' + R(2)) + '.</p>' },
      { t: 'a) Résistance de Thévenin', html: '<p>Sources éteintes : H, M et Q ne forment plus qu’un nœud. Entre X et ce nœud : ' + R(2) + '/2 ; entre ce nœud et Y : ' + R(1) + ' ; entre X et Y : ' + R(1) + '. Donc ' + R(1) + ' (verticale) est en parallèle avec ' + R(2) + '/2 + ' + R(1) + ' :</p><p>' + R('th') + ' = ' + F(R(1) + '(' + R(1) + ' + ' + R(2) + '/2)', '2' + R(1) + ' + ' + R(2) + '/2') + ' = ' + F(R(1) + '(2' + R(1) + ' + ' + R(2) + ')', '4' + R(1) + ' + ' + R(2)) + '.</p>',
        figs: [{ spec: { w: 390, h: 240, aria: 'Sources éteintes : R2/2 entre X et le nœud de gauche, R1 entre ce nœud et Y, R1 entre X et Y', wires: ['M90 40H240', 'M90 200H240', 'M90 40V200', 'M240 40V200', 'M240 40H310', 'M240 200H310'],
          parts: [{ t: 'txt', x: 102, y: 124, s: 'H = M = Q', a: 'start', c: 'cz-tiny' }, { t: 'R', x: 165, y: 40, l: 'R_{2}/2' }, { t: 'R', x: 240, y: 120, d: 'v', l: 'R_1', lp: 'w' }, { t: 'R', x: 165, y: 200, l: 'R_1', lp: 's' },
            { t: 'dot', x: 240, y: 40 }, { t: 'dot', x: 240, y: 200 }, { t: 'term', x: 310, y: 40, l: 'X', lp: 'n' }, { t: 'term', x: 310, y: 200, l: 'Y', lp: 's' }, { t: 'txt', x: 328, y: 125, s: 'R_th', a: 'start' }] },
          cap: 'Sources éteintes : tout le côté gauche est un seul nœud' }] },
      { t: 'b) U en fonction de R2', html: '<p>Toutes les ' + R(2) + ' du schéma ont la même valeur et varient ensemble. Diviseur de tension sur la charge :</p><p>' + U() + ' = ' + E('th') + ' × ' + F(R(2), R('th') + ' + ' + R(2)) + ', avec ' + R('th') + ' + ' + R(2) + ' = ' + F(R(1) + '(2' + R(1) + ' + ' + R(2) + ') + ' + R(2) + '(4' + R(1) + ' + ' + R(2) + ')', '4' + R(1) + ' + ' + R(2)) + ' = ' + F('2' + R(1) + '² + 5' + R(1) + R(2) + ' + ' + R(2) + '²', '4' + R(1) + ' + ' + R(2)) + '.</p><p>D’où ' + U() + ' = ' + F(R(1) + R(2) + '(2' + E(2) + ' − ' + E(1) + ')', '2' + R(1) + '² + 5' + R(1) + R(2) + ' + ' + R(2) + '²') + ' = ' + F(R(1) + '(2' + E(2) + ' − ' + E(1) + ')', '2' + R(1) + '²/' + R(2) + ' + 5' + R(1) + ' + ' + R(2)) + '.</p>' },
      { t: 'b) Maximum', html: '<p>' + U() + ' est maximale quand le dénominateur est minimal, c’est-à-dire quand D(' + R(2) + ') = 2' + R(1) + '²/' + R(2) + ' + ' + R(2) + ' est minimal. D′(' + R(2) + ') = −2' + R(1) + '²/' + R(2) + '² + 1 s’annule pour ' + R(2) + '² = 2' + R(1) + '² :</p><p>' + R(2) + ' = √2 · ' + R(1) + ' ≈ 1,41' + R(1) + '.</p><p>Alors 2' + R(1) + '²/' + R(2) + ' = ' + R(2) + ' = √2' + R(1) + ' et ' + U('max') + ' = ' + F('2' + E(2) + ' − ' + E(1), '5 + 2√2') + ' ≈ 0,13 (2' + E(2) + ' − ' + E(1) + ').</p><p>Le corrigé manuscrit archivé s’arrête avant cette question.</p>' }
    ],
    answer: '<p>' + E('th') + ' = ' + R(1) + '(2' + E(2) + ' − ' + E(1) + ')/(4' + R(1) + ' + ' + R(2) + ') ; ' + R('th') + ' = ' + R(1) + '(2' + R(1) + ' + ' + R(2) + ')/(4' + R(1) + ' + ' + R(2) + ') ; ' + U() + ' maximale pour ' + R(2) + ' = √2 · ' + R(1) + '</p>',
    traps: ['Les flèches de ' + E(1) + ' et ' + E(2) + ' pointent toutes les deux vers le point du milieu : leurs + sont au milieu, pas aux coins.',
      'En b), toutes les ' + R(2) + ' varient. Si seule la charge variait, ' + U() + ' augmenterait sans maximum (elle tendrait vers ' + E('th') + ').',
      'Ce n’est pas l’adaptation de puissance (' + R(2) + ' = ' + R('th') + ') : ici on maximise une tension, et ' + R('th') + ' dépend elle-même de ' + R(2) + '.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex5-q1', exam: null, kind: 'archive', order: 351,
    src: 'Ancien TD 3 · Ex 5 (Norton) · Q1', title: 'Norton vu par RC : une seule source',
    topics: ['thevenin', 'diviseurs'], lvl: 1, time: 8,
    intro: td3n + '<p>' + E() + ' = 10 V ; ' + R(1) + ' = 100 Ω ; ' + R(2) + ' = 200 Ω ; ' + R(3) + ' = 300 Ω ; ' + R('C') + ' = 100 Ω</p>',
    figs: [img('hyp_td3_ex5_fig1', 'E à gauche, R1 sur le fil du haut, R2 sur le fil du bas, R3 verticale, RC à droite avec I et U', 'Question 1')],
    questions: ['<b>1)</b> Calculer le générateur de Norton « vu » par ' + R('C') + ' et en déduire ' + U() + ' et ' + I()],
    hints: [I('N') + ' est le courant dans un fil qui remplace ' + R('C') + ' : ce fil court-circuite aussi ' + R(3) + '.',
      R('N') + ' : ' + E() + ' remplacée par un fil, puis la résistance vue depuis les bornes de ' + R('C') + '.',
      'Pour finir, diviseur de courant entre ' + R('N') + ' et ' + R('C') + '.'],
    solution: [
      { t: 'Courant de Norton (RC remplacée par un fil)', html: '<p>Le fil qui remplace ' + R('C') + ' est aussi branché aux bornes de ' + R(3) + ' : ' + R(3) + ' est court-circuitée, aucun courant ne la traverse. Il reste une maille ' + E() + ', ' + R(1) + ', le fil, ' + R(2) + ' :</p><p>' + I('N') + ' = ' + F(E(), R(1) + ' + ' + R(2)) + ' = ' + F('10', '300') + ' = ' + F('1', '30') + ' A ≈ 33 mA.</p>',
        figs: [{ spec: { w: 380, h: 235, aria: 'RC remplacée par un fil : R3 court-circuitée, I_N dans le fil', wires: ['M50 40H300', 'M50 200H300', 'M50 40V200', 'M220 40V200', { d: 'M300 40V200', c: 'cz-hl' }],
          parts: [{ t: 'E', x: 50, y: 120, d: 'v', p: 'n', l: 'E' }, { t: 'R', x: 135, y: 40, l: 'R_1' }, { t: 'R', x: 135, y: 200, l: 'R_2', lp: 's' }, { t: 'R', x: 220, y: 120, d: 'v', l: 'R_3', c: 'cz-ghost' },
            { t: 'I', x: 300, y: 120, d: 's', l: 'I_N' }, { t: 'dot', x: 220, y: 40 }, { t: 'dot', x: 220, y: 200 }, { t: 'txt', x: 312, y: 72, s: 'fil', a: 'start', c: 'cz-tiny' }] },
          cap: 'Court-circuit à la place de RC : R3 ne porte plus de courant' }] },
      { t: 'Résistance de Norton (E éteinte)', html: '<p>' + E() + ' remplacée par un fil : ' + R(1) + ' et ' + R(2) + ' sont en série (300 Ω), et cet ensemble est en parallèle avec ' + R(3) + ' entre les bornes de ' + R('C') + ' :</p><p>' + R('N') + ' = (' + R(1) + ' + ' + R(2) + ') // ' + R(3) + ' = 300 // 300 = 150 Ω.</p>' },
      { t: 'Retour à RC', html: '<p>Diviseur de courant entre ' + R('N') + ' et ' + R('C') + ' :</p><p>' + I() + ' = ' + I('N') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = ' + F('1', '30') + ' × ' + F('150', '250') + ' = ' + F('1', '30') + ' × ' + F('3', '5') + ' = ' + F('1', '50') + ' A = 20 mA, puis ' + U() + ' = ' + R('C') + I() + ' = 100 × 0,02 = 2 V.</p>',
        figs: [{ spec: nortLoad('I_N', 'R_N', 'R_C', { i: 'I' }), cap: I('N') + ' = 1/30 A, ' + R('N') + ' = 150 Ω' }] }
    ],
    answer: '<p>' + I('N') + ' = ' + E() + '/(' + R(1) + ' + ' + R(2) + ') = 1/30 A ; ' + R('N') + ' = 150 Ω ; ' + I() + ' = 20 mA ; ' + U() + ' = 2 V</p>',
    traps: [R(2) + ' est sur le fil du bas, en série avec ' + R(1) + ' : elle compte autant que ' + R(1) + '.',
      'Diviseur de courant : ' + I() + ' = ' + I('N') + R('N') + '/(' + R('N') + ' + ' + R('C') + '), avec la résistance de l’autre branche au numérateur.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex5-q2', exam: null, kind: 'archive', order: 352,
    src: 'Ancien TD 3 · Ex 5 (Norton) · Q2', title: 'Norton vu par RC : une source de tension et une source de courant',
    topics: ['thevenin', 'source-courant'], lvl: 2, time: 10,
    intro: td3n + '<p>' + E(1) + ' = 10 V ; ' + R(1) + ' = 2 kΩ ; ' + R(2) + ' = 6 kΩ ; ' + I(2) + ' = 13 mA ; ' + R('C') + ' = 10,5 kΩ</p>',
    figs: [img('hyp_td3_ex5_fig2', 'E1 à gauche, R1 en haut, source de courant I2 fléchée vers le bas, R2 verticale, puis RC à droite avec I et U', 'Question 2')],
    questions: ['<b>2)</b> Calculer le générateur de Norton « vu » par ' + R('C') + ' et en déduire ' + U() + ' et ' + I()],
    hints: ['En court-circuit, le fil du haut est à 0 V : ' + R(2) + ' ne porte aucun courant. Fais le bilan des courants qui arrivent sur le fil du haut.',
      'La flèche de ' + I(2) + ' pointe vers le bas : la source retire 13 mA au fil du haut.',
      'Éteindre ' + I(2) + ', c’est l’ouvrir : ' + R('N') + ' = ' + R(1) + ' // ' + R(2) + '.'],
    solution: [
      { t: 'Courant de Norton (RC remplacée par un fil)', html: '<p>Le fil qui remplace ' + R('C') + ' met le fil du haut à 0 V : ' + R(2) + ' n’a aucune tension à ses bornes, donc aucun courant. Loi des nœuds sur le fil du haut :</p><ul><li>' + R(1) + ' apporte ' + E(1) + '/' + R(1) + ' = 10/2 = 5 mA ;</li><li>' + I(2) + ' retire 13 mA (flèche vers le bas).</li></ul><p>' + I('N') + ' = ' + E(1) + '/' + R(1) + ' − ' + I(2) + ' = 5 − 13 = −8 mA.</p>',
        figs: [{ spec: { w: 440, h: 235, aria: 'RC remplacée par un fil : le fil du haut est à 0 V, R2 ne porte aucun courant', wires: ['M50 40H380', 'M50 200H380', 'M50 40V200', 'M220 40V200', 'M300 40V200', { d: 'M380 40V200', c: 'cz-hl' }],
          parts: [{ t: 'E', x: 50, y: 120, d: 'v', p: 'n', l: 'E_1' }, { t: 'R', x: 135, y: 40, l: 'R_1' }, { t: 'J', x: 220, y: 120, d: 'v', to: 's', l: 'I_2' }, { t: 'R', x: 300, y: 120, d: 'v', l: 'R_2', c: 'cz-ghost' },
            { t: 'I', x: 380, y: 120, d: 's', l: 'I_N' }, { t: 'dot', x: 220, y: 40 }, { t: 'dot', x: 300, y: 40 }, { t: 'dot', x: 220, y: 200 }, { t: 'dot', x: 300, y: 200 }] },
          cap: 'Court-circuit à la place de RC : R2 ne porte plus de courant' }] },
      { t: 'Résistance de Norton (sources éteintes)', html: '<p>' + E(1) + ' remplacée par un fil, ' + I(2) + ' ouverte : ' + R(1) + ' et ' + R(2) + ' sont en parallèle entre les bornes de ' + R('C') + '.</p><p>' + R('N') + ' = ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' = ' + F('2 × 6', '8') + ' = 1,5 kΩ.</p>' },
      { t: 'Retour à RC', html: '<p>' + I() + ' = ' + I('N') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = −8 × ' + F('1,5', '12') + ' = −1 mA, puis ' + U() + ' = ' + R('C') + I() + ' = 10,5 kΩ × (−1 mA) = −10,5 V.</p>',
        figs: [{ spec: nortLoad('I_N', 'R_N', 'R_C', { i: 'I' }), cap: I('N') + ' = −8 mA, ' + R('N') + ' = 1,5 kΩ' }] }
    ],
    answer: '<p>' + I('N') + ' = ' + E(1) + '/' + R(1) + ' − ' + I(2) + ' = −8 mA ; ' + R('N') + ' = 1,5 kΩ ; ' + I() + ' = −1 mA ; ' + U() + ' = −10,5 V</p>',
    traps: ['Un ' + I('N') + ' négatif est normal : la source ' + I(2) + ' tire plus de courant que ' + E(1) + ' n’en fournit à travers ' + R(1) + '.',
      U() + ' et ' + I() + ' sont négatifs : le courant réel remonte dans ' + R('C') + '.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex5-q3', exam: null, kind: 'archive', order: 353,
    src: 'Ancien TD 3 · Ex 5 (Norton) · Q3', title: 'Norton vu par RC : trois sources de tension',
    topics: ['thevenin', 'kirchhoff'], lvl: 2, time: 15,
    intro: td3n + '<p>' + E(1) + ' = 10 V ; ' + R(1) + ' = 4 kΩ ; ' + R('C') + ' = 2 kΩ ; ' + E(2) + ' = 9 V ; ' + R(2) + ' = 3 kΩ ; ' + E(3) + ' = 15 V ; ' + R(3) + ' = 6 kΩ</p>',
    figs: [img('hyp_td3_ex5_fig3', 'E1 à gauche, R1 en haut ; branche E2 (flèche vers le bas) puis R2 ; RC avec I vers le bas ; branche R3 puis E3 (flèche vers le bas)', 'Question 3')],
    questions: ['<b>3)</b> Calculer le générateur de Norton « vu » par ' + R('C') + ' et en déduire ' + I() + '.'],
    hints: ['En court-circuit, le fil du haut (nœud N) est à 0 V : le courant de chaque branche se calcule tout seul avec la loi d’Ohm.',
      E(2) + ' et ' + E(3) + ' sont fléchées vers le bas : leur + est en bas. Celui de ' + E(2) + ' est relié à ' + R(2) + ', celui de ' + E(3) + ' au fil du bas.',
      R('N') + ' : une fois les sources éteintes, ' + R(1) + ', ' + R(2) + ' et ' + R(3) + ' sont toutes les trois entre N et le fil du bas.'],
    solution: [
      { t: 'Courant de court-circuit (RC remplacée par un fil)', html: '<p>Fil du bas et nœud N à 0 V. Courant de chaque branche :</p><ul><li>' + E(1) + ', ' + R(1) + ' : le haut de ' + E(1) + ' est à 10 V ; ' + R(1) + ' apporte 10/4 = 2,5 mA à N.</li><li>' + E(2) + ', ' + R(2) + ' : le + de ' + E(2) + ' est en bas, le point entre ' + E(2) + ' et ' + R(2) + ' est à 0 + 9 = 9 V ; ' + R(2) + ' porte 9/3 = 3 mA vers le bas, pris à N.</li><li>' + R(3) + ', ' + E(3) + ' : le + de ' + E(3) + ' est sur le fil du bas, le point entre ' + R(3) + ' et ' + E(3) + ' est à −15 V ; ' + R(3) + ' porte (0 − (−15))/6 = 2,5 mA vers le bas, pris à N.</li></ul><p>Loi des nœuds en N : ' + I('cc') + ' = ' + E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2) + ' − ' + E(3) + '/' + R(3) + ' = 2,5 − 3 − 2,5 = −3 mA (compté dans le sens de ' + I() + ', vers le bas).</p>',
        figs: [{ spec: { w: 450, h: 240, aria: 'RC remplacée par un fil : courants des trois branches vers le nœud N', wires: ['M50 40H380', 'M50 200H380', 'M50 40V200', 'M200 40V200', 'M380 40V200', { d: 'M290 40V200', c: 'cz-hl' }],
          parts: [{ t: 'E', x: 50, y: 120, d: 'v', p: 'n', l: 'E_1' }, { t: 'R', x: 125, y: 40, l: 'R_1' }, { t: 'E', x: 200, y: 85, d: 'v', p: 's', l: 'E_2' }, { t: 'R', x: 200, y: 158, d: 'v', l: 'R_2' },
            { t: 'I', x: 290, y: 120, d: 's', l: 'I_cc' }, { t: 'R', x: 380, y: 85, d: 'v', l: 'R_3', lp: 'w' }, { t: 'E', x: 380, y: 158, d: 'v', p: 's', l: 'E_3', as: 'e' },
            { t: 'dot', x: 200, y: 40 }, { t: 'dot', x: 290, y: 40 }, { t: 'dot', x: 200, y: 200 }, { t: 'dot', x: 290, y: 200 }, { t: 'txt', x: 200, y: 28, s: 'N', c: 'cz-n' }] },
          cap: 'Court-circuit à la place de RC' }] },
      { t: 'Résistance de Norton (sources éteintes)', html: '<p>Les trois sources remplacées par des fils : ' + R(1) + ', ' + R(2) + ' et ' + R(3) + ' sont en parallèle entre N et le fil du bas.</p><p>' + F('1', R('N')) + ' = ' + F('1', '4') + ' + ' + F('1', '3') + ' + ' + F('1', '6') + ' = ' + F('3 + 4 + 2', '12') + ' = ' + F('9', '12') + ', donc ' + R('N') + ' = ' + F('4', '3') + ' kΩ ≈ 1,33 kΩ.</p><p>Littéralement : ' + R('N') + ' = ' + F(R(1) + R(2) + R(3), R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3)) + '.</p>' },
      { t: 'Retour à RC', html: '<p>' + I() + ' = ' + I('cc') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = −3 × ' + F('4/3', '4/3 + 2') + ' = −3 × ' + F('4', '10') + ' = −1,2 mA.</p><p>Le corrigé manuscrit archivé prend ' + R('N') + ' = ' + R(1) + R(2) + R(3) + '/(' + R(1) + ' + ' + R(2) + ' + ' + R(3) + '), formule fausse (elle n’est même pas homogène : des Ω² et non des Ω). Il trouve ainsi ' + I() + ' = −108/49 mA ≈ −2,2 mA au lieu de −1,2 mA. Son ' + I('cc') + ' = −3 mA est juste.</p>',
        figs: [{ spec: nortLoad('I_N', 'R_N', 'R_C', { i: 'I' }), cap: I('N') + ' = ' + I('cc') + ' = −3 mA, ' + R('N') + ' = 4/3 kΩ' }] }
    ],
    answer: '<p>' + I('cc') + ' = ' + E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2) + ' − ' + E(3) + '/' + R(3) + ' = −3 mA ; ' + R('N') + ' = 4/3 kΩ ; ' + I() + ' = −1,2 mA</p>',
    traps: ['Trois résistances en parallèle : ' + R('N') + ' = ' + R(1) + R(2) + R(3) + '/(' + R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3) + '), pas ' + R(1) + R(2) + R(3) + '/(' + R(1) + ' + ' + R(2) + ' + ' + R(3) + ').',
      E(2) + ' est au-dessus de ' + R(2) + ' : son + n’est pas sur le fil du bas mais du côté de ' + R(2) + '.'],
    official: false
  });

  L.push({
    id: 'hyp-td3-ex5-q4', exam: null, kind: 'archive', order: 354,
    src: 'Ancien TD 3 · Ex 5 (Norton) · Q4', title: 'Norton vu par RC : source de courant en parallèle avec R3',
    topics: ['thevenin', 'source-courant', 'millman', 'superposition'], lvl: 3, time: 20,
    intro: td3n + '<p>' + E(1) + ' = 10 V ; ' + R(1) + ' = ' + R(2) + ' = 10 Ω ; ' + I(3) + ' = 5 A ; ' + R(3) + ' = 3 Ω, ' + R(4) + ' = 2 Ω ; ' + R('C') + ' = 8,4 Ω</p>',
    figs: [img('hyp_td3_ex5_fig4', 'E1 en bas à gauche avec R1 au-dessus ; R2 verticale ; sur le fil du haut, R3 en parallèle avec la source de courant I3 fléchée vers la gauche ; R4 verticale ; RC à droite avec I vers la droite', 'Question 4')],
    questions: ['<b>4)</b> Calculer ' + I() + '.'],
    hints: ['Méthode de Norton vue par ' + R('C') + ' : remplace ' + R('C') + ' par un fil (' + R(4) + ' est alors court-circuitée) et cherche ' + I('cc') + '.',
      'Appelle L le nœud en haut à gauche (où se rejoignent ' + R(1) + ', ' + R(2) + ', ' + R(3) + ' et ' + I(3) + ') et N le nœud de droite. En court-circuit, N est à 0 V : Millman en L donne ' + V('L') + ' ; la flèche de ' + I(3) + ' apporte 5 A à L et les prend à N.',
      R('N') + ' : ' + E(1) + ' remplacée par un fil, ' + I(3) + ' ouverte ; ' + R(4) + ' // (' + R(3) + ' + ' + R(1) + ' // ' + R(2) + ').'],
    solution: [
      { t: 'Courant de court-circuit (RC remplacée par un fil)', html: '<p>N et le fil du bas sont à 0 V ; ' + R(4) + ' est court-circuitée. Millman au nœud L (branches : ' + E(1) + ' avec ' + R(1) + ', ' + R(2) + ' vers 0 V, ' + R(3) + ' vers N à 0 V, et ' + I(3) + ' qui entre en L) :</p><p>' + V('L') + ' = ' + F(E(1) + '/' + R(1) + ' + ' + I(3), '1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3)) + ' = ' + F('1 + 5', '1/10 + 1/10 + 1/3') + ' = ' + F('6', '8/15') + ' = 11,25 V.</p><p>Courant de L vers N dans ' + R(3) + ' : 11,25/3 = 3,75 A. En N, ' + I(3) + ' repart vers L (5 A) : ' + I('cc') + ' = 3,75 − 5 = −1,25 A (compté dans le sens de ' + I() + ').</p>',
        figs: [{ spec: { w: 440, h: 250, aria: 'RC remplacée par un fil : R4 court-circuitée ; nœud L entre R1, R2, R3 et I3 ; nœud N à droite', wires: ['M60 70H380', 'M60 220H380', 'M60 70V220', 'M140 70V220', 'M170 70V35H270V70', { d: 'M300 70V220', c: 'cz-ghost' }, { d: 'M380 70V220', c: 'cz-hl' }],
          parts: [{ t: 'R', x: 60, y: 115, d: 'v', l: 'R_1' }, { t: 'E', x: 60, y: 180, d: 'v', p: 'n', l: 'E_1' }, { t: 'R', x: 140, y: 145, d: 'v', l: 'R_2' },
            { t: 'R', x: 220, y: 35, l: 'R_3' }, { t: 'J', x: 220, y: 70, d: 'h', to: 'w', l: 'I_3', as: 's' }, { t: 'R', x: 300, y: 145, d: 'v', l: 'R_4', c: 'cz-ghost' },
            { t: 'I', x: 380, y: 145, d: 's', l: 'I_cc' }, { t: 'dot', x: 140, y: 70 }, { t: 'txt', x: 140, y: 58, s: 'L', c: 'cz-n' }, { t: 'dot', x: 300, y: 70 }, { t: 'txt', x: 300, y: 58, s: 'N', c: 'cz-n' },
            { t: 'dot', x: 170, y: 70 }, { t: 'dot', x: 270, y: 70 }, { t: 'dot', x: 140, y: 220 }, { t: 'dot', x: 300, y: 220 }] },
          cap: 'Court-circuit à la place de RC : R4 ne porte plus de courant' }] },
      { t: 'Contrôle par superposition', html: '<ul><li>' + E(1) + ' seule (' + I(3) + ' ouverte) : ' + V('L') + ' = ' + F(E(1) + '/' + R(1), '8/15') + ' = 15/8 V, ' + I('cc') + '′ = ' + V('L') + '/' + R(3) + ' = 0,625 A.</li><li>' + I(3) + ' seule (' + E(1) + ' remplacée par un fil) : les 5 A arrivés en L reviennent vers N par ' + R(3) + ' (3 Ω) ou par ' + R(1) + ' // ' + R(2) + ' = 5 Ω puis le court-circuit. Dans ' + R(3) + ' : 5 × 5/8 = 3,125 A ; en N : ' + I('cc') + '″ = 3,125 − 5 = −1,875 A.</li></ul><p>' + I('cc') + ' = 0,625 − 1,875 = −1,25 A. Le corrigé manuscrit archivé écrit ' + I('cc') + '′ = ' + E(1) + '/(' + R(1) + ' + ' + R(3) + ') : il oublie ' + R(2) + ', qui détourne une partie du courant vers le fil du bas.</p>' },
      { t: 'Résistance de Norton (sources éteintes)', html: '<p>' + E(1) + ' remplacée par un fil, ' + I(3) + ' ouverte : depuis N, ' + R(4) + ' vers le bas, en parallèle avec ' + R(3) + ' + ' + R(1) + ' // ' + R(2) + ' = 3 + 5 = 8 Ω.</p><p>' + R('N') + ' = 2 // 8 = ' + F('2 × 8', '10') + ' = 1,6 Ω.</p>' },
      { t: 'Retour à RC', html: '<p>' + I() + ' = ' + I('cc') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = −1,25 × ' + F('1,6', '10') + ' = −0,2 A (et ' + U('C') + ' = 8,4 × (−0,2) = −1,68 V).</p>',
        figs: [{ spec: nortLoad('I_N', 'R_N', 'R_C', { i: 'I' }), cap: I('N') + ' = ' + I('cc') + ' = −1,25 A, ' + R('N') + ' = 1,6 Ω' }] }
    ],
    answer: '<p>' + I('cc') + ' = −1,25 A ; ' + R('N') + ' = 1,6 Ω ; ' + I() + ' = −0,2 A</p>',
    traps: ['En court-circuit, ' + R(4) + ' n’est parcourue par aucun courant ; elle revient pour le calcul de ' + R('N') + '.',
      'Éteindre ' + I(3) + ', c’est l’ouvrir : ' + R(3) + ' reste seule sur le fil du haut.',
      'La flèche de ' + I(3) + ' pointe vers la gauche : la source prend son courant au nœud de droite et le donne au nœud de gauche.'],
    official: false
  });
})();
