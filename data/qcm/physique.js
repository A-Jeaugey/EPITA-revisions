/* Banque de questions — Physique (mécanique du point), questions de cours.
   Sources : cours « Mécanique du point » du Moodle 2026-2027 (chapitres I à VI, partiel 1) et TD 1 à 5.
   Ids « phys-cN-xx » : chapitre N du site (physique/cours-N-….html), rangés dans l’ordre des parties ; les trois
   premières questions d’une partie servent à sa vérification (<div data-check-ref="…#sK" data-n="3">).
   Les questions de QCM des partiels sont dans physique-annales.js (chargé après ce fichier) ; celles qui
   doublent une question d’ici portent same:'phys-c…'.
   Notation dans les textes (convertie en HTML à la fin du fichier, fonction m) :
     {v}, {OM}, {u_x}, {F_1→2} : vecteur (flèche dessinée par la classe .vec), indice après « _ » ;
     `x`, `v_0`, `θ̇`, `m g` : grandeur en italique, indice après « _ » (italique pour x, y, z, r, θ, ρ).
   Réponses numériques recalculées par un petit script node, faisables sans calculatrice. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var T = window.QCM_TOPICS = window.QCM_TOPICS || {};
  T['phys-cadre'] = 'Cadre de l’étude';
  T['phys-pva'] = 'Position, vitesse, accélération';
  T['phys-mouvement'] = 'Nature du mouvement';
  T['phys-integrer'] = 'Équations horaires, intégration';
  T['phys-trajectoire'] = 'Équation de la trajectoire';
  T['phys-tir'] = 'Tir et chute libre';
  T['phys-vecteurs'] = 'Composantes et produit scalaire';
  T['phys-forces'] = 'Les forces';
  T['phys-newton'] = 'Lois de Newton';
  T['phys-travail'] = 'Travail et puissance';
  T['phys-energie'] = 'Énergie : Ec, Ep, EM';
  T['phys-polaires'] = 'Coordonnées et base polaires';
  T['phys-polaires-va'] = 'Vitesse et accélération en polaires';
  T['phys-circulaire'] = 'Mouvement circulaire';
  T['phys-unites'] = 'Unités et homogénéité';

  var C1 = 'physique/cours-1-cinematique.html', C2 = 'physique/cours-2-dynamique.html',
    C3 = 'physique/cours-3-energie.html', C4 = 'physique/cours-4-polaires.html';

  /* ---------- figures : SVG en ligne aux couleurs du thème (réutilisées par data/en/qcm/physique.js) ---------- */
  var FIG = window.PHYS_QFIG = window.PHYS_QFIG || {};
  var MATH = 'font-family="\'STIX Two Text\',\'Cambria Math\',serif"';
  function r1(v) { return Math.round(v * 10) / 10; }
  /* flèche de (x1, y1) à (x2, y2), pointe pleine */
  FIG.arrow = function (x1, y1, x2, y2, style, w) {
    var dx = x2 - x1, dy = y2 - y1, l = Math.sqrt(dx * dx + dy * dy), ux = dx / l, uy = dy / l, h = 8, b = 3.6;
    var bx = x2 - h * ux, by = y2 - h * uy;
    return '<line x1="' + r1(x1) + '" y1="' + r1(y1) + '" x2="' + r1(bx) + '" y2="' + r1(by) + '" style="stroke:' + style + ';stroke-width:' + (w || 2) + '"/>' +
      '<polygon points="' + r1(x2) + ',' + r1(y2) + ' ' + r1(bx - b * uy) + ',' + r1(by + b * ux) + ' ' + r1(bx + b * uy) + ',' + r1(by - b * ux) + '" style="fill:' + style + '"/>';
  };
  /* nom de vecteur : lettre italique, indice, petite flèche au-dessus */
  FIG.vlab = function (x, y, letter, sub, style) {
    var fill = style ? ' style="fill:' + style + '"' : ' fill="currentColor"';
    var line = style ? ' style="stroke:' + style + '"' : ' stroke="currentColor"';
    var it = /^[xyzrθρ]$/.test(sub || '');
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" ' + MATH + ' font-size="15" font-style="italic"' + fill + '>' + letter +
      (sub ? '<tspan font-size="10.5" dy="3.5" font-style="' + (it ? 'italic' : 'normal') + '">' + sub + '</tspan>' : '') + '</text>' +
      '<path d="M' + r1(x + 1) + ' ' + r1(y - 13) + 'h8m-2.6 -2.2 2.6 2.2 -2.6 2.2" fill="none" stroke-width="1"' + line + '/>';
  };
  /* plan incliné (TD 2, Ex 2) : pente d’environ 30°, robot M, vecteurs de base et poids ; w = lettre du poids */
  FIG.incline = function (alt, w) {
    var A = FIG.arrow, L = FIG.vlab, mx = 111, my = 85, ux = 0.8742, uy = 0.4856;
    return '<svg viewBox="0 0 240 160" width="240" role="img" aria-label="' + alt + '">' +
      '<polygon points="30,40 210,140 30,140" fill="currentColor" fill-opacity=".07" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<line x1="14" y1="140" x2="226" y2="140" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M176 140A34 34 0 0 1 180.3 123.5" fill="none" stroke="currentColor" stroke-width="1.2"/>' +
      '<text x="158" y="133" ' + MATH + ' font-size="14" font-style="italic" fill="currentColor">α</text>' +
      A(mx, my, mx + 38 * ux, my + 38 * uy, 'currentColor', 1.6) + L(mx + 38 * ux + 3, my + 38 * uy - 12, 'u', 'x') +
      A(mx, my, mx + 38 * uy, my - 38 * ux, 'currentColor', 1.6) + L(mx + 38 * uy + 6, my - 38 * ux + 4, 'u', 'y') +
      A(mx, my, mx, my + 44, 'var(--accent)', 2.2) + L(mx + 6, my + 44, w, '', 'var(--accent)') +
      '<circle cx="' + mx + '" cy="' + my + '" r="4" fill="currentColor"/>' +
      '<text x="' + (mx - 22) + '" y="' + (my + 14) + '" font-size="13" fill="currentColor">M</text></svg>';
  };
  var PENTE = FIG.incline('Plan incliné d’angle α avec le sol. Le robot M est posé sur la pente. Le vecteur u x est dirigé le long de la pente vers le bas, le vecteur u y perpendiculaire à la pente vers le haut ; le poids P est vertical, vers le bas.', 'P');

  var Q = [
    /* ================= chapitre 1 : cinématique cartésienne ================= */
    /* ---------- 1. cadre de l’étude ---------- */
    { id: 'phys-c1-01', topic: 'phys-cadre', lvl: 1, type: 'single', q: 'Un référentiel est dit galiléen si…',
      o: ['il ne subit aucune accélération', 'il est lié à la Terre', 'ses axes sont orthonormés', 'son origine est le point de départ du mobile'], a: 0,
      x: 'C’est la définition 2 du cours. Le référentiel terrestre n’est que « supposé galiléen » : on l’accepte pour des mouvements courts (une balle, une voiture). Des axes orthonormés et une origine, c’est le choix du repère, pas une propriété du référentiel.', ref: C1 + '#s1' },
    { id: 'phys-c1-02', topic: 'phys-cadre', lvl: 1, type: 'single', q: 'On peut modéliser un système par un point matériel quand…',
      o: ['on peut négliger sa taille et sa rotation sur lui-même', 'sa masse est faible', 'il est immobile', 'il se déplace en ligne droite'], a: 0,
      x: 'Définition 1 du cours. Tout dépend du problème : la Terre qui tourne autour du Soleil est un point matériel (son rayon est petit devant la distance Terre-Soleil), la Terre qui tourne sur elle-même (durée du jour) n’en est pas un. La masse n’y est pour rien.', ref: C1 + '#s1' },
    { id: 'phys-c1-03', topic: 'phys-cadre', lvl: 1, type: 'multi', q: 'Que précises-tu au début d’une copie, avant la première équation ?',
      o: ['le système étudié', 'le référentiel', 'le repère : origine et axes', 'l’origine des temps', 'la masse du système, en kg'], a: [0, 1, 2, 3],
      x: 'Ce sont les premières lignes attendues (TD 1, Ex 3 : « donner le cadre d’étude »). Par exemple : système, le projectile assimilé à un point M ; référentiel terrestre supposé galiléen ; repère (O, {u_x}, {u_y}) avec {u_y} vers le haut ; `t` = 0 au lancement. La masse n’en fait pas partie : elle peut rester littérale, et la cinématique n’en a pas besoin.', ref: C1 + '#s1' },
    { id: 'phys-c1-04', topic: 'phys-cadre', lvl: 2, type: 'tf', a: false, q: '« Un passager assis dans un train qui roule est immobile. » Cette phrase est vraie quel que soit le référentiel.',
      x: 'Faux. Le passager est immobile dans le référentiel du train, mais il se déplace à la vitesse du train dans le référentiel terrestre. Un mouvement n’a de sens que par rapport à un référentiel : c’est pour ça qu’on le précise toujours.', ref: C1 + '#s1' },

    /* ---------- 2. vecteur position ---------- */
    { id: 'phys-c1-05', topic: 'phys-pva', lvl: 1, type: 'single', q: 'Les équations horaires d’un point sont `x`(`t`) = 2`t` et `y`(`t`) = `t`² − 1 (en m, `t` en s). Que vaut le vecteur position à `t` = 2 s ?',
      o: ['{OM} = 4 {u_x} + 3 {u_y}', '{OM} = 4 + 3 = 7 m', '{OM} = 4 {u_x} + 4 {u_y}', '{OM} = 2 {u_x} + 4 {u_y}'], a: 0,
      x: 'On remplace `t` par 2 dans chaque coordonnée : `x`(2) = 4 et `y`(2) = 4 − 1 = 3. Un vecteur s’écrit avec les vecteurs de base, pas comme un nombre : additionner 4 et 3 n’a pas de sens. 2 {u_x} + 4 {u_y}, c’est la vitesse à `t` = 2 s (dérivées 2 et 2`t`), pas la position.', ref: C1 + '#s2' },
    { id: 'phys-c1-06', topic: 'phys-pva', lvl: 1, type: 'num', unit: 'm', a: 5, q: 'Un point M a pour coordonnées (3 ; 4), en mètres. À quelle distance de l’origine O se trouve-t-il ?',
      x: 'La distance OM est la norme du vecteur position : OM = √(`x`² + `y`²) = √(9 + 16) = √25 = 5 m. Pas 3 + 4 = 7 m : on n’additionne pas les coordonnées.', ref: C1 + '#s2' },
    { id: 'phys-c1-07', topic: 'phys-pva', lvl: 1, type: 'single', q: 'Une voiture est garée à 7 m de la porte du domicile (TD 1, Ex 1). L’origine O est la porte, l’axe suit la route, orienté de la porte vers la voiture, et `t` = 0 au démarrage. Que vaut `x`(0) ?',
      o: ['7 m', '0 m, puisque la voiture n’a pas encore roulé', '−7 m', 'on ne peut pas le savoir sans la vitesse'], a: 0,
      x: '`x` est la position par rapport à O, pas la distance parcourue. Au démarrage, la voiture n’a encore rien parcouru, mais elle est à 7 m de la porte, du côté des `x` positifs : `x`(0) = 7 m. C’est le « + 7 » de `x`(`t`) = 1,25 `t`² + 7.', ref: C1 + '#s2' },

    /* ---------- 3. vecteur vitesse ---------- */
    { id: 'phys-c1-08', topic: 'phys-pva', lvl: 1, type: 'single', q: 'Les équations horaires sont `x`(`t`) = 3`t`² + 2 et `y`(`t`) = 4`t` (en m, `t` en s). Que vaut le vecteur vitesse ?',
      o: ['{v} = 6`t` {u_x} + 4 {u_y}', '{v} = 3`t` {u_x} + 4 {u_y}', '{v} = (6`t` + 2) {u_x} + 4 {u_y}', '{v} = 6 {u_x}'], a: 0,
      x: 'En cartésien, {u_x} et {u_y} sont fixes : on dérive chaque coordonnée. (3`t`²)′ = 6`t` (l’exposant descend en facteur), la constante 2 disparaît, (4`t`)′ = 4. 6 {u_x}, c’est l’accélération : une dérivée de trop.', ref: C1 + '#s3' },
    { id: 'phys-c1-09', topic: 'phys-pva', lvl: 1, type: 'num', unit: 'm·s⁻¹', a: 10, q: 'Un point a pour vitesse {v} = 6 {u_x} + 8 {u_y}, en m·s⁻¹. Que vaut sa vitesse, c’est-à-dire la norme ‖{v}‖ ?',
      x: '‖{v}‖ = √(`v_x`² + `v_y`²) = √(36 + 64) = √100 = 10 m·s⁻¹. Pas 6 + 8 = 14 : les deux composantes sont perpendiculaires, c’est Pythagore.', ref: C1 + '#s3' },
    { id: 'phys-c1-10', topic: 'phys-pva', lvl: 2, type: 'single', q: 'On a `x`(`t`) = 5 cos(2`t`). Que vaut `ẋ` ?',
      o: ['−10 sin(2`t`)', '−5 sin(2`t`)', '10 sin(2`t`)', '5 sin(2`t`)'], a: 0,
      x: 'Dérivée d’une fonction composée : (cos `u`)′ = −`u`′ sin `u`, avec `u` = 2`t` et `u`′ = 2. Donc `ẋ` = 5 × (−2 sin(2`t`)) = −10 sin(2`t`). Oublier le facteur 2 ou le signe moins sont les deux erreurs classiques ; des équations en cos(ω`t`) et sin(ω`t`) reviennent dans la plupart des partiels.', ref: C1 + '#s3' },
    { id: 'phys-c1-11', topic: 'phys-pva', lvl: 2, type: 'single', q: 'Le vecteur vitesse {v} d’un point M est toujours…',
      o: ['tangent à la trajectoire, dans le sens du mouvement', 'colinéaire au vecteur position {OM}', 'dirigé vers l’origine O', 'perpendiculaire à la trajectoire'], a: 0,
      x: 'Pendant d`t`, M avance de d{OM}, un petit morceau de trajectoire : {v} = d{OM}/d`t` est colinéaire à ce déplacement, donc tangent à la trajectoire. Il n’a aucune raison d’être aligné avec {OM}, qui dépend du choix de l’origine.', ref: C1 + '#s3' },
    { id: 'phys-c1-12', topic: 'phys-unites', lvl: 1, type: 'num', unit: 'm·s⁻¹', a: 25, q: 'Le TGV du TD 1 roule à 90 km/h. Combien cela fait-il en m·s⁻¹ ?',
      x: '1 km/h = 1 000 m en 3 600 s = 1/3,6 m·s⁻¹. Pour passer des km/h aux m·s⁻¹, on divise par 3,6 : 90/3,6 = 25 m·s⁻¹. Multiplier donnerait 324 m·s⁻¹, plus de 1 000 km/h.', ref: C1 + '#s3' },

    /* ---------- 4. vecteur accélération ---------- */
    { id: 'phys-c1-13', topic: 'phys-pva', lvl: 1, type: 'single', q: 'Un point a pour vitesse {v} = 6`t` {u_x} + 4 {u_y} (en m·s⁻¹). Que vaut son accélération ?',
      o: ['{a} = 6 {u_x}', '{a} = 6 {u_x} + 4 {u_y}', '{a} = 6`t` {u_x}', '{a} = 3`t`² {u_x} + 4`t` {u_y}'], a: 0,
      x: '{a} = d{v}/d`t` : on dérive chaque composante. (6`t`)′ = 6 et (4)′ = 0 : une composante constante de la vitesse donne une accélération nulle sur cet axe. 3`t`² {u_x} + 4`t` {u_y} est une primitive : on a intégré au lieu de dériver.', ref: C1 + '#s4' },
    { id: 'phys-c1-14', topic: 'phys-mouvement', lvl: 2, type: 'single', q: 'Comment sais-tu si un mouvement est accéléré ou décéléré ?',
      o: ['avec le signe du produit scalaire {v} · {a}', 'avec le signe de l’accélération seule', 'avec le signe de la position `x`', 'en regardant si la trajectoire est une droite'], a: 0,
      x: 'Cours : {v} · {a} > 0, le mouvement est accéléré (la norme de la vitesse augmente) ; {v} · {a} &lt; 0, il est décéléré ; {v} · {a} = 0 avec {a} ≠ {0}, seule la direction change. Le signe de l’accélération seule ne suffit pas : une balle qui descend a `a_y` = −`g` &lt; 0, et pourtant elle va de plus en plus vite.', ref: C1 + '#s4' },
    { id: 'phys-c1-15', topic: 'phys-mouvement', lvl: 2, type: 'single', q: 'Après le sommet d’un tir, la balle redescend : `v_y` &lt; 0 et {a} = −`g` {u_y}, avec {u_y} vers le haut. Sur l’axe vertical, son mouvement est…',
      o: ['accéléré', 'décéléré, car l’accélération est négative', 'décéléré, car la balle descend', 'uniforme'], a: 0,
      x: '`v_y` et `a_y` = −`g` sont toutes deux négatives : leur produit est positif, le mouvement est accéléré (la balle va de plus en plus vite vers le bas). À la montée, `v_y` > 0 et `a_y` &lt; 0 : décéléré. Le signe de `a_y` seul ne dit rien.', ref: C1 + '#s4' },
    { id: 'phys-c1-16', topic: 'phys-unites', lvl: 2, type: 'num', unit: 'm·s⁻²', a: 12.5, q: 'Une Formule 1 passe de 0 à 180 km/h en 4 s (TD 1, Ex 2). Que vaut son accélération moyenne ?',
      x: 'D’abord en unités SI : 180 km/h = 180/3,6 = 50 m·s⁻¹. Puis `a`<sub>moy</sub> = Δ`v`/Δ`t` = 50/4 = 12,5 m·s⁻², environ 1,25 `g`. 180/4 = 45 donne des km/h par seconde, pas des m·s⁻². Le corrigé du TD arrondit à 12 m·s⁻² et 1,2 `g`.', ref: C1 + '#s4' },

    /* ---------- 5. mouvements rectilignes ---------- */
    { id: 'phys-c1-17', topic: 'phys-mouvement', lvl: 1, type: 'single', q: 'Un mouvement rectiligne uniforme a…',
      o: ['une accélération nulle', 'une accélération constante non nulle', 'une vitesse qui augmente régulièrement', 'une position constante'], a: 0,
      x: 'Rectiligne : la trajectoire est une droite, la direction de {v} ne change pas. Uniforme : la norme de {v} est constante. Donc {v} est un vecteur constant et {a} = {0}. Une accélération constante non nulle, c’est un mouvement uniformément varié ; une position constante, c’est le repos.', ref: C1 + '#s5' },
    { id: 'phys-c1-18', topic: 'phys-mouvement', lvl: 1, type: 'num', unit: 'm', a: 20, q: 'La voiture du TD 1 a pour position `x`(`t`) = 1,25 `t`² + 7 (en m, `t` en s). Quelle distance a-t-elle parcourue entre `t` = 0 et `t` = 4 s ?',
      x: '`x`(4) = 1,25 × 16 + 7 = 27 m : c’est la position. La voiture partait de `x`(0) = 7 m et roule toujours dans le même sens : distance parcourue = 27 − 7 = 20 m. Le corrigé du TD répond 27 m, qui est la position et pas la distance.', ref: C1 + '#s5' },
    { id: 'phys-c1-19', topic: 'phys-mouvement', lvl: 2, type: 'single', q: 'Sur un axe, `x`(`t`) = 2`t`² − 8`t` + 1 (en m, `t` en s). Entre `t` = 0 et `t` = 2 s, le mouvement est…',
      o: ['décéléré', 'accéléré, car `a` = 4 m·s⁻² est positive', 'accéléré, car `x` diminue', 'uniforme'], a: 0,
      x: '`v` = 4`t` − 8, négative pour `t` &lt; 2 s ; `a` = 4 m·s⁻², positive. Signes opposés : `v a` &lt; 0, le mobile ralentit. Il s’arrête à `t` = 2 s, puis repart vers les `x` croissants : là, le mouvement devient accéléré. Le signe de `a` seul, ou le sens de variation de `x`, ne suffisent pas.', ref: C1 + '#s5' },
    { id: 'phys-c1-20', topic: 'phys-mouvement', lvl: 2, type: 'multi', q: 'Sur un axe, `x`(`t`) = 3`t` + 2 (en m, `t` en s). Quelles affirmations sont justes ?',
      o: ['le mouvement est rectiligne uniforme', 'la vitesse vaut 3 m·s⁻¹', 'l’accélération est nulle', 'la position initiale est nulle', 'la vitesse vaut 5 m·s⁻¹ à `t` = 1 s'], a: [0, 1, 2],
      x: '`v` = 3 m·s⁻¹, constante, et `a` = 0 : mouvement rectiligne uniforme. La position initiale est `x`(0) = 2 m, pas 0. 5 m est la position à `t` = 1 s, pas la vitesse.', ref: C1 + '#s5' },

    /* ---------- 6. intégrer avec les conditions initiales ---------- */
    { id: 'phys-c1-21', topic: 'phys-integrer', lvl: 1, type: 'single', q: 'Sur un axe, `a`(`t`) = −10 m·s⁻² et `v`(0) = 4 m·s⁻¹. Que vaut `v`(`t`) ?',
      o: ['`v`(`t`) = −10`t` + 4', '`v`(`t`) = −10`t`', '`v`(`t`) = −5`t`² + 4', '`v`(`t`) = −6'], a: 0,
      x: 'On intègre : `v`(`t`) = −10`t` + `C`. À `t` = 0, `v`(0) = `C` = 4. La constante vaut la vitesse initiale : la mettre à 0 par réflexe est l’erreur la plus fréquente. −5`t`² vient d’une intégration de trop.', ref: C1 + '#s6' },
    { id: 'phys-c1-22', topic: 'phys-integrer', lvl: 2, type: 'single', q: 'Sur l’axe vertical, `v_y`(`t`) = −`g t` + `v_0` et `y`(0) = `h`. Que vaut `y`(`t`) ?',
      o: ['`y`(`t`) = −½ `g t`² + `v_0` `t` + `h`', '`y`(`t`) = −`g t`² + `v_0` `t` + `h`', '`y`(`t`) = −½ `g t`² + `v_0` `t`', '`y`(`t`) = −`g` + `h`'], a: 0,
      x: 'Une primitive de −`g t` est −½ `g t`² (pas −`g t`² : dérive pour vérifier), une primitive de `v_0` est `v_0` `t`. La constante est fixée par `y`(0) = `h` : sans elle, le point partirait du sol.', ref: C1 + '#s6' },
    { id: 'phys-c1-23', topic: 'phys-integrer', lvl: 2, type: 'num', unit: 's', a: 1, q: 'Un point est lâché sans vitesse initiale à 5 m du sol. Axe {u_y} vers le haut, O au sol, `g` = 10 m·s⁻². Au bout de combien de temps touche-t-il le sol ?',
      x: 'C’est l’exemple du cours : `a` = −`g`, `v`(`t`) = −`g t` (vitesse initiale nulle), `y`(`t`) = 5 − 5`t`². Au sol, `y`(`T`) = 0, donc `T`² = 1 et `T` = 1 s. En général, `T` = √(2`h`/`g`), pas √(2`h`)/`g`.', ref: C1 + '#s6' },
    { id: 'phys-c1-24', topic: 'phys-integrer', lvl: 2, type: 'single', q: 'Une pierre tombe en chute libre : {a} = {g}, vertical vers le bas. Tu choisis l’axe {u_y} orienté vers le bas. Que vaut `a_y` ?',
      o: ['+`g`', '−`g`', '0', 'cela dépend de la masse de la pierre'], a: 0,
      x: '{g} est dirigé vers le bas, dans le même sens que {u_y} : `a_y` = +`g`. Le cours prend {u_y} vers le haut, et alors `a_y` = −`g`. Le signe dépend de l’axe : dessine-le avant d’écrire la projection. La masse n’intervient pas en chute libre.', ref: C1 + '#s6' },

    /* ---------- 7. équation de la trajectoire ---------- */
    { id: 'phys-c1-25', topic: 'phys-trajectoire', lvl: 1, type: 'single', q: '`x`(`t`) = 2`t` et `y`(`t`) = 4`t`² (en m). Quelle est l’équation de la trajectoire ?',
      o: ['`y` = `x`²', '`y` = 4`t`²', '`y` = 2`x`²', '`y` = 4`x`²'], a: 0,
      x: 'On isole `t` dans l’équation la plus simple : `t` = `x`/2. On remplace : `y` = 4 (`x`/2)² = 4`x`²/4 = `x`². Le carré porte sur tout le quotient. Une équation de trajectoire relie `y` et `x` : il ne doit plus y rester de `t`.', ref: C1 + '#s7' },
    { id: 'phys-c1-26', topic: 'phys-trajectoire', lvl: 1, type: 'tf', a: true, q: 'Dans l’équation de la trajectoire `y`(`x`), le temps `t` ne doit plus apparaître.',
      x: 'Vrai. La trajectoire est la courbe dessinée par le point, sans l’information du temps : on élimine `t` entre `x`(`t`) et `y`(`t`). Un `t` qui reste dans « `y`(`x`) » est une erreur.', ref: C1 + '#s7' },
    { id: 'phys-c1-27', topic: 'phys-trajectoire', lvl: 3, type: 'single', q: 'Au partiel de novembre 2017 : `x`(`t`) = 1 + `R` sin(ω`t`) et `y`(`t`) = 2 + `R` cos(ω`t`), avec `R` > 0 et ω constants. La trajectoire est…',
      o: ['un cercle de centre (1 ; 2) et de rayon `R`', 'un cercle de centre O et de rayon `R`', 'une ellipse', 'une droite'], a: 0,
      x: 'sin(ω`t`) = (`x` − 1)/`R` et cos(ω`t`) = (`y` − 2)/`R`. Comme sin² + cos² = 1 : (`x` − 1)² + (`y` − 2)² = `R`². C’est un cercle de centre (1 ; 2), pas O : les constantes 1 et 2 décalent le centre. Donne toujours la nature et les caractéristiques de la trajectoire (centre, rayon).', ref: C1 + '#s7' },

    /* ---------- 8. tir : sommet, portée, impact ---------- */
    { id: 'phys-c1-28', topic: 'phys-tir', lvl: 2, type: 'num', unit: 's', a: 1, q: 'Un projectile est lancé du sol avec `v_0` = 20 m·s⁻¹, à α = 30° au-dessus de l’horizontale (`g` = 10 m·s⁻², sin 30° = ½). À quel instant atteint-il le sommet ?',
      x: 'Au sommet, la vitesse verticale s’annule : `v_y` = `v_0` sin α − `g t` = 0, donc `t`<sub>S</sub> = `v_0` sin α / `g` = 20 × ½ / 10 = 1 s. Avec cos α au lieu de sin α, on trouverait 1,7 s : quand α est mesuré depuis l’horizontale, la composante verticale prend le sinus.', ref: C1 + '#s8' },
    { id: 'phys-c1-29', topic: 'phys-tir', lvl: 2, type: 'num', unit: 'm', a: 5, q: 'Même tir : `v_0` = 20 m·s⁻¹, α = 30°, `g` = 10 m·s⁻², départ au sol. Quelle hauteur maximale atteint-il ?',
      x: '`y`<sub>S</sub> = `y`(`t`<sub>S</sub>) = (`v_0` sin α) × 1 − 5 × 1² = 10 − 5 = 5 m. Formule générale : `y`<sub>S</sub> = `v_0`² sin² α / (2`g`) = 400 × ¼ / 20 = 5 m. Oublier le carré sur sin α donne 10 m.', ref: C1 + '#s8' },
    { id: 'phys-c1-30', topic: 'phys-tir', lvl: 2, type: 'single', q: 'Au sommet de la trajectoire d’un tir oblique, le vecteur vitesse est…',
      o: ['horizontal, de norme `v_0` cos α', 'nul', 'vertical', 'horizontal, de norme `v_0`'], a: 0,
      x: 'Au sommet, seule `v_y` s’annule. `v_x` = `v_0` cos α reste constante pendant tout le vol (aucune accélération horizontale) : {v} = `v_0` cos α {u_x}. La vitesse ne vaut `v_0` qu’au départ.', ref: C1 + '#s8' },
    { id: 'phys-c1-31', topic: 'phys-tir', lvl: 1, type: 'tf', a: false, q: 'Au sommet de la trajectoire d’un tir, l’accélération est nulle.',
      x: 'Faux. {a} = {g} = −`g` {u_y} en tout point du vol, sommet compris. Au sommet, c’est `v_y` qui s’annule, pas l’accélération. Si l’accélération s’annulait, la balle partirait tout droit à l’horizontale.', ref: C1 + '#s8' },
    { id: 'phys-c1-32', topic: 'phys-tir', lvl: 2, type: 'single', q: 'Un projectile part du sol et y retombe, avec une vitesse initiale `v_0` fixée. Pour quel angle α sa portée est-elle maximale ?',
      o: ['45°', '90°', '30°', '60°'], a: 0,
      x: 'La portée vaut `x`<sub>P</sub> = `v_0`² sin(2α) / `g`, maximale quand sin(2α) = 1, soit α = 45°. À 90°, le projectile retombe sur son point de départ : portée nulle. 30° et 60° donnent la même portée, plus petite.', ref: C1 + '#s8' },

    /* ================= chapitre 2 : forces et lois de Newton ================= */
    /* ---------- 1. forces et référentiel galiléen ---------- */
    { id: 'phys-c2-01', topic: 'phys-unites', lvl: 1, type: 'single', q: 'Une force se mesure en newtons (N). En unités SI, 1 N vaut…',
      o: ['1 kg·m·s⁻²', '1 kg·m·s⁻¹', '1 kg·s⁻²', '1 kg·m²·s⁻²'], a: 0,
      x: 'Avec Σ{F} = `m` {a} : kg × m·s⁻². kg·m·s⁻¹ est l’unité de la quantité de mouvement `m` {v}, kg·m²·s⁻² celle d’une énergie (le joule).', ref: C2 + '#s1' },
    { id: 'phys-c2-02', topic: 'phys-forces', lvl: 1, type: 'multi', q: 'Que faut-il donner pour décrire complètement une force ?',
      o: ['sa norme, en N', 'sa direction', 'son sens', 'son point d’application', 'la vitesse du système'], a: [0, 1, 2, 3],
      x: 'Une force est un vecteur : norme (son intensité, en newtons), direction, sens, et origine, son point d’application, sur l’objet qui subit la force. La vitesse du système n’en fait pas partie : une force peut s’exercer sur un objet immobile.', ref: C2 + '#s1' },
    { id: 'phys-c2-03', topic: 'phys-newton', lvl: 1, type: 'single', q: 'Les lois de Newton s’appliquent dans…',
      o: ['un référentiel galiléen', 'n’importe quel référentiel', 'un repère cartésien seulement', 'le référentiel lié au système étudié'], a: 0,
      x: 'Chacune commence par « dans un référentiel galiléen ». Le référentiel terrestre est supposé galiléen pour des mouvements courts. Le repère (cartésien, polaire) est un choix de coordonnées, sans rapport avec la validité des lois. Dans son propre référentiel, le système est toujours immobile : ce référentiel n’est pas galiléen dès que le système accélère.', ref: C2 + '#s1' },

    /* ---------- 2. bilan des forces ---------- */
    { id: 'phys-c2-04', topic: 'phys-forces', lvl: 1, type: 'single', q: 'Un livre est posé, immobile, sur une table. Quelles forces s’exercent sur le livre ?',
      o: ['son poids {P} et la réaction {R} de la table', 'son poids {P} seulement', 'son poids {P}, la réaction {R} de la table et la force exercée par le livre sur la table', 'aucune, puisqu’il est immobile'], a: 0,
      x: 'TD 2, Ex 1. Le bilan ne compte que les forces subies par le système. La force du livre sur la table s’exerce sur la table. Immobile ne veut pas dire « sans force » : {P} et {R} se compensent, leur somme est nulle.', ref: C2 + '#s2' },
    { id: 'phys-c2-05', topic: 'phys-forces', lvl: 2, type: 'multi', q: 'Une bille est suspendue à un fil, immobile. Quelles forces s’exercent sur la bille ?',
      o: ['son poids {P}, vertical vers le bas', 'la tension {T} du fil, dirigée de la bille vers le point d’attache', 'la tension {T} du fil, dirigée du point d’attache vers la bille', 'une réaction {R} perpendiculaire au fil'], a: [0, 1],
      x: 'Deux forces : le poids et la tension. Le cours : la tension a la direction du fil et va de l’objet vers le fil ; un fil tire, il ne pousse jamais. Il n’y a pas de support, donc pas de réaction. Immobile : {P} + {T} = {0}, donc `T` = `m g`.', ref: C2 + '#s2' },
    { id: 'phys-c2-06', topic: 'phys-vecteurs', lvl: 2, type: 'num', unit: 'N', a: 5, q: 'Deux forces perpendiculaires, de normes 3 N et 4 N, s’exercent sur un même point. Quelle est la norme de leur somme (la résultante) ?',
      x: 'Les forces s’additionnent comme des vecteurs. Perpendiculaires, elles forment les côtés d’un triangle rectangle : ‖{F_1} + {F_2}‖ = √(3² + 4²) = 5 N. 7 N ne vaut que si elles ont même direction et même sens, 1 N si elles sont de sens opposés.', ref: C2 + '#s2' },

    /* ---------- 3. poids, réaction, tension ---------- */
    { id: 'phys-c2-07', topic: 'phys-forces', lvl: 1, type: 'num', unit: 'N', a: 20, q: 'Quel est le poids d’un objet de masse 2 kg ? (`g` = 10 m·s⁻²)',
      x: '`P` = `m g` = 2 × 10 = 20 N. La masse (en kg) et le poids (une force, en N) sont deux grandeurs différentes.', ref: C2 + '#s3' },
    { id: 'phys-c2-08', topic: 'phys-forces', lvl: 1, type: 'single', q: 'La réaction {R} d’un support, sans frottement, est toujours…',
      o: ['perpendiculaire au support', 'verticale, vers le haut', 'opposée au poids, de même norme', 'parallèle au support'], a: 0,
      x: 'Cours : la réaction est toujours orthogonale au support ; sa norme se détermine au cas par cas avec la 2e loi de Newton. Sur un sol horizontal, elle est verticale et vaut `m g` à l’équilibre ; sur une pente d’angle α, elle est penchée et vaut `m g` cos α.', ref: C2 + '#s3' },
    { id: 'phys-c2-09', topic: 'phys-forces', lvl: 1, type: 'single', q: 'Avec l’axe {u_y} vertical vers le haut, le poids s’écrit…',
      o: ['{P} = −`m g` {u_y}', '{P} = `m g` {u_y}', '{P} = −`g` {u_y}', '{P} = −`m g` {u_x}'], a: 0,
      x: 'Le poids est vertical, vers le bas, de norme `m g` : il est opposé à {u_y}, d’où le signe moins. Sans `m`, c’est le champ de pesanteur {g}, pas le poids.', ref: C2 + '#s3' },
    { id: 'phys-c2-10', topic: 'phys-forces', lvl: 1, type: 'tf', a: false, q: 'La masse d’un objet est plus petite sur la Lune que sur la Terre.',
      x: 'Faux. La masse (en kg) mesure la capacité du corps à résister à sa mise en mouvement ; elle ne dépend pas du lieu. C’est le poids `P` = `m g` qui change : `g` vaut environ 1,6 m·s⁻² sur la Lune, environ 6 fois moins que sur Terre.', ref: C2 + '#s3' },

    /* ---------- 4. frottements, gravitation ---------- */
    { id: 'phys-c2-11', topic: 'phys-forces', lvl: 1, type: 'single', q: 'Le frottement fluide s’écrit {f} = −α {v}, avec α > 0. Que traduit le signe « − » ?',
      o: ['la force est opposée à la vitesse', 'la force est toujours dirigée vers le bas', 'le coefficient α est négatif', 'la force diminue au cours du temps'], a: 0,
      x: 'TD 2, Ex 3. α est positif ; le « − » dit que {f} et {v} sont de sens opposés : le frottement s’oppose toujours au mouvement. Projeté sur un axe vertical vers le haut pendant une chute (`v_y` &lt; 0), il donne `f_y` = −α`v_y` > 0 : vers le haut.', ref: C2 + '#s4' },
    { id: 'phys-c2-12', topic: 'phys-unites', lvl: 2, type: 'single', q: 'Dans {f} = −α {v}, quelle est l’unité de α ?',
      o: ['kg·s⁻¹', 'N', 'kg·m·s⁻¹', 's⁻¹'], a: 0,
      x: 'Par homogénéité : α = `f`/`v`, en N/(m·s⁻¹) = (kg·m·s⁻²)/(m·s⁻¹) = kg·s⁻¹. C’est une question du TD 2 (Ex 3, partie II).', ref: C2 + '#s4' },
    { id: 'phys-c2-13', topic: 'phys-forces', lvl: 2, type: 'single', q: 'Si la distance entre deux corps double, la force de gravitation entre eux est…',
      o: ['divisée par 4', 'divisée par 2', 'multipliée par 4', 'inchangée'], a: 0,
      x: '`F` = `G m_1` `m_2`/`d`² : la force varie comme 1/`d`². Distance × 2, donc `d`² × 4 et force ÷ 4.', ref: C2 + '#s4' },
    { id: 'phys-c2-14', topic: 'phys-forces', lvl: 2, type: 'multi', q: 'Que dit le cours de la force de gravitation entre deux corps ?',
      o: ['elle est toujours attractive', 'sa portée est infinie', 'elle peut être répulsive, comme la force de Coulomb', 'elle ne dépend pas des masses'], a: [0, 1],
      x: 'Toujours attractive, de portée infinie, proportionnelle au produit des masses et à 1/`d`². C’est la force de Coulomb qui peut être attractive ou répulsive, car une charge peut être négative ; une masse est toujours positive.', ref: C2 + '#s4' },
    { id: 'phys-c2-15', topic: 'phys-forces', lvl: 3, type: 'single', q: 'Deux corps de masses `m_1` et `m_2` sont à la distance `d`. {u} est le vecteur unitaire dirigé du corps 1 vers le corps 2. Quelle est la force exercée par le corps 1 sur le corps 2 ?',
      o: ['{F_1→2} = −`G m_1` `m_2` / `d`² {u}', '{F_1→2} = `G m_1` `m_2` / `d`² {u}', '{F_1→2} = −`G m_1` `m_2` / `d` {u}', '{F_1→2} = `G m_1` `m_2` `d`² {u}'], a: 0,
      x: 'La force est attractive : elle tire le corps 2 vers le corps 1, dans le sens opposé à {u}, qui va de 1 vers 2. D’où le « − ». Le cours écrit la formule sans « − » et sans dire dans quel sens va le vecteur unitaire : retiens cette forme, et vérifie toujours que la force pointe vers l’autre corps.', ref: C2 + '#s4' },

    /* ---------- 5. première loi ---------- */
    { id: 'phys-c2-16', topic: 'phys-newton', lvl: 1, type: 'single', q: 'D’après la 1re loi de Newton (principe d’inertie), dans un référentiel galiléen, un point qui ne subit aucune force, ou des forces qui se compensent…',
      o: ['reste immobile ou garde un mouvement rectiligne uniforme', 'finit toujours par s’arrêter', 'reste forcément immobile', 'décrit un cercle'], a: 0,
      x: 'S’il était au repos, il reste au repos ; s’il était en mouvement, ce mouvement est rectiligne uniforme. Un objet qui ralentit et s’arrête subit une force : un frottement.', ref: C2 + '#s5' },
    { id: 'phys-c2-17', topic: 'phys-newton', lvl: 2, type: 'tf', a: true, q: 'Une voiture roule à 90 km/h constants sur une route droite. La somme des forces qui s’exercent sur elle est nulle.',
      x: 'Vrai. Mouvement rectiligne uniforme : {v} est constant, {a} = {0}, donc Σ{F} = `m` {a} = {0}. La force motrice compense exactement les frottements. Il ne faut pas de force pour garder sa vitesse, il en faut pour en changer.', ref: C2 + '#s5' },
    { id: 'phys-c2-18', topic: 'phys-newton', lvl: 2, type: 'single', q: 'Un palet glisse sur une glace horizontale parfaitement lisse, sans aucun frottement. Une fois lancé, il…',
      o: ['continue en ligne droite à vitesse constante', 'ralentit, puisque plus rien ne le pousse', 'accélère', 'tourne'], a: 0,
      x: 'Sur le palet : le poids {P} et la réaction {R}, qui se compensent. La somme des forces est nulle : mouvement rectiligne uniforme (principe d’inertie). Dans la réalité, il ralentit à cause des frottements.', ref: C2 + '#s5' },

    /* ---------- 6. deuxième loi ---------- */
    { id: 'phys-c2-19', topic: 'phys-newton', lvl: 1, type: 'single', q: 'Pour un système de masse constante, la 2e loi de Newton (principe fondamental de la dynamique) s’écrit…',
      o: ['Σ{F} = `m` {a}', 'Σ{F} = `m` {v}', 'Σ{F} = {0}', 'Σ{F} = `m` {g}'], a: 0,
      x: 'Σ{F} = d{p}/d`t` = `m` {a}, dans un référentiel galiléen. Σ{F} = {0} est le cas particulier où {a} = {0} (repos ou mouvement rectiligne uniforme). Σ{F} = `m` {g} n’est vrai qu’en chute libre, quand le poids est la seule force.', ref: C2 + '#s6' },
    { id: 'phys-c2-20', topic: 'phys-newton', lvl: 1, type: 'num', unit: 'm·s⁻²', a: 5, q: 'Un robot de 10 kg roule sur un sol horizontal, poussé par une force horizontale de 50 N ; les frottements sont négligés (TD 2, Ex 3). Que vaut son accélération ?',
      x: 'Sur l’axe horizontal, seule la poussée agit ({P} et {R} sont verticales et se compensent) : `m a` = `F`, donc `a` = 50/10 = 5 m·s⁻².', ref: C2 + '#s6' },
    { id: 'phys-c2-21', topic: 'phys-newton', lvl: 2, type: 'tf', a: true, q: 'En chute libre, une boule de pétanque et une bille tombent avec la même accélération.',
      x: 'Vrai. Seule force : le poids. `m` {a} = `m` {g}, la masse se simplifie et {a} = {g} pour tout objet. Le cours le note : l’accélération ne dépend pas de la masse de l’objet. Dans l’air, ce sont les frottements qui font la différence.', ref: C2 + '#s6' },
    { id: 'phys-c2-22', topic: 'phys-newton', lvl: 2, type: 'single', q: 'D’après la 2e loi de Newton, la somme des forces a toujours la même direction et le même sens que…',
      o: ['l’accélération', 'la vitesse', 'le déplacement', 'le vecteur position'], a: 0,
      x: 'Σ{F} = `m` {a} avec `m` > 0 : les deux vecteurs sont colinéaires et de même sens. Pas la vitesse : une balle qui monte a une vitesse vers le haut, alors que la somme des forces (son poids) est vers le bas.', ref: C2 + '#s6' },
    { id: 'phys-c2-23', topic: 'phys-newton', lvl: 2, type: 'single', q: 'La quantité de mouvement d’un point matériel vaut…',
      o: ['{p} = `m` {v}, en kg·m·s⁻¹', '{p} = `m` {a}, en N', '½ `m v`², en J', '{p} = `m` {g}, en N'], a: 0,
      x: 'Définition 6 du cours : {p} = `m` {v}, en kg·m·s⁻¹. La 2e loi s’écrit Σ{F} = d{p}/d`t`, ce qui donne `m` {a} quand la masse est constante. ½ `m v`² est l’énergie cinétique.', ref: C2 + '#s6' },

    /* ---------- 7. troisième loi ---------- */
    { id: 'phys-c2-24', topic: 'phys-newton', lvl: 1, type: 'single', q: 'La Terre attire une pomme avec une force de 2 N. La pomme attire la Terre…',
      o: ['avec une force de 2 N, dirigée vers la pomme', 'avec une force négligeable, car elle est beaucoup plus légère', 'avec une force de 2 N, dirigée vers le centre de la Terre', 'pas du tout'], a: 0,
      x: '3e loi de Newton : {F_2→1} = −{F_1→2}. Même norme, sens opposé : la force de la pomme sur la Terre vaut 2 N et pointe vers la pomme. Ce qui est négligeable, c’est l’accélération de la Terre (2 N pour 6 × 10²⁴ kg), pas la force.', ref: C2 + '#s7' },
    { id: 'phys-c2-25', topic: 'phys-newton', lvl: 2, type: 'tf', a: false, q: 'Pour un livre posé sur une table, le poids {P} du livre et la réaction {R} de la table sur le livre forment une paire action-réaction (3e loi de Newton).',
      x: 'Faux. Les deux forces s’exercent sur le même objet, le livre ; une paire action-réaction concerne deux objets différents. {P} et {R} se compensent à cause de la 2e loi (équilibre). La réciproque de {R} est la force du livre sur la table ; celle du poids est l’attraction de la Terre par le livre.', ref: C2 + '#s7' },
    { id: 'phys-c2-26', topic: 'phys-newton', lvl: 2, type: 'single', q: 'Les deux forces d’une paire action-réaction…',
      o: ['s’exercent sur deux corps différents', 's’exercent sur le même corps et se compensent', 'n’existent qu’entre corps en contact', 'n’existent que si les corps bougent'], a: 0,
      x: '{F_2→1} = −{F_1→2} : l’une s’exerce sur le corps 1, l’autre sur le corps 2 ; c’est pour ça qu’elles ne se compensent pas. La gravitation agit à distance et obéit aussi à la 3e loi, au repos comme en mouvement.', ref: C2 + '#s7' },

    /* ---------- 8. exploiter la 2e loi : projeter ---------- */
    { id: 'phys-c2-27', topic: 'phys-vecteurs', lvl: 2, type: 'single', fig: PENTE, q: 'Un robot de masse `m` est posé sur une pente d’angle α. Axes : {u_x} le long de la pente vers le bas, {u_y} perpendiculaire à la pente vers le haut (TD 2, Ex 2). Quelles sont les composantes du poids {P} ?',
      o: ['(`m g` sin α ; −`m g` cos α)', '(`m g` cos α ; −`m g` sin α)', '(−`m g` sin α ; `m g` cos α)', '(`m g` ; −`m g`)'], a: 0,
      x: 'L’angle entre {P} (vertical) et la perpendiculaire à la pente vaut α, le même angle que la pente. La composante perpendiculaire vaut donc `m g` cos α, comptée négativement (vers la pente) ; la composante le long de la pente vaut `m g` sin α, vers le bas de la pente. Vérifie avec α = 0, un sol horizontal : on doit trouver (0 ; −`m g`). Échanger sin et cos est l’erreur la plus fréquente.', ref: C2 + '#s8' },
    { id: 'phys-c2-28', topic: 'phys-newton', lvl: 2, type: 'num', unit: 'N', a: 50, fig: PENTE, q: 'Le robot, de masse 10 kg, reste immobile sur la pente d’angle α = 30° (`g` = 10 m·s⁻², sin 30° = ½). Quelle est la norme de la force de frottement qui le retient ?',
      x: 'À l’équilibre, {P} + {R} + {f} = {0}. Sur {u_x}, le long de la pente : `m g` sin α + `f_x` = 0, donc `f_x` = −`m g` sin α. Le frottement est dirigé vers le haut de la pente, de norme 10 × 10 × ½ = 50 N. Sur {u_y} : `R` = `m g` cos α ≈ 87 N.', ref: C2 + '#s8' },
    { id: 'phys-c2-29', topic: 'phys-newton', lvl: 2, type: 'single', q: 'Un point est en chute libre ; l’axe {u_y} est vertical vers le haut. Que donne la 2e loi de Newton projetée sur {u_y} ?',
      o: ['−`m g` = `m a_y`, donc `a_y` = −`g`', '`m g` = `m a_y`, donc `a_y` = `g`', '−`m g` = `m v_y`', '−`m g` = 0'], a: 0,
      x: 'Bilan : le poids seul, {P} = −`m g` {u_y}. 2e loi : {P} = `m` {a}, puis projection sur {u_y} : −`m g` = `m a_y`, soit `a_y` = −`g`. C’est la méthode du cours (chute libre de 5 m). La loi donne l’accélération, pas la vitesse : on intègre ensuite.', ref: C2 + '#s8' },
    { id: 'phys-c2-30', topic: 'phys-newton', lvl: 2, type: 'single', q: 'Un objet est immobile sous l’action de son poids {P}, de la réaction {R} et d’un frottement {f}. Que donne la 2e loi de Newton ?',
      o: ['{P} + {R} + {f} = {0}', '`P` + `R` + `f` = 0, en additionnant les normes', '{P} = {R}', 'rien : il n’y a pas de mouvement'], a: 0,
      x: 'Immobile : {a} = {0}, donc la somme vectorielle des forces est nulle ; on la projette ensuite sur chaque axe. Les normes ne s’additionnent pas : elles sont positives, leur somme ne peut pas être nulle. Et {P} = {R} est faux : même sans frottement, on aurait {P} = −{R}.', ref: C2 + '#s8' },
    { id: 'phys-c2-31', topic: 'phys-newton', lvl: 3, type: 'num', unit: 'm·s⁻¹', a: 100, q: 'Le robot du TD 2 (Ex 3) est poussé par une force constante de 50 N et freiné par {f} = −α {v}, avec α = 0,5 kg·s⁻¹. Quelle vitesse maximale atteint-il ?',
      x: 'À la vitesse maximale, la vitesse ne varie plus : {a} = {0}, donc la somme des forces est nulle. Sur l’axe du mouvement : `F` − α`v`<sub>max</sub> = 0, d’où `v`<sub>max</sub> = `F`/α = 50/0,5 = 100 m·s⁻¹.', ref: C2 + '#s8' },

    /* ================= chapitre 3 : travail et énergie ================= */
    /* ---------- 1. travail d’une force constante ---------- */
    { id: 'phys-c3-01', topic: 'phys-travail', lvl: 1, type: 'single', q: 'Quel est le travail d’une force constante {F} quand son point d’application va de A à B ? (θ est l’angle entre {F} et {AB}.)',
      o: ['`W` = {F} · {AB} = `F` × AB × cos θ', '`W` = `F` × AB', '`W` = `F` × AB × sin θ', '`W` = `F` / AB'], a: 0,
      x: 'Le travail d’une force constante est le produit scalaire de la force par le déplacement. Seule la composante de {F} le long du déplacement travaille, d’où le cos θ. `F` × AB n’est juste que si la force est parallèle au déplacement et de même sens.', ref: C3 + '#s1' },
    { id: 'phys-c3-02', topic: 'phys-travail', lvl: 1, type: 'num', unit: 'J', a: 30, q: 'Une force horizontale constante de 10 N déplace un chariot de 3 m, dans son sens. Quel est son travail ?',
      x: 'Force et déplacement ont même direction et même sens : cos 0 = 1, `W` = 10 × 3 = 30 J. Le joule vaut 1 N·m.', ref: C3 + '#s1' },
    { id: 'phys-c3-03', topic: 'phys-travail', lvl: 2, type: 'num', unit: 'J', a: 3, q: 'Une force constante de 3 N fait un angle de 60° avec le déplacement AB = 2 m (cos 60° = ½). Quel est son travail ?',
      x: '`W` = `F` × AB × cos 60° = 3 × 2 × ½ = 3 J. L’angle à prendre est celui entre la force et le déplacement : si l’énoncé donne l’angle avec la verticale, il faut d’abord le convertir.', ref: C3 + '#s1' },

    /* ---------- 2. moteur, résistant, travail du poids ---------- */
    { id: 'phys-c3-04', topic: 'phys-travail', lvl: 1, type: 'single', q: 'Une force perpendiculaire au déplacement, comme la réaction d’un sol horizontal sur un objet qui glisse…',
      o: ['ne travaille pas : `W` = 0', 'a un travail moteur', 'a un travail résistant', 'a un travail égal à `F` × AB'], a: 0,
      x: 'cos 90° = 0 : une force perpendiculaire au déplacement ne travaille pas. Elle peut courber la trajectoire, mais elle ne change pas la norme de la vitesse.', ref: C3 + '#s2' },
    { id: 'phys-c3-05', topic: 'phys-travail', lvl: 2, type: 'single', q: 'Un objet de masse `m` passe de l’altitude `z_A` à l’altitude `z_B` (axe vertical vers le haut). Quel est le travail de son poids ?',
      o: ['`m g` (`z_A` − `z_B`)', '`m g` (`z_B` − `z_A`)', '`m g z_B`', '−`m g` |`z_A` − `z_B`|'], a: 0,
      x: 'Le poids est constant : `W` = {P} · {AB} = −`m g` (`z_B` − `z_A`) = `m g` (`z_A` − `z_B`). Il ne dépend que des altitudes, pas du chemin. Il est positif (moteur) quand l’objet descend, négatif (résistant) quand il monte. Inverser les deux altitudes est l’erreur classique.', ref: C3 + '#s2' },
    { id: 'phys-c3-06', topic: 'phys-travail', lvl: 2, type: 'single', q: 'Le poids d’un ballon de 0,5 kg effectue un travail de +5 J (`g` = 10 m·s⁻²). Le ballon…',
      o: ['est descendu de 1 m', 'est monté de 1 m', 'est descendu de 10 m', 'est monté de 10 m'], a: 0,
      x: '`W` = `m g` (`z_A` − `z_B`) = 5 J, donc `z_A` − `z_B` = 5 / (0,5 × 10) = 1 m. Travail positif : le poids est moteur, le ballon descend. C’est le raisonnement du TD 4, Ex 2.', ref: C3 + '#s2' },
    { id: 'phys-c3-07', topic: 'phys-travail', lvl: 2, type: 'single', q: 'Une force de frottement de norme `f` constante, toujours opposée au mouvement, agit sur une distance `L`. Quel est son travail ?',
      o: ['−`f L`', '`f L`', '0', '−`f` / `L`'], a: 0,
      x: 'Elle est opposée au déplacement à chaque instant : cos 180° = −1, `W` = −`f L`. Un frottement a toujours un travail résistant (négatif) : il fait perdre de l’énergie au système.', ref: C3 + '#s2' },
    { id: 'phys-c3-08', topic: 'phys-travail', lvl: 1, type: 'tf', a: false, q: 'Le travail d’une force est un vecteur.',
      x: 'Faux. C’est un produit scalaire : un nombre, en joules, positif, négatif ou nul. Le cours (version française, p. 9) met une flèche sur le W dans « Σ W » : c’est une coquille.', ref: C3 + '#s2' },

    /* ---------- 3. puissance ---------- */
    { id: 'phys-c3-09', topic: 'phys-travail', lvl: 1, type: 'single', q: 'La puissance d’une force {F} qui s’exerce sur un point de vitesse {v} vaut…',
      o: ['`P` = {F} · {v}', '`P` = `F` × `d`', '`P` = ½ `F v`²', '`P` = {F} · {v} × `t`'], a: 0,
      x: 'Cours : `P` = d`W`/d`t` = {F} · {v}, en watts (1 W = 1 J·s⁻¹). `F` × `d` est un travail (pour une force parallèle au déplacement), pas une puissance.', ref: C3 + '#s3' },
    { id: 'phys-c3-10', topic: 'phys-travail', lvl: 1, type: 'num', unit: 'W', a: 5, q: 'Un moteur fournit un travail de 600 J en 2 min. Quelle est sa puissance moyenne ?',
      x: 'Les secondes d’abord : 2 min = 120 s. `P` = `W`/Δ`t` = 600/120 = 5 W. 600/2 = 300 serait en joules par minute, pas en watts.', ref: C3 + '#s3' },
    { id: 'phys-c3-11', topic: 'phys-travail', lvl: 2, type: 'num', unit: 'W', a: 1000, q: 'Une force de 200 N, parallèle à la vitesse et de même sens, s’exerce sur un objet qui avance à 5 m·s⁻¹. Quelle est sa puissance ?',
      x: '`P` = {F} · {v} = 200 × 5 × cos 0 = 1 000 W, soit 1 kW.', ref: C3 + '#s3' },

    /* ---------- 4. énergie cinétique et théorème de l’énergie cinétique ---------- */
    { id: 'phys-c3-12', topic: 'phys-energie', lvl: 1, type: 'num', unit: 'J', a: 50000, q: 'Quelle est l’énergie cinétique d’une voiture de 1 000 kg qui roule à 36 km/h ?',
      x: 'D’abord en m·s⁻¹ : 36/3,6 = 10 m·s⁻¹. `E_c` = ½ `m v`² = ½ × 1 000 × 100 = 50 000 J. Avec 36 au lieu de 10, on trouverait 648 000 J : toujours convertir avant de calculer.', ref: C3 + '#s4' },
    { id: 'phys-c3-13', topic: 'phys-energie', lvl: 1, type: 'single', q: 'Que dit le théorème de l’énergie cinétique entre deux points A et B ?',
      o: ['la variation de `E_c` est égale à la somme des travaux de toutes les forces', 'la variation de `E_c` est égale au travail du poids seulement', '`E_c` reste constante', 'la variation de `E_c` est nulle s’il y a des frottements'], a: 0,
      x: 'Σ`W`<sub>i</sub> = Δ`E_c` = ½ `m v_B`² − ½ `m v_A`². Toutes les forces comptent, motrices (travail positif) comme résistantes (travail négatif). Si la somme des travaux est positive, le système accélère.', ref: C3 + '#s4' },
    { id: 'phys-c3-14', topic: 'phys-energie', lvl: 2, type: 'single', q: 'Si la vitesse d’un objet double, son énergie cinétique est…',
      o: ['multipliée par 4', 'multipliée par 2', 'inchangée', 'multipliée par √2'], a: 0,
      x: '`E_c` = ½ `m v`² varie comme le carré de la vitesse : (2`v`)² = 4`v`². À 100 km/h, une voiture a 4 fois plus d’énergie cinétique qu’à 50 km/h.', ref: C3 + '#s4' },
    { id: 'phys-c3-15', topic: 'phys-energie', lvl: 2, type: 'num', unit: 'm·s⁻¹', a: 10, q: 'Un objet tombe en chute libre d’une hauteur de 5 m, sans vitesse initiale (`g` = 10 m·s⁻²). Avec quelle vitesse arrive-t-il au sol ?',
      x: 'Théorème de l’énergie cinétique, seul le poids travaille : ½ `m v`² − 0 = `m g h`, donc `v` = √(2`g h`) = √100 = 10 m·s⁻¹. 2`g h` = 100 est `v`², pas `v` : n’oublie pas la racine.', ref: C3 + '#s4' },
    { id: 'phys-c3-16', topic: 'phys-energie', lvl: 3, type: 'num', unit: 'm·s⁻¹', a: 4, q: 'Un chariot de 4 kg part du repos sur un sol horizontal. Une force motrice de 10 N et un frottement de 2 N, opposé au mouvement, agissent sur 4 m. Quelle est alors sa vitesse ?',
      x: 'Le poids et la réaction, perpendiculaires au déplacement, ne travaillent pas. Théorème de l’énergie cinétique : ½ × 4 × `v`² − 0 = 10 × 4 − 2 × 4 = 32 J, donc `v`² = 16 et `v` = 4 m·s⁻¹. Oublier le frottement donne √20 ≈ 4,5 m·s⁻¹.', ref: C3 + '#s4' },

    /* ---------- 5. forces conservatives, énergie potentielle ---------- */
    { id: 'phys-c3-17', topic: 'phys-energie', lvl: 1, type: 'single', q: 'Une force est dite conservative si…',
      o: ['son travail entre deux points ne dépend pas du chemin suivi', 'elle conserve la vitesse du système', 'elle est constante', 'son travail est toujours nul'], a: 0,
      x: 'Définition du cours : le travail d’une force conservative entre A et B ne dépend que de A et de B, pas du chemin. Elle dérive alors d’une énergie potentielle. Le poids est conservatif : son travail ne dépend que de la différence d’altitude.', ref: C3 + '#s5' },
    { id: 'phys-c3-18', topic: 'phys-energie', lvl: 2, type: 'multi', q: 'Parmi ces forces, lesquelles sont conservatives ?',
      o: ['le poids', 'la force de frottement fluide', 'un frottement de norme constante', 'la force de gravitation'], a: [0, 3],
      x: 'Le poids, et plus généralement la gravitation, a un travail qui ne dépend que des positions de départ et d’arrivée. Les frottements ne sont pas conservatifs : leur travail est toujours négatif, et d’autant plus grand en valeur absolue que le chemin est long ; ils dissipent l’énergie.', ref: C3 + '#s5' },
    { id: 'phys-c3-19', topic: 'phys-energie', lvl: 1, type: 'num', unit: 'J', a: 60, q: 'Quelle est l’énergie potentielle de pesanteur d’un objet de 2 kg posé à 3 m au-dessus du sol ? (`E_p` = 0 au sol, `g` = 10 m·s⁻²)',
      x: '`E_p` = `m g h` = 2 × 10 × 3 = 60 J, avec `h` la hauteur au-dessus du sol, où l’on a choisi `E_p` = 0.', ref: C3 + '#s5' },
    { id: 'phys-c3-20', topic: 'phys-energie', lvl: 2, type: 'single', q: 'Pour une force conservative, quel lien y a-t-il entre son travail de A à B et l’énergie potentielle ?',
      o: ['`W` = −Δ`E_p` = `E_p`(A) − `E_p`(B)', '`W` = Δ`E_p` = `E_p`(B) − `E_p`(A)', '`W` = `E_p`(B)', '`W` = 0'], a: 0,
      x: 'Cours : `W` = −Δ`E_p`. Vérifie avec le poids : `W` = `m g` (`z_A` − `z_B`) = `E_p`(A) − `E_p`(B). Quand l’objet descend, son énergie potentielle diminue et le poids fournit un travail positif.', ref: C3 + '#s5' },

    /* ---------- 6. énergie mécanique et conservation ---------- */
    { id: 'phys-c3-21', topic: 'phys-energie', lvl: 1, type: 'single', q: 'L’énergie mécanique d’un système vaut…',
      o: ['`E_M` = `E_c` + `E_p`', '`E_M` = `E_c` − `E_p`', '`E_M` = `E_c` × `E_p`', '`E_M` = ½ `m v`² seulement'], a: 0,
      x: '`E_M` = `E_c` + `E_p`. Quand seules des forces conservatives travaillent, elle reste constante : ce que l’une perd, l’autre le gagne.', ref: C3 + '#s6' },
    { id: 'phys-c3-22', topic: 'phys-energie', lvl: 2, type: 'single', q: 'Une bille glisse sans frottement le long d’une rampe, du haut A vers le bas B. Que se passe-t-il ?',
      o: ['`E_c` augmente, `E_p` diminue, `E_M` reste constante', '`E_c` et `E_p` augmentent', '`E_M` diminue', '`E_c` reste constante'], a: 0,
      x: 'Sans frottement, la réaction est perpendiculaire à la trajectoire et ne travaille pas ; seul le poids travaille, et il est conservatif : `E_M` se conserve. La bille descend, `E_p` diminue, donc `E_c` augmente d’autant (TD 4, Ex 4).', ref: C3 + '#s6' },
    { id: 'phys-c3-23', topic: 'phys-energie', lvl: 2, type: 'num', unit: 'm·s⁻¹', a: 5, q: 'Une bille passe en A à 3 m·s⁻¹, puis descend sans frottement jusqu’en B, 0,8 m plus bas (`g` = 10 m·s⁻²). Quelle est sa vitesse en B ?',
      x: 'Conservation de l’énergie mécanique : ½ `m v_A`² + `m g h` = ½ `m v_B`², donc `v_B`² = `v_A`² + 2`g h` = 9 + 16 = 25 et `v_B` = 5 m·s⁻¹. Les vitesses ne s’additionnent pas : 3 + 4 = 7 est faux, ce sont les énergies qui s’ajoutent.', ref: C3 + '#s6' },
    { id: 'phys-c3-24', topic: 'phys-energie', lvl: 2, type: 'tf', a: false, q: 'Sans frottement, la vitesse d’un objet en bas d’une pente dépend de la forme de la pente.',
      x: 'Faux. Avec la conservation de l’énergie mécanique, ½ `m v`² ne dépend que de la vitesse de départ et de la différence d’altitude. La forme de la pente change la durée du trajet et la direction de la vitesse, pas sa norme à l’arrivée.', ref: C3 + '#s6' },

    /* ---------- 7. frottements : l’énergie mécanique diminue ---------- */
    { id: 'phys-c3-25', topic: 'phys-energie', lvl: 2, type: 'single', q: 'Avec des frottements, entre A et B, comment varie l’énergie mécanique ?',
      o: ['Δ`E_M` = `W`({f}), le travail des frottements, négatif', 'Δ`E_M` = 0 : elle se conserve toujours', 'Δ`E_M` = `W`({P}), le travail du poids', 'Δ`E_M` = −`W`({f}) : elle augmente'], a: 0,
      x: 'Théorème de l’énergie cinétique : Δ`E_c` = `W`({P}) + `W`({f}) = −Δ`E_p` + `W`({f}) (la réaction ne travaille pas). Donc Δ`E_M` = `W`({f}) &lt; 0 : les frottements dissipent l’énergie mécanique, en chaleur. Le cours n’écrit pas cette formule, on la retrouve ainsi.', ref: C3 + '#s7' },
    { id: 'phys-c3-26', topic: 'phys-energie', lvl: 3, type: 'num', unit: 'N', a: 0.4, q: 'Une bille de 0,1 kg passe en B à 5 m·s⁻¹ et arrive en C à 3 m·s⁻¹. BC = 2 m est horizontal, avec un frottement de norme `f` constante (TD 4, Ex 4). Que vaut `f` ?',
      x: 'Sur BC horizontal, seul le frottement travaille : ½ `m v_C`² − ½ `m v_B`² = −`f` × BC. Donc `f` = `m` (`v_B`² − `v_C`²) / (2 BC) = 0,1 × (25 − 9) / 4 = 0,4 N.', ref: C3 + '#s7' },
    { id: 'phys-c3-27', topic: 'phys-energie', lvl: 1, type: 'single', q: 'Un palet glisse sur un sol horizontal avec frottement, puis s’arrête. Que devient son énergie cinétique ?',
      o: ['elle est dissipée par les frottements, en chaleur', 'elle se transforme en énergie potentielle de pesanteur', 'elle reste dans le palet', 'elle est absorbée par le poids'], a: 0,
      x: 'Le sol est horizontal : l’altitude, donc `E_p`, ne change pas. L’énergie mécanique diminue de toute l’énergie cinétique : le travail, négatif, des frottements l’a dissipée en chaleur.', ref: C3 + '#s7' },

    /* ---------- 8. choisir : 2e loi ou énergie ---------- */
    { id: 'phys-c3-28', topic: 'phys-energie', lvl: 2, type: 'single', q: 'On cherche la vitesse d’un skieur en bas d’une piste en courbe, sans frottement, en connaissant la dénivelée. Quelle méthode est la plus simple ?',
      o: ['la conservation de l’énergie mécanique', 'la 2e loi de Newton, projetée sur des axes fixes', 'intégrer deux fois l’accélération', 'la 3e loi de Newton'], a: 0,
      x: 'Sur une piste courbe, la réaction change de direction en chaque point : projeter la 2e loi devient compliqué. L’énergie ne demande que les altitudes : ½ `m v`² = ½ `m v_0`² + `m g h`. Elle donne des vitesses en des points ; pour des instants ou une trajectoire, il faut la 2e loi.', ref: C3 + '#s8' },
    { id: 'phys-c3-29', topic: 'phys-energie', lvl: 2, type: 'single', q: 'On cherche la date à laquelle un objet en chute libre touche le sol. Quelle méthode faut-il ?',
      o: ['la 2e loi de Newton, puis les équations horaires', 'le théorème de l’énergie cinétique seul', 'la conservation de l’énergie mécanique seule', 'la 3e loi de Newton'], a: 0,
      x: 'Les théorèmes d’énergie relient des vitesses à des positions, jamais au temps. Pour une date, il faut `y`(`t`) : la 2e loi donne {a}, on intègre deux fois avec les conditions initiales, puis on résout `y`(`T`) = 0.', ref: C3 + '#s8' },
    { id: 'phys-c3-30', topic: 'phys-energie', lvl: 3, type: 'multi', q: 'Quelles questions une méthode énergétique (théorème de l’énergie cinétique, énergie mécanique) résout-elle directement ?',
      o: ['la vitesse en un point, connaissant les altitudes', 'la hauteur maximale atteinte par un objet lancé verticalement', 'la durée d’un trajet', 'la norme d’un frottement constant, connaissant la distance et les vitesses'], a: [0, 1, 3],
      x: 'Les théorèmes d’énergie relient vitesses, altitudes, distances et forces : vitesse en un point, hauteur où la vitesse s’annule, frottement à partir d’une perte de vitesse (TD 4, Ex 4). Le temps n’y apparaît pas : pour une durée, il faut les équations horaires.', ref: C3 + '#s8' },

    /* ================= chapitre 4 : coordonnées polaires ================= */
    /* ---------- 1. pourquoi les polaires ---------- */
    { id: 'phys-c4-01', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'Les coordonnées polaires sont surtout adaptées à l’étude…',
      o: ['des mouvements circulaires', 'des mouvements rectilignes', 'de la chute libre', 'des mouvements uniformes'], a: 0,
      x: 'Pour un cercle de centre O, `r` reste constant et seul θ varie : les calculs se simplifient. Le cours le note : les coordonnées cartésiennes conviennent à la plupart des mouvements plans, sauf aux mouvements circulaires.', ref: C4 + '#s1' },
    { id: 'phys-c4-02', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'En coordonnées polaires, un point M du plan est repéré par…',
      o: ['`r` = OM et θ, l’angle orienté entre {u_x} et {OM}', '`x` et `y`', '`r` et la vitesse angulaire `θ̇`', 'θ seulement'], a: 0,
      x: '`r` est la distance de O à M, θ l’angle orienté de {u_x} vers {OM}. Ce sont deux nombres, comme `x` et `y` ; on passe des uns aux autres par `x` = `r` cos θ et `y` = `r` sin θ.', ref: C4 + '#s1' },
    { id: 'phys-c4-03', topic: 'phys-polaires', lvl: 1, type: 'tf', a: true, q: 'En coordonnées polaires, `r` est toujours positif.',
      x: 'Vrai : `r` = OM est une distance. Pour passer « de l’autre côté » de O, c’est θ qui change (de π), pas le signe de `r`.', ref: C4 + '#s1' },

    /* ---------- 2. base polaire ---------- */
    { id: 'phys-c4-04', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'Comment s’écrit {u_r} dans la base cartésienne ?',
      o: ['{u_r} = cos θ {u_x} + sin θ {u_y}', '{u_r} = sin θ {u_x} + cos θ {u_y}', '{u_r} = cos θ {u_x} − sin θ {u_y}', '{u_r} = `r` cos θ {u_x} + `r` sin θ {u_y}'], a: 0,
      x: '{u_r} est le vecteur unitaire dirigé selon {OM} : ses composantes sont celles de {OM}, (`r` cos θ ; `r` sin θ), divisées par `r`. Un vecteur unitaire n’a pas de facteur `r` : sa norme vaut 1.', ref: C4 + '#s2' },
    { id: 'phys-c4-05', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'Comment s’écrit {u_θ} dans la base cartésienne ?',
      o: ['{u_θ} = −sin θ {u_x} + cos θ {u_y}', '{u_θ} = sin θ {u_x} − cos θ {u_y}', '{u_θ} = cos θ {u_x} + sin θ {u_y}', '{u_θ} = sin θ {u_x} + cos θ {u_y}'], a: 0,
      x: '{u_θ} s’obtient en tournant {u_r} de +π/2, dans le sens direct. Cette rotation envoie (`a` ; `b`) sur (−`b` ; `a`) : (cos θ ; sin θ) devient (−sin θ ; cos θ). Le « − » est sur le sinus de la composante selon {u_x}. Vérifie avec θ = 0 : {u_θ} = {u_y}.', ref: C4 + '#s2' },
    { id: 'phys-c4-06', topic: 'phys-polaires', lvl: 2, type: 'tf', a: false, q: 'Les vecteurs {u_r} et {u_θ} sont fixes, comme {u_x} et {u_y}.',
      x: 'Faux. C’est une base mobile : elle tourne avec le point M, car elle dépend de θ. C’est pour ça que ses vecteurs ont une dérivée non nulle, et que la vitesse et l’accélération en polaires ont des termes en plus.', ref: C4 + '#s2' },
    { id: 'phys-c4-07', topic: 'phys-polaires', lvl: 2, type: 'single', q: 'Le point M est sur l’axe des `y` positifs (θ = π/2). Que vaut {u_θ} en M ?',
      o: ['−{u_x}', '{u_x}', '{u_y}', '−{u_y}'], a: 0,
      x: '{u_θ} = −sin(π/2) {u_x} + cos(π/2) {u_y} = −{u_x}. Sur un dessin : {u_r} = {u_y} pointe vers le haut, et le tourner d’un quart de tour dans le sens direct le fait pointer vers la gauche.', ref: C4 + '#s2' },

    /* ---------- 3. dérivées des vecteurs de la base ---------- */
    { id: 'phys-c4-08', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'Que vaut la dérivée par rapport au temps de {u_r} ?',
      o: ['d{u_r}/d`t` = `θ̇` {u_θ}', 'd{u_r}/d`t` = {0}', 'd{u_r}/d`t` = {u_θ}', 'd{u_r}/d`t` = −`θ̇` {u_θ}'], a: 0,
      x: 'On dérive par rapport à θ, puis on multiplie par dθ/d`t` = `θ̇` (dérivée d’une fonction composée) : d{u_r}/dθ = −sin θ {u_x} + cos θ {u_y} = {u_θ}, donc d{u_r}/d`t` = `θ̇` {u_θ}. Ce n’est pas {0} : {u_r} tourne avec M. Oublier `θ̇`, c’est confondre la dérivée par rapport à θ et la dérivée par rapport à `t`.', ref: C4 + '#s3' },
    { id: 'phys-c4-09', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'Que vaut la dérivée par rapport au temps de {u_θ} ?',
      o: ['d{u_θ}/d`t` = −`θ̇` {u_r}', 'd{u_θ}/d`t` = `θ̇` {u_r}', 'd{u_θ}/d`t` = −{u_r}', 'd{u_θ}/d`t` = {0}'], a: 0,
      x: 'd{u_θ}/dθ = −cos θ {u_x} − sin θ {u_y} = −{u_r}, puis on multiplie par `θ̇` : d{u_θ}/d`t` = −`θ̇` {u_r}. Le signe moins vient de la dérivée de cos θ.', ref: C4 + '#s3' },
    { id: 'phys-c4-10', topic: 'phys-polaires', lvl: 2, type: 'single', q: 'Que vaut la dérivée de {u_r} par rapport à l’angle θ ?',
      o: ['{u_θ}', '−{u_θ}', '{u_r}', '{0}'], a: 0,
      x: 'On dérive chaque composante de {u_r} = cos θ {u_x} + sin θ {u_y} : −sin θ {u_x} + cos θ {u_y}, c’est exactement {u_θ}. C’était l’exercice 2 du partiel de novembre 2021. {u_x} et {u_y} sont fixes : on ne dérive que les fonctions de θ.', ref: C4 + '#s3' },
    { id: 'phys-c4-11', topic: 'phys-polaires', lvl: 2, type: 'single', q: 'θ dépend du temps. Que vaut la dérivée par rapport au temps de sin(θ(`t`)) ?',
      o: ['`θ̇` cos θ', 'cos θ', '−`θ̇` cos θ', '`θ̇` sin θ'], a: 0,
      x: 'Dérivée d’une fonction composée : (sin θ)′ = `θ̇` cos θ. Le facteur `θ̇` est indispensable dès que θ dépend du temps : c’est lui qui fait apparaître les termes en `θ̇` dans la vitesse en polaires.', ref: C4 + '#s3' },

    /* ---------- 4. vecteur position ---------- */
    { id: 'phys-c4-12', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'En coordonnées polaires, le vecteur position s’écrit…',
      o: ['{OM} = `r` {u_r}', '{OM} = `r` {u_r} + θ {u_θ}', '{OM} = θ {u_r} + `r` {u_θ}', '{OM} = `r` {u_θ}'], a: 0,
      x: '{u_r} est dirigé selon {OM} et OM = `r` : {OM} = `r` {u_r}, sans composante sur {u_θ}. θ est un angle, sans dimension : il ne peut pas être la composante d’un vecteur en mètres. L’angle est « caché » dans la direction de {u_r}.', ref: C4 + '#s4' },
    { id: 'phys-c4-13', topic: 'phys-polaires', lvl: 1, type: 'single', q: '`x`(`t`) = 3 cos(ω`t`) et `y`(`t`) = 3 sin(ω`t`), en mètres. Comment s’écrit le vecteur position en polaires ?',
      o: ['{OM} = 3 {u_r}', '{OM} = 3 {u_r} + ω`t` {u_θ}', '{OM} = 3 cos(ω`t`) {u_r} + 3 sin(ω`t`) {u_θ}', '{OM} = ω`t` {u_r}'], a: 0,
      x: '`r` = √(`x`² + `y`²) = 3 m et θ = ω`t`. Donc {OM} = 3 {u_r} : l’information sur θ est dans {u_r}, qui tourne. On ne recopie pas les composantes cartésiennes sur la base polaire (TD 5, Ex 2).', ref: C4 + '#s4' },
    { id: 'phys-c4-14', topic: 'phys-polaires', lvl: 2, type: 'single', q: 'Le point M a pour coordonnées cartésiennes (−2 ; 0), en mètres. Quelles sont ses coordonnées polaires ?',
      o: ['`r` = 2 m, θ = π', '`r` = −2 m, θ = 0', '`r` = 2 m, θ = 0', '`r` = −2 m, θ = π'], a: 0,
      x: '`r` = OM = 2 m, toujours positif. M est sur l’axe des `x` négatifs : l’angle entre {u_x} et {OM} vaut π. Vérifie : `x` = `r` cos θ = 2 × (−1) = −2 et `y` = 2 sin π = 0.', ref: C4 + '#s4' },

    /* ---------- 5. vecteur vitesse ---------- */
    { id: 'phys-c4-15', topic: 'phys-polaires-va', lvl: 1, type: 'single', q: 'En coordonnées polaires, le vecteur vitesse s’écrit…',
      o: ['{v} = `ṙ` {u_r} + `r θ̇` {u_θ}', '{v} = `ṙ` {u_r}', '{v} = `ṙ` {u_r} + `θ̇` {u_θ}', '{v} = `r` {u_r} + `r θ̇` {u_θ}'], a: 0,
      x: '{v} = d(`r` {u_r})/d`t` = `ṙ` {u_r} + `r` d{u_r}/d`t` = `ṙ` {u_r} + `r θ̇` {u_θ}. Oublier que {u_r} tourne donne `ṙ` {u_r} seul. Sans le `r`, le terme `θ̇` {u_θ} serait en rad·s⁻¹, pas en m·s⁻¹. Cette formule est demandée dans presque tous les partiels retrouvés.', ref: C4 + '#s5' },
    { id: 'phys-c4-16', topic: 'phys-polaires-va', lvl: 2, type: 'single', q: 'Dans {v} = `ṙ` {u_r} + `r θ̇` {u_θ}, d’où vient le terme `r θ̇` {u_θ} ?',
      o: ['de la dérivée de {u_r} : d{u_r}/d`t` = `θ̇` {u_θ}', 'de la dérivée de `r`', 'de la dérivée d’un terme θ {u_θ} du vecteur position', 'on l’ajoute par définition de la vitesse angulaire'], a: 0,
      x: 'On dérive le produit `r` {u_r} : (d`r`/d`t`) {u_r} + `r` (d{u_r}/d`t`). Le second terme vient de la rotation de la base : `r` × `θ̇` {u_θ}. Au partiel de novembre 2021, cette démonstration « en expliquant chaque étape » valait 2 points.', ref: C4 + '#s5' },
    { id: 'phys-c4-17', topic: 'phys-polaires-va', lvl: 1, type: 'single', q: 'Quelle est la norme de {v} = `ṙ` {u_r} + `r θ̇` {u_θ} ?',
      o: ['√(`ṙ`² + `r`² `θ̇`²)', '`ṙ` + `r θ̇`', '√(`ṙ`² + `θ̇`²)', '`r θ̇`'], a: 0,
      x: '{u_r} et {u_θ} sont orthogonaux et unitaires : Pythagore, comme en cartésien. ‖{v}‖ = √(`ṙ`² + (`r θ̇`)²) : le `r` est aussi au carré.', ref: C4 + '#s5' },
    { id: 'phys-c4-18', topic: 'phys-unites', lvl: 2, type: 'single', q: 'θ est en radians et `θ̇` en rad·s⁻¹. Quelle est l’unité de `r θ̇` ?',
      o: ['m·s⁻¹', 'rad', 'm', 'm·s⁻²'], a: 0,
      x: 'Le radian est sans dimension : `r θ̇` est en m × s⁻¹ = m·s⁻¹, l’unité d’une vitesse. C’est un bon test d’homogénéité : chaque composante de {v} doit être en m·s⁻¹, et `r θ̇`² en m·s⁻².', ref: C4 + '#s5' },
    { id: 'phys-c4-19', topic: 'phys-polaires-va', lvl: 2, type: 'single', q: '`r`(`t`) = 2`t` (en m) et θ(`t`) = 3`t` (en rad). Que vaut le vecteur vitesse ?',
      o: ['{v} = 2 {u_r} + 6`t` {u_θ}', '{v} = 2 {u_r} + 3 {u_θ}', '{v} = 2 {u_r}', '{v} = 2 {u_r} + 2`t` {u_θ}'], a: 0,
      x: '`ṙ` = 2 et `θ̇` = 3, donc `r θ̇` = 2`t` × 3 = 6`t` : {v} = 2 {u_r} + 6`t` {u_θ}. Écrire `θ̇` seul (3) oublie le facteur `r` ; écrire 2 {u_r} seul oublie que la base tourne.', ref: C4 + '#s5' },

    /* ---------- 6. vecteur accélération ---------- */
    { id: 'phys-c4-20', topic: 'phys-polaires-va', lvl: 1, type: 'single', q: 'En coordonnées polaires, le vecteur accélération s’écrit…',
      o: ['{a} = (`r̈` − `r θ̇`²) {u_r} + (2`ṙ θ̇` + `r θ̈`) {u_θ}', '{a} = `r̈` {u_r} + `r θ̈` {u_θ}', '{a} = (`r̈` + `r θ̇`²) {u_r} + (2`ṙ θ̇` + `r θ̈`) {u_θ}', '{a} = (`r̈` − `r θ̇`²) {u_r} + (`ṙ θ̇` + `r θ̈`) {u_θ}'], a: 0,
      x: 'C’est la formule du cours, obtenue en dérivant {v} = `ṙ` {u_r} + `r θ̇` {u_θ}, avec d{u_r}/d`t` = `θ̇` {u_θ} et d{u_θ}/d`t` = −`θ̇` {u_r}. Le −`r θ̇`² vient de la dérivée de {u_θ}, le 2`ṙ θ̇` de deux termes égaux. Les sujets la donnent souvent ; il faut surtout savoir l’utiliser.', ref: C4 + '#s6' },
    { id: 'phys-c4-21', topic: 'phys-polaires-va', lvl: 3, type: 'single', q: 'Dans la composante 2`ṙ θ̇` + `r θ̈`, d’où vient le facteur 2 ?',
      o: ['le terme `ṙ θ̇` {u_θ} apparaît deux fois : en dérivant `ṙ` {u_r} et en dérivant `r θ̇` {u_θ}', 'c’est une convention d’écriture', 'de la dérivée de `θ̇`²', 'de la dérivée de `r`²'], a: 0,
      x: 'd(`ṙ` {u_r})/d`t` = `r̈` {u_r} + `ṙ θ̇` {u_θ} ; d(`r θ̇` {u_θ})/d`t` = `ṙ θ̇` {u_θ} + `r θ̈` {u_θ} − `r θ̇`² {u_r}. Le terme `ṙ θ̇` {u_θ} sort une fois de chaque dérivée : 2`ṙ θ̇`.', ref: C4 + '#s6' },
    { id: 'phys-c4-22', topic: 'phys-polaires-va', lvl: 2, type: 'num', unit: 'm·s⁻²', a: -2, q: '`r`(`t`) = 2`t` (en m) et θ(`t`) = `t` (en rad). Que vaut la composante radiale de l’accélération, `a_r` = `r̈` − `r θ̇`², à `t` = 1 s ?',
      x: '`r̈` = 0 et `θ̇` = 1, donc `a_r` = 0 − 2`t` × 1² = −2`t`, soit −2 m·s⁻² à `t` = 1 s. Le signe moins est normal : cette composante pointe vers O.', ref: C4 + '#s6' },

    /* ---------- 7. mouvement circulaire ---------- */
    { id: 'phys-c4-23', topic: 'phys-circulaire', lvl: 1, type: 'single', q: 'Pour un mouvement circulaire uniforme de rayon `R`, l’accélération s’écrit, dans la base ({u_r}, {u_θ}) :',
      o: ['{a} = (−`R θ̇`² ; 0)', '{a} = (0 ; `R θ̈`)', '{a} = (−`R θ̇`² ; `R θ̈`)', '{a} = (`R θ̇`² ; 0)'], a: 0,
      x: 'Circulaire : `r` = `R` constant, donc `ṙ` = `r̈` = 0. Uniforme : `θ̇` constant, donc `θ̈` = 0. Il reste {a} = −`R θ̇`² {u_r} : l’accélération est dirigée vers le centre (centripète), elle n’est pas nulle. Avec un signe « + », elle pointerait vers l’extérieur.', ref: C4 + '#s7' },
    { id: 'phys-c4-24', topic: 'phys-circulaire', lvl: 2, type: 'single', q: 'Un point décrit un cercle de rayon `R`, et sa vitesse varie (mouvement accéléré ou décéléré). Que vaut son accélération dans la base ({u_r}, {u_θ}) ?',
      o: ['{a} = (−`R θ̇`² ; `R θ̈`)', '{a} = (0 ; `R θ̈`)', '{a} = (−`R θ̇`² ; 0)', '{a} = (`R θ̇`² ; `R θ̈`)'], a: 0,
      x: '`r` = `R` constant : `ṙ` = `r̈` = 0. Il reste −`R θ̇`² sur {u_r}, présent dès que le point tourne, et `R θ̈` sur {u_θ}. Accéléré ou décéléré, l’expression est la même : seul le signe de `θ̈` par rapport à celui de `θ̇` change.', ref: C4 + '#s7' },
    { id: 'phys-c4-25', topic: 'phys-circulaire', lvl: 1, type: 'num', unit: 'm·s⁻²', a: 18, q: 'Un point décrit un cercle de rayon 2 m, à vitesse angulaire constante ω = 3 rad·s⁻¹. Quelle est la norme de son accélération ?',
      x: '‖{a}‖ = `R` ω² = 2 × 9 = 18 m·s⁻². Uniforme ne veut pas dire accélération nulle : la direction de la vitesse change sans cesse. `R` ω = 6 m·s⁻¹, c’est la vitesse.', ref: C4 + '#s7' },
    { id: 'phys-c4-26', topic: 'phys-circulaire', lvl: 2, type: 'single', q: 'Dans un mouvement circulaire uniforme, l’accélération est…',
      o: ['dirigée vers le centre, de norme `v`²/`R`', 'nulle, puisque la vitesse est constante', 'tangente au cercle', 'dirigée vers l’extérieur du cercle'], a: 0,
      x: 'Avec `v` = `R θ̇` : ‖{a}‖ = `R θ̇`² = `v`²/`R`, selon −{u_r}, donc vers le centre. Ce qui est constant, c’est la norme de la vitesse, pas le vecteur : sa direction tourne, et il faut une accélération pour ça.', ref: C4 + '#s7' },
    { id: 'phys-c4-27', topic: 'phys-circulaire', lvl: 3, type: 'single', q: 'Un satellite décrit une orbite circulaire de rayon `r` autour de la Terre, de masse `M_T`, sous la seule action de la gravitation (TD 5, Ex 3). Quelle est sa vitesse ?',
      o: ['`v` = √(`G M_T` / `r`)', '`v` = `G M_T` / `r`²', '`v` = √(`G M_T` `r`)', '`v` = √(2`G M_T` / `r`)'], a: 0,
      x: '2e loi dans le référentiel géocentrique : `m` {a} = −`G M_T` `m`/`r`² {u_r}. Sur {u_θ} : `r θ̈` = 0, le mouvement est uniforme. Sur {u_r} : `v`²/`r` = `G M_T`/`r`², donc `v` = √(`G M_T`/`r`). La masse du satellite se simplifie.', ref: C4 + '#s7' },
    { id: 'phys-c4-28', topic: 'phys-circulaire', lvl: 2, type: 'tf', a: true, q: 'Pour un mouvement circulaire de centre O, `ṙ` = 0 et `r̈` = 0.',
      x: 'Vrai : `r` = `R` est constant, ses dérivées sont nulles. C’est la première ligne de toute question « mouvement circulaire » : elle fait disparaître `ṙ` et `r̈` des formules de la vitesse et de l’accélération.', ref: C4 + '#s7' },

    /* ---------- 8. passage cartésien ↔ polaire, cylindriques ---------- */
    { id: 'phys-c4-29', topic: 'phys-polaires', lvl: 1, type: 'single', q: 'Un point a pour coordonnées polaires `r` = 2 m et θ = π/2. Quelles sont ses coordonnées cartésiennes ?',
      o: ['(0 ; 2)', '(2 ; 0)', '(2 ; π/2)', '(0 ; −2)'], a: 0,
      x: '`x` = `r` cos θ = 2 cos(π/2) = 0 et `y` = `r` sin θ = 2 sin(π/2) = 2. Le point est sur l’axe des `y` positifs, à 2 m de O.', ref: C4 + '#s8' },
    { id: 'phys-c4-30', topic: 'phys-polaires', lvl: 2, type: 'single', q: 'Le point M a pour coordonnées cartésiennes (1 ; 1), en mètres. Quelles sont ses coordonnées polaires ?',
      o: ['`r` = √2 m, θ = π/4', '`r` = 2 m, θ = π/4', '`r` = √2 m, θ = 1 rad', '`r` = 1 m, θ = π/2'], a: 0,
      x: '`r` = √(`x`² + `y`²) = √2 m (pas 1 + 1 = 2). tan θ = `y`/`x` = 1, avec M dans le premier quadrant : θ = π/4.', ref: C4 + '#s8' },
    { id: 'phys-c4-31', topic: 'phys-polaires', lvl: 2, type: 'single', q: 'En coordonnées cylindriques, que faut-il ajouter aux coordonnées polaires (`r`, θ) pour repérer un point de l’espace ?',
      o: ['la cote `z`, sur un axe {u_z} fixe', 'un second angle', 'la vitesse angulaire `θ̇`', 'rien : ce sont les mêmes coordonnées'], a: 0,
      x: 'Cylindriques = polaires dans le plan (`x`, `y`) + la hauteur `z` : {OM} = `r` {u_r} + `z` {u_z}, avec {u_z} fixe. Un second angle, c’est le cas des coordonnées sphériques. La fiche d’aide du Moodle montre les deux repères ; le cours ne les développe pas.', ref: C4 + '#s8' }
  ];

  /* {v} → vecteur, `x` → grandeur ; indice après « _ », en italique pour une coordonnée */
  function sub(s) { return /^[xyzrθρ]$/.test(s) ? '<var>' + s + '</var>' : s; }
  function m(s) {
    return String(s)
      .replace(/\{([^{}_]+)(?:_([^{}]+))?\}/g, function (_, b, i) { return '<var class="vec">' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); })
      .replace(/`([^`_]+)(?:_([^`]+))?`/g, function (_, b, i) { return '<var>' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); });
  }
  FIG.m = m;
  Q.forEach(function (q) {
    q.s = 'physique';
    q.q = m(q.q); q.x = m(q.x);
    if (q.o) q.o = q.o.map(m);
  });
  Array.prototype.push.apply(B, Q);
})();
