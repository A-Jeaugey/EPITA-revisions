/* Banque de questions — Physique B2 (mouvement circulaire). Chargée après physique.js et physique-annales.js.
   1. Le chapitre « coordonnées polaires » (hors partiel 1) est passé au B2 : ses questions (ref vers
      physique/cours-4-polaires.html) passent en s:'phys2', ref réécrite vers phys2/cours-1-polaires.html ; ids conservés.
      Leurs notions ne sont plus décochées par défaut (window.QCM_OFF).
   2. Questions du chapitre 2 (phys2/cours-2-circulaire.html) : ids phys-c5-NN, dans l’ordre des parties.
   3. Questions des QCM des examens de fin de semestre (Epidocs S1/Finals/Phys) au programme : ids phys-fAAAA-qN
      (f2018j = juin 2018, S1# ; f2022d = décembre 2022). Les questions de statique (moments) attendent le cours ;
      celles qui portent sur la base de Frenet ont la notion phys-frenet (lecture des sujets, chapitre 2 partie 6).
   Notation : la même que physique.js ({v} vecteur, `x` grandeur, indice après « _ »). Réponses vérifiées par calcul. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var T = window.QCM_TOPICS = window.QCM_TOPICS || {};
  var MOVED = ['phys-polaires', 'phys-polaires-va', 'phys-circulaire'];
  T['phys-polaires'] = 'Coordonnées et base polaires';
  T['phys-polaires-va'] = 'Vitesse et accélération en polaires';
  T['phys-circulaire'] = 'Mouvement circulaire';
  T['phys-dyncirc'] = 'Dynamique du mouvement circulaire';
  T['phys-frenet'] = 'Base de Frenet (lecture des sujets)';
  if (window.QCM_OFF) window.QCM_OFF = window.QCM_OFF.filter(function (t) { return MOVED.indexOf(t) < 0; });

  var OLD = 'physique/cours-4-polaires.html', C4 = 'phys2/cours-1-polaires.html', C5 = 'phys2/cours-2-circulaire.html',
    C2 = 'physique/cours-2-dynamique.html', C3 = 'physique/cours-3-energie.html';
  B.forEach(function (q) {
    if (q.ref && q.ref.indexOf(OLD) === 0) { q.s = 'phys2'; q.ref = C4 + q.ref.slice(OLD.length); }
  });

  var Q = [
    /* ---------- chapitre 2, partie 1 : 2e loi en base polaire ---------- */
    { id: 'phys-c5-01', topic: 'phys-dyncirc', lvl: 1, type: 'single', q: 'Un point de masse `m` décrit un cercle de rayon `R` à la vitesse `v`. Projetée sur {u_r} (dirigé vers l’extérieur), la 2e loi s’écrit…',
      o: ['Σ`F_r` = −`m v`²/`R`', 'Σ`F_r` = `m v`²/`R`', 'Σ`F_r` = 0', 'Σ`F_r` = −`m g`'], a: 0,
      x: 'Sur un cercle, {a} = −`R θ̇`² {u_r} + `R θ̈` {u_θ}, et `R θ̇`² = `v`²/`R`. La résultante des forces vers le centre vaut donc `m v`²/`R` : sur {u_r}, qui pointe vers l’extérieur, elle compte −`m v`²/`R`.', ref: C5 + '#s1' },
    { id: 'phys-c5-02', topic: 'phys-dyncirc', lvl: 1, type: 'tf', a: false, q: 'La force centripète est une force de plus à ajouter au bilan des forces, à côté du poids et de la réaction.',
      x: 'Faux. `m v`²/`R` est ce que les vraies forces (poids, réaction, tension…) doivent fournir vers le centre pour que le point tourne. L’ajouter au bilan la compterait deux fois.', ref: C5 + '#s1' },
    { id: 'phys-c5-03', topic: 'phys-dyncirc', lvl: 2, type: 'single', q: 'Une bille sur une sphère est repérée par l’angle θ entre la verticale ascendante et le rayon OM ; {u_θ} pointe vers les θ croissants. Quelles sont les composantes du poids sur ({u_r}, {u_θ}) ?',
      o: ['(−`m g` cos θ ; `m g` sin θ)', '(−`m g` sin θ ; `m g` cos θ)', '(`m g` cos θ ; −`m g` sin θ)', '(−`m g` ; 0)'], a: 0,
      x: 'L’angle entre {P} et −{u_r} est θ : la composante en cos θ est sur le rayon, vers le centre (−`m g` cos θ). La composante tangente, `m g` sin θ, pousse la bille vers l’avant. Contrôle au sommet (θ = 0) : tout le poids est sur le rayon.', ref: C5 + '#s1' },

    /* ---------- partie 2 : réaction d’un support ---------- */
    { id: 'phys-c5-04', topic: 'phys-dyncirc', lvl: 2, type: 'single', q: 'Un mobile glisse sans frottement sur le dessus d’une sphère de rayon `R`, à l’angle θ de la verticale. La réaction du support vaut…',
      o: ['`N` = `m`(`g` cos θ − `v`²/`R`)', '`N` = `m g` cos θ', '`N` = `m`(`g` cos θ + `v`²/`R`)', '`N` = `m v`²/`R`'], a: 0,
      x: 'Sur {u_r} : `N` − `m g` cos θ = −`m v`²/`R`. Le poids tire vers le centre, la réaction repousse : plus le mobile va vite, plus la réaction diminue. `m g` cos θ seul est la réponse du plan incliné, sans le terme dû au virage.', ref: C5 + '#s2' },
    { id: 'phys-c5-05', topic: 'phys-dyncirc', lvl: 2, type: 'num', unit: 'N', a: 3.6, q: 'Une bille de 0,2 kg passe au point le plus bas d’une cuvette de rayon 0,5 m à la vitesse de 2 m·s⁻¹ (`g` = 10 m·s⁻²). Quelle est la réaction de la cuvette ?',
      x: 'Au point le plus bas, la réaction pointe vers le centre et le poids vers l’extérieur : `N` − `m g` = `m v`²/`R`. `N` = 0,2 × (10 + 4/0,5) = 0,2 × 18 = 3,6 N, presque le double du poids (2 N).', ref: C5 + '#s2' },
    { id: 'phys-c5-06', topic: 'phys-dyncirc', lvl: 1, type: 'single', q: 'Dans la 2e loi projetée sur {u_θ}, la réaction d’un support sans frottement…',
      o: ['n’apparaît pas : elle est perpendiculaire au mouvement', 'compense le poids', 'vaut `m R θ̈`', 'vaut `m v`²/`R`'], a: 0,
      x: 'Sans frottement, la réaction est perpendiculaire au support, donc portée par le rayon : sa composante sur {u_θ} est nulle. L’équation tangente ne contient que le poids : c’est elle qui donne l’équation différentielle du mouvement, `θ̈` − (`g`/`R`) sin θ = 0 sur une sphère.', ref: C5 + '#s2' },

    /* ---------- partie 3 : énergie puis 2e loi ---------- */
    { id: 'phys-c5-07', topic: 'phys-dyncirc', lvl: 2, type: 'single', q: 'Une bille part sans vitesse du sommet d’une sphère de rayon `R` et glisse sans frottement. Sa vitesse à l’angle θ de la verticale vérifie…',
      o: ['`v`² = 2`g R`(1 − cos θ)', '`v`² = 2`g R` cos θ', '`v`² = `g R`(1 − cos θ)', '`v`² = 2`g R` sin θ'], a: 0,
      x: 'La réaction ne travaille pas, l’énergie mécanique se conserve. Depuis le sommet, la bille est descendue de `R` − `R` cos θ : ½`m v`² = `m g R`(1 − cos θ). En θ = 0, `v` = 0 : c’est bien le point de départ.', ref: C5 + '#s3' },
    { id: 'phys-c5-08', topic: 'phys-dyncirc', lvl: 1, type: 'single', q: 'Dans un exercice de mouvement sur un support circulaire, pourquoi écrit-on l’énergie avant la 2e loi ?',
      o: ['l’énergie donne `v`² en fonction de la position, sans passer par le temps', 'la 2e loi est fausse sur un cercle', 'l’énergie donne directement la réaction', 'pour ne pas avoir à projeter le poids'], a: 0,
      x: 'La réaction projetée sur le rayon dépend de `v`². Le théorème de l’énergie relie `v` à la hauteur, donc à θ, en une ligne. On remplace ensuite `v`² dans la 2e loi : `N` = `m g`(3 cos θ − 2) pour la bille partie du sommet.', ref: C5 + '#s3' },

    /* ---------- partie 4 : quitter le support ---------- */
    { id: 'phys-c5-09', topic: 'phys-dyncirc', lvl: 2, type: 'single', q: 'Une bille part sans vitesse du sommet d’une sphère et glisse sans frottement. Elle quitte la sphère quand…',
      o: ['cos θ = 2/3', 'θ = 90°', 'sa vitesse s’annule', 'cos θ = 1/3'], a: 0,
      x: '`N` = `m g`(3 cos θ − 2) s’annule pour cos θ = 2/3, soit θ ≈ 48°. Au-delà, le calcul donnerait une réaction négative : un support ne peut pas tirer, la bille est en chute libre. C’est la question 3b de janvier 2020.', ref: C5 + '#s4' },
    { id: 'phys-c5-10', topic: 'phys-dyncirc', lvl: 2, type: 'tf', a: false, q: 'L’angle auquel une bille lâchée du sommet quitte la sphère dépend de sa masse et du rayon de la sphère.',
      x: 'Faux. `N`/(`m g`) = 3 cos θ − 2 : ni `m` ni `R` n’y figurent. Toute bille lâchée du sommet décolle à cos θ = 2/3.', ref: C5 + '#s4' },

    /* ---------- partie 5 : le looping ---------- */
    { id: 'phys-c5-11', topic: 'phys-dyncirc', lvl: 2, type: 'single', q: 'Au sommet d’un looping de rayon `R`, parcouru par l’intérieur, la masse reste en contact si…',
      o: ['`v`² ≥ `g R`', '`v` ≥ 0', '`v`² ≥ 2`g R`', '`v`² ≤ `g R`'], a: 0,
      x: 'Au sommet, poids et réaction pointent tous deux vers le centre : `N` + `m g` = `m v`²/`R`. `N` ≥ 0 impose `v`² ≥ `g R`. Une vitesse simplement positive ne suffit pas : le poids seul courberait la trajectoire plus que le cercle.', ref: C5 + '#s5' },
    { id: 'phys-c5-12', topic: 'phys-dyncirc', lvl: 3, type: 'num', unit: 'm', a: 5, q: 'Une masse est lâchée sans vitesse d’une hauteur `h` au-dessus du bas d’un looping de rayon 2 m, sans frottement. Quelle hauteur minimale permet de faire le tour ?',
      x: 'Au sommet, à 2`R` du bas : `v`² = 2`g`(`h` − 2`R`). La condition `v`² ≥ `g R` donne `h` ≥ 5`R`/2 = 5 m. Partir de 2`R` = 4 m ne suffit pas : la masse arriverait au sommet sans vitesse.', ref: C5 + '#s5' },

    /* ---------- partie 6 : frottements sur un arc, Frenet ---------- */
    { id: 'phys-c5-13', topic: 'phys-dyncirc', lvl: 2, type: 'single', q: 'Une force de frottement de norme constante 0,5 N s’oppose au mouvement le long d’un quart de cercle de rayon 2 m. Quel est son travail ?',
      o: ['−π/2 J', '−1 J', '−π J', '+π/2 J'], a: 0,
      x: 'Le chemin mesure `R` × π/2 = π m ; le frottement est opposé au déplacement : `W` = −`f` × π = −0,5π = −π/2 J. Ce n’est pas la distance en ligne droite entre les extrémités (2√2 m).', ref: C5 + '#s6' },
    { id: 'phys-c5-14', topic: 'phys-frenet', lvl: 2, type: 'single', q: 'Sur un cercle parcouru dans le sens des θ croissants, le vecteur {u_N} de la base de Frenet est…',
      o: ['−{u_r}, dirigé vers le centre', '{u_r}', '{u_θ}', '−{u_θ}'], a: 0,
      x: '{u_N} est normal à la trajectoire et pointe vers l’intérieur de la courbe : sur un cercle, vers le centre, donc −{u_r}. {u_T}, tangent dans le sens du mouvement, est {u_θ}.', ref: C5 + '#s6' },
    { id: 'phys-c5-15', topic: 'phys-frenet', lvl: 1, type: 'single', q: 'Un point tourne d’un angle θ (en radians) sur un cercle de rayon `R`, depuis θ = 0. Son abscisse curviligne vaut…',
      o: ['`s` = `R` θ', '`s` = θ', '`s` = `R` sin θ', '`s` = 2π`R`'], a: 0,
      x: 'L’abscisse curviligne est la longueur parcourue sur la trajectoire : sur un cercle, la longueur d’un arc d’angle θ est `R` θ. Sa dérivée donne la vitesse : `v` = `R θ̇`.', ref: C5 + '#s6' },

    /* ---------- QCM des examens de fin de semestre ---------- */
    { id: 'phys-f2022-q1', topic: 'phys-vecteurs', lvl: 1, type: 'single', keep: true, src: 'Examen janv. 2022 · QCM · Q1',
      q: 'Trois vecteurs {u_1}, {u_2} et {u_3} forment un repère orthonormé si et seulement si :',
      o: ['ils sont tous de norme égale à 1 et deux à deux perpendiculaires', 'ils sont de norme égale à 1 et deux à deux parallèles', 'ils appartiennent tous au même plan', 'leur somme est un vecteur nul'], a: 0,
      x: 'Pas de corrigé officiel ; réponse vérifiée. « Ortho » : deux à deux perpendiculaires ; « normé » : de norme 1. Trois vecteurs d’un même plan ne peuvent pas former une base de l’espace.', ref: 'physique/cours-1-cinematique.html#s1' },
    { id: 'phys-f2022-q2', topic: 'phys-polaires-va', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2022 · QCM · Q2',
      q: 'Mouvement d’une particule en coordonnées polaires ({u_ρ}, {u_θ}). Une seule des assertions ci-dessous est fausse. Laquelle ?',
      o: ['{OM}(`t`) = `ρ` {u_ρ}', '{v}(`t`) = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}', 'd{u_ρ}/d`t` = `θ̇` {u_θ}', 'd{u_θ}/d`t` = `θ̇` {u_ρ}'], a: 3,
      x: 'Pas de corrigé officiel ; réponse vérifiée. d{u_θ}/d`t` = −`θ̇` {u_ρ} : le signe moins manque. C’est lui qui donne le terme −`ρ θ̇`² de l’accélération, dirigé vers le centre.', ref: C4 + '#s3' },
    { id: 'phys-f2022-q7', topic: 'phys-polaires', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2022 · QCM · Q7',
      q: 'Une particule M se déplace dans le plan (`x`O`y`) avec `x`(`t`) = `V_0` `t` cos(`t`) et `y`(`t`) = `V_0` `t` sin(`t`), `V_0` constante. Au temps `t` = π secondes, la particule se trouve :',
      o: ['sur l’axe des Y', 'sur l’axe des X', 'à l’origine des axes', 'nulle part'], a: 1,
      x: 'Pas de corrigé officiel ; réponse vérifiée. `x`(π) = `V_0` π cos π = −`V_0` π et `y`(π) = `V_0` π sin π = 0 : M est sur l’axe des X, du côté négatif. En polaires, c’est une spirale : `ρ` = `V_0` `t`, θ = `t`.', ref: C4 + '#s8' },
    { id: 'phys-f2022-q3', topic: 'phys-frenet', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2022 · QCM · Q3',
      q: 'Au sujet des vecteurs {u_T} et {u_N} qui forment la base de Frenet, en un point M de la trajectoire d’un mobile, une seule affirmation est vraie. Laquelle ?',
      o: ['{u_T} est un vecteur normal à la trajectoire', '{u_N} est toujours dirigé vers l’intérieur de la concavité de la trajectoire', '{u_T} et {u_N} sont colinéaires', 'le produit scalaire de {u_T} et de {u_N} est égal au rayon de courbure'], a: 1,
      x: 'Pas de corrigé officiel ; réponse vérifiée. {u_T} est tangent, {u_N} normal et tourné vers l’intérieur de la courbe ; ils sont perpendiculaires, leur produit scalaire est nul. Sur un cercle, {u_N} pointe vers le centre.', ref: C5 + '#s6' },
    { id: 'phys-f2022-q4', topic: 'phys-frenet', lvl: 2, type: 'tf', a: false, keep: true, src: 'Examen janv. 2022 · QCM · Q4',
      q: 'Dans la base de Frenet, la norme du vecteur vitesse `v`(`t`) est une primitive de l’abscisse curviligne `s`(`t`).',
      x: 'Pas de corrigé officiel ; réponse vérifiée. C’est l’inverse : `v` = d`s`/d`t`, la vitesse est la dérivée de l’abscisse curviligne, et `s` une primitive de `v`. La question 5 du même QCM (« `s` est une dérivée de `v` ») est fausse pour la même raison.', ref: C5 + '#s6' },
    { id: 'phys-f2022-q6', topic: 'phys-frenet', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2022 · QCM · Q6',
      q: 'Dans la base de Frenet ({u_T}, {u_N}), un mobile d’abscisse curviligne `s`(`t`) et de vitesse `v`(`t`), sur une trajectoire de rayon de courbure `R`, a pour accélération :',
      o: ['{a} = `s̈` {u_T} + (`v`²/`R`) {u_N}', '{a} = `s̈` {u_T} + (`v`²/`R`²) {u_N}', '{a} = (2`v`/`R`) {u_T} + `R` {u_N}'], a: 0,
      x: 'Pas de corrigé officiel ; réponse vérifiée. `a_T` = d`v`/d`t` = `s̈` et `a_N` = `v`²/`R`. Sur un cercle, c’est l’accélération polaire : `R θ̈` sur {u_θ} et `R θ̇`² vers le centre.', ref: C5 + '#s6' },
    { id: 'phys-f2022d-q1', topic: 'phys-pva', lvl: 1, type: 'tf', a: false, keep: true, src: 'Examen déc. 2022 · QCM · Q1',
      q: 'Lors d’un mouvement quelconque, la vitesse et l’accélération sont toujours colinéaires.',
      x: 'Faux (réponse cochée sur la copie corrigée). Elles ne sont colinéaires que pour un mouvement rectiligne. Dans un mouvement circulaire uniforme, elles sont même perpendiculaires : {v} tangente, {a} vers le centre.', ref: 'physique/cours-1-cinematique.html#s4' },
    { id: 'phys-f2022d-q2', topic: 'phys-circulaire', lvl: 2, type: 'multi', keep: true, src: 'Examen déc. 2022 · QCM · Q2',
      q: 'Pour un mouvement circulaire de rayon `R`, à vitesse quelconque :',
      o: ['{v} = `R θ̇` {u_θ}', '{v} = `R` θ {u_θ}', '{a} = `R θ̇`² {u_r}', '{a} = −`R θ̇`² {u_r} + `R θ̈` {u_θ}'], a: [0, 3],
      x: 'Réponses validées sur la copie corrigée (options recopiées du sujet scanné, la b et la c reconstituées). `r` = `R` constant : {v} = `R θ̇` {u_θ} et {a} = −`R θ̇`² {u_r} + `R θ̈` {u_θ}. Sans le signe moins, l’accélération pointerait vers l’extérieur.', ref: C4 + '#s7' },
    { id: 'phys-f2020-q4', topic: 'phys-newton', lvl: 1, type: 'single', keep: true, src: 'Examen janv. 2020 · QCM · Q4',
      q: 'La deuxième loi de Newton s’écrit :',
      o: ['Σ{F_ext} = `m` d{OM}/d`t`', 'Σ{F_ext} = `m` d²{V}/d`t`²', 'Σ{F_ext} = d{p}/d`t`'], a: 2,
      x: 'Réponse vérifiée. Σ{F} = d{p}/d`t` avec {p} = `m` {v} ; à masse constante, c’est `m` {a}. La a est `m` {v}, la b dérive une fois de trop.', ref: C2 + '#s6' },
    { id: 'phys-f2020-q5', topic: 'phys-forces', lvl: 1, type: 'single', keep: true, src: 'Examen janv. 2020 · QCM · Q5',
      q: 'Donner un exemple de force à distance :',
      o: ['une force de frottement', 'l’interaction électrostatique', 'la force de rappel'], a: 1,
      x: 'Réponse vérifiée. L’interaction électrostatique, comme la gravitation, s’exerce sans contact. Frottement et force de rappel d’un ressort sont des forces de contact.', ref: C2 + '#s4' },
    { id: 'phys-f2020-q8', topic: 'phys-newton', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2020 · QCM · Q8',
      q: 'Une balle simplement lâchée près de la surface de la Terre chute verticalement : dans le référentiel terrestre, son centre a un mouvement rectiligne non uniforme. Qu’indique le principe d’inertie dans ce cas ?',
      o: ['que les forces appliquées à la balle se compensent', 'rien', 'que les forces appliquées à la balle ne se compensent pas'], a: 2,
      x: 'Corrigé officiel : c. Le principe d’inertie dit : forces qui se compensent ⇔ repos ou mouvement rectiligne uniforme. Ici le mouvement n’est pas uniforme, donc les forces ne se compensent pas (le poids l’emporte).', ref: C2 + '#s5' },
    { id: 'phys-f2018-q4', topic: 'phys-travail', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2018 · QCM · Q4',
      q: 'Le travail d’une force {f} variable, qui fait un angle α avec le vecteur déplacement d{l} sur le trajet AB, est :',
      o: ['`W_AB`({f}) = ∫ `f` d`l` sin α', '`W_AB`({f}) = `f` · AB · cos α', '`W_AB`({f}) = ∫ `f` d`l` cos α'], a: 2,
      x: 'Corrigé officiel : c. Le travail élémentaire est {f} · d{l} = `f` d`l` cos α ; pour une force variable on additionne (intègre) le long du trajet. `f` · AB · cos α ne vaut que pour une force constante sur un trajet rectiligne.', ref: C3 + '#s1' },
    { id: 'phys-f2018-q5', topic: 'phys-energie', lvl: 1, type: 'single', keep: true, src: 'Examen janv. 2018 · QCM · Q5',
      q: 'Le théorème de l’énergie cinétique est donné par :',
      o: ['Δ`E_c` = `W`({P}), où {P} est le poids', 'Δ`E_c` = `W`({f}), où {f} est la force de frottement', 'Δ`E_c` = Σ `W`({F_ext})'], a: 2,
      x: 'Corrigé officiel : c. La variation d’énergie cinétique est égale à la somme des travaux de toutes les forces extérieures. C’est la variation d’énergie mécanique qui vaut le travail des frottements.', ref: C3 + '#s4' },
    { id: 'phys-f2018-q6', topic: 'phys-energie', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2018 · QCM · Q6',
      q: 'En présence de frottements (seule force non conservative), le théorème de l’énergie mécanique s’écrit :',
      o: ['Δ`E_m` = 0', 'Δ`E_m` = `W`({f_frott})', 'Δ`E_m` = Δ`E_c`'], a: 1,
      x: 'Réponse vérifiée. La variation d’énergie mécanique est égale au travail des forces non conservatives. Δ`E_m` = 0 seulement sans frottement. La même question tombe en juin 2018.', ref: C3 + '#s7' },
    { id: 'phys-f2018-q7', topic: 'phys-travail', lvl: 1, type: 'single', keep: true, src: 'Examen janv. 2018 · QCM · Q7',
      q: 'Le travail d’une force {F} perpendiculaire au déplacement est :',
      o: ['strictement positif', 'nul', 'strictement négatif', 'dépendant de la vitesse'], a: 1,
      x: 'Réponse vérifiée. cos 90° = 0 : la force ne travaille pas. C’est le cas de la réaction d’un support sans frottement, même sur un support courbe.', ref: C3 + '#s2' },
    { id: 'phys-f2018-q8', topic: 'phys-travail', lvl: 2, type: 'single', keep: true, src: 'Examen janv. 2018 · QCM · Q8',
      q: 'Une masse `m` glisse sur une piste AB en arc de cercle de centre O (OA = OB = `R`), de A, à l’angle θ de la verticale, jusqu’au point le plus bas B. Le travail du poids sur le trajet AB est :',
      o: ['`W`({P}) = −`m g R`(1 − cos θ)', '`W`({P}) = `m g R` cos θ', '`W`({P}) = `m g R`(1 − cos θ)'], a: 2,
      x: 'Réponse vérifiée. Le poids est conservatif : `W` = `m g`(`z_A` − `z_B`). A est à la hauteur `R` − `R` cos θ au-dessus de B ; la masse descend, le travail est positif.', ref: C3 + '#s2' },
    { id: 'phys-f2018j-q2', topic: 'phys-frenet', lvl: 2, type: 'single', keep: true, src: 'Examen juin 2018 · QCM · Q2',
      q: 'Le vecteur accélération d’un mouvement circulaire décéléré, en base de Frenet, s’écrit :',
      o: ['{a} = (`a_T` &lt; 0 ; `a_N` &lt; 0)', '{a} = (`a_T` &lt; 0 ; `a_N` &gt; 0)', '{a} = (`a_T` &lt; 0 ; `a_N` = 0)', '{a} = (`a_T` = 0 ; `a_N` &gt; 0)'], a: 1,
      x: 'Réponse vérifiée. Décéléré : la norme de la vitesse diminue, `a_T` = d`v`/d`t` &lt; 0. `a_N` = `v`²/`R` est toujours positive dès que le point tourne.', ref: C5 + '#s6' },
    { id: 'phys-f2018j-q3', topic: 'phys-frenet', lvl: 1, type: 'single', keep: true, src: 'Examen juin 2018 · QCM · Q3',
      q: 'Dans la base de Frenet, le vecteur vitesse d’un mouvement circulaire de rayon `R` s’écrit :',
      o: ['{v} = `R θ̇` {u_T}', '{v} = `R θ̈` {u_T}', '{v} = `R θ̇` {u_N}'], a: 0,
      x: 'Corrigé officiel : a. La vitesse est tangente à la trajectoire, de norme `R θ̇` : c’est {v} = `R θ̇` {u_θ} du cours, avec {u_T} = {u_θ}.', ref: C5 + '#s6' },
    { id: 'phys-f2018j-q6', topic: 'phys-energie', lvl: 1, type: 'single', keep: true, src: 'Examen juin 2018 · QCM · Q6',
      q: 'Une force conservative est une force dont le travail est :',
      o: ['nul quel que soit le trajet', 'strictement positif', 'indépendant du chemin suivi'], a: 2,
      x: 'Corrigé officiel : c. Le travail d’une force conservative ne dépend que des points de départ et d’arrivée. Il n’est nul que sur un trajet fermé.', ref: C3 + '#s5' },
    { id: 'phys-f2018j-q7', topic: 'phys-energie', lvl: 1, type: 'single', keep: true, src: 'Examen juin 2018 · QCM · Q7',
      q: 'Le théorème de l’énergie mécanique pour un mouvement quelconque est donné par :',
      o: ['Δ`E_m` = `W`({P}), où {P} est le poids', 'Δ`E_m` = `W`({f}), où {f} est la force de frottement', 'Δ`E_m` = Δ`E_c` + Δ`E_p`'], a: 1,
      x: 'Corrigé officiel : b. La variation d’énergie mécanique est égale au travail des forces non conservatives, ici le frottement. La c est la définition de `E_m` (vraie, mais ce n’est pas le théorème).', ref: C3 + '#s7' },
    { id: 'phys-f2018j-q8', topic: 'phys-travail', lvl: 2, type: 'single', keep: true, src: 'Examen juin 2018 · QCM · Q8',
      q: 'Une masse `m` glisse sur une piste AB en arc de cercle de centre O (OA = OB = `R`), d’angle θ. Le travail de la force de frottement {f}, de norme constante, sur le trajet AB est :',
      o: ['`W`({f}) = −`f R` cos θ', '`W`({f}) = `f`(1 − cos θ)', '`W`({f}) = −`f R` θ'], a: 2,
      x: 'Réponse vérifiée. Le frottement est opposé au déplacement, le long d’un arc de longueur `R` θ (θ en radians) : `W` = −`f R` θ. La b n’est même pas homogène à un travail.', ref: C5 + '#s6' }
  ];

  /* même notation que data/qcm/physique.js */
  function sub(s) { return /^[xyzrθρ]$/.test(s) ? '<var>' + s + '</var>' : s; }
  function m(s) {
    return String(s)
      .replace(/\{([^{}_]+)(?:_([^{}]+))?\}/g, function (_, b, i) { return '<var class="vec">' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); })
      .replace(/`([^`_]+)(?:_([^`]+))?`/g, function (_, b, i) { return '<var>' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); });
  }
  Q.forEach(function (q) {
    q.s = 'phys2';
    q.q = m(q.q); q.x = m(q.x);
    if (q.o) q.o = q.o.map(m);
  });
  Array.prototype.push.apply(B, Q);
})();
