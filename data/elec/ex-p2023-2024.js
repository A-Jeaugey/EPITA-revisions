/* Exercices d’électronique : partiels de nov. 2023 (promo 2028) et d’oct. 2024 (promo 2029), Ex 2 et Ex 3.
   Format : voir elec/entrainement.html. Énoncés verbatim ; corrections vérifiées par calcul (analyse nodale). */
(function () {
  var L = window.ELEC_EX = window.ELEC_EX || [];

  /* ---------- notation ---------- */
  var R = '<var>R</var>', E = '<var class="u">E</var>', I = '<var class="i">I</var>', U = '<var class="u">U</var>';
  var Eth = '<var class="u">E</var><sub>th</sub>', Rth = '<var>R</var><sub>th</sub>';
  function rr(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function uu(n) { return '<var class="u">U</var><sub>' + n + '</sub>'; }
  function ii(n) { return '<var class="i">I</var><sub>' + n + '</sub>'; }
  function vv(n) { return '<var class="v">V</var><sub>' + n + '</sub>'; }
  var RI = R + I, UAB = uu('AB');
  /* étiquette de source de courant posée au-dessus de sa flèche (branches serrées) */
  var ABOVE = [0, -26, 'middle'];

  /* ---------- schémas communs ---------- */
  /* modèle de Thévenin chargé par 2R (figure de droite des Ex 3 Q1) */
  function model(o) {
    o = o || {};
    var x0 = o.x0 || 170, x1 = o.x1 || 340, y1 = o.y1 || 220, cl = o.load || '';
    var parts = [{ t: 'E', x: x0, y: (40 + y1) / 2, d: 'v', p: 'n', l: o.e || 'E_th', c: o.hl ? 'cz-hl' : '' },
      { t: 'R', x: (x0 + x1) / 2, y: 40, l: o.r || 'R_th', c: o.hl ? 'cz-hl' : '' },
      { t: 'R', x: x1, y: (40 + y1) / 2, d: 'v', l: '2R', lp: 'w', c: cl },
      { t: 'dot', x: x1, y: 40 }, { t: 'dot', x: x1, y: y1 },
      { t: 'txt', x: x1, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: x1, y: y1 + 26, s: 'B', c: 'cz-n' }];
    if (o.u !== false) parts.push({ t: 'U', a: [x1 + 32, y1 - 30], b: [x1 + 32, 70], l: 'U', c: cl });
    return { w: o.w || 480, h: o.h || y1 + 60, aria: o.aria || 'Générateur de Thévenin (Eth, Rth) chargé par 2R entre A et B',
      wires: ['M' + x1 + ' 40H' + x0 + 'V' + y1 + 'H' + x1, { d: 'M' + x1 + ' 40V' + y1, c: cl }], parts: parts };
  }

  /* ================= Partiel oct. 2024 (promo 2029) ================= */

  /* Ex 2 : mode 'nodes' (nœuds surlignés) ou 'u' (tensions fléchées) */
  function c24ex2(mode) {
    var wires = ['M70 60H450V280H70Z', 'M160 60V180H315', 'M315 60V280'];
    var parts = [{ t: 'E', x: 70, y: 170, d: 'v', p: 'n', l: '2E' },
      { t: 'I', x: 113, y: 60, d: 'e', l: 'I', lp: 's' }, { t: 'I', x: 195, y: 60, d: 'e', l: 'I_1', lp: 's' },
      { t: 'R', x: 252, y: 60, l: 'R_1', lp: 's' },
      { t: 'R', x: 245, y: 180, l: 'R_2' }, { t: 'I', x: 192, y: 180, d: 'w', l: 'I_2' },
      { t: 'R', x: 315, y: 112, d: 'v', l: 'R_3', lp: 'w' }, { t: 'I', x: 315, y: 157, d: 's', l: 'I_3', lp: 'w', len: 22 },
      { t: 'R', x: 315, y: 222, d: 'v', l: 'R_4', lp: 'w' }, { t: 'I', x: 315, y: 264, d: 's', l: 'I_4', lp: 'w', len: 22 },
      { t: 'I', x: 385, y: 60, d: 'w', l: 'I′', lp: 's' },
      { t: 'E', x: 450, y: 170, d: 'v', p: 'n', l: 'E', as: 'e' },
      { t: 'dot', x: 315, y: 60 }, { t: 'dot', x: 315, y: 180 },
      { t: 'txt', x: 315, y: 47, s: 'A', c: 'cz-n' }, { t: 'txt', x: 328, y: 186, s: 'B', a: 'start', c: 'cz-n' }];
    if (mode === 'nodes') {
      wires.push({ d: 'M70 154V60H229M160 60V180H222', c: 'cz-hl' }, { d: 'M70 186V280H450V186M315 280V245', c: 'cz-hl' });
      parts.push({ t: 'dot', x: 160, y: 60 }, { t: 'dot', x: 315, y: 280 },
        { t: 'txt', x: 160, y: 47, s: 'N', c: 'cz-n' }, { t: 'txt', x: 327, y: 275, s: 'M', a: 'start', c: 'cz-n' });
    }
    if (mode === 'u') parts.push({ t: 'U', a: [274, 40], b: [230, 40], l: 'U_1' }, { t: 'U', a: [223, 200], b: [267, 200], l: 'U_2', lp: 's' },
      { t: 'U', a: [337, 134], b: [337, 90], l: 'U_3' }, { t: 'U', a: [337, 244], b: [337, 200], l: 'U_4' });
    return { w: 505, h: 295, aria: mode === 'u' ? 'Circuit de l’exercice avec les tensions U1 à U4 fléchées en convention récepteur' : mode === 'nodes' ? 'Circuit de l’exercice : les nœuds sans point, N en haut à gauche et M le fil du bas, sont surlignés' : 'Source 2E à gauche, R1 entre la jonction du haut et A, R2 vers B, R3 entre A et B, R4 entre B et le fil du bas, source E à droite',
      wires: wires, parts: parts };
  }

  L.push({
    id: 'p2024-ex2', exam: 'p2024', kind: 'partiel', order: 2, src: 'Partiel oct. 2024 · Ex 2',
    title: 'Lois fondamentales : deux sources, quatre résistances', pts: 6.5,
    topics: ['vocabulaire', 'potentiels', 'kirchhoff'], lvl: 2, time: 15,
    intro: '<p>Soit le circuit ci-contre.</p><p>On donne :<br>' + E + ' = 6 V, ' + UAB + ' = ' + vv('A') + ' − ' + vv('B') + ' = 4 V<br>' +
      ii(1) + ' = 10 mA, ' + ii(3) + ' = 2 mA, ' + ii(4) + ' = 7 mA<br>' + rr(2) + ' = 2 kΩ.</p>',
    figs: [{ spec: c24ex2(), cap: 'Circuit de l’exercice 2' }],
    questions: [
      '<b>1.</b> Dans ce circuit, combien y-a-t-il de : <b>a.</b> Nœuds ? <b>b.</b> Branches ? <b>c.</b> Mailles ?',
      '<b>2.</b> Flécher les différentes tensions sur le schéma en respectant les conventions. On notera ' + uu('i') + ', la tension aux bornes de la résistance ' + rr('i') + ' (c’est-à-dire ' + uu(1) + ' = tension aux bornes de ' + rr(1) + ', ' + uu(2) + ' = tension aux bornes de ' + rr(2) + '…)',
      '<b>3.</b> Quelle est la valeur de la résistance ' + rr(3) + ' ?',
      '<b>4.</b> Calculer l’intensité du courant qui traverse ' + rr(2) + '. En déduire la tension aux bornes de ' + rr(2) + '.',
      '<b>5.</b> Donner l’expression de la tension ' + uu(4) + ' aux bornes de ' + rr(4) + ' puis donner sa valeur.'],
    hints: [
      'Repère tous les nœuds, y compris les jonctions sans point. Un fil continu, même long, ne forme qu’un seul nœud.',
      'Sur une résistance, la flèche de tension est opposée à la flèche de courant (convention récepteur). Pour ' + rr(3) + ', remarque que ' + uu(3) + ' = ' + UAB + '.',
      'Pour ' + ii(2) + ', écris la loi des nœuds en B. Pour ' + uu(4) + ', cherche une maille qui ne contient que ' + E + ', ' + rr(3) + ' et ' + rr(4) + '.'],
    solution: [
      { t: 'Question 1', html: '<p>Un nœud est une jonction d’au moins trois fils, avec ou sans point dessiné. Il y en a <b>4</b> : A, B, la jonction en haut à gauche (appelons-la N) et tout le fil du bas (appelons-le M).</p>' +
          '<p>Une branche va d’un nœud au nœud suivant. Il y en a <b>6</b> : 2' + E + ' (entre N et M), ' + rr(1) + ' (N–A), ' + rr(2) + ' (N–B), ' + rr(3) + ' (A–B), ' + rr(4) + ' (B–M) et ' + E + ' (A–M).</p>' +
          '<p>Une maille est une boucle fermée. En les comptant toutes, on en trouve <b>7</b> :</p><ul>' +
          '<li>quatre boucles de trois branches : (2' + E + ', ' + rr(1) + ', ' + E + '), (2' + E + ', ' + rr(2) + ', ' + rr(4) + '), (' + E + ', ' + rr(3) + ', ' + rr(4) + '), (' + rr(1) + ', ' + rr(3) + ', ' + rr(2) + ') ;</li>' +
          '<li>trois boucles de quatre branches : (2' + E + ', ' + rr(1) + ', ' + rr(3) + ', ' + rr(4) + '), (2' + E + ', ' + rr(2) + ', ' + rr(3) + ', ' + E + '), (' + rr(1) + ', ' + E + ', ' + rr(4) + ', ' + rr(2) + ').</li></ul>' +
          '<p>Seules 3 sont indépendantes (<var>b</var> − <var>n</var> + 1 = 6 − 4 + 1). Le corrigé officiel de 2023 compte toutes les boucles : réponds 7, en précisant que 3 sont indépendantes.</p>',
        figs: [{ spec: c24ex2('nodes'), cap: 'Les deux nœuds sans point : N, la jonction en haut à gauche, et M, tout le fil du bas. Avec A et B, cela fait 4 nœuds.' }] },
      { t: 'Question 2', html: '<p>Les deux sources sont déjà fléchées, en convention générateur. Pour chaque résistance, on prend la convention récepteur : la flèche de tension est dessinée en sens inverse de la flèche de courant.</p><ul>' +
          '<li>' + uu(1) + ' : ' + ii(1) + ' va vers la droite, donc ' + uu(1) + ' pointe vers la gauche, vers N : ' + uu(1) + ' = ' + vv('N') + ' − ' + vv('A') + '.</li>' +
          '<li>' + uu(2) + ' : ' + ii(2) + ' est fléché vers la gauche, donc ' + uu(2) + ' pointe vers la droite, vers B : ' + uu(2) + ' = ' + vv('B') + ' − ' + vv('N') + '.</li>' +
          '<li>' + uu(3) + ' : ' + ii(3) + ' descend, donc ' + uu(3) + ' monte vers A : ' + uu(3) + ' = ' + vv('A') + ' − ' + vv('B') + ' = ' + UAB + '.</li>' +
          '<li>' + uu(4) + ' : ' + ii(4) + ' descend, donc ' + uu(4) + ' monte vers B : ' + uu(4) + ' = ' + vv('B') + ' − ' + vv('M') + '.</li></ul>',
        figs: [{ spec: c24ex2('u'), cap: 'Schéma corrigé : tensions en convention récepteur.' }] },
      { t: 'Question 3', html: '<p>' + uu(3) + ' est fléchée en convention récepteur pour ' + ii(3) + ', et ' + uu(3) + ' = ' + UAB + '. Loi d’Ohm : ' + UAB + ' = ' + rr(3) + '·' + ii(3) + '.</p>' +
          '<p>' + rr(3) + ' = ' + UAB + '/' + ii(3) + ' = 4 V / 2 mA = <b>2 kΩ</b>. Des volts divisés par des milliampères donnent des kiloohms.</p>' },
      { t: 'Question 4', html: '<p>Loi des nœuds en B : ' + ii(3) + ' arrive ; ' + ii(2) + ' (fléché vers N) et ' + ii(4) + ' repartent. Donc ' + ii(3) + ' = ' + ii(2) + ' + ' + ii(4) + '.</p>' +
          '<p>' + ii(2) + ' = ' + ii(3) + ' − ' + ii(4) + ' = 2 − 7 = <b>−5 mA</b>. L’intensité vaut 5 mA. Le signe − signifie que le courant circule en réalité de N vers B, de gauche à droite dans ' + rr(2) + '.</p>' +
          '<p>' + uu(2) + ' est fléchée en convention récepteur pour ' + ii(2) + ' : ' + uu(2) + ' = ' + rr(2) + '·' + ii(2) + ' = 2 kΩ × (−5 mA) = <b>−10 V</b>. Autrement dit ' + vv('N') + ' − ' + vv('B') + ' = 10 V : la borne côté N est la plus haute.</p>' },
      { t: 'Question 5', html: '<p>Loi des mailles sur la maille (' + E + ', ' + rr(3) + ', ' + rr(4) + '), parcourue de M vers A, puis B, puis M : ' + E + ' − ' + uu(3) + ' − ' + uu(4) + ' = 0.</p>' +
          '<p>Donc <b>' + uu(4) + ' = ' + E + ' − ' + UAB + '</b> = 6 − 4 = <b>2 V</b>.</p>' +
          '<p>Vérification par la maille (2' + E + ', ' + rr(2) + ', ' + rr(4) + ') : 2' + E + ' + ' + uu(2) + ' − ' + uu(4) + ' = 0, soit ' + uu(4) + ' = 12 − 10 = 2 V ✓.</p>' },
      { t: 'Pour aller plus loin', html: '<p>Les réponses précédentes suffisent. En prenant M comme référence, les potentiels valent ' + vv('N') + ' = 12 V, ' + vv('A') + ' = 6 V et ' + vv('B') + ' = 2 V. On en déduit :</p><ul>' +
          '<li>' + rr(1) + ' = (12 − 6) V / 10 mA = 600 Ω et ' + rr(4) + ' = 2 V / 7 mA ≈ 286 Ω ;</li>' +
          '<li>en N : ' + I + ' = ' + ii(1) + ' − ' + ii(2) + ' = 10 − (−5) = 15 mA, débités par 2' + E + ' ;</li>' +
          '<li>en A : <var class="i">I′</var> = ' + ii(3) + ' − ' + ii(1) + ' = −8 mA. La source ' + E + ' reçoit 8 mA : elle fonctionne en récepteur.</li></ul>' +
          '<p>' + ii(1) + ' ne sert qu’à ces vérifications.</p>' }],
    answer: '<p>1. 4 nœuds, 6 branches, 7 mailles (dont 3 indépendantes).<br>2. Convention récepteur : ' + uu(1) + ' vers N, ' + uu(2) + ' vers B, ' + uu(3) + ' et ' + uu(4) + ' vers le haut.<br>' +
      '3. ' + rr(3) + ' = 2 kΩ.<br>4. ' + ii(2) + ' = −5 mA (5 mA de N vers B) et ' + uu(2) + ' = ' + rr(2) + '·' + ii(2) + ' = −10 V.<br>5. ' + uu(4) + ' = ' + E + ' − ' + UAB + ' = 2 V.</p>',
    traps: [
      'Oublier les nœuds sans point : la jonction en haut à gauche et le fil du bas sont des nœuds.',
      'Flécher ' + uu(2) + ' dans le même sens que ' + ii(2) + ' : c’est la convention générateur, pas celle d’une résistance.',
      'Écrire ' + ii(2) + ' = ' + ii(3) + ' + ' + ii(4) + ' = 9 mA, ou donner +5 mA sans expliquer le signe.',
      'Donner ' + uu(2) + ' = +10 V sans préciser le sens de la flèche.',
      'Utiliser 2' + E + ' au lieu de ' + E + ' dans la maille de ' + uu(4) + ' : 2' + E + ' − ' + UAB + ' = 8 V est faux.',
      'Conversions : 4 V / 2 mA = 2 kΩ et 2 kΩ × 5 mA = 10 V.'],
    official: false
  });

  /* Ex 3 Q1 : circuit de gauche. o.load : classe de la charge ; o.br : classe de la branche (2E, 4R) ; o.n : nommer N */
  function c24a(o) {
    o = o || {};
    var parts = [{ t: 'J', x: 50, y: 130, d: 'v', to: 'n', l: 'I', as: 'e' },
      { t: 'E', x: 140, y: 85, d: 'v', p: 's', l: '2E', as: 'e', c: o.br || '' }, { t: 'R', x: 140, y: 168, d: 'v', l: '4R', lp: 'w', c: o.br || '' },
      { t: 'R', x: 270, y: 150, l: 'R' }, { t: 'J', x: 270, y: 220, d: 'h', to: 'e', l: '2I', as: 's' },
      { t: 'R', x: 420, y: 130, d: 'v', l: '2R', lp: 'w', c: o.load || '' }, { t: 'U', a: [452, 190], b: [452, 70], l: 'U', c: o.load || '' },
      { t: 'dot', x: 140, y: 40 }, { t: 'dot', x: 140, y: 220 }, { t: 'dot', x: 210, y: 220 }, { t: 'dot', x: 330, y: 220 },
      { t: 'dot', x: 420, y: 40 }, { t: 'dot', x: 420, y: 220 },
      { t: 'txt', x: 420, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 420, y: 246, s: 'B', c: 'cz-n' }];
    if (o.n) parts.push({ t: 'txt', x: 95, y: 244, s: 'N', c: 'cz-n' });
    return { w: 480, h: 280, aria: 'Source de courant I vers le haut, branche 2E (flèche vers le bas) et 4R, bloc R en parallèle avec 2I sur le fil du bas, charge 2R entre A et B',
      wires: ['M420 40H50V220H420', 'M140 40V220', 'M210 220V150H330V220', { d: 'M420 40V220', c: o.load || '' }], parts: parts };
  }
  /* bloc R // 2I entre N et B, commun aux schémas intermédiaires 1 et 2 */
  function bloc24(x0, x1, xb) {
    return [{ t: 'R', x: (x0 + x1) / 2, y: 150, l: 'R' }, { t: 'J', x: (x0 + x1) / 2, y: 220, d: 'h', to: 'e', l: '2I', as: 's' },
      { t: 'R', x: xb, y: 130, d: 'v', l: '2R', lp: 'w', c: 'cz-ghost' },
      { t: 'dot', x: x0, y: 220 }, { t: 'dot', x: x1, y: 220 }, { t: 'dot', x: xb, y: 40 }, { t: 'dot', x: xb, y: 220 },
      { t: 'txt', x: xb, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: xb, y: 246, s: 'B', c: 'cz-n' }, { t: 'txt', x: 95, y: 244, s: 'N', c: 'cz-n' }];
  }
  var S24A1 = { w: 440, h: 280, aria: 'Schéma intermédiaire 1 : entre A et N, source I vers le haut, source E/(2R) vers le bas et 4R ; entre N et B, R en parallèle avec 2I ; charge débranchée',
    wires: ['M400 40H50V220H400', 'M120 40V220', 'M190 40V220', 'M230 220V150H340V220', { d: 'M400 40V220', c: 'cz-ghost' }],
    parts: [{ t: 'J', x: 50, y: 125, d: 'v', to: 'n', l: 'I', as: 'e' },
      { t: 'J', x: 120, y: 125, d: 'v', to: 's', l: 'E/(2R)', as: 'e', lp: ABOVE, c: 'cz-hl' },
      { t: 'R', x: 190, y: 125, d: 'v', l: '4R', c: 'cz-hl' },
      { t: 'dot', x: 120, y: 40 }, { t: 'dot', x: 190, y: 40 }, { t: 'dot', x: 120, y: 220 }, { t: 'dot', x: 190, y: 220 }].concat(bloc24(230, 340, 400)) };
  var S24A2 = { w: 440, h: 280, aria: 'Schéma intermédiaire 2 : entre A et N, source I − E/(2R) vers A en parallèle avec 4R ; entre N et B, R en parallèle avec 2I',
    wires: ['M400 40H50V220H400', 'M190 40V220', 'M230 220V150H340V220', { d: 'M400 40V220', c: 'cz-ghost' }],
    parts: [{ t: 'J', x: 50, y: 125, d: 'v', to: 'n', l: 'I − E/(2R)', as: 'e', c: 'cz-hl' },
      { t: 'R', x: 190, y: 125, d: 'v', l: '4R' },
      { t: 'dot', x: 190, y: 40 }, { t: 'dot', x: 190, y: 220 }].concat(bloc24(230, 340, 400)) };
  var S24A3 = { w: 440, h: 285, aria: 'Schéma intermédiaire 3 : boucle série, de N vers A la fém 4RI − 2E (flèche vers A) et 4R ; de N vers B la fém 2RI (flèche vers B) et R',
    wires: ['M400 40H120V220H400', { d: 'M400 40V220', c: 'cz-ghost' }],
    parts: [{ t: 'R', x: 120, y: 85, d: 'v', l: '4R', lp: 'w' }, { t: 'E', x: 120, y: 160, d: 'v', p: 'n', l: '4RI − 2E', c: 'cz-hl' },
      { t: 'E', x: 205, y: 220, d: 'h', p: 'e', l: '2RI', as: 's', c: 'cz-hl' }, { t: 'R', x: 310, y: 220, l: 'R' },
      { t: 'R', x: 400, y: 130, d: 'v', l: '2R', lp: 'w', c: 'cz-ghost' },
      { t: 'dot', x: 400, y: 40 }, { t: 'dot', x: 400, y: 220 }, { t: 'dot', x: 120, y: 220, r: 3 },
      { t: 'txt', x: 400, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 400, y: 246, s: 'B', c: 'cz-n' }, { t: 'txt', x: 120, y: 246, s: 'N', c: 'cz-n' }] };

  L.push({
    id: 'p2024-ex3a', exam: 'p2024', kind: 'partiel', order: 3.1, src: 'Partiel oct. 2024 · Ex 3 · Q1',
    title: 'Thévenin d’un circuit à trois sources',
    topics: ['thevenin', 'source-courant', 'diviseurs'], lvl: 3, time: 20,
    intro: '<p>Soient les 2 circuits ci-dessous.</p>',
    figs: [{ spec: c24a(), cap: 'Circuit de gauche' }, { spec: model({ h: 280 }), cap: 'Circuit de droite' }],
    questions: [
      '<b>a.</b> Déterminer les expressions de ' + Eth + ' et de ' + Rth + ' – en justifiant vos réponses par des schémas intermédiaires – pour que les 2 circuits ci-dessus soient équivalents.',
      '<b>b.</b> En déduire l’expression de la tension ' + U + ' aux bornes de la résistance 2' + R + ' en fonction de ' + E + ', ' + I + ' et ' + R + '.'],
    hints: [
      'Commence par débrancher la charge 2' + R + ' : on cherche le générateur équivalent à tout ce qui est à gauche de A et B. Repère le fil du bas à gauche (appelle-le N) : ce n’est pas B.',
      'La branche (2' + E + ', 4' + R + ') est entre A et N : transforme-la en Norton. Regarde bien la flèche 2' + E + ' : elle pointe vers le bas.',
      'Regroupe les sources de courant entre A et N, repasse en Thévenin, puis transforme aussi le bloc ' + R + ' // 2' + I + ' (entre N et B) en Thévenin. Il reste une seule boucle : additionne les fém avec leur sens.'],
    solution: [
      { t: 'Question a : principe', html: '<p>On débranche la charge 2' + R + ' et on cherche le générateur de Thévenin équivalent à la partie gauche, vue entre A et B.</p>' +
          '<p>Appelons N le fil du bas à gauche, qui relie le bas de la source ' + I + ' et le bas de la 4' + R + '. Attention : N n’est pas B. Le bloc ' + R + ' // 2' + I + ' est placé entre les deux, sur le fil du retour.</p>',
        figs: [{ spec: c24a({ load: 'cz-ghost', br: 'cz-hl', n: true }), cap: 'Charge débranchée. La branche (2E, 4R), entre A et N, va être transformée.' }] },
      { t: 'Étape 1 : Thévenin → Norton sur (2E, 4R)', html: '<p>La branche (2' + E + ' en série avec 4' + R + ') devient une source de courant 2' + E + '/(4' + R + ') = <b>' + E + '/(2' + R + ')</b> en parallèle avec <b>4' + R + '</b>.</p>' +
          '<p>Sens : la flèche 2' + E + ' pointe vers le bas, donc le + est côté 4' + R + ', côté N. La flèche de la source de Norton pointe elle aussi vers le bas, vers N. La source ' + I + ', elle, pointe vers le haut, vers A.</p>',
        figs: [{ spec: S24A1, cap: 'Schéma intermédiaire 1' }] },
      { t: 'Étape 2 : regroupement des sources de courant', html: '<p>Entre A et N, les deux sources de courant sont en parallèle et de sens opposés. On les remplace par une seule source fléchée vers A : <b>' + I + ' − ' + E + '/(2' + R + ')</b>, toujours en parallèle avec 4' + R + '.</p>',
        figs: [{ spec: S24A2, cap: 'Schéma intermédiaire 2' }] },
      { t: 'Étape 3 : Norton → Thévenin, deux fois', html: '<p>Entre A et N : la source ' + I + ' − ' + E + '/(2' + R + ') en parallèle avec 4' + R + ' devient une fém 4' + R + '·(' + I + ' − ' + E + '/(2' + R + ')) = <b>4' + RI + ' − 2' + E + '</b>, fléchée vers A, en série avec 4' + R + '.</p>' +
          '<p>Entre N et B : le bloc ' + R + ' // 2' + I + ' devient une fém ' + R + '·2' + I + ' = <b>2' + RI + '</b> en série avec ' + R + '. Sa flèche pointe vers B, dans le même sens que la flèche du courant 2' + I + '.</p>',
        figs: [{ spec: S24A3, cap: 'Schéma intermédiaire 3 : tout est en série.' }] },
      { t: 'Étape 4 : mise en série', html: '<p>Il ne reste qu’une boucle. De B vers A, on traverse la fém 2' + RI + ', fléchée vers B (contre le sens de parcours), puis la fém 4' + RI + ' − 2' + E + ', fléchée vers A :</p>' +
          '<p>' + Eth + ' = (4' + RI + ' − 2' + E + ') − 2' + RI + ' = <b>2' + RI + ' − 2' + E + ' = 2(' + RI + ' − ' + E + ')</b>, flèche vers A.</p><p>' + Rth + ' = 4' + R + ' + ' + R + ' = <b>5' + R + '</b>.</p>',
        figs: [{ spec: model({ x0: 190, x1: 380, w: 440, h: 270, e: 'E_th = 2(RI − E)', r: 'R_th = 5R', hl: true, load: 'cz-ghost', u: false }), cap: 'Générateur de Thévenin équivalent' }] },
      { t: 'Question b', html: '<p>On rebranche la charge 2' + R + ' sur le générateur de Thévenin. Diviseur de tension :</p>' +
          '<p>' + U + ' = 2' + R + '/(' + Rth + ' + 2' + R + ') · ' + Eth + ' = (2' + R + '/7' + R + ') · 2(' + RI + ' − ' + E + '), soit <b>' + U + ' = 4(' + RI + ' − ' + E + ')/7</b>.</p>' +
          '<p>' + U + ' est algébrique : si ' + E + ' > ' + RI + ', ' + U + ' est négative.</p>' },
      { t: 'Contrôles', html: '<ul><li>' + Rth + ' par extinction des sources : ' + I + ' et 2' + I + ' deviennent des circuits ouverts, 2' + E + ' un fil. Il reste 4' + R + ' (entre A et N) en série avec ' + R + ' (entre N et B) : 5' + R + ' ✓.</li>' +
          '<li>' + Eth + ' par superposition, à vide : ' + I + ' seule donne ' + vv('A') + ' − ' + vv('N') + ' = 4' + RI + ' ; 2' + E + ' seule ne fait circuler aucun courant et donne ' + vv('A') + ' − ' + vv('N') + ' = −2' + E + ' ; 2' + I + ' seule tourne dans le bloc et donne ' + vv('N') + ' − ' + vv('B') + ' = −2' + RI + '. Somme : 2' + RI + ' − 2' + E + ' ✓.</li>' +
          '<li>Homogénéité : ' + RI + ' et ' + E + ' sont des tensions ✓.</li></ul>' }],
    answer: '<p>' + Eth + ' = 2(' + RI + ' − ' + E + ') = 2' + RI + ' − 2' + E + ' (flèche vers A) et ' + Rth + ' = 5' + R + '.</p><p>' + U + ' = 4(' + RI + ' − ' + E + ')/7.</p>',
    traps: [
      'Lire la flèche 2' + E + ' « + en haut » : on trouve ' + Eth + ' = 2' + RI + ' + 2' + E + ' et ' + U + ' = 4(' + RI + ' + ' + E + ')/7, faux.',
      'Ajouter la fém 2' + RI + ' du bloc ' + R + ' // 2' + I + ' au lieu de la retrancher : on trouve 6' + RI + ' − 2' + E + '.',
      'Garder la charge 2' + R + ' dans le calcul de ' + Eth + ' ou de ' + Rth + '.',
      'Pour ' + Rth + ', remplacer une source de courant par un fil au lieu de l’enlever (circuit ouvert).',
      'Confondre N et B : le bloc ' + R + ' // 2' + I + ' est en série sur le fil du retour.'],
    official: false
  });

  /* Ex 3 Q2 */
  var C24B = { w: 495, h: 255, aria: 'Source E, 4R en haut, 4R verticale, R en haut vers A, R en bas vers B, charge 2R entre A et B, source de courant I fléchée vers le bas à droite',
    wires: ['M60 40H440V220H60Z', 'M200 40V220', 'M330 40V220'],
    parts: [{ t: 'E', x: 60, y: 130, d: 'v', p: 'n', l: 'E' },
      { t: 'R', x: 130, y: 40, l: '4R' }, { t: 'R', x: 200, y: 130, d: 'v', l: '4R' },
      { t: 'R', x: 265, y: 40, l: 'R' }, { t: 'R', x: 265, y: 220, l: 'R' },
      { t: 'R', x: 330, y: 130, d: 'v', l: '2R', lp: 'w' }, { t: 'U', a: [362, 190], b: [362, 70], l: 'U' },
      { t: 'J', x: 440, y: 130, d: 'v', to: 's', l: 'I', as: 'e' },
      { t: 'dot', x: 200, y: 40 }, { t: 'dot', x: 200, y: 220 }, { t: 'dot', x: 330, y: 40 }, { t: 'dot', x: 330, y: 220 },
      { t: 'txt', x: 330, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 330, y: 246, s: 'B', c: 'cz-n' }] };
  /* charge 2R, flèche U et source I de droite, communes aux schémas 1 et 2 */
  function right24b() {
    return [{ t: 'R', x: 330, y: 130, d: 'v', l: '2R', lp: 'w' }, { t: 'U', a: [362, 190], b: [362, 70], l: 'U' },
      { t: 'J', x: 440, y: 130, d: 'v', to: 's', l: 'I', as: 'e' },
      { t: 'dot', x: 330, y: 40 }, { t: 'dot', x: 330, y: 220 },
      { t: 'txt', x: 330, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 330, y: 246, s: 'B', c: 'cz-n' }];
  }
  var S24B1 = { w: 495, h: 255, aria: 'Schéma intermédiaire 1 : E/2 en série avec 2R, puis R en haut vers A et R en bas vers B ; charge 2R et source I inchangées',
    wires: ['M70 40H440V220H70Z', 'M330 40V220'],
    parts: [{ t: 'E', x: 70, y: 130, d: 'v', p: 'n', l: 'E/2', c: 'cz-hl' }, { t: 'R', x: 135, y: 40, l: '2R', c: 'cz-hl' },
      { t: 'R', x: 265, y: 40, l: 'R' }, { t: 'R', x: 265, y: 220, l: 'R' },
      { t: 'txt', x: 200, y: 28, s: 'N_1', c: 'cz-n' }, { t: 'txt', x: 200, y: 246, s: 'N_2', c: 'cz-n' }].concat(right24b()) };
  var S24B2 = { w: 495, h: 255, aria: 'Schéma intermédiaire 2 : E/2 en série avec 4R entre A et B ; charge 2R et source I',
    wires: ['M70 40H440V220H70Z', 'M330 40V220'],
    parts: [{ t: 'E', x: 70, y: 130, d: 'v', p: 'n', l: 'E/2' }, { t: 'R', x: 200, y: 40, l: '4R', c: 'cz-hl' }].concat(right24b()) };
  var S24B3 = { w: 440, h: 255, aria: 'Schéma intermédiaire 3 : en parallèle entre A et B, source E/(8R) vers A, 4R, charge 2R et source I vers B',
    wires: ['M60 40H380V220H60Z', 'M160 40V220', 'M260 40V220'],
    parts: [{ t: 'J', x: 60, y: 125, d: 'v', to: 'n', l: 'E/(8R)', as: 'e', c: 'cz-hl' }, { t: 'R', x: 160, y: 130, d: 'v', l: '4R', c: 'cz-hl' },
      { t: 'R', x: 260, y: 130, d: 'v', l: '2R', lp: 'w' }, { t: 'U', a: [292, 190], b: [292, 70], l: 'U' },
      { t: 'J', x: 380, y: 130, d: 'v', to: 's', l: 'I', as: 'e' },
      { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 160, y: 220 }, { t: 'dot', x: 260, y: 40 }, { t: 'dot', x: 260, y: 220 },
      { t: 'txt', x: 260, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 260, y: 246, s: 'B', c: 'cz-n' }] };
  var S24B4 = { w: 400, h: 255, aria: 'Schéma intermédiaire 4 : source E/(8R) − I vers A, en parallèle avec 4R et la charge 2R',
    wires: ['M60 40H300V220H60Z', 'M200 40V220'],
    parts: [{ t: 'J', x: 60, y: 125, d: 'v', to: 'n', l: 'E/(8R) − I', as: 'e', c: 'cz-hl' }, { t: 'R', x: 200, y: 130, d: 'v', l: '4R' },
      { t: 'R', x: 300, y: 130, d: 'v', l: '2R', lp: 'w' }, { t: 'U', a: [332, 190], b: [332, 70], l: 'U' },
      { t: 'dot', x: 200, y: 40 }, { t: 'dot', x: 200, y: 220 }, { t: 'dot', x: 300, y: 40 }, { t: 'dot', x: 300, y: 220 },
      { t: 'txt', x: 300, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 300, y: 246, s: 'B', c: 'cz-n' }] };

  L.push({
    id: 'p2024-ex3b', exam: 'p2024', kind: 'partiel', order: 3.2, src: 'Partiel oct. 2024 · Ex 3 · Q2',
    title: 'Pont 4R/4R et source de courant : la tension U',
    topics: ['thevenin', 'source-courant', 'diviseurs', 'millman'], lvl: 3, time: 15,
    intro: '<p>Soit le circuit ci-contre.</p>',
    figs: [{ spec: C24B, cap: 'Circuit de la question 2' }],
    questions: ['<b>2.</b> Déterminer l’expression de la tension ' + U + ' en fonction de ' + E + ', ' + I + ' et ' + R + '. Vous pourrez utiliser les équivalences Thévenin/Norton. Justifiez votre réponse.'],
    hints: [
      'Commence par la gauche : la source ' + E + ' et la première 4' + R + ' forment un générateur, chargé par la 4' + R + ' verticale. Remplace cet ensemble par son Thévenin vu aux bornes de la 4' + R + ' verticale.',
      'Les deux ' + R + ' (en haut et en bas) sont en série avec ce générateur. Une fois tout mis en série, passe en Norton : tu te retrouves en parallèle avec 2' + R + ' et la source ' + I + '.',
      'La source ' + I + ' est fléchée vers le bas : elle prélève ' + I + ' au nœud A. Combine les sources de courant avec leur signe, puis ' + U + ' = (résistance équivalente) × (courant total).'],
    solution: [
      { t: 'Étape 1 : Thévenin du pont (E, 4R, 4R)', html: '<p>Appelons N<sub>1</sub> et N<sub>2</sub> les deux bornes de la 4' + R + ' verticale (N<sub>1</sub> en haut). Vu entre N<sub>1</sub> et N<sub>2</sub>, la source ' + E + ' en série avec 4' + R + ' et chargée par la 4' + R + ' verticale est un pont diviseur :</p><ul>' +
          '<li>à vide : ' + E + '·4' + R + '/(4' + R + ' + 4' + R + ') = <b>' + E + '/2</b>, flèche vers N<sub>1</sub> ;</li>' +
          '<li>source éteinte : 4' + R + ' // 4' + R + ' = <b>2' + R + '</b>.</li></ul>' +
          '<p>Par Norton, on trouve la même chose : ' + E + '/(4' + R + ') en parallèle avec 4' + R + ' et 4' + R + ', soit ' + E + '/(4' + R + ') en parallèle avec 2' + R + ', qui redonne 2' + R + ' × ' + E + '/(4' + R + ') = ' + E + '/2.</p>',
        figs: [{ spec: S24B1, cap: 'Schéma intermédiaire 1' }] },
      { t: 'Étape 2 : mise en série', html: '<p>' + E + '/2, 2' + R + ', la ' + R + ' du haut et la ' + R + ' du bas sont parcourues par le même courant : elles sont en série. On obtient ' + E + '/2 en série avec 2' + R + ' + ' + R + ' + ' + R + ' = <b>4' + R + '</b> entre A et B, le + du côté de A.</p>',
        figs: [{ spec: S24B2, cap: 'Schéma intermédiaire 2' }] },
      { t: 'Étape 3 : Thévenin → Norton', html: '<p>La branche (' + E + '/2, 4' + R + ') devient une source de courant (' + E + '/2)/(4' + R + ') = <b>' + E + '/(8' + R + ')</b> fléchée vers A, en parallèle avec 4' + R + '. Tout est maintenant en parallèle entre A et B : cette source, 4' + R + ', la charge 2' + R + ' et la source ' + I + '.</p>',
        figs: [{ spec: S24B3, cap: 'Schéma intermédiaire 3' }] },
      { t: 'Étape 4 : regroupement', html: '<p>La source ' + I + ' est fléchée vers le bas : elle prélève ' + I + ' au nœud A. Les deux sources de courant se combinent en une seule, fléchée vers A : <b>' + E + '/(8' + R + ') − ' + I + '</b>.</p>' +
          '<p>Les résistances : 4' + R + ' // 2' + R + ' = 8' + R + '²/(6' + R + ') = <b>4' + R + '/3</b>.</p>',
        figs: [{ spec: S24B4, cap: 'Schéma intermédiaire 4' }] },
      { t: 'Résultat', html: '<p>' + U + ' = (4' + R + '/3)·(' + E + '/(8' + R + ') − ' + I + ') = ' + E + '/6 − 4' + RI + '/3, soit <b>' + U + ' = (' + E + ' − 8' + RI + ')/6</b>.</p>' },
      { t: 'Contrôles', html: '<ul><li>Millman en A, avec B comme référence : ' + U + ' = ((' + E + '/2)/(4' + R + ') − ' + I + ')/(1/(4' + R + ') + 1/(2' + R + ')) = (' + E + '/(8' + R + ') − ' + I + ')·4' + R + '/3 ✓.</li>' +
          '<li>Superposition : ' + E + ' seule donne (' + E + '/2)·2' + R + '/(4' + R + ' + 2' + R + ') = ' + E + '/6 ; ' + I + ' seule donne −' + I + '·(2' + R + ' // 4' + R + ') = −4' + RI + '/3 ✓.</li>' +
          '<li>Thévenin vu par la 2' + R + ' : 4' + R + '·(' + E + '/(8' + R + ') − ' + I + ') = ' + E + '/2 − 4' + RI + ' en série avec 4' + R + ', puis ' + U + ' = (' + E + '/2 − 4' + RI + ')·2' + R + '/(6' + R + ') ✓.</li></ul>' }],
    answer: '<p>' + U + ' = (' + E + ' − 8' + RI + ')/6 = ' + E + '/6 − 4' + RI + '/3.</p>',
    traps: [
      'Oublier la ' + R + ' du fil du bas : 3' + R + ' au lieu de 4' + R + ' donne (' + E + ' − 6' + RI + ')/5.',
      'Inverser le sens de ' + I + ' : elle prélève du courant en A. Avec le mauvais signe, on trouve (' + E + ' + 8' + RI + ')/6.',
      'Appliquer un diviseur de tension « brut » alors qu’une source de courant est branchée entre A et B.',
      '4' + R + ' // 4' + R + ' = 2' + R + ', pas 8' + R + '.'],
    official: false
  });

  /* ================= Partiel nov. 2023 (promo 2028) ================= */

  /* Ex 2 : mode 'u' = tensions fléchées du corrigé officiel */
  function c23ex2(mode) {
    var parts = [{ t: 'E', x: 60, y: 135, d: 'v', p: 'n', l: 'E' },
      { t: 'I', x: 95, y: 50, d: 'e', l: 'I_1' }, { t: 'R', x: 160, y: 50, l: 'R_1', lp: 's' },
      { t: 'I', x: 240, y: 75, d: 's', l: 'I_2', lp: 'w', len: 22 }, { t: 'R', x: 240, y: 135, d: 'v', l: 'R_2' },
      { t: 'I', x: 275, y: 50, d: 'e', l: 'I_3' }, { t: 'R', x: 345, y: 50, l: 'R_3', lp: 's' },
      { t: 'R', x: 345, y: 220, l: 'R_4' }, { t: 'R', x: 160, y: 220, l: 'R_5' },
      { t: 'dot', x: 240, y: 50 }, { t: 'dot', x: 240, y: 220 },
      { t: 'txt', x: 240, y: 37, s: 'A', c: 'cz-n' }, { t: 'txt', x: 240, y: 246, s: 'B', c: 'cz-n' }];
    if (mode === 'u') parts.push({ t: 'U', a: [182, 30], b: [138, 30], l: 'U_1' }, { t: 'U', a: [218, 157], b: [218, 113], l: 'U_2', lp: 'w' },
      { t: 'U', a: [367, 30], b: [323, 30], l: 'U_3' }, { t: 'U', a: [323, 240], b: [367, 240], l: 'U_4', lp: 's' },
      { t: 'U', a: [138, 240], b: [182, 240], l: 'U_5', lp: 's' },
      { t: 'I', x: 395, y: 220, d: 'w', l: 'I_4' }, { t: 'I', x: 205, y: 220, d: 'w', l: 'I_5' });
    return { w: 460, h: mode === 'u' ? 270 : 255,
      aria: mode === 'u' ? 'Circuit de l’exercice avec les tensions U1 à U5 fléchées en convention récepteur' : 'Source E à gauche, R1 en haut jusqu’à A, R2 entre A et B, R3 en haut à droite, fil vertical à droite, R4 en bas à droite jusqu’à B, R5 en bas à gauche',
      wires: ['M60 50H430V220H60Z', 'M240 50V220'], parts: parts };
  }

  L.push({
    id: 'p2023-ex2', exam: 'p2023', kind: 'partiel', order: 2, src: 'Partiel nov. 2023 · Ex 2',
    title: 'Lois fondamentales : un générateur, cinq résistances', pts: 5,
    topics: ['potentiels', 'kirchhoff'], lvl: 1, time: 12,
    intro: '<p>Soit le circuit ci-contre.</p><p>On donne : ' + E + ' = 12 V, ' + UAB + ' = ' + vv('A') + ' − ' + vv('B') + ' = 4 V, ' + ii(1) + ' = 10 mA, ' + rr(1) + ' = 470 Ω et ' + rr(2) + ' = 1 kΩ.</p>',
    figs: [{ spec: c23ex2(), cap: 'Circuit de l’exercice 2' }],
    questions: [
      '<b>1.</b> Flécher les différentes tensions sur le schéma en respectant les conventions. On notera ' + uu('i') + ', la tension aux bornes de la résistance ' + rr('i') + ' (c’est-à-dire ' + uu(1) + ', la tension aux bornes de ' + rr(1) + ', ' + uu(2) + ', la tension aux bornes de ' + rr(2) + '…)',
      '<b>2.</b> Quelle est l’intensité du courant qui traverse ' + rr(5) + ' ?',
      '<b>3.</b> L’intensité du courant qui traverse ' + rr(4) + ' vaut 6 mA. Calculer l’intensité du courant qui traverse ' + rr(2) + '.',
      '<b>4.</b> Donner l’expression de la tension aux bornes de ' + rr(5) + ' puis donner sa valeur.',
      '<b>5.</b> Etablir l’expression de la tension ' + uu(3) + ' aux bornes ' + rr(3) + ' en fonction des tensions ' + uu(2) + ' et de ' + uu(4) + '. Sachant que la tension aux bornes de ' + rr(4) + ' vaut 1,2 V, donner la valeur de la tension aux bornes de ' + rr(3) + '.'],
    hints: [
      'Sur chaque résistance, la flèche de tension va en sens inverse du courant (convention récepteur). Le bord droit est un simple fil : suis le courant ' + ii(3) + ' jusqu’à ' + rr(4) + '.',
      rr(5) + ' est dans la même branche que ' + E + ' et ' + rr(1) + '. Pour ' + rr(2) + ', deux chemins : la loi d’Ohm avec ' + UAB + ', ou la loi des nœuds en A (' + rr(3) + ' et ' + rr(4) + ' sont en série).',
      'Pour ' + uu(5) + ', écris la loi des mailles sur la grande maille (' + E + ', ' + rr(1) + ', ' + rr(2) + ', ' + rr(5) + '). Pour ' + uu(3) + ', utilise la maille (' + rr(2) + ', ' + rr(3) + ', ' + rr(4) + ').'],
    solution: [
      { t: 'Question 1', html: '<p>On prend la convention récepteur sur chaque résistance : la flèche de tension est opposée au courant. Pour ' + rr(4) + ' et ' + rr(5) + ', il faut d’abord trouver le sens du courant.</p><ul>' +
          '<li>' + uu(1) + ' pointe vers la gauche, au-dessus de ' + rr(1) + ' : ' + ii(1) + ' va vers la droite.</li>' +
          '<li>' + uu(2) + ' pointe vers le haut, le long de ' + rr(2) + ' : ' + ii(2) + ' descend. Ainsi ' + uu(2) + ' = ' + vv('A') + ' − ' + vv('B') + ' = ' + UAB + '.</li>' +
          '<li>' + uu(3) + ' pointe vers la gauche, au-dessus de ' + rr(3) + ' : ' + ii(3) + ' va vers la droite.</li>' +
          '<li>' + uu(4) + ' pointe vers la droite, sous ' + rr(4) + ' : le courant ' + ii(3) + ' redescend par le fil de droite et traverse ' + rr(4) + ' de droite à gauche, vers B.</li>' +
          '<li>' + uu(5) + ' pointe vers la droite, sous ' + rr(5) + ' : le courant revient de B vers la source et traverse ' + rr(5) + ' de droite à gauche.</li></ul>',
        figs: [{ spec: c23ex2('u'), cap: 'Schéma corrigé (corrigé officiel). Les flèches rouges ajoutées à côté de ' + rr(4) + ' et ' + rr(5) + ' montrent le sens du courant.' }] },
      { t: 'Question 2', html: '<p>' + rr(5) + ' est dans la même branche que ' + E + ' et ' + rr(1) + ' : il n’y a aucun nœud entre eux. Le courant qui entre dans un dipôle en ressort, donc ' + rr(5) + ' est traversée par ' + ii(1) + ' = <b>10 mA</b>.</p>' },
      { t: 'Question 3', html: '<p>Méthode 1, loi d’Ohm : ' + uu(2) + ' = ' + UAB + ', donc ' + ii(2) + ' = ' + UAB + '/' + rr(2) + ' = 4 V / 1 kΩ = <b>4 mA</b>.</p>' +
          '<p>Méthode 2, loi des nœuds : le bord droit est un simple fil, donc ' + rr(3) + ' et ' + rr(4) + ' sont en série et ' + ii(3) + ' = 6 mA. En A : ' + ii(1) + ' = ' + ii(2) + ' + ' + ii(3) + ', soit ' + ii(2) + ' = 10 − 6 = <b>4 mA</b>.</p>' +
          '<p>Les deux méthodes concordent : les données sont cohérentes.</p>' },
      { t: 'Question 4', html: '<p>Loi des mailles sur la maille (' + E + ', ' + rr(1) + ', ' + rr(2) + ', ' + rr(5) + ') : ' + E + ' − ' + uu(1) + ' − ' + uu(2) + ' − ' + uu(5) + ' = 0, avec ' + uu(1) + ' = ' + rr(1) + '·' + ii(1) + ' et ' + uu(2) + ' = ' + UAB + '.</p>' +
          '<p><b>' + uu(5) + ' = ' + E + ' − ' + rr(1) + '·' + ii(1) + ' − ' + UAB + '</b> = 12 − 470 × 0,01 − 4 = 12 − 4,7 − 4 = <b>3,3 V</b>.</p>' },
      { t: 'Question 5', html: '<p>Loi des mailles sur la maille (' + rr(2) + ', ' + rr(3) + ', ' + rr(4) + ') : ' + uu(2) + ' − ' + uu(3) + ' − ' + uu(4) + ' = 0, donc <b>' + uu(3) + ' = ' + uu(2) + ' − ' + uu(4) + '</b>.</p>' +
          '<p>' + uu(3) + ' = ' + UAB + ' − ' + uu(4) + ' = 4 − 1,2 = <b>2,8 V</b>.</p>' },
      { t: 'Vérification', html: '<p>Les données sont cohérentes entre elles. On en déduit ' + rr(5) + ' = 3,3 V / 10 mA = 330 Ω, ' + rr(4) + ' = 1,2 V / 6 mA = 200 Ω et ' + rr(3) + ' = 2,8 V / 6 mA ≈ 467 Ω.</p>' }],
    answer: '<p>1. Convention récepteur : ' + uu(1) + ' et ' + uu(3) + ' vers la gauche, ' + uu(2) + ' vers le haut, ' + uu(4) + ' et ' + uu(5) + ' vers la droite.<br>2. ' + ii(1) + ' = 10 mA.<br>3. ' + ii(2) + ' = 4 mA.<br>' +
      '4. ' + uu(5) + ' = ' + E + ' − ' + rr(1) + '·' + ii(1) + ' − ' + UAB + ' = 3,3 V.<br>5. ' + uu(3) + ' = ' + uu(2) + ' − ' + uu(4) + ' = 2,8 V.</p>',
    traps: [
      'Flécher les tensions des résistances dans le sens du courant, comme pour une source.',
      'Ne pas voir que le bord droit est un simple fil : ' + rr(3) + ' et ' + rr(4) + ' sont en série, traversées par le même courant.',
      'Oublier que ' + rr(5) + ' est parcourue par ' + ii(1) + '.',
      'Puissances de dix : 470 Ω × 10 mA = 4,7 V.',
      'Signes dans la loi des mailles : une flèche dans le sens du parcours compte en +, une flèche en sens inverse en −.'],
    official: true
  });

  /* Ex 3 Q1 : circuit de gauche. o.load : charge ; o.b2, o.b4 : branches (E, 2R) et (R, E, R) ; o.nodes : nœuds surlignés */
  function c23a(o) {
    o = o || {};
    var wires = ['M50 40H420V210H50Z', 'M140 40V210', { d: 'M240 40V210', c: o.load || '' }];
    if (o.nodes) wires.push({ d: 'M50 109V40H307M140 40V62M240 40V102', c: 'cz-hl' }, { d: 'M50 141V210H420V191M140 210V181M240 210V148', c: 'cz-hl' });
    return { w: 480, h: 250, aria: 'Source de courant I vers le haut, branche 2R et E, charge 2R entre A et B, branche R, E et R à droite',
      wires: wires,
      parts: [{ t: 'J', x: 50, y: 125, d: 'v', to: 'n', l: 'I', as: 'w' },
        { t: 'R', x: 140, y: 85, d: 'v', l: '2R', c: o.b2 || '' }, { t: 'E', x: 140, y: 165, d: 'v', p: 'n', l: 'E', c: o.b2 || '' },
        { t: 'R', x: 240, y: 125, d: 'v', l: '2R', c: o.load || '' }, { t: 'U', a: [205, 185], b: [205, 65], l: 'U', lp: 'w', c: o.load || '' },
        { t: 'R', x: 330, y: 40, l: 'R', lp: 's', c: o.b4 || '' }, { t: 'E', x: 420, y: 100, d: 'v', p: 'n', l: 'E', as: 'e', c: o.b4 || '' }, { t: 'R', x: 420, y: 168, d: 'v', l: 'R', lp: 'w', c: o.b4 || '' },
        { t: 'dot', x: 140, y: 40 }, { t: 'dot', x: 140, y: 210 }, { t: 'dot', x: 240, y: 40 }, { t: 'dot', x: 240, y: 210 },
        { t: 'txt', x: 240, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 240, y: 236, s: 'B', c: 'cz-n' }] };
  }
  var S23A1 = { w: 450, h: 250, aria: 'Schéma intermédiaire 1 : en parallèle entre A et B, source I, source E/(2R) et 2R, source E/(2R) et 2R, toutes les sources vers A ; charge débranchée',
    wires: ['M50 40H410', 'M50 210H410', 'M50 40V210', 'M120 40V210', 'M190 40V210', 'M260 40V210', 'M330 40V210', { d: 'M410 40V210', c: 'cz-ghost' }],
    parts: [{ t: 'J', x: 50, y: 125, d: 'v', to: 'n', l: 'I', as: 'e' },
      { t: 'J', x: 120, y: 125, d: 'v', to: 'n', l: 'E/(2R)', as: 'e', lp: ABOVE, c: 'cz-hl' }, { t: 'R', x: 190, y: 125, d: 'v', l: '2R', c: 'cz-hl' },
      { t: 'J', x: 260, y: 125, d: 'v', to: 'n', l: 'E/(2R)', as: 'e', lp: ABOVE, c: 'cz-hl' }, { t: 'R', x: 330, y: 125, d: 'v', l: '2R', c: 'cz-hl' },
      { t: 'R', x: 410, y: 125, d: 'v', l: '2R', c: 'cz-ghost' },
      { t: 'dot', x: 120, y: 40 }, { t: 'dot', x: 190, y: 40 }, { t: 'dot', x: 260, y: 40 }, { t: 'dot', x: 330, y: 40 },
      { t: 'dot', x: 120, y: 210 }, { t: 'dot', x: 190, y: 210 }, { t: 'dot', x: 260, y: 210 }, { t: 'dot', x: 330, y: 210 },
      { t: 'dot', x: 410, y: 40 }, { t: 'dot', x: 410, y: 210 }, { t: 'txt', x: 410, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 410, y: 236, s: 'B', c: 'cz-n' }] };
  var S23A2 = { w: 450, h: 250, aria: 'Schéma intermédiaire 2 : source I + E/R vers A en parallèle avec R ; charge débranchée',
    wires: ['M90 40H330', 'M90 210H330', 'M90 40V210', 'M210 40V210', { d: 'M330 40V210', c: 'cz-ghost' }],
    parts: [{ t: 'J', x: 90, y: 125, d: 'v', to: 'n', l: 'I + E/R', as: 'e', c: 'cz-hl' }, { t: 'R', x: 210, y: 125, d: 'v', l: 'R', c: 'cz-hl' },
      { t: 'R', x: 330, y: 125, d: 'v', l: '2R', lp: 'w', c: 'cz-ghost' },
      { t: 'dot', x: 210, y: 40 }, { t: 'dot', x: 210, y: 210 }, { t: 'dot', x: 330, y: 40 }, { t: 'dot', x: 330, y: 210 },
      { t: 'txt', x: 330, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 330, y: 236, s: 'B', c: 'cz-n' }] };

  L.push({
    id: 'p2023-ex3a', exam: 'p2023', kind: 'partiel', order: 3.1, src: 'Partiel nov. 2023 · Ex 3 · Q1',
    title: 'Quatre branches entre A et B : Thévenin puis U',
    topics: ['vocabulaire', 'thevenin', 'source-courant', 'diviseurs'], lvl: 2, time: 20,
    intro: '<p>Soient les 2 circuits ci-dessous.</p>',
    figs: [{ spec: c23a(), cap: 'Circuit de gauche' }, { spec: model({ y1: 210, h: 250 }), cap: 'Circuit de droite' }],
    questions: [
      '<b>a.</b> Dans le circuit de gauche, combien y-a-t-il de : <b>a.</b> Nœuds ? <b>b.</b> Branches ? <b>c.</b> Mailles',
      '<b>b.</b> Déterminer les expressions de ' + Eth + ' et de ' + Rth + ' pour que les 2 circuits ci-dessus soient équivalents.',
      '<b>c.</b> En déduire l’expression de la tension ' + U + ' aux bornes de la résistance 2' + R + ' en fonction de ' + E + ', ' + I + ' et ' + R + '.'],
    hints: [
      'Un nœud relie au moins trois fils, et un fil continu ne forme qu’un seul nœud, même s’il porte plusieurs points. Pour ' + Eth + ' et ' + Rth + ', débranche d’abord la charge 2' + R + '.',
      'À droite, ' + R + ', ' + E + ' et ' + R + ' sont sur le même chemin, sans nœud entre eux : c’est une seule branche, équivalente à ' + E + ' en série avec 2' + R + '.',
      'Transforme chaque branche (' + E + ', 2' + R + ') en Norton : tout se retrouve en parallèle entre A et B. Additionne les sources de courant, combine les résistances, puis repasse en Thévenin.'],
    solution: [
      { t: 'Question a', html: '<p><b>2 nœuds</b> : A, qui est tout le fil du haut, et B, tout le fil du bas.</p>' +
          '<p><b>4 branches</b>, toutes entre A et B : la source ' + I + ' ; 2' + R + ' et ' + E + ' ; la charge 2' + R + ' ; ' + R + ', ' + E + ' et ' + R + '. Plusieurs dipôles en série sans nœud entre eux forment une seule branche.</p>' +
          '<p><b>6 mailles</b> : chaque paire de branches forme une boucle, et il y a 4 × 3 / 2 = 6 paires. Le corrigé officiel compte toutes ces boucles. Seules 3 sont indépendantes (<var>b</var> − <var>n</var> + 1 = 4 − 2 + 1).</p>',
        figs: [{ spec: c23a({ nodes: true }), cap: 'Les 2 nœuds : tout le fil du haut (A) et tout le fil du bas (B).' }] },
      { t: 'Question b : on débranche la charge', html: '<p>On débranche la charge 2' + R + ' et on cherche le générateur équivalent vu entre A et B. Dans la branche de droite, ' + R + ', ' + E + ' et ' + R + ' sont en série : c’est ' + E + ' en série avec 2' + R + ', le + du côté de A comme pour la branche de gauche.</p>',
        figs: [{ spec: c23a({ load: 'cz-ghost', b2: 'cz-hl', b4: 'cz-hl' }), cap: 'Charge débranchée. Les deux branches (E, 2R) vont être transformées.' }] },
      { t: 'Étape 1 : Thévenin → Norton', html: '<p>Chaque branche (' + E + ' en série avec 2' + R + ') devient une source de courant <b>' + E + '/(2' + R + ')</b> en parallèle avec <b>2' + R + '</b>. Le + de chaque source ' + E + ' est du côté de A : les flèches de Norton pointent vers A. Tout est maintenant en parallèle entre A et B.</p>',
        figs: [{ spec: S23A1, cap: 'Schéma intermédiaire 1' }] },
      { t: 'Étape 2 : regroupement', html: '<p>Sources de courant en parallèle, toutes fléchées vers A : ' + I + ' + ' + E + '/(2' + R + ') + ' + E + '/(2' + R + ') = <b>' + I + ' + ' + E + '/' + R + '</b>. Résistances : 2' + R + ' // 2' + R + ' = <b>' + R + '</b> (sans la charge).</p>',
        figs: [{ spec: S23A2, cap: 'Schéma intermédiaire 2 : générateur de Norton' }] },
      { t: 'Étape 3 : Norton → Thévenin', html: '<p>' + Eth + ' = ' + R + '·(' + I + ' + ' + E + '/' + R + ') = <b>' + RI + ' + ' + E + '</b> et <b>' + Rth + ' = ' + R + '</b>.</p>',
        figs: [{ spec: model({ x0: 190, x1: 380, y1: 210, w: 440, h: 250, e: 'E_th = RI + E', r: 'R_th = R', hl: true, load: 'cz-ghost', u: false }), cap: 'Générateur de Thévenin équivalent' }] },
      { t: 'Question c', html: '<p>On rebranche la charge 2' + R + '. Diviseur de tension : ' + U + ' = 2' + R + '/(' + R + ' + 2' + R + ') × (' + RI + ' + ' + E + '), soit <b>' + U + ' = 2(' + RI + ' + ' + E + ')/3</b>.</p>' },
      { t: 'Contrôles', html: '<ul><li>' + Rth + ' par extinction des sources : ' + I + ' devient un circuit ouvert, les deux ' + E + ' des fils. Il reste 2' + R + ' en parallèle avec ' + R + ' + ' + R + ', soit 2' + R + ' // 2' + R + ' = ' + R + ' ✓.</li>' +
          '<li>Millman en A, charge débranchée : ' + Eth + ' = (' + I + ' + ' + E + '/(2' + R + ') + ' + E + '/(2' + R + '))/(1/(2' + R + ') + 1/(2' + R + ')) = ' + R + '·(' + I + ' + ' + E + '/' + R + ') = ' + RI + ' + ' + E + ' ✓.</li>' +
          '<li>Homogénéité : ' + RI + ' et ' + E + ' sont des tensions ✓.</li></ul>' }],
    answer: '<p>a. 2 nœuds, 4 branches, 6 mailles (dont 3 indépendantes).<br>b. ' + Eth + ' = ' + RI + ' + ' + E + ' et ' + Rth + ' = ' + R + '.<br>c. ' + U + ' = 2(' + RI + ' + ' + E + ')/3.</p>',
    traps: [
      'Compter ' + R + ', ' + E + ' et ' + R + ' comme trois branches : il n’y a aucun nœud entre ces dipôles.',
      'Répondre 3 mailles (les indépendantes) alors que le corrigé en attend 6.',
      'Laisser la charge 2' + R + ' dans le calcul de ' + Eth + ' et de ' + Rth + '.',
      'Oublier que les deux ' + R + ' de la branche de droite, séparées par ' + E + ', sont en série.',
      'Flécher une source de Norton vers la borne − : sa flèche pointe vers la borne + de la fém.'],
    official: true
  });

  /* Ex 3 Q2 */
  /* bloc I // R sur la ligne du haut, charge 2R, flèche U, points A et B (communs aux schémas 1 et 2) */
  function right23b() {
    return [{ t: 'J', x: 345, y: 60, d: 'h', to: 'e', l: 'I', as: 'n' }, { t: 'R', x: 345, y: 125, l: 'R' },
      { t: 'R', x: 450, y: 150, d: 'v', l: '2R', lp: 'w' }, { t: 'U', a: [482, 210], b: [482, 90], l: 'U' },
      { t: 'dot', x: 290, y: 60 }, { t: 'dot', x: 400, y: 60 }, { t: 'dot', x: 450, y: 60 }, { t: 'dot', x: 450, y: 240 },
      { t: 'txt', x: 450, y: 48, s: 'A', c: 'cz-n' }, { t: 'txt', x: 450, y: 266, s: 'B', c: 'cz-n' }];
  }
  var C23B = { w: 505, h: 275, aria: 'Source 2E et 6R, source de courant I verticale vers le haut, 6R verticale, bloc source I (vers A) en parallèle avec R sur la ligne du haut, charge 2R entre A et B',
    wires: ['M70 60H450V240H70Z', 'M190 60V240', 'M250 60V240', 'M290 60V125H400V60'],
    parts: [{ t: 'E', x: 70, y: 150, d: 'v', p: 'n', l: '2E' }, { t: 'R', x: 130, y: 60, l: '6R', lp: 's' },
      { t: 'J', x: 190, y: 150, d: 'v', to: 'n', l: 'I', as: 'e' }, { t: 'R', x: 250, y: 150, d: 'v', l: '6R' },
      { t: 'dot', x: 190, y: 60 }, { t: 'dot', x: 250, y: 60 }, { t: 'dot', x: 190, y: 240 }, { t: 'dot', x: 250, y: 240 }].concat(right23b()) };
  var S23B1 = { w: 505, h: 275, aria: 'Schéma intermédiaire 1 : source E/(3R) vers le haut en parallèle avec 6R, puis source I, 6R, bloc I // R et charge 2R',
    wires: ['M70 60H450V240H70Z', 'M130 60V240', 'M190 60V240', 'M250 60V240', 'M290 60V125H400V60'],
    parts: [{ t: 'J', x: 70, y: 150, d: 'v', to: 'n', l: 'E/(3R)', as: 'e', lp: ABOVE, c: 'cz-hl' }, { t: 'R', x: 130, y: 150, d: 'v', l: '6R', c: 'cz-hl' },
      { t: 'J', x: 190, y: 150, d: 'v', to: 'n', l: 'I', as: 'e' }, { t: 'R', x: 250, y: 150, d: 'v', l: '6R' },
      { t: 'dot', x: 130, y: 60 }, { t: 'dot', x: 190, y: 60 }, { t: 'dot', x: 250, y: 60 }, { t: 'dot', x: 130, y: 240 }, { t: 'dot', x: 190, y: 240 }, { t: 'dot', x: 250, y: 240 },
      { t: 'txt', x: 160, y: 48, s: 'N_1', c: 'cz-n' }].concat(right23b()) };
  var S23B2 = { w: 505, h: 275, aria: 'Schéma intermédiaire 2 : source E/(3R) + I vers le haut en parallèle avec 3R, puis bloc I // R et charge 2R',
    wires: ['M70 60H450V240H70Z', 'M210 60V240', 'M290 60V125H400V60'],
    parts: [{ t: 'J', x: 70, y: 150, d: 'v', to: 'n', l: 'E/(3R) + I', as: 'e', c: 'cz-hl' }, { t: 'R', x: 210, y: 150, d: 'v', l: '3R', c: 'cz-hl' },
      { t: 'dot', x: 210, y: 60 }, { t: 'dot', x: 210, y: 240 }, { t: 'txt', x: 250, y: 48, s: 'N_1', c: 'cz-n' }].concat(right23b()) };
  var S23B3 = { w: 505, h: 275, aria: 'Schéma intermédiaire 3 : boucle série, fém E + 3RI (vers le haut), 3R, fém RI (vers A), R, charge 2R',
    wires: ['M130 60H450V240H130Z'],
    parts: [{ t: 'E', x: 130, y: 150, d: 'v', p: 'n', l: 'E + 3RI', c: 'cz-hl' }, { t: 'R', x: 200, y: 60, l: '3R' },
      { t: 'E', x: 310, y: 60, d: 'h', p: 'e', l: 'RI', as: 'n', c: 'cz-hl' }, { t: 'R', x: 390, y: 60, l: 'R' },
      { t: 'R', x: 450, y: 150, d: 'v', l: '2R', lp: 'w' }, { t: 'U', a: [482, 210], b: [482, 90], l: 'U' },
      { t: 'dot', x: 450, y: 60 }, { t: 'dot', x: 450, y: 240 }, { t: 'txt', x: 252, y: 84, s: 'N_1', c: 'cz-n' },
      { t: 'txt', x: 450, y: 48, s: 'A', c: 'cz-n' }, { t: 'txt', x: 450, y: 266, s: 'B', c: 'cz-n' }] };
  var S23B4 = { w: 505, h: 275, aria: 'Schéma intermédiaire 4 : fém E + 4RI en série avec 4R, chargée par 2R',
    wires: ['M130 60H450V240H130Z'],
    parts: [{ t: 'E', x: 130, y: 150, d: 'v', p: 'n', l: 'E + 4RI', c: 'cz-hl' }, { t: 'R', x: 290, y: 60, l: '4R', c: 'cz-hl' },
      { t: 'R', x: 450, y: 150, d: 'v', l: '2R', lp: 'w' }, { t: 'U', a: [482, 210], b: [482, 90], l: 'U' },
      { t: 'dot', x: 450, y: 60 }, { t: 'dot', x: 450, y: 240 },
      { t: 'txt', x: 450, y: 48, s: 'A', c: 'cz-n' }, { t: 'txt', x: 450, y: 266, s: 'B', c: 'cz-n' }] };

  L.push({
    id: 'p2023-ex3b', exam: 'p2023', kind: 'partiel', order: 3.2, src: 'Partiel nov. 2023 · Ex 3 · Q2',
    title: 'Deux sources de courant et un bloc I // R',
    topics: ['thevenin', 'source-courant', 'diviseurs'], lvl: 3, time: 15,
    intro: '<p>Soit le circuit ci-contre.</p>',
    figs: [{ spec: C23B, cap: 'Circuit de la question 2' }],
    questions: ['<b>2.</b> Déterminer l’expression de la tension ' + U + ' en fonction de ' + E + ', ' + I + ' et ' + R + '. Vous pourrez utiliser les équivalences Thévenin/Norton.'],
    hints: [
      'Commence par la gauche : la source 2' + E + ' en série avec 6' + R + ' se transforme en Norton. Le reste ne bouge pas.',
      'Regroupe ce qui est en parallèle entre N<sub>1</sub> (le nœud juste après la 6' + R + ' du haut) et B : deux sources de courant et deux 6' + R + '.',
      'Le bloc « ' + I + ' en parallèle avec ' + R + ' » est en série sur la ligne du haut : remplace-le par une fém ' + RI + ' fléchée vers A, en série avec ' + R + '. Tout est alors en série : diviseur de tension sur 2' + R + '.'],
    solution: [
      { t: 'Étape 1 : Thévenin → Norton', html: '<p>Appelons N<sub>1</sub> le nœud situé juste après la 6' + R + ' du haut. Le générateur (2' + E + ', 6' + R + ') devient une source de courant 2' + E + '/(6' + R + ') = <b>' + E + '/(3' + R + ')</b>, fléchée vers le haut (vers N<sub>1</sub>), en parallèle avec <b>6' + R + '</b>.</p>' +
          '<p>Le reste ne change pas : la source ' + I + ' verticale, la 6' + R + ' verticale, le bloc ' + I + ' // ' + R + ' et la charge 2' + R + '.</p>',
        figs: [{ spec: S23B1, cap: 'Schéma intermédiaire 1' }] },
      { t: 'Étape 2 : regroupement', html: '<p>Entre N<sub>1</sub> et B, les deux sources de courant sont fléchées vers N<sub>1</sub> : elles s’additionnent, <b>' + E + '/(3' + R + ') + ' + I + '</b>. Les deux 6' + R + ' en parallèle donnent 6' + R + ' // 6' + R + ' = <b>3' + R + '</b>.</p>',
        figs: [{ spec: S23B2, cap: 'Schéma intermédiaire 2' }] },
      { t: 'Étape 3 : Norton → Thévenin, deux fois', html: '<p>Entre N<sub>1</sub> et B : fém 3' + R + '·(' + E + '/(3' + R + ') + ' + I + ') = <b>' + E + ' + 3' + RI + '</b>, fléchée vers N<sub>1</sub>, en série avec 3' + R + '.</p>' +
          '<p>Entre N<sub>1</sub> et A : le bloc ' + I + ' // ' + R + ' devient une fém <b>' + RI + '</b> fléchée vers A, dans le sens de la flèche de ' + I + ', en série avec ' + R + '.</p>',
        figs: [{ spec: S23B3, cap: 'Schéma intermédiaire 3 : tout est en série.' }] },
      { t: 'Étape 4 : mise en série', html: '<p>De B vers A, les deux fém sont fléchées dans le sens du parcours : elles s’additionnent. ' + E + ' + 3' + RI + ' + ' + RI + ' = <b>' + E + ' + 4' + RI + '</b>, et 3' + R + ' + ' + R + ' = <b>4' + R + '</b>.</p>',
        figs: [{ spec: S23B4, cap: 'Schéma intermédiaire 4 : générateur de Thévenin vu par la charge' }] },
      { t: 'Résultat', html: '<p>Diviseur de tension : ' + U + ' = 2' + R + '/(2' + R + ' + 4' + R + ') × (' + E + ' + 4' + RI + '), soit <b>' + U + ' = (' + E + ' + 4' + RI + ')/3</b>.</p>' },
      { t: 'Contrôles', html: '<ul><li>Résistance vue par la 2' + R + ', sources éteintes (2' + E + ' devient un fil, les sources ' + I + ' des circuits ouverts) : (6' + R + ' // 6' + R + ') + ' + R + ' = 4' + R + ' ✓.</li>' +
          '<li>Superposition : 2' + E + ' seule donne ' + E + '/3 ; la source ' + I + ' verticale seule donne ' + RI + ' ; la source ' + I + ' du bloc seule donne ' + RI + '/3. Somme : (' + E + ' + 4' + RI + ')/3 ✓.</li></ul>' }],
    answer: '<p>' + U + ' = (' + E + ' + 4' + RI + ')/3. Vu par la 2' + R + ', le générateur de Thévenin est ' + E + ' + 4' + RI + ' en série avec 4' + R + '.</p>',
    traps: [
      '6' + R + ' // 6' + R + ' = 3' + R + ', pas 12' + R + '.',
      'Ne pas convertir le bloc ' + I + ' // ' + R + ' placé en série sur la ligne, ou se tromper de signe sur ' + RI + '.',
      'Oublier la ' + R + ' du bloc dans la résistance totale : 3' + R + ' au lieu de 4' + R + '.',
      'Mauvais sens d’une source de Norton : sa flèche pointe vers la borne + de la fém.'],
    official: true
  });
})();
