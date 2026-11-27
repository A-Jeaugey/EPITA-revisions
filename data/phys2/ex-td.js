/* Physique B2 — exercices des TD 6 à 8 (systèmes oscillants, ondes) et du partiel d’octobre 2025 publié sur le Moodle
   (novembre 2026), corrigés. Chargé après data/phys2/ex-finals.js, dont il reprend les outils de notation
   (window.PHYS2_FMT : $…$, @f, @r, E, P, ul) ; poussé dans window.PHYS2_EX (progression « phys2-<id> »).
   Énoncés recopiés du Moodle ; chaque résultat recalculé (sympy). Corrigés officiels : TD 6 (deux erreurs dans l’Ex 2,
   une coquille dans l’Ex 1) et partiel 2025 (données et calculs incohérents, signalés) ; TD 7 et TD 8 sans corrigé
   publié : corrections rédigées ici. Le TD 5 (polaires) est dans data/physique/ex-td.js (PHYS2_FROM_B1). */
(function () {
  var X0 = window.PHYS2_EX = window.PHYS2_EX || [];
  var F = window.PHYS2_FMT, X = F.X, E = F.E, P = F.P, ul = F.ul;
  var NOTE_REDIGE = 'Pas de corrigé publié : correction rédigée et vérifiée par calcul.';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------- figures (px) ---------- */
  function zig(x0, y0, x1, y1, n, h) {
    var dx = x1 - x0, dy = y1 - y0, len = Math.sqrt(dx * dx + dy * dy), ux = dx / len, uy = dy / len, nx = -uy, ny = ux, lead = 6, st = (len - 2 * lead) / (2 * n);
    var d = 'M' + x0 + ' ' + y0 + 'L' + (x0 + ux * lead).toFixed(1) + ' ' + (y0 + uy * lead).toFixed(1);
    for (var i = 1; i <= 2 * n; i++) { var s = lead + st * (i - 0.5), g = i % 2 ? h : -h; d += 'L' + (x0 + ux * s + nx * g).toFixed(1) + ' ' + (y0 + uy * s + ny * g).toFixed(1); }
    return '<path fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" d="' + d + 'L' + (x1 - ux * lead).toFixed(1) + ' ' + (y1 - uy * lead).toFixed(1) + 'L' + x1 + ' ' + y1 + '"/>';
  }
  function wallV(x, y) { var s = '<path stroke="currentColor" stroke-width="2.2" d="M' + x + ' ' + (y - 14) + 'V' + (y + 14) + '"/>'; for (var k = -10; k <= 12; k += 6) s += '<path stroke="currentColor" stroke-width="1" opacity=".5" d="M' + x + ' ' + (y + k) + 'l-6 5"/>'; return s; }
  function wallH(x, y, up) { var s = '<path stroke="currentColor" stroke-width="2.2" d="M' + (x - 14) + ' ' + y + 'H' + (x + 14) + '"/>'; for (var k = -12; k <= 10; k += 6) s += '<path stroke="currentColor" stroke-width="1" opacity=".5" d="M' + (x + k) + ' ' + y + 'l5 ' + (up ? -6 : 6) + '"/>'; return s; }
  function dot(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="4.5" fill="var(--surface)" stroke="currentColor" stroke-width="1.5"/>'; }
  function t(x, y, s, a, it) { return '<text x="' + x + '" y="' + y + '" font-size="13" text-anchor="' + (a || 'start') + '" fill="currentColor"' + (it ? ' font-style="italic" font-family="var(--font-math)"' : '') + '>' + esc(s) + '</text>'; }
  function axX(x0, x1, y) { return '<path stroke="currentColor" opacity=".55" d="M' + x0 + ' ' + y + 'H' + x1 + '"/><path fill="currentColor" opacity=".55" d="M' + x1 + ' ' + y + 'l-7 -3v6z"/>' + t(x1 - 2, y - 6, 'x', 'end', true); }
  function axZ(x, y0, y1) { return '<path stroke="currentColor" opacity=".55" d="M' + x + ' ' + y0 + 'V' + y1 + '"/><path fill="currentColor" opacity=".55" d="M' + x + ' ' + y1 + 'l-3 7h6z"/>' + t(x + 6, y1 + 8, 'z', 'start', true); }
  var FIG = window.PHYS2_TDFIGS = {};
  /* TD 6, Ex 1 : six montages ; O origine des positions, H point d’attache du ressort au bâti */
  FIG.ressorts = function (label) {
    var s = '';
    /* 1 : O = H à gauche, M à droite */
    s += t(8, 18, '1') + wallV(24, 50) + zig(24, 50, 104, 50, 6, 5) + dot(108, 50) + t(108, 38, 'M', 'middle') + axX(24, 150, 50) + t(20, 74, 'O = H', 'start');
    /* 2 : O à gauche, M puis H (bâti à droite) */
    s += t(168, 18, '2') + axX(176, 318, 50) + t(178, 68, 'O', 'start') + '<path stroke="currentColor" d="M180 46V54"/>' + dot(214, 50) + t(214, 38, 'M', 'middle') + zig(218, 50, 282, 50, 5, 5) + wallV(282, 50) + t(288, 74, 'H', 'start');
    /* 3 : O à gauche, H puis M */
    s += t(334, 18, '3') + axX(342, 476, 50) + t(344, 68, 'O', 'start') + '<path stroke="currentColor" d="M346 46V54"/>' + wallV(382, 50) + t(376, 74, 'H', 'end') + zig(382, 50, 446, 50, 5, 5) + dot(450, 50) + t(450, 38, 'M', 'middle');
    /* 4 : z vers le haut, O = H au plafond, M en dessous */
    s += t(8, 112, '4') + axZ(30, 220, 108) + wallH(60, 124, true) + t(48, 120, 'O = H', 'end') + zig(60, 124, 60, 196, 6, 5) + dot(60, 200) + t(72, 204, 'M');
    /* 5 : O = H au sol, M au-dessus */
    s += t(110, 112, '5') + axZ(130, 220, 108) + wallH(160, 210, false) + t(176, 214, 'O = H') + zig(160, 210, 160, 140, 6, 5) + dot(160, 136) + t(172, 140, 'M');
    /* 6 : O = H, ressort (k, ℓ0) jusqu’à M1, ressort (k′, ℓ′0) jusqu’à M2 */
    s += t(220, 112, '6') + wallV(236, 160) + t(232, 186, 'O = H', 'start') + zig(236, 160, 320, 160, 6, 5) + dot(324, 160) + t(324, 148, 'M₁', 'middle') + zig(328, 160, 420, 160, 6, 5) + dot(424, 160) + t(424, 148, 'M₂', 'middle') + axX(236, 476, 160) + t(278, 140, 'k, ℓ₀', 'middle', true) + t(374, 140, 'k′, ℓ′₀', 'middle', true);
    return '<svg class="mk" viewBox="0 0 480 228" style="display:block;width:100%;max-width:480px;height:auto;margin:0 auto;color:var(--ink)" role="img" aria-label="' + esc(label || '') + '">' + s + '</svg>';
  };
  /* TD 7 : pendule simple, θ depuis la verticale, base polaire en M */
  FIG.pendule = function (label) {
    var th = 30 * Math.PI / 180, O = [120, 22], l = 150, Mx = O[0] + l * Math.sin(th), My = O[1] + l * Math.cos(th);
    var s = '<path stroke="currentColor" stroke-width="2.2" d="M80 22H160"/>';
    for (var k = 84; k <= 156; k += 9) s += '<path stroke="currentColor" opacity=".5" d="M' + k + ' 22l6 -6"/>';
    s += '<path stroke="currentColor" stroke-dasharray="4 4" opacity=".6" d="M120 22V190"/>' + '<path stroke="currentColor" stroke-width="1.8" d="M120 22L' + Mx.toFixed(1) + ' ' + My.toFixed(1) + '"/>';
    s += '<path fill="none" stroke="currentColor" opacity=".6" d="M120 72A50 50 0 0 0 ' + (120 + 50 * Math.sin(th)).toFixed(1) + ' ' + (22 + 50 * Math.cos(th)).toFixed(1) + '"/>' + t(126, 92, 'θ', 'start', true) + t(Mx / 2 + 70, My / 2 + 4, 'ℓ', 'start', true);
    s += dot(Mx, My) + t(Mx - 12, My + 4, 'M', 'end') + t(112, 18, 'O', 'end');
    var ur = [Math.sin(th), Math.cos(th)], ut = [Math.cos(th), -Math.sin(th)];
    function ar(dx, dy, lab) { var x1 = Mx + dx, y1 = My + dy, L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L; return '<path stroke="currentColor" stroke-width="1.4" d="M' + Mx.toFixed(1) + ' ' + My.toFixed(1) + 'L' + x1.toFixed(1) + ' ' + y1.toFixed(1) + '"/><path fill="currentColor" d="M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'l' + (-ux * 8 - uy * 3.5).toFixed(1) + ' ' + (-uy * 8 + ux * 3.5).toFixed(1) + 'l' + (uy * 7).toFixed(1) + ' ' + (-ux * 7).toFixed(1) + 'z"/>' + t(x1 + ux * 8, y1 + uy * 8 + 4, lab, 'start', true); }
    s += ar(ur[0] * 40, ur[1] * 40, 'u⃗r') + ar(ut[0] * 40, ut[1] * 40, 'u⃗θ');
    return '<svg class="mk" viewBox="0 0 260 210" style="display:block;width:100%;max-width:260px;height:auto;margin:0 auto;color:var(--ink)" role="img" aria-label="' + esc(label || '') + '">' + s + '</svg>';
  };

  /* ================= TD 6 : systèmes oscillants ================= */
  X0.push({
    id: 'td6-ex1', exam: null, kind: 'td', order: 61, src: 'TD 6 · Ex 1', title: 'Bilan des forces sur des ressorts', topics: ['ressort'], lvl: 1, time: 15,
    intro: P('Dans chacun des cas, exprimer la force exercée par le ressort sur le solide fixé en M en fonction de la raideur $k$ et de la longueur naturelle $ℓ_0$ du ressort, de la position $x$ ou $z$ du point M, de la position $x_H$ ou $z_H$ du point H où le ressort est fixé à un bâti, et du vecteur unitaire $u⃗_x$ ou $u⃗_z$. Les positions sont repérées à partir du point O.') +
      P('Dans le dernier cas, exprimer les forces exercées par les deux ressorts sur chacun des points M₁ et M₂, d’abscisses $x_1$ et $x_2$. Les deux ressorts sont supposés différents, de caractéristiques $k$, $ℓ_0$ et $k′$, $ℓ′_0$.'),
    figs: [{ svg: FIG.ressorts('Six montages : 1, ressort entre O = H et M à droite ; 2, M puis le bâti H à droite ; 3, le bâti H puis M à droite ; 4, ressort vertical accroché au plafond en O = H, M en dessous ; 5, ressort posé au sol en O = H, M au-dessus ; 6, deux ressorts en série entre O = H, M1 et M2.'), cap: 'Les six montages (axe $z$ vers le haut dans les cas 4 et 5).' }],
    questions: [X('Exprimer la force du ressort sur M dans les cas 1 à 5, puis les forces des deux ressorts sur M₁ et sur M₂ dans le cas 6.')],
    hints: [X('Écris d’abord la longueur $ℓ$ du ressort avec les positions (toujours positive), puis le vecteur unitaire $u⃗$ de H vers M.'), X('$F⃗ = −k(ℓ − ℓ_0) u⃗$. Contrôle : ressort étiré, la force pointe de M vers H.')],
    solution: [
      { t: 'Cas 1 à 3 : horizontaux', html: E('1 :  ℓ = x,  u⃗ = u⃗_x  ⇒  F⃗ = −k(x − ℓ_0) u⃗_x', '2 :  ℓ = x_H − x,  u⃗ = −u⃗_x  ⇒  F⃗ = k(x_H − x − ℓ_0) u⃗_x', '3 :  ℓ = x − x_H,  u⃗ = u⃗_x  ⇒  F⃗ = −k(x − x_H − ℓ_0) u⃗_x') },
      { t: 'Cas 4 et 5 : verticaux', html: E('4 :  ℓ = −z,  u⃗ = −u⃗_z  ⇒  F⃗ = k(−z − ℓ_0) u⃗_z', '5 :  ℓ = z,  u⃗ = u⃗_z  ⇒  F⃗ = −k(z − ℓ_0) u⃗_z') +
        P('Dans le cas 4, M est sous O : sa cote $z$ est négative et la longueur vaut $−z$.') },
      { t: 'Cas 6 : deux ressorts', html: P('Sur M₁ s’exercent les deux ressorts ; sur M₂, seulement le second.') +
        E('@t{sur M₁ :}  F⃗_1 = −k(x_1 − ℓ_0) u⃗_x   @t{et}   F⃗_2 = k′(x_2 − x_1 − ℓ′_0) u⃗_x', '@t{sur M₂ :}  F⃗_3 = −k′(x_2 − x_1 − ℓ′_0) u⃗_x') +
        P('$F⃗_2$ et $F⃗_3$ sont opposées : c’est le même ressort, qui tire ses deux extrémités l’une vers l’autre (3e loi).') }],
    answer: ul(['1 : $−k(x − ℓ_0) u⃗_x$ ; 2 : $k(x_H − x − ℓ_0) u⃗_x$ ; 3 : $−k(x − x_H − ℓ_0) u⃗_x$', '4 : $k(−z − ℓ_0) u⃗_z$ ; 5 : $−k(z − ℓ_0) u⃗_z$', '6 : sur M₁, $−k(x_1 − ℓ_0) u⃗_x + k′(x_2 − x_1 − ℓ′_0) u⃗_x$ ; sur M₂, $−k′(x_2 − x_1 − ℓ′_0) u⃗_x$']),
    traps: [X('Écrire $−kx$ sans tenir compte de la position du point d’attache.'), X('Dans le cas 6, oublier que M₁ subit les deux ressorts.')],
    official: true, note: 'Le corrigé officiel écrit la force sur M₂ avec $k$ au lieu de $k′$ : c’est une coquille.'
  });

  X0.push({
    id: 'td6-ex2', exam: null, kind: 'td', order: 62, src: 'TD 6 · Ex 2', title: 'Ressort vertical', topics: ['oscillateur', 'ressort'], lvl: 2, time: 25,
    intro: P('Une balle de masse $m$ est suspendue à un ressort vertical de constante de raideur $k$ et de longueur à vide $ℓ_0$. La balle est initialement tirée vers le bas puis relâchée. Au moment du lâcher, le ressort a une longueur $L = 3ℓ_0/2$. La vitesse initiale est nulle et les frottements sont négligeables. On prendra l’origine O au point fixe du ressort, l’axe $z$ vertical vers le haut.'),
    questions: [X('1. Ajouter sur le schéma les forces qui s’exercent sur la balle, lorsque celle-ci se trouve en un point quelconque M de cote $z$, le ressort étant étiré.'),
      X('2. Utiliser le principe fondamental de la dynamique pour déterminer la position d’équilibre $z_e$ en fonction de $m$, $k$, $ℓ_0$ et du champ de pesanteur $g$.'),
      X('3. Utiliser le principe fondamental de la dynamique afin d’obtenir le vecteur accélération en fonction de $m$, $k$, $ℓ_0$, $g$ et du vecteur unitaire $u⃗_z$.'),
      X('4. Projeter cette expression sur l’axe pertinent du problème et écrire l’équation différentielle obtenue sous sa forme canonique, c’est-à-dire sous la forme $z̈ + a ż + b z = c$. Trouver les expressions des coefficients $a$, $b$ et $c$ en fonction de $m$, $k$, $ℓ_0$ et $g$.'),
      X('5. En faisant le changement de variable $Z = z − z_e$, montrer que l’équation différentielle prend la forme $Z̈ + ω_0² Z = 0$. Donner l’expression de la pulsation propre $ω_0$ en fonction de $m$ et $k$.'),
      X('6. La solution de l’équation précédente a la forme générale $Z(t) = A cos(ω_0 t) + B sin(ω_0 t)$, où $A$ et $B$ sont des constantes à déterminer. Utiliser les conditions initiales pour trouver leurs expressions et donner l’expression finale de $z(t)$ en fonction de $z_e$, $ℓ_0$ et $ω_0 t$.')],
    hints: [X('La balle est sous O : $z$ &lt; 0 et la longueur du ressort vaut $−z$. La force de rappel vaut $k(−z − ℓ_0) u⃗_z$.'), X('À l’équilibre, l’accélération est nulle. Pour la question 6 : $Z(0) = z(0) − z_e$ avec $z(0) = −3ℓ_0/2$.')],
    solution: [
      { t: 'Questions 1 et 2 : forces et équilibre', html: P('Le poids $P⃗ = −mg u⃗_z$ et la force de rappel $F⃗ = k(−z − ℓ_0) u⃗_z$, vers le haut quand le ressort est étiré. À l’équilibre :') +
        E('k(−z_e − ℓ_0) − mg = 0  ⇒  z_e = −(ℓ_0 + @f{mg}{k})') + P('Le ressort à l’équilibre est plus long que $ℓ_0$ de $mg/k$.') },
      { t: 'Questions 3 et 4 : équation du mouvement', html: E('a⃗ = [@f{k}{m}(−z − ℓ_0) − g] u⃗_z', 'z̈ + @f{k}{m} z = −(g + @f{kℓ_0}{m})') +
        P('Donc $a = 0$ (pas de frottement), $b = k/m$ et $c = −(g + kℓ_0/m)$, qui vaut aussi $(k/m) z_e$.') },
      { t: 'Question 5 : changement de variable', html: P('$Z = z − z_e$ donne $Z̈ = z̈$ et $(k/m) z = (k/m) Z + (k/m) z_e$ : le terme constant se simplifie avec $c$.') + E('Z̈ + ω_0² Z = 0,   ω_0 = @r{k/m}') },
      { t: 'Question 6 : conditions initiales', html: E('Z(0) = A = −@f{3ℓ_0}{2} − z_e', 'Ż(0) = Bω_0 = 0  ⇒  B = 0', 'z(t) = z_e − (@f{3ℓ_0}{2} + z_e) cos(ω_0 t)') +
        P('Contrôle : en $t = 0$, $z = −3ℓ_0/2$. La balle oscille autour de $z_e$ avec l’amplitude $|mg/k − ℓ_0/2|$.') }],
    answer: ul(['$z_e = −(ℓ_0 + mg/k)$', '$z̈ + (k/m) z = −(g + kℓ_0/m)$ : $a = 0$, $b = k/m$, $c = −(g + kℓ_0/m)$', '$ω_0 = @r{k/m}$', '$z(t) = z_e − (3ℓ_0/2 + z_e) cos(ω_0 t)$']),
    traps: [X('Oublier que $z$ est négatif sous O : la longueur est $−z$, pas $z$.'), X('Prendre $3ℓ_0/2$ comme amplitude : l’amplitude se compte depuis l’équilibre.')],
    official: false, note: 'Le corrigé officiel du TD 6 a deux erreurs dans cet exercice : il annonce « $ω_0 = @r{g/l}$ » (c’est la pulsation du pendule ; ici $ω_0 = @r{k/m}$) et prend $3ℓ_0/2$ comme valeur initiale de l’écart à l’équilibre, d’où « $y(t) = (3/2) ℓ_0 cos(ω_0 t)$ ». Correction refaite et vérifiée (sympy).'
  });

  X0.push({
    id: 'td6-ex3', exam: null, kind: 'td', order: 63, src: 'TD 6 · Ex 3', title: 'Mode de vibration d’une molécule de HCl', topics: ['oscillateur'], lvl: 2, time: 20,
    intro: P('La fréquence de vibration de la molécule de chlorure d’hydrogène HCl est mesurée par spectroscopie comme valant $f$ = 8,5·10¹³ Hz. On aborde dans cet exercice un premier modèle simple de la molécule, décrite comme un atome d’hydrogène mobile relié à un atome de chlore fixe. L’interaction entre les deux atomes est modélisée par un ressort de raideur $k$.') +
      P('Données : $M_H$ = 1,0 g·mol⁻¹ ; $M_Cl$ = 35,5 g·mol⁻¹ ; nombre d’Avogadro $N_A$ = 6,0·10²³ mol⁻¹.'),
    questions: [X('1. Pourquoi est-il raisonnable de supposer l’atome de chlore fixe ?'),
      X('On admet que l’énergie totale de la molécule $E_totale$ est égale à $hf/2$, où $h$ = 6,62·10⁻³⁴ J·s est la constante de Planck et $f$ la fréquence de vibration en hertz. La fréquence est reliée à la pulsation propre par $f = ω_0/(2π)$. 2. Calculer sa constante de raideur $k$.'),
      X('3. À quel moment l’énergie cinétique de la molécule est-elle maximale ?'),
      X('4. En écrivant une relation entre $E_totale$ et l’énergie cinétique à un moment précis, calculer la vitesse maximale de l’atome d’hydrogène.'),
      X('5. À quel moment l’énergie potentielle élastique de la molécule est-elle maximale ?'),
      X('6. En écrivant une relation entre $E_totale$ et l’énergie potentielle élastique à un moment précis, calculer l’amplitude de son mouvement. La taille de la liaison H-Cl est de 127 pm. Comparer l’amplitude du mouvement à cette valeur.')],
    hints: [X('Masse d’un atome : $m_H = M_H/N_A$, avec $M_H$ en kg·mol⁻¹.'), X('$ω_0 = 2πf = @r{k/m_H}$. L’énergie totale est cinétique au passage à l’équilibre, élastique aux extrémités.')],
    solution: [
      { t: 'Question 1', html: P('Le chlore est 35,5 fois plus lourd que l’hydrogène : pour les mêmes forces, il bouge 35,5 fois moins. On le suppose fixe.') },
      { t: 'Question 2 : raideur', html: E('m_H = @f{1,0·10⁻³}{6,0·10²³} ≈ 1,67·10⁻²⁷ kg', 'k = 4π²f² m_H = @f{4π²f²M_H}{N_A} ≈ 4,7·10² N·m⁻¹') },
      { t: 'Questions 3 et 4 : vitesse maximale', html: P('L’énergie cinétique est maximale au passage par la position d’équilibre, où le ressort n’est ni étiré ni comprimé ($E_pe$ = 0).') +
        E('@f{hf}{2} = ½ m_H v_max²  ⇒  v_max = @r{@f{hf}{m_H}} ≈ 5,8·10³ m·s⁻¹') },
      { t: 'Questions 5 et 6 : amplitude', html: P('L’énergie potentielle élastique est maximale aux extrémités du mouvement, où la vitesse est nulle.') +
        E('@f{hf}{2} = ½ k A²  ⇒  A = @r{@f{hf}{k}} ≈ 1,1·10⁻¹¹ m = 11 pm') + P('Soit environ 9 % de la longueur de la liaison (127 pm).') }],
    answer: ul(['$k$ ≈ 4,7·10² N·m⁻¹', '$v_max$ ≈ 5,8·10³ m·s⁻¹ (au passage à l’équilibre)', '$A$ ≈ 11 pm, environ 9 % de la liaison (aux extrémités)']),
    traps: [X('Garder $M_H$ en g·mol⁻¹ : il faut 1,0·10⁻³ kg·mol⁻¹.'), X('Confondre $f$ et $ω_0$ : $ω_0 = 2πf$.')],
    official: true, note: 'Le corrigé officiel arrondit la variation de la liaison à 10 % ; le calcul donne 11/127 ≈ 9 %.'
  });

  /* ================= TD 7 : pendule simple ================= */
  X0.push({
    id: 'td7-ex1', exam: null, kind: 'td', order: 71, src: 'TD 7 · Ex 1', title: 'Pendule simple : la 2e loi en base polaire', topics: ['pendule', 'oscillateur', 'polaire'], lvl: 2, time: 20,
    intro: P('Une balle de masse $M$ est suspendue à un fil inextensible de longueur $l$. Au départ, le fil fait un angle $θ_0$ avec la verticale et la vitesse angulaire $θ̇$ de la masse est nulle.') +
      P('On rappelle que, dans le cas général, l’accélération en coordonnées polaires s’écrit $a⃗ = (r̈ − rθ̇²) u⃗_r + (2ṙθ̇ + rθ̈) u⃗_θ$.'),
    figs: [{ svg: FIG.pendule('Pendule simple : fil de longueur l accroché en O, angle thêta avec la verticale, base polaire u r le long du fil vers M et u thêta perpendiculaire.'), cap: 'Le pendule et la base polaire en M.' }],
    questions: [X('1. Ajouter les forces qui s’exercent sur la masse sur le schéma.'), X('2. Utiliser la seconde loi de Newton afin d’obtenir l’équation de l’accélération.'),
      X('3. Projeter l’expression sur les axes proposés.'), X('4. Écrire l’équation différentielle obtenue sous sa forme canonique.'), X('5. Résoudre l’équation différentielle en utilisant les conditions initiales.')],
    hints: [X('Le fil est tendu : $r = l$ est constant, donc $ṙ = r̈ = 0$.'), X('Le poids se projette en $Mg cos θ$ sur $u⃗_r$ et $−Mg sin θ$ sur $u⃗_θ$. Pour de petits angles, $sin θ ≈ θ$.')],
    solution: [
      { t: 'Questions 1 et 2', html: P('Deux forces : le poids $P⃗ = M g⃗$, vertical vers le bas, et la tension $T⃗ = −T u⃗_r$, dirigée de M vers O.') + E('P⃗ + T⃗ = M a⃗,   a⃗ = −lθ̇² u⃗_r + lθ̈ u⃗_θ') },
      { t: 'Question 3 : projections', html: E('@t{sur} u⃗_r :  Mg cos θ − T = −Mlθ̇²', '@t{sur} u⃗_θ :  −Mg sin θ = Mlθ̈') + P('La première donne la tension, $T = Mg cos θ + Mlθ̇²$ ; la seconde, le mouvement.') },
      { t: 'Question 4 : forme canonique', html: E('θ̈ + @f{g}{l} sin θ = 0') + P('Pour de petits angles (en radians), $sin θ ≈ θ$ :') + E('θ̈ + ω_0² θ = 0,   ω_0 = @r{g/l}') },
      { t: 'Question 5 : résolution', html: E('θ(t) = A cos(ω_0 t) + B sin(ω_0 t)', 'θ(0) = A = θ_0,   θ̇(0) = Bω_0 = 0  ⇒  B = 0', 'θ(t) = θ_0 cos(@r{g/l} t)') + P('Période $T_0 = 2π@r{l/g}$, indépendante de la masse.') }],
    answer: ul(['$T = Mg cos θ + Mlθ̇²$', '$θ̈ + (g/l) sin θ = 0$, soit $θ̈ + (g/l) θ = 0$ pour de petits angles', '$θ(t) = θ_0 cos(@r{g/l} t)$']),
    traps: [X('Oublier le signe moins de la composante tangente du poids.'), X('Utiliser $sin θ ≈ θ$ avec $θ$ en degrés.')],
    official: false, note: NOTE_REDIGE
  });

  X0.push({
    id: 'td7-ex2', exam: null, kind: 'td', order: 72, src: 'TD 7 · Ex 2', title: 'Pendule simple : étude énergétique', topics: ['pendule', 'energie', 'oscillateur'], lvl: 2, time: 25,
    intro: P('Une masse $m$ est accrochée à un fil inextensible de longueur $l$. Elle est repérée par l’angle θ que fait le fil avec la verticale. Les frottements sont négligés.'),
    questions: [X('1. Donner l’expression générale de l’énergie potentielle de pesanteur du système en fonction de $m$, $g$, $l$ et θ. Quand est-elle maximale ? Quand est-elle minimale ?'),
      X('2. Donner l’expression générale de l’énergie cinétique du système en fonction de $m$, $l$ et $θ̇$. Quand est-elle maximale ? Quand est-elle minimale ?'),
      X('3. Donner l’expression littérale de l’énergie mécanique. Que peut-on dire de l’énergie mécanique dans ce cas précis ?'),
      X('4. Utiliser la conservation de l’énergie mécanique afin de retrouver l’équation d’un oscillateur harmonique.'),
      X('5. On lâche la masse alors qu’elle est au repos et que $θ(0) = θ_0$. Compte tenu des conditions initiales, déterminer l’évolution temporelle de l’angle θ. On l’exprimera en fonction de θ, $l$ et $g$.'),
      X('6. Tracer la courbe donnant θ en fonction du temps (l’énoncé écrit « entre [2π ; 2π] »). De même pour les énergies cinétique, potentielle de pesanteur et mécanique.')],
    hints: [X('Origine de $E_p$ au point le plus bas : la masse y est à la hauteur $l(1 − cos θ)$.'), X('Sur un cercle de rayon $l$, $v = lθ̇$. Dériver $E_M$ par rapport au temps, puis $sin θ ≈ θ$.')],
    solution: [
      { t: 'Questions 1 et 2', html: E('E_p = mgl(1 − cos θ)', 'E_c = ½ m l² θ̇²') + P('$E_p$ est minimale (nulle) en θ = 0, maximale aux extrémités θ = ±θ₀. $E_c$ est maximale en θ = 0, nulle aux extrémités où la masse fait demi-tour.') },
      { t: 'Question 3', html: E('E_M = ½ m l² θ̇² + mgl(1 − cos θ)') + P('Elle se conserve : pas de frottement, et la tension, perpendiculaire à la vitesse, ne travaille pas.') },
      { t: 'Question 4', html: E('@f{dE_M}{dt} = m l² θ̇ θ̈ + mgl sin θ θ̇ = 0  ⇒  θ̈ + @f{g}{l} sin θ = 0') + P('Pour de petits angles, $θ̈ + (g/l) θ = 0$ : oscillateur harmonique de pulsation $ω_0 = @r{g/l}$.') },
      { t: 'Question 5', html: E('θ(t) = θ_0 cos(@r{g/l} t)') },
      { t: 'Question 6 : les courbes', html: P('θ(t) est une sinusoïde de période $T_0 = 2π@r{l/g}$, entre −θ₀ et θ₀. Pour de petits angles, $E_p ≈ ½ mgl θ_0² cos²(ω_0 t)$ et $E_c = ½ mgl θ_0² sin²(ω_0 t)$ : elles oscillent avec une période $T_0/2$, en opposition, et leur somme $E_M = ½ mgl θ_0²$ est une droite horizontale. Les courbes sont tracées au chapitre 4, partie 3.') }],
    answer: ul(['$E_p = mgl(1 − cos θ)$ ; $E_c = ½ ml²θ̇²$ ; $E_M$ constante', '$θ̈ + (g/l) θ = 0$ pour de petits angles', '$θ(t) = θ_0 cos(@r{g/l} t)$']),
    traps: [X('Écrire $E_p = mgl cos θ$ : avec l’origine au point le plus bas, c’est $mgl(1 − cos θ)$.'), X('Écrire $E_c = ½ mθ̇²$ : la vitesse est $lθ̇$.')],
    official: false, note: NOTE_REDIGE + ' L’intervalle « [2π ; 2π] » de l’énoncé est une coquille.'
  });

  /* ================= TD 8 : ondes ================= */
  X0.push({
    id: 'td8-ex1', exam: null, kind: 'td', order: 81, src: 'TD 8 · Ex 1', title: 'Fausses idées sur les ondes', topics: ['ondes'], lvl: 1, time: 15,
    intro: P('Les questions suivantes ont pour but de lever quelques mauvais réflexes au sujet des ondes. Toutes les questions sont indépendantes ; la corde est toujours fixée à l’extrémité I et tenue à la main au point O. Échelle : 10 cm par carreau en ordonnée.'),
    questions: [X('1. Au milieu de la corde se trouve un point rouge R. En bougeant la main, la forme de la corde observée au bout de 2 s montre une bosse qui n’a pas encore atteint R. Y a-t-il une façon de bouger la main qui permette à l’onde d’atteindre le point rouge au bout de 2 s ?'),
      X('2. La célérité est de 1 carreau par seconde. On lève la main en 1 s d’une hauteur de 10 cm et on la ramène à sa position initiale en 1 s. L’instant où commence le mouvement de la main est pris comme origine des temps. Dessiner la forme de la corde à $t$ = 1 s (à $t$ = 6 s, la bosse est entre 4 et 6 carreaux de O).'),
      X('3. La célérité sur une première corde est de 1 carreau par seconde, celle sur une deuxième de 2 carreaux par seconde. Même geste de la main. Représenter la forme des deux cordes à $t$ = 3 s.'),
      X('4. Sur une corde, une bosse et un creux de même forme se propagent en sens contraire. Tracer l’allure de la corde quand les centres des deux ondes se superposent.')],
    hints: [X('La célérité dépend de la corde, pas de la main.'), X('Un point à $x$ carreaux de O reproduit le geste de la main avec un retard $x/c$.')],
    solution: [
      { t: 'Question 1', html: P('Non. En 2 s, le front de l’onde parcourt $2c$ quel que soit le geste. Bouger la main plus vite rend la bosse plus étroite, pas plus rapide. Il faudrait une corde où la célérité est plus grande (plus tendue ou plus légère).') },
      { t: 'Question 2', html: P('À $t$ = 1 s, la main vient d’arriver en haut (10 cm) et le front de l’onde est à 1 carreau de O. Entre $x$ = 0 et $x$ = 1 carreau, la corde monte de 0 (au front) à 10 cm (à la main) : une demi-bosse. Au-delà, la corde est encore au repos.') },
      { t: 'Question 3', html: P('Corde 1 : le point en $x$ reproduit le geste avec $x$ s de retard ; à $t$ = 3 s, la bosse occupe $x$ de 1 à 3 carreaux, sommet en 2. Corde 2 : retard $x/2$ ; la bosse occupe $x$ de 2 à 6 carreaux, sommet en 4. Même hauteur (10 cm), deux fois plus large et deux fois plus loin.') },
      { t: 'Question 4', html: P('Les déplacements s’ajoutent : une bosse et un creux de même forme s’annulent. À cet instant, la corde est plate (mais ses points bougent). Ensuite, la bosse et le creux continuent leur route, inchangés.') }],
    answer: ul(['1 : non, la célérité ne dépend que de la corde', '2 : une demi-bosse entre O (10 cm) et 1 carreau', '3 : même hauteur ; bosse de 1 à 3 carreaux (corde 1), de 2 à 6 carreaux (corde 2)', '4 : corde plate à cet instant']),
    traps: [X('Penser qu’un geste plus énergique accélère l’onde.'), X('Penser que la matière avance avec l’onde.')],
    official: false, note: NOTE_REDIGE + ' Les cordes des questions 2 et 3 sont tracées dans le chapitre 5, partie 2.'
  });

  X0.push({
    id: 'td8-ex2', exam: null, kind: 'td', order: 82, src: 'TD 8 · Ex 2', title: 'Le four à micro-ondes', topics: ['ondes', 'stationnaire'], lvl: 1, time: 10,
    intro: P('Le principe du four à micro-ondes est de faire chauffer les aliments grâce à des ondes d’une fréquence de 2,45 GHz, qui agitent les molécules d’eau 2,45 milliards de fois par seconde. La célérité de la lumière vaut 300 000 km/s.'),
    questions: [X('1. Calculer la longueur d’onde des ondes utilisées dans le micro-onde.'), X('2. Déterminer si les ondes micro-ondes correspondent à des ondes de longueurs d’onde micrométriques.'),
      X('3. À quel domaine appartiennent-elles ?'), X('4. Des ondes stationnaires peuvent-elles exister dans le micro-onde ? Est-ce dérangeant ?')],
    hints: [X('$λ = c/f$, avec $c$ = 3·10⁸ m·s⁻¹ et $f$ = 2,45·10⁹ Hz.'), X('Les parois du four sont métalliques : elles réfléchissent les ondes.')],
    solution: [
      { t: 'Questions 1 à 3', html: E('λ = @f{c}{f} = @f{3·10⁸}{2,45·10⁹} ≈ 0,12 m') + P('12 cm : c’est une longueur centimétrique, pas micrométrique (10⁻⁶ m). Ce sont des ondes électromagnétiques du domaine des micro-ondes (hyperfréquences), entre l’infrarouge et les ondes radio.') },
      { t: 'Question 4', html: P('Oui : les ondes se réfléchissent sur les parois métalliques et se superposent en ondes stationnaires. Aux nœuds, espacés de λ/2 ≈ 6 cm, l’amplitude est nulle et l’aliment chauffe peu : la cuisson est inégale. C’est pour ça que le plateau tourne.') }],
    answer: ul(['λ ≈ 12 cm', 'pas micrométrique : domaine des micro-ondes (électromagnétique)', 'ondes stationnaires : nœuds tous les 6 cm, d’où le plateau tournant']),
    traps: [X('Oublier de convertir les GHz (10⁹) et les km/s (10³).')],
    official: false, note: NOTE_REDIGE
  });

  X0.push({
    id: 'td8-ex3', exam: null, kind: 'td', order: 83, src: 'TD 8 · Ex 3', title: 'Écoute musicale : le mur derrière l’auditeur', topics: ['dephasage', 'ondes'], lvl: 2, time: 20,
    intro: P('La qualité de l’écoute musicale que l’on obtient avec une chaîne hi-fi dépend de la manière dont les enceintes sont disposées par rapport à l’auditeur. En particulier, il faut absolument éviter la configuration où un mur se trouve à une distance $D$ trop courte derrière l’auditeur.') +
      P('Supposons l’onde issue de l’enceinte harmonique de fréquence $f$. Elle se réfléchit sur le mur sans aucun déphasage pour la surpression, grandeur à laquelle est sensible l’oreille de l’auditeur. On note $c$ = 343 m·s⁻¹ la vitesse du son dans l’air.'),
    questions: [X('1. En vous aidant d’un schéma clair, exprimer le décalage temporel Δτ qui existe entre les deux ondes arrivant dans l’oreille de l’auditeur, celle provenant directement de l’enceinte et celle s’étant réfléchie sur le mur.'),
      X('2. En déduire le déphasage Δφ entre les deux ondes.'), X('3. Expliquer pourquoi il existe un risque de diminution de l’amplitude perçue par l’auditeur pour certaines fréquences.'),
      X('4. Exprimer ces fréquences en fonction d’un entier $n$. Quelle condition doit vérifier la distance $D$ pour qu’aucune d’entre elles ne soit dans le domaine audible ? Commenter.'),
      X('5. Expliquer qualitativement pourquoi on évite l’effet nuisible en éloignant l’auditeur du mur. Pourquoi recouvrir le mur d’un revêtement adéquat aura-t-il le même effet ?')],
    hints: [X('L’onde réfléchie va de l’oreille au mur et revient : 2$D$ de plus.'), X('Amplitude minimale quand les deux ondes sont en opposition de phase : Δφ = (2$n$ + 1)π.')],
    solution: [
      { t: 'Questions 1 et 2', html: E('Δτ = @f{2D}{c}', '|Δφ| = ωΔτ = @f{4πfD}{c}') },
      { t: 'Question 3', html: P('Les deux ondes ont la même fréquence et s’ajoutent dans l’oreille. Si elles arrivent en opposition de phase, elles se compensent : l’amplitude perçue diminue pour ces fréquences-là.') },
      { t: 'Question 4', html: E('@f{4πfD}{c} = (2n + 1)π  ⇒  f_n = (2n + 1) @f{c}{4D},  n ∈ ℕ') +
        P('Aucune fréquence audible : il faut $f_0 = c/(4D)$ &gt; 20 kHz, soit $D$ &lt; 343/80 000 ≈ 4,3 mm. Impossible en pratique : pour $D$ = 1 m, 86 Hz, 257 Hz, 429 Hz… sont affaiblis, en plein dans le spectre musical.') },
      { t: 'Question 5', html: P('Plus le mur est loin, plus l’onde réfléchie a parcouru de chemin : elle arrive affaiblie et ne compense plus qu’en partie l’onde directe. Un revêtement absorbant affaiblit aussi l’onde réfléchie, avec le même effet.') }],
    answer: ul(['Δτ = 2$D$/$c$ ; Δφ = 4π$fD$/$c$', '$f_n$ = (2$n$ + 1)$c$/(4$D$)', '$D$ &lt; 4,3 mm : impossible ; s’éloigner du mur ou l’absorber']),
    traps: [X('Compter $D$ au lieu de 2$D$ pour la différence de chemin.'), X('Chercher les fréquences « en phase » : ce sont les oppositions de phase qui affaiblissent le son.')],
    official: false, note: NOTE_REDIGE
  });

  X0.push({
    id: 'td8-ex4', exam: null, kind: 'td', order: 84, src: 'TD 8 · Ex 4', title: 'Instrument de musique : tuyau fermé à un bout', topics: ['stationnaire'], lvl: 3, time: 20,
    intro: P('On considère un instrument de musique modélisé par une cavité de longueur $L$, fermée à une extrémité et ouverte à l’autre. La vitesse du son dans l’air est $c$ = 340 m·s⁻¹. On donne la condition sur les modes propres de l’instrument : $L = λ_n/4 + n λ_n/2$.'),
    questions: [X('1. Exprimer, en fonction d’un entier $n$, l’ensemble des fréquences propres $f_n$ associées aux modes propres.'),
      X('2. Quelle doit être la valeur de $L$ pour que la plus faible fréquence d’une onde stationnaire dans cet instrument soit $f_1$ = 440 Hz ?'),
      X('3. Quelle est la fréquence $f_2$ immédiatement supérieure pouvant être émise par cet instrument ?'),
      X('4. Où doit-on placer un trou dans l’instrument afin de supprimer $f_2$ du spectre du son émis ?')],
    hints: [X('$L = (2n + 1) λ_n/4$, puis $f_n = c/λ_n$.'), X('L’extrémité fermée est un nœud de vibration, l’extrémité ouverte un ventre ; un trou ouvert impose un ventre.')],
    solution: [
      { t: 'Question 1', html: E('L = (2n + 1) @f{λ_n}{4}  ⇒  λ_n = @f{4L}{2n + 1},   f_n = (2n + 1) @f{c}{4L},  n ∈ ℕ') + P('Seuls les multiples impairs du fondamental existent.') },
      { t: 'Questions 2 et 3', html: E('n = 0 :  L = @f{c}{4 × 440} = @f{340}{1760} ≈ 0,193 m', 'n = 1 :  f = 3 × 440 = 1 320 Hz') },
      { t: 'Question 4', html: P('Le mode à 1 320 Hz ($λ = 4L/3$) a un nœud de vibration à l’extrémité fermée et un autre à λ/2 = 2$L$/3 de celle-ci (≈ 12,9 cm). Un trou impose un ventre de vibration : placé en ce nœud, il rend ce mode impossible. C’est la réponse du modèle ; il ne dit pas comment le trou modifie le fondamental.') }],
    answer: ul(['$f_n$ = (2$n$ + 1)$c$/(4$L$)', '$L$ ≈ 19,3 cm', '$f_2$ = 1 320 Hz', 'trou à 2$L$/3 de l’extrémité fermée']),
    traps: [X('Prendre $λ_n = 2L/n$ (corde fixée aux deux bouts) : ici, un bout est ouvert.')],
    official: false, note: NOTE_REDIGE
  });

  /* ================= Partiel d’octobre 2025 (Moodle) ================= */
  X0.push({
    id: 'p2025-ex1', exam: 'p2025', kind: 'partiel', order: 1, src: 'Partiel oct. 2025 · Ex 1', title: 'Chute d’une goutte d’eau, avec et sans frottement', pts: 12, topics: ['amorti', 'newton', 'energie'], lvl: 2, time: 35,
    intro: P('Une goutte d’eau, modélisée comme une sphère de rayon $r$ = 2 mm, tombe de la base d’un nuage situé à une altitude $y(0)$ = 2 000 m au-dessus du sol. L’origine des dates est l’instant où la goutte quitte le nuage, sa vitesse initiale est nulle. Données : $g$ ≈ 10 m·s⁻² ; masse volumique de l’eau $ρ$ ≈ 1 000 kg·m⁻³ ; volume d’une sphère $V = (4/3)πr³$. Calculatrice interdite.'),
    questions: [X('1. Énoncer le principe fondamental de la dynamique et l’utiliser, en justifiant toutes les étapes, afin d’obtenir l’expression de l’accélération. Dans cette partie, la seule force qui s’exerce sur la goutte est son poids. (1 pt)'),
      X('2. Donner l’expression du vecteur vitesse. (1 pt)  3. Donner l’expression du vecteur position. (1 pt)'),
      X('4. Calculer la vitesse de la goutte lorsqu’elle atteint le sol avec ces équations. (1 pt)  5. Faire le même calcul avec le théorème de l’énergie mécanique. (2 pts)'),
      X('6. En réalité, la goutte arrive au sol à 9,4 m/s. Comment expliquer la différence ? (0,5 pt)'),
      X('Pour la suite, on ajoute une force de frottement $f⃗ = −k v⃗$, avec $k$ = 3,2·10⁻⁵ N·s·m⁻¹. 7. En appliquant le principe fondamental de la dynamique, montrer que l’équation satisfaite par $v_y$ s’écrit $dv/dt + v/τ = −g$. (2 pts)'),
      X('8. Vérifier que $v_y(t) = gτ(e^{−t/τ} − 1)$ est solution et respecte la condition initiale. (1,5 pt)  9. Donner l’expression littérale de τ et calculer sa valeur (π ≈ 3). (1 pt)'),
      X('10. Que vaut la vitesse $v(τ)$ au bout d’un temps τ ? (0,5 pt)  11. Quelle vitesse atteint finalement la goutte ? (0,5 pt)')],
    hints: [X('Axe $y$ vertical vers le haut : $P⃗ = −mg u⃗_y$.'), X('Avec frottement : $m dv_y/dt = −mg − k v_y$. Pour τ : $m = ρ × (4/3)πr³$.')],
    solution: [
      { t: 'Questions 1 à 3 : chute libre', html: E('ΣF⃗ = m a⃗  ⇒  −mg u⃗_y = m a⃗  ⇒  a⃗ = −g u⃗_y', 'v⃗ = −gt u⃗_y   (v⃗(0) = 0⃗)', 'y(t) = −@f{gt²}{2} + 2000') },
      { t: 'Questions 4 et 5 : vitesse au sol', html: E('y(T) = 0  ⇒  T = @r{@f{2 × 2000}{10}} = 20 s,   v = gT = 200 m·s⁻¹', 'mgh = ½ mv²  ⇒  v = @r{2gh} = @r{40 000} = 200 m·s⁻¹') },
      { t: 'Question 6', html: P('Les frottements de l’air ne sont pas négligeables : ils freinent la goutte, qui atteint une vitesse limite.') },
      { t: 'Questions 7 et 8 : équation avec frottement', html: E('m @f{dv_y}{dt} = −mg − k v_y  ⇒  @f{dv_y}{dt} + @f{k}{m} v_y = −g,   τ = @f{m}{k}') +
        E('@f{dv_y}{dt} = −g e^{−t/τ},   −g e^{−t/τ} + g(e^{−t/τ} − 1) = −g  ✓,   v_y(0) = gτ(1 − 1) = 0  ✓') },
      { t: 'Question 9 : τ', html: E('m = ρ × @f{4}{3}πr³ = 1000 × 4 × 8·10⁻⁹ = 3,2·10⁻⁵ kg', 'τ = @f{m}{k} = @f{3,2·10⁻⁵}{3,2·10⁻⁵} = 1 s') },
      { t: 'Questions 10 et 11', html: E('|v(τ)| = gτ(1 − e^{−1}) ≈ 0,63 × 10 ≈ 6,3 m·s⁻¹', 'v_lim = gτ = 10 m·s⁻¹') +
        P('À τ, la vitesse a fait 63 % du chemin vers sa valeur limite. La courbe du sujet plafonne vers 9,5 m/s (proche des 9,4 m/s réels) et atteint 63 % de cette valeur vers 2 s : elle ne correspond pas tout à fait aux données.') }],
    answer: ul(['$a⃗ = −g u⃗_y$ ; $v⃗ = −gt u⃗_y$ ; $y = −gt²/2 + 2000$', '$v$ = 200 m·s⁻¹ au sol (les deux méthodes)', 'τ = $m/k$ = 1 s ; $v(τ)$ ≈ 6,3 m·s⁻¹ ; vitesse limite $gτ$ = 10 m·s⁻¹']),
    traps: [X('Oublier que $f⃗$ dépend de la vitesse : l’équation porte sur $v$, pas sur $y$.'), X('Calculer $(4/3) × 3 × 8·10⁻⁹$ trop vite : c’est 3,2·10⁻⁸ m³.')],
    grading: 'imprimé sur le sujet : 12 points (détail par question ci-dessus).',
    official: true, note: 'Le corrigé officiel change les données (altitude 1 000 m, $k$ = 2,4·10⁻⁵) et fait une erreur de calcul sur le volume (2,4·10⁻⁸ m³ au lieu de 3,2·10⁻⁸) ; τ = 1 s reste juste. Pour $v(τ)$, il lit 3,2 m/s sur la courbe. Valeurs recalculées ici avec les données du sujet.'
  });

  X0.push({
    id: 'p2025-ex2', exam: 'p2025', kind: 'partiel', order: 2, src: 'Partiel oct. 2025 · Ex 2', title: 'Mouvement de la station spatiale internationale (ISS)', pts: 8, topics: ['polaire', 'circulaire', 'dyncirc'], lvl: 2, time: 20,
    intro: P('L’ISS est une station spatiale placée en orbite terrestre basse, à environ 400 km du sol. Sa masse est d’environ 400 tonnes. On suppose le mouvement circulaire et la vitesse angulaire ω constante.') +
      P('Données : rayon terrestre $R_T$ ≈ 6 400 km ; altitude de l’orbite $h$ ≈ 400 km ; masse de la Terre $M_T$ ≈ 6,4·10²⁴ kg ; masse de l’ISS ≈ 400 t ; $G$ ≈ 6·10⁻¹¹ m³·kg⁻¹·s⁻² ; force gravitationnelle $F⃗ = −G (m_1 m_2/d²) u⃗_r$. Calculatrice interdite.'),
    questions: [X('1. Tracer un schéma de la situation, faire apparaître les vecteurs de la base polaire, puis déterminer l’expression du vecteur position en base polaire. (2 pts)'),
      X('2. Déterminer l’expression du vecteur vitesse de l’ISS en base polaire. (1 pt)'),
      X('3. Déterminer l’expression du vecteur accélération en base polaire. On rappelle que, pour un mouvement circulaire à vitesse angulaire constante, $a⃗ = −rω² u⃗_r$. (1 pt)'),
      X('4. En appliquant le principe fondamental de la dynamique, montrer que $ω = @r{G M_T/(h + R_T)³}$. (2 pts)'),
      X('5. Avec $T = 2π/ω$, calculer l’ordre de grandeur de la durée d’une révolution de l’ISS et donner le résultat en heures. (2 pts)')],
    hints: [X('O au centre de la Terre, $r = R_T + h$ constant.'), X('Une seule force, vers le centre : $−G M_T m/r² = −m r ω²$.')],
    solution: [
      { t: 'Questions 1 à 3', html: E('OM⃗ = r u⃗_r,   r = R_T + h', 'v⃗ = ṙ u⃗_r + rθ̇ u⃗_θ = rω u⃗_θ', 'a⃗ = −rω² u⃗_r') },
      { t: 'Question 4', html: E('−G @f{M_T m}{r²} u⃗_r = −m r ω² u⃗_r  ⇒  ω² = @f{G M_T}{r³}  ⇒  ω = @r{@f{G M_T}{(R_T + h)³}}') + P('La masse de l’ISS se simplifie.') },
      { t: 'Question 5 : ordre de grandeur', html: E('G M_T = 6·10⁻¹¹ × 6,4·10²⁴ ≈ 3,8·10¹⁴,   (6,8·10⁶)³ ≈ 3,1·10²⁰', 'ω ≈ @r{1,2·10⁻⁶} ≈ 1,1·10⁻³ rad·s⁻¹', 'T = @f{2π}{ω} ≈ 5,7·10³ s ≈ 1,6 h') + P('Environ une heure et demie : la vraie période de l’ISS est d’environ 92 minutes.') }],
    answer: ul(['$OM⃗ = (R_T + h) u⃗_r$ ; $v⃗ = rω u⃗_θ$ ; $a⃗ = −rω² u⃗_r$', '$ω = @r{G M_T/(R_T + h)³}$ ≈ 1,1·10⁻³ rad·s⁻¹', '$T$ ≈ 5,7·10³ s ≈ 1,6 h']),
    traps: [X('Prendre $r$ = 400 km : le rayon de l’orbite se compte depuis le centre de la Terre.'), X('Oublier le cube : ω² = $GM_T/r³$.')],
    grading: 'imprimé sur le sujet : 8 points.',
    official: true, note: 'Le corrigé officiel arrondit ω à 10⁻³ rad/s (soit 6 280 s) puis écrit « 1,4 h » : 6 280 s font 1,7 h. Avec les données, $T$ ≈ 5,7·10³ s ≈ 1,6 h.'
  });
})();
