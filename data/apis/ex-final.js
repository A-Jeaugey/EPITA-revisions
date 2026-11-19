/* Maths · APIS — fiches d'exercices pour l'examen final : théorèmes de convergence, suites extraites, suites
   récurrentes, comparaisons de Landau (stage 'final'), et les deux questions de cours des examens (stage 'cc' : elles
   portent sur le programme du contrôle).
   Sources : exercice type du Moodle « Théorèmes de convergence » (mo-34-1, corrigé officiel), TD 4 parties 3 à 6
   (td4-…, publié sans corrigé), examen ASI de janvier 2024 (f2024-…, corrigé officiel) et examen SR de janvier 2025
   (f2025-…, sans corrigé : réponses rédigées pour le site, recalculées par programme).
   Même format que ex-integrales.js. Formules en String.raw ; pas de signes < > dans les formules. */
(function () {
  var EX = window.APIS_EX = window.APIS_EX || [];
  var r = String.raw;
  function p(s) { return '<p>' + s + '</p>'; }
  function model(html, tag) { return '<div class="model"><span class="tag">' + (tag || 'Rédaction modèle') + '</span>' + html + '</div>'; }
  function tbl(head, rows, cap) {
    return '<div class="tbl"><table>' + (cap ? '<caption>' + cap + '</caption>' : '') + '<thead><tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead><tbody>' +
      rows.map(function (rr) { return '<tr>' + rr.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  var NOCOR = 'TD publié sans corrigé : correction rédigée pour le site, résultats recalculés par programme.';
  var OFF24 = 'Conforme au corrigé officiel de l’examen.';
  var NO25 = 'Sujet sans corrigé publié : correction rédigée pour le site, résultats recalculés par programme.';
  var Q = [

    /* ================================================================== Moodle 3.4 */
    { id: 'mo-34-1', stage: 'final', kind: 'moodle', order: 41, src: 'Moodle · Théorèmes de convergence · ex. 1', title: 'Croissante et majorée : elle converge', topics: ['convergence', 'recurrentes'], lvl: 2, time: 12,
      intro: r`Montrer que la suite définie par \(u_0 = 0\) et \(\forall n \in \N,\ u_{n+1} = \dfrac{1 + u_n^2}{3}\) converge.`,
      hints: [r`Calcule \(u_1\) et \(u_2\) : la suite semble croissante. Prouve-le par récurrence.`, r`Cherche un majorant simple, par récurrence aussi : 1 convient.`],
      solution: [
        { t: 'Croissante', html: p(r`\(u_1 = \frac{1}{3}\), \(u_2 = \frac{10}{27}\). Les termes sont tous définis et positifs. Par récurrence sur « \(u_n \lt u_{n+1}\) » : \(u_0 \lt u_1\) ; si \(u_n \lt u_{n+1}\), alors \(u_n^2 \lt u_{n+1}^2\) (termes positifs), donc \(\dfrac{1 + u_n^2}{3} \lt \dfrac{1 + u_{n+1}^2}{3}\), soit \(u_{n+1} \lt u_{n+2}\).`) },
        { t: 'Majorée par 1', html: p(r`\(u_0 \leq 1\) ; si \(u_n \leq 1\), alors \(u_n^2 \leq 1\) et \(u_{n+1} \leq \dfrac{2}{3} \leq 1\).`) },
        { t: 'Conclusion', html: p(r`La suite est croissante et majorée : elle est convergente.`) + p(r`Pour aller plus loin : sa limite vérifie \(\ell = \dfrac{1 + \ell^2}{3}\), soit \(\ell^2 - 3\ell + 1 = 0\) ; comme \(\ell \leq 1\), \(\ell = \dfrac{3 - \sqrt{5}}{2}\).`) }],
      answer: p(r`Croissante (récurrence), majorée par 1 (récurrence), donc convergente.`),
      traps: [r`Passer au carré dans une inégalité exige des termes positifs : dis-le.`], official: true, note: 'Reprend le corrigé officiel du Moodle ; le calcul de la limite est ajouté.' },

    /* ================================================================== TD 4, partie 3 */
    { id: 'td4-3-5', stage: 'final', kind: 'td', order: 42, src: 'TD 4 · ex. 3.5', title: 'La somme des 1/k! est majorée par 3', topics: ['convergence'], lvl: 2, time: 15,
      intro: r`Soit \((u_n)\) définie par \(\forall n \in \N,\ u_n = \displaystyle\sum_{k=0}^{n} \frac{1}{k!}\).`,
      questions: [r`Étudier la monotonie de la suite \((u_n)\).`, r`Montrer, par récurrence, que \(\forall k \in \N^*,\ k! \geq 2^{k-1}\).`, r`En déduire que la suite \((u_n)\) est majorée par 3.`, r`La suite est-elle convergente ? Si oui, donner un encadrement de sa limite \(\ell\).`],
      hints: [r`\(u_{n+1} - u_n\) est le dernier terme ajouté.`, r`Majore chaque \(\frac{1}{k!}\) par \(\frac{1}{2^{k-1}}\) : une somme géométrique apparaît.`],
      solution: [
        { t: 'Monotonie', html: p(r`\(u_{n+1} - u_n = \dfrac{1}{(n+1)!} \gt 0\) : strictement croissante.`) },
        { t: 'La récurrence', html: p(r`\(1! = 1 \geq 2^0\). Si \(k! \geq 2^{k-1}\) pour un \(k \geq 1\), alors \((k+1)! = (k+1)\,k! \geq 2 \times 2^{k-1} = 2^k\), car \(k + 1 \geq 2\).`) },
        { t: 'Majoration', html: model(p(r`Pour \(k \geq 1\), \(\dfrac{1}{k!} \leq \dfrac{1}{2^{k-1}}\). Donc \(u_n = 1 + \displaystyle\sum_{k=1}^{n} \frac{1}{k!} \leq 1 + \sum_{k=1}^{n} \frac{1}{2^{k-1}} = 1 + \frac{1 - \left(\frac{1}{2}\right)^n}{1 - \frac{1}{2}} = 3 - \frac{1}{2^{n-1}} \leq 3\).`)) },
        { t: 'Convergence', html: p(r`Croissante et majorée par 3 : elle converge. Comme elle est croissante, \(\ell \geq u_2 = 2{,}5\) ; et \(\ell \leq 3\). Donc \(2{,}5 \leq \ell \leq 3\) (la limite est le nombre \(e \approx 2{,}718\)).`) }],
      answer: p(r`Strictement croissante, majorée par 3, donc convergente ; \(2{,}5 \leq \ell \leq 3\).`),
      traps: [r`Le terme \(k = 0\) vaut 1 et n’entre pas dans la majoration par \(\frac{1}{2^{k-1}}\) : on le met à part.`], note: NOCOR },

    { id: 'td4-3-8', stage: 'final', kind: 'td', order: 43, src: 'TD 4 · ex. 3.8 et 3.9', title: 'Deux couples de suites adjacentes', topics: ['convergence'], lvl: 3, time: 25,
      intro: r`Suites adjacentes, puis valeur approchée de la limite.`,
      questions: [r`Montrer que \(u_n = \displaystyle\sum_{k=1}^{n} \frac{1}{k^2}\) et \(v_n = u_n + \dfrac{1}{n}\) (pour \(n \in \N^*\)) sont adjacentes.`,
        r`Soient, pour \(n \geq 2\), \(u_n = \displaystyle\sum_{k=1}^{n-1} \frac{1}{k^2(k+1)^2}\) et \(v_n = u_n + \dfrac{1}{3n^2}\). Montrer que \((u_n)\) et \((v_n)\) sont adjacentes.`,
        r`Soit \(\varepsilon \gt 0\). Comment obtenir une valeur approchée de la limite commune à \(\varepsilon\) près ? Calculer la limite à \(0{,}01\) près.`],
      hints: [r`Trois points : \((u_n)\) croissante, \((v_n)\) décroissante, \(v_n - u_n \to 0\).`, r`\(v_{n+1} - v_n\) : réduis au même dénominateur, le numérateur se simplifie beaucoup.`, r`\(u_n \leq \ell \leq v_n\) : l’erreur est au plus \(v_n - u_n\).`],
      solution: [
        { t: 'Exercice 3.8', html: p(r`\(u_{n+1} - u_n = \dfrac{1}{(n+1)^2} \gt 0\). \(v_{n+1} - v_n = \dfrac{1}{(n+1)^2} + \dfrac{1}{n+1} - \dfrac{1}{n} = \dfrac{n + n(n+1) - (n+1)^2}{n(n+1)^2} = -\dfrac{1}{n(n+1)^2} \lt 0\). \(v_n - u_n = \dfrac{1}{n} \to 0\). Les suites sont adjacentes.`) },
        { t: 'Exercice 3.9', html: p(r`\(u_{n+1} - u_n = \dfrac{1}{n^2(n+1)^2} \gt 0\). \(v_{n+1} - v_n = \dfrac{1}{n^2(n+1)^2} + \dfrac{1}{3(n+1)^2} - \dfrac{1}{3n^2} = \dfrac{3 + n^2 - (n+1)^2}{3n^2(n+1)^2} = \dfrac{2 - 2n}{3n^2(n+1)^2} \leq 0\) pour \(n \geq 1\). \(v_n - u_n = \dfrac{1}{3n^2} \to 0\). Adjacentes.`) },
        { t: 'Valeur approchée', html: model(p(r`Pour tout \(n\), \(u_n \leq \ell \leq v_n\) : \(u_n\) approche \(\ell\) avec une erreur au plus \(v_n - u_n = \dfrac{1}{3n^2}\). Il suffit de choisir \(n\) tel que \(\dfrac{1}{3n^2} \leq \varepsilon\).`) + p(r`Pour \(\varepsilon = 0{,}01\) : \(n^2 \geq \dfrac{100}{3}\), soit \(n \geq 6\). \(u_6 = \dfrac{1}{4} + \dfrac{1}{36} + \dfrac{1}{144} + \dfrac{1}{400} + \dfrac{1}{900} \approx 0{,}2883\) et \(v_6 = u_6 + \dfrac{1}{108} \approx 0{,}2976\).`)) }],
      answer: p(r`\(0{,}288 \leq \ell \leq 0{,}298\) : \(\ell \approx 0{,}29\) à \(0{,}01\) près.`),
      traps: [r`Oublier la troisième condition.`, r`Dans le 3.9, la somme de \(u_n\) s’arrête à \(n - 1\) : \(u_{n+1} - u_n\) est le terme d’indice \(k = n\).`], note: NOCOR },

    /* ================================================================== TD 4, partie 4 */
    { id: 'td4-4-10', stage: 'final', kind: 'td', order: 44, src: 'TD 4 · ex. 4.10', title: 'Suites extraites : placer ⇒, ⇐ ou ⇔', topics: ['extraites'], lvl: 2, time: 10,
      intro: r`Soient \((u_n)\) une suite réelle et \(\ell \in \R\). Mettre le bon symbole \(\Rightarrow\), \(\Leftarrow\) ou \(\Leftrightarrow\) entre \(P\) et \(Q\).`,
      questions: [r`\(P\) : \(u_n \to \ell\) et \(Q\) : \(u_{2n} \to \ell\).`, r`\(P\) : \(u_n \to \ell\) et \(Q\) : (\(u_{2n} \to \ell\) et \(u_{2n+1} \to \ell\)).`, r`\(P\) : \(u_n \to \ell\) et \(Q\) : (\(u_{3n} \to \ell\) et \(u_{3n+1} \to \ell\)).`, r`Énoncer le résultat à connaître sur \((u_n)\), \((u_{2n})\) et \((u_{2n+1})\).`],
      hints: [r`\(P \Rightarrow Q\) est toujours vrai : toute suite extraite d’une suite convergente a la même limite.`, r`Pour la réciproque : les sous-suites recouvrent-elles tous les rangs ?`],
      solution: [
        { t: 'Les trois symboles', html: p(r`1. \(P \Rightarrow Q\) seulement. Contre-exemple de la réciproque : \(u_n = (-1)^n\), \(u_{2n} \to 1\), et \((u_n)\) diverge.`) + p(r`2. \(P \Leftrightarrow Q\) : les rangs pairs et impairs recouvrent \(\N\).`) + p(r`3. \(P \Rightarrow Q\) seulement : les rangs \(3n + 2\) ne sont pas couverts. Contre-exemple : \(u_n = 1\) si \(n\) est de la forme \(3k + 2\), \(0\) sinon.`) },
        { t: 'Le résultat', html: model(p(r`\((u_n)\) converge vers \(\ell\) si et seulement si \((u_{2n})\) et \((u_{2n+1})\) convergent toutes les deux vers \(\ell\).`)) }],
      answer: p(r`\(\Rightarrow\) ; \(\Leftrightarrow\) ; \(\Rightarrow\).`), traps: [r`Les deux sous-suites doivent avoir la <b>même</b> limite.`], note: NOCOR },

    { id: 'td4-4-11', stage: 'final', kind: 'td', order: 45, src: 'TD 4 · ex. 4.11 et 4.12', title: 'La série harmonique diverge, la série alternée converge', topics: ['extraites', 'convergence'], lvl: 3, time: 25,
      intro: r`On note, pour \(n \in \N^*\), \(h_n = \displaystyle\sum_{k=1}^{n} \frac{1}{k}\) et \(a_n = \displaystyle\sum_{k=1}^{n} \frac{(-1)^k}{k}\).`,
      questions: [r`Quelle est la monotonie de \((h_n)\) ? Écrire \(h_{2n} - h_n\) à l’aide du symbole \(\sum\), puis montrer que \(h_{2n} - h_n \geq \dfrac{1}{2}\).`, r`Par l’absurde, montrer que \((h_n)\) diverge vers \(+\infty\).`, r`Montrer que les sous-suites \((a_{2n})\) et \((a_{2n+1})\) sont adjacentes. En déduire que \((a_n)\) converge.`],
      hints: [r`\(h_{2n} - h_n\) a \(n\) termes, tous supérieurs ou égaux à \(\frac{1}{2n}\).`, r`Si \(h_n \to \ell\), que vaut la limite de \(h_{2n} - h_n\) ?`, r`\(a_{2n+2} - a_{2n}\) : deux termes ajoutés, de signes contraires.`],
      solution: [
        { t: 'Minoration', html: p(r`\(h_{n+1} - h_n = \dfrac{1}{n+1} \gt 0\) : strictement croissante. \(h_{2n} - h_n = \displaystyle\sum_{k=n+1}^{2n} \frac{1}{k}\) : \(n\) termes, chacun \(\geq \dfrac{1}{2n}\), donc \(h_{2n} - h_n \geq n \times \dfrac{1}{2n} = \dfrac{1}{2}\).`) },
        { t: 'Par l’absurde', html: model(p(r`Supposons que \((h_n)\) converge vers un réel \(\ell\). Alors la suite extraite \((h_{2n})\) converge aussi vers \(\ell\), donc \(h_{2n} - h_n \to 0\). C’est absurde, puisque \(h_{2n} - h_n \geq \frac{1}{2}\).`) + p(r`\((h_n)\) est donc croissante et non convergente : elle n’est pas majorée (sinon elle convergerait), et elle tend vers \(+\infty\).`)) },
        { t: 'La série alternée', html: p(r`\(a_{2n+2} - a_{2n} = -\dfrac{1}{2n+1} + \dfrac{1}{2n+2} \lt 0\) : \((a_{2n})\) décroît. \(a_{2n+3} - a_{2n+1} = \dfrac{1}{2n+2} - \dfrac{1}{2n+3} \gt 0\) : \((a_{2n+1})\) croît. \(a_{2n} - a_{2n+1} = \dfrac{1}{2n+1} \to 0\). Les deux sous-suites sont adjacentes : elles convergent vers une même limite \(\ell\). D’après le résultat de l’exercice 4.10, \((a_n)\) converge vers \(\ell\).`) }],
      answer: p(r`\(h_n \to +\infty\) ; \((a_n)\) converge (vers \(-\ln 2\)).`), traps: [r`Minorer chaque terme par le plus petit, \(\frac{1}{2n}\), pas par \(\frac{1}{n}\).`], note: NOCOR },

    /* ================================================================== TD 4, partie 5 */
    { id: 'td4-5-14', stage: 'final', kind: 'td', order: 46, src: 'TD 4 · ex. 5.14', title: 'Landau : sens des notations, classements, équivalents', topics: ['landau'], lvl: 2, time: 35,
      intro: r`Comparaisons asymptotiques.`,
      questions: [r`Que signifient \(u_n = o(1)\), \(u_n = O(1)\), \(u_n = o(0)\) et \(u_n \sim 0\) ?`,
        r`Compléter par \(= o\), \(= O\) ou \(\sim\) (plusieurs possibilités) : \(\dfrac{n(n+1)}{2} \ldots n^2\) ; \(n \ldots n^2\) ; \(n\sin(n) \ldots n\) ; \(2n^2 - n + 10 \ldots e^n - n\) ; \(-8n^3 + 2n^2 - n + 10 \ldots -8n^3\) ; \(2n^2 - n + 10 \ldots -n + 10\) ; \(n^2 + 3n \ldots 2n^2 + 3\) ; \(n + 1 \ldots n\) ; \(\ln(n+1) \ldots \ln(n)\) ; \(e^{n+1} \ldots e^n\).`,
        r`Classer avec \(\ll\) : \(n\ln(n)\) ; \(2^n\) ; \(\ln(n)\) ; \(1\) ; \(n^2\) ; \(n^3\) ; \(n\). Puis (travail maison) : \(n\) ; \(n^2\) ; \(\ln(n)\) ; \(e^n\) ; \(n\ln(n)\) ; \(\dfrac{n^2}{\ln(n)}\). Puis : \(\dfrac{1}{n}\) ; \(\dfrac{1}{n^2}\) ; \(\dfrac{1}{\ln(n)}\) ; \(\dfrac{\ln(n)}{n}\) ; \(\dfrac{\ln(n)}{n^2}\) ; \(\dfrac{1}{n\ln(n)}\).`,
        r`Déterminer un équivalent simple de \(\ln(n) + 2n - 3\) ; \(\dfrac{1}{n-1} - \dfrac{1}{n+1}\) ; \(\dfrac{2e^n - n}{n+1}\).`,
        r`Montrer que \(u_n \sim v_n \iff u_n = v_n + o(v_n)\). A-t-on \(u_n \sim v_n \iff u_n - v_n \to 0\) ?`],
      hints: [r`Remplace \(v_n\) par 1 ou 0 dans les définitions.`, r`Pour chaque couple, calcule la limite du quotient.`, r`Un équivalent d’une somme : le terme dominant. Pour une différence de fractions : réduis d’abord.`],
      solution: [
        { t: 'Sens des notations', html: p(r`\(u_n = o(1)\) : \(u_n \to 0\). \(u_n = O(1)\) : \((u_n)\) est bornée. \(u_n = o(0)\) et \(u_n \sim 0\) : \((u_n)\) est nulle à partir d’un certain rang.`) },
        { t: 'Compléter', html: tbl(['Couple', 'Quotient', 'On écrit'], [
          [r`\(\frac{n(n+1)}{2}\), \(n^2\)`, r`\(\to \frac{1}{2}\)`, r`\(= O\)`], [r`\(n\), \(n^2\)`, r`\(\to 0\)`, r`\(= o\), \(= O\)`], [r`\(n\sin n\), \(n\)`, r`borné, sans limite`, r`\(= O\)`],
          [r`\(2n^2 - n + 10\), \(e^n - n\)`, r`\(\to 0\)`, r`\(= o\), \(= O\)`], [r`\(-8n^3 + \ldots\), \(-8n^3\)`, r`\(\to 1\)`, r`\(\sim\), \(= O\)`], [r`\(2n^2 - n + 10\), \(-n + 10\)`, r`\(\to -\infty\)`, 'aucun des trois'],
          [r`\(n^2 + 3n\), \(2n^2 + 3\)`, r`\(\to \frac{1}{2}\)`, r`\(= O\)`], [r`\(n + 1\), \(n\)`, r`\(\to 1\)`, r`\(\sim\), \(= O\)`], [r`\(\ln(n+1)\), \(\ln n\)`, r`\(\to 1\)`, r`\(\sim\), \(= O\)`], [r`\(e^{n+1}\), \(e^n\)`, r`\(= e\)`, r`\(= O\)`]]) },
        { t: 'Classements', html: p(r`\(1 \ll \ln(n) \ll n \ll n\ln(n) \ll n^2 \ll n^3 \ll 2^n\).`) + p(r`\(\ln(n) \ll n \ll n\ln(n) \ll \dfrac{n^2}{\ln(n)} \ll n^2 \ll e^n\).`) + p(r`\(\dfrac{1}{n^2} \ll \dfrac{\ln(n)}{n^2} \ll \dfrac{1}{n\ln(n)} \ll \dfrac{1}{n} \ll \dfrac{\ln(n)}{n} \ll \dfrac{1}{\ln(n)}\).`) },
        { t: 'Équivalents', html: p(r`\(\ln(n) + 2n - 3 \sim 2n\). \(\dfrac{1}{n-1} - \dfrac{1}{n+1} = \dfrac{2}{n^2 - 1} \sim \dfrac{2}{n^2}\). \(\dfrac{2e^n - n}{n+1} \sim \dfrac{2e^n}{n}\).`) },
        { t: 'La propriété', html: model(p(r`\(u_n \sim v_n\) signifie : à partir d’un certain rang, \(u_n = v_n(1 + \varepsilon_n)\) avec \(\varepsilon_n \to 0\), soit \(u_n = v_n + \varepsilon_n v_n\) ; et \(\varepsilon_n v_n\) est par définition un \(o(v_n)\). Réciproquement, \(u_n = v_n + \varepsilon_n v_n = v_n(1 + \varepsilon_n)\).`) + p(r`En revanche \(u_n \sim v_n\) n’équivaut pas à \(u_n - v_n \to 0\) : \(n + 1 \sim n\) et la différence vaut 1 ; \(\frac{1}{n} - \frac{1}{n^2} \to 0\) et le quotient vaut \(n\).`)) }],
      answer: p(r`À retenir : une seule limite, celle du quotient, donne toutes les comparaisons.`),
      traps: [r`\(\ln(n+1) \sim \ln(n)\), mais \(e^{n+1}\) n’est pas équivalent à \(e^n\).`, r`Dans un classement de suites qui tendent vers 0, la plus petite est celle qui décroît le plus vite.`], note: NOCOR },

    /* ================================================================== TD 4, partie 6 */
    { id: 'td4-6-15', stage: 'final', kind: 'td', order: 47, src: 'TD 4 · ex. 6.15', title: 'Suite récurrente : lecture graphique et quatre affirmations', topics: ['recurrentes'], lvl: 2, time: 15,
      intro: r`On étudie \(u_{n+1} = f(u_n)\).`,
      questions: [r`Avec \(f(x) = x^2\) et \(u_0 = 0\), \(1\), \(0{,}8\), \(1{,}3\), \(-1{,}2\) : calculer \(u_1, u_2, u_3\), conjecturer la monotonie et le comportement en \(+\infty\).`,
        r`\(f\) continue sur un intervalle \(I\), \(u_0 \in I\). Lesquelles sont vraies ? « Si \(\ell = f(\ell)\) alors \((u_n)\) converge vers \(\ell\) » ; « Si \((u_n)\) converge vers un réel \(\ell\) alors \(\ell = f(\ell)\) » ; « \((u_n)\) converge vers \(\ell\) si et seulement si \(\ell = f(\ell)\) » ; « Si \(f\) est croissante alors \((u_n)\) est croissante ».`],
      hints: [r`Les points fixes de \(x \mapsto x^2\) sont 0 et 1.`, r`Cherche un contre-exemple dans la question 1.`],
      solution: [
        { t: 'Les cinq cas', html: tbl([r`\(u_0\)`, 'Termes', 'Conjecture'], [
          ['0', '0 ; 0 ; 0', 'constante'], ['1', '1 ; 1 ; 1', 'constante'], [r`\(0{,}8\)`, r`\(0{,}64\) ; \(0{,}4096\) ; \(\approx 0{,}168\)`, 'décroissante, tend vers 0'],
          [r`\(1{,}3\)`, r`\(1{,}69\) ; \(\approx 2{,}86\) ; \(\approx 8{,}16\)`, r`croissante, tend vers \(+\infty\)`], [r`\(-1{,}2\)`, r`\(1{,}44\) ; \(\approx 2{,}07\) ; \(\approx 4{,}30\)`, r`croissante, tend vers \(+\infty\)`]]) +
          p(r`\(f\) est croissante sur \([0, +\infty[\), et la suite est monotone à partir du rang 1 : croissante ou décroissante selon la position de \(u_0\) par rapport aux points fixes.`) },
        { t: 'Les affirmations', html: p(r`Seule la deuxième est vraie : si \((u_n)\) converge vers \(\ell\) (dans \(I\)), alors \(\ell = f(\ell)\), par continuité de \(f\).`) + p(r`La première et la troisième sont fausses : \(f(x) = x^2\), \(u_0 = 1{,}3\) ; 0 et 1 sont des points fixes et la suite tend vers \(+\infty\). La quatrième est fausse : \(u_0 = 0{,}8\), \(f\) croissante sur \([0, 1]\), suite décroissante.`) }],
      answer: p(r`Un point fixe est une limite possible, pas une limite garantie.`), traps: [r`\(f\) croissante donne une suite <b>monotone</b>, pas forcément croissante.`], note: NOCOR },

    { id: 'td4-6-16', stage: 'final', kind: 'td', order: 48, src: 'TD 4 · ex. 6.16', title: 'uₙ₊₁ = (uₙ² + 3)/4 : l’étude selon u₀', topics: ['recurrentes', 'convergence'], lvl: 3, time: 30,
      intro: r`Soit \(f(x) = \dfrac{x^2 + 3}{4}\) sur \(\R\), et \(u_{n+1} = f(u_n)\).`,
      questions: [r`Montrer que \(\forall n \in \N^*,\ u_n \gt 0\).`, r`Trouver les points fixes de \(f\). Que se passe-t-il si \(u_0\) est un de ces points fixes ?`, r`Établir le tableau de variations de \(f\).`,
        r`Supposons \(u_0 \in [0, 1[\). (a) Montrer que \(\forall n,\ 0 \leq u_n \lt 1\). (b) Étudier la monotonie. (c) La suite converge-t-elle ? Si oui, donner sa limite.`, r`Reprendre la question précédente pour \(u_0 \in\ ]3, +\infty[\).`, r`(Travail maison) Faire le cas \(u_0 \in\ ]1, 3[\).`],
      hints: [r`\(f(x) \geq \frac{3}{4}\) pour tout \(x\).`, r`\(u_{n+1} - u_n = \dfrac{(u_n - 1)(u_n - 3)}{4}\).`, r`Pour \(u_0 \gt 3\) : si la suite convergeait, vers quoi ?`],
      solution: [
        { t: 'Questions 1 à 3', html: p(r`\(f(x) \geq \frac{3}{4} \gt 0\), donc \(u_n = f(u_{n-1}) \gt 0\) pour \(n \geq 1\). Points fixes : \(x^2 - 4x + 3 = 0\), soit 1 et 3 ; la suite est alors constante. \(f'(x) = \frac{x}{2}\) : \(f\) décroît sur \(]-\infty, 0]\), croît sur \([0, +\infty[\) ; \(f(0) = \frac{3}{4}\), \(f(1) = 1\), \(f(3) = 3\).`) },
        { t: 'u₀ dans [0, 1[', html: model(p(r`(a) Récurrence : si \(0 \leq u_n \lt 1\), \(f\) étant strictement croissante sur \([0, 1]\), \(\frac{3}{4} = f(0) \leq u_{n+1} \lt f(1) = 1\).`) + p(r`(b) \(u_{n+1} - u_n = \dfrac{(u_n - 1)(u_n - 3)}{4} \gt 0\) (deux facteurs négatifs) : strictement croissante.`) + p(r`(c) Croissante et majorée par 1 : convergente. \(f\) est continue, donc \(\ell \in \{1, 3\}\), et \(\ell \leq 1\) : \(\ell = 1\).`)) },
        { t: 'u₀ > 3', html: p(r`Par récurrence \(u_n \gt 3\). Deux facteurs positifs : strictement croissante. Si elle convergeait, \(\ell \in \{1, 3\}\) ; or \(\ell \geq u_0 \gt 3\) : contradiction. Croissante et non convergente, elle n’est pas majorée : \(u_n \to +\infty\).`) },
        { t: 'u₀ dans ]1, 3[', html: p(r`Par récurrence \(1 \lt u_n \lt 3\). Facteurs de signes contraires : strictement décroissante, minorée par 1, donc convergente ; \(\ell \leq u_0 \lt 3\) donc \(\ell = 1\).`) }],
      answer: p(r`\(u_0 \in [0, 3[\) : la suite converge vers 1. \(u_0 = 3\) : constante. \(u_0 \gt 3\) : \(+\infty\).`),
      traps: [r`Pour choisir entre les deux points fixes, il faut une borne : \(\ell \leq 1\), ou \(\ell \leq u_0 \lt 3\).`], note: NOCOR },

    { id: 'td4-6-17', stage: 'final', kind: 'td', order: 49, src: 'TD 4 · ex. 6.17', title: 'Méthode de Héron pour approcher une racine carrée', topics: ['recurrentes', 'convergence'], lvl: 3, time: 25,
      intro: r`Soient \(a \in \R_+^*\) et \(f(x) = \dfrac{1}{2}\left(x + \dfrac{a}{x}\right)\) sur \(\R_+^*\). On considère \(u_{n+1} = f(u_n)\) avec \(u_0 \in \R_+^*\).`,
      questions: [r`Vérifier qu’une telle suite est bien définie.`, r`Trouver les points fixes de \(f\).`, r`Établir le tableau de variations de \(f\) et en déduire : \(\forall n \in \N^*,\ u_n \geq \sqrt{a}\).`, r`Montrer qu’à partir du rang 1, la suite est décroissante.`, r`En déduire qu’elle est convergente, et donner sa limite.`],
      hints: [r`Bien définie : il faut \(u_n \neq 0\) pour pouvoir diviser.`, r`Le minimum de \(f\) est atteint en \(\sqrt{a}\).`, r`\(u_{n+1} - u_n = \dfrac{a - u_n^2}{2u_n}\).`],
      solution: [
        { t: 'Bien définie, point fixe', html: p(r`Si \(u_n \gt 0\), alors \(u_{n+1} = \frac{1}{2}\left(u_n + \frac{a}{u_n}\right) \gt 0\) : par récurrence, tous les termes existent et sont strictement positifs. \(f(x) = x \iff \dfrac{a}{x} = x \iff x = \sqrt{a}\).`) },
        { t: 'Minoration', html: p(r`\(f'(x) = \dfrac{1}{2}\left(1 - \dfrac{a}{x^2}\right)\), négative sur \(]0, \sqrt{a}[\), positive sur \(]\sqrt{a}, +\infty[\). Le minimum de \(f\) est \(f(\sqrt{a}) = \sqrt{a}\). Donc pour \(n \geq 1\), \(u_n = f(u_{n-1}) \geq \sqrt{a}\).`) },
        { t: 'Décroissance, limite', html: model(p(r`Pour \(n \geq 1\) : \(u_{n+1} - u_n = \dfrac{a - u_n^2}{2u_n} \leq 0\), car \(u_n \geq \sqrt{a}\). La suite est décroissante à partir du rang 1.`) + p(r`Décroissante et minorée par \(\sqrt{a}\) : elle converge vers \(\ell \geq \sqrt{a} \gt 0\). \(f\) est continue sur \(\R_+^*\), donc \(\ell = f(\ell)\), d’où \(\ell = \sqrt{a}\).`)) }],
      answer: p(r`\(u_n \to \sqrt{a}\). Avec \(a = 2\), \(u_0 = 1\) : \(1{,}5\) ; \(1{,}41667\) ; \(1{,}414216\).`), traps: [r`La minoration ne vaut qu’à partir du rang 1 : \(u_0\) est quelconque.`, r`\(\ell \gt 0\) doit être établi avant d’utiliser la continuité de \(f\) en \(\ell\).`], note: NOCOR },

    /* ================================================================== examen de janvier 2024 */
    { id: 'f2024-ex2', exam: 'f2024', stage: 'final', kind: 'partiel', order: 12, src: 'Examen janv. 2024 · Ex 2', title: 'Suites adjacentes : Σ 1/k! et Σ 1/k! + 1/n!', pts: 6, topics: ['convergence'], lvl: 2, time: 15,
      intro: r`Pour tout entier \(n \geq 2\) : \(u_n = \displaystyle\sum_{k=0}^{n} \frac{1}{k!}\) et \(v_n = u_n + \dfrac{1}{n!}\).`,
      questions: [r`Après avoir rappelé la définition, montrer que les suites \((u_n)\) et \((v_n)\) sont adjacentes.`, r`La suite \((u_n)\) est-elle convergente ? Justifiez votre réponse.`, r`La suite \((u_n)\) est-elle majorée ? Justifier.`],
      hints: [r`\(\dfrac{1}{n!} = \dfrac{n+1}{(n+1)!}\).`, r`Questions 2 et 3 : deux résultats du cours, sans calcul.`],
      solution: [
        { t: 'Adjacentes', html: model(p(r`\((u_n)\) et \((v_n)\) sont adjacentes si \((u_n)\) est croissante, \((v_n)\) est décroissante et \(\lim (v_n - u_n) = 0\).`) + p(r`\(u_{n+1} - u_n = \dfrac{1}{(n+1)!} \geq 0\) : \((u_n)\) est croissante.`) + p(r`\(v_{n+1} - v_n = \dfrac{2}{(n+1)!} - \dfrac{1}{n!} = \dfrac{2 - (n+1)}{(n+1)!} = \dfrac{1 - n}{(n+1)!} \leq 0\) car \(n \geq 2\) : \((v_n)\) est décroissante.`) + p(r`\(v_n - u_n = \dfrac{1}{n!} \to 0\).`)) },
        { t: 'Convergente, majorée', html: p(r`Deux suites adjacentes convergent (vers une même limite) : \((u_n)\) converge. Toute suite convergente est bornée : \((u_n)\) est bornée, donc majorée.`) }],
      answer: p(r`Adjacentes ; donc \((u_n)\) converge ; donc elle est bornée, en particulier majorée.`), traps: [r`« Après avoir rappelé la définition » : la définition est notée.`], official: true, note: OFF24 },

    { id: 'f2024-ex3', exam: 'f2024', stage: 'final', kind: 'partiel', order: 13, src: 'Examen janv. 2024 · Ex 3', title: 'Landau : citer toutes les comparaisons', pts: 6, topics: ['landau'], lvl: 2, time: 15,
      intro: r`Comparer en \(+\infty\) les suites \((u_n)\) et \((v_n)\) à l’aide des comparateurs de Landau \(\sim\), \(= o(\cdot)\), \(= O(\cdot)\), en citant toutes les comparaisons possibles et en justifiant.`,
      questions: [r`\(u_n = 1 - 2n^2\) et \(v_n = -2n^2 + n - 3\).`, r`\(u_n = e^{2n} - \sqrt{n}\) et \(v_n = n + 1\).`, r`\(u_n = 4^n + 1\) et \(v_n = 5^n\).`],
      hints: [r`Forme \(\dfrac{u_n}{v_n}\) et factorise le terme dominant en haut et en bas.`, r`Si le quotient tend vers \(+\infty\), c’est l’autre quotient qui tend vers 0.`],
      solution: [
        { t: 'Polynômes de même degré', html: p(r`\(\dfrac{u_n}{v_n} = \dfrac{1 - \frac{1}{2n^2}}{1 - \frac{1}{2n} + \frac{3}{2n^2}} \to 1\) : \(u_n \sim v_n\). La suite \(\left(\frac{u_n}{v_n}\right)\) converge, donc elle est bornée : \(u_n = O(v_n)\).`) },
        { t: 'Exponentielle contre polynôme', html: p(r`\(\dfrac{u_n}{v_n} = \dfrac{e^{2n}}{n} \times \dfrac{1 - \frac{\sqrt{n}}{e^{2n}}}{1 + \frac{1}{n}} \to +\infty\) par croissances comparées. Donc \(\dfrac{v_n}{u_n} \to 0\) : \(v_n = o(u_n)\), et \(v_n = O(u_n)\).`) },
        { t: 'Deux exponentielles', html: p(r`\(\dfrac{u_n}{v_n} = \left(\dfrac{4}{5}\right)^n + \dfrac{1}{5^n} \to 0\) : \(u_n = o(v_n)\), et \(u_n = O(v_n)\).`) }],
      answer: p(r`\(u_n \sim v_n\) et \(u_n = O(v_n)\) ; \(v_n = o(u_n)\) et \(v_n = O(u_n)\) ; \(u_n = o(v_n)\) et \(u_n = O(v_n)\).`), traps: [r`S’arrêter à la première comparaison : le \(O\) est attendu à chaque fois.`], official: true, note: OFF24 },

    { id: 'f2024-ex4', exam: 'f2024', stage: 'cc', kind: 'partiel', order: 14, src: 'Examen janv. 2024 · Ex 4', title: 'Cours : énoncer et démontrer le théorème des gendarmes', pts: 5, topics: ['demonstrations', 'limites'], lvl: 2, time: 12,
      intro: r`Question de cours (5 points sur 40).`,
      questions: [r`Énoncer rigoureusement le théorème des gendarmes.`, r`Démontrer le théorème des gendarmes.`],
      hints: [r`Trois suites, un encadrement, une limite commune.`, r`Fixe \(\varepsilon \gt 0\), prends un rang pour chaque gendarme, puis le plus grand des deux.`],
      solution: [
        { t: 'L’énoncé', html: model(p(r`Soient \((u_n)\), \((v_n)\) et \((w_n)\) trois suites réelles telles que \(\forall n \in \N,\ u_n \leq v_n \leq w_n\), et telles que \((u_n)\) et \((w_n)\) convergent vers le même réel \(\ell\). Alors \((v_n)\) converge vers \(\ell\).`)) },
        { t: 'La démonstration', html: model(p(r`Soit \(\varepsilon \gt 0\) fixé. \((u_n)\) converge vers \(\ell\) : \(\exists N_1 \in \N,\ \forall n \geq N_1,\ \ell - \varepsilon \lt u_n \lt \ell + \varepsilon\). \((w_n)\) converge vers \(\ell\) : \(\exists N_2 \in \N,\ \forall n \geq N_2,\ \ell - \varepsilon \lt w_n \lt \ell + \varepsilon\).`) + p(r`Posons \(N = \max(N_1, N_2)\) et soit \(n \geq N\). Alors \(\ell - \varepsilon \lt u_n \leq v_n \leq w_n \lt \ell + \varepsilon\), donc \(|v_n - \ell| \lt \varepsilon\).`) + p(r`On a montré : \(\forall \varepsilon \gt 0\), il existe un rang \(N\) à partir duquel \(|v_n - \ell| \lt \varepsilon\). La suite \((v_n)\) converge vers \(\ell\).`)) }],
      answer: p(r`Le corrigé officiel renvoie à la fiche « Démonstrations à connaître » : c’est sa démonstration, mot pour mot.`), traps: [r`Oublier « même limite », ou prendre \(N = \min(N_1, N_2)\).`], official: true, note: 'Démonstration de la fiche « Démonstrations à connaître » du Moodle.' },

    { id: 'f2024-ex5', exam: 'f2024', stage: 'final', kind: 'partiel', order: 15, src: 'Examen janv. 2024 · Ex 5', title: 'Suite récurrente uₙ₊₁ = uₙ/(uₙ + 8) et suite auxiliaire', pts: 10, topics: ['recurrentes', 'convergence', 'geometriques'], lvl: 2, time: 25,
      intro: r`Soit \((u_n)\) définie par \(u_0 = 1\) et \(\forall n \in \N,\ u_{n+1} = \dfrac{u_n}{u_n + 8}\). Les questions 1 et 2 sont indépendantes.`,
      questions: [r`(a) Montrer par récurrence que \(\forall n \in \N,\ u_n \gt 0\). (b) Supposons que \((u_n)\) converge vers un réel \(\ell\). Quelles sont les valeurs possibles de \(\ell\) ? (c) Étudier la monotonie de \((u_n)\). (d) La suite est-elle convergente ? Si oui, préciser sa limite.`,
        r`Soit \(v_n = 1 + \dfrac{7}{u_n}\). (a) Montrer que \((v_n)\) est géométrique de raison 8 ; en déduire \(v_n\) en fonction de \(n\). (b) En déduire \(u_n\) en fonction de \(n\). (c) Retrouve-t-on le résultat de la question 1 (d) ?`],
      hints: [r`(b) \(f : x \mapsto \frac{x}{x+8}\) est continue : \(\ell = f(\ell)\).`, r`(c) \(u_{n+1} - u_n\), au même dénominateur.`, r`Question 2 : calcule \(\dfrac{7}{u_{n+1}}\).`],
      solution: [
        { t: 'Question 1', html: model(p(r`(a) \(u_0 = 1 \gt 0\). Si \(u_n \gt 0\), alors \(u_n + 8 \gt 0\) et \(u_{n+1} = \dfrac{u_n}{u_n + 8} \gt 0\). Donc \(\forall n,\ u_n \gt 0\).`) + p(r`(b) \(f : x \mapsto \dfrac{x}{x+8}\) est continue sur \(\R_+\), donc \(\ell = f(\ell)\) : \(\ell^2 + 8\ell = \ell\), soit \(\ell(\ell + 7) = 0\). \(\ell = 0\) ou \(\ell = -7\).`) + p(r`(c) \(u_{n+1} - u_n = \dfrac{u_n - u_n(u_n + 8)}{u_n + 8} = -\dfrac{u_n(u_n + 7)}{u_n + 8} \leq 0\) car \(u_n \gt 0\) : décroissante.`) + p(r`(d) Décroissante et minorée par 0 : elle converge. \(u_n \gt 0\) pour tout \(n\) donne \(\ell \geq 0\), donc \(\ell = 0\).`)) },
        { t: 'Question 2', html: p(r`\(v_{n+1} = 1 + \dfrac{7(u_n + 8)}{u_n} = 8 + \dfrac{56}{u_n} = 8\left(1 + \dfrac{7}{u_n}\right) = 8v_n\). \(v_0 = 8\), donc \(v_n = 8^{n+1}\). \(u_n = \dfrac{7}{v_n - 1} = \dfrac{7}{8^{n+1} - 1}\). Comme \(8 \gt 1\), \(8^{n+1} \to +\infty\) et \(u_n \to 0\) : on retrouve la limite.`) }],
      answer: p(r`\(u_n = \dfrac{7}{8^{n+1} - 1} \to 0\).`), traps: [r`En (d), \(u_n \gt 0\) donne \(\ell \geq 0\), inégalité large : c’est suffisant pour écarter \(-7\).`], official: true, note: OFF24 },

    { id: 'f2024-ex6', exam: 'f2024', stage: 'final', kind: 'partiel', order: 16, src: 'Examen janv. 2024 · Ex 6', title: 'Suites extraites : rangs pairs et impairs', pts: 3, topics: ['extraites', 'geometriques'], lvl: 2, time: 8,
      intro: r`Soit \((u_n)\) définie pour tout \(n \in \N^*\) par \(u_n = \dfrac{1}{n}\displaystyle\sum_{k=0}^{n-1} (-1)^k\).`,
      questions: [r`Trouver les expressions de \(u_{2n}\) et \(u_{2n+1}\) en fonction de \(n\).`, r`La suite \((u_n)\) est-elle convergente ? Si oui, donner sa limite.`],
      hints: [r`Somme de \(n\) termes d’une suite géométrique de raison \(-1\).`],
      solution: [
        { t: 'Les deux sous-suites', html: p(r`\(u_n = \dfrac{1}{n} \times \dfrac{1 - (-1)^n}{1 - (-1)} = \dfrac{1 - (-1)^n}{2n}\). Donc \(u_{2n} = 0\) et \(u_{2n+1} = \dfrac{2}{4n + 2} = \dfrac{1}{2n + 1}\).`) },
        { t: 'Convergence', html: p(r`\((u_{2n})\) et \((u_{2n+1})\) convergent vers la même limite 0. Donc \((u_n)\) converge vers 0.`) }],
      answer: p(r`\(u_{2n} = 0\), \(u_{2n+1} = \dfrac{1}{2n+1}\) ; \((u_n)\) converge vers 0.`), traps: [r`Dans \(u_{2n+1}\), le dénominateur est \(2(2n + 1)\).`], official: true, note: OFF24 },

    /* ================================================================== examen de janvier 2025 */
    { id: 'f2025-ex1', exam: 'f2025', stage: 'final', kind: 'partiel', order: 1, src: 'Examen janv. 2025 · Ex 1', title: 'Deux suites couplées, adjacentes', pts: 7, topics: ['convergence', 'geometriques'], lvl: 2, time: 20,
      intro: r`\(u_0 = 2\), \(v_0 = 3\) et \(\forall n \in \N\) : \(u_{n+1} = \dfrac{3u_n + 2v_n}{5}\), \(v_{n+1} = \dfrac{2u_n + 3v_n}{5}\). On pose \(w_n = v_n - u_n\).`,
      questions: [r`(a) Montrer que \((w_n)\) est géométrique ; préciser sa raison. (b) En déduire \(w_n\) en fonction de \(n\). (c) Trouver le signe de \((w_n)\).`, r`Montrer que \((u_n)\) et \((v_n)\) sont adjacentes.`, r`Qu’en déduit-on sur les comportements des deux suites en \(+\infty\) ?`, r`Soit \(x_n = u_n + v_n\). (a) Exprimer \(x_{n+1}\) en fonction de \(x_n\) ; en déduire \(x_n\). (b) En déduire les limites de \((u_n)\) et \((v_n)\).`],
      hints: [r`Calcule \(v_{n+1} - u_{n+1}\).`, r`\(u_{n+1} - u_n\) et \(v_{n+1} - v_n\) s’expriment avec \(w_n\).`, r`\((x_n)\) est constante.`],
      solution: [
        { t: 'La suite (wₙ)', html: p(r`\(w_{n+1} = \dfrac{2u_n + 3v_n - 3u_n - 2v_n}{5} = \dfrac{1}{5}w_n\) : géométrique de raison \(\dfrac{1}{5}\). \(w_0 = 1\), donc \(w_n = \dfrac{1}{5^n} \gt 0\).`) },
        { t: 'Adjacentes', html: model(p(r`\(u_{n+1} - u_n = \dfrac{2v_n - 2u_n}{5} = \dfrac{2}{5}w_n \gt 0\) : \((u_n)\) est croissante.`) + p(r`\(v_{n+1} - v_n = \dfrac{2u_n - 2v_n}{5} = -\dfrac{2}{5}w_n \lt 0\) : \((v_n)\) est décroissante.`) + p(r`\(v_n - u_n = w_n = \dfrac{1}{5^n} \to 0\). Les suites sont adjacentes.`)) },
        { t: 'Comportement, limite', html: p(r`Deux suites adjacentes convergent vers une même limite \(\ell\). \(x_{n+1} = \dfrac{5u_n + 5v_n}{5} = x_n\) : \((x_n)\) est constante, \(x_n = x_0 = 5\). En passant à la limite : \(2\ell = 5\), donc \(\ell = \dfrac{5}{2}\).`) }],
      answer: p(r`\(w_n = \dfrac{1}{5^n}\) ; les deux suites convergent vers \(\dfrac{5}{2}\).`), traps: [r`Le signe de \(w_n\) est ce qui donne les deux monotonies : ne saute pas la question 1 (c).`], note: NO25 },

    { id: 'f2025-ex2', exam: 'f2025', stage: 'final', kind: 'partiel', order: 2, src: 'Examen janv. 2025 · Ex 2', title: 'Une somme de n termes : décroissante et minorée', pts: 5, topics: ['convergence', 'limites'], lvl: 2, time: 15,
      intro: r`Soit, pour tout \(n \in \N^*\), \(u_n = \displaystyle\sum_{k=n}^{2n-1} \frac{1}{k}\).`,
      questions: [r`Étudier la monotonie de \((u_n)\).`, r`En encadrant chaque terme de la somme, montrer que \(\dfrac{n}{2n-1} \leq u_n \leq 1\).`, r`En déduire que \((u_n)\) est bornée, en précisant un majorant et un minorant.`, r`Peut-on en déduire si \((u_n)\) converge ? Si oui, donner un encadrement de sa limite.`],
      hints: [r`Quand \(n\) devient \(n + 1\), deux termes entrent et un terme sort.`, r`La somme a \(n\) termes.`],
      solution: [
        { t: 'Monotonie', html: p(r`\(u_{n+1} = \displaystyle\sum_{k=n+1}^{2n+1} \frac{1}{k}\), donc \(u_{n+1} - u_n = \dfrac{1}{2n} + \dfrac{1}{2n+1} - \dfrac{1}{n} = \dfrac{1}{2n+1} - \dfrac{1}{2n} \lt 0\) : strictement décroissante.`) },
        { t: 'Encadrement, bornes', html: p(r`Pour \(n \leq k \leq 2n - 1\) : \(\dfrac{1}{2n-1} \leq \dfrac{1}{k} \leq \dfrac{1}{n}\). En sommant les \(n\) termes : \(\dfrac{n}{2n-1} \leq u_n \leq 1\). Comme \(\dfrac{n}{2n-1} \geq \dfrac{n}{2n} = \dfrac{1}{2}\), la suite est minorée par \(\dfrac{1}{2}\) et majorée par 1 : elle est bornée.`) },
        { t: 'Convergence', html: p(r`Décroissante et minorée : elle converge. En passant à la limite dans l’encadrement (\(\dfrac{n}{2n-1} \to \dfrac{1}{2}\)) : \(\dfrac{1}{2} \leq \ell \leq 1\).`) }],
      answer: p(r`Strictement décroissante, bornée par \(\frac{1}{2}\) et 1, convergente, \(\frac{1}{2} \leq \ell \leq 1\) (la limite est \(\ln 2\)).`), traps: [r`« Bornée » seul ne donne pas la convergence : il faut la monotonie.`], note: NO25 },

    { id: 'f2025-ex3', exam: 'f2025', stage: 'final', kind: 'partiel', order: 3, src: 'Examen janv. 2025 · Ex 3', title: 'Landau : définitions, puis trois comparaisons', pts: 7.5, topics: ['landau'], lvl: 2, time: 20,
      intro: r`Comparaison de suites.`,
      questions: [r`Soient \((u_n)\) et \((v_n)\) deux suites réelles ne s’annulant pas. Rappeler la définition de \(u_n = o(v_n)\), \(u_n = O(v_n)\) et \(u_n \sim v_n\) en \(+\infty\).`,
        r`Comparer, en citant toutes les comparaisons possibles et en justifiant : (a) \(u_n = -n^3 + n - 2\) et \(v_n = -2n^2 + n\) ; (b) \(u_n = e^n + \sqrt{n}\) et \(v_n = e^n + e^{-n}\) ; (c) \(u_n = 3n + 6\) et \(v_n = 5n - 1\).`],
      hints: [r`Les suites ne s’annulent pas : les définitions s’écrivent avec le quotient.`, r`(c) Le quotient tend vers \(\frac{3}{5}\) : que peut-on dire, et ne pas dire ?`],
      solution: [
        { t: 'Définitions', html: model(p(r`\(u_n = o(v_n)\) si \(\dfrac{u_n}{v_n} \to 0\). \(u_n = O(v_n)\) si la suite \(\left(\dfrac{u_n}{v_n}\right)\) est bornée. \(u_n \sim v_n\) si \(\dfrac{u_n}{v_n} \to 1\).`)) },
        { t: 'Les trois couples', html: p(r`(a) \(\dfrac{u_n}{v_n} = \dfrac{n}{2} \times \dfrac{1 - \frac{1}{n^2} + \frac{2}{n^3}}{1 - \frac{1}{2n}} \to +\infty\), donc \(\dfrac{v_n}{u_n} \to 0\) : \(v_n = o(u_n)\) et \(v_n = O(u_n)\).`) +
          p(r`(b) \(\dfrac{u_n}{v_n} = \dfrac{1 + \sqrt{n}\,e^{-n}}{1 + e^{-2n}} \to 1\) (croissances comparées) : \(u_n \sim v_n\), \(u_n = O(v_n)\), \(v_n = O(u_n)\).`) +
          p(r`(c) \(\dfrac{u_n}{v_n} = \dfrac{3 + \frac{6}{n}}{5 - \frac{1}{n}} \to \dfrac{3}{5}\). Le quotient et son inverse convergent, donc sont bornés : \(u_n = O(v_n)\) et \(v_n = O(u_n)\). Ni \(\sim\) (la limite n’est pas 1), ni \(o\).`) }],
      answer: p(r`(a) \(v_n = o(u_n)\), \(v_n = O(u_n)\). (b) \(u_n \sim v_n\) et \(O\) dans les deux sens. (c) \(O\) dans les deux sens seulement.`), traps: [r`(c) « Même degré donc équivalentes » : faux, le quotient tend vers \(\frac{3}{5}\).`], note: NO25 },

    { id: 'f2025-ex4', exam: 'f2025', stage: 'cc', kind: 'partiel', order: 4, src: 'Examen janv. 2025 · Ex 4', title: 'Cours : convergente donc bornée, réciproque, contraposée', pts: 3, topics: ['demonstrations', 'definitions'], lvl: 2, time: 10,
      intro: r`Soit \((u_n)\) une suite.`,
      questions: [r`Rappeler la définition de « \((u_n)\) est bornée ».`, r`Montrer que : \((u_n)\) converge \(\Rightarrow\) \((u_n)\) bornée.`, r`La réciproque est-elle vraie ? Justifier.`, r`Énoncer la contraposée de la proposition de la question 2.`],
      hints: [r`Applique la définition de la limite avec \(\varepsilon = 1\).`, r`Inégalité triangulaire : \(|u_n| \leq |u_n - \ell| + |\ell|\).`],
      solution: [
        { t: 'Définition', html: p(r`\((u_n)\) est bornée si \(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\) (ou : elle est majorée et minorée).`) },
        { t: 'Démonstration', html: model(p(r`Supposons que \((u_n)\) converge vers \(\ell \in \R\). Avec \(\varepsilon = 1\) : il existe \(N \in \N\) tel que \(\forall n \geq N,\ |u_n - \ell| \lt 1\).`) + p(r`Pour \(n \geq N\) : \(|u_n| = |(u_n - \ell) + \ell| \leq |u_n - \ell| + |\ell| \lt 1 + |\ell|\).`) + p(r`Posons \(M = \max\left(|u_0|, |u_1|, \ldots, |u_{N-1}|, 1 + |\ell|\right)\). Alors \(\forall n \in \N,\ |u_n| \leq M\) : la suite est bornée.`)) },
        { t: 'Réciproque, contraposée', html: p(r`La réciproque est fausse : \(u_n = (-1)^n\) est bornée (\(|u_n| \leq 1\)) et ne converge pas.`) + p(r`Contraposée : si \((u_n)\) n’est pas bornée, alors \((u_n)\) ne converge pas.`) }],
      answer: p(r`Démonstration de la fiche « Démonstrations à connaître » ; contre-exemple \(((-1)^n)\) ; « non bornée \(\Rightarrow\) non convergente ».`), traps: [r`Oublier les premiers termes \(u_0, \ldots, u_{N-1}\) dans le maximum.`], note: NO25 },

    { id: 'f2025-ex5', exam: 'f2025', stage: 'final', kind: 'partiel', order: 5, src: 'Examen janv. 2025 · Ex 5', title: 'Suite récurrente uₙ₊₁ = 1 + uₙ²/4', pts: 4.5, topics: ['recurrentes', 'convergence'], lvl: 2, time: 15,
      intro: r`Soit \((u_n)\) définie par \(u_0 = \dfrac{3}{2}\) et \(\forall n \in \N,\ u_{n+1} = 1 + \dfrac{1}{4}u_n^2\).`,
      questions: [r`Étudier la monotonie de \((u_n)\). (Vous chercherez à factoriser l’expression que vous calculez.)`, r`Montrer par récurrence que \(\forall n \in \N,\ 1 \lt u_n \lt 2\).`, r`Peut-on en déduire le comportement de \((u_n)\) en \(+\infty\) ? Si la suite converge, trouver sa limite. Justifier.`],
      hints: [r`\(u_{n+1} - u_n\) est un carré.`, r`Encadre \(u_n^2\), puis \(\frac{u_n^2}{4}\), puis ajoute 1.`],
      solution: [
        { t: 'Monotonie', html: p(r`\(u_{n+1} - u_n = \dfrac{u_n^2 - 4u_n + 4}{4} = \dfrac{(u_n - 2)^2}{4} \geq 0\) : la suite est croissante.`) },
        { t: 'Récurrence', html: p(r`\(u_0 = \dfrac{3}{2} \in\ ]1, 2[\). Si \(1 \lt u_n \lt 2\), alors \(1 \lt u_n^2 \lt 4\), \(\dfrac{1}{4} \lt \dfrac{u_n^2}{4} \lt 1\), donc \(\dfrac{5}{4} \lt u_{n+1} \lt 2\), et en particulier \(1 \lt u_{n+1} \lt 2\).`) },
        { t: 'Limite', html: model(p(r`La suite est croissante et majorée par 2 : elle converge vers un réel \(\ell\). La fonction \(x \mapsto 1 + \dfrac{x^2}{4}\) est continue, donc \(\ell = 1 + \dfrac{\ell^2}{4}\), soit \((\ell - 2)^2 = 0\). Donc \(\ell = 2\).`)) }],
      answer: p(r`Croissante, majorée par 2, convergente vers 2.`), traps: [r`La limite 2 n’est jamais atteinte : \(u_n \lt 2\) strictement, mais \(\ell \leq 2\) à la limite.`], note: NO25 },

    { id: 'f2025-ex6', exam: 'f2025', stage: 'final', kind: 'partiel', order: 6, src: 'Examen janv. 2025 · Ex 6', title: 'sin(nπ/3) diverge : deux sous-suites', pts: 3, topics: ['extraites'], lvl: 1, time: 8,
      intro: r`Considérons la suite \((u_n) = \left(\sin\left(\dfrac{n\pi}{3}\right)\right)\).`,
      questions: [r`Que vaut la suite \((u_{3n})\) ?`, r`Vers quoi converge la suite \((u_{6n+1})\) ?`, r`La suite \((u_n)\) est-elle convergente ? Justifier en citant proprement un résultat du cours.`],
      hints: [r`\(\sin(n\pi) = 0\) et \(\sin\) est \(2\pi\)-périodique.`],
      solution: [
        { t: 'Les sous-suites', html: p(r`\(u_{3n} = \sin(n\pi) = 0\) : \((u_{3n})\) est la suite nulle. \(u_{6n+1} = \sin\left(2n\pi + \dfrac{\pi}{3}\right) = \sin\dfrac{\pi}{3} = \dfrac{\sqrt{3}}{2}\) : \((u_{6n+1})\) est constante et converge vers \(\dfrac{\sqrt{3}}{2}\).`) },
        { t: 'Conclusion', html: model(p(r`Si une suite converge vers \(\ell\), toutes ses suites extraites convergent vers \(\ell\). Or \((u_{3n})\) et \((u_{6n+1})\) sont deux suites extraites de \((u_n)\) qui convergent vers des limites distinctes, 0 et \(\dfrac{\sqrt{3}}{2}\). Donc \((u_n)\) diverge.`)) }],
      answer: p(r`\((u_n)\) diverge.`), traps: [r`« Elle oscille donc elle diverge » n’est pas une justification : cite le résultat sur les suites extraites.`], note: NO25 }
  ];
  Array.prototype.push.apply(EX, Q);
})();
