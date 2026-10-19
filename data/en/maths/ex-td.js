/* English text for data/maths/ex-td.js (merged by id over the French file, REV.i18n.patch).
   - Statements: word for word from the official English sheets (Seminar 2026, Tutorial 1 “Counting”, Tutorial 2
     “Finite probabilities”, sheets “Probability Exercises” and “Conditional Probability: Exercises”).
   - The English seminar numbers its exercises differently from part 2 on (FR 2.12 = EN 3.12, FR 3.14 = EN 4.14,
     FR 3.19 = EN 5.19, FR 4.26 = EN 6.26): ids stay those of the French sheet, src gives the English number and the
     French one. Where the English sheet differs from the French one, the English fiche follows the English sheet with
     its own answers: seminar 1.5 (other sentences), 1.4 and 3.13 (set names), Tutorial 1 1.2 (k ∈ {1, …, 20}),
     2.8 (computer, mathematician), Tutorial 2 1.1 (questions 2 and 3 swapped), 3.10 (events C, DC), 3.11 (tails),
     3.12 (communication activities), 4.15 (questions 2 to 4 merged), 5.19 (uniform on ⟦0, n⟧), 5.20 (M_i).
   - Vocabulary of the official English documents (input / output set, reverse image, pre-image, contrapositive,
     proof by induction, sample set, distribution, expectation, law of total probability…). Decimal point; thousands
     with a comma ({,} inside formulas).
   - Figures and tools come from window.MATHS_TD (French file): same data, English labels. */
