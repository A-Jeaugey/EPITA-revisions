/* Élec B2 — exercices des examens de fin de semestre (janvier 2016 à janvier 2023, juin 2018), corrigés pas à pas.
   Format : celui de data/elec/ex-*.js (voir elec/entrainement.html) ; kind: 'final' ; schémas en specs circuit.js.
   Énoncés recopiés des sujets (Epidocs S1/Finals/Elec) ; chaque résultat a été recalculé par analyse nodale symbolique
   et comparé au corrigé officiel (janvier 2016 : pas de corrigé, réponses calculées). Un exercice repris tel quel
   d’un sujet à l’autre n’a qu’une fiche (src le dit). */
(function () {
  var L = window.ELEC2_EX = window.ELEC2_EX || [];

  /* ---------- notation ---------- */
  var R = '<var>R</var>', E = '<var class="u">E</var>', I = '<var class="i">I</var>', U = '<var class="u">U</var>';
  function rr(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function ee(n) { return '<var class="u">E</var><sub>' + n + '</sub>'; }
  function ii(n) { return '<var class="i">I</var><sub>' + n + '</sub>'; }
  function uu(n) { return '<var class="u">U</var><sub>' + n + '</sub>'; }
  function vv(n) { return '<var class="v">V</var><sub>' + n + '</sub>'; }
  var Eth = ee('th'), Rth = rr('th'), IN = ii('N'), RN = rr('N'), RI = R + I, Rp = R + '′', Ip = I + '′';
  function fr(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function p(s) { return '<p>' + s + '</p>'; }
  function ul(a) { return '<ul>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  var CTRL = 'Résultat recalculé par analyse nodale (loi des nœuds en chaque nœud, résolution symbolique).';

  /* ---------- schémas : fil du haut y = 40, fil du bas y = 200 ---------- */
  function box(xs, extra) {
    var x0 = xs[0], x1 = xs[xs.length - 1];
    return ['M' + x0 + ' 40H' + x1, 'M' + x0 + ' 200H' + x1].concat(xs.map(function (x) { return 'M' + x + ' 40V200'; })).concat(extra || []);
  }
  /* modèle de Norton (IN // RN) chargé par une résistance */
  function norton(load, o) {
    o = o || {};
    return { w: 380, h: 240, aria: 'Générateur de Norton IN en parallèle avec RN, chargé par ' + load, wires: box([70, 190, 310]),
      parts: [{ t: 'J', x: 70, y: 120, d: 'v', to: 'n', l: o.i || 'I_N', as: 'w', c: o.hl ? 'cz-hl' : '' }, { t: 'R', x: 190, y: 120, d: 'v', l: o.r || 'R_N', c: o.hl ? 'cz-hl' : '' },
        { t: 'R', x: 310, y: 120, d: 'v', l: load, lp: 'e' }, { t: 'dot', x: 190, y: 40 }, { t: 'dot', x: 190, y: 200 }] };
  }
  /* modèle de Thévenin (Eth, Rth) chargé par une résistance */
  function thev(load, o) {
    o = o || {};
    var parts = [{ t: 'E', x: 70, y: 120, d: 'v', p: 'n', l: o.e || 'E_th', as: 'w', c: o.hl ? 'cz-hl' : '' }, { t: 'R', x: 170, y: 40, l: o.r || 'R_th', c: o.hl ? 'cz-hl' : '' },
      { t: 'R', x: 280, y: 120, d: 'v', l: load, lp: 'w' }];
    if (o.u) parts.push({ t: 'U', a: [320, 170], b: [320, 70], l: o.u, lp: 'e' });
    return { w: 380, h: 240, aria: 'Générateur de Thévenin Eth en série avec Rth, chargé par ' + load, wires: ['M70 40H280V200H70Z'], parts: parts };
  }

  /* ================= Janvier 2023 (promo 2027) ================= */
  var F23A = { w: 450, h: 240, aria: 'Source E à gauche, 6R en haut, 4R verticale, 3R en haut, source de courant I fléchée vers le bas, charge 2R ; R sur le fil du bas entre 4R et I',
    wires: box([60, 160, 280, 380]), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 110, y: 40, l: '6R' },
      { t: 'R', x: 160, y: 120, d: 'v', l: '4R' }, { t: 'R', x: 220, y: 40, l: '3R' }, { t: 'R', x: 220, y: 200, l: 'R', lp: 's' },
      { t: 'J', x: 280, y: 120, d: 'v', to: 's', l: 'I', as: 'e' }, { t: 'R', x: 380, y: 120, d: 'v', l: '2R', lp: 'e' },
      { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 280, y: 40 }, { t: 'dot', x: 160, y: 200 }, { t: 'dot', x: 280, y: 200 }] };
  L.push({
    id: 'f2023-ex2a', exam: 'f2023', kind: 'final', order: 2.1, src: 'Examen janv. 2023 · Ex 2 · Q1', title: 'Le Norton vu par 2R, puis le courant dans 2R',
    pts: 8, topics: ['equivalences', 'norton', 'source-courant', 'diviseurs'], lvl: 2, time: 15,
    intro: p('Soient les 2 circuits ci-dessous.'),
    figs: [{ spec: F23A, cap: 'Circuit de gauche' }, { spec: norton('2R'), cap: 'Circuit de droite' }],
    questions: ['<b>a.</b> Déterminer les expressions de ' + IN + ' et de ' + RN + ' tels que les 2 circuits ci-dessus soient équivalents.',
      '<b>b.</b> En déduire l’expression de l’intensité du courant ' + Ip + ' qui traverse 2' + R + ' en fonction de ' + E + ', ' + I + ' et ' + R + '.'],
    hints: ['Débranche la charge 2' + R + ' et avance de gauche à droite : (' + E + ', 6' + R + ') devient un Norton.',
      '6' + R + ' // 4' + R + ' = 12' + R + '/5 ; repasse en Thévenin, ajoute 3' + R + ' et la ' + R + ' du fil du bas, qui sont en série.',
      'Repasse en Norton au niveau de la source ' + I + ' : elle est fléchée vers le bas, elle prélève du courant.'],
    solution: [
      { t: 'Étape 1 : (E, 6R) en Norton', html: p('La branche ' + E + ' en série avec 6' + R + ' devient une source ' + E + '/(6' + R + ') en parallèle avec 6' + R + '. Avec la 4' + R + ' : 6' + R + ' // 4' + R + ' = 24' + R + '²/10' + R + ' = <b>12' + R + '/5</b>.') },
      { t: 'Étape 2 : retour en Thévenin et mise en série', html: p('Norton → Thévenin : fém (' + E + '/6' + R + ')·(12' + R + '/5) = <b>2' + E + '/5</b>, en série avec 12' + R + '/5.') +
          p('Les résistances 3' + R + ' (en haut) et ' + R + ' (sur le fil du bas) sont sur le même chemin : 12' + R + '/5 + 3' + R + ' + ' + R + ' = <b>32' + R + '/5</b>.') },
      { t: 'Étape 3 : Norton, et la source I', html: p('Thévenin → Norton : (2' + E + '/5)/(32' + R + '/5) = ' + E + '/(16' + R + '), en parallèle avec 32' + R + '/5.') +
          p('La source ' + I + ' est en parallèle, fléchée vers le bas : elle retire ' + I + ' au nœud du haut. D’où <b>' + IN + ' = ' + E + '/(16' + R + ') − ' + I + '</b> et <b>' + RN + ' = 32' + R + '/5</b>.'),
        figs: [{ spec: norton('2R', { i: 'I_N = E/(16R) − I', r: 'R_N = 32R/5', hl: true }), cap: 'Générateur de Norton équivalent' }] },
      { t: 'Question b : diviseur de courant', html: p(Ip + ' = ' + RN + '/(' + RN + ' + 2' + R + ') · ' + IN + ' = (32/42)·(' + E + '/(16' + R + ') − ' + I + ') = (16/21)·(' + E + '/(16' + R + ') − ' + I + '), soit <b>' + Ip + ' = (' + E + ' − 16' + RI + ')/(21' + R + ')</b>.') }],
    answer: p(IN + ' = ' + E + '/(16' + R + ') − ' + I + ' ; ' + RN + ' = 32' + R + '/5.') + p(Ip + ' = (' + E + ' − 16' + RI + ')/(21' + R + ').'),
    traps: ['Oublier la ' + R + ' du fil du bas : elle est en série avec 3' + R + ' (on trouverait 27' + R + '/5).', 'Ajouter ' + I + ' au lieu de la retrancher : la flèche descend, elle sort du nœud du haut.', 'Garder 2' + R + ' dans le calcul de ' + RN + '.'],
    official: true, note: 'Conforme au corrigé officiel (six schémas intermédiaires). ' + CTRL
  });

  var F23B = { w: 530, h: 250, aria: 'Source 4E, 2R en haut, source I vers le haut, 2R verticale, 3R en haut, 2R et 2R verticales, U aux bornes de la dernière ; source E sur le fil du bas, flèche vers la droite',
    wires: box([60, 160, 250, 370, 460]), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: '4E', as: 'w' }, { t: 'R', x: 110, y: 40, l: '2R' },
      { t: 'J', x: 160, y: 120, d: 'v', to: 'n', l: 'I', as: 'e' }, { t: 'R', x: 250, y: 120, d: 'v', l: '2R' }, { t: 'R', x: 310, y: 40, l: '3R' },
      { t: 'E', x: 310, y: 200, d: 'h', p: 'e', l: 'E', as: 's' }, { t: 'R', x: 370, y: 120, d: 'v', l: '2R' }, { t: 'R', x: 460, y: 120, d: 'v', l: '2R', lp: 'w' },
      { t: 'U', a: [500, 170], b: [500, 70], l: 'U', lp: 'e' }, { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 250, y: 40 }, { t: 'dot', x: 370, y: 40 }] };
  L.push({
    id: 'f2023-ex2b', exam: 'f2023', kind: 'final', order: 2.2, src: 'Examen janv. 2023 · Ex 2 · Q2', title: 'La tension U par transformations successives',
    pts: 6, topics: ['equivalences', 'source-courant', 'diviseurs'], lvl: 2, time: 12,
    intro: p('Soit le circuit ci-contre. Déterminer l’expression de la tension ' + U + ' en fonction de ' + E + ', ' + I + ' et ' + R + '. Vous pourrez utiliser les équivalences Thévenin/Norton.'),
    figs: [{ spec: F23B }],
    hints: ['À gauche, trois branches en parallèle : (4' + E + ', 2' + R + ') en Norton, la source ' + I + ', la 2' + R + '.',
      'Regroupe en un Thévenin, puis fais le tour de la boucle jusqu’aux deux 2' + R + ' de droite (en parallèle : ' + R + '), sans oublier la source ' + E + ' du fil du bas.'],
    solution: [
      { t: 'Étape 1 : la partie gauche', html: p('(4' + E + ', 2' + R + ') → Norton 2' + E + '/' + R + ' // 2' + R + '. Avec la source ' + I + ' (même sens) et la 2' + R + ' : (2' + E + '/' + R + ' + ' + I + ') // ' + R + ', car 2' + R + ' // 2' + R + ' = ' + R + '.') +
          p('Retour en Thévenin : fém <b>2' + E + ' + ' + RI + '</b> en série avec ' + R + '.') },
      { t: 'Étape 2 : la boucle', html: p('En série : ' + R + ' et 3' + R + ' (4' + R + '), et la source ' + E + ' du fil du bas. Sa flèche est opposée au sens de la fém 2' + E + ' + ' + RI + ' dans la boucle : fém totale (2' + E + ' + ' + RI + ') − ' + E + ' = <b>' + E + ' + ' + RI + '</b>.') +
          p('La charge : les deux 2' + R + ' en parallèle font ' + R + '.') },
      { t: 'Étape 3 : diviseur de tension', html: p(U + ' = ' + R + '/(' + R + ' + 4' + R + ') · (' + E + ' + ' + RI + '), soit <b>' + U + ' = (' + E + ' + ' + RI + ')/5</b>.'),
        figs: [{ spec: thev('R', { e: 'E + RI', r: '4R', u: 'U', hl: true }), cap: 'Le circuit réduit' }] }],
    answer: p(U + ' = (' + E + ' + ' + RI + ')/5.'),
    traps: ['Ajouter la source ' + E + ' du bas au lieu de la retrancher : regarde le sens de sa flèche dans la boucle.', 'Compter une seule des deux 2' + R + ' de droite.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  /* ================= Janvier 2022 (promo 2026) ================= */
  var F22A = { w: 470, h: 240, aria: 'Source de courant I vers le haut, R verticale, 3R en haut, 6R verticale, charge R prime traversée par I prime',
    wires: box([60, 160, 300, 400]), parts: [{ t: 'J', x: 60, y: 120, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 160, y: 120, d: 'v', l: 'R' },
      { t: 'R', x: 230, y: 40, l: '3R' }, { t: 'R', x: 300, y: 120, d: 'v', l: '6R' }, { t: 'R', x: 400, y: 120, d: 'v', l: 'R′', lp: 'e' },
      { t: 'I', x: 400, y: 68, d: 's', l: 'I′', lp: 'e' }, { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 300, y: 40 }, { t: 'dot', x: 160, y: 200 }, { t: 'dot', x: 300, y: 200 }] };
  L.push({
    id: 'f2022-ex2a', exam: 'f2022', kind: 'final', order: 2.1, src: 'Examen janv. 2022 · Ex 2 · Q1', title: 'Le Norton vu par R′',
    pts: 6, topics: ['equivalences', 'norton', 'diviseurs'], lvl: 1, time: 10,
    intro: p('Soient les 2 circuits ci-dessous.'),
    figs: [{ spec: F22A, cap: 'Circuit de gauche' }, { spec: norton('R′'), cap: 'Circuit de droite' }],
    questions: ['<b>a.</b> Déterminer les expressions de ' + IN + ' et de ' + RN + ' tels que les 2 circuits ci-dessus soient équivalents.',
      '<b>b.</b> En déduire l’expression de l’intensité du courant ' + Ip + ' qui traverse ' + Rp + ' en fonction de ' + I + ', ' + R + ' et ' + Rp + '.'],
    hints: ['La source ' + I + ' en parallèle avec ' + R + ' est un Norton : passe-le en Thévenin pour l’ajouter à 3' + R + '.'],
    solution: [
      { t: 'Étape 1 : Norton → Thévenin', html: p(I + ' // ' + R + ' devient la fém ' + RI + ' en série avec ' + R + ' ; avec 3' + R + ' : ' + RI + ' en série avec <b>4' + R + '</b>.') },
      { t: 'Étape 2 : Thévenin → Norton', html: p('Fém ' + RI + ' et 4' + R + ' → source ' + RI + '/(4' + R + ') = <b>' + I + '/4</b> en parallèle avec 4' + R + '. Avec la 6' + R + ' : 4' + R + ' // 6' + R + ' = 24' + R + '/10 = <b>12' + R + '/5</b>.') +
          p('D’où <b>' + IN + ' = ' + I + '/4</b> et <b>' + RN + ' = 12' + R + '/5 = 2,4' + R + '</b>.'),
        figs: [{ spec: norton('R′', { i: 'I_N = I/4', r: 'R_N = 12R/5', hl: true }), cap: 'Générateur de Norton équivalent' }] },
      { t: 'Question b : diviseur de courant', html: p(Ip + ' = ' + RN + '/(' + Rp + ' + ' + RN + ') · ' + IN + ' = (12' + R + '/5)/(' + Rp + ' + 12' + R + '/5) · ' + I + '/4, soit <b>' + Ip + ' = 3' + RI + '/(5' + Rp + ' + 12' + R + ')</b>.') }],
    answer: p(IN + ' = ' + I + '/4 ; ' + RN + ' = 12' + R + '/5.') + p(Ip + ' = 3' + RI + '/(5' + Rp + ' + 12' + R + ').'),
    traps: ['Additionner ' + I + ' et 3' + R + ' sans transformation : une source de courant ne s’ajoute pas à une résistance en série.', 'Diviseur de courant à l’envers : c’est la résistance de l’autre branche (' + RN + ') qui est au numérateur.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F22B = { w: 460, h: 240, aria: 'Source de courant I vers le haut ; R en série avec E ; tension U ; R verticale ; R en haut ; à droite E vers le haut puis R',
    wires: box([60, 150, 260, 380]), parts: [{ t: 'J', x: 60, y: 120, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 150, y: 85, d: 'v', l: 'R' },
      { t: 'E', x: 150, y: 160, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'U', a: [205, 180], b: [205, 60], l: 'U', lp: 'e' }, { t: 'R', x: 260, y: 120, d: 'v', l: 'R' },
      { t: 'R', x: 320, y: 40, l: 'R' }, { t: 'E', x: 380, y: 85, d: 'v', p: 'n', l: 'E', as: 'e' }, { t: 'R', x: 380, y: 160, d: 'v', l: 'R', lp: 'e' }] };
  L.push({
    id: 'f2022-ex2b', exam: 'f2022', kind: 'final', order: 2.2, src: 'Examen janv. 2022 · Ex 2 · Q2', title: 'Toutes les branches en parallèle : la tension U',
    pts: 6, topics: ['equivalences', 'source-courant', 'millman'], lvl: 2, time: 10,
    intro: p('Soit le circuit ci-contre. Déterminer l’expression de la tension ' + U + ' en fonction de ' + E + ', ' + I + ' et ' + R + '. Vous pourrez utiliser les équivalences Thévenin/Norton.'),
    figs: [{ spec: F22B }],
    hints: ['Les quatre branches sont toutes entre le fil du haut et le fil du bas : elles sont en parallèle, ' + U + ' est leur tension commune.',
      'Passe chaque branche à fém en Norton, puis additionne les courants et associe les résistances.'],
    solution: [
      { t: 'Étape 1 : tout en Norton', html: ul(['(' + R + ', ' + E + ') → ' + E + '/' + R + ' // ' + R + ' ;', 'la branche de droite (' + R + ', ' + E + ', ' + R + ' en série) → ' + E + '/(2' + R + ') // 2' + R + ' ;', 'la source ' + I + ' et la résistance ' + R + ' restent telles quelles.']) },
      { t: 'Étape 2 : regroupement', html: p('Courants (tous vers le haut) : ' + ii('eq') + ' = ' + I + ' + ' + E + '/' + R + ' + ' + E + '/(2' + R + ') = (2' + RI + ' + 3' + E + ')/(2' + R + ').') +
          p('Résistances : ' + R + ' // ' + R + ' // 2' + R + ' = (' + R + '/2 · 2' + R + ')/(' + R + '/2 + 2' + R + ') = <b>2' + R + '/5</b>.') },
      { t: 'Étape 3 : loi d’Ohm', html: p(U + ' = ' + rr('eq') + ' · ' + ii('eq') + ' = (2' + R + '/5)·(2' + RI + ' + 3' + E + ')/(2' + R + '), soit <b>' + U + ' = (2' + RI + ' + 3' + E + ')/5</b>.') +
          p('Contrôle par Millman (masse en bas) : ' + U + ' = (' + I + ' + ' + E + '/' + R + ' + ' + E + '/(2' + R + '))/(1/' + R + ' + 1/' + R + ' + 1/(2' + R + ')), le même résultat.') }],
    answer: p(U + ' = (2' + RI + ' + 3' + E + ')/5.'),
    traps: ['Oublier la deuxième ' + R + ' de la branche de droite : elle est en série avec la première (2' + R + ').', 'Compter la branche (' + R + ', ' + E + ') comme une simple résistance.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  /* ================= Janvier 2021 (promo 2025) ================= */
  var F21S = { w: 460, h: 240, aria: 'Source E1, 2R en haut, 3R verticale parcourue par I2, R en haut, R verticale, source I0 vers le bas ; 4R sur le fil du bas',
    wires: box([60, 160, 280, 380]), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E_1', as: 'w' }, { t: 'R', x: 110, y: 40, l: '2R' },
      { t: 'R', x: 160, y: 110, d: 'v', l: '3R' }, { t: 'I', x: 160, y: 172, d: 's', l: 'I_2', lp: 'w' }, { t: 'R', x: 220, y: 40, l: 'R' }, { t: 'R', x: 220, y: 200, l: '4R', lp: 's' },
      { t: 'R', x: 280, y: 120, d: 'v', l: 'R' }, { t: 'J', x: 380, y: 120, d: 'v', to: 's', l: 'I_0', as: 'e' }, { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 280, y: 40 }] };
  L.push({
    id: 'f2021-ex2', exam: 'f2021', kind: 'final', order: 2, src: 'Examen janv. 2021 · Ex 2', title: 'Superposition : le courant I₂, puis l’application numérique',
    pts: 5, topics: ['superposition', 'diviseurs', 'numerique'], lvl: 2, time: 15,
    intro: p('Soit le circuit ci-contre, dans lequel ' + ee(1) + ' = 15 V, ' + ii(0) + ' = 45 mA et ' + R + ' = 500 Ω.') +
      p('En utilisant le théorème de superposition, déterminer l’expression de l’intensité du courant ' + ii(2) + '. Vous donnerez l’expression littérale avant de faire l’application numérique.'),
    figs: [{ spec: F21S }],
    hints: ['État 1 : ' + ee(1) + ' seule, ' + ii(0) + ' ouverte. Les branches R puis R et 4' + R + ' à droite forment 6' + R + ', en parallèle avec 3' + R + '.',
      'État 2 : ' + ii(0) + ' seule, ' + ee(1) + ' en fil. Le courant ' + ii(0) + ' se partage : diviseur de courant.'],
    solution: [
      { t: 'État 1 : E₁ seule', html: p('Avec ' + ii(0) + ' ouverte, la partie droite est ' + R + ' + ' + R + ' + 4' + R + ' = 6' + R + ' en série, en parallèle avec 3' + R + ' : 3' + R + ' // 6' + R + ' = 2' + R + '.') +
          p('Diviseur de tension : la tension aux bornes de 3' + R + ' vaut 2' + R + '/(2' + R + ' + 2' + R + ') · ' + ee(1) + ' = ' + ee(1) + '/2, d’où ' + ii(2) + '′ = ' + ee(1) + '/(2 · 3' + R + ') = <b>' + ee(1) + '/(6' + R + ')</b>.') },
      { t: 'État 2 : I₀ seule', html: p('Avec ' + ee(1) + ' en fil, 2' + R + ' et 3' + R + ' sont en parallèle (6' + R + '/5). Le courant ' + ii(0) + ' remonte par ' + R + ' (verticale) d’un côté, et de l’autre par ' + R + ' + 6' + R + '/5 + 4' + R + ', en sens inverse de la flèche ' + ii(2) + '.') +
          p('Le calcul (diviseur de courant, puis diviseur entre 2' + R + ' et 3' + R + ') donne <b>' + ii(2) + '″ = −' + ii(0) + '/18</b>.') },
      { t: 'Somme et application numérique', html: p(ii(2) + ' = ' + ii(2) + '′ + ' + ii(2) + '″ = <b>' + ee(1) + '/(6' + R + ') − ' + ii(0) + '/18</b>.') +
          p('A.N. : 15/3 000 = 5 mA ; 45/18 = 2,5 mA ; <b>' + ii(2) + ' = 2,5 mA</b>.') }],
    answer: p(ii(2) + ' = ' + ee(1) + '/(6' + R + ') − ' + ii(0) + '/18 = 2,5 mA.'),
    traps: ['Dans l’état 2, court-circuiter ' + ii(0) + ' au lieu d’éteindre ' + ee(1) + '.', 'Oublier le signe moins : avec ' + ii(0) + ' seule, le courant traverse 3' + R + ' contre la flèche ' + ii(2) + '.', 'Mélanger les unités : ' + R + ' = 500 Ω avec des mA donne des volts et des milliampères cohérents si on écrit ' + R + ' = 0,5 kΩ.'],
    official: true, note: 'Conforme au corrigé officiel (deux méthodes par état). ' + CTRL
  });

  var F21T = { w: 470, h: 240, aria: 'Source de courant I vers le haut ; R en série avec E1 ; tension U ; charge R prime ; R en haut ; à droite E2 vers le haut puis R',
    wires: box([60, 150, 260, 380]), parts: [{ t: 'J', x: 60, y: 120, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 150, y: 85, d: 'v', l: 'R' },
      { t: 'E', x: 150, y: 160, d: 'v', p: 'n', l: 'E_1', as: 'w' }, { t: 'U', a: [205, 180], b: [205, 60], l: 'U', lp: 'e' }, { t: 'R', x: 260, y: 120, d: 'v', l: 'R′', lp: 'e' },
      { t: 'R', x: 320, y: 40, l: 'R' }, { t: 'E', x: 380, y: 85, d: 'v', p: 'n', l: 'E_2', as: 'e' }, { t: 'R', x: 380, y: 160, d: 'v', l: 'R', lp: 'e' }] };
  L.push({
    id: 'f2021-ex3', exam: 'f2021', kind: 'final', order: 3, src: 'Examen janv. 2021 · Ex 3', title: 'Thévenin vu par R′, puis la tension U',
    pts: 5, topics: ['thevenin', 'equivalences', 'source-courant'], lvl: 2, time: 10,
    intro: p('Soit le circuit ci-contre. ' + ee(1) + ', ' + ee(2) + ', ' + I + ', ' + R + ' et ' + Rp + ' sont supposés connus, et les générateurs sont indépendants.') +
      p('En utilisant la méthode de votre choix, déterminer le générateur de Thévenin vu par la résistance ' + Rp + '. En déduire l’expression de la tension ' + U + '.'),
    figs: [{ spec: F21T }],
    hints: ['Débranche ' + Rp + ' : il reste trois branches en parallèle (la source ' + I + ', (' + R + ', ' + ee(1) + '), et la branche de droite ' + R + ' + ' + ee(2) + ' + ' + R + ').', 'Tout en Norton, regroupe, repasse en Thévenin.'],
    solution: [
      { t: 'Étape 1 : Norton', html: p('(' + R + ', ' + ee(1) + ') → ' + ee(1) + '/' + R + ' // ' + R + ' ; à droite, (' + R + ', ' + ee(2) + ', ' + R + ') → ' + ee(2) + '/(2' + R + ') // 2' + R + '.') +
          p('Somme des courants : ' + I + ' + ' + ee(1) + '/' + R + ' + ' + ee(2) + '/(2' + R + ') ; résistances : ' + R + ' // 2' + R + ' = <b>2' + R + '/3</b>.') },
      { t: 'Étape 2 : Thévenin', html: p(Rth + ' = <b>2' + R + '/3</b> ; ' + Eth + ' = (2' + R + '/3)·(' + I + ' + ' + ee(1) + '/' + R + ' + ' + ee(2) + '/(2' + R + ')) = <b>(2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/3</b>.'),
        figs: [{ spec: thev('R′', { e: 'E_th', r: 'R_th = 2R/3', u: 'U', hl: true }), cap: 'Générateur de Thévenin chargé par R′' }] },
      { t: 'Étape 3 : diviseur de tension', html: p(U + ' = ' + Rp + '/(' + Rth + ' + ' + Rp + ') · ' + Eth + ', soit <b>' + U + ' = ' + Rp + '(2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/(2' + R + ' + 3' + Rp + ')</b>.') }],
    answer: p(Eth + ' = (2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/3 ; ' + Rth + ' = 2' + R + '/3.') + p(U + ' = ' + Rp + '(2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/(2' + R + ' + 3' + Rp + ').'),
    traps: ['Compter ' + Rp + ' dans ' + Rth + '.', 'Prendre ' + ee(2) + '/' + R + ' au lieu de ' + ee(2) + '/(2' + R + ') : la branche de droite a deux résistances.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F21N = { w: 470, h: 250, aria: 'Branche 4R en série avec E à gauche ; 4R verticale ; en haut, source I0 fléchée vers la gauche en parallèle avec R ; 3R verticale ; charge 2R traversée par I',
    wires: box([60, 170, 300, 400], ['M195 40V82H275V40']), parts: [{ t: 'R', x: 60, y: 85, d: 'v', l: '4R', lp: 'w' }, { t: 'E', x: 60, y: 160, d: 'v', p: 'n', l: 'E', as: 'w' },
      { t: 'R', x: 170, y: 120, d: 'v', l: '4R' }, { t: 'J', x: 235, y: 40, d: 'h', to: 'w', l: 'I_0', as: 'n' }, { t: 'R', x: 235, y: 82, l: 'R', lp: 's' },
      { t: 'R', x: 300, y: 120, d: 'v', l: '3R' }, { t: 'I', x: 350, y: 40, d: 'e', l: 'I', lp: 'n' }, { t: 'R', x: 400, y: 120, d: 'v', l: '2R', lp: 'e' }] };
  L.push({
    id: 'f2021-ex4', exam: 'f2021', kind: 'final', order: 4, src: 'Examen janv. 2021 · Ex 4', title: 'Norton vu par 2R, puis le courant I',
    pts: 5, topics: ['norton', 'equivalences', 'source-courant'], lvl: 2, time: 12,
    intro: p('Soit le circuit ci-contre. ' + E + ', ' + ii(0) + ' et ' + R + ' sont supposés connus, et les générateurs sont indépendants.') +
      p('En utilisant la méthode de votre choix, déterminer le générateur de Norton vu par la résistance 2' + R + '. En déduire l’expression de l’intensité ' + I + '.'),
    figs: [{ spec: F21N }],
    hints: ['À gauche : (' + E + ', 4' + R + ') en Norton, avec la 4' + R + ' verticale, puis retour en Thévenin.', 'Le bloc ' + ii(0) + ' // ' + R + ' du fil du haut devient une fém ' + R + ii(0) + ' en série avec ' + R + ', fléchée vers la gauche.'],
    solution: [
      { t: 'Étape 1 : la partie gauche', html: p('(' + E + ', 4' + R + ') → ' + E + '/(4' + R + ') // 4' + R + ' ; avec la 4' + R + ' verticale : ' + E + '/(4' + R + ') // 2' + R + ' → Thévenin <b>' + E + '/2</b> en série avec <b>2' + R + '</b>.') },
      { t: 'Étape 2 : le bloc du fil du haut', html: p(ii(0) + ' // ' + R + ' → fém ' + R + ii(0) + ' en série avec ' + R + ', fléchée vers la gauche comme ' + ii(0) + ' : elle s’oppose à ' + E + '/2.') +
          p('En série : fém ' + E + '/2 − ' + R + ii(0) + ', résistance 2' + R + ' + ' + R + ' = 3' + R + '.') },
      { t: 'Étape 3 : Norton', html: p('Thévenin → Norton : (' + E + '/2 − ' + R + ii(0) + ')/(3' + R + ') = ' + E + '/(6' + R + ') − ' + ii(0) + '/3, en parallèle avec 3' + R + ' ; avec la 3' + R + ' verticale : 3' + R + ' // 3' + R + ' = 3' + R + '/2.') +
          p('<b>' + IN + ' = ' + E + '/(6' + R + ') − ' + ii(0) + '/3</b> ; <b>' + RN + ' = 3' + R + '/2</b>.'),
        figs: [{ spec: norton('2R', { i: 'I_N', r: 'R_N = 3R/2', hl: true }), cap: 'Générateur de Norton chargé par 2R' }] },
      { t: 'Question : le courant I', html: p('Diviseur de courant : ' + I + ' = ' + RN + '/(' + RN + ' + 2' + R + ') · ' + IN + ' = (3/7)(' + E + '/(6' + R + ') − ' + ii(0) + '/3), soit <b>' + I + ' = (' + E + ' − 2' + R + ii(0) + ')/(14' + R + ')</b>.') }],
    answer: p(IN + ' = ' + E + '/(6' + R + ') − ' + ii(0) + '/3 ; ' + RN + ' = 3' + R + '/2.') + p(I + ' = (' + E + ' − 2' + R + ii(0) + ')/(14' + R + ').'),
    traps: ['Ajouter ' + R + ii(0) + ' au lieu de le retrancher : la flèche de ' + ii(0) + ' va vers la gauche.', 'Garder 2' + R + ' dans ' + RN + '.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  /* ================= Janvier 2020 (promo 2024) ================= */
  var F20S = { w: 470, h: 250, aria: 'Source E1 vers le haut parcourue par I, R1 verticale, E2 sur le fil du haut fléchée vers la gauche, R2 verticale, source I2 vers le bas ; source I1 sur le fil du bas fléchée vers la gauche, tension U à ses bornes fléchée vers la gauche',
    wires: box([60, 150, 330, 420]), parts: [{ t: 'E', x: 60, y: 125, d: 'v', p: 'n', l: 'E_1', as: 'w' }, { t: 'I', x: 60, y: 62, d: 'n', l: 'I', lp: 'w' },
      { t: 'R', x: 150, y: 120, d: 'v', l: 'R_1' }, { t: 'E', x: 240, y: 40, d: 'h', p: 'w', l: 'E_2', as: 'n' }, { t: 'R', x: 330, y: 120, d: 'v', l: 'R_2' },
      { t: 'J', x: 420, y: 120, d: 'v', to: 's', l: 'I_2', as: 'e' }, { t: 'J', x: 240, y: 200, d: 'h', to: 'w', l: 'I_1', as: 'n' },
      { t: 'U', a: [290, 232], b: [190, 232], l: 'U', lp: 's' }] };
  L.push({
    id: 'f2020-ex2', exam: 'f2020', kind: 'final', order: 2, src: 'Examen janv. 2020 · Ex 2', title: 'Superposition à quatre sources : I et U',
    pts: 4.5, topics: ['superposition', 'source-courant', 'numerique'], lvl: 2, time: 15,
    intro: p('Soit le circuit ci-contre, dans lequel ' + ee(1) + ' = −5 V, ' + ee(2) + ' = 3 V, ' + ii(1) + ' = 1 A, ' + ii(2) + ' = 2 A, ' + rr(1) + ' = 2 Ω et ' + rr(2) + ' = 3 Ω.') +
      p('En utilisant le théorème de superposition, déterminer l’intensité du courant ' + I + ' et la tension ' + U + '. Vous donnerez l’expression littérale avant de faire l’application numérique.'),
    figs: [{ spec: F20S }],
    hints: ['Quatre sources, quatre états. Dans chaque état, regarde ce qui est court-circuité : avec ' + ee(1) + ' en fil, ' + rr(1) + ' est court-circuitée.',
      'Avec ' + ii(1) + ' éteinte (ouverte), le fil du bas est coupé : aucun courant ne revient par là.'],
    solution: [
      { t: 'État 1 : E₁ seule', html: p('Le fil du bas est coupé (' + ii(1) + ' ouverte) : aucun courant dans ' + rr(2) + '. ' + rr(1) + ' est aux bornes de ' + ee(1) + ' : ' + ii('E1') + ' = ' + ee(1) + '/' + rr(1) + '. Loi des mailles : ' + uu(1) + ' = −' + ee(1) + '.') },
      { t: 'État 2 : E₂ seule', html: p(ee(1) + ' en fil court-circuite ' + rr(1) + ' ; le fil du bas est coupé. Aucun courant ne circule dans ' + ee(1) + ' : ' + ii('E2') + ' = 0. Loi des mailles : ' + uu(2) + ' = ' + ee(2) + '.') },
      { t: 'État 3 : I₁ seule', html: p(ii(1) + ' traverse ' + rr(2) + ' et revient par le fil ' + ee(1) + ' (court-circuitant ' + rr(1) + ') : ' + ii('E3') + ' = ' + ii(1) + ' et ' + uu(3) + ' = ' + rr(2) + ii(1) + '.') },
      { t: 'État 4 : I₂ seule', html: p(ii(2) + ' tourne dans ' + rr(2) + ' (le fil du bas est coupé) : ' + ii('E4') + ' = 0 et ' + uu(4) + ' = −' + rr(2) + ii(2) + '.') },
      { t: 'Somme et application numérique', html: p(U + ' = −' + ee(1) + ' + ' + ee(2) + ' + ' + rr(2) + ii(1) + ' − ' + rr(2) + ii(2) + ' = 5 + 3 + 3 − 6 = <b>5 V</b>.') +
          p(I + ' = ' + ee(1) + '/' + rr(1) + ' + ' + ii(1) + ' = −2,5 + 1 = <b>−1,5 A</b>.') }],
    answer: p(U + ' = −' + ee(1) + ' + ' + ee(2) + ' + ' + rr(2) + '(' + ii(1) + ' − ' + ii(2) + ') = 5 V ; ' + I + ' = ' + ee(1) + '/' + rr(1) + ' + ' + ii(1) + ' = −1,5 A.'),
    traps: ['Oublier que ' + ee(1) + ' = −5 V : −' + ee(1) + ' = +5 V.', 'Prendre la flèche de ' + U + ' à l’envers : elle est fléchée vers la gauche, comme ' + ii(1) + '.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F20N = { w: 440, h: 240, aria: 'Source E à gauche, R1 en haut, R2 verticale jusqu’au nœud N, R3 sous N, R4 branchée entre N et le fil du bas, traversée par I4',
    wires: ['M60 40H280V200', 'M60 200H380', 'M60 40V200', 'M280 125H380V200'], parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 170, y: 40, l: 'R_1' },
      { t: 'R', x: 280, y: 82, d: 'v', l: 'R_2', lp: 'w' }, { t: 'R', x: 280, y: 165, d: 'v', l: 'R_3', lp: 'w' }, { t: 'R', x: 380, y: 165, d: 'v', l: 'R_4', lp: 'e' },
      { t: 'I', x: 330, y: 125, d: 'e', l: 'I_4', lp: 'n' }, { t: 'dot', x: 280, y: 125 }, { t: 'dot', x: 280, y: 200 }, { t: 'txt', x: 268, y: 120, s: 'N', a: 'end', c: 'cz-n' }] };
  L.push({
    id: 'f2020-ex3', exam: 'f2020', kind: 'final', order: 3, src: 'Examen janv. 2020 · Ex 3', title: 'Norton vu par R₄',
    pts: 4, topics: ['norton', 'diviseurs'], lvl: 1, time: 8,
    intro: p('Soit le circuit suivant :'), figs: [{ spec: F20N }],
    questions: ['<b>1.</b> Déterminer le générateur de Norton vu par ' + rr(4) + '.', '<b>2.</b> En déduire l’intensité ' + ii(4) + ' du courant dans ' + rr(4) + '. Vous exprimerez le résultat en fonction des résistances ' + rr('i') + ' et de la tension ' + E + '.'],
    hints: [RN + ' : ' + E + ' en fil, puis la résistance vue depuis N.', IN + ' : court-circuite les bornes de ' + rr(4) + ' ; ' + rr(3) + ' est alors court-circuitée.'],
    solution: [
      { t: 'R_N', html: p('Sources éteintes (' + E + ' en fil) : depuis N, ' + rr(3) + ' en parallèle avec ' + rr(1) + ' + ' + rr(2) + ' : <b>' + RN + ' = ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')/(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ')</b>.') },
      { t: 'I_N', html: p('Un fil entre N et le bas court-circuite ' + rr(3) + ' : il reste la maille ' + E + ', ' + rr(1) + ', ' + rr(2) + '. Loi des mailles : <b>' + IN + ' = ' + E + '/(' + rr(1) + ' + ' + rr(2) + ')</b>.') },
      { t: 'Question 2', html: p('Diviseur de courant : ' + ii(4) + ' = ' + RN + '/(' + rr(4) + ' + ' + RN + ') · ' + IN + ', soit <b>' + ii(4) + ' = ' + rr(3) + E + '/(' + rr(4) + '(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ') + ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + '))</b>.') }],
    answer: p(IN + ' = ' + E + '/(' + rr(1) + ' + ' + rr(2) + ') ; ' + RN + ' = ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')/(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ').') +
      p(ii(4) + ' = ' + rr(3) + E + '/(' + rr(4) + '(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ') + ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')).'),
    traps: ['Oublier que le court-circuit annule ' + rr(3) + ' pour ' + IN + '.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F20T = { w: 520, h: 240, aria: 'Source E1, R en haut jusqu’à P ; de P, 3R vers Q ; entre Q et le bas, 3R en parallèle avec E2 ; 3R verticale ; source I3 vers le haut ; charge R prime parcourue par I vers le bas',
    wires: box([60, 280, 370, 460], ['M60 40H160', 'M160 40V125', 'M130 125H190', 'M130 125V200', 'M190 125V200']), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E_1', as: 'w' },
      { t: 'R', x: 110, y: 40, l: 'R' }, { t: 'R', x: 160, y: 82, d: 'v', l: '3R', lp: 'e' }, { t: 'R', x: 130, y: 165, d: 'v', l: '3R', lp: 'w' },
      { t: 'E', x: 190, y: 165, d: 'v', p: 'n', l: 'E_2', as: 'e' }, { t: 'R', x: 280, y: 120, d: 'v', l: '3R' }, { t: 'J', x: 370, y: 120, d: 'v', to: 'n', l: 'I_3', as: 'e' },
      { t: 'R', x: 460, y: 125, d: 'v', l: 'R′', lp: 'e' }, { t: 'I', x: 460, y: 66, d: 's', l: 'I', lp: 'e' }, { t: 'dot', x: 160, y: 40 }, { t: 'dot', x: 160, y: 125 }] };
  L.push({
    id: 'f2020-ex4', exam: 'f2020', kind: 'final', order: 4, src: 'Examen janv. 2020 · Ex 4', title: 'Thévenin vu par R′, puis I pour R′ = 3R',
    pts: 6.5, topics: ['thevenin', 'superposition', 'numerique'], lvl: 2, time: 15,
    intro: p('Soit le montage ci-contre :'), figs: [{ spec: F20T }],
    questions: ['<b>1.</b> Déterminer le générateur de Thévenin vu par ' + Rp + '.',
      '<b>2.</b> En déduire l’intensité du courant ' + I + ' pour ' + Rp + ' = 3' + R + '. Vous donnerez d’abord l’expression littérale en fonction de ' + R + ', ' + ee(1) + ', ' + ee(2) + ' et ' + ii(3) + ', avant de faire l’application numérique si ' + R + ' = 10 Ω, ' + ee(1) + ' = 40 V, ' + ee(2) + ' = 24 V et ' + ii(3) + ' = 6 A.'],
    hints: ['La 3' + R + ' placée en parallèle sur ' + ee(2) + ' ne compte pas : la source impose le potentiel de Q.', Rth + ' : ' + R + ' // 3' + R + ' // 3' + R + '. ' + Eth + ' : superposition des trois sources, ou Millman au nœud du haut.'],
    solution: [
      { t: 'R_th', html: p(ee(1) + ' et ' + ee(2) + ' en fil, ' + ii(3) + ' ouverte : vus du haut, ' + R + ', 3' + R + ' (vers Q, relié au bas par le fil ' + ee(2) + ') et 3' + R + ' sont en parallèle : <b>' + Rth + ' = ' + R + ' // 3' + R + ' // 3' + R + ' = 3' + R + '/5</b>.') },
      { t: 'E_th par superposition', html: ul([ee(1) + ' seule : diviseur de tension entre ' + R + ' et 3' + R + ' // 3' + R + ' = 3' + R + '/2 : (3/5)' + ee(1) + ' ;',
        ee(2) + ' seule : diviseur entre 3' + R + ' et ' + R + ' // 3' + R + ' = 3' + R + '/4 : ' + ee(2) + '/5 ;', ii(3) + ' seule : ' + ii(3) + ' traverse ' + Rth + ' : (3/5)' + R + ii(3) + '.']) +
          p('<b>' + Eth + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/5</b>. Millman au nœud du haut redonne la même chose en une ligne : (' + ee(1) + '/' + R + ' + ' + ee(2) + '/(3' + R + ') + ' + ii(3) + ')/(1/' + R + ' + 1/(3' + R + ') + 1/(3' + R + ')).') },
      { t: 'Question 2', html: p(I + ' = ' + Eth + '/(' + Rth + ' + 3' + R + ') = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/(5 · 18' + R + '/5), soit <b>' + I + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/(18' + R + ')</b>.') +
          p('A.N. : (120 + 24 + 180)/180 = 324/180 = <b>1,8 A</b> (9/5 A).') }],
    answer: p(Eth + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/5 ; ' + Rth + ' = 3' + R + '/5.') + p(I + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/(18' + R + ') = 1,8 A.'),
    traps: ['Garder la 3' + R + ' en parallèle sur ' + ee(2) + ' dans ' + Rth + ' : la source éteinte la court-circuite.', 'Oublier un état de superposition (il y a trois sources).'],
    official: true, note: 'Conforme au corrigé officiel (superposition). ' + CTRL
  });

  /* ================= Janvier 2019 (promo 2023) et janvier 2016 (même circuit) ================= */
  var F19T = { w: 470, h: 240, aria: 'Source de courant I0 vers le haut, R1 verticale, R2 en haut, R4 verticale (la charge), R3 en haut, source E3 vers le haut à droite',
    wires: box([60, 150, 270, 390]), parts: [{ t: 'J', x: 60, y: 120, d: 'v', to: 'n', l: 'I_0', as: 'w' }, { t: 'R', x: 150, y: 120, d: 'v', l: 'R_1' },
      { t: 'R', x: 210, y: 40, l: 'R_2' }, { t: 'R', x: 270, y: 120, d: 'v', l: 'R_4' }, { t: 'R', x: 330, y: 40, l: 'R_3' }, { t: 'E', x: 390, y: 120, d: 'v', p: 'n', l: 'E_3', as: 'e' },
      { t: 'dot', x: 150, y: 40 }, { t: 'dot', x: 270, y: 40 }] };
  var F19STEPS = [
    { t: 'R_th', html: p('On débranche ' + rr(4) + '. ' + ii(0) + ' ouverte, ' + ee(3) + ' en fil : ' + rr(1) + ' et ' + rr(2) + ' en série (2' + R + '), en parallèle avec ' + rr(3) + ' : <b>' + Rth + ' = 2' + R + ' // ' + R + ' = 2' + R + '/3</b>.') },
    { t: 'E_th par superposition', html: ul([ii(0) + ' seule : ' + ii(0) + ' se partage entre ' + rr(1) + ' et ' + rr(2) + ' + ' + rr(3) + ' : le courant dans ' + rr(2) + ' vaut ' + ii(0) + '/3, d’où ' + Eth + '′ = ' + R + ' · ' + ii(0) + '/3 ;',
      ee(3) + ' seule : diviseur de tension, ' + Eth + '″ = ' + ee(3) + ' · 2' + R + '/3' + R + ' = 2' + ee(3) + '/3.']) + p('<b>' + Eth + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/3</b>.') }];
  L.push({
    id: 'f2019-ex2', exam: 'f2019', kind: 'final', order: 2, src: 'Examen janv. 2019 · Ex 2', title: 'Thévenin vu par R₄, puis la tension aux bornes de R₄',
    pts: 6, topics: ['thevenin', 'equivalences', 'superposition'], lvl: 2, time: 12, near: ['f2016-ex2'],
    intro: p('Soit le circuit ci-contre, dans lequel ' + rr(1) + ' = ' + rr(2) + ' = ' + rr(3) + ' = ' + rr(4) + ' = ' + R + '.'), figs: [{ spec: F19T }],
    questions: ['<b>1.</b> Déterminer le générateur de Thévenin vu par ' + rr(4) + '. Vous utiliserez la méthode de votre choix (équivalences ou application du théorème), et vous exprimerez votre résultat en fonction de ' + ii(0) + ', ' + ee(3) + ' et ' + R + '.',
      '<b>2.</b> En déduire la tension aux bornes de ' + rr(4) + '.'],
    hints: ['Par équivalences : ' + ii(0) + ' // ' + rr(1) + ' devient ' + R + ii(0) + ' en série avec ' + R + ' ; avec ' + rr(2) + ' : 2' + R + '.', 'À droite, (' + ee(3) + ', ' + rr(3) + ') en Norton ; additionne les deux Norton.'],
    solution: F19STEPS.concat([
      { t: 'Par équivalences (méthode 2 du corrigé)', html: p(ii(0) + ' // ' + R + ' → ' + R + ii(0) + ' en série avec ' + R + ' ; avec ' + rr(2) + ' : ' + R + ii(0) + ', 2' + R + ' → Norton ' + ii(0) + '/2 // 2' + R + '. À droite, ' + ee(3) + '/' + R + ' // ' + R + '. Somme : (' + ii(0) + '/2 + ' + ee(3) + '/' + R + ') // 2' + R + '/3, soit le même Thévenin.') },
      { t: 'Question 2', html: p(U + ' = ' + R + '/(' + R + ' + 2' + R + '/3) · ' + Eth + ' = (3/5)' + Eth + ', soit <b>' + U + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/5</b>.') }]),
    answer: p(Eth + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/3 ; ' + Rth + ' = 2' + R + '/3 ; ' + U + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/5.'),
    traps: ['Court-circuiter ' + ii(0) + ' pour ' + Rth + ' (on trouverait ' + R + '/2).'],
    official: true, note: 'Conforme au corrigé officiel, qui écrit par erreur « 2E » au lieu de 2' + ee(3) + ' dans le résultat. ' + CTRL
  });
  L.push({
    id: 'f2016-ex2', exam: 'f2016', kind: 'final', order: 2, src: 'Examen janv. 2016 · Ex 2', title: 'Norton vu par R₄ (le circuit de 2019)',
    pts: 6, topics: ['norton', 'equivalences'], lvl: 2, time: 12, near: ['f2019-ex2'],
    intro: p('Soit le circuit ci-contre, dans lequel ' + rr(1) + ' = ' + rr(2) + ' = ' + rr(3) + ' = ' + rr(4) + ' = ' + R + '.'), figs: [{ spec: F19T }],
    questions: ['<b>1.</b> Déterminer le générateur de Norton vu par ' + rr(4) + '. Vous utiliserez la méthode de votre choix (équivalences ou application du théorème), et vous exprimerez votre résultat en fonction de ' + ii(0) + ', ' + ee(3) + ' et ' + R + '.',
      '<b>2.</b> En déduire le courant dans ' + rr(4) + '.'],
    hints: ['Même circuit qu’en janvier 2019 : trouve le Thévenin, puis ' + IN + ' = ' + Eth + '/' + Rth + '.'],
    solution: F19STEPS.concat([
      { t: 'Norton', html: p('<b>' + RN + ' = ' + Rth + ' = 2' + R + '/3</b> et <b>' + IN + ' = ' + Eth + '/' + Rth + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(2' + R + ')</b> : c’est aussi la somme des deux Norton ' + ii(0) + '/2 + ' + ee(3) + '/' + R + '.') },
      { t: 'Question 2', html: p(ii(4) + ' = ' + RN + '/(' + RN + ' + ' + R + ') · ' + IN + ' = (2/5) · ' + IN + ', soit <b>' + ii(4) + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(5' + R + ')</b>.') }]),
    answer: p(IN + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(2' + R + ') ; ' + RN + ' = 2' + R + '/3 ; ' + ii(4) + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(5' + R + ').'),
    traps: ['Diviseur de courant à l’envers (' + R + ' au numérateur).'],
    official: false, note: 'Pas de corrigé officiel : résultat calculé, cohérent avec le corrigé de janvier 2019 (même circuit). ' + CTRL
  });

  var F19X = { w: 500, h: 270, aria: 'Source 2E, 4R en haut, 4R verticale, E sur le fil du haut fléchée vers la gauche, source I vers le haut, R1 ; en bas, R puis source 2I fléchée vers la gauche en parallèle avec R',
    wires: ['M60 40H430', 'M60 40V200', 'M160 40V200', 'M330 40V200', 'M430 40V200', 'M60 200H430', 'M265 200V232H325V200'], parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: '2E', as: 'w' },
      { t: 'R', x: 110, y: 40, l: '4R' }, { t: 'R', x: 160, y: 120, d: 'v', l: '4R' }, { t: 'E', x: 245, y: 40, d: 'h', p: 'w', l: 'E', as: 's' },
      { t: 'J', x: 330, y: 120, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 430, y: 120, d: 'v', l: 'R_1', lp: 'e' }, { t: 'R', x: 210, y: 200, l: 'R', lp: 's' },
      { t: 'J', x: 295, y: 200, d: 'h', to: 'w', l: '2I', as: 'n' }, { t: 'R', x: 295, y: 232, l: 'R', lp: 's' }] };
  L.push({
    id: 'f2019-ex3', exam: 'f2019', kind: 'final', order: 3, src: 'Examen janv. 2019 · Ex 3', title: 'La tension aux bornes de R₁ (où E disparaît)',
    pts: 8, topics: ['thevenin', 'superposition', 'source-courant'], lvl: 3, time: 20,
    intro: p('Soit le montage ci-contre. En utilisant la méthode de votre choix, déterminer l’expression de la tension aux bornes de la résistance ' + rr(1) + ' en fonction de ' + E + ', ' + I + ', ' + R + ' et ' + rr(1) + '.'),
    figs: [{ spec: F19X }],
    hints: ['Thévenin vu par ' + rr(1) + ' : ' + Rth + ' = 2' + R + ' (les deux 4' + R + ' en parallèle) + ' + R + ' + ' + R + ' (fil du bas, 2' + I + ' ouverte).', 'Par superposition, regarde les contributions de 2' + E + ' et de ' + E + ' : elles s’annulent.'],
    solution: [
      { t: 'Superposition (corrigé officiel)', html: ul(['2' + E + ' seule : ' + uu(1) + ' = ' + rr(1) + E + '/(4' + R + ' + ' + rr(1) + ') ;', E + ' seule : ' + uu(2) + ' = −' + rr(1) + E + '/(4' + R + ' + ' + rr(1) + ') ;',
        '2' + I + ' seule : ' + uu(3) + ' = 2' + rr(1) + RI + '/(4' + R + ' + ' + rr(1) + ') ;', I + ' seule : ' + uu(4) + ' = 4' + rr(1) + RI + '/(4' + R + ' + ' + rr(1) + ').']) +
          p('Somme : les deux contributions de ' + E + ' s’annulent, <b>' + U + ' = 6' + R + rr(1) + I + '/(4' + R + ' + ' + rr(1) + ')</b>.') },
      { t: 'Avec Thévenin (plus court)', html: p('Vu par ' + rr(1) + ' : <b>' + Rth + ' = 4' + R + '</b> (4' + R + ' // 4' + R + ' = 2' + R + ', plus ' + R + ' et ' + R + ' du fil du bas) et <b>' + Eth + ' = 6' + RI + '</b> (soit un Norton ' + IN + ' = 3' + I + '/2). Diviseur de tension : ' + U + ' = ' + rr(1) + '/(' + rr(1) + ' + 4' + R + ') · 6' + RI + '.') }],
    answer: p(U + ' = 6' + R + rr(1) + I + '/(4' + R + ' + ' + rr(1) + ') : ' + E + ' n’y figure pas.'),
    traps: ['Croire qu’on s’est trompé parce que ' + E + ' disparaît : les deux contributions sont opposées.', 'Oublier la ' + R + ' en parallèle avec 2' + I + ' : quand 2' + I + ' est éteinte, elle reste en série sur le fil du bas.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F19B = { w: 520, h: 240, aria: 'Source de courant I vers le haut en série avec R ; R en série avec E1 ; tension U ; R verticale ; R en haut ; E2 vers le haut ; R',
    wires: box([60, 150, 260, 370, 460]), parts: [{ t: 'J', x: 60, y: 85, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 60, y: 160, d: 'v', l: 'R', lp: 'w' },
      { t: 'R', x: 150, y: 85, d: 'v', l: 'R' }, { t: 'E', x: 150, y: 160, d: 'v', p: 'n', l: 'E_1', as: 'w' }, { t: 'U', a: [205, 180], b: [205, 60], l: 'U', lp: 'e' },
      { t: 'R', x: 260, y: 120, d: 'v', l: 'R' }, { t: 'R', x: 315, y: 40, l: 'R' }, { t: 'E', x: 370, y: 120, d: 'v', p: 'n', l: 'E_2', as: 'e' }, { t: 'R', x: 460, y: 120, d: 'v', l: 'R', lp: 'e' },
      { t: 'txt', x: 205, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 205, y: 226, s: 'B', c: 'cz-n' }] };
  L.push({
    id: 'f2019-bonus', exam: 'f2019', kind: 'final', order: 5, src: 'Examen janv. 2019 · Bonus', title: 'Millman : la tension U',
    pts: 0, topics: ['millman', 'source-courant'], lvl: 1, time: 6,
    intro: p('Soit le circuit ci-contre. ' + ee(1) + ', ' + ee(2) + ', ' + I + ' et ' + R + ' sont supposés connus, et les générateurs sont indépendants. En utilisant le théorème de Millman, déterminer l’expression de la tension ' + U + '.'),
    figs: [{ spec: F19B }],
    hints: ['Masse en B. La branche de droite (' + R + ' en haut vers ' + ee(2) + ') arrive en A avec le potentiel ' + ee(2) + '.', 'La ' + R + ' en série avec ' + I + ' et la ' + R + ' en parallèle sur ' + ee(2) + ' ne comptent pas.'],
    solution: [
      { t: 'Millman en A, masse en B', html: p('Branches qui arrivent en A : ' + I + ' (entrante), (' + R + ', ' + ee(1) + '), ' + R + ' seule, (' + R + ', vers ' + ee(2) + '). La ' + R + ' de droite est en parallèle sur ' + ee(2) + ' : elle n’intervient pas.') +
          p(U + ' = ' + vv('A') + ' = (' + I + ' + ' + ee(1) + '/' + R + ' + ' + ee(2) + '/' + R + ')/(1/' + R + ' + 1/' + R + ' + 1/' + R + '), soit <b>' + U + ' = (' + RI + ' + ' + ee(1) + ' + ' + ee(2) + ')/3</b>.') }],
    answer: p(U + ' = (' + RI + ' + ' + ee(1) + ' + ' + ee(2) + ')/3.'),
    traps: ['Mettre 1/' + R + ' au dénominateur pour la branche de la source ' + I + ' : sa ' + R + ' ne compte pas.', 'Compter la ' + R + ' en parallèle sur ' + ee(2) + '.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  /* ================= Juin 2018 (S1#), et janvier 2016 pour l’exercice 3 ================= */
  var F18JS = { w: 560, h: 250, aria: 'Source E1, R puis E2 fléchée vers la gauche sur le fil du haut jusqu’à A ; 2R sur le fil du bas ; 2R entre A et B ; tension U ; source I0 vers le haut ; R ; E5 fléchée vers la droite sur le fil du haut ; 2R',
    wires: box([60, 230, 320, 410, 510]), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E_1', as: 'w' }, { t: 'R', x: 105, y: 40, l: 'R' },
      { t: 'E', x: 175, y: 40, d: 'h', p: 'w', l: 'E_2', as: 'n' }, { t: 'R', x: 140, y: 200, l: '2R', lp: 's' }, { t: 'R', x: 230, y: 120, d: 'v', l: '2R', lp: 'w' },
      { t: 'U', a: [275, 175], b: [275, 65], l: 'U', lp: 'e' }, { t: 'J', x: 320, y: 120, d: 'v', to: 'n', l: 'I_0', as: 'e' }, { t: 'R', x: 410, y: 120, d: 'v', l: 'R' },
      { t: 'E', x: 460, y: 40, d: 'h', p: 'e', l: 'E_5', as: 'n' }, { t: 'R', x: 510, y: 120, d: 'v', l: '2R', lp: 'e' },
      { t: 'dot', x: 275, y: 40 }, { t: 'dot', x: 275, y: 200 }, { t: 'txt', x: 275, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 275, y: 226, s: 'B', c: 'cz-n' }] };
  L.push({
    id: 'f2018j-ex2', exam: 'f2018j', kind: 'final', order: 2, src: 'Examen juin 2018 (S1#) · Ex 2', title: 'Superposition, puis Thévenin vu par la 2R entre A et B',
    pts: 7.5, topics: ['superposition', 'thevenin', 'equivalences'], lvl: 3, time: 20,
    intro: p('Soit le circuit suivant :'), figs: [{ spec: F18JS }],
    questions: ['<b>1. Théorème de superposition</b> : déterminer ' + U + ' en utilisant le théorème de superposition.',
      '<b>2a. Théorème de Thévenin</b> : déterminer le générateur de Thévenin vu par la résistance 2' + R + ' placée entre A et B (vous pourrez utiliser la méthode de votre choix : définitions du théorème ou équivalences Thévenin/Norton).',
      '<b>2b.</b> En déduire l’expression de la tension ' + U + '.'],
    hints: [ee(1) + ' et ' + ee(2) + ' sont dans la même branche : un seul état pour ' + ee(1) + ' − ' + ee(2) + ' (la branche ' + R + ' + 2' + R + ' = 3' + R + ').', 'Par équivalences, toutes les branches sont en parallèle entre A et B : passe tout en Norton.'],
    solution: [
      { t: 'Question 1 : superposition', html: ul([ee(1) + ' − ' + ee(2) + ' (branche 3' + R + ') face à 2' + R + ' // ' + R + ' // 2' + R + ' = ' + R + '/2 : ' + uu(1) + ' = (' + R + '/2)/(3' + R + ' + ' + R + '/2) · (' + ee(1) + ' − ' + ee(2) + ') = (' + ee(1) + ' − ' + ee(2) + ')/7 ;',
        ii(0) + ' seule dans 3' + R + ' // 2' + R + ' // ' + R + ' // 2' + R + ' = 3' + R + '/7 : ' + uu(2) + ' = 3' + R + ii(0) + '/7 ;',
        ee(5) + ' seule : diviseur entre 2' + R + ' et 3' + R + ' // 2' + R + ' // ' + R + ' = 6' + R + '/11 : ' + uu(3) + ' = −3' + ee(5) + '/14.']) +
          p('<b>' + U + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/14</b>.') },
      { t: 'Question 2a : Thévenin vu par la 2R', html: p('Sans cette 2' + R + ', tout en Norton entre A et B : (' + ee(1) + ' − ' + ee(2) + ')/(3' + R + ') // 3' + R + ', ' + ii(0) + ', ' + R + ', −' + ee(5) + '/(2' + R + ') // 2' + R + '.') +
          p('Résistances : 3' + R + ' // ' + R + ' // 2' + R + ' = <b>6' + R + '/11</b> ; ' + Eth + ' = (6' + R + '/11)·((' + ee(1) + ' − ' + ee(2) + ')/(3' + R + ') + ' + ii(0) + ' − ' + ee(5) + '/(2' + R + ')) = <b>(2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/11</b>.') },
      { t: 'Question 2b', html: p(U + ' = 2' + R + '/(2' + R + ' + 6' + R + '/11) · ' + Eth + ' = (11/14)' + Eth + ' : on retrouve <b>' + U + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/14</b>, comme à la question 1.') }],
    answer: p(U + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/14 ; ' + Eth + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/11 ; ' + Rth + ' = 6' + R + '/11.'),
    traps: ['Recopier ' + Eth + ' comme réponse à la question 2b : le corrigé officiel le fait (dénominateur 11), mais ' + U + ' est la tension chargée par 2' + R + ' (dénominateur 14).', 'Oublier la 2' + R + ' du fil du bas, en série avec ' + R + ' dans la branche de gauche.'],
    official: true, note: 'Conforme au corrigé officiel pour les questions 1 et 2a ; en 2b, le corrigé encadre ' + Eth + ' au lieu de ' + U + ' (coquille). ' + CTRL
  });

  var F18JX = { w: 500, h: 260, aria: 'Source 2E, 2R en haut, 2R verticale ; sur le fil du haut, source 2I fléchée vers la droite en parallèle avec R ; source I vers le bas ; R1 ; source 2E sur le fil du bas fléchée vers la gauche',
    wires: box([60, 160, 320, 420], ['M185 40V78H275V40']), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: '2E', as: 'w' }, { t: 'R', x: 110, y: 40, l: '2R' },
      { t: 'R', x: 160, y: 125, d: 'v', l: '2R' }, { t: 'J', x: 230, y: 40, d: 'h', to: 'e', l: '2I', as: 'n' }, { t: 'R', x: 230, y: 78, l: 'R', lp: 's' },
      { t: 'J', x: 320, y: 125, d: 'v', to: 's', l: 'I', as: 'w' }, { t: 'R', x: 420, y: 120, d: 'v', l: 'R_1', lp: 'e' }, { t: 'E', x: 240, y: 200, d: 'h', p: 'w', l: '2E', as: 's' }] };
  L.push({
    id: 'f2018j-ex3', exam: 'f2018j', kind: 'final', order: 3, src: 'Examen juin 2018 (S1#) · Ex 3 · même exercice en janvier 2016 (Ex 3)', title: 'La tension aux bornes de R₁ (où I disparaît)',
    pts: 7, topics: ['equivalences', 'superposition', 'source-courant'], lvl: 3, time: 18,
    intro: p('Soit le montage ci-dessous. En utilisant la méthode de votre choix, déterminer l’expression de la tension aux bornes de la résistance ' + rr(1) + ' en fonction de ' + E + ', ' + I + ', ' + R + ' et ' + rr(1) + '.'),
    figs: [{ spec: F18JX }],
    hints: ['À gauche : (2' + E + ', 2' + R + ') en Norton, avec la 2' + R + ' verticale, puis retour en Thévenin (' + E + ', ' + R + ').', 'Le bloc 2' + I + ' // ' + R + ' devient 2' + RI + ' en série avec ' + R + '. Puis la source 2' + E + ' du fil du bas.'],
    solution: [
      { t: 'Étape 1 : la partie gauche', html: p('(2' + E + ', 2' + R + ') → ' + E + '/' + R + ' // 2' + R + ' ; avec la 2' + R + ' verticale : ' + E + '/' + R + ' // ' + R + ' → Thévenin <b>' + E + '</b> en série avec <b>' + R + '</b>.') },
      { t: 'Étape 2 : le fil du haut et le fil du bas', html: p('2' + I + ' // ' + R + ' → fém 2' + RI + ', fléchée vers la droite, en série avec ' + R + '. La source 2' + E + ' du fil du bas s’ajoute dans le même sens de parcours.') +
          p('Vu des bornes de la source ' + I + ' : fém ' + E + ' + 2' + RI + ' + 2' + E + ' = <b>3' + E + ' + 2' + RI + '</b>, résistance ' + R + ' + ' + R + ' = <b>2' + R + '</b>.') },
      { t: 'Étape 3 : la source I et R₁', html: p('Norton : (3' + E + ' + 2' + RI + ')/(2' + R + ') − ' + I + ' = 3' + E + '/(2' + R + '), en parallèle avec 2' + R + ' : la source ' + I + ' annule exactement la part de 2' + I + '.') +
          p('Diviseur : <b>' + U + ' = 3' + rr(1) + E + '/(2' + R + ' + ' + rr(1) + ')</b>. Par superposition, les contributions de 2' + I + ' et de ' + I + ' valent ±2' + R + rr(1) + I + '/(2' + R + ' + ' + rr(1) + ') et s’annulent.') }],
    answer: p(U + ' = 3' + rr(1) + E + '/(2' + R + ' + ' + rr(1) + ') : ' + I + ' n’y figure pas.'),
    traps: ['Retrancher la source 2' + E + ' du bas : son sens de parcours est le même que celui des autres fém.', 'S’inquiéter de voir ' + I + ' disparaître : c’est normal ici.'],
    official: true, note: 'Conforme au corrigé officiel de juin 2018 (équivalences, puis superposition). Même exercice en janvier 2016, sans corrigé. ' + CTRL
  });

  /* ================= Janvier 2018 (promo 2022) ================= */
  var F18T = { w: 440, h: 250, aria: 'B en haut à gauche, 2R en haut entre B et A ; sous B, 2R puis source I vers le haut ; sous A, R puis E vers le haut ; R prime entre A et M ; tensions U_BM et U_AM',
    wires: box([60, 200, 320]), parts: [{ t: 'R', x: 130, y: 40, l: '2R' }, { t: 'R', x: 60, y: 85, d: 'v', l: '2R', lp: 'e' }, { t: 'J', x: 60, y: 160, d: 'v', to: 'n', l: 'I', as: 'e' },
      { t: 'R', x: 200, y: 85, d: 'v', l: 'R' }, { t: 'E', x: 200, y: 160, d: 'v', p: 'n', l: 'E', as: 'e' }, { t: 'R', x: 320, y: 120, d: 'v', l: 'R′', lp: 'w' },
      { t: 'U', a: [25, 190], b: [25, 50], l: 'U_BM', lp: 'w' }, { t: 'U', a: [365, 190], b: [365, 50], l: 'U_AM', lp: 'e' },
      { t: 'txt', x: 60, y: 28, s: 'B', c: 'cz-n' }, { t: 'txt', x: 200, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 200, y: 226, s: 'M', c: 'cz-n' }] };
  L.push({
    id: 'f2018-ex2', exam: 'f2018', kind: 'final', order: 2, src: 'Examen janv. 2018 · Ex 2', title: 'Thévenin vu par R′, puis U_AM et U_BM',
    pts: 5, topics: ['thevenin', 'source-courant'], lvl: 2, time: 12,
    intro: p('Soit le circuit suivant, dans lequel ' + E + ', ' + I + ' et ' + R + ' sont connus. Les générateurs sont indépendants.'), figs: [{ spec: F18T }],
    questions: ['<b>1.</b> Déterminer le générateur de Thévenin vu par ' + Rp + '.', '<b>2.</b> Déterminer alors la tension ' + uu('AM') + ' si ' + Rp + ' = ' + R + '.', '<b>3.</b> En déduire la tension ' + uu('BM') + '.'],
    hints: ['À vide, le courant ' + I + ' fait le tour : il traverse les deux 2' + R + ', puis ' + R + ' de A vers la source ' + E + '.', 'Pour ' + Rth + ', la branche de la source ' + I + ' disparaît (ouverte).'],
    solution: [
      { t: 'E_th et R_th', html: p('À vide, la seule maille est parcourue par ' + I + ' : il descend dans ' + R + ' de A vers ' + E + '. ' + uu('AM') + ' = ' + RI + ' + ' + E + ' : <b>' + Eth + ' = ' + E + ' + ' + RI + '</b>.') +
          p('Sources éteintes, la branche ' + I + ' est ouverte : il reste ' + R + ' en série avec le fil ' + E + ' : <b>' + Rth + ' = ' + R + '</b>.') },
      { t: 'Question 2', html: p(uu('AM') + ' = ' + Rp + '/(' + Rth + ' + ' + Rp + ') · ' + Eth + ' ; avec ' + Rp + ' = ' + R + ' : <b>' + uu('AM') + ' = (' + E + ' + ' + RI + ')/2</b>.') },
      { t: 'Question 3', html: p('Loi des mailles : ' + uu('BM') + ' = ' + uu('BA') + ' + ' + uu('AM') + ', et ' + uu('BA') + ' = 2' + RI + ' (loi d’Ohm dans la 2' + R + ' du haut, parcourue par ' + I + ').') +
          p('<b>' + uu('BM') + ' = 2' + RI + ' + (' + E + ' + ' + RI + ')/2 = (' + E + ' + 5' + RI + ')/2</b>.') }],
    answer: p(Eth + ' = ' + E + ' + ' + RI + ' ; ' + Rth + ' = ' + R + ' ; ' + uu('AM') + ' = (' + E + ' + ' + RI + ')/2 ; ' + uu('BM') + ' = (' + E + ' + 5' + RI + ')/2.'),
    traps: ['Compter les deux 2' + R + ' dans ' + Rth + ' : elles sont en série avec une source de courant éteinte (ouverte).'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F18X = { w: 600, h: 260, aria: 'Source E, 2R en haut, 2R verticale, source I vers le bas ; sur le fil du haut, 2E fléchée vers la gauche, R, puis 2I fléchée vers la droite en parallèle avec R ; R1',
    wires: box([60, 160, 250, 550], ['M410 40V78H490V40']), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 110, y: 40, l: '2R' },
      { t: 'R', x: 160, y: 120, d: 'v', l: '2R' }, { t: 'J', x: 250, y: 120, d: 'v', to: 's', l: 'I', as: 'e' }, { t: 'E', x: 300, y: 40, d: 'h', p: 'w', l: '2E', as: 'n' },
      { t: 'R', x: 365, y: 40, l: 'R' }, { t: 'J', x: 450, y: 40, d: 'h', to: 'e', l: '2I', as: 'n' }, { t: 'R', x: 450, y: 78, l: 'R', lp: 's' }, { t: 'R', x: 550, y: 120, d: 'v', l: 'R_1', lp: 'e' }] };
  L.push({
    id: 'f2018-ex3', exam: 'f2018', kind: 'final', order: 3, src: 'Examen janv. 2018 · Ex 3', title: 'La tension aux bornes de R₁ par transformations',
    pts: 7, topics: ['equivalences', 'superposition', 'source-courant'], lvl: 3, time: 18,
    intro: p('Soit le montage ci-dessous. En utilisant la méthode de votre choix, déterminer l’expression de la tension aux bornes de la résistance ' + rr(1) + ' en fonction de ' + E + ', ' + I + ', ' + R + ' et ' + rr(1) + '.'),
    figs: [{ spec: F18X }],
    hints: ['À gauche, trois branches en parallèle : (' + E + ', 2' + R + '), 2' + R + ', la source ' + I + ' : tout en Norton.', 'Puis tout en série jusqu’à ' + rr(1) + ' : la fém 2' + E + ' (vers la gauche, donc à retrancher), ' + R + ', et le bloc 2' + I + ' // ' + R + '.'],
    solution: [
      { t: 'Étape 1 : la partie gauche', html: p('(' + E + ', 2' + R + ') → ' + E + '/(2' + R + ') // 2' + R + ' ; avec la 2' + R + ' et la source ' + I + ' (vers le bas) : (' + E + '/(2' + R + ') − ' + I + ') // ' + R + ' → Thévenin <b>' + E + '/2 − ' + RI + '</b> en série avec <b>' + R + '</b>.') },
      { t: 'Étape 2 : la mise en série', html: p('2' + I + ' // ' + R + ' → fém 2' + RI + ' (vers la droite) en série avec ' + R + '. La fém 2' + E + ' pointe vers la gauche : on la retranche.') +
          p('Fém totale : ' + E + '/2 − ' + RI + ' − 2' + E + ' + 2' + RI + ' = <b>' + RI + ' − 3' + E + '/2 = (2' + RI + ' − 3' + E + ')/2</b> ; résistance ' + R + ' + ' + R + ' + ' + R + ' = <b>3' + R + '</b>.') },
      { t: 'Étape 3 : diviseur de tension', html: p('<b>' + U + ' = ' + rr(1) + '(2' + RI + ' − 3' + E + ')/(2(' + rr(1) + ' + 3' + R + '))</b>.') +
          p('Contrôle par superposition (corrigé) : ' + E + ' donne ' + rr(1) + E + '/(2(3' + R + ' + ' + rr(1) + ')), ' + I + ' donne −' + R + rr(1) + I + '/(3' + R + ' + ' + rr(1) + '), 2' + E + ' donne −2' + rr(1) + E + '/(3' + R + ' + ' + rr(1) + '), 2' + I + ' donne 2' + R + rr(1) + I + '/(3' + R + ' + ' + rr(1) + ') : même somme.') }],
    answer: p(U + ' = ' + rr(1) + '(2' + RI + ' − 3' + E + ')/(2(' + rr(1) + ' + 3' + R + ')).'),
    traps: ['Ajouter 2' + E + ' : sa flèche est contraire au sens de parcours vers ' + rr(1) + '.', 'Oublier que la source ' + I + ' (vers le bas) retire du courant.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F18M = { w: 500, h: 250, aria: 'Nœud A en haut, B en bas ; source I1 vers le bas ; R1 puis E1 vers le haut ; R2 puis source I2 vers le haut ; R3 puis E3 fléchée vers le bas, avec R4 en parallèle sur E3 ; tension U entre A et B',
    wires: ['M70 40H360', 'M70 200H440', 'M70 40V200', 'M160 40V200', 'M260 40V200', 'M360 40V200', 'M360 125H440V200'], parts: [{ t: 'J', x: 70, y: 120, d: 'v', to: 's', l: 'I_1', as: 'e' },
      { t: 'R', x: 160, y: 82, d: 'v', l: 'R_1' }, { t: 'E', x: 160, y: 160, d: 'v', p: 'n', l: 'E_1', as: 'w' }, { t: 'R', x: 260, y: 82, d: 'v', l: 'R_2' },
      { t: 'J', x: 260, y: 160, d: 'v', to: 'n', l: 'I_2', as: 'w' }, { t: 'R', x: 360, y: 82, d: 'v', l: 'R_3' }, { t: 'E', x: 360, y: 165, d: 'v', p: 's', l: 'E_3', as: 'w' },
      { t: 'R', x: 440, y: 165, d: 'v', l: 'R_4', lp: 'e' }, { t: 'U', a: [30, 190], b: [30, 50], l: 'U', lp: 'w' }, { t: 'txt', x: 70, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 70, y: 226, s: 'B', c: 'cz-n' }] };
  L.push({
    id: 'f2018-ex4', exam: 'f2018', kind: 'final', order: 4, src: 'Examen janv. 2018 · Ex 4', title: 'Millman : la tension U',
    pts: 2, topics: ['millman', 'source-courant'], lvl: 1, time: 6,
    intro: p('On considère le circuit ci-contre. Déterminez ' + U + ' en utilisant le théorème de Millman.'), figs: [{ spec: F18M }],
    hints: ['Masse en B. ' + ii(1) + ' sort de A, ' + ii(2) + ' y entre ; ' + rr(2) + ', en série avec ' + ii(2) + ', ne compte pas.', 'Le bas de ' + rr(3) + ' est au potentiel −' + ee(3) + ' (flèche vers le bas) ; ' + rr(4) + ', en parallèle sur ' + ee(3) + ', ne compte pas.'],
    solution: [
      { t: 'Millman en A, masse en B', html: p(U + ' = ' + vv('A') + ' = (' + ee(1) + '/' + rr(1) + ' − ' + ii(1) + ' + ' + ii(2) + ' − ' + ee(3) + '/' + rr(3) + ')/(1/' + rr(1) + ' + 1/' + rr(3) + ').') +
          p('En multipliant haut et bas par ' + rr(1) + rr(3) + ' : <b>' + U + ' = (' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + ') − ' + rr(1) + ee(3) + ')/(' + rr(1) + ' + ' + rr(3) + ')</b>.') }],
    answer: p(U + ' = (' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + ') − ' + rr(1) + ee(3) + ')/(' + rr(1) + ' + ' + rr(3) + ').'),
    traps: ['Mettre 1/' + rr(2) + ' ou 1/' + rr(4) + ' au dénominateur.', 'Prendre +' + ee(3) + ' : la flèche pointe vers le bas.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  /* ================= Janvier 2017 (promo 2021), et janvier 2016 pour le bonus ================= */
  var F17N = { w: 470, h: 240, aria: 'Source E, R1 en haut, R2 verticale (la charge), R3 en haut, R5 verticale, source I0 vers le bas ; R4 sur le fil du bas entre R2 et R5',
    wires: box([60, 170, 310, 400]), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 115, y: 40, l: 'R_1' },
      { t: 'R', x: 170, y: 120, d: 'v', l: 'R_2' }, { t: 'R', x: 240, y: 40, l: 'R_3' }, { t: 'R', x: 240, y: 200, l: 'R_4', lp: 's' }, { t: 'R', x: 310, y: 120, d: 'v', l: 'R_5' },
      { t: 'J', x: 400, y: 120, d: 'v', to: 's', l: 'I_0', as: 'e' }] };
  L.push({
    id: 'f2017-ex2', exam: 'f2017', kind: 'final', order: 2, src: 'Examen janv. 2017 · Ex 2', title: 'Norton vu par R₂, en valeurs numériques',
    pts: 6, topics: ['norton', 'equivalences', 'numerique'], lvl: 2, time: 12,
    intro: p('Soit le circuit ci-contre. On donne ' + E + ' = 10 V, ' + ii(0) + ' = 10 mA, ' + rr(1) + ' = 1 kΩ, ' + rr(2) + ' = 1,2 kΩ, ' + rr(3) + ' = 500 Ω, ' + rr(4) + ' = 1,5 kΩ, ' + rr(5) + ' = 2 kΩ.'), figs: [{ spec: F17N }],
    questions: ['<b>1.</b> Déterminer le générateur de Norton vu par ' + rr(2) + '. Vous utiliserez la méthode de votre choix (équivalences ou application du théorème), et vous exprimerez votre résultat en fonction de ' + ii(0) + ', ' + E + ' et des ' + rr('i') + '.', '<b>2.</b> En déduire le courant dans ' + rr(2) + '.'],
    hints: ['À droite : ' + ii(0) + ' // ' + rr(5) + ' en Thévenin (fém ' + rr(5) + ii(0) + '), en série avec ' + rr(3) + ' et ' + rr(4) + '.', 'Calcule en kΩ et en mA : les tensions sortent en volts.'],
    solution: [
      { t: 'Étape 1 : la partie droite', html: p(ii(0) + ' // ' + rr(5) + ' → fém ' + rr(5) + ii(0) + ' en série avec ' + rr(5) + ' ; avec ' + rr(3) + ' et ' + rr(4) + ' : ' + rr('eq') + ' = ' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + '. En Norton : ' + rr(5) + ii(0) + '/' + rr('eq') + ', fléchée vers le bas, en parallèle avec ' + rr('eq') + '.') },
      { t: 'Étape 2 : Norton', html: p('À gauche, ' + E + '/' + rr(1) + ' // ' + rr(1) + '. Somme : <b>' + IN + ' = ' + E + '/' + rr(1) + ' − ' + rr(5) + ii(0) + '/(' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ')</b> ; <b>' + RN + ' = ' + rr(1) + '(' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ')/(' + rr(1) + ' + ' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ')</b>.') +
          p('A.N. : ' + IN + ' = 10/1 − 2 × 10/4 = 10 − 5 = <b>5 mA</b> ; ' + RN + ' = 1 × 4/5 = <b>0,8 kΩ</b>.') },
      { t: 'Question 2', html: p(ii(2) + ' = ' + RN + '/(' + RN + ' + ' + rr(2) + ') · ' + IN + ' = 0,8/2 × 5 = <b>2 mA</b>.') }],
    answer: p(IN + ' = ' + E + '/' + rr(1) + ' − ' + rr(5) + ii(0) + '/(' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ') = 5 mA ; ' + RN + ' = 800 Ω ; ' + ii(2) + ' = 2 mA.'),
    traps: ['Oublier ' + rr(4) + ', sur le fil du bas.', 'Mélanger Ω et kΩ.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F17X = { w: 560, h: 250, aria: 'Source E1, R2 puis E2 fléchée vers la gauche sur le fil du haut jusqu’à A ; R1 sur le fil du bas ; R3 ; tension U entre A et B ; source I0 vers le haut en série avec R0 ; E4 fléchée vers la droite sur le fil du haut ; R4',
    wires: box([60, 240, 340, 470]), parts: [{ t: 'E', x: 60, y: 120, d: 'v', p: 'n', l: 'E_1', as: 'w' }, { t: 'R', x: 110, y: 40, l: 'R_2' },
      { t: 'E', x: 185, y: 40, d: 'h', p: 'w', l: 'E_2', as: 'n' }, { t: 'R', x: 150, y: 200, l: 'R_1', lp: 's' }, { t: 'R', x: 240, y: 120, d: 'v', l: 'R_3', lp: 'w' },
      { t: 'U', a: [290, 175], b: [290, 65], l: 'U', lp: 'e' }, { t: 'J', x: 340, y: 85, d: 'v', to: 'n', l: 'I_0', as: 'e' }, { t: 'R', x: 340, y: 160, d: 'v', l: 'R_0', lp: 'e' },
      { t: 'E', x: 405, y: 40, d: 'h', p: 'e', l: 'E_4', as: 'n' }, { t: 'R', x: 470, y: 120, d: 'v', l: 'R_4', lp: 'e' },
      { t: 'txt', x: 290, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 290, y: 226, s: 'B', c: 'cz-n' }] };
  L.push({
    id: 'f2017-ex3', exam: 'f2017', kind: 'final', order: 3, src: 'Examen janv. 2017 · Ex 3', title: 'Millman : U, puis R₄ pour que U = 0',
    pts: 7, topics: ['millman', 'source-courant', 'numerique'], lvl: 2, time: 15,
    intro: p('Soit le circuit suivant : ' + ee(1) + ' = 20 V, ' + ee(2) + ' = 5 V, ' + ee(4) + ' = 10 V, ' + ii(0) + ' = 0,25 mA, ' + rr(0) + ' = 1 kΩ, ' + rr(1) + ' = 10 kΩ, ' + rr(2) + ' = 50 kΩ, ' + rr(3) + ' = 12 kΩ.'), figs: [{ spec: F17X }],
    questions: ['<b>1.</b> Déterminer l’expression de la tension ' + U + ' en utilisant la méthode qui vous semble la plus appropriée (lois de Kirchhoff, théorèmes de superposition, de Thévenin, de Norton ou de Millman), en l’indiquant préalablement. Vous exprimerez ' + U + ' en fonction de ' + ee(1) + ', ' + ee(2) + ', ' + ee(4) + ', ' + ii(0) + ' et des résistances ' + rr('i') + '.',
      '<b>2.</b> Déterminer alors ' + rr(4) + ' pour que ' + U + ' soit égal à 0.'],
    hints: ['Tout arrive entre A et B : Millman, masse en B.', 'Branche de gauche : fém ' + ee(1) + ' − ' + ee(2) + ' (sens opposés), résistance ' + rr(1) + ' + ' + rr(2) + ' ; ' + rr(0) + ', en série avec ' + ii(0) + ', ne compte pas.'],
    solution: [
      { t: 'Question 1 : Millman', html: p(U + ' = ' + vv('A') + ' = ((' + ee(1) + ' − ' + ee(2) + ')/(' + rr(1) + ' + ' + rr(2) + ') + ' + ii(0) + ' − ' + ee(4) + '/' + rr(4) + ')/(1/(' + rr(1) + ' + ' + rr(2) + ') + 1/' + rr(3) + ' + 1/' + rr(4) + ').') +
          p('Soit <b>' + U + ' = (' + rr(3) + rr(4) + '(' + ee(1) + ' − ' + ee(2) + ') + ' + rr(3) + rr(4) + '(' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ' − ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + ')/(' + rr(3) + rr(4) + ' + (' + rr(1) + ' + ' + rr(2) + ')(' + rr(3) + ' + ' + rr(4) + '))</b>.') },
      { t: 'Question 2 : U = 0', html: p('Le numérateur s’annule : ' + rr(4) + '((' + ee(1) + ' − ' + ee(2) + ') + (' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ') = (' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + ', d’où <b>' + rr(4) + ' = (' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + '/(' + ee(1) + ' − ' + ee(2) + ' + (' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ')</b>.') +
          p('A.N. (kΩ, mA, V) : 60 × 10/(15 + 60 × 0,25) = 600/30 = <b>20 kΩ</b>. ' + rr(3) + ' n’intervient pas.') }],
    answer: p(U + ' par Millman (voir ci-dessus) ; ' + U + ' = 0 pour ' + rr(4) + ' = (' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + '/(' + ee(1) + ' − ' + ee(2) + ' + (' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ') = 20 kΩ.'),
    traps: ['Compter ' + rr(0) + ' : elle est en série avec une source de courant.', 'Additionner ' + ee(1) + ' et ' + ee(2) + ' : leurs flèches sont opposées le long de la branche.'],
    official: true, note: 'Conforme au corrigé officiel. ' + CTRL
  });

  var F17B = { w: 520, h: 250, aria: 'R4 verticale à gauche, E3 vers le haut, R3 en haut ; R2 puis source I2 vers le haut ; tension U ; E1 vers le haut puis R1 ; source I1 vers le bas ; A en haut à droite, B en bas',
    wires: box([60, 150, 260, 350, 440]), parts: [{ t: 'R', x: 60, y: 120, d: 'v', l: 'R_4', lp: 'w' }, { t: 'E', x: 150, y: 120, d: 'v', p: 'n', l: 'E_3', as: 'e' },
      { t: 'R', x: 205, y: 40, l: 'R_3' }, { t: 'R', x: 260, y: 82, d: 'v', l: 'R_2' }, { t: 'J', x: 260, y: 160, d: 'v', to: 'n', l: 'I_2', as: 'w' },
      { t: 'U', a: [305, 180], b: [305, 60], l: 'U', lp: 'e' }, { t: 'E', x: 350, y: 85, d: 'v', p: 'n', l: 'E_1', as: 'e' }, { t: 'R', x: 350, y: 160, d: 'v', l: 'R_1', lp: 'e' },
      { t: 'J', x: 440, y: 120, d: 'v', to: 's', l: 'I_1', as: 'e' }, { t: 'txt', x: 440, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 440, y: 226, s: 'B', c: 'cz-n' }] };
  L.push({
    id: 'f2017-bonus', exam: 'f2017', kind: 'final', order: 5, src: 'Examen janv. 2017 · Bonus · même exercice (symétrique) en janvier 2016', title: 'Millman : la tension U entre A et B',
    pts: 0, topics: ['millman', 'source-courant'], lvl: 1, time: 6,
    intro: p('On considère le circuit ci-contre. Déterminez ' + U + ' en utilisant le théorème de Millman.'), figs: [{ spec: F17B }],
    hints: ['Masse en B. La branche ' + rr(3) + ' arrive en A depuis le haut de ' + ee(3) + ' (potentiel ' + ee(3) + ') ; ' + rr(4) + ', en parallèle sur ' + ee(3) + ', ne compte pas.'],
    solution: [
      { t: 'Millman en A, masse en B', html: p(U + ' = ' + vv('A') + ' = (' + ee(3) + '/' + rr(3) + ' + ' + ii(2) + ' + ' + ee(1) + '/' + rr(1) + ' − ' + ii(1) + ')/(1/' + rr(3) + ' + 1/' + rr(1) + '), soit <b>' + U + ' = (' + rr(1) + ee(3) + ' + ' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + '))/(' + rr(1) + ' + ' + rr(3) + ')</b>.') +
          p('Le sujet de janvier 2016 dessine le même circuit en miroir (A à gauche) : même réponse.') }],
    answer: p(U + ' = (' + rr(1) + ee(3) + ' + ' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + '))/(' + rr(1) + ' + ' + rr(3) + ').'),
    traps: ['Mettre 1/' + rr(2) + ' ou 1/' + rr(4) + ' au dénominateur.'],
    official: true, note: 'Conforme au corrigé officiel de 2017 (2016 : pas de corrigé). ' + CTRL
  });
})();
