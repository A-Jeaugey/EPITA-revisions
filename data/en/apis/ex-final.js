/* English text for data/apis/ex-final.js (merged over the French cards by id, field by field).
   Same helpers as the French file (p, model, tbl) so the HTML keeps the same structure.
   Vocabulary of apis/cours-5-convergence.en.html, cours-6-recurrentes.en.html and cours-7-landau.en.html: monotone convergence
   theorem, adjacent sequences, subsequence, recursive sequence, fixed point, stable interval, Heron’s method, negligible /
   dominated / equivalent, Landau comparison symbols, comparative growth, squeeze theorem, converse, contrapositive,
   triangle inequality, by induction, by contradiction. Decimal point. */
(function () {
  var R = window.REV;
  var r = String.raw;
  function p(s) { return '<p>' + s + '</p>'; }
  function model(html, tag) { return '<div class="model"><span class="tag">' + (tag || 'Model answer') + '</span>' + html + '</div>'; }
  function tbl(head, rows, cap) {
    return '<div class="tbl"><table>' + (cap ? '<caption>' + cap + '</caption>' : '') + '<thead><tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (rr) { return '<tr>' + rr.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  var NOCOR = 'Tutorial published without an answer key: the solution was written for the site and the results were recomputed by program.';
  var OFF24 = 'Follows the official answer key of the exam.';
  var NO25 = 'Paper with no published answer key: the solution was written for the site and the results were recomputed by program.';
  var T = {

    /* ================================================================== Moodle 3.4 */
    'mo-34-1': { src: 'Moodle · Convergence theorems · ex. 1', title: 'Increasing and bounded above: it converges',
      intro: r`Show that the sequence defined by \(u_0 = 0\) and \(\forall n \in \N,\ u_{n+1} = \dfrac{1 + u_n^2}{3}\) converges.`,
      hints: [r`Compute \(u_1\) and \(u_2\): the sequence seems to be increasing. Prove it by induction.`, r`Look for a simple upper bound, also by induction: 1 works.`],
      solution: [
        { t: 'Increasing', html: p(r`\(u_1 = \frac{1}{3}\), \(u_2 = \frac{10}{27}\). All the terms are defined and positive. By induction on “\(u_n \lt u_{n+1}\)”: \(u_0 \lt u_1\); if \(u_n \lt u_{n+1}\), then \(u_n^2 \lt u_{n+1}^2\) (positive terms), hence \(\dfrac{1 + u_n^2}{3} \lt \dfrac{1 + u_{n+1}^2}{3}\), that is, \(u_{n+1} \lt u_{n+2}\).`) },
        { t: 'Bounded above by 1', html: p(r`\(u_0 \leq 1\); if \(u_n \leq 1\), then \(u_n^2 \leq 1\) and \(u_{n+1} \leq \dfrac{2}{3} \leq 1\).`) },
        { t: 'Conclusion', html: p(r`The sequence is increasing and bounded above: it converges.`) + p(r`Going further: its limit satisfies \(\ell = \dfrac{1 + \ell^2}{3}\), that is, \(\ell^2 - 3\ell + 1 = 0\); since \(\ell \leq 1\), \(\ell = \dfrac{3 - \sqrt{5}}{2}\).`) }],
      answer: p(r`Increasing (induction), bounded above by 1 (induction), hence convergent.`),
      traps: [r`Squaring an inequality requires positive terms: say so.`], note: 'Follows the official Moodle answer key; the computation of the limit is added.' },

    /* ================================================================== Tutorial 4, part 3 */
    'td4-3-5': { src: 'Tutorial 4 · ex. 3.5', title: 'The sum of 1/k! is bounded above by 3',
      intro: r`Let \((u_n)\) be defined by \(\forall n \in \N,\ u_n = \displaystyle\sum_{k=0}^{n} \frac{1}{k!}\).`,
      questions: [r`Study the monotonicity of the sequence \((u_n)\).`, r`Show, by induction, that \(\forall k \in \N^*,\ k! \geq 2^{k-1}\).`, r`Deduce that the sequence \((u_n)\) is bounded above by 3.`, r`Is the sequence convergent? If so, give bounds for its limit \(\ell\).`],
      hints: [r`\(u_{n+1} - u_n\) is the last term added.`, r`Bound each \(\frac{1}{k!}\) above by \(\frac{1}{2^{k-1}}\): a geometric sum appears.`],
      solution: [
        { t: 'Monotonicity', html: p(r`\(u_{n+1} - u_n = \dfrac{1}{(n+1)!} \gt 0\): strictly increasing.`) },
        { t: 'The induction', html: p(r`\(1! = 1 \geq 2^0\). If \(k! \geq 2^{k-1}\) for some \(k \geq 1\), then \((k+1)! = (k+1)\,k! \geq 2 \times 2^{k-1} = 2^k\), since \(k + 1 \geq 2\).`) },
        { t: 'Upper bound', html: model(p(r`For \(k \geq 1\), \(\dfrac{1}{k!} \leq \dfrac{1}{2^{k-1}}\). So \(u_n = 1 + \displaystyle\sum_{k=1}^{n} \frac{1}{k!} \leq 1 + \sum_{k=1}^{n} \frac{1}{2^{k-1}} = 1 + \frac{1 - \left(\frac{1}{2}\right)^n}{1 - \frac{1}{2}} = 3 - \frac{1}{2^{n-1}} \leq 3\).`)) },
        { t: 'Convergence', html: p(r`Increasing and bounded above by 3: it converges. Since it is increasing, \(\ell \geq u_2 = 2.5\); and \(\ell \leq 3\). So \(2.5 \leq \ell \leq 3\) (the limit is the number \(e \approx 2.718\)).`) }],
      answer: p(r`Strictly increasing, bounded above by 3, hence convergent; \(2.5 \leq \ell \leq 3\).`),
      traps: [r`The term \(k = 0\) equals 1 and does not fit the bound \(\frac{1}{2^{k-1}}\): set it aside.`], note: NOCOR },

    'td4-3-8': { src: 'Tutorial 4 · ex. 3.8 and 3.9', title: 'Two pairs of adjacent sequences',
      intro: r`Adjacent sequences, then an approximate value of the limit.`,
      questions: [r`Show that \(u_n = \displaystyle\sum_{k=1}^{n} \frac{1}{k^2}\) and \(v_n = u_n + \dfrac{1}{n}\) (for \(n \in \N^*\)) are adjacent.`,
        r`For \(n \geq 2\), let \(u_n = \displaystyle\sum_{k=1}^{n-1} \frac{1}{k^2(k+1)^2}\) and \(v_n = u_n + \dfrac{1}{3n^2}\). Show that \((u_n)\) and \((v_n)\) are adjacent.`,
        r`Let \(\varepsilon \gt 0\). How can you obtain an approximate value of the common limit to within \(\varepsilon\)? Compute the limit to within \(0.01\).`],
      hints: [r`Three points: \((u_n)\) increasing, \((v_n)\) decreasing, \(v_n - u_n \to 0\).`, r`\(v_{n+1} - v_n\): put everything over a common denominator, the numerator simplifies a lot.`, r`\(u_n \leq \ell \leq v_n\): the error is at most \(v_n - u_n\).`],
      solution: [
        { t: 'Exercise 3.8', html: p(r`\(u_{n+1} - u_n = \dfrac{1}{(n+1)^2} \gt 0\). \(v_{n+1} - v_n = \dfrac{1}{(n+1)^2} + \dfrac{1}{n+1} - \dfrac{1}{n} = \dfrac{n + n(n+1) - (n+1)^2}{n(n+1)^2} = -\dfrac{1}{n(n+1)^2} \lt 0\). \(v_n - u_n = \dfrac{1}{n} \to 0\). The sequences are adjacent.`) },
        { t: 'Exercise 3.9', html: p(r`\(u_{n+1} - u_n = \dfrac{1}{n^2(n+1)^2} \gt 0\). \(v_{n+1} - v_n = \dfrac{1}{n^2(n+1)^2} + \dfrac{1}{3(n+1)^2} - \dfrac{1}{3n^2} = \dfrac{3 + n^2 - (n+1)^2}{3n^2(n+1)^2} = \dfrac{2 - 2n}{3n^2(n+1)^2} \leq 0\) for \(n \geq 1\). \(v_n - u_n = \dfrac{1}{3n^2} \to 0\). Adjacent.`) },
        { t: 'Approximate value', html: model(p(r`For every \(n\), \(u_n \leq \ell \leq v_n\): \(u_n\) approximates \(\ell\) with an error of at most \(v_n - u_n = \dfrac{1}{3n^2}\). It is enough to choose \(n\) such that \(\dfrac{1}{3n^2} \leq \varepsilon\).`) + p(r`For \(\varepsilon = 0.01\): \(n^2 \geq \dfrac{100}{3}\), that is, \(n \geq 6\). \(u_6 = \dfrac{1}{4} + \dfrac{1}{36} + \dfrac{1}{144} + \dfrac{1}{400} + \dfrac{1}{900} \approx 0.2883\) and \(v_6 = u_6 + \dfrac{1}{108} \approx 0.2976\).`)) }],
      answer: p(r`\(0.288 \leq \ell \leq 0.298\): \(\ell \approx 0.29\) to within \(0.01\).`),
      traps: [r`Forgetting the third condition.`, r`In 3.9, the sum for \(u_n\) stops at \(n - 1\): \(u_{n+1} - u_n\) is the term of index \(k = n\).`], note: NOCOR },

    /* ================================================================== Tutorial 4, part 4 */
    'td4-4-10': { src: 'Tutorial 4 · ex. 4.10', title: 'Subsequences: place ⇒, ⇐ or ⇔',
      intro: r`Let \((u_n)\) be a real sequence and \(\ell \in \R\). Put the right symbol \(\Rightarrow\), \(\Leftarrow\) or \(\Leftrightarrow\) between \(P\) and \(Q\).`,
      questions: [r`\(P\): \(u_n \to \ell\) and \(Q\): \(u_{2n} \to \ell\).`, r`\(P\): \(u_n \to \ell\) and \(Q\): (\(u_{2n} \to \ell\) and \(u_{2n+1} \to \ell\)).`, r`\(P\): \(u_n \to \ell\) and \(Q\): (\(u_{3n} \to \ell\) and \(u_{3n+1} \to \ell\)).`, r`State the result to know about \((u_n)\), \((u_{2n})\) and \((u_{2n+1})\).`],
      hints: [r`\(P \Rightarrow Q\) is always true: every subsequence of a convergent sequence has the same limit.`, r`For the converse: do the subsequences cover all the ranks?`],
      solution: [
        { t: 'The three symbols', html: p(r`1. \(P \Rightarrow Q\) only. Counterexample to the converse: \(u_n = (-1)^n\), \(u_{2n} \to 1\), and \((u_n)\) diverges.`) + p(r`2. \(P \Leftrightarrow Q\): the even and odd ranks cover \(\N\).`) + p(r`3. \(P \Rightarrow Q\) only: the ranks \(3n + 2\) are not covered. Counterexample: \(u_n = 1\) if \(n\) is of the form \(3k + 2\), \(0\) otherwise.`) },
        { t: 'The result', html: model(p(r`\((u_n)\) converges to \(\ell\) if and only if \((u_{2n})\) and \((u_{2n+1})\) both converge to \(\ell\).`)) }],
      answer: p(r`\(\Rightarrow\); \(\Leftrightarrow\); \(\Rightarrow\).`), traps: [r`The two subsequences must have the <b>same</b> limit.`], note: NOCOR },

    'td4-4-11': { src: 'Tutorial 4 · ex. 4.11 and 4.12', title: 'The harmonic series diverges, the alternating series converges',
      intro: r`For \(n \in \N^*\), let \(h_n = \displaystyle\sum_{k=1}^{n} \frac{1}{k}\) and \(a_n = \displaystyle\sum_{k=1}^{n} \frac{(-1)^k}{k}\).`,
      questions: [r`What is the monotonicity of \((h_n)\)? Write \(h_{2n} - h_n\) using the symbol \(\sum\), then show that \(h_{2n} - h_n \geq \dfrac{1}{2}\).`, r`By contradiction, show that \((h_n)\) diverges to \(+\infty\).`, r`Show that the subsequences \((a_{2n})\) and \((a_{2n+1})\) are adjacent. Deduce that \((a_n)\) converges.`],
      hints: [r`\(h_{2n} - h_n\) has \(n\) terms, all greater than or equal to \(\frac{1}{2n}\).`, r`If \(h_n \to \ell\), what is the limit of \(h_{2n} - h_n\)?`, r`\(a_{2n+2} - a_{2n}\): two terms added, with opposite signs.`],
      solution: [
        { t: 'Lower bound', html: p(r`\(h_{n+1} - h_n = \dfrac{1}{n+1} \gt 0\): strictly increasing. \(h_{2n} - h_n = \displaystyle\sum_{k=n+1}^{2n} \frac{1}{k}\): \(n\) terms, each \(\geq \dfrac{1}{2n}\), so \(h_{2n} - h_n \geq n \times \dfrac{1}{2n} = \dfrac{1}{2}\).`) },
        { t: 'By contradiction', html: model(p(r`Suppose that \((h_n)\) converges to a real number \(\ell\). Then the subsequence \((h_{2n})\) also converges to \(\ell\), so \(h_{2n} - h_n \to 0\). This is absurd, since \(h_{2n} - h_n \geq \frac{1}{2}\).`) + p(r`So \((h_n)\) is increasing and does not converge: it is not bounded above (otherwise it would converge), and it tends to \(+\infty\).`)) },
        { t: 'The alternating series', html: p(r`\(a_{2n+2} - a_{2n} = -\dfrac{1}{2n+1} + \dfrac{1}{2n+2} \lt 0\): \((a_{2n})\) decreases. \(a_{2n+3} - a_{2n+1} = \dfrac{1}{2n+2} - \dfrac{1}{2n+3} \gt 0\): \((a_{2n+1})\) increases. \(a_{2n} - a_{2n+1} = \dfrac{1}{2n+1} \to 0\). The two subsequences are adjacent: they converge to the same limit \(\ell\). By the result of exercise 4.10, \((a_n)\) converges to \(\ell\).`) }],
      answer: p(r`\(h_n \to +\infty\); \((a_n)\) converges (to \(-\ln 2\)).`), traps: [r`Bound each term below by the smallest one, \(\frac{1}{2n}\), not by \(\frac{1}{n}\).`], note: NOCOR },

    /* ================================================================== Tutorial 4, part 5 */
    'td4-5-14': { src: 'Tutorial 4 · ex. 5.14', title: 'Landau: meaning of the notations, rankings, equivalents',
      intro: r`Asymptotic comparisons.`,
      questions: [r`What do \(u_n = o(1)\), \(u_n = O(1)\), \(u_n = o(0)\) and \(u_n \sim 0\) mean?`,
        r`Fill in with \(= o\), \(= O\) or \(\sim\) (several possibilities): \(\dfrac{n(n+1)}{2} \ldots n^2\); \(n \ldots n^2\); \(n\sin(n) \ldots n\); \(2n^2 - n + 10 \ldots e^n - n\); \(-8n^3 + 2n^2 - n + 10 \ldots -8n^3\); \(2n^2 - n + 10 \ldots -n + 10\); \(n^2 + 3n \ldots 2n^2 + 3\); \(n + 1 \ldots n\); \(\ln(n+1) \ldots \ln(n)\); \(e^{n+1} \ldots e^n\).`,
        r`Rank with \(\ll\): \(n\ln(n)\); \(2^n\); \(\ln(n)\); \(1\); \(n^2\); \(n^3\); \(n\). Then (homework): \(n\); \(n^2\); \(\ln(n)\); \(e^n\); \(n\ln(n)\); \(\dfrac{n^2}{\ln(n)}\). Then: \(\dfrac{1}{n}\); \(\dfrac{1}{n^2}\); \(\dfrac{1}{\ln(n)}\); \(\dfrac{\ln(n)}{n}\); \(\dfrac{\ln(n)}{n^2}\); \(\dfrac{1}{n\ln(n)}\).`,
        r`Find a simple equivalent of \(\ln(n) + 2n - 3\); \(\dfrac{1}{n-1} - \dfrac{1}{n+1}\); \(\dfrac{2e^n - n}{n+1}\).`,
        r`Show that \(u_n \sim v_n \iff u_n = v_n + o(v_n)\). Do we have \(u_n \sim v_n \iff u_n - v_n \to 0\)?`],
      hints: [r`Replace \(v_n\) by 1 or 0 in the definitions.`, r`For each pair, compute the limit of the quotient.`, r`An equivalent of a sum: the dominant term. For a difference of fractions: reduce first.`],
      solution: [
        { t: 'Meaning of the notations', html: p(r`\(u_n = o(1)\): \(u_n \to 0\). \(u_n = O(1)\): \((u_n)\) is bounded. \(u_n = o(0)\) and \(u_n \sim 0\): \((u_n)\) is zero from some rank on.`) },
        { t: 'Filling in', html: tbl(['Pair', 'Quotient', 'You write'], [
          [r`\(\frac{n(n+1)}{2}\), \(n^2\)`, r`\(\to \frac{1}{2}\)`, r`\(= O\)`], [r`\(n\), \(n^2\)`, r`\(\to 0\)`, r`\(= o\), \(= O\)`], [r`\(n\sin n\), \(n\)`, 'bounded, no limit', r`\(= O\)`],
          [r`\(2n^2 - n + 10\), \(e^n - n\)`, r`\(\to 0\)`, r`\(= o\), \(= O\)`], [r`\(-8n^3 + \ldots\), \(-8n^3\)`, r`\(\to 1\)`, r`\(\sim\), \(= O\)`], [r`\(2n^2 - n + 10\), \(-n + 10\)`, r`\(\to -\infty\)`, 'none of the three'],
          [r`\(n^2 + 3n\), \(2n^2 + 3\)`, r`\(\to \frac{1}{2}\)`, r`\(= O\)`], [r`\(n + 1\), \(n\)`, r`\(\to 1\)`, r`\(\sim\), \(= O\)`], [r`\(\ln(n+1)\), \(\ln n\)`, r`\(\to 1\)`, r`\(\sim\), \(= O\)`], [r`\(e^{n+1}\), \(e^n\)`, r`\(= e\)`, r`\(= O\)`]]) },
        { t: 'Rankings', html: p(r`\(1 \ll \ln(n) \ll n \ll n\ln(n) \ll n^2 \ll n^3 \ll 2^n\).`) + p(r`\(\ln(n) \ll n \ll n\ln(n) \ll \dfrac{n^2}{\ln(n)} \ll n^2 \ll e^n\).`) + p(r`\(\dfrac{1}{n^2} \ll \dfrac{\ln(n)}{n^2} \ll \dfrac{1}{n\ln(n)} \ll \dfrac{1}{n} \ll \dfrac{\ln(n)}{n} \ll \dfrac{1}{\ln(n)}\).`) },
        { t: 'Equivalents', html: p(r`\(\ln(n) + 2n - 3 \sim 2n\). \(\dfrac{1}{n-1} - \dfrac{1}{n+1} = \dfrac{2}{n^2 - 1} \sim \dfrac{2}{n^2}\). \(\dfrac{2e^n - n}{n+1} \sim \dfrac{2e^n}{n}\).`) },
        { t: 'The property', html: model(p(r`\(u_n \sim v_n\) means: from some rank on, \(u_n = v_n(1 + \varepsilon_n)\) with \(\varepsilon_n \to 0\), that is, \(u_n = v_n + \varepsilon_n v_n\); and \(\varepsilon_n v_n\) is by definition an \(o(v_n)\). Conversely, \(u_n = v_n + \varepsilon_n v_n = v_n(1 + \varepsilon_n)\).`) + p(r`On the other hand \(u_n \sim v_n\) is not equivalent to \(u_n - v_n \to 0\): \(n + 1 \sim n\) and the difference is 1; \(\frac{1}{n} - \frac{1}{n^2} \to 0\) and the quotient is \(n\).`)) }],
      answer: p(r`To remember: a single limit, that of the quotient, gives all the comparisons.`),
      traps: [r`\(\ln(n+1) \sim \ln(n)\), but \(e^{n+1}\) is not equivalent to \(e^n\).`, r`In a ranking of sequences that tend to 0, the smallest is the one that decreases fastest.`], note: NOCOR },

    /* ================================================================== Tutorial 4, part 6 */
    'td4-6-15': { src: 'Tutorial 4 · ex. 6.15', title: 'Recursive sequence: graphical reading and four statements',
      intro: r`We study \(u_{n+1} = f(u_n)\).`,
      questions: [r`With \(f(x) = x^2\) and \(u_0 = 0\), \(1\), \(0.8\), \(1.3\), \(-1.2\): compute \(u_1, u_2, u_3\), conjecture the monotonicity and the behaviour at \(+\infty\).`,
        r`\(f\) is continuous on an interval \(I\), \(u_0 \in I\). Which statements are true? “If \(\ell = f(\ell)\) then \((u_n)\) converges to \(\ell\)”; “If \((u_n)\) converges to a real number \(\ell\) then \(\ell = f(\ell)\)”; “\((u_n)\) converges to \(\ell\) if and only if \(\ell = f(\ell)\)”; “If \(f\) is increasing then \((u_n)\) is increasing”.`],
      hints: [r`The fixed points of \(x \mapsto x^2\) are 0 and 1.`, r`Look for a counterexample in question 1.`],
      solution: [
        { t: 'The five cases', html: tbl([r`\(u_0\)`, 'Terms', 'Conjecture'], [
          ['0', '0; 0; 0', 'constant'], ['1', '1; 1; 1', 'constant'], [r`\(0.8\)`, r`\(0.64\); \(0.4096\); \(\approx 0.168\)`, 'decreasing, tends to 0'],
          [r`\(1.3\)`, r`\(1.69\); \(\approx 2.86\); \(\approx 8.16\)`, r`increasing, tends to \(+\infty\)`], [r`\(-1.2\)`, r`\(1.44\); \(\approx 2.07\); \(\approx 4.30\)`, r`increasing, tends to \(+\infty\)`]]) +
          p(r`\(f\) is increasing on \([0, +\infty[\), and the sequence is monotonic from rank 1 on: increasing or decreasing depending on where \(u_0\) sits relative to the fixed points.`) },
        { t: 'The statements', html: p(r`Only the second is true: if \((u_n)\) converges to \(\ell\) (in \(I\)), then \(\ell = f(\ell)\), by continuity of \(f\).`) + p(r`The first and the third are false: \(f(x) = x^2\), \(u_0 = 1.3\); 0 and 1 are fixed points and the sequence tends to \(+\infty\). The fourth is false: \(u_0 = 0.8\), \(f\) increasing on \([0, 1]\), decreasing sequence.`) }],
      answer: p(r`A fixed point is a possible limit, not a guaranteed limit.`), traps: [r`\(f\) increasing gives a <b>monotonic</b> sequence, not necessarily increasing.`], note: NOCOR },

    'td4-6-16': { src: 'Tutorial 4 · ex. 6.16', title: 'uₙ₊₁ = (uₙ² + 3)/4: the study depending on u₀',
      intro: r`Let \(f(x) = \dfrac{x^2 + 3}{4}\) on \(\R\), and \(u_{n+1} = f(u_n)\).`,
      questions: [r`Show that \(\forall n \in \N^*,\ u_n \gt 0\).`, r`Find the fixed points of \(f\). What happens if \(u_0\) is one of these fixed points?`, r`Draw up the table of variations of \(f\).`,
        r`Suppose \(u_0 \in [0, 1[\). (a) Show that \(\forall n,\ 0 \leq u_n \lt 1\). (b) Study the monotonicity. (c) Does the sequence converge? If so, give its limit.`, r`Redo the previous question for \(u_0 \in\ ]3, +\infty[\).`, r`(Homework) Do the case \(u_0 \in\ ]1, 3[\).`],
      hints: [r`\(f(x) \geq \frac{3}{4}\) for every \(x\).`, r`\(u_{n+1} - u_n = \dfrac{(u_n - 1)(u_n - 3)}{4}\).`, r`For \(u_0 \gt 3\): if the sequence converged, to what?`],
      solution: [
        { t: 'Questions 1 to 3', html: p(r`\(f(x) \geq \frac{3}{4} \gt 0\), so \(u_n = f(u_{n-1}) \gt 0\) for \(n \geq 1\). Fixed points: \(x^2 - 4x + 3 = 0\), that is, 1 and 3; the sequence is then constant. \(f'(x) = \frac{x}{2}\): \(f\) decreases on \(]-\infty, 0]\), increases on \([0, +\infty[\); \(f(0) = \frac{3}{4}\), \(f(1) = 1\), \(f(3) = 3\).`) },
        { t: 'u₀ in [0, 1[', html: model(p(r`(a) Induction: if \(0 \leq u_n \lt 1\), since \(f\) is strictly increasing on \([0, 1]\), \(\frac{3}{4} = f(0) \leq u_{n+1} \lt f(1) = 1\).`) + p(r`(b) \(u_{n+1} - u_n = \dfrac{(u_n - 1)(u_n - 3)}{4} \gt 0\) (two negative factors): strictly increasing.`) + p(r`(c) Increasing and bounded above by 1: convergent. \(f\) is continuous, so \(\ell \in \{1, 3\}\), and \(\ell \leq 1\): \(\ell = 1\).`)) },
        { t: 'u₀ > 3', html: p(r`By induction \(u_n \gt 3\). Two positive factors: strictly increasing. If it converged, \(\ell \in \{1, 3\}\); but \(\ell \geq u_0 \gt 3\): contradiction. Increasing and not convergent, it is not bounded above: \(u_n \to +\infty\).`) },
        { t: 'u₀ in ]1, 3[', html: p(r`By induction \(1 \lt u_n \lt 3\). Factors of opposite signs: strictly decreasing, bounded below by 1, hence convergent; \(\ell \leq u_0 \lt 3\), so \(\ell = 1\).`) }],
      answer: p(r`\(u_0 \in [0, 3[\): the sequence converges to 1. \(u_0 = 3\): constant. \(u_0 \gt 3\): \(+\infty\).`),
      traps: [r`To choose between the two fixed points, you need a bound: \(\ell \leq 1\), or \(\ell \leq u_0 \lt 3\).`], note: NOCOR },

    'td4-6-17': { src: 'Tutorial 4 · ex. 6.17', title: 'Heron’s method to approximate a square root',
      intro: r`Let \(a \in \R_+^*\) and \(f(x) = \dfrac{1}{2}\left(x + \dfrac{a}{x}\right)\) on \(\R_+^*\). Consider \(u_{n+1} = f(u_n)\) with \(u_0 \in \R_+^*\).`,
      questions: [r`Check that such a sequence is well defined.`, r`Find the fixed points of \(f\).`, r`Draw up the table of variations of \(f\) and deduce: \(\forall n \in \N^*,\ u_n \geq \sqrt{a}\).`, r`Show that from rank 1 on, the sequence is decreasing.`, r`Deduce that it is convergent, and give its limit.`],
      hints: [r`Well defined: you need \(u_n \neq 0\) in order to divide.`, r`The minimum of \(f\) is reached at \(\sqrt{a}\).`, r`\(u_{n+1} - u_n = \dfrac{a - u_n^2}{2u_n}\).`],
      solution: [
        { t: 'Well defined, fixed point', html: p(r`If \(u_n \gt 0\), then \(u_{n+1} = \frac{1}{2}\left(u_n + \frac{a}{u_n}\right) \gt 0\): by induction, all the terms exist and are strictly positive. \(f(x) = x \iff \dfrac{a}{x} = x \iff x = \sqrt{a}\).`) },
        { t: 'Lower bound', html: p(r`\(f'(x) = \dfrac{1}{2}\left(1 - \dfrac{a}{x^2}\right)\), negative on \(]0, \sqrt{a}[\), positive on \(]\sqrt{a}, +\infty[\). The minimum of \(f\) is \(f(\sqrt{a}) = \sqrt{a}\). So for \(n \geq 1\), \(u_n = f(u_{n-1}) \geq \sqrt{a}\).`) },
        { t: 'Decreasing, limit', html: model(p(r`For \(n \geq 1\): \(u_{n+1} - u_n = \dfrac{a - u_n^2}{2u_n} \leq 0\), since \(u_n \geq \sqrt{a}\). The sequence is decreasing from rank 1 on.`) + p(r`Decreasing and bounded below by \(\sqrt{a}\): it converges to \(\ell \geq \sqrt{a} \gt 0\). \(f\) is continuous on \(\R_+^*\), so \(\ell = f(\ell)\), hence \(\ell = \sqrt{a}\).`)) }],
      answer: p(r`\(u_n \to \sqrt{a}\). With \(a = 2\), \(u_0 = 1\): \(1.5\); \(1.41667\); \(1.414216\).`), traps: [r`The lower bound only holds from rank 1 on: \(u_0\) is arbitrary.`, r`\(\ell \gt 0\) must be established before using the continuity of \(f\) at \(\ell\).`], note: NOCOR },

    /* ================================================================== January 2024 exam */
    'f2024-ex2': { src: 'Exam Jan. 2024 · Ex 2', title: 'Adjacent sequences: Σ 1/k! and Σ 1/k! + 1/n!',
      intro: r`For every integer \(n \geq 2\): \(u_n = \displaystyle\sum_{k=0}^{n} \frac{1}{k!}\) and \(v_n = u_n + \dfrac{1}{n!}\).`,
      questions: [r`After recalling the definition, show that the sequences \((u_n)\) and \((v_n)\) are adjacent.`, r`Is the sequence \((u_n)\) convergent? Justify your answer.`, r`Is the sequence \((u_n)\) bounded above? Justify.`],
      hints: [r`\(\dfrac{1}{n!} = \dfrac{n+1}{(n+1)!}\).`, r`Questions 2 and 3: two results of the course, no computation.`],
      solution: [
        { t: 'Adjacent', html: model(p(r`\((u_n)\) and \((v_n)\) are adjacent if \((u_n)\) is increasing, \((v_n)\) is decreasing and \(\lim (v_n - u_n) = 0\).`) + p(r`\(u_{n+1} - u_n = \dfrac{1}{(n+1)!} \geq 0\): \((u_n)\) is increasing.`) + p(r`\(v_{n+1} - v_n = \dfrac{2}{(n+1)!} - \dfrac{1}{n!} = \dfrac{2 - (n+1)}{(n+1)!} = \dfrac{1 - n}{(n+1)!} \leq 0\) since \(n \geq 2\): \((v_n)\) is decreasing.`) + p(r`\(v_n - u_n = \dfrac{1}{n!} \to 0\).`)) },
        { t: 'Convergent, bounded above', html: p(r`Two adjacent sequences converge (to the same limit): \((u_n)\) converges. Every convergent sequence is bounded: \((u_n)\) is bounded, hence bounded above.`) }],
      answer: p(r`Adjacent; so \((u_n)\) converges; so it is bounded, in particular bounded above.`), traps: [r`“After recalling the definition”: the definition is marked.`], note: OFF24 },

    'f2024-ex3': { src: 'Exam Jan. 2024 · Ex 3', title: 'Landau: stating all the comparisons',
      intro: r`Compare the sequences \((u_n)\) and \((v_n)\) at \(+\infty\) using the Landau comparison symbols \(\sim\), \(= o(\cdot)\), \(= O(\cdot)\), stating all the possible comparisons and justifying your answers.`,
      questions: [r`\(u_n = 1 - 2n^2\) and \(v_n = -2n^2 + n - 3\).`, r`\(u_n = e^{2n} - \sqrt{n}\) and \(v_n = n + 1\).`, r`\(u_n = 4^n + 1\) and \(v_n = 5^n\).`],
      hints: [r`Form \(\dfrac{u_n}{v_n}\) and factorise the dominant term in the numerator and the denominator.`, r`If the quotient tends to \(+\infty\), the other quotient tends to 0.`],
      solution: [
        { t: 'Polynomials of the same degree', html: p(r`\(\dfrac{u_n}{v_n} = \dfrac{1 - \frac{1}{2n^2}}{1 - \frac{1}{2n} + \frac{3}{2n^2}} \to 1\): \(u_n \sim v_n\). The sequence \(\left(\frac{u_n}{v_n}\right)\) converges, so it is bounded: \(u_n = O(v_n)\).`) },
        { t: 'Exponential against polynomial', html: p(r`\(\dfrac{u_n}{v_n} = \dfrac{e^{2n}}{n} \times \dfrac{1 - \frac{\sqrt{n}}{e^{2n}}}{1 + \frac{1}{n}} \to +\infty\) by comparative growth. So \(\dfrac{v_n}{u_n} \to 0\): \(v_n = o(u_n)\), and \(v_n = O(u_n)\).`) },
        { t: 'Two exponentials', html: p(r`\(\dfrac{u_n}{v_n} = \left(\dfrac{4}{5}\right)^n + \dfrac{1}{5^n} \to 0\): \(u_n = o(v_n)\), and \(u_n = O(v_n)\).`) }],
      answer: p(r`\(u_n \sim v_n\) and \(u_n = O(v_n)\); \(v_n = o(u_n)\) and \(v_n = O(u_n)\); \(u_n = o(v_n)\) and \(u_n = O(v_n)\).`), traps: [r`Stopping at the first comparison: the \(O\) is expected each time.`], note: OFF24 },

    'f2024-ex4': { src: 'Exam Jan. 2024 · Ex 4', title: 'Course: state and prove the squeeze theorem',
      intro: r`Course question (5 points out of 40).`,
      questions: [r`State the squeeze theorem rigorously.`, r`Prove the squeeze theorem.`],
      hints: [r`Three sequences, a bound on both sides, a common limit.`, r`Fix \(\varepsilon \gt 0\), take a rank for each outer sequence, then the larger of the two.`],
      solution: [
        { t: 'The statement', html: model(p(r`Let \((u_n)\), \((v_n)\) and \((w_n)\) be three real sequences such that \(\forall n \in \N,\ u_n \leq v_n \leq w_n\), and such that \((u_n)\) and \((w_n)\) converge to the same real number \(\ell\). Then \((v_n)\) converges to \(\ell\).`)) },
        { t: 'The proof', html: model(p(r`Let \(\varepsilon \gt 0\) be fixed. \((u_n)\) converges to \(\ell\): \(\exists N_1 \in \N,\ \forall n \geq N_1,\ \ell - \varepsilon \lt u_n \lt \ell + \varepsilon\). \((w_n)\) converges to \(\ell\): \(\exists N_2 \in \N,\ \forall n \geq N_2,\ \ell - \varepsilon \lt w_n \lt \ell + \varepsilon\).`) + p(r`Set \(N = \max(N_1, N_2)\) and let \(n \geq N\). Then \(\ell - \varepsilon \lt u_n \leq v_n \leq w_n \lt \ell + \varepsilon\), so \(|v_n - \ell| \lt \varepsilon\).`) + p(r`We have shown: \(\forall \varepsilon \gt 0\), there is a rank \(N\) from which \(|v_n - \ell| \lt \varepsilon\). The sequence \((v_n)\) converges to \(\ell\).`)) }],
      answer: p(r`The official answer key refers to the “Proofs to know” sheet: it is its proof, word for word.`), traps: [r`Forgetting “same limit”, or taking \(N = \min(N_1, N_2)\).`], note: 'Proof from the “Proofs to know” sheet of the Moodle.' },

    'f2024-ex5': { src: 'Exam Jan. 2024 · Ex 5', title: 'Recursive sequence uₙ₊₁ = uₙ/(uₙ + 8) and auxiliary sequence',
      intro: r`Let \((u_n)\) be defined by \(u_0 = 1\) and \(\forall n \in \N,\ u_{n+1} = \dfrac{u_n}{u_n + 8}\). Questions 1 and 2 are independent.`,
      questions: [r`(a) Show by induction that \(\forall n \in \N,\ u_n \gt 0\). (b) Suppose that \((u_n)\) converges to a real number \(\ell\). What are the possible values of \(\ell\)? (c) Study the monotonicity of \((u_n)\). (d) Is the sequence convergent? If so, state its limit.`,
        r`Let \(v_n = 1 + \dfrac{7}{u_n}\). (a) Show that \((v_n)\) is geometric with common ratio 8; deduce \(v_n\) as a function of \(n\). (b) Deduce \(u_n\) as a function of \(n\). (c) Do we recover the result of question 1 (d)?`],
      hints: [r`(b) \(f : x \mapsto \frac{x}{x+8}\) is continuous: \(\ell = f(\ell)\).`, r`(c) \(u_{n+1} - u_n\), over a common denominator.`, r`Question 2: compute \(\dfrac{7}{u_{n+1}}\).`],
      solution: [
        { t: 'Question 1', html: model(p(r`(a) \(u_0 = 1 \gt 0\). If \(u_n \gt 0\), then \(u_n + 8 \gt 0\) and \(u_{n+1} = \dfrac{u_n}{u_n + 8} \gt 0\). So \(\forall n,\ u_n \gt 0\).`) + p(r`(b) \(f : x \mapsto \dfrac{x}{x+8}\) is continuous on \(\R_+\), so \(\ell = f(\ell)\): \(\ell^2 + 8\ell = \ell\), that is, \(\ell(\ell + 7) = 0\). \(\ell = 0\) or \(\ell = -7\).`) + p(r`(c) \(u_{n+1} - u_n = \dfrac{u_n - u_n(u_n + 8)}{u_n + 8} = -\dfrac{u_n(u_n + 7)}{u_n + 8} \leq 0\) since \(u_n \gt 0\): decreasing.`) + p(r`(d) Decreasing and bounded below by 0: it converges. \(u_n \gt 0\) for every \(n\) gives \(\ell \geq 0\), so \(\ell = 0\).`)) },
        { t: 'Question 2', html: p(r`\(v_{n+1} = 1 + \dfrac{7(u_n + 8)}{u_n} = 8 + \dfrac{56}{u_n} = 8\left(1 + \dfrac{7}{u_n}\right) = 8v_n\). \(v_0 = 8\), so \(v_n = 8^{n+1}\). \(u_n = \dfrac{7}{v_n - 1} = \dfrac{7}{8^{n+1} - 1}\). Since \(8 \gt 1\), \(8^{n+1} \to +\infty\) and \(u_n \to 0\): we recover the limit.`) }],
      answer: p(r`\(u_n = \dfrac{7}{8^{n+1} - 1} \to 0\).`), traps: [r`In (d), \(u_n \gt 0\) gives \(\ell \geq 0\), a non-strict inequality: that is enough to rule out \(-7\).`], note: OFF24 },

    'f2024-ex6': { src: 'Exam Jan. 2024 · Ex 6', title: 'Subsequences: even and odd ranks',
      intro: r`Let \((u_n)\) be defined for every \(n \in \N^*\) by \(u_n = \dfrac{1}{n}\displaystyle\sum_{k=0}^{n-1} (-1)^k\).`,
      questions: [r`Find the expressions of \(u_{2n}\) and \(u_{2n+1}\) as functions of \(n\).`, r`Is the sequence \((u_n)\) convergent? If so, give its limit.`],
      hints: [r`Sum of \(n\) terms of a geometric sequence with common ratio \(-1\).`],
      solution: [
        { t: 'The two subsequences', html: p(r`\(u_n = \dfrac{1}{n} \times \dfrac{1 - (-1)^n}{1 - (-1)} = \dfrac{1 - (-1)^n}{2n}\). So \(u_{2n} = 0\) and \(u_{2n+1} = \dfrac{2}{4n + 2} = \dfrac{1}{2n + 1}\).`) },
        { t: 'Convergence', html: p(r`\((u_{2n})\) and \((u_{2n+1})\) converge to the same limit 0. So \((u_n)\) converges to 0.`) }],
      answer: p(r`\(u_{2n} = 0\), \(u_{2n+1} = \dfrac{1}{2n+1}\); \((u_n)\) converges to 0.`), traps: [r`In \(u_{2n+1}\), the denominator is \(2(2n + 1)\).`], note: OFF24 },

    /* ================================================================== January 2025 exam */
    'f2025-ex1': { src: 'Exam Jan. 2025 · Ex 1', title: 'Two coupled sequences, adjacent',
      intro: r`\(u_0 = 2\), \(v_0 = 3\) and \(\forall n \in \N\): \(u_{n+1} = \dfrac{3u_n + 2v_n}{5}\), \(v_{n+1} = \dfrac{2u_n + 3v_n}{5}\). Let \(w_n = v_n - u_n\).`,
      questions: [r`(a) Show that \((w_n)\) is geometric; state its common ratio. (b) Deduce \(w_n\) as a function of \(n\). (c) Find the sign of \((w_n)\).`, r`Show that \((u_n)\) and \((v_n)\) are adjacent.`, r`What can you deduce about the behaviour of the two sequences at \(+\infty\)?`, r`Let \(x_n = u_n + v_n\). (a) Express \(x_{n+1}\) in terms of \(x_n\); deduce \(x_n\). (b) Deduce the limits of \((u_n)\) and \((v_n)\).`],
      hints: [r`Compute \(v_{n+1} - u_{n+1}\).`, r`\(u_{n+1} - u_n\) and \(v_{n+1} - v_n\) can be written with \(w_n\).`, r`\((x_n)\) is constant.`],
      solution: [
        { t: 'The sequence (wₙ)', html: p(r`\(w_{n+1} = \dfrac{2u_n + 3v_n - 3u_n - 2v_n}{5} = \dfrac{1}{5}w_n\): geometric with common ratio \(\dfrac{1}{5}\). \(w_0 = 1\), so \(w_n = \dfrac{1}{5^n} \gt 0\).`) },
        { t: 'Adjacent', html: model(p(r`\(u_{n+1} - u_n = \dfrac{2v_n - 2u_n}{5} = \dfrac{2}{5}w_n \gt 0\): \((u_n)\) is increasing.`) + p(r`\(v_{n+1} - v_n = \dfrac{2u_n - 2v_n}{5} = -\dfrac{2}{5}w_n \lt 0\): \((v_n)\) is decreasing.`) + p(r`\(v_n - u_n = w_n = \dfrac{1}{5^n} \to 0\). The sequences are adjacent.`)) },
        { t: 'Behaviour, limit', html: p(r`Two adjacent sequences converge to the same limit \(\ell\). \(x_{n+1} = \dfrac{5u_n + 5v_n}{5} = x_n\): \((x_n)\) is constant, \(x_n = x_0 = 5\). Passing to the limit: \(2\ell = 5\), so \(\ell = \dfrac{5}{2}\).`) }],
      answer: p(r`\(w_n = \dfrac{1}{5^n}\); both sequences converge to \(\dfrac{5}{2}\).`), traps: [r`The sign of \(w_n\) is what gives both monotonicities: do not skip question 1 (c).`], note: NO25 },

    'f2025-ex2': { src: 'Exam Jan. 2025 · Ex 2', title: 'A sum of n terms: decreasing and bounded below',
      intro: r`For every \(n \in \N^*\), let \(u_n = \displaystyle\sum_{k=n}^{2n-1} \frac{1}{k}\).`,
      questions: [r`Study the monotonicity of \((u_n)\).`, r`By bounding each term of the sum, show that \(\dfrac{n}{2n-1} \leq u_n \leq 1\).`, r`Deduce that \((u_n)\) is bounded, stating an upper bound and a lower bound.`, r`Can you deduce whether \((u_n)\) converges? If so, give bounds for its limit.`],
      hints: [r`When \(n\) becomes \(n + 1\), two terms come in and one term goes out.`, r`The sum has \(n\) terms.`],
      solution: [
        { t: 'Monotonicity', html: p(r`\(u_{n+1} = \displaystyle\sum_{k=n+1}^{2n+1} \frac{1}{k}\), so \(u_{n+1} - u_n = \dfrac{1}{2n} + \dfrac{1}{2n+1} - \dfrac{1}{n} = \dfrac{1}{2n+1} - \dfrac{1}{2n} \lt 0\): strictly decreasing.`) },
        { t: 'Bounds on both sides', html: p(r`For \(n \leq k \leq 2n - 1\): \(\dfrac{1}{2n-1} \leq \dfrac{1}{k} \leq \dfrac{1}{n}\). Summing the \(n\) terms: \(\dfrac{n}{2n-1} \leq u_n \leq 1\). Since \(\dfrac{n}{2n-1} \geq \dfrac{n}{2n} = \dfrac{1}{2}\), the sequence is bounded below by \(\dfrac{1}{2}\) and bounded above by 1: it is bounded.`) },
        { t: 'Convergence', html: p(r`Decreasing and bounded below: it converges. Passing to the limit in the bounds (\(\dfrac{n}{2n-1} \to \dfrac{1}{2}\)): \(\dfrac{1}{2} \leq \ell \leq 1\).`) }],
      answer: p(r`Strictly decreasing, bounded by \(\frac{1}{2}\) and 1, convergent, \(\frac{1}{2} \leq \ell \leq 1\) (the limit is \(\ln 2\)).`), traps: [r`“Bounded” alone does not give convergence: you need the monotonicity.`], note: NO25 },

    'f2025-ex3': { src: 'Exam Jan. 2025 · Ex 3', title: 'Landau: definitions, then three comparisons',
      intro: r`Comparison of sequences.`,
      questions: [r`Let \((u_n)\) and \((v_n)\) be two real sequences that do not vanish. Recall the definition of \(u_n = o(v_n)\), \(u_n = O(v_n)\) and \(u_n \sim v_n\) at \(+\infty\).`,
        r`Compare, stating all the possible comparisons and justifying: (a) \(u_n = -n^3 + n - 2\) and \(v_n = -2n^2 + n\); (b) \(u_n = e^n + \sqrt{n}\) and \(v_n = e^n + e^{-n}\); (c) \(u_n = 3n + 6\) and \(v_n = 5n - 1\).`],
      hints: [r`The sequences do not vanish: the definitions are written with the quotient.`, r`(c) The quotient tends to \(\frac{3}{5}\): what can you say, and what can you not say?`],
      solution: [
        { t: 'Definitions', html: model(p(r`\(u_n = o(v_n)\) if \(\dfrac{u_n}{v_n} \to 0\). \(u_n = O(v_n)\) if the sequence \(\left(\dfrac{u_n}{v_n}\right)\) is bounded. \(u_n \sim v_n\) if \(\dfrac{u_n}{v_n} \to 1\).`)) },
        { t: 'The three pairs', html: p(r`(a) \(\dfrac{u_n}{v_n} = \dfrac{n}{2} \times \dfrac{1 - \frac{1}{n^2} + \frac{2}{n^3}}{1 - \frac{1}{2n}} \to +\infty\), so \(\dfrac{v_n}{u_n} \to 0\): \(v_n = o(u_n)\) and \(v_n = O(u_n)\).`) +
          p(r`(b) \(\dfrac{u_n}{v_n} = \dfrac{1 + \sqrt{n}\,e^{-n}}{1 + e^{-2n}} \to 1\) (comparative growth): \(u_n \sim v_n\), \(u_n = O(v_n)\), \(v_n = O(u_n)\).`) +
          p(r`(c) \(\dfrac{u_n}{v_n} = \dfrac{3 + \frac{6}{n}}{5 - \frac{1}{n}} \to \dfrac{3}{5}\). The quotient and its inverse converge, so they are bounded: \(u_n = O(v_n)\) and \(v_n = O(u_n)\). Neither \(\sim\) (the limit is not 1), nor \(o\).`) }],
      answer: p(r`(a) \(v_n = o(u_n)\), \(v_n = O(u_n)\). (b) \(u_n \sim v_n\) and \(O\) in both directions. (c) \(O\) in both directions only.`), traps: [r`(c) “Same degree, so equivalent”: false, the quotient tends to \(\frac{3}{5}\).`], note: NO25 },

    'f2025-ex4': { src: 'Exam Jan. 2025 · Ex 4', title: 'Course: convergent hence bounded, converse, contrapositive',
      intro: r`Let \((u_n)\) be a sequence.`,
      questions: [r`Recall the definition of “\((u_n)\) is bounded”.`, r`Show that: \((u_n)\) converges \(\Rightarrow\) \((u_n)\) bounded.`, r`Is the converse true? Justify.`, r`State the contrapositive of the statement in question 2.`],
      hints: [r`Apply the definition of the limit with \(\varepsilon = 1\).`, r`Triangle inequality: \(|u_n| \leq |u_n - \ell| + |\ell|\).`],
      solution: [
        { t: 'Definition', html: p(r`\((u_n)\) is bounded if \(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\) (or: it is bounded above and bounded below).`) },
        { t: 'Proof', html: model(p(r`Suppose that \((u_n)\) converges to \(\ell \in \R\). With \(\varepsilon = 1\): there exists \(N \in \N\) such that \(\forall n \geq N,\ |u_n - \ell| \lt 1\).`) + p(r`For \(n \geq N\): \(|u_n| = |(u_n - \ell) + \ell| \leq |u_n - \ell| + |\ell| \lt 1 + |\ell|\).`) + p(r`Set \(M = \max\left(|u_0|, |u_1|, \ldots, |u_{N-1}|, 1 + |\ell|\right)\). Then \(\forall n \in \N,\ |u_n| \leq M\): the sequence is bounded.`)) },
        { t: 'Converse, contrapositive', html: p(r`The converse is false: \(u_n = (-1)^n\) is bounded (\(|u_n| \leq 1\)) and does not converge.`) + p(r`Contrapositive: if \((u_n)\) is not bounded, then \((u_n)\) does not converge.`) }],
      answer: p(r`Proof from the “Proofs to know” sheet; counterexample \(((-1)^n)\); “not bounded \(\Rightarrow\) not convergent”.`), traps: [r`Forgetting the first terms \(u_0, \ldots, u_{N-1}\) in the maximum.`], note: NO25 },

    'f2025-ex5': { src: 'Exam Jan. 2025 · Ex 5', title: 'Recursive sequence uₙ₊₁ = 1 + uₙ²/4',
      intro: r`Let \((u_n)\) be defined by \(u_0 = \dfrac{3}{2}\) and \(\forall n \in \N,\ u_{n+1} = 1 + \dfrac{1}{4}u_n^2\).`,
      questions: [r`Study the monotonicity of \((u_n)\). (Try to factor the expression you compute.)`, r`Show by induction that \(\forall n \in \N,\ 1 \lt u_n \lt 2\).`, r`Can you deduce the behaviour of \((u_n)\) at \(+\infty\)? If the sequence converges, find its limit. Justify.`],
      hints: [r`\(u_{n+1} - u_n\) is a square.`, r`Bound \(u_n^2\), then \(\frac{u_n^2}{4}\), then add 1.`],
      solution: [
        { t: 'Monotonicity', html: p(r`\(u_{n+1} - u_n = \dfrac{u_n^2 - 4u_n + 4}{4} = \dfrac{(u_n - 2)^2}{4} \geq 0\): the sequence is increasing.`) },
        { t: 'Induction', html: p(r`\(u_0 = \dfrac{3}{2} \in\ ]1, 2[\). If \(1 \lt u_n \lt 2\), then \(1 \lt u_n^2 \lt 4\), \(\dfrac{1}{4} \lt \dfrac{u_n^2}{4} \lt 1\), so \(\dfrac{5}{4} \lt u_{n+1} \lt 2\), and in particular \(1 \lt u_{n+1} \lt 2\).`) },
        { t: 'Limit', html: model(p(r`The sequence is increasing and bounded above by 2: it converges to a real number \(\ell\). The function \(x \mapsto 1 + \dfrac{x^2}{4}\) is continuous, so \(\ell = 1 + \dfrac{\ell^2}{4}\), that is, \((\ell - 2)^2 = 0\). So \(\ell = 2\).`)) }],
      answer: p(r`Increasing, bounded above by 2, convergent to 2.`), traps: [r`The limit 2 is never reached: \(u_n \lt 2\) strictly, but \(\ell \leq 2\) in the limit.`], note: NO25 },

    'f2025-ex6': { src: 'Exam Jan. 2025 · Ex 6', title: 'sin(nπ/3) diverges: two subsequences',
      intro: r`Consider the sequence \((u_n) = \left(\sin\left(\dfrac{n\pi}{3}\right)\right)\).`,
      questions: [r`What is the sequence \((u_{3n})\)?`, r`What does the sequence \((u_{6n+1})\) converge to?`, r`Is the sequence \((u_n)\) convergent? Justify, properly quoting a result from your course.`],
      hints: [r`\(\sin(n\pi) = 0\) and \(\sin\) is \(2\pi\)-periodic.`],
      solution: [
        { t: 'The subsequences', html: p(r`\(u_{3n} = \sin(n\pi) = 0\): \((u_{3n})\) is the zero sequence. \(u_{6n+1} = \sin\left(2n\pi + \dfrac{\pi}{3}\right) = \sin\dfrac{\pi}{3} = \dfrac{\sqrt{3}}{2}\): \((u_{6n+1})\) is constant and converges to \(\dfrac{\sqrt{3}}{2}\).`) },
        { t: 'Conclusion', html: model(p(r`If a sequence converges to \(\ell\), all its subsequences converge to \(\ell\). Now \((u_{3n})\) and \((u_{6n+1})\) are two subsequences of \((u_n)\) that converge to different limits, 0 and \(\dfrac{\sqrt{3}}{2}\). So \((u_n)\) diverges.`)) }],
      answer: p(r`\((u_n)\) diverges.`), traps: [r`“It oscillates so it diverges” is not a justification: quote the result on subsequences.`], note: NO25 }
  };
  R.i18n.patch(window.APIS_EX, T);
})();
