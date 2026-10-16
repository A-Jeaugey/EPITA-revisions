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
  /* tableau ; une cellule null = case noircie du sujet.
     L’enveloppe « width:0;min-width:100% » empêche un tableau large d’élargir la carte : sur mobile, il défile dans .tbl. */
  function table(head, rows) {
    var nw = ' style="white-space:nowrap"';
    return '<div style="width:0;min-width:100%"><div class="tbl"><table><thead><tr>' + head.map(function (h) { return '<th' + nw + '>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr>' + r.map(function (x) { return x === null ? '<td style="background:var(--muted)" title="case noircie"><span class="sr-only">case noircie</span></td>' : '<td' + nw + '>' + x + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></div>';
  }
  var K1 = v('K', 1), K2 = v('K', 2);
  /* flèche « étape suivante » entre deux schémas d’une même figure */
  function arrow(x, y) { return { t: 'raw', svg: '<path class="cz-w" d="M' + (x - 16) + ' ' + y + 'H' + (x + 8) + '"/><path class="cz-dot" d="M' + (x + 17) + ' ' + y + 'L' + (x + 6) + ' ' + (y - 6) + 'L' + (x + 6) + ' ' + (y + 6) + 'Z"/>' }; }

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
        html: '<p>La source impose le courant ' + I + ' dans ' + v('R', 'éq') + '. Loi d’Ohm, en convention récepteur :</p>' +
          '<p class="f-block">' + U + ' = ' + v('R', 'éq') + '·' + I + ' = ' + fr('2' + R + '·' + R + '′·' + I, '2' + R + ' + ' + R + '′') + '</p>' +
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
        html: '<p>On garde ' + E1 + ' et on éteint ' + I3 + ' : une source de courant éteinte impose 0 A, c’est un trou. La branche de droite disparaît.</p>' +
          '<p>Il reste une seule maille : ' + E1 + ', ' + R1 + ', ' + R3 + ' et ' + R2 + ' en série. Le courant sort par la borne + de ' + E1 + ' et circule dans le sens de la flèche ' + I1 + ' :</p>' +
          '<p class="f-block">' + I1 + '′ = ' + fr(E1, R1 + ' + ' + R2 + ' + ' + R3) + '</p>',
        figs: [{ spec: s17e4(1), cap: 'État 1 : ' + I3 + ' éteinte (trou), une seule maille' }] },
      { t: 'État 2 : I₃ seule',
        html: '<p>On garde ' + I3 + ' et on éteint ' + E1 + ' : une source de tension éteinte impose 0 V, c’est un fil.</p>' +
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

  /* =====================================================================
     Partiel oct. 2018 (promo 2023) : pas de corrigé officiel
     ===================================================================== */

  /* ---------- Ex 2 : lois de Kirchhoff, application numérique ---------- */
  function s18e2(sol) {
    var parts = [{ t: 'R', x: 120, y: 40, l: 'R_3', lp: 'n' }, { t: 'R', x: 120, y: 120, l: 'R_4', lp: 'n' }, { t: 'R', x: 240, y: 200, l: 'R_1', lp: 'n' },
      { t: 'R', x: 380, y: 120, d: 'v', l: 'R_2' }, { t: 'E', x: 210, y: 280, d: 'h', p: 'w', l: 'E', as: 's' },
      { t: 'dot', x: 40, y: 120 }, { t: 'dot', x: 40, y: 200 }, { t: 'dot', x: 200, y: 40 }, { t: 'dot', x: 380, y: 200 }];
    if (sol) parts.push({ t: 'U', a: [145, 64], b: [95, 64], l: 'U_3', lp: 's' }, { t: 'U', a: [145, 144], b: [95, 144], l: 'U_4', lp: 's' },
      { t: 'U', a: [265, 224], b: [215, 224], l: 'U_1', lp: 's' }, { t: 'U', a: [356, 142], b: [356, 98], l: 'U_2', lp: 'w' },
      { t: 'txt', x: 30, y: 166, s: 'M', c: 'cz-n', a: 'end' }, { t: 'txt', x: 208, y: 30, s: 'N', c: 'cz-n', a: 'start' }, { t: 'txt', x: 392, y: 246, s: 'P', c: 'cz-n', a: 'start' });
    return { w: 440, h: 340, aria: 'R3 sur le fil du haut, R4 en dessous reliée au fil du haut par un petit fil vertical, R2 à droite, R1 au milieu, source E sur le fil du bas fléchée vers la gauche',
      wires: ['M40 40H380V280H40Z', 'M40 120H200V40', 'M40 200H380'], parts: parts };
  }
  var D18 = R2 + R3 + ' + ' + R2 + R4 + ' + ' + R3 + R4;
  L.push({
    id: 'p2018-ex2', exam: 'p2018', kind: 'partiel', order: 2,
    src: 'Partiel oct. 2018 · Ex 2',
    title: 'Tensions aux bornes de quatre résistances',
    pts: 6, topics: ['kirchhoff', 'req', 'diviseurs'], lvl: 2, time: 12,
    intro: '<p>On considère le circuit ci-contre et on donne : ' + E + ' = 3 V, ' + R1 + ' = 15 Ω, ' + R2 + ' = 6 Ω, ' + R3 + ' = 20 Ω et ' + R4 + ' = 5 Ω.</p>',
    figs: [{ spec: s18e2(), cap: 'Circuit du sujet' }],
    questions: ['Calculer les tensions aux bornes de chacune des résistances. Vous donnerez l’expression littérale avant de faire l’application numérique.<br><i>Rappel : N’oubliez pas de leur donner un nom et de les flécher!!</i>'],
    hints: ['Suis les fils sans composant : tout le fil de gauche est un seul nœud, et le petit fil vertical à droite de ' + R3 + ' relie le bout de ' + R4 + ' au fil du haut.',
      R1 + ' est branchée directement entre les deux bornes de la source. ' + R3 + ' et ' + R4 + ' relient les deux mêmes nœuds.',
      'Remplace ' + R3 + ' // ' + R4 + ' par une seule résistance, puis applique le pont diviseur de tension avec ' + R2 + '.'],
    solution: [
      { t: 'Nommer et flécher',
        html: '<p>Nomme M le fil de gauche, relié à la borne + de ' + E + ' (la flèche ' + E + ' pointe vers la gauche). Nomme N le point à droite de ' + R3 + ', relié par le petit fil vertical au bout de ' + R4 + ', et P le fil de droite sous ' + R2 + ', relié à la borne −.</p>' +
          '<p>Les courants vont de M vers P. Flèche chaque tension en convention récepteur, à l’opposé du courant : ' + u('U', 1) + ', ' + u('U', 3) + ' et ' + u('U', 4) + ' pointent vers M, ' + u('U', 2) + ' pointe vers N.</p>',
        figs: [{ spec: s18e2(true), cap: 'Nœuds nommés, tensions fléchées en convention récepteur' }] },
      { t: 'Analyser le circuit',
        html: '<ul><li>' + R1 + ' est branchée directement entre M et P, donc aux bornes de ' + E + ' : <b>' + u('U', 1) + ' = ' + E + ' = 3 V</b>, sans calcul.</li>' +
          '<li>' + R3 + ' et ' + R4 + ' vont toutes les deux de M à N : elles sont en parallèle et ont la même tension, ' + u('U', 3) + ' = ' + u('U', 4) + '. ' + v('R', 34) + ' = ' + R3 + R4 + '/(' + R3 + ' + ' + R4 + ') = (20 × 5)/25 = 4 Ω.</li>' +
          '<li>Le chemin M → N → P est ' + v('R', 34) + ' en série avec ' + R2 + ', soumis lui aussi à ' + E + '.</li></ul>',
        figs: [{ spec: { w: 440, h: 230, aria: 'Circuit simplifié : E, R1 à ses bornes, puis R34 en série avec R2', wires: ['M50 40H370V200H50Z', 'M170 40V200'],
          parts: [{ t: 'E', x: 50, y: 120, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 170, y: 120, d: 'v', l: 'R_1', lp: 'w' }, { t: 'U', a: [198, 160], b: [198, 80], l: 'U_1' },
            { t: 'R', x: 270, y: 40, l: 'R_{34} = 4 Ω', lp: 'n' }, { t: 'U', a: [295, 64], b: [245, 64], l: 'U_3 = U_4', lp: 's' },
            { t: 'R', x: 370, y: 120, d: 'v', l: 'R_2', lp: 'w' }, { t: 'U', a: [400, 160], b: [400, 80], l: 'U_2' },
            { t: 'dot', x: 170, y: 40 }, { t: 'dot', x: 170, y: 200 }, { t: 'txt', x: 110, y: 30, s: 'M', c: 'cz-n' }, { t: 'txt', x: 340, y: 30, s: 'N', c: 'cz-n' }, { t: 'txt', x: 270, y: 222, s: 'P', c: 'cz-n' }] },
          cap: 'Circuit simplifié : ' + R1 + ' aux bornes de ' + E + ', et ' + v('R', 34) + ' en série avec ' + R2 }] },
      { t: 'Pont diviseur de tension',
        html: '<p>Sur le chemin M → N → P, ' + E + ' se partage entre ' + v('R', 34) + ' et ' + R2 + '. Pour revenir aux résistances de départ, multiplie en haut et en bas par (' + R3 + ' + ' + R4 + ') :</p>' +
          '<p class="f-block">' + u('U', 3) + ' = ' + u('U', 4) + ' = ' + fr(v('R', 34) + E, v('R', 34) + ' + ' + R2) + ' = ' + fr(R3 + R4 + E, D18) + ' = ' + fr('3 × 100', '120 + 30 + 100') + ' = 1,2 V</p>' +
          '<p class="f-block">' + u('U', 2) + ' = ' + fr(R2 + E, v('R', 34) + ' + ' + R2) + ' = ' + fr(R2 + '(' + R3 + ' + ' + R4 + ')' + E, D18) + ' = ' + fr('3 × 150', '250') + ' = 1,8 V</p>' },
      { t: 'Vérifier',
        html: '<ul><li>Loi des mailles sur M → N → P : ' + u('U', 3) + ' + ' + u('U', 2) + ' = 1,2 + 1,8 = 3 V = ' + E + '. ✓</li>' +
          '<li>Courants : ' + c('I', 2) + ' = 1,8/6 = 0,3 A, ' + c('I', 3) + ' = 1,2/20 = 0,06 A, ' + c('I', 4) + ' = 1,2/5 = 0,24 A. Loi des nœuds en N : 0,06 + 0,24 = 0,3 A. ✓</li>' +
          '<li>La source débite ' + c('I', 1) + ' + ' + c('I', 2) + ' = 3/15 + 0,3 = 0,5 A.</li></ul>' }
    ],
    answer: '<p>Tensions fléchées en convention récepteur :</p>' +
      '<p>' + u('U', 1) + ' = ' + E + ' = 3 V ; ' + u('U', 3) + ' = ' + u('U', 4) + ' = ' + fr(R3 + R4 + E, D18) + ' = 1,2 V ; ' + u('U', 2) + ' = ' + fr(R2 + '(' + R3 + ' + ' + R4 + ')' + E, D18) + ' = 1,8 V.</p>',
    traps: ['Ne pas voir le parallèle ' + R3 + ' // ' + R4 + ' : c’est le petit fil vertical à droite de ' + R3 + ' qui relie le bout de ' + R4 + ' au fil du haut.',
      'Chercher ' + u('U', 1) + ' avec un pont diviseur : ' + R1 + ' est branchée directement aux bornes de ' + E + ', donc ' + u('U', 1) + ' = ' + E + '.',
      'Se tromper de borne + : la source est sur le fil du bas et sa flèche pointe vers la gauche, la borne + est à gauche.',
      'Oublier de nommer et de flécher les tensions : l’énoncé l’exige, et sans flèche le signe d’une tension n’a pas de sens.',
      'Donner directement 1,2 V et 1,8 V : l’expression littérale est demandée avant l’application numérique.'],
    official: false
  });

  /* ---------- Ex 3 : tableau d’interrupteurs (source de courant) ---------- */
  /* k1, k2 : undefined (sujet), 'O' (trou) ou 'F' (fil) ; dans les cas, flèches I1, I2, I3 vers le bas */
  function s18e3(k1, k2) {
    var w = ['M60 40H380', 'M60 40V270H287', 'M323 270H380V40', 'M230 40V270', 'M230 155H287', 'M323 155H380'], parts = [];
    if (!k2) parts.push({ t: 'K', x: 305, y: 155, d: 'h', open: true, l: 'K_2', lp: 's' });
    else if (k2 === 'F') w.push({ d: 'M287 155H323', c: 'cz-hl' });
    else parts.push({ t: 'term', x: 287, y: 155 }, { t: 'term', x: 323, y: 155 });
    if (!k1) parts.push({ t: 'K', x: 305, y: 270, d: 'h', open: true, l: 'K_1', lp: [-4, -24, 'middle'] });
    else if (k1 === 'F') w.push({ d: 'M287 270H323', c: 'cz-hl' });
    else parts.push({ t: 'term', x: 287, y: 270 }, { t: 'term', x: 323, y: 270 });
    if (k1) parts.push({ t: 'txt', x: 305, y: 177, s: k2 === 'F' ? 'K_2 fermé' : 'K_2 ouvert', c: 'cz-tiny' }, { t: 'txt', x: 305, y: 258, s: k1 === 'F' ? 'K_1 fermé' : 'K_1 ouvert', c: 'cz-tiny' },
      { t: 'I', x: 230, y: 58, d: 's', l: 'I_1' }, { t: 'I', x: 380, y: 58, d: 's', l: 'I_2' }, { t: 'I', x: 230, y: 172, d: 's', l: 'I_3' });
    parts.push({ t: 'J', x: 60, y: 155, d: 'v', to: 'n', l: 'I', as: 'w' },
      { t: 'R', x: 230, y: 100, d: 'v', l: 'R_1', lp: 'w' },
      { t: 'R', x: 230, y: 212, d: 'v', l: 'R_3', lp: 'w', c: k1 === 'F' && k2 === 'F' ? 'cz-ghost' : '' },
      { t: 'R', x: 380, y: 100, d: 'v', l: 'R_2', lp: 'w', c: k1 === 'O' && k2 === 'O' ? 'cz-ghost' : '' },
      { t: 'dot', x: 230, y: 40 }, { t: 'dot', x: 230, y: 155 }, { t: 'dot', x: 380, y: 155 }, { t: 'dot', x: 230, y: 270 });
    return { w: 440, h: 290, aria: 'Source de courant I ; R1 puis R3 au milieu ; R2 à droite ; K2 relie le point entre R1 et R3 au bas de R2 ; K1 sur le fil du bas, entre le pied de R3 et le fil de droite', wires: w, parts: parts };
  }
  var S3 = R1 + ' + ' + R2 + ' + ' + R3, S12 = R1 + ' + ' + R2;
  L.push({
    id: 'p2018-ex3', exam: 'p2018', kind: 'partiel', order: 3,
    src: 'Partiel oct. 2018 · Ex 3',
    title: 'Tableau d’interrupteurs avec une source de courant',
    pts: 6, topics: ['interrupteurs', 'source-courant', 'diviseurs', 'calcul'], lvl: 2, time: 12,
    intro: '<p>Soit le circuit suivant :</p>' +
      '<p>Le courant ' + I + ' et les 3 résistances sont supposés connus.</p>' +
      '<p>On demande de déterminer les équations des courants DANS les 3 résistances (les indices des courants dans le tableau ci-dessous correspondent évidemment aux résistances correspondantes).</p>' +
      '<p>Remplir le tableau suivant (résultat seul, pas le détail des calculs). Les courants demandés ne devront dépendre <b><u>QUE de ' + I + ' et/ou des résistances R1, R2 ou R3</u></b> (sauf s’ils sont nuls !) <b><u>et PAS les uns des autres (donc PAS de loi des nœuds pour exprimer un courant en fonction d’un autre).</u></b></p>' +
      '<p style="text-align:center">Posez-vous les bonnes questions … vous aurez les bonnes réponses !!</p>' +
      '<p><i>Remarque : Les réponses attendues dépendent des positions des interrupteurs et sont indépendantes les unes des autres : ce n’est donc pas un "grand" exercice mais 4 "petits" à partir du même schéma.</i></p>' +
      '<p><i>Commencez donc par les cas qui vous paraissent les plus simples !</i></p>' +
      table([K1, K2, c('I', 1), c('I', 2), c('I', 3)], [['O', 'O', DOTS, DOTS, DOTS], ['O', 'F', DOTS, DOTS, DOTS], ['F', 'O', DOTS, DOTS, DOTS], ['F', 'F', DOTS, DOTS, DOTS]]) +
      '<p><i>NB : O = Ouvert ; F = Fermé</i></p>',
    figs: [{ spec: s18e3(), cap: 'Circuit du sujet (interrupteurs dessinés ouverts)' }],
    questions: [],
    hints: ['Redessine chaque cas : interrupteur fermé = fil, interrupteur ouvert = trou. Puis cherche les points qui ne forment plus qu’un seul nœud.',
      'Une résistance dont une borne ne mène nulle part ne porte aucun courant. Une résistance dont les deux bornes sont reliées par un fil non plus.',
      'Pour partager ' + I + ' entre deux branches en parallèle, utilise le pont diviseur de courant : le courant dans une branche est proportionnel à la résistance de l’autre branche.'],
    solution: [
      { t: 'Cas K₁ ouvert, K₂ ouvert',
        html: '<p>Le bas de ' + R2 + ' n’est relié qu’à des interrupteurs ouverts : ' + R2 + ' est en cul-de-sac, aucun courant ne peut la traverser. ' + c('I', 2) + ' = 0.</p>' +
          '<p>Le courant ' + I + ' de la source n’a qu’un chemin : ' + R1 + ' puis ' + R3 + '. ' + c('I', 1) + ' = ' + I + ' et ' + c('I', 3) + ' = ' + I + '.</p>',
        figs: [{ spec: s18e3('O', 'O'), cap: K1 + ' et ' + K2 + ' ouverts : ' + R2 + ' est en cul-de-sac, tout le courant traverse ' + R1 + ' puis ' + R3 }] },
      { t: 'Cas K₁ ouvert, K₂ fermé',
        html: '<p>' + K2 + ' fermé relie le bas de ' + R2 + ' au point entre ' + R1 + ' et ' + R3 + '. ' + R1 + ' et ' + R2 + ' relient alors les deux mêmes nœuds : elles sont en parallèle.</p>' +
          '<p>' + K1 + ' ouvert : le courant ne peut redescendre que par ' + R3 + ', donc ' + c('I', 3) + ' = ' + I + '.</p>' +
          '<p>Pont diviseur de courant, avec la résistance de l’autre branche au numérateur :</p>' +
          '<p class="f-block">' + c('I', 1) + ' = ' + fr(R2 + I, S12) + ' &nbsp; et &nbsp; ' + c('I', 2) + ' = ' + fr(R1 + I, S12) + '</p>',
        figs: [{ spec: s18e3('O', 'F'), cap: K1 + ' ouvert, ' + K2 + ' fermé : ' + R2 + ' est en parallèle sur ' + R1 }] },
      { t: 'Cas K₁ fermé, K₂ ouvert',
        html: '<p>' + K1 + ' fermé relie le bas de ' + R2 + ' au fil du bas : ' + R2 + ' va directement du fil du haut au fil du bas. ' + K2 + ' ouvert : ' + R1 + ' et ' + R3 + ' restent en série.</p>' +
          '<p>Deux branches en parallèle : ' + R2 + ' d’un côté, ' + R1 + ' + ' + R3 + ' de l’autre. Pont diviseur de courant :</p>' +
          '<p class="f-block">' + c('I', 2) + ' = ' + fr('(' + R1 + ' + ' + R3 + ')' + I, S3) + ' &nbsp; et &nbsp; ' + c('I', 1) + ' = ' + c('I', 3) + ' = ' + fr(R2 + I, S3) + '</p>',
        figs: [{ spec: s18e3('F', 'O'), cap: K1 + ' fermé, ' + K2 + ' ouvert : ' + R2 + ' en parallèle sur la branche ' + R1 + ' + ' + R3 }] },
      { t: 'Cas K₁ fermé, K₂ fermé',
        html: '<p>Les deux interrupteurs fermés relient le point entre ' + R1 + ' et ' + R3 + ', le bas de ' + R2 + ' et le fil du bas : ces trois points ne forment plus qu’un seul nœud. Les deux bornes de ' + R3 + ' sont reliées par des fils : ' + R3 + ' est court-circuitée, ' + c('I', 3) + ' = 0.</p>' +
          '<p>' + R1 + ' et ' + R2 + ' relient le fil du haut à ce nœud : elles sont en parallèle et se partagent ' + I + ' :</p>' +
          '<p class="f-block">' + c('I', 1) + ' = ' + fr(R2 + I, S12) + ' &nbsp; et &nbsp; ' + c('I', 2) + ' = ' + fr(R1 + I, S12) + '</p>',
        figs: [{ spec: s18e3('F', 'F'), cap: K1 + ' et ' + K2 + ' fermés : ' + R3 + ' est court-circuitée, ' + R1 + ' et ' + R2 + ' en parallèle' }] }
    ],
    answer: '<p>Courants orientés vers le bas dans chaque résistance :</p>' +
      table([K1, K2, c('I', 1), c('I', 2), c('I', 3)], [
        ['O', 'O', I, '0', I],
        ['O', 'F', fr(R2 + I, S12), fr(R1 + I, S12), I],
        ['F', 'O', fr(R2 + I, S3), fr('(' + R1 + ' + ' + R3 + ')' + I, S3), fr(R2 + I, S3)],
        ['F', 'F', fr(R2 + I, S12), fr(R1 + I, S12), '0']]),
    traps: ['Ne pas voir que ' + R3 + ' est court-circuitée quand ' + K1 + ' et ' + K2 + ' sont fermés : ' + c('I', 3) + ' = 0.',
      'Croire que ' + R2 + ' conduit quand les deux interrupteurs sont ouverts : son pied ne mène nulle part.',
      'Inverser le pont diviseur de courant : le courant dans ' + R1 + ' est proportionnel à ' + R2 + ', la résistance de l’autre branche.',
      'Exprimer un courant à partir d’un autre avec la loi des nœuds (' + c('I', 3) + ' = ' + I + ' − ' + c('I', 2) + '…) : l’énoncé l’interdit.',
      'Oublier que la source de courant impose ' + I + ', quelle que soit la position des interrupteurs.'],
    official: false
  });

  /* ---------- Ex 4 : association de résistances (variante du réseau de 2017) ---------- */
  L.push({
    id: 'p2018-ex4', exam: 'p2018', kind: 'partiel', order: 4,
    src: 'Partiel oct. 2018 · Ex 4',
    title: 'Le réseau de 2017, avec une jonction déplacée',
    pts: 3, topics: ['req', 'calcul'], lvl: 2, time: 8,
    figs: [{ spec: sNet(true), cap: 'Réseau du sujet' }],
    questions: [REQ_Q],
    hints: ['Ce réseau ressemble à celui de 2017, mais regarde où arrive le pied de chaque résistance.',
      'La 4' + R + ' de droite descend jusqu’au rail du milieu, sans passer par le point sous la 2' + R + '. Elle relie A à ce rail, comme la 4' + R + ' de gauche.',
      'Entre A et le rail du milieu, il y a trois chemins en parallèle. Avec trois branches, additionner les conductances 1/' + R + ' est plus rapide.'],
    solution: [
      { t: 'Repérer les nœuds',
        html: '<p>Appelle N le point sous la 2' + R + ' (où arrive aussi le pied de la 4' + R + ' intérieure) et M le rail du milieu. Par rapport à 2017, deux choses changent :</p>' +
          '<ul><li>la 4' + R + ' de droite ne rejoint pas N : son fil descend directement jusqu’à M ;</li><li>la colonne de gauche vaut 4' + R + ', entre A et M.</li></ul>' },
      { t: 'Réduire pas à pas',
        html: '<ol><li>Entre A et N : 4' + R + ' // 2' + R + ' = (4' + R + '·2' + R + ')/(4' + R + ' + 2' + R + ') = 8' + R + '²/6' + R + ' = 4' + R + '/3.</li>' +
          '<li>En série avec la ' + R + ' verticale, de N à M : 4' + R + '/3 + ' + R + ' = 7' + R + '/3.</li>' +
          '<li>Entre A et M, trois chemins en parallèle : 7' + R + '/3, la 4' + R + ' de gauche et la 4' + R + ' de droite. 4' + R + ' // 4' + R + ' = 2' + R + ', puis :' +
          '<p class="f-block">' + fr('7' + R + '/3 · 2' + R, '7' + R + '/3 + 2' + R) + ' = ' + fr('14' + R + '²/3', '13' + R + '/3') + ' = ' + fr('14' + R, '13') + '</p></li>' +
          '<li>Entre M et B : 3' + R + ' // 3' + R + ' // 3' + R + ' = ' + R + '.</li></ol>' +
          '<p><b>' + v('R', 'éq') + ' = 14' + R + '/13 + ' + R + ' = 27' + R + '/13</b>, soit environ 2,08' + R + '.</p>' +
          '<p>Avec les conductances, l’étape 3 va plus vite :</p>' +
          '<p class="f-block">' + fr('3', '7' + R) + ' + ' + fr('1', '4' + R) + ' + ' + fr('1', '4' + R) + ' = ' + fr('3', '7' + R) + ' + ' + fr('1', '2' + R) + ' = ' + fr('6 + 7', '14' + R) + ' = ' + fr('13', '14' + R) + '</p>' +
          '<p>L’inverse redonne bien 14' + R + '/13 entre A et M.</p>',
        figs: [{ spec: { w: 470, h: 300, aria: 'Deux étapes de réduction entre A et B',
          wires: ['M120 22V48', 'M50 48H190', 'M50 48V190', 'M120 48V190', 'M190 48V190', 'M50 190H190', 'M120 190V278',
            'M370 22V48', 'M330 48H410', 'M330 48V190', 'M410 48V190', 'M330 190H410', 'M370 190V278'],
          parts: [{ t: 'R', x: 50, y: 119, d: 'v', l: '4R', lp: 'w' }, { t: 'R', x: 120, y: 85, d: 'v', l: '4R/3' }, { t: 'R', x: 120, y: 152, d: 'v', l: 'R' }, { t: 'R', x: 190, y: 119, d: 'v', l: '4R' },
            { t: 'R', x: 120, y: 235, d: 'v', l: 'R' }, { t: 'dot', x: 120, y: 48 }, { t: 'dot', x: 120, y: 190 }, { t: 'term', x: 120, y: 20, l: 'A' }, { t: 'term', x: 120, y: 280, l: 'B' },
            { t: 'txt', x: 132, y: 208, s: 'M', c: 'cz-n', a: 'start' }, { t: 'txt', x: 108, y: 124, s: 'N', c: 'cz-n', a: 'end' },
            arrow(262, 160),
            { t: 'R', x: 330, y: 119, d: 'v', l: '7R/3', lp: 'w' }, { t: 'R', x: 410, y: 119, d: 'v', l: '2R' }, { t: 'R', x: 370, y: 235, d: 'v', l: 'R' },
            { t: 'dot', x: 370, y: 48 }, { t: 'dot', x: 370, y: 190 }, { t: 'term', x: 370, y: 20, l: 'A' }, { t: 'term', x: 370, y: 280, l: 'B' }] },
          cap: 'À gauche : 4' + R + ' // 2' + R + ' = 4' + R + '/3 et groupe du bas réduit à ' + R + ', trois chemins entre A et M. À droite : 4' + R + '/3 + ' + R + ' = 7' + R + '/3 et 4' + R + ' // 4' + R + ' = 2' + R }] }
    ],
    answer: '<p>' + v('R', 'éq') + ' = ' + fr('27' + R, '13') + ' ≈ 2,08' + R + '</p>',
    traps: ['Recopier le raisonnement de 2017 sans regarder les jonctions : ici la 4' + R + ' de droite rejoint le rail du milieu, pas le point sous la 2' + R + '.',
      'Mettre la 4' + R + ' de droite en parallèle avec 4' + R + ' // 2' + R + ' : elle ne relie pas les mêmes nœuds.',
      'Arrondir 7' + R + '/3 ou 14' + R + '/13 en cours de route : garde les fractions exactes jusqu’au bout.',
      'Oublier le groupe du bas : 3' + R + ' // 3' + R + ' // 3' + R + ' = ' + R + '.'],
    official: false
  });

  /* =====================================================================
     Partiel nov. 2020 (promo 2025)
     ===================================================================== */

  /* ---------- Ex 2 : association de résistances ---------- */
  var s20e2 = { w: 400, h: 490, aria: 'Réseau entre A et B : colonne de gauche 2R, 4R puis R ; une 3R de A vers le point entre 4R et R ; deux 2R de A vers le nœud central ; du nœud central, 2R puis 4R vers B, et une 3R vers le point en bas à gauche, relié à B par un fil',
    wires: ['M250 24V55', 'M50 55H350', 'M50 55V455H250', 'M150 55V240H50', 'M250 55V466', 'M350 55V175H250', 'M250 195H190V400H50'],
    parts: [{ t: 'R', x: 50, y: 105, d: 'v', l: '2R', lp: 'w' }, { t: 'R', x: 50, y: 185, d: 'v', l: '4R', lp: 'w' }, { t: 'R', x: 50, y: 320, d: 'v', l: 'R', lp: 'w' },
      { t: 'R', x: 150, y: 150, d: 'v', l: '3R', lp: 'w' }, { t: 'R', x: 250, y: 110, d: 'v', l: '2R', lp: 'w' }, { t: 'R', x: 350, y: 110, d: 'v', l: '2R', lp: 'w' },
      { t: 'R', x: 250, y: 245, d: 'v', l: '2R', lp: 'w' }, { t: 'R', x: 190, y: 300, d: 'v', l: '3R', lp: 'w' }, { t: 'R', x: 250, y: 395, d: 'v', l: '4R', lp: 'w' },
      { t: 'dot', x: 150, y: 55 }, { t: 'dot', x: 250, y: 55 }, { t: 'dot', x: 250, y: 175 }, { t: 'dot', x: 250, y: 195 }, { t: 'dot', x: 50, y: 240 }, { t: 'dot', x: 50, y: 400 }, { t: 'dot', x: 250, y: 455 },
      { t: 'term', x: 250, y: 22, l: 'A' }, { t: 'term', x: 250, y: 468, l: 'B' }] };
  L.push({
    id: 'p2020-ex2', exam: 'p2020', kind: 'partiel', order: 2,
    src: 'Partiel nov. 2020 · Ex 2',
    title: 'Résistance équivalente : deux chemins entre A et B',
    pts: 4.5, topics: ['req'], lvl: 2, time: 10,
    figs: [{ spec: s20e2, cap: 'Réseau du sujet' }],
    questions: [REQ_Q],
    hints: ['Suis chaque fil : où arrive le pied de la 3' + R + ' du bas ? Et le point en bas à gauche, sous la ' + R + ' de la colonne de gauche ?',
      'Commence par les séries évidentes (2' + R + ' + 4' + R + ', deux fois) et par le parallèle des deux 2' + R + ' du haut, au centre et à droite.',
      'Le parallèle 6' + R + ' // 3' + R + ' apparaît deux fois : produit sur somme, 18' + R + '²/9' + R + ' = 2' + R + '.'],
    solution: [
      { t: 'Repérer les nœuds',
        html: '<p>Appelle C le point de la colonne de gauche entre 4' + R + ' et ' + R + ' (où arrive le pied de la 3' + R + ' du haut), et D le nœud du centre sous les deux 2' + R + ' du haut.</p>' +
          '<ul><li>Les deux points noirs du centre sont reliés par un fil : c’est le même nœud D.</li>' +
          '<li>Le point en bas à gauche, où arrivent la ' + R + ' de gauche et la 3' + R + ' du bas, est relié à B par un simple fil : c’est B.</li></ul>' },
      { t: 'Séries et parallèles évidents',
        html: '<ol><li>Colonne de gauche, entre A et C : 2' + R + ' + 4' + R + ' = 6' + R + '.</li>' +
          '<li>Colonne du centre, entre D et B : 2' + R + ' + 4' + R + ' = 6' + R + '.</li>' +
          '<li>Les deux 2' + R + ' du haut relient A à D : 2' + R + ' // 2' + R + ' = ' + R + '.</li></ol>',
        figs: [{ spec: { w: 360, h: 350, aria: 'Première réduction : 6R et 3R entre A et C, R entre C et B, R entre A et D, 6R et 3R entre D et B',
          wires: ['M250 24V50', 'M50 50H250', 'M50 50V300H250', 'M140 50V165H50', 'M250 50V328', 'M250 160H195V280H250'],
          parts: [{ t: 'R', x: 50, y: 100, d: 'v', l: '6R', lp: 'w' }, { t: 'R', x: 140, y: 100, d: 'v', l: '3R', lp: 'w' }, { t: 'R', x: 50, y: 232, d: 'v', l: 'R', lp: 'w' },
            { t: 'R', x: 250, y: 100, d: 'v', l: 'R' }, { t: 'R', x: 250, y: 220, d: 'v', l: '6R' }, { t: 'R', x: 195, y: 220, d: 'v', l: '3R', lp: 'w' },
            { t: 'dot', x: 140, y: 50 }, { t: 'dot', x: 250, y: 50 }, { t: 'dot', x: 50, y: 165 }, { t: 'dot', x: 250, y: 160 }, { t: 'dot', x: 250, y: 280 }, { t: 'dot', x: 250, y: 300 },
            { t: 'txt', x: 62, y: 186, s: 'C', c: 'cz-n', a: 'start' }, { t: 'txt', x: 262, y: 156, s: 'D', c: 'cz-n', a: 'start' },
            { t: 'term', x: 250, y: 22, l: 'A' }, { t: 'term', x: 250, y: 330, l: 'B' }] },
          cap: '6' + R + ' // 3' + R + ' entre A et C, ' + R + ' entre C et B ; ' + R + ' entre A et D, 6' + R + ' // 3' + R + ' entre D et B' }] },
      { t: 'Finir la réduction',
        html: '<p>Le motif 6' + R + ' // 3' + R + ' apparaît deux fois, entre A et C et entre D et B (la 3' + R + ' du bas va de D au point relié à B) :</p>' +
          '<p class="f-block">6' + R + ' // 3' + R + ' = ' + fr('6' + R + ' × 3' + R, '6' + R + ' + 3' + R) + ' = ' + fr('18' + R + '²', '9' + R) + ' = 2' + R + '</p>' +
          '<p>Il reste deux chemins entre A et B : A → C → B vaut 2' + R + ' + ' + R + ' = 3' + R + ', et A → D → B vaut ' + R + ' + 2' + R + ' = 3' + R + '.</p>' +
          '<p><b>' + v('R', 'éq') + ' = 3' + R + ' // 3' + R + ' = 3' + R + '/2</b>.</p>',
        figs: [{ spec: { w: 500, h: 300, aria: 'Deux chemins de 3R en parallèle entre A et B',
          wires: ['M130 22V45', 'M60 45H200', 'M60 45V250', 'M200 45V250', 'M60 250H200', 'M130 250V278',
            'M400 22V45', 'M340 45H460', 'M340 45V250', 'M460 45V250', 'M340 250H460', 'M400 250V278'],
          parts: [{ t: 'R', x: 60, y: 100, d: 'v', l: '2R', lp: 'w' }, { t: 'R', x: 60, y: 195, d: 'v', l: 'R', lp: 'w' }, { t: 'R', x: 200, y: 100, d: 'v', l: 'R' }, { t: 'R', x: 200, y: 195, d: 'v', l: '2R' },
            { t: 'txt', x: 72, y: 152, s: 'C', c: 'cz-n', a: 'start' }, { t: 'txt', x: 188, y: 152, s: 'D', c: 'cz-n', a: 'end' },
            { t: 'dot', x: 130, y: 45 }, { t: 'dot', x: 130, y: 250 }, { t: 'term', x: 130, y: 20, l: 'A' }, { t: 'term', x: 130, y: 280, l: 'B' },
            arrow(275, 150),
            { t: 'R', x: 340, y: 147, d: 'v', l: '3R', lp: 'w' }, { t: 'R', x: 460, y: 147, d: 'v', l: '3R' },
            { t: 'dot', x: 400, y: 45 }, { t: 'dot', x: 400, y: 250 }, { t: 'term', x: 400, y: 20, l: 'A' }, { t: 'term', x: 400, y: 280, l: 'B' }] },
          cap: 'Deux chemins de 3' + R + ' en parallèle : ' + v('R', 'éq') + ' = 3' + R + '/2' }] }
    ],
    answer: '<p>' + v('R', 'éq') + ' = ' + fr('3' + R, '2') + '</p>',
    traps: ['Ne pas voir que le point en bas à gauche (pied de la ' + R + ' de gauche et de la 3' + R + ' du bas) est relié à B par un simple fil.',
      'Croire que les deux points noirs du centre sont deux nœuds différents : un fil les relie, c’est le même nœud.',
      'Additionner 2' + R + ' et 4' + R + ' dans la colonne du centre et s’arrêter là : la 3' + R + ' du bas est en dérivation sur cet ensemble (6' + R + ' // 3' + R + ').'],
    official: true
  });

  /* ---------- Ex 3 : points A à F, tensions et courants ---------- */
  function s20e3(letters) {
    var parts = [{ t: 'R', x: 140, y: 70, l: 'R_1', lp: 's' }, { t: 'R', x: 405, y: 70, l: 'R_2', lp: 's' },
      { t: 'R', x: 110, y: 190, l: 'R_3', lp: 's' }, { t: 'R', x: 280, y: 190, l: 'R_4', lp: 's' }, { t: 'R', x: 445, y: 190, l: 'R_5', lp: 's' },
      { t: 'E', x: 280, y: 300, d: 'h', p: 'e', l: 'E', as: 'n' },
      { t: 'U', a: [100, 40], b: [180, 40], l: 'U_1' }, { t: 'U', a: [445, 40], b: [365, 40], l: 'U_2' },
      { t: 'U', a: [80, 160], b: [140, 160], l: 'U_3' }, { t: 'U', a: [305, 160], b: [255, 160], l: 'U_4' }, { t: 'U', a: [415, 160], b: [475, 160], l: 'U_5' },
      { t: 'U', a: [270, 82], b: [205, 178], l: 'U_6', lp: 'w' }, { t: 'U', a: [355, 178], b: [290, 82], l: 'U_7', lp: 'e' },
      { t: 'I', x: 482, y: 70, d: 'e', l: 'I_1' }, { t: 'I', x: 500, y: 190, d: 'w', l: 'I_2', lp: 's' }, { t: 'I', x: 530, y: 250, d: 'n', l: 'I', lp: 'e' },
      { t: 'dot', x: 280, y: 70 }, { t: 'dot', x: 30, y: 190 }, { t: 'dot', x: 195, y: 190 }, { t: 'dot', x: 365, y: 190 }, { t: 'dot', x: 530, y: 190 }];
    if (letters) parts.push({ t: 'txt', x: 280, y: 58, s: 'F', c: 'cz-n' }, { t: 'txt', x: 18, y: 196, s: 'B', c: 'cz-n', a: 'end' }, { t: 'txt', x: 542, y: 196, s: 'A', c: 'cz-n', a: 'start' },
      { t: 'txt', x: 195, y: 216, s: 'C', c: 'cz-n' }, { t: 'txt', x: 365, y: 216, s: 'D', c: 'cz-n' });
    return { w: 560, h: 330, aria: 'Branche du haut R1 puis R2, branche du milieu R3, R4, R5, source E sur le fil du bas ; cinq points à nommer ; flèches U1 à U7, I1, I2 et I',
      wires: ['M30 70H530V300H30Z', 'M30 190H530'], parts: parts };
  }
  var U1 = u('U', 1), U2 = u('U', 2), U3 = u('U', 3), U4 = u('U', 4), U5 = u('U', 5), U6 = u('U', 6), U7 = u('U', 7), I2 = c('I', 2);
  L.push({
    id: 'p2020-ex3', exam: 'p2020', kind: 'partiel', order: 3,
    src: 'Partiel nov. 2020 · Ex 3',
    title: 'Placer les points, puis tensions et courants',
    pts: 6, topics: ['potentiels', 'kirchhoff'], lvl: 3, time: 15,
    intro: '<p>Soit le schéma ci-contre. On donne :</p>' +
      '<ul><li>' + E + ' = ' + pt('A') + ' − ' + pt('B') + ' = 240 V</li><li>' + U1 + ' = ' + pt('F') + ' − ' + pt('B') + ' = 184 V</li>' +
      '<li>' + U4 + ' = ' + pt('C') + ' − ' + pt('D') + ' = −110 V</li><li>' + U5 + ' = ' + u('U', 'AD') + ' = 46 V</li></ul>' +
      '<p class="sol-note">Note : c’est le même circuit que le TD 1 Ex 2 de ta promo, à un détail près : dans le TD, les flèches ' + I1 + ' et ' + I2 + ' sont dessinées dans l’autre sens.</p>',
    figs: [{ spec: s20e3(false), cap: 'Schéma du sujet (aucune lettre n’est placée)' }],
    questions: ['<b>1.</b> Placer les points A, B, C, D et F sur la figure.',
      '<b>2.</b> Calculer les valeurs des tensions ' + U2 + ', ' + U3 + ', ' + U6 + ' et ' + U7 + '.',
      '<b>3.</b> Déterminer les intensités des courants ' + I1 + ', ' + I2 + ' et ' + I + ' représentés sur le schéma. On prendra ' + R1 + ' = ' + R3 + ' = 100 Ω.'],
    hints: ['Lis chaque donnée comme une flèche : ' + U1 + ' = ' + pt('F') + ' − ' + pt('B') + ' veut dire que la flèche ' + U1 + ' part de B et pointe vers F.',
      'Pour les tensions, le plus rapide est de prendre ' + pt('B') + ' = 0 et de calculer le potentiel de chaque point de proche en proche.',
      'F ne relie que ' + R1 + ' et ' + R2 + ' : ' + I1 + ' traverse aussi ' + R1 + '. Compare le sens de ' + U1 + ' et de ' + I1 + ' avant d’écrire la loi d’Ohm.'],
    solution: [
      { t: 'Question 1 : placer les points',
        html: '<p>La flèche d’une tension ' + u('U', 'XY') + ' = ' + pt('X') + ' − ' + pt('Y') + ' pointe vers X.</p>' +
          '<ul><li>' + E + ' = ' + pt('A') + ' − ' + pt('B') + ' et la flèche ' + E + ' pointe vers la droite : <b>A</b> est le nœud de droite (borne +), <b>B</b> le nœud de gauche.</li>' +
          '<li>' + U1 + ' = ' + pt('F') + ' − ' + pt('B') + ' : la flèche ' + U1 + ' part de B et pointe vers le point du milieu en haut, c’est <b>F</b>.</li>' +
          '<li>' + U4 + ' = ' + pt('C') + ' − ' + pt('D') + ' et la flèche ' + U4 + ' pointe vers la gauche : <b>C</b> est le point entre ' + R3 + ' et ' + R4 + ', <b>D</b> celui entre ' + R4 + ' et ' + R5 + '.</li>' +
          '<li>Contrôle : ' + U5 + ' = ' + pt('A') + ' − ' + pt('D') + ', et la flèche ' + U5 + ' pointe bien vers A.</li></ul>',
        figs: [{ spec: s20e3(true), cap: 'Les cinq points placés' }] },
      { t: 'Question 2 : loi des mailles',
        html: '<p>Pour chaque maille, choisis un sens de parcours : une flèche dans le sens du parcours compte +, une flèche dans l’autre sens compte −.</p>' +
          '<ul><li>Maille ' + E + ', ' + R2 + ', ' + R1 + ' (parcours B → A → F → B) : ' + E + ' + ' + U2 + ' − ' + U1 + ' = 0, donc <b>' + U2 + ' = ' + U1 + ' − ' + E + ' = 184 − 240 = −56 V</b>.</li>' +
          '<li>Maille ' + E + ', ' + R5 + ', ' + R4 + ', ' + R3 + ' (B → A → D → C → B) : ' + E + ' − ' + U5 + ' + ' + U4 + ' − ' + U3 + ' = 0, donc <b>' + U3 + ' = ' + E + ' + ' + U4 + ' − ' + U5 + ' = 240 − 110 − 46 = 84 V</b>.</li>' +
          '<li>Maille ' + R1 + ', ' + U6 + ', ' + R3 + ' (B → F → C → B) : ' + U1 + ' + ' + U6 + ' − ' + U3 + ' = 0, donc <b>' + U6 + ' = ' + U3 + ' − ' + U1 + ' = 84 − 184 = −100 V</b>.</li>' +
          '<li>Maille ' + E + ', ' + R5 + ', ' + U7 + ', ' + R1 + ' (B → A → D → F → B) : ' + E + ' − ' + U5 + ' + ' + U7 + ' − ' + U1 + ' = 0, donc <b>' + U7 + ' = ' + U5 + ' + ' + U1 + ' − ' + E + ' = 46 + 184 − 240 = −10 V</b>.</li></ul>' +
          '<p>' + U6 + ' et ' + U7 + ' ne sont pas des composants : ce sont juste des tensions entre deux points, la loi des mailles s’applique quand même.</p>' +
          '<p class="sol-note">Dans le corrigé officiel, le signe devant ' + U5 + ' est surchargé sur une ligne ; l’expression juste est ' + U3 + ' = ' + E + ' + ' + U4 + ' − ' + U5 + ', qui donne bien 84 V.</p>' },
      { t: 'Question 2 : vérification par les potentiels',
        html: '<p>Plus rapide : prends B comme masse (' + pt('B') + ' = 0) et avance de proche en proche.</p>' +
          table(['Point', 'B', 'A', 'F', 'D', 'C'], [['Calcul', 'masse', pt('B') + ' + ' + E, pt('B') + ' + ' + U1, pt('A') + ' − ' + U5, pt('D') + ' + ' + U4], ['Potentiel', '0', '240 V', '184 V', '194 V', '84 V']]) +
          '<p>' + U2 + ' = ' + pt('F') + ' − ' + pt('A') + ' = −56 V, ' + U3 + ' = ' + pt('C') + ' − ' + pt('B') + ' = 84 V, ' + U6 + ' = ' + pt('C') + ' − ' + pt('F') + ' = −100 V et ' + U7 + ' = ' + pt('F') + ' − ' + pt('D') + ' = −10 V. Mêmes résultats.</p>' },
      { t: 'Question 3 : courants',
        html: '<ul><li>F ne relie que ' + R1 + ' et ' + R2 + ' : c’est la même branche, et ' + I1 + ' traverse aussi ' + R1 + ', de B vers F. Dans ' + R1 + ', ' + U1 + ' et ' + I1 + ' pointent dans le même sens : convention générateur, ' + U1 + ' = −' + R1 + I1 + '. Donc <b>' + I1 + ' = −' + U1 + '/' + R1 + ' = −184/100 = −1,84 A</b>. Le courant réel circule de A vers B, par ' + R2 + ' puis ' + R1 + '.</li>' +
          '<li>La branche du milieu (' + R5 + ', ' + R4 + ', ' + R3 + ') est une simple série : ' + I2 + ' traverse ' + R3 + ' de C vers B. La flèche ' + U3 + ' pointe vers C, à l’opposé du courant : convention récepteur, ' + U3 + ' = ' + R3 + I2 + '. Donc <b>' + I2 + ' = ' + U3 + '/' + R3 + ' = 84/100 = 0,84 A</b>.</li>' +
          '<li>Loi des nœuds en A : ' + I + ' et ' + I1 + ' arrivent, ' + I2 + ' repart. ' + I + ' + ' + I1 + ' = ' + I2 + ', donc <b>' + I + ' = ' + I2 + ' − ' + I1 + ' = 0,84 − (−1,84) = 2,68 A</b>.</li></ul>' +
          '<p>' + R2 + ', ' + R4 + ' et ' + R5 + ' ne sont pas données et ne servent à rien : chaque branche est une série, son courant se lit sur ' + R1 + ' ou ' + R3 + '.</p>' }
    ],
    answer: '<p>A à droite, B à gauche, F en haut au milieu, C entre ' + R3 + ' et ' + R4 + ', D entre ' + R4 + ' et ' + R5 + '.</p>' +
      '<p>' + U2 + ' = −56 V ; ' + U3 + ' = 84 V ; ' + U6 + ' = −100 V ; ' + U7 + ' = −10 V.</p>' +
      '<p>' + I1 + ' = −1,84 A ; ' + I2 + ' = 0,84 A ; ' + I + ' = 2,68 A.</p>',
    traps: ['Placer A et B à l’envers : la flèche ' + E + ' pointe vers A, la borne +.',
      'Prendre les flèches ' + U6 + ' et ' + U7 + ' pour des fils ou des composants : ce sont seulement des tensions entre deux points.',
      'Se tromper de signe dans une maille : fixe un sens de parcours et compare chaque flèche à ce sens.',
      'Croire qu’une tension ou un courant ne peut pas être négatif : ' + U2 + ', ' + U6 + ', ' + U7 + ' et ' + I1 + ' le sont.',
      'Écrire ' + U1 + ' = ' + R1 + I1 + ' alors que ' + U1 + ' et ' + I1 + ' pointent dans le même sens (convention générateur) : il faut ' + U1 + ' = −' + R1 + I1 + '.',
      'Chercher les valeurs de ' + R2 + ', ' + R4 + ' ou ' + R5 + ' : inutile, on passe par ' + R1 + ' et ' + R3 + '.'],
    official: true
  });

  /* ---------- Ex 4 : ponts diviseurs et générateur réel ---------- */
  function s20e4a(sol) {
    return { w: 380, h: 230, aria: 'Source E, branche R1 puis R2 avec les flèches U1 et U2, résistance R à droite',
      wires: ['M50 40H200V190H50Z', sol ? { d: 'M200 40H320V190H200', c: 'cz-ghost' } : 'M200 40H320V190H200'],
      parts: [{ t: 'E', x: 50, y: 115, d: 'v', p: 'n', l: 'E', as: 'w' },
        { t: 'R', x: 200, y: 80, d: 'v', l: 'R_1', c: sol ? 'cz-hl' : '' }, { t: 'R', x: 200, y: 150, d: 'v', l: 'R_2', c: sol ? 'cz-hl' : '' },
        { t: 'U', a: [178, 101], b: [178, 59], l: 'U_1', lp: 'w' }, { t: 'U', a: [178, 171], b: [178, 129], l: 'U_2', lp: 'w' },
        { t: 'R', x: 320, y: 115, d: 'v', l: 'R', c: sol ? 'cz-ghost' : '' }, { t: 'dot', x: 200, y: 40 }, { t: 'dot', x: 200, y: 190 }] };
  }
  var s20e4b = { w: 420, h: 250, aria: 'Source E en série avec r, puis R1, R2 et R3 en parallèle ; flèches I, I1 et I2',
    wires: ['M50 40H360V225H50Z', 'M170 40V225', 'M260 40V225'],
    parts: [{ t: 'E', x: 50, y: 175, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 50, y: 90, d: 'v', l: 'r', lp: 'w' }, { t: 'I', x: 100, y: 40, d: 'e', l: 'I', lp: 's' },
      { t: 'R', x: 170, y: 140, d: 'v', l: 'R_1', lp: 'w' }, { t: 'R', x: 260, y: 140, d: 'v', l: 'R_2', lp: 'w' }, { t: 'R', x: 360, y: 140, d: 'v', l: 'R_3', lp: 'w' },
      { t: 'I', x: 170, y: 70, d: 's', l: 'I_1' }, { t: 'I', x: 260, y: 70, d: 's', l: 'I_2' },
      { t: 'dot', x: 170, y: 40 }, { t: 'dot', x: 260, y: 40 }, { t: 'dot', x: 170, y: 225 }, { t: 'dot', x: 260, y: 225 }] };
  var D20 = R1 + R2 + ' + ' + R1 + R3 + ' + ' + R2 + R3, R123 = v('R', 123), r = v('r');
  L.push({
    id: 'p2020-ex4', exam: 'p2020', kind: 'partiel', order: 4,
    src: 'Partiel nov. 2020 · Ex 4',
    title: 'Ponts diviseurs et générateur réel',
    pts: 6.5, topics: ['diviseurs', 'generateurs', 'req', 'calcul'], lvl: 2, time: 15,
    figs: [{ spec: s20e4a(false), cap: 'Circuit 1 (question 1)' }, { spec: s20e4b, cap: 'Circuit 2 (question 2)' }],
    questions: ['<b>1.</b> Soit le circuit ci-contre (circuit 1).<br>Déterminer les expressions des tensions ' + U1 + ' et ' + U2 + ' en fonction de ' + E + ' et des résistances. Vous exprimerez votre résultat avec une seule barre de fraction (pas de fractions de fractions !)',
      '<b>2.</b> Soit le circuit ci-contre (circuit 2).<br><b>a.</b> Exprimer ' + I1 + ' et ' + I2 + ' en fonction de ' + I + ' et des résistances. Vous exprimerez votre résultat avec une seule barre de fraction (pas de fractions de fractions !)',
      '<b>b.</b> Donner l’expression de ' + I + ' en fonction de ' + E + ' et des résistances. Vous exprimerez votre résultat avec une seule barre de fraction (pas de fractions de fractions !)',
      '<b>c.</b> <u>Application Numérique</u> : Calculer les 2 intensités ' + I1 + ' et ' + I2 + ' si ' + E + ' = 10 V, ' + r + ' = 1 Ω, ' + R1 + ' = ' + R2 + ' = ' + R3 + ' = 3 kΩ.'],
    hints: ['Question 1 : la branche ' + R1 + ', ' + R2 + ' est branchée directement aux bornes de la source idéale. Que change ' + R + ' dans ce cas ?',
      'Question 2a : trois résistances en parallèle se partagent ' + I + '. Le pont diviseur de courant est plus simple avec les conductances <var>G</var> = 1/' + R + '.',
      'Question 2b : remplace les trois résistances par leur équivalent, puis écris la loi des mailles dans la seule boucle qui reste.'],
    solution: [
      { t: 'Question 1',
        html: '<p>' + R1 + ' et ' + R2 + ' sont en série : même courant, aucun nœud entre elles. Cette branche est branchée directement entre les deux bornes de ' + E + ' : elle a la tension ' + E + ' à ses bornes.</p>' +
          '<p>' + R + ', branchée elle aussi aux bornes de la source idéale, ne change pas cette tension : elle n’intervient pas dans ' + U1 + ' et ' + U2 + '. Elle change seulement le courant fourni par la source.</p>' +
          '<p>Pont diviseur de tension :</p>' +
          '<p class="f-block">' + U1 + ' = ' + fr(R1 + E, R1 + ' + ' + R2) + ' &nbsp; et &nbsp; ' + U2 + ' = ' + fr(R2 + E, R1 + ' + ' + R2) + '</p>' +
          '<p>Contrôle : ' + U1 + ' + ' + U2 + ' = ' + E + '.</p>' +
          '<p class="sol-note">Le corrigé officiel écrit « ' + E + ' : tension aux bornes de ' + R1 + ' + ' + R3 + ' » : c’est une erreur de plume pour ' + R1 + ' + ' + R2 + ', ses formules finales sont justes.</p>',
        figs: [{ spec: s20e4a(true), cap: 'La branche ' + R1 + ', ' + R2 + ' est aux bornes de ' + E + ' ; ' + R + ' ne joue aucun rôle' }] },
      { t: 'Question 2a',
        html: '<p>' + R1 + ', ' + R2 + ' et ' + R3 + ' relient toutes le fil du haut au fil du bas : elles sont en parallèle et se partagent ' + I + '.</p>' +
          '<p>Avec trois branches, écris le pont diviseur de courant avec les conductances <var>G</var> = 1/' + R + ' :</p>' +
          '<p class="f-block">' + I1 + ' = ' + fr(v('G', 1) + I, v('G', 1) + ' + ' + v('G', 2) + ' + ' + v('G', 3)) + ' = ' + fr('1/' + R1, '1/' + R1 + ' + 1/' + R2 + ' + 1/' + R3) + '·' + I + '</p>' +
          '<p>Pour n’avoir qu’une barre de fraction, multiplie en haut et en bas par ' + R1 + R2 + R3 + ' :</p>' +
          '<p class="f-block">' + I1 + ' = ' + fr(R2 + R3 + I, D20) + ' &nbsp; et de même &nbsp; ' + I2 + ' = ' + fr(R1 + R3 + I, D20) + '</p>' },
      { t: 'Question 2b',
        html: '<p>Les trois résistances en parallèle se remplacent par ' + R123 + ', avec 1/' + R123 + ' = 1/' + R1 + ' + 1/' + R2 + ' + 1/' + R3 + ' :</p>' +
          '<p class="f-block">' + R123 + ' = ' + fr(R1 + R2 + R3, D20) + '</p>' +
          '<p>Il reste une seule maille : ' + E + ', ' + r + ' et ' + R123 + ' en série. Loi des mailles : ' + E + ' − ' + r + I + ' − ' + R123 + I + ' = 0, donc :</p>' +
          '<p class="f-block">' + I + ' = ' + fr(E, r + ' + ' + R123) + '</p>' +
          '<p>Multiplie en haut et en bas par (' + D20 + ') pour n’avoir qu’une barre de fraction :</p>' +
          '<p class="f-block">' + I + ' = ' + fr('(' + D20 + ')' + E, r + '(' + D20 + ') + ' + R1 + R2 + R3) + '</p>',
        figs: [{ spec: { w: 420, h: 230, aria: 'Une seule maille : E, r et R123 en série', wires: ['M70 40H270V190H70Z'],
          parts: [{ t: 'E', x: 70, y: 150, d: 'v', p: 'n', l: 'E', as: 'w' }, { t: 'R', x: 70, y: 80, d: 'v', l: 'r' }, { t: 'U', a: [42, 58], b: [42, 102], l: 'rI', lp: 'w' },
            { t: 'I', x: 170, y: 40, d: 'e', l: 'I' }, { t: 'R', x: 270, y: 115, d: 'v', l: 'R_{123}' }, { t: 'U', a: [325, 165], b: [325, 65], l: 'R_{123}I' }] },
          cap: 'Schéma équivalent : ' + E + ', ' + r + ' et ' + R123 + ' en série, flèches de tension en convention récepteur' }] },
      { t: 'Question 2c',
        html: '<p>En combinant a et b :</p><p class="f-block">' + I1 + ' = ' + fr(R2 + R3 + E, r + '(' + D20 + ') + ' + R1 + R2 + R3) + '</p>' +
          '<p>Sans calculatrice, raisonne sur le circuit : trois résistances égales de 3 kΩ en parallèle donnent ' + R123 + ' = 3/3 = 1 kΩ. ' + r + ' = 1 Ω est négligeable devant 1 kΩ, donc ' + I + ' = 10/(1 + 1000) A ≈ 10 V/1 kΩ = 10 mA.</p>' +
          '<p>Les trois branches sont identiques, elles se partagent ' + I + ' à parts égales : <b>' + I1 + ' = ' + I2 + ' = ' + I + '/3 ≈ 3,33 mA</b> (exactement 10/3003 A).</p>' }
    ],
    answer: '<p class="f-block">' + U1 + ' = ' + fr(R1 + E, R1 + ' + ' + R2) + ' ; ' + U2 + ' = ' + fr(R2 + E, R1 + ' + ' + R2) + '</p>' +
      '<p class="f-block">' + I1 + ' = ' + fr(R2 + R3 + I, D20) + ' ; ' + I2 + ' = ' + fr(R1 + R3 + I, D20) + '</p>' +
      '<p class="f-block">' + I + ' = ' + fr('(' + D20 + ')' + E, r + '(' + D20 + ') + ' + R1 + R2 + R3) + '</p>' +
      '<p>Application numérique : ' + I1 + ' = ' + I2 + ' ≈ 3,33 mA.</p>',
    traps: ['Question 1 : faire intervenir ' + R + '. Branchée sur une source de tension idéale, elle ne change ni ' + U1 + ' ni ' + U2 + '.',
      'Question 2a : pont diviseur à trois branches. En résistances, le numérateur est le produit des deux autres résistances ; passer par les conductances évite l’erreur.',
      'Question 2b : oublier ' + r + ', ou la mettre en parallèle : elle est en série avec la source.',
      'Laisser une fraction de fraction : l’énoncé exige une seule barre de fraction.',
      'Question 2c : se tromper d’unité (des volts divisés par des kΩ donnent des mA) ou ne pas voir que ' + r + ' est négligeable devant ' + R123 + '.'],
    official: true
  });

  /* FIN */
})();
