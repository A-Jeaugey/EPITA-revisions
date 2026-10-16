/* Exercices d’électronique : partiels nov. 2017 (promo 2022), oct. 2018 (promo 2023) et nov. 2020 (promo 2025). */
(function () {
  var L = window.ELEC_EX = window.ELEC_EX || [];

  /* ---------- notation ---------- */
  function sub(i) { return i == null ? '' : '<sub>' + i + '</sub>'; }
  function v(s, i) { return '<var>' + s + '</var>' + sub(i); }               /* résistance, interrupteur */
  function u(s, i) { return '<var class="u">' + s + '</var>' + sub(i); }     /* tension */
  function c(s, i) { return '<var class="i">' + s + '</var>' + sub(i); }     /* courant */
  function pt(i) { return '<var class="v">V</var><sub>' + i + '</sub>'; }    /* potentiel */
  function fr(n, d) { return '<span class="frac"><span>' + n + '</span><span>' + d + '</span></span>'; }
  var R = v('R'), R1 = v('R', 1), R2 = v('R', 2), R3 = v('R', 3), R4 = v('R', 4), R5 = v('R', 5);
  var E = u('E'), U = u('U'), I = c('I');
  var DOTS = '<span class="muted">…</span>';
  /* tableau ; une cellule null = case noircie du sujet */
  function table(head, rows) {
    return '<div class="tbl"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr>' + r.map(function (x) { return x === null ? '<td style="background:var(--muted)" title="case noircie"><span class="sr-only">case noircie</span></td>' : '<td>' + x + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }
  var K1 = v('K', 1), K2 = v('K', 2);
  function arrow(x, y) { return { t: 'txt', x: x, y: y, s: '→', c: 'cz-l' }; }

  /* =====================================================================
     Partiel nov. 2017 (promo 2022)
     ===================================================================== */

  /* ---------- Ex 2 : source de courant, R′ et U′ ---------- */
  function s17e2(hl) {
    var h = hl ? 'cz-hl' : '';
    return { w: 500, h: 250, aria: 'Source de courant I, résistance R′, branche 2R puis R, et boucle de droite R, 3R, 2R ; U aux bornes de R′, U′ aux bornes de 3R',
      wires: ['M50 40H410V210H50Z', 'M140 40V210', 'M230 40V210'],
      parts: [{ t: 'J', x: 50, y: 125, d: 'v', to: 'n', l: 'I', as: 'w' },
        { t: 'R', x: 140, y: 125, d: 'v', l: 'R′', lp: 'w' },
        { t: 'U', a: [185, 190], b: [185, 60], l: 'U', lp: 'w' },
        { t: 'R', x: 230, y: 85, d: 'v', l: '2R' }, { t: 'R', x: 230, y: 165, d: 'v', l: 'R' },
        { t: 'R', x: 320, y: 40, l: 'R', lp: 's', c: h }, { t: 'R', x: 410, y: 125, d: 'v', l: '3R', c: h }, { t: 'R', x: 320, y: 210, l: '2R', lp: 'n', c: h },
        { t: 'U', a: [455, 190], b: [455, 60], l: 'U′' },
        { t: 'dot', x: 140, y: 40 }, { t: 'dot', x: 140, y: 210 }, { t: 'dot', x: 230, y: 40 }, { t: 'dot', x: 230, y: 210 }] };
  }
  L.push({
    id: 'p2017-ex2', exam: 'p2017', kind: 'partiel', order: 2,
    src: 'Partiel nov. 2017 · Ex 2',
    title: 'Source de courant : trouver R′, puis U′',
    pts: 6, topics: ['source-courant', 'req', 'diviseurs', 'calcul'], lvl: 2, time: 12,
    intro: '<p>On considère le circuit ci-contre dans lequel on suppose connus ' + I + ' et ' + R + '.</p>',
    figs: [{ spec: s17e2(), cap: 'Circuit du sujet' }],
    questions: ['<b>1.</b> Exprimer la résistance ' + R + '′ en fonction de ' + R + ' pour que ' + U + ' = ' + fr(R + '.' + I, '4') + '.',
      '<b>2.</b> Déterminer l’expression de la tension ' + U + '′ en fonction de ' + I + ' et des résistances. (On prendra toujours ' + U + ' = ' + fr(R + '.' + I, '4') + ')'],
    hints: ['Cherche les résistances parcourues par le même courant. La boucle de droite (' + R + ', 3' + R + ' et la 2' + R + ' du bas) ne contient aucun nœud.',
      'Tout finit en parallèle entre le fil du haut et le fil du bas. La source de courant débite alors ' + I + ' dans une seule résistance équivalente : ' + U + ' = ' + v('R', 'éq') + '·' + I + '.',
      'Pour ' + U + '′, reviens au schéma de départ : la boucle de droite est soumise à ' + U + '. Pense au pont diviseur de tension.'],
    solution: [
      { t: 'Question 1 : simplifier le circuit',
        html: '<ol><li>Branche du milieu : 2' + R + ' et ' + R + ' sont parcourues par le même courant, elles sont en série : 2' + R + ' + ' + R + ' = 3' + R + '.</li>' +
          '<li>Boucle de droite : ' + R + ', 3' + R + ' et la 2' + R + ' du bas se suivent sans aucun nœud entre elles. La 2' + R + ' est dessinée sur le fil du bas, mais elle est bien dans cette boucle. En série : ' + R + ' + 3' + R + ' + 2' + R + ' = 6' + R + '.</li>' +
          '<li>' + R + '′, 3' + R + ' et 6' + R + ' relient toutes le fil du haut au fil du bas : elles sont en parallèle, avec la même tension ' + U + ' à leurs bornes.</li></ol>' +
          '<p>3' + R + ' // 6' + R + ' = (3' + R + '·6' + R + ')/(3' + R + ' + 6' + R + ') = 18' + R + '²/9' + R + ' = 2' + R + ', puis ' + v('R', 'éq') + ' = ' + R + '′ // 2' + R + ' = ' + fr('2' + R + '·' + R + '′', '2' + R + ' + ' + R + '′') + '.</p>',
        figs: [{ spec: { w: 440, h: 220, aria: 'Source I en parallèle avec R′, 3R et 6R', wires: ['M50 40H340V190H50Z', 'M140 40V190', 'M245 40V190'],
          parts: [{ t: 'J', x: 50, y: 115, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'R', x: 140, y: 115, d: 'v', l: 'R′', lp: 'w' },
            { t: 'U', a: [185, 170], b: [185, 60], l: 'U', lp: 'w' }, { t: 'R', x: 245, y: 115, d: 'v', l: '3R' }, { t: 'R', x: 340, y: 115, d: 'v', l: '6R' },
            { t: 'dot', x: 140, y: 40 }, { t: 'dot', x: 140, y: 190 }, { t: 'dot', x: 245, y: 40 }, { t: 'dot', x: 245, y: 190 }] },
          cap: 'Première étape : ' + R + '′, 3' + R + ' (= 2' + R + ' + ' + R + ') et 6' + R + ' (= ' + R + ' + 3' + R + ' + 2' + R + ') en parallèle' },
        { spec: { w: 440, h: 220, aria: 'Source I débitant dans la résistance équivalente', wires: ['M50 40H210V190H50Z'],
          parts: [{ t: 'J', x: 50, y: 115, d: 'v', to: 'n', l: 'I', as: 'w' }, { t: 'U', a: [130, 170], b: [130, 60], l: 'U', lp: 'w' },
            { t: 'R', x: 210, y: 115, d: 'v', l: 'R_{éq} = 2RR′/(2R + R′)' }] },
          cap: 'Deuxième étape : la source de courant débite dans ' + v('R', 'éq') }] },
      { t: 'Question 1 : calculer R′',
        html: '<p>La source impose le courant ' + I + ' dans ' + v('R', 'éq') + '. Loi d’Ohm, en convention récepteur : ' + U + ' = ' + v('R', 'éq') + '·' + I + ' = ' + fr('2' + R + '·' + R + '′', '2' + R + ' + ' + R + '′') + '·' + I + '.</p>' +
          '<p>On veut ' + U + ' = ' + R + '·' + I + '/4. On simplifie par ' + I + ' :</p>' +
          '<p class="f-block">' + fr('2' + R + '·' + R + '′', '2' + R + ' + ' + R + '′') + ' = ' + fr(R, '4') + ' ⇔ 8' + R + '·' + R + '′ = ' + R + '(2' + R + ' + ' + R + '′) ⇔ 8' + R + '′ = 2' + R + ' + ' + R + '′ ⇔ 7' + R + '′ = 2' + R + '</p>' +
          '<p>D’où <b>' + R + '′ = 2' + R + '/7</b>.</p>' +
          '<p>Contrôle : ' + R + '′ // 2' + R + ' = (2' + R + '/7 · 2' + R + ')/(2' + R + '/7 + 2' + R + ') = (4' + R + '²/7)/(16' + R + '/7) = ' + R + '/4. ✓</p>' +
          '<p>Le corrigé le note : en simplifiant, on a gardé ' + U + ' mais perdu ' + U + '′. Pour la question 2, il faut revenir au schéma de départ.</p>' },
      { t: 'Question 2',
        html: '<p>Sur le schéma de départ, ' + R + ', 3' + R + ' et 2' + R + ' (boucle de droite) sont en série, et cet ensemble est branché entre le fil du haut et le fil du bas : il est soumis à ' + U + '. ' + U + '′ est la tension aux bornes de 3' + R + ', fléchée dans le même sens que ' + U + '.</p>' +
          '<p>Pont diviseur de tension : ' + U + '′ = ' + fr('3' + R, R + ' + 3' + R + ' + 2' + R) + '·' + U + ' = ' + U + '/2.</p>' +
          '<p>Avec ' + U + ' = ' + R + '·' + I + '/4 : <b>' + U + '′ = ' + R + '·' + I + '/8</b>.</p>',
        figs: [{ spec: s17e2(true), cap: 'La boucle de droite, en série, est soumise à ' + U }] }
    ],
    answer: '<p>' + R + '′ = ' + fr('2' + R, '7') + ' et ' + U + '′ = ' + fr(U, '2') + ' = ' + fr(R + '·' + I, '8') + '.</p>',
    traps: ['Ne pas voir que la 2' + R + ' du bas est en série avec ' + R + ' et 3' + R + ' : elle est dessinée sur le fil du bas, mais aucun nœud ne la sépare de la boucle de droite.',
      'Croire que la source de courant impose ' + U + ' : elle impose ' + I + ', et ' + U + ' = ' + v('R', 'éq') + '·' + I + ' dépend de toutes les résistances.',
      'Oublier ' + R + '′ dans l’association : elle est en parallèle avec le reste du circuit.',
      'Écrire ' + U + '′ = 3' + R + '·' + I + ' : 3' + R + ' ne reçoit qu’une partie de ' + I + '.',
      'Chercher ' + U + '′ sur le schéma simplifié : elle n’y apparaît plus, il faut revenir au circuit de départ.'],
    official: true
  });

  /* ---------- Ex 3 : tableau d’interrupteurs (source de tension) ---------- */
  /* k1, k2 : undefined (sujet, interrupteurs dessinés ouverts), 'O' (trou) ou 'F' (fil) */
  function s17e3(k1, k2) {
    var w = ['M130 95H60V230H410V146', 'M410 110V95H230', 'M330 95V230', 'M130 95V55H230V95', 'M130 95V135H162', 'M198 135H230V95'], parts = [];
    if (!k1) parts.push({ t: 'K', x: 180, y: 135, d: 'h', open: true, l: 'K_1', lp: 's' });
    else if (k1 === 'F') w.push({ d: 'M162 135H198', c: 'cz-hl' });
    else parts.push({ t: 'term', x: 162, y: 135 }, { t: 'term', x: 198, y: 135 });
    if (!k2) parts.push({ t: 'K', x: 410, y: 128, d: 'v', open: true, l: 'K_2', lp: [-24, 5, 'end'] });
    else if (k2 === 'F') w.push({ d: 'M410 110V146', c: 'cz-hl' });
    else parts.push({ t: 'term', x: 410, y: 110 }, { t: 'term', x: 410, y: 146 });
    if (k1) parts.push({ t: 'txt', x: 180, y: 158, s: k1 === 'F' ? 'K_1 fermé' : 'K_1 ouvert', c: 'cz-tiny' });
    if (k2) parts.push({ t: 'txt', x: 396, y: 132, s: k2 === 'F' ? 'K_2 fermé' : 'K_2 ouvert', c: 'cz-tiny', a: 'end' });
    parts.push({ t: 'E', x: 60, y: 165, d: 'v', p: 'n', l: 'E', as: 'w' },
      { t: 'R', x: 180, y: 55, l: 'R_1', lp: 's', c: k1 === 'F' ? 'cz-ghost' : '' },
      { t: 'U', a: [200, 25], b: [160, 25], l: 'U_1' },
      { t: 'R', x: 330, y: 165, d: 'v', l: 'R_2', lp: 'w' },
      { t: 'R', x: 410, y: 192, d: 'v', l: 'R_3', lp: 'w', c: k2 === 'O' ? 'cz-ghost' : '' },
      { t: 'U', a: [440, 147], b: [440, 109], l: 'U' },
      { t: 'U', a: [440, 216], b: [440, 168], l: 'U_3' },
      { t: 'dot', x: 130, y: 95 }, { t: 'dot', x: 230, y: 95 }, { t: 'dot', x: 330, y: 95 }, { t: 'dot', x: 330, y: 230 });
    return { w: 480, h: 250, aria: 'Source E ; R1 en parallèle avec l’interrupteur K1 ; R2 vers le fil du bas ; branche de droite K2 puis R3 ; flèches U1, U (aux bornes de K2) et U3', wires: w, parts: parts };
  }
  var D17 = v('R', 1) + v('R', 2) + ' + ' + v('R', 1) + v('R', 3) + ' + ' + v('R', 2) + v('R', 3);
  L.push({
    id: 'p2017-ex3', exam: 'p2017', kind: 'partiel', order: 3,
    src: 'Partiel nov. 2017 · Ex 3',
    title: 'Tableau d’interrupteurs : tensions U₁, U₃ et U',
    pts: 4.5, topics: ['interrupteurs', 'diviseurs', 'calcul'], lvl: 2, time: 12,
    intro: '<p>Soit le circuit suivant :</p>' +
      '<p><i>Remarque préalable : les réponses attendues dépendent des positions des interrupteurs et sont indépendantes les unes des autres : ce n’est donc pas un "grand" exercice mais 4 "petits" à partir du même schéma. Redessinez les circuits sur votre brouillon pour pouvoir répondre correctement aux questions, et, <u>Commencez par les cas qui vous paraissent les plus simples!</u></i></p>' +
      '<p>La tension ' + E + ' et les 3 résistances sont supposées connues.</p>' +
      '<p>Remplir le tableau suivant (résultat seul, pas le détail des calculs). Les tensions demandées ne devront dépendre <b><u>QUE de ' + E + ' et/ou des résistances R1, R2 ou R3</u></b> (sauf s’ils sont nuls !) <b><u>et PAS les unes des autres !!</u></b></p>' +
      '<p style="text-align:center">Posez-vous les bonnes questions … vous aurez les bonnes réponses !!</p>' +
      table([K1, K2, u('U', 1), u('U', 3), U], [['O', 'O', DOTS, null, DOTS], ['O', 'F', DOTS, DOTS, DOTS], ['F', 'O', null, DOTS, DOTS], ['F', 'F', DOTS, DOTS, null]]) +
      '<p>Rq : O = Ouvert ; F = Fermé</p>',
    figs: [{ spec: s17e3(), cap: 'Circuit du sujet (interrupteurs dessinés ouverts)' }],
    questions: [],
    hints: ['Redessine le circuit pour chaque cas : un interrupteur fermé devient un fil (tension nulle à ses bornes), un interrupteur ouvert devient un trou (courant nul dans sa branche).',
      'Quand ' + K1 + ' est fermé, que vaut la tension aux bornes de ' + R1 + ' ? Quand ' + K2 + ' est ouvert, quel courant traverse ' + R3 + ' ?',
      'La tension aux bornes d’un interrupteur ouvert se trouve avec la loi des mailles. Les autres tensions sortent d’un pont diviseur de tension.'],
    solution: [
      { t: 'Cas K₁ ouvert, K₂ ouvert',
        html: '<p>' + K2 + ' ouvert : la branche de droite est coupée, aucun courant ne traverse ' + R3 + '. Donc ' + u('U', 3) + ' = ' + R3 + ' × 0 = 0 (case noircie).</p>' +
          '<p>Il reste une seule maille : ' + E + ', ' + R1 + ' et ' + R2 + ' en série. Le courant sort par la borne + de ' + E + ' et traverse ' + R1 + ' de gauche à droite ; la flèche ' + u('U', 1) + ' pointe vers la gauche, à l’opposé : convention récepteur, ' + u('U', 1) + ' est positive. Pont diviseur de tension : ' + u('U', 1) + ' = ' + fr(R1 + E, R1 + ' + ' + R2) + '.</p>' +
          '<p>' + U + ' est la tension aux bornes de ' + K2 + ' ouvert, et elle n’est pas nulle. Comme ' + R3 + ' ne porte aucun courant, le bas de ' + K2 + ' est au potentiel du fil du bas : ' + U + ' est la tension aux bornes de ' + R2 + ', ' + U + ' = ' + fr(R2 + E, R1 + ' + ' + R2) + '.</p>',
        figs: [{ spec: s17e3('O', 'O'), cap: K1 + ' ouvert, ' + K2 + ' ouvert : une seule maille ' + E + ', ' + R1 + ', ' + R2 + ' ; ' + R3 + ' ne reçoit aucun courant' }] },
      { t: 'Cas K₁ ouvert, K₂ fermé',
        html: '<p>' + K2 + ' fermé est un fil : ' + U + ' = 0.</p>' +
          '<p>' + R3 + ' relie alors le haut de ' + R2 + ' au fil du bas : ' + R2 + ' et ' + R3 + ' sont en parallèle, et ' + u('U', 3) + ' est aussi la tension aux bornes de ' + R2 + '. ' + R2 + ' // ' + R3 + ' = ' + R2 + R3 + '/(' + R2 + ' + ' + R3 + '), en série avec ' + R1 + '.</p>' +
          '<p>Pont diviseur : ' + u('U', 1) + ' = ' + R1 + '·' + E + '/(' + R1 + ' + ' + R2 + R3 + '/(' + R2 + ' + ' + R3 + ')). Pour n’avoir qu’une barre de fraction, multiplie en haut et en bas par (' + R2 + ' + ' + R3 + ') :</p>' +
          '<p class="f-block">' + u('U', 1) + ' = ' + fr(R1 + '(' + R2 + ' + ' + R3 + ')' + E, D17) + ' &nbsp; et &nbsp; ' + u('U', 3) + ' = ' + fr(R2 + R3 + E, D17) + '</p>' +
          '<p>Contrôle par la loi des mailles : ' + u('U', 1) + ' + ' + U + ' + ' + u('U', 3) + ' = ' + E + ', et ici ' + u('U', 1) + ' + ' + u('U', 3) + ' = (' + D17 + ')' + E + '/(' + D17 + ') = ' + E + '. ✓</p>',
        figs: [{ spec: s17e3('O', 'F'), cap: K1 + ' ouvert, ' + K2 + ' fermé : ' + R3 + ' se retrouve en parallèle sur ' + R2 }] },
      { t: 'Cas K₁ fermé, K₂ ouvert',
        html: '<p>' + K1 + ' fermé est un fil posé aux bornes de ' + R1 + ' : ' + R1 + ' est court-circuitée, ' + u('U', 1) + ' = 0 (case noircie).</p>' +
          '<p>' + K2 + ' ouvert : aucun courant dans ' + R3 + ', donc ' + u('U', 3) + ' = 0.</p>' +
          '<p>Loi des mailles dans la maille ' + E + ', ' + K1 + ', ' + K2 + ', ' + R3 + ' : ' + E + ' = ' + u('U', 1) + ' + ' + U + ' + ' + u('U', 3) + ' = 0 + ' + U + ' + 0, donc <b>' + U + ' = ' + E + '</b>. Toute la tension de la source se retrouve aux bornes de l’interrupteur ouvert.</p>',
        figs: [{ spec: s17e3('F', 'O'), cap: K1 + ' fermé, ' + K2 + ' ouvert : ' + R1 + ' est court-circuitée et ' + R3 + ' ne reçoit aucun courant' }] },
      { t: 'Cas K₁ fermé, K₂ fermé',
        html: '<p>' + u('U', 1) + ' = 0 (' + K1 + ' court-circuite ' + R1 + ') et ' + U + ' = 0 (' + K2 + ' est un fil, case noircie).</p>' +
          '<p>' + R3 + ' est alors reliée directement aux deux bornes de ' + E + ' par les deux fils : ' + u('U', 3) + ' = ' + E + '. Même maille que ci-dessus : ' + E + ' = 0 + 0 + ' + u('U', 3) + '.</p>',
        figs: [{ spec: s17e3('F', 'F'), cap: K1 + ' fermé, ' + K2 + ' fermé : ' + R2 + ' et ' + R3 + ' sont directement aux bornes de ' + E }] }
    ],
    answer: table([K1, K2, u('U', 1), u('U', 3), U], [
      ['O', 'O', fr(R1 + E, R1 + ' + ' + R2), null, fr(R2 + E, R1 + ' + ' + R2)],
      ['O', 'F', fr(R1 + '(' + R2 + ' + ' + R3 + ')' + E, D17), fr(R2 + R3 + E, D17), '0'],
      ['F', 'O', null, '0', E],
      ['F', 'F', '0', E, null]]) +
      '<p style="margin-top:.5rem">Les cases noircies valent 0 : ' + u('U', 3) + ' avec ' + K2 + ' ouvert, ' + u('U', 1) + ' avec ' + K1 + ' fermé, ' + U + ' avec ' + K2 + ' fermé.</p>',
    traps: ['Croire que la tension aux bornes d’un interrupteur ouvert est nulle : c’est le courant qui est nul. Ici ' + U + ' = ' + E + ' quand ' + K1 + ' est fermé, et ' + U + ' = ' + R2 + E + '/(' + R1 + ' + ' + R2 + ') quand les deux sont ouverts.',
      'Oublier qu’un interrupteur fermé en parallèle sur ' + R1 + ' la court-circuite : ' + u('U', 1) + ' = 0.',
      'Oublier qu’une branche ouverte ne porte aucun courant : ' + u('U', 3) + ' = 0 dès que ' + K2 + ' est ouvert.',
      'Exprimer une tension à partir d’une autre (' + u('U', 1) + ' = ' + E + ' − ' + u('U', 3) + '…) : l’énoncé l’interdit, tout doit dépendre de ' + E + ' et des résistances.',
      'Laisser une fraction de fraction pour ' + R2 + ' // ' + R3 + ' : multiplie en haut et en bas par (' + R2 + ' + ' + R3 + ').',
      'Se tromper de signe à cause de la flèche ' + u('U', 1) + ' dessinée vers la gauche : elle pointe vers la borne d’entrée du courant, ' + u('U', 1) + ' est positive.'],
    official: true
  });

  /* ---------- Ex 4 : théorème de superposition ---------- */
  /* st : undefined (sujet), 1 (E1 seule, I3 éteinte), 2 (I3 seule, E1 éteinte) */
  function s17e4(st) {
    var w = ['M50 40H290', 'M50 200H290', 'M290 40V200', st === 2 ? { d: 'M50 40V200', c: 'cz-hl' } : 'M50 40V200', st === 1 ? { d: 'M290 40H400V200H290', c: 'cz-ghost' } : 'M290 40H400V200H290'];
    var parts = [{ t: 'R', x: 150, y: 40, l: 'R_1', lp: 's' }, { t: 'I', x: 235, y: 40, d: 'e', l: st === 1 ? 'I_{1}′' : st === 2 ? 'I_{1}″' : 'I_1' },
      { t: 'R', x: 290, y: 120, d: 'v', l: 'R_3', lp: 'w' }, { t: 'R', x: 150, y: 200, l: 'R_2', lp: 'n' },
      { t: 'J', x: 400, y: 120, d: 'v', to: 'n', l: 'I_3', as: 'e', c: st === 1 ? 'cz-ghost' : '' },
      { t: 'dot', x: 290, y: 40 }, { t: 'dot', x: 290, y: 200 }, { t: 'txt', x: 290, y: 28, s: 'A', c: 'cz-n' }, { t: 'txt', x: 290, y: 226, s: 'B', c: 'cz-n' }];
    if (st !== 2) parts.push({ t: 'E', x: 50, y: 120, d: 'v', p: 'n', l: 'E_1', as: 'w' });
    else parts.push({ t: 'txt', x: 62, y: 125, s: 'fil', c: 'cz-tiny', a: 'start' });
    if (st === 1) parts.push({ t: 'txt', x: 400, y: 165, s: 'éteinte', c: 'cz-tiny' });
    return { w: 460, h: 240, aria: 'Source E1 à gauche, R1 en haut avec la flèche I1 vers A, R3 entre A et B, source de courant I3 vers A à droite, R2 en bas', wires: w, parts: parts };
  }
  var I1 = c('I', 1), I3 = c('I', 3), E1 = u('E', 1);
  L.push({
    id: 'p2017-ex4', exam: 'p2017', kind: 'partiel', order: 4,
    src: 'Partiel nov. 2017 · Ex 4',
    title: 'Superposition : le courant dans R₁',
    pts: 2.5, topics: ['superposition', 'source-courant', 'diviseurs', 'calcul'], lvl: 2, time: 8,
    intro: '<p>Soit le circuit suivant :</p>',
    figs: [{ spec: s17e4(), cap: 'Circuit du sujet' }],
    questions: ['Déterminer l’expression de ' + I1 + ' dans ' + R1 + ' en fonction de ' + E1 + ', ' + I3 + ', ' + R1 + ', ' + R2 + ', ' + R3 + ' <u>en utilisant le théorème de superposition</u>.'],
    hints: ['Traite les deux sources l’une après l’autre : d’abord ' + E1 + ' seule, puis ' + I3 + ' seule.',
      'Pour éteindre une source, enlève le rond : il reste un fil pour une source de tension, un trou pour une source de courant.',
      'Avec ' + I3 + ' seule, la branche ' + R1 + ' + ' + R2 + ' est en parallèle sur ' + R3 + ' : pont diviseur de courant. Compare ensuite le sens du courant obtenu à la flèche ' + I1 + '.'],
    solution: [
      { t: 'État 1 : E₁ seule',
        html: '<p>On garde ' + E1 + ' et on éteint ' + I3 + ' : une source de courant éteinte impose 0 A, c’est un trou. La branche de droite disparaît.</p>' +
          '<p>Il reste une seule maille : ' + E1 + ', ' + R1 + ', ' + R3 + ' et ' + R2 + ' en série. Le courant sort par la borne + de ' + E1 + ' et circule dans le sens de la flèche ' + I1 + ' :</p>' +
          '<p class="f-block">' + I1 + '′ = ' + fr(E1, R1 + ' + ' + R2 + ' + ' + R3) + '</p>',
        figs: [{ spec: s17e4(1), cap: 'État 1 : ' + I3 + ' éteinte (trou), une seule maille' }] },
      { t: 'État 2 : I₃ seule',
        html: '<p>On garde ' + I3 + ' et on éteint ' + E1 + ' : une source de tension éteinte impose 0 V, c’est un fil.</p>' +
          '<p>' + R1 + ' et ' + R2 + ' se suivent alors par ce fil : elles sont en série, ' + R1 + ' + ' + R2 + '. Cette branche relie A et B, comme ' + R3 + ' : elle est en parallèle sur ' + R3 + '.</p>' +
          '<p>' + I3 + ' arrive en A et se partage. Pont diviseur de courant, avec la résistance de l’autre branche au numérateur : la branche ' + R1 + ' + ' + R2 + ' reçoit ' + R3 + I3 + '/(' + R1 + ' + ' + R2 + ' + ' + R3 + '). Ce courant part de A et traverse ' + R1 + ' de droite à gauche, à l’opposé de la flèche ' + I1 + ' :</p>' +
          '<p class="f-block">' + I1 + '″ = −' + fr(R3 + I3, R1 + ' + ' + R2 + ' + ' + R3) + '</p>',
        figs: [{ spec: s17e4(2), cap: 'État 2 : ' + E1 + ' éteinte (fil), ' + R1 + ' + ' + R2 + ' en parallèle sur ' + R3 }] },
      { t: 'Superposition',
        html: '<p>On additionne les deux contributions :</p>' +
          '<p class="f-block">' + I1 + ' = ' + I1 + '′ + ' + I1 + '″ = ' + fr(E1 + ' − ' + R3 + I3, R1 + ' + ' + R2 + ' + ' + R3) + '</p>' +
          '<p>Contrôle d’homogénéité : ' + R3 + I3 + ' est une tension, comme ' + E1 + ' ; divisée par des ohms, elle donne bien un courant.</p>' }
    ],
    answer: '<p>' + I1 + ' = ' + fr(E1 + ' − ' + R3 + '·' + I3, R1 + ' + ' + R2 + ' + ' + R3) + '</p>',
    traps: ['Inverser les extinctions : une source de tension éteinte devient un fil, une source de courant éteinte devient un trou.',
      'Oublier le signe moins de ' + I1 + '″ : ' + I3 + ' fait circuler du courant dans ' + R1 + ' à l’opposé de la flèche ' + I1 + '.',
      'Pont diviseur de courant : au numérateur, c’est la résistance de l’autre branche (' + R3 + ') qui apparaît.',
      'Ne pas voir que ' + R1 + ' et ' + R2 + ' sont en série une fois ' + E1 + ' remplacée par un fil.',
      'Dans l’état 1, chercher un parallèle avec ' + R3 + ' : la branche de ' + I3 + ' est un trou, il ne reste qu’une maille.'],
    official: true
  });

  /* ---------- Ex 5 : association de résistances ---------- */
  /* réseau vertical : A en haut, B en bas ; v18 = variante d’oct. 2018 */
  function sNet(v18) {
    var w = ['M260 24V60', 'M50 60H360', 'M260 60V310', 'M50 60V430', 'M50 310H360', 'M260 310V466', 'M360 310V430', 'M50 430H360'];
    if (v18) w.push('M160 60V190H260', 'M360 60V310');
    else w.push('M160 60V190H360', 'M360 60V190');
    var parts = [{ t: 'R', x: 160, y: 125, d: 'v', l: '4R', lp: 'w' }, { t: 'R', x: 260, y: 125, d: 'v', l: '2R', lp: 'w' }, { t: 'R', x: 360, y: 125, d: 'v', l: '4R', lp: 'w' },
      { t: 'R', x: 260, y: 250, d: 'v', l: 'R', lp: 'w' }, { t: 'R', x: 50, y: 185, d: 'v', l: v18 ? '4R' : '2R', lp: 'w' },
      { t: 'R', x: 50, y: 370, d: 'v', l: '3R', lp: 'w' }, { t: 'R', x: 260, y: 370, d: 'v', l: '3R', lp: 'w' }, { t: 'R', x: 360, y: 370, d: 'v', l: '3R', lp: 'w' },
      { t: 'dot', x: 160, y: 60 }, { t: 'dot', x: 260, y: 60 }, { t: 'dot', x: 260, y: 190 }, { t: 'dot', x: 50, y: 310 }, { t: 'dot', x: 260, y: 310 }, { t: 'dot', x: 260, y: 430 },
      { t: 'term', x: 260, y: 22, l: 'A' }, { t: 'term', x: 260, y: 468, l: 'B' }];
    if (v18) parts.push({ t: 'dot', x: 360, y: 310 });
    return { w: 420, h: 490, aria: v18 ? 'Réseau entre A et B : 4R et 2R du haut vers un nœud, puis R vers le rail du milieu ; deux 4R de A vers le rail du milieu ; trois 3R en parallèle vers B'
      : 'Réseau entre A et B : 4R, 2R et 4R du haut vers un nœud, puis R vers le rail du milieu ; 2R de A vers le rail du milieu ; trois 3R en parallèle vers B', wires: w, parts: parts };
  }
  var REQ_Q = 'Quelle est la résistance équivalente totale (détaillez votre raisonnement – On imagine que le courant « entre » par le point A et « ressort » en B)';
  L.push({
    id: 'p2017-ex5', exam: 'p2017', kind: 'partiel', order: 5,
    src: 'Partiel nov. 2017 · Ex 5',
    title: 'Résistance équivalente d’un réseau à trois étages',
    pts: 2, topics: ['req'], lvl: 1, time: 5,
    figs: [{ spec: sNet(false), cap: 'Réseau du sujet' }],
    questions: [REQ_Q],
    hints: ['Repère les nœuds : le rail du haut (A), le point sous les trois résistances du haut, le rail du milieu et le rail du bas (B).',
      'Les trois résistances du haut relient les deux mêmes nœuds, tout comme les trois 3' + R + ' du bas : réduis chaque groupe en une seule résistance.',
      'La 2' + R + ' de gauche relie A au rail du milieu : elle est en parallèle avec tout le chemin du centre entre ces deux nœuds.'],
    solution: [
      { t: 'Repérer les nœuds',
        html: '<p>Appelle N le point où se rejoignent les pieds des trois résistances du haut (4' + R + ', 2' + R + ', 4' + R + '), et M le rail du milieu. Le courant entre en A, descend jusqu’à M par deux chemins (le chemin du centre et la 2' + R + ' de gauche), puis va de M à B par les trois 3' + R + '.</p>' },
      { t: 'Réduire pas à pas',
        html: '<ol><li>Groupe du haut, entre A et N : 4' + R + ' // 4' + R + ' = 2' + R + ', puis 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
          '<li>Groupe du bas, entre M et B : trois 3' + R + ' en parallèle, 3' + R + '/3 = ' + R + '.</li>' +
          '<li>Chemin du centre, entre A et M : ' + R + ' (groupe du haut) en série avec la ' + R + ' verticale, ' + R + ' + ' + R + ' = 2' + R + '.</li>' +
          '<li>Ce chemin est en parallèle avec la 2' + R + ' de gauche, qui relie elle aussi A à M : 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
          '<li>Il reste ' + R + ' (de A à M) en série avec ' + R + ' (de M à B).</li></ol>' +
          '<p><b>' + v('R', 'éq') + ' = ' + R + ' + ' + R + ' = 2' + R + '</b>.</p>',
        figs: [{ spec: { w: 480, h: 300, aria: 'Trois étapes de réduction entre A et B',
          wires: ['M100 22V278', 'M100 50H45V200H100', 'M280 22V278', 'M280 50H225V200H280', 'M420 22V278'],
          parts: [{ t: 'R', x: 100, y: 88, d: 'v', l: 'R' }, { t: 'R', x: 100, y: 152, d: 'v', l: 'R' }, { t: 'R', x: 100, y: 242, d: 'v', l: 'R' }, { t: 'R', x: 45, y: 125, d: 'v', l: '2R', lp: 'w' },
            { t: 'txt', x: 88, y: 125, s: 'N', c: 'cz-n', a: 'end' }, { t: 'txt', x: 112, y: 214, s: 'M', c: 'cz-n', a: 'start' },
            { t: 'dot', x: 100, y: 50 }, { t: 'dot', x: 100, y: 200 }, { t: 'term', x: 100, y: 20, l: 'A' }, { t: 'term', x: 100, y: 280, l: 'B' },
            arrow(170, 156),
            { t: 'R', x: 280, y: 125, d: 'v', l: '2R' }, { t: 'R', x: 225, y: 125, d: 'v', l: '2R', lp: 'w' }, { t: 'R', x: 280, y: 242, d: 'v', l: 'R' },
            { t: 'dot', x: 280, y: 50 }, { t: 'dot', x: 280, y: 200 }, { t: 'term', x: 280, y: 20, l: 'A' }, { t: 'term', x: 280, y: 280, l: 'B' },
            arrow(350, 156),
            { t: 'R', x: 420, y: 100, d: 'v', l: 'R' }, { t: 'R', x: 420, y: 200, d: 'v', l: 'R' }, { t: 'term', x: 420, y: 20, l: 'A' }, { t: 'term', x: 420, y: 280, l: 'B' }] },
          cap: 'De gauche à droite : groupes du haut et du bas réduits à ' + R + ' ; ' + R + ' + ' + R + ' = 2' + R + ' en parallèle avec la 2' + R + ' de gauche ; 2' + R + ' // 2' + R + ' = ' + R + ', en série avec ' + R }] }
    ],
    answer: '<p>' + v('R', 'éq') + ' = 2' + R + '</p>',
    traps: ['Croire que la 2' + R + ' de gauche est en parallèle avec la seule ' + R + ' du centre : elle relie A au rail du milieu, donc elle est en parallèle avec tout le chemin du centre (groupe du haut + ' + R + ').',
      'Oublier la 2' + R + ' centrale du groupe du haut : 4' + R + ', 2' + R + ' et 4' + R + ' sont toutes les trois entre A et N.',
      'Additionner les trois 3' + R + ' du bas au lieu de faire le parallèle : <var>n</var> résistances égales en parallèle donnent ' + R + '/<var>n</var>.'],
    official: true
  });

  /* FIN */
})();
