/* QCM Physique : les questions de QCM des partiels de physique S1 (partiel 1), au programme de cette année.
   Sujets : novembre 2017 (p2017), 2018-2019 (p2018), mai 2018, section S1# (p2018s), 2019-2020 (p2019),
   2020-2021 (p2020), novembre 2021 (p2021), octobre 2022 (p2022). Ids phys-pAAAA-qN, N = numéro dans le sujet.
   Énoncés repris du sujet (notations des sujets : ρ et u⃗ρ pour r et u⃗r, V⃗ pour la vitesse).
   Écartées (hors programme 2026-2027) : produit vectoriel (2017 Q4, 2018 Q3, 2018# Q4, 2019 Q3), base de Frenet
   et abscisse curviligne (2017 Q6-7, 2018 Q7-8, 2018# Q7-8, 2020 Q5-6). Gardées avec une note : les deux questions
   sur les coordonnées cylindriques (2019 Q5, 2022 Q4), que le cours ne fait qu’évoquer.
   Bonne réponse : corrigé officiel quand il existe (mai 2018, 2019, 2020, 2021), sinon réponse vérifiée (2017, 2018)
   ou marques du correcteur sur une copie (2022). Corrigé officiel de 2021 : la Q1 entoure une réponse fausse et la
   Q3 n’a aucune bonne réponse ; les explications le disent.
   Recoupements : une question que le cours pose déjà (data/qcm/physique.js, chargé avant) porte same:'phys-c…' ;
   une question reposée à un autre partiel porte same: la première. REV.quiz.bank() la rattache à la question
   gardée, dont les ids (REV.quiz.ids) comprennent alors celui du partiel (filtres « Partiels », #p2021…). */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var T = window.QCM_TOPICS = window.QCM_TOPICS || {};
  /* noms des notions (déjà donnés par data/qcm/physique.js ; repris ici si ce fichier est chargé seul) */
  var NAMES = { 'phys-pva': 'Position, vitesse, accélération', 'phys-mouvement': 'Nature du mouvement', 'phys-trajectoire': 'Équation de la trajectoire',
    'phys-vecteurs': 'Composantes et produit scalaire', 'phys-polaires': 'Coordonnées et base polaires',
    'phys-polaires-va': 'Vitesse et accélération en polaires', 'phys-circulaire': 'Mouvement circulaire', 'phys-unites': 'Unités et homogénéité' };
  Object.keys(NAMES).forEach(function (k) { if (!T[k]) T[k] = NAMES[k]; });

  var C1 = 'physique/cours-1-cinematique.html', C2 = 'physique/cours-2-dynamique.html', C4 = 'physique/cours-4-polaires.html';

  /* ---------- figure des composantes d’une force (réutilisée par data/en/qcm/physique-annales.js) ----------
     o.forces : [{ deg: angle avec Ox en degrés (sens direct), sub: '1', lab: [dx, dy] décalage du nom }],
     o.alpha : { from: angle de l’axe de référence, to: angle de la force }, o.O : position du nom de l’origine. */
  var FIG = window.PHYS_QFIG = window.PHYS_QFIG || {};
  function r1(v) { return Math.round(v * 10) / 10; }
  function arrow(x1, y1, x2, y2, style, w) {
    var dx = x2 - x1, dy = y2 - y1, l = Math.sqrt(dx * dx + dy * dy), ux = dx / l, uy = dy / l, h = 8, b = 3.6;
    var bx = x2 - h * ux, by = y2 - h * uy;
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(bx) + '" y2="' + r1(by) + '" style="stroke:' + style + ';stroke-width:' + w + '"/>' +
      '<polygon points="' + r1(x2) + ',' + r1(y2) + ' ' + r1(bx - b * uy) + ',' + r1(by + b * ux) + ' ' + r1(bx + b * uy) + ',' + r1(by - b * ux) + '" style="fill:' + style + '"/>';
  }
  var MATH = 'font-family="\'STIX Two Text\',\'Cambria Math\',serif"';
  FIG.force = function (o) {
    var cx = 110, cy = 86, L = 62, rad = Math.PI / 180, s = '';
    s += '<line x1="16" y1="' + cy + '" x2="196" y2="' + cy + '" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/>' + arrow(190, cy, 204, cy, 'currentColor', 1.2);
    s += '<line x1="' + cx + '" y1="160" x2="' + cx + '" y2="18" stroke="currentColor" stroke-width="1.2" stroke-dasharray="5 4"/>' + arrow(cx, 22, cx, 8, 'currentColor', 1.2);
    s += '<text x="198" y="' + (cy + 17) + '" ' + MATH + ' font-size="15" font-style="italic" fill="currentColor">x</text>';
    s += '<text x="' + (cx + 8) + '" y="16" ' + MATH + ' font-size="15" font-style="italic" fill="currentColor">y</text>';
    s += '<text x="' + (cx + o.O[0]) + '" y="' + (cy + o.O[1]) + '" font-size="13" fill="currentColor">O</text>';
    if (o.alpha) {
      var a1 = o.alpha.from * rad, a2 = o.alpha.to * rad, R = 24, d = o.alpha.to - o.alpha.from, mid = (a1 + a2) / 2;
      s += '<path d="M' + r1(cx + R * Math.cos(a1)) + ' ' + r1(cy - R * Math.sin(a1)) + 'A' + R + ' ' + R + ' 0 0 ' + (d > 0 ? 0 : 1) + ' ' +
        r1(cx + R * Math.cos(a2)) + ' ' + r1(cy - R * Math.sin(a2)) + '" fill="none" stroke="currentColor" stroke-width="1.2"/>';
      s += '<text x="' + r1(cx + 37 * Math.cos(mid)) + '" y="' + r1(cy - 37 * Math.sin(mid) + 5) + '" ' + MATH + ' font-size="15" font-style="italic" fill="currentColor" text-anchor="middle">α</text>';
    }
    o.forces.forEach(function (f) {
      var a = f.deg * rad, tx = cx + L * Math.cos(a), ty = cy - L * Math.sin(a);
      var lx = cx + (L + 16) * Math.cos(a) + (f.lab ? f.lab[0] : 0) - 6, ly = cy - (L + 16) * Math.sin(a) + 6 + (f.lab ? f.lab[1] : 0);
      s += arrow(cx, cy, tx, ty, 'var(--accent)', 2.2);
      s += '<text x="' + r1(lx) + '" y="' + r1(ly) + '" ' + MATH + ' font-size="15" font-style="italic" style="fill:var(--accent)">F<tspan font-size="10.5" dy="3.5" font-style="normal">' + f.sub + '</tspan></text>' +
        '<path d="M' + r1(lx + 1) + ' ' + r1(ly - 13) + 'h8m-2.6 -2.2 2.6 2.2 -2.6 2.2" fill="none" stroke-width="1" style="stroke:var(--accent)"/>';
    });
    return '<svg viewBox="0 0 220 168" width="220" role="img" aria-label="' + o.alt + '">' + s + '</svg>';
  };
  /* les quatre schémas des sujets (angles relevés sur les figures d’origine) */
  var F2017 = { forces: [{ deg: 50, sub: '1' }], alpha: { from: 90, to: 50 }, O: [-14, 16] };
  var F2018 = { forces: [{ deg: -35, sub: '1' }, { deg: 180, sub: '2', lab: [6, -14] }], alpha: { from: -90, to: -35 }, O: [-14, -6] };
  var F2018S = { forces: [{ deg: 130, sub: '1' }], alpha: { from: 90, to: 130 }, O: [6, 16] };
  var F2019 = { forces: [{ deg: 208, sub: '1' }], alpha: { from: 270, to: 208 }, O: [6, -6] };
  FIG.F2017 = F2017; FIG.F2018 = F2018; FIG.F2018S = F2018S; FIG.F2019 = F2019;
  function fig(base, alt) { var o = {}; for (var k in base) o[k] = base[k]; o.alt = alt; return FIG.force(o); }

  var A_UR = 'Le vecteur accélération en coordonnées polaires est donné par {a} = (`ρ̈` − `ρ θ̇`²) {u_ρ} + (2`ρ̇ θ̇` + `ρ θ̈`) {u_θ}. ';
  var V_POL = ['{V} = `ρ̇` {u_ρ} + `θ̇` {u_θ}', '{V} = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}', '{V} = `ρ` {u_ρ} + `θ̇` {u_θ}'];
  var ACC_R = ['{a} = (0 ; `R θ̈`)', '{a} = (−`R θ̇`² ; `R θ̈`)', '{a} = (−`R θ̇`² ; 0)', '{a} = (`R θ̇`² ; 0)'];
  var ACC_R2 = ['{a} = (0 ; `R θ̈`)', '{a} = (`R θ̇`² ; 0)', '{a} = (−`R θ̇`² ; `R θ̈`)', '{a} = (−`R θ̇`² ; 0)'];
  var DUR = ['d{u_ρ}/d`t` = −`θ̇` {u_θ}', 'd{u_ρ}/d`t` = {0}', 'd{u_ρ}/d`t` = `θ̇` {u_ρ}', 'd{u_ρ}/d`t` = `θ̇` {u_θ}'];
  var X_VPOL = 'Les sujets notent ρ et {u_ρ} ce que le cours note `r` et {u_r}. {V} = d(`ρ` {u_ρ})/d`t` = `ρ̇` {u_ρ} + `ρ` d{u_ρ}/d`t` = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}. Sans le facteur `ρ`, la seconde composante serait en rad·s⁻¹, pas en m·s⁻¹ ; sans elle, on oublie que la base tourne.';
  var X_DUR = '{u_ρ} = cos θ {u_x} + sin θ {u_y} tourne avec le point : sa dérivée par rapport à θ vaut {u_θ}, et on multiplie par dθ/d`t` = `θ̇`. Ce n’est donc ni {0}, ni colinéaire à {u_ρ} : un vecteur de norme constante a une dérivée qui lui est perpendiculaire.';
  var X_PS = '{V_1} · {V_2} = ‖{V_1}‖ ‖{V_2}‖ cos θ, avec θ = 180° pour deux vecteurs de sens opposés : cos θ = −1, le produit vaut −‖{V_1}‖ ‖{V_2}‖, strictement négatif pour des vecteurs non nuls. C’est le cas {v} · {a} &lt; 0 d’un mouvement décéléré. Le produit scalaire est nul pour deux vecteurs orthogonaux.';

  var Q = [
    /* ================= novembre 2017 (pas de corrigé officiel) ================= */
    { id: 'phys-p2017-q1', topic: 'phys-vecteurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2017 · QCM · Q1',
      q: 'La norme de la résultante {R} de deux vecteurs forces {F_1} et {F_2} (non nuls), colinéaires et de sens opposé est',
      o: ['`R` = 0', '`R` = √(`F_1`² + `F_2`²)', '`R` = `F_1` + `F_2`', '`R` = |`F_1` − `F_2`|'], a: 3,
      x: 'Pas de corrigé officiel ; réponse vérifiée. Deux forces de même direction et de sens opposés se retranchent : la norme de leur somme est la différence des normes, en valeur absolue puisqu’une norme est positive. `R` = 0 seulement si `F_1` = `F_2` ; √(`F_1`² + `F_2`²) vaut pour deux forces perpendiculaires ; `F_1` + `F_2` pour deux forces de même sens.',
      ref: C2 + '#s2' },
    { id: 'phys-p2017-q2', topic: 'phys-vecteurs', lvl: 2, type: 'single', keep: true, src: 'Partiel 2017 · QCM · Q2',
      fig: fig(F2017, 'Repère O, x, y. Le vecteur F1 part de O vers le haut et la droite ; α est l’angle entre l’axe Oy et F1.'),
      q: 'Les composantes du vecteur force {F_1} sur le schéma ci-dessous sont :',
      o: ['{F_1} = (`F_1` ; 0)', '{F_1} = (`F_1` sin α ; `F_1` cos α)', '{F_1} = (`F_1` cos α ; `F_1` sin α)'], a: 1,
      x: 'Pas de corrigé officiel ; réponse vérifiée. α est mesuré depuis l’axe O`y`, pas depuis O`x` : le côté adjacent à α est sur `y` et prend le cosinus ; le sinus va sur `x`. {F_1} pointe vers le haut et la droite : les deux composantes sont positives. (`F_1` cos α ; `F_1` sin α) serait juste si α était mesuré depuis O`x`.',
      ref: C2 + '#s8' },
    { id: 'phys-p2017-q3', topic: 'phys-vecteurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2017 · QCM · Q3',
      q: 'Le produit scalaire entre deux vecteurs colinéaires et de sens opposé est',
      o: ['strictement positif', 'nul', 'strictement négatif'], a: 2,
      x: 'Pas de corrigé officiel ; la même question en mai 2018 et en 2019 a pour réponse officielle « strictement négatif ». ' + X_PS,
      ref: C1 + '#s4' },
    { id: 'phys-p2017-q5', same: 'phys-c4-15', topic: 'phys-polaires-va', lvl: 1, type: 'single', keep: true, src: 'Partiel 2017 · QCM · Q5',
      q: 'Le vecteur vitesse en coordonnées polaires s’écrit :', o: V_POL, a: 1,
      x: 'Pas de corrigé officiel ; réponse vérifiée. ' + X_VPOL, ref: C4 + '#s5' },
    { id: 'phys-p2017-q8', topic: 'phys-trajectoire', lvl: 2, type: 'single', keep: true, src: 'Partiel 2017 · QCM · Q8',
      q: 'L’équation de la trajectoire dont les équations horaires sont `x`(`t`) = `A` sin(ω`t`) et `y`(`t`) = `B` cos(ω`t`) (où `A`, `B` et ω sont des constantes positives, `A` ≠ `B`) est :',
      o: ['`x`² + `y`² = 1', '`x`² + `y`² = `A`² + `B`²', '`x`²/`A`² + `y`²/`B`² = 1'], a: 2,
      x: 'Pas de corrigé officiel ; réponse vérifiée. sin(ω`t`) = `x`/`A` et cos(ω`t`) = `y`/`B` ; sin² + cos² = 1 donne `x`²/`A`² + `y`²/`B`² = 1 : une ellipse de centre O, de demi-axes `A` (sur O`x`) et `B` (sur O`y`). Additionner `x`² et `y`² ne fait pas disparaître le temps quand `A` ≠ `B`.',
      ref: C1 + '#s7' },

    /* ================= 2018-2019 (pas de corrigé officiel) ================= */
    { id: 'phys-p2018-q1', topic: 'phys-vecteurs', lvl: 2, type: 'single', keep: true, src: 'Partiel 2018 · QCM · Q1',
      fig: fig(F2018, 'Repère O, x, y. Le vecteur F1 part de O vers le bas et la droite ; α est l’angle entre la partie négative de l’axe Oy et F1. Le vecteur F2 part de O le long de l’axe Ox, vers les x négatifs.'),
      q: 'Les composantes du vecteur force {F_1} sur le schéma ci-dessous sont :',
      o: ['{F_1} = (`F_1` cos α ; −`F_1` sin α)', '{F_1} = (−`F_1` sin α ; `F_1` cos α)', '{F_1} = (`F_1` sin α ; −`F_1` cos α)'], a: 2,
      x: 'Pas de corrigé officiel ; réponse vérifiée. α est mesuré depuis la partie négative de l’axe O`y` : le côté adjacent (cosinus) est sur `y`, vers le bas, d’où −`F_1` cos α ; le sinus va sur `x`, vers la droite, d’où +`F_1` sin α. Méthode : repère le côté adjacent à l’angle, puis lis les signes sur le dessin.',
      ref: C2 + '#s8' },
    { id: 'phys-p2018-q2', topic: 'phys-vecteurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · QCM · Q2',
      fig: fig(F2018, 'Repère O, x, y. Le vecteur F1 part de O vers le bas et la droite. Le vecteur F2 part de O le long de l’axe Ox, vers les x négatifs.'),
      q: 'Les composantes du vecteur force {F_2} sur le schéma ci-dessous sont :',
      o: ['{F_2} = (−`F_2` ; 0)', '{F_2} = (`F_2` ; 0)', '{F_2} = (0 ; −`F_2`)'], a: 0,
      x: 'Pas de corrigé officiel ; réponse vérifiée. {F_2} est porté par l’axe O`x` et pointe vers les `x` négatifs : composante −`F_2` sur `x`, rien sur `y`. `F_2` est une norme, positive : le signe vient du sens.',
      ref: C2 + '#s8' },
    { id: 'phys-p2018-q4', same: 'phys-c4-15', topic: 'phys-polaires-va', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018 · QCM · Q4',
      q: 'Le vecteur vitesse en coordonnées polaires s’écrit :', o: V_POL, a: 1,
      x: 'Pas de corrigé officiel ; même question qu’en 2017. ' + X_VPOL, ref: C4 + '#s5' },
    { id: 'phys-p2018-q6', same: 'phys-c4-24', topic: 'phys-circulaire', lvl: 2, type: 'single', keep: true, src: 'Partiel 2018 · QCM · Q6',
      q: A_UR + 'Dans le cas d’un mouvement circulaire accéléré et de rayon `R`, le vecteur accélération s’écrit', o: ACC_R, a: 1,
      x: 'Pas de corrigé officiel ; réponse vérifiée. Circulaire : ρ = `R` constant, donc `ρ̇` = `ρ̈` = 0. Accéléré : `θ̇` varie, `θ̈` ≠ 0, et la composante `R θ̈` reste. La composante −`R θ̇`² ne disparaît jamais tant que le point tourne.',
      ref: C4 + '#s7' },

    /* ================= mai 2018, section S1# (corrigé officiel) ================= */
    { id: 'phys-p2018s-q1', topic: 'phys-vecteurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018# · QCM · Q1',
      q: 'La norme de la résultante {R} de deux vecteurs forces {F_1} et {F_2} (non nuls) et orthogonaux est',
      o: ['`R` = 0', '`R` = |`F_1` − `F_2`|', '`R` = `F_1` + `F_2`', '`R` = √(`F_1`² + `F_2`²)'], a: 3,
      x: 'Corrigé officiel : d. Deux vecteurs orthogonaux sont les côtés d’un rectangle, et leur somme en est la diagonale : Pythagore, `R` = √(`F_1`² + `F_2`²). Avec 3 N et 4 N, on trouve 5 N, pas 7 N.',
      ref: C2 + '#s2' },
    { id: 'phys-p2018s-q2', topic: 'phys-vecteurs', lvl: 2, type: 'single', keep: true, src: 'Partiel 2018# · QCM · Q2',
      fig: fig(F2018S, 'Repère O, x, y. Le vecteur F1 part de O vers le haut et la gauche ; α est l’angle entre l’axe Oy et F1.'),
      q: 'Les composantes du vecteur force {F_1} sur le schéma ci-dessous sont :',
      o: ['{F_1} = (`F_1` sin α ; −`F_1` cos α)', '{F_1} = (−`F_1` sin α ; `F_1` cos α)', '{F_1} = (−`F_1` cos α ; `F_1` sin α)'], a: 1,
      x: 'Corrigé officiel : b. α est mesuré depuis l’axe O`y` : cosinus sur `y`, sinus sur `x`. {F_1} pointe vers le haut et la gauche : composante négative sur `x`, positive sur `y`.',
      ref: C2 + '#s8' },
    { id: 'phys-p2018s-q3', same: 'phys-p2017-q3', topic: 'phys-vecteurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018# · QCM · Q3',
      q: 'Le produit scalaire entre deux vecteurs colinéaires et de sens opposé est',
      o: ['strictement négatif', 'nul', 'strictement positif'], a: 0,
      x: 'Corrigé officiel : a, strictement négatif. ' + X_PS, ref: C1 + '#s4' },
    { id: 'phys-p2018s-q5', same: 'phys-c4-15', topic: 'phys-polaires-va', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018# · QCM · Q5',
      q: 'Le vecteur vitesse en coordonnées polaires s’écrit :', o: [V_POL[1], V_POL[0], V_POL[2]], a: 0,
      x: 'Corrigé officiel : a. ' + X_VPOL, ref: C4 + '#s5' },
    { id: 'phys-p2018s-q6', same: 'phys-c4-23', topic: 'phys-circulaire', lvl: 1, type: 'single', keep: true, src: 'Partiel 2018# · QCM · Q6',
      q: A_UR + 'Dans le cas d’un mouvement circulaire uniforme de rayon `R`, le vecteur accélération s’écrit', o: ACC_R, a: 2,
      x: 'Corrigé officiel : c. Circulaire : `ρ̇` = `ρ̈` = 0 ; uniforme : `θ̇` constant, donc `θ̈` = 0. Il reste −`R θ̇`² sur {u_ρ} : l’accélération est centripète, pas nulle.',
      ref: C4 + '#s7' },

    /* ================= 2019-2020 (corrigé officiel avec barème) ================= */
    { id: 'phys-p2019-q1', same: 'phys-p2017-q3', topic: 'phys-vecteurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2019 · QCM · Q1',
      q: 'Le produit scalaire de deux vecteurs non nuls, colinéaires et de sens opposés est',
      o: ['strictement positif', 'nul', 'strictement négatif'], a: 2,
      x: 'Corrigé officiel : c. ' + X_PS, ref: C1 + '#s4' },
    { id: 'phys-p2019-q2', topic: 'phys-vecteurs', lvl: 2, type: 'single', keep: true, src: 'Partiel 2019 · QCM · Q2',
      fig: fig(F2019, 'Repère O, x, y. Le vecteur F1 part de O vers le bas et la gauche ; α est l’angle entre la partie négative de l’axe Oy et F1.'),
      q: 'Les composantes du vecteur force {F_1} représenté sur le schéma ci-dessous sont :',
      o: ['{F_1} = (−`F_1` cos α ; `F_1` sin α)', '{F_1} = (−`F_1` sin α ; −`F_1` cos α)', '{F_1} = (−`F_1` sin α ; `F_1` cos α)'], a: 1,
      x: 'Corrigé officiel : b. α est mesuré depuis la partie négative de l’axe O`y` : cosinus sur `y`, sinus sur `x`. {F_1} pointe vers le bas et la gauche : les deux composantes sont négatives.',
      ref: C2 + '#s8' },
    { id: 'phys-p2019-q4', topic: 'phys-polaires', lvl: 2, type: 'single', keep: true, src: 'Partiel 2019 · QCM · Q4',
      q: 'La dérivée par rapport à la variable `t` de la fonction `f`(`t`) = `A` cos²(θ(`t`)), `A` étant une constante, s’écrit',
      o: ['d`f`/d`t` = 2`A θ̇` cos(θ) sin(θ)', 'd`f`/d`t` = −2`A θ̇` cos(θ) sin(θ)', 'd`f`/d`t` = 2`A` cos(θ) sin(θ)'], a: 1,
      x: 'Corrigé officiel : b. Deux dérivées composées emboîtées : (`u`²)′ = 2`u u`′ avec `u` = cos θ, et (cos θ)′ = −`θ̇` sin θ. D’où −2`A θ̇` cos θ sin θ. Les deux autres réponses oublient le signe moins ou le facteur `θ̇`.',
      ref: C4 + '#s3' },
    { id: 'phys-p2019-q5', topic: 'phys-polaires-va', lvl: 2, type: 'single', keep: true, src: 'Partiel 2019 · QCM · Q5',
      q: 'Le vecteur vitesse en coordonnées cylindriques s’écrit :',
      o: ['{V} = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}', '{V} = `ρ` {u_ρ} + `ρ θ̇` {u_θ} + `ż` {u_z}', '{V} = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ} + `ż` {u_z}'], a: 2,
      x: 'Corrigé officiel : c. Les cylindriques ajoutent aux polaires la cote `z`, sur un axe fixe {u_z} : {OM} = `ρ` {u_ρ} + `z` {u_z}. En dérivant, on ajoute `ż` {u_z} à la vitesse en polaires. À la limite du programme : le cours de cette année ne traite que les polaires, la fiche d’aide du Moodle montre les cylindriques.',
      ref: C4 + '#s8' },
    { id: 'phys-p2019-q6', same: 'phys-c4-24', topic: 'phys-circulaire', lvl: 2, type: 'single', keep: true, src: 'Partiel 2019 · QCM · Q6',
      q: A_UR + 'Dans le cas d’un mouvement circulaire décéléré, de rayon `R`, le vecteur accélération s’écrit', o: ACC_R2, a: 2,
      x: 'Corrigé officiel : c. Circulaire : `ρ̇` = `ρ̈` = 0. Décéléré ne change pas l’expression : `θ̈` est seulement de signe opposé à `θ̇`. Il reste −`R θ̇`² sur {u_ρ} et `R θ̈` sur {u_θ}.',
      ref: C4 + '#s7' },
    { id: 'phys-p2019-q7', same: 'phys-c4-08', topic: 'phys-polaires', lvl: 1, type: 'single', keep: true, src: 'Partiel 2019 · QCM · Q7',
      q: 'Le vecteur unitaire {u_ρ} des coordonnées polaires vérifie :', o: DUR, a: 3,
      x: 'Corrigé officiel : d. ' + X_DUR, ref: C4 + '#s3' },
    { id: 'phys-p2019-q8', topic: 'phys-polaires', lvl: 2, type: 'single', keep: true, src: 'Partiel 2019 · QCM · Q8',
      q: 'Les équations horaires d’un mouvement en coordonnées polaires sont `ρ`(`t`) = `ρ_0` e<sup>ω`t`</sup> et θ(`t`) = ω`t` ; `ρ_0` et ω sont des constantes positives. Les équations horaires en coordonnées cartésiennes de ce mouvement s’écrivent :',
      o: ['`x`(`t`) = `ρ_0` sin(ω`t`) ; `y`(`t`) = `ρ_0` cos(ω`t`)', '`x`(`t`) = `ρ_0` e<sup>ω`t`</sup> cos(ω`t`) ; `y`(`t`) = `ρ_0` e<sup>ω`t`</sup> sin(ω`t`)', '`x`(`t`) = `ρ_0` e<sup>ω`t`</sup> sin(ω`t`) ; `y`(`t`) = `ρ_0` e<sup>ω`t`</sup> cos(ω`t`)'], a: 1,
      x: 'Corrigé officiel : b. `x` = `ρ` cos θ et `y` = `ρ` sin θ, avec `ρ` = `ρ_0` e<sup>ω`t`</sup> et θ = ω`t`. Le cosinus va sur `x` parce que θ est mesuré depuis O`x`. La première réponse oublie l’exponentielle. Le point décrit une spirale.',
      ref: C4 + '#s8' },

    /* ================= 2020-2021 (corrigé officiel) ================= */
    { id: 'phys-p2020-q1', same: 'phys-c4-15', topic: 'phys-polaires-va', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · QCM · Q1',
      q: 'Le vecteur vitesse en coordonnées polaires s’écrit :',
      o: ['{V} = `ρ` {u_ρ} + `ρ θ̇` {u_θ}', '{V} = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}', '{V} = `ρ̇` {u_ρ} + `ρ θ̈` {u_θ}'], a: 1,
      x: 'Corrigé officiel : b. ' + X_VPOL + ' On dérive une seule fois : `ρ` au lieu de `ρ̇`, ou `θ̈` au lieu de `θ̇`, ce sont des dérivées oubliées ou en trop.', ref: C4 + '#s5' },
    { id: 'phys-p2020-q2', same: 'phys-c4-08', topic: 'phys-polaires', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · QCM · Q2',
      q: 'Le vecteur unitaire {u_ρ} des coordonnées polaires vérifie :', o: DUR, a: 3,
      x: 'Corrigé officiel : d. ' + X_DUR, ref: C4 + '#s3' },
    { id: 'phys-p2020-q3', same: 'phys-c4-23', topic: 'phys-circulaire', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · QCM · Q3',
      q: A_UR + 'Dans le cas d’un mouvement circulaire uniforme, de rayon `R`, le vecteur accélération s’écrit :', o: ACC_R2, a: 3,
      x: 'Corrigé officiel : d. Circulaire : `ρ̇` = `ρ̈` = 0 ; uniforme : `θ̈` = 0. Il reste −`R θ̇`² sur {u_ρ} : l’accélération est dirigée vers le centre.',
      ref: C4 + '#s7' },
    { id: 'phys-p2020-q4', topic: 'phys-pva', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · QCM · Q4',
      q: 'Un point est mobile dans le plan (`x`, `y`) à partir de la date `t` = 1 s. Ses équations horaires sont `x`(`t`) = ln(`t`) et `y`(`t`) = `t` + 1/`t`. Le vecteur vitesse de ce mouvement en coordonnées cartésiennes est :',
      o: ['{V}(`t`) = (1/`t` ; 1 + 1/`t`²)', '{V}(`t`) = (1/`t` ; 1 − 1/`t`²)', '{V}(`t`) = (1 ; 1 − 1/`t`²)'], a: 1,
      x: 'Corrigé officiel : b. (ln `t`)′ = 1/`t` ; (1/`t`)′ = −1/`t`², d’où `ẏ` = 1 − 1/`t`². Le piège est le signe moins de la dérivée de 1/`t`.',
      ref: C1 + '#s3' },
    { id: 'phys-p2020-q7', topic: 'phys-pva', lvl: 1, type: 'single', keep: true, src: 'Partiel 2020 · QCM · Q7',
      q: 'Le vecteur vitesse d’un mouvement d’équations horaires `x`(`t`) = −2`t`³ − `t` et `y`(`t`) = 4`t`² est :',
      o: ['{V} = (−6`t` − 1 ; 8`t`)', '{V} = (−6`t`² − 1 ; 8`t`)', '{V} = (−2`t`² − 1 ; 8`t`)'], a: 1,
      x: 'Corrigé officiel : b. (`t`³)′ = 3`t`² : l’exposant descend en facteur et diminue de 1. Donc (−2`t`³)′ = −6`t`², (−`t`)′ = −1 et (4`t`²)′ = 8`t`.',
      ref: C1 + '#s3' },
    { id: 'phys-p2020-q8', topic: 'phys-trajectoire', lvl: 2, type: 'single', keep: true, src: 'Partiel 2020 · QCM · Q8',
      q: 'On considère un mouvement dans le plan (`x`, `y`) dont les équations horaires sont `x`(`t`) = `R` cos(ω`t`) et `y`(`t`) = `R` sin(ω`t`), où `R` et ω sont des constantes positives. L’équation de la trajectoire de ce mouvement s’écrit :',
      o: ['`x`² + `y`² = `R`', '`x`² + `y`² = (`R` ω)²', '`x`²/`R`² + `y`²/`R`² = 1', '`x`² − `y`² = `R`²'], a: 2,
      x: 'Corrigé officiel : c. cos² + sin² = 1 donne `x`² + `y`² = `R`², qui s’écrit aussi `x`²/`R`² + `y`²/`R`² = 1 : un cercle de centre O et de rayon `R`. La forme habituelle n’était pas proposée telle quelle : il fallait la reconnaître. `x`² + `y`² = `R` n’est pas homogène (des m² d’un côté, des m de l’autre).',
      ref: C1 + '#s7' },

    /* ================= novembre 2021 (corrigé officiel ; sujet aussi en anglais) ================= */
    { id: 'phys-p2021-q1', topic: 'phys-mouvement', lvl: 1, type: 'single', keep: true, src: 'Partiel 2021 · Ex 1 · Q1',
      q: 'Un mouvement est dit uniforme si',
      o: ['Sa trajectoire est une ligne droite.', 'Son accélération est constante au cours du temps.', 'Sa vitesse est constante au cours du temps.', 'Sa vitesse et son accélération varient très peu avec le temps.'], a: 2,
      x: 'Bonne réponse : c, la norme de la vitesse est constante. Attention : le corrigé officiel entoure d, c’est une erreur ; « varient très peu » ne définit rien. Une trajectoire droite, c’est un mouvement rectiligne ; une accélération constante, un mouvement uniformément varié. Un mouvement circulaire peut être uniforme.',
      ref: C1 + '#s5' },
    { id: 'phys-p2021-q2', same: 'phys-c4-12', topic: 'phys-polaires', lvl: 1, type: 'single', keep: true, src: 'Partiel 2021 · Ex 1 · Q2',
      q: 'En coordonnées polaires ({u_ρ}, {u_θ}), le vecteur position {OM}(`t`) est donné par',
      o: ['{OM}(`t`) = `ρ` {u_ρ} + θ {u_θ}', '{OM}(`t`) = `ρ` {u_ρ}', '{OM}(`t`) = θ {u_ρ} + `ρ` {u_θ}', '{OM}(`t`) = `ρ` {u_θ}'], a: 1,
      x: 'Corrigé officiel : b. {u_ρ} est dirigé selon {OM} et OM = `ρ`, donc {OM} = `ρ` {u_ρ}, sans composante sur {u_θ}. θ est un angle, sans dimension : il ne peut pas être la composante d’un vecteur en mètres.',
      ref: C4 + '#s4' },
    { id: 'phys-p2021-q3', topic: 'phys-mouvement', lvl: 2, type: 'single', keep: true, src: 'Partiel 2021 · Ex 1 · Q3',
      q: 'Un mobile décrit un trajet rectiligne le long de l’axe (O`x`). Son équation horaire s’écrit `x`(`t`) = 10 − 2`t`².',
      o: ['Le mouvement est uniforme', 'Le mouvement est uniformément circulaire', 'Le mouvement est décéléré', 'La norme de l’accélération est de 2 m/s²', 'Aucune de ces propositions n’est juste'], a: 4,
      x: 'Aucune des quatre propositions du sujet n’est juste, et le corrigé officiel n’entoure rien : la dernière réponse a été ajoutée ici. `ẋ` = −4`t` et `ẍ` = −4 m·s⁻² : la norme de l’accélération vaut 4 m·s⁻², pas 2 (le facteur 2 de la dérivée de `t`² est oublié). `v a` = 16`t` > 0 pour `t` > 0 : le mouvement est accéléré, même si `x` diminue. Il n’est ni uniforme ni circulaire : c’est un mouvement rectiligne uniformément accéléré, vers les `x` décroissants.',
      ref: C1 + '#s4' },
    { id: 'phys-p2021-q4', topic: 'phys-pva', lvl: 1, type: 'single', keep: true, src: 'Partiel 2021 · Ex 1 · Q4',
      q: 'Considérons un mobile dont la position à chaque instant est donnée par son vecteur position {OM}(`t`). L’accélération de ce mouvement est donnée par',
      o: ['{a}(`t`) = d{OM}(`t`)/d`t`²', '{a}(`t`) = d²{OM}(`t`)/d`t`²', '{a}(`t`) = [d{OM}(`t`)/d`t`]²', '{a}(`t`) = √{OM}(`t`)'], a: 1,
      x: 'Corrigé officiel : b. L’accélération est la dérivée de la vitesse, elle-même dérivée de la position : c’est la dérivée seconde de {OM}. Élever la vitesse au carré ne donne pas une accélération : ni le bon vecteur, ni la bonne unité (m²·s⁻²).',
      ref: C1 + '#s4' },
    { id: 'phys-p2021-q5', topic: 'phys-vecteurs', lvl: 1, type: 'tf', a: true, keep: true, src: 'Partiel 2021 · Ex 1 · Q5',
      q: 'Deux vecteurs sont orthogonaux si leur produit scalaire est nul.',
      x: 'Corrigé officiel : vrai. {V_1} · {V_2} = ‖{V_1}‖ ‖{V_2}‖ cos θ s’annule pour θ = 90° quand les vecteurs sont non nuls. En cinématique : {v} · {a} = 0 avec {a} ≠ {0}, la vitesse garde sa norme et seule sa direction change.',
      ref: C1 + '#s4' },

    /* ================= octobre 2022 (copie corrigée, pas de corrigé officiel ; plusieurs réponses possibles) ================= */
    { id: 'phys-p2022-q1', topic: 'phys-unites', lvl: 1, type: 'multi', keep: true, src: 'Partiel 2022 · Ex 1 · Q1',
      q: 'L’unité d’une accélération peut être :',
      o: ['m·s⁻¹', 'm·s⁻²', 'kg·m·s⁻¹', 'kg·s⁻²'], a: [1],
      x: 'Pas de corrigé officiel ; sur la copie corrigée, b est validé. Une accélération est une vitesse (m·s⁻¹) divisée par un temps : m·s⁻². kg·m·s⁻¹ est l’unité d’une quantité de mouvement.',
      ref: C1 + '#s4' },
    { id: 'phys-p2022-q2', topic: 'phys-mouvement', lvl: 2, type: 'multi', keep: true, src: 'Partiel 2022 · Ex 1 · Q2',
      q: 'Choisir la ou les affirmations justes :',
      o: ['Un mouvement peut être uniforme sur une seule de ses composantes', 'L’équation de la trajectoire permet de dire si le mouvement est uniforme', 'Lors d’un mouvement circulaire uniforme, l’accélération est nulle', 'Lors d’un mouvement rectiligne uniforme, l’accélération est nulle'], a: [0, 3],
      x: 'Pas de corrigé officiel ; sur la copie corrigée, a et d sont validés. a : le tir est uniforme sur `x` (`v_x` constante). b : faux, `y`(`x`) ne contient plus le temps, elle ne dit rien de la vitesse. c : faux, l’accélération est centripète, de norme `R` ω². d : vrai, {v} est constant.',
      ref: C1 + '#s5' },
    { id: 'phys-p2022-q3', topic: 'phys-trajectoire', lvl: 2, type: 'multi', keep: true, src: 'Partiel 2022 · Ex 1 · Q3',
      q: 'Un mouvement a pour équations horaires `x`(`t`) = 4`t` et `y`(`t`) = 3`t`² − 6`t` + 5.',
      o: ['Ce mouvement est décéléré', 'Ce mouvement est uniforme', 'La vitesse s’annule en un point de la trajectoire', 'Ce mouvement est parabolique'], a: [3],
      x: 'Pas de corrigé officiel ; sur la copie corrigée, « la vitesse s’annule » est barré et « parabolique » validé. {v} = (4 ; 6`t` − 6) ne s’annule jamais, car `v_x` = 4. Avec `t` = `x`/4 : `y` = 3`x`²/16 − 3`x`/2 + 5, une parabole. {v} · {a} = 36(`t` − 1) : décéléré avant 1 s, accéléré après, donc ni l’un ni l’autre sur tout le mouvement. ‖{v}‖ varie : il n’est pas uniforme.',
      ref: C1 + '#s7' },
    { id: 'phys-p2022-q4', topic: 'phys-polaires', lvl: 2, type: 'multi', keep: true, src: 'Partiel 2022 · Ex 1 · Q4',
      q: 'En coordonnées cylindriques, le vecteur position a pour expression :',
      o: ['{OM}(`t`) = `ρ` {u_ρ}', '{OM}(`t`) = `ρ` {u_ρ} + θ {u_θ}', '{OM}(`t`) = `ρ` {u_ρ} + θ {u_θ} + `z` {u_z}', '{OM}(`t`) = `ρ` {u_ρ} + `z` {u_z}'], a: [3],
      x: 'Pas de corrigé officiel ; sur la copie corrigée, c est barré. Comme en polaires, aucune composante sur {u_θ} ; on ajoute la cote `z` sur l’axe fixe {u_z}. À la limite du programme : la fiche d’aide du Moodle montre ce repère, le cours ne traite que les polaires.',
      ref: C4 + '#s8' },
    { id: 'phys-p2022-q5', same: 'phys-c4-15', topic: 'phys-polaires-va', lvl: 1, type: 'multi', keep: true, src: 'Partiel 2022 · Ex 1 · Q5',
      q: 'En coordonnées polaires, le vecteur vitesse a pour expression :',
      o: ['{v}(`t`) = `ρ θ̇` {u_θ}', '{v}(`t`) = `ρ̇` {u_ρ}', '{v}(`t`) = `ρ` {u_θ}', '{v}(`t`) = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}'], a: [3],
      x: 'Pas de corrigé officiel ; sur la copie corrigée, d est validé. ' + X_VPOL, ref: C4 + '#s5' },
    { id: 'phys-p2022-q6', topic: 'phys-circulaire', lvl: 2, type: 'multi', keep: true, src: 'Partiel 2022 · Ex 1 · Q6',
      q: 'Pour un mouvement circulaire uniforme :',
      o: ['`θ̇` = constante', '`θ̇` = 0', '`θ̈` = 0', '`ρ̇` = 0'], a: [0, 2, 3],
      x: 'Pas de corrigé officiel ; sur la copie corrigée, le correcteur ajoute c aux réponses a et d de l’élève. Circulaire : `ρ` = `R` constant, donc `ρ̇` = 0. Uniforme : `θ̇` constant, et non nul puisque le point tourne, donc `θ̈` = 0.',
      ref: C4 + '#s7' }
  ];

  /* même notation que data/qcm/physique.js : {v} vecteur, `x` grandeur, indice après « _ » */
  function sub(s) { return /^[xyzrθρ]$/.test(s) ? '<var>' + s + '</var>' : s; }
  function m(s) {
    return String(s)
      .replace(/\{([^{}_]+)(?:_([^{}]+))?\}/g, function (_, b, i) { return '<var class="vec">' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); })
      .replace(/`([^`_]+)(?:_([^`]+))?`/g, function (_, b, i) { return '<var>' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); });
  }
  Q.forEach(function (q) {
    q.s = 'physique';
    q.q = m(q.q); q.x = m(q.x);
    if (q.o) q.o = q.o.map(m);
  });
  Array.prototype.push.apply(B, Q);
})();
