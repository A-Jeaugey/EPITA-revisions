/* English text for data/qcm/elec-td0.js (TD 0 “Mathematics for electronics”).
   Wording from the official English TD 0: simplify, develop and factorize, solve, dimensionally consistent. */
(function () {
  function m(n, s) { return '<var>' + n + '</var>' + (s ? '<sub>' + s + '</sub>' : ''); }
  var R = m('R'), U = m('U'), I = m('I'), E = m('E'), X = m('x'), Ip = '<var>I</var>′';
  var NOTE = ' <var>U</var> and <var>E</var> are voltages, <var>I</var> currents and <var>R</var> resistances.';
  var OK = ' This relation is dimensionally consistent.';

  REV.i18n.qcm({
    /* ---------- Ex 1 · fractions ---------- */
    'elec-td0-q1': { q: 'Simplify as much as possible ' + m('F', '4') + ' = 24' + m('a') + '³' + m('b') + '/(36' + m('a') + '²' + m('b') + '²).',
      x: '24/36 = 2/3 (divide by 12), ' + m('a') + '³/' + m('a') + '² = ' + m('a') + ' and ' + m('b') + '/' + m('b') + '² = 1/' + m('b') + '. So ' + m('F', '4') + ' = 2' + m('a') + '/(3' + m('b') + ').' },
    'elec-td0-q2': { q: 'Simplify ' + m('F', '5') + ' = (5/6)/(10/9). Answer with a fraction or a decimal number.',
      x: 'Dividing by 10/9 means multiplying by 9/10: (5 × 9)/(6 × 10) = 45/60 = 3/4 = 0.75.' },
    'elec-td0-q3': { q: 'What is ' + m('F', '8') + ' = 11/12 − 5/18?',
      x: 'Common denominator 36: 11/12 = 33/36 and 5/18 = 10/36, so 33/36 − 10/36 = 23/36. You subtract the numerators only once the denominators are equal.' },
    'elec-td0-q4': { q: 'Calculate ' + m('F', '9') + ' = 3/4 + 5/6 − (7/12 − 3/4).',
      x: 'Everything in twelfths: 9/12 + 10/12 − (7/12 − 9/12) = 19/12 − (−2/12) = 21/12 = 7/4 = 1.75. Minus a minus gives a plus.' },
    'elec-td0-q5': { q: 'Calculate ' + m('F', '10') + ' = (2/3 + 5/9)/(4/9).',
      x: 'Numerator: 6/9 + 5/9 = 11/9. Then (11/9)/(4/9) = 11/9 × 9/4 = 11/4 = 2.75: the ninths cancel out.' },

    /* ---------- Ex 2 · algebraic calculations ---------- */
    'elec-td0-q6': { q: 'Develop, reduce, then factorize ' + m('C') + ' = 4(2' + I + ' − 3) − 3(' + I + ' + 1).',
      x: '8' + I + ' − 12 − 3' + I + ' − 3 = 5' + I + ' − 15 = 5(' + I + ' − 3). The “−3” in front of the bracket changes the sign of both terms: −3' + I + ' − 3.' },
    'elec-td0-q7': { q: 'Develop ' + m('D') + ' = (2' + I + ' + 3)(' + I + ' − 5).',
      x: 'Each term of the first bracket multiplies each term of the second: 2' + I + '² − 10' + I + ' + 3' + I + ' − 15 = 2' + I + '² − 7' + I + ' − 15.' },
    'elec-td0-q8': { q: 'Simplify ' + m('F') + ' = (' + X + '² − 9)/(' + X + ' − 3), for ' + X + ' ≠ 3.',
      x: 'Difference of two squares: ' + X + '² − 9 = (' + X + ' − 3)(' + X + ' + 3). Cancel (' + X + ' − 3): ' + m('F') + ' = ' + X + ' + 3. Never cancel part of a sum (' + X + '²/' + X + ', 9/3).' },

    /* ---------- Ex 3 · 1st degree equations ---------- */
    'elec-td0-q9': { q: 'Solve 4(2' + I + ' + 1) = 3' + I + ' + 17. What is ' + I + '?',
      x: '8' + I + ' + 4 = 3' + I + ' + 17, so 5' + I + ' = 13 and ' + I + ' = 13/5 = 2.6.' },
    'elec-td0-q10': { q: 'Solve ' + U + '/2 + ' + U + '/3 = 20. What is ' + U + '?',
      x: 'Same denominator: 3' + U + '/6 + 2' + U + '/6 = 5' + U + '/6 = 20, so ' + U + ' = 20 × 6/5 = 24.' },
    'elec-td0-q11': { q: 'Solve (' + I + ' − 3)/4 + (' + I + ' + 1)/6 = 5. What is ' + I + '?',
      x: 'Multiply everything by 12: 3(' + I + ' − 3) + 2(' + I + ' + 1) = 60, i.e. 3' + I + ' − 9 + 2' + I + ' + 2 = 60, so 5' + I + ' = 67 and ' + I + ' = 67/5 = 13.4.' },
    'elec-td0-q12': { q: 'Solve ' + R + '/120 + ' + R + '/80 = 5. What is ' + R + '?',
      x: 'Multiply by 240, a common multiple of 120 and 80: 2' + R + ' + 3' + R + ' = 1200, so ' + R + ' = 240. Another way: 1/120 + 1/80 = 1/48 (just as 120 Ω // 80 Ω = 48 Ω), and ' + R + '/48 = 5 gives 240.' },

    /* ---------- Ex 4 · systems with two unknowns ---------- */
    'elec-td0-q13': { q: 'Solve the system 2' + m('U', '1') + ' + ' + m('U', '2') + ' = 11 and 3' + m('U', '1') + ' − ' + m('U', '2') + ' = 9.',
      o: [m('U', '1') + ' = 4 and ' + m('U', '2') + ' = 3', m('U', '1') + ' = 3 and ' + m('U', '2') + ' = 5', m('U', '1') + ' = 4 and ' + m('U', '2') + ' = 19', m('U', '1') + ' = 2 and ' + m('U', '2') + ' = 7'],
      x: 'Adding the two equations eliminates ' + m('U', '2') + ': 5' + m('U', '1') + ' = 20, so ' + m('U', '1') + ' = 4. Then ' + m('U', '2') + ' = 11 − 2 × 4 = 3.' },
    'elec-td0-q14': { q: 'You have 4' + U + ' + 3' + E + ' = 29 and 2' + U + ' − ' + E + ' = 1. What is ' + U + '?',
      x: 'The second equation gives ' + E + ' = 2' + U + ' − 1. Substituting into the first: 4' + U + ' + 6' + U + ' − 3 = 29, so 10' + U + ' = 32 and ' + U + ' = 3.2 (then ' + E + ' = 5.4).' },
    'elec-td0-q15': { q: 'You have ' + m('R', '1') + '/2 + ' + m('R', '2') + '/3 = 7 and ' + m('R', '1') + '/4 − ' + m('R', '2') + '/6 = 1. What is ' + m('R', '2') + '?',
      x: 'Clear the fractions: × 6 in the first equation (3' + m('R', '1') + ' + 2' + m('R', '2') + ' = 42), × 12 in the second (3' + m('R', '1') + ' − 2' + m('R', '2') + ' = 12). Subtracting: 4' + m('R', '2') + ' = 30, so ' + m('R', '2') + ' = 7.5; adding: 6' + m('R', '1') + ' = 54 and ' + m('R', '1') + ' = 9.' },
    'elec-td0-q16': { q: 'Solve the system 0.2' + I + ' + 0.5' + Ip + ' = 4.8 and 0.4' + I + ' − 0.1' + Ip + ' = 2.2.',
      o: [I + ' = 79/11 and ' + Ip + ' = 74/11', I + ' = 8 and ' + Ip + ' = 6.4', I + ' = 74/11 and ' + Ip + ' = 79/11', I + ' = 7 and ' + Ip + ' = 7'],
      x: 'Multiply by 10: 2' + I + ' + 5' + Ip + ' = 48 and 4' + I + ' − ' + Ip + ' = 22. The second gives ' + Ip + ' = 4' + I + ' − 22; in the first, 22' + I + ' − 110 = 48, so ' + I + ' = 158/22 = 79/11 ≈ 7.18 and ' + Ip + ' = 316/11 − 242/11 = 74/11 ≈ 6.73. Values that do not come out round happen: keep the fractions.' },

    /* ---------- Ex 5 · systems with three unknowns ---------- */
    'elec-td0-q17': { q: 'The system 2' + X + ' + 3' + m('y') + ' − ' + m('z') + ' = 12, ' + X + ' − ' + m('y') + ' + 2' + m('z') + ' = 5, 3' + X + ' + 2' + m('y') + ' + ' + m('z') + ' = 17 has a unique solution.',
      x: 'False: the third equation is the sum of the first two, so it adds nothing. That leaves two equations for three unknowns, hence infinitely many solutions (' + X + ' = 27/5 − ' + m('z') + ' and ' + m('y') + ' = ' + m('z') + ' + 2/5).' },
    'elec-td0-q18': { q: 'Three resistances: their sum is 120 Ω, ' + m('R', '2') + ' is twice the value of ' + m('R', '1') + ' and ' + m('R', '3') + ' is equal to ' + m('R', '1') + ' plus 3 Ω. What is ' + m('R', '1') + '?',
      x: 'Write everything in terms of ' + m('R', '1') + ': ' + m('R', '1') + ' + 2' + m('R', '1') + ' + (' + m('R', '1') + ' + 3) = 120, so 4' + m('R', '1') + ' = 117 and ' + m('R', '1') + ' = 29.25 Ω (then ' + m('R', '2') + ' = 58.5 Ω and ' + m('R', '3') + ' = 32.25 Ω).' },

    /* ---------- Ex 6 · checking dimensional consistency ---------- */
    'elec-td0-q19': { q: R + ' = ' + E + '/' + I + ', with ' + E + ' a voltage and ' + I + ' a current.' + OK,
      x: 'True: V/A = Ω, so both sides are in ohms. It is Ohm’s law.' },
    'elec-td0-q20': { q: m('I', '1') + ' = ' + m('R', '1') + '/' + m('U', '1') + ', with ' + m('U', '1') + ' a voltage.' + OK,
      x: 'False: ' + m('R', '1') + '/' + m('U', '1') + ' is in Ω/V, i.e. 1/A since Ω = V/A. That is the inverse of a current, not a current. The correct relation is ' + m('I', '1') + ' = ' + m('U', '1') + '/' + m('R', '1') + '.' },
    'elec-td0-q21': { q: m('P') + ' = ' + U + '²/(' + R + I + '), with ' + m('P') + ' a power, ' + U + ' a voltage and ' + I + ' a current.' + OK,
      x: 'False: ' + R + I + ' is a voltage, so ' + U + '²/(' + R + I + ') is in V²/V = V. A power is in W = V·A. The correct formulas: ' + m('P') + ' = ' + U + '²/' + R + ' or ' + m('P') + ' = ' + R + I + '².' },
    'elec-td0-q22': { q: E + ' = ' + U + '²/(' + R + I + '), with ' + E + ' and ' + U + ' voltages and ' + I + ' a current.' + OK,
      x: 'True: ' + U + '²/(' + R + I + ') is in V²/V = V, like ' + E + '. Dimensionally consistent does not mean correct: it is only a necessary condition.' },
    'elec-td0-q23': { q: U + ' = (' + m('R', '2') + E + ' + ' + m('R', '1') + m('R', '2') + m('I', '1') + ')/(' + m('R', '2') + ' + ' + m('R', '1') + ').' + OK + NOTE,
      x: 'True: in the numerator, ' + m('R', '2') + E + ' is in Ω·V and ' + m('R', '1') + m('R', '2') + m('I', '1') + ' in Ω·(Ω·A) = Ω·V: you are adding terms with the same unit. Divided by ohms, volts remain.' },
    'elec-td0-q24': { q: U + ' = [' + m('R', '1') + m('R', '3') + '(' + m('I', '1') + ' − ' + m('I', '2') + ') + ' + m('R', '3') + m('E', '1') + ' − ' + m('R', '1') + m('E', '3') + ']/[(' + m('R', '1') + ' + ' + m('R', '2') + ') + ' + m('R', '3') + ' + ' + m('R', '4') + '].' + OK + NOTE,
      x: 'True: the three terms of the numerator are in Ω·V (' + m('R', '3') + '(' + m('I', '1') + ' − ' + m('I', '2') + ') is a voltage, multiplied by ' + m('R', '1') + '). The denominator is a sum of resistances: volts remain.' },
    'elec-td0-q25': { q: I + ' = ' + m('E', '1') + '/' + m('R', '1') + ' − ' + m('I', '0') + '/' + m('R', '0') + ' + (' + m('E', '3') + ' − ' + m('E', '4') + ')/(' + m('R', '3') + ' + ' + m('R', '4') + ').' + OK + NOTE,
      x: 'False: ' + m('E', '1') + '/' + m('R', '1') + ' and (' + m('E', '3') + ' − ' + m('E', '4') + ')/(' + m('R', '3') + ' + ' + m('R', '4') + ') are in amperes, but ' + m('I', '0') + '/' + m('R', '0') + ' is in A/Ω. A single term with a different unit is enough to make the relation wrong.' }
  });
})();