(function () {
  'use strict';
  var T = window.MATHS_TD, REV = window.REV;
  if (!T || !REV || !REV.i18n) return;
  var r = T.r, p = T.p, ul = T.ul, ol = T.ol, fm = T.fm, note = T.note, tbl = T.tbl, tool = T.tool, items = T.items, PI = T.PI;
  function model(html) { return T.model(html, 'Model answer'); }
  var NOTE_SEM = 'No official answer key for the seminar: solution written, every result checked by a program.';
  var NOTE_TD1 = 'No official answer key for Tutorial 1: solution written, every count checked by enumeration.';
  var NOTE_TD2 = 'No official answer key for Tutorial 2: solution written, every probability recomputed with exact fractions (by enumeration when possible).';
  var NOTE_X = 'No official answer key for this sheet: solution written, every probability recomputed with exact fractions.';
  var M = {};

  /* ===================== Seminar, part 1: logic of propositions ===================== */
  M['sem-1-1'] = {
    src: 'Seminar · Ex 1.1', title: 'Truth values and distributivity',
    intro: p(r`Let \(x\) be a real number and consider the properties:`) + p(r`\(P(x)\) : “\(x \leq 1\)”, \(\quad Q(x)\) : “\(-1 < x \leq 2\)” \(\quad\) and \(\quad R(x)\) : “\(0 \leq x < 4\)”`),
    questions: [
      r`If \(x = -3\), which of the following properties are true: \(P(x)\), \(\neg Q(x)\), \(\neg Q(x) \vee R(x)\), \(\neg Q(x) \wedge R(x)\), \(\neg P(x) \wedge Q(x)\), \(\neg R(x) \wedge P(x)\)?`,
      r`<b>(Homework)</b> Same questions if \(x = 3\).`,
      r`Find and compare \(P(x) \vee (Q(x) \wedge R(x))\) and of \((P(x) \vee Q(x)) \wedge (P(x) \vee R(x))\).`,
      r`<b>(Homework)</b> Compare the domains of truth of \(P \wedge (Q \vee R)\) and of \((P \wedge Q) \vee (P \wedge R)\).`],
    hints: [r`First evaluate \(P\), \(Q\) and \(R\) alone, then combine: \(\neg\) swaps, \(\wedge\) needs both, \(\vee\) needs at least one.`,
      r`“Find \(P(x) \vee (Q(x) \wedge R(x))\)” means: find the set of real numbers \(x\) for which the property is true. \(\wedge\) is the intersection of the intervals, \(\vee\) their union.`,
      r`\(Q \wedge R\) is true on \([0, 2]\). Draw the intervals on a line.`],
    solution: [
      { t: 'Questions 1 and 2: evaluate', html: p(r`Evaluate \(P\), \(Q\), \(R\), then each combination.`) +
        tbl(['', r`\(P\)`, r`\(\neg Q\)`, r`\(\neg Q \vee R\)`, r`\(\neg Q \wedge R\)`, r`\(\neg P \wedge Q\)`, r`\(\neg R \wedge P\)`],
          [[r`\(x = -3\)`, 'T', 'T', 'T', 'F', 'F', 'T'], [r`\(x = 3\)`, 'F', 'T', 'T', 'T', 'F', 'F']], { th: true }) +
        p(r`For \(x = -3\): \(-3 \leq 1\) so \(P\) is true; \(-1 < -3\) is false so \(Q\) is false and \(\neg Q\) true; \(0 \leq -3\) is false so \(R\) is false. For \(x = 3\): \(P\) false, \(Q\) false (\(3 > 2\)), \(R\) true.`) },
      { t: 'Question 3: two forms, one set', html: p(r`\(Q \wedge R\) is true when \(-1 < x \leq 2\) <b>and</b> \(0 \leq x < 4\), that is \(x \in [0, 2]\). With \(P\) (\(x \in \left]-\infty, 1\right]\)): \(P \vee (Q \wedge R)\) is true on \(\left]-\infty, 1\right] \cup [0, 2] = \left]-\infty, 2\right]\).`) +
        p(r`\(P \vee Q\): \(\left]-\infty, 2\right]\); \(P \vee R\): \(\left]-\infty, 4\right[\). Their conjunction: \(\left]-\infty, 2\right] \cap \left]-\infty, 4\right[ = \left]-\infty, 2\right]\).`) +
        p(r`Both properties are true for exactly the same real numbers: this is the distributivity of \(\vee\) over \(\wedge\), \(P \vee (Q \wedge R) \iff (P \vee Q) \wedge (P \vee R)\). The truth table confirms it row by row:`) +
        tool('truth', { f: ['P ou (Q et R)', '(P ou Q) et (P ou R)'], title: 'Distributivity of ∨ over ∧' }) },
      { t: 'Question 4', html: p(r`\(Q \vee R\) is true on \(\left]-1, 2\right] \cup [0, 4[ = \left]-1, 4\right[\), so \(P \wedge (Q \vee R)\) on \(\left]-1, 1\right]\). On the other side, \(P \wedge Q\): \(\left]-1, 1\right]\) and \(P \wedge R\): \([0, 1]\), whose union is \(\left]-1, 1\right]\). Same set: distributivity of \(\wedge\) over \(\vee\).`) +
        model(p(r`For \(x \in \R\), \(Q(x) \wedge R(x)\) is true if and only if \(-1 < x \leq 2\) and \(0 \leq x < 4\), that is \(x \in [0, 2]\).`) + p(r`Hence \(P(x) \vee (Q(x) \wedge R(x))\) is true if and only if \(x \in \left]-\infty, 1\right] \cup [0, 2] = \left]-\infty, 2\right]\).`)) }],
    answer: ul([r`\(x = -3\): \(P\), \(\neg Q\), \(\neg Q \vee R\), \(\neg R \wedge P\) true; \(\neg Q \wedge R\), \(\neg P \wedge Q\) false.`,
      r`\(x = 3\): \(\neg Q\), \(\neg Q \vee R\), \(\neg Q \wedge R\) true; the other three false.`,
      r`\(P \vee (Q \wedge R)\) and \((P \vee Q) \wedge (P \vee R)\): true for \(x \in \left]-\infty, 2\right]\).`,
      r`\(P \wedge (Q \vee R)\) and \((P \wedge Q) \vee (P \wedge R)\): true for \(x \in \left]-1, 1\right]\).`]),
    traps: [r`Writing \(\wedge\) or \(\vee\) between two intervals: write \(\cap\) and \(\cup\) between sets, \(\wedge\) and \(\vee\) between properties.`,
      r`Forgetting that “or” is inclusive: \(\neg Q \vee R\) is true when both are true.`],
    note: NOTE_SEM
  };

  M['sem-1-2'] = {
    src: 'Seminar · Ex 1.2', title: 'Necessary and sufficient conditions, ⇒ ⇐ ⇔',
    intro: p('The questions are mutually independent.'),
    questions: [
      r`Write a necessary (maybe not sufficient) condition for the property "I got my baccalauréat diploma". Then find a sufficient (maybe not necessary) condition for the property "I got my baccalauréat diploma".`,
      r`Same question for "Greg competes in high-level swimming".`,
      r`Let \(x \in \R\). Replace each dotted line below with one of the symbols \(\implies\), \(\impliedby\) or \(\iff\):<br>` + items([
        r`<b>(a)</b> \(x^2 > 4 \dots\dots x > 2\)`, r`<b>(b)</b> \(x = \pi \dots\dots \sin(x) = 0\)`, r`<b>(c)</b> \(\sqrt{x^2} = 1 \dots\dots x = 1\)`,
        r`<b>(d)</b> \(\dfrac{x^2}{3} = 0 \dots\dots x = 0\)`, r`<b>(e)</b> \(\dfrac{x^2}{3} = 1 \dots\dots x = \sqrt{3}\)`, r`<b>(f)</b> \(e^{x+1} = 1 \dots\dots x = -1\)`,
        r`<b>(g)</b> \(x < 1 \dots\dots |x| < 1\)`, r`<b>(h)</b> \(x^2 - x > 0 \dots\dots x > 1\)`, r`<b>(i)</b> \(\ln(x^2 + 1) = 0 \dots\dots x = 0\)`]),
      r`Let \(x \in \R\). Consider the property \(P(x)\) : "\(x^2 > 1 \implies (x < -1 \text{ or } x > 1)\)". Write the negation and the contrapositive of \(P(x)\).`],
    hints: [r`In \(A \implies B\), \(A\) is a <b>sufficient</b> condition for \(B\) and \(B\) a <b>necessary</b> condition for \(A\). A necessary condition for “I got my diploma” is something that always follows from having the diploma.`,
      r`For (a) to (i): write the set of the \(x\) satisfying each side. If the left set is included in the right one, it is \(\implies\); inclusion the other way: \(\impliedby\); equal sets: \(\iff\).`,
      r`\(\neg(A \implies B)\) is \(A \wedge \neg B\) (not an implication). The contrapositive of \(A \implies B\) is \(\neg B \implies \neg A\).`],
    solution: [
      { t: 'Questions 1 and 2: necessary, sufficient', html: p(r`We look for \(N\) such that “I got my diploma” \(\implies N\) (necessary condition), and \(S\) such that \(S \implies\) “I got my diploma” (sufficient condition).`) +
        ul([r`Necessary: “I took the baccalauréat exams” (you cannot get the diploma without taking them). Sufficient: “I got the baccalauréat with highest honours”.`,
          r`Necessary: “Greg can swim”. Sufficient: “Greg swam at the Olympic Games” (a high-level competition).`]) +
        p(r`A necessary condition need not be sufficient: you can take the exams and fail. A sufficient condition need not be necessary: you can get the diploma without honours.`) },
      { t: 'Question 3: compare the domains of truth', html: tbl(['', 'left', 'right', 'symbol'], [
          ['(a)', r`\(\left]-\infty, -2\right[ \cup \left]2, +\infty\right[\)`, r`\(\left]2, +\infty\right[\)`, r`\(\impliedby\)`],
          ['(b)', r`\(\{\pi\}\)`, r`\(\{k\pi,\ k \in \Z\}\)`, r`\(\implies\)`],
          ['(c)', r`\(\{-1, 1\}\) (since \(\sqrt{x^2} = |x|\))`, r`\(\{1\}\)`, r`\(\impliedby\)`],
          ['(d)', r`\(\{0\}\)`, r`\(\{0\}\)`, r`\(\iff\)`],
          ['(e)', r`\(\{-\sqrt{3}, \sqrt{3}\}\)`, r`\(\{\sqrt{3}\}\)`, r`\(\impliedby\)`],
          ['(f)', r`\(\{-1\}\) (\(e^{x+1} = 1 \iff x + 1 = 0\))`, r`\(\{-1\}\)`, r`\(\iff\)`],
          ['(g)', r`\(\left]-\infty, 1\right[\)`, r`\(\left]-1, 1\right[\)`, r`\(\impliedby\)`],
          ['(h)', r`\(\left]-\infty, 0\right[ \cup \left]1, +\infty\right[\)`, r`\(\left]1, +\infty\right[\)`, r`\(\impliedby\)`],
          ['(i)', r`\(\{0\}\) (\(x^2 + 1 = 1\))`, r`\(\{0\}\)`, r`\(\iff\)`]], { th: true }) +
        p(r`For (a): \(x = -3\) satisfies \(x^2 > 4\) but not \(x > 2\), so no \(\implies\); every \(x > 2\) satisfies \(x^2 > 4\), hence \(\impliedby\). For (h): \(x^2 - x = x(x - 1) > 0\) when \(x\) and \(x - 1\) have the same sign.`) +
        model(p(r`(g) Let \(x \in \R\) such that \(|x| < 1\). Then \(-1 < x < 1\), so \(x < 1\). Thus \(|x| < 1 \implies x < 1\).`) + p(r`The converse is false: \(x = -2\) satisfies \(x < 1\) but \(|x| = 2 \geq 1\). Hence \(x < 1 \impliedby |x| < 1\).`)) },
      { t: 'Question 4: negation and contrapositive', html: p(r`The negation of an implication \(A \implies B\) is \(A \wedge \neg B\). Here \(\neg(x < -1 \text{ or } x > 1)\) is \(x \geq -1\) and \(x \leq 1\) (De Morgan).`) +
        model(p(r`Negation of \(P(x)\): “\(x^2 > 1\) and \(-1 \leq x \leq 1\)”.`) + p(r`Contrapositive of \(P(x)\): “\(-1 \leq x \leq 1 \implies x^2 \leq 1\)”.`)) +
        p(r`Remark: \(P(x)\) is true for every real \(x\) (\(x^2 > 1 \iff x < -1\) or \(x > 1\)), so its negation is false for every \(x\). Only the writing is asked here, not a truth value.`) }],
    answer: ul([r`Diploma: necessary “I took the exams”, sufficient “I got it with honours”. Swimming: necessary “Greg can swim”, sufficient “Greg swam at the Olympics”.`,
      r`(a) \(\impliedby\) (b) \(\implies\) (c) \(\impliedby\) (d) \(\iff\) (e) \(\impliedby\) (f) \(\iff\) (g) \(\impliedby\) (h) \(\impliedby\) (i) \(\iff\).`,
      r`\(\neg P(x)\): \(x^2 > 1\) and \(-1 \leq x \leq 1\). Contrapositive: \(-1 \leq x \leq 1 \implies x^2 \leq 1\).`]),
    traps: [r`Swapping necessary and sufficient. “I am in college” is not sufficient for the diploma, “Greg trains regularly” is not sufficient for competing: always check the direction of the implication.`,
      r`Writing the negation of an implication as an implication (\(A \implies \neg B\) or \(\neg A \implies \neg B\)): it is \(A \wedge \neg B\).`,
      r`Negating \(x < -1\) as \(x > -1\): the negation of \(<\) is \(\geq\).`,
      r`Mixing up the contrapositive (\(\neg B \implies \neg A\), equivalent) and the converse (\(B \implies A\)).`],
    note: NOTE_SEM
  };

  M['sem-1-3'] = {
    src: 'Seminar · Ex 1.3', title: 'Translate, then negate properties of functions',
    intro: p(r`Let \(f : \R \longrightarrow \R\) be a function.`),
    questions: [
      r`Translate the following properties into mathematical language, using quantifiers and symbolic notations:<br>(a) \(f\) is bounded. (b) \(f\) never vanishes. (c) \(f\) is a constant function. (d) \(f\) is an even function. (Also \(f\) is an odd function). (e) \(f\) is periodic. (f) \(f\) is not the zero function. (g) \(f\) is positive on \(\R^+\) (two translations: a first one with a quantifier, a second one with an implication).`,
      r`Write the negation of all the properties above.`],
    hints: [r`Spot what “exists” (a bound, a constant, a period): it comes first with \(\exists\), then \(\forall x \in \R\).`,
      r`To negate: each \(\forall\) becomes \(\exists\) and conversely, the sets do not change, and the last property is negated. “And” becomes “or”.`,
      r`“\(m \leq f(x) \leq M\)” is two inequalities joined by “and”: its negation is “\(f(x) < m\) or \(f(x) > M\)”.`],
    solution: [
      { t: 'Question 1: translations', html: tbl(['property', 'translation'], [
          [r`(a) bounded`, r`\(\exists (m, M) \in \R^2,\ \forall x \in \R,\ m \leq f(x) \leq M\)`],
          [r`(b) never vanishes`, r`\(\forall x \in \R,\ f(x) \neq 0\)`],
          [r`(c) constant`, r`\(\exists c \in \R,\ \forall x \in \R,\ f(x) = c\)`],
          [r`(d) even / odd`, r`\(\forall x \in \R,\ f(-x) = f(x)\) / \(\forall x \in \R,\ f(-x) = -f(x)\)`],
          [r`(e) periodic`, r`\(\exists T \in \R^*,\ \forall x \in \R,\ f(x + T) = f(x)\)`],
          [r`(f) not the zero function`, r`\(\exists x \in \R,\ f(x) \neq 0\)`],
          [r`(g) positive on \(\R^+\)`, r`\(\forall x \in \R^+,\ f(x) \geq 0\) or \(\forall x \in \R,\ x \geq 0 \implies f(x) \geq 0\)`]]) +
        p(r`In (e), the period must be non-zero: with \(T = 0\), every function would satisfy \(f(x + 0) = f(x)\).`) },
      { t: 'Question 2: negations', html: tbl(['property', 'negation'], [
          [r`(a)`, r`\(\forall (m, M) \in \R^2,\ \exists x \in \R,\ f(x) < m \text{ or } f(x) > M\)`],
          [r`(b)`, r`\(\exists x \in \R,\ f(x) = 0\)`],
          [r`(c)`, r`\(\forall c \in \R,\ \exists x \in \R,\ f(x) \neq c\)`],
          [r`(d)`, r`\(\exists x \in \R,\ f(-x) \neq f(x)\) / \(\exists x \in \R,\ f(-x) \neq -f(x)\)`],
          [r`(e)`, r`\(\forall T \in \R^*,\ \exists x \in \R,\ f(x + T) \neq f(x)\)`],
          [r`(f)`, r`\(\forall x \in \R,\ f(x) = 0\)`],
          [r`(g)`, r`\(\exists x \in \R^+,\ f(x) < 0\) or \(\exists x \in \R,\ x \geq 0 \wedge f(x) < 0\)`]]) +
        p(r`For (a), the negation step by step (\(\exists (m, M)\) is written \(\exists m\), \(\exists M\)):`) +
        tool('negate', { src: '∃ m ∈ ℝ, ∃ M ∈ ℝ, ∀ x ∈ ℝ, m ≤ f(x) ≤ M', title: 'Negation of “f is bounded”' }) +
        model(p(r`\(f\) is not bounded: \(\forall (m, M) \in \R^2,\ \exists x \in \R,\ f(x) < m \text{ or } f(x) > M\).`) + p(r`In words: whatever two bounds are proposed, \(f\) takes a value outside \([m, M]\).`)) }],
    answer: p(r`The two tables above. To remember: bounded \(\exists (m, M) \in \R^2, \forall x \in \R, m \leq f(x) \leq M\), and its negation \(\forall (m, M) \in \R^2, \exists x \in \R, f(x) < m \text{ or } f(x) > M\).`),
    traps: [r`Negating “\(m \leq f(x) \leq M\)” as “\(m > f(x) > M\)”: impossible as soon as \(m \leq M\). The negation of an “and” is an “or”.`,
      r`Changing the set when negating: \(\neg(\forall x \in \R^+, f(x) \geq 0)\) is \(\exists x \in \R^+, f(x) < 0\), not \(\exists x \in \R^-\).`,
      r`Forgetting to negate both versions in (d) (even and odd).`,
      r`Taking the period in \(\R\) instead of \(\R^*\).`],
    note: NOTE_SEM
  };

  M['sem-1-4'] = {
    src: 'Seminar · Ex 1.4', title: 'The fishes in the pond: translate with quantifiers',
    intro: p(r`We observe a mere. Let \(M\) be the set of the elements in the mere, \(F\) the set of fishes in the mere and \(R\) the set of everything that is red in the pond.`) + p('Translate the following sentences into mathematical language, using quantifiers and symbolic notations :'),
    questions: ['All fishes are red', 'Some fishes are red', 'Only the fishes are red', 'There exists a fish which is not red'],
    hints: [r`Quantify over \(M\): “all fishes are red” is “for every element of the pond, if it is a fish, then it is red”.`,
      r`“Some fishes are red”: an element which is a fish <b>and</b> red (not an implication).`,
      r`“Only the fishes are red”: everything red is a fish.`],
    solution: [{ t: 'Translations', html: ol([
        r`\(\forall x \in M,\ x \in F \implies x \in R\), that is \(F \subset R\).`,
        r`\(\exists x \in M,\ x \in F \wedge x \in R\), that is \(F \cap R \neq \varnothing\).`,
        r`\(\forall x \in M,\ x \in R \implies x \in F\), that is \(R \subset F\).`,
        r`\(\exists x \in M,\ x \in F \wedge x \notin R\): the negation of sentence 1.`]) +
      p(r`With \(\forall\), the natural connector is \(\implies\); with \(\exists\), it is \(\wedge\). Writing \(\exists x \in M, x \in F \implies x \in R\) would be true as soon as one element of the pond is not a fish: it is not sentence 2.`) }],
    answer: ol([r`\(\forall x \in M, x \in F \implies x \in R\)`, r`\(\exists x \in M, x \in F \wedge x \in R\)`, r`\(\forall x \in M, x \in R \implies x \in F\)`, r`\(\exists x \in M, x \in F \wedge x \notin R\)`]),
    traps: [r`Writing \(\exists x, x \in F \implies x \in R\): “there exists” is translated with “and”.`,
      r`Mixing up “all fishes are red” (\(F \subset R\)) and “only the fishes are red” (\(R \subset F\)).`,
      r`Writing \(x \in F \cap \neg R\): we negate a property, not a set; the set is written \(F \cap \overline{R}\) or \(F \setminus R\).`],
    note: NOTE_SEM
  };

  /* the English sheet has other sentences than the French one */
  M['sem-1-5'] = {
    src: 'Seminar · Ex 1.5', title: 'Negate sentences in English',
    intro: p('Write the negation of the following sentences. Keep in mind that the word "some" means "at least one".'),
    questions: ['"This house is large"', '"All truths are good to know"', '"Some students sleep in maths class!"', '"No criminal hypothesis can be discarded in this investigation"', '"Some fishes are not red"',
      '"If the weather is fine, then I go to the beach"', '"You can go out if and only if you do your homework"', '<b>(Homework)</b> "All the cats are grey"', '<b>(Homework)</b> "Some students don\'t sleep in maths class"',
      '<b>(Homework)</b> "If I go to bed late, then I sleep in maths class"', r`<b>(Homework)</b> "\(\forall x \in \R, \forall y \in \R, x > y \implies x^2 > y^2\)". Furthermore, say whether this property is true or false.`,
      r`<b>(Homework)</b> "\(\forall x \in \R, \exists y \in \R, y > x\)". Furthermore, say whether this property is true or false.`],
    hints: [r`“All” becomes “some … not”; “some” (at least one) becomes “no”; “no” becomes “at least one”.`,
      r`“If A then B” is negated as “A and not B”.`,
      r`“A if and only if B” is false when A and B do not have the same value: (A and not B) or (B and not A).`],
    solution: [{ t: 'The negations', html: ol([
        'This house is not large.',
        'Some truths are not good to know (at least one truth is not good to know).',
        'No student sleeps in maths class.',
        'At least one criminal hypothesis can be discarded in this investigation.',
        'All fishes are red.',
        'The weather is fine and I do not go to the beach.',
        '(You can go out and you do not do your homework) or (you do your homework and you cannot go out).',
        'Some cats are not grey.',
        'All students sleep in maths class.',
        'I go to bed late and I do not sleep in maths class.',
        r`\(\exists x \in \R, \exists y \in \R, x > y \wedge x^2 \leq y^2\). The property is <b>false</b>: \(x = -1\), \(y = -2\) give \(x > y\) and \(x^2 = 1 \leq 4 = y^2\).`,
        r`\(\exists x \in \R, \forall y \in \R, y \leq x\). The property is <b>true</b>: for \(x \in \R\), \(y = x + 1\) works.`]) +
      p(r`Sentence 6 in symbols: \(\neg(W \implies B) \iff W \wedge \neg B\). Sentence 7: \(\neg(O \iff H) \iff (O \wedge \neg H) \vee (H \wedge \neg O)\).`) +
      model(p(r`Negation of “if the weather is fine, then I go to the beach”: “the weather is fine and I do not go to the beach”.`) + p(r`<span class="c">not “if the weather is not fine, I do not go to the beach”</span>`)) }],
    answer: p('See the list: “all” ↔ “some … not”, “some” ↔ “no”, “if A then B” → “A and not B”. Sentence 11 is false, sentence 12 true.'),
    traps: [r`Negating “some students sleep in maths class” as “all students don’t sleep in maths class”: ambiguous in English (“not all” or “none”). Write “no student sleeps in maths class”.`,
      r`Negating “some fishes are red” as “some fishes are not red”: both can be true at the same time, it is not a negation.`,
      r`Negating “if A then B” as “if A then not B” or “if not A then not B”.`],
    note: NOTE_SEM + ' The French sheet uses other sentences (French fiche).'
  };

  M['sem-1-6'] = {
    src: 'Seminar · Ex 1.6', title: 'Order of quantifiers: true or false',
    intro: p('For each of the properties below, say whether it is true or false. Then write its negation.'),
    questions: [r`\(\forall x \in \R, \quad \exists y \in \R, \quad x + y > 0\)`, r`\(\forall x \in \R, \quad \forall y \in \R, \quad x + y > 0\)`,
      r`\(\exists y \in \R, \quad \forall x \in \R, \quad x + y > 0\)`, r`\(\exists x \in \R, \quad \exists y \in \R, \quad x + y > 0\)`],
    hints: [r`In 1, \(y\) may depend on \(x\): give \(y\) as a function of \(x\).`,
      r`In 3, the same \(y\) must work for all \(x\). Look for an \(x\) that defeats it.`,
      r`A false “for all” is shown with a numerical counterexample; a true “there exists” with an example.`],
    solution: [
      { t: 'True or false', html: ol([
        r`<b>True.</b> Let \(x \in \R\). Set \(y = 1 - x\). Then \(x + y = 1 > 0\).`,
        r`<b>False.</b> Counterexample: \(x = y = 0\) gives \(x + y = 0\), which is not \(> 0\).`,
        r`<b>False.</b> Let \(y \in \R\). For \(x = -y\), \(x + y = 0\): no \(y\) works for all \(x\).`,
        r`<b>True.</b> \(x = 1\), \(y = 0\) give \(x + y = 1 > 0\).`]) +
        p(r`1 and 3 only differ by the order of the quantifiers: in 1, \(y\) is chosen after \(x\); in 3, a single \(y\) for all \(x\).`) },
      { t: 'Negations', html: ol([
        r`\(\exists x \in \R,\ \forall y \in \R,\ x + y \leq 0\)`, r`\(\exists x \in \R,\ \exists y \in \R,\ x + y \leq 0\)`,
        r`\(\forall y \in \R,\ \exists x \in \R,\ x + y \leq 0\)`, r`\(\forall x \in \R,\ \forall y \in \R,\ x + y \leq 0\)`]) +
        tool('negate', { src: '∃ y ∈ ℝ, ∀ x ∈ ℝ, x + y > 0', title: 'Negation of property 3' }) +
        model(p(r`Property 3 is false: let us prove its negation \(\forall y \in \R, \exists x \in \R, x + y \leq 0\).`) + p(r`Let \(y \in \R\) be given. Set \(x = -y\). Then \(x + y = 0 \leq 0\). The negation is true, hence property 3 is false.`)) }],
    answer: ol([r`True; negation \(\exists x, \forall y, x + y \leq 0\).`, r`False; negation \(\exists x, \exists y, x + y \leq 0\).`, r`False; negation \(\forall y, \exists x, x + y \leq 0\).`, r`True; negation \(\forall x, \forall y, x + y \leq 0\).`]),
    traps: [r`Negating \(>\) as \(<\): it is \(\leq\).`, r`Believing the order of \(\forall\) and \(\exists\) does not matter: 1 is true, 3 is false.`,
      r`Justifying that a “there exists” is false with a single example: you must show that <b>no</b> choice works (prove the negation).`],
    note: NOTE_SEM
  };

  M['sem-1-7a'] = {
    src: 'Seminar · Ex 1.7 (1 and 2)', title: 'True or false with quantifiers, negations and contrapositives',
    questions: [
      r`For each of the properties below, say whether it is true or false. Justify.<br>(a) \(\forall a \in \R, \forall b \in \R, (a + b)^2 = a^2 + b^2\)<br>(b) \(\forall x \in \R, \exists y \in \R, y > x\)<br>(c) \(\exists y \in \R, \forall x \in \R, y > x\)<br>(d) \(\exists y \in \R, \forall x \in \R^+, y \leq x\)<br>(e) \(\forall x \in \R^*, \exists y \in \R, xy = 3\)<br>(f) \(\forall x \in \R, \exists y \in \R, x = y^2\)<br>(g) \(\forall x \in \R, \forall y \in \R, \left(x > y \implies x^2 > y^2\right)\)<br>(h) \(\forall x \in \R, x > 5 \implies (x - 1)(x - 6) < 0\)<br>(i) \(\forall a \in \N, \exists (b, c) \in \N^2, a = b + c\)`,
      r`<b>(Homework)</b> Write the negation for all the properties above and the contrapositive of (g) and (h).`],
    hints: [r`For each false “for all”, give a numerical counterexample; for each true “there exists”, an example.`,
      r`(g): try two negative numbers. (h): try an \(x\) greater than 6.`,
      r`The contrapositive of \(\forall x, A(x) \implies B(x)\) is \(\forall x, \neg B(x) \implies \neg A(x)\): the quantifier does not change.`],
    solution: [
      { t: 'Question 1: true or false', html: ul([
        r`(a) <b>False</b>: \(a = b = 1\) gives \((1 + 1)^2 = 4\) and \(1^2 + 1^2 = 2\).`,
        r`(b) <b>True</b>: let \(x \in \R\), \(y = x + 1\) works.`,
        r`(c) <b>False</b>: for every \(y\), \(x = y\) makes \(y > x\) false (no real number is greater than all real numbers).`,
        r`(d) <b>True</b>: \(y = 0\) satisfies \(0 \leq x\) for every \(x \in \R^+\).`,
        r`(e) <b>True</b>: let \(x \in \R^*\), \(y = \dfrac{3}{x}\) gives \(xy = 3\).`,
        r`(f) <b>False</b>: \(x = -1\) is the square of no real number.`,
        r`(g) <b>False</b>: \(x = -1\), \(y = -2\): \(x > y\) but \(x^2 = 1 < 4 = y^2\).`,
        r`(h) <b>False</b>: \(x = 7\): \(7 > 5\) but \((7 - 1)(7 - 6) = 6 \geq 0\). (\((x - 1)(x - 6) < 0\) only for \(x \in \left]1, 6\right[\).)`,
        r`(i) <b>True</b>: let \(a \in \N\), \((b, c) = (a, 0)\) works.`]) },
      { t: 'Question 2: negations and contrapositives', html: ul([
        r`(a) \(\exists a \in \R,\ \exists b \in \R,\ (a + b)^2 \neq a^2 + b^2\)`, r`(b) \(\exists x \in \R,\ \forall y \in \R,\ y \leq x\)`,
        r`(c) \(\forall y \in \R,\ \exists x \in \R,\ y \leq x\)`, r`(d) \(\forall y \in \R,\ \exists x \in \R^+,\ y > x\)`,
        r`(e) \(\exists x \in \R^*,\ \forall y \in \R,\ xy \neq 3\)`, r`(f) \(\exists x \in \R,\ \forall y \in \R,\ x \neq y^2\)`,
        r`(g) \(\exists x \in \R,\ \exists y \in \R,\ x > y \wedge x^2 \leq y^2\)`, r`(h) \(\exists x \in \R,\ x > 5 \wedge (x - 1)(x - 6) \geq 0\)`,
        r`(i) \(\exists a \in \N,\ \forall (b, c) \in \N^2,\ a \neq b + c\)`]) +
        p(r`Contrapositives: (g) \(\forall x \in \R,\ \forall y \in \R,\ x^2 \leq y^2 \implies x \leq y\); (h) \(\forall x \in \R,\ (x - 1)(x - 6) \geq 0 \implies x \leq 5\).`) +
        model(p(r`(g) is false. Indeed, take \(x = -1\) and \(y = -2\). Then \(x > y\), but \(x^2 = 1\) and \(y^2 = 4\), so \(x^2 \leq y^2\).`) + p(r`Thus \(\exists (x, y) \in \R^2,\ x > y \wedge x^2 \leq y^2\): this is the negation of (g), which is therefore true.`)) }],
    answer: p(r`True: (b), (d), (e), (i). False: (a), (c), (f), (g), (h), each with its counterexample.`),
    traps: [r`Giving a counterexample that does not satisfy the hypothesis of the implication: for (h), you need an \(x > 5\); \(x = 3\) proves nothing.`,
      r`Negating a quantified implication and keeping an implication.`,
      r`Changing the quantifier in the contrapositive: it stays \(\forall\).`],
    note: NOTE_SEM
  };

  M['sem-1-7b'] = {
    src: 'Seminar · Ex 1.7 (3)', title: 'Translate statements into mathematical language',
    intro: p('Translate the following sentences into mathematical language, using quantifiers and symbolic notations. Say whether it is true or false.'),
    questions: ['The square of all real number is positive.', 'Some real numbers are greater than their square.', 'All polynomials of degree 2 with real coefficients admit two distinct real roots.',
      r`Let \(f : \R \longrightarrow \R\). If two real numbers have the same image by \(f\), then they are equal.`,
      r`Let \(f : \left]0, +\infty\right[ \longrightarrow \R\). Every real number admits at least one pre-image by \(f\)`],
    hints: [r`“Some”: at least one, so \(\exists\). “Greater than” (strictly): \(>\).`,
      r`A real polynomial of degree 2 is \(ax^2 + bx + c\) with \(a \neq 0\).`,
      r`(d) and (e) are definitions from the lecture (injective, surjective): their truth depends on \(f\).`],
    solution: [{ t: 'Translations', html: ol([
        r`\(\forall x \in \R,\ x^2 \geq 0\): <b>true</b>.`,
        r`\(\exists x \in \R,\ x > x^2\): <b>true</b>, for example \(x = \dfrac{1}{2}\): \(\dfrac{1}{2} > \dfrac{1}{4}\). (The set of solutions is \(\left]0, 1\right[\).)`,
        r`\(\forall (a, b, c) \in \R^* \times \R \times \R,\ \exists (x_1, x_2) \in \R^2,\ x_1 \neq x_2 \wedge ax_1^2 + bx_1 + c = 0 \wedge ax_2^2 + bx_2 + c = 0\): <b>false</b>, \(x^2 + 1\) has no real root (and \(x^2\) only one).`,
        r`\(\forall (x, y) \in \R^2,\ f(x) = f(y) \implies x = y\): this is “\(f\) is injective”. <b>It depends on \(f\)</b>: true for \(x \mapsto x\), false for \(x \mapsto x^2\) (\(f(-1) = f(1)\)).`,
        r`\(\forall y \in \R,\ \exists x \in \left]0, +\infty\right[,\ f(x) = y\): this is “\(f\) is surjective”. <b>It depends on \(f\)</b>: true for \(\ln\), false for \(x \mapsto x\) (\(-1\) has no pre-image in \(\left]0, +\infty\right[\)).`]) +
      model(p(r`“Some real numbers are greater than their square”: \(\exists x \in \R,\ x > x^2\).`) + p(r`True: for \(x = \dfrac{1}{2}\), \(x^2 = \dfrac{1}{4} < \dfrac{1}{2}\).`)) }],
    answer: ol([r`\(\forall x \in \R, x^2 \geq 0\) true`, r`\(\exists x \in \R, x > x^2\) true (\(x = 1/2\))`, 'false (\\(x^2 + 1\\))', r`\(f\) injective: depends on \(f\)`, r`\(f\) surjective: depends on \(f\)`]),
    traps: [r`Taking \(x = 0\) in (b): \(0 > 0\) is false. “Greater than” excludes equality here.`,
      r`Answering “false” in (d) and (e) with one example: an example proves nothing for an arbitrary function, the truth depends on \(f\).`,
      r`Forgetting \(a \neq 0\) in “polynomial of degree 2”.`],
    note: NOTE_SEM
  };

  /* ===================== Seminar, part 2: sets ===================== */
  M['sem-2-8'] = {
    src: 'Seminar · Ex 2.8', title: 'The zeros of the sine: writing a set',
    intro: p(r`Let \(f : x \longmapsto \sin(x)\). We focus on the set \(E\) of real numbers that make the function \(f\) equal to zero. We define the two following sets:`) + fm(r`E_1 = \{\forall x \in \R,\ f(x) = 0\} \text{ and } E_2 = \{\exists x \in \R,\ f(x) = 0\}`),
    questions: [r`Read these sets aloud. Is one of these two sets equal to \(E\)? Otherwise, give "the good" definition of \(E\) in intention.`, r`Write \(E\) in parametric way.`],
    hints: [r`Between braces you write either elements, or “\(x \in\) (a set), (a condition on \(x\))”. A property alone is not a set.`, r`\(\sin(x) = 0\) for \(x = k\pi\), \(k \in \Z\).`],
    solution: [{ t: 'Reading and the right writing', html: p(r`\(E_1\) reads “the set for all real \(x\), \(f(x) = 0\)”: between the braces there is a <b>property</b> (a false one), not an element nor a condition on a variable. Same for \(E_2\) (a true property). Neither is a set, so neither is \(E\).`) +
      model(p(r`In intention: \(E = \{x \in \R,\ \sin(x) = 0\}\).`) + p(r`In parametric way: \(E = \{k\pi,\ k \in \Z\}\).`)) }],
    answer: p(r`\(E_1\) and \(E_2\) are not sets. \(E = \{x \in \R, \sin(x) = 0\} = \{k\pi, k \in \Z\}\).`),
    traps: [r`Putting a quantifier on the variable of the set: in \(\{x \in \R, \dots\}\), \(x\) is already introduced, do not write \(\forall x\).`],
    note: NOTE_SEM
  };

  M['sem-2-9a'] = {
    src: 'Seminar · Ex 2.9 (1 to 3)', title: 'In extension, in intention, in parametric way',
    questions: [
      r`Express the following sets in extension:` + fm(r`A = \left\{n \in \N,\ \sqrt{2} < n < 2\pi\right\} \text{ and } B = \left\{x \in [0, 20],\ \exists n \in \N,\ x = n^2\right\}`),
      r`Compare the two following sets: \(E = \{n \in \N,\ \exists k \in \N,\ n = 2k\}\) and \(F = \{2p,\ p \in \N\}\).`,
      r`Express the following sets in extension, in intention (using a membership function) and in parametric way (when it's possible):<br>(a) Set of odd natural numbers, smaller than 20.<br>(b) In the plane: the line with linear equation \(y = x\)<br>(c) Set of natural numbers strictly between 2 and 30, and multiple of 4.<br>(d) Set of real solutions of the equation \((x - 1)(x^2 - 5x + 6) = 0\).<br>(e) Set of real numbers between \(-3\pi\) and \(3\pi\), whose sine is 0.<br>(f) The set of all the real even functions.`],
    hints: [r`\(\sqrt{2} \approx 1.41\) and \(2\pi \approx 6.28\).`,
      r`To compare \(E\) and \(F\), prove \(E \subset F\) then \(F \subset E\) (double inclusion).`,
      r`Listing the elements (extension) is only possible for a finite set (or an obvious list); the parametric way describes the elements as “formula, parameter in a set”.`],
    solution: [
      { t: 'Question 1', html: p(r`\(\sqrt{2} \approx 1.41\) and \(2\pi \approx 6.28\), hence \(A = \{2, 3, 4, 5, 6\}\). The squares of natural numbers in \([0, 20]\): \(B = \{0, 1, 4, 9, 16\}\) (\(25 > 20\)).`) },
      { t: 'Question 2: double inclusion', html: model(p(r`Let \(n \in E\) be given. There exists \(k \in \N\) such that \(n = 2k\): \(n\) is \(2p\) with \(p = k \in \N\), so \(n \in F\). Thus \(E \subset F\).`) + p(r`Let \(n \in F\) be given. There exists \(p \in \N\) such that \(n = 2p\). Then \(n \in \N\) and \(k = p\) works, so \(n \in E\). Thus \(F \subset E\).`) + p(r`Hence \(E = F\): it is the set of even natural numbers.`)) },
      { t: 'Question 3', html: tbl(['', 'extension', 'intention', 'parametric'], [
          ['(a)', r`\(\{1, 3, 5, \dots, 19\}\)`, r`\(\{n \in \N,\ n < 20,\ \exists k \in \N,\ n = 2k + 1\}\)`, r`\(\{2k + 1,\ k \in \ent{0}{9}\}\)`],
          ['(b)', 'impossible (infinitely many points)', r`\(\{(x, y) \in \R^2,\ y = x\}\)`, r`\(\{(t, t),\ t \in \R\}\)`],
          ['(c)', r`\(\{4, 8, 12, \dots, 28\}\)`, r`\(\{n \in \N,\ 2 < n < 30,\ \exists k \in \N,\ n = 4k\}\)`, r`\(\{4k,\ k \in \ent{1}{7}\}\)`],
          ['(d)', r`\(\{1, 2, 3\}\)`, r`\(\{x \in \R,\ (x - 1)(x^2 - 5x + 6) = 0\}\)`, '—'],
          ['(e)', r`\(\{-3\pi, -2\pi, -\pi, 0, \pi, 2\pi, 3\pi\}\)`, r`\(\{x \in [-3\pi, 3\pi],\ \sin(x) = 0\}\)`, r`\(\{k\pi,\ k \in \ent{-3}{3}\}\)`],
          ['(f)', 'impossible', r`\(\{f \in \R^{\R},\ \forall x \in \R,\ f(-x) = f(x)\}\)`, '—']], { th: true }) +
        p(r`(d): \(x^2 - 5x + 6 = (x - 2)(x - 3)\), so the solutions are 1, 2 and 3.`) }],
    answer: ul([r`\(A = \{2, 3, 4, 5, 6\}\), \(B = \{0, 1, 4, 9, 16\}\).`, r`\(E = F\) (the even natural numbers), by double inclusion.`, 'Question 3: the table.']),
    traps: [r`Forgetting 0 in \(B\) (\(0 = 0^2\) and \(0 \in \N\)).`, r`Using a parameter that does not appear in the formula: \(\{2x + 1,\ k \in \ent{0}{9}\}\) makes no sense.`],
    note: NOTE_SEM
  };

  M['sem-2-9b'] = {
    src: 'Seminar · Ex 2.9 (4 to 6)', title: 'Reading a set, ∈ or ⊂',
    questions: [
      r`Express in spoken language the following sets. For each of them, give examples of some of its elements and some non-elements.<br>(a) \(E = \{f : \R \longrightarrow \R,\ \forall x \in \R,\ f(x) \geq 0\}\).<br>(b) \(F = \left\{(u_n) \in \R^{\N},\ \forall n \in \N,\ u_{n+1} - u_n \geq 0\right\}\)<br>(c) \(G = \left\{x \in \R,\ \exists y \in \R,\ x = y^2\right\}\)`,
      r`Let \(A = \ent{0}{10}\). Replace each dotted line with one of the symbols \(\in\), \(\notin\), \(\subset\) or \(\not\subset\).<br><b>a)</b> \(-1 \dots A\), <b>b)</b> \(2 \dots A\), <b>c)</b> \(\varnothing \dots A\), <b>d)</b> \(\{5\} \dots A\), <b>(e)</b> \(\{3\} \dots \{1, 2, 3\}\), <b>(f)</b> \(\{3\} \dots \mathcal{P}(A)\).`,
      r`Replace each dotted line with one of the symbols \(\in\), \(\notin\), \(\subset\) or \(\not\subset\) in order to make the property both correctly written and true.<br><b>a)</b> \(-1 \dots \left\{n \in \Z,\ n^2 > 1\right\}\), <b>b)</b> \((1, 2) \dots \left\{(x, y) \in \N^2,\ x^2 + y^2 = 5\right\}\),<br><b>c)</b> \(\{0, 1\} \dots \left\{(x, y) \in \N^2,\ x > y\right\}\), <b>d)</b> \(\{5\} \dots \mathcal{P}(\{-4, 1, 5\})\)`],
    hints: [r`On the left of \(\in\): an element; on the left of \(\subset\): a set. Check the “type” of both sides.`,
      r`The elements of \(\mathcal{P}(A)\) are subsets of \(A\): \(\{3\} \in \mathcal{P}(A)\) means \(\{3\} \subset A\).`],
    solution: [
      { t: 'Question 4: reading the sets', html: ul([
        r`\(E\): the real functions which are non-negative on \(\R\). In \(E\): \(x \mapsto x^2\), \(\exp\), the zero function. Not in \(E\): \(x \mapsto x\), \(\sin\).`,
        r`\(F\): the increasing real sequences. In \(F\): \(u_n = n\), a constant sequence. Not in \(F\): \(u_n = (-1)^n\), \(u_n = -n\).`,
        r`\(G\): the real numbers that are the square of a real number, that is \(G = \left[0, +\infty\right[\). In \(G\): \(0\), \(4 = 2^2\), \(2 = (\sqrt{2})^2\). Not in \(G\): \(-1\).`]) },
      { t: 'Question 5', html: p(r`a) \(-1 \notin A\) b) \(2 \in A\) c) \(\varnothing \subset A\) d) \(\{5\} \subset A\) e) \(\{3\} \subset \{1, 2, 3\}\) f) \(\{3\} \in \mathcal{P}(A)\).`) +
        p(r`For e): \(\{3\}\) is a set whose only element, 3, is in \(\{1, 2, 3\}\): inclusion. \(\{3\} \in \{1, 2, 3\}\) would be false: the elements of \(\{1, 2, 3\}\) are numbers.`) },
      { t: 'Question 6', html: ul([
        r`a) \(-1 \notin \{n \in \Z, n^2 > 1\}\): \((-1)^2 = 1\) is not \(> 1\).`,
        r`b) \((1, 2) \in \{(x, y) \in \N^2, x^2 + y^2 = 5\}\): \(1 + 4 = 5\).`,
        r`c) \(\{0, 1\} \notin \{(x, y) \in \N^2, x > y\}\): \(\{0, 1\}\) is a set, not a 2-tuple. Also \(\{0, 1\} \not\subset\) this set, since \(0\) is not a 2-tuple.`,
        r`d) \(\{5\} \in \mathcal{P}(\{-4, 1, 5\})\).`]) +
        model(p(r`\(\{3\} \subset \{1, 2, 3\}\) because the only element of \(\{3\}\), namely 3, belongs to \(\{1, 2, 3\}\).`) + p(r`\(\{3\} \in \mathcal{P}(A)\) because \(\{3\}\) is a subset of \(A = \ent{0}{10}\).`)) }],
    answer: p(r`5: \(\notin, \in, \subset, \subset, \subset, \in\). 6: \(\notin, \in, \notin\) (and \(\not\subset\)), \(\in\).`),
    traps: [r`Writing \(\{3\} \in \{1, 2, 3\}\): \(\{3\}\) is not a number. Write \(3 \in \{1, 2, 3\}\) or \(\{3\} \subset \{1, 2, 3\}\).`,
      r`Believing that \(\varnothing \in A\): the empty set is <b>included</b> in every set, it is not an element of \(\ent{0}{10}\).`,
      r`Mixing up \(\{0, 1\}\) (a set) and \((0, 1)\) (a 2-tuple).`],
    note: NOTE_SEM
  };

  M['sem-2-10'] = {
    src: 'Seminar · Ex 2.10', title: 'Fill in with ∈, ∉, ⊂; complement in ℤ',
    intro: p(r`Consider the sets \(A = \{x \in \R,\ -1 < x < 10\}\) and \(B = \{n \in \N,\ n + 1 \leq 8\}\).`),
    questions: [r`Find a set \(S\) such that both \(A\) and \(B\) are subsets of \(S\).`,
      r`For each of the following properties, fill the dotted line with an expression such that the property is true (you are not allowed to fill the dotted line with \(\varnothing\)).<br><em>Example : for \(\cdots\cdots \in B\), you can fill the dotted line with \(0\) because \(0 \in B\).</em><br><b>(a)</b> \(\cdots\cdots \in A\) &nbsp; <b>(b)</b> \(\cdots\cdots \notin A \cup B\) &nbsp; <b>(c)</b> \(\cdots\cdots \subset A \cup B\) &nbsp; <b>(d)</b> \(\cdots\cdots \in A \cap B\) &nbsp; <b>(e)</b> \(\cdots\cdots \subset A \times B\).`,
      r`What is the complement of \(B\) in \(\Z\)?`],
    hints: [r`Write \(B\) in extension: \(n + 1 \leq 8\) gives \(n \leq 7\).`, r`\(B \subset A\): what are \(A \cup B\) and \(A \cap B\)?`, r`The elements of \(A \times B\) are 2-tuples; a subset of \(A \times B\) is a set of 2-tuples.`],
    solution: [{ t: 'Solution', html: p(r`\(A = \left]-1, 10\right[\) and \(B = \ent{0}{7}\). Since \(B \subset A\), \(A \cup B = A\) and \(A \cap B = B\).`) +
      ol([r`\(S = \R\) works (\(\N \subset \R\)).`,
        r`For example: (a) \(0 \in A\); (b) \(10 \notin A \cup B\); (c) \(\{0\} \subset A \cup B\) (or \([0, 1]\)); (d) \(3 \in A \cap B\); (e) \(\{(0, 0)\} \subset A \times B\).`,
        r`\(\overline{B} = \Z \setminus B = \{n \in \Z,\ n < 0 \text{ or } n \geq 8\} = \{\dots, -2, -1\} \cup \{8, 9, \dots\}\).`]) +
      model(p(r`\(B = \{n \in \N, n \leq 7\} = \ent{0}{7}\). The complement of \(B\) in \(\Z\) is \(\{n \in \Z,\ n \notin B\} = \{n \in \Z,\ n \leq -1 \text{ or } n \geq 8\}\).`)) }],
    answer: p(r`\(\R\); for example \(0\), \(10\), \(\{0\}\), \(3\), \(\{(0, 0)\}\); \(\Z \setminus B = \{n \in \Z, n < 0 \text{ or } n \geq 8\}\).`),
    traps: [r`Writing \(0 \subset A\) or \((0, 0) \subset A \times B\): an element belongs, a set is included.`, r`Forgetting the negative integers in the complement in \(\Z\).`],
    note: NOTE_SEM
  };

  M['sem-2-11'] = {
    src: 'Seminar · Ex 2.11', title: 'Operations on intervals',
    intro: p(r`Consider these three subsets of \(\R\): \(A = [0, 3]\), \(B = \left]-1, 10\right]\) and \(C = [2, 20]\).`) +
      p(r`Find \(A \cap B\), \(A \cup B\), \((A \cup C) \cap B\), \((A \cap B) \cup (C \cap B)\), \((A \cap C) \cup B\) and \(\overline{A} \cup C\).`) + p('See the similarity with the logical connectors of section 1.'),
    hints: [r`Draw the three intervals on one number line.`, r`\(\overline{A}\) is the complement of \(A\) in \(\R\): \(\left]-\infty, 0\right[ \cup \left]3, +\infty\right[\).`],
    solution: [{ t: 'The six sets', html: ul([
        r`\(A \cap B = [0, 3]\) (since \(A \subset B\)) and \(A \cup B = \left]-1, 10\right]\).`,
        r`\(A \cup C = [0, 20]\), so \((A \cup C) \cap B = [0, 10]\).`,
        r`\(A \cap B = [0, 3]\), \(C \cap B = [2, 10]\), so \((A \cap B) \cup (C \cap B) = [0, 10]\): the same set.`,
        r`\(A \cap C = [2, 3] \subset B\), so \((A \cap C) \cup B = \left]-1, 10\right]\).`,
        r`\(\overline{A} \cup C = \left]-\infty, 0\right[ \cup \left]3, +\infty\right[ \cup [2, 20] = \left]-\infty, 0\right[ \cup \left[2, +\infty\right[\).`]) +
      p(r`Link with logic: \(x \in A \cap B \iff (x \in A) \wedge (x \in B)\), \(x \in A \cup B \iff (x \in A) \vee (x \in B)\), \(x \in \overline{A} \iff \neg(x \in A)\). The equality \((A \cup C) \cap B = (A \cap B) \cup (C \cap B)\) is the distributivity \((P \vee R) \wedge Q \iff (P \wedge Q) \vee (R \wedge Q)\).`) +
      tool('venn', { n: 3, names: ['A', 'B', 'C'], u: 'ℝ', compare: ['(A | C) & B', '(A & B) | (C & B)'], title: 'Distributivity: same regions' }) }],
    answer: p(r`\([0, 3]\); \(\left]-1, 10\right]\); \([0, 10]\); \([0, 10]\); \(\left]-1, 10\right]\); \(\left]-\infty, 0\right[ \cup \left[2, +\infty\right[\).`),
    traps: [r`Getting the brackets wrong: \(-1 \notin B\), \(10 \in B\).`, r`Writing \(\overline{A} = \left]-\infty, 0\right] \cup \left[3, +\infty\right[\): 0 and 3 are in \(A\), so not in \(\overline{A}\).`],
    note: NOTE_SEM
  };

  M['sem-2-12'] = {
    src: 'Seminar · Ex 3.12 (FR 2.12)', title: 'Cartesian product and power set',
    intro: p(r`Consider the sets \(E = \{1, 2, 3\}\) and \(F = \{a, b\}\) (where \(a\) and \(b\) are the characters "a" and "b").`),
    questions: [r`Express in extensions the sets \(E \times F\) and \(F \times E\). How many elements in these sets? How many elements in common?`,
      r`Express in extensions the sets \(\mathcal{P}(E)\) and \(\mathcal{P}(F)\). For an arbitrary \(n\)-element set \(X\) (\(n \in \N\)), do you have an intuition about the number of elements in \(\mathcal{P}(X)\)?`],
    hints: [r`An element of \(E \times F\) is a 2-tuple \((e, f)\): first an element of \(E\), then an element of \(F\).`, r`Forget neither \(\varnothing\) nor the set itself in \(\mathcal{P}(E)\).`],
    solution: [
      { t: 'Question 1', html: fm(r`E \times F = \{(1, a), (1, b), (2, a), (2, b), (3, a), (3, b)\}, \quad F \times E = \{(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3)\}`) +
        p(r`Each has \(3 \times 2 = 6\) elements. No element in common: a 2-tuple of \(E \times F\) has a number in first position, a 2-tuple of \(F \times E\) a letter. So \(E \times F \neq F \times E\).`) },
      { t: 'Question 2', html: fm(r`\mathcal{P}(E) = \{\varnothing, \{1\}, \{2\}, \{3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}, \{1, 2, 3\}\}, \quad \mathcal{P}(F) = \{\varnothing, \{a\}, \{b\}, \{a, b\}\}`) +
        p(r`8 and 4 elements: \(8 = 2^3\), \(4 = 2^2\). Conjecture: if \(X\) has \(n\) elements, \(\mathcal{P}(X)\) has \(2^n\) (each element is in the subset or not: two choices, \(n\) times). It is proved in Tutorial 1.`) +
        model(p(r`\(\mathrm{Card}(\mathcal{P}(E)) = 8 = 2^3 = 2^{\mathrm{Card}(E)}\) and \(\mathrm{Card}(\mathcal{P}(F)) = 4 = 2^{\mathrm{Card}(F)}\).`)) }],
    answer: p(r`6 elements each, none in common; \(\mathrm{Card}\,\mathcal{P}(E) = 8\), \(\mathrm{Card}\,\mathcal{P}(F) = 4\), conjecture \(\mathrm{Card}\,\mathcal{P}(X) = 2^n\).`),
    traps: [r`Writing \(\mathcal{P}(F) = 2^{|F|} = 4\): \(\mathcal{P}(F)\) is a set, its cardinal number is 4.`, r`Forgetting \(\varnothing\) or \(E\) itself in \(\mathcal{P}(E)\).`, r`Believing that \(E \times F = F \times E\): 2-tuples are ordered.`],
    note: NOTE_SEM
  };

  M['sem-2-13'] = {
    src: 'Seminar · Ex 3.13 (FR 2.13)', title: 'Cardinal of a union: partition and inclusion-exclusion',
    questions: [
      r`Let \(E\) and \(F\) be two finite disjoint sets. What is the value of \(\mathrm{Card}(E \cup F)\)?<br>Remark: when two sets \(E\) and \(F\) are disjoint, their union can be denoted: \(E \sqcup F\).`,
      r`Let \(M\) be a finite set. Remind what a "partition of \(M\)" is.`,
      r`Let \(X\) and \(Y\) be two finite sets suc that \(X \subset Y\). Using a partition of \(Y\), prove that \(\mathrm{Card}(Y \setminus X) = \mathrm{Card}(Y) - \mathrm{Card}(X)\).`,
      r`Let \(A\) and \(B\) be two finite non-disjoint sets. Represent graphically these two sets. Express the cardinal of \(A \cup B\) using the cardinals of the partition, then the cardinal of \(A\), \(B\) and \(A \cap B\).`,
      r`Prove the above formula using a partition of \(A \cup B\).`,
      r`An EPITA class has 40 students. It has been observed in this class that: 25 students speak English. 11 students speak Spanish. 6 students speak neither English nor Spanish.<br>Let \(C\) be the set of all the class students, \(E\) the set of students who speak english and \(S\) the set of students wh speak spanish.<br>(a) Express the data of the exercise with these three sets.<br>(b) Compute the number of students who speak both English and Spanish. You must answer using mathematical formulas from the lecture.`],
    hints: [r`A partition of \(M\): non-empty subsets, mutually disjoint, whose union is \(M\).`, r`\(Y = X \sqcup (Y \setminus X)\) and \(A = (A \setminus B) \sqcup (A \cap B)\).`, r`“Neither English nor Spanish”: the complement of \(E \cup S\) in \(C\).`],
    solution: [
      { t: 'Questions 1 to 3', html: ol([
        r`If \(E \cap F = \varnothing\), \(\mathrm{Card}(E \sqcup F) = \mathrm{Card}(E) + \mathrm{Card}(F)\).`,
        r`A partition of \(M\) is a family \((M_1, \dots, M_k)\) of subsets of \(M\), non-empty, mutually disjoint (\(M_i \cap M_j = \varnothing\) if \(i \neq j\)), whose union is \(M\).`,
        r`See the model answer below.`]) +
        model(p(r`Since \(X \subset Y\), \(Y = X \sqcup (Y \setminus X)\): each element of \(Y\) is either in \(X\) or in \(Y \setminus X\), and not in both.`) + p(r`By question 1, \(\mathrm{Card}(Y) = \mathrm{Card}(X) + \mathrm{Card}(Y \setminus X)\), hence \(\mathrm{Card}(Y \setminus X) = \mathrm{Card}(Y) - \mathrm{Card}(X)\).`)) },
      { t: 'Questions 4 and 5: the inclusion-exclusion formula', html: p(r`On the drawing, \(A \cup B\) is split into three regions: \(A \setminus B\), \(A \cap B\), \(B \setminus A\), so \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A \setminus B) + \mathrm{Card}(A \cap B) + \mathrm{Card}(B \setminus A)\). Adding \(\mathrm{Card}(A)\) and \(\mathrm{Card}(B)\) counts \(A \cap B\) twice: \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A) + \mathrm{Card}(B) - \mathrm{Card}(A \cap B)\).`) +
        model(p(r`\(A \cup B = (A \setminus B) \sqcup B\) (disjoint union), so \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A \setminus B) + \mathrm{Card}(B)\).`) + p(r`Furthermore \(A = (A \setminus B) \sqcup (A \cap B)\), so \(\mathrm{Card}(A \setminus B) = \mathrm{Card}(A) - \mathrm{Card}(A \cap B)\).`) + p(r`Thus \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A) + \mathrm{Card}(B) - \mathrm{Card}(A \cap B)\).`)) },
      { t: 'Question 6: the class', html: model(p(r`(a) \(\mathrm{Card}(C) = 40\), \(\mathrm{Card}(E) = 25\), \(\mathrm{Card}(S) = 11\) and \(\mathrm{Card}(C \setminus (E \cup S)) = 6\).`) +
        p(r`(b) \(E \cup S \subset C\), so by question 3: \(\mathrm{Card}(E \cup S) = \mathrm{Card}(C) - \mathrm{Card}(C \setminus (E \cup S)) = 40 - 6 = 34\).`) +
        p(r`By the inclusion-exclusion formula: \(\mathrm{Card}(E \cup S) = \mathrm{Card}(E) + \mathrm{Card}(S) - \mathrm{Card}(E \cap S)\), so \(\mathrm{Card}(E \cap S) = 25 + 11 - 34 = 2\).`) + p('Two students speak both languages.')) +
        p(r`Check: 23 speak English only, 9 Spanish only, 2 both, 6 neither: \(23 + 9 + 2 + 6 = 40\).`) }],
    answer: p(r`\(\mathrm{Card}(E \sqcup F) = \mathrm{Card}\,E + \mathrm{Card}\,F\); \(\mathrm{Card}(A \cup B) = \mathrm{Card}\,A + \mathrm{Card}\,B - \mathrm{Card}(A \cap B)\); 2 students speak both languages.`),
    traps: [r`Forgetting to subtract \(\mathrm{Card}(E \cap S)\): \(25 + 11 = 36\) is more than the 34 students who speak at least one language.`, r`Writing the general inclusion-exclusion formula to answer question 1: for disjoint sets, the expected answer is \(\mathrm{Card}\,E + \mathrm{Card}\,F\).`],
    note: NOTE_SEM
  };

  /* ===================== Seminar, part II: functions (English sections 4 and 5) ===================== */
  M['sem-3-14'] = {
    src: 'Seminar · Ex 4.14 (FR 3.14)', title: 'Which figures represent a function?',
    intro: p(r`For each of the figures below, say whether it represents a function from \(E\) to \(F\).`) + T.fig314(['Figure']),
    hints: [r`A function from \(E\) to \(F\) maps <b>each</b> element of \(E\) to <b>exactly one</b> image in \(F\): one arrow, neither zero nor two, leaves each element of \(E\).`,
      r`The elements of \(F\) may receive zero, one or several arrows.`],
    solution: [{ t: 'One arrow, and only one, from each input element', html: ul([
        r`Figure 1: <b>not a function</b>, \(c\) has no image.`,
        r`Figure 2: <b>not a function</b>, \(d\) has two images (2 and 3).`,
        r`Figure 3: <b>a function</b>: \(a \mapsto 1\), \(b \mapsto 4\), \(c \mapsto 1\), \(d \mapsto 4\). That 2 and 3 have no pre-image does not matter (it is simply not surjective).`]) +
      tool('sagittal', { E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4'], f: { a: '1', b: '4', c: '1', d: '4' }, modes: ['props', 'edit'], title: 'Figure 3 (edit the arrows to get figures 1 and 2)' }) }],
    answer: p('Only figure 3 represents a function.'),
    traps: [r`Rejecting figure 3 because two arrows reach the same element of \(F\): this is allowed (the function is not injective, but it is a function).`],
    note: NOTE_SEM
  };

  M['sem-3-15'] = {
    src: 'Seminar · Ex 4.15 (FR 3.15)', title: 'Images and reverse images on a figure',
    intro: p(r`Let \(f : \{a, b, c, d\} \longrightarrow \{1, 2, 3, 4, 5\}\) be the function defined by the following figure:`) + T.fig315('Figure of f') +
      p(r`Find: \(f(\{a, b, c\})\), \(f(\{a, b, c, d\})\), \(f^{-1}(\{2, 3\})\) and \(f^{-1}(\{1, 5\})\).`),
    hints: [r`\(f(A) = \{f(x),\ x \in A\}\): follow the arrows leaving \(A\).`, r`\(f^{-1}(B) = \{x \in E,\ f(x) \in B\}\): go back along the arrows arriving in \(B\).`],
    solution: [{ t: 'Follow the arrows', html: ul([
        r`\(f(\{a, b, c\}) = \{f(a), f(b), f(c)\} = \{2, 2, 3\} = \{2, 3\}\).`,
        r`\(f(\{a, b, c, d\}) = \{2, 3, 5\}\).`,
        r`\(f^{-1}(\{2, 3\}) = \{x,\ f(x) \in \{2, 3\}\} = \{a, b, c\}\).`,
        r`\(f^{-1}(\{1, 5\}) = \{d\}\): 1 has no pre-image, which is fine.`]) +
      tool('sagittal', { E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4', '5'], f: { a: '2', b: '2', c: '3', d: '5' }, mode: 'image', A: ['a', 'b', 'c'], B: ['2', '3'], modes: ['image', 'preimage'], title: 'Direct image, reverse image' }) }],
    answer: p(r`\(\{2, 3\}\), \(\{2, 3, 5\}\), \(\{a, b, c\}\), \(\{d\}\).`),
    traps: [r`Writing \(\{2, 2, 3\}\) without simplifying, or answering with a number instead of a set.`, r`Believing that \(f^{-1}\) does not exist because \(f\) is not bijective: the reverse image of a set always exists.`],
    note: NOTE_SEM
  };

  M['sem-3-16'] = {
    src: 'Seminar · Ex 4.16 (FR 3.16)', title: 'Build a function with constraints on images',
    intro: p(r`For each of the following properties, define a function (using a figure) from \(\ent{1}{4}\) to \(\ent{1}{5}\) such that the property is fulfilled.`),
    questions: [r`\(f(\ent{1}{4}) = \{1, 4\}\)`, r`\(f^{-1}(\{3, 4\}) = \{1, 2\}\)`, r`\(f(\{1, 2, 3\}) = \{3\}\) and \(f^{-1}(\{3, 5\}) = \{1, 2, 3\}\)`, r`\(f^{-1}(\{2\}) = \{2, 3\}\) and \(f(\{1, 2\}) = \{1, 2\}\)`],
    hints: [r`Turn each condition into constraints on \(f(1), f(2), f(3), f(4)\). Example: \(f^{-1}(\{3, 4\}) = \{1, 2\}\) means \(f(1), f(2) \in \{3, 4\}\) <b>and</b> \(f(3), f(4) \notin \{3, 4\}\).`,
      r`Each element of \(\ent{1}{4}\), 4 included, must have an image.`],
    solution: [{ t: 'One solution per question (there are others)', html: ol([
        r`\(f(1) = f(2) = f(3) = 1\), \(f(4) = 4\): the images are exactly 1 and 4.`,
        r`\(f(1) = f(2) = 3\), \(f(3) = f(4) = 1\): \(f(1), f(2) \in \{3, 4\}\) and \(f(3), f(4) \notin \{3, 4\}\).`,
        r`\(f(1) = f(2) = f(3) = 3\) and \(f(4) \in \{1, 2, 4\}\), for example \(f(4) = 1\): \(f(4)\) must be neither 3 nor 5.`,
        r`\(f(2) = f(3) = 2\), \(f(1) = 1\) (so that \(f(\{1, 2\}) = \{1, 2\}\)) and \(f(4) \neq 2\), for example \(f(4) = 1\).`]) +
      p(r`Enumerating the \(5^4 = 625\) functions from \(\ent{1}{4}\) to \(\ent{1}{5}\): 14, 36, 3 and 4 functions work.`) +
      tool('sagittal', { E: ['1', '2', '3', '4'], F: ['1', '2', '3', '4', '5'], f: { 1: '1', 2: '2', 3: '2', 4: '1' }, mode: 'preimage', B: ['2'], modes: ['preimage', 'image', 'edit'], names: ['⟦1, 4⟧', '⟦1, 5⟧', 'f'], title: 'Question 4 (edit the arrows to try the others)' }) +
      model(p(r`4. Set \(f(1) = 1\), \(f(2) = 2\), \(f(3) = 2\), \(f(4) = 1\).`) + p(r`Then \(f^{-1}(\{2\}) = \{x \in \ent{1}{4},\ f(x) = 2\} = \{2, 3\}\) and \(f(\{1, 2\}) = \{f(1), f(2)\} = \{1, 2\}\).`)) }],
    answer: p(r`For example \((f(1), f(2), f(3), f(4))\) = \((1, 1, 1, 4)\); \((3, 3, 1, 1)\); \((3, 3, 3, 1)\); \((1, 2, 2, 1)\).`),
    traps: [r`Leaving 4 without an image (question 4): the figure is no longer a function.`, r`Forgetting the “\(\notin\)” half of a reverse image: \(f^{-1}(\{2\}) = \{2, 3\}\) also forbids \(f(1) = 2\) and \(f(4) = 2\).`],
    note: NOTE_SEM
  };

  M['sem-3-17'] = {
    src: 'Seminar · Ex 4.17 (FR 3.17)', title: 'Images of intervals under exp, x², sin',
    intro: p(r`Consider in \(\R^{\R}\) the two functions \(f : x \longmapsto e^x\) and \(g : x \longmapsto x^2\) and, on \([-\pi, \pi]\), the function \(h : x \longmapsto \sin(x)\).`),
    questions: ['Draw the graphs of these functions.',
      r`Find the sets:<br>– \(f(\R)\) and \(f^{-1}(\{0\})\);<br>– \(g([-1, 4])\) and \(g^{-1}([-1, 4])\);<br>– \(h([-\pi, \pi])\), \(h([0, \pi/2])\), \(h^{-1}([0, 1])\), \(h^{-1}([1, 2])\) and \(h^{-1}([3, 4])\).`],
    hints: [r`Image of an interval: read on the graph the values taken (minimum and maximum reached, variations).`,
      r`Reverse image: solve the inequality <b>in the input set</b> (\([-\pi, \pi]\) for \(h\)).`,
      r`\(\sin(-\pi) = 0\): look at the ends of the interval.`],
    solution: [
      { t: 'f = exp and g = square', html: ul([
        r`\(f(\R) = \left]0, +\infty\right[\): \(\exp\) is positive, and every \(y > 0\) equals \(e^{\ln y}\).`,
        r`\(f^{-1}(\{0\}) = \varnothing\): \(e^x = 0\) has no solution.`,
        r`\(g([-1, 4]) = [0, 16]\): on \([-1, 0]\), \(x^2\) covers \([0, 1]\); on \([0, 4]\), it covers \([0, 16]\).`,
        r`\(g^{-1}([-1, 4]) = \{x \in \R,\ -1 \leq x^2 \leq 4\} = [-2, 2]\) (\(x^2 \geq -1\) always holds).`]) },
      { t: 'h = sin on [−π, π]', html: ul([
        r`\(h([-\pi, \pi]) = [-1, 1]\) and \(h([0, \pi/2]) = [0, 1]\) (\(\sin\) increases from 0 to 1 on \([0, \pi/2]\)).`,
        r`\(h^{-1}([0, 1]) = \{x \in [-\pi, \pi],\ \sin(x) \geq 0\} = \{-\pi\} \cup [0, \pi]\).`,
        r`\(h^{-1}([1, 2]) = \{x \in [-\pi, \pi],\ \sin(x) = 1\} = \{\pi/2\}\).`,
        r`\(h^{-1}([3, 4]) = \varnothing\) (\(\sin \leq 1\)).`]) +
        T.figSin('h = sin on [−π, π]: the band [0, 1] and its reverse image', [0, 1], [[-PI, -PI], [0, PI]]) +
        model(p(r`\(h^{-1}([0, 1]) = \{x \in [-\pi, \pi],\ 0 \leq \sin(x) \leq 1\}\). On \([-\pi, \pi]\), \(\sin(x) \geq 0\) for \(x \in [0, \pi]\) and for \(x = -\pi\) (\(\sin(-\pi) = 0\)).`) + p(r`Hence \(h^{-1}([0, 1]) = \{-\pi\} \cup [0, \pi]\).`)) }],
    answer: p(r`\(\left]0, +\infty\right[\), \(\varnothing\); \([0, 16]\), \([-2, 2]\); \([-1, 1]\), \([0, 1]\), \(\{-\pi\} \cup [0, \pi]\), \(\{\pi/2\}\), \(\varnothing\).`),
    traps: [r`Forgetting \(-\pi\) in \(h^{-1}([0, 1])\): \(\sin(-\pi) = 0 \in [0, 1]\).`, r`Writing “\(f(\R) > 0\)”: \(f(\R)\) is a set, write \(\left]0, +\infty\right[\).`, r`Believing that \(g([-1, 4]) = [1, 16]\) by computing only \(g(-1)\) and \(g(4)\): \(g\) is not monotonic on \([-1, 4]\), it goes through 0.`],
    note: NOTE_SEM
  };

  M['sem-3-18'] = {
    src: 'Seminar · Ex 4.18 (FR 3.18)', title: 'Table of images: exp, sin, ln',
    intro: p('Complete the following table.') + p('N.B.: it is a good idea to draw, before answering, the functions\' graphs on your draft!') +
      tbl([r`\(f\)`, r`\(\exp : \R \longrightarrow \R\)`, r`\(\sin : [-\pi, \pi] \longrightarrow \R\)`, r`\(\ln : \left]0, +\infty\right[ \longrightarrow \R\)`],
        [[r`\(f(\{0\})\)`, '', '', ''], [r`\(f(\left]0, \pi\right])\)`, '', '', ''], [r`\(f^{-1}(\{0\})\)`, '', '', ''], [r`\(f^{-1}(\{1\})\)`, '', '', ''], [r`\(f^{-1}(\left]-\infty, 0\right])\)`, '', '', '']], { th: true }),
    hints: [r`A direct image is read on the vertical axis, a reverse image on the horizontal axis, inside the input set.`,
      r`Open or closed bound: closed if the value is reached. \(\exp(0) = 1\) but 0 is excluded from \(\left]0, \pi\right]\).`,
      r`For \(\ln\), the input set is \(\left]0, +\infty\right[\): 0 is not in it.`],
    solution: [{ t: 'The completed table', html: tbl([r`\(f\)`, r`\(\exp\)`, r`\(\sin\) on \([-\pi, \pi]\)`, r`\(\ln\)`], [
        [r`\(f(\{0\})\)`, r`\(\{1\}\)`, r`\(\{0\}\)`, 'not defined (0 is not in the input set)'],
        [r`\(f(\left]0, \pi\right])\)`, r`\(\left]1, e^{\pi}\right]\)`, r`\([0, 1]\)`, r`\(\left]-\infty, \ln \pi\right]\)`],
        [r`\(f^{-1}(\{0\})\)`, r`\(\varnothing\)`, r`\(\{-\pi, 0, \pi\}\)`, r`\(\{1\}\)`],
        [r`\(f^{-1}(\{1\})\)`, r`\(\{0\}\)`, r`\(\{\pi/2\}\)`, r`\(\{e\}\)`],
        [r`\(f^{-1}(\left]-\infty, 0\right])\)`, r`\(\varnothing\)`, r`\([-\pi, 0] \cup \{\pi\}\)`, r`\(\left]0, 1\right]\)`]], { th: true }) +
      ul([r`\(\exp\) is increasing: \(\exp(\left]0, \pi\right]) = \left]e^0, e^{\pi}\right] = \left]1, e^{\pi}\right]\).`,
        r`\(\sin\) on \(\left]0, \pi\right]\): it rises from \(0\) (not reached at 0) to 1 at \(\pi/2\), then goes down to 0, <b>reached</b> at \(\pi\): the image is \([0, 1]\).`,
        r`\(\sin(x) \leq 0\) on \([-\pi, \pi]\): for \(x \in [-\pi, 0]\) and for \(x = \pi\).`,
        r`\(\ln\) is increasing, \(\ln(x) \leq 0 \iff 0 < x \leq 1\).`]) +
      T.figSin('sin on [−π, π]: where sin(x) ≤ 0', [-1.3, 0], [[-PI, 0], [PI, PI]]) +
      note(r`\(\ln(\{0\})\) makes no sense: the image is only defined for a subset of the input set. If you take the image of the elements of \(\{0\}\) that lie in \(\left]0, +\infty\right[\), you get \(\varnothing\).`) }],
    answer: p('The table above.'),
    traps: [r`Writing \(\exp(\left]0, \pi\right]) = [1, e^{\pi}]\): 0 is excluded, so 1 is not reached.`, r`Forgetting \(\pi\) in \(\sin^{-1}(\left]-\infty, 0\right])\), or \(-\pi\) and \(\pi\) in \(\sin^{-1}(\{0\})\).`, r`Writing \(\sin(\left]0, \pi\right]) = \left]0, 1\right]\): \(\sin(\pi) = 0\) is reached.`],
    note: NOTE_SEM
  };

  M['sem-3-19'] = {
    src: 'Seminar · Ex 5.19 (FR 3.19)', title: 'x ↦ x²: injective, surjective depending on the sets',
    intro: p(r`Discuss the injectivity and surjectivity of the function \(f : \begin{cases} E \longrightarrow F \\ x \longmapsto x^2 \end{cases}\) in the following situations:`),
    questions: [r`\(E = \R\) and \(F = \R\)`, r`\(E = \R\) and \(F = \R^+\)`, r`\(E = \R^+\) and \(F = \R\)`, r`\(E = \R^+\) and \(F = \R^+\)`],
    hints: [r`Injective: \(\forall (x, x') \in E^2,\ f(x) = f(x') \implies x = x'\). To disprove it: two distinct elements with the same image.`,
      r`Surjective: \(\forall y \in F,\ \exists x \in E,\ y = f(x)\). To disprove it: a \(y\) in \(F\) without pre-image.`,
      r`Injectivity depends on the input set, surjectivity on the output set.`],
    solution: [{ t: 'The four cases', html: ol([
        r`<b>Neither injective nor surjective</b>: \(f(-1) = f(1) = 1\) with \(-1 \neq 1\); \(-1\) has no pre-image (\(x^2 \geq 0\)).`,
        r`<b>Surjective, not injective</b>: let \(y \in \R^+\), \(x = \sqrt{y} \in \R\) satisfies \(x^2 = y\); but \(f(-1) = f(1)\).`,
        r`<b>Injective, not surjective</b>: let \(x, x' \in \R^+\) with \(x^2 = x'^2\); then \(|x| = |x'|\), and since \(x, x' \geq 0\), \(x = x'\). But \(-1\) has no pre-image.`,
        r`<b>Bijective</b>: injective as in 3, surjective as in 2 (\(\sqrt{y} \in \R^+\)). Its inverse function is \(y \mapsto \sqrt{y}\).`]) +
      model(p(r`Case 4. Injectivity: let \(x, x' \in \R^+\) such that \(x^2 = x'^2\). Then \(\sqrt{x^2} = \sqrt{x'^2}\), that is \(|x| = |x'|\), and since \(x \geq 0\) and \(x' \geq 0\), \(x = x'\).`) +
        p(r`Surjectivity: let \(y \in \R^+\) be given. Set \(x = \sqrt{y}\). Then \(x \in \R^+\) and \(f(x) = (\sqrt{y})^2 = y\).`) + p(r`Hence \(f\) is bijective from \(\R^+\) to \(\R^+\).`)) }],
    answer: p('1: neither; 2: surjective only; 3: injective only; 4: bijective.'),
    traps: [r`Starting surjectivity with “Let \(y \in \R\)” when the output set is \(\R^+\): take \(y\) in the output set.`, r`Taking \(x, x' \in \R\) for injectivity in case 3: they are in \(\R^+\), which is what makes the proof work.`],
    note: NOTE_SEM
  };

  M['sem-3-20'] = {
    src: 'Seminar · Ex 5.20 (FR 3.20)', title: 'Injection, surjection, bijection between small sets',
    questions: [r`Using a figure, define an injective function from \(\ent{1}{4}\) to \(\ent{1}{5}\). Can this function be surjective?`,
      r`Using a figure, define a surjective function from \(\ent{1}{4}\) to \(\ent{1}{3}\). Can this function be injective?`,
      'Getting your intuitions from the previous questions, define a bijective function.'],
    hints: [r`An injective function maps the 4 input elements to 4 distinct images.`, r`Count: how many images at most for 4 input elements?`],
    solution: [{ t: 'Examples and impossibilities', html: ol([
        r`\(k \mapsto k\) is injective from \(\ent{1}{4}\) to \(\ent{1}{5}\). No function from \(\ent{1}{4}\) to \(\ent{1}{5}\) is surjective: the image has at most 4 elements, 5 would be needed.`,
        r`\(1 \mapsto 1\), \(2 \mapsto 2\), \(3 \mapsto 3\), \(4 \mapsto 3\) is surjective. None can be injective: 4 elements for 3 images, two elements necessarily share an image.`,
        r`The input and output sets need the same number of elements: \(k \mapsto k\) from \(\ent{1}{4}\) to \(\ent{1}{4}\) (or from \(\ent{1}{3}\) to \(\ent{1}{3}\)) is bijective.`]) +
      tool('sagittal', { E: ['1', '2', '3', '4'], F: ['1', '2', '3', '4', '5'], f: { 1: '1', 2: '2', 3: '3', 4: '4' }, modes: ['props', 'edit'], names: ['⟦1, 4⟧', '⟦1, 5⟧', 'f'], title: 'Try to make it surjective' }) }],
    answer: p(r`Injective: \(k \mapsto k\), never surjective (4 < 5). Surjective: \(4 \mapsto 3\) and \(k \mapsto k\) otherwise, never injective (4 > 3). Bijective: the identity of \(\ent{1}{4}\).`),
    traps: [r`Proposing a bijection from \(\ent{1}{4}\) to \(\ent{1}{5}\): impossible, the cardinal numbers differ.`],
    note: NOTE_SEM
  };

  M['sem-3-21'] = {
    src: 'Seminar · Ex 5.21 (FR 3.21)', title: 'A function given by its graph: choose the intervals',
    intro: p(r`Consider the function \(f : [-6, 7] \longrightarrow \R\) whose graph is the following:`) + T.fig321('Graph of f on [−6, 7]'),
    questions: [r`Is \(f\) injective from \([-6, 7]\) to \(\R\)? Same question for surjective.`,
      r`Find two intervals \(A \subset [-6, 7]\) and \(B \subset \R\) such that \(f : A \longrightarrow B\) is injective, not surjective.`,
      r`Find two intervals \(A' \subset [-6, 7]\) and \(B' \subset \R\) such that \(f : A' \longrightarrow B'\) is surjective, not injective.`],
    hints: [r`Draw the horizontal line \(y = 3\): how many intersection points?`, r`Read \(f([-6, 7])\) on the vertical axis: the minimum and the maximum reached.`, r`For \(f : A \to B\) to make sense, you need \(f(A) \subset B\).`],
    solution: [{ t: 'Solution', html: p(r`The graph goes through \((-6, 0)\), \((-2, 3)\), \((0, -1)\) and \((7, 6)\): \(f\) increases on \([-6, -2]\), decreases on \([-2, 0]\), increases on \([0, 7]\) (\(f(x) = x - 1\) on this piece). Its minimum is \(-1\), its maximum \(6\): \(f([-6, 7]) = [-1, 6]\).`) +
      ol([r`<b>Not injective</b>: \(f(-2) = 3 = f(4)\) and \(-2 \neq 4\). <b>Not surjective</b> to \(\R\): \(10\) has no pre-image (\(f(x) \leq 6\)).`,
        r`For example \(A = [0, 7]\) and \(B = \R\): \(f\) is strictly increasing on \([0, 7]\) so injective; \(10 \in \R\) has no pre-image.`,
        r`For example \(A' = [-6, 7]\) and \(B' = [-1, 6] = f([-6, 7])\): surjective by construction, and still \(f(-2) = f(4)\).`]) +
      T.fig321('Graph of f: the line y = 3 meets it twice', { dash: [[-6.6, 3, 7.6, 3]], xsel: [[-2, -2], [4, 4]] }) +
      model(p(r`\(f(-2) = 3\) and \(f(4) = 3\) with \(-2 \neq 4\): \(f\) is not injective on \([-6, 7]\).`) + p(r`For every \(x \in [-6, 7]\), \(f(x) \leq 6\): \(10\) has no pre-image, \(f\) is not surjective from \([-6, 7]\) to \(\R\).`)) }],
    answer: p(r`Neither injective (\(f(-2) = f(4)\)) nor surjective (10). For example \(A = [0, 7]\), \(B = \R\); \(A' = [-6, 7]\), \(B' = [-1, 6]\).`),
    traps: [r`Choosing \(B\) that does not contain \(f(A)\): \(f : A \to B\) is then not a function.`, r`Choosing sets that are not intervals (the statement requires intervals).`],
    note: NOTE_SEM
  };

  M['sem-3-22'] = {
    src: 'Seminar · Ex 5.22 (FR 3.22)', title: 'Study of x ↦ sin(4x)',
    intro: p(r`Let \(f : x \longmapsto \sin(4x)\). Let \(\mathcal{C}_f\) be the graph of \(f\).`),
    questions: [r`Give the definition domain of \(f\).`, r`Prove that \(f\) is \(\dfrac{\pi}{2}\)-périodic.`, r`Is \(f\) an even function? an odd functio? Justify.`,
      r`Explain why it is sufficient to study \(f\) on \(\left[0, \dfrac{\pi}{4}\right]\). How is it reflected on \(\mathcal{C}_f\)?`,
      r`Study of \(f\) on \(\left[0, \dfrac{\pi}{4}\right]\): compute the derivative of \(f\) on \(\left[0, \dfrac{\pi}{4}\right]\) and show that its sign changes at \(\dfrac{\pi}{8}\). Make the table of variations.`,
      r`Draw the graph of \(f\) on \(I = \left[-\dfrac{\pi}{4}, \dfrac{\pi}{4}\right]\).`,
      r`Is \(f\) bijective from \(I\) to \(\R\)? Otherwise, find two intervals \(I' \subset I\) and \(J \subset \R\) such that \(f\) is bijective from \(I'\) to \(J\).`],
    hints: [r`\(\sin\) is \(2\pi\)-periodic: \(\sin(4x + 2\pi) = \sin(4x)\).`, r`\(f'(x) = 4\cos(4x)\). On \(\left[0, \frac{\pi}{4}\right]\), \(4x\) covers \([0, \pi]\).`, r`For a bijection, take an interval where \(f\) is strictly monotonic, and its image.`],
    solution: [
      { t: 'Questions 1 to 4: reduce the interval of study', html: ol([
        r`\(f\) is defined on \(\R\).`,
        r`For all \(x \in \R\), \(f\left(x + \dfrac{\pi}{2}\right) = \sin(4x + 2\pi) = \sin(4x) = f(x)\).`,
        r`For all \(x \in \R\), \(-x \in \R\) and \(f(-x) = \sin(-4x) = -\sin(4x) = -f(x)\): \(f\) is odd. It is not even: \(f\left(\frac{\pi}{8}\right) = 1\) and \(f\left(-\frac{\pi}{8}\right) = -1\).`,
        r`By periodicity, it is enough to study \(f\) on an interval of length \(\frac{\pi}{2}\), for example \(\left[-\frac{\pi}{4}, \frac{\pi}{4}\right]\); since \(f\) is odd, on \(\left[0, \frac{\pi}{4}\right]\). Then \(\mathcal{C}_f\) is obtained by the point symmetry about \(O\), then by the translations of vectors \(k\frac{\pi}{2}\vec{\imath}\), \(k \in \Z\).`]) },
      { t: 'Questions 5 and 6: derivative and variations', html: p(r`\(f\) is differentiable and \(f'(x) = 4\cos(4x)\). For \(x \in \left[0, \frac{\pi}{4}\right]\), \(4x \in [0, \pi]\): \(\cos(4x) > 0\) if \(4x < \frac{\pi}{2}\), that is \(x < \frac{\pi}{8}\); \(\cos(4x) = 0\) at \(x = \frac{\pi}{8}\); \(\cos(4x) < 0\) if \(x > \frac{\pi}{8}\).`) +
        tbl([r`\(x\)`, r`\(0\)`, '', r`\(\pi/8\)`, '', r`\(\pi/4\)`], [[r`\(f'(x)\)`, '', '+', '0', '−', ''], [r`\(f(x)\)`, '0', '↗', '1', '↘', '0']], { th: true, w: 26 }) +
        T.figSin4('sin(4x) on [−π/4, π/4]') },
      { t: 'Question 7: bijection', html: model(p(r`\(f\) is not bijective from \(I\) to \(\R\): for example \(2\) has no pre-image (\(f(x) \leq 1\)), and \(f(0) = f\left(\frac{\pi}{4}\right) = 0\).`) +
        p(r`On \(I' = \left[-\frac{\pi}{8}, \frac{\pi}{8}\right]\), \(f\) is continuous and strictly increasing (\(f' > 0\) on \(\left]-\frac{\pi}{8}, \frac{\pi}{8}\right[\)), with \(f\left(-\frac{\pi}{8}\right) = -1\) and \(f\left(\frac{\pi}{8}\right) = 1\): it is bijective from \(I'\) to \(J = [-1, 1]\).`)) }],
    answer: p(r`\(\R\); \(\frac{\pi}{2}\)-periodic; odd; maximum 1 at \(\frac{\pi}{8}\); bijective from \(\left[-\frac{\pi}{8}, \frac{\pi}{8}\right]\) to \([-1, 1]\).`),
    traps: [r`Placing the sign change of \(f'\) at \(\frac{\pi}{4}\): \(\cos(4x) = 0\) for \(4x = \frac{\pi}{2}\), that is \(x = \frac{\pi}{8}\).`, r`Answering “\(f : \R \to [-1, 1]\)” to question 1: the definition domain is asked, \(\R\).`, r`One defect (injectivity or surjectivity) is enough to say “not bijective”, but it must be justified.`],
    note: NOTE_SEM
  };

  M['sem-3-23'] = {
    src: 'Seminar · Ex 5.23 (FR 3.23)', title: 'Compositions of functions',
    questions: [
      r`Let \(f\), \(g\) and \(h\) be the functions of \(\R^{\R}\) defined for any \(x \in \R\) by: \(f(x) = x^2\), \(g(x) = x + 1\) and \(h(x) = \cos(x)\).<br>Write explicit formulas for the functions \(f \circ f\), \(f \circ g\), \(g \circ f\), \(g \circ g\), \(g \circ h\) and \(h \circ g\).`,
      r`In \(\R^{\R}\), consider the functions \(f : x \longmapsto 2x\), \(g : x \longmapsto -2x\) and \(h : x \longmapsto x^2\).<br>Compare \(h \circ f\) with \(h \circ g\). What can you deduce from that?`,
      r`Consider two functions \(f : [0, 1] \longrightarrow \R\) and \(g : \R \longrightarrow \R^+\). Which composition(s) is(are) possible?`,
      r`Express \(f : x \longmapsto e^{\sqrt{x^2 + 1}}\), \(g : x \longmapsto \sin^3(\cos(3x + 6))\) and \(h : x \longmapsto \ln\left(\sin^2(x^3)\right)\) as compositions of usual functions.`],
    hints: [r`\((g \circ f)(x) = g(f(x))\): \(f\) is applied first.`, r`\(g \circ f\) exists only if the output set of \(f\) is included in the input set of \(g\).`, r`To decompose, read the formula from the inside out.`],
    solution: [
      { t: 'Questions 1 and 2', html: ul([r`\(f \circ f(x) = (x^2)^2 = x^4\); \(f \circ g(x) = (x + 1)^2 = x^2 + 2x + 1\); \(g \circ f(x) = x^2 + 1\).`,
        r`\(g \circ g(x) = x + 2\); \(g \circ h(x) = \cos(x) + 1\); \(h \circ g(x) = \cos(x + 1)\).`]) +
        p(r`\(f \circ g \neq g \circ f\): composition is not commutative.`) +
        p(r`2. \(h \circ f(x) = (2x)^2 = 4x^2\) and \(h \circ g(x) = (-2x)^2 = 4x^2\): \(h \circ f = h \circ g\) although \(f \neq g\). We cannot “simplify by \(h\)” (here because \(h\) is not injective).`) },
      { t: 'Question 3', html: ul([r`\(g \circ f\): possible, \(f\) outputs in \(\R\), the input set of \(g\); \(g \circ f : [0, 1] \to \R^+\).`,
        r`\(g \circ g\): possible, \(\R^+ \subset \R\); \(g \circ g : \R \to \R^+\).`,
        r`\(f \circ g\) and \(f \circ f\): not possible in general, \(\R^+\) and \(\R\) are not included in \([0, 1]\), the input set of \(f\).`]) },
      { t: 'Question 4', html: ul([r`\(f = \exp \circ \sqrt{\ } \circ u\) with \(u(x) = x^2 + 1\).`, r`\(g = c \circ \sin \circ \cos \circ v\) with \(c(x) = x^3\) and \(v(x) = 3x + 6\).`, r`\(h = \ln \circ s \circ \sin \circ w\) with \(s(x) = x^2\) and \(w(x) = x^3\).`]) +
        model(p(r`For all \(x \in \R\), \(f(x) = \exp\left(\sqrt{u(x)}\right)\) with \(u : x \mapsto x^2 + 1\), so \(f = \exp \circ \sqrt{\ } \circ u\).`)) }],
    answer: p(r`\(x^4\), \((x + 1)^2\), \(x^2 + 1\), \(x + 2\), \(\cos x + 1\), \(\cos(x + 1)\); \(h \circ f = h \circ g\) though \(f \neq g\); only \(g \circ f\) and \(g \circ g\) exist.`),
    traps: [r`Mixing up \(f \circ g\) and \(g \circ f\): \(f \circ g(x) = f(g(x))\), \(g\) is applied first.`, r`Deducing \(f = g\) from \(h \circ f = h \circ g\).`],
    note: NOTE_SEM
  };

  M['sem-3-24a'] = {
    src: 'Seminar · Ex 5.24 (start and 1; FR 3.24)', title: 'Bijection and unique pre-image; the tangent function',
    intro: p(r`Let \(E\) and \(F\) be two sets and \(f\) a function from \(E\) to \(F\). Show that:`) + fm(r`f \text{ bijective} \iff \forall y \in F,\ \exists !\, x \in E \text{ such that } y = f(x).`) +
      p('<b>We accept without proof the following theorem.</b>') +
      '<div class="box thm"><span class="tag">Theorem</span>' + p(r`Let \(E\) and \(F\) be two sets and \(f \in F^E\). Then, \(f\) bijective \(\iff \exists g : F \longrightarrow E\) such that \(\forall x \in E,\ g \circ f(x) = x\) and \(\forall y \in F,\ f \circ g(y) = y\).`) +
      p(r`If such a function \(g\) exists, then it is unique and it is called the "inverse function of \(f\)" (denoted by \(g = f^{-1}\)). Thus, for all bijective function \(f\) from \(E\) to \(F\): \(\begin{cases} y = f(x) \\ x \in E \end{cases} \iff \begin{cases} x = f^{-1}(y) \\ y \in F \end{cases}\). Furthermore, \(\forall x \in E,\ f^{-1} \circ f(x) = x\) and \(\forall y \in F,\ f \circ f^{-1}(y) = y\).`) +
      p(r`The graphs of \(f\) and \(f^{-1}\) are symmetric regarding the line of equation \(y = x\).`) + '</div>' +
      p(r`<b>Practical case: the \(\arctan\) function. To remember by heart.</b> Consider the function \(\tan : x \longmapsto \tan(x) = \dfrac{\sin(x)}{\cos(x)}\).`),
    questions: [r`Study of the \(\tan\) function:<br>(a) Find its definition domain \(D\).<br>(b) Prove that it is \(\pi\)-periodic and odd on \(D\).<br>(c) Compute its derivative. Give the slope of the tangent at \(0\).<br>(d) Explain why the \(\tan\) function is bijective from \(\left]-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right[\) to \(\R\).`],
    hints: [r`For \(\implies\): existence comes from surjectivity, uniqueness from injectivity. For \(\impliedby\): read existence and uniqueness as the two definitions.`, r`\(\cos(x + \pi) = -\cos x\) and \(\sin(x + \pi) = -\sin x\).`, r`Derivative of a quotient: \(\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}\).`],
    solution: [
      { t: 'Bijective ⇔ a unique pre-image', html: model(p(r`\((\implies)\) Assume \(f\) is bijective. Let \(y \in F\) be given. Since \(f\) is surjective, there exists \(x \in E\) such that \(y = f(x)\). If \(x' \in E\) also satisfies \(y = f(x')\), then \(f(x) = f(x')\), so \(x = x'\) by injectivity: the pre-image is unique.`) +
        p(r`\((\impliedby)\) Assume every \(y \in F\) has a unique pre-image. Existence gives surjectivity. Let \(x, x' \in E\) such that \(f(x) = f(x')\); set \(y = f(x)\): \(x\) and \(x'\) are two pre-images of \(y\), so \(x = x'\) by uniqueness. \(f\) is injective, hence bijective.`)) },
      { t: 'The tangent', html: ol([
        r`\(D = \{x \in \R,\ \cos(x) \neq 0\} = \R \setminus \left\{\frac{\pi}{2} + k\pi,\ k \in \Z\right\}\).`,
        r`Let \(x \in D\). Then \(x + \pi \in D\), \(-x \in D\), and \(\tan(x + \pi) = \dfrac{-\sin x}{-\cos x} = \tan x\), \(\tan(-x) = \dfrac{-\sin x}{\cos x} = -\tan x\).`,
        r`\(\tan'(x) = \dfrac{\cos x \cos x - \sin x(-\sin x)}{\cos^2 x} = \dfrac{1}{\cos^2 x} = 1 + \tan^2 x\). At 0: \(\tan'(0) = 1\), the tangent has slope 1 (it is the line \(y = x\)).`,
        r`On \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\), \(\tan\) is continuous, strictly increasing (\(\tan' > 0\)), tends to \(-\infty\) at \(-\frac{\pi}{2}\) and to \(+\infty\) at \(\frac{\pi}{2}\): every horizontal line meets the graph at exactly one point. Each real number has a unique pre-image: a bijection to \(\R\).`]) +
        T.figTan('tan on ]−π/2, π/2[, arctan, and the line y = x') }],
    answer: p(r`\(D = \R \setminus \{\frac{\pi}{2} + k\pi, k \in \Z\}\); \(\pi\)-periodic, odd; \(\tan' = 1 + \tan^2 = \frac{1}{\cos^2}\), slope 1 at 0; bijective from \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) to \(\R\).`),
    traps: [r`Saying “\(\tan\) is increasing so injective”: it must be <b>strictly</b> increasing, and on an interval (on the whole of \(D\), \(\tan\) is not injective).`, r`Forgetting to check that \(x + \pi\) and \(-x\) are in \(D\).`],
    note: NOTE_SEM
  };

  M['sem-3-24b'] = {
    src: 'Seminar · Ex 5.24 (2 and 3; FR 3.24)', title: 'The arctangent function',
    intro: p(r`Continuation of the previous exercise: \(\tan\) is bijective from \(\left]-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right[\) to \(\R\).`),
    questions: [r`Study of its inverse function \(\arctan\).<br>(a) Why is it well-defined? Give its definition domain and its output set.<br>(b) Draw the graph of this function.<br>(c) Show that, for all \(y \in \R\), \(\arctan'(y) = \dfrac{1}{1 + y^2}\).<br>(d) Fill the following table:` +
        tbl([r`\(\alpha\)`, r`\(0\)`, '', r`\(\dfrac{\pi}{3}\)`, '', '', r`\(-\dfrac{\pi}{4}\)`, r`\(\arctan(x)\)`], [[r`\(\tan(\alpha)\)`, '', r`\(1\)`, '', r`\(-\sqrt{3}\)`, r`\(\dfrac{1}{\sqrt{3}}\)`, '', r`\(x\)`]], { th: true }),
      'Find other pairs of bijective functions which are inverse of each others.'],
    hints: [r`\(\arctan\) is the inverse of the restriction of \(\tan\) to \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\).`, r`Differentiate the equality \(\tan(\arctan(y)) = y\) (we accept that \(\arctan\) is differentiable).`, r`\(\tan\frac{\pi}{6} = \frac{1}{\sqrt{3}}\), \(\tan\frac{\pi}{4} = 1\), \(\tan\frac{\pi}{3} = \sqrt{3}\).`],
    solution: [
      { t: '(a) and (b)', html: p(r`\(\tan\) is bijective from \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) to \(\R\): it has an inverse function \(\arctan : \R \longrightarrow \left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\). For \(y \in \R\), \(\arctan(y)\) is the unique \(\alpha \in \left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) such that \(\tan \alpha = y\).`) +
        p(r`Its graph is the mirror image of that of \(\tan\) with respect to \(y = x\): strictly increasing, odd, horizontal asymptotes \(y = -\frac{\pi}{2}\) at \(-\infty\) and \(y = \frac{\pi}{2}\) at \(+\infty\), tangent \(y = x\) at 0.`) + T.figTan('arctan (in red), mirror image of tan with respect to y = x') },
      { t: '(c) The derivative', html: model(p(r`Let \(y \in \R\) be given. We have \(\tan(\arctan(y)) = y\). Differentiating (chain rule): \(\arctan'(y) \times \tan'(\arctan(y)) = 1\).`) +
        p(r`Now \(\tan' = 1 + \tan^2\), so \(\tan'(\arctan(y)) = 1 + \tan^2(\arctan(y)) = 1 + y^2\). Hence \(\arctan'(y) = \dfrac{1}{1 + y^2}\).`)) },
      { t: '(d) and 3', html: tbl([r`\(\alpha\)`, r`\(0\)`, r`\(\dfrac{\pi}{4}\)`, r`\(\dfrac{\pi}{3}\)`, r`\(-\dfrac{\pi}{3}\)`, r`\(\dfrac{\pi}{6}\)`, r`\(-\dfrac{\pi}{4}\)`, r`\(\arctan(x)\)`], [[r`\(\tan(\alpha)\)`, r`\(0\)`, r`\(1\)`, r`\(\sqrt{3}\)`, r`\(-\sqrt{3}\)`, r`\(\dfrac{1}{\sqrt{3}}\)`, r`\(-1\)`, r`\(x\)`]], { th: true }) +
        p(r`Other pairs: \(\exp : \R \to \left]0, +\infty\right[\) and \(\ln\); \(x \mapsto x^2\) from \(\R^+\) to \(\R^+\) and \(\sqrt{\ }\); \(x \mapsto x^3\) and \(x \mapsto \sqrt[3]{x}\) on \(\R\).`) }],
    answer: p(r`\(\arctan : \R \to \left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\), \(\arctan' = \frac{1}{1 + y^2}\); \(\arctan 1 = \frac{\pi}{4}\), \(\arctan \sqrt{3} = \frac{\pi}{3}\), \(\arctan(-\sqrt{3}) = -\frac{\pi}{3}\), \(\arctan\frac{1}{\sqrt{3}} = \frac{\pi}{6}\), \(\arctan(-1) = -\frac{\pi}{4}\).`),
    traps: [r`Giving \(\arctan\) values in \(\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]\): the bounds are never reached.`, r`Answering \(\arctan(1) = \frac{5\pi}{4}\): \(\tan\frac{5\pi}{4} = 1\), but \(\frac{5\pi}{4}\) is not in \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\).`],
    note: NOTE_SEM
  };

  M['sem-3-25'] = {
    src: 'Seminar · Ex 5.25 (★) (FR 3.25)', title: 'Composition of injections, composition of surjections',
    intro: p(r`Consider three sets \(E, F\) and \(G\) and two functions \(f : E \longrightarrow F\) and \(g : F \longrightarrow G\).`),
    questions: [r`Show that if \(f\) and \(g\) are injective, then \(g \circ f\) is injective.`, r`Show that if \(f\) and \(g\) are surjective, then \(g \circ f\) is surjective.`],
    hints: [r`First write what must be proved with quantifiers, then start with “Let … be given”.`, r`For surjectivity, start from a \(z \in G\) and go back: a pre-image by \(g\), then a pre-image of it by \(f\).`],
    solution: [{ t: 'The two proofs', html: model(p(r`1. Assume \(f\) and \(g\) are injective. We want to show that \(\forall (x, x') \in E^2,\ g \circ f(x) = g \circ f(x') \implies x = x'\).`) +
        p(r`Let \((x, x') \in E^2\) such that \(g \circ f(x) = g \circ f(x')\). Then \(g(f(x)) = g(f(x'))\). Since \(g\) is injective, \(f(x) = f(x')\). This implies \(x = x'\) since \(f\) is injective. Hence \(g \circ f\) is injective.`)) +
      model(p(r`2. Assume \(f\) and \(g\) are surjective. Let \(z \in G\) be given. By surjectivity of \(g\), there exists \(y \in F\) such that \(z = g(y)\). Since \(y \in F\) and \(f\) is surjective, there exists \(x \in E\) such that \(y = f(x)\).`) +
        p(r`Thus \(z = g(y) = g(f(x)) = g \circ f(x)\): \(z\) has a pre-image by \(g \circ f\). Hence \(g \circ f\) is surjective.`)) }],
    answer: p('The two model answers above (asked in the November 2022 exam).'),
    traps: [r`Starting from an \(x \in E\) for surjectivity: start from an element of the output set \(G\).`, r`Using injectivity in the wrong order: the injectivity of \(g\) gives \(f(x) = f(x')\).`],
    note: NOTE_SEM
  };

  /* ===================== Seminar, part III: reasoning (English section 6) ===================== */
  M['sem-4-26a'] = {
    src: 'Seminar · Ex 6.26 (1 to 4; FR 4.26)', title: 'Direct reasoning; a homographic function',
    intro: p('<b>• Reasoning directly or by successive implications.</b>'),
    questions: [r`Show that \(\forall (x, y) \in \left]0, 1\right[^2\), \(0 < \dfrac{x + y}{1 + xy} < 1\).<br>Hint: find the sign of \((1 - x)(1 - y)\), then expand this expression.`,
      r`Show that: \(\forall n \in \N\), (\(6\) divides \(n\)) \(\implies\) (\(3\) divides \(n\)). What do you think about the reciprocal?`,
      r`Show that: \(\forall (x, y) \in \R^2\), \(x^2 + y^2 = 0 \iff x = y = 0\).`,
      r`Let \(f : I = \R \setminus \left\{-\dfrac{3}{2}\right\} \longrightarrow \R\) be defined by \(f(x) = \dfrac{x + 1}{2x + 3}\). Using the definitions with quantifiers<br>(a) Say whether \(f\) is injective. In case of positive answer, specify the input and output sets.<br>(b) Say whether \(f\) is surjective. In case of positive answer, specify the input and output sets.<br>(c) Is \(f\)'s inverse function well defined? In case of positive answer, provide an explicit expression of \(f^{-1}\), its input and output sets.`],
    hints: [r`1: \(1 - \dfrac{x + y}{1 + xy} = \dfrac{(1 - x)(1 - y)}{1 + xy}\).`, r`4 (b): for \(y \in \R\), solve \(f(x) = y\): you get \(x(2y - 1) = 1 - 3y\). What happens for \(y = \frac{1}{2}\)?`, r`An inverse function only exists for a bijection: reduce the output set.`],
    solution: [
      { t: 'Questions 1 to 3', html: model(p(r`1. Let \((x, y) \in \left]0, 1\right[^2\) be given. \(x + y > 0\) and \(1 + xy > 0\), so \(\dfrac{x + y}{1 + xy} > 0\).`) +
        p(r`Furthermore \(1 - x > 0\) and \(1 - y > 0\), so \((1 - x)(1 - y) > 0\), that is \(1 - x - y + xy > 0\), i.e. \(1 + xy > x + y\). Dividing by \(1 + xy > 0\): \(\dfrac{x + y}{1 + xy} < 1\).`)) +
        p(r`2. Let \(n \in \N\) such that \(6 \mid n\): \(n = 6k\) with \(k \in \N\), so \(n = 3 \times (2k)\) and \(3 \mid n\). The reciprocal is false: \(3 \mid 3\) but 6 does not divide 3.`) +
        p(r`3. \((\impliedby)\) If \(x = y = 0\), \(x^2 + y^2 = 0\). \((\implies)\) If \(x^2 + y^2 = 0\): \(x^2 = -y^2 \leq 0\) and \(x^2 \geq 0\), so \(x^2 = 0\), \(x = 0\); likewise \(y = 0\).`) },
      { t: 'Question 4: injective, surjective, inverse', html: model(p(r`(a) Let \(x, x' \in I\) such that \(f(x) = f(x')\). Then \((x + 1)(2x' + 3) = (x' + 1)(2x + 3)\), i.e. \(2xx' + 3x + 2x' + 3 = 2xx' + 3x' + 2x + 3\), hence \(x = x'\). \(f\) is injective from \(I\) to \(\R\).`) +
        p(r`(b) Let \(y \in \R\). For \(x \in I\): \(f(x) = y \iff x + 1 = y(2x + 3) \iff x(2y - 1) = 1 - 3y\). If \(y = \frac{1}{2}\), this gives \(0 = -\frac{1}{2}\): \(\frac{1}{2}\) has no pre-image, \(f\) is not surjective to \(\R\).`) +
        p(r`If \(y \neq \frac{1}{2}\), \(x = \dfrac{1 - 3y}{2y - 1}\), and \(x \neq -\frac{3}{2}\) (otherwise \(2 - 6y = 3 - 6y\), i.e. \(2 = 3\)): \(f\) is surjective from \(I\) to \(\R \setminus \left\{\frac{1}{2}\right\}\).`) +
        p(r`(c) Hence \(f\) is bijective from \(\R \setminus \left\{-\frac{3}{2}\right\}\) to \(\R \setminus \left\{\frac{1}{2}\right\}\), with inverse function \(f^{-1} : y \mapsto \dfrac{1 - 3y}{2y - 1}\), from \(\R \setminus \left\{\frac{1}{2}\right\}\) to \(\R \setminus \left\{-\frac{3}{2}\right\}\).`)) }],
    answer: p(r`2: the reciprocal is false (\(n = 3\)). 4: injective from \(I\) to \(\R\); surjective (hence bijective) from \(I\) to \(\R \setminus \{\frac{1}{2}\}\); \(f^{-1}(y) = \frac{1 - 3y}{2y - 1}\).`),
    traps: [r`Only proving the inequality \(< 1\) in 1: there are two, \(0 <\) and \(< 1\).`, r`Dividing by \(2y - 1\) without treating \(y = \frac{1}{2}\) separately.`, r`Forgetting to check that the pre-image found is in \(I\).`],
    note: NOTE_SEM
  };

  M['sem-4-26b'] = {
    src: 'Seminar · Ex 6.26 (5 to 7; FR 4.26)', title: 'Inclusion, double inclusion',
    intro: p('<b>• Reasoning by inclusion or double inclusion</b>'),
    questions: [r`Let \(A\) be the set of the real constant functions and \(B\) the set of the real even functions. Show that \(A \subset B\). What about the property \(A = B\)?`,
      r`Let \(E = \left\{x \in \R,\ x^2 + x + 2 \leq 2\right\}\) and \(F = \left]-2, 0\right]\). Is \(E \subset F\)? Is \(F \subset E\)?`,
      r`Let \(A = \left\{(x, y) \in \R^2,\ 2x + y = 4\right\}\) and \(B = \{(t - 1, 6 - 2t),\ t \in \R\}\). Show that \(A = B\).`],
    hints: [r`For \(A \subset B\), the first line is “Let \(f \in A\) be given”. To disprove an inclusion, one counterexample is enough.`, r`\(x^2 + x \leq 0 \iff x(x + 1) \leq 0\).`, r`For \(A \subset B\) in 7: from \((x, y) \in A\), find the \(t\) that works (\(t = x + 1\)).`],
    solution: [{ t: 'Solution', html: model(p(r`5. Let \(f \in A\) be given: there exists \(c \in \R\) such that \(\forall x \in \R,\ f(x) = c\). Let \(x \in \R\): \(f(-x) = c = f(x)\). So \(f\) is even and \(A \subset B\).`) + p(r`\(A \neq B\): \(x \mapsto x^2\) is even but not constant.`)) +
        p(r`6. \(x^2 + x + 2 \leq 2 \iff x(x + 1) \leq 0 \iff x \in [-1, 0]\). So \(E = [-1, 0] \subset \left]-2, 0\right] = F\). But \(F \not\subset E\): \(-\frac{3}{2} \in F\) and \(-\frac{3}{2} \notin E\).`) +
        model(p(r`7. \((A \subset B)\) Let \((x, y) \in A\) be given: \(y = 4 - 2x\). Set \(t = x + 1\). Then \((t - 1, 6 - 2t) = (x, 6 - 2x - 2) = (x, 4 - 2x) = (x, y)\), so \((x, y) \in B\).`) +
          p(r`\((B \subset A)\) Let \(t \in \R\) be given: \(2(t - 1) + (6 - 2t) = 4\), so \((t - 1, 6 - 2t) \in A\).`) + p(r`By double inclusion, \(A = B\).`)) }],
    answer: p(r`\(A \subsetneq B\); \(E = [-1, 0] \subset F\) but \(F \not\subset E\); \(A = B\) by double inclusion.`),
    traps: [r`Proving only one inclusion for an equality.`, r`Checking the inclusion on an example instead of starting with “Let … be given”.`],
    note: NOTE_SEM
  };

  M['sem-4-27'] = {
    src: 'Seminar · Ex 6.27 (FR 4.27)', title: 'The relation “a − b is a multiple of 3”',
    intro: p(r`On \(\Z\), we define the following "relation" between two integers:`) + fm(r`\forall (a, b) \in \Z^2,\ a \mathcal{R} b \iff a - b \text{ is a multiple of } 3`) +
      p(r`For example, \(3 \mathcal{R} 15\) because \(3 - 15 = -12 = 3 \times (-4)\) and \(-4 \in \Z\). We say that "\(3\) is in relation with \(15\)". On the other hand, \(4\) is not in relation with \(6\) because \(4 - 6 = -2\) and \(-2\) is not a multiple of \(3\).`),
    questions: [r`Let \((a, b) \in \Z^2\). Translate the following property using quantifiers: "\(a - b\) is a multiple of \(3\)".`, r`True or false: "\(\forall a \in \Z, a \mathcal{R} a\)"? Justify.`,
      r`True or false: "\(\forall (a, b) \in \Z^2, a \mathcal{R} b \implies a \mathcal{R} b\)"? Justify.`, r`True or false: "\(\forall (a, b) \in \Z^2, a \mathcal{R} b \text{ and } b \mathcal{R} a \implies a = b\)"? Justify.`,
      r`True or false: "\(\forall (a, b, c) \in \Z^3, a \mathcal{R} b \text{ and } b \mathcal{R} c \implies a \mathcal{R} c\)"? Justify.`],
    hints: [r`“Multiple of 3”: \(\exists k \in \Z,\ a - b = 3k\).`, r`Questions 2 to 5 test, in this order, reflexivity, symmetry, antisymmetry and transitivity.`, r`For 4, the example of the statement (3 and 15) helps.`],
    solution: [{ t: 'Solution', html: ol([
        r`\(\exists k \in \Z,\ a - b = 3k\).`,
        r`<b>True</b> (reflexive): let \(a \in \Z\), \(a - a = 0 = 3 \times 0\) with \(0 \in \Z\).`,
        r`As written, it is true (\(P \implies P\) is always true). The intended question is <b>symmetry</b>, “\(a \mathcal{R} b \implies b \mathcal{R} a\)”: true. If \(a - b = 3k\), then \(b - a = 3(-k)\) with \(-k \in \Z\).`,
        r`<b>False</b> (not antisymmetric): \(3 \mathcal{R} 15\) and \(15 \mathcal{R} 3\) (\(15 - 3 = 12 = 3 \times 4\)), but \(3 \neq 15\).`,
        r`<b>True</b> (transitive): see the model answer.`]) +
      model(p(r`5. Let \((a, b, c) \in \Z^3\) such that \(a \mathcal{R} b\) and \(b \mathcal{R} c\). There exist \((k, k') \in \Z^2\) such that \(a - b = 3k\) and \(b - c = 3k'\).`) + p(r`Then \(a - c = (a - b) + (b - c) = 3(k + k')\) with \(k + k' \in \Z\): \(a \mathcal{R} c\). \(\mathcal{R}\) is transitive.`) +
        p(r`Reflexive, symmetric and transitive: \(\mathcal{R}\) is an equivalence relation.`)) +
      note(r`The statement (English and French versions) writes “\(a \mathcal{R} b \implies a \mathcal{R} b\)” in question 3: a typo for “\(a \mathcal{R} b \implies b \mathcal{R} a\)”.`) }],
    answer: p(r`\(\exists k \in \Z, a - b = 3k\); reflexive; symmetric; not antisymmetric (3 and 15); transitive: an equivalence relation.`),
    traps: [r`Believing “antisymmetric” means “not symmetric”: this relation is symmetric <b>and</b> not antisymmetric.`, r`Disproving a property without a numerical counterexample.`, r`Using the same \(k\) for \(a - b\) and \(b - c\).`],
    note: NOTE_SEM
  };

  M['sem-4-28'] = {
    src: 'Seminar · Ex 6.28 (FR 4.28)', title: 'By contrapositive: n² even ⇒ n even',
    intro: p(r`Let \(n \in \N\). Using a proof by contrapositive, show that if \(n^2\) is even, then \(n\) is even.`),
    hints: [r`The contrapositive of “\(n^2\) even \(\implies n\) even” is “\(n\) odd \(\implies n^2\) odd”.`, r`\(n\) odd means \(n = 2k + 1\).`],
    solution: [{ t: 'Model answer', html: model(p(r`Let us prove the contrapositive: if \(n\) is odd, then \(n^2\) is odd.`) + p(r`Assume \(n\) is odd: there exists \(k \in \N\) such that \(n = 2k + 1\). Then \(n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1\), with \(2k^2 + 2k \in \N\): \(n^2\) is odd.`) +
      p(r`Since the contrapositive is true, so is the implication: if \(n^2\) is even, then \(n\) is even.`)) }],
    answer: p(r`\(n = 2k + 1 \implies n^2 = 2(2k^2 + 2k) + 1\) odd; by contrapositive, \(n^2\) even \(\implies\) \(n\) even.`),
    traps: [r`Proving the converse (“\(n\) even \(\implies n^2\) even”) instead of the contrapositive.`, r`Not writing the contrapositive before proving it.`],
    note: NOTE_SEM
  };

  M['sem-4-29'] = {
    src: 'Seminar · Ex 6.29 (FR 4.29)', title: 'By contrapositive: (∀ε > 0, a < b + ε) ⇒ a ≤ b',
    questions: [r`Using a proof by contrapositive, show that:` + fm(r`(\forall \varepsilon > 0,\ a < b + \varepsilon) \implies a \leq b`), 'Show the equivalence.'],
    hints: [r`Contrapositive: \(a > b \implies \exists \varepsilon > 0,\ a \geq b + \varepsilon\).`, r`Which \(\varepsilon\) when \(a > b\)? Try the gap \(a - b\).`],
    solution: [{ t: 'Model answer', html: model(p(r`1. The contrapositive is: \(a > b \implies \exists \varepsilon > 0,\ a \geq b + \varepsilon\).`) + p(r`Assume \(a > b\). Set \(\varepsilon = a - b\): \(\varepsilon > 0\) and \(b + \varepsilon = a\), so \(a \geq b + \varepsilon\). The contrapositive is true, hence so is the implication.`)) +
      model(p(r`2. Converse: assume \(a \leq b\). Let \(\varepsilon > 0\) be given. Then \(a \leq b < b + \varepsilon\), so \(a < b + \varepsilon\). Hence the equivalence.`)) }],
    answer: p(r`Contrapositive with \(\varepsilon = a - b\); the converse is immediate (\(a \leq b < b + \varepsilon\)).`),
    traps: [r`Negating \(\forall \varepsilon > 0, a < b + \varepsilon\) as \(\forall \varepsilon > 0, a \geq b + \varepsilon\): it is \(\exists \varepsilon > 0\).`, r`Taking a vague \(\varepsilon\) (“\(\varepsilon\) small”): it must be given explicitly.`],
    note: NOTE_SEM
  };

  M['sem-4-30'] = {
    src: 'Seminar · Ex 6.30 (FR 4.30)', title: 'By contradiction: 1/3 is not decimal',
    intro: p(r`Show by contradiction that \(\dfrac{1}{3}\) is not a decimal number.`),
    hints: [r`A decimal number is \(\dfrac{a}{10^n}\) with \(a \in \Z\) and \(n \in \N\).`, r`\(10^n - 1 = 99\dots9\) is a multiple of 3: what is the remainder of \(10^n\) divided by 3?`],
    solution: [{ t: 'Model answer', html: model(p(r`Assume, by contradiction, that \(\frac{1}{3}\) is decimal: there exist \(a \in \Z\) and \(n \in \N\) such that \(\dfrac{1}{3} = \dfrac{a}{10^n}\), hence \(10^n = 3a\): 3 divides \(10^n\).`) +
      p(r`But \(10^n - 1 = 99\dots9\) (\(n\) digits 9) \(= 3 \times 33\dots3\), so \(10^n = 3 \times 33\dots3 + 1\): the remainder of \(10^n\) divided by 3 is 1 (for \(n = 0\), \(10^0 = 1\)). 3 does not divide \(10^n\): contradiction.`) + p(r`Hence \(\frac{1}{3}\) is not a decimal number.`)) +
      p(r`Another argument: \(10^n = 2^n 5^n\) has only 2 and 5 as prime factors.`) }],
    answer: p(r`\(\frac{1}{3} = \frac{a}{10^n} \implies 10^n = 3a\), impossible since \(10^n\) leaves remainder 1 when divided by 3.`),
    traps: [r`Forgetting to state the assumption “by contradiction” at the start, and the contradiction at the end.`],
    note: NOTE_SEM
  };

  M['sem-4-31'] = {
    src: 'Seminar · Ex 6.31 (★) (FR 4.31)', title: '√2 is not rational',
    intro: p(r`Using the property from exercise 6-28, show that \(\sqrt{2}\) is not a rational number.`) +
      p(r`Hint: you can use the fact that any positive rational number can be expressed as a ratio \(\dfrac{p}{q}\), where \(p\) and \(q\) are positive natural numbers, and where these numbers are coprime (that is to say, they have no co-divisor other than \(\pm 1\)).`),
    hints: [r`By contradiction: \(\sqrt{2} = \frac{p}{q}\) in lowest terms, square it.`, r`\(p^2 = 2q^2\): \(p^2\) is even, so \(p\) is too (exercise 6.28).`],
    solution: [{ t: 'Model answer', html: model(p(r`Assume, by contradiction, that \(\sqrt{2} \in \Q\). Since \(\sqrt{2} > 0\), write \(\sqrt{2} = \dfrac{p}{q}\) with \(p \in \N\), \(q \in \N^*\), \(p\) and \(q\) coprime.`) +
      p(r`Then \(p^2 = 2q^2\): \(p^2\) is even, so \(p\) is even (exercise 6.28). Write \(p = 2k\), \(k \in \N\): \(4k^2 = 2q^2\), hence \(q^2 = 2k^2\). So \(q^2\) is even, and so is \(q\).`) +
      p(r`\(p\) and \(q\) are both divisible by 2: this contradicts “coprime”. Hence \(\sqrt{2} \notin \Q\).`)) }],
    answer: p(r`By contradiction: \(p^2 = 2q^2\), then \(p = 2k\), \(q^2 = 2k^2\): \(p\) and \(q\) even, contradiction.`),
    traps: [r`Writing \((2k)^2 = 4k\) instead of \(4k^2\): the rest (\(q^2 = 2k^2\)) only works with the right square.`, r`Concluding “\(p\) even” directly from “\(p^2\) even” without quoting exercise 6.28.`],
    note: NOTE_SEM
  };

  M['sem-4-32a'] = {
    src: 'Seminar · Ex 6.32 (1 and 2; FR 4.32)', title: 'Induction: 2ⁿ ≥ 6n + 7, sum of integers',
    questions: [r`Prove by induction that: \(\forall n \in \left[\!\left[ 6, +\infty \right[\!\right[,\ 2^n \geq 6n + 7\)`, r`Prove by induction that: \(\forall n \in \N^*,\ \displaystyle\sum_{k=1}^{n} k = \dfrac{n(n + 1)}{2}\)`],
    hints: [r`Write \(\mathcal{P}(n)\), then the base case at the <b>first</b> rank (6 here), the induction step, the conclusion.`, r`Induction step for 1: \(2^{n+1} = 2 \times 2^n \geq 12n + 14\). Compare with \(6(n + 1) + 7 = 6n + 13\).`, r`Induction step for 2: \(\sum_{k=1}^{n+1} k = \sum_{k=1}^{n} k + (n + 1)\).`],
    solution: [
      { t: 'Question 1', html: model(p(r`For \(n \geq 6\), let \(\mathcal{P}(n)\) be: “\(2^n \geq 6n + 7\)”.`) + p(r`<b>Base case.</b> \(2^6 = 64\) and \(6 \times 6 + 7 = 43\): \(\mathcal{P}(6)\) is true.`) +
        p(r`<b>Induction step.</b> Assume \(\mathcal{P}(n)\) is true for some \(n \geq 6\). Then \(2^{n+1} = 2 \times 2^n \geq 2(6n + 7) = 12n + 14 = 6(n + 1) + 7 + (6n + 1) \geq 6(n + 1) + 7\), since \(6n + 1 \geq 0\). So \(\mathcal{P}(n + 1)\) is true.`) +
        p(r`<b>Conclusion.</b> \(\mathcal{P}(6)\) is true and \(\mathcal{P}(n) \implies \mathcal{P}(n + 1)\) for all \(n \geq 6\): by induction, \(\forall n \geq 6,\ 2^n \geq 6n + 7\).`)) +
        p(r`The starting rank matters: for \(n = 5\), \(2^5 = 32 < 37\).`) },
      { t: 'Question 2', html: model(p(r`For \(n \in \N^*\), \(\mathcal{P}(n)\): “\(\sum_{k=1}^{n} k = \frac{n(n + 1)}{2}\)”. <b>Base case</b>: \(\sum_{k=1}^{1} k = 1 = \frac{1 \times 2}{2}\).`) +
        p(r`<b>Induction step</b>: if \(\mathcal{P}(n)\) is true, \(\sum_{k=1}^{n+1} k = \frac{n(n + 1)}{2} + (n + 1) = \frac{(n + 1)(n + 2)}{2}\): \(\mathcal{P}(n + 1)\) is true. <b>Conclusion</b>: by induction, \(\mathcal{P}(n)\) is true for all \(n \in \N^*\).`)) }],
    answer: p(r`The two proofs by induction above (base case at \(n = 6\) for the first one).`),
    traps: [r`Starting at \(n = 0\): \(1 \geq 7\) is false. Start at the rank given in the statement.`, r`Writing “so \(\mathcal{P}(n)\) is true” at the end of the induction step: you prove \(\mathcal{P}(n + 1)\).`, r`Assuming \(\mathcal{P}(n)\) “for all \(n\)” in the induction step: that is what you want to prove. Assume it for <b>some</b> \(n\).`],
    note: NOTE_SEM
  };

  M['sem-4-32b'] = {
    src: 'Seminar · Ex 6.32 (3 and 4; FR 4.32)', title: 'Induction: n-th derivative, recursive sequence',
    questions: [r`Consider the function \(f : x \longmapsto xe^x\) and accept without proof that it is infinitely differentiable on \(\R\). Let \(f^{(n)}\) (\(n \in \N\)) denote its \(n\)-th derivative. For example, \(f^{(0)} = f\), \(f^{(1)} = f'\), \(f^{(2)} = f''\), \(f^{(3)} = f'''\), etc.<br>Prove that \(\forall n \in \N\) and \(\forall x \in \R\), \(f^{(n)}(x) = (x + n)e^x\).`,
      r`Consider a numerical sequence \((u_n)\) such that: \(u_0 = 1\) and \(\forall n \in \N, u_{n+1} = u_n + 2n + 3\).<br>Show that: \(\forall n \in \N, u_n = (n + 1)^2\).`],
    hints: [r`\(f^{(0)} = f\) and \(f^{(n+1)} = \left(f^{(n)}\right)'\).`, r`Derivative of a product: \(\left((x + n)e^x\right)' = e^x + (x + n)e^x\).`, r`\((n + 1)^2 + 2n + 3 = n^2 + 4n + 4\).`],
    solution: [
      { t: 'Question 3', html: model(p(r`For \(n \in \N\), \(\mathcal{P}(n)\): “\(\forall x \in \R,\ f^{(n)}(x) = (x + n)e^x\)”.`) + p(r`<b>Base case.</b> \(f^{(0)}(x) = f(x) = xe^x = (x + 0)e^x\).`) +
        p(r`<b>Induction step.</b> Assume \(\mathcal{P}(n)\) is true for some \(n \in \N\). For \(x \in \R\), \(f^{(n+1)}(x) = \left(f^{(n)}\right)'(x) = e^x + (x + n)e^x = (x + n + 1)e^x\): \(\mathcal{P}(n + 1)\) is true.`) + p(r`<b>Conclusion.</b> By induction, \(\mathcal{P}(n)\) is true for all \(n \in \N\).`)) },
      { t: 'Question 4', html: model(p(r`\(\mathcal{P}(n)\): “\(u_n = (n + 1)^2\)”. <b>Base case</b>: \(u_0 = 1 = (0 + 1)^2\).`) +
        p(r`<b>Induction step</b>: assume \(u_n = (n + 1)^2\) for some \(n \in \N\). Then \(u_{n+1} = (n + 1)^2 + 2n + 3 = n^2 + 4n + 4 = (n + 2)^2\). <b>Conclusion</b>: \(\forall n \in \N,\ u_n = (n + 1)^2\).`)) }],
    answer: p(r`Two proofs by induction: \(f^{(n+1)}(x) = (x + n + 1)e^x\); \(u_{n+1} = (n + 2)^2\).`),
    traps: [r`Ending the induction step with “so \(\mathcal{P}(n)\) is true” instead of \(\mathcal{P}(n + 1)\).`, r`Forgetting \(\forall x\) in \(\mathcal{P}(n)\) in 3.`],
    note: NOTE_SEM
  };

  M['sem-4-33'] = {
    src: 'Seminar · Ex 6.33 (Homework; FR 4.33)', title: 'Homework: rationals between rationals, inductions',
    intro: p('<b>(Homework)</b>'),
    questions: [r`Show that: \(\forall (x, y) \in \Q^2 \quad [x < y \implies \exists q \in \Q,\ x < q < y]\)`,
      r`Consider a real function \(f\) defined on \(\R\) such that: \(\forall x \in [0, 2], f(x) \in [1, 2]\).<br>Let \((u_n)\) be the sequence defined by: \(\begin{cases} u_0 = 0.5 \\ \forall n \in \N,\ u_{n+1} = f(u_n) \end{cases}\).<br>Show by induction that: \(\forall n \in \N,\ u_n \in [0, 2]\)`,
      r`Let \(a\) be a positive real number. Prove by induction that: \(\forall n \in \N^*, a^n + na^{n-1} \leq (a + 1)^n\).`,
      r`Prove by induction that: \(\forall n \in \N^*,\ \dfrac{1}{1 \times 2} + \dfrac{1}{2 \times 3} + \dfrac{1}{3 \times 4} + \dots + \dfrac{1}{n \times (n + 1)} = 1 - \dfrac{1}{n + 1}\)`],
    hints: [r`1: the midpoint \(\frac{x + y}{2}\).`, r`3: multiply the induction hypothesis by \(a + 1 > 0\), then drop a non-negative term.`, r`4: \(\frac{1}{(n + 1)(n + 2)} = \frac{1}{n + 1} - \frac{1}{n + 2}\).`],
    solution: [
      { t: 'Questions 1 and 2', html: model(p(r`1. Let \((x, y) \in \Q^2\) with \(x < y\). Set \(q = \frac{x + y}{2}\): \(q \in \Q\) and \(x = \frac{x + x}{2} < q < \frac{y + y}{2} = y\).`)) +
        model(p(r`2. \(\mathcal{P}(n)\): “\(u_n \in [0, 2]\)”. <b>Base case</b>: \(u_0 = 0.5 \in [0, 2]\). <b>Induction step</b>: if \(u_n \in [0, 2]\) for some \(n \in \N\), then \(u_{n+1} = f(u_n) \in [1, 2] \subset [0, 2]\). <b>Conclusion</b>: by induction, \(\forall n \in \N,\ u_n \in [0, 2]\).`)) },
      { t: 'Question 3', html: model(p(r`\(\mathcal{P}(n)\): “\(a^n + na^{n-1} \leq (a + 1)^n\)”. <b>Base case</b> (\(n = 1\)): \(a + 1 \leq a + 1\).`) +
        p(r`<b>Induction step</b>: assume \(\mathcal{P}(n)\) for some \(n \geq 1\). Since \(a + 1 > 0\): \((a + 1)^{n+1} = (a + 1)(a + 1)^n \geq (a + 1)(a^n + na^{n-1}) = a^{n+1} + (n + 1)a^n + na^{n-1} \geq a^{n+1} + (n + 1)a^n\), since \(na^{n-1} \geq 0\). This is \(\mathcal{P}(n + 1)\).`) + p('<b>Conclusion</b> by induction.')) },
      { t: 'Question 4', html: model(p(r`\(\mathcal{P}(n)\): “\(S_n = \sum_{k=1}^{n} \frac{1}{k(k + 1)} = 1 - \frac{1}{n + 1}\)”. <b>Base case</b>: \(S_1 = \frac{1}{2} = 1 - \frac{1}{2}\).`) +
        p(r`<b>Induction step</b>: if \(\mathcal{P}(n)\) is true, \(S_{n+1} = 1 - \frac{1}{n + 1} + \frac{1}{(n + 1)(n + 2)} = 1 - \frac{(n + 2) - 1}{(n + 1)(n + 2)} = 1 - \frac{1}{n + 2}\). <b>Conclusion</b> by induction.`)) +
        p(r`Without induction: \(\frac{1}{k(k + 1)} = \frac{1}{k} - \frac{1}{k + 1}\), and the sum telescopes.`) }],
    answer: p(r`\(q = \frac{x + y}{2}\); three proofs by induction (base cases \(n = 0\), \(n = 1\), \(n = 1\)).`),
    traps: [r`Multiplying an inequality by a number without checking that it is positive (\(a + 1 > 0\) here).`, r`In 2, forgetting that the assumption on \(f\) only holds for \(x \in [0, 2]\): that is why we prove \(u_n \in [0, 2]\).`],
    note: NOTE_SEM
  };

  /* ===================== Tutorial 1: counting ===================== */
  M['td1-1-1'] = {
    src: 'Tutorial 1 · Ex 1.1', title: 'Multiples of 2 and of 3 up to 60',
    intro: p(r`Let \(A\) (respectively \(B\)) be the set of natural numbers which are multiples of 2 (respectively 3), smaller than or equal to 60.`),
    questions: ['Define these sets in mathematical language.', r`What are the cardinal numbers of \(A\) and \(B\)?`, r`What can you say about the cardinal number of \(A \cap B\)?`, r`What is the cardinal number of \(A \times B\)? The cardinal number of \(A \cup B\)?`],
    hints: [r`0 is a natural number, a multiple of 2 and of 3.`, r`A number is a multiple of 2 and of 3 if and only if it is a multiple of 6.`, r`\(\mathrm{Card}(A \times B) = \mathrm{Card}(A) \times \mathrm{Card}(B)\), and the inclusion-exclusion formula for \(A \cup B\).`],
    solution: [{ t: 'Solution', html: ol([
        r`\(A = \{2k,\ k \in \ent{0}{30}\}\) and \(B = \{3k,\ k \in \ent{0}{20}\}\).`,
        r`\(k \mapsto 2k\) is a bijection from \(\ent{0}{30}\) to \(A\): \(\mathrm{Card}(A) = 31\). Likewise \(\mathrm{Card}(B) = 21\).`,
        r`\(A \cap B\) is the set of multiples of 6 between 0 and 60: \(\{6k,\ k \in \ent{0}{10}\}\), so \(\mathrm{Card}(A \cap B) = 11\).`,
        r`\(\mathrm{Card}(A \times B) = 31 \times 21 = 651\); \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A) + \mathrm{Card}(B) - \mathrm{Card}(A \cap B) = 31 + 21 - 11 = 41\).`]) +
      model(p(r`By the inclusion-exclusion formula, \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A) + \mathrm{Card}(B) - \mathrm{Card}(A \cap B) = 31 + 21 - 11 = 41\).`)) }],
    answer: p(r`\(\mathrm{Card}\,A = 31\), \(\mathrm{Card}\,B = 21\), \(\mathrm{Card}(A \cap B) = 11\), \(\mathrm{Card}(A \times B) = 651\), \(\mathrm{Card}(A \cup B) = 41\).`),
    traps: [r`Forgetting 0: you then get 30, 20 and 10, and everything is wrong.`, r`Adding \(31 + 21\) without subtracting \(A \cap B\).`],
    note: NOTE_TD1
  };

  M['td1-1-2'] = {
    src: 'Tutorial 1 · Ex 1.2', title: 'How many pairs of marks for a given average?',
    intro: p(r`<b><em>Homework: to be done by everyone</em></b>`) + p(r`Let \(M\) and \(A\) denote the final grades in math and in algorithmics in S1 of EPITA. Both grades are between 0 and 20 and we suppose that they have integer values. Assuming that both modules have the same coefficient, a student tries to determine the number of combinations of \(A\) and \(M\) which may result in a global average equal to \(k \in \{1, \dots, 20\}\). How can you help this student?`) +
      p('You may, for example, represent the situation with a 2-entries table.'),
    hints: [r`Average \(k\): \(\dfrac{A + M}{2} = k\), that is \(A + M = 2k\).`, r`In the \(21 \times 21\) table, the cells \(A + M = 2k\) form a diagonal. Count its cells.`, r`You need \(A = 2k - M\) with \(0 \leq M \leq 20\) and \(0 \leq 2k - M \leq 20\).`],
    solution: [{ t: 'Solution', html: p(r`We count the pairs \((A, M) \in \ent{0}{20}^2\) such that \(A + M = 2k\); call this number \(N_k\). The pair is determined by \(M\), with \(A = 2k - M\); we need \(0 \leq M \leq 20\) and \(0 \leq 2k - M \leq 20\), that is \(\max(0, 2k - 20) \leq M \leq \min(20, 2k)\).`) +
      ul([r`If \(k \leq 10\): \(0 \leq M \leq 2k\), so \(N_k = 2k + 1\).`, r`If \(k \geq 10\): \(2k - 20 \leq M \leq 20\), so \(N_k = 20 - (2k - 20) + 1 = 41 - 2k\).`]) +
      tbl([r`\(k\)`, '1', '2', '…', '9', '10', '11', '…', '19', '20'], [[r`\(N_k\)`, '3', '5', '…', '19', '21', '19', '…', '3', '1']], { th: true }) +
      p(r`(For \(k = 0\), which the English sheet leaves out, there is 1 pair: \((0, 0)\).)`) +
      model(p(r`For \(k \leq 10\), the pairs are \((2k - M, M)\) for \(M \in \ent{0}{2k}\): there are \(2k + 1\) of them.`) + p(r`For \(k \geq 10\), \(M \in \ent{2k - 20}{20}\): there are \(41 - 2k\) of them.`)) }],
    answer: p(r`\(N_k = 2k + 1\) if \(k \leq 10\), \(N_k = 41 - 2k\) if \(k \geq 10\).`),
    traps: [r`Forgetting the constraint \(A \leq 20\): the formula \(2k + 1\) is wrong beyond \(k = 10\) (\(k = 20\): a single pair, \((20, 20)\)).`],
    note: NOTE_TD1 + ' The French sheet takes k ∈ {0, …, 20}.'
  };

  M['td1-1-3'] = {
    src: 'Tutorial 1 · Ex 1.3', title: 'Cardinal number of a union of two sets',
    questions: [r`Consider two finite disjoint sets \(E\) and \(F\). What do you know about \(\mathrm{Card}(E \cup F)\) in this situation?`,
      r`We focus on the cardinal number of the union of two sets \(A\) and \(B\), who may be non-disjoint.<br>(a) Show graphically the union of the sets \(A\) and \(B\). Then provide a partition of this union.<br>(b) Deduce an expression of \(\mathrm{Card}(A \cup B)\) involving the cardinal numbers of \(A\), \(B\) and others.`],
    hints: [r`Three regions: \(A \setminus B\), \(A \cap B\), \(B \setminus A\).`, r`\(\mathrm{Card}(A) = \mathrm{Card}(A \setminus B) + \mathrm{Card}(A \cap B)\).`],
    solution: [{ t: 'Solution', html: p(r`1. \(\mathrm{Card}(E \sqcup F) = \mathrm{Card}(E) + \mathrm{Card}(F)\).`) +
      p(r`2. (a) \(A \cup B = (A \setminus B) \sqcup (A \cap B) \sqcup (B \setminus A)\): three mutually disjoint parts.`) +
      tool('venn', { n: 2, names: ['A', 'B'], u: 'E', expr: 'A | B', title: 'A ∪ B: three regions' }) +
      model(p(r`(b) By additivity, \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A \setminus B) + \mathrm{Card}(A \cap B) + \mathrm{Card}(B \setminus A)\).`) +
        p(r`But \(\mathrm{Card}(A) = \mathrm{Card}(A \setminus B) + \mathrm{Card}(A \cap B)\) and \(\mathrm{Card}(B) = \mathrm{Card}(B \setminus A) + \mathrm{Card}(A \cap B)\).`) +
        p(r`Adding them: \(\mathrm{Card}(A) + \mathrm{Card}(B) = \mathrm{Card}(A \cup B) + \mathrm{Card}(A \cap B)\), hence \(\mathrm{Card}(A \cup B) = \mathrm{Card}(A) + \mathrm{Card}(B) - \mathrm{Card}(A \cap B)\).`)) }],
    answer: p(r`\(\mathrm{Card}(E \sqcup F) = \mathrm{Card}\,E + \mathrm{Card}\,F\); \(\mathrm{Card}(A \cup B) = \mathrm{Card}\,A + \mathrm{Card}\,B - \mathrm{Card}(A \cap B)\).`),
    traps: [r`Forgetting that \(A \cap B\) is counted twice in \(\mathrm{Card}\,A + \mathrm{Card}\,B\).`],
    note: NOTE_TD1
  };

  M['td1-1-4'] = {
    src: 'Tutorial 1 · Ex 1.4', title: 'Inclusion-exclusion for three sets',
    intro: p(r`We wish to get a relation similar to the one from exercise 1-3, but for the union of three sets.`) +
      p(r`Let \(A\), \(B\) and \(C\) be three sets. We want to find the cardinal number of \(A \cup B \cup C\) in term of the cardinal numbers of the possible intersections of these sets.`),
    questions: [r`Represent graphically \(A \cup B \cup C\). Propose a partition of this set which enables one to guess a formula for \(\mathrm{Card}(A \cup B \cup C)\).`,
      r`Prove this formula rigorously, by using recursively the formula you got in exercise 1-3.<br>Hints: start the recursive reasoning in writing: \(A \cup B \cup C = (A \cup B) \cup C\). Then remove all the unions using operations on sets and the formula from exercise 1-3.`],
    hints: [r`On the drawing, 7 regions. A region in two sets is counted twice by \(\mathrm{Card}\,A + \mathrm{Card}\,B + \mathrm{Card}\,C\), a region in the three sets three times.`, r`\((A \cup B) \cap C = (A \cap C) \cup (B \cap C)\) (distributivity).`, r`\((A \cap C) \cap (B \cap C) = A \cap B \cap C\).`],
    solution: [
      { t: 'Question 1: the formula', html: tool('venn', { n: 3, names: ['A', 'B', 'C'], u: 'E', expr: 'A | B | C', title: 'A ∪ B ∪ C: seven regions' }) +
        fm(r`\mathrm{Card}(A \cup B \cup C) = \mathrm{Card}\,A + \mathrm{Card}\,B + \mathrm{Card}\,C - \mathrm{Card}(A \cap B) - \mathrm{Card}(A \cap C) - \mathrm{Card}(B \cap C) + \mathrm{Card}(A \cap B \cap C)`) +
        p(r`Add the three sets, subtract the pairwise intersections (counted twice), then add back the triple intersection (added three times, subtracted three times).`) },
      { t: 'Question 2: the proof', html: model(p(r`By exercise 1-3 applied to \(A \cup B\) and \(C\): \(\mathrm{Card}(A \cup B \cup C) = \mathrm{Card}(A \cup B) + \mathrm{Card}(C) - \mathrm{Card}((A \cup B) \cap C)\).`) +
        p(r`On the one hand \(\mathrm{Card}(A \cup B) = \mathrm{Card}\,A + \mathrm{Card}\,B - \mathrm{Card}(A \cap B)\).`) +
        p(r`On the other hand \((A \cup B) \cap C = (A \cap C) \cup (B \cap C)\), and \((A \cap C) \cap (B \cap C) = A \cap B \cap C\), so \(\mathrm{Card}((A \cup B) \cap C) = \mathrm{Card}(A \cap C) + \mathrm{Card}(B \cap C) - \mathrm{Card}(A \cap B \cap C)\).`) +
        p(r`Substituting: \(\mathrm{Card}(A \cup B \cup C) = \mathrm{Card}\,A + \mathrm{Card}\,B + \mathrm{Card}\,C - \mathrm{Card}(A \cap B) - \mathrm{Card}(A \cap C) - \mathrm{Card}(B \cap C) + \mathrm{Card}(A \cap B \cap C)\).`)) }],
    answer: fm(r`\mathrm{Card}(A \cup B \cup C) = \mathrm{Card}\,A + \mathrm{Card}\,B + \mathrm{Card}\,C - \mathrm{Card}(A \cap B) - \mathrm{Card}(A \cap C) - \mathrm{Card}(B \cap C) + \mathrm{Card}(A \cap B \cap C)`),
    traps: [r`Forgetting \(+\mathrm{Card}(A \cap B \cap C)\) at the end.`, r`Writing \(\mathrm{Card}((A \cup B) \cap C) = \mathrm{Card}(A \cap C) + \mathrm{Card}(B \cap C)\): these two sets are not disjoint.`],
    note: NOTE_TD1
  };

  M['td1-1-5'] = {
    src: 'Tutorial 1 · Ex 1.5', title: 'Injection, surjection and cardinal numbers',
    intro: p(r`Let \(E\) and \(F\) be two finite sets whose cardinal numbers are \(n\) and \(p\). To simplify the following, we can assume that \(E = \ent{1}{n}\) and \(F = \ent{1}{p}\).`),
    questions: [r`Suppose there exists an injection from \(E\) to \(F\). Which inequality can you deduce between \(n\) and \(p\)?`, r`Suppose there exists a surjection from \(E\) to \(F\). Which inequality can you deduce between \(n\) and \(p\)?`, r`Suppose there exists a bijection from \(E\) to \(F\). Which relation can you deduce between \(n\) and \(p\)?`],
    hints: [r`How many elements does the image \(f(E)\) of an injection have?`, r`For a surjection, choose one pre-image for each element of \(F\): are these pre-images distinct?`],
    solution: [{ t: 'Solution', html: ol([
        r`If \(f\) is injective, the \(n\) images \(f(1), \dots, f(n)\) are mutually distinct: \(f(E)\) has \(n\) elements and \(f(E) \subset F\), so \(n \leq p\).`,
        r`If \(f\) is surjective, each \(y \in F\) has a pre-image \(x_y\). Two elements \(y \neq y'\) have distinct pre-images (one \(x\) has only one image). This gives \(p\) distinct elements of \(E\): \(p \leq n\).`,
        r`A bijection is injective and surjective: \(n \leq p\) and \(n \geq p\), so \(n = p\).`]) +
      p(r`Useful contrapositives: if \(n > p\), no function from \(E\) to \(F\) is injective (pigeonhole principle); if \(n < p\), none is surjective.`) }],
    answer: p(r`Injection: \(n \leq p\). Surjection: \(n \geq p\). Bijection: \(n = p\).`),
    traps: [r`Reversing the inequalities: an injection goes from a “small” set to a “large” one.`],
    note: NOTE_TD1
  };

  M['td1-1-6'] = {
    src: 'Tutorial 1 · Ex 1.6', title: 'Cardinal number of the power set',
    intro: p(r`Let \(E\) be a finite set and let \(n\) be its cardinal number.`) + p(r`Propose a method to find the cardinal number of \(\mathcal{P}(E)\).`),
    hints: [r`To build a subset of \(E\), decide for each element whether it is in or not.`, r`Another method: sort the subsets by their number of elements \(k\).`],
    solution: [{ t: 'Two methods', html: ul([
        r`<b>Successive choices.</b> Write \(E = \{x_1, \dots, x_n\}\). A subset is determined by \(n\) independent choices: \(x_i\) in or out. There are \(2 \times 2 \times \dots \times 2 = 2^n\) subsets (the number of mappings from \(E\) to \(\{0, 1\}\)).`,
        r`<b>Partition by cardinal number.</b> There are \(\binom{n}{k}\) subsets with \(k\) elements, for \(k \in \ent{0}{n}\), and these families are disjoint: \(\mathrm{Card}\,\mathcal{P}(E) = \sum_{k=0}^{n} \binom{n}{k} = (1 + 1)^n = 2^n\) by the binomial formula.`]) +
      p(r`A third idea, by induction: adding one element to \(E\) doubles the number of subsets (those without it, and the same ones with it added).`) }],
    answer: p(r`\(\mathrm{Card}\,\mathcal{P}(E) = 2^n\).`),
    traps: [r`Forgetting the empty set or \(E\) itself (\(k = 0\) and \(k = n\)).`],
    note: NOTE_TD1
  };

  M['td1-2-7'] = {
    src: 'Tutorial 1 · Ex 2.7', title: 'The four reference draws',
    questions: [r`A bag contains \(n\) balls, numbered from 1 to \(n\).<br>– We successively pick \(k\) balls from the bag, with replacement. How many possible ways of picking the balls?<br>– We successively pick \(n\) balls from the bag, without replacement. How many possible ways of picking the balls?<br>– We successively pick \(k\) balls from the bag, without replacement (\(k \leq n\)). How many possible ways of picking the balls?<br>– We simultaneously pick \(k\) balls from the bag (\(k \leq n\)) and put them in another bag. How many possible results?`,
      r`Let \(E\) be a \(n\)-element set and \(k \leq n\). What is a \(k\)-element arrangement of \(E\)? A permutation of \(E\)? A \(k\)-element combination of \(E\)? How many are there?`],
    hints: [r`Two questions: does the order matter (successively or simultaneously)? Can a ball come back (with or without replacement)?`, r`With replacement: \(n\) choices at each pick. Without replacement: \(n\), then \(n - 1\), …`],
    solution: [{ t: 'Solution', html: tbl(['draw', 'model', 'number'], [
        ['successively, with replacement, \\(k\\) balls', '\\(k\\)-list from \\(\\ent{1}{n}\\)', '\\(n^k\\)'],
        ['successively, without replacement, \\(n\\) balls', 'permutation', '\\(n!\\)'],
        ['successively, without replacement, \\(k\\) balls', 'arrangement', '\\(A_n^k = n(n - 1)\\cdots(n - k + 1) = \\dfrac{n!}{(n - k)!}\\)'],
        ['simultaneously, \\(k\\) balls', 'combination (subset)', '\\(\\dbinom{n}{k} = \\dfrac{n!}{k!(n - k)!}\\)']]) +
      ul([r`A <b>\(k\)-element arrangement</b> of \(E\): an ordered list of \(k\) distinct elements of \(E\); there are \(A_n^k\) of them (\(n\) choices for the first, \(n - 1\) for the second…).`,
        r`A <b>\(k\)-element combination</b>: a subset of \(E\) with \(k\) elements (no order); there are \(\binom{n}{k} = \frac{A_n^k}{k!}\) of them (each subset gives \(k!\) arrangements).`,
        r`A <b>permutation</b> of \(E\): an arrangement of all \(n\) elements (a bijection from \(E\) to \(E\)); there are \(n!\) of them.`]) }],
    answer: p(r`\(n^k\); \(n!\); \(A_n^k = \frac{n!}{(n - k)!}\); \(\binom{n}{k} = \frac{n!}{k!(n - k)!}\).`),
    traps: [r`Writing \(k^n\) instead of \(n^k\) for \(k\) picks with replacement among \(n\): \(n\) choices, \(k\) times.`, r`Using \(A_n^k\) for a simultaneous draw: the order does not matter, it is \(\binom{n}{k}\).`],
    note: NOTE_TD1
  };

  M['td1-2-8'] = {
    src: 'Tutorial 1 · Ex 2.8', title: 'Anagrams and calls to the blackboard',
    intro: p('Find the numbers of'),
    questions: [r`anagrams with the word <b><em>computer</em></b>`, r`anagrams with the word <b><em>mathematician</em></b>`, 'ways of calling 5 students from this class one by one to the blackboard. That is, the number of ways of choosing the 5 students <em>and</em> their order of call.',
      'ways of calling all the students from this class one by one to the blackboard.', 'ways of calling all the students from this class one by one to the blackboard, given that the two students who came late this morning will be called twice.'],
    hints: [r`A word with \(n\) distinct letters has \(n!\) anagrams. If a letter appears \(r\) times, divide by \(r!\) (swapping these letters does not change the word).`, r`Let \(n\) be the number of students in the class.`, r`Question 5: you order \(n + 2\) calls, two pairs of which are identical.`],
    solution: [{ t: 'Solution', html: ol([
        r`“computer” has 8 distinct letters: \(8! = 40{,}320\) anagrams.`,
        r`“mathematician” has 13 letters: a three times, m, t and i twice each, and h, e, c, n once. \(\dfrac{13!}{3!\,2!\,2!\,2!} = 129{,}729{,}600\).`,
        r`With \(n\) students (\(n \geq 5\)): an ordered list of 5 distinct students, \(A_n^5 = \dfrac{n!}{(n - 5)!} = n(n - 1)(n - 2)(n - 3)(n - 4)\).`,
        r`All the students in some order: \(n!\).`,
        r`\(n + 2\) calls, two students appearing twice: \(\dfrac{(n + 2)!}{2!\,2!} = \dfrac{(n + 2)!}{4}\).`]) +
      model(p(r`We order the 13 letters of “mathematician”: \(13!\) ways if all letters were different. Swapping the three a, the two m, the two t or the two i does not change the word: each anagram is counted \(3! \times 2! \times 2! \times 2!\) times.`) + p(r`There are therefore \(\dfrac{13!}{3!\,2!\,2!\,2!}\) anagrams.`)) }],
    answer: p(r`\(8!\); \(\frac{13!}{3!2!2!2!}\); \(A_n^5\); \(n!\); \(\frac{(n + 2)!}{2!2!}\) (\(n\) students).`),
    traps: [r`Forgetting a repeated letter, or miscounting the letters.`, r`Using \(\binom{n}{5}\) in question 3: the order of call matters.`],
    note: NOTE_TD1 + ' The French sheet uses the words “voiture” and “saperlipopette”.'
  };

  M['td1-2-9'] = {
    src: 'Tutorial 1 · Ex 2.9', title: 'Picking a football team',
    intro: p('A football club has a 24-player squad and the coach has to select the 11 players who will start the next match. Find the number of possible choices for the coach in the following situations:'),
    questions: ['Everyone in the squad can play at any position (goalkeeper, defender, midfielder, etc.). The coach just decides who plays, disregarding the positions of the players.', 'Everyone in the squad can play at any position. But the coach decides who plays and at which position.',
      'Answer the previous questions if, from the squad, 3 players can only be goalkeepers while the 21 others can be at any position except goalkeeper.'],
    hints: [r`Without positions: a set of 11 players. With positions: fill each position, in a fixed order.`, r`Question 3: exactly one goalkeeper among 3, and 10 outfield players among 21.`],
    solution: [{ t: 'Solution', html: ol([
        r`A subset of 11 players among 24: \(\binom{24}{11} = 2{,}496{,}144\).`,
        r`Fill the 11 positions in order: \(24 \times 23 \times \dots \times 14 = A_{24}^{11} = \dfrac{24!}{13!} = 99{,}638{,}080{,}819{,}200\).`,
        r`There is one goalkeeper position, so exactly one of the 3 goalkeepers plays. Without positions: \(3 \times \binom{21}{10} = 3 \times 352{,}716 = 1{,}058{,}148\). With positions: 3 choices for the goal, then the 10 other positions from 21 players, in order: \(3 \times A_{21}^{10} = 3{,}839{,}807{,}462{,}400\).`]) +
      model(p(r`The goalkeeper is one of the 3 goalkeepers: 3 choices. The 10 other players form a subset of 10 players among the 21 outfield players: \(\binom{21}{10}\) choices. There are \(3 \times \binom{21}{10}\) selections.`)) }],
    answer: p(r`\(\binom{24}{11}\); \(A_{24}^{11}\); \(3\binom{21}{10}\) and \(3A_{21}^{10}\).`),
    traps: [r`Forgetting the “with positions” case in question 3.`, r`Choosing 11 players among 21 in question 3: the goalkeeper is not one of the 21.`],
    note: NOTE_TD1
  };

  M['td1-2-10'] = {
    src: 'Tutorial 1 · Ex 2.10', title: 'The board of an association, with gender parity',
    intro: p('An association has 100 members. They have to select a 10-councilor board. Each councilor must be a member and the board will have:') + ul(['A president', 'A treasurer', '8 other councilors']) + p('No councilor can be at two positions simultaneously in the board.'),
    questions: ['How many possible boards are possible?', 'Answer the same question if, furthermore, the gender-parity is required. Assume the the members are 50 women, 50 men. If the president is a women, the treasurer must be a man and reversely. The other councilors must be 4 women, 4 men.'],
    hints: [r`President and treasurer: two distinct positions, order matters. The 8 others: a group without order.`, r`Question 2: choose the president first (100 choices), then the treasurer of the other gender (50 choices). 49 women and 49 men remain.`],
    solution: [{ t: 'Solution', html: model(p(r`1. President: 100 choices; treasurer: 99 choices; then a subset of 8 councilors among the 98 remaining: \(\binom{98}{8}\) choices. There are \(100 \times 99 \times \binom{98}{8}\) boards.`) +
        p(r`2. President: 100 choices; treasurer, of the other gender: 50 choices. 49 women and 49 men remain: \(\binom{49}{4}\) choices for the 4 women and \(\binom{49}{4}\) for the 4 men. There are \(100 \times 50 \times \binom{49}{4}^2\) boards.`)) +
      p(r`Values: \(\binom{98}{8} = 157{,}366{,}449{,}604\) and \(\binom{49}{4} = 211{,}876\). One can also write \(100 \times 50 = 2 \times 50 \times 50\): 2 choices for the gender of the president, then 50 and 50.`) }],
    answer: p(r`\(100 \times 99 \times \binom{98}{8}\); \(2 \times 50 \times 50 \times \binom{49}{4}^2\).`),
    traps: [r`Counting the choice of gender twice: 100 possible presidents already covers both cases. \(2 \times 100 \times 50 \times \dots\) is twice too big.`, r`Writing \(\frac{98!}{98!\,8!}\): it is \(\frac{98!}{8!\,90!}\).`, r`Choosing the 8 councilors in order (\(A_{98}^{8}\)): they all have the same role.`],
    note: NOTE_TD1
  };

  M['td1-2-11'] = {
    src: 'Tutorial 1 · Ex 2.11 (2025 exam)', title: 'The answering words of an MCQ',
    intro: p(r`An MCQ exam has 5 questions. At each of these 5 questions, the students answer with one choice out of 6 possibilities: \(A\), \(B\), \(C\), \(D\), \(E\) or \(F\).`) +
      p(r`A student passing the exam answered all questions. His total answer is hence a kind of "answering word" of 5 letters (\(A\), \(B\), \(C\), \(D\), \(E\) or \(F\)).`) +
      p(r`For example, the "answering word" BBADC means that the student has answered \(B\) at questions 1 and 2, \(A\) at question 3, \(D\) at question 4 and \(C\) at question 5.`) + p('A letter can occur several times in an "answering word".'),
    questions: ['What is the total number of possible "answering words"? Justify briefly.', 'How many of these "answering words" have only distinct letters? Justify briefly.', 'How many "answering-words" have only one correct choice? Justify briefly.',
      'How many "answering-words" have at least one correct choice? Justify briefly.', r`How many "answering words" start with \(E\), have no \(A\) and have only distinct letters? Justify briefly. <b><em>Do the whole computation, until you get a numerical value.</em></b>`,
      r`There has been leaks. All the students knew that the perfect "answering word" contains one \(B\), two \(C\) and two \(D\). How many "answering words" are possible? Justify briefly. <b><em>Do the whole computation, until you get a numerical value.</em></b>`],
    hints: [r`Distinct letters: 6 choices, then 5, 4, 3, 2.`, r`“Only one correct”: choose the right question (5 choices), then a wrong answer at each of the 4 others (5 choices each).`, r`“At least one”: total minus “none correct”.`],
    solution: [{ t: 'Solution', html: ol([
        r`A word is a 5-list from \(\{A, \dots, F\}\): \(6^5 = 7{,}776\).`,
        r`Distinct letters: an arrangement of 5 letters among 6, \(A_6^5 = 6 \times 5 \times 4 \times 3 \times 2 = 720\).`,
        r`Choose the correctly answered question (5 choices); it has one right letter; each of the 4 others has 5 possible wrong letters: \(5 \times 5^4 = 3{,}125\).`,
        r`None correct: 5 wrong letters at each question, \(5^5 = 3{,}125\). At least one: \(6^5 - 5^5 = 7{,}776 - 3{,}125 = 4{,}651\).`,
        r`First letter E; the 4 next ones, distinct, with neither A nor E, from \(\{B, C, D, F\}\): \(4! = 24\).`,
        r`Ordering B, C, C, D, D: \(\dfrac{5!}{1!\,2!\,2!} = \dfrac{120}{4} = 30\).`]) +
      model(p(r`4. Use the complement. A word with no right answer has, at each question, one of the 5 wrong letters: there are \(5^5\) of them.`) + p(r`The number of words with at least one right answer is therefore \(6^5 - 5^5 = 7{,}776 - 3{,}125 = 4{,}651\).`)) }],
    answer: p('7,776; 720; 3,125; 4,651; 24; 30.'),
    traps: [r`Answering \(5! = 120\) to question 2: there are 6 letters for 5 places, it is \(A_6^5 = 720\).`, r`“At least one correct” as \(5 \times 6^4\): words with several right answers are counted several times.`, r`Question 6: \(5!\) without dividing by the repetitions of C and D.`],
    note: NOTE_TD1
  };

  M['td1-2-12'] = {
    src: 'Tutorial 1 · Ex 2.12', title: 'Make up a problem for a formula',
    intro: p(r`Let \(k\) and \(n\) be two non-zero natural numbers. For each of the following formulas, suggest a counting problem whose solution is the given formula:`) +
      ul([r`\(2^n\)`, r`\(\displaystyle\sum_{k=0}^{n} \binom{n}{k}\)`, r`\(k.(n!)\)`]) + note(r`\(\binom{n}{k}\) can also be denoted by \(C_n^k\) (and not \(C_k^n\)). You're expected to know both notations.`),
    hints: [r`\(2^n\): \(n\) successive choices between two possibilities.`, r`\(\sum_k \binom{n}{k}\): add disjoint cases sorted by a number \(k\).`, r`\(k \times n!\): one choice among \(k\), then an order on \(n\) objects.`],
    solution: [{ t: 'Examples (others are fine)', html: ul([
        r`\(2^n\): the number of binary words of length \(n\); the number of results of \(n\) coin tosses; the number of subsets of an \(n\)-element set.`,
        r`\(\sum_{k=0}^{n} \binom{n}{k}\): the number of committees (of any size, possibly empty) in a class of \(n\) students, sorted by their size \(k\). It is again \(2^n\).`,
        r`\(k \times n!\): \(n\) runners cross the line in some order (\(n!\)), and the organizer draws a medal colour among \(k\); or: choose one book among \(k\), then line up \(n\) students.`]) +
      model(p(r`A class has \(n\) students. We form a committee of any size. There are \(\binom{n}{k}\) committees with \(k\) members; sorting them by \(k \in \ent{0}{n}\), we get \(\sum_{k=0}^{n} \binom{n}{k}\) committees.`)) }],
    answer: p('For example: binary words of length \\(n\\); committees of any size; an order on \\(n\\) objects and a choice among \\(k\\).'),
    traps: [r`Suggesting a situation whose answer is \(n^2\) for \(2^n\): you need \(n\) binary choices, not 2 choices among \(n\).`],
    note: NOTE_TD1
  };

  M['td1-3-13'] = {
    src: 'Tutorial 1 · Ex 3.13', title: 'Shelving books grouped by subject',
    intro: p('The bookshelf of an EPITA student, reserved for «cramming» for the next exam, contains 4 algo books, 6 math books and 3 physics books. Determine the number of ways to rank them on the shelf, given that they must be classified according to the subject they refer to.'),
    hints: [r`First the order of the three blocks, then the order of the books inside each block.`],
    solution: [{ t: 'Solution', html: model(p(r`Choose the order of the three subjects: \(3!\) ways. Inside each block, order the books: \(4!\) for algo, \(6!\) for maths, \(3!\) for physics.`) + p(r`There are \(3! \times 4! \times 6! \times 3! = 6 \times 24 \times 720 \times 6 = 622{,}080\) arrangements.`)) }],
    answer: p(r`\(3! \times 4! \times 6! \times 3! = 622{,}080\).`),
    traps: [r`Forgetting the factor \(3!\) for the order of the subjects.`],
    note: NOTE_TD1
  };

  M['td1-3-14'] = {
    src: 'Tutorial 1 · Ex 3.14', title: 'Symmetry and Pascal’s formula',
    intro: p(r`Let \(n \in \N^*\) and \(k \in \ent{0}{n}\).`),
    questions: [r`Compare the number of ways of choosing a subset of \(k\) elements from a set of \(n\), with the number of ways of choosing a subset of \(n - k\) elements. Can you explain the resulting property?`,
      r`In a box, there are \(n\) balls numbered 1 to \(n\). We simultaneously pick \(k\) balls (\(k \geq 1\)).<br>(a) How many possible results are possible?<br>(b) From these results, how many contain the 1-ball?<br>(c) How many results don't have the 1-ball?<br>(d) Deduce a relation between \(\binom{n}{k}\), \(\binom{n-1}{k}\) and \(\binom{n-1}{k-1}\).<br>(e) Prove this relation with a computation. Explain how it can be used to compute the binomial coefficients.`],
    hints: [r`Choosing the \(k\) elements you take is the same as choosing the \(n - k\) you leave.`, r`If ball 1 is picked, \(k - 1\) balls remain to be chosen among \(n - 1\).`, r`For (e), use the common denominator \(k!(n - k)!\).`],
    solution: [
      { t: 'Question 1: symmetry', html: p(r`The mapping \(A \mapsto \overline{A}\) (complement) maps each \(k\)-element subset to an \((n - k)\)-element subset, and it is a bijection (it is its own inverse). So \(\binom{n}{k} = \binom{n}{n - k}\). By computation: \(\binom{n}{n - k} = \frac{n!}{(n - k)!\,k!} = \binom{n}{k}\).`) },
      { t: 'Question 2: Pascal by counting draws', html: model(p(r`(a) A result is a \(k\)-element subset of \(\ent{1}{n}\): \(\binom{n}{k}\) results.`) +
        p(r`(b) For the results containing ball 1, \(k - 1\) balls remain to be chosen among the \(n - 1\) others: \(\binom{n-1}{k-1}\).`) +
        p(r`(c) Those without it: \(k\) balls among the \(n - 1\) others, \(\binom{n-1}{k}\).`) +
        p(r`(d) These two cases are disjoint and cover all results, so \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\) (for \(1 \leq k \leq n - 1\), and also \(k = n\) with \(\binom{n-1}{n} = 0\)).`)) },
      { t: '(e) By computation', html: fm(r`\binom{n-1}{k-1} + \binom{n-1}{k} = \frac{(n-1)!}{(k-1)!\,(n-k)!} + \frac{(n-1)!}{k!\,(n-1-k)!} = \frac{(n-1)!\,k}{k!\,(n-k)!} + \frac{(n-1)!\,(n-k)}{k!\,(n-k)!} = \frac{(n-1)!\,(k + n - k)}{k!\,(n-k)!} = \frac{n!}{k!\,(n-k)!}`) +
        p(r`The coefficients are computed row by row (Pascal’s triangle): each number is the sum of the two numbers above it.`) +
        tbl(['n \\ k', '0', '1', '2', '3', '4', '5'], [['0', '1', '', '', '', '', ''], ['1', '1', '1', '', '', '', ''], ['2', '1', '2', '1', '', '', ''], ['3', '1', '3', '3', '1', '', ''], ['4', '1', '4', '6', '4', '1', ''], ['5', '1', '5', '10', '10', '5', '1']], { th: true, w: 22 }) }],
    answer: p(r`\(\binom{n}{k} = \binom{n}{n-k}\); \(\binom{n}{k}\), \(\binom{n-1}{k-1}\), \(\binom{n-1}{k}\); Pascal \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\).`),
    traps: [r`Not saying that the two cases (with or without ball 1) are disjoint: that is what allows adding them.`, r`Applying Pascal for \(k = 0\): \(\binom{n-1}{-1}\) is not defined (you need \(k \geq 1\), or the convention \(\binom{n-1}{-1} = 0\)).`],
    note: NOTE_TD1
  };

  M['td1-3-15'] = {
    src: 'Tutorial 1 · Ex 3.15', title: 'The binomial formula',
    questions: [r`Let \((x, y) \in \R^2\). Suggest two ways to prove the relation (called the binomial or Newton's formula)` + fm(r`\forall n \in \N,\ (x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}.`) + 'Provide the formal proof for at least one of these two ways.',
      r`Using the binomial formula from previous question and the Pascal triangle, find the expanded form of` + fm(r`A = (x + y)^4 \qquad \text{and} \qquad B = (a - b)^5`),
      'Explain how this formula can prove a relation that we have seen at exercise 2-12.'],
    hints: [r`Counting idea: expanding \((x + y)(x + y)\cdots(x + y)\), you choose \(x\) or \(y\) in each factor; how many ways to get \(x^k y^{n-k}\)?`, r`Induction idea: \((x + y)^{n+1} = (x + y)(x + y)^n\), then Pascal’s formula.`, r`\(B = (a + (-b))^5\): the signs alternate.`],
    solution: [
      { t: 'Question 1: two proofs', html: p(r`<b>Counting.</b> \((x + y)^n\) is a product of \(n\) factors \((x + y)\). When expanding, each term comes from choosing \(x\) or \(y\) in each factor. You get \(x^k y^{n-k}\) by choosing the \(k\) factors giving \(x\): \(\binom{n}{k}\) ways.`) +
        model(p(r`<b>By induction.</b> \(\mathcal{P}(n)\): “\((x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}\)”. \(\mathcal{P}(0)\): \(1 = \binom{0}{0}\).`) +
          p(r`Assume \(\mathcal{P}(n)\). Then \((x + y)^{n+1} = \sum_{k=0}^{n} \binom{n}{k} x^{k+1} y^{n-k} + \sum_{k=0}^{n} \binom{n}{k} x^k y^{n+1-k}\). In the first sum, set \(j = k + 1\):`) +
          fm(r`(x + y)^{n+1} = \sum_{j=1}^{n+1} \binom{n}{j-1} x^j y^{n+1-j} + \sum_{j=0}^{n} \binom{n}{j} x^j y^{n+1-j} = x^{n+1} + \sum_{j=1}^{n} \left[\binom{n}{j-1} + \binom{n}{j}\right] x^j y^{n+1-j} + y^{n+1}`) +
          p(r`By Pascal, the bracket equals \(\binom{n+1}{j}\), and \(x^{n+1}\), \(y^{n+1}\) are the terms \(j = n + 1\) and \(j = 0\): this is \(\mathcal{P}(n + 1)\). By induction, the formula holds for all \(n\).`)) },
      { t: 'Questions 2 and 3', html: p(r`Rows 4 and 5 of the triangle: 1 4 6 4 1 and 1 5 10 10 5 1.`) +
        fm(r`A = x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4`) + fm(r`B = a^5 - 5a^4b + 10a^3b^2 - 10a^2b^3 + 5ab^4 - b^5`) +
        p(r`3. With \(x = y = 1\): \(\sum_{k=0}^{n} \binom{n}{k} = (1 + 1)^n = 2^n\). The first two problems of exercise 2-12 do have the same answer.`) }],
    answer: p(r`\(A = x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4\); \(B = a^5 - 5a^4b + 10a^3b^2 - 10a^2b^3 + 5ab^4 - b^5\); \(\sum_k \binom{n}{k} = 2^n\).`),
    traps: [r`Forgetting the alternating signs in \(B\): \((-b)^k\) is negative for odd \(k\).`, r`Starting the induction at \(n = 1\) although the statement says \(n \in \N\).`],
    note: NOTE_TD1
  };

  M['td1-3-16'] = {
    src: 'Tutorial 1 · Ex 3.16', title: 'Compute Σ 2ᵏ C(n, k)',
    intro: p(r`Consider the following sum: \(\displaystyle\sum_{k=0}^{n} 2^k \binom{n}{k}\).`),
    questions: ['Compute its value.', 'Find a problem whose answer is equal to this sum.'],
    hints: [r`Recognize the binomial formula with \(x = 2\) and \(y = 1\).`, r`\(3^n\): \(n\) people each choosing among 3 options.`],
    solution: [{ t: 'Solution', html: model(p(r`By the binomial formula with \(x = 2\) and \(y = 1\): \(\sum_{k=0}^{n} \binom{n}{k} 2^k 1^{n-k} = (2 + 1)^n = 3^n\).`)) +
      p(r`A problem: \(n\) students each choose one option among three (A, B, C). There are \(3^n\) distributions. Sorting them by the number \(k\) of students who do not take C: choose these \(k\) students (\(\binom{n}{k}\)), then each one chooses A or B (\(2^k\)). We get \(\sum_k 2^k \binom{n}{k}\).`) }],
    answer: p(r`\(\sum_{k=0}^{n} 2^k \binom{n}{k} = 3^n\).`),
    traps: [r`Misplacing the exponents: \(x^k y^{n-k}\) with \(x = 2\), \(y = 1\).`],
    note: NOTE_TD1
  };

  M['td1-3-17'] = {
    src: 'Tutorial 1 · Ex 3.17', title: 'The code of a padlock',
    intro: p('A candidate came to the Advance exam by bicycle. He locked his bike at the gate of the school, using a padlock with 4 digits (from 0 to 9). Then the math teacher asked him:'),
    questions: ['a. What is the number of possibilities for the padlock\'s code?<br>b. What is the number of possibilities whose last digit is even?<br>c. What is the number of possibilities which contain at least once the digit 2?',
      'Suppose now that the code is made of 4 mutually distinct digits.<br>a. What is the number of possibilities for the padlock\'s code?<br>b. What is the number of possibilities whose last digit is even?<br>c. What is the number of possibilities which contain at least once the digit 2?'],
    hints: [r`A code is a 4-list of digits; a leading 0 is allowed.`, r`“At least once the digit 2”: total minus “no 2”.`, r`Distinct digits and last one even: choose the last digit first.`],
    solution: [{ t: 'Solution', html: ol([r`a. \(10^4 = 10{,}000\). b. 5 choices for the last digit, 10 for the others: \(10^3 \times 5 = 5{,}000\). c. Without 2: \(9^4 = 6{,}561\); so \(10{,}000 - 6{,}561 = 3{,}439\).`,
        r`a. \(A_{10}^4 = 10 \times 9 \times 8 \times 7 = 5{,}040\). b. Last digit even: 5 choices; the first three, distinct, among the 9 remaining digits: \(A_9^3 = 504\); \(5 \times 504 = 2{,}520\). c. Without 2: \(A_9^4 = 3{,}024\); with a 2: \(5{,}040 - 3{,}024 = 2{,}016\) (or: 4 places for the 2, then \(A_9^3\): \(4 \times 504\)).`]) +
      model(p(r`2.b. First choose the last digit, even: 5 choices. The first three digits are distinct from each other and from the last one: pick them in order among the 9 remaining digits, \(9 \times 8 \times 7 = 504\) choices.`) + p(r`There are \(5 \times 504 = 2{,}520\) codes.`)) }],
    answer: p('10,000; 5,000; 3,439; 5,040; 2,520; 2,016.'),
    traps: [r`Counting “at least one 2” as \(4 \times 10^3\): codes with several 2s are counted several times.`, r`Forbidding a leading 0: a padlock code is not a number, 0123 is allowed.`],
    note: NOTE_TD1
  };

  M['td1-3-18'] = {
    src: 'Tutorial 1 · Ex 3.18', title: 'Peter, Mary and the organizing board',
    intro: p(r`<b><em>Homework: to be done by everyone</em></b>`) + p('Peter and Mary are in a 20-student class. The 20 students are: 12 boys and 8 girls.') +
      p('The class students will do an excursion together. In that purpose, they have to select a 4-student organizing board. The organizing board will be made of: a chief, a vise chief and two assistants (each assistant will assist both the chief and the vise chief, no distinction between the assistants). No one can be in the board at two positions simultaneously.'),
    questions: ['How many organizing boards are possible? Explain briefly.', 'The students have decided that the chief will be a girl, the vise chief a boy and that, from the two assistants, there will be one girl and one boy. How many boards satisfy this requirement? Explain briefly.',
      'To start with, they have chosen the chief: she will be Mary. How many boards remain possible? Explain briefly.', 'Peter says: "If Mary is the board\'s chief, then I want to be in the board too!". How many boards remain possible? Explain briefly.'],
    hints: [r`Chief and vice chief: distinct positions (order). The two assistants: a pair without order, \(\binom{\cdot}{2}\).`, r`Question 4: Mary is chief (question 3), and Peter is either vice chief or an assistant. Two disjoint cases.`],
    solution: [{ t: 'Solution', html: ol([
        r`Chief: 20 choices; vice chief: 19; assistants: a pair among the 18 others, \(\binom{18}{2} = 153\). Total: \(20 \times 19 \times 153 = 58{,}140\).`,
        r`Girl chief: 8; boy vice chief: 12; a girl assistant among the 7 remaining girls, a boy assistant among the 11 remaining boys: \(8 \times 12 \times 7 \times 11 = 7{,}392\).`,
        r`Mary is chief: vice chief among 19, assistants among 18: \(19 \times \binom{18}{2} = 2{,}907\).`,
        r`Mary is chief and Peter is in the board. Either Peter is vice chief: the assistants are a pair among 18, \(\binom{18}{2} = 153\). Or Peter is an assistant: vice chief among 18, the other assistant among 17, \(18 \times 17 = 306\). In total \(153 + 306 = 459\).`]) +
      model(p(r`4. Mary is chief (question 3) and Peter is in the board. Two disjoint cases:`) + p(r`– Peter is vice chief: choose the two assistants among the 18 other students, \(\binom{18}{2} = 153\) boards;`) +
        p(r`– Peter is an assistant: choose the vice chief among 18 students, then the second assistant among 17: \(18 \times 17 = 306\) boards.`) + p('In total, 459 boards.')) +
      note(r`Read as a logical implication (“Mary chief \(\implies\) Peter in the board”), one would also count all the boards where Mary is not chief: \(58{,}140 - 18 \times \binom{17}{2} = 55{,}692\). The context (question 3, and the answer key of the 2022 exam, where this exercise came up) gives 459. Write down the reading you choose.`) }],
    answer: p(r`\(20 \times 19 \times \binom{18}{2} = 58{,}140\); \(8 \times 12 \times 7 \times 11 = 7{,}392\); \(19 \times \binom{18}{2} = 2{,}907\); \(\binom{18}{2} + 18 \times 17 = 459\).`),
    traps: [r`Ordering the assistants (\(18 \times 17\) instead of \(\binom{18}{2}\)): they have the same role.`, r`Question 4: adding boards where Mary is not chief (\(19 \times 19\)…): we stay in the situation “Mary is chief”.`],
    note: NOTE_TD1
  };

  M['td1-4-19'] = {
    src: 'Tutorial 1 · Ex 4.19', title: 'Number of digits in base b',
    intro: p(r`Let \(x \in \N\) and \(b \in \N \setminus \{0, 1\}\). Let \([x]_b\) be the string of digits which represent \(x\) in the base-\(b\) system. More accurately, \([x]_b\) is the string \([x]_b = d_{k-1} d_{k-2} \cdots d_0\) where`) +
      ul([r`for any \(i \in \ent{0}{k-1}\), \(0 \leq d_i < b\) and \(d_{k-1} \neq 0\);`, r`\(x = \displaystyle\sum_{i=0}^{k-1} d_i b^i\).`]),
    questions: ['Find the expression of 173 in the base-10 system. Then in the base-2 system.', r`To start with, we focus on the case \(b = 2\) and \(k\) denotes the number of digits in the binary representation (base-2 system) of \(x\).<br>– Provide a lower bound and an upper bound for \(x\) as two successive powers of 2.<br>– Deduce an expression of \(k\) as a function of \(x\).`, 'Generalize the previous result to any base \\(b\\).'],
    hints: [r`\(173 = 128 + 32 + 8 + 4 + 1\).`, r`Bound \(x\) below by its first term \(d_{k-1} 2^{k-1}\), bound each digit above by 1.`, r`\(2^{k-1} \leq x < 2^k \iff k - 1 \leq \log_2 x < k\).`],
    solution: [{ t: 'Solution', html: p(r`1. \(173 = 1 \times 10^2 + 7 \times 10^1 + 3 \times 10^0\) and \(173 = 2^7 + 2^5 + 2^3 + 2^2 + 2^0\), so \([173]_2 = 10101101\) (8 digits).`) +
      model(p(r`2. Let \(x \geq 1\) with \(k\) binary digits. On the one hand \(x \geq d_{k-1} 2^{k-1} = 2^{k-1}\) (\(d_{k-1} = 1\)). On the other hand \(x \leq \sum_{i=0}^{k-1} 2^i = 2^k - 1 < 2^k\).`) +
        p(r`So \(2^{k-1} \leq x < 2^k\). Since \(\log_2\) is strictly increasing: \(k - 1 \leq \log_2 x < k\), so \(k - 1 = \lfloor \log_2 x \rfloor\) and \(k = \lfloor \log_2 x \rfloor + 1\).`)) +
      p(r`3. Likewise \(b^{k-1} \leq x \leq \sum_{i=0}^{k-1} (b - 1) b^i = b^k - 1 < b^k\), so \(k = \lfloor \log_b x \rfloor + 1 = \left\lfloor \frac{\ln x}{\ln b} \right\rfloor + 1\). (For \(x = 0\), we write “0”: one digit.)`) +
      p(r`Example: \(\log_2 173 \approx 7.43\), hence \(k = 8\).`) }],
    answer: p(r`\([173]_2 = 10101101\); \(2^{k-1} \leq x < 2^k\), \(k = \lfloor \log_2 x \rfloor + 1\); in base \(b\): \(k = \lfloor \log_b x \rfloor + 1\).`),
    traps: [r`Writing \(x \leq 2^k\) (instead of \(x < 2^k\)) then “\(\log_2 x = k - 1\)”: you need the strict bounds and the floor function.`],
    note: NOTE_TD1
  };

  M['td1-4-20'] = {
    src: 'Tutorial 1 · Ex 4.20', title: 'Increasing and strictly increasing lists',
    intro: p(r`<b><em>Homework: to be done by everyone</em></b>`) + p(r`When \(E\) is a finite set and \(k\) a positive natural number, we call «\(k\)-list from \(E\)» an element of the Cartesian product \(E^k\). For any \(u \in E^k\) and any \(i \in \ent{1}{k}\), the \(i\)-th input of \(u\) is denoted by \(u[i]\).`) +
      p(r`Let \(I\) be the interval \(I = \ent{0}{4}\).`) +
      p(r`We say that a \(k\)-list \(u\) from \(I\) is increasing (similarly, strictly increasing) if for any \(i \in \ent{1}{k-1}\), \(u[i] \leq u[i + 1]\) (similarly, \(u[i] < u[i + 1]\)). What are the numbers of`),
    questions: [r`strictly increasing 2-lists from \(I\)? increasing 2-lists from \(I\)?`, r`strictly increasing 3-lists from \(I\)?`, r`strictly increasing 5-lists from \(I\)?`, r`strictly increasing 7-lists from \(I\)?`],
    hints: [r`A strictly increasing list is entirely determined by the set of its values: how many \(k\)-element subsets in \(I\)?`, r`An increasing 2-list is strictly increasing, or constant.`],
    solution: [{ t: 'Solution', html: model(p(r`A strictly increasing \(k\)-list from \(I\) corresponds to a \(k\)-element subset of \(I\) (its elements sorted in increasing order), and conversely: there are \(\binom{5}{k}\) of them.`)) +
      ul([r`Strictly increasing 2-lists: \(\binom{5}{2} = 10\). Increasing: those 10 and the 5 constant ones, 15 in total (\(= \binom{6}{2}\)).`, r`Strictly increasing 3-lists: \(\binom{5}{3} = 10\).`, r`Strictly increasing 5-lists: \(\binom{5}{5} = 1\), the list \((0, 1, 2, 3, 4)\).`, r`Strictly increasing 7-lists: 0, there are only 5 distinct values.`]) +
      p(r`In general, there are \(\binom{5 + k - 1}{k}\) increasing \(k\)-lists from \(I\) (checked by enumeration: 15, 35, 126, 330 for \(k = 2, 3, 5, 7\)).`) }],
    answer: p('10 and 15; 10; 1; 0.'),
    traps: [r`Counting with \(A_5^k\): once the values are chosen, the order is imposed (increasing).`],
    note: NOTE_TD1
  };

  /* ===================== Tutorial 2: finite probabilities ===================== */
  /* English order of the questions: 1 f(∅), 2 bounds, 3 complement (French: 2 and 3 swapped) */
  M['td2-1-1'] = {
    src: 'Tutorial 2 · Ex 1.1', title: 'Properties of a probability from the axioms',
    intro: p(r`Let \(\Omega\) be a set and \(f : \mathcal{P}(\Omega) \longrightarrow \R\) a mapping satisfying the conditions (the Kolmogorov's axioms):`) +
      p(r`– \(f(\Omega) = 1\)<br>– \(\forall A \in \mathcal{P}(\Omega), \quad f(A) \geq 0\)<br>– \(\forall (A, B) \in \mathcal{P}(\Omega)^2, \quad \text{if} \quad A \cap B = \varnothing \quad \text{then} \quad f(A \sqcup B) = f(A) + f(B)\)`) +
      p('Show the following relations:'),
    questions: [r`\(f(\varnothing) = 0\);`, r`\(\forall A \in \mathcal{P}(\Omega), 0 \leq f(A) \leq 1\);`, r`\(f(\overline{A}) = 1 - f(A)\);`, r`if \(A \subset B\), \(f(A) \leq f(B)\) and \(f(B \setminus A) = f(B) - f(A)\);`,
      r`for any \(A, B \in \mathcal{P}(\Omega)\), \(f(A \cup B) = f(A) + f(B) - f(A \cap B)\).<br>How would you call the 3-tuple \((\Omega, \mathcal{P}(\Omega), f)\)? How would you call the function \(f\)?`],
    hints: [r`Each time, write a set as a <b>disjoint</b> union, then apply the third axiom. For example \(A = A \sqcup \varnothing\), \(\Omega = A \sqcup \overline{A}\).`, r`For 4: \(B = A \sqcup (B \setminus A)\).`, r`For 5: \(A \cup B = (A \setminus B) \sqcup B\) and \(A = (A \setminus B) \sqcup (A \cap B)\).`],
    solution: [
      { t: '1. f(∅) = 0', html: model(p(r`Let \(A \in \mathcal{P}(\Omega)\). \(A \cap \varnothing = \varnothing\), so by the third axiom \(f(A \sqcup \varnothing) = f(A) + f(\varnothing)\). But \(A \sqcup \varnothing = A\), hence \(f(A) = f(A) + f(\varnothing)\) and \(f(\varnothing) = 0\).`)) },
      { t: '2. 0 ≤ f(A) ≤ 1', html: p(r`\(f(A) \geq 0\) by the second axiom. \(\Omega = A \sqcup \overline{A}\) (disjoint union), so \(1 = f(\Omega) = f(A) + f(\overline{A})\), and since \(f(\overline{A}) \geq 0\), \(f(A) \leq 1\).`) },
      { t: '3. f(Ā) = 1 − f(A)', html: p(r`From the same equality \(1 = f(A) + f(\overline{A})\): \(f(\overline{A}) = 1 - f(A)\).`) },
      { t: '4. If A ⊂ B', html: p(r`Since \(A \subset B\), \(B = A \sqcup (B \setminus A)\), so \(f(B) = f(A) + f(B \setminus A)\): \(f(B \setminus A) = f(B) - f(A)\). And \(f(B \setminus A) \geq 0\) gives \(f(A) \leq f(B)\).`) },
      { t: '5. Inclusion-exclusion; the vocabulary', html: p(r`\(A \cup B = (A \setminus B) \sqcup B\) gives \(f(A \cup B) = f(A \setminus B) + f(B)\); \(A = (A \setminus B) \sqcup (A \cap B)\) gives \(f(A \setminus B) = f(A) - f(A \cap B)\). Hence \(f(A \cup B) = f(A) + f(B) - f(A \cap B)\).`) +
        p(r`\((\Omega, \mathcal{P}(\Omega), f)\) is a <b>probability space</b> and \(f\) a <b>probability</b> (probability function).`) }],
    answer: p(r`Each relation comes from a disjoint union: \(A = A \sqcup \varnothing\), \(\Omega = A \sqcup \overline{A}\), \(B = A \sqcup (B \setminus A)\), \(A \cup B = (A \setminus B) \sqcup B\). Probability space, probability function.`),
    traps: [r`Applying the third axiom to two sets without checking (and writing) that they are disjoint.`, r`Using a property before proving it.`],
    note: NOTE_TD2 + ' The French sheet swaps questions 2 and 3.'
  };

  M['td2-1-2'] = {
    src: 'Tutorial 2 · Ex 1.2', title: 'Describe the sample set and the probability of each outcome',
    intro: p(r`For each of the the following experiments, display the sample set \(\Omega\) and determine the probability of each possible outcome.`),
    questions: ['tossing a coin', 'rolling a fair dice', 'rolling two fair dice, each of them having a different color (then you can distinguish them)', 'drawing one marble from a box containing 5 red and 6 white marbles',
      'drawing with replacement three marbles from a box containing 5 red and 6 white marbles', 'drawing simultaneously three marbles from a box containing 5 red and 6 white marbles', 'drawing successively three marbles from a box containing 5 red and 6 white marbles.'],
    hints: [r`To get equally likely outcomes, number the marbles: \(R_1, \dots, R_5, W_1, \dots, W_6\).`, r`With replacement: any 3-tuples; without replacement: 3-tuples of distinct marbles; simultaneously: 3-element subsets.`],
    solution: [{ t: 'Solution', html: tbl(['experiment', r`\(\Omega\)`, r`\(\mathrm{Card}\,\Omega\)`, 'probability of an outcome'], [
        ['1', r`\(\{H, T\}\) (heads, tails)`, '2', r`\(\frac{1}{2}\)`],
        ['2', r`\(\ent{1}{6}\)`, '6', r`\(\frac{1}{6}\)`],
        ['3', r`\(\ent{1}{6}^2\) (2-tuples: first dice, second dice)`, '36', r`\(\frac{1}{36}\)`],
        ['4', r`\(U = \{R_1, \dots, R_5, W_1, \dots, W_6\}\)`, '11', r`\(\frac{1}{11}\)`],
        ['5', r`\(U^3\) (3-tuples)`, r`\(11^3 = 1{,}331\)`, r`\(\frac{1}{1{,}331}\)`],
        ['6', 'subsets of \\(U\\) with 3 elements', r`\(\binom{11}{3} = 165\)`, r`\(\frac{1}{165}\)`],
        ['7', '3-tuples of distinct marbles', r`\(A_{11}^3 = 990\)`, r`\(\frac{1}{990}\)`]], { th: true }) +
      p(r`One can also take \(\Omega = \{R, W\}\) for experiment 4, but then the outcomes are not equally likely: \(P(R) = \frac{5}{11}\), \(P(W) = \frac{6}{11}\). Numbering the marbles keeps equiprobability.`) +
      note(r`Experiment 7: the English sheet does not say “without replacement”; the French sheet does (“successif et sans remise”), which is the reading used here.`) }],
    answer: p(r`Equally likely outcomes: \(\frac{1}{2}\), \(\frac{1}{6}\), \(\frac{1}{36}\), \(\frac{1}{11}\), \(\frac{1}{1{,}331}\), \(\frac{1}{165}\), \(\frac{1}{990}\).`),
    traps: [r`Writing \(\Omega = \{R, R, R, W, \dots\}\): a set does not repeat its elements.`, r`Giving “2 red and 1 white” as an outcome of probability \(\frac{1}{165}\): it is an event containing several outcomes.`],
    note: NOTE_TD2
  };

  M['td2-1-3'] = {
    src: 'Tutorial 2 · Ex 1.3', title: 'Poincaré’s paradox: 11/36 or 6/21?',
    intro: p(r`At the time when mathematicians were wondering how to build the probability theory, H. Poincaré asked the following question: when rolling two indistinguishable dice, we can get the probability \(\frac{11}{36}\) or \(\frac{6}{21}\) for the event «getting at least one 6»! Explain his two ways of reasoning. Which one is correct?`),
    hints: [r`Reasoning 1: 36 2-tuples. Reasoning 2: the unordered results \(\{i, j\}\): how many are there?`, r`Are the 21 unordered results equally likely? Compare \(\{1, 2\}\) and \(\{6, 6\}\).`],
    solution: [{ t: 'Solution', html: p(r`<b>Reasoning 1.</b> We distinguish the dice (we can paint them): \(\Omega = \ent{1}{6}^2\), 36 equally likely 2-tuples. “At least one 6”: \(36 - 25 = 11\) 2-tuples. Probability \(\frac{11}{36}\).`) +
      p(r`<b>Reasoning 2.</b> We only look at unordered results: 15 pairs \(\{i, j\}\) with \(i \neq j\) and 6 doubles, 21 results, 6 of which contain a 6. If they are believed equally likely: \(\frac{6}{21} = \frac{2}{7}\).`) +
      model(p(r`The correct reasoning is the first one. That the dice are indistinguishable does not change the experiment: \(\{1, 2\}\) comes from the 2-tuples \((1, 2)\) and \((2, 1)\), with probability \(\frac{2}{36}\), while \(\{6, 6\}\) comes with probability \(\frac{1}{36}\). The 21 results are not equally likely, “positive cases over possible cases” cannot be used.`) + p(r`\(P(\text{at least one } 6) = \frac{11}{36}\).`)) }],
    answer: p(r`\(\frac{11}{36}\): the 21 unordered results are not equally likely.`),
    traps: [r`Using “positive cases / possible cases” on a sample set whose outcomes are not equally likely.`],
    note: NOTE_TD2
  };

  M['td2-1-4'] = {
    src: 'Tutorial 2 · Ex 1.4', title: 'The birthday problem',
    questions: [r`In a population of \(N > 1\) persons, what is the smallest value of \(N\) to be sure that at least two persons have the same birthday?`, r`What is the probability that at least two persons, from a size \(N > 1\) population, have the same birthday?`],
    hints: [r`Pigeonhole principle: 365 possible days.`, r`Use the complement: “all the dates are distinct”. Assume the 365 days equally likely and the births independent.`],
    solution: [{ t: 'Solution', html: p(r`1. With 365 days (leaving out 29 February), 365 people can all have different dates; with \(N = 366\), at least two share a date (pigeonhole principle). \(N = 366\) (367 counting 29 February).`) +
      model(p(r`2. Model: \(\Omega = \ent{1}{365}^N\) with equiprobability: \(\mathrm{Card}\,\Omega = 365^N\). The complement \(\overline{D}\) “all the dates are distinct” corresponds to the \(N\)-lists without repetition: \(\mathrm{Card}\,\overline{D} = A_{365}^N\) (for \(N \leq 365\)).`) +
        p(r`So \(P(D) = 1 - \dfrac{A_{365}^N}{365^N} = 1 - \dfrac{365 \times 364 \times \dots \times (365 - N + 1)}{365^N}\), and \(P(D) = 1\) for \(N \geq 366\).`)) +
      tbl([r`\(N\)`, '22', '23', '30', '50'], [[r`\(P(D)\)`, r`\(\approx 0.476\)`, r`\(\approx 0.507\)`, r`\(\approx 0.706\)`, r`\(\approx 0.970\)`]], { th: true, w: 24 }) +
      p(r`From 23 people on, the probability is above \(\frac{1}{2}\): the “birthday paradox”.`) }],
    answer: p(r`\(N = 366\); \(P = 1 - \frac{A_{365}^N}{365^N}\) (\(> \frac{1}{2}\) from \(N = 23\)).`),
    traps: [r`Computing “at least two” directly: many cases. The complement is much simpler.`],
    note: NOTE_TD2
  };

  M['td2-2-5'] = {
    src: 'Tutorial 2 · Ex 2.5', title: '5-card hands from a 32-card deck',
    intro: p('From a 32-card deck, we randomly pick a 5-card hand. Determine the probabilities of getting:'),
    questions: ['exactly one ace;', 'at least one ace;', 'the queen of clubs;', '4 clubs, including the queen;', 'exactly one club and one queen.'],
    hints: [r`\(\Omega\) = the hands (5-element subsets): \(\binom{32}{5} = 201{,}376\), equally likely. The deck has 4 aces, 8 clubs, 4 queens.`, r`“At least one ace”: use the complement.`, r`Question 5: distinguish whether the club is the queen of clubs or not.`],
    solution: [{ t: 'Solution', html: p(r`Let \(\Omega\) be the set of hands, \(\mathrm{Card}\,\Omega = \binom{32}{5} = 201{,}376\), with equiprobability.`) + ol([
        r`One ace among 4, then 4 cards among the 28 others: \(\dfrac{4\binom{28}{4}}{\binom{32}{5}} = \dfrac{81{,}900}{201{,}376} = \dfrac{2{,}925}{7{,}192} \approx 0.407\).`,
        r`Complement “no ace”: \(\binom{28}{5} = 98{,}280\) hands. \(1 - \dfrac{98{,}280}{201{,}376} = \dfrac{1{,}841}{3{,}596} \approx 0.512\).`,
        r`The queen of clubs, then 4 cards among 31: \(\dfrac{\binom{31}{4}}{\binom{32}{5}} = \dfrac{5}{32}\).`,
        r`The queen of clubs, 3 other clubs among 7, one non-club card among 24: \(\dfrac{\binom{7}{3} \times 24}{\binom{32}{5}} = \dfrac{840}{201{,}376} = \dfrac{15}{3{,}596}\).`,
        r`Two disjoint cases. The club is the queen of clubs: 4 other cards, neither club nor queen (\(32 - 8 - 3 = 21\) cards): \(\binom{21}{4} = 5{,}985\). The club is not a queen (7 choices), the queen is one of the 3 others (3 choices), 3 cards among the 21: \(7 \times 3 \times \binom{21}{3} = 27{,}930\). Probability \(\dfrac{33{,}915}{201{,}376} = \dfrac{4{,}845}{28{,}768} \approx 0.168\).`]) +
      model(p(r`2. Let \(A\): “the hand contains at least one ace”. \(\overline{A}\): “no ace”, made of the \(\binom{28}{5}\) hands formed with the 28 cards that are not aces.`) + p(r`So \(P(A) = 1 - \dfrac{\binom{28}{5}}{\binom{32}{5}} = 1 - \dfrac{98{,}280}{201{,}376} = \dfrac{1{,}841}{3{,}596}\).`)) }],
    answer: p(r`\(\frac{2{,}925}{7{,}192}\); \(\frac{1{,}841}{3{,}596}\); \(\frac{5}{32}\); \(\frac{15}{3{,}596}\); \(\frac{4{,}845}{28{,}768}\).`),
    traps: [r`“At least one ace” as \(\frac{4\binom{31}{4}}{\binom{32}{5}}\): hands with several aces are counted several times.`, r`Question 4: forgetting that the 5th card must not be a club (“4 clubs” = exactly 4).`, r`Question 5: forgetting the case where the only club is the queen of clubs.`],
    note: NOTE_TD2
  };

  M['td2-2-6'] = {
    src: 'Tutorial 2 · Ex 2.6', title: 'Two dice: doubles, sums, maximum',
    intro: p('We roll two fair dice. Find the probabilities:'),
    questions: ['that the numbers on the dice are equal;', 'that the sum of the dice is an even number;', 'that the sum of the dice is less than or equal to 8;', 'that the highest number of the dice is less than or equal to 4.'],
    hints: [r`Distinguish the dice: \(\Omega = \ent{1}{6}^2\), 36 equally likely outcomes.`, r`Sum \(\leq 8\): rather count the sums 9, 10, 11, 12.`, r`Maximum \(\leq 4\): both dice are \(\leq 4\).`],
    solution: [{ t: 'Solution', html: ol([
        r`6 doubles: \(\frac{6}{36} = \frac{1}{6}\).`,
        r`Even sum when both dice have the same parity: \(3 \times 3 + 3 \times 3 = 18\) 2-tuples, \(\frac{1}{2}\).`,
        r`Sums 9, 10, 11, 12: \(4 + 3 + 2 + 1 = 10\) 2-tuples. So \(\frac{36 - 10}{36} = \frac{26}{36} = \frac{13}{18}\).`,
        r`Both dice in \(\ent{1}{4}\): \(4^2 = 16\) 2-tuples, \(\frac{16}{36} = \frac{4}{9}\).`]) }],
    answer: p(r`\(\frac{1}{6}\); \(\frac{1}{2}\); \(\frac{13}{18}\); \(\frac{4}{9}\).`),
    traps: [r`Taking the 21 unordered results as equally likely (see exercise 1.3).`],
    note: NOTE_TD2
  };

  M['td2-3-7'] = {
    src: 'Tutorial 2 · Ex 3.7', title: 'Incompatible or independent?',
    questions: [r`Assume you randomly pick a number in \(\ent{1}{20}\). Consider the two events: \(A\) = "the number is even" and \(B\) = "the number is a multiple of 5".<br>(a) Are the events \(A\) and \(B\) incompatible?<br>(b) Are the events \(A\) and \(B\) independent?`, r`Answer the previous questions if we pick the number in \(\ent{1}{21}\).`],
    hints: [r`Incompatible: \(A \cap B = \varnothing\). Independent: \(P(A \cap B) = P(A)P(B)\).`, r`\(A \cap B\): the multiples of 10.`],
    solution: [{ t: 'Solution', html: model(p(r`1. On \(\ent{1}{20}\) with equiprobability: \(A\) has 10 elements, \(B = \{5, 10, 15, 20\}\) has 4, \(A \cap B = \{10, 20\}\) has 2.`) +
        p(r`(a) \(A \cap B \neq \varnothing\): \(A\) and \(B\) are not incompatible.`) +
        p(r`(b) \(P(A)P(B) = \frac{10}{20} \times \frac{4}{20} = \frac{1}{10} = \frac{2}{20} = P(A \cap B)\): \(A\) and \(B\) are independent.`)) +
      p(r`2. On \(\ent{1}{21}\): same sets \(A\), \(B\), \(A \cap B\), still not incompatible. But \(P(A)P(B) = \frac{10}{21} \times \frac{4}{21} = \frac{40}{441}\) and \(P(A \cap B) = \frac{2}{21} = \frac{42}{441}\): they are no longer independent.`) +
      p(r`Independence depends on the probability, not only on the events.`) }],
    answer: p(r`Never incompatible. Independent on \(\ent{1}{20}\), not on \(\ent{1}{21}\).`),
    traps: [r`Mixing up incompatible and independent: two incompatible events with non-zero probabilities are never independent.`],
    note: NOTE_TD2
  };

  M['td2-3-8'] = {
    src: 'Tutorial 2 · Ex 3.8', title: 'The law of total probability',
    intro: p('Which statement is given by the law of total probability? Prove it.') + note('“Most of the time, we forget this law. We just prove it when reasoning.” (footnote of the sheet)'),
    hints: [r`Start from a partition \((B_1, \dots, B_n)\) of \(\Omega\) with \(P(B_i) \neq 0\).`, r`\(A = (A \cap B_1) \sqcup \dots \sqcup (A \cap B_n)\), then \(P(A \cap B_i) = P(A \mid B_i)P(B_i)\).`],
    solution: [{ t: 'Statement and proof', html: '<div class="box thm"><span class="tag">Law of total probability</span>' + p(r`Let \((B_1, \dots, B_n)\) be a partition of \(\Omega\) such that \(P(B_i) \neq 0\) for all \(i\). For every event \(A\):`) + fm(r`P(A) = \sum_{i=1}^{n} P(A \cap B_i) = \sum_{i=1}^{n} P(A \mid B_i)\,P(B_i).`) + '</div>' +
      model(p(r`Since \((B_1, \dots, B_n)\) is a partition of \(\Omega\), \(A = A \cap \Omega = (A \cap B_1) \cup \dots \cup (A \cap B_n)\), and these sets are mutually disjoint (\((A \cap B_i) \cap (A \cap B_j) \subset B_i \cap B_j = \varnothing\) for \(i \neq j\)).`) +
        p(r`By additivity, \(P(A) = \sum_{i=1}^{n} P(A \cap B_i)\). Finally \(P(A \cap B_i) = P(A \mid B_i)P(B_i)\) by definition of the conditional probability (\(P(B_i) \neq 0\)).`)) +
      p(r`Most frequent case: \(n = 2\), partition \(\{B, \overline{B}\}\): \(P(A) = P(A \mid B)P(B) + P(A \mid \overline{B})P(\overline{B})\).`) }],
    answer: p(r`\(P(A) = \sum_i P(A \mid B_i)P(B_i)\) for a partition \((B_i)\) of \(\Omega\), \(P(B_i) \neq 0\); proof by \(A = \bigsqcup_i (A \cap B_i)\).`),
    traps: [r`Forgetting the assumption “partition” (mutually exclusive collectively exhaustive events) and \(P(B_i) \neq 0\).`, r`Writing the last term \(P(A \cap B_n)P(B_n)\): it is \(P(A \mid B_n)P(B_n)\).`],
    note: NOTE_TD2
  };

  M['td2-3-9'] = {
    src: 'Tutorial 2 · Ex 3.9', title: 'Quality checking of posters',
    intro: p(r`<b><em>Homework: to be done by everyone</em></b>`) + p(r`In a commercial printing company, some posters are printed with a slight defect in coloring. The proportion of such defective posters is \(0.05\). The director of the company set up a quality checking service whose results are the following: a perfect poster has the probability \(0.96\) of being accepted while a defective poster has the probability \(0.98\) of being rejected.`),
    questions: ['Interpret these data as probabilities or conditional probabilities of simple events.', 'Find the probabilities of the following events:<br>(a) there is an error from the quality checking service;<br>(b) an accepted poster is defective.'],
    hints: [r`Events: \(D\) “the poster is defective”, \(A\) “the poster is accepted”.`, r`An error: accepting a defective poster, or rejecting a perfect one. Two disjoint cases.`, r`(b) asks for \(P(D \mid A)\): Bayes’ formula, with \(P(A)\) by the law of total probability.`],
    solution: [
      { t: 'Question 1', html: p(r`Let \(D\): “the poster is defective” and \(A\): “the poster is accepted”. Data: \(P(D) = 0.05\), \(P(A \mid \overline{D}) = 0.96\), \(P(\overline{A} \mid D) = 0.98\). Hence \(P(\overline{D}) = 0.95\), \(P(A \mid D) = 0.02\), \(P(\overline{A} \mid \overline{D}) = 0.04\).`) +
        tool('tree', { first: [{ n: 'D', p: '1/20' }, { n: '\\overline{D}', p: '19/20' }], second: { n: 'A', nb: '\\overline{A}', p: ['1/50', '24/25'] }, edit: false, title: 'Defect, then acceptance' }) },
      { t: 'Question 2', html: model(p(r`(a) The error is the event \(E = (D \cap A) \sqcup (\overline{D} \cap \overline{A})\) (disjoint union). So`) +
        fm(r`P(E) = P(A \mid D)P(D) + P(\overline{A} \mid \overline{D})P(\overline{D}) = 0.02 \times 0.05 + 0.04 \times 0.95 = 0.001 + 0.038 = \frac{39}{1{,}000}.`) +
        p(r`(b) Since \(\{D, \overline{D}\}\) is a partition of \(\Omega\): \(P(A) = P(A \mid D)P(D) + P(A \mid \overline{D})P(\overline{D}) = 0.001 + 0.912 = 0.913\).`) +
        fm(r`P(D \mid A) = \frac{P(A \cap D)}{P(A)} = \frac{P(A \mid D)P(D)}{P(A)} = \frac{0.001}{0.913} = \frac{1}{913}.`)) }],
    answer: p(r`\(P(E) = \frac{39}{1{,}000}\); \(P(D \mid A) = \frac{1}{913}\).`),
    traps: [r`Mixing up \(P(D \mid A)\) (asked) and \(P(A \mid D)\) (deduced from the data).`, r`Forgetting one of the two kinds of error in (a).`],
    note: NOTE_TD2
  };

  M['td2-3-10'] = {
    src: 'Tutorial 2 · Ex 3.10', title: 'Detecting cheating in handouts',
    intro: p('In a computer science school, the students must frequently deliver practical works, consisting in computer programs. However, some students cheat! For example, they send handouts from the previous years students, or they ask ChatGPT to do their work. The teaching staff has hence developed an algorithm to detect cheating in the handouts. The data are the following:') +
      ul([r`\(10\%\) out of the handouts contain cheating.`, r`Out of the handouts containing cheating, \(98\%\) are detected "cheating" by the algorithm.`, r`Out of the handouts containing no cheating, \(95\%\) are detected "not cheating" by the algorithm.`]) +
      p(r`We randomly pick a handout and consider the events: \(C\) = The handout contains cheating and \(DC\) = The handout is detected "cheating" by the algorithm.`),
    questions: ['Express the data using probabilities and the events defined above.', 'We randomly pick a handout. What is the probability that it is detected "cheating" by the algorithm?', 'The handout has been detected "cheating" by the algorithm. What is the probability that it contains cheating?'],
    hints: [r`\(95\%\) of the honest handouts are not detected: \(P(DC \mid \overline{C}) = 0.05\).`, r`Question 2: law of total probability on the partition \(\{C, \overline{C}\}\).`, r`Question 3: \(P(C \mid DC) = \frac{P(DC \mid C)P(C)}{P(DC)}\).`],
    solution: [{ t: 'Solution', html: p(r`1. \(P(C) = 0.1\), \(P(DC \mid C) = 0.98\), \(P(\overline{DC} \mid \overline{C}) = 0.95\), so \(P(DC \mid \overline{C}) = 0.05\).`) +
      tool('tree', { first: [{ n: 'C', p: '1/10' }, { n: '\\overline{C}', p: '9/10' }], second: { n: 'DC', nb: '\\overline{DC}', p: ['49/50', '1/20'] }, edit: false, title: 'Cheating, then detection' }) +
      model(p(r`2. Since \(\{C, \overline{C}\}\) is a partition of \(\Omega\), \(DC = (DC \cap C) \sqcup (DC \cap \overline{C})\), hence`) +
        fm(r`P(DC) = P(DC \mid C)P(C) + P(DC \mid \overline{C})P(\overline{C}) = 0.98 \times 0.1 + 0.05 \times 0.9 = 0.098 + 0.045 = \frac{143}{1{,}000}.`) +
        p(r`3. We want \(P(C \mid DC)\):`) + fm(r`P(C \mid DC) = \frac{P(DC \cap C)}{P(DC)} = \frac{P(DC \mid C)P(C)}{P(DC)} = \frac{0.098}{0.143} = \frac{98}{143} \approx 68.5\%.`)) +
      p(r`A handout detected “cheating” actually contains cheating only about two times out of three: the \(5\%\) false positives apply to \(90\%\) of the handouts.`) }],
    answer: p(r`\(P(DC) = \frac{143}{1{,}000} = 14.3\%\); \(P(C \mid DC) = \frac{98}{143} \approx 68.5\%\).`),
    traps: [r`Taking \(P(DC \mid \overline{C}) = 0.95\): that is the probability of <b>not</b> being detected.`, r`Answering \(0.98\) to question 3: it is \(P(DC \mid C)\), not \(P(C \mid DC)\).`],
    note: NOTE_TD2
  };

  M['td2-3-11'] = {
    src: 'Tutorial 2 · Ex 3.11 (★)', title: 'Two coloured dice and a loaded coin',
    intro: p(r`Let \(A\) and \(B\) be two dice: dice \(A\) has 4 red sides and 2 white sides while dice \(B\) has 2 red sides and 4 white sides. To start with, we toss a loaded coin, whose probability of getting tails is \(1/3\), in order to determine which dice will be used: if the coin toss is tails, we use dice \(A\), if it is heads we use dice \(B\). Then, we roll the selected dice several times.`),
    questions: ['Compute the probability of having a red side at the first roll of the dice.', r`Let \(n \in \N^*\) and suppose that the first \(n\) rolls of the dice all resulted in a red side. What is the probability that dice \(A\) has been used?`,
      'Suppose that the first two rolls of the dice both resulted in a red side. What is the probability of having a red side at the third roll?<br>Express each answer in two ways: (a) with a formula involving conditional probabilities; (b) with a numerical simplified fraction.'],
    hints: [r`Events: \(A\) “dice A is used” (\(P(A) = \frac{1}{3}\)), \(R_k\) “red at the \(k\)-th roll”. Given the dice, the rolls are independent: \(P(R_1 \cap \dots \cap R_n \mid A) = \left(\frac{2}{3}\right)^n\).`, r`Question 2: Bayes’ formula with the partition \(\{A, \overline{A}\}\).`, r`Question 3: \(P(R_3 \mid R_1 \cap R_2) = \frac{P(R_1 \cap R_2 \cap R_3)}{P(R_1 \cap R_2)}\), each term by the law of total probability.`],
    solution: [
      { t: 'Question 1', html: model(p(r`\(\{A, \overline{A}\}\) is a partition of \(\Omega\), with \(P(A) = \frac{1}{3}\), \(P(R_1 \mid A) = \frac{4}{6} = \frac{2}{3}\) and \(P(R_1 \mid \overline{A}) = \frac{2}{6} = \frac{1}{3}\). By the law of total probability:`) +
        fm(r`P(R_1) = P(R_1 \mid A)P(A) + P(R_1 \mid \overline{A})P(\overline{A}) = \frac{2}{3} \times \frac{1}{3} + \frac{1}{3} \times \frac{2}{3} = \frac{4}{9}.`)) },
      { t: 'Question 2', html: p(r`Let \(S_n = R_1 \cap \dots \cap R_n\). Given the dice, the rolls are independent: \(P(S_n \mid A) = \left(\frac{2}{3}\right)^n\) and \(P(S_n \mid \overline{A}) = \left(\frac{1}{3}\right)^n\).`) +
        fm(r`P(A \mid S_n) = \frac{P(S_n \mid A)P(A)}{P(S_n \mid A)P(A) + P(S_n \mid \overline{A})P(\overline{A})} = \frac{\frac{1}{3}\left(\frac{2}{3}\right)^n}{\frac{1}{3}\left(\frac{2}{3}\right)^n + \frac{2}{3}\left(\frac{1}{3}\right)^n} = \frac{2^n}{2^n + 2} = \frac{2^{n-1}}{2^{n-1} + 1}.`) +
        p(r`For \(n = 1\): \(\frac{1}{2}\); it tends to 1 as \(n\) grows: many reds, probably dice A.`) },
      { t: 'Question 3', html: fm(r`P(R_3 \mid S_2) = \frac{P(S_3)}{P(S_2)} = \frac{\frac{1}{3}\left(\frac{2}{3}\right)^3 + \frac{2}{3}\left(\frac{1}{3}\right)^3}{\frac{1}{3}\left(\frac{2}{3}\right)^2 + \frac{2}{3}\left(\frac{1}{3}\right)^2} = \frac{\frac{10}{81}}{\frac{6}{27}} = \frac{5}{9}.`) +
        p(r`\(\frac{5}{9} > \frac{4}{9}\): two reds make dice A more likely, hence a third red too. \(R_3\) and \(S_2\) are not independent.`) }],
    answer: p(r`\(\frac{4}{9}\); \(\frac{2^{n-1}}{2^{n-1} + 1}\); \(\frac{5}{9}\).`),
    traps: [r`Believing the rolls are independent (unconditionally) and answering \(\frac{4}{9}\) to question 3: they are only independent given the dice.`, r`Writing \(P(R_n \mid A)\) for \(\left(\frac{2}{3}\right)^n\): it is the probability of \(n\) reds, \(P(R_1 \cap \dots \cap R_n \mid A)\).`],
    note: NOTE_TD2
  };

  M['td2-3-12'] = {
    src: 'Tutorial 2 · Ex 3.12', title: 'ANAC points: neither sport nor communication',
    intro: p(r`In order to get ANAC points (they are required to validate the S2 semester), EPITA students have two possibilities: doing sport or getting involved in communication activities. It has been estimated that \(60\%\) out of the students get points with sport and \(50\%\) with communication activities. Furthermore, one third of the students doing sport also do communication activities.`) +
      p('Represent these data with a table. Determine the percentage of students who will have to repeat their S2 because they will have got no ANAC points.'),
    hints: [r`\(S\): sport, \(C\): communication activities. “One third of the students doing sport”: \(P(C \mid S) = \frac{1}{3}\).`, r`No points: \(\overline{S} \cap \overline{C} = \overline{S \cup C}\).`],
    solution: [{ t: 'Solution', html: model(p(r`Let \(S\): “the student does sport” and \(C\): “the student does communication activities”. \(P(S) = 0.6\), \(P(C) = 0.5\), \(P(C \mid S) = \frac{1}{3}\), so \(P(S \cap C) = P(C \mid S)P(S) = 0.2\).`) +
        fm(r`P(\overline{S} \cap \overline{C}) = 1 - P(S \cup C) = 1 - P(S) - P(C) + P(C \mid S)P(S) = 1 - 0.6 - 0.5 + 0.2 = \frac{1}{10}.`)) +
      tbl(['', r`\(C\)`, r`\(\overline{C}\)`, 'total'], [[r`\(S\)`, '20%', '40%', '60%'], [r`\(\overline{S}\)`, '30%', '10%', '40%'], ['total', '50%', '50%', '100%']], { th: true, w: 22 }) +
      tool('venn', { n: 2, names: ['S', 'C'], u: 'Ω', sizes: { S: 60, C: 50, SC: 20, E: 100 }, expr: "S' & C'", edit: false, title: 'Out of 100 students' }) }],
    answer: p(r`\(1 - P(S) - P(C) + P(C \mid S)P(S) = \frac{1}{10}\): \(10\%\) of the students.`),
    traps: [r`Taking \(P(S \cap C) = \frac{1}{3}\): one third <b>of the students doing sport</b> is \(P(C \mid S)\).`, r`Computing \(1 - 0.6 - 0.5 < 0\) without adding back the intersection.`],
    note: NOTE_TD2
  };

  M['td2-4-13'] = {
    src: 'Tutorial 2 · Ex 4.13', title: 'Expectation and variance; X = 2T − 6',
    questions: [r`Let \(X\) be a random variable taking a finite number of values. Remind how its expectation and variance are computed. Explain these notions. What formula do you remember about the expectation and variance of finite variables?`,
      r`We roll a fair dice. Let us define the random variables:<br>– \(T\), the number on the dice.<br>– \(X\), the double of the number on the dice, minus 6.<br>(a) Determine the distribution of \(T\). Deduce \(E(T)\) and \(V(T)\).<br>(b) What are the possible values for \(X\)? Determine a relation between variables \(X\) and \(T\).<br>(c) Deduce \(E(X)\) and \(V(X)\).`],
    hints: [r`\(E(X) = \sum_i x_i P(X = x_i)\); \(V(X) = E(X^2) - E(X)^2\).`, r`\(X = 2T - 6\): use \(E(aT + b) = aE(T) + b\) and \(V(aT + b) = a^2V(T)\).`],
    solution: [
      { t: 'Question 1', html: ul([r`If \(X(\Omega) = \{x_1, \dots, x_n\}\): \(E(X) = \sum_{i=1}^{n} x_i P(X = x_i)\), the mean of the values weighted by their probabilities (the average value over many repetitions).`,
        r`\(V(X) = E\left((X - E(X))^2\right) = \sum_{i=1}^{n} (x_i - E(X))^2 P(X = x_i)\): the mean of the squared deviations from the expectation, which measures the dispersion. The standard deviation is \(\sigma(X) = \sqrt{V(X)}\).`,
        r`Formulas: \(E(aX + b) = aE(X) + b\); \(E(X + Y) = E(X) + E(Y)\); \(V(X) = E(X^2) - E(X)^2\) (König–Huygens); \(V(aX + b) = a^2V(X)\); if \(X\) and \(Y\) are independent, \(V(X + Y) = V(X) + V(Y)\).`]) },
      { t: 'Question 2', html: model(p(r`(a) \(T(\Omega) = \ent{1}{6}\) and \(P(T = k) = \frac{1}{6}\) for all \(k\) (uniform distribution). \(E(T) = \frac{1}{6}(1 + 2 + \dots + 6) = \frac{21}{6} = \frac{7}{2}\).`) +
        p(r`\(E(T^2) = \frac{1}{6}(1 + 4 + 9 + 16 + 25 + 36) = \frac{91}{6}\), so \(V(T) = \frac{91}{6} - \frac{49}{4} = \frac{182 - 147}{12} = \frac{35}{12}\).`) +
        p(r`(b) \(X = 2T - 6\), so \(X(\Omega) = \{-4, -2, 0, 2, 4, 6\}\).`) +
        p(r`(c) \(E(X) = 2E(T) - 6 = 2 \times \frac{7}{2} - 6 = 1\) and \(V(X) = 2^2 V(T) = 4 \times \frac{35}{12} = \frac{35}{3}\).`)) +
        tool('law', { x: [1, 2, 3, 4, 5, 6], p: ['1/6', '1/6', '1/6', '1/6', '1/6', '1/6'], name: 'T', title: 'Distribution of T' }) }],
    answer: p(r`\(E(T) = \frac{7}{2}\), \(V(T) = \frac{35}{12}\); \(X = 2T - 6\), \(X(\Omega) = \{-4, -2, 0, 2, 4, 6\}\), \(E(X) = 1\), \(V(X) = \frac{35}{3}\).`),
    traps: [r`Writing \(E(X) = \frac{2}{7}\) or \(\frac{2 \times 7}{2} \times 6\): it is \(2 \times \frac{7}{2} - 6 = 1\).`, r`Keeping the \(-6\) in the variance: \(V(2T - 6) = 4V(T)\), the constant disappears.`, r`Computing \(V\) as \(E(X^2) + E(X)^2\).`],
    note: NOTE_TD2
  };

  M['td2-4-14'] = {
    src: 'Tutorial 2 · Ex 4.14', title: 'A box of coloured balls: number drawn and gain',
    intro: p('A box contains:') + ul(['four blue balls numbered 1 to 4,', 'three red balls numbered 1 to 3,', 'two green balls numbered 1 to 2.']) + p('You randomly pick one ball.'),
    questions: [r`Let \(X\) be the random variable \(X\) = "number of the ball". Find the distribution of \(X\), its expectation and its variance.`,
      r`Assume you play the following game: you randomly pick one ball.<br>– If the ball is blue and has an even number, you win 2 euros.<br>– If the ball is not blue and has an even number, you win 3 euros.<br>– Otherwise, you win nothing.<br>Let \(Y\) be your gain at the game.<br>(a) What is the distribution of \(Y\)?<br>(b) What is the probability that you win some money?`],
    hints: [r`9 equally likely balls. Number 1 is carried by 3 balls, number 4 by only one.`, r`Gain 2 €: blue 2 or blue 4. Gain 3 €: red 2 or green 2.`],
    solution: [{ t: 'Solution', html: tbl([r`\(k\)`, '1', '2', '3', '4'], [[r`\(P(X = k)\)`, r`\(\frac{3}{9} = \frac{1}{3}\)`, r`\(\frac{1}{3}\)`, r`\(\frac{2}{9}\)`, r`\(\frac{1}{9}\)`]], { th: true, w: 22 }) +
      model(p(r`\(E(X) = 1 \times \frac{3}{9} + 2 \times \frac{3}{9} + 3 \times \frac{2}{9} + 4 \times \frac{1}{9} = \frac{19}{9}\).`) + p(r`\(E(X^2) = 1 \times \frac{3}{9} + 4 \times \frac{3}{9} + 9 \times \frac{2}{9} + 16 \times \frac{1}{9} = \frac{49}{9}\), so \(V(X) = \frac{49}{9} - \left(\frac{19}{9}\right)^2 = \frac{441 - 361}{81} = \frac{80}{81}\).`)) +
      p(r`2. (a) \(Y(\Omega) = \{0, 2, 3\}\): \(P(Y = 2) = \frac{2}{9}\) (blue 2, blue 4), \(P(Y = 3) = \frac{2}{9}\) (red 2, green 2), \(P(Y = 0) = \frac{5}{9}\). (b) \(P(Y > 0) = \frac{4}{9}\).`) +
      tool('law', { x: [1, 2, 3, 4], p: ['1/3', '1/3', '2/9', '1/9'], name: 'X', title: 'Distribution of X' }) }],
    answer: p(r`\(X\): \(\frac{1}{3}, \frac{1}{3}, \frac{2}{9}, \frac{1}{9}\); \(E(X) = \frac{19}{9}\), \(V(X) = \frac{80}{81}\). \(Y\): \(P(Y = 0) = \frac{5}{9}\), \(P(Y = 2) = P(Y = 3) = \frac{2}{9}\); \(P(Y > 0) = \frac{4}{9}\).`),
    traps: [r`Taking \(X\) uniform on \(\ent{1}{4}\): the numbers are not carried by the same number of balls.`, r`Forgetting to check that the probabilities add up to 1.`],
    note: NOTE_TD2
  };

  /* the English sheet merges questions 2 to 4 */
  M['td2-4-15'] = {
    src: 'Tutorial 2 · Ex 4.15', title: 'Two draws without replacement and a score',
    intro: p('A box contains five balls, indistinguishable to the touch : there are 3 red balls and 2 white balls. We randomly draw 2 balls, successively and without replacement.') +
      p(r`If the first ball drawn is white, we win 1 point. Otherwise, this first ball does not score any points. If the second ball drawn is white, we win 2 points. Otherwise, this second ball does not score any points.`) +
      p(r`Let \(X\) be the random variable \(X\) = "total number of points scored".`) +
      p(r`Let \(B_1\) be the event "The first ball drawn is white", \(R_1\) the event "The first ball drawn is red", \(B_2\) "The second ball drawn is white" and \(R_2\) "The second ball drawn is red".`),
    questions: [r`Compute the probabilities \(P(B_1 \cap B_2)\), \(P(B_1 \cap R_2)\), \(P(R_1 \cap B_2)\) and \(P(R_1 \cap R_2)\).`, r`Deduce the distribution of \(X\), its expectation and its variance.`],
    hints: [r`\(P(B_1 \cap B_2) = P(B_1)P(B_2 \mid B_1)\): after a white ball, 1 white ball remains out of 4.`, r`\(X = 0\): \(R_1 \cap R_2\); \(X = 1\): \(B_1 \cap R_2\); \(X = 2\): \(R_1 \cap B_2\); \(X = 3\): \(B_1 \cap B_2\).`],
    solution: [{ t: 'Solution', html: model(p(r`1. \(P(B_1 \cap B_2) = P(B_1)P(B_2 \mid B_1) = \frac{2}{5} \times \frac{1}{4} = \frac{1}{10}\); \(P(B_1 \cap R_2) = \frac{2}{5} \times \frac{3}{4} = \frac{3}{10}\); \(P(R_1 \cap B_2) = \frac{3}{5} \times \frac{2}{4} = \frac{3}{10}\); \(P(R_1 \cap R_2) = \frac{3}{5} \times \frac{2}{4} = \frac{3}{10}\).`) +
        p(r`2. \(X(\Omega) = \{0, 1, 2, 3\}\), \(P(X = 0) = P(X = 1) = P(X = 2) = \frac{3}{10}\), \(P(X = 3) = \frac{1}{10}\) (sum 1).`) +
        p(r`\(E(X) = 0 \times \frac{3}{10} + 1 \times \frac{3}{10} + 2 \times \frac{3}{10} + 3 \times \frac{1}{10} = \frac{12}{10} = \frac{6}{5}\).`) +
        p(r`\(E(X^2) = \frac{0 + 3 + 12 + 9}{10} = \frac{12}{5}\), so \(V(X) = \frac{12}{5} - \frac{36}{25} = \frac{24}{25}\).`)) +
      tool('law', { x: [0, 1, 2, 3], p: ['3/10', '3/10', '3/10', '1/10'], name: 'X', title: 'Distribution of X' }) }],
    answer: p(r`\(\frac{1}{10}, \frac{3}{10}, \frac{3}{10}, \frac{3}{10}\); distribution \(\frac{3}{10}, \frac{3}{10}, \frac{3}{10}, \frac{1}{10}\) on \(\{0, 1, 2, 3\}\); \(E(X) = \frac{6}{5}\); \(V(X) = \frac{24}{25}\).`),
    traps: [r`Computing \(P(B_2) \times P(B_1)\) as if the draws were independent: without replacement, the content of the box changes.`],
    note: NOTE_TD2
  };

  M['td2-4-16'] = {
    src: 'Tutorial 2 · Ex 4.16', title: 'Number of hearts in a hand; Vandermonde’s formula',
    intro: p(r`<b><em>Homework: to be done by everyone</em></b>`) + p(r`From a 32-card deck, we randomly pick a 5-card hand. Let \(X\) be the number of hearts in the hand.`),
    questions: [r`What is \(X(\Omega)\), the set of possible values for \(X\)?`, r`Write the distribution of \(X\).`,
      r`Compute its expectation \(E(X)\). You may use the "Vandermonde formula": for all \((a, b, n) \in \N^3\) such that \(n \leq a + b\),` + fm(r`\sum_{k=0}^{n} \binom{a}{k} \binom{b}{n-k} = \binom{a+b}{n}`),
      r`<b><em>(Bonus)</em></b> Using a counting problem, prove the Vandermonde formula.`],
    hints: [r`8 hearts and 24 other cards. \(X = k\): \(k\) hearts among 8 and \(5 - k\) others among 24.`, r`For the expectation: \(k\binom{8}{k} = 8\binom{7}{k-1}\), then Vandermonde with \(a = 7\), \(b = 24\), \(n = 4\).`, r`Vandermonde: a box of \(a\) red and \(b\) green balls, draw \(n\); sort the draws by the number of red balls.`],
    solution: [
      { t: 'Questions 1 and 2: a hypergeometric distribution', html: p(r`1. \(X(\Omega) = \ent{0}{5}\) (there are 8 hearts, the hand can have 0 to 5).`) +
        p(r`2. The \(\binom{32}{5}\) hands are equally likely. A hand with \(k\) hearts: \(k\) hearts among 8, \(5 - k\) cards among the 24 others:`) + fm(r`P(X = k) = \frac{\binom{8}{k}\binom{24}{5-k}}{\binom{32}{5}}`) +
        tbl([r`\(k\)`, '0', '1', '2', '3', '4', '5'], [[r`\(P(X = k)\)`, r`\(\frac{759}{3{,}596}\)`, r`\(\frac{759}{1{,}798}\)`, r`\(\frac{253}{899}\)`, r`\(\frac{69}{899}\)`, r`\(\frac{15}{1{,}798}\)`, r`\(\frac{1}{3{,}596}\)`]], { th: true }) },
      { t: 'Question 3: the expectation', html: model(p(r`For \(k \geq 1\), \(k\binom{8}{k} = k \frac{8!}{k!(8 - k)!} = 8 \frac{7!}{(k - 1)!(8 - k)!} = 8\binom{7}{k-1}\). Hence`) +
        fm(r`E(X) = \sum_{k=1}^{5} k \frac{\binom{8}{k}\binom{24}{5-k}}{\binom{32}{5}} = \frac{8}{\binom{32}{5}} \sum_{j=0}^{4} \binom{7}{j}\binom{24}{4-j} = \frac{8\binom{31}{4}}{\binom{32}{5}} = 8 \times \frac{5}{32} = \frac{5}{4}`) +
        p(r`(Vandermonde with \(a = 7\), \(b = 24\), \(n = 4\), then \(\binom{32}{5} = \frac{32}{5}\binom{31}{4}\).)`)) +
        p(r`Interpretation: \(\frac{5}{4} = 5 \times \frac{8}{32}\), five cards, each a heart with probability \(\frac{1}{4}\).`) +
        tool('law', { x: [0, 1, 2, 3, 4, 5], p: ['759/3596', '759/1798', '253/899', '69/899', '15/1798', '1/3596'], name: 'X', title: 'Distribution of the number of hearts' }) },
      { t: 'Question 4: Vandermonde by double counting', html: model(p(r`A box contains \(a\) red balls and \(b\) green balls; we simultaneously draw \(n\) balls (\(n \leq a + b\)). There are \(\binom{a+b}{n}\) draws.`) +
        p(r`Sort them by the number \(k\) of red balls: \(k\) red among \(a\), \(n - k\) green among \(b\), that is \(\binom{a}{k}\binom{b}{n-k}\) draws (zero if \(k > a\) or \(n - k > b\)). These cases are disjoint and cover all the draws:`) +
        p(r`\(\sum_{k=0}^{n} \binom{a}{k}\binom{b}{n-k} = \binom{a+b}{n}\).`)) }],
    answer: p(r`\(X(\Omega) = \ent{0}{5}\), \(P(X = k) = \frac{\binom{8}{k}\binom{24}{5-k}}{\binom{32}{5}}\), \(E(X) = \frac{5}{4}\).`),
    traps: [r`Using a binomial distribution \(\mathcal{B}(5, \frac{1}{4})\): the cards are drawn without replacement (hypergeometric distribution). Same expectation, different distribution.`, r`Forgetting to say that the cases in Vandermonde’s proof are disjoint.`],
    note: NOTE_TD2
  };

  M['td2-4-17'] = {
    src: 'Tutorial 2 · Ex 4.17 (★)', title: 'Standardized variable',
    intro: p(r`In statistical analysis, a common way to preprocess the data consists in replacing the variables with their <b><em>standardized variables</em></b>. For examples, many machine learning algorithms work better when using standardized data.`) +
      '<div class="box def"><span class="tag">Definition 4.1</span>' + p(r`If \(X\) admits an expectation and a variance and if its variance is non-zero, then the standardized variable of \(X\) is the variable \(\overline{X} = \dfrac{X - E(X)}{\sigma_X}\).`) + '</div>' +
      p(r`Show that \(E(\overline{X}) = 0\) and \(V(\overline{X}) = 1\).`),
    hints: [r`\(\overline{X} = aX + b\) with \(a = \frac{1}{\sigma_X}\) and \(b = -\frac{E(X)}{\sigma_X}\).`, r`\(V(aX + b) = a^2V(X)\) and \(\sigma_X^2 = V(X)\).`],
    solution: [{ t: 'Model answer', html: model(p(r`\(\overline{X} = aX + b\) with \(a = \frac{1}{\sigma_X}\) and \(b = -\frac{E(X)}{\sigma_X}\) (\(\sigma_X \neq 0\) since \(V(X) \neq 0\)).`) +
      p(r`By linearity, \(E(\overline{X}) = aE(X) + b = \frac{E(X)}{\sigma_X} - \frac{E(X)}{\sigma_X} = 0\).`) + p(r`And \(V(\overline{X}) = a^2V(X) = \frac{V(X)}{\sigma_X^2} = \frac{V(X)}{V(X)} = 1\).`)) }],
    answer: p(r`\(E(\overline{X}) = \frac{E(X) - E(X)}{\sigma_X} = 0\) and \(V(\overline{X}) = \frac{V(X)}{\sigma_X^2} = 1\).`),
    traps: [r`Writing \(V(\overline{X}) = \frac{V(X)}{\sigma_X}\): the coefficient comes out squared.`],
    note: NOTE_TD2
  };

  M['td2-4-18'] = {
    src: 'Tutorial 2 · Ex 4.18', title: 'Queens and hearts: a 2-tuple of random variables',
    questions: [r`From a 32-card deck, we randomly pick one card. Let \(X\) and \(Y\) be the random variables \(X\) = «number of queens» and \(Y\) = «number of hearts».<br>a. Find the distributions of \(X\) and \(Y\).<br>b. Represent the distribution of the 2-tuple \((X, Y)\) with a table.<br>c. Show that \(X\) and \(Y\) are independent.`,
      r`Now, we pick two cards.<br>a. Find the distributions of \(X\) and \(Y\).<br>b. Represent the distribution of the 2-tuple \((X, Y)\) with a table.<br>c. Show that \(X\) and \(Y\) are not independent.`],
    hints: [r`Split the cards into four groups: the queen of hearts, the 3 other queens, the 7 other hearts, the 21 remaining cards.`, r`\(X\) and \(Y\) independent: \(P(X = i \cap Y = j) = P(X = i)P(Y = j)\) for <b>all</b> \(i, j\). To disprove it, one cell is enough.`],
    solution: [
      { t: 'One card', html: p(r`\(X\) is Bernoulli-distributed with the parameter \(\frac{1}{8}\) (4 queens out of 32) and \(Y\) with the parameter \(\frac{1}{4}\) (8 hearts).`) +
        tbl(['', r`\(Y = 0\)`, r`\(Y = 1\)`, r`distribution of \(X\)`], [[r`\(X = 0\)`, r`\(\frac{21}{32}\)`, r`\(\frac{7}{32}\)`, r`\(\frac{7}{8}\)`], [r`\(X = 1\)`, r`\(\frac{3}{32}\)`, r`\(\frac{1}{32}\)`, r`\(\frac{1}{8}\)`], [r`distribution of \(Y\)`, r`\(\frac{3}{4}\)`, r`\(\frac{1}{4}\)`, '1']], { th: true, w: 28 }) +
        p(r`Each cell is the product of the margins: \(\frac{1}{32} = \frac{1}{8} \times \frac{1}{4}\), \(\frac{3}{32} = \frac{1}{8} \times \frac{3}{4}\), \(\frac{7}{32} = \frac{7}{8} \times \frac{1}{4}\), \(\frac{21}{32} = \frac{7}{8} \times \frac{3}{4}\): \(X\) and \(Y\) are independent.`) },
      { t: 'Two cards', html: p(r`We pick a pair of cards: \(\binom{32}{2} = 496\) equally likely pairs. \(P(X = 0) = \frac{\binom{28}{2}}{496} = \frac{189}{248}\), \(P(X = 1) = \frac{4 \times 28}{496} = \frac{7}{31}\), \(P(X = 2) = \frac{6}{496} = \frac{3}{248}\); \(P(Y = 0) = \frac{\binom{24}{2}}{496} = \frac{69}{124}\), \(P(Y = 1) = \frac{8 \times 24}{496} = \frac{12}{31}\), \(P(Y = 2) = \frac{28}{496} = \frac{7}{124}\).`) +
        tbl(['(out of 496)', r`\(Y = 0\)`, r`\(Y = 1\)`, r`\(Y = 2\)`], [[r`\(X = 0\)`, '210', '147', '21'], [r`\(X = 1\)`, '63', '42', '7'], [r`\(X = 2\)`, '3', '3', '0']], { th: true, w: 24, cap: 'Numbers of pairs; divide by 496 for the probabilities. Example: (X, Y) = (1, 1) is the queen of hearts with one of the 21 cards “neither queen nor heart”, or another queen with another heart: 21 + 3 × 7 = 42.' }) +
        model(p(r`\(P(X = 2 \cap Y = 2) = 0\): two queens cannot be two hearts (there is only one queen of hearts).`) + p(r`But \(P(X = 2)P(Y = 2) = \frac{3}{248} \times \frac{7}{124} \neq 0\). So \(X\) and \(Y\) are not independent.`)) }],
    answer: p(r`One card: Bernoulli \(\frac{1}{8}\) and \(\frac{1}{4}\), independent. Two cards: \(X\): \(\frac{189}{248}, \frac{7}{31}, \frac{3}{248}\); \(Y\): \(\frac{69}{124}, \frac{12}{31}, \frac{7}{124}\); \(P(X = 2, Y = 2) = 0 \neq P(X = 2)P(Y = 2)\).`),
    traps: [r`Checking independence on a single cell: all cells are needed. Conversely, a single cell is enough to disprove it.`, r`Forgetting the queen of hearts, which is both a queen and a heart.`],
    note: NOTE_TD2
  };

  /* the English sheet: uniform distribution on ⟦0, n⟧ (French sheet: {1, …, n}) */
  M['td2-5-19'] = {
    src: 'Tutorial 2 · Ex 5.19', title: 'Uniform distribution: expectation and variance',
    intro: p(r`Let \(X\) be a uniform-distributed variable on \(\ent{0}{n}\).`),
    questions: ['Compute its expectation.', 'Find its variance.<br>N.B.: accept without proof the following properties: \\(\\displaystyle\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}\\) and \\(\\displaystyle\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}\\)'],
    hints: [r`\(\ent{0}{n}\) has \(n + 1\) elements: \(P(X = k) = \frac{1}{n + 1}\).`, r`\(V(X) = E(X^2) - E(X)^2\); the term \(k = 0\) adds nothing to the sums.`],
    solution: [{ t: 'Solution', html: model(p(r`\(X(\Omega) = \ent{0}{n}\), which has \(n + 1\) elements, and \(P(X = k) = \frac{1}{n + 1}\). So \(E(X) = \frac{1}{n + 1}\sum_{k=0}^{n} k = \frac{1}{n + 1} \times \frac{n(n + 1)}{2} = \frac{n}{2}\).`) +
      p(r`\(E(X^2) = \frac{1}{n + 1}\sum_{k=0}^{n} k^2 = \frac{n(2n + 1)}{6}\), so`) +
      fm(r`V(X) = \frac{n(2n + 1)}{6} - \frac{n^2}{4} = \frac{n\left[2(2n + 1) - 3n\right]}{12} = \frac{n(n + 2)}{12}.`)) +
      p(r`Check with \(n = 1\) (a fair coin with values 0 and 1): \(E = \frac{1}{2}\), \(V = \frac{1}{4}\).`) +
      note(r`The French sheet takes the uniform distribution on \(\{1, \dots, n\}\) (\(n\) values): the answers are then \(\frac{n + 1}{2}\) and \(\frac{n^2 - 1}{12}\).`) }],
    answer: p(r`\(E(X) = \frac{n}{2}\), \(V(X) = \frac{n(n + 2)}{12}\).`),
    traps: [r`Dividing by \(n\) instead of \(n + 1\): \(\ent{0}{n}\) has \(n + 1\) values.`, r`Writing \(E(X^2) = \left(\sum k \cdot \frac{1}{n + 1}\right)^2\): it is \(\sum k^2 \cdot \frac{1}{n + 1}\).`],
    note: NOTE_TD2
  };

  M['td2-5-20'] = {
    src: 'Tutorial 2 · Ex 5.20', title: 'Marking papers with a 20-sided dice',
    intro: p('An EPITA maths teacher has just collected the worksheets of his 40 students\' midterm exam. Now, he must read them and give a mark. Being lazy, he makes use of the best method for this work: rolling a 20-sided dice, each side being labeled 1 to 20.'),
    questions: [r`For each student \(i \in \ent{1}{40}\), the teacher rolls the dice. The result \(M_i\) is the mark that the student gets. What is the distribution of \(M_i\)? Its expectation? What is the probability that student \(i\) gets 10 or more?`,
      r`Let \(X\) be the number of students who get 10 or more. What is the distribution of \(X\)?`],
    hints: [r`Uniform distribution on \(\ent{1}{20}\); “10 or more”: 10, 11, …, 20.`, r`\(X\) counts the successes in 40 independent trials with the same probability.`],
    solution: [{ t: 'Solution', html: model(p(r`1. \(M_i\) is uniformly distributed on \(\ent{1}{20}\): \(P(M_i = k) = \frac{1}{20}\). \(E(M_i) = \frac{20 + 1}{2} = \frac{21}{2}\). \(P(M_i \geq 10) = \frac{11}{20}\) (the 11 values from 10 to 20).`) +
      p(r`2. For each student, “getting 10 or more” is a Bernoulli trial with the parameter \(\frac{11}{20}\); the 40 rolls are independent. \(X\) counts the successes of these 40 trials: \(X\) is binomial-distributed with parameters 40 and \(\frac{11}{20}\), and \(P(X = k) = \binom{40}{k}\left(\frac{11}{20}\right)^k\left(\frac{9}{20}\right)^{40-k}\) for \(k \in \ent{0}{40}\).`)) +
      p(r`By the way, \(E(X) = 40 \times \frac{11}{20} = 22\).`) }],
    answer: p(r`\(M_i\) uniform on \(\ent{1}{20}\), \(E = \frac{21}{2}\), \(P(M_i \geq 10) = \frac{11}{20}\); \(X \leadsto \mathcal{B}(40, \frac{11}{20})\).`),
    traps: [r`Answering \(P(M_i \geq 10) = \frac{1}{2}\): from 10 to 20 there are 11 values.`, r`Writing “\(\forall i \in \ent{1}{20}\)” for the students: there are 40 of them.`],
    note: NOTE_TD2
  };

  M['td2-5-21'] = {
    src: 'Tutorial 2 · Ex 5.21', title: 'Answering a 20-question MCQ at random',
    intro: p('A student is doing an exam made of MCQ questions. The exam has 20 questions, each question counts for 1 point. The total mark at the exam is hence a mark out of 20. The questions have neither negative nor intermediate points: at each question, the mark is 0 or 1, no other values are possible.') +
      p(r`The student did not prepare his exam and decides to answer randomly. His choices are independent and, at each question, he has a probability \(p = \frac{1}{3}\) of choosing the right answer.`),
    questions: [r`Let \(k \in \ent{1}{20}\) and consider the random variable \(X_k\) = "Mark of the student at question \(k\)".<br>(a) The value of \(k \in \ent{1}{20}\) being given, express the distribution of \(X_k\).<br>(b) Compute the expectation and the variance of \(X_k\). Write the details of your computations.`,
      r`Consider the random variable \(Y\) equal to the total mark of the student at the exam.<br>(a) Express \(Y\) as a function of the variables \(X_k\).<br>(b) Find \(P(Y = i)\) for all \(i \in \ent{0}{20}\). Justify your reasoning properly.<br>(c) Check that \(\displaystyle\sum_{i=0}^{20} P(Y = i) = 1\).<br>(d) Compute the expectation and the variance of \(Y\). Justify your computation.`],
    hints: [r`\(X_k(\Omega) = \{0, 1\}\): a Bernoulli distribution.`, r`\(Y = X_1 + \dots + X_{20}\), a sum of independent Bernoulli variables with the same parameter.`, r`(c): binomial formula with \(\frac{1}{3} + \frac{2}{3} = 1\).`],
    solution: [
      { t: 'Question 1', html: model(p(r`(a) \(X_k(\Omega) = \{0, 1\}\), \(P(X_k = 1) = \frac{1}{3}\) and \(P(X_k = 0) = \frac{2}{3}\): \(X_k\) is Bernoulli-distributed with the parameter \(\frac{1}{3}\).`) +
        p(r`(b) \(E(X_k) = 0 \times P(X_k = 0) + 1 \times P(X_k = 1) = \frac{1}{3}\); \(E(X_k^2) = 0^2 \times P(X_k = 0) + 1^2 \times P(X_k = 1) = \frac{1}{3}\);`) +
        p(r`\(V(X_k) = E(X_k^2) - E(X_k)^2 = \frac{1}{3} - \frac{1}{9} = \frac{2}{9}\).`)) },
      { t: 'Question 2', html: model(p(r`(a) \(Y = X_1 + X_2 + \dots + X_{20}\).`) +
        p(r`(b) \(Y\) is the sum of 20 Bernoulli variables with the same parameter \(\frac{1}{3}\), which are <b>independent</b> (the choices are): \(Y\) is binomial-distributed with parameters 20 and \(\frac{1}{3}\). For \(i \in \ent{0}{20}\):`) +
        fm(r`P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}`) +
        p(r`(choose the \(i\) right questions, \(\binom{20}{i}\) ways; each configuration has probability \(\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}\) by independence).`) +
        p(r`(c) By the binomial formula: \(\sum_{i=0}^{20} \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i} = \left(\frac{1}{3} + \frac{2}{3}\right)^{20} = 1\).`) +
        p(r`(d) By linearity, \(E(Y) = E(X_1) + \dots + E(X_{20}) = 20 \times \frac{1}{3} = \frac{20}{3}\). Since \(X_1, \dots, X_{20}\) are independent, \(V(Y) = V(X_1) + \dots + V(X_{20}) = 20 \times \frac{2}{9} = \frac{40}{9}\).`)) +
        tool('law', { law: 'binom', n: 20, p: '1/3', name: 'Y', edit: false, title: 'Distribution of Y: binomial (20, 1/3)' }) }],
    answer: p(r`\(X_k\): Bernoulli \(\left(\frac{1}{3}\right)\), \(E = \frac{1}{3}\), \(V = \frac{2}{9}\); \(Y = \sum X_k \leadsto \mathcal{B}(20, \frac{1}{3})\), \(P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}\); \(E(Y) = \frac{20}{3}\), \(V(Y) = \frac{40}{9}\).`),
    traps: [r`Writing \(P(Y = i)\) as a sum \(\sum \binom{20}{i} \dots\): it is <b>one</b> term.`, r`Not quoting independence for the binomial distribution and for \(V(Y)\).`, r`Giving \(E\) and \(V\) without the computations: the statement requires the details.`],
    note: NOTE_TD2 + ' This exercise came up word for word in the DP exam of October 2023 (exercise 6).'
  };

  M['td2-5-22'] = {
    src: 'Tutorial 2 · Ex 5.22', title: 'Reviewing two chapters out of three',
    intro: p(r`<b><em>Homework</em></b>`) + p(r`The program for a math exam consists of three chapters. However, the teacher feels lazy, he wants to enjoy the last sunny days before the fall. Hence, he decides to write only one exercise, covering one random chapter among the three.`) +
      p(r`One student is as lazy as the teacher; he also wants to enjoy the last sunny days. Therefore, he chooses to review only two chapters among the three.`) +
      p(r`If the chapter that is covered by the exam is, fortunately, one of the two that the student has reviewed, then his probability of validating the semester is \(80\%\). Otherwise, this probability is only \(20\%\).`),
    questions: ['Represent this problem graphically.', 'What is the probability that the student validates the semester?', 'Two weeks later, the marks are known and the student has validated the semester. What is the probability that he had reviewed the chapter covered by the exam exercise?', r`Suppose now that the 40 students from the class choose this method for reviewing their exam. Let \(X\) be the number of students validating the semester. What is the distribution of \(X\)? Determine its expectation.`],
    hints: [r`\(R\): “the exam covers a reviewed chapter”, \(P(R) = \frac{2}{3}\); \(V\): “the student validates”.`, r`Question 3: \(P(R \mid V)\), Bayes’ formula.`],
    solution: [{ t: 'Solution', html: tool('tree', { first: [{ n: 'R', p: '2/3' }, { n: '\\overline{R}', p: '1/3' }], second: { n: 'V', nb: '\\overline{V}', p: ['4/5', '1/5'] }, edit: false, title: 'Reviewed chapter, then validation' }) +
      model(p(r`2. \(\{R, \overline{R}\}\) is a partition: \(P(V) = P(V \mid R)P(R) + P(V \mid \overline{R})P(\overline{R}) = \frac{4}{5} \times \frac{2}{3} + \frac{1}{5} \times \frac{1}{3} = \frac{9}{15} = \frac{3}{5}\).`) +
        p(r`3. \(P(R \mid V) = \dfrac{P(V \mid R)P(R)}{P(V)} = \dfrac{8/15}{3/5} = \dfrac{8}{9}\).`) +
        p(r`4. Assuming the 40 students independent, each one validates with probability \(\frac{3}{5}\): \(X\) is binomial-distributed with parameters 40 and \(\frac{3}{5}\), and \(E(X) = 40 \times \frac{3}{5} = 24\).`)) +
      note(r`Modelling: if all the students sit the <b>same</b> exam, the chapter drawn is common to all; the results are only independent given the chapter. The exact distribution is then a mixture: \(\mathcal{B}(40, 0.8)\) with probability \(\frac{2}{3}\), \(\mathcal{B}(40, 0.2)\) with probability \(\frac{1}{3}\). The expectation is still 24, the distribution is not binomial. The answer expected in the tutorial is \(\mathcal{B}(40, \frac{3}{5})\).`) }],
    answer: p(r`\(P(V) = \frac{3}{5}\); \(P(R \mid V) = \frac{8}{9}\); \(X \leadsto \mathcal{B}(40, \frac{3}{5})\), \(E(X) = 24\).`),
    traps: [r`Mixing up \(P(V \mid R) = \frac{4}{5}\) and \(P(R \mid V) = \frac{8}{9}\).`],
    note: NOTE_TD2
  };

  M['td2-5-23'] = {
    src: 'Tutorial 2 · Ex 5.23 (★)', title: 'Binomial or hypergeometric: families and a sample',
    questions: [r`In the Paris area, at each birth, the probability of having a boy is \(46\%\). For a family of 5 children, determine the probability of having 2 boys and 3 girls.`,
      'Consider now a sample of 100 children, 46 of them being boys, 54 being girls. We randomly select 5 children. What is the probability of getting 2 boys and 3 girls?',
      'Explain why these two questions lead to different models and results.'],
    hints: [r`1: 5 independent births with the same probability: binomial distribution \(\mathcal{B}(5, 0.46)\).`, r`2: choose 5 children among 100 without replacement: \(\frac{\binom{46}{2}\binom{54}{3}}{\binom{100}{5}}\).`],
    solution: [{ t: 'Solution', html: model(p(r`1. The number \(G\) of boys is binomial-distributed with parameters 5 and 0.46 (independent births): \(P(G = 2) = \binom{5}{2}\, 0.46^2 \times 0.54^3 \approx 0.333\).`) +
        p(r`2. The \(\binom{100}{5}\) groups of 5 children are equally likely; those with 2 boys and 3 girls: \(\binom{46}{2}\binom{54}{3}\). Probability \(\dfrac{\binom{46}{2}\binom{54}{3}}{\binom{100}{5}} \approx 0.341\) (hypergeometric distribution).`)) +
      p(r`3. In 1, each birth is an independent trial with a fixed probability (like drawing <b>with</b> replacement): binomial distribution. In 2, we draw <b>without</b> replacement from a finite population: after a boy, fewer boys remain, the draws are not independent: hypergeometric distribution. The results are close because 5 is small compared with 100.`) }],
    answer: p(r`\(\binom{5}{2}0.46^2 \, 0.54^3 \approx 0.333\); \(\frac{\binom{46}{2}\binom{54}{3}}{\binom{100}{5}} \approx 0.341\); with / without replacement.`),
    traps: [r`Forgetting the coefficient \(\binom{5}{2}\) (the ranks of the two boys among the five children).`],
    note: NOTE_TD2
  };

  /* ===================== Sheet “Probability Exercises” (official English text) ===================== */
  M['tdx-proba-1'] = {
    src: 'Sheet “Probability Exercises” · Ex 1', title: 'One dice: even, at least 4',
    intro: p('A fair 6-sided die is rolled once.'),
    questions: ['What is the probability of getting an even number?', 'What is the probability of getting a number greater than or equal to 4?'],
    hints: [r`\(\Omega = \ent{1}{6}\), equally likely outcomes: count the positive cases.`],
    solution: [{ t: 'Solution', html: model(p(r`\(\Omega = \ent{1}{6}\) with equiprobability. a) \(\{2, 4, 6\}\): \(P = \frac{3}{6} = \frac{1}{2}\). b) \(\{4, 5, 6\}\): \(P = \frac{3}{6} = \frac{1}{2}\).`)) }],
    answer: p(r`\(\frac{1}{2}\) and \(\frac{1}{2}\).`),
    traps: [r`Forgetting 4 in “greater than or equal to 4”.`],
    note: NOTE_X
  };

  M['tdx-proba-2'] = {
    src: 'Sheet “Probability Exercises” · Ex 2', title: 'Two dice: sum equal to 7',
    intro: p('Two fair dice are rolled. What is the probability that the sum of the two dice equals 7?'),
    hints: [r`36 equally likely 2-tuples; list those with sum 7.`],
    solution: [{ t: 'Solution', html: model(p(r`\(\Omega = \ent{1}{6}^2\), 36 equally likely 2-tuples. Sum 7: \((1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)\), that is 6 2-tuples. \(P = \frac{6}{36} = \frac{1}{6}\).`)) }],
    answer: p(r`\(\frac{1}{6}\).`),
    traps: [r`Counting \(\{3, 4\}\) only once: \((3, 4)\) and \((4, 3)\) are two different outcomes.`],
    note: NOTE_X
  };

  M['tdx-proba-3'] = {
    src: 'Sheet “Probability Exercises” · Ex 3', title: 'One card from a 52-card deck',
    intro: p('A standard deck of 52 cards has 4 suits of 13 cards each. A card is drawn at random.'),
    questions: ['What is the probability that it is a heart?', 'What is the probability that it is a king?', 'What is the probability that it is the king of hearts?'],
    hints: [r`13 hearts, 4 kings, a single king of hearts.`],
    solution: [{ t: 'Solution', html: p(r`52 equally likely cards. a) \(\frac{13}{52} = \frac{1}{4}\). b) \(\frac{4}{52} = \frac{1}{13}\). c) \(\frac{1}{52}\). Note that \(\frac{1}{52} = \frac{1}{4} \times \frac{1}{13}\): “heart” and “king” are independent.`) }],
    answer: p(r`\(\frac{1}{4}\); \(\frac{1}{13}\); \(\frac{1}{52}\).`),
    traps: [r`Adding “heart” and “king” for “king of hearts”: it is the intersection, not the union.`],
    note: NOTE_X
  };

  M['tdx-proba-4'] = {
    src: 'Sheet “Probability Exercises” · Ex 4', title: 'Two red balls without replacement',
    intro: p('An urn contains 5 red balls and 3 blue balls. Two balls are drawn <b>without replacement</b>. What is the probability that both balls are red?'),
    hints: [r`\(P(R_1 \cap R_2) = P(R_1)P(R_2 \mid R_1)\).`, r`Or: \(\binom{5}{2}\) red pairs out of \(\binom{8}{2}\) pairs.`],
    solution: [{ t: 'Solution', html: model(p(r`\(P(R_1 \cap R_2) = P(R_1)P(R_2 \mid R_1) = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56} = \frac{5}{14}\).`) + p(r`Check with pairs: \(\frac{\binom{5}{2}}{\binom{8}{2}} = \frac{10}{28} = \frac{5}{14}\).`)) }],
    answer: p(r`\(\frac{5}{14} \approx 0.357\).`),
    traps: [r`Computing \(\left(\frac{5}{8}\right)^2\): that would be with replacement.`],
    note: NOTE_X
  };

  M['tdx-proba-5'] = {
    src: 'Sheet “Probability Exercises” · Ex 5', title: 'At least one 6 in four rolls',
    intro: p('A die is rolled 4 times. What is the probability of getting <b>at least one</b> 6?'),
    hints: [r`Complement: no 6, probability \(\frac{5}{6}\) at each roll, independent rolls.`],
    solution: [{ t: 'Solution', html: model(p(r`The complement “no 6” has probability \(\left(\frac{5}{6}\right)^4 = \frac{625}{1{,}296}\) (independent rolls). So \(P(\text{at least one } 6) = 1 - \frac{625}{1{,}296} = \frac{671}{1{,}296} \approx 0.518\).`)) }],
    answer: p(r`\(\frac{671}{1{,}296} \approx 0.518\).`),
    traps: [r`Answering \(4 \times \frac{1}{6} = \frac{2}{3}\): outcomes with several 6s are counted several times (with 7 rolls you would exceed 1).`],
    note: NOTE_X
  };

  M['tdx-proba-6'] = {
    src: 'Sheet “Probability Exercises” · Ex 6', title: 'Three balls at once: red and green',
    intro: p('An urn contains 12 balls: 7 red and 5 green. Three balls are drawn <b>simultaneously</b> at random.'),
    questions: ['What is the probability that all 3 balls are red?', 'What is the probability that exactly 2 balls are red (and 1 is green)?', 'What is the probability that at least one ball is green?'],
    hints: [r`\(\mathrm{Card}\,\Omega = \binom{12}{3} = 220\).`, r`“At least one green” is the complement of “three red”.`],
    solution: [{ t: 'Solution', html: p(r`The \(\binom{12}{3} = 220\) draws are equally likely.`) + ol([r`\(\frac{\binom{7}{3}}{220} = \frac{35}{220} = \frac{7}{44}\).`, r`\(\frac{\binom{7}{2}\binom{5}{1}}{220} = \frac{105}{220} = \frac{21}{44}\).`, r`\(1 - \frac{7}{44} = \frac{37}{44}\).`]) }],
    answer: p(r`\(\frac{7}{44}\); \(\frac{21}{44}\); \(\frac{37}{44}\).`),
    traps: [r`Forgetting the factor \(\binom{5}{1}\) for the green ball in b).`],
    note: NOTE_X
  };

  M['tdx-proba-7'] = {
    src: 'Sheet “Probability Exercises” · Ex 7', title: 'A committee of 4 students',
    intro: p('A class has 15 students: 9 boys and 6 girls. A committee of 4 students is chosen <b>simultaneously</b> at random.'),
    questions: ['What is the probability that the committee has exactly 2 boys and 2 girls?', 'What is the probability that the committee consists only of girls?', 'What is the probability that the committee has at least 1 boy?'],
    hints: [r`\(\mathrm{Card}\,\Omega = \binom{15}{4} = 1{,}365\).`, r`“At least one boy”: complement of “only girls”.`],
    solution: [{ t: 'Solution', html: p(r`The \(\binom{15}{4} = 1{,}365\) committees are equally likely.`) + ol([r`\(\frac{\binom{9}{2}\binom{6}{2}}{1{,}365} = \frac{36 \times 15}{1{,}365} = \frac{540}{1{,}365} = \frac{36}{91}\).`, r`\(\frac{\binom{6}{4}}{1{,}365} = \frac{15}{1{,}365} = \frac{1}{91}\).`, r`\(1 - \frac{1}{91} = \frac{90}{91}\).`]) }],
    answer: p(r`\(\frac{36}{91}\); \(\frac{1}{91}\); \(\frac{90}{91}\).`),
    traps: [r`Ordering the committee members: it is chosen simultaneously, these are combinations.`],
    note: NOTE_X
  };

  /* ===================== Sheet “Conditional Probability: Exercises” (official English text) ===================== */
  M['tdx-cond-1'] = {
    src: 'Sheet “Conditional Probability” · Ex 1', title: 'Two dice: independent or not?',
    intro: p(r`<em>Part A: Independence. (Two dice)</em> Roll two fair dice. Let \(A\) = "the first die is even", \(B\) = "the sum is 7", \(C\) = "the sum is 8".`),
    questions: [r`Describe \(\Omega\) and its cardinality.`, r`Prove that \(A\) and \(B\) are independent.`, r`Show that \(A\) and \(C\) are <em>not</em> independent.`],
    hints: [r`List \(A \cap B\) and \(A \cap C\).`, r`Compare \(P(A \cap B)\) and \(P(A)P(B)\).`],
    solution: [{ t: 'Solution', html: model(p(r`1. \(\Omega = \ent{1}{6}^2\), \(\mathrm{Card}\,\Omega = 36\), with equiprobability.`) +
      p(r`2. \(P(A) = \frac{18}{36} = \frac{1}{2}\), \(P(B) = \frac{6}{36} = \frac{1}{6}\). \(A \cap B = \{(2, 5), (4, 3), (6, 1)\}\), so \(P(A \cap B) = \frac{3}{36} = \frac{1}{12} = \frac{1}{2} \times \frac{1}{6}\): \(A\) and \(B\) are independent.`) +
      p(r`3. \(C = \{(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)\}\), \(P(C) = \frac{5}{36}\). \(A \cap C = \{(2, 6), (4, 4), (6, 2)\}\), \(P(A \cap C) = \frac{3}{36} = \frac{1}{12}\), while \(P(A)P(C) = \frac{5}{72}\): not independent.`)) }],
    answer: p(r`36 outcomes; \(P(A \cap B) = \frac{1}{12} = P(A)P(B)\); \(P(A \cap C) = \frac{1}{12} \neq \frac{5}{72} = P(A)P(C)\).`),
    traps: [r`Believing that two events “with no obvious link” are always independent: check by computation.`],
    note: NOTE_X
  };

  M['tdx-cond-2'] = {
    src: 'Sheet “Conditional Probability” · Ex 2', title: 'Independence and complements; pairwise versus mutual',
    intro: p('<em>(Theory)</em>'),
    questions: [r`Prove that if \(A\) and \(B\) are independent, then \(A\) and \(B^c\) are independent. Deduce that \(A^c\) and \(B^c\) are independent.`,
      r`Toss a fair coin twice. Let \(A\) = "first toss is heads", \(B\) = "second toss is heads", \(C\) = "both tosses give the same result". Show that \(A, B, C\) are pairwise independent but <em>not</em> mutually independent.`],
    hints: [r`\(A = (A \cap B) \sqcup (A \cap B^c)\).`, r`Mutually: you also need \(P(A \cap B \cap C) = P(A)P(B)P(C)\).`],
    solution: [{ t: 'Solution', html: model(p(r`1. \(A = (A \cap B) \sqcup (A \cap B^c)\), so \(P(A \cap B^c) = P(A) - P(A \cap B) = P(A) - P(A)P(B) = P(A)(1 - P(B)) = P(A)P(B^c)\): \(A\) and \(B^c\) are independent.`) +
      p(r`Applying this result to the pair \((B^c, A)\) (independent), we get that \(B^c\) and \(A^c\) are independent.`)) +
      p(r`2. \(\Omega = \{HH, HT, TH, TT\}\), equally likely. \(P(A) = P(B) = P(C) = \frac{1}{2}\); \(A \cap B = A \cap C = B \cap C = \{HH\}\), of probability \(\frac{1}{4} = \frac{1}{2} \times \frac{1}{2}\): pairwise independent. But \(A \cap B \cap C = \{HH\}\): \(P = \frac{1}{4} \neq \frac{1}{8} = P(A)P(B)P(C)\). Not mutually independent.`) }],
    answer: p(r`\(P(A \cap B^c) = P(A)P(B^c)\); \(P(A \cap B \cap C) = \frac{1}{4} \neq \frac{1}{8}\).`),
    traps: [r`Believing that “pairwise independent” is enough for mutual independence.`],
    note: NOTE_X
  };

  M['tdx-cond-3'] = {
    src: 'Sheet “Conditional Probability” · Ex 3', title: 'Alice and Bob in a row',
    intro: p(r`<em>(Seating)</em> \(n\) people (\(n \geq 3\)), including Alice and Bob, sit in a row uniformly at random. Let \(A\) = "Alice and Bob are adjacent", \(B\) = "Alice is at one end of the row".`),
    questions: [r`Compute \(\mathbb{P}(A)\), \(\mathbb{P}(B)\) and \(\mathbb{P}(A \cap B)\) in terms of \(n\).`, r`Are \(A\) and \(B\) independent? Treat \(n = 8\) first, then general \(n\).`],
    hints: [r`\(\Omega\) = the \(n!\) seatings, equally likely.`, r`\(A\): glue Alice and Bob into one block (\(n - 1\) objects to order, and 2 orders inside the block).`, r`\(A \cap B\): Alice at one end (2 choices), Bob next to her, the \(n - 2\) others in any order.`],
    solution: [{ t: 'Solution', html: model(p(r`1. \(\mathrm{Card}\,\Omega = n!\). \(A\): order the block “Alice-Bob” and the \(n - 2\) others, \((n - 1)!\) ways, and 2 orders inside the block: \(P(A) = \frac{2(n - 1)!}{n!} = \frac{2}{n}\).`) +
      p(r`\(B\): 2 places for Alice, \((n - 1)!\) for the others: \(P(B) = \frac{2}{n}\). \(A \cap B\): 2 places for Alice, Bob next to her (1 place), \((n - 2)!\): \(P(A \cap B) = \frac{2(n - 2)!}{n!} = \frac{2}{n(n - 1)}\).`) +
      p(r`2. For \(n = 8\): \(P(A) = P(B) = \frac{1}{4}\), \(P(A \cap B) = \frac{1}{28} \neq \frac{1}{16}\): not independent.`) +
      p(r`In general, \(\frac{2}{n(n - 1)} = \frac{4}{n^2} \iff 2n = 4(n - 1) \iff n = 2\). For \(n \geq 3\), \(A\) and \(B\) are never independent.`)) +
      p(r`Intuition: at an end, Alice has only one neighbour instead of two, which makes “adjacent” less likely: \(P(A \mid B) = \frac{1}{n - 1} < \frac{2}{n}\).`) }],
    answer: p(r`\(P(A) = P(B) = \frac{2}{n}\), \(P(A \cap B) = \frac{2}{n(n - 1)}\); never independent for \(n \geq 3\) (\(n = 8\): \(\frac{1}{28} \neq \frac{1}{16}\)).`),
    traps: [r`Forgetting the factor 2 (Alice on the left or on the right of Bob) in \(P(A)\).`],
    note: NOTE_X
  };

  M['tdx-cond-4'] = {
    src: 'Sheet “Conditional Probability” · Ex 4', title: 'Two cards without replacement: two hearts',
    intro: p(r`<em>Part B: Conditioning and combinatorics. (Cards without replacement)</em> Draw 2 cards successively, without replacement, from a standard 52-card deck. Let \(A\) = "the first card is a heart", \(B\) = "the second card is a heart".`),
    questions: [r`Compute \(\mathbb{P}(B \mid A)\) and \(\mathbb{P}(B)\). Are \(A\) and \(B\) independent?`, 'What changes if the first card is put back before the second draw?'],
    hints: [r`Given \(A\), 12 hearts remain out of 51 cards.`, r`\(P(B)\) by the law of total probability on \(\{A, \overline{A}\}\).`],
    solution: [{ t: 'Solution', html: model(p(r`1. \(P(B \mid A) = \frac{12}{51} = \frac{4}{17}\). By the law of total probability: \(P(B) = P(B \mid A)P(A) + P(B \mid \overline{A})P(\overline{A}) = \frac{12}{51} \times \frac{13}{52} + \frac{13}{51} \times \frac{39}{52} = \frac{663}{2{,}652} = \frac{1}{4}\).`) +
      p(r`\(P(B \mid A) = \frac{4}{17} \neq \frac{1}{4} = P(B)\): \(A\) and \(B\) are not independent.`)) +
      p(r`2. With replacement, the second card is drawn from the full deck: \(P(B \mid A) = \frac{13}{52} = \frac{1}{4} = P(B)\), \(A\) and \(B\) are independent.`) +
      p(r`To remember: without replacement, \(P(B) = \frac{1}{4}\) anyway (by symmetry, the second card has the same distribution as the first one).`) }],
    answer: p(r`\(P(B \mid A) = \frac{4}{17}\), \(P(B) = \frac{1}{4}\): not independent; with replacement, independent.`),
    traps: [r`Believing that \(P(B)\) changes without replacement: \(P(B \mid A)\) changes, not \(P(B)\).`],
    note: NOTE_X
  };

  M['tdx-cond-5'] = {
    src: 'Sheet “Conditional Probability” · Ex 5', title: 'Three machines and defective parts',
    intro: p(r`<em>Part C: Partitions and the law of total probability. (Factory)</em> Three machines \(M_1, M_2, M_3\) produce \(50\%\), \(30\%\) and \(20\%\) of the parts of a factory. Their defect rates are \(1\%\), \(2\%\) and \(3\%\).`),
    questions: ['Compute the probability that a randomly chosen part is defective.', 'The part is defective. Find the probability that it was made by each machine.'],
    hints: [r`\(1\% = 0.01\).`, r`\(\{M_1, M_2, M_3\}\) is a partition; \(P(M_i \mid D) = \frac{P(D \mid M_i)P(M_i)}{P(D)}\).`],
    solution: [{ t: 'Solution', html: tool('tree', { first: [{ n: 'M_1', p: '1/2' }, { n: 'M_2', p: '3/10' }, { n: 'M_3', p: '1/5' }], second: { n: 'D', nb: '\\overline{D}', p: ['1/100', '1/50', '3/100'] }, edit: false, title: 'Machine, then defect' }) +
      model(p(r`1. \(\{M_1, M_2, M_3\}\) is a partition of \(\Omega\): \(P(D) = 0.5 \times 0.01 + 0.3 \times 0.02 + 0.2 \times 0.03 = 0.005 + 0.006 + 0.006 = 0.017 = \frac{17}{1{,}000}\).`) +
        p(r`2. \(P(M_1 \mid D) = \frac{0.005}{0.017} = \frac{5}{17}\), \(P(M_2 \mid D) = \frac{0.006}{0.017} = \frac{6}{17}\), \(P(M_3 \mid D) = \frac{6}{17}\) (sum 1).`)) }],
    answer: p(r`\(P(D) = 0.017\); \(\frac{5}{17}\), \(\frac{6}{17}\), \(\frac{6}{17}\).`),
    traps: [r`Writing \(1\% = 0.1\): you get \(P(D) = 0.17\), ten times too big. The conditional probabilities remain right because the error cancels out, which hides it.`],
    note: NOTE_X
  };

  M['tdx-cond-6'] = {
    src: 'Sheet “Conditional Probability” · Ex 6', title: 'Two urns and a die',
    intro: p(r`<em>(Two urns)</em> Urn \(U_1\) contains 4 red and 6 blue balls. Urn \(U_2\) contains 7 red and 3 blue balls. A fair die is rolled: if the result is 1 or 2, choose \(U_1\), otherwise choose \(U_2\). Then 3 balls are drawn <em>simultaneously</em> from the chosen urn.`),
    questions: [r`Using the partition \(\{U_1, U_2\}\), compute the probability of drawing exactly 2 red balls.`, r`Given that exactly 2 red balls were drawn, what is the probability that they came from \(U_1\)?`],
    hints: [r`\(P(U_1) = \frac{1}{3}\). In an urn of 10 balls, \(\binom{10}{3} = 120\) draws.`, r`\(P(E \mid U_1) = \frac{\binom{4}{2}\binom{6}{1}}{120}\).`],
    solution: [{ t: 'Solution', html: model(p(r`Let \(E\): “exactly 2 red balls”. \(P(U_1) = \frac{2}{6} = \frac{1}{3}\), \(P(U_2) = \frac{2}{3}\).`) +
      p(r`\(P(E \mid U_1) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{36}{120} = \frac{3}{10}\) and \(P(E \mid U_2) = \frac{\binom{7}{2}\binom{3}{1}}{\binom{10}{3}} = \frac{63}{120} = \frac{21}{40}\).`) +
      p(r`1. \(P(E) = \frac{3}{10} \times \frac{1}{3} + \frac{21}{40} \times \frac{2}{3} = \frac{1}{10} + \frac{7}{20} = \frac{9}{20}\).`) +
      p(r`2. \(P(U_1 \mid E) = \dfrac{P(E \mid U_1)P(U_1)}{P(E)} = \dfrac{1/10}{9/20} = \dfrac{2}{9}\).`)) +
      tool('tree', { first: [{ n: 'U_1', p: '1/3' }, { n: 'U_2', p: '2/3' }], second: { n: 'E', nb: '\\overline{E}', p: ['3/10', '21/40'] }, edit: false, title: 'Urn, then exactly 2 red balls' }) }],
    answer: p(r`\(P(E) = \frac{9}{20}\); \(P(U_1 \mid E) = \frac{2}{9}\).`),
    traps: [r`Taking \(P(U_1) = \frac{1}{2}\): the die gives \(U_1\) with probability \(\frac{2}{6}\).`],
    note: NOTE_X
  };

  M['tdx-cond-7'] = {
    src: 'Sheet “Conditional Probability” · Ex 7', title: 'A medical test and a rare disease',
    intro: p(r`<em>Part D: Bayes' formula. (Medical test)</em> A disease affects \(1\%\) of a population. A test is positive for \(95\%\) of sick people and for \(10\%\) of healthy people.`),
    questions: ['Compute the probability that a random person tests positive.', 'A person tests positive. What is the probability that they are sick? Comment on the result.'],
    hints: [r`\(M\): sick, \(T\): positive test. \(P(M) = 0.01\), \(P(T \mid M) = 0.95\), \(P(T \mid \overline{M}) = 0.1\).`],
    solution: [{ t: 'Solution', html: tool('tree', { first: [{ n: 'M', p: '1/100' }, { n: '\\overline{M}', p: '99/100' }], second: { n: 'T', nb: '\\overline{T}', p: ['19/20', '1/10'] }, edit: false, title: 'Sick, then test' }) +
      model(p(r`1. \(\{M, \overline{M}\}\) is a partition: \(P(T) = 0.95 \times 0.01 + 0.1 \times 0.99 = 0.0095 + 0.099 = 0.1085 = \frac{217}{2{,}000}\).`) +
        p(r`2. \(P(M \mid T) = \dfrac{P(T \mid M)P(M)}{P(T)} = \dfrac{0.0095}{0.1085} = \dfrac{19}{217} \approx 0.088\).`)) +
      p(r`Fewer than 9% of the positive people are sick: the disease is rare, and the \(10\%\) of false positives apply to \(99\%\) of the population. A positive test must be confirmed.`) }],
    answer: p(r`\(P(T) = \frac{217}{2{,}000} = 0.1085\); \(P(M \mid T) = \frac{19}{217} \approx 8.8\%\).`),
    traps: [r`Answering \(95\%\) to question 2: it is \(P(T \mid M)\), not \(P(M \mid T)\).`],
    note: NOTE_X
  };

  /* ---------- application : questions en bloc, formules sûres (comme le fichier français) ---------- */
  Object.keys(M).forEach(function (k) {
    if (M[k].questions) M[k].questions = M[k].questions.map(T.wrapQ);
    M[k] = T.fmt(M[k]);
  });
  REV.i18n.patch(window.MATHS_EX, M);
})();
