/* Maths — exercices de l'année : séminaire de rentrée (ECUE OBM), TD 1 « Dénombrement » et TD 2 « Probabilités
   finies » (ECUE DP), feuilles « Probability Exercises » et « Conditional Probability: Exercises » (ECUE DP).
   Une fiche par exercice, kind 'td', exam null, ids lisibles et stables :
     sem-<partie>-<exercice> (séminaire, numérotation de la feuille française ; sem-1-7a / sem-1-7b : les deux
     moitiés d'un exercice long, de même pour 2.9, 3.24, 4.26, 4.32), td1-<partie>-<exercice>, td2-<partie>-<exercice>,
     tdx-proba-<n>, tdx-cond-<n>.
   - Énoncés verbatim (transcriptions des PDF du Moodle 2026-27, relues). Le séminaire anglais numérote autrement à
     partir de la partie 2 (FR 2.12 = EN 3.12, FR 3.14 = EN 4.14, FR 3.19 = EN 5.19, FR 4.26 = EN 6.26) : les ids
     restent ceux de la feuille française, src anglais donne les deux numéros. Les feuilles td-x n'existent qu'en
     anglais : l'énoncé français est une traduction (dit dans la fiche). Écarts entre les versions FR et EN du même
     exercice, traités chacun avec sa réponse dans sa langue : séminaire 1.5 (phrases différentes), TD 1 1.2
     (k ∈ ⟦0, 20⟧ / ⟦1, 20⟧), TD 2 1.1 (questions 2 et 3 inversées), TD 2 5.19 ({1, …, n} / ⟦0, n⟧).
   - Coquilles des énoncés signalées dans la fiche (<p class="sol-note">) : séminaire 4.27.3 (« a R b ⇒ a R b »),
     3.18 (ln({0})), 3.24 (« f une fonction bijective » en hypothèse), 2.12 (hypothèse sur a et b) ; TD 2 5.22.4
     (modèle binomial discutable, la réponse attendue est donnée).
   - Aucun corrigé officiel : corrections rédigées, une rédaction modèle par fiche (<div class="model">, la copie
     Seyès de maths.css), dans le style des corrigés des sujets 2022-2024. Chaque nombre est recalculé par programme
     ($S/maths_td/verif_td.py : énumérations exhaustives, fractions exactes, sympy). Les erreurs fréquentes relevées
     par l'analyse sont des pièges (traps), sans dire d'où elles viennent.
   - near : fiches de sujets du même type (ids pAAAA-dp-exN, pAAAA-obm-exN, pAAAA-le-exN, pAAAA-exN de
     data/maths/ex-annales.js) ; le lien ne s'affiche que si la fiche existe.
   - Formules : KaTeX \( … \) et \[ … \] (macros du site : \R \N \Z \Q \card \P \E \V \ent{a}{b}). Les textes sont
     écrits en String.raw (barres simples) ; fmt() remplace dans les formules < > & par \lt \gt &amp; (HTML sûr).
     Décimales à la virgule ici ({,}), au point dans data/en/maths/ex-td.js.
   - Visuels : outils de assets/js/maths.js (<div data-maths="truth|negate|venn|sagittal|tree|law" data-opts='…'>,
     montés quand la correction s'ouvre) et deux dessins statiques faits ici (diagramme sagittal sag(), courbe
     plot()) pour les énoncés qui en ont besoin (séminaire 3.14, 3.15, 3.21) et quelques corrections.
   - window.MATHS_TD : outils d'écriture et dessins, repris par data/en/maths/ex-td.js (qui n'écrit que les mots). */
(function () {
  'use strict';
  var X = window.MATHS_EX = window.MATHS_EX || [];
  var r = String.raw;

  /* ================================================================== écriture */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  /* dans les formules : < > & deviennent \lt \gt &amp; (le texte passe par innerHTML) */
  function fixMath(s) {
    return String(s).replace(/\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]/g, function (m) {
      return m.replace(/&(?!amp;|lt;|gt;|#)/g, '&amp;').replace(/</g, '\\lt ').replace(/>/g, '\\gt ');
    });
  }
  var RAW = /^(id|exam|ecue|kind|src|near|topics)$/;
  function fmt(o, k) {
    if (typeof o === 'string') return RAW.test(k) ? o : fixMath(o);
    if (Array.isArray(o)) return o.map(function (x) { return fmt(x, k); });
    if (o && typeof o === 'object') { var q = {}; Object.keys(o).forEach(function (kk) { q[kk] = fmt(o[kk], kk); }); return q; }
    return o;
  }
  function li(x) { return '<li>' + x + '</li>'; }
  function ul(a) { return '<ul>' + a.map(li).join('') + '</ul>'; }
  function ol(a, type) { return '<ol' + (type ? ' type="' + type + '"' : '') + '>' + a.map(li).join('') + '</ol>'; }
  function p(s) { return '<p>' + s + '</p>'; }
  /* courts items côte à côte, chacun insécable (une formule ne se coupe pas en deux à 375 px) */
  function items(a) { return a.map(function (x) { return '<span style="display:inline-block;margin:.15rem 1.4rem .15rem 0">' + x + '</span>'; }).join(' '); }
  /* formule en bloc qui défile dans son cadre si elle est trop longue */
  function fm(tex) { return '<div class="fm">\\[' + tex + '\\]</div>'; }
  function note(s) { return '<p class="sol-note">' + s + '</p>'; }
  /* rédaction modèle : la copie à l'encre bleue (maths.css .model) */
  function model(html, tag) { return '<div class="model"><span class="tag">' + (tag || 'Rédaction modèle') + '</span>' + html + '</div>'; }
  /* tableau : head = ligne(s) d'en-tête, rows = lignes ; o.th : première cellule de chaque ligne en en-tête ; o.w : largeur max (rem) */
  function cell(tag, c) { return '<' + tag + '>' + (c == null ? '' : c) + '</' + tag + '>'; }
  function tbl(head, rows, o) {
    o = o || {};
    if (head.length && !Array.isArray(head[0])) head = [head];
    return '<div class="tbl"' + (o.w ? ' style="max-width:' + o.w + 'rem"' : '') + '><table>' + (o.cap ? '<caption>' + o.cap + '</caption>' : '') +
      (head.length ? '<thead>' + head.map(function (rr) { return '<tr>' + rr.map(function (c) { return cell('th', c); }).join('') + '</tr>'; }).join('') + '</thead>' : '') +
      '<tbody>' + rows.map(function (rr) { return '<tr>' + rr.map(function (c, i) { return cell(i === 0 && o.th ? 'th' : 'td', c); }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
  }
  /* outil de maths.js, monté quand la correction s'ouvre ; position:relative : le MathML caché de KaTeX (position absolue)
     d'un tableau qui défile reste dans le cadre (sinon il élargit la page à 375 px) */
  function tool(kind, o) { return '<div data-maths="' + kind + '" style="position:relative" data-opts=\'' + JSON.stringify(o).replace(/&/g, '&amp;').replace(/'/g, '&#39;') + '\'></div>'; }

  /* ================================================================== dessins statiques (SVG, couleurs du thème) */
  var uid = 0;
  var INK = 'stroke:currentColor', ACC = 'var(--accent)', RED = 'var(--red, #c0392b)';
  /* diagramme sagittal : o.E, o.F (étiquettes), o.f : [[x, y], …] (flèches), o.names ['E', 'F'], o.label (aria) */
  function sag(o) {
    var E = o.E, Fs = o.F, nm = o.names || ['E', 'F'], n = Math.max(E.length, Fs.length), gap = 32, top = 34;
    var W = 270, H = top + n * gap + 14, xe = 78, xf = 192, id = 'tds' + (++uid);
    function ys(l) { var off = top + (n - l.length) * gap / 2; return l.map(function (x, i) { return off + i * gap + gap / 2; }); }
    var yE = ys(E), yF = ys(Fs), cy = top + n * gap / 2, ry = n * gap / 2 + 8;
    var s = '<svg class="td-sag" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.label || '') + '" style="width:100%;max-width:' + W + 'px;height:auto;display:block;margin:.3rem 0;overflow:visible">' +
      '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" style="fill:currentColor"/></marker></defs>';
    s += '<ellipse cx="' + xe + '" cy="' + cy + '" rx="44" ry="' + ry + '" style="fill:none;' + INK + ';stroke-opacity:.45"/>';
    s += '<ellipse cx="' + xf + '" cy="' + cy + '" rx="44" ry="' + ry + '" style="fill:none;' + INK + ';stroke-opacity:.45"/>';
    s += '<text x="' + xe + '" y="16" text-anchor="middle" style="fill:currentColor;font-size:15px;font-style:italic">' + esc(nm[0]) + '</text>';
    s += '<text x="' + xf + '" y="16" text-anchor="middle" style="fill:currentColor;font-size:15px;font-style:italic">' + esc(nm[1]) + '</text>';
    (o.f || []).forEach(function (a) {
      var i = E.indexOf(String(a[0])), j = Fs.indexOf(String(a[1])); if (i < 0 || j < 0) return;
      var x1 = xe + 6, y1 = yE[i], x2 = xf - 7, y2 = yF[j];
      s += '<path d="M' + x1 + ' ' + y1 + 'Q' + ((x1 + x2) / 2) + ' ' + ((y1 + y2) / 2 - 8) + ' ' + x2 + ' ' + y2 + '" style="fill:none;stroke:' + ACC + ';stroke-width:1.6" marker-end="url(#' + id + ')"/>';
    });
    E.forEach(function (x, i) { s += '<circle cx="' + xe + '" cy="' + yE[i] + '" r="3.2" style="fill:currentColor"/><text x="' + (xe - 10) + '" y="' + (yE[i] + 5) + '" text-anchor="end" style="fill:currentColor;font-size:15px;font-style:italic">' + esc(x) + '</text>'; });
    Fs.forEach(function (y, j) { s += '<circle cx="' + xf + '" cy="' + yF[j] + '" r="3.2" style="fill:currentColor"/><text x="' + (xf + 10) + '" y="' + (yF[j] + 5) + '" style="fill:currentColor;font-size:15px">' + esc(y) + '</text>'; });
    return s + '</svg>';
  }
  /* courbe : o.xr, o.yr (fenêtre), o.curves [{ f, a, b }], o.xt / o.yt [[valeur, 'étiquette']], o.grid [dx, dy],
     o.band [y1, y2] (bande horizontale), o.xsel [[x1, x2]] (parties de l'axe des abscisses surlignées ; x1 = x2 : un point),
     o.pts [[x, y]] (points marqués), o.dash [[x1, y1, x2, y2]] (pointillés), o.label (aria), o.W, o.H */
  function plot(o) {
    var W = o.W || 440, H = o.H || 250, pl = 30, pr = 16, pt = 12, pb = 24;
    var a = o.xr[0], b = o.xr[1], c = o.yr[0], d = o.yr[1], id = 'tdp' + (++uid);
    function Xp(v) { return +(pl + (v - a) / (b - a) * (W - pl - pr)).toFixed(1); }
    function Yp(v) { return +(H - pb - (v - c) / (d - c) * (H - pt - pb)).toFixed(1); }
    var x0 = a <= 0 && b >= 0 ? Xp(0) : pl, y0 = c <= 0 && d >= 0 ? Yp(0) : H - pb;
    var s = '<svg class="td-plot" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.label || '') + '" style="width:100%;max-width:' + W + 'px;height:auto;display:block;margin:.4rem 0">' +
      '<defs><clipPath id="' + id + '"><rect x="' + pl + '" y="' + pt + '" width="' + (W - pl - pr) + '" height="' + (H - pt - pb) + '"/></clipPath></defs>';
    if (o.grid) {
      for (var gx = Math.ceil(a / o.grid[0]) * o.grid[0]; gx <= b + 1e-9; gx += o.grid[0]) s += '<line x1="' + Xp(gx) + '" y1="' + pt + '" x2="' + Xp(gx) + '" y2="' + (H - pb) + '" style="' + INK + ';stroke-opacity:.12"/>';
      for (var gy = Math.ceil(c / o.grid[1]) * o.grid[1]; gy <= d + 1e-9; gy += o.grid[1]) s += '<line x1="' + pl + '" y1="' + Yp(gy) + '" x2="' + (W - pr) + '" y2="' + Yp(gy) + '" style="' + INK + ';stroke-opacity:.12"/>';
    }
    if (o.band) s += '<rect x="' + pl + '" y="' + Yp(o.band[1]) + '" width="' + (W - pl - pr) + '" height="' + (Yp(o.band[0]) - Yp(o.band[1])) + '" style="fill:' + ACC + ';fill-opacity:.13"/>';
    s += '<line x1="' + pl + '" y1="' + y0 + '" x2="' + (W - pr + 6) + '" y2="' + y0 + '" style="' + INK + ';stroke-opacity:.6"/>';
    s += '<line x1="' + x0 + '" y1="' + (H - pb) + '" x2="' + x0 + '" y2="' + (pt - 6) + '" style="' + INK + ';stroke-opacity:.6"/>';
    (o.xt || []).forEach(function (t) { var xx = Xp(t[0]); s += '<line x1="' + xx + '" y1="' + (y0 - 3) + '" x2="' + xx + '" y2="' + (y0 + 3) + '" style="' + INK + '"/><text x="' + xx + '" y="' + Math.min(H - 6, y0 + 16) + '" text-anchor="middle" style="fill:currentColor;font-size:12px">' + esc(t[1]) + '</text>'; });
    (o.yt || []).forEach(function (t) { var yy = Yp(t[0]); s += '<line x1="' + (x0 - 3) + '" y1="' + yy + '" x2="' + (x0 + 3) + '" y2="' + yy + '" style="' + INK + '"/><text x="' + (x0 - 6) + '" y="' + (yy + 4) + '" text-anchor="end" style="fill:currentColor;font-size:12px">' + esc(t[1]) + '</text>'; });
    (o.dash || []).forEach(function (q) { s += '<line x1="' + Xp(q[0]) + '" y1="' + Yp(q[1]) + '" x2="' + Xp(q[2]) + '" y2="' + Yp(q[3]) + '" style="' + INK + ';stroke-opacity:.5;stroke-dasharray:4 4"/>'; });
    (o.curves || []).forEach(function (cv) {
      var n = cv.n || 300, from = cv.a == null ? a : cv.a, to = cv.b == null ? b : cv.b, path = '', pen = false;
      for (var i = 0; i <= n; i++) {
        var xv = from + (to - from) * i / n, yv = cv.f(xv);
        if (!isFinite(yv) || yv > d + (d - c) || yv < c - (d - c)) { pen = false; continue; }
        path += (pen ? 'L' : 'M') + Xp(xv) + ' ' + Yp(yv); pen = true;
      }
      s += '<path d="' + path + '" clip-path="url(#' + id + ')" style="fill:none;stroke:' + (cv.color || ACC) + ';stroke-width:2.2' + (cv.dash ? ';stroke-dasharray:6 5' : '') + '"/>';
    });
    (o.xsel || []).forEach(function (q) {
      if (q[0] === q[1]) s += '<circle cx="' + Xp(q[0]) + '" cy="' + y0 + '" r="4.5" style="fill:' + RED + '"/>';
      else s += '<line x1="' + Xp(q[0]) + '" y1="' + y0 + '" x2="' + Xp(q[1]) + '" y2="' + y0 + '" style="stroke:' + RED + ';stroke-width:5;stroke-linecap:round"/>';
    });
    (o.pts || []).forEach(function (q) { s += '<circle cx="' + Xp(q[0]) + '" cy="' + Yp(q[1]) + '" r="3.6" style="fill:currentColor"/>'; });
    return s + '</svg>';
  }

  /* ================================================================== fiches */
  function wrapQ(q) { return /^<div class="q">/.test(q) ? q : '<div class="q">' + q + '</div>'; }
  function add(o) {
    o.exam = null; o.kind = 'td'; o.official = false;
    /* une question = un bloc : le texte et ses formules en ligne restent dans le même flux, même si la page met
       la question dans une grille (.exo-qs li > div) */
    if (o.questions) o.questions = o.questions.map(wrapQ);
    X.push(fmt(o));
  }
  var NOTE_SEM = 'Pas de corrigé officiel du séminaire : correction rédigée, chaque résultat vérifié par programme.';
  var NOTE_TD1 = 'Pas de corrigé officiel du TD 1 : correction rédigée, chaque dénombrement vérifié par énumération.';
  var NOTE_TD2 = 'Pas de corrigé officiel du TD 2 : correction rédigée, chaque probabilité recalculée en fractions exactes (énumération quand c’est possible).';
  var NOTE_X = 'Feuille distribuée en anglais (énoncé traduit ici). Pas de corrigé officiel : correction rédigée, chaque probabilité recalculée en fractions exactes.';

  /* =====================================================================================================
     Séminaire, partie 1 : logique propositionnelle
     ===================================================================================================== */
  add({
    id: 'sem-1-1', ecue: 'obm', order: 1101, src: 'Séminaire · Ex 1.1',
    title: 'Valeurs de vérité et distributivité', topics: ['logique'], lvl: 1, time: 15,
    intro: r`<p>Soit \(x\) un réel. On considère les assertions :</p>` + p(r`\(P(x)\) : « \(x \le 1\) », \(\quad Q(x)\) : « \(-1 < x \le 2\) » \(\quad\) et \(\quad R(x)\) : « \(0 \le x < 4\) »`),
    questions: [
      r`Si \(x = -3\), quelles sont les assertions vraies parmi \(P\), \(\neg Q\), \(\neg Q \lor R\), \(\neg Q \land R\), \(\neg P \land Q\), \(\neg R \land P\) ?`,
      r`<b>(Maison)</b> Mêmes questions si \(x = 3\).`,
      r`Donner \(P(x) \lor (Q(x) \land R(x))\) et \((P(x) \lor Q(x)) \land (P(x) \lor R(x))\).`,
      r`<b>(Maison)</b> Mêmes questions pour \(P \land (Q \lor R)\) et \((P \land Q) \lor (P \land R)\).`],
    hints: [
      r`Évalue d’abord \(P\), \(Q\) et \(R\) seules, puis combine : \(\neg\) inverse, \(\land\) exige les deux, \(\lor\) au moins une.`,
      r`« Donner \(P(x) \lor (Q(x) \land R(x))\) » veut dire : donner l’ensemble des réels \(x\) pour lesquels l’assertion est vraie. \(\land\) correspond à l’intersection des intervalles, \(\lor\) à leur union.`,
      r`\(Q \land R\) est vraie sur \([0, 2]\). Dessine les intervalles sur une droite.`],
    solution: [
      { t: 'Questions 1 et 2 : on évalue', html: p(r`On évalue \(P\), \(Q\), \(R\), puis chaque combinaison.`) +
        tbl(['', r`\(P\)`, r`\(\neg Q\)`, r`\(\neg Q \lor R\)`, r`\(\neg Q \land R\)`, r`\(\neg P \land Q\)`, r`\(\neg R \land P\)`],
          [[r`\(x = -3\)`, 'V', 'V', 'V', 'F', 'F', 'V'], [r`\(x = 3\)`, 'F', 'V', 'V', 'V', 'F', 'F']], { th: true }) +
        p(r`Pour \(x = -3\) : \(-3 \le 1\) donc \(P\) vraie ; \(-1 < -3\) est faux donc \(Q\) fausse et \(\neg Q\) vraie ; \(0 \le -3\) est faux donc \(R\) fausse. Pour \(x = 3\) : \(P\) fausse, \(Q\) fausse (\(3 > 2\)), \(R\) vraie.`) },
      { t: 'Question 3 : deux écritures, le même ensemble', html: p(r`\(Q \land R\) est vraie quand \(-1 < x \le 2\) <b>et</b> \(0 \le x < 4\), soit \(x \in [0, 2]\). Avec \(P\) (\(x \in \left]-\infty, 1\right]\)) : \(P \lor (Q \land R)\) est vraie sur \(\left]-\infty, 1\right] \cup [0, 2] = \left]-\infty, 2\right]\).`) +
        p(r`\(P \lor Q\) : \(\left]-\infty, 2\right]\) ; \(P \lor R\) : \(\left]-\infty, 4\right[\). Leur conjonction : \(\left]-\infty, 2\right] \cap \left]-\infty, 4\right[ = \left]-\infty, 2\right]\).`) +
        p(r`Les deux assertions sont vraies exactement pour les mêmes réels : c’est la distributivité de \(\lor\) sur \(\land\), \(P \lor (Q \land R) \iff (P \lor Q) \land (P \lor R)\). La table de vérité le confirme ligne par ligne :`) +
        tool('truth', { f: ['P ou (Q et R)', '(P ou Q) et (P ou R)'], title: 'Distributivité de ∨ sur ∧' }) },
      { t: 'Question 4', html: p(r`\(Q \lor R\) est vraie sur \(\left]-1, 2\right] \cup [0, 4[ = \left]-1, 4\right[\), donc \(P \land (Q \lor R)\) sur \(\left]-1, 1\right]\). De l’autre côté, \(P \land Q\) : \(\left]-1, 1\right]\) et \(P \land R\) : \([0, 1]\), d’union \(\left]-1, 1\right]\). Même ensemble : distributivité de \(\land\) sur \(\lor\).`) +
        model(p(r`Pour \(x \in \R\), \(Q(x) \land R(x)\) est vraie si et seulement si \(-1 < x \le 2\) et \(0 \le x < 4\), c’est-à-dire \(x \in [0, 2]\).`) + p(r`Donc \(P(x) \lor (Q(x) \land R(x))\) est vraie si et seulement si \(x \in \left]-\infty, 1\right] \cup [0, 2] = \left]-\infty, 2\right]\).`)) }],
    answer: ul([r`\(x = -3\) : \(P\), \(\neg Q\), \(\neg Q \lor R\), \(\neg R \land P\) vraies ; \(\neg Q \land R\), \(\neg P \land Q\) fausses.`,
      r`\(x = 3\) : \(\neg Q\), \(\neg Q \lor R\), \(\neg Q \land R\) vraies ; les trois autres fausses.`,
      r`\(P \lor (Q \land R)\) et \((P \lor Q) \land (P \lor R)\) : vraies pour \(x \in \left]-\infty, 2\right]\).`,
      r`\(P \land (Q \lor R)\) et \((P \land Q) \lor (P \land R)\) : vraies pour \(x \in \left]-1, 1\right]\).`]),
    traps: [r`Écrire \(\land\) ou \(\lor\) entre deux intervalles : on écrit \(\cap\) et \(\cup\) entre des ensembles, \(\land\) et \(\lor\) entre des assertions.`,
      r`Oublier qu’un « ou » est inclusif : \(\neg Q \lor R\) est vraie quand les deux sont vraies.`],
    note: NOTE_SEM, near: ['p2024-obm-ex1', 'p2023-le-ex2']
  });

  add({
    id: 'sem-1-2', ecue: 'obm', order: 1102, src: 'Séminaire · Ex 1.2',
    title: 'Conditions nécessaires et suffisantes, ⇒ ⇐ ⇔', topics: ['logique'], lvl: 2, time: 25,
    intro: p('Les questions sont indépendantes.'),
    questions: [
      r`Donner une condition nécessaire (par forcément suffisante) à « J’ai eu mon BAC ». De même, donner une condition suffisante (par forcément nécessaire) à « J’ai eu mon BAC ».`,
      r`Même question avec « Didier fait des compétitions de natation à haut niveau ».`,
      r`Soit \(x \in \R\). Mettre le symbole \(\implies\), \(\impliedby\) ou \(\iff\) à la place des pointillés :<br>` + items([
        r`<b>(a)</b> \(x^2 > 4 \dots\dots x > 2\)`, r`<b>(b)</b> \(x = \pi \dots\dots \sin(x) = 0\)`, r`<b>(c)</b> \(\sqrt{x^2} = 1 \dots\dots x = 1\)`,
        r`<b>(d)</b> \(\dfrac{x^2}{3} = 0 \dots\dots x = 0\)`, r`<b>(e)</b> \(\dfrac{x^2}{3} = 1 \dots\dots x = \sqrt{3}\)`, r`<b>(f)</b> \(e^{x+1} = 1 \dots\dots x = -1\)`,
        r`<b>(g)</b> \(x < 1 \dots\dots |x| < 1\)`, r`<b>(h)</b> \(x^2 - x > 0 \dots\dots x > 1\)`, r`<b>(i)</b> \(\ln(x^2 + 1) = 0 \dots\dots x = 0\)`]),
      r`Soit \(x \in \R\). On considère l’assertion \(P(x)\) : « \(x^2 > 1 \implies (x < -1 \text{ ou } x > 1)\) ». Écrire la négation et la contraposée de \(P(x)\).`],
    hints: [
      r`Dans \(A \implies B\), \(A\) est une condition <b>suffisante</b> pour \(B\) et \(B\) une condition <b>nécessaire</b> pour \(A\). Une condition nécessaire à « j’ai eu mon bac » est une chose qui découle forcément du fait d’avoir le bac.`,
      r`Pour (a) à (i) : écris l’ensemble des \(x\) qui vérifient chaque côté. Si l’ensemble de gauche est inclus dans celui de droite, c’est \(\implies\) ; inclusion dans l’autre sens : \(\impliedby\) ; ensembles égaux : \(\iff\).`,
      r`\(\neg(A \implies B)\) est \(A \land \neg B\) (ce n’est pas une implication). La contraposée de \(A \implies B\) est \(\neg B \implies \neg A\).`],
    solution: [
      { t: 'Questions 1 et 2 : nécessaire, suffisante', html: p(r`On cherche \(N\) tel que « j’ai eu mon BAC » \(\implies N\) (condition nécessaire), et \(S\) tel que \(S \implies\) « j’ai eu mon BAC » (condition suffisante).`) +
        ul([r`Nécessaire : « j’ai passé les épreuves du BAC » (on ne peut pas avoir le BAC sans les passer). Suffisante : « j’ai eu le BAC avec mention très bien ».`,
          r`Nécessaire : « Didier sait nager ». Suffisante : « Didier a nagé aux Jeux olympiques » (c’est une compétition de haut niveau).`]) +
        p(r`Une condition nécessaire n’est pas forcément suffisante : on peut passer le BAC sans l’avoir. Une condition suffisante n’est pas forcément nécessaire : on peut avoir le BAC sans mention.`) },
      { t: 'Question 3 : comparer les ensembles de vérité', html: tbl(['', 'à gauche', 'à droite', 'symbole'], [
          ['(a)', r`\(\left]-\infty, -2\right[ \cup \left]2, +\infty\right[\)`, r`\(\left]2, +\infty\right[\)`, r`\(\impliedby\)`],
          ['(b)', r`\(\{\pi\}\)`, r`\(\{k\pi,\ k \in \Z\}\)`, r`\(\implies\)`],
          ['(c)', r`\(\{-1, 1\}\) (car \(\sqrt{x^2} = |x|\))`, r`\(\{1\}\)`, r`\(\impliedby\)`],
          ['(d)', r`\(\{0\}\)`, r`\(\{0\}\)`, r`\(\iff\)`],
          ['(e)', r`\(\{-\sqrt{3}, \sqrt{3}\}\)`, r`\(\{\sqrt{3}\}\)`, r`\(\impliedby\)`],
          ['(f)', r`\(\{-1\}\) (\(e^{x+1} = 1 \iff x + 1 = 0\))`, r`\(\{-1\}\)`, r`\(\iff\)`],
          ['(g)', r`\(\left]-\infty, 1\right[\)`, r`\(\left]-1, 1\right[\)`, r`\(\impliedby\)`],
          ['(h)', r`\(\left]-\infty, 0\right[ \cup \left]1, +\infty\right[\)`, r`\(\left]1, +\infty\right[\)`, r`\(\impliedby\)`],
          ['(i)', r`\(\{0\}\) (\(x^2 + 1 = 1\))`, r`\(\{0\}\)`, r`\(\iff\)`]], { th: true }) +
        p(r`Pour (a) : \(x = -3\) vérifie \(x^2 > 4\) mais pas \(x > 2\), donc pas de \(\implies\) ; tout \(x > 2\) vérifie \(x^2 > 4\), d’où \(\impliedby\). Pour (h) : \(x^2 - x = x(x - 1) > 0\) quand \(x\) et \(x - 1\) ont le même signe.`) +
        model(p(r`(g) Soit \(x \in \R\) tel que \(|x| < 1\). Alors \(-1 < x < 1\), donc \(x < 1\). Ainsi \(|x| < 1 \implies x < 1\).`) + p(r`La réciproque est fausse : \(x = -2\) vérifie \(x < 1\) mais \(|x| = 2 \ge 1\). On écrit donc \(x < 1 \impliedby |x| < 1\).`)) },
      { t: 'Question 4 : négation et contraposée', html: p(r`La négation d’une implication \(A \implies B\) est \(A \land \neg B\). Ici \(\neg(x < -1 \text{ ou } x > 1)\) est \(x \ge -1\) et \(x \le 1\) (De Morgan).`) +
        model(p(r`Négation de \(P(x)\) : « \(x^2 > 1\) et \(-1 \le x \le 1\) ».`) + p(r`Contraposée de \(P(x)\) : « \(-1 \le x \le 1 \implies x^2 \le 1\) ».`)) +
        p(r`Remarque : \(P(x)\) est vraie pour tout réel \(x\) (\(x^2 > 1 \iff x < -1\) ou \(x > 1\)), donc sa négation est fausse pour tout \(x\). On ne demande pas de valeur de vérité ici, seulement l’écriture.`) }],
    answer: ul([r`Bac : nécessaire « j’ai passé les épreuves », suffisante « je l’ai eu avec mention ». Natation : nécessaire « Didier sait nager », suffisante « Didier a nagé aux JO ».`,
      r`(a) \(\impliedby\) (b) \(\implies\) (c) \(\impliedby\) (d) \(\iff\) (e) \(\impliedby\) (f) \(\iff\) (g) \(\impliedby\) (h) \(\impliedby\) (i) \(\iff\).`,
      r`\(\neg P(x)\) : \(x^2 > 1\) et \(-1 \le x \le 1\). Contraposée : \(-1 \le x \le 1 \implies x^2 \le 1\).`]),
    traps: [r`Inverser nécessaire et suffisant. « Je suis à l’université » n’est pas suffisant pour avoir le BAC, « Didier s’entraîne régulièrement » n’est pas suffisant pour faire de la compétition : vérifie toujours le sens de l’implication.`,
      r`Écrire la négation d’une implication sous la forme d’une implication (\(A \implies \neg B\) ou \(\neg A \implies \neg B\)) : c’est \(A \land \neg B\).`,
      r`Nier \(x < -1\) en \(x > -1\) : la négation de \(<\) est \(\ge\).`,
      r`Confondre contraposée (\(\neg B \implies \neg A\), équivalente) et réciproque (\(B \implies A\)).`],
    note: NOTE_SEM, near: ['p2024-obm-ex1']
  });

  add({
    id: 'sem-1-3', ecue: 'obm', order: 1103, src: 'Séminaire · Ex 1.3',
    title: 'Traduire puis nier des propriétés de fonctions', topics: ['quantificateurs', 'logique'], lvl: 2, time: 25,
    intro: p(r`On considère une fonction \(f : \R \longrightarrow \R\).`),
    questions: [
      r`Traduire les propriétés suivantes en syntaxe mathématique :<br>(a) \(f\) est bornée. (b) \(f\) ne s’annule jamais. (c) \(f\) est constante. (d) \(f\) est paire. De même, \(f\) est impaire. (e) \(f\) est périodique. (f) \(f\) n’est pas la fonction nulle. (g) \(f\) est positive sur \(\R^+\) (de deux manières : avec un quantificateur d’une part, avec une implication d’autre part).`,
      r`Écrire la négation de toutes les propriétés ci-dessus.`],
    hints: [
      r`Repère ce qui « existe » (une borne, une constante, une période) : il vient en premier avec \(\exists\), puis \(\forall x \in \R\).`,
      r`Pour nier : chaque \(\forall\) devient \(\exists\) et inversement, les ensembles ne changent pas, et on nie la dernière assertion. Un « et » devient « ou ».`,
      r`« \(m \le f(x) \le M\) », ce sont deux inégalités reliées par « et » : sa négation est « \(f(x) < m\) ou \(f(x) > M\) ».`],
    solution: [
      { t: 'Question 1 : les traductions', html: tbl(['propriété', 'traduction'], [
          [r`(a) bornée`, r`\(\exists (m, M) \in \R^2,\ \forall x \in \R,\ m \le f(x) \le M\)`],
          [r`(b) ne s’annule jamais`, r`\(\forall x \in \R,\ f(x) \neq 0\)`],
          [r`(c) constante`, r`\(\exists c \in \R,\ \forall x \in \R,\ f(x) = c\)`],
          [r`(d) paire / impaire`, r`\(\forall x \in \R,\ f(-x) = f(x)\) / \(\forall x \in \R,\ f(-x) = -f(x)\)`],
          [r`(e) périodique`, r`\(\exists T \in \R^*,\ \forall x \in \R,\ f(x + T) = f(x)\)`],
          [r`(f) pas la fonction nulle`, r`\(\exists x \in \R,\ f(x) \neq 0\)`],
          [r`(g) positive sur \(\R^+\)`, r`\(\forall x \in \R^+,\ f(x) \ge 0\) ou \(\forall x \in \R,\ x \ge 0 \implies f(x) \ge 0\)`]]) +
        p(r`En (e), la période doit être non nulle : avec \(T = 0\), toute fonction vérifierait \(f(x + 0) = f(x)\).`) },
      { t: 'Question 2 : les négations', html: tbl(['propriété', 'négation'], [
          [r`(a)`, r`\(\forall (m, M) \in \R^2,\ \exists x \in \R,\ f(x) < m \text{ ou } f(x) > M\)`],
          [r`(b)`, r`\(\exists x \in \R,\ f(x) = 0\)`],
          [r`(c)`, r`\(\forall c \in \R,\ \exists x \in \R,\ f(x) \neq c\)`],
          [r`(d)`, r`\(\exists x \in \R,\ f(-x) \neq f(x)\) / \(\exists x \in \R,\ f(-x) \neq -f(x)\)`],
          [r`(e)`, r`\(\forall T \in \R^*,\ \exists x \in \R,\ f(x + T) \neq f(x)\)`],
          [r`(f)`, r`\(\forall x \in \R,\ f(x) = 0\)`],
          [r`(g)`, r`\(\exists x \in \R^+,\ f(x) < 0\) ou \(\exists x \in \R,\ x \ge 0 \land f(x) < 0\)`]]) +
        p(r`Pour (a), la négation pas à pas (\(\exists (m, M)\) s’écrit \(\exists m\), \(\exists M\)) :`) +
        tool('negate', { src: '∃ m ∈ ℝ, ∃ M ∈ ℝ, ∀ x ∈ ℝ, m ≤ f(x) ≤ M', title: 'Négation de « f est bornée »' }) +
        model(p(r`\(f\) n’est pas bornée : \(\forall (m, M) \in \R^2,\ \exists x \in \R,\ f(x) < m \text{ ou } f(x) > M\).`) + p(r`En mots : quelles que soient les deux bornes proposées, \(f\) prend une valeur qui sort de \([m, M]\).`)) }],
    answer: p(r`Les deux tableaux ci-dessus. À retenir : bornée \(\exists (m, M) \in \R^2, \forall x \in \R, m \le f(x) \le M\), et sa négation \(\forall (m, M) \in \R^2, \exists x \in \R, f(x) < m \text{ ou } f(x) > M\).`),
    traps: [r`Nier « \(m \le f(x) \le M\) » en « \(m > f(x) > M\) » : c’est impossible dès que \(m \le M\). La négation d’un « et » est un « ou ».`,
      r`Changer l’ensemble en niant : \(\neg(\forall x \in \R^+, f(x) \ge 0)\) est \(\exists x \in \R^+, f(x) < 0\), pas \(\exists x \in \R^-\).`,
      r`Oublier de nier les deux versions en (d) (paire et impaire).`,
      r`Écrire la période dans \(\R\) au lieu de \(\R^*\).`],
    note: NOTE_SEM, near: ['p2023-le-ex2']
  });

  add({
    id: 'sem-1-4', ecue: 'obm', order: 1104, src: 'Séminaire · Ex 1.4',
    title: 'Les poissons de la mare : traduire avec des quantificateurs', topics: ['quantificateurs', 'ensembles'], lvl: 1, time: 10,
    intro: p(r`On observe une mare. On note \(M\) l’ensemble des éléments se trouvant dans la mare, \(P\) l’ensemble des poissons dans la mare et \(R\) l’ensemble de tout ce qui est de couleur rouge (dans la mare).`) + p('Traduire les phrases suivantes à l’aide des quantificateurs.'),
    questions: ['« Tous les poissons sont rouges »', '« Il existe des poissons rouges »', '« Il n’y a que les poissons qui sont rouges »', '« Il existe un poisson qui n’est pas rouge »'],
    hints: [r`On quantifie sur \(M\) : « tous les poissons sont rouges », c’est « pour tout élément de la mare, s’il est un poisson, alors il est rouge ».`,
      r`« Il existe des poissons rouges » : un élément qui est à la fois poisson <b>et</b> rouge (pas une implication).`,
      r`« Il n’y a que les poissons qui sont rouges » : tout ce qui est rouge est un poisson.`],
    solution: [{ t: 'Traductions', html: ol([
        r`\(\forall x \in M,\ x \in P \implies x \in R\), c’est-à-dire \(P \subset R\).`,
        r`\(\exists x \in M,\ x \in P \land x \in R\), c’est-à-dire \(P \cap R \neq \varnothing\).`,
        r`\(\forall x \in M,\ x \in R \implies x \in P\), c’est-à-dire \(R \subset P\).`,
        r`\(\exists x \in M,\ x \in P \land x \notin R\) : c’est la négation de la phrase 1.`]) +
      p(r`Avec \(\forall\), le connecteur naturel est \(\implies\) ; avec \(\exists\), c’est \(\land\). Écrire \(\exists x \in M, x \in P \implies x \in R\) serait vrai dès qu’un seul élément de la mare n’est pas un poisson : ce n’est pas la phrase 2.`) }],
    answer: ol([r`\(\forall x \in M, x \in P \implies x \in R\)`, r`\(\exists x \in M, x \in P \land x \in R\)`, r`\(\forall x \in M, x \in R \implies x \in P\)`, r`\(\exists x \in M, x \in P \land x \notin R\)`]),
    traps: [r`Écrire \(\exists x, x \in P \implies x \in R\) : un « il existe » se traduit avec « et ».`,
      r`Confondre « tous les poissons sont rouges » (\(P \subset R\)) et « il n’y a que les poissons qui sont rouges » (\(R \subset P\)).`,
      r`Écrire \(x \in P \cap \neg R\) : on nie une assertion, pas un ensemble ; l’ensemble s’écrit \(P \cap \overline{R}\) ou \(P \setminus R\).`],
    note: NOTE_SEM, near: ['p2023-le-ex2']
  });

  add({
    id: 'sem-1-5', ecue: 'obm', order: 1105, src: 'Séminaire · Ex 1.5',
    title: 'Nier des phrases en français', topics: ['logique', 'quantificateurs'], lvl: 1, time: 15,
    intro: p('Écrire la négation des phrases suivantes, sachant que le terme « certains » signifie ici « au moins un ».'),
    questions: ['« Cette maison est grande ».', '« Toutes les vérités sont bonnes à dire ».', '« Certains poissons sont rouges ! ».', '« Aucune piste criminelle n’est écartée ».', '« Certains chats ne sont pas noirs ».',
      '« S’il fait beau alors je vais à la plage ».', '« Tu peux sortir si et seulement si tu fais tes devoirs ! ».', '<b>(Maison)</b> « Tous les chats sont gris »', '<b>(Maison)</b> « Certains étudiants ne s’endorment pas en cours de maths »',
      '<b>(Maison)</b> « Si je me couche tard alors je ne vais pas en cours de maths »', '<b>(Maison)</b> « Certains étudiants s’endorment en cours de maths ! ».'],
    hints: [r`« Tous » devient « certains … ne … pas » ; « certains » (au moins un) devient « aucun » ; « aucun » devient « au moins un ».`,
      r`« Si A alors B » se nie en « A et non B ».`,
      r`« A si et seulement si B » est faux quand A et B n’ont pas la même valeur : (A et non B) ou (B et non A).`],
    solution: [{ t: 'Les négations', html: ol([
        'Cette maison n’est pas grande.',
        'Certaines vérités ne sont pas bonnes à dire (au moins une vérité n’est pas bonne à dire).',
        'Aucun poisson n’est rouge.',
        'Au moins une piste criminelle est écartée.',
        'Tous les chats sont noirs.',
        'Il fait beau et je ne vais pas à la plage.',
        '(Tu peux sortir et tu ne fais pas tes devoirs) ou (tu fais tes devoirs et tu ne peux pas sortir).',
        'Certains chats ne sont pas gris.',
        'Tous les étudiants s’endorment en cours de maths.',
        'Je me couche tard et je vais en cours de maths.',
        'Aucun étudiant ne s’endort en cours de maths.']) +
      p(r`Phrase 6 en symboles : \(\neg(B \implies P) \iff B \land \neg P\). Phrase 7 : \(\neg(S \iff D) \iff (S \land \neg D) \lor (D \land \neg S)\).`) +
      model(p(r`Négation de « s’il fait beau alors je vais à la plage » : « il fait beau et je ne vais pas à la plage ».`) + p(r`<span class="c">pas « s’il ne fait pas beau, je ne vais pas à la plage »</span>`)) }],
    answer: p('Voir la liste : « tous » ↔ « certains … ne … pas », « certains » ↔ « aucun », « si A alors B » → « A et non B ».'),
    traps: [r`Nier « certains poissons sont rouges » en « certains poissons ne sont pas rouges » : les deux phrases peuvent être vraies en même temps, ce n’est pas une négation.`,
      r`Nier « si A alors B » en « si A alors non B » ou « si non A alors non B ».`,
      r`Écrire « tous les étudiants ne s’endorment pas » : la phrase est ambiguë. Préfère « aucun étudiant ne s’endort ».`],
    note: NOTE_SEM, near: ['p2023-le-ex2']
  });

  add({
    id: 'sem-1-6', ecue: 'obm', order: 1106, src: 'Séminaire · Ex 1.6',
    title: 'Ordre des quantificateurs : vrai ou faux', topics: ['quantificateurs'], lvl: 1, time: 15,
    intro: p('Pour chacune des assertions suivantes, spécifier si l’assertion est vraie ou fausse, puis écrire sa négation.'),
    questions: [r`\(\forall x \in \R, \quad \exists y \in \R, \quad x + y > 0\)`, r`\(\forall x \in \R, \quad \forall y \in \R, \quad x + y > 0\)`,
      r`\(\exists y \in \R, \quad \forall x \in \R, \quad x + y > 0\)`, r`\(\exists x \in \R, \quad \exists y \in \R, \quad x + y > 0\)`],
    hints: [r`Pour 1, le \(y\) peut dépendre de \(x\) : propose \(y\) en fonction de \(x\).`,
      r`Pour 3, le même \(y\) doit marcher pour tous les \(x\). Cherche un \(x\) qui le met en échec.`,
      r`Un « pour tout » faux se prouve par un contre-exemple chiffré ; un « il existe » vrai par un exemple.`],
    solution: [
      { t: 'Vrai ou faux', html: ol([
        r`<b>Vraie.</b> Soit \(x \in \R\). Posons \(y = 1 - x\). Alors \(x + y = 1 > 0\).`,
        r`<b>Fausse.</b> Contre-exemple : \(x = y = 0\) donne \(x + y = 0\), qui n’est pas \(> 0\).`,
        r`<b>Fausse.</b> Soit \(y \in \R\). Pour \(x = -y\), \(x + y = 0\) : aucun \(y\) ne convient pour tous les \(x\).`,
        r`<b>Vraie.</b> \(x = 1\), \(y = 0\) donnent \(x + y = 1 > 0\).`]) +
        p(r`1 et 3 ne diffèrent que par l’ordre des quantificateurs : en 1, \(y\) est choisi après \(x\) ; en 3, un seul \(y\) pour tous les \(x\).`) },
      { t: 'Négations', html: ol([
        r`\(\exists x \in \R,\ \forall y \in \R,\ x + y \le 0\)`, r`\(\exists x \in \R,\ \exists y \in \R,\ x + y \le 0\)`,
        r`\(\forall y \in \R,\ \exists x \in \R,\ x + y \le 0\)`, r`\(\forall x \in \R,\ \forall y \in \R,\ x + y \le 0\)`]) +
        tool('negate', { src: '∃ y ∈ ℝ, ∀ x ∈ ℝ, x + y > 0', title: 'Négation de l’assertion 3' }) +
        model(p(r`L’assertion 3 est fausse : montrons sa négation \(\forall y \in \R, \exists x \in \R, x + y \le 0\).`) + p(r`Soit \(y \in \R\). Posons \(x = -y\). Alors \(x + y = 0 \le 0\). La négation est vraie, donc l’assertion 3 est fausse.`)) }],
    answer: ol([r`Vraie ; négation \(\exists x, \forall y, x + y \le 0\).`, r`Fausse ; négation \(\exists x, \exists y, x + y \le 0\).`, r`Fausse ; négation \(\forall y, \exists x, x + y \le 0\).`, r`Vraie ; négation \(\forall x, \forall y, x + y \le 0\).`]),
    traps: [r`Nier \(>\) en \(<\) : c’est \(\le\).`, r`Croire que l’ordre de \(\forall\) et \(\exists\) ne compte pas : 1 est vraie, 3 est fausse.`,
      r`Justifier un « il existe » faux par un seul exemple : il faut montrer que <b>aucun</b> choix ne marche (donc prouver la négation).`],
    note: NOTE_SEM, near: ['p2024-obm-ex1', 'p2019-ex1']
  });

  add({
    id: 'sem-1-7a', ecue: 'obm', order: 1107, src: 'Séminaire · Ex 1.7 (1 et 2)',
    title: 'Vrai ou faux avec quantificateurs, négations et contraposées', topics: ['quantificateurs', 'logique'], lvl: 2, time: 30,
    questions: [
      r`Les assertions suivantes sont-elles vraies ou fausses ? Justifier.<br>(a) « \(\forall a \in \R,\ \forall b \in \R,\ (a + b)^2 = a^2 + b^2\) »<br>(b) « \(\forall x \in \R,\ \exists y \in \R,\ y > x\) »<br>(c) « \(\exists y \in \R,\ \forall x \in \R,\ y > x\) »<br>(d) « \(\exists y \in \R,\ \forall x \in \R^+,\ y \le x\) »<br>(e) « \(\forall x \in \R^*,\ \exists y \in \R,\ xy = 3\) »<br>(f) « \(\forall x \in \R,\ \exists y \in \R,\ x = y^2\) »<br>(g) « \(\forall x \in \R,\ \forall y \in \R,\ \left(x > y \implies x^2 > y^2\right)\) »<br>(h) « \(\forall x \in \R,\ x > 5 \implies (x - 1)(x - 6) < 0\) »<br>(i) « \(\forall a \in \N,\ \exists (b, c) \in \N^2,\ a = b + c\) »`,
      r`<b>(Maison)</b> Écrire la négation des assertions précédentes ainsi que la contraposée de (g) et (h).`],
    hints: [r`Pour chaque « pour tout » faux, donne un contre-exemple chiffré ; pour chaque « il existe » vrai, un exemple.`,
      r`(g) : essaie deux nombres négatifs. (h) : essaie un \(x\) plus grand que 6.`,
      r`La contraposée de \(\forall x, A(x) \implies B(x)\) est \(\forall x, \neg B(x) \implies \neg A(x)\) : le quantificateur ne change pas.`],
    solution: [
      { t: 'Question 1 : vrai ou faux', html: ul([
        r`(a) <b>Fausse</b> : \(a = b = 1\) donne \((1 + 1)^2 = 4\) et \(1^2 + 1^2 = 2\).`,
        r`(b) <b>Vraie</b> : soit \(x \in \R\), \(y = x + 1\) convient.`,
        r`(c) <b>Fausse</b> : pour tout \(y\), \(x = y\) donne \(y > x\) faux (aucun réel n’est plus grand que tous les réels).`,
        r`(d) <b>Vraie</b> : \(y = 0\) vérifie \(0 \le x\) pour tout \(x \in \R^+\).`,
        r`(e) <b>Vraie</b> : soit \(x \in \R^*\), \(y = \dfrac{3}{x}\) donne \(xy = 3\).`,
        r`(f) <b>Fausse</b> : \(x = -1\) n’est le carré d’aucun réel.`,
        r`(g) <b>Fausse</b> : \(x = -1\), \(y = -2\) : \(x > y\) mais \(x^2 = 1 < 4 = y^2\).`,
        r`(h) <b>Fausse</b> : \(x = 7\) : \(7 > 5\) mais \((7 - 1)(7 - 6) = 6 \ge 0\). (\((x - 1)(x - 6) < 0\) seulement pour \(x \in \left]1, 6\right[\).)`,
        r`(i) <b>Vraie</b> : soit \(a \in \N\), \((b, c) = (a, 0)\) convient.`]) },
      { t: 'Question 2 : négations et contraposées', html: ul([
        r`(a) \(\exists a \in \R,\ \exists b \in \R,\ (a + b)^2 \neq a^2 + b^2\)`, r`(b) \(\exists x \in \R,\ \forall y \in \R,\ y \le x\)`,
        r`(c) \(\forall y \in \R,\ \exists x \in \R,\ y \le x\)`, r`(d) \(\forall y \in \R,\ \exists x \in \R^+,\ y > x\)`,
        r`(e) \(\exists x \in \R^*,\ \forall y \in \R,\ xy \neq 3\)`, r`(f) \(\exists x \in \R,\ \forall y \in \R,\ x \neq y^2\)`,
        r`(g) \(\exists x \in \R,\ \exists y \in \R,\ x > y \land x^2 \le y^2\)`, r`(h) \(\exists x \in \R,\ x > 5 \land (x - 1)(x - 6) \ge 0\)`,
        r`(i) \(\exists a \in \N,\ \forall (b, c) \in \N^2,\ a \neq b + c\)`]) +
        p(r`Contraposées : (g) \(\forall x \in \R,\ \forall y \in \R,\ x^2 \le y^2 \implies x \le y\) ; (h) \(\forall x \in \R,\ (x - 1)(x - 6) \ge 0 \implies x \le 5\).`) +
        model(p(r`(g) est fausse. En effet, prenons \(x = -1\) et \(y = -2\). On a \(x > y\), mais \(x^2 = 1\) et \(y^2 = 4\), donc \(x^2 \le y^2\).`) + p(r`Ainsi \(\exists (x, y) \in \R^2,\ x > y \land x^2 \le y^2\) : c’est la négation de (g), qui est donc vraie.`)) }],
    answer: p(r`Vraies : (b), (d), (e), (i). Fausses : (a), (c), (f), (g), (h), chacune avec son contre-exemple.`),
    traps: [r`Proposer un contre-exemple qui ne vérifie pas l’hypothèse de l’implication : pour (h), il faut un \(x > 5\) ; \(x = 3\) ne prouve rien.`,
      r`Nier une implication quantifiée en gardant une implication.`,
      r`Changer le quantificateur dans la contraposée : il reste \(\forall\).`],
    note: NOTE_SEM, near: ['p2024-obm-ex1', 'p2019-ex1']
  });

  add({
    id: 'sem-1-7b', ecue: 'obm', order: 1108, src: 'Séminaire · Ex 1.7 (3)',
    title: 'Traduire des énoncés en langage mathématique', topics: ['quantificateurs', 'injections'], lvl: 2, time: 20,
    intro: p('Traduire les énoncés suivants à l’aide de quantificateurs et préciser si ils sont vrais ou faux :'),
    questions: ['« Le carré de tout réel est positif »', '« Certains réels sont strictement supérieurs à leur carré »', '« Tous les polynômes réels de degré 2 ont deux racines réelles distinctes »',
      r`Soit \(f : \R \longrightarrow \R\). « Si deux réels ont la même image par \(f\) alors ils sont égaux »`,
      r`Soit \(f : \left]0, +\infty\right[ \longrightarrow \R\). « Tout réel admet au moins antécédent par \(f\) »`],
    hints: [r`« Certains » : au moins un, donc \(\exists\). « Strictement supérieur » : \(>\).`,
      r`Un polynôme réel de degré 2 s’écrit \(ax^2 + bx + c\) avec \(a \neq 0\).`,
      r`(d) et (e) sont des définitions du cours (injective, surjective) : leur vérité dépend de \(f\).`],
    solution: [{ t: 'Traductions', html: ol([
        r`\(\forall x \in \R,\ x^2 \ge 0\) : <b>vraie</b>.`,
        r`\(\exists x \in \R,\ x > x^2\) : <b>vraie</b>, par exemple \(x = \dfrac{1}{2}\) : \(\dfrac{1}{2} > \dfrac{1}{4}\). (L’ensemble des solutions est \(\left]0, 1\right[\).)`,
        r`\(\forall (a, b, c) \in \R^* \times \R \times \R,\ \exists (x_1, x_2) \in \R^2,\ x_1 \neq x_2 \land ax_1^2 + bx_1 + c = 0 \land ax_2^2 + bx_2 + c = 0\) : <b>fausse</b>, \(x^2 + 1\) n’a aucune racine réelle (et \(x^2\) une seule).`,
        r`\(\forall (x, y) \in \R^2,\ f(x) = f(y) \implies x = y\) : c’est « \(f\) est injective ». <b>Cela dépend de \(f\)</b> : vrai pour \(x \mapsto x\), faux pour \(x \mapsto x^2\) (\(f(-1) = f(1)\)).`,
        r`\(\forall y \in \R,\ \exists x \in \left]0, +\infty\right[,\ f(x) = y\) : c’est « \(f\) est surjective ». <b>Cela dépend de \(f\)</b> : vrai pour \(\ln\), faux pour \(x \mapsto x\) (\(-1\) n’a pas d’antécédent dans \(\left]0, +\infty\right[\)).`]) +
      model(p(r`« Certains réels sont strictement supérieurs à leur carré » : \(\exists x \in \R,\ x > x^2\).`) + p(r`Vraie : pour \(x = \dfrac{1}{2}\), \(x^2 = \dfrac{1}{4} < \dfrac{1}{2}\).`)) }],
    answer: ol([r`\(\forall x \in \R, x^2 \ge 0\) vraie`, r`\(\exists x \in \R, x > x^2\) vraie (\(x = 1/2\))`, 'fausse (\\(x^2 + 1\\))', r`\(f\) injective : dépend de \(f\)`, r`\(f\) surjective : dépend de \(f\)`]),
    traps: [r`Prendre \(x = 0\) en (b) : \(0 > 0\) est faux. « Strictement » exclut l’égalité.`,
      r`Répondre « faux » en (d) et (e) avec un exemple : un exemple ne prouve rien pour une fonction quelconque, la vérité dépend de \(f\).`,
      r`Oublier \(a \neq 0\) dans « polynôme de degré 2 ».`],
    note: NOTE_SEM, near: ['p2021-ex2']
  });

  /* =====================================================================================================
     Séminaire, partie 2 : ensembles
     ===================================================================================================== */
  add({
    id: 'sem-2-8', ecue: 'obm', order: 1208, src: 'Séminaire · Ex 2.8',
    title: 'Les zéros du sinus : écrire un ensemble', topics: ['ensembles'], lvl: 1, time: 10,
    intro: p(r`Considérons \(f : x \longmapsto \sin(x)\). On s’intéresse à l’ensemble \(E\) des réels qui annulent \(f\). On définit les deux ensembles suivants :`) + fm(r`E_1 = \{\forall x \in \R,\ f(x) = 0\} \quad \text{et} \quad E_2 = \{\exists x \in \R,\ f(x) = 0\}`),
    questions: [r`Lire ces deux ensembles à haute voix. L’un de ces deux ensembles correspond-il à \(E\) ? Sinon, donner la bonne écriture, en compréhension, de l’ensemble \(E\).`, r`Écrire \(E\) par description paramétrique.`],
    hints: [r`Entre accolades, on écrit soit des éléments, soit « \(x \in\) (un ensemble), (une condition sur \(x\)) ». Une assertion seule n’est pas un ensemble.`,
      r`\(\sin(x) = 0\) pour \(x = k\pi\), \(k \in \Z\).`],
    solution: [{ t: 'Lecture et bonne écriture', html: p(r`\(E_1\) se lit « l’ensemble pour tout \(x\) réel, \(f(x) = 0\) » : entre les accolades il y a une <b>assertion</b> (fausse, d’ailleurs), pas un élément ni une condition sur une variable. Même chose pour \(E_2\) (assertion vraie). Aucun des deux n’est un ensemble, donc aucun n’est \(E\).`) +
      model(p(r`En compréhension : \(E = \{x \in \R,\ \sin(x) = 0\}\).`) + p(r`De façon paramétrique : \(E = \{k\pi,\ k \in \Z\}\).`)) }],
    answer: p(r`\(E_1\) et \(E_2\) ne sont pas des ensembles. \(E = \{x \in \R, \sin(x) = 0\} = \{k\pi, k \in \Z\}\).`),
    traps: [r`Mettre un quantificateur sur la variable de l’ensemble : dans \(\{x \in \R, \dots\}\), \(x\) est déjà introduit, on n’écrit pas \(\forall x\).`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-2-9a', ecue: 'obm', order: 1209, src: 'Séminaire · Ex 2.9 (1 à 3)',
    title: 'Extension, compréhension, paramétrique', topics: ['ensembles'], lvl: 1, time: 25,
    questions: [
      r`Écrire en extension les ensembles suivants :` + fm(r`A = \left\{n \in \N,\ \sqrt{2} < n < 2\pi\right\} \quad \text{et} \quad B = \left\{x \in [0, 20],\ \exists n \in \N,\ x = n^2\right\}`),
      r`Comparer les deux ensembles suivants : \(E = \{n \in \N,\ \exists k \in \N,\ n = 2k\}\) et \(F = \{2p,\ p \in \N\}\).`,
      r`Écrire les ensembles suivants en extension, en compréhension (description conditionnelle) et par description paramétrique (quand cela s’y prête) :<br>(a) L’ensemble des entiers naturels impairs strictement plus petits que 20.<br>(b) Dans le plan : la droite d’équation \(y = x\).<br>(c) L’ensemble des entiers strictement compris entre 2 et 30 et multiples de 4.<br>(d) L’ensemble des solutions réelles de l’équation \((x - 1)(x^2 - 5x + 6) = 0\).<br>(e) L’ensemble des réels compris entre \(-3\pi\) et \(3\pi\) dont le sinus est nul.<br>(f) L’ensemble des fonctions réelles paires.`],
    hints: [r`\(\sqrt{2} \approx 1{,}41\) et \(2\pi \approx 6{,}28\).`,
      r`Pour comparer \(E\) et \(F\), montre \(E \subset F\) puis \(F \subset E\) (double inclusion).`,
      r`L’extension (liste) n’est possible que pour un ensemble fini (ou une liste évidente) ; le paramétrique décrit les éléments comme « formule, paramètre dans un ensemble ».`],
    solution: [
      { t: 'Question 1', html: p(r`\(\sqrt{2} \approx 1{,}41\) et \(2\pi \approx 6{,}28\), d’où \(A = \{2, 3, 4, 5, 6\}\). Les carrés d’entiers dans \([0, 20]\) : \(B = \{0, 1, 4, 9, 16\}\) (\(25 > 20\)).`) },
      { t: 'Question 2 : double inclusion', html: model(p(r`Soit \(n \in E\). Il existe \(k \in \N\) tel que \(n = 2k\) : \(n\) s’écrit \(2p\) avec \(p = k \in \N\), donc \(n \in F\). Ainsi \(E \subset F\).`) + p(r`Soit \(n \in F\). Il existe \(p \in \N\) tel que \(n = 2p\). Alors \(n \in \N\) et \(k = p\) convient, donc \(n \in E\). Ainsi \(F \subset E\).`) + p(r`Donc \(E = F\) : c’est l’ensemble des entiers naturels pairs.`)) },
      { t: 'Question 3', html: tbl(['', 'extension', 'compréhension', 'paramétrique'], [
          ['(a)', r`\(\{1, 3, 5, \dots, 19\}\)`, r`\(\{n \in \N,\ n < 20,\ \exists k \in \N,\ n = 2k + 1\}\)`, r`\(\{2k + 1,\ k \in \ent{0}{9}\}\)`],
          ['(b)', 'impossible (infinité de points)', r`\(\{(x, y) \in \R^2,\ y = x\}\)`, r`\(\{(t, t),\ t \in \R\}\)`],
          ['(c)', r`\(\{4, 8, 12, \dots, 28\}\)`, r`\(\{n \in \N,\ 2 < n < 30,\ \exists k \in \N,\ n = 4k\}\)`, r`\(\{4k,\ k \in \ent{1}{7}\}\)`],
          ['(d)', r`\(\{1, 2, 3\}\)`, r`\(\{x \in \R,\ (x - 1)(x^2 - 5x + 6) = 0\}\)`, '—'],
          ['(e)', r`\(\{-3\pi, -2\pi, -\pi, 0, \pi, 2\pi, 3\pi\}\)`, r`\(\{x \in [-3\pi, 3\pi],\ \sin(x) = 0\}\)`, r`\(\{k\pi,\ k \in \ent{-3}{3}\}\)`],
          ['(f)', 'impossible', r`\(\{f \in \R^{\R},\ \forall x \in \R,\ f(-x) = f(x)\}\)`, '—']], { th: true }) +
        p(r`(d) : \(x^2 - 5x + 6 = (x - 2)(x - 3)\), donc les solutions sont 1, 2 et 3.`) }],
    answer: ul([r`\(A = \{2, 3, 4, 5, 6\}\), \(B = \{0, 1, 4, 9, 16\}\).`, r`\(E = F\) (les entiers naturels pairs), par double inclusion.`, 'Question 3 : le tableau.']),
    traps: [r`Oublier 0 dans \(B\) (\(0 = 0^2\) et \(0 \in \N\)).`, r`Paramétrer avec une variable qui n’apparaît pas dans la formule : \(\{2x + 1,\ k \in \ent{0}{9}\}\) n’a pas de sens.`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-2-9b', ecue: 'obm', order: 1210, src: 'Séminaire · Ex 2.9 (4 à 6)',
    title: 'Lire un ensemble, ∈ ou ⊂', topics: ['ensembles'], lvl: 1, time: 20,
    questions: [
      r`Que signifient les ensembles suivants ? Pour chacun d’entre eux, donner des éléments qui y appartiennent et d’autres qui n’y appartiennent pas.<br>(a) \(E = \{f : \R \longrightarrow \R,\ \forall x \in \R,\ f(x) \ge 0\}\).<br>(b) \(F = \left\{(u_n) \in \R^{\N},\ \forall n \in \N,\ u_{n+1} - u_n \ge 0\right\}\)<br>(c) \(G = \left\{x \in \R,\ \exists y \in \R,\ x = y^2\right\}\)`,
      r`Soit \(A = \ent{0}{10}\). Mettre le symbole \(\in\), \(\notin\), \(\subset\) ou \(\not\subset\) à la place des pointillés<br><b>a)</b> \(-1 \dots A\), <b>b)</b> \(2 \dots A\), <b>c)</b> \(\varnothing \dots A\), <b>d)</b> \(\{5\} \dots A\), <b>(e)</b> \(\{3\} \dots \{1, 2, 3\}\), <b>(f)</b> \(\{3\} \dots \mathcal{P}(A)\).`,
      r`Mettre le symbole \(\in\), \(\notin\), \(\subset\) ou \(\not\subset\) afin de rendre les assertions bien écrites et correctes.<br><b>a)</b> \(-1 \dots \left\{n \in \Z,\ n^2 > 1\right\}\), <b>b)</b> \((1, 2) \dots \left\{(x, y) \in \N^2,\ x^2 + y^2 = 5\right\}\),<br><b>c)</b> \(\{0, 1\} \dots \left\{(x, y) \in \N^2,\ x > y\right\}\), <b>d)</b> \(\{5\} \dots \mathcal{P}(\{-4, 1, 5\})\)`],
    hints: [r`À gauche de \(\in\) : un élément ; à gauche de \(\subset\) : un ensemble. Regarde le « type » des deux côtés.`,
      r`Les éléments de \(\mathcal{P}(A)\) sont des parties de \(A\) : \(\{3\} \in \mathcal{P}(A)\) équivaut à \(\{3\} \subset A\).`],
    solution: [
      { t: 'Question 4 : lire les ensembles', html: ul([
        r`\(E\) : les fonctions réelles positives sur \(\R\). Dans \(E\) : \(x \mapsto x^2\), \(\exp\), la fonction nulle. Pas dans \(E\) : \(x \mapsto x\), \(\sin\).`,
        r`\(F\) : les suites réelles croissantes. Dans \(F\) : \(u_n = n\), une suite constante. Pas dans \(F\) : \(u_n = (-1)^n\), \(u_n = -n\).`,
        r`\(G\) : les réels qui sont le carré d’un réel, c’est-à-dire \(G = \left[0, +\infty\right[\). Dans \(G\) : \(0\), \(4 = 2^2\), \(2 = (\sqrt{2})^2\). Pas dans \(G\) : \(-1\).`]) },
      { t: 'Question 5', html: p(r`a) \(-1 \notin A\) b) \(2 \in A\) c) \(\varnothing \subset A\) d) \(\{5\} \subset A\) e) \(\{3\} \subset \{1, 2, 3\}\) f) \(\{3\} \in \mathcal{P}(A)\).`) +
        p(r`Pour e) : \(\{3\}\) est un ensemble dont l’unique élément, 3, est dans \(\{1, 2, 3\}\) : inclusion. \(\{3\} \in \{1, 2, 3\}\) serait faux : les éléments de \(\{1, 2, 3\}\) sont des nombres.`) },
      { t: 'Question 6', html: ul([
        r`a) \(-1 \notin \{n \in \Z, n^2 > 1\}\) : \((-1)^2 = 1\) n’est pas \(> 1\).`,
        r`b) \((1, 2) \in \{(x, y) \in \N^2, x^2 + y^2 = 5\}\) : \(1 + 4 = 5\).`,
        r`c) \(\{0, 1\} \notin \{(x, y) \in \N^2, x > y\}\) : \(\{0, 1\}\) est un ensemble, pas un couple. On a aussi \(\{0, 1\} \not\subset\) cet ensemble, car \(0\) n’est pas un couple.`,
        r`d) \(\{5\} \in \mathcal{P}(\{-4, 1, 5\})\).`]) +
        model(p(r`\(\{3\} \subset \{1, 2, 3\}\) car le seul élément de \(\{3\}\), à savoir 3, appartient à \(\{1, 2, 3\}\).`) + p(r`\(\{3\} \in \mathcal{P}(A)\) car \(\{3\}\) est une partie de \(A = \ent{0}{10}\).`)) }],
    answer: p(r`5 : \(\notin, \in, \subset, \subset, \subset, \in\). 6 : \(\notin, \in, \notin\) (et \(\not\subset\)), \(\in\).`),
    traps: [r`Écrire \(\{3\} \in \{1, 2, 3\}\) : \(\{3\}\) n’est pas un nombre. On écrit \(3 \in \{1, 2, 3\}\) ou \(\{3\} \subset \{1, 2, 3\}\).`,
      r`Croire que \(\varnothing \in A\) : le vide est <b>inclus</b> dans tout ensemble, il n’est pas un élément de \(\ent{0}{10}\).`,
      r`Confondre \(\{0, 1\}\) (ensemble) et \((0, 1)\) (couple).`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-2-10', ecue: 'obm', order: 1211, src: 'Séminaire · Ex 2.10',
    title: 'Compléter avec ∈, ∉, ⊂ ; complémentaire dans ℤ', topics: ['ensembles'], lvl: 1, time: 15,
    intro: p(r`On considère les ensembles \(A = \{x \in \R,\ -1 < x < 10\}\) et \(B = \{n \in \N,\ n + 1 \le 8\}\).`),
    questions: [r`De quel ensemble commun de référence \(A\) et \(B\) sont-ils deux sous-ensembles ?`,
      r`Dans chacune des phrases suivantes, remplacer les pointillés afin de la rendre vraie (remplacer les pointillés par \(\varnothing\) est interdit).<br><em>Exemple : pour \(\dots\dots \in B\), on peut remplacer les pointillés par \(0\) car \(0 \in B\).</em><br><b>(a)</b> \(\dots\dots \in A\) &nbsp; <b>(b)</b> \(\dots\dots \notin A \cup B\) &nbsp; <b>(c)</b> \(\dots\dots \subset A \cup B\) &nbsp; <b>(d)</b> \(\dots\dots \in A \cap B\) &nbsp; <b>(e)</b> \(\dots\dots \subset A \times B\).`,
      r`Quel est le complémentaire de \(B\) dans \(\Z\) ?`],
    hints: [r`Écris \(B\) en extension : \(n + 1 \le 8\) donne \(n \le 7\).`, r`\(B \subset A\) : que valent \(A \cup B\) et \(A \cap B\) ?`, r`Les éléments de \(A \times B\) sont des couples ; une partie de \(A \times B\) est un ensemble de couples.`],
    solution: [{ t: 'Correction', html: p(r`\(A = \left]-1, 10\right[\) et \(B = \ent{0}{7}\). Comme \(B \subset A\), on a \(A \cup B = A\) et \(A \cap B = B\).`) +
      ol([r`\(A\) et \(B\) sont deux parties de \(\R\) (\(\N \subset \R\)).`,
        r`Par exemple : (a) \(0 \in A\) ; (b) \(10 \notin A \cup B\) ; (c) \(\{0\} \subset A \cup B\) (ou \([0, 1]\)) ; (d) \(3 \in A \cap B\) ; (e) \(\{(0, 0)\} \subset A \times B\).`,
        r`\(\overline{B} = \Z \setminus B = \{n \in \Z,\ n < 0 \text{ ou } n \ge 8\} = \{\dots, -2, -1\} \cup \{8, 9, \dots\}\).`]) +
      model(p(r`\(B = \{n \in \N, n \le 7\} = \ent{0}{7}\). Le complémentaire de \(B\) dans \(\Z\) est \(\{n \in \Z,\ n \notin B\} = \{n \in \Z,\ n \le -1 \text{ ou } n \ge 8\}\).`)) }],
    answer: p(r`\(\R\) ; par exemple \(0\), \(10\), \(\{0\}\), \(3\), \(\{(0, 0)\}\) ; \(\Z \setminus B = \{n \in \Z, n < 0 \text{ ou } n \ge 8\}\).`),
    traps: [r`Écrire \(0 \subset A\) ou \((0, 0) \subset A \times B\) : un élément appartient, un ensemble est inclus.`, r`Oublier les entiers négatifs dans le complémentaire dans \(\Z\).`],
    note: NOTE_SEM, near: ['p2023-le-ex3']
  });

  add({
    id: 'sem-2-11', ecue: 'obm', order: 1212, src: 'Séminaire · Ex 2.11',
    title: 'Opérations sur des intervalles', topics: ['ensembles', 'logique'], lvl: 1, time: 15,
    intro: p(r`On considère les trois sous-ensembles suivants de \(\R\) : \(A = [0, 3]\), \(B = \left]-1, 10\right]\) et \(C = [2, 20]\).`) +
      p(r`Trouver \(A \cap B\), \(A \cup B\), \((A \cup C) \cap B\), \((A \cap B) \cup (C \cap B)\), \((A \cap C) \cup B\) et \(\overline{A} \cup C\).`) + p('Faire le lien avec les connecteurs logiques vus dans la première partie.'),
    hints: [r`Dessine les trois intervalles sur une même droite graduée.`, r`\(\overline{A}\) est le complémentaire de \(A\) dans \(\R\) : \(\left]-\infty, 0\right[ \cup \left]3, +\infty\right[\).`],
    solution: [{ t: 'Les six ensembles', html: ul([
        r`\(A \cap B = [0, 3]\) (car \(A \subset B\)) et \(A \cup B = \left]-1, 10\right]\).`,
        r`\(A \cup C = [0, 20]\), donc \((A \cup C) \cap B = [0, 10]\).`,
        r`\(A \cap B = [0, 3]\), \(C \cap B = [2, 10]\), donc \((A \cap B) \cup (C \cap B) = [0, 10]\) : le même ensemble.`,
        r`\(A \cap C = [2, 3] \subset B\), donc \((A \cap C) \cup B = \left]-1, 10\right]\).`,
        r`\(\overline{A} \cup C = \left]-\infty, 0\right[ \cup \left]3, +\infty\right[ \cup [2, 20] = \left]-\infty, 0\right[ \cup \left[2, +\infty\right[\).`]) +
      p(r`Lien avec la logique : \(x \in A \cap B \iff (x \in A) \land (x \in B)\), \(x \in A \cup B \iff (x \in A) \lor (x \in B)\), \(x \in \overline{A} \iff \neg(x \in A)\). L’égalité \((A \cup C) \cap B = (A \cap B) \cup (C \cap B)\) est la distributivité \((P \lor R) \land Q \iff (P \land Q) \lor (R \land Q)\).`) +
      tool('venn', { n: 3, names: ['A', 'B', 'C'], u: 'ℝ', compare: ['(A | C) & B', '(A & B) | (C & B)'], title: 'Distributivité : mêmes zones' }) }],
    answer: p(r`\([0, 3]\) ; \(\left]-1, 10\right]\) ; \([0, 10]\) ; \([0, 10]\) ; \(\left]-1, 10\right]\) ; \(\left]-\infty, 0\right[ \cup \left[2, +\infty\right[\).`),
    traps: [r`Se tromper sur les crochets : \(-1 \notin B\), \(10 \in B\).`, r`Écrire \(\overline{A} = \left]-\infty, 0\right] \cup \left[3, +\infty\right[\) : 0 et 3 sont dans \(A\), donc pas dans \(\overline{A}\).`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-2-12', ecue: 'obm', order: 1213, src: 'Séminaire · Ex 2.12',
    title: 'Produit cartésien et ensemble des parties', topics: ['ensembles', 'cardinal'], lvl: 1, time: 15,
    intro: p(r`Considérons les ensembles \(E = \{1, 2, 3\}\) et \(F = \{a, b\}\) où \((a, b) \notin \{1, 2, 3\}^2\).`),
    questions: [r`Exprimer les ensembles \(E \times F\) et \(F \times E\). Combien ces ensembles ont-ils d’éléments ? Combien ont-ils d’éléments en commun ?`,
      r`Exprimer \(\mathcal{P}(E)\) et \(\mathcal{P}(F)\). Pour un ensemble \(X\) quelconque, peut-on intuiter quelque chose sur le nombre d’éléments de \(\mathcal{P}(X)\) par rapport à celui de \(X\) ?`],
    hints: [r`Un élément de \(E \times F\) est un couple \((e, f)\) : d’abord un élément de \(E\), puis un élément de \(F\).`, r`N’oublie ni \(\varnothing\) ni l’ensemble lui-même dans \(\mathcal{P}(E)\).`],
    solution: [
      { t: 'Question 1', html: fm(r`E \times F = \{(1, a), (1, b), (2, a), (2, b), (3, a), (3, b)\}, \quad F \times E = \{(a, 1), (a, 2), (a, 3), (b, 1), (b, 2), (b, 3)\}`) +
        p(r`Chacun a \(3 \times 2 = 6\) éléments. Aucun élément commun : un couple de \(E \times F\) a un nombre en première place, un couple de \(F \times E\) une lettre (\(a\) et \(b\) ne sont pas des éléments de \(E\)). Donc \(E \times F \neq F \times E\).`) +
        note(r`L’énoncé écrit « \((a, b) \notin \{1, 2, 3\}^2\) » ; il faut comprendre que ni \(a\) ni \(b\) n’est dans \(\{1, 2, 3\}\) (la feuille anglaise dit que ce sont les lettres « a » et « b »). Avec \(a = 1\), \((1, 1)\) serait dans les deux produits.`) },
      { t: 'Question 2', html: fm(r`\mathcal{P}(E) = \{\varnothing, \{1\}, \{2\}, \{3\}, \{1, 2\}, \{1, 3\}, \{2, 3\}, \{1, 2, 3\}\}, \quad \mathcal{P}(F) = \{\varnothing, \{a\}, \{b\}, \{a, b\}\}`) +
        p(r`8 et 4 éléments : \(8 = 2^3\), \(4 = 2^2\). Conjecture : si \(X\) a \(n\) éléments, \(\mathcal{P}(X)\) en a \(2^n\) (chaque élément est dans la partie ou non : deux choix, \(n\) fois). C’est démontré au TD 1.`) +
        model(p(r`\(\card(\mathcal{P}(E)) = 8 = 2^3 = 2^{\card(E)}\) et \(\card(\mathcal{P}(F)) = 4 = 2^{\card(F)}\).`)) }],
    answer: p(r`6 éléments chacun, aucun en commun ; \(\card \mathcal{P}(E) = 8\), \(\card \mathcal{P}(F) = 4\), conjecture \(\card \mathcal{P}(X) = 2^{\card X}\).`),
    traps: [r`Écrire \(\mathcal{P}(F) = 2^{|F|} = 4\) : \(\mathcal{P}(F)\) est un ensemble, son cardinal vaut 4.`, r`Oublier \(\varnothing\) ou \(E\) lui-même dans \(\mathcal{P}(E)\).`, r`Croire que \(E \times F = F \times E\) : les couples sont ordonnés.`],
    note: NOTE_SEM, near: ['p2023-dp-ex1']
  });

  add({
    id: 'sem-2-13', ecue: 'obm', order: 1214, src: 'Séminaire · Ex 2.13',
    title: 'Cardinal d’une union : partition et crible', topics: ['cardinal'], lvl: 2, time: 25,
    questions: [
      r`Soient \(E\) et \(F\) deux ensembles finis disjoints. Que vaut \(\card(E \cup F)\) ?<br>Remarque : quand les ensembles \(E\) et \(F\) sont disjoints, l’union se note aussi : \(E \sqcup F\).`,
      r`Soit \(M\) un ensemble fini. Rappeler ce qu’est une partition de \(M\).`,
      r`Soient \(X\) et \(Y\) deux ensembles finis tels que \(X \subset Y\). En partitionnant \(Y\), montrer que \(\card(Y \setminus X) = \card(Y) - \card(X)\).`,
      r`Soient \(A\) et \(B\) deux ensembles finis non disjoints. Représenter sous forme de patates ces deux ensembles. Conjecturer une formule donnant le cardinal de \(A \cup B\) en fonction de celui de \(A\), de \(B\) et de \(A \cap B\).`,
      r`Soient \(A\) et \(B\) deux ensembles finis non disjoints. Partitionner \(A \cup B\) en deux ensembles disjoints et démontrer la formule que vous avez conjecturé dans la question précédente.`,
      r`Dans une classe de 40 élèves, 25 parlent couramment l’anglais, 11 parlent couramment l’espagnol et 6 ne parlent ni anglais, ni espagnol.<br>Par la suite, on note \(C\) l’ensemble des élèves de la classe, \(A\) l’ensemble de ceux qui parlent anglais et \(E\) l’ensemble de ceux qui parlent espagnol.<br>(a) Traduire les données de l’énoncé à l’aide des 3 ensembles.<br>(b) Combien y a-t-il d’élèves qui parlent couramment à la fois l’anglais et l’espagnol ? On vous demande de justifier votre résultat à l’aide de formule(s) du cours que vous rappellerez.`],
    hints: [r`Une partition de \(M\) : des parties non vides, deux à deux disjointes, dont l’union est \(M\).`, r`\(Y = X \sqcup (Y \setminus X)\) et \(A = (A \setminus B) \sqcup (A \cap B)\).`, r`« Ni anglais ni espagnol » : le complémentaire de \(A \cup E\) dans \(C\).`],
    solution: [
      { t: 'Questions 1 à 3', html: ol([
        r`Si \(E \cap F = \varnothing\), \(\card(E \sqcup F) = \card(E) + \card(F)\).`,
        r`Une partition de \(M\) est une famille \((M_1, \dots, M_k)\) de parties de \(M\), non vides, deux à deux disjointes (\(M_i \cap M_j = \varnothing\) si \(i \neq j\)), dont l’union est \(M\).`,
        r`Voir la rédaction ci-dessous.`]) +
        model(p(r`Comme \(X \subset Y\), on a \(Y = X \sqcup (Y \setminus X)\) : tout élément de \(Y\) est soit dans \(X\), soit dans \(Y \setminus X\), et pas dans les deux.`) + p(r`D’après la question 1, \(\card(Y) = \card(X) + \card(Y \setminus X)\), d’où \(\card(Y \setminus X) = \card(Y) - \card(X)\).`)) },
      { t: 'Questions 4 et 5 : la formule du crible', html: p(r`Sur le dessin, \(A \cup B\) se découpe en trois zones : \(A \setminus B\), \(A \cap B\), \(B \setminus A\). En ajoutant \(\card(A)\) et \(\card(B)\), on compte deux fois \(A \cap B\). Conjecture : \(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B)\).`) +
        model(p(r`On a \(A \cup B = (A \setminus B) \sqcup B\) (union disjointe), donc \(\card(A \cup B) = \card(A \setminus B) + \card(B)\).`) + p(r`De plus \(A = (A \setminus B) \sqcup (A \cap B)\), donc \(\card(A \setminus B) = \card(A) - \card(A \cap B)\).`) + p(r`Ainsi \(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B)\).`)) },
      { t: 'Question 6 : la classe', html: model(p(r`(a) \(\card(C) = 40\), \(\card(A) = 25\), \(\card(E) = 11\) et \(\card(C \setminus (A \cup E)) = 6\).`) +
        p(r`(b) \(A \cup E \subset C\), donc par la question 3 : \(\card(A \cup E) = \card(C) - \card(C \setminus (A \cup E)) = 40 - 6 = 34\).`) +
        p(r`Par la formule du crible : \(\card(A \cup E) = \card(A) + \card(E) - \card(A \cap E)\), donc \(\card(A \cap E) = 25 + 11 - 34 = 2\).`) + p('Deux élèves parlent couramment les deux langues.')) +
        p(r`Contrôle : 23 parlent seulement anglais, 9 seulement espagnol, 2 les deux, 6 aucune : \(23 + 9 + 2 + 6 = 40\).`) }],
    answer: p(r`\(\card(E \sqcup F) = \card E + \card F\) ; \(\card(A \cup B) = \card A + \card B - \card(A \cap B)\) ; 2 élèves parlent les deux langues.`),
    traps: [r`Oublier de retirer \(\card(A \cap B)\) : \(25 + 11 = 36\) dépasse les 34 élèves qui parlent au moins une langue.`, r`Écrire la formule générale du crible pour répondre à la question 1 : pour des ensembles disjoints, on attend \(\card E + \card F\).`],
    note: NOTE_SEM, near: ['p2023-dp-ex1']
  });

  /* =====================================================================================================
     Séminaire, partie 3 : fonctions
     ===================================================================================================== */
  var PI = Math.PI;
  /* figures des énoncés, partagées avec la version anglaise */
  var SAG314 = [
    { f: [['a', 1], ['b', 4], ['d', 2]] },
    { f: [['a', 1], ['b', 4], ['c', 1], ['d', 2], ['d', 3]] },
    { f: [['a', 1], ['b', 4], ['c', 1], ['d', 4]] }];
  function fig314(lab) {
    return '<div style="display:flex;flex-wrap:wrap;gap:4px 18px">' + SAG314.map(function (d, i) {
      return '<figure style="margin:0;flex:1 1 220px;max-width:270px">' + sag({ E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4'], f: d.f, label: lab[0] + ' ' + (i + 1) }) + '<figcaption class="fig-cap" style="text-align:center">' + lab[0] + ' ' + (i + 1) + '</figcaption></figure>';
    }).join('') + '</div>';
  }
  function fig315(lab) { return sag({ E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4', '5'], f: [['a', 2], ['b', 2], ['c', 3], ['d', 5]], label: lab }); }
  function f321(v) { return v <= -2 ? 0.75 * (v + 6) : v <= 0 ? -2 * v - 1 : v - 1; }
  function fig321(lab, extra) {
    var o = { xr: [-6.6, 7.6], yr: [-3.2, 6.6], grid: [1, 1], H: 300, curves: [{ f: f321, a: -6, b: 7, n: 520 }], pts: [[-6, 0], [-2, 3], [0, -1], [7, 6]],
      xt: [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7].map(function (v) { return [v, String(v).replace('-', '−')]; }), yt: [-3, -2, -1, 1, 2, 3, 4, 5, 6].map(function (v) { return [v, String(v).replace('-', '−')]; }), label: lab };
    if (extra) Object.keys(extra).forEach(function (k) { o[k] = extra[k]; });
    return plot(o);
  }
  var TPI = [[-PI, '−π'], [-PI / 2, '−π/2'], [PI / 2, 'π/2'], [PI, 'π']];
  function figSin(lab, band, xsel) { return plot({ xr: [-3.5, 3.5], yr: [-1.3, 1.5], H: 200, curves: [{ f: Math.sin, a: -PI, b: PI }], xt: TPI, yt: [[1, '1'], [-1, '−1']], band: band, xsel: xsel, label: lab }); }
  function figSin4(lab) { return plot({ xr: [-0.95, 0.95], yr: [-1.3, 1.4], H: 210, curves: [{ f: function (v) { return Math.sin(4 * v); }, a: -PI / 4, b: PI / 4 }], xt: [[-PI / 4, '−π/4'], [-PI / 8, '−π/8'], [PI / 8, 'π/8'], [PI / 4, 'π/4']], yt: [[1, '1'], [-1, '−1']], dash: [[PI / 8, 0, PI / 8, 1], [-PI / 8, 0, -PI / 8, -1]], label: lab }); }
  function figTan(lab) {
    return plot({ xr: [-4.2, 4.2], yr: [-4.2, 4.2], W: 360, H: 330, curves: [{ f: Math.tan, a: -1.52, b: 1.52, n: 400 }, { f: Math.atan, color: 'var(--red, #c0392b)' }, { f: function (v) { return v; }, color: 'currentColor', dash: true }],
      dash: [[PI / 2, -4.2, PI / 2, 4.2], [-PI / 2, -4.2, -PI / 2, 4.2], [-4.2, PI / 2, 4.2, PI / 2], [-4.2, -PI / 2, 4.2, -PI / 2]],
      xt: [[-PI / 2, '−π/2'], [PI / 2, 'π/2']], yt: [[PI / 2, 'π/2'], [-PI / 2, '−π/2']], label: lab });
  }

  add({
    id: 'sem-3-14', ecue: 'obm', order: 1314, src: 'Séminaire · Ex 3.14',
    title: 'Quels dessins représentent une fonction ?', topics: ['fonctions'], lvl: 1, time: 5,
    intro: p(r`Parmi les dessins suivants, quels sont ceux qui représentent une fonction de \(E\) vers \(F\) ?`) + fig314(['Dessin']),
    hints: [r`Une fonction de \(E\) vers \(F\) associe à <b>chaque</b> élément de \(E\) <b>exactement une</b> image dans \(F\) : une flèche, ni zéro ni deux, part de chaque élément de \(E\).`,
      r`Les éléments de \(F\) peuvent recevoir zéro, une ou plusieurs flèches.`],
    solution: [{ t: 'Une flèche et une seule par élément de départ', html: ul([
        r`Dessin 1 : <b>pas une fonction</b>, \(c\) n’a pas d’image.`,
        r`Dessin 2 : <b>pas une fonction</b>, \(d\) a deux images (2 et 3).`,
        r`Dessin 3 : <b>une fonction</b> : \(a \mapsto 1\), \(b \mapsto 4\), \(c \mapsto 1\), \(d \mapsto 4\). Que 2 et 3 n’aient pas d’antécédent ne gêne pas (elle n’est simplement pas surjective).`]) +
      tool('sagittal', { E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4'], f: { a: '1', b: '4', c: '1', d: '4' }, modes: ['props', 'edit'], title: 'Dessin 3 (modifie les flèches pour retrouver les dessins 1 et 2)' }) }],
    answer: p('Seul le dessin 3 représente une fonction.'),
    traps: [r`Refuser le dessin 3 parce que deux flèches arrivent sur le même élément de \(F\) : c’est permis (la fonction n’est pas injective, mais c’est une fonction).`],
    note: NOTE_SEM, near: ['p2023-le-ex3']
  });

  add({
    id: 'sem-3-15', ecue: 'obm', order: 1315, src: 'Séminaire · Ex 3.15',
    title: 'Images directes et réciproques sur un diagramme', topics: ['images'], lvl: 1, time: 5,
    intro: p(r`Soit la fonction \(f : \{a, b, c, d\} \longrightarrow \{1, 2, 3, 4, 5\}\) dont le graphe est le suivant :`) + fig315('Diagramme de f') +
      p(r`Trouver : \(f(\{a, b, c\})\), \(f(\{a, b, c, d\})\), \(f^{-1}(\{2, 3\})\) et \(f^{-1}(\{1, 5\})\).`),
    hints: [r`\(f(A) = \{f(x),\ x \in A\}\) : on suit les flèches qui partent de \(A\).`, r`\(f^{-1}(B) = \{x \in E,\ f(x) \in B\}\) : on remonte les flèches qui arrivent dans \(B\).`],
    solution: [{ t: 'On suit les flèches', html: ul([
        r`\(f(\{a, b, c\}) = \{f(a), f(b), f(c)\} = \{2, 2, 3\} = \{2, 3\}\).`,
        r`\(f(\{a, b, c, d\}) = \{2, 3, 5\}\).`,
        r`\(f^{-1}(\{2, 3\}) = \{x,\ f(x) \in \{2, 3\}\} = \{a, b, c\}\).`,
        r`\(f^{-1}(\{1, 5\}) = \{d\}\) : 1 n’a pas d’antécédent, ce n’est pas un problème.`]) +
      tool('sagittal', { E: ['a', 'b', 'c', 'd'], F: ['1', '2', '3', '4', '5'], f: { a: '2', b: '2', c: '3', d: '5' }, mode: 'image', A: ['a', 'b', 'c'], B: ['2', '3'], modes: ['image', 'preimage'], title: 'Image directe, image réciproque' }) }],
    answer: p(r`\(\{2, 3\}\), \(\{2, 3, 5\}\), \(\{a, b, c\}\), \(\{d\}\).`),
    traps: [r`Écrire \(\{2, 2, 3\}\) sans simplifier, ou répondre par un nombre au lieu d’un ensemble.`, r`Croire que \(f^{-1}\) n’existe pas parce que \(f\) n’est pas bijective : l’image réciproque d’un ensemble existe toujours.`],
    note: NOTE_SEM, near: ['p2022-ex2', 'p2023-le-ex3']
  });

  add({
    id: 'sem-3-16', ecue: 'obm', order: 1316, src: 'Séminaire · Ex 3.16',
    title: 'Construire une fonction avec des contraintes d’images', topics: ['images'], lvl: 2, time: 15,
    intro: p(r`Pour chacune des propriétés suivantes, dessiner le graphe d’une fonction \(f\) de \(\ent{1}{4}\) dans \(\ent{1}{5}\) qui la vérifie.`),
    questions: [r`\(f(\ent{1}{4}) = \{1, 4\}\)`, r`\(f^{-1}(\{3, 4\}) = \{1, 2\}\)`, r`\(f(\{1, 2, 3\}) = \{3\}\) et \(f^{-1}(\{3, 5\}) = \{1, 2, 3\}\).`, r`\(f^{-1}(\{2\}) = \{2, 3\}\) et \(f(\{1, 2\}) = \{1, 2\}\).`],
    hints: [r`Traduis chaque condition en contraintes sur \(f(1), f(2), f(3), f(4)\). Exemple : \(f^{-1}(\{3, 4\}) = \{1, 2\}\) veut dire \(f(1), f(2) \in \{3, 4\}\) <b>et</b> \(f(3), f(4) \notin \{3, 4\}\).`,
      r`Chaque élément de \(\ent{1}{4}\), y compris 4, doit avoir une image.`],
    solution: [{ t: 'Une solution par question (il y en a d’autres)', html: ol([
        r`\(f(1) = f(2) = f(3) = 1\), \(f(4) = 4\) : les images sont exactement 1 et 4.`,
        r`\(f(1) = f(2) = 3\), \(f(3) = f(4) = 1\) : \(f(1), f(2) \in \{3, 4\}\) et \(f(3), f(4) \notin \{3, 4\}\).`,
        r`\(f(1) = f(2) = f(3) = 3\) et \(f(4) \in \{1, 2, 4\}\), par exemple \(f(4) = 1\) : \(f(4)\) ne doit valoir ni 3 ni 5.`,
        r`\(f(2) = f(3) = 2\), \(f(1) = 1\) (pour que \(f(\{1, 2\}) = \{1, 2\}\)) et \(f(4) \notin \{2\}\), par exemple \(f(4) = 1\).`]) +
      p(r`En énumérant les \(5^4 = 625\) fonctions de \(\ent{1}{4}\) dans \(\ent{1}{5}\) : 14, 36, 3 et 4 fonctions conviennent.`) +
      tool('sagittal', { E: ['1', '2', '3', '4'], F: ['1', '2', '3', '4', '5'], f: { 1: '1', 2: '2', 3: '2', 4: '1' }, mode: 'preimage', B: ['2'], modes: ['preimage', 'image', 'edit'], names: ['⟦1, 4⟧', '⟦1, 5⟧', 'f'], title: 'Question 4 (modifie les flèches pour tester les autres)' }) +
      model(p(r`4. On pose \(f(1) = 1\), \(f(2) = 2\), \(f(3) = 2\), \(f(4) = 1\).`) + p(r`Alors \(f^{-1}(\{2\}) = \{x \in \ent{1}{4},\ f(x) = 2\} = \{2, 3\}\) et \(f(\{1, 2\}) = \{f(1), f(2)\} = \{1, 2\}\).`)) }],
    answer: p(r`Par exemple \((f(1), f(2), f(3), f(4))\) = \((1, 1, 1, 4)\) ; \((3, 3, 1, 1)\) ; \((3, 3, 3, 1)\) ; \((1, 2, 2, 1)\).`),
    traps: [r`Laisser 4 sans image (question 4) : le dessin n’est plus une fonction.`, r`Oublier la moitié « \(\notin\) » d’une image réciproque : \(f^{-1}(\{2\}) = \{2, 3\}\) interdit aussi \(f(1) = 2\) et \(f(4) = 2\).`],
    note: NOTE_SEM, near: ['p2023-le-ex3', 'p2022-ex2']
  });

  add({
    id: 'sem-3-17', ecue: 'obm', order: 1317, src: 'Séminaire · Ex 3.17',
    title: 'Images d’intervalles par exp, x², sin', topics: ['images', 'usuelles'], lvl: 2, time: 20,
    intro: p(r`Considérons dans \(\R^{\R}\) les deux fonctions \(f : x \longmapsto e^x\), \(g : x \longmapsto x^2\) et sur \([-\pi, \pi]\) la fonction \(h : x \longmapsto \sin(x)\).`),
    questions: ['Représenter graphiquement ces trois fonctions.',
      r`Déterminer :<br>– \(f(\R)\) et \(f^{-1}(\{0\})\) ;<br>– \(g([-1, 4])\) et \(g^{-1}([-1, 4])\) ;<br>– \(h([-\pi, \pi]), h([0, \pi/2]), h^{-1}([0, 1]), h^{-1}([1, 2])\) et \(h^{-1}([3, 4])\).`],
    hints: [r`Image d’un intervalle : lis sur le graphe les valeurs prises (minimum et maximum atteints, sens de variation).`,
      r`Image réciproque : résous l’inéquation <b>dans l’ensemble de départ</b> (\([-\pi, \pi]\) pour \(h\)).`,
      r`\(\sin(-\pi) = 0\) : regarde les bords de l’intervalle.`],
    solution: [
      { t: 'f = exp et g = carré', html: ul([
        r`\(f(\R) = \left]0, +\infty\right[\) : \(\exp\) est strictement positive, et tout \(y > 0\) vaut \(e^{\ln y}\).`,
        r`\(f^{-1}(\{0\}) = \varnothing\) : \(e^x = 0\) n’a pas de solution.`,
        r`\(g([-1, 4]) = [0, 16]\) : sur \([-1, 0]\), \(x^2\) décrit \([0, 1]\) ; sur \([0, 4]\), il décrit \([0, 16]\).`,
        r`\(g^{-1}([-1, 4]) = \{x \in \R,\ -1 \le x^2 \le 4\} = [-2, 2]\) (\(x^2 \ge -1\) est toujours vrai).`]) },
      { t: 'h = sin sur [−π, π]', html: ul([
        r`\(h([-\pi, \pi]) = [-1, 1]\) et \(h([0, \pi/2]) = [0, 1]\) (\(\sin\) croît de 0 à 1 sur \([0, \pi/2]\)).`,
        r`\(h^{-1}([0, 1]) = \{x \in [-\pi, \pi],\ \sin(x) \ge 0\} = \{-\pi\} \cup [0, \pi]\).`,
        r`\(h^{-1}([1, 2]) = \{x \in [-\pi, \pi],\ \sin(x) = 1\} = \{\pi/2\}\).`,
        r`\(h^{-1}([3, 4]) = \varnothing\) (\(\sin \le 1\)).`]) +
        figSin('h = sin sur [−π, π] : la bande [0, 1] et son image réciproque', [0, 1], [[-PI, -PI], [0, PI]]) +
        model(p(r`\(h^{-1}([0, 1]) = \{x \in [-\pi, \pi],\ 0 \le \sin(x) \le 1\}\). Sur \([-\pi, \pi]\), \(\sin(x) \ge 0\) pour \(x \in [0, \pi]\) et pour \(x = -\pi\) (\(\sin(-\pi) = 0\)).`) + p(r`Donc \(h^{-1}([0, 1]) = \{-\pi\} \cup [0, \pi]\).`)) }],
    answer: p(r`\(\left]0, +\infty\right[\), \(\varnothing\) ; \([0, 16]\), \([-2, 2]\) ; \([-1, 1]\), \([0, 1]\), \(\{-\pi\} \cup [0, \pi]\), \(\{\pi/2\}\), \(\varnothing\).`),
    traps: [r`Oublier \(-\pi\) dans \(h^{-1}([0, 1])\) : \(\sin(-\pi) = 0 \in [0, 1]\).`, r`Écrire « \(f(\R) > 0\) » : \(f(\R)\) est un ensemble, on écrit \(\left]0, +\infty\right[\).`, r`Croire que \(g([-1, 4]) = [1, 16]\) en calculant seulement \(g(-1)\) et \(g(4)\) : \(g\) n’est pas monotone sur \([-1, 4]\), elle passe par 0.`],
    note: NOTE_SEM, near: ['p2024-obm-ex3', 'p2023-le-ex3']
  });

  add({
    id: 'sem-3-18', ecue: 'obm', order: 1318, src: 'Séminaire · Ex 3.18',
    title: 'Tableau d’images : exp, sin, ln', topics: ['images', 'usuelles'], lvl: 2, time: 20,
    intro: p('Compléter le tableau suivant.') + p('N.B. : nous vous conseillons de dessiner le graphe des fonctions concernées au brouillon !') +
      tbl([r`\(f\)`, r`\(\exp : \R \longrightarrow \R\)`, r`\(\sin : [-\pi, \pi] \longrightarrow \R\)`, r`\(\ln : \left]0, +\infty\right[ \longrightarrow \R\)`],
        [[r`\(f(\{0\}) =\)`, '', '', ''], [r`\(f(\left]0, \pi\right]) =\)`, '', '', ''], [r`\(f^{-1}(\{0\}) =\)`, '', '', ''], [r`\(f^{-1}(\{1\}) =\)`, '', '', ''], [r`\(f^{-1}(\left]-\infty, 0\right]) =\)`, '', '', '']], { th: true }),
    hints: [r`Une image directe se lit sur l’axe des ordonnées, une image réciproque sur l’axe des abscisses, dans l’ensemble de départ.`,
      r`Borne ouverte ou fermée : elle est fermée si la valeur est atteinte. \(\exp(0) = 1\) mais 0 est exclu de \(\left]0, \pi\right]\).`,
      r`Pour \(\ln\), l’ensemble de départ est \(\left]0, +\infty\right[\) : 0 n’y est pas.`],
    solution: [{ t: 'Le tableau rempli', html: tbl([r`\(f\)`, r`\(\exp\)`, r`\(\sin\) sur \([-\pi, \pi]\)`, r`\(\ln\)`], [
        [r`\(f(\{0\})\)`, r`\(\{1\}\)`, r`\(\{0\}\)`, 'non défini (0 n’est pas dans le départ)'],
        [r`\(f(\left]0, \pi\right])\)`, r`\(\left]1, e^{\pi}\right]\)`, r`\([0, 1]\)`, r`\(\left]-\infty, \ln \pi\right]\)`],
        [r`\(f^{-1}(\{0\})\)`, r`\(\varnothing\)`, r`\(\{-\pi, 0, \pi\}\)`, r`\(\{1\}\)`],
        [r`\(f^{-1}(\{1\})\)`, r`\(\{0\}\)`, r`\(\{\pi/2\}\)`, r`\(\{e\}\)`],
        [r`\(f^{-1}(\left]-\infty, 0\right])\)`, r`\(\varnothing\)`, r`\([-\pi, 0] \cup \{\pi\}\)`, r`\(\left]0, 1\right]\)`]], { th: true }) +
      ul([r`\(\exp\) est strictement croissante : \(\exp(\left]0, \pi\right]) = \left]e^0, e^{\pi}\right] = \left]1, e^{\pi}\right]\).`,
        r`\(\sin\) sur \(\left]0, \pi\right]\) : elle monte de \(0\) (non atteint en 0) à 1 en \(\pi/2\), puis redescend à 0, <b>atteint</b> en \(\pi\) : l’image est \([0, 1]\).`,
        r`\(\sin(x) \le 0\) sur \([-\pi, \pi]\) : pour \(x \in [-\pi, 0]\) et pour \(x = \pi\).`,
        r`\(\ln\) est strictement croissante, \(\ln(x) \le 0 \iff 0 < x \le 1\).`]) +
      figSin('sin sur [−π, π] : où sin(x) ≤ 0', [-1.3, 0], [[-PI, 0], [PI, PI]]) +
      note(r`\(\ln(\{0\})\) n’a pas de sens : on ne prend l’image que d’une partie de l’ensemble de départ. Si l’on calcule l’image des éléments de \(\{0\}\) qui sont dans \(\left]0, +\infty\right[\), on trouve \(\varnothing\).`) }],
    answer: p('Le tableau ci-dessus.'),
    traps: [r`Écrire \(\exp(\left]0, \pi\right]) = [1, e^{\pi}]\) : 0 est exclu, donc 1 n’est pas atteint.`, r`Oublier \(\pi\) dans \(\sin^{-1}(\left]-\infty, 0\right])\), ou \(-\pi\) et \(\pi\) dans \(\sin^{-1}(\{0\})\).`, r`Écrire \(\sin(\left]0, \pi\right]) = \left]0, 1\right]\) : \(\sin(\pi) = 0\) est atteint.`],
    note: NOTE_SEM, near: ['p2024-obm-ex3']
  });

  add({
    id: 'sem-3-19', ecue: 'obm', order: 1319, src: 'Séminaire · Ex 3.19',
    title: 'x ↦ x² : injective, surjective selon les ensembles', topics: ['injections'], lvl: 1, time: 15,
    intro: p(r`Discuter de l’injectivité et la surjectivité de la fonction \(\begin{cases} E \longrightarrow F \\ x \longmapsto x^2 \end{cases}\) dans les cas suivants :`),
    questions: [r`\(E = \R\) et \(F = \R\)`, r`\(E = \R\) et \(F = \R^+\)`, r`\(E = \R^+\) et \(F = \R\)`, r`\(E = \R^+\) et \(F = \R^+\)`],
    hints: [r`Injective : \(\forall (x, x') \in E^2,\ f(x) = f(x') \implies x = x'\). Pour la réfuter : deux éléments distincts de même image.`,
      r`Surjective : \(\forall y \in F,\ \exists x \in E,\ y = f(x)\). Pour la réfuter : un \(y\) de \(F\) sans antécédent.`,
      r`L’injectivité dépend de l’ensemble de départ, la surjectivité de l’ensemble d’arrivée.`],
    solution: [{ t: 'Les quatre cas', html: ol([
        r`<b>Ni injective, ni surjective</b> : \(f(-1) = f(1) = 1\) avec \(-1 \neq 1\) ; \(-1\) n’a pas d’antécédent (\(x^2 \ge 0\)).`,
        r`<b>Surjective, non injective</b> : soit \(y \in \R^+\), \(x = \sqrt{y} \in \R\) vérifie \(x^2 = y\) ; mais \(f(-1) = f(1)\).`,
        r`<b>Injective, non surjective</b> : soient \(x, x' \in \R^+\) avec \(x^2 = x'^2\) ; alors \(|x| = |x'|\), et comme \(x, x' \ge 0\), \(x = x'\). Mais \(-1\) n’a pas d’antécédent.`,
        r`<b>Bijective</b> : injective comme en 3, surjective comme en 2 (\(\sqrt{y} \in \R^+\)). Sa réciproque est \(y \mapsto \sqrt{y}\).`]) +
      model(p(r`Cas 4. Injectivité : soient \(x, x' \in \R^+\) tels que \(x^2 = x'^2\). Alors \(\sqrt{x^2} = \sqrt{x'^2}\), soit \(|x| = |x'|\), et comme \(x \ge 0\) et \(x' \ge 0\), \(x = x'\).`) +
        p(r`Surjectivité : soit \(y \in \R^+\). Posons \(x = \sqrt{y}\). Alors \(x \in \R^+\) et \(f(x) = (\sqrt{y})^2 = y\).`) + p(r`Donc \(f\) est bijective de \(\R^+\) sur \(\R^+\).`)) }],
    answer: p('1 : ni l’un ni l’autre ; 2 : surjective seulement ; 3 : injective seulement ; 4 : bijective.'),
    traps: [r`Commencer la surjectivité par « Soit \(y \in \R\) » quand l’arrivée est \(\R^+\) : on prend \(y\) dans l’ensemble d’arrivée.`, r`Prendre \(x, x' \in \R\) pour l’injectivité au cas 3 : ils sont dans \(\R^+\), c’est ce qui fait marcher la preuve.`],
    note: NOTE_SEM, near: ['p2023-le-ex3', 'p2022-ex2']
  });

  add({
    id: 'sem-3-20', ecue: 'obm', order: 1320, src: 'Séminaire · Ex 3.20',
    title: 'Injection, surjection, bijection entre petits ensembles', topics: ['injections'], lvl: 1, time: 10,
    questions: [r`Construire une fonction injective de \(\ent{1}{4}\) vers \(\ent{1}{5}\). Votre fonction peut elle être surjective ?`,
      r`Construire une fonction surjective de de \(\ent{1}{4}\) vers \(\ent{1}{3}\). Votre fonction peut elle être injective ?`,
      'En vous inspirant de vos exemples précédents, construire une fonction bijective.'],
    hints: [r`Une fonction injective envoie les 4 éléments de départ sur 4 images distinctes.`, r`Compte : combien d’images au plus pour 4 éléments de départ ?`],
    solution: [{ t: 'Exemples et impossibilités', html: ol([
        r`\(k \mapsto k\) est injective de \(\ent{1}{4}\) vers \(\ent{1}{5}\). Aucune fonction de \(\ent{1}{4}\) vers \(\ent{1}{5}\) n’est surjective : l’image a au plus 4 éléments, il en faudrait 5.`,
        r`\(1 \mapsto 1\), \(2 \mapsto 2\), \(3 \mapsto 3\), \(4 \mapsto 3\) est surjective. Aucune ne peut être injective : 4 éléments pour 3 images, deux éléments ont forcément la même image.`,
        r`Il faut autant d’éléments au départ qu’à l’arrivée : \(k \mapsto k\) de \(\ent{1}{4}\) vers \(\ent{1}{4}\) (ou de \(\ent{1}{3}\) vers \(\ent{1}{3}\)) est bijective.`]) +
      tool('sagittal', { E: ['1', '2', '3', '4'], F: ['1', '2', '3', '4', '5'], f: { 1: '1', 2: '2', 3: '3', 4: '4' }, modes: ['props', 'edit'], names: ['⟦1, 4⟧', '⟦1, 5⟧', 'f'], title: 'Essaie de la rendre surjective' }) }],
    answer: p(r`Injective : \(k \mapsto k\), jamais surjective (4 < 5). Surjective : \(4 \mapsto 3\) et \(k \mapsto k\) sinon, jamais injective (4 > 3). Bijective : l’identité de \(\ent{1}{4}\).`),
    traps: [r`Proposer une bijection de \(\ent{1}{4}\) vers \(\ent{1}{5}\) : impossible, les cardinaux diffèrent.`],
    note: NOTE_SEM, near: ['p2024-obm-ex2']
  });

  add({
    id: 'sem-3-21', ecue: 'obm', order: 1321, src: 'Séminaire · Ex 3.21',
    title: 'Fonction donnée par son graphe : choisir les intervalles', topics: ['injections', 'images'], lvl: 2, time: 15,
    intro: p(r`On considère la fonction \(f\) définie de \([-6, 7]\) vers \(\R\) dont le graphe est le suivant :`) + fig321('Graphe de f sur [−6, 7]'),
    questions: [r`Cette fonction est-elle injective de \([-6, 7]\) vers \(\R\) ? Même question pour surjective.`,
      r`Déterminer des <b>intervalles</b> \(A \subset [-6, 7]\) et \(B \subset \R\) tels que \(f : A \longrightarrow B\) soit injective et non surjective.`,
      r`Déterminer des <b>intervalles</b> \(A' \subset [-6, 7]\) et \(B' \subset \R\) tels que \(f : A' \longrightarrow B'\) soit surjective et non injective.`],
    hints: [r`Trace une droite horizontale \(y = 3\) : combien de points d’intersection ?`, r`Lis \(f([-6, 7])\) sur l’axe des ordonnées : le minimum et le maximum atteints.`, r`Pour que \(f : A \to B\) ait un sens, il faut \(f(A) \subset B\).`],
    solution: [{ t: 'Correction', html: p(r`Le graphe passe par \((-6, 0)\), \((-2, 3)\), \((0, -1)\) et \((7, 6)\) : \(f\) croît sur \([-6, -2]\), décroît sur \([-2, 0]\), croît sur \([0, 7]\) (\(f(x) = x - 1\) sur ce morceau). Son minimum est \(-1\), son maximum \(6\) : \(f([-6, 7]) = [-1, 6]\).`) +
      ol([r`<b>Non injective</b> : \(f(-2) = 3 = f(4)\) et \(-2 \neq 4\). <b>Non surjective</b> vers \(\R\) : \(10\) n’a pas d’antécédent (\(f(x) \le 6\)).`,
        r`Par exemple \(A = [0, 7]\) et \(B = \R\) : \(f\) est strictement croissante sur \([0, 7]\) donc injective ; \(10 \in \R\) n’a pas d’antécédent.`,
        r`Par exemple \(A' = [-6, 7]\) et \(B' = [-1, 6] = f([-6, 7])\) : surjective par construction, et toujours \(f(-2) = f(4)\).`]) +
      fig321('Graphe de f : la droite y = 3 coupe deux fois', { dash: [[-6.6, 3, 7.6, 3]], xsel: [[-2, -2], [4, 4]] }) +
      model(p(r`On a \(f(-2) = 3\) et \(f(4) = 3\) avec \(-2 \neq 4\) : \(f\) n’est pas injective sur \([-6, 7]\).`) + p(r`Pour tout \(x \in [-6, 7]\), \(f(x) \le 6\) : \(10\) n’a pas d’antécédent, \(f\) n’est pas surjective de \([-6, 7]\) vers \(\R\).`)) }],
    answer: p(r`Ni injective (\(f(-2) = f(4)\)) ni surjective (10). Par exemple \(A = [0, 7]\), \(B = \R\) ; \(A' = [-6, 7]\), \(B' = [-1, 6]\).`),
    traps: [r`Proposer \(B\) qui ne contient pas \(f(A)\) : \(f : A \to B\) n’est alors pas une fonction.`, r`Proposer des ensembles qui ne sont pas des intervalles (l’énoncé les impose).`],
    note: NOTE_SEM, near: ['p2023-le-ex3', 'p2022-ex2']
  });

  add({
    id: 'sem-3-22', ecue: 'obm', order: 1322, src: 'Séminaire · Ex 3.22',
    title: 'Étude de x ↦ sin(4x)', topics: ['usuelles', 'injections'], lvl: 2, time: 30,
    intro: p(r`Soit \(f : x \longmapsto \sin(4x)\). On note \(\mathcal{C}_f\) la courbe représentative de la fonction \(f\).`),
    questions: ['Donner le domaine de définition de \\(f\\).', r`Montrer que \(f\) est \(\dfrac{\pi}{2}\)-périodique.`, r`\(f\) est-elle paire ? impaire ? ni l’un ni l’autre ? Justifier.`,
      r`Expliquer pourquoi il suffit de faire l’étude de la fonction sur \(\left[0, \dfrac{\pi}{4}\right]\). Comment cela se traduit-il sur \(\mathcal{C}_f\) ?`,
      r`Étude sur \(\left[0, \dfrac{\pi}{4}\right]\). Étudier la dérivée de \(f\) sur \(I\) et montrer qu’elle change de signe en \(\dfrac{\pi}{8}\). Dresser son tableau (complet) de variations.`,
      r`Donner l’allure de la courbe sur \(I = \left[-\dfrac{\pi}{4}, \dfrac{\pi}{4}\right]\).`,
      r`\(f\) est-elle bijective de \(I\) vers \(\R\) ? Si non, proposer deux intervalles \(I' \subset I\) et \(J \subset \R\) telle que \(f\) soit bijective de \(I'\) vers \(J\).`],
    hints: [r`\(\sin\) est \(2\pi\)-périodique : \(\sin(4x + 2\pi) = \sin(4x)\).`, r`\(f'(x) = 4\cos(4x)\). Sur \(\left[0, \frac{\pi}{4}\right]\), \(4x\) décrit \([0, \pi]\).`, r`Pour une bijection, prends un intervalle où \(f\) est strictement monotone et son image.`],
    solution: [
      { t: 'Questions 1 à 4 : réduire l’intervalle d’étude', html: ol([
        r`\(f\) est définie sur \(\R\).`,
        r`Pour tout \(x \in \R\), \(f\left(x + \dfrac{\pi}{2}\right) = \sin(4x + 2\pi) = \sin(4x) = f(x)\).`,
        r`Pour tout \(x \in \R\), \(-x \in \R\) et \(f(-x) = \sin(-4x) = -\sin(4x) = -f(x)\) : \(f\) est impaire. Elle n’est pas paire : \(f\left(\frac{\pi}{8}\right) = 1\) et \(f\left(-\frac{\pi}{8}\right) = -1\).`,
        r`Par périodicité, il suffit d’étudier \(f\) sur un intervalle de longueur \(\frac{\pi}{2}\), par exemple \(\left[-\frac{\pi}{4}, \frac{\pi}{4}\right]\) ; par imparité, sur \(\left[0, \frac{\pi}{4}\right]\). On obtient ensuite \(\mathcal{C}_f\) par la symétrie de centre \(O\), puis par les translations de vecteurs \(k\frac{\pi}{2}\vec{\imath}\), \(k \in \Z\).`]) },
      { t: 'Questions 5 et 6 : dérivée et variations', html: p(r`\(f\) est dérivable et \(f'(x) = 4\cos(4x)\). Pour \(x \in \left[0, \frac{\pi}{4}\right]\), \(4x \in [0, \pi]\) : \(\cos(4x) > 0\) si \(4x < \frac{\pi}{2}\), c’est-à-dire \(x < \frac{\pi}{8}\) ; \(\cos(4x) = 0\) en \(x = \frac{\pi}{8}\) ; \(\cos(4x) < 0\) si \(x > \frac{\pi}{8}\).`) +
        tbl([r`\(x\)`, r`\(0\)`, '', r`\(\pi/8\)`, '', r`\(\pi/4\)`], [[r`\(f'(x)\)`, '', '+', '0', '−', ''], [r`\(f(x)\)`, '0', '↗', '1', '↘', '0']], { th: true, w: 26 }) +
        figSin4('sin(4x) sur [−π/4, π/4]') },
      { t: 'Question 7 : bijection', html: model(p(r`\(f\) n’est pas bijective de \(I\) vers \(\R\) : par exemple \(2\) n’a pas d’antécédent (\(f(x) \le 1\)), et \(f(0) = f\left(\frac{\pi}{4}\right) = 0\).`) +
        p(r`Sur \(I' = \left[-\frac{\pi}{8}, \frac{\pi}{8}\right]\), \(f\) est continue et strictement croissante (\(f' > 0\) sur \(\left]-\frac{\pi}{8}, \frac{\pi}{8}\right[\)), avec \(f\left(-\frac{\pi}{8}\right) = -1\) et \(f\left(\frac{\pi}{8}\right) = 1\) : elle est bijective de \(I'\) vers \(J = [-1, 1]\).`)) }],
    answer: p(r`\(\R\) ; \(\frac{\pi}{2}\)-périodique ; impaire ; maximum 1 en \(\frac{\pi}{8}\) ; bijective de \(\left[-\frac{\pi}{8}, \frac{\pi}{8}\right]\) vers \([-1, 1]\).`),
    traps: [r`Placer le changement de signe de \(f'\) en \(\frac{\pi}{4}\) : \(\cos(4x) = 0\) pour \(4x = \frac{\pi}{2}\), soit \(x = \frac{\pi}{8}\).`, r`Répondre « \(f : \R \to [-1, 1]\) » à la question 1 : on demande le domaine de définition, \(\R\).`, r`Oublier un des deux arguments : il suffit d’un défaut (injectivité ou surjectivité) pour dire « non bijective », mais il faut le justifier.`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-3-23', ecue: 'obm', order: 1323, src: 'Séminaire · Ex 3.23',
    title: 'Composées de fonctions', topics: ['fonctions'], lvl: 1, time: 20,
    questions: [
      r`Soient \(f, g\) et \(h\) les fonctions de \(\R^{\R}\) définies pour tout \(x \in \R\) par : \(f(x) = x^2\), \(g(x) = x + 1\) et \(h(x) = \cos(x)\).<br>Expliciter \(f \circ f, f \circ g, g \circ f, g \circ g, g \circ h\) et \(h \circ g\).`,
      r`Dans \(\R^{\R}\), on considère \(f : x \longmapsto 2x\), \(g : x \longmapsto -2x\) et \(h : x \longmapsto x^2\).<br>Comparer \(h \circ f\) et \(h \circ g\). Que peut-on en déduire ?`,
      r`Soient \(f : [0, 1] \longrightarrow \R\) et \(g : \R \longrightarrow \R^+\). Quelle(s) composée(s) de fonctions peut-on faire ?`,
      r`Écrire \(f : x \longmapsto e^{\sqrt{x^2+1}}\), \(g : x \longmapsto \sin^3(\cos(3x + 6))\) et \(h : x \longmapsto \ln(\sin^2(x^3))\) comme composées de fonctions usuelles.`],
    hints: [r`\((g \circ f)(x) = g(f(x))\) : on applique \(f\) d’abord.`, r`\(g \circ f\) n’existe que si l’ensemble d’arrivée de \(f\) est inclus dans l’ensemble de départ de \(g\).`, r`Pour décomposer, lis la formule de l’intérieur vers l’extérieur.`],
    solution: [
      { t: 'Questions 1 et 2', html: ul([r`\(f \circ f(x) = (x^2)^2 = x^4\) ; \(f \circ g(x) = (x + 1)^2 = x^2 + 2x + 1\) ; \(g \circ f(x) = x^2 + 1\).`,
        r`\(g \circ g(x) = x + 2\) ; \(g \circ h(x) = \cos(x) + 1\) ; \(h \circ g(x) = \cos(x + 1)\).`]) +
        p(r`On voit que \(f \circ g \neq g \circ f\) : la composition n’est pas commutative.`) +
        p(r`2. \(h \circ f(x) = (2x)^2 = 4x^2\) et \(h \circ g(x) = (-2x)^2 = 4x^2\) : \(h \circ f = h \circ g\) alors que \(f \neq g\). On ne peut pas « simplifier par \(h\) » (ici parce que \(h\) n’est pas injective).`) },
      { t: 'Question 3', html: ul([r`\(g \circ f\) : possible, \(f\) arrive dans \(\R\) qui est le départ de \(g\) ; \(g \circ f : [0, 1] \to \R^+\).`,
        r`\(g \circ g\) : possible, \(\R^+ \subset \R\) ; \(g \circ g : \R \to \R^+\).`,
        r`\(f \circ g\) et \(f \circ f\) : pas possibles en général, \(\R^+\) et \(\R\) ne sont pas inclus dans \([0, 1]\), le départ de \(f\).`]) },
      { t: 'Question 4', html: ul([r`\(f = \exp \circ \sqrt{\ } \circ u\) avec \(u(x) = x^2 + 1\).`, r`\(g = c \circ \sin \circ \cos \circ v\) avec \(c(x) = x^3\) et \(v(x) = 3x + 6\).`, r`\(h = \ln \circ s \circ \sin \circ w\) avec \(s(x) = x^2\) et \(w(x) = x^3\).`]) +
        model(p(r`Pour tout \(x \in \R\), \(f(x) = \exp\left(\sqrt{u(x)}\right)\) avec \(u : x \mapsto x^2 + 1\), donc \(f = \exp \circ \sqrt{\ } \circ u\).`)) }],
    answer: p(r`\(x^4\), \((x + 1)^2\), \(x^2 + 1\), \(x + 2\), \(\cos x + 1\), \(\cos(x + 1)\) ; \(h \circ f = h \circ g\) sans que \(f = g\) ; seules \(g \circ f\) et \(g \circ g\) existent.`),
    traps: [r`Confondre \(f \circ g\) et \(g \circ f\) : \(f \circ g(x) = f(g(x))\), on applique \(g\) en premier.`, r`Déduire \(f = g\) de \(h \circ f = h \circ g\).`],
    note: NOTE_SEM, near: ['p2022-ex2']
  });

  add({
    id: 'sem-3-24a', ecue: 'obm', order: 1324, src: 'Séminaire · Ex 3.24 (début et 1)',
    title: 'Bijection et unicité de l’antécédent ; la fonction tangente', topics: ['injections', 'usuelles'], lvl: 2, time: 25,
    intro: p(r`Soient \(E\) et \(F\) deux ensembles et \(f\) une fonction bijective de \(E\) vers \(F\).`) + p('Montrer que :') + fm(r`f \text{ bijective de } E \text{ vers } F \iff \forall y \in F,\ \exists !\, x \in E \text{ tel que } y = f(x).`) +
      p('On admet le résultat suivant :') +
      '<div class="box thm"><span class="tag">Théorème</span>' + p(r`Soient \(E\) et \(F\) deux ensembles et \(f \in F^E\). \(f\) bijective \(\iff \exists g : F \longrightarrow E\) telle que \(\forall x \in E,\ g \circ f(x) = x\) et \(\forall y \in F,\ f \circ g(y) = y\).`) +
      p(r`Si une telle fonction \(g\) existe, alors \(g\) est unique et on la note \(g = f^{-1}\). On a ainsi, pour \(f\) bijective de \(E\) vers \(F\) : \(\begin{cases} y = f(x) \\ x \in E \end{cases} \iff \begin{cases} x = f^{-1}(y) \\ y \in F \end{cases}\) et \(\forall x \in E,\ (f^{-1} \circ f)(x) = x\), \(\forall y \in F,\ (f \circ f^{-1})(y) = y\).`) +
      p(r`Le graphe de \(f^{-1}\) est obtenu du graphe de \(f\) par symétrie par rapport à la droite d’équation \(y = x\).`) + '</div>' +
      p(r`<b>Application : la fonction \(\arctan\). À connaître par cœur.</b> On définit la fonction tangente par : \(\tan : x \longmapsto \tan(x) = \dfrac{\sin(x)}{\cos(x)}\).`),
    questions: [r`Étude de la fonction tangente.<br>(a) Donner son domaine de définition \(D\).<br>(b) Montrer qu’elle est \(\pi\)-périodique et impaire sur \(D\).<br>(c) Calculer sa dérivée. Vous donnerez aussi le coefficient directeur de sa tangente en \(0\).<br>(d) Expliquer, graphiquement, pourquoi \(\tan\) est bijective de \(\left]-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right[\) vers \(\R\).`],
    hints: [r`Pour \(\implies\) : l’existence vient de la surjectivité, l’unicité de l’injectivité. Pour \(\impliedby\) : relis l’existence et l’unicité comme les deux définitions.`, r`\(\cos(x + \pi) = -\cos x\) et \(\sin(x + \pi) = -\sin x\).`, r`Dérive un quotient : \(\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}\).`],
    solution: [
      { t: 'Bijective ⇔ un unique antécédent', html: model(p(r`\((\implies)\) Supposons \(f\) bijective. Soit \(y \in F\). Comme \(f\) est surjective, il existe \(x \in E\) tel que \(y = f(x)\). Si \(x' \in E\) vérifie aussi \(y = f(x')\), alors \(f(x) = f(x')\), donc \(x = x'\) par injectivité : l’antécédent est unique.`) +
        p(r`\((\impliedby)\) Supposons que tout \(y \in F\) a un unique antécédent. L’existence donne la surjectivité. Soient \(x, x' \in E\) tels que \(f(x) = f(x')\) ; posons \(y = f(x)\) : \(x\) et \(x'\) sont deux antécédents de \(y\), donc \(x = x'\) par unicité. \(f\) est injective, donc bijective.`)) +
        note(r`L’énoncé place « \(f\) bijective » en hypothèse avant de demander l’équivalence : il faut lire « \(f\) une fonction de \(E\) vers \(F\) » (comme la feuille anglaise).`) },
      { t: 'La tangente', html: ol([
        r`\(D = \{x \in \R,\ \cos(x) \neq 0\} = \R \setminus \left\{\frac{\pi}{2} + k\pi,\ k \in \Z\right\}\).`,
        r`Soit \(x \in D\). Alors \(x + \pi \in D\), \(-x \in D\), et \(\tan(x + \pi) = \dfrac{-\sin x}{-\cos x} = \tan x\), \(\tan(-x) = \dfrac{-\sin x}{\cos x} = -\tan x\).`,
        r`\(\tan'(x) = \dfrac{\cos x \cos x - \sin x(-\sin x)}{\cos^2 x} = \dfrac{1}{\cos^2 x} = 1 + \tan^2 x\). En 0 : \(\tan'(0) = 1\), la tangente a pour coefficient directeur 1 (c’est la droite \(y = x\)).`,
        r`Sur \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\), \(\tan\) est continue, strictement croissante (\(\tan' > 0\)), tend vers \(-\infty\) en \(-\frac{\pi}{2}\) et vers \(+\infty\) en \(\frac{\pi}{2}\) : toute droite horizontale coupe la courbe en exactement un point. Chaque réel a un unique antécédent : bijection vers \(\R\).`]) +
        figTan('tan sur ]−π/2, π/2[, arctan, et la droite y = x') }],
    answer: p(r`\(D = \R \setminus \{\frac{\pi}{2} + k\pi, k \in \Z\}\) ; \(\pi\)-périodique, impaire ; \(\tan' = 1 + \tan^2 = \frac{1}{\cos^2}\), pente 1 en 0 ; bijective de \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) vers \(\R\).`),
    traps: [r`Dire « \(\tan\) est croissante donc injective » : il faut <b>strictement</b> croissante, et sur un intervalle (sur \(D\) entier, \(\tan\) n’est pas injective).`, r`Oublier de vérifier que \(x + \pi\) et \(-x\) sont dans \(D\).`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-3-24b', ecue: 'obm', order: 1325, src: 'Séminaire · Ex 3.24 (2 et 3)',
    title: 'La fonction arctangente', topics: ['usuelles'], lvl: 2, time: 25,
    intro: p(r`Suite de l’exercice précédent : \(\tan\) est bijective de \(\left]-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right[\) vers \(\R\).`),
    questions: [r`La fonction arctangente.<br>(a) Justifier son existence. Donner son domaine de définition et son domaine d’arrivée.<br>(b) Dessiner le graphe de cette fonction.<br>(c) Montrer que pour tout \(y \in \R\), \(\arctan'(y) = \dfrac{1}{1 + y^2}\).<br>(d) Remplir le tableau suivant :` +
        tbl([r`\(\alpha\)`, r`\(0\)`, '', r`\(\dfrac{\pi}{3}\)`, '', '', r`\(-\dfrac{\pi}{4}\)`, r`\(\arctan(x)\)`], [[r`\(\tan(\alpha)\)`, '', r`\(1\)`, '', r`\(-\sqrt{3}\)`, r`\(\dfrac{1}{\sqrt{3}}\)`, '', r`\(x\)`]], { th: true }),
      'Donner d’autres fonctions usuelles réciproques l’une de l’autre.'],
    hints: [r`\(\arctan\) est la réciproque de la restriction de \(\tan\) à \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\).`, r`Dérive l’égalité \(\tan(\arctan(y)) = y\) (on admet que \(\arctan\) est dérivable).`, r`\(\tan\frac{\pi}{6} = \frac{1}{\sqrt{3}}\), \(\tan\frac{\pi}{4} = 1\), \(\tan\frac{\pi}{3} = \sqrt{3}\).`],
    solution: [
      { t: '(a) et (b)', html: p(r`\(\tan\) est bijective de \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) vers \(\R\) : elle a une réciproque \(\arctan : \R \longrightarrow \left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\). Pour \(y \in \R\), \(\arctan(y)\) est l’unique \(\alpha \in \left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\) tel que \(\tan \alpha = y\).`) +
        p(r`Son graphe est le symétrique de celui de \(\tan\) par rapport à \(y = x\) : strictement croissante, impaire, asymptotes horizontales \(y = -\frac{\pi}{2}\) en \(-\infty\) et \(y = \frac{\pi}{2}\) en \(+\infty\), tangente \(y = x\) en 0.`) + figTan('arctan (en rouge), symétrique de tan par rapport à y = x') },
      { t: '(c) La dérivée', html: model(p(r`Soit \(y \in \R\). On a \(\tan(\arctan(y)) = y\). En dérivant (dérivée d’une composée) : \(\arctan'(y) \times \tan'(\arctan(y)) = 1\).`) +
        p(r`Or \(\tan' = 1 + \tan^2\), donc \(\tan'(\arctan(y)) = 1 + \tan^2(\arctan(y)) = 1 + y^2\). Ainsi \(\arctan'(y) = \dfrac{1}{1 + y^2}\).`)) },
      { t: '(d) et 3', html: tbl([r`\(\alpha\)`, r`\(0\)`, r`\(\dfrac{\pi}{4}\)`, r`\(\dfrac{\pi}{3}\)`, r`\(-\dfrac{\pi}{3}\)`, r`\(\dfrac{\pi}{6}\)`, r`\(-\dfrac{\pi}{4}\)`, r`\(\arctan(x)\)`], [[r`\(\tan(\alpha)\)`, r`\(0\)`, r`\(1\)`, r`\(\sqrt{3}\)`, r`\(-\sqrt{3}\)`, r`\(\dfrac{1}{\sqrt{3}}\)`, r`\(-1\)`, r`\(x\)`]], { th: true }) +
        p(r`Autres couples : \(\exp : \R \to \left]0, +\infty\right[\) et \(\ln\) ; \(x \mapsto x^2\) de \(\R^+\) vers \(\R^+\) et \(\sqrt{\ }\) ; \(x \mapsto x^3\) et \(x \mapsto \sqrt[3]{x}\) sur \(\R\).`) }],
    answer: p(r`\(\arctan : \R \to \left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\), \(\arctan' = \frac{1}{1 + y^2}\) ; \(\arctan 1 = \frac{\pi}{4}\), \(\arctan \sqrt{3} = \frac{\pi}{3}\), \(\arctan(-\sqrt{3}) = -\frac{\pi}{3}\), \(\arctan\frac{1}{\sqrt{3}} = \frac{\pi}{6}\), \(\arctan(-1) = -\frac{\pi}{4}\).`),
    traps: [r`Donner \(\arctan\) à valeurs dans \(\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]\) : les bornes ne sont jamais atteintes.`, r`Répondre \(\arctan(1) = \frac{5\pi}{4}\) : \(\tan\frac{5\pi}{4} = 1\), mais \(\frac{5\pi}{4}\) n’est pas dans \(\left]-\frac{\pi}{2}, \frac{\pi}{2}\right[\).`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-3-25', ecue: 'obm', order: 1326, src: 'Séminaire · Ex 3.25 (★)',
    title: 'Composée d’injections, composée de surjections', topics: ['injections', 'raisonnement'], lvl: 3, time: 15,
    intro: p(r`On considère trois ensembles \(E, F\) et \(G\) ainsi que deux fonctions \(f : E \longrightarrow F\) et \(g : F \longrightarrow G\).`),
    questions: [r`Montrer que si \(f\) et \(g\) sont injectives alors \(g \circ f\) est injective.`, r`Montrer que si \(f\) et \(g\) sont surjectives alors \(g \circ f\) est surjective.`],
    hints: [r`Écris d’abord ce qu’il faut montrer avec les quantificateurs, puis commence par « Soit … ».`, r`Pour la surjectivité, pars d’un \(z \in G\) et remonte : un antécédent par \(g\), puis un antécédent de celui-ci par \(f\).`],
    solution: [{ t: 'Les deux preuves', html: model(p(r`1. Supposons \(f\) et \(g\) injectives. Montrons que \(\forall (x, x') \in E^2,\ g \circ f(x) = g \circ f(x') \implies x = x'\).`) +
        p(r`Soit \((x, x') \in E^2\) tel que \(g \circ f(x) = g \circ f(x')\). On a alors \(g(f(x)) = g(f(x'))\). \(g\) étant injective, on en déduit \(f(x) = f(x')\). Ce qui implique \(x = x'\) car \(f\) est injective. Donc \(g \circ f\) est injective.`)) +
      model(p(r`2. Supposons \(f\) et \(g\) surjectives. Soit \(z \in G\). Par surjectivité de \(g\), il existe \(y \in F\) tel que \(z = g(y)\). Comme \(y \in F\) et \(f\) est surjective, il existe \(x \in E\) tel que \(y = f(x)\).`) +
        p(r`Ainsi \(z = g(y) = g(f(x)) = g \circ f(x)\) : \(z\) a un antécédent par \(g \circ f\). Donc \(g \circ f\) est surjective.`)) }],
    answer: p('Les deux rédactions ci-dessus (tombées à l’examen de novembre 2022).'),
    traps: [r`Partir d’un \(x \in E\) pour la surjectivité : on part d’un élément de l’ensemble d’arrivée \(G\).`, r`Utiliser l’injectivité dans le mauvais ordre : c’est celle de \(g\) qui donne \(f(x) = f(x')\).`],
    note: NOTE_SEM, near: ['p2022-ex2']
  });

  /* =====================================================================================================
     Séminaire, partie 4 : raisonnements
     ===================================================================================================== */
  add({
    id: 'sem-4-26a', ecue: 'obm', order: 1426, src: 'Séminaire · Ex 4.26 (1 à 4)',
    title: 'Raisonnements directs ; une fonction homographique', topics: ['raisonnement', 'injections'], lvl: 2, time: 35,
    intro: p('<b>• Raisonnements directs ou par implications successives.</b>'),
    questions: [r`Montrer que \(\forall (x, y) \in \left]0, 1\right[^2,\ 0 < \dfrac{x + y}{1 + xy} < 1\).<br>Indication : après en avoir trouvé le signe, développer \((1 - x)(1 - y)\).`,
      r`Montrer que : \(\forall n \in \N,\ (6 \text{ divise } n) \implies (3 \text{ divise } n)\). La réciproque est-elle vraie ?`,
      r`Montrer que : \(\forall (x, y) \in \R^2,\ x^2 + y^2 = 0 \iff x = y = 0\).`,
      r`On considère la fonction \(f\) définie sur \(I = \R \setminus \left\{-\dfrac{3}{2}\right\}\) par \(f(x) = \dfrac{x + 1}{2x + 3}\). En partant des définitions avec les quantificateurs :<br>(a) Dire si \(f\) est injective. Si oui, préciser les domaines de départ et d’arrivée.<br>(b) Dire si \(f\) est surjective. Si oui, préciser les domaines de départ et d’arrivée.<br>(c) \(f\) admet-elle une fonction réciproque ? Si oui laquelle ? Sur quels ensembles de départ et d’arrivée ?`],
    hints: [r`1 : \(1 - \dfrac{x + y}{1 + xy} = \dfrac{(1 - x)(1 - y)}{1 + xy}\).`, r`4 (b) : pour \(y \in \R\), résous \(f(x) = y\) : tu obtiens \(x(2y - 1) = 1 - 3y\). Que se passe-t-il pour \(y = \frac{1}{2}\) ?`, r`Une réciproque n’existe que pour une bijection : réduis l’ensemble d’arrivée.`],
    solution: [
      { t: 'Questions 1 à 3', html: model(p(r`1. Soit \((x, y) \in \left]0, 1\right[^2\). On a \(x + y > 0\) et \(1 + xy > 0\), donc \(\dfrac{x + y}{1 + xy} > 0\).`) +
        p(r`De plus \(1 - x > 0\) et \(1 - y > 0\), donc \((1 - x)(1 - y) > 0\), soit \(1 - x - y + xy > 0\), c’est-à-dire \(1 + xy > x + y\). En divisant par \(1 + xy > 0\) : \(\dfrac{x + y}{1 + xy} < 1\).`)) +
        p(r`2. Soit \(n \in \N\) tel que \(6 \mid n\) : \(n = 6k\) avec \(k \in \N\), donc \(n = 3 \times (2k)\) et \(3 \mid n\). Réciproque fausse : \(3 \mid 3\) mais 6 ne divise pas 3.`) +
        p(r`3. \((\impliedby)\) Si \(x = y = 0\), \(x^2 + y^2 = 0\). \((\implies)\) Si \(x^2 + y^2 = 0\) : \(x^2 = -y^2 \le 0\) et \(x^2 \ge 0\), donc \(x^2 = 0\), \(x = 0\) ; de même \(y = 0\).`) },
      { t: 'Question 4 : injective, surjective, réciproque', html: model(p(r`(a) Soient \(x, x' \in I\) tels que \(f(x) = f(x')\). Alors \((x + 1)(2x' + 3) = (x' + 1)(2x + 3)\), soit \(2xx' + 3x + 2x' + 3 = 2xx' + 3x' + 2x + 3\), d’où \(x = x'\). \(f\) est injective de \(I\) vers \(\R\).`) +
        p(r`(b) Soit \(y \in \R\). Pour \(x \in I\) : \(f(x) = y \iff x + 1 = y(2x + 3) \iff x(2y - 1) = 1 - 3y\). Si \(y = \frac{1}{2}\), cela donne \(0 = -\frac{1}{2}\) : \(\frac{1}{2}\) n’a pas d’antécédent, \(f\) n’est pas surjective vers \(\R\).`) +
        p(r`Si \(y \neq \frac{1}{2}\), \(x = \dfrac{1 - 3y}{2y - 1}\), et \(x \neq -\frac{3}{2}\) (sinon \(2 - 6y = 3 - 6y\), soit \(2 = 3\)) : \(f\) est surjective de \(I\) vers \(\R \setminus \left\{\frac{1}{2}\right\}\).`) +
        p(r`(c) \(f\) est donc bijective de \(\R \setminus \left\{-\frac{3}{2}\right\}\) vers \(\R \setminus \left\{\frac{1}{2}\right\}\), de réciproque \(f^{-1} : y \mapsto \dfrac{1 - 3y}{2y - 1}\), de \(\R \setminus \left\{\frac{1}{2}\right\}\) vers \(\R \setminus \left\{-\frac{3}{2}\right\}\).`)) }],
    answer: p(r`2 : réciproque fausse (\(n = 3\)). 4 : injective de \(I\) vers \(\R\) ; surjective (donc bijective) de \(I\) vers \(\R \setminus \{\frac{1}{2}\}\) ; \(f^{-1}(y) = \frac{1 - 3y}{2y - 1}\).`),
    traps: [r`Ne montrer que l’inégalité \(< 1\) en 1 : il y en a deux, \(0 <\) et \(< 1\).`, r`Diviser par \(2y - 1\) sans traiter \(y = \frac{1}{2}\) à part.`, r`Oublier de vérifier que l’antécédent trouvé est bien dans \(I\).`],
    note: NOTE_SEM, near: ['p2024-obm-ex1']
  });

  add({
    id: 'sem-4-26b', ecue: 'obm', order: 1427, src: 'Séminaire · Ex 4.26 (5 à 7)',
    title: 'Inclusion, double inclusion', topics: ['raisonnement', 'ensembles'], lvl: 2, time: 20,
    intro: p('<b>• Raisonnements par inclusion ou double inclusion</b>'),
    questions: [r`Soient \(A\) l’ensemble des fonctions constantes et \(B\) l’ensemble des fonctions paires. Montrer que \(A \subset B\). A-t-on \(A = B\) ?`,
      r`Soient \(E = \left\{x \in \R,\ x^2 + x + 2 \le 2\right\}\) et \(F = \left]-2, 0\right]\). A t-on \(E \subset F\) et \(F \subset E\) ?`,
      r`Soient \(A = \left\{(x, y) \in \R^2,\ 2x + y = 4\right\}\) et \(B = \{(t - 1, 6 - 2t),\ t \in \R\}\). Montrer que \(A = B\).`],
    hints: [r`Pour \(A \subset B\), la première ligne est « Soit \(f \in A\) ». Pour refuser une inclusion, un contre-exemple suffit.`, r`\(x^2 + x \le 0 \iff x(x + 1) \le 0\).`, r`Pour \(A \subset B\) en 7 : à partir de \((x, y) \in A\), trouve le \(t\) qui convient (\(t = x + 1\)).`],
    solution: [{ t: 'Correction', html: model(p(r`5. Soit \(f \in A\) : il existe \(c \in \R\) tel que \(\forall x \in \R,\ f(x) = c\). Soit \(x \in \R\) : \(f(-x) = c = f(x)\). Donc \(f\) est paire et \(A \subset B\).`) + p(r`\(A \neq B\) : \(x \mapsto x^2\) est paire mais pas constante.`)) +
        p(r`6. \(x^2 + x + 2 \le 2 \iff x(x + 1) \le 0 \iff x \in [-1, 0]\). Donc \(E = [-1, 0] \subset \left]-2, 0\right] = F\). Mais \(F \not\subset E\) : \(-\frac{3}{2} \in F\) et \(-\frac{3}{2} \notin E\).`) +
        model(p(r`7. \((A \subset B)\) Soit \((x, y) \in A\) : \(y = 4 - 2x\). Posons \(t = x + 1\). Alors \((t - 1, 6 - 2t) = (x, 6 - 2x - 2) = (x, 4 - 2x) = (x, y)\), donc \((x, y) \in B\).`) +
          p(r`\((B \subset A)\) Soit \(t \in \R\) : \(2(t - 1) + (6 - 2t) = 4\), donc \((t - 1, 6 - 2t) \in A\).`) + p(r`Par double inclusion, \(A = B\).`)) }],
    answer: p(r`\(A \subsetneq B\) ; \(E = [-1, 0] \subset F\) mais \(F \not\subset E\) ; \(A = B\) par double inclusion.`),
    traps: [r`Montrer une seule inclusion pour une égalité.`, r`Vérifier l’inclusion sur un exemple au lieu de commencer par « Soit … ».`],
    note: NOTE_SEM, near: ['p2024-obm-ex1']
  });

  add({
    id: 'sem-4-27', ecue: 'obm', order: 1428, src: 'Séminaire · Ex 4.27',
    title: 'La relation « a − b est un multiple de 3 »', topics: ['relations'], lvl: 2, time: 20,
    intro: p(r`Dans \(\Z\), on définit une relation entre deux entiers de la façon suivante :`) + fm(r`\forall (a, b) \in \Z^2,\ a \mathcal{R} b \iff a - b \text{ est un multiple de } 3`) +
      p(r`Par exemple, \(3 \mathcal{R} 15\) car \(3 - 15 = -12 = 3 \times (-4)\) et \(-4 \in \Z\). On dit que \(3\) est en relation avec \(15\). En revanche, \(4\) n’est pas en relation avec \(6\) car \(4 - 6 = -2\) et \(-2\) n’est pas un multiple de \(3\).`),
    questions: [r`Soit \((a, b) \in \Z^2\), traduire avec des quantificateurs « \(a - b\) est un multiple de \(3\). »`, r`L’assertion « \(\forall a \in \Z,\ a \mathcal{R} a\) » est-elle vraie ? Justifier.`,
      r`L’assertion « \(\forall (a, b) \in \Z^2,\ a \mathcal{R} b \implies a \mathcal{R} b\) » est-elle vraie ? Justifier.`, r`L’assertion « \(\forall (a, b) \in \Z^2,\ a \mathcal{R} b \text{ et } b \mathcal{R} a \implies a = b\) » est-elle vraie ? Justifier.`,
      r`L’assertion « \(\forall (a, b, c) \in \Z^3,\ a \mathcal{R} b \text{ et } b \mathcal{R} c \implies a \mathcal{R} c\) » est-elle vraie ? Justifier.`],
    hints: [r`« Multiple de 3 » : \(\exists k \in \Z,\ a - b = 3k\).`, r`Les questions 2 à 5 testent, dans l’ordre, la réflexivité, la symétrie, l’antisymétrie et la transitivité.`, r`Pour 4, l’exemple de l’énoncé (3 et 15) sert.`],
    solution: [{ t: 'Correction', html: ol([
        r`\(\exists k \in \Z,\ a - b = 3k\).`,
        r`<b>Vraie</b> (réflexivité) : soit \(a \in \Z\), \(a - a = 0 = 3 \times 0\) avec \(0 \in \Z\).`,
        r`Telle qu’elle est écrite, elle est vraie (\(P \implies P\) est toujours vraie). La question voulue est la <b>symétrie</b>, « \(a \mathcal{R} b \implies b \mathcal{R} a\) » : vraie. Si \(a - b = 3k\), alors \(b - a = 3(-k)\) avec \(-k \in \Z\).`,
        r`<b>Fausse</b> (pas d’antisymétrie) : \(3 \mathcal{R} 15\) et \(15 \mathcal{R} 3\) (\(15 - 3 = 12 = 3 \times 4\)), mais \(3 \neq 15\).`,
        r`<b>Vraie</b> (transitivité) : voir la rédaction.`]) +
      model(p(r`5. Soit \((a, b, c) \in \Z^3\) tel que \(a \mathcal{R} b\) et \(b \mathcal{R} c\). Il existe \((k, k') \in \Z^2\) tels que \(a - b = 3k\) et \(b - c = 3k'\).`) + p(r`Alors \(a - c = (a - b) + (b - c) = 3(k + k')\) avec \(k + k' \in \Z\) : \(a \mathcal{R} c\). \(\mathcal{R}\) est transitive.`) +
        p(r`Réflexive, symétrique et transitive : \(\mathcal{R}\) est une relation d’équivalence.`)) +
      note(r`L’énoncé (versions française et anglaise) écrit « \(a \mathcal{R} b \implies a \mathcal{R} b\) » à la question 3 : coquille pour « \(a \mathcal{R} b \implies b \mathcal{R} a\) ».`) }],
    answer: p(r`\(\exists k \in \Z, a - b = 3k\) ; réflexive ; symétrique ; pas antisymétrique (3 et 15) ; transitive : relation d’équivalence.`),
    traps: [r`Croire qu’« antisymétrique » veut dire « non symétrique » : cette relation est symétrique <b>et</b> pas antisymétrique.`, r`Réfuter une propriété sans contre-exemple chiffré.`, r`Utiliser le même \(k\) pour \(a - b\) et \(b - c\).`],
    note: NOTE_SEM, near: ['p2024-obm-ex4', 'p2023-le-ex4']
  });

  add({
    id: 'sem-4-28', ecue: 'obm', order: 1429, src: 'Séminaire · Ex 4.28',
    title: 'Par contraposée : n² pair ⇒ n pair', topics: ['raisonnement'], lvl: 1, time: 10,
    intro: p(r`Soit \(n \in \N\). En utilisant un raisonnement par contraposée, montrer que si \(n^2\) est pair, alors \(n\) est pair.`),
    hints: [r`La contraposée de « \(n^2\) pair \(\implies n\) pair » est « \(n\) impair \(\implies n^2\) impair ».`, r`\(n\) impair s’écrit \(n = 2k + 1\).`],
    solution: [{ t: 'Rédaction', html: model(p(r`Montrons la contraposée : si \(n\) est impair, alors \(n^2\) est impair.`) + p(r`Supposons \(n\) impair : il existe \(k \in \N\) tel que \(n = 2k + 1\). Alors \(n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1\), avec \(2k^2 + 2k \in \N\) : \(n^2\) est impair.`) +
      p(r`La contraposée étant vraie, l’implication l’est aussi : si \(n^2\) est pair, alors \(n\) est pair.`)) }],
    answer: p(r`\(n = 2k + 1 \implies n^2 = 2(2k^2 + 2k) + 1\) impair ; par contraposée, \(n^2\) pair \(\implies\) \(n\) pair.`),
    traps: [r`Montrer la réciproque (« \(n\) pair \(\implies n^2\) pair ») au lieu de la contraposée.`, r`Ne pas écrire la contraposée avant de la démontrer.`],
    note: NOTE_SEM, near: ['p2024-obm-ex1']
  });

  add({
    id: 'sem-4-29', ecue: 'obm', order: 1430, src: 'Séminaire · Ex 4.29',
    title: 'Par contraposée : (∀ε > 0, a < b + ε) ⇒ a ≤ b', topics: ['raisonnement', 'quantificateurs'], lvl: 2, time: 15,
    questions: [r`En raisonnant par contraposée, montrer que` + fm(r`(\forall \varepsilon > 0,\ a < b + \varepsilon) \implies a \le b`), 'Démontrer qu’il y a en fait équivalence.'],
    hints: [r`Contraposée : \(a > b \implies \exists \varepsilon > 0,\ a \ge b + \varepsilon\).`, r`Quel \(\varepsilon\) choisir quand \(a > b\) ? Essaie l’écart \(a - b\).`],
    solution: [{ t: 'Rédaction', html: model(p(r`1. La contraposée est : \(a > b \implies \exists \varepsilon > 0,\ a \ge b + \varepsilon\).`) + p(r`Supposons \(a > b\). Posons \(\varepsilon = a - b\) : \(\varepsilon > 0\) et \(b + \varepsilon = a\), donc \(a \ge b + \varepsilon\). La contraposée est vraie, donc l’implication aussi.`)) +
      model(p(r`2. Réciproque : supposons \(a \le b\). Soit \(\varepsilon > 0\). Alors \(a \le b < b + \varepsilon\), donc \(a < b + \varepsilon\). D’où l’équivalence.`)) }],
    answer: p(r`Contraposée avec \(\varepsilon = a - b\) ; la réciproque est immédiate (\(a \le b < b + \varepsilon\)).`),
    traps: [r`Nier \(\forall \varepsilon > 0, a < b + \varepsilon\) en \(\forall \varepsilon > 0, a \ge b + \varepsilon\) : c’est \(\exists \varepsilon > 0\).`, r`Prendre \(\varepsilon\) qui dépend de rien de précis (« \(\varepsilon\) petit ») : il faut le donner.`],
    note: NOTE_SEM, near: ['p2024-obm-ex1']
  });

  add({
    id: 'sem-4-30', ecue: 'obm', order: 1431, src: 'Séminaire · Ex 4.30',
    title: 'Par l’absurde : 1/3 n’est pas décimal', topics: ['raisonnement'], lvl: 2, time: 10,
    intro: p(r`Montrer par l’absurde que \(\dfrac{1}{3}\) n’est pas un nombre décimal.`),
    hints: [r`Un décimal s’écrit \(\dfrac{a}{10^n}\) avec \(a \in \Z\) et \(n \in \N\).`, r`\(10^n - 1 = 99\dots9\) est un multiple de 3 : quel est le reste de \(10^n\) dans la division par 3 ?`],
    solution: [{ t: 'Rédaction', html: model(p(r`Supposons par l’absurde que \(\frac{1}{3}\) est décimal : il existe \(a \in \Z\) et \(n \in \N\) tels que \(\dfrac{1}{3} = \dfrac{a}{10^n}\), d’où \(10^n = 3a\) : 3 divise \(10^n\).`) +
      p(r`Or \(10^n - 1 = 99\dots9\) (\(n\) chiffres 9) \(= 3 \times 33\dots3\), donc \(10^n = 3 \times 33\dots3 + 1\) : le reste de \(10^n\) dans la division par 3 est 1 (pour \(n = 0\), \(10^0 = 1\)). 3 ne divise pas \(10^n\) : contradiction.`) + p(r`Donc \(\frac{1}{3}\) n’est pas décimal.`)) +
      p(r`Autre argument : \(10^n = 2^n 5^n\) n’a que 2 et 5 comme facteurs premiers.`) }],
    answer: p(r`\(\frac{1}{3} = \frac{a}{10^n} \implies 10^n = 3a\), impossible car \(10^n\) a pour reste 1 dans la division par 3.`),
    traps: [r`Oublier d’écrire l’hypothèse « par l’absurde » au début, et la contradiction à la fin.`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-4-31', ecue: 'obm', order: 1432, src: 'Séminaire · Ex 4.31 (★)',
    title: '√2 n’est pas rationnel', topics: ['raisonnement'], lvl: 3, time: 15,
    intro: p(r`En utilisant le résultat de l’exercice 4-28, montrer que \(\sqrt{2}\) n’est pas un nombre rationnel.`) +
      p(r`Indice : on utilisera le fait qu’un nombre rationnel positif peut s’écrire sous la forme d’une fraction irréductible \(\dfrac{p}{q}\) où \(p\) est positif, \(q\) est strictement positif et \(p\) et \(q\) sont premiers entre eux, c’est-à-dire n’ont aucun diviseur positif en commun excepté \(1\).`),
    hints: [r`Raisonne par l’absurde : \(\sqrt{2} = \frac{p}{q}\) irréductible, élève au carré.`, r`\(p^2 = 2q^2\) : \(p^2\) est pair, donc \(p\) aussi (exercice 4.28).`],
    solution: [{ t: 'Rédaction', html: model(p(r`Supposons par l’absurde que \(\sqrt{2} \in \Q\). Comme \(\sqrt{2} > 0\), on écrit \(\sqrt{2} = \dfrac{p}{q}\) avec \(p \in \N\), \(q \in \N^*\), \(p\) et \(q\) premiers entre eux.`) +
      p(r`Alors \(p^2 = 2q^2\) : \(p^2\) est pair, donc \(p\) est pair (exercice 4.28). Écrivons \(p = 2k\), \(k \in \N\) : \(4k^2 = 2q^2\), d’où \(q^2 = 2k^2\). Donc \(q^2\) est pair, et \(q\) aussi.`) +
      p(r`\(p\) et \(q\) sont tous les deux divisibles par 2 : contradiction avec « premiers entre eux ». Donc \(\sqrt{2} \notin \Q\).`)) }],
    answer: p(r`Par l’absurde : \(p^2 = 2q^2\), puis \(p = 2k\), \(q^2 = 2k^2\) : \(p\) et \(q\) pairs, contradiction.`),
    traps: [r`Écrire \((2k)^2 = 4k\) au lieu de \(4k^2\) : la suite (\(q^2 = 2k^2\)) ne marche qu’avec le bon carré.`, r`Conclure « \(p\) pair » directement de « \(p^2\) pair » sans citer l’exercice 4.28.`],
    note: NOTE_SEM
  });

  add({
    id: 'sem-4-32a', ecue: 'obm', order: 1433, src: 'Séminaire · Ex 4.32 (1 et 2)',
    title: 'Récurrence : 2ⁿ ≥ 6n + 7, somme des entiers', topics: ['recurrence', 'sommes'], lvl: 2, time: 20,
    questions: [r`Par récurrence, montrer que : \(\forall n \in \left[\!\left[ 6, +\infty \right[\!\right[,\ 2^n \ge 6n + 7\)`, r`Par récurrence, montrer que : \(\forall n \in \N^*,\ \displaystyle\sum_{k=1}^n k = \dfrac{n(n + 1)}{2}\)`],
    hints: [r`Écris \(\mathcal{P}(n)\), puis initialisation au <b>premier</b> rang (6 ici), hérédité, conclusion.`, r`Hérédité de 1 : \(2^{n+1} = 2 \times 2^n \ge 12n + 14\). Compare avec \(6(n + 1) + 7 = 6n + 13\).`, r`Hérédité de 2 : \(\sum_{k=1}^{n+1} k = \sum_{k=1}^{n} k + (n + 1)\).`],
    solution: [
      { t: 'Question 1', html: model(p(r`Pour \(n \ge 6\), on pose \(\mathcal{P}(n)\) : « \(2^n \ge 6n + 7\) ».`) + p(r`<b>Initialisation.</b> \(2^6 = 64\) et \(6 \times 6 + 7 = 43\) : \(\mathcal{P}(6)\) est vraie.`) +
        p(r`<b>Hérédité.</b> Supposons \(\mathcal{P}(n)\) vraie pour un \(n \ge 6\). Alors \(2^{n+1} = 2 \times 2^n \ge 2(6n + 7) = 12n + 14 = 6(n + 1) + 7 + (6n + 1) \ge 6(n + 1) + 7\), car \(6n + 1 \ge 0\). Donc \(\mathcal{P}(n + 1)\) est vraie.`) +
        p(r`<b>Conclusion.</b> \(\mathcal{P}(6)\) est vraie et \(\mathcal{P}(n) \implies \mathcal{P}(n + 1)\) pour tout \(n \ge 6\) : par récurrence, \(\forall n \ge 6,\ 2^n \ge 6n + 7\).`)) +
        p(r`Le rang initial compte : pour \(n = 5\), \(2^5 = 32 < 37\).`) },
      { t: 'Question 2', html: model(p(r`Pour \(n \in \N^*\), \(\mathcal{P}(n)\) : « \(\sum_{k=1}^{n} k = \frac{n(n + 1)}{2}\) ». <b>Initialisation</b> : \(\sum_{k=1}^{1} k = 1 = \frac{1 \times 2}{2}\).`) +
        p(r`<b>Hérédité</b> : si \(\mathcal{P}(n)\) est vraie, \(\sum_{k=1}^{n+1} k = \frac{n(n + 1)}{2} + (n + 1) = \frac{(n + 1)(n + 2)}{2}\) : \(\mathcal{P}(n + 1)\) est vraie. <b>Conclusion</b> : par récurrence, \(\mathcal{P}(n)\) est vraie pour tout \(n \in \N^*\).`)) }],
    answer: p(r`Les deux récurrences ci-dessus (initialisation en \(n = 6\) pour la première).`),
    traps: [r`Initialiser en \(n = 0\) : \(1 \ge 7\) est faux. On initialise au rang de l’énoncé.`, r`Écrire « donc \(\mathcal{P}(n)\) est vraie » à la fin de l’hérédité : on démontre \(\mathcal{P}(n + 1)\).`, r`Supposer \(\mathcal{P}(n)\) « pour tout \(n\) » dans l’hérédité : c’est ce qu’on veut démontrer. On la suppose pour <b>un</b> \(n\).`],
    note: NOTE_SEM, near: ['p2020-ex6', 'p2021-ex8']
  });

  add({
    id: 'sem-4-32b', ecue: 'obm', order: 1434, src: 'Séminaire · Ex 4.32 (3 et 4)',
    title: 'Récurrence : dérivée n-ième, suite récurrente', topics: ['recurrence'], lvl: 2, time: 20,
    questions: [r`Soit \(f : x \longmapsto xe^x\) dérivable une infinité de fois sur \(\R\) et \(x \longmapsto f^{(n)}(x)\) la dérivée \(n\)-ième de \(f\) (\(n \in \N\)).<br>Montrer que \(\forall n \in \N\) et \(\forall x \in \R\) \(f^{(n)}(x) = (x + n)e^x\).`,
      r`Soit \((u_n)\) une suite telle que : \(\forall n \in \N,\ u_{n+1} = u_n + 2n + 3\) avec \(u_0 = 1\). Montrer que : \(\forall n \in \N\), \(u_n = (n + 1)^2\).`],
    hints: [r`\(f^{(0)} = f\) et \(f^{(n+1)} = \left(f^{(n)}\right)'\).`, r`Dérivée d’un produit : \(\left((x + n)e^x\right)' = e^x + (x + n)e^x\).`, r`\((n + 1)^2 + 2n + 3 = n^2 + 4n + 4\).`],
    solution: [
      { t: 'Question 3', html: model(p(r`Pour \(n \in \N\), \(\mathcal{P}(n)\) : « \(\forall x \in \R,\ f^{(n)}(x) = (x + n)e^x\) ».`) + p(r`<b>Initialisation.</b> \(f^{(0)}(x) = f(x) = xe^x = (x + 0)e^x\).`) +
        p(r`<b>Hérédité.</b> Supposons \(\mathcal{P}(n)\) vraie pour un \(n \in \N\). Pour \(x \in \R\), \(f^{(n+1)}(x) = \left(f^{(n)}\right)'(x) = e^x + (x + n)e^x = (x + n + 1)e^x\) : \(\mathcal{P}(n + 1)\) est vraie.`) + p(r`<b>Conclusion.</b> Par récurrence, \(\mathcal{P}(n)\) est vraie pour tout \(n \in \N\).`)) },
      { t: 'Question 4', html: model(p(r`\(\mathcal{P}(n)\) : « \(u_n = (n + 1)^2\) ». <b>Initialisation</b> : \(u_0 = 1 = (0 + 1)^2\).`) +
        p(r`<b>Hérédité</b> : supposons \(u_n = (n + 1)^2\) pour un \(n \in \N\). Alors \(u_{n+1} = (n + 1)^2 + 2n + 3 = n^2 + 4n + 4 = (n + 2)^2\). <b>Conclusion</b> : \(\forall n \in \N,\ u_n = (n + 1)^2\).`)) }],
    answer: p(r`Deux récurrences : \(f^{(n+1)}(x) = (x + n + 1)e^x\) ; \(u_{n+1} = (n + 2)^2\).`),
    traps: [r`Conclure l’hérédité par « donc \(\mathcal{P}(n)\) est vraie » au lieu de \(\mathcal{P}(n + 1)\).`, r`Oublier \(\forall x\) dans \(\mathcal{P}(n)\) en 3.`],
    note: NOTE_SEM, near: ['p2020-ex6', 'p2021-ex8']
  });

  add({
    id: 'sem-4-33', ecue: 'obm', order: 1435, src: 'Séminaire · Ex 4.33 (Maison)',
    title: 'Travail maison : densité de ℚ, récurrences', topics: ['recurrence', 'raisonnement', 'sommes'], lvl: 2, time: 30,
    intro: p('<b>Travail maison.</b>'),
    questions: [r`Montrer que : \(\forall (x, y) \in \Q^2 \quad [x < y \implies \exists q \in \Q,\ x < q < y]\)`,
      r`Soient \(f\) une fonction définie sur \(\R\) telle que \(\forall x \in [0, 2],\ f(x) \in [1, 2]\) et \((u_n)\) la suite définie par : \(\begin{cases} u_0 = 0{,}5 \\ \forall n \in \N,\ u_{n+1} = f(u_n) \end{cases}\).<br>Montrer par récurrence que : \(\forall n \in \N,\ u_n \in [0, 2]\)`,
      r`Soit \(a\) un réel positif. Montrer par récurrence : \(\forall n \in \N^*,\ a^n + na^{n-1} \le (a + 1)^n\).`,
      r`Montrer par récurrence que : \(\forall n \in \N^*,\ \dfrac{1}{1 \times 2} + \dfrac{1}{2 \times 3} + \dfrac{1}{3 \times 4} + \dots + \dfrac{1}{n \times (n + 1)} = 1 - \dfrac{1}{n + 1}\)`],
    hints: [r`1 : le milieu \(\frac{x + y}{2}\).`, r`3 : multiplie l’hypothèse de récurrence par \(a + 1 > 0\), puis laisse tomber un terme positif.`, r`4 : \(\frac{1}{(n + 1)(n + 2)} = \frac{1}{n + 1} - \frac{1}{n + 2}\).`],
    solution: [
      { t: 'Questions 1 et 2', html: model(p(r`1. Soient \((x, y) \in \Q^2\) avec \(x < y\). Posons \(q = \frac{x + y}{2}\) : \(q \in \Q\) et \(x = \frac{x + x}{2} < q < \frac{y + y}{2} = y\).`)) +
        model(p(r`2. \(\mathcal{P}(n)\) : « \(u_n \in [0, 2]\) ». <b>Initialisation</b> : \(u_0 = 0{,}5 \in [0, 2]\). <b>Hérédité</b> : si \(u_n \in [0, 2]\) pour un \(n \in \N\), alors \(u_{n+1} = f(u_n) \in [1, 2] \subset [0, 2]\). <b>Conclusion</b> : par récurrence, \(\forall n \in \N,\ u_n \in [0, 2]\).`)) },
      { t: 'Question 3', html: model(p(r`\(\mathcal{P}(n)\) : « \(a^n + na^{n-1} \le (a + 1)^n\) ». <b>Initialisation</b> (\(n = 1\)) : \(a + 1 \le a + 1\).`) +
        p(r`<b>Hérédité</b> : supposons \(\mathcal{P}(n)\) vraie pour un \(n \ge 1\). Comme \(a + 1 > 0\) : \((a + 1)^{n+1} = (a + 1)(a + 1)^n \ge (a + 1)(a^n + na^{n-1}) = a^{n+1} + (n + 1)a^n + na^{n-1} \ge a^{n+1} + (n + 1)a^n\), car \(na^{n-1} \ge 0\). C’est \(\mathcal{P}(n + 1)\).`) + p('<b>Conclusion</b> par récurrence.')) },
      { t: 'Question 4', html: model(p(r`\(\mathcal{P}(n)\) : « \(S_n = \sum_{k=1}^{n} \frac{1}{k(k + 1)} = 1 - \frac{1}{n + 1}\) ». <b>Initialisation</b> : \(S_1 = \frac{1}{2} = 1 - \frac{1}{2}\).`) +
        p(r`<b>Hérédité</b> : si \(\mathcal{P}(n)\) est vraie, \(S_{n+1} = 1 - \frac{1}{n + 1} + \frac{1}{(n + 1)(n + 2)} = 1 - \frac{(n + 2) - 1}{(n + 1)(n + 2)} = 1 - \frac{1}{n + 2}\). <b>Conclusion</b> par récurrence.`)) +
        p(r`Sans récurrence : \(\frac{1}{k(k + 1)} = \frac{1}{k} - \frac{1}{k + 1}\), et la somme se télescope.`) }],
    answer: p(r`\(q = \frac{x + y}{2}\) ; trois récurrences (initialisations en \(n = 0\), \(n = 1\), \(n = 1\)).`),
    traps: [r`Multiplier une inégalité par un nombre sans vérifier qu’il est positif (\(a + 1 > 0\) ici).`, r`En 2, oublier que l’hypothèse sur \(f\) ne vaut que pour \(x \in [0, 2]\) : c’est pour cela qu’on prouve \(u_n \in [0, 2]\).`],
    note: NOTE_SEM, near: ['p2020-ex6', 'p2021-ex8']
  });

  /* =====================================================================================================
     TD 1 : dénombrement (ECUE DP)
     ===================================================================================================== */
  add({
    id: 'td1-1-1', ecue: 'dp', order: 2101, src: 'TD 1 · Ex 1.1',
    title: 'Pairs et multiples de 3 jusqu’à 60', topics: ['cardinal', 'ensembles'], lvl: 1, time: 10,
    intro: p(r`Soit \(A\) (resp. \(B\)) l’ensemble des entiers naturels pairs (resp. multiples de 3) inférieurs ou égaux à 60.`),
    questions: ['Écrire mathématiquement des deux ensembles.', r`Quel est le cardinal de \(A\) ? Celui de \(B\) ?`, r`Que pouvez-vous dire du cardinal de \(A \cap B\) ?`, r`Quel est le cardinal de \(A \times B\) ? Celui de \(A \cup B\) ?`],
    hints: [r`0 est un entier naturel pair et multiple de 3.`, r`Un entier est pair et multiple de 3 si et seulement s’il est multiple de 6.`, r`\(\card(A \times B) = \card(A) \times \card(B)\) et la formule du crible pour \(A \cup B\).`],
    solution: [{ t: 'Correction', html: ol([
        r`\(A = \{2k,\ k \in \ent{0}{30}\}\) et \(B = \{3k,\ k \in \ent{0}{20}\}\).`,
        r`\(k \mapsto 2k\) est une bijection de \(\ent{0}{30}\) sur \(A\) : \(\card(A) = 31\). De même \(\card(B) = 21\).`,
        r`\(A \cap B\) est l’ensemble des multiples de 6 entre 0 et 60 : \(\{6k,\ k \in \ent{0}{10}\}\), donc \(\card(A \cap B) = 11\).`,
        r`\(\card(A \times B) = 31 \times 21 = 651\) ; \(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B) = 31 + 21 - 11 = 41\).`]) +
      model(p(r`Par la formule du crible, \(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B) = 31 + 21 - 11 = 41\).`)) }],
    answer: p(r`\(\card A = 31\), \(\card B = 21\), \(\card(A \cap B) = 11\), \(\card(A \times B) = 651\), \(\card(A \cup B) = 41\).`),
    traps: [r`Oublier 0 : on trouve alors 30, 20 et 10, et tout est faux.`, r`Additionner \(31 + 21\) sans retirer \(A \cap B\).`],
    note: NOTE_TD1, near: ['p2023-dp-ex1']
  });

  add({
    id: 'td1-1-2', ecue: 'dp', order: 2102, src: 'TD 1 · Ex 1.2',
    title: 'Combien de couples de notes pour une moyenne donnée ?', topics: ['denombrement'], lvl: 2, time: 15,
    intro: p(r`<b>Travail personnel obligatoire</b> : on note \(M\) (resp. \(A\)) la note de maths (resp. d’algo) en fin de S1 à l’EPITA. Toutes deux sont des notes sur 20, on suppose pour simplifier que ce sont des notes entières. Sous l’hypothèse où les deux matières ont même coefficient, un étudiant souhaite connaître le nombre de combinaisons de notes \(A\), \(M\) qu’il peut avoir afin d’obtenir une note moyenne fixée \(k \in \{0, \dots, 20\}\).`) +
      p('Comment pouvez-vous l’aider ?') + p('Vous pouvez, par exemple, représenter la situation sous forme de tableau à double entrée.'),
    hints: [r`Moyenne \(k\) : \(\dfrac{A + M}{2} = k\), soit \(A + M = 2k\).`, r`Dans le tableau \(21 \times 21\), les cases \(A + M = 2k\) forment une diagonale. Compte ses cases.`, r`Il faut \(A = 2k - M\) avec \(0 \le M \le 20\) et \(0 \le 2k - M \le 20\).`],
    solution: [{ t: 'Correction', html: p(r`On cherche le nombre \(N_k\) de couples \((A, M) \in \ent{0}{20}^2\) tels que \(A + M = 2k\). Le couple est déterminé par \(M\), avec \(A = 2k - M\) ; il faut \(0 \le M \le 20\) et \(0 \le 2k - M \le 20\), soit \(\max(0, 2k - 20) \le M \le \min(20, 2k)\).`) +
      ul([r`Si \(k \le 10\) : \(0 \le M \le 2k\), donc \(N_k = 2k + 1\).`, r`Si \(k \ge 10\) : \(2k - 20 \le M \le 20\), donc \(N_k = 20 - (2k - 20) + 1 = 41 - 2k\).`]) +
      tbl([r`\(k\)`, '0', '1', '2', '…', '9', '10', '11', '…', '19', '20'], [[r`\(N_k\)`, '1', '3', '5', '…', '19', '21', '19', '…', '3', '1']], { th: true }) +
      p(r`Contrôle : \(\sum_k N_k = 221\), le nombre de couples de somme paire parmi les \(21^2 = 441\).`) +
      model(p(r`Pour \(k \le 10\), les couples sont \((2k - M, M)\) pour \(M \in \ent{0}{2k}\) : il y en a \(2k + 1\).`) + p(r`Pour \(k \ge 10\), \(M \in \ent{2k - 20}{20}\) : il y en a \(41 - 2k\).`)) }],
    answer: p(r`\(N_k = 2k + 1\) si \(k \le 10\), \(N_k = 41 - 2k\) si \(k \ge 10\).`),
    traps: [r`Oublier la contrainte \(A \le 20\) : la formule \(2k + 1\) est fausse au-delà de \(k = 10\) (\(k = 20\) : un seul couple, \((20, 20)\)).`],
    note: NOTE_TD1
  });

  add({
    id: 'td1-1-3', ecue: 'dp', order: 2103, src: 'TD 1 · Ex 1.3',
    title: 'Cardinal d’une union de deux ensembles', topics: ['cardinal'], lvl: 1, time: 10,
    questions: [r`Soient \(E\) et \(F\) deux ensembles finis et disjoints. Que sait-on de \(\card(E \cup F)\) dans ce cas ?`,
      r`On s’intéresse, à présent, au cardinal de l’union de deux ensembles finis \(A\) et \(B\), non nécessairement disjoints.<br>(a) Représenter graphiquement l’union des deux ensembles \(A\) et \(B\) et partitionner cette union.<br>(b) En déduire une expression de \(\card(A \cup B)\) faisant apparaitre les cardinaux de \(A\) et \(B\).`],
    hints: [r`Trois zones : \(A \setminus B\), \(A \cap B\), \(B \setminus A\).`, r`\(\card(A) = \card(A \setminus B) + \card(A \cap B)\).`],
    solution: [{ t: 'Correction', html: p(r`1. \(\card(E \sqcup F) = \card(E) + \card(F)\).`) +
      p(r`2. (a) \(A \cup B = (A \setminus B) \sqcup (A \cap B) \sqcup (B \setminus A)\) : trois parties deux à deux disjointes.`) +
      tool('venn', { n: 2, names: ['A', 'B'], u: 'E', expr: 'A | B', title: 'A ∪ B : trois zones' }) +
      model(p(r`(b) Par additivité, \(\card(A \cup B) = \card(A \setminus B) + \card(A \cap B) + \card(B \setminus A)\).`) +
        p(r`Or \(\card(A) = \card(A \setminus B) + \card(A \cap B)\) et \(\card(B) = \card(B \setminus A) + \card(A \cap B)\).`) +
        p(r`En ajoutant : \(\card(A) + \card(B) = \card(A \cup B) + \card(A \cap B)\), d’où \(\card(A \cup B) = \card(A) + \card(B) - \card(A \cap B)\).`)) }],
    answer: p(r`\(\card(E \sqcup F) = \card E + \card F\) ; \(\card(A \cup B) = \card A + \card B - \card(A \cap B)\).`),
    traps: [r`Oublier que \(A \cap B\) est compté deux fois dans \(\card A + \card B\).`],
    note: NOTE_TD1, near: ['p2023-dp-ex1']
  });

  add({
    id: 'td1-1-4', ecue: 'dp', order: 2104, src: 'TD 1 · Ex 1.4',
    title: 'Formule du crible pour trois ensembles', topics: ['cardinal'], lvl: 2, time: 20,
    intro: p(r`On cherche à obtenir un résultat similaire à celui de l’exercice 1-3, mais pour une union de trois ensembles finis.`) +
      p(r`Soient \(A\), \(B\) et \(C\) trois ensembles finis. On cherche à déterminer le cardinal de \(A \cup B \cup C\) en fonction des cardinaux des diverses intersections possibles de ces ensembles.`),
    questions: [r`Représenter graphiquement \(A \cup B \cup C\) et partitionner cette union. Proposer une formule donnant \(\card(A \cup B \cup C)\).`,
      r`Démontrer cette relation rigoureusement, en utilisant de manière récursive le résultat de l’exercice 1-3.<br>Indices : \(A \cup B \cup C = (A \cup B) \cup C\), ce qui donne l’attaque récursive. Supprimer ensuite toutes les unions à l’aide des opérations sur les ensembles et de la formule de l’exercice 1-3.`],
    hints: [r`Sur le dessin, 7 zones. Une zone dans deux ensembles est comptée deux fois par \(\card A + \card B + \card C\), une zone dans les trois l’est trois fois.`, r`\((A \cup B) \cap C = (A \cap C) \cup (B \cap C)\) (distributivité).`, r`\((A \cap C) \cap (B \cap C) = A \cap B \cap C\).`],
    solution: [
      { t: 'Question 1 : la formule', html: tool('venn', { n: 3, names: ['A', 'B', 'C'], u: 'E', expr: 'A | B | C', title: 'A ∪ B ∪ C : sept zones' }) +
        fm(r`\card(A \cup B \cup C) = \card A + \card B + \card C - \card(A \cap B) - \card(A \cap C) - \card(B \cap C) + \card(A \cap B \cap C)`) +
        p(r`On ajoute les trois ensembles, on retire les intersections deux à deux (comptées deux fois), puis on rajoute l’intersection des trois (ajoutée trois fois, retirée trois fois).`) },
      { t: 'Question 2 : la preuve', html: model(p(r`Par l’exercice 1-3 appliqué à \(A \cup B\) et \(C\) : \(\card(A \cup B \cup C) = \card(A \cup B) + \card(C) - \card((A \cup B) \cap C)\).`) +
        p(r`D’une part \(\card(A \cup B) = \card A + \card B - \card(A \cap B)\).`) +
        p(r`D’autre part \((A \cup B) \cap C = (A \cap C) \cup (B \cap C)\), et \((A \cap C) \cap (B \cap C) = A \cap B \cap C\), donc \(\card((A \cup B) \cap C) = \card(A \cap C) + \card(B \cap C) - \card(A \cap B \cap C)\).`) +
        p(r`En remplaçant : \(\card(A \cup B \cup C) = \card A + \card B + \card C - \card(A \cap B) - \card(A \cap C) - \card(B \cap C) + \card(A \cap B \cap C)\).`)) }],
    answer: fm(r`\card(A \cup B \cup C) = \card A + \card B + \card C - \card(A \cap B) - \card(A \cap C) - \card(B \cap C) + \card(A \cap B \cap C)`),
    traps: [r`Oublier \(+\card(A \cap B \cap C)\) à la fin.`, r`Écrire \(\card((A \cup B) \cap C) = \card(A \cap C) + \card(B \cap C)\) : ces deux ensembles ne sont pas disjoints.`],
    note: NOTE_TD1, near: ['p2023-dp-ex1']
  });

  add({
    id: 'td1-1-5', ecue: 'dp', order: 2105, src: 'TD 1 · Ex 1.5',
    title: 'Injection, surjection et cardinaux', topics: ['cardinal', 'injections'], lvl: 1, time: 10,
    intro: p(r`On considère deux ensembles finis \(E\) et \(F\) de cardinaux respectifs \(n\) et \(p\), que l’on pourra assimiler à \(\ent{1}{n}\) et \(\ent{1}{p}\) sans perte de généralité.`),
    questions: [r`On suppose qu’il existe une injection de \(E\) vers \(F\). Quelle inégalité peut-on en déduire entre \(n\) et \(p\) ?`, r`On suppose qu’il existe une surjection de \(E\) vers \(F\). Quelle inégalité peut-on en déduire entre \(n\) et \(p\) ?`, r`On suppose qu’il existe une bijection entre \(E\) et \(F\). Quelle relation peut-on en déduire entre \(n\) et \(p\) ?`],
    hints: [r`Combien d’éléments a l’image \(f(E)\) d’une injection ?`, r`Pour une surjection, choisis un antécédent pour chaque élément de \(F\) : ces antécédents sont-ils distincts ?`],
    solution: [{ t: 'Correction', html: ol([
        r`Si \(f\) est injective, les \(n\) images \(f(1), \dots, f(n)\) sont deux à deux distinctes : \(f(E)\) a \(n\) éléments et \(f(E) \subset F\), donc \(n \le p\).`,
        r`Si \(f\) est surjective, chaque \(y \in F\) a un antécédent \(x_y\). Deux éléments \(y \neq y'\) ont des antécédents distincts (un même \(x\) n’a qu’une image). On obtient \(p\) éléments distincts de \(E\) : \(p \le n\).`,
        r`Une bijection est injective et surjective : \(n \le p\) et \(n \ge p\), donc \(n = p\).`]) +
      p(r`Contraposées utiles : si \(n > p\), aucune fonction de \(E\) dans \(F\) n’est injective (principe des tiroirs) ; si \(n < p\), aucune n’est surjective.`) }],
    answer: p(r`Injection : \(n \le p\). Surjection : \(n \ge p\). Bijection : \(n = p\).`),
    traps: [r`Inverser les inégalités : une injection va d’un « petit » ensemble vers un « grand ».`],
    note: NOTE_TD1
  });

  add({
    id: 'td1-1-6', ecue: 'dp', order: 2106, src: 'TD 1 · Ex 1.6',
    title: 'Cardinal de l’ensemble des parties', topics: ['cardinal', 'binomial'], lvl: 1, time: 10,
    intro: p(r`Soit \(E\) un ensemble fini de cardinal \(n\).`) + p(r`Proposer une méthode pour déterminer le cardinal de \(\mathcal{P}(E)\).`),
    hints: [r`Pour fabriquer une partie de \(E\), décide pour chaque élément s’il est dedans ou non.`, r`Autre méthode : classe les parties selon leur nombre d’éléments \(k\).`],
    solution: [{ t: 'Deux méthodes', html: ul([
        r`<b>Choix successifs.</b> Écrivons \(E = \{x_1, \dots, x_n\}\). Une partie est déterminée par \(n\) choix indépendants : \(x_i\) dedans ou pas. Il y a \(2 \times 2 \times \dots \times 2 = 2^n\) parties (c’est le nombre d’applications de \(E\) dans \(\{0, 1\}\)).`,
        r`<b>Partition selon le cardinal.</b> Il y a \(\binom{n}{k}\) parties à \(k\) éléments, pour \(k \in \ent{0}{n}\), et ces familles sont disjointes : \(\card \mathcal{P}(E) = \sum_{k=0}^{n} \binom{n}{k} = (1 + 1)^n = 2^n\) par la formule du binôme.`]) +
      p(r`Troisième idée, par récurrence : ajouter un élément à \(E\) double le nombre de parties (celles qui ne le contiennent pas, et les mêmes auxquelles on l’ajoute).`) }],
    answer: p(r`\(\card \mathcal{P}(E) = 2^n\).`),
    traps: [r`Oublier la partie vide ou \(E\) lui-même (\(k = 0\) et \(k = n\)).`],
    note: NOTE_TD1
  });

  add({
    id: 'td1-2-7', ecue: 'dp', order: 2207, src: 'TD 1 · Ex 2.7',
    title: 'Les quatre tirages de référence', topics: ['denombrement'], lvl: 1, time: 15,
    questions: [r`On dispose d’un sac de \(n\) billes numérotées de 1 à \(n\).<br>– On tire successivement et avec remise \(k\) billes du sac (\(1 \le k \le n\)). Combien y a-t-il de tirages possibles ?<br>– On tire successivement et sans remise \(n\) billes du sac. Combien y a-t-il de tirages possibles ?<br>– On tire successivement et sans remise \(k\) billes du sac (\(1 \le k \le n\)). Combien y a-t-il de tirages possibles ?<br>– On tire simultanément \(k\) billes du sac que l’on met dans un autre sac. Combien y a-t-il de tirages possibles ?`,
      r`Soit \(E\) un ensemble à \(n\) éléments. Rappeler ce qu’est un arrangement de \(k\) (\(k \le n\)) éléments de \(E\), une combinaison de \(k\) éléments de \(E\), ainsi qu’une permutation des \(n\) éléments de \(E\). Combien y en a-t-il ?`],
    hints: [r`Deux questions à se poser : l’ordre compte-t-il (successif ou simultané) ? Une bille peut-elle revenir (avec ou sans remise) ?`, r`Avec remise : \(n\) choix à chaque tirage. Sans remise : \(n\), puis \(n - 1\), …`],
    solution: [{ t: 'Correction', html: tbl(['tirage', 'modèle', 'nombre'], [
        ['successif, avec remise, \\(k\\) billes', '\\(k\\)-liste de \\(\\ent{1}{n}\\)', '\\(n^k\\)'],
        ['successif, sans remise, \\(n\\) billes', 'permutation', '\\(n!\\)'],
        ['successif, sans remise, \\(k\\) billes', 'arrangement', '\\(A_n^k = n(n - 1)\\cdots(n - k + 1) = \\dfrac{n!}{(n - k)!}\\)'],
        ['simultané, \\(k\\) billes', 'combinaison (partie)', '\\(\\dbinom{n}{k} = \\dfrac{n!}{k!(n - k)!}\\)']]) +
      ul([r`Un <b>arrangement</b> de \(k\) éléments de \(E\) : une liste ordonnée de \(k\) éléments distincts de \(E\) ; il y en a \(A_n^k\) (\(n\) choix pour le premier, \(n - 1\) pour le deuxième…).`,
        r`Une <b>combinaison</b> de \(k\) éléments : une partie de \(E\) à \(k\) éléments (sans ordre) ; il y en a \(\binom{n}{k} = \frac{A_n^k}{k!}\) (chaque partie correspond à \(k!\) arrangements).`,
        r`Une <b>permutation</b> de \(E\) : un arrangement des \(n\) éléments (une bijection de \(E\) dans \(E\)) ; il y en a \(n!\).`]) }],
    answer: p(r`\(n^k\) ; \(n!\) ; \(A_n^k = \frac{n!}{(n - k)!}\) ; \(\binom{n}{k} = \frac{n!}{k!(n - k)!}\).`),
    traps: [r`Écrire \(k^n\) au lieu de \(n^k\) pour \(k\) tirages avec remise parmi \(n\) : \(n\) choix, \(k\) fois.`, r`Utiliser \(A_n^k\) pour un tirage simultané : l’ordre ne compte pas, c’est \(\binom{n}{k}\).`],
    note: NOTE_TD1, near: ['p2019-ex5', 'p2024-dp-ex1']
  });

  add({
    id: 'td1-2-8', ecue: 'dp', order: 2208, src: 'TD 1 · Ex 2.8',
    title: 'Anagrammes et passages au tableau', topics: ['denombrement'], lvl: 1, time: 15,
    intro: p('Dénombrer le nombre :'),
    questions: ['d’anagrammes du mot voiture', 'd’anagrammes du mot saperlipopette.', 'de façons de faire passer 5 étudiants de la classe un par un au tableau : c’est-à-dire de façons de choisir à la fois les 5 étudiants et leur ordre de passage.',
      'de façons de faire passer tous les étudiants de la classe un par un au tableau.', 'de façons de faire passer tous les étudiants de la classe un par un au tableau, sachant que les deux qui dorment au fond de la classe vont être appelés deux fois.'],
    hints: [r`Un mot de \(n\) lettres distinctes a \(n!\) anagrammes. Si une lettre apparaît \(r\) fois, on divise par \(r!\) (échanger ces lettres ne change pas le mot).`, r`Note \(n\) le nombre d’élèves de la classe.`, r`Question 5 : on range \(n + 2\) passages, dont deux paires identiques.`],
    solution: [{ t: 'Correction', html: ol([
        r`« voiture » a 7 lettres distinctes : \(7! = 5\,040\) anagrammes.`,
        r`« saperlipopette » a 14 lettres : p trois fois, e trois fois, t deux fois, et s, a, r, l, i, o une fois. \(\dfrac{14!}{3!\,3!\,2!} = 1\,210\,809\,600\).`,
        r`Avec \(n\) élèves (\(n \ge 5\)) : une liste ordonnée de 5 élèves distincts, \(A_n^5 = \dfrac{n!}{(n - 5)!} = n(n - 1)(n - 2)(n - 3)(n - 4)\).`,
        r`Tous les élèves dans un ordre : \(n!\).`,
        r`\(n + 2\) passages, dont deux élèves présents deux fois : \(\dfrac{(n + 2)!}{2!\,2!} = \dfrac{(n + 2)!}{4}\).`]) +
      model(p(r`On range les 14 lettres de « saperlipopette » : \(14!\) façons si on distinguait toutes les lettres. Permuter les trois p, les trois e ou les deux t ne change pas le mot : chaque anagramme est comptée \(3! \times 3! \times 2!\) fois.`) + p(r`Il y a donc \(\dfrac{14!}{3!\,3!\,2!}\) anagrammes.`)) }],
    answer: p(r`\(7!\) ; \(\frac{14!}{3!3!2!}\) ; \(A_n^5\) ; \(n!\) ; \(\frac{(n + 2)!}{2!2!}\) (\(n\) élèves).`),
    traps: [r`Oublier une lettre répétée (le t de « saperlipopette ») ou mal compter les lettres.`, r`Utiliser \(\binom{n}{5}\) à la question 3 : l’ordre de passage compte.`],
    note: NOTE_TD1, near: ['p2019-ex5']
  });

  add({
    id: 'td1-2-9', ecue: 'dp', order: 2209, src: 'TD 1 · Ex 2.9',
    title: 'Composer une équipe de foot', topics: ['denombrement'], lvl: 2, time: 15,
    intro: p('On cherche à sélectionner une équipe de foot : il y a 11 postes à pourvoir (gardien de but, arrière droit, avant-centre, etc.), donc 11 joueurs à sélectionner. Pour cela, on dispose d’un effectif de 24 joueurs disponibles.') + p('Donner le nombre de sélections possibles dans les cas suivants :'),
    questions: ['Tous les joueurs peuvent jouer à tous les postes et la sélection spécifie uniquement qui sont les 11 joueurs sur le terrain, peu importe le poste que chacun occupe.', 'Tous les joueurs peuvent jouer à tous les postes. La sélection spécifie non seulement qui joue, mais aussi le poste de chacun.',
      'Reprendre les deux questions précédentes si, parmi les 24 joueurs, 3 peuvent jouer uniquement gardien de but, les autres pouvant occuper tous les postes sauf gardien de but.'],
    hints: [r`Sans poste : un ensemble de 11 joueurs. Avec postes : on attribue chaque poste, dans un ordre fixé.`, r`Question 3 : il faut exactement un gardien parmi 3, et 10 joueurs de champ parmi 21.`],
    solution: [{ t: 'Correction', html: ol([
        r`On choisit une partie de 11 joueurs parmi 24 : \(\binom{24}{11} = 2\,496\,144\).`,
        r`On remplit les 11 postes dans l’ordre : \(24 \times 23 \times \dots \times 14 = A_{24}^{11} = \dfrac{24!}{13!} = 99\,638\,080\,819\,200\).`,
        r`Il y a un seul poste de gardien, donc exactement un des 3 gardiens joue. Sans poste : \(3 \times \binom{21}{10} = 3 \times 352\,716 = 1\,058\,148\). Avec postes : 3 choix pour le but, puis les 10 autres postes parmi 21 joueurs dans l’ordre : \(3 \times A_{21}^{10} = 3\,839\,807\,462\,400\).`]) +
      model(p(r`Le gardien est l’un des 3 gardiens : 3 choix. Les 10 autres joueurs forment une partie de 10 joueurs parmi les 21 joueurs de champ : \(\binom{21}{10}\) choix. Il y a \(3 \times \binom{21}{10}\) sélections.`)) }],
    answer: p(r`\(\binom{24}{11}\) ; \(A_{24}^{11}\) ; \(3\binom{21}{10}\) et \(3A_{21}^{10}\).`),
    traps: [r`Oublier le cas « avec postes » à la question 3.`, r`Choisir 11 joueurs parmi 21 en question 3 : le gardien n’est pas parmi les 21.`],
    note: NOTE_TD1, near: ['p2023-dp-ex2']
  });

  add({
    id: 'td1-2-10', ecue: 'dp', order: 2210, src: 'TD 1 · Ex 2.10',
    title: 'Le bureau d’une association, avec parité', topics: ['denombrement'], lvl: 2, time: 15,
    intro: p('Une association comporte 100 adhérents. On propose de créer un bureau parmi les adhérents, composé de :') + ul(['Un président', 'Un trésorier', 'Huit autres membres']) + p('Personne ne peut occuper simultanément deux postes dans le bureau.'),
    questions: ['Quel est le nombre de bureaux possibles ?', 'Même question si on demande une parité homme/femme. On suppose que les 100 adhérents sont 50 femmes et 50 hommes. S’il y a un président on veut une trésorière et inversement. Les huit autres membres doivent être 4 femmes et 4 hommes.'],
    hints: [r`Président et trésorier : deux postes distincts, l’ordre compte. Les huit autres : un groupe sans ordre.`, r`Question 2 : choisis d’abord le président (100 choix), puis le trésorier dans l’autre sexe (50 choix). Il reste 49 femmes et 49 hommes.`],
    solution: [{ t: 'Correction', html: model(p(r`1. Président : 100 choix ; trésorier : 99 choix ; puis une partie de 8 membres parmi les 98 restants : \(\binom{98}{8}\) choix. Il y a \(100 \times 99 \times \binom{98}{8}\) bureaux.`) +
        p(r`2. Président : 100 choix ; trésorier, du sexe opposé : 50 choix. Il reste 49 femmes et 49 hommes : \(\binom{49}{4}\) choix pour les 4 femmes et \(\binom{49}{4}\) pour les 4 hommes. Il y a \(100 \times 50 \times \binom{49}{4}^2\) bureaux.`)) +
      p(r`Valeurs : \(\binom{98}{8} = 157\,366\,449\,604\) et \(\binom{49}{4} = 211\,876\). On peut aussi écrire \(100 \times 50 = 2 \times 50 \times 50\) : 2 choix pour le sexe du président, puis 50 et 50.`) }],
    answer: p(r`\(100 \times 99 \times \binom{98}{8}\) ; \(2 \times 50 \times 50 \times \binom{49}{4}^2\).`),
    traps: [r`Compter deux fois le choix du sexe : \(100\) présidents possibles inclut déjà les deux cas. \(2 \times 100 \times 50 \times \dots\) est deux fois trop grand.`, r`Écrire \(\frac{98!}{98!\,8!}\) : c’est \(\frac{98!}{8!\,90!}\).`, r`Choisir les 8 membres dans l’ordre (\(A_{98}^{8}\)) : ils ont tous le même rôle.`],
    note: NOTE_TD1, near: ['p2022-ex4']
  });

  add({
    id: 'td1-2-11', ecue: 'dp', order: 2211, src: 'TD 1 · Ex 2.11 (examen 2025)',
    title: 'Les mots réponses d’un QCM', topics: ['denombrement'], lvl: 2, time: 20,
    intro: p(r`(Extrait de l’examen 2025) Un QCM comporte 5 questions. Pour chacune des 5 questions, il y a 6 propositions de réponses : \(A\), \(B\), \(C\), \(D\), \(E\) ou \(F\). Pour chaque question, il n’y a qu’une seule réponse correcte.`) +
      p(r`On suppose qu’un candidat passant ce qcm répond à toutes les questions posées en écrivant un « mot réponse » de 5 lettres prises parmi \(A\), \(B\), \(C\), \(D\), \(E\) et \(F\).`) +
      p(r`Par exemple, le mot réponse « BBADC » signifie que le candidat a répondu \(B\) aux questions 1 et 2, \(A\) à la question 3, \(D\) à la question 4 et \(C\) à la question 5.`) + p('Sauf mention contraire dans la question, le mot réponse peut avoir plusieurs fois la même lettre.'),
    questions: ['Combien y a-t-il de mots réponses possibles ? Justifier brièvement.', 'Combien y a-t-il de mots réponses n’ayant que des lettres distinctes ? Justifier brièvement.', 'Combien de mots réponses possibles ne contenant qu’une seule réponse correcte y a-t-il ? Justifier brièvement.',
      'Combien de mots réponses avec au moins une réponse correcte y a-t-il ? Justifier brièvement.', r`Combien de mots réponses commençant par \(E\), sans \(A\) et composés de lettres distinctes y a t-il ? Justifier brièvement. <b><em>Faire le calcul jusqu’au bout.</em></b>`,
      r`Il y a eu des fuites. On sait que le mot réponse contient un \(B\), deux \(C\) et deux \(D\). Combien y a-t-il de mots réponses possibles ? Justifier brièvement. <b><em>Faire le calcul jusqu’au bout.</em></b>`],
    hints: [r`Lettres distinctes : 6 choix, puis 5, 4, 3, 2.`, r`« Une seule correcte » : choisis la question juste (5 choix), puis une mauvaise réponse à chacune des 4 autres (5 choix chacune).`, r`« Au moins une » : total moins « aucune correcte ».`],
    solution: [{ t: 'Correction', html: ol([
        r`Un mot est une 5-liste de \(\{A, \dots, F\}\) : \(6^5 = 7\,776\).`,
        r`Lettres distinctes : un arrangement de 5 lettres parmi 6, \(A_6^5 = 6 \times 5 \times 4 \times 3 \times 2 = 720\).`,
        r`On choisit la question bien répondue (5 choix) ; elle a une seule bonne lettre ; chacune des 4 autres a 5 mauvaises lettres possibles : \(5 \times 5^4 = 3\,125\).`,
        r`Aucune correcte : 5 mauvaises lettres à chaque question, \(5^5 = 3\,125\). Au moins une : \(6^5 - 5^5 = 7\,776 - 3\,125 = 4\,651\).`,
        r`Première lettre E ; les 4 suivantes, distinctes, sans A ni E, parmi \(\{B, C, D, F\}\) : \(4! = 24\).`,
        r`On range B, C, C, D, D : \(\dfrac{5!}{1!\,2!\,2!} = \dfrac{120}{4} = 30\).`]) +
      model(p(r`4. On passe par le complémentaire. Un mot sans aucune bonne réponse a, à chaque question, l’une des 5 mauvaises lettres : il y en a \(5^5\).`) + p(r`Le nombre de mots avec au moins une bonne réponse est donc \(6^5 - 5^5 = 7\,776 - 3\,125 = 4\,651\).`)) }],
    answer: p('7 776 ; 720 ; 3 125 ; 4 651 ; 24 ; 30.'),
    traps: [r`Répondre \(5! = 120\) à la question 2 : il y a 6 lettres pour 5 places, c’est \(A_6^5 = 720\).`, r`« Au moins une correcte » par \(5 \times 6^4\) : on compte plusieurs fois les mots qui ont plusieurs bonnes réponses.`, r`Question 6 : \(5!\) sans diviser par les répétitions des C et des D.`],
    note: NOTE_TD1, near: ['p2024-dp-ex2']
  });

  add({
    id: 'td1-2-12', ecue: 'dp', order: 2212, src: 'TD 1 · Ex 2.12',
    title: 'Inventer un problème pour une formule', topics: ['denombrement', 'binomial'], lvl: 2, time: 15,
    intro: p(r`On note \(k\) et \(n\) deux entiers naturels non nuls. Proposer des problèmes de dénombrement dont la réponse est donnée par les éléments listés ci-dessous.`) +
      ul([r`\(2^n\)`, r`\(\displaystyle\sum_{k=0}^{n} \binom{n}{k}\)`, r`\(k.(n!)\)`]) + note(r`\(\binom{n}{k}\) se note aussi \(C_n^k\) (et pas \(C_k^n\)). Il faut absolument connaître les deux notations.`),
    hints: [r`\(2^n\) : \(n\) choix successifs entre deux possibilités.`, r`\(\sum_k \binom{n}{k}\) : on additionne des cas disjoints selon un nombre \(k\).`, r`\(k \times n!\) : un choix parmi \(k\), puis un ordre sur \(n\) objets.`],
    solution: [{ t: 'Des exemples (d’autres conviennent)', html: ul([
        r`\(2^n\) : le nombre de mots binaires de longueur \(n\) ; le nombre de résultats de \(n\) lancers de pièce ; le nombre de parties d’un ensemble à \(n\) éléments.`,
        r`\(\sum_{k=0}^{n} \binom{n}{k}\) : le nombre de comités (de taille quelconque, éventuellement vide) qu’on peut former dans une classe de \(n\) élèves, classés selon leur taille \(k\). C’est encore \(2^n\).`,
        r`\(k \times n!\) : \(n\) coureurs franchissent la ligne dans un ordre (\(n!\)), et l’organisateur tire au sort une couleur de médaille parmi \(k\) ; ou : on choisit un livre parmi \(k\), puis on range \(n\) élèves en file.`]) +
      model(p(r`Une classe compte \(n\) élèves. On forme un comité, de taille quelconque. Les comités à \(k\) membres sont au nombre de \(\binom{n}{k}\) ; en les classant selon \(k \in \ent{0}{n}\), on obtient \(\sum_{k=0}^{n} \binom{n}{k}\) comités.`)) }],
    answer: p('Par exemple : mots binaires de longueur \\(n\\) ; comités de taille quelconque ; un ordre sur \\(n\\) objets et un choix parmi \\(k\\).'),
    traps: [r`Proposer une situation dont la réponse est \(n^2\) pour \(2^n\) : il faut \(n\) choix binaires, pas 2 choix parmi \(n\).`],
    note: NOTE_TD1, near: ['p2024-dp-ex1']
  });

  add({
    id: 'td1-3-13', ecue: 'dp', order: 2313, src: 'TD 1 · Ex 3.13',
    title: 'Ranger des livres groupés par matière', topics: ['denombrement'], lvl: 1, time: 5,
    intro: p('L’étagère spéciale révisions d’urgence d’un étudiant de l’EPITA contient 4 livres d’algo, 6 livres de maths et 3 livres de physique. Calculer le nombre d’ordres différents dans lesquels ils peuvent être rangés, sachant qu’ils sont groupés par matière.'),
    hints: [r`D’abord l’ordre des trois blocs, puis l’ordre des livres dans chaque bloc.`],
    solution: [{ t: 'Correction', html: model(p(r`On choisit l’ordre des trois matières : \(3!\) façons. Dans chaque bloc, on range les livres : \(4!\) pour l’algo, \(6!\) pour les maths, \(3!\) pour la physique.`) + p(r`Il y a \(3! \times 4! \times 6! \times 3! = 6 \times 24 \times 720 \times 6 = 622\,080\) rangements.`)) }],
    answer: p(r`\(3! \times 4! \times 6! \times 3! = 622\,080\).`),
    traps: [r`Oublier le facteur \(3!\) de l’ordre des matières.`],
    note: NOTE_TD1, near: ['p2023-dp-ex2']
  });

  add({
    id: 'td1-3-14', ecue: 'dp', order: 2314, src: 'TD 1 · Ex 3.14',
    title: 'Symétrie et formule de Pascal', topics: ['binomial'], lvl: 2, time: 25,
    intro: p(r`Soient \(n \in \N^*\) et \(k \in \ent{0}{n}\).`),
    questions: [r`Comparer le nombre de façons de choisir \(k\) éléments dans un ensemble à \(n\) éléments et le nombre de façons de choisir \(n - k\) éléments dans un ensemble à \(n\) éléments. Qu’en pensez-vous ?`,
      r`Dans une urne, il y a \(n\) boules numérotées de 1 à \(n\). On tire simultanément \(k\) boules.<br>(a) Quel est le nombre de tirages possibles ?<br>(b) Quel est le nombre de tirages possibles contenant la boule numérotée 1 ?<br>(c) Quel est le nombre de tirages possibles ne contenant pas la boule numérotée 1 ?<br>(d) En déduire une relation entre \(\binom{n}{k}\), \(\binom{n-1}{k}\) et \(\binom{n-1}{k-1}\).<br>(e) Redémontrer cette relation par le calcul. Expliquer comment s’en servir pour calculer les coefficients binomiaux.`],
    hints: [r`Choisir les \(k\) éléments qu’on prend revient à choisir les \(n - k\) qu’on laisse.`, r`Si la boule 1 est tirée, il reste \(k - 1\) boules à choisir parmi \(n - 1\).`, r`Pour (e), mets au même dénominateur \(k!(n - k)!\).`],
    solution: [
      { t: 'Question 1 : symétrie', html: p(r`L’application \(A \mapsto \overline{A}\) (complémentaire) associe à chaque partie à \(k\) éléments une partie à \(n - k\) éléments, et c’est une bijection (elle est sa propre réciproque). Donc \(\binom{n}{k} = \binom{n}{n - k}\). Par le calcul : \(\binom{n}{n - k} = \frac{n!}{(n - k)!\,k!} = \binom{n}{k}\).`) },
      { t: 'Question 2 : Pascal par les tirages', html: model(p(r`(a) Un tirage est une partie à \(k\) éléments de \(\ent{1}{n}\) : \(\binom{n}{k}\) tirages.`) +
        p(r`(b) Pour les tirages qui contiennent la boule 1 (\(k \ge 1\)), il reste à choisir \(k - 1\) boules parmi les \(n - 1\) autres : \(\binom{n-1}{k-1}\).`) +
        p(r`(c) Ceux qui ne la contiennent pas : \(k\) boules parmi les \(n - 1\) autres, \(\binom{n-1}{k}\).`) +
        p(r`(d) Ces deux cas sont disjoints et couvrent tous les tirages, donc \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\) (pour \(1 \le k \le n - 1\), et aussi \(k = n\) avec \(\binom{n-1}{n} = 0\)).`)) },
      { t: '(e) Par le calcul', html: fm(r`\binom{n-1}{k-1} + \binom{n-1}{k} = \frac{(n-1)!}{(k-1)!\,(n-k)!} + \frac{(n-1)!}{k!\,(n-1-k)!} = \frac{(n-1)!\,k}{k!\,(n-k)!} + \frac{(n-1)!\,(n-k)}{k!\,(n-k)!} = \frac{(n-1)!\,(k + n - k)}{k!\,(n-k)!} = \frac{n!}{k!\,(n-k)!}`) +
        p(r`On calcule les coefficients ligne par ligne (triangle de Pascal) : chaque nombre est la somme des deux nombres au-dessus de lui.`) +
        tbl(['n \\ k', '0', '1', '2', '3', '4', '5'], [['0', '1', '', '', '', '', ''], ['1', '1', '1', '', '', '', ''], ['2', '1', '2', '1', '', '', ''], ['3', '1', '3', '3', '1', '', ''], ['4', '1', '4', '6', '4', '1', ''], ['5', '1', '5', '10', '10', '5', '1']], { th: true, w: 22 }) }],
    answer: p(r`\(\binom{n}{k} = \binom{n}{n-k}\) ; \(\binom{n}{k}\), \(\binom{n-1}{k-1}\), \(\binom{n-1}{k}\) ; Pascal \(\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}\).`),
    traps: [r`Ne pas dire que les deux cas (avec ou sans la boule 1) sont disjoints : c’est ce qui permet d’additionner.`, r`Appliquer Pascal pour \(k = 0\) : \(\binom{n-1}{-1}\) n’est pas défini (il faut \(k \ge 1\), ou la convention \(\binom{n-1}{-1} = 0\)).`],
    note: NOTE_TD1, near: ['p2021-ex5']
  });

  add({
    id: 'td1-3-15', ecue: 'dp', order: 2315, src: 'TD 1 · Ex 3.15',
    title: 'La formule du binôme', topics: ['binomial'], lvl: 2, time: 25,
    questions: [r`Soit \((x, y) \in \R^2\). Proposer au moins deux manières de justifier la relation (appelée formule du binôme ou formule de Newton)` + fm(r`\forall n \in \N,\ (x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}.`) + 'Formaliser l’un au moins de vos arguments.',
      r`En utilisant la formule du binôme de Newton ci-dessus et le triangle de Pascal, écrire la forme développée de :` + fm(r`A = (x + y)^4 \qquad \text{et} \qquad B = (a - b)^5`),
      'Expliquer comment cette formule permet de démontrer par le calcul une égalité observée dans l’exercice 2-12.'],
    hints: [r`Idée combinatoire : en développant \((x + y)(x + y)\cdots(x + y)\), on choisit dans chaque facteur \(x\) ou \(y\) ; combien de façons d’obtenir \(x^k y^{n-k}\) ?`, r`Idée par récurrence : \((x + y)^{n+1} = (x + y)(x + y)^n\), puis la formule de Pascal.`, r`\(B = (a + (-b))^5\) : les signes alternent.`],
    solution: [
      { t: 'Question 1 : deux justifications', html: p(r`<b>Combinatoire.</b> \((x + y)^n\) est un produit de \(n\) facteurs \((x + y)\). En développant, chaque terme provient du choix de \(x\) ou de \(y\) dans chaque facteur. On obtient \(x^k y^{n-k}\) en choisissant les \(k\) facteurs qui donnent \(x\) : \(\binom{n}{k}\) façons.`) +
        model(p(r`<b>Par récurrence.</b> \(\mathcal{P}(n)\) : « \((x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}\) ». \(\mathcal{P}(0)\) : \(1 = \binom{0}{0}\).`) +
          p(r`Supposons \(\mathcal{P}(n)\). Alors \((x + y)^{n+1} = \sum_{k=0}^{n} \binom{n}{k} x^{k+1} y^{n-k} + \sum_{k=0}^{n} \binom{n}{k} x^k y^{n+1-k}\). Dans la première somme on pose \(j = k + 1\) :`) +
          fm(r`(x + y)^{n+1} = \sum_{j=1}^{n+1} \binom{n}{j-1} x^j y^{n+1-j} + \sum_{j=0}^{n} \binom{n}{j} x^j y^{n+1-j} = x^{n+1} + \sum_{j=1}^{n} \left[\binom{n}{j-1} + \binom{n}{j}\right] x^j y^{n+1-j} + y^{n+1}`) +
          p(r`Par Pascal, le crochet vaut \(\binom{n+1}{j}\), et \(x^{n+1}\), \(y^{n+1}\) sont les termes \(j = n + 1\) et \(j = 0\) : c’est \(\mathcal{P}(n + 1)\). Par récurrence, la formule est vraie pour tout \(n\).`)) },
      { t: 'Questions 2 et 3', html: p(r`Lignes 4 et 5 du triangle : 1 4 6 4 1 et 1 5 10 10 5 1.`) +
        fm(r`A = x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4`) + fm(r`B = a^5 - 5a^4b + 10a^3b^2 - 10a^2b^3 + 5ab^4 - b^5`) +
        p(r`3. Avec \(x = y = 1\) : \(\sum_{k=0}^{n} \binom{n}{k} = (1 + 1)^n = 2^n\). Les deux premiers problèmes de l’exercice 2-12 ont bien la même réponse.`) }],
    answer: p(r`\(A = x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4\) ; \(B = a^5 - 5a^4b + 10a^3b^2 - 10a^2b^3 + 5ab^4 - b^5\) ; \(\sum_k \binom{n}{k} = 2^n\).`),
    traps: [r`Oublier l’alternance des signes dans \(B\) : \((-b)^k\) est négatif pour \(k\) impair.`, r`Initialiser la récurrence en \(n = 1\) alors que l’énoncé dit \(n \in \N\).`],
    note: NOTE_TD1, near: ['p2022-ex8']
  });

  add({
    id: 'td1-3-16', ecue: 'dp', order: 2316, src: 'TD 1 · Ex 3.16',
    title: 'Calculer Σ 2ᵏ C(n, k)', topics: ['binomial'], lvl: 2, time: 10,
    intro: p(r`On considère la somme \(\displaystyle\sum_{k=0}^{n} 2^k \binom{n}{k}\).`),
    questions: ['Calculer la somme ci-dessus.', 'Trouver un problème dont la réponse est donnée par la somme précédente.'],
    hints: [r`Reconnais la formule du binôme avec \(x = 2\) et \(y = 1\).`, r`\(3^n\) : \(n\) personnes qui choisissent chacune parmi 3 options.`],
    solution: [{ t: 'Correction', html: model(p(r`Par la formule du binôme avec \(x = 2\) et \(y = 1\) : \(\sum_{k=0}^{n} \binom{n}{k} 2^k 1^{n-k} = (2 + 1)^n = 3^n\).`)) +
      p(r`Un problème : \(n\) élèves choisissent chacun une option parmi trois (A, B, C). Il y a \(3^n\) répartitions. En les classant selon le nombre \(k\) d’élèves qui ne prennent pas C : on choisit ces \(k\) élèves (\(\binom{n}{k}\)), puis chacun choisit A ou B (\(2^k\)). On retrouve \(\sum_k 2^k \binom{n}{k}\).`) }],
    answer: p(r`\(\sum_{k=0}^{n} 2^k \binom{n}{k} = 3^n\).`),
    traps: [r`Mal placer les exposants : \(x^k y^{n-k}\) avec \(x = 2\), \(y = 1\).`],
    note: NOTE_TD1, near: ['p2022-ex8']
  });

  add({
    id: 'td1-3-17', ecue: 'dp', order: 2317, src: 'TD 1 · Ex 3.17',
    title: 'Le code d’un cadenas', topics: ['denombrement'], lvl: 1, time: 15,
    intro: p('Un candidat du concours Advance est arrivé à l’école en vélo avec un cadenas possédant un code à 4 chiffres (0 à 9). L’examinateur de maths lui demande alors de :'),
    questions: ['a. Déterminer le nombre de codes possibles.<br>b. Déterminer le nombre de codes possibles se terminant par un chiffre pair.<br>c. Déterminer le nombre de codes possibles contenant au moins une fois le chiffre 2.',
      'On suppose à présent que le code comporte 4 chiffres distincts.<br>a. Déterminer le nombre de codes possibles.<br>b. Déterminer le nombre de codes possibles se terminant par un chiffre pair.<br>c. Déterminer le nombre de codes possibles comportant le chiffre 2.'],
    hints: [r`Un code est une 4-liste de chiffres ; un 0 en tête est permis.`, r`« Au moins une fois le 2 » : total moins « sans 2 ».`, r`Chiffres distincts et dernier pair : choisis d’abord le dernier chiffre.`],
    solution: [{ t: 'Correction', html: ol([r`a. \(10^4 = 10\,000\). b. 5 choix pour le dernier chiffre, 10 pour les autres : \(10^3 \times 5 = 5\,000\). c. Sans 2 : \(9^4 = 6\,561\) ; donc \(10\,000 - 6\,561 = 3\,439\).`,
        r`a. \(A_{10}^4 = 10 \times 9 \times 8 \times 7 = 5\,040\). b. Dernier chiffre pair : 5 choix ; les trois premiers, distincts, parmi les 9 chiffres restants : \(A_9^3 = 504\) ; \(5 \times 504 = 2\,520\). c. Sans 2 : \(A_9^4 = 3\,024\) ; avec un 2 : \(5\,040 - 3\,024 = 2\,016\) (ou : 4 places pour le 2, puis \(A_9^3\) : \(4 \times 504\)).`]) +
      model(p(r`2.b. On choisit d’abord le dernier chiffre, pair : 5 choix. Les trois premiers chiffres sont distincts entre eux et du dernier : on les prend dans l’ordre parmi les 9 chiffres restants, \(9 \times 8 \times 7 = 504\) choix.`) + p(r`Il y a \(5 \times 504 = 2\,520\) codes.`)) }],
    answer: p('10 000 ; 5 000 ; 3 439 ; 5 040 ; 2 520 ; 2 016.'),
    traps: [r`Compter « au moins un 2 » par \(4 \times 10^3\) : les codes avec plusieurs 2 sont comptés plusieurs fois.`, r`Interdire le 0 en tête : un code de cadenas n’est pas un nombre, 0123 est permis.`],
    note: NOTE_TD1, near: ['p2024-dp-ex2']
  });

  add({
    id: 'td1-3-18', ecue: 'dp', order: 2318, src: 'TD 1 · Ex 3.18',
    title: 'Pierre, Marie et le groupe de responsables', topics: ['denombrement'], lvl: 2, time: 20,
    intro: p('<b>Travail personnel obligatoire</b> : Pierre et Marie sont dans une classe de 20 élèves. Dans cette classe, il y a 12 garçons et 8 filles.') +
      p('Les élèves de la classe doivent partir en week-end d’intégration. Pour cela, ils doivent créer un groupe de quatre responsables : un chef, un sous-chef et deux assistants (ces deux-là peuvent assister aussi bien le chef que le sous-chef). Personne ne peut occuper simultanément deux postes dans ce groupe.'),
    questions: ['Combien y a-t-il de groupes de responsables possibles ? Justifier brièvement.', 'On veut que le chef soit une fille, le sous-chef un garçon et parmi les deux assistants, on veut une fille et un garçon. Combien y a-t-il de groupes de responsables possibles dans ce cas là ? Justifier brièvement.',
      'C’est décidé : Marie sera la chef du groupe. Combien y a-t-il de groupes de responsables possibles dans ce cas là ? Justifier brièvement.', '« Si Marie est la chef alors je veux aussi faire parti du groupe des responsables ! » dit Pierre. Combien y a-t-il de groupes de responsables possibles dans ce cas là ? Justifier brièvement.'],
    hints: [r`Chef et sous-chef : postes distincts (ordre). Les deux assistants : une paire sans ordre, \(\binom{\cdot}{2}\).`, r`Question 4 : Marie est chef (question 3), et Pierre est soit sous-chef, soit assistant. Deux cas disjoints.`],
    solution: [{ t: 'Correction', html: ol([
        r`Chef : 20 choix ; sous-chef : 19 ; assistants : une paire parmi les 18 autres, \(\binom{18}{2} = 153\). Total : \(20 \times 19 \times 153 = 58\,140\).`,
        r`Chef fille : 8 ; sous-chef garçon : 12 ; assistante parmi les 7 filles restantes, assistant parmi les 11 garçons restants : \(8 \times 12 \times 7 \times 11 = 7\,392\).`,
        r`Marie est chef : sous-chef parmi 19, assistants parmi 18 : \(19 \times \binom{18}{2} = 2\,907\).`,
        r`Marie est chef et Pierre fait partie du groupe. Soit Pierre est sous-chef : les assistants sont une paire parmi 18, \(\binom{18}{2} = 153\). Soit Pierre est assistant : sous-chef parmi 18, l’autre assistant parmi 17, \(18 \times 17 = 306\). Au total \(153 + 306 = 459\).`]) +
      model(p(r`4. On suppose Marie chef (question 3) et Pierre dans le groupe. Deux cas disjoints :`) + p(r`– Pierre est sous-chef : on choisit les deux assistants parmi les 18 autres élèves, \(\binom{18}{2} = 153\) groupes ;`) +
        p(r`– Pierre est assistant : on choisit le sous-chef parmi 18 élèves, puis le second assistant parmi 17 : \(18 \times 17 = 306\) groupes.`) + p('Au total, 459 groupes.')) +
      note(r`Lu comme une implication logique (« Marie chef \(\implies\) Pierre dans le groupe »), on compterait aussi tous les groupes où Marie n’est pas chef : \(58\,140 - 18 \times \binom{17}{2} = 55\,692\). Le contexte (question 3, et le corrigé de l’examen 2022 où l’exercice est tombé) donne 459. Écris l’interprétation choisie.`) }],
    answer: p(r`\(20 \times 19 \times \binom{18}{2} = 58\,140\) ; \(8 \times 12 \times 7 \times 11 = 7\,392\) ; \(19 \times \binom{18}{2} = 2\,907\) ; \(\binom{18}{2} + 18 \times 17 = 459\).`),
    traps: [r`Ordonner les assistants (\(18 \times 17\) au lieu de \(\binom{18}{2}\)) : ils ont le même rôle.`, r`Question 4 : ajouter des groupes où Marie n’est pas chef (\(19 \times 19\)…) : on reste dans la situation « Marie chef ».`],
    note: NOTE_TD1, near: ['p2022-ex4']
  });

  add({
    id: 'td1-4-19', ecue: 'dp', order: 2419, src: 'TD 1 · Ex 4.19',
    title: 'Nombre de chiffres en base b', topics: ['denombrement'], lvl: 2, time: 20,
    intro: p(r`Soit \(x \in \N\) et soit \(b\) un entier strictement plus grand que 1. On note \([x]_b\) la représentation en base \(b\) de l’entier \(x\). On rappelle que la représentation en base \(b\) de \(x\) correspond à l’écriture (avec les abus de notation d’usage) \([x]_b = d_{k-1} d_{k-2} \cdots d_0\) où`) +
      ul([r`pour tout \(i \in \ent{0}{k-1}\) on a \(0 \le d_i < b\) et \(d_{k-1} \neq 0\) ;`, r`\(x = \displaystyle\sum_{i=0}^{k-1} d_i b^i\).`]),
    questions: ['Décomposer 173 en base 10 puis en base 2 en utilisant la formule ci-dessus.', r`On s’intéresse en un premier temps au cas \(b = 2\). On note \(k\) le nombre de chiffres dans l’écriture de \(x\) en binaire (en base 2).<br>– Encadrer \(x\) entre deux puissances de 2 successives.<br>– En déduire une expression de \(k\) en fonction de \(x\).`, 'Généraliser le résultat précédent à toute base \\(b\\).'],
    hints: [r`\(173 = 128 + 32 + 8 + 4 + 1\).`, r`Minore \(x\) par son premier terme \(d_{k-1} 2^{k-1}\), majore chaque chiffre par 1.`, r`\(2^{k-1} \le x < 2^k \iff k - 1 \le \log_2 x < k\).`],
    solution: [{ t: 'Correction', html: p(r`1. \(173 = 1 \times 10^2 + 7 \times 10^1 + 3 \times 10^0\) et \(173 = 2^7 + 2^5 + 2^3 + 2^2 + 2^0\), donc \([173]_2 = 10101101\) (8 chiffres).`) +
      model(p(r`2. Soit \(x \ge 1\) à \(k\) chiffres binaires. D’une part \(x \ge d_{k-1} 2^{k-1} = 2^{k-1}\) (\(d_{k-1} = 1\)). D’autre part \(x \le \sum_{i=0}^{k-1} 2^i = 2^k - 1 < 2^k\).`) +
        p(r`Donc \(2^{k-1} \le x < 2^k\). Comme \(\log_2\) est strictement croissante : \(k - 1 \le \log_2 x < k\), donc \(k - 1 = \lfloor \log_2 x \rfloor\) et \(k = \lfloor \log_2 x \rfloor + 1\).`)) +
      p(r`3. De même \(b^{k-1} \le x \le \sum_{i=0}^{k-1} (b - 1) b^i = b^k - 1 < b^k\), donc \(k = \lfloor \log_b x \rfloor + 1 = \left\lfloor \frac{\ln x}{\ln b} \right\rfloor + 1\). (Pour \(x = 0\), on écrit « 0 » : un chiffre.)`) +
      p(r`Exemple : \(\log_2 173 \approx 7{,}43\), d’où \(k = 8\).`) }],
    answer: p(r`\([173]_2 = 10101101\) ; \(2^{k-1} \le x < 2^k\), \(k = \lfloor \log_2 x \rfloor + 1\) ; en base \(b\) : \(k = \lfloor \log_b x \rfloor + 1\).`),
    traps: [r`Écrire \(x \le 2^k\) (au lieu de \(x < 2^k\)) puis « \(\log_2 x = k - 1\) » : il faut l’encadrement strict et la partie entière.`],
    note: NOTE_TD1
  });

  add({
    id: 'td1-4-20', ecue: 'dp', order: 2420, src: 'TD 1 · Ex 4.20',
    title: 'Listes croissantes et strictement croissantes', topics: ['denombrement', 'binomial'], lvl: 2, time: 15,
    intro: p(r`<b>Travail personnel obligatoire</b> : étant donné un ensemble fini \(E\), une \(k\)-liste à valeurs dans \(E\) est un élément du produit cartésien \(E^k\). Si \(u \in E^k\) on note \(u[i]\) pour \(i \in \ent{1}{k}\) la \(i\)-ème entrée de \(u\).`) +
      p(r`On considère l’intervalle \(I = \ent{0}{4}\).`) +
      p(r`On dit qu’une \(k\)-liste \(u\) à valeurs dans \(I\) est croissante (resp. strictement croissante) si pour tout \(i \in \ent{1}{k-1}\), \(u[i] \le u[i + 1]\) (resp. \(u[i] < u[i + 1]\)). Combien y a-t-il de`),
    questions: ['2-listes strictement croissantes ? croissantes ?', '3-listes strictement croissantes ?', '5-listes strictement croissantes ?', '7-listes strictement croissantes ?'],
    hints: [r`Une liste strictement croissante est entièrement déterminée par l’ensemble de ses valeurs : combien de parties à \(k\) éléments dans \(I\) ?`, r`Une 2-liste croissante est strictement croissante, ou constante.`],
    solution: [{ t: 'Correction', html: model(p(r`Une \(k\)-liste strictement croissante à valeurs dans \(I\) correspond à une partie à \(k\) éléments de \(I\) (on range ses éléments dans l’ordre croissant), et réciproquement : il y en a \(\binom{5}{k}\).`)) +
      ul([r`2-listes strictement croissantes : \(\binom{5}{2} = 10\). Croissantes : les 10 précédentes et les 5 constantes, soit 15 (\(= \binom{6}{2}\)).`, r`3-listes strictement croissantes : \(\binom{5}{3} = 10\).`, r`5-listes strictement croissantes : \(\binom{5}{5} = 1\), la liste \((0, 1, 2, 3, 4)\).`, r`7-listes strictement croissantes : 0, il n’y a que 5 valeurs distinctes.`]) +
      p(r`En général, il y a \(\binom{5 + k - 1}{k}\) \(k\)-listes croissantes dans \(I\) (vérifié par énumération : 15, 35, 126, 330 pour \(k = 2, 3, 5, 7\)).`) }],
    answer: p('10 et 15 ; 10 ; 1 ; 0.'),
    traps: [r`Compter avec \(A_5^k\) : une fois les valeurs choisies, l’ordre est imposé (croissant).`],
    note: NOTE_TD1
  });

  /* =====================================================================================================
     TD 2 : probabilités finies (ECUE DP)
     ===================================================================================================== */
  add({
    id: 'td2-1-1', ecue: 'dp', order: 3101, src: 'TD 2 · Ex 1.1',
    title: 'Les propriétés d’une probabilité à partir des axiomes', topics: ['probabilites', 'demonstrations'], lvl: 2, time: 25,
    intro: p(r`Soient \(\Omega\) un ensemble et \(f : \mathcal{P}(\Omega) \longrightarrow \R\) vérifiant les 3 axiomes suivants :`) +
      p(r`(i) \(f(\Omega) = 1\)<br>(ii) \(\forall A \in \mathcal{P}(\Omega), \quad f(A) \ge 0\)<br>(iii) \(\forall (A, B) \in \mathcal{P}(\Omega)^2, \quad \text{si} \quad A \cap B = \varnothing \quad \text{alors} \quad f(A \sqcup B) = f(A) + f(B)\)`) +
      p('À l’aide de ces trois axiomes, justifiez les relations suivantes :'),
    questions: [r`\(f(\varnothing) = 0\) ;`, r`\(f(\overline{A}) = 1 - f(A)\) ;`, r`\(\forall A \in \mathcal{P}(\Omega), 0 \le f(A) \le 1\) ;`, r`Si \(A \subset B\), \(f(B \setminus A) = f(B) - f(A)\) et \(f(A) \le f(B)\) ;`,
      r`Pour tout \(A, B \in \mathcal{P}(\Omega)\), \(f(A \cup B) = f(A) + f(B) - f(A \cap B)\).<br>À votre avis, comment s’appelle l’espace \((\Omega, \mathcal{P}(\Omega), f)\) ? Comment \(f\) s’appelle-t-elle ?`],
    hints: [r`À chaque fois, écris un ensemble comme une union <b>disjointe</b>, puis applique (iii). Par exemple \(A = A \sqcup \varnothing\), \(\Omega = A \sqcup \overline{A}\).`, r`Pour 4 : \(B = A \sqcup (B \setminus A)\).`, r`Pour 5 : \(A \cup B = (A \setminus B) \sqcup B\) et \(A = (A \setminus B) \sqcup (A \cap B)\).`],
    solution: [
      { t: '1. f(∅) = 0', html: model(p(r`Soit \(A \in \mathcal{P}(\Omega)\). On a \(A \cap \varnothing = \varnothing\), donc par (iii) \(f(A \sqcup \varnothing) = f(A) + f(\varnothing)\). Or \(A \sqcup \varnothing = A\), d’où \(f(A) = f(A) + f(\varnothing)\) et \(f(\varnothing) = 0\).`)) },
      { t: '2. f(Ā) = 1 − f(A)', html: p(r`\(\Omega = A \sqcup \overline{A}\) (union disjointe), donc par (i) et (iii) : \(1 = f(\Omega) = f(A) + f(\overline{A})\), d’où \(f(\overline{A}) = 1 - f(A)\).`) },
      { t: '3. 0 ≤ f(A) ≤ 1', html: p(r`\(f(A) \ge 0\) par (ii). Et \(f(A) = 1 - f(\overline{A}) \le 1\) car \(f(\overline{A}) \ge 0\) par (ii).`) },
      { t: '4. Si A ⊂ B', html: p(r`Comme \(A \subset B\), \(B = A \sqcup (B \setminus A)\), donc \(f(B) = f(A) + f(B \setminus A)\) : \(f(B \setminus A) = f(B) - f(A)\). Et \(f(B \setminus A) \ge 0\) donne \(f(A) \le f(B)\).`) },
      { t: '5. Formule du crible ; le vocabulaire', html: p(r`\(A \cup B = (A \setminus B) \sqcup B\) donne \(f(A \cup B) = f(A \setminus B) + f(B)\) ; \(A = (A \setminus B) \sqcup (A \cap B)\) donne \(f(A \setminus B) = f(A) - f(A \cap B)\). D’où \(f(A \cup B) = f(A) + f(B) - f(A \cap B)\).`) +
        p(r`\((\Omega, \mathcal{P}(\Omega), f)\) est un <b>espace probabilisé</b> et \(f\) une <b>probabilité</b> (les axiomes (i) à (iii) sont ceux de Kolmogorov).`) }],
    answer: p(r`Chaque relation vient d’une union disjointe : \(A = A \sqcup \varnothing\), \(\Omega = A \sqcup \overline{A}\), \(B = A \sqcup (B \setminus A)\), \(A \cup B = (A \setminus B) \sqcup B\). Espace probabilisé, probabilité.`),
    traps: [r`Appliquer (iii) à deux ensembles sans vérifier (ni écrire) qu’ils sont disjoints.`, r`Utiliser une propriété avant de l’avoir démontrée (par exemple \(f \le 1\) pour prouver 2).`],
    note: NOTE_TD2, near: ['p2023-dp-ex1']
  });

  add({
    id: 'td2-1-2', ecue: 'dp', order: 3102, src: 'TD 2 · Ex 1.2',
    title: 'Décrire l’univers et la probabilité de chaque issue', topics: ['probabilites'], lvl: 1, time: 20,
    intro: p(r`Pour chaque expérience, décrire l’univers \(\Omega\) et calculer la probabilité de chaque issue possible.`),
    questions: ['le jet d’une pièce de monnaie', 'le lancer d’un dé à 6 faces', 'le lancer de deux dés à 6 faces de couleurs différentes', 'le tirage d’une boule dans une urne contenant 5 boules rouges et 6 boules blanches',
      'le tirage avec remise de trois boules dans une urne contenant 5 boules rouges et 6 boules blanches', 'le tirage simultané de trois boules dans une urne contenant 5 boules rouges et 6 boules blanches', 'le tirage successif et sans remise de trois boules dans une urne contenant 5 boules rouges et 6 boules blanches.'],
    hints: [r`Pour avoir des issues équiprobables, numérote les boules : \(R_1, \dots, R_5, B_1, \dots, B_6\).`, r`Avec remise : des triplets quelconques ; sans remise : des triplets de boules distinctes ; simultané : des parties à 3 éléments.`],
    solution: [{ t: 'Correction', html: tbl(['expérience', r`\(\Omega\)`, r`\(\card \Omega\)`, 'probabilité d’une issue'], [
        ['1', r`\(\{P, F\}\) (pile, face)`, '2', r`\(\frac{1}{2}\)`],
        ['2', r`\(\ent{1}{6}\)`, '6', r`\(\frac{1}{6}\)`],
        ['3', r`\(\ent{1}{6}^2\) (couples : dé rouge, dé bleu)`, '36', r`\(\frac{1}{36}\)`],
        ['4', r`\(U = \{R_1, \dots, R_5, B_1, \dots, B_6\}\)`, '11', r`\(\frac{1}{11}\)`],
        ['5', r`\(U^3\) (triplets)`, r`\(11^3 = 1\,331\)`, r`\(\frac{1}{1\,331}\)`],
        ['6', 'parties de \\(U\\) à 3 éléments', r`\(\binom{11}{3} = 165\)`, r`\(\frac{1}{165}\)`],
        ['7', 'triplets de boules distinctes', r`\(A_{11}^3 = 990\)`, r`\(\frac{1}{990}\)`]], { th: true }) +
      p(r`On peut aussi prendre \(\Omega = \{R, B\}\) pour l’expérience 4, mais alors les issues ne sont pas équiprobables : \(P(R) = \frac{5}{11}\), \(P(B) = \frac{6}{11}\). Numéroter les boules permet de rester dans l’équiprobabilité.`) }],
    answer: p(r`Issues équiprobables : \(\frac{1}{2}\), \(\frac{1}{6}\), \(\frac{1}{36}\), \(\frac{1}{11}\), \(\frac{1}{1\,331}\), \(\frac{1}{165}\), \(\frac{1}{990}\).`),
    traps: [r`Écrire \(\Omega = \{R, R, R, B, \dots\}\) : un ensemble ne répète pas ses éléments.`, r`Donner l’issue « 2 rouges et 1 blanche » comme une issue de probabilité \(\frac{1}{165}\) : c’est un événement qui contient plusieurs issues.`],
    note: NOTE_TD2, near: ['p2019-ex6']
  });

  add({
    id: 'td2-1-3', ecue: 'dp', order: 3103, src: 'TD 2 · Ex 1.3',
    title: 'Le paradoxe de Poincaré : 11/36 ou 6/21 ?', topics: ['probabilites'], lvl: 2, time: 10,
    intro: p(r`Au début des questionnements sur la manière de définir la théorie des probabilités, H. Poincaré a posé la question suivante : lors du jet de deux dés indiscernables on peut ou bien obtenir une probabilité de \(\frac{11}{36}\) ou de \(\frac{6}{21}\) pour l’événement « obtenir au moins un 6 » ! Expliquer les deux calculs de Poincaré. Lequel vous semble juste ?`),
    hints: [r`Calcul 1 : 36 couples. Calcul 2 : les résultats sans ordre \(\{i, j\}\) : combien y en a-t-il ?`, r`Les 21 résultats sans ordre sont-ils équiprobables ? Compare \(\{1, 2\}\) et \(\{6, 6\}\).`],
    solution: [{ t: 'Correction', html: p(r`<b>Calcul 1.</b> On distingue les dés (on peut les peindre) : \(\Omega = \ent{1}{6}^2\), 36 couples équiprobables. « Au moins un 6 » : \(36 - 25 = 11\) couples. Probabilité \(\frac{11}{36}\).`) +
      p(r`<b>Calcul 2.</b> On ne regarde que les résultats sans ordre : 15 paires \(\{i, j\}\) avec \(i \neq j\) et 6 doubles, soit 21 résultats, dont 6 contiennent un 6. Si on les croit équiprobables : \(\frac{6}{21} = \frac{2}{7}\).`) +
      model(p(r`Le calcul juste est le premier. Que les dés soient indiscernables ne change pas l’expérience : \(\{1, 2\}\) sort par les couples \((1, 2)\) et \((2, 1)\), avec probabilité \(\frac{2}{36}\), alors que \(\{6, 6\}\) sort avec probabilité \(\frac{1}{36}\). Les 21 résultats ne sont pas équiprobables, on ne peut pas faire « cas favorables sur cas possibles ».`) + p(r`\(P(\text{au moins un } 6) = \frac{11}{36}\).`)) }],
    answer: p(r`\(\frac{11}{36}\) : les 21 résultats sans ordre ne sont pas équiprobables.`),
    traps: [r`Appliquer « cas favorables / cas possibles » sur un univers dont les issues ne sont pas équiprobables.`],
    note: NOTE_TD2
  });

  add({
    id: 'td2-1-4', ecue: 'dp', order: 3104, src: 'TD 2 · Ex 1.4',
    title: 'Le problème des anniversaires', topics: ['probabilites', 'denombrement'], lvl: 2, time: 15,
    questions: [r`Dans une population de \(N > 1\) individus, à combien \(N\) doit-il être égal pour que l’on soit sûr qu’au moins deux personnes ont le même anniversaire ?`, r`Quelle est la probabilité qu’au moins deux personnes d’une population de \(N > 1\) individus aient leur anniversaire le même jour de l’année ?`],
    hints: [r`Principe des tiroirs : 365 jours possibles.`, r`Passe par le contraire : « toutes les dates sont distinctes ». On suppose les 365 jours équiprobables et les naissances indépendantes.`],
    solution: [{ t: 'Correction', html: p(r`1. Avec 365 jours (on oublie le 29 février), 365 personnes peuvent toutes avoir des dates différentes ; avec \(N = 366\), deux au moins partagent une date (principe des tiroirs). Il faut \(N \ge 366\) (367 si l’on compte le 29 février).`) +
      model(p(r`2. On modélise par \(\Omega = \ent{1}{365}^N\), muni de l’équiprobabilité : \(\card \Omega = 365^N\). L’événement contraire \(\overline{D}\) « toutes les dates sont distinctes » correspond aux \(N\)-listes sans répétition : \(\card \overline{D} = A_{365}^N\) (pour \(N \le 365\)).`) +
        p(r`Donc \(P(D) = 1 - \dfrac{A_{365}^N}{365^N} = 1 - \dfrac{365 \times 364 \times \dots \times (365 - N + 1)}{365^N}\), et \(P(D) = 1\) pour \(N \ge 366\).`)) +
      tbl([r`\(N\)`, '22', '23', '30', '50'], [[r`\(P(D)\)`, r`\(\approx 0{,}476\)`, r`\(\approx 0{,}507\)`, r`\(\approx 0{,}706\)`, r`\(\approx 0{,}970\)`]], { th: true, w: 24 }) +
      p(r`Dès 23 personnes, la probabilité dépasse \(\frac{1}{2}\) : c’est le « paradoxe des anniversaires ».`) }],
    answer: p(r`\(N = 366\) ; \(P = 1 - \frac{A_{365}^N}{365^N}\) (\(> \frac{1}{2}\) dès \(N = 23\)).`),
    traps: [r`Calculer directement « au moins deux » : beaucoup de cas. Le contraire est bien plus simple.`],
    note: NOTE_TD2
  });

  add({
    id: 'td2-2-5', ecue: 'dp', order: 3205, src: 'TD 2 · Ex 2.5',
    title: 'Mains de 5 cartes dans un jeu de 32', topics: ['probabilites', 'denombrement'], lvl: 2, time: 25,
    intro: p('Dans un jeu de 32 cartes, on tire une main de 5 cartes. Déterminer la probabilité qu’une main contienne :'),
    questions: ['exactement un as ;', 'au moins un as ;', 'la dame de trèfle ;', '4 trèfles dont la dame ;', 'exactement un trèfle et une dame.'],
    hints: [r`\(\Omega\) = les mains (parties à 5 éléments) : \(\binom{32}{5} = 201\,376\), équiprobables. Le jeu a 4 as, 8 trèfles, 4 dames.`, r`« Au moins un as » : par le contraire.`, r`Question 5 : distingue selon que le trèfle est la dame de trèfle ou non.`],
    solution: [{ t: 'Correction', html: p(r`On note \(\Omega\) l’ensemble des mains, \(\card \Omega = \binom{32}{5} = 201\,376\), avec l’équiprobabilité.`) + ol([
        r`Un as parmi 4, puis 4 cartes parmi les 28 autres : \(\dfrac{4\binom{28}{4}}{\binom{32}{5}} = \dfrac{81\,900}{201\,376} = \dfrac{2\,925}{7\,192} \approx 0{,}407\).`,
        r`Contraire « aucun as » : \(\binom{28}{5} = 98\,280\) mains. \(1 - \dfrac{98\,280}{201\,376} = \dfrac{1\,841}{3\,596} \approx 0{,}512\).`,
        r`La dame de trèfle, puis 4 cartes parmi 31 : \(\dfrac{\binom{31}{4}}{\binom{32}{5}} = \dfrac{5}{32}\).`,
        r`La dame de trèfle, 3 autres trèfles parmi 7, une carte non trèfle parmi 24 : \(\dfrac{\binom{7}{3} \times 24}{\binom{32}{5}} = \dfrac{840}{201\,376} = \dfrac{15}{3\,596}\).`,
        r`Deux cas disjoints. Le trèfle est la dame de trèfle : 4 autres cartes ni trèfle ni dame (\(32 - 8 - 3 = 21\) cartes) : \(\binom{21}{4} = 5\,985\). Le trèfle n’est pas une dame (7 choix), la dame est l’une des 3 autres (3 choix), 3 cartes parmi les 21 : \(7 \times 3 \times \binom{21}{3} = 27\,930\). Probabilité \(\dfrac{33\,915}{201\,376} = \dfrac{4\,845}{28\,768} \approx 0{,}168\).`]) +
      model(p(r`2. Soit \(A\) : « la main contient au moins un as ». \(\overline{A}\) : « aucun as », réalisé par les \(\binom{28}{5}\) mains formées avec les 28 cartes qui ne sont pas des as.`) + p(r`Donc \(P(A) = 1 - \dfrac{\binom{28}{5}}{\binom{32}{5}} = 1 - \dfrac{98\,280}{201\,376} = \dfrac{1\,841}{3\,596}\).`)) }],
    answer: p(r`\(\frac{2\,925}{7\,192}\) ; \(\frac{1\,841}{3\,596}\) ; \(\frac{5}{32}\) ; \(\frac{15}{3\,596}\) ; \(\frac{4\,845}{28\,768}\).`),
    traps: [r`« Au moins un as » par \(\frac{4\binom{31}{4}}{\binom{32}{5}}\) : les mains à plusieurs as sont comptées plusieurs fois.`, r`Question 4 : oublier d’imposer que la 5e carte ne soit pas un trèfle (« 4 trèfles » = exactement 4).`, r`Question 5 : oublier le cas où l’unique trèfle est la dame de trèfle.`],
    note: NOTE_TD2, near: ['p2018-ex7']
  });

  add({
    id: 'td2-2-6', ecue: 'dp', order: 3206, src: 'TD 2 · Ex 2.6',
    title: 'Deux dés : doubles, sommes, maximum', topics: ['probabilites'], lvl: 1, time: 10,
    intro: p('On lance simultanément deux dés à six faces non truqués. Déterminer la probabilité :'),
    questions: ['d’obtenir les deux mêmes résultats ;', 'que la somme des deux résultats soit paire ;', 'que la somme soit inférieure ou égale à 8 ;', 'que le plus grand des deux résultats soit inférieur ou égal à 4.'],
    hints: [r`Distingue les dés : \(\Omega = \ent{1}{6}^2\), 36 issues équiprobables.`, r`Somme \(\le 8\) : compte plutôt les sommes 9, 10, 11, 12.`, r`Maximum \(\le 4\) : les deux dés sont \(\le 4\).`],
    solution: [{ t: 'Correction', html: ol([
        r`6 doubles : \(\frac{6}{36} = \frac{1}{6}\).`,
        r`Somme paire si les deux dés ont la même parité : \(3 \times 3 + 3 \times 3 = 18\) couples, \(\frac{1}{2}\).`,
        r`Sommes 9, 10, 11, 12 : \(4 + 3 + 2 + 1 = 10\) couples. Donc \(\frac{36 - 10}{36} = \frac{26}{36} = \frac{13}{18}\).`,
        r`Les deux dés dans \(\ent{1}{4}\) : \(4^2 = 16\) couples, \(\frac{16}{36} = \frac{4}{9}\).`]) }],
    answer: p(r`\(\frac{1}{6}\) ; \(\frac{1}{2}\) ; \(\frac{13}{18}\) ; \(\frac{4}{9}\).`),
    traps: [r`Prendre les 21 résultats sans ordre comme équiprobables (voir l’exercice 1.3).`],
    note: NOTE_TD2
  });

  add({
    id: 'td2-3-7', ecue: 'dp', order: 3307, src: 'TD 2 · Ex 3.7',
    title: 'Incompatibles ou indépendants ?', topics: ['independance'], lvl: 1, time: 15,
    questions: [r`On tire au hasard un nombre entre 1 et 20. On considère les deux événements \(A\) : « Le nombre tiré est pair » et \(B\) : « Le nombre tiré est un multiple de 5 ».<br>(a) \(A\) et \(B\) sont-ils incompatibles ?<br>(b) \(A\) et \(B\) sont-ils indépendants ?`, 'Reprendre les questions précédentes si, à présent, on tire une nombre au hasard entre 1 et 21.'],
    hints: [r`Incompatibles : \(A \cap B = \varnothing\). Indépendants : \(P(A \cap B) = P(A)P(B)\).`, r`\(A \cap B\) : les multiples de 10.`],
    solution: [{ t: 'Correction', html: model(p(r`1. Sur \(\ent{1}{20}\) avec l’équiprobabilité : \(A\) a 10 éléments, \(B = \{5, 10, 15, 20\}\) en a 4, \(A \cap B = \{10, 20\}\) en a 2.`) +
        p(r`(a) \(A \cap B \neq \varnothing\) : \(A\) et \(B\) ne sont pas incompatibles.`) +
        p(r`(b) \(P(A)P(B) = \frac{10}{20} \times \frac{4}{20} = \frac{1}{10} = \frac{2}{20} = P(A \cap B)\) : \(A\) et \(B\) sont indépendants.`)) +
      p(r`2. Sur \(\ent{1}{21}\) : mêmes ensembles \(A\), \(B\), \(A \cap B\), toujours pas incompatibles. Mais \(P(A)P(B) = \frac{10}{21} \times \frac{4}{21} = \frac{40}{441}\) et \(P(A \cap B) = \frac{2}{21} = \frac{42}{441}\) : ils ne sont plus indépendants.`) +
      p(r`L’indépendance dépend de la probabilité, pas seulement des événements.`) }],
    answer: p(r`Jamais incompatibles. Indépendants sur \(\ent{1}{20}\), pas sur \(\ent{1}{21}\).`),
    traps: [r`Confondre incompatibles et indépendants : deux événements incompatibles de probabilités non nulles ne sont jamais indépendants.`],
    note: NOTE_TD2, near: ['p2019-ex7']
  });

  add({
    id: 'td2-3-8', ecue: 'dp', order: 3308, src: 'TD 2 · Ex 3.8',
    title: 'La formule des probabilités totales', topics: ['conditionnelles', 'demonstrations'], lvl: 2, time: 10,
    intro: p('Énoncer et redémontrer la formule des probabilités totales.') + note('« On ne se rappelle jamais de cette formule, souvent on en réécrit la preuve lorsqu’on explicite un raisonnement. » (note de la feuille)'),
    hints: [r`Pars d’une partition \((B_1, \dots, B_n)\) de \(\Omega\) avec \(P(B_i) \neq 0\).`, r`\(A = (A \cap B_1) \sqcup \dots \sqcup (A \cap B_n)\), puis \(P(A \cap B_i) = P(A \mid B_i)P(B_i)\).`],
    solution: [{ t: 'Énoncé et preuve', html: '<div class="box thm"><span class="tag">Formule des probabilités totales</span>' + p(r`Soit \((B_1, \dots, B_n)\) une partition de \(\Omega\) telle que \(P(B_i) \neq 0\) pour tout \(i\). Pour tout événement \(A\) :`) + fm(r`P(A) = \sum_{i=1}^{n} P(A \cap B_i) = \sum_{i=1}^{n} P(A \mid B_i)\,P(B_i).`) + '</div>' +
      model(p(r`Comme \((B_1, \dots, B_n)\) est une partition de \(\Omega\), \(A = A \cap \Omega = (A \cap B_1) \cup \dots \cup (A \cap B_n)\), et ces ensembles sont deux à deux disjoints (\((A \cap B_i) \cap (A \cap B_j) \subset B_i \cap B_j = \varnothing\) pour \(i \neq j\)).`) +
        p(r`Par additivité, \(P(A) = \sum_{i=1}^{n} P(A \cap B_i)\). Enfin \(P(A \cap B_i) = P(A \mid B_i)P(B_i)\) par définition de la probabilité conditionnelle (\(P(B_i) \neq 0\)).`)) +
      p(r`Cas le plus fréquent : \(n = 2\), partition \(\{B, \overline{B}\}\) : \(P(A) = P(A \mid B)P(B) + P(A \mid \overline{B})P(\overline{B})\).`) }],
    answer: p(r`\(P(A) = \sum_i P(A \mid B_i)P(B_i)\) pour une partition \((B_i)\) de \(\Omega\), \(P(B_i) \neq 0\) ; preuve par \(A = \bigsqcup_i (A \cap B_i)\).`),
    traps: [r`Oublier l’hypothèse « partition » (ou « système complet ») et \(P(B_i) \neq 0\).`, r`Écrire le dernier terme \(P(A \cap B_n)P(B_n)\) : c’est \(P(A \mid B_n)P(B_n)\).`],
    note: NOTE_TD2, near: ['p2023-dp-ex4']
  });

  add({
    id: 'td2-3-9', ecue: 'dp', order: 3309, src: 'TD 2 · Ex 3.9',
    title: 'Contrôle qualité des affiches', topics: ['conditionnelles', 'bayes'], lvl: 2, time: 20,
    intro: p(r`<b>Travail Personnel obligatoire</b> : dans une imprimerie de labeur de la région parisienne, la proportion d’affiches présentant un léger défaut au niveau des couleurs est de \(0{,}05\). Le chef de fabrication a mis en place un contrôle qualité donnant les résultats suivants : si l’impression de l’affiche est parfaite, elle est acceptée avec la probabilité \(0{,}96\) et si elle présente ce léger défaut de couleurs, elle est refusée avec la probabilité \(0{,}98\).`),
    questions: ['Exprimer les données du problème sous forme de probabilité ou de probabilité conditionnelle d’évènements simples.', 'Déterminer la probabilité des évènements suivants sous forme de formule utilisant des probabilités conditionnelles puis sous forme de fraction simplifiée :<br>(a) Il y a une erreur de contrôle ;<br>(b) Une affiche acceptée présente un défaut de couleurs.'],
    hints: [r`Événements : \(D\) « l’affiche a un défaut », \(A\) « l’affiche est acceptée ».`, r`Une erreur de contrôle : accepter une affiche défectueuse, ou refuser une affiche parfaite. Deux cas disjoints.`, r`(b) demande \(P(D \mid A)\) : Bayes, avec \(P(A)\) par les probabilités totales.`],
    solution: [
      { t: 'Question 1', html: p(r`On note \(D\) : « l’affiche présente un défaut » et \(A\) : « l’affiche est acceptée ». Données : \(P(D) = 0{,}05\), \(P(A \mid \overline{D}) = 0{,}96\), \(P(\overline{A} \mid D) = 0{,}98\). On en déduit \(P(\overline{D}) = 0{,}95\), \(P(A \mid D) = 0{,}02\), \(P(\overline{A} \mid \overline{D}) = 0{,}04\).`) +
        tool('tree', { first: [{ n: 'D', p: '1/20' }, { n: '\\overline{D}', p: '19/20' }], second: { n: 'A', nb: '\\overline{A}', p: ['1/50', '24/25'] }, edit: false, title: 'Défaut, puis acceptation' }) },
      { t: 'Question 2', html: model(p(r`(a) L’erreur est l’événement \(E = (D \cap A) \sqcup (\overline{D} \cap \overline{A})\) (union disjointe). Donc`) +
        fm(r`P(E) = P(A \mid D)P(D) + P(\overline{A} \mid \overline{D})P(\overline{D}) = 0{,}02 \times 0{,}05 + 0{,}04 \times 0{,}95 = 0{,}001 + 0{,}038 = \frac{39}{1\,000}.`) +
        p(r`(b) Comme \(\{D, \overline{D}\}\) est une partition de \(\Omega\) : \(P(A) = P(A \mid D)P(D) + P(A \mid \overline{D})P(\overline{D}) = 0{,}001 + 0{,}912 = 0{,}913\).`) +
        fm(r`P(D \mid A) = \frac{P(A \cap D)}{P(A)} = \frac{P(A \mid D)P(D)}{P(A)} = \frac{0{,}001}{0{,}913} = \frac{1}{913}.`)) }],
    answer: p(r`\(P(E) = \frac{39}{1\,000}\) ; \(P(D \mid A) = \frac{1}{913}\).`),
    traps: [r`Confondre \(P(D \mid A)\) (ce qu’on demande) et \(P(A \mid D)\) (une donnée déduite).`, r`Oublier un des deux types d’erreur en (a).`],
    note: NOTE_TD2, near: ['p2019-ex8', 'p2023-dp-ex4']
  });

  add({
    id: 'td2-3-10', ecue: 'dp', order: 3310, src: 'TD 2 · Ex 3.10',
    title: 'Détecter la triche dans les rendus', topics: ['conditionnelles', 'bayes'], lvl: 2, time: 15,
    intro: p('Dans une école d’informatique, les étudiants rendent régulièrement des travaux pratiques de programmation. Mais certains étudiants veulent faire les malins et se permettent de tricher (en copiant les rendus des promotions précédentes, ou en faisant faire leur travail par ChatGPT par exemple). L’équipe enseignante a donc conçu un algorithme pour détecter la triche dans les rendus. Les données sont les suivantes :') +
      ul([r`Il y a de la triche dans \(10\,\%\) des rendus.`, r`Parmi les rendus qui contiennent de la triche, \(98\,\%\) sont classés «triche» par l’algorithme de détection.`, r`Parmi les rendus qui ne contiennent pas de triche, \(95\,\%\) ne sont pas classés «triche» par l’algorithme.`]) +
      p(r`On tire un rendu au hasard et on définit les événements : \(T\) = «Le rendu a de la triche» et \(CT\) = «Le rendu est classé triche par l’algorithme».`) +
      p('N.B. : vous justifierez vos résultats à l’aide d’une formule du cours et vous les donnerez sous forme de pourcentage ou de fraction simplifiée.'),
    questions: ['Traduire les données en termes de probabilités au moyen des événements définis ci-dessus.', 'On choisit au hasard un rendu. Quelle est la probabilité que ce rendu soit classé «triche» par l’algorithme ?', 'Un rendu a été classé «triche» par l’algorithme. Quelle est la probabilité qu’il y ait effectivement de la triche dans ce rendu ?'],
    hints: [r`\(95\,\%\) des rendus honnêtes ne sont pas classés triche : \(P(CT \mid \overline{T}) = 0{,}05\).`, r`Question 2 : probabilités totales sur la partition \(\{T, \overline{T}\}\).`, r`Question 3 : \(P(T \mid CT) = \frac{P(CT \mid T)P(T)}{P(CT)}\).`],
    solution: [{ t: 'Correction', html: p(r`1. \(P(T) = 0{,}1\), \(P(CT \mid T) = 0{,}98\), \(P(\overline{CT} \mid \overline{T}) = 0{,}95\), donc \(P(CT \mid \overline{T}) = 0{,}05\).`) +
      tool('tree', { first: [{ n: 'T', p: '1/10' }, { n: '\\overline{T}', p: '9/10' }], second: { n: 'CT', nb: '\\overline{CT}', p: ['49/50', '1/20'] }, edit: false, title: 'Triche, puis classement' }) +
      model(p(r`2. Comme \(\{T, \overline{T}\}\) est une partition de \(\Omega\), \(CT = (CT \cap T) \sqcup (CT \cap \overline{T})\), d’où`) +
        fm(r`P(CT) = P(CT \mid T)P(T) + P(CT \mid \overline{T})P(\overline{T}) = 0{,}98 \times 0{,}1 + 0{,}05 \times 0{,}9 = 0{,}098 + 0{,}045 = \frac{143}{1\,000}.`) +
        p(r`3. On cherche \(P(T \mid CT)\) :`) + fm(r`P(T \mid CT) = \frac{P(CT \cap T)}{P(CT)} = \frac{P(CT \mid T)P(T)}{P(CT)} = \frac{0{,}098}{0{,}143} = \frac{98}{143} \approx 68{,}5\,\%.`)) +
      p(r`Un rendu classé « triche » n’est tricheur qu’environ deux fois sur trois : les \(5\,\%\) de faux positifs portent sur \(90\,\%\) des rendus.`) }],
    answer: p(r`\(P(CT) = \frac{143}{1\,000} = 14{,}3\,\%\) ; \(P(T \mid CT) = \frac{98}{143} \approx 68{,}5\,\%\).`),
    traps: [r`Prendre \(P(CT \mid \overline{T}) = 0{,}95\) : c’est la probabilité de <b>ne pas</b> être classé triche.`, r`Répondre \(0{,}98\) à la question 3 : c’est \(P(CT \mid T)\), pas \(P(T \mid CT)\).`],
    note: NOTE_TD2, near: ['p2023-dp-ex4', 'p2024-dp-ex4']
  });

  add({
    id: 'td2-3-11', ecue: 'dp', order: 3311, src: 'TD 2 · Ex 3.11 (★)',
    title: 'Deux dés colorés et une pièce truquée', topics: ['conditionnelles', 'bayes'], lvl: 3, time: 25,
    intro: p(r`On considère deux dés \(A\) et \(B\), contenant pour \(A\) 4 faces rouges et 2 faces blanches, et pour \(B\) 2 faces rouges et 4 faces blanches. On lance une pièce de monnaie truquée dont la probabilité de tomber sur pile est de \(1/3\) afin de déterminer le dé utilisé dans l’expérience : dans le cas d’un pile, on joue uniquement avec le dé \(A\), dans le cas d’un face uniquement avec le dé \(B\).`),
    questions: ['Déterminer la probabilité d’obtenir une face rouge au premier lancer de dé.', r`Soit \(n \in \N^*\). On suppose qu’au cours des \(n\) premiers lancers, on a obtenu à chaque fois une face rouge. Déterminer la probabilité d’avoir utilisé le dé \(A\).`,
      'Supposons que l’on obtienne une face rouge aux deux premiers lancers. Déterminer la probabilité d’obtenir une face rouge au troisième lancer.<br>Exprimer vos résultats (a) par une formule utilisant des probabilités conditionnelles ; (b) par une fraction simplifiée.'],
    hints: [r`Événements : \(A\) « on joue avec le dé A » (\(P(A) = \frac{1}{3}\)), \(R_k\) « rouge au \(k\)-ième lancer ». Sachant le dé, les lancers sont indépendants : \(P(R_1 \cap \dots \cap R_n \mid A) = \left(\frac{2}{3}\right)^n\).`, r`Question 2 : Bayes avec la partition \(\{A, \overline{A}\}\).`, r`Question 3 : \(P(R_3 \mid R_1 \cap R_2) = \frac{P(R_1 \cap R_2 \cap R_3)}{P(R_1 \cap R_2)}\), chaque terme par les probabilités totales.`],
    solution: [
      { t: 'Question 1', html: model(p(r`\(\{A, \overline{A}\}\) est une partition de \(\Omega\), avec \(P(A) = \frac{1}{3}\), \(P(R_1 \mid A) = \frac{4}{6} = \frac{2}{3}\) et \(P(R_1 \mid \overline{A}) = \frac{2}{6} = \frac{1}{3}\). Par les probabilités totales :`) +
        fm(r`P(R_1) = P(R_1 \mid A)P(A) + P(R_1 \mid \overline{A})P(\overline{A}) = \frac{2}{3} \times \frac{1}{3} + \frac{1}{3} \times \frac{2}{3} = \frac{4}{9}.`)) },
      { t: 'Question 2', html: p(r`Notons \(S_n = R_1 \cap \dots \cap R_n\). Sachant le dé, les lancers sont indépendants : \(P(S_n \mid A) = \left(\frac{2}{3}\right)^n\) et \(P(S_n \mid \overline{A}) = \left(\frac{1}{3}\right)^n\).`) +
        fm(r`P(A \mid S_n) = \frac{P(S_n \mid A)P(A)}{P(S_n \mid A)P(A) + P(S_n \mid \overline{A})P(\overline{A})} = \frac{\frac{1}{3}\left(\frac{2}{3}\right)^n}{\frac{1}{3}\left(\frac{2}{3}\right)^n + \frac{2}{3}\left(\frac{1}{3}\right)^n} = \frac{2^n}{2^n + 2} = \frac{2^{n-1}}{2^{n-1} + 1}.`) +
        p(r`Pour \(n = 1\) : \(\frac{1}{2}\) ; elle tend vers 1 quand \(n\) grandit : beaucoup de rouges, c’est sans doute le dé A.`) },
      { t: 'Question 3', html: fm(r`P(R_3 \mid S_2) = \frac{P(S_3)}{P(S_2)} = \frac{\frac{1}{3}\left(\frac{2}{3}\right)^3 + \frac{2}{3}\left(\frac{1}{3}\right)^3}{\frac{1}{3}\left(\frac{2}{3}\right)^2 + \frac{2}{3}\left(\frac{1}{3}\right)^2} = \frac{\frac{10}{81}}{\frac{6}{27}} = \frac{5}{9}.`) +
        p(r`\(\frac{5}{9} > \frac{4}{9}\) : deux rouges rendent le dé A plus probable, donc un troisième rouge aussi. \(R_3\) et \(S_2\) ne sont pas indépendants.`) }],
    answer: p(r`\(\frac{4}{9}\) ; \(\frac{2^{n-1}}{2^{n-1} + 1}\) ; \(\frac{5}{9}\).`),
    traps: [r`Croire que les lancers sont indépendants (sans condition) et répondre \(\frac{4}{9}\) à la question 3 : ils ne le sont que sachant le dé.`, r`Écrire \(P(R_n \mid A)\) pour \(\left(\frac{2}{3}\right)^n\) : c’est la probabilité de \(n\) rouges, \(P(R_1 \cap \dots \cap R_n \mid A)\).`],
    note: NOTE_TD2, near: ['p2024-dp-ex4']
  });

  add({
    id: 'td2-3-12', ecue: 'dp', order: 3312, src: 'TD 2 · Ex 3.12',
    title: 'Points ANAC : ni sport, ni portes ouvertes', topics: ['conditionnelles'], lvl: 1, time: 10,
    intro: p(r`Afin de grappiller les points ANAC nécessaires à la validation de leur semestre, les élèves de l’EPITA ont le choix entre deux modes d’obtention : le sport et la participation aux journées portes ouvertes. On estime que \(60\,\%\) des élèves obtiennent des points grâce au sport, et que \(50\,\%\) participent aux journées portes ouvertes. De plus, un tiers des élèves faisant du sport ont également participé aux journées portes ouvertes.`) +
      p('Représenter graphiquement ce problème, et déterminer la proportion d’élèves qui vont devoir redoubler pour n’avoir obtenu aucun point ANAC lors de ce semestre. Exprimer le résultat (a) par une formule utilisant des probabilités conditionnelles ; (b) par une fraction simplifiée.'),
    hints: [r`\(S\) : sport, \(J\) : portes ouvertes. « Un tiers des sportifs » : \(P(J \mid S) = \frac{1}{3}\).`, r`Aucun point : \(\overline{S} \cap \overline{J} = \overline{S \cup J}\).`],
    solution: [{ t: 'Correction', html: model(p(r`On note \(S\) : « l’élève fait du sport » et \(J\) : « l’élève participe aux portes ouvertes ». \(P(S) = 0{,}6\), \(P(J) = 0{,}5\), \(P(J \mid S) = \frac{1}{3}\), donc \(P(S \cap J) = P(J \mid S)P(S) = 0{,}2\).`) +
        fm(r`P(\overline{S} \cap \overline{J}) = 1 - P(S \cup J) = 1 - P(S) - P(J) + P(J \mid S)P(S) = 1 - 0{,}6 - 0{,}5 + 0{,}2 = \frac{1}{10}.`)) +
      tool('venn', { n: 2, names: ['S', 'J'], u: 'Ω', sizes: { S: 60, J: 50, SJ: 20, E: 100 }, expr: "S' & J'", edit: false, title: 'Sur 100 élèves' }) +
      tbl(['', r`\(J\)`, r`\(\overline{J}\)`, 'total'], [[r`\(S\)`, '20 %', '40 %', '60 %'], [r`\(\overline{S}\)`, '30 %', '10 %', '40 %'], ['total', '50 %', '50 %', '100 %']], { th: true, w: 22 }) }],
    answer: p(r`\(1 - P(S) - P(J) + P(J \mid S)P(S) = \frac{1}{10}\) : \(10\,\%\) des élèves.`),
    traps: [r`Prendre \(P(S \cap J) = \frac{1}{3}\) : un tiers <b>des sportifs</b>, c’est \(P(J \mid S)\).`, r`Calculer \(1 - 0{,}6 - 0{,}5 < 0\) sans rajouter l’intersection.`],
    note: NOTE_TD2
  });

  add({
    id: 'td2-4-13', ecue: 'dp', order: 3413, src: 'TD 2 · Ex 4.13',
    title: 'Espérance et variance ; X = 2T − 6', topics: ['variables', 'esperance'], lvl: 1, time: 20,
    questions: [r`Soit \(X\) une variable aléatoire prenant un nombre fini de valeurs. Rappeler comment on calcule son espérance et sa variance. Expliquer ces deux notions. Connaissez-vous des formules sur l’espérance et la variance de variables aléatoires finies ?`,
      r`On lance une fois un dé équilibré. On note :<br>– \(T\) la variable aléatoire égale au numéro qui apparait sur la face du dé.<br>– \(X\) la variable aléatoire correspondant au double du numéro de la face apparue moins 6.<br>(a) Donner la loi de \(T\). En déduire \(E(T)\) et \(V(T)\).<br>(b) Quelles sont les valeurs prises par \(X\) ? Relier la variable \(X\) à la variable \(T\).<br>(c) En déduire \(E(X)\) et \(V(X)\).`],
    hints: [r`\(E(X) = \sum_i x_i P(X = x_i)\) ; \(V(X) = E(X^2) - E(X)^2\).`, r`\(X = 2T - 6\) : utilise \(E(aT + b) = aE(T) + b\) et \(V(aT + b) = a^2V(T)\).`],
    solution: [
      { t: 'Question 1', html: ul([r`Si \(X(\Omega) = \{x_1, \dots, x_n\}\) : \(E(X) = \sum_{i=1}^{n} x_i P(X = x_i)\), la moyenne des valeurs pondérée par leurs probabilités (la valeur moyenne sur un grand nombre d’expériences).`,
        r`\(V(X) = E\left((X - E(X))^2\right) = \sum_{i=1}^{n} (x_i - E(X))^2 P(X = x_i)\) : la moyenne des carrés des écarts à l’espérance, qui mesure la dispersion. L’écart type est \(\sigma(X) = \sqrt{V(X)}\).`,
        r`Formules : \(E(aX + b) = aE(X) + b\) ; \(E(X + Y) = E(X) + E(Y)\) ; \(V(X) = E(X^2) - E(X)^2\) (Koenig-Huygens) ; \(V(aX + b) = a^2V(X)\) ; si \(X\) et \(Y\) sont indépendantes, \(V(X + Y) = V(X) + V(Y)\).`]) },
      { t: 'Question 2', html: model(p(r`(a) \(T(\Omega) = \ent{1}{6}\) et \(P(T = k) = \frac{1}{6}\) pour tout \(k\) (loi uniforme). \(E(T) = \frac{1}{6}(1 + 2 + \dots + 6) = \frac{21}{6} = \frac{7}{2}\).`) +
        p(r`\(E(T^2) = \frac{1}{6}(1 + 4 + 9 + 16 + 25 + 36) = \frac{91}{6}\), donc \(V(T) = \frac{91}{6} - \frac{49}{4} = \frac{182 - 147}{12} = \frac{35}{12}\).`) +
        p(r`(b) \(X = 2T - 6\), donc \(X(\Omega) = \{-4, -2, 0, 2, 4, 6\}\).`) +
        p(r`(c) \(E(X) = 2E(T) - 6 = 2 \times \frac{7}{2} - 6 = 1\) et \(V(X) = 2^2 V(T) = 4 \times \frac{35}{12} = \frac{35}{3}\).`)) +
        tool('law', { x: [1, 2, 3, 4, 5, 6], p: ['1/6', '1/6', '1/6', '1/6', '1/6', '1/6'], name: 'T', title: 'Loi de T' }) }],
    answer: p(r`\(E(T) = \frac{7}{2}\), \(V(T) = \frac{35}{12}\) ; \(X = 2T - 6\), \(X(\Omega) = \{-4, -2, 0, 2, 4, 6\}\), \(E(X) = 1\), \(V(X) = \frac{35}{3}\).`),
    traps: [r`Écrire \(E(X) = \frac{2}{7}\) ou \(\frac{2 \times 7}{2} \times 6\) : c’est \(2 \times \frac{7}{2} - 6 = 1\).`, r`Garder le \(-6\) dans la variance : \(V(2T - 6) = 4V(T)\), la constante disparaît.`, r`Calculer \(V\) comme \(E(X^2) + E(X)^2\).`],
    note: NOTE_TD2, near: ['p2024-dp-ex5']
  });

  add({
    id: 'td2-4-14', ecue: 'dp', order: 3414, src: 'TD 2 · Ex 4.14',
    title: 'Urne colorée : numéro tiré et gain', topics: ['variables', 'esperance'], lvl: 2, time: 20,
    intro: p('Une urne contient quatre boules bleues numérotées de 1 à 4, trois boules rouges numérotées de 1 à 3 et deux boules vertes numérotées de 1 à 2. On tire une boule de l’urne.'),
    questions: [r`On note \(X\) la variable aléatoire correspondant au numéro de la boule tirée. Trouver la loi de \(X\), son espérance et sa variance.`,
      r`On joue au jeu suivant : on tire une boule de l’urne.<br>– Si la boule tirée est bleue et porte un numéro pair, le joueur gagne 2 euros.<br>– Si la boule tirée n’est pas bleue et porte un numéro pair, le joueur gagne 3 euros.<br>– Sinon, le joueur ne gagne rien.<br>On note \(Y\) la variable aléatoire correspondant au gain obtenu pendant ce jeu.<br>(a) Trouver la loi de \(Y\).<br>(b) Quelle est la probabilité que le joueur gagne de l’argent ?`],
    hints: [r`9 boules équiprobables. Le numéro 1 est porté par 3 boules, le 4 par une seule.`, r`Gain 2 € : bleue 2 ou bleue 4. Gain 3 € : rouge 2 ou verte 2.`],
    solution: [{ t: 'Correction', html: tbl([r`\(k\)`, '1', '2', '3', '4'], [[r`\(P(X = k)\)`, r`\(\frac{3}{9} = \frac{1}{3}\)`, r`\(\frac{1}{3}\)`, r`\(\frac{2}{9}\)`, r`\(\frac{1}{9}\)`]], { th: true, w: 22 }) +
      model(p(r`\(E(X) = 1 \times \frac{3}{9} + 2 \times \frac{3}{9} + 3 \times \frac{2}{9} + 4 \times \frac{1}{9} = \frac{19}{9}\).`) + p(r`\(E(X^2) = 1 \times \frac{3}{9} + 4 \times \frac{3}{9} + 9 \times \frac{2}{9} + 16 \times \frac{1}{9} = \frac{49}{9}\), donc \(V(X) = \frac{49}{9} - \left(\frac{19}{9}\right)^2 = \frac{441 - 361}{81} = \frac{80}{81}\).`)) +
      p(r`2. (a) \(Y(\Omega) = \{0, 2, 3\}\) : \(P(Y = 2) = \frac{2}{9}\) (bleue 2, bleue 4), \(P(Y = 3) = \frac{2}{9}\) (rouge 2, verte 2), \(P(Y = 0) = \frac{5}{9}\). (b) \(P(Y > 0) = \frac{4}{9}\).`) +
      tool('law', { x: [1, 2, 3, 4], p: ['1/3', '1/3', '2/9', '1/9'], name: 'X', title: 'Loi de X' }) }],
    answer: p(r`\(X\) : \(\frac{1}{3}, \frac{1}{3}, \frac{2}{9}, \frac{1}{9}\) ; \(E(X) = \frac{19}{9}\), \(V(X) = \frac{80}{81}\). \(Y\) : \(P(Y = 0) = \frac{5}{9}\), \(P(Y = 2) = P(Y = 3) = \frac{2}{9}\) ; \(P(Y > 0) = \frac{4}{9}\).`),
    traps: [r`Prendre \(X\) uniforme sur \(\ent{1}{4}\) : les numéros ne sont pas portés par le même nombre de boules.`, r`Oublier de vérifier que la somme des probabilités vaut 1.`],
    note: NOTE_TD2, near: ['p2024-dp-ex6']
  });

  add({
    id: 'td2-4-15', ecue: 'dp', order: 3415, src: 'TD 2 · Ex 4.15',
    title: 'Deux tirages sans remise et un score', topics: ['variables', 'esperance'], lvl: 1, time: 15,
    intro: p('Une urne contient cinq boules, indiscernables au toucher : trois boules rouges et deux boules blanches. On tire successivement deux boules, sans remise.') +
      p(r`Si la première boule tirée est blanche, on marque un point. Sinon, cette première boule ne rapporte aucun point. Si la seconde boule tirée est blanche, on marque deux points. Sinon, cette seconde boule ne rapporte aucun point. On définit la variable aléatoire \(X\) = «Nombre total de points obtenus».`) +
      p(r`On considère les évènements \(B_1\) = «La 1ère boule tirée est blanche» et \(R_1\) = «La 1ère boule tirée est rouge», et de même, les évènements \(B_2\) et \(R_2\) définis de manière analogue pour la couleur de la seconde boule.`),
    questions: [r`Calculer les probabilités \(P(B_1 \cap B_2)\), \(P(B_1 \cap R_2)\), \(P(R_1 \cap B_2)\) et \(P(R_1 \cap R_2)\).`, r`En déduire la loi de \(X\).`, r`Calculer l’espérance de \(X\).`, r`Calculer la variance de \(X\).`],
    hints: [r`\(P(B_1 \cap B_2) = P(B_1)P(B_2 \mid B_1)\) : après une blanche, il reste 1 blanche sur 4 boules.`, r`\(X = 0\) : \(R_1 \cap R_2\) ; \(X = 1\) : \(B_1 \cap R_2\) ; \(X = 2\) : \(R_1 \cap B_2\) ; \(X = 3\) : \(B_1 \cap B_2\).`],
    solution: [{ t: 'Correction', html: model(p(r`1. \(P(B_1 \cap B_2) = P(B_1)P(B_2 \mid B_1) = \frac{2}{5} \times \frac{1}{4} = \frac{1}{10}\) ; \(P(B_1 \cap R_2) = \frac{2}{5} \times \frac{3}{4} = \frac{3}{10}\) ; \(P(R_1 \cap B_2) = \frac{3}{5} \times \frac{2}{4} = \frac{3}{10}\) ; \(P(R_1 \cap R_2) = \frac{3}{5} \times \frac{2}{4} = \frac{3}{10}\).`) +
        p(r`2. \(X(\Omega) = \{0, 1, 2, 3\}\), \(P(X = 0) = P(X = 1) = P(X = 2) = \frac{3}{10}\), \(P(X = 3) = \frac{1}{10}\) (somme 1).`) +
        p(r`3. \(E(X) = 0 \times \frac{3}{10} + 1 \times \frac{3}{10} + 2 \times \frac{3}{10} + 3 \times \frac{1}{10} = \frac{12}{10} = \frac{6}{5}\).`) +
        p(r`4. \(E(X^2) = \frac{0 + 3 + 12 + 9}{10} = \frac{12}{5}\), donc \(V(X) = \frac{12}{5} - \frac{36}{25} = \frac{24}{25}\).`)) +
      tool('law', { x: [0, 1, 2, 3], p: ['3/10', '3/10', '3/10', '1/10'], name: 'X', title: 'Loi de X' }) }],
    answer: p(r`\(\frac{1}{10}, \frac{3}{10}, \frac{3}{10}, \frac{3}{10}\) ; loi \(\frac{3}{10}, \frac{3}{10}, \frac{3}{10}, \frac{1}{10}\) sur \(\{0, 1, 2, 3\}\) ; \(E(X) = \frac{6}{5}\) ; \(V(X) = \frac{24}{25}\).`),
    traps: [r`Calculer \(P(B_2) \times P(B_1)\) comme si les tirages étaient indépendants : sans remise, la composition change.`],
    note: NOTE_TD2, near: ['p2022-ex5']
  });

  add({
    id: 'td2-4-16', ecue: 'dp', order: 3416, src: 'TD 2 · Ex 4.16',
    title: 'Nombre de cœurs dans une main ; formule de Vandermonde', topics: ['variables', 'esperance', 'binomial'], lvl: 3, time: 30,
    intro: p(r`(<b>Travail personnel obligatoire</b>) On tire une main de 5 cartes dans un jeu de 32 cartes, et on note \(X\) la variable aléatoire associée au nombre de cœurs obtenus.`),
    questions: [r`Quel est l’ensemble des valeurs possibles pour \(X\) ?`, r`Déterminer la loi de \(X\).`,
      r`Calculer l’espérance de \(X\). On pourra utiliser la formule suivante, appelée formule de Vandermonde : Pour \(a\), \(b\) et \(n\) trois entiers tels que \(n \le a + b\),` + fm(r`\sum_{k=0}^{n} \binom{a}{k} \binom{b}{n-k} = \binom{a+b}{n}`),
      r`\(\star\) À l’aide d’un problème de dénombrement, montrer la formule de Vandermonde.`],
    hints: [r`8 cœurs et 24 autres cartes. \(X = k\) : \(k\) cœurs parmi 8 et \(5 - k\) autres parmi 24.`, r`Pour l’espérance : \(k\binom{8}{k} = 8\binom{7}{k-1}\), puis Vandermonde avec \(a = 7\), \(b = 24\), \(n = 4\).`, r`Vandermonde : une urne de \(a\) boules rouges et \(b\) vertes, on en tire \(n\) ; classe les tirages selon le nombre de rouges.`],
    solution: [
      { t: 'Questions 1 et 2 : loi hypergéométrique', html: p(r`1. \(X(\Omega) = \ent{0}{5}\) (il y a 8 cœurs, on peut en avoir de 0 à 5).`) +
        p(r`2. Les \(\binom{32}{5}\) mains sont équiprobables. Une main à \(k\) cœurs : \(k\) cœurs parmi 8, \(5 - k\) cartes parmi les 24 autres :`) + fm(r`P(X = k) = \frac{\binom{8}{k}\binom{24}{5-k}}{\binom{32}{5}}`) +
        tbl([r`\(k\)`, '0', '1', '2', '3', '4', '5'], [[r`\(P(X = k)\)`, r`\(\frac{759}{3\,596}\)`, r`\(\frac{759}{1\,798}\)`, r`\(\frac{253}{899}\)`, r`\(\frac{69}{899}\)`, r`\(\frac{15}{1\,798}\)`, r`\(\frac{1}{3\,596}\)`]], { th: true }) },
      { t: 'Question 3 : l’espérance', html: model(p(r`Pour \(k \ge 1\), \(k\binom{8}{k} = k \frac{8!}{k!(8 - k)!} = 8 \frac{7!}{(k - 1)!(8 - k)!} = 8\binom{7}{k-1}\). Donc`) +
        fm(r`E(X) = \sum_{k=1}^{5} k \frac{\binom{8}{k}\binom{24}{5-k}}{\binom{32}{5}} = \frac{8}{\binom{32}{5}} \sum_{j=0}^{4} \binom{7}{j}\binom{24}{4-j} = \frac{8\binom{31}{4}}{\binom{32}{5}} = 8 \times \frac{5}{32} = \frac{5}{4}`) +
        p(r`(Vandermonde avec \(a = 7\), \(b = 24\), \(n = 4\), puis \(\binom{32}{5} = \frac{32}{5}\binom{31}{4}\).)`)) +
        p(r`Interprétation : \(\frac{5}{4} = 5 \times \frac{8}{32}\), cinq cartes, chacune cœur avec probabilité \(\frac{1}{4}\).`) +
        tool('law', { x: [0, 1, 2, 3, 4, 5], p: ['759/3596', '759/1798', '253/899', '69/899', '15/1798', '1/3596'], name: 'X', title: 'Loi du nombre de cœurs' }) },
      { t: 'Question 4 : Vandermonde par double dénombrement', html: model(p(r`Une urne contient \(a\) boules rouges et \(b\) boules vertes ; on tire simultanément \(n\) boules (\(n \le a + b\)). Il y a \(\binom{a+b}{n}\) tirages.`) +
        p(r`Classons-les selon le nombre \(k\) de boules rouges : \(k\) rouges parmi \(a\), \(n - k\) vertes parmi \(b\), soit \(\binom{a}{k}\binom{b}{n-k}\) tirages (nul si \(k > a\) ou \(n - k > b\)). Ces cas sont disjoints et couvrent tous les tirages :`) +
        p(r`\(\sum_{k=0}^{n} \binom{a}{k}\binom{b}{n-k} = \binom{a+b}{n}\).`)) }],
    answer: p(r`\(X(\Omega) = \ent{0}{5}\), \(P(X = k) = \frac{\binom{8}{k}\binom{24}{5-k}}{\binom{32}{5}}\), \(E(X) = \frac{5}{4}\).`),
    traps: [r`Utiliser une loi binomiale \(B(5, \frac{1}{4})\) : les cartes sont tirées sans remise (loi hypergéométrique). L’espérance est la même, pas la loi.`, r`Oublier de dire que les cas de la preuve de Vandermonde sont disjoints.`],
    note: NOTE_TD2, near: ['p2023-dp-ex3']
  });

  add({
    id: 'td2-4-17', ecue: 'dp', order: 3417, src: 'TD 2 · Ex 4.17 (★)',
    title: 'Variable centrée réduite', topics: ['esperance', 'demonstrations'], lvl: 2, time: 10,
    intro: p('Centrer et réduire ses données est un prétraitement statistique standard, il est en particulier utilisé pour préparer les entrées de certains algorithmes d’apprentissage automatique.') +
      '<div class="box def"><span class="tag">Définition 4.1</span>' + p(r`La variable aléatoire <b>centrée réduite</b> associée à une variable aléatoire \(X : \Omega \to \R\) admettant une espérance et une variance non nulle est la variable aléatoire \(\overline{X} = \dfrac{X - E(X)}{\sigma_X}\).`) + '</div>' +
      p(r`Vérifier que \(E(\overline{X}) = 0\) et \(V(\overline{X}) = 1\).`),
    hints: [r`\(\overline{X} = aX + b\) avec \(a = \frac{1}{\sigma_X}\) et \(b = -\frac{E(X)}{\sigma_X}\).`, r`\(V(aX + b) = a^2V(X)\) et \(\sigma_X^2 = V(X)\).`],
    solution: [{ t: 'Rédaction', html: model(p(r`\(\overline{X} = aX + b\) avec \(a = \frac{1}{\sigma_X}\) et \(b = -\frac{E(X)}{\sigma_X}\) (\(\sigma_X \neq 0\) car \(V(X) \neq 0\)).`) +
      p(r`Par linéarité, \(E(\overline{X}) = aE(X) + b = \frac{E(X)}{\sigma_X} - \frac{E(X)}{\sigma_X} = 0\).`) + p(r`Et \(V(\overline{X}) = a^2V(X) = \frac{V(X)}{\sigma_X^2} = \frac{V(X)}{V(X)} = 1\).`)) }],
    answer: p(r`\(E(\overline{X}) = \frac{E(X) - E(X)}{\sigma_X} = 0\) et \(V(\overline{X}) = \frac{V(X)}{\sigma_X^2} = 1\).`),
    traps: [r`Écrire \(V(\overline{X}) = \frac{V(X)}{\sigma_X}\) : le coefficient sort au carré.`],
    note: NOTE_TD2, near: ['p2024-dp-ex5']
  });

  add({
    id: 'td2-4-18', ecue: 'dp', order: 3418, src: 'TD 2 · Ex 4.18',
    title: 'Dames et cœurs : un couple de variables', topics: ['variables', 'independance'], lvl: 2, time: 25,
    questions: [r`Dans un jeu de 32 cartes, on tire une carte au hasard. On note \(X\) la variable aléatoire correspondant au nombre de dames obtenues et \(Y\) la variable correspondant au nombre de cœurs.<br>a. Déterminer les lois de \(X\) et \(Y\).<br>b. Représenter la loi couple \((X, Y)\) sous forme de tableau.<br>c. Montrer que \(X\) et \(Y\) sont indépendantes.`,
      r`On tire maintenant deux cartes au hasard.<br>a. Déterminer les lois de \(X\) et \(Y\).<br>b. Représenter la loi couple \((X, Y)\) sous forme de tableau.<br>c. Montrer que \(X\) et \(Y\) ne sont pas indépendantes.`],
    hints: [r`Sépare les cartes en quatre groupes : la dame de cœur, les 3 autres dames, les 7 autres cœurs, les 21 cartes restantes.`, r`\(X\) et \(Y\) indépendantes : \(P(X = i \cap Y = j) = P(X = i)P(Y = j)\) pour <b>tous</b> \(i, j\). Pour le contredire, une case suffit.`],
    solution: [
      { t: 'Une carte', html: p(r`\(X \leadsto \mathcal{B}\left(\frac{1}{8}\right)\) (4 dames sur 32) et \(Y \leadsto \mathcal{B}\left(\frac{1}{4}\right)\) (8 cœurs) : lois de Bernoulli.`) +
        tbl(['', r`\(Y = 0\)`, r`\(Y = 1\)`, r`loi de \(X\)`], [[r`\(X = 0\)`, r`\(\frac{21}{32}\)`, r`\(\frac{7}{32}\)`, r`\(\frac{7}{8}\)`], [r`\(X = 1\)`, r`\(\frac{3}{32}\)`, r`\(\frac{1}{32}\)`, r`\(\frac{1}{8}\)`], [r`loi de \(Y\)`, r`\(\frac{3}{4}\)`, r`\(\frac{1}{4}\)`, '1']], { th: true, w: 26 }) +
        p(r`Chaque case est le produit des marges : \(\frac{1}{32} = \frac{1}{8} \times \frac{1}{4}\), \(\frac{3}{32} = \frac{1}{8} \times \frac{3}{4}\), \(\frac{7}{32} = \frac{7}{8} \times \frac{1}{4}\), \(\frac{21}{32} = \frac{7}{8} \times \frac{3}{4}\) : \(X\) et \(Y\) sont indépendantes.`) },
      { t: 'Deux cartes', html: p(r`On tire une paire de cartes : \(\binom{32}{2} = 496\) paires équiprobables. \(P(X = 0) = \frac{\binom{28}{2}}{496} = \frac{189}{248}\), \(P(X = 1) = \frac{4 \times 28}{496} = \frac{7}{31}\), \(P(X = 2) = \frac{6}{496} = \frac{3}{248}\) ; \(P(Y = 0) = \frac{\binom{24}{2}}{496} = \frac{69}{124}\), \(P(Y = 1) = \frac{8 \times 24}{496} = \frac{12}{31}\), \(P(Y = 2) = \frac{28}{496} = \frac{7}{124}\).`) +
        tbl(['(sur 496)', r`\(Y = 0\)`, r`\(Y = 1\)`, r`\(Y = 2\)`], [[r`\(X = 0\)`, '210', '147', '21'], [r`\(X = 1\)`, '63', '42', '7'], [r`\(X = 2\)`, '3', '3', '0']], { th: true, w: 24, cap: 'Nombres de paires ; divise par 496 pour les probabilités. Exemple : (X, Y) = (1, 1), c’est la dame de cœur et une des 21 cartes « ni dame ni cœur », ou une autre dame et un autre cœur : 21 + 3 × 7 = 42.' }) +
        model(p(r`\(P(X = 2 \cap Y = 2) = 0\) : deux dames ne peuvent pas être deux cœurs (une seule dame de cœur).`) + p(r`Or \(P(X = 2)P(Y = 2) = \frac{3}{248} \times \frac{7}{124} \neq 0\). Donc \(X\) et \(Y\) ne sont pas indépendantes.`)) }],
    answer: p(r`Une carte : Bernoulli \(\frac{1}{8}\) et \(\frac{1}{4}\), indépendantes. Deux cartes : \(X\) : \(\frac{189}{248}, \frac{7}{31}, \frac{3}{248}\) ; \(Y\) : \(\frac{69}{124}, \frac{12}{31}, \frac{7}{124}\) ; \(P(X = 2, Y = 2) = 0 \neq P(X = 2)P(Y = 2)\).`),
    traps: [r`Vérifier l’indépendance sur une seule case : il faut toutes les cases. À l’inverse, une seule case suffit pour la refuser.`, r`Oublier la dame de cœur, qui est à la fois dame et cœur.`],
    note: NOTE_TD2
  });

  add({
    id: 'td2-5-19', ecue: 'dp', order: 3519, src: 'TD 2 · Ex 5.19',
    title: 'Loi uniforme : espérance et variance', topics: ['lois', 'esperance'], lvl: 2, time: 15,
    intro: p(r`On considère une v.a. finie suivant une loi uniforme sur \(\{1, \dots, n\}\).`),
    questions: ['Calculer son espérance.', 'Déterminer sa variance.<br>N.B. : On admet les résultats suivants : \\(\\displaystyle\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}\\) et \\(\\displaystyle\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}\\)'],
    hints: [r`\(P(X = k) = \frac{1}{n}\) pour \(k \in \ent{1}{n}\).`, r`\(V(X) = E(X^2) - E(X)^2\) ; factorise par \(\frac{n + 1}{12}\).`],
    solution: [{ t: 'Correction', html: model(p(r`\(X(\Omega) = \ent{1}{n}\) et \(P(X = k) = \frac{1}{n}\). Donc \(E(X) = \sum_{k=1}^{n} k \times \frac{1}{n} = \frac{1}{n} \times \frac{n(n + 1)}{2} = \frac{n + 1}{2}\).`) +
      p(r`\(E(X^2) = \frac{1}{n}\sum_{k=1}^{n} k^2 = \frac{(n + 1)(2n + 1)}{6}\) (théorème de transfert), donc`) +
      fm(r`V(X) = \frac{(n + 1)(2n + 1)}{6} - \frac{(n + 1)^2}{4} = \frac{(n + 1)\left[2(2n + 1) - 3(n + 1)\right]}{12} = \frac{(n + 1)(n - 1)}{12} = \frac{n^2 - 1}{12}.`)) +
      p(r`Contrôle avec le dé (\(n = 6\)) : \(E = \frac{7}{2}\) et \(V = \frac{35}{12}\), comme à l’exercice 4.13.`) +
      note(r`La feuille anglaise pose la loi uniforme sur \(\ent{0}{n}\) (\(n + 1\) valeurs) : les réponses y sont \(\frac{n}{2}\) et \(\frac{n(n + 2)}{12}\).`) }],
    answer: p(r`\(E(X) = \frac{n + 1}{2}\), \(V(X) = \frac{n^2 - 1}{12}\).`),
    traps: [r`Écrire \(E(X^2) = \left(\sum k \cdot \frac{1}{n}\right)^2\) : c’est \(\sum k^2 \cdot \frac{1}{n}\).`],
    note: NOTE_TD2
  });

  add({
    id: 'td2-5-20', ecue: 'dp', order: 3520, src: 'TD 2 · Ex 5.20',
    title: 'Noter des copies avec un dé à 20 faces', topics: ['lois'], lvl: 1, time: 10,
    intro: p('Un professeur de mathématiques a 40 copies de contrôle TD à corriger. Pour cela il utilise la méthode classique : pour chaque copie, il lance un dé à 20 faces (numérotées de 1 à 20), et assigne à la copie le résultat obtenu.'),
    questions: [r`Pour chaque élève \(i\) (\(i \in \{1, \dots, 40\}\)) on note \(N_i\) la variable aléatoire associée à la note obtenue. Quelle est la loi de \(N_i\) ? Déterminer son espérance. Quelle est la probabilité que l’élève \(i\) ait la moyenne (i.e. une note supérieure ou égale à 10) ?`,
      r`On note \(X\) la variable aléatoire correspondant au nombre d’élèves ayant la moyenne. Donner la loi de \(X\).`],
    hints: [r`Loi uniforme sur \(\ent{1}{20}\) ; « \(\ge 10\) » : 10, 11, …, 20.`, r`\(X\) compte les succès dans 40 épreuves indépendantes de même probabilité.`],
    solution: [{ t: 'Correction', html: model(p(r`1. \(N_i\) suit la loi uniforme sur \(\ent{1}{20}\) : \(P(N_i = k) = \frac{1}{20}\). \(E(N_i) = \frac{20 + 1}{2} = \frac{21}{2}\). \(P(N_i \ge 10) = \frac{11}{20}\) (les 11 valeurs de 10 à 20).`) +
      p(r`2. Pour chaque élève, « avoir la moyenne » est une épreuve de Bernoulli de paramètre \(\frac{11}{20}\) ; les 40 lancers sont indépendants. \(X\) compte les succès de ces 40 épreuves : \(X \leadsto \mathcal{B}\left(40, \frac{11}{20}\right)\), et \(P(X = k) = \binom{40}{k}\left(\frac{11}{20}\right)^k\left(\frac{9}{20}\right)^{40-k}\) pour \(k \in \ent{0}{40}\).`)) +
      p(r`Au passage, \(E(X) = 40 \times \frac{11}{20} = 22\).`) }],
    answer: p(r`\(N_i \leadsto\) uniforme sur \(\ent{1}{20}\), \(E = \frac{21}{2}\), \(P(N_i \ge 10) = \frac{11}{20}\) ; \(X \leadsto \mathcal{B}(40, \frac{11}{20})\).`),
    traps: [r`Répondre \(P(N_i \ge 10) = \frac{1}{2}\) : de 10 à 20 il y a 11 valeurs.`, r`Écrire « \(\forall i \in \ent{1}{20}\) » pour les élèves : ils sont 40.`],
    note: NOTE_TD2, near: ['p2024-dp-ex6']
  });

  add({
    id: 'td2-5-21', ecue: 'dp', order: 3521, src: 'TD 2 · Ex 5.21',
    title: 'Répondre au hasard à un QCM de 20 questions', topics: ['lois', 'esperance'], lvl: 2, time: 25,
    intro: p('Un étudiant passe un examen sous forme de QCM. L’examen contient 20 questions numérotées de 1 à 20. Chaque question est notée sur 1 point. La note totale de l’épreuve est donc une note sur 20. C’est un QCM sans point négatif, ni point intermédiaire : à chaque question, la note obtenue ne peut être que 0 ou 1.') +
      p(r`L’étudiant s’est mal préparé à l’examen et choisit de répondre au hasard. Ses réponses sont indépendantes et, pour chaque question, il répond juste avec une probabilité de \(\frac{1}{3}\).`),
    questions: [r`Soit \(k \in \ent{1}{20}\). On considère la variable aléatoire \(X_k\) égale à la note obtenue à la question \(k\).<br>(a) À \(k \in \ent{1}{20}\) fixé, donner la loi de \(X_k\). Quel nom porte chacune des variables \(X_k\) ?<br>(b) Calculer l’espérance et la variance de chaque \(X_k\). Vous devez détailler tous vos calculs et ne surtout pas parachuter les résultats !`,
      r`On considère maintenant la variable aléatoire \(Y\) égale à la note finale obtenue par l’étudiant à l’épreuve.<br>(a) Écrire \(Y\) en fonction des \(X_k\).<br>(b) En justifiant proprement votre raisonnement, donner \(P(Y = i)\) pour tout \(i \in \ent{0}{20}\). Comment s’appelle la variable \(Y\) ?<br>(c) Vérifier que \(\displaystyle\sum_{i=0}^{20} P(Y = i) = 1\).<br>(d) En justifiant le calcul, donner l’espérance et la variance de \(Y\).`],
    hints: [r`\(X_k(\Omega) = \{0, 1\}\) : c’est une loi de Bernoulli.`, r`\(Y = X_1 + \dots + X_{20}\), somme de variables de Bernoulli indépendantes de même paramètre.`, r`(c) : formule du binôme avec \(\frac{1}{3} + \frac{2}{3} = 1\).`],
    solution: [
      { t: 'Question 1', html: model(p(r`(a) \(X_k(\Omega) = \{0, 1\}\), \(P(X_k = 1) = \frac{1}{3}\) et \(P(X_k = 0) = \frac{2}{3}\) : \(X_k\) suit la loi de Bernoulli de paramètre \(\frac{1}{3}\).`) +
        p(r`(b) \(E(X_k) = 0 \times P(X_k = 0) + 1 \times P(X_k = 1) = \frac{1}{3}\) ; \(E(X_k^2) = 0^2 \times P(X_k = 0) + 1^2 \times P(X_k = 1) = \frac{1}{3}\) ;`) +
        p(r`\(V(X_k) = E(X_k^2) - E(X_k)^2 = \frac{1}{3} - \frac{1}{9} = \frac{2}{9}\).`)) },
      { t: 'Question 2', html: model(p(r`(a) \(Y = X_1 + X_2 + \dots + X_{20}\).`) +
        p(r`(b) \(Y\) est la somme de 20 variables de Bernoulli de même paramètre \(\frac{1}{3}\), <b>indépendantes</b> (les réponses le sont) : \(Y\) suit la loi binomiale \(\mathcal{B}\left(20, \frac{1}{3}\right)\). Pour \(i \in \ent{0}{20}\) :`) +
        fm(r`P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}`) +
        p(r`(on choisit les \(i\) questions justes, \(\binom{20}{i}\) façons ; chaque configuration a la probabilité \(\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}\) par indépendance).`) +
        p(r`(c) Par la formule du binôme : \(\sum_{i=0}^{20} \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i} = \left(\frac{1}{3} + \frac{2}{3}\right)^{20} = 1\).`) +
        p(r`(d) Par linéarité, \(E(Y) = E(X_1) + \dots + E(X_{20}) = 20 \times \frac{1}{3} = \frac{20}{3}\). Comme \(X_1, \dots, X_{20}\) sont indépendantes, \(V(Y) = V(X_1) + \dots + V(X_{20}) = 20 \times \frac{2}{9} = \frac{40}{9}\).`)) +
        tool('law', { law: 'binom', n: 20, p: '1/3', name: 'Y', edit: false, title: 'Loi de Y : binomiale (20, 1/3)' }) }],
    answer: p(r`\(X_k \leadsto\) Bernoulli\(\left(\frac{1}{3}\right)\), \(E = \frac{1}{3}\), \(V = \frac{2}{9}\) ; \(Y = \sum X_k \leadsto \mathcal{B}(20, \frac{1}{3})\), \(P(Y = i) = \binom{20}{i}\left(\frac{1}{3}\right)^i\left(\frac{2}{3}\right)^{20-i}\) ; \(E(Y) = \frac{20}{3}\), \(V(Y) = \frac{40}{9}\).`),
    traps: [r`Écrire \(P(Y = i)\) comme une somme \(\sum \binom{20}{i} \dots\) : c’est <b>un seul</b> terme.`, r`Ne pas citer l’indépendance pour la loi binomiale et pour \(V(Y)\).`, r`Donner \(E\) et \(V\) sans les calculs (« parachuter ») : l’énoncé les exige.`],
    note: NOTE_TD2 + ' Exercice tombé tel quel à l’examen DP d’octobre 2023 (exercice 6).', near: ['p2023-dp-ex6', 'p2024-dp-ex6']
  });

  add({
    id: 'td2-5-22', ecue: 'dp', order: 3522, src: 'TD 2 · Ex 5.22',
    title: 'Réviser deux chapitres sur trois', topics: ['bayes', 'lois'], lvl: 2, time: 20,
    intro: p(r`(<b>Travail personnel</b>) Un examen de mathématiques de S1 porte sur un chapitre au hasard parmi trois. Un élève de cette classe, désirant profiter du beau soleil du mois de juin, choisit de ne réviser que deux de ces chapitres.`) +
      p(r`Si l’examen porte sur un chapitre étudié, l’élève a \(80\,\%\) de chances de valider son examen ; tandis que si l’examen porte sur le chapitre négligé, les chances de valider tombent à \(20\,\%\).`),
    questions: ['Représenter graphiquement ce problème.', 'Quelle est la probabilité que l’élève valide son examen ?', 'On suppose maintenant que l’élève a bien validé son examen. Quelle est la probabilité qu’il ait été interrogé sur un des chapitres révisés ?', 'L’ensemble des 40 élèves de cette classe choisit ce mode de révision. Donner la loi du nombre d’élèves validant leur examen, et calculer son espérance.'],
    hints: [r`\(R\) : « l’examen porte sur un chapitre révisé », \(P(R) = \frac{2}{3}\) ; \(V\) : « l’élève valide ».`, r`Question 3 : \(P(R \mid V)\), formule de Bayes.`],
    solution: [{ t: 'Correction', html: tool('tree', { first: [{ n: 'R', p: '2/3' }, { n: '\\overline{R}', p: '1/3' }], second: { n: 'V', nb: '\\overline{V}', p: ['4/5', '1/5'] }, edit: false, title: 'Chapitre révisé, puis validation' }) +
      model(p(r`2. \(\{R, \overline{R}\}\) est une partition : \(P(V) = P(V \mid R)P(R) + P(V \mid \overline{R})P(\overline{R}) = \frac{4}{5} \times \frac{2}{3} + \frac{1}{5} \times \frac{1}{3} = \frac{9}{15} = \frac{3}{5}\).`) +
        p(r`3. \(P(R \mid V) = \dfrac{P(V \mid R)P(R)}{P(V)} = \dfrac{8/15}{3/5} = \dfrac{8}{9}\).`) +
        p(r`4. En supposant les 40 élèves indépendants, chacun valide avec probabilité \(\frac{3}{5}\) : le nombre \(X\) d’élèves qui valident suit \(\mathcal{B}\left(40, \frac{3}{5}\right)\), et \(E(X) = 40 \times \frac{3}{5} = 24\).`)) +
      note(r`Modélisation : si tous passent le <b>même</b> examen, le chapitre tiré est commun ; les résultats ne sont indépendants que sachant le chapitre. La loi exacte est alors un mélange : \(\mathcal{B}(40, 0{,}8)\) avec probabilité \(\frac{2}{3}\), \(\mathcal{B}(40, 0{,}2)\) avec probabilité \(\frac{1}{3}\). L’espérance reste 24, la loi n’est pas binomiale. La réponse attendue au TD est \(\mathcal{B}(40, \frac{3}{5})\).`) }],
    answer: p(r`\(P(V) = \frac{3}{5}\) ; \(P(R \mid V) = \frac{8}{9}\) ; \(X \leadsto \mathcal{B}(40, \frac{3}{5})\), \(E(X) = 24\).`),
    traps: [r`Confondre \(P(V \mid R) = \frac{4}{5}\) et \(P(R \mid V) = \frac{8}{9}\).`],
    note: NOTE_TD2, near: ['p2024-dp-ex4']
  });

  add({
    id: 'td2-5-23', ecue: 'dp', order: 3523, src: 'TD 2 · Ex 5.23 (★)',
    title: 'Binomiale ou hypergéométrique : familles et échantillon', topics: ['lois', 'denombrement'], lvl: 3, time: 20,
    questions: [r`En région parisienne, pour chaque naissance la probabilité d’avoir un garçon est de \(46\,\%\). Déterminer la probabilité, pour une famille de 5 enfants, d’être composée de 2 garçons et 3 filles.`,
      'On considère maintenant un échantillon de 100 enfants, parmi lesquels on compte 46 garçons et 54 filles. Déterminer la probabilité que sur un ensemble de cinq enfants pris au hasard, on ait 2 garçons et 3 filles.',
      'Pourquoi les deux questions précédentes mènent-elles à des modélisations différentes et ainsi à des résultats légèrement différents ?'],
    hints: [r`1 : 5 naissances indépendantes, même probabilité : loi binomiale \(\mathcal{B}(5; 0{,}46)\).`, r`2 : on choisit 5 enfants parmi 100 sans remise : \(\frac{\binom{46}{2}\binom{54}{3}}{\binom{100}{5}}\).`],
    solution: [{ t: 'Correction', html: model(p(r`1. Le nombre \(G\) de garçons suit \(\mathcal{B}(5; 0{,}46)\) (naissances indépendantes) : \(P(G = 2) = \binom{5}{2}\, 0{,}46^2 \times 0{,}54^3 \approx 0{,}333\).`) +
        p(r`2. Les \(\binom{100}{5}\) groupes de 5 enfants sont équiprobables ; ceux à 2 garçons et 3 filles : \(\binom{46}{2}\binom{54}{3}\). Probabilité \(\dfrac{\binom{46}{2}\binom{54}{3}}{\binom{100}{5}} \approx 0{,}341\) (loi hypergéométrique).`)) +
      p(r`3. En 1, chaque naissance est une épreuve indépendante de probabilité fixe (comme un tirage <b>avec</b> remise) : loi binomiale. En 2, on tire <b>sans</b> remise dans une population finie : après un garçon, il en reste moins, les tirages ne sont pas indépendants : loi hypergéométrique. Les résultats sont proches parce que 5 est petit devant 100.`) }],
    answer: p(r`\(\binom{5}{2}0{,}46^2 \, 0{,}54^3 \approx 0{,}333\) ; \(\frac{\binom{46}{2}\binom{54}{3}}{\binom{100}{5}} \approx 0{,}341\) ; avec remise / sans remise.`),
    traps: [r`Oublier le coefficient \(\binom{5}{2}\) (le rang des deux garçons parmi les cinq enfants).`],
    note: NOTE_TD2, near: ['p2022-ex5']
  });

  /* =====================================================================================================
     Feuille « Probability Exercises » (en anglais sur le Moodle ; énoncés traduits)
     ===================================================================================================== */
  add({
    id: 'tdx-proba-1', ecue: 'dp', order: 4001, src: 'Feuille « Probability Exercises » · Ex 1',
    title: 'Un dé : pair, au moins 4', topics: ['probabilites'], lvl: 1, time: 3,
    intro: p('On lance une fois un dé équilibré à 6 faces.'),
    questions: ['Quelle est la probabilité d’obtenir un nombre pair ?', 'Quelle est la probabilité d’obtenir un nombre supérieur ou égal à 4 ?'],
    hints: [r`\(\Omega = \ent{1}{6}\), issues équiprobables : compte les cas favorables.`],
    solution: [{ t: 'Correction', html: model(p(r`\(\Omega = \ent{1}{6}\) muni de l’équiprobabilité. a) \(\{2, 4, 6\}\) : \(P = \frac{3}{6} = \frac{1}{2}\). b) \(\{4, 5, 6\}\) : \(P = \frac{3}{6} = \frac{1}{2}\).`)) }],
    answer: p(r`\(\frac{1}{2}\) et \(\frac{1}{2}\).`),
    traps: [r`Oublier 4 dans « supérieur ou égal à 4 ».`],
    note: NOTE_X
  });

  add({
    id: 'tdx-proba-2', ecue: 'dp', order: 4002, src: 'Feuille « Probability Exercises » · Ex 2',
    title: 'Deux dés : somme égale à 7', topics: ['probabilites'], lvl: 1, time: 3,
    intro: p('On lance deux dés équilibrés. Quelle est la probabilité que la somme des deux dés soit égale à 7 ?'),
    hints: [r`36 couples équiprobables ; liste ceux de somme 7.`],
    solution: [{ t: 'Correction', html: model(p(r`\(\Omega = \ent{1}{6}^2\), 36 couples équiprobables. Somme 7 : \((1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)\), soit 6 couples. \(P = \frac{6}{36} = \frac{1}{6}\).`)) }],
    answer: p(r`\(\frac{1}{6}\).`),
    traps: [r`Compter \(\{3, 4\}\) une seule fois : \((3, 4)\) et \((4, 3)\) sont deux issues différentes.`],
    note: NOTE_X, near: ['p2019-ex7']
  });

  add({
    id: 'tdx-proba-3', ecue: 'dp', order: 4003, src: 'Feuille « Probability Exercises » · Ex 3',
    title: 'Une carte d’un jeu de 52', topics: ['probabilites'], lvl: 1, time: 3,
    intro: p('Un jeu standard de 52 cartes comporte 4 couleurs de 13 cartes. On tire une carte au hasard.'),
    questions: ['Quelle est la probabilité que ce soit un cœur ?', 'Quelle est la probabilité que ce soit un roi ?', 'Quelle est la probabilité que ce soit le roi de cœur ?'],
    hints: [r`13 cœurs, 4 rois, un seul roi de cœur.`],
    solution: [{ t: 'Correction', html: p(r`52 cartes équiprobables. a) \(\frac{13}{52} = \frac{1}{4}\). b) \(\frac{4}{52} = \frac{1}{13}\). c) \(\frac{1}{52}\). On remarque \(\frac{1}{52} = \frac{1}{4} \times \frac{1}{13}\) : « cœur » et « roi » sont indépendants.`) }],
    answer: p(r`\(\frac{1}{4}\) ; \(\frac{1}{13}\) ; \(\frac{1}{52}\).`),
    traps: [r`Additionner « cœur » et « roi » pour « roi de cœur » : c’est l’intersection, pas l’union.`],
    note: NOTE_X, near: ['p2018-ex7']
  });

  add({
    id: 'tdx-proba-4', ecue: 'dp', order: 4004, src: 'Feuille « Probability Exercises » · Ex 4',
    title: 'Deux boules rouges sans remise', topics: ['probabilites', 'conditionnelles'], lvl: 1, time: 5,
    intro: p('Une urne contient 5 boules rouges et 3 boules bleues. On tire deux boules <b>sans remise</b>. Quelle est la probabilité que les deux boules soient rouges ?'),
    hints: [r`\(P(R_1 \cap R_2) = P(R_1)P(R_2 \mid R_1)\).`, r`Ou : \(\binom{5}{2}\) paires rouges parmi \(\binom{8}{2}\) paires.`],
    solution: [{ t: 'Correction', html: model(p(r`\(P(R_1 \cap R_2) = P(R_1)P(R_2 \mid R_1) = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56} = \frac{5}{14}\).`) + p(r`Contrôle par les paires : \(\frac{\binom{5}{2}}{\binom{8}{2}} = \frac{10}{28} = \frac{5}{14}\).`)) }],
    answer: p(r`\(\frac{5}{14} \approx 0{,}357\).`),
    traps: [r`Calculer \(\left(\frac{5}{8}\right)^2\) : ce serait avec remise.`],
    note: NOTE_X, near: ['p2019-ex6']
  });

  add({
    id: 'tdx-proba-5', ecue: 'dp', order: 4005, src: 'Feuille « Probability Exercises » · Ex 5',
    title: 'Au moins un 6 en quatre lancers', topics: ['probabilites'], lvl: 1, time: 5,
    intro: p('On lance un dé 4 fois. Quelle est la probabilité d’obtenir <b>au moins un</b> 6 ?'),
    hints: [r`Contraire : aucun 6, probabilité \(\frac{5}{6}\) à chaque lancer, lancers indépendants.`],
    solution: [{ t: 'Correction', html: model(p(r`L’événement contraire « aucun 6 » a pour probabilité \(\left(\frac{5}{6}\right)^4 = \frac{625}{1\,296}\) (lancers indépendants). Donc \(P(\text{au moins un } 6) = 1 - \frac{625}{1\,296} = \frac{671}{1\,296} \approx 0{,}518\).`)) }],
    answer: p(r`\(\frac{671}{1\,296} \approx 0{,}518\).`),
    traps: [r`Répondre \(4 \times \frac{1}{6} = \frac{2}{3}\) : les cas à plusieurs 6 sont comptés plusieurs fois (avec 7 lancers on dépasserait 1).`],
    note: NOTE_X
  });

  add({
    id: 'tdx-proba-6', ecue: 'dp', order: 4006, src: 'Feuille « Probability Exercises » · Ex 6',
    title: 'Trois boules simultanées : rouges et vertes', topics: ['probabilites', 'denombrement'], lvl: 1, time: 10,
    intro: p('Une urne contient 12 boules : 7 rouges et 5 vertes. On tire <b>simultanément</b> trois boules au hasard.'),
    questions: ['Quelle est la probabilité que les 3 boules soient rouges ?', 'Quelle est la probabilité qu’exactement 2 boules soient rouges (et 1 verte) ?', 'Quelle est la probabilité qu’au moins une boule soit verte ?'],
    hints: [r`\(\card \Omega = \binom{12}{3} = 220\).`, r`« Au moins une verte » est le contraire de « trois rouges ».`],
    solution: [{ t: 'Correction', html: p(r`Les \(\binom{12}{3} = 220\) tirages sont équiprobables.`) + ol([r`\(\frac{\binom{7}{3}}{220} = \frac{35}{220} = \frac{7}{44}\).`, r`\(\frac{\binom{7}{2}\binom{5}{1}}{220} = \frac{105}{220} = \frac{21}{44}\).`, r`\(1 - \frac{7}{44} = \frac{37}{44}\).`]) }],
    answer: p(r`\(\frac{7}{44}\) ; \(\frac{21}{44}\) ; \(\frac{37}{44}\).`),
    traps: [r`Oublier le facteur \(\binom{5}{1}\) pour la boule verte en b).`],
    note: NOTE_X, near: ['p2019-ex6']
  });

  add({
    id: 'tdx-proba-7', ecue: 'dp', order: 4007, src: 'Feuille « Probability Exercises » · Ex 7',
    title: 'Un comité de 4 élèves', topics: ['probabilites', 'denombrement'], lvl: 1, time: 10,
    intro: p('Une classe compte 15 élèves : 9 garçons et 6 filles. On choisit <b>simultanément</b> au hasard un comité de 4 élèves.'),
    questions: ['Quelle est la probabilité que le comité compte exactement 2 garçons et 2 filles ?', 'Quelle est la probabilité que le comité ne compte que des filles ?', 'Quelle est la probabilité que le comité compte au moins 1 garçon ?'],
    hints: [r`\(\card \Omega = \binom{15}{4} = 1\,365\).`, r`« Au moins un garçon » : contraire de « que des filles ».`],
    solution: [{ t: 'Correction', html: p(r`Les \(\binom{15}{4} = 1\,365\) comités sont équiprobables.`) + ol([r`\(\frac{\binom{9}{2}\binom{6}{2}}{1\,365} = \frac{36 \times 15}{1\,365} = \frac{540}{1\,365} = \frac{36}{91}\).`, r`\(\frac{\binom{6}{4}}{1\,365} = \frac{15}{1\,365} = \frac{1}{91}\).`, r`\(1 - \frac{1}{91} = \frac{90}{91}\).`]) }],
    answer: p(r`\(\frac{36}{91}\) ; \(\frac{1}{91}\) ; \(\frac{90}{91}\).`),
    traps: [r`Ordonner les membres du comité : il est choisi simultanément, ce sont des combinaisons.`],
    note: NOTE_X, near: ['p2022-ex4']
  });

  /* =====================================================================================================
     Feuille « Conditional Probability: Exercises » (en anglais sur le Moodle ; énoncés traduits)
     ===================================================================================================== */
  add({
    id: 'tdx-cond-1', ecue: 'dp', order: 4101, src: 'Feuille « Conditional Probability » · Ex 1',
    title: 'Deux dés : indépendants ou non ?', topics: ['independance'], lvl: 1, time: 10,
    intro: p(r`<em>Partie A : indépendance.</em> On lance deux dés équilibrés. Soit \(A\) = « le premier dé est pair », \(B\) = « la somme vaut 7 », \(C\) = « la somme vaut 8 ».`),
    questions: [r`Décrire \(\Omega\) et donner son cardinal.`, r`Montrer que \(A\) et \(B\) sont indépendants.`, r`Montrer que \(A\) et \(C\) ne sont <em>pas</em> indépendants.`],
    hints: [r`Liste \(A \cap B\) et \(A \cap C\).`, r`Compare \(P(A \cap B)\) et \(P(A)P(B)\).`],
    solution: [{ t: 'Correction', html: model(p(r`1. \(\Omega = \ent{1}{6}^2\), \(\card \Omega = 36\), muni de l’équiprobabilité.`) +
      p(r`2. \(P(A) = \frac{18}{36} = \frac{1}{2}\), \(P(B) = \frac{6}{36} = \frac{1}{6}\). \(A \cap B = \{(2, 5), (4, 3), (6, 1)\}\), donc \(P(A \cap B) = \frac{3}{36} = \frac{1}{12} = \frac{1}{2} \times \frac{1}{6}\) : \(A\) et \(B\) sont indépendants.`) +
      p(r`3. \(C = \{(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)\}\), \(P(C) = \frac{5}{36}\). \(A \cap C = \{(2, 6), (4, 4), (6, 2)\}\), \(P(A \cap C) = \frac{3}{36} = \frac{1}{12}\), alors que \(P(A)P(C) = \frac{5}{72}\) : pas indépendants.`)) }],
    answer: p(r`36 issues ; \(P(A \cap B) = \frac{1}{12} = P(A)P(B)\) ; \(P(A \cap C) = \frac{1}{12} \neq \frac{5}{72} = P(A)P(C)\).`),
    traps: [r`Croire que deux événements « sans lien apparent » sont forcément indépendants : on le vérifie par le calcul.`],
    note: NOTE_X, near: ['p2019-ex7']
  });

  add({
    id: 'tdx-cond-2', ecue: 'dp', order: 4102, src: 'Feuille « Conditional Probability » · Ex 2',
    title: 'Indépendance et complémentaires ; deux à deux contre mutuellement', topics: ['independance', 'demonstrations'], lvl: 2, time: 15,
    questions: [r`Montrer que si \(A\) et \(B\) sont indépendants, alors \(A\) et \(B^c\) sont indépendants. En déduire que \(A^c\) et \(B^c\) sont indépendants.`,
      r`On lance deux fois une pièce équilibrée. Soit \(A\) = « le premier lancer donne pile », \(B\) = « le second lancer donne pile », \(C\) = « les deux lancers donnent le même résultat ». Montrer que \(A, B, C\) sont indépendants deux à deux mais <em>pas</em> mutuellement indépendants.`],
    hints: [r`\(A = (A \cap B) \sqcup (A \cap B^c)\).`, r`Mutuellement : il faut en plus \(P(A \cap B \cap C) = P(A)P(B)P(C)\).`],
    solution: [{ t: 'Correction', html: model(p(r`1. \(A = (A \cap B) \sqcup (A \cap B^c)\), donc \(P(A \cap B^c) = P(A) - P(A \cap B) = P(A) - P(A)P(B) = P(A)(1 - P(B)) = P(A)P(B^c)\) : \(A\) et \(B^c\) sont indépendants.`) +
      p(r`En appliquant ce résultat au couple \((B^c, A)\) (indépendants), on obtient que \(B^c\) et \(A^c\) sont indépendants.`)) +
      p(r`2. \(\Omega = \{PP, PF, FP, FF\}\), équiprobable. \(P(A) = P(B) = P(C) = \frac{1}{2}\) ; \(A \cap B = A \cap C = B \cap C = \{PP\}\), de probabilité \(\frac{1}{4} = \frac{1}{2} \times \frac{1}{2}\) : indépendants deux à deux. Mais \(A \cap B \cap C = \{PP\}\) : \(P = \frac{1}{4} \neq \frac{1}{8} = P(A)P(B)P(C)\). Pas mutuellement indépendants.`) }],
    answer: p(r`\(P(A \cap B^c) = P(A)P(B^c)\) ; \(P(A \cap B \cap C) = \frac{1}{4} \neq \frac{1}{8}\).`),
    traps: [r`Croire que « deux à deux indépendants » suffit pour l’indépendance mutuelle.`],
    note: NOTE_X
  });

  add({
    id: 'tdx-cond-3', ecue: 'dp', order: 4103, src: 'Feuille « Conditional Probability » · Ex 3',
    title: 'Alice et Bob dans une rangée', topics: ['independance', 'denombrement'], lvl: 3, time: 20,
    intro: p(r`\(n\) personnes (\(n \ge 3\)), dont Alice et Bob, s’assoient au hasard sur une rangée. Soit \(A\) = « Alice et Bob sont voisins », \(B\) = « Alice est à une extrémité de la rangée ».`),
    questions: [r`Calculer \(P(A)\), \(P(B)\) et \(P(A \cap B)\) en fonction de \(n\).`, r`\(A\) et \(B\) sont-ils indépendants ? Traiter d’abord \(n = 8\), puis \(n\) quelconque.`],
    hints: [r`\(\Omega\) = les \(n!\) placements, équiprobables.`, r`\(A\) : colle Alice et Bob en un bloc (\(n - 1\) objets à ranger, et 2 ordres dans le bloc).`, r`\(A \cap B\) : Alice à un bout (2 choix), Bob juste à côté, les \(n - 2\) autres dans un ordre quelconque.`],
    solution: [{ t: 'Correction', html: model(p(r`1. \(\card \Omega = n!\). \(A\) : on range le bloc « Alice-Bob » et les \(n - 2\) autres, \((n - 1)!\) façons, et 2 ordres dans le bloc : \(P(A) = \frac{2(n - 1)!}{n!} = \frac{2}{n}\).`) +
      p(r`\(B\) : 2 places pour Alice, \((n - 1)!\) pour les autres : \(P(B) = \frac{2}{n}\). \(A \cap B\) : 2 places pour Alice, Bob à côté (1 place), \((n - 2)!\) : \(P(A \cap B) = \frac{2(n - 2)!}{n!} = \frac{2}{n(n - 1)}\).`) +
      p(r`2. Pour \(n = 8\) : \(P(A) = P(B) = \frac{1}{4}\), \(P(A \cap B) = \frac{1}{28} \neq \frac{1}{16}\) : pas indépendants.`) +
      p(r`En général, \(\frac{2}{n(n - 1)} = \frac{4}{n^2} \iff 2n = 4(n - 1) \iff n = 2\). Pour \(n \ge 3\), \(A\) et \(B\) ne sont jamais indépendants.`)) +
      p(r`Intuition : Alice à un bout n’a qu’un voisin au lieu de deux, ce qui rend « voisins » moins probable : \(P(A \mid B) = \frac{1}{n - 1} < \frac{2}{n}\).`) }],
    answer: p(r`\(P(A) = P(B) = \frac{2}{n}\), \(P(A \cap B) = \frac{2}{n(n - 1)}\) ; jamais indépendants pour \(n \ge 3\) (\(n = 8\) : \(\frac{1}{28} \neq \frac{1}{16}\)).`),
    traps: [r`Oublier le facteur 2 (Alice à gauche ou à droite de Bob) dans \(P(A)\).`],
    note: NOTE_X
  });

  add({
    id: 'tdx-cond-4', ecue: 'dp', order: 4104, src: 'Feuille « Conditional Probability » · Ex 4',
    title: 'Deux cartes sans remise : deux cœurs', topics: ['conditionnelles', 'independance'], lvl: 2, time: 10,
    intro: p(r`<em>Partie B : conditionnement et dénombrement.</em> On tire successivement 2 cartes, sans remise, d’un jeu standard de 52 cartes. Soit \(A\) = « la première carte est un cœur », \(B\) = « la deuxième carte est un cœur ».`),
    questions: [r`Calculer \(P(B \mid A)\) et \(P(B)\). \(A\) et \(B\) sont-ils indépendants ?`, 'Qu’est-ce qui change si la première carte est remise avant le second tirage ?'],
    hints: [r`Sachant \(A\), il reste 12 cœurs parmi 51 cartes.`, r`\(P(B)\) par les probabilités totales sur \(\{A, \overline{A}\}\).`],
    solution: [{ t: 'Correction', html: model(p(r`1. \(P(B \mid A) = \frac{12}{51} = \frac{4}{17}\). Par les probabilités totales : \(P(B) = P(B \mid A)P(A) + P(B \mid \overline{A})P(\overline{A}) = \frac{12}{51} \times \frac{13}{52} + \frac{13}{51} \times \frac{39}{52} = \frac{663}{2\,652} = \frac{1}{4}\).`) +
      p(r`\(P(B \mid A) = \frac{4}{17} \neq \frac{1}{4} = P(B)\) : \(A\) et \(B\) ne sont pas indépendants.`)) +
      p(r`2. Avec remise, la seconde carte est tirée dans le jeu complet : \(P(B \mid A) = \frac{13}{52} = \frac{1}{4} = P(B)\), \(A\) et \(B\) sont indépendants.`) +
      p(r`À retenir : sans remise, \(P(B) = \frac{1}{4}\) quand même (par symétrie, la deuxième carte a la même loi que la première).`) }],
    answer: p(r`\(P(B \mid A) = \frac{4}{17}\), \(P(B) = \frac{1}{4}\) : dépendants ; avec remise, indépendants.`),
    traps: [r`Croire que \(P(B)\) change sans remise : c’est \(P(B \mid A)\) qui change, pas \(P(B)\).`],
    note: NOTE_X
  });

  add({
    id: 'tdx-cond-5', ecue: 'dp', order: 4105, src: 'Feuille « Conditional Probability » · Ex 5',
    title: 'Trois machines et des pièces défectueuses', topics: ['conditionnelles', 'bayes'], lvl: 2, time: 15,
    intro: p(r`<em>Partie C : partitions et probabilités totales.</em> Trois machines \(M_1, M_2, M_3\) produisent \(50\,\%\), \(30\,\%\) et \(20\,\%\) des pièces d’une usine. Leurs taux de défauts sont \(1\,\%\), \(2\,\%\) et \(3\,\%\).`),
    questions: ['Calculer la probabilité qu’une pièce choisie au hasard soit défectueuse.', 'La pièce est défectueuse. Trouver la probabilité qu’elle ait été fabriquée par chaque machine.'],
    hints: [r`\(1\,\% = 0{,}01\).`, r`\(\{M_1, M_2, M_3\}\) est une partition ; \(P(M_i \mid D) = \frac{P(D \mid M_i)P(M_i)}{P(D)}\).`],
    solution: [{ t: 'Correction', html: tool('tree', { first: [{ n: 'M_1', p: '1/2' }, { n: 'M_2', p: '3/10' }, { n: 'M_3', p: '1/5' }], second: { n: 'D', nb: '\\overline{D}', p: ['1/100', '1/50', '3/100'] }, edit: false, title: 'Machine, puis défaut' }) +
      model(p(r`1. \(\{M_1, M_2, M_3\}\) est une partition de \(\Omega\) : \(P(D) = 0{,}5 \times 0{,}01 + 0{,}3 \times 0{,}02 + 0{,}2 \times 0{,}03 = 0{,}005 + 0{,}006 + 0{,}006 = 0{,}017 = \frac{17}{1\,000}\).`) +
        p(r`2. \(P(M_1 \mid D) = \frac{0{,}005}{0{,}017} = \frac{5}{17}\), \(P(M_2 \mid D) = \frac{0{,}006}{0{,}017} = \frac{6}{17}\), \(P(M_3 \mid D) = \frac{6}{17}\) (somme 1).`)) }],
    answer: p(r`\(P(D) = 0{,}017\) ; \(\frac{5}{17}\), \(\frac{6}{17}\), \(\frac{6}{17}\).`),
    traps: [r`Écrire \(1\,\% = 0{,}1\) : on trouve \(P(D) = 0{,}17\), dix fois trop. Les probabilités conditionnelles restent justes par compensation, ce qui cache l’erreur.`],
    note: NOTE_X, near: ['p2023-dp-ex4']
  });

  add({
    id: 'tdx-cond-6', ecue: 'dp', order: 4106, src: 'Feuille « Conditional Probability » · Ex 6',
    title: 'Deux urnes et un dé', topics: ['conditionnelles', 'bayes', 'denombrement'], lvl: 2, time: 15,
    intro: p(r`L’urne \(U_1\) contient 4 boules rouges et 6 bleues. L’urne \(U_2\) contient 7 rouges et 3 bleues. On lance un dé équilibré : si le résultat est 1 ou 2, on choisit \(U_1\), sinon \(U_2\). Puis on tire <em>simultanément</em> 3 boules de l’urne choisie.`),
    questions: [r`En utilisant la partition \(\{U_1, U_2\}\), calculer la probabilité de tirer exactement 2 boules rouges.`, r`Sachant qu’on a tiré exactement 2 boules rouges, quelle est la probabilité qu’elles viennent de \(U_1\) ?`],
    hints: [r`\(P(U_1) = \frac{1}{3}\). Dans une urne de 10 boules, \(\binom{10}{3} = 120\) tirages.`, r`\(P(E \mid U_1) = \frac{\binom{4}{2}\binom{6}{1}}{120}\).`],
    solution: [{ t: 'Correction', html: model(p(r`Soit \(E\) : « exactement 2 rouges ». \(P(U_1) = \frac{2}{6} = \frac{1}{3}\), \(P(U_2) = \frac{2}{3}\).`) +
      p(r`\(P(E \mid U_1) = \frac{\binom{4}{2}\binom{6}{1}}{\binom{10}{3}} = \frac{36}{120} = \frac{3}{10}\) et \(P(E \mid U_2) = \frac{\binom{7}{2}\binom{3}{1}}{\binom{10}{3}} = \frac{63}{120} = \frac{21}{40}\).`) +
      p(r`1. \(P(E) = \frac{3}{10} \times \frac{1}{3} + \frac{21}{40} \times \frac{2}{3} = \frac{1}{10} + \frac{7}{20} = \frac{9}{20}\).`) +
      p(r`2. \(P(U_1 \mid E) = \dfrac{P(E \mid U_1)P(U_1)}{P(E)} = \dfrac{1/10}{9/20} = \dfrac{2}{9}\).`)) +
      tool('tree', { first: [{ n: 'U_1', p: '1/3' }, { n: 'U_2', p: '2/3' }], second: { n: 'E', nb: '\\overline{E}', p: ['3/10', '21/40'] }, edit: false, title: 'Urne, puis exactement 2 rouges' }) }],
    answer: p(r`\(P(E) = \frac{9}{20}\) ; \(P(U_1 \mid E) = \frac{2}{9}\).`),
    traps: [r`Prendre \(P(U_1) = \frac{1}{2}\) : le dé donne \(U_1\) avec probabilité \(\frac{2}{6}\).`],
    note: NOTE_X, near: ['p2023-dp-ex4']
  });

  add({
    id: 'tdx-cond-7', ecue: 'dp', order: 4107, src: 'Feuille « Conditional Probability » · Ex 7',
    title: 'Test médical et maladie rare', topics: ['bayes'], lvl: 2, time: 10,
    intro: p(r`<em>Partie D : formule de Bayes.</em> Une maladie touche \(1\,\%\) d’une population. Un test est positif pour \(95\,\%\) des malades et pour \(10\,\%\) des personnes saines.`),
    questions: ['Calculer la probabilité qu’une personne prise au hasard ait un test positif.', 'Une personne a un test positif. Quelle est la probabilité qu’elle soit malade ? Commenter le résultat.'],
    hints: [r`\(M\) : malade, \(T\) : test positif. \(P(M) = 0{,}01\), \(P(T \mid M) = 0{,}95\), \(P(T \mid \overline{M}) = 0{,}1\).`],
    solution: [{ t: 'Correction', html: tool('tree', { first: [{ n: 'M', p: '1/100' }, { n: '\\overline{M}', p: '99/100' }], second: { n: 'T', nb: '\\overline{T}', p: ['19/20', '1/10'] }, edit: false, title: 'Malade, puis test' }) +
      model(p(r`1. \(\{M, \overline{M}\}\) est une partition : \(P(T) = 0{,}95 \times 0{,}01 + 0{,}1 \times 0{,}99 = 0{,}0095 + 0{,}099 = 0{,}1085 = \frac{217}{2\,000}\).`) +
        p(r`2. \(P(M \mid T) = \dfrac{P(T \mid M)P(M)}{P(T)} = \dfrac{0{,}0095}{0{,}1085} = \dfrac{19}{217} \approx 0{,}088\).`)) +
      p(r`Moins de 9 % des positifs sont malades : la maladie est rare, et les \(10\,\%\) de faux positifs portent sur \(99\,\%\) de la population. Un test positif doit être confirmé.`) }],
    answer: p(r`\(P(T) = \frac{217}{2\,000} = 0{,}1085\) ; \(P(M \mid T) = \frac{19}{217} \approx 8{,}8\,\%\).`),
    traps: [r`Répondre \(95\,\%\) à la question 2 : c’est \(P(T \mid M)\), pas \(P(M \mid T)\).`],
    note: NOTE_X, near: ['p2021-ex7', 'p2019-ex8']
  });

  /* ================================================================== pour data/en/maths/ex-td.js */
  window.MATHS_TD = { r: r, fmt: fmt, wrapQ: wrapQ, items: items, p: p, ul: ul, ol: ol, fm: fm, note: note, model: model, tbl: tbl, tool: tool, sag: sag, plot: plot,
    fig314: fig314, fig315: fig315, fig321: fig321, figSin: figSin, figSin4: figSin4, figTan: figTan, PI: PI };
})();
