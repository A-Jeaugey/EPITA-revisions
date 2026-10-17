/* English text for data/elec/ex-p2023-2024.js (merged by id over the French file).
   Nov. 2023 questions: word for word from the official English paper. Oct. 2024: faithful translation. */
(function () {
  var R = '<var>R</var>', E = '<var class="u">E</var>', I = '<var class="i">I</var>', U = '<var class="u">U</var>';
  var Eth = '<var class="u">E</var><sub>th</sub>', Rth = '<var>R</var><sub>th</sub>';
  function rr(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function uu(n) { return '<var class="u">U</var><sub>' + n + '</sub>'; }
  function ii(n) { return '<var class="i">I</var><sub>' + n + '</sub>'; }
  function vv(n) { return '<var class="v">V</var><sub>' + n + '</sub>'; }
  var RI = R + I, UAB = uu('AB');

  REV.i18n.patch(window.ELEC_EX, {

    /* ================= Midterm Oct. 2024 ================= */
    'p2024-ex2': {
      src: 'Midterm Oct. 2024 · Ex 2',
      title: 'Fundamental laws: two sources, four resistors',
      intro: '<p>Consider the diagram on the right.</p><p>We set:<br>' + E + ' = 6 V, ' + UAB + ' = ' + vv('A') + ' − ' + vv('B') + ' = 4 V<br>' +
        ii(1) + ' = 10 mA, ' + ii(3) + ' = 2 mA, ' + ii(4) + ' = 7 mA<br>' + rr(2) + ' = 2 kΩ.</p>',
      figs: [{ cap: 'Exercise 2 circuit' }],
      questions: [
        '<b>1.</b> In this circuit, find the number of: <b>a.</b> Nodes? <b>b.</b> Branches? <b>c.</b> Loops?',
        '<b>2.</b> Draw the various voltages on the diagram using sign conventions. Note ' + uu('i') + ' for the voltage between the terminals of resistor ' + rr('i') + ' (i.e. ' + uu(1) + ' = voltage between ' + rr(1) + ' terminals, ' + uu(2) + ' = voltage between ' + rr(2) + ' terminals…)',
        '<b>3.</b> What is the value of resistor ' + rr(3) + '?',
        '<b>4.</b> Calculate the intensity of the current flowing through ' + rr(2) + '. Deduce the voltage between ' + rr(2) + ' terminals.',
        '<b>5.</b> Give the expression of the voltage ' + uu(4) + ' between ' + rr(4) + ' terminals, then give its value.'],
      hints: [
        'Find all the nodes, including the junctions without a dot. A continuous wire, however long, forms a single node.',
        'On a resistor, the voltage arrow is opposite to the current arrow (receiver convention). For ' + rr(3) + ', notice that ' + uu(3) + ' = ' + UAB + '.',
        'For ' + ii(2) + ', write Kirchhoff’s current law at B. For ' + uu(4) + ', look for a loop that contains only ' + E + ', ' + rr(3) + ' and ' + rr(4) + '.'],
      solution: [
        { t: 'Question 1', html: '<p>A node is a junction of at least three wires, with or without a drawn dot. There are <b>4</b>: A, B, the top-left junction (call it N) and the whole bottom wire (call it M).</p>' +
            '<p>A branch goes from one node to the next. There are <b>6</b>: 2' + E + ' (between N and M), ' + rr(1) + ' (N–A), ' + rr(2) + ' (N–B), ' + rr(3) + ' (A–B), ' + rr(4) + ' (B–M) and ' + E + ' (A–M).</p>' +
            '<p>A loop is a closed path. Counting them all, you find <b>7</b>:</p><ul>' +
            '<li>four loops of three branches: (2' + E + ', ' + rr(1) + ', ' + E + '), (2' + E + ', ' + rr(2) + ', ' + rr(4) + '), (' + E + ', ' + rr(3) + ', ' + rr(4) + '), (' + rr(1) + ', ' + rr(3) + ', ' + rr(2) + ');</li>' +
            '<li>three loops of four branches: (2' + E + ', ' + rr(1) + ', ' + rr(3) + ', ' + rr(4) + '), (2' + E + ', ' + rr(2) + ', ' + rr(3) + ', ' + E + '), (' + rr(1) + ', ' + E + ', ' + rr(4) + ', ' + rr(2) + ').</li></ul>' +
            '<p>Only 3 are independent (<var>b</var> − <var>n</var> + 1 = 6 − 4 + 1). The official 2023 answer key counts all the loops: answer 7, stating that 3 are independent.</p>',
          figs: [{ cap: 'The two nodes without a dot: N, the top-left junction, and M, the whole bottom wire. With A and B, that makes 4 nodes.' }] },
        { t: 'Question 2', html: '<p>The two sources already have their arrows, in source (generator) convention. For each resistor, use the receiver convention: the voltage arrow is drawn opposite to the current arrow.</p><ul>' +
            '<li>' + uu(1) + ': ' + ii(1) + ' goes to the right, so ' + uu(1) + ' points to the left, toward N: ' + uu(1) + ' = ' + vv('N') + ' − ' + vv('A') + '.</li>' +
            '<li>' + uu(2) + ': ' + ii(2) + ' is drawn to the left, so ' + uu(2) + ' points to the right, toward B: ' + uu(2) + ' = ' + vv('B') + ' − ' + vv('N') + '.</li>' +
            '<li>' + uu(3) + ': ' + ii(3) + ' goes down, so ' + uu(3) + ' points up, toward A: ' + uu(3) + ' = ' + vv('A') + ' − ' + vv('B') + ' = ' + UAB + '.</li>' +
            '<li>' + uu(4) + ': ' + ii(4) + ' goes down, so ' + uu(4) + ' points up, toward B: ' + uu(4) + ' = ' + vv('B') + ' − ' + vv('M') + '.</li></ul>',
          figs: [{ cap: 'Solution diagram: voltages in receiver convention.' }] },
        { t: 'Question 3', html: '<p>' + uu(3) + ' is drawn in receiver convention for ' + ii(3) + ', and ' + uu(3) + ' = ' + UAB + '. Ohm’s law: ' + UAB + ' = ' + rr(3) + '·' + ii(3) + '.</p>' +
            '<p>' + rr(3) + ' = ' + UAB + '/' + ii(3) + ' = 4 V / 2 mA = <b>2 kΩ</b>. Volts divided by milliamperes give kilohms.</p>' },
        { t: 'Question 4', html: '<p>Kirchhoff’s current law at B: ' + ii(3) + ' arrives; ' + ii(2) + ' (drawn toward N) and ' + ii(4) + ' leave. So ' + ii(3) + ' = ' + ii(2) + ' + ' + ii(4) + '.</p>' +
            '<p>' + ii(2) + ' = ' + ii(3) + ' − ' + ii(4) + ' = 2 − 7 = <b>−5 mA</b>. The magnitude of the current is 5 mA. The − sign means that the current actually flows from N to B, from left to right in ' + rr(2) + '.</p>' +
            '<p>' + uu(2) + ' is drawn in receiver convention for ' + ii(2) + ': ' + uu(2) + ' = ' + rr(2) + '·' + ii(2) + ' = 2 kΩ × (−5 mA) = <b>−10 V</b>. In other words, ' + vv('N') + ' − ' + vv('B') + ' = 10 V: the terminal on the N side is at the higher potential.</p>' },
        { t: 'Question 5', html: '<p>Kirchhoff’s voltage law on the loop (' + E + ', ' + rr(3) + ', ' + rr(4) + '), traveled from M to A, then B, then M: ' + E + ' − ' + uu(3) + ' − ' + uu(4) + ' = 0.</p>' +
            '<p>So <b>' + uu(4) + ' = ' + E + ' − ' + UAB + '</b> = 6 − 4 = <b>2 V</b>.</p>' +
            '<p>Check with the loop (2' + E + ', ' + rr(2) + ', ' + rr(4) + '): 2' + E + ' + ' + uu(2) + ' − ' + uu(4) + ' = 0, i.e. ' + uu(4) + ' = 12 − 10 = 2 V ✓.</p>' },
        { t: 'Going further', html: '<p>The previous answers are enough. Taking M as the reference, the potentials are ' + vv('N') + ' = 12 V, ' + vv('A') + ' = 6 V and ' + vv('B') + ' = 2 V. You can deduce:</p><ul>' +
            '<li>' + rr(1) + ' = (12 − 6) V / 10 mA = 600 Ω and ' + rr(4) + ' = 2 V / 7 mA ≈ 286 Ω;</li>' +
            '<li>at N: ' + I + ' = ' + ii(1) + ' − ' + ii(2) + ' = 10 − (−5) = 15 mA, supplied by 2' + E + ';</li>' +
            '<li>at A: <var class="i">I′</var> = ' + ii(3) + ' − ' + ii(1) + ' = −8 mA. The source ' + E + ' receives 8 mA: it works as a receiver.</li></ul>' +
            '<p>' + ii(1) + ' is only used for these checks.</p>' }],
      answer: '<p>1. 4 nodes, 6 branches, 7 loops (3 of them independent).<br>2. Receiver convention: ' + uu(1) + ' toward N, ' + uu(2) + ' toward B, ' + uu(3) + ' and ' + uu(4) + ' upward.<br>' +
        '3. ' + rr(3) + ' = 2 kΩ.<br>4. ' + ii(2) + ' = −5 mA (5 mA from N to B) and ' + uu(2) + ' = ' + rr(2) + '·' + ii(2) + ' = −10 V.<br>5. ' + uu(4) + ' = ' + E + ' − ' + UAB + ' = 2 V.</p>',
      traps: [
        'Forgetting the nodes without a dot: the top-left junction and the bottom wire are nodes.',
        'Drawing ' + uu(2) + ' in the same direction as ' + ii(2) + ': that is the source convention, not the one for a resistor.',
        'Writing ' + ii(2) + ' = ' + ii(3) + ' + ' + ii(4) + ' = 9 mA, or giving +5 mA without explaining the sign.',
        'Giving ' + uu(2) + ' = +10 V without specifying the direction of the arrow.',
        'Using 2' + E + ' instead of ' + E + ' in the loop for ' + uu(4) + ': 2' + E + ' − ' + UAB + ' = 8 V is wrong.',
        'Unit conversions: 4 V / 2 mA = 2 kΩ and 2 kΩ × 5 mA = 10 V.']
    },

    'p2024-ex3a': {
      src: 'Midterm Oct. 2024 · Ex 3 · Q1',
      title: 'Thévenin equivalent of a three-source circuit',
      intro: '<p>Consider the two diagrams below.</p>',
      figs: [{ cap: 'Left diagram' }, { cap: 'Right diagram' }],
      questions: [
        '<b>a.</b> Determine the expressions of ' + Eth + ' and ' + Rth + ' – justifying your answers with intermediate diagrams – so that the 2 diagrams above are equivalent.',
        '<b>b.</b> Deduce the expression of the voltage ' + U + ' between the terminals of resistor 2' + R + ' in terms of ' + E + ', ' + I + ' and ' + R + '.'],
      hints: [
        'Start by disconnecting the 2' + R + ' load: you are looking for the generator equivalent to everything to the left of A and B. Find the bottom-left wire (call it N): it is not B.',
        'The (2' + E + ', 4' + R + ') branch is between A and N: convert it to its Norton equivalent. Look carefully at the 2' + E + ' arrow: it points down.',
        'Group the current sources between A and N, convert back to Thévenin, then also convert the ' + R + ' // 2' + I + ' block (between N and B) to Thévenin. A single loop remains: add the emfs, taking their directions into account.'],
      solution: [
        { t: 'Question a: principle', html: '<p>Disconnect the 2' + R + ' load and look for the Thévenin generator equivalent to the left part, seen between A and B.</p>' +
            '<p>Call N the bottom-left wire, which connects the bottom of the source ' + I + ' and the bottom of the 4' + R + '. Careful: N is not B. The ' + R + ' // 2' + I + ' block sits between them, on the return wire.</p>',
          figs: [{ cap: 'Load disconnected. The (2E, 4R) branch, between A and N, is about to be transformed.' }] },
        { t: 'Step 1: Thévenin → Norton on (2E, 4R)', html: '<p>The branch (2' + E + ' in series with 4' + R + ') becomes a current source 2' + E + '/(4' + R + ') = <b>' + E + '/(2' + R + ')</b> in parallel with <b>4' + R + '</b>.</p>' +
            '<p>Direction: the 2' + E + ' arrow points down, so the + is on the 4' + R + ' side, the N side. The arrow of the Norton source also points down, toward N. The source ' + I + ', for its part, points up, toward A.</p>',
          figs: [{ cap: 'Intermediate diagram 1' }] },
        { t: 'Step 2: grouping the current sources', html: '<p>Between A and N, the two current sources are in parallel and point in opposite directions. Replace them with a single source pointing toward A: <b>' + I + ' − ' + E + '/(2' + R + ')</b>, still in parallel with 4' + R + '.</p>',
          figs: [{ cap: 'Intermediate diagram 2' }] },
        { t: 'Step 3: Norton → Thévenin, twice', html: '<p>Between A and N: the source ' + I + ' − ' + E + '/(2' + R + ') in parallel with 4' + R + ' becomes an emf 4' + R + '·(' + I + ' − ' + E + '/(2' + R + ')) = <b>4' + RI + ' − 2' + E + '</b>, pointing toward A, in series with 4' + R + '.</p>' +
            '<p>Between N and B: the ' + R + ' // 2' + I + ' block becomes an emf ' + R + '·2' + I + ' = <b>2' + RI + '</b> in series with ' + R + '. Its arrow points toward B, in the same direction as the arrow of the current 2' + I + '.</p>',
          figs: [{ cap: 'Intermediate diagram 3: everything is in series.' }] },
        { t: 'Step 4: series combination', html: '<p>Only one loop remains. From B to A, you go through the emf 2' + RI + ', pointing toward B (against the direction of travel), then the emf 4' + RI + ' − 2' + E + ', pointing toward A:</p>' +
            '<p>' + Eth + ' = (4' + RI + ' − 2' + E + ') − 2' + RI + ' = <b>2' + RI + ' − 2' + E + ' = 2(' + RI + ' − ' + E + ')</b>, arrow toward A.</p><p>' + Rth + ' = 4' + R + ' + ' + R + ' = <b>5' + R + '</b>.</p>',
          figs: [{ cap: 'Equivalent Thévenin generator' }] },
        { t: 'Question b', html: '<p>Reconnect the 2' + R + ' load to the Thévenin generator. Voltage divider:</p>' +
            '<p>' + U + ' = 2' + R + '/(' + Rth + ' + 2' + R + ') · ' + Eth + ' = (2' + R + '/7' + R + ') · 2(' + RI + ' − ' + E + '), i.e. <b>' + U + ' = 4(' + RI + ' − ' + E + ')/7</b>.</p>' +
            '<p>' + U + ' is algebraic: if ' + E + ' > ' + RI + ', ' + U + ' is negative.</p>' },
        { t: 'Checks', html: '<ul><li>' + Rth + ' by turning off the sources: ' + I + ' and 2' + I + ' become open circuits, 2' + E + ' a wire. What remains is 4' + R + ' (between A and N) in series with ' + R + ' (between N and B): 5' + R + ' ✓.</li>' +
            '<li>' + Eth + ' by superposition, with no load: ' + I + ' alone gives ' + vv('A') + ' − ' + vv('N') + ' = 4' + RI + '; 2' + E + ' alone drives no current and gives ' + vv('A') + ' − ' + vv('N') + ' = −2' + E + '; 2' + I + ' alone circulates inside the block and gives ' + vv('N') + ' − ' + vv('B') + ' = −2' + RI + '. Sum: 2' + RI + ' − 2' + E + ' ✓.</li>' +
            '<li>Dimensional check: ' + RI + ' and ' + E + ' are both voltages ✓.</li></ul>' }],
      answer: '<p>' + Eth + ' = 2(' + RI + ' − ' + E + ') = 2' + RI + ' − 2' + E + ' (arrow toward A) and ' + Rth + ' = 5' + R + '.</p><p>' + U + ' = 4(' + RI + ' − ' + E + ')/7.</p>',
      traps: [
        'Reading the 2' + E + ' arrow as “+ at the top”: you get ' + Eth + ' = 2' + RI + ' + 2' + E + ' and ' + U + ' = 4(' + RI + ' + ' + E + ')/7, which is wrong.',
        'Adding the emf 2' + RI + ' of the ' + R + ' // 2' + I + ' block instead of subtracting it: you get 6' + RI + ' − 2' + E + '.',
        'Keeping the 2' + R + ' load in the calculation of ' + Eth + ' or ' + Rth + '.',
        'For ' + Rth + ', replacing a current source with a wire instead of removing it (open circuit).',
        'Confusing N and B: the ' + R + ' // 2' + I + ' block is in series on the return wire.']
    },

    'p2024-ex3b': {
      src: 'Midterm Oct. 2024 · Ex 3 · Q2',
      title: '4R/4R divider and a current source: the voltage U',
      intro: '<p>Consider the diagram on the right.</p>',
      figs: [{ cap: 'Question 2 circuit' }],
      questions: ['<b>2.</b> Determine the expression of the voltage ' + U + ' in terms of ' + E + ', ' + I + ' and ' + R + '. You can use Thévenin/Norton equivalents. Justify your answer.'],
      hints: [
        'Start on the left: the source ' + E + ' and the first 4' + R + ' form a generator, loaded by the vertical 4' + R + '. Replace this set with its Thévenin equivalent seen across the vertical 4' + R + '.',
        'The two ' + R + ' (top and bottom) are in series with this generator. Once everything is in series, convert to Norton: you end up in parallel with 2' + R + ' and the source ' + I + '.',
        'The source ' + I + ' points down: it draws ' + I + ' from node A. Combine the current sources with their signs, then ' + U + ' = (equivalent resistance) × (total current).'],
      solution: [
        { t: 'Step 1: Thévenin equivalent of the (E, 4R, 4R) divider', html: '<p>Call N<sub>1</sub> and N<sub>2</sub> the two terminals of the vertical 4' + R + ' (N<sub>1</sub> at the top). Seen between N<sub>1</sub> and N<sub>2</sub>, the source ' + E + ' in series with 4' + R + ' and loaded by the vertical 4' + R + ' is a voltage divider:</p><ul>' +
            '<li>no-load voltage: ' + E + '·4' + R + '/(4' + R + ' + 4' + R + ') = <b>' + E + '/2</b>, arrow toward N<sub>1</sub>;</li>' +
            '<li>source turned off: 4' + R + ' // 4' + R + ' = <b>2' + R + '</b>.</li></ul>' +
            '<p>With Norton, you find the same thing: ' + E + '/(4' + R + ') in parallel with 4' + R + ' and 4' + R + ', i.e. ' + E + '/(4' + R + ') in parallel with 2' + R + ', which gives back 2' + R + ' × ' + E + '/(4' + R + ') = ' + E + '/2.</p>',
          figs: [{ cap: 'Intermediate diagram 1' }] },
        { t: 'Step 2: series combination', html: '<p>' + E + '/2, 2' + R + ', the top ' + R + ' and the bottom ' + R + ' carry the same current: they are in series. You get ' + E + '/2 in series with 2' + R + ' + ' + R + ' + ' + R + ' = <b>4' + R + '</b> between A and B, with the + on the A side.</p>',
          figs: [{ cap: 'Intermediate diagram 2' }] },
        { t: 'Step 3: Thévenin → Norton', html: '<p>The branch (' + E + '/2, 4' + R + ') becomes a current source (' + E + '/2)/(4' + R + ') = <b>' + E + '/(8' + R + ')</b> pointing toward A, in parallel with 4' + R + '. Everything is now in parallel between A and B: this source, 4' + R + ', the 2' + R + ' load and the source ' + I + '.</p>',
          figs: [{ cap: 'Intermediate diagram 3' }] },
        { t: 'Step 4: grouping', html: '<p>The source ' + I + ' points down: it draws ' + I + ' from node A. The two current sources combine into a single one, pointing toward A: <b>' + E + '/(8' + R + ') − ' + I + '</b>.</p>' +
            '<p>The resistors: 4' + R + ' // 2' + R + ' = 8' + R + '²/(6' + R + ') = <b>4' + R + '/3</b>.</p>',
          figs: [{ cap: 'Intermediate diagram 4' }] },
        { t: 'Result', html: '<p>' + U + ' = (4' + R + '/3)·(' + E + '/(8' + R + ') − ' + I + ') = ' + E + '/6 − 4' + RI + '/3, i.e. <b>' + U + ' = (' + E + ' − 8' + RI + ')/6</b>.</p>' },
        { t: 'Checks', html: '<ul><li>Millman at A, with B as the reference: ' + U + ' = ((' + E + '/2)/(4' + R + ') − ' + I + ')/(1/(4' + R + ') + 1/(2' + R + ')) = (' + E + '/(8' + R + ') − ' + I + ')·4' + R + '/3 ✓.</li>' +
            '<li>Superposition: ' + E + ' alone gives (' + E + '/2)·2' + R + '/(4' + R + ' + 2' + R + ') = ' + E + '/6; ' + I + ' alone gives −' + I + '·(2' + R + ' // 4' + R + ') = −4' + RI + '/3 ✓.</li>' +
            '<li>Thévenin seen by the 2' + R + ': 4' + R + '·(' + E + '/(8' + R + ') − ' + I + ') = ' + E + '/2 − 4' + RI + ' in series with 4' + R + ', then ' + U + ' = (' + E + '/2 − 4' + RI + ')·2' + R + '/(6' + R + ') ✓.</li></ul>' }],
      traps: [
        'Forgetting the ' + R + ' on the bottom wire: 3' + R + ' instead of 4' + R + ' gives (' + E + ' − 6' + RI + ')/5.',
        'Reversing the direction of ' + I + ': it draws current from A. With the wrong sign, you get (' + E + ' + 8' + RI + ')/6.',
        'Applying a “raw” voltage divider while a current source is connected between A and B.',
        '4' + R + ' // 4' + R + ' = 2' + R + ', not 8' + R + '.']
    },

    /* ================= Midterm Nov. 2023 ================= */
    'p2023-ex2': {
      src: 'Midterm Nov. 2023 · Ex 2',
      title: 'Fundamental laws: one source, five resistors',
      intro: '<p>Consider the diagram on the right.</p><p>We set: ' + E + ' = 12 V, ' + UAB + ' = ' + vv('A') + ' − ' + vv('B') + ' = 4 V, ' + ii(1) + ' = 10 mA, ' + rr(1) + ' = 470 Ω and ' + rr(2) + ' = 1 kΩ.</p>',
      figs: [{ cap: 'Exercise 2 circuit' }],
      questions: [
        '<b>1.</b> Draw the various voltages on the diagram using sign conventions. Note ' + uu('i') + ' for the voltage between the terminals of resistor ' + rr('i') + ' (i.e. ' + uu(1) + ' is the voltage between ' + rr(1) + ' terminals, ' + uu(2) + ' is the voltage between ' + rr(2) + ' terminals …)',
        '<b>2.</b> What is the intensity of the current flowing through ' + rr(5) + '?',
        '<b>3.</b> The intensity of the current flowing through ' + rr(4) + ' is 6 mA. Calculate the intensity of the current flowing through ' + rr(2) + '.',
        '<b>4.</b> Give the expression of the voltage between ' + rr(5) + ' terminals then calculate it.',
        '<b>5.</b> Establish the expression of voltage ' + uu(3) + ' between ' + rr(3) + ' terminals in terms of voltages ' + uu(2) + ' and ' + uu(4) + '. Given the fact that the voltage between ' + rr(4) + ' terminals is 1.2 V, give the value of the voltage between ' + rr(3) + ' terminals.'],
      hints: [
        'On each resistor, the voltage arrow points opposite to the current (receiver convention). The right edge is a plain wire: follow the current ' + ii(3) + ' down to ' + rr(4) + '.',
        rr(5) + ' is in the same branch as ' + E + ' and ' + rr(1) + '. For ' + rr(2) + ', there are two ways: Ohm’s law with ' + UAB + ', or Kirchhoff’s current law at A (' + rr(3) + ' and ' + rr(4) + ' are in series).',
        'For ' + uu(5) + ', write Kirchhoff’s voltage law on the big loop (' + E + ', ' + rr(1) + ', ' + rr(2) + ', ' + rr(5) + '). For ' + uu(3) + ', use the loop (' + rr(2) + ', ' + rr(3) + ', ' + rr(4) + ').'],
      solution: [
        { t: 'Question 1', html: '<p>Use the receiver convention on each resistor: the voltage arrow is opposite to the current. For ' + rr(4) + ' and ' + rr(5) + ', first find the direction of the current.</p><ul>' +
            '<li>' + uu(1) + ' points to the left, above ' + rr(1) + ': ' + ii(1) + ' goes to the right.</li>' +
            '<li>' + uu(2) + ' points up, along ' + rr(2) + ': ' + ii(2) + ' goes down. So ' + uu(2) + ' = ' + vv('A') + ' − ' + vv('B') + ' = ' + UAB + '.</li>' +
            '<li>' + uu(3) + ' points to the left, above ' + rr(3) + ': ' + ii(3) + ' goes to the right.</li>' +
            '<li>' + uu(4) + ' points to the right, below ' + rr(4) + ': the current ' + ii(3) + ' comes back down through the right-hand wire and flows through ' + rr(4) + ' from right to left, toward B.</li>' +
            '<li>' + uu(5) + ' points to the right, below ' + rr(5) + ': the current comes back from B toward the source and flows through ' + rr(5) + ' from right to left.</li></ul>',
          figs: [{ cap: 'Solution diagram (official answer key). The red arrows added next to ' + rr(4) + ' and ' + rr(5) + ' show the direction of the current.' }] },
        { t: 'Question 2', html: '<p>' + rr(5) + ' is in the same branch as ' + E + ' and ' + rr(1) + ': there is no node between them. The current that enters a dipole leaves it, so ' + rr(5) + ' carries ' + ii(1) + ' = <b>10 mA</b>.</p>' },
        { t: 'Question 3', html: '<p>Method 1, Ohm’s law: ' + uu(2) + ' = ' + UAB + ', so ' + ii(2) + ' = ' + UAB + '/' + rr(2) + ' = 4 V / 1 kΩ = <b>4 mA</b>.</p>' +
            '<p>Method 2, Kirchhoff’s current law: the right edge is a plain wire, so ' + rr(3) + ' and ' + rr(4) + ' are in series and ' + ii(3) + ' = 6 mA. At A: ' + ii(1) + ' = ' + ii(2) + ' + ' + ii(3) + ', i.e. ' + ii(2) + ' = 10 − 6 = <b>4 mA</b>.</p>' +
            '<p>Both methods agree: the data are consistent.</p>' },
        { t: 'Question 4', html: '<p>Kirchhoff’s voltage law on the loop (' + E + ', ' + rr(1) + ', ' + rr(2) + ', ' + rr(5) + '): ' + E + ' − ' + uu(1) + ' − ' + uu(2) + ' − ' + uu(5) + ' = 0, with ' + uu(1) + ' = ' + rr(1) + '·' + ii(1) + ' and ' + uu(2) + ' = ' + UAB + '.</p>' +
            '<p><b>' + uu(5) + ' = ' + E + ' − ' + rr(1) + '·' + ii(1) + ' − ' + UAB + '</b> = 12 − 470 × 0.01 − 4 = 12 − 4.7 − 4 = <b>3.3 V</b>.</p>' },
        { t: 'Question 5', html: '<p>Kirchhoff’s voltage law on the loop (' + rr(2) + ', ' + rr(3) + ', ' + rr(4) + '): ' + uu(2) + ' − ' + uu(3) + ' − ' + uu(4) + ' = 0, so <b>' + uu(3) + ' = ' + uu(2) + ' − ' + uu(4) + '</b>.</p>' +
            '<p>' + uu(3) + ' = ' + UAB + ' − ' + uu(4) + ' = 4 − 1.2 = <b>2.8 V</b>.</p>' },
        { t: 'Check', html: '<p>The data are consistent with each other. You can deduce ' + rr(5) + ' = 3.3 V / 10 mA = 330 Ω, ' + rr(4) + ' = 1.2 V / 6 mA = 200 Ω and ' + rr(3) + ' = 2.8 V / 6 mA ≈ 467 Ω.</p>' }],
      answer: '<p>1. Receiver convention: ' + uu(1) + ' and ' + uu(3) + ' to the left, ' + uu(2) + ' upward, ' + uu(4) + ' and ' + uu(5) + ' to the right.<br>2. ' + ii(1) + ' = 10 mA.<br>3. ' + ii(2) + ' = 4 mA.<br>' +
        '4. ' + uu(5) + ' = ' + E + ' − ' + rr(1) + '·' + ii(1) + ' − ' + UAB + ' = 3.3 V.<br>5. ' + uu(3) + ' = ' + uu(2) + ' − ' + uu(4) + ' = 2.8 V.</p>',
      traps: [
        'Drawing the resistor voltages in the direction of the current, as for a source.',
        'Not seeing that the right edge is a plain wire: ' + rr(3) + ' and ' + rr(4) + ' are in series and carry the same current.',
        'Forgetting that ' + rr(5) + ' carries ' + ii(1) + '.',
        'Powers of ten: 470 Ω × 10 mA = 4.7 V.',
        'Signs in Kirchhoff’s voltage law: an arrow in the direction of travel counts +, an arrow in the opposite direction counts −.']
    },

    'p2023-ex3a': {
      src: 'Midterm Nov. 2023 · Ex 3 · Q1',
      title: 'Four branches between A and B: Thévenin, then U',
      intro: '<p>Consider the two diagrams below.</p>',
      figs: [{ cap: 'Left diagram' }, { cap: 'Right diagram' }],
      questions: [
        '<b>a.</b> On the left diagram, find the number of: <b>a.</b> Nodes? <b>b.</b> Branches? <b>c.</b> Loops?',
        '<b>b.</b> Set the expressions of ' + Eth + ' and ' + Rth + ' so as the 2 diagrams above are equivalents.',
        '<b>c.</b> Deduce the expression of the voltage ' + U + ' between the terminals of resistor 2' + R + ' in terms of ' + E + ', ' + I + ' and ' + R + '.'],
      hints: [
        'A node connects at least three wires, and a continuous wire forms a single node, even if it carries several dots. For ' + Eth + ' and ' + Rth + ', first disconnect the 2' + R + ' load.',
        'On the right, ' + R + ', ' + E + ' and ' + R + ' are on the same path, with no node between them: it is a single branch, equivalent to ' + E + ' in series with 2' + R + '.',
        'Convert each (' + E + ', 2' + R + ') branch to its Norton equivalent: everything ends up in parallel between A and B. Add the current sources, combine the resistors, then convert back to Thévenin.'],
      solution: [
        { t: 'Question a', html: '<p><b>2 nodes</b>: A, which is the whole top wire, and B, the whole bottom wire.</p>' +
            '<p><b>4 branches</b>, all between A and B: the source ' + I + '; 2' + R + ' and ' + E + '; the 2' + R + ' load; ' + R + ', ' + E + ' and ' + R + '. Several dipoles in series with no node between them form a single branch.</p>' +
            '<p><b>6 loops</b>: each pair of branches forms a loop, and there are 4 × 3 / 2 = 6 pairs. The official answer key counts all these loops. Only 3 are independent (<var>b</var> − <var>n</var> + 1 = 4 − 2 + 1).</p>',
          figs: [{ cap: 'The 2 nodes: the whole top wire (A) and the whole bottom wire (B).' }] },
        { t: 'Question b: disconnect the load', html: '<p>Disconnect the 2' + R + ' load and look for the equivalent generator seen between A and B. In the right-hand branch, ' + R + ', ' + E + ' and ' + R + ' are in series: it is ' + E + ' in series with 2' + R + ', with the + on the A side, as in the left-hand branch.</p>',
          figs: [{ cap: 'Load disconnected. Both (E, 2R) branches are about to be transformed.' }] },
        { t: 'Step 1: Thévenin → Norton', html: '<p>Each branch (' + E + ' in series with 2' + R + ') becomes a current source <b>' + E + '/(2' + R + ')</b> in parallel with <b>2' + R + '</b>. The + of each source ' + E + ' is on the A side: the Norton arrows point toward A. Everything is now in parallel between A and B.</p>',
          figs: [{ cap: 'Intermediate diagram 1' }] },
        { t: 'Step 2: grouping', html: '<p>Current sources in parallel, all pointing toward A: ' + I + ' + ' + E + '/(2' + R + ') + ' + E + '/(2' + R + ') = <b>' + I + ' + ' + E + '/' + R + '</b>. Resistors: 2' + R + ' // 2' + R + ' = <b>' + R + '</b> (without the load).</p>',
          figs: [{ cap: 'Intermediate diagram 2: Norton generator' }] },
        { t: 'Step 3: Norton → Thévenin', html: '<p>' + Eth + ' = ' + R + '·(' + I + ' + ' + E + '/' + R + ') = <b>' + RI + ' + ' + E + '</b> and <b>' + Rth + ' = ' + R + '</b>.</p>',
          figs: [{ cap: 'Equivalent Thévenin generator' }] },
        { t: 'Question c', html: '<p>Reconnect the 2' + R + ' load. Voltage divider: ' + U + ' = 2' + R + '/(' + R + ' + 2' + R + ') × (' + RI + ' + ' + E + '), i.e. <b>' + U + ' = 2(' + RI + ' + ' + E + ')/3</b>.</p>' },
        { t: 'Checks', html: '<ul><li>' + Rth + ' by turning off the sources: ' + I + ' becomes an open circuit, both ' + E + ' become wires. What remains is 2' + R + ' in parallel with ' + R + ' + ' + R + ', i.e. 2' + R + ' // 2' + R + ' = ' + R + ' ✓.</li>' +
            '<li>Millman at A, load disconnected: ' + Eth + ' = (' + I + ' + ' + E + '/(2' + R + ') + ' + E + '/(2' + R + '))/(1/(2' + R + ') + 1/(2' + R + ')) = ' + R + '·(' + I + ' + ' + E + '/' + R + ') = ' + RI + ' + ' + E + ' ✓.</li>' +
            '<li>Dimensional check: ' + RI + ' and ' + E + ' are both voltages ✓.</li></ul>' }],
      answer: '<p>a. 2 nodes, 4 branches, 6 loops (3 of them independent).<br>b. ' + Eth + ' = ' + RI + ' + ' + E + ' and ' + Rth + ' = ' + R + '.<br>c. ' + U + ' = 2(' + RI + ' + ' + E + ')/3.</p>',
      traps: [
        'Counting ' + R + ', ' + E + ' and ' + R + ' as three branches: there is no node between these dipoles.',
        'Answering 3 loops (the independent ones) when the answer key expects 6.',
        'Leaving the 2' + R + ' load in the calculation of ' + Eth + ' and ' + Rth + '.',
        'Forgetting that the two ' + R + ' of the right-hand branch, separated by ' + E + ', are in series.',
        'Drawing a Norton source pointing toward the − terminal: its arrow points toward the + terminal of the emf.']
    },

    'p2023-ex3b': {
      src: 'Midterm Nov. 2023 · Ex 3 · Q2',
      title: 'Two current sources and an I // R block',
      intro: '<p>Consider the diagram on the right.</p>',
      figs: [{ cap: 'Question 2 circuit' }],
      questions: ['<b>2.</b> Calculate the voltage ' + U + ' in terms of ' + E + ', ' + I + ' and ' + R + '. You can use Thévenin/Norton equivalents.'],
      hints: [
        'Start on the left: the source 2' + E + ' in series with 6' + R + ' converts to a Norton equivalent. The rest does not change.',
        'Group what is in parallel between N<sub>1</sub> (the node just after the top 6' + R + ') and B: two current sources and two 6' + R + '.',
        'The “' + I + ' in parallel with ' + R + '” block is in series on the top line: replace it with an emf ' + RI + ' pointing toward A, in series with ' + R + '. Everything is then in series: voltage divider on 2' + R + '.'],
      solution: [
        { t: 'Step 1: Thévenin → Norton', html: '<p>Call N<sub>1</sub> the node just after the top 6' + R + '. The generator (2' + E + ', 6' + R + ') becomes a current source 2' + E + '/(6' + R + ') = <b>' + E + '/(3' + R + ')</b>, pointing up (toward N<sub>1</sub>), in parallel with <b>6' + R + '</b>.</p>' +
            '<p>The rest does not change: the vertical source ' + I + ', the vertical 6' + R + ', the ' + I + ' // ' + R + ' block and the 2' + R + ' load.</p>',
          figs: [{ cap: 'Intermediate diagram 1' }] },
        { t: 'Step 2: grouping', html: '<p>Between N<sub>1</sub> and B, both current sources point toward N<sub>1</sub>: they add up, <b>' + E + '/(3' + R + ') + ' + I + '</b>. The two 6' + R + ' in parallel give 6' + R + ' // 6' + R + ' = <b>3' + R + '</b>.</p>',
          figs: [{ cap: 'Intermediate diagram 2' }] },
        { t: 'Step 3: Norton → Thévenin, twice', html: '<p>Between N<sub>1</sub> and B: emf 3' + R + '·(' + E + '/(3' + R + ') + ' + I + ') = <b>' + E + ' + 3' + RI + '</b>, pointing toward N<sub>1</sub>, in series with 3' + R + '.</p>' +
            '<p>Between N<sub>1</sub> and A: the ' + I + ' // ' + R + ' block becomes an emf <b>' + RI + '</b> pointing toward A, in the direction of the arrow of ' + I + ', in series with ' + R + '.</p>',
          figs: [{ cap: 'Intermediate diagram 3: everything is in series.' }] },
        { t: 'Step 4: series combination', html: '<p>From B to A, both emfs point in the direction of travel: they add up. ' + E + ' + 3' + RI + ' + ' + RI + ' = <b>' + E + ' + 4' + RI + '</b>, and 3' + R + ' + ' + R + ' = <b>4' + R + '</b>.</p>',
          figs: [{ cap: 'Intermediate diagram 4: Thévenin generator seen by the load' }] },
        { t: 'Result', html: '<p>Voltage divider: ' + U + ' = 2' + R + '/(2' + R + ' + 4' + R + ') × (' + E + ' + 4' + RI + '), i.e. <b>' + U + ' = (' + E + ' + 4' + RI + ')/3</b>.</p>' },
        { t: 'Checks', html: '<ul><li>Resistance seen by the 2' + R + ', sources turned off (2' + E + ' becomes a wire, the ' + I + ' sources open circuits): (6' + R + ' // 6' + R + ') + ' + R + ' = 4' + R + ' ✓.</li>' +
            '<li>Superposition: 2' + E + ' alone gives ' + E + '/3; the vertical source ' + I + ' alone gives ' + RI + '; the source ' + I + ' of the block alone gives ' + RI + '/3. Sum: (' + E + ' + 4' + RI + ')/3 ✓.</li></ul>' }],
      answer: '<p>' + U + ' = (' + E + ' + 4' + RI + ')/3. Seen by the 2' + R + ', the Thévenin generator is ' + E + ' + 4' + RI + ' in series with 4' + R + '.</p>',
      traps: [
        '6' + R + ' // 6' + R + ' = 3' + R + ', not 12' + R + '.',
        'Not converting the ' + I + ' // ' + R + ' block placed in series on the line, or getting the sign of ' + RI + ' wrong.',
        'Forgetting the ' + R + ' of the block in the total resistance: 3' + R + ' instead of 4' + R + '.',
        'Wrong direction for a Norton source: its arrow points toward the + terminal of the emf.']
    }
  });
})();
