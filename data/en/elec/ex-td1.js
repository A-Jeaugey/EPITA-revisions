/* English text for data/elec/ex-td1.js (merged by id over the French file).
   Statements: word for word from the official English TD 1 (“DC circuit bases”) when it matches the French one. */
(function () {
  /* same notation as the French file: voltages in blue, currents in red, potentials in purple */
  function u(n, s) { return '<var class="u">' + n + '</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  function i(n, s) { return '<var class="i">' + n + '</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  function r(s) { return '<var>R</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  function v(s) { return '<var class="v">V</var><sub>' + s + '</sub>'; }
  function fr(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  var E = u('E'), U = u('U'), I = i('I'), R = '<var>R</var>';
  var K1 = 'K<sub>1</sub>', K2 = 'K<sub>2</sub>';
  var Rp = '<var>R′</var>', Up = '<var class="u">U′</var>';

  var EN = {

    /* ================= Ex 1 ================= */
    'td1-ex1': {
      src: 'TD 1 · Ex 1',
      title: 'Embedded board: nodes, loops and equivalent resistance',
      intro: '<p><b>Embedded development card.</b> A microcontroller board is powered by a 12 V source. The circuit has five resistors (see diagram on the opposite).</p>',
      figs: [{ cap: 'Circuit of the board (figure from the TD)' }],
      questions: [
        '<b>1.</b> How many nodes, branches and loops are in the scheme?',
        '<b>2.</b> Are there any resistances in series? If so, identify them?',
        '<b>3.</b> Are there any resistances in parallel? If so, identify them?',
        'We set: ' + r('1') + ' = ' + r('2') + ' = 4' + R + ', ' + r('3') + ' = ' + r('4') + ' = ' + R + ' and ' + r('5') + ' = 2' + R + '<br><b>4.</b> What is (function of ' + R + ') the equivalent resistance seen by the generator ' + E + '?',
        '<b>5.</b> Give the expressions of the voltage ' + U + ' and of the current ' + I + '.'
      ],
      hints: [
        'Color the wire: everything connected by wire alone is one and the same point. A node joins at least three wires. Look closely at the small dot between ' + r('4') + ' and ' + r('5') + '.',
        'Two resistors are in parallel if they connect the same two nodes. They are in series if no node separates them: the same current flows through both.',
        'For ' + r('eq') + ', start from the end farthest from the generator: ' + r('1') + ' // ' + r('2') + ', then the series with ' + r('3') + ', then compare with the branch ' + r('4') + ' + ' + r('5') + '. For ' + U + ', look at which nodes this branch is connected between.'
      ],
      solution: [
        { t: 'Question 1 · nodes, branches, loops',
          html: '<p>Everything connected by wire alone is one and the same point:</p><ul>' +
            '<li><b>A</b>: the whole left wire (' + r('2') + ', ' + r('1') + ', ' + r('4') + ' and the + terminal of ' + E + ' meet there);</li>' +
            '<li><b>B</b>: to the right of ' + r('1') + ' and ' + r('2') + ', connected to ' + r('3') + ';</li>' +
            '<li><b>C</b>: below ' + r('3') + ', at the end of ' + r('5') + ', connected to the other terminal of ' + E + ' by the right wire.</li></ul>' +
            '<p>The small dot between ' + r('4') + ' and ' + r('5') + ' joins only two wires: it is not a node. So there are <b>3 nodes</b>.</p>' +
            '<p><b>5 branches</b> (from one node to another): ' + r('1') + ' (A–B), ' + r('2') + ' (A–B), ' + r('3') + ' (B–C), ' + r('4') + ' + ' + r('5') + ' (A–C) and the generator ' + E + ' (A–C).</p>' +
            '<p><b>3 independent loops</b> (branches − nodes + 1 = 5 − 3 + 1): the three “windows” of the drawing, {' + r('2') + ', ' + r('1') + '}, {' + r('1') + ', ' + r('3') + ', ' + r('5') + ', ' + r('4') + '} and {' + r('4') + ', ' + r('5') + ', ' + E + '}. ' +
            'If you also count the loops that combine several of them ({' + r('2') + ', ' + r('3') + ', ' + r('5') + ', ' + r('4') + '}, {' + r('1') + ', ' + r('3') + ', ' + E + '}, {' + r('2') + ', ' + r('3') + ', ' + E + '}), you find <b>6 loops</b> in total.</p>',
          figs: [{ cap: 'The three nodes A, B and C. The dot between R₄ and R₅ is not a node.' }] },
        { t: 'Question 2 · series',
          html: '<p><b>' + r('4') + ' and ' + r('5') + '</b> are in series: the point between them is not a node, the same current flows through both.</p>' +
            '<p>' + r('3') + ' is in series with the <b>block</b> (' + r('1') + ' // ' + r('2') + '), but not with ' + r('1') + ' alone or with ' + r('2') + ' alone: at B, the current of ' + r('3') + ' splits between them.</p>' },
        { t: 'Question 3 · parallel',
          html: '<p><b>' + r('1') + ' and ' + r('2') + '</b> are in parallel: both connect A and B, so they have the same voltage.</p>' +
            '<p>On a larger scale, the branch ' + r('4') + ' + ' + r('5') + ', the branch (' + r('1') + ' // ' + r('2') + ') + ' + r('3') + ' and the generator all connect A and C: the three of them are in parallel.</p>' },
        { t: 'Question 4 · equivalent resistance',
          html: '<p>Reduce the circuit starting from the end farthest from the generator.</p><ol>' +
            '<li>' + r('1') + ' // ' + r('2') + ' = 4' + R + ' // 4' + R + ' = 2' + R + ' (two equal resistors in parallel: half the value). And ' + r('4') + ' + ' + r('5') + ' = ' + R + ' + 2' + R + ' = 3' + R + '.</li>' +
            '<li>The 2' + R + ' block is in series with ' + r('3') + ': 2' + R + ' + ' + R + ' = 3' + R + '.</li>' +
            '<li>Two branches of 3' + R + ' remain between A and C, in parallel: 3' + R + ' // 3' + R + ' = 3' + R + '/2.</li></ol>' +
            '<p><span class="f-inline">' + r('eq') + ' = ' + fr('3' + R, '2') + ' = 1.5' + R + '</span></p>',
          figs: [{ cap: 'Step 1: R₁ // R₂ = 2R and R₄ + R₅ = 3R.' },
            { cap: 'Step 2: 2R in series with R₃ gives 3R. Two branches of 3R between A and C.' },
            { cap: 'Step 3: 3R // 3R = 3R/2, the only resistance the generator sees.' }] },
        { t: 'Question 5 · U and I',
          html: '<p>The arrow ' + U + ' is across the branch ' + r('4') + ' + ' + r('5') + ', which connects A and C like the generator. Both arrows point to A: ' + U + ' = ' + v('A') + ' − ' + v('C') + ' = ' + E + '.</p>' +
            '<p><span class="f-inline">' + U + ' = ' + E + ' = 12 V</span></p>' +
            '<p>' + I + ' leaves the + terminal of the generator, which only sees ' + r('eq') + ':</p>' +
            '<p><span class="f-inline">' + I + ' = ' + fr(E, r('eq')) + ' = ' + fr(E, '3' + R + '/2') + ' = ' + fr('2' + E, '3' + R) + '</span> (that is 8/' + R + ' with ' + E + ' = 12 V).</p>' +
            '<p class="sol-note">For practice, the arrow ' + u('U', '1') + ' (not asked): the top branch carries ' + E + '/(3' + R + '), so ' + r('1') + ' // ' + r('2') + ' = 2' + R + ' has 2' + E + '/3 across it, A being higher than B. ' + u('U', '1') + ' points to B: ' + u('U', '1') + ' = ' + v('B') + ' − ' + v('A') + ' = −2' + E + '/3 = −8 V.</p>' }
      ],
      answer: '<p>3 nodes, 5 branches, 6 loops (3 independent ones). ' + r('4') + ' and ' + r('5') + ' in series; ' + r('1') + ' and ' + r('2') + ' in parallel.</p>' +
        '<p>' + r('eq') + ' = 3' + R + '/2 · ' + U + ' = ' + E + ' = 12 V · ' + I + ' = 2' + E + '/(3' + R + ')</p>',
      traps: [
        'Counting the dot between ' + r('4') + ' and ' + r('5') + ' as a node: it joins only two wires.',
        'Saying that ' + r('3') + ' is in series with ' + r('1') + ': its current splits between ' + r('1') + ' and ' + r('2') + '. It is in series with the block ' + r('1') + ' // ' + r('2') + ' only.',
        'Looking for ' + U + ' with a voltage divider: the branch ' + r('4') + ' + ' + r('5') + ' is connected directly across the generator, so ' + U + ' = ' + E + '.',
        'Getting the sign wrong: ' + U + ' and ' + E + ' both point to A, hence ' + U + ' = +' + E + '.'
      ]
    },

    /* ================= Ex 2 ================= */
    'td1-ex2': {
      src: 'TD 1 · Ex 2',
      title: 'Place the points, chain the voltages, find the currents',
      intro: '<p>Consider the diagram in the figure. Let’s set:</p><ul>' +
        '<li>' + E + ' = ' + v('A') + ' − ' + v('B') + ' = 240 V</li>' +
        '<li>' + u('U', '1') + ' = ' + v('F') + ' − ' + v('B') + ' = 184 V</li>' +
        '<li>' + u('U', '4') + ' = ' + v('C') + ' − ' + v('D') + ' = −110 V</li>' +
        '<li>' + u('U', '5') + ' = ' + u('U', 'AD') + ' = 46 V</li></ul>',
      figs: [{ cap: 'Figure from the TD: the five points are to be named' }],
      questions: [
        '<b>1.</b> Place the points A, B, C, D and F on the figure.',
        '<b>2.</b> Calculate the values of voltages ' + u('U', '2') + ', ' + u('U', '3') + ', ' + u('U', '6') + ' and ' + u('U', '7') + '.',
        '<b>3.</b> Calculate the intensity of currents ' + i('I', '1') + ', ' + i('I', '2') + ' and ' + I + ' present in the figure. Let’s set ' + r('1') + ' = ' + r('3') + ' = 100 Ω. Please comment the chosen directions for the given currents?'
      ],
      hints: [
        'A voltage arrow points to the point written first: ' + E + ' = ' + v('A') + ' − ' + v('B') + ' points to A. Use the arrows ' + E + ', ' + u('U', '1') + ' and ' + u('U', '4') + ' to place the points.',
        'Take ' + v('B') + ' = 0 and compute the potential of each point: ' + v('A') + ', ' + v('F') + ', then ' + v('D') + ' with ' + u('U', '5') + ' and ' + v('C') + ' with ' + u('U', '4') + '. Each requested voltage becomes a simple subtraction.',
        'F joins only ' + r('1') + ' and ' + r('2') + ': the same current flows through both. The same goes for ' + r('3') + ', ' + r('4') + ', ' + r('5') + '. Apply Ohm’s law to ' + r('1') + ' and to ' + r('3') + ', checking the convention (opposite arrows or not), then Kirchhoff’s current law at A.'
      ],
      solution: [
        { t: 'Question 1 · placing the points',
          html: '<ul><li>' + E + ' = ' + v('A') + ' − ' + v('B') + ' and the arrow ' + E + ' points to the right: <b>A</b> is the right-hand point, <b>B</b> the left-hand one.</li>' +
            '<li>' + u('U', '1') + ' = ' + v('F') + ' − ' + v('B') + ': the arrow ' + u('U', '1') + ' points to the top point, so that is <b>F</b>.</li>' +
            '<li>' + u('U', '4') + ' = ' + v('C') + ' − ' + v('D') + ': the arrow ' + u('U', '4') + ' points to the left, so <b>C</b> is to the left of ' + r('4') + ' and <b>D</b> to its right.</li>' +
            '<li>Check: ' + u('U', '5') + ' = ' + v('A') + ' − ' + v('D') + ' does point to A.</li></ul>' +
            '<p>The arrows ' + u('U', '6') + ' and ' + u('U', '7') + ' are not wires: they are voltages between two points. So F joins only ' + r('1') + ' and ' + r('2') + '.</p>',
          figs: [{ cap: 'The points placed: B on the left, A on the right, F at the top, C and D in the middle.' }] },
        { t: 'Question 2 · voltages',
          html: '<p>With ' + v('B') + ' = 0:</p><ul>' +
            '<li>' + v('A') + ' = ' + E + ' = 240 V and ' + v('F') + ' = ' + u('U', '1') + ' = 184 V;</li>' +
            '<li>' + v('D') + ' = ' + v('A') + ' − ' + u('U', '5') + ' = 240 − 46 = 194 V;</li>' +
            '<li>' + v('C') + ' = ' + v('D') + ' + ' + u('U', '4') + ' = 194 − 110 = 84 V.</li></ul>' +
            '<p>Each arrow points to the point written first:</p><ul>' +
            '<li>' + u('U', '2') + ' = ' + v('F') + ' − ' + v('A') + ' = 184 − 240 = <b>−56 V</b>;</li>' +
            '<li>' + u('U', '3') + ' = ' + v('C') + ' − ' + v('B') + ' = <b>84 V</b>;</li>' +
            '<li>' + u('U', '6') + ' = ' + v('C') + ' − ' + v('F') + ' = 84 − 184 = <b>−100 V</b>;</li>' +
            '<li>' + u('U', '7') + ' = ' + v('F') + ' − ' + v('D') + ' = 184 − 194 = <b>−10 V</b>.</li></ul>' +
            '<p>Kirchhoff’s voltage law gives the same thing: loop (' + E + ', ' + r('2') + ', ' + r('1') + '): ' + E + ' + ' + u('U', '2') + ' − ' + u('U', '1') + ' = 0, so ' + u('U', '2') + ' = ' + u('U', '1') + ' − ' + E + '; loop (' + E + ', ' + r('5') + ', ' + r('4') + ', ' + r('3') + '): ' + u('U', '3') + ' = ' + E + ' + ' + u('U', '4') + ' − ' + u('U', '5') + '; then ' + u('U', '6') + ' = ' + u('U', '3') + ' − ' + u('U', '1') + ' and ' + u('U', '7') + ' = ' + u('U', '5') + ' + ' + u('U', '1') + ' − ' + E + '.</p>' },
        { t: 'Question 3 · currents',
          html: '<ul><li><b>' + i('I', '1') + '</b>: F joins only ' + r('1') + ' and ' + r('2') + ', so ' + i('I', '1') + ' (drawn from A to F in ' + r('2') + ') then flows through ' + r('1') + ' from F to B. In ' + r('1') + ', ' + i('I', '1') + ' goes to the left and ' + u('U', '1') + ' points to the right: opposite arrows, receiver convention, ' + u('U', '1') + ' = ' + r('1') + i('I', '1') + '.<br>' +
            '<span class="f-inline">' + i('I', '1') + ' = ' + u('U', '1') + '/' + r('1') + ' = 184/100 = 1.84 A</span></li>' +
            '<li><b>' + i('I', '2') + '</b>: C and D join only two resistors, so ' + r('3') + ', ' + r('4') + ', ' + r('5') + ' are in series. ' + i('I', '2') + ' (drawn from D to A) flows through ' + r('3') + ' from B to C, in the same direction as ' + u('U', '3') + ': source convention, ' + u('U', '3') + ' = −' + r('3') + i('I', '2') + '.<br>' +
            '<span class="f-inline">' + i('I', '2') + ' = −' + u('U', '3') + '/' + r('3') + ' = −84/100 = −0.84 A</span></li>' +
            '<li><b>' + I + '</b>: Kirchhoff’s current law at A. ' + I + ' and ' + i('I', '2') + ' enter A, ' + i('I', '1') + ' leaves it: ' + I + ' + ' + i('I', '2') + ' = ' + i('I', '1') + '.<br>' +
            '<span class="f-inline">' + I + ' = ' + i('I', '1') + ' − ' + i('I', '2') + ' = 1.84 + 0.84 = 2.68 A</span></li></ul>' +
            '<p><b>Directions of the arrows.</b> Current arrows are arbitrary choices: the sign of the result gives the actual direction. ' + i('I', '1') + ' and ' + I + ' are positive, so their arrows are in the actual direction. ' + i('I', '2') + ' is negative: the current actually flows from A to B through ' + r('5') + ', ' + r('4') + ' and ' + r('3') + ' (as expected, A is the highest point, at 240 V). ' + I + ' leaves through the + terminal of ' + E + ' and equals +2.68 A: ' + E + ' does work as a generator and supplies 240 × 2.68 = 643.2 W.</p>' },
        { t: 'In the midterm',
          html: '<p>This exercise was set unchanged in the midterm of Nov. 2020 (Ex 3, 6 points), with two current arrows reversed: in the midterm, ' + i('I', '1') + ' points to the right and ' + i('I', '2') + ' to the left. So there you find ' + i('I', '1') + ' = −1.84 A and ' + i('I', '2') + ' = 0.84 A; ' + I + ' = 2.68 A does not change.</p>' }
      ],
      answer: '<p>Points: B on the left, A on the right, F at the top, C then D in the middle.</p>' +
        '<p>' + u('U', '2') + ' = −56 V · ' + u('U', '3') + ' = 84 V · ' + u('U', '6') + ' = −100 V · ' + u('U', '7') + ' = −10 V</p>' +
        '<p>' + i('I', '1') + ' = 1.84 A · ' + i('I', '2') + ' = −0.84 A · ' + I + ' = 2.68 A</p>',
      traps: [
        'Placing A on the left: the arrow ' + E + ' points to the + terminal, so to A.',
        'Taking ' + u('U', '6') + ' and ' + u('U', '7') + ' for wires: no current flows there, F joins only ' + r('1') + ' and ' + r('2') + '.',
        'Writing ' + u('U', '3') + ' = ' + r('3') + i('I', '2') + ': on ' + r('3') + ', ' + u('U', '3') + ' and ' + i('I', '2') + ' are drawn in the same direction (source convention), so you need a minus sign.',
        'Looking for ' + r('2') + ', ' + r('4') + ' or ' + r('5') + ': no need, ' + r('1') + ' and ' + r('3') + ' are enough since each branch is a series.',
        'Copying the signs of the 2020 midterm answer key: ' + i('I', '1') + ' and ' + i('I', '2') + ' are drawn the other way there.'
      ]
    },

    /* ================= Ex 3 ================= */
    'td1-ex3': {
      src: 'TD 1 · Ex 3',
      title: 'Voltage divider: powering a rover’s sensor',
      intro: '<p><b>Voltage Divider.</b> Consider the loop on the right:</p>',
      figs: [{ cap: 'Figure from the TD' }],
      questions: [
        '<b>1.</b> Write Kirchhoff’s Voltage Law.',
        '<b>2.</b> Could resistors ' + r('1') + ' and ' + r('2') + ' be associated? If yes, give the expression of ' + r('eq') + ' resulting of the association of ' + r('1') + ' and ' + r('2') + '. Redo the loop. Could we set voltages ' + u('U', '1') + ' and ' + u('U', '2') + ' on the new diagram? Same questions for current ' + I + '.',
        '<b>3.</b> Find the formula of ' + I + ' in terms of ' + E + ' and ' + r('eq') + ', then in terms of ' + E + ', ' + r('1') + ' and ' + r('2') + '.',
        '<b>4.</b> Derive a formula for ' + u('U', '2') + ' in terms of ' + E + ', ' + r('1') + ' and ' + r('2') + '.',
        '<b>Application:</b> A rover moving on Mars must measure the duration of exposure to the light in a region of the planet. For this, we have:<ul><li>of a brightness sensor must be powered by a voltage of 3.3 V</li><li>from a 12 V voltage supply.</li></ul>We use a voltage divider bridge like the one presented above. Determine the ' + r('2') + '/' + r('1') + ' ratio to properly power this sensor.'
      ],
      hints: [
        'Go around the loop in one direction: count a voltage as + when its arrow goes in your direction of travel, as − when it goes against it.',
        'No node separates ' + r('1') + ' and ' + r('2') + ': the same current ' + I + ' flows through both. On the reduced diagram, ask yourself which arrows still have a dipole to rest on.',
        'For the application, the sensor is connected across ' + r('2') + ': write ' + u('U', '2') + ' = 3.3 V with ' + E + ' = 12 V, cross-multiply and group the ' + r('1') + ' terms on one side, the ' + r('2') + ' terms on the other.'
      ],
      solution: [
        { t: 'Question 1 · Kirchhoff’s voltage law',
          html: '<p>Start from the bottom-left corner and go clockwise. Going up through the generator: ' + E + ' goes in our direction, +' + E + '. Crossing ' + r('1') + ' to the right: ' + u('U', '1') + ' points to the left, against us, −' + u('U', '1') + '. Going down through ' + r('2') + ': ' + u('U', '2') + ' points up, against us, −' + u('U', '2') + '.</p>' +
            '<p><span class="f-inline">' + E + ' − ' + u('U', '1') + ' − ' + u('U', '2') + ' = 0, that is ' + E + ' = ' + u('U', '1') + ' + ' + u('U', '2') + '</span></p>' },
        { t: 'Question 2 · association and reduced diagram',
          html: '<p>' + r('1') + ' and ' + r('2') + ' are <b>in series</b>: no node between them, the same current ' + I + ' flows through both.</p>' +
            '<p><span class="f-inline">' + r('eq') + ' = ' + r('1') + ' + ' + r('2') + '</span></p>' +
            '<p>On the reduced diagram, ' + r('1') + ' and ' + r('2') + ' have disappeared into ' + r('eq') + ': you can no longer draw ' + u('U', '1') + ' or ' + u('U', '2') + ' (their sum, the voltage across ' + r('eq') + ', equals ' + E + '). The current ' + I + ' can still be drawn: it is the same throughout the loop.</p>',
          figs: [{ cap: 'Redrawn diagram: I still exists, U₁ and U₂ no longer have a resistor to sit on.' }] },
        { t: 'Question 3 · current',
          html: '<p>' + r('eq') + ' has the voltage ' + E + ' across it and ' + I + ' enters it on the + side: receiver convention, Ohm’s law.</p>' +
            '<p><span class="f-inline">' + I + ' = ' + fr(E, r('eq')) + ' = ' + fr(E, r('1') + ' + ' + r('2')) + '</span></p>' },
        { t: 'Question 4 · output voltage',
          html: '<p>On ' + r('2') + ', ' + I + ' goes down and ' + u('U', '2') + ' points up: receiver convention, ' + u('U', '2') + ' = ' + r('2') + I + '.</p>' +
            '<p><span class="f-inline">' + u('U', '2') + ' = ' + fr(r('2'), r('1') + ' + ' + r('2')) + ' ' + E + '</span></p>' +
            '<p>This is the <b>voltage divider</b> formula: the voltage is shared between the resistors in series, in proportion to their values.</p>' },
        { t: 'Application · the rover',
          html: '<p>You want ' + u('U', '2') + ' = 3.3 V with ' + E + ' = 12 V:</p>' +
            '<p><span class="f-inline">3.3 = 12 × ' + fr(r('2'), r('1') + ' + ' + r('2')) + '</span></p>' +
            '<p>Cross-multiplying: 3.3' + r('1') + ' + 3.3' + r('2') + ' = 12' + r('2') + ', so 3.3' + r('1') + ' = 8.7' + r('2') + '.</p>' +
            '<p><span class="f-inline">' + fr(r('2'), r('1')) + ' = ' + fr('3.3', '8.7') + ' = ' + fr('11', '29') + ' ≈ 0.38</span></p>' +
            '<p>Faster: ' + r('1') + ' takes the rest, ' + u('U', '1') + ' = 12 − 3.3 = 8.7 V, and since the current is the same, the voltages are proportional to the resistances. For example ' + r('1') + ' = 8.7 kΩ and ' + r('2') + ' = 3.3 kΩ.</p>' +
            '<p class="sol-note">In reality, the sensor draws a little current and ends up in parallel with ' + r('2') + ': the calculation only stays correct if its resistance is much larger than ' + r('2') + '.</p>' }
      ],
      answer: '<p>' + E + ' = ' + u('U', '1') + ' + ' + u('U', '2') + ' · ' + r('eq') + ' = ' + r('1') + ' + ' + r('2') + ' · ' + I + ' = ' + E + '/(' + r('1') + ' + ' + r('2') + ') · ' + u('U', '2') + ' = ' + r('2') + E + '/(' + r('1') + ' + ' + r('2') + ')</p>' +
        '<p>Rover: ' + r('2') + '/' + r('1') + ' = 3.3/8.7 = 11/29 ≈ 0.38</p>',
      traps: [
        'Getting a sign wrong in the loop: going clockwise, ' + u('U', '1') + ' (to the left) and ' + u('U', '2') + ' (upward) both go against the direction of travel, hence ' + E + ' = ' + u('U', '1') + ' + ' + u('U', '2') + '.',
        'Answering ' + r('2') + '/' + r('1') + ' = 3.3/12 ≈ 0.28: 3.3/12 is the ratio ' + r('2') + '/(' + r('1') + ' + ' + r('2') + '), not ' + r('2') + '/' + r('1') + '.',
        'Still trying to draw ' + u('U', '1') + ' or ' + u('U', '2') + ' on the reduced diagram: ' + r('1') + ' and ' + r('2') + ' no longer exist there.'
      ]
    },

    /* ================= Ex 4 ================= */
    'td1-ex4': {
      src: 'TD 1 · Ex 4',
      title: 'Current divider: two USB devices',
      intro: '<p><b>Current Divider.</b> Two USB devices, represented by ' + r('1') + ' and ' + r('2') + ' share the current supplied by a battery (see the circuit opposite).</p>',
      figs: [{ cap: 'Figure from the TD' }],
      questions: [
        '<b>1.</b> Write Kirchhoff’s Current Law.',
        '<b>2.</b> Could resistors ' + r('1') + ' and ' + r('2') + ' be associated? If so, give the expression of ' + r('eq') + ', resulting from the association of ' + r('1') + ' and ' + r('2') + '. Redo the loop. Could we set currents ' + i('I', '1') + ' and ' + i('I', '2') + ' on the new diagram? Same questions for voltage ' + U + '.',
        '<b>3.</b> Find the formula of ' + U + ' in terms of ' + I + ' and ' + r('eq') + ', then in terms of ' + I + ', ' + r('1') + ' and ' + r('2') + '.',
        '<b>4.</b> Derive the formulas for the currents in each device in terms of ' + I + ', ' + r('1') + ' and ' + r('2') + '.'
      ],
      hints: [
        'At the top node, ' + I + ' comes in, ' + i('I', '1') + ' and ' + i('I', '2') + ' go out.',
        r('1') + ' and ' + r('2') + ' connect the same two nodes: they have the same voltage ' + U + '. In parallel, it is the inverses of the resistances that add up.',
        'Once ' + U + ' is known, apply Ohm’s law to ' + r('1') + ' alone, then to ' + r('2') + ' alone.'
      ],
      solution: [
        { t: 'Question 1 · Kirchhoff’s current law',
          html: '<p>At the top node, what comes in equals what goes out:</p><p><span class="f-inline">' + I + ' = ' + i('I', '1') + ' + ' + i('I', '2') + '</span></p>' },
        { t: 'Question 2 · association and reduced diagram',
          html: '<p>' + r('1') + ' and ' + r('2') + ' are <b>in parallel</b>: they connect the same two nodes and have the same voltage ' + U + '. The inverses add up: 1/' + r('eq') + ' = 1/' + r('1') + ' + 1/' + r('2') + ' = (' + r('1') + ' + ' + r('2') + ')/(' + r('1') + r('2') + ').</p>' +
            '<p><span class="f-inline">' + r('eq') + ' = ' + fr(r('1') + r('2'), r('1') + ' + ' + r('2')) + '</span></p>' +
            '<p>On the reduced diagram, the two branches become one: you can no longer draw ' + i('I', '1') + ' or ' + i('I', '2') + '. The voltage ' + U + ' can still be drawn, across ' + r('eq') + ' (and so can ' + I + ').</p>',
          figs: [{ cap: 'Redrawn diagram: U still exists, I₁ and I₂ have disappeared with their branches.' }] },
        { t: 'Question 3 · voltage',
          html: '<p>' + I + ' enters ' + r('eq') + ' at the top and ' + U + ' points up: receiver convention, ' + U + ' = ' + r('eq') + I + '.</p>' +
            '<p><span class="f-inline">' + U + ' = ' + fr(r('1') + r('2'), r('1') + ' + ' + r('2')) + ' ' + I + '</span></p>' },
        { t: 'Question 4 · currents in the devices',
          html: '<p>' + U + ' is also the voltage of each resistor (receiver convention for each one): ' + i('I', '1') + ' = ' + U + '/' + r('1') + ' and ' + i('I', '2') + ' = ' + U + '/' + r('2') + '.</p>' +
            '<p><span class="f-inline">' + i('I', '1') + ' = ' + fr(r('2'), r('1') + ' + ' + r('2')) + ' ' + I + '</span> and <span class="f-inline">' + i('I', '2') + ' = ' + fr(r('1'), r('1') + ' + ' + r('2')) + ' ' + I + '</span></p>' +
            '<p>This is the <b>current divider</b>: the numerator holds the <b>other</b> resistance, and the smallest resistance gets the largest current. Check: ' + i('I', '1') + ' + ' + i('I', '2') + ' = ' + I + '.</p>' }
      ],
      answer: '<p>' + I + ' = ' + i('I', '1') + ' + ' + i('I', '2') + ' · ' + r('eq') + ' = ' + r('1') + r('2') + '/(' + r('1') + ' + ' + r('2') + ') · ' + U + ' = ' + r('1') + r('2') + I + '/(' + r('1') + ' + ' + r('2') + ')</p>' +
        '<p>' + i('I', '1') + ' = ' + r('2') + I + '/(' + r('1') + ' + ' + r('2') + ') · ' + i('I', '2') + ' = ' + r('1') + I + '/(' + r('1') + ' + ' + r('2') + ')</p>',
      traps: [
        'Putting ' + r('1') + ' in the numerator of ' + i('I', '1') + ': it is the other resistance. Check with a limiting case: if ' + r('2') + ' = 0, all the current goes through ' + r('2') + ' and ' + i('I', '1') + ' must be 0.',
        'Writing ' + r('eq') + ' = ' + r('1') + ' + ' + r('2') + ': that is the series formula.',
        'Adding 1/' + r('1') + ' + 1/' + r('2') + ' and forgetting to take the inverse at the end.'
      ]
    },

    /* ================= Ex 5 ================= */
    'td1-ex5': {
      src: 'TD 1 · Ex 5',
      title: 'Find E and R from two loads',
      intro: '<p>The generator (' + E + ', ' + R + ') gives a voltage level ' + U + ' = 2 V if ' + r('C') + ' = 10 Ω and it doubles the voltage level if ' + r('C') + ' = 25 Ω.</p>',
      figs: [{ cap: 'Figure from the TD' }],
      questions: ['Set a formula for ' + U + ' in terms of ' + E + ', ' + R + ' and ' + r('C') + '. What are the values of ' + E + ' and ' + R + '?'],
      hints: [
        R + ' and ' + r('C') + ' carry the same current: ' + U + ' is obtained with a voltage divider.',
        '“Doubles” means ' + U + ' = 4 V when ' + r('C') + ' = 25 Ω. Two situations give two equations, for two unknowns ' + E + ' and ' + R + '.',
        'Cross-multiply in each equation, isolate ' + R + ' in the first one and substitute it into the second one.'
      ],
      solution: [
        { t: 'Expression of U',
          html: '<p>' + R + ' and ' + r('C') + ' are in series (same current): voltage divider.</p>' +
            '<p><span class="f-inline">' + U + ' = ' + fr(r('C'), R + ' + ' + r('C')) + ' ' + E + '</span></p>' },
        { t: 'Values of E and R',
          html: '<p>Two situations, two equations:</p><ul>' +
            '<li>' + r('C') + ' = 10 Ω and ' + U + ' = 2 V: 2(' + R + ' + 10) = 10' + E + ', that is ' + R + ' + 10 = 5' + E + ' and <b>' + R + ' = 5' + E + ' − 10</b>;</li>' +
            '<li>' + r('C') + ' = 25 Ω and ' + U + ' = 4 V: 4(' + R + ' + 25) = 25' + E + ', that is 4' + R + ' + 100 = 25' + E + '.</li></ul>' +
            '<p>Substitute ' + R + ' into the second one: 4(5' + E + ' − 10) + 100 = 25' + E + ', so 20' + E + ' + 60 = 25' + E + ' and 5' + E + ' = 60.</p>' +
            '<p><span class="f-inline">' + E + ' = 12 V</span> then <span class="f-inline">' + R + ' = 5 × 12 − 10 = 50 Ω</span></p>' +
            '<p>Check: 12 × 10/60 = 2 V and 12 × 25/75 = 4 V.</p>' }
      ],
      answer: '<p>' + U + ' = ' + r('C') + E + '/(' + R + ' + ' + r('C') + ') · ' + E + ' = 12 V · ' + R + ' = 50 Ω</p>',
      traps: [
        'Doubling the wrong quantity: it is ' + U + ' that doubles (4 V); ' + r('C') + ' goes from 10 to 25 Ω.',
        'Forgetting ' + R + ' in the denominator: ' + U + ' = ' + r('C') + E + '/(' + R + ' + ' + r('C') + '). Here ' + R + ' is the internal resistance of the generator, it takes its share of the voltage.',
        'Not checking: plug your values back into both situations, and a calculation error shows up at once.'
      ]
    },

    /* ================= Ex 6 ================= */
    'td1-ex6': {
      src: 'TD 1 · Ex 6',
      title: 'Diagnosing a black box with a voltmeter and an ammeter',
      intro: '<p><b>Black box diagnosis.</b> A black box contains 3 dipoles ' + E + ', ' + r('1') + ' and ' + r('2') + '. We know that ' + E + ' = 6 V, but, ' + r('1') + ' and ' + r('2') + ' are unknown. We want to identify the 2 resistors from measurements.</p>' +
        '<p>If we place a voltmeter between points A and B, we measure 4 V. If we place an ammeter between points A and B, we measure 0.5 A.</p>' +
        '<p><i>Details:</i></p><ul>' +
        '<li><i>An ammeter is used to measure the intensity of the current that flows through a component. To do this, the ammeter must be connected in series with the component concerned. In series resistors, the current is the same. <b>It should be noted that an ammeter has a negligible resistance, so it does not modify the current flowing in the circuit.</b></i></li>' +
        '<li><i>A voltmeter is used to measure the electrical potential difference between the terminals of a component. To do this, the voltmeter must be connected in parallel with the component concerned, because the potential difference at the terminals of the components in parallel is the same. <b>As the resistance of the voltmeter is much higher than that of the component to whose terminals it is connected, very little current flows through it. The effect on the circuit is therefore negligible. The resistance of the voltmeter can generally be considered infinite.</b></i></li></ul>',
      figs: [{ cap: 'Figure from the TD: the black box and its terminals A and B' }],
      questions: ['What are the values of ' + r('1') + ' and ' + r('2') + '?'],
      hints: [
        'Ideal voltmeter: infinite resistance, no current leaves through A. How are ' + r('1') + ' and ' + r('2') + ' connected then?',
        'Ideal ammeter: zero resistance, it is a wire between A and B. What happens to ' + r('2') + ' with a wire connected across it?',
        'The ammeter measurement gives ' + r('1') + ' directly; plug it into the voltmeter equation.'
      ],
      solution: [
        { t: 'Voltmeter measurement',
          html: '<p>The voltmeter has an infinite resistance: no current leaves through A. ' + r('1') + ' and ' + r('2') + ' carry the same current, they are in series: voltage divider.</p>' +
            '<p><span class="f-inline">' + u('U', 'AB') + ' = ' + fr(r('2'), r('1') + ' + ' + r('2')) + ' ' + E + ' = 4 V</span></p>' +
            '<p>With ' + E + ' = 6 V: 6' + r('2') + ' = 4' + r('1') + ' + 4' + r('2') + ', so <b>' + r('2') + ' = 2' + r('1') + '</b>.</p>',
          figs: [{ cap: 'Voltmeter between A and B: no current leaves the box.' }] },
        { t: 'Ammeter measurement',
          html: '<p>The ammeter has zero resistance: it is a wire between A and B, so across ' + r('2') + '. ' + r('2') + ' is <b>short-circuited</b>: zero voltage, no current. All the current flows through ' + r('1') + ' and the ammeter, and ' + r('1') + ' gets the whole voltage ' + E + '.</p>' +
            '<p><span class="f-inline">' + I + ' = ' + fr(E, r('1')) + ' = 0.5 A, so ' + r('1') + ' = ' + fr('6', '0.5') + ' = 12 Ω</span></p>',
          figs: [{ cap: 'Ammeter between A and B: R₂ is short-circuited (faded).' }] },
        { t: 'Result',
          html: '<p><span class="f-inline">' + r('1') + ' = 12 Ω</span> and <span class="f-inline">' + r('2') + ' = 2' + r('1') + ' = 24 Ω</span></p>' +
            '<p>Check: 6 × 24/(12 + 24) = 6 × 2/3 = 4 V.</p>' }
      ],
      answer: '<p>' + r('1') + ' = 12 Ω · ' + r('2') + ' = 24 Ω</p>',
      traps: [
        'Keeping ' + r('2') + ' in the ammeter calculation: the ammeter wire short-circuits it, no current flows through it.',
        'Taking 4 V/0.5 A = 8 Ω for ' + r('1') + ' or for ' + r('2') + ': this ratio equals ' + r('1') + ' // ' + r('2') + ' = 12 × 24/36 = 8 Ω, the resistance seen between A and B.',
        'Imagining both meters connected at the same time: they are two separate measurements, each one in its own circuit.'
      ]
    },

    /* ================= Ex 7 ================= */
    'td1-ex7': {
      src: 'TD 1 · Ex 7',
      title: 'Two switches, four cases',
      intro: '<p>Consider the circuit on the right.</p>',
      figs: [{ cap: 'Figure from the TD (K₁ and K₂ drawn open)' }],
      questions: ['Find a formula for ' + U + ' in the 4 possible cases related to switches ' + K1 + ' and ' + K2 + '.'],
      hints: [
        'A closed switch is a wire, an open switch is a gap: redraw the circuit in each of the 4 cases.',
        'Look closely at how far the arrow ' + U + ' extends: it covers the whole right branch, ' + K2 + ' included.',
        'When no current flows, a resistor has zero voltage across it: one loop equation is enough. When a current flows, think of the voltage divider.'
      ],
      solution: [
        { t: 'Method',
          html: '<p>Closed = wire, open = gap. The arrow ' + U + ' covers the whole right branch: ' + U + ' is the voltage across the set ' + K2 + ' + ' + R + '. There is only one loop, and Kirchhoff’s voltage law always gives ' + E + ' = (voltage of the block ' + R + ' // ' + K1 + ') + ' + U + '.</p>' },
        { t: 'Case 1 · K₁ open, K₂ open',
          html: '<p>' + K2 + ' open breaks the only loop: <b>no current</b>. The top resistor, carrying no current, has zero voltage: ' + E + ' = 0 + ' + U + '.</p>' +
            '<p><span class="f-inline">' + U + ' = ' + E + '</span></p><p>The whole voltage ends up across the open switch ' + K2 + '; the bottom resistor, carrying no current, has 0 V.</p>',
          figs: [{ cap: 'Case 1: the loop is broken by K₂.' }] },
        { t: 'Case 2 · K₁ open, K₂ closed',
          html: '<p>The two resistors ' + R + ' are in series in the loop, carrying ' + I + ' = ' + E + '/(2' + R + '). ' + K2 + ' closed is a wire: ' + U + ' is the voltage of the bottom resistor. Voltage divider with two equal resistors:</p>' +
            '<p><span class="f-inline">' + U + ' = ' + fr(R, R + ' + ' + R) + ' ' + E + ' = ' + fr(E, '2') + '</span></p>',
          figs: [{ cap: 'Case 2: the two R in series share E.' }] },
        { t: 'Case 3 · K₁ closed, K₂ open',
          html: '<p>' + K2 + ' is still open: no current, as in case 1. Closing ' + K1 + ' changes nothing for the voltage of the right branch.</p>' +
            '<p><span class="f-inline">' + U + ' = ' + E + '</span></p>',
          figs: [{ cap: 'Case 3: K₁ short-circuits the top R, but K₂ breaks the loop.' }] },
        { t: 'Case 4 · K₁ closed, K₂ closed',
          html: '<p>' + K1 + ' closed is a wire connected across the top resistor: it is <b>short-circuited</b>, its voltage is zero. The bottom resistor gets the whole voltage and carries ' + E + '/' + R + '.</p>' +
            '<p><span class="f-inline">' + U + ' = ' + E + '</span></p>',
          figs: [{ cap: 'Case 4: top R short-circuited (faded), the whole voltage E across the bottom R.' }] }
      ],
      answer: '<ul><li>' + K1 + ' open, ' + K2 + ' open: ' + U + ' = ' + E + '</li><li>' + K1 + ' open, ' + K2 + ' closed: ' + U + ' = ' + E + '/2</li>' +
        '<li>' + K1 + ' closed, ' + K2 + ' open: ' + U + ' = ' + E + '</li><li>' + K1 + ' closed, ' + K2 + ' closed: ' + U + ' = ' + E + '</li></ul>',
      traps: [
        'Reading ' + U + ' as the voltage of the bottom resistor alone: with ' + K2 + ' open, you would find 0, whereas the arrow ' + U + ' includes ' + K2 + ' and equals ' + E + '.',
        'Believing that an open switch has zero voltage: it is its current that is zero; here, the whole voltage ' + E + ' ends up across it.',
        'Forgetting that ' + K1 + ' closed short-circuits the top resistor: it no longer takes any voltage.'
      ]
    },

    /* ================= Ex 8 ================= */
    'td1-ex8': {
      src: 'TD 1 · Ex 8',
      title: 'Resistor ladder fed by a current source',
      intro: '<p>Consider the diagram on the right where: ' + I + ' = 2 mA and ' + R + ' = 1 kΩ</p>',
      figs: [{ cap: 'Figure from the TD' }],
      questions: ['Give the expression and calculate the value of ' + u('U', '1') + ', ' + u('U', '2') + ' and ' + u('U', '3')],
      hints: [
        'Start from the right end: the top resistor ' + R + ' and the vertical resistor ' + R + ' carry the same current.',
        'At each stage, you find 2' + R + ' in parallel with 2' + R + '. What does that give?',
        'Once ' + u('U', '1') + ' is known, go back down stage by stage with a voltage divider: each time, a top resistor ' + R + ' in series with an already reduced block.'
      ],
      solution: [
        { t: 'Reduction from the right',
          html: '<ol><li>Last stage: ' + R + ' (top) + ' + R + ' (vertical) = 2' + R + ', in series since no node separates them.</li>' +
            '<li>These 2' + R + ' are in parallel with the vertical 2' + R + ' in the middle: 2' + R + ' // 2' + R + ' = ' + R + '.</li>' +
            '<li>Do it again: ' + R + ' (top) + ' + R + ' = 2' + R + ', in parallel with the first 2' + R + ': ' + R + ' again.</li></ol>' +
            '<p>So the current source sees <span class="f-inline">' + r('eq') + ' = ' + R + '</span>.</p>',
          figs: [{ cap: 'Step 1: R + R = 2R, in parallel with 2R: a block R remains, across which you read U₂.' },
            { cap: 'Step 2: R + R = 2R, in parallel with 2R: the source sees R.' }] },
        { t: 'Voltage U₁',
          html: '<p>' + I + ' leaves the top of the source and flows through ' + r('eq') + ' from top to bottom; ' + u('U', '1') + ' points up: receiver convention.</p>' +
            '<p><span class="f-inline">' + u('U', '1') + ' = ' + r('eq') + I + ' = ' + R + I + ' = 1 kΩ × 2 mA = 2 V</span></p>' },
        { t: 'Voltages U₂ and U₃',
          html: '<p>After the first node, there is a resistor ' + R + ' in series with a block worth ' + R + ' (step 1), and ' + u('U', '2') + ' is the voltage of this block. Voltage divider:</p>' +
            '<p><span class="f-inline">' + u('U', '2') + ' = ' + fr(R, R + ' + ' + R) + ' ' + u('U', '1') + ' = ' + fr(R + I, '2') + ' = 1 V</span></p>' +
            '<p>Same thing at the last stage: ' + R + ' at the top, a vertical ' + R + ', and ' + u('U', '3') + ' across the vertical one.</p>' +
            '<p><span class="f-inline">' + u('U', '3') + ' = ' + fr(R, R + ' + ' + R) + ' ' + u('U', '2') + ' = ' + fr(R + I, '4') + ' = 0.5 V</span></p>' +
            '<p>Check with the currents: at each node, the current splits into two halves (two branches of 2' + R + '). ' + I + '/2 enters the second stage, ' + I + '/4 the last one, and ' + u('U', '3') + ' = ' + R + ' × ' + I + '/4 = 0.5 V.</p>' }
      ],
      answer: '<p>' + u('U', '1') + ' = ' + R + I + ' = 2 V · ' + u('U', '2') + ' = ' + R + I + '/2 = 1 V · ' + u('U', '3') + ' = ' + R + I + '/4 = 0.5 V</p>',
      traps: [
        'Splitting into three at each stage because you see three resistors: at each stage, there is ' + R + ' in series with a block worth ' + R + ', so a split into two.',
        'Writing ' + u('U', '2') + ' = ' + u('U', '1') + ': the two branches are separated by a resistor ' + R + ' that carries a current, so it takes its share of the voltage.',
        'Getting lost in the units: kΩ × mA gives volts directly.'
      ]
    },

    /* ================= Ex 9 ================= */
    'td1-ex9': {
      src: 'TD 1 · Ex 9',
      title: 'Current source and voltage source in the same circuit',
      intro: '<p>Consider the diagram on the right where:</p><ul><li>' + E + ' = 15 V and ' + r('1') + ' = 200 Ω</li><li>' + i('I', '1') + ' = 0.1 A and ' + r('2') + ' = 100 Ω</li></ul>',
      figs: [{ cap: 'Figure from the TD: the arrow I₁ points up' }],
      questions: ['Give the expression and calculate the value of ' + U + ' and ' + I],
      hints: [
        'The three branches connect the same two wires: each one has the voltage ' + E + ' across it. So ' + r('2') + ' carries ' + E + '/' + r('2') + '.',
        'The source imposes ' + i('I', '1') + ' in its branch, hence also in ' + r('1') + '. Look at the direction of the arrow ' + i('I', '1') + ' to know which way ' + r('1') + ' is crossed, and so where its + side is.',
        'For ' + U + ', write Kirchhoff’s voltage law in the loop (' + E + ', current source, ' + r('1') + '). For ' + I + ', write Kirchhoff’s current law at the top node.'
      ],
      solution: [
        { t: 'Voltage of R₁',
          html: '<p>The source imposes ' + i('I', '1') + ' = 0.1 A in the middle branch. The arrow ' + i('I', '1') + ' points up: the current flows through ' + r('1') + ' from bottom to top. In receiver convention, the voltage of ' + r('1') + ' is drawn downward (+ side at the bottom) and equals ' + r('1') + i('I', '1') + ' = 200 × 0.1 = 20 V: the bottom of ' + r('1') + ' is 20 V higher than its top.</p>',
          figs: [{ cap: 'Voltage of R₁ in receiver convention (downward) and current E/R₂ in R₂.' }] },
        { t: 'Voltage U',
          html: '<p>Go around the loop (' + E + ', source, ' + r('1') + ') by going up the middle branch and back down through the generator: ' + r('1') + ' is crossed against its arrow (−' + r('1') + i('I', '1') + '), the source in the direction of ' + U + ' (+' + U + '), the generator against ' + E + ' (−' + E + ').</p>' +
            '<p>−' + r('1') + i('I', '1') + ' + ' + U + ' − ' + E + ' = 0</p>' +
            '<p><span class="f-inline">' + U + ' = ' + E + ' + ' + r('1') + i('I', '1') + ' = 15 + 20 = 35 V</span></p>' +
            '<p>With potentials (bottom wire at 0 V): the top wire is at ' + E + ' = 15 V, the point between the source and ' + r('1') + ' at −20 V, hence ' + U + ' = 15 − (−20) = 35 V.</p>' },
        { t: 'Current I',
          html: '<p>' + r('2') + ' has ' + E + ' across it: it carries ' + E + '/' + r('2') + ' = 15/100 = 0.15 A downward. At the top node, ' + I + ' and ' + i('I', '1') + ' come in, the current of ' + r('2') + ' goes out:</p>' +
            '<p>' + I + ' + ' + i('I', '1') + ' = ' + E + '/' + r('2') + '</p>' +
            '<p><span class="f-inline">' + I + ' = ' + fr(E, r('2')) + ' − ' + i('I', '1') + ' = 0.15 − 0.1 = 0.05 A</span> (50 mA)</p>' +
            '<p class="sol-note">Power balance: the current source supplies ' + U + i('I', '1') + ' = 3.5 W and the generator ' + E + I + ' = 0.75 W; the resistors receive ' + r('1') + i('I', '1') + '² = 2 W and ' + E + '²/' + r('2') + ' = 2.25 W. Total 4.25 W on both sides.</p>' }
      ],
      answer: '<p>' + U + ' = ' + E + ' + ' + r('1') + i('I', '1') + ' = 35 V · ' + I + ' = ' + E + '/' + r('2') + ' − ' + i('I', '1') + ' = 0.05 A</p>',
      traps: [
        'Reading the arrow ' + i('I', '1') + ' as pointing down: you would find ' + U + ' = ' + E + ' − ' + r('1') + i('I', '1') + ' = −5 V and ' + I + ' = ' + E + '/' + r('2') + ' + ' + i('I', '1') + ' = 0.25 A. On the TD figure, ' + i('I', '1') + ' points up.',
        'Believing that the voltage of a current source is zero, or equal to ' + E + ': it is found with Kirchhoff’s voltage law.',
        'Forgetting ' + r('1') + ': the middle branch contains the source and ' + r('1') + ', so ' + U + ' is not equal to ' + E + '.'
      ]
    },

    /* ================= Ex 10 ================= */
    'td1-ex10': {
      src: 'TD 1 · Ex 10',
      title: 'Choose R′ to get U = E/4',
      intro: '<p>Consider the circuit on the right, ' + U + ' = ' + E + '/4 is desired. Give the expression of:</p>',
      figs: [{ cap: 'Figure from the TD' }],
      questions: [Rp + ' in terms of ' + R, Up + ' in terms of ' + E + '.'],
      hints: [
        'To the right of the node, two paths go down to the bottom wire: 2' + R + ' + 2' + R + ' on one side, ' + R + ', 2' + R + ' and 3' + R + ' on the other. The corners are not nodes.',
        'Replace everything to the right of ' + Rp + ' by a single resistor, then write ' + U + ' with a voltage divider between ' + Rp + ' and this resistor.',
        'For ' + Up + ', the branch ' + R + ', 2' + R + ', 3' + R + ' has the voltage ' + U + ' across it: use a voltage divider on this branch.'
      ],
      solution: [
        { t: 'Reduction',
          html: '<ol><li>Middle branch: 2' + R + ' + 2' + R + ' = 4' + R + '.</li>' +
            '<li>Right path: ' + R + ', 2' + R + ' and 3' + R + ' carry the same current (the corners join only two wires): ' + R + ' + 2' + R + ' + 3' + R + ' = 6' + R + '.</li>' +
            '<li>These two branches connect the top node to the bottom wire, in parallel: 4' + R + ' // 6' + R + ' = 24' + R + '²/(10' + R + ') = 12' + R + '/5.</li></ol>',
          figs: [{ cap: 'Step 1: 2R + 2R = 4R in the middle; R + 2R + 3R = 6R on the right.' },
            { cap: 'Step 2: 4R // 6R = 12R/5, in series with R′.' }] },
        { t: 'Expression of R′',
          html: '<p>' + Rp + ' is in series with the block 12' + R + '/5, and ' + U + ' is the voltage of this block. Voltage divider:</p>' +
            '<p><span class="f-inline">' + U + ' = ' + fr('12' + R + '/5', Rp + ' + 12' + R + '/5') + ' ' + E + '</span></p>' +
            '<p>You want ' + U + ' = ' + E + '/4, so ' + Rp + ' + 12' + R + '/5 = 4 × 12' + R + '/5, that is ' + Rp + ' = 3 × 12' + R + '/5.</p>' +
            '<p><span class="f-inline">' + Rp + ' = ' + fr('36' + R, '5') + ' = 7.2' + R + '</span></p>' +
            '<p>Quick reasoning: ' + U + ' = ' + E + '/4 means that the block takes 1/4 of the voltage and ' + Rp + ' the other 3/4. So ' + Rp + ' is 3 times the block.</p>' },
        { t: 'Expression of U′',
          html: '<p>The path ' + R + ', 2' + R + ', 3' + R + ' (6' + R + ' in total) has the voltage ' + U + ' across it, and ' + Up + ' is the voltage of the right-hand 2' + R + ':</p>' +
            '<p><span class="f-inline">' + Up + ' = ' + fr('2' + R, '6' + R) + ' ' + U + ' = ' + fr(U, '3') + ' = ' + fr(E, '12') + '</span></p>' }
      ],
      answer: '<p>' + Rp + ' = 36' + R + '/5 = 7.2' + R + ' · ' + Up + ' = ' + E + '/12</p>',
      traps: [
        'Putting 3' + R + ' in parallel with the middle branch: ' + R + ', 2' + R + ' and 3' + R + ' carry the same current, they are in series.',
        'Taking ' + Up + ' for the voltage of the whole right path: the arrow ' + Up + ' only covers the vertical 2' + R + ', that is 2/6 of ' + U + '.',
        'Inverting the divider: the resistor across which you read ' + U + ' (the block 12' + R + '/5) goes in the numerator.'
      ]
    }
  };

  /* words drawn inside the diagrams and descriptions of the diagrams (aria), by French text */
  var LAB = { 'aucun courant': 'no current', 'courant E/(2R)': 'current E/(2R)', 'courant E/R': 'current E/R' };
  var ARIA = {
    'R2 en haut et R1 en dessous entre le fil de gauche et B, R3 vertical à droite, R4 et R5 en série au milieu, générateur E en bas':
      'R2 at the top and R1 below it between the left wire and B, R3 vertical on the right, R4 and R5 in series in the middle, generator E at the bottom',
    'Le circuit avec ses trois nœuds A, B et C':
      'The circuit with its three nodes A, B and C',
    'Circuit du TD 1 Ex 1 après regroupement des résistances':
      'Circuit of TD 1 Ex 1 after grouping the resistors',
    'Générateur E qui alimente une seule résistance équivalente 3R/2':
      'Generator E feeding a single equivalent resistance 3R/2',
    'Trois étages : R1 et R2 en haut, R3, R4, R5 au milieu, générateur E en bas ; flèches U6 et U7 entre le point du haut et les points du milieu':
      'Three levels: R1 and R2 at the top, R3, R4, R5 in the middle, generator E at the bottom; arrows U6 and U7 between the top point and the middle points',
    'Le même circuit avec les points A, B, C, D et F placés':
      'The same circuit with the points A, B, C, D and F placed',
    'Générateur E à gauche, R1 en haut, R2 à droite ; U1 fléchée vers la gauche, U2 vers le haut, courant I vers la droite':
      'Generator E on the left, R1 at the top, R2 on the right; U1 drawn to the left, U2 upward, current I to the right',
    'Générateur E qui alimente la seule résistance Req = R1 + R2, parcourue par I':
      'Generator E feeding the single resistance Req = R1 + R2, which carries I',
    'Source de courant I à gauche, R1 et R2 en parallèle ; courants I1 et I2 vers le bas, tension U vers le haut':
      'Current source I on the left, R1 and R2 in parallel; currents I1 and I2 downward, voltage U upward',
    'Source de courant I qui alimente la seule résistance Req ; la tension U est toujours fléchée':
      'Current source I feeding the single resistance Req; the voltage U is still drawn',
    'Générateur E en série avec R, qui alimente la charge RC ; tension U aux bornes de RC':
      'Generator E in series with R, feeding the load RC; voltage U across RC',
    'Boîte noire en pointillés contenant E, R1 et R2 ; bornes A et B à droite':
      'Dashed black box containing E, R1 and R2; terminals A and B on the right',
    'Voltmètre branché entre A et B':
      'Voltmeter connected between A and B',
    'Ampèremètre branché entre A et B, R2 court-circuitée':
      'Ammeter connected between A and B, R2 short-circuited',
    'Générateur E ; en haut, R en parallèle avec l’interrupteur K1 ; à droite, l’interrupteur K2 en série avec R ; U aux bornes de K2 et R':
      'Generator E; at the top, R in parallel with the switch K1; on the right, the switch K2 in series with R; U across K2 and R',
    'Source de courant I, puis une échelle : 2R vertical, R en haut, 2R vertical, R en haut, R vertical ; U1, U2, U3 aux bornes des résistances verticales':
      'Current source I, then a ladder: vertical 2R, R at the top, vertical 2R, R at the top, vertical R; U1, U2, U3 across the vertical resistors',
    'Échelle après réduction du dernier étage : un bloc R à la place des deux derniers étages':
      'Ladder after reducing the last stage: a block R instead of the last two stages',
    'La source de courant I alimente une seule résistance équivalente R':
      'The current source I feeds a single equivalent resistance R',
    'Générateur E à gauche ; au milieu, source de courant I1 (flèche vers le haut) au-dessus de R1, avec U aux bornes de la source ; R2 à droite ; courant I sur le fil du haut':
      'Generator E on the left; in the middle, current source I1 (arrow pointing up) above R1, with U across the source; R2 on the right; current I on the top wire',
    'Le circuit avec la tension de R1 fléchée vers le bas et le courant E/R2 dans R2':
      'The circuit with the voltage of R1 drawn downward and the current E/R2 in R2',
    'Générateur E, R′ en série, puis au nœud : 2R et 2R vers le bas, et R, 2R, 3R en chemin vers la droite ; U aux bornes de la branche du milieu, U′ aux bornes de la 2R de droite':
      'Generator E, R′ in series, then at the node: 2R and 2R going down, and R, 2R, 3R along a path to the right; U across the middle branch, U′ across the right-hand 2R',
    'Branche du milieu réduite à 4R, chemin de droite réduit à 6R':
      'Middle branch reduced to 4R, right path reduced to 6R',
    'R′ en série avec un seul bloc 12R/5, U aux bornes du bloc':
      'R′ in series with a single block 12R/5, U across the block'
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
