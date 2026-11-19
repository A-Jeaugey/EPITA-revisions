/* Maths · APIS — fiches d'exercices, cours 3 du Moodle : primitives, intégrales, intégration par parties, changement
   de variable. Toutes dans le périmètre du contrôle de cours du 23 novembre 2026 (stage 'cc').
   Sources : pages « Exercices types » du Moodle et leurs corrigés officiels (ids mo-…), TD 3 (ids td3-…, publié sans
   corrigé : résultats recalculés avec sympy), anciens contrôles de cours et sujets (ids <clé de APIS_EXAMS>-…).
   Format (le même que data/maths/ex-*.js) : { id, exam, stage, kind: 'partiel' | 'moodle' | 'td', order, src, title, pts,
   topics, lvl, time, intro, questions, hints, solution: [{ t, html }], answer, traps, official, note }.
   Formules KaTeX \( … \), écrites en String.raw ; pas de signes < > dans les formules (\lt, \gt). */
(function () {
  var EX = window.APIS_EX = window.APIS_EX || [];
  var r = String.raw;
  function p(s) { return '<p>' + s + '</p>'; }
  function ol(a) { return '<ol>' + a.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  function model(html, tag) { return '<div class="model"><span class="tag">' + (tag || 'Rédaction modèle') + '</span>' + html + '</div>'; }
  function tbl(head, rows, cap) {
    return '<div class="tbl"><table>' + (cap ? '<caption>' + cap + '</caption>' : '') + '<thead><tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (rr) { return '<tr>' + rr.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  var NOCOR = 'TD publié sans corrigé : correction rédigée pour le site, résultats recalculés par programme.';
  var OFF = 'Reprend le corrigé officiel du Moodle.';
  var Q = [

    /* ================================================================== Moodle 2.1 : primitives */
    { id: 'mo-21-1', stage: 'cc', kind: 'moodle', order: 1, src: 'Moodle · Primitives · ex. 1', title: 'Une primitive par le tableau', topics: ['primitives'], lvl: 1, time: 5,
      intro: r`Déterminer une primitive \(F\) sur \(\R^{\star}\) de la fonction \(f\) définie par \(f(x) = e^{2x} + 5x^2 + \dfrac{1}{x} + 5\cos(2x)\).`,
      hints: [r`Par linéarité, primitive chaque terme séparément.`, r`\(e^{kx}\) a pour primitive \(\dfrac{e^{kx}}{k}\) ; \(\cos(kx)\) a pour primitive \(\dfrac{\sin(kx)}{k}\).`],
      solution: [{ t: 'Terme par terme', html: p(r`Sur \(\R^{\star}\) : une primitive de \(x \mapsto e^{kx}\) est \(x \mapsto \dfrac{e^{kx}}{k}\) ; de \(x \mapsto x^n\), \(x \mapsto \dfrac{x^{n+1}}{n+1}\) ; de \(x \mapsto \dfrac{1}{x}\), \(x \mapsto \ln|x|\) ; de \(x \mapsto \cos(2x)\), \(x \mapsto \dfrac{\sin(2x)}{2}\).`) }],
      answer: p(r`\(F(x) = \dfrac{e^{2x}}{2} + \dfrac{5}{3}x^3 + \ln|x| + \dfrac{5}{2}\sin(2x)\).`),
      traps: [r`Sur \(\R^{\star}\), la primitive de \(\frac{1}{x}\) est \(\ln|x|\), avec la valeur absolue.`, r`Oublier de diviser par 2 pour \(e^{2x}\) et \(\cos(2x)\).`], official: true, note: OFF },

    { id: 'mo-21-2', stage: 'cc', kind: 'moodle', order: 2, src: 'Moodle · Primitives · ex. 2', title: 'Trois primitives de la forme u′ × g(u)', topics: ['primitives'], lvl: 2, time: 10,
      intro: r`Déterminer une primitive de la fonction \(f\) dans les cas suivants.`,
      questions: [r`\(f(x) = \dfrac{2x - 1}{\sqrt{x^2 - x + 1}}\).`, r`\(f(x) = \tan(x)\).`, r`\(f(x) = \cos(x)\sqrt{e^{3\sin(x)}}\).`],
      hints: [r`Cherche \(u\) dont la dérivée apparaît en facteur : \(x^2 - x + 1\), puis \(\cos(x)\), puis \(\frac{3}{2}\sin(x)\).`, r`\(\sqrt{e^{a}} = e^{a/2}\).`],
      solution: [
        { t: 'Forme u′/√u', html: p(r`Soit \(u(x) = x^2 - x + 1\) ; \(u'(x) = 2x - 1\). Alors \(f(x) = \dfrac{u'(x)}{\sqrt{u(x)}}\), de primitive \(2\sqrt{u}\) : \(F(x) = 2\sqrt{x^2 - x + 1}\), sur \(\R\).`) },
        { t: 'Forme u′/u', html: p(r`Soit \(u(x) = \cos(x)\). \(f(x) = \dfrac{\sin(x)}{\cos(x)} = -\dfrac{u'(x)}{u(x)}\), de primitive \(F(x) = -\ln|\cos(x)|\), sur un intervalle où le cosinus ne s’annule pas.`) },
        { t: 'Forme u′eᵘ', html: p(r`\(f(x) = \cos(x)\,e^{\frac{3}{2}\sin(x)}\). Posons \(u(x) = \frac{3}{2}\sin(x)\) : \(f(x) = \frac{2}{3}u'(x)e^{u(x)}\). Donc \(F(x) = \frac{2}{3}e^{\frac{3}{2}\sin(x)} = \frac{2}{3}\sqrt{e^{3\sin(x)}}\), sur \(\R\).`) }],
      answer: p(r`\(2\sqrt{x^2 - x + 1}\) ; \(-\ln|\cos(x)|\) ; \(\frac{2}{3}\sqrt{e^{3\sin(x)}}\).`),
      traps: [r`Le signe de \(\tan\) : \(\cos' = -\sin\), d’où le moins devant le logarithme.`, r`Oublier d’ajuster la constante : il manque le facteur \(\frac{3}{2}\) pour avoir \(u'\), on compense par \(\frac{2}{3}\).`], official: true, note: OFF },

    /* ================================================================== TD 3, partie 1 */
    { id: 'td3-1-2', stage: 'cc', kind: 'td', order: 3, src: 'TD 3 · ex. 1.2', title: 'Les deux tableaux, puis sept primitives', topics: ['primitives'], lvl: 2, time: 25,
      intro: r`Après avoir rempli les deux tableaux de primitives usuelles (ils sont dans le cours 1), déterminer une primitive des fonctions suivantes sur un intervalle \(I\) à préciser.`,
      questions: [
        r`Applications du tableau 1 : \(f(x) = x\sqrt{x}\) sur \(\R_+\) ; \(g(x) = \dfrac{3}{x} - 5x + 6x^4\) sur \(\R_+^*\) ; \(h(x) = -3\sin(x) + 2e^x\) sur \(\R\). Sais-tu calculer une primitive sur \(\R\) de \(x \mapsto e^{2x}\) ? de \(x \mapsto e^{x^2}\) ?`,
        r`\(f(x) = \sin(2x)\), \(g(x) = \cos\left(\dfrac{x}{2}\right)\) et \(h(x) = e^{6x - 7}\).`,
        r`\(f_1(x) = \dfrac{3x}{x^2 + 1} - 5x\) ; \(f_2(x) = 4(9x^2 + 3)(x^3 + x + 1)^2\) ; \(f_3(x) = \dfrac{4x + 8}{\sqrt{x^2 + 4x + 1}}\) ; \(f_4(x) = \dfrac{\sin(2x + 1)}{\cos^2(2x + 1)}\).`,
        r`\(f_5(x) = \tan(x)\) ; \(f_6(x) = (x^3 + 1)e^{x^4 + 4x}\) ; \(f_7(x) = \dfrac{9}{1 + x^2}\).`],
      hints: [r`\(x\sqrt{x} = x^{3/2}\).`, r`Pour chaque \(f_k\), nomme \(u\), calcule \(u'\), puis compare avec ce que tu as : il manque souvent une constante.`],
      solution: [
        { t: 'Tableau 1', html: p(r`\(x\sqrt{x} = x^{3/2}\) : \(F(x) = \frac{2}{5}x^{5/2}\). \(G(x) = 3\ln(x) - \frac{5}{2}x^2 + \frac{6}{5}x^5\). \(H(x) = 3\cos(x) + 2e^x\).`) + p(r`\(x \mapsto e^{2x}\) a pour primitive \(\frac{1}{2}e^{2x}\). Pour \(x \mapsto e^{x^2}\) : il manque le facteur \(u' = 2x\), on ne reconnaît aucune forme. Une primitive existe (la fonction est continue) mais elle ne s’exprime pas avec les fonctions usuelles.`) },
        { t: 'Fonctions de ax + b', html: p(r`\(-\frac{1}{2}\cos(2x)\) ; \(2\sin\left(\frac{x}{2}\right)\) ; \(\frac{1}{6}e^{6x - 7}\), sur \(\R\). On divise par le coefficient de \(x\).`) },
        { t: 'Formes composées', html: tbl(['Fonction', r`\(u\) et la forme`, 'Une primitive', 'Sur'], [
          [r`\(f_1\)`, r`\(u = x^2 + 1\) : \(\frac{3}{2}\cdot\frac{u'}{u}\)`, r`\(\frac{3}{2}\ln(x^2 + 1) - \frac{5}{2}x^2\)`, r`\(\R\)`],
          [r`\(f_2\)`, r`\(u = x^3 + x + 1\), \(u' = 3x^2 + 1\) : \(12\,u'u^2\)`, r`\(4(x^3 + x + 1)^3\)`, r`\(\R\)`],
          [r`\(f_3\)`, r`\(u = x^2 + 4x + 1\), \(u' = 2x + 4\) : \(\frac{2u'}{\sqrt{u}}\)`, r`\(4\sqrt{x^2 + 4x + 1}\)`, r`un intervalle où \(u \gt 0\), par exemple \(]0, +\infty[\)`],
          [r`\(f_4\)`, r`\(u = \cos(2x + 1)\), \(u' = -2\sin(2x + 1)\) : \(-\frac{1}{2}\cdot\frac{u'}{u^2}\)`, r`\(\dfrac{1}{2\cos(2x + 1)}\)`, r`un intervalle où \(\cos(2x + 1) \neq 0\)`],
          [r`\(f_5\)`, r`\(u = \cos(x)\) : \(-\frac{u'}{u}\)`, r`\(-\ln|\cos(x)|\)`, r`\(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) par exemple`],
          [r`\(f_6\)`, r`\(u = x^4 + 4x\), \(u' = 4(x^3 + 1)\) : \(\frac{1}{4}u'e^u\)`, r`\(\frac{1}{4}e^{x^4 + 4x}\)`, r`\(\R\)`],
          [r`\(f_7\)`, 'tableau 1', r`\(9\arctan(x)\)`, r`\(\R\)`]]) }],
      answer: p(r`Vérifie chaque primitive en la dérivant : c’est le seul contrôle fiable, et il prend dix secondes.`),
      traps: [r`\(f_2\) : \(9x^2 + 3 = 3(3x^2 + 1) = 3u'\), donc \(f_2 = 12\,u'u^2\) et la primitive est \(12 \times \frac{u^3}{3} = 4u^3\).`, r`\(f_4\) : \(\frac{u'}{u^2}\) a pour primitive \(-\frac{1}{u}\) ; avec le facteur \(-\frac{1}{2}\), les deux signes moins se compensent.`], note: NOCOR },

    /* ================================================================== TD 3, partie 2 : rectangles */
    { id: 'td3-2-3', stage: 'cc', kind: 'td', order: 4, src: 'TD 3 · ex. 2.3', title: 'Encadrer l’intégrale de √x avec quatre rectangles', topics: ['rectangles'], lvl: 1, time: 8,
      intro: r`La fonction \(f : x \mapsto \sqrt{x}\) a été encadrée par deux séries de quatre rectangles de base 1 sur \([0, 4]\). Donner un encadrement de \(\displaystyle\int_0^4 f(x)\,dx\).`,
      hints: [r`\(f\) est croissante : hauteur au bord gauche pour les rectangles inférieurs, au bord droit pour les rectangles supérieurs.`],
      solution: [{ t: 'Les deux sommes', html: model(p(r`\(f\) est continue, positive et croissante sur \([0, 4]\). Avec quatre intervalles de longueur 1 :`) + p(r`rectangles inférieurs : \(1 \times \left(\sqrt{0} + \sqrt{1} + \sqrt{2} + \sqrt{3}\right) = 1 + \sqrt{2} + \sqrt{3} \approx 4{,}15\) ;`) + p(r`rectangles supérieurs : \(1 \times \left(\sqrt{1} + \sqrt{2} + \sqrt{3} + \sqrt{4}\right) = 3 + \sqrt{2} + \sqrt{3} \approx 6{,}15\).`)) }],
      answer: p(r`\(1 + \sqrt{2} + \sqrt{3} \leq \displaystyle\int_0^4 \sqrt{x}\,dx \leq 3 + \sqrt{2} + \sqrt{3}\). Valeur exacte : \(\left[\frac{2}{3}x^{3/2}\right]_0^4 = \frac{16}{3} \approx 5{,}33\).`),
      traps: [r`L’écart entre les deux sommes vaut \(\left(f(4) - f(0)\right) \times 1 = 2\) : les termes du milieu sont communs.`], note: NOCOR },

    { id: 'td3-2-4', stage: 'cc', kind: 'td', order: 5, src: 'TD 3 · ex. 2.4', title: 'Encadrer l’intégrale de ln entre 1 et 6', topics: ['rectangles'], lvl: 2, time: 12,
      intro: r`On considère la fonction \(\ln\) sur \([1, 6]\).`,
      questions: [r`En partageant l’intervalle en 5 intervalles de même amplitude, déterminer un encadrement de \(\displaystyle\int_1^6 \ln(x)\,dx\).`, r`(Travail personnel) Même question avec 10 intervalles.`],
      hints: [r`Amplitude : \(\frac{6 - 1}{5} = 1\). \(\ln\) est croissante.`, r`Une somme de logarithmes est le logarithme d’un produit.`],
      solution: [
        { t: 'Cinq intervalles', html: model(p(r`\(\ln\) est continue, positive et croissante sur \([1, 6]\). Les points de découpage sont 1, 2, 3, 4, 5, 6.`) + p(r`\(\ln 1 + \ln 2 + \ln 3 + \ln 4 + \ln 5 \leq \displaystyle\int_1^6 \ln(x)\,dx \leq \ln 2 + \ln 3 + \ln 4 + \ln 5 + \ln 6\)`) + p(r`soit \(\ln(120) \leq \displaystyle\int_1^6 \ln(x)\,dx \leq \ln(720)\), environ \(4{,}79 \leq I \leq 6{,}58\).`)) },
        { t: 'Dix intervalles', html: p(r`Amplitude 0,5 ; points \(1, 1{,}5, 2, \ldots, 6\). Somme inférieure : \(0{,}5 \times \left(\ln 1 + \ln 1{,}5 + \cdots + \ln 5{,}5\right) \approx 5{,}29\). Somme supérieure : \(0{,}5 \times \left(\ln 1{,}5 + \cdots + \ln 6\right) \approx 6{,}18\). L’écart est divisé par 2 : il vaut \(0{,}5 \times \ln 6 \approx 0{,}90\).`) }],
      answer: p(r`\(\ln(120) \leq I \leq \ln(720)\) ; avec 10 intervalles \(5{,}29 \leq I \leq 6{,}18\). Valeur exacte (par parties) : \(6\ln 6 - 5 \approx 5{,}75\).`),
      traps: [r`Avec 10 intervalles, ne pas oublier le facteur \(0{,}5\) (la largeur).`], note: NOCOR },

    { id: 'td3-2-5', stage: 'cc', kind: 'td', order: 6, src: 'TD 3 · ex. 2.5', title: 'Encadrer ln(2) à 0,1 près', topics: ['rectangles'], lvl: 3, time: 12,
      intro: r`Proposer une méthode pour encadrer \(\ln(2)\) par excès et par défaut à \(10^{-1}\) près.`,
      hints: [r`\(\ln(2)\) est une intégrale : laquelle ?`, r`\(\ln(2) = \displaystyle\int_1^2 \frac{dx}{x}\) ; \(x \mapsto \frac{1}{x}\) est décroissante sur \([1, 2]\).`],
      solution: [
        { t: 'L’idée', html: p(r`\(\ln\) est la primitive de \(x \mapsto \frac{1}{x}\) qui s’annule en 1 : \(\ln(2) = \displaystyle\int_1^2 \frac{dx}{x}\). On applique la méthode des rectangles à \(f : x \mapsto \frac{1}{x}\), continue, positive et <b>décroissante</b> sur \([1, 2]\).`) },
        { t: 'Combien de rectangles ?', html: p(r`Avec \(n\) intervalles de longueur \(\frac{1}{n}\), l’écart entre les deux sommes vaut \(\left(f(1) - f(2)\right) \times \frac{1}{n} = \frac{1}{2n}\). Il est inférieur ou égal à \(10^{-1}\) dès que \(n \geq 5\).`) },
        { t: 'Le calcul', html: p(r`Avec \(n = 5\), \(f\) décroissante : la hauteur au bord droit donne la somme inférieure. \(\frac{1}{5}\left(\frac{1}{1{,}2} + \frac{1}{1{,}4} + \frac{1}{1{,}6} + \frac{1}{1{,}8} + \frac{1}{2}\right) \approx 0{,}646\) et \(\frac{1}{5}\left(1 + \frac{1}{1{,}2} + \frac{1}{1{,}4} + \frac{1}{1{,}6} + \frac{1}{1{,}8}\right) \approx 0{,}746\).`) }],
      answer: p(r`\(0{,}646 \leq \ln(2) \leq 0{,}746\) avec 5 rectangles (avec 10 : \(0{,}669 \leq \ln 2 \leq 0{,}719\)). Valeur : \(\ln 2 \approx 0{,}693\).`),
      traps: [r`Fonction décroissante : les rôles des bords gauche et droit s’échangent.`], note: NOCOR },

    /* ================================================================== TD 3, partie 3 : aires */
    { id: 'td3-3-6', stage: 'cc', kind: 'td', order: 7, src: 'TD 3 · ex. 3.6', title: 'Quatre intégrales par des aires de triangles', topics: ['aires'], lvl: 1, time: 10,
      intro: r`Déterminer, à l’aide d’une représentation graphique, les valeurs des intégrales suivantes.`,
      questions: [r`\(\displaystyle\int_0^6 x\,dx\)`, r`\(\displaystyle\int_{-2}^{6} x\,dx\)`, r`\(\displaystyle\int_{-2}^{1} (2x + 1)\,dx\)`, r`(Travail personnel) \(\displaystyle\int_0^4 (-x + 3)\,dx\)`],
      hints: [r`Trace la droite, repère où elle coupe l’axe des abscisses : un triangle de chaque côté.`, r`Sous l’axe : l’aire compte négativement.`],
      solution: [
        { t: 'Un triangle', html: p(r`Sous \(y = x\) entre 0 et 6 : triangle de base 6 et de hauteur 6. \(\displaystyle\int_0^6 x\,dx = \frac{6 \times 6}{2} = 18\).`) },
        { t: 'Deux triangles', html: p(r`Sur \([-2, 0]\), la droite est sous l’axe : triangle d’aire \(\frac{2 \times 2}{2} = 2\), compté \(-2\). Donc \(\displaystyle\int_{-2}^{6} x\,dx = -2 + 18 = 16\).`) },
        { t: 'Deux triangles égaux', html: p(r`\(2x + 1 = 0\) pour \(x = -\frac{1}{2}\). Sur \(\left[-2, -\frac{1}{2}\right]\) : triangle de base \(1{,}5\) et de hauteur \(|2 \times (-2) + 1| = 3\), aire \(2{,}25\), sous l’axe. Sur \(\left[-\frac{1}{2}, 1\right]\) : base \(1{,}5\), hauteur 3, aire \(2{,}25\), au-dessus. L’intégrale vaut \(-2{,}25 + 2{,}25 = 0\).`) },
        { t: 'Le travail personnel', html: p(r`\(-x + 3 = 0\) pour \(x = 3\). Au-dessus sur \([0, 3]\) : \(\frac{3 \times 3}{2} = 4{,}5\). En dessous sur \([3, 4]\) : \(\frac{1 \times 1}{2} = 0{,}5\). L’intégrale vaut \(4{,}5 - 0{,}5 = 4\).`) }],
      answer: p(r`\(18\) ; \(16\) ; \(0\) ; \(4\). Vérification par primitive : \(\left[\frac{x^2}{2}\right]_{-2}^{6} = 18 - 2 = 16\), \(\left[x^2 + x\right]_{-2}^{1} = 2 - 2 = 0\).`),
      traps: [r`Une intégrale nulle ne veut pas dire une fonction nulle : les aires se compensent.`], note: NOCOR },

    { id: 'td3-3-7', stage: 'cc', kind: 'td', order: 8, src: 'TD 3 · ex. 3.7 et 3.8', title: 'Fonctions affines par morceaux', topics: ['aires', 'integrales'], lvl: 2, time: 20,
      intro: r`On considère \(f\) définie sur \(I = [-1, 6]\) par \(f(x) = 1\) si \(x \in [-1, 2]\), \(f(x) = -x + 3\) si \(x \in\ ]2, 4]\), \(f(x) = x - 5\) si \(x \in\ ]4, 6]\).`,
      questions: [r`Construire la courbe de \(f\) sur \(I\). Justifier graphiquement que \(f\) est continue et donner son signe.`, r`Déterminer graphiquement \(\displaystyle\int_{-1}^{6} f(t)\,dt\), puis retrouver le résultat par le calcul.`,
        r`(Travail maison, ex. 3.8) Mêmes questions sur \([-1, 7]\) pour \(g(x) = \dfrac{x + 1}{2}\) si \(x \in [-1, 1]\), \(-x + 2\) si \(x \in\ ]1, 4]\), \(-2\) si \(x \in\ ]4, 7]\).`],
      hints: [r`Continuité : les morceaux se raccordent-ils en 2 et en 4 ?`, r`Par le calcul : relation de Chasles, une intégrale par morceau.`],
      solution: [
        { t: 'Courbe, continuité, signe', html: p(r`En 2 : \(1\) et \(-2 + 3 = 1\). En 4 : \(-4 + 3 = -1\) et \(4 - 5 = -1\). Les morceaux se raccordent : \(f\) est continue sur \(I\). \(f \geq 0\) sur \([-1, 3]\), \(f \leq 0\) sur \([3, 5]\), \(f \geq 0\) sur \([5, 6]\).`) },
        { t: 'L’intégrale de f', html: model(p(r`Graphiquement : rectangle \(3 \times 1 = 3\) sur \([-1, 2]\) ; triangle \(+\frac{1}{2}\) sur \([2, 3]\) ; triangles \(-\frac{1}{2}\) sur \([3, 4]\) et \(-\frac{1}{2}\) sur \([4, 5]\) ; triangle \(+\frac{1}{2}\) sur \([5, 6]\). Total : \(3 + \frac{1}{2} - \frac{1}{2} - \frac{1}{2} + \frac{1}{2} = 3\).`) +
          p(r`Par le calcul (Chasles) : \(\displaystyle\int_{-1}^{2} 1\,dt + \int_2^4 (-t + 3)\,dt + \int_4^6 (t - 5)\,dt = 3 + \left[-\frac{t^2}{2} + 3t\right]_2^4 + \left[\frac{t^2}{2} - 5t\right]_4^6 = 3 + (4 - 4) + (-12 + 12) = 3\).`)) },
        { t: 'L’exercice 3.8', html: p(r`\(g\) est continue (en 1 : \(1\) et \(1\) ; en 4 : \(-2\) et \(-2\)), positive sur \([-1, 2]\), négative sur \([2, 7]\). Aires : triangle \(\frac{2 \times 1}{2} = 1\) sur \([-1, 1]\) ; triangle \(\frac{1 \times 1}{2} = \frac{1}{2}\) sur \([1, 2]\) ; triangle \(\frac{2 \times 2}{2} = 2\) sous l’axe sur \([2, 4]\) ; rectangle \(3 \times 2 = 6\) sous l’axe sur \([4, 7]\). \(\displaystyle\int_{-1}^{7} g(t)\,dt = 1 + \frac{1}{2} - 2 - 6 = -\frac{13}{2}\).`) }],
      answer: p(r`\(\displaystyle\int_{-1}^{6} f = 3\) ; \(\displaystyle\int_{-1}^{7} g = -\frac{13}{2}\).`),
      traps: [r`Utiliser la mauvaise expression sur un morceau : écris l’intervalle à côté de chaque intégrale.`], note: NOCOR },

    { id: 'td3-3-9', stage: 'cc', kind: 'td', order: 9, src: 'TD 3 · ex. 3.9 et 3.10', title: 'Un demi-cercle, puis une aire entre courbe et axe', topics: ['aires', 'integrales'], lvl: 2, time: 15,
      intro: r`Deux lectures graphiques.`,
      questions: [r`La courbe de \(f\) sur \([-4, 2]\) est : le segment de \((-4, 1)\) à \((-3, 2)\), le palier \(y = 2\) sur \([-3, -2]\), un demi-cercle sur \([-2, 0]\) (il descend jusqu’au point \((-1, 1)\)), puis le segment de \((0, 2)\) à \((2, 1)\). Calculer \(\displaystyle\int_{-4}^{2} f(x)\,dx\).`,
        r`Soit \(f : x \mapsto x + \dfrac{3}{x} - 4\). Déterminer l’aire de la partie comprise entre la courbe et l’axe des abscisses, entre les deux points où la courbe coupe l’axe.`],
      hints: [r`Sur \([-2, 0]\) : un rectangle auquel on retire un demi-disque.`, r`Question 2 : résous \(f(x) = 0\) (multiplie par \(x\)), puis regarde le signe de \(f\) entre les racines.`],
      solution: [
        { t: 'Le découpage', html: p(r`Trapèze sur \([-4, -3]\) : \(\frac{(1 + 2) \times 1}{2} = \frac{3}{2}\). Rectangle sur \([-3, -2]\) : 2. Sur \([-2, 0]\) : rectangle \(2 \times 2 = 4\) moins un demi-disque de rayon 1, \(\frac{\pi}{2}\). Trapèze sur \([0, 2]\) : \(\frac{(2 + 1) \times 2}{2} = 3\).`) + p(r`\(\displaystyle\int_{-4}^{2} f(x)\,dx = \frac{3}{2} + 2 + 4 - \frac{\pi}{2} + 3 = \frac{21}{2} - \frac{\pi}{2}\).`) },
        { t: 'L’aire de la partie foncée', html: model(p(r`\(f(x) = 0 \iff x^2 - 4x + 3 = 0 \iff x = 1 \text{ ou } x = 3\). Sur \([1, 3]\), \(f(x) = \frac{(x - 1)(x - 3)}{x} \leq 0\) : la courbe est sous l’axe.`) + p(r`L’aire est donc \(-\displaystyle\int_1^3 f(x)\,dx = -\left[\frac{x^2}{2} + 3\ln(x) - 4x\right]_1^3 = -\left(\left(\frac{9}{2} + 3\ln 3 - 12\right) - \left(\frac{1}{2} - 4\right)\right) = 4 - 3\ln(3)\).`)) }],
      answer: p(r`\(\dfrac{21}{2} - \dfrac{\pi}{2}\) ; aire \(= 4 - 3\ln(3) \approx 0{,}70\) unité d’aire.`),
      traps: [r`Une aire est positive : sous l’axe, c’est l’opposé de l’intégrale.`, r`Demi-disque : \(\frac{\pi r^2}{2}\), pas \(\pi r^2\).`], note: NOCOR },

    /* ================================================================== TD 3 : calculs par primitives */
    { id: 'td3-3-11', stage: 'cc', kind: 'td', order: 10, src: 'TD 3 · ex. 3.11', title: 'Neuf intégrales à l’aide de primitives', topics: ['integrales', 'primitives'], lvl: 2, time: 35,
      intro: r`À l’aide de primitives, calculer les intégrales ci-dessous.`,
      questions: [r`\(I_1 = \displaystyle\int_0^2 3te^{-t^2}\,dt\) ; \(I_2 = \displaystyle\int_0^1 4t(2t^2 + 1)^4\,dt\) ; \(I_3 = \displaystyle\int_1^e \frac{(\ln t)^2}{t}\,dt\).`,
        r`\(I_4 = \displaystyle\int_{\pi/6}^{\pi/3} \tan(x)\,dx\) ; \(I_5 = \displaystyle\int_0^1 \frac{t^2 + 1}{2\sqrt{t^3 + 3t}}\,dt\) ; \(I_6 = \displaystyle\int_0^{\pi/4} \frac{\sin(x)}{\sqrt{\cos(x)}}\,dx\) (travail personnel).`,
        r`\(I_7 = \displaystyle\int_{-\pi/4}^{\pi/4} \tan(x)(1 + \tan^2(x))\,dx\) ; \(I_8 = \displaystyle\int_0^1 \frac{\arctan(x)}{1 + x^2}\,dx\) ; \(I_9 = \displaystyle\int_0^1 x\sqrt{x^2 + 1}\,dx\).`],
      hints: [r`Dans chaque intégrale, cherche \(u\) dont la dérivée est en facteur : \(-t^2\), \(2t^2 + 1\), \(\ln t\), \(\cos x\), \(t^3 + 3t\), \(\cos x\), \(\tan x\), \(\arctan x\), \(x^2 + 1\).`, r`\(I_7\) : regarde la parité avant de calculer.`],
      solution: [{ t: 'Forme, primitive, valeur', html: tbl(['', r`\(u\) et la forme`, 'Primitive', 'Valeur'], [
        [r`\(I_1\)`, r`\(u = -t^2\) : \(-\frac{3}{2}u'e^u\)`, r`\(-\frac{3}{2}e^{-t^2}\)`, r`\(\frac{3}{2}\left(1 - e^{-4}\right)\)`],
        [r`\(I_2\)`, r`\(u = 2t^2 + 1\) : \(u'u^4\)`, r`\(\frac{1}{5}(2t^2 + 1)^5\)`, r`\(\frac{3^5 - 1}{5} = \frac{242}{5}\)`],
        [r`\(I_3\)`, r`\(u = \ln t\) : \(u'u^2\)`, r`\(\frac{1}{3}(\ln t)^3\)`, r`\(\frac{1}{3}\)`],
        [r`\(I_4\)`, r`\(u = \cos x\) : \(-\frac{u'}{u}\)`, r`\(-\ln(\cos x)\)`, r`\(-\ln\frac{1}{2} + \ln\frac{\sqrt{3}}{2} = \frac{1}{2}\ln 3\)`],
        [r`\(I_5\)`, r`\(u = t^3 + 3t\), \(u' = 3(t^2 + 1)\) : \(\frac{1}{3}\cdot\frac{u'}{2\sqrt{u}}\)`, r`\(\frac{1}{3}\sqrt{t^3 + 3t}\)`, r`\(\frac{1}{3}\sqrt{4} = \frac{2}{3}\)`],
        [r`\(I_6\)`, r`\(u = \cos x\) : \(-\frac{u'}{\sqrt{u}}\)`, r`\(-2\sqrt{\cos x}\)`, r`\(2 - 2\sqrt{\tfrac{\sqrt{2}}{2}} = 2 - 2^{3/4}\)`],
        [r`\(I_7\)`, r`\(u = \tan x\) : \(u'u\) ; fonction impaire`, r`\(\frac{1}{2}\tan^2 x\)`, r`\(0\)`],
        [r`\(I_8\)`, r`\(u = \arctan x\) : \(u'u\)`, r`\(\frac{1}{2}(\arctan x)^2\)`, r`\(\frac{1}{2}\left(\frac{\pi}{4}\right)^2 = \frac{\pi^2}{32}\)`],
        [r`\(I_9\)`, r`\(u = x^2 + 1\) : \(\frac{1}{2}u'u^{1/2}\)`, r`\(\frac{1}{3}(x^2 + 1)^{3/2}\)`, r`\(\frac{2\sqrt{2} - 1}{3}\)`]]) }],
      answer: model(p(r`\(I_3\) : soit \(u(t) = \ln(t)\), \(u'(t) = \frac{1}{t}\). \(\frac{(\ln t)^2}{t} = u'(t)\,u(t)^2\), de primitive \(\frac{u^3}{3}\). \(I_3 = \left[\frac{(\ln t)^3}{3}\right]_1^e = \frac{1}{3} - 0 = \frac{1}{3}\).`), 'Rédaction modèle pour une ligne'),
      traps: [r`\(I_4\) : sur \(\left[\frac{\pi}{6}, \frac{\pi}{3}\right]\) le cosinus est positif, la valeur absolue disparaît.`, r`\(I_2\) : \(4t\) est exactement \(u'\), pas besoin de constante.`], note: NOCOR + ' ' + r`\(I_9\) est tombée au contrôle de cours d’octobre 2022.` },

    /* ================================================================== Moodle 2.2 : IPP */
    { id: 'mo-22-1', stage: 'cc', kind: 'moodle', order: 11, src: 'Moodle · IPP · ex. 1', title: 'Deux intégrations par parties : x² cos x', topics: ['ipp'], lvl: 2, time: 10,
      intro: r`Calculer, à l’aide de l’intégration par parties, \(\displaystyle\int_0^{\pi} x^2\cos(x)\,dx\).`,
      hints: [r`Dérive le polynôme : \(u(x) = x^2\), \(v'(x) = \cos(x)\).`, r`Il reste \(\displaystyle\int_0^{\pi} x\sin(x)\,dx\) : une deuxième IPP.`],
      solution: [
        { t: 'Première IPP', html: p(r`\(u(x) = x^2\), \(u'(x) = 2x\), \(v'(x) = \cos x\), \(v(x) = \sin x\). \(\displaystyle\int_0^{\pi} x^2\cos x\,dx = \left[x^2\sin x\right]_0^{\pi} - \int_0^{\pi} 2x\sin x\,dx = -2\int_0^{\pi} x\sin x\,dx\), car \(\sin\pi = 0\).`) },
        { t: 'Deuxième IPP', html: p(r`\(\displaystyle\int_0^{\pi} x\sin x\,dx = \left[x(-\cos x)\right]_0^{\pi} - \int_0^{\pi} (-\cos x)\,dx = (\pi - 0) + \left[\sin x\right]_0^{\pi} = \pi\).`) }],
      answer: p(r`\(\displaystyle\int_0^{\pi} x^2\cos x\,dx = -2\pi\).`),
      traps: [r`\(-\pi\cos(\pi) = +\pi\) : attention aux deux signes moins.`], official: true, note: OFF },

    { id: 'mo-22-2', stage: 'cc', kind: 'moodle', order: 12, src: 'Moodle · IPP · ex. 2 et 3', title: 'x ln x, puis (2x + 3)e^(−3x)', topics: ['ipp'], lvl: 2, time: 12,
      intro: r`Deux intégrations par parties.`,
      questions: [r`Déterminer une primitive de \(f(x) = x\ln(x)\) à l’aide d’une intégration par parties.`, r`Calculer \(\displaystyle\int_0^2 (2x + 3)e^{-3x}\,dx\).`],
      hints: [r`Question 1 : la dérivée de \(\ln\) est plus simple que sa primitive, donc \(u = \ln\).`, r`Question 2 : \(v'(x) = e^{-3x}\) donne \(v(x) = \dfrac{e^{-3x}}{-3}\).`],
      solution: [
        { t: 'x ln x', html: p(r`\(u(x) = \ln x\), \(u'(x) = \frac{1}{x}\), \(v'(x) = x\), \(v(x) = \frac{x^2}{2}\). \(\displaystyle\int x\ln x\,dx = \frac{x^2}{2}\ln x - \int \frac{x^2}{2} \times \frac{1}{x}\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4} + k\).`) },
        { t: '(2x + 3)e^(−3x)', html: p(r`\(\displaystyle\int_0^2 (2x + 3)e^{-3x}\,dx = \left[(2x + 3)\frac{e^{-3x}}{-3}\right]_0^2 - \int_0^2 2\,\frac{e^{-3x}}{-3}\,dx = -\frac{7e^{-6}}{3} + 1 - \left[\frac{2e^{-3x}}{9}\right]_0^2 = -\frac{7e^{-6}}{3} + 1 - \frac{2e^{-6}}{9} + \frac{2}{9}\).`) }],
      answer: p(r`\(\dfrac{x^2}{2}\ln x - \dfrac{x^2}{4} + k\) ; \(\dfrac{11 - 23e^{-6}}{9}\).`),
      traps: [r`Diviser par \(-3\) : le signe change deux fois dans la deuxième intégrale.`], official: true, note: OFF },

    { id: 'mo-22-4', stage: 'cc', kind: 'moodle', order: 13, src: 'Moodle · IPP · ex. 4', title: 'Une relation de récurrence par IPP', topics: ['ipp'], lvl: 3, time: 10,
      intro: r`Soit, pour \(n \in \N\), \(I_n = \displaystyle\int_0^1 t^n e^{-t}\,dt\). Déterminer une relation entre \(I_{n+1}\) et \(I_n\).`,
      hints: [r`Pars de \(I_{n+1}\) et dérive la puissance : \(u(t) = t^{n+1}\), \(v'(t) = e^{-t}\).`],
      solution: [{ t: 'L’IPP', html: p(r`\(u(t) = t^{n+1}\), \(u'(t) = (n + 1)t^n\), \(v'(t) = e^{-t}\), \(v(t) = -e^{-t}\).`) + p(r`\(I_{n+1} = \left[t^{n+1}(-e^{-t})\right]_0^1 - \displaystyle\int_0^1 (n + 1)t^n(-e^{-t})\,dt = -e^{-1} + (n + 1)I_n\).`) }],
      answer: p(r`\(I_{n+1} = (n + 1)I_n - \dfrac{1}{e}\). Avec \(I_0 = 1 - \dfrac{1}{e}\) : \(I_1 = 1 - \dfrac{2}{e}\).`),
      traps: [r`En 0, \(t^{n+1} = 0\) : le crochet ne garde que la valeur en 1.`], official: true, note: OFF },

    { id: 'td3-3-12', stage: 'cc', kind: 'td', order: 14, src: 'TD 3 · ex. 3.12', title: 'Sept intégrales par parties', topics: ['ipp'], lvl: 2, time: 40,
      intro: r`À l’aide d’une ou plusieurs intégrations par parties, calculer les intégrales ci-dessous.`,
      questions: [r`\(I = \displaystyle\int_0^1 (2x + 3)e^{3x}\,dx\) ; \(J = \displaystyle\int_0^{\pi/2} x\cos\left(\frac{x}{2}\right)dx\) ; \(K = \displaystyle\int_1^e \ln(x)\,dx\) ; \(L = \displaystyle\int_0^{\pi/4} x\sin(x)\,dx\).`,
        r`\(M = \displaystyle\int_0^{\pi} e^x\sin(x)\,dx\).`, r`★ \(N = \displaystyle\int_1^e \frac{\ln(x)}{x^2}\,dx\) ; ★ \(O = \displaystyle\int_0^{\pi/4} \frac{x}{\cos^2(x)}\,dx\).`],
      hints: [r`Polynôme \(\times\) exponentielle ou cosinus : dérive le polynôme. Logarithme : dérive le logarithme.`, r`\(M\) : deux IPP en gardant \(v' = e^x\), et \(M\) réapparaît.`, r`\(O\) : \(\frac{1}{\cos^2}\) est la dérivée de \(\tan\).`],
      solution: [
        { t: 'I, J, K, L', html: p(r`\(I = \left[(2x + 3)\frac{e^{3x}}{3}\right]_0^1 - \displaystyle\int_0^1 \frac{2e^{3x}}{3}\,dx = \frac{5e^3}{3} - 1 - \frac{2}{9}(e^3 - 1) = \frac{13e^3 - 7}{9}\).`) +
          p(r`\(J = \left[2x\sin\frac{x}{2}\right]_0^{\pi/2} - \displaystyle\int_0^{\pi/2} 2\sin\frac{x}{2}\,dx = \frac{\pi\sqrt{2}}{2} + \left[4\cos\frac{x}{2}\right]_0^{\pi/2} = \frac{\pi\sqrt{2}}{2} + 2\sqrt{2} - 4\).`) +
          p(r`\(K = \left[x\ln x\right]_1^e - \displaystyle\int_1^e 1\,dx = e - (e - 1) = 1\). \(L = \left[-x\cos x\right]_0^{\pi/4} + \displaystyle\int_0^{\pi/4} \cos x\,dx = -\frac{\pi\sqrt{2}}{8} + \frac{\sqrt{2}}{2} = \frac{\sqrt{2}(4 - \pi)}{8}\).`) },
        { t: 'M : l’intégrale qui revient', html: model(p(r`\(u = \sin x\), \(v' = e^x\) : \(M = \left[e^x\sin x\right]_0^{\pi} - \displaystyle\int_0^{\pi} e^x\cos x\,dx = -\int_0^{\pi} e^x\cos x\,dx\).`) + p(r`\(u = \cos x\), \(v' = e^x\) : \(\displaystyle\int_0^{\pi} e^x\cos x\,dx = \left[e^x\cos x\right]_0^{\pi} + \int_0^{\pi} e^x\sin x\,dx = -e^{\pi} - 1 + M\).`) + p(r`Donc \(M = e^{\pi} + 1 - M\), d’où \(M = \dfrac{e^{\pi} + 1}{2}\).`)) },
        { t: 'N et O', html: p(r`\(N\) : \(u = \ln x\), \(v' = \frac{1}{x^2}\), \(v = -\frac{1}{x}\). \(N = \left[-\frac{\ln x}{x}\right]_1^e + \displaystyle\int_1^e \frac{dx}{x^2} = -\frac{1}{e} + \left[-\frac{1}{x}\right]_1^e = 1 - \frac{2}{e}\).`) +
          p(r`\(O\) : \(u = x\), \(v' = \frac{1}{\cos^2 x}\), \(v = \tan x\). \(O = \left[x\tan x\right]_0^{\pi/4} - \displaystyle\int_0^{\pi/4} \tan x\,dx = \frac{\pi}{4} + \left[\ln(\cos x)\right]_0^{\pi/4} = \frac{\pi}{4} - \frac{1}{2}\ln 2\).`) }],
      answer: p(r`\(I = \frac{13e^3 - 7}{9}\) ; \(J = \frac{\pi\sqrt{2}}{2} + 2\sqrt{2} - 4\) ; \(K = 1\) ; \(L = \frac{\sqrt{2}(4 - \pi)}{8}\) ; \(M = \frac{e^{\pi} + 1}{2}\) ; \(N = 1 - \frac{2}{e}\) ; \(O = \frac{\pi}{4} - \frac{1}{2}\ln 2\).`),
      traps: [r`\(\ln\left(\cos\frac{\pi}{4}\right) = \ln\frac{\sqrt{2}}{2} = -\frac{1}{2}\ln 2\).`, r`Dans \(M\), ne change pas le rôle de \(e^x\) entre les deux IPP.`], note: NOCOR },

    /* ================================================================== Moodle 2.2 : changement de variable */
    { id: 'mo-22-5', stage: 'cc', kind: 'moodle', order: 15, src: 'Moodle · Changement de variable · ex. 5 et 6', title: 'Poser t = eˣ, puis u = tan t', topics: ['cdv'], lvl: 2, time: 12,
      intro: r`Deux changements de variable donnés.`,
      questions: [r`Calculer, en utilisant le changement de variable \(t = e^x\) : \(\displaystyle\int_0^1 \frac{e^x}{e^{2x} + 1}\,dx\).`, r`Déterminer la primitive \(\displaystyle\int \frac{\sin^3 t}{\cos^5 t}\,dt\), en posant \(u = \tan t\).`],
      hints: [r`\(dt = e^x\,dx\) : le numérateur est exactement \(dt\). N’oublie pas les bornes.`, r`\(du = \dfrac{dt}{\cos^2 t}\) : écris \(\dfrac{\sin^3 t}{\cos^5 t} = \dfrac{\sin^3 t}{\cos^3 t} \times \dfrac{1}{\cos^2 t}\).`],
      solution: [
        { t: 't = eˣ', html: p(r`\(t = e^x\) définit une bijection de \([0, 1]\) sur \([1, e]\). \(dt = e^x\,dx\) et \(e^{2x} = t^2\). Donc \(\displaystyle\int_0^1 \frac{e^x}{e^{2x} + 1}\,dx = \int_1^e \frac{dt}{t^2 + 1} = \arctan(e) - \arctan(1)\).`) },
        { t: 'u = tan t', html: p(r`\(du = \dfrac{dt}{\cos^2 t}\). \(\displaystyle\int \frac{\sin^3 t}{\cos^5 t}\,dt = \int \frac{\sin^3 t}{\cos^3 t}\,\frac{dt}{\cos^2 t} = \int u^3\,du = \frac{u^4}{4} + k\).`) }],
      answer: p(r`\(\arctan(e) - \dfrac{\pi}{4}\) ; \(\dfrac{\tan^4 t}{4} + k\).`),
      traps: [r`Bornes : \(x = 0 \Rightarrow t = 1\), \(x = 1 \Rightarrow t = e\).`, r`Sans bornes, on revient à la variable de départ à la fin.`], official: true, note: OFF },

    { id: 'td3-3-13', stage: 'cc', kind: 'td', order: 16, src: 'TD 3 · ex. 3.13', title: 'Six changements de variable donnés', topics: ['cdv'], lvl: 3, time: 45,
      intro: r`Calculer, via le changement de variable indiqué, les intégrales suivantes.`,
      questions: [r`\(I = \displaystyle\int_0^{1/2} \frac{4x^2}{(2x + 1)^2}\,dx\) en posant \(t = 2x + 1\) ; \(J = \displaystyle\int_0^{\ln\sqrt{3}} \frac{dt}{e^t + e^{-t}}\) en posant \(x = e^t\).`,
        r`\(K = \displaystyle\int_1^e \frac{\ln(x)}{\sqrt{x}}\,dx\) en posant \(t = \ln x\) ; \(L = \displaystyle\int_{-1}^{1} \frac{dx}{(x + 3)\sqrt{x + 2}}\) en posant \(t = \sqrt{x + 2}\).`,
        r`\(M = \displaystyle\int_0^4 e^{\sqrt{x}}\,dx\) en posant \(t = \sqrt{x}\) ; ★ \(N = \displaystyle\int_{\pi/6}^{\pi/3} \frac{dt}{\sin(t)\cos(t)}\) en posant \(x = \tan(t)\).`],
      hints: [r`Toujours les mêmes étapes : exprime l’ancienne variable, calcule le \(dx\), change les bornes, réécris tout.`, r`\(K\) et \(M\) se terminent par une intégration par parties.`, r`\(N\) : \(\dfrac{1}{\sin t\cos t} = \dfrac{1}{\tan t} \times \dfrac{1}{\cos^2 t}\).`],
      solution: [
        { t: 'I et J', html: p(r`\(I\) : \(x = \frac{t - 1}{2}\), \(dx = \frac{dt}{2}\), \(4x^2 = (t - 1)^2\), bornes 1 et 2. \(I = \frac{1}{2}\displaystyle\int_1^2 \frac{(t - 1)^2}{t^2}\,dt = \frac{1}{2}\int_1^2 \left(1 - \frac{2}{t} + \frac{1}{t^2}\right)dt = \frac{1}{2}\left[t - 2\ln t - \frac{1}{t}\right]_1^2 = \frac{3}{4} - \ln 2\).`) +
          p(r`\(J\) : \(x = e^t\), \(dx = e^t\,dt\) donc \(dt = \frac{dx}{x}\) ; bornes 1 et \(\sqrt{3}\). \(\frac{1}{e^t + e^{-t}} = \frac{x}{x^2 + 1}\). \(J = \displaystyle\int_1^{\sqrt{3}} \frac{dx}{x^2 + 1} = \frac{\pi}{3} - \frac{\pi}{4} = \frac{\pi}{12}\).`) },
        { t: 'K et L', html: p(r`\(K\) : \(x = e^t\), \(dx = e^t\,dt\), bornes 0 et 1. \(K = \displaystyle\int_0^1 \frac{t}{e^{t/2}}e^t\,dt = \int_0^1 t\,e^{t/2}\,dt = \left[2t\,e^{t/2}\right]_0^1 - \int_0^1 2e^{t/2}\,dt = 2\sqrt{e} - 4\sqrt{e} + 4 = 4 - 2\sqrt{e}\).`) +
          p(r`\(L\) : \(x = t^2 - 2\), \(dx = 2t\,dt\), \(x + 3 = t^2 + 1\), bornes 1 et \(\sqrt{3}\). \(L = \displaystyle\int_1^{\sqrt{3}} \frac{2t\,dt}{(t^2 + 1)t} = 2\left[\arctan t\right]_1^{\sqrt{3}} = \frac{\pi}{6}\).`) },
        { t: 'M et N', html: p(r`\(M\) : \(x = t^2\), \(dx = 2t\,dt\), bornes 0 et 2. \(M = \displaystyle\int_0^2 2t\,e^t\,dt = \left[2t\,e^t\right]_0^2 - \int_0^2 2e^t\,dt = 4e^2 - 2e^2 + 2 = 2e^2 + 2\).`) +
          p(r`\(N\) : \(dx = \frac{dt}{\cos^2 t}\), bornes \(\tan\frac{\pi}{6} = \frac{1}{\sqrt{3}}\) et \(\tan\frac{\pi}{3} = \sqrt{3}\). \(N = \displaystyle\int_{1/\sqrt{3}}^{\sqrt{3}} \frac{dx}{x} = \ln\sqrt{3} - \ln\frac{1}{\sqrt{3}} = \ln 3\).`) }],
      answer: p(r`\(I = \frac{3}{4} - \ln 2\) ; \(J = \frac{\pi}{12}\) ; \(K = 4 - 2\sqrt{e}\) ; \(L = \frac{\pi}{6}\) ; \(M = 2e^2 + 2\) ; \(N = \ln 3\).`),
      traps: [r`Oublier de changer les bornes, ou oublier le facteur du \(dx\) (\(2t\,dt\), \(\frac{dt}{2}\)).`], note: NOCOR + ' ' + r`\(J\) est tombée à l’examen de janvier 2024, \(L\) au partiel de novembre 2022.` },

    /* ================================================================== anciens contrôles et sujets */
    { id: 'cc2022o-ex3', exam: 'cc2022o', stage: 'cc', kind: 'partiel', order: 1, src: 'Contrôle de cours oct. 2022 · Ex 3', title: 'Une intégrale, puis énoncer et démontrer l’IPP', pts: 4.5, topics: ['integrales', 'ipp', 'demonstrations'], lvl: 2, time: 15,
      intro: r`Contrôle de cours du 3 octobre 2022, exercice 3.`,
      questions: [r`Sans utiliser d’intégration par parties ni de changement de variable, calculer \(I = \displaystyle\int_0^1 x\sqrt{x^2 + 1}\,dx\).`, r`Énoncer précisément le théorème d’intégration par parties, en n’oubliant pas ses hypothèses.`, r`Démontrer ce théorème.`],
      hints: [r`\(u = x^2 + 1\) : la dérivée \(2x\) est presque là.`, r`Hypothèse : deux fonctions de classe \(C^1\) sur \([a, b]\).`, r`Pars de la dérivée du produit \((fg)'\).`],
      solution: [
        { t: 'L’intégrale', html: p(r`Soit \(u(x) = x^2 + 1\), \(u'(x) = 2x\). \(x\sqrt{x^2 + 1} = \frac{1}{2}u'(x)u(x)^{1/2}\), de primitive \(\frac{1}{2} \times \frac{2}{3}u^{3/2}\). \(I = \left[\frac{1}{3}(x^2 + 1)^{3/2}\right]_0^1 = \frac{2\sqrt{2} - 1}{3}\).`) },
        { t: 'L’énoncé', html: model(p(r`Soient \(f\) et \(g\) deux fonctions de classe \(C^1\) sur un intervalle \([a, b]\). Alors \(\displaystyle\int_a^b f(x)g'(x)\,dx = \left[f(x)g(x)\right]_a^b - \int_a^b f'(x)g(x)\,dx\).`)) },
        { t: 'La démonstration', html: model(p(r`\(f\) et \(g\) sont de classe \(C^1\), donc \(fg\) est dérivable et \((fg)' = f'g + fg'\). Les fonctions \(f'g\) et \(fg'\) sont continues sur \([a, b]\), on peut intégrer :`) + p(r`\(\displaystyle\int_a^b (fg)'(x)\,dx = \int_a^b f'(x)g(x)\,dx + \int_a^b f(x)g'(x)\,dx\).`) + p(r`Or \(fg\) est une primitive de \((fg)'\), donc le membre de gauche vaut \(\left[f(x)g(x)\right]_a^b\). D’où la formule.`)) }],
      answer: p(r`\(I = \dfrac{2\sqrt{2} - 1}{3}\) ; l’énoncé avec « de classe \(C^1\) » ; la démonstration en trois lignes.`),
      traps: [r`Énoncer la formule sans l’hypothèse \(C^1\) : la question dit « en n’oubliant pas ses hypothèses ».`], note: 'Correction rédigée pour le site, résultat recalculé par programme.' },

    { id: 'cc2020o-ex', exam: 'cc2020o', stage: 'cc', kind: 'partiel', order: 2, src: 'Contrôle de cours oct. 2020', title: 'Une primitive directe, une IPP', topics: ['integrales', 'ipp'], lvl: 2, time: 12,
      intro: r`Calculer les intégrales suivantes.`,
      questions: [r`\(I_1 = \displaystyle\int_1^2 \frac{3t^2 + 2}{(t^3 + 2t)^2}\,dt\).`, r`\(I_2 = \displaystyle\int_0^{\pi/6} x\sin(3x)\,dx\).`],
      hints: [r`\(I_1\) : \(u = t^3 + 2t\), forme \(\frac{u'}{u^2}\).`, r`\(I_2\) : \(u = x\), \(v' = \sin(3x)\), \(v = -\frac{\cos(3x)}{3}\).`],
      solution: [
        { t: 'I₁', html: p(r`\(u(t) = t^3 + 2t\), \(u'(t) = 3t^2 + 2\). \(\frac{u'}{u^2}\) a pour primitive \(-\frac{1}{u}\). \(I_1 = \left[-\frac{1}{t^3 + 2t}\right]_1^2 = -\frac{1}{12} + \frac{1}{3} = \frac{1}{4}\).`) },
        { t: 'I₂', html: p(r`\(I_2 = \left[-\frac{x\cos(3x)}{3}\right]_0^{\pi/6} + \displaystyle\int_0^{\pi/6} \frac{\cos(3x)}{3}\,dx = 0 + \left[\frac{\sin(3x)}{9}\right]_0^{\pi/6} = \frac{1}{9}\), car \(\cos\frac{\pi}{2} = 0\) et \(\sin\frac{\pi}{2} = 1\).`) }],
      answer: p(r`\(I_1 = \dfrac{1}{4}\) ; \(I_2 = \dfrac{1}{9}\).`), traps: [r`\(-\frac{1}{12} - \left(-\frac{1}{3}\right)\) : parenthèses autour de \(F(1)\).`], note: 'Correction rédigée pour le site, résultats recalculés par programme.' },

    { id: 'p2022-int', exam: 'p2022', stage: 'cc', kind: 'partiel', order: 3, src: 'Partiel nov. 2022 · intégrales', title: 'Le trio : primitive, IPP, changement de variable', topics: ['integrales', 'ipp', 'cdv'], lvl: 2, time: 25,
      intro: r`Calculer les intégrales suivantes.`,
      questions: [r`\(I = \displaystyle\int_0^1 \frac{2x^3 + 1}{(x^4 + 2x + 1)^3}\,dx\) (sans intégration par parties ni changement de variable).`, r`\(J = \displaystyle\int_0^{\pi/4} (2x + 1)\sin(2x)\,dx\) (par parties).`, r`\(K = \displaystyle\int_{-1}^{1} \frac{dx}{(x + 3)\sqrt{x + 2}}\) en posant \(t = \sqrt{x + 2}\).`],
      hints: [r`\(I\) : \(u = x^4 + 2x + 1\), \(u' = 2(2x^3 + 1)\).`, r`\(J\) : dérive \(2x + 1\).`, r`\(K\) : \(x = t^2 - 2\), \(dx = 2t\,dt\).`],
      solution: [
        { t: 'I', html: p(r`\(\frac{2x^3 + 1}{u^3} = \frac{1}{2}u'u^{-3}\), de primitive \(\frac{1}{2} \times \frac{u^{-2}}{-2} = -\frac{1}{4u^2}\). \(I = \left[-\frac{1}{4(x^4 + 2x + 1)^2}\right]_0^1 = -\frac{1}{64} + \frac{1}{4} = \frac{15}{64}\).`) },
        { t: 'J', html: p(r`\(u = 2x + 1\), \(u' = 2\), \(v' = \sin(2x)\), \(v = -\frac{\cos(2x)}{2}\). \(J = \left[-\frac{(2x + 1)\cos(2x)}{2}\right]_0^{\pi/4} + \displaystyle\int_0^{\pi/4} \cos(2x)\,dx = \frac{1}{2} + \left[\frac{\sin(2x)}{2}\right]_0^{\pi/4} = \frac{1}{2} + \frac{1}{2} = 1\).`) },
        { t: 'K', html: p(r`\(x + 3 = t^2 + 1\) ; bornes : \(x = -1 \Rightarrow t = 1\), \(x = 1 \Rightarrow t = \sqrt{3}\). \(K = \displaystyle\int_1^{\sqrt{3}} \frac{2t\,dt}{(t^2 + 1)t} = 2\left[\arctan t\right]_1^{\sqrt{3}} = 2\left(\frac{\pi}{3} - \frac{\pi}{4}\right) = \frac{\pi}{6}\).`) }],
      answer: p(r`\(I = \dfrac{15}{64}\) ; \(J = 1\) ; \(K = \dfrac{\pi}{6}\).`), traps: [r`Dans \(J\), \(\cos\frac{\pi}{2} = 0\) : le crochet ne garde que la borne 0, avec un double signe moins.`], official: true, note: 'Résultats conformes au corrigé officiel, recalculés par programme.' },

    { id: 'p2021-int', exam: 'p2021', stage: 'cc', kind: 'partiel', order: 4, src: 'Partiel nov. 2021 · intégrales', title: 'Le trio, version 2021', topics: ['integrales', 'ipp', 'cdv'], lvl: 2, time: 25,
      intro: r`Calculer les intégrales suivantes.`,
      questions: [r`\(I = \displaystyle\int_0^1 (x^2 + 1)\sqrt{x^3 + 3x + 1}\,dx\).`, r`\(J = \displaystyle\int_0^1 (2x + 1)e^{2x}\,dx\).`, r`\(K = \displaystyle\int_1^{2\sqrt{3} + 1} \frac{dx}{(x - 1)^2 + 4}\) en posant \(x = 2t + 1\).`],
      hints: [r`\(I\) : \(u = x^3 + 3x + 1\), \(u' = 3(x^2 + 1)\).`, r`\(K\) : \((x - 1)^2 + 4 = 4t^2 + 4\) et \(dx = 2\,dt\).`],
      solution: [
        { t: 'I', html: p(r`\((x^2 + 1)\sqrt{u} = \frac{1}{3}u'u^{1/2}\), de primitive \(\frac{2}{9}u^{3/2}\). \(I = \left[\frac{2}{9}(x^3 + 3x + 1)^{3/2}\right]_0^1 = \frac{2}{9}\left(5\sqrt{5} - 1\right) = \frac{10\sqrt{5} - 2}{9}\).`) },
        { t: 'J', html: p(r`\(u = 2x + 1\), \(v' = e^{2x}\), \(v = \frac{e^{2x}}{2}\). \(J = \left[(2x + 1)\frac{e^{2x}}{2}\right]_0^1 - \displaystyle\int_0^1 e^{2x}\,dx = \frac{3e^2}{2} - \frac{1}{2} - \frac{e^2}{2} + \frac{1}{2} = e^2\).`) },
        { t: 'K', html: p(r`Bornes : \(x = 1 \Rightarrow t = 0\), \(x = 2\sqrt{3} + 1 \Rightarrow t = \sqrt{3}\). \(K = \displaystyle\int_0^{\sqrt{3}} \frac{2\,dt}{4(t^2 + 1)} = \frac{1}{2}\arctan(\sqrt{3}) = \frac{\pi}{6}\).`) }],
      answer: p(r`\(I = \dfrac{10\sqrt{5} - 2}{9}\) ; \(J = e^2\) ; \(K = \dfrac{\pi}{6}\).`), traps: [r`\(5^{3/2} = 5\sqrt{5}\).`], official: true, note: 'Résultats conformes au corrigé officiel, recalculés par programme.' },

    { id: 'p2020-int', exam: 'p2020', stage: 'cc', kind: 'partiel', order: 5, src: 'Partiel nov. 2020 · dérivée et intégrales', title: 'Une dérivée composée, un changement de variable, une IPP', topics: ['primitives', 'ipp', 'cdv'], lvl: 2, time: 20,
      intro: r`Trois questions indépendantes.`,
      questions: [r`Dériver \(x \mapsto \sin\left(e^{3x} + 2\right)\).`, r`\(J = \displaystyle\int_0^1 \frac{dx}{x^2 + 3}\) en posant \(t = \dfrac{x}{\sqrt{3}}\).`, r`\(K = \displaystyle\int_1^e \frac{\ln(x)}{\sqrt{x}}\,dx\) par parties.`],
      hints: [r`\((\sin u)' = u'\cos u\).`, r`\(x = \sqrt{3}\,t\), \(dx = \sqrt{3}\,dt\) ; factorise 3 au dénominateur.`, r`\(u = \ln x\), \(v' = x^{-1/2}\), \(v = 2\sqrt{x}\).`],
      solution: [
        { t: 'La dérivée', html: p(r`\(u(x) = e^{3x} + 2\), \(u'(x) = 3e^{3x}\). La dérivée est \(3e^{3x}\cos\left(e^{3x} + 2\right)\).`) },
        { t: 'J', html: p(r`Bornes : 0 et \(\frac{1}{\sqrt{3}}\). \(J = \displaystyle\int_0^{1/\sqrt{3}} \frac{\sqrt{3}\,dt}{3t^2 + 3} = \frac{\sqrt{3}}{3}\arctan\left(\frac{1}{\sqrt{3}}\right) = \frac{\sqrt{3}}{3} \times \frac{\pi}{6} = \frac{\pi\sqrt{3}}{18}\).`) },
        { t: 'K', html: p(r`\(K = \left[2\sqrt{x}\ln x\right]_1^e - \displaystyle\int_1^e \frac{2\sqrt{x}}{x}\,dx = 2\sqrt{e} - \left[4\sqrt{x}\right]_1^e = 2\sqrt{e} - 4\sqrt{e} + 4 = 4 - 2\sqrt{e}\).`) }],
      answer: p(r`\(3e^{3x}\cos(e^{3x} + 2)\) ; \(J = \dfrac{\pi\sqrt{3}}{18}\) ; \(K = 4 - 2\sqrt{e}\).`), traps: [r`\(\frac{\sqrt{x}}{x} = \frac{1}{\sqrt{x}}\), de primitive \(2\sqrt{x}\).`], official: true, note: 'Résultats conformes au corrigé officiel, recalculés par programme.' },

    { id: 'obm2024-ex5', exam: 'obm2024', stage: 'cc', kind: 'partiel', order: 6, src: 'Examen OBM oct. 2024 · Ex 5', title: 'Le trio, version 2024', pts: 6, topics: ['integrales', 'ipp', 'cdv'], lvl: 2, time: 25,
      intro: r`Calculer les intégrales suivantes.`,
      questions: [r`\(I = \displaystyle\int_0^1 \frac{2x + 2}{2x^2 + 4x + 1}\,dx\).`, r`\(J = \displaystyle\int_0^{\pi} (x + 1)\cos\left(\frac{x}{3}\right)dx\).`, r`\(K = \displaystyle\int_0^{\sqrt{3}} \frac{dx}{3 + x^2}\) en posant \(t = \dfrac{x}{\sqrt{3}}\).`],
      hints: [r`\(I\) : \(u = 2x^2 + 4x + 1\), \(u' = 4x + 4 = 2(2x + 2)\).`, r`\(J\) : \(v' = \cos\frac{x}{3}\) donne \(v = 3\sin\frac{x}{3}\).`],
      solution: [
        { t: 'I', html: p(r`\(\frac{2x + 2}{u} = \frac{1}{2}\cdot\frac{u'}{u}\). \(I = \left[\frac{1}{2}\ln(2x^2 + 4x + 1)\right]_0^1 = \frac{1}{2}\ln 7\).`) },
        { t: 'J', html: p(r`\(J = \left[3(x + 1)\sin\frac{x}{3}\right]_0^{\pi} - \displaystyle\int_0^{\pi} 3\sin\frac{x}{3}\,dx = 3(\pi + 1)\frac{\sqrt{3}}{2} + \left[9\cos\frac{x}{3}\right]_0^{\pi} = \frac{3\sqrt{3}(\pi + 1)}{2} + \frac{9}{2} - 9\).`) },
        { t: 'K', html: p(r`\(x = \sqrt{3}\,t\), \(dx = \sqrt{3}\,dt\), bornes 0 et 1. \(K = \displaystyle\int_0^1 \frac{\sqrt{3}\,dt}{3(1 + t^2)} = \frac{\sqrt{3}}{3} \times \frac{\pi}{4} = \frac{\pi\sqrt{3}}{12}\).`) }],
      answer: p(r`\(I = \dfrac{1}{2}\ln 7\) ; \(J = \dfrac{3\sqrt{3}\,\pi}{2} + \dfrac{3\sqrt{3}}{2} - \dfrac{9}{2}\) ; \(K = \dfrac{\pi\sqrt{3}}{12}\).`), traps: [r`\(\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2}\), \(\cos\frac{\pi}{3} = \frac{1}{2}\).`], note: 'Sujet sans corrigé publié : correction rédigée pour le site, résultats recalculés par programme.' },

    { id: 'f2024-ex1', exam: 'f2024', stage: 'cc', kind: 'partiel', order: 7, src: 'Examen janv. 2024 · Ex 1', title: 'Tableau de huit primitives, une IPP, un changement de variable', pts: 10, topics: ['primitives', 'ipp', 'cdv'], lvl: 2, time: 30,
      intro: r`Examen ASI de janvier 2024, exercice 1 (10 points sur 40).`,
      questions: [r`Remplir le tableau (sans se soucier du domaine de définition) : donner une primitive \(F\) de chaque \(f\) : \(\ln(2)\) ; \(x^4 + 2x\) ; \(\dfrac{e^{\sqrt{x}}}{\sqrt{x}}\) ; \(\sin(x)\) ; \(1 + \tan^2(x)\) ; \(\dfrac{1}{x^2}\) ; \(\sqrt{x}\) ; \(\dfrac{x^5}{x^6 + 1}\).`,
        r`Via une intégration par parties dont vous énoncerez la formule générale, calculer \(J = \displaystyle\int_0^1 (3x + 1)e^{2x}\,dx\).`, r`Calculer \(K = \displaystyle\int_0^{\ln\sqrt{3}} \frac{1}{e^{-t} + e^{t}}\,dt\) en posant \(x = e^t\).`],
      hints: [r`\(\ln(2)\) est une constante. \(\frac{e^{\sqrt{x}}}{\sqrt{x}} = 2u'e^u\) avec \(u = \sqrt{x}\).`, r`\(J\) : dérive \(3x + 1\).`, r`\(K\) : \(dt = \frac{dx}{x}\), et \(e^{-t} + e^t = \frac{1}{x} + x\).`],
      solution: [
        { t: 'Le tableau', html: tbl([r`\(f(x)\)`, r`\(\ln 2\)`, r`\(x^4 + 2x\)`, r`\(\frac{e^{\sqrt{x}}}{\sqrt{x}}\)`, r`\(\sin x\)`, r`\(1 + \tan^2 x\)`, r`\(\frac{1}{x^2}\)`, r`\(\sqrt{x}\)`, r`\(\frac{x^5}{x^6 + 1}\)`],
          [[r`\(F(x)\)`, r`\(x\ln 2\)`, r`\(\frac{x^5}{5} + x^2\)`, r`\(2e^{\sqrt{x}}\)`, r`\(-\cos x\)`, r`\(\tan x\)`, r`\(-\frac{1}{x}\)`, r`\(\frac{2}{3}x^{3/2}\)`, r`\(\frac{1}{6}\ln(x^6 + 1)\)`]]) },
        { t: 'J', html: model(p(r`Formule : pour \(u\) et \(v\) de classe \(C^1\) sur \([a, b]\), \(\displaystyle\int_a^b u\,v' = \left[uv\right]_a^b - \int_a^b u'v\).`) + p(r`\(u(x) = 3x + 1\), \(u'(x) = 3\), \(v'(x) = e^{2x}\), \(v(x) = \frac{e^{2x}}{2}\). \(J = \left[(3x + 1)\frac{e^{2x}}{2}\right]_0^1 - \displaystyle\int_0^1 \frac{3e^{2x}}{2}\,dx = 2e^2 - \frac{1}{2} - \left[\frac{3e^{2x}}{4}\right]_0^1 = 2e^2 - \frac{1}{2} - \frac{3e^2}{4} + \frac{3}{4}\).`)) },
        { t: 'K', html: p(r`\(x = e^t\), \(dx = e^t\,dt = x\,dt\) ; bornes \(e^0 = 1\) et \(e^{\ln\sqrt{3}} = \sqrt{3}\). \(K = \displaystyle\int_1^{\sqrt{3}} \frac{1}{\frac{1}{x} + x} \times \frac{dx}{x} = \int_1^{\sqrt{3}} \frac{dx}{1 + x^2} = \frac{\pi}{3} - \frac{\pi}{4}\).`) }],
      answer: p(r`\(J = \dfrac{5e^2 + 1}{4}\) ; \(K = \dfrac{\pi}{12}\).`), traps: [r`\(\ln(2)\) n’est pas \(\frac{1}{x}\) : c’est un nombre, sa primitive est \(x\ln 2\).`, r`La question demande d’énoncer la formule générale avant de l’appliquer : des points sont attachés à l’énoncé.`], official: true, note: 'Résultats conformes au corrigé officiel, recalculés par programme.' },

    { id: 'f2023-ex1', exam: 'f2023', stage: 'cc', kind: 'partiel', order: 8, src: 'Partiel janv. 2023 · Ex 1', title: 'Une puissance à reconnaître', pts: 3, topics: ['integrales'], lvl: 1, time: 6,
      intro: r`Calculer \(I = \displaystyle\int_1^2 (x - 1)\sqrt{x - 1}\,dx\).`,
      hints: [r`\((x - 1)\sqrt{x - 1} = (x - 1)^{3/2}\).`],
      solution: [{ t: 'Une puissance', html: p(r`\((x - 1)\sqrt{x - 1} = (x - 1)^{3/2}\), de la forme \(u'u^{\alpha}\) avec \(u = x - 1\), \(u' = 1\), \(\alpha = \frac{3}{2}\). Primitive : \(\frac{2}{5}(x - 1)^{5/2}\). \(I = \left[\frac{2}{5}(x - 1)^{5/2}\right]_1^2 = \frac{2}{5}\).`) }],
      answer: p(r`\(I = \dfrac{2}{5}\).`), traps: [r`\(\frac{u^{\alpha + 1}}{\alpha + 1}\) avec \(\alpha + 1 = \frac{5}{2}\) : on multiplie par \(\frac{2}{5}\).`], official: true, note: 'Résultat conforme au corrigé officiel, recalculé par programme.' }
  ];
  Array.prototype.push.apply(EX, Q);
})();
