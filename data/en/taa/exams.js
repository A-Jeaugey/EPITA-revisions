/* English text for data/taa/exams.js (merged over the French file: TAA_TOPICS by key, TAA_EXAMS by `key`).
   Official English exercise titles for p2018, p2019, p2019d and p2020 (English papers in Past-Exams).
   The English PDFs (…-en.pdf, checked on disk in a clone of Epidocs/Past-Exams) are listed first. */
(function () {
  var R = window.REV;
  R.i18n.patch(window.TAA_TOPICS, {
    'cours': 'Course questions',
    'hierarchie': 'Hierarchy of operations',
    'precond': 'Preconditions',
    'axiomes': 'Writing axioms',
    'liste-rec': 'Recursive lists',
    'liste-iter': 'Iterative lists',
    'mystere': 'Mystery operation',
    'piles': 'Stacks',
    'files': 'Queues',
    'ensembles': 'Sets',
    'autres': 'Booleans, vectors, other types'
  });

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Algo/';
  R.i18n.patch(window.TAA_EXAMS, {
    p2024: { title: 'Midterm of 30 October 2024', meta: 'class of 2029 · separate TAA exam · 30 min · 10 points',
      note: 'Abstract types have their own exam, separate from the Caml one (1 h 30, out of 20); no answer key in the past exams.',
      files: [{ t: 'TAA paper (French)' }, { t: 'Caml paper (French)' }],
      parts: [
        { t: 'Iterative list: mystery operation' },
        { t: 'Recursive list: deletegreater' },
        { t: 'Checking a list of lists' },
        { t: 'Insertion sort' },
        { t: 'Mystery' }] },

    p2023: { title: 'Midterm of 30 October 2023', meta: 'class of 2028 · separate TAA exam · duration not given · 10 points',
      note: 'No official answer key: the past exams contain a marked student script (08/10), whose margin gives the marking scheme for each question.',
      files: [{ t: 'TAA paper (French)' }, { t: 'Marked TAA script, 08/10 (French)' }, { t: 'Caml paper (French)' }, { t: 'Marked Caml script, 18/20 (French)' }],
      parts: [
        { t: 'A little coursework… (questions 1 to 4)' },
        { t: 'Recursive list: concatenate (question 5)' },
        { t: 'Multiple insertion' },
        { t: 'Removing duplicates' },
        { t: 'Split' }] },

    p2022: { title: 'Midterm of 31 October 2022', meta: 'class of 2027 · part 1 TAA out of 4, part 2 Caml out of 16',
      files: [{ t: 'Paper, part 1 (French)' }, { t: 'Paper, part 2 (French)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: 'A little coursework…' },
        { t: 'Insertion after' },
        { t: 'Position of the maximum' },
        { t: 'Less' },
        { t: 'Mystery' }] },

    p2021: { title: 'Midterm of 4 November 2021', meta: 'class of 2026 · part 1 TAA out of 6, part 2 Caml out of 15',
      note: 'Exercise 1 repeats the 2017 one word for word; part 2 starts again at exercise 2, and the grade boxes add up to 21 points.',
      files: [{ t: 'Paper, part 1 (French)' }, { t: 'Paper, part 2 (French)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: 'Iterative list: modify' },
        { t: 'A little coursework…' },
        { t: 'Deleting an interval' },
        { t: 'Alternating lists' },
        { t: 'Mystery' }] },

    p2020: { title: 'Midterm of 9 November 2020', meta: 'class of 2025 · part 1 TAA out of 5, part 2 Caml out of 15',
      note: 'The abstract types exercise repeats the 2018 one word for word, with the same answer key.',
      files: [
        { t: 'Paper, part 1 (English)', url: PE + '2025/midterm-2025-s1-algo-subject-part_1-en.pdf' },
        { t: 'Paper, part 2 (English)', url: PE + '2025/midterm-2025-s1-algo-subject-part_2-en.pdf' },
        { t: 'Answer key (English)', url: PE + '2025/midterm-2025-s1-algo-correction-en.pdf' },
        { t: 'Paper, part 1 (French)', url: PE + '2025/midterm-2025-s1-algo-subject-part_1-fr.pdf' },
        { t: 'Paper, part 2 (French)', url: PE + '2025/midterm-2025-s1-algo-subject-part_2-fr.pdf' },
        { t: 'Answer key (French)', url: PE + '2025/midterm-2025-s1-algo-correction-fr.pdf' }],
      parts: [
        { t: 'Recursive list: ispresent, search, concatenate' },
        { t: 'Deletion' },
        { t: 'Insertion at the rank i' },
        { t: 'Double Search' },
        { t: 'Mystery' }] },

    p2019: { title: 'Midterm of 28 October 2019', meta: 'class of 2024 · part 1 TAA out of 4, part 2 Caml out of 16',
      note: 'The paper only says “Oct. 2019”: the date comes from the header of the answer key.',
      files: [
        { t: 'Paper (English)', url: PE + '2024/midterm-2024-s1-algo-subject-en.pdf' },
        { t: 'Answer key (English)', url: PE + '2024/midterm-2024-s1-algo-correction-en.pdf' },
        { t: 'Paper (French)', url: PE + '2024/midterm-2024-s1-algo-subject-fr.pdf' },
        { t: 'Answer key (French)', url: PE + '2024/midterm-2024-s1-algo-correction-fr.pdf' }],
      parts: [
        { t: 'A little coursework…' },
        { t: 'Dominoes' },
        { t: 'Deletion at rank i' },
        { t: 'for_all2' },
        { t: 'Mystery' }] },

    p2019d: { title: 'Midterm of 23 April 2019 (S1#)', meta: 'class of 2024, S1# group · single exam · 2 h · 20 points',
      note: 'Midterm exam no. 1 of the S1# group, which takes S1 in the second semester: a different paper from the October 2019 one, not a resit.',
      files: [
        { t: 'Paper (English)', url: PE + '2024%23/midterm-2024%23-s1-algo-subject-en.pdf' },
        { t: 'Answer sheet (English)', url: PE + '2024%23/midterm-2024%23-s1-algo-answer_sheet-en.pdf' },
        { t: 'Answer key (English)', url: PE + '2024%23/midterm-2024%23-s1-algo-correction-en.pdf' },
        { t: 'Paper (French)', url: PE + '2024%23/midterm-2024%23-s1-algo-subject-fr.pdf' },
        { t: 'Answer sheet (French)', url: PE + '2024%23/midterm-2024%23-s1-algo-answer_sheet-fr.pdf' },
        { t: 'Answer key (French)', url: PE + '2024%23/midterm-2024%23-s1-algo-correction-fr.pdf' }],
      parts: [
        { t: 'Vector: two errors, then reinitialize' },
        { t: 'Insertion Sort' },
        { t: 'Association' },
        { t: 'Mystery' }] },

    p2018: { title: 'Midterm of 29 October 2018', meta: 'class of 2023 · part 1 TAA out of 5, part 2 Caml out of 16',
      note: 'The grade boxes add up to 21 points, as printed; the abstract types exercise came up again unchanged in 2020.',
      files: [
        { t: 'Paper (English)', url: PE + '2023/midterm-2023-s1-algo-subject-en.pdf' },
        { t: 'Answer key (English)', url: PE + '2023/midterm-2023-s1-algo-correction-en.pdf' },
        { t: 'Paper (French)', url: PE + '2023/midterm-2023-s1-algo-subject-fr.pdf' },
        { t: 'Answer key (French)', url: PE + '2023/midterm-2023-s1-algo-correction-fr.pdf' }],
      parts: [
        { t: 'Recursive list: ispresent, search, concatenate' },
        { t: 'is_image' },
        { t: 'How many?' },
        { t: 'Insertion at the rank i' },
        { t: 'Evaluations' }] },

    p2017: { title: 'Midterm of 6 November 2017', meta: 'class of 2022 · single exam · 2 h · 20 points',
      note: 'No answer key: the past exams only have the paper, scanned, and blank answer sheets.',
      files: [{ t: 'Paper (French)' }, { t: 'Answer sheets, blank (French)' }],
      parts: [
        { t: 'Iterative list: modify' },
        { t: 'Backward recursive list' },
        { t: 'Association' },
        { t: 'for_all2' },
        { t: 'Combine it' }] }
  }, 'key');
})();
