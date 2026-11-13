/* English text for data/elec2/ex-finals.js (merged by id over the French file).
   Jan. 2023 statements: word for word from the official English paper. Other years: faithful translation of the
   French papers (the English papers of 2016 and 2017 are scans without text). */
(function () {
  var R = '<var>R</var>', E = '<var class="u">E</var>', I = '<var class="i">I</var>', U = '<var class="u">U</var>';
  function rr(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function ee(n) { return '<var class="u">E</var><sub>' + n + '</sub>'; }
  function ii(n) { return '<var class="i">I</var><sub>' + n + '</sub>'; }
  function uu(n) { return '<var class="u">U</var><sub>' + n + '</sub>'; }
  function vv(n) { return '<var class="v">V</var><sub>' + n + '</sub>'; }
  var Eth = ee('th'), Rth = rr('th'), IN = ii('N'), RN = rr('N'), RI = R + I, Rp = R + '′', Ip = I + '′';
  function p(s) { return '<p>' + s + '</p>'; }
  function ul(a) { return '<ul>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }
  var CTRL = 'Result recomputed by nodal analysis (Kirchhoff’s current law at each node, symbolic solution).';
  var OK = 'Matches the official answer key. ' + CTRL;
  function nortonA(load) { return 'Norton generator IN in parallel with RN, loaded by ' + load; }
  function thevA(load) { return 'Thévenin generator Eth in series with Rth, loaded by ' + load; }
  var CN = 'Equivalent Norton generator';

  /* shared steps of the Jan. 2019 / Jan. 2016 circuit */
  var F19STEPS = [
    { t: 'R_th', html: p('Disconnect ' + rr(4) + '. With ' + ii(0) + ' open and ' + ee(3) + ' replaced by a wire: ' + rr(1) + ' and ' + rr(2) + ' are in series (2' + R + '), in parallel with ' + rr(3) + ': <b>' + Rth + ' = 2' + R + ' // ' + R + ' = 2' + R + '/3</b>.') },
    { t: 'E_th by superposition', html: ul([ii(0) + ' alone: ' + ii(0) + ' splits between ' + rr(1) + ' and ' + rr(2) + ' + ' + rr(3) + ': the current in ' + rr(2) + ' is ' + ii(0) + '/3, hence ' + Eth + '′ = ' + R + ' · ' + ii(0) + '/3;',
      ee(3) + ' alone: voltage divider, ' + Eth + '″ = ' + ee(3) + ' · 2' + R + '/3' + R + ' = 2' + ee(3) + '/3.']) + p('<b>' + Eth + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/3</b>.') }];

  REV.i18n.patch(window.ELEC2_EX, {

    /* ================= Jan. 2023 ================= */
    'f2023-ex2a': { src: 'Exam Jan. 2023 · Ex 2 · Q1', title: 'The Norton generator seen by 2R, then the current in 2R',
      intro: p('Consider the 2 circuits below:'),
      figs: [{ spec: { aria: 'Source E on the left, 6R at the top, vertical 4R, 3R at the top, current source I pointing down, 2R load; R on the bottom wire between 4R and I' }, cap: 'Left circuit' },
        { spec: { aria: nortonA('2R') }, cap: 'Right circuit' }],
      questions: ['<b>a.</b> Determine the expressions of ' + IN + ' and ' + RN + ' such that the 2 circuits above are equivalent.',
        '<b>b.</b> From this deduce the expression of the intensity ' + Ip + ' of the current that crosses 2' + R + ' as a function of ' + E + ', ' + I + ' and ' + R + '.'],
      hints: ['Disconnect the load 2' + R + ' and work from left to right: (' + E + ', 6' + R + ') becomes a Norton source.',
        '6' + R + ' // 4' + R + ' = 12' + R + '/5; go back to Thévenin, add 3' + R + ' and the ' + R + ' of the bottom wire, which are in series.',
        'Go back to Norton at the current source ' + I + ': it points down, so it draws current.'],
      solution: [
        { t: 'Step 1: (E, 6R) as a Norton source', html: p('The branch ' + E + ' in series with 6' + R + ' becomes a source ' + E + '/(6' + R + ') in parallel with 6' + R + '. With the 4' + R + ': 6' + R + ' // 4' + R + ' = 24' + R + '²/10' + R + ' = <b>12' + R + '/5</b>.') },
        { t: 'Step 2: back to Thévenin and putting in series', html: p('Norton → Thévenin: emf (' + E + '/6' + R + ')·(12' + R + '/5) = <b>2' + E + '/5</b>, in series with 12' + R + '/5.') +
            p('The resistors 3' + R + ' (top) and ' + R + ' (bottom wire) are on the same path: 12' + R + '/5 + 3' + R + ' + ' + R + ' = <b>32' + R + '/5</b>.') },
        { t: 'Step 3: Norton, and the source I', html: p('Thévenin → Norton: (2' + E + '/5)/(32' + R + '/5) = ' + E + '/(16' + R + '), in parallel with 32' + R + '/5.') +
            p('The source ' + I + ' is in parallel and points down: it takes ' + I + ' away from the top node. Hence <b>' + IN + ' = ' + E + '/(16' + R + ') − ' + I + '</b> and <b>' + RN + ' = 32' + R + '/5</b>.'),
          figs: [{ spec: { aria: nortonA('2R') }, cap: CN }] },
        { t: 'Question b: current divider', html: p(Ip + ' = ' + RN + '/(' + RN + ' + 2' + R + ') · ' + IN + ' = (32/42)·(' + E + '/(16' + R + ') − ' + I + ') = (16/21)·(' + E + '/(16' + R + ') − ' + I + '), i.e. <b>' + Ip + ' = (' + E + ' − 16' + RI + ')/(21' + R + ')</b>.') }],
      answer: p(IN + ' = ' + E + '/(16' + R + ') − ' + I + '; ' + RN + ' = 32' + R + '/5.') + p(Ip + ' = (' + E + ' − 16' + RI + ')/(21' + R + ').'),
      traps: ['Forgetting the ' + R + ' of the bottom wire: it is in series with 3' + R + ' (you would get 27' + R + '/5).', 'Adding ' + I + ' instead of subtracting it: the arrow points down, away from the top node.', 'Keeping 2' + R + ' in the calculation of ' + RN + '.'],
      note: 'Matches the official answer key (six intermediate diagrams). ' + CTRL },

    'f2023-ex2b': { src: 'Exam Jan. 2023 · Ex 2 · Q2', title: 'The voltage U by successive transformations',
      intro: p('Consider the circuit opposite. Determine the expression of the tension ' + U + ' as a function of ' + E + ', ' + I + ' and ' + R + '. You can use the Thévenin/Norton equivalencies.'),
      figs: [{ spec: { aria: 'Source 4E, 2R at the top, current source I pointing up, vertical 2R, 3R at the top, vertical 2R and 2R, U across the last one; source E on the bottom wire, arrow pointing right' } }],
      hints: ['On the left, three branches in parallel: (4' + E + ', 2' + R + ') as a Norton source, the source ' + I + ', the 2' + R + '.',
        'Group them into one Thévenin source, then go around the loop up to the two 2' + R + ' on the right (in parallel: ' + R + '), without forgetting the source ' + E + ' on the bottom wire.'],
      solution: [
        { t: 'Step 1: the left part', html: p('(4' + E + ', 2' + R + ') → Norton 2' + E + '/' + R + ' // 2' + R + '. With the source ' + I + ' (same direction) and the 2' + R + ': (2' + E + '/' + R + ' + ' + I + ') // ' + R + ', since 2' + R + ' // 2' + R + ' = ' + R + '.') +
            p('Back to Thévenin: emf <b>2' + E + ' + ' + RI + '</b> in series with ' + R + '.') },
        { t: 'Step 2: the loop', html: p('In series: ' + R + ' and 3' + R + ' (4' + R + '), and the source ' + E + ' of the bottom wire. Its arrow is opposite to the direction of the emf 2' + E + ' + ' + RI + ' in the loop: total emf (2' + E + ' + ' + RI + ') − ' + E + ' = <b>' + E + ' + ' + RI + '</b>.') +
            p('The load: the two 2' + R + ' in parallel make ' + R + '.') },
        { t: 'Step 3: voltage divider', html: p(U + ' = ' + R + '/(' + R + ' + 4' + R + ') · (' + E + ' + ' + RI + '), i.e. <b>' + U + ' = (' + E + ' + ' + RI + ')/5</b>.'),
          figs: [{ spec: { aria: thevA('R') }, cap: 'The reduced circuit' }] }],
      answer: p(U + ' = (' + E + ' + ' + RI + ')/5.'),
      traps: ['Adding the source ' + E + ' of the bottom wire instead of subtracting it: look at the direction of its arrow in the loop.', 'Counting only one of the two 2' + R + ' on the right.'],
      note: 'Matches the official answer key. ' + CTRL },

    /* ================= Jan. 2022 ================= */
    'f2022-ex2a': { src: 'Exam Jan. 2022 · Ex 2 · Q1', title: 'The Norton generator seen by R′',
      intro: p('Consider the 2 circuits below:'),
      figs: [{ spec: { aria: 'Current source I pointing up, vertical R, 3R at the top, vertical 6R, load R′ carrying the current I′' }, cap: 'Left circuit' },
        { spec: { aria: nortonA('R′') }, cap: 'Right circuit' }],
      questions: ['<b>a.</b> Determine the expressions of ' + IN + ' and ' + RN + ' such that the 2 circuits above are equivalent.',
        '<b>b.</b> From this deduce the expression of the intensity ' + Ip + ' of the current that crosses ' + Rp + ' as a function of ' + I + ', ' + R + ' and ' + Rp + '.'],
      hints: ['The source ' + I + ' in parallel with ' + R + ' is a Norton source: turn it into a Thévenin source to add it to 3' + R + '.'],
      solution: [
        { t: 'Step 1: Norton → Thévenin', html: p(I + ' // ' + R + ' becomes the emf ' + RI + ' in series with ' + R + '; with 3' + R + ': ' + RI + ' in series with <b>4' + R + '</b>.') },
        { t: 'Step 2: Thévenin → Norton', html: p('Emf ' + RI + ' and 4' + R + ' → source ' + RI + '/(4' + R + ') = <b>' + I + '/4</b> in parallel with 4' + R + '. With the 6' + R + ': 4' + R + ' // 6' + R + ' = 24' + R + '/10 = <b>12' + R + '/5</b>.') +
            p('Hence <b>' + IN + ' = ' + I + '/4</b> and <b>' + RN + ' = 12' + R + '/5 = 2.4' + R + '</b>.'),
          figs: [{ spec: { aria: nortonA('R′') }, cap: CN }] },
        { t: 'Question b: current divider', html: p(Ip + ' = ' + RN + '/(' + Rp + ' + ' + RN + ') · ' + IN + ' = (12' + R + '/5)/(' + Rp + ' + 12' + R + '/5) · ' + I + '/4, i.e. <b>' + Ip + ' = 3' + RI + '/(5' + Rp + ' + 12' + R + ')</b>.') }],
      answer: p(IN + ' = ' + I + '/4; ' + RN + ' = 12' + R + '/5.') + p(Ip + ' = 3' + RI + '/(5' + Rp + ' + 12' + R + ').'),
      traps: ['Adding ' + I + ' and 3' + R + ' without a transformation: a current source does not add to a series resistor.', 'Current divider upside down: it is the resistance of the other branch (' + RN + ') that goes in the numerator.'],
      note: OK },

    'f2022-ex2b': { src: 'Exam Jan. 2022 · Ex 2 · Q2', title: 'All branches in parallel: the voltage U',
      intro: p('Consider the circuit opposite. Determine the expression of the voltage ' + U + ' as a function of ' + E + ', ' + I + ' and ' + R + '. You can use the Thévenin/Norton equivalences.'),
      figs: [{ spec: { aria: 'Current source I pointing up; R in series with E; voltage U; vertical R; R at the top; on the right E pointing up then R' } }],
      hints: ['The four branches are all between the top wire and the bottom wire: they are in parallel, ' + U + ' is their common voltage.',
        'Turn each emf branch into a Norton source, then add the currents and combine the resistors.'],
      solution: [
        { t: 'Step 1: everything as Norton', html: ul(['(' + R + ', ' + E + ') → ' + E + '/' + R + ' // ' + R + ';', 'the right branch (' + R + ', ' + E + ', ' + R + ' in series) → ' + E + '/(2' + R + ') // 2' + R + ';', 'the source ' + I + ' and the resistor ' + R + ' stay as they are.']) },
        { t: 'Step 2: grouping', html: p('Currents (all pointing up): ' + ii('eq') + ' = ' + I + ' + ' + E + '/' + R + ' + ' + E + '/(2' + R + ') = (2' + RI + ' + 3' + E + ')/(2' + R + ').') +
            p('Resistances: ' + R + ' // ' + R + ' // 2' + R + ' = (' + R + '/2 · 2' + R + ')/(' + R + '/2 + 2' + R + ') = <b>2' + R + '/5</b>.') },
        { t: 'Step 3: Ohm’s law', html: p(U + ' = ' + rr('eq') + ' · ' + ii('eq') + ' = (2' + R + '/5)·(2' + RI + ' + 3' + E + ')/(2' + R + '), i.e. <b>' + U + ' = (2' + RI + ' + 3' + E + ')/5</b>.') +
            p('Check with Millman (ground at the bottom): ' + U + ' = (' + I + ' + ' + E + '/' + R + ' + ' + E + '/(2' + R + '))/(1/' + R + ' + 1/' + R + ' + 1/(2' + R + ')), the same result.') }],
      answer: p(U + ' = (2' + RI + ' + 3' + E + ')/5.'),
      traps: ['Forgetting the second ' + R + ' of the right branch: it is in series with the first one (2' + R + ').', 'Treating the branch (' + R + ', ' + E + ') as a plain resistor.'],
      note: OK },

    /* ================= Jan. 2021 ================= */
    'f2021-ex2': { src: 'Exam Jan. 2021 · Ex 2', title: 'Superposition: the current I₂, then the numerical application',
      intro: p('Consider the circuit opposite, in which ' + ee(1) + ' = 15 V, ' + ii(0) + ' = 45 mA and ' + R + ' = 500 Ω.') +
        p('Using the superposition theorem, determine the expression of the intensity of the current ' + ii(2) + '. Give the literal expression before doing the numerical application.'),
      figs: [{ spec: { aria: 'Source E1, 2R at the top, vertical 3R carrying I2, R at the top, vertical R, current source I0 pointing down; 4R on the bottom wire' } }],
      hints: ['State 1: ' + ee(1) + ' alone, ' + ii(0) + ' open. The branches R, then R and 4' + R + ' on the right make 6' + R + ', in parallel with 3' + R + '.',
        'State 2: ' + ii(0) + ' alone, ' + ee(1) + ' replaced by a wire. The current ' + ii(0) + ' splits: current divider.'],
      solution: [
        { t: 'State 1: E₁ alone', html: p('With ' + ii(0) + ' open, the right part is ' + R + ' + ' + R + ' + 4' + R + ' = 6' + R + ' in series, in parallel with 3' + R + ': 3' + R + ' // 6' + R + ' = 2' + R + '.') +
            p('Voltage divider: the voltage across 3' + R + ' is 2' + R + '/(2' + R + ' + 2' + R + ') · ' + ee(1) + ' = ' + ee(1) + '/2, hence ' + ii(2) + '′ = ' + ee(1) + '/(2 · 3' + R + ') = <b>' + ee(1) + '/(6' + R + ')</b>.') },
        { t: 'State 2: I₀ alone', html: p('With ' + ee(1) + ' replaced by a wire, 2' + R + ' and 3' + R + ' are in parallel (6' + R + '/5). The current ' + ii(0) + ' goes up through ' + R + ' (vertical) on one side, and on the other through ' + R + ' + 6' + R + '/5 + 4' + R + ', in the opposite direction to the arrow ' + ii(2) + '.') +
            p('The calculation (current divider, then divider between 2' + R + ' and 3' + R + ') gives <b>' + ii(2) + '″ = −' + ii(0) + '/18</b>.') },
        { t: 'Sum and numerical application', html: p(ii(2) + ' = ' + ii(2) + '′ + ' + ii(2) + '″ = <b>' + ee(1) + '/(6' + R + ') − ' + ii(0) + '/18</b>.') +
            p('Numerically: 15/3,000 = 5 mA; 45/18 = 2.5 mA; <b>' + ii(2) + ' = 2.5 mA</b>.') }],
      answer: p(ii(2) + ' = ' + ee(1) + '/(6' + R + ') − ' + ii(0) + '/18 = 2.5 mA.'),
      traps: ['In state 2, short-circuiting ' + ii(0) + ' instead of turning off ' + ee(1) + '.', 'Forgetting the minus sign: with ' + ii(0) + ' alone, the current flows through 3' + R + ' against the arrow ' + ii(2) + '.', 'Mixing units: ' + R + ' = 500 Ω with mA gives consistent volts and milliamperes if you write ' + R + ' = 0.5 kΩ.'],
      note: 'Matches the official answer key (two methods per state). ' + CTRL },

    'f2021-ex3': { src: 'Exam Jan. 2021 · Ex 3', title: 'Thévenin seen by R′, then the voltage U',
      intro: p('Consider the circuit opposite. ' + ee(1) + ', ' + ee(2) + ', ' + I + ', ' + R + ' and ' + Rp + ' are assumed known, and the generators are independent.') +
        p('Using the method of your choice, determine the Thévenin generator seen by the resistor ' + Rp + '. Deduce the expression of the voltage ' + U + '.'),
      figs: [{ spec: { aria: 'Current source I pointing up; R in series with E1; voltage U; load R′; R at the top; on the right E2 pointing up then R' } }],
      hints: ['Disconnect ' + Rp + ': three branches in parallel remain (the source ' + I + ', (' + R + ', ' + ee(1) + '), and the right branch ' + R + ' + ' + ee(2) + ' + ' + R + ').', 'Everything as Norton, group, go back to Thévenin.'],
      solution: [
        { t: 'Step 1: Norton', html: p('(' + R + ', ' + ee(1) + ') → ' + ee(1) + '/' + R + ' // ' + R + '; on the right, (' + R + ', ' + ee(2) + ', ' + R + ') → ' + ee(2) + '/(2' + R + ') // 2' + R + '.') +
            p('Sum of the currents: ' + I + ' + ' + ee(1) + '/' + R + ' + ' + ee(2) + '/(2' + R + '); resistances: ' + R + ' // 2' + R + ' = <b>2' + R + '/3</b>.') },
        { t: 'Step 2: Thévenin', html: p(Rth + ' = <b>2' + R + '/3</b>; ' + Eth + ' = (2' + R + '/3)·(' + I + ' + ' + ee(1) + '/' + R + ' + ' + ee(2) + '/(2' + R + ')) = <b>(2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/3</b>.'),
          figs: [{ spec: { aria: thevA('R′') }, cap: 'Thévenin generator loaded by R′' }] },
        { t: 'Step 3: voltage divider', html: p(U + ' = ' + Rp + '/(' + Rth + ' + ' + Rp + ') · ' + Eth + ', i.e. <b>' + U + ' = ' + Rp + '(2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/(2' + R + ' + 3' + Rp + ')</b>.') }],
      answer: p(Eth + ' = (2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/3; ' + Rth + ' = 2' + R + '/3.') + p(U + ' = ' + Rp + '(2' + RI + ' + 2' + ee(1) + ' + ' + ee(2) + ')/(2' + R + ' + 3' + Rp + ').'),
      traps: ['Counting ' + Rp + ' in ' + Rth + '.', 'Taking ' + ee(2) + '/' + R + ' instead of ' + ee(2) + '/(2' + R + '): the right branch has two resistors.'],
      note: OK },

    'f2021-ex4': { src: 'Exam Jan. 2021 · Ex 4', title: 'Norton seen by 2R, then the current I',
      intro: p('Consider the circuit opposite. ' + E + ', ' + ii(0) + ' and ' + R + ' are assumed known, and the generators are independent.') +
        p('Using the method of your choice, determine the Norton generator seen by the resistor 2' + R + '. Deduce the expression of the intensity ' + I + '.'),
      figs: [{ spec: { aria: 'Branch 4R in series with E on the left; vertical 4R; at the top, source I0 pointing left in parallel with R; vertical 3R; load 2R carrying I' } }],
      hints: ['On the left: (' + E + ', 4' + R + ') as Norton, with the vertical 4' + R + ', then back to Thévenin.', 'The block ' + ii(0) + ' // ' + R + ' on the top wire becomes an emf ' + R + ii(0) + ' in series with ' + R + ', pointing left.'],
      solution: [
        { t: 'Step 1: the left part', html: p('(' + E + ', 4' + R + ') → ' + E + '/(4' + R + ') // 4' + R + '; with the vertical 4' + R + ': ' + E + '/(4' + R + ') // 2' + R + ' → Thévenin <b>' + E + '/2</b> in series with <b>2' + R + '</b>.') },
        { t: 'Step 2: the block on the top wire', html: p(ii(0) + ' // ' + R + ' → emf ' + R + ii(0) + ' in series with ' + R + ', pointing left like ' + ii(0) + ': it opposes ' + E + '/2.') +
            p('In series: emf ' + E + '/2 − ' + R + ii(0) + ', resistance 2' + R + ' + ' + R + ' = 3' + R + '.') },
        { t: 'Step 3: Norton', html: p('Thévenin → Norton: (' + E + '/2 − ' + R + ii(0) + ')/(3' + R + ') = ' + E + '/(6' + R + ') − ' + ii(0) + '/3, in parallel with 3' + R + '; with the vertical 3' + R + ': 3' + R + ' // 3' + R + ' = 3' + R + '/2.') +
            p('<b>' + IN + ' = ' + E + '/(6' + R + ') − ' + ii(0) + '/3</b>; <b>' + RN + ' = 3' + R + '/2</b>.'),
          figs: [{ spec: { aria: nortonA('2R') }, cap: 'Norton generator loaded by 2R' }] },
        { t: 'Question: the current I', html: p('Current divider: ' + I + ' = ' + RN + '/(' + RN + ' + 2' + R + ') · ' + IN + ' = (3/7)(' + E + '/(6' + R + ') − ' + ii(0) + '/3), i.e. <b>' + I + ' = (' + E + ' − 2' + R + ii(0) + ')/(14' + R + ')</b>.') }],
      answer: p(IN + ' = ' + E + '/(6' + R + ') − ' + ii(0) + '/3; ' + RN + ' = 3' + R + '/2.') + p(I + ' = (' + E + ' − 2' + R + ii(0) + ')/(14' + R + ').'),
      traps: ['Adding ' + R + ii(0) + ' instead of subtracting it: the arrow of ' + ii(0) + ' points left.', 'Keeping 2' + R + ' in ' + RN + '.'],
      note: OK },

    /* ================= Jan. 2020 ================= */
    'f2020-ex2': { src: 'Exam Jan. 2020 · Ex 2', title: 'Superposition with four sources: I and U',
      intro: p('Consider the circuit opposite, in which ' + ee(1) + ' = −5 V, ' + ee(2) + ' = 3 V, ' + ii(1) + ' = 1 A, ' + ii(2) + ' = 2 A, ' + rr(1) + ' = 2 Ω and ' + rr(2) + ' = 3 Ω.') +
        p('Using the superposition theorem, determine the intensity of the current ' + I + ' and the voltage ' + U + '. Give the literal expression before doing the numerical application.'),
      figs: [{ spec: { aria: 'Source E1 pointing up carrying I, vertical R1, E2 on the top wire pointing left, vertical R2, source I2 pointing down; source I1 on the bottom wire pointing left, voltage U across it pointing left' } }],
      hints: ['Four sources, four states. In each state, look at what is short-circuited: with ' + ee(1) + ' replaced by a wire, ' + rr(1) + ' is short-circuited.',
        'With ' + ii(1) + ' turned off (open), the bottom wire is cut: no current comes back that way.'],
      solution: [
        { t: 'State 1: E₁ alone', html: p('The bottom wire is cut (' + ii(1) + ' open): no current in ' + rr(2) + '. ' + rr(1) + ' is across ' + ee(1) + ': ' + ii('E1') + ' = ' + ee(1) + '/' + rr(1) + '. Kirchhoff’s voltage law: ' + uu(1) + ' = −' + ee(1) + '.') },
        { t: 'State 2: E₂ alone', html: p(ee(1) + ' as a wire short-circuits ' + rr(1) + '; the bottom wire is cut. No current flows in ' + ee(1) + ': ' + ii('E2') + ' = 0. Kirchhoff’s voltage law: ' + uu(2) + ' = ' + ee(2) + '.') },
        { t: 'State 3: I₁ alone', html: p(ii(1) + ' flows through ' + rr(2) + ' and returns through the wire ' + ee(1) + ' (short-circuiting ' + rr(1) + '): ' + ii('E3') + ' = ' + ii(1) + ' and ' + uu(3) + ' = ' + rr(2) + ii(1) + '.') },
        { t: 'State 4: I₂ alone', html: p(ii(2) + ' circulates in ' + rr(2) + ' (the bottom wire is cut): ' + ii('E4') + ' = 0 and ' + uu(4) + ' = −' + rr(2) + ii(2) + '.') },
        { t: 'Sum and numerical application', html: p(U + ' = −' + ee(1) + ' + ' + ee(2) + ' + ' + rr(2) + ii(1) + ' − ' + rr(2) + ii(2) + ' = 5 + 3 + 3 − 6 = <b>5 V</b>.') +
            p(I + ' = ' + ee(1) + '/' + rr(1) + ' + ' + ii(1) + ' = −2.5 + 1 = <b>−1.5 A</b>.') }],
      answer: p(U + ' = −' + ee(1) + ' + ' + ee(2) + ' + ' + rr(2) + '(' + ii(1) + ' − ' + ii(2) + ') = 5 V; ' + I + ' = ' + ee(1) + '/' + rr(1) + ' + ' + ii(1) + ' = −1.5 A.'),
      traps: ['Forgetting that ' + ee(1) + ' = −5 V: −' + ee(1) + ' = +5 V.', 'Taking the arrow of ' + U + ' the wrong way round: it points left, like ' + ii(1) + '.'],
      note: OK },

    'f2020-ex3': { src: 'Exam Jan. 2020 · Ex 3', title: 'Norton seen by R₄',
      intro: p('Consider the following circuit:'),
      figs: [{ spec: { aria: 'Source E on the left, R1 at the top, vertical R2 down to node N, R3 below N, R4 connected between N and the bottom wire, carrying I4' } }],
      questions: ['<b>1.</b> Determine the Norton generator seen by ' + rr(4) + '.', '<b>2.</b> Deduce the intensity ' + ii(4) + ' of the current in ' + rr(4) + '. Express the result as a function of the resistors ' + rr('i') + ' and the voltage ' + E + '.'],
      hints: [RN + ': ' + E + ' replaced by a wire, then the resistance seen from N.', IN + ': short-circuit the terminals of ' + rr(4) + '; ' + rr(3) + ' is then short-circuited.'],
      solution: [
        { t: 'R_N', html: p('Sources turned off (' + E + ' as a wire): from N, ' + rr(3) + ' in parallel with ' + rr(1) + ' + ' + rr(2) + ': <b>' + RN + ' = ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')/(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ')</b>.') },
        { t: 'I_N', html: p('A wire between N and the bottom short-circuits ' + rr(3) + ': the loop ' + E + ', ' + rr(1) + ', ' + rr(2) + ' remains. Kirchhoff’s voltage law: <b>' + IN + ' = ' + E + '/(' + rr(1) + ' + ' + rr(2) + ')</b>.') },
        { t: 'Question 2', html: p('Current divider: ' + ii(4) + ' = ' + RN + '/(' + rr(4) + ' + ' + RN + ') · ' + IN + ', i.e. <b>' + ii(4) + ' = ' + rr(3) + E + '/(' + rr(4) + '(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ') + ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + '))</b>.') }],
      answer: p(IN + ' = ' + E + '/(' + rr(1) + ' + ' + rr(2) + '); ' + RN + ' = ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')/(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ').') + p(ii(4) + ' = ' + rr(3) + E + '/(' + rr(4) + '(' + rr(1) + ' + ' + rr(2) + ' + ' + rr(3) + ') + ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')).'),
      traps: ['Forgetting that the short circuit cancels ' + rr(3) + ' for ' + IN + '.'],
      note: OK },

    'f2020-ex4': { src: 'Exam Jan. 2020 · Ex 4', title: 'Thévenin seen by R′, then I for R′ = 3R',
      intro: p('Consider the circuit opposite:'),
      figs: [{ spec: { aria: 'Source E1, R at the top up to P; from P, 3R toward Q; between Q and the bottom, 3R in parallel with E2; vertical 3R; source I3 pointing up; load R′ carrying I downward' } }],
      questions: ['<b>1.</b> Determine the Thévenin generator seen by ' + Rp + '.',
        '<b>2.</b> Deduce the intensity of the current ' + I + ' for ' + Rp + ' = 3' + R + '. First give the literal expression as a function of ' + R + ', ' + ee(1) + ', ' + ee(2) + ' and ' + ii(3) + ', then do the numerical application if ' + R + ' = 10 Ω, ' + ee(1) + ' = 40 V, ' + ee(2) + ' = 24 V and ' + ii(3) + ' = 6 A.'],
      hints: ['The 3' + R + ' placed in parallel with ' + ee(2) + ' does not count: the source sets the potential of Q.', Rth + ': ' + R + ' // 3' + R + ' // 3' + R + '. ' + Eth + ': superposition of the three sources, or Millman at the top node.'],
      solution: [
        { t: 'R_th', html: p(ee(1) + ' and ' + ee(2) + ' as wires, ' + ii(3) + ' open: seen from the top, ' + R + ', 3' + R + ' (toward Q, connected to the bottom by the wire ' + ee(2) + ') and 3' + R + ' are in parallel: <b>' + Rth + ' = ' + R + ' // 3' + R + ' // 3' + R + ' = 3' + R + '/5</b>.') },
        { t: 'E_th by superposition', html: ul([ee(1) + ' alone: voltage divider between ' + R + ' and 3' + R + ' // 3' + R + ' = 3' + R + '/2: (3/5)' + ee(1) + ';',
          ee(2) + ' alone: divider between 3' + R + ' and ' + R + ' // 3' + R + ' = 3' + R + '/4: ' + ee(2) + '/5;', ii(3) + ' alone: ' + ii(3) + ' flows through ' + Rth + ': (3/5)' + R + ii(3) + '.']) +
            p('<b>' + Eth + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/5</b>. Millman at the top node gives the same thing in one line: (' + ee(1) + '/' + R + ' + ' + ee(2) + '/(3' + R + ') + ' + ii(3) + ')/(1/' + R + ' + 1/(3' + R + ') + 1/(3' + R + ')).') },
        { t: 'Question 2', html: p(I + ' = ' + Eth + '/(' + Rth + ' + 3' + R + ') = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/(5 · 18' + R + '/5), i.e. <b>' + I + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/(18' + R + ')</b>.') +
            p('Numerically: (120 + 24 + 180)/180 = 324/180 = <b>1.8 A</b> (9/5 A).') }],
      answer: p(Eth + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/5; ' + Rth + ' = 3' + R + '/5.') + p(I + ' = (3' + ee(1) + ' + ' + ee(2) + ' + 3' + R + ii(3) + ')/(18' + R + ') = 1.8 A.'),
      traps: ['Keeping the 3' + R + ' in parallel with ' + ee(2) + ' in ' + Rth + ': the source, once turned off, short-circuits it.', 'Forgetting a superposition state (there are three sources).'],
      note: 'Matches the official answer key (superposition). ' + CTRL },

    /* ================= Jan. 2019 and Jan. 2016 (same circuit) ================= */
    'f2019-ex2': { src: 'Exam Jan. 2019 · Ex 2', title: 'Thévenin seen by R₄, then the voltage across R₄',
      intro: p('Consider the circuit opposite, in which ' + rr(1) + ' = ' + rr(2) + ' = ' + rr(3) + ' = ' + rr(4) + ' = ' + R + '.'),
      figs: [{ spec: { aria: 'Current source I0 pointing up, vertical R1, R2 at the top, vertical R4 (the load), R3 at the top, source E3 pointing up on the right' } }],
      questions: ['<b>1.</b> Determine the Thévenin generator seen by ' + rr(4) + '. Use the method of your choice (equivalences or application of the theorem), and express your result as a function of ' + ii(0) + ', ' + ee(3) + ' and ' + R + '.',
        '<b>2.</b> Deduce the voltage across ' + rr(4) + '.'],
      hints: ['By equivalences: ' + ii(0) + ' // ' + rr(1) + ' becomes ' + R + ii(0) + ' in series with ' + R + '; with ' + rr(2) + ': 2' + R + '.', 'On the right, (' + ee(3) + ', ' + rr(3) + ') as Norton; add the two Norton sources.'],
      solution: F19STEPS.concat([
        { t: 'By equivalences (method 2 of the answer key)', html: p(ii(0) + ' // ' + R + ' → ' + R + ii(0) + ' in series with ' + R + '; with ' + rr(2) + ': ' + R + ii(0) + ', 2' + R + ' → Norton ' + ii(0) + '/2 // 2' + R + '. On the right, ' + ee(3) + '/' + R + ' // ' + R + '. Sum: (' + ii(0) + '/2 + ' + ee(3) + '/' + R + ') // 2' + R + '/3, i.e. the same Thévenin generator.') },
        { t: 'Question 2', html: p(U + ' = ' + R + '/(' + R + ' + 2' + R + '/3) · ' + Eth + ' = (3/5)' + Eth + ', i.e. <b>' + U + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/5</b>.') }]),
      answer: p(Eth + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/3; ' + Rth + ' = 2' + R + '/3; ' + U + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/5.'),
      traps: ['Short-circuiting ' + ii(0) + ' to find ' + Rth + ' (you would get ' + R + '/2).'],
      note: 'Matches the official answer key, which wrongly writes “2E” instead of 2' + ee(3) + ' in the result. ' + CTRL },

    'f2016-ex2': { src: 'Exam Jan. 2016 · Ex 2', title: 'Norton seen by R₄ (the circuit of 2019)',
      intro: p('Consider the circuit opposite, in which ' + rr(1) + ' = ' + rr(2) + ' = ' + rr(3) + ' = ' + rr(4) + ' = ' + R + '.'),
      figs: [{ spec: { aria: 'Current source I0 pointing up, vertical R1, R2 at the top, vertical R4 (the load), R3 at the top, source E3 pointing up on the right' } }],
      questions: ['<b>1.</b> Determine the Norton generator seen by ' + rr(4) + '. Use the method of your choice (equivalences or application of the theorem), and express your result as a function of ' + ii(0) + ', ' + ee(3) + ' and ' + R + '.',
        '<b>2.</b> Deduce the current in ' + rr(4) + '.'],
      hints: ['Same circuit as in January 2019: find the Thévenin generator, then ' + IN + ' = ' + Eth + '/' + Rth + '.'],
      solution: F19STEPS.concat([
        { t: 'Norton', html: p('<b>' + RN + ' = ' + Rth + ' = 2' + R + '/3</b> and <b>' + IN + ' = ' + Eth + '/' + Rth + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(2' + R + ')</b>: it is also the sum of the two Norton sources ' + ii(0) + '/2 + ' + ee(3) + '/' + R + '.') },
        { t: 'Question 2', html: p(ii(4) + ' = ' + RN + '/(' + RN + ' + ' + R + ') · ' + IN + ' = (2/5) · ' + IN + ', i.e. <b>' + ii(4) + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(5' + R + ')</b>.') }]),
      answer: p(IN + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(2' + R + '); ' + RN + ' = 2' + R + '/3; ' + ii(4) + ' = (' + R + ii(0) + ' + 2' + ee(3) + ')/(5' + R + ').'),
      traps: ['Current divider upside down (' + R + ' in the numerator).'],
      note: 'No official answer key: result computed, consistent with the January 2019 answer key (same circuit). ' + CTRL },

    'f2019-ex3': { src: 'Exam Jan. 2019 · Ex 3', title: 'The voltage across R₁ (where E disappears)',
      intro: p('Consider the circuit opposite. Using the method of your choice, determine the expression of the voltage across the resistor ' + rr(1) + ' as a function of ' + E + ', ' + I + ', ' + R + ' and ' + rr(1) + '.'),
      figs: [{ spec: { aria: 'Source 2E, 4R at the top, vertical 4R, E on the top wire pointing left, current source I pointing up, R1; at the bottom, R then source 2I pointing left in parallel with R' } }],
      hints: ['Thévenin seen by ' + rr(1) + ': ' + Rth + ' = 2' + R + ' (the two 4' + R + ' in parallel) + ' + R + ' + ' + R + ' (bottom wire, 2' + I + ' open).', 'By superposition, look at the contributions of 2' + E + ' and ' + E + ': they cancel out.'],
      solution: [
        { t: 'Superposition (official answer key)', html: ul(['2' + E + ' alone: ' + uu(1) + ' = ' + rr(1) + E + '/(4' + R + ' + ' + rr(1) + ');', E + ' alone: ' + uu(2) + ' = −' + rr(1) + E + '/(4' + R + ' + ' + rr(1) + ');',
          '2' + I + ' alone: ' + uu(3) + ' = 2' + rr(1) + RI + '/(4' + R + ' + ' + rr(1) + ');', I + ' alone: ' + uu(4) + ' = 4' + rr(1) + RI + '/(4' + R + ' + ' + rr(1) + ').']) +
            p('Sum: the two contributions of ' + E + ' cancel out, <b>' + U + ' = 6' + R + rr(1) + I + '/(4' + R + ' + ' + rr(1) + ')</b>.') },
        { t: 'With Thévenin (shorter)', html: p('Seen by ' + rr(1) + ': <b>' + Rth + ' = 4' + R + '</b> (4' + R + ' // 4' + R + ' = 2' + R + ', plus ' + R + ' and ' + R + ' of the bottom wire) and <b>' + Eth + ' = 6' + RI + '</b> (i.e. a Norton source ' + IN + ' = 3' + I + '/2). Voltage divider: ' + U + ' = ' + rr(1) + '/(' + rr(1) + ' + 4' + R + ') · 6' + RI + '.') }],
      answer: p(U + ' = 6' + R + rr(1) + I + '/(4' + R + ' + ' + rr(1) + '): ' + E + ' does not appear in it.'),
      traps: ['Believing you made a mistake because ' + E + ' disappears: the two contributions are opposite.', 'Forgetting the ' + R + ' in parallel with 2' + I + ': when 2' + I + ' is turned off, it stays in series on the bottom wire.'],
      note: OK },

    'f2019-bonus': { src: 'Exam Jan. 2019 · Bonus', title: 'Millman: the voltage U',
      intro: p('Consider the circuit opposite. ' + ee(1) + ', ' + ee(2) + ', ' + I + ' and ' + R + ' are assumed known, and the generators are independent. Using Millman’s theorem, determine the expression of the voltage ' + U + '.'),
      figs: [{ spec: { aria: 'Current source I pointing up in series with R; R in series with E1; voltage U; vertical R; R at the top; E2 pointing up; R' } }],
      hints: ['Ground at B. The right branch (' + R + ' at the top toward ' + ee(2) + ') reaches A with the potential ' + ee(2) + '.', 'The ' + R + ' in series with ' + I + ' and the ' + R + ' in parallel with ' + ee(2) + ' do not count.'],
      solution: [
        { t: 'Millman at A, ground at B', html: p('Branches reaching A: ' + I + ' (flowing in), (' + R + ', ' + ee(1) + '), ' + R + ' alone, (' + R + ', toward ' + ee(2) + '). The right-hand ' + R + ' is in parallel with ' + ee(2) + ': it plays no role.') +
            p(U + ' = ' + vv('A') + ' = (' + I + ' + ' + ee(1) + '/' + R + ' + ' + ee(2) + '/' + R + ')/(1/' + R + ' + 1/' + R + ' + 1/' + R + '), i.e. <b>' + U + ' = (' + RI + ' + ' + ee(1) + ' + ' + ee(2) + ')/3</b>.') }],
      answer: p(U + ' = (' + RI + ' + ' + ee(1) + ' + ' + ee(2) + ')/3.'),
      traps: ['Putting 1/' + R + ' in the denominator for the branch of the source ' + I + ': its ' + R + ' does not count.', 'Counting the ' + R + ' in parallel with ' + ee(2) + '.'],
      note: OK },

    /* ================= June 2018 (S1#) ================= */
    'f2018j-ex2': { src: 'Exam June 2018 (S1#) · Ex 2', title: 'Superposition, then Thévenin seen by the 2R between A and B',
      intro: p('Consider the following circuit:'),
      figs: [{ spec: { aria: 'Source E1, then R and E2 pointing left on the top wire up to A; 2R on the bottom wire; 2R between A and B; voltage U; source I0 pointing up; R; E5 pointing right on the top wire; 2R' } }],
      questions: ['<b>1. Superposition theorem</b>: determine ' + U + ' using the superposition theorem.',
        '<b>2a. Thévenin’s theorem</b>: determine the Thévenin generator seen by the resistor 2' + R + ' placed between A and B (you may use the method of your choice: definitions of the theorem or Thévenin/Norton equivalences).',
        '<b>2b.</b> Deduce the expression of the voltage ' + U + '.'],
      hints: [ee(1) + ' and ' + ee(2) + ' are in the same branch: a single state for ' + ee(1) + ' − ' + ee(2) + ' (the branch ' + R + ' + 2' + R + ' = 3' + R + ').', 'By equivalences, all the branches are in parallel between A and B: turn everything into Norton sources.'],
      solution: [
        { t: 'Question 1: superposition', html: ul([ee(1) + ' − ' + ee(2) + ' (branch 3' + R + ') facing 2' + R + ' // ' + R + ' // 2' + R + ' = ' + R + '/2: ' + uu(1) + ' = (' + R + '/2)/(3' + R + ' + ' + R + '/2) · (' + ee(1) + ' − ' + ee(2) + ') = (' + ee(1) + ' − ' + ee(2) + ')/7;',
          ii(0) + ' alone in 3' + R + ' // 2' + R + ' // ' + R + ' // 2' + R + ' = 3' + R + '/7: ' + uu(2) + ' = 3' + R + ii(0) + '/7;',
          ee(5) + ' alone: divider between 2' + R + ' and 3' + R + ' // 2' + R + ' // ' + R + ' = 6' + R + '/11: ' + uu(3) + ' = −3' + ee(5) + '/14.']) +
            p('<b>' + U + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/14</b>.') },
        { t: 'Question 2a: Thévenin seen by the 2R', html: p('Without this 2' + R + ', everything as Norton between A and B: (' + ee(1) + ' − ' + ee(2) + ')/(3' + R + ') // 3' + R + ', ' + ii(0) + ', ' + R + ', −' + ee(5) + '/(2' + R + ') // 2' + R + '.') +
            p('Resistances: 3' + R + ' // ' + R + ' // 2' + R + ' = <b>6' + R + '/11</b>; ' + Eth + ' = (6' + R + '/11)·((' + ee(1) + ' − ' + ee(2) + ')/(3' + R + ') + ' + ii(0) + ' − ' + ee(5) + '/(2' + R + ')) = <b>(2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/11</b>.') },
        { t: 'Question 2b', html: p(U + ' = 2' + R + '/(2' + R + ' + 6' + R + '/11) · ' + Eth + ' = (11/14)' + Eth + ': you recover <b>' + U + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/14</b>, as in question 1.') }],
      answer: p(U + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/14; ' + Eth + ' = (2(' + ee(1) + ' − ' + ee(2) + ') + 6' + R + ii(0) + ' − 3' + ee(5) + ')/11; ' + Rth + ' = 6' + R + '/11.'),
      traps: ['Copying ' + Eth + ' as the answer to question 2b: the official answer key does so (denominator 11), but ' + U + ' is the voltage loaded by 2' + R + ' (denominator 14).', 'Forgetting the 2' + R + ' of the bottom wire, in series with ' + R + ' in the left branch.'],
      note: 'Matches the official answer key for questions 1 and 2a; in 2b, the answer key boxes ' + Eth + ' instead of ' + U + ' (slip). ' + CTRL },

    'f2018j-ex3': { src: 'Exam June 2018 (S1#) · Ex 3 · same exercise in January 2016 (Ex 3)', title: 'The voltage across R₁ (where I disappears)',
      intro: p('Consider the circuit below. Using the method of your choice, determine the expression of the voltage across the resistor ' + rr(1) + ' as a function of ' + E + ', ' + I + ', ' + R + ' and ' + rr(1) + '.'),
      figs: [{ spec: { aria: 'Source 2E, 2R at the top, vertical 2R; on the top wire, source 2I pointing right in parallel with R; source I pointing down; R1; source 2E on the bottom wire pointing left' } }],
      hints: ['On the left: (2' + E + ', 2' + R + ') as Norton, with the vertical 2' + R + ', then back to Thévenin (' + E + ', ' + R + ').', 'The block 2' + I + ' // ' + R + ' becomes 2' + RI + ' in series with ' + R + '. Then the source 2' + E + ' of the bottom wire.'],
      solution: [
        { t: 'Step 1: the left part', html: p('(2' + E + ', 2' + R + ') → ' + E + '/' + R + ' // 2' + R + '; with the vertical 2' + R + ': ' + E + '/' + R + ' // ' + R + ' → Thévenin <b>' + E + '</b> in series with <b>' + R + '</b>.') },
        { t: 'Step 2: the top wire and the bottom wire', html: p('2' + I + ' // ' + R + ' → emf 2' + RI + ', pointing right, in series with ' + R + '. The source 2' + E + ' of the bottom wire adds up in the same direction of travel.') +
            p('Seen from the terminals of the source ' + I + ': emf ' + E + ' + 2' + RI + ' + 2' + E + ' = <b>3' + E + ' + 2' + RI + '</b>, resistance ' + R + ' + ' + R + ' = <b>2' + R + '</b>.') },
        { t: 'Step 3: the source I and R₁', html: p('Norton: (3' + E + ' + 2' + RI + ')/(2' + R + ') − ' + I + ' = 3' + E + '/(2' + R + '), in parallel with 2' + R + ': the source ' + I + ' exactly cancels the part due to 2' + I + '.') +
            p('Divider: <b>' + U + ' = 3' + rr(1) + E + '/(2' + R + ' + ' + rr(1) + ')</b>. By superposition, the contributions of 2' + I + ' and ' + I + ' are ±2' + R + rr(1) + I + '/(2' + R + ' + ' + rr(1) + ') and cancel out.') }],
      answer: p(U + ' = 3' + rr(1) + E + '/(2' + R + ' + ' + rr(1) + '): ' + I + ' does not appear in it.'),
      traps: ['Subtracting the source 2' + E + ' of the bottom wire: its direction of travel is the same as that of the other emfs.', 'Worrying that ' + I + ' disappears: that is normal here.'],
      note: 'Matches the official June 2018 answer key (equivalences, then superposition). Same exercise in January 2016, without an answer key. ' + CTRL },

    /* ================= Jan. 2018 ================= */
    'f2018-ex2': { src: 'Exam Jan. 2018 · Ex 2', title: 'Thévenin seen by R′, then U_AM and U_BM',
      intro: p('Consider the following circuit, in which ' + E + ', ' + I + ' and ' + R + ' are known. The generators are independent.'),
      figs: [{ spec: { aria: 'B at the top left, 2R at the top between B and A; below B, 2R then source I pointing up; below A, R then E pointing up; R′ between A and M; voltages U_BM and U_AM' } }],
      questions: ['<b>1.</b> Determine the Thévenin generator seen by ' + Rp + '.', '<b>2.</b> Then determine the voltage ' + uu('AM') + ' if ' + Rp + ' = ' + R + '.', '<b>3.</b> Deduce the voltage ' + uu('BM') + '.'],
      hints: ['In open circuit, the current ' + I + ' goes all the way round: it flows through both 2' + R + ', then through ' + R + ' from A toward the source ' + E + '.', 'For ' + Rth + ', the branch of the source ' + I + ' disappears (open).'],
      solution: [
        { t: 'E_th and R_th', html: p('In open circuit, the only loop carries ' + I + ': it goes down through ' + R + ' from A toward ' + E + '. ' + uu('AM') + ' = ' + RI + ' + ' + E + ': <b>' + Eth + ' = ' + E + ' + ' + RI + '</b>.') +
            p('With the sources turned off, the branch ' + I + ' is open: ' + R + ' remains in series with the wire ' + E + ': <b>' + Rth + ' = ' + R + '</b>.') },
        { t: 'Question 2', html: p(uu('AM') + ' = ' + Rp + '/(' + Rth + ' + ' + Rp + ') · ' + Eth + '; with ' + Rp + ' = ' + R + ': <b>' + uu('AM') + ' = (' + E + ' + ' + RI + ')/2</b>.') },
        { t: 'Question 3', html: p('Kirchhoff’s voltage law: ' + uu('BM') + ' = ' + uu('BA') + ' + ' + uu('AM') + ', and ' + uu('BA') + ' = 2' + RI + ' (Ohm’s law in the top 2' + R + ', carrying ' + I + ').') +
            p('<b>' + uu('BM') + ' = 2' + RI + ' + (' + E + ' + ' + RI + ')/2 = (' + E + ' + 5' + RI + ')/2</b>.') }],
      answer: p(Eth + ' = ' + E + ' + ' + RI + '; ' + Rth + ' = ' + R + '; ' + uu('AM') + ' = (' + E + ' + ' + RI + ')/2; ' + uu('BM') + ' = (' + E + ' + 5' + RI + ')/2.'),
      traps: ['Counting both 2' + R + ' in ' + Rth + ': they are in series with a turned-off (open) current source.'],
      note: OK },

    'f2018-ex3': { src: 'Exam Jan. 2018 · Ex 3', title: 'The voltage across R₁ by transformations',
      intro: p('Consider the circuit below. Using the method of your choice, determine the expression of the voltage across the resistor ' + rr(1) + ' as a function of ' + E + ', ' + I + ', ' + R + ' and ' + rr(1) + '.'),
      figs: [{ spec: { aria: 'Source E, 2R at the top, vertical 2R, source I pointing down; on the top wire, 2E pointing left, R, then 2I pointing right in parallel with R; R1' } }],
      hints: ['On the left, three branches in parallel: (' + E + ', 2' + R + '), 2' + R + ', the source ' + I + ': everything as Norton.', 'Then everything in series up to ' + rr(1) + ': the emf 2' + E + ' (pointing left, so to be subtracted), ' + R + ', and the block 2' + I + ' // ' + R + '.'],
      solution: [
        { t: 'Step 1: the left part', html: p('(' + E + ', 2' + R + ') → ' + E + '/(2' + R + ') // 2' + R + '; with the 2' + R + ' and the source ' + I + ' (pointing down): (' + E + '/(2' + R + ') − ' + I + ') // ' + R + ' → Thévenin <b>' + E + '/2 − ' + RI + '</b> in series with <b>' + R + '</b>.') },
        { t: 'Step 2: putting in series', html: p('2' + I + ' // ' + R + ' → emf 2' + RI + ' (pointing right) in series with ' + R + '. The emf 2' + E + ' points left: you subtract it.') +
            p('Total emf: ' + E + '/2 − ' + RI + ' − 2' + E + ' + 2' + RI + ' = <b>' + RI + ' − 3' + E + '/2 = (2' + RI + ' − 3' + E + ')/2</b>; resistance ' + R + ' + ' + R + ' + ' + R + ' = <b>3' + R + '</b>.') },
        { t: 'Step 3: voltage divider', html: p('<b>' + U + ' = ' + rr(1) + '(2' + RI + ' − 3' + E + ')/(2(' + rr(1) + ' + 3' + R + '))</b>.') +
            p('Check by superposition (answer key): ' + E + ' gives ' + rr(1) + E + '/(2(3' + R + ' + ' + rr(1) + ')), ' + I + ' gives −' + R + rr(1) + I + '/(3' + R + ' + ' + rr(1) + '), 2' + E + ' gives −2' + rr(1) + E + '/(3' + R + ' + ' + rr(1) + '), 2' + I + ' gives 2' + R + rr(1) + I + '/(3' + R + ' + ' + rr(1) + '): same sum.') }],
      answer: p(U + ' = ' + rr(1) + '(2' + RI + ' − 3' + E + ')/(2(' + rr(1) + ' + 3' + R + ')).'),
      traps: ['Adding 2' + E + ': its arrow is opposite to the direction of travel toward ' + rr(1) + '.', 'Forgetting that the source ' + I + ' (pointing down) takes current away.'],
      note: OK },

    'f2018-ex4': { src: 'Exam Jan. 2018 · Ex 4', title: 'Millman: the voltage U',
      intro: p('Consider the circuit opposite. Determine ' + U + ' using Millman’s theorem.'),
      figs: [{ spec: { aria: 'Node A at the top, B at the bottom; source I1 pointing down; R1 then E1 pointing up; R2 then source I2 pointing up; R3 then E3 pointing down, with R4 in parallel with E3; voltage U between A and B' } }],
      hints: ['Ground at B. ' + ii(1) + ' leaves A, ' + ii(2) + ' flows into it; ' + rr(2) + ', in series with ' + ii(2) + ', does not count.', 'The bottom of ' + rr(3) + ' is at potential −' + ee(3) + ' (arrow pointing down); ' + rr(4) + ', in parallel with ' + ee(3) + ', does not count.'],
      solution: [
        { t: 'Millman at A, ground at B', html: p(U + ' = ' + vv('A') + ' = (' + ee(1) + '/' + rr(1) + ' − ' + ii(1) + ' + ' + ii(2) + ' − ' + ee(3) + '/' + rr(3) + ')/(1/' + rr(1) + ' + 1/' + rr(3) + ').') +
            p('Multiplying numerator and denominator by ' + rr(1) + rr(3) + ': <b>' + U + ' = (' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + ') − ' + rr(1) + ee(3) + ')/(' + rr(1) + ' + ' + rr(3) + ')</b>.') }],
      answer: p(U + ' = (' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + ') − ' + rr(1) + ee(3) + ')/(' + rr(1) + ' + ' + rr(3) + ').'),
      traps: ['Putting 1/' + rr(2) + ' or 1/' + rr(4) + ' in the denominator.', 'Taking +' + ee(3) + ': the arrow points down.'],
      note: OK },

    /* ================= Jan. 2017 ================= */
    'f2017-ex2': { src: 'Exam Jan. 2017 · Ex 2', title: 'Norton seen by R₂, with numerical values',
      intro: p('Consider the circuit opposite. ' + E + ' = 10 V, ' + ii(0) + ' = 10 mA, ' + rr(1) + ' = 1 kΩ, ' + rr(2) + ' = 1.2 kΩ, ' + rr(3) + ' = 500 Ω, ' + rr(4) + ' = 1.5 kΩ, ' + rr(5) + ' = 2 kΩ.'),
      figs: [{ spec: { aria: 'Source E, R1 at the top, vertical R2 (the load), R3 at the top, vertical R5, current source I0 pointing down; R4 on the bottom wire between R2 and R5' } }],
      questions: ['<b>1.</b> Determine the Norton generator seen by ' + rr(2) + '. Use the method of your choice (equivalences or application of the theorem), and express your result as a function of ' + ii(0) + ', ' + E + ' and the ' + rr('i') + '.', '<b>2.</b> Deduce the current in ' + rr(2) + '.'],
      hints: ['On the right: ' + ii(0) + ' // ' + rr(5) + ' as Thévenin (emf ' + rr(5) + ii(0) + '), in series with ' + rr(3) + ' and ' + rr(4) + '.', 'Calculate in kΩ and mA: the voltages come out in volts.'],
      solution: [
        { t: 'Step 1: the right part', html: p(ii(0) + ' // ' + rr(5) + ' → emf ' + rr(5) + ii(0) + ' in series with ' + rr(5) + '; with ' + rr(3) + ' and ' + rr(4) + ': ' + rr('eq') + ' = ' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + '. As Norton: ' + rr(5) + ii(0) + '/' + rr('eq') + ', pointing down, in parallel with ' + rr('eq') + '.') },
        { t: 'Step 2: Norton', html: p('On the left, ' + E + '/' + rr(1) + ' // ' + rr(1) + '. Sum: <b>' + IN + ' = ' + E + '/' + rr(1) + ' − ' + rr(5) + ii(0) + '/(' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ')</b>; <b>' + RN + ' = ' + rr(1) + '(' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ')/(' + rr(1) + ' + ' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ')</b>.') +
            p('Numerically: ' + IN + ' = 10/1 − 2 × 10/4 = 10 − 5 = <b>5 mA</b>; ' + RN + ' = 1 × 4/5 = <b>0.8 kΩ</b>.') },
        { t: 'Question 2', html: p(ii(2) + ' = ' + RN + '/(' + RN + ' + ' + rr(2) + ') · ' + IN + ' = 0.8/2 × 5 = <b>2 mA</b>.') }],
      answer: p(IN + ' = ' + E + '/' + rr(1) + ' − ' + rr(5) + ii(0) + '/(' + rr(3) + ' + ' + rr(4) + ' + ' + rr(5) + ') = 5 mA; ' + RN + ' = 800 Ω; ' + ii(2) + ' = 2 mA.'),
      traps: ['Forgetting ' + rr(4) + ', on the bottom wire.', 'Mixing Ω and kΩ.'],
      note: OK },

    'f2017-ex3': { src: 'Exam Jan. 2017 · Ex 3', title: 'Millman: U, then R₄ so that U = 0',
      intro: p('Consider the following circuit: ' + ee(1) + ' = 20 V, ' + ee(2) + ' = 5 V, ' + ee(4) + ' = 10 V, ' + ii(0) + ' = 0.25 mA, ' + rr(0) + ' = 1 kΩ, ' + rr(1) + ' = 10 kΩ, ' + rr(2) + ' = 50 kΩ, ' + rr(3) + ' = 12 kΩ.'),
      figs: [{ spec: { aria: 'Source E1, R2 then E2 pointing left on the top wire up to A; R1 on the bottom wire; R3; voltage U between A and B; source I0 pointing up in series with R0; E4 pointing right on the top wire; R4' } }],
      questions: ['<b>1.</b> Determine the expression of the voltage ' + U + ' using the method that seems most appropriate to you (Kirchhoff’s laws, superposition, Thévenin, Norton or Millman theorems), stating it beforehand. Express ' + U + ' as a function of ' + ee(1) + ', ' + ee(2) + ', ' + ee(4) + ', ' + ii(0) + ' and the resistors ' + rr('i') + '.',
        '<b>2.</b> Then determine ' + rr(4) + ' so that ' + U + ' is equal to 0.'],
      hints: ['Everything arrives between A and B: Millman, ground at B.', 'Left branch: emf ' + ee(1) + ' − ' + ee(2) + ' (opposite directions), resistance ' + rr(1) + ' + ' + rr(2) + '; ' + rr(0) + ', in series with ' + ii(0) + ', does not count.'],
      solution: [
        { t: 'Question 1: Millman', html: p(U + ' = ' + vv('A') + ' = ((' + ee(1) + ' − ' + ee(2) + ')/(' + rr(1) + ' + ' + rr(2) + ') + ' + ii(0) + ' − ' + ee(4) + '/' + rr(4) + ')/(1/(' + rr(1) + ' + ' + rr(2) + ') + 1/' + rr(3) + ' + 1/' + rr(4) + ').') +
            p('That is <b>' + U + ' = (' + rr(3) + rr(4) + '(' + ee(1) + ' − ' + ee(2) + ') + ' + rr(3) + rr(4) + '(' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ' − ' + rr(3) + '(' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + ')/(' + rr(3) + rr(4) + ' + (' + rr(1) + ' + ' + rr(2) + ')(' + rr(3) + ' + ' + rr(4) + '))</b>.') },
        { t: 'Question 2: U = 0', html: p('The numerator vanishes: ' + rr(4) + '((' + ee(1) + ' − ' + ee(2) + ') + (' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ') = (' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + ', hence <b>' + rr(4) + ' = (' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + '/(' + ee(1) + ' − ' + ee(2) + ' + (' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ')</b>.') +
            p('Numerically (kΩ, mA, V): 60 × 10/(15 + 60 × 0.25) = 600/30 = <b>20 kΩ</b>. ' + rr(3) + ' plays no role.') }],
      answer: p(U + ' by Millman (see above); ' + U + ' = 0 for ' + rr(4) + ' = (' + rr(1) + ' + ' + rr(2) + ')' + ee(4) + '/(' + ee(1) + ' − ' + ee(2) + ' + (' + rr(1) + ' + ' + rr(2) + ')' + ii(0) + ') = 20 kΩ.'),
      traps: ['Counting ' + rr(0) + ': it is in series with a current source.', 'Adding ' + ee(1) + ' and ' + ee(2) + ': their arrows are opposite along the branch.'],
      note: OK },

    'f2017-bonus': { src: 'Exam Jan. 2017 · Bonus · same exercise (mirrored) in January 2016', title: 'Millman: the voltage U between A and B',
      intro: p('Consider the circuit opposite. Determine ' + U + ' using Millman’s theorem.'),
      figs: [{ spec: { aria: 'Vertical R4 on the left, E3 pointing up, R3 at the top; R2 then current source I2 pointing up; voltage U; E1 pointing up then R1; source I1 pointing down; A at the top right, B at the bottom' } }],
      hints: ['Ground at B. The branch ' + rr(3) + ' reaches A from the top of ' + ee(3) + ' (potential ' + ee(3) + '); ' + rr(4) + ', in parallel with ' + ee(3) + ', does not count.'],
      solution: [
        { t: 'Millman at A, ground at B', html: p(U + ' = ' + vv('A') + ' = (' + ee(3) + '/' + rr(3) + ' + ' + ii(2) + ' + ' + ee(1) + '/' + rr(1) + ' − ' + ii(1) + ')/(1/' + rr(3) + ' + 1/' + rr(1) + '), i.e. <b>' + U + ' = (' + rr(1) + ee(3) + ' + ' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + '))/(' + rr(1) + ' + ' + rr(3) + ')</b>.') +
            p('The January 2016 paper draws the same circuit mirrored (A on the left): same answer.') }],
      answer: p(U + ' = (' + rr(1) + ee(3) + ' + ' + rr(3) + ee(1) + ' + ' + rr(1) + rr(3) + '(' + ii(2) + ' − ' + ii(1) + '))/(' + rr(1) + ' + ' + rr(3) + ').'),
      traps: ['Putting 1/' + rr(2) + ' or 1/' + rr(4) + ' in the denominator.'],
      note: 'Matches the official 2017 answer key (2016: no answer key). ' + CTRL }
  });
})();
