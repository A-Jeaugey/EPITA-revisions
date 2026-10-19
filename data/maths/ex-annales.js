/* Maths (examen 1 : OBM et DP) — exercices des sujets, corrigés.
   Source : $S/analysis/maths_midterms.md (§3 sujets, §5 rédaction attendue, §6 erreurs officielles, §7 pièges), relue
   sur les textes et les scans des sujets d’Epidocs/Past-Exams (Maths PC). Une fiche (kind: 'partiel') par exercice au
   programme de l’examen 1 : d’abord les six sujets au format actuel (DP et OBM 2025, DP et OBM 2024, DP et LE 2023),
   puis les exercices des contrôles combinés 2022 à 2018 (2017 et 2016 n’en ont aucun). Les fiches de relations
   binaires (OBM 2024 ex. 4, LE 2023 ex. 4, 2022 ex. 3, 2021 ex. 1, 2020 ex. 2, 2019 ex. 4) sont gardées, mais ces
   parties sont hors programme depuis le mail du 19 octobre 2026 (prog: false dans data/maths/exams.js).
   Énoncés verbatim (formules en KaTeX \( … \)). Sujets 2025 (Moodle), 2024 et 2018 sans corrigé : réponses recalculées.
   Chaque résultat est recalculé par programme ($S/maths_data/verif_ex.py relit ce fichier et sa version anglaise :
   le champ chk de chaque fiche liste les valeurs attendues, que le script recalcule et retrouve dans le corrigé).

   Format d’une fiche (window.MATHS_EX) : { id, exam, ecue: 'obm' | 'dp', kind: 'partiel', order, src, title, pts,
   topics, lvl (1 facile … 3 difficile), time (minutes), intro, questions, hints, solution: [{ t, html }], answer
   (HTML), traps, grading, official (true : conforme au corrigé officiel), note, near (fiches proches), chk }.
   Dans les corrigés : rédaction modèle <div class="box model"><span class="tag">Rédaction modèle</span>…</div>
   (assets/css/maths.css) et, là où ils aident, les outils d’assets/js/maths.js (<div data-maths="venn | sagittal |
   tree | law | truth | negate" data-opts='{…}'>), montés quand la correction s’ouvre. Les figures (graphes, hexagone)
   sont des SVG en ligne, aux couleurs du thème (window.MATHS_FIG, partagé avec le fichier anglais).
   Les chaînes avec du TeX sont écrites avec String.raw (r`…`) : une seule barre oblique. */
(function () {
  'use strict';
  var r = String.raw;
  var X = window.MATHS_EX = window.MATHS_EX || [];
  /* une question est rendue dans une grille (li > div) : le texte de tête va dans un <p>, sinon chaque morceau de texte
     et chaque formule deviendraient une ligne à part */
  function wrapQ(q) {
    if (/^\s*<(p|div|ul|ol|table)\b/.test(q)) return q;
    var m = /<(p|div|ul|ol|table)\b/.exec(q), i = m ? m.index : q.length;
    return '<p>' + q.slice(0, i) + '</p>' + q.slice(i);
  }
  function add(o) { o.kind = 'partiel'; o.questions = (o.questions || []).map(wrapQ); X.push(o); }
  function M(html, tag) { return '<div class="box model"><span class="tag">Rédaction modèle' + (tag ? ' <i>' + tag + '</i>' : '') + '</span>' + html + '</div>'; }
  function T(name, o) { return '<div data-maths="' + name + '" data-opts=\'' + JSON.stringify(o).replace(/'/g, '&#39;') + '\'></div>'; }

  /* ---------- figures (SVG, couleurs du thème) ---------- */
  /* plot({ x: [x0, x1], y: [y0, y1], w, h, xt: [graduations], yt: [...], lines: [[[x, y], …]], dots: [[x, y, plein]],
     label: [[x, y, texte]] }) : repère, courbes, points pleins ou creux. */
  function plot(o) {
    var W = o.w || 340, H = o.h || 230, p = 24;
    function sx(x) { return +(p + (x - o.x[0]) / (o.x[1] - o.x[0]) * (W - 2 * p)).toFixed(1); }
    function sy(y) { return +(H - p - (y - o.y[0]) / (o.y[1] - o.y[0]) * (H - 2 * p)).toFixed(1); }
    var ax = 'stroke:var(--muted);stroke-width:1.2', gr = 'stroke:var(--line);stroke-width:1', tx = 'fill:var(--muted);font:11px var(--font-ui)';
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + W + 'px" role="img" aria-label="' + (o.aria || '') + '">';
    (o.xt || []).forEach(function (x) { s += '<line x1="' + sx(x) + '" y1="' + sy(o.y[0]) + '" x2="' + sx(x) + '" y2="' + sy(o.y[1]) + '" style="' + gr + '"/>'; });
    (o.yt || []).forEach(function (y) { s += '<line x1="' + sx(o.x[0]) + '" y1="' + sy(y) + '" x2="' + sx(o.x[1]) + '" y2="' + sy(y) + '" style="' + gr + '"/>'; });
    s += '<line x1="' + sx(o.x[0]) + '" y1="' + sy(0) + '" x2="' + sx(o.x[1]) + '" y2="' + sy(0) + '" style="' + ax + '"/>';
    s += '<line x1="' + sx(0) + '" y1="' + sy(o.y[0]) + '" x2="' + sx(0) + '" y2="' + sy(o.y[1]) + '" style="' + ax + '"/>';
    (o.xt || []).forEach(function (x) { if (x) s += '<text x="' + sx(x) + '" y="' + (sy(0) + 14) + '" text-anchor="middle" style="' + tx + '">' + String(x).replace('-', '−') + '</text>'; });
    (o.yt || []).forEach(function (y) { if (y) s += '<text x="' + (sx(0) - 5) + '" y="' + (sy(y) + 4) + '" text-anchor="end" style="' + tx + '">' + String(y).replace('-', '−') + '</text>'; });
    s += '<text x="' + (sx(0) - 5) + '" y="' + (sy(0) + 14) + '" text-anchor="end" style="' + tx + '">0</text>';
    (o.lines || []).forEach(function (l) { s += '<polyline fill="none" style="stroke:var(--accent);stroke-width:2.4;stroke-linejoin:round;stroke-linecap:round" points="' + l.map(function (q) { return sx(q[0]) + ',' + sy(q[1]); }).join(' ') + '"/>'; });
    (o.dots || []).forEach(function (d) { s += '<circle cx="' + sx(d[0]) + '" cy="' + sy(d[1]) + '" r="3.6" style="stroke:var(--accent);stroke-width:1.8;fill:' + (d[2] ? 'var(--accent)' : 'var(--surface)') + '"/>'; });
    (o.label || []).forEach(function (t) { s += '<text x="' + sx(t[0]) + '" y="' + sy(t[1]) + '" style="fill:var(--accent);font:600 13px var(--font-ui)">' + t[2] + '</text>'; });
    return '<div class="fig">' + s + '</svg></div>';
  }
  function range(a, b) { var o = []; for (var i = a; i <= b; i++) o.push(i); return o; }
  function sample(f, a, b, n) { var o = []; for (var i = 0; i <= n; i++) { var x = a + (b - a) * i / n; o.push([x, f(x)]); } return o; }
  var STAIRS = [-3, -2, -1, 0, 1, 2];
  var FIG = window.MATHS_FIG = {
    plot: plot, wrapQ: wrapQ,
    /* p2018 ex. 1 : f(x) = ⌊x/2⌋ dessinée sur [−6, 6[ (point plein à gauche, creux à droite) */
    stairs: plot({ x: [-6.6, 6.6], y: [-3.6, 3.2], w: 360, h: 220, xt: range(-6, 6), yt: range(-3, 3), lines: STAIRS.map(function (k) { return [[2 * k, k], [2 * k + 2, k]]; }),
      dots: STAIRS.map(function (k) { return [2 * k, k, true]; }).concat(STAIRS.map(function (k) { return [2 * k + 2, k, false]; })), aria: 'graphe en escalier' }),
    /* p2020 ex. 4 : x ↦ (x − 2)² − 1 */
    parab: plot({ x: [-1.4, 5.4], y: [-1.6, 8.4], w: 300, h: 240, xt: range(-1, 5), yt: range(-1, 8), lines: [sample(function (x) { return (x - 2) * (x - 2) - 1; }, -0.85, 4.85, 60)], aria: 'parabole' }),
    /* p2023 LE ex. 3 : x ↦ |x − 1| */
    abs1: plot({ x: [-2.4, 4.4], y: [-2.4, 3.6], w: 320, h: 220, xt: range(-2, 4), yt: range(-2, 3), lines: [[[-2.2, 3.2], [1, 0], [4.2, 3.2]]], dots: [[0, 1, true], [2, 1, true]], label: [[2.7, 2.5, 'g']], aria: 'graphe de |x − 1|' }),
    /* p2022 ex. 2 : x ↦ |x| + 1 */
    absp1: plot({ x: [-3.4, 3.4], y: [-1.4, 4.6], w: 300, h: 220, xt: range(-3, 3), yt: range(-1, 4), lines: [[[-3.2, 4.2], [0, 1], [3.2, 4.2]]], dots: [[-1, 2, true], [1, 2, true]], label: [[1.9, 3.6, 'g']], aria: 'graphe de |x| + 1' }),
    /* p2024 DP ex. 3 : le triangle collé dans l’hexagone */
    hexa: '<div class="fig"><svg viewBox="0 0 200 180" style="max-width:200px" role="img" aria-label="hexagone et triangle"><polygon points="100,8 180,50 180,130 100,172 20,130 20,50" style="fill:none;stroke:var(--ink);stroke-width:2"/><polygon points="112,58 136,118 92,118" style="fill:none;stroke:var(--ink);stroke-width:2"/></svg></div>'
  };

  /* =====================================================================
     Examen DP, octobre 2025 (promo 2030) — Moodle, sans corrigé : réponses recalculées
     ===================================================================== */
  var N25 = 'Sujet publié sur le Moodle (section « Documents de travail »), sans corrigé : correction rédigée sur le modèle des corrigés officiels, chaque résultat recalculé par programme (énumération exhaustive, fractions exactes).';
  /* p2025 OBM ex. 3 : graphes de ln et de cos sur [−π, π] */
  FIG.ln = plot({ x: [-0.6, 4.6], y: [-3.3, 1.9], w: 320, h: 220, xt: [1, 2, 3, 4], yt: [-3, -2, -1, 1], lines: [sample(Math.log, 0.045, 4.4, 90)], label: [[3.5, 1.65, 'ln']], aria: 'graphe de ln' });
  FIG.cosPi = plot({ x: [-3.7, 3.7], y: [-1.5, 1.5], w: 340, h: 200, xt: [-3, -2, -1, 1, 2, 3], yt: [-1, 1], lines: [sample(Math.cos, -Math.PI, Math.PI, 90)], dots: [[-Math.PI, -1, true], [Math.PI, -1, true]], label: [[0.25, 1.25, 'cos']], aria: 'graphe de cos sur [−π, π]' });

  add({ id: 'p2025-dp-ex1', exam: 'p2025-dp', ecue: 'dp', order: 1, src: 'Examen DP 2025 · Ex 1', pts: 7, lvl: 1, time: 20,
    title: r`Cours et TD : formule du crible, binôme de Newton, cardinal de \(\mathcal{P}(E)\)`, topics: ['cardinal', 'binomial'],
    intro: r`<p>Les deux questions sont indépendantes.</p>`,
    questions: [
      r`<b>1.</b> Dans une classe de 40 élèves, 25 parlent couramment l’anglais, 11 parlent couramment l’espagnol et 6 ne parlent ni anglais, ni espagnol.<p>Par la suite, on note \(C\) l’ensemble des élèves de la classe, \(A\) l’ensemble de ceux qui parlent anglais et \(E\) l’ensemble de ceux qui parlent espagnol.</p><p>(a) Traduire les données de l’énoncé à l’aide des 3 ensembles.</p><p>(b) Combien y a-t-il d’élèves qui parlent couramment à la fois l’anglais et l’espagnol ? On vous demande de justifier votre résultat à l’aide de formule(s) du cours que vous rappellerez.</p>`,
      r`<b>2.</b> Autour du binôme de Newton<p>(a) Énoncer la formule du binôme de Newton.</p><p>(b) Application : soit \(E\) un ensemble à \(n\) éléments.</p><p>i. Combien y a-t-il de sous-ensembles de \(E\) à \(k\) éléments ?</p><p>ii. En utilisant les questions précédentes (2.(a) et 2.(b)(i)), calculer le cardinal de \(\mathcal{P}(E)\).</p>`],
    hints: [
      r`« Ni anglais, ni espagnol » : ce sont les élèves de \(C\) qui ne sont pas dans \(A \cup E\). Commence par \(\card(A \cup E)\).`,
      r`Deux formules du cours : \(\card(Y \setminus X) = \card(Y) - \card(X)\) si \(X \subset Y\), et la formule du crible \(\card(A \cup E) = \card(A) + \card(E) - \card(A \cap E)\).`,
      r`2.(b)(ii) : classe les parties de \(E\) selon leur nombre d’éléments \(k\), puis applique le binôme avec \(x = y = 1\).`],
    solution: [
      { t: 'Question 1(a) : traduire', html: M(r`<p>\(A \subset C\), \(E \subset C\), \(\card(C) = 40\), \(\card(A) = 25\), \(\card(E) = 11\) et \(\card\big(C \setminus (A \cup E)\big) = 6\) (les élèves qui ne parlent ni anglais ni espagnol forment le complémentaire de \(A \cup E\) dans \(C\)).</p>`) },
      { t: 'Question 1(b) : complémentaire, puis crible', html: M(r`<p>On rappelle deux formules du cours, pour des ensembles finis :</p><p>• si \(X \subset Y\), alors \(Y = X \sqcup (Y \setminus X)\) (union disjointe), donc \(\card(Y \setminus X) = \card(Y) - \card(X)\) ;</p><p>• formule du crible : \(\card(A \cup E) = \card(A) + \card(E) - \card(A \cap E)\).</p><p>Comme \(A \cup E \subset C\), la première formule donne \(\card\big(C \setminus (A \cup E)\big) = \card(C) - \card(A \cup E)\), d’où \(\card(A \cup E) = 40 - 6 = 34\).</p><p>Par la formule du crible, \(\card(A \cap E) = \card(A) + \card(E) - \card(A \cup E) = 25 + 11 - 34 = 2\).</p><p>Ainsi, 2 élèves parlent couramment l’anglais et l’espagnol.</p>`) +
        r`<p>Contrôle : 23 élèves parlent seulement anglais, 9 seulement espagnol, 2 les deux et 6 aucune des deux langues : \(23 + 9 + 2 + 6 = 40\). C’est l’exercice 2.13 du séminaire.</p>` },
      { t: 'Question 2(a) : la formule du binôme', html: M(r`<p>Pour tous réels (ou complexes) \(x\) et \(y\) et pour tout \(n \in \N\) :</p><div class="fm">\[(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}.\]</div>`) },
      { t: 'Question 2(b) : le cardinal de P(E)', html: M(r`<p>i. Pour \(k \in \ent{0}{n}\), le nombre de sous-ensembles de \(E\) à \(k\) éléments est \(\dbinom{n}{k} = \dfrac{n!}{k!\,(n-k)!}\).</p><p>ii. Pour \(k \in \ent{0}{n}\), notons \(\mathcal{P}_k(E)\) l’ensemble des parties de \(E\) à \(k\) éléments. Toute partie de \(E\) a un cardinal \(k \in \ent{0}{n}\), et un seul : les ensembles \(\mathcal{P}_0(E), \ldots, \mathcal{P}_n(E)\) sont deux à deux disjoints et leur union est \(\mathcal{P}(E)\). Donc, d’après i,</p><div class="fm">\[\card(\mathcal{P}(E)) = \sum_{k=0}^{n} \card(\mathcal{P}_k(E)) = \sum_{k=0}^{n} \binom{n}{k} = \sum_{k=0}^{n} \binom{n}{k} 1^k\, 1^{n-k} = (1 + 1)^n = 2^n\]</div><p>par la formule du binôme appliquée à \(x = y = 1\).</p>`) +
        r`<p>Exemple : \(E = \{2, 3, 4\}\) a \(1 + 3 + 3 + 1 = 8 = 2^3\) parties (examen OBM 2025, exercice 2).</p>` }],
    answer: r`<ul><li>1(a) \(\card(C) = 40\), \(\card(A) = 25\), \(\card(E) = 11\), \(\card(C \setminus (A \cup E)) = 6\).</li><li>1(b) \(\card(A \cup E) = 40 - 6 = 34\), puis \(\card(A \cap E) = 25 + 11 - 34 = 2\) élèves.</li><li>2(a) \((x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}\).</li><li>2(b) i. \(\binom{n}{k}\) ; ii. \(\card(\mathcal{P}(E)) = \sum_{k=0}^{n} \binom{n}{k} = (1 + 1)^n = 2^n\).</li></ul>`,
    traps: [
      r`Oublier de retirer \(\card(A \cap E)\) : \(25 + 11 = 36\) dépasse les 34 élèves qui parlent au moins une langue.`,
      r`Retirer les 6 élèves au mauvais endroit : \(25 + 11 - 6 = 30\) n’a pas de sens ; les 6 élèves sont hors de \(A \cup E\).`,
      r`2.(b)(ii) : la somme commence à \(k = 0\) (la partie vide) et va jusqu’à \(k = n\) (\(E\) lui-même).`,
      r`« Rappeler les formules » : les écrire avant de les utiliser, avec leurs hypothèses (\(X \subset Y\) ; ensembles finis).`],
    grading: '7 points pour l’exercice ; le sujet ne détaille pas les questions. « La rigueur de votre rédaction sera prise en compte dans la note. »',
    official: false, note: N25 + ' La question 1 est l’exercice 2.13 du séminaire, la question 2 l’exercice 1.6 du TD 1.', near: ['p2023-dp-ex1'],
    chk: { union: '34', inter: '2', pe: '2^n' } });

  add({ id: 'p2025-dp-ex2', exam: 'p2025-dp', ecue: 'dp', order: 2, src: 'Examen DP 2025 · Ex 2', pts: 7, lvl: 1, time: 15,
    title: 'Les mots réponses d’un QCM', topics: ['denombrement'],
    intro: r`<p>Un QCM comporte 5 questions. Pour chacune des 5 questions, il y a 6 propositions de réponses : \(A\), \(B\), \(C\), \(D\), \(E\) ou \(F\). Pour chaque question, il n’y a qu’une seule réponse correcte.</p><p>On suppose qu’un candidat passant ce qcm répond à toutes les questions posées en écrivant un « mot réponse » de 5 lettres prises parmi \(A\), \(B\), \(C\), \(D\), \(E\) et \(F\).</p><p>Par exemple, le mot réponse « BBADC » signifie que le candidat a répondu \(B\) aux questions 1 et 2, \(A\) à la question 3, \(D\) à la question 4 et \(C\) à la question 5.</p><p>Sauf mention contraire dans la question, le mot réponse peut avoir plusieurs fois la même lettre.</p>`,
    questions: [
      r`<b>1.</b> Combien y a-t-il de mots réponses possibles ? Justifier brièvement.`,
      r`<b>2.</b> Combien y a-t-il de mots réponses n’ayant que des lettres distinctes ? Justifier brièvement.`,
      r`<b>3.</b> Combien de mots réponses possibles ne contenant qu’une seule réponse correcte y a-t-il ? Justifier brièvement.`,
      r`<b>4.</b> Combien de mots réponses avec au moins une réponse correcte y a-t-il ? Justifier brièvement.`,
      r`<b>5.</b> Combien de mots réponses commençant par \(E\), sans \(A\) et composés de lettres distinctes y a t-il ? Justifier brièvement. <u>Faire le calcul jusqu’au bout.</u>`,
      r`<b>6.</b> Il y a eu des fuites. On sait que le mot réponse contient un \(B\), deux \(C\) et deux \(D\). Combien y a-t-il de mots réponses possibles ? Justifier brièvement. <u>Faire le calcul jusqu’au bout.</u>`],
    hints: [
      r`Un mot réponse est une 5-liste de lettres de \(\{A, B, C, D, E, F\}\) : l’ordre compte (la position, c’est le numéro de la question).`,
      r`« Une seule réponse correcte » : choisis la question bien répondue, puis une mauvaise lettre (5 choix) à chacune des 4 autres. « Au moins une » : passe par le contraire, « aucune ».`,
      r`Question 6 : choisis les places des deux \(C\), puis celles des deux \(D\) ; le \(B\) prend la dernière place.`],
    solution: [
      { t: 'Questions 1 et 2 : listes, arrangements', html: M(r`<p>1. Un mot réponse est une 5-liste d’éléments de \(\{A, B, C, D, E, F\}\), qui a 6 éléments : chaque position a 6 choix, indépendamment des autres. Il y a \(6^5 = 7\,776\) mots réponses.</p><p>2. Les lettres sont distinctes et l’ordre compte : c’est un arrangement de 5 lettres parmi 6. Il y a \(A_6^5 = \dfrac{6!}{1!} = 6 \times 5 \times 4 \times 3 \times 2 = 720\) mots réponses.</p>`) },
      { t: 'Questions 3 et 4 : une seule, au moins une réponse correcte', html: M(r`<p>3. On choisit la question bien répondue (5 choix) ; sa lettre est imposée (la bonne réponse, 1 choix) ; à chacune des 4 autres questions, on écrit l’une des 5 mauvaises lettres (\(5^4\) choix). Par le principe multiplicatif, il y a \(5 \times 1 \times 5^4 = 5^5 = 3\,125\) mots réponses.</p><p>4. On passe par le complémentaire. Un mot sans aucune réponse correcte a, à chaque question, l’une des 5 mauvaises lettres : il y en a \(5^5 = 3\,125\). Le nombre de mots avec au moins une réponse correcte est donc \(6^5 - 5^5 = 7\,776 - 3\,125 = 4\,651\).</p>`) +
        r`<p>Que l’effectif de la question 3 soit égal à \(5^5\) est une coïncidence : \(\binom{5}{1} \times 5^4 = 5^5\).</p>` },
      { t: 'Question 5 : commence par E, sans A, lettres distinctes', html: M(r`<p>La première lettre est \(E\) (1 choix). Les 4 lettres suivantes sont distinctes, différentes de \(E\) (lettres distinctes) et de \(A\) : elles sont prises dans \(\{B, C, D, F\}\), qui a 4 éléments. On range ces 4 lettres dans les 4 places restantes : \(4! = 24\) façons. Il y a 24 mots réponses.</p>`) },
      { t: 'Question 6 : un B, deux C, deux D', html: M(r`<p>On choisit les 2 places des \(C\) parmi les 5 places (\(\binom{5}{2} = 10\) façons), puis les 2 places des \(D\) parmi les 3 places restantes (\(\binom{3}{2} = 3\) façons) ; le \(B\) occupe la dernière place. Il y a \(10 \times 3 = 30\) mots réponses.</p>`) +
        r`<p>Autre écriture : \(\dfrac{5!}{1!\,2!\,2!} = \dfrac{120}{4} = 30\) (permutations des 5 lettres, divisées par les échanges des deux \(C\) et des deux \(D\)).</p>` }],
    answer: r`<ul><li>1. \(6^5 = 7\,776\)</li><li>2. \(6 \times 5 \times 4 \times 3 \times 2 = 720\)</li><li>3. \(5 \times 5^4 = 3\,125\)</li><li>4. \(6^5 - 5^5 = 4\,651\)</li><li>5. \(4! = 24\)</li><li>6. \(\frac{5!}{2!\,2!} = 30\)</li></ul>`,
    traps: [
      r`Question 2 : \(5! = 120\) range 5 lettres données ; ici on choisit 5 lettres parmi 6, c’est \(A_6^5 = 720\).`,
      r`Question 3 : \(5^4\) seul oublie de choisir la question bien répondue (facteur 5).`,
      r`Question 4 : \(5 \times 6^4\) (« une bonne réponse quelque part, le reste libre ») compte plusieurs fois les mots qui ont plusieurs bonnes réponses.`,
      r`Question 5 : \(5 \times 4 \times 3 \times 2\) oublie que \(A\) est interdit : il ne reste que 4 lettres pour 4 places.`,
      r`Question 6 : \(5! = 120\) sans diviser par les échanges des deux \(C\) et des deux \(D\).`],
    grading: '7 points pour l’exercice ; le sujet ne détaille pas les questions. Questions 5 et 6 : « Faire le calcul jusqu’au bout » (un entier, pas une formule).',
    official: false, note: N25 + ' Exercice repris au TD 1 (exercice 2.11, « extrait de l’examen 2025 »).', near: ['p2024-dp-ex2', 'p2020-ex7'],
    chk: { q1: '7776', q2: '720', q3: '3125', q4: '4651', q5: '24', q6: '30' } });

  add({ id: 'p2025-dp-ex3', exam: 'p2025-dp', ecue: 'dp', order: 3, src: 'Examen DP 2025 · Ex 3', pts: 4.5, lvl: 2, time: 15,
    title: r`Équipes avec capitaine : \(k\binom{n}{k} = n\binom{n-1}{k-1}\)`, topics: ['binomial', 'denombrement'],
    intro: r`<p>Dans cet exercice, \(n\) est un entier supérieur à 2 et \(k\) est un entier naturel inférieur à \(n\).</p><p>Ousmane est blessé. Pour passer le temps, il imagine un ensemble de \(n\) joueurs. Il décide alors de compter le nombre d’équipes possibles composées de \(k\) joueurs avec un capitaine parmi eux.</p><p>Pour cela, il va compter ce nombre de deux façons différentes.</p><p>• Première façon : Ousmane choisit d’abord les \(k\) joueurs puis il choisit le capitaine parmi eux.</p><p>• Deuxième façon : Ousmane choisit d’abord le capitaine puis les autres joueurs.</p>`,
    questions: [
      r`<b>1.</b> Quel est le nombre \(N_1\) d’équipes quand Ousmane utilise la première façon ? Justifier brièvement.`,
      r`<b>2.</b> Quel est le nombre \(N_2\) d’équipes quand Ousmane utilise la deuxième façon ? Justifier brièvement.`,
      r`<b>3.</b> Vous venez de démontrer une formule. Laquelle ?`,
      r`<b>4.</b> Redémontrer cette formule par le calcul.`],
    hints: [
      r`Une équipe est un ensemble de \(k\) joueurs (l’ordre ne compte pas) dont un seul est distingué : le capitaine.`,
      r`Deuxième façon : une fois le capitaine choisi, il reste \(k - 1\) joueurs à choisir parmi les \(n - 1\) autres.`,
      r`Question 4 : écris les deux membres avec des factorielles et simplifie \(\dfrac{k}{k!} = \dfrac{1}{(k-1)!}\) (il faut \(k \geq 1\)).`],
    solution: [
      { t: 'Questions 1 à 3 : compter de deux façons', html: M(r`<p>Soit \(k \in \ent{1}{n}\) (une équipe avec un capitaine a au moins un joueur).</p><p>1. Première façon : on choisit les \(k\) joueurs parmi les \(n\), sans ordre : \(\binom{n}{k}\) façons ; puis le capitaine parmi ces \(k\) joueurs : \(k\) façons. Donc \(N_1 = k\dbinom{n}{k}\).</p><p>2. Deuxième façon : on choisit le capitaine parmi les \(n\) joueurs : \(n\) façons ; puis les \(k - 1\) autres joueurs parmi les \(n - 1\) joueurs restants : \(\binom{n-1}{k-1}\) façons. Donc \(N_2 = n\dbinom{n-1}{k-1}\).</p><p>3. On a compté le même ensemble (les équipes de \(k\) joueurs avec un capitaine) de deux façons, donc \(N_1 = N_2\) : pour \(1 \leq k \leq n\),</p><div class="fm">\[k\binom{n}{k} = n\binom{n-1}{k-1}.\]</div>`) +
        r`<p>Exemple : \(n = 5\), \(k = 3\) : \(3 \times \binom{5}{3} = 3 \times 10 = 30\) et \(5 \times \binom{4}{2} = 5 \times 6 = 30\).</p>` },
      { t: 'Question 4 : par le calcul', html: M(r`<p>Soient \(n \in \N^*\) et \(k \in \ent{1}{n}\). Par définition des coefficients binomiaux :</p><div class="fm">\[k\binom{n}{k} = k \times \frac{n!}{k!\,(n-k)!} = \frac{n!}{(k-1)!\,(n-k)!}\]</div><p>car \(k! = k \times (k-1)!\). D’autre part, comme \((n-1) - (k-1) = n - k\) :</p><div class="fm">\[n\binom{n-1}{k-1} = n \times \frac{(n-1)!}{(k-1)!\,(n-k)!} = \frac{n!}{(k-1)!\,(n-k)!}\]</div><p>car \(n \times (n-1)! = n!\). Les deux membres sont égaux.</p>`) +
        r`<p>Le cas \(k = 0\), permis par l’énoncé (« entier naturel inférieur à \(n\) »), n’a pas de sens ici : aucune équipe sans joueur n’a de capitaine. La formule reste vraie si l’on pose \(\binom{n-1}{-1} = 0\) (\(0 = 0\)). Vérifié par programme pour \(n \leq 15\), et par énumération des équipes pour \(n \leq 7\).</p>` }],
    answer: r`<ul><li>1. \(N_1 = k\binom{n}{k}\).</li><li>2. \(N_2 = n\binom{n-1}{k-1}\).</li><li>3. \(k\binom{n}{k} = n\binom{n-1}{k-1}\) pour \(1 \leq k \leq n\).</li><li>4. Les deux membres valent \(\dfrac{n!}{(k-1)!\,(n-k)!}\).</li></ul>`,
    traps: [
      r`Deuxième façon : choisir les autres joueurs parmi \(n\) au lieu de \(n - 1\) (le capitaine est déjà pris), ou en choisir \(k\) au lieu de \(k - 1\).`,
      r`Première façon : multiplier par \(k!\) (tous les ordres) au lieu de \(k\) : seul le capitaine est distingué.`,
      r`« Justifier brièvement » : dire ce que l’on choisit, parmi quoi, et si l’ordre compte.`],
    grading: '4,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: false, note: N25 + ' Même architecture que l’exercice 3 de l’examen DP 2024 (double dénombrement, puis preuve par le calcul).', near: ['p2024-dp-ex3'],
    chk: { ex: '30' } });

  add({ id: 'p2025-dp-ex4', exam: 'p2025-dp', ecue: 'dp', order: 4, src: 'Examen DP 2025 · Ex 4', pts: 4, lvl: 1, time: 10,
    title: 'Restaurant : dessert et formule « à la carte »', topics: ['conditionnelles', 'bayes'],
    intro: r`<p>Au restaurant « Je donne tout », on constate que 15 % des clients mangent « à la carte » et 85 % choisissent un menu. Parmi les clients qui mangent « à la carte », 30 % prennent un dessert, contre 45 % des clients qui choisissent un menu.</p><p>On note \(C\) l’événement « Le client mange à la carte », \(M\) : « Le client choisit le menu » et \(D\) : « Le client prend un dessert ».</p><p><b>N.B. : vous justifierez vos résultats à l’aide d’une formule du cours.</b></p>`,
    questions: [
      r`<b>1.</b> On choisit au hasard un client. Quelle est la probabilité que ce client ait mangé un dessert ?<p>Vous donnerez votre résultat sous forme de pourcentage ou de fraction simplifiée</p>`,
      r`<b>2.</b> On choisit au hasard un client qui a pris un dessert. Quelle est la probabilité qu’il ait choisi la formule « à la carte »`],
    hints: [
      r`« Parmi les clients qui mangent à la carte, 30 % » : c’est \(\P(D \mid C)\), pas \(\P(D \cap C)\).`,
      r`\(\{C, M\}\) est une partition de \(\Omega\) : chaque client mange à la carte ou choisit un menu, pas les deux. Formule des probabilités totales.`,
      r`Question 2 : on connaît \(D\), on cherche \(\P(C \mid D)\) : formule de Bayes.`],
    solution: [
      { t: 'Traduire l’énoncé', html: M(r`<p>L’énoncé donne : \(\P(C) = 0{,}15 = \dfrac{3}{20}\), \(\P(M) = 0{,}85 = \dfrac{17}{20}\), \(\P(D \mid C) = 0{,}30 = \dfrac{3}{10}\) et \(\P(D \mid M) = 0{,}45 = \dfrac{9}{20}\).</p>`) +
        T('tree', { first: [{ n: 'C', p: '3/20' }, { n: 'M' }], second: { n: 'D', nb: '\\overline{D}', p: ['3/10', '9/20'] }, edit: false }) },
      { t: 'Question 1 : probabilités totales', html: M(r`<p>Les événements \(C\) et \(M\) sont incompatibles et \(C \cup M = \Omega\) : \(\{C, M\}\) est une partition de \(\Omega\) (et \(\P(C) \neq 0\), \(\P(M) \neq 0\)). D’après la formule des probabilités totales :</p><div class="fm">\[\P(D) = \P(D \mid C)\,\P(C) + \P(D \mid M)\,\P(M) = 0{,}30 \times 0{,}15 + 0{,}45 \times 0{,}85 = 0{,}045 + 0{,}3825 = 0{,}4275.\]</div><p>La probabilité que le client ait pris un dessert est \(42{,}75\,\%\), soit \(\dfrac{171}{400}\).</p>`) },
      { t: 'Question 2 : Bayes', html: M(r`<p>On cherche \(\P(C \mid D)\). Comme \(\P(D) \neq 0\), d’après la formule de Bayes :</p><div class="fm">\[\P(C \mid D) = \frac{\P(D \mid C)\,\P(C)}{\P(D)} = \frac{0{,}045}{0{,}4275} = \frac{450}{4\,275} = \frac{2}{19}.\]</div><p>La probabilité qu’il ait mangé à la carte est \(\dfrac{2}{19} \approx 10{,}5\,\%\).</p>`) }],
    answer: r`<ul><li>1. \(\P(D) = 0{,}4275 = 42{,}75\,\% = \frac{171}{400}\).</li><li>2. \(\P(C \mid D) = \frac{2}{19} \approx 10{,}5\,\%\).</li></ul>`,
    traps: [
      r`Écrire \(\P(D \cap C) = 0{,}30\) : 30 % est une proportion parmi les clients « à la carte », c’est \(\P(D \mid C)\).`,
      r`Faire la moyenne \(\frac{0{,}30 + 0{,}45}{2} = 37{,}5\,\%\) : il faut pondérer par \(\P(C)\) et \(\P(M)\).`,
      r`Question 2 : répondre \(\P(D \mid C) = 0{,}30\) (l’autre sens) ; on sait que le client a pris un dessert, on divise par \(\P(D)\).`,
      r`« À l’aide d’une formule du cours » : nommer la formule des probabilités totales (avec la partition \(\{C, M\}\)) et la formule de Bayes.`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions. Résultats justifiés par une formule du cours.',
    official: false, note: N25 + ' Même exercice, avec d’autres nombres, qu’aux examens DP 2023 et 2024 (exercice 4), sans la question de seuil.', near: ['p2024-dp-ex4', 'p2023-dp-ex4'],
    chk: { pd: '171/400', bayes: '2/19' } });

  add({ id: 'p2025-dp-ex5', exam: 'p2025-dp', ecue: 'dp', order: 5, src: 'Examen DP 2025 · Ex 5', pts: 5, lvl: 2, time: 15,
    title: r`Cours : démontrer \(\E(aX + b) = a\E(X) + b\) et \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\)`, topics: ['esperance', 'demonstrations'],
    intro: r`<p>Soient \(X\) une variable aléatoire finie telle que \(X(\Omega) = \{x_1, x_2, \cdots, x_n\}\) et \((a, b) \in \R^2\).</p>`,
    questions: [
      r`<b>1.</b> Rappeler les formules donnant l’espérance et la variance de \(X\) respectivement notées : \(\E(X)\) et \(\mathrm{Var}(X)\).`,
      r`<b>2.</b> Exprimer \(\E(aX + b)\) en fonction de \(a\), \(b\) et \(\E(X)\). Démontrer cette formule.`,
      r`<b>3.</b> Exprimer \(\mathrm{Var}(aX + b)\) en fonction de \(a\), \(b\) et \(\mathrm{Var}(X)\). Démontrer cette formule.`],
    hints: [
      r`Énoncé identique à l’exercice 5 de l’examen DP 2024 : ce sont deux démonstrations du document « Démonstrations à connaître ».`,
      r`Pour \(\E(aX + b)\) : \(aX + b = f(X)\) avec \(f : x \mapsto ax + b\) ; théorème de transfert, puis coupe la somme en deux.`,
      r`Pour la variance : écris la définition, puis remarque que \((aX + b) - \E(aX + b) = a\big(X - \E(X)\big)\).`],
    solution: [
      { t: 'Question 1 : les définitions', html: M(r`<div class="fm">\[\E(X) = \sum_{i=1}^{n} x_i\,\P(X = x_i) \qquad \mathrm{Var}(X) = \E\big((X - \E(X))^2\big) = \sum_{i=1}^{n} \big(x_i - \E(X)\big)^2\,\P(X = x_i)\]</div>`) },
      { t: 'Question 2 : espérance de aX + b', html: r`<p>Formule : \(\E(aX + b) = a\E(X) + b\).</p>` +
        M(r`<p>Notons \(Y = aX + b\). On a \(Y = f(X)\), où \(f\) est la fonction \(x \mapsto ax + b\). D’après le théorème de transfert (admis dans le cours),</p><div class="fm">\[\E(Y) = \sum_{i=1}^{n} f(x_i)\,\P(X = x_i) = \sum_{i=1}^{n} (a x_i + b)\,\P(X = x_i).\]</div><p>Or, pour tout \(i \in \ent{1}{n}\), \((a x_i + b)\,\P(X = x_i) = a\,x_i\,\P(X = x_i) + b\,\P(X = x_i)\). En coupant la somme en deux, puis en factorisant \(a\) dans la première et \(b\) dans la seconde :</p><div class="fm">\[\E(Y) = a \sum_{i=1}^{n} x_i\,\P(X = x_i) + b \sum_{i=1}^{n} \P(X = x_i).\]</div><p>La première somme vaut \(\E(X)\). La seconde vaut 1, car les événements \((X = x_i)\), \(i \in \ent{1}{n}\), forment un système complet d’événements. Finalement, \(\E(aX + b) = a\E(X) + b\).</p>`) },
      { t: 'Question 3 : variance de aX + b', html: r`<p>Formule : \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\) ; elle ne dépend pas de \(b\).</p>` +
        M(r`<p>Par définition, \(\mathrm{Var}(aX + b) = \E\Big(\big((aX + b) - \E(aX + b)\big)^2\Big)\). Or, d’après la question 2, \(\E(aX + b) = a\E(X) + b\), donc</p><div class="fm">\[(aX + b) - \E(aX + b) = aX + b - a\E(X) - b = a\big(X - \E(X)\big).\]</div><p>D’où \(\mathrm{Var}(aX + b) = \E\Big(a^2\big(X - \E(X)\big)^2\Big)\). En appliquant la question 2 à la variable \(\big(X - \E(X)\big)^2\), avec le coefficient \(a^2\) et la constante 0, on obtient \(\mathrm{Var}(aX + b) = a^2\,\E\Big(\big(X - \E(X)\big)^2\Big)\). L’espérance obtenue est la variance de \(X\) : \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\).</p>`) +
        r`<p>Application : à l’exercice 6, \(\mathrm{Var}(2X + 1) = 4\,\mathrm{Var}(X)\).</p>` }],
    answer: r`<ul><li>1. \(\E(X) = \sum_{i=1}^{n} x_i \P(X = x_i)\) ; \(\mathrm{Var}(X) = \sum_{i=1}^{n} (x_i - \E(X))^2 \P(X = x_i)\).</li><li>2. \(\E(aX + b) = a\E(X) + b\), par transfert et linéarité de la somme.</li><li>3. \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\), qui ne dépend pas de \(b\).</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(aX + b) \neq a\,\mathrm{Var}(X) + b\) : le décalage \(b\) ne change pas la dispersion et \(a\) passe au carré.`,
      r`Oublier de dire pourquoi \(\sum_i \P(X = x_i) = 1\).`,
      r`Écrire la formule de Koenig-Huygens comme définition de la variance : la définition est \(\E\big((X - \E(X))^2\big)\).`,
      r`« Exprimer en fonction de \(a\), \(b\)… » : donner la formule d’abord, puis la démontrer.`],
    grading: '5 points pour l’exercice ; le sujet ne détaille pas les questions. Les deux preuves sont celles du document « Démonstrations à connaître ».',
    official: false, note: N25 + ' Énoncé mot pour mot celui de l’exercice 5 de l’examen DP 2024 : la démonstration de \(\E(aX + b)\) et \(\mathrm{Var}(aX + b)\) est tombée deux années de suite.', near: ['p2024-dp-ex5', 'p2023-dp-ex5', 'p2022-ex7'],
    chk: {} });

  add({ id: 'p2025-dp-ex6', exam: 'p2025-dp', ecue: 'dp', order: 6, src: 'Examen DP 2025 · Ex 6', pts: 12.5, lvl: 2, time: 30,
    title: r`Dé et urne : loi, \(Y = 2X + 1\), Bernoulli, binomiale sur 8 tirages`, topics: ['variables', 'esperance', 'lois'],
    intro: r`<p>Les parties A et B sont indépendantes.</p>`,
    questions: [
      r`<b>Partie A.</b> On lance un dé classique et équilibré. Si le résultat est 1, 3 ou 4, on ne marque rien. Si le résultat est 2 ou 6, on marque 1 point. Si le résultat est 5, on gagne 2 points. On note \(X\) la variable aléatoire égale au nombre de points obtenus lors d’un lancer.<p>1. Donner la loi de \(X\).</p><p>2. Calculer l’espérance et la variance de \(X\).</p><p>3. Soit \(Y = 2X + 1\). Quelle est la loi de \(Y\), son espérance et sa variance ?</p>`,
      r`<b>Partie B.</b> Une urne contient \(n\) boules blanches et 3 boules rouges, indiscernables au toucher. On tire au hasard une boule de l’urne, on note sa couleur puis on la replace dans l’urne.<p>1. Déterminer \(n\) pour que la probabilité d’avoir une boule rouge soit égale à \(\dfrac{3}{11}\).</p><p>2. On suppose \(n = 6\). Si la boule tirée est blanche, on marque 1 point, sinon on marque aucun point. On note \(Y\) la variable aléatoire égale au nombre de points obtenu sur ce tirage.</p><p>(a) Donner la loi de \(Y\) son espérance et sa variance.</p><p>(b) On effectue 8 tirages successifs, dans les mêmes conditions. Ces tirages sont supposés indépendants. Pour \(k \in \ent{1}{8}\), on note \(Y_k\) le nombre de points obtenus au \(k\)-ième tirage.</p><p>On note \(Z = Y_1 + Y_2 + \ldots + Y_8\).</p><p>i. Donner \(Z(\Omega)\) ainsi que \(\P(Z = i)\) pour tout \(i \in Z(\Omega)\). Vous justifierez vos résultats.</p><p>ii. Trouver \(\P(Z \leq 7)\). Simplifier le plus possible votre résultat.</p>`],
    hints: [
      r`Partie A : les 6 faces sont équiprobables ; \(\P(X = 0) = \P(\{1, 3, 4\})\). La loi, c’est \(X(\Omega)\) et toutes les probabilités.`,
      r`\(Y = 2X + 1\) : chaque valeur \(x\) de \(X\) donne la valeur \(2x + 1\) de \(Y\), avec la même probabilité. Pour \(\E(Y)\) et \(\mathrm{Var}(Y)\), utilise l’exercice 5.`,
      r`Partie B : \(Z\) est la somme de 8 variables de Bernoulli indépendantes de même paramètre. Pour \(\P(Z \leq 7)\), passe par l’événement contraire \((Z = 8)\).`],
    solution: [
      { t: 'Partie A, question 1 : loi de X', html: M(r`<p>Le dé est équilibré : les 6 issues de \(\Omega = \ent{1}{6}\) sont équiprobables. \(X(\Omega) = \{0, 1, 2\}\) et</p><div class="fm">\[\P(X = 0) = \P(\{1, 3, 4\}) = \frac{3}{6} = \frac{1}{2}, \quad \P(X = 1) = \P(\{2, 6\}) = \frac{2}{6} = \frac{1}{3}, \quad \P(X = 2) = \P(\{5\}) = \frac{1}{6}.\]</div><p>Contrôle : \(\dfrac{1}{2} + \dfrac{1}{3} + \dfrac{1}{6} = 1\).</p>`) +
        T('law', { x: [0, 1, 2], p: ['1/2', '1/3', '1/6'], name: 'X', edit: false }) },
      { t: 'Partie A, question 2 : espérance et variance de X', html: M(r`<div class="fm">\[\E(X) = 0 \times \frac{1}{2} + 1 \times \frac{1}{3} + 2 \times \frac{1}{6} = \frac{1}{3} + \frac{1}{3} = \frac{2}{3}.\]</div><div class="fm">\[\E(X^2) = 0^2 \times \frac{1}{2} + 1^2 \times \frac{1}{3} + 2^2 \times \frac{1}{6} = \frac{1}{3} + \frac{2}{3} = 1.\]</div><p>Par la formule de Koenig-Huygens, \(\mathrm{Var}(X) = \E(X^2) - \big(\E(X)\big)^2 = 1 - \dfrac{4}{9} = \dfrac{5}{9}\).</p>`) },
      { t: 'Partie A, question 3 : Y = 2X + 1', html: M(r`<p>\(Y(\Omega) = \{2 \times 0 + 1,\ 2 \times 1 + 1,\ 2 \times 2 + 1\} = \{1, 3, 5\}\). Comme \(x \mapsto 2x + 1\) est injective, \((Y = 2x + 1) = (X = x)\) pour chaque valeur \(x\) de \(X\) :</p><div class="fm">\[\P(Y = 1) = \P(X = 0) = \frac{1}{2}, \quad \P(Y = 3) = \P(X = 1) = \frac{1}{3}, \quad \P(Y = 5) = \P(X = 2) = \frac{1}{6}.\]</div><p>D’après l’exercice 5 (avec \(a = 2\) et \(b = 1\)) : \(\E(Y) = 2\E(X) + 1 = \dfrac{4}{3} + 1 = \dfrac{7}{3}\) et \(\mathrm{Var}(Y) = 2^2\,\mathrm{Var}(X) = 4 \times \dfrac{5}{9} = \dfrac{20}{9}\).</p>`) +
        r`<p>Vérification directe : \(\E(Y) = \frac{1}{2} + \frac{3}{3} + \frac{5}{6} = \frac{7}{3}\) et \(\E(Y^2) = \frac{1}{2} + \frac{9}{3} + \frac{25}{6} = \frac{23}{3}\), donc \(\mathrm{Var}(Y) = \frac{23}{3} - \frac{49}{9} = \frac{20}{9}\).</p>` },
      { t: 'Partie B, question 1 : le nombre de boules blanches', html: M(r`<p>L’urne contient \(n + 3\) boules indiscernables : on est en situation d’équiprobabilité, et la probabilité d’avoir une boule rouge est \(\dfrac{3}{n + 3}\). Pour \(n \in \N\) :</p><div class="fm">\[\frac{3}{n + 3} = \frac{3}{11} \iff n + 3 = 11 \iff n = 8.\]</div><p>Il faut 8 boules blanches.</p>`) },
      { t: 'Partie B, question 2(a) : loi de Y', html: M(r`<p>Avec \(n = 6\), l’urne contient 9 boules, dont 6 blanches. \(Y(\Omega) = \{0, 1\}\), \(\P(Y = 1) = \dfrac{6}{9} = \dfrac{2}{3}\) et \(\P(Y = 0) = \dfrac{3}{9} = \dfrac{1}{3}\) : \(Y\) suit la loi de Bernoulli de paramètre \(\dfrac{2}{3}\).</p><p>\(\E(Y) = 0 \times \dfrac{1}{3} + 1 \times \dfrac{2}{3} = \dfrac{2}{3}\) ; \(\E(Y^2) = \dfrac{2}{3}\), donc \(\mathrm{Var}(Y) = \dfrac{2}{3} - \dfrac{4}{9} = \dfrac{2}{9}\) (c’est \(p(1 - p)\)).</p>`) },
      { t: 'Partie B, question 2(b) : la binomiale', html: M(r`<p>i. Chaque \(Y_k\) suit la loi de Bernoulli de paramètre \(\dfrac{2}{3}\) (même urne, mêmes conditions, question 2(a)), et les \(Y_k\) sont indépendantes car les tirages le sont. \(Z = Y_1 + \cdots + Y_8\) est donc la somme de 8 variables de Bernoulli indépendantes de même paramètre \(\dfrac{2}{3}\) : \(Z\) suit la loi binomiale \(\mathcal{B}\left(8, \dfrac{2}{3}\right)\). Ainsi \(Z(\Omega) = \ent{0}{8}\) et</p><div class="fm">\[\forall i \in \ent{0}{8}, \quad \P(Z = i) = \binom{8}{i} \left(\frac{2}{3}\right)^i \left(\frac{1}{3}\right)^{8-i} = \binom{8}{i} \frac{2^i}{3^8}.\]</div><p>ii. L’événement contraire de \((Z \leq 7)\) est \((Z = 8)\). Donc</p><div class="fm">\[\P(Z \leq 7) = 1 - \P(Z = 8) = 1 - \binom{8}{8} \left(\frac{2}{3}\right)^8 \left(\frac{1}{3}\right)^0 = 1 - \frac{256}{6\,561} = \frac{6\,305}{6\,561}.\]</div>`) +
        r`<p>\(\P(Z \leq 7) \approx 0{,}961\). En sommant \(\P(Z = 0) + \cdots + \P(Z = 7)\), on trouve la même valeur, avec huit termes à calculer.</p>` +
        T('law', { law: 'binom', n: 8, p: '2/3', name: 'Z', edit: false }) }],
    answer: r`<ul><li>A1. \(X(\Omega) = \{0, 1, 2\}\), probabilités \(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\).</li><li>A2. \(\E(X) = \frac{2}{3}\), \(\mathrm{Var}(X) = \frac{5}{9}\).</li><li>A3. \(Y(\Omega) = \{1, 3, 5\}\), probabilités \(\frac{1}{2}, \frac{1}{3}, \frac{1}{6}\) ; \(\E(Y) = \frac{7}{3}\), \(\mathrm{Var}(Y) = \frac{20}{9}\).</li><li>B1. \(n = 8\).</li><li>B2(a) \(Y\) suit la loi de Bernoulli de paramètre \(\frac{2}{3}\) ; \(\E(Y) = \frac{2}{3}\), \(\mathrm{Var}(Y) = \frac{2}{9}\).</li><li>B2(b) \(Z \sim \mathcal{B}(8, \frac{2}{3})\), \(Z(\Omega) = \ent{0}{8}\), \(\P(Z = i) = \binom{8}{i} \frac{2^i}{3^8}\) ; \(\P(Z \leq 7) = 1 - \frac{256}{6561} = \frac{6305}{6561}\).</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(2X + 1) \neq 2\,\mathrm{Var}(X) + 1\) : c’est \(4\,\mathrm{Var}(X)\) (exercice 5).`,
      r`La lettre \(Y\) sert deux fois (partie A, puis partie B) : ce sont deux variables différentes, les parties sont indépendantes.`,
      r`\(\P(Z \leq 7) = 1 - \P(Z = 7)\) est faux : le contraire de \((Z \leq 7)\) est \((Z \geq 8) = (Z = 8)\).`,
      r`Justifier la binomiale : « somme de variables de Bernoulli <b>indépendantes</b> de <b>même paramètre</b> ». Et \(Z(\Omega)\) contient 0.`,
      r`B1 : la probabilité d’une boule rouge est \(\frac{3}{n + 3}\), pas \(\frac{3}{n}\) (qui donnerait \(n = 11\)).`],
    grading: '12,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: false, note: N25 + ' Coquilles de l’énoncé, sans effet sur les réponses : « on marque aucun point » (lire « on ne marque aucun point ») et la lettre \(Y\) réutilisée dans la partie B.', near: ['p2024-dp-ex6', 'p2023-dp-ex6', 'p2021-ex6'],
    chk: { x0: '1/2', x1: '1/3', x2: '1/6', ex: '2/3', ex2: '~1', vx: '5/9', ey: '7/3', vy: '20/9', n: '~8', p: '2/3', vb: '2/9', z8: '256/6561', z7: '6305/6561' } });

  /* =====================================================================
     Examen OBM, octobre 2025 (promo 2030) — Moodle, sans corrigé ; exercices 4 à 6 hors programme
     ===================================================================== */
  add({ id: 'p2025-obm-ex1', exam: 'p2025-obm', ecue: 'obm', order: 1, src: 'Examen OBM 2025 · Ex 1', pts: 12, lvl: 2, time: 40,
    title: r`Logique : implications, quantificateurs, densité de \(\Q\), inclusion dans \(\Z\)`, topics: ['logique', 'quantificateurs', 'raisonnement', 'ensembles'],
    intro: r`<p>Les questions sont indépendantes.</p>`,
    questions: [
      r`<b>1.</b> Soit \(a\) et \(b\) deux réels. On considère les assertions :<p>\(P_1\) : « \(a = b\) », \(P_2\) : « \(a^2 = b^2\) », \(P_3\) : « \(a = -b\) », \(P_4\) : « \((a - b)(a + b) = 0\) », \(P_5\) : « \(a = b\) ou \(a = -b\) » et \(P_6\) : « \(a = 0\) ou \(b = 0\) »</p><p>(a) Quelles sont les implications du type \(P_1 \Longrightarrow\) ……… vraies pour tous \(a\) et \(b\) réels ?</p><p>(b) Parmi les assertions \(P_2\), \(P_3\), \(P_4\), \(P_5\) et \(P_6\), identifier celles qui impliquent \(P_1\) pour tous réels \(a\) et \(b\).</p><p>(c) Parmi les assertions \(P_1\), \(P_3\), \(P_4\), \(P_5\) et \(P_6\), identifier celles qui impliquent \(P_2\) pour tous réels \(a\) et \(b\).</p><p>(d) Parmi les assertions \(P_1\), \(P_3\), \(P_4\), \(P_5\) et \(P_6\), identifier celles qui sont équivalentes à \(P_2\) pour tous réels \(a\) et \(b\).</p>`,
      r`<b>2.</b> Traduire à l’aide de quantificateurs les phrases suivantes en indiquant si elles sont vraies ou fausses et en justifiant.<p>(a) « Le carré de tout réel est positif »</p><p>(b) « Certains réels sont strictement supérieurs à leur carré »</p><p>(c) « Il y a un réel égal au carré de tous les autres »</p>`,
      r`<b>3.</b> On rappelle que \(\Q = \left\{\dfrac{a}{b},\ a \in \Z,\ b \in \Z^*\right\}\) l’ensemble des nombres rationnels.<p>Soit l’assertion « (P) : \(\forall (p, q) \in \Q^2,\ \big(p \lt q \Longrightarrow (\exists c \in \Q,\ p \lt c \lt q)\big)\) »</p><p>(a) Démontrer que l’assertion (P) est vraie par un raisonnement direct en prenant grand soin de votre rédaction.</p><p>Indice : on pourra penser à \(\dfrac{p + q}{2}\)</p><p>(b) Donner la négation de (P).</p>`,
      r`<b>4.</b> Soient \(A = \{x \in \Z,\ x \geq 5\}\) et \(B = \{x \in \Z,\ (x - 1)(x - 5) \geq 0\}\). On note \(\overline{B}\) le complémentaire de \(B\) dans \(\Z\).<p>(a) Remplir les pointillés pour que la phrase mathématique soit correcte :</p><p>a) …… \(\in A\), &nbsp; b) ……… \(\not\subset A \cup B\), &nbsp; c) ……… \(\in A \cap B\), &nbsp; d) ……… \(\subset \overline{B}\)</p><p>(b) De quel ensemble commun \(A\) et \(B\) sont-ils des sous-ensembles ?</p><p>(c) Montrer que \(A \subset B\). Rédiger en suivant les règles de rédaction vues en séminaire.</p><p>(d) A-t-on \(B \subset A\) ? Justifier.</p>`],
    hints: [
      r`Question 1 : \(P_2\), \(P_4\) et \(P_5\) disent la même chose (\(a^2 - b^2 = (a - b)(a + b)\), puis « un produit est nul si et seulement si l’un des facteurs l’est »). Une implication fausse se réfute par un seul couple \((a, b)\) : essaie \((1, -1)\), \((1, 1)\), \((0, 1)\).`,
      r`Question 3(a) : première ligne « Soit \((p, q) \in \Q^2\) fixé. », deuxième ligne « Supposons \(p \lt q\). » Puis pose \(c = \frac{p + q}{2}\) et montre trois choses : \(c \in \Q\), \(p \lt c\) et \(c \lt q\).`,
      r`Question 4 : \((x - 1)(x - 5) \geq 0\) si et seulement si \(x \leq 1\) ou \(x \geq 5\) (tableau de signes). Donc \(\overline{B} = \{2, 3, 4\}\).`],
    solution: [
      { t: 'Question 1 : implications entre les six assertions', html: r`<p>Pour tous réels \(a\) et \(b\) : \(a^2 = b^2 \iff a^2 - b^2 = 0 \iff (a - b)(a + b) = 0 \iff (a - b = 0 \text{ ou } a + b = 0) \iff (a = b \text{ ou } a = -b)\). Donc \(P_2\), \(P_4\) et \(P_5\) sont équivalentes.</p>` +
        M(r`<p>(a) Les implications vraies sont \(P_1 \Rightarrow P_2\), \(P_1 \Rightarrow P_4\) et \(P_1 \Rightarrow P_5\). Soient \(a\) et \(b\) deux réels. Supposons \(P_1\) vraie : \(a = b\). Alors \(a^2 = b^2\), donc \(P_2\) est vraie ; comme \(P_2\), \(P_4\) et \(P_5\) sont équivalentes, \(P_4\) et \(P_5\) sont vraies aussi. En revanche, \(P_1 \Rightarrow P_3\) et \(P_1 \Rightarrow P_6\) sont fausses : pour \(a = b = 1\), \(P_1\) est vraie, mais \(1 \neq -1\) et ni \(a\) ni \(b\) n’est nul.</p><p>(b) Aucune. Pour \((a, b) = (1, -1)\), \(P_2\), \(P_3\), \(P_4\) et \(P_5\) sont vraies, mais \(1 \neq -1\) : \(P_1\) est fausse. Pour \((a, b) = (0, 1)\), \(P_6\) est vraie et \(P_1\) est fausse.</p><p>(c) \(P_1\), \(P_3\), \(P_4\) et \(P_5\) impliquent \(P_2\). Pour \(P_1\) : voir (a). Pour \(P_3\) : soient \(a\) et \(b\) deux réels ; supposons \(a = -b\) ; alors \(a^2 = (-b)^2 = b^2\). Pour \(P_4\) et \(P_5\) : elles sont équivalentes à \(P_2\). En revanche, \(P_6 \Rightarrow P_2\) est fausse : pour \((a, b) = (0, 1)\), \(P_6\) est vraie et \(0^2 \neq 1^2\).</p><p>(d) \(P_4\) et \(P_5\) sont équivalentes à \(P_2\) (calcul ci-dessus). \(P_1\) ne l’est pas, car \(P_2 \Rightarrow P_1\) est fausse (\((a, b) = (1, -1)\)) ; \(P_3\) non plus, car \(P_2 \Rightarrow P_3\) est fausse (\((a, b) = (1, 1)\)) ; \(P_6\) non plus (question c).</p>`) },
      { t: 'Question 2 : traduire, vrai ou faux', html: M(r`<p>(a) « \(\forall x \in \R,\ x^2 \geq 0\) » (positif signifie ici \(\geq 0\)). Vraie. Soit \(x \in \R\) fixé. Si \(x \geq 0\), \(x^2 = x \times x\) est un produit de deux réels positifs, donc \(x^2 \geq 0\). Si \(x \lt 0\), \(x^2 = (-x) \times (-x)\) avec \(-x \gt 0\), donc \(x^2 \geq 0\). Ainsi \(\forall x \in \R,\ x^2 \geq 0\).</p><p>(b) « \(\exists x \in \R,\ x \gt x^2\) ». Vraie : pour \(x = \dfrac{1}{2}\), \(x^2 = \dfrac{1}{4} \lt \dfrac{1}{2} = x\).</p><p>(c) « \(\exists x \in \R,\ \forall y \in \R \setminus \{x\},\ x = y^2\) ». Fausse. Montrons sa négation : « \(\forall x \in \R,\ \exists y \in \R \setminus \{x\},\ x \neq y^2\) ».</p><p>Soit \(x \in \R\) fixé. Posons \(y_1 = |x| + 1\) et \(y_2 = -(|x| + 1)\). Ces deux réels sont distincts (\(y_1 \gt 0 \gt y_2\)), donc l’un des deux au moins est différent de \(x\) ; notons-le \(y\). Alors \(y \in \R \setminus \{x\}\) et \(y^2 = (|x| + 1)^2 = |x|^2 + 2|x| + 1 \gt |x| \geq x\), donc \(y^2 \neq x\). La négation est vraie : la phrase (c) est fausse.</p>`) +
        r`<p>Pour (c), un seul \(x\) qui échoue ne suffit pas : la phrase commence par \(\exists x\), il faut montrer que <b>chaque</b> réel \(x\) échoue. C’est la négation que l’on démontre. La phrase reste fausse si l’on traduit « tous les autres » par \(\forall y \in \R\).</p>` },
      { t: 'Question 3(a) : la densité de Q, preuve directe', html: M(r`<p>Soit \((p, q) \in \Q^2\) fixé. Supposons \(p \lt q\). Montrons qu’il existe \(c \in \Q\) tel que \(p \lt c \lt q\).</p><p>Comme \(p \in \Q\) et \(q \in \Q\), il existe \(a \in \Z\), \(b \in \Z^*\), \(a' \in \Z\) et \(b' \in \Z^*\) tels que \(p = \dfrac{a}{b}\) et \(q = \dfrac{a'}{b'}\).</p><p>Posons \(c = \dfrac{p + q}{2}\).</p><p>• \(c \in \Q\). En effet, \(c = \dfrac{1}{2}\left(\dfrac{a}{b} + \dfrac{a'}{b'}\right) = \dfrac{ab' + a'b}{2bb'}\). Or \(ab' + a'b \in \Z\) (sommes et produits d’entiers) et \(2bb' \in \Z^*\) (produit d’entiers non nuls, car \(b \neq 0\) et \(b' \neq 0\)). Donc \(c \in \Q\).</p><p>• \(p \lt c\). En effet, \(c - p = \dfrac{p + q}{2} - p = \dfrac{q - p}{2}\). Or \(q - p \gt 0\) car \(p \lt q\), donc \(c - p \gt 0\), c’est-à-dire \(p \lt c\).</p><p>• \(c \lt q\). En effet, \(q - c = q - \dfrac{p + q}{2} = \dfrac{q - p}{2} \gt 0\), donc \(c \lt q\).</p><p>Ainsi, il existe \(c \in \Q\) tel que \(p \lt c \lt q\) : on a montré \(p \lt q \Longrightarrow (\exists c \in \Q,\ p \lt c \lt q)\).</p><p>Comme \((p, q)\) est un élément quelconque de \(\Q^2\), l’assertion (P) est vraie.</p>`, 'preuve directe') +
        r`<p>Les deux premières lignes suivent les règles du séminaire : « Soit … fixé » pour le \(\forall\), « Supposons … » pour l’implication. On ne nomme pas \(c\) le numérateur de \(q\) : la lettre \(c\) est déjà prise par l’énoncé.</p>` },
      { t: 'Question 3(b) : la négation', html: M(r`<p>\(\neg(P)\) : « \(\exists (p, q) \in \Q^2,\ \big(p \lt q \text{ et } (\forall c \in \Q,\ c \leq p \text{ ou } c \geq q)\big)\) ».</p>`) +
        r`<p>On nie de gauche à droite : \(\forall\) devient \(\exists\) ; la négation de « \(P \Rightarrow Q\) » est « \(P\) et non \(Q\) » ; \(\exists c\) devient \(\forall c\) ; la négation de « \(p \lt c\) et \(c \lt q\) » est « \(c \leq p\) ou \(c \geq q\) » (De Morgan).</p>` },
      { t: 'Question 4 : les ensembles A et B', html: r`<p>Tableau de signes : \(x - 1\) et \(x - 5\) sont tous deux positifs si \(x \geq 5\), tous deux négatifs si \(x \leq 1\), de signes contraires si \(1 \lt x \lt 5\). Donc \(B = \{x \in \Z,\ x \leq 1 \text{ ou } x \geq 5\} = \{\ldots, -1, 0, 1\} \cup \{5, 6, 7, \ldots\}\) et \(\overline{B} = \{2, 3, 4\}\). Par exemple \(3 \notin B\) : \((3 - 1)(3 - 5) = -4 \lt 0\).</p>` +
        M(r`<p>(a) Des réponses possibles (d’autres conviennent) : a) \(5 \in A\) ; b) \(\{3\} \not\subset A \cup B\) ; c) \(5 \in A \cap B\) ; d) \(\{2, 3\} \subset \overline{B}\).</p><p>(b) \(A\) et \(B\) sont des sous-ensembles de \(\Z\).</p><p>(c) Soit \(x \in A\) fixé. Alors \(x \in \Z\) et \(x \geq 5\). Ainsi \(x - 5 \geq 0\) et \(x - 1 \geq 4 \gt 0\). Or le produit de deux réels positifs est positif, donc \((x - 1)(x - 5) \geq 0\). D’où \(x \in B\). On a montré que tout élément de \(A\) est dans \(B\) : \(A \subset B\).</p><p>(d) Non. \(0 \in \Z\) et \((0 - 1)(0 - 5) = 5 \geq 0\), donc \(0 \in B\). Mais \(0 \lt 5\), donc \(0 \notin A\). Ainsi \(B \not\subset A\).</p>`, '4(c) et 4(d)') +
        r`<p>Pour b) et d), les pointillés précèdent \(\not\subset\) et \(\subset\) : on attend un <b>ensemble</b> (\(\{3\}\)), pas un élément. Comme \(A \subset B\), on a \(A \cup B = B\) et \(A \cap B = A\).</p>` }],
    answer: r`<ul><li>1(a) \(P_1 \Rightarrow P_2\), \(P_1 \Rightarrow P_4\), \(P_1 \Rightarrow P_5\) ; 1(b) aucune ; 1(c) \(P_1\), \(P_3\), \(P_4\), \(P_5\) ; 1(d) \(P_4\) et \(P_5\).</li><li>2(a) \(\forall x \in \R,\ x^2 \geq 0\) : vraie ; 2(b) \(\exists x \in \R,\ x \gt x^2\) : vraie (\(x = \frac{1}{2}\)) ; 2(c) \(\exists x \in \R,\ \forall y \in \R \setminus \{x\},\ x = y^2\) : fausse.</li><li>3(a) \(c = \frac{p + q}{2} = \frac{ab' + a'b}{2bb'} \in \Q\) et \(p \lt c \lt q\) ; 3(b) \(\exists (p, q) \in \Q^2,\ p \lt q \text{ et } (\forall c \in \Q,\ c \leq p \text{ ou } c \geq q)\).</li><li>4(a) par exemple \(5\), \(\{3\}\), \(5\), \(\{2, 3\}\) ; 4(b) \(\Z\) ; 4(c) soit \(x \in A\) fixé… ; 4(d) non : \(0 \in B\) et \(0 \notin A\). \(\overline{B} = \{2, 3, 4\}\).</li></ul>`,
    traps: [
      r`1(b) : « aucune » est une réponse. \(P_5 \Rightarrow P_1\) est fausse : « \(a = b\) ou \(a = -b\) » n’impose pas \(a = b\).`,
      r`1(c) et 1(d) : « impliquer » n’est pas « être équivalent ». \(P_1\) et \(P_3\) impliquent \(P_2\) sans lui être équivalentes.`,
      r`2(c) : « tous les autres » se traduit par \(\forall y \in \R \setminus \{x\}\), et l’ordre est \(\exists x\) puis \(\forall y\). Pour prouver qu’elle est fausse, il faut traiter tous les \(x\), pas un seul.`,
      r`3(a) : montrer \(c \in \Q\) avec les définitions (\(b \neq 0\) et \(b' \neq 0\) donnent \(2bb' \neq 0\)), pas « la moyenne de deux rationnels est rationnelle » sans preuve. Un exemple chiffré ne démontre rien.`,
      r`3(b) : la négation de l’implication est « \(p \lt q\) et … », jamais une implication ; et non\((p \lt c \lt q)\) est « \(c \leq p\) ou \(c \geq q\) ».`,
      r`4(c) : la première ligne est « Soit \(x \in A\) fixé. », pas « Soit \(x \in \Z\) » ; finir par la conclusion \(A \subset B\).`],
    grading: '12 points pour l’exercice ; le sujet ne détaille pas les questions. La rédaction de 3(a) et de 4(c) est notée explicitement (« en prenant grand soin de votre rédaction », « Rédiger en suivant les règles de rédaction vues en séminaire »).',
    official: false, note: N25 + ' Rédaction modèle selon les règles du séminaire (§ 4.2 « Comment rédiger ? »).', near: ['p2024-obm-ex1', 'p2023-le-ex2'],
    chk: { a: '~2,4,5', b: '~none', c: '~1,3,4,5', d: '~4,5', s2a: '~true', s2b: '~true', s2c: '~false', bbar: '{2,3,4}', ce: '~0' } });

  add({ id: 'p2025-obm-ex2', exam: 'p2025-obm', ecue: 'obm', order: 2, src: 'Examen OBM 2025 · Ex 2', pts: 4.5, lvl: 1, time: 15,
    title: r`La fonction \(A \mapsto \card(A)\) sur \(\mathcal{P}(\{2, 3, 4\})\)`, topics: ['injections', 'ensembles'],
    intro: '',
    questions: [
      r`<b>1.</b> Soient \(F\) et \(G\) deux ensembles et \(f : F \longrightarrow G\)<p>(a) Rappeler la définition mathématique (avec les quantificateurs) de « \(f\) est injective de \(F\) vers \(G\) »</p><p>(b) Rappeler la définition mathématique (avec les quantificateurs) de « \(f\) est surjective de \(F\) vers \(G\) »</p>`,
      r`<b>2.</b> Soient \(E = \{2, 3, 4\}\). On définit la fonction \(f : \mathcal{P}(E) \longrightarrow \N,\ A \longmapsto \card(A)\).<p>(a) Donner \(\mathcal{P}(E)\)</p><p>(b) Remplir le tableau de valeurs de la fonction \(f\) (une ligne \(A\), une ligne \(f(A)\)).</p><p>(c) \(f\) est-elle injective ? Justifier.</p><p>(d) \(f\) est-elle surjective ? Justifier.</p><p>(e) Déterminer \(I \subset \mathcal{P}(E)\) et \(J \subset \N\) tels que \(f : I \longrightarrow J\) soit injective, non surjective. (Les ensembles \(I\) et \(J\) doivent contenir au moins deux éléments).</p><p>(f) Déterminer \(I' \subset \mathcal{P}(E)\) et \(J' \subset \N\) tels que \(f : I' \longrightarrow J'\) soit surjective, non injective. (Les ensembles \(I'\) et \(J'\) doivent contenir au moins deux éléments).</p>`],
    hints: [
      r`\(\mathcal{P}(E)\) contient toutes les parties de \(E\), y compris \(\varnothing\) et \(E\) : \(2^3 = 8\) éléments.`,
      r`Non injective : deux parties distinctes de même cardinal. Non surjective : un entier naturel qui n’est le cardinal d’aucune partie de \(E\).`,
      r`Pour (e) et (f), il faut aussi \(f(I) \subset J\) : l’image de chaque élément de \(I\) doit être dans \(J\).`],
    solution: [
      { t: 'Question 1 : définitions', html: M(r`<p>(a) \(f\) est injective de \(F\) vers \(G\) si : \(\forall (x, x') \in F^2,\ f(x) = f(x') \Longrightarrow x = x'\).</p><p>(b) \(f\) est surjective de \(F\) vers \(G\) si : \(\forall y \in G,\ \exists x \in F,\ y = f(x)\).</p>`) },
      { t: 'Question 2(a)-(b) : P(E) et le tableau', html: M(r`<p>(a) \(\mathcal{P}(E) = \big\{\varnothing, \{2\}, \{3\}, \{4\}, \{2, 3\}, \{2, 4\}, \{3, 4\}, \{2, 3, 4\}\big\}\) : \(2^3 = 8\) parties.</p>`) +
        '<div class="tbl"><table><thead><tr><th scope="row">\\(A\\)</th><td>\\(\\varnothing\\)</td><td>\\(\\{2\\}\\)</td><td>\\(\\{3\\}\\)</td><td>\\(\\{4\\}\\)</td><td>\\(\\{2, 3\\}\\)</td><td>\\(\\{2, 4\\}\\)</td><td>\\(\\{3, 4\\}\\)</td><td>\\(\\{2, 3, 4\\}\\)</td></tr></thead><tbody><tr><th scope="row">\\(f(A)\\)</th><td>0</td><td>1</td><td>1</td><td>1</td><td>2</td><td>2</td><td>2</td><td>3</td></tr></tbody></table></div>' },
      { t: 'Question 2(c)-(d) : injective, surjective', html: M(r`<p>(c) \(f\) n’est pas injective : \(f(\{2\}) = f(\{3\}) = 1\) et \(\{2\} \neq \{3\}\).</p><p>(d) \(f\) n’est pas surjective : \(4 \in \N\) n’a pas d’antécédent, car toute partie de \(E\) a au plus 3 éléments. D’après le tableau, \(f(\mathcal{P}(E)) = \{0, 1, 2, 3\} \neq \N\).</p>`) },
      { t: 'Question 2(e)-(f) : restreindre', html: M(r`<p>(e) Prenons \(I = \{\varnothing, \{2\}\}\) et \(J = \{0, 1, 2\}\). On a \(f(\varnothing) = 0\) et \(f(\{2\}) = 1\) : les deux éléments de \(I\) ont des images distinctes, qui sont dans \(J\), donc \(f : I \to J\) est injective. Elle n’est pas surjective : \(2 \in J\) n’a pas d’antécédent dans \(I\).</p><p>(f) Prenons \(I' = \{\{2\}, \{3\}, \{2, 3\}\}\) et \(J' = \{1, 2\}\). On a \(f(I') = \{1, 2\} = J'\) : \(f : I' \to J'\) est surjective. Elle n’est pas injective : \(f(\{2\}) = f(\{3\}) = 1\) avec \(\{2\} \neq \{3\}\).</p>`) +
        r`<p>D’autres choix conviennent : en (e), des parties de cardinaux deux à deux distincts et un \(J\) qui contient une valeur de plus ; en (f), deux parties de même cardinal dans \(I'\), et \(J' = f(I')\).</p>` }],
    answer: r`<ul><li>1(a) \(\forall (x, x') \in F^2,\ f(x) = f(x') \Rightarrow x = x'\) ; 1(b) \(\forall y \in G,\ \exists x \in F,\ y = f(x)\).</li><li>2(a) 8 parties : \(\varnothing\), \(\{2\}\), \(\{3\}\), \(\{4\}\), \(\{2, 3\}\), \(\{2, 4\}\), \(\{3, 4\}\), \(\{2, 3, 4\}\) ; 2(b) images 0, 1, 1, 1, 2, 2, 2, 3.</li><li>2(c) non injective : \(f(\{2\}) = f(\{3\})\) ; 2(d) non surjective : 4 n’a pas d’antécédent, \(f(\mathcal{P}(E)) = \{0, 1, 2, 3\}\).</li><li>2(e) \(I = \{\varnothing, \{2\}\}\), \(J = \{0, 1, 2\}\) ; 2(f) \(I' = \{\{2\}, \{3\}, \{2, 3\}\}\), \(J' = \{1, 2\}\).</li></ul>`,
    traps: [
      r`Oublier \(\varnothing\) ou \(E\) dans \(\mathcal{P}(E)\) : il y a 8 parties, pas 6.`,
      r`Les éléments de \(\mathcal{P}(E)\) sont des ensembles : écrire \(\{2\}\), pas \(2\) ; \(I\) est un ensemble de parties, \(\{\varnothing, \{2\}\}\).`,
      r`Surjectivité « vers \(\N\) » : un seul entier sans antécédent suffit (4, ou 5…), pas « \(f\) ne prend que quatre valeurs ».`,
      r`(e) et (f) : vérifier \(f(I) \subset J\), sinon \(f : I \to J\) n’est pas une fonction.`],
    grading: '4,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: false, note: N25 + ' Même plan que l’exercice 2 de l’examen OBM 2024 (tableau, injective, surjective, restrictions).', near: ['p2024-obm-ex2'],
    chk: { card: '~8', img: '{0,1,2,3}', inj: '~false', surj: '~false', e: '~ok', f: '~ok' } });

  add({ id: 'p2025-obm-ex3', exam: 'p2025-obm', ecue: 'obm', order: 3, src: 'Examen OBM 2025 · Ex 3', pts: 5, lvl: 1, time: 15,
    title: r`Images directes et réciproques : définitions, fonction sur \(\ent{0}{10}\), ln et cos`, topics: ['images', 'usuelles'],
    intro: '',
    questions: [
      r`<b>1.</b> Soient \(E\) et \(F\) deux ensembles et \(f : E \longrightarrow F\).<p>(a) Soit \(A \subset E\). Donner la définition mathématique de \(f(A)\).</p><p>(b) Soit \(B \subset F\). Donner la définition mathématique de \(f^{-1}(B)\).</p>`,
      r`<b>2.</b> Application 1. On définit la fonction \(f : \ent{0}{10} \longrightarrow \N\) telle que \[\forall n \in \ent{0}{10},\ f(n) = n + 1 \text{ si } n \text{ pair et } 0 \text{ sinon}\]<p>Donner \(f(\{1, 2, 3\})\) et \(f^{-1}(\{0\})\).</p>`,
      r`<b>3.</b> Application 2 : compléter le tableau suivant.<p>N.B. : nous vous conseillons de dessiner le graphe des fonctions concernées au brouillon ! Bien sûr, la fonction ln est la fonction \(x \mapsto \ln(x)\) et la fonction cos est \(x \mapsto \cos(x)\).</p><div class="tbl"><table><thead><tr><th scope="col">\(f\)</th><th scope="col">\(\ln : \R^{+*} \to \R\)</th><th scope="col">\(\cos : [-\pi, \pi] \to \R\)</th></tr></thead><tbody><tr><th scope="row">\(f\left(\left]0, \frac{\pi}{2}\right]\right)\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{0\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{-1\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(]-\infty, 0])\)</th><td></td><td></td></tr></tbody></table></div>`],
    hints: [
      r`\(f(A)\) est une partie de \(F\) (les images), \(f^{-1}(B)\) une partie de \(E\) (les antécédents).`,
      r`Application 1 : calcule \(f(1)\), \(f(2)\), \(f(3)\) ; puis cherche tous les \(n \in \ent{0}{10}\) tels que \(f(n) = 0\) : si \(n\) est pair, \(f(n) = n + 1 \geq 1\).`,
      r`ln est strictement croissante sur \(]0, +\infty[\) et tend vers \(-\infty\) en 0. cos est paire sur \([-\pi, \pi]\), croissante sur \([-\pi, 0]\), décroissante sur \([0, \pi]\). Une image réciproque se cherche dans l’ensemble de départ.`],
    solution: [
      { t: 'Question 1 : définitions', html: M(r`<p>(a) \(f(A) = \{f(x),\ x \in A\} = \{y \in F,\ \exists x \in A,\ y = f(x)\}\).</p><p>(b) \(f^{-1}(B) = \{x \in E,\ f(x) \in B\}\).</p>`) },
      { t: 'Question 2 : une fonction sur ⟦0, 10⟧', html: M(r`<p>\(1\) et \(3\) sont impairs, donc \(f(1) = f(3) = 0\) ; \(2\) est pair, donc \(f(2) = 2 + 1 = 3\). Ainsi \(f(\{1, 2, 3\}) = \{f(1), f(2), f(3)\} = \{0, 3\}\).</p><p>Soit \(n \in \ent{0}{10}\). Si \(n\) est pair, \(f(n) = n + 1 \geq 1\), donc \(f(n) \neq 0\). Si \(n\) est impair, \(f(n) = 0\). Donc \(f^{-1}(\{0\}) = \{n \in \ent{0}{10},\ f(n) = 0\} = \{1, 3, 5, 7, 9\}\).</p>`) },
      { t: 'Question 3 : colonne ln', html: FIG.ln + M(r`<p>ln est continue et strictement croissante sur \(]0, +\infty[\), avec \(\ln(x) \to -\infty\) quand \(x \to 0^+\), et \(\ln(1) = 0\).</p><p>\(\ln\left(\left]0, \frac{\pi}{2}\right]\right) = \left]-\infty, \ln\left(\frac{\pi}{2}\right)\right]\) (borne de droite atteinte en \(\frac{\pi}{2}\), borne de gauche jamais atteinte) ; \(\ln^{-1}(\{0\}) = \{1\}\) ; \(\ln^{-1}(\{-1\}) = \{e^{-1}\} = \left\{\frac{1}{e}\right\}\) ; \(\ln^{-1}(]-\infty, 0]) = ]0, 1]\) (\(\ln(x) \leq 0 \iff 0 \lt x \leq 1\)).</p>`) },
      { t: 'Question 3 : colonne cos', html: FIG.cosPi + M(r`<p>Sur \([-\pi, \pi]\), cos est continue et paire ; elle croît de \(-1\) à 1 sur \([-\pi, 0]\) et décroît de 1 à \(-1\) sur \([0, \pi]\).</p><p>\(\cos\left(\left]0, \frac{\pi}{2}\right]\right) = [0, 1[\) : cos est strictement décroissante sur \(\left[0, \frac{\pi}{2}\right]\), la valeur \(\cos\left(\frac{\pi}{2}\right) = 0\) est atteinte, la valeur \(\cos(0) = 1\) ne l’est pas car 0 est exclu.</p><p>\(\cos^{-1}(\{0\}) = \left\{-\frac{\pi}{2}, \frac{\pi}{2}\right\}\) ; \(\cos^{-1}(\{-1\}) = \{-\pi, \pi\}\) ; \(\cos^{-1}(]-\infty, 0]) = \left[-\pi, -\frac{\pi}{2}\right] \cup \left[\frac{\pi}{2}, \pi\right]\).</p>`) }],
    answer: r`<ul><li>1(a) \(f(A) = \{f(x),\ x \in A\}\) ; 1(b) \(f^{-1}(B) = \{x \in E,\ f(x) \in B\}\).</li><li>2. \(f(\{1, 2, 3\}) = \{0, 3\}\) ; \(f^{-1}(\{0\}) = \{1, 3, 5, 7, 9\}\).</li></ul>` +
      '<div class="tbl"><table><thead><tr><th scope="col">\\(f\\)</th><th scope="col">\\(\\ln : \\R^{+*} \\to \\R\\)</th><th scope="col">\\(\\cos : [-\\pi, \\pi] \\to \\R\\)</th></tr></thead><tbody><tr><th scope="row">\\(f(]0, \\frac{\\pi}{2}])\\)</th><td>\\(]-\\infty, \\ln(\\frac{\\pi}{2})]\\)</td><td>\\([0, 1[\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{0\\})\\)</th><td>\\(\\{1\\}\\)</td><td>\\(\\{-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{-1\\})\\)</th><td>\\(\\{\\frac{1}{e}\\}\\)</td><td>\\(\\{-\\pi, \\pi\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(]-\\infty, 0])\\)</th><td>\\(]0, 1]\\)</td><td>\\([-\\pi, -\\frac{\\pi}{2}] \\cup [\\frac{\\pi}{2}, \\pi]\\)</td></tr></tbody></table></div>',
    traps: [
      r`\(\cos\left(\left]0, \frac{\pi}{2}\right]\right) = [0, 1[\), pas \([0, 1]\) : l’intervalle est ouvert en 0, la valeur 1 n’est pas atteinte.`,
      r`\(\cos^{-1}(\{0\})\) a deux éléments sur \([-\pi, \pi]\) : \(-\frac{\pi}{2}\) et \(\frac{\pi}{2}\). Ne pas répondre \(\left\{\frac{\pi}{2} + k\pi,\ k \in \Z\right\}\) : la fonction est définie sur \([-\pi, \pi]\) seulement.`,
      r`\(\ln^{-1}(]-\infty, 0]) = ]0, 1]\) : 0 n’est pas dans l’ensemble de départ.`,
      r`\(f^{-1}(\{0\})\) est un ensemble d’antécédents (\(\{1, 3, 5, 7, 9\}\)), pas une valeur ; et 0 n’en fait pas partie (\(f(0) = 1\)).`],
    grading: '5 points pour l’exercice ; le sujet ne détaille pas le barème. Seuls les résultats sont demandés au tableau.',
    official: false, note: N25 + ' Même tableau qu’à l’examen OBM 2024 (exercice 3), avec ln au lieu d’exp et cos sur \\([-\\pi, \\pi]\\) au lieu de \\([0, \\pi]\\).', near: ['p2024-obm-ex3'],
    chk: { img: '{0,3}', pre: '{1,3,5,7,9}', l1: ']-\\infty,\\ln(\\pi/2)]', l2: '{1}', l3: '{1/e}', l4: ']0,1]', c1: '[0,1[', c2: '{-\\pi/2,\\pi/2}', c3: '{-\\pi,\\pi}', c4: '[-\\pi,-\\pi/2]\\cup[\\pi/2,\\pi]' } });

  /* =====================================================================
     Examen DP, octobre 2024 (promo 2029) — sans corrigé : réponses recalculées
     ===================================================================== */
  var N24 = 'Les annales n’ont pas de corrigé de ce sujet : correction rédigée sur le modèle des corrigés officiels de 2023, chaque résultat recalculé par programme (énumération exhaustive).';

  add({ id: 'p2024-dp-ex1', exam: 'p2024-dp', ecue: 'dp', order: 1, src: 'Examen DP 2024 · Ex 1', pts: 4, lvl: 2, time: 10,
    title: 'Proposer une situation de tirage pour une formule donnée', topics: ['denombrement', 'binomial'],
    intro: r`<p>Dans un jeu de 32 cartes, on tire 5 cartes.</p><p>Proposer une situation simple afin que la réponse à la question « Quel est le nombre de tirages possibles ? » soit :</p>`,
    questions: [
      r`<b>1.</b> « Il y a \(\dfrac{32!}{27!}\) tirages possibles ».`,
      r`<b>2.</b> « Il y a \(\dbinom{32}{5}\) tirages possibles ».`,
      r`<b>3.</b> « Il y a \(\dbinom{8}{3} \times \dbinom{8}{2}\) tirages possibles ».`,
      r`<b>4.</b> « Il y a \(\dbinom{7}{1} \times \dbinom{24}{3}\) tirages possibles ».`],
    hints: [
      r`Lis chaque formule : \(\frac{32!}{27!} = 32 \times 31 \times 30 \times 29 \times 28\) compte des listes ordonnées sans répétition ; \(\binom{32}{5}\) compte des parties à 5 éléments.`,
      r`Un jeu de 32 cartes, ce sont 4 couleurs (cœur, carreau, trèfle, pique) de 8 cartes chacune. \(\binom{8}{3}\) choisit 3 cartes dans une couleur.`,
      r`Dans la formule 4, les nombres choisis font \(1 + 3 = 4\) cartes, pas 5 : la cinquième carte doit être imposée. \(7 + 24 + 1 = 32\).`],
    solution: [
      { t: 'Formule 1 : l’ordre compte, sans répétition', html: r`<p>\(\dfrac{32!}{27!} = 32 \times 31 \times 30 \times 29 \times 28 = A_{32}^5\) : c’est le nombre de 5-listes de cartes distinctes, donc de tirages <b>successifs sans remise</b>.</p>` +
        M(r`<p>On tire successivement et sans remise 5 cartes du jeu, en notant l’ordre d’apparition. Il y a 32 choix pour la première carte, 31 pour la deuxième… 28 pour la cinquième, soit \(32 \times 31 \times 30 \times 29 \times 28 = \dfrac{32!}{27!}\) tirages.</p>`) },
      { t: 'Formule 2 : l’ordre ne compte pas', html: M(r`<p>On tire simultanément 5 cartes du jeu (une main de 5 cartes). Une main est une partie à 5 éléments de l’ensemble des 32 cartes : il y a \(\dbinom{32}{5}\) mains.</p>`) },
      { t: 'Formule 3 : deux couleurs imposées', html: r`<p>Les deux facteurs \(\binom{8}{\cdot}\) choisissent dans deux groupes de 8 cartes : deux couleurs. Les exposants 3 et 2 font bien 5 cartes.</p>` +
        M(r`<p>On tire simultanément 5 cartes et on compte les mains formées d’exactement 3 cœurs et 2 piques. On choisit les 3 cœurs parmi les 8 cœurs (\(\binom{8}{3}\) façons), puis les 2 piques parmi les 8 piques (\(\binom{8}{2}\) façons) : il y a \(\dbinom{8}{3} \times \dbinom{8}{2}\) mains.</p>`) +
        r`<p>Valeur : \(56 \times 28 = 1\,568\).</p>` },
      { t: 'Formule 4 : une carte imposée', html: r`<p>\(7 + 24 = 31\) : les 7 cartes et les 24 cartes forment, avec une carte de plus, tout le jeu. Par exemple : l’as de cœur, les 7 autres cœurs, les 24 cartes qui ne sont pas des cœurs. Comme \(1 + 3 = 4\), la cinquième carte de la main est forcément l’as de cœur.</p>` +
        M(r`<p>On tire simultanément 5 cartes et on compte les mains qui contiennent l’as de cœur et exactement deux cœurs. L’as de cœur est imposé (1 façon) ; on choisit l’autre cœur parmi les 7 autres cœurs (\(\binom{7}{1}\) façons) ; les 3 dernières cartes ne sont pas des cœurs : on les choisit parmi les 24 cartes des trois autres couleurs (\(\binom{24}{3}\) façons). Il y a \(\dbinom{7}{1} \times \dbinom{24}{3}\) mains.</p>`) +
        r`<p>Valeur : \(7 \times 2\,024 = 14\,168\). Autre situation qui marche : « les mains qui contiennent le roi de pique et exactement deux piques ».</p>` }],
    answer: r`<ul><li>1. Tirage successif sans remise de 5 cartes (ordre noté) : \(\frac{32!}{27!} = 24\,165\,120\).</li><li>2. Tirage simultané de 5 cartes (une main) : \(\binom{32}{5} = 201\,376\).</li><li>3. Mains de 5 cartes avec exactement 3 cœurs et 2 piques : \(1\,568\).</li><li>4. Mains de 5 cartes contenant l’as de cœur et exactement deux cœurs : \(14\,168\).</li></ul>`,
    traps: [
      r`Formule 4 : « 1 cœur et 3 non-cœurs » ne fait que 4 cartes ; sans carte imposée, la situation proposée ne tire pas 5 cartes.`,
      r`Formule 1 : « avec remise » donnerait \(32^5\), pas \(\frac{32!}{27!}\).`,
      r`Formule 3 : « 3 cartes d’une couleur et 2 d’une autre », sans fixer les couleurs, donne \(4 \times 3 \times \binom{8}{3}\binom{8}{2}\) : il faut nommer les deux couleurs.`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions. Toute situation juste et clairement décrite est acceptée.',
    official: false, note: N24 + ' Les situations proposées sont des exemples parmi d’autres ; leurs effectifs ont été comptés sur les 201 376 mains.',
    chk: { f1: '24165120', f2: '201376', f3: '1568', f4: '14168' } });

  add({ id: 'p2024-dp-ex2', exam: 'p2024-dp', ecue: 'dp', order: 2, src: 'Examen DP 2024 · Ex 2', pts: 6, lvl: 1, time: 14,
    title: 'Digicode : une lettre suivie de trois chiffres', topics: ['denombrement'],
    intro: r`<p>Un digicode à l’entrée d’un immeuble est constitué d’un clavier de 13 touches marquées de 3 lettres A, B et C et des dix chiffres de 0 à 9.</p><p>Un code est formé d’une lettre suivie de 3 chiffres.</p><p>N.B. : vous donnerez vos résultats sous la forme d’un nombre entier.</p>`,
    questions: [
      r`<b>1.</b> Combien y a-t-il de codes possibles dont les chiffres sont distincts ? Justifier brièvement.`,
      r`<b>2.</b> Combien y a-t-il de codes possibles dont les chiffres peuvent se répéter ? Justifier brièvement.`,
      r`<b>3.</b> Paul arrive devant l’immeuble mais a oublié le code. Il se souvient juste de la lettre et sait que les chiffres sont distincts et impairs. Combien a-t-il de possibilités pour trouver le code ? Justifier brièvement.`,
      r`<b>4.</b> Le lendemain, Paul revient mais le code a changé y compris la lettre. On lui a précisé uniquement que les trois chiffres du code sont 6, 2 et 9. Combien a-t-il de possibilités pour trouver le code ? Justifier brièvement.`,
      r`<b>5.</b> Le surlendemain, Paul veut à nouveau rentrer chez lui mais le code a une nouvelle fois changé (y compris la lettre). Cette fois-ci, il sait juste que les chiffres du code peuvent se répéter et qu’il y a au moins une fois le chiffre 4. Combien a-t-il de possibilités pour trouver le code ? Justifier brièvement.`],
    hints: [
      'Un code est une liste ordonnée : la lettre, puis le 1er, le 2e et le 3e chiffre. Multiplie les nombres de choix (principe multiplicatif).',
      'Chiffres distincts : arrangements (10 × 9 × 8). Chiffres qui peuvent se répéter : 10 × 10 × 10.',
      '« Au moins une fois le 4 » : compte tous les codes, puis retire ceux qui n’ont aucun 4.'],
    solution: [
      { t: 'Question 1 : chiffres distincts', html: M(r`<p>Un code est formé d’une lettre (3 choix : A, B ou C) suivie de 3 chiffres distincts, l’ordre comptant : c’est un arrangement de 3 chiffres parmi 10, soit \(A_{10}^3 = 10 \times 9 \times 8 = 720\) possibilités. Par le principe multiplicatif, il y a \(3 \times 720 = 2\,160\) codes.</p>`) },
      { t: 'Question 2 : chiffres avec répétition', html: M(r`<p>Chaque chiffre peut prendre les 10 valeurs, indépendamment des autres : \(10^3 = 1\,000\) suites de 3 chiffres (3-listes de \(\ent{0}{9}\)). Avec la lettre : \(3 \times 10^3 = 3\,000\) codes.</p>`) },
      { t: 'Question 3 : lettre connue, chiffres distincts et impairs', html: M(r`<p>La lettre est connue : 1 choix. Les chiffres impairs sont 1, 3, 5, 7, 9 : 5 chiffres. Les 3 chiffres du code sont distincts et l’ordre compte : \(A_5^3 = 5 \times 4 \times 3 = 60\). Paul a 60 possibilités.</p>`) },
      { t: 'Question 4 : chiffres 6, 2, 9 dans un ordre inconnu', html: M(r`<p>La lettre a changé : 3 choix. Les chiffres sont 6, 2 et 9 dans un ordre inconnu : il y a \(3! = 6\) façons de les ordonner (permutations de \(\{2, 6, 9\}\)). Paul a \(3 \times 3! = 18\) possibilités.</p>`) },
      { t: 'Question 5 : au moins un 4', html: r`<p>Compter directement « un 4 en première position, ou en deuxième… » compte plusieurs fois les codes à deux ou trois 4. On passe par le complémentaire.</p>` +
        M(r`<p>On passe par le complémentaire. Il y a \(10^3 = 1\,000\) suites de 3 chiffres, dont \(9^3 = 729\) sans aucun 4 (9 choix par chiffre). Il y a donc \(1\,000 - 729 = 271\) suites contenant au moins un 4. Avec la lettre (3 choix) : \(3 \times 271 = 813\) possibilités.</p>`) }],
    answer: r`<ul><li>1. \(3 \times 10 \times 9 \times 8 = 2\,160\)</li><li>2. \(3 \times 10^3 = 3\,000\)</li><li>3. \(5 \times 4 \times 3 = 60\)</li><li>4. \(3 \times 3! = 18\)</li><li>5. \(3 \times (10^3 - 9^3) = 813\)</li></ul>`,
    traps: [
      r`Oublier la lettre (facteur 3), ou la compter alors qu’elle est connue (question 3).`,
      r`Question 5 : \(3 \times 3 \times 10^2\) (« le 4 à l’une des 3 places, le reste libre ») compte plusieurs fois les codes 44x, 4x4… et dépasse le vrai total.`,
      r`« Sous la forme d’un nombre entier » : ici il faut finir le calcul (2 160, pas \(3 \times A_{10}^3\)).`],
    grading: '6 points pour l’exercice ; le sujet ne détaille pas les questions. Chaque réponse doit être justifiée brièvement.',
    official: false, note: N24, near: ['p2023-dp-ex2', 'p2025-dp-ex2'],
    chk: { q1: '2160', q2: '3000', q3: '60', q4: '18', q5: '813' } });

  add({ id: 'p2024-dp-ex3', exam: 'p2024-dp', ecue: 'dp', order: 3, src: 'Examen DP 2024 · Ex 3', pts: 8.5, lvl: 3, time: 25,
    title: r`Les jetons de Teddy : \(\binom{n}{p}\binom{p}{k} = \binom{n}{k}\binom{n-k}{p-k}\)`, topics: ['binomial', 'denombrement'],
    intro: '',
    questions: [
      r`<b>1.</b> Teddy s’ennuie et cherche à s’occuper. Il découpe un hexagone et un triangle en papier et colle le triangle dans l’hexagone comme dans la figure suivante.` + FIG.hexa +
        r`<p>Teddy trouve alors 9 jetons numérotés de 1 à 9 et se lance le défi de placer 5 jetons dans l’hexagone dont 2 dans le triangle.</p><p>Pour cela, il décide procéder de deux façons différentes :</p><p>• Choix 1 : Teddy choisit 2 jetons à mettre dans le triangle puis il choisit 3 jetons à placer en dehors du triangle (mais dans l’hexagone !)</p><p>• Choix 2 : Teddy choisit 5 jetons à placer dans l’hexagone et choisit parmi ceux-ci 2 jetons à placer dans le triangle.</p><p>(a) Quel est le nombre \(N_1\) de répartitions possibles si Teddy fait le choix 1 ? Vous donnerez votre résultat sous la forme de produits d’entiers.</p><p>(b) Quel est le nombre \(N_2\) de répartitions possibles si Teddy fait le choix 2 ? Vous donnerez votre résultat sous la forme de produits d’entiers.</p><p>(c) Que constatez-vous ?</p>`,
      r`<b>2.</b> Généralisation : soient 3 entiers naturels \(n\), \(p\) et \(k\) tels que \(0 \leq k \leq p \leq n\). En vous inspirant des choix faits par Teddy, expliquez, sans calcul, la formule suivante : \[\binom{n}{p}\binom{p}{k} = \binom{n}{k}\binom{n-k}{p-k}\]`,
      r`<b>3.</b> Redémontrer la formule précédente par le calcul.`,
      r`<b>4.</b> Donner la valeur de : \(S_p = \displaystyle\sum_{k=0}^{p} \binom{n}{k}\binom{n-k}{p-k}\).`],
    hints: [
      r`Choix 1 : 2 jetons parmi 9 pour le triangle, puis 3 parmi les 7 restants. Choix 2 : 5 parmi 9, puis 2 parmi ces 5. L’ordre des jetons ne compte pas.`,
      r`Dans les deux choix, une répartition est la même chose : un ensemble \(A\) de jetons dans le triangle et un ensemble \(B\) de jetons dans l’hexagone, avec \(A \subset B\).`,
      r`Question 4 : remplace chaque terme grâce à la formule du 2, puis sors \(\binom{n}{p}\) de la somme et pense à \(\sum_k \binom{p}{k} = 2^p\).`],
    solution: [
      { t: 'Question 1 : compter de deux façons', html: M(r`<p>(a) Choix 1 : on choisit les 2 jetons du triangle parmi les 9 jetons (\(\binom{9}{2}\) façons), puis les 3 jetons hors du triangle parmi les 7 jetons restants (\(\binom{7}{3}\) façons). L’ordre ne compte pas. Donc \(N_1 = \dbinom{9}{2}\dbinom{7}{3} = 36 \times 35\).</p><p>(b) Choix 2 : on choisit les 5 jetons de l’hexagone parmi les 9 (\(\binom{9}{5}\) façons), puis parmi eux les 2 jetons du triangle (\(\binom{5}{2}\) façons). Donc \(N_2 = \dbinom{9}{5}\dbinom{5}{2} = 126 \times 10\).</p><p>(c) On constate que \(N_1 = N_2 = 1\,260\) : les deux choix décrivent les mêmes répartitions (2 jetons dans le triangle, 3 autres dans l’hexagone hors du triangle), comptées dans un ordre différent.</p>`) },
      { t: 'Question 2 : la formule par double dénombrement', html: M(r`<p>Soit \(E\) un ensemble de \(n\) jetons. On compte les façons de placer \(p\) jetons dans l’hexagone dont \(k\) dans le triangle, c’est-à-dire les couples \((A, B)\) de parties de \(E\) avec \(A \subset B\), \(\card(A) = k\) et \(\card(B) = p\) (\(A\) : jetons du triangle, \(B\) : jetons de l’hexagone).</p><p>Comme Teddy au choix 2 : on choisit d’abord \(B\), \(p\) jetons parmi \(n\), puis \(A\), \(k\) jetons parmi les \(p\) de \(B\) : \(\binom{n}{p}\binom{p}{k}\) couples.</p><p>Comme Teddy au choix 1 : on choisit d’abord \(A\), \(k\) jetons parmi \(n\), puis les \(p - k\) jetons de \(B \setminus A\) parmi les \(n - k\) jetons qui ne sont pas dans \(A\) : \(\binom{n}{k}\binom{n-k}{p-k}\) couples.</p><p>On a compté le même ensemble de deux façons, donc \(\dbinom{n}{p}\dbinom{p}{k} = \dbinom{n}{k}\dbinom{n-k}{p-k}\).</p>`) },
      { t: 'Question 3 : par le calcul', html: M(r`<p>Soient \(n, p, k\) des entiers tels que \(0 \leq k \leq p \leq n\). Par définition des coefficients binomiaux :</p><div class="fm">\[\binom{n}{p}\binom{p}{k} = \frac{n!}{p!\,(n-p)!} \times \frac{p!}{k!\,(p-k)!} = \frac{n!}{k!\,(p-k)!\,(n-p)!}\]</div><div class="fm">\[\binom{n}{k}\binom{n-k}{p-k} = \frac{n!}{k!\,(n-k)!} \times \frac{(n-k)!}{(p-k)!\,\big((n-k)-(p-k)\big)!} = \frac{n!}{k!\,(p-k)!\,(n-p)!}\]</div><p>car \((n-k)-(p-k) = n-p\). Les deux membres sont égaux.</p>`) },
      { t: 'Question 4 : la somme', html: M(r`<p>Par la question 2, pour tout \(k \in \ent{0}{p}\), \(\binom{n}{k}\binom{n-k}{p-k} = \binom{n}{p}\binom{p}{k}\). Donc</p><div class="fm">\[S_p = \sum_{k=0}^{p} \binom{n}{p}\binom{p}{k} = \binom{n}{p} \sum_{k=0}^{p} \binom{p}{k} = \binom{n}{p}\, 2^p\]</div><p>par la formule du binôme : \(\sum_{k=0}^{p} \binom{p}{k} = (1 + 1)^p = 2^p\).</p>`) +
        r`<p>Interprétation : on choisit les \(p\) jetons de l’hexagone, puis on décide pour chacun s’il va dans le triangle ou non (\(2^p\) façons), avec un nombre \(k\) quelconque de jetons dans le triangle. Vérifié par programme pour \(n \leq 15\).</p>` }],
    answer: r`<ul><li>1. \(N_1 = \binom{9}{2}\binom{7}{3} = 36 \times 35\) et \(N_2 = \binom{9}{5}\binom{5}{2} = 126 \times 10\) ; les deux valent \(1\,260\).</li><li>2. Les deux membres comptent les couples \((A, B)\), \(A \subset B \subset E\), \(\card(A) = k\), \(\card(B) = p\).</li><li>3. Les deux membres valent \(\dfrac{n!}{k!\,(p-k)!\,(n-p)!}\).</li><li>4. \(S_p = 2^p \binom{n}{p}\).</li></ul>`,
    traps: [
      r`Choix 1 : choisir les 3 jetons hors du triangle parmi 9 au lieu de 7 (les 2 du triangle ne sont plus disponibles).`,
      r`« Sans calcul » : une explication par le dénombrement est attendue, pas les factorielles (elles sont pour la question 3).`,
      r`Question 4 : \(\binom{n}{p}\) ne dépend pas de \(k\) : il sort de la somme.`],
    grading: '8,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: false, note: N24, near: ['p2023-dp-ex3', 'p2022-ex8', 'p2025-dp-ex3'],
    chk: { n1: '1260', n2: '1260', a: '36', b: '35', c: '126' } });

  add({ id: 'p2024-dp-ex4', exam: 'p2024-dp', ecue: 'dp', order: 4, src: 'Examen DP 2024 · Ex 4', pts: 6.5, lvl: 2, time: 15,
    title: 'Apprendre son cours et valider l’année', topics: ['conditionnelles', 'bayes'],
    intro: r`<p>Dans une promotion d’élèves à Epita, on considère que seuls 40 % apprennent leur cours de maths. Pour ceux qui apprennent le cours, la probabilité de valider l’année est de 80 %. Pour les autres, celle-ci tombe à 20 %. On note \(C\) l’événement « apprendre son cours » et \(V\) l’événement « valider l’année ». Vous donnerez les résultats sous forme de fraction simplifiée.</p>`,
    questions: [
      r`<b>1.</b> Traduire l’énoncé en termes de probabilités.`,
      r`<b>2.</b> On choisit un élève au hasard, quelle est sa probabilité de valider ?`,
      r`<b>3.</b> On choisit un élève qui valide l’année, au hasard. Quelle est la probabilité qu’il ait appris son cours ?`,
      r`<b>4.</b> Quelle proportion minimale \(p\) d’élèves qui apprennent leur cours faudrait-il pour que 60 % de la promotion valide ?`],
    hints: [
      r`« Pour ceux qui apprennent le cours, … 80 % » est une probabilité conditionnelle : \(\P(V \mid C)\).`,
      r`\(\{C, \overline{C}\}\) est une partition de \(\Omega\) : écris \(V = (V \cap C) \cup (V \cap \overline{C})\) avant la formule des probabilités totales.`,
      r`Question 4 : remplace \(\P(C) = 0{,}4\) par \(p\) dans le calcul de \(\P(V)\), puis résous \(\P(V) \geq 0{,}6\).`],
    solution: [
      { t: 'Question 1 : traduire', html: M(r`<p>L’énoncé donne : \(\P(C) = 0{,}4 = \dfrac{2}{5}\), \(\P(V \mid C) = 0{,}8 = \dfrac{4}{5}\) et \(\P(V \mid \overline{C}) = 0{,}2 = \dfrac{1}{5}\).</p>`) +
        T('tree', { first: [{ n: 'C', p: '2/5' }, { n: '\\overline{C}' }], second: { n: 'V', nb: '\\overline{V}', p: ['4/5', '1/5'] }, edit: false }) },
      { t: 'Question 2 : probabilités totales', html: M(r`<p>Comme \(\{C, \overline{C}\}\) forme une partition de \(\Omega\), on a \(V = (V \cap C) \cup (V \cap \overline{C})\) (union disjointe). D’où</p><div class="fm">\[\P(V) = \P(V \cap C) + \P(V \cap \overline{C}) = \P(V \mid C)\P(C) + \P(V \mid \overline{C})\P(\overline{C}) = \frac{4}{5} \times \frac{2}{5} + \frac{1}{5} \times \frac{3}{5} = \frac{8}{25} + \frac{3}{25} = \frac{11}{25}.\]</div>`) },
      { t: 'Question 3 : Bayes', html: M(r`<p>On cherche \(\P(C \mid V)\). On a</p><div class="fm">\[\P(C \mid V) = \frac{\P(V \cap C)}{\P(V)} = \frac{\P(V \mid C)\P(C)}{\P(V)} = \frac{8/25}{11/25} = \frac{8}{11}.\]</div>`) },
      { t: 'Question 4 : proportion minimale', html: M(r`<p>Notons \(p = \P(C) \in [0, 1]\). En raisonnant comme à la question 2 :</p><div class="fm">\[\P(V) = 0{,}8\,p + 0{,}2\,(1 - p) = 0{,}6\,p + 0{,}2.\]</div><p>On veut \(0{,}6\,p + 0{,}2 \geq 0{,}6\), soit \(0{,}6\,p \geq 0{,}4\), c’est-à-dire \(p \geq \dfrac{2}{3}\). Il faudrait qu’au moins deux tiers des élèves (environ 66,7 %) apprennent leur cours.</p>`) }],
    answer: r`<ul><li>1. \(\P(C) = \frac{2}{5}\), \(\P(V \mid C) = \frac{4}{5}\), \(\P(V \mid \overline{C}) = \frac{1}{5}\)</li><li>2. \(\P(V) = \frac{11}{25}\)</li><li>3. \(\P(C \mid V) = \frac{8}{11}\)</li><li>4. \(p \geq \frac{2}{3}\) : proportion minimale \(\frac{2}{3}\)</li></ul>`,
    traps: [
      r`Écrire \(\P(V \cap C) = 0{,}8\) : 80 % est la proportion parmi ceux qui apprennent, c’est \(\P(V \mid C)\).`,
      r`Question 3 : diviser par \(\P(C)\) au lieu de \(\P(V)\) (on sait que l’élève valide).`,
      r`Question 4 : oublier que la proportion des autres devient \(1 - p\).`],
    grading: '6,5 points pour l’exercice ; le sujet ne détaille pas les questions. Résultats en fractions simplifiées.',
    official: false, note: N24 + ' Même exercice, avec d’autres nombres, qu’à l’examen DP 2023 (exercice 4).', near: ['p2023-dp-ex4', 'p2025-dp-ex4'],
    chk: { pv: '11/25', bayes: '8/11', seuil: '2/3' } });

  add({ id: 'p2024-dp-ex5', exam: 'p2024-dp', ecue: 'dp', order: 5, src: 'Examen DP 2024 · Ex 5', pts: 6, lvl: 2, time: 15,
    title: r`Cours : démontrer \(\E(aX + b) = a\E(X) + b\) et \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\)`, topics: ['esperance', 'demonstrations'],
    intro: r`<p>Soient \(X\) une variable aléatoire finie telle que \(X(\Omega) = \{x_1, x_2, \cdots, x_n\}\) et \((a, b) \in \R^2\).</p>`,
    questions: [
      r`<b>1.</b> Rappeler les formules donnant l’espérance et la variance de \(X\) respectivement notées : \(\E(X)\) et \(\mathrm{Var}(X)\).`,
      r`<b>2.</b> Exprimer \(\E(aX + b)\) en fonction de \(a\), \(b\) et \(\E(X)\). Démontrer cette formule.`,
      r`<b>3.</b> Exprimer \(\mathrm{Var}(aX + b)\) en fonction de \(a\), \(b\) et \(\mathrm{Var}(X)\). Démontrer cette formule.`],
    hints: [
      r`Ce sont deux démonstrations du document « Démonstrations à connaître » : elles se récitent.`,
      r`Pour \(\E(aX + b)\) : \(aX + b = f(X)\) avec \(f(x) = ax + b\) ; utilise \(\E(f(X)) = \sum_i f(x_i)\P(X = x_i)\), puis coupe la somme en deux.`,
      r`Pour la variance : écris la définition, puis remarque que \((aX + b) - \E(aX + b) = a(X - \E(X))\).`],
    solution: [
      { t: 'Question 1 : les définitions', html: M(r`<div class="fm">\[\E(X) = \sum_{i=1}^{n} x_i\,\P(X = x_i) \qquad \mathrm{Var}(X) = \E\big((X - \E(X))^2\big) = \sum_{i=1}^{n} (x_i - \E(X))^2\,\P(X = x_i)\]</div>`) },
      { t: 'Question 2 : espérance de aX + b', html: r`<p>Formule : \(\E(aX + b) = a\E(X) + b\). La preuve est celle du cours.</p>` +
        M(r`<p>Notons \(Y = aX + b\). C’est une variable de la forme \(Y = f(X)\), où \(f\) est la fonction \(x \mapsto ax + b\). D’après le théorème de transfert,</p><div class="fm">\[\E(Y) = \sum_{i=1}^{n} \P(X = x_i)\,f(x_i) = \sum_{i=1}^{n} \P(X = x_i)\,(a x_i + b).\]</div><p>Or pour tout \(i \in \ent{1}{n}\), \(\P(X = x_i)(a x_i + b) = a\,\P(X = x_i)\,x_i + b\,\P(X = x_i)\). Ainsi, en coupant la somme en deux et en factorisant \(a\) dans la première, \(b\) dans la seconde :</p><div class="fm">\[\E(Y) = a \sum_{i=1}^{n} x_i\,\P(X = x_i) + b \sum_{i=1}^{n} \P(X = x_i).\]</div><p>La première somme vaut \(\E(X)\) ; la seconde vaut 1 (somme des probabilités de la loi de \(X\)). Finalement, \(\E(aX + b) = a\E(X) + b\).</p>`) },
      { t: 'Question 3 : variance de aX + b', html: r`<p>Formule : \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\) : elle ne dépend pas de \(b\).</p>` +
        M(r`<p>Par définition, \(\mathrm{Var}(aX + b) = \E\Big(\big((aX + b) - \E(aX + b)\big)^2\Big)\). Or, d’après la question 2, \(\E(aX + b) = a\E(X) + b\), donc</p><div class="fm">\[(aX + b) - \E(aX + b) = aX + b - a\E(X) - b = a\big(X - \E(X)\big).\]</div><p>D’où \(\mathrm{Var}(aX + b) = \E\big(a^2 (X - \E(X))^2\big) = a^2\,\E\big((X - \E(X))^2\big)\), en utilisant encore la question 2 (avec le coefficient \(a^2\) et \(b = 0\)). L’espérance obtenue est la variance de \(X\) : \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\).</p>`) }],
    answer: r`<ul><li>1. \(\E(X) = \sum_{i=1}^{n} x_i \P(X = x_i)\) ; \(\mathrm{Var}(X) = \sum_{i=1}^{n} (x_i - \E(X))^2 \P(X = x_i)\).</li><li>2. \(\E(aX + b) = a\E(X) + b\), par transfert et linéarité de la somme.</li><li>3. \(\mathrm{Var}(aX + b) = a^2\,\mathrm{Var}(X)\), qui ne dépend pas de \(b\).</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(aX + b) \neq a\,\mathrm{Var}(X) + b\) : le décalage \(b\) ne change pas la dispersion et \(a\) passe au carré.`,
      r`Oublier de dire pourquoi \(\sum_i \P(X = x_i) = 1\).`,
      r`Écrire « Koenig-Huygens » sans le démontrer quand l’énoncé dit « Démontrer ».`],
    grading: '6 points pour l’exercice ; le sujet ne détaille pas les questions. Les deux preuves sont celles du document « Démonstrations à connaître ».',
    official: false, note: N24 + ' Les preuves reprennent le document officiel « Démonstrations à connaître » du cours 2.', near: ['p2022-ex7', 'p2023-dp-ex5', 'p2025-dp-ex5'],
    chk: {} });

  add({ id: 'p2024-dp-ex6', exam: 'p2024-dp', ecue: 'dp', order: 6, src: 'Examen DP 2024 · Ex 6', pts: 9, lvl: 2, time: 22,
    title: 'Urne 0, 1, 1, 2 : loi, Bernoulli, binomiale sur 20 tirages', topics: ['variables', 'esperance', 'lois'],
    intro: r`<p>Dans une urne, il y a quatre boules, indiscernables au toucher, numérotées 0, 1, 1 et 2.</p><p>On tire au hasard successivement et avec remise 20 boules de l’urne. Les tirages sont indépendants.</p><p>N.B. : tous vos résultats seront donnés sous la forme d’une fraction simplifiée.</p>`,
    questions: [
      r`<b>1.</b> Soit \(k \in \ent{1}{20}\) fixé. On note \(X_k\) la variable aléatoire égale au numéro de la boule obtenue au \(k\)-ième tirage.<p>(a) Donner la loi de chaque \(X_k\).</p><p>(b) Calculer l’espérance de \(X_k\) (vous détaillerez vos calculs).</p><p>(c) Calculer la variance de \(X_k\) (vous détaillerez vos calculs).</p>`,
      r`<b>2.</b> Pour chaque tirage, on gagne un euro si la boule tirée porte le numéro 0 ou 1, sinon on ne gagne rien. On considère \(Y_k\) la variable aléatoire égale au gain obtenu au \(k\)-ième tirage (\(k \in \ent{1}{n}\) fixé).<p>(a) Donner la loi de \(Y_k\). Justifier.</p><p>(b) Donner son espérance et sa variance.</p>`,
      r`<b>3.</b> Soit \(Z\) la variable aléatoire égale au gain obtenu sur les 20 tirages.<p>(a) Écrire \(Z\) en fonction des \(Y_k\) en expliquant brièvement.</p><p>(b) En déduire, pour tout \(i \in Z(\Omega)\), \(\P(Z = i)\). Justifier.</p><p>(c) Vérifier que \(\displaystyle\sum_{i=0}^{20} \P(Z = i) = 1\).</p><p>(d) Calculer \(\E(Z)\) et \(\mathrm{Var}(Z)\) en justifiant.</p>`],
    hints: [
      r`Deux boules sur quatre portent le 1 : \(\P(X_k = 1) = \frac{2}{4}\). La loi, c’est \(X_k(\Omega)\) et toutes les probabilités.`,
      r`\(Y_k\) ne prend que les valeurs 0 et 1 : c’est une variable de Bernoulli. Son paramètre est \(\P(X_k \in \{0, 1\})\).`,
      r`\(Z = Y_1 + \cdots + Y_{20}\), somme de 20 variables de Bernoulli indépendantes de même paramètre : loi binomiale.`],
    solution: [
      { t: 'Question 1 : loi, espérance, variance de X_k', html: M(r`<p>(a) Les 4 boules sont équiprobables. \(X_k(\Omega) = \{0, 1, 2\}\) et \(\P(X_k = 0) = \dfrac{1}{4}\), \(\P(X_k = 1) = \dfrac{2}{4} = \dfrac{1}{2}\), \(\P(X_k = 2) = \dfrac{1}{4}\) (somme : 1).</p><p>(b) \(\E(X_k) = 0 \times \P(X_k = 0) + 1 \times \P(X_k = 1) + 2 \times \P(X_k = 2) = 0 + \dfrac{1}{2} + \dfrac{2}{4} = 1\).</p><p>(c) \(\E(X_k^2) = 0^2 \times \dfrac{1}{4} + 1^2 \times \dfrac{1}{2} + 2^2 \times \dfrac{1}{4} = \dfrac{1}{2} + 1 = \dfrac{3}{2}\). Par la formule de Koenig-Huygens, \(\mathrm{Var}(X_k) = \E(X_k^2) - (\E(X_k))^2 = \dfrac{3}{2} - 1 = \dfrac{1}{2}\).</p>`) +
        T('law', { x: [0, 1, 2], p: ['1/4', '1/2', '1/4'], name: 'X_k' }) },
      { t: 'Question 2 : la variable Y_k', html: M(r`<p>(a) \(Y_k\) vaut 1 si la boule porte 0 ou 1, et 0 sinon : \(Y_k(\Omega) = \{0, 1\}\) et</p><div class="fm">\[\P(Y_k = 1) = \P(X_k = 0) + \P(X_k = 1) = \frac{1}{4} + \frac{1}{2} = \frac{3}{4}, \qquad \P(Y_k = 0) = \P(X_k = 2) = \frac{1}{4}.\]</div><p>\(Y_k\) suit donc une loi de Bernoulli de paramètre \(\dfrac{3}{4}\).</p><p>(b) \(\E(Y_k) = 0 \times \dfrac{1}{4} + 1 \times \dfrac{3}{4} = \dfrac{3}{4}\) ; \(\E(Y_k^2) = \dfrac{3}{4}\), donc \(\mathrm{Var}(Y_k) = \dfrac{3}{4} - \dfrac{9}{16} = \dfrac{3}{16}\) (c’est \(p(1 - p)\)).</p>`) },
      { t: 'Question 3 : le gain total Z', html: M(r`<p>(a) Le gain total est la somme des gains de chaque tirage : \(Z = Y_1 + Y_2 + \cdots + Y_{20}\). Les tirages étant indépendants, les \(Y_k\) sont indépendantes.</p><p>(b) \(Z\) est la somme de 20 variables de Bernoulli indépendantes de même paramètre \(\frac{3}{4}\) : \(Z\) suit la loi binomiale de paramètres \(20\) et \(\frac{3}{4}\). Donc \(Z(\Omega) = \ent{0}{20}\) et</p><div class="fm">\[\forall i \in \ent{0}{20}, \quad \P(Z = i) = \binom{20}{i} \left(\frac{3}{4}\right)^i \left(\frac{1}{4}\right)^{20-i}.\]</div><p>(c) Par la formule du binôme de Newton :</p><div class="fm">\[\sum_{i=0}^{20} \P(Z = i) = \sum_{i=0}^{20} \binom{20}{i} \left(\frac{3}{4}\right)^i \left(\frac{1}{4}\right)^{20-i} = \left(\frac{3}{4} + \frac{1}{4}\right)^{20} = 1^{20} = 1.\]</div><p>(d) Par linéarité, \(\E(Z) = \E(Y_1) + \cdots + \E(Y_{20}) = 20 \times \dfrac{3}{4} = 15\). Comme \(Y_1, \ldots, Y_{20}\) sont indépendantes, \(\mathrm{Var}(Z) = \mathrm{Var}(Y_1) + \cdots + \mathrm{Var}(Y_{20}) = 20 \times \dfrac{3}{16} = \dfrac{15}{4}\).</p>`) +
        T('law', { law: 'binom', n: 20, p: '3/4', name: 'Z', edit: false }) }],
    answer: r`<ul><li>1. \(X_k(\Omega) = \{0, 1, 2\}\), probabilités \(\frac{1}{4}, \frac{1}{2}, \frac{1}{4}\) ; \(\E(X_k) = 1\) ; \(\mathrm{Var}(X_k) = \frac{1}{2}\).</li><li>2. \(Y_k\) suit la loi de Bernoulli de paramètre \(\frac{3}{4}\) ; \(\E(Y_k) = \frac{3}{4}\), \(\mathrm{Var}(Y_k) = \frac{3}{16}\).</li><li>3. \(Z = Y_1 + \cdots + Y_{20}\) suit la loi binomiale \(\mathcal{B}\left(20, \frac{3}{4}\right)\) ; \(\E(Z) = 15\), \(\mathrm{Var}(Z) = \frac{15}{4}\).</li></ul>`,
    traps: [
      r`\(\E(X_k^2) = \sum x_i^2\,\P(X_k = x_i)\), pas \((\E(X_k))^2\).`,
      r`Justifier la binomiale : « somme de variables de Bernoulli <b>indépendantes</b> de même paramètre ». Sans l’indépendance, ni la loi ni l’additivité des variances ne tiennent.`,
      r`\(\P(Z = i)\) est un seul terme \(\binom{20}{i} p^i (1-p)^{20-i}\), pas une somme.`,
      r`Coquille de l’énoncé : « \(k \in \ent{1}{n}\) » à la question 2, lire \(\ent{1}{20}\).`],
    grading: '9 points pour l’exercice ; le sujet ne détaille pas les questions. Calculs détaillés exigés en 1(b) et 1(c).',
    official: false, note: N24 + ' Même architecture que l’exercice 6 de l’examen DP 2023.', near: ['p2023-dp-ex6', 'p2025-dp-ex6'],
    chk: { e: '1', e2: '3/2', v: '1/2', py: '3/4', vy: '3/16', ez: '15', vz: '15/4' } });

  /* =====================================================================
     Examen OBM, octobre 2024 (promo 2029) — sans corrigé : réponses recalculées
     ===================================================================== */
  add({ id: 'p2024-obm-ex1', exam: 'p2024-obm', ecue: 'obm', order: 1, src: 'Examen OBM 2024 · Ex 1', pts: 10, lvl: 2, time: 30,
    title: 'Logique : conditions, quantificateurs, contraposée, double inclusion', topics: ['logique', 'quantificateurs', 'raisonnement', 'ensembles'],
    intro: r`<p>Les questions sont indépendantes.</p>`,
    questions: [
      r`<b>1.</b> Soit \(x \in \R\). On s’intéresse à la condition \(P\) : « \(x^2 > 4\) ». On dresse une liste de 5 propositions : (1) « \(x > -2\) », (2) « \(x < -10\) », (3) « \(x > 1{,}9\) », (4) « \(x < -3\) ou \(x > 3\) » et (5) « \(x < -2\) ou \(x > 2\) ».<p>(a) Donner la liste des implications du type « ……… \(\Rightarrow P\) » qui sont vraies.</p><p>(b) Donner la liste des implications du type « \(P \Rightarrow\) ……… » qui sont vraies.</p><p>(c) Pour chacune des implications vraies du 1.(b), donner leur négation.</p>`,
      r`<b>2.</b> On considère les assertions : \(P\) : « \(\forall x \in \R,\ \exists y \in \R,\ \cos(x) = y\) », \(Q\) : « \(\exists y \in \R,\ \forall x \in \R,\ x = \cos(y)\) » et \(R\) : « \(\exists x \in \R,\ \exists y \in \R,\ \cos(x) < \cos(y)\) ».<p>(a) \(P\), \(Q\) et \(R\) sont-elles vraies ? Justifier dans tous les cas.</p><p>(b) Donner la négation de \(P\), de \(Q\) et de \(R\).</p>`,
      r`<b>3.</b> Raisonnement par contraposée : soient \(A\) et \(B\) deux assertions.<p>(a) Écrire la contraposée de \(A \Rightarrow B\).</p><p>(b) Montrer que \(A \Rightarrow B\) et sa contraposée sont équivalentes.</p><p>(c) Application : soit \(a \in \R\). Montrer par contraposée que : \((\forall \varepsilon > 0,\ |a| \leq \varepsilon) \Rightarrow a = 0\). Vous prendrez soin de votre rédaction et vous écrirez clairement la contraposée dans ce cas là.</p><p>(d) La réciproque est-elle vraie ? Justifier.</p>`,
      r`<b>4.</b> Soient \(A = \{(x, y, z) \in \R^3,\ x = y = z\}\) et \(B = \{(x, y, z) \in \R^3,\ 2x - y - z = 0\}\).<p>(a) De quel ensemble \(A\) et \(B\) sont-ils des sous-ensembles ?</p><p>(b) Montrer soigneusement que \(A \subset B\).</p><p>(c) A-t-on \(B \subset A\) ? Justifier.</p>`],
    hints: [
      r`Question 1 : écris l’ensemble des \(x\) qui vérifient chaque condition. \(x^2 > 4 \Leftrightarrow x < -2\) ou \(x > 2\). « \(Q \Rightarrow P\) » est vraie quand l’ensemble de \(Q\) est inclus dans celui de \(P\).`,
      r`Question 2 : un \(\forall\) vrai se prouve pour un \(x\) quelconque ; un \(\exists\) vrai se prouve avec un témoin ; une assertion fausse se réfute par un contre-exemple (ou en prouvant sa négation).`,
      r`Question 3(c) : la contraposée de « \((\forall \varepsilon > 0,\ |a| \leq \varepsilon) \Rightarrow a = 0\) » est « \(a \neq 0 \Rightarrow \exists \varepsilon > 0,\ |a| > \varepsilon\) ». Essaie \(\varepsilon = \frac{|a|}{2}\).`],
    solution: [
      { t: 'Question 1 : conditions nécessaires, conditions suffisantes', html: r`<p>On écrit l’ensemble des réels qui vérifient chaque condition : \(P\) : \(]-\infty, -2[ \cup ]2, +\infty[\) ; (1) \(]-2, +\infty[\) ; (2) \(]-\infty, -10[\) ; (3) \(]1{,}9, +\infty[\) ; (4) \(]-\infty, -3[ \cup ]3, +\infty[\) ; (5) \(]-\infty, -2[ \cup ]2, +\infty[\). L’implication « \(Q \Rightarrow P\) » est vraie si l’ensemble de \(Q\) est inclus dans celui de \(P\).</p>` +
        M(r`<p>Pour tout réel \(x\), \(x^2 > 4 \Leftrightarrow |x| > 2 \Leftrightarrow (x < -2 \text{ ou } x > 2)\) : \(P\) est équivalente à (5).</p><p>(a) Les implications vraies sont (2) \(\Rightarrow P\), (4) \(\Rightarrow P\) et (5) \(\Rightarrow P\). Par exemple, si \(x < -3\) ou \(x > 3\), alors \(|x| > 3\), donc \(x^2 > 9 > 4\). En revanche (1) \(\Rightarrow P\) est fausse (\(x = 0\) : \(0 > -2\) mais \(0^2 = 0 \leq 4\)), et (3) \(\Rightarrow P\) aussi (\(x = 2\) : \(2 > 1{,}9\) mais \(2^2 = 4\)).</p><p>(b) La seule implication vraie est \(P \Rightarrow\) (5). Contre-exemples pour les autres : \(x = -3\) pour (1) et (3), \(x = 3\) pour (2), \(x = 2{,}5\) pour (4) (\(2{,}5^2 = 6{,}25 > 4\) mais \(-3 \leq 2{,}5 \leq 3\)).</p><p>(c) La négation de « \(P \Rightarrow\) (5) » est « \(P\) et non (5) », c’est-à-dire : « \(x^2 > 4\) et \(-2 \leq x \leq 2\) ».</p>`) +
        r`<p>La négation d’une implication n’est pas une implication : \(\neg(P \Rightarrow Q) \equiv P \land \neg Q\). Ici elle est fausse pour tout \(x\), ce qui est normal puisque l’implication est vraie. Si l’on lit l’implication pour tout \(x\) réel, sa négation est « \(\exists x \in \R,\ x^2 > 4\) et \(-2 \leq x \leq 2\) ».</p>` },
      { t: 'Question 2 : vrai ou faux, négations', html: M(r`<p>(a) \(P\) est vraie : soit \(x \in \R\) ; le réel \(y = \cos(x)\) convient.</p><p>\(Q\) est fausse : soit \(y \in \R\) ; pour \(x = \cos(y) + 1\), on a \(x \neq \cos(y)\). Donc aucun \(y\) ne convient pour tous les \(x\) (on a prouvé \(\neg Q\)).</p><p>\(R\) est vraie : pour \(x = \pi\) et \(y = 0\), \(\cos(\pi) = -1 < 1 = \cos(0)\).</p><p>(b) \(\neg P\) : « \(\exists x \in \R,\ \forall y \in \R,\ \cos(x) \neq y\) ».</p><p>\(\neg Q\) : « \(\forall y \in \R,\ \exists x \in \R,\ x \neq \cos(y)\) ».</p><p>\(\neg R\) : « \(\forall x \in \R,\ \forall y \in \R,\ \cos(x) \geq \cos(y)\) ».</p>`) +
        T('negate', { src: '\\exists y \\in \\R, \\forall x \\in \\R, x = \\cos(y)', edit: false }) },
      { t: 'Question 3 : contraposée', html: M(r`<p>(a) La contraposée de \(A \Rightarrow B\) est \(\neg B \Rightarrow \neg A\).</p><p>(b) On compare les tables de vérité : les deux colonnes sont identiques (seule la ligne \(A\) vraie, \(B\) fausse donne « faux »). Autre preuve : \((A \Rightarrow B) \Leftrightarrow (\neg A \lor B) \Leftrightarrow (B \lor \neg A) \Leftrightarrow (\neg(\neg B) \lor \neg A) \Leftrightarrow (\neg B \Rightarrow \neg A)\).</p>`) +
        T('truth', { f: ['A => B', '!B => !A'], edit: false }) +
        M(r`<p>(c) Soit \(a \in \R\). La contraposée de l’implication à démontrer est : « \(a \neq 0 \Rightarrow \exists \varepsilon > 0,\ |a| > \varepsilon\) ». Démontrons-la.</p><p>Supposons \(a \neq 0\). Posons \(\varepsilon = \dfrac{|a|}{2}\). Comme \(a \neq 0\), \(|a| > 0\), donc \(\varepsilon > 0\). De plus \(|a| = 2\varepsilon > \varepsilon\) car \(\varepsilon > 0\). On a trouvé \(\varepsilon > 0\) tel que \(|a| > \varepsilon\).</p><p>La contraposée est vraie, donc l’implication aussi : \((\forall \varepsilon > 0,\ |a| \leq \varepsilon) \Rightarrow a = 0\).</p><p>(d) La réciproque, « \(a = 0 \Rightarrow (\forall \varepsilon > 0,\ |a| \leq \varepsilon)\) », est vraie : si \(a = 0\), alors pour tout \(\varepsilon > 0\), \(|a| = 0 \leq \varepsilon\).</p>`, '3(c) et 3(d)') },
      { t: 'Question 4 : inclusions', html: M(r`<p>(a) \(A\) et \(B\) sont des sous-ensembles de \(\R^3\).</p><p>(b) Soit \((x, y, z) \in A\) fixé. Alors \(x = y = z\), donc \(2x - y - z = 2x - x - x = 0\), d’où \((x, y, z) \in B\). Ainsi \(A \subset B\).</p><p>(c) Non. Le triplet \((1, 2, 0)\) vérifie \(2 \times 1 - 2 - 0 = 0\), donc \((1, 2, 0) \in B\) ; mais \(1 \neq 2\), donc \((1, 2, 0) \notin A\). Ainsi \(B \not\subset A\).</p>`) }],
    answer: r`<ul><li>1(a) (2), (4) et (5) \(\Rightarrow P\) ; 1(b) \(P \Rightarrow\) (5) seulement ; 1(c) « \(x^2 > 4\) et \(-2 \leq x \leq 2\) ».</li><li>2(a) \(P\) vraie, \(Q\) fausse, \(R\) vraie ; 2(b) \(\exists x\, \forall y,\ \cos(x) \neq y\) ; \(\forall y\, \exists x,\ x \neq \cos(y)\) ; \(\forall x\, \forall y,\ \cos(x) \geq \cos(y)\).</li><li>3(a) \(\neg B \Rightarrow \neg A\) ; 3(c) contraposée : \(a \neq 0 \Rightarrow \exists \varepsilon > 0,\ |a| > \varepsilon\), avec \(\varepsilon = \frac{|a|}{2}\) ; 3(d) oui.</li><li>4(a) \(\R^3\) ; 4(b) soit \((x, y, z) \in A\)… ; 4(c) non : \((1, 2, 0) \in B \setminus A\).</li></ul>`,
    traps: [
      r`Le sens de la flèche : « … \(\Rightarrow P\) » demande des conditions suffisantes (ensembles inclus dans celui de \(P\)), « \(P \Rightarrow\) … » des conditions nécessaires.`,
      r`(3) « \(x > 1{,}9\) » n’est pas suffisante : \(x = 2\) donne \(x^2 = 4\), pas \(> 4\).`,
      r`Nier en gardant les ensembles : \(\neg(\forall \varepsilon > 0, \ldots)\) donne \(\exists \varepsilon > 0\), pas \(\exists \varepsilon \leq 0\) ; \(<\) devient \(\geq\).`,
      r`La négation d’une implication est une conjonction (« et »), jamais une implication.`,
      r`Pour \(B \not\subset A\), un seul contre-exemple chiffré suffit ; pour \(A \subset B\), il faut commencer par « Soit \((x, y, z) \in A\) ».`],
    grading: '10 points pour l’exercice ; le sujet ne détaille pas les questions. La rédaction de 3(c) est notée (« Vous prendrez soin de votre rédaction »).',
    official: false, note: 'Les annales n’ont pas de corrigé de ce sujet : correction rédigée sur le modèle des corrigés officiels, chaque ensemble de vérité recalculé par programme.',
    chk: { suff: '~2,4,5', nec: '~5', P: '~true', Q: '~false', R: '~true', ce: '(1,2,0)' } });

  add({ id: 'p2024-obm-ex2', exam: 'p2024-obm', ecue: 'obm', order: 2, src: 'Examen OBM 2024 · Ex 2', pts: 7, lvl: 2, time: 20,
    title: r`La fonction \((x, y) \mapsto x + y\) sur un produit cartésien`, topics: ['images', 'injections', 'ensembles'],
    intro: '',
    questions: [
      r`<b>1.</b> Soient \(A\) et \(B\) deux ensembles, \(f : A \to B\), \(I \subset A\) et \(J \subset B\). Rappeler la définition mathématique de \(f(I)\) et \(f^{-1}(J)\).`,
      r`<b>2.</b> Soient \(E = \{2, 3, 4\}\) et \(F = \{1, 2, 3\}\). On définit la fonction \(f : E \times F \to \N,\ (x, y) \mapsto x + y\).<p>(a) Remplir le tableau de valeurs de la fonction \(f\) (une ligne \((x, y)\), une ligne \(f((x, y))\)).</p><p>(b) Déterminer \(f(E \times F)\), \(f(\{(2, 2), (4, 3)\})\), \(f^{-1}(\{1\})\) et \(f^{-1}(\{6\})\).</p><p>(c) Écrire la définition mathématique de : « \(f\) injective de \(E \times F\) vers \(\N\) ». \(f\) est-elle injective ? Justifier.</p><p>(d) Écrire la définition mathématique de : « \(f\) surjective de \(E \times F\) vers \(\N\) ». \(f\) est-elle surjective ? Justifier.</p><p>(e) Déterminer \(I \subset E \times F\) et \(J \subset \N\) tels que \(f : I \to J\) soit injective, non surjective. (Les ensembles \(I\) et \(J\) doivent contenir au moins deux éléments).</p><p>(f) Déterminer \(I' \subset E \times F\) et \(J' \subset \N\) tels que \(f : I' \to J'\) soit surjective, non injective. (Les ensembles \(I'\) et \(J'\) doivent contenir au moins deux éléments).</p>`],
    hints: [
      r`\(E \times F\) a \(3 \times 3 = 9\) éléments : les couples \((x, y)\) avec \(x \in E\) et \(y \in F\). Calcule les 9 sommes.`,
      r`Non injective : deux couples distincts de même image. Non surjective : un entier naturel sans antécédent.`,
      r`Pour (e) et (f), il faut aussi \(f(I) \subset J\) : chaque élément de \(I\) doit avoir son image dans \(J\).`],
    solution: [
      { t: 'Question 1 : définitions', html: M(r`<div class="fm">\[f(I) = \{f(x),\ x \in I\} = \{y \in B,\ \exists x \in I,\ y = f(x)\} \qquad f^{-1}(J) = \{x \in A,\ f(x) \in J\}\]</div>`) },
      { t: 'Question 2(a)-(b) : tableau, images', html: '<div class="tbl"><table><thead><tr><th scope="row">\\((x, y)\\)</th><td>(2, 1)</td><td>(2, 2)</td><td>(2, 3)</td><td>(3, 1)</td><td>(3, 2)</td><td>(3, 3)</td><td>(4, 1)</td><td>(4, 2)</td><td>(4, 3)</td></tr></thead><tbody><tr><th scope="row">\\(f((x, y))\\)</th><td>3</td><td>4</td><td>5</td><td>4</td><td>5</td><td>6</td><td>5</td><td>6</td><td>7</td></tr></tbody></table></div>' +
        M(r`<p>D’après le tableau : \(f(E \times F) = \{3, 4, 5, 6, 7\}\) ; \(f(\{(2, 2), (4, 3)\}) = \{4, 7\}\) ; \(f^{-1}(\{1\}) = \varnothing\) (aucune somme ne vaut 1) ; \(f^{-1}(\{6\}) = \{(3, 3), (4, 2)\}\).</p>`) },
      { t: 'Question 2(c)-(d) : injective, surjective', html: M(r`<p>(c) \(f\) est injective de \(E \times F\) vers \(\N\) si : \(\forall \big((x, y), (x', y')\big) \in (E \times F)^2,\ f((x, y)) = f((x', y')) \Rightarrow (x, y) = (x', y')\).</p><p>\(f\) n’est pas injective : \(f((2, 2)) = f((3, 1)) = 4\) et \((2, 2) \neq (3, 1)\).</p><p>(d) \(f\) est surjective de \(E \times F\) vers \(\N\) si : \(\forall n \in \N,\ \exists (x, y) \in E \times F,\ n = f((x, y))\).</p><p>\(f\) n’est pas surjective : \(0 \in \N\) n’a pas d’antécédent, car toutes les images sont dans \(\{3, \ldots, 7\}\).</p>`) },
      { t: 'Question 2(e)-(f) : restreindre', html: M(r`<p>(e) Prenons \(I = \{(2, 1), (2, 2)\}\) et \(J = \{3, 4, 5\}\). On a \(f((2, 1)) = 3\) et \(f((2, 2)) = 4\) : deux éléments distincts de \(I\) ont des images distinctes, et ces images sont dans \(J\), donc \(f : I \to J\) est injective. Elle n’est pas surjective : \(5\) n’a pas d’antécédent dans \(I\).</p><p>(f) Prenons \(I' = \{(2, 1), (2, 2), (3, 1)\}\) et \(J' = \{3, 4\}\). On a \(f(I') = \{3, 4\} = J'\) : \(f : I' \to J'\) est surjective. Elle n’est pas injective : \(f((2, 2)) = f((3, 1)) = 4\) avec \((2, 2) \neq (3, 1)\).</p>`) +
        r`<p>D’autres choix conviennent : il suffit que les images de \(I\) soient distinctes et que \(J\) contienne une valeur de plus, et que \(I'\) contienne deux couples de même somme, avec \(J' = f(I')\).</p>` }],
    answer: r`<ul><li>1. \(f(I) = \{f(x),\ x \in I\}\), \(f^{-1}(J) = \{x \in A,\ f(x) \in J\}\).</li><li>2(b) \(f(E \times F) = \{3, 4, 5, 6, 7\}\) ; \(f(\{(2, 2), (4, 3)\}) = \{4, 7\}\) ; \(f^{-1}(\{1\}) = \varnothing\) ; \(f^{-1}(\{6\}) = \{(3, 3), (4, 2)\}\).</li><li>2(c) non injective : \(f((2, 2)) = f((3, 1))\) ; 2(d) non surjective : 0 n’a pas d’antécédent.</li><li>2(e) \(I = \{(2, 1), (2, 2)\}\), \(J = \{3, 4, 5\}\) ; 2(f) \(I' = \{(2, 1), (2, 2), (3, 1)\}\), \(J' = \{3, 4\}\).</li></ul>`,
    traps: [
      r`\(f^{-1}(\{6\})\) est un ensemble de <b>couples</b> : \(\{(3, 3), (4, 2)\}\), pas \(\{3, 4\}\).`,
      r`Une image réciproque vide s’écrit \(\varnothing\), pas « n’existe pas ».`,
      r`(e) et (f) : vérifier que \(f(I) \subset J\), sinon \(f : I \to J\) n’est même pas une fonction.`],
    grading: '7 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: false, note: 'Les annales n’ont pas de corrigé de ce sujet : tableau, images et restrictions recalculés par programme.',
    chk: { img: '{3,4,5,6,7}', img2: '{4,7}', pre1: '~empty', pre6: '{(3,3),(4,2)}', inj: '~false', surj: '~false', e: '~ok', f: '~ok' } });

  add({ id: 'p2024-obm-ex3', exam: 'p2024-obm', ecue: 'obm', order: 3, src: 'Examen OBM 2024 · Ex 3', pts: 3, lvl: 1, time: 8,
    title: 'Tableau d’images directes et réciproques par exp et cos', topics: ['images', 'usuelles'],
    intro: r`<p>Compléter le tableau suivant.</p><p>N.B. : nous vous conseillons de dessiner le graphe des fonctions concernées au brouillon ! Bien sûr, la fonction exp est la fonction \(x \mapsto e^x\) et la fonction cos est \(x \mapsto \cos(x)\).</p><div class="tbl"><table><thead><tr><th scope="col">\(f\)</th><th scope="col">\(\exp : \R \to \R\)</th><th scope="col">\(\cos : [0, \pi] \to \R\)</th></tr></thead><tbody><tr><th scope="row">\(f(\{0\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f\left(\left[0, \frac{\pi}{2}\right]\right)\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{0\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(\{-1\})\)</th><td></td><td></td></tr><tr><th scope="row">\(f^{-1}(]-\infty, 0])\)</th><td></td><td></td></tr></tbody></table></div>`,
    questions: [],
    hints: [
      r`exp est strictement croissante sur \(\R\) et ne prend que des valeurs strictement positives.`,
      r`Sur \([0, \pi]\), cos est strictement décroissante de 1 à −1. Une image réciproque se cherche <b>dans l’ensemble de départ</b> \([0, \pi]\).`],
    solution: [
      { t: 'Colonne exp', html: M(r`<p>exp est continue et strictement croissante sur \(\R\), à valeurs dans \(]0, +\infty[\).</p><p>\(\exp(\{0\}) = \{e^0\} = \{1\}\) ; \(\exp\left(\left[0, \frac{\pi}{2}\right]\right) = \left[1, e^{\pi/2}\right]\) (croissante : les bornes sont atteintes en 0 et \(\frac{\pi}{2}\)) ; \(\exp^{-1}(\{0\}) = \varnothing\), \(\exp^{-1}(\{-1\}) = \varnothing\) et \(\exp^{-1}(]-\infty, 0]) = \varnothing\), car \(\forall x \in \R,\ e^x > 0\).</p>`) },
      { t: 'Colonne cos', html: M(r`<p>Sur \([0, \pi]\), cos est continue et strictement décroissante, de \(\cos(0) = 1\) à \(\cos(\pi) = -1\).</p><p>\(\cos(\{0\}) = \{1\}\) ; \(\cos\left(\left[0, \frac{\pi}{2}\right]\right) = [0, 1]\) ; \(\cos^{-1}(\{0\}) = \left\{\frac{\pi}{2}\right\}\) (seule solution de \(\cos(x) = 0\) dans \([0, \pi]\)) ; \(\cos^{-1}(\{-1\}) = \{\pi\}\) ; \(\cos^{-1}(]-\infty, 0]) = \left[\frac{\pi}{2}, \pi\right]\).</p>`) }],
    answer: '<div class="tbl"><table><thead><tr><th scope="col">\\(f\\)</th><th scope="col">\\(\\exp : \\R \\to \\R\\)</th><th scope="col">\\(\\cos : [0, \\pi] \\to \\R\\)</th></tr></thead><tbody><tr><th scope="row">\\(f(\\{0\\})\\)</th><td>\\(\\{1\\}\\)</td><td>\\(\\{1\\}\\)</td></tr><tr><th scope="row">\\(f([0, \\frac{\\pi}{2}])\\)</th><td>\\([1, e^{\\pi/2}]\\)</td><td>\\([0, 1]\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{0\\})\\)</th><td>\\(\\varnothing\\)</td><td>\\(\\{\\frac{\\pi}{2}\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(\\{-1\\})\\)</th><td>\\(\\varnothing\\)</td><td>\\(\\{\\pi\\}\\)</td></tr><tr><th scope="row">\\(f^{-1}(]-\\infty, 0])\\)</th><td>\\(\\varnothing\\)</td><td>\\([\\frac{\\pi}{2}, \\pi]\\)</td></tr></tbody></table></div>',
    traps: [
      r`\(\cos^{-1}(\{0\})\) n’est pas \(\left\{\frac{\pi}{2} + k\pi,\ k \in \Z\right\}\) : la fonction est définie sur \([0, \pi]\) seulement.`,
      r`Ne pas confondre \(f^{-1}(\{0\})\) (un ensemble, éventuellement vide) avec une bijection réciproque.`,
      r`\(\exp^{-1}(\{0\}) = \varnothing\) : l’exponentielle ne s’annule jamais.`],
    grading: '3 points pour les 10 cases ; le sujet ne détaille pas le barème. Seuls les résultats sont demandés.',
    official: false, note: 'Les annales n’ont pas de corrigé de ce sujet : chaque case recalculée par programme (grille fine et calcul exact).',
    chk: { e2: '[1,e^{\\pi/2}]', c2: '[0,1]', c3: '{\\pi/2}', c4: '{\\pi}', c5: '[\\pi/2,\\pi]' } });

  add({ id: 'p2024-obm-ex4', exam: 'p2024-obm', ecue: 'obm', order: 4, src: 'Examen OBM 2024 · Ex 4', pts: 4, lvl: 1, time: 10,
    title: r`Relation \(|a| \leq |b|\) sur \(\R\)`, topics: ['relations'],
    intro: r`<p>Dans \(\R\), on définit la relation \(\mathcal{R}\) par : \(\forall (a, b) \in \R^2,\ a \mathrel{\mathcal{R}} b \Leftrightarrow |a| \leq |b|\).</p>`,
    questions: [
      r`<b>1.</b> Après avoir rappelé la définition, dire si \(\mathcal{R}\) est réflexive. Justifier.`,
      r`<b>2.</b> Après avoir rappelé la définition, dire si \(\mathcal{R}\) est symétrique. Justifier.`,
      r`<b>3.</b> Après avoir rappelé la définition, dire si \(\mathcal{R}\) est antisymétrique. Justifier.`,
      r`<b>4.</b> Après avoir rappelé la définition, dire si \(\mathcal{R}\) est transitive. Justifier.`],
    hints: [
      r`Écris chaque définition avec ses quantificateurs, puis remplace \(a \mathrel{\mathcal{R}} b\) par \(|a| \leq |b|\).`,
      r`Pour l’antisymétrie, pense à deux réels opposés : ils ont la même valeur absolue.`],
    solution: [
      { t: 'Les quatre propriétés', html: M(r`<p>1. \(\mathcal{R}\) est réflexive si \(\forall a \in \R,\ a \mathrel{\mathcal{R}} a\). Soit \(a \in \R\) : \(|a| \leq |a|\), donc \(a \mathrel{\mathcal{R}} a\). \(\mathcal{R}\) est réflexive.</p><p>2. \(\mathcal{R}\) est symétrique si \(\forall (a, b) \in \R^2,\ a \mathrel{\mathcal{R}} b \Rightarrow b \mathrel{\mathcal{R}} a\). Ici \(1 \mathrel{\mathcal{R}} 2\) car \(|1| \leq |2|\), mais \(|2| > |1|\), donc 2 n’est pas en relation avec 1. \(\mathcal{R}\) n’est pas symétrique.</p><p>3. \(\mathcal{R}\) est antisymétrique si \(\forall (a, b) \in \R^2,\ (a \mathrel{\mathcal{R}} b \text{ et } b \mathrel{\mathcal{R}} a) \Rightarrow a = b\). Ici \(-1 \mathrel{\mathcal{R}} 1\) et \(1 \mathrel{\mathcal{R}} -1\) (\(|-1| = |1|\)), pourtant \(-1 \neq 1\). \(\mathcal{R}\) n’est pas antisymétrique.</p><p>4. \(\mathcal{R}\) est transitive si \(\forall (a, b, c) \in \R^3,\ (a \mathrel{\mathcal{R}} b \text{ et } b \mathrel{\mathcal{R}} c) \Rightarrow a \mathrel{\mathcal{R}} c\). Soit \((a, b, c) \in \R^3\) tel que \(a \mathrel{\mathcal{R}} b\) et \(b \mathrel{\mathcal{R}} c\). Alors \(|a| \leq |b|\) et \(|b| \leq |c|\), donc \(|a| \leq |c|\), c’est-à-dire \(a \mathrel{\mathcal{R}} c\). \(\mathcal{R}\) est transitive.</p>`) +
        r`<p>\(\mathcal{R}\) n’est donc ni une relation d’ordre (pas antisymétrique) ni une relation d’équivalence (pas symétrique).</p>` }],
    answer: r`<ul><li>1. Réflexive : \(|a| \leq |a|\).</li><li>2. Non symétrique : \(1 \mathrel{\mathcal{R}} 2\) mais pas \(2 \mathrel{\mathcal{R}} 1\).</li><li>3. Non antisymétrique : \(-1 \mathrel{\mathcal{R}} 1\), \(1 \mathrel{\mathcal{R}} -1\) et \(-1 \neq 1\).</li><li>4. Transitive.</li></ul>`,
    traps: [
      r`« Après avoir rappelé la définition » : la définition avec quantificateurs rapporte des points, même quand la propriété est fausse.`,
      r`Antisymétrique ne veut pas dire « non symétrique » : ici la relation n’est ni l’une ni l’autre.`,
      r`Une propriété fausse se réfute par un contre-exemple chiffré ; une propriété vraie se prouve pour des éléments quelconques (« Soit… »).`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: false, note: 'Les annales n’ont pas de corrigé de ce sujet : propriétés vérifiées par programme sur une grille de réels.', near: ['p2021-ex1'],
    chk: { refl: '~true', sym: '~false', anti: '~false', trans: '~true' } });

  /* =====================================================================
     Examen DP, octobre 2023 (promo 2028) — corrigé officiel français et anglais
     ===================================================================== */
  add({ id: 'p2023-dp-ex1', exam: 'p2023-dp', ecue: 'dp', order: 1, src: 'Examen DP 2023 · Ex 1', pts: 3, lvl: 1, time: 10,
    title: 'Cardinal : partition et formule du crible', topics: ['cardinal'],
    intro: '',
    questions: [
      r`<b>1.</b> Soient \(F\) et \(G\) deux ensembles finis et disjoints. Donner \(\card(F \cup G)\).`,
      r`<b>2.</b> Soient \(E\) un ensemble fini et \(A\) et \(B\) deux sous-ensembles de \(E\) quelconques (non nécessairement disjoints).<p>(a) En utilisant une partition de \(A\), trouver une relation entre \(\card(A)\), \(\card(A \setminus B)\) et \(\card(A \cap B)\). Vous pouvez vous aider d’un dessin… N.B. : \(A \setminus B = \{x \in E ;\ x \in A \land x \notin B\}\).</p><p>(b) Donner \(\card(A \cup B)\).</p><p>(c) En utilisant une partition de \(A \cup B\) et la question 2.(a), démontrer le résultat précédent.</p>`],
    hints: [
      r`Un élément de \(A\) est soit dans \(B\), soit hors de \(B\) : \(A\) se coupe en deux morceaux disjoints.`,
      r`Pour \(A \cup B\) : prends tout \(B\), puis les éléments de \(A\) qui ne sont pas dans \(B\).`],
    solution: [
      { t: 'Question 1 : union disjointe', html: M(r`<p>\(F\) et \(G\) sont disjoints : \(\card(F \cup G) = \card(F) + \card(G)\).</p>`) },
      { t: 'Question 2(a) : une partition de A', html: T('venn', { compare: ['A', '(A - B) | (A & B)'] }) +
        M(r`<p>On a \(A = (A \setminus B) \cup (A \cap B)\) et cette union est disjointe (un élément de \(A \setminus B\) n’est pas dans \(B\), un élément de \(A \cap B\) y est). On peut donc appliquer la formule de la question 1 pour \(F = A \setminus B\) et \(G = A \cap B\). Ainsi,</p><div class="fm">\[\card(A) = \card\big((A \setminus B) \cup (A \cap B)\big) = \card(A \setminus B) + \card(A \cap B).\]</div>`) },
      { t: 'Question 2(b) : la formule du crible', html: M(r`<p>\(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B)\).</p>`) },
      { t: 'Question 2(c) : la démonstration', html: T('venn', { compare: ['A | B', '(A - B) | B'] }) +
        M(r`<p>On a \(A \cup B = (A \setminus B) \cup B\) et cette union est disjointe. Ainsi, par la question 1 puis par la question 2.(a) :</p><div class="fm">\[\card(A \cup B) = \card(A \setminus B) + \card(B) = \card(A) - \card(A \cap B) + \card(B).\]</div>`) }],
    answer: r`<ul><li>1. \(\card(F \cup G) = \card(F) + \card(G)\).</li><li>2(a) \(A = (A \setminus B) \sqcup (A \cap B)\), donc \(\card(A) = \card(A \setminus B) + \card(A \cap B)\).</li><li>2(b) \(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B)\).</li><li>2(c) \(A \cup B = (A \setminus B) \sqcup B\), puis 2(a).</li></ul>`,
    traps: [
      r`Oublier \(-\card(A \cap B)\) : les éléments de \(A \cap B\) seraient comptés deux fois.`,
      r`Écrire « union disjointe » sans le justifier, ou utiliser une union qui ne l’est pas, comme \(A \cup B\) elle-même.`,
      r`Confondre \(A \setminus B\) et \(B \setminus A\).`],
    grading: '3 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel (français et anglais). La formule du crible a été vérifiée par programme sur des milliers de couples de parties.',
    chk: {} });

  add({ id: 'p2023-dp-ex2', exam: 'p2023-dp', ecue: 'dp', order: 2, src: 'Examen DP 2023 · Ex 2', pts: 7, lvl: 1, time: 18,
    title: 'Les podiums d’une course de 20 cyclistes', topics: ['denombrement'],
    intro: r`<p>Une course cycliste oppose 20 concurrents. Le podium est composé du classement des trois premiers arrivés. Pierre et Jade font partie des 20 concurrents.</p><p>Vous justifierez brièvement vos réponses. Vous simplifierez vos résultats sans faire les calculs jusqu’au bout…</p>`,
    questions: [
      r`<b>1.</b> Combien y a-t-il de podiums possibles ?`,
      r`<b>2.</b> Combien y a-t-il de podiums possibles dans lesquels Jade est première ?`,
      r`<b>3.</b> Combien y a-t-il de podiums possibles sans Pierre ni Jade ?`,
      r`<b>4.</b> Combien y a-t-il de podiums possibles dans lesquels Pierre en fait partie mais pas Jade ?`,
      r`<b>5.</b> Combien y a-t-il de podiums possibles dans lesquels il y a au moins Jade ou Pierre ?`,
      r`<b>6.</b> L’organisateur souhaite récompenser, sans distinction, les trois premiers en leur offrant un vélo chacun. Combien y a-t-il de récompenses possibles ?`],
    hints: [
      'Un podium est un classement : l’ordre compte (1er, 2e, 3e) et un coureur ne peut pas occuper deux places.',
      '« Pierre mais pas Jade » : choisis d’abord la place de Pierre, puis remplis les deux autres places sans Jade ni Pierre.',
      '« Au moins Jade ou Pierre » : passe par le complémentaire. Question 6 : l’ordre ne compte plus.'],
    solution: [
      { t: 'Question 1 : podiums', html: M(r`<p>Pour le 1er de la course, il y a 20 possibilités ; pour le 2e, il en reste 19 ; pour le 3e, 18. Au total, il y a \(20 \times 19 \times 18 = A_{20}^3\) podiums possibles.</p>`) + r`<p>Valeur : \(6\,840\).</p>` },
      { t: 'Question 2 : Jade première', html: M(r`<p>Jade est première : il reste 19 possibilités pour le second et 18 pour le troisième. Il y a \(19 \times 18\) podiums dans lesquels Jade est première.</p>`) + r`<p>Valeur : \(342\).</p>` },
      { t: 'Question 3 : sans Pierre ni Jade', html: M(r`<p>On enlève Jade et Pierre, ce qui laisse 18 concurrents. On est ramené à la question 1 avec 18 au lieu de 20 : \(18 \times 17 \times 16\) podiums.</p>`) + r`<p>Valeur : \(4\,896\).</p>` },
      { t: 'Question 4 : Pierre mais pas Jade', html: M(r`<p>Jade n’est pas sur le podium. Pierre peut être premier : il reste alors 18 choix pour le second (ni Jade ni Pierre) et 17 pour le troisième. Même chose si Pierre est second ou troisième. Au total, \(3 \times 18 \times 17\) podiums.</p>`) + r`<p>Valeur : \(918\).</p>` },
      { t: 'Question 5 : au moins Jade ou Pierre', html: M(r`<p>On passe par le complémentaire : parmi les \(20 \times 19 \times 18\) podiums, \(18 \times 17 \times 16\) n’ont ni Jade ni Pierre (question 3). Il y a donc \(20 \times 19 \times 18 - 18 \times 17 \times 16\) podiums avec au moins Jade ou Pierre.</p>`) +
        r`<p>Valeur : \(6\,840 - 4\,896 = 1\,944\). Vérification : Pierre sans Jade (918) + Jade sans Pierre (918) + les deux (\(3 \times 2 \times 18 = 108\)) = 1 944.</p>` },
      { t: 'Question 6 : trois vélos identiques', html: M(r`<p>L’ordre n’a plus d’importance : cela revient à choisir 3 personnes parmi les 20 concurrents. Il y a \(\dbinom{20}{3} = \dfrac{20!}{3!\,17!} = \dfrac{20 \times 19 \times 18}{6} = 20 \times 19 \times 3\) récompenses possibles.</p>`) + r`<p>Valeur : \(1\,140\). Chaque groupe de 3 correspond à \(3! = 6\) podiums : \(6\,840 / 6 = 1\,140\).</p>` }],
    answer: r`<ul><li>1. \(20 \times 19 \times 18 = 6\,840\)</li><li>2. \(19 \times 18 = 342\)</li><li>3. \(18 \times 17 \times 16 = 4\,896\)</li><li>4. \(3 \times 18 \times 17 = 918\)</li><li>5. \(20 \times 19 \times 18 - 18 \times 17 \times 16 = 1\,944\)</li><li>6. \(\binom{20}{3} = 1\,140\)</li></ul>`,
    traps: [
      r`Question 4 : \(19 \times 18 \times 17\) compte aussi les podiums sans Pierre ; et \(18 \times 17\) oublie que Pierre a 3 places possibles.`,
      r`Question 5 : additionner « Pierre » et « Jade » compte deux fois les podiums où ils sont tous les deux.`,
      r`Question 6 : l’ordre ne compte plus, c’est \(\binom{20}{3}\) et non \(A_{20}^3\).`],
    grading: '7 points pour l’exercice ; le sujet ne détaille pas les questions. Résultats simplifiés acceptés sans calcul final.',
    official: true, note: 'Rédaction du corrigé officiel. Valeurs vérifiées par énumération des 6 840 podiums.', near: ['p2024-dp-ex2'],
    chk: { q1: '6840', q2: '342', q3: '4896', q4: '918', q5: '1944', q6: '1140' } });

  add({ id: 'p2023-dp-ex3', exam: 'p2023-dp', ecue: 'dp', order: 3, src: 'Examen DP 2023 · Ex 3', pts: 5, lvl: 2, time: 15,
    title: 'Boules vertes et rouges : la formule de Vandermonde', topics: ['denombrement', 'binomial'],
    intro: r`<p>Soit \((n, p) \in \N^2\).</p><p>Une urne contient \(p\) boules vertes et \(n\) boules rouges indiscernables au toucher.</p><p>Soit \(k \in \ent{0}{n+p}\) avec \(k \leq n\) et \(k \leq p\). On effectue un tirage simultané de \(k\) boules de l’urne.</p>`,
    questions: [
      r`<b>1.</b> Combien y a-t-il de tirages possibles ?`,
      r`<b>2.</b> Soit \(i \in \ent{0}{k}\). Combien y a-t-il de tirages (simultanés) ayant \(i\) boules vertes et \(k - i\) boules rouges ?`,
      r`<b>3.</b> En déduire la formule \(\displaystyle\sum_{i=0}^{k} \binom{p}{i}\binom{n}{k-i} = \binom{n+p}{k}\). Justifier proprement.`,
      r`<b>4.</b> Application : calculer \(\displaystyle\sum_{i=0}^{4} \binom{4}{i}\binom{7}{4-i}\). Vous donnerez le résultat sous la forme d’un entier.`],
    hints: [
      r`Un tirage simultané de \(k\) boules est une partie à \(k\) éléments de l’ensemble des \(n + p\) boules.`,
      r`Classe les tirages selon leur nombre \(i\) de boules vertes : les cas \(i = 0, 1, \ldots, k\) sont disjoints et couvrent tous les tirages.`,
      r`Application : reconnais \(p = 4\), \(n = 7\), \(k = 4\).`],
    solution: [
      { t: 'Question 1', html: M(r`<p>Un tirage simultané de \(k\) boules revient à choisir \(k\) boules parmi les \(n + p\) boules de l’urne. Il y a \(\dbinom{n+p}{k}\) tirages possibles.</p>`) },
      { t: 'Question 2', html: M(r`<p>Il y a \(\binom{p}{i}\) façons de prendre les \(i\) boules vertes parmi les \(p\) vertes et \(\binom{n}{k-i}\) façons de prendre les \(k - i\) boules rouges parmi les \(n\) rouges. Au total, il y a \(\dbinom{p}{i} \times \dbinom{n}{k-i}\) tirages.</p>`) },
      { t: 'Question 3 : double dénombrement', html: M(r`<p>Pour prendre \(k\) boules, on peut prendre : 0 boule verte et \(k\) boules rouges, ou 1 boule verte et \(k - 1\) boules rouges, ou 2 boules vertes et \(k - 2\) boules rouges, etc., jusqu’à \(k\) boules vertes et 0 boule rouge. Ces cas sont disjoints (un tirage a un seul nombre de boules vertes) et couvrent tous les tirages. Par la question 2, cela donne \(\displaystyle\sum_{i=0}^{k} \binom{p}{i}\binom{n}{k-i}\) tirages possibles. Comme on a vu à la question 1 qu’il y a \(\binom{n+p}{k}\) tirages possibles, on en déduit :</p><div class="fm">\[\sum_{i=0}^{k} \binom{p}{i}\binom{n}{k-i} = \binom{n+p}{k}.\]</div>`) },
      { t: 'Question 4 : application', html: M(r`<p>Ici \(k = 4\), \(p = 4\) et \(n = 7\). Ainsi,</p><div class="fm">\[\sum_{i=0}^{4} \binom{4}{i}\binom{7}{4-i} = \binom{11}{4} = \frac{11!}{4!\,7!} = \frac{8 \times 9 \times 10 \times 11}{2 \times 3 \times 4} = 3 \times 10 \times 11 = 330.\]</div>`) +
        r`<p>Vérification terme à terme : \(35 + 4 \times 35 + 6 \times 21 + 4 \times 7 + 1 = 35 + 140 + 126 + 28 + 1 = 330\).</p>` }],
    answer: r`<ul><li>1. \(\binom{n+p}{k}\)</li><li>2. \(\binom{p}{i}\binom{n}{k-i}\)</li><li>3. Partition des tirages selon le nombre \(i\) de boules vertes (cas disjoints), puis comparaison avec la question 1.</li><li>4. \(\binom{11}{4} = 330\)</li></ul>`,
    traps: [
      r`Oublier de dire que les cas sont disjoints : c’est ce qui permet d’additionner (le corrigé anglais l’écrit : « These different cases are disjoint »).`,
      r`Inverser les rôles : \(\binom{p}{i}\) pour les vertes (il y en a \(p\)), \(\binom{n}{k-i}\) pour les rouges.`,
      r`« Sous la forme d’un entier » : finir le calcul jusqu’à 330.`],
    grading: '5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel. Formule vérifiée par programme pour tous \\(n, p \\leq 10\\) ; application recalculée.', near: ['p2024-dp-ex3'],
    chk: { q4: '330' } });

  add({ id: 'p2023-dp-ex4', exam: 'p2023-dp', ecue: 'dp', order: 4, src: 'Examen DP 2023 · Ex 4', pts: 5, lvl: 2, time: 14,
    title: 'Soutien en maths : probabilités totales, Bayes, seuil', topics: ['conditionnelles', 'bayes'],
    intro: r`<p>Des cours de soutien en mathématiques sont proposés aux étudiants de S1 d’Epita. Pour la promotion actuelle, la probabilité qu’un élève vienne en soutien est de 10 %. Si un élève vient en soutien, la probabilité qu’il valide l’UE de maths du S1 est de 80 %, sinon, cette probabilité tombe à 30 %.</p><p>On notera \(V\) l’événement « l’élève valide son UE de maths du S1 » et \(S\) l’événement « l’élève vient en soutien ».</p><p>Vous donnerez les résultats sous forme de fraction simplifiée. Ils doivent être justifier proprement.</p>`,
    questions: [
      r`<b>1.</b> Traduire les informations données dans l’énoncé à l’aide de probabilités et des événements ci-dessus.`,
      r`<b>2.</b> On choisit un élève au hasard dans la promo. Quelle est la probabilité qu’il valide l’UE de maths du S1 ?`,
      r`<b>3.</b> On choisit un élève qui a validé. Quelle est la probabilité qu’il soit venu en soutien ?`,
      r`<b>4.</b> On veut que la probabilité qu’un élève valide son UE de maths du S1 soit au moins de 75 %. Que faudrait-il prendre comme probabilité \(p\) de venir en soutien ?`],
    hints: [
      r`« Si un élève vient en soutien, la probabilité qu’il valide… » : c’est \(\P(V \mid S)\).`,
      r`Annonce la partition \(\{S, \overline{S}\}\), puis applique la formule des probabilités totales.`,
      r`Question 3 : on sait que l’élève a validé, on cherche \(\P(S \mid V)\).`],
    solution: [
      { t: 'Question 1 : traduire', html: M(r`<p>L’énoncé nous dit : \(\P(S) = 0{,}1\), \(\P(V \mid S) = 0{,}8\) et \(\P(V \mid \overline{S}) = 0{,}3\).</p>`) +
        T('tree', { first: [{ n: 'S', p: '1/10' }, { n: '\\overline{S}' }], second: { n: 'V', nb: '\\overline{V}', p: ['4/5', '3/10'] }, edit: false }) },
      { t: 'Question 2 : probabilités totales', html: M(r`<p>Comme \(\{S, \overline{S}\}\) forme une partition de \(\Omega\), on a \(V = (V \cap S) \cup (V \cap \overline{S})\) (union disjointe). D’où,</p><div class="fm">\[\P(V) = \P(V \cap S) + \P(V \cap \overline{S}) = \P(V \mid S)\P(S) + \P(V \mid \overline{S})\P(\overline{S}) = 0{,}8 \times 0{,}1 + 0{,}3 \times 0{,}9 = 0{,}35 = \frac{7}{20}.\]</div>`) },
      { t: 'Question 3 : Bayes', html: M(r`<p>On cherche \(\P(S \mid V)\). On a</p><div class="fm">\[\P(S \mid V) = \frac{\P(V \cap S)}{\P(V)} = \frac{\P(V \mid S)\P(S)}{\P(V)} = \frac{0{,}8 \times 0{,}1}{0{,}35} = \frac{0{,}08}{0{,}35} = \frac{8}{35}.\]</div>`) },
      { t: 'Question 4 : seuil', html: M(r`<p>Notons \(p = \P(S)\). En suivant le raisonnement de la question 2, \(\P(V) = 0{,}8\,p + 0{,}3\,(1 - p) = 0{,}5\,p + 0{,}3\). On veut \(p\) tel que \(0{,}5\,p + 0{,}3 \geq 0{,}75\), soit \(0{,}5\,p \geq 0{,}45\). Cela donne \(p \geq 0{,}9 = \dfrac{9}{10}\) : au moins 90 % des élèves devraient venir en soutien.</p>`) }],
    answer: r`<ul><li>1. \(\P(S) = \frac{1}{10}\), \(\P(V \mid S) = \frac{4}{5}\), \(\P(V \mid \overline{S}) = \frac{3}{10}\)</li><li>2. \(\P(V) = \frac{7}{20}\)</li><li>3. \(\P(S \mid V) = \frac{8}{35}\)</li><li>4. \(p \geq \frac{9}{10}\)</li></ul>`,
    traps: [
      r`Confondre \(\P(V \mid S)\) et \(\P(V \cap S)\) : \(\P(V \cap S) = 0{,}8 \times 0{,}1 = 0{,}08\).`,
      r`Oublier d’annoncer la partition avant la formule des probabilités totales : la rigueur est notée.`,
      r`Laisser \(0{,}35\) quand l’énoncé demande une fraction simplifiée : \(\frac{7}{20}\).`],
    grading: '5 points pour l’exercice ; le sujet ne détaille pas les questions. Fractions simplifiées exigées.',
    official: true, note: 'Rédaction du corrigé officiel. Valeurs recalculées en fractions exactes.', near: ['p2024-dp-ex4'],
    chk: { pv: '7/20', bayes: '8/35', seuil: '9/10' } });

  add({ id: 'p2023-dp-ex5', exam: 'p2023-dp', ecue: 'dp', order: 5, src: 'Examen DP 2023 · Ex 5', pts: 4, lvl: 2, time: 10,
    title: r`Cours : démontrer \(\mathrm{Var}(X) = \E(X^2) - (\E(X))^2\)`, topics: ['esperance', 'demonstrations'],
    intro: r`<p>Soient \(X\) et \(Y\) deux variables aléatoires finies et \((a, b) \in \R^2\).</p>`,
    questions: [
      r`<b>1.</b> Rappeler les formules donnant \(\E(X + Y)\) et \(\E(aX + b)\).`,
      r`<b>2.</b> En utilisant la question précédente mise en évidence dans les calculs, montrer que \(\mathrm{Var}(X) = \E(X^2) - (\E(X))^2\).`],
    hints: [
      r`Pars de la définition \(\mathrm{Var}(X) = \E\big((X - \E(X))^2\big)\) et développe le carré.`,
      r`\(\E(X)\) est un nombre, pas une variable : \(2\E(X)X\) est de la forme \(aX + b\) avec \(a = 2\E(X)\), \(b = 0\).`],
    solution: [
      { t: 'Question 1', html: M(r`<p>\(\E(X + Y) = \E(X) + \E(Y)\) (1) et \(\E(aX + b) = a\E(X) + b\) (2).</p>`) },
      { t: 'Question 2 : Koenig-Huygens', html: r`<p>C’est la démonstration du document « Démonstrations à connaître ». L’énoncé exige de montrer où servent (1) et (2).</p>` +
        M(r`<p>Par définition, \(\mathrm{Var}(X) = \E\big((X - \E(X))^2\big)\). Or \((X - \E(X))^2 = X^2 - 2\E(X)X + (\E(X))^2\). Ainsi,</p><div class="fm">\[\mathrm{Var}(X) = \E\big(X^2 - 2\E(X)X + (\E(X))^2\big) \overset{(1)}{=} \E(X^2) - \E\big(2\E(X)X\big) + \E\big((\E(X))^2\big).\]</div><p>\(\E(X)\) est une constante. D’une part, \(2\E(X)X\) est de la forme \(aX + b\) avec \(a = 2\E(X)\) et \(b = 0\), donc par (2), \(\E\big(2\E(X)X\big) = 2\E(X)\E(X) = 2(\E(X))^2\). D’autre part, \((\E(X))^2\) est une variable constante : par (2) avec \(a = 0\), son espérance est \((\E(X))^2\). On en déduit</p><div class="fm">\[\mathrm{Var}(X) = \E(X^2) - 2(\E(X))^2 + (\E(X))^2 = \E(X^2) - (\E(X))^2.\]</div>`) }],
    answer: r`<ul><li>1. \(\E(X + Y) = \E(X) + \E(Y)\) ; \(\E(aX + b) = a\E(X) + b\).</li><li>2. Développer \((X - \E(X))^2\), puis appliquer (1) et (2) en les citant.</li></ul>`,
    traps: [
      r`\(\mathrm{Var}(X) = \E(X^2) - (\E(X))^2\), pas \(\E(X^2) + (\E(X))^2\) ni \((\E(X))^2 - \E(X^2)\) : une variance est positive.`,
      r`Traiter \(\E(X)\) comme une variable : c’est un nombre fixé par la loi de \(X\).`,
      r`Ne pas « mettre en évidence » (1) et (2) : l’énoncé le demande explicitement.`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: false, note: 'Le corrigé officiel renvoie au cours (« cf cours » ; en anglais : « See the lecture and the pdf file about proofs that you have to know ») : la preuve ci-dessus est celle du document officiel « Démonstrations à connaître ».', near: ['p2024-dp-ex5'],
    chk: {} });

  add({ id: 'p2023-dp-ex6', exam: 'p2023-dp', ecue: 'dp', order: 6, src: 'Examen DP 2023 · Ex 6', pts: 6, lvl: 2, time: 16,
    title: 'Un QCM de 20 questions rempli au hasard', topics: ['variables', 'esperance', 'lois'],
    intro: r`<p>Un étudiant passe un examen sous forme de QCM. L’examen contient 20 questions numérotées de 1 à 20. Chaque question est notée sur 1 point. La note totale de l’épreuve est donc une note sur 20. C’est un QCM sans point négatif, ni point intermédiaire : à chaque question, la note obtenue ne peut être que 0 ou 1.</p><p>L’étudiant s’est mal préparé à l’examen et choisit de répondre au hasard. Ses réponses sont indépendantes et, pour chaque question, il répond juste avec une probabilité de \(\frac{1}{3}\).</p>`,
    questions: [
      r`<b>1.</b> Soit \(k \in \ent{1}{20}\). On considère la variable aléatoire \(X_k\) égale à la note obtenue à la question \(k\).<p>(a) À \(k \in \ent{1}{20}\) fixé, donner la loi de \(X_k\).</p><p>(b) Calculer l’espérance et la variance de chaque \(X_k\). Vous devez détailler tous vos calculs et ne surtout pas parachuter les résultats !</p>`,
      r`<b>2.</b> On considère maintenant la variable aléatoire \(Y\) égale à la note finale obtenue par l’étudiant à l’épreuve.<p>(a) Écrire \(Y\) en fonction des \(X_k\).</p><p>(b) En justifiant proprement votre raisonnement, donner \(\P(Y = i)\) pour tout \(i \in \ent{0}{20}\).</p><p>(c) Vérifier que \(\displaystyle\sum_{i=0}^{20} \P(Y = i) = 1\).</p><p>(d) En justifiant le calcul, donner l’espérance et la variance de \(Y\).</p>`],
    hints: [
      r`\(X_k\) ne prend que les valeurs 0 et 1 : loi de Bernoulli.`,
      r`« Détailler » : écris \(\E(X_k) = 0 \times \P(X_k = 0) + 1 \times \P(X_k = 1)\), puis de même pour \(\E(X_k^2)\).`,
      r`\(Y\) est la somme de 20 variables de Bernoulli indépendantes de même paramètre : loi binomiale. La somme des probabilités se calcule avec le binôme de Newton.`],
    solution: [
      { t: 'Question 1 : la note à une question', html: M(r`<p>(a) On a \(X_k(\Omega) = \{0, 1\}\), \(\P(X_k = 1) = \dfrac{1}{3}\) et \(\P(X_k = 0) = \dfrac{2}{3}\). Les \(X_k\) suivent donc une loi de Bernoulli de paramètre \(\dfrac{1}{3}\).</p><p>(b) \(\E(X_k) = 0 \times \P(X_k = 0) + 1 \times \P(X_k = 1) = \dfrac{1}{3}\).</p><p>\(\E(X_k^2) = 0^2 \times \P(X_k = 0) + 1^2 \times \P(X_k = 1) = \dfrac{1}{3}\). Ainsi, \(\mathrm{V}(X_k) = \E(X_k^2) - (\E(X_k))^2 = \dfrac{1}{3} - \dfrac{1}{9} = \dfrac{2}{9}\).</p>`) },
      { t: 'Question 2 : la note finale', html: M(r`<p>(a) \(Y = X_1 + X_2 + \cdots + X_{20}\), car \(Y\) est la somme des points obtenus à chaque question. Les \(X_k\) sont indépendantes.</p><p>(b) \(Y\) étant la somme de 20 variables de Bernoulli indépendantes de même paramètre \(\frac{1}{3}\), \(Y\) suit une loi binomiale de paramètres 20 et \(\frac{1}{3}\). On a donc :</p><div class="fm">\[\forall i \in \ent{0}{20}, \quad \P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}.\]</div><p>(c) Par la formule du binôme de Newton :</p><div class="fm">\[\sum_{i=0}^{20} \P(Y = i) = \sum_{i=0}^{20} \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i} = \left(\frac{1}{3} + \frac{2}{3}\right)^{20} = 1^{20} = 1.\]</div><p>(d) \(\E(Y) = \E(X_1) + \cdots + \E(X_{20}) = 20 \times \dfrac{1}{3} = \dfrac{20}{3}\), car les \(X_k\) suivent la même loi de Bernoulli. De plus, comme \(X_1, \ldots, X_{20}\) sont indépendantes, \(\mathrm{V}(Y) = \mathrm{V}(X_1) + \cdots + \mathrm{V}(X_{20}) = 20 \times \dfrac{2}{9} = \dfrac{40}{9}\).</p>`) +
        T('law', { law: 'binom', n: 20, p: '1/3', name: 'Y', edit: false }) }],
    answer: r`<ul><li>1. \(X_k\) suit la loi de Bernoulli de paramètre \(\frac{1}{3}\) ; \(\E(X_k) = \frac{1}{3}\), \(\mathrm{V}(X_k) = \frac{2}{9}\).</li><li>2. \(Y = X_1 + \cdots + X_{20}\) suit la loi \(\mathcal{B}\left(20, \frac{1}{3}\right)\) ; \(\P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}\) ; \(\E(Y) = \frac{20}{3}\), \(\mathrm{V}(Y) = \frac{40}{9}\).</li></ul>`,
    traps: [
      r`« Ne surtout pas parachuter » : écrire \(\E(X_k) = p\) sans le calcul \(0 \times \frac{2}{3} + 1 \times \frac{1}{3}\) coûte des points.`,
      r`Oublier l’indépendance des \(X_k\) dans la justification de la loi binomiale et de \(\mathrm{V}(Y)\).`,
      r`\(\frac{20}{3}\) n’est pas une note entière : c’est une moyenne, l’espérance n’est pas une valeur prise par \(Y\).`],
    grading: '6 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel (qui écrit « P(X = 0) » et « E(X) » sans l’indice k : coquille). Somme des 21 probabilités calculée exactement : 1. Exercice identique à l’exercice 5.21 du TD 2.', near: ['p2024-dp-ex6'],
    chk: { e: '1/3', v: '2/9', ey: '20/3', vy: '40/9' } });

  /* =====================================================================
     Examen LE (logique et ensembles), octobre 2023 (promo 2028) — corrigé officiel français et anglais
     ===================================================================== */
  add({ id: 'p2023-le-ex2', exam: 'p2023-le', ecue: 'obm', order: 2, src: 'Examen LE 2023 · Ex 2', pts: 6, lvl: 2, time: 18,
    title: 'Traduire, nier, cocher les implications vraies', topics: ['quantificateurs', 'logique'],
    intro: r`<p>Soit \(f : \R \to \R\).</p>`,
    questions: [
      r`<b>1.</b> Traduire les phrases suivantes en syntaxe mathématique (avec les quantificateurs)<p>(a) « La fonction \(f\) s’annule au moins une fois »</p><p>(b) « La fonction \(f\) est constante »</p><p>(c) « La fonction \(f\) est majorée »</p>`,
      r`<b>2.</b> On considère les assertions : \(P\) : « \(\forall x \in \R,\ f(x) = 0\) », \(Q\) : « \(\exists x \in \R,\ f(x) = 0\) » et \(R\) : « \((\forall x \in \R,\ f(x) > 0) \lor (\forall x \in \R,\ f(x) < 0)\) ».<p>(a) Donner la négation de \(P\), de \(Q\) et de \(R\).</p><p>(b) Cocher dans le tableau suivant les implications vraies :</p><div class="tbl"><table><thead><tr><th scope="col">\(P \Rightarrow Q\)</th><th scope="col">\(Q \Rightarrow P\)</th><th scope="col">\(Q \Rightarrow R\)</th><th scope="col">\(\neg(Q) \Rightarrow \neg(P)\)</th><th scope="col">\(\neg(P) \Rightarrow \neg(R)\)</th></tr></thead><tbody><tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr></tbody></table></div>`],
    hints: [
      r`« Constante » : il existe un réel \(a\) tel que, pour tout \(x\), \(f(x) = a\). L’ordre « \(\exists a\), puis \(\forall x\) » est essentiel.`,
      r`Nier : \(\forall\) devient \(\exists\), \(\exists\) devient \(\forall\), \(=\) devient \(\neq\), \(>\) devient \(\leq\), et « ou » devient « et ».`,
      r`Pour chaque implication fausse, cherche une fonction simple (\(f(x) = x\), \(f = 1\), \(f = 0\)) qui rend la gauche vraie et la droite fausse.`],
    solution: [
      { t: 'Question 1 : traduire', html: M(r`<p>(a) \(\exists x \in \R,\ f(x) = 0\)</p><p>(b) \(\exists a \in \R,\ \forall x \in \R,\ f(x) = a\)</p><p>(c) \(\exists M \in \R,\ \forall x \in \R,\ f(x) \leq M\)</p>`) },
      { t: 'Question 2(a) : négations', html: M(r`<p>\(\neg(P)\) : « \(\exists x \in \R,\ f(x) \neq 0\) »</p><p>\(\neg(Q)\) : « \(\forall x \in \R,\ f(x) \neq 0\) »</p><p>\(\neg(R)\) : « \((\exists x \in \R,\ f(x) \leq 0) \land (\exists x \in \R,\ f(x) \geq 0)\) »</p>`) +
        r`<p>Pour \(R\), la loi de De Morgan \(\neg(A \lor B) \equiv \neg A \land \neg B\) change le « ou » en « et », puis chaque \(\forall\) devient \(\exists\).</p>` +
        T('negate', { src: '(\\forall x \\in \\R, f(x) > 0) \\lor (\\forall x \\in \\R, f(x) < 0)', edit: false }) },
      { t: 'Question 2(b) : implications vraies', html: M(r`<p>\(P \Rightarrow Q\) : vraie. Si \(f\) est nulle sur \(\R\), alors \(f(0) = 0\), donc \(f\) s’annule au moins une fois.</p><p>\(Q \Rightarrow P\) : fausse. \(f : x \mapsto x\) vérifie \(f(0) = 0\), mais \(f(1) = 1 \neq 0\).</p><p>\(Q \Rightarrow R\) : fausse. \(f = 0\) vérifie \(Q\) mais pas \(R\) : une fonction qui s’annule n’est ni strictement positive ni strictement négative partout.</p><p>\(\neg(Q) \Rightarrow \neg(P)\) : vraie, c’est la contraposée de \(P \Rightarrow Q\).</p><p>\(\neg(P) \Rightarrow \neg(R)\) : fausse. \(f = 1\) vérifie \(\neg(P)\) (\(f(0) = 1 \neq 0\)) et \(R\) (\(f > 0\)), donc pas \(\neg(R)\).</p>`) +
        '<div class="tbl"><table><thead><tr><th scope="col">\\(P \\Rightarrow Q\\)</th><th scope="col">\\(Q \\Rightarrow P\\)</th><th scope="col">\\(Q \\Rightarrow R\\)</th><th scope="col">\\(\\neg(Q) \\Rightarrow \\neg(P)\\)</th><th scope="col">\\(\\neg(P) \\Rightarrow \\neg(R)\\)</th></tr></thead><tbody><tr><td><b>X</b></td><td></td><td></td><td><b>X</b></td><td></td></tr></tbody></table></div>' }],
    answer: r`<ul><li>1. (a) \(\exists x \in \R,\ f(x) = 0\) ; (b) \(\exists a \in \R,\ \forall x \in \R,\ f(x) = a\) ; (c) \(\exists M \in \R,\ \forall x \in \R,\ f(x) \leq M\).</li><li>2(a) \(\neg P\) : \(\exists x,\ f(x) \neq 0\) ; \(\neg Q\) : \(\forall x,\ f(x) \neq 0\) ; \(\neg R\) : \((\exists x,\ f(x) \leq 0) \land (\exists x,\ f(x) \geq 0)\).</li><li>2(b) Cochées : \(P \Rightarrow Q\) et \(\neg(Q) \Rightarrow \neg(P)\).</li></ul>`,
    traps: [
      r`« Constante » écrite \(\forall x,\ \exists a,\ f(x) = a\) : toujours vrai (prendre \(a = f(x)\)), ce n’est pas la bonne traduction.`,
      r`\(\neg R\) n’est pas \((\exists x,\ f(x) < 0) \lor (\exists x,\ f(x) > 0)\) : le « ou » devient « et », et \(>\) devient \(\leq\).`,
      r`\(\neg(P) \Rightarrow \neg(R)\) n’est pas la contraposée de \(P \Rightarrow R\) : la contraposée de \(R \Rightarrow P\) serait \(\neg P \Rightarrow \neg R\), et \(R \Rightarrow P\) est fausse.`],
    grading: '6 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Réponses du corrigé officiel (français et anglais) ; justifications ajoutées. Les implications ont été vérifiées par programme sur toutes les fonctions d’un petit ensemble fini dans \\(\\{-1, 0, 1\\}\\).',
    chk: { coche: '~PQ,nQnP' } });

  add({ id: 'p2023-le-ex3', exam: 'p2023-le', ecue: 'obm', order: 3, src: 'Examen LE 2023 · Ex 3', pts: 8, lvl: 2, time: 22,
    title: r`Images directes et réciproques, \(x \mapsto |x - 1|\)`, topics: ['images', 'injections', 'usuelles'],
    intro: '',
    questions: [
      r`<b>1.</b> Soient \(E\) et \(F\) deux ensembles, \(f : E \to F\), \(A \subset E\) et \(B \subset F\). Rappeler la définition mathématique des ensembles \(f(A)\) et \(f^{-1}(B)\).`,
      r`<b>2.</b> Dessiner (graphe, patate) une fonction \(f : \{a, b, c, d\} \to \ent{1}{5}\) qui vérifie à la fois \(f(\{a, b\}) = \{1, 2\}\), \(f^{-1}(\{5\}) = \varnothing\) et \(f^{-1}(\{2\}) = \{b, c\}\).`,
      r`<b>3.</b> Soit \(g : \R \to \R,\ x \mapsto |x - 1|\).<p>(a) Dessiner le graphe de \(g\).</p><p>(b) Donner \(g(\{-1, 2\})\), \(g([-1, 3])\), \(g^{-1}(\{1\})\) et \(g^{-1}([0, 1])\).</p><p>(c) \(g\) est-elle injective ? Justifier. Si non, proposer deux intervalles \(I_1\) et \(J_1\) pour lesquels \(g : I_1 \to J_1\) soit injective.</p><p>(d) \(g\) est-elle surjective ? Justifier. Si non, proposer deux intervalles \(I_2\) et \(J_2\) pour lesquels \(g : I_2 \to J_2\) soit surjective.</p>`],
    hints: [
      r`Question 2 : \(f^{-1}(\{2\}) = \{b, c\}\) dit que \(b\) et \(c\) ont pour image 2, et que ni \(a\) ni \(d\) n’ont pour image 2.`,
      r`Le graphe de \(|x - 1|\) est un « V » de sommet \((1, 0)\) : il descend de \(-\infty\) à 1, puis remonte.`,
      r`Pour rendre injective, réduis le départ à un intervalle où \(g\) est strictement monotone ; pour rendre surjective, réduis l’arrivée à \(g(\R)\).`],
    solution: [
      { t: 'Question 1 : définitions', html: M(r`<div class="fm">\[f(A) = \{f(x) ;\ x \in A\} \qquad \text{et} \qquad f^{-1}(B) = \{x \in E ;\ f(x) \in B\}\]</div>`) },
      { t: 'Question 2 : construire la fonction', html: M(r`<p>Comme \(f^{-1}(\{2\}) = \{b, c\}\), on a \(f(b) = f(c) = 2\), et \(f(a) \neq 2\), \(f(d) \neq 2\). Comme \(f(\{a, b\}) = \{1, 2\}\) et \(f(b) = 2\), on a \(f(a) = 1\). Enfin \(f^{-1}(\{5\}) = \varnothing\) impose \(f(d) \neq 5\). Par exemple : \(f(a) = 1\), \(f(b) = 2\), \(f(c) = 2\) et \(f(d) = 4\).</p>`) +
        T('sagittal', { E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4', '5'], f: { a: '1', b: '2', c: '2', d: '4' }, mode: 'preimage', B: ['2'] }) +
        r`<p>Il y a exactement trois fonctions qui conviennent : \(f(d) \in \{1, 3, 4\}\), le reste étant imposé.</p>` },
      { t: 'Question 3(a)-(b) : graphe et images', html: FIG.abs1 +
        M(r`<p>\(g\) décroît de 2 à 0 sur \([-1, 1]\), puis croît de 0 à 2 sur \([1, 3]\).</p><p>\(g(\{-1, 2\}) = \{2, 1\}\) ; \(g([-1, 3]) = [0, 2]\) ; \(g^{-1}(\{1\}) = \{0, 2\}\) (\(|x - 1| = 1 \Leftrightarrow x - 1 = \pm 1\)) ; \(g^{-1}([0, 1]) = [0, 2]\) (\(|x - 1| \leq 1 \Leftrightarrow -1 \leq x - 1 \leq 1 \Leftrightarrow 0 \leq x \leq 2\)).</p>`) },
      { t: 'Question 3(c)-(d) : injective, surjective', html: M(r`<p>(c) \(g(0) = g(2) = 1\) et \(0 \neq 2\), donc \(g\) n’est pas injective. Pour la rendre injective, on peut prendre \(I_1 = [1, +\infty[\) et \(J_1 = \R\) : sur \(I_1\), \(g(x) = x - 1\) est strictement croissante, donc deux réels distincts ont des images distinctes.</p><p>(d) \(-2\) n’a pas d’antécédent (une valeur absolue est positive), donc \(g\) n’est pas surjective. Pour la rendre surjective, on peut prendre \(I_2 = \R\) et \(J_2 = \R_+\) : pour tout \(y \geq 0\), \(x = y + 1\) vérifie \(g(x) = y\).</p>`) }],
    answer: r`<ul><li>1. \(f(A) = \{f(x) ;\ x \in A\}\), \(f^{-1}(B) = \{x \in E ;\ f(x) \in B\}\).</li><li>2. Par exemple \(f(a) = 1\), \(f(b) = f(c) = 2\), \(f(d) = 4\).</li><li>3(b) \(g(\{-1, 2\}) = \{1, 2\}\), \(g([-1, 3]) = [0, 2]\), \(g^{-1}(\{1\}) = \{0, 2\}\), \(g^{-1}([0, 1]) = [0, 2]\).</li><li>3(c) non injective (\(g(0) = g(2)\)) ; \(I_1 = [1, +\infty[\), \(J_1 = \R\).</li><li>3(d) non surjective (\(-2\)) ; \(I_2 = \R\), \(J_2 = \R_+\).</li></ul>`,
    traps: [
      r`\(g([-1, 3])\) n’est pas \([g(-1), g(3)] = \{2\}\) : \(g\) n’est pas monotone sur \([-1, 3]\), son minimum 0 est atteint en 1.`,
      r`Question 2 : \(f(d) = 2\) est interdit (sinon \(d \in f^{-1}(\{2\})\)).`,
      r`Pour la surjectivité, c’est l’ensemble d’arrivée qu’on réduit ; pour l’injectivité, l’ensemble de départ.`],
    grading: '8 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Réponses du corrigé officiel (français et anglais), justifications ajoutées ; images recalculées par programme et les 3 fonctions de la question 2 trouvées en énumérant les \\(5^4 = 625\\) fonctions.', near: ['p2022-ex2'],
    chk: { nf: '~3', i1: '[0,2]', p1: '{0,2}', inj: '~false', surj: '~false' } });

  add({ id: 'p2023-le-ex4', exam: 'p2023-le', ecue: 'obm', order: 4, src: 'Examen LE 2023 · Ex 4', pts: 4, lvl: 3, time: 14,
    title: r`La relation « \(b\) est une puissance de \(a\) » sur \(\N^*\)`, topics: ['relations'],
    intro: r`<p>Dans \(E = \N^*\), on définit la relation \(\mathcal{R}\) par : \(\forall (a, b) \in E^2,\ a \mathrel{\mathcal{R}} b \Leftrightarrow \exists n \in \N\) tel que \(b = a^n\).</p>`,
    questions: [
      r`<b>1.</b> Dire si \(\mathcal{R}\) est réflexive. Justifier.`,
      r`<b>2.</b> Dire si \(\mathcal{R}\) est symétrique. Justifier.`,
      r`<b>3.</b> Dire si \(\mathcal{R}\) est transitive. Justifier.`,
      r`<b>4.</b> Soit \((a, b) \in E^2\) tels que \(a \mathrel{\mathcal{R}} b\) et \(b \mathrel{\mathcal{R}} a\).<p>(a) Montrer qu’il existe \((n, p) \in \N^2\) tel que \(b = b^{np}\).</p><p>(b) En déduire que \(b = 1\) ou que \(n = p = 1\). Qu’avez-vous finalement démontré ?</p>`],
    hints: [
      r`Réflexive : quel exposant \(n\) donne \(a = a^n\) ?`,
      r`Symétrique : essaie \(a = 2\), \(b = 8\).`,
      r`4(b) : si \(b \geq 2\), les puissances \(b^0, b^1, b^2, \ldots\) sont toutes distinctes. Conclus ensuite que \(a = b\) dans tous les cas.`],
    solution: [
      { t: 'Questions 1 à 3', html: M(r`<p>1. Soit \(a \in E\). On a \(a = a^1\), d’où \(a \mathrel{\mathcal{R}} a\). \(\mathcal{R}\) est réflexive.</p><p>2. \(8 = 2^3\), d’où \(2 \mathrel{\mathcal{R}} 8\). En revanche, on ne peut pas écrire 2 comme une puissance de 8 (\(8^0 = 1\), \(8^1 = 8\), puis les puissances dépassent 8). Donc \(\mathcal{R}\) n’est pas symétrique.</p><p>3. Soit \((a, b, c) \in E^3\) tel que \(a \mathrel{\mathcal{R}} b\) et \(b \mathrel{\mathcal{R}} c\). Il existe ainsi \((n, p) \in \N^2\) tel que \(b = a^n\) et \(c = b^p\). Ainsi, \(c = (a^n)^p = a^{np}\) avec \(np \in \N\), ce qui donne \(a \mathrel{\mathcal{R}} c\). La relation est transitive.</p>`) },
      { t: 'Question 4 : antisymétrie', html: M(r`<p>(a) Comme \(a \mathrel{\mathcal{R}} b\) et \(b \mathrel{\mathcal{R}} a\), il existe \((n, p) \in \N^2\) tel que \(b = a^n\) et \(a = b^p\). Ainsi, \(b = (b^p)^n = b^{np}\).</p><p>(b) Si \(b \neq 1\), alors \(b \geq 2\) et les puissances de \(b\) sont deux à deux distinctes ; \(b^1 = b^{np}\) impose donc \(np = 1\). Comme \(n\) et \(p\) sont des entiers naturels, on a forcément \(n = p = 1\). Donc \(b = 1\) ou \(n = p = 1\).</p><p>Si \(b = 1\), alors \(a = b^p = 1 = b\). Si \(b \neq 1\), alors \(n = 1\) et \(b = a^1 = a\). Dans tous les cas, \(a = b\) : on a démontré que \(\mathcal{R}\) est antisymétrique.</p>`) +
        r`<p>\(\mathcal{R}\) est réflexive, antisymétrique et transitive : c’est une relation d’ordre sur \(\N^*\) (le corrigé s’arrête à « antisymétrique »).</p>` }],
    answer: r`<ul><li>1. Réflexive (\(a = a^1\)).</li><li>2. Non symétrique : \(2 \mathrel{\mathcal{R}} 8\) mais 2 n’est pas une puissance de 8.</li><li>3. Transitive (\(c = a^{np}\)).</li><li>4. \(b = b^{np}\), donc \(b = 1\) ou \(n = p = 1\) ; dans les deux cas \(a = b\) : \(\mathcal{R}\) est antisymétrique, donc une relation d’ordre.</li></ul>`,
    traps: [
      r`Prendre \(n = 0\) pour la réflexivité : \(a^0 = 1 \neq a\) en général.`,
      r`4(b) : \(b = b^{np}\) n’implique \(np = 1\) que si \(b \neq 1\) (\(1 = 1^{np}\) pour tout \(np\)).`,
      r`Ne pas conclure : la question « Qu’avez-vous finalement démontré ? » attend le mot « antisymétrique ».`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel (français et anglais), avec la justification de \\(np = 1\\) ajoutée. Propriétés vérifiées par énumération sur \\(\\ent{1}{30}\\).',
    chk: { refl: '~true', sym: '~false', trans: '~true', anti: '~true' } });

  /* =====================================================================
     Contrôle S1, novembre 2022 (promo 2027) — corrigé officiel
     ===================================================================== */
  add({ id: 'p2022-ex2', exam: 'p2022', ecue: 'obm', order: 2, src: 'Contrôle S1 2022 · Ex 2', pts: 8.5, lvl: 2, time: 28,
    title: r`Images, \(x \mapsto |x| + 1\), composée d’injections et de surjections`, topics: ['images', 'injections', 'fonctions'],
    intro: r`<p>Dans cet exercice, les questions sont indépendantes.</p>`,
    questions: [
      r`<b>1.</b> Soient \(E\) et \(F\) deux ensembles, \(f : E \to F\), \(A \subset E\) et \(B \subset F\). Rappeler la définition mathématique des ensembles \(f(A)\) et \(f^{-1}(B)\).`,
      r`<b>2.</b> Soit \(f : \ent{1}{4} \to \ent{10}{14}\) telle que \(f(1) = 10\), \(f(2) = 11\), \(f(3) = 11\) et \(f(4) = 13\). Donner \(f(\ent{1}{4})\), \(f(\{3\})\), \(f^{-1}(\{10, 11\})\) et \(f^{-1}(\{12\})\).`,
      r`<b>3.</b> Soit \(g : \R \to \R,\ x \mapsto |x| + 1\).<p>(a) Dessiner le graphe de \(g\).</p><p>(b) \(g\) est-elle injective ? Justifier. Si non, proposer deux intervalles \(I_1\) et \(J_1\) pour lesquels \(g : I_1 \to J_1\) soit injective.</p><p>(c) \(g\) est-elle surjective ? Justifier. Si non, proposer deux intervalles \(I_2\) et \(J_2\) pour lesquels \(g : I_2 \to J_2\) soit surjective.</p>`,
      r`<b>4.</b> Soient \(E\), \(F\) et \(G\) trois ensembles, \(f : E \to F\) et \(g : F \to G\).<p>(a) À partir de \(f\) et \(g\), quelle fonction composée \(h\) peut-on faire ? Donner les domaines de départ et d’arrivée de cette fonction \(h\).</p><p>(b) On suppose \(f\) et \(g\) injectives. Montrer que \(h\) est aussi injective.</p><p>(c) (question bonus) On suppose \(f\) et \(g\) surjectives. Montrer que \(h\) est aussi surjective.</p>`],
    hints: [
      r`\(f^{-1}(\{10, 11\})\) : tous les éléments de \(\ent{1}{4}\) dont l’image vaut 10 ou 11.`,
      r`\(g\) est paire : \(g(-1) = g(1)\). Et \(g(x) \geq 1\) pour tout \(x\).`,
      r`4(b) : commence par « Soit \((x, x') \in E^2\) tel que \(h(x) = h(x')\) » et utilise l’injectivité de \(g\), puis celle de \(f\).`],
    solution: [
      { t: 'Question 1 : définitions', html: M(r`<div class="fm">\[f(A) = \{f(x),\ x \in A\} = \{y \in F,\ \exists x \in A,\ y = f(x)\} \quad \text{et} \quad f^{-1}(B) = \{x \in E,\ f(x) \in B\}\]</div>`) },
      { t: 'Question 2 : un ensemble fini', html: T('sagittal', { E: ['1', '2', '3', '4'], F: ['10', '11', '12', '13', '14'], f: { 1: '10', 2: '11', 3: '11', 4: '13' }, mode: 'preimage', B: ['10', '11'] }) +
        M(r`<p>\(f(\ent{1}{4}) = \{10, 11, 13\}\), \(f(\{3\}) = \{11\}\), \(f^{-1}(\{10, 11\}) = \{1, 2, 3\}\) et \(f^{-1}(\{12\}) = \varnothing\).</p>`) },
      { t: 'Question 3 : la fonction |x| + 1', html: FIG.absp1 +
        M(r`<p>(b) Comme \(g(1) = g(-1) = 2\) et \(1 \neq -1\), \(g\) n’est pas injective. En choisissant \(I_1 = \R_+\) et \(J_1 = \R\), \(g\) est injective car elle est continue et strictement croissante sur \(\R_+\) (\(g(x) = x + 1\)).</p><p>(c) L’équation \(0 = g(x)\) n’a pas de solution, donc 0 n’a pas d’antécédent dans \(\R\) : \(g\) n’est pas surjective. En prenant \(I_2 = \R\) et \(J_2 = [1, +\infty[\), \(g\) est surjective : \(\forall x \in \R,\ g(x) \geq 1\), et tout \(y \geq 1\) a pour antécédent \(y - 1\).</p>`) },
      { t: 'Question 4 : composées', html: M(r`<p>(a) \(h = g \circ f : E \to G\), \(x \mapsto g(f(x))\) (l’arrivée de \(f\) est le départ de \(g\)).</p><p>(b) Supposons \(f\) et \(g\) injectives. On veut montrer que \(\forall (x, x') \in E^2,\ g \circ f(x) = g \circ f(x') \Rightarrow x = x'\). Soit \((x, x') \in E^2\) tel que \(g \circ f(x) = g \circ f(x')\). On a alors \(g(f(x)) = g(f(x'))\). \(g\) étant injective, on en déduit que \(f(x) = f(x')\). Ce qui implique \(x = x'\) car \(f\) est injective. Donc \(h\) est injective.</p><p>(c) Supposons \(f\) et \(g\) surjectives. Soit \(y \in G\). Par surjectivité de \(g\), \(\exists z \in F\) tel que \(y = g(z)\). Comme \(z \in F\) et \(f\) est surjective de \(E\) vers \(F\), \(z\) a un antécédent par \(f\) dans \(E\) : \(\exists x \in E\) tel que \(z = f(x)\). Ainsi, \(y = g(z) = g(f(x)) = g \circ f(x)\), ce qui signifie que \(g \circ f\) est surjective.</p>`) }],
    answer: r`<ul><li>2. \(f(\ent{1}{4}) = \{10, 11, 13\}\), \(f(\{3\}) = \{11\}\), \(f^{-1}(\{10, 11\}) = \{1, 2, 3\}\), \(f^{-1}(\{12\}) = \varnothing\).</li><li>3(b) non injective (\(g(1) = g(-1)\)) ; \(I_1 = \R_+\), \(J_1 = \R\). 3(c) non surjective (0) ; \(I_2 = \R\), \(J_2 = [1, +\infty[\).</li><li>4. \(h = g \circ f : E \to G\), injective si \(f\) et \(g\) le sont, surjective si \(f\) et \(g\) le sont.</li></ul>`,
    traps: [
      r`\(f(\{3\}) = \{11\}\) est un ensemble, pas le nombre 11.`,
      r`Écrire \(f \circ g\) : elle n’existe pas en général (l’arrivée de \(g\) est \(G\), pas \(E\)).`,
      r`4(b) : utiliser l’injectivité de \(f\) avant celle de \(g\). On part de \(g(f(x)) = g(f(x'))\) : c’est \(g\) qu’on « enlève » d’abord.`],
    grading: '8,5 points pour l’exercice, question 4(c) en bonus ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel. Images recalculées par programme.', near: ['p2023-le-ex3'],
    chk: { img: '{10,11,13}', pre: '{1,2,3}', inj: '~false', surj: '~false' } });

  add({ id: 'p2022-ex3', exam: 'p2022', ecue: 'obm', order: 3, src: 'Contrôle S1 2022 · Ex 3', pts: 4, lvl: 1, time: 10,
    title: 'Relations : définitions, négations, contraposée, relation d’ordre', topics: ['relations', 'quantificateurs'],
    intro: r`<p>Soient \(E\) un ensemble et \(\mathcal{R}\) une relation sur \(E\). Pour deux éléments \(x\) et \(y\) de \(E\), on notera \(x \mathrel{\mathcal{R}} y\) si \(x\) et \(y\) sont en relation, sinon on notera \(x \not\mathrel{\mathcal{R}} y\).</p>`,
    questions: [
      r`<b>1.</b> Rappeler la définition mathématique de « \(\mathcal{R}\) est réflexive ». Donner aussi sa négation.`,
      r`<b>2.</b> Rappeler la définition mathématique de « \(\mathcal{R}\) est antisymétrique ». Donner aussi sa négation.`,
      r`<b>3.</b> Rappeler la définition mathématique de « \(\mathcal{R}\) est transitive ». Donner aussi sa contraposée.`,
      r`<b>4.</b> Proposer un exemple d’une relation \(\mathcal{R}\) réflexive, antisymétrique et transitive. Comment appelle-t-on une telle relation ?`],
    hints: [
      r`Chaque définition commence par un \(\forall\) ; sa négation commence par un \(\exists\).`,
      r`La négation de « \(P \Rightarrow Q\) » est « \(P\) et non \(Q\) » ; la contraposée est « non \(Q \Rightarrow\) non \(P\) ».`],
    solution: [
      { t: 'Définitions, négations, contraposée', html: M(r`<p>1. « \(\mathcal{R}\) est réflexive » signifie : \(\forall x \in E,\ x \mathrel{\mathcal{R}} x\). La négation est : \(\exists x \in E,\ x \not\mathrel{\mathcal{R}} x\).</p><p>2. « \(\mathcal{R}\) est antisymétrique » signifie : \(\forall (x, y) \in E^2,\ (x \mathrel{\mathcal{R}} y \text{ et } y \mathrel{\mathcal{R}} x) \Rightarrow x = y\). La négation est : \(\exists (x, y) \in E^2\) tel que \(x \mathrel{\mathcal{R}} y\) et \(y \mathrel{\mathcal{R}} x\) et \(x \neq y\).</p><p>3. « \(\mathcal{R}\) est transitive » signifie : \(\forall (x, y, z) \in E^3,\ (x \mathrel{\mathcal{R}} y \text{ et } y \mathrel{\mathcal{R}} z) \Rightarrow x \mathrel{\mathcal{R}} z\). La contraposée est : \(\forall (x, y, z) \in E^3,\ x \not\mathrel{\mathcal{R}} z \Rightarrow (x \not\mathrel{\mathcal{R}} y \text{ ou } y \not\mathrel{\mathcal{R}} z)\).</p><p>4. Dans \(\R\), \(\leq\) est réflexive (\(x \leq x\)), antisymétrique (\(x \leq y\) et \(y \leq x\) donnent \(x = y\)) et transitive. C’est une relation d’ordre.</p>`) }],
    answer: r`<ul><li>1. \(\forall x \in E,\ x \mathrel{\mathcal{R}} x\) ; négation \(\exists x \in E,\ x \not\mathrel{\mathcal{R}} x\).</li><li>2. \(\forall (x, y) \in E^2,\ (x \mathrel{\mathcal{R}} y \text{ et } y \mathrel{\mathcal{R}} x) \Rightarrow x = y\) ; négation \(\exists (x, y) \in E^2,\ x \mathrel{\mathcal{R}} y,\ y \mathrel{\mathcal{R}} x,\ x \neq y\).</li><li>3. \(\forall (x, y, z) \in E^3,\ (x \mathrel{\mathcal{R}} y \text{ et } y \mathrel{\mathcal{R}} z) \Rightarrow x \mathrel{\mathcal{R}} z\) ; contraposée \(x \not\mathrel{\mathcal{R}} z \Rightarrow (x \not\mathrel{\mathcal{R}} y \text{ ou } y \not\mathrel{\mathcal{R}} z)\).</li><li>4. \(\leq\) sur \(\R\) : une relation d’ordre.</li></ul>`,
    traps: [
      r`La contraposée garde le \(\forall\) : seule l’implication change. La négation, elle, transforme \(\forall\) en \(\exists\).`,
      r`Dans la contraposée de la transitivité, « et » devient « ou » (De Morgan).`,
      r`Antisymétrique ≠ « pas symétrique ».`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel.',
    chk: {} });

  add({ id: 'p2022-ex4', exam: 'p2022', ecue: 'dp', order: 4, src: 'Contrôle S1 2022 · Ex 4', pts: 6.5, lvl: 2, time: 20,
    title: 'Comités et groupes de responsables dans une classe de 20', topics: ['denombrement'],
    intro: r`<p>Pierre et Marie sont dans une classe de 20 élèves. Dans cette classe, il y a 12 garçons et 8 filles.</p>`,
    questions: [
      r`<b>1.</b> On décide d’élire un comité de 3 élèves qui représentera la classe au niveau de l’école.<p>(a) Combien y a-t-il de comités possibles ? Justifier brièvement.</p><p>(b) Combien y a-t-il de comités contenant exactement 2 garçons et 1 fille ? Justifier brièvement.</p><p>(c) Combien y a-t-il de comités contenant au moins 2 filles ? Justifier brièvement.</p><p>(d) On veut que Pierre et Marie soient dans le comité. Combien y a-t-il de comités dans ce cas là ? Justifier brièvement.</p>`,
      r`<b>2.</b> Les élèves de la classe doivent partir en week-end d’intégration. Pour cela, ils doivent créer un groupe de quatre responsables : un chef, un sous-chef et deux assistants (ces deux-là peuvent assister aussi bien le chef que le sous-chef). Personne ne peut occuper simultanément deux postes dans ce groupe.<p>(a) Combien y a-t-il de groupes de responsables possibles ? Justifier brièvement.</p><p>(b) On veut que le chef soit une fille, le sous-chef un garçon et parmi les deux assistants, on veut une fille et un garçon. Combien y a-t-il de groupes de responsables possibles dans ce cas là ? Justifier brièvement.</p><p>(c) C’est décidé : Marie sera la chef du groupe. Combien y a-t-il de groupes de responsables possibles dans ce cas là ? Justifier brièvement.</p><p>(d) « Si Marie est la chef alors je veux aussi faire parti du groupe des responsables ! » dit Pierre. Combien y a-t-il de groupes de responsables possibles dans ce cas là ? Justifier brièvement.</p>`],
    hints: [
      r`Un comité n’a pas d’ordre : combinaisons. Le chef et le sous-chef sont des postes distincts (ordre), les deux assistants non.`,
      r`« Au moins 2 filles » = « exactement 2 filles » ou « exactement 3 filles » : deux cas disjoints à additionner.`,
      r`2(d) : le corrigé lit « Marie est chef et Pierre fait partie du groupe ». Sépare les cas « Pierre sous-chef » et « Pierre assistant ».`],
    solution: [
      { t: 'Question 1 : comités', html: M(r`<p>(a) Cela revient à prendre 3 élèves parmi les 20. Il y a donc \(\binom{20}{3}\) comités possibles.</p><p>(b) Il y a \(\binom{12}{2}\) façons de choisir les deux garçons et \(\binom{8}{1}\) de choisir la fille. Au total, \(\binom{12}{2} \times 8\) comités.</p><p>(c) « Au moins deux filles » signifie « exactement deux filles » ou « exactement trois filles » (cas disjoints). Il y a donc \(\binom{8}{2}\binom{12}{1} + \binom{8}{3}\) comités.</p><p>(d) Pierre et Marie y sont : il ne reste qu’à choisir un élève parmi les 18 restants. Il y a \(\binom{18}{1} = 18\) comités.</p>`) +
        r`<p>Valeurs : \(1\,140\) ; \(66 \times 8 = 528\) ; \(28 \times 12 + 56 = 392\) ; \(18\).</p>` },
      { t: 'Question 2 : groupes de responsables', html: M(r`<p>(a) Il y a 20 façons de choisir le chef, puis 19 de choisir le sous-chef. Il reste à choisir deux assistants (sans ordre) parmi les 18 restants. Ainsi, il y a \(20 \times 19 \times \binom{18}{2}\) groupes.</p><p>(b) 8 façons de choisir la chef, 12 le sous-chef ; pour les assistants, il reste 7 façons de choisir la fille et 11 le garçon. Au total, \(8 \times 12 \times 7 \times 11\) groupes.</p><p>(c) Marie étant chef, il y a 19 façons de choisir le sous-chef et \(\binom{18}{2}\) de choisir les assistants : \(19 \times \binom{18}{2}\) groupes.</p><p>(d) On lit : Marie est chef et Pierre fait partie du groupe. Soit Pierre est sous-chef, soit il ne l’est pas. S’il est sous-chef, il y a \(\binom{18}{2}\) façons de choisir les deux assistants. S’il ne l’est pas, il est assistant : 18 façons de choisir le sous-chef (ni Marie, ni Pierre), puis 17 de choisir l’autre assistant. Au total, \(\binom{18}{2} + 18 \times 17\) groupes.</p>`) +
        r`<p>Valeurs : \(58\,140\) ; \(7\,392\) ; \(2\,907\) ; \(153 + 306 = 459\).</p><p>Autre lecture de (d), au pied de la lettre : l’implication « si Marie est chef, alors Pierre est dans le groupe » est vraie dès que Marie n’est pas chef. On compte alors tous les groupes sauf ceux où Marie est chef sans Pierre : \(58\,140 - 18 \times \binom{17}{2} = 58\,140 - 2\,448 = 55\,692\). Sur ta copie, écris la lecture que tu choisis.</p>` }],
    answer: r`<ul><li>1. (a) \(\binom{20}{3} = 1\,140\) ; (b) \(\binom{12}{2} \times 8 = 528\) ; (c) \(\binom{8}{2}\binom{12}{1} + \binom{8}{3} = 392\) ; (d) \(18\).</li><li>2. (a) \(20 \times 19 \times \binom{18}{2} = 58\,140\) ; (b) \(8 \times 12 \times 7 \times 11 = 7\,392\) ; (c) \(19 \times \binom{18}{2} = 2\,907\) ; (d) \(\binom{18}{2} + 18 \times 17 = 459\) (lecture du corrigé).</li></ul>`,
    traps: [
      r`Deux assistants : pas d’ordre entre eux, donc \(\binom{18}{2}\) et non \(18 \times 17\).`,
      r`1(c) : \(\binom{8}{2} \times \binom{18}{1}\) (« 2 filles puis n’importe qui ») compte deux fois les comités de 3 filles.`,
      r`2(d) : une phrase en « si… alors » se lit comme une implication ; préciser l’interprétation.`],
    grading: '6,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel. Valeurs vérifiées par énumération des 58 140 groupes ; l’autre lecture de 2(d) aussi. La question 2 est l’exercice 3.18 du TD 1.',
    chk: { a: '1140', b: '528', c: '392', d: '18', ga: '58140', gb: '7392', gc: '2907', gd: '459', gd2: '55692' } });

  add({ id: 'p2022-ex5', exam: 'p2022', ecue: 'dp', order: 5, src: 'Contrôle S1 2022 · Ex 5', pts: 6.5, lvl: 2, time: 20,
    title: 'Urne de 5 boules : Bernoulli, binomiale, rang de la première blanche', topics: ['variables', 'esperance', 'lois'],
    intro: r`<p>Dans une urne, on a 3 boules blanches et 2 boules vertes indiscernables au toucher.</p>`,
    questions: [
      r`<b>1.</b> Proposer une expérience simple avec cette urne qui amène à la création d’une variable \(X\) de Bernoulli. Donner \(\E(X)\) et \(\V(X)\).`,
      r`<b>2.</b> Proposer une expérience simple avec cette urne qui amène à la création d’une variable \(Y\) binomiale de paramètres \(n = 5\) et \(p = \frac{2}{5}\). Donner \(\E(Y)\) et \(\V(Y)\).`,
      r`<b>3.</b> On extrait une à une les boules de l’urne (c’est-à-dire qu’on effectue un tirage successif et sans remise !). Soit \(Z\) la variable aléatoire égale au rang d’apparition de la première boule blanche tirée.<p>(a) Quelles sont les valeurs prises par \(Z\) ? Justifier brièvement.</p><p>(b) Donner la loi de \(Z\).</p><p>(c) Calculer l’espérance de \(Z\).</p><p>(d) Calculer la variance de \(Z\).</p>`],
    hints: [
      r`Pour un paramètre \(\frac{2}{5}\), il faut un événement de probabilité \(\frac{2}{5}\) : tirer une boule verte.`,
      r`Binomiale : répéter 5 fois la même épreuve de Bernoulli, <b>avec remise</b> pour garder les tirages indépendants.`,
      r`Il n’y a que 2 vertes : la première blanche sort au plus tard au 3e tirage. \(\P(Z = 2) = \P(\text{verte puis blanche})\).`],
    solution: [
      { t: 'Question 1 : Bernoulli', html: M(r`<p>On tire une boule de l’urne. Soit \(X\) la variable égale à 1 si la boule tirée est verte et 0 sinon. On a \(\P(X = 1) = \dfrac{2}{5}\) et \(\P(X = 0) = \dfrac{3}{5}\). \(X\) suit donc une loi de Bernoulli de paramètre \(p = \dfrac{2}{5}\). Ainsi, \(\E(X) = p = \dfrac{2}{5}\) et \(\V(X) = p(1 - p) = \dfrac{6}{25}\).</p>`) },
      { t: 'Question 2 : binomiale', html: M(r`<p>On tire successivement 5 boules <b>avec remise</b>. Soit \(Y\) le nombre de boules vertes obtenues. Les 5 tirages sont indépendants et chacun donne une verte avec la probabilité \(\frac{2}{5}\) : \(Y\) suit la loi binomiale de paramètres \(n = 5\) et \(p = \frac{2}{5}\), avec \(Y(\Omega) = \ent{0}{5}\) et \(\P(Y = k) = \binom{5}{k}\left(\frac{2}{5}\right)^k\left(\frac{3}{5}\right)^{5-k}\). Alors \(\E(Y) = np = 2\) et \(\V(Y) = np(1 - p) = \dfrac{6}{5}\).</p>`) },
      { t: 'Question 3 : rang de la première blanche', html: M(r`<p>(a) La première boule blanche peut sortir au premier tirage, et au plus tard au troisième, car il n’y a que deux boules vertes. Ainsi \(Z(\Omega) = \{1, 2, 3\}\).</p><p>(b) \(\P(Z = 1) = \dfrac{3}{5}\) : 3 blanches sur 5 boules. \(\P(Z = 2) = \dfrac{2}{5} \times \dfrac{3}{4} = \dfrac{3}{10}\) : une verte (2 sur 5), puis une blanche (3 sur les 4 boules restantes). \(\P(Z = 3) = \dfrac{2}{5} \times \dfrac{1}{4} \times \dfrac{3}{3} = \dfrac{1}{10}\) : les deux vertes d’abord. (Somme : 1.)</p><p>(c) \(\E(Z) = \displaystyle\sum_{k=1}^{3} k\,\P(Z = k) = 1 \times \frac{6}{10} + 2 \times \frac{3}{10} + 3 \times \frac{1}{10} = \frac{15}{10} = \frac{3}{2}\).</p><p>(d) \(\E(Z^2) = \displaystyle\sum_{k=1}^{3} k^2\,\P(Z = k) = \frac{6}{10} + 4 \times \frac{3}{10} + 9 \times \frac{1}{10} = \frac{27}{10}\). Ainsi \(\V(Z) = \E(Z^2) - (\E(Z))^2 = \dfrac{27}{10} - \dfrac{9}{4} = \dfrac{9}{20}\).</p>`) +
        T('law', { x: [1, 2, 3], p: ['3/5', '3/10', '1/10'], name: 'Z' }) }],
    answer: r`<ul><li>1. \(X\) = 1 si la boule tirée est verte : Bernoulli de paramètre \(\frac{2}{5}\), \(\E(X) = \frac{2}{5}\), \(\V(X) = \frac{6}{25}\).</li><li>2. 5 tirages avec remise, \(Y\) = nombre de vertes : \(\E(Y) = 2\), \(\V(Y) = \frac{6}{5}\).</li><li>3. \(Z(\Omega) = \{1, 2, 3\}\) ; \(\P(Z = 1) = \frac{3}{5}\), \(\P(Z = 2) = \frac{3}{10}\), \(\P(Z = 3) = \frac{1}{10}\) ; \(\E(Z) = \frac{3}{2}\) ; \(\V(Z) = \frac{9}{20}\).</li></ul>`,
    traps: [
      r`Question 2 : sans remise, les tirages ne sont pas indépendants et \(Y\) n’est pas binomiale.`,
      r`\(\P(Z = 2)\) : après une verte, il ne reste que 4 boules (\(\frac{3}{4}\), pas \(\frac{3}{5}\)).`,
      r`Vérifier que la somme des probabilités vaut 1 avant de calculer l’espérance.`],
    grading: '6,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel (qui écrit « E(X) = np » pour la variable Y : coquille). Loi de Z vérifiée par énumération des 120 ordres de tirage.',
    chk: { ex: '2/5', vx: '6/25', ey: '~2', vy: '6/5', z1: '3/5', z2: '3/10', z3: '1/10', ez: '3/2', ez2: '27/10', vz: '9/20' } });

  add({ id: 'p2022-ex6', exam: 'p2022', ecue: 'dp', order: 6, src: 'Contrôle S1 2022 · Ex 6', pts: 2.5, lvl: 1, time: 8,
    title: 'Deux boîtes de sucettes : probabilités totales, Bayes', topics: ['conditionnelles', 'bayes'],
    intro: r`<p>On dispose de deux boîtes de bonbons \(A\) et \(B\) indiscernables. Dans \(A\), il y a 10 sucettes au citron et 30 sucettes au coca. Dans \(B\), il y a 25 sucettes au citron et 15 sucettes au coca.</p><p>On choisit au hasard une boîte puis une sucette dans cette boîte.</p>`,
    questions: [
      r`<b>1.</b> Quelle est la probabilité pour que la sucette extraite soit au citron ? Vous détaillerez avec soin vos étapes avant de passer à l’application numérique.`,
      r`<b>2.</b> Sachant que l’on a extrait une sucette au citron, quelle est la probabilité qu’elle provienne de la boîte \(A\) ?`],
    hints: [
      r`Nomme les événements (\(A\), \(B\), \(C\) : « au citron »), puis traduis : \(\P(A) = \frac{1}{2}\), \(\P(C \mid A) = \frac{10}{40}\)…`,
      r`\(\{A, B\}\) est une partition de l’univers : probabilités totales, puis Bayes.`],
    solution: [
      { t: 'Question 1 : probabilités totales', html: M(r`<p>Notons \(A\) : « la sucette provient de la boîte \(A\) », \(B\) : « la sucette provient de la boîte \(B\) » et \(C\) : « la sucette est au citron ». \(\{A, B\}\) forme une partition de l’univers. On cherche \(\P(C)\). Comme \(C = (C \cap A) \cup (C \cap B)\) et cette union est disjointe, on a</p><div class="fm">\[\P(C) = \P(C \cap A) + \P(C \cap B) = \P(C \mid A)\P(A) + \P(C \mid B)\P(B) = \frac{10}{40} \times \frac{1}{2} + \frac{25}{40} \times \frac{1}{2} = \frac{1}{8} + \frac{5}{16} = \frac{7}{16}.\]</div>`) +
        T('tree', { first: [{ n: 'A', p: '1/2' }, { n: 'B' }], second: { n: 'C', nb: '\\overline{C}', p: ['1/4', '5/8'] }, edit: false }) },
      { t: 'Question 2 : Bayes', html: M(r`<p>On cherche \(\P(A \mid C)\). On a</p><div class="fm">\[\P(A \mid C) = \frac{\P(A \cap C)}{\P(C)} = \frac{\P(C \mid A)\P(A)}{\P(C)} = \frac{1/8}{7/16} = \frac{2}{7}.\]</div>`) }],
    answer: r`<ul><li>1. \(\P(C) = \frac{7}{16}\)</li><li>2. \(\P(A \mid C) = \frac{2}{7}\)</li></ul>`,
    traps: [
      r`Calculer \(\frac{10 + 25}{80} = \frac{7}{16}\) donne ici le bon nombre parce que les boîtes ont le même nombre de sucettes : ce n’est pas une méthode générale, il faut la formule des probabilités totales.`,
      r`Question 2 : diviser par \(\P(C)\), pas par \(\P(A)\).`],
    grading: '2,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel. Fractions recalculées exactement.', near: ['p2023-dp-ex4'],
    chk: { pc: '7/16', bayes: '2/7' } });

  add({ id: 'p2022-ex7', exam: 'p2022', ecue: 'dp', order: 7, src: 'Contrôle S1 2022 · Ex 7', pts: 3, lvl: 1, time: 8,
    title: r`Démonstration : \(\E(aX + b) = a\E(X) + b\)`, topics: ['esperance', 'demonstrations'],
    intro: r`<p>Soient \((a, b) \in \R^2\) et \(X\) une variable aléatoire finie. On note \(X(\Omega) = \{x_1, x_2, \ldots, x_n\}\) et \(Y = aX + b\).</p>`,
    questions: [r`Montrer que \(\E(Y) = a\E(X) + b\).`],
    hints: [
      r`\(Y = f(X)\) avec \(f : x \mapsto ax + b\) : utilise le théorème de transfert \(\E(f(X)) = \sum_i f(x_i)\,\P(X = x_i)\).`,
      r`Coupe la somme en deux, factorise \(a\) et \(b\), et reconnais \(\E(X)\) et la somme des probabilités.`],
    solution: [
      { t: 'La démonstration du cours', html: M(r`<p>La variable \(Y = aX + b\) est de la forme \(Y = f(X)\), où \(f\) est la fonction \(x \mapsto ax + b\). D’après le théorème de transfert,</p><div class="fm">\[\E(Y) = \sum_{i=1}^{n} \P(X = x_i)\,f(x_i) = \sum_{i=1}^{n} \P(X = x_i)\,(a x_i + b) = a \sum_{i=1}^{n} x_i\,\P(X = x_i) + b \sum_{i=1}^{n} \P(X = x_i).\]</div><p>La première somme vaut \(\E(X)\) et la seconde vaut 1 (somme des probabilités de la loi de \(X\)). Finalement, \(\E(Y) = a\E(X) + b\).</p>`) }],
    answer: r`<p>Transfert, puis linéarité de la somme : \(\E(aX + b) = a\sum_i x_i \P(X = x_i) + b\sum_i \P(X = x_i) = a\E(X) + b\).</p>`,
    traps: [
      r`Écrire « par linéarité de l’espérance » : c’est justement ce qu’il faut démontrer.`,
      r`Oublier de justifier \(\sum_i \P(X = x_i) = 1\).`],
    grading: '3 points pour l’exercice.',
    official: false, note: 'Le corrigé officiel dit seulement « Voir Cours ! » : preuve reprise du document officiel « Démonstrations à connaître ».', near: ['p2024-dp-ex5'],
    chk: {} });

  add({ id: 'p2022-ex8', exam: 'p2022', ecue: 'dp', order: 8, src: 'Contrôle S1 2022 · Ex 8', pts: 4, lvl: 2, time: 14,
    title: r`Binôme et coloriage : \(\sum_k \binom{n}{k} 3^{n-k} = 4^n\)`, topics: ['binomial', 'denombrement'],
    intro: '',
    questions: [
      r`<b>1.</b> Rappeler la formule du binôme de Newton.`,
      r`<b>2.</b> Grâce à cette formule, expliquer pourquoi \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k} = 4^n\).`,
      r`<b>3.</b> Le but est de redémontrer la formule ci-dessus par le dénombrement. Considérons \(n\) cases. On veut colorier chaque case. Pour cela, on ne dispose que de 4 feutres de couleurs : un feutre bleu, un feutre vert, un feutre rouge et un feutre jaune.<p>(a) Proposer une façon de colorier ces \(n\) cases qui amène à : « il y a \(4^n\) façons de colorier les cases ». Vous prendrez soin d’expliquer votre raisonnement proprement.</p><p>(b) Proposer une autre façon de colorier ces \(n\) cases qui amène à : « il y a \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k}\) façons de colorier les cases ». Vous prendrez soin d’expliquer votre raisonnement proprement.</p><p>(c) En déduire la formule voulue.</p>`],
    hints: [
      r`Binôme avec \(a = 1\) et \(b = 3\).`,
      r`(b) : classe les coloriages selon le nombre \(k\) de cases vertes. Choisis d’abord quelles cases sont vertes, puis colorie les autres avec les 3 couleurs restantes.`],
    solution: [
      { t: 'Questions 1 et 2', html: M(r`<p>1. Soient \(n \in \N\) et \((a, b) \in \R^2\). On a \(\displaystyle (a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^k b^{n-k}\).</p><p>2. On applique la formule du binôme pour \(a = 1\) et \(b = 3\) : \(\displaystyle 4^n = (1 + 3)^n = \sum_{k=0}^{n} \binom{n}{k} 1^k\, 3^{n-k} = \sum_{k=0}^{n} \binom{n}{k} 3^{n-k}\).</p>`) },
      { t: 'Question 3 : double dénombrement', html: M(r`<p>(a) On colorie les \(n\) cases une par une. Pour la première case, il y a 4 couleurs possibles, pour la seconde aussi, …, pour la \(n\)-ième aussi. Au total, il y a \(4 \times 4 \times \cdots \times 4 = 4^n\) façons de colorier les cases (\(n\)-listes de couleurs).</p><p>(b) Soit \(k \in \ent{0}{n}\). On prend le feutre vert et on choisit de colorier \(k\) cases en vert : il y a \(\binom{n}{k}\) façons de choisir ces \(k\) cases. Il reste \(n - k\) cases à colorier en bleu, rouge ou jaune : 3 possibilités pour chacune, soit \(3^{n-k}\). Les cas \(k = 0, 1, \ldots, n\) sont disjoints (un coloriage a un seul nombre de cases vertes). Au total, il y a \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k}\) façons de colorier les \(n\) cases.</p><p>(c) On a compté les mêmes coloriages de deux façons : \(\displaystyle\sum_{k=0}^{n} \binom{n}{k} 3^{n-k} = 4^n\), la formule du 2.</p>`) }],
    answer: r`<ul><li>1. \((a + b)^n = \sum_{k=0}^{n} \binom{n}{k} a^k b^{n-k}\).</li><li>2. \(a = 1\), \(b = 3\).</li><li>3. (a) 4 couleurs par case : \(4^n\) ; (b) \(k\) cases vertes choisies (\(\binom{n}{k}\)), les autres en 3 couleurs (\(3^{n-k}\)), somme sur \(k\) ; (c) même ensemble compté deux fois.</li></ul>`,
    traps: [
      r`(b) : dire que les cas selon \(k\) sont disjoints, sinon l’addition n’est pas justifiée.`,
      r`Les cases restantes ne peuvent plus être vertes : 3 couleurs, pas 4.`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: 'Rédaction du corrigé officiel. Identité vérifiée par programme pour \\(n \\leq 10\\), et par énumération des coloriages pour \\(n \\leq 6\\).', near: ['p2024-dp-ex3'],
    chk: {} });

  /* =====================================================================
     Contrôle S1, novembre 2021 (promo 2026) — sujet français et anglais, corrigé officiel français
     ===================================================================== */
  var N21 = 'Rédaction du corrigé officiel.';
  add({ id: 'p2021-ex1', exam: 'p2021', ecue: 'obm', order: 1, src: 'Contrôle S1 2021 · Ex 1', pts: 3, lvl: 1, time: 8,
    title: r`La relation \(x^2 \leq y^2\) est-elle une relation d’ordre ?`, topics: ['relations'],
    intro: r`<p>Dans \(\R\), on définit la relation suivante : \(\forall (x, y) \in \R^2,\ x \mathrel{\mathcal{R}} y \Leftrightarrow x^2 \leq y^2\).</p>`,
    questions: [r`Citer les différentes propriétés (avec les quantificateurs) qui définissent une relation d’ordre. Pour chacune d’entre elles, dire si la relation \(\mathcal{R}\) ci-dessus la vérifie en justifiant votre réponse.`],
    hints: [
      r`Relation d’ordre = réflexive, antisymétrique, transitive.`,
      r`Pour l’antisymétrie, pense à \(-1\) et \(1\).`],
    solution: [
      { t: 'Les trois propriétés', html: M(r`<p>• On dit que \(\mathcal{R}\) est réflexive si \(\forall x \in \R,\ x \mathrel{\mathcal{R}} x\). Soit \(x \in \R\). Comme \(x^2 \leq x^2\), on a \(x \mathrel{\mathcal{R}} x\). La relation est réflexive.</p><p>• On dit que \(\mathcal{R}\) est antisymétrique si \(\forall (x, y) \in \R^2,\ (x \mathrel{\mathcal{R}} y \text{ et } y \mathrel{\mathcal{R}} x) \Rightarrow x = y\). Prenons \(x = -1\) et \(y = 1\). Comme \(x^2 = y^2 = 1\), on a \(x \mathrel{\mathcal{R}} y\) et \(y \mathrel{\mathcal{R}} x\). Pourtant \(x \neq y\). La relation n’est pas antisymétrique.</p><p>• On dit que \(\mathcal{R}\) est transitive si \(\forall (x, y, z) \in \R^3,\ (x \mathrel{\mathcal{R}} y \text{ et } y \mathrel{\mathcal{R}} z) \Rightarrow x \mathrel{\mathcal{R}} z\). Soit \((x, y, z) \in \R^3\) tel que \(x \mathrel{\mathcal{R}} y\) et \(y \mathrel{\mathcal{R}} z\). On a alors \(x^2 \leq y^2\) et \(y^2 \leq z^2\). Ainsi \(x^2 \leq z^2\), d’où \(x \mathrel{\mathcal{R}} z\). La relation est transitive.</p><p>\(\mathcal{R}\) n’est pas une relation d’ordre.</p>`) }],
    answer: r`<p>Réflexive : oui. Antisymétrique : non (\(-1\) et \(1\)). Transitive : oui. Ce n’est pas une relation d’ordre.</p>`,
    traps: [
      r`Citer seulement les noms des propriétés : l’énoncé exige les quantificateurs.`,
      r`Conclure « relation d’ordre » sans avoir vérifié les trois propriétés.`],
    grading: '3 points pour l’exercice.',
    official: true, note: N21 + ' Propriétés vérifiées par programme sur une grille de réels.', near: ['p2024-obm-ex4'],
    chk: { refl: '~true', anti: '~false', trans: '~true' } });

  add({ id: 'p2021-ex2', exam: 'p2021', ecue: 'obm', order: 2, src: 'Contrôle S1 2021 · Ex 2', pts: 3, lvl: 1, time: 8,
    title: 'Traduire trois phrases avec des quantificateurs', topics: ['quantificateurs'],
    intro: r`<p>Traduire les propriétés suivantes en syntaxe mathématique (avec les quantificateurs).</p>`,
    questions: [
      r`<b>1.</b> Tout réel positif est le carré d’un réel.`,
      r`<b>2.</b> Si le produit de deux réels est nul alors l’un au moins de ces réels est nul.`,
      r`<b>3.</b> Tout entier naturel est pair ou impair. (Il est interdit dans cette question d’utiliser la notion de congruence).`],
    hints: [
      r`« Tout » donne \(\forall\) ; « est le carré d’un réel » : il existe un réel dont le carré…`,
      r`Pair : \(n = 2p\) pour un entier \(p\). Impair : \(n = 2p + 1\).`],
    solution: [
      { t: 'Traductions', html: M(r`<p>1. \(\forall x \in \R_+,\ \exists y \in \R,\ x = y^2\)</p><p>2. \(\forall (x, y) \in \R^2,\ xy = 0 \Rightarrow (x = 0 \text{ ou } y = 0)\)</p><p>3. \(\forall n \in \N,\ \exists p \in \N,\ n = 2p \text{ ou } n = 2p + 1\)</p>`) +
        r`<p>Pour la 3, \(\forall n \in \N,\ (\exists p \in \N,\ n = 2p) \lor (\exists p \in \N,\ n = 2p + 1)\) est aussi juste.</p>` }],
    answer: r`<ul><li>1. \(\forall x \in \R_+,\ \exists y \in \R,\ x = y^2\)</li><li>2. \(\forall (x, y) \in \R^2,\ xy = 0 \Rightarrow (x = 0 \lor y = 0)\)</li><li>3. \(\forall n \in \N,\ \exists p \in \N,\ n = 2p \lor n = 2p + 1\)</li></ul>`,
    traps: [
      r`1 : \(\exists y \in \R,\ \forall x \in \R_+,\ x = y^2\) dit qu’un même réel convient pour tous : c’est faux et ce n’est pas la phrase.`,
      r`2 : « l’un au moins » est un « ou » inclusif, pas un « ou bien ».`,
      r`3 : \((\forall n,\ n \text{ pair}) \lor (\forall n,\ n \text{ impair})\) dit autre chose (et c’est faux).`],
    grading: '3 points pour l’exercice.',
    official: true, note: N21,
    chk: {} });

  add({ id: 'p2021-ex4', exam: 'p2021', ecue: 'obm', order: 4, src: 'Contrôle S1 2021 · Ex 4', pts: 3.5, lvl: 2, time: 12,
    title: r`Une fonction de \(\N\) dans \(\N\) : injectivité, surjectivité, images`, topics: ['images', 'injections'],
    intro: r`<p>On considère la fonction \(f : \N \to \N\) définie par \(f(n) = \dfrac{n}{2}\) si \(n\) est pair et \(f(n) = n\) sinon.</p>`,
    questions: [
      r`<b>1.</b> \(f\) est-elle injective ? Justifiez votre réponse.`,
      r`<b>2.</b> \(f\) est-elle surjective ? Justifiez votre réponse.`,
      r`<b>3.</b> On suppose, dans cette question que l’on restreint le domaine de départ de \(f\) à \(E = \{0, 1, 2, 3, 4, 5, 6\}\). Donner \(f(\{0, 1, 2, 3\})\), \(f^{-1}(\{1, 3\})\) et \(f^{-1}(\{4\})\).`],
    hints: [
      r`Calcule les premières valeurs : \(f(0), f(1), f(2), \ldots\) Deux entiers ont-ils la même image ?`,
      r`Pour un \(n\) quelconque, cherche un antécédent pair.`],
    solution: [
      { t: 'Questions 1 et 2', html: M(r`<p>1. On a \(f(1) = 1 = f(2)\) et \(1 \neq 2\). \(f\) n’est donc pas injective.</p><p>2. Soit \(n \in \N\). On a \(f(2n) = \dfrac{2n}{2} = n\), car \(2n\) est pair. Ainsi \(\forall n \in \N,\ \exists m = 2n \in \N,\ n = f(m)\) : \(f\) est surjective.</p>`) },
      { t: 'Question 3 : sur E', html: '<div class="tbl"><table><thead><tr><th scope="row">\\(n\\)</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr></thead><tbody><tr><th scope="row">\\(f(n)\\)</th><td>0</td><td>1</td><td>1</td><td>3</td><td>2</td><td>5</td><td>3</td></tr></tbody></table></div>' +
        T('sagittal', { E: ['0', '1', '2', '3', '4', '5', '6'], F: ['0', '1', '2', '3', '4', '5', '6'], f: { 0: '0', 1: '1', 2: '1', 3: '3', 4: '2', 5: '5', 6: '3' }, mode: 'preimage', B: ['1', '3'] }) +
        M(r`<p>D’où : \(f(\{0, 1, 2, 3\}) = \{0, 1, 3\}\), \(f^{-1}(\{1, 3\}) = \{1, 2, 3, 6\}\) et \(f^{-1}(\{4\}) = \varnothing\).</p>`) }],
    answer: r`<ul><li>1. Non injective : \(f(1) = f(2) = 1\).</li><li>2. Surjective : \(f(2n) = n\).</li><li>3. \(f(\{0, 1, 2, 3\}) = \{0, 1, 3\}\), \(f^{-1}(\{1, 3\}) = \{1, 2, 3, 6\}\), \(f^{-1}(\{4\}) = \varnothing\).</li></ul>`,
    traps: [
      r`\(f^{-1}(\{4\})\) sur \(\N\) entier vaudrait \(\{8\}\) ; ici le départ est restreint à \(E\) : c’est \(\varnothing\).`,
      r`Oublier un antécédent : 6 a pour image 3, comme 3.`],
    grading: '3,5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: N21 + ' Images recalculées par programme.',
    chk: { img: '{0,1,3}', pre: '{1,2,3,6}', inj: '~false', surj: '~true' } });

  add({ id: 'p2021-ex5', exam: 'p2021', ecue: 'dp', order: 5, src: 'Contrôle S1 2021 · Ex 5', pts: 5, lvl: 2, time: 15,
    title: 'Formule de Pascal : par les tirages, puis par le calcul', topics: ['binomial', 'denombrement'],
    intro: r`<p>Dans une urne, il y a \(n\) boules indiscernables au toucher et numérotées de 1 à \(n\).</p><p>Pour un entier naturel \(k \leq n\), on tire simultanément \(k\) boules de l’urne.</p>`,
    questions: [
      r`<b>1.</b> Quel est le nombre de tirages possibles ? Justifiez brièvement.`,
      r`<b>2.</b> Quel est le nombre de tirages ayant la boule numérotée 1 ? Justifiez brièvement.`,
      r`<b>3.</b> Quel est le nombre de tirages n’ayant pas la boule numérotée 1 ? Justifiez brièvement.`,
      r`<b>4.</b> Expliquez en quoi les résultats précédents permettent de montrer la formule \((P)\) suivante : \(\dbinom{n}{k} = \dbinom{n-1}{k} + \dbinom{n-1}{k-1}\).`,
      r`<b>5.</b> Redémontrer la formule \((P)\) en utilisant l’expression des coefficients binomiaux avec les factoriels.`],
    hints: [
      r`Si la boule 1 est dans le tirage, il reste à choisir \(k - 1\) boules parmi les \(n - 1\) autres.`,
      r`Un tirage contient la boule 1 ou ne la contient pas : deux cas disjoints.`,
      r`Question 5 : réduis au même dénominateur \(k!\,(n-k)!\) en multipliant par \(\frac{n-k}{n-k}\) et \(\frac{k}{k}\).`],
    solution: [
      { t: 'Questions 1 à 4 : par les tirages', html: M(r`<p>1. Notons \(E\) l’ensemble des tirages possibles. Comme le tirage est simultané, cela revient à prendre \(k\) éléments parmi \(n\) : \(\card(E) = \binom{n}{k}\).</p><p>2. Notons \(F\) l’ensemble des tirages ayant la boule 1. Il n’y a qu’une seule façon de prendre la boule 1 ; il reste ensuite à prendre \(k - 1\) boules parmi \(n - 1\) : \(\card(F) = 1 \times \binom{n-1}{k-1} = \binom{n-1}{k-1}\).</p><p>3. L’ensemble \(\overline{F}\) des tirages n’ayant pas la boule 1 : cela revient à prendre \(k\) boules parmi les \(n - 1\) autres, \(\card(\overline{F}) = \binom{n-1}{k}\).</p><p>4. On a \(E = F \cup \overline{F}\) et cette union est disjointe. D’où \(\card(E) = \card(F) + \card(\overline{F})\). Par conséquent, \(\dbinom{n}{k} = \dbinom{n-1}{k} + \dbinom{n-1}{k-1}\).</p>`) },
      { t: 'Question 5 : par le calcul', html: M(r`<div class="fm">\[\begin{aligned}\binom{n-1}{k} + \binom{n-1}{k-1} &= \frac{(n-1)!}{k!\,(n-k-1)!} + \frac{(n-1)!}{(k-1)!\,(n-k)!} \\ &= \frac{(n-1)! \times (n-k)}{k!\,(n-k-1)! \times (n-k)} + \frac{(n-1)! \times k}{(k-1)!\,(n-k)! \times k} \\ &= \frac{(n-1)!\,(n-k) + (n-1)!\,k}{k!\,(n-k)!} = \frac{(n-1)!\,(n-k+k)}{k!\,(n-k)!} = \frac{n!}{k!\,(n-k)!} = \binom{n}{k}.\end{aligned}\]</div>`) +
        r`<p>Le calcul suppose \(1 \leq k \leq n - 1\) pour que toutes les factorielles aient un sens ; les cas \(k = 0\) et \(k = n\) se vérifient à part (avec \(\binom{n-1}{-1} = \binom{n-1}{n} = 0\)).</p>` }],
    answer: r`<ul><li>1. \(\binom{n}{k}\) ; 2. \(\binom{n-1}{k-1}\) ; 3. \(\binom{n-1}{k}\).</li><li>4. Tirages avec ou sans la boule 1 : partition, donc \(\binom{n}{k} = \binom{n-1}{k} + \binom{n-1}{k-1}\).</li><li>5. Même dénominateur \(k!\,(n-k)!\), puis \((n-1)!\,(n - k + k) = n!\).</li></ul>`,
    traps: [
      r`Question 2 : \(\binom{n-1}{k}\) au lieu de \(\binom{n-1}{k-1}\) : la boule 1 occupe déjà une des \(k\) places.`,
      r`Question 4 : dire que l’union est disjointe.`,
      r`Question 5 : \(k! = k \times (k-1)!\) et \((n-k)! = (n-k) \times (n-k-1)!\), les deux clés du calcul.`],
    grading: '5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: N21 + ' Formule de Pascal vérifiée par programme pour \\(n \\leq 12\\).',
    chk: {} });

  add({ id: 'p2021-ex6', exam: 'p2021', ecue: 'dp', order: 6, src: 'Contrôle S1 2021 · Ex 6', pts: 5, lvl: 2, time: 15,
    title: 'Un dé : Bernoulli, binomiale, loi d’un gain', topics: ['variables', 'esperance', 'lois'],
    intro: r`<p>On dispose d’un dé équilibré à 6 faces numérotées de 1 à 6.</p>`,
    questions: [
      r`<b>1.</b> Proposer une expérience simple avec le dé qui amène à la création d’une variable aléatoire \(X\) suivant une loi de Bernoulli de paramètre \(p = \frac{1}{6}\). Rappeler l’espérance et la variance de \(X\) en fonction de \(p\).`,
      r`<b>2.</b> Proposer une expérience simple avec le dé qui amène à la création d’une variable aléatoire \(Y\) suivant une loi binomiale de paramètres \(n = 10\) et \(p = \frac{1}{6}\). Rappeler l’espérance et la variance de \(Y\) en fonction de \(n\) et \(p\).`,
      r`<b>3.</b> On lance le dé une seule fois. On gagne 5 points si le dé amène un multiple de 3, 3 points si le dé amène 1 ou 2 et zéro point dans les autres cas. Soit \(G\) la variable égale au nombre de points marqués. Donner la loi de \(G\) et calculer son espérance et sa variance.`],
    hints: [
      r`Un événement de probabilité \(\frac{1}{6}\) : « le dé amène 1 ».`,
      r`Pour la binomiale, répète 10 fois le lancer, de façon indépendante.`,
      r`\(G\) prend les valeurs 0, 3, 5 ; les multiples de 3 entre 1 et 6 sont 3 et 6.`],
    solution: [
      { t: 'Questions 1 et 2', html: M(r`<p>1. On lance une fois le dé. Soit \(X\) la variable égale à 1 si le dé amène 1, à 0 sinon. On a \(\P(X = 1) = \frac{1}{6}\) et \(\P(X = 0) = \frac{5}{6}\) : \(X\) suit une loi de Bernoulli de paramètre \(p = \frac{1}{6}\). On sait alors que \(\E(X) = p = \frac{1}{6}\) et \(\V(X) = p(1 - p) = \frac{5}{36}\).</p><p>2. On répète l’expérience précédente 10 fois, les lancers étant indépendants. Soit \(Y\) le nombre de fois où le dé a amené 1. \(Y\) est la somme de 10 variables de Bernoulli indépendantes de même paramètre \(\frac{1}{6}\) : \(Y(\Omega) = \ent{0}{10}\) et, pour tout \(k \in \ent{0}{10}\), \(\P(Y = k) = \binom{10}{k}\left(\frac{1}{6}\right)^k\left(\frac{5}{6}\right)^{10-k}\). \(Y\) suit la loi binomiale de paramètres 10 et \(\frac{1}{6}\), donc \(\E(Y) = np = \frac{10}{6} = \frac{5}{3}\) et \(\V(Y) = np(1 - p) = \frac{25}{18}\).</p>`) },
      { t: 'Question 3 : le gain G', html: M(r`<p>\(G\) prend les valeurs 5, 3 et 0. Entre 1 et 6, il y a 2 multiples de 3 (3 et 6) : \(\P(G = 5) = \frac{2}{6} = \frac{1}{3}\). De plus \(\P(G = 3) = \frac{1}{6} + \frac{1}{6} = \frac{1}{3}\). \(G = 0\) quand le dé amène 4 ou 5 : \(\P(G = 0) = \frac{2}{6} = \frac{1}{3}\).</p><p>\(\E(G) = 0 \times \P(G = 0) + 3 \times \P(G = 3) + 5 \times \P(G = 5) = \frac{8}{3}\).</p><p>\(\E(G^2) = 0^2 \times \P(G = 0) + 3^2 \times \P(G = 3) + 5^2 \times \P(G = 5) = \frac{34}{3}\). Ainsi \(\V(G) = \E(G^2) - (\E(G))^2 = \frac{34}{3} - \frac{64}{9} = \frac{38}{9}\).</p>`) +
        T('law', { x: [0, 3, 5], p: ['1/3', '1/3', '1/3'], name: 'G' }) }],
    answer: r`<ul><li>1. \(X\) = 1 si le dé amène 1 : \(\E(X) = p = \frac{1}{6}\), \(\V(X) = p(1-p) = \frac{5}{36}\).</li><li>2. \(Y\) = nombre de 1 en 10 lancers indépendants : \(\E(Y) = np = \frac{5}{3}\), \(\V(Y) = np(1-p) = \frac{25}{18}\).</li><li>3. \(G(\Omega) = \{0, 3, 5\}\), chaque valeur de probabilité \(\frac{1}{3}\) ; \(\E(G) = \frac{8}{3}\) ; \(\V(G) = \frac{38}{9}\).</li></ul>`,
    traps: [
      r`\(\V(G) \neq \E(G^2)\) : il faut retrancher \((\E(G))^2 = \frac{64}{9}\).`,
      r`Donner la loi de \(G\), c’est donner \(G(\Omega)\) <b>et</b> les trois probabilités.`],
    grading: '5 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: N21 + ' Valeurs recalculées en fractions exactes.',
    chk: { vx: '5/36', ey: '5/3', vy: '25/18', eg: '8/3', eg2: '34/3', vg: '38/9' } });

  add({ id: 'p2021-ex7', exam: 'p2021', ecue: 'dp', order: 7, src: 'Contrôle S1 2021 · Ex 7', pts: 4, lvl: 2, time: 12,
    title: 'Test de dépistage : probabilités totales, Bayes', topics: ['conditionnelles', 'bayes'],
    intro: r`<p>Imaginons qu’un virus touche les habitants du monde entier. Des tests de dépistages du virus sont alors mis en vente. Le mode d’emploi précise que</p><ul><li>Si un individu n’est pas malade, le test est fiable dans 80 % des cas.</li><li>Si un individu est malade, le test est fiable dans 99 % des cas.</li></ul><p>On suppose que le virus touche 25 % de la population française. On tire un habitant au hasard et on lui fait passer le test.</p><p>On note \(M\) : « L’habitant est malade » et \(T\) : « Le test est positif ».</p>`,
    questions: [
      r`<b>1.</b> Donner une partition de l’événement \(T\) en fonction de \(M\). Donner alors la formule littérale qui permet de calculer \(\P(T)\). Préciser alors les valeurs numériques de chacune des probabilités y apparaissant (sans finaliser les calculs).`,
      r`<b>2.</b> Expliquer comment calculer la probabilité qu’un habitant soit malade sachant que le test est positif (la valeur finale n’est pas demandée).`],
    hints: [
      r`« Fiable » chez un non-malade veut dire négatif : \(\P(\overline{T} \mid \overline{M}) = 0{,}8\), donc \(\P(T \mid \overline{M}) = 0{,}2\).`,
      r`\(T = (T \cap M) \cup (T \cap \overline{M})\), union disjointe.`],
    solution: [
      { t: 'Question 1 : partition et probabilités totales', html: M(r`<p>\(\{M, \overline{M}\}\) forme une partition de l’univers. Ainsi \(T = (T \cap M) \cup (T \cap \overline{M})\) et cette union est disjointe. D’où</p><div class="fm">\[\P(T) = \P(T \cap M) + \P(T \cap \overline{M}) = \P(T \mid M)\P(M) + \P(T \mid \overline{M})\P(\overline{M}).\]</div><p>Avec \(\P(M) = 0{,}25\), \(\P(\overline{M}) = 0{,}75\), \(\P(T \mid M) = 0{,}99\) et \(\P(T \mid \overline{M}) = 1 - 0{,}8 = 0{,}2\) : \(\P(T) = 0{,}99 \times 0{,}25 + 0{,}2 \times 0{,}75\).</p>`) +
        r`<p>Valeur exacte : \(0{,}2475 + 0{,}15 = 0{,}3975 = \frac{159}{400}\) (le corrigé arrondit à 0,40).</p>` +
        T('tree', { first: [{ n: 'M', p: '1/4' }, { n: '\\overline{M}' }], second: { n: 'T', nb: '\\overline{T}', p: ['99/100', '1/5'] }, edit: false }) },
      { t: 'Question 2 : Bayes', html: M(r`<p>On cherche \(\P(M \mid T)\). On a</p><div class="fm">\[\P(M \mid T) = \frac{\P(T \cap M)}{\P(T)} = \frac{\P(T \mid M)\P(M)}{\P(T)} = \frac{0{,}99 \times 0{,}25}{0{,}3975}.\]</div>`) +
        r`<p>Valeur exacte : \(\frac{0{,}2475}{0{,}3975} = \frac{33}{53} \approx 0{,}62\) : un test positif ne signifie malade qu’environ 6 fois sur 10.</p>` }],
    answer: r`<ul><li>1. \(T = (T \cap M) \sqcup (T \cap \overline{M})\) ; \(\P(T) = \P(T \mid M)\P(M) + \P(T \mid \overline{M})\P(\overline{M}) = 0{,}99 \times 0{,}25 + 0{,}2 \times 0{,}75 = \frac{159}{400}\).</li><li>2. \(\P(M \mid T) = \frac{\P(T \mid M)\P(M)}{\P(T)} = \frac{33}{53}\).</li></ul>`,
    traps: [
      r`Prendre \(\P(T \mid \overline{M}) = 0{,}8\) : un test « fiable » chez un non-malade est <b>négatif</b>.`,
      r`Confondre \(\P(M \mid T)\) (ce qu’on cherche) et \(\P(T \mid M) = 0{,}99\).`],
    grading: '4 points pour l’exercice ; le sujet ne détaille pas les questions.',
    official: true, note: N21 + ' Le corrigé donne des valeurs arrondies (≈ 0,40 et ≈ 0,62) ; valeurs exactes 159/400 et 33/53 recalculées.', near: ['p2023-dp-ex4'],
    chk: { pt: '159/400', bayes: '33/53' } });

  add({ id: 'p2021-ex8', exam: 'p2021', ecue: 'obm', order: 8, src: 'Contrôle S1 2021 · Ex 8', pts: 2, lvl: 1, time: 8,
    title: 'Somme géométrique par récurrence', topics: ['recurrence', 'sommes'],
    intro: r`<p>Soit \(q \in \R\). Pour tout \(n \in \N\), on considère la somme \(S_n = \displaystyle\sum_{k=0}^{n} q^k = q^0 + q^1 + q^2 + \ldots + q^n\).</p>`,
    questions: [
      r`<b>1.</b> Que vaut \(S_n\) dans le cas où \(q = 1\) ?`,
      r`<b>2.</b> On suppose que \(q \neq 1\). Montrer par récurrence que, pour tout \(n \in \N\), \(S_n = \dfrac{1 - q^{n+1}}{1 - q}\).`],
    hints: [
      r`Si \(q = 1\), chaque terme vaut 1 : combien y a-t-il de termes de \(k = 0\) à \(k = n\) ?`,
      r`Hérédité : \(S_{n+1} = S_n + q^{n+1}\), puis l’hypothèse de récurrence, puis même dénominateur.`],
    solution: [
      { t: 'Question 1', html: M(r`<p>\(S_n = 1 + 1 + \ldots + 1\) et il y a \(n + 1\) termes. Donc \(S_n = n + 1\).</p>`) },
      { t: 'Question 2 : récurrence', html: M(r`<p>Pour \(n \in \N\), notons \(\mathcal{P}(n)\) : « \(S_n = \dfrac{1 - q^{n+1}}{1 - q}\) ».</p><p><b>Initialisation.</b> \(n = 0\) : \(S_0 = q^0 = 1\) et \(\dfrac{1 - q^{0+1}}{1 - q} = 1\). \(\mathcal{P}(0)\) est vraie.</p><p><b>Hérédité.</b> Supposons \(\mathcal{P}(n)\) vraie pour un \(n \in \N\) et montrons \(\mathcal{P}(n+1)\). On a</p><div class="fm">\[S_{n+1} = \sum_{k=0}^{n+1} q^k = \sum_{k=0}^{n} q^k + q^{n+1} = \frac{1 - q^{n+1}}{1 - q} + q^{n+1} = \frac{1 - q^{n+1} + q^{n+1}(1 - q)}{1 - q} = \frac{1 - q^{n+2}}{1 - q},\]</div><p>en utilisant l’hypothèse de récurrence. \(\mathcal{P}(n+1)\) est vraie.</p><p><b>Conclusion.</b> \(\mathcal{P}(0)\) est vraie et \(\mathcal{P}\) est héréditaire : par récurrence, pour tout \(n \in \N\), \(S_n = \dfrac{1 - q^{n+1}}{1 - q}\).</p>`) }],
    answer: r`<ul><li>1. \(S_n = n + 1\).</li><li>2. Initialisation \(S_0 = 1\) ; hérédité \(S_{n+1} = S_n + q^{n+1}\) ; conclusion.</li></ul>`,
    traps: [
      r`\(n\) termes au lieu de \(n + 1\) (la somme commence à \(k = 0\)).`,
      r`Écrire « supposons \(\mathcal{P}(n)\) vraie pour tout \(n\) » : c’est supposer ce qu’on veut démontrer. On suppose \(\mathcal{P}(n)\) pour un \(n\) fixé.`],
    grading: '2 points pour l’exercice.',
    official: true, note: N21 + ' Formule vérifiée par calcul formel (sympy) pour \\(n \\leq 30\\).',
    chk: {} });

  /* =====================================================================
     Contrôle 1, novembre 2020 (promo 2025) — corrigé officiel manuscrit
     ===================================================================== */
  var N20 = 'Réponses du corrigé officiel (manuscrit), rédaction complétée.';
  var REL20 = r`<p>On appelle \(\mathcal{C}\) l’ensemble des élèves d’une classe. On définit sur \(\mathcal{C}\) la relation suivante : \(\forall (e, e') \in \mathcal{C}^2,\ e \mathrel{\mathcal{R}} e' \Leftrightarrow\) « \(e\) habite à moins de 5 mn de chez \(e'\) ». On notera \(e \not\mathrel{\mathcal{R}} e'\) si : « \(e\) habite à strictement plus de 5 mn de chez \(e'\) ».</p>`;
  add({ id: 'p2020-ex1', exam: 'p2020', ecue: 'obm', order: 1, src: 'Contrôle 1 2020 · Ex 1', pts: 3, lvl: 2, time: 10,
    title: 'Traduire des phrases sur une relation entre élèves', topics: ['quantificateurs', 'relations'],
    intro: REL20 + r`<p>Exprimer avec des quantificateurs les phrases suivantes.</p><p>Exemple : « Un des élèves de la classe est à moins de 5 mn de tous les autres élèves. » s’écrit : \(\exists e \in \mathcal{C},\ \forall e' \in \mathcal{C},\ e \mathrel{\mathcal{R}} e'\).</p>`,
    questions: [
      r`<b>a.</b> Tout élève a au moins un camarade à moins de 5 mn de chez lui.`,
      r`<b>b.</b> Un des élèves n’a aucun camarade à moins de 5 mn de chez lui.`,
      r`<b>c.</b> Si un élève \(e\) habite à moins de 5 mn d’un élève \(e'\) et que \(e'\) habite à moins de 5 mn de \(e''\), alors \(e\) habite à moins de 5 mn de \(e''\).`],
    hints: [
      r`« Tout élève » : \(\forall e\) ; « au moins un camarade » : \(\exists e'\). L’ordre des quantificateurs suit l’ordre de la phrase.`,
      r`b est la négation de a.`,
      r`Un élève habite à moins de 5 mn de lui-même : un « camarade » est un autre élève, \(e' \neq e\).`],
    solution: [
      { t: 'Traductions', html: M(r`<p>a. \(\forall e \in \mathcal{C},\ \exists e' \in \mathcal{C} \setminus \{e\},\ e \mathrel{\mathcal{R}} e'\)</p><p>b. \(\exists e \in \mathcal{C},\ \forall e' \in \mathcal{C} \setminus \{e\},\ e \not\mathrel{\mathcal{R}} e'\)</p><p>c. \(\forall (e, e', e'') \in \mathcal{C}^3,\ (e \mathrel{\mathcal{R}} e' \text{ et } e' \mathrel{\mathcal{R}} e'') \Rightarrow e \mathrel{\mathcal{R}} e''\)</p>`) +
        r`<p>Le corrigé écrit \(\exists e' \in \mathcal{C}\) et \(\forall e' \in \mathcal{C}\), sans exclure \(e\). Mais \(e \mathrel{\mathcal{R}} e\) est toujours vrai (on habite à 0 mn de chez soi) : avec \(e' \in \mathcal{C}\), la phrase a serait toujours vraie et la phrase b toujours fausse. Exclure \(e\) traduit le mot « camarade ». La phrase c est la transitivité de \(\mathcal{R}\).</p>` }],
    answer: r`<ul><li>a. \(\forall e \in \mathcal{C},\ \exists e' \in \mathcal{C} \setminus \{e\},\ e \mathrel{\mathcal{R}} e'\)</li><li>b. \(\exists e \in \mathcal{C},\ \forall e' \in \mathcal{C} \setminus \{e\},\ e \not\mathrel{\mathcal{R}} e'\)</li><li>c. \(\forall (e, e', e'') \in \mathcal{C}^3,\ (e \mathrel{\mathcal{R}} e' \land e' \mathrel{\mathcal{R}} e'') \Rightarrow e \mathrel{\mathcal{R}} e''\)</li></ul>`,
    traps: [
      r`Inverser l’ordre : \(\exists e',\ \forall e\) dirait qu’un même élève est proche de tous.`,
      r`b : nier « au moins un » donne « aucun », c’est-à-dire \(\forall e',\ e \not\mathrel{\mathcal{R}} e'\).`],
    grading: '3 points pour l’exercice.',
    official: false, note: N20 + ' Le corrigé n’exclut pas \\(e\' = e\\) : sa traduction de a est toujours vraie et celle de b toujours fausse. La version du site exclut \\(e\\) ; les deux sont à connaître.',
    chk: {} });

  add({ id: 'p2020-ex2', exam: 'p2020', ecue: 'obm', order: 2, src: 'Contrôle 1 2020 · Ex 2', pts: 4, lvl: 2, time: 12,
    title: 'Habiter à moins de 5 minutes : une relation d’ordre ?', topics: ['relations'],
    intro: REL20 + r`<p>On s’intéresse de nouveau à la relation \(\mathcal{R}\) décrite dans l’exercice 1.</p>`,
    questions: [r`Citer les différentes propriétés qui définissent une relation d’ordre. Pour chacune d’elles, dire si la relation \(\mathcal{R}\) la vérifie et justifier sa réponse.`],
    hints: [
      r`Relation d’ordre = réflexive, antisymétrique, transitive.`,
      r`Pour réfuter, décris une situation concrète : deux élèves voisins, trois élèves alignés.`],
    solution: [
      { t: 'Les trois propriétés', html: M(r`<p>\(\mathcal{R}\) est une relation d’ordre si elle est réflexive, antisymétrique et transitive.</p><p><b>Réflexive</b> : \(\forall e \in \mathcal{C},\ e \mathrel{\mathcal{R}} e\). Vrai : tout élève habite à moins de 5 mn de chez lui-même.</p><p><b>Antisymétrique</b> : \(\forall (e, e') \in \mathcal{C}^2,\ (e \mathrel{\mathcal{R}} e' \text{ et } e' \mathrel{\mathcal{R}} e) \Rightarrow e = e'\). Faux dès que deux élèves distincts habitent à moins de 5 mn l’un de l’autre : alors \(e \mathrel{\mathcal{R}} e'\), \(e' \mathrel{\mathcal{R}} e\) et \(e \neq e'\).</p><p><b>Transitive</b> : \(\forall (e, e', e'') \in \mathcal{C}^3,\ (e \mathrel{\mathcal{R}} e' \text{ et } e' \mathrel{\mathcal{R}} e'') \Rightarrow e \mathrel{\mathcal{R}} e''\). Faux en général : si \(e'\) habite à 4 mn de \(e\) et \(e''\) à 4 mn de \(e'\) dans la direction opposée, \(e''\) est à 8 mn de \(e\).</p><p>\(\mathcal{R}\) n’est pas une relation d’ordre.</p>`) }],
    answer: r`<p>Réflexive : oui. Antisymétrique : non (deux voisins distincts). Transitive : non (\(e'\) entre \(e\) et \(e''\), à 4 mn de chacun). Pas une relation d’ordre.</p>`,
    traps: [
      r`\(\mathcal{R}\) est symétrique, ce qui n’aide pas : l’antisymétrie demande \(e = e'\).`,
      r`Un contre-exemple doit être concret (des distances), pas « ce n’est pas toujours vrai ».`],
    grading: '4 points pour l’exercice.',
    official: true, note: N20,
    chk: {} });

  add({ id: 'p2020-ex4', exam: 'p2020', ecue: 'obm', order: 4, src: 'Contrôle 1 2020 · Ex 4', pts: 3, lvl: 2, time: 10,
    title: r`\(x \mapsto (x - 2)^2 - 1\) : rendre injective, rendre surjective`, topics: ['injections', 'usuelles'],
    intro: r`<p>Soient \(E = \R\), \(F = \R\) et \(f : E \to F,\ x \mapsto (x - 2)^2 - 1\), dont voici le graphe.</p>` + FIG.parab,
    questions: [
      r`<b>a.</b> \(f\) est-elle injective ? Surjective ? Justifiez votre réponse.`,
      r`<b>b.</b> Proposer un intervalle \(I\) de \(\R\) tel qu’en remplaçant un seul des ensembles \(E\) ou \(F\) par \(I\), \(f\) soit injective. Justifiez votre réponse.`,
      r`<b>c.</b> Proposer un intervalle \(J\) de \(\R\) tel qu’en remplaçant un seul des ensembles \(E\) ou \(F\) par \(J\), \(f\) soit surjective. Justifiez votre réponse.`],
    hints: [
      r`La parabole a son sommet en \((2, -1)\) : symétrique par rapport à \(x = 2\), minimum \(-1\).`,
      r`Injective : on réduit le départ à une branche (où \(f\) est strictement monotone). Surjective : on réduit l’arrivée à \(f(\R)\).`],
    solution: [
      { t: 'Réponses', html: M(r`<p>a. \(f(1) = f(3) = 0\) et \(1 \neq 3\) : \(f\) n’est pas injective. Pour tout \(x \in \R\), \(f(x) \geq -1\), donc \(-2\) n’a pas d’antécédent : \(f\) n’est pas surjective.</p><p>b. On remplace \(E\) par \(I = [2, +\infty[\). \(f\) est strictement croissante sur \(I\) : \(\forall (x, y) \in I^2,\ x < y \Rightarrow f(x) < f(y)\). Donc deux éléments distincts de \(I\) ont des images distinctes : \(f\) est injective de \(I\) dans \(\R\).</p><p>c. On remplace \(F\) par \(J = [-1, +\infty[\). Alors \(f(\R) = J\), car \(\min_{\R} f = f(2) = -1\), \(\lim_{+\infty} f = +\infty\) et \(f\) est continue sur \(\R\). Donc \(f\) est surjective de \(\R\) dans \(J\) : pour \(y \geq -1\), \(x = 2 + \sqrt{y + 1}\) vérifie \(f(x) = y\).</p>`) }],
    answer: r`<ul><li>a. Non injective (\(f(1) = f(3) = 0\)), non surjective (\(-2\) n’a pas d’antécédent).</li><li>b. \(E\) remplacé par \(I = [2, +\infty[\) (strictement croissante).</li><li>c. \(F\) remplacé par \(J = [-1, +\infty[ = f(\R)\).</li></ul>`,
    traps: [
      r`« Croissante donc injective » : il faut <b>strictement</b> monotone.`,
      r`Réduire le départ ne rend pas surjective : c’est l’arrivée qu’il faut remplacer par \(f(\R)\).`,
      r`\(]-\infty, 2]\) convient aussi pour b (\(f\) y est strictement décroissante).`],
    grading: '3 points pour l’exercice.',
    official: true, note: N20 + ' Images recalculées par programme.',
    chk: { inj: '~false', surj: '~false', I: '[2,+\\infty[', J: '[-1,+\\infty[' } });

  add({ id: 'p2020-ex5', exam: 'p2020', ecue: 'dp', order: 5, src: 'Contrôle 1 2020 · Ex 5', pts: 4, lvl: 1, time: 10,
    title: r`Symétrie des coefficients binomiaux : \(\binom{n}{p} = \binom{n}{n-p}\)`, topics: ['binomial'],
    intro: r`<p>Soient \((n, p) \in \N^2\), \(p \leq n\).</p>`,
    questions: [
      r`<b>1.</b> Quelle relation relie \(\dbinom{n}{p}\) et \(\dbinom{n}{n-p}\) ?`,
      r`<b>2.</b> Démontrer cette relation par le calcul.`,
      r`<b>3.</b> Soit \(E\) un ensemble à \(n\) éléments. À quoi correspond le nombre \(\dbinom{n}{p}\) ? \(\dbinom{n}{n-p}\) ? Comment justifier la relation du 1. ?`],
    hints: [
      r`Écris \(\binom{n}{n-p}\) avec les factorielles et simplifie \(n - (n - p)\).`,
      r`Choisir les \(p\) éléments d’une partie, c’est aussi choisir les \(n - p\) éléments qu’on laisse.`],
    solution: [
      { t: 'Réponses', html: M(r`<p>1. \(\dbinom{n}{p} = \dbinom{n}{n-p}\).</p><p>2. \(\dbinom{n}{n-p} = \dfrac{n!}{(n-p)!\,\big(n - (n-p)\big)!} = \dfrac{n!}{(n-p)!\,p!} = \dbinom{n}{p}\).</p><p>3. \(\binom{n}{p}\) est le nombre de sous-ensembles à \(p\) éléments de \(E\) ; \(\binom{n}{n-p}\) est le nombre de sous-ensembles à \(n - p\) éléments. Quand on choisit un sous-ensemble \(A\) à \(p\) éléments, son complémentaire \(\overline{A}\) a \(n - p\) éléments, et \(A \mapsto \overline{A}\) associe à chaque partie à \(p\) éléments une unique partie à \(n - p\) éléments (c’est une bijection : \(\overline{\overline{A}} = A\)). Il y a donc autant de sous-ensembles à \(p\) éléments qu’à \(n - p\) éléments.</p>`) }],
    answer: r`<ul><li>1. \(\binom{n}{p} = \binom{n}{n-p}\).</li><li>2. \(n - (n - p) = p\) dans la factorielle.</li><li>3. Parties à \(p\) et à \(n - p\) éléments ; passage au complémentaire.</li></ul>`,
    traps: [
      r`Question 3 : il faut dire pourquoi les deux nombres sont égaux (le complémentaire), pas seulement ce qu’ils comptent.`],
    grading: '4 points pour l’exercice.',
    official: true, note: N20 + ' Symétrie vérifiée par programme pour \\(n \\leq 15\\).',
    chk: {} });

  add({ id: 'p2020-ex6', exam: 'p2020', ecue: 'obm', order: 6, src: 'Contrôle 1 2020 · Ex 6', pts: 4, lvl: 2, time: 14,
    title: r`Récurrence : \(\frac{2^n}{n!} \leq \frac{9}{2}\left(\frac{2}{3}\right)^n\) pour \(n \geq 2\)`, topics: ['recurrence'],
    intro: '',
    questions: [r`Montrer par récurrence la proposition suivante : \(\forall n \in \N,\ n \geq 2,\ \dfrac{2^n}{n!} \leq \dfrac{9}{2}\left(\dfrac{2}{3}\right)^n\).`],
    hints: [
      r`Le rang initial est \(n = 2\), pas 0.`,
      r`\(\dfrac{2^{n+1}}{(n+1)!} = \dfrac{2^n}{n!} \times \dfrac{2}{n+1}\), et pour \(n \geq 2\), \(\dfrac{2}{n+1} \leq \dfrac{2}{3}\).`],
    solution: [
      { t: 'Rédaction de la récurrence', html: M(r`<p>On pose \(\mathcal{P}(n)\) : « \(\dfrac{2^n}{n!} \leq \dfrac{9}{2}\left(\dfrac{2}{3}\right)^n\) ».</p><p><b>Initialisation</b> : \(n = 2\). \(\dfrac{2^2}{2!} = \dfrac{4}{2} = 2\) et \(\dfrac{9}{2}\left(\dfrac{2}{3}\right)^2 = \dfrac{9}{2} \times \dfrac{4}{9} = 2\). Donc \(\mathcal{P}(2)\) est vraie.</p><p><b>Hérédité</b> : on suppose que, pour un \(n \geq 2\), \(\mathcal{P}(n)\) est vraie ; montrons qu’alors \(\mathcal{P}(n+1)\) est vraie, c’est-à-dire \(\dfrac{2^{n+1}}{(n+1)!} \leq \dfrac{9}{2}\left(\dfrac{2}{3}\right)^{n+1}\).</p><div class="fm">\[\frac{2^{n+1}}{(n+1)!} = \frac{2^n}{n!} \times \frac{2}{n+1} \leq \frac{9}{2}\left(\frac{2}{3}\right)^n \times \frac{2}{n+1} \quad \text{car } \mathcal{P}(n) \text{ est vraie.}\]</div><p>Or \(n \geq 2\) donne \(n + 1 \geq 3\), donc \(\dfrac{2}{n+1} \leq \dfrac{2}{3}\). Ainsi</p><div class="fm">\[\frac{2^{n+1}}{(n+1)!} \leq \frac{9}{2}\left(\frac{2}{3}\right)^n \times \frac{2}{3} = \frac{9}{2}\left(\frac{2}{3}\right)^{n+1}.\]</div><p>On a donc, pour tout \(n \geq 2\), \(\mathcal{P}(n) \Rightarrow \mathcal{P}(n+1)\).</p><p><b>Conclusion</b> : \(\mathcal{P}(2)\) est vraie et \(\forall n \geq 2,\ \mathcal{P}(n) \Rightarrow \mathcal{P}(n+1)\). Par récurrence, \(\forall n \geq 2\), \(\mathcal{P}(n)\) est vraie.</p>`) }],
    answer: r`<p>Initialisation : \(2 \leq 2\). Hérédité : \(\frac{2^{n+1}}{(n+1)!} = \frac{2^n}{n!} \cdot \frac{2}{n+1}\) et \(\frac{2}{n+1} \leq \frac{2}{3}\) pour \(n \geq 2\). Conclusion.</p>`,
    traps: [
      r`Multiplier une inégalité par \(\frac{2}{n+1}\) est permis car ce nombre est positif : dis-le.`,
      r`Oublier d’utiliser \(n \geq 2\) : c’est lui qui donne \(\frac{2}{n+1} \leq \frac{2}{3}\).`,
      r`Écrire la conclusion avec le bon rang : « pour tout \(n \geq 2\) ».`],
    grading: '4 points pour l’exercice.',
    official: true, note: N20 + ' Inégalité vérifiée en fractions exactes pour \\(2 \\leq n \\leq 40\\) (égalité en \\(n = 2\\)).',
    chk: { init: '~2' } });

  add({ id: 'p2020-ex7', exam: 'p2020', ecue: 'dp', order: 7, src: 'Contrôle 1 2020 · Ex 7', pts: 7, lvl: 2, time: 20,
    title: 'Mots de 5 lettres, avec ou sans répétition', topics: ['denombrement'],
    intro: r`<p>1. Dans cet exercice, l’application numérique exacte n’est pas demandée. Seule la formule appliquée aux données de l’exercice est attendue.</p><p>2. Les questions de cet exercice sont indépendantes les unes des autres.</p><p>On considère l’ensemble \(E = \{a, b, c, d, e, f, g, h, i, j, k, l\}\).</p>`,
    questions: [
      r`<b>1.</b> On appelle \(M_5(E)\) l’ensemble des mots de cinq lettres construits à partir des lettres de \(E\) avec répétition, comme par exemple : « kabke ».<p>a. Quel est le cardinal de \(M_5(E)\) ?</p><p>b. Combien y a-t-il de mots contenant au moins une fois la lettre « l » dans \(M_5(E)\) ?</p><p>c. Combien y a-t-il d’anagrammes du mot « babab » ?</p>`,
      r`<b>2.</b> On appelle \(N_5(E)\) l’ensemble des mots de 5 lettres sans répétition construits à partir des lettres de \(E\). Exemple : « kgehj ».<p>a. Quel est le cardinal de \(N_5(E)\) ?</p><p>b. Combien y a-t-il de mots se terminant par une voyelle dans \(N_5(E)\) ?</p><p>c. Combien y a-t-il de mots ne contenant aucune des lettres \(\{a, d, e, f, h\}\) dans \(N_5(E)\) ?</p><p>d. Combien y a-t-il de mots contenant au moins une des lettres \(\{a, d, e, f, h\}\) dans \(N_5(E)\) ?</p>`],
    hints: [
      r`\(E\) a 12 lettres. Avec répétition : 5-listes, \(12^5\). Sans répétition : arrangements \(A_{12}^5\).`,
      r`« Au moins » : total moins « aucun ». Les voyelles de \(E\) sont a, e, i.`,
      r`« babab » : 5 lettres dont trois b et deux a.`],
    solution: [
      { t: 'Question 1 : avec répétition', html: M(r`<p>a. Un mot est une 5-liste de lettres de \(E\) (12 lettres), avec répétition : \(\card(M_5(E)) = 12^5\).</p><p>b. On passe par le complémentaire : il y a \(11^5\) mots sans « l ». Donc \(12^5 - 11^5\) mots contiennent au moins un « l ».</p><p>c. Une anagramme de « babab » est déterminée par la place des deux « a » parmi les 5 places : \(\dbinom{5}{2} = \dfrac{5!}{3!\,2!} = 10\) anagrammes.</p>`) +
        r`<p>Valeurs : \(248\,832\) ; \(248\,832 - 161\,051 = 87\,781\) ; \(10\).</p>` },
      { t: 'Question 2 : sans répétition', html: M(r`<p>a. Un mot sans répétition est un arrangement de 5 lettres parmi 12 : \(\card(N_5(E)) = A_{12}^5 = 12 \times 11 \times 10 \times 9 \times 8\).</p><p>b. Les voyelles de \(E\) sont a, e, i. On choisit d’abord la dernière lettre (3 choix), puis les 4 premières parmi les 11 lettres restantes, dans l’ordre : \(3 \times A_{11}^4 = 3 \times 11 \times 10 \times 9 \times 8\).</p><p>c. Sans les lettres a, d, e, f, h, il reste 7 lettres : \(A_7^5 = \dfrac{7!}{2!} = 7 \times 6 \times 5 \times 4 \times 3\).</p><p>d. Complémentaire de c : \(A_{12}^5 - A_7^5\).</p>`) +
        r`<p>Valeurs : \(95\,040\) ; \(23\,760\) ; \(2\,520\) ; \(95\,040 - 2\,520 = 92\,520\).</p>` }],
    answer: r`<ul><li>1. a. \(12^5\) ; b. \(12^5 - 11^5\) ; c. \(\frac{5!}{3!\,2!} = 10\).</li><li>2. a. \(A_{12}^5\) ; b. \(3 \times A_{11}^4\) ; c. \(A_7^5 = \frac{7!}{2!}\) ; d. \(A_{12}^5 - A_7^5\).</li></ul>`,
    traps: [
      r`2.b : commencer par la contrainte (la dernière lettre), puis remplir les autres places.`,
      r`« babab » : diviser par \(3!\) et \(2!\) (lettres répétées).`,
      r`1.b : \(5 \times 12^4\) compte plusieurs fois les mots à deux « l » ou plus.`],
    grading: '7 points pour l’exercice ; seule la formule appliquée est attendue.',
    official: true, note: N20 + ' Valeurs vérifiées par énumération exhaustive.',
    chk: { a: '248832', b: '87781', c: '10', na: '95040', nb: '23760', nc: '2520', nd: '92520' } });

  /* =====================================================================
     Contrôle 1, octobre 2019 (promo 2024) — corrigé officiel (trois erreurs)
     ===================================================================== */
  add({ id: 'p2019-ex1', exam: 'p2019', ecue: 'obm', order: 1, src: 'Contrôle 1 2019 · Ex 1', pts: 2, lvl: 1, time: 8,
    title: r`Quatre assertions quantifiées sur \(x + y^2 = 0\)`, topics: ['quantificateurs'],
    intro: r`<p>Pour tous réels \(x\) et \(y\), soit \(P(x, y)\) la proposition \(x + y^2 = 0\). Les assertions suivantes sont-elles vraies ? Justifier votre réponse.</p>`,
    questions: [
      r`<b>1.</b> \(\forall x \in \R\ \ \forall y \in \R\ \ P(x, y)\)`,
      r`<b>2.</b> \(\forall x \in \R\ \ \exists y \in \R\ \ P(x, y)\)`,
      r`<b>3.</b> \(\forall y \in \R\ \ \exists x \in \R\ \ P(x, y)\)`,
      r`<b>4.</b> \(\exists x \in \R\ \ \exists y \in \R\ \ P(x, y)\)`],
    hints: [
      r`\(P(x, y)\) équivaut à \(x = -y^2\) : \(x\) doit être négatif ou nul.`,
      r`Un \(\forall\) faux se réfute par un contre-exemple ; un \(\exists\) vrai se prouve par un témoin.`],
    solution: [
      { t: 'Vrai ou faux', html: M(r`<p>1. Fausse : pour \(x = y = 1\), \(x + y^2 = 2 \neq 0\).</p><p>2. Fausse : pour \(x = 1\), \(1 + y^2 \geq 1 > 0\) pour tout réel \(y\) ; aucun \(y\) ne convient.</p><p>3. Vraie : soit \(y \in \R\) ; il suffit de prendre \(x = -y^2\), alors \(x + y^2 = 0\).</p><p>4. Vraie : \(x = y = 0\) convient.</p>`) }],
    answer: r`<p>1. Fausse ; 2. Fausse ; 3. Vraie ; 4. Vraie.</p>`,
    traps: [
      r`2 et 3 ne diffèrent que par l’ordre des variables : \(x\) imposé puis \(y\) cherché, ou l’inverse. Ici \(x = -y^2\) se calcule toujours, \(y = \sqrt{-x}\) seulement si \(x \leq 0\).`,
      r`Pour 2, un seul \(x\) qui ne marche pas suffit, mais il faut montrer qu’<b>aucun</b> \(y\) ne convient pour ce \(x\).`],
    grading: '2 points pour l’exercice.',
    official: true, note: 'Réponses du corrigé officiel, justifications complétées. Vérifiées par programme.',
    chk: { v: '~FFVV' } });

  add({ id: 'p2019-ex3', exam: 'p2019', ecue: 'obm', order: 3, src: 'Contrôle 1 2019 · Ex 3', pts: 2, lvl: 1, time: 8,
    title: r`Injectivité, surjectivité entre \(\N\) et \(2\N\)`, topics: ['injections'],
    intro: r`<p>Soient \(E = \N\) et \(F = 2\N\) où \(2\N\) désigne l’ensemble des entiers naturels pairs. Soient \(f : E \to F,\ x \mapsto 2x + 4\) et \(g : F \to E,\ x \mapsto \dfrac{x}{2} + 2\).</p>`,
    questions: [
      r`<b>1.</b> \(f\) est-elle injective ? Surjective ? Justifiez votre réponse.`,
      r`<b>2.</b> \(g\) est-elle injective ? Surjective ? Justifiez votre réponse.`],
    hints: [
      r`Calcule \(f(0)\) : quelles valeurs paires sont atteintes ?`,
      r`\(g(0) = 2\) : quels entiers naturels ne sont jamais atteints par \(g\) ?`],
    solution: [
      { t: 'Réponses', html: M(r`<p>1. \(f\) est injective : si \((x, y) \in E^2\) vérifie \(f(x) = f(y)\), alors \(2x + 4 = 2y + 4\), donc \(x = y\). \(f\) n’est pas surjective : \(2 \in F\) n’a pas d’antécédent, car \(2x + 4 = 2\) donne \(x = -1 \notin \N\).</p><p>2. \(g\) est injective : si \((x, y) \in F^2\) vérifie \(g(x) = g(y)\), alors \(\dfrac{x}{2} + 2 = \dfrac{y}{2} + 2\), donc \(x = y\). \(g\) n’est pas surjective : \(1 \in E\) n’a pas d’antécédent, car \(\dfrac{x}{2} + 2 = 1\) donne \(x = -2 \notin 2\N\).</p>`) +
        r`<p>\(f(\N) = \{4, 6, 8, \ldots\}\) et \(g(2\N) = \{2, 3, 4, \ldots\}\) : 0 et 2 manquent à la première, 0 et 1 à la seconde.</p>` }],
    answer: r`<ul><li>1. \(f\) injective, non surjective (2 n’a pas d’antécédent).</li><li>2. \(g\) injective, non surjective (1 n’a pas d’antécédent).</li></ul>`,
    traps: [
      r`Regarder les ensembles : l’antécédent doit être dans l’ensemble de départ (\(-1 \notin \N\), \(-2 \notin 2\N\)).`,
      r`\(g\) n’est pas la réciproque de \(f\) : \(g(f(x)) = x + 4\).`],
    grading: '2 points pour l’exercice.',
    official: true, note: 'Rédaction du corrigé officiel. Images vérifiées par programme.',
    chk: { f: '~inj,nonsurj', g: '~inj,nonsurj' } });

  add({ id: 'p2019-ex4', exam: 'p2019', ecue: 'obm', order: 4, src: 'Contrôle 1 2019 · Ex 4', pts: 1.5, lvl: 2, time: 8,
    title: r`Une relation d’équivalence sur \(\Z \times \Z^*\)`, topics: ['relations'],
    intro: r`<p>Sur \(E = \Z \times \Z^*\) on définit la relation \(\mathcal{R}\) définie par \((a, b) \mathrel{\mathcal{R}} (a', b') \Leftrightarrow ab' = ba'\).</p>`,
    questions: [r`Montrer que \(\mathcal{R}\) est une relation d’équivalence.`],
    hints: [
      r`Relation d’équivalence = réflexive, symétrique, transitive.`,
      r`Transitivité : multiplie \(ab' = ba'\) par \(b''\), utilise \(a'b'' = b'a''\), puis simplifie par \(b' \neq 0\).`],
    solution: [
      { t: 'Les trois propriétés', html: M(r`<p><b>Réflexive.</b> Soit \((a, b) \in E\). Alors \(ab = ba\), donc \((a, b) \mathrel{\mathcal{R}} (a, b)\).</p><p><b>Symétrique.</b> Soient \((a, b), (a', b') \in E\) tels que \((a, b) \mathrel{\mathcal{R}} (a', b')\). Alors \(ab' = ba'\), donc \(a'b = b'a\), d’où \((a', b') \mathrel{\mathcal{R}} (a, b)\).</p><p><b>Transitive.</b> Soient \((a, b), (a', b'), (a'', b'') \in E\) tels que \((a, b) \mathrel{\mathcal{R}} (a', b')\) et \((a', b') \mathrel{\mathcal{R}} (a'', b'')\). Alors \(ab' = ba'\) et \(a'b'' = b'a''\). Comme \(b\), \(b'\), \(b''\) sont non nuls, \(\dfrac{a}{b} = \dfrac{a'}{b'}\) et \(\dfrac{a'}{b'} = \dfrac{a''}{b''}\). Ainsi \(\dfrac{a}{b} = \dfrac{a''}{b''}\), donc \(ab'' = ba''\) : \((a, b) \mathrel{\mathcal{R}} (a'', b'')\).</p><p>\(\mathcal{R}\) est réflexive, symétrique et transitive : c’est une relation d’équivalence.</p>`) +
        r`<p>Sans fractions : \(ab'b'' = ba'b'' = b\,b'a''\), puis on simplifie par \(b' \neq 0\). C’est là que sert \(b' \in \Z^*\).</p>` }],
    answer: r`<p>Réflexive (\(ab = ba\)), symétrique (\(ab' = ba' \Rightarrow a'b = b'a\)), transitive (\(\frac{a}{b} = \frac{a'}{b'} = \frac{a''}{b''}\), dénominateurs non nuls) : relation d’équivalence.</p>`,
    traps: [
      r`Diviser par \(a'\) (qui peut être nul) au lieu de \(b'\) (non nul par définition de \(E\)).`,
      r`Oublier une des trois propriétés.`],
    grading: '1,5 point pour l’exercice.',
    official: true, note: 'Rédaction du corrigé officiel. Propriétés vérifiées par énumération sur \\(\\ent{-6}{6} \\times (\\ent{-6}{6} \\setminus \\{0\\})\\).',
    chk: { eq: '~true' } });

  add({ id: 'p2019-ex5', exam: 'p2019', ecue: 'dp', order: 5, src: 'Contrôle 1 2019 · Ex 5', pts: 3, lvl: 2, time: 12,
    title: 'Tirages de balles, anagrammes, bureaux d’une association', topics: ['denombrement'],
    intro: '',
    questions: [
      r`<b>1.</b> Un sac contient \(n\) balles de tennis de table numérotées de 1 à \(n\). On tire successivement \(p\) balles du sac en remettant chaque fois dans ce dernier la balle qu’on vient de sélectionner. Quel est le nombre de tirages possibles ?`,
      r`<b>2.</b> Même question si à chaque tirage, on ne remet pas la balle sélectionnée dans le sac.`,
      r`<b>3.</b> Déterminer le nombre d’anagrammes des mots « table » et « tableau ».`,
      r`<b>4.</b> Imaginons une association de l’EPITA constituée de \(n\) membres (\(n \in \N^*\)). Appelons bureau le choix d’un ensemble de conseillers dont le nombre peut aller de 1 à \(n\) ainsi qu’un président faisant partie des conseillers. Déterminer le nombre de tels bureaux.`],
    hints: [
      r`Avec remise : \(n\) choix à chaque tirage. Sans remise : un de moins à chaque fois (il faut \(p \leq n\)).`,
      r`Compte les lettres de « tableau » : t, a, b, l, e, a, u. Le « a » est répété.`,
      r`Bureau : choisis d’abord le président, puis n’importe quelle partie des \(n - 1\) autres membres.`],
    solution: [
      { t: 'Questions 1 et 2', html: M(r`<p>1. Chaque tirage offre \(n\) possibilités (la balle est remise) : \(n^p\) tirages (\(p\)-listes).</p><p>2. Sans remise (\(p \leq n\)) : \(A_n^p = n(n-1)\cdots(n-p+1) = \dfrac{n!}{(n-p)!}\) tirages.</p>`) },
      { t: 'Question 3 : anagrammes', html: M(r`<p>Les anagrammes de « table » correspondent aux permutations des 5 lettres distinctes t, a, b, l, e : il y en a \(5! = 120\).</p><p>« tableau » a 7 lettres (t, a, b, l, e, a, u), dont la lettre « a » répétée deux fois. Échanger les deux « a » ne change pas le mot : il y a \(\dfrac{7!}{2!} = 2\,520\) anagrammes.</p>`) +
        r`<p>Le corrigé officiel écrit \(\frac{5!}{2!} = 60\) : il compte 5 lettres au lieu de 7. C’est faux.</p>` },
      { t: 'Question 4 : bureaux', html: M(r`<p>Il y a \(n\) façons de choisir le président parmi les \(n\) membres. Les autres conseillers (éventuels) forment une partie quelconque de l’ensemble des \(n - 1\) autres membres : \(2^{n-1}\) choix. Au total, il y a \(n\,2^{n-1}\) bureaux possibles.</p>`) +
        r`<p>Autre calcul : \(\sum_{k=1}^{n} k\binom{n}{k}\) (\(k\) conseillers, puis le président parmi eux) ; on retrouve \(n\,2^{n-1}\), vérifié pour \(n \leq 8\).</p>` }],
    answer: r`<ul><li>1. \(n^p\)</li><li>2. \(A_n^p = \frac{n!}{(n-p)!}\)</li><li>3. « table » : \(5! = 120\) ; « tableau » : \(\frac{7!}{2!} = 2\,520\)</li><li>4. \(n\,2^{n-1}\)</li></ul>`,
    traps: [
      r`Compter les lettres avant d’appliquer la formule : « tableau » en a 7.`,
      r`Avec remise : \(n^p\), pas \(p^n\).`,
      r`Bureau : le président fait partie des conseillers ; ne pas le recompter parmi les autres.`],
    grading: '3 points pour l’exercice.',
    official: false, note: 'Corrigé officiel juste pour les questions 1, 2 et 4 ; faux pour « tableau » (60 au lieu de 2 520). Anagrammes et bureaux vérifiés par énumération.',
    chk: { table: '120', tableau: '2520' } });

  add({ id: 'p2019-ex6', exam: 'p2019', ecue: 'dp', order: 6, src: 'Contrôle 1 2019 · Ex 6', pts: 3, lvl: 2, time: 12,
    title: 'Trois balles tirées dans un sac de trois couleurs', topics: ['probabilites', 'denombrement'],
    intro: r`<p>Dans cet exercice, l’application numérique exacte n’est pas demandée : si les résultats s’expriment sous forme de fractions, on demande juste de déterminer explicitement les numérateurs et les dénominateurs.</p><p>Un sac contient 2 balles blanches, 3 vertes et 5 rouges. On pioche simultanément 3 balles. Déterminer la probabilité, lors du piochage de ces 3 balles, d’avoir</p>`,
    questions: [
      r`<b>1.</b> une seule couleur ?`,
      r`<b>2.</b> les trois couleurs parmi ces 3 balles ?`,
      r`<b>3.</b> au moins deux couleurs ?`],
    hints: [
      r`Univers : les parties à 3 éléments des 10 balles, toutes équiprobables : \(\binom{10}{3} = 120\) tirages.`,
      r`Une seule couleur : trois rouges ou trois vertes (il n’y a que 2 blanches).`,
      r`« Au moins deux couleurs » est le contraire de « une seule couleur ».`],
    solution: [
      { t: 'Réponses', html: M(r`<p>Les \(\binom{10}{3} = 120\) tirages simultanés sont équiprobables.</p><p>1. Obtenir 3 balles d’une seule couleur signifie obtenir 3 rouges (parmi 5) ou 3 vertes (parmi 3) ; c’est impossible en blanc. La probabilité cherchée est \(\dfrac{\binom{5}{3} + \binom{3}{3}}{\binom{10}{3}} = \dfrac{11}{120}\).</p><p>2. Les trois couleurs : 1 rouge (parmi 5) et 1 verte (parmi 3) et 1 blanche (parmi 2). La probabilité cherchée est \(\dfrac{\binom{5}{1}\binom{3}{1}\binom{2}{1}}{\binom{10}{3}} = \dfrac{30}{120} = \dfrac{1}{4}\).</p><p>3. « Au moins deux couleurs » est l’événement contraire de « une seule couleur » : \(1 - \dfrac{11}{120} = \dfrac{109}{120}\).</p>`) }],
    answer: r`<ul><li>1. \(\frac{\binom{5}{3} + \binom{3}{3}}{\binom{10}{3}} = \frac{11}{120}\)</li><li>2. \(\frac{5 \times 3 \times 2}{120} = \frac{1}{4}\)</li><li>3. \(\frac{109}{120}\)</li></ul>`,
    traps: [
      r`Compter \(\binom{2}{3}\) pour les blanches : il vaut 0, il n’y a que deux blanches.`,
      r`Question 3 : passer par le contraire plutôt que d’additionner « deux couleurs » et « trois couleurs ».`],
    grading: '3 points pour l’exercice.',
    official: true, note: 'Rédaction du corrigé officiel (qui note \\(C_n^p\\) les coefficients binomiaux). Vérifié par énumération des 120 tirages.',
    chk: { q1: '11/120', q2: '1/4', q3: '109/120' } });

  add({ id: 'p2019-ex7', exam: 'p2019', ecue: 'dp', order: 7, src: 'Contrôle 1 2019 · Ex 7', pts: 2, lvl: 2, time: 8,
    title: 'Dé à 8 faces : indépendants ? incompatibles ?', topics: ['independance', 'probabilites'],
    intro: r`<p>On jette un dé à 8 faces capricieux dont on appelle \(X\) le résultat du jet. On obtient la situation suivante :</p><div class="tbl"><table><thead><tr><th scope="row">\(k\) (n° obtenu après le jet)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr></thead><tbody><tr><th scope="row">\(\P(X = k)\)</th><td>0,05</td><td>0,1</td><td>0,05</td><td>0,2</td><td>0,1</td><td>0,3</td><td>0,1</td><td>0,1</td></tr></tbody></table></div>`,
    questions: [r`Les événements « \(X\) pair » et « \(X \leq 4\) » sont-ils indépendants ? Incompatibles ?`],
    hints: [
      r`Nomme \(A\) : « \(X\) pair », \(B\) : « \(X \leq 4\) ». Calcule \(\P(A)\), \(\P(B)\) et \(\P(A \cap B)\).`,
      r`Indépendants : \(\P(A \cap B) = \P(A)\P(B)\). Incompatibles : \(A \cap B = \varnothing\).`],
    solution: [
      { t: 'Indépendance et incompatibilité', html: M(r`<p>Notons \(A\) l’événement « \(X\) pair » et \(B\) l’événement « \(X \leq 4\) ».</p><p>\(\P(A) = 0{,}1 + 0{,}2 + 0{,}3 + 0{,}1 = 0{,}7\) ; \(\P(B) = 0{,}05 + 0{,}1 + 0{,}05 + 0{,}2 = 0{,}4\) ; \(A \cap B = \{X = 2\} \cup \{X = 4\}\), donc \(\P(A \cap B) = 0{,}1 + 0{,}2 = 0{,}3\).</p><p>\(\P(A)\P(B) = 0{,}7 \times 0{,}4 = 0{,}28 \neq 0{,}3 = \P(A \cap B)\) : \(A\) et \(B\) ne sont pas indépendants. (Autrement dit, \(\P_B(A) = \dfrac{0{,}3}{0{,}4} = \dfrac{3}{4} \neq 0{,}7 = \P(A)\).)</p><p>\(A\) et \(B\) ne sont pas incompatibles : par exemple, \(X = 2\) réalise \(A \cap B\), qui est de probabilité \(0{,}3 \neq 0\).</p>`) +
        r`<p>Le corrigé officiel écrit \(\P_B(A) = \frac{0{,}1 + 0{,}2}{0{,}7} = \frac{3}{7}\) : il divise par \(\P(A)\) au lieu de \(\P(B)\). La conclusion (non indépendants) reste juste.</p>` }],
    answer: r`<p>\(\P(A) = \frac{7}{10}\), \(\P(B) = \frac{2}{5}\), \(\P(A \cap B) = \frac{3}{10} \neq \frac{7}{25} = \P(A)\P(B)\) : ni indépendants, ni incompatibles (\(\P_B(A) = \frac{3}{4}\)).</p>`,
    traps: [
      r`\(\P_B(A) = \frac{\P(A \cap B)}{\P(B)}\) : on divise par la probabilité de l’événement <b>connu</b>.`,
      r`Incompatible et indépendant sont deux notions différentes : deux événements incompatibles de probabilités non nulles ne sont jamais indépendants.`],
    grading: '2 points pour l’exercice.',
    official: false, note: 'Le corrigé officiel trouve \\(\\P_B(A) = 3/7\\) en divisant par P(A) : la bonne valeur est 3/4. Sa conclusion reste juste. Probabilités recalculées en fractions exactes.',
    chk: { pa: '7/10', pb: '2/5', pab: '3/10', prod: '7/25', pba: '3/4' } });

  add({ id: 'p2019-ex8', exam: 'p2019', ecue: 'dp', order: 8, src: 'Contrôle 1 2019 · Ex 8', pts: 3, lvl: 3, time: 14,
    title: 'Vaccination et grippe : conditionnelles, taux de vaccination', topics: ['conditionnelles', 'bayes'],
    intro: r`<p>Dans une petite ville de province, 10 000 personnes sont âgées de plus de 65 ans. 60 % d’entre elles ont pris la précaution de se faire vacciner contre la grippe.</p><p>Au cours de l’hiver, les médecins observent que 10 % d’entre elles ont attrapé la grippe. Parmi celles-ci, 6 % étaient vaccinées.</p>`,
    questions: [
      r`<b>1.</b> Déterminer la probabilité d’attraper la grippe<p>a. pour une personne vaccinée.</p><p>b. pour une personne non vaccinée. N.B. : on demande le résultat sous forme de fraction.</p>`,
      r`<b>2.</b> Notons \(c\) le résultat de la question 1)b) précédente. Déterminer, en fonction de \(c\), le taux de vaccination des personnes âgées pour qu’il y ait 500 personnes malades de la grippe.`],
    hints: [
      r`Traduis : \(\P(V) = 0{,}6\), \(\P(M) = 0{,}1\), \(\P_M(V) = 0{,}06\). On cherche \(\P_V(M)\) et \(\P_{\overline{V}}(M)\) : Bayes.`,
      r`\(\P_M(\overline{V}) = 1 - 0{,}06 = 0{,}94\) et \(\P(\overline{V}) = 0{,}4\).`,
      r`Question 2 : avec un taux \(p\), \(\P(M) = 0{,}01\,p + c(1 - p)\) ; 500 malades sur 10 000, c’est \(\P(M) = 0{,}05\).`],
    solution: [
      { t: 'Question 1 : Bayes', html: M(r`<p>Notons \(M\) l’événement « la personne a la grippe » et \(V\) « la personne est vaccinée ». L’énoncé donne \(\P(V) = 0{,}6\), \(\P(M) = 0{,}1\) et \(\P_M(V) = 0{,}06\).</p><p>a. \(\P_V(M) = \dfrac{\P_M(V)\P(M)}{\P(V)} = \dfrac{0{,}06 \times 0{,}1}{0{,}6} = 0{,}01 = \dfrac{1}{100}\).</p><p>b. \(\P_{\overline{V}}(M) = \dfrac{\P_M(\overline{V})\P(M)}{\P(\overline{V})} = \dfrac{0{,}94 \times 0{,}1}{0{,}4} = \dfrac{0{,}094}{0{,}4} = \dfrac{47}{200}\), soit 23,5 %.</p>`) +
        r`<p>Le corrigé officiel divise par \(\P(V) = 0{,}6\) au lieu de \(\P(\overline{V}) = 0{,}4\) et trouve 15,6 % : c’est faux. Contrôle : \(0{,}01 \times 0{,}6 + 0{,}235 \times 0{,}4 = 0{,}1 = \P(M)\).</p>` },
      { t: 'Question 2 : taux de vaccination', html: M(r`<p>On souhaite \(\P(M) = \dfrac{500}{10\,000} = 0{,}05\). Notons \(p = \P(V)\) le taux de vaccination, en supposant que \(\P_V(M) = 0{,}01\) et \(\P_{\overline{V}}(M) = c\) ne changent pas. Par la formule des probabilités totales, \(\P(M) = \P_V(M)\P(V) + \P_{\overline{V}}(M)\P(\overline{V})\), soit \(0{,}05 = 0{,}01\,p + c\,(1 - p)\). Ainsi \(p = \dfrac{c - 0{,}05}{c - 0{,}01}\).</p>`) +
        r`<p>Avec \(c = \frac{47}{200}\) : \(p = \frac{0{,}185}{0{,}225} = \frac{37}{45} \approx 82{,}2\) %.</p>` }],
    answer: r`<ul><li>1. a. \(\P_V(M) = \frac{1}{100}\) ; b. \(\P_{\overline{V}}(M) = \frac{47}{200}\).</li><li>2. \(p = \frac{c - 0{,}05}{c - 0{,}01}\), soit \(\frac{37}{45}\) avec \(c = \frac{47}{200}\).</li></ul>`,
    traps: [
      r`« Parmi celles-ci, 6 % étaient vaccinées » donne \(\P_M(V)\), pas \(\P_V(M)\).`,
      r`1.b : le dénominateur est \(\P(\overline{V}) = 0{,}4\) (l’erreur du corrigé).`,
      r`Vérifier un résultat par les probabilités totales : on doit retrouver \(\P(M) = 0{,}1\).`],
    grading: '3 points pour l’exercice.',
    official: false, note: 'Corrigé officiel juste pour 1.a et 2 ; faux pour 1.b (15,6 % au lieu de 47/200 = 23,5 %). Valeurs recalculées en fractions exactes.',
    chk: { a: '1/100', b: '47/200', p: '37/45' } });

  /* =====================================================================
     Contrôle 1, octobre 2018 (promo 2023) — sujet scanné, sans corrigé
     ===================================================================== */
  var N18 = 'Les annales n’ont pas de corrigé de ce sujet : réponses recalculées par programme.';
  add({ id: 'p2018-ex1', exam: 'p2018', ecue: 'obm', order: 1, src: 'Contrôle 1 2018 · Ex 1', pts: 2.5, lvl: 2, time: 10,
    title: 'Images directes et réciproques lues sur un graphe en escalier', topics: ['images'],
    intro: r`<p>Soit \(f : \R \to \R\) dont le graphe est le suivant :</p>` + FIG.stairs,
    questions: [r`Déterminer \(f([0, 4])\), \(f^{-1}([0, 1])\), \(f^{-1}(\{0, 1\})\), \(f(\R)\) et \(f^{-1}([-1, 1])\).`],
    hints: [
      r`Lis le graphe : sur \([0, 2[\), \(f = 0\) ; sur \([2, 4[\), \(f = 1\) ; en 4, \(f(4) = 2\) (point plein à gauche de chaque palier).`,
      r`Image réciproque : sur l’axe des ordonnées, repère les valeurs voulues, puis les \(x\) correspondants.`],
    solution: [
      { t: 'Lecture du graphe', html: M(r`<p>Sur le dessin, \(f\) vaut \(k\) sur \([2k, 2k + 2[\) pour \(k \in \ent{-3}{2}\) (point plein à gauche, ouvert à droite) : c’est \(f(x) = \left\lfloor \frac{x}{2} \right\rfloor\).</p><p>\(f([0, 4]) = \{0, 1, 2\}\) : 0 sur \([0, 2[\), 1 sur \([2, 4[\), et \(f(4) = 2\).</p><p>\(f^{-1}([0, 1]) = [0, 4[\) : parmi les réels de \([0, 1]\), \(f\) n’atteint que 0 (sur \([0, 2[\)) et 1 (sur \([2, 4[\)).</p><p>\(f^{-1}(\{0, 1\}) = [0, 4[\).</p><p>\(f(\R) = \Z\) si l’escalier continue hors du dessin ; sur le seul dessin, \(\{-3, -2, -1, 0, 1, 2\}\).</p><p>\(f^{-1}([-1, 1]) = [-2, 4[\).</p>`) +
        r`<p>Le dessin s’arrête en \(-6\) et \(6\) : écris l’hypothèse que tu fais pour \(f(\R)\).</p>` }],
    answer: r`<p>\(f([0, 4]) = \{0, 1, 2\}\) ; \(f^{-1}([0, 1]) = [0, 4[\) ; \(f^{-1}(\{0, 1\}) = [0, 4[\) ; \(f(\R) = \Z\) (escalier prolongé) ; \(f^{-1}([-1, 1]) = [-2, 4[\).</p>`,
    traps: [
      r`\(f([0, 4])\) n’est pas \([0, 2]\) : \(f\) ne prend que des valeurs entières.`,
      r`Bornes : 4 est exclu de \(f^{-1}([0, 1])\) car \(f(4) = 2\) (point plein du palier suivant).`],
    grading: '2,5 points pour l’exercice.',
    official: false, note: N18 + ' Sujet lu sur le scan ; f(ℝ) dépend de ce qu’on suppose hors du dessin.',
    chk: { a: '{0,1,2}', b: '[0,4[', d: '[-2,4[' } });

  add({ id: 'p2018-ex2', exam: 'p2018', ecue: 'obm', order: 2, src: 'Contrôle 1 2018 · Ex 2', pts: 1.5, lvl: 1, time: 6,
    title: r`Images réciproques par une fonction de \(\N\) dans \(\N\)`, topics: ['images'],
    intro: r`<p>Soit \(f : \N \to \N\) définie pour tout \(n \in \N\) par \(f(n) = \dfrac{n}{2}\) si \(n\) pair et \(f(n) = 0\) sinon.</p>`,
    questions: [r`Déterminer \(f^{-1}(\{0\})\), \(f^{-1}(\{1\})\) et \(f^{-1}(\{2\})\).`],
    hints: [
      r`Pour \(f^{-1}(\{0\})\), cherche les pairs \(n\) avec \(\frac{n}{2} = 0\), et n’oublie pas les impairs.`,
      r`Un antécédent de 1 ou de 2 ne peut être que pair.`],
    solution: [
      { t: 'Réponses', html: M(r`<p>Si \(n\) est impair, \(f(n) = 0\) ; si \(n\) est pair, \(f(n) = \frac{n}{2}\), qui vaut 0 seulement pour \(n = 0\). Donc \(f^{-1}(\{0\}) = \{0\} \cup \{2k + 1,\ k \in \N\}\) (0 et les entiers impairs).</p><p>\(f(n) = 1\) impose \(n\) pair et \(\frac{n}{2} = 1\) : \(f^{-1}(\{1\}) = \{2\}\). De même, \(f^{-1}(\{2\}) = \{4\}\).</p>`) }],
    answer: r`<p>\(f^{-1}(\{0\}) = \{0\} \cup \{2k + 1,\ k \in \N\}\) ; \(f^{-1}(\{1\}) = \{2\}\) ; \(f^{-1}(\{2\}) = \{4\}\).</p>`,
    traps: [r`Oublier 0 dans \(f^{-1}(\{0\})\) : 0 est pair et \(f(0) = \frac{0}{2} = 0\).`],
    grading: '1,5 point pour l’exercice.',
    official: false, note: N18,
    chk: { p1: '{2}', p2: '{4}' } });

  add({ id: 'p2018-ex6', exam: 'p2018', ecue: 'obm', order: 6, src: 'Contrôle 1 2018 · Ex 6', pts: 3, lvl: 2, time: 12,
    title: r`\((x, y) \mapsto xy\) et \(x \mapsto (x, x^2)\) : injectivité, surjectivité, composées`, topics: ['injections', 'fonctions'],
    intro: r`<p>Soient \(f : \R^2 \to \R,\ (x, y) \mapsto xy\) et \(g : \R \to \R^2,\ x \mapsto (x, x^2)\).</p>`,
    questions: [
      r`<b>1.</b> \(f\) est-elle injective ? Surjective ? Justifiez votre réponse.`,
      r`<b>2.</b> \(g\) est-elle injective ? Surjective ? Justifiez votre réponse.`,
      r`<b>3.</b> Déterminer \(f \circ g\) et \(g \circ f\).`],
    hints: [
      r`\(f\) : beaucoup de couples ont un produit nul. Pour la surjectivité, cherche un antécédent de \(y\) de la forme \((y, 1)\).`,
      r`\(g\) : deux images égales ont la même première coordonnée. Un couple \((a, b)\) avec \(b \neq a^2\) est-il atteint ?`],
    solution: [
      { t: 'Réponses', html: M(r`<p>1. \(f((0, 0)) = f((0, 1)) = 0\) et \((0, 0) \neq (0, 1)\) : \(f\) n’est pas injective. Soit \(y \in \R\) : \(f((y, 1)) = y\), donc \(f\) est surjective.</p><p>2. Soient \((x, x') \in \R^2\) tels que \(g(x) = g(x')\). Alors \((x, x^2) = (x', x'^2)\), donc (premières coordonnées) \(x = x'\) : \(g\) est injective. \((0, 1)\) n’a pas d’antécédent (il faudrait \(x = 0\) et \(x^2 = 1\)) : \(g\) n’est pas surjective.</p><p>3. \(f \circ g : \R \to \R\), \(x \mapsto f(x, x^2) = x \cdot x^2 = x^3\). \(g \circ f : \R^2 \to \R^2\), \((x, y) \mapsto g(xy) = (xy, x^2y^2)\).</p>`) }],
    answer: r`<ul><li>1. \(f\) non injective (\(f(0, 0) = f(0, 1)\)), surjective (\(f(y, 1) = y\)).</li><li>2. \(g\) injective, non surjective (\((0, 1)\)).</li><li>3. \(f \circ g(x) = x^3\) ; \(g \circ f(x, y) = (xy, x^2y^2)\).</li></ul>`,
    traps: [
      r`Préciser les ensembles de départ et d’arrivée des composées : \(f \circ g : \R \to \R\), \(g \circ f : \R^2 \to \R^2\).`,
      r`Pour réfuter la surjectivité de \(g\), un couple de \(\R^2\) suffit, pas un réel.`],
    grading: '3 points pour l’exercice.',
    official: false, note: N18,
    chk: { finj: '~false', fsurj: '~true', ginj: '~true', gsurj: '~false' } });

  add({ id: 'p2018-ex7', exam: 'p2018', ecue: 'dp', order: 7, src: 'Contrôle 1 2018 · Ex 7', pts: 2, lvl: 2, time: 10,
    title: 'Mains de 5 cartes : au moins un as, roi de carreau et trois trèfles', topics: ['probabilites', 'denombrement'],
    intro: r`<p>Dans un jeu de 32 cartes, on tire une main de 5 cartes. Déterminer la probabilité qu’une main contienne</p>`,
    questions: [
      r`<b>1.</b> au moins un As.`,
      r`<b>2.</b> le roi de carreau et 3 trèfles dont l’As.`],
    hints: [
      r`Les \(\binom{32}{5}\) mains sont équiprobables. « Au moins un As » : contraire de « aucun As » (\(\binom{28}{5}\) mains).`,
      r`Question 2 (lue « exactement 3 trèfles ») : roi de carreau et As de trèfle imposés, 2 trèfles parmi les 7 autres, la dernière carte parmi les 23 cartes ni trèfle ni roi de carreau.`],
    solution: [
      { t: 'Réponses', html: M(r`<p>Les \(\binom{32}{5}\) mains sont équiprobables.</p><p>1. L’événement contraire est « aucun As » : les 5 cartes sont choisies parmi les 28 cartes qui ne sont pas des As. La probabilité cherchée est \(1 - \dfrac{\binom{28}{5}}{\binom{32}{5}} = 1 - \dfrac{98\,280}{201\,376} = \dfrac{1\,841}{3\,596}\).</p><p>2. On lit : la main contient le roi de carreau et exactement 3 trèfles, dont l’As de trèfle. Le roi de carreau et l’As de trèfle sont imposés ; on choisit les 2 autres trèfles parmi les 7 autres trèfles (\(\binom{7}{2} = 21\)) ; la cinquième carte n’est ni un trèfle ni le roi de carreau : \(32 - 8 - 1 = 23\) choix. La probabilité est \(\dfrac{21 \times 23}{\binom{32}{5}} = \dfrac{483}{201\,376} = \dfrac{69}{28\,768}\).</p>`) },
      ],
    answer: r`<ul><li>1. \(1 - \frac{\binom{28}{5}}{\binom{32}{5}} = \frac{1\,841}{3\,596}\)</li><li>2. \(\frac{\binom{7}{2} \times 23}{\binom{32}{5}} = \frac{69}{28\,768}\) (exactement 3 trèfles)</li></ul>`,
    traps: [
      r`« Au moins un As » calculé par \(\frac{4 \times \binom{31}{4}}{\binom{32}{5}}\) : compte plusieurs fois les mains à plusieurs As.`,
      r`Question 2 : la cinquième carte ne doit être ni un trèfle (sinon 4 trèfles) ni le roi de carreau (déjà dans la main).`],
    grading: '2 points pour l’exercice.',
    official: false, note: N18 + ' Valeurs vérifiées par énumération des 201 376 mains.',
    chk: { q1: '1841/3596', q2: '69/28768' } });

  add({ id: 'p2018-ex8', exam: 'p2018', ecue: 'dp', order: 8, src: 'Contrôle 1 2018 · Ex 8', pts: 3, lvl: 2, time: 10,
    title: 'Vaccination et grippe : probabilités totales, Bayes', topics: ['conditionnelles', 'bayes'],
    intro: r`<p>En région parisienne, 60 % des personnes âgées de plus de 65 ans sont vaccinés contre la grippe. La proportion de malades est de 0,1 % parmi les vaccinés et de 10 % parmi les non vaccinés.</p>`,
    questions: [
      r`<b>1.</b> Déterminer le pourcentage de personnes âgées de plus de 65 ans atteintes par la grippe dans cette région.`,
      r`<b>2.</b> On sélectionne une personne âgée de plus de 65 ans en région parisienne et on constate qu’elle a contracté la grippe. Quelle est la probabilité qu’elle ait été vaccinée ? N.B. : on demande juste ici la formule littérale permettant de déterminer cette probabilité mais pas l’application numérique.`],
    hints: [
      r`0,1 % = 0,001. Traduis : \(\P(V) = 0{,}6\), \(\P(M \mid V) = 0{,}001\), \(\P(M \mid \overline{V}) = 0{,}1\).`,
      r`Partition \(\{V, \overline{V}\}\), probabilités totales, puis Bayes.`],
    solution: [
      { t: 'Question 1 : probabilités totales', html: M(r`<p>Notons \(V\) : « la personne est vaccinée » et \(M\) : « la personne a la grippe ». On a \(\P(V) = 0{,}6\), \(\P(M \mid V) = 0{,}001\) et \(\P(M \mid \overline{V}) = 0{,}1\). Comme \(\{V, \overline{V}\}\) est une partition de \(\Omega\), \(M = (M \cap V) \cup (M \cap \overline{V})\) (union disjointe) et</p><div class="fm">\[\P(M) = \P(M \mid V)\P(V) + \P(M \mid \overline{V})\P(\overline{V}) = 0{,}001 \times 0{,}6 + 0{,}1 \times 0{,}4 = 0{,}0406 = \frac{203}{5\,000}.\]</div><p>Soit 4,06 % des personnes de plus de 65 ans.</p>`) +
        T('tree', { first: [{ n: 'V', p: '3/5' }, { n: '\\overline{V}' }], second: { n: 'M', nb: '\\overline{M}', p: ['1/1000', '1/10'] }, edit: false }) },
      { t: 'Question 2 : Bayes', html: M(r`<p>On cherche \(\P(V \mid M)\) :</p><div class="fm">\[\P(V \mid M) = \frac{\P(M \cap V)}{\P(M)} = \frac{\P(M \mid V)\P(V)}{\P(M \mid V)\P(V) + \P(M \mid \overline{V})\P(\overline{V})}.\]</div>`) +
        r`<p>Application numérique (non demandée) : \(\frac{0{,}0006}{0{,}0406} = \frac{3}{203} \approx 1{,}5\) %.</p>` }],
    answer: r`<ul><li>1. \(\P(M) = 0{,}0406 = \frac{203}{5\,000}\), soit 4,06 %.</li><li>2. \(\P(V \mid M) = \frac{\P(M \mid V)\P(V)}{\P(M \mid V)\P(V) + \P(M \mid \overline{V})\P(\overline{V})}\) \(\left(= \frac{3}{203}\right)\).</li></ul>`,
    traps: [
      r`0,1 % = 0,001, pas 0,1.`,
      r`Question 2 : seule la formule littérale est demandée, mais elle doit être complète (dénominateur développé ou \(\P(M)\) calculé avant).`],
    grading: '3 points pour l’exercice.',
    official: false, note: N18, near: ['p2019-ex8'],
    chk: { pm: '203/5000', bayes: '3/203' } });
})();
