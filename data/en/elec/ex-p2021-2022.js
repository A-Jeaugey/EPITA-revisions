/* English text for data/elec/ex-p2021-2022.js (merged by id over the French file).
   Nov. 2021 questions: word for word from the official English paper. Oct. 2022: faithful translation. */
(function () {
  var R = '<var>R</var>', E = '<var class="u">E</var>', Rp = '<var>R</var>′';
  function u(k) { return '<var class="u">U</var>' + (k ? '<sub>' + k + '</sub>' : ''); }
  function cur(k) { return '<var class="i">I</var>' + (k ? '<sub>' + k + '</sub>' : ''); }
  function rk(k) { return '<var>R</var><sub>' + k + '</sub>'; }
  function frac(n, d) { return '<span class="frac"><span>' + n + '</span><span>' + d + '</span></span>'; }
  var VB = '<var class="v">V</var><sub>B</sub>', VC = '<var class="v">V</var><sub>C</sub>', VD = '<var class="v">V</var><sub>D</sub>', VF = '<var class="v">V</var><sub>F</sub>';

  REV.i18n.patch(window.ELEC_EX, {

    /* ---------- Midterm Nov. 2021 · Ex 2 · Q1 ---------- */
    'p2021-ex2a': {
      src: 'Midterm Nov. 2021 · Ex 2 · Q1',
      title: 'Equivalent resistance of an eight-resistor network',
      questions: ['<b>1.</b> What is the equivalent resistance seen from points A and B? (Detail your calculations)'],
      hints: [
        'Give a name to the two unnamed nodes on the A–B line, then follow each wire to its end. Where does the wire of the 3' + R + ' arrive? Where does the wire of the bottom 2' + R + ' go back up to?',
        'Look for resistors connected between the same two nodes: they are in parallel. The top branch, for its part, goes directly from A to B.',
        'Reduce step by step toward the node where the 3' + R + ' arrives: parallel, series, parallel. Finish with the parallel combination with the top branch.'],
      solution: [
        { t: 'Reading the diagram', html: '<p>Call <b>C</b> the node between the two 2' + R + ' on the A–B line and <b>D</b> the next node, before the first 4' + R + '. Then follow each wire to its end:</p>' +
          '<ul><li>the 3' + R + ' starts at A and its wire comes back down to <b>D</b>, not to B;</li>' +
          '<li>the bottom 2' + R + ' starts at A and its wire goes back up to <b>C</b>;</li>' +
          '<li>the bottom 4' + R + ' starts at D and reaches B through the vertical wire on the right;</li>' +
          '<li>the top branch, 2' + R + ' then ' + R + ', connects A and B directly.</li></ul>',
          figs: [{ cap: 'The network with its nodes named' }] },
        { t: 'Step 1: the obvious groupings', html: '<ul>' +
          '<li>The two 2' + R + ' connect A and C: they are in parallel. 2' + R + ' // 2' + R + ' = ' + R + ' (two equal resistors in parallel: half the value).</li>' +
          '<li>The two 4' + R + ' connect D and B: parallel. 4' + R + ' // 4' + R + ' = 2' + R + '.</li>' +
          '<li>At the top, 2' + R + ' and ' + R + ' follow each other with no node between them: series. 2' + R + ' + ' + R + ' = 3' + R + ', connected from A to B.</li></ul>',
          figs: [{ cap: 'Intermediate diagram 1 (in color, what has just been grouped)' }] },
        { t: 'Step 2: from A to D', html: '<p>On the line, ' + R + ' (from A to C) then 2' + R + ' (from C to D) are in series: 3' + R + ' from A to D. This branch is in parallel with the 3' + R + ' that also goes from A to D:</p>' +
          '<p class="f-block">3' + R + ' // 3' + R + ' = ' + frac('3' + R, '2') + '</p>',
          figs: [{ cap: 'Intermediate diagram 2' }] },
        { t: 'Step 3: the series, then the top branch', html: '<p>From A to B along the line: 3' + R + '/2 then 2' + R + ' in series, i.e. 3' + R + '/2 + 4' + R + '/2 = 7' + R + '/2. This branch is in parallel with the top branch, 3' + R + ':</p>' +
          '<p class="f-block">' + rk('AB') + ' = ' + frac('(7' + R + '/2) × 3' + R, '7' + R + '/2 + 3' + R) + ' = ' + frac('7' + R + ' × 3' + R, '7' + R + ' + 6' + R) + ' = ' + frac('21' + R + '²', '13' + R) + ' = ' + frac('21', '13') + R + '</p>' +
          '<p>To go from the first fraction to the second, multiply the numerator and the denominator by 2. Check: 21' + R + '/13 ≈ 1.6' + R + ' is smaller than 3' + R + ', the top branch alone. That is expected: adding a branch in parallel always lowers the resistance.</p>',
          figs: [{ cap: 'Intermediate diagram 3: two branches in parallel between A and B' }] }],
      answer: '<p>' + rk('AB') + ' = 21' + R + '/13 ≈ 1.6' + R + '</p>',
      traps: [
        'Thinking the 3' + R + ' goes all the way to B: its wire comes back down to node D, between the second 2' + R + ' and the first 4' + R + '.',
        'Thinking the bottom 2' + R + ' reaches D: it goes back up to C, in parallel with the first 2' + R + '.',
        'Forgetting the top branch (2' + R + ' + ' + R + ' = 3' + R + '): it connects A and B directly and goes in parallel with everything else, at the very end.',
        'Adding before grouping the parallel resistors, or getting 7' + R + '/2 // 3' + R + ' wrong: multiply the numerator and the denominator by 2 to get rid of the halves.']
    },

    /* ---------- Midterm Nov. 2021 · Ex 2 · Q2 ---------- */
    'p2021-ex2b': {
      src: 'Midterm Nov. 2021 · Ex 2 · Q2',
      title: 'Find R′ so that the source sees R',
      questions: ['<b>2.</b> What must be ' + Rp + ' value so that the equivalent resistance seen from the voltage source ' + E + ' is equal to ' + R + '? You will give your answer as a function of ' + R + '.'],
      hints: [
        'Follow the vertical wire on the right: where does the other terminal of the top-right ' + R + ' end up?',
        'This ' + R + ' is in parallel with the ' + R + ' + ' + Rp + ' branch, and this block is in series with ' + R + '/3.',
        'Write ' + rk('eq') + ' as a function of ' + Rp + ', then set ' + rk('eq') + ' = ' + R + ': the parallel block must equal ' + R + ' − ' + R + '/3. Finish by cross-multiplying.'],
      solution: [
        { t: 'Reading the diagram', html: '<p>Follow the vertical wire on the right: it goes down to the bottom wire without any component. So the top-right ' + R + ' connects the top node (the point where the middle branch starts) to the bottom wire, exactly like the middle branch.</p>' +
          '<ul><li>' + R + ' and ' + Rp + ' follow each other with no node between them: series, ' + R + ' + ' + Rp + '.</li>' +
          '<li>This branch and the right-hand ' + R + ' connect the same two nodes: parallel.</li>' +
          '<li>The whole block is in series with ' + R + '/3, between the two terminals of ' + E + '.</li></ul>',
          figs: [{ cap: 'Same circuit: the right-hand ' + R + ' redrawn on the vertical wire; the nodes are unchanged' }] },
        { t: 'Resistance seen by E',
          figs: [{ cap: 'Two branches in parallel, in series with ' + R + '/3' }] },
        { t: 'Setting the resistance seen equal to R', html: '<p>You want ' + rk('eq') + ' = ' + R + ': the parallel block must equal ' + R + ' − ' + R + '/3 = 2' + R + '/3.</p>' +
          '<p class="f-block">' + frac(R + '(' + R + ' + ' + Rp + ')', '2' + R + ' + ' + Rp) + ' = ' + frac('2' + R, '3') + '</p>' +
          '<p>Divide both sides by ' + R + ' and cross-multiply: 3(' + R + ' + ' + Rp + ') = 2(2' + R + ' + ' + Rp + '), i.e. 3' + R + ' + 3' + Rp + ' = 4' + R + ' + 2' + Rp + '. Therefore:</p>' +
          '<p class="f-block"><b>' + Rp + ' = ' + R + '</b></p>' +
          '<p>Check: ' + R + ' + ' + R + ' = 2' + R + '; 2' + R + ' // ' + R + ' = 2' + R + '²/(3' + R + ') = 2' + R + '/3; 2' + R + '/3 + ' + R + '/3 = ' + R + '. You do get ' + R + ' back.</p>' }],
      traps: [
        'Not seeing that the top-right ' + R + ' comes back to the bottom wire through the vertical wire on the right: it is in parallel with the ' + R + ' + ' + Rp + ' branch, not in series.',
        'Putting ' + Rp + ' in parallel with the vertical ' + R + ': they are in the same branch, with no node between them, so they are in series.',
        'Forgetting ' + R + '/3, which is in series with everything else.',
        'Making a mistake when cross-multiplying: 3(' + R + ' + ' + Rp + ') = 2(2' + R + ' + ' + Rp + ').']
    },

    /* ---------- Midterm Nov. 2021 · Ex 3 ---------- */
    'p2021-ex3': {
      src: 'Midterm Nov. 2021 · Ex 3',
      title: 'Parallel resistors, voltage divider and supplied current',
      intro: '<p>Consider the circuit opposite.</p>',
      questions: [
        '<b>1. a.</b> What can be said about the 2' + R + ' and 4' + R + ' resistances?',
        '<b>1. b.</b> What is the equivalent resistance of these two resistances?',
        '<b>1. c.</b> Deduce the expression of voltage ' + u() + ' as a function of ' + E + ' and ' + R + '.',
        '<b>2. a.</b> What is the equivalent resistance seen by the voltage source ' + E + '?',
        '<b>2. b.</b> Deduce the expression of current ' + cur() + ' as a function of ' + E + ' and ' + R + '.'],
      hints: [
        'Look at where the two wires of the 2' + R + ' arrive: between which points is it connected? And the 4' + R + '?',
        'The top branch (' + R + ' then the 2' + R + ' // 4' + R + ' block) is connected directly across the ideal source: its voltage is ' + E + ', whatever is next to it. Apply the voltage divider to this branch alone.',
        'The arrow ' + cur() + ' is below the point where the 3' + R + ' connects: it is the whole current supplied by ' + E + '. Compute the resistance seen by the source, then apply Ohm’s law.'],
      solution: [
        { t: 'Question 1a', html: '<p>The wire of the 2' + R + ' starts at the point between ' + R + ' and 4' + R + ' and comes back down to the top-right corner. The 4' + R + ' connects these same two points. Both resistors are connected between the same two nodes: they are <b>in parallel</b>.</p>' },
        { t: 'Question 1b' },
        { t: 'Question 1c', html: '<p>Replace the two resistors with 4' + R + '/3. The top branch, ' + R + ' then 4' + R + '/3 in series, is connected directly between the two terminals of the ideal source: Kirchhoff’s voltage law forces its voltage to be ' + E + '. The 3' + R + ', which is also across ' + E + ', does not change this voltage.</p>' +
          '<p>Voltage divider on the top branch:</p>' +
          '<p class="f-block">' + u() + ' = ' + frac(R, R + ' + 4' + R + '/3') + ' · ' + E + ' = ' + frac(R, '7' + R + '/3') + ' · ' + E + ' = ' + frac('3', '7') + E + '</p>' +
          '<p>Sign: ' + u() + ' and ' + E + ' both point to the left, toward the + terminal of the source. The current flows through ' + R + ' from left to right, opposite to the arrow ' + u() + ' (receiver convention): ' + u() + ' is positive.</p>',
          figs: [{ cap: 'Equivalent diagram: 2' + R + ' // 4' + R + ' replaced by 4' + R + '/3' }] },
        { t: 'Question 2a', html: '<p>The source sees two branches in parallel: the 3' + R + ' and the top branch, ' + R + ' + 4' + R + '/3 = 7' + R + '/3.</p>' +
          '<p class="f-block">' + rk('eq') + ' = ' + frac('3' + R + ' × 7' + R + '/3', '3' + R + ' + 7' + R + '/3') + ' = ' + frac('7' + R + '²', '16' + R + '/3') + ' = ' + frac('21', '16') + R + '</p>' +
          '<p>Check: 21' + R + '/16 ≈ 1.3' + R + ', smaller than 7' + R + '/3 ≈ 2.3' + R + ' and than 3' + R + ', as for any parallel combination.</p>' },
        { t: 'Question 2b', html: '<p>With ' + rk('eq') + ' alone across the source, Kirchhoff’s voltage law gives ' + u('eq') + ' = ' + E + ', and Ohm’s law ' + u('eq') + ' = ' + rk('eq') + '·' + cur() + ':</p>' +
          '<p class="f-block">' + cur() + ' = ' + frac(E, rk('eq')) + ' = ' + frac('16', '21') + '·' + frac(E, R) + '</p>' +
          '<p>Check with Kirchhoff’s current law: ' + cur() + ' is the sum of the currents in the two branches, ' + E + '/(3' + R + ') + ' + E + '/(7' + R + '/3) = ' + E + '/(3' + R + ') + 3' + E + '/(7' + R + ') = (7' + E + ' + 9' + E + ')/(21' + R + ') = 16' + E + '/(21' + R + ').</p>',
          figs: [{ cap: 'The source now sees only ' + rk('eq') }] }],
      answer: '<p><b>1.</b> a. 2' + R + ' and 4' + R + ' are in parallel; b. 2' + R + ' // 4' + R + ' = 4' + R + '/3; c. ' + u() + ' = 3' + E + '/7.<br>' +
        '<b>2.</b> a. ' + rk('eq') + ' = 21' + R + '/16; b. ' + cur() + ' = 16' + E + '/(21' + R + ').</p>',
      traps: [
        'Including the 3' + R + ' in the voltage divider: the ideal source forces ' + E + ' across every branch connected to its terminals, so the 3' + R + ' does not change ' + u() + '.',
        'Taking ' + cur() + ' as the current in the 3' + R + ' alone: the arrow is below the point where the 3' + R + ' connects, so it is the total current supplied by ' + E + '.',
        'Getting the sign of ' + u() + ' wrong: ' + u() + ' and ' + E + ' both point toward the + terminal of the source, so ' + u() + ' > 0.',
        'Reducing ' + R + ' + 4' + R + '/3 incorrectly: it is 3' + R + '/3 + 4' + R + '/3 = 7' + R + '/3.']
    },

    /* ---------- Midterm Oct. 2022 · Ex 2 ---------- */
    'p2022-ex2': {
      src: 'Midterm Oct. 2022 · Ex 2',
      title: 'Equivalent resistance: three paths to the central node',
      questions: ['What is the total equivalent resistance seen from points A and B? (Detail your reasoning – imagine that the current “enters” at point A and “leaves” at B)'],
      hints: [
        'Call C the node between the first two 2' + R + ' on the line and D the next node. A T-junction without a black dot is still a connection: which node do the 3' + R + ' and the bottom branch reach?',
        'The top 2' + R + ' connects C and D, like the 2' + R + ' just below it. The two 4' + R + ' connect D and B.',
        'Between A and D, you should end up with several branches of the same value: <var>n</var> equal resistors in parallel are worth the value of one of them divided by <var>n</var>.'],
      solution: [
        { t: 'Reading the diagram', html: '<p>Call <b>C</b> the node between the first and the second 2' + R + ' on the A–B line, and <b>D</b> the next node, before the first 4' + R + '. The vertical wire through D goes down to the bottom row. The T-junctions without a black dot are real connections:</p>' +
          '<ul><li>the top 2' + R + ' starts at C and comes back down to D;</li>' +
          '<li>the 3' + R + ' goes from A to the vertical wire of D;</li>' +
          '<li>the bottom branch, 2' + R + ' then ' + R + ', goes from A to the foot of the vertical wire of D;</li>' +
          '<li>the bottom 4' + R + ' starts from that same point, hence from D, and goes back up to B.</li></ul>',
          figs: [{ cap: 'The network with its nodes named (dots added on the T-junctions)' }] },
        { t: 'Step 1: one parallel, one series', html: '<ul>' +
          '<li>The two 2' + R + ' between C and D are in parallel: 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
          '<li>At the bottom, 2' + R + ' and ' + R + ' follow each other with no node between them: series, 2' + R + ' + ' + R + ' = 3' + R + '.</li></ul>' +
          '<p>Between A and D there are now three paths: 2' + R + ' then ' + R + ' along the line, the middle 3' + R + ' and the bottom 3' + R + '.</p>',
          figs: [{ cap: 'Intermediate diagram 1 (in color, what has just been grouped)' }] },
        { t: 'Step 2: three 3R branches', html: '<p>On the line, 2' + R + ' (from A to C) then ' + R + ' (from C to D) are in series: 3' + R + '. So there are three 3' + R + ' branches in parallel between A and D:</p>' +
          '<p class="f-block">3' + R + ' // 3' + R + ' // 3' + R + ' = ' + frac('3' + R, '3') + ' = ' + R + '</p>' +
          '<p><var>n</var> equal resistors in parallel: the value of one of them divided by <var>n</var>.</p>',
          figs: [{ cap: 'Intermediate diagram 2: three 3' + R + ' between A and D, two 4' + R + ' between D and B' }] },
        { t: 'Step 3: the end', html: '<p>The two 4' + R + ' between D and B are in parallel: 4' + R + ' // 4' + R + ' = 2' + R + '. What remains is ' + R + ' (from A to D) then 2' + R + ' (from D to B), in series:</p>' +
          '<p class="f-block">' + rk('AB') + ' = ' + R + ' + 2' + R + ' = 3' + R + '</p>',
          figs: [{ cap: 'Intermediate diagram 3' }] }],
      traps: [
        'Not seeing that the T-junctions without a black dot, at the end of the 3' + R + ' and at the end of the bottom branch, are connected to node D.',
        'Thinking the top 2' + R + ' is in parallel with the first 2' + R + ' (from A to C): it connects C and D.',
        'Treating the bottom 2' + R + ' and ' + R + ' as a parallel combination: there is no node between them, so they are in series.',
        'Forgetting that three equal 3' + R + ' resistors in parallel are worth 3' + R + '/3 = ' + R + '.']
    },

    /* ---------- Midterm Oct. 2022 · Ex 3 ---------- */
    'p2022-ex3': {
      src: 'Midterm Oct. 2022 · Ex 3',
      title: 'Nodes, loops and Kirchhoff’s laws with imposed arrows',
      intro: '<p>Consider the circuit opposite.</p><p>We set:</p><ul>' +
        '<li>' + u('1') + ' = 5 V; ' + u('3') + ' = 5 V; ' + u('7') + ' = −2.5 V</li>' +
        '<li>' + E + ' = 15 V; ' + rk('1') + ' = 500 Ω; ' + rk('2') + ' = 1 kΩ; ' + rk('3') + ' = 1 kΩ</li></ul>',
      questions: [
        '<b>1.</b> In this circuit, find the number of: <b>a.</b> Nodes? <b>b.</b> Branches? <b>c.</b> Loops?',
        '<b>2.</b> Give the expression, then the numerical value, of ' + u('5') + '.',
        '<b>3.</b> Give the expression, then the numerical value, of ' + cur('5') + '.',
        '<b>4.</b> Deduce the value of ' + rk('5') + '.',
        '<b>5.</b> Draw the arrow of the current in ' + rk('2') + ' and determine its value.',
        '<b>6.</b> What is the value of ' + rk('4') + '?'],
      hints: [
        'Before counting, color each node: a wire with no component never separates two nodes. Look carefully at the wire between F and D. For the loops, the answer key counts every closed path, not only the “windows” of the drawing.',
        'For ' + u('5') + ', go around B → C → D → F → B: you know ' + u('3') + ' and ' + u('7') + '. For ' + cur('5') + ', write Kirchhoff’s current law at B reading the direction of the arrows, then Ohm’s law in ' + rk('1') + ' and ' + rk('3') + ' (opposite voltage and current arrows: receiver convention).',
        'What voltage does the source impose on ' + rk('2') + '? For ' + rk('4') + ', find its voltage with the loop A → B → F → G → A, and its current by noticing that only ' + rk('1') + ' and ' + rk('4') + ' connect the left part of the circuit (A and G) to the right part.'],
      solution: [
        { t: 'Question 1: nodes, branches, loops', html: '<p><b>a. 5 nodes</b>: A, B, C, G, and D merged with F. The wire connecting F to D contains no component: F and D are the same electrical point. The black dot in the top-left corner is connected to A by a plain wire, so it is still A. The two right-hand corners are just bends.</p>' +
          '<p><b>b. 8 branches</b>: ' + E + ' and ' + rk('2') + ' (from A to G), ' + rk('1') + ' (A–B), ' + rk('3') + ' (B–DF), ' + rk('5') + ' (B–C), ' + rk('6') + ' and ' + rk('7') + ' (C–DF), ' + rk('4') + ' (G–DF).</p>' +
          '<p><b>c. 10 loops</b>: the answer key counts every closed path that does not pass through the same node twice.</p>' +
          '<ul><li>two loops of 2 branches: {' + E + ', ' + rk('2') + '} and {' + rk('6') + ', ' + rk('7') + '};</li>' +
          '<li>two loops of 3 branches: {' + rk('3') + ', ' + rk('5') + ', ' + rk('6') + '} and {' + rk('3') + ', ' + rk('5') + ', ' + rk('7') + '};</li>' +
          '<li>two loops of 4 branches: {' + E + ', ' + rk('1') + ', ' + rk('3') + ', ' + rk('4') + '} and {' + rk('2') + ', ' + rk('1') + ', ' + rk('3') + ', ' + rk('4') + '};</li>' +
          '<li>four loops of 5 branches: (' + E + ' or ' + rk('2') + '), ' + rk('1') + ', ' + rk('5') + ', (' + rk('6') + ' or ' + rk('7') + '), ' + rk('4') + '.</li></ul>' +
          '<p>Of these 10 loops, only 8 − 5 + 1 = <b>4 are independent</b>: the four “windows” of the drawing, {' + E + ', ' + rk('2') + '}, {' + rk('2') + ', ' + rk('1') + ', ' + rk('3') + ', ' + rk('4') + '}, {' + rk('3') + ', ' + rk('5') + ', ' + rk('6') + '} and {' + rk('6') + ', ' + rk('7') + '}. The others are obtained by joining them together. The official answer key expects 10: in the exam, write “10 loops, 4 of them independent”.</p>',
          figs: [{ cap: 'In color, node D = F: a single node, despite its two names' }] },
        { t: 'Question 2: U5', html: '<p>Go around the loop B → C → D → F → B, through ' + rk('5') + ', ' + rk('7') + ', the D–F wire, then ' + rk('3') + '. An arrow in the direction of travel counts +, an arrow against it counts −.</p>' +
          '<ul><li>from B to C, ' + u('5') + ' points toward C, in your direction: + ' + u('5') + ';</li>' +
          '<li>from C to D going down through ' + rk('7') + ', ' + u('7') + ' points down, in your direction: + ' + u('7') + ';</li>' +
          '<li>from D to F, plain wire: 0;</li>' +
          '<li>from F to B going up through ' + rk('3') + ', ' + u('3') + ' points toward B, in your direction: + ' + u('3') + '.</li></ul>' +
          '<p class="f-block">' + u('5') + ' + ' + u('7') + ' + ' + u('3') + ' = 0 ⇒ <b>' + u('5') + ' = −' + u('3') + ' − ' + u('7') + '</b> = −5 − (−2.5) = <b>−2.5 V</b></p>' +
          '<p>With potentials: ' + u('3') + ' + ' + u('5') + ' + ' + u('7') + ' = (' + VB + ' − ' + VF + ') + (' + VC + ' − ' + VB + ') + (' + VD + ' − ' + VC + ') = ' + VD + ' − ' + VF + ' = 0.</p>',
          figs: [{ cap: 'The loop B → C → D → F → B' }] },
        { t: 'Question 3: I5', html: '<p>Kirchhoff’s current law at B: ' + cur('1') + ' arrives from A, ' + cur('5') + ' arrives from C (its arrow points toward B), ' + cur('3') + ' leaves toward F.</p>' +
          '<p class="f-block">' + cur('1') + ' + ' + cur('5') + ' = ' + cur('3') + ' ⇒ ' + cur('5') + ' = ' + cur('3') + ' − ' + cur('1') + '</p>' +
          '<p>' + rk('1') + ' and ' + rk('3') + ' are in receiver convention (opposite voltage and current arrows): ' + cur('1') + ' = ' + u('1') + '/' + rk('1') + ' = 5/500 = 10 mA and ' + cur('3') + ' = ' + u('3') + '/' + rk('3') + ' = 5/1000 = 5 mA.</p>' +
          '<p class="f-block"><b>' + cur('5') + ' = ' + frac(u('3'), rk('3')) + ' − ' + frac(u('1'), rk('1')) + '</b> = 5 − 10 = <b>−5 mA</b></p>' +
          '<p>The minus sign tells you that the actual current in ' + rk('5') + ' flows from B to C.</p>' },
        { t: 'Question 4: R5', html: '<p>' + u('5') + ' points to the right and ' + cur('5') + ' to the left: opposite arrows, receiver convention, so ' + u('5') + '&nbsp;=&nbsp;' + rk('5') + '·' + cur('5') + '.</p>' +
          '<p class="f-block">' + rk('5') + ' = ' + frac(u('5'), cur('5')) + ' = ' + frac('−2.5', '−5·10<sup>−3</sup>') + ' = <b>500 Ω</b></p>' +
          '<p>The two minus signs cancel out. A resistance is always positive: this is a good check.</p>' },
        { t: 'Question 5: current in R2', html: '<p>' + rk('2') + ' is connected between A and G, like the source: it is in parallel with it and its voltage is ' + E + '. Draw the current ' + cur('2') + ' in ' + rk('2') + ' from A to G (downward): it is opposite to the voltage arrow ' + E + ', which is the receiver convention.</p>' +
          '<p class="f-block"><b>' + cur('2') + ' = ' + frac(E, rk('2')) + '</b> = ' + frac('15', '1000') + ' = <b>15 mA</b></p>' },
        { t: 'Question 6: R4', html: '<p>Draw ' + u('4') + ' above ' + rk('4') + ' pointing toward F, the current ' + cur('4') + ' in ' + rk('4') + ' from F to G (receiver convention), and ' + cur('8') + ' in the wire from D to F.</p>' +
          '<ul><li>Loop A → B → F → G → A: ' + E + ' = ' + u('1') + ' + ' + u('3') + ' + ' + u('4') + ', so ' + u('4') + ' = ' + E + ' − ' + u('1') + ' − ' + u('3') + ' = 15 − 5 − 5 = 5 V.</li>' +
          '<li>Node C: ' + cur('7') + ' = ' + cur('5') + ' + ' + cur('6') + '. Node D: ' + cur('6') + ' = ' + cur('7') + ' + ' + cur('8') + '. So ' + cur('8') + ' = −' + cur('5') + ' = 5 mA.</li>' +
          '<li>Node F: ' + cur('4') + ' = ' + cur('3') + ' + ' + cur('8') + ' = ' + cur('3') + ' − ' + cur('5') + ' = 5 + 5 = 10 mA.</li></ul>' +
          '<p class="f-block"><b>' + rk('4') + ' = ' + frac(u('4'), cur('4')) + ' = ' + frac(E + ' − ' + u('1') + ' − ' + u('3'), cur('3') + ' − ' + cur('5')) + '</b> = ' + frac('5', '10·10<sup>−3</sup>') + ' = <b>500 Ω</b></p>' +
          '<p>Shortcut: the right part (B, C, D, F) is connected to the left part (A, G) only through ' + rk('1') + ' and ' + rk('4') + '. All the current that leaves through ' + rk('1') + ' comes back through ' + rk('4') + ': ' + cur('4') + ' = ' + cur('1') + ' = 10 mA, directly.</p>',
          figs: [{ cap: 'Arrows added for the solution: ' + cur('2') + ' (question 5), ' + u('4') + ', ' + cur('4') + ' and ' + cur('8') + ' (question 6)' }] }],
      answer: '<p><b>1.</b> 5 nodes, 8 branches, 10 loops (4 of them independent).<br>' +
        '<b>2.</b> ' + u('5') + ' = −' + u('3') + ' − ' + u('7') + ' = −2.5 V.<br>' +
        '<b>3.</b> ' + cur('5') + ' = ' + u('3') + '/' + rk('3') + ' − ' + u('1') + '/' + rk('1') + ' = −5 mA.<br>' +
        '<b>4.</b> ' + rk('5') + ' = ' + u('5') + '/' + cur('5') + ' = 500 Ω.<br>' +
        '<b>5.</b> ' + cur('2') + ' = ' + E + '/' + rk('2') + ' = 15 mA, with its arrow from A to G.<br>' +
        '<b>6.</b> ' + rk('4') + ' = (' + E + ' − ' + u('1') + ' − ' + u('3') + ')/(' + cur('3') + ' − ' + cur('5') + ') = 500 Ω.</p>',
      traps: [
        'Counting D and F as two nodes (6 instead of 5): the wire connecting them contains no component.',
        'Answering 4 loops: that is the number of independent loops (branches − nodes + 1). The answer key expects all the loops, i.e. 10.',
        'Writing Kirchhoff’s voltage law without looking at the direction of each arrow, or forgetting that ' + u('7') + ' is negative.',
        'Writing Kirchhoff’s current law at B without reading the arrows: ' + cur('1') + ' and ' + cur('5') + ' arrive at B, ' + cur('3') + ' leaves it.',
        'Finding ' + rk('5') + ' &lt; 0: ' + u('5') + ' and ' + cur('5') + ' are drawn in receiver convention and both negative, so their ratio is positive.',
        'Not seeing that ' + rk('2') + ' is directly across the source, or looking for ' + cur('4') + ' with a long system of equations when ' + cur('4') + ' = ' + cur('1') + '.']
    }
  });
})();
