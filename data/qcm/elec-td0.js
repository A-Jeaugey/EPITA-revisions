/* Questions de QCM d’électronique : TD 0 « Mathématiques pour l’électronique » (promo 2031).
   Calcul sans calculatrice : fractions, calcul littéral, équations, systèmes, homogénéité. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var T = window.QCM_TOPICS = window.QCM_TOPICS || {};
  if (!T.calcul) T.calcul = 'Calcul et homogénéité';
  var REF = 'elec/cours-1-bases.html#s8';
  function m(n, s) { return '<var>' + n + '</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  var R = m('R'), U = m('U'), I = m('I'), E = m('E'), X = m('x'), Ip = '<var>I</var>′';
  var NOTE = ' Les <var>U</var> et <var>E</var> sont des tensions, les <var>I</var> des courants, les <var>R</var> des résistances.';

  var Q = [
    /* ---------- Ex 1 · fractions ---------- */
    { id: 'elec-td0-q1', lvl: 1, type: 'single', src: 'TD 0 · Ex 1',
      q: 'Simplifie au maximum ' + m('F', '4') + ' = 24' + m('a') + '³' + m('b') + '/(36' + m('a') + '²' + m('b') + '²).',
      o: ['2' + m('a') + '/(3' + m('b') + ')', '2' + m('a') + '²/(3' + m('b') + ')', '2/(3' + m('a') + m('b') + ')', '3' + m('a') + '/(2' + m('b') + ')'], a: 0,
      x: '24/36 = 2/3 (on divise par 12), ' + m('a') + '³/' + m('a') + '² = ' + m('a') + ' et ' + m('b') + '/' + m('b') + '² = 1/' + m('b') + '. Donc ' + m('F', '4') + ' = 2' + m('a') + '/(3' + m('b') + ').' },
    { id: 'elec-td0-q2', lvl: 1, type: 'num', a: 0.75, src: 'TD 0 · Ex 1',
      q: 'Simplifie ' + m('F', '5') + ' = (5/6)/(10/9). Réponds par une fraction ou un nombre décimal.',
      x: 'Diviser par 10/9, c’est multiplier par 9/10 : (5 × 9)/(6 × 10) = 45/60 = 3/4 = 0,75.' },
    { id: 'elec-td0-q3', lvl: 1, type: 'single', src: 'TD 0 · Ex 1',
      q: 'Que vaut ' + m('F', '8') + ' = 11/12 − 5/18 ?',
      o: ['23/36', '1/2', '1/3', '6/36'], a: 0,
      x: 'Dénominateur commun 36 : 11/12 = 33/36 et 5/18 = 10/36, donc 33/36 − 10/36 = 23/36. On ne soustrait les numérateurs qu’une fois les dénominateurs égaux.' },
    { id: 'elec-td0-q4', lvl: 2, type: 'num', a: 1.75, src: 'TD 0 · Ex 1',
      q: 'Calcule ' + m('F', '9') + ' = 3/4 + 5/6 − (7/12 − 3/4).',
      x: 'Tout en douzièmes : 9/12 + 10/12 − (7/12 − 9/12) = 19/12 − (−2/12) = 21/12 = 7/4 = 1,75. « Moins moins » donne plus.' },
    { id: 'elec-td0-q5', lvl: 2, type: 'num', a: 2.75, src: 'TD 0 · Ex 1',
      q: 'Calcule ' + m('F', '10') + ' = (2/3 + 5/9)/(4/9).',
      x: 'Numérateur : 6/9 + 5/9 = 11/9. Puis (11/9)/(4/9) = 11/9 × 9/4 = 11/4 = 2,75 : les neuvièmes se simplifient.' },

    /* ---------- Ex 2 · calcul littéral ---------- */
    { id: 'elec-td0-q6', lvl: 1, type: 'single', src: 'TD 0 · Ex 2',
      q: 'Développe, réduis puis factorise ' + m('C') + ' = 4(2' + I + ' − 3) − 3(' + I + ' + 1).',
      o: ['5(' + I + ' − 3)', '5' + I + ' − 9', '5(' + I + ' + 3)', '11' + I + ' − 15'], a: 0,
      x: '8' + I + ' − 12 − 3' + I + ' − 3 = 5' + I + ' − 15 = 5(' + I + ' − 3). Le « −3 » devant la parenthèse change le signe des deux termes : −3' + I + ' − 3.' },
    { id: 'elec-td0-q7', lvl: 1, type: 'single', src: 'TD 0 · Ex 2',
      q: 'Développe ' + m('D') + ' = (2' + I + ' + 3)(' + I + ' − 5).',
      o: ['2' + I + '² − 7' + I + ' − 15', '2' + I + '² − 15', '2' + I + '² + 7' + I + ' − 15', '2' + I + '² − 13' + I + ' − 15'], a: 0,
      x: 'Chaque terme de la première parenthèse multiplie chaque terme de la seconde : 2' + I + '² − 10' + I + ' + 3' + I + ' − 15 = 2' + I + '² − 7' + I + ' − 15.' },
    { id: 'elec-td0-q8', lvl: 2, type: 'single', src: 'TD 0 · Ex 2',
      q: 'Simplifie ' + m('F') + ' = (' + X + '² − 9)/(' + X + ' − 3), pour ' + X + ' ≠ 3.',
      o: [X + ' + 3', X + ' − 3', X + '² − 3', '−3'], a: 0,
      x: 'Identité remarquable : ' + X + '² − 9 = (' + X + ' − 3)(' + X + ' + 3). On simplifie par (' + X + ' − 3) : ' + m('F') + ' = ' + X + ' + 3. On ne simplifie jamais un morceau de somme (' + X + '²/' + X + ', 9/3).' },

    /* ---------- Ex 3 · équations du premier degré ---------- */
    { id: 'elec-td0-q9', lvl: 1, type: 'num', a: 2.6, src: 'TD 0 · Ex 3',
      q: 'Résous 4(2' + I + ' + 1) = 3' + I + ' + 17. Que vaut ' + I + ' ?',
      x: '8' + I + ' + 4 = 3' + I + ' + 17, donc 5' + I + ' = 13 et ' + I + ' = 13/5 = 2,6.' },
    { id: 'elec-td0-q10', lvl: 1, type: 'num', a: 24, src: 'TD 0 · Ex 3',
      q: 'Résous ' + U + '/2 + ' + U + '/3 = 20. Que vaut ' + U + ' ?',
      x: 'Même dénominateur : 3' + U + '/6 + 2' + U + '/6 = 5' + U + '/6 = 20, donc ' + U + ' = 20 × 6/5 = 24.' },
    { id: 'elec-td0-q11', lvl: 2, type: 'num', a: 13.4, src: 'TD 0 · Ex 3',
      q: 'Résous (' + I + ' − 3)/4 + (' + I + ' + 1)/6 = 5. Que vaut ' + I + ' ?',
      x: 'On multiplie tout par 12 : 3(' + I + ' − 3) + 2(' + I + ' + 1) = 60, soit 3' + I + ' − 9 + 2' + I + ' + 2 = 60, donc 5' + I + ' = 67 et ' + I + ' = 67/5 = 13,4.' },
    { id: 'elec-td0-q12', lvl: 1, type: 'num', a: 240, src: 'TD 0 · Ex 3',
      q: 'Résous ' + R + '/120 + ' + R + '/80 = 5. Que vaut ' + R + ' ?',
      x: 'On multiplie par 240, multiple commun de 120 et 80 : 2' + R + ' + 3' + R + ' = 1 200, donc ' + R + ' = 240. Autre voie : 1/120 + 1/80 = 1/48 (comme 120 Ω // 80 Ω = 48 Ω), et ' + R + '/48 = 5 donne 240.' },

    /* ---------- Ex 4 · systèmes à deux inconnues ---------- */
    { id: 'elec-td0-q13', lvl: 1, type: 'single', src: 'TD 0 · Ex 4',
      q: 'Résous le système 2' + m('U', '1') + ' + ' + m('U', '2') + ' = 11 et 3' + m('U', '1') + ' − ' + m('U', '2') + ' = 9.',
      o: [m('U', '1') + ' = 4 et ' + m('U', '2') + ' = 3', m('U', '1') + ' = 3 et ' + m('U', '2') + ' = 5', m('U', '1') + ' = 4 et ' + m('U', '2') + ' = 19', m('U', '1') + ' = 2 et ' + m('U', '2') + ' = 7'], a: 0,
      x: 'En additionnant les deux équations, ' + m('U', '2') + ' disparaît : 5' + m('U', '1') + ' = 20, donc ' + m('U', '1') + ' = 4. Puis ' + m('U', '2') + ' = 11 − 2 × 4 = 3.' },
    { id: 'elec-td0-q14', lvl: 1, type: 'num', a: 3.2, src: 'TD 0 · Ex 4',
      q: 'On a 4' + U + ' + 3' + E + ' = 29 et 2' + U + ' − ' + E + ' = 1. Que vaut ' + U + ' ?',
      x: 'La seconde équation donne ' + E + ' = 2' + U + ' − 1. Dans la première : 4' + U + ' + 6' + U + ' − 3 = 29, donc 10' + U + ' = 32 et ' + U + ' = 3,2 (puis ' + E + ' = 5,4).' },
    { id: 'elec-td0-q15', lvl: 2, type: 'num', a: 7.5, src: 'TD 0 · Ex 4',
      q: 'On a ' + m('R', '1') + '/2 + ' + m('R', '2') + '/3 = 7 et ' + m('R', '1') + '/4 − ' + m('R', '2') + '/6 = 1. Que vaut ' + m('R', '2') + ' ?',
      x: 'On chasse les fractions : × 6 dans la première (3' + m('R', '1') + ' + 2' + m('R', '2') + ' = 42), × 12 dans la seconde (3' + m('R', '1') + ' − 2' + m('R', '2') + ' = 12). En soustrayant : 4' + m('R', '2') + ' = 30, donc ' + m('R', '2') + ' = 7,5 ; en additionnant : 6' + m('R', '1') + ' = 54 et ' + m('R', '1') + ' = 9.' },
    { id: 'elec-td0-q16', lvl: 2, type: 'single', src: 'TD 0 · Ex 4',
      q: 'Résous le système 0,2' + I + ' + 0,5' + Ip + ' = 4,8 et 0,4' + I + ' − 0,1' + Ip + ' = 2,2.',
      o: [I + ' = 79/11 et ' + Ip + ' = 74/11', I + ' = 8 et ' + Ip + ' = 6,4', I + ' = 74/11 et ' + Ip + ' = 79/11', I + ' = 7 et ' + Ip + ' = 7'], a: 0,
      x: 'Multiplie par 10 : 2' + I + ' + 5' + Ip + ' = 48 et 4' + I + ' − ' + Ip + ' = 22. La seconde donne ' + Ip + ' = 4' + I + ' − 22 ; dans la première, 22' + I + ' − 110 = 48, donc ' + I + ' = 158/22 = 79/11 ≈ 7,18 et ' + Ip + ' = 316/11 − 242/11 = 74/11 ≈ 6,73. Des valeurs qui ne tombent pas juste, ça arrive : garde les fractions.' },

    /* ---------- Ex 5 · systèmes à trois inconnues ---------- */
    { id: 'elec-td0-q17', lvl: 2, type: 'tf', a: false, src: 'TD 0 · Ex 5',
      q: 'Le système 2' + X + ' + 3' + m('y') + ' − ' + m('z') + ' = 12, ' + X + ' − ' + m('y') + ' + 2' + m('z') + ' = 5, 3' + X + ' + 2' + m('y') + ' + ' + m('z') + ' = 17 a une solution unique.',
      x: 'Faux : la troisième équation est la somme des deux premières, elle n’apporte rien. Il reste deux équations pour trois inconnues, donc une infinité de solutions (' + X + ' = 27/5 − ' + m('z') + ' et ' + m('y') + ' = ' + m('z') + ' + 2/5).' },
    { id: 'elec-td0-q18', lvl: 1, type: 'num', a: 29.25, unit: 'Ω', tol: 0.002, src: 'TD 0 · Ex 5',
      q: 'Trois résistances : leur somme vaut 120 Ω, ' + m('R', '2') + ' vaut le double de ' + m('R', '1') + ' et ' + m('R', '3') + ' est égale à ' + m('R', '1') + ' augmentée de 3 Ω. Que vaut ' + m('R', '1') + ' ?',
      x: 'Tout en fonction de ' + m('R', '1') + ' : ' + m('R', '1') + ' + 2' + m('R', '1') + ' + (' + m('R', '1') + ' + 3) = 120, donc 4' + m('R', '1') + ' = 117 et ' + m('R', '1') + ' = 29,25 Ω (puis ' + m('R', '2') + ' = 58,5 Ω et ' + m('R', '3') + ' = 32,25 Ω).' },

    /* ---------- Ex 6 · homogénéité ---------- */
    { id: 'elec-td0-q19', lvl: 1, type: 'tf', a: true, src: 'TD 0 · Ex 6',
      q: R + ' = ' + E + '/' + I + ', avec ' + E + ' une tension et ' + I + ' un courant. Cette relation est homogène.',
      x: 'Vrai : V/A = Ω, les deux côtés sont des ohms. C’est la loi d’Ohm.' },
    { id: 'elec-td0-q20', lvl: 1, type: 'tf', a: false, src: 'TD 0 · Ex 6',
      q: m('I', '1') + ' = ' + m('R', '1') + '/' + m('U', '1') + ', avec ' + m('U', '1') + ' une tension. Cette relation est homogène.',
      x: 'Faux : ' + m('R', '1') + '/' + m('U', '1') + ' est en Ω/V, soit 1/A puisque Ω = V/A. C’est l’inverse d’un courant, pas un courant. La relation juste est ' + m('I', '1') + ' = ' + m('U', '1') + '/' + m('R', '1') + '.' },
    { id: 'elec-td0-q21', lvl: 1, type: 'tf', a: false, src: 'TD 0 · Ex 6',
      q: m('P') + ' = ' + U + '²/(' + R + I + '), avec ' + m('P') + ' une puissance, ' + U + ' une tension et ' + I + ' un courant. Cette relation est homogène.',
      x: 'Faux : ' + R + I + ' est une tension, donc ' + U + '²/(' + R + I + ') est en V²/V = V. Une puissance est en W = V·A. Les bonnes formules : ' + m('P') + ' = ' + U + '²/' + R + ' ou ' + m('P') + ' = ' + R + I + '².' },
    { id: 'elec-td0-q22', lvl: 1, type: 'tf', a: true, src: 'TD 0 · Ex 6',
      q: E + ' = ' + U + '²/(' + R + I + '), avec ' + E + ' et ' + U + ' des tensions et ' + I + ' un courant. Cette relation est homogène.',
      x: 'Vrai : ' + U + '²/(' + R + I + ') est en V²/V = V, comme ' + E + '. Homogène ne veut pas dire juste : c’est seulement une condition nécessaire.' },
    { id: 'elec-td0-q23', lvl: 2, type: 'tf', a: true, src: 'TD 0 · Ex 6',
      q: U + ' = (' + m('R', '2') + E + ' + ' + m('R', '1') + m('R', '2') + m('I', '1') + ')/(' + m('R', '2') + ' + ' + m('R', '1') + '). Cette relation est homogène.' + NOTE,
      x: 'Vrai : au numérateur, ' + m('R', '2') + E + ' est en Ω·V et ' + m('R', '1') + m('R', '2') + m('I', '1') + ' en Ω·(Ω·A) = Ω·V : on additionne des termes de même unité. Divisé par des ohms, il reste des volts.' },
    { id: 'elec-td0-q24', lvl: 2, type: 'tf', a: true, src: 'TD 0 · Ex 6',
      q: U + ' = [' + m('R', '1') + m('R', '3') + '(' + m('I', '1') + ' − ' + m('I', '2') + ') + ' + m('R', '3') + m('E', '1') + ' − ' + m('R', '1') + m('E', '3') + ']/[(' + m('R', '1') + ' + ' + m('R', '2') + ') + ' + m('R', '3') + ' + ' + m('R', '4') + ']. Cette relation est homogène.' + NOTE,
      x: 'Vrai : les trois termes du numérateur sont en Ω·V (' + m('R', '3') + '(' + m('I', '1') + ' − ' + m('I', '2') + ') est une tension, multipliée par ' + m('R', '1') + '). Le dénominateur est une somme de résistances : il reste des volts.' },
    { id: 'elec-td0-q25', lvl: 2, type: 'tf', a: false, src: 'TD 0 · Ex 6',
      q: I + ' = ' + m('E', '1') + '/' + m('R', '1') + ' − ' + m('I', '0') + '/' + m('R', '0') + ' + (' + m('E', '3') + ' − ' + m('E', '4') + ')/(' + m('R', '3') + ' + ' + m('R', '4') + '). Cette relation est homogène.' + NOTE,
      x: 'Faux : ' + m('E', '1') + '/' + m('R', '1') + ' et (' + m('E', '3') + ' − ' + m('E', '4') + ')/(' + m('R', '3') + ' + ' + m('R', '4') + ') sont des ampères, mais ' + m('I', '0') + '/' + m('R', '0') + ' est en A/Ω. Un seul terme d’une autre unité suffit à rendre la relation fausse.' }
  ];
  Q.forEach(function (q) { q.s = 'elec'; q.topic = 'calcul'; q.ref = REF; });
  Array.prototype.push.apply(B, Q);
})();
