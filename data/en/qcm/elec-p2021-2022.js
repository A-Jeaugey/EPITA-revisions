/* English text for data/qcm/elec-p2021-2022.js (lesson questions of the Nov. 2021 and Oct. 2022 midterms).
   Nov. 2021: official English wording, word for word. Oct. 2022 (no English paper): translated, reusing the
   wording of the English papers whenever the same question was asked (2017, 2023). */
REV.i18n.qcm({
  /* ---------- Midterm Nov. 2021, Ex 1, official English wording ---------- */
  'elec-p2021-q1': { q: 'A branch of a circuit corresponds to a portion of a circuit located between two consecutive nodes.',
    x: 'True. This is the course definition: a branch goes from one node to the next. All its dipoles are in series and carry the same current.' },
  'elec-p2021-q2': { q: 'To measure the voltage across a dipole, one uses an ammeter connected in series with this dipole.',
    x: 'False. A voltage is measured with a voltmeter connected in parallel with (across) the dipole. The ammeter is connected in series and measures a current.' },
  'elec-p2021-q5': { q: 'A resistance of 100 Ohms is traversed by a current of 10 A. What is the voltage across its terminals?',
    o: ['1000 A', '10 V', '110 V', '1000 V'],
    x: 'Ohm’s law: <var>U</var> = <var>R</var><var>I</var> = 100 × 10 = 1000 V. “1000 A” has the right value but the unit of a current; 110 V adds ohms and amperes, which makes no sense.' },
  'elec-p2021-q6': { q: 'A resistance has a voltage of 100 V across its terminals. If the current that traverses it is 0.1 A. What is the value of this resistance?',
    o: ['10 Ω', '100 Ω', '1 kΩ', 'None of these answers.'],
    x: '<var>R</var> = <var>U</var>/<var>I</var> = 100/0.1 = 1000 Ω = 1 kΩ. Dividing by 0.1 is the same as multiplying by 10: the trap is to multiply by 0.1 and get 10 Ω.' },

  /* ---------- Midterm Oct. 2022, Ex 1 ---------- */
  'elec-p2022-q1': { q: 'What is an orderly displacement of electrical charges?',
    o: ['A current', 'A voltage', 'A resistance', 'None of these'],
    x: 'By definition, an electric current is an orderly (overall) displacement of charges: <var>i</var> = d<var>q</var>/d<var>t</var>. A voltage is a potential difference.' },
  'elec-p2022-q2': { q: 'A potential difference between 2 points is:',
    o: ['A current', 'A voltage', 'A resistance', 'None of these'],
    x: 'A voltage: <var>U</var><sub>AB</sub> = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub>. A single point has a potential; a voltage is always measured between two points.' },
  'elec-p2022-q4': { q: 'To measure the current intensity in some dipole, one uses an ammeter connected in parallel with that dipole.',
    x: 'False. The ammeter is connected in series: it must carry the current being measured. It is the voltmeter that is connected in parallel.' },
  'elec-p2022-q5': { q: 'If two dipoles carry the same current, they are said to be:',
    o: ['In parallel', 'In series'],
    x: 'Dipoles in series are in the same branch and carry the same current; in parallel, it is the voltage they share. The converse is not quite true (two equal resistors in parallel also carry the same current), but it is the answer expected in the midterm.' },
  'elec-p2022-q6': { q: 'If you apply Ohm’s law with <var>U</var> in V and <var>I</var> in mA, you directly get <var>R</var> in:',
    x: '<var>R</var> = <var>U</var>/<var>I</var>: 1 V/1 mA = 1 V/10<sup>−3</sup> A = 10<sup>3</sup> Ω = 1 kΩ. Remember: V/mA = kΩ, and kΩ × mA = V.' }
});
