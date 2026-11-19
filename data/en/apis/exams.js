/* English text for data/apis/exams.js (merged over the French file: APIS_TOPICS by key, APIS_EXAMS by `key`).
   File labels as in data/en/maths/exams.js: “Paper (French)”, “Answer key (French)” (the PDFs are in French). */
(function () {
  var R = window.REV;
  R.i18n.patch(window.APIS_TOPICS, {
    'primitives': 'Standard and composite primitives',
    'aires': 'Integral and areas',
    'rectangles': 'Rectangle method',
    'integrales': 'Computing integrals with a primitive',
    'ipp': 'Integration by parts',
    'cdv': 'Change of variable',
    'definitions': 'Sequences: bounds, monotonicity',
    'limites': 'Limits of sequences',
    'geometriques': 'Geometric sequences, remarkable examples',
    'exemples': 'Examples and counterexamples',
    'demonstrations': 'Proofs from the lecture',
    'convergence': 'Convergence theorems',
    'extraites': 'Subsequences',
    'recurrentes': 'Recursive sequences',
    'landau': 'Landau comparisons'
  });
  var PAPER = { t: 'Paper (French)' }, KEY = { t: 'Answer key (French)' };
  R.i18n.patch(window.APIS_EXAMS, {
    cc2026o: { title: 'Course test 1 · 12 October 2026', meta: 'OBM and DP · 1 hr · this year’s format',
      files: [PAPER],
      note: 'Same professor, same class: it is the model for the form of the 23 November test (“Lesson N” sections, independent questions, answers written on the paper).' },
    obm2024: { title: 'OBM exam · October 2024', meta: 'Exercise 5: integrals, 6 points',
      files: [PAPER], note: 'No published answer key: results computed.' },
    f2024: { title: 'ASI exam · January 2024', meta: 'Sequences and integrals · 2 hrs · out of 40',
      files: [PAPER, KEY],
      note: 'The best model for the final exam. Exercise 1 (integrals, 10 points) is within the scope of the course test.' },
    cc2023n: { title: 'Course test · 27 November 2023', meta: 'ASI part: sequences · 15 min · out of 10',
      files: [PAPER], note: 'Two sections: “Lesson 1: definitions”, “Lesson 2: convergence or divergence”.' },
    f2023: { title: 'Midterm · January 2023', meta: 'Exercise 1: an integral, 3 points',
      files: [PAPER, KEY], note: '' },
    cc2022d: { title: 'Course test · 5 December 2022', meta: 'Exercise 5: sequences · 6 points',
      files: [PAPER], note: '' },
    p2022: { title: 'Midterm · November 2022', meta: 'Integrals exercise: primitive, IBP, change of variable',
      files: [PAPER, KEY], note: '' },
    cc2022o: { title: 'Course test · 3 October 2022', meta: 'Exercise 3: integral and the IBP theorem · 4.5 points',
      files: [PAPER], note: 'Asks for the statement of the integration by parts theorem, then its proof.' },
    p2021: { title: 'Midterm · November 2021', meta: 'Integrals exercise: primitive, IBP, change of variable',
      files: [PAPER, KEY], note: '' },
    p2020: { title: 'Midterm · November 2020', meta: 'Derivative, change of variable, IBP',
      files: [PAPER, KEY], note: '' },
    cc2020o: { title: 'Course test · October 2020', meta: 'Two integrals',
      files: [PAPER], note: '' }
  }, 'key');
})();
