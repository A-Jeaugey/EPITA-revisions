/* English text for data/elec/exams.js (merged over the French file).
   Exercise titles of the papers that exist in English (p2017, p2021, p2023) follow the official English papers. */
REV.i18n.patch(window.ELEC_CATS, {
  qcm: 'Lecture questions', req: 'Equivalent resistances', lois: 'Fundamental laws', inter: 'Switches',
  div: 'Dividers and real source', sup: 'Superposition', thev: 'Thévenin and Norton'
});
REV.i18n.patch(window.ELEC_TOPICS, {
  vocabulaire: 'Nodes, branches, loops', potentiels: 'Potentials and arrows', kirchhoff: 'Kirchhoff’s laws', req: 'Equivalent resistance',
  diviseurs: 'Dividers', interrupteurs: 'Switches', appareils: 'Measuring instruments', generateurs: 'Real sources',
  'source-courant': 'Current sources', thevenin: 'Thévenin and Norton (not in exam 1)', millman: 'Millman (not in exam 1)', superposition: 'Superposition (not in exam 1)',
  calcul: 'Symbolic calculation', qcm: 'Lecture questions'
});
REV.i18n.patch(window.ELEC_EXAMS, {
  p2024: { label: 'Midterm Oct. 2024', date: 'October 2024',
    files: [{ k: 'Exam paper' }],
    parts: [{ t: 'Lesson questions (MCQ, 5 questions)' }, { t: 'Fundamental laws' }, { t: 'Thévenin/Norton equivalents' }],
    note: 'Same template as 2023, with sign traps (the 2E source points downward, the current source I draws current away). No official answer key: solution written here and checked by three methods.' },
  p2023: { label: 'Midterm Nov. 2023', date: 'November 2023',
    files: [{ k: 'Exam paper' }, { k: 'Exam paper' }, { k: 'Answer key' }],
    parts: [{ t: 'Lesson questions (MCQ, 5 questions)' }, { t: 'Fundamental laws' }, { t: 'Thévenin/Norton equivalents' }],
    note: 'First paper in the new format: Thévenin/Norton is worth more than half the mark, with a 2R load between A and B.' },
  p2022: { label: 'Midterm Oct. 2022', date: 'October 2022',
    files: [{ k: 'Exam paper' }, { k: 'Answer key' }],
    parts: [{ t: 'Lecture questions (MCQ, 6 questions)' }, { t: 'Resistor associations' }, { t: 'Generalities and Kirchhoff’s laws' }],
    note: 'Marking scheme printed out of 21. The “loops” question expects every loop (10).' },
  p2021: { label: 'Midterm Nov. 2021', date: 'November 2021',
    files: [{ k: 'Exam paper' }, { k: 'Exam paper' }, { k: 'Answer key' }],
    parts: [{ t: 'Lecture questions (MCQ, 6 questions)' }, { t: 'Resistive network' }, { t: 'Kirchhoff laws' }],
    note: 'A resistor network on the same skeleton as in 2022, and a reverse question: find R′.' },
  p2020: { label: 'Midterm Nov. 2020', date: 'November 2020',
    files: [{ k: 'Exam paper' }, { k: 'Answer key' }],
    parts: [{ t: 'Lecture questions (MCQ, 6 questions)' }, { t: 'Resistor association' }, { t: 'Generalities and Kirchhoff’s laws' }, { t: 'Kirchhoff’s laws, divider bridges' }],
    note: 'Exercise 3 is exactly TD 1 Ex 2 of your class (with two current arrows reversed).' },
  p2018: { label: 'Midterm Oct. 2018', date: 'October 2018',
    files: [{ k: 'Exam paper' }],
    parts: [{ t: 'Lecture questions (MCQ, 10 questions)' }, { t: 'Kirchhoff’s laws' }, { t: 'Switches and current source' }, { t: 'Resistor association' }],
    note: 'No official answer key: solution written here and checked by calculation.' },
  p2017: { label: 'Midterm Nov. 2017', date: 'November 2017',
    files: [{ k: 'Exam paper' }, { k: 'Exam paper' }, { k: 'Answer key' }],
    parts: [{ t: 'Questions about lecture topics and equivalent resistances' }, { t: 'Generalities and Kirchhoff’s laws' }, { t: 'Kirchhoff’s laws (switches)' },
      { t: 'Superposition theorem' }, { t: 'Resistors association' }],
    note: 'The oldest format, in five short exercises.' }
}, 'key');
