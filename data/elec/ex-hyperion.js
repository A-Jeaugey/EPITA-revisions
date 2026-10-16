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

  /* Modèles équivalents chargés (même gabarit que le cours 3). */
  function thevLoad(e, r, load, o) {
    o = o || {};
    var a = o.a || 'A', b = o.b || 'B', u = o.u || 'U';
    var parts = [{ t: 'E', x: 50, y: 110, d: 'v', p: 'n', l: e }, { t: 'R', x: 145, y: 40, l: r },
      { t: 'dot', x: 240, y: 40 }, { t: 'dot', x: 240, y: 180 }, { t: 'txt', x: 240, y: 26, s: a, c: 'cz-n' }, { t: 'txt', x: 240, y: 204, s: b, c: 'cz-n' }];
    if (load) parts.push({ t: 'R', x: 240, y: 110, d: 'v', l: load, lp: 'w' }, { t: 'U', a: [278, 165], b: [278, 55], l: u });
    else parts.push({ t: 'U', a: [262, 165], b: [262, 55], l: u });
    if (o.i) parts.push({ t: 'I', x: 205, y: 40, d: 'e', l: o.i });
    return { w: o.w || 330, h: 215, aria: o.aria || 'Générateur de Thévenin équivalent' + (load ? ' chargé' : ''),
      wires: load ? ['M50 40H240V180H50Z'] : ['M50 40H240', 'M50 180H240', 'M50 40V180'], parts: parts };
  }
  function nortLoad(i, r, load, o) {
    o = o || {};
    var a = o.a || 'A', b = o.b || 'B', u = o.u || 'U';
    var parts = [{ t: 'J', x: 50, y: 110, d: 'v', to: 'n', l: i, as: 'e' }, { t: 'R', x: 145, y: 110, d: 'v', l: r },
      { t: 'dot', x: 145, y: 40 }, { t: 'dot', x: 145, y: 180 }, { t: 'R', x: 240, y: 110, d: 'v', l: load, lp: 'w' },
      { t: 'U', a: [278, 165], b: [278, 55], l: u }, { t: 'txt', x: 240, y: 26, s: a, c: 'cz-n' }, { t: 'txt', x: 240, y: 204, s: b, c: 'cz-n' }];
    if (o.i) parts.push({ t: 'I', x: 205, y: 40, d: 'e', l: o.i });
    return { w: o.w || 330, h: 215, aria: o.aria || 'Générateur de Norton équivalent chargé', wires: ['M50 40H240V180H50Z', 'M145 40V180'], parts: parts };
  }

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
})();
