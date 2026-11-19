/* English text for data/apis/ex-integrales.js (merged over the French cards by id, field by field).
   Same helpers as the French file (p, ol, model, tbl) so the HTML keeps the same structure.
   Vocabulary of apis/cours-*.en.html: primitive, bounds, rectangle method, lower / upper rectangles, integration by
   parts (IBP), change of variable, Chasles’ relation, half-disc, flat segment, unit of area. Decimal point. */
(function () {
  var R = window.REV;
  var r = String.raw;
  function p(s) { return '<p>' + s + '</p>'; }
  function ol(a) { return '<ol>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  function model(html, tag) { return '<div class="model"><span class="tag">' + (tag || 'Model answer') + '</span>' + html + '</div>'; }
  function tbl(head, rows, cap) {
    return '<div class="tbl"><table>' + (cap ? '<caption>' + cap + '</caption>' : '') + '<thead><tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (rr) { return '<tr>' + rr.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  var NOCOR = 'Tutorial published without an answer key: the solution was written for the site and the results were recomputed by program.';
  var OFF = 'Follows the official Moodle answer key.';
  var T = {

    /* ================================================================== Moodle 2.1: primitives */
    'mo-21-1': { src: 'Moodle · Primitives · ex. 1', title: 'A primitive from the table',
      intro: r`Find a primitive \(F\) on \(\R^{\star}\) of the function \(f\) defined by \(f(x) = e^{2x} + 5x^2 + \dfrac{1}{x} + 5\cos(2x)\).`,
      hints: [r`By linearity, find a primitive of each term separately.`, r`\(e^{kx}\) has the primitive \(\dfrac{e^{kx}}{k}\); \(\cos(kx)\) has the primitive \(\dfrac{\sin(kx)}{k}\).`],
      solution: [{ t: 'Term by term', html: p(r`On \(\R^{\star}\): a primitive of \(x \mapsto e^{kx}\) is \(x \mapsto \dfrac{e^{kx}}{k}\); of \(x \mapsto x^n\), \(x \mapsto \dfrac{x^{n+1}}{n+1}\); of \(x \mapsto \dfrac{1}{x}\), \(x \mapsto \ln|x|\); of \(x \mapsto \cos(2x)\), \(x \mapsto \dfrac{\sin(2x)}{2}\).`) }],
      answer: p(r`\(F(x) = \dfrac{e^{2x}}{2} + \dfrac{5}{3}x^3 + \ln|x| + \dfrac{5}{2}\sin(2x)\).`),
      traps: [r`On \(\R^{\star}\), the primitive of \(\frac{1}{x}\) is \(\ln|x|\), with the absolute value.`, r`Forgetting to divide by 2 for \(e^{2x}\) and \(\cos(2x)\).`], note: OFF },

    'mo-21-2': { src: 'Moodle · Primitives · ex. 2', title: 'Three primitives of the form u′ × g(u)',
      intro: r`Find a primitive of the function \(f\) in each of the following cases.`,
      questions: [r`\(f(x) = \dfrac{2x - 1}{\sqrt{x^2 - x + 1}}\).`, r`\(f(x) = \tan(x)\).`, r`\(f(x) = \cos(x)\sqrt{e^{3\sin(x)}}\).`],
      hints: [r`Look for \(u\) whose derivative appears as a factor: \(x^2 - x + 1\), then \(\cos(x)\), then \(\frac{3}{2}\sin(x)\).`, r`\(\sqrt{e^{a}} = e^{a/2}\).`],
      solution: [
        { t: 'The form u′/√u', html: p(r`Let \(u(x) = x^2 - x + 1\); \(u'(x) = 2x - 1\). Then \(f(x) = \dfrac{u'(x)}{\sqrt{u(x)}}\), which has the primitive \(2\sqrt{u}\): \(F(x) = 2\sqrt{x^2 - x + 1}\), on \(\R\).`) },
        { t: 'The form u′/u', html: p(r`Let \(u(x) = \cos(x)\). \(f(x) = \dfrac{\sin(x)}{\cos(x)} = -\dfrac{u'(x)}{u(x)}\), with the primitive \(F(x) = -\ln|\cos(x)|\), on an interval where the cosine does not vanish.`) },
        { t: 'The form u′eᵘ', html: p(r`\(f(x) = \cos(x)\,e^{\frac{3}{2}\sin(x)}\). Let \(u(x) = \frac{3}{2}\sin(x)\): \(f(x) = \frac{2}{3}u'(x)e^{u(x)}\). So \(F(x) = \frac{2}{3}e^{\frac{3}{2}\sin(x)} = \frac{2}{3}\sqrt{e^{3\sin(x)}}\), on \(\R\).`) }],
      answer: p(r`\(2\sqrt{x^2 - x + 1}\); \(-\ln|\cos(x)|\); \(\frac{2}{3}\sqrt{e^{3\sin(x)}}\).`),
      traps: [r`The sign of \(\tan\): \(\cos' = -\sin\), hence the minus sign in front of the logarithm.`, r`Forgetting to adjust the constant: the factor \(\frac{3}{2}\) is missing to get \(u'\), so you compensate with \(\frac{2}{3}\).`], note: OFF },

    /* ================================================================== Tutorial 3, part 1 */
    'td3-1-2': { src: 'Tutorial 3 · ex. 1.2', title: 'The two tables, then seven primitives',
      intro: r`After filling in the two tables of standard primitives (they are in lesson 1), find a primitive of each of the following functions on an interval \(I\) that you must specify.`,
      questions: [
        r`Applications of table 1: \(f(x) = x\sqrt{x}\) on \(\R_+\); \(g(x) = \dfrac{3}{x} - 5x + 6x^4\) on \(\R_+^*\); \(h(x) = -3\sin(x) + 2e^x\) on \(\R\). Can you find a primitive on \(\R\) of \(x \mapsto e^{2x}\)? Of \(x \mapsto e^{x^2}\)?`,
        r`\(f(x) = \sin(2x)\), \(g(x) = \cos\left(\dfrac{x}{2}\right)\) and \(h(x) = e^{6x - 7}\).`,
        r`\(f_1(x) = \dfrac{3x}{x^2 + 1} - 5x\); \(f_2(x) = 4(9x^2 + 3)(x^3 + x + 1)^2\); \(f_3(x) = \dfrac{4x + 8}{\sqrt{x^2 + 4x + 1}}\); \(f_4(x) = \dfrac{\sin(2x + 1)}{\cos^2(2x + 1)}\).`,
        r`\(f_5(x) = \tan(x)\); \(f_6(x) = (x^3 + 1)e^{x^4 + 4x}\); \(f_7(x) = \dfrac{9}{1 + x^2}\).`],
      hints: [r`\(x\sqrt{x} = x^{3/2}\).`, r`For each \(f_k\), name \(u\), compute \(u'\), then compare with what you have: a constant is often missing.`],
      solution: [
        { t: 'Table 1', html: p(r`\(x\sqrt{x} = x^{3/2}\): \(F(x) = \frac{2}{5}x^{5/2}\). \(G(x) = 3\ln(x) - \frac{5}{2}x^2 + \frac{6}{5}x^5\). \(H(x) = 3\cos(x) + 2e^x\).`) + p(r`\(x \mapsto e^{2x}\) has the primitive \(\frac{1}{2}e^{2x}\). For \(x \mapsto e^{x^2}\): the factor \(u' = 2x\) is missing, and no standard form is recognisable. A primitive exists (the function is continuous) but it cannot be written with the standard functions.`) },
        { t: 'Functions of ax + b', html: p(r`\(-\frac{1}{2}\cos(2x)\); \(2\sin\left(\frac{x}{2}\right)\); \(\frac{1}{6}e^{6x - 7}\), on \(\R\). You divide by the coefficient of \(x\).`) },
        { t: 'Composite forms', html: tbl(['Function', r`\(u\) and the form`, 'A primitive', 'On'], [
          [r`\(f_1\)`, r`\(u = x^2 + 1\): \(\frac{3}{2}\cdot\frac{u'}{u}\)`, r`\(\frac{3}{2}\ln(x^2 + 1) - \frac{5}{2}x^2\)`, r`\(\R\)`],
          [r`\(f_2\)`, r`\(u = x^3 + x + 1\), \(u' = 3x^2 + 1\): \(12\,u'u^2\)`, r`\(4(x^3 + x + 1)^3\)`, r`\(\R\)`],
          [r`\(f_3\)`, r`\(u = x^2 + 4x + 1\), \(u' = 2x + 4\): \(\frac{2u'}{\sqrt{u}}\)`, r`\(4\sqrt{x^2 + 4x + 1}\)`, r`an interval where \(u \gt 0\), for example \(]0, +\infty[\)`],
          [r`\(f_4\)`, r`\(u = \cos(2x + 1)\), \(u' = -2\sin(2x + 1)\): \(-\frac{1}{2}\cdot\frac{u'}{u^2}\)`, r`\(\dfrac{1}{2\cos(2x + 1)}\)`, r`an interval where \(\cos(2x + 1) \neq 0\)`],
          [r`\(f_5\)`, r`\(u = \cos(x)\): \(-\frac{u'}{u}\)`, r`\(-\ln|\cos(x)|\)`, r`\(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) for example`],
          [r`\(f_6\)`, r`\(u = x^4 + 4x\), \(u' = 4(x^3 + 1)\): \(\frac{1}{4}u'e^u\)`, r`\(\frac{1}{4}e^{x^4 + 4x}\)`, r`\(\R\)`],
          [r`\(f_7\)`, 'table 1', r`\(9\arctan(x)\)`, r`\(\R\)`]]) }],
      answer: p(r`Check each primitive by differentiating it: it is the only reliable check, and it takes ten seconds.`),
      traps: [r`\(f_2\): \(9x^2 + 3 = 3(3x^2 + 1) = 3u'\), so \(f_2 = 12\,u'u^2\) and the primitive is \(12 \times \frac{u^3}{3} = 4u^3\).`, r`\(f_4\): \(\frac{u'}{u^2}\) has the primitive \(-\frac{1}{u}\); with the factor \(-\frac{1}{2}\), the two minus signs cancel.`], note: NOCOR },

    /* ================================================================== Tutorial 3, part 2: rectangles */
    'td3-2-3': { src: 'Tutorial 3 · ex. 2.3', title: 'Bounding the integral of √x with four rectangles',
      intro: r`The function \(f : x \mapsto \sqrt{x}\) has been bounded by two sets of four rectangles of width 1 on \([0, 4]\). Give bounds for \(\displaystyle\int_0^4 f(x)\,dx\).`,
      hints: [r`\(f\) is increasing: take the height at the left edge for the lower rectangles, at the right edge for the upper rectangles.`],
      solution: [{ t: 'The two sums', html: model(p(r`\(f\) is continuous, positive and increasing on \([0, 4]\). With four intervals of length 1:`) + p(r`lower rectangles: \(1 \times \left(\sqrt{0} + \sqrt{1} + \sqrt{2} + \sqrt{3}\right) = 1 + \sqrt{2} + \sqrt{3} \approx 4.15\);`) + p(r`upper rectangles: \(1 \times \left(\sqrt{1} + \sqrt{2} + \sqrt{3} + \sqrt{4}\right) = 3 + \sqrt{2} + \sqrt{3} \approx 6.15\).`)) }],
      answer: p(r`\(1 + \sqrt{2} + \sqrt{3} \leq \displaystyle\int_0^4 \sqrt{x}\,dx \leq 3 + \sqrt{2} + \sqrt{3}\). Exact value: \(\left[\frac{2}{3}x^{3/2}\right]_0^4 = \frac{16}{3} \approx 5.33\).`),
      traps: [r`The gap between the two sums is \(\left(f(4) - f(0)\right) \times 1 = 2\): the middle terms are common to both.`], note: NOCOR },

    'td3-2-4': { src: 'Tutorial 3 · ex. 2.4', title: 'Bounding the integral of ln between 1 and 6',
      intro: r`Consider the function \(\ln\) on \([1, 6]\).`,
      questions: [r`Split the interval into 5 intervals of equal width and find bounds for \(\displaystyle\int_1^6 \ln(x)\,dx\).`, r`(Personal work) Same question with 10 intervals.`],
      hints: [r`Width: \(\frac{6 - 1}{5} = 1\). \(\ln\) is increasing.`, r`A sum of logarithms is the logarithm of a product.`],
      solution: [
        { t: 'Five intervals', html: model(p(r`\(\ln\) is continuous, positive and increasing on \([1, 6]\). The division points are 1, 2, 3, 4, 5, 6.`) + p(r`\(\ln 1 + \ln 2 + \ln 3 + \ln 4 + \ln 5 \leq \displaystyle\int_1^6 \ln(x)\,dx \leq \ln 2 + \ln 3 + \ln 4 + \ln 5 + \ln 6\)`) + p(r`that is \(\ln(120) \leq \displaystyle\int_1^6 \ln(x)\,dx \leq \ln(720)\), about \(4.79 \leq I \leq 6.58\).`)) },
        { t: 'Ten intervals', html: p(r`Width 0.5; points \(1, 1.5, 2, \ldots, 6\). Lower sum: \(0.5 \times \left(\ln 1 + \ln 1.5 + \cdots + \ln 5.5\right) \approx 5.29\). Upper sum: \(0.5 \times \left(\ln 1.5 + \cdots + \ln 6\right) \approx 6.18\). The gap is divided by 2: it equals \(0.5 \times \ln 6 \approx 0.90\).`) }],
      answer: p(r`\(\ln(120) \leq I \leq \ln(720)\); with 10 intervals \(5.29 \leq I \leq 6.18\). Exact value (by parts): \(6\ln 6 - 5 \approx 5.75\).`),
      traps: [r`With 10 intervals, do not forget the factor \(0.5\) (the width).`], note: NOCOR },

    'td3-2-5': { src: 'Tutorial 3 · ex. 2.5', title: 'Bounding ln(2) to within 0.1',
      intro: r`Propose a method to bound \(\ln(2)\) from above and from below to within \(10^{-1}\).`,
      hints: [r`\(\ln(2)\) is an integral: which one?`, r`\(\ln(2) = \displaystyle\int_1^2 \frac{dx}{x}\); \(x \mapsto \frac{1}{x}\) is decreasing on \([1, 2]\).`],
      solution: [
        { t: 'The idea', html: p(r`\(\ln\) is the primitive of \(x \mapsto \frac{1}{x}\) that vanishes at 1: \(\ln(2) = \displaystyle\int_1^2 \frac{dx}{x}\). You apply the rectangle method to \(f : x \mapsto \frac{1}{x}\), which is continuous, positive and <b>decreasing</b> on \([1, 2]\).`) },
        { t: 'How many rectangles?', html: p(r`With \(n\) intervals of length \(\frac{1}{n}\), the gap between the two sums is \(\left(f(1) - f(2)\right) \times \frac{1}{n} = \frac{1}{2n}\). It is less than or equal to \(10^{-1}\) as soon as \(n \geq 5\).`) },
        { t: 'The computation', html: p(r`With \(n = 5\) and \(f\) decreasing: the height at the right edge gives the lower sum. \(\frac{1}{5}\left(\frac{1}{1.2} + \frac{1}{1.4} + \frac{1}{1.6} + \frac{1}{1.8} + \frac{1}{2}\right) \approx 0.646\) and \(\frac{1}{5}\left(1 + \frac{1}{1.2} + \frac{1}{1.4} + \frac{1}{1.6} + \frac{1}{1.8}\right) \approx 0.746\).`) }],
      answer: p(r`\(0.646 \leq \ln(2) \leq 0.746\) with 5 rectangles (with 10: \(0.669 \leq \ln 2 \leq 0.719\)). Value: \(\ln 2 \approx 0.693\).`),
      traps: [r`Decreasing function: the roles of the left and right edges are swapped.`], note: NOCOR },

    /* ================================================================== Tutorial 3, part 3: areas */
    'td3-3-6': { src: 'Tutorial 3 · ex. 3.6', title: 'Four integrals from areas of triangles',
      intro: r`Using a graph, find the values of the following integrals.`,
      questions: [r`\(\displaystyle\int_0^6 x\,dx\)`, r`\(\displaystyle\int_{-2}^{6} x\,dx\)`, r`\(\displaystyle\int_{-2}^{1} (2x + 1)\,dx\)`, r`(Personal work) \(\displaystyle\int_0^4 (-x + 3)\,dx\)`],
      hints: [r`Draw the line and mark where it crosses the x-axis: one triangle on each side.`, r`Below the axis, the area counts negatively.`],
      solution: [
        { t: 'One triangle', html: p(r`Under \(y = x\) between 0 and 6: a triangle with base 6 and height 6. \(\displaystyle\int_0^6 x\,dx = \frac{6 \times 6}{2} = 18\).`) },
        { t: 'Two triangles', html: p(r`On \([-2, 0]\), the line is below the axis: a triangle of area \(\frac{2 \times 2}{2} = 2\), counted as \(-2\). So \(\displaystyle\int_{-2}^{6} x\,dx = -2 + 18 = 16\).`) },
        { t: 'Two equal triangles', html: p(r`\(2x + 1 = 0\) for \(x = -\frac{1}{2}\). On \(\left[-2, -\frac{1}{2}\right]\): a triangle with base \(1.5\) and height \(|2 \times (-2) + 1| = 3\), area \(2.25\), below the axis. On \(\left[-\frac{1}{2}, 1\right]\): base \(1.5\), height 3, area \(2.25\), above the axis. The integral equals \(-2.25 + 2.25 = 0\).`) },
        { t: 'The personal work', html: p(r`\(-x + 3 = 0\) for \(x = 3\). Above the axis on \([0, 3]\): \(\frac{3 \times 3}{2} = 4.5\). Below it on \([3, 4]\): \(\frac{1 \times 1}{2} = 0.5\). The integral equals \(4.5 - 0.5 = 4\).`) }],
      answer: p(r`\(18\); \(16\); \(0\); \(4\). Check with a primitive: \(\left[\frac{x^2}{2}\right]_{-2}^{6} = 18 - 2 = 16\), \(\left[x^2 + x\right]_{-2}^{1} = 2 - 2 = 0\).`),
      traps: [r`A zero integral does not mean a zero function: the areas cancel out.`], note: NOCOR },

    'td3-3-7': { src: 'Tutorial 3 · ex. 3.7 and 3.8', title: 'Piecewise linear functions',
      intro: r`Consider \(f\) defined on \(I = [-1, 6]\) by \(f(x) = 1\) if \(x \in [-1, 2]\), \(f(x) = -x + 3\) if \(x \in\ ]2, 4]\), \(f(x) = x - 5\) if \(x \in\ ]4, 6]\).`,
      questions: [r`Draw the curve of \(f\) on \(I\). Justify graphically that \(f\) is continuous and give its sign.`, r`Find \(\displaystyle\int_{-1}^{6} f(t)\,dt\) graphically, then check the result by computation.`,
        r`(Homework, ex. 3.8) Same questions on \([-1, 7]\) for \(g(x) = \dfrac{x + 1}{2}\) if \(x \in [-1, 1]\), \(-x + 2\) if \(x \in\ ]1, 4]\), \(-2\) if \(x \in\ ]4, 7]\).`],
      hints: [r`Continuity: do the pieces join at 2 and at 4?`, r`By computation: Chasles’ relation, one integral per piece.`],
      solution: [
        { t: 'Curve, continuity, sign', html: p(r`At 2: \(1\) and \(-2 + 3 = 1\). At 4: \(-4 + 3 = -1\) and \(4 - 5 = -1\). The pieces join: \(f\) is continuous on \(I\). \(f \geq 0\) on \([-1, 3]\), \(f \leq 0\) on \([3, 5]\), \(f \geq 0\) on \([5, 6]\).`) },
        { t: 'The integral of f', html: model(p(r`Graphically: rectangle \(3 \times 1 = 3\) on \([-1, 2]\); triangle \(+\frac{1}{2}\) on \([2, 3]\); triangles \(-\frac{1}{2}\) on \([3, 4]\) and \(-\frac{1}{2}\) on \([4, 5]\); triangle \(+\frac{1}{2}\) on \([5, 6]\). Total: \(3 + \frac{1}{2} - \frac{1}{2} - \frac{1}{2} + \frac{1}{2} = 3\).`) +
          p(r`By computation (Chasles): \(\displaystyle\int_{-1}^{2} 1\,dt + \int_2^4 (-t + 3)\,dt + \int_4^6 (t - 5)\,dt = 3 + \left[-\frac{t^2}{2} + 3t\right]_2^4 + \left[\frac{t^2}{2} - 5t\right]_4^6 = 3 + (4 - 4) + (-12 + 12) = 3\).`)) },
        { t: 'Exercise 3.8', html: p(r`\(g\) is continuous (at 1: \(1\) and \(1\); at 4: \(-2\) and \(-2\)), positive on \([-1, 2]\), negative on \([2, 7]\). Areas: triangle \(\frac{2 \times 1}{2} = 1\) on \([-1, 1]\); triangle \(\frac{1 \times 1}{2} = \frac{1}{2}\) on \([1, 2]\); triangle \(\frac{2 \times 2}{2} = 2\) below the axis on \([2, 4]\); rectangle \(3 \times 2 = 6\) below the axis on \([4, 7]\). \(\displaystyle\int_{-1}^{7} g(t)\,dt = 1 + \frac{1}{2} - 2 - 6 = -\frac{13}{2}\).`) }],
      answer: p(r`\(\displaystyle\int_{-1}^{6} f = 3\); \(\displaystyle\int_{-1}^{7} g = -\frac{13}{2}\).`),
      traps: [r`Using the wrong expression on a piece: write the interval next to each integral.`], note: NOCOR },

    'td3-3-9': { src: 'Tutorial 3 · ex. 3.9 and 3.10', title: 'A half-circle, then an area between a curve and the axis',
      intro: r`Two graphical readings.`,
      questions: [r`The curve of \(f\) on \([-4, 2]\) is: the segment from \((-4, 1)\) to \((-3, 2)\), the flat segment \(y = 2\) on \([-3, -2]\), a half-circle on \([-2, 0]\) (it goes down to the point \((-1, 1)\)), then the segment from \((0, 2)\) to \((2, 1)\). Compute \(\displaystyle\int_{-4}^{2} f(x)\,dx\).`,
        r`Let \(f : x \mapsto x + \dfrac{3}{x} - 4\). Find the area of the region between the curve and the x-axis, between the two points where the curve crosses the axis.`],
      hints: [r`On \([-2, 0]\): a rectangle from which you remove a half-disc.`, r`Question 2: solve \(f(x) = 0\) (multiply by \(x\)), then look at the sign of \(f\) between the roots.`],
      solution: [
        { t: 'The decomposition', html: p(r`Trapezium on \([-4, -3]\): \(\frac{(1 + 2) \times 1}{2} = \frac{3}{2}\). Rectangle on \([-3, -2]\): 2. On \([-2, 0]\): rectangle \(2 \times 2 = 4\) minus a half-disc of radius 1, \(\frac{\pi}{2}\). Trapezium on \([0, 2]\): \(\frac{(2 + 1) \times 2}{2} = 3\).`) + p(r`\(\displaystyle\int_{-4}^{2} f(x)\,dx = \frac{3}{2} + 2 + 4 - \frac{\pi}{2} + 3 = \frac{21}{2} - \frac{\pi}{2}\).`) },
        { t: 'The area of the shaded region', html: model(p(r`\(f(x) = 0 \iff x^2 - 4x + 3 = 0 \iff x = 1 \text{ or } x = 3\). On \([1, 3]\), \(f(x) = \frac{(x - 1)(x - 3)}{x} \leq 0\): the curve is below the axis.`) + p(r`The area is therefore \(-\displaystyle\int_1^3 f(x)\,dx = -\left[\frac{x^2}{2} + 3\ln(x) - 4x\right]_1^3 = -\left(\left(\frac{9}{2} + 3\ln 3 - 12\right) - \left(\frac{1}{2} - 4\right)\right) = 4 - 3\ln(3)\).`)) }],
      answer: p(r`\(\dfrac{21}{2} - \dfrac{\pi}{2}\); area \(= 4 - 3\ln(3) \approx 0.70\) unit of area.`),
      traps: [r`An area is positive: below the axis, it is the opposite of the integral.`, r`Half-disc: \(\frac{\pi r^2}{2}\), not \(\pi r^2\).`], note: NOCOR },

    /* ================================================================== Tutorial 3: computations with primitives */
    'td3-3-11': { src: 'Tutorial 3 · ex. 3.11', title: 'Nine integrals using primitives',
      intro: r`Using primitives, compute the integrals below.`,
      questions: [r`\(I_1 = \displaystyle\int_0^2 3te^{-t^2}\,dt\); \(I_2 = \displaystyle\int_0^1 4t(2t^2 + 1)^4\,dt\); \(I_3 = \displaystyle\int_1^e \frac{(\ln t)^2}{t}\,dt\).`,
        r`\(I_4 = \displaystyle\int_{\pi/6}^{\pi/3} \tan(x)\,dx\); \(I_5 = \displaystyle\int_0^1 \frac{t^2 + 1}{2\sqrt{t^3 + 3t}}\,dt\); \(I_6 = \displaystyle\int_0^{\pi/4} \frac{\sin(x)}{\sqrt{\cos(x)}}\,dx\) (personal work).`,
        r`\(I_7 = \displaystyle\int_{-\pi/4}^{\pi/4} \tan(x)(1 + \tan^2(x))\,dx\); \(I_8 = \displaystyle\int_0^1 \frac{\arctan(x)}{1 + x^2}\,dx\); \(I_9 = \displaystyle\int_0^1 x\sqrt{x^2 + 1}\,dx\).`],
      hints: [r`In each integral, look for \(u\) whose derivative is a factor: \(-t^2\), \(2t^2 + 1\), \(\ln t\), \(\cos x\), \(t^3 + 3t\), \(\cos x\), \(\tan x\), \(\arctan x\), \(x^2 + 1\).`, r`\(I_7\): look at the parity before computing.`],
      solution: [{ t: 'Form, primitive, value', html: tbl(['', r`\(u\) and the form`, 'Primitive', 'Value'], [
        [r`\(I_1\)`, r`\(u = -t^2\): \(-\frac{3}{2}u'e^u\)`, r`\(-\frac{3}{2}e^{-t^2}\)`, r`\(\frac{3}{2}\left(1 - e^{-4}\right)\)`],
        [r`\(I_2\)`, r`\(u = 2t^2 + 1\): \(u'u^4\)`, r`\(\frac{1}{5}(2t^2 + 1)^5\)`, r`\(\frac{3^5 - 1}{5} = \frac{242}{5}\)`],
        [r`\(I_3\)`, r`\(u = \ln t\): \(u'u^2\)`, r`\(\frac{1}{3}(\ln t)^3\)`, r`\(\frac{1}{3}\)`],
        [r`\(I_4\)`, r`\(u = \cos x\): \(-\frac{u'}{u}\)`, r`\(-\ln(\cos x)\)`, r`\(-\ln\frac{1}{2} + \ln\frac{\sqrt{3}}{2} = \frac{1}{2}\ln 3\)`],
        [r`\(I_5\)`, r`\(u = t^3 + 3t\), \(u' = 3(t^2 + 1)\): \(\frac{1}{3}\cdot\frac{u'}{2\sqrt{u}}\)`, r`\(\frac{1}{3}\sqrt{t^3 + 3t}\)`, r`\(\frac{1}{3}\sqrt{4} = \frac{2}{3}\)`],
        [r`\(I_6\)`, r`\(u = \cos x\): \(-\frac{u'}{\sqrt{u}}\)`, r`\(-2\sqrt{\cos x}\)`, r`\(2 - 2\sqrt{\tfrac{\sqrt{2}}{2}} = 2 - 2^{3/4}\)`],
        [r`\(I_7\)`, r`\(u = \tan x\): \(u'u\); odd function`, r`\(\frac{1}{2}\tan^2 x\)`, r`\(0\)`],
        [r`\(I_8\)`, r`\(u = \arctan x\): \(u'u\)`, r`\(\frac{1}{2}(\arctan x)^2\)`, r`\(\frac{1}{2}\left(\frac{\pi}{4}\right)^2 = \frac{\pi^2}{32}\)`],
        [r`\(I_9\)`, r`\(u = x^2 + 1\): \(\frac{1}{2}u'u^{1/2}\)`, r`\(\frac{1}{3}(x^2 + 1)^{3/2}\)`, r`\(\frac{2\sqrt{2} - 1}{3}\)`]]) }],
      answer: model(p(r`\(I_3\): let \(u(t) = \ln(t)\), \(u'(t) = \frac{1}{t}\). \(\frac{(\ln t)^2}{t} = u'(t)\,u(t)^2\), with the primitive \(\frac{u^3}{3}\). \(I_3 = \left[\frac{(\ln t)^3}{3}\right]_1^e = \frac{1}{3} - 0 = \frac{1}{3}\).`), 'Model answer for one line'),
      traps: [r`\(I_4\): on \(\left[\frac{\pi}{6}, \frac{\pi}{3}\right]\) the cosine is positive, so the absolute value disappears.`, r`\(I_2\): \(4t\) is exactly \(u'\), so no constant is needed.`], note: NOCOR + ' ' + r`\(I_9\) came up in the course test of October 2022.` },

    /* ================================================================== Moodle 2.2: IBP */
    'mo-22-1': { src: 'Moodle · IBP · ex. 1', title: 'Two integrations by parts: x² cos x',
      intro: r`Using integration by parts, compute \(\displaystyle\int_0^{\pi} x^2\cos(x)\,dx\).`,
      hints: [r`Differentiate the polynomial: \(u(x) = x^2\), \(v'(x) = \cos(x)\).`, r`What remains is \(\displaystyle\int_0^{\pi} x\sin(x)\,dx\): a second IBP.`],
      solution: [
        { t: 'First IBP', html: p(r`\(u(x) = x^2\), \(u'(x) = 2x\), \(v'(x) = \cos x\), \(v(x) = \sin x\). \(\displaystyle\int_0^{\pi} x^2\cos x\,dx = \left[x^2\sin x\right]_0^{\pi} - \int_0^{\pi} 2x\sin x\,dx = -2\int_0^{\pi} x\sin x\,dx\), since \(\sin\pi = 0\).`) },
        { t: 'Second IBP', html: p(r`\(\displaystyle\int_0^{\pi} x\sin x\,dx = \left[x(-\cos x)\right]_0^{\pi} - \int_0^{\pi} (-\cos x)\,dx = (\pi - 0) + \left[\sin x\right]_0^{\pi} = \pi\).`) }],
      answer: p(r`\(\displaystyle\int_0^{\pi} x^2\cos x\,dx = -2\pi\).`),
      traps: [r`\(-\pi\cos(\pi) = +\pi\): watch the two minus signs.`], note: OFF },

    'mo-22-2': { src: 'Moodle · IBP · ex. 2 and 3', title: 'x ln x, then (2x + 3)e^(−3x)',
      intro: r`Two integrations by parts.`,
      questions: [r`Find a primitive of \(f(x) = x\ln(x)\) using integration by parts.`, r`Compute \(\displaystyle\int_0^2 (2x + 3)e^{-3x}\,dx\).`],
      hints: [r`Question 1: the derivative of \(\ln\) is simpler than its primitive, so \(u = \ln\).`, r`Question 2: \(v'(x) = e^{-3x}\) gives \(v(x) = \dfrac{e^{-3x}}{-3}\).`],
      solution: [
        { t: 'x ln x', html: p(r`\(u(x) = \ln x\), \(u'(x) = \frac{1}{x}\), \(v'(x) = x\), \(v(x) = \frac{x^2}{2}\). \(\displaystyle\int x\ln x\,dx = \frac{x^2}{2}\ln x - \int \frac{x^2}{2} \times \frac{1}{x}\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4} + k\).`) },
        { t: '(2x + 3)e^(−3x)', html: p(r`\(\displaystyle\int_0^2 (2x + 3)e^{-3x}\,dx = \left[(2x + 3)\frac{e^{-3x}}{-3}\right]_0^2 - \int_0^2 2\,\frac{e^{-3x}}{-3}\,dx = -\frac{7e^{-6}}{3} + 1 - \left[\frac{2e^{-3x}}{9}\right]_0^2 = -\frac{7e^{-6}}{3} + 1 - \frac{2e^{-6}}{9} + \frac{2}{9}\).`) }],
      answer: p(r`\(\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4} + k\); \(\dfrac{11 - 23e^{-6}}{9}\).`),
      traps: [r`Dividing by \(-3\): the sign changes twice in the second integral.`], note: OFF },

    'mo-22-4': { src: 'Moodle · IBP · ex. 4', title: 'A recurrence relation by IBP',
      intro: r`For \(n \in \N\), let \(I_n = \displaystyle\int_0^1 t^n e^{-t}\,dt\). Find a relation between \(I_{n+1}\) and \(I_n\).`,
      hints: [r`Start from \(I_{n+1}\) and differentiate the power: \(u(t) = t^{n+1}\), \(v'(t) = e^{-t}\).`],
      solution: [{ t: 'The IBP', html: p(r`\(u(t) = t^{n+1}\), \(u'(t) = (n + 1)t^n\), \(v'(t) = e^{-t}\), \(v(t) = -e^{-t}\).`) + p(r`\(I_{n+1} = \left[t^{n+1}(-e^{-t})\right]_0^1 - \displaystyle\int_0^1 (n + 1)t^n(-e^{-t})\,dt = -e^{-1} + (n + 1)I_n\).`) }],
      answer: p(r`\(I_{n+1} = (n + 1)I_n - \dfrac{1}{e}\). With \(I_0 = 1 - \dfrac{1}{e}\): \(I_1 = 1 - \dfrac{2}{e}\).`),
      traps: [r`At 0, \(t^{n+1} = 0\): the bracket only keeps the value at 1.`], note: OFF },

    'td3-3-12': { src: 'Tutorial 3 · ex. 3.12', title: 'Seven integrals by parts',
      intro: r`Using one or more integrations by parts, compute the integrals below.`,
      questions: [r`\(I = \displaystyle\int_0^1 (2x + 3)e^{3x}\,dx\); \(J = \displaystyle\int_0^{\pi/2} x\cos\left(\frac{x}{2}\right)dx\); \(K = \displaystyle\int_1^e \ln(x)\,dx\); \(L = \displaystyle\int_0^{\pi/4} x\sin(x)\,dx\).`,
        r`\(M = \displaystyle\int_0^{\pi} e^x\sin(x)\,dx\).`, r`★ \(N = \displaystyle\int_1^e \frac{\ln(x)}{x^2}\,dx\); ★ \(O = \displaystyle\int_0^{\pi/4} \frac{x}{\cos^2(x)}\,dx\).`],
      hints: [r`Polynomial \(\times\) exponential or cosine: differentiate the polynomial. Logarithm: differentiate the logarithm.`, r`\(M\): two IBPs keeping \(v' = e^x\), and \(M\) reappears.`, r`\(O\): \(\frac{1}{\cos^2}\) is the derivative of \(\tan\).`],
      solution: [
        { t: 'I, J, K, L', html: p(r`\(I = \left[(2x + 3)\frac{e^{3x}}{3}\right]_0^1 - \displaystyle\int_0^1 \frac{2e^{3x}}{3}\,dx = \frac{5e^3}{3} - 1 - \frac{2}{9}(e^3 - 1) = \frac{13e^3 - 7}{9}\).`) +
          p(r`\(J = \left[2x\sin\frac{x}{2}\right]_0^{\pi/2} - \displaystyle\int_0^{\pi/2} 2\sin\frac{x}{2}\,dx = \frac{\pi\sqrt{2}}{2} + \left[4\cos\frac{x}{2}\right]_0^{\pi/2} = \frac{\pi\sqrt{2}}{2} + 2\sqrt{2} - 4\).`) +
          p(r`\(K = \left[x\ln x\right]_1^e - \displaystyle\int_1^e 1\,dx = e - (e - 1) = 1\). \(L = \left[-x\cos x\right]_0^{\pi/4} + \displaystyle\int_0^{\pi/4} \cos x\,dx = -\frac{\pi\sqrt{2}}{8} + \frac{\sqrt{2}}{2} = \frac{\sqrt{2}(4 - \pi)}{8}\).`) },
        { t: 'M: the integral that comes back', html: model(p(r`\(u = \sin x\), \(v' = e^x\): \(M = \left[e^x\sin x\right]_0^{\pi} - \displaystyle\int_0^{\pi} e^x\cos x\,dx = -\int_0^{\pi} e^x\cos x\,dx\).`) + p(r`\(u = \cos x\), \(v' = e^x\): \(\displaystyle\int_0^{\pi} e^x\cos x\,dx = \left[e^x\cos x\right]_0^{\pi} + \int_0^{\pi} e^x\sin x\,dx = -e^{\pi} - 1 + M\).`) + p(r`So \(M = e^{\pi} + 1 - M\), hence \(M = \dfrac{e^{\pi} + 1}{2}\).`)) },
        { t: 'N and O', html: p(r`\(N\): \(u = \ln x\), \(v' = \frac{1}{x^2}\), \(v = -\frac{1}{x}\). \(N = \left[-\frac{\ln x}{x}\right]_1^e + \displaystyle\int_1^e \frac{dx}{x^2} = -\frac{1}{e} + \left[-\frac{1}{x}\right]_1^e = 1 - \frac{2}{e}\).`) +
          p(r`\(O\): \(u = x\), \(v' = \frac{1}{\cos^2 x}\), \(v = \tan x\). \(O = \left[x\tan x\right]_0^{\pi/4} - \displaystyle\int_0^{\pi/4} \tan x\,dx = \frac{\pi}{4} + \left[\ln(\cos x)\right]_0^{\pi/4} = \frac{\pi}{4} - \frac{1}{2}\ln 2\).`) }],
      answer: p(r`\(I = \frac{13e^3 - 7}{9}\); \(J = \frac{\pi\sqrt{2}}{2} + 2\sqrt{2} - 4\); \(K = 1\); \(L = \frac{\sqrt{2}(4 - \pi)}{8}\); \(M = \frac{e^{\pi} + 1}{2}\); \(N = 1 - \frac{2}{e}\); \(O = \frac{\pi}{4} - \frac{1}{2}\ln 2\).`),
      traps: [r`\(\ln\left(\cos\frac{\pi}{4}\right) = \ln\frac{\sqrt{2}}{2} = -\frac{1}{2}\ln 2\).`, r`In \(M\), do not change the role of \(e^x\) between the two IBPs.`], note: NOCOR },

    /* ================================================================== Moodle 2.2: change of variable */
    'mo-22-5': { src: 'Moodle · Change of variable · ex. 5 and 6', title: 'Setting t = eˣ, then u = tan t',
      intro: r`Two given changes of variable.`,
      questions: [r`Using the change of variable \(t = e^x\), compute \(\displaystyle\int_0^1 \frac{e^x}{e^{2x} + 1}\,dx\).`, r`Find the primitive \(\displaystyle\int \frac{\sin^3 t}{\cos^5 t}\,dt\), setting \(u = \tan t\).`],
      hints: [r`\(dt = e^x\,dx\): the numerator is exactly \(dt\). Do not forget the bounds.`, r`\(du = \dfrac{dt}{\cos^2 t}\): write \(\dfrac{\sin^3 t}{\cos^5 t} = \dfrac{\sin^3 t}{\cos^3 t} \times \dfrac{1}{\cos^2 t}\).`],
      solution: [
        { t: 't = eˣ', html: p(r`\(t = e^x\) defines a bijection from \([0, 1]\) onto \([1, e]\). \(dt = e^x\,dx\) and \(e^{2x} = t^2\). So \(\displaystyle\int_0^1 \frac{e^x}{e^{2x} + 1}\,dx = \int_1^e \frac{dt}{t^2 + 1} = \arctan(e) - \arctan(1)\).`) },
        { t: 'u = tan t', html: p(r`\(du = \dfrac{dt}{\cos^2 t}\). \(\displaystyle\int \frac{\sin^3 t}{\cos^5 t}\,dt = \int \frac{\sin^3 t}{\cos^3 t}\,\frac{dt}{\cos^2 t} = \int u^3\,du = \frac{u^4}{4} + k\).`) }],
      answer: p(r`\(\arctan(e) - \dfrac{\pi}{4}\); \(\dfrac{\tan^4 t}{4} + k\).`),
      traps: [r`Bounds: \(x = 0 \Rightarrow t = 1\), \(x = 1 \Rightarrow t = e\).`, r`With no bounds, you go back to the original variable at the end.`], note: OFF },

    'td3-3-13': { src: 'Tutorial 3 · ex. 3.13', title: 'Six given changes of variable',
      intro: r`Using the indicated change of variable, compute the following integrals.`,
      questions: [r`\(I = \displaystyle\int_0^{1/2} \frac{4x^2}{(2x + 1)^2}\,dx\) setting \(t = 2x + 1\); \(J = \displaystyle\int_0^{\ln\sqrt{3}} \frac{dt}{e^t + e^{-t}}\) setting \(x = e^t\).`,
        r`\(K = \displaystyle\int_1^e \frac{\ln(x)}{\sqrt{x}}\,dx\) setting \(t = \ln x\); \(L = \displaystyle\int_{-1}^{1} \frac{dx}{(x + 3)\sqrt{x + 2}}\) setting \(t = \sqrt{x + 2}\).`,
        r`\(M = \displaystyle\int_0^4 e^{\sqrt{x}}\,dx\) setting \(t = \sqrt{x}\); ★ \(N = \displaystyle\int_{\pi/6}^{\pi/3} \frac{dt}{\sin(t)\cos(t)}\) setting \(x = \tan(t)\).`],
      hints: [r`Always the same steps: express the old variable, compute \(dx\), change the bounds, rewrite everything.`, r`\(K\) and \(M\) end with an integration by parts.`, r`\(N\): \(\dfrac{1}{\sin t\cos t} = \dfrac{1}{\tan t} \times \dfrac{1}{\cos^2 t}\).`],
      solution: [
        { t: 'I and J', html: p(r`\(I\): \(x = \frac{t - 1}{2}\), \(dx = \frac{dt}{2}\), \(4x^2 = (t - 1)^2\), bounds 1 and 2. \(I = \frac{1}{2}\displaystyle\int_1^2 \frac{(t - 1)^2}{t^2}\,dt = \frac{1}{2}\int_1^2 \left(1 - \frac{2}{t} + \frac{1}{t^2}\right)dt = \frac{1}{2}\left[t - 2\ln t - \frac{1}{t}\right]_1^2 = \frac{3}{4} - \ln 2\).`) +
          p(r`\(J\): \(x = e^t\), \(dx = e^t\,dt\) so \(dt = \frac{dx}{x}\); bounds 1 and \(\sqrt{3}\). \(\frac{1}{e^t + e^{-t}} = \frac{x}{x^2 + 1}\). \(J = \displaystyle\int_1^{\sqrt{3}} \frac{dx}{x^2 + 1} = \frac{\pi}{3} - \frac{\pi}{4} = \frac{\pi}{12}\).`) },
        { t: 'K and L', html: p(r`\(K\): \(x = e^t\), \(dx = e^t\,dt\), bounds 0 and 1. \(K = \displaystyle\int_0^1 \frac{t}{e^{t/2}}e^t\,dt = \int_0^1 t\,e^{t/2}\,dt = \left[2t\,e^{t/2}\right]_0^1 - \int_0^1 2e^{t/2}\,dt = 2\sqrt{e} - 4\sqrt{e} + 4 = 4 - 2\sqrt{e}\).`) +
          p(r`\(L\): \(x = t^2 - 2\), \(dx = 2t\,dt\), \(x + 3 = t^2 + 1\), bounds 1 and \(\sqrt{3}\). \(L = \displaystyle\int_1^{\sqrt{3}} \frac{2t\,dt}{(t^2 + 1)t} = 2\left[\arctan t\right]_1^{\sqrt{3}} = \frac{\pi}{6}\).`) },
        { t: 'M and N', html: p(r`\(M\): \(x = t^2\), \(dx = 2t\,dt\), bounds 0 and 2. \(M = \displaystyle\int_0^2 2t\,e^t\,dt = \left[2t\,e^t\right]_0^2 - \int_0^2 2e^t\,dt = 4e^2 - 2e^2 + 2 = 2e^2 + 2\).`) +
          p(r`\(N\): \(dx = \frac{dt}{\cos^2 t}\), bounds \(\tan\frac{\pi}{6} = \frac{1}{\sqrt{3}}\) and \(\tan\frac{\pi}{3} = \sqrt{3}\). \(N = \displaystyle\int_{1/\sqrt{3}}^{\sqrt{3}} \frac{dx}{x} = \ln\sqrt{3} - \ln\frac{1}{\sqrt{3}} = \ln 3\).`) }],
      answer: p(r`\(I = \frac{3}{4} - \ln 2\); \(J = \frac{\pi}{12}\); \(K = 4 - 2\sqrt{e}\); \(L = \frac{\pi}{6}\); \(M = 2e^2 + 2\); \(N = \ln 3\).`),
      traps: [r`Forgetting to change the bounds, or forgetting the factor from \(dx\) (\(2t\,dt\), \(\frac{dt}{2}\)).`], note: NOCOR + ' ' + r`\(J\) came up in the exam of January 2024, \(L\) in the midterm of November 2022.` },

    /* ================================================================== past course tests and papers */
    'cc2022o-ex3': { src: 'Course test Oct. 2022 · Ex 3', title: 'An integral, then state and prove IBP',
      intro: r`Course test of 3 October 2022, exercise 3.`,
      questions: [r`Without using integration by parts or a change of variable, compute \(I = \displaystyle\int_0^1 x\sqrt{x^2 + 1}\,dx\).`, r`State the integration by parts theorem precisely, without forgetting its hypotheses.`, r`Prove this theorem.`],
      hints: [r`\(u = x^2 + 1\): the derivative \(2x\) is almost there.`, r`Hypothesis: two functions of class \(C^1\) on \([a, b]\).`, r`Start from the derivative of the product \((fg)'\).`],
      solution: [
        { t: 'The integral', html: p(r`Let \(u(x) = x^2 + 1\), \(u'(x) = 2x\). \(x\sqrt{x^2 + 1} = \frac{1}{2}u'(x)u(x)^{1/2}\), with the primitive \(\frac{1}{2} \times \frac{2}{3}u^{3/2}\). \(I = \left[\frac{1}{3}(x^2 + 1)^{3/2}\right]_0^1 = \frac{2\sqrt{2} - 1}{3}\).`) },
        { t: 'The statement', html: model(p(r`Let \(f\) and \(g\) be two functions of class \(C^1\) on an interval \([a, b]\). Then \(\displaystyle\int_a^b f(x)g'(x)\,dx = \left[f(x)g(x)\right]_a^b - \int_a^b f'(x)g(x)\,dx\).`)) },
        { t: 'The proof', html: model(p(r`\(f\) and \(g\) are of class \(C^1\), so \(fg\) is differentiable and \((fg)' = f'g + fg'\). The functions \(f'g\) and \(fg'\) are continuous on \([a, b]\), so we can integrate:`) + p(r`\(\displaystyle\int_a^b (fg)'(x)\,dx = \int_a^b f'(x)g(x)\,dx + \int_a^b f(x)g'(x)\,dx\).`) + p(r`Now \(fg\) is a primitive of \((fg)'\), so the left-hand side equals \(\left[f(x)g(x)\right]_a^b\). Hence the formula.`)) }],
      answer: p(r`\(I = \dfrac{2\sqrt{2} - 1}{3}\); the statement with “of class \(C^1\)”; the proof in three lines.`),
      traps: [r`Stating the formula without the \(C^1\) hypothesis: the question says “without forgetting its hypotheses”.`], note: 'Solution written for the site, result recomputed by program.' },

    'cc2020o-ex': { src: 'Course test Oct. 2020', title: 'A direct primitive, an IBP',
      intro: r`Compute the following integrals.`,
      questions: [r`\(I_1 = \displaystyle\int_1^2 \frac{3t^2 + 2}{(t^3 + 2t)^2}\,dt\).`, r`\(I_2 = \displaystyle\int_0^{\pi/6} x\sin(3x)\,dx\).`],
      hints: [r`\(I_1\): \(u = t^3 + 2t\), form \(\frac{u'}{u^2}\).`, r`\(I_2\): \(u = x\), \(v' = \sin(3x)\), \(v = -\frac{\cos(3x)}{3}\).`],
      solution: [
        { t: 'I₁', html: p(r`\(u(t) = t^3 + 2t\), \(u'(t) = 3t^2 + 2\). \(\frac{u'}{u^2}\) has the primitive \(-\frac{1}{u}\). \(I_1 = \left[-\frac{1}{t^3 + 2t}\right]_1^2 = -\frac{1}{12} + \frac{1}{3} = \frac{1}{4}\).`) },
        { t: 'I₂', html: p(r`\(I_2 = \left[-\frac{x\cos(3x)}{3}\right]_0^{\pi/6} + \displaystyle\int_0^{\pi/6} \frac{\cos(3x)}{3}\,dx = 0 + \left[\frac{\sin(3x)}{9}\right]_0^{\pi/6} = \frac{1}{9}\), since \(\cos\frac{\pi}{2} = 0\) and \(\sin\frac{\pi}{2} = 1\).`) }],
      answer: p(r`\(I_1 = \dfrac{1}{4}\); \(I_2 = \dfrac{1}{9}\).`), traps: [r`\(-\frac{1}{12} - \left(-\frac{1}{3}\right)\): parentheses around \(F(1)\).`], note: 'Solution written for the site, results recomputed by program.' },

    'p2022-int': { src: 'Midterm Nov. 2022 · integrals', title: 'The trio: primitive, IBP, change of variable',
      intro: r`Compute the following integrals.`,
      questions: [r`\(I = \displaystyle\int_0^1 \frac{2x^3 + 1}{(x^4 + 2x + 1)^3}\,dx\) (without integration by parts or change of variable).`, r`\(J = \displaystyle\int_0^{\pi/4} (2x + 1)\sin(2x)\,dx\) (by parts).`, r`\(K = \displaystyle\int_{-1}^{1} \frac{dx}{(x + 3)\sqrt{x + 2}}\) setting \(t = \sqrt{x + 2}\).`],
      hints: [r`\(I\): \(u = x^4 + 2x + 1\), \(u' = 2(2x^3 + 1)\).`, r`\(J\): differentiate \(2x + 1\).`, r`\(K\): \(x = t^2 - 2\), \(dx = 2t\,dt\).`],
      solution: [
        { t: 'I', html: p(r`\(\frac{2x^3 + 1}{u^3} = \frac{1}{2}u'u^{-3}\), with the primitive \(\frac{1}{2} \times \frac{u^{-2}}{-2} = -\frac{1}{4u^2}\). \(I = \left[-\frac{1}{4(x^4 + 2x + 1)^2}\right]_0^1 = -\frac{1}{64} + \frac{1}{4} = \frac{15}{64}\).`) },
        { t: 'J', html: p(r`\(u = 2x + 1\), \(u' = 2\), \(v' = \sin(2x)\), \(v = -\frac{\cos(2x)}{2}\). \(J = \left[-\frac{(2x + 1)\cos(2x)}{2}\right]_0^{\pi/4} + \displaystyle\int_0^{\pi/4} \cos(2x)\,dx = \frac{1}{2} + \left[\frac{\sin(2x)}{2}\right]_0^{\pi/4} = \frac{1}{2} + \frac{1}{2} = 1\).`) },
        { t: 'K', html: p(r`\(x + 3 = t^2 + 1\); bounds: \(x = -1 \Rightarrow t = 1\), \(x = 1 \Rightarrow t = \sqrt{3}\). \(K = \displaystyle\int_1^{\sqrt{3}} \frac{2t\,dt}{(t^2 + 1)t} = 2\left[\arctan t\right]_1^{\sqrt{3}} = 2\left(\frac{\pi}{3} - \frac{\pi}{4}\right) = \frac{\pi}{6}\).`) }],
      answer: p(r`\(I = \dfrac{15}{64}\); \(J = 1\); \(K = \dfrac{\pi}{6}\).`), traps: [r`In \(J\), \(\cos\frac{\pi}{2} = 0\): the bracket only keeps the bound 0, with a double minus sign.`], note: 'Results match the official answer key, recomputed by program.' },

    'p2021-int': { src: 'Midterm Nov. 2021 · integrals', title: 'The trio, 2021 version',
      intro: r`Compute the following integrals.`,
      questions: [r`\(I = \displaystyle\int_0^1 (x^2 + 1)\sqrt{x^3 + 3x + 1}\,dx\).`, r`\(J = \displaystyle\int_0^1 (2x + 1)e^{2x}\,dx\).`, r`\(K = \displaystyle\int_1^{2\sqrt{3} + 1} \frac{dx}{(x - 1)^2 + 4}\) setting \(x = 2t + 1\).`],
      hints: [r`\(I\): \(u = x^3 + 3x + 1\), \(u' = 3(x^2 + 1)\).`, r`\(K\): \((x - 1)^2 + 4 = 4t^2 + 4\) and \(dx = 2\,dt\).`],
      solution: [
        { t: 'I', html: p(r`\((x^2 + 1)\sqrt{u} = \frac{1}{3}u'u^{1/2}\), with the primitive \(\frac{2}{9}u^{3/2}\). \(I = \left[\frac{2}{9}(x^3 + 3x + 1)^{3/2}\right]_0^1 = \frac{2}{9}\left(5\sqrt{5} - 1\right) = \frac{10\sqrt{5} - 2}{9}\).`) },
        { t: 'J', html: p(r`\(u = 2x + 1\), \(v' = e^{2x}\), \(v = \frac{e^{2x}}{2}\). \(J = \left[(2x + 1)\frac{e^{2x}}{2}\right]_0^1 - \displaystyle\int_0^1 e^{2x}\,dx = \frac{3e^2}{2} - \frac{1}{2} - \frac{e^2}{2} + \frac{1}{2} = e^2\).`) },
        { t: 'K', html: p(r`Bounds: \(x = 1 \Rightarrow t = 0\), \(x = 2\sqrt{3} + 1 \Rightarrow t = \sqrt{3}\). \(K = \displaystyle\int_0^{\sqrt{3}} \frac{2\,dt}{4(t^2 + 1)} = \frac{1}{2}\arctan(\sqrt{3}) = \frac{\pi}{6}\).`) }],
      answer: p(r`\(I = \dfrac{10\sqrt{5} - 2}{9}\); \(J = e^2\); \(K = \dfrac{\pi}{6}\).`), traps: [r`\(5^{3/2} = 5\sqrt{5}\).`], note: 'Results match the official answer key, recomputed by program.' },

    'p2020-int': { src: 'Midterm Nov. 2020 · derivative and integrals', title: 'A composite derivative, a change of variable, an IBP',
      intro: r`Three independent questions.`,
      questions: [r`Differentiate \(x \mapsto \sin\left(e^{3x} + 2\right)\).`, r`\(J = \displaystyle\int_0^1 \frac{dx}{x^2 + 3}\) setting \(t = \dfrac{x}{\sqrt{3}}\).`, r`\(K = \displaystyle\int_1^e \frac{\ln(x)}{\sqrt{x}}\,dx\) by parts.`],
      hints: [r`\((\sin u)' = u'\cos u\).`, r`\(x = \sqrt{3}\,t\), \(dx = \sqrt{3}\,dt\); factor 3 out of the denominator.`, r`\(u = \ln x\), \(v' = x^{-1/2}\), \(v = 2\sqrt{x}\).`],
      solution: [
        { t: 'The derivative', html: p(r`\(u(x) = e^{3x} + 2\), \(u'(x) = 3e^{3x}\). The derivative is \(3e^{3x}\cos\left(e^{3x} + 2\right)\).`) },
        { t: 'J', html: p(r`Bounds: 0 and \(\frac{1}{\sqrt{3}}\). \(J = \displaystyle\int_0^{1/\sqrt{3}} \frac{\sqrt{3}\,dt}{3t^2 + 3} = \frac{\sqrt{3}}{3}\arctan\left(\frac{1}{\sqrt{3}}\right) = \frac{\sqrt{3}}{3} \times \frac{\pi}{6} = \frac{\pi\sqrt{3}}{18}\).`) },
        { t: 'K', html: p(r`\(K = \left[2\sqrt{x}\ln x\right]_1^e - \displaystyle\int_1^e \frac{2\sqrt{x}}{x}\,dx = 2\sqrt{e} - \left[4\sqrt{x}\right]_1^e = 2\sqrt{e} - 4\sqrt{e} + 4 = 4 - 2\sqrt{e}\).`) }],
      answer: p(r`\(3e^{3x}\cos(e^{3x} + 2)\); \(J = \dfrac{\pi\sqrt{3}}{18}\); \(K = 4 - 2\sqrt{e}\).`), traps: [r`\(\frac{\sqrt{x}}{x} = \frac{1}{\sqrt{x}}\), with the primitive \(2\sqrt{x}\).`], note: 'Results match the official answer key, recomputed by program.' },

    'obm2024-ex5': { src: 'OBM exam Oct. 2024 · Ex 5', title: 'The trio, 2024 version',
      intro: r`Compute the following integrals.`,
      questions: [r`\(I = \displaystyle\int_0^1 \frac{2x + 2}{2x^2 + 4x + 1}\,dx\).`, r`\(J = \displaystyle\int_0^{\pi} (x + 1)\cos\left(\frac{x}{3}\right)dx\).`, r`\(K = \displaystyle\int_0^{\sqrt{3}} \frac{dx}{3 + x^2}\) setting \(t = \dfrac{x}{\sqrt{3}}\).`],
      hints: [r`\(I\): \(u = 2x^2 + 4x + 1\), \(u' = 4x + 4 = 2(2x + 2)\).`, r`\(J\): \(v' = \cos\frac{x}{3}\) gives \(v = 3\sin\frac{x}{3}\).`],
      solution: [
        { t: 'I', html: p(r`\(\frac{2x + 2}{u} = \frac{1}{2}\cdot\frac{u'}{u}\). \(I = \left[\frac{1}{2}\ln(2x^2 + 4x + 1)\right]_0^1 = \frac{1}{2}\ln 7\).`) },
        { t: 'J', html: p(r`\(J = \left[3(x + 1)\sin\frac{x}{3}\right]_0^{\pi} - \displaystyle\int_0^{\pi} 3\sin\frac{x}{3}\,dx = 3(\pi + 1)\frac{\sqrt{3}}{2} + \left[9\cos\frac{x}{3}\right]_0^{\pi} = \frac{3\sqrt{3}(\pi + 1)}{2} + \frac{9}{2} - 9\).`) },
        { t: 'K', html: p(r`\(x = \sqrt{3}\,t\), \(dx = \sqrt{3}\,dt\), bounds 0 and 1. \(K = \displaystyle\int_0^1 \frac{\sqrt{3}\,dt}{3(1 + t^2)} = \frac{\sqrt{3}}{3} \times \frac{\pi}{4} = \frac{\pi\sqrt{3}}{12}\).`) }],
      answer: p(r`\(I = \dfrac{1}{2}\ln 7\); \(J = \dfrac{3\sqrt{3}\,\pi}{2} + \dfrac{3\sqrt{3}}{2} - \dfrac{9}{2}\); \(K = \dfrac{\pi\sqrt{3}}{12}\).`), traps: [r`\(\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}\), \(\cos\frac{\pi}{3} = \frac{1}{2}\).`], note: 'Paper without a published answer key: solution written for the site, results recomputed by program.' },

    'f2024-ex1': { src: 'Exam Jan. 2024 · Ex 1', title: 'A table of eight primitives, an IBP, a change of variable',
      intro: r`ASI exam of January 2024, exercise 1 (10 points out of 40).`,
      questions: [r`Fill in the table (without worrying about the domain of definition): give a primitive \(F\) of each \(f\): \(\ln(2)\); \(x^4 + 2x\); \(\dfrac{e^{\sqrt{x}}}{\sqrt{x}}\); \(\sin(x)\); \(1 + \tan^2(x)\); \(\dfrac{1}{x^2}\); \(\sqrt{x}\); \(\dfrac{x^5}{x^6 + 1}\).`,
        r`Using an integration by parts, for which you will state the general formula, compute \(J = \displaystyle\int_0^1 (3x + 1)e^{2x}\,dx\).`, r`Compute \(K = \displaystyle\int_0^{\ln\sqrt{3}} \frac{1}{e^{-t} + e^{t}}\,dt\) setting \(x = e^t\).`],
      hints: [r`\(\ln(2)\) is a constant. \(\frac{e^{\sqrt{x}}}{\sqrt{x}} = 2u'e^u\) with \(u = \sqrt{x}\).`, r`\(J\): differentiate \(3x + 1\).`, r`\(K\): \(dt = \frac{dx}{x}\), and \(e^{-t} + e^t = \frac{1}{x} + x\).`],
      solution: [
        { t: 'The table', html: tbl([r`\(f(x)\)`, r`\(\ln 2\)`, r`\(x^4 + 2x\)`, r`\(\frac{e^{\sqrt{x}}}{\sqrt{x}}\)`, r`\(\sin x\)`, r`\(1 + \tan^2 x\)`, r`\(\frac{1}{x^2}\)`, r`\(\sqrt{x}\)`, r`\(\frac{x^5}{x^6 + 1}\)`],
          [[r`\(F(x)\)`, r`\(x\ln 2\)`, r`\(\frac{x^5}{5} + x^2\)`, r`\(2e^{\sqrt{x}}\)`, r`\(-\cos x\)`, r`\(\tan x\)`, r`\(-\frac{1}{x}\)`, r`\(\frac{2}{3}x^{3/2}\)`, r`\(\frac{1}{6}\ln(x^6 + 1)\)`]]) },
        { t: 'J', html: model(p(r`Formula: for \(u\) and \(v\) of class \(C^1\) on \([a, b]\), \(\displaystyle\int_a^b u\,v' = \left[uv\right]_a^b - \int_a^b u'v\).`) + p(r`\(u(x) = 3x + 1\), \(u'(x) = 3\), \(v'(x) = e^{2x}\), \(v(x) = \frac{e^{2x}}{2}\). \(J = \left[(3x + 1)\frac{e^{2x}}{2}\right]_0^1 - \displaystyle\int_0^1 \frac{3e^{2x}}{2}\,dx = 2e^2 - \frac{1}{2} - \left[\frac{3e^{2x}}{4}\right]_0^1 = 2e^2 - \frac{1}{2} - \frac{3e^2}{4} + \frac{3}{4}\).`)) },
        { t: 'K', html: p(r`\(x = e^t\), \(dx = e^t\,dt = x\,dt\); bounds \(e^0 = 1\) and \(e^{\ln\sqrt{3}} = \sqrt{3}\). \(K = \displaystyle\int_1^{\sqrt{3}} \frac{1}{\frac{1}{x} + x} \times \frac{dx}{x} = \int_1^{\sqrt{3}} \frac{dx}{1 + x^2} = \frac{\pi}{3} - \frac{\pi}{4}\).`) }],
      answer: p(r`\(J = \dfrac{5e^2 + 1}{4}\); \(K = \dfrac{\pi}{12}\).`), traps: [r`\(\ln(2)\) is not \(\frac{1}{x}\): it is a number, and its primitive is \(x\ln 2\).`, r`The question asks you to state the general formula before applying it: points are given for the statement.`], note: 'Results match the official answer key, recomputed by program.' },

    'f2023-ex1': { src: 'Midterm Jan. 2023 · Ex 1', title: 'A power to recognise',
      intro: r`Compute \(I = \displaystyle\int_1^2 (x - 1)\sqrt{x - 1}\,dx\).`,
      hints: [r`\((x - 1)\sqrt{x - 1} = (x - 1)^{3/2}\).`],
      solution: [{ t: 'A power', html: p(r`\((x - 1)\sqrt{x - 1} = (x - 1)^{3/2}\), of the form \(u'u^{\alpha}\) with \(u = x - 1\), \(u' = 1\), \(\alpha = \frac{3}{2}\). Primitive: \(\frac{2}{5}(x - 1)^{5/2}\). \(I = \left[\frac{2}{5}(x - 1)^{5/2}\right]_1^2 = \frac{2}{5}\).`) }],
      answer: p(r`\(I = \dfrac{2}{5}\).`), traps: [r`\(\frac{u^{\alpha + 1}}{\alpha + 1}\) with \(\alpha + 1 = \frac{5}{2}\): you multiply by \(\frac{2}{5}\).`], note: 'Result matches the official answer key, recomputed by program.' }
  };
  R.i18n.patch(window.APIS_EX, T);
})();
