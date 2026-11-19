/* Maths · APIS — fiches d'exercices, cours 4 du Moodle : suites numériques.
   Périmètre du contrôle de cours du 23 novembre 2026 (stage 'cc') : introduction, limites, exemples remarquables.
   Sources : pages « Exercices types » du Moodle et leurs corrigés officiels (ids mo-3N-…), TD 4 parties 1 et 2 et
   exercice 3.6 (ids td4-…, publié sans corrigé), contrôles de cours de décembre 2022 et novembre 2023.
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
  var OFF = 'Reprend le corrigé officiel du Moodle.';
  var CC = 'Contrôle sans corrigé publié : réponses rédigées pour le site.';
  var Q = [

    /* ================================================================== Moodle 3.1 : introduction */
    { id: 'mo-31-1', stage: 'cc', kind: 'moodle', order: 21, src: 'Moodle · Introduction · ex. 1', title: 'n/(n + 3) : bornée, monotone', topics: ['definitions'], lvl: 1, time: 8,
      intro: r`Soit la suite définie pour \(n \in \N\) par \(u_n = \dfrac{n}{n + 3}\).`,
      questions: [r`Déterminer un majorant et un minorant de cette suite. La suite est-elle bornée ?`, r`Étudier la monotonie de \((u_n)\).`],
      hints: [r`\(n \geq 0\) et \(n \lt n + 3\).`, r`Signe de \(u_{n+1} - u_n\), en réduisant au même dénominateur.`],
      solution: [
        { t: 'Bornes', html: p(r`Soit \(n \in \N\). \(n \geq 0\) et \(n + 3 \gt 0\), donc \(u_n \geq 0\) : minorée par 0. De plus \(n \lt n + 3\), d’où \(\dfrac{n}{n + 3} \leq 1\) : majorée par 1. Minorée et majorée, la suite est bornée.`) },
        { t: 'Monotonie', html: p(r`\(u_{n+1} - u_n = \dfrac{n + 1}{n + 4} - \dfrac{n}{n + 3} = \dfrac{(n + 1)(n + 3) - n(n + 4)}{(n + 4)(n + 3)} = \dfrac{3}{(n + 4)(n + 3)} \gt 0\). La suite est strictement croissante.`) }],
      answer: p(r`Minorée par 0, majorée par 1, donc bornée ; strictement croissante.`),
      traps: [r`\(u_{n+1} = \frac{n + 1}{n + 4}\) : on remplace \(n\) par \(n + 1\) en haut <b>et</b> en bas.`], official: true, note: OFF },

    { id: 'mo-31-2', stage: 'cc', kind: 'moodle', order: 22, src: 'Moodle · Introduction · ex. 2', title: '(n − 4)/(7n − 22) : bornée, pas monotone', topics: ['definitions'], lvl: 3, time: 15,
      intro: r`Soit la suite \((u_n)_{n \in \N}\) définie par \(u_n = \dfrac{n - 4}{7n - 22}\). La suite est-elle bornée ? Est-elle monotone ?`,
      hints: [r`Calcule \(u_0\) à \(u_4\) à part, puis raisonne pour \(n \geq 4\).`, r`Pour \(n \geq 5\), les termes sont strictement positifs : compare \(\dfrac{u_{n+1}}{u_n}\) à 1.`],
      solution: [
        { t: 'Bien définie, minorée', html: p(r`\(7n - 22 = 0\) n’a pas de solution entière (\(\frac{22}{7} \notin \N\)) : la suite est bien définie. Pour \(n \geq 4\) : \(n - 4 \geq 0\) et \(7n - 22 \geq 6\), donc \(u_n \geq 0\). Et \(u_0 = \frac{2}{11}\), \(u_1 = \frac{1}{5}\), \(u_2 = \frac{1}{4}\), \(u_3 = 1\) : la suite est minorée par 0.`) },
        { t: 'Majorée', html: p(r`\(7(n - 4) = 7n - 28 \lt 7n - 22\), donc pour \(n \geq 4\), \(u_n \leq \frac{1}{7}\). Les quatre premiers termes sont inférieurs ou égaux à 1 : 1 est un majorant. La suite est bornée.`) },
        { t: 'Monotonie', html: p(r`Pour \(n \geq 5\), \(u_n \gt 0\) et \(\dfrac{u_{n+1}}{u_n} = \dfrac{n - 3}{7n - 15} \times \dfrac{7n - 22}{n - 4} = \dfrac{7n^2 - 43n + 66}{7n^2 - 43n + 60} \gt 1\), le dénominateur \((7n - 15)(n - 4)\) étant positif. La suite est strictement croissante à partir du rang 5. Mais \(u_4 = 0 \lt u_3 = 1\) : elle n’est pas croissante sur \(\N\).`) }],
      answer: p(r`Bornée (entre 0 et 1) ; pas monotone, mais strictement croissante à partir du rang 5.`),
      traps: [r`Conclure « croissante » d’après le quotient sans regarder les premiers termes, où le quotient ne s’applique pas (\(u_4 = 0\)).`], official: true, note: OFF },

    { id: 'mo-31-3', stage: 'cc', kind: 'moodle', order: 23, src: 'Moodle · Introduction · ex. 3', title: 'u₀ = 0, uₙ₊₁ = √(1 + uₙ) : deux récurrences', topics: ['definitions'], lvl: 2, time: 15,
      intro: r`Soit la suite définie par récurrence par \(u_0 = 0\) et \(u_{n+1} = \sqrt{1 + u_n}\).`,
      questions: [r`Montrer que la suite \((u_n)\) est bien définie pour tout \(n \in \N\) et que \(\forall n \in \N,\ 0 \leq u_n \leq 2\).`, r`Montrer que la suite \((u_n)\) est croissante.`],
      hints: [r`Récurrence sur la propriété « \(u_n\) est défini et \(0 \leq u_n \leq 2\) ».`, r`Récurrence sur « \(u_n \lt u_{n+1}\) » : la racine carrée est strictement croissante.`],
      solution: [
        { t: 'Bien définie et bornée', html: model(p(r`\(\mathcal{P}_n\) : « \(u_n\) est défini et \(0 \leq u_n \leq 2\) ». <b>Initialisation</b> : \(u_0 = 0\). <b>Hérédité</b> : si \(\mathcal{P}_n\) est vraie, \(1 \leq 1 + u_n \leq 3\), donc \(\sqrt{1 + u_n}\) existe et \(1 \leq u_{n+1} \leq \sqrt{3}\). Comme \(0 \leq 1\) et \(\sqrt{3} \leq 2\), \(0 \leq u_{n+1} \leq 2\). <b>Conclusion</b> : \(\mathcal{P}_n\) est vraie pour tout \(n\).`)) },
        { t: 'Croissante', html: model(p(r`\(\mathcal{P}_n\) : « \(u_n \lt u_{n+1}\) ». <b>Initialisation</b> : \(u_1 = 1 \gt u_0\). <b>Hérédité</b> : si \(u_n \lt u_{n+1}\), alors \(1 + u_n \lt 1 + u_{n+1}\), donc \(\sqrt{1 + u_n} \lt \sqrt{1 + u_{n+1}}\), soit \(u_{n+1} \lt u_{n+2}\). <b>Conclusion</b> : la suite est strictement croissante.`)) }],
      answer: p(r`Deux récurrences. La suite est croissante et majorée par 2.`),
      traps: [r`Oublier de justifier que \(1 + u_n \geq 0\) avant d’écrire la racine : c’est le sens de « bien définie ».`], official: true, note: OFF },

    /* ================================================================== Moodle 3.2 : limites */
    { id: 'mo-32-1', stage: 'cc', kind: 'moodle', order: 24, src: 'Moodle · Limites · ex. 1', title: '1/n² converge : par la définition', topics: ['limites', 'demonstrations'], lvl: 2, time: 8,
      intro: r`Établir, en revenant à la définition de limite, que la suite définie pour tout \(n \in \N^{\star}\) par \(u_n = \dfrac{1}{n^2}\) converge.`,
      hints: [r`Fixe \(\varepsilon \gt 0\) et cherche à partir de quel \(n\) on a \(\frac{1}{n^2} \leq \varepsilon\).`],
      solution: [{ t: 'Avec ε', html: model(p(r`Montrons que la suite converge vers 0. Soit \(\varepsilon \gt 0\). \(|u_n - 0| = \dfrac{1}{n^2}\), et \(\dfrac{1}{n^2} \leq \varepsilon \iff n^2 \geq \dfrac{1}{\varepsilon} \iff n \geq \dfrac{1}{\sqrt{\varepsilon}}\).`) + p(r`Soit \(N = E\left(\dfrac{1}{\sqrt{\varepsilon}}\right) + 1\). Alors \(n \geq N \Rightarrow |u_n - 0| \leq \varepsilon\). Donc \((u_n)\) converge vers 0.`)) }],
      answer: p(r`La structure à reproduire : « Soit \(\varepsilon \gt 0\) » ; résoudre \(|u_n - \ell| \leq \varepsilon\) ; exhiber un rang \(N\) ; conclure.`),
      traps: [r`Choisir un \(\varepsilon\) particulier : il doit rester quelconque.`], official: true, note: OFF },

    { id: 'mo-32-2', stage: 'cc', kind: 'moodle', order: 25, src: 'Moodle · Limites · ex. 2 et 3', title: 'Deux formes indéterminées', topics: ['limites'], lvl: 2, time: 10,
      intro: r`Déterminer la limite des suites définies par :`,
      questions: [r`\(u_n = \dfrac{2 + n - n^2}{n^2 + 3n + 4}\).`, r`\(u_n = \dfrac{e^n - n^2}{n + \ln(n)}\).`],
      hints: [r`Factorise le terme dominant en haut et en bas : \(n^2\), puis \(e^n\) et \(n\).`, r`Croissances comparées : \(\frac{n^2}{e^n} \to 0\), \(\frac{\ln n}{n} \to 0\), \(\frac{e^n}{n} \to +\infty\).`],
      solution: [
        { t: 'Quotient de polynômes', html: p(r`\(u_n = \dfrac{\frac{2}{n^2} + \frac{1}{n} - 1}{1 + \frac{3}{n} + \frac{4}{n^2}}\). Le numérateur tend vers \(-1\), le dénominateur vers 1 : \(\lim u_n = -1\).`) },
        { t: 'Croissances comparées', html: p(r`\(u_n = \dfrac{e^n}{n} \times \dfrac{1 - \frac{n^2}{e^n}}{1 + \frac{\ln(n)}{n}}\). Par croissances comparées, le second facteur tend vers 1 et \(\dfrac{e^n}{n} \to +\infty\) : \(\lim u_n = +\infty\).`) }],
      answer: p(r`\(-1\) ; \(+\infty\).`), traps: [r`Le signe : le terme dominant du numérateur est \(-n^2\).`], official: true, note: OFF },

    { id: 'mo-32-4', stage: 'cc', kind: 'moodle', order: 26, src: 'Moodle · Limites · ex. 4', title: 'Théorème des gendarmes', topics: ['limites'], lvl: 2, time: 10,
      intro: r`Déterminer la limite de la suite définie pour tout \(n \in \N\) par \(u_n = \dfrac{2n + (-1)^n}{n^2 + \cos(n)}\).`,
      hints: [r`Encadre le numérateur et le dénominateur séparément.`, r`Pour encadrer le quotient : petit numérateur sur grand dénominateur à gauche, l’inverse à droite.`],
      solution: [{ t: 'Encadrement', html: model(p(r`\(2n - 1 \leq 2n + (-1)^n \leq 2n + 1\) et \(n^2 - 1 \leq n^2 + \cos(n) \leq n^2 + 1\). Pour \(n \geq 2\) : \(\dfrac{2n - 1}{n^2 + 1} \leq u_n \leq \dfrac{2n + 1}{n^2 - 1}\).`) + p(r`Or \(\dfrac{2n - 1}{n^2 + 1} = \dfrac{2 - \frac{1}{n}}{n + \frac{1}{n}} \to 0\) et \(\dfrac{2n + 1}{n^2 - 1} \to 0\). D’après le théorème des gendarmes, \(\lim u_n = 0\).`)) }],
      answer: p(r`\(\lim u_n = 0\).`), traps: [r`L’encadrement n’a de sens que pour \(n \geq 2\) (dénominateur \(n^2 - 1 \gt 0\)) : le dire.`], official: true, note: OFF },

    { id: 'mo-32-5', stage: 'cc', kind: 'moodle', order: 27, src: 'Moodle · Limites · ex. 5', title: 'Tend vers +∞ sans être monotone', topics: ['limites', 'exemples'], lvl: 2, time: 8,
      intro: r`Soit \(u_n = \sqrt{n}\) si \(n\) est pair et \(u_n = n^2\) si \(n\) est impair.`,
      questions: [r`Déterminer la limite de la suite.`, r`La suite est-elle monotone ?`],
      hints: [r`Minore \(u_n\) par une même suite dans les deux cas.`],
      solution: [
        { t: 'Comparaison', html: p(r`Pour \(n \in \N\), \(n^2 \geq n \geq \sqrt{n}\). Que \(n\) soit pair ou impair, \(u_n \geq \sqrt{n}\). Comme \(\sqrt{n} \to +\infty\), par comparaison \(\lim u_n = +\infty\).`) },
        { t: 'Pas monotone', html: p(r`Si \(n\) est pair, \(u_n = \sqrt{n} \leq n^2 \lt (n + 1)^2 = u_{n+1}\). Si \(n\) est impair, \(n \geq 3\) : \(u_n = n^2 \gt 2n \gt n + 1 \gt \sqrt{n + 1} = u_{n+1}\). La suite monte puis descend : elle n’est pas monotone.`) }],
      answer: p(r`\(\lim u_n = +\infty\) ; non monotone.`), traps: [r`« Tend vers \(+\infty\) » n’implique pas « croissante ».`], official: true, note: OFF },

    /* ================================================================== Moodle 3.3 : exemples remarquables */
    { id: 'mo-33-1', stage: 'cc', kind: 'moodle', order: 28, src: 'Moodle · Exemples remarquables · ex. 1', title: 'Suite arithmético-géométrique', topics: ['geometriques'], lvl: 2, time: 10,
      intro: r`Soit \((u_n)\) définie par \(u_0 = 0\) et, pour tout \(n \in \N\), \(u_{n+1} = \dfrac{3 + u_n}{2}\).`,
      questions: [r`Déterminer un réel \(l\) tel que la suite \((v_n) = (u_n - l)\) soit géométrique.`, r`En déduire le comportement de \((u_n)\).`],
      hints: [r`Exprime \(v_{n+1}\) en fonction de \(v_n\), avec \(u_n = v_n + l\).`],
      solution: [
        { t: 'Le bon l', html: p(r`\(v_{n+1} = u_{n+1} - l = \dfrac{u_n + 3}{2} - l = \dfrac{v_n + l + 3}{2} - l = \dfrac{v_n + 3 - l}{2}\). Pour \(l = 3\) : \(v_{n+1} = \frac{1}{2}v_n\), géométrique de raison \(\frac{1}{2}\).`) },
        { t: 'La limite', html: p(r`\(\left|\frac{1}{2}\right| \lt 1\), donc \(\lim v_n = 0\). Comme \(u_n = v_n + 3\), \(\lim u_n = 3\). Explicitement : \(v_0 = -3\), \(u_n = 3 - \dfrac{3}{2^n}\).`) }],
      answer: p(r`\(l = 3\) (le point fixe : \(l = \frac{3 + l}{2}\)) ; \((u_n)\) converge vers 3.`), traps: [r`\(l\) est la solution de \(l = \frac{3 + l}{2}\) : retrouve-le ainsi au brouillon.`], official: true, note: OFF },

    { id: 'mo-33-2', stage: 'cc', kind: 'moodle', order: 29, src: 'Moodle · Exemples remarquables · ex. 2', title: 'Critère du quotient avec des factorielles', topics: ['geometriques', 'limites'], lvl: 3, time: 12,
      intro: r`Étudier la limite de la suite \((u_n) = \left(\dfrac{3^n (n!)^2}{(2n)!}\right)_{n \in \N}\) (on étudiera \(\dfrac{u_{n+1}}{u_n}\)).`,
      hints: [r`\((n + 1)! = (n + 1)\,n!\) et \((2n + 2)! = (2n + 2)(2n + 1)(2n)!\).`, r`Le quotient tend vers \(\frac{3}{4}\) : trouve un rang à partir duquel il est inférieur à \(\frac{4}{5}\).`],
      solution: [
        { t: 'Le quotient', html: p(r`\(u_n \gt 0\). \(\dfrac{u_{n+1}}{u_n} = \dfrac{3(n + 1)^2}{(2n + 2)(2n + 1)} = \dfrac{3(n + 1)}{2(2n + 1)}\), qui tend vers \(\dfrac{3}{4}\).`) },
        { t: 'Un ℓ fixe', html: p(r`\(\dfrac{3(n + 1)}{2(2n + 1)} \lt \dfrac{4}{5} \iff 15n + 15 \lt 16n + 8 \iff n \gt 7\). Pour \(n \gt 7\) : \(0 \lt \dfrac{u_{n+1}}{u_n} \lt \dfrac{4}{5} \lt 1\). D’après le théorème, la suite tend vers 0.`) }],
      answer: p(r`\(\lim u_n = 0\).`), traps: [r`« Le quotient tend vers \(\frac{3}{4}\) donc la suite tend vers \(\frac{3}{4}\) » : faux. C’est le quotient qui est sous 1, la suite tend vers 0.`], official: true, note: OFF },

    { id: 'mo-33-3', stage: 'cc', kind: 'moodle', order: 30, src: 'Moodle · Exemples remarquables · ex. 3', title: '0,111…1 : une somme géométrique', topics: ['geometriques'], lvl: 3, time: 12,
      intro: r`Soit \((u_n)\) la suite définie pour \(n \geq 1\) par \(u_n = 0{,}1111\cdots1\) (avec \(n\) fois le chiffre 1 après la virgule).`,
      questions: [r`Déterminer la limite \(a\) de la suite \((u_n)\).`, r`Montrer que \(\forall n \in \N^{\star},\ u_n = \dfrac{E(10^n a)}{10^n}\).`],
      hints: [r`\(u_n = \displaystyle\sum_{k=1}^{n} 10^{-k}\).`, r`Écris \(a = u_n + \) un reste, puis multiplie par \(10^n\).`],
      solution: [
        { t: 'La somme', html: p(r`\(u_n = \displaystyle\sum_{k=1}^{n} 10^{-k} = \frac{1}{10}\sum_{k=0}^{n-1} \left(\frac{1}{10}\right)^k = \frac{1}{10} \times \frac{1 - \left(\frac{1}{10}\right)^n}{1 - \frac{1}{10}} = \frac{1 - 10^{-n}}{9}\). Donc \((u_n)\) converge vers \(a = \dfrac{1}{9}\).`) },
        { t: 'La partie entière', html: p(r`\(a = u_n + \dfrac{1}{9 \times 10^n}\), donc \(10^n a = 10^n u_n + \dfrac{1}{9}\). Or \(10^n u_n\) est un entier (\(u_n\) a \(n\) décimales) et \(\frac{1}{9} \in [0, 1[\). Donc \(E(10^n a) = 10^n u_n\), d’où le résultat.`) }],
      answer: p(r`\(a = \dfrac{1}{9}\).`), traps: [r`\(n\) termes : l’exposant de la formule est \(n\).`], official: true, note: OFF },

    /* ================================================================== TD 4 */
    { id: 'td4-1-1', stage: 'cc', kind: 'td', order: 31, src: 'TD 4 · ex. 1.1', title: 'Dix définitions avec quantificateurs, et un exemple pour chacune', topics: ['definitions', 'limites', 'exemples'], lvl: 2, time: 25,
      intro: r`Donner la définition des propriétés citées avec des quantificateurs, puis donner des exemples de suites vérifiant ces propriétés : constante ; stationnaire ; majorée, minorée ; bornée ; croissante, décroissante, puis strictement ; convergeant vers \(\ell \in \R\), puis convergente ; tendant vers \(+\infty\), \(-\infty\) ; n’ayant pas de limite ; bornée et non convergente ; strictement croissante et bornée.`,
      hints: [r`L’ordre des quantificateurs : la constante (\(M\), \(C\), \(N\)) avant \(n\).`, r`« Convergente » : il <b>existe</b> \(\ell\) tel que la suite converge vers \(\ell\).`],
      solution: [{ t: 'Le tableau à savoir par cœur', html: tbl(['Propriété', 'Définition', 'Exemple'], [
        ['constante', r`\(\exists C \in \R,\ \forall n \in \N,\ u_n = C\)`, r`\(u_n = 2\)`],
        ['stationnaire', r`\(\exists N \in \N,\ \forall n \geq N,\ u_n = u_N\)`, r`\(u_0 = 1\), \(u_n = 0\) pour \(n \geq 1\)`],
        ['majorée', r`\(\exists M \in \R,\ \forall n \in \N,\ u_n \leq M\)`, r`\(u_n = 3 - n\)`],
        ['minorée', r`\(\exists m \in \R,\ \forall n \in \N,\ m \leq u_n\)`, r`\(u_n = n^2\)`],
        ['bornée', r`\(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\)`, r`\(u_n = (-1)^n\)`],
        ['croissante', r`\(\forall n \in \N,\ u_{n+1} \geq u_n\)`, r`\(u_n = n\)`],
        ['strictement décroissante', r`\(\forall n \in \N,\ u_{n+1} \lt u_n\)`, r`\(u_n = -n\)`],
        [r`converge vers \(\ell\)`, r`\(\forall \varepsilon \gt 0,\ \exists N \in \N,\ \forall n \geq N,\ |u_n - \ell| \lt \varepsilon\)`, r`\(u_n = \frac{1}{n + 1}\), \(\ell = 0\)`],
        ['convergente', r`\(\exists \ell \in \R,\ \forall \varepsilon \gt 0,\ \exists N \in \N,\ \forall n \geq N,\ |u_n - \ell| \lt \varepsilon\)`, r`\(u_n = 2 + \frac{1}{n + 1}\)`],
        [r`tend vers \(+\infty\)`, r`\(\forall A \in \R,\ \exists N \in \N,\ \forall n \geq N,\ u_n \gt A\)`, r`\(u_n = n\)`],
        [r`tend vers \(-\infty\)`, r`\(\forall A \in \R,\ \exists N \in \N,\ \forall n \geq N,\ u_n \lt A\)`, r`\(u_n = -n^2\)`],
        ['sans limite', 'ni convergente, ni de limite infinie', r`\(u_n = (-1)^n\)`],
        ['bornée et non convergente', '', r`\(u_n = (-1)^n\)`],
        ['strictement croissante et bornée', '', r`\(u_n = \frac{n}{n + 1}\)`]]) }],
      answer: p(r`Un exemple se justifie en une ligne : pour \(\left(\frac{n}{n + 1}\right)\), \(0 \leq u_n \lt 1\) et \(u_{n+1} - u_n = \frac{1}{(n + 1)(n + 2)} \gt 0\).`),
      traps: [r`Donner une suite constante quand l’énoncé dit « non constante ».`, r`« Minorée et majorée » ou « \(|u_n| \leq M\) » : les deux définitions de « bornée » sont acceptées, la seconde est plus courte.`], note: NOCOR },

    { id: 'td4-1-2', stage: 'cc', kind: 'td', order: 32, src: 'TD 4 · ex. 1.2', title: 'Contre-exemples classiques', topics: ['exemples', 'limites'], lvl: 3, time: 15,
      intro: r`Contre-exemples classiques.`,
      questions: [r`Donner un exemple de suite tendant vers \(+\infty\) mais pas croissante.`, r`Même question avec en plus : pour tout \(n_0 \in \N\), la suite n’est pas croissante sur \([\![n_0, +\infty[\![\).`, r`Donner des exemples de suites non majorées mais qui ne tendent pas vers \(+\infty\).`, r`Donner un exemple de suite ni majorée ni minorée, et expliquer pourquoi une telle suite ne peut pas avoir de limite.`],
      hints: [r`Ajoute à \(n\) quelque chose qui oscille : \((-1)^n\) fois une constante.`, r`Question 3 : une suite qui vaut 0 un rang sur deux.`],
      solution: [
        { t: 'Vers +∞ sans croître', html: p(r`\(u_n = n + 2(-1)^n\) répond aux deux premières questions. \(u_n \geq n - 2\), donc \(u_n \to +\infty\) par comparaison. Mais pour tout \(k\), \(u_{2k} = 2k + 2 \gt u_{2k+1} = 2k - 1\) : la suite redescend à chaque rang impair, aussi loin qu’on aille.`) },
        { t: 'Non majorée, sans tendre vers +∞', html: p(r`\(u_n = n\left(1 + (-1)^n\right)\) : \(u_{2k} = 4k\) (non majorée) et \(u_{2k+1} = 0\) (elle revient à 0 indéfiniment). Autre exemple : \(u_n = (-1)^n n\).`) },
        { t: 'Ni majorée ni minorée', html: p(r`\(u_n = (-1)^n n\) : \(u_{2k} = 2k\), \(u_{2k+1} = -(2k + 1)\). Une telle suite n’a pas de limite : si elle convergeait, elle serait bornée ; si elle tendait vers \(+\infty\), elle serait positive à partir d’un rang \(n_0\), donc minorée par \(\min(u_0, \ldots, u_{n_0 - 1}, 0)\) ; de même, si elle tendait vers \(-\infty\), elle serait majorée.`) }],
      answer: p(r`\(n + 2(-1)^n\) ; \(n(1 + (-1)^n)\) ; \((-1)^n n\).`), traps: [r`Teste ton exemple sur trois ou quatre termes. \(n + (-1)^n\) convient aussi (\(u_0 = 1 \gt u_1 = 0\)) ; mais \(n + \frac{(-1)^n}{2}\) est croissante (\(u_0 = u_1 = \frac{1}{2}\)) : l’oscillation est trop petite.`], note: NOCOR },

    { id: 'td4-2-3', stage: 'cc', kind: 'td', order: 33, src: 'TD 4 · ex. 2.3', title: 'Suites géométriques et arithmético-géométrique', topics: ['geometriques'], lvl: 2, time: 20,
      intro: r`Autour des suites géométriques.`,
      questions: [r`Soit \(q \in \R\). Rappeler \(\displaystyle\lim_{n \to +\infty} q^n\) en fonction de \(q\), ainsi que \(\displaystyle\sum_{k=0}^{n} q^k\).`, r`Discuter du signe d’une suite géométrique de raison \(q \in \R\).`,
        r`Soit \((u_n)\) définie par \(u_0 \in \R\) et \(\forall n \in \N,\ u_{n+1} = \dfrac{u_n + 4}{5}\). (a) Pour quelles valeurs de \(u_0\) la suite est-elle constante ? Quelle équation as-tu résolue ? (b) On note \(\ell\) cette valeur. Montrer que \((v_n) = (u_n - \ell)\) est géométrique et préciser sa raison. (c) On prend \(u_0 = 5\). Exprimer \(u_n\) en fonction de \(n\). Que vaut \(\lim u_n\) ? (d) Calculer \(S = \displaystyle\sum_{k=0}^{5} u_k\).`],
      hints: [r`Quatre cas pour \(q^n\) : \(q \gt 1\), \(q = 1\), \(|q| \lt 1\), \(q \leq -1\).`, r`(d) Sépare : \(u_k = 1 + \frac{4}{5^k}\), six termes.`],
      solution: [
        { t: 'Rappels', html: p(r`\(q \gt 1\) : \(q^n \to +\infty\). \(q = 1\) : \(q^n \to 1\). \(-1 \lt q \lt 1\) : \(q^n \to 0\). \(q \leq -1\) : pas de limite. \(\displaystyle\sum_{k=0}^{n} q^k = \frac{1 - q^{n+1}}{1 - q}\) si \(q \neq 1\), et \(n + 1\) si \(q = 1\).`) },
        { t: 'Signe', html: p(r`\(u_n = u_0 q^n\). Si \(u_0 = 0\) ou \(q = 0\) : nulle (à partir du rang 1). Si \(q \gt 0\) : tous les termes ont le signe de \(u_0\). Si \(q \lt 0\) : le signe alterne, celui de \(u_0\) aux rangs pairs.`) },
        { t: 'L’arithmético-géométrique', html: model(p(r`(a) Constante \(\iff u_0 = \frac{u_0 + 4}{5} \iff u_0 = 1\). C’est l’équation du point fixe \(\ell = \frac{\ell + 4}{5}\).`) + p(r`(b) \(v_{n+1} = \frac{u_n + 4}{5} - 1 = \frac{u_n - 1}{5} = \frac{1}{5}v_n\) : géométrique de raison \(\frac{1}{5}\).`) + p(r`(c) \(v_0 = 4\), \(v_n = \frac{4}{5^n}\), \(u_n = 1 + \frac{4}{5^n}\), et \(\lim u_n = 1\).`) + p(r`(d) \(S = 6 + 4 \times \dfrac{1 - \frac{1}{5^6}}{1 - \frac{1}{5}} = 6 + 5\left(1 - \frac{1}{15\,625}\right) = 11 - \frac{1}{3125}\).`)) }],
      answer: p(r`\(\ell = 1\) ; raison \(\frac{1}{5}\) ; \(u_n = 1 + \dfrac{4}{5^n}\) ; \(S = 11 - \dfrac{1}{3125} = \dfrac{34\,374}{3125}\).`), traps: [r`De \(k = 0\) à \(k = 5\) il y a 6 termes : la somme des « 1 » vaut 6 et l’exposant est 6.`], note: NOCOR },

    { id: 'td4-2-4', stage: 'cc', kind: 'td', order: 34, src: 'TD 4 · ex. 2.4', title: 'La rumeur : modéliser par une suite', topics: ['geometriques'], lvl: 3, time: 15,
      intro: r`Une rumeur se propage : à chaque fois qu’un élève transmet l’information à son voisin, il a une probabilité \(p \in\ ]0, 1[\) de transmettre ce qu’il a entendu, et \(1 - p\) de transmettre exactement l’opposé. On note \(\pi_n\) la probabilité qu’un élève ait la bonne information après \(n\) transmissions (\(\pi_0 = 1\)).`,
      questions: [r`Pour \(n \in \N\), déterminer la relation entre \(\pi_{n+1}\) et \(\pi_n\).`, r`En déduire une formule explicite pour \(\pi_n\).`, r`Quelle est la limite de \(\pi_n\) ?`],
      hints: [r`L’élève \(n + 1\) a la bonne information si le précédent l’avait et l’a bien transmise, ou s’il avait la mauvaise et l’a inversée.`, r`Suite arithmético-géométrique : cherche le point fixe.`],
      solution: [
        { t: 'La relation', html: p(r`Par la formule des probabilités totales : \(\pi_{n+1} = p\,\pi_n + (1 - p)(1 - \pi_n) = (2p - 1)\pi_n + 1 - p\).`) },
        { t: 'La formule', html: p(r`Point fixe : \(\ell = (2p - 1)\ell + 1 - p \iff 2(1 - p)\ell = 1 - p \iff \ell = \frac{1}{2}\). La suite \(\left(\pi_n - \frac{1}{2}\right)\) est géométrique de raison \(2p - 1\), de premier terme \(\frac{1}{2}\) : \(\pi_n = \dfrac{1}{2} + \dfrac{1}{2}(2p - 1)^n\).`) },
        { t: 'La limite', html: p(r`\(0 \lt p \lt 1\) donne \(-1 \lt 2p - 1 \lt 1\), donc \((2p - 1)^n \to 0\) et \(\pi_n \to \dfrac{1}{2}\).`) }],
      answer: p(r`\(\pi_n = \dfrac{1}{2} + \dfrac{1}{2}(2p - 1)^n \to \dfrac{1}{2}\) : après beaucoup de relais, l’information ne vaut pas mieux qu’un pile ou face.`), traps: [r`Oublier le cas « mauvaise information, inversée » : il redonne la bonne.`], note: NOCOR },

    { id: 'td4-3-6', stage: 'cc', kind: 'td', order: 35, src: 'TD 4 · ex. 3.6', title: 'Encadrer une somme : gendarmes', topics: ['limites'], lvl: 3, time: 12,
      intro: r`On considère la suite \((u_n)_{n \in \N^*}\) définie par \(u_n = \displaystyle\sum_{k=1}^{n} \frac{1}{n^2 + k}\).`,
      questions: [r`Montrer que \((u_n)\) converge, et donner sa limite.`, r`Montrer que \((n\,u_n)\) converge, et donner sa limite.`],
      hints: [r`Encadre chaque terme par le plus petit et le plus grand, puis multiplie par le nombre de termes.`],
      solution: [
        { t: 'Encadrement', html: model(p(r`Pour \(1 \leq k \leq n\) : \(n^2 + 1 \leq n^2 + k \leq n^2 + n\), donc \(\dfrac{1}{n^2 + n} \leq \dfrac{1}{n^2 + k} \leq \dfrac{1}{n^2 + 1}\). En sommant les \(n\) termes : \(\dfrac{n}{n^2 + n} \leq u_n \leq \dfrac{n}{n^2 + 1}\).`) + p(r`Les deux suites qui encadrent tendent vers 0 : d’après le théorème des gendarmes, \(\lim u_n = 0\).`)) },
        { t: 'n uₙ', html: p(r`En multipliant par \(n \gt 0\) : \(\dfrac{n^2}{n^2 + n} \leq n\,u_n \leq \dfrac{n^2}{n^2 + 1}\). Les deux suites tendent vers 1 : \(\lim n\,u_n = 1\).`) }],
      answer: p(r`\(\lim u_n = 0\) ; \(\lim n\,u_n = 1\).`), traps: [r`L’inverse retourne les inégalités : le plus grand dénominateur donne le plus petit terme.`, r`La limite d’une somme dont le nombre de termes grandit ne se calcule pas terme à terme.`], note: NOCOR },

    /* ================================================================== contrôles de cours sur les suites */
    { id: 'cc2023n-asi', exam: 'cc2023n', stage: 'cc', kind: 'partiel', order: 9, src: 'Contrôle de cours nov. 2023 · suites', title: 'Le contrôle de cours « suites » de 2023, en entier', pts: 10, topics: ['definitions', 'limites', 'exemples', 'geometriques'], lvl: 2, time: 15,
      intro: r`Contrôle de cours du 27 novembre 2023, partie ASI : 15 minutes, 10 points. Soit \((u_n)\) une suite réelle définie sur \(\N\).`,
      questions: [r`<b>Cours 1 : définitions (5 points).</b> (a) Donner la définition mathématique (avec des quantificateurs) de « \((u_n)\) est bornée ». (b) Donner un exemple d’une suite non constante et bornée.`,
        r`(a) Donner la définition (avec des quantificateurs) de « \((u_n)\) est croissante ». (b) Que signifie que \((u_n)\) est monotone ? (c) Donner un exemple d’une suite ni croissante, ni décroissante.`,
        r`<b>Cours 2 : convergence ou divergence (5 points).</b> Réponses justifiées. Les suites suivantes sont-elles convergentes ? Si oui, donner la limite. \(u_n = \cos(n)\) ; \(v_n = \ln(n^2 + n)\) ; \(w_n = \left(-\dfrac{2}{3}\right)^n\) ; \(x_n = 1 + \dfrac{1}{n}\).`,
        r`Donner un exemple d’une suite non constante convergente vers 2. Ne pas justifier.`],
      hints: [r`Bornée : \(\exists M\), puis \(\forall n\).`, r`\(w\) est géométrique : regarde \(|q|\).`],
      solution: [
        { t: 'Cours 1', html: model(p(r`\((u_n)\) est bornée : \(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\). Exemple : \(u_n = (-1)^n\), car \(|u_n| \leq 1\).`) + p(r`\((u_n)\) est croissante : \(\forall n \in \N,\ u_{n+1} \geq u_n\). \((u_n)\) est monotone : elle est croissante ou décroissante. Exemple de suite ni croissante ni décroissante : \(u_n = (-1)^n\), car \(u_0 \gt u_1\) et \(u_1 \lt u_2\).`)) },
        { t: 'Cours 2', html: model(p(r`\((\cos(n))\) ne converge pas : elle est bornée mais n’a pas de limite (ses termes continuent d’osciller dans \([-1, 1]\)).`) + p(r`\(n^2 + n \to +\infty\) et \(\ln(x) \to +\infty\) quand \(x \to +\infty\) : \(v_n \to +\infty\), la suite diverge.`) + p(r`\((w_n)\) est géométrique de raison \(-\frac{2}{3}\), et \(\left|-\frac{2}{3}\right| \lt 1\) : elle converge vers 0.`) + p(r`\(\frac{1}{n} \to 0\), donc \(x_n \to 1\) : la suite converge vers 1.`) + p(r`Exemple : \(u_n = 2 + \dfrac{1}{n + 1}\).`)) }],
      answer: p(r`Non ; non (\(+\infty\)) ; oui, 0 ; oui, 1.`),
      traps: [r`« Convergente ? » pour une suite qui tend vers \(+\infty\) : la réponse est non.`, r`Pour \(\cos(n)\), « bornée » ne suffit pas à conclure : une suite bornée peut converger ou non. La divergence de \((\cos n)\) est admise à ce niveau ; dis-le clairement plutôt que d’inventer une preuve.`], note: CC },

    { id: 'cc2022d-ex5', exam: 'cc2022d', stage: 'cc', kind: 'partiel', order: 10, src: 'Contrôle de cours déc. 2022 · Ex 5', title: 'Définitions, trois exemples, la suite (qⁿ)', pts: 6, topics: ['definitions', 'exemples', 'geometriques'], lvl: 2, time: 12,
      intro: r`Contrôle de cours du 5 décembre 2022, exercice 5 (6 points). Soit \((u_n)\) une suite.`,
      questions: [r`Rappeler les définitions mathématiques (avec les quantificateurs) de : (a) \((u_n)\) est croissante ; (b) \((u_n)\) est bornée.`,
        r`Donner un exemple d’une suite (non constante) : (a) divergente (justifier brièvement) ; (b) majorée par 3 (justifier brièvement) ; (c) strictement croissante et convergente (justifier proprement).`,
        r`Soit \(q \in \R\) et \((u_n) = (q^n)\). Donner une condition nécessaire et suffisante sur \(q\) pour que la suite converge. Donner la limite dans ce cas.`],
      hints: [r`(c) Une suite négative qui remonte vers 0.`, r`Attention aux deux bords : \(q = 1\) et \(q = -1\).`],
      solution: [
        { t: 'Définitions', html: p(r`Croissante : \(\forall n \in \N,\ u_{n+1} \geq u_n\). Bornée : \(\exists M \in \R,\ \forall n \in \N,\ |u_n| \leq M\).`) },
        { t: 'Exemples', html: model(p(r`(a) \(u_n = n\) : elle tend vers \(+\infty\), donc elle diverge.`) + p(r`(b) \(u_n = 3 - n\) : pour tout \(n \in \N\), \(3 - n \leq 3\).`) + p(r`(c) \(u_n = -\dfrac{1}{n + 1}\). \(u_{n+1} - u_n = \dfrac{1}{n + 1} - \dfrac{1}{n + 2} = \dfrac{1}{(n + 1)(n + 2)} \gt 0\) : strictement croissante. Et \(\dfrac{1}{n + 1} \to 0\), donc \(u_n \to 0\) : convergente.`)) },
        { t: '(qⁿ)', html: p(r`\((q^n)\) converge si et seulement si \(-1 \lt q \leq 1\). Si \(-1 \lt q \lt 1\), la limite est 0 ; si \(q = 1\), la suite est constante égale à 1 et la limite est 1.`) }],
      answer: p(r`\(-1 \lt q \leq 1\) ; limite 0 si \(|q| \lt 1\), 1 si \(q = 1\).`),
      traps: [r`Écrire « \(|q| \lt 1\) » : on oublie \(q = 1\), qui converge.`, r`« Justifier proprement » : la différence \(u_{n+1} - u_n\) calculée, pas « on voit que ».`], note: CC }
  ];
  Array.prototype.push.apply(EX, Q);
})();
