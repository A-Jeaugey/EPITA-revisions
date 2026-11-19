/* English text for data/apis/ex-suites.js (merged over the French cards by id, field by field).
   Same helpers as the French file (p, model, tbl) so the HTML keeps the same structure.
   Vocabulary of apis/cours-4-suites.en.html: sequence, rank, bounded above / below, increasing, strictly, monotonic,
   converges to, tends to, comparative growth, squeeze theorem, ratio criterion, arithmetic-geometric, induction
   (Base case / Inductive step / Conclusion), integer part. Decimal point. */
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
  var OFF = 'Follows the official Moodle answer key.';
  var CC = 'Test with no published answer key: answers written for the site.';
  var T = {

    /* ================================================================== Moodle 3.1: introduction */
    'mo-31-1': { src: 'Moodle · Introduction · ex. 1', title: 'n/(n + 3): bounded, monotonic',
      intro: r`Consider the sequence defined for \(n \in \N\) by \(u_n = \dfrac{n}{n + 3}\).`,
      questions: [r`Find an upper bound and a lower bound for this sequence. Is the sequence bounded?`, r`Study the monotonicity of \((u_n)\).`],
      hints: [r`\(n \geq 0\) and \(n \lt n + 3\).`, r`Sign of \(u_{n+1} - u_n\), after putting everything over a common denominator.`],
      solution: [
        { t: 'Bounds', html: p(r`Let \(n \in \N\). \(n \geq 0\) and \(n + 3 \gt 0\), so \(u_n \geq 0\): bounded below by 0. Also \(n \lt n + 3\), hence \(\dfrac{n}{n + 3} \leq 1\): bounded above by 1. Bounded below and above, the sequence is bounded.`) },
        { t: 'Monotonicity', html: p(r`\(u_{n+1} - u_n = \dfrac{n + 1}{n + 4} - \dfrac{n}{n + 3} = \dfrac{(n + 1)(n + 3) - n(n + 4)}{(n + 4)(n + 3)} = \dfrac{3}{(n + 4)(n + 3)} \gt 0\). The sequence is strictly increasing.`) }],
      answer: p(r`Bounded below by 0, bounded above by 1, so bounded; strictly increasing.`),
      traps: [r`\(u_{n+1} = \frac{n + 1}{n + 4}\): you replace \(n\) by \(n + 1\) in the numerator <b>and</b> in the denominator.`], note: OFF },

    'mo-31-2': { src: 'Moodle · Introduction · ex. 2', title: '(n − 4)/(7n − 22): bounded, not monotonic',
      intro: r`Consider the sequence \((u_n)_{n \in \N}\) defined by \(u_n = \dfrac{n - 4}{7n - 22}\). Is the sequence bounded? Is it monotonic?`,
      hints: [r`Compute \(u_0\) to \(u_4\) separately, then reason for \(n \geq 4\).`, r`For \(n \geq 5\), the terms are strictly positive: compare \(\dfrac{u_{n+1}}{u_n}\) with 1.`],
      solution: [
        { t: 'Well defined, bounded below', html: p(r`\(7n - 22 = 0\) has no integer solution (\(\frac{22}{7} \notin \N\)): the sequence is well defined. For \(n \geq 4\): \(n - 4 \geq 0\) and \(7n - 22 \geq 6\), so \(u_n \geq 0\). And \(u_0 = \frac{2}{11}\), \(u_1 = \frac{1}{5}\), \(u_2 = \frac{1}{4}\), \(u_3 = 1\): the sequence is bounded below by 0.`) },
        { t: 'Bounded above', html: p(r`\(7(n - 4) = 7n - 28 \lt 7n - 22\), so for \(n \geq 4\), \(u_n \leq \frac{1}{7}\). The first four terms are less than or equal to 1: 1 is an upper bound. The sequence is bounded.`) },
        { t: 'Monotonicity', html: p(r`For \(n \geq 5\), \(u_n \gt 0\) and \(\dfrac{u_{n+1}}{u_n} = \dfrac{n - 3}{7n - 15} \times \dfrac{7n - 22}{n - 4} = \dfrac{7n^2 - 43n + 66}{7n^2 - 43n + 60} \gt 1\), the denominator \((7n - 15)(n - 4)\) being positive. The sequence is strictly increasing from rank 5 on. But \(u_4 = 0 \lt u_3 = 1\): it is not increasing on \(\N\).`) }],
      answer: p(r`Bounded (between 0 and 1); not monotonic, but strictly increasing from rank 5 on.`),
      traps: [r`Concluding “increasing” from the ratio without looking at the first terms, where the ratio does not apply (\(u_4 = 0\)).`], note: OFF },

    'mo-31-3': { src: 'Moodle · Introduction · ex. 3', title: 'u₀ = 0, uₙ₊₁ = √(1 + uₙ): two inductions',
      intro: r`Consider the sequence defined by induction by \(u_0 = 0\) and \(u_{n+1} = \sqrt{1 + u_n}\).`,
      questions: [r`Show that the sequence \((u_n)\) is well defined for every \(n \in \N\) and that \(\forall n \in \N,\ 0 \leq u_n \leq 2\).`, r`Show that the sequence \((u_n)\) is increasing.`],
      hints: [r`Induction on the property “\(u_n\) is defined and \(0 \leq u_n \leq 2\)”.`, r`Induction on “\(u_n \lt u_{n+1}\)”: the square root is strictly increasing.`],
      solution: [
        { t: 'Well defined and bounded', html: model(p(r`\(\mathcal{P}_n\): “\(u_n\) is defined and \(0 \leq u_n \leq 2\)”. <b>Base case</b>: \(u_0 = 0\). <b>Inductive step</b>: if \(\mathcal{P}_n\) is true, \(1 \leq 1 + u_n \leq 3\), so \(\sqrt{1 + u_n}\) exists and \(1 \leq u_{n+1} \leq \sqrt{3}\). Since \(0 \leq 1\) and \(\sqrt{3} \leq 2\), \(0 \leq u_{n+1} \leq 2\). <b>Conclusion</b>: \(\mathcal{P}_n\) is true for every \(n\).`)) },
        { t: 'Increasing', html: model(p(r`\(\mathcal{P}_n\): “\(u_n \lt u_{n+1}\)”. <b>Base case</b>: \(u_1 = 1 \gt u_0\). <b>Inductive step</b>: if \(u_n \lt u_{n+1}\), then \(1 + u_n \lt 1 + u_{n+1}\), so \(\sqrt{1 + u_n} \lt \sqrt{1 + u_{n+1}}\), that is \(u_{n+1} \lt u_{n+2}\). <b>Conclusion</b>: the sequence is strictly increasing.`)) }],
      answer: p(r`Two inductions. The sequence is increasing and bounded above by 2.`),
      traps: [r`Forgetting to justify that \(1 + u_n \geq 0\) before writing the square root: that is the meaning of “well defined”.`], note: OFF },

    /* ================================================================== Moodle 3.2: limits */
    'mo-32-1': { src: 'Moodle · Limits · ex. 1', title: '1/n² converges: from the definition',
      intro: r`Establish, going back to the definition of a limit, that the sequence defined for every \(n \in \N^{\star}\) by \(u_n = \dfrac{1}{n^2}\) converges.`,
      hints: [r`Fix \(\varepsilon \gt 0\) and look for the rank \(n\) from which \(\frac{1}{n^2} \leq \varepsilon\).`],
      solution: [{ t: 'With ε', html: model(p(r`Let us show that the sequence converges to 0. Let \(\varepsilon \gt 0\). \(|u_n - 0| = \dfrac{1}{n^2}\), and \(\dfrac{1}{n^2} \leq \varepsilon \iff n^2 \geq \dfrac{1}{\varepsilon} \iff n \geq \dfrac{1}{\sqrt{\varepsilon}}\).`) + p(r`Let \(N = E\left(\dfrac{1}{\sqrt{\varepsilon}}\right) + 1\). Then \(n \geq N \Rightarrow |u_n - 0| \leq \varepsilon\). So \((u_n)\) converges to 0.`)) }],
      answer: p(r`The structure to reproduce: “Let \(\varepsilon \gt 0\)”; solve \(|u_n - \ell| \leq \varepsilon\); exhibit a rank \(N\); conclude.`),
      traps: [r`Choosing a particular \(\varepsilon\): it must stay arbitrary.`], note: OFF },

    'mo-32-2': { src: 'Moodle · Limits · ex. 2 and 3', title: 'Two indeterminate forms',
      intro: r`Find the limit of the sequences defined by:`,
      questions: [r`\(u_n = \dfrac{2 + n - n^2}{n^2 + 3n + 4}\).`, r`\(u_n = \dfrac{e^n - n^2}{n + \ln(n)}\).`],
      hints: [r`Factor out the dominant term in the numerator and the denominator: \(n^2\), then \(e^n\) and \(n\).`, r`Comparative growth: \(\frac{n^2}{e^n} \to 0\), \(\frac{\ln n}{n} \to 0\), \(\frac{e^n}{n} \to +\infty\).`],
      solution: [
        { t: 'Quotient of polynomials', html: p(r`\(u_n = \dfrac{\frac{2}{n^2} + \frac{1}{n} - 1}{1 + \frac{3}{n} + \frac{4}{n^2}}\). The numerator tends to \(-1\), the denominator to 1: \(\lim u_n = -1\).`) },
        { t: 'Comparative growth', html: p(r`\(u_n = \dfrac{e^n}{n} \times \dfrac{1 - \frac{n^2}{e^n}}{1 + \frac{\ln(n)}{n}}\). By comparative growth, the second factor tends to 1 and \(\dfrac{e^n}{n} \to +\infty\): \(\lim u_n = +\infty\).`) }],
      answer: p(r`\(-1\); \(+\infty\).`), traps: [r`The sign: the dominant term of the numerator is \(-n^2\).`], note: OFF },

    'mo-32-4': { src: 'Moodle · Limits · ex. 4', title: 'Squeeze theorem',
      intro: r`Find the limit of the sequence defined for every \(n \in \N\) by \(u_n = \dfrac{2n + (-1)^n}{n^2 + \cos(n)}\).`,
      hints: [r`Bound the numerator and the denominator separately.`, r`To bound the quotient: small numerator over large denominator on the left, the reverse on the right.`],
      solution: [{ t: 'Bounds', html: model(p(r`\(2n - 1 \leq 2n + (-1)^n \leq 2n + 1\) and \(n^2 - 1 \leq n^2 + \cos(n) \leq n^2 + 1\). For \(n \geq 2\): \(\dfrac{2n - 1}{n^2 + 1} \leq u_n \leq \dfrac{2n + 1}{n^2 - 1}\).`) + p(r`Now \(\dfrac{2n - 1}{n^2 + 1} = \dfrac{2 - \frac{1}{n}}{n + \frac{1}{n}} \to 0\) and \(\dfrac{2n + 1}{n^2 - 1} \to 0\). By the squeeze theorem, \(\lim u_n = 0\).`)) }],
      answer: p(r`\(\lim u_n = 0\).`), traps: [r`The bounds only make sense for \(n \geq 2\) (denominator \(n^2 - 1 \gt 0\)): say so.`], note: OFF },

    'mo-32-5': { src: 'Moodle · Limits · ex. 5', title: 'Tends to +∞ without being monotonic',
      intro: r`Let \(u_n = \sqrt{n}\) if \(n\) is even and \(u_n = n^2\) if \(n\) is odd.`,
      questions: [r`Find the limit of the sequence.`, r`Is the sequence monotonic?`],
      hints: [r`Bound \(u_n\) below by the same sequence in both cases.`],
      solution: [
        { t: 'Comparison', html: p(r`For \(n \in \N\), \(n^2 \geq n \geq \sqrt{n}\). Whether \(n\) is even or odd, \(u_n \geq \sqrt{n}\). Since \(\sqrt{n} \to +\infty\), by comparison \(\lim u_n = +\infty\).`) },
        { t: 'Not monotonic', html: p(r`If \(n\) is even, \(u_n = \sqrt{n} \leq n^2 \lt (n + 1)^2 = u_{n+1}\). If \(n\) is odd, \(n \geq 3\): \(u_n = n^2 \gt 2n \gt n + 1 \gt \sqrt{n + 1} = u_{n+1}\). The sequence goes up then down: it is not monotonic.`) }],
      answer: p(r`\(\lim u_n = +\infty\); not monotonic.`), traps: [r`“Tends to \(+\infty\)” does not imply “increasing”.`], note: OFF },

    /* ================================================================== Moodle 3.3: remarkable examples */
    'mo-33-1': { src: 'Moodle · Remarkable examples · ex. 1', title: 'Arithmetic-geometric sequence',
      intro: r`Let \((u_n)\) be defined by \(u_0 = 0\) and, for every \(n \in \N\), \(u_{n+1} = \dfrac{3 + u_n}{2}\).`,
      questions: [r`Find a real number \(l\) such that the sequence \((v_n) = (u_n - l)\) is geometric.`, r`Deduce the behaviour of \((u_n)\).`],
      hints: [r`Express \(v_{n+1}\) in terms of \(v_n\), with \(u_n = v_n + l\).`],
      solution: [
        { t: 'The right l', html: p(r`\(v_{n+1} = u_{n+1} - l = \dfrac{u_n + 3}{2} - l = \dfrac{v_n + l + 3}{2} - l = \dfrac{v_n + 3 - l}{2}\). For \(l = 3\): \(v_{n+1} = \frac{1}{2}v_n\), geometric with common ratio \(\frac{1}{2}\).`) },
        { t: 'The limit', html: p(r`\(\left|\frac{1}{2}\right| \lt 1\), so \(\lim v_n = 0\). Since \(u_n = v_n + 3\), \(\lim u_n = 3\). Explicitly: \(v_0 = -3\), \(u_n = 3 - \dfrac{3}{2^n}\).`) }],
      answer: p(r`\(l = 3\) (the fixed point: \(l = \frac{3 + l}{2}\)); \((u_n)\) converges to 3.`), traps: [r`\(l\) is the solution of \(l = \frac{3 + l}{2}\): find it this way on scratch paper.`], note: OFF },

    'mo-33-2': { src: 'Moodle · Remarkable examples · ex. 2', title: 'Ratio criterion with factorials',
      intro: r`Study the limit of the sequence \((u_n) = \left(\dfrac{3^n (n!)^2}{(2n)!}\right)_{n \in \N}\) (study \(\dfrac{u_{n+1}}{u_n}\)).`,
      hints: [r`\((n + 1)! = (n + 1)\,n!\) and \((2n + 2)! = (2n + 2)(2n + 1)(2n)!\).`, r`The ratio tends to \(\frac{3}{4}\): find a rank from which it is less than \(\frac{4}{5}\).`],
      solution: [
        { t: 'The ratio', html: p(r`\(u_n \gt 0\). \(\dfrac{u_{n+1}}{u_n} = \dfrac{3(n + 1)^2}{(2n + 2)(2n + 1)} = \dfrac{3(n + 1)}{2(2n + 1)}\), which tends to \(\dfrac{3}{4}\).`) },
        { t: 'A fixed ℓ', html: p(r`\(\dfrac{3(n + 1)}{2(2n + 1)} \lt \dfrac{4}{5} \iff 15n + 15 \lt 16n + 8 \iff n \gt 7\). For \(n \gt 7\): \(0 \lt \dfrac{u_{n+1}}{u_n} \lt \dfrac{4}{5} \lt 1\). By the theorem, the sequence tends to 0.`) }],
      answer: p(r`\(\lim u_n = 0\).`), traps: [r`“The ratio tends to \(\frac{3}{4}\) so the sequence tends to \(\frac{3}{4}\)”: false. It is the ratio that is below 1, and the sequence tends to 0.`], note: OFF },

    'mo-33-3': { src: 'Moodle · Remarkable examples · ex. 3', title: '0.111…1: a geometric sum',
      intro: r`Let \((u_n)\) be the sequence defined for \(n \geq 1\) by \(u_n = 0.1111\cdots1\) (with the digit 1 repeated \(n\) times after the decimal point).`,
      questions: [r`Find the limit \(a\) of the sequence \((u_n)\).`, r`Show that \(\forall n \in \N^{\star},\ u_n = \dfrac{E(10^n a)}{10^n}\).`],
      hints: [r`\(u_n = \displaystyle\sum_{k=1}^{n} 10^{-k}\).`, r`Write \(a = u_n + \) a remainder, then multiply by \(10^n\).`],
      solution: [
        { t: 'The sum', html: p(r`\(u_n = \displaystyle\sum_{k=1}^{n} 10^{-k} = \frac{1}{10}\sum_{k=0}^{n-1} \left(\frac{1}{10}\right)^k = \frac{1}{10} \times \frac{1 - \left(\frac{1}{10}\right)^n}{1 - \frac{1}{10}} = \frac{1 - 10^{-n}}{9}\). So \((u_n)\) converges to \(a = \dfrac{1}{9}\).`) },
        { t: 'The integer part', html: p(r`\(a = u_n + \dfrac{1}{9 \times 10^n}\), so \(10^n a = 10^n u_n + \dfrac{1}{9}\). Now \(10^n u_n\) is an integer (\(u_n\) has \(n\) decimal places) and \(\frac{1}{9} \in [0, 1[\). So \(E(10^n a) = 10^n u_n\), hence the result.`) }],
      answer: p(r`\(a = \dfrac{1}{9}\).`), traps: [r`\(n\) terms: the exponent in the formula is \(n\).`], note: OFF },

    /* ================================================================== Tutorial 4 */
    'td4-1-1': { src: 'Tutorial 4 · ex. 1.1', title: 'Ten definitions with quantifiers, and an example for each',
      intro: r`Give the definition, with quantifiers, of the properties listed, then give examples of sequences satisfying them: constant; stationary; bounded above, bounded below; bounded; increasing, decreasing, then strictly; converging to \(\ell \in \R\), then convergent; tending to \(+\infty\), \(-\infty\); having no limit; bounded and not convergent; strictly increasing and bounded.`,
      hints: [r`The order of the quantifiers: the constant (\(M\), \(C\), \(N\)) comes before \(n\).`, r`“Convergent”: there <b>exists</b> \(\ell\) such that the sequence converges to \(\ell\).`],
      solution: [{ t: 'The table to know by heart', html: tbl(['Property', 'Definition', 'Example'], [
        ['constant', r`\(\exists C \in \R,\ \forall n \in \N,\ u_n = C\)`, r`\(u_n = 2\)`],
        ['stationary', r`\(\exists N \in \N,\ \forall n \geq N,\ u_n = u_N\)`, r`\(u_0 = 1\), \(u_n = 0\) for \(n \geq 1\)`],
        ['bounded above', r`\(\exists M \in \R,\ \forall n \in \N,\ u_n \leq M\)`, r`\(u_n = 3 - n\)`],
        ['bounded below', r`\(\exists m \in \R,\ \forall n \in \N,\ m \leq u_n\)`, r`\(u_n = n^2\)`],
        ['bounded', r`\(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\)`, r`\(u_n = (-1)^n\)`],
        ['increasing', r`\(\forall n \in \N,\ u_{n+1} \geq u_n\)`, r`\(u_n = n\)`],
        ['strictly decreasing', r`\(\forall n \in \N,\ u_{n+1} \lt u_n\)`, r`\(u_n = -n\)`],
        [r`converges to \(\ell\)`, r`\(\forall \varepsilon \gt 0,\ \exists N \in \N,\ \forall n \geq N,\ |u_n - \ell| \lt \varepsilon\)`, r`\(u_n = \frac{1}{n + 1}\), \(\ell = 0\)`],
        ['convergent', r`\(\exists \ell \in \R,\ \forall \varepsilon \gt 0,\ \exists N \in \N,\ \forall n \geq N,\ |u_n - \ell| \lt \varepsilon\)`, r`\(u_n = 2 + \frac{1}{n + 1}\)`],
        [r`tends to \(+\infty\)`, r`\(\forall A \in \R,\ \exists N \in \N,\ \forall n \geq N,\ u_n \gt A\)`, r`\(u_n = n\)`],
        [r`tends to \(-\infty\)`, r`\(\forall A \in \R,\ \exists N \in \N,\ \forall n \geq N,\ u_n \lt A\)`, r`\(u_n = -n^2\)`],
        ['no limit', 'neither convergent, nor with an infinite limit', r`\(u_n = (-1)^n\)`],
        ['bounded and not convergent', '', r`\(u_n = (-1)^n\)`],
        ['strictly increasing and bounded', '', r`\(u_n = \frac{n}{n + 1}\)`]]) }],
      answer: p(r`An example is justified in one line: for \(\left(\frac{n}{n + 1}\right)\), \(0 \leq u_n \lt 1\) and \(u_{n+1} - u_n = \frac{1}{(n + 1)(n + 2)} \gt 0\).`),
      traps: [r`Giving a constant sequence when the question says “non-constant”.`, r`“Bounded below and above” or “\(|u_n| \leq M\)”: both definitions of “bounded” are accepted, the second is shorter.`], note: NOCOR },

    'td4-1-2': { src: 'Tutorial 4 · ex. 1.2', title: 'Classic counterexamples',
      intro: r`Classic counterexamples.`,
      questions: [r`Give an example of a sequence tending to \(+\infty\) but not increasing.`, r`Same question with the extra condition: for every \(n_0 \in \N\), the sequence is not increasing on \([\![n_0, +\infty[\![\).`, r`Give examples of sequences that are not bounded above but do not tend to \(+\infty\).`, r`Give an example of a sequence that is neither bounded above nor bounded below, and explain why such a sequence cannot have a limit.`],
      hints: [r`Add to \(n\) something that oscillates: \((-1)^n\) times a constant.`, r`Question 3: a sequence that equals 0 every other rank.`],
      solution: [
        { t: 'To +∞ without increasing', html: p(r`\(u_n = n + 2(-1)^n\) answers the first two questions. \(u_n \geq n - 2\), so \(u_n \to +\infty\) by comparison. But for every \(k\), \(u_{2k} = 2k + 2 \gt u_{2k+1} = 2k - 1\): the sequence goes back down at every odd rank, however far you go.`) },
        { t: 'Not bounded above, without tending to +∞', html: p(r`\(u_n = n\left(1 + (-1)^n\right)\): \(u_{2k} = 4k\) (not bounded above) and \(u_{2k+1} = 0\) (it keeps coming back to 0). Another example: \(u_n = (-1)^n n\).`) },
        { t: 'Neither bounded above nor bounded below', html: p(r`\(u_n = (-1)^n n\): \(u_{2k} = 2k\), \(u_{2k+1} = -(2k + 1)\). Such a sequence has no limit: if it converged, it would be bounded; if it tended to \(+\infty\), it would be positive from some rank \(n_0\) on, hence bounded below by \(\min(u_0, \ldots, u_{n_0 - 1}, 0)\); likewise, if it tended to \(-\infty\), it would be bounded above.`) }],
      answer: p(r`\(n + 2(-1)^n\); \(n(1 + (-1)^n)\); \((-1)^n n\).`), traps: [r`Test your example on three or four terms. \(n + (-1)^n\) also works (\(u_0 = 1 \gt u_1 = 0\)); but \(n + \frac{(-1)^n}{2}\) is increasing (\(u_0 = u_1 = \frac{1}{2}\)): the oscillation is too small.`], note: NOCOR },

    'td4-2-3': { src: 'Tutorial 4 · ex. 2.3', title: 'Geometric and arithmetic-geometric sequences',
      intro: r`Around geometric sequences.`,
      questions: [r`Let \(q \in \R\). Recall \(\displaystyle\lim_{n \to +\infty} q^n\) as a function of \(q\), as well as \(\displaystyle\sum_{k=0}^{n} q^k\).`, r`Discuss the sign of a geometric sequence with common ratio \(q \in \R\).`,
        r`Let \((u_n)\) be defined by \(u_0 \in \R\) and \(\forall n \in \N,\ u_{n+1} = \dfrac{u_n + 4}{5}\). (a) For which values of \(u_0\) is the sequence constant? Which equation did you solve? (b) Call this value \(\ell\). Show that \((v_n) = (u_n - \ell)\) is geometric and give its common ratio. (c) Take \(u_0 = 5\). Express \(u_n\) in terms of \(n\). What is \(\lim u_n\)? (d) Compute \(S = \displaystyle\sum_{k=0}^{5} u_k\).`],
      hints: [r`Four cases for \(q^n\): \(q \gt 1\), \(q = 1\), \(|q| \lt 1\), \(q \leq -1\).`, r`(d) Split: \(u_k = 1 + \frac{4}{5^k}\), six terms.`],
      solution: [
        { t: 'Reminders', html: p(r`\(q \gt 1\): \(q^n \to +\infty\). \(q = 1\): \(q^n \to 1\). \(-1 \lt q \lt 1\): \(q^n \to 0\). \(q \leq -1\): no limit. \(\displaystyle\sum_{k=0}^{n} q^k = \frac{1 - q^{n+1}}{1 - q}\) if \(q \neq 1\), and \(n + 1\) if \(q = 1\).`) },
        { t: 'Sign', html: p(r`\(u_n = u_0 q^n\). If \(u_0 = 0\) or \(q = 0\): zero (from rank 1 on). If \(q \gt 0\): all the terms have the sign of \(u_0\). If \(q \lt 0\): the sign alternates, that of \(u_0\) at even ranks.`) },
        { t: 'The arithmetic-geometric sequence', html: model(p(r`(a) Constant \(\iff u_0 = \frac{u_0 + 4}{5} \iff u_0 = 1\). This is the fixed point equation \(\ell = \frac{\ell + 4}{5}\).`) + p(r`(b) \(v_{n+1} = \frac{u_n + 4}{5} - 1 = \frac{u_n - 1}{5} = \frac{1}{5}v_n\): geometric with common ratio \(\frac{1}{5}\).`) + p(r`(c) \(v_0 = 4\), \(v_n = \frac{4}{5^n}\), \(u_n = 1 + \frac{4}{5^n}\), and \(\lim u_n = 1\).`) + p(r`(d) \(S = 6 + 4 \times \dfrac{1 - \frac{1}{5^6}}{1 - \frac{1}{5}} = 6 + 5\left(1 - \frac{1}{15\,625}\right) = 11 - \frac{1}{3125}\).`)) }],
      answer: p(r`\(\ell = 1\); common ratio \(\frac{1}{5}\); \(u_n = 1 + \dfrac{4}{5^n}\); \(S = 11 - \dfrac{1}{3125} = \dfrac{34\,374}{3125}\).`), traps: [r`From \(k = 0\) to \(k = 5\) there are 6 terms: the sum of the “1”s is 6 and the exponent is 6.`], note: NOCOR },

    'td4-2-4': { src: 'Tutorial 4 · ex. 2.4', title: 'The rumour: modelling with a sequence',
      intro: r`A rumour spreads: each time a student passes the information on to a neighbour, they have a probability \(p \in\ ]0, 1[\) of passing on what they heard, and \(1 - p\) of passing on exactly the opposite. Let \(\pi_n\) be the probability that a student has the correct information after \(n\) transmissions (\(\pi_0 = 1\)).`,
      questions: [r`For \(n \in \N\), find the relation between \(\pi_{n+1}\) and \(\pi_n\).`, r`Deduce an explicit formula for \(\pi_n\).`, r`What is the limit of \(\pi_n\)?`],
      hints: [r`Student \(n + 1\) has the correct information if the previous one had it and passed it on correctly, or if they had the wrong one and reversed it.`, r`Arithmetic-geometric sequence: look for the fixed point.`],
      solution: [
        { t: 'The relation', html: p(r`By the law of total probability: \(\pi_{n+1} = p\,\pi_n + (1 - p)(1 - \pi_n) = (2p - 1)\pi_n + 1 - p\).`) },
        { t: 'The formula', html: p(r`Fixed point: \(\ell = (2p - 1)\ell + 1 - p \iff 2(1 - p)\ell = 1 - p \iff \ell = \frac{1}{2}\). The sequence \(\left(\pi_n - \frac{1}{2}\right)\) is geometric with common ratio \(2p - 1\) and first term \(\frac{1}{2}\): \(\pi_n = \dfrac{1}{2} + \dfrac{1}{2}(2p - 1)^n\).`) },
        { t: 'The limit', html: p(r`\(0 \lt p \lt 1\) gives \(-1 \lt 2p - 1 \lt 1\), so \((2p - 1)^n \to 0\) and \(\pi_n \to \dfrac{1}{2}\).`) }],
      answer: p(r`\(\pi_n = \dfrac{1}{2} + \dfrac{1}{2}(2p - 1)^n \to \dfrac{1}{2}\): after many relays, the information is worth no more than a coin toss.`), traps: [r`Forgetting the case “wrong information, reversed”: it gives the correct one back.`], note: NOCOR },

    'td4-3-6': { src: 'Tutorial 4 · ex. 3.6', title: 'Bounding a sum: squeeze',
      intro: r`Consider the sequence \((u_n)_{n \in \N^*}\) defined by \(u_n = \displaystyle\sum_{k=1}^{n} \frac{1}{n^2 + k}\).`,
      questions: [r`Show that \((u_n)\) converges, and give its limit.`, r`Show that \((n\,u_n)\) converges, and give its limit.`],
      hints: [r`Bound each term by the smallest and the largest, then multiply by the number of terms.`],
      solution: [
        { t: 'Bounds', html: model(p(r`For \(1 \leq k \leq n\): \(n^2 + 1 \leq n^2 + k \leq n^2 + n\), so \(\dfrac{1}{n^2 + n} \leq \dfrac{1}{n^2 + k} \leq \dfrac{1}{n^2 + 1}\). Summing the \(n\) terms: \(\dfrac{n}{n^2 + n} \leq u_n \leq \dfrac{n}{n^2 + 1}\).`) + p(r`The two bounding sequences tend to 0: by the squeeze theorem, \(\lim u_n = 0\).`)) },
        { t: 'n uₙ', html: p(r`Multiplying by \(n \gt 0\): \(\dfrac{n^2}{n^2 + n} \leq n\,u_n \leq \dfrac{n^2}{n^2 + 1}\). Both sequences tend to 1: \(\lim n\,u_n = 1\).`) }],
      answer: p(r`\(\lim u_n = 0\); \(\lim n\,u_n = 1\).`), traps: [r`Taking the inverse reverses the inequalities: the largest denominator gives the smallest term.`, r`The limit of a sum whose number of terms grows cannot be computed term by term.`], note: NOCOR },

    /* ================================================================== course tests on sequences */
    'cc2023n-asi': { src: 'Course test Nov. 2023 · sequences', title: 'The 2023 “sequences” course test, in full',
      intro: r`Course test of 27 November 2023, ASI part: 15 minutes, 10 points. Let \((u_n)\) be a real sequence defined on \(\N\).`,
      questions: [r`<b>Lesson 1: definitions (5 points).</b> (a) Give the mathematical definition (with quantifiers) of “\((u_n)\) is bounded”. (b) Give an example of a non-constant bounded sequence.`,
        r`(a) Give the definition (with quantifiers) of “\((u_n)\) is increasing”. (b) What does it mean for \((u_n)\) to be monotonic? (c) Give an example of a sequence that is neither increasing nor decreasing.`,
        r`<b>Lesson 2: convergence or divergence (5 points).</b> Justified answers. Are the following sequences convergent? If so, give the limit. \(u_n = \cos(n)\); \(v_n = \ln(n^2 + n)\); \(w_n = \left(-\dfrac{2}{3}\right)^n\); \(x_n = 1 + \dfrac{1}{n}\).`,
        r`Give an example of a non-constant sequence converging to 2. Do not justify.`],
      hints: [r`Bounded: \(\exists M\), then \(\forall n\).`, r`\(w\) is geometric: look at \(|q|\).`],
      solution: [
        { t: 'Lesson 1', html: model(p(r`\((u_n)\) is bounded: \(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\). Example: \(u_n = (-1)^n\), since \(|u_n| \leq 1\).`) + p(r`\((u_n)\) is increasing: \(\forall n \in \N,\ u_{n+1} \geq u_n\). \((u_n)\) is monotonic: it is increasing or decreasing. Example of a sequence that is neither increasing nor decreasing: \(u_n = (-1)^n\), since \(u_0 \gt u_1\) and \(u_1 \lt u_2\).`)) },
        { t: 'Lesson 2', html: model(p(r`\((\cos(n))\) does not converge: it is bounded but has no limit (its terms keep oscillating in \([-1, 1]\)).`) + p(r`\(n^2 + n \to +\infty\) and \(\ln(x) \to +\infty\) as \(x \to +\infty\): \(v_n \to +\infty\), the sequence diverges.`) + p(r`\((w_n)\) is geometric with common ratio \(-\frac{2}{3}\), and \(\left|-\frac{2}{3}\right| \lt 1\): it converges to 0.`) + p(r`\(\frac{1}{n} \to 0\), so \(x_n \to 1\): the sequence converges to 1.`) + p(r`Example: \(u_n = 2 + \dfrac{1}{n + 1}\).`)) }],
      answer: p(r`No; no (\(+\infty\)); yes, 0; yes, 1.`),
      traps: [r`“Convergent?” for a sequence that tends to \(+\infty\): the answer is no.`, r`For \(\cos(n)\), “bounded” is not enough to conclude: a bounded sequence may or may not converge. The divergence of \((\cos n)\) is accepted at this level; say so clearly rather than inventing a proof.`], note: CC },

    'cc2022d-ex5': { src: 'Course test Dec. 2022 · Ex 5', title: 'Definitions, three examples, the sequence (qⁿ)',
      intro: r`Course test of 5 December 2022, exercise 5 (6 points). Let \((u_n)\) be a sequence.`,
      questions: [r`Recall the mathematical definitions (with quantifiers) of: (a) \((u_n)\) is increasing; (b) \((u_n)\) is bounded.`,
        r`Give an example of a (non-constant) sequence that is: (a) divergent (justify briefly); (b) bounded above by 3 (justify briefly); (c) strictly increasing and convergent (justify properly).`,
        r`Let \(q \in \R\) and \((u_n) = (q^n)\). Give a necessary and sufficient condition on \(q\) for the sequence to converge. Give the limit in that case.`],
      hints: [r`(c) A negative sequence that climbs back towards 0.`, r`Watch both edges: \(q = 1\) and \(q = -1\).`],
      solution: [
        { t: 'Definitions', html: p(r`Increasing: \(\forall n \in \N,\ u_{n+1} \geq u_n\). Bounded: \(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\).`) },
        { t: 'Examples', html: model(p(r`(a) \(u_n = n\): it tends to \(+\infty\), so it diverges.`) + p(r`(b) \(u_n = 3 - n\): for every \(n \in \N\), \(3 - n \leq 3\).`) + p(r`(c) \(u_n = -\dfrac{1}{n + 1}\). \(u_{n+1} - u_n = \dfrac{1}{n + 1} - \dfrac{1}{n + 2} = \dfrac{1}{(n + 1)(n + 2)} \gt 0\): strictly increasing. And \(\dfrac{1}{n + 1} \to 0\), so \(u_n \to 0\): convergent.`)) },
        { t: '(qⁿ)', html: p(r`\((q^n)\) converges if and only if \(-1 \lt q \leq 1\). If \(-1 \lt q \lt 1\), the limit is 0; if \(q = 1\), the sequence is constant equal to 1 and the limit is 1.`) }],
      answer: p(r`\(-1 \lt q \leq 1\); limit 0 if \(|q| \lt 1\), 1 if \(q = 1\).`),
      traps: [r`Writing “\(|q| \lt 1\)”: you forget \(q = 1\), which converges.`, r`“Justify properly”: the difference \(u_{n+1} - u_n\) computed, not “we can see that”.`], note: CC }
  };
  R.i18n.patch(window.APIS_EX, T);
})();
