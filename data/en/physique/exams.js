/* English text for data/physique/exams.js (merged over the French file: PHYS_TOPICS by key, PHYS_EXAMS by `key`).
   The English papers of November 2017 and November 2021 (…-subject-en.pdf, checked on disk in a clone of
   Epidocs/Past-Exams) are listed first; the other files are in French. */
(function () {
  var R = window.REV;
  R.i18n.patch(window.PHYS_TOPICS, {
    'cours': 'Lecture questions',
    'cinematique': 'Kinematics in Cartesian coordinates',
    'trajectoire': 'Trajectory equation',
    'nature': 'Nature of motion',
    'tir': 'Projectiles and free fall',
    'circulaire': 'Circular motion',
    'polaire': 'Polar coordinates (not in midterm 1)',
    'forces': 'Forces and force diagrams',
    'newton': 'Newton’s laws',
    'plan-incline': 'Inclined plane',
    'travail': 'Work and power',
    'energie': 'Kinetic and mechanical energy'
  });

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Phys/';
  R.i18n.patch(window.PHYS_EXAMS, {
    p2022: { title: 'Midterm of October 2022', meta: 'class of 2027 · 1 h · 20 points',
      note: 'No official answer key: the past exams contain a marked student script (10.5/20). This is the format closest to what can be expected this year: lecture questions, then two exercises. Question 2.a of exercise 3 imposes a wrong expression (see the exercise page).',
      files: [{ t: 'Paper (marked student script, 10.5/20, French)' }],
      parts: [
        { t: 'Lecture questions (MCQ, several answers possible; not on the syllabus: question 4, in cylindrical coordinates, and questions 5 and 6, in polar coordinates)' },
        { t: 'Kinematics in Cartesian coordinates: a ball launched from a height' },
        { t: 'Crankshaft: part 2, in Cartesian coordinates, is on the syllabus; part 1, in polar coordinates, is not' }] },

    p2021: { title: 'Midterm of November 2021', meta: 'class of 2026 · duration not given · 20 points', progPts: '≈ 8.5 / 20',
      note: 'Handwritten official answer key, with a marking scheme “given as an indication”. The paper also exists in English. Polar coordinates (exercises 2 and 4) are not in this year’s midterm 1; in lecture question 1, the key circles a wrong answer.',
      files: [
        { t: 'Paper (English)', url: PE + '2026/midterm-2026-s1-phys-subject-en.pdf' },
        { t: 'Paper (French)', url: PE + '2026/midterm-2026-s1-phys-subject-fr.pdf' },
        { t: 'Answer key with marking scheme (French)', url: PE + '2026/midterm-2026-s1-phys-correction-fr.pdf' }],
      parts: [
        { t: 'Lecture questions (MCQ, 5 questions)' },
        { t: 'Polar basis, derivatives, velocity in polar coordinates (not in midterm 1)' },
        { t: 'Motion of a projectile' },
        { t: 'Acceleration in polar coordinates (not in midterm 1)' }] },

    p2020: { title: 'Midterm 1, 2020-2021', meta: 'class of 2025 · duration not given · 20 points', progPts: '≈ 11.5 / 20',
      note: 'The past exams only have the official answer key, handwritten on the paper (the statement can still be read). It is wrong in question 2 of exercise 2. Exercise 3 (cylindrical coordinates, Frenet’s basis) is not on this year’s syllabus.',
      files: [{ t: 'Answer key, written on the paper (French)' }],
      parts: [
        { ex: 'MCQ', t: 'MCQ, 8 questions (questions 5 and 6, on Frenet’s basis, are not on the syllabus)' },
        { t: 'Ellipse: trajectory, velocity, acceleration' },
        { t: 'Rectilinear trajectory: a segment' },
        { t: 'Helix: cylindrical basis, Frenet’s basis' }] },

    p2019: { title: 'Midterm 1, 2019-2020', meta: 'class of 2024 · duration not given · 20 points',
      note: 'Handwritten official answer key with marking scheme. Not on this year’s syllabus: exercise 3 (arc length, Frenet’s basis), question 3 of exercise 2 and MCQ questions 3 and 5 (cross product, cylindrical coordinates).',
      files: [{ t: 'Paper (French)' }, { t: 'Answer key with marking scheme (French)' }],
      parts: [
        { ex: 'MCQ', t: 'MCQ, 8 questions (questions 3 and 5 are not on the syllabus)' },
        { t: 'The cycloid' },
        { t: 'Helical motion: Cartesian coordinates (Q1-2, same motion as in May 2018); cylindrical coordinates (Q3, not on the syllabus)' },
        { t: 'Arc length and Frenet’s basis' }] },

    p2018: { title: 'Midterm 1, 2018-2019', meta: 'class of 2023 · duration not given · 20 points',
      note: 'No answer key. The month is not printed (year 2018-2019, probably November 2018) and the MCQ skips question 5. Exercise 1 is the motion of May 2018: it is solved on the same exercise page.',
      files: [{ t: 'Paper (French)' }],
      parts: [
        { ex: 'MCQ', t: 'MCQ, 7 questions (questions 3, 7 and 8 are not on the syllabus: cross product, Frenet’s basis)' },
        { t: 'Ellipse (same motion as in May 2018, plus the link between acceleration and position)' },
        { t: 'Spiral drawn on a cone: cylindrical coordinates' },
        { t: 'Circle: trajectory, velocity, acceleration (Q1-2; Q3-4, Frenet’s basis, not on the syllabus)' }] },

    p2018s: { title: 'Midterm of May 2018 (S1# group)', meta: 'class of 2023, S1# group · duration not given · 20 points',
      note: 'Midterm of the S1# group (delayed intake), with a handwritten official answer key, without a detailed marking scheme. Not on this year’s syllabus: part B of exercise 2 (cylindrical coordinates) and MCQ questions 4, 7 and 8.',
      files: [{ t: 'Paper (French)' }, { t: 'Answer key (French)' }],
      parts: [
        { ex: 'MCQ', t: 'MCQ, 8 questions (questions 4, 7 and 8 are not on the syllabus)' },
        { t: 'Ellipse: trajectory, velocity, acceleration' },
        { t: 'Helix: part A in Cartesian coordinates; part B in cylindrical coordinates (not on the syllabus)' }] },

    p2017: { title: 'Midterm 1 of November 2017', meta: 'class of 2022 · duration not given · 20 points',
      note: 'No answer key. The paper also exists in English. Not on this year’s syllabus: exercise 3 and question 4 of exercise 2 (Frenet’s basis), MCQ questions 4, 6 and 7 (cross product, arc length).',
      files: [
        { t: 'Paper (English)', url: PE + '2022/midterm-2022-s1-phys-subject-en.pdf' },
        { t: 'Paper (French)', url: PE + '2022/midterm-2022-s1-phys-subject-fr.pdf' }],
      parts: [
        { ex: 'MCQ', t: 'MCQ, 8 questions (questions 4, 6 and 7 are not on the syllabus)' },
        { t: 'Circular motion of centre C(1 ; 2)' },
        { t: 'Spiral in polar coordinates (not in midterm 1; Q4, Frenet’s basis, not on the syllabus)' },
        { t: 'Frenet’s basis: velocity, acceleration, curvature radius' }] }
  }, 'key');
})();
