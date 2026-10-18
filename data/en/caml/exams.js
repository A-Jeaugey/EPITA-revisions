/* English text for data/caml/exams.js (merged over the French file: CAML_TOPICS by key, CAML_EXAMS by `key`).
   Official English exercise titles for p2018, p2019, p2019d and p2020 (English papers in Past-Exams).
   The English PDFs (…-en.pdf, checked on disk in a clone of Epidocs/Past-Exams) are listed first. */
(function () {
  var R = window.REV;
  R.i18n.patch(window.CAML_TOPICS, {
    'bases': 'Expressions and types',
    'fonctions': 'Functions and tuples',
    'filtrage': 'Pattern matching',
    'exceptions': 'Exceptions',
    'recursivite': 'Recursive reasoning',
    'listes': 'Lists',
    'construire': 'Building a list',
    'rangs': 'Ranks and positions',
    'listes-triees': 'Sorted lists',
    'deux-listes': 'Two lists',
    'accumulateur': 'Wrapper, accumulator, counter',
    'ordre-superieur': 'Higher-order functions',
    'mystery': 'Mystery: reading code',
    'evaluation': 'The Caml answer (types)'
  });

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Algo/';
  R.i18n.patch(window.CAML_EXAMS, {
    p2024: { title: 'Midterm of 30 October 2024', meta: 'class of 2029 · separate Caml exam · 1 h 30 · 20 points',
      note: 'The closest format to this year’s exam: a separate Caml exam (abstract types have their own, 30 min out of 10), 1 h 30, three exercises. No answer key in the past exams: solutions written and run.',
      files: [{ t: 'Caml paper (French)' }, { t: 'TAA paper (French)' }],
      parts: [
        { t: 'Checking a list of lists' },
        { t: 'Insertion sort' },
        { t: 'Mystery' },
        { t: 'Iterative list: mystery operation' },
        { t: 'Recursive list: deletegreater' }] },

    p2023: { title: 'Midterm of 30 October 2023', meta: 'class of 2028 · separate Caml exam · duration not given · 20 points',
      note: 'No official answer key: the past exams contain a student script marked 18/20, whose margin gives the marking scheme (6.5; 5.5; 8). Abstract types had their own exam, out of 10.',
      files: [{ t: 'Caml paper (French)' }, { t: 'Marked Caml script, 18/20 (French)' }, { t: 'TAA paper (French)' }, { t: 'Marked TAA script, 08/10 (French)' }],
      parts: [
        { t: 'Multiple insertion' },
        { t: 'Removing duplicates' },
        { t: 'Split' },
        { t: 'A little coursework… (questions 1 to 4)' },
        { t: 'Recursive list: concatenate (question 5)' }] },

    p2022: { title: 'Midterm of 31 October 2022', meta: 'class of 2027 · part 1 TAA out of 4, part 2 Caml out of 16',
      note: 'Official answer key (in French) for the whole Caml part; it does not print the Caml warnings (Warning 8) given by less2 and the Mystery. Each exercise is followed by a “Caml function:” box.',
      files: [{ t: 'Paper, part 1 (French)' }, { t: 'Paper, part 2 (French)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: 'A little coursework…' },
        { t: 'Insertion after' },
        { t: 'Position of the maximum' },
        { t: 'Less' },
        { t: 'Mystery' }] },

    p2021: { title: 'Midterm of 4 November 2021', meta: 'class of 2026 · part 1 TAA out of 6, part 2 Caml out of 15',
      note: 'Part 2 starts again at exercise 2 (part 1 has two exercises, numbered 1 and 2), and the grade boxes add up to 21 points. Official answer key in French; the message “remove_internal” of exercise 2 is a typo of the paper, kept by the key.',
      files: [{ t: 'Paper, part 1 (French)' }, { t: 'Paper, part 2 (French)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: 'Iterative list: modify' },
        { t: 'A little coursework…' },
        { t: 'Deleting an interval' },
        { t: 'Alternating lists' },
        { t: 'Mystery' }] },

    p2020: { title: 'Midterm of 9 November 2020', meta: 'class of 2025 · part 1 TAA out of 5, part 2 Caml out of 15',
      note: 'Exercise 3 repeats the 2018 one word for word (insertion at the rank i). The official answer key calls the function search_both list a b of exercise 4 search v1 v2 l: in the exam, keep the name and the order of the parameters of the statement.',
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
      note: 'Exercise 4 repeats the 2017 one (for_all2), almost word for word. The official answer key of exercise 3 raises Failure instead of Invalid_argument for a negative or zero rank: see the card.',
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
      note: 'Midterm exam no. 1 of the S1# group, which takes S1 in the second semester: a different paper from the October 2019 one, not a resit. Exercise 3 repeats the November 2017 one word for word (assoc). Official answer key “Version profs”.',
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
      note: 'No “Caml answer” rule that year. Exercise 4 came up again unchanged in 2020. In exercise 5, the printed code of encode does not compile (encode-rec): the answer key evaluates a fixed version.',
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
      note: 'No answer key: the past exams only have the paper, scanned, and blank answer sheets. Exercises 3 and 4 came up again in 2019 (April, then October), with an official answer key.',
      files: [{ t: 'Paper (French)' }, { t: 'Answer sheets, blank (French)' }],
      parts: [
        { t: 'Iterative list: modify' },
        { t: 'Backward recursive list' },
        { t: 'Association' },
        { t: 'for_all2' },
        { t: 'Combine it' }] }
  }, 'key');
})();
