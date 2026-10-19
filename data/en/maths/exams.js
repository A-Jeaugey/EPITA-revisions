/* English text for data/maths/exams.js (merged over the French file: MATHS_TOPICS by key, MATHS_EXAMS by `key`).
   Vocabulary from the official English documents (seminar, TD 1 and 2, lecture slides, Theorems and proofs, the
   2021 English paper, the 2023 English answer keys). Decimal point in English. */
(function () {
  var R = window.REV;
  R.i18n.patch(window.MATHS_TOPICS, {
    'logique': 'Logic: connectors, implication',
    'quantificateurs': 'Quantifiers, negation',
    'ensembles': 'Sets, inclusion',
    'cardinal': 'Cardinality, inclusion-exclusion',
    'fonctions': 'Functions, composition',
    'images': 'Direct image, pre-image',
    'injections': 'Injective, surjective, bijective functions',
    'usuelles': 'Basic functions',
    'raisonnement': 'Reasoning: contrapositive, double inclusion',
    'relations': 'Binary relations (not examined in 2026)',
    'recurrence': 'Proof by induction',
    'sommes': 'Sums',
    'denombrement': 'Counting',
    'binomial': 'Binomial coefficients, binomial theorem',
    'probabilites': 'Probability, equiprobability',
    'conditionnelles': 'Conditional probability, law of total probability',
    'independance': 'Independence',
    'bayes': 'Bayes’ formula',
    'variables': 'Random variables, distribution',
    'esperance': 'Expectation, variance',
    'lois': 'Bernoulli and binomial distributions',
    'demonstrations': 'Proofs from the lecture',
    'hors-programme': 'Not on the syllabus'
  });

  var NS = 'Not on the syllabus: ';
  R.i18n.patch(window.MATHS_EXAMS, {
    'p2025-dp': { title: 'DP exam, October 2025', meta: 'class of 2030 · 2 hrs · 40 points rescaled to 20', progPts: '40 / 40',
      note: 'The latest DP paper, and the closest to your exam: same length, and the same plan as in 2023 and 2024 (lecture and inclusion-exclusion, concrete counting, double counting, total probability and Bayes, a proof from the lecture, a binomial variable). Exercise 5 is exactly the 2024 proof: \\(\\E(aX + b)\\) and \\(\\mathrm{Var}(aX + b)\\). Exercise 1.1 is exercise 2.13 of the seminar, exercise 2 is the extract quoted in TD 1 (exercise 2.11). New: the binomial variable is over 8 draws and ends with \\(\\P(Z \\leq 7)\\), to be computed with the complementary event. Paper published on Moodle (“Documents de travail” section), with no answer key: every answer on this site is recomputed by program.',
      parts: [
        { t: 'Lecture and tutorial: inclusion-exclusion (students speaking English and Spanish), the binomial theorem, \\(\\card(\\mathcal{P}(E)) = 2^n\\)' },
        { t: 'Answer words of an MCQ: 5-lists, arrangements, at least one correct answer, anagrams' },
        { t: 'Teams with a captain: \\(k\\binom{n}{k} = n\\binom{n-1}{k-1}\\) by double counting, then by computation' },
        { t: 'Restaurant: desserts, total probability, Bayes' },
        { t: 'Lecture: expectation and variance, proofs of \\(\\E(aX+b)\\) and \\(\\mathrm{Var}(aX+b)\\)' },
        { t: 'Dice: distribution, expectation, variance, \\(Y = 2X + 1\\); box: Bernoulli, binomial over 8 draws' }] },

    'p2025-obm': { title: 'OBM exam, October 2025', meta: 'class of 2030 · 2 hrs 30 · 40 points rescaled to 20', progPts: '21.5 / 40',
      note: 'The latest OBM paper. The professor wrote it in her email of 19 October 2026: the syllabus was not the same, and exercises 4 (binary relations), 5 (integrals) and 6 (complex numbers) are no longer on it; your OBM exam lasts 2 hrs. Exercises 1 to 3 are on the syllabus: logic (12 points), injectivity and surjectivity of \\(A \\mapsto \\card(A)\\), direct images and pre-images. Writing is explicitly graded: “taking great care over your writing” (density of \\(\\Q\\)) and “Write your answer following the writing rules seen in the seminar” (inclusion). Paper published on Moodle (“Documents de travail” section), with no answer key: every answer on this site is recomputed.',
      parts: [
        { t: 'Logic: implications between six statements, quantifiers, density of \\(\\Q\\) by direct proof, inclusion in \\(\\Z\\)' },
        { t: 'The function \\(A \\mapsto \\card(A)\\) on \\(\\mathcal{P}(\\{2, 3, 4\\})\\): definitions, injectivity, surjectivity, restrictions' },
        { t: 'Definitions of \\(f(A)\\) and \\(f^{-1}(B)\\), a function on \\(\\ent{0}{10}\\), table of images under ln and cos' },
        { t: 'The relation \\(A \\mathrel{\\mathcal{R}} B \\Leftrightarrow \\card(A) \\leq \\card(B)\\) on \\(\\mathcal{P}(\\ent{0}{50})\\)' },
        { t: NS + 'integrals: antiderivative, integration by parts, substitution' },
        { t: NS + 'complex numbers, lecture questions and standard exercises' }] },

    'p2024-dp': { title: 'DP exam, October 2024', meta: 'class of 2029 · 2 hrs · 40 points rescaled to 20', progPts: '40 / 40',
      note: 'Very close to your DP exam, like the 2025 paper: same length, and exercises 2 to 6 follow the plan of the 2023 DP exam (concrete counting, a binomial identity, conditional probability with a threshold, a proof from the lecture, a binomial variable over 20 draws). New: exercise 1 asks you to invent a drawing situation for a given formula. The past-exam archive has no answer key: every answer on this site is recomputed by program. Typo in the paper: “k ∈ ⟦1, n⟧” in exercise 6.2, read ⟦1, 20⟧.',
      files: [{ t: 'Paper (French)' }],
      parts: [
        { t: 'Propose a 5-card drawing situation for four given formulas' },
        { t: 'Door code: distinct digits, repeated digits, odd digits, at least one 4' },
        { t: 'Teddy’s tokens: double counting of \\(\\binom{n}{p}\\binom{p}{k}\\), proof by computation, a sum' },
        { t: 'Conditional probability: translate, law of total probability, Bayes, minimum proportion' },
        { t: 'Lecture: expectation and variance, proofs of \\(\\E(aX+b)\\) and \\(\\mathrm{Var}(aX+b)\\)' },
        { t: 'Box with balls 0, 1, 1, 2: distribution, expectation, variance, Bernoulli, binomial over 20 draws' }] },

    'p2024-obm': { title: 'OBM exam, October 2024', meta: 'class of 2029 · 2 hrs 30 · 40 points rescaled to 20', progPts: '20 / 40',
      note: 'The first OBM exam, with no answer key in the archive: the answers on this site are recomputed. It lasted 2 hrs 30 and had 16 points of integrals (exercise 5) and complex numbers (exercise 6), which are not in the 2026 seminar: your OBM exam lasts 2 hrs and covers the seminar only. Exercises 1 to 3 are on the syllabus: logic (10 points), images and injectivity on a Cartesian product, a table of images under exp and cos. Exercise 4 (the relation \\(|a| \\leq |b|\\)) no longer is: binary relations were taken off the syllabus (email of 19 October 2026).',
      files: [{ t: 'Paper (French)' }],
      parts: [
        { t: 'Logic: necessary and sufficient conditions, quantifiers, contrapositive, double inclusion' },
        { t: 'The function \\((x, y) \\mapsto x + y\\) on \\(E \\times F\\): images, injectivity, surjectivity, restrictions' },
        { t: 'Table of direct images and pre-images under exp and cos' },
        { t: 'The relation \\(a \\mathrel{\\mathcal{R}} b \\Leftrightarrow |a| \\leq |b|\\) on \\(\\R\\)' },
        { t: NS + 'integrals: antiderivative, integration by parts, substitution' },
        { t: NS + 'complex numbers, lecture questions and standard exercises' }] },

    'p2023-dp': { title: 'DP exam, October 2023', meta: 'class of 2028 · 2 hrs · 30 points rescaled to 20', progPts: '30 / 30',
      note: 'The first separate DP exam, with an official answer key in French and in English (the English statements are used on this site). Everything is on the syllabus. Exercise 6 is exercise 5.21 of TD 2. The answer key is correct; only typos: “P(X = 0)” and “E(X)” without the index k in exercise 6.',
      files: [{ t: 'Paper (French)' }, { t: 'Answer key (French)' }, { t: 'Answer key (English, with the statements)' }],
      parts: [
        { t: 'Cardinality: disjoint union, partition, inclusion-exclusion proved' },
        { t: 'Podiums of a 20-cyclist race' },
        { t: 'Box of green and red balls: Vandermonde’s formula' },
        { t: 'Maths support sessions: total probability, Bayes, threshold' },
        { t: 'Lecture: \\(\\E(X + Y)\\), \\(\\E(aX + b)\\), and a proof of \\(\\mathrm{Var}(X) = \\E(X^2) - (\\E(X))^2\\)' },
        { t: 'A 20-question MCQ answered at random: Bernoulli, binomial' }] },

    'p2023-le': { title: 'LE exam, October 2023', meta: 'class of 2028 · 1 hr · 20 points', progPts: '14 / 20',
      note: 'The “logic and sets” exam, the ancestor of OBM, in only 1 hour. Official answer key in French and in English, correct (the English statements are used on this site). Exercises 1 (quadratic equation in \\(\\mathbb{C}\\)) and 4 (binary relation, taken off the syllabus in 2026) are not on the syllabus. The relation of exercise 4 is reflexive, transitive and antisymmetric: it is an order relation, which the answer key does not say.',
      files: [{ t: 'Paper (French)' }, { t: 'Answer key (French)' }, { t: 'Answer key (English, with the statements)' }],
      parts: [
        { t: NS + 'quadratic equation in \\(\\mathbb{C}\\), exponential form' },
        { t: 'Logic: translate, negate, tick the true implications' },
        { t: 'Sets and functions: definitions, a function to build, \\(x \\mapsto |x - 1|\\)' },
        { t: 'The relation \\(a \\mathrel{\\mathcal{R}} b \\Leftrightarrow \\exists n \\in \\N,\\ b = a^n\\)' }] },

    'p2022': { title: 'S1 midterm, November 2022', meta: 'class of 2027 · 3 hrs · 40 points rescaled to 20', progPts: '31 / 40',
      note: 'The last combined midterm, and the closest to the current syllabus: only exercise 1 (integrals) and exercise 3 (binary relations, taken off the syllabus in 2026) are off the syllabus. Official answer key, correct. Exercise 4.2 is exercise 3.18 of TD 1; its question (d) can be read in two ways (see the exercise). Typo in the answer key: “E(X)” and “V(X)” for the variable Y in exercise 5.',
      files: [{ t: 'Paper (French)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: NS + 'integrals' },
        { t: 'Sets and functions: images, \\(x \\mapsto |x| + 1\\), composition of injections and of surjections' },
        { t: 'Relations: reflexive, antisymmetric, transitive, negations, order relation' },
        { t: 'Committees and teams of leaders in a class of 20' },
        { t: 'A box of balls: Bernoulli, binomial, rank of the first white ball' },
        { t: 'Two boxes of lollipops: total probability, Bayes' },
        { t: 'Proof: \\(\\E(aX + b) = a\\E(X) + b\\)' },
        { t: 'Binomial theorem and colouring: \\(\\sum \\binom{n}{k} 3^{n-k} = 4^n\\)' }] },

    'p2021': { title: 'S1 midterm, November 2021', meta: 'class of 2026 · 3 hrs · 30 points rescaled to 20', progPts: '22.5 / 30',
      note: 'The only paper in the archive that also exists in English (its official English statements are used on this site). Exercises 1 (binary relation, taken off the syllabus in 2026) and 3 (integrals) are off the syllabus. Official answer key in French, correct; it rounds the probabilities of exercise 7 (0.40 and 0.62) while the exact values are 159/400 and 33/53.',
      files: [{ t: 'Paper (French)' }, { t: 'Paper (English)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: 'The relation \\(x^2 \\leq y^2\\): is it an order relation?' },
        { t: 'Express three sentences with quantifiers' },
        { t: NS + 'integrals' },
        { t: 'A function from \\(\\N\\) to \\(\\N\\): injectivity, surjectivity, images' },
        { t: 'Pascal’s formula: by drawing balls, then by computation' },
        { t: 'A dice: Bernoulli, binomial, distribution of a score' },
        { t: 'Screening test: total probability, Bayes' },
        { t: 'Geometric sum by induction' }] },

    'p2020': { title: 'Midterm 1, November 2020', meta: 'class of 2025 · 3 hrs · 30 points rescaled to 20', progPts: '21 / 30',
      note: 'Handwritten answer key, correct. Exercises 2 (order relation: binary relations were taken off the syllabus in 2026) and 3 (derivative, integrals) are off the syllabus; exercise 1 stays on it, since it is mostly about expressing sentences with quantifiers. The relation “living less than 5 minutes away” in exercises 1 and 2 is imprecise: a student lives less than 5 minutes from himself, so “classmate” must be read as “another student” (see the exercise).',
      files: [{ t: 'Paper (French)' }, { t: 'Answer key (French, handwritten)' }],
      parts: [
        { t: 'Express sentences about a relation between students' },
        { t: 'Is this relation an order relation?' },
        { t: NS + 'derivative and integrals' },
        { t: 'The function \\(x \\mapsto (x - 2)^2 - 1\\): make it injective, make it surjective' },
        { t: 'Symmetry of binomial coefficients: by computation, with subsets' },
        { t: 'Induction: \\(\\frac{2^n}{n!} \\leq \\frac{9}{2}\\left(\\frac{2}{3}\\right)^n\\)' },
        { t: '5-letter words, with or without repetition, anagrams' }] },

    'p2019': { title: 'Midterm 1, October 2019', meta: 'class of 2024 · 3 hrs · 20.5 points announced', progPts: '15 / 20.5',
      note: 'The official answer key has three mistakes, corrected on this site: “tableau” has 7 letters, so 7!/2! = 2520 anagrams (not 60); in exercise 7, \\(\\P_B(A) = 3/4\\) (the key divides by P(A) and finds 3/7); in exercise 8, the probability of catching the flu without being vaccinated is 47/200 = 23.5% (the key finds 15.6%). The announced points add up to 20.5 (exercise 2: 4 points in the paper, 3.5 in the key). Exercises 2 (derivative, integrals) and 4 (equivalence relation: binary relations were taken off the syllabus in 2026) are off the syllabus.',
      files: [{ t: 'Paper (French)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: 'True or false: four quantified statements about \\(x + y^2 = 0\\)' },
        { t: NS + 'derivative and integrals' },
        { t: 'Injectivity and surjectivity of \\(x \\mapsto 2x + 4\\) and \\(x \\mapsto \\frac{x}{2} + 2\\)' },
        { t: 'An equivalence relation on \\(\\Z \\times \\Z^*\\)' },
        { t: 'Drawing balls, anagrams, committees of a student club' },
        { t: 'Three balls drawn from a bag of three colours' },
        { t: '8-sided dice: independence and incompatibility' },
        { t: 'Flu and vaccination: conditional probability, vaccination rate' }] },

    'p2018': { title: 'Midterm 1, October 2018', meta: 'class of 2023 · 3 hrs · 21 points', progPts: '12 / 21',
      note: 'Scanned paper, with no answer key in the archive: the answers on this site are recomputed. Exercises 3 (derivatives), 4 (integrals) and 5 (complex equation) are off the syllabus. In exercise 1, the staircase graph is only drawn on [−6, 6[: f(ℝ) depends on what you assume outside the drawing.',
      files: [{ t: 'Paper (French)' }],
      parts: [
        { t: 'Direct images and pre-images read on a staircase graph' },
        { t: 'Pre-images under a function from \\(\\N\\) to \\(\\N\\)' },
        { t: NS + 'derivatives' },
        { t: NS + 'integrals' },
        { t: NS + 'quadratic equation in \\(\\mathbb{C}\\)' },
        { t: 'Injectivity, surjectivity, compositions of \\((x, y) \\mapsto xy\\) and \\(x \\mapsto (x, x^2)\\)' },
        { t: '5-card hands: at least one ace, king of diamonds and three clubs' },
        { t: 'Flu and vaccination: total probability, Bayes' }] },

    'p2017': { title: 'Midterm 1, November 2017', meta: 'class of 2022 · 3 hrs · 21 points', progPts: '0 / 21',
      note: 'Nothing is on the exam 1 syllabus: derivatives, complex numbers, integrals, Taylor expansions and limits, intermediate value theorem. Keep it for exam 2 (APIS).',
      files: [{ t: 'Paper (French)' }, { t: 'Paper (English)' }, { t: 'Answer key (French)' }],
      parts: [
        { t: NS + 'derivatives' },
        { t: NS + 'complex numbers, exponential form, modulus, argument' },
        { t: NS + 'integrals' },
        { t: NS + 'quadratic equation in \\(\\mathbb{C}\\)' },
        { t: NS + 'Taylor expansions and limits' },
        { t: NS + 'intermediate value theorem' }] },

    'p2016': { title: 'Midterm 1, October 2016', meta: 'class of 2021 · answer key only · 21 points', progPts: '0 / 21',
      note: 'The archive only has the answer key (a scan, partly unreadable). Nothing is on the exam 1 syllabus: derivatives, complex numbers, integrals, Taylor expansions, intermediate value theorem.',
      files: [{ t: 'Answer key (French)' }],
      parts: [
        { t: NS + 'derivatives' },
        { t: NS + 'complex numbers' },
        { t: NS + 'integrals' },
        { t: NS + 'quadratic equation in \\(\\mathbb{C}\\)' },
        { t: NS + 'Taylor expansions and limits' },
        { t: NS + 'intermediate value theorem' }] }
  }, 'key');
})();
