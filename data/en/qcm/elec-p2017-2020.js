/* English text for data/qcm/elec-p2017-2020.js (lesson questions of the Nov. 2017, Oct. 2018 and Nov. 2020 midterms).
   Nov. 2017: official English wording, word for word. 2018 and 2020 (no English paper): translated, reusing the
   wording of the English papers whenever the same question was asked (2017, 2021, 2023). */
(function () {
  /* The French file gives several questions the same VRAI / FAUX array (VF): each question gets its own copy,
     otherwise the English merge would rewrite the shared array for all of them (and upset deduplication). */
  if (REV.i18n.lang === 'en') (window.QCM_BANK || []).forEach(function (q) { if (/^elec-p20(17|18|20)-/.test(q.id) && q.o) q.o = q.o.slice(); });

  function sub(i) { return i == null ? '' : '<sub>' + i + '</sub>'; }
  function v(s, i) { return '<var>' + s + '</var>' + sub(i); }
  function u(s, i) { return '<var class="u">' + s + '</var>' + sub(i); }
  function c(s, i) { return '<var class="i">' + s + '</var>' + sub(i); }
  var R = v('R'), R1 = v('R', 1), R2 = v('R', 2), R3 = v('R', 3), R4 = v('R', 4), E = u('E'), U = u('U');
  var TF = ['TRUE', 'FALSE'];
  var RES = 'Consider the following resistances ' + R1 + ' = 1 Ω and ' + R2 + ' = 1 kΩ. Compute the equivalent resistance: ';
  /* 2018 Q9 and Q10: only the two captions of the figure (parts 9 and 10) and its description change */
  function eq18(lab) {
    return { aria: 'Left: source E, R1 on the top wire, R3 and R4 in series down to the bottom wire, R2 then a wire down. Right: source E and a single resistor ' + lab,
      parts: [null, null, null, null, null, null, null, null, null, { s: 'original circuit' }, { s: 'equivalent circuit' }] };
  }

  REV.i18n.qcm({
    /* ---------- Midterm Nov. 2017, Ex 1 (A: MCQ), official English wording ---------- */
    'elec-p2017-q1': { q: 'A potential difference between 2 points is called:',
      o: ['A current', 'A voltage', 'A power', 'A conductance'],
      x: 'By definition, the voltage between A and B is the potential difference ' + u('U', 'AB') + ' = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub>. Current measures a flow of charges, power is energy per second, and conductance is the inverse of a resistance.' },
    'elec-p2017-q2': { q: 'To measure the current intensity in some dipole, one uses an ammeter which is in series with that dipole.',
      o: TF,
      x: 'The ammeter must carry the current being measured: you open the branch and insert it there, in series. It is the voltmeter that is connected in parallel.' },
    'elec-p2017-q4': { q: 'In the following sketch one considers the currents: ' + c('I', 1) + ' = 5 mA; ' + c('I', 2) + ' = 1 mA; ' + c('I', 3) + ' = 1 mA; ' + c('I', 4) + ' = −3 mA. Compute current ' + c('I') + '.',
      fig: { aria: 'A node and five wires: I1, I2 and I4 come into the node, I3 and I leave it' },
      x: 'Kirchhoff’s current law: what comes in (' + c('I', 1) + ', ' + c('I', 2) + ', ' + c('I', 4) + ') equals what goes out (' + c('I', 3) + ', ' + c('I') + '). ' + c('I', 1) + ' + ' + c('I', 2) + ' + ' + c('I', 4) + ' = ' + c('I', 3) + ' + ' + c('I') + ', so ' + c('I') + ' = 5 + 1 + (−3) − 1 = 2 mA. The other choices are sign errors: 8 mA if you forget the sign of ' + c('I', 4) + ', 4 mA if you count ' + c('I', 3) + ' as incoming, 10 mA if you add everything in absolute value.' },

    /* ---------- Midterm Nov. 2017, Ex 1 (B: equivalent resistances), official English wording ---------- */
    'elec-p2017-b1': { q: RES + '<b>' + R2 + ' and ' + R2 + ' in series</b>.',
      x: 'In series, resistances add up: ' + R2 + ' + ' + R2 + ' = 1 + 1 = 2 kΩ.' },
    'elec-p2017-b2': { q: RES + '<b>' + R1 + ' and ' + R2 + ' in series</b>.',
      x: 'Convert before adding: 1 kΩ = 1000 Ω, so ' + R1 + ' + ' + R2 + ' = 1 + 1000 = 1001 Ω. In practice, ' + R1 + ' is negligible compared with ' + R2 + ': 1001 Ω ≈ 1 kΩ.' },
    'elec-p2017-b3': { q: RES + '<b>' + R1 + ' and ' + R1 + ' in parallel</b>.',
      x: 'Two equal resistances in parallel are worth half of one: ' + R1 + '·' + R1 + '/(' + R1 + ' + ' + R1 + ') = ' + R1 + '/2 = 0.5 Ω.' },
    'elec-p2017-b4': { q: RES + '<b>10 resistances ' + R1 + ' in series</b>.',
      x: 'In series, you add: 10 × ' + R1 + ' = 10 Ω.' },
    'elec-p2017-b5': { q: RES + '<b>10 resistances ' + R2 + ' in parallel</b>.',
      x: '<var>n</var> equal resistances in parallel are worth ' + R + '/<var>n</var>: 1000/10 = 100 Ω. The trap is to write 10 × ' + R2 + ': in parallel, the equivalent resistance is smaller than each of them.' },

    /* ---------- Midterm Oct. 2018, Ex 1 ---------- */
    'elec-p2018-q1': { q: 'A node of a circuit corresponds to',
      o: ['A terminal of a resistor', 'The interconnection of at least 3 wires', 'A terminal of a generator', 'The interconnection of 2 or more wires'],
      x: 'A node is a junction: at least three wires meet there. A point that connects only two wires is a simple connection, and the two dipoles on either side of it are in series.' },
    'elec-p2018-q3': { q: 'To measure the voltage across a dipole, one uses a voltmeter connected in series with this dipole.',
      o: TF,
      x: 'A voltage is measured between two points: the voltmeter is connected in parallel with (across) the dipole. It is the ammeter that is connected in series.' },
    'elec-p2018-q4': { q: 'Current entering a passive dipole is greater than the one leaving it.',
      o: TF,
      x: 'A dipole does not store charges: all the current that goes in comes out, whether the dipole is passive or not. A resistor consumes energy, not current.' },
    'elec-p2018-q5': { q: 'If two dipoles carry the same current, they are said to be:',
      o: ['In series', 'In parallel'],
      x: 'Course definition: dipoles in series carry the same current. Dipoles in parallel have the same voltage.' },
    'elec-p2018-q6': { q: 'If two dipoles belong to the same loop, they are said to be:',
      o: ['In series', 'In parallel', 'Nothing can be said'],
      x: 'A loop is a closed path that can pass through several nodes. Two dipoles of the same loop can be separated by a node (so not in series) without connecting the same two nodes (so not in parallel): nothing can be said. In the same branch, on the other hand, they are in series.' },
    'elec-p2018-q7': { q: 'A closed switch has:',
      o: ['an infinite current flowing through it', 'zero voltage across it', 'an infinite voltage across it', 'None of these answers'],
      x: 'When closed, it is a perfect wire: the voltage across it is zero. The current flowing through it is set by the rest of the circuit; there is no reason for it to be infinite.' },
    'elec-p2018-q8': { q: 'An open switch has:',
      o: ['an infinite current flowing through it', 'zero voltage across it', 'an infinite voltage across it', 'None of these answers'],
      x: 'When open, it is a gap: the current is zero. The voltage across it is imposed by the rest of the circuit; in general it is neither zero nor infinite. None of the choices fits.' },
    'elec-p2018-q9': { q: 'Consider the following circuit (left). If ' + R1 + ' = ' + R2 + ' = ' + R3 + ' = ' + R4 + ' = ' + R + ', then this circuit is equivalent to the following circuit (right), with:',
      fig: eq18('R′'),
      x: 'The right-hand wire connects ' + R2 + ' to the bottom wire: ' + R2 + ' is in parallel with ' + R3 + ' + ' + R4 + '. ' + R + ' // 2' + R + ' = 2' + R + '/3, then in series with ' + R1 + ': ' + R + ' + 2' + R + '/3 = 5' + R + '/3. The answer 3/' + R + ' does not even have the dimension of a resistance.' },
    'elec-p2018-q10': { q: 'Consider the following circuit (left). If ' + R2 + ' = ' + R3 + ' = ' + R4 + ' = ' + R + ', what must ' + R1 + ' be for this circuit to be equivalent to the following circuit (right):',
      fig: eq18('R'),
      x: 'You need ' + R1 + ' + ' + R + ' // 2' + R + ' = ' + R + ', i.e. ' + R1 + ' + 2' + R + '/3 = ' + R + ', so ' + R1 + ' = ' + R + '/3. The choice 1/(3' + R + ') does not have the dimension of a resistance: rule it out straight away.' },

    /* ---------- Midterm Nov. 2020, Ex 1 ---------- */
    'elec-p2020-q1': { q: 'A loop of a circuit corresponds to a portion of a circuit located between two consecutive nodes.',
      o: TF,
      x: 'That is the definition of a branch. A loop is a closed path in the circuit that comes back to its starting point.' },
    'elec-p2020-q2': { q: 'To measure the intensity of the current flowing through a dipole, one uses an ammeter connected in series with this dipole.',
      o: TF,
      x: 'The ammeter must carry the current being measured, so it goes in series. The same statement was already asked in 2017.' },
    'elec-p2020-q3': { q: 'Current entering a receiver dipole is greater than the one leaving it.',
      o: TF,
      x: 'Current is conserved: what enters a dipole leaves it, whether it is a receiver or a source. A receiver consumes energy, not charges. The question comes back every year in a similar form (generator in 2017, passive dipole in 2018).' },
    'elec-p2020-q4': { q: 'A potential difference between 2 points is called:',
      o: ['A current', 'A voltage', 'A power', 'A conductance'],
      x: u('U', 'AB') + ' = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub>: it is the voltage between A and B. Asked word for word in 2017.' },
    'elec-p2020-q5': { q: 'If two dipoles belong to the same branch, they are said to be:',
      o: ['In series', 'In parallel', 'Nothing can be said'],
      x: 'A branch goes from one node to the next, with no other node in between: all its dipoles carry the same current, so they are in series. Not to be confused with the same loop, where nothing can be said.' },
    'elec-p2020-q6': { q: 'Consider the following diagram. What is the voltage ' + U + ' if switch <var>K</var> is open?',
      fig: { aria: 'Source E, resistor R at the top, right-hand branch made of the open switch K then a resistor R; arrow U across the whole right-hand branch' },
      x: 'With <var>K</var> open, no current flows. So the top resistor has zero voltage across it (' + R + ' × 0 = 0), and the whole voltage ' + E + ' ends up across the right-hand branch: ' + U + ' = ' + E + '. Answering 0 means believing that the voltage across a gap is zero; answering ' + E + '/2 means applying a voltage divider when no current flows.' }
  });
})();
