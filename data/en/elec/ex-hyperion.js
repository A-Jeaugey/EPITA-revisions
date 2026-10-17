/* English text for data/elec/ex-hyperion.js (merged by id over the French file).
   Old EPITA S1 TDs archived on HyperAnnales (TD 1 to 3, guided study no. 1, end-of-semester exam of January 2018).
   Same helpers as the French file, so the HTML stays identical; circuit specs are not repeated, only their
   aria-label and the few words drawn in them (“wire”, “open”). */
(function () {
  function sb(s) { return s === undefined || s === '' ? '' : '<sub>' + s + '</sub>'; }
  function R(s) { return '<var>R</var>' + sb(s); }
  function E(s) { return '<var class="u">E</var>' + sb(s); }
  function U(s) { return '<var class="u">U</var>' + sb(s); }
  function I(s) { return '<var class="i">I</var>' + sb(s); }
  function V(s) { return '<var class="v">V</var>' + sb(s); }
  function F(a, b) { return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  var UV = '<var class="u">V</var>';   /* voltage named V in some statements (not a potential) */
  var Rp = '<var>R′</var>', Up = '<var class="u">U′</var>', Upp = '<var class="u">U″</var>';
  var Rr = '<var>r</var>';
  var td1q = 'Determine the resistance seen from points A and B.';
  var td2e1 = '<p><b>Exercise 1:</b> <i>Give the literal expression before the numerical application</i></p>';
  var td2e2 = '<p><b>Exercise 2:</b> <i>Give the literal expression before the numerical application</i></p>';
  var td3s = '<p><b>Superposition theorem</b></p>', td3t = '<p><b>Thévenin’s theorem</b></p>', td3n = '<p><b>Norton’s theorem</b> · <b>Exercise 5:</b></p>';
  var pa1 = '<p><b>Exercise 1.</b> Course questions: MCQ (6 points – no negative marking)</p><p>Circle the correct answer(s).</p>';
  /* patch for a drawn part: n parts, only the listed indexes change */
  function parts(n, map) { var a = []; for (var i = 0; i < n; i++) a.push(map[i] || null); return a; }

  REV.i18n.patch(window.ELEC_EX, {

    /* ===================== TD 1: combining resistors ===================== */
    'hyp-td1-ex1a': {
      src: 'Old TD 1 · Ex 1 · a)', title: 'Resistance seen from A and B: two paths from the same node',
      figs: [{ alt: 'Network a): R between A and a node; from this node, 2R then 2R go down to the wire of B, and R, 2R, 3R in series go around the right side to the wire of B', cap: 'Network a)' }],
      questions: ['<b>a)</b> ' + td1q],
      hints: ['A is connected only to the first resistor <var>R</var>. Call C the node it leads to: everything else lies between C and the wire of B.',
        'From C, count the paths that reach the wire of B. Add up the resistances along each path (series), then put the paths in parallel.'],
      solution: [
        { t: 'Find the paths', html: '<p>Call C the top node, between the first <var>R</var> and the vertical branch. From C, two paths reach the bottom wire, which is connected to B:</p><ul><li>the middle branch: 2' + R() + ' + 2' + R() + ' = 4' + R() + ' (series);</li><li>the path around the right side: ' + R() + ' + 2' + R() + ' + 3' + R() + ' = 6' + R() + ' (series: a single wire, no junction).</li></ul>',
          figs: [{ spec: { aria: 'R between A and C, then 4R and 6R in parallel between C and the wire of B' }, cap: 'Network a) redrawn' }] },
        { t: 'Combine', html: '<p>The two paths are in parallel between C and B:</p><p>4' + R() + ' // 6' + R() + ' = ' + F('4' + R() + ' × 6' + R(), '4' + R() + ' + 6' + R()) + ' = ' + F('24' + R() + '²', '10' + R()) + ' = ' + F('12' + R(), '5') + '.</p><p>Then the first ' + R() + ' is in series: ' + R('AB') + ' = ' + R() + ' + ' + F('12' + R(), '5') + ' = ' + F('17' + R(), '5') + ' = 3.4' + R() + '.</p>' }
      ],
      answer: '<p>' + R('AB') + ' = 17' + R() + '/5 = 3.4' + R() + '</p>',
      traps: ['The bottom 3' + R() + ' is not connected to B on its own: it ends the path around the right side (' + R() + ' + 2' + R() + ' + 3' + R() + '), which only reaches the wire of B after it.',
        'The ' + R() + ' between A and C is not part of any parallel combination: all the current entering at A flows through it.']
    },

    'hyp-td1-ex1b': {
      src: 'Old TD 1 · Ex 1 · b)', title: 'Resistance seen from A and B: a ladder that reduces to R',
      figs: [{ alt: 'Network b): 2R directly between A and B, then R at the top towards a node, 2R going down, R at the top and a vertical R at the end', cap: 'Network b)' }],
      questions: ['<b>b)</b> ' + td1q],
      hints: ['Start from the end farthest from A and B, on the right, and work back towards A and B.',
        'At each step, two equal resistors in parallel are worth half of one.'],
      solution: [
        { t: 'Reduce from the right', html: '<ol><li>The two ' + R() + ' at the right end (the top one and the vertical one) are in series: 2' + R() + '.</li><li>This 2' + R() + ' is in parallel with the vertical 2' + R() + ' in the middle: 2' + R() + ' // 2' + R() + ' = ' + R() + '.</li><li>Add the top ' + R() + ', in series: ' + R() + ' + ' + R() + ' = 2' + R() + '.</li><li>Finally, the 2' + R() + ' on the left is directly between A and B, in parallel with everything else: 2' + R() + ' // 2' + R() + ' = ' + R() + '.</li></ol>' }
      ],
      answer: '<p>' + R('AB') + ' = ' + R() + '</p>',
      traps: ['The 2' + R() + ' on the left is connected directly between A and B: it goes in parallel last, across the rest of the network.']
    },

    'hyp-td1-ex1c': {
      src: 'Old TD 1 · Ex 1 · c)', title: 'Resistance seen from A and B: terminals on the right of the network',
      figs: [{ alt: 'Network c): A and B on the right, a vertical R directly between A and B; going left, R at the top, a vertical 2R, R at the top and a vertical 2R at the end', cap: 'Network c)' }],
      questions: ['<b>c)</b> ' + td1q],
      hints: ['Here A and B are on the right: the “far” end is on the left. Reduce from left to right.',
        'Keep the fractions: the last step is ' + R() + ' in parallel with 11' + R() + '/5.'],
      solution: [
        { t: 'Reduce from the left', html: '<ol><li>The vertical 2' + R() + ' on the left and the top-left ' + R() + ' are in series: 3' + R() + '.</li><li>In parallel with the middle 2' + R() + ': 3' + R() + ' // 2' + R() + ' = ' + F('3' + R() + ' × 2' + R(), '5' + R()) + ' = ' + F('6' + R(), '5') + '.</li><li>Add the top-right ' + R() + ', in series: ' + R() + ' + ' + F('6' + R(), '5') + ' = ' + F('11' + R(), '5') + '.</li><li>The vertical ' + R() + ' on the right is directly between A and B, in parallel: ' + R('AB') + ' = ' + F(R() + ' × 11' + R() + '/5', R() + ' + 11' + R() + '/5') + ' = ' + F('11' + R() + '²/5', '16' + R() + '/5') + ' = ' + F('11' + R(), '16') + '.</li></ol>' }
      ],
      answer: '<p>' + R('AB') + ' = 11' + R() + '/16 ≈ 0.69' + R() + '</p>',
      traps: ['An equivalent resistance smaller than the smallest resistor of the last parallel combination (here ' + R() + ') is normal: a parallel combination is always less than each of its branches.',
        'Do not start with the ' + R() + ' between A and B: it is combined last.']
    },

    'hyp-td1-ex1d': {
      src: 'Old TD 1 · Ex 1 · d)', title: 'Resistance seen from A and B: three 4R on the same wire',
      figs: [{ alt: 'Network d): a vertical wire on the left connected by three 4R to the rest; two vertical 2R between the wire of A and the wire of B', cap: 'Network d)' }],
      questions: ['<b>d)</b> ' + td1q],
      hints: ['The whole vertical wire on the left is a single node: call it L. Look at where the other end of each 4' + R() + ' arrives.',
        'The vertical wire going down from the top wire to the middle 2' + R() + ' is part of node A: so the middle 4' + R() + ' arrives at A.',
        'Between A and L, two 4' + R() + ' in parallel; between L and B, one 4' + R() + '. This path is then in parallel with the two 2' + R() + '.'],
      solution: [
        { t: 'Find the nodes', html: '<ul><li>The vertical wire on the left is a single node L.</li><li>The top 4' + R() + ' goes from L to the top wire, connected to A. The middle 4' + R() + ' goes from L to the vertical wire that comes down from the top wire: that is A too.</li><li>The bottom 4' + R() + ' goes from L to the bottom wire, connected to B.</li><li>The two vertical 2' + R() + ' each connect the wire of A to the wire of B.</li></ul>',
          figs: [{ spec: { aria: 'Two 4R in parallel between A and L, 4R between L and B, and two 2R between A and B' }, cap: 'Network d) redrawn between A and B' }] },
        { t: 'Combine', html: '<ol><li>The two 4' + R() + ' between A and L: 4' + R() + ' // 4' + R() + ' = 2' + R() + '.</li><li>In series with the 4' + R() + ' between L and B (L has no other branch): 2' + R() + ' + 4' + R() + ' = 6' + R() + '.</li><li>In parallel with the two 2' + R() + ': ' + F('1', R('AB')) + ' = ' + F('1', '6' + R()) + ' + ' + F('1', '2' + R()) + ' + ' + F('1', '2' + R()) + ' = ' + F('1 + 3 + 3', '6' + R()) + ' = ' + F('7', '6' + R()) + '.</li></ol>' }
      ],
      answer: '<p>' + R('AB') + ' = 6' + R() + '/7 ≈ 0.86' + R() + '</p>',
      traps: ['The three 4' + R() + ' are not in parallel: two arrive at A, the third at B.',
        'The short vertical wire above the middle 2' + R() + ' connects the middle 4' + R() + ' to the top wire: without it, you would think this 4' + R() + ' arrives at an isolated node.']
    },

    'hyp-td1-ex1e': {
      src: 'Old TD 1 · Ex 1 · e)', title: 'Resistance seen from A and B: a network with a diagonal',
      figs: [{ alt: 'Network e): A connected by a wire to a top node; R at the top and R on the right down to the bottom-right corner, 2R diagonal to that corner, vertical 3R, 2R at the bottom, and 2R between B and the bottom node', cap: 'Network e)' }],
      questions: ['<b>e)</b> ' + td1q],
      hints: ['A is connected by a plain wire to the top node from which the 3' + R() + ', the diagonal 2' + R() + ' and the top ' + R() + ' start.',
        'The diagonal 2' + R() + ' and the path ' + R() + ' + ' + R() + ' (through the top-right corner) connect the same two points: A and the bottom-right corner S.',
        'Next come the bottom 2' + R() + ', then the 3' + R() + ' in parallel, then the 2' + R() + ' that goes to B.'],
      solution: [
        { t: 'The triangle on the right', html: '<p>Call S the bottom-right corner and T the bottom-middle node (below the 3' + R() + '). Between A and S, two paths:</p><ul><li>the top ' + R() + ' then the right-hand ' + R() + ': 2' + R() + ';</li><li>the diagonal: 2' + R() + '.</li></ul><p>In parallel: 2' + R() + ' // 2' + R() + ' = ' + R() + '.</p>',
          figs: [{ spec: { aria: 'B, 2R, node T; from T, 3R to A and 2R to S; between S and A, the equivalent R' }, cap: 'After the first reduction' }] },
        { t: 'Finish the reduction', html: '<ol><li>Between T and A through S: 2' + R() + ' + ' + R() + ' = 3' + R() + '.</li><li>In parallel with the vertical 3' + R() + ' (from T to A): 3' + R() + ' // 3' + R() + ' = ' + F('3' + R(), '2') + '.</li><li>In series with the 2' + R() + ' between B and T: ' + R('AB') + ' = 2' + R() + ' + ' + F('3' + R(), '2') + ' = ' + F('7' + R(), '2') + '.</li></ol>' }
      ],
      answer: '<p>' + R('AB') + ' = 7' + R() + '/2 = 3.5' + R() + '</p>',
      traps: ['The diagonal is not “separate”: its two ends are A and S, exactly like the path ' + R() + ' + ' + R() + ' through the top-right corner.',
        'The 2' + R() + ' between B and T is in series with everything else: it is added at the end.']
    },

    'hyp-td1-ex2': {
      src: 'Old TD 1 · Ex 2', title: 'Grid of four squares: resistance between a corner and the center',
      intro: '<p>The figure opposite shows a network made of a uniform wire of constant diameter. Its shape is a set of 4 squares. Let ' + R() + ' be the resistance of each side.</p>',
      figs: [{ alt: 'Grid of 2 by 2 squares: corners A top left, B top right, C bottom left, D bottom right, O at the center; each side of a small square is R', cap: 'The network (12 sides of resistance R)' }],
      questions: ['Calculate the resistance of the network between <i>A</i> and <i>O</i>.'],
      hints: ['No resistor is simply in series or in parallel: first simplify the network using its symmetry.',
        'The network is symmetric about the diagonal through A, O and D. Two symmetric points are at the same potential when the current enters at A and leaves at O.',
        'Points at the same potential can be joined by a wire without changing anything. Join them in pairs, then reduce.'],
      solution: [
        { t: 'Use the symmetry', html: '<p>Name the midpoints of the sides: E (top), F (left), G (right), H (bottom). Let a current enter at A and leave at O. The network, A and O are symmetric about the diagonal AOD: the mirror image of E is F, that of B is C, that of G is H.</p><p>So two symmetric points are at the same potential: ' + V('E') + ' = ' + V('F') + ', ' + V('B') + ' = ' + V('C') + ', ' + V('G') + ' = ' + V('H') + '. You can join each pair with a wire: no current would flow through it.</p>' },
        { t: 'Group the resistors', html: '<p>After merging, each pair of symmetric sides connects the same nodes, so they are in parallel: ' + R() + ' // ' + R() + ' = ' + R() + '/2.</p><ul><li>A–(E,F): AE and AF → ' + R() + '/2;</li><li>(E,F)–O: EO and FO → ' + R() + '/2;</li><li>(E,F)–(B,C): EB and FC → ' + R() + '/2;</li><li>(B,C)–(G,H): BG and CH → ' + R() + '/2;</li><li>(G,H)–O: GO and HO → ' + R() + '/2;</li><li>(G,H)–D: GD and HD → ' + R() + '/2, but D is connected to nothing else: no current, so you can ignore it.</li></ul>',
          figs: [{ spec: { aria: 'A, R/2 to node EF; from EF, R/2 to O and a chain of three R/2 that comes back to O; branch R/2 to D carrying no current' }, cap: 'Network after merging the symmetric points' }] },
        { t: 'Reduce', html: '<ol><li>Chain (E,F) → (B,C) → (G,H) → O: ' + R() + '/2 + ' + R() + '/2 + ' + R() + '/2 = 3' + R() + '/2.</li><li>In parallel with ' + R() + '/2 (from (E,F) to O): ' + F('(' + R() + '/2) × (3' + R() + '/2)', R() + '/2 + 3' + R() + '/2') + ' = ' + F('3' + R() + '²/4', '2' + R()) + ' = ' + F('3' + R(), '8') + '.</li><li>In series with ' + R() + '/2 between A and (E,F): ' + R('AO') + ' = ' + F('4' + R(), '8') + ' + ' + F('3' + R(), '8') + ' = ' + F('7' + R(), '8') + '.</li></ol>' }
      ],
      answer: '<p>' + R('AO') + ' = 7' + R() + '/8</p>',
      traps: ['You may only join points at the same potential with a wire. Here the symmetry of the whole setup (network and points A, O) guarantees it.',
        'Forgetting that D is a dead end: once G and H are merged, the two sides going to D carry no current.']
    },

    /* ===================== TD 2: fundamental laws (Kirchhoff’s laws) ===================== */
    'hyp-td2-ex1-q1': {
      src: 'Old TD 2 · Ex 1 · Q1', title: 'One loop, two voltage sources pulling against each other',
      intro: td2e1 + '<p>' + E(1) + ' = 10 V; ' + E(2) + ' = 15 V; ' + R() + ' = 1 kΩ</p>',
      figs: [{ alt: 'A single loop: R and E1 on the top wire, E2 on the bottom wire; the arrows of E1 and E2 point to the left; I is drawn downwards on the left wire', cap: 'Question 1' }],
      questions: ['<b>1)</b> Calculate ' + I()],
      hints: ['There is only one loop: the same current ' + I() + ' flows through ' + R() + ', ' + E(1) + ' and ' + E(2) + '. Find the direction in which it flows through ' + R() + '.',
        'Write Kirchhoff’s voltage law going around in the direction of ' + I() + ': an arrow along the path counts +, an arrow against it counts −. For ' + R() + ', draw the arrow with the receiver convention.'],
      solution: [
        { t: 'Direction of the current', html: '<p>A single loop: the same current ' + I() + ' flows everywhere. Drawn downwards on the left wire, it goes through ' + E(2) + ' from left to right, rises on the right, then goes through ' + E(1) + ' and ' + R() + ' from right to left (counterclockwise).</p><p>With the receiver convention, the arrow of ' + U('R') + ' is opposite to the current: it points to the right, and ' + U('R') + ' = ' + R() + I() + '.</p>' },
        { t: 'Kirchhoff’s voltage law', html: '<p>Go around in the direction of ' + I() + ': an arrow along the path counts +, an arrow against it counts −.</p><ul><li>' + E(2) + ': arrow to the left, traveled from left to right: −' + E(2) + ';</li><li>' + E(1) + ': arrow to the left, traveled from right to left: +' + E(1) + ';</li><li>' + U('R') + ': arrow to the right, traveled from right to left: −' + U('R') + '.</li></ul><p>−' + E(2) + ' + ' + E(1) + ' − ' + R() + I() + ' = 0, so ' + I() + ' = ' + F(E(1) + ' − ' + E(2), R()) + '.</p>' },
        { t: 'Numerical application', html: '<p>' + I() + ' = ' + F('10 − 15', '1 kΩ') + ' = −5 mA.</p><p>The − sign means that the actual current flows the other way: ' + E(2) + ', the larger one, sets the direction.</p>' }
      ],
      answer: '<p>' + I() + ' = (' + E(1) + ' − ' + E(2) + ')/' + R() + ' = −5 mA</p>',
      traps: ['Both arrows point to the left, but the loop travels through ' + E(1) + ' and ' + E(2) + ' in opposite directions: their effects subtract.',
        'A negative current is not a mistake: the arrow of ' + I() + ' is a choice, the sign gives the actual direction.',
        'Units: V divided by kΩ gives mA.']
    },

    'hyp-td2-ex1-q2': {
      src: 'Old TD 2 · Ex 1 · Q2', title: 'Current source, resistor and voltage source in series',
      intro: td2e1 + '<p>' + I() + ' = 0.3 A; ' + E() + ' = 5 V; ' + R() + ' = 8 Ω</p>',
      figs: [{ alt: 'Bottom branch: current source I to the right, R, then source E; a wire at the top connects both ends. Below, U under the current source, E under the voltage source and V under R and E, all drawn to the left', cap: 'Question 2' }],
      questions: ['<b>2)</b> Calculate ' + U() + ' and ' + UV],
      hints: ['The current source sets ' + I() + ' in the whole loop, including in ' + R() + '.',
        'The arrow ' + UV + ' covers ' + R() + ' and ' + E() + ': add the two voltages. Then look at the top wire: it connects the two ends of the arrows ' + U() + ' and ' + UV + '.'],
      solution: [
        { t: 'Voltage across R', html: '<p>The current source sets ' + I() + ' = 0.3 A in the whole loop. In ' + R() + ', the current flows to the right; with the receiver convention, its voltage arrow points to the left, like those of ' + E() + ' and ' + UV + ':</p><p>' + U('R') + ' = ' + R() + I() + ' = 8 × 0.3 = 2.4 V.</p>' },
        { t: 'Calculating V', html: '<p>The arrow ' + UV + ' covers ' + R() + ' and the source ' + E() + ', and all three arrows point the same way: the voltages add up.</p><p>' + UV + ' = ' + U('R') + ' + ' + E() + ' = ' + R() + I() + ' + ' + E() + ' = 2.4 + 5 = 7.4 V.</p>' },
        { t: 'Calculating U', html: '<p>The top wire connects the input of the current source (on the left) to the output of ' + E() + ' (on the right): these two points have the same potential. So the arrows ' + U() + ' and ' + UV + ' close a loop on their own: ' + U() + ' + ' + UV + ' = 0.</p><p>' + U() + ' = −' + UV + ' = −(' + R() + I() + ' + ' + E() + ') = −7.4 V.</p><p>The archived handwritten solution writes the loop as “E + U<sub>R</sub> + V = 0”, which would give ' + UV + ' = −7.4 V: with its own arrows, it is ' + UV + ' = ' + E() + ' + ' + U('R') + '. Its final values are nevertheless correct.</p>' },
        { t: 'Going further: who supplies the energy?', html: '<p>For the current source, ' + I() + ' (to the right) and ' + U() + ' (to the left) follow the receiver convention: it receives ' + U() + I() + ' = −7.4 × 0.3 = −2.22 W, so it supplies 2.22 W and works as a generator. The source ' + E() + ' is crossed from its + to its −: it receives ' + E() + I() + ' = 1.5 W. The resistor dissipates ' + R() + I() + '² = 0.72 W. Balance: 1.5 + 0.72 = 2.22 W.</p>' }
      ],
      answer: '<p>' + UV + ' = ' + R() + I() + ' + ' + E() + ' = 7.4 V; ' + U() + ' = −(' + R() + I() + ' + ' + E() + ') = −7.4 V</p>',
      traps: ['The voltage across a current source is not given: the rest of the circuit sets it.',
        'The top wire closes the loop: ' + U() + ' and ' + UV + ' are not independent, ' + U() + ' = −' + UV + '.']
    },

    'hyp-td2-ex1-q3': {
      src: 'Old TD 2 · Ex 1 · Q3', title: 'Choosing E2 to set the current',
      intro: td2e1 + '<p>' + E(1) + ' = 30 V; ' + R() + ' = 2 kΩ</p>',
      figs: [{ alt: 'A loop: E1 on the left with its arrow pointing up, R at the top with I to the right, E2 on the right with its arrow pointing down', cap: 'Question 3' }],
      questions: ['<b>3)</b> Calculate ' + E(2) + ' so that <b>a)</b> ' + I() + ' = 10 mA <b>b)</b> ' + I() + ' = 0'],
      hints: ['Take the bottom wire at 0 V and write the potential of both ends of ' + R() + '.',
        'The arrow of ' + E(2) + ' points down: its + is at the bottom, so the top of ' + E(2) + ' is at −' + E(2) + '.'],
      solution: [
        { t: 'Potentials', html: '<p>Bottom wire: 0 V. The arrow of ' + E(1) + ' points up: the top of ' + E(1) + ' is at ' + E(1) + '. The arrow of ' + E(2) + ' points down: the + of ' + E(2) + ' is at the bottom, so its top is at −' + E(2) + '.</p>' },
        { t: 'Ohm’s law in R', html: '<p>' + I() + ' flows through ' + R() + ' from left to right: ' + R() + I() + ' = ' + V('left') + ' − ' + V('right') + ' = ' + E(1) + ' − (−' + E(2) + ') = ' + E(1) + ' + ' + E(2) + '.</p><p>Both sources push the current the same way (clockwise). Hence ' + E(2) + ' = ' + R() + I() + ' − ' + E(1) + '.</p><p>The archived handwritten solution writes “E1 + U<sub>R</sub> + E2 = 0” with ' + U('R') + ' drawn to the left: the correct sign is ' + E(1) + ' − ' + U('R') + ' + ' + E(2) + ' = 0. Its final value is correct.</p>' },
        { t: 'Numerical applications', html: '<p><b>a)</b> ' + E(2) + ' = 2 kΩ × 10 mA − 30 = 20 − 30 = −10 V.</p><p><b>b)</b> ' + E(2) + ' = 0 − 30 = −30 V.</p><p>' + E(2) + ' is negative: its actual polarity is the reverse of its arrow (+ at the top). In b), a 30 V source with its + at the top exactly opposes ' + E(1) + ': no more current.</p>' }
      ],
      answer: '<p>' + E(2) + ' = ' + R() + I() + ' − ' + E(1) + ': a) −10 V; b) −30 V</p>',
      traps: ['With the arrow of ' + E(2) + ' pointing down, both sources push the same way: ' + R() + I() + ' = ' + E(1) + ' + ' + E(2) + ', not ' + E(1) + ' − ' + E(2) + '.',
        'A negative ' + E(2) + ' is a correct answer: the actual polarity is the reverse of the arrow’s.',
        'kΩ × mA = V: 2 kΩ × 10 mA = 20 V.']
    },

    'hyp-td2-ex1-q4': {
      src: 'Old TD 2 · Ex 1 · Q4', title: 'Finding E and R of a real generator from two measurements',
      intro: td2e1,
      figs: [{ alt: 'Real generator: E with its arrow pointing up and R at the top, load RC on the right, U drawn upwards across RC', cap: 'Question 4' }],
      questions: ['<b>4)</b> The generator (' + E() + ', ' + R() + ') gives ' + U() + ' = 80 V if ' + R('C') + ' = 8 Ω and twice that if ' + R('C') + ' = 32 Ω. Calculate ' + E() + ' and ' + R()],
      hints: ['In each case, first calculate the current ' + I() + ' = ' + U() + '/' + R('C') + '.',
        'For a real generator, ' + U() + ' = ' + E() + ' − ' + R() + I() + '. The two cases give two equations with two unknowns.'],
      solution: [
        { t: 'The current in each case', html: '<p>A single loop, so ' + I() + ' = ' + U() + '/' + R('C') + '.</p><ul><li>Case 1: ' + U() + ' = 80 V and ' + R('C') + ' = 8 Ω, so ' + I() + ' = 10 A.</li><li>Case 2: ' + U() + ' = 160 V and ' + R('C') + ' = 32 Ω, so ' + I() + ' = 5 A.</li></ul>' },
        { t: 'Generator equation', html: '<p>Kirchhoff’s voltage law: ' + U() + ' = ' + E() + ' − ' + R() + I() + ' (the internal resistance takes ' + R() + I() + ').</p><ul><li>Case 1: 80 = ' + E() + ' − 10' + R() + '.</li><li>Case 2: 160 = ' + E() + ' − 5' + R() + '.</li></ul><p>Subtract: 160 − 80 = 10' + R() + ' − 5' + R() + ', so 5' + R() + ' = 80 and ' + R() + ' = 16 Ω. Then ' + E() + ' = 80 + 10 × 16 = 240 V.</p>' },
        { t: 'Check', html: '<p>Voltage divider: ' + U() + ' = ' + E() + R('C') + '/(' + R() + ' + ' + R('C') + ').</p><ul><li>240 × 8/24 = 80 V;</li><li>240 × 32/48 = 160 V.</li></ul>' }
      ],
      answer: '<p>' + R() + ' = 16 Ω; ' + E() + ' = 240 V</p>',
      traps: ['“Twice that” refers to ' + U() + ': 160 V. The current, on the other hand, is halved (5 A instead of 10 A).',
        U() + ' is not equal to ' + E() + ': the drop ' + R() + I() + ' across the internal resistance depends on the current delivered.']
    },

    'hyp-td2-ex1-q5': {
      src: 'Old TD 2 · Ex 1 · Q5', title: 'Switch in series: the voltages with K open and K closed',
      intro: td2e1 + '<p>' + E() + ' = 10 V; ' + R(1) + ' = 3' + R(2) + '</p>',
      figs: [{ alt: 'E on the left with its arrow pointing up, R1 at the top with U1 drawn to the left, switch K then R2 on the right branch; U2 across R2, V across K and R2 together', cap: 'Question 5' }],
      questions: ['<b>5)</b> Calculate ' + U(1) + ', ' + U(2) + ' and ' + UV + ' depending on whether <i>K</i> is open or closed.'],
      hints: ['K open: no current flows in the loop. What, then, is the voltage across a resistor?',
        'K closed: the voltage across K is zero, and the loop becomes a voltage divider.'],
      solution: [
        { t: 'K open', html: '<p>The loop is broken: ' + I() + ' = 0. Ohm’s law: ' + U(1) + ' = ' + R(1) + ' × 0 = 0 and ' + U(2) + ' = ' + R(2) + ' × 0 = 0.</p><p>Kirchhoff’s voltage law: ' + UV + ' = ' + E() + ' − ' + U(1) + ' = ' + E() + ' = 10 V. The whole source voltage ends up across the open switch.</p>' },
        { t: 'K closed', html: '<p>' + U('K') + ' = 0: ' + E() + ', ' + R(1) + ' and ' + R(2) + ' are in series, ' + I() + ' = ' + E() + '/(' + R(1) + ' + ' + R(2) + ') = ' + E() + '/(4' + R(2) + '). The arrow of ' + U(1) + ' is opposite to the current (receiver convention): ' + U(1) + ' is positive.</p><ul><li>' + U(1) + ' = ' + E() + R(1) + '/(' + R(1) + ' + ' + R(2) + ') = 3' + E() + '/4 = 7.5 V;</li><li>' + U(2) + ' = ' + E() + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = ' + E() + '/4 = 2.5 V;</li><li>' + UV + ' = ' + U('K') + ' + ' + U(2) + ' = ' + U(2) + ' = 2.5 V.</li></ul>' }
      ],
      answer: '<p>K open: ' + U(1) + ' = ' + U(2) + ' = 0 and ' + UV + ' = ' + E() + ' = 10 V. K closed: ' + U(1) + ' = 3' + E() + '/4 = 7.5 V, ' + U(2) + ' = ' + UV + ' = ' + E() + '/4 = 2.5 V.</p>',
      traps: ['Open switch: the current is zero, not the voltage. Here, the voltage across K is ' + E() + '.',
        'The arrow ' + UV + ' covers K and ' + R(2) + ': when K is closed, ' + UV + ' = ' + U(2) + ', not ' + E() + '.',
        'Only the ratio ' + R(1) + ' = 3' + R(2) + ' matters: the value of ' + R(2) + ' is not needed.']
    },

    'hyp-td2-ex1-q6a': {
      src: 'Old TD 2 · Ex 1 · Q6', title: 'Two switches (left circuit): K2 short-circuits the output',
      intro: td2e1,
      figs: [{ alt: 'Left circuit: E, then R and K1 in series on the top wire; then a vertical R and a vertical K2 in parallel; U across K2', cap: 'Question 6, left circuit' }],
      questions: ['<b>6)</b> Calculate ' + U() + ' in the 4 possible cases and for the 2 circuits below: <i>here, the left circuit.</i>'],
      hints: ['K1 is in series with the source: if it is open, no current flows anywhere.',
        'K2 is connected directly across the output: when closed, it forces ' + U() + ' = 0.'],
      solution: [
        { t: 'The four cases', html: '<ul><li><b>K1 open, K2 open</b>: no current; nothing flows through the vertical ' + R() + ', ' + U() + ' = ' + R() + ' × 0 = 0.</li><li><b>K1 open, K2 closed</b>: ' + U() + ' = ' + U('K2') + ' = 0.</li><li><b>K1 closed, K2 open</b>: the two ' + R() + ' are in series across ' + E() + '; divider: ' + U() + ' = ' + E() + R() + '/(' + R() + ' + ' + R() + ') = ' + E() + '/2.</li><li><b>K1 closed, K2 closed</b>: K2 short-circuits the vertical ' + R() + '; ' + U() + ' = 0 (the current ' + E() + '/' + R() + ' flows through the top ' + R() + ' and through K2).</li></ul>' }
      ],
      answer: '<p>' + U() + ' = ' + E() + '/2 only if K1 is closed and K2 is open; ' + U() + ' = 0 in the other three cases.</p>',
      traps: ['K1 and K2 open: ' + U() + ' = 0, not ' + E() + '. The voltage ' + E() + ' ends up across K1, not across the output.']
    },

    'hyp-td2-ex1-q6b': {
      src: 'Old TD 2 · Ex 1 · Q6', title: 'Two switches (right circuit): K1 short-circuits a resistor',
      intro: td2e1,
      figs: [{ alt: 'Right circuit: E, then an R in parallel with K1 on the top wire; on the right, K2 then an R in series; U across K2 and R together', cap: 'Question 6, right circuit' }],
      questions: ['<b>6)</b> Calculate ' + U() + ' in the 4 possible cases and for the 2 circuits below: <i>here, the right circuit.</i>'],
      hints: ['The arrow ' + U() + ' covers K2 and the bottom ' + R() + ': ' + U() + ' = ' + E() + ' − (voltage across the top block).',
        'K1 closed short-circuits the top ' + R() + '; K2 open cuts off all current.'],
      solution: [
        { t: 'The four cases', html: '<p>Kirchhoff’s voltage law: ' + U() + ' = ' + E() + ' − ' + U('block') + ', where ' + U('block') + ' is the voltage across the block “' + R() + ' in parallel with K1”.</p><ul><li><b>K2 open</b> (K1 open or closed): no current, so ' + U('block') + ' = 0 and ' + U() + ' = ' + E() + '.</li><li><b>K1 open, K2 closed</b>: the two ' + R() + ' are in series; divider: ' + U() + ' = ' + E() + R() + '/(' + R() + ' + ' + R() + ') = ' + E() + '/2.</li><li><b>K1 closed, K2 closed</b>: K1 short-circuits the top ' + R() + ', ' + U('block') + ' = 0 and ' + U() + ' = ' + E() + '.</li></ul>' }
      ],
      answer: '<p>' + U() + ' = ' + E() + '/2 only if K1 is open and K2 is closed; ' + U() + ' = ' + E() + ' in the other three cases.</p>',
      traps: ['Here the arrow covers K2: K2 open gives ' + U() + ' = ' + E() + ' (voltage across the open switch), not ' + U() + ' = 0.',
        'K1 closed: the top ' + R() + ' is short-circuited and no longer counts in the divider.']
    },

    'hyp-td2-ex1-q7a': {
      src: 'Old TD 2 · Ex 1 · Q7', title: 'No-load output after a voltage divider',
      intro: td2e1 + '<p>' + E() + ' = 10 V; ' + R(1) + ' = 2 kΩ; ' + R(2) + ' = 8 kΩ; ' + R(3) + ' = 10 kΩ</p>',
      figs: [{ alt: 'E, R1 at the top, vertical R2, then R3 towards an open output terminal; U between the output terminals', cap: 'Question 7, left circuit' }],
      questions: ['<b>7)</b> Calculate ' + U() + ' for the following 2 circuits: <i>here, the left circuit.</i>'],
      hints: ['The output is open: what current flows through ' + R(3) + '?'],
      solution: [
        { t: 'No-load output', html: '<p>Nothing is connected to the output: no current in ' + R(3) + ', so no voltage across it. ' + U() + ' is the voltage across ' + R(2) + '.</p><p>' + R(1) + ' and ' + R(2) + ' carry the same current: voltage divider.</p><p>' + U() + ' = ' + F(E() + R(2), R(1) + ' + ' + R(2)) + ' = ' + F('10 × 8', '2 + 8') + ' = 8 V.</p>' }
      ],
      answer: '<p>' + U() + ' = ' + E() + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = 8 V</p>',
      traps: [R(3) + ' does not count: with an open output, no current flows through it.']
    },

    'hyp-td2-ex1-q7b': {
      src: 'Old TD 2 · Ex 1 · Q7', title: 'H-shaped no-load output: three useful resistors out of five',
      intro: td2e1 + '<p>' + E() + ' = 12 V</p>',
      figs: [{ alt: 'E on the left; an R on the top wire and an R on the bottom wire leading to a central vertical R; then an R at the top and an R at the bottom leading to the open output terminals; U between these terminals', cap: 'Question 7, right circuit' }],
      questions: ['<b>7)</b> Calculate ' + U() + ' for the following 2 circuits: <i>here, the right circuit.</i>'],
      hints: ['The two ' + R() + ' leading to the open output carry no current.', 'Only one loop remains: the top ' + R() + ', the vertical ' + R() + ', the bottom ' + R() + '.'],
      solution: [
        { t: 'No-load output', html: '<p>No current flows through the two output ' + R() + ': no voltage across them. So ' + U() + ' is the voltage across the central vertical ' + R() + '.</p><p>The loop ' + E() + ' → ' + R() + ' (top) → ' + R() + ' (vertical) → ' + R() + ' (bottom) is a voltage divider:</p><p>' + U() + ' = ' + F(E() + R(), '3' + R()) + ' = ' + F(E(), '3') + ' = 4 V.</p>' }
      ],
      answer: '<p>' + U() + ' = ' + E() + '/3 = 4 V</p>',
      traps: ['The ' + R() + ' on the bottom wire counts as much as the top one: they are in series in the same loop.',
        'The two output ' + R() + ' do not count (no current).']
    },

    'hyp-td2-ex2-q1': {
      src: 'Old TD 2 · Ex 2 · Q1', title: 'Resistance seen by a current source, then a current divider',
      intro: td2e2 + '<p>' + R(1) + ' = ' + R(3) + ' = 100 Ω; ' + R(2) + ' = 200 Ω; ' + R(4) + ' = 300 Ω; ' + I() + ' = 1 A</p>',
      figs: [{ alt: 'Current source I on the left (arrow pointing up), R1 at the top, vertical R2, then R3 at the top and vertical R4 on the right', cap: 'Question 1' }],
      questions: ['<b>1)</b> Calculate the equivalent resistance “seen” by the current generator and the currents in ' + R(2) + ' and ' + R(3) + '.'],
      hints: [R(3) + ' and ' + R(4) + ' are in series; together they are in parallel with ' + R(2) + '; ' + R(1) + ' is in series with the whole.',
        'At the node after ' + R(1) + ', the current ' + I() + ' splits between ' + R(2) + ' and the branch ' + R(3) + ' + ' + R(4) + ': current divider.'],
      solution: [
        { t: 'Resistance seen by the source', html: '<ol><li>' + R(3) + ' + ' + R(4) + ' = 400 Ω (series).</li><li>In parallel with ' + R(2) + ': ' + F('200 × 400', '200 + 400') + ' = ' + F('400', '3') + ' Ω.</li><li>In series with ' + R(1) + ': ' + R('eq') + ' = 100 + ' + F('400', '3') + ' = ' + F('700', '3') + ' Ω ≈ 233 Ω.</li></ol><p>Literal expression: ' + R('eq') + ' = ' + R(1) + ' + ' + F(R(2) + '(' + R(3) + ' + ' + R(4) + ')', R(2) + ' + ' + R(3) + ' + ' + R(4)) + '.</p>' },
        { t: 'Currents in R2 and R3', html: '<p>' + R(1) + ' is in series with the source: it carries ' + I() + ' = 1 A. At the node, ' + I() + ' splits between ' + R(2) + ' and the branch ' + R(3) + ' + ' + R(4) + '. Current divider (each branch gets the share proportional to the resistance of the other one):</p><ul><li>' + I(2) + ' = ' + I() + ' × ' + F(R(3) + ' + ' + R(4), R(2) + ' + ' + R(3) + ' + ' + R(4)) + ' = 1 × ' + F('400', '600') + ' = ' + F('2', '3') + ' A ≈ 0.67 A;</li><li>' + I(3) + ' = ' + I() + ' × ' + F(R(2), R(2) + ' + ' + R(3) + ' + ' + R(4)) + ' = 1 × ' + F('200', '600') + ' = ' + F('1', '3') + ' A ≈ 0.33 A.</li></ul><p>Check: ' + I(2) + ' + ' + I(3) + ' = 1 A.</p>' }
      ],
      answer: '<p>' + R('eq') + ' = 700/3 Ω ≈ 233 Ω; ' + I(2) + ' = 2/3 A ≈ 0.67 A; ' + I(3) + ' = 1/3 A ≈ 0.33 A</p>',
      traps: ['In a current divider, the larger share flows through the branch with the lower resistance (here ' + R(2) + ', 200 Ω against 400 Ω).',
        R(1) + ' carries the whole current ' + I() + ': it takes no part in the split.']
    },

    'hyp-td2-ex2-q2': {
      src: 'Old TD 2 · Ex 2 · Q2', title: 'Draw and calculate three currents',
      intro: td2e2 + '<p>' + E() + ' = 64 V; ' + R(1) + ' = 6.25 kΩ; ' + R(2) + ' = 10 kΩ; ' + R(3) + ' = 6 kΩ</p>',
      figs: [{ alt: 'E on the left, R1 at the top, then R2 and R3 vertical in parallel; U across R3', cap: 'Question 2' }],
      questions: ['<b>2)</b> Draw the arrows of the 3 currents and calculate them'],
      hints: ['Let ' + I(1) + ' leave the + of ' + E() + ' towards ' + R(1) + ', and let ' + I(2) + ' and ' + I(3) + ' flow down through ' + R(2) + ' and ' + R(3) + ': Kirchhoff’s current law gives ' + I(1) + ' = ' + I(2) + ' + ' + I(3) + '.',
        'Resistance seen by ' + E() + ': ' + R(1) + ' + ' + R(2) + ' // ' + R(3) + '. From it you get ' + I(1) + ', then the voltage ' + U() + ' shared by ' + R(2) + ' and ' + R(3) + '.'],
      solution: [
        { t: 'Draw the arrows', html: '<p>Choose ' + I(1) + ' leaving the + of ' + E() + ' and flowing through ' + R(1) + ', then ' + I(2) + ' and ' + I(3) + ' flowing down through ' + R(2) + ' and ' + R(3) + '. Kirchhoff’s current law: ' + I(1) + ' = ' + I(2) + ' + ' + I(3) + '.</p>',
          figs: [{ spec: { aria: 'Arrows: I1 in R1, I2 and I3 downwards in R2 and R3, U across R3' }, cap: 'One possible choice of arrows' }] },
        { t: 'Calculate', html: '<ol><li>' + R(2) + ' // ' + R(3) + ' = ' + F('10 × 6', '10 + 6') + ' = ' + F('60', '16') + ' = 3.75 kΩ.</li><li>' + R('eq') + ' = 6.25 + 3.75 = 10 kΩ, so ' + I(1) + ' = ' + F('64 V', '10 kΩ') + ' = 6.4 mA.</li><li>' + U() + ' = 3.75 kΩ × 6.4 mA = 24 V.</li><li>' + I(2) + ' = ' + U() + '/' + R(2) + ' = 24/10 = 2.4 mA and ' + I(3) + ' = ' + U() + '/' + R(3) + ' = 24/6 = 4 mA.</li></ol><p>Check: 2.4 + 4 = 6.4 mA. As literal expressions, with ' + R('D') + ' = ' + R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3) + ': ' + I(1) + ' = ' + E() + '(' + R(2) + ' + ' + R(3) + ')/' + R('D') + ', ' + I(2) + ' = ' + E() + R(3) + '/' + R('D') + ', ' + I(3) + ' = ' + E() + R(2) + '/' + R('D') + '.</p>' }
      ],
      answer: '<p>' + I(1) + ' = 6.4 mA; ' + I(2) + ' = 2.4 mA; ' + I(3) + ' = 4 mA (and ' + U() + ' = 24 V)</p>',
      traps: ['Drawing the arrows means choosing a direction for each current and sticking to it. With these directions, all three currents are positive.',
        'V/kΩ gives mA: no need to convert to amperes.']
    },

    'hyp-td2-ex2-q3': {
      src: 'Old TD 2 · Ex 2 · Q3', title: 'Choosing R′ so that U = E/4, then finding U′',
      intro: td2e2,
      figs: [{ alt: 'E, R′ at the top, then two vertical 2R in series with U across them; R at the top, vertical 2R on the right with U′, and 3R at the bottom going back to the bottom node', cap: 'Question 3' }],
      questions: ['<b>3)</b> Calculate ' + Rp + ' in terms of ' + R() + ' so that ' + U() + ' = ' + E() + '/4', 'Calculate ' + Up + ' in terms of ' + E() + '.'],
      hints: ['Below ' + Rp + ', two branches in parallel: 2' + R() + ' + 2' + R() + ', and ' + R() + ' + 2' + R() + ' + 3' + R() + ' (the bottom 3' + R() + ' belongs to the right-hand branch).',
        'Write ' + U() + ' with the voltage divider between ' + Rp + ' and this equivalent resistance, then solve ' + U() + ' = ' + E() + '/4.',
        'For ' + Up + ', use a second divider in the right-hand branch, which is across ' + U() + '.'],
      solution: [
        { t: 'Resistance below R′', html: '<ul><li>Middle branch: 2' + R() + ' + 2' + R() + ' = 4' + R() + ';</li><li>right-hand branch: ' + R() + ' + 2' + R() + ' + 3' + R() + ' = 6' + R() + ' (a single path, same current);</li><li>in parallel: 4' + R() + ' // 6' + R() + ' = ' + F('24' + R() + '²', '10' + R()) + ' = ' + F('12' + R(), '5') + '.</li></ul>',
          figs: [{ spec: { aria: 'Voltage divider: E, R′ then the equivalent resistance 12R/5 across which U is read' }, cap: 'What the source sees: a voltage divider' }] },
        { t: 'Condition U = E/4', html: '<p>Divider: ' + U() + ' = ' + E() + ' × ' + F('12' + R() + '/5', Rp + ' + 12' + R() + '/5') + '.</p><p>' + U() + ' = ' + E() + '/4 ⇔ ' + Rp + ' + ' + F('12' + R(), '5') + ' = 4 × ' + F('12' + R(), '5') + ' ⇔ ' + Rp + ' = 3 × ' + F('12' + R(), '5') + ' = ' + F('36' + R(), '5') + ' = 7.2' + R() + '.</p>' },
        { t: 'Calculating U′', html: '<p>The right-hand branch (' + R() + ', 2' + R() + ', 3' + R() + ' in series) is across ' + U() + '. ' + Up + ' is the voltage across its 2' + R() + ': voltage divider.</p><p>' + Up + ' = ' + U() + ' × ' + F('2' + R(), R() + ' + 2' + R() + ' + 3' + R()) + ' = ' + F(U(), '3') + ' = ' + F(E(), '12') + '.</p>' }
      ],
      answer: '<p>' + Rp + ' = 36' + R() + '/5 = 7.2' + R() + '; ' + Up + ' = ' + E() + '/12</p>',
      traps: ['The bottom 3' + R() + ' belongs to the right-hand branch: it only reaches the bottom node after the 2' + R() + '.',
        U() + ' = ' + E() + '/4 means that ' + Rp + ' takes three quarters of ' + E() + ': ' + Rp + ' is three times the resistance it feeds.']
    },

    'hyp-td2-ex2-q4': {
      src: 'Old TD 2 · Ex 2 · Q4', title: 'Current source in series with R1 in the middle of the circuit',
      intro: td2e2 + '<p>' + E() + ' = 15 V; ' + R(1) + ' = 200 Ω; ' + R(2) + ' = 100 Ω; ' + I(1) + ' = 0.1 A</p>',
      figs: [{ alt: 'E on the left; top wire with I to the right; middle branch: current source I1 pointing up, U across it, then R1 below; R2 on the right', cap: 'Question 4' }],
      questions: ['<b>4)</b> Calculate ' + U() + ' and ' + I()],
      hints: ['Bottom wire at 0 V: the top wire is connected to the + of E, so it is at ' + E() + '. This gives you the current in ' + R(2) + ' directly.',
        'Kirchhoff’s current law on the top wire for ' + I() + '. For ' + U() + ', find the potential of the point between the source and ' + R(1) + ': ' + I(1) + ' flows through ' + R(1) + '.'],
      solution: [
        { t: 'Current I', html: '<p>Bottom wire: 0 V. The top wire is connected to the + of ' + E() + ': it is at ' + E() + ' = 15 V. In ' + R(2) + ' (downwards): ' + I('R2') + ' = ' + E() + '/' + R(2) + ' = 15/100 = 0.15 A.</p><p>Kirchhoff’s current law on the top wire: ' + I() + ' + ' + I(1) + ' = ' + I('R2') + ', so ' + I() + ' = ' + E() + '/' + R(2) + ' − ' + I(1) + ' = 0.15 − 0.1 = 0.05 A = 50 mA.</p>' },
        { t: 'Voltage U', html: '<p>The middle branch forces ' + I(1) + ' upwards: ' + I(1) + ' flows up through ' + R(1) + '. So the point M between the source and ' + R(1) + ' is lower than the bottom wire: ' + V('M') + ' = 0 − ' + R(1) + I(1) + ' = −20 V.</p><p>' + U() + ' is drawn upwards across the source alone: ' + U() + ' = ' + E() + ' − ' + V('M') + ' = ' + E() + ' + ' + R(1) + I(1) + ' = 15 + 20 = 35 V.</p>' }
      ],
      answer: '<p>' + U() + ' = ' + E() + ' + ' + R(1) + I(1) + ' = 35 V; ' + I() + ' = ' + E() + '/' + R(2) + ' − ' + I(1) + ' = 50 mA</p>',
      traps: [R(1) + ', in series with the current source, does not change the branch current, but it does change the voltage ' + U() + ' across the source.',
        U() + ' is drawn across the source only, not across the source and ' + R(1) + ' together (otherwise you would find ' + E() + ').']
    },

    'hyp-td2-ex2-q5': {
      src: 'Old TD 2 · Ex 2 · Q5', title: 'Three branches in parallel, two sources: the voltage U',
      intro: td2e2 + '<p>' + E(1) + ' = 10 V; ' + E(2) + ' = 20 V; ' + R(1) + ' = 2 kΩ; ' + R(2) + ' = 5 kΩ; ' + R(3) + ' = 10 kΩ</p>',
      figs: [{ alt: 'Three branches between the top wire and the bottom wire: R1 above E1 (arrow pointing up), E2 (arrow pointing down) above R2, and R3 with U drawn upwards', cap: 'Question 5' }],
      questions: ['<b>5)</b> Calculate ' + U()],
      hints: ['Bottom wire at 0 V, top wire at ' + U() + ': write the current of each branch in terms of ' + U() + '.',
        'The + of ' + E(2) + ' is at the bottom (arrow pointing down): the point between ' + E(2) + ' and ' + R(2) + ' is at ' + U() + ' + ' + E(2) + '.',
        'Kirchhoff’s current law on the top wire, then isolate ' + U() + '.'],
      solution: [
        { t: 'Current in each branch', html: '<p>Bottom wire: 0 V; top wire: ' + U() + '.</p><ul><li>Left branch: the top of ' + E(1) + ' is at ' + E(1) + '; the current flowing up through ' + R(1) + ' is ' + I(1) + ' = (' + E(1) + ' − ' + U() + ')/' + R(1) + '.</li><li>Middle branch: the + of ' + E(2) + ' is at the bottom, the point between ' + E(2) + ' and ' + R(2) + ' is at ' + U() + ' + ' + E(2) + '; the current flowing down through ' + R(2) + ' is ' + I(2) + ' = (' + U() + ' + ' + E(2) + ')/' + R(2) + '.</li><li>Right branch: ' + I(3) + ' = ' + U() + '/' + R(3) + ' downwards.</li></ul>' },
        { t: 'Kirchhoff’s current law', html: '<p>' + I(1) + ' = ' + I(2) + ' + ' + I(3) + ': ' + F(E(1) + ' − ' + U(), R(1)) + ' = ' + F(U() + ' + ' + E(2), R(2)) + ' + ' + F(U(), R(3)) + '.</p><p>Group the ' + U() + ' terms: ' + U() + ' (' + F('1', R(1)) + ' + ' + F('1', R(2)) + ' + ' + F('1', R(3)) + ') = ' + F(E(1), R(1)) + ' − ' + F(E(2), R(2)) + ', hence ' + U() + ' = ' + F(E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2), '1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3)) + ' = ' + F(R(3) + '(' + R(2) + E(1) + ' − ' + R(1) + E(2) + ')', R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3)) + '.</p><p>This is Millman’s formula (lesson 3), found again with Kirchhoff’s current law.</p>' },
        { t: 'Numerical application', html: '<p>In kΩ and mA: ' + E(1) + '/' + R(1) + ' = 10/2 = 5 mA; ' + E(2) + '/' + R(2) + ' = 20/5 = 4 mA; 1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3) + ' = 0.5 + 0.2 + 0.1 = 0.8 mS.</p><p>' + U() + ' = ' + F('5 − 4', '0.8') + ' = 1.25 V.</p><p>TD 3 uses this circuit again (superposition, question 1): same result.</p>' }
      ],
      answer: '<p>' + U() + ' = (' + E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2) + ')/(1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3) + ') = 1.25 V</p>',
      traps: [E(2) + ' is drawn downwards: it pulls the top wire down, hence the − sign in front of ' + E(2) + '/' + R(2) + '.',
        'Do not forget 1/' + R(3) + ' in the sum: ' + R(3) + ' contains no source, but it draws current.']
    },

    'hyp-td2-ex2-q6': {
      src: 'Old TD 2 · Ex 2 · Q6', title: 'Resistor ladder fed by a current source',
      intro: td2e2 + '<p>' + I() + ' = 2 mA; ' + R() + ' = 1 kΩ</p>',
      figs: [{ alt: 'Current source I on the left; vertical 2R (U1), R at the top, vertical 2R (U2), R at the top, vertical R (U3)', cap: 'Question 6' }],
      questions: ['<b>6)</b> Calculate ' + U(1) + ', ' + U(2) + ' and ' + U(3)],
      hints: ['Reduce the ladder from the right to find the resistance seen by the source.',
        U(1) + ' = (resistance seen) × ' + I() + '. Then each stage is a voltage divider.'],
      solution: [
        { t: 'Resistance seen by the source', html: '<p>From the right:</p><ol><li>' + R() + ' (vertical) + ' + R() + ' (top) = 2' + R() + ';</li><li>2' + R() + ' // 2' + R() + ' (middle vertical) = ' + R() + ';</li><li>' + R() + ' + ' + R() + ' (top) = 2' + R() + ';</li><li>2' + R() + ' // 2' + R() + ' (left vertical) = ' + R() + '.</li></ol><p>The source sees ' + R() + ': ' + U(1) + ' = ' + R() + I() + ' = 1 kΩ × 2 mA = 2 V.</p>' },
        { t: 'U2 and U3 with dividers', html: '<p>Beyond the left 2' + R() + ', the top ' + R() + ' is in series with everything that follows, which is worth ' + R() + ' (step 2). Divider across ' + U(1) + ': ' + U(2) + ' = ' + U(1) + ' × ' + F(R(), R() + ' + ' + R()) + ' = ' + F(U(1), '2') + ' = 1 V.</p><p>Likewise, across ' + U(2) + ', the top ' + R() + ' is in series with the vertical ' + R() + ' on the right: ' + U(3) + ' = ' + F(U(2), '2') + ' = 0.5 V.</p>' }
      ],
      answer: '<p>' + U(1) + ' = ' + R() + I() + ' = 2 V; ' + U(2) + ' = 1 V; ' + U(3) + ' = 0.5 V</p>',
      traps: ['The source does not see only the first 2' + R() + ': it sees the whole network, which is worth ' + R() + '.',
        U(2) + ' ≠ ' + U(1) + ' × 2' + R() + '/(' + R() + ' + 2' + R() + '): the middle 2' + R() + ' is in parallel with what follows, so you must combine them first.']
    },

    /* ===================== TD 3: superposition, Thévenin, Norton ===================== */
    'hyp-td3-ex3-q1': {
      src: 'Old TD 3 · Superposition · Q1', title: 'Superposition: two voltage sources, one voltage U',
      intro: td3s + '<p>' + E(1) + ' = 10 V; ' + R(1) + ' = 2 kΩ; ' + E(2) + ' = 20 V; ' + R(2) + ' = 5 kΩ; ' + R(3) + ' = 10 kΩ</p>',
      figs: [{ alt: 'Three branches between the top wire and the bottom wire: R1 above E1 (arrow pointing up), E2 (arrow pointing down) above R2, and R3 with U drawn upwards', cap: 'Question 1' }],
      questions: ['<b>1)</b> Calculate U.'],
      hints: ['Keep ' + E(1) + ' alone (' + E(2) + ' replaced by a wire) and calculate ' + Up + '; then ' + E(2) + ' alone (' + E(1) + ' replaced by a wire) and calculate ' + Upp + '.',
        'In each case it is a voltage divider: the source sees its own resistor in series with the other two resistors in parallel.',
        'The arrow of ' + E(2) + ' points down: its contribution ' + Upp + ' is negative.'],
      solution: [
        { t: 'E1 alone', html: '<p>' + E(2) + ' replaced by a wire: ' + R(2) + ' and ' + R(3) + ' are in parallel between the top wire and the bottom wire, ' + R(2) + ' // ' + R(3) + ' = ' + F('5 × 10', '15') + ' = ' + F('10', '3') + ' kΩ. Voltage divider with ' + R(1) + ':</p><p>' + Up + ' = ' + E(1) + ' × ' + F(R(2) + ' // ' + R(3), R(1) + ' + ' + R(2) + ' // ' + R(3)) + ' = 10 × ' + F('10/3', '2 + 10/3') + ' = 10 × ' + F('10', '16') + ' = 6.25 V.</p>',
          figs: [{ spec: { aria: 'E1 alone: E2 replaced by a wire', parts: parts(8, { 6: { s: 'E_2 → wire' } }) }, cap: 'E1 alone' }] },
        { t: 'E2 alone', html: '<p>' + E(1) + ' replaced by a wire: ' + R(1) + ' and ' + R(3) + ' are in parallel, ' + R(1) + ' // ' + R(3) + ' = ' + F('2 × 10', '12') + ' = ' + F('5', '3') + ' kΩ. The branch ' + E(2) + ' + ' + R(2) + ' is a generator with its + at the bottom: with no load, it would put the top wire at −' + E(2) + '. Voltage divider:</p><p>' + Upp + ' = −' + E(2) + ' × ' + F(R(1) + ' // ' + R(3), R(2) + ' + ' + R(1) + ' // ' + R(3)) + ' = −20 × ' + F('5/3', '5 + 5/3') + ' = −20 × ' + F('5', '20') + ' = −5 V.</p>',
          figs: [{ spec: { aria: 'E2 alone: E1 replaced by a wire', parts: parts(8, { 6: { s: 'E_1 → wire' } }) }, cap: 'E2 alone' }] },
        { t: 'Superposition', html: '<p>' + U() + ' = ' + Up + ' + ' + Upp + ' = 6.25 − 5 = 1.25 V.</p><p>Literal expression: ' + U() + ' = ' + F(R(3) + '(' + R(2) + E(1) + ' − ' + R(1) + E(2) + ')', R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3)) + '. This is the same circuit as in TD 2 (exercise 2, question 5): same result with Kirchhoff’s current law.</p><p>The archived handwritten solution forgets the − sign of ' + Upp + ' (it writes ' + R(1) + R(3) + E(2) + ' in the numerator, without −); its final formula, found with Kirchhoff’s laws, is correct.</p>' }
      ],
      answer: '<p>' + Up + ' = 6.25 V; ' + Upp + ' = −5 V; ' + U() + ' = 1.25 V</p>',
      traps: ['Turning off a voltage source means replacing it with a wire: the resistor that was in series with it stays in place.',
        E(2) + ' is drawn downwards: it lowers the top wire, hence ' + Upp + ' < 0.']
    },

    'hyp-td3-ex3-q2': {
      src: 'Old TD 3 · Superposition · Q2', title: 'Superposition: a voltage source and a current source',
      intro: td3s + '<p>' + E(1) + ' = 20 V; ' + R(1) + ' = 200 Ω; ' + I(0) + ' = 0.2 A; ' + R(2) + ' = 100 Ω; ' + R(3) + ' = 500 Ω; ' + R(4) + ' = 400 Ω</p>',
      figs: [{ alt: 'E1 on the left, R1 at the top with I1 to the right, vertical R3 with I3 downwards, current source I0 (arrow pointing up) in series with R4 on the right, R2 on the bottom wire', cap: 'Question 2' }],
      questions: ['<b>2)</b> Calculate ' + I(1) + ' and ' + I(3) + '.'],
      hints: [E(1) + ' alone: the source ' + I(0) + ' is replaced by an open switch; the branch of ' + R(4) + ' no longer carries any current.',
        I(0) + ' alone: ' + E(1) + ' is replaced by a wire. ' + I(0) + ' arrives at the top of ' + R(3) + ' and splits between ' + R(3) + ' and the path ' + R(1) + ' + ' + R(2) + '.',
        'Keep the directions of ' + I(1) + ' and ' + I(3) + ' from the diagram: a contribution can be negative.'],
      solution: [
        { t: 'E1 alone (I0 open)', html: '<p>The branch of ' + R(4) + ' is cut. One loop remains: ' + E(1) + ', ' + R(1) + ', ' + R(3) + ', ' + R(2) + ':</p><p>' + I(1) + '′ = ' + I(3) + '′ = ' + F(E(1), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = ' + F('20', '800') + ' = 0.025 A = 25 mA.</p>',
          figs: [{ spec: { aria: 'E1 alone: the source I0 is open, R4 carries no current', parts: parts(10, { 5: { s: 'I_0 open' } }) }, cap: 'E1 alone' }] },
        { t: 'I0 alone (E1 replaced by a wire)', html: '<p>' + R(4) + ' is in series with the current source: it changes nothing. ' + I(0) + ' arrives at the top of ' + R(3) + ' and splits between ' + R(3) + ' and the path ' + R(1) + ' + ' + R(2) + ' (which goes through the wire that replaces ' + E(1) + '). Current divider:</p><ul><li>' + I(3) + '″ = ' + I(0) + ' × ' + F(R(1) + ' + ' + R(2), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = 0.2 × ' + F('300', '800') + ' = 0.075 A;</li><li>in ' + R(1) + ', the current flows from right to left, against the arrow of ' + I(1) + ': ' + I(1) + '″ = −' + I(0) + ' × ' + F(R(3), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = −0.2 × ' + F('500', '800') + ' = −0.125 A.</li></ul>',
          figs: [{ spec: { aria: 'I0 alone: E1 replaced by a wire', parts: parts(10, { 0: { s: 'E_1 → wire' } }) }, cap: 'I0 alone' }] },
        { t: 'Superposition', html: '<p>' + I(1) + ' = 0.025 − 0.125 = −0.1 A; ' + I(3) + ' = 0.025 + 0.075 = 0.1 A.</p><p>Check with Kirchhoff’s current law at the top of ' + R(3) + ': ' + I(1) + ' + ' + I(0) + ' = ' + I(3) + ', that is −0.1 + 0.2 = 0.1 A.</p><p>The archived handwritten solution writes “' + R(1) + R(2) + '” where ' + R(1) + ' + ' + R(2) + ' is needed and forgets the − sign of ' + I(1) + '″.</p>' }
      ],
      answer: '<p>' + I(1) + ' = −0.1 A; ' + I(3) + ' = 0.1 A</p>',
      traps: [R(4) + ' is in series with the current source: it does not change any current in the circuit.',
        'Turning off ' + I(0) + ' means opening it, not replacing it with a wire.',
        'With ' + I(0) + ' alone, the current in ' + R(1) + ' flows towards ' + E(1) + ': ' + I(1) + '″ is negative.']
    },

    'hyp-td3-ex4-q1': {
      src: 'Old TD 3 · Thévenin · Q1', title: 'Thévenin seen by R4: a divider followed by a resistor',
      intro: td3t + '<p>' + E() + ' = 20 V; ' + R(1) + ' = 10 kΩ; ' + R(2) + ' = 15 kΩ; ' + R(3) + ' = 10 kΩ; ' + R(4) + ' = 4 kΩ</p>',
      figs: [{ alt: 'E on the left, R1 at the top, vertical R2, R3 at the top up to A, R4 between A and B with U drawn upwards', cap: 'Question 1' }],
      questions: ['<b>1)</b> Determine the Thévenin equivalent “seen” by ' + R(4) + ' and deduce U'],
      hints: ['Disconnect ' + R(4) + ': with no load, no current flows through ' + R(3) + '.',
        E('th') + ' is then the voltage across ' + R(2) + ' (divider). For ' + R('th') + ', replace ' + E() + ' with a wire and look from A and B.'],
      solution: [
        { t: 'Thévenin voltage (R4 disconnected)', html: '<p>Without ' + R(4) + ', no current flows through ' + R(3) + ': A is at the same potential as the top of ' + R(2) + '. ' + R(1) + ' and ' + R(2) + ' form a divider:</p><p>' + E('th') + ' = ' + E() + ' × ' + F(R(2), R(1) + ' + ' + R(2)) + ' = 20 × ' + F('15', '25') + ' = 12 V.</p>',
          figs: [{ spec: { aria: 'R4 disconnected: E, R1, R2, R3 and the open terminals A and B' }, cap: 'Load disconnected: no-load voltage' }] },
        { t: 'Thévenin resistance (E turned off)', html: '<p>' + E() + ' replaced by a wire: ' + R(1) + ' and ' + R(2) + ' are in parallel, then ' + R(3) + ' in series up to A.</p><p>' + R('th') + ' = ' + R(3) + ' + ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' = 10 + ' + F('150', '25') + ' = 10 + 6 = 16 kΩ.</p>',
          figs: [{ spec: { aria: 'E replaced by a wire: R1 and R2 in parallel, then R3, seen between A and B', parts: parts(9, { 0: { s: 'E → wire' } }) }, cap: 'Source turned off: resistance seen between A and B' }] },
        { t: 'Back to R4', html: '<p>The generator (' + E('th') + ', ' + R('th') + ') feeds ' + R(4) + ': voltage divider.</p><p>' + U() + ' = ' + E('th') + ' × ' + F(R(4), R('th') + ' + ' + R(4)) + ' = 12 × ' + F('4', '20') + ' = 2.4 V.</p>',
          figs: [{ spec: { aria: 'Equivalent Thévenin generator with its load' }, cap: E('th') + ' = 12 V and ' + R('th') + ' = 16 kΩ' }] }
      ],
      answer: '<p>' + E('th') + ' = ' + E() + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = 12 V; ' + R('th') + ' = ' + R(3) + ' + ' + R(1) + R(2) + '/(' + R(1) + ' + ' + R(2) + ') = 16 kΩ; ' + U() + ' = 2.4 V</p>',
      traps: ['With no load, ' + R(3) + ' carries no current: it does not count for ' + E('th') + ', but it does count for ' + R('th') + '.']
    },

    'hyp-td3-ex4-q2': {
      src: 'Old TD 3 · Thévenin · Q2', title: 'Thévenin seen by RC: two sources and a useless resistor',
      intro: td3t + '<p>' + E(1) + ' = 10 V; ' + R(1) + ' = 3 kΩ; ' + R(2) + ' = 3 kΩ; ' + E(2) + ' = 10 V; ' + R(3) + ' = 6 kΩ; ' + R(4) + ' = 10 kΩ; ' + R(5) + ' = 2 kΩ</p>',
      figs: [{ alt: 'E1 at the top left with R2 below it, R1 at the top towards a node, R3 from this node to a point connected to E2 (arrow pointing up) and to R4 in parallel, R5 towards A, RC between A and B with U', cap: 'Question 2' }],
      questions: ['<b>2)</b> Determine the Thévenin equivalent “seen” by ' + R('C') + '.', 'Calculate ' + R('C') + ' such that U = 2 V.'],
      hints: [R(4) + ' is connected directly across the ideal source ' + E(2) + ': it does not change the voltage ' + E(2) + ', and it disappears when ' + E(2) + ' is turned off.',
        'With no load, ' + R(5) + ' carries no current: ' + E('th') + ' is the potential of node N at the end of ' + R(1) + '. Calculate it by superposition (' + E(1) + ' alone, then ' + E(2) + ' alone).',
        R('th') + ': ' + E(1) + ' and ' + E(2) + ' replaced by wires, then ' + R(5) + ' + (' + R(1) + ' + ' + R(2) + ') // ' + R(3) + '.'],
      solution: [
        { t: 'Thévenin voltage (RC disconnected)', html: '<p>Bottom wire: 0 V. No more current in ' + R(5) + ': ' + E('th') + ' = ' + V('N') + '. Point P is connected to the + of ' + E(2) + ': it is at ' + E(2) + ' = 10 V, whatever ' + R(4) + '.</p><ul><li>' + E(1) + ' alone (' + E(2) + ' replaced by a wire, P at 0 V): one loop ' + E(1) + ', ' + R(1) + ', ' + R(3) + ', ' + R(2) + '. Divider: ' + V('N') + '′ = ' + E(1) + ' × ' + F(R(3), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = 10 × ' + F('6', '12') + ' = 5 V.</li><li>' + E(2) + ' alone (' + E(1) + ' replaced by a wire): P at 10 V, then ' + R(3) + ' and ' + R(1) + ' + ' + R(2) + ' in series down to the bottom wire. Divider: ' + V('N') + '″ = ' + E(2) + ' × ' + F(R(1) + ' + ' + R(2), R(1) + ' + ' + R(2) + ' + ' + R(3)) + ' = 10 × ' + F('6', '12') + ' = 5 V.</li></ul><p>' + E('th') + ' = 5 + 5 = 10 V. (Here ' + E(1) + ' = ' + E(2) + ': no current flows in the loop, and N stays at 10 V.)</p>',
          figs: [{ spec: { aria: 'RC disconnected: E1 and R2 on the left, R1 to N, R3 to P, E2 and R4 in parallel, R5 to A' }, cap: 'Load disconnected: no-load voltage' }] },
        { t: 'Thévenin resistance (sources turned off)', html: '<p>' + E(1) + ' and ' + E(2) + ' replaced by wires. The wire that replaces ' + E(2) + ' short-circuits ' + R(4) + ' and connects P to the bottom wire. From N: ' + R(1) + ' + ' + R(2) + ' = 6 kΩ (series, through the wire that replaces ' + E(1) + ') in parallel with ' + R(3) + ' = 6 kΩ, that is 3 kΩ. Then ' + R(5) + ' in series:</p><p>' + R('th') + ' = ' + R(5) + ' + (' + R(1) + ' + ' + R(2) + ') // ' + R(3) + ' = 2 + 3 = 5 kΩ.</p>',
          figs: [{ spec: { aria: 'Sources turned off: R4 short-circuited; R1 + R2 in parallel with R3, then R5', parts: parts(13, { 0: { s: 'E_1 → wire' }, 4: { s: 'E_2 → wire' } }) }, cap: 'Sources turned off: R4 is short-circuited' }] },
        { t: 'Choosing RC', html: '<p>' + U() + ' = ' + E('th') + ' × ' + F(R('C'), R('th') + ' + ' + R('C')) + ' = 2 V ⇔ 10' + R('C') + ' = 2(5 + ' + R('C') + ') ⇔ 8' + R('C') + ' = 10 ⇔ ' + R('C') + ' = 1.25 kΩ.</p>',
          figs: [{ spec: { aria: 'Equivalent Thévenin generator with its load' }, cap: E('th') + ' = 10 V and ' + R('th') + ' = 5 kΩ' }] }
      ],
      answer: '<p>' + E('th') + ' = 10 V; ' + R('th') + ' = 5 kΩ; ' + R('C') + ' = 1.25 kΩ</p>',
      traps: [R(4) + ', in parallel with an ideal voltage source, plays no role: neither for ' + E('th') + ' nor for ' + R('th') + '.',
        'For ' + R('th') + ', the wire that replaces ' + E(2) + ' short-circuits ' + R(4) + ': ' + R(3) + ' goes straight to the bottom wire.']
    },

    'hyp-td3-ex4-q3': {
      src: 'Old TD 3 · Thévenin · Q3', title: 'Resistor bridge: Thévenin seen by RC and the balance condition',
      intro: td3t,
      figs: [{ alt: 'Bridge: E on the left; R1 and R2 in series from top to bottom with point A in the middle; R3 and R4 in series with B in the middle; RC between A and B', cap: 'Question 3' }],
      questions: ['<b>3) a)</b> Determine the voltage ' + E('TH') + ' of the Thévenin equivalent “seen” by ' + R('C') + ' and deduce the relation that must hold between the 4 resistors ' + R(1) + ' to ' + R(4) + ' for the current in ' + R('C') + ' to be zero whatever the value of this resistor.',
        '<b>b)</b> Determine the expression of ' + R('TH') + '.'],
      hints: ['Without ' + R('C') + ', ' + R(1) + ' and ' + R(2) + ' form a voltage divider across ' + E() + ', and ' + R(3) + ' and ' + R(4) + ' another one.',
        E('TH') + ' = ' + V('A') + ' − ' + V('B') + '. The current in ' + R('C') + ' is ' + E('TH') + '/(' + R('TH') + ' + ' + R('C') + '): it is zero for every ' + R('C') + ' if and only if ' + E('TH') + ' = 0.',
        'For ' + R('TH') + ', the wire that replaces ' + E() + ' connects the top and the bottom of the bridge: seen from A, ' + R(1) + ' and ' + R(2) + ' are in parallel.'],
      solution: [
        { t: 'a) No-load voltage', html: '<p>Bottom wire: 0 V. Without ' + R('C') + ', two independent dividers across ' + E() + ':</p><p>' + V('A') + ' = ' + E() + ' × ' + F(R(2), R(1) + ' + ' + R(2)) + ' and ' + V('B') + ' = ' + E() + ' × ' + F(R(4), R(3) + ' + ' + R(4)) + '.</p><p>' + E('TH') + ' = ' + V('A') + ' − ' + V('B') + ' = ' + E() + ' × ' + F(R(2) + '(' + R(3) + ' + ' + R(4) + ') − ' + R(4) + '(' + R(1) + ' + ' + R(2) + ')', '(' + R(1) + ' + ' + R(2) + ')(' + R(3) + ' + ' + R(4) + ')') + ' = ' + E() + ' × ' + F(R(2) + R(3) + ' − ' + R(1) + R(4), '(' + R(1) + ' + ' + R(2) + ')(' + R(3) + ' + ' + R(4) + ')') + '.</p>',
          figs: [{ spec: { aria: 'RC disconnected: two dividers R1-R2 and R3-R4 across E; E_TH drawn from B to A' }, cap: 'Load disconnected: two voltage dividers' }] },
        { t: 'a) Zero-current condition', html: '<p>The current in ' + R('C') + ' is ' + E('TH') + '/(' + R('TH') + ' + ' + R('C') + '). It is zero whatever ' + R('C') + ' if and only if ' + E('TH') + ' = 0:</p><p>' + R(1) + R(4) + ' = ' + R(2) + R(3) + ', that is ' + R(1) + '/' + R(2) + ' = ' + R(3) + '/' + R(4) + ' (balanced bridge).</p>' },
        { t: 'b) Thévenin resistance', html: '<p>' + E() + ' replaced by a wire: the top and the bottom of the bridge now form a single node. Seen from A, ' + R(1) + ' and ' + R(2) + ' both go to this node: they are in parallel. The same goes for ' + R(3) + ' and ' + R(4) + ' on the B side. The two groups are in series:</p><p>' + R('TH') + ' = ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' + ' + F(R(3) + R(4), R(3) + ' + ' + R(4)) + '.</p>',
          figs: [{ spec: { aria: 'E turned off: R1 in parallel with R2, in series with R3 in parallel with R4, between A and B' }, cap: 'Source turned off: the bridge redrawn between A and B' }] }
      ],
      answer: '<p>' + E('TH') + ' = ' + E() + '(' + R(2) + R(3) + ' − ' + R(1) + R(4) + ')/((' + R(1) + ' + ' + R(2) + ')(' + R(3) + ' + ' + R(4) + ')); zero current for every ' + R('C') + ' ⇔ ' + R(1) + R(4) + ' = ' + R(2) + R(3) + '; ' + R('TH') + ' = ' + R(1) + R(2) + '/(' + R(1) + ' + ' + R(2) + ') + ' + R(3) + R(4) + '/(' + R(3) + ' + ' + R(4) + ')</p>',
      traps: [E('TH') + ' depends on the chosen direction (' + V('A') + ' − ' + V('B') + ' or the reverse): only the sign changes, the balance condition stays the same.',
        'For ' + R('TH') + ', ' + R(1) + ' and ' + R(2) + ' are in parallel (not in series) once ' + E() + ' is turned off.']
    },

    'hyp-td3-ex4-q4': {
      src: 'Old TD 3 · Thévenin · Q4', title: 'Thévenin seen by RC between two dividers: finding E4 so that I = 0',
      intro: td3t + '<p>' + E(1) + ' = 10 V; ' + R(1) + ' = 1 kΩ; ' + R(2) + ' = 3 kΩ; ' + R(3) + ' = ' + R(4) + ' = 5 kΩ</p>',
      figs: [{ alt: 'E1 on the left, R1 at the top, vertical R2, RC at the top with I to the right, vertical R3, R4 at the top, E4 on the right with its arrow pointing up', cap: 'Question 4' }],
      questions: ['<b>4)</b> Calculate the Thévenin equivalent “seen” by ' + R('C') + ' and deduce ' + E(4) + ' so that ' + I() + ' = 0 whatever ' + R('C')],
      hints: ['Disconnect ' + R('C') + ': two independent dividers remain, (' + E(1) + ', ' + R(1) + ', ' + R(2) + ') on the left and (' + E(4) + ', ' + R(4) + ', ' + R(3) + ') on the right.',
        'With ' + I() + ' drawn from left to right in ' + R('C') + ', take ' + E('th') + ' = (potential on the left of ' + R('C') + ') − (potential on the right).',
        I() + ' = ' + E('th') + '/(' + R('th') + ' + ' + R('C') + ') is zero for every ' + R('C') + ' if ' + E('th') + ' = 0.'],
      solution: [
        { t: 'Thévenin voltage (RC disconnected)', html: '<p>Bottom wire: 0 V. Call A the left end of ' + R('C') + ' (top of ' + R(2) + ') and B the right end (top of ' + R(3) + ').</p><ul><li>' + V('A') + ' = ' + E(1) + ' × ' + F(R(2), R(1) + ' + ' + R(2)) + ' = 10 × ' + F('3', '4') + ' = 7.5 V;</li><li>' + V('B') + ' = ' + E(4) + ' × ' + F(R(3), R(3) + ' + ' + R(4)) + ' = ' + F(E(4), '2') + '.</li></ul><p>' + E('th') + ' = ' + V('A') + ' − ' + V('B') + ' = 7.5 − ' + E(4) + '/2 (in V).</p>',
          figs: [{ spec: { aria: 'RC disconnected: divider E1, R1, R2 on the left and divider E4, R4, R3 on the right; E_th between A and B' }, cap: 'Load disconnected: two independent dividers' }] },
        { t: 'Thévenin resistance (sources turned off)', html: '<p>' + E(1) + ' and ' + E(4) + ' replaced by wires: on the left, ' + R(1) + ' // ' + R(2) + '; on the right, ' + R(3) + ' // ' + R(4) + '; the two are in series through the bottom wire.</p><p>' + R('th') + ' = ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' + ' + F(R(3) + R(4), R(3) + ' + ' + R(4)) + ' = 0.75 + 2.5 = 3.25 kΩ.</p>' },
        { t: 'Condition I = 0', html: '<p>' + I() + ' = ' + F(E('th'), R('th') + ' + ' + R('C')) + ' is zero for every ' + R('C') + ' if and only if ' + E('th') + ' = 0:</p><p>' + E(4) + ' = 2 × 7.5 = 15 V, or as a literal expression ' + E(4) + ' = ' + F(E(1) + R(2) + '(' + R(3) + ' + ' + R(4) + ')', R(3) + '(' + R(1) + ' + ' + R(2) + ')') + '.</p><p>The archived handwritten solution starts from the correct equality ' + R(2) + '(' + R(3) + ' + ' + R(4) + ')' + E(1) + ' = ' + R(3) + '(' + R(1) + ' + ' + R(2) + ')' + E(4) + ', but isolates ' + E(4) + ' wrongly: it writes ' + R(3) + R(2) + ' in the denominator, which would give 20 V. The correct denominator is ' + R(3) + '(' + R(1) + ' + ' + R(2) + '): ' + E(4) + ' = 15 V.</p>',
          figs: [{ spec: { aria: 'Equivalent Thévenin generator with its load' }, cap: E('th') + ' = 7.5 − ' + E(4) + '/2 (V) and ' + R('th') + ' = 3.25 kΩ' }] }
      ],
      answer: '<p>' + E('th') + ' = ' + E(1) + R(2) + '/(' + R(1) + ' + ' + R(2) + ') − ' + E(4) + R(3) + '/(' + R(3) + ' + ' + R(4) + ') = 7.5 − ' + E(4) + '/2 (V); ' + R('th') + ' = 3.25 kΩ; ' + E(4) + ' = 15 V</p>',
      traps: [E('th') + ' is a difference of two potentials: choose the direction (left minus right) to match the arrow of ' + I() + '.',
        'When ' + R('C') + ' is disconnected, the two dividers are independent: no current flows from one to the other.']
    },

    'hyp-td3-ex4-q5': {
      src: 'Old TD 3 · Thévenin · Q5', title: 'Thévenin seen by the right-hand R2, then the value of R2 that maximizes U',
      intro: td3t,
      figs: [{ alt: 'E1 at the top left with its arrow pointing down and E2 below it with its arrow pointing up, joined in the middle; the top R2 and the middle R2 go to the right-hand node; R1 on the bottom wire and a vertical R1; the right-hand R2, across which U is measured', cap: 'Question 5' }],
      questions: ['<b>5) a)</b> Calculate the Thévenin equivalent “seen” by the right-hand resistor ' + R(2) + '.',
        '<b>b)</b> Assuming that ' + R(2) + ' varies, for what value of this resistance (in terms of ' + R(1) + ') is the voltage U maximum?'],
      hints: ['Call X the top-right node, Y the bottom-right node, and M the middle point on the left. The arrows of ' + E(1) + ' and ' + E(2) + ' both point towards M: take M as the reference (0 V).',
        'The two ' + R(2) + ' leaving X go to two points of known potential (−' + E(1) + ' and 0): replace them with a single Thévenin generator (−' + E(1) + '/2, ' + R(2) + '/2). With no load, only one loop remains.',
        'b) All the ' + R(2) + ' in the diagram vary together. Write ' + U() + ' = ' + E('th') + R(2) + '/(' + R('th') + ' + ' + R(2) + '), divide by ' + R(2) + ' and look for the minimum of the denominator.'],
      solution: [
        { t: 'Name the points', html: '<p>On the left, from top to bottom: H (top of ' + E(1) + '), M (between ' + E(1) + ' and ' + E(2) + '), Q (bottom of ' + E(2) + '). On the right: X at the top, Y at the bottom; ' + U() + ' = ' + V('X') + ' − ' + V('Y') + '. The arrows of ' + E(1) + ' and ' + E(2) + ' point towards M: their + terminals are at M. With ' + V('M') + ' = 0: ' + V('H') + ' = −' + E(1) + ' and ' + V('Q') + ' = −' + E(2) + '.</p><p>Branches: ' + R(2) + ' from H to X, ' + R(2) + ' from M to X, ' + R(1) + ' from Q to Y (bottom wire), ' + R(1) + ' from X to Y (vertical), and the load ' + R(2) + ' from X to Y.</p>' },
        { t: 'Group the two R2 on the left', html: '<p>Seen from X, the two ' + R(2) + ' connect X to points at potentials −' + E(1) + ' and 0. Millman (or Thévenin): they are equivalent to a source of ' + F('−' + E(1) + '/' + R(2) + ' + 0', '2/' + R(2)) + ' = −' + E(1) + '/2 (relative to M) in series with ' + R(2) + ' // ' + R(2) + ' = ' + R(2) + '/2. It is drawn pointing towards M with the value ' + E(1) + '/2.</p>',
          figs: [{ spec: { aria: 'The two left R2 replaced by a source E1/2 pointing towards M and R2/2: a single loop with R1, R1 and E2' }, cap: 'Load disconnected, after grouping: a single loop' }] },
        { t: 'a) Thévenin voltage', html: '<p>With no load, a single loop M → X → Y → Q → M, with a current ' + I('J') + ' (from X to Y in the vertical ' + R(1) + '). Following this direction, the equivalent source counts −' + E(1) + '/2 and ' + E(2) + ' counts +' + E(2) + '; total resistance ' + R(2) + '/2 + 2' + R(1) + ':</p><p>' + I('J') + ' = ' + F(E(2) + ' − ' + E(1) + '/2', '2' + R(1) + ' + ' + R(2) + '/2') + ' = ' + F('2' + E(2) + ' − ' + E(1), '4' + R(1) + ' + ' + R(2)) + ', then ' + E('th') + ' = ' + V('X') + ' − ' + V('Y') + ' = ' + R(1) + I('J') + ' = ' + F(R(1) + '(2' + E(2) + ' − ' + E(1) + ')', '4' + R(1) + ' + ' + R(2)) + '.</p>' },
        { t: 'a) Thévenin resistance', html: '<p>Sources turned off: H, M and Q form a single node. Between X and this node: ' + R(2) + '/2; between this node and Y: ' + R(1) + '; between X and Y: ' + R(1) + '. So ' + R(1) + ' (vertical) is in parallel with ' + R(2) + '/2 + ' + R(1) + ':</p><p>' + R('th') + ' = ' + F(R(1) + '(' + R(1) + ' + ' + R(2) + '/2)', '2' + R(1) + ' + ' + R(2) + '/2') + ' = ' + F(R(1) + '(2' + R(1) + ' + ' + R(2) + ')', '4' + R(1) + ' + ' + R(2)) + '.</p>',
          figs: [{ spec: { aria: 'Sources turned off: R2/2 between X and the left node, R1 between this node and Y, R1 between X and Y' }, cap: 'Sources turned off: the whole left side is a single node' }] },
        { t: 'b) U in terms of R2', html: '<p>All the ' + R(2) + ' in the diagram have the same value and vary together. Voltage divider on the load:</p><p>' + U() + ' = ' + E('th') + ' × ' + F(R(2), R('th') + ' + ' + R(2)) + ', with ' + R('th') + ' + ' + R(2) + ' = ' + F(R(1) + '(2' + R(1) + ' + ' + R(2) + ') + ' + R(2) + '(4' + R(1) + ' + ' + R(2) + ')', '4' + R(1) + ' + ' + R(2)) + ' = ' + F('2' + R(1) + '² + 5' + R(1) + R(2) + ' + ' + R(2) + '²', '4' + R(1) + ' + ' + R(2)) + '.</p><p>Hence ' + U() + ' = ' + F(R(1) + R(2) + '(2' + E(2) + ' − ' + E(1) + ')', '2' + R(1) + '² + 5' + R(1) + R(2) + ' + ' + R(2) + '²') + ' = ' + F(R(1) + '(2' + E(2) + ' − ' + E(1) + ')', '2' + R(1) + '²/' + R(2) + ' + 5' + R(1) + ' + ' + R(2)) + '.</p>' },
        { t: 'b) Maximum', html: '<p>' + U() + ' is maximum when the denominator is minimum, that is when D(' + R(2) + ') = 2' + R(1) + '²/' + R(2) + ' + ' + R(2) + ' is minimum. D′(' + R(2) + ') = −2' + R(1) + '²/' + R(2) + '² + 1 is zero for ' + R(2) + '² = 2' + R(1) + '²:</p><p>' + R(2) + ' = √2 · ' + R(1) + ' ≈ 1.41' + R(1) + '.</p><p>Then 2' + R(1) + '²/' + R(2) + ' = ' + R(2) + ' = √2' + R(1) + ' and ' + U('max') + ' = ' + F('2' + E(2) + ' − ' + E(1), '5 + 2√2') + ' ≈ 0.13 (2' + E(2) + ' − ' + E(1) + ').</p><p>The archived handwritten solution stops before this question.</p>' }
      ],
      answer: '<p>' + E('th') + ' = ' + R(1) + '(2' + E(2) + ' − ' + E(1) + ')/(4' + R(1) + ' + ' + R(2) + '); ' + R('th') + ' = ' + R(1) + '(2' + R(1) + ' + ' + R(2) + ')/(4' + R(1) + ' + ' + R(2) + '); ' + U() + ' is maximum for ' + R(2) + ' = √2 · ' + R(1) + '</p>',
      traps: ['The arrows of ' + E(1) + ' and ' + E(2) + ' both point towards the middle point: their + terminals are in the middle, not at the corners.',
        'In b), all the ' + R(2) + ' vary. If only the load varied, ' + U() + ' would increase with no maximum (it would tend towards ' + E('th') + ').',
        'This is not power matching (' + R(2) + ' = ' + R('th') + '): here you maximize a voltage, and ' + R('th') + ' itself depends on ' + R(2) + '.']
    },

    'hyp-td3-ex5-q1': {
      src: 'Old TD 3 · Ex 5 (Norton) · Q1', title: 'Norton seen by RC: a single source',
      intro: td3n + '<p>' + E() + ' = 10 V; ' + R(1) + ' = 100 Ω; ' + R(2) + ' = 200 Ω; ' + R(3) + ' = 300 Ω; ' + R('C') + ' = 100 Ω</p>',
      figs: [{ alt: 'E on the left, R1 on the top wire, R2 on the bottom wire, vertical R3, RC on the right with I and U', cap: 'Question 1' }],
      questions: ['<b>1)</b> Calculate the Norton equivalent “seen” by ' + R('C') + ' and deduce ' + U() + ' and ' + I()],
      hints: [I('N') + ' is the current in a wire that replaces ' + R('C') + ': this wire also short-circuits ' + R(3) + '.',
        R('N') + ': ' + E() + ' replaced by a wire, then the resistance seen from the terminals of ' + R('C') + '.',
        'To finish, a current divider between ' + R('N') + ' and ' + R('C') + '.'],
      solution: [
        { t: 'Norton current (RC replaced by a wire)', html: '<p>The wire that replaces ' + R('C') + ' is also connected across ' + R(3) + ': ' + R(3) + ' is short-circuited, no current flows through it. One loop remains: ' + E() + ', ' + R(1) + ', the wire, ' + R(2) + ':</p><p>' + I('N') + ' = ' + F(E(), R(1) + ' + ' + R(2)) + ' = ' + F('10', '300') + ' = ' + F('1', '30') + ' A ≈ 33 mA.</p>',
          figs: [{ spec: { aria: 'RC replaced by a wire: R3 short-circuited, I_N in the wire', parts: parts(8, { 7: { s: 'wire' } }) }, cap: 'Short circuit in place of RC: R3 no longer carries any current' }] },
        { t: 'Norton resistance (E turned off)', html: '<p>' + E() + ' replaced by a wire: ' + R(1) + ' and ' + R(2) + ' are in series (300 Ω), and this group is in parallel with ' + R(3) + ' between the terminals of ' + R('C') + ':</p><p>' + R('N') + ' = (' + R(1) + ' + ' + R(2) + ') // ' + R(3) + ' = 300 // 300 = 150 Ω.</p>' },
        { t: 'Back to RC', html: '<p>Current divider between ' + R('N') + ' and ' + R('C') + ':</p><p>' + I() + ' = ' + I('N') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = ' + F('1', '30') + ' × ' + F('150', '250') + ' = ' + F('1', '30') + ' × ' + F('3', '5') + ' = ' + F('1', '50') + ' A = 20 mA, then ' + U() + ' = ' + R('C') + I() + ' = 100 × 0.02 = 2 V.</p>',
          figs: [{ spec: { aria: 'Equivalent Norton generator with its load' }, cap: I('N') + ' = 1/30 A and ' + R('N') + ' = 150 Ω' }] }
      ],
      answer: '<p>' + I('N') + ' = ' + E() + '/(' + R(1) + ' + ' + R(2) + ') = 1/30 A; ' + R('N') + ' = 150 Ω; ' + I() + ' = 20 mA; ' + U() + ' = 2 V</p>',
      traps: [R(2) + ' is on the bottom wire, in series with ' + R(1) + ': it counts as much as ' + R(1) + '.',
        'Current divider: ' + I() + ' = ' + I('N') + R('N') + '/(' + R('N') + ' + ' + R('C') + '), with the resistance of the other branch in the numerator.']
    },

    'hyp-td3-ex5-q2': {
      src: 'Old TD 3 · Ex 5 (Norton) · Q2', title: 'Norton seen by RC: a voltage source and a current source',
      intro: td3n + '<p>' + E(1) + ' = 10 V; ' + R(1) + ' = 2 kΩ; ' + R(2) + ' = 6 kΩ; ' + I(2) + ' = 13 mA; ' + R('C') + ' = 10.5 kΩ</p>',
      figs: [{ alt: 'E1 on the left, R1 at the top, current source I2 pointing down, vertical R2, then RC on the right with I and U', cap: 'Question 2' }],
      questions: ['<b>2)</b> Calculate the Norton equivalent “seen” by ' + R('C') + ' and deduce ' + U() + ' and ' + I()],
      hints: ['In short circuit, the top wire is at 0 V: ' + R(2) + ' carries no current. Add up the currents arriving at the top wire.',
        'The arrow of ' + I(2) + ' points down: the source takes 13 mA away from the top wire.',
        'Turning off ' + I(2) + ' means opening it: ' + R('N') + ' = ' + R(1) + ' // ' + R(2) + '.'],
      solution: [
        { t: 'Norton current (RC replaced by a wire)', html: '<p>The wire that replaces ' + R('C') + ' puts the top wire at 0 V: there is no voltage across ' + R(2) + ', so no current. Kirchhoff’s current law on the top wire:</p><ul><li>' + R(1) + ' brings ' + E(1) + '/' + R(1) + ' = 10/2 = 5 mA;</li><li>' + I(2) + ' takes away 13 mA (arrow pointing down).</li></ul><p>' + I('N') + ' = ' + E(1) + '/' + R(1) + ' − ' + I(2) + ' = 5 − 13 = −8 mA.</p>',
          figs: [{ spec: { aria: 'RC replaced by a wire: the top wire is at 0 V, R2 carries no current' }, cap: 'Short circuit in place of RC: R2 no longer carries any current' }] },
        { t: 'Norton resistance (sources turned off)', html: '<p>' + E(1) + ' replaced by a wire, ' + I(2) + ' open: ' + R(1) + ' and ' + R(2) + ' are in parallel between the terminals of ' + R('C') + '.</p><p>' + R('N') + ' = ' + F(R(1) + R(2), R(1) + ' + ' + R(2)) + ' = ' + F('2 × 6', '8') + ' = 1.5 kΩ.</p>' },
        { t: 'Back to RC', html: '<p>' + I() + ' = ' + I('N') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = −8 × ' + F('1.5', '12') + ' = −1 mA, then ' + U() + ' = ' + R('C') + I() + ' = 10.5 kΩ × (−1 mA) = −10.5 V.</p>',
          figs: [{ spec: { aria: 'Equivalent Norton generator with its load' }, cap: I('N') + ' = −8 mA and ' + R('N') + ' = 1.5 kΩ' }] }
      ],
      answer: '<p>' + I('N') + ' = ' + E(1) + '/' + R(1) + ' − ' + I(2) + ' = −8 mA; ' + R('N') + ' = 1.5 kΩ; ' + I() + ' = −1 mA; ' + U() + ' = −10.5 V</p>',
      traps: ['A negative ' + I('N') + ' is normal: the source ' + I(2) + ' draws more current than ' + E(1) + ' supplies through ' + R(1) + '.',
        U() + ' and ' + I() + ' are negative: the actual current flows up through ' + R('C') + '.']
    },

    'hyp-td3-ex5-q3': {
      src: 'Old TD 3 · Ex 5 (Norton) · Q3', title: 'Norton seen by RC: three voltage sources',
      intro: td3n + '<p>' + E(1) + ' = 10 V; ' + R(1) + ' = 4 kΩ; ' + R('C') + ' = 2 kΩ; ' + E(2) + ' = 9 V; ' + R(2) + ' = 3 kΩ; ' + E(3) + ' = 15 V; ' + R(3) + ' = 6 kΩ</p>',
      figs: [{ alt: 'E1 on the left, R1 at the top; branch E2 (arrow pointing down) then R2; RC with I downwards; branch R3 then E3 (arrow pointing down)', cap: 'Question 3' }],
      questions: ['<b>3)</b> Calculate the Norton equivalent “seen” by ' + R('C') + ' and deduce ' + I() + '.'],
      hints: ['In short circuit, the top wire (node N) is at 0 V: the current in each branch follows directly from Ohm’s law.',
        E(2) + ' and ' + E(3) + ' are drawn downwards: their + is at the bottom. The + of ' + E(2) + ' is connected to ' + R(2) + ', that of ' + E(3) + ' to the bottom wire.',
        R('N') + ': once the sources are turned off, ' + R(1) + ', ' + R(2) + ' and ' + R(3) + ' are all three between N and the bottom wire.'],
      solution: [
        { t: 'Short-circuit current (RC replaced by a wire)', html: '<p>Bottom wire and node N at 0 V. Current in each branch:</p><ul><li>' + E(1) + ', ' + R(1) + ': the top of ' + E(1) + ' is at 10 V; ' + R(1) + ' brings 10/4 = 2.5 mA to N.</li><li>' + E(2) + ', ' + R(2) + ': the + of ' + E(2) + ' is at the bottom, the point between ' + E(2) + ' and ' + R(2) + ' is at 0 + 9 = 9 V; ' + R(2) + ' carries 9/3 = 3 mA downwards, taken from N.</li><li>' + R(3) + ', ' + E(3) + ': the + of ' + E(3) + ' is on the bottom wire, the point between ' + R(3) + ' and ' + E(3) + ' is at −15 V; ' + R(3) + ' carries (0 − (−15))/6 = 2.5 mA downwards, taken from N.</li></ul><p>Kirchhoff’s current law at N: ' + I('cc') + ' = ' + E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2) + ' − ' + E(3) + '/' + R(3) + ' = 2.5 − 3 − 2.5 = −3 mA (counted in the direction of ' + I() + ', downwards).</p>',
          figs: [{ spec: { aria: 'RC replaced by a wire: currents of the three branches towards node N' }, cap: 'Short circuit in place of RC' }] },
        { t: 'Norton resistance (sources turned off)', html: '<p>The three sources replaced by wires: ' + R(1) + ', ' + R(2) + ' and ' + R(3) + ' are in parallel between N and the bottom wire.</p><p>' + F('1', R('N')) + ' = ' + F('1', '4') + ' + ' + F('1', '3') + ' + ' + F('1', '6') + ' = ' + F('3 + 4 + 2', '12') + ' = ' + F('9', '12') + ', so ' + R('N') + ' = ' + F('4', '3') + ' kΩ ≈ 1.33 kΩ.</p><p>Literal expression: ' + R('N') + ' = ' + F(R(1) + R(2) + R(3), R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3)) + '.</p>' },
        { t: 'Back to RC', html: '<p>' + I() + ' = ' + I('cc') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = −3 × ' + F('4/3', '4/3 + 2') + ' = −3 × ' + F('4', '10') + ' = −1.2 mA.</p><p>The archived handwritten solution takes ' + R('N') + ' = ' + R(1) + R(2) + R(3) + '/(' + R(1) + ' + ' + R(2) + ' + ' + R(3) + '), a wrong formula (it is not even dimensionally consistent: Ω² instead of Ω). It therefore finds ' + I() + ' = −108/49 mA ≈ −2.2 mA instead of −1.2 mA. Its ' + I('cc') + ' = −3 mA is correct.</p>',
          figs: [{ spec: { aria: 'Equivalent Norton generator with its load' }, cap: I('N') + ' = ' + I('cc') + ' = −3 mA and ' + R('N') + ' = 4/3 kΩ' }] }
      ],
      answer: '<p>' + I('cc') + ' = ' + E(1) + '/' + R(1) + ' − ' + E(2) + '/' + R(2) + ' − ' + E(3) + '/' + R(3) + ' = −3 mA; ' + R('N') + ' = 4/3 kΩ; ' + I() + ' = −1.2 mA</p>',
      traps: ['Three resistors in parallel: ' + R('N') + ' = ' + R(1) + R(2) + R(3) + '/(' + R(1) + R(2) + ' + ' + R(1) + R(3) + ' + ' + R(2) + R(3) + '), not ' + R(1) + R(2) + R(3) + '/(' + R(1) + ' + ' + R(2) + ' + ' + R(3) + ').',
        E(2) + ' is above ' + R(2) + ': its + is not on the bottom wire but on the side of ' + R(2) + '.']
    },

    'hyp-td3-ex5-q4': {
      src: 'Old TD 3 · Ex 5 (Norton) · Q4', title: 'Norton seen by RC: current source in parallel with R3',
      intro: td3n + '<p>' + E(1) + ' = 10 V; ' + R(1) + ' = ' + R(2) + ' = 10 Ω; ' + I(3) + ' = 5 A; ' + R(3) + ' = 3 Ω, ' + R(4) + ' = 2 Ω; ' + R('C') + ' = 8.4 Ω</p>',
      figs: [{ alt: 'E1 at the bottom left with R1 above it; vertical R2; on the top wire, R3 in parallel with the current source I3 pointing left; vertical R4; RC on the right with I to the right', cap: 'Question 4' }],
      questions: ['<b>4)</b> Calculate ' + I() + '.'],
      hints: ['Norton method seen by ' + R('C') + ': replace ' + R('C') + ' with a wire (' + R(4) + ' is then short-circuited) and find ' + I('cc') + '.',
        'Call L the top-left node (where ' + R(1) + ', ' + R(2) + ', ' + R(3) + ' and ' + I(3) + ' meet) and N the right-hand node. In short circuit, N is at 0 V: Millman at L gives ' + V('L') + '; the arrow of ' + I(3) + ' brings 5 A to L and takes them from N.',
        R('N') + ': ' + E(1) + ' replaced by a wire, ' + I(3) + ' open; ' + R(4) + ' // (' + R(3) + ' + ' + R(1) + ' // ' + R(2) + ').'],
      solution: [
        { t: 'Short-circuit current (RC replaced by a wire)', html: '<p>N and the bottom wire are at 0 V; ' + R(4) + ' is short-circuited. Millman at node L (branches: ' + E(1) + ' with ' + R(1) + ', ' + R(2) + ' to 0 V, ' + R(3) + ' to N at 0 V, and ' + I(3) + ' entering L):</p><p>' + V('L') + ' = ' + F(E(1) + '/' + R(1) + ' + ' + I(3), '1/' + R(1) + ' + 1/' + R(2) + ' + 1/' + R(3)) + ' = ' + F('1 + 5', '1/10 + 1/10 + 1/3') + ' = ' + F('6', '8/15') + ' = 11.25 V.</p><p>Current from L to N in ' + R(3) + ': 11.25/3 = 3.75 A. At N, ' + I(3) + ' goes back to L (5 A): ' + I('cc') + ' = 3.75 − 5 = −1.25 A (counted in the direction of ' + I() + ').</p>',
          figs: [{ spec: { aria: 'RC replaced by a wire: R4 short-circuited; node L between R1, R2, R3 and I3; node N on the right' }, cap: 'Short circuit in place of RC: R4 no longer carries any current' }] },
        { t: 'Check by superposition', html: '<ul><li>' + E(1) + ' alone (' + I(3) + ' open): ' + V('L') + ' = ' + F(E(1) + '/' + R(1), '8/15') + ' = 15/8 V, ' + I('cc') + '′ = ' + V('L') + '/' + R(3) + ' = 0.625 A.</li><li>' + I(3) + ' alone (' + E(1) + ' replaced by a wire): the 5 A that reach L go back to N through ' + R(3) + ' (3 Ω) or through ' + R(1) + ' // ' + R(2) + ' = 5 Ω and then the short circuit. In ' + R(3) + ': 5 × 5/8 = 3.125 A; at N: ' + I('cc') + '″ = 3.125 − 5 = −1.875 A.</li></ul><p>' + I('cc') + ' = 0.625 − 1.875 = −1.25 A. The archived handwritten solution writes ' + I('cc') + '′ = ' + E(1) + '/(' + R(1) + ' + ' + R(3) + '): it forgets ' + R(2) + ', which diverts part of the current to the bottom wire.</p>' },
        { t: 'Norton resistance (sources turned off)', html: '<p>' + E(1) + ' replaced by a wire, ' + I(3) + ' open: from N, ' + R(4) + ' down to the bottom wire, in parallel with ' + R(3) + ' + ' + R(1) + ' // ' + R(2) + ' = 3 + 5 = 8 Ω.</p><p>' + R('N') + ' = 2 // 8 = ' + F('2 × 8', '10') + ' = 1.6 Ω.</p>' },
        { t: 'Back to RC', html: '<p>' + I() + ' = ' + I('cc') + ' × ' + F(R('N'), R('N') + ' + ' + R('C')) + ' = −1.25 × ' + F('1.6', '10') + ' = −0.2 A (and ' + U('C') + ' = 8.4 × (−0.2) = −1.68 V).</p>',
          figs: [{ spec: { aria: 'Equivalent Norton generator with its load' }, cap: I('N') + ' = ' + I('cc') + ' = −1.25 A and ' + R('N') + ' = 1.6 Ω' }] }
      ],
      answer: '<p>' + I('cc') + ' = −1.25 A; ' + R('N') + ' = 1.6 Ω; ' + I() + ' = −0.2 A</p>',
      traps: ['In short circuit, no current flows through ' + R(4) + '; it comes back for the calculation of ' + R('N') + '.',
        'Turning off ' + I(3) + ' means opening it: ' + R(3) + ' remains alone on the top wire.',
        'The arrow of ' + I(3) + ' points to the left: the source takes its current from the right-hand node and gives it to the left-hand node.']
    },

    /* ===================== Guided study no. 1: discovering the superposition theorem ===================== */
    'hyp-ed1-ex1': {
      src: 'Old guided study no. 1', title: 'Discovering the superposition theorem',
      intro: '<p>In the TDs, we studied together the fundamental laws of electronics (Kirchhoff’s laws, or the loop and node laws), which underlie all reasoning in the study of electronic circuits. There are also theorems whose purpose is to reduce circuits to simpler diagrams in order to make these studies easier.<br>The aim of this guided study is to discover one of these theorems through exercises.</p>' +
        '<p><b>I. Study of a “complex” electronic circuit</b>: consider the circuit of figure 1.<br><b>II. Discovering the theorem</b>: step 1, consider the circuit of figure 2; step 2, consider the circuit of figure 3. <b>3. Conclusion</b>: questions Q4 to Q7.</p>',
      figs: [{ alt: 'Figure 1: E pointing up with R1 in parallel, R2 on the top wire, current source I pointing up, R3 with U drawn upwards', cap: 'Fig. 1' },
        { alt: 'Figure 2: same circuit, the current source is replaced by an open switch', cap: 'Fig. 2' },
        { alt: 'Figure 3: same circuit as figure 1, the source E is replaced by a wire', cap: 'Fig. 3' }],
      questions: ['<b>Q1</b>: Using Kirchhoff’s laws, determine the expression of the voltage ' + U() + ' in terms of ' + E() + ', ' + I() + ' and the resistances.',
        '<b>Q2</b>: Using Kirchhoff’s laws, determine the expression of the voltage ' + U() + ' in terms of ' + E() + ' and the resistances.',
        '<b>Q3</b>: Using Kirchhoff’s laws, determine the expression of the voltage ' + U() + ' in terms of ' + I() + ' and the resistances.',
        '<b>Q4</b>: Compare the circuits of figures 1 and 2. What has the current generator been replaced with?',
        '<b>Q5</b>: Now compare the circuits of figures 1 and 3. What has the voltage generator been replaced with?',
        '<b>Q6</b>: Compare the 3 circuits. What do you notice?',
        '<b>Q7</b>: What can you say about the expression of the voltage ' + U() + ' obtained in part I compared with those obtained in part II? And, in your opinion, what could you have said if you had been asked to find the expression of the current in ' + R(3) + '?',
        'Then propose a statement of a theorem that simplifies the study of a complex electronic circuit. Be as precise and complete as possible!'],
      hints: [R(1) + ' is connected directly across the ideal source ' + E() + ': it does not change the voltage of the top-left wire.',
        'Q1: Kirchhoff’s current law at the node at the top of ' + R(3) + ', with the currents in ' + R(2) + ' and ' + R(3) + ' written using Ohm’s law.',
        'Q4 and Q5: look at what each source has been replaced with: an open switch or a wire?'],
      solution: [
        { t: 'Q1 (fig. 1)', html: '<p>Bottom wire: 0 V. The top-left wire is connected to the + of ' + E() + ': it is at ' + E() + ' (' + R(1) + ', in parallel across ' + E() + ', changes nothing). Call N the node at the top of ' + R(3) + ': ' + V('N') + ' = ' + U() + '.</p><p>Kirchhoff’s current law at N: the current arriving through ' + R(2) + ', (' + E() + ' − ' + U() + ')/' + R(2) + ', plus the current ' + I() + ' of the source, leave through ' + R(3) + ': ' + F(E() + ' − ' + U(), R(2)) + ' + ' + I() + ' = ' + F(U(), R(3)) + '.</p><p>' + U() + ' (' + F('1', R(2)) + ' + ' + F('1', R(3)) + ') = ' + F(E(), R(2)) + ' + ' + I() + ', so ' + U() + ' = ' + F(R(3) + '(' + E() + ' + ' + R(2) + I() + ')', R(2) + ' + ' + R(3)) + '.</p>' },
        { t: 'Q2 (fig. 2)', html: '<p>The open switch lets no current through: ' + R(2) + ' and ' + R(3) + ' are in series across ' + E() + '. Voltage divider:</p><p>' + U() + ' = ' + F(E() + R(3), R(2) + ' + ' + R(3)) + '.</p>' },
        { t: 'Q3 (fig. 3)', html: '<p>' + E() + ' is replaced by a wire: the top-left wire is at 0 V and ' + R(1) + ' is short-circuited. The current ' + I() + ' arrives at N and splits between ' + R(3) + ' and ' + R(2) + ' (which goes back to 0 V). Current divider:</p><p>' + I(3) + ' = ' + I() + ' × ' + F(R(2), R(2) + ' + ' + R(3)) + ', so ' + U() + ' = ' + R(3) + I(3) + ' = ' + F(R(2) + R(3) + I(), R(2) + ' + ' + R(3)) + '.</p><p>The archived handwritten solution writes “' + U() + '(1 − ' + R(2) + '/' + R(3) + ') = ' + R(2) + I() + '”: the correct sign is ' + U() + '(1 + ' + R(2) + '/' + R(3) + ') = ' + R(2) + I() + '. The result it boxes is correct.</p>' },
        { t: 'Q4, Q5 and Q6', html: '<ul><li><b>Q4</b>: the current source has been replaced by an open switch (an open circuit): it is a “turned-off” current source, which forces 0 A.</li><li><b>Q5</b>: the voltage source has been replaced by a wire (a short circuit): it is a “turned-off” voltage source, which forces 0 V.</li><li><b>Q6</b>: figures 2 and 3 each keep only one of the two sources, the other one being turned off. All the resistors are still there, in the same places.</li></ul>' },
        { t: 'Q7 and statement of the theorem', html: '<p>' + U() + ' in figure 1 is the sum of the other two: ' + F(E() + R(3), R(2) + ' + ' + R(3)) + ' + ' + F(R(2) + R(3) + I(), R(2) + ' + ' + R(3)) + ' = ' + F(R(3) + '(' + E() + ' + ' + R(2) + I() + ')', R(2) + ' + ' + R(3)) + '. The same would hold for the current in ' + R(3) + ': ' + I(3) + ' = ' + U() + '/' + R(3) + ' is the sum of the currents obtained with each source alone.</p><p><b>Superposition theorem</b>: in a linear circuit containing several independent sources, the voltage between two points (or the current in a branch) is the sum of the voltages (or currents) that each source would produce acting alone, the others being turned off. A turned-off voltage source is replaced by a wire, a turned-off current source by an open circuit; the resistors stay in place.</p>' }
      ],
      answer: '<p>' + U() + ' = ' + R(3) + '(' + E() + ' + ' + R(2) + I() + ')/(' + R(2) + ' + ' + R(3) + '); figure 2: ' + E() + R(3) + '/(' + R(2) + ' + ' + R(3) + '); figure 3: ' + R(2) + R(3) + I() + '/(' + R(2) + ' + ' + R(3) + '); the first is the sum of the other two: superposition theorem.</p>',
      traps: ['Turning off a current source means opening it; replacing it with a wire would be a mistake.',
        'Turning off a voltage source means replacing it with a wire: ' + R(1) + ' is then short-circuited.',
        'Superposition works for voltages and currents, not for powers (they are not proportional to the sources).']
    },

    /* ===================== End-of-semester exam of January 2018 (DC only) ===================== */
    'hyp-partiel-ex1a': {
      src: 'Old end-of-semester exam · Ex 1 · Q1 to Q3, Q10, Q11', title: 'Course MCQ: generators, conventions, units, dimensional consistency',
      intro: pa1,
      figs: [{ alt: 'Dipole between A and B: current arrow IAB towards B on the wire, and voltage arrow UAB under the dipole, also pointing towards B', cap: 'Diagram for question 2' }],
      questions: ['<b>1.</b> The current leaving a generator (current or voltage generator) is necessarily greater than the current entering it.<br>a- TRUE &nbsp;·&nbsp; b- FALSE',
        '<b>2.</b> Consider the following diagram (several answers):<br>a- The dipole is a receiver dipole if ' + I('AB') + ' and ' + U('AB') + ' have opposite signs<br>b- The dipole is a generator dipole if ' + I('AB') + ' and ' + U('AB') + ' have the same sign<br>c- The dipole is a receiver dipole if ' + I('AB') + ' and ' + U('AB') + ' have the same sign<br>d- The current/voltage arrows correspond to the generator convention.',
        '<b>3.</b> If you apply Ohm’s law with the resistance in kΩ and the current in mA, you directly get the voltage in:<br>a- A &nbsp;·&nbsp; b- mA<br>b- V &nbsp;·&nbsp; c- MV',
        '<b>10.</b> A voltage generator ' + E() + ' in series with a resistor ' + R() + ' is equivalent to a current generator ' + I() + ' in parallel with a resistor ' + Rr + ' if:<br>a- ' + R() + '.' + E() + ' = ' + F(R(), Rr) + I() + ' and ' + Rr + ' = ' + R() + ' &nbsp;·&nbsp; a- ' + E() + ' = ' + R() + '.' + I() + ' and ' + I() + ' = ' + F(E(), '(' + R() + ' + ' + Rr + ')/(' + R() + '.' + Rr + ')') + '<br>b- ' + Rr + ' = ' + R() + ' and ' + E() + ' = ' + R() + '.' + I() + ' &nbsp;·&nbsp; b- ' + R() + ' = ' + Rr + ' and ' + E() + ' = ' + F(I(), R()),
        '<b>11.</b> Which formula is wrong? (' + E('i') + ' and ' + U() + ' in volts, ' + I('i') + ' in amperes, ' + R('i') + ' in ohms)<br>a. ' + I() + ' = ' + F(R(1), R(1) + ' + ' + R(2)) + '.' + I(1) + ' &nbsp;·&nbsp; c. ' + U() + ' = ' + F(R(1) + '.' + E(1) + ' − ' + R(2) + '.' + I(2), R(1) + '.' + R(2) + ' + ' + R(1) + '.' + R(3) + ' + ' + R(2) + '.' + R(3)) + '<br>b. ' + U() + ' = ' + F(R(1) + '.' + R(2), R(1) + ' + ' + R(2)) + '.' + I(1) + ' &nbsp;·&nbsp; d. ' + U() + ' = ' + F(E(), R(1) + '/' + R(2) + ' + ' + R(3) + '/' + R(4) + ' + 1')],
      hints: ['Q1: think of Kirchhoff’s current law applied to the generator itself.',
        'Q2: compare the directions of the two arrows drawn (current and voltage), whatever name the voltage is given.',
        'Q11: check the dimensional consistency of each formula: you can only add terms with the same unit.'],
      solution: [
        { t: 'Q1', html: '<p><b>b- FALSE.</b> A generator is a dipole: the current entering it through one terminal leaves through the other (Kirchhoff’s current law). It gives energy to the charges, not extra charges.</p>' },
        { t: 'Q2', html: '<p><b>a, b and d.</b> The arrows ' + I('AB') + ' and ' + U('AB') + ' point the same way: this is the generator convention (d). In this convention, ' + U() + I() + ' is the power supplied: same sign, the dipole supplies energy, it is a generator (b); opposite signs, it receives energy, it is a receiver (a). So c is wrong.</p><p>Note: the arrow named ' + U('AB') + ' points towards B here, whereas the course puts the head of ' + U('AB') + ' on A. For this question, only the drawn direction matters.</p>' },
        { t: 'Q3', html: '<p><b>“b- V”</b> (second line; the subject prints the letter b twice). kΩ × mA = 10³ Ω × 10⁻³ A = Ω × A = V.</p>' },
        { t: 'Q10', html: '<p><b>b- in the left column: ' + Rr + ' = ' + R() + ' and ' + E() + ' = ' + R() + '.' + I() + '.</b> A Thévenin generator (' + E() + ', ' + R() + ') is equivalent to a Norton generator of current ' + I() + ' = ' + E() + '/' + R() + ' with the same resistance in parallel.</p><p>The others are wrong: the first line on the left gives ' + E() + ' = ' + I() + '/' + R() + ' once ' + Rr + ' = ' + R() + ' (not dimensionally consistent); on the right, ' + E() + R() + Rr + '/(' + R() + ' + ' + Rr + ') is not a current, and ' + E() + ' = ' + I() + '/' + R() + ' is not dimensionally consistent.</p>' },
        { t: 'Q11', html: '<p><b>c.</b> In the numerator, ' + R(1) + '.' + E(1) + ' is in Ω·V while ' + R(2) + '.' + I(2) + ' is in V: you are adding quantities with different units, so the formula is necessarily wrong (and the whole would be in V/Ω, that is in A, not in V).</p><p>The others are dimensionally consistent: a gives a current (dimensionless × A), b a voltage (Ω × A), d a voltage (V divided by a dimensionless number).</p>' }
      ],
      answer: '<p>1: b (FALSE); 2: a, b, d; 3: V; 10: ' + Rr + ' = ' + R() + ' and ' + E() + ' = ' + R() + '.' + I() + '; 11: c</p>',
      traps: ['Q2: the name ' + U('AB') + ' tells you nothing here, only the direction of the arrowheads matters.',
        'Q3: the k (×10³) and the m (×10⁻³) cancel out.',
        'Q11: a dimensionally consistent formula can be wrong, but an inconsistent formula is always wrong.']
    },

    'hyp-partiel-ex1b': {
      src: 'Old end-of-semester exam · Ex 1 · Q4 to Q9', title: 'MCQ on diagrams: equivalent resistances, dividers, reading the arrows',
      intro: pa1,
      figs: [{ alt: 'Question 4: 3R between the wire of A and the wire of B, 3R then two 6R in parallel, and 6R between A and B', cap: 'Diagram for question 4' },
        { alt: 'Question 5: R from A to a node, then 3R to the wire of B, and R followed by two 4R in parallel to the wire of B', cap: 'Diagram for question 5' },
        { alt: 'Question 6: 20 V source, 2R at the top, R on the right, 2R at the bottom; U drawn downwards across R', cap: 'Diagram for question 6' },
        { alt: 'Question 7: current source I with R in series, then R (current I1) and 3R in parallel', cap: 'Diagram for question 7' },
        { alt: 'Question 8: current source I0 (voltage U0), R1 (U1 drawn to the left), source E2, R2 (I2 to the left), source E3, R3 (U3), R4', cap: 'Diagram for question 8' },
        { alt: 'Question 9: E, R at the top, current source I pointing up, R on the right with U', cap: 'Diagram for question 9' }],
      questions: ['<b>4.</b> What is the resistance seen between <i>A</i> and <i>B</i>?<br>a. 3' + R() + ' &nbsp;·&nbsp; b. ' + R() + ' &nbsp;·&nbsp; c. ' + F('3', '2') + R() + ' &nbsp;·&nbsp; d. ' + F('2', '3') + R(),
        '<b>5.</b> What is the resistance seen between <i>A</i> and <i>B</i>?<br>a. ' + F('15', '23') + R() + ' &nbsp;·&nbsp; b. ' + F('3', '5') + R() + ' &nbsp;·&nbsp; c. ' + F('5', '2') + R() + ' &nbsp;·&nbsp; d. ' + F('5', '3') + R(),
        '<b>6.</b> Consider the circuit opposite. What is ' + U() + '?<br>a- 20 V &nbsp;·&nbsp; b- −4 V &nbsp;·&nbsp; c- 4 V &nbsp;·&nbsp; d- −8 V',
        '<b>7.</b> Which formula is correct?<br>a- ' + I(1) + ' = ' + F('3', '5') + '.' + I() + ' &nbsp;·&nbsp; b- ' + I(1) + ' = ' + F(I(), '4') + ' &nbsp;·&nbsp; c- ' + I(1) + ' = ' + F('3', '4') + '.' + I() + ' &nbsp;·&nbsp; d- ' + I(1) + ' = ' + F('3' + R(), '4') + I(),
        'Consider the following circuit, where ' + I(0) + ', ' + E(2) + ', ' + E(3) + ', ' + R(1) + ', ' + R(2) + ', ' + R(3) + ', ' + R(4) + ' are assumed to be known.<br><b>8.</b> Which statements are false? (2 answers)<br>a- ' + I(2) + ' does not depend on ' + R(3) + ' &nbsp;·&nbsp; b- ' + I(0) + ' depends on ' + R(1) + ' &nbsp;·&nbsp; c- ' + U(1) + ' = ' + R(1) + '.' + I(0) + ' &nbsp;·&nbsp; d- ' + U(0) + ' does not depend on ' + R(1),
        '<b>9.</b> Consider the circuit opposite: what is the expression of ' + U() + '?<br>a- ' + U() + ' = ' + R() + '.' + I() + ' &nbsp;·&nbsp; b- ' + U() + ' = ' + F(E(), '2') + ' &nbsp;·&nbsp; c- ' + U() + ' = ' + E() + ' + ' + I() + ' &nbsp;·&nbsp; d- ' + U() + ' = ' + F(E() + ' + ' + R() + '.' + I(), '2')],
      hints: ['Q4 and Q5: find the wires connected to A and to B, then reduce step by step starting from the farthest part.',
        'Q6: a single loop; watch the direction of the arrow ' + U() + ' (downwards).',
        'Q8: a current source forces its current no matter what; a voltage source sets the potential of its node.'],
      solution: [
        { t: 'Q4', html: '<p><b>c.</b> The 3' + R() + ' on the left and the 6' + R() + ' on the right are directly between the wire of A and the wire of B. In the middle: 3' + R() + ' + (6' + R() + ' // 6' + R() + ') = 3' + R() + ' + 3' + R() + ' = 6' + R() + '. In total: 3' + R() + ' // 6' + R() + ' // 6' + R() + ' = 3' + R() + ' // 3' + R() + ' = ' + F('3' + R(), '2') + '.</p>' },
        { t: 'Q5', html: '<p><b>c.</b> From A, ' + R() + ' leads to node P. Between P and the wire of B: the 3' + R() + ', and ' + R() + ' + (4' + R() + ' // 4' + R() + ') = 3' + R() + '. So 3' + R() + ' // 3' + R() + ' = 3' + R() + '/2, and ' + R('AB') + ' = ' + R() + ' + ' + F('3' + R(), '2') + ' = ' + F('5' + R(), '2') + '.</p>' },
        { t: 'Q6', html: '<p><b>b.</b> A single loop: ' + I() + ' = 20/(2' + R() + ' + ' + R() + ' + 2' + R() + ') = 4/' + R() + '. The current flows down through ' + R() + ': the top of ' + R() + ' is 4 V above the bottom. ' + U() + ' is drawn downwards (arrowhead at the bottom): ' + U() + ' = ' + V('bottom') + ' − ' + V('top') + ' = −4 V.</p>' },
        { t: 'Q7', html: '<p><b>c.</b> The source sets ' + I() + '; the ' + R() + ' in series with it changes nothing. ' + I() + ' splits between ' + R() + ' and 3' + R() + ': current divider, ' + I(1) + ' = ' + I() + ' × ' + F('3' + R(), R() + ' + 3' + R()) + ' = ' + F('3', '4') + I() + '.</p>' },
        { t: 'Q8', html: '<p><b>b and d</b> (false statements).</p><ul><li>a is true: the two ends of ' + R(2) + ' are connected to the + of ' + E(2) + ' and ' + E(3) + ', so ' + I(2) + ' = (' + E(3) + ' − ' + E(2) + ')/' + R(2) + ', without ' + R(3) + '.</li><li>b is false: ' + I(0) + ' is set by the current source.</li><li>c is true: ' + I(0) + ' flows through ' + R(1) + ', and ' + U(1) + ' is drawn with the receiver convention.</li><li>d is false: ' + U(0) + ' = ' + E(2) + ' + ' + R(1) + I(0) + ' depends on ' + R(1) + '.</li></ul>' },
        { t: 'Q9', html: '<p><b>d.</b> Millman at the top-right node: ' + U() + ' = ' + F(E() + '/' + R() + ' + ' + I(), '1/' + R() + ' + 1/' + R()) + ' = ' + F(E() + ' + ' + R() + I(), '2') + '.</p>' }
      ],
      answer: '<p>4: c (3' + R() + '/2); 5: c (5' + R() + '/2); 6: b (−4 V); 7: c (' + I(1) + ' = 3' + I() + '/4); 8: b and d; 9: d</p>',
      traps: ['Q6: the arrow ' + U() + ' points down: ' + U() + ' = −4 V, not 4 V.',
        'Q7: the ' + R() + ' in series with the current source does not change the current ' + I() + '.',
        'Q8: the question asks for the false statements.']
    },

    'hyp-partiel-ex2': {
      src: 'Old end-of-semester exam · Ex 2', title: 'Thévenin seen by R′: a current source in series and a voltage source',
      intro: '<p><b>Exercise 2.</b> Thévenin’s theorem (5 points)</p><p>Consider the following circuit, in which ' + E() + ', ' + I() + ' and ' + R() + ' are known. The generators are independent.</p>',
      figs: [{ alt: 'B at the top left, A at the top middle, M at the bottom; on the left, current source I pointing up then 2R up to B; 2R between B and A; from A, R then E pointing up, down to M; R′ between A and M; UAM and UBM drawn upwards', cap: 'Exercise 2' }],
      questions: ['<b>1.</b> Determine the Thévenin equivalent seen by ' + Rp + '.', '<b>2.</b> Then determine the voltage ' + U('AM') + ' if ' + Rp + ' = ' + R() + '.', '<b>3.</b> Deduce the voltage ' + U('BM') + '.'],
      hints: ['Without ' + Rp + ', the left branch, the top 2' + R() + ', ' + R() + ' and ' + E() + ' form a single loop: the current source forces ' + I() + ' in it.',
        E('th') + ' = ' + U('AM') + ' with no load: start from M, go up through ' + E() + ', then through ' + R() + ' (where ' + I() + ' flows from A towards ' + E() + ').',
        R('th') + ': ' + E() + ' replaced by a wire, the current source open. The left branch then leads nowhere.'],
      solution: [
        { t: 'Thévenin voltage (R′ disconnected)', html: '<p>Without ' + Rp + ', a single loop remains: current source, 2' + R() + ', 2' + R() + ', ' + R() + ', ' + E() + '. The source forces ' + I() + ' everywhere. ' + I() + ' flows through ' + R() + ' from A towards ' + E() + ': A is ' + R() + I() + ' above the + of ' + E() + '. With ' + V('M') + ' = 0:</p><p>' + E('th') + ' = ' + U('AM') + ' = ' + E() + ' + ' + R() + I() + '.</p>',
          figs: [{ spec: { aria: 'R′ disconnected: a single loop where the source forces I; E_th between A and M' }, cap: 'Load disconnected: no-load voltage' }] },
        { t: 'Thévenin resistance (sources turned off)', html: '<p>' + E() + ' replaced by a wire, current source open: the left branch (source and two 2' + R() + ') leads nowhere, no current can flow in it. Between A and M, ' + R() + ' remains:</p><p>' + R('th') + ' = ' + R() + '.</p>',
          figs: [{ spec: { aria: 'Sources turned off: the branch of the current source is open, E is replaced by a wire; R remains between A and M', parts: parts(10, { 4: { s: 'E → wire' } }) }, cap: 'Sources turned off: the branch of the (open) current source is faded' }] },
        { t: 'Voltage between A and M for R′ = R', html: '<p>The circuit is equivalent to the generator (' + E('th') + ', ' + R('th') + ') loaded by ' + Rp + '. Voltage divider:</p><p>' + U('AM') + ' = ' + F(Rp, R() + ' + ' + Rp) + ' (' + E() + ' + ' + R() + I() + '), and for ' + Rp + ' = ' + R() + ': ' + U('AM') + ' = ' + F(E() + ' + ' + R() + I(), '2') + '.</p>',
          figs: [{ spec: { aria: 'Equivalent Thévenin generator with its load' }, cap: E('th') + ' = ' + E() + ' + ' + R() + I() + ' and ' + R('th') + ' = ' + R() }] },
        { t: 'Voltage between B and M', html: '<p>Even with ' + Rp + ' connected, the current source forces ' + I() + ' in the left branch, and so in the top 2' + R() + ', from B to A: ' + U('BA') + ' = 2' + R() + I() + '. Kirchhoff’s voltage law:</p><p>' + U('BM') + ' = ' + U('BA') + ' + ' + U('AM') + ' = 2' + R() + I() + ' + ' + F(E() + ' + ' + R() + I(), '2') + ' = ' + F(E() + ' + 5' + R() + I(), '2') + '.</p>' }
      ],
      answer: '<p>' + E('th') + ' = ' + E() + ' + ' + R() + I() + '; ' + R('th') + ' = ' + R() + '; ' + U('AM') + ' = (' + E() + ' + ' + R() + I() + ')/2; ' + U('BM') + ' = (' + E() + ' + 5' + R() + I() + ')/2</p>',
      traps: ['The two 2' + R() + ' in series with the current source play no role in ' + E('th') + ' or in ' + R('th') + '.',
        'For ' + U('BM') + ', do not forget the voltage 2' + R() + I() + ' across the top 2' + R() + ': ' + I() + ' always flows through it.']
    },

    'hyp-partiel-ex3': {
      src: 'Old end-of-semester exam · Ex 3', title: 'Voltage across R1: four sources, method of your choice',
      intro: '<p><b>Exercise 3.</b> Theorems (7 points)</p><p>Consider the circuit below:</p>',
      figs: [{ alt: 'E on the left, 2R at the top, vertical 2R, current source I pointing down, source 2E on the top wire pointing left, R, then current source 2I to the right in parallel with R, and R1 on the right', cap: 'Exercise 3' }],
      questions: ['Using the method of your choice, determine the expression of the voltage across the resistor ' + R(1) + ' in terms of ' + E() + ', ' + I() + ', ' + R() + ' and ' + R(1) + '.'],
      hints: ['An efficient method: transform step by step (Thévenin ⇄ Norton) starting from the left, until only one source and one resistor remain in front of ' + R(1) + '.',
        E() + ' and its 2' + R() + ' in series give a Norton equivalent ' + E() + '/(2' + R() + ') with 2' + R() + '. With the vertical 2' + R() + ' and the source ' + I() + ', everything is in parallel: a source ' + E() + '/(2' + R() + ') − ' + I() + ' and ' + R() + '.',
        'The block “2' + I() + ' in parallel with ' + R() + '” is a Norton equivalent: its Thévenin equivalent is 2' + R() + I() + ', drawn to the right. Add the sources in series, respecting their directions.'],
      solution: [
        { t: 'Left part', html: '<ol><li>' + E() + ' in series with 2' + R() + ' → Norton: source ' + E() + '/(2' + R() + ') upwards, in parallel with 2' + R() + '.</li><li>Everything is then in parallel with the vertical 2' + R() + ' and the source ' + I() + ' (pointing down): sources ' + E() + '/(2' + R() + ') − ' + I() + ', resistors 2' + R() + ' // 2' + R() + ' = ' + R() + '.</li><li>Back to Thévenin: source (' + E() + '/(2' + R() + ') − ' + I() + ') × ' + R() + ' = ' + E() + '/2 − ' + R() + I() + ' (upwards) in series with ' + R() + '.</li></ol>' },
        { t: 'Right part', html: '<p>The block “2' + I() + ' (to the right) in parallel with ' + R() + '” is a Norton equivalent. Its Thévenin equivalent: a source 2' + R() + I() + ' drawn to the right (the + on the side where the current comes out), in series with ' + R() + '.</p><p>On the top wire, the source 2' + E() + ' (drawn to the left) and the source 2' + R() + I() + ' (to the right) are in series: a single source 2' + R() + I() + ' − 2' + E() + ' drawn to the right. The two ' + R() + ' on the top wire make 2' + R() + '.</p>',
          figs: [{ spec: { aria: 'Source E/2 − RI with R, then source 2RI − 2E drawn to the right and 2R, then R1' }, cap: 'After the transformations (as in the official answer key)' }] },
        { t: 'A single loop', html: '<p>The two sources are in series: starting from the bottom of ' + R(1) + ', you go up by ' + E() + '/2 − ' + R() + I() + ' and then by 2' + R() + I() + ' − 2' + E() + '. Total source: ' + R() + I() + ' − 3' + E() + '/2; total resistance: ' + R() + ' + 2' + R() + ' = 3' + R() + '.</p><p>Voltage divider on ' + R(1) + ' (' + U() + ' drawn upwards):</p><p>' + U() + ' = (' + R() + I() + ' − ' + F('3' + E(), '2') + ') × ' + F(R(1), R(1) + ' + 3' + R()) + ' = ' + F(R(1), '2(' + R(1) + ' + 3' + R() + ')') + ' (2' + R() + I() + ' − 3' + E() + ').</p>',
          figs: [{ spec: { aria: 'Equivalent Thévenin generator with its load' }, cap: 'Equivalent generator seen by R1' }] },
        { t: 'Check by superposition (official answer key)', html: '<ul><li>' + E() + ' alone: ' + U(1) + ' = ' + F(R(1), '2(3' + R() + ' + ' + R(1) + ')') + E() + ';</li><li>' + I() + ' alone: ' + U(2) + ' = −' + F(R() + R(1), '3' + R() + ' + ' + R(1)) + I() + ';</li><li>2' + E() + ' alone: ' + U(3) + ' = −' + F(R(1), '3' + R() + ' + ' + R(1)) + ' × 2' + E() + ';</li><li>2' + I() + ' alone: ' + U(4) + ' = ' + F('2' + R() + R(1), '3' + R() + ' + ' + R(1)) + I() + '.</li></ul><p>' + U() + ' = ' + U(1) + ' + ' + U(2) + ' + ' + U(3) + ' + ' + U(4) + ' = ' + F(R(1), '3' + R() + ' + ' + R(1)) + ' (' + E() + '/2 − ' + R() + I() + ' − 2' + E() + ' + 2' + R() + I() + '): same result.</p>' }
      ],
      answer: '<p>' + U() + ' = ' + R(1) + '(2' + R() + I() + ' − 3' + E() + ')/(2(' + R(1) + ' + 3' + R() + ')), drawn upwards across ' + R(1) + '</p>',
      traps: ['The source 2' + E() + ' is drawn to the left: it opposes ' + E() + '/2 in the final loop.',
        'A current source in parallel with a resistor becomes a voltage source (resistance × current) in series with this resistor: the + is on the side where the current comes out.',
        'With superposition, there are four states to calculate; a turned-off current source is open.']
    },

    'hyp-partiel-ex4': {
      src: 'Old end-of-semester exam · Ex 4', title: 'Millman with two trick branches',
      intro: '<p><b>Exercise 4.</b> Millman’s theorem (2 points)</p><p>Consider the circuit opposite.</p>',
      figs: [{ alt: 'Between A at the top and B at the bottom: current source I1 pointing down; R1 then E1 pointing up; R2 then current source I2 pointing up; R3 then E3 pointing down, with R4 in parallel across E3; U drawn from B to A', cap: 'Exercise 4' }],
      questions: ['Determine ' + U() + ' using Millman’s theorem.'],
      hints: ['Take B as the reference: ' + U() + ' = ' + V('A') + '. Millman’s theorem applies at node A.',
        'A branch “current source + resistor in series” only brings its current: the resistor does not appear.',
        R(4) + ' is in parallel across the ideal source ' + E(3) + ': it does not change the voltage of the point between ' + R(3) + ' and ' + E(3) + '.'],
      solution: [
        { t: 'What each branch brings to node A', html: '<ul><li>' + I(1) + ' (arrow pointing down) takes ' + I(1) + ' away from node A: −' + I(1) + ' in the numerator, nothing in the denominator.</li><li>' + R(1) + ' and ' + E(1) + ' (arrow pointing up): +' + E(1) + '/' + R(1) + ' in the numerator, 1/' + R(1) + ' in the denominator.</li><li>' + R(2) + ' and ' + I(2) + ' (arrow pointing up): the branch brings ' + I(2) + '; ' + R(2) + ', in series with a current source, does not count.</li><li>' + R(3) + ' and ' + E(3) + ' (arrow pointing down, + at the bottom): the point between ' + R(3) + ' and ' + E(3) + ' is at −' + E(3) + ', whatever ' + R(4) + ': −' + E(3) + '/' + R(3) + ' in the numerator, 1/' + R(3) + ' in the denominator.</li></ul>',
          figs: [{ spec: { aria: 'What Millman sees at node A: R2, in series with I2, and R4, in parallel across E3, are faded' }, cap: 'R2 and R4 faded: they play no part' }] },
        { t: 'Millman’s theorem', html: '<p>' + U() + ' = ' + V('A') + ' = ' + F(E(1) + '/' + R(1) + ' − ' + I(1) + ' + ' + I(2) + ' − ' + E(3) + '/' + R(3), '1/' + R(1) + ' + 1/' + R(3)) + ' = ' + F(R(3) + E(1) + ' + ' + R(1) + R(3) + '(' + I(2) + ' − ' + I(1) + ') − ' + R(1) + E(3), R(1) + ' + ' + R(3)) + '.</p>' }
      ],
      answer: '<p>' + U() + ' = (' + E(1) + '/' + R(1) + ' − ' + I(1) + ' + ' + I(2) + ' − ' + E(3) + '/' + R(3) + ')/(1/' + R(1) + ' + 1/' + R(3) + ') = (' + R(3) + E(1) + ' + ' + R(1) + R(3) + '(' + I(2) + ' − ' + I(1) + ') − ' + R(1) + E(3) + ')/(' + R(1) + ' + ' + R(3) + ')</p>',
      traps: ['No 1/' + R(2) + ' in the denominator: ' + R(2) + ' is in series with a current source.',
        'No ' + R(4) + ': it is in parallel across the voltage source ' + E(3) + '.',
        E(3) + ' is drawn downwards: it counts −' + E(3) + '/' + R(3) + '.']
    }
  });
})();
