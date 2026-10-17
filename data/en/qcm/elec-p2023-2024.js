/* English text for data/qcm/elec-p2023-2024.js (lesson questions of the Nov. 2023 and Oct. 2024 midterms).
   Nov. 2023: official English wording, word for word (two typos of the paper fixed: “It’s” → “Its”, “R2 et R3” → “R2 and R3”).
   Oct. 2024 (no English paper): translated, reusing the wording of the 2021 and 2023 English papers. */
(function () {
  function r(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function i(n) { return '<var>I</var><sub>' + n + '</sub>'; }
  REV.i18n.qcm({
    /* ---------- Midterm Oct. 2024 (class of 2029) ---------- */
    'elec-p2024-q1': { q: 'What is an electric current?',
      o: ['A potential difference', 'An orderly displacement of electrical charges', 'A displacement of electrical charges', 'Heat dissipation'],
      x: 'A current is an <b>orderly</b> displacement of charges. Thermal agitation also moves charges, but randomly, without creating a current: answer c is incomplete. Answer a defines a voltage, and d describes the Joule effect.' },
    'elec-p2024-q3': { q: 'What is the unit of an electrical voltage?',
      o: ['Watts (W)', 'Amperes (A)', 'Ohms (Ω)', 'Ohms times Amperes (Ω.A)'],
      x: 'The volt is not offered: go through Ohm’s law. <var>U</var> = <var>R</var>·<var>I</var>, so 1 V = 1 Ω × 1 A = 1 Ω·A. The watt is the unit of power (1 W = 1 V·A).' },
    'elec-p2024-q4': { q: 'Current entering a passive dipole is greater than the one leaving it.',
      x: 'A dipole does not store charges: the current that leaves it equals the current that enters it. A resistor consumes energy, not current.' },
    'elec-p2024-q5': { q: 'Consider the circuit shown. Choose the correct statement:',
      fig: { aria: 'Source E on the left, R2 between A and F, R1 between A and B, R5 and R6 between B and C, R3 between B and D, R4 between F and D, R7 between C and D' },
      o: [r(1) + ' and ' + r(2) + ' are in series', r(2) + ' and ' + r(3) + ' are in parallel', r(3) + ' and ' + r(7) + ' are in parallel', r(5) + ' and ' + r(6) + ' are in parallel'],
      x: r(5) + ' and ' + r(6) + ' are both connected between B and C: they are in parallel. The opposite directions of ' + i(5) + ' and ' + i(6) + ' make no difference. ' +
        'a is false: at A, ' + r(1) + ' and ' + r(2) + ' also meet the source <var>E</var> (three dipoles at the same node). b: ' + r(2) + ' is between A and F, ' + r(3) + ' between B and D. c: ' + r(3) + ' (B–D) and ' + r(7) + ' (C–D) share only one terminal.' },

    /* ---------- Midterm Nov. 2023 (class of 2028), official English wording ---------- */
    'elec-p2023-q1': { q: 'What is a voltage?',
      o: ['A potential difference', 'An orderly displacement of electrical charges', 'A displacement of electrical charges', 'Heat dissipation'],
      x: 'A voltage is a potential difference: <var>U</var><sub>AB</sub> = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub>. The orderly displacement of charges is the current.' },
    'elec-p2023-q2': { q: 'A dipole resistance is:',
      o: ['Its durability', 'Its strength', 'Its ability to resist current flow'],
      x: 'The resistance (in ohms) measures how much the dipole opposes current flow: under the same voltage, the larger <var>R</var>, the smaller <var>I</var> = <var>U</var>/<var>R</var>.' },
    'elec-p2023-q3': { q: 'What is the unit for the intensity of an electrical current?',
      o: ['Volts (V)', 'Amperes (A)', 'Ohms (Ω)', 'Watts (W)'],
      x: 'Current intensity is measured in amperes (A). The volt is the unit of voltage, the ohm that of resistance, and the watt that of power.' },
    'elec-p2023-q4': { q: 'What is the resistance “seen” between A and B?',
      fig: { aria: 'Between A and B, two branches in parallel: at the top R, then 3R in parallel with 6R, then R; at the bottom 3R then R' },
      x: 'Top branch: 3<var>R</var> // 6<var>R</var> = (3<var>R</var> × 6<var>R</var>)/(9<var>R</var>) = 2<var>R</var>, so <var>R</var> + 2<var>R</var> + <var>R</var> = 4<var>R</var>. Bottom branch: 3<var>R</var> + <var>R</var> = 4<var>R</var>. Two 4<var>R</var> in parallel give 2<var>R</var>. 20<var>R</var>/9 comes from forgetting the 6<var>R</var> (5<var>R</var> // 4<var>R</var>).' },
    'elec-p2023-q5': { q: 'Consider the diagram on the right, compare ' + r(2) + ' and ' + r(3) + '?',
      fig: { aria: 'Three resistors R1, R2, R3 in parallel; 15 A comes in, 5 A flows through R1, I2 through R2, 5 A through R3' },
      o: [r(2) + ' &lt; ' + r(3), r(2) + ' = ' + r(3), r(2) + ' &gt; ' + r(3), 'Unknown'],
      x: 'Kirchhoff’s current law: ' + i(2) + ' = 15 − 5 − 5 = 5 A. The three resistors are in parallel, so they have the same voltage <var>U</var>. With <var>R</var> = <var>U</var>/<var>I</var> and three equal currents, ' + r(1) + ' = ' + r(2) + ' = ' + r(3) + '.' }
  });
})();
