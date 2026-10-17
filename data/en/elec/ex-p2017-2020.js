/* English text for data/elec/ex-p2017-2020.js (merged by id over the French file).
   Nov. 2017: statements word for word from the official English paper. Oct. 2018 and Nov. 2020: faithful translation. */
(function () {

  /* ---------- same notation as the French file ---------- */
  function sub(i) { return i == null ? '' : '<sub>' + i + '</sub>'; }
  function v(s, i) { return '<var>' + s + '</var>' + sub(i); }               /* resistor, switch */
  function u(s, i) { return '<var class="u">' + s + '</var>' + sub(i); }     /* voltage */
  function c(s, i) { return '<var class="i">' + s + '</var>' + sub(i); }     /* current */
  function pt(i) { return '<var class="v">V</var><sub>' + i + '</sub>'; }    /* potential */
  function fr(n, d) { return '<span class="frac"><span>' + n + '</span><span>' + d + '</span></span>'; }
  var R = v('R'), R1 = v('R', 1), R2 = v('R', 2), R3 = v('R', 3), R4 = v('R', 4), R5 = v('R', 5);
  var E = u('E'), U = u('U'), I = c('I'), REQ = v('R', 'eq');
  var DOTS = '<span class="muted">…</span>';
  /* table; a null cell = blacked-out cell of the exam paper (same wrapper as the French file) */
  function table(head, rows) {
    var nw = ' style="white-space:nowrap"';
    return '<div style="width:0;min-width:100%"><div class="tbl"><table><thead><tr>' + head.map(function (h) { return '<th' + nw + '>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (r) {
        return '<tr>' + r.map(function (x) { return x === null ? '<td style="background:var(--muted)" title="blacked-out cell"><span class="sr-only">blacked-out cell</span></td>' : '<td' + nw + '>' + x + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div></div>';
  }
  var K1 = v('K', 1), K2 = v('K', 2);
  var REQ_Q = 'What is the total equivalent resistance? (Detail your reasoning – let us imagine that the current “goes in” at point A and “goes out” at B)';
  var D17 = v('R', 1) + v('R', 2) + ' + ' + v('R', 1) + v('R', 3) + ' + ' + v('R', 2) + v('R', 3);
  var I1 = c('I', 1), I3 = c('I', 3), E1 = u('E', 1);
  var D18 = R2 + R3 + ' + ' + R2 + R4 + ' + ' + R3 + R4;
  var S3 = R1 + ' + ' + R2 + ' + ' + R3, S12 = R1 + ' + ' + R2;
  var U1 = u('U', 1), U2 = u('U', 2), U3 = u('U', 3), U4 = u('U', 4), U5 = u('U', 5), U6 = u('U', 6), U7 = u('U', 7), I2 = c('I', 2);
  var D20 = R1 + R2 + ' + ' + R1 + R3 + ' + ' + R2 + R3, R123 = v('R', 123), r = v('r');

  var EN = {

    /* =====================================================================
       Midterm Nov. 2017 (class of 2022)
       ===================================================================== */

    /* ---------- Ex 2: current source, R′ and U′ ---------- */
    'p2017-ex2': {
      src: 'Midterm Nov. 2017 · Ex 2',
      title: 'Current source: find R′, then U′',
      intro: '<p>Let us consider the following circuit for which ' + I + ' and ' + R + ' are known.</p>',
      figs: [{ cap: 'Circuit from the exam paper' }],
      questions: ['<b>1.</b> Express the resistance ' + R + '′ in terms of ' + R + ' to get ' + U + ' = ' + fr(R + '.' + I, '4') + '.',
        '<b>2.</b> Write the expression of the voltage ' + U + '′ in terms of ' + I + ' and resistances (still consider ' + U + ' = ' + fr(R + '.' + I, '4') + ').'],
      hints: ['Look for the resistors that carry the same current. The right-hand loop (' + R + ', 3' + R + ' and the bottom 2' + R + ') contains no node.',
        'In the end, everything is in parallel between the top wire and the bottom wire. The current source then delivers ' + I + ' into a single equivalent resistance: ' + U + ' = ' + REQ + '·' + I + '.',
        'For ' + U + '′, go back to the original diagram: the right-hand loop has ' + U + ' across it. Think of the voltage divider.'],
      solution: [
        { t: 'Question 1: simplify the circuit',
          html: '<ol><li>Middle branch: 2' + R + ' and ' + R + ' carry the same current, so they are in series: 2' + R + ' + ' + R + ' = 3' + R + '.</li>' +
            '<li>Right-hand loop: ' + R + ', 3' + R + ' and the bottom 2' + R + ' follow one another with no node between them. The 2' + R + ' is drawn on the bottom wire, but it does belong to this loop. In series: ' + R + ' + 3' + R + ' + 2' + R + ' = 6' + R + '.</li>' +
            '<li>' + R + '′, 3' + R + ' and 6' + R + ' all connect the top wire to the bottom wire: they are in parallel, with the same voltage ' + U + ' across them.</li></ol>' +
            '<p>3' + R + ' // 6' + R + ' = (3' + R + '·6' + R + ')/(3' + R + ' + 6' + R + ') = 18' + R + '²/9' + R + ' = 2' + R + ', then ' + REQ + ' = ' + R + '′ // 2' + R + ' = ' + fr('2' + R + '·' + R + '′', '2' + R + ' + ' + R + '′') + '.</p>',
          figs: [{ cap: 'First step: ' + R + '′, 3' + R + ' (= 2' + R + ' + ' + R + ') and 6' + R + ' (= ' + R + ' + 3' + R + ' + 2' + R + ') in parallel' },
            { cap: 'Second step: the current source delivers into ' + REQ }] },
        { t: 'Question 1: calculate R′',
          html: '<p>The source imposes the current ' + I + ' in ' + REQ + '. Ohm’s law, in receiver convention:</p>' +
            '<p class="f-block">' + U + ' = ' + REQ + '·' + I + ' = ' + fr('2' + R + '·' + R + '′·' + I, '2' + R + ' + ' + R + '′') + '</p>' +
            '<p>You want ' + U + ' = ' + R + '·' + I + '/4. Simplify by ' + I + ':</p>' +
            '<p class="f-block">' + fr('2' + R + '·' + R + '′', '2' + R + ' + ' + R + '′') + ' = ' + fr(R, '4') + ' ⇔ 8' + R + '·' + R + '′ = ' + R + '(2' + R + ' + ' + R + '′) ⇔ 8' + R + '′ = 2' + R + ' + ' + R + '′ ⇔ 7' + R + '′ = 2' + R + '</p>' +
            '<p>Hence <b>' + R + '′ = 2' + R + '/7</b>.</p>' +
            '<p>Check: ' + R + '′ // 2' + R + ' = (2' + R + '/7 · 2' + R + ')/(2' + R + '/7 + 2' + R + ') = (4' + R + '²/7)/(16' + R + '/7) = ' + R + '/4. ✓</p>' +
            '<p>The answer key points it out: by simplifying, we kept ' + U + ' but lost ' + U + '′. For question 2, you have to go back to the original diagram.</p>' },
        { t: 'Question 2',
          html: '<p>On the original diagram, ' + R + ', 3' + R + ' and 2' + R + ' (right-hand loop) are in series, and this set is connected between the top wire and the bottom wire: it has ' + U + ' across it. ' + U + '′ is the voltage across 3' + R + ', drawn in the same direction as ' + U + '.</p>' +
            '<p>Voltage divider: ' + U + '′ = ' + fr('3' + R, R + ' + 3' + R + ' + 2' + R) + '·' + U + ' = ' + U + '/2.</p>' +
            '<p>With ' + U + ' = ' + R + '·' + I + '/4: <b>' + U + '′ = ' + R + '·' + I + '/8</b>.</p>',
          figs: [{ cap: 'The right-hand loop, in series, has ' + U + ' across it' }] }
      ],
      answer: '<p>' + R + '′ = ' + fr('2' + R, '7') + ' and ' + U + '′ = ' + fr(U, '2') + ' = ' + fr(R + '·' + I, '8') + '.</p>',
      traps: ['Not seeing that the bottom 2' + R + ' is in series with ' + R + ' and 3' + R + ': it is drawn on the bottom wire, but no node separates it from the right-hand loop.',
        'Believing that the current source imposes ' + U + ': it imposes ' + I + ', and ' + U + ' = ' + REQ + '·' + I + ' depends on all the resistors.',
        'Forgetting ' + R + '′ in the association: it is in parallel with the rest of the circuit.',
        'Writing ' + U + '′ = 3' + R + '·' + I + ': 3' + R + ' only gets part of ' + I + '.',
        'Looking for ' + U + '′ on the simplified diagram: it no longer appears there, you have to go back to the original circuit.']
    },

    /* ---------- Ex 3: switch table (voltage source) ---------- */
    'p2017-ex3': {
      src: 'Midterm Nov. 2017 · Ex 3',
      title: 'Switch table: voltages U₁, U₃ and U',
      intro: '<p>Consider the following circuit:</p>' +
        '<p><i>Note: the expected answers depend on the states of the switches and are independent from each other: so, this is not a “long” exercise but rather 4 “short” ones starting with the same sketch. Draw it on your draft to answer questions correctly. <u>Start by solving the cases that you find the simplest!</u></i></p>' +
        '<p>We assume that the voltage ' + E + ' and the three resistances are known.</p>' +
        '<p>Fill out the following table (only the result, no computation details). The voltages must depend <b><u>ONLY on ' + E + ' and/or resistances R1, R2 or R3</u></b> (except if these are vanishing!) <b><u>and NOT on each other!!</u></b></p>' +
        '<p style="text-align:center">Ask yourselves the right questions… you will get the right answers!!</p>' +
        table([K1, K2, u('U', 1), u('U', 3), U], [['O', 'O', DOTS, null, DOTS], ['O', 'C', DOTS, DOTS, DOTS], ['C', 'O', null, DOTS, DOTS], ['C', 'C', DOTS, DOTS, null]]) +
        '<p>Note: O = Opened; C = Closed</p>',
      figs: [{ cap: 'Circuit from the exam paper (switches drawn open)' }],
      hints: ['Redraw the circuit for each case: a closed switch becomes a wire (zero voltage across it), an open switch becomes a gap (zero current in its branch).',
        'When ' + K1 + ' is closed, what is the voltage across ' + R1 + '? When ' + K2 + ' is open, what current flows through ' + R3 + '?',
        'The voltage across an open switch is found with Kirchhoff’s voltage law. The other voltages come from a voltage divider.'],
      solution: [
        { t: 'Case K₁ open, K₂ open',
          html: '<p>' + K2 + ' open: the right branch is cut, no current flows through ' + R3 + '. So ' + u('U', 3) + ' = ' + R3 + ' × 0 = 0 (blacked-out cell).</p>' +
            '<p>A single loop remains: ' + E + ', ' + R1 + ' and ' + R2 + ' in series. The current leaves the + terminal of ' + E + ' and flows through ' + R1 + ' from left to right; the arrow ' + u('U', 1) + ' points to the left, the opposite way: receiver convention, ' + u('U', 1) + ' is positive. Voltage divider: ' + u('U', 1) + ' = ' + fr(R1 + E, R1 + ' + ' + R2) + '.</p>' +
            '<p>' + U + ' is the voltage across the open ' + K2 + ', and it is not zero. Since ' + R3 + ' carries no current, the bottom of ' + K2 + ' is at the potential of the bottom wire: ' + U + ' is the voltage across ' + R2 + ', ' + U + ' = ' + fr(R2 + E, R1 + ' + ' + R2) + '.</p>',
          figs: [{ cap: K1 + ' open, ' + K2 + ' open: a single loop ' + E + ', ' + R1 + ', ' + R2 + '; ' + R3 + ' gets no current' }] },
        { t: 'Case K₁ open, K₂ closed',
          html: '<p>' + K2 + ' closed is a wire: ' + U + ' = 0.</p>' +
            '<p>' + R3 + ' then connects the top of ' + R2 + ' to the bottom wire: ' + R2 + ' and ' + R3 + ' are in parallel, and ' + u('U', 3) + ' is also the voltage across ' + R2 + '. ' + R2 + ' // ' + R3 + ' = ' + R2 + R3 + '/(' + R2 + ' + ' + R3 + '), in series with ' + R1 + '.</p>' +
            '<p>Voltage divider: ' + u('U', 1) + ' = ' + R1 + '·' + E + '/(' + R1 + ' + ' + R2 + R3 + '/(' + R2 + ' + ' + R3 + ')). To have a single fraction bar, multiply top and bottom by (' + R2 + ' + ' + R3 + '):</p>' +
            '<p class="f-block">' + u('U', 1) + ' = ' + fr(R1 + '(' + R2 + ' + ' + R3 + ')' + E, D17) + ' &nbsp; and &nbsp; ' + u('U', 3) + ' = ' + fr(R2 + R3 + E, D17) + '</p>' +
            '<p>Check with Kirchhoff’s voltage law: ' + u('U', 1) + ' + ' + U + ' + ' + u('U', 3) + ' = ' + E + ', and here ' + u('U', 1) + ' + ' + u('U', 3) + ' = (' + D17 + ')' + E + '/(' + D17 + ') = ' + E + '. ✓</p>',
          figs: [{ cap: K1 + ' open, ' + K2 + ' closed: ' + R3 + ' ends up in parallel with ' + R2 }] },
        { t: 'Case K₁ closed, K₂ open',
          html: '<p>' + K1 + ' closed is a wire placed across ' + R1 + ': ' + R1 + ' is short-circuited, ' + u('U', 1) + ' = 0 (blacked-out cell).</p>' +
            '<p>' + K2 + ' open: no current in ' + R3 + ', so ' + u('U', 3) + ' = 0.</p>' +
            '<p>Kirchhoff’s voltage law in the loop ' + E + ', ' + K1 + ', ' + K2 + ', ' + R3 + ': ' + E + ' = ' + u('U', 1) + ' + ' + U + ' + ' + u('U', 3) + ' = 0 + ' + U + ' + 0, so <b>' + U + ' = ' + E + '</b>. The whole source voltage ends up across the open switch.</p>',
          figs: [{ cap: K1 + ' closed, ' + K2 + ' open: ' + R1 + ' is short-circuited and ' + R3 + ' gets no current' }] },
        { t: 'Case K₁ closed, K₂ closed',
          html: '<p>' + u('U', 1) + ' = 0 (' + K1 + ' short-circuits ' + R1 + ') and ' + U + ' = 0 (' + K2 + ' is a wire, blacked-out cell).</p>' +
            '<p>' + R3 + ' is then connected directly to both terminals of ' + E + ' by the two wires: ' + u('U', 3) + ' = ' + E + '. Same loop as above: ' + E + ' = 0 + 0 + ' + u('U', 3) + '.</p>',
          figs: [{ cap: K1 + ' closed, ' + K2 + ' closed: ' + R2 + ' and ' + R3 + ' are directly across ' + E }] }
      ],
      answer: table([K1, K2, u('U', 1), u('U', 3), U], [
        ['O', 'O', fr(R1 + E, R1 + ' + ' + R2), null, fr(R2 + E, R1 + ' + ' + R2)],
        ['O', 'C', fr(R1 + '(' + R2 + ' + ' + R3 + ')' + E, D17), fr(R2 + R3 + E, D17), '0'],
        ['C', 'O', null, '0', E],
        ['C', 'C', '0', E, null]]) +
        '<p style="margin-top:.5rem">The blacked-out cells are 0: ' + u('U', 3) + ' with ' + K2 + ' open, ' + u('U', 1) + ' with ' + K1 + ' closed, ' + U + ' with ' + K2 + ' closed.</p>',
      traps: ['Believing that the voltage across an open switch is zero: it is the current that is zero. Here ' + U + ' = ' + E + ' when ' + K1 + ' is closed, and ' + U + ' = ' + R2 + E + '/(' + R1 + ' + ' + R2 + ') when both are open.',
        'Forgetting that a closed switch in parallel with ' + R1 + ' short-circuits it: ' + u('U', 1) + ' = 0.',
        'Forgetting that an open branch carries no current: ' + u('U', 3) + ' = 0 as soon as ' + K2 + ' is open.',
        'Expressing one voltage in terms of another (' + u('U', 1) + ' = ' + E + ' − ' + u('U', 3) + '…): the statement forbids it, everything must depend on ' + E + ' and the resistances.',
        'Leaving a fraction of a fraction for ' + R2 + ' // ' + R3 + ': multiply top and bottom by (' + R2 + ' + ' + R3 + ').',
        'Getting the sign wrong because of the arrow ' + u('U', 1) + ' drawn to the left: it points to the terminal where the current enters, so ' + u('U', 1) + ' is positive.']
    },

    /* ---------- Ex 4: superposition theorem ---------- */
    'p2017-ex4': {
      src: 'Midterm Nov. 2017 · Ex 4',
      title: 'Superposition: the current in R₁',
      intro: '<p>Consider the following circuit:</p>',
      figs: [{ cap: 'Circuit from the exam paper' }],
      questions: ['Determine the expression of ' + I1 + ' in ' + R1 + ' in terms of ' + E1 + ', ' + I3 + ', ' + R1 + ', ' + R2 + ', ' + R3 + ' <u>by using superposition theorem</u>.'],
      hints: ['Handle the two sources one after the other: first ' + E1 + ' alone, then ' + I3 + ' alone.',
        'To turn off a source, remove its circle: a voltage source leaves a wire, a current source leaves a gap.',
        'With ' + I3 + ' alone, the branch ' + R1 + ' + ' + R2 + ' is in parallel with ' + R3 + ': current divider. Then compare the direction of the current you get with the arrow ' + I1 + '.'],
      solution: [
        { t: 'State 1: E₁ alone',
          html: '<p>Keep ' + E1 + ' and turn off ' + I3 + ': a turned-off current source imposes 0 A, it is a gap. The right branch disappears.</p>' +
            '<p>A single loop remains: ' + E1 + ', ' + R1 + ', ' + R3 + ' and ' + R2 + ' in series. The current leaves the + terminal of ' + E1 + ' and flows in the direction of the arrow ' + I1 + ':</p>' +
            '<p class="f-block">' + I1 + '′ = ' + fr(E1, R1 + ' + ' + R2 + ' + ' + R3) + '</p>',
          figs: [{ cap: 'State 1: ' + I3 + ' turned off (gap), a single loop' }] },
        { t: 'State 2: I₃ alone',
          html: '<p>Keep ' + I3 + ' and turn off ' + E1 + ': a turned-off voltage source imposes 0 V, it is a wire.</p>' +
            '<p>' + R1 + ' and ' + R2 + ' then follow each other through this wire: they are in series, ' + R1 + ' + ' + R2 + '. This branch connects A and B, like ' + R3 + ': it is in parallel with ' + R3 + '.</p>' +
            '<p>' + I3 + ' arrives at A and splits. Current divider, with the resistance of the other branch in the numerator: the branch ' + R1 + ' + ' + R2 + ' gets ' + R3 + I3 + '/(' + R1 + ' + ' + R2 + ' + ' + R3 + '). This current leaves A and flows through ' + R1 + ' from right to left, opposite to the arrow ' + I1 + ':</p>' +
            '<p class="f-block">' + I1 + '″ = −' + fr(R3 + I3, R1 + ' + ' + R2 + ' + ' + R3) + '</p>',
          figs: [{ cap: 'State 2: ' + E1 + ' turned off (wire), ' + R1 + ' + ' + R2 + ' in parallel with ' + R3 }] },
        { t: 'Superposition',
          html: '<p>Add the two contributions:</p>' +
            '<p class="f-block">' + I1 + ' = ' + I1 + '′ + ' + I1 + '″ = ' + fr(E1 + ' − ' + R3 + I3, R1 + ' + ' + R2 + ' + ' + R3) + '</p>' +
            '<p>Dimensional check: ' + R3 + I3 + ' is a voltage, like ' + E1 + '; divided by ohms, it does give a current.</p>' }
      ],
      answer: '<p>' + I1 + ' = ' + fr(E1 + ' − ' + R3 + '·' + I3, R1 + ' + ' + R2 + ' + ' + R3) + '</p>',
      traps: ['Mixing up how to turn the sources off: a turned-off voltage source becomes a wire, a turned-off current source becomes a gap.',
        'Forgetting the minus sign of ' + I1 + '″: ' + I3 + ' drives current through ' + R1 + ' opposite to the arrow ' + I1 + '.',
        'Current divider: the numerator holds the resistance of the other branch (' + R3 + ').',
        'Not seeing that ' + R1 + ' and ' + R2 + ' are in series once ' + E1 + ' is replaced by a wire.',
        'In state 1, looking for a parallel with ' + R3 + ': the branch of ' + I3 + ' is a gap, only one loop remains.']
    },

    /* ---------- Ex 5: resistor association ---------- */
    'p2017-ex5': {
      src: 'Midterm Nov. 2017 · Ex 5',
      title: 'Equivalent resistance of a three-stage network',
      figs: [{ cap: 'Network from the exam paper' }],
      questions: [REQ_Q],
      hints: ['Find the nodes: the top rail (A), the point below the three top resistors, the middle rail and the bottom rail (B).',
        'The three top resistors connect the same two nodes, just like the three bottom 3' + R + ': reduce each group to a single resistor.',
        'The left 2' + R + ' connects A to the middle rail: it is in parallel with the whole central path between these two nodes.'],
      solution: [
        { t: 'Finding the nodes',
          html: '<p>Call N the point where the feet of the three top resistors (4' + R + ', 2' + R + ', 4' + R + ') meet, and M the middle rail. The current enters at A, goes down to M by two paths (the central path and the left 2' + R + '), then goes from M to B through the three 3' + R + '.</p>' },
        { t: 'Reducing step by step',
          html: '<ol><li>Top group, between A and N: 4' + R + ' // 4' + R + ' = 2' + R + ', then 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
            '<li>Bottom group, between M and B: three 3' + R + ' in parallel, 3' + R + '/3 = ' + R + '.</li>' +
            '<li>Central path, between A and M: ' + R + ' (top group) in series with the vertical ' + R + ', ' + R + ' + ' + R + ' = 2' + R + '.</li>' +
            '<li>This path is in parallel with the left 2' + R + ', which also connects A to M: 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
            '<li>What remains is ' + R + ' (from A to M) in series with ' + R + ' (from M to B).</li></ol>' +
            '<p><b>' + REQ + ' = ' + R + ' + ' + R + ' = 2' + R + '</b>.</p>',
          figs: [{ cap: 'From left to right: top and bottom groups reduced to ' + R + '; ' + R + ' + ' + R + ' = 2' + R + ' in parallel with the left 2' + R + '; 2' + R + ' // 2' + R + ' = ' + R + ', in series with ' + R }] }
      ],
      answer: '<p>' + REQ + ' = 2' + R + '</p>',
      traps: ['Believing that the left 2' + R + ' is in parallel with the central ' + R + ' alone: it connects A to the middle rail, so it is in parallel with the whole central path (top group + ' + R + ').',
        'Forgetting the central 2' + R + ' of the top group: 4' + R + ', 2' + R + ' and 4' + R + ' are all three between A and N.',
        'Adding the three bottom 3' + R + ' instead of combining them in parallel: <var>n</var> equal resistors in parallel give ' + R + '/<var>n</var>.']
    },

    /* =====================================================================
       Midterm Oct. 2018 (class of 2023): no official answer key
       ===================================================================== */

    /* ---------- Ex 2: Kirchhoff’s laws, numerical application ---------- */
    'p2018-ex2': {
      src: 'Midterm Oct. 2018 · Ex 2',
      title: 'Voltages across four resistors',
      intro: '<p>Consider the circuit opposite, with: ' + E + ' = 3 V, ' + R1 + ' = 15 Ω, ' + R2 + ' = 6 Ω, ' + R3 + ' = 20 Ω and ' + R4 + ' = 5 Ω.</p>',
      figs: [{ cap: 'Circuit from the exam paper' }],
      questions: ['Calculate the voltages across each of the resistors. Give the literal expression before doing the numerical application.<br><i>Reminder: do not forget to name them and to draw their arrows!!</i>'],
      hints: ['Follow the wires that have no component: the whole left wire is a single node, and the small vertical wire to the right of ' + R3 + ' connects the end of ' + R4 + ' to the top wire.',
        R1 + ' is connected directly between the two terminals of the source. ' + R3 + ' and ' + R4 + ' connect the same two nodes.',
        'Replace ' + R3 + ' // ' + R4 + ' by a single resistor, then apply the voltage divider with ' + R2 + '.'],
      solution: [
        { t: 'Naming and drawing the arrows',
          html: '<p>Name M the left wire, connected to the + terminal of ' + E + ' (the arrow ' + E + ' points to the left). Name N the point to the right of ' + R3 + ', connected by the small vertical wire to the end of ' + R4 + ', and P the right wire below ' + R2 + ', connected to the − terminal.</p>' +
            '<p>The currents go from M to P. Draw each voltage in receiver convention, opposite to the current: ' + u('U', 1) + ', ' + u('U', 3) + ' and ' + u('U', 4) + ' point to M, ' + u('U', 2) + ' points to N.</p>',
          figs: [{ cap: 'Nodes named, voltages drawn in receiver convention' }] },
        { t: 'Analyzing the circuit',
          html: '<ul><li>' + R1 + ' is connected directly between M and P, so across ' + E + ': <b>' + u('U', 1) + ' = ' + E + ' = 3 V</b>, with no calculation.</li>' +
            '<li>' + R3 + ' and ' + R4 + ' both go from M to N: they are in parallel and have the same voltage, ' + u('U', 3) + ' = ' + u('U', 4) + '. ' + v('R', 34) + ' = ' + R3 + R4 + '/(' + R3 + ' + ' + R4 + ') = (20 × 5)/25 = 4 Ω.</li>' +
            '<li>The path M → N → P is ' + v('R', 34) + ' in series with ' + R2 + ', and it also has ' + E + ' across it.</li></ul>',
          figs: [{ cap: 'Simplified circuit: ' + R1 + ' across ' + E + ', and ' + v('R', 34) + ' in series with ' + R2 }] },
        { t: 'Voltage divider',
          html: '<p>On the path M → N → P, ' + E + ' is shared between ' + v('R', 34) + ' and ' + R2 + '. To get back to the original resistors, multiply top and bottom by (' + R3 + ' + ' + R4 + '):</p>' +
            '<p class="f-block">' + u('U', 3) + ' = ' + u('U', 4) + ' = ' + fr(v('R', 34) + E, v('R', 34) + ' + ' + R2) + ' = ' + fr(R3 + R4 + E, D18) + ' = ' + fr('3 × 100', '120 + 30 + 100') + ' = 1.2 V</p>' +
            '<p class="f-block">' + u('U', 2) + ' = ' + fr(R2 + E, v('R', 34) + ' + ' + R2) + ' = ' + fr(R2 + '(' + R3 + ' + ' + R4 + ')' + E, D18) + ' = ' + fr('3 × 150', '250') + ' = 1.8 V</p>' },
        { t: 'Checking',
          html: '<ul><li>Kirchhoff’s voltage law on M → N → P: ' + u('U', 3) + ' + ' + u('U', 2) + ' = 1.2 + 1.8 = 3 V = ' + E + '. ✓</li>' +
            '<li>Currents: ' + c('I', 2) + ' = 1.8/6 = 0.3 A, ' + c('I', 3) + ' = 1.2/20 = 0.06 A, ' + c('I', 4) + ' = 1.2/5 = 0.24 A. Kirchhoff’s current law at N: 0.06 + 0.24 = 0.3 A. ✓</li>' +
            '<li>The source delivers ' + c('I', 1) + ' + ' + c('I', 2) + ' = 3/15 + 0.3 = 0.5 A.</li></ul>' }
      ],
      answer: '<p>Voltages drawn in receiver convention:</p>' +
        '<p>' + u('U', 1) + ' = ' + E + ' = 3 V; ' + u('U', 3) + ' = ' + u('U', 4) + ' = ' + fr(R3 + R4 + E, D18) + ' = 1.2 V; ' + u('U', 2) + ' = ' + fr(R2 + '(' + R3 + ' + ' + R4 + ')' + E, D18) + ' = 1.8 V.</p>',
      traps: ['Not seeing the parallel combination ' + R3 + ' // ' + R4 + ': it is the small vertical wire to the right of ' + R3 + ' that connects the end of ' + R4 + ' to the top wire.',
        'Looking for ' + u('U', 1) + ' with a voltage divider: ' + R1 + ' is connected directly across ' + E + ', so ' + u('U', 1) + ' = ' + E + '.',
        'Getting the + terminal wrong: the source is on the bottom wire and its arrow points to the left, so the + terminal is on the left.',
        'Forgetting to name the voltages and draw their arrows: the statement requires it, and without an arrow the sign of a voltage is meaningless.',
        'Giving 1.2 V and 1.8 V directly: the literal expression is required before the numerical application.']
    },

    /* ---------- Ex 3: switch table (current source) ---------- */
    'p2018-ex3': {
      src: 'Midterm Oct. 2018 · Ex 3',
      title: 'Switch table with a current source',
      intro: '<p>Consider the following circuit:</p>' +
        '<p>The current ' + I + ' and the 3 resistances are assumed to be known.</p>' +
        '<p>You are asked to find the equations of the currents IN the 3 resistors (the indices of the currents in the table below obviously match the corresponding resistors).</p>' +
        '<p>Fill out the following table (only the result, no computation details). The requested currents must depend <b><u>ONLY on ' + I + ' and/or resistances R1, R2 or R3</u></b> (except if they are zero!) <b><u>and NOT on each other (so NO Kirchhoff’s current law to express one current in terms of another).</u></b></p>' +
        '<p style="text-align:center">Ask yourselves the right questions… you will get the right answers!!</p>' +
        '<p><i>Note: the expected answers depend on the positions of the switches and are independent from each other: so, this is not a “long” exercise but rather 4 “short” ones starting with the same sketch.</i></p>' +
        '<p><i>So start with the cases that you find the simplest!</i></p>' +
        table([K1, K2, c('I', 1), c('I', 2), c('I', 3)], [['O', 'O', DOTS, DOTS, DOTS], ['O', 'C', DOTS, DOTS, DOTS], ['C', 'O', DOTS, DOTS, DOTS], ['C', 'C', DOTS, DOTS, DOTS]]) +
        '<p><i>NB: O = Open; C = Closed</i></p>',
      figs: [{ cap: 'Circuit from the exam paper (switches drawn open)' }],
      hints: ['Redraw each case: closed switch = wire, open switch = gap. Then look for the points that now form a single node.',
        'A resistor with one terminal leading nowhere carries no current. Neither does a resistor whose two terminals are connected by a wire.',
        'To share ' + I + ' between two branches in parallel, use the current divider: the current in one branch is proportional to the resistance of the other branch.'],
      solution: [
        { t: 'Case K₁ open, K₂ open',
          html: '<p>The bottom of ' + R2 + ' is connected only to open switches: ' + R2 + ' is a dead end, no current can flow through it. ' + c('I', 2) + ' = 0.</p>' +
            '<p>The current ' + I + ' of the source has only one path: ' + R1 + ' then ' + R3 + '. ' + c('I', 1) + ' = ' + I + ' and ' + c('I', 3) + ' = ' + I + '.</p>',
          figs: [{ cap: K1 + ' and ' + K2 + ' open: ' + R2 + ' is a dead end, all the current flows through ' + R1 + ' then ' + R3 }] },
        { t: 'Case K₁ open, K₂ closed',
          html: '<p>' + K2 + ' closed connects the bottom of ' + R2 + ' to the point between ' + R1 + ' and ' + R3 + '. ' + R1 + ' and ' + R2 + ' then connect the same two nodes: they are in parallel.</p>' +
            '<p>' + K1 + ' open: the current can only go back down through ' + R3 + ', so ' + c('I', 3) + ' = ' + I + '.</p>' +
            '<p>Current divider, with the resistance of the other branch in the numerator:</p>' +
            '<p class="f-block">' + c('I', 1) + ' = ' + fr(R2 + I, S12) + ' &nbsp; and &nbsp; ' + c('I', 2) + ' = ' + fr(R1 + I, S12) + '</p>',
          figs: [{ cap: K1 + ' open, ' + K2 + ' closed: ' + R2 + ' is in parallel with ' + R1 }] },
        { t: 'Case K₁ closed, K₂ open',
          html: '<p>' + K1 + ' closed connects the bottom of ' + R2 + ' to the bottom wire: ' + R2 + ' goes directly from the top wire to the bottom wire. ' + K2 + ' open: ' + R1 + ' and ' + R3 + ' stay in series.</p>' +
            '<p>Two branches in parallel: ' + R2 + ' on one side, ' + R1 + ' + ' + R3 + ' on the other. Current divider:</p>' +
            '<p class="f-block">' + c('I', 2) + ' = ' + fr('(' + R1 + ' + ' + R3 + ')' + I, S3) + ' &nbsp; and &nbsp; ' + c('I', 1) + ' = ' + c('I', 3) + ' = ' + fr(R2 + I, S3) + '</p>',
          figs: [{ cap: K1 + ' closed, ' + K2 + ' open: ' + R2 + ' in parallel with the branch ' + R1 + ' + ' + R3 }] },
        { t: 'Case K₁ closed, K₂ closed',
          html: '<p>The two closed switches connect the point between ' + R1 + ' and ' + R3 + ', the bottom of ' + R2 + ' and the bottom wire: these three points now form a single node. The two terminals of ' + R3 + ' are connected by wires: ' + R3 + ' is short-circuited, ' + c('I', 3) + ' = 0.</p>' +
            '<p>' + R1 + ' and ' + R2 + ' connect the top wire to this node: they are in parallel and share ' + I + ':</p>' +
            '<p class="f-block">' + c('I', 1) + ' = ' + fr(R2 + I, S12) + ' &nbsp; and &nbsp; ' + c('I', 2) + ' = ' + fr(R1 + I, S12) + '</p>',
          figs: [{ cap: K1 + ' and ' + K2 + ' closed: ' + R3 + ' is short-circuited, ' + R1 + ' and ' + R2 + ' in parallel' }] }
      ],
      answer: '<p>Currents directed downward in each resistor:</p>' +
        table([K1, K2, c('I', 1), c('I', 2), c('I', 3)], [
          ['O', 'O', I, '0', I],
          ['O', 'C', fr(R2 + I, S12), fr(R1 + I, S12), I],
          ['C', 'O', fr(R2 + I, S3), fr('(' + R1 + ' + ' + R3 + ')' + I, S3), fr(R2 + I, S3)],
          ['C', 'C', fr(R2 + I, S12), fr(R1 + I, S12), '0']]),
      traps: ['Not seeing that ' + R3 + ' is short-circuited when ' + K1 + ' and ' + K2 + ' are closed: ' + c('I', 3) + ' = 0.',
        'Believing that ' + R2 + ' conducts when both switches are open: its foot leads nowhere.',
        'Inverting the current divider: the current in ' + R1 + ' is proportional to ' + R2 + ', the resistance of the other branch.',
        'Expressing one current in terms of another with Kirchhoff’s current law (' + c('I', 3) + ' = ' + I + ' − ' + c('I', 2) + '…): the statement forbids it.',
        'Forgetting that the current source imposes ' + I + ', whatever the position of the switches.']
    },

    /* ---------- Ex 4: resistor association (variant of the 2017 network) ---------- */
    'p2018-ex4': {
      src: 'Midterm Oct. 2018 · Ex 4',
      title: 'The 2017 network, with one junction moved',
      figs: [{ cap: 'Network from the exam paper' }],
      questions: [REQ_Q],
      hints: ['This network looks like the 2017 one, but look at where the foot of each resistor ends up.',
        'The right 4' + R + ' goes down to the middle rail, without passing through the point below the 2' + R + '. It connects A to this rail, like the left 4' + R + '.',
        'Between A and the middle rail, there are three paths in parallel. With three branches, adding the conductances 1/' + R + ' is faster.'],
      solution: [
        { t: 'Finding the nodes',
          html: '<p>Call N the point below the 2' + R + ' (where the foot of the inner 4' + R + ' also arrives) and M the middle rail. Compared with 2017, two things change:</p>' +
            '<ul><li>the right 4' + R + ' does not reach N: its wire goes straight down to M;</li><li>the left column is 4' + R + ', between A and M.</li></ul>' },
        { t: 'Reducing step by step',
          html: '<ol><li>Between A and N: 4' + R + ' // 2' + R + ' = (4' + R + '·2' + R + ')/(4' + R + ' + 2' + R + ') = 8' + R + '²/6' + R + ' = 4' + R + '/3.</li>' +
            '<li>In series with the vertical ' + R + ', from N to M: 4' + R + '/3 + ' + R + ' = 7' + R + '/3.</li>' +
            '<li>Between A and M, three paths in parallel: 7' + R + '/3, the left 4' + R + ' and the right 4' + R + '. 4' + R + ' // 4' + R + ' = 2' + R + ', then:' +
            '<p class="f-block">' + fr('7' + R + '/3 · 2' + R, '7' + R + '/3 + 2' + R) + ' = ' + fr('14' + R + '²/3', '13' + R + '/3') + ' = ' + fr('14' + R, '13') + '</p></li>' +
            '<li>Between M and B: 3' + R + ' // 3' + R + ' // 3' + R + ' = ' + R + '.</li></ol>' +
            '<p><b>' + REQ + ' = 14' + R + '/13 + ' + R + ' = 27' + R + '/13</b>, that is about 2.08' + R + '.</p>' +
            '<p>With conductances, step 3 is faster:</p>' +
            '<p class="f-block">' + fr('3', '7' + R) + ' + ' + fr('1', '4' + R) + ' + ' + fr('1', '4' + R) + ' = ' + fr('3', '7' + R) + ' + ' + fr('1', '2' + R) + ' = ' + fr('6 + 7', '14' + R) + ' = ' + fr('13', '14' + R) + '</p>' +
            '<p>Taking the inverse does give 14' + R + '/13 between A and M.</p>',
          figs: [{ cap: 'Left: 4' + R + ' // 2' + R + ' = 4' + R + '/3 and the bottom group reduced to ' + R + ', three paths between A and M. Right: 4' + R + '/3 + ' + R + ' = 7' + R + '/3 and 4' + R + ' // 4' + R + ' = 2' + R }] }
      ],
      answer: '<p>' + REQ + ' = ' + fr('27' + R, '13') + ' ≈ 2.08' + R + '</p>',
      traps: ['Copying the 2017 reasoning without looking at the junctions: here the right 4' + R + ' joins the middle rail, not the point below the 2' + R + '.',
        'Putting the right 4' + R + ' in parallel with 4' + R + ' // 2' + R + ': it does not connect the same nodes.',
        'Rounding 7' + R + '/3 or 14' + R + '/13 along the way: keep the exact fractions until the end.',
        'Forgetting the bottom group: 3' + R + ' // 3' + R + ' // 3' + R + ' = ' + R + '.']
    },

    /* =====================================================================
       Midterm Nov. 2020 (class of 2025)
       ===================================================================== */

    /* ---------- Ex 2: resistor association ---------- */
    'p2020-ex2': {
      src: 'Midterm Nov. 2020 · Ex 2',
      title: 'Equivalent resistance: two paths between A and B',
      figs: [{ cap: 'Network from the exam paper' }],
      questions: [REQ_Q],
      hints: ['Follow each wire: where does the foot of the bottom 3' + R + ' end up? And the bottom-left point, below the ' + R + ' of the left column?',
        'Start with the obvious series combinations (2' + R + ' + 4' + R + ', twice) and with the parallel combination of the two top 2' + R + ', in the center and on the right.',
        'The parallel combination 6' + R + ' // 3' + R + ' appears twice: product over sum, 18' + R + '²/9' + R + ' = 2' + R + '.'],
      solution: [
        { t: 'Finding the nodes',
          html: '<p>Call C the point of the left column between 4' + R + ' and ' + R + ' (where the foot of the top 3' + R + ' arrives), and D the central node below the two top 2' + R + '.</p>' +
            '<ul><li>The two black dots in the center are connected by a wire: they are the same node D.</li>' +
            '<li>The bottom-left point, where the left ' + R + ' and the bottom 3' + R + ' arrive, is connected to B by a plain wire: it is B.</li></ul>' },
        { t: 'Obvious series and parallel combinations',
          html: '<ol><li>Left column, between A and C: 2' + R + ' + 4' + R + ' = 6' + R + '.</li>' +
            '<li>Central column, between D and B: 2' + R + ' + 4' + R + ' = 6' + R + '.</li>' +
            '<li>The two top 2' + R + ' connect A to D: 2' + R + ' // 2' + R + ' = ' + R + '.</li></ol>',
          figs: [{ cap: '6' + R + ' // 3' + R + ' between A and C, ' + R + ' between C and B; ' + R + ' between A and D, 6' + R + ' // 3' + R + ' between D and B' }] },
        { t: 'Finishing the reduction',
          html: '<p>The pattern 6' + R + ' // 3' + R + ' appears twice, between A and C and between D and B (the bottom 3' + R + ' goes from D to the point connected to B):</p>' +
            '<p class="f-block">6' + R + ' // 3' + R + ' = ' + fr('6' + R + ' × 3' + R, '6' + R + ' + 3' + R) + ' = ' + fr('18' + R + '²', '9' + R) + ' = 2' + R + '</p>' +
            '<p>Two paths remain between A and B: A → C → B is 2' + R + ' + ' + R + ' = 3' + R + ', and A → D → B is ' + R + ' + 2' + R + ' = 3' + R + '.</p>' +
            '<p><b>' + REQ + ' = 3' + R + ' // 3' + R + ' = 3' + R + '/2</b>.</p>',
          figs: [{ cap: 'Two paths of 3' + R + ' in parallel: ' + REQ + ' = 3' + R + '/2' }] }
      ],
      answer: '<p>' + REQ + ' = ' + fr('3' + R, '2') + '</p>',
      traps: ['Not seeing that the bottom-left point (foot of the left ' + R + ' and of the bottom 3' + R + ') is connected to B by a plain wire.',
        'Believing that the two black dots in the center are two different nodes: a wire connects them, so they are the same node.',
        'Adding 2' + R + ' and 4' + R + ' in the central column and stopping there: the bottom 3' + R + ' is in parallel with this set (6' + R + ' // 3' + R + ').']
    },

    /* ---------- Ex 3: points A to F, voltages and currents ---------- */
    'p2020-ex3': {
      src: 'Midterm Nov. 2020 · Ex 3',
      title: 'Place the points, then find voltages and currents',
      intro: '<p>Consider the diagram in the figure. Let’s set:</p>' +
        '<ul><li>' + E + ' = ' + pt('A') + ' − ' + pt('B') + ' = 240 V</li><li>' + U1 + ' = ' + pt('F') + ' − ' + pt('B') + ' = 184 V</li>' +
        '<li>' + U4 + ' = ' + pt('C') + ' − ' + pt('D') + ' = −110 V</li><li>' + U5 + ' = ' + u('U', 'AD') + ' = 46 V</li></ul>' +
        '<p class="sol-note">Note: this is the same circuit as TD 1 Ex 2 of your class, except for one detail: in the TD, the arrows ' + I1 + ' and ' + I2 + ' are drawn the other way.</p>',
      figs: [{ cap: 'Diagram from the exam paper (no letter is placed)' }],
      questions: ['<b>1.</b> Place the points A, B, C, D and F on the figure.',
        '<b>2.</b> Calculate the values of voltages ' + U2 + ', ' + U3 + ', ' + U6 + ' and ' + U7 + '.',
        '<b>3.</b> Calculate the intensity of currents ' + I1 + ', ' + I2 + ' and ' + I + ' present in the figure. Let’s set ' + R1 + ' = ' + R3 + ' = 100 Ω.'],
      hints: ['Read each given value as an arrow: ' + U1 + ' = ' + pt('F') + ' − ' + pt('B') + ' means that the arrow ' + U1 + ' starts at B and points to F.',
        'For the voltages, the fastest way is to take ' + pt('B') + ' = 0 and to compute the potential of each point step by step.',
        'F joins only ' + R1 + ' and ' + R2 + ': ' + I1 + ' also flows through ' + R1 + '. Compare the directions of ' + U1 + ' and ' + I1 + ' before writing Ohm’s law.'],
      solution: [
        { t: 'Question 1: placing the points',
          html: '<p>The arrow of a voltage ' + u('U', 'XY') + ' = ' + pt('X') + ' − ' + pt('Y') + ' points to X.</p>' +
            '<ul><li>' + E + ' = ' + pt('A') + ' − ' + pt('B') + ' and the arrow ' + E + ' points to the right: <b>A</b> is the right node (+ terminal), <b>B</b> the left node.</li>' +
            '<li>' + U1 + ' = ' + pt('F') + ' − ' + pt('B') + ': the arrow ' + U1 + ' starts at B and points to the top middle point, so that is <b>F</b>.</li>' +
            '<li>' + U4 + ' = ' + pt('C') + ' − ' + pt('D') + ' and the arrow ' + U4 + ' points to the left: <b>C</b> is the point between ' + R3 + ' and ' + R4 + ', <b>D</b> the one between ' + R4 + ' and ' + R5 + '.</li>' +
            '<li>Check: ' + U5 + ' = ' + pt('A') + ' − ' + pt('D') + ', and the arrow ' + U5 + ' does point to A.</li></ul>',
          figs: [{ cap: 'The five points placed' }] },
        { t: 'Question 2: Kirchhoff’s voltage law',
          html: '<p>For each loop, choose a direction of travel: an arrow in the direction of travel counts +, an arrow in the other direction counts −.</p>' +
            '<ul><li>Loop ' + E + ', ' + R2 + ', ' + R1 + ' (path B → A → F → B): ' + E + ' + ' + U2 + ' − ' + U1 + ' = 0, so <b>' + U2 + ' = ' + U1 + ' − ' + E + ' = 184 − 240 = −56 V</b>.</li>' +
            '<li>Loop ' + E + ', ' + R5 + ', ' + R4 + ', ' + R3 + ' (B → A → D → C → B): ' + E + ' − ' + U5 + ' + ' + U4 + ' − ' + U3 + ' = 0, so <b>' + U3 + ' = ' + E + ' + ' + U4 + ' − ' + U5 + ' = 240 − 110 − 46 = 84 V</b>.</li>' +
            '<li>Loop ' + R1 + ', ' + U6 + ', ' + R3 + ' (B → F → C → B): ' + U1 + ' + ' + U6 + ' − ' + U3 + ' = 0, so <b>' + U6 + ' = ' + U3 + ' − ' + U1 + ' = 84 − 184 = −100 V</b>.</li>' +
            '<li>Loop ' + E + ', ' + R5 + ', ' + U7 + ', ' + R1 + ' (B → A → D → F → B): ' + E + ' − ' + U5 + ' + ' + U7 + ' − ' + U1 + ' = 0, so <b>' + U7 + ' = ' + U5 + ' + ' + U1 + ' − ' + E + ' = 46 + 184 − 240 = −10 V</b>.</li></ul>' +
            '<p>' + U6 + ' and ' + U7 + ' are not components: they are just voltages between two points, and Kirchhoff’s voltage law still applies.</p>' +
            '<p class="sol-note">In the official answer key, the sign in front of ' + U5 + ' is written over on one line; the correct expression is ' + U3 + ' = ' + E + ' + ' + U4 + ' − ' + U5 + ', which does give 84 V.</p>' },
        { t: 'Question 2: check with potentials',
          html: '<p>Faster: take B as ground (' + pt('B') + ' = 0) and move forward step by step.</p>' +
            table(['Point', 'B', 'A', 'F', 'D', 'C'], [['Calculation', 'ground', pt('B') + ' + ' + E, pt('B') + ' + ' + U1, pt('A') + ' − ' + U5, pt('D') + ' + ' + U4], ['Potential', '0', '240 V', '184 V', '194 V', '84 V']]) +
            '<p>' + U2 + ' = ' + pt('F') + ' − ' + pt('A') + ' = −56 V, ' + U3 + ' = ' + pt('C') + ' − ' + pt('B') + ' = 84 V, ' + U6 + ' = ' + pt('C') + ' − ' + pt('F') + ' = −100 V and ' + U7 + ' = ' + pt('F') + ' − ' + pt('D') + ' = −10 V. Same results.</p>' },
        { t: 'Question 3: currents',
          html: '<ul><li>F joins only ' + R1 + ' and ' + R2 + ': they form one branch, and ' + I1 + ' also flows through ' + R1 + ', from B to F. In ' + R1 + ', ' + U1 + ' and ' + I1 + ' point in the same direction: source convention, ' + U1 + ' = −' + R1 + I1 + '. So <b>' + I1 + ' = −' + U1 + '/' + R1 + ' = −184/100 = −1.84 A</b>. The actual current flows from A to B, through ' + R2 + ' then ' + R1 + '.</li>' +
            '<li>The middle branch (' + R5 + ', ' + R4 + ', ' + R3 + ') is a simple series: ' + I2 + ' flows through ' + R3 + ' from C to B. The arrow ' + U3 + ' points to C, opposite to the current: receiver convention, ' + U3 + ' = ' + R3 + I2 + '. So <b>' + I2 + ' = ' + U3 + '/' + R3 + ' = 84/100 = 0.84 A</b>.</li>' +
            '<li>Kirchhoff’s current law at A: ' + I + ' and ' + I1 + ' come in, ' + I2 + ' goes out. ' + I + ' + ' + I1 + ' = ' + I2 + ', so <b>' + I + ' = ' + I2 + ' − ' + I1 + ' = 0.84 − (−1.84) = 2.68 A</b>.</li></ul>' +
            '<p>' + R2 + ', ' + R4 + ' and ' + R5 + ' are not given and are of no use: each branch is a series, so its current can be read on ' + R1 + ' or ' + R3 + '.</p>' }
      ],
      answer: '<p>A on the right, B on the left, F at the top in the middle, C between ' + R3 + ' and ' + R4 + ', D between ' + R4 + ' and ' + R5 + '.</p>' +
        '<p>' + U2 + ' = −56 V; ' + U3 + ' = 84 V; ' + U6 + ' = −100 V; ' + U7 + ' = −10 V.</p>' +
        '<p>' + I1 + ' = −1.84 A; ' + I2 + ' = 0.84 A; ' + I + ' = 2.68 A.</p>',
      traps: ['Placing A and B the wrong way round: the arrow ' + E + ' points to A, the + terminal.',
        'Taking the arrows ' + U6 + ' and ' + U7 + ' for wires or components: they are only voltages between two points.',
        'Getting a sign wrong in a loop: fix a direction of travel and compare each arrow with it.',
        'Believing that a voltage or a current cannot be negative: ' + U2 + ', ' + U6 + ', ' + U7 + ' and ' + I1 + ' are.',
        'Writing ' + U1 + ' = ' + R1 + I1 + ' whereas ' + U1 + ' and ' + I1 + ' point in the same direction (source convention): you need ' + U1 + ' = −' + R1 + I1 + '.',
        'Looking for the values of ' + R2 + ', ' + R4 + ' or ' + R5 + ': no need, you go through ' + R1 + ' and ' + R3 + '.']
    },

    /* ---------- Ex 4: dividers and real source ---------- */
    'p2020-ex4': {
      src: 'Midterm Nov. 2020 · Ex 4',
      title: 'Voltage and current dividers, real source',
      figs: [{ cap: 'Circuit 1 (question 1)' }, { cap: 'Circuit 2 (question 2)' }],
      questions: ['<b>1.</b> Consider the circuit opposite (circuit 1).<br>Find the expressions of the voltages ' + U1 + ' and ' + U2 + ' in terms of ' + E + ' and the resistances. Give your result with a single fraction bar (no fractions of fractions!)',
        '<b>2.</b> Consider the circuit opposite (circuit 2).<br><b>a.</b> Express ' + I1 + ' and ' + I2 + ' in terms of ' + I + ' and the resistances. Give your result with a single fraction bar (no fractions of fractions!)',
        '<b>b.</b> Give the expression of ' + I + ' in terms of ' + E + ' and the resistances. Give your result with a single fraction bar (no fractions of fractions!)',
        '<b>c.</b> <u>Numerical application</u>: Calculate the 2 currents ' + I1 + ' and ' + I2 + ' if ' + E + ' = 10 V, ' + r + ' = 1 Ω, ' + R1 + ' = ' + R2 + ' = ' + R3 + ' = 3 kΩ.'],
      hints: ['Question 1: the branch ' + R1 + ', ' + R2 + ' is connected directly across the ideal source. What does ' + R + ' change in this case?',
        'Question 2a: three resistors in parallel share ' + I + '. The current divider is simpler with the conductances <var>G</var> = 1/' + R + '.',
        'Question 2b: replace the three resistors by their equivalent, then write Kirchhoff’s voltage law in the only loop that remains.'],
      solution: [
        { t: 'Question 1',
          html: '<p>' + R1 + ' and ' + R2 + ' are in series: same current, no node between them. This branch is connected directly between the two terminals of ' + E + ': it has the voltage ' + E + ' across it.</p>' +
            '<p>' + R + ', also connected across the ideal source, does not change this voltage: it plays no part in ' + U1 + ' and ' + U2 + '. It only changes the current supplied by the source.</p>' +
            '<p>Voltage divider:</p>' +
            '<p class="f-block">' + U1 + ' = ' + fr(R1 + E, R1 + ' + ' + R2) + ' &nbsp; and &nbsp; ' + U2 + ' = ' + fr(R2 + E, R1 + ' + ' + R2) + '</p>' +
            '<p>Check: ' + U1 + ' + ' + U2 + ' = ' + E + '.</p>' +
            '<p class="sol-note">The official answer key writes “' + E + ': voltage across ' + R1 + ' + ' + R3 + '”: this is a slip of the pen for ' + R1 + ' + ' + R2 + ', and its final formulas are correct.</p>',
          figs: [{ cap: 'The branch ' + R1 + ', ' + R2 + ' is across ' + E + '; ' + R + ' plays no part' }] },
        { t: 'Question 2a',
          html: '<p>' + R1 + ', ' + R2 + ' and ' + R3 + ' all connect the top wire to the bottom wire: they are in parallel and share ' + I + '.</p>' +
            '<p>With three branches, write the current divider with the conductances <var>G</var> = 1/' + R + ':</p>' +
            '<p class="f-block">' + I1 + ' = ' + fr(v('G', 1) + I, v('G', 1) + ' + ' + v('G', 2) + ' + ' + v('G', 3)) + ' = ' + fr('1/' + R1, '1/' + R1 + ' + 1/' + R2 + ' + 1/' + R3) + '·' + I + '</p>' +
            '<p>To have a single fraction bar, multiply top and bottom by ' + R1 + R2 + R3 + ':</p>' +
            '<p class="f-block">' + I1 + ' = ' + fr(R2 + R3 + I, D20) + ' &nbsp; and likewise &nbsp; ' + I2 + ' = ' + fr(R1 + R3 + I, D20) + '</p>' },
        { t: 'Question 2b',
          html: '<p>The three resistors in parallel are replaced by ' + R123 + ', with 1/' + R123 + ' = 1/' + R1 + ' + 1/' + R2 + ' + 1/' + R3 + ':</p>' +
            '<p class="f-block">' + R123 + ' = ' + fr(R1 + R2 + R3, D20) + '</p>' +
            '<p>A single loop remains: ' + E + ', ' + r + ' and ' + R123 + ' in series. Kirchhoff’s voltage law: ' + E + ' − ' + r + I + ' − ' + R123 + I + ' = 0, so:</p>' +
            '<p class="f-block">' + I + ' = ' + fr(E, r + ' + ' + R123) + '</p>' +
            '<p>Multiply top and bottom by (' + D20 + ') to have a single fraction bar:</p>' +
            '<p class="f-block">' + I + ' = ' + fr('(' + D20 + ')' + E, r + '(' + D20 + ') + ' + R1 + R2 + R3) + '</p>',
          figs: [{ cap: 'Equivalent diagram: ' + E + ', ' + r + ' and ' + R123 + ' in series, voltage arrows in receiver convention' }] },
        { t: 'Question 2c',
          html: '<p>Combining a and b:</p><p class="f-block">' + I1 + ' = ' + fr(R2 + R3 + E, r + '(' + D20 + ') + ' + R1 + R2 + R3) + '</p>' +
            '<p>Without a calculator, reason on the circuit: three equal 3 kΩ resistors in parallel give ' + R123 + ' = 3/3 = 1 kΩ. ' + r + ' = 1 Ω is negligible compared with 1 kΩ, so ' + I + ' = 10/(1 + 1000) A ≈ 10 V/1 kΩ = 10 mA.</p>' +
            '<p>The three branches are identical, so they share ' + I + ' equally: <b>' + I1 + ' = ' + I2 + ' = ' + I + '/3 ≈ 3.33 mA</b> (exactly 10/3003 A).</p>' }
      ],
      answer: '<p class="f-block">' + U1 + ' = ' + fr(R1 + E, R1 + ' + ' + R2) + '; ' + U2 + ' = ' + fr(R2 + E, R1 + ' + ' + R2) + '</p>' +
        '<p class="f-block">' + I1 + ' = ' + fr(R2 + R3 + I, D20) + '; ' + I2 + ' = ' + fr(R1 + R3 + I, D20) + '</p>' +
        '<p class="f-block">' + I + ' = ' + fr('(' + D20 + ')' + E, r + '(' + D20 + ') + ' + R1 + R2 + R3) + '</p>' +
        '<p>Numerical application: ' + I1 + ' = ' + I2 + ' ≈ 3.33 mA.</p>',
      traps: ['Question 1: bringing ' + R + ' in. Connected to an ideal voltage source, it changes neither ' + U1 + ' nor ' + U2 + '.',
        'Question 2a: three-branch divider. In resistances, the numerator is the product of the two other resistances; going through the conductances avoids the mistake.',
        'Question 2b: forgetting ' + r + ', or putting it in parallel: it is in series with the source.',
        'Leaving a fraction of a fraction: the statement requires a single fraction bar.',
        'Question 2c: getting the unit wrong (volts divided by kΩ give mA) or not seeing that ' + r + ' is negligible compared with ' + R123 + '.']
    }
  };

  /* words drawn inside the diagrams and descriptions of the diagrams (aria), by French text */
  var LAB = { 'K_1 ouvert': 'K_1 open', 'K_1 fermé': 'K_1 closed', 'K_2 ouvert': 'K_2 open', 'K_2 fermé': 'K_2 closed',
    'fil': 'wire', 'éteinte': 'off', 'R_{éq} = 2RR′/(2R + R′)': 'R_{eq} = 2RR′/(2R + R′)' };
  var ARIA = {
    'Source de courant I, résistance R′, branche 2R puis R, et boucle de droite R, 3R, 2R ; U aux bornes de R′, U′ aux bornes de 3R':
      'Current source I, resistor R′, branch 2R then R, and right-hand loop R, 3R, 2R; U across R′, U′ across 3R',
    'Source I en parallèle avec R′, 3R et 6R':
      'Source I in parallel with R′, 3R and 6R',
    'Source I débitant dans la résistance équivalente':
      'Source I delivering into the equivalent resistance',
    'Source E ; R1 en parallèle avec l’interrupteur K1 ; R2 vers le fil du bas ; branche de droite K2 puis R3 ; flèches U1, U (aux bornes de K2) et U3':
      'Source E; R1 in parallel with the switch K1; R2 to the bottom wire; right branch K2 then R3; arrows U1, U (across K2) and U3',
    'Source E1 à gauche, R1 en haut avec la flèche I1 vers A, R3 entre A et B, source de courant I3 vers A à droite, R2 en bas':
      'Source E1 on the left, R1 at the top with the arrow I1 toward A, R3 between A and B, current source I3 toward A on the right, R2 at the bottom',
    'Réseau entre A et B : 4R, 2R et 4R du haut vers un nœud, puis R vers le rail du milieu ; 2R de A vers le rail du milieu ; trois 3R en parallèle vers B':
      'Network between A and B: 4R, 2R and 4R from the top to a node, then R to the middle rail; 2R from A to the middle rail; three 3R in parallel to B',
    'Trois étapes de réduction entre A et B':
      'Three reduction steps between A and B',
    'R3 sur le fil du haut, R4 en dessous reliée au fil du haut par un petit fil vertical, R2 à droite, R1 au milieu, source E sur le fil du bas fléchée vers la gauche':
      'R3 on the top wire, R4 below it connected to the top wire by a small vertical wire, R2 on the right, R1 in the middle, source E on the bottom wire with its arrow pointing left',
    'Circuit simplifié : E, R1 à ses bornes, puis R34 en série avec R2':
      'Simplified circuit: E, R1 across it, then R34 in series with R2',
    'Source de courant I ; R1 puis R3 au milieu ; R2 à droite ; K2 relie le point entre R1 et R3 au bas de R2 ; K1 sur le fil du bas, entre le pied de R3 et le fil de droite':
      'Current source I; R1 then R3 in the middle; R2 on the right; K2 connects the point between R1 and R3 to the bottom of R2; K1 on the bottom wire, between the foot of R3 and the right wire',
    'Réseau entre A et B : 4R et 2R du haut vers un nœud, puis R vers le rail du milieu ; deux 4R de A vers le rail du milieu ; trois 3R en parallèle vers B':
      'Network between A and B: 4R and 2R from the top to a node, then R to the middle rail; two 4R from A to the middle rail; three 3R in parallel to B',
    'Deux étapes de réduction entre A et B':
      'Two reduction steps between A and B',
    'Réseau entre A et B : colonne de gauche 2R, 4R puis R ; une 3R de A vers le point entre 4R et R ; deux 2R de A vers le nœud central ; du nœud central, 2R puis 4R vers B, et une 3R vers le point en bas à gauche, relié à B par un fil':
      'Network between A and B: left column 2R, 4R then R; a 3R from A to the point between 4R and R; two 2R from A to the central node; from the central node, 2R then 4R to B, and a 3R to the bottom-left point, connected to B by a wire',
    'Première réduction : 6R et 3R entre A et C, R entre C et B, R entre A et D, 6R et 3R entre D et B':
      'First reduction: 6R and 3R between A and C, R between C and B, R between A and D, 6R and 3R between D and B',
    'Deux chemins de 3R en parallèle entre A et B':
      'Two paths of 3R in parallel between A and B',
    'Branche du haut R1 puis R2, branche du milieu R3, R4, R5, source E sur le fil du bas ; cinq points à nommer ; flèches U1 à U7, I1, I2 et I':
      'Top branch R1 then R2, middle branch R3, R4, R5, source E on the bottom wire; five points to name; arrows U1 to U7, I1, I2 and I',
    'Source E, branche R1 puis R2 avec les flèches U1 et U2, résistance R à droite':
      'Source E, branch R1 then R2 with the arrows U1 and U2, resistor R on the right',
    'Source E en série avec r, puis R1, R2 et R3 en parallèle ; flèches I, I1 et I2':
      'Source E in series with r, then R1, R2 and R3 in parallel; arrows I, I1 and I2',
    'Une seule maille : E, r et R123 en série':
      'A single loop: E, r and R123 in series'
  };

  /* diagrams: English description (aria) and words drawn inside, added to the patch; the circuits are unchanged */
  function key(s) { return typeof s === 'string' ? s.replace(/\u00a0/g, ' ') : s; } /* the French file has non-breaking spaces before : and ; */
  function figText(frFigs, enFigs) {
    (frFigs || []).forEach(function (f, k) {
      var sp = f && f.spec, e = enFigs && enFigs[k];
      if (!sp || !e) return;
      var add = {};
      if (ARIA[key(sp.aria)]) add.aria = ARIA[key(sp.aria)];
      var parts = (sp.parts || []).map(function (p) { return p && LAB[key(p.s)] ? { s: LAB[key(p.s)] } : p && LAB[key(p.l)] ? { l: LAB[key(p.l)] } : null; });
      if (parts.some(function (p) { return p; })) add.parts = parts;
      if (add.aria || add.parts) e.spec = add;
    });
  }
  (window.ELEC_EX || []).forEach(function (ex) {
    var en = EN[ex.id];
    if (!en) return;
    figText(ex.figs, en.figs);
    (ex.solution || []).forEach(function (s, k) { if (en.solution && en.solution[k]) figText(s.figs, en.solution[k].figs); });
  });

  REV.i18n.patch(window.ELEC_EX, EN);
})();
