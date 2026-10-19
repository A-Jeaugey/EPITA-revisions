/* English text for data/maths/ex-annales.js, merged over the French exercises by id (REV.i18n.patch).
   Statements: the official English text when it exists (2023 DP and LE: the English answer keys repeat the
   statements; 2021: the English paper), otherwise translated with the vocabulary of the official English documents
   (seminar, TD 1 and 2, lecture slides, Theorems and proofs). Decimal point in English. Figures (window.MATHS_FIG) and
   tools are the same as in French; the tools translate their own labels. Arrays are given in full (questions, hints,
   solution, traps): the patch keeps their length. */
(function () {
  'use strict';
  var R = window.REV, r = String.raw, FIG = window.MATHS_FIG;
  if (!R || R.lang !== 'en' || !FIG) return;
  function M(html, tag) { return '<div class="box model"><span class="tag">Model answer' + (tag ? ' <i>' + tag + '</i>' : '') + '</span>' + html + '</div>'; }
  function T(name, o) { return '<div data-maths="' + name + '" data-opts=\'' + JSON.stringify(o).replace(/'/g, '&#39;') + '\'></div>'; }
  var EN = {};

  /* =====================================================================
     DP exam, October 2025 — Moodle, no answer key
     ===================================================================== */
  var N25 = 'Paper published on Moodle (“Documents de travail” section), with no answer key: solution written in the style of the official answer keys, every result recomputed by program (exhaustive enumeration, exact fractions).';

  EN['p2025-dp-ex1'] = { src: 'DP exam 2025 · Ex 1', title: r`Lecture and tutorial: inclusion-exclusion, binomial theorem, cardinality of \(\mathcal{P}(E)\)`,
    intro: r`<p>The two questions are independent.</p>`,
    questions: [
      r`<b>1.</b> In a class of 40 students, 25 speak English fluently, 11 speak Spanish fluently and 6 speak neither English nor Spanish.<p>In what follows, \(C\) denotes the set of students of the class, \(A\) the set of those who speak English and \(E\) the set of those who speak Spanish.</p><p>(a) Translate the data of the statement using the 3 sets.</p><p>(b) How many students speak both English and Spanish fluently? You are asked to justify your result using formula(s) from the lecture, which you will recall.</p>`,
      r`<b>2.</b> On the binomial theorem<p>(a) State the binomial theorem.</p><p>(b) Application: let \(E\) be a set with \(n\) elements.</p><p>i. How many subsets of \(E\) have \(k\) elements?</p><p>ii. Using the previous questions (2.(a) and 2.(b)(i)), compute the cardinality of \(\mathcal{P}(E)\).</p>`],
    hints: [
      r`“Neither English nor Spanish”: these are the students of \(C\) who are not in \(A \cup E\). Start with \(\card(A \cup E)\).`,
      r`Two formulas from the lecture: \(\card(Y \setminus X) = \card(Y) - \card(X)\) if \(X \subset Y\), and the inclusion-exclusion formula \(\card(A \cup E) = \card(A) + \card(E) - \card(A \cap E)\).`,
      r`2.(b)(ii): sort the subsets of \(E\) by their number of elements \(k\), then apply the binomial theorem with \(x = y = 1\).`],
    solution: [
      { t: 'Question 1(a): translating', html: M(r`<p>\(A \subset C\), \(E \subset C\), \(\card(C) = 40\), \(\card(A) = 25\), \(\card(E) = 11\) and \(\card\big(C \setminus (A \cup E)\big) = 6\) (the students who speak neither English nor Spanish form the complement of \(A \cup E\) in \(C\)).</p>`) },
      { t: 'Question 1(b): complement, then inclusion-exclusion', html: M(r`<p>We recall two formulas from the lecture, for finite sets:</p><p>• if \(X \subset Y\), then \(Y = X \sqcup (Y \setminus X)\) (disjoint union), so \(\card(Y \setminus X) = \card(Y) - \card(X)\);</p><p>• inclusion-exclusion formula: \(\card(A \cup E) = \card(A) + \card(E) - \card(A \cap E)\).</p><p>Since \(A \cup E \subset C\), the first formula gives \(\card\big(C \setminus (A \cup E)\big) = \card(C) - \card(A \cup E)\), hence \(\card(A \cup E) = 40 - 6 = 34\).</p><p>By the inclusion-exclusion formula, \(\card(A \cap E) = \card(A) + \card(E) - \card(A \cup E) = 25 + 11 - 34 = 2\).</p><p>So 2 students speak both English and Spanish fluently.</p>`) +
        r`<p>Check: 23 students speak English only, 9 Spanish only, 2 both and 6 neither language: \(23 + 9 + 2 + 6 = 40\). This is exercise 2.13 of the seminar.</p>` },
      { t: 'Question 2(a): the binomial theorem', html: M(r`<p>For all real (or complex) numbers \(x\) and \(y\) and for all \(n \in \N\):</p><div class="fm">\[(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}.\]</div>`) },
      { t: 'Question 2(b): the cardinality of P(E)', html: M(r`<p>i. For \(k \in \ent{0}{n}\), the number of subsets of \(E\) with \(k\) elements is \(\dbinom{n}{k} = \dfrac{n!}{k!\,(n-k)!}\).</p><p>ii. For \(k \in \ent{0}{n}\), let \(\mathcal{P}_k(E)\) be the set of subsets of \(E\) with \(k\) elements. Every subset of \(E\) has one and only one cardinality \(k \in \ent{0}{n}\): the sets \(\mathcal{P}_0(E), \ldots, \mathcal{P}_n(E)\) are pairwise disjoint and their union is \(\mathcal{P}(E)\). Hence, by i,</p><div class="fm">\[\card(\mathcal{P}(E)) = \sum_{k=0}^{n} \card(\mathcal{P}_k(E)) = \sum_{k=0}^{n} \binom{n}{k} = \sum_{k=0}^{n} \binom{n}{k} 1^k\, 1^{n-k} = (1 + 1)^n = 2^n\]</div><p>by the binomial theorem applied to \(x = y = 1\).</p>`) +
        r`<p>Example: \(E = \{2, 3, 4\}\) has \(1 + 3 + 3 + 1 = 8 = 2^3\) subsets (OBM exam 2025, exercise 2).</p>` }],
    answer: r`<ul><li>1(a) \(\card(C) = 40\), \(\card(A) = 25\), \(\card(E) = 11\), \(\card(C \setminus (A \cup E)) = 6\).</li><li>1(b) \(\card(A \cup E) = 40 - 6 = 34\), then \(\card(A \cap E) = 25 + 11 - 34 = 2\) students.</li><li>2(a) \((x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}\).</li><li>2(b) i. \(\binom{n}{k}\); ii. \(\card(\mathcal{P}(E)) = \sum_{k=0}^{n} \binom{n}{k} = (1 + 1)^n = 2^n\).</li></ul>`,
    traps: [
      r`Forgetting to subtract \(\card(A \cap E)\): \(25 + 11 = 36\) exceeds the 34 students who speak at least one language.`,
      r`Subtracting the 6 students in the wrong place: \(25 + 11 - 6 = 30\) makes no sense; the 6 students are outside \(A \cup E\).`,
      r`2.(b)(ii): the sum starts at \(k = 0\) (the empty set) and goes up to \(k = n\) (\(E\) itself).`,
      r`“Recall the formulas”: write them down before using them, with their assumptions (\(X \subset Y\); finite sets).`],
    grading: '7 points for the exercise; the paper does not split them between questions. “The rigor of your writing will be taken into account in the grade.”',
    note: N25 + ' Question 1 is exercise 2.13 of the seminar, question 2 is exercise 1.6 of TD 1.' };

  EN['p2025-dp-ex2'] = { src: 'DP exam 2025 · Ex 2', title: 'The answer words of an MCQ',
    intro: r`<p>An MCQ has 5 questions. For each of the 5 questions, there are 6 possible answers: \(A\), \(B\), \(C\), \(D\), \(E\) or \(F\). For each question, there is only one correct answer.</p><p>We assume that a candidate taking this MCQ answers all the questions by writing an “answer word” of 5 letters taken among \(A\), \(B\), \(C\), \(D\), \(E\) and \(F\).</p><p>For example, the answer word “BBADC” means that the candidate answered \(B\) to questions 1 and 2, \(A\) to question 3, \(D\) to question 4 and \(C\) to question 5.</p><p>Unless stated otherwise in the question, the answer word may contain the same letter several times.</p>`,
    questions: [
      r`<b>1.</b> How many answer words are possible? Justify briefly.`,
      r`<b>2.</b> How many answer words have only distinct letters? Justify briefly.`,
      r`<b>3.</b> How many possible answer words contain exactly one correct answer? Justify briefly.`,
      r`<b>4.</b> How many answer words have at least one correct answer? Justify briefly.`,
      r`<b>5.</b> How many answer words start with \(E\), contain no \(A\) and are made of distinct letters? Justify briefly. <u>Carry out the computation to the end.</u>`,
      r`<b>6.</b> There has been a leak. We know that the answer word contains one \(B\), two \(C\) and two \(D\). How many answer words are possible? Justify briefly. <u>Carry out the computation to the end.</u>`],
    hints: [
      r`An answer word is a 5-list of letters of \(\{A, B, C, D, E, F\}\): order matters (the position is the number of the question).`,
      r`“Exactly one correct answer”: choose the correctly answered question, then a wrong letter (5 choices) for each of the 4 others. “At least one”: go through the opposite, “none”.`,
      r`Question 6: choose the places of the two \(C\), then those of the two \(D\); the \(B\) takes the last place.`],
    solution: [
      { t: 'Questions 1 and 2: lists, arrangements', html: M(r`<p>1. An answer word is a 5-list of elements of \(\{A, B, C, D, E, F\}\), which has 6 elements: each position has 6 choices, independently of the others. There are \(6^5 = 7\,776\) answer words.</p><p>2. The letters are distinct and order matters: this is an arrangement of 5 letters out of 6. There are \(A_6^5 = \dfrac{6!}{1!} = 6 \times 5 \times 4 \times 3 \times 2 = 720\) answer words.</p>`) },
      { t: 'Questions 3 and 4: exactly one, at least one correct answer', html: M(r`<p>3. We choose the correctly answered question (5 choices); its letter is imposed (the correct answer, 1 choice); for each of the 4 other questions, we write one of the 5 wrong letters (\(5^4\) choices). By the multiplication principle, there are \(5 \times 1 \times 5^4 = 5^5 = 3\,125\) answer words.</p><p>4. We go through the complement. A word with no correct answer has, at each question, one of the 5 wrong letters: there are \(5^5 = 3\,125\) of them. The number of words with at least one correct answer is therefore \(6^5 - 5^5 = 7\,776 - 3\,125 = 4\,651\).</p>`) +
        r`<p>That the count of question 3 equals \(5^5\) is a coincidence: \(\binom{5}{1} \times 5^4 = 5^5\).</p>` },
      { t: 'Question 5: starts with E, no A, distinct letters', html: M(r`<p>The first letter is \(E\) (1 choice). The 4 next letters are distinct, different from \(E\) (distinct letters) and from \(A\): they are taken in \(\{B, C, D, F\}\), which has 4 elements. We arrange these 4 letters in the 4 remaining places: \(4! = 24\) ways. There are 24 answer words.</p>`) },
      { t: 'Question 6: one B, two C, two D', html: M(r`<p>We choose the 2 places of the \(C\) among the 5 places (\(\binom{5}{2} = 10\) ways), then the 2 places of the \(D\) among the 3 remaining places (\(\binom{3}{2} = 3\) ways); the \(B\) takes the last place. There are \(10 \times 3 = 30\) answer words.</p>`) +
        r`<p>Another way to write it: \(\dfrac{5!}{1!\,2!\,2!} = \dfrac{120}{4} = 30\) (permutations of the 5 letters, divided by the swaps of the two \(C\) and of the two \(D\)).</p>` }],
    answer: r`<ul><li>1. \(6^5 = 7\,776\)</li><li>2. \(6 \times 5 \times 4 \times 3 \times 2 = 720\)</li><li>3. \(5 \times 5^4 = 3\,125\)</li><li>4. \(6^5 - 5^5 = 4\,651\)</li><li>5. \(4! = 24\)</li><li>6. \(\frac{5!}{2!\,2!} = 30\)</li></ul>`,
    traps: [
      r`Question 2: \(5! = 120\) arranges 5 given letters; here we choose 5 letters out of 6, which is \(A_6^5 = 720\).`,
      r`Question 3: \(5^4\) alone forgets to choose the correctly answered question (factor 5).`,
      r`Question 4: \(5 \times 6^4\) (“a correct answer somewhere, the rest free”) counts several times the words that have several correct answers.`,
      r`Question 5: \(5 \times 4 \times 3 \times 2\) forgets that \(A\) is forbidden: only 4 letters are left for 4 places.`,
      r`Question 6: \(5! = 120\) without dividing by the swaps of the two \(C\) and of the two \(D\).`],
    grading: '7 points for the exercise; the paper does not split them between questions. Questions 5 and 6: “Carry out the computation to the end” (an integer, not a formula).',
    note: N25 + ' Exercise reused in TD 1 (exercise 2.11, “extract from the 2025 exam”).' };

  EN['p2025-dp-ex3'] = { src: 'DP exam 2025 · Ex 3', title: r`Teams with a captain: \(k\binom{n}{k} = n\binom{n-1}{k-1}\)`,
    intro: r`<p>In this exercise, \(n\) is an integer greater than 2 and \(k\) is a natural number less than \(n\).</p><p>Ousmane is injured. To pass the time, he imagines a set of \(n\) players. He then decides to count the possible teams made of \(k\) players with a captain among them.</p><p>To do so, he is going to count this number in two different ways.</p><p>• First way: Ousmane first chooses the \(k\) players, then he chooses the captain among them.</p><p>• Second way: Ousmane first chooses the captain, then the other players.</p>`,
    questions: [
      r`<b>1.</b> What is the number \(N_1\) of teams when Ousmane uses the first way? Justify briefly.`,
      r`<b>2.</b> What is the number \(N_2\) of teams when Ousmane uses the second way? Justify briefly.`,
      r`<b>3.</b> You have just proved a formula. Which one?`,
      r`<b>4.</b> Prove this formula again, by computation.`],
    hints: [
      r`A team is a set of \(k\) players (order does not matter) of whom exactly one is distinguished: the captain.`,
      r`Second way: once the captain is chosen, \(k - 1\) players remain to be chosen among the \(n - 1\) others.`,
      r`Question 4: write both sides with factorials and simplify \(\dfrac{k}{k!} = \dfrac{1}{(k-1)!}\) (this needs \(k \geq 1\)).`],
    solution: [
      { t: 'Questions 1 to 3: counting in two ways', html: M(r`<p>Let \(k \in \ent{1}{n}\) (a team with a captain has at least one player).</p><p>1. First way: we choose the \(k\) players among the \(n\), without order: \(\binom{n}{k}\) ways; then the captain among these \(k\) players: \(k\) ways. So \(N_1 = k\dbinom{n}{k}\).</p><p>2. Second way: we choose the captain among the \(n\) players: \(n\) ways; then the \(k - 1\) other players among the \(n - 1\) remaining players: \(\binom{n-1}{k-1}\) ways. So \(N_2 = n\dbinom{n-1}{k-1}\).</p><p>3. We have counted the same set (the teams of \(k\) players with a captain) in two ways, so \(N_1 = N_2\): for \(1 \leq k \leq n\),</p><div class="fm">\[k\binom{n}{k} = n\binom{n-1}{k-1}.\]</div>`) +
        r`<p>Example: \(n = 5\), \(k = 3\): \(3 \times \binom{5}{3} = 3 \times 10 = 30\) and \(5 \times \binom{4}{2} = 5 \times 6 = 30\).</p>` },
      { t: 'Question 4: by computation', html: M(r`<p>Let \(n \in \N^*\) and \(k \in \ent{1}{n}\). By definition of the binomial coefficients:</p><div class="fm">\[k\binom{n}{k} = k \times \frac{n!}{k!\,(n-k)!} = \frac{n!}{(k-1)!\,(n-k)!}\]</div><p>since \(k! = k \times (k-1)!\). On the other hand, since \((n-1) - (k-1) = n - k\):</p><div class="fm">\[n\binom{n-1}{k-1} = n \times \frac{(n-1)!}{(k-1)!\,(n-k)!} = \frac{n!}{(k-1)!\,(n-k)!}\]</div><p>since \(n \times (n-1)! = n!\). Both sides are equal.</p>`) +
        r`<p>The case \(k = 0\), allowed by the statement (“natural number less than \(n\)”), makes no sense here: no team without players has a captain. The formula remains true if we set \(\binom{n-1}{-1} = 0\) (\(0 = 0\)). Checked by program for \(n \leq 15\), and by enumeration of the teams for \(n \leq 7\).</p>` }],
    answer: r`<ul><li>1. \(N_1 = k\binom{n}{k}\).</li><li>2. \(N_2 = n\binom{n-1}{k-1}\).</li><li>3. \(k\binom{n}{k} = n\binom{n-1}{k-1}\) for \(1 \leq k \leq n\).</li><li>4. Both sides are equal to \(\dfrac{n!}{(k-1)!\,(n-k)!}\).</li></ul>`,
    traps: [
      r`Second way: choosing the other players among \(n\) instead of \(n - 1\) (the captain is already taken), or choosing \(k\) of them instead of \(k - 1\).`,
      r`First way: multiplying by \(k!\) (all the orders) instead of \(k\): only the captain is distinguished.`,
      r`“Justify briefly”: say what is chosen, among what, and whether order matters.`],
    grading: '4.5 points for the exercise; the paper does not split them between questions.',
    note: N25 + ' Same structure as exercise 3 of the 2024 DP exam (double counting, then proof by computation).' };

  EN['p2025-dp-ex4'] = { src: 'DP exam 2025 · Ex 4', title: 'Restaurant: dessert and “à la carte” menu',
    intro: r`<p>At the restaurant “I Give It My All”, 15% of the customers eat “à la carte” and 85% choose a set menu. Among the customers who eat “à la carte”, 30% have a dessert, against 45% of the customers who choose a set menu.</p><p>Let \(C\) be the event “The customer eats à la carte”, \(M\): “The customer chooses the set menu” and \(D\): “The customer has a dessert”.</p><p><b>N.B.: you will justify your results using a formula from the lecture.</b></p>`,
    questions: [
      r`<b>1.</b> We pick a customer at random. What is the probability that this customer had a dessert?<p>Give your result as a percentage or as a simplified fraction</p>`,
      r`<b>2.</b> We pick at random a customer who had a dessert. What is the probability that they chose the “à la carte” option?`],
    hints: [
      r`“Among the customers who eat à la carte, 30%”: this is \(\P(D \mid C)\), not \(\P(D \cap C)\).`,
      r`\(\{C, M\}\) is a partition of \(\Omega\): every customer eats à la carte or chooses a set menu, not both. Law of total probability.`,
      r`Question 2: we know \(D\), we look for \(\P(C \mid D)\): Bayes’ formula.`],
    solution: [
      { t: 'Translating the statement', html: M(r`<p>The statement gives: \(\P(C) = 0.15 = \dfrac{3}{20}\), \(\P(M) = 0.85 = \dfrac{17}{20}\), \(\P(D \mid C) = 0.30 = \dfrac{3}{10}\) and \(\P(D \mid M) = 0.45 = \dfrac{9}{20}\).</p>`) +
        T('tree', { first: [{ n: 'C', p: '3/20' }, { n: 'M' }], second: { n: 'D', nb: '\\overline{D}', p: ['3/10', '9/20'] }, edit: false }) },
      { t: 'Question 1: law of total probability', html: M(r`<p>The events \(C\) and \(M\) are incompatible and \(C \cup M = \Omega\): \(\{C, M\}\) is a partition of \(\Omega\) (and \(\P(C) \neq 0\), \(\P(M) \neq 0\)). By the law of total probability:</p><div class="fm">\[\P(D) = \P(D \mid C)\,\P(C) + \P(D \mid M)\,\P(M) = 0.30 \times 0.15 + 0.45 \times 0.85 = 0.045 + 0.3825 = 0.4275.\]</div><p>The probability that the customer had a dessert is \(42.75\,\%\), that is \(\dfrac{171}{400}\).</p>`) },
      { t: 'Question 2: Bayes', html: M(r`<p>We look for \(\P(C \mid D)\). Since \(\P(D) \neq 0\), by Bayes’ formula:</p><div class="fm">\[\P(C \mid D) = \frac{\P(D \mid C)\,\P(C)}{\P(D)} = \frac{0.045}{0.4275} = \frac{450}{4\,275} = \frac{2}{19}.\]</div><p>The probability that they ate à la carte is \(\dfrac{2}{19} \approx 10.5\,\%\).</p>`) }],
    answer: r`<ul><li>1. \(\P(D) = 0.4275 = 42.75\,\% = \frac{171}{400}\).</li><li>2. \(\P(C \mid D) = \frac{2}{19} \approx 10.5\,\%\).</li></ul>`,
    traps: [
      r`Writing \(\P(D \cap C) = 0.30\): 30% is a proportion among the “à la carte” customers, it is \(\P(D \mid C)\).`,
      r`Taking the average \(\frac{0.30 + 0.45}{2} = 37.5\,\%\): you have to weight by \(\P(C)\) and \(\P(M)\).`,
      r`Question 2: answering \(\P(D \mid C) = 0.30\) (the other way round); we know that the customer had a dessert, so we divide by \(\P(D)\).`,
      r`“Using a formula from the lecture”: name the law of total probability (with the partition \(\{C, M\}\)) and Bayes’ formula.`],
    grading: '4 points for the exercise; the paper does not split them between questions. Results justified by a formula from the lecture.',
    note: N25 + ' Same exercise, with other numbers, as in the 2023 and 2024 DP exams (exercise 4), without the threshold question.' };

  EN['p2025-dp-ex5'] = { src: 'DP exam 2025 · Ex 5', title: r`Lecture: prove \(\E(aX + b) = a\E(X) + b\) and \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\)`,
    intro: r`<p>Let \(X\) be a finite random variable such that \(X(\Omega) = \{x_1, x_2, \cdots, x_n\}\) and \((a, b) \in \R^2\).</p>`,
    questions: [
      r`<b>1.</b> Write the formulas giving the expectation and the variance of \(X\), denoted \(\E(X)\) and \(\mathrm{Var}(X)\) respectively.`,
      r`<b>2.</b> Express \(\E(aX + b)\) in terms of \(a\), \(b\) and \(\E(X)\). Prove this formula.`,
      r`<b>3.</b> Express \(\mathrm{Var}(aX + b)\) in terms of \(a\), \(b\) and \(\mathrm{Var}(X)\). Prove this formula.`],
    hints: [
      r`Same statement as exercise 5 of the 2024 DP exam: these are two proofs from the document “Theorems and proofs”.`,
      r`For \(\E(aX + b)\): \(aX + b = f(X)\) with \(f : x \mapsto ax + b\); transfer theorem, then split the sum in two.`,
      r`For the variance: write the definition, then notice that \((aX + b) - \E(aX + b) = a\big(X - \E(X)\big)\).`],
    solution: [
      { t: 'Question 1: the definitions', html: M(r`<div class="fm">\[\E(X) = \sum_{i=1}^{n} x_i\,\P(X = x_i) \qquad \mathrm{Var}(X) = \E\big((X - \E(X))^2\big) = \sum_{i=1}^{n} \big(x_i - \E(X)\big)^2\,\P(X = x_i)\]</div>`) },
      { t: 'Question 2: expectation of aX + b', html: r`<p>Formula: \(\E(aX + b) = a\E(X) + b\).</p>` +
        M(r`<p>Let \(Y = aX + b\). We have \(Y = f(X)\), where \(f\) is the function \(x \mapsto ax + b\). By the transfer theorem (admitted in the lecture),</p><div class="fm">\[\E(Y) = \sum_{i=1}^{n} f(x_i)\,\P(X = x_i) = \sum_{i=1}^{n} (a x_i + b)\,\P(X = x_i).\]</div><p>Now, for all \(i \in \ent{1}{n}\), \((a x_i + b)\,\P(X = x_i) = a\,x_i\,\P(X = x_i) + b\,\P(X = x_i)\). Splitting the sum in two, then factoring \(a\) out of the first one and \(b\) out of the second one:</p><div class="fm">\[\E(Y) = a \sum_{i=1}^{n} x_i\,\P(X = x_i) + b \sum_{i=1}^{n} \P(X = x_i).\]</div><p>The first sum is \(\E(X)\). The second one is 1, since the events \((X = x_i)\), \(i \in \ent{1}{n}\), form a complete system of events. Finally, \(\E(aX + b) = a\E(X) + b\).</p>`) },
      { t: 'Question 3: variance of aX + b', html: r`<p>Formula: \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\); it does not depend on \(b\).</p>` +
        M(r`<p>By definition, \(\mathrm{Var}(aX + b) = \E\Big(\big((aX + b) - \E(aX + b)\big)^2\Big)\). Now, by question 2, \(\E(aX + b) = a\E(X) + b\), so</p><div class="fm">\[(aX + b) - \E(aX + b) = aX + b - a\E(X) - b = a\big(X - \E(X)\big).\]</div><p>Hence \(\mathrm{Var}(aX + b) = \E\Big(a^2\big(X - \E(X)\big)^2\Big)\). Applying question 2 to the variable \(\big(X - \E(X)\big)^2\), with the coefficient \(a^2\) and the constant 0, we get \(\mathrm{Var}(aX + b) = a^2\,\E\Big(\big(X - \E(X)\big)^2\Big)\). The expectation we get is the variance of \(X\): \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\).</p>`) +
        r`<p>Application: in exercise 6, \(\mathrm{Var}(2X + 1) = 4\,\mathrm{Var}(X)\).</p>` }],
    answer: r`<ul><li>1. \(\E(X) = \sum_{i=1}^{n} x_i \P(X = x_i)\); \(\mathrm{Var}(X) = \sum_{i=1}^{n} (x_i - \E(X))^2 \P(X = x_i)\).</li><li>2. \(\E(aX + b) = a\E(X) + b\), by the transfer theorem and linearity of the sum.</li><li>3. \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\), which does not depend on \(b\).</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(aX + b) \neq a\,\mathrm{Var}(X) + b\): the shift \(b\) does not change the spread and \(a\) is squared.`,
      r`Forgetting to say why \(\sum_i \P(X = x_i) = 1\).`,
      r`Writing the Koenig-Huygens formula as the definition of the variance: the definition is \(\E\big((X - \E(X))^2\big)\).`,
      r`“Express in terms of \(a\), \(b\)…”: give the formula first, then prove it.`],
    grading: '5 points for the exercise; the paper does not split them between questions. Both proofs are those of the document “Theorems and proofs”.',
    note: N25 + r` Statement word for word the same as exercise 5 of the 2024 DP exam: the proof of \(\E(aX + b)\) and \(\mathrm{Var}(aX + b)\) came up two years in a row.` };

  EN['p2025-dp-ex6'] = { src: 'DP exam 2025 · Ex 6', title: r`Dice and box: distribution, \(Y = 2X + 1\), Bernoulli, binomial over 8 draws`,
    intro: r`<p>Parts A and B are independent.</p>`,
    questions: [
      r`<b>Part A.</b> We roll a standard fair die. If the result is 1, 3 or 4, we score nothing. If the result is 2 or 6, we score 1 point. If the result is 5, we win 2 points. Let \(X\) be the random variable equal to the number of points obtained in one roll.<p>1. Give the distribution of \(X\).</p><p>2. Compute the expectation and the variance of \(X\).</p><p>3. Let \(Y = 2X + 1\). What are the distribution of \(Y\), its expectation and its variance?</p>`,
      r`<b>Part B.</b> A box contains \(n\) white balls and 3 red balls, impossible to tell apart by touch. We randomly pick a ball from the box, note its colour, then put it back in the box.<p>1. Find \(n\) so that the probability of getting a red ball is equal to \(\dfrac{3}{11}\).</p><p>2. Assume \(n = 6\). If the ball drawn is white, we score 1 point, otherwise we score no point. Let \(Y\) be the random variable equal to the number of points obtained on this draw.</p><p>(a) Give the distribution of \(Y\), its expectation and its variance.</p><p>(b) We make 8 successive draws, under the same conditions. These draws are assumed to be independent. For \(k \in \ent{1}{8}\), let \(Y_k\) be the number of points obtained at the \(k\)-th draw.</p><p>Let \(Z = Y_1 + Y_2 + \ldots + Y_8\).</p><p>i. Give \(Z(\Omega)\) and \(\P(Z = i)\) for all \(i \in Z(\Omega)\). You will justify your results.</p><p>ii. Find \(\P(Z \leq 7)\). Simplify your result as much as possible.</p>`],
    hints: [
      r`Part A: the 6 faces are equally likely; \(\P(X = 0) = \P(\{1, 3, 4\})\). The distribution is \(X(\Omega)\) and all the probabilities.`,
      r`\(Y = 2X + 1\): each value \(x\) of \(X\) gives the value \(2x + 1\) of \(Y\), with the same probability. For \(\E(Y)\) and \(\mathrm{Var}(Y)\), use exercise 5.`,
      r`Part B: \(Z\) is the sum of 8 independent Bernoulli variables with the same parameter. For \(\P(Z \leq 7)\), go through the complementary event \((Z = 8)\).`],
    solution: [
      { t: 'Part A, question 1: distribution of X', html: M(r`<p>The die is fair: the 6 outcomes of \(\Omega = \ent{1}{6}\) are equally likely. \(X(\Omega) = \{0, 1, 2\}\) and</p><div class="fm">\[\P(X = 0) = \P(\{1, 3, 4\}) = \frac{3}{6} = \frac{1}{2}, \quad \P(X = 1) = \P(\{2, 6\}) = \frac{2}{6} = \frac{1}{3}, \quad \P(X = 2) = \P(\{5\}) = \frac{1}{6}.\]</div><p>Check: \(\dfrac{1}{2} + \dfrac{1}{3} + \dfrac{1}{6} = 1\).</p>`) +
        T('law', { x: [0, 1, 2], p: ['1/2', '1/3', '1/6'], name: 'X', edit: false }) },
      { t: 'Part A, question 2: expectation and variance of X', html: M(r`<div class="fm">\[\E(X) = 0 \times \frac{1}{2} + 1 \times \frac{1}{3} + 2 \times \frac{1}{6} = \frac{1}{3} + \frac{1}{3} = \frac{2}{3}.\]</div><div class="fm">\[\E(X^2) = 0^2 \times \frac{1}{2} + 1^2 \times \frac{1}{3} + 2^2 \times \frac{1}{6} = \frac{1}{3} + \frac{2}{3} = 1.\]</div><p>By the Koenig-Huygens formula, \(\mathrm{Var}(X) = \E(X^2) - \big(\E(X)\big)^2 = 1 - \dfrac{4}{9} = \dfrac{5}{9}\).</p>`) },
      { t: 'Part A, question 3: Y = 2X + 1', html: M(r`<p>\(Y(\Omega) = \{2 \times 0 + 1,\ 2 \times 1 + 1,\ 2 \times 2 + 1\} = \{1, 3, 5\}\). Since \(x \mapsto 2x + 1\) is injective, \((Y = 2x + 1) = (X = x)\) for each value \(x\) of \(X\):</p><div class="fm">\[\P(Y = 1) = \P(X = 0) = \frac{1}{2}, \quad \P(Y = 3) = \P(X = 1) = \frac{1}{3}, \quad \P(Y = 5) = \P(X = 2) = \frac{1}{6}.\]</div><p>By exercise 5 (with \(a = 2\) and \(b = 1\)): \(\E(Y) = 2\E(X) + 1 = \dfrac{4}{3} + 1 = \dfrac{7}{3}\) and \(\mathrm{Var}(Y) = 2^2\,\mathrm{Var}(X) = 4 \times \dfrac{5}{9} = \dfrac{20}{9}\).</p>`) +
        r`<p>Direct check: \(\E(Y) = \frac{1}{2} + \frac{3}{3} + \frac{5}{6} = \frac{7}{3}\) and \(\E(Y^2) = \frac{1}{2} + \frac{9}{3} + \frac{25}{6} = \frac{23}{3}\), so \(\mathrm{Var}(Y) = \frac{23}{3} - \frac{49}{9} = \frac{20}{9}\).</p>` },
      { t: 'Part B, question 1: the number of white balls', html: M(r`<p>The box contains \(n + 3\) balls that cannot be told apart: we are in a situation of equiprobability, and the probability of getting a red ball is \(\dfrac{3}{n + 3}\). For \(n \in \N\):</p><div class="fm">\[\frac{3}{n + 3} = \frac{3}{11} \iff n + 3 = 11 \iff n = 8.\]</div><p>We need 8 white balls.</p>`) },
      { t: 'Part B, question 2(a): distribution of Y', html: M(r`<p>With \(n = 6\), the box contains 9 balls, 6 of which are white. \(Y(\Omega) = \{0, 1\}\), \(\P(Y = 1) = \dfrac{6}{9} = \dfrac{2}{3}\) and \(\P(Y = 0) = \dfrac{3}{9} = \dfrac{1}{3}\): \(Y\) follows the Bernoulli distribution with parameter \(\dfrac{2}{3}\).</p><p>\(\E(Y) = 0 \times \dfrac{1}{3} + 1 \times \dfrac{2}{3} = \dfrac{2}{3}\); \(\E(Y^2) = \dfrac{2}{3}\), so \(\mathrm{Var}(Y) = \dfrac{2}{3} - \dfrac{4}{9} = \dfrac{2}{9}\) (that is \(p(1 - p)\)).</p>`) },
      { t: 'Part B, question 2(b): the binomial distribution', html: M(r`<p>i. Each \(Y_k\) follows the Bernoulli distribution with parameter \(\dfrac{2}{3}\) (same box, same conditions, question 2(a)), and the \(Y_k\) are independent since the draws are. \(Z = Y_1 + \cdots + Y_8\) is therefore the sum of 8 independent Bernoulli variables with the same parameter \(\dfrac{2}{3}\): \(Z\) follows the binomial distribution \(\mathcal{B}\left(8, \dfrac{2}{3}\right)\). Thus \(Z(\Omega) = \ent{0}{8}\) and</p><div class="fm">\[\forall i \in \ent{0}{8}, \quad \P(Z = i) = \binom{8}{i} \left(\frac{2}{3}\right)^i \left(\frac{1}{3}\right)^{8-i} = \binom{8}{i} \frac{2^i}{3^8}.\]</div><p>ii. The complementary event of \((Z \leq 7)\) is \((Z = 8)\). Hence</p><div class="fm">\[\P(Z \leq 7) = 1 - \P(Z = 8) = 1 - \binom{8}{8} \left(\frac{2}{3}\right)^8 \left(\frac{1}{3}\right)^0 = 1 - \frac{256}{6\,561} = \frac{6\,305}{6\,561}.\]</div>`) +
        r`<p>\(\P(Z \leq 7) \approx 0.961\). Summing \(\P(Z = 0) + \cdots + \P(Z = 7)\) gives the same value, with eight terms to compute.</p>` +
        T('law', { law: 'binom', n: 8, p: '2/3', name: 'Z', edit: false }) }],
    answer: r`<ul><li>A1. \(X(\Omega) = \{0, 1, 2\}\), probabilities \(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\).</li><li>A2. \(\E(X) = \frac{2}{3}\), \(\mathrm{Var}(X) = \frac{5}{9}\).</li><li>A3. \(Y(\Omega) = \{1, 3, 5\}\), probabilities \(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\); \(\E(Y) = \frac{7}{3}\), \(\mathrm{Var}(Y) = \frac{20}{9}\).</li><li>B1. \(n = 8\).</li><li>B2(a) \(Y\) follows the Bernoulli distribution with parameter \(\frac{2}{3}\); \(\E(Y) = \frac{2}{3}\), \(\mathrm{Var}(Y) = \frac{2}{9}\).</li><li>B2(b) \(Z \sim \mathcal{B}(8, \frac{2}{3})\), \(Z(\Omega) = \ent{0}{8}\), \(\P(Z = i) = \binom{8}{i} \frac{2^i}{3^8}\); \(\P(Z \leq 7) = 1 - \frac{256}{6561} = \frac{6305}{6561}\).</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(2X + 1) \neq 2\,\mathrm{Var}(X) + 1\): it is \(4\,\mathrm{Var}(X)\) (exercise 5).`,
      r`The letter \(Y\) is used twice (part A, then part B): they are two different variables, the parts are independent.`,
      r`\(\P(Z \leq 7) = 1 - \P(Z = 7)\) is wrong: the opposite of \((Z \leq 7)\) is \((Z \geq 8) = (Z = 8)\).`,
      r`Justify the binomial distribution: “sum of <b>independent</b> Bernoulli variables with the <b>same parameter</b>”. And \(Z(\Omega)\) contains 0.`,
      r`B1: the probability of a red ball is \(\frac{3}{n + 3}\), not \(\frac{3}{n}\) (which would give \(n = 11\)).`],
    grading: '12.5 points for the exercise; the paper does not split them between questions.',
    note: N25 + r` Wording of the statement, with no effect on the answers: the French text says “on marque aucun point” (a missing “ne”), and the letter \(Y\) is reused in part B.` };

  /* =====================================================================
     OBM exam, October 2025 — Moodle, no answer key; exercises 4 to 6 not on the syllabus
     ===================================================================== */
  EN['p2025-obm-ex1'] = { src: 'OBM exam 2025 · Ex 1', title: r`Logic: implications, quantifiers, density of \(\Q\), inclusion in \(\Z\)`,
    intro: r`<p>The questions are independent.</p>`,
    questions: [
      r`<b>1.</b> Let \(a\) and \(b\) be two real numbers. Consider the statements:<p>\(P_1\): “\(a = b\)”, \(P_2\): “\(a^2 = b^2\)”, \(P_3\): “\(a = -b\)”, \(P_4\): “\((a - b)(a + b) = 0\)”, \(P_5\): “\(a = b\) or \(a = -b\)” and \(P_6\): “\(a = 0\) or \(b = 0\)”</p><p>(a) Which implications of the form \(P_1 \Longrightarrow\) ……… are true for all real numbers \(a\) and \(b\)?</p><p>(b) Among the statements \(P_2\), \(P_3\), \(P_4\), \(P_5\) and \(P_6\), identify those that imply \(P_1\) for all real numbers \(a\) and \(b\).</p><p>(c) Among the statements \(P_1\), \(P_3\), \(P_4\), \(P_5\) and \(P_6\), identify those that imply \(P_2\) for all real numbers \(a\) and \(b\).</p><p>(d) Among the statements \(P_1\), \(P_3\), \(P_4\), \(P_5\) and \(P_6\), identify those that are equivalent to \(P_2\) for all real numbers \(a\) and \(b\).</p>`,
      r`<b>2.</b> Translate the following sentences using quantifiers, stating whether they are true or false and justifying.<p>(a) “The square of every real number is positive”</p><p>(b) “Some real numbers are strictly greater than their square”</p><p>(c) “There is a real number equal to the square of all the others”</p>`,
      r`<b>3.</b> Recall that \(\Q = \left\{\dfrac{a}{b},\ a \in \Z,\ b \in \Z^*\right\}\) is the set of rational numbers.<p>Consider the statement “(P): \(\forall (p, q) \in \Q^2,\ \big(p \lt q \Longrightarrow (\exists c \in \Q,\ p \lt c \lt q)\big)\)”</p><p>(a) Prove that statement (P) is true by a direct proof, taking great care over your writing.</p><p>Hint: you may think of \(\dfrac{p + q}{2}\)</p><p>(b) Give the negation of (P).</p>`,
      r`<b>4.</b> Let \(A = \{x \in \Z,\ x \geq 5\}\) and \(B = \{x \in \Z,\ (x - 1)(x - 5) \geq 0\}\). Let \(\overline{B}\) denote the complement of \(B\) in \(\Z\).<p>(a) Fill in the blanks so that the mathematical sentence is correct:</p><p>a) …… \(\in A\), &nbsp; b) ……… \(\not\subset A \cup B\), &nbsp; c) ……… \(\in A \cap B\), &nbsp; d) ……… \(\subset \overline{B}\)</p><p>(b) Of which common set are \(A\) and \(B\) subsets?</p><p>(c) Show that \(A \subset B\). Write your answer following the writing rules seen in the seminar.</p><p>(d) Do we have \(B \subset A\)? Justify.</p>`],
    hints: [
      r`Question 1: \(P_2\), \(P_4\) and \(P_5\) say the same thing (\(a^2 - b^2 = (a - b)(a + b)\), then “a product is zero if and only if one of the factors is”). A false implication is disproved by a single pair \((a, b)\): try \((1, -1)\), \((1, 1)\), \((0, 1)\).`,
      r`Question 3(a): first line “Let \((p, q) \in \Q^2\) be fixed.”, second line “Assume \(p \lt q\).” Then set \(c = \frac{p + q}{2}\) and show three things: \(c \in \Q\), \(p \lt c\) and \(c \lt q\).`,
      r`Question 4: \((x - 1)(x - 5) \geq 0\) if and only if \(x \leq 1\) or \(x \geq 5\) (sign table). So \(\overline{B} = \{2, 3, 4\}\).`],
    solution: [
      { t: 'Question 1: implications between the six statements', html: r`<p>For all real numbers \(a\) and \(b\): \(a^2 = b^2 \iff a^2 - b^2 = 0 \iff (a - b)(a + b) = 0 \iff (a - b = 0 \text{ or } a + b = 0) \iff (a = b \text{ or } a = -b)\). So \(P_2\), \(P_4\) and \(P_5\) are equivalent.</p>` +
        M(r`<p>(a) The true implications are \(P_1 \Rightarrow P_2\), \(P_1 \Rightarrow P_4\) and \(P_1 \Rightarrow P_5\). Let \(a\) and \(b\) be two real numbers. Assume \(P_1\) is true: \(a = b\). Then \(a^2 = b^2\), so \(P_2\) is true; since \(P_2\), \(P_4\) and \(P_5\) are equivalent, \(P_4\) and \(P_5\) are true too. On the other hand, \(P_1 \Rightarrow P_3\) and \(P_1 \Rightarrow P_6\) are false: for \(a = b = 1\), \(P_1\) is true, but \(1 \neq -1\) and neither \(a\) nor \(b\) is zero.</p><p>(b) None. For \((a, b) = (1, -1)\), \(P_2\), \(P_3\), \(P_4\) and \(P_5\) are true, but \(1 \neq -1\): \(P_1\) is false. For \((a, b) = (0, 1)\), \(P_6\) is true and \(P_1\) is false.</p><p>(c) \(P_1\), \(P_3\), \(P_4\) and \(P_5\) imply \(P_2\). For \(P_1\): see (a). For \(P_3\): let \(a\) and \(b\) be two real numbers; assume \(a = -b\); then \(a^2 = (-b)^2 = b^2\). For \(P_4\) and \(P_5\): they are equivalent to \(P_2\). On the other hand, \(P_6 \Rightarrow P_2\) is false: for \((a, b) = (0, 1)\), \(P_6\) is true and \(0^2 \neq 1^2\).</p><p>(d) \(P_4\) and \(P_5\) are equivalent to \(P_2\) (computation above). \(P_1\) is not, because \(P_2 \Rightarrow P_1\) is false (\((a, b) = (1, -1)\)); neither is \(P_3\), because \(P_2 \Rightarrow P_3\) is false (\((a, b) = (1, 1)\)); neither is \(P_6\) (question c).</p>`) },
      { t: 'Question 2: translating, true or false', html: M(r`<p>(a) “\(\forall x \in \R,\ x^2 \geq 0\)” (positive means \(\geq 0\) here). True. Let \(x \in \R\) be fixed. If \(x \geq 0\), \(x^2 = x \times x\) is a product of two nonnegative real numbers, so \(x^2 \geq 0\). If \(x \lt 0\), \(x^2 = (-x) \times (-x)\) with \(-x \gt 0\), so \(x^2 \geq 0\). Thus \(\forall x \in \R,\ x^2 \geq 0\).</p><p>(b) “\(\exists x \in \R,\ x \gt x^2\)”. True: for \(x = \dfrac{1}{2}\), \(x^2 = \dfrac{1}{4} \lt \dfrac{1}{2} = x\).</p><p>(c) “\(\exists x \in \R,\ \forall y \in \R \setminus \{x\},\ x = y^2\)”. False. Let us prove its negation: “\(\forall x \in \R,\ \exists y \in \R \setminus \{x\},\ x \neq y^2\)”.</p><p>Let \(x \in \R\) be fixed. Set \(y_1 = |x| + 1\) and \(y_2 = -(|x| + 1)\). These two real numbers are distinct (\(y_1 \gt 0 \gt y_2\)), so at least one of them is different from \(x\); call it \(y\). Then \(y \in \R \setminus \{x\}\) and \(y^2 = (|x| + 1)^2 = |x|^2 + 2|x| + 1 \gt |x| \geq x\), so \(y^2 \neq x\). The negation is true: sentence (c) is false.</p>`) +
        r`<p>For (c), a single \(x\) that fails is not enough: the sentence starts with \(\exists x\), so you have to show that <b>every</b> real number \(x\) fails. This is why we prove the negation. The sentence remains false if “all the others” is translated by \(\forall y \in \R\).</p>` },
      { t: 'Question 3(a): density of Q, direct proof', html: M(r`<p>Let \((p, q) \in \Q^2\) be fixed. Assume \(p \lt q\). Let us show that there exists \(c \in \Q\) such that \(p \lt c \lt q\).</p><p>Since \(p \in \Q\) and \(q \in \Q\), there exist \(a \in \Z\), \(b \in \Z^*\), \(a' \in \Z\) and \(b' \in \Z^*\) such that \(p = \dfrac{a}{b}\) and \(q = \dfrac{a'}{b'}\).</p><p>Set \(c = \dfrac{p + q}{2}\).</p><p>• \(c \in \Q\). Indeed, \(c = \dfrac{1}{2}\left(\dfrac{a}{b} + \dfrac{a'}{b'}\right) = \dfrac{ab' + a'b}{2bb'}\). Now \(ab' + a'b \in \Z\) (sums and products of integers) and \(2bb' \in \Z^*\) (product of nonzero integers, since \(b \neq 0\) and \(b' \neq 0\)). So \(c \in \Q\).</p><p>• \(p \lt c\). Indeed, \(c - p = \dfrac{p + q}{2} - p = \dfrac{q - p}{2}\). Now \(q - p \gt 0\) since \(p \lt q\), so \(c - p \gt 0\), that is \(p \lt c\).</p><p>• \(c \lt q\). Indeed, \(q - c = q - \dfrac{p + q}{2} = \dfrac{q - p}{2} \gt 0\), so \(c \lt q\).</p><p>Thus there exists \(c \in \Q\) such that \(p \lt c \lt q\): we have shown \(p \lt q \Longrightarrow (\exists c \in \Q,\ p \lt c \lt q)\).</p><p>Since \((p, q)\) is an arbitrary element of \(\Q^2\), statement (P) is true.</p>`, 'direct proof') +
        r`<p>The first two lines follow the seminar rules: “Let … be fixed” for the \(\forall\), “Assume …” for the implication. We do not call \(c\) the numerator of \(q\): the letter \(c\) is already taken by the statement.</p>` },
      { t: 'Question 3(b): the negation', html: M(r`<p>\(\neg(P)\): “\(\exists (p, q) \in \Q^2,\ \big(p \lt q \text{ and } (\forall c \in \Q,\ c \leq p \text{ or } c \geq q)\big)\)”.</p>`) +
        r`<p>We negate from left to right: \(\forall\) becomes \(\exists\); the negation of “\(P \Rightarrow Q\)” is “\(P\) and not \(Q\)”; \(\exists c\) becomes \(\forall c\); the negation of “\(p \lt c\) and \(c \lt q\)” is “\(c \leq p\) or \(c \geq q\)” (De Morgan).</p>` },
      { t: 'Question 4: the sets A and B', html: r`<p>Sign table: \(x - 1\) and \(x - 5\) are both positive if \(x \geq 5\), both negative if \(x \leq 1\), of opposite signs if \(1 \lt x \lt 5\). So \(B = \{x \in \Z,\ x \leq 1 \text{ or } x \geq 5\} = \{\ldots, -1, 0, 1\} \cup \{5, 6, 7, \ldots\}\) and \(\overline{B} = \{2, 3, 4\}\). For instance \(3 \notin B\): \((3 - 1)(3 - 5) = -4 \lt 0\).</p>` +
        M(r`<p>(a) Possible answers (others work): a) \(5 \in A\); b) \(\{3\} \not\subset A \cup B\); c) \(5 \in A \cap B\); d) \(\{2, 3\} \subset \overline{B}\).</p><p>(b) \(A\) and \(B\) are subsets of \(\Z\).</p><p>(c) Let \(x \in A\) be fixed. Then \(x \in \Z\) and \(x \geq 5\). So \(x - 5 \geq 0\) and \(x - 1 \geq 4 \gt 0\). Now the product of two nonnegative real numbers is nonnegative, so \((x - 1)(x - 5) \geq 0\). Hence \(x \in B\). We have shown that every element of \(A\) is in \(B\): \(A \subset B\).</p><p>(d) No. \(0 \in \Z\) and \((0 - 1)(0 - 5) = 5 \geq 0\), so \(0 \in B\). But \(0 \lt 5\), so \(0 \notin A\). Thus \(B \not\subset A\).</p>`, '4(c) and 4(d)') +
        r`<p>For b) and d), the blanks come before \(\not\subset\) and \(\subset\): a <b>set</b> is expected (\(\{3\}\)), not an element. Since \(A \subset B\), we have \(A \cup B = B\) and \(A \cap B = A\).</p>` }],
    answer: r`<ul><li>1(a) \(P_1 \Rightarrow P_2\), \(P_1 \Rightarrow P_4\), \(P_1 \Rightarrow P_5\); 1(b) none; 1(c) \(P_1\), \(P_3\), \(P_4\), \(P_5\); 1(d) \(P_4\) and \(P_5\).</li><li>2(a) \(\forall x \in \R,\ x^2 \geq 0\): true; 2(b) \(\exists x \in \R,\ x \gt x^2\): true (\(x = \frac{1}{2}\)); 2(c) \(\exists x \in \R,\ \forall y \in \R \setminus \{x\},\ x = y^2\): false.</li><li>3(a) \(c = \frac{p + q}{2} = \frac{ab' + a'b}{2bb'} \in \Q\) and \(p \lt c \lt q\); 3(b) \(\exists (p, q) \in \Q^2,\ p \lt q \text{ and } (\forall c \in \Q,\ c \leq p \text{ or } c \geq q)\).</li><li>4(a) for instance \(5\), \(\{3\}\), \(5\), \(\{2, 3\}\); 4(b) \(\Z\); 4(c) let \(x \in A\) be fixed…; 4(d) no: \(0 \in B\) and \(0 \notin A\). \(\overline{B} = \{2, 3, 4\}\).</li></ul>`,
    traps: [
      r`1(b): “none” is an answer. \(P_5 \Rightarrow P_1\) is false: “\(a = b\) or \(a = -b\)” does not force \(a = b\).`,
      r`1(c) and 1(d): “imply” is not “be equivalent to”. \(P_1\) and \(P_3\) imply \(P_2\) without being equivalent to it.`,
      r`2(c): “all the others” translates as \(\forall y \in \R \setminus \{x\}\), and the order is \(\exists x\) then \(\forall y\). To prove it is false, you have to deal with all \(x\), not just one.`,
      r`3(a): show \(c \in \Q\) with the definitions (\(b \neq 0\) and \(b' \neq 0\) give \(2bb' \neq 0\)), not “the average of two rational numbers is rational” without proof. A numerical example proves nothing.`,
      r`3(b): the negation of the implication is “\(p \lt q\) and …”, never an implication; and not\((p \lt c \lt q)\) is “\(c \leq p\) or \(c \geq q\)”.`,
      r`4(c): the first line is “Let \(x \in A\) be fixed.”, not “Let \(x \in \Z\)”; finish with the conclusion \(A \subset B\).`],
    grading: '12 points for the exercise; the paper does not split them between questions. The writing of 3(a) and 4(c) is explicitly graded (“taking great care over your writing”, “Write your answer following the writing rules seen in the seminar”).',
    note: N25 + ' Model write-up following the seminar rules (§ 4.2 “How to write it up?”).' };

  EN['p2025-obm-ex2'] = { src: 'OBM exam 2025 · Ex 2', title: r`The function \(A \mapsto \card(A)\) on \(\mathcal{P}(\{2, 3, 4\})\)`,
    questions: [
      r`<b>1.</b> Let \(F\) and \(G\) be two sets and \(f : F \longrightarrow G\)<p>(a) Recall the mathematical definition (with quantifiers) of “\(f\) is injective from \(F\) to \(G\)”</p><p>(b) Recall the mathematical definition (with quantifiers) of “\(f\) is surjective from \(F\) to \(G\)”</p>`,
      r`<b>2.</b> Let \(E = \{2, 3, 4\}\). Define the function \(f : \mathcal{P}(E) \longrightarrow \N,\ A \longmapsto \card(A)\).<p>(a) Give \(\mathcal{P}(E)\)</p><p>(b) Fill in the table of values of the function \(f\) (one row \(A\), one row \(f(A)\)).</p><p>(c) Is \(f\) injective? Justify.</p><p>(d) Is \(f\) surjective? Justify.</p><p>(e) Find \(I \subset \mathcal{P}(E)\) and \(J \subset \N\) such that \(f : I \longrightarrow J\) is injective and not surjective. (The sets \(I\) and \(J\) must have at least two elements).</p><p>(f) Find \(I' \subset \mathcal{P}(E)\) and \(J' \subset \N\) such that \(f : I' \longrightarrow J'\) is surjective and not injective. (The sets \(I'\) and \(J'\) must have at least two elements).</p>`],
    hints: [
      r`\(\mathcal{P}(E)\) contains all the subsets of \(E\), including \(\varnothing\) and \(E\): \(2^3 = 8\) elements.`,
      r`Not injective: two distinct subsets with the same cardinality. Not surjective: a natural number that is the cardinality of no subset of \(E\).`,
      r`For (e) and (f), you also need \(f(I) \subset J\): the image of every element of \(I\) must be in \(J\).`],
    solution: [
      { t: 'Question 1: definitions', html: M(r`<p>(a) \(f\) is injective from \(F\) to \(G\) if: \(\forall (x, x') \in F^2,\ f(x) = f(x') \Longrightarrow x = x'\).</p><p>(b) \(f\) is surjective from \(F\) to \(G\) if: \(\forall y \in G,\ \exists x \in F,\ y = f(x)\).</p>`) },
      { t: 'Question 2(a)-(b): P(E) and the table', html: M(r`<p>(a) \(\mathcal{P}(E) = \big\{\varnothing, \{2\}, \{3\}, \{4\}, \{2, 3\}, \{2, 4\}, \{3, 4\}, \{2, 3, 4\}\big\}\): \(2^3 = 8\) subsets.</p>`) +
        '<div class="tbl"><table><thead><tr><th scope="row">\\(A\\)</th><td>\\(\\varnothing\\)</td><td>\\(\\{2\\}\\)</td><td>\\(\\{3\\}\\)</td><td>\\(\\{4\\}\\)</td><td>\\(\\{2, 3\\}\\)</td><td>\\(\\{2, 4\\}\\)</td><td>\\(\\{3, 4\\}\\)</td><td>\\(\\{2, 3, 4\\}\\)</td></tr></thead><tbody><tr><th scope="row">\\(f(A)\\)</th><td>0</td><td>1</td><td>1</td><td>1</td><td>2</td><td>2</td><td>2</td><td>3</td></tr></tbody></table></div>' },
      { t: 'Question 2(c)-(d): injective, surjective', html: M(r`<p>(c) \(f\) is not injective: \(f(\{2\}) = f(\{3\}) = 1\) and \(\{2\} \neq \{3\}\).</p><p>(d) \(f\) is not surjective: \(4 \in \N\) has no pre-image, since every subset of \(E\) has at most 3 elements. From the table, \(f(\mathcal{P}(E)) = \{0, 1, 2, 3\} \neq \N\).</p>`) },
      { t: 'Question 2(e)-(f): restricting', html: M(r`<p>(e) Take \(I = \{\varnothing, \{2\}\}\) and \(J = \{0, 1, 2\}\). We have \(f(\varnothing) = 0\) and \(f(\{2\}) = 1\): the two elements of \(I\) have distinct images, which are in \(J\), so \(f : I \to J\) is injective. It is not surjective: \(2 \in J\) has no pre-image in \(I\).</p><p>(f) Take \(I' = \{\{2\}, \{3\}, \{2, 3\}\}\) and \(J' = \{1, 2\}\). We have \(f(I') = \{1, 2\} = J'\): \(f : I' \to J'\) is surjective. It is not injective: \(f(\{2\}) = f(\{3\}) = 1\) with \(\{2\} \neq \{3\}\).</p>`) +
        r`<p>Other choices work: in (e), subsets with pairwise distinct cardinalities and a \(J\) containing one more value; in (f), two subsets with the same cardinality in \(I'\), and \(J' = f(I')\).</p>` }],
    answer: r`<ul><li>1(a) \(\forall (x, x') \in F^2,\ f(x) = f(x') \Rightarrow x = x'\); 1(b) \(\forall y \in G,\ \exists x \in F,\ y = f(x)\).</li><li>2(a) 8 subsets: \(\varnothing\), \(\{2\}\), \(\{3\}\), \(\{4\}\), \(\{2, 3\}\), \(\{2, 4\}\), \(\{3, 4\}\), \(\{2, 3, 4\}\); 2(b) images 0, 1, 1, 1, 2, 2, 2, 3.</li><li>2(c) not injective: \(f(\{2\}) = f(\{3\})\); 2(d) not surjective: 4 has no pre-image, \(f(\mathcal{P}(E)) = \{0, 1, 2, 3\}\).</li><li>2(e) \(I = \{\varnothing, \{2\}\}\), \(J = \{0, 1, 2\}\); 2(f) \(I' = \{\{2\}, \{3\}, \{2, 3\}\}\), \(J' = \{1, 2\}\).</li></ul>`,
    traps: [
      r`Forgetting \(\varnothing\) or \(E\) in \(\mathcal{P}(E)\): there are 8 subsets, not 6.`,
      r`The elements of \(\mathcal{P}(E)\) are sets: write \(\{2\}\), not \(2\); \(I\) is a set of subsets, \(\{\varnothing, \{2\}\}\).`,
      r`Surjectivity “onto \(\N\)”: a single integer without a pre-image is enough (4, or 5…), not “\(f\) only takes four values”.`,
      r`(e) and (f): check \(f(I) \subset J\), otherwise \(f : I \to J\) is not a function.`],
    grading: '4.5 points for the exercise; the paper does not split them between questions.',
    note: N25 + ' Same plan as exercise 2 of the 2024 OBM exam (table, injective, surjective, restrictions).' };

  EN['p2025-obm-ex3'] = { src: 'OBM exam 2025 · Ex 3', title: r`Direct images and pre-images: definitions, a function on \(\ent{0}{10}\), ln and cos`,
    questions: [
      r`<b>1.</b> Let \(E\) and \(F\) be two sets and \(f : E \longrightarrow F\).<p>(a) Let \(A \subset E\). Give the mathematical definition of \(f(A)\).</p><p>(b) Let \(B \subset F\). Give the mathematical definition of \(f^{-1}(B)\).</p>`,
      r`<b>2.</b> Application 1. Define the function \(f : \ent{0}{10} \longrightarrow \N\) such that \[\forall n \in \ent{0}{10},\ f(n) = n + 1 \text{ if } n \text{ is even and } 0 \text{ otherwise}\]<p>Give \(f(\{1, 2, 3\})\) and \(f^{-1}(\{0\})\).</p>`,
      r`<b>3.</b> Application 2: fill in the following table.<p>N.B.: we advise you to draw the graphs of the functions on your draft paper! Of course, the function ln is the function \(x \mapsto \ln(x)\) and the function cos is \(x \mapsto \cos(x)\).</p><div class="tbl"><table><thead><tr><th scope="col">\(f\)</th><th scope="col">\(\ln : \R^{+*} \to \R\)</th><th scope="col">\(\cos : [-\pi, \pi] \to \R\)</th></tr></thead><tbody><tr><th scope="row">\(f\left(\left]0, \frac{\pi}{2}\right]\right)\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{0\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{-1\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(]-\infty, 0])\)</th><td></td><td></td></tr></tbody></table></div>`],
    hints: [
      r`\(f(A)\) is a subset of \(F\) (the images), \(f^{-1}(B)\) a subset of \(E\) (the pre-images).`,
      r`Application 1: compute \(f(1)\), \(f(2)\), \(f(3)\); then look for all \(n \in \ent{0}{10}\) such that \(f(n) = 0\): if \(n\) is even, \(f(n) = n + 1 \geq 1\).`,
      r`ln is strictly increasing on \(]0, +\infty[\) and tends to \(-\infty\) at 0. cos is even on \([-\pi, \pi]\), increasing on \([-\pi, 0]\), decreasing on \([0, \pi]\). A pre-image is looked for in the domain.`],
    solution: [
      { t: 'Question 1: definitions', html: M(r`<p>(a) \(f(A) = \{f(x),\ x \in A\} = \{y \in F,\ \exists x \in A,\ y = f(x)\}\).</p><p>(b) \(f^{-1}(B) = \{x \in E,\ f(x) \in B\}\).</p>`) },
      { t: 'Question 2: a function on ⟦0, 10⟧', html: M(r`<p>\(1\) and \(3\) are odd, so \(f(1) = f(3) = 0\); \(2\) is even, so \(f(2) = 2 + 1 = 3\). Thus \(f(\{1, 2, 3\}) = \{f(1), f(2), f(3)\} = \{0, 3\}\).</p><p>Let \(n \in \ent{0}{10}\). If \(n\) is even, \(f(n) = n + 1 \geq 1\), so \(f(n) \neq 0\). If \(n\) is odd, \(f(n) = 0\). So \(f^{-1}(\{0\}) = \{n \in \ent{0}{10},\ f(n) = 0\} = \{1, 3, 5, 7, 9\}\).</p>`) },
      { t: 'Question 3: ln column', html: FIG.ln + M(r`<p>ln is continuous and strictly increasing on \(]0, +\infty[\), with \(\ln(x) \to -\infty\) as \(x \to 0^+\), and \(\ln(1) = 0\).</p><p>\(\ln\left(\left]0, \frac{\pi}{2}\right]\right) = \left]-\infty, \ln\left(\frac{\pi}{2}\right)\right]\) (right endpoint reached at \(\frac{\pi}{2}\), left endpoint never reached); \(\ln^{-1}(\{0\}) = \{1\}\); \(\ln^{-1}(\{-1\}) = \{e^{-1}\} = \left\{\frac{1}{e}\right\}\); \(\ln^{-1}(]-\infty, 0]) = ]0, 1]\) (\(\ln(x) \leq 0 \iff 0 \lt x \leq 1\)).</p>`) },
      { t: 'Question 3: cos column', html: FIG.cosPi + M(r`<p>On \([-\pi, \pi]\), cos is continuous and even; it increases from \(-1\) to 1 on \([-\pi, 0]\) and decreases from 1 to \(-1\) on \([0, \pi]\).</p><p>\(\cos\left(\left]0, \frac{\pi}{2}\right]\right) = [0, 1[\): cos is strictly decreasing on \(\left[0, \frac{\pi}{2}\right]\), the value \(\cos\left(\frac{\pi}{2}\right) = 0\) is reached, the value \(\cos(0) = 1\) is not since 0 is excluded.</p><p>\(\cos^{-1}(\{0\}) = \left\{-\frac{\pi}{2}, \frac{\pi}{2}\right\}\); \(\cos^{-1}(\{-1\}) = \{-\pi, \pi\}\); \(\cos^{-1}(]-\infty, 0]) = \left[-\pi, -\frac{\pi}{2}\right] \cup \left[\frac{\pi}{2}, \pi\right]\).</p>`) }],
    answer: r`<ul><li>1(a) \(f(A) = \{f(x),\ x \in A\}\); 1(b) \(f^{-1}(B) = \{x \in E,\ f(x) \in B\}\).</li><li>2. \(f(\{1, 2, 3\}) = \{0, 3\}\); \(f^{-1}(\{0\}) = \{1, 3, 5, 7, 9\}\).</li></ul>` +
      '<div class="tbl"><table><thead><tr><th scope="col">\\(f\\)</th><th scope="col">\\(\\ln : \\R^{+*} \\to \\R\\)</th><th scope="col">\\(\\cos : [-\\pi, \\pi] \\to \\R\\)</th></tr></thead><tbody><tr><th scope="row">\\(f(]0, \\frac{\\pi}{2}])\\)</th><td>\\(]-\\infty, \\ln(\\frac{\\pi}{2})]\\)</td><td>\\([0, 1[\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{0\\})\\)</th><td>\\(\\{1\\}\\)</td><td>\\(\\{-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{-1\\})\\)</th><td>\\(\\{\\frac{1}{e}\\}\\)</td><td>\\(\\{-\\pi, \\pi\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(]-\\infty, 0])\\)</th><td>\\(]0, 1]\\)</td><td>\\([-\\pi, -\\frac{\\pi}{2}] \\cup [\\frac{\\pi}{2}, \\pi]\\)</td></tr></tbody></table></div>',
    traps: [
      r`\(\cos\left(\left]0, \frac{\pi}{2}\right]\right) = [0, 1[\), not \([0, 1]\): the interval is open at 0, the value 1 is not reached.`,
      r`\(\cos^{-1}(\{0\})\) has two elements on \([-\pi, \pi]\): \(-\frac{\pi}{2}\) and \(\frac{\pi}{2}\). Do not answer \(\left\{\frac{\pi}{2} + k\pi,\ k \in \Z\right\}\): the function is only defined on \([-\pi, \pi]\).`,
      r`\(\ln^{-1}(]-\infty, 0]) = ]0, 1]\): 0 is not in the domain.`,
      r`\(f^{-1}(\{0\})\) is a set of pre-images (\(\{1, 3, 5, 7, 9\}\)), not a value; and 0 is not one of them (\(f(0) = 1\)).`],
    grading: '5 points for the exercise; the paper does not give a breakdown of the marks. Only the results are asked for in the table.',
    note: N25 + r` Same table as in the 2024 OBM exam (exercise 3), with ln instead of exp and cos on \([-\pi, \pi]\) instead of \([0, \pi]\).` };

  /* =====================================================================
     DP exam, October 2024 — no answer key
     ===================================================================== */
  var N24 = 'The archive has no answer key for this paper: solution written in the style of the official 2023 answer keys, every result recomputed by program (exhaustive enumeration).';

  EN['p2024-dp-ex1'] = { src: 'DP exam 2024 · Ex 1', title: 'Propose a drawing situation for a given formula',
    intro: r`<p>From a 32-card deck, we draw 5 cards.</p><p>Propose a simple situation such that the answer to the question “How many possible results are there?” is:</p>`,
    questions: [
      r`<b>1.</b> “There are \(\dfrac{32!}{27!}\) possible results”.`,
      r`<b>2.</b> “There are \(\dbinom{32}{5}\) possible results”.`,
      r`<b>3.</b> “There are \(\dbinom{8}{3} \times \dbinom{8}{2}\) possible results”.`,
      r`<b>4.</b> “There are \(\dbinom{7}{1} \times \dbinom{24}{3}\) possible results”.`],
    hints: [
      r`Read each formula: \(\frac{32!}{27!} = 32 \times 31 \times 30 \times 29 \times 28\) counts ordered lists without repetition; \(\binom{32}{5}\) counts 5-element subsets.`,
      r`A 32-card deck has 4 suits (hearts, diamonds, clubs, spades) of 8 cards each. \(\binom{8}{3}\) picks 3 cards of one suit.`,
      r`In formula 4, the chosen numbers add up to \(1 + 3 = 4\) cards, not 5: the fifth card must be imposed. \(7 + 24 + 1 = 32\).`],
    solution: [
      { t: 'Formula 1: order matters, no repetition', html: r`<p>\(\dfrac{32!}{27!} = 32 \times 31 \times 30 \times 29 \times 28 = A_{32}^5\): the number of 5-lists of distinct cards, that is of draws <b>one after the other without replacement</b>.</p>` +
        M(r`<p>We successively pick 5 cards without replacement, writing down the order. There are 32 choices for the first card, 31 for the second… 28 for the fifth: \(32 \times 31 \times 30 \times 29 \times 28 = \dfrac{32!}{27!}\) results.</p>`) },
      { t: 'Formula 2: order does not matter', html: M(r`<p>We simultaneously pick 5 cards (a 5-card hand). A hand is a 5-element subset of the set of 32 cards: there are \(\dbinom{32}{5}\) hands.</p>`) },
      { t: 'Formula 3: two given suits', html: r`<p>The two factors \(\binom{8}{\cdot}\) choose in two groups of 8 cards: two suits. The numbers 3 and 2 do make 5 cards.</p>` +
        M(r`<p>We simultaneously pick 5 cards and count the hands made of exactly 3 hearts and 2 spades. We choose the 3 hearts among the 8 hearts (\(\binom{8}{3}\) ways), then the 2 spades among the 8 spades (\(\binom{8}{2}\) ways): there are \(\dbinom{8}{3} \times \dbinom{8}{2}\) hands.</p>`) +
        r`<p>Value: \(56 \times 28 = 1\,568\).</p>` },
      { t: 'Formula 4: one imposed card', html: r`<p>\(7 + 24 = 31\): with one more card, the 7 cards and the 24 cards make the whole deck. For example: the ace of hearts, the 7 other hearts, the 24 cards that are not hearts. Since \(1 + 3 = 4\), the fifth card of the hand has to be the ace of hearts.</p>` +
        M(r`<p>We simultaneously pick 5 cards and count the hands that contain the ace of hearts and exactly two hearts. The ace of hearts is imposed (1 way); we choose the other heart among the 7 other hearts (\(\binom{7}{1}\) ways); the last 3 cards are not hearts: we choose them among the 24 cards of the three other suits (\(\binom{24}{3}\) ways). There are \(\dbinom{7}{1} \times \dbinom{24}{3}\) hands.</p>`) +
        r`<p>Value: \(7 \times 2\,024 = 14\,168\). Another situation that works: “the hands that contain the king of spades and exactly two spades”.</p>` }],
    answer: r`<ul><li>1. Picking 5 cards one after the other without replacement (order recorded): \(\frac{32!}{27!} = 24\,165\,120\).</li><li>2. Picking 5 cards simultaneously (a hand): \(\binom{32}{5} = 201\,376\).</li><li>3. 5-card hands with exactly 3 hearts and 2 spades: \(1\,568\).</li><li>4. 5-card hands containing the ace of hearts and exactly two hearts: \(14\,168\).</li></ul>`,
    traps: [
      r`Formula 4: “1 heart and 3 non-hearts” is only 4 cards; without an imposed card, the proposed situation does not draw 5 cards.`,
      r`Formula 1: “with replacement” would give \(32^5\), not \(\frac{32!}{27!}\).`,
      r`Formula 3: “3 cards of one suit and 2 of another”, without naming the suits, gives \(4 \times 3 \times \binom{8}{3}\binom{8}{2}\): name the two suits.`],
    grading: '4 points for the exercise; the paper does not split them between questions. Any correct, clearly described situation is accepted.',
    note: N24 + ' The proposed situations are examples among others; their counts were checked on the 201,376 hands.' };

  EN['p2024-dp-ex2'] = { src: 'DP exam 2024 · Ex 2', title: 'Door code: one letter followed by three digits',
    intro: r`<p>The door code panel at the entrance of a building has 13 keys: 3 letters A, B and C and the ten digits from 0 to 9.</p><p>A code is made of one letter followed by 3 digits.</p><p>N.B.: give your results as integers.</p>`,
    questions: [
      r`<b>1.</b> How many possible codes have distinct digits? Justify briefly.`,
      r`<b>2.</b> How many possible codes are there if the digits may repeat? Justify briefly.`,
      r`<b>3.</b> Paul arrives at the building but has forgotten the code. He only remembers the letter and knows that the digits are distinct and odd. How many possibilities does he have to find the code? Justify briefly.`,
      r`<b>4.</b> The next day, Paul comes back but the code has changed, letter included. He was only told that the three digits of the code are 6, 2 and 9. How many possibilities does he have to find the code? Justify briefly.`,
      r`<b>5.</b> The day after, Paul wants to get home again but the code has changed once more (letter included). This time, he only knows that the digits of the code may repeat and that the digit 4 appears at least once. How many possibilities does he have to find the code? Justify briefly.`],
    hints: [
      'A code is an ordered list: the letter, then the 1st, 2nd and 3rd digits. Multiply the numbers of choices (multiplication principle).',
      'Distinct digits: arrangements (10 × 9 × 8). Digits that may repeat: 10 × 10 × 10.',
      '“At least one 4”: count all codes, then remove those with no 4.'],
    solution: [
      { t: 'Question 1: distinct digits', html: M(r`<p>A code is a letter (3 choices: A, B or C) followed by 3 distinct digits, order mattering: an arrangement of 3 digits out of 10, that is \(A_{10}^3 = 10 \times 9 \times 8 = 720\) possibilities. By the multiplication principle, there are \(3 \times 720 = 2\,160\) codes.</p>`) },
      { t: 'Question 2: digits with repetition', html: M(r`<p>Each digit can take the 10 values, independently of the others: \(10^3 = 1\,000\) sequences of 3 digits (3-lists of \(\ent{0}{9}\)). With the letter: \(3 \times 10^3 = 3\,000\) codes.</p>`) },
      { t: 'Question 3: known letter, distinct odd digits', html: M(r`<p>The letter is known: 1 choice. The odd digits are 1, 3, 5, 7, 9: 5 digits. The 3 digits of the code are distinct and order matters: \(A_5^3 = 5 \times 4 \times 3 = 60\). Paul has 60 possibilities.</p>`) },
      { t: 'Question 4: digits 6, 2, 9 in an unknown order', html: M(r`<p>The letter has changed: 3 choices. The digits are 6, 2 and 9 in an unknown order: there are \(3! = 6\) ways of ordering them (permutations of \(\{2, 6, 9\}\)). Paul has \(3 \times 3! = 18\) possibilities.</p>`) },
      { t: 'Question 5: at least one 4', html: r`<p>Counting directly “a 4 in first position, or in second…” counts several times the codes with two or three 4s. Count the complement instead.</p>` +
        M(r`<p>We count the complement. There are \(10^3 = 1\,000\) sequences of 3 digits, of which \(9^3 = 729\) have no 4 (9 choices per digit). So \(1\,000 - 729 = 271\) sequences contain at least one 4. With the letter (3 choices): \(3 \times 271 = 813\) possibilities.</p>`) }],
    answer: r`<ul><li>1. \(3 \times 10 \times 9 \times 8 = 2\,160\)</li><li>2. \(3 \times 10^3 = 3\,000\)</li><li>3. \(5 \times 4 \times 3 = 60\)</li><li>4. \(3 \times 3! = 18\)</li><li>5. \(3 \times (10^3 - 9^3) = 813\)</li></ul>`,
    traps: [
      r`Forgetting the letter (factor 3), or counting it when it is known (question 3).`,
      r`Question 5: \(3 \times 3 \times 10^2\) (“the 4 in one of the 3 places, the rest free”) counts codes 44x, 4x4… several times and exceeds the true total.`,
      r`“As integers”: finish the computation here (2160, not \(3 \times A_{10}^3\)).`],
    grading: '6 points for the exercise; the paper does not split them between questions. Each answer must be briefly justified.',
    note: N24 };

  EN['p2024-dp-ex3'] = { src: 'DP exam 2024 · Ex 3', title: r`Teddy’s tokens: \(\binom{n}{p}\binom{p}{k} = \binom{n}{k}\binom{n-k}{p-k}\)`,
    questions: [
      r`<b>1.</b> Teddy is bored and looks for something to do. He cuts a hexagon and a triangle out of paper and glues the triangle inside the hexagon as in the following figure.` + FIG.hexa +
        r`<p>Teddy then finds 9 tokens numbered from 1 to 9 and sets himself the challenge of placing 5 tokens in the hexagon, 2 of them in the triangle.</p><p>To do so, he decides to proceed in two different ways:</p><p>• Choice 1: Teddy chooses 2 tokens to put in the triangle, then he chooses 3 tokens to place outside the triangle (but inside the hexagon!)</p><p>• Choice 2: Teddy chooses 5 tokens to place in the hexagon and, among them, chooses 2 tokens to place in the triangle.</p><p>(a) What is the number \(N_1\) of possible placements if Teddy makes choice 1? Give your result as a product of integers.</p><p>(b) What is the number \(N_2\) of possible placements if Teddy makes choice 2? Give your result as a product of integers.</p><p>(c) What do you notice?</p>`,
      r`<b>2.</b> Generalization: let \(n\), \(p\) and \(k\) be 3 natural numbers such that \(0 \leq k \leq p \leq n\). Inspired by Teddy’s choices, explain, without computation, the following formula: \[\binom{n}{p}\binom{p}{k} = \binom{n}{k}\binom{n-k}{p-k}\]`,
      r`<b>3.</b> Prove the previous formula again, by computation.`,
      r`<b>4.</b> Give the value of: \(S_p = \displaystyle\sum_{k=0}^{p} \binom{n}{k}\binom{n-k}{p-k}\).`],
    hints: [
      r`Choice 1: 2 tokens out of 9 for the triangle, then 3 out of the 7 left. Choice 2: 5 out of 9, then 2 out of these 5. The order of the tokens does not matter.`,
      r`In both choices, a placement is the same thing: a set \(A\) of tokens in the triangle and a set \(B\) of tokens in the hexagon, with \(A \subset B\).`,
      r`Question 4: replace each term using the formula of question 2, take \(\binom{n}{p}\) out of the sum and remember \(\sum_k \binom{p}{k} = 2^p\).`],
    solution: [
      { t: 'Question 1: counting in two ways', html: M(r`<p>(a) Choice 1: we choose the 2 tokens of the triangle among the 9 tokens (\(\binom{9}{2}\) ways), then the 3 tokens outside the triangle among the 7 remaining tokens (\(\binom{7}{3}\) ways). Order does not matter. So \(N_1 = \dbinom{9}{2}\dbinom{7}{3} = 36 \times 35\).</p><p>(b) Choice 2: we choose the 5 tokens of the hexagon among the 9 (\(\binom{9}{5}\) ways), then among them the 2 tokens of the triangle (\(\binom{5}{2}\) ways). So \(N_2 = \dbinom{9}{5}\dbinom{5}{2} = 126 \times 10\).</p><p>(c) We notice that \(N_1 = N_2 = 1\,260\): both choices describe the same placements (2 tokens in the triangle, 3 others in the hexagon outside the triangle), counted in a different order.</p>`) },
      { t: 'Question 2: the formula by double counting', html: M(r`<p>Let \(E\) be a set of \(n\) tokens. We count the ways of placing \(p\) tokens in the hexagon, \(k\) of them in the triangle, that is the pairs \((A, B)\) of subsets of \(E\) with \(A \subset B\), \(\card(A) = k\) and \(\card(B) = p\) (\(A\): tokens in the triangle, \(B\): tokens in the hexagon).</p><p>Like Teddy’s choice 2: we first choose \(B\), \(p\) tokens out of \(n\), then \(A\), \(k\) tokens out of the \(p\) of \(B\): \(\binom{n}{p}\binom{p}{k}\) pairs.</p><p>Like Teddy’s choice 1: we first choose \(A\), \(k\) tokens out of \(n\), then the \(p - k\) tokens of \(B \setminus A\) among the \(n - k\) tokens not in \(A\): \(\binom{n}{k}\binom{n-k}{p-k}\) pairs.</p><p>We have counted the same set in two ways, hence \(\dbinom{n}{p}\dbinom{p}{k} = \dbinom{n}{k}\dbinom{n-k}{p-k}\).</p>`) },
      { t: 'Question 3: by computation', html: M(r`<p>Let \(n, p, k\) be integers such that \(0 \leq k \leq p \leq n\). By definition of the binomial coefficients:</p><div class="fm">\[\binom{n}{p}\binom{p}{k} = \frac{n!}{p!\,(n-p)!} \times \frac{p!}{k!\,(p-k)!} = \frac{n!}{k!\,(p-k)!\,(n-p)!}\]</div><div class="fm">\[\binom{n}{k}\binom{n-k}{p-k} = \frac{n!}{k!\,(n-k)!} \times \frac{(n-k)!}{(p-k)!\,\big((n-k)-(p-k)\big)!} = \frac{n!}{k!\,(p-k)!\,(n-p)!}\]</div><p>since \((n-k)-(p-k) = n-p\). Both sides are equal.</p>`) },
      { t: 'Question 4: the sum', html: M(r`<p>By question 2, for all \(k \in \ent{0}{p}\), \(\binom{n}{k}\binom{n-k}{p-k} = \binom{n}{p}\binom{p}{k}\). Hence</p><div class="fm">\[S_p = \sum_{k=0}^{p} \binom{n}{p}\binom{p}{k} = \binom{n}{p} \sum_{k=0}^{p} \binom{p}{k} = \binom{n}{p}\, 2^p\]</div><p>by the binomial theorem: \(\sum_{k=0}^{p} \binom{p}{k} = (1 + 1)^p = 2^p\).</p>`) +
        r`<p>Interpretation: we choose the \(p\) tokens of the hexagon, then decide for each one whether it goes in the triangle or not (\(2^p\) ways), with any number \(k\) of tokens in the triangle. Checked by program for \(n \leq 15\).</p>` }],
    answer: r`<ul><li>1. \(N_1 = \binom{9}{2}\binom{7}{3} = 36 \times 35\) and \(N_2 = \binom{9}{5}\binom{5}{2} = 126 \times 10\); both are equal to \(1\,260\).</li><li>2. Both sides count the pairs \((A, B)\), \(A \subset B \subset E\), \(\card(A) = k\), \(\card(B) = p\).</li><li>3. Both sides are equal to \(\dfrac{n!}{k!\,(p-k)!\,(n-p)!}\).</li><li>4. \(S_p = 2^p \binom{n}{p}\).</li></ul>`,
    traps: [
      r`Choice 1: choosing the 3 tokens outside the triangle among 9 instead of 7 (the 2 tokens of the triangle are no longer available).`,
      r`“Without computation”: a counting argument is expected, not factorials (they are for question 3).`,
      r`Question 4: \(\binom{n}{p}\) does not depend on \(k\): it comes out of the sum.`],
    grading: '8.5 points for the exercise; the paper does not split them between questions.',
    note: N24 };

  EN['p2024-dp-ex4'] = { src: 'DP exam 2024 · Ex 4', title: 'Learning the lecture and passing the year',
    intro: r`<p>In a class of EPITA students, we consider that only 40% learn their maths lecture. For those who learn the lecture, the probability of passing the year is 80%. For the others, it drops to 20%. Let \(C\) be the event “learning the lecture” and \(V\) the event “passing the year”. Write your results as simplified fractions.</p>`,
    questions: [
      r`<b>1.</b> Translate the statement in terms of probabilities.`,
      r`<b>2.</b> We randomly pick a student. What is the probability that he passes?`,
      r`<b>3.</b> We randomly pick a student who passes the year. What is the probability that he learnt his lecture?`,
      r`<b>4.</b> What minimum proportion \(p\) of students learning their lecture would be needed for 60% of the class to pass?`],
    hints: [
      r`“For those who learn the lecture, … 80%” is a conditional probability: \(\P(V \mid C)\).`,
      r`\(\{C, \overline{C}\}\) is a partition of \(\Omega\): write \(V = (V \cap C) \cup (V \cap \overline{C})\) before the law of total probability.`,
      r`Question 4: replace \(\P(C) = 0.4\) with \(p\) in the computation of \(\P(V)\), then solve \(\P(V) \geq 0.6\).`],
    solution: [
      { t: 'Question 1: translate', html: M(r`<p>The statement gives: \(\P(C) = 0.4 = \dfrac{2}{5}\), \(\P(V \mid C) = 0.8 = \dfrac{4}{5}\) and \(\P(V \mid \overline{C}) = 0.2 = \dfrac{1}{5}\).</p>`) +
        T('tree', { first: [{ n: 'C', p: '2/5' }, { n: '\\overline{C}' }], second: { n: 'V', nb: '\\overline{V}', p: ['4/5', '1/5'] }, edit: false }) },
      { t: 'Question 2: law of total probability', html: M(r`<p>Since \(\{C, \overline{C}\}\) is a partition of \(\Omega\), \(V = (V \cap C) \cup (V \cap \overline{C})\) (disjoint union). Therefore</p><div class="fm">\[\P(V) = \P(V \cap C) + \P(V \cap \overline{C}) = \P(V \mid C)\P(C) + \P(V \mid \overline{C})\P(\overline{C}) = \frac{4}{5} \times \frac{2}{5} + \frac{1}{5} \times \frac{3}{5} = \frac{8}{25} + \frac{3}{25} = \frac{11}{25}.\]</div>`) },
      { t: 'Question 3: Bayes', html: M(r`<p>We look for \(\P(C \mid V)\). We have</p><div class="fm">\[\P(C \mid V) = \frac{\P(V \cap C)}{\P(V)} = \frac{\P(V \mid C)\P(C)}{\P(V)} = \frac{8/25}{11/25} = \frac{8}{11}.\]</div>`) },
      { t: 'Question 4: minimum proportion', html: M(r`<p>Let \(p = \P(C) \in [0, 1]\). Reasoning as in question 2:</p><div class="fm">\[\P(V) = 0.8\,p + 0.2\,(1 - p) = 0.6\,p + 0.2.\]</div><p>We want \(0.6\,p + 0.2 \geq 0.6\), that is \(0.6\,p \geq 0.4\), i.e. \(p \geq \dfrac{2}{3}\). At least two thirds of the students (about 66.7%) would have to learn their lecture.</p>`) }],
    answer: r`<ul><li>1. \(\P(C) = \frac{2}{5}\), \(\P(V \mid C) = \frac{4}{5}\), \(\P(V \mid \overline{C}) = \frac{1}{5}\)</li><li>2. \(\P(V) = \frac{11}{25}\)</li><li>3. \(\P(C \mid V) = \frac{8}{11}\)</li><li>4. \(p \geq \frac{2}{3}\): minimum proportion \(\frac{2}{3}\)</li></ul>`,
    traps: [
      r`Writing \(\P(V \cap C) = 0.8\): 80% is the proportion among those who learn, it is \(\P(V \mid C)\).`,
      r`Question 3: dividing by \(\P(C)\) instead of \(\P(V)\) (we know the student passes).`,
      r`Question 4: forgetting that the proportion of the others becomes \(1 - p\).`],
    grading: '6.5 points for the exercise; the paper does not split them between questions. Results as simplified fractions.',
    note: N24 + ' Same exercise, with other numbers, as in the 2023 DP exam (exercise 4).' };

  EN['p2024-dp-ex5'] = { src: 'DP exam 2024 · Ex 5', title: r`Lecture: prove \(\E(aX + b) = a\E(X) + b\) and \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\)`,
    intro: r`<p>Let \(X\) be a finite random variable such that \(X(\Omega) = \{x_1, x_2, \cdots, x_n\}\) and \((a, b) \in \R^2\).</p>`,
    questions: [
      r`<b>1.</b> Write the formulas giving the expectation and the variance of \(X\), denoted \(\E(X)\) and \(\mathrm{Var}(X)\) respectively.`,
      r`<b>2.</b> Express \(\E(aX + b)\) in terms of \(a\), \(b\) and \(\E(X)\). Prove this formula.`,
      r`<b>3.</b> Express \(\mathrm{Var}(aX + b)\) in terms of \(a\), \(b\) and \(\mathrm{Var}(X)\). Prove this formula.`],
    hints: [
      r`These are two proofs from the document “Theorems and proofs”: learn them by heart.`,
      r`For \(\E(aX + b)\): \(aX + b = f(X)\) with \(f(x) = ax + b\); use \(\E(f(X)) = \sum_i f(x_i)\P(X = x_i)\), then split the sum in two.`,
      r`For the variance: write the definition, then notice that \((aX + b) - \E(aX + b) = a(X - \E(X))\).`],
    solution: [
      { t: 'Question 1: the definitions', html: M(r`<div class="fm">\[\E(X) = \sum_{i=1}^{n} x_i\,\P(X = x_i) \qquad \mathrm{Var}(X) = \E\big((X - \E(X))^2\big) = \sum_{i=1}^{n} (x_i - \E(X))^2\,\P(X = x_i)\]</div>`) },
      { t: 'Question 2: expectation of aX + b', html: r`<p>Formula: \(\E(aX + b) = a\E(X) + b\). The proof is the one of the lecture.</p>` +
        M(r`<p>Let \(Y = aX + b\). It is a variable of the form \(Y = f(X)\), where \(f\) is the function \(x \mapsto ax + b\). By the transfer theorem,</p><div class="fm">\[\E(Y) = \sum_{i=1}^{n} \P(X = x_i)\,f(x_i) = \sum_{i=1}^{n} \P(X = x_i)\,(a x_i + b).\]</div><p>Now for all \(i \in \ent{1}{n}\), \(\P(X = x_i)(a x_i + b) = a\,\P(X = x_i)\,x_i + b\,\P(X = x_i)\). Thus, splitting the sum in two and factoring \(a\) out of the first one and \(b\) out of the second one:</p><div class="fm">\[\E(Y) = a \sum_{i=1}^{n} x_i\,\P(X = x_i) + b \sum_{i=1}^{n} \P(X = x_i).\]</div><p>The first sum is \(\E(X)\); the second one is 1 (sum of the probabilities of the distribution of \(X\)). Finally, \(\E(aX + b) = a\E(X) + b\).</p>`) },
      { t: 'Question 3: variance of aX + b', html: r`<p>Formula: \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\): it does not depend on \(b\).</p>` +
        M(r`<p>By definition, \(\mathrm{Var}(aX + b) = \E\Big(\big((aX + b) - \E(aX + b)\big)^2\Big)\). By question 2, \(\E(aX + b) = a\E(X) + b\), so</p><div class="fm">\[(aX + b) - \E(aX + b) = aX + b - a\E(X) - b = a\big(X - \E(X)\big).\]</div><p>Hence \(\mathrm{Var}(aX + b) = \E\big(a^2 (X - \E(X))^2\big) = a^2\,\E\big((X - \E(X))^2\big)\), using question 2 again (with the coefficient \(a^2\) and \(b = 0\)). The expectation we get is the variance of \(X\): \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\).</p>`) }],
    answer: r`<ul><li>1. \(\E(X) = \sum_{i=1}^{n} x_i \P(X = x_i)\); \(\mathrm{Var}(X) = \sum_{i=1}^{n} (x_i - \E(X))^2 \P(X = x_i)\).</li><li>2. \(\E(aX + b) = a\E(X) + b\), by the transfer theorem and linearity of the sum.</li><li>3. \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\), which does not depend on \(b\).</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(aX + b) \neq a\,\mathrm{Var}(X) + b\): the shift \(b\) does not change the spread and \(a\) is squared.`,
      r`Forgetting to say why \(\sum_i \P(X = x_i) = 1\).`,
      r`Quoting “Koenig-Huygens” without proving it when the statement says “Prove”.`],
    grading: '6 points for the exercise; the paper does not split them between questions. Both proofs are those of the document “Theorems and proofs”.',
    note: N24 + ' The proofs follow the official document “Theorems and proofs” of lecture 2.' };

  EN['p2024-dp-ex6'] = { src: 'DP exam 2024 · Ex 6', title: 'Box with balls 0, 1, 1, 2: distribution, Bernoulli, binomial over 20 draws',
    intro: r`<p>A box contains four balls, impossible to tell apart by touch, numbered 0, 1, 1 and 2.</p><p>We randomly pick 20 balls from the box, one after the other with replacement. The draws are independent.</p><p>N.B.: give all your results as simplified fractions.</p>`,
    questions: [
      r`<b>1.</b> Let \(k \in \ent{1}{20}\) be given. Let \(X_k\) be the random variable equal to the number of the ball obtained at the \(k\)-th draw.<p>(a) Give the distribution of each \(X_k\).</p><p>(b) Compute the expectation of \(X_k\) (write the details of your computations).</p><p>(c) Compute the variance of \(X_k\) (write the details of your computations).</p>`,
      r`<b>2.</b> At each draw, we win one euro if the ball drawn has the number 0 or 1, otherwise we win nothing. Let \(Y_k\) be the random variable equal to the gain at the \(k\)-th draw (\(k \in \ent{1}{n}\) given).<p>(a) Give the distribution of \(Y_k\). Justify.</p><p>(b) Give its expectation and its variance.</p>`,
      r`<b>3.</b> Let \(Z\) be the random variable equal to the gain over the 20 draws.<p>(a) Write \(Z\) in terms of the \(Y_k\), explaining briefly.</p><p>(b) Deduce \(\P(Z = i)\) for all \(i \in Z(\Omega)\). Justify.</p><p>(c) Check that \(\displaystyle\sum_{i=0}^{20} \P(Z = i) = 1\).</p><p>(d) Compute \(\E(Z)\) and \(\mathrm{Var}(Z)\), with justification.</p>`],
    hints: [
      r`Two balls out of four have the number 1: \(\P(X_k = 1) = \frac{2}{4}\). The distribution is \(X_k(\Omega)\) and all the probabilities.`,
      r`\(Y_k\) only takes the values 0 and 1: it is a Bernoulli variable. Its parameter is \(\P(X_k \in \{0, 1\})\).`,
      r`\(Z = Y_1 + \cdots + Y_{20}\), sum of 20 independent Bernoulli variables with the same parameter: binomial distribution.`],
    solution: [
      { t: 'Question 1: distribution, expectation, variance of X_k', html: M(r`<p>(a) The 4 balls are equally likely. \(X_k(\Omega) = \{0, 1, 2\}\) and \(\P(X_k = 0) = \dfrac{1}{4}\), \(\P(X_k = 1) = \dfrac{2}{4} = \dfrac{1}{2}\), \(\P(X_k = 2) = \dfrac{1}{4}\) (sum: 1).</p><p>(b) \(\E(X_k) = 0 \times \P(X_k = 0) + 1 \times \P(X_k = 1) + 2 \times \P(X_k = 2) = 0 + \dfrac{1}{2} + \dfrac{2}{4} = 1\).</p><p>(c) \(\E(X_k^2) = 0^2 \times \dfrac{1}{4} + 1^2 \times \dfrac{1}{2} + 2^2 \times \dfrac{1}{4} = \dfrac{1}{2} + 1 = \dfrac{3}{2}\). By the Koenig-Huygens formula, \(\mathrm{Var}(X_k) = \E(X_k^2) - (\E(X_k))^2 = \dfrac{3}{2} - 1 = \dfrac{1}{2}\).</p>`) +
        T('law', { x: [0, 1, 2], p: ['1/4', '1/2', '1/4'], name: 'X_k' }) },
      { t: 'Question 2: the variable Y_k', html: M(r`<p>(a) \(Y_k\) is 1 if the ball has the number 0 or 1, and 0 otherwise: \(Y_k(\Omega) = \{0, 1\}\) and</p><div class="fm">\[\P(Y_k = 1) = \P(X_k = 0) + \P(X_k = 1) = \frac{1}{4} + \frac{1}{2} = \frac{3}{4}, \qquad \P(Y_k = 0) = \P(X_k = 2) = \frac{1}{4}.\]</div><p>\(Y_k\) is hence Bernoulli-distributed with the parameter \(\dfrac{3}{4}\).</p><p>(b) \(\E(Y_k) = 0 \times \dfrac{1}{4} + 1 \times \dfrac{3}{4} = \dfrac{3}{4}\); \(\E(Y_k^2) = \dfrac{3}{4}\), so \(\mathrm{Var}(Y_k) = \dfrac{3}{4} - \dfrac{9}{16} = \dfrac{3}{16}\) (that is \(p(1 - p)\)).</p>`) },
      { t: 'Question 3: the total gain Z', html: M(r`<p>(a) The total gain is the sum of the gains of each draw: \(Z = Y_1 + Y_2 + \cdots + Y_{20}\). Since the draws are independent, the \(Y_k\) are independent.</p><p>(b) \(Z\) is the sum of 20 independent Bernoulli variables with the same parameter \(\frac{3}{4}\): \(Z\) is binomial-distributed with parameters \(20\) and \(\frac{3}{4}\). So \(Z(\Omega) = \ent{0}{20}\) and</p><div class="fm">\[\forall i \in \ent{0}{20}, \quad \P(Z = i) = \binom{20}{i} \left(\frac{3}{4}\right)^i \left(\frac{1}{4}\right)^{20-i}.\]</div><p>(c) By the binomial theorem:</p><div class="fm">\[\sum_{i=0}^{20} \P(Z = i) = \sum_{i=0}^{20} \binom{20}{i} \left(\frac{3}{4}\right)^i \left(\frac{1}{4}\right)^{20-i} = \left(\frac{3}{4} + \frac{1}{4}\right)^{20} = 1^{20} = 1.\]</div><p>(d) By linearity, \(\E(Z) = \E(Y_1) + \cdots + \E(Y_{20}) = 20 \times \dfrac{3}{4} = 15\). Since \(Y_1, \ldots, Y_{20}\) are independent, \(\mathrm{Var}(Z) = \mathrm{Var}(Y_1) + \cdots + \mathrm{Var}(Y_{20}) = 20 \times \dfrac{3}{16} = \dfrac{15}{4}\).</p>`) +
        T('law', { law: 'binom', n: 20, p: '3/4', name: 'Z', edit: false }) }],
    answer: r`<ul><li>1. \(X_k(\Omega) = \{0, 1, 2\}\), probabilities \(\frac{1}{4}, \frac{1}{2}, \frac{1}{4}\); \(\E(X_k) = 1\); \(\mathrm{Var}(X_k) = \frac{1}{2}\).</li><li>2. \(Y_k\) is Bernoulli-distributed with the parameter \(\frac{3}{4}\); \(\E(Y_k) = \frac{3}{4}\), \(\mathrm{Var}(Y_k) = \frac{3}{16}\).</li><li>3. \(Z = Y_1 + \cdots + Y_{20}\) is binomial-distributed, \(\mathcal{B}\left(20, \frac{3}{4}\right)\); \(\E(Z) = 15\), \(\mathrm{Var}(Z) = \frac{15}{4}\).</li></ul>`,
    traps: [
      r`\(\E(X_k^2) = \sum x_i^2\,\P(X_k = x_i)\), not \((\E(X_k))^2\).`,
      r`Justify the binomial distribution: “sum of <b>independent</b> Bernoulli variables with the same parameter”. Without independence, neither the distribution nor the additivity of variances holds.`,
      r`\(\P(Z = i)\) is a single term \(\binom{20}{i} p^i (1-p)^{20-i}\), not a sum.`,
      r`Typo in the paper: “\(k \in \ent{1}{n}\)” in question 2, read \(\ent{1}{20}\).`],
    grading: '9 points for the exercise; the paper does not split them between questions. Detailed computations required in 1(b) and 1(c).',
    note: N24 + ' Same structure as exercise 6 of the 2023 DP exam.' };

  /* =====================================================================
     OBM exam, October 2024 — no answer key
     ===================================================================== */
  EN['p2024-obm-ex1'] = { src: 'OBM exam 2024 · Ex 1', title: 'Logic: conditions, quantifiers, contrapositive, double inclusion',
    intro: r`<p>The questions are independent.</p>`,
    questions: [
      r`<b>1.</b> Let \(x \in \R\). Consider the condition \(P\): “\(x^2 > 4\)”. Here is a list of 5 statements: (1) “\(x > -2\)”, (2) “\(x < -10\)”, (3) “\(x > 1.9\)”, (4) “\(x < -3\) or \(x > 3\)” and (5) “\(x < -2\) or \(x > 2\)”.<p>(a) List the implications of the form “……… \(\Rightarrow P\)” that are true.</p><p>(b) List the implications of the form “\(P \Rightarrow\) ………” that are true.</p><p>(c) For each true implication of 1.(b), write its negation.</p>`,
      r`<b>2.</b> Consider the properties: \(P\): “\(\forall x \in \R,\ \exists y \in \R,\ \cos(x) = y\)”, \(Q\): “\(\exists y \in \R,\ \forall x \in \R,\ x = \cos(y)\)” and \(R\): “\(\exists x \in \R,\ \exists y \in \R,\ \cos(x) < \cos(y)\)”.<p>(a) Are \(P\), \(Q\) and \(R\) true? Justify in every case.</p><p>(b) Write the negation of \(P\), of \(Q\) and of \(R\).</p>`,
      r`<b>3.</b> Proof by contrapositive: let \(A\) and \(B\) be two properties.<p>(a) Write the contrapositive of \(A \Rightarrow B\).</p><p>(b) Show that \(A \Rightarrow B\) and its contrapositive are equivalent.</p><p>(c) Application: let \(a \in \R\). Show by contrapositive that: \((\forall \varepsilon > 0,\ |a| \leq \varepsilon) \Rightarrow a = 0\). Take care of your wording and write the contrapositive clearly in this case.</p><p>(d) Is the converse true? Justify.</p>`,
      r`<b>4.</b> Let \(A = \{(x, y, z) \in \R^3,\ x = y = z\}\) and \(B = \{(x, y, z) \in \R^3,\ 2x - y - z = 0\}\).<p>(a) Of which set are \(A\) and \(B\) subsets?</p><p>(b) Show carefully that \(A \subset B\).</p><p>(c) Do we have \(B \subset A\)? Justify.</p>`],
    hints: [
      r`Question 1: write the set of the \(x\) satisfying each condition. \(x^2 > 4 \Leftrightarrow x < -2\) or \(x > 2\). “\(Q \Rightarrow P\)” is true when the set of \(Q\) is included in the set of \(P\).`,
      r`Question 2: a true \(\forall\) is proved for any \(x\); a true \(\exists\) is proved with a witness; a false property is disproved with a counterexample (or by proving its negation).`,
      r`Question 3(c): the contrapositive of “\((\forall \varepsilon > 0,\ |a| \leq \varepsilon) \Rightarrow a = 0\)” is “\(a \neq 0 \Rightarrow \exists \varepsilon > 0,\ |a| > \varepsilon\)”. Try \(\varepsilon = \frac{|a|}{2}\).`],
    solution: [
      { t: 'Question 1: necessary conditions, sufficient conditions', html: r`<p>Write the set of reals satisfying each condition: \(P\): \(]-\infty, -2[ \cup ]2, +\infty[\); (1) \(]-2, +\infty[\); (2) \(]-\infty, -10[\); (3) \(]1.9, +\infty[\); (4) \(]-\infty, -3[ \cup ]3, +\infty[\); (5) \(]-\infty, -2[ \cup ]2, +\infty[\). The implication “\(Q \Rightarrow P\)” is true if the set of \(Q\) is included in the set of \(P\).</p>` +
        M(r`<p>For every real \(x\), \(x^2 > 4 \Leftrightarrow |x| > 2 \Leftrightarrow (x < -2 \text{ or } x > 2)\): \(P\) is equivalent to (5).</p><p>(a) The true implications are (2) \(\Rightarrow P\), (4) \(\Rightarrow P\) and (5) \(\Rightarrow P\). For instance, if \(x < -3\) or \(x > 3\), then \(|x| > 3\), so \(x^2 > 9 > 4\). On the other hand (1) \(\Rightarrow P\) is false (\(x = 0\): \(0 > -2\) but \(0^2 = 0 \leq 4\)), and so is (3) \(\Rightarrow P\) (\(x = 2\): \(2 > 1.9\) but \(2^2 = 4\)).</p><p>(b) The only true implication is \(P \Rightarrow\) (5). Counterexamples for the others: \(x = -3\) for (1) and (3), \(x = 3\) for (2), \(x = 2.5\) for (4) (\(2.5^2 = 6.25 > 4\) but \(-3 \leq 2.5 \leq 3\)).</p><p>(c) The negation of “\(P \Rightarrow\) (5)” is “\(P\) and not (5)”, that is: “\(x^2 > 4\) and \(-2 \leq x \leq 2\)”.</p>`) +
        r`<p>The negation of an implication is not an implication: \(\neg(P \Rightarrow Q) \equiv P \land \neg Q\). Here it is false for every \(x\), which is expected since the implication is true. If you read the implication for every real \(x\), its negation is “\(\exists x \in \R,\ x^2 > 4\) and \(-2 \leq x \leq 2\)”.</p>` },
      { t: 'Question 2: true or false, negations', html: M(r`<p>(a) \(P\) is true: let \(x \in \R\); the real number \(y = \cos(x)\) works.</p><p>\(Q\) is false: let \(y \in \R\); for \(x = \cos(y) + 1\), we have \(x \neq \cos(y)\). So no \(y\) works for all \(x\) (we have proved \(\neg Q\)).</p><p>\(R\) is true: for \(x = \pi\) and \(y = 0\), \(\cos(\pi) = -1 < 1 = \cos(0)\).</p><p>(b) \(\neg P\): “\(\exists x \in \R,\ \forall y \in \R,\ \cos(x) \neq y\)”.</p><p>\(\neg Q\): “\(\forall y \in \R,\ \exists x \in \R,\ x \neq \cos(y)\)”.</p><p>\(\neg R\): “\(\forall x \in \R,\ \forall y \in \R,\ \cos(x) \geq \cos(y)\)”.</p>`) +
        T('negate', { src: '\\exists y \\in \\R, \\forall x \\in \\R, x = \\cos(y)', edit: false }) },
      { t: 'Question 3: contrapositive', html: M(r`<p>(a) The contrapositive of \(A \Rightarrow B\) is \(\neg B \Rightarrow \neg A\).</p><p>(b) Compare the truth tables: the two columns are identical (only the row \(A\) true, \(B\) false gives “false”). Another proof: \((A \Rightarrow B) \Leftrightarrow (\neg A \lor B) \Leftrightarrow (B \lor \neg A) \Leftrightarrow (\neg(\neg B) \lor \neg A) \Leftrightarrow (\neg B \Rightarrow \neg A)\).</p>`) +
        T('truth', { f: ['A => B', '!B => !A'], edit: false }) +
        M(r`<p>(c) Let \(a \in \R\). The contrapositive of the implication to prove is: “\(a \neq 0 \Rightarrow \exists \varepsilon > 0,\ |a| > \varepsilon\)”. Let us prove it.</p><p>Assume \(a \neq 0\). Let \(\varepsilon = \dfrac{|a|}{2}\). Since \(a \neq 0\), \(|a| > 0\), so \(\varepsilon > 0\). Moreover \(|a| = 2\varepsilon > \varepsilon\) since \(\varepsilon > 0\). We have found \(\varepsilon > 0\) such that \(|a| > \varepsilon\).</p><p>The contrapositive is true, hence so is the implication: \((\forall \varepsilon > 0,\ |a| \leq \varepsilon) \Rightarrow a = 0\).</p><p>(d) The converse, “\(a = 0 \Rightarrow (\forall \varepsilon > 0,\ |a| \leq \varepsilon)\)”, is true: if \(a = 0\), then for every \(\varepsilon > 0\), \(|a| = 0 \leq \varepsilon\).</p>`, '3(c) and 3(d)') },
      { t: 'Question 4: inclusions', html: M(r`<p>(a) \(A\) and \(B\) are subsets of \(\R^3\).</p><p>(b) Let \((x, y, z) \in A\) be given. Then \(x = y = z\), so \(2x - y - z = 2x - x - x = 0\), hence \((x, y, z) \in B\). Thus \(A \subset B\).</p><p>(c) No. The triple \((1, 2, 0)\) satisfies \(2 \times 1 - 2 - 0 = 0\), so \((1, 2, 0) \in B\); but \(1 \neq 2\), so \((1, 2, 0) \notin A\). Thus \(B \not\subset A\).</p>`) }],
    answer: r`<ul><li>1(a) (2), (4) and (5) \(\Rightarrow P\); 1(b) \(P \Rightarrow\) (5) only; 1(c) “\(x^2 > 4\) and \(-2 \leq x \leq 2\)”.</li><li>2(a) \(P\) true, \(Q\) false, \(R\) true; 2(b) \(\exists x\, \forall y,\ \cos(x) \neq y\); \(\forall y\, \exists x,\ x \neq \cos(y)\); \(\forall x\, \forall y,\ \cos(x) \geq \cos(y)\).</li><li>3(a) \(\neg B \Rightarrow \neg A\); 3(c) contrapositive: \(a \neq 0 \Rightarrow \exists \varepsilon > 0,\ |a| > \varepsilon\), with \(\varepsilon = \frac{|a|}{2}\); 3(d) yes.</li><li>4(a) \(\R^3\); 4(b) let \((x, y, z) \in A\)…; 4(c) no: \((1, 2, 0) \in B \setminus A\).</li></ul>`,
    traps: [
      r`The direction of the arrow: “… \(\Rightarrow P\)” asks for sufficient conditions (sets included in the set of \(P\)), “\(P \Rightarrow\) …” for necessary conditions.`,
      r`(3) “\(x > 1.9\)” is not sufficient: \(x = 2\) gives \(x^2 = 4\), not \(> 4\).`,
      r`Negate while keeping the sets: \(\neg(\forall \varepsilon > 0, \ldots)\) gives \(\exists \varepsilon > 0\), not \(\exists \varepsilon \leq 0\); \(<\) becomes \(\geq\).`,
      r`The negation of an implication is a conjunction (“and”), never an implication.`,
      r`For \(B \not\subset A\), one numerical counterexample is enough; for \(A \subset B\), start with “Let \((x, y, z) \in A\)”.`],
    grading: '10 points for the exercise; the paper does not split them between questions. The wording of 3(c) is graded (“Take care of your wording”).',
    note: 'The archive has no answer key for this paper: solution written in the style of the official answer keys, every truth set recomputed by program.' };

  EN['p2024-obm-ex2'] = { src: 'OBM exam 2024 · Ex 2', title: r`The function \((x, y) \mapsto x + y\) on a Cartesian product`,
    questions: [
      r`<b>1.</b> Let \(A\) and \(B\) be two sets, \(f : A \to B\), \(I \subset A\) and \(J \subset B\). Write the mathematical definition of \(f(I)\) and \(f^{-1}(J)\).`,
      r`<b>2.</b> Let \(E = \{2, 3, 4\}\) and \(F = \{1, 2, 3\}\). Define the function \(f : E \times F \to \N,\ (x, y) \mapsto x + y\).<p>(a) Fill in the table of values of \(f\) (one row \((x, y)\), one row \(f((x, y))\)).</p><p>(b) Find \(f(E \times F)\), \(f(\{(2, 2), (4, 3)\})\), \(f^{-1}(\{1\})\) and \(f^{-1}(\{6\})\).</p><p>(c) Write the mathematical definition of: “\(f\) is injective from \(E \times F\) to \(\N\)”. Is \(f\) injective? Justify.</p><p>(d) Write the mathematical definition of: “\(f\) is surjective from \(E \times F\) to \(\N\)”. Is \(f\) surjective? Justify.</p><p>(e) Find \(I \subset E \times F\) and \(J \subset \N\) such that \(f : I \to J\) is injective and not surjective. (The sets \(I\) and \(J\) must have at least two elements.)</p><p>(f) Find \(I' \subset E \times F\) and \(J' \subset \N\) such that \(f : I' \to J'\) is surjective and not injective. (The sets \(I'\) and \(J'\) must have at least two elements.)</p>`],
    hints: [
      r`\(E \times F\) has \(3 \times 3 = 9\) elements: the pairs \((x, y)\) with \(x \in E\) and \(y \in F\). Compute the 9 sums.`,
      r`Not injective: two distinct pairs with the same image. Not surjective: a natural number with no pre-image.`,
      r`For (e) and (f), you also need \(f(I) \subset J\): every element of \(I\) must have its image in \(J\).`],
    solution: [
      { t: 'Question 1: definitions', html: M(r`<div class="fm">\[f(I) = \{f(x),\ x \in I\} = \{y \in B,\ \exists x \in I,\ y = f(x)\} \qquad f^{-1}(J) = \{x \in A,\ f(x) \in J\}\]</div>`) },
      { t: 'Question 2(a)-(b): table, images', html: '<div class="tbl"><table><thead><tr><th scope="row">\\((x, y)\\)</th><td>(2, 1)</td><td>(2, 2)</td><td>(2, 3)</td><td>(3, 1)</td><td>(3, 2)</td><td>(3, 3)</td><td>(4, 1)</td><td>(4, 2)</td><td>(4, 3)</td></tr></thead><tbody><tr><th scope="row">\\(f((x, y))\\)</th><td>3</td><td>4</td><td>5</td><td>4</td><td>5</td><td>6</td><td>5</td><td>6</td><td>7</td></tr></tbody></table></div>' +
        M(r`<p>From the table: \(f(E \times F) = \{3, 4, 5, 6, 7\}\); \(f(\{(2, 2), (4, 3)\}) = \{4, 7\}\); \(f^{-1}(\{1\}) = \varnothing\) (no sum equals 1); \(f^{-1}(\{6\}) = \{(3, 3), (4, 2)\}\).</p>`) },
      { t: 'Question 2(c)-(d): injective, surjective', html: M(r`<p>(c) \(f\) is injective from \(E \times F\) to \(\N\) if: \(\forall \big((x, y), (x', y')\big) \in (E \times F)^2,\ f((x, y)) = f((x', y')) \Rightarrow (x, y) = (x', y')\).</p><p>\(f\) is not injective: \(f((2, 2)) = f((3, 1)) = 4\) and \((2, 2) \neq (3, 1)\).</p><p>(d) \(f\) is surjective from \(E \times F\) to \(\N\) if: \(\forall n \in \N,\ \exists (x, y) \in E \times F,\ n = f((x, y))\).</p><p>\(f\) is not surjective: \(0 \in \N\) has no pre-image, since all the images are in \(\{3, \ldots, 7\}\).</p>`) },
      { t: 'Question 2(e)-(f): restricting', html: M(r`<p>(e) Take \(I = \{(2, 1), (2, 2)\}\) and \(J = \{3, 4, 5\}\). We have \(f((2, 1)) = 3\) and \(f((2, 2)) = 4\): two distinct elements of \(I\) have distinct images, and these images are in \(J\), so \(f : I \to J\) is injective. It is not surjective: \(5\) has no pre-image in \(I\).</p><p>(f) Take \(I' = \{(2, 1), (2, 2), (3, 1)\}\) and \(J' = \{3, 4\}\). We have \(f(I') = \{3, 4\} = J'\): \(f : I' \to J'\) is surjective. It is not injective: \(f((2, 2)) = f((3, 1)) = 4\) with \((2, 2) \neq (3, 1)\).</p>`) +
        r`<p>Other choices work: the images of \(I\) must be distinct and \(J\) must contain one more value; \(I'\) must contain two pairs with the same sum, and \(J' = f(I')\).</p>` }],
    answer: r`<ul><li>1. \(f(I) = \{f(x),\ x \in I\}\), \(f^{-1}(J) = \{x \in A,\ f(x) \in J\}\).</li><li>2(b) \(f(E \times F) = \{3, 4, 5, 6, 7\}\); \(f(\{(2, 2), (4, 3)\}) = \{4, 7\}\); \(f^{-1}(\{1\}) = \varnothing\); \(f^{-1}(\{6\}) = \{(3, 3), (4, 2)\}\).</li><li>2(c) not injective: \(f((2, 2)) = f((3, 1))\); 2(d) not surjective: 0 has no pre-image.</li><li>2(e) \(I = \{(2, 1), (2, 2)\}\), \(J = \{3, 4, 5\}\); 2(f) \(I' = \{(2, 1), (2, 2), (3, 1)\}\), \(J' = \{3, 4\}\).</li></ul>`,
    traps: [
      r`\(f^{-1}(\{6\})\) is a set of <b>pairs</b>: \(\{(3, 3), (4, 2)\}\), not \(\{3, 4\}\).`,
      r`An empty pre-image is written \(\varnothing\), not “does not exist”.`,
      r`(e) and (f): check that \(f(I) \subset J\), otherwise \(f : I \to J\) is not even a function.`],
    grading: '7 points for the exercise; the paper does not split them between questions.',
    note: 'The archive has no answer key for this paper: table, images and restrictions recomputed by program.' };

  EN['p2024-obm-ex3'] = { src: 'OBM exam 2024 · Ex 3', title: 'Table of direct images and pre-images under exp and cos',
    intro: r`<p>Fill in the following table.</p><p>N.B.: we advise you to draw the graphs of the functions on your draft paper! Of course, exp is the function \(x \mapsto e^x\) and cos is \(x \mapsto \cos(x)\).</p><div class="tbl"><table><thead><tr><th scope="col">\(f\)</th><th scope="col">\(\exp : \R \to \R\)</th><th scope="col">\(\cos : [0, \pi] \to \R\)</th></tr></thead><tbody><tr><th scope="row">\(f(\{0\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f\left(\left[0, \frac{\pi}{2}\right]\right)\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{0\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{-1\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(]-\infty, 0])\)</th><td></td><td></td></tr></tbody></table></div>`,
    hints: [
      r`exp is strictly increasing on \(\R\) and only takes strictly positive values.`,
      r`On \([0, \pi]\), cos is strictly decreasing from 1 to −1. A pre-image is looked for <b>in the input set</b> \([0, \pi]\).`],
    solution: [
      { t: 'Column exp', html: M(r`<p>exp is continuous and strictly increasing on \(\R\), with values in \(]0, +\infty[\).</p><p>\(\exp(\{0\}) = \{e^0\} = \{1\}\); \(\exp\left(\left[0, \frac{\pi}{2}\right]\right) = \left[1, e^{\pi/2}\right]\) (increasing: the bounds are reached at 0 and \(\frac{\pi}{2}\)); \(\exp^{-1}(\{0\}) = \varnothing\), \(\exp^{-1}(\{-1\}) = \varnothing\) and \(\exp^{-1}(]-\infty, 0]) = \varnothing\), since \(\forall x \in \R,\ e^x > 0\).</p>`) },
      { t: 'Column cos', html: M(r`<p>On \([0, \pi]\), cos is continuous and strictly decreasing, from \(\cos(0) = 1\) to \(\cos(\pi) = -1\).</p><p>\(\cos(\{0\}) = \{1\}\); \(\cos\left(\left[0, \frac{\pi}{2}\right]\right) = [0, 1]\); \(\cos^{-1}(\{0\}) = \left\{\frac{\pi}{2}\right\}\) (only solution of \(\cos(x) = 0\) in \([0, \pi]\)); \(\cos^{-1}(\{-1\}) = \{\pi\}\); \(\cos^{-1}(]-\infty, 0]) = \left[\frac{\pi}{2}, \pi\right]\).</p>`) }],
    answer: '<div class="tbl"><table><thead><tr><th scope="col">\\(f\\)</th><th scope="col">\\(\\exp : \\R \\to \\R\\)</th><th scope="col">\\(\\cos : [0, \\pi] \\to \\R\\)</th></tr></thead><tbody><tr><th scope="row">\\(f(\\{0\\})\\)</th><td>\\(\\{1\\}\\)</td><td>\\(\\{1\\}\\)</td></tr><tr><th scope="row">\\(f([0, \\frac{\\pi}{2}])\\)</th><td>\\([1, e^{\\pi/2}]\\)</td><td>\\([0, 1]\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{0\\})\\)</th><td>\\(\\varnothing\\)</td><td>\\(\\{\\frac{\\pi}{2}\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{-1\\})\\)</th><td>\\(\\varnothing\\)</td><td>\\(\\{\\pi\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(]-\\infty, 0])\\)</th><td>\\(\\varnothing\\)</td><td>\\([\\frac{\\pi}{2}, \\pi]\\)</td></tr></tbody></table></div>',
    traps: [
      r`\(\cos^{-1}(\{0\})\) is not \(\left\{\frac{\pi}{2} + k\pi,\ k \in \Z\right\}\): the function is defined on \([0, \pi]\) only.`,
      r`Do not confuse \(f^{-1}(\{0\})\) (a set, possibly empty) with an inverse function.`,
      r`\(\exp^{-1}(\{0\}) = \varnothing\): the exponential never vanishes.`],
    grading: '3 points for the 10 cells; the paper gives no detailed marking. Only the results are asked for.',
    note: 'The archive has no answer key for this paper: every cell recomputed by program (fine grid and exact computation).' };

  EN['p2024-obm-ex4'] = { src: 'OBM exam 2024 · Ex 4', title: r`The relation \(|a| \leq |b|\) on \(\R\)`,
    intro: r`<p>On \(\R\), define the relation \(\mathcal{R}\) by: \(\forall (a, b) \in \R^2,\ a \mathrel{\mathcal{R}} b \Leftrightarrow |a| \leq |b|\).</p>`,
    questions: [
      r`<b>1.</b> After recalling the definition, say whether \(\mathcal{R}\) is reflexive. Justify.`,
      r`<b>2.</b> After recalling the definition, say whether \(\mathcal{R}\) is symmetric. Justify.`,
      r`<b>3.</b> After recalling the definition, say whether \(\mathcal{R}\) is antisymmetric. Justify.`,
      r`<b>4.</b> After recalling the definition, say whether \(\mathcal{R}\) is transitive. Justify.`],
    hints: [
      r`Write each definition with its quantifiers, then replace \(a \mathrel{\mathcal{R}} b\) with \(|a| \leq |b|\).`,
      r`For antisymmetry, think of two opposite reals: they have the same absolute value.`],
    solution: [
      { t: 'The four properties', html: M(r`<p>1. \(\mathcal{R}\) is reflexive if \(\forall a \in \R,\ a \mathrel{\mathcal{R}} a\). Let \(a \in \R\): \(|a| \leq |a|\), so \(a \mathrel{\mathcal{R}} a\). \(\mathcal{R}\) is reflexive.</p><p>2. \(\mathcal{R}\) is symmetric if \(\forall (a, b) \in \R^2,\ a \mathrel{\mathcal{R}} b \Rightarrow b \mathrel{\mathcal{R}} a\). Here \(1 \mathrel{\mathcal{R}} 2\) since \(|1| \leq |2|\), but \(|2| > |1|\), so 2 is not related to 1. \(\mathcal{R}\) is not symmetric.</p><p>3. \(\mathcal{R}\) is antisymmetric if \(\forall (a, b) \in \R^2,\ (a \mathrel{\mathcal{R}} b \text{ and } b \mathrel{\mathcal{R}} a) \Rightarrow a = b\). Here \(-1 \mathrel{\mathcal{R}} 1\) and \(1 \mathrel{\mathcal{R}} -1\) (\(|-1| = |1|\)), yet \(-1 \neq 1\). \(\mathcal{R}\) is not antisymmetric.</p><p>4. \(\mathcal{R}\) is transitive if \(\forall (a, b, c) \in \R^3,\ (a \mathrel{\mathcal{R}} b \text{ and } b \mathrel{\mathcal{R}} c) \Rightarrow a \mathrel{\mathcal{R}} c\). Let \((a, b, c) \in \R^3\) such that \(a \mathrel{\mathcal{R}} b\) and \(b \mathrel{\mathcal{R}} c\). Then \(|a| \leq |b|\) and \(|b| \leq |c|\), so \(|a| \leq |c|\), i.e. \(a \mathrel{\mathcal{R}} c\). \(\mathcal{R}\) is transitive.</p>`) +
        r`<p>So \(\mathcal{R}\) is neither an order relation (not antisymmetric) nor an equivalence relation (not symmetric).</p>` }],
    answer: r`<ul><li>1. Reflexive: \(|a| \leq |a|\).</li><li>2. Not symmetric: \(1 \mathrel{\mathcal{R}} 2\) but not \(2 \mathrel{\mathcal{R}} 1\).</li><li>3. Not antisymmetric: \(-1 \mathrel{\mathcal{R}} 1\), \(1 \mathrel{\mathcal{R}} -1\) and \(-1 \neq 1\).</li><li>4. Transitive.</li></ul>`,
    traps: [
      r`“After recalling the definition”: the definition with quantifiers earns points, even when the property is false.`,
      r`Antisymmetric does not mean “not symmetric”: here the relation is neither.`,
      r`A false property is disproved with a numerical counterexample; a true property is proved for arbitrary elements (“Let…”).`],
    grading: '4 points for the exercise; the paper does not split them between questions.',
    note: 'The archive has no answer key for this paper: properties checked by program on a grid of reals.' };

  /* =====================================================================
     DP exam, October 2023 — official English statements (English answer key)
     ===================================================================== */
  EN['p2023-dp-ex1'] = { src: 'DP exam 2023 · Ex 1', title: 'Cardinal numbers: partition and inclusion-exclusion',
    questions: [
      r`<b>1.</b> Let \(F\) and \(G\) be two finite disjoint sets. What is \(\card(F \cup G)\)?`,
      r`<b>2.</b> Let \(E\) be a finite set, \(A\) and \(B\) two subsets of \(E\) (maybe disjoint, maybe not).<p>(a) Using a partition of \(A\), find a relation between \(\card(A)\), \(\card(A \setminus B)\) and \(\card(A \cap B)\). You can draw the sets if it is helpful… Remind that \(A \setminus B = \{x \in E ;\ x \in A \land x \notin B\}\).</p><p>(b) Write a formula which enables one to get \(\card(A \cup B)\).</p><p>(c) Using a partition of \(A \cup B\) and question 2.(a), prove the formula of question 2.(b).</p>`],
    hints: [
      r`An element of \(A\) is either in \(B\) or outside \(B\): \(A\) splits into two disjoint pieces.`,
      r`For \(A \cup B\): take all of \(B\), then the elements of \(A\) that are not in \(B\).`],
    solution: [
      { t: 'Question 1: disjoint union', html: M(r`<p>\(F\) and \(G\) are disjoint: \(\card(F \cup G) = \card(F) + \card(G)\).</p>`) },
      { t: 'Question 2(a): a partition of A', html: T('venn', { compare: ['A', '(A - B) | (A & B)'] }) +
        M(r`<p>The set \(A\) can be expressed as the disjoint union \(A = (A \setminus B) \sqcup (A \cap B)\) (an element of \(A \setminus B\) is not in \(B\), an element of \(A \cap B\) is). We can hence use the formula of question 1 with \(F = A \setminus B\) and \(G = A \cap B\). We get</p><div class="fm">\[\card(A) = \card\big((A \setminus B) \cup (A \cap B)\big) = \card(A \setminus B) + \card(A \cap B).\]</div>`) },
      { t: 'Question 2(b): inclusion-exclusion', html: M(r`<p>\(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B)\).</p>`) },
      { t: 'Question 2(c): the proof', html: T('venn', { compare: ['A | B', '(A - B) | B'] }) +
        M(r`<p>The set \(A \cup B\) can be expressed as the disjoint union \(A \cup B = (A \setminus B) \sqcup B\). Thus, by question 1 and then question 2.(a):</p><div class="fm">\[\card(A \cup B) = \card(A \setminus B) + \card(B) = \card(A) - \card(A \cap B) + \card(B).\]</div>`) }],
    answer: r`<ul><li>1. \(\card(F \cup G) = \card(F) + \card(G)\).</li><li>2(a) \(A = (A \setminus B) \sqcup (A \cap B)\), so \(\card(A) = \card(A \setminus B) + \card(A \cap B)\).</li><li>2(b) \(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B)\).</li><li>2(c) \(A \cup B = (A \setminus B) \sqcup B\), then 2(a).</li></ul>`,
    traps: [
      r`Forgetting \(-\card(A \cap B)\): the elements of \(A \cap B\) would be counted twice.`,
      r`Writing “disjoint union” without justifying it, or using a union that is not disjoint, such as \(A \cup B\) itself.`,
      r`Confusing \(A \setminus B\) and \(B \setminus A\).`],
    grading: '3 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key (French and English). The inclusion-exclusion formula was checked by program on thousands of pairs of subsets.' };

  EN['p2023-dp-ex2'] = { src: 'DP exam 2023 · Ex 2', title: 'Podiums of a 20-cyclist race',
    intro: r`<p>In a cycling race, there are 20 competitors. The podium will consist of the ranking (from 1 to 3) of the best three competitors. Peter and Jade are parts of the 20 competitors.</p><p>You will justify briefly your answers. You will simplify your results, but do not compute the final numerical values.</p>`,
    questions: [
      r`<b>1.</b> How many podiums are possible?`,
      r`<b>2.</b> How many podiums are possible, such that Jade is ranked at first position?`,
      r`<b>3.</b> How many podiums are possible, which contain neither Peter nor Jade?`,
      r`<b>4.</b> How many podiums are possible, which contain Peter but do not contain Jade?`,
      r`<b>5.</b> How many podiums are possible, which contain at least Jade or Peter?`,
      r`<b>6.</b> The race organizers have decided to reward the best three competitors. There will be no distinction between them: each of them will be awarded a bicycle. How many ways of awarding the three bicycles are possible?`],
    hints: [
      'A podium is a ranking: order matters (1st, 2nd, 3rd) and a cyclist cannot take two places.',
      '“Peter but not Jade”: first choose Peter’s position, then fill the two other places without Jade or Peter.',
      '“At least Jade or Peter”: count the complement. Question 6: order no longer matters.'],
    solution: [
      { t: 'Question 1: podiums', html: M(r`<p>For the winner of the race, there are 20 possibilities; for the 2nd position, there are 19 possibilities remaining; for the 3rd position, 18 possibilities. Finally, \(20 \times 19 \times 18 = A_{20}^3\) podiums are possible.</p>`) + r`<p>Value: \(6\,840\).</p>` },
      { t: 'Question 2: Jade first', html: M(r`<p>Jade is ranked at first position: there are 19 possibilities remaining for the second position and 18 for the third. There are \(19 \times 18\) podiums such that Jade is at first position.</p>`) + r`<p>Value: \(342\).</p>` },
      { t: 'Question 3: neither Peter nor Jade', html: M(r`<p>If neither Jade nor Peter are on the podium, 18 competitors remain. We are in the situation of question 1, replacing 20 with 18: \(18 \times 17 \times 16\) podiums.</p>`) + r`<p>Value: \(4\,896\).</p>` },
      { t: 'Question 4: Peter but not Jade', html: M(r`<p>Jade is not on the podium. Peter may be at 1st position: then there are 18 possibilities for the 2nd position (neither Jade nor Peter) and 17 for the 3rd. Same computation if Peter is at position 2 or 3. Finally, there are \(3 \times 18 \times 17\) podiums.</p>`) + r`<p>Value: \(918\).</p>` },
      { t: 'Question 5: at least Jade or Peter', html: M(r`<p>We count the complement set: among the \(20 \times 19 \times 18\) podiums, \(18 \times 17 \times 16\) contain neither Peter nor Jade (question 3). So there are \(20 \times 19 \times 18 - 18 \times 17 \times 16\) podiums containing at least one of them.</p>`) +
        r`<p>Value: \(6\,840 - 4\,896 = 1\,944\). Check: Peter without Jade (918) + Jade without Peter (918) + both (\(3 \times 2 \times 18 = 108\)) = 1944.</p>` },
      { t: 'Question 6: three identical bicycles', html: M(r`<p>The order of the 3 competitors does not matter: we have to choose a 3-person subset from the 20 competitors. The number of possibilities is \(\dbinom{20}{3} = \dfrac{20!}{3!\,17!} = \dfrac{20 \times 19 \times 18}{6} = 20 \times 19 \times 3\).</p>`) + r`<p>Value: \(1\,140\). Each group of 3 corresponds to \(3! = 6\) podiums: \(6\,840 / 6 = 1\,140\).</p>` }],
    answer: r`<ul><li>1. \(20 \times 19 \times 18 = 6\,840\)</li><li>2. \(19 \times 18 = 342\)</li><li>3. \(18 \times 17 \times 16 = 4\,896\)</li><li>4. \(3 \times 18 \times 17 = 918\)</li><li>5. \(20 \times 19 \times 18 - 18 \times 17 \times 16 = 1\,944\)</li><li>6. \(\binom{20}{3} = 1\,140\)</li></ul>`,
    traps: [
      r`Question 4: \(19 \times 18 \times 17\) also counts the podiums without Peter; and \(18 \times 17\) forgets that Peter has 3 possible places.`,
      r`Question 5: adding “Peter” and “Jade” counts twice the podiums where they both are.`,
      r`Question 6: order no longer matters, it is \(\binom{20}{3}\), not \(A_{20}^3\).`],
    grading: '7 points for the exercise; the paper does not split them between questions. Simplified results accepted without the final computation.',
    note: 'Wording of the official answer key. Values checked by enumerating the 6840 podiums.' };

  EN['p2023-dp-ex3'] = { src: 'DP exam 2023 · Ex 3', title: 'Green and red balls: Vandermonde’s formula',
    intro: r`<p>Let \((n, p) \in \N^2\).</p><p>A box contains \(p\) green balls and \(n\) red balls.</p><p>Let \(k \in \ent{0}{n+p}\) such that \(k \leq n\) and \(k \leq p\). We simultaneously pick \(k\) balls from the box.</p>`,
    questions: [
      r`<b>1.</b> How many ways of picking the balls are possible?`,
      r`<b>2.</b> Let \(i \in \ent{0}{k}\). How many ways of picking (simultaneously) \(i\) green balls and \(k - i\) red balls are possible?`,
      r`<b>3.</b> Deduce the formula \(\displaystyle\sum_{i=0}^{k} \binom{p}{i}\binom{n}{k-i} = \binom{n+p}{k}\). Justify accurately.`,
      r`<b>4.</b> Application: compute \(\displaystyle\sum_{i=0}^{4} \binom{4}{i}\binom{7}{4-i}\). Your final answer should be a numerical value (an integer number).`],
    hints: [
      r`A simultaneous draw of \(k\) balls is a \(k\)-element subset of the set of the \(n + p\) balls.`,
      r`Sort the draws by their number \(i\) of green balls: the cases \(i = 0, 1, \ldots, k\) are disjoint and cover all the draws.`,
      r`Application: recognise \(p = 4\), \(n = 7\), \(k = 4\).`],
    solution: [
      { t: 'Question 1: all the draws', html: M(r`<p>A simultaneous draw of \(k\) balls amounts to choosing \(k\) balls among the \(n + p\) balls of the box. There are \(\dbinom{n+p}{k}\) ways of picking the balls.</p>`) },
      { t: 'Question 2: i green balls', html: M(r`<p>There are \(\binom{p}{i}\) ways of picking the \(i\) green balls among the \(p\) green ones and \(\binom{n}{k-i}\) ways of picking the \(k - i\) red balls among the \(n\) red ones. There are hence \(\dbinom{p}{i} \times \dbinom{n}{k-i}\) ways.</p>`) },
      { t: 'Question 3: double counting', html: M(r`<p>To pick \(k\) balls, you can pick: 0 green balls and \(k\) red balls, or 1 green ball and \(k - 1\) red balls, or 2 green balls and \(k - 2\) red balls, etc., until \(k\) green balls and 0 red balls. These different cases are disjoint (a draw has a single number of green balls) and cover all the draws. By question 2, this leads to \(\displaystyle\sum_{i=0}^{k} \binom{p}{i}\binom{n}{k-i}\) ways of picking \(k\) balls. However, we have shown at question 1 that there are \(\binom{n+p}{k}\) ways of picking \(k\) balls. It results that:</p><div class="fm">\[\sum_{i=0}^{k} \binom{p}{i}\binom{n}{k-i} = \binom{n+p}{k}.\]</div>`) },
      { t: 'Question 4: application', html: M(r`<p>Here, \(k = 4\), \(p = 4\) and \(n = 7\). Thus,</p><div class="fm">\[\sum_{i=0}^{4} \binom{4}{i}\binom{7}{4-i} = \binom{11}{4} = \frac{11!}{4!\,7!} = \frac{8 \times 9 \times 10 \times 11}{2 \times 3 \times 4} = 3 \times 10 \times 11 = 330.\]</div>`) +
        r`<p>Term-by-term check: \(35 + 4 \times 35 + 6 \times 21 + 4 \times 7 + 1 = 35 + 140 + 126 + 28 + 1 = 330\).</p>` }],
    answer: r`<ul><li>1. \(\binom{n+p}{k}\)</li><li>2. \(\binom{p}{i}\binom{n}{k-i}\)</li><li>3. Partition of the draws by the number \(i\) of green balls (disjoint cases), then comparison with question 1.</li><li>4. \(\binom{11}{4} = 330\)</li></ul>`,
    traps: [
      r`Forgetting to say that the cases are disjoint: this is what allows the addition (the English answer key writes it: “These different cases are disjoint”).`,
      r`Swapping the roles: \(\binom{p}{i}\) for the green balls (there are \(p\) of them), \(\binom{n}{k-i}\) for the red ones.`,
      r`“An integer number”: finish the computation, 330.`],
    grading: '5 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key. Formula checked by program for all \\(n, p \\leq 10\\); application recomputed.' };

  EN['p2023-dp-ex4'] = { src: 'DP exam 2023 · Ex 4', title: 'Maths support sessions: total probability, Bayes, threshold',
    intro: r`<p>EPITA proposes voluntary maths support sessions, for S1 students requiring more explanations. This year, the probability that a student comes at the support sessions is 10%. If a student comes at the support sessions, his probability of validating the S1 Maths module is 80%. If a student does not come to the support sessions, his probability of validating is only 30%.</p><p>Consider the events \(V\) = “the student validates the S1 Maths module” and \(S\) = “the student comes to the support sessions”.</p><p>In the exercise, you will write your results as simplified fractions. They must be justified accurately.</p>`,
    questions: [
      r`<b>1.</b> Translate the data of the exercise using probabilities and the events defined above.`,
      r`<b>2.</b> We randomly pick an EPITA S1 student. What is the probability that he will validate the S1 Maths module?`,
      r`<b>3.</b> We randomly pick a student who has validated. What is the probability that he came to the support sessions?`,
      r`<b>4.</b> We want that a random student has a probability at least 75% of validating the S1 Maths module. What should be the probability \(p\) of coming to the support sessions?`],
    hints: [
      r`“If a student comes at the support sessions, his probability of validating…”: this is \(\P(V \mid S)\).`,
      r`State the partition \(\{S, \overline{S}\}\), then apply the law of total probability.`,
      r`Question 3: we know the student has validated, we look for \(\P(S \mid V)\).`],
    solution: [
      { t: 'Question 1: translate', html: M(r`<p>The text of the exercise says that: \(\P(S) = 0.1\), \(\P(V \mid S) = 0.8\) and \(\P(V \mid \overline{S}) = 0.3\).</p>`) +
        T('tree', { first: [{ n: 'S', p: '1/10' }, { n: '\\overline{S}' }], second: { n: 'V', nb: '\\overline{V}', p: ['4/5', '3/10'] }, edit: false }) },
      { t: 'Question 2: law of total probability', html: M(r`<p>Since \(\{S, \overline{S}\}\) is a partition of \(\Omega\), we know that \(V = (V \cap S) \sqcup (V \cap \overline{S})\) (disjoint union). Therefore,</p><div class="fm">\[\P(V) = \P(V \cap S) + \P(V \cap \overline{S}) = \P(V \mid S)\P(S) + \P(V \mid \overline{S})\P(\overline{S}) = 0.8 \times 0.1 + 0.3 \times 0.9 = 0.35 = \frac{7}{20}.\]</div>`) },
      { t: 'Question 3: Bayes', html: M(r`<p>We search the value of \(\P(S \mid V)\). We know that</p><div class="fm">\[\P(S \mid V) = \frac{\P(V \cap S)}{\P(V)} = \frac{\P(V \mid S)\P(S)}{\P(V)} = \frac{0.8 \times 0.1}{0.35} = \frac{0.08}{0.35} = \frac{8}{35}.\]</div>`) },
      { t: 'Question 4: threshold', html: M(r`<p>Let \(p = \P(S)\). By reasoning as in question 2, we get \(\P(V) = 0.8\,p + 0.3\,(1 - p) = 0.5\,p + 0.3\). We search values of \(p\) such that \(0.5\,p + 0.3 \geq 0.75\), that is \(0.5\,p \geq 0.45\). This leads to \(p \geq 0.9 = \dfrac{9}{10}\): at least 90% of the students should come to the support sessions.</p>`) }],
    answer: r`<ul><li>1. \(\P(S) = \frac{1}{10}\), \(\P(V \mid S) = \frac{4}{5}\), \(\P(V \mid \overline{S}) = \frac{3}{10}\)</li><li>2. \(\P(V) = \frac{7}{20}\)</li><li>3. \(\P(S \mid V) = \frac{8}{35}\)</li><li>4. \(p \geq \frac{9}{10}\)</li></ul>`,
    traps: [
      r`Confusing \(\P(V \mid S)\) and \(\P(V \cap S)\): \(\P(V \cap S) = 0.8 \times 0.1 = 0.08\).`,
      r`Forgetting to state the partition before the law of total probability: rigour is graded.`,
      r`Leaving \(0.35\) when the statement asks for a simplified fraction: \(\frac{7}{20}\).`],
    grading: '5 points for the exercise; the paper does not split them between questions. Simplified fractions required.',
    note: 'Wording of the official answer key. Values recomputed as exact fractions.' };

  EN['p2023-dp-ex5'] = { src: 'DP exam 2023 · Ex 5', title: r`Lecture: prove \(\mathrm{Var}(X) = \E(X^2) - (\E(X))^2\)`,
    intro: r`<p>Let \(X\) and \(Y\) be two finite random variables and \((a, b) \in \R^2\).</p>`,
    questions: [
      r`<b>1.</b> Write the formulas which enable one to get \(\E(X + Y)\) and \(\E(aX + b)\).`,
      r`<b>2.</b> Using the formulas of the previous question (highlight them in your computations), show that \(\mathrm{Var}(X) = \E(X^2) - (\E(X))^2\).`],
    hints: [
      r`Start from the definition \(\mathrm{Var}(X) = \E\big((X - \E(X))^2\big)\) and expand the square.`,
      r`\(\E(X)\) is a number, not a variable: \(2\E(X)X\) is of the form \(aX + b\) with \(a = 2\E(X)\), \(b = 0\).`],
    solution: [
      { t: 'Question 1: the formulas', html: M(r`<p>\(\E(X + Y) = \E(X) + \E(Y)\) (1) and \(\E(aX + b) = a\E(X) + b\) (2).</p>`) },
      { t: 'Question 2: Koenig-Huygens', html: r`<p>This is the proof of the document “Theorems and proofs”. The statement requires you to show where (1) and (2) are used.</p>` +
        M(r`<p>By definition, \(\mathrm{Var}(X) = \E\big((X - \E(X))^2\big)\). Now \((X - \E(X))^2 = X^2 - 2\E(X)X + (\E(X))^2\). Thus,</p><div class="fm">\[\mathrm{Var}(X) = \E\big(X^2 - 2\E(X)X + (\E(X))^2\big) \overset{(1)}{=} \E(X^2) - \E\big(2\E(X)X\big) + \E\big((\E(X))^2\big).\]</div><p>\(\E(X)\) is a constant. On the one hand, \(2\E(X)X\) is of the form \(aX + b\) with \(a = 2\E(X)\) and \(b = 0\), so by (2), \(\E\big(2\E(X)X\big) = 2\E(X)\E(X) = 2(\E(X))^2\). On the other hand, \((\E(X))^2\) is a constant variable: by (2) with \(a = 0\), its expectation is \((\E(X))^2\). We deduce</p><div class="fm">\[\mathrm{Var}(X) = \E(X^2) - 2(\E(X))^2 + (\E(X))^2 = \E(X^2) - (\E(X))^2.\]</div>`) }],
    answer: r`<ul><li>1. \(\E(X + Y) = \E(X) + \E(Y)\); \(\E(aX + b) = a\E(X) + b\).</li><li>2. Expand \((X - \E(X))^2\), then apply (1) and (2), quoting them.</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(X) = \E(X^2) - (\E(X))^2\), not \(\E(X^2) + (\E(X))^2\) nor \((\E(X))^2 - \E(X^2)\): a variance is non-negative.`,
      r`Treating \(\E(X)\) as a variable: it is a number fixed by the distribution of \(X\).`,
      r`Not “highlighting” (1) and (2): the statement explicitly asks for it.`],
    grading: '4 points for the exercise; the paper does not split them between questions.',
    note: 'The official answer key refers to the lecture (“See the lecture and the pdf file about proofs that you have to know”): the proof above is the one of the official document “Theorems and proofs”.' };

  EN['p2023-dp-ex6'] = { src: 'DP exam 2023 · Ex 6', title: 'A 20-question MCQ answered at random',
    intro: r`<p>A student is doing an exam made of MCQ questions. The exam has 20 questions, each question counts for 1 point. The total mark at the exam is hence a mark out of 20. The questions have neither negative nor intermediate points: at each question, the mark is 0 or 1, no other values are possible.</p><p>The student did not prepare his exam and decides to answer randomly. His choices are independent and, at each question, he has a probability \(p = \frac{1}{3}\) of choosing the right answer.</p>`,
    questions: [
      r`<b>1.</b> Let \(k \in \ent{1}{20}\) and consider the random variable \(X_k\) = “Mark of the student at question \(k\)”.<p>(a) The value of \(k \in \ent{1}{20}\) being given, express the distribution of \(X_k\).</p><p>(b) Compute the expectation and the variance of \(X_k\). Write the details of your computations.</p>`,
      r`<b>2.</b> Consider the random variable \(Y\) equal to the total mark of the student at the exam.<p>(a) Express \(Y\) as a function of the variables \(X_k\).</p><p>(b) Find \(\P(Y = i)\) for all \(i \in \ent{0}{20}\). Justify your reasoning properly.</p><p>(c) Check that \(\displaystyle\sum_{i=0}^{20} \P(Y = i) = 1\).</p><p>(d) Compute the expectation and the variance of \(Y\). Justify your computation.</p>`],
    hints: [
      r`\(X_k\) only takes the values 0 and 1: Bernoulli distribution.`,
      r`“Write the details”: write \(\E(X_k) = 0 \times \P(X_k = 0) + 1 \times \P(X_k = 1)\), then the same for \(\E(X_k^2)\).`,
      r`\(Y\) is the sum of 20 independent Bernoulli variables with the same parameter: binomial distribution. The sum of the probabilities follows from the binomial theorem.`],
    solution: [
      { t: 'Question 1: the mark at one question', html: M(r`<p>(a) The distribution is: \(X_k(\Omega) = \{0, 1\}\), \(\P(X_k = 1) = \dfrac{1}{3}\) and \(\P(X_k = 0) = \dfrac{2}{3}\). The variables \(X_k\) are hence Bernoulli-distributed with the parameter \(\dfrac{1}{3}\).</p><p>(b) \(\E(X_k) = 0 \times \P(X_k = 0) + 1 \times \P(X_k = 1) = \dfrac{1}{3}\).</p><p>\(\E(X_k^2) = 0^2 \times \P(X_k = 0) + 1^2 \times \P(X_k = 1) = \dfrac{1}{3}\). Thus, \(\mathrm{V}(X_k) = \E(X_k^2) - (\E(X_k))^2 = \dfrac{1}{3} - \dfrac{1}{9} = \dfrac{2}{9}\).</p>`) },
      { t: 'Question 2: the total mark', html: M(r`<p>(a) \(Y = X_1 + X_2 + \cdots + X_{20}\) because \(Y\) is the sum of the points at each question. The \(X_k\) are independent.</p><p>(b) Since \(Y\) is the sum of 20 independent Bernoulli variables with the same parameter \(\frac{1}{3}\), \(Y\) is binomial-distributed with parameters 20 and \(\frac{1}{3}\). Thus:</p><div class="fm">\[\forall i \in \ent{0}{20}, \quad \P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}.\]</div><p>(c) Using the binomial formula:</p><div class="fm">\[\sum_{i=0}^{20} \P(Y = i) = \sum_{i=0}^{20} \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i} = \left(\frac{1}{3} + \frac{2}{3}\right)^{20} = 1^{20} = 1.\]</div><p>(d) \(\E(Y) = \E(X_1) + \cdots + \E(X_{20}) = 20 \times \dfrac{1}{3} = \dfrac{20}{3}\) because the \(X_k\) have the same expectation. Furthermore, since \(X_1, \ldots, X_{20}\) are independent, \(\mathrm{V}(Y) = \mathrm{V}(X_1) + \cdots + \mathrm{V}(X_{20}) = 20 \times \dfrac{2}{9} = \dfrac{40}{9}\).</p>`) +
        T('law', { law: 'binom', n: 20, p: '1/3', name: 'Y', edit: false }) }],
    answer: r`<ul><li>1. \(X_k\) is Bernoulli-distributed with the parameter \(\frac{1}{3}\); \(\E(X_k) = \frac{1}{3}\), \(\mathrm{V}(X_k) = \frac{2}{9}\).</li><li>2. \(Y = X_1 + \cdots + X_{20}\) is binomial-distributed, \(\mathcal{B}\left(20, \frac{1}{3}\right)\); \(\P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}\); \(\E(Y) = \frac{20}{3}\), \(\mathrm{V}(Y) = \frac{40}{9}\).</li></ul>`,
    traps: [
      r`“Write the details”: writing \(\E(X_k) = p\) without the computation \(0 \times \frac{2}{3} + 1 \times \frac{1}{3}\) loses points.`,
      r`Forgetting the independence of the \(X_k\) when justifying the binomial distribution and \(\mathrm{V}(Y)\).`,
      r`\(\frac{20}{3}\) is not a whole mark: it is an average, the expectation is not a value taken by \(Y\).`],
    grading: '6 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key (which writes “P(X = 0)” and “E(X)” without the index k: typo). Sum of the 21 probabilities computed exactly: 1. Same exercise as exercise 5.21 of TD 2.' };

  /* =====================================================================
     LE exam (logic and sets), October 2023 — official English statements (English answer key)
     ===================================================================== */
  EN['p2023-le-ex2'] = { src: 'LE exam 2023 · Ex 2', title: 'Translate, negate, select the true implications',
    intro: r`<p>Consider a function \(f : \R \to \R\).</p>`,
    questions: [
      r`<b>1.</b> Translate in mathematical language the following sentences (using quantifiers)<p>(a) “The equation \(f(x) = 0\) admits at least one solution”</p><p>(b) “The function \(f\) is a constant function”</p><p>(c) “The function \(f\) is upper bounded”</p>`,
      r`<b>2.</b> Consider the following properties: \(P\): “\(\forall x \in \R,\ f(x) = 0\)”, \(Q\): “\(\exists x \in \R,\ f(x) = 0\)” and \(R\): “\((\forall x \in \R,\ f(x) > 0) \lor (\forall x \in \R,\ f(x) < 0)\)”.<p>(a) Write the negation of \(P\), of \(Q\) and of \(R\).</p><p>(b) Select in this table the implications which are true:</p><div class="tbl"><table><thead><tr><th scope="col">\(P \Rightarrow Q\)</th><th scope="col">\(Q \Rightarrow P\)</th><th scope="col">\(Q \Rightarrow R\)</th><th scope="col">\(\neg(Q) \Rightarrow \neg(P)\)</th><th scope="col">\(\neg(P) \Rightarrow \neg(R)\)</th></tr></thead><tbody><tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr></tbody></table></div>`],
    hints: [
      r`“Constant”: there exists a real \(a\) such that, for all \(x\), \(f(x) = a\). The order “\(\exists a\), then \(\forall x\)” is essential.`,
      r`Negate: \(\forall\) becomes \(\exists\), \(\exists\) becomes \(\forall\), \(=\) becomes \(\neq\), \(>\) becomes \(\leq\), and “or” becomes “and”.`,
      r`For each false implication, look for a simple function (\(f(x) = x\), \(f = 1\), \(f = 0\)) that makes the left side true and the right side false.`],
    solution: [
      { t: 'Question 1: translate', html: M(r`<p>(a) \(\exists x \in \R,\ f(x) = 0\)</p><p>(b) \(\exists a \in \R,\ \forall x \in \R,\ f(x) = a\)</p><p>(c) \(\exists M \in \R,\ \forall x \in \R,\ f(x) \leq M\)</p>`) },
      { t: 'Question 2(a): negations', html: M(r`<p>\(\neg(P)\): “\(\exists x \in \R,\ f(x) \neq 0\)”</p><p>\(\neg(Q)\): “\(\forall x \in \R,\ f(x) \neq 0\)”</p><p>\(\neg(R)\): “\((\exists x \in \R,\ f(x) \leq 0) \land (\exists x \in \R,\ f(x) \geq 0)\)”</p>`) +
        r`<p>For \(R\), De Morgan’s law \(\neg(A \lor B) \equiv \neg A \land \neg B\) turns “or” into “and”, then each \(\forall\) becomes \(\exists\).</p>` +
        T('negate', { src: '(\\forall x \\in \\R, f(x) > 0) \\lor (\\forall x \\in \\R, f(x) < 0)', edit: false }) },
      { t: 'Question 2(b): true implications', html: M(r`<p>\(P \Rightarrow Q\): true. If \(f\) is zero on \(\R\), then \(f(0) = 0\), so the equation \(f(x) = 0\) has a solution.</p><p>\(Q \Rightarrow P\): false. \(f : x \mapsto x\) satisfies \(f(0) = 0\), but \(f(1) = 1 \neq 0\).</p><p>\(Q \Rightarrow R\): false. \(f = 0\) satisfies \(Q\) but not \(R\): a function that vanishes is neither strictly positive nor strictly negative everywhere.</p><p>\(\neg(Q) \Rightarrow \neg(P)\): true, it is the contrapositive of \(P \Rightarrow Q\).</p><p>\(\neg(P) \Rightarrow \neg(R)\): false. \(f = 1\) satisfies \(\neg(P)\) (\(f(0) = 1 \neq 0\)) and \(R\) (\(f > 0\)), so not \(\neg(R)\).</p>`) +
        '<div class="tbl"><table><thead><tr><th scope="col">\\(P \\Rightarrow Q\\)</th><th scope="col">\\(Q \\Rightarrow P\\)</th><th scope="col">\\(Q \\Rightarrow R\\)</th><th scope="col">\\(\\neg(Q) \\Rightarrow \\neg(P)\\)</th><th scope="col">\\(\\neg(P) \\Rightarrow \\neg(R)\\)</th></tr></thead><tbody><tr><td><b>X</b></td><td></td><td></td><td><b>X</b></td><td></td></tr></tbody></table></div>' }],
    answer: r`<ul><li>1. (a) \(\exists x \in \R,\ f(x) = 0\); (b) \(\exists a \in \R,\ \forall x \in \R,\ f(x) = a\); (c) \(\exists M \in \R,\ \forall x \in \R,\ f(x) \leq M\).</li><li>2(a) \(\neg P\): \(\exists x,\ f(x) \neq 0\); \(\neg Q\): \(\forall x,\ f(x) \neq 0\); \(\neg R\): \((\exists x,\ f(x) \leq 0) \land (\exists x,\ f(x) \geq 0)\).</li><li>2(b) Selected: \(P \Rightarrow Q\) and \(\neg(Q) \Rightarrow \neg(P)\).</li></ul>`,
    traps: [
      r`“Constant” written \(\forall x,\ \exists a,\ f(x) = a\): always true (take \(a = f(x)\)), it is not the right translation.`,
      r`\(\neg R\) is not \((\exists x,\ f(x) < 0) \lor (\exists x,\ f(x) > 0)\): “or” becomes “and”, and \(>\) becomes \(\leq\).`,
      r`\(\neg(P) \Rightarrow \neg(R)\) is not the contrapositive of \(P \Rightarrow R\): it is the contrapositive of \(R \Rightarrow P\), which is false.`],
    grading: '6 points for the exercise; the paper does not split them between questions.',
    note: 'Answers of the official answer key (French and English); justifications added. The implications were checked by program on all functions from a small finite set to \\(\\{-1, 0, 1\\}\\).' };

  EN['p2023-le-ex3'] = { src: 'LE exam 2023 · Ex 3', title: r`Direct images and pre-images, \(x \mapsto |x - 1|\)`,
    questions: [
      r`<b>1.</b> Consider two sets \(E\) and \(F\), a function \(f : E \to F\), \(A \subset E\) and \(B \subset F\). Write the mathematical definition of the sets \(f(A)\) and \(f^{-1}(B)\).`,
      r`<b>2.</b> Using a figure, define a function \(f : \{a, b, c, d\} \to \ent{1}{5}\) which satisfies the three properties \(f(\{a, b\}) = \{1, 2\}\), \(f^{-1}(\{5\}) = \varnothing\) and \(f^{-1}(\{2\}) = \{b, c\}\).`,
      r`<b>3.</b> Let \(g : \R \to \R,\ x \mapsto |x - 1|\).<p>(a) Draw the graph of \(g\).</p><p>(b) Find \(g(\{-1, 2\})\), \(g([-1, 3])\), \(g^{-1}(\{1\})\) and \(g^{-1}([0, 1])\).</p><p>(c) Is \(g\) injective? Justify. If not, find two intervals \(I_1\) and \(J_1\) such that \(g : I_1 \to J_1\) is injective.</p><p>(d) Is \(g\) surjective? Justify. If not, find two intervals \(I_2\) and \(J_2\) such that \(g : I_2 \to J_2\) is surjective.</p>`],
    hints: [
      r`Question 2: \(f^{-1}(\{2\}) = \{b, c\}\) says that \(b\) and \(c\) have image 2, and that neither \(a\) nor \(d\) has image 2.`,
      r`The graph of \(|x - 1|\) is a “V” with vertex \((1, 0)\): it goes down from \(-\infty\) to 1, then up.`,
      r`To make it injective, shrink the input set to an interval where \(g\) is strictly monotonic; to make it surjective, shrink the output set to \(g(\R)\).`],
    solution: [
      { t: 'Question 1: definitions', html: M(r`<div class="fm">\[f(A) = \{f(x) ;\ x \in A\} \qquad \text{and} \qquad f^{-1}(B) = \{x \in E ;\ f(x) \in B\}\]</div>`) },
      { t: 'Question 2: building the function', html: M(r`<p>Since \(f^{-1}(\{2\}) = \{b, c\}\), \(f(b) = f(c) = 2\), and \(f(a) \neq 2\), \(f(d) \neq 2\). Since \(f(\{a, b\}) = \{1, 2\}\) and \(f(b) = 2\), we get \(f(a) = 1\). Finally \(f^{-1}(\{5\}) = \varnothing\) forces \(f(d) \neq 5\). A possible answer, for example: \(f(a) = 1\), \(f(b) = 2\), \(f(c) = 2\) and \(f(d) = 4\).</p>`) +
        T('sagittal', { E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4', '5'], f: { a: '1', b: '2', c: '2', d: '4' }, mode: 'preimage', B: ['2'] }) +
        r`<p>Exactly three functions work: \(f(d) \in \{1, 3, 4\}\), everything else being forced.</p>` },
      { t: 'Question 3(a)-(b): graph and images', html: FIG.abs1 +
        M(r`<p>\(g\) decreases from 2 to 0 on \([-1, 1]\), then increases from 0 to 2 on \([1, 3]\).</p><p>\(g(\{-1, 2\}) = \{2, 1\}\); \(g([-1, 3]) = [0, 2]\); \(g^{-1}(\{1\}) = \{0, 2\}\) (\(|x - 1| = 1 \Leftrightarrow x - 1 = \pm 1\)); \(g^{-1}([0, 1]) = [0, 2]\) (\(|x - 1| \leq 1 \Leftrightarrow -1 \leq x - 1 \leq 1 \Leftrightarrow 0 \leq x \leq 2\)).</p>`) },
      { t: 'Question 3(c)-(d): injective, surjective', html: M(r`<p>(c) \(g(0) = g(2) = 1\) and \(0 \neq 2\). The function \(g\) is hence not injective. To make it injective, we can choose for example \(I_1 = [1, +\infty[\) and \(J_1 = \R\): on \(I_1\), \(g(x) = x - 1\) is strictly increasing, so two distinct reals have distinct images.</p><p>(d) \(-2\) has no pre-image (an absolute value is non-negative): the function \(g\) is hence not surjective. To make it surjective, we can choose for example \(I_2 = \R\) and \(J_2 = \R_+\): for every \(y \geq 0\), \(x = y + 1\) satisfies \(g(x) = y\).</p>`) }],
    answer: r`<ul><li>1. \(f(A) = \{f(x) ;\ x \in A\}\), \(f^{-1}(B) = \{x \in E ;\ f(x) \in B\}\).</li><li>2. For example \(f(a) = 1\), \(f(b) = f(c) = 2\), \(f(d) = 4\).</li><li>3(b) \(g(\{-1, 2\}) = \{1, 2\}\), \(g([-1, 3]) = [0, 2]\), \(g^{-1}(\{1\}) = \{0, 2\}\), \(g^{-1}([0, 1]) = [0, 2]\).</li><li>3(c) not injective (\(g(0) = g(2)\)); \(I_1 = [1, +\infty[\), \(J_1 = \R\).</li><li>3(d) not surjective (\(-2\)); \(I_2 = \R\), \(J_2 = \R_+\).</li></ul>`,
    traps: [
      r`\(g([-1, 3])\) is not \([g(-1), g(3)] = \{2\}\): \(g\) is not monotonic on \([-1, 3]\), its minimum 0 is reached at 1.`,
      r`Question 2: \(f(d) = 2\) is forbidden (otherwise \(d \in f^{-1}(\{2\})\)).`,
      r`For surjectivity, it is the output set that you shrink; for injectivity, the input set.`],
    grading: '8 points for the exercise; the paper does not split them between questions.',
    note: 'Answers of the official answer key (French and English), justifications added; images recomputed by program and the 3 functions of question 2 found by enumerating the \\(5^4 = 625\\) functions.' };

  EN['p2023-le-ex4'] = { src: 'LE exam 2023 · Ex 4', title: r`The relation “\(b\) is a power of \(a\)” on \(\N^*\)`,
    intro: r`<p>In \(E = \N^*\), consider the relation \(\mathcal{R}\) defined by: \(\forall (a, b) \in E^2,\ a \mathrel{\mathcal{R}} b \Leftrightarrow \exists n \in \N\) such that \(b = a^n\).</p>`,
    questions: [
      r`<b>1.</b> Is \(\mathcal{R}\) reflexive? Justify.`,
      r`<b>2.</b> Is \(\mathcal{R}\) symmetric? Justify.`,
      r`<b>3.</b> Is \(\mathcal{R}\) transitive? Justify.`,
      r`<b>4.</b> Let \((a, b) \in E^2\) such that \(a \mathrel{\mathcal{R}} b\) and \(b \mathrel{\mathcal{R}} a\).<p>(a) Show that there exists \((n, p) \in \N^2\) such that \(b = b^{np}\).</p><p>(b) Deduce that \(b = 1\) or \(n = p = 1\). Finally, what have you proven in this question 4?</p>`],
    hints: [
      r`Reflexive: which exponent \(n\) gives \(a = a^n\)?`,
      r`Symmetric: try \(a = 2\), \(b = 8\).`,
      r`4(b): if \(b \geq 2\), the powers \(b^0, b^1, b^2, \ldots\) are all distinct. Then conclude that \(a = b\) in every case.`],
    solution: [
      { t: 'Questions 1 to 3', html: M(r`<p>1. Let \(a \in E\). Then \(a = a^1\), which implies that \(a \mathrel{\mathcal{R}} a\). \(\mathcal{R}\) is hence reflexive.</p><p>2. \(8 = 2^3\), which implies that \(2 \mathrel{\mathcal{R}} 8\). However, there is no \(n \in \N\) such that \(2 = 8^n\) (\(8^0 = 1\), \(8^1 = 8\), and the next powers exceed 8). Relation \(\mathcal{R}\) is hence not symmetric.</p><p>3. Let \((a, b, c) \in E^3\) such that \(a \mathrel{\mathcal{R}} b\) and \(b \mathrel{\mathcal{R}} c\). Then there exists \((n, p) \in \N^2\) such that \(b = a^n\) and \(c = b^p\). Thus, \(c = (a^n)^p = a^{np}\) with \(np \in \N\), which leads to \(a \mathrel{\mathcal{R}} c\). The relation is transitive.</p>`) },
      { t: 'Question 4: antisymmetry', html: M(r`<p>(a) Since \(a \mathrel{\mathcal{R}} b\) and \(b \mathrel{\mathcal{R}} a\), there exists \((n, p) \in \N^2\) such that \(b = a^n\) and \(a = b^p\). Thus, \(b = (b^p)^n = b^{np}\).</p><p>(b) If \(b \neq 1\), then \(b \geq 2\) and the powers of \(b\) are pairwise distinct; \(b^1 = b^{np}\) hence forces \(np = 1\). Since \(n\) and \(p\) are natural numbers, \(n = p = 1\). So \(b = 1\) or \(n = p = 1\).</p><p>If \(b = 1\) then \(a = b^p = 1 = b\). If \(b \neq 1\), then \(n = 1\) and \(b = a^1 = a\). In all cases, we get \(a = b\): relation \(\mathcal{R}\) is antisymmetric.</p>`) +
        r`<p>\(\mathcal{R}\) is reflexive, antisymmetric and transitive: it is an order relation on \(\N^*\) (the answer key stops at “antisymmetric”).</p>` }],
    answer: r`<ul><li>1. Reflexive (\(a = a^1\)).</li><li>2. Not symmetric: \(2 \mathrel{\mathcal{R}} 8\) but 2 is not a power of 8.</li><li>3. Transitive (\(c = a^{np}\)).</li><li>4. \(b = b^{np}\), so \(b = 1\) or \(n = p = 1\); in both cases \(a = b\): \(\mathcal{R}\) is antisymmetric, hence an order relation.</li></ul>`,
    traps: [
      r`Taking \(n = 0\) for reflexivity: \(a^0 = 1 \neq a\) in general.`,
      r`4(b): \(b = b^{np}\) implies \(np = 1\) only if \(b \neq 1\) (\(1 = 1^{np}\) for every \(np\)).`,
      r`Not concluding: the question “what have you proven?” expects the word “antisymmetric”.`],
    grading: '4 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key (French and English), with the justification of \\(np = 1\\) added. Properties checked by enumeration on \\(\\ent{1}{30}\\).' };

  /* =====================================================================
     S1 midterm, November 2022 — translated
     ===================================================================== */
  EN['p2022-ex2'] = { src: 'S1 midterm 2022 · Ex 2', title: r`Images, \(x \mapsto |x| + 1\), composition of injections and of surjections`,
    intro: r`<p>In this exercise, the questions are independent.</p>`,
    questions: [
      r`<b>1.</b> Let \(E\) and \(F\) be two sets, \(f : E \to F\), \(A \subset E\) and \(B \subset F\). Write the mathematical definition of the sets \(f(A)\) and \(f^{-1}(B)\).`,
      r`<b>2.</b> Let \(f : \ent{1}{4} \to \ent{10}{14}\) such that \(f(1) = 10\), \(f(2) = 11\), \(f(3) = 11\) and \(f(4) = 13\). Find \(f(\ent{1}{4})\), \(f(\{3\})\), \(f^{-1}(\{10, 11\})\) and \(f^{-1}(\{12\})\).`,
      r`<b>3.</b> Let \(g : \R \to \R,\ x \mapsto |x| + 1\).<p>(a) Draw the graph of \(g\).</p><p>(b) Is \(g\) injective? Justify. If not, find two intervals \(I_1\) and \(J_1\) such that \(g : I_1 \to J_1\) is injective.</p><p>(c) Is \(g\) surjective? Justify. If not, find two intervals \(I_2\) and \(J_2\) such that \(g : I_2 \to J_2\) is surjective.</p>`,
      r`<b>4.</b> Let \(E\), \(F\) and \(G\) be three sets, \(f : E \to F\) and \(g : F \to G\).<p>(a) Using \(f\) and \(g\), which composition \(h\) can be made? Give the input and output sets of this function \(h\).</p><p>(b) Assume \(f\) and \(g\) are injective. Show that \(h\) is injective too.</p><p>(c) (bonus question) Assume \(f\) and \(g\) are surjective. Show that \(h\) is surjective too.</p>`],
    hints: [
      r`\(f^{-1}(\{10, 11\})\): all the elements of \(\ent{1}{4}\) whose image is 10 or 11.`,
      r`\(g\) is even: \(g(-1) = g(1)\). And \(g(x) \geq 1\) for every \(x\).`,
      r`4(b): start with “Let \((x, x') \in E^2\) such that \(h(x) = h(x')\)” and use the injectivity of \(g\), then that of \(f\).`],
    solution: [
      { t: 'Question 1: definitions', html: M(r`<div class="fm">\[f(A) = \{f(x),\ x \in A\} = \{y \in F,\ \exists x \in A,\ y = f(x)\} \quad \text{and} \quad f^{-1}(B) = \{x \in E,\ f(x) \in B\}\]</div>`) },
      { t: 'Question 2: a finite set', html: T('sagittal', { E: ['1', '2', '3', '4'], F: ['10', '11', '12', '13', '14'], f: { 1: '10', 2: '11', 3: '11', 4: '13' }, mode: 'preimage', B: ['10', '11'] }) +
        M(r`<p>\(f(\ent{1}{4}) = \{10, 11, 13\}\), \(f(\{3\}) = \{11\}\), \(f^{-1}(\{10, 11\}) = \{1, 2, 3\}\) and \(f^{-1}(\{12\}) = \varnothing\).</p>`) },
      { t: 'Question 3: the function |x| + 1', html: FIG.absp1 +
        M(r`<p>(b) Since \(g(1) = g(-1) = 2\) and \(1 \neq -1\), \(g\) is not injective. Choosing \(I_1 = \R_+\) and \(J_1 = \R\), \(g\) is injective since it is continuous and strictly increasing on \(\R_+\) (\(g(x) = x + 1\)).</p><p>(c) The equation \(0 = g(x)\) has no solution, so 0 has no pre-image in \(\R\): \(g\) is not surjective. Taking \(I_2 = \R\) and \(J_2 = [1, +\infty[\), \(g\) is surjective: \(\forall x \in \R,\ g(x) \geq 1\), and every \(y \geq 1\) has the pre-image \(y - 1\).</p>`) },
      { t: 'Question 4: compositions', html: M(r`<p>(a) \(h = g \circ f : E \to G\), \(x \mapsto g(f(x))\) (the output set of \(f\) is the input set of \(g\)).</p><p>(b) Assume \(f\) and \(g\) are injective. We want to show that \(\forall (x, x') \in E^2,\ g \circ f(x) = g \circ f(x') \Rightarrow x = x'\). Let \((x, x') \in E^2\) such that \(g \circ f(x) = g \circ f(x')\). Then \(g(f(x)) = g(f(x'))\). Since \(g\) is injective, \(f(x) = f(x')\). This implies \(x = x'\) since \(f\) is injective. So \(h\) is injective.</p><p>(c) Assume \(f\) and \(g\) are surjective. Let \(y \in G\). Since \(g\) is surjective, \(\exists z \in F\) such that \(y = g(z)\). Since \(z \in F\) and \(f\) is surjective from \(E\) to \(F\), \(z\) has a pre-image under \(f\) in \(E\): \(\exists x \in E\) such that \(z = f(x)\). Thus, \(y = g(z) = g(f(x)) = g \circ f(x)\), which means that \(g \circ f\) is surjective.</p>`) }],
    answer: r`<ul><li>2. \(f(\ent{1}{4}) = \{10, 11, 13\}\), \(f(\{3\}) = \{11\}\), \(f^{-1}(\{10, 11\}) = \{1, 2, 3\}\), \(f^{-1}(\{12\}) = \varnothing\).</li><li>3(b) not injective (\(g(1) = g(-1)\)); \(I_1 = \R_+\), \(J_1 = \R\). 3(c) not surjective (0); \(I_2 = \R\), \(J_2 = [1, +\infty[\).</li><li>4. \(h = g \circ f : E \to G\), injective if \(f\) and \(g\) are, surjective if \(f\) and \(g\) are.</li></ul>`,
    traps: [
      r`\(f(\{3\}) = \{11\}\) is a set, not the number 11.`,
      r`Writing \(f \circ g\): it does not exist in general (the output set of \(g\) is \(G\), not \(E\)).`,
      r`4(b): using the injectivity of \(f\) before that of \(g\). We start from \(g(f(x)) = g(f(x'))\): it is \(g\) that we “remove” first.`],
    grading: '8.5 points for the exercise, question 4(c) as a bonus; the paper does not split them between questions.',
    note: 'Wording of the official answer key. Images recomputed by program.' };

  EN['p2022-ex3'] = { src: 'S1 midterm 2022 · Ex 3', title: 'Relations: definitions, negations, contrapositive, order relation',
    intro: r`<p>Let \(E\) be a set and \(\mathcal{R}\) a relation on \(E\). For two elements \(x\) and \(y\) of \(E\), we write \(x \mathrel{\mathcal{R}} y\) if \(x\) and \(y\) are related, and \(x \not\mathrel{\mathcal{R}} y\) otherwise.</p>`,
    questions: [
      r`<b>1.</b> Write the mathematical definition of “\(\mathcal{R}\) is reflexive”. Also give its negation.`,
      r`<b>2.</b> Write the mathematical definition of “\(\mathcal{R}\) is antisymmetric”. Also give its negation.`,
      r`<b>3.</b> Write the mathematical definition of “\(\mathcal{R}\) is transitive”. Also give its contrapositive.`,
      r`<b>4.</b> Give an example of a relation \(\mathcal{R}\) that is reflexive, antisymmetric and transitive. What is such a relation called?`],
    hints: [
      r`Each definition starts with a \(\forall\); its negation starts with an \(\exists\).`,
      r`The negation of “\(P \Rightarrow Q\)” is “\(P\) and not \(Q\)”; the contrapositive is “not \(Q \Rightarrow\) not \(P\)”.`],
    solution: [
      { t: 'Definitions, negations, contrapositive', html: M(r`<p>1. “\(\mathcal{R}\) is reflexive” means: \(\forall x \in E,\ x \mathrel{\mathcal{R}} x\). The negation is: \(\exists x \in E,\ x \not\mathrel{\mathcal{R}} x\).</p><p>2. “\(\mathcal{R}\) is antisymmetric” means: \(\forall (x, y) \in E^2,\ (x \mathrel{\mathcal{R}} y \text{ and } y \mathrel{\mathcal{R}} x) \Rightarrow x = y\). The negation is: \(\exists (x, y) \in E^2\) such that \(x \mathrel{\mathcal{R}} y\) and \(y \mathrel{\mathcal{R}} x\) and \(x \neq y\).</p><p>3. “\(\mathcal{R}\) is transitive” means: \(\forall (x, y, z) \in E^3,\ (x \mathrel{\mathcal{R}} y \text{ and } y \mathrel{\mathcal{R}} z) \Rightarrow x \mathrel{\mathcal{R}} z\). The contrapositive is: \(\forall (x, y, z) \in E^3,\ x \not\mathrel{\mathcal{R}} z \Rightarrow (x \not\mathrel{\mathcal{R}} y \text{ or } y \not\mathrel{\mathcal{R}} z)\).</p><p>4. On \(\R\), \(\leq\) is reflexive (\(x \leq x\)), antisymmetric (\(x \leq y\) and \(y \leq x\) give \(x = y\)) and transitive. It is an order relation.</p>`) }],
    answer: r`<ul><li>1. \(\forall x \in E,\ x \mathrel{\mathcal{R}} x\); negation \(\exists x \in E,\ x \not\mathrel{\mathcal{R}} x\).</li><li>2. \(\forall (x, y) \in E^2,\ (x \mathrel{\mathcal{R}} y \text{ and } y \mathrel{\mathcal{R}} x) \Rightarrow x = y\); negation \(\exists (x, y) \in E^2,\ x \mathrel{\mathcal{R}} y,\ y \mathrel{\mathcal{R}} x,\ x \neq y\).</li><li>3. \(\forall (x, y, z) \in E^3,\ (x \mathrel{\mathcal{R}} y \text{ and } y \mathrel{\mathcal{R}} z) \Rightarrow x \mathrel{\mathcal{R}} z\); contrapositive \(x \not\mathrel{\mathcal{R}} z \Rightarrow (x \not\mathrel{\mathcal{R}} y \text{ or } y \not\mathrel{\mathcal{R}} z)\).</li><li>4. \(\leq\) on \(\R\): an order relation.</li></ul>`,
    traps: [
      r`The contrapositive keeps the \(\forall\): only the implication changes. The negation turns \(\forall\) into \(\exists\).`,
      r`In the contrapositive of transitivity, “and” becomes “or” (De Morgan).`,
      r`Antisymmetric ≠ “not symmetric”.`],
    grading: '4 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key.' };

  EN['p2022-ex4'] = { src: 'S1 midterm 2022 · Ex 4', title: 'Committees and teams of leaders in a class of 20',
    intro: r`<p>Peter and Mary are in a class of 20 students. In this class, there are 12 boys and 8 girls.</p>`,
    questions: [
      r`<b>1.</b> The class decides to elect a committee of 3 students who will represent it at school level.<p>(a) How many committees are possible? Justify briefly.</p><p>(b) How many committees contain exactly 2 boys and 1 girl? Justify briefly.</p><p>(c) How many committees contain at least 2 girls? Justify briefly.</p><p>(d) We want Peter and Mary to be in the committee. How many committees are possible in this case? Justify briefly.</p>`,
      r`<b>2.</b> The students of the class are going on an integration weekend. For this, they must form a team of four leaders: a head, a deputy head and two assistants (these two can assist the head as well as the deputy). Nobody can hold two positions at the same time in this team.<p>(a) How many teams of leaders are possible? Justify briefly.</p><p>(b) We want the head to be a girl, the deputy a boy and, among the two assistants, one girl and one boy. How many teams of leaders are possible in this case? Justify briefly.</p><p>(c) It is decided: Mary will be the head of the team. How many teams of leaders are possible in this case? Justify briefly.</p><p>(d) “If Mary is the head, then I also want to be in the team of leaders!” says Peter. How many teams of leaders are possible in this case? Justify briefly.</p>`],
    hints: [
      r`A committee has no order: combinations. The head and the deputy are distinct positions (order), the two assistants are not.`,
      r`“At least 2 girls” = “exactly 2 girls” or “exactly 3 girls”: two disjoint cases to add.`,
      r`2(d): the answer key reads “Mary is the head and Peter is in the team”. Separate the cases “Peter deputy” and “Peter assistant”.`],
    solution: [
      { t: 'Question 1: committees', html: M(r`<p>(a) This amounts to choosing 3 students out of 20. There are \(\binom{20}{3}\) possible committees.</p><p>(b) There are \(\binom{12}{2}\) ways of choosing the two boys and \(\binom{8}{1}\) ways of choosing the girl. In total, \(\binom{12}{2} \times 8\) committees.</p><p>(c) “At least two girls” means “exactly two girls” or “exactly three girls” (disjoint cases). So there are \(\binom{8}{2}\binom{12}{1} + \binom{8}{3}\) committees.</p><p>(d) Peter and Mary are in it: we only have to choose one student among the 18 others. There are \(\binom{18}{1} = 18\) committees.</p>`) +
        r`<p>Values: \(1\,140\); \(66 \times 8 = 528\); \(28 \times 12 + 56 = 392\); \(18\).</p>` },
      { t: 'Question 2: teams of leaders', html: M(r`<p>(a) There are 20 ways of choosing the head, then 19 of choosing the deputy. Then we choose two assistants (no order) among the 18 remaining students. So there are \(20 \times 19 \times \binom{18}{2}\) teams.</p><p>(b) 8 ways of choosing the head, 12 the deputy; for the assistants, there remain 7 ways of choosing the girl and 11 the boy. In total, \(8 \times 12 \times 7 \times 11\) teams.</p><p>(c) Mary being the head, there are 19 ways of choosing the deputy and \(\binom{18}{2}\) of choosing the assistants: \(19 \times \binom{18}{2}\) teams.</p><p>(d) We read: Mary is the head and Peter is in the team. Either Peter is the deputy or he is not. If he is the deputy, there are \(\binom{18}{2}\) ways of choosing the two assistants. If he is not, he is an assistant: 18 ways of choosing the deputy (neither Mary nor Peter), then 17 of choosing the other assistant. In total, \(\binom{18}{2} + 18 \times 17\) teams.</p>`) +
        r`<p>Values: \(58\,140\); \(7\,392\); \(2\,907\); \(153 + 306 = 459\).</p><p>Other reading of (d), literally: the implication “if Mary is the head, then Peter is in the team” is true as soon as Mary is not the head. We then count all the teams except those where Mary is the head without Peter: \(58\,140 - 18 \times \binom{17}{2} = 58\,140 - 2\,448 = 55\,692\). On your paper, write the reading you choose.</p>` }],
    answer: r`<ul><li>1. (a) \(\binom{20}{3} = 1\,140\); (b) \(\binom{12}{2} \times 8 = 528\); (c) \(\binom{8}{2}\binom{12}{1} + \binom{8}{3} = 392\); (d) \(18\).</li><li>2. (a) \(20 \times 19 \times \binom{18}{2} = 58\,140\); (b) \(8 \times 12 \times 7 \times 11 = 7\,392\); (c) \(19 \times \binom{18}{2} = 2\,907\); (d) \(\binom{18}{2} + 18 \times 17 = 459\) (reading of the answer key).</li></ul>`,
    traps: [
      r`Two assistants: no order between them, so \(\binom{18}{2}\) and not \(18 \times 17\).`,
      r`1(c): \(\binom{8}{2} \times \binom{18}{1}\) (“2 girls then anyone”) counts the 3-girl committees twice.`,
      r`2(d): an “if… then” sentence reads as an implication; state your interpretation.`],
    grading: '6.5 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key. Values checked by enumerating the 58,140 teams, and the other reading of 2(d) too. Question 2 is exercise 3.18 of TD 1.' };

  EN['p2022-ex5'] = { src: 'S1 midterm 2022 · Ex 5', title: 'A box of 5 balls: Bernoulli, binomial, rank of the first white ball',
    intro: r`<p>A box contains 3 white balls and 2 green balls, impossible to tell apart by touch.</p>`,
    questions: [
      r`<b>1.</b> Propose a simple experiment with this box that leads to a Bernoulli variable \(X\). Give \(\E(X)\) and \(\V(X)\).`,
      r`<b>2.</b> Propose a simple experiment with this box that leads to a binomial variable \(Y\) with parameters \(n = 5\) and \(p = \frac{2}{5}\). Give \(\E(Y)\) and \(\V(Y)\).`,
      r`<b>3.</b> We take the balls out of the box one by one (that is, we pick them one after the other without replacement!). Let \(Z\) be the random variable equal to the rank at which the first white ball appears.<p>(a) Which values does \(Z\) take? Justify briefly.</p><p>(b) Give the distribution of \(Z\).</p><p>(c) Compute the expectation of \(Z\).</p><p>(d) Compute the variance of \(Z\).</p>`],
    hints: [
      r`For a parameter \(\frac{2}{5}\), you need an event of probability \(\frac{2}{5}\): drawing a green ball.`,
      r`Binomial: repeat the same Bernoulli trial 5 times, <b>with replacement</b> so that the draws stay independent.`,
      r`There are only 2 green balls: the first white ball appears at the 3rd draw at the latest. \(\P(Z = 2) = \P(\text{green then white})\).`],
    solution: [
      { t: 'Question 1: Bernoulli', html: M(r`<p>We draw one ball from the box. Let \(X\) be the variable equal to 1 if the ball is green and 0 otherwise. Then \(\P(X = 1) = \dfrac{2}{5}\) and \(\P(X = 0) = \dfrac{3}{5}\). \(X\) is hence Bernoulli-distributed with the parameter \(p = \dfrac{2}{5}\). Thus \(\E(X) = p = \dfrac{2}{5}\) and \(\V(X) = p(1 - p) = \dfrac{6}{25}\).</p>`) },
      { t: 'Question 2: binomial', html: M(r`<p>We draw 5 balls one after the other <b>with replacement</b>. Let \(Y\) be the number of green balls obtained. The 5 draws are independent and each gives a green ball with probability \(\frac{2}{5}\): \(Y\) is binomial-distributed with parameters \(n = 5\) and \(p = \frac{2}{5}\), with \(Y(\Omega) = \ent{0}{5}\) and \(\P(Y = k) = \binom{5}{k}\left(\frac{2}{5}\right)^k\left(\frac{3}{5}\right)^{5-k}\). Then \(\E(Y) = np = 2\) and \(\V(Y) = np(1 - p) = \dfrac{6}{5}\).</p>`) },
      { t: 'Question 3: rank of the first white ball', html: M(r`<p>(a) The first white ball can appear at the first draw, and at the third draw at the latest, since there are only two green balls. So \(Z(\Omega) = \{1, 2, 3\}\).</p><p>(b) \(\P(Z = 1) = \dfrac{3}{5}\): 3 white balls out of 5. \(\P(Z = 2) = \dfrac{2}{5} \times \dfrac{3}{4} = \dfrac{3}{10}\): a green ball (2 out of 5), then a white one (3 out of the 4 remaining balls). \(\P(Z = 3) = \dfrac{2}{5} \times \dfrac{1}{4} \times \dfrac{3}{3} = \dfrac{1}{10}\): both green balls first. (Sum: 1.)</p><p>(c) \(\E(Z) = \displaystyle\sum_{k=1}^{3} k\,\P(Z = k) = 1 \times \frac{6}{10} + 2 \times \frac{3}{10} + 3 \times \frac{1}{10} = \frac{15}{10} = \frac{3}{2}\).</p><p>(d) \(\E(Z^2) = \displaystyle\sum_{k=1}^{3} k^2\,\P(Z = k) = \frac{6}{10} + 4 \times \frac{3}{10} + 9 \times \frac{1}{10} = \frac{27}{10}\). Thus \(\V(Z) = \E(Z^2) - (\E(Z))^2 = \dfrac{27}{10} - \dfrac{9}{4} = \dfrac{9}{20}\).</p>`) +
        T('law', { x: [1, 2, 3], p: ['3/5', '3/10', '1/10'], name: 'Z' }) }],
    answer: r`<ul><li>1. \(X\) = 1 if the ball drawn is green: Bernoulli with parameter \(\frac{2}{5}\), \(\E(X) = \frac{2}{5}\), \(\V(X) = \frac{6}{25}\).</li><li>2. 5 draws with replacement, \(Y\) = number of green balls: \(\E(Y) = 2\), \(\V(Y) = \frac{6}{5}\).</li><li>3. \(Z(\Omega) = \{1, 2, 3\}\); \(\P(Z = 1) = \frac{3}{5}\), \(\P(Z = 2) = \frac{3}{10}\), \(\P(Z = 3) = \frac{1}{10}\); \(\E(Z) = \frac{3}{2}\); \(\V(Z) = \frac{9}{20}\).</li></ul>`,
    traps: [
      r`Question 2: without replacement, the draws are not independent and \(Y\) is not binomial.`,
      r`\(\P(Z = 2)\): after a green ball, only 4 balls remain (\(\frac{3}{4}\), not \(\frac{3}{5}\)).`,
      r`Check that the probabilities add up to 1 before computing the expectation.`],
    grading: '6.5 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key (which writes “E(X) = np” for the variable Y: typo). Distribution of Z checked by enumerating the 120 drawing orders.' };

  EN['p2022-ex6'] = { src: 'S1 midterm 2022 · Ex 6', title: 'Two boxes of lollipops: total probability, Bayes',
    intro: r`<p>We have two boxes of sweets \(A\) and \(B\) that look the same. In \(A\), there are 10 lemon lollipops and 30 cola lollipops. In \(B\), there are 25 lemon lollipops and 15 cola lollipops.</p><p>We randomly choose a box, then a lollipop in this box.</p>`,
    questions: [
      r`<b>1.</b> What is the probability that the lollipop is a lemon one? Detail your steps carefully before the numerical application.`,
      r`<b>2.</b> Given that we picked a lemon lollipop, what is the probability that it comes from box \(A\)?`],
    hints: [
      r`Name the events (\(A\), \(B\), \(C\): “lemon”), then translate: \(\P(A) = \frac{1}{2}\), \(\P(C \mid A) = \frac{10}{40}\)…`,
      r`\(\{A, B\}\) is a partition of the sample space: law of total probability, then Bayes.`],
    solution: [
      { t: 'Question 1: law of total probability', html: M(r`<p>Let \(A\): “the lollipop comes from box \(A\)”, \(B\): “the lollipop comes from box \(B\)” and \(C\): “the lollipop is a lemon one”. \(\{A, B\}\) is a partition of the sample space. We look for \(\P(C)\). Since \(C = (C \cap A) \cup (C \cap B)\) and this union is disjoint,</p><div class="fm">\[\P(C) = \P(C \cap A) + \P(C \cap B) = \P(C \mid A)\P(A) + \P(C \mid B)\P(B) = \frac{10}{40} \times \frac{1}{2} + \frac{25}{40} \times \frac{1}{2} = \frac{1}{8} + \frac{5}{16} = \frac{7}{16}.\]</div>`) +
        T('tree', { first: [{ n: 'A', p: '1/2' }, { n: 'B' }], second: { n: 'C', nb: '\\overline{C}', p: ['1/4', '5/8'] }, edit: false }) },
      { t: 'Question 2: Bayes', html: M(r`<p>We look for \(\P(A \mid C)\). We have</p><div class="fm">\[\P(A \mid C) = \frac{\P(A \cap C)}{\P(C)} = \frac{\P(C \mid A)\P(A)}{\P(C)} = \frac{1/8}{7/16} = \frac{2}{7}.\]</div>`) }],
    answer: r`<ul><li>1. \(\P(C) = \frac{7}{16}\)</li><li>2. \(\P(A \mid C) = \frac{2}{7}\)</li></ul>`,
    traps: [
      r`Computing \(\frac{10 + 25}{80} = \frac{7}{16}\) gives the right number here only because the boxes hold the same number of lollipops: it is not a general method, use the law of total probability.`,
      r`Question 2: divide by \(\P(C)\), not by \(\P(A)\).`],
    grading: '2.5 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key. Fractions recomputed exactly.' };

  EN['p2022-ex7'] = { src: 'S1 midterm 2022 · Ex 7', title: r`Proof: \(\E(aX + b) = a\E(X) + b\)`,
    intro: r`<p>Let \((a, b) \in \R^2\) and \(X\) a finite random variable. Write \(X(\Omega) = \{x_1, x_2, \ldots, x_n\}\) and \(Y = aX + b\).</p>`,
    questions: [r`Show that \(\E(Y) = a\E(X) + b\).`],
    hints: [
      r`\(Y = f(X)\) with \(f : x \mapsto ax + b\): use the transfer theorem \(\E(f(X)) = \sum_i f(x_i)\,\P(X = x_i)\).`,
      r`Split the sum in two, factor out \(a\) and \(b\), and recognise \(\E(X)\) and the sum of the probabilities.`],
    solution: [
      { t: 'The proof of the lecture', html: M(r`<p>The variable \(Y = aX + b\) is of the form \(Y = f(X)\), where \(f\) is the function \(x \mapsto ax + b\). By the transfer theorem,</p><div class="fm">\[\E(Y) = \sum_{i=1}^{n} \P(X = x_i)\,f(x_i) = \sum_{i=1}^{n} \P(X = x_i)\,(a x_i + b) = a \sum_{i=1}^{n} x_i\,\P(X = x_i) + b \sum_{i=1}^{n} \P(X = x_i).\]</div><p>The first sum is \(\E(X)\) and the second one is 1 (sum of the probabilities of the distribution of \(X\)). Finally, \(\E(Y) = a\E(X) + b\).</p>`) }],
    answer: r`<p>Transfer theorem, then linearity of the sum: \(\E(aX + b) = a\sum_i x_i \P(X = x_i) + b\sum_i \P(X = x_i) = a\E(X) + b\).</p>`,
    traps: [
      r`Writing “by linearity of the expectation”: that is exactly what has to be proved.`,
      r`Forgetting to justify \(\sum_i \P(X = x_i) = 1\).`],
    grading: '3 points for the exercise.',
    note: 'The official answer key only says “See the lecture!”: proof taken from the official document “Theorems and proofs”.' };

  EN['p2022-ex8'] = { src: 'S1 midterm 2022 · Ex 8', title: r`Binomial theorem and colouring: \(\sum_k \binom{n}{k} 3^{n-k} = 4^n\)`,
    questions: [
      r`<b>1.</b> Write the binomial theorem (Newton’s formula).`,
      r`<b>2.</b> Using this formula, explain why \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k} = 4^n\).`,
      r`<b>3.</b> The aim is to prove the formula above again by counting. Consider \(n\) boxes. We want to colour each box. For this, we only have 4 felt pens: a blue one, a green one, a red one and a yellow one.<p>(a) Propose a way of colouring these \(n\) boxes that leads to: “there are \(4^n\) ways of colouring the boxes”. Explain your reasoning carefully.</p><p>(b) Propose another way of colouring these \(n\) boxes that leads to: “there are \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k}\) ways of colouring the boxes”. Explain your reasoning carefully.</p><p>(c) Deduce the formula.</p>`],
    hints: [
      r`Binomial theorem with \(a = 1\) and \(b = 3\).`,
      r`(b): sort the colourings by their number \(k\) of green boxes. First choose which boxes are green, then colour the others with the 3 remaining colours.`],
    solution: [
      { t: 'Questions 1 and 2', html: M(r`<p>1. Let \(n \in \N\) and \((a, b) \in \R^2\). Then \(\displaystyle (a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^k b^{n-k}\).</p><p>2. We apply the binomial theorem with \(a = 1\) and \(b = 3\): \(\displaystyle 4^n = (1 + 3)^n = \sum_{k=0}^{n} \binom{n}{k} 1^k\, 3^{n-k} = \sum_{k=0}^{n} \binom{n}{k} 3^{n-k}\).</p>`) },
      { t: 'Question 3: double counting', html: M(r`<p>(a) We colour the \(n\) boxes one by one. For the first box, there are 4 possible colours, for the second one too, …, for the \(n\)-th one too. In total, there are \(4 \times 4 \times \cdots \times 4 = 4^n\) ways of colouring the boxes (\(n\)-lists of colours).</p><p>(b) Let \(k \in \ent{0}{n}\). We take the green pen and choose to colour \(k\) boxes in green: there are \(\binom{n}{k}\) ways of choosing these \(k\) boxes. The \(n - k\) remaining boxes are coloured in blue, red or yellow: 3 possibilities for each, that is \(3^{n-k}\). The cases \(k = 0, 1, \ldots, n\) are disjoint (a colouring has a single number of green boxes). In total, there are \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k}\) ways of colouring the \(n\) boxes.</p><p>(c) We have counted the same colourings in two ways: \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k} = 4^n\), the formula of question 2.</p>`) }],
    answer: r`<ul><li>1. \((a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^k b^{n-k}\).</li><li>2. \(a = 1\), \(b = 3\).</li><li>3. (a) 4 colours per box: \(4^n\); (b) \(k\) green boxes chosen (\(\binom{n}{k}\)), the others in 3 colours (\(3^{n-k}\)), sum over \(k\); (c) the same set counted twice.</li></ul>`,
    traps: [
      r`(b): say that the cases according to \(k\) are disjoint, otherwise the addition is not justified.`,
      r`The remaining boxes can no longer be green: 3 colours, not 4.`],
    grading: '4 points for the exercise; the paper does not split them between questions.',
    note: 'Wording of the official answer key. Identity checked by program for \\(n \\leq 10\\), and by enumerating the colourings for \\(n \\leq 6\\).' };

  /* =====================================================================
     S1 midterm, November 2021 — official English paper
     ===================================================================== */
  var N21 = 'Wording of the official answer key (French), translated.';
  EN['p2021-ex1'] = { src: 'S1 midterm 2021 · Ex 1', title: r`Is the relation \(x^2 \leq y^2\) an order relation?`,
    intro: r`<p>Consider the relation defined on \(\R\) by: \(\forall (x, y) \in \R^2,\ x \mathrel{\mathcal{R}} y \Leftrightarrow x^2 \leq y^2\).</p>`,
    questions: [r`Enumerate the different properties (with the quantifiers) which define an order relation. For each property, say whether it is satisfied or not by the relation defined above. Justify your answer.`],
    hints: [
      r`Order relation = reflexive, antisymmetric, transitive.`,
      r`For antisymmetry, think of \(-1\) and \(1\).`],
    solution: [
      { t: 'The three properties', html: M(r`<p>• \(\mathcal{R}\) is reflexive if \(\forall x \in \R,\ x \mathrel{\mathcal{R}} x\). Let \(x \in \R\). Since \(x^2 \leq x^2\), we have \(x \mathrel{\mathcal{R}} x\). The relation is reflexive.</p><p>• \(\mathcal{R}\) is antisymmetric if \(\forall (x, y) \in \R^2,\ (x \mathrel{\mathcal{R}} y \text{ and } y \mathrel{\mathcal{R}} x) \Rightarrow x = y\). Take \(x = -1\) and \(y = 1\). Since \(x^2 = y^2 = 1\), we have \(x \mathrel{\mathcal{R}} y\) and \(y \mathrel{\mathcal{R}} x\). Yet \(x \neq y\). The relation is not antisymmetric.</p><p>• \(\mathcal{R}\) is transitive if \(\forall (x, y, z) \in \R^3,\ (x \mathrel{\mathcal{R}} y \text{ and } y \mathrel{\mathcal{R}} z) \Rightarrow x \mathrel{\mathcal{R}} z\). Let \((x, y, z) \in \R^3\) such that \(x \mathrel{\mathcal{R}} y\) and \(y \mathrel{\mathcal{R}} z\). Then \(x^2 \leq y^2\) and \(y^2 \leq z^2\). Thus \(x^2 \leq z^2\), hence \(x \mathrel{\mathcal{R}} z\). The relation is transitive.</p><p>\(\mathcal{R}\) is not an order relation.</p>`) }],
    answer: r`<p>Reflexive: yes. Antisymmetric: no (\(-1\) and \(1\)). Transitive: yes. It is not an order relation.</p>`,
    traps: [
      r`Only quoting the names of the properties: the statement requires the quantifiers.`,
      r`Concluding “order relation” without checking the three properties.`],
    grading: '3 points for the exercise.',
    note: N21 + ' Properties checked by program on a grid of reals.' };

  EN['p2021-ex2'] = { src: 'S1 midterm 2021 · Ex 2', title: 'Express three sentences with quantifiers',
    intro: r`<p>Express in mathematical language, with the quantifiers, the following properties.</p>`,
    questions: [
      r`<b>1.</b> Every positive real number is the square of a real number.`,
      r`<b>2.</b> If the product of two real numbers is zero, then at least one of these two numbers is zero.`,
      r`<b>3.</b> Every natural number is even or odd. (Using the congruence relation is not allowed.)`],
    hints: [
      r`“Every” gives \(\forall\); “is the square of a real number”: there exists a real number whose square…`,
      r`Even: \(n = 2p\) for an integer \(p\). Odd: \(n = 2p + 1\).`],
    solution: [
      { t: 'Translations', html: M(r`<p>1. \(\forall x \in \R_+,\ \exists y \in \R,\ x = y^2\)</p><p>2. \(\forall (x, y) \in \R^2,\ xy = 0 \Rightarrow (x = 0 \text{ or } y = 0)\)</p><p>3. \(\forall n \in \N,\ \exists p \in \N,\ n = 2p \text{ or } n = 2p + 1\)</p>`) +
        r`<p>For 3, \(\forall n \in \N,\ (\exists p \in \N,\ n = 2p) \lor (\exists p \in \N,\ n = 2p + 1)\) is also correct.</p>` }],
    answer: r`<ul><li>1. \(\forall x \in \R_+,\ \exists y \in \R,\ x = y^2\)</li><li>2. \(\forall (x, y) \in \R^2,\ xy = 0 \Rightarrow (x = 0 \lor y = 0)\)</li><li>3. \(\forall n \in \N,\ \exists p \in \N,\ n = 2p \lor n = 2p + 1\)</li></ul>`,
    traps: [
      r`1: \(\exists y \in \R,\ \forall x \in \R_+,\ x = y^2\) says that one real number works for all: it is false and it is not the sentence.`,
      r`2: “at least one” is an inclusive “or”, not an “either… or”.`,
      r`3: \((\forall n,\ n \text{ even}) \lor (\forall n,\ n \text{ odd})\) says something else (and it is false).`],
    grading: '3 points for the exercise.',
    note: N21 };

  EN['p2021-ex4'] = { src: 'S1 midterm 2021 · Ex 4', title: r`A function from \(\N\) to \(\N\): injectivity, surjectivity, images`,
    intro: r`<p>Consider the function \(f : \N \to \N\) defined by \(f(n) = \dfrac{n}{2}\) if \(n\) is even and \(f(n) = n\) otherwise.</p>`,
    questions: [
      r`<b>1.</b> Is \(f\) injective? Justify your answer.`,
      r`<b>2.</b> Is \(f\) surjective? Justify your answer.`,
      r`<b>3.</b> Assume in this question that the input set of \(f\) is \(E = \{0, 1, 2, 3, 4, 5, 6\}\) (instead of \(\N\)). Find \(f(\{0, 1, 2, 3\})\), \(f^{-1}(\{1, 3\})\) and \(f^{-1}(\{4\})\).`],
    hints: [
      r`Compute the first values: \(f(0), f(1), f(2), \ldots\) Do two integers have the same image?`,
      r`For any \(n\), look for an even pre-image.`],
    solution: [
      { t: 'Questions 1 and 2', html: M(r`<p>1. We have \(f(1) = 1 = f(2)\) and \(1 \neq 2\). So \(f\) is not injective.</p><p>2. Let \(n \in \N\). Then \(f(2n) = \dfrac{2n}{2} = n\), since \(2n\) is even. Thus \(\forall n \in \N,\ \exists m = 2n \in \N,\ n = f(m)\): \(f\) is surjective.</p>`) },
      { t: 'Question 3: on E', html: '<div class="tbl"><table><thead><tr><th scope="row">\\(n\\)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr></thead><tbody><tr><th scope="row">\\(f(n)\\)</th><td>0</td><td>1</td><td>1</td><td>3</td><td>2</td><td>5</td><td>3</td></tr></tbody></table></div>' +
        T('sagittal', { E: ['0', '1', '2', '3', '4', '5', '6'], F: ['0', '1', '2', '3', '4', '5', '6'], f: { 0: '0', 1: '1', 2: '1', 3: '3', 4: '2', 5: '5', 6: '3' }, mode: 'preimage', B: ['1', '3'] }) +
        M(r`<p>Hence: \(f(\{0, 1, 2, 3\}) = \{0, 1, 3\}\), \(f^{-1}(\{1, 3\}) = \{1, 2, 3, 6\}\) and \(f^{-1}(\{4\}) = \varnothing\).</p>`) }],
    answer: r`<ul><li>1. Not injective: \(f(1) = f(2) = 1\).</li><li>2. Surjective: \(f(2n) = n\).</li><li>3. \(f(\{0, 1, 2, 3\}) = \{0, 1, 3\}\), \(f^{-1}(\{1, 3\}) = \{1, 2, 3, 6\}\), \(f^{-1}(\{4\}) = \varnothing\).</li></ul>`,
    traps: [
      r`\(f^{-1}(\{4\})\) on the whole of \(\N\) would be \(\{8\}\); here the input set is restricted to \(E\): it is \(\varnothing\).`,
      r`Missing a pre-image: 6 has image 3, like 3.`],
    grading: '3.5 points for the exercise; the paper does not split them between questions.',
    note: N21 + ' Images recomputed by program.' };

  EN['p2021-ex5'] = { src: 'S1 midterm 2021 · Ex 5', title: 'Pascal’s formula: by drawing balls, then by computation',
    intro: r`<p>In a box, there are \(n\) balls labeled 1 through \(n\).</p><p>Let \(k \in \ent{1}{n}\). Assume that you simultaneously take \(k\) balls from the box.</p>`,
    questions: [
      r`<b>1.</b> How many possible results? Explain briefly your answer.`,
      r`<b>2.</b> How many results contain the ball labeled 1? Explain briefly.`,
      r`<b>3.</b> How many results do not contain the ball labeled 1? Explain briefly.`,
      r`<b>4.</b> Explain why the previous results enable one to prove the following formula \((P)\): \(\dbinom{n}{k} = \dbinom{n-1}{k} + \dbinom{n-1}{k-1}\).`,
      r`<b>5.</b> Prove this formula \((P)\) with a computation, using the literal expression of the binomial coefficients, with factorials.`],
    hints: [
      r`If ball 1 is in the draw, you still have to choose \(k - 1\) balls among the \(n - 1\) others.`,
      r`A draw contains ball 1 or does not: two disjoint cases.`,
      r`Question 5: use the common denominator \(k!\,(n-k)!\), multiplying by \(\frac{n-k}{n-k}\) and \(\frac{k}{k}\).`],
    solution: [
      { t: 'Questions 1 to 4: by drawing balls', html: M(r`<p>1. Let \(E\) be the set of possible results. Since the draw is simultaneous, it amounts to choosing \(k\) elements out of \(n\): \(\card(E) = \binom{n}{k}\).</p><p>2. Let \(F\) be the set of results containing ball 1. There is only one way of taking ball 1; then we take \(k - 1\) balls out of \(n - 1\): \(\card(F) = 1 \times \binom{n-1}{k-1} = \binom{n-1}{k-1}\).</p><p>3. The set \(\overline{F}\) of results not containing ball 1: we take \(k\) balls out of the \(n - 1\) others, \(\card(\overline{F}) = \binom{n-1}{k}\).</p><p>4. \(E = F \cup \overline{F}\) and this union is disjoint. Hence \(\card(E) = \card(F) + \card(\overline{F})\). Therefore, \(\dbinom{n}{k} = \dbinom{n-1}{k} + \dbinom{n-1}{k-1}\).</p>`) },
      { t: 'Question 5: by computation', html: M(r`<div class="fm">\[\begin{aligned}\binom{n-1}{k} + \binom{n-1}{k-1} &= \frac{(n-1)!}{k!\,(n-k-1)!} + \frac{(n-1)!}{(k-1)!\,(n-k)!} \\ &= \frac{(n-1)! \times (n-k)}{k!\,(n-k-1)! \times (n-k)} + \frac{(n-1)! \times k}{(k-1)!\,(n-k)! \times k} \\ &= \frac{(n-1)!\,(n-k) + (n-1)!\,k}{k!\,(n-k)!} = \frac{(n-1)!\,(n-k+k)}{k!\,(n-k)!} = \frac{n!}{k!\,(n-k)!} = \binom{n}{k}.\end{aligned}\]</div>`) +
        r`<p>The computation assumes \(1 \leq k \leq n - 1\) so that all the factorials make sense; the case \(k = n\) is checked separately (with \(\binom{n-1}{n} = 0\)).</p>` }],
    answer: r`<ul><li>1. \(\binom{n}{k}\); 2. \(\binom{n-1}{k-1}\); 3. \(\binom{n-1}{k}\).</li><li>4. Draws with or without ball 1: a partition, so \(\binom{n}{k} = \binom{n-1}{k} + \binom{n-1}{k-1}\).</li><li>5. Common denominator \(k!\,(n-k)!\), then \((n-1)!\,(n - k + k) = n!\).</li></ul>`,
    traps: [
      r`Question 2: \(\binom{n-1}{k}\) instead of \(\binom{n-1}{k-1}\): ball 1 already takes one of the \(k\) places.`,
      r`Question 4: say that the union is disjoint.`,
      r`Question 5: \(k! = k \times (k-1)!\) and \((n-k)! = (n-k) \times (n-k-1)!\), the two keys of the computation.`],
    grading: '5 points for the exercise; the paper does not split them between questions.',
    note: N21 + ' Pascal’s formula checked by program for \\(n \\leq 12\\). The English paper takes \\(k \\in \\ent{1}{n}\\), the French one \\(k \\leq n\\).' };

  EN['p2021-ex6'] = { src: 'S1 midterm 2021 · Ex 6', title: 'A dice: Bernoulli, binomial, distribution of a score',
    intro: r`<p>Consider a 6-side fair dice.</p>`,
    questions: [
      r`<b>1.</b> Imagine a simple random experiment with the dice, which leads to a random variable \(X\) such that \(X\) is Bernoulli-distributed with the parameter \(p = \frac{1}{6}\). What is the expectation and the variance of \(X\)?`,
      r`<b>2.</b> Imagine a simple random experiment with the dice, which leads to a random variable \(Y\) such that \(Y\) is binomial-distributed with the parameters \(n = 10\) and \(p = \frac{1}{6}\). Express the expectation and the variance of \(Y\) as functions of \(n\) and \(p\).`,
      r`<b>3.</b> In this question, we roll the dice only once. The game is the following: we score 5 points if the dice result is a multiple of 3, 3 points if the dice result is 1 or 2, zero points otherwise. Let \(S\) be the score. Give the distribution of \(S\). Then find its expectation and its variance.`],
    hints: [
      r`An event of probability \(\frac{1}{6}\): “the dice shows 1”.`,
      r`For the binomial variable, repeat the roll 10 times, independently.`,
      r`\(S\) takes the values 0, 3, 5; the multiples of 3 between 1 and 6 are 3 and 6.`],
    solution: [
      { t: 'Questions 1 and 2', html: M(r`<p>1. We roll the dice once. Let \(X\) be the variable equal to 1 if the dice shows 1, and 0 otherwise. Then \(\P(X = 1) = \frac{1}{6}\) and \(\P(X = 0) = \frac{5}{6}\): \(X\) is Bernoulli-distributed with the parameter \(p = \frac{1}{6}\). We know that \(\E(X) = p = \frac{1}{6}\) and \(\V(X) = p(1 - p) = \frac{5}{36}\).</p><p>2. We repeat the previous experiment 10 times, the rolls being independent. Let \(Y\) be the number of times the dice showed 1. \(Y\) is the sum of 10 independent Bernoulli variables with the same parameter \(\frac{1}{6}\): \(Y(\Omega) = \ent{0}{10}\) and, for all \(k \in \ent{0}{10}\), \(\P(Y = k) = \binom{10}{k}\left(\frac{1}{6}\right)^k\left(\frac{5}{6}\right)^{10-k}\). \(Y\) is binomial-distributed with parameters 10 and \(\frac{1}{6}\), so \(\E(Y) = np = \frac{10}{6} = \frac{5}{3}\) and \(\V(Y) = np(1 - p) = \frac{25}{18}\).</p>`) },
      { t: 'Question 3: the score S', html: M(r`<p>\(S\) takes the values 5, 3 and 0. Between 1 and 6, there are 2 multiples of 3 (3 and 6): \(\P(S = 5) = \frac{2}{6} = \frac{1}{3}\). Moreover \(\P(S = 3) = \frac{1}{6} + \frac{1}{6} = \frac{1}{3}\). \(S = 0\) when the dice shows 4 or 5: \(\P(S = 0) = \frac{2}{6} = \frac{1}{3}\).</p><p>\(\E(S) = 0 \times \P(S = 0) + 3 \times \P(S = 3) + 5 \times \P(S = 5) = \frac{8}{3}\).</p><p>\(\E(S^2) = 0^2 \times \P(S = 0) + 3^2 \times \P(S = 3) + 5^2 \times \P(S = 5) = \frac{34}{3}\). Thus \(\V(S) = \E(S^2) - (\E(S))^2 = \frac{34}{3} - \frac{64}{9} = \frac{38}{9}\).</p>`) +
        T('law', { x: [0, 3, 5], p: ['1/3', '1/3', '1/3'], name: 'S' }) }],
    answer: r`<ul><li>1. \(X\) = 1 if the dice shows 1: \(\E(X) = p = \frac{1}{6}\), \(\V(X) = p(1-p) = \frac{5}{36}\).</li><li>2. \(Y\) = number of 1s in 10 independent rolls: \(\E(Y) = np = \frac{5}{3}\), \(\V(Y) = np(1-p) = \frac{25}{18}\).</li><li>3. \(S(\Omega) = \{0, 3, 5\}\), each value with probability \(\frac{1}{3}\); \(\E(S) = \frac{8}{3}\); \(\V(S) = \frac{38}{9}\).</li></ul>`,
    traps: [
      r`\(\V(S) \neq \E(S^2)\): subtract \((\E(S))^2 = \frac{64}{9}\).`,
      r`Giving the distribution of \(S\) means giving \(S(\Omega)\) <b>and</b> the three probabilities.`],
    grading: '5 points for the exercise; the paper does not split them between questions.',
    note: N21 + ' The French paper calls the score G. Values recomputed as exact fractions.' };

  EN['p2021-ex7'] = { src: 'S1 midterm 2021 · Ex 7', title: 'Screening test: total probability, Bayes',
    intro: r`<p>Imagine that a virus affects the world’s population. A screening test has been developed. Its performances are the following:</p><ul><li>If a patient is not contaminated, the test gives the right answer with the probability 80%.</li><li>If a patient is contaminated, the test gives the right answer with the probability 99%.</li></ul><p>Assume that 25% out of the population is contaminated. We randomly pick a person and do the test.</p><p>Consider the events \(C\): “This person is contaminated” and \(T\): “This person is tested positive”.</p>`,
    questions: [
      r`<b>1.</b> Give a partition of the event \(T\) in term of \(C\). Write the literal formula which enables one to get \(\P(T)\). Specify the numerical value of each probability in this formula (the final numerical value of \(\P(T)\) is not required).`,
      r`<b>2.</b> Explain how to compute the probability that this person is contaminated given that she is tested positive (the final numerical value is not required).`],
    hints: [
      r`“Right answer” for a non-contaminated patient means negative: \(\P(\overline{T} \mid \overline{C}) = 0.8\), so \(\P(T \mid \overline{C}) = 0.2\).`,
      r`\(T = (T \cap C) \cup (T \cap \overline{C})\), a disjoint union.`],
    solution: [
      { t: 'Question 1: partition and total probability', html: M(r`<p>\(\{C, \overline{C}\}\) is a partition of the sample space. Thus \(T = (T \cap C) \cup (T \cap \overline{C})\) and this union is disjoint. Hence</p><div class="fm">\[\P(T) = \P(T \cap C) + \P(T \cap \overline{C}) = \P(T \mid C)\P(C) + \P(T \mid \overline{C})\P(\overline{C}).\]</div><p>With \(\P(C) = 0.25\), \(\P(\overline{C}) = 0.75\), \(\P(T \mid C) = 0.99\) and \(\P(T \mid \overline{C}) = 1 - 0.8 = 0.2\): \(\P(T) = 0.99 \times 0.25 + 0.2 \times 0.75\).</p>`) +
        r`<p>Exact value: \(0.2475 + 0.15 = 0.3975 = \frac{159}{400}\) (the answer key rounds it to 0.40).</p>` +
        T('tree', { first: [{ n: 'C', p: '1/4' }, { n: '\\overline{C}' }], second: { n: 'T', nb: '\\overline{T}', p: ['99/100', '1/5'] }, edit: false }) },
      { t: 'Question 2: Bayes', html: M(r`<p>We look for \(\P(C \mid T)\). We have</p><div class="fm">\[\P(C \mid T) = \frac{\P(T \cap C)}{\P(T)} = \frac{\P(T \mid C)\P(C)}{\P(T)} = \frac{0.99 \times 0.25}{0.3975}.\]</div>`) +
        r`<p>Exact value: \(\frac{0.2475}{0.3975} = \frac{33}{53} \approx 0.62\): a positive test means contaminated only about 6 times out of 10.</p>` }],
    answer: r`<ul><li>1. \(T = (T \cap C) \sqcup (T \cap \overline{C})\); \(\P(T) = \P(T \mid C)\P(C) + \P(T \mid \overline{C})\P(\overline{C}) = 0.99 \times 0.25 + 0.2 \times 0.75 = \frac{159}{400}\).</li><li>2. \(\P(C \mid T) = \frac{\P(T \mid C)\P(C)}{\P(T)} = \frac{33}{53}\).</li></ul>`,
    traps: [
      r`Taking \(\P(T \mid \overline{C}) = 0.8\): a “right answer” for a non-contaminated patient is <b>negative</b>.`,
      r`Confusing \(\P(C \mid T)\) (what we look for) and \(\P(T \mid C) = 0.99\).`],
    grading: '4 points for the exercise; the paper does not split them between questions.',
    note: N21 + ' The French paper calls the event “ill” M. The answer key gives rounded values (≈ 0.40 and ≈ 0.62); exact values 159/400 and 33/53 recomputed.' };

  EN['p2021-ex8'] = { src: 'S1 midterm 2021 · Ex 8', title: 'Geometric sum by induction',
    intro: r`<p>Let \(q \in \R\). For any \(n \in \N\), consider the sum \(S_n = \displaystyle\sum_{k=0}^{n} q^k = q^0 + q^1 + q^2 + \ldots + q^n\).</p>`,
    questions: [
      r`<b>1.</b> What is the value of \(S_n\) when \(q = 1\)?`,
      r`<b>2.</b> Assume that \(q \neq 1\). Show by induction that, for every \(n \in \N\), \(S_n = \dfrac{1 - q^{n+1}}{1 - q}\).`],
    hints: [
      r`If \(q = 1\), every term is 1: how many terms are there from \(k = 0\) to \(k = n\)?`,
      r`Induction step: \(S_{n+1} = S_n + q^{n+1}\), then the induction hypothesis, then a common denominator.`],
    solution: [
      { t: 'Question 1: the case q = 1', html: M(r`<p>\(S_n = 1 + 1 + \ldots + 1\) and there are \(n + 1\) terms. So \(S_n = n + 1\).</p>`) },
      { t: 'Question 2: induction', html: M(r`<p>For \(n \in \N\), let \(\mathcal{P}(n)\) be: “\(S_n = \dfrac{1 - q^{n+1}}{1 - q}\)”.</p><p><b>Base case.</b> \(n = 0\): \(S_0 = q^0 = 1\) and \(\dfrac{1 - q^{0+1}}{1 - q} = 1\). \(\mathcal{P}(0)\) is true.</p><p><b>Induction step.</b> Assume \(\mathcal{P}(n)\) is true for some \(n \in \N\) and let us show \(\mathcal{P}(n+1)\). We have</p><div class="fm">\[S_{n+1} = \sum_{k=0}^{n+1} q^k = \sum_{k=0}^{n} q^k + q^{n+1} = \frac{1 - q^{n+1}}{1 - q} + q^{n+1} = \frac{1 - q^{n+1} + q^{n+1}(1 - q)}{1 - q} = \frac{1 - q^{n+2}}{1 - q},\]</div><p>using the induction hypothesis. \(\mathcal{P}(n+1)\) is true.</p><p><b>Conclusion.</b> \(\mathcal{P}(0)\) is true and \(\mathcal{P}\) is hereditary: by induction, for every \(n \in \N\), \(S_n = \dfrac{1 - q^{n+1}}{1 - q}\).</p>`) }],
    answer: r`<ul><li>1. \(S_n = n + 1\).</li><li>2. Base case \(S_0 = 1\); induction step \(S_{n+1} = S_n + q^{n+1}\); conclusion.</li></ul>`,
    traps: [
      r`\(n\) terms instead of \(n + 1\) (the sum starts at \(k = 0\)).`,
      r`Writing “assume \(\mathcal{P}(n)\) is true for all \(n\)”: that assumes what you want to prove. Assume \(\mathcal{P}(n)\) for one given \(n\).`],
    grading: '2 points for the exercise.',
    note: N21 + ' Formula checked by symbolic computation (sympy) for \\(n \\leq 30\\).' };

  /* =====================================================================
     Midterm 1, November 2020 — translated (handwritten answer key)
     ===================================================================== */
  var N20 = 'Answers of the official handwritten answer key, wording completed.';
  var REL20 = r`<p>Let \(\mathcal{C}\) be the set of the students of a class. On \(\mathcal{C}\), define the relation: \(\forall (e, e') \in \mathcal{C}^2,\ e \mathrel{\mathcal{R}} e' \Leftrightarrow\) “\(e\) lives less than 5 min away from \(e'\)”. We write \(e \not\mathrel{\mathcal{R}} e'\) if: “\(e\) lives strictly more than 5 min away from \(e'\)”.</p>`;
  EN['p2020-ex1'] = { src: 'Midterm 1 2020 · Ex 1', title: 'Express sentences about a relation between students',
    intro: REL20 + r`<p>Express the following sentences with quantifiers.</p><p>Example: “One of the students of the class lives less than 5 min away from all the other students.” is written: \(\exists e \in \mathcal{C},\ \forall e' \in \mathcal{C},\ e \mathrel{\mathcal{R}} e'\).</p>`,
    questions: [
      r`<b>a.</b> Every student has at least one classmate living less than 5 min away from him.`,
      r`<b>b.</b> One of the students has no classmate living less than 5 min away from him.`,
      r`<b>c.</b> If a student \(e\) lives less than 5 min away from a student \(e'\) and \(e'\) lives less than 5 min away from \(e''\), then \(e\) lives less than 5 min away from \(e''\).`],
    hints: [
      r`“Every student”: \(\forall e\); “at least one classmate”: \(\exists e'\). The order of the quantifiers follows the order of the sentence.`,
      r`b is the negation of a.`,
      r`A student lives less than 5 min away from himself: a “classmate” is another student, \(e' \neq e\).`],
    solution: [
      { t: 'Translations', html: M(r`<p>a. \(\forall e \in \mathcal{C},\ \exists e' \in \mathcal{C} \setminus \{e\},\ e \mathrel{\mathcal{R}} e'\)</p><p>b. \(\exists e \in \mathcal{C},\ \forall e' \in \mathcal{C} \setminus \{e\},\ e \not\mathrel{\mathcal{R}} e'\)</p><p>c. \(\forall (e, e', e'') \in \mathcal{C}^3,\ (e \mathrel{\mathcal{R}} e' \text{ and } e' \mathrel{\mathcal{R}} e'') \Rightarrow e \mathrel{\mathcal{R}} e''\)</p>`) +
        r`<p>The answer key writes \(\exists e' \in \mathcal{C}\) and \(\forall e' \in \mathcal{C}\), without excluding \(e\). But \(e \mathrel{\mathcal{R}} e\) is always true (you live 0 min away from yourself): with \(e' \in \mathcal{C}\), sentence a would always be true and sentence b always false. Excluding \(e\) translates the word “classmate”. Sentence c is the transitivity of \(\mathcal{R}\).</p>` }],
    answer: r`<ul><li>a. \(\forall e \in \mathcal{C},\ \exists e' \in \mathcal{C} \setminus \{e\},\ e \mathrel{\mathcal{R}} e'\)</li><li>b. \(\exists e \in \mathcal{C},\ \forall e' \in \mathcal{C} \setminus \{e\},\ e \not\mathrel{\mathcal{R}} e'\)</li><li>c. \(\forall (e, e', e'') \in \mathcal{C}^3,\ (e \mathrel{\mathcal{R}} e' \land e' \mathrel{\mathcal{R}} e'') \Rightarrow e \mathrel{\mathcal{R}} e''\)</li></ul>`,
    traps: [
      r`Swapping the order: \(\exists e',\ \forall e\) would say that one student is close to everybody.`,
      r`b: negating “at least one” gives “none”, that is \(\forall e',\ e \not\mathrel{\mathcal{R}} e'\).`],
    grading: '3 points for the exercise.',
    note: N20 + ' The answer key does not exclude \\(e\' = e\\): its translation of a is always true and that of b always false. The version on this site excludes \\(e\\); know both.' };

  EN['p2020-ex2'] = { src: 'Midterm 1 2020 · Ex 2', title: 'Living less than 5 minutes away: an order relation?',
    intro: REL20 + r`<p>We consider again the relation \(\mathcal{R}\) of exercise 1.</p>`,
    questions: [r`Enumerate the properties that define an order relation. For each of them, say whether the relation \(\mathcal{R}\) satisfies it and justify your answer.`],
    hints: [
      r`Order relation = reflexive, antisymmetric, transitive.`,
      r`To disprove, describe a concrete situation: two neighbouring students, three students in a row.`],
    solution: [
      { t: 'The three properties', html: M(r`<p>\(\mathcal{R}\) is an order relation if it is reflexive, antisymmetric and transitive.</p><p><b>Reflexive</b>: \(\forall e \in \mathcal{C},\ e \mathrel{\mathcal{R}} e\). True: every student lives less than 5 min away from himself.</p><p><b>Antisymmetric</b>: \(\forall (e, e') \in \mathcal{C}^2,\ (e \mathrel{\mathcal{R}} e' \text{ and } e' \mathrel{\mathcal{R}} e) \Rightarrow e = e'\). False as soon as two distinct students live less than 5 min away from each other: then \(e \mathrel{\mathcal{R}} e'\), \(e' \mathrel{\mathcal{R}} e\) and \(e \neq e'\).</p><p><b>Transitive</b>: \(\forall (e, e', e'') \in \mathcal{C}^3,\ (e \mathrel{\mathcal{R}} e' \text{ and } e' \mathrel{\mathcal{R}} e'') \Rightarrow e \mathrel{\mathcal{R}} e''\). False in general: if \(e'\) lives 4 min away from \(e\) and \(e''\) 4 min away from \(e'\) in the opposite direction, \(e''\) is 8 min away from \(e\).</p><p>\(\mathcal{R}\) is not an order relation.</p>`) }],
    answer: r`<p>Reflexive: yes. Antisymmetric: no (two distinct neighbours). Transitive: no (\(e'\) between \(e\) and \(e''\), 4 min from each). Not an order relation.</p>`,
    traps: [
      r`\(\mathcal{R}\) is symmetric, which does not help: antisymmetry requires \(e = e'\).`,
      r`A counterexample must be concrete (distances), not “it is not always true”.`],
    grading: '4 points for the exercise.',
    note: N20 };

  EN['p2020-ex4'] = { src: 'Midterm 1 2020 · Ex 4', title: r`\(x \mapsto (x - 2)^2 - 1\): make it injective, make it surjective`,
    intro: r`<p>Let \(E = \R\), \(F = \R\) and \(f : E \to F,\ x \mapsto (x - 2)^2 - 1\), whose graph is drawn here.</p>` + FIG.parab,
    questions: [
      r`<b>a.</b> Is \(f\) injective? Surjective? Justify your answer.`,
      r`<b>b.</b> Find an interval \(I\) of \(\R\) such that, replacing only one of the sets \(E\) or \(F\) with \(I\), \(f\) is injective. Justify your answer.`,
      r`<b>c.</b> Find an interval \(J\) of \(\R\) such that, replacing only one of the sets \(E\) or \(F\) with \(J\), \(f\) is surjective. Justify your answer.`],
    hints: [
      r`The parabola has its vertex at \((2, -1)\): symmetric about \(x = 2\), minimum \(-1\).`,
      r`Injective: shrink the input set to one branch (where \(f\) is strictly monotonic). Surjective: shrink the output set to \(f(\R)\).`],
    solution: [
      { t: 'Answers', html: M(r`<p>a. \(f(1) = f(3) = 0\) and \(1 \neq 3\): \(f\) is not injective. For every \(x \in \R\), \(f(x) \geq -1\), so \(-2\) has no pre-image: \(f\) is not surjective.</p><p>b. Replace \(E\) with \(I = [2, +\infty[\). \(f\) is strictly increasing on \(I\): \(\forall (x, y) \in I^2,\ x < y \Rightarrow f(x) < f(y)\). So two distinct elements of \(I\) have distinct images: \(f\) is injective from \(I\) to \(\R\).</p><p>c. Replace \(F\) with \(J = [-1, +\infty[\). Then \(f(\R) = J\), since \(\min_{\R} f = f(2) = -1\), \(\lim_{+\infty} f = +\infty\) and \(f\) is continuous on \(\R\). So \(f\) is surjective from \(\R\) to \(J\): for \(y \geq -1\), \(x = 2 + \sqrt{y + 1}\) satisfies \(f(x) = y\).</p>`) }],
    answer: r`<ul><li>a. Not injective (\(f(1) = f(3) = 0\)), not surjective (\(-2\) has no pre-image).</li><li>b. \(E\) replaced with \(I = [2, +\infty[\) (strictly increasing).</li><li>c. \(F\) replaced with \(J = [-1, +\infty[ = f(\R)\).</li></ul>`,
    traps: [
      r`“Increasing so injective”: it must be <b>strictly</b> monotonic.`,
      r`Shrinking the input set does not make it surjective: the output set must be replaced with \(f(\R)\).`,
      r`\(]-\infty, 2]\) also works for b (\(f\) is strictly decreasing there).`],
    grading: '3 points for the exercise.',
    note: N20 + ' Images recomputed by program.' };

  EN['p2020-ex5'] = { src: 'Midterm 1 2020 · Ex 5', title: r`Symmetry of binomial coefficients: \(\binom{n}{p} = \binom{n}{n-p}\)`,
    intro: r`<p>Let \((n, p) \in \N^2\), \(p \leq n\).</p>`,
    questions: [
      r`<b>1.</b> Which relation links \(\dbinom{n}{p}\) and \(\dbinom{n}{n-p}\)?`,
      r`<b>2.</b> Prove this relation by computation.`,
      r`<b>3.</b> Let \(E\) be a set with \(n\) elements. What does the number \(\dbinom{n}{p}\) count? And \(\dbinom{n}{n-p}\)? How can the relation of question 1 be justified?`],
    hints: [
      r`Write \(\binom{n}{n-p}\) with factorials and simplify \(n - (n - p)\).`,
      r`Choosing the \(p\) elements of a subset is also choosing the \(n - p\) elements that are left out.`],
    solution: [
      { t: 'Answers', html: M(r`<p>1. \(\dbinom{n}{p} = \dbinom{n}{n-p}\).</p><p>2. \(\dbinom{n}{n-p} = \dfrac{n!}{(n-p)!\,\big(n - (n-p)\big)!} = \dfrac{n!}{(n-p)!\,p!} = \dbinom{n}{p}\).</p><p>3. \(\binom{n}{p}\) is the number of \(p\)-element subsets of \(E\); \(\binom{n}{n-p}\) is the number of \((n - p)\)-element subsets. When we choose a subset \(A\) with \(p\) elements, its complement \(\overline{A}\) has \(n - p\) elements, and \(A \mapsto \overline{A}\) associates with each \(p\)-element subset a unique \((n - p)\)-element subset (it is a bijection: \(\overline{\overline{A}} = A\)). So there are as many \(p\)-element subsets as \((n - p)\)-element subsets.</p>`) }],
    answer: r`<ul><li>1. \(\binom{n}{p} = \binom{n}{n-p}\).</li><li>2. \(n - (n - p) = p\) in the factorial.</li><li>3. Subsets with \(p\) and with \(n - p\) elements; taking the complement.</li></ul>`,
    traps: [
      r`Question 3: you must say why the two numbers are equal (the complement), not only what they count.`],
    grading: '4 points for the exercise.',
    note: N20 + ' Symmetry checked by program for \\(n \\leq 15\\).' };

  EN['p2020-ex6'] = { src: 'Midterm 1 2020 · Ex 6', title: r`Induction: \(\frac{2^n}{n!} \leq \frac{9}{2}\left(\frac{2}{3}\right)^n\) for \(n \geq 2\)`,
    questions: [r`Show by induction the following property: \(\forall n \in \N,\ n \geq 2,\ \dfrac{2^n}{n!} \leq \dfrac{9}{2}\left(\dfrac{2}{3}\right)^n\).`],
    hints: [
      r`The base case is \(n = 2\), not 0.`,
      r`\(\dfrac{2^{n+1}}{(n+1)!} = \dfrac{2^n}{n!} \times \dfrac{2}{n+1}\), and for \(n \geq 2\), \(\dfrac{2}{n+1} \leq \dfrac{2}{3}\).`],
    solution: [
      { t: 'Writing the induction', html: M(r`<p>Let \(\mathcal{P}(n)\) be: “\(\dfrac{2^n}{n!} \leq \dfrac{9}{2}\left(\dfrac{2}{3}\right)^n\)”.</p><p><b>Base case</b>: \(n = 2\). \(\dfrac{2^2}{2!} = \dfrac{4}{2} = 2\) and \(\dfrac{9}{2}\left(\dfrac{2}{3}\right)^2 = \dfrac{9}{2} \times \dfrac{4}{9} = 2\). So \(\mathcal{P}(2)\) is true.</p><p><b>Induction step</b>: assume that, for some \(n \geq 2\), \(\mathcal{P}(n)\) is true; let us show that \(\mathcal{P}(n+1)\) is true, that is \(\dfrac{2^{n+1}}{(n+1)!} \leq \dfrac{9}{2}\left(\dfrac{2}{3}\right)^{n+1}\).</p><div class="fm">\[\frac{2^{n+1}}{(n+1)!} = \frac{2^n}{n!} \times \frac{2}{n+1} \leq \frac{9}{2}\left(\frac{2}{3}\right)^n \times \frac{2}{n+1} \quad \text{since } \mathcal{P}(n) \text{ is true.}\]</div><p>Now \(n \geq 2\) gives \(n + 1 \geq 3\), so \(\dfrac{2}{n+1} \leq \dfrac{2}{3}\). Thus</p><div class="fm">\[\frac{2^{n+1}}{(n+1)!} \leq \frac{9}{2}\left(\frac{2}{3}\right)^n \times \frac{2}{3} = \frac{9}{2}\left(\frac{2}{3}\right)^{n+1}.\]</div><p>So, for every \(n \geq 2\), \(\mathcal{P}(n) \Rightarrow \mathcal{P}(n+1)\).</p><p><b>Conclusion</b>: \(\mathcal{P}(2)\) is true and \(\forall n \geq 2,\ \mathcal{P}(n) \Rightarrow \mathcal{P}(n+1)\). By induction, \(\mathcal{P}(n)\) is true for every \(n \geq 2\).</p>`) }],
    answer: r`<p>Base case: \(2 \leq 2\). Induction step: \(\frac{2^{n+1}}{(n+1)!} = \frac{2^n}{n!} \cdot \frac{2}{n+1}\) and \(\frac{2}{n+1} \leq \frac{2}{3}\) for \(n \geq 2\). Conclusion.</p>`,
    traps: [
      r`Multiplying an inequality by \(\frac{2}{n+1}\) is allowed because this number is positive: say so.`,
      r`Forgetting to use \(n \geq 2\): this is what gives \(\frac{2}{n+1} \leq \frac{2}{3}\).`,
      r`Write the conclusion with the right starting point: “for every \(n \geq 2\)”.`],
    grading: '4 points for the exercise.',
    note: N20 + ' Inequality checked with exact fractions for \\(2 \\leq n \\leq 40\\) (equality at \\(n = 2\\)).' };

  EN['p2020-ex7'] = { src: 'Midterm 1 2020 · Ex 7', title: '5-letter words, with or without repetition',
    intro: r`<p>1. In this exercise, the exact numerical value is not required. Only the formula applied to the data of the exercise is expected.</p><p>2. The questions of this exercise are independent.</p><p>Consider the set \(E = \{a, b, c, d, e, f, g, h, i, j, k, l\}\).</p>`,
    questions: [
      r`<b>1.</b> Let \(M_5(E)\) be the set of five-letter words built from the letters of \(E\) with repetition, for example: “kabke”.<p>a. What is the cardinality of \(M_5(E)\)?</p><p>b. How many words of \(M_5(E)\) contain the letter “l” at least once?</p><p>c. How many anagrams does the word “babab” have?</p>`,
      r`<b>2.</b> Let \(N_5(E)\) be the set of 5-letter words without repetition built from the letters of \(E\). Example: “kgehj”.<p>a. What is the cardinality of \(N_5(E)\)?</p><p>b. How many words of \(N_5(E)\) end with a vowel?</p><p>c. How many words of \(N_5(E)\) contain none of the letters \(\{a, d, e, f, h\}\)?</p><p>d. How many words of \(N_5(E)\) contain at least one of the letters \(\{a, d, e, f, h\}\)?</p>`],
    hints: [
      r`\(E\) has 12 letters. With repetition: 5-lists, \(12^5\). Without repetition: arrangements \(A_{12}^5\).`,
      r`“At least”: total minus “none”. The vowels of \(E\) are a, e, i.`,
      r`“babab”: 5 letters, three b and two a.`],
    solution: [
      { t: 'Question 1: with repetition', html: M(r`<p>a. A word is a 5-list of letters of \(E\) (12 letters), with repetition: \(\card(M_5(E)) = 12^5\).</p><p>b. We count the complement: there are \(11^5\) words without “l”. So \(12^5 - 11^5\) words contain at least one “l”.</p><p>c. An anagram of “babab” is determined by the places of the two “a” among the 5 places: \(\dbinom{5}{2} = \dfrac{5!}{3!\,2!} = 10\) anagrams.</p>`) +
        r`<p>Values: \(248\,832\); \(248\,832 - 161\,051 = 87\,781\); \(10\).</p>` },
      { t: 'Question 2: without repetition', html: M(r`<p>a. A word without repetition is an arrangement of 5 letters out of 12: \(\card(N_5(E)) = A_{12}^5 = 12 \times 11 \times 10 \times 9 \times 8\).</p><p>b. The vowels of \(E\) are a, e, i. We first choose the last letter (3 choices), then the first 4 letters among the 11 remaining ones, in order: \(3 \times A_{11}^4 = 3 \times 11 \times 10 \times 9 \times 8\).</p><p>c. Without the letters a, d, e, f, h, 7 letters remain: \(A_7^5 = \dfrac{7!}{2!} = 7 \times 6 \times 5 \times 4 \times 3\).</p><p>d. Complement of c: \(A_{12}^5 - A_7^5\).</p>`) +
        r`<p>Values: \(95\,040\); \(23\,760\); \(2\,520\); \(95\,040 - 2\,520 = 92\,520\).</p>` }],
    answer: r`<ul><li>1. a. \(12^5\); b. \(12^5 - 11^5\); c. \(\frac{5!}{3!\,2!} = 10\).</li><li>2. a. \(A_{12}^5\); b. \(3 \times A_{11}^4\); c. \(A_7^5 = \frac{7!}{2!}\); d. \(A_{12}^5 - A_7^5\).</li></ul>`,
    traps: [
      r`2.b: start with the constraint (the last letter), then fill the other places.`,
      r`“babab”: divide by \(3!\) and \(2!\) (repeated letters).`,
      r`1.b: \(5 \times 12^4\) counts several times the words with two or more “l”.`],
    grading: '7 points for the exercise; only the applied formula is expected.',
    note: N20 + ' Values checked by exhaustive enumeration.' };

  /* =====================================================================
     Midterm 1, October 2019 — translated (answer key with three mistakes)
     ===================================================================== */
  EN['p2019-ex1'] = { src: 'Midterm 1 2019 · Ex 1', title: r`Four quantified statements about \(x + y^2 = 0\)`,
    intro: r`<p>For all real numbers \(x\) and \(y\), let \(P(x, y)\) be the statement \(x + y^2 = 0\). Are the following statements true? Justify your answer.</p>`,
    questions: [
      r`<b>1.</b> \(\forall x \in \R\ \ \forall y \in \R\ \ P(x, y)\)`,
      r`<b>2.</b> \(\forall x \in \R\ \ \exists y \in \R\ \ P(x, y)\)`,
      r`<b>3.</b> \(\forall y \in \R\ \ \exists x \in \R\ \ P(x, y)\)`,
      r`<b>4.</b> \(\exists x \in \R\ \ \exists y \in \R\ \ P(x, y)\)`],
    hints: [
      r`\(P(x, y)\) is equivalent to \(x = -y^2\): \(x\) must be non-positive.`,
      r`A false \(\forall\) is disproved by a counterexample; a true \(\exists\) is proved by a witness.`],
    solution: [
      { t: 'True or false', html: M(r`<p>1. False: for \(x = y = 1\), \(x + y^2 = 2 \neq 0\).</p><p>2. False: for \(x = 1\), \(1 + y^2 \geq 1 > 0\) for every real \(y\); no \(y\) works.</p><p>3. True: let \(y \in \R\); take \(x = -y^2\), then \(x + y^2 = 0\).</p><p>4. True: \(x = y = 0\) works.</p>`) }],
    answer: r`<p>1. False; 2. False; 3. True; 4. True.</p>`,
    traps: [
      r`2 and 3 only differ by the order of the variables: \(x\) given then \(y\) looked for, or the other way round. Here \(x = -y^2\) can always be computed, \(y = \sqrt{-x}\) only if \(x \leq 0\).`,
      r`For 2, one \(x\) that fails is enough, but you must show that <b>no</b> \(y\) works for this \(x\).`],
    grading: '2 points for the exercise.',
    note: 'Answers of the official answer key, justifications completed. Checked by program.' };

  EN['p2019-ex3'] = { src: 'Midterm 1 2019 · Ex 3', title: r`Injectivity, surjectivity between \(\N\) and \(2\N\)`,
    intro: r`<p>Let \(E = \N\) and \(F = 2\N\), where \(2\N\) is the set of even natural numbers. Let \(f : E \to F,\ x \mapsto 2x + 4\) and \(g : F \to E,\ x \mapsto \dfrac{x}{2} + 2\).</p>`,
    questions: [
      r`<b>1.</b> Is \(f\) injective? Surjective? Justify your answer.`,
      r`<b>2.</b> Is \(g\) injective? Surjective? Justify your answer.`],
    hints: [
      r`Compute \(f(0)\): which even values are reached?`,
      r`\(g(0) = 2\): which natural numbers are never reached by \(g\)?`],
    solution: [
      { t: 'Answers', html: M(r`<p>1. \(f\) is injective: if \((x, y) \in E^2\) satisfies \(f(x) = f(y)\), then \(2x + 4 = 2y + 4\), so \(x = y\). \(f\) is not surjective: \(2 \in F\) has no pre-image, since \(2x + 4 = 2\) gives \(x = -1 \notin \N\).</p><p>2. \(g\) is injective: if \((x, y) \in F^2\) satisfies \(g(x) = g(y)\), then \(\dfrac{x}{2} + 2 = \dfrac{y}{2} + 2\), so \(x = y\). \(g\) is not surjective: \(1 \in E\) has no pre-image, since \(\dfrac{x}{2} + 2 = 1\) gives \(x = -2 \notin 2\N\).</p>`) +
        r`<p>\(f(\N) = \{4, 6, 8, \ldots\}\) and \(g(2\N) = \{2, 3, 4, \ldots\}\): 0 and 2 are missing from the first, 0 and 1 from the second.</p>` }],
    answer: r`<ul><li>1. \(f\) injective, not surjective (2 has no pre-image).</li><li>2. \(g\) injective, not surjective (1 has no pre-image).</li></ul>`,
    traps: [
      r`Look at the sets: the pre-image must be in the input set (\(-1 \notin \N\), \(-2 \notin 2\N\)).`,
      r`\(g\) is not the inverse of \(f\): \(g(f(x)) = x + 4\).`],
    grading: '2 points for the exercise.',
    note: 'Wording of the official answer key. Images checked by program.' };

  EN['p2019-ex4'] = { src: 'Midterm 1 2019 · Ex 4', title: r`An equivalence relation on \(\Z \times \Z^*\)`,
    intro: r`<p>On \(E = \Z \times \Z^*\), define the relation \(\mathcal{R}\) by \((a, b) \mathrel{\mathcal{R}} (a', b') \Leftrightarrow ab' = ba'\).</p>`,
    questions: [r`Show that \(\mathcal{R}\) is an equivalence relation.`],
    hints: [
      r`Equivalence relation = reflexive, symmetric, transitive.`,
      r`Transitivity: multiply \(ab' = ba'\) by \(b''\), use \(a'b'' = b'a''\), then simplify by \(b' \neq 0\).`],
    solution: [
      { t: 'The three properties', html: M(r`<p><b>Reflexive.</b> Let \((a, b) \in E\). Then \(ab = ba\), so \((a, b) \mathrel{\mathcal{R}} (a, b)\).</p><p><b>Symmetric.</b> Let \((a, b), (a', b') \in E\) such that \((a, b) \mathrel{\mathcal{R}} (a', b')\). Then \(ab' = ba'\), so \(a'b = b'a\), hence \((a', b') \mathrel{\mathcal{R}} (a, b)\).</p><p><b>Transitive.</b> Let \((a, b), (a', b'), (a'', b'') \in E\) such that \((a, b) \mathrel{\mathcal{R}} (a', b')\) and \((a', b') \mathrel{\mathcal{R}} (a'', b'')\). Then \(ab' = ba'\) and \(a'b'' = b'a''\). Since \(b\), \(b'\), \(b''\) are non-zero, \(\dfrac{a}{b} = \dfrac{a'}{b'}\) and \(\dfrac{a'}{b'} = \dfrac{a''}{b''}\). Thus \(\dfrac{a}{b} = \dfrac{a''}{b''}\), so \(ab'' = ba''\): \((a, b) \mathrel{\mathcal{R}} (a'', b'')\).</p><p>\(\mathcal{R}\) is reflexive, symmetric and transitive: it is an equivalence relation.</p>`) +
        r`<p>Without fractions: \(ab'b'' = ba'b'' = b\,b'a''\), then simplify by \(b' \neq 0\). This is where \(b' \in \Z^*\) is used.</p>` }],
    answer: r`<p>Reflexive (\(ab = ba\)), symmetric (\(ab' = ba' \Rightarrow a'b = b'a\)), transitive (\(\frac{a}{b} = \frac{a'}{b'} = \frac{a''}{b''}\), non-zero denominators): an equivalence relation.</p>`,
    traps: [
      r`Dividing by \(a'\) (which can be zero) instead of \(b'\) (non-zero by definition of \(E\)).`,
      r`Forgetting one of the three properties.`],
    grading: '1.5 points for the exercise.',
    note: 'Wording of the official answer key. Properties checked by enumeration on \\(\\ent{-6}{6} \\times (\\ent{-6}{6} \\setminus \\{0\\})\\).' };

  EN['p2019-ex5'] = { src: 'Midterm 1 2019 · Ex 5', title: 'Drawing balls, anagrams, committees of a student club',
    questions: [
      r`<b>1.</b> A bag contains \(n\) table tennis balls numbered from 1 to \(n\). We draw \(p\) balls one after the other, putting back into the bag each time the ball we have just drawn. How many possible draws are there?`,
      r`<b>2.</b> Same question if, at each draw, the selected ball is not put back into the bag.`,
      r`<b>3.</b> Find the number of anagrams of the words “table” and “tableau”.`,
      r`<b>4.</b> Imagine an EPITA student club with \(n\) members (\(n \in \N^*\)). A committee is a choice of a set of advisers, whose number can go from 1 to \(n\), together with a president who is one of the advisers. Find the number of such committees.`],
    hints: [
      r`With replacement: \(n\) choices at each draw. Without replacement: one fewer each time (you need \(p \leq n\)).`,
      r`Count the letters of “tableau”: t, a, b, l, e, a, u. The letter “a” is repeated.`,
      r`Committee: first choose the president, then any subset of the \(n - 1\) other members.`],
    solution: [
      { t: 'Questions 1 and 2', html: M(r`<p>1. Each draw offers \(n\) possibilities (the ball is put back): \(n^p\) draws (\(p\)-lists).</p><p>2. Without replacement (\(p \leq n\)): \(A_n^p = n(n-1)\cdots(n-p+1) = \dfrac{n!}{(n-p)!}\) draws.</p>`) },
      { t: 'Question 3: anagrams', html: M(r`<p>The anagrams of “table” are the permutations of the 5 distinct letters t, a, b, l, e: there are \(5! = 120\) of them.</p><p>“tableau” has 7 letters (t, a, b, l, e, a, u), the letter “a” appearing twice. Swapping the two “a” does not change the word: there are \(\dfrac{7!}{2!} = 2\,520\) anagrams.</p>`) +
        r`<p>The official answer key writes \(\frac{5!}{2!} = 60\): it counts 5 letters instead of 7. This is wrong.</p>` },
      { t: 'Question 4: committees', html: M(r`<p>There are \(n\) ways of choosing the president among the \(n\) members. The other advisers (if any) form any subset of the set of the \(n - 1\) other members: \(2^{n-1}\) choices. In total, there are \(n\,2^{n-1}\) possible committees.</p>`) +
        r`<p>Another computation: \(\sum_{k=1}^{n} k\binom{n}{k}\) (\(k\) advisers, then the president among them); it gives \(n\,2^{n-1}\) again, checked for \(n \leq 8\).</p>` }],
    answer: r`<ul><li>1. \(n^p\)</li><li>2. \(A_n^p = \frac{n!}{(n-p)!}\)</li><li>3. “table”: \(5! = 120\); “tableau”: \(\frac{7!}{2!} = 2\,520\)</li><li>4. \(n\,2^{n-1}\)</li></ul>`,
    traps: [
      r`Count the letters before applying the formula: “tableau” has 7.`,
      r`With replacement: \(n^p\), not \(p^n\).`,
      r`Committee: the president is one of the advisers; do not count him again among the others.`],
    grading: '3 points for the exercise.',
    note: 'The official answer key is correct for questions 1, 2 and 4; wrong for “tableau” (60 instead of 2520). Anagrams and committees checked by enumeration.' };

  EN['p2019-ex6'] = { src: 'Midterm 1 2019 · Ex 6', title: 'Three balls drawn from a bag of three colours',
    intro: r`<p>In this exercise, the exact numerical value is not required: if the results are fractions, just give the numerators and the denominators explicitly.</p><p>A bag contains 2 white balls, 3 green balls and 5 red balls. We simultaneously draw 3 balls. Find the probability, when drawing these 3 balls, of getting</p>`,
    questions: [
      r`<b>1.</b> a single colour?`,
      r`<b>2.</b> the three colours among these 3 balls?`,
      r`<b>3.</b> at least two colours?`],
    hints: [
      r`Sample space: the 3-element subsets of the 10 balls, all equally likely: \(\binom{10}{3} = 120\) draws.`,
      r`A single colour: three red or three green (there are only 2 white balls).`,
      r`“At least two colours” is the complement of “a single colour”.`],
    solution: [
      { t: 'Answers', html: M(r`<p>The \(\binom{10}{3} = 120\) simultaneous draws are equally likely.</p><p>1. Getting 3 balls of a single colour means getting 3 red balls (out of 5) or 3 green balls (out of 3); it is impossible in white. The probability is \(\dfrac{\binom{5}{3} + \binom{3}{3}}{\binom{10}{3}} = \dfrac{11}{120}\).</p><p>2. The three colours: 1 red (out of 5) and 1 green (out of 3) and 1 white (out of 2). The probability is \(\dfrac{\binom{5}{1}\binom{3}{1}\binom{2}{1}}{\binom{10}{3}} = \dfrac{30}{120} = \dfrac{1}{4}\).</p><p>3. “At least two colours” is the complement of “a single colour”: \(1 - \dfrac{11}{120} = \dfrac{109}{120}\).</p>`) }],
    answer: r`<ul><li>1. \(\frac{\binom{5}{3} + \binom{3}{3}}{\binom{10}{3}} = \frac{11}{120}\)</li><li>2. \(\frac{5 \times 3 \times 2}{120} = \frac{1}{4}\)</li><li>3. \(\frac{109}{120}\)</li></ul>`,
    traps: [
      r`Counting \(\binom{2}{3}\) for the white balls: it is 0, there are only two white balls.`,
      r`Question 3: use the complement rather than adding “two colours” and “three colours”.`],
    grading: '3 points for the exercise.',
    note: 'Wording of the official answer key (which writes the binomial coefficients \\(C_n^p\\)). Checked by enumerating the 120 draws.' };

  EN['p2019-ex7'] = { src: 'Midterm 1 2019 · Ex 7', title: '8-sided dice: independent? incompatible?',
    intro: r`<p>We roll a loaded 8-sided dice and call \(X\) the result. The situation is the following:</p><div class="tbl"><table><thead><tr><th scope="row">\(k\) (number obtained)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr></thead><tbody><tr><th scope="row">\(\P(X = k)\)</th><td>0.05</td><td>0.1</td><td>0.05</td><td>0.2</td><td>0.1</td><td>0.3</td><td>0.1</td><td>0.1</td></tr></tbody></table></div>`,
    questions: [r`Are the events “\(X\) even” and “\(X \leq 4\)” independent? Incompatible?`],
    hints: [
      r`Call \(A\): “\(X\) even”, \(B\): “\(X \leq 4\)”. Compute \(\P(A)\), \(\P(B)\) and \(\P(A \cap B)\).`,
      r`Independent: \(\P(A \cap B) = \P(A)\P(B)\). Incompatible: \(A \cap B = \varnothing\).`],
    solution: [
      { t: 'Independence and incompatibility', html: M(r`<p>Let \(A\) be the event “\(X\) even” and \(B\) the event “\(X \leq 4\)”.</p><p>\(\P(A) = 0.1 + 0.2 + 0.3 + 0.1 = 0.7\); \(\P(B) = 0.05 + 0.1 + 0.05 + 0.2 = 0.4\); \(A \cap B = \{X = 2\} \cup \{X = 4\}\), so \(\P(A \cap B) = 0.1 + 0.2 = 0.3\).</p><p>\(\P(A)\P(B) = 0.7 \times 0.4 = 0.28 \neq 0.3 = \P(A \cap B)\): \(A\) and \(B\) are not independent. (In other words, \(\P_B(A) = \dfrac{0.3}{0.4} = \dfrac{3}{4} \neq 0.7 = \P(A)\).)</p><p>\(A\) and \(B\) are not incompatible: for example, \(X = 2\) realises \(A \cap B\), whose probability is \(0.3 \neq 0\).</p>`) +
        r`<p>The official answer key writes \(\P_B(A) = \frac{0.1 + 0.2}{0.7} = \frac{3}{7}\): it divides by \(\P(A)\) instead of \(\P(B)\). The conclusion (not independent) is still right.</p>` }],
    answer: r`<p>\(\P(A) = \frac{7}{10}\), \(\P(B) = \frac{2}{5}\), \(\P(A \cap B) = \frac{3}{10} \neq \frac{7}{25} = \P(A)\P(B)\): neither independent nor incompatible (\(\P_B(A) = \frac{3}{4}\)).</p>`,
    traps: [
      r`\(\P_B(A) = \frac{\P(A \cap B)}{\P(B)}\): divide by the probability of the <b>known</b> event.`,
      r`Incompatible and independent are two different notions: two incompatible events with non-zero probabilities are never independent.`],
    grading: '2 points for the exercise.',
    note: 'The official answer key finds \\(\\P_B(A) = 3/7\\) by dividing by P(A): the right value is 3/4. Its conclusion is still right. Probabilities recomputed as exact fractions.' };

  EN['p2019-ex8'] = { src: 'Midterm 1 2019 · Ex 8', title: 'Flu and vaccination: conditional probability, vaccination rate',
    intro: r`<p>In a small country town, 10,000 people are over 65. 60% of them have taken the precaution of being vaccinated against the flu.</p><p>During the winter, doctors observe that 10% of them caught the flu. Among these, 6% were vaccinated.</p>`,
    questions: [
      r`<b>1.</b> Find the probability of catching the flu<p>a. for a vaccinated person.</p><p>b. for an unvaccinated person. N.B.: the result is required as a fraction.</p>`,
      r`<b>2.</b> Let \(c\) be the result of question 1)b). Find, in terms of \(c\), the vaccination rate of the elderly people for which there would be 500 people with the flu.`],
    hints: [
      r`Translate: \(\P(V) = 0.6\), \(\P(M) = 0.1\), \(\P_M(V) = 0.06\). We look for \(\P_V(M)\) and \(\P_{\overline{V}}(M)\): Bayes.`,
      r`\(\P_M(\overline{V}) = 1 - 0.06 = 0.94\) and \(\P(\overline{V}) = 0.4\).`,
      r`Question 2: with a rate \(p\), \(\P(M) = 0.01\,p + c(1 - p)\); 500 ill people out of 10,000 means \(\P(M) = 0.05\).`],
    solution: [
      { t: 'Question 1: Bayes', html: M(r`<p>Let \(M\) be the event “the person has the flu” and \(V\) “the person is vaccinated”. The statement gives \(\P(V) = 0.6\), \(\P(M) = 0.1\) and \(\P_M(V) = 0.06\).</p><p>a. \(\P_V(M) = \dfrac{\P_M(V)\P(M)}{\P(V)} = \dfrac{0.06 \times 0.1}{0.6} = 0.01 = \dfrac{1}{100}\).</p><p>b. \(\P_{\overline{V}}(M) = \dfrac{\P_M(\overline{V})\P(M)}{\P(\overline{V})} = \dfrac{0.94 \times 0.1}{0.4} = \dfrac{0.094}{0.4} = \dfrac{47}{200}\), that is 23.5%.</p>`) +
        r`<p>The official answer key divides by \(\P(V) = 0.6\) instead of \(\P(\overline{V}) = 0.4\) and finds 15.6%: this is wrong. Check: \(0.01 \times 0.6 + 0.235 \times 0.4 = 0.1 = \P(M)\).</p>` },
      { t: 'Question 2: vaccination rate', html: M(r`<p>We want \(\P(M) = \dfrac{500}{10\,000} = 0.05\). Let \(p = \P(V)\) be the vaccination rate, assuming that \(\P_V(M) = 0.01\) and \(\P_{\overline{V}}(M) = c\) do not change. By the law of total probability, \(\P(M) = \P_V(M)\P(V) + \P_{\overline{V}}(M)\P(\overline{V})\), that is \(0.05 = 0.01\,p + c\,(1 - p)\). Thus \(p = \dfrac{c - 0.05}{c - 0.01}\).</p>`) +
        r`<p>With \(c = \frac{47}{200}\): \(p = \frac{0.185}{0.225} = \frac{37}{45} \approx 82.2\)%.</p>` }],
    answer: r`<ul><li>1. a. \(\P_V(M) = \frac{1}{100}\); b. \(\P_{\overline{V}}(M) = \frac{47}{200}\).</li><li>2. \(p = \frac{c - 0.05}{c - 0.01}\), that is \(\frac{37}{45}\) with \(c = \frac{47}{200}\).</li></ul>`,
    traps: [
      r`“Among these, 6% were vaccinated” gives \(\P_M(V)\), not \(\P_V(M)\).`,
      r`1.b: the denominator is \(\P(\overline{V}) = 0.4\) (the mistake of the answer key).`,
      r`Check a result with the law of total probability: you must get \(\P(M) = 0.1\) back.`],
    grading: '3 points for the exercise.',
    note: 'The official answer key is correct for 1.a and 2; wrong for 1.b (15.6% instead of 47/200 = 23.5%). Values recomputed as exact fractions.' };

  /* =====================================================================
     Midterm 1, October 2018 — scanned paper, no answer key
     ===================================================================== */
  var N18 = 'The archive has no answer key for this paper: answers recomputed by program.';
  EN['p2018-ex1'] = { src: 'Midterm 1 2018 · Ex 1', title: 'Direct images and pre-images read on a staircase graph',
    intro: r`<p>Let \(f : \R \to \R\) whose graph is the following:</p>` + FIG.stairs,
    questions: [r`Find \(f([0, 4])\), \(f^{-1}([0, 1])\), \(f^{-1}(\{0, 1\})\), \(f(\R)\) and \(f^{-1}([-1, 1])\).`],
    hints: [
      r`Read the graph: on \([0, 2[\), \(f = 0\); on \([2, 4[\), \(f = 1\); at 4, \(f(4) = 2\) (filled dot on the left of each step).`,
      r`Pre-image: on the vertical axis, spot the required values, then the corresponding \(x\).`],
    solution: [
      { t: 'Reading the graph', html: M(r`<p>On the drawing, \(f\) is equal to \(k\) on \([2k, 2k + 2[\) for \(k \in \ent{-3}{2}\) (filled dot on the left, open on the right): it is \(f(x) = \left\lfloor \frac{x}{2} \right\rfloor\).</p><p>\(f([0, 4]) = \{0, 1, 2\}\): 0 on \([0, 2[\), 1 on \([2, 4[\), and \(f(4) = 2\).</p><p>\(f^{-1}([0, 1]) = [0, 4[\): among the reals of \([0, 1]\), \(f\) only reaches 0 (on \([0, 2[\)) and 1 (on \([2, 4[\)).</p><p>\(f^{-1}(\{0, 1\}) = [0, 4[\).</p><p>\(f(\R) = \Z\) if the staircase goes on outside the drawing; on the drawing alone, \(\{-3, -2, -1, 0, 1, 2\}\).</p><p>\(f^{-1}([-1, 1]) = [-2, 4[\).</p>`) +
        r`<p>The drawing stops at \(-6\) and \(6\): write the assumption you make for \(f(\R)\).</p>` }],
    answer: r`<p>\(f([0, 4]) = \{0, 1, 2\}\); \(f^{-1}([0, 1]) = [0, 4[\); \(f^{-1}(\{0, 1\}) = [0, 4[\); \(f(\R) = \Z\) (staircase extended); \(f^{-1}([-1, 1]) = [-2, 4[\).</p>`,
    traps: [
      r`\(f([0, 4])\) is not \([0, 2]\): \(f\) only takes integer values.`,
      r`Bounds: 4 is excluded from \(f^{-1}([0, 1])\) since \(f(4) = 2\) (filled dot of the next step).`],
    grading: '2.5 points for the exercise.',
    note: N18 + ' Statement read on the scan; f(ℝ) depends on what you assume outside the drawing.' };

  EN['p2018-ex2'] = { src: 'Midterm 1 2018 · Ex 2', title: r`Pre-images under a function from \(\N\) to \(\N\)`,
    intro: r`<p>Let \(f : \N \to \N\) be defined for every \(n \in \N\) by \(f(n) = \dfrac{n}{2}\) if \(n\) is even and \(f(n) = 0\) otherwise.</p>`,
    questions: [r`Find \(f^{-1}(\{0\})\), \(f^{-1}(\{1\})\) and \(f^{-1}(\{2\})\).`],
    hints: [
      r`For \(f^{-1}(\{0\})\), look for the even \(n\) with \(\frac{n}{2} = 0\), and do not forget the odd numbers.`,
      r`A pre-image of 1 or 2 can only be even.`],
    solution: [
      { t: 'Answers', html: M(r`<p>If \(n\) is odd, \(f(n) = 0\); if \(n\) is even, \(f(n) = \frac{n}{2}\), which is 0 only for \(n = 0\). So \(f^{-1}(\{0\}) = \{0\} \cup \{2k + 1,\ k \in \N\}\) (0 and the odd numbers).</p><p>\(f(n) = 1\) requires \(n\) even and \(\frac{n}{2} = 1\): \(f^{-1}(\{1\}) = \{2\}\). Likewise, \(f^{-1}(\{2\}) = \{4\}\).</p>`) }],
    answer: r`<p>\(f^{-1}(\{0\}) = \{0\} \cup \{2k + 1,\ k \in \N\}\); \(f^{-1}(\{1\}) = \{2\}\); \(f^{-1}(\{2\}) = \{4\}\).</p>`,
    traps: [r`Forgetting 0 in \(f^{-1}(\{0\})\): 0 is even and \(f(0) = \frac{0}{2} = 0\).`],
    grading: '1.5 points for the exercise.',
    note: N18 };

  EN['p2018-ex6'] = { src: 'Midterm 1 2018 · Ex 6', title: r`\((x, y) \mapsto xy\) and \(x \mapsto (x, x^2)\): injectivity, surjectivity, compositions`,
    intro: r`<p>Let \(f : \R^2 \to \R,\ (x, y) \mapsto xy\) and \(g : \R \to \R^2,\ x \mapsto (x, x^2)\).</p>`,
    questions: [
      r`<b>1.</b> Is \(f\) injective? Surjective? Justify your answer.`,
      r`<b>2.</b> Is \(g\) injective? Surjective? Justify your answer.`,
      r`<b>3.</b> Find \(f \circ g\) and \(g \circ f\).`],
    hints: [
      r`\(f\): many pairs have a zero product. For surjectivity, look for a pre-image of \(y\) of the form \((y, 1)\).`,
      r`\(g\): two equal images have the same first coordinate. Is a pair \((a, b)\) with \(b \neq a^2\) reached?`],
    solution: [
      { t: 'Answers', html: M(r`<p>1. \(f((0, 0)) = f((0, 1)) = 0\) and \((0, 0) \neq (0, 1)\): \(f\) is not injective. Let \(y \in \R\): \(f((y, 1)) = y\), so \(f\) is surjective.</p><p>2. Let \((x, x') \in \R^2\) such that \(g(x) = g(x')\). Then \((x, x^2) = (x', x'^2)\), so (first coordinates) \(x = x'\): \(g\) is injective. \((0, 1)\) has no pre-image (it would need \(x = 0\) and \(x^2 = 1\)): \(g\) is not surjective.</p><p>3. \(f \circ g : \R \to \R\), \(x \mapsto f(x, x^2) = x \cdot x^2 = x^3\). \(g \circ f : \R^2 \to \R^2\), \((x, y) \mapsto g(xy) = (xy, x^2y^2)\).</p>`) }],
    answer: r`<ul><li>1. \(f\) not injective (\(f(0, 0) = f(0, 1)\)), surjective (\(f(y, 1) = y\)).</li><li>2. \(g\) injective, not surjective (\((0, 1)\)).</li><li>3. \(f \circ g(x) = x^3\); \(g \circ f(x, y) = (xy, x^2y^2)\).</li></ul>`,
    traps: [
      r`Give the input and output sets of the compositions: \(f \circ g : \R \to \R\), \(g \circ f : \R^2 \to \R^2\).`,
      r`To disprove the surjectivity of \(g\), a pair of \(\R^2\) is needed, not a real number.`],
    grading: '3 points for the exercise.',
    note: N18 };

  EN['p2018-ex7'] = { src: 'Midterm 1 2018 · Ex 7', title: '5-card hands: at least one ace, king of diamonds and three clubs',
    intro: r`<p>From a 32-card deck, we draw a hand of 5 cards. Find the probability that a hand contains</p>`,
    questions: [
      r`<b>1.</b> at least one ace.`,
      r`<b>2.</b> the king of diamonds and 3 clubs including the ace.`],
    hints: [
      r`The \(\binom{32}{5}\) hands are equally likely. “At least one ace”: complement of “no ace” (\(\binom{28}{5}\) hands).`,
      r`Question 2 (read as “exactly 3 clubs”): king of diamonds and ace of clubs imposed, 2 clubs among the 7 others, the last card among the 23 cards that are neither clubs nor the king of diamonds.`],
    solution: [
      { t: 'Answers', html: M(r`<p>The \(\binom{32}{5}\) hands are equally likely.</p><p>1. The complement is “no ace”: the 5 cards are chosen among the 28 cards that are not aces. The probability is \(1 - \dfrac{\binom{28}{5}}{\binom{32}{5}} = 1 - \dfrac{98\,280}{201\,376} = \dfrac{1\,841}{3\,596}\).</p><p>2. We read: the hand contains the king of diamonds and exactly 3 clubs, including the ace of clubs. The king of diamonds and the ace of clubs are imposed; we choose the 2 other clubs among the 7 other clubs (\(\binom{7}{2} = 21\)); the fifth card is neither a club nor the king of diamonds: \(32 - 8 - 1 = 23\) choices. The probability is \(\dfrac{21 \times 23}{\binom{32}{5}} = \dfrac{483}{201\,376} = \dfrac{69}{28\,768}\).</p>`) }],
    answer: r`<ul><li>1. \(1 - \frac{\binom{28}{5}}{\binom{32}{5}} = \frac{1\,841}{3\,596}\)</li><li>2. \(\frac{\binom{7}{2} \times 23}{\binom{32}{5}} = \frac{69}{28\,768}\) (exactly 3 clubs)</li></ul>`,
    traps: [
      r`“At least one ace” computed as \(\frac{4 \times \binom{31}{4}}{\binom{32}{5}}\): it counts the hands with several aces several times.`,
      r`Question 2: the fifth card must be neither a club (otherwise 4 clubs) nor the king of diamonds (already in the hand).`],
    grading: '2 points for the exercise.',
    note: N18 + ' Values checked by enumerating the 201,376 hands.' };

  EN['p2018-ex8'] = { src: 'Midterm 1 2018 · Ex 8', title: 'Flu and vaccination: total probability, Bayes',
    intro: r`<p>In the Paris region, 60% of the people over 65 are vaccinated against the flu. The proportion of ill people is 0.1% among the vaccinated and 10% among the unvaccinated.</p>`,
    questions: [
      r`<b>1.</b> Find the percentage of people over 65 who have the flu in this region.`,
      r`<b>2.</b> We pick a person over 65 in the Paris region and notice that this person has caught the flu. What is the probability that this person was vaccinated? N.B.: only the literal formula giving this probability is required here, not the numerical value.`],
    hints: [
      r`0.1% = 0.001. Translate: \(\P(V) = 0.6\), \(\P(M \mid V) = 0.001\), \(\P(M \mid \overline{V}) = 0.1\).`,
      r`Partition \(\{V, \overline{V}\}\), law of total probability, then Bayes.`],
    solution: [
      { t: 'Question 1: law of total probability', html: M(r`<p>Let \(V\): “the person is vaccinated” and \(M\): “the person has the flu”. We have \(\P(V) = 0.6\), \(\P(M \mid V) = 0.001\) and \(\P(M \mid \overline{V}) = 0.1\). Since \(\{V, \overline{V}\}\) is a partition of \(\Omega\), \(M = (M \cap V) \cup (M \cap \overline{V})\) (disjoint union) and</p><div class="fm">\[\P(M) = \P(M \mid V)\P(V) + \P(M \mid \overline{V})\P(\overline{V}) = 0.001 \times 0.6 + 0.1 \times 0.4 = 0.0406 = \frac{203}{5\,000}.\]</div><p>That is 4.06% of the people over 65.</p>`) +
        T('tree', { first: [{ n: 'V', p: '3/5' }, { n: '\\overline{V}' }], second: { n: 'M', nb: '\\overline{M}', p: ['1/1000', '1/10'] }, edit: false }) },
      { t: 'Question 2: Bayes', html: M(r`<p>We look for \(\P(V \mid M)\):</p><div class="fm">\[\P(V \mid M) = \frac{\P(M \cap V)}{\P(M)} = \frac{\P(M \mid V)\P(V)}{\P(M \mid V)\P(V) + \P(M \mid \overline{V})\P(\overline{V})}.\]</div>`) +
        r`<p>Numerical value (not required): \(\frac{0.0006}{0.0406} = \frac{3}{203} \approx 1.5\)%.</p>` }],
    answer: r`<ul><li>1. \(\P(M) = 0.0406 = \frac{203}{5\,000}\), that is 4.06%.</li><li>2. \(\P(V \mid M) = \frac{\P(M \mid V)\P(V)}{\P(M \mid V)\P(V) + \P(M \mid \overline{V})\P(\overline{V})}\) \(\left(= \frac{3}{203}\right)\).</li></ul>`,
    traps: [
      r`0.1% = 0.001, not 0.1.`,
      r`Question 2: only the literal formula is required, but it must be complete (expanded denominator, or \(\P(M)\) computed before).`],
    grading: '3 points for the exercise.',
    note: N18 };

  /* ---------- fusion, puis questions mises en paragraphes comme en français ---------- */
  R.i18n.patch(window.MATHS_EX, EN);
  (window.MATHS_EX || []).forEach(function (e) { if (EN[e.id] && EN[e.id].questions) e.questions = e.questions.map(FIG.wrapQ); });
})();
