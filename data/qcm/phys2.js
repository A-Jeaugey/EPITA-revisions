/* Banque de questions — Physique B2 (mouvement circulaire). Chargée après physique.js et physique-annales.js.
   1. Le chapitre « coordonnées polaires » (hors partiel 1) est passé au B2 : ses questions (ref vers
      physique/cours-4-polaires.html) passent en s:'phys2', ref réécrite vers phys2/cours-1-polaires.html ; ids conservés.
      Leurs notions ne sont plus décochées par défaut (window.QCM_OFF).
   2. Questions du chapitre 2 (phys2/cours-2-circulaire.html) : ids phys-c5-NN, dans l’ordre des parties.
   3. Questions des QCM des examens de fin de semestre (Epidocs S1/Finals/Phys) au programme : ids phys-fAAAA-qN
      (f2018j = juin 2018, S1# ; f2022d = décembre 2022). Les questions de statique (moments) attendent le cours ;
      celles qui portent sur la base de Frenet ont la notion phys-frenet (lecture des sujets, chapitre 2 partie 6).
   4. Chapitres 3 à 5 (oscillateur harmonique, pendule et amortissement, ondes ; Moodle de novembre 2026) : ids phys-c6-NN,
      phys-c7-NN, phys-c8-NN, dans l’ordre des parties.
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
  T['phys-ressort'] = 'Force de rappel d’un ressort';
  T['phys-oscillateur'] = 'Oscillateur harmonique';
  T['phys-pendule'] = 'Pendule simple';
  T['phys-amorti'] = 'Frottement fluide, amortissement';
  T['phys-ondes'] = 'Ondes progressives, OPPM';
  T['phys-dephasage'] = 'Déphasage, interférences';
  T['phys-stationnaire'] = 'Ondes stationnaires, modes propres';
  if (window.QCM_OFF) window.QCM_OFF = window.QCM_OFF.filter(function (t) { return MOVED.indexOf(t) < 0; });

  var OLD = 'physique/cours-4-polaires.html', C4 = 'phys2/cours-1-polaires.html', C5 = 'phys2/cours-2-circulaire.html',
    C2 = 'physique/cours-2-dynamique.html', C3 = 'physique/cours-3-energie.html';
  var C6 = 'phys2/cours-3-oscillateur.html', C7 = 'phys2/cours-4-pendule.html', C8 = 'phys2/cours-5-ondes.html';
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
      x: 'Réponse vérifiée. Le frottement est opposé au déplacement, le long d’un arc de longueur `R` θ (θ en radians) : `W` = −`f R` θ. La b n’est même pas homogène à un travail.', ref: C5 + '#s6' }    ,
    /* ---------- chapitre 3 : oscillateur harmonique (phys2/cours-3-oscillateur.html) ---------- */
    { id: 'phys-c6-01', topic: 'phys-ressort', lvl: 1, type: 'num', unit: 'N', a: 1, q: 'Un ressort de raideur `k` = 20 N·m⁻¹ et de longueur à vide 10 cm est étiré jusqu’à 15 cm. Quelle est la norme de sa force de rappel ?',
      x: '‖{F}‖ = `k` |`ℓ` − `ℓ_0`| = 20 × 0,05 = 1 N. L’allongement se met en mètres : 5 cm = 0,05 m.', ref: C6 + '#s1' },
    { id: 'phys-c6-02', topic: 'phys-ressort', lvl: 1, type: 'single', q: 'Une masse est accrochée à un ressort horizontal ; l’origine de l’axe `x` est sa position de repos. La masse est en `x` = −3 cm (ressort comprimé). La force de rappel {F} = −`k x` {u_x} est dirigée…',
      o: ['vers les `x` positifs', 'vers les `x` négatifs', 'nulle part : elle est nulle', 'perpendiculairement à l’axe'], a: 0,
      x: 'Avec `x` = −0,03 m, −`k x` est positif : la force pointe vers les `x` positifs. Ressort comprimé, il repousse la masse vers sa position de repos.', ref: C6 + '#s1' },
    { id: 'phys-c6-03', topic: 'phys-ressort', lvl: 2, type: 'single', q: 'Un ressort (raideur `k`, longueur à vide `ℓ_0`) est fixé à un bâti en H, d’abscisse `x_H`. La masse M est à droite de H, à l’abscisse `x` &gt; `x_H`. Quelle est la force du ressort sur M ?',
      o: ['−`k`(`x` − `x_H` − `ℓ_0`) {u_x}', '−`k`(`x` − `ℓ_0`) {u_x}', '`k`(`x` − `x_H` − `ℓ_0`) {u_x}', '−`k x` {u_x}'], a: 0,
      x: 'La longueur du ressort est `x` − `x_H` et le vecteur unitaire de H vers M est {u_x} : {F} = −`k`(`ℓ` − `ℓ_0`) {u_x}. Contrôle : ressort étiré, la force pointe vers H, vers les `x` négatifs (TD 6, Ex 1, cas 3).', ref: C6 + '#s1' },
    { id: 'phys-c6-04', topic: 'phys-oscillateur', lvl: 1, type: 'single', q: 'Une masse `m` glisse sans frottement sur un support horizontal, attachée à un ressort de raideur `k` ; `x` est l’écart à la position de repos. Quelle équation obtient-on avec la 2e loi ?',
      o: ['`ẍ` + (`k`/`m`) `x` = 0', '`ẍ` − (`k`/`m`) `x` = 0', '`ẍ` + (`m`/`k`) `x` = 0', '`ẍ` + `k x` = 0'], a: 0,
      x: 'Sur l’axe `x`, poids et réaction ne comptent pas : −`k x` = `m ẍ`. On divise par `m` : `ẍ` + (`k`/`m`) `x` = 0, avec `ω_0`² = `k`/`m`. La dernière oublie de diviser `k` par `m`.', ref: C6 + '#s2' },
    { id: 'phys-c6-05', topic: 'phys-oscillateur', lvl: 1, type: 'tf', a: true, q: 'Pour une masse attachée à un ressort horizontal, le poids et la réaction du support disparaissent quand on projette la 2e loi sur l’axe horizontal.',
      x: 'Vrai. Ces deux forces sont verticales : leur projection sur l’axe `x` est nulle. Il ne reste que la force de rappel (et un éventuel frottement).', ref: C6 + '#s2' },
    { id: 'phys-c6-06', topic: 'phys-oscillateur', lvl: 1, type: 'single', q: 'Dans quelle unité s’exprime la pulsation propre `ω_0` = √(`k`/`m`) d’un oscillateur masse-ressort ?',
      o: ['rad·s⁻¹ (s⁻¹)', 's', 'N·m⁻¹', 'Hz·m'], a: 0,
      x: '`k`/`m` est en N·m⁻¹·kg⁻¹ = kg·s⁻²·kg⁻¹ = s⁻². Sa racine est en s⁻¹, qu’on écrit rad·s⁻¹ pour une pulsation.', ref: C6 + '#s2' },
    { id: 'phys-c6-07', topic: 'phys-oscillateur', lvl: 2, type: 'single', q: 'La solution de `ẍ` + `ω_0`² `x` = 0 s’écrit `x`(`t`) = `A` cos(`ω_0 t`) + `B` sin(`ω_0 t`), avec `x`(0) = `x_0` et `ẋ`(0) = `v_0`. Que valent `A` et `B` ?',
      o: ['`A` = `x_0` et `B` = `v_0`/`ω_0`', '`A` = `x_0` et `B` = `v_0`', '`A` = `v_0`/`ω_0` et `B` = `x_0`', '`A` = `x_0` et `B` = 0'], a: 0,
      x: '`x`(0) = `A` donne `A` = `x_0`. En dérivant, `ẋ`(0) = `B ω_0` = `v_0`, donc `B` = `v_0`/`ω_0`, qui est bien une longueur. `B` = 0 seulement si la masse est lâchée sans vitesse.', ref: C6 + '#s3' },
    { id: 'phys-c6-08', topic: 'phys-oscillateur', lvl: 2, type: 'num', unit: 'cm', a: 5, q: 'Une masse de 0,5 kg est attachée à un ressort de raideur 50 N·m⁻¹. On la lâche à `x_0` = 4 cm de sa position d’équilibre avec une vitesse `v_0` = 0,3 m·s⁻¹. Quelle est l’amplitude de ses oscillations, en cm ?',
      x: '`ω_0` = √(50/0,5) = 10 rad·s⁻¹ et `v_0`/`ω_0` = 0,03 m. Amplitude : √(0,04² + 0,03²) = 0,05 m = 5 cm. L’élan la fait aller plus loin que 4 cm.', ref: C6 + '#s3' },
    { id: 'phys-c6-09', topic: 'phys-oscillateur', lvl: 1, type: 'single', q: 'Une masse au bout d’un ressort est lâchée sans vitesse à 3 cm de sa position d’équilibre. Que vaut `x`(`t`), en cm ?',
      o: ['3 cos(`ω_0 t`)', '3 sin(`ω_0 t`)', '3 cos(`ω_0 t`) + 3 sin(`ω_0 t`)', '(3/`ω_0`) sin(`ω_0 t`)'], a: 0,
      x: 'Sans vitesse initiale, `B` = 0 et `A` = `x_0` = 3 cm : `x` = 3 cos(`ω_0 t`). Contrôle : `x`(0) = 3 et `ẋ`(0) = 0. Le sinus correspond à une masse lancée depuis la position d’équilibre.', ref: C6 + '#s3' },
    { id: 'phys-c6-10', topic: 'phys-oscillateur', lvl: 1, type: 'num', unit: 's', a: 0.628, q: 'Une masse de 0,4 kg oscille au bout d’un ressort de raideur 40 N·m⁻¹, sans frottement. Quelle est sa période propre, en secondes (au centième) ?',
      x: '`ω_0` = √(40/0,4) = 10 rad·s⁻¹ ; `T_0` = 2π/`ω_0` = 2π/10 ≈ 0,63 s. Ou directement `T_0` = 2π√(`m`/`k`).', ref: C6 + '#s4' },
    { id: 'phys-c6-11', topic: 'phys-oscillateur', lvl: 2, type: 'single', q: 'Avec le même ressort, on remplace la masse par une masse quatre fois plus lourde. La période propre est…',
      o: ['multipliée par 2', 'multipliée par 4', 'divisée par 2', 'inchangée'], a: 0,
      x: '`T_0` = 2π√(`m`/`k`) : multiplier `m` par 4 multiplie la racine par √4 = 2. Plus lourd, il oscille plus lentement.', ref: C6 + '#s4' },
    { id: 'phys-c6-12', topic: 'phys-oscillateur', lvl: 1, type: 'tf', a: false, q: 'La période d’un oscillateur harmonique augmente quand on l’écarte davantage de sa position d’équilibre avant de le lâcher.',
      x: 'Faux. `T_0` = 2π√(`m`/`k`) ne dépend que de la masse et du ressort, pas de l’amplitude : c’est ce qui rend l’oscillateur « harmonique ».', ref: C6 + '#s4' },
    { id: 'phys-c6-13', topic: 'phys-oscillateur', lvl: 1, type: 'single', q: 'Un oscillateur masse-ressort sans frottement (raideur `k`, masse `m`) oscille avec l’amplitude `X_m`. Que vaut son énergie mécanique ?',
      o: ['½ `k X_m`²', '½ `m X_m`²', '`k X_m`', '½ `k X_m`'], a: 0,
      x: 'Aux extrémités, la vitesse est nulle : toute l’énergie est élastique, ½ `k X_m`². Elle se conserve ensuite (pas de frottement).', ref: C6 + '#s5' },
    { id: 'phys-c6-14', topic: 'phys-oscillateur', lvl: 1, type: 'single', q: 'Où la vitesse d’une masse qui oscille au bout d’un ressort, sans frottement, est-elle maximale ?',
      o: ['au passage par la position d’équilibre', 'aux deux extrémités', 'à mi-chemin entre l’équilibre et une extrémité', 'partout : elle est constante'], a: 0,
      x: 'À l’équilibre, le ressort n’est ni étiré ni comprimé : l’énergie élastique est nulle, toute l’énergie est cinétique. Aux extrémités, la vitesse est nulle.', ref: C6 + '#s5' },
    { id: 'phys-c6-15', topic: 'phys-oscillateur', lvl: 1, type: 'single', q: 'On double l’amplitude des oscillations d’un oscillateur masse-ressort sans frottement. Son énergie mécanique est…',
      o: ['multipliée par 4', 'multipliée par 2', 'inchangée', 'multipliée par √2'], a: 0,
      x: '`E_M` = ½ `k X_m`² est proportionnelle au carré de l’amplitude : 2² = 4.', ref: C6 + '#s5' },
    { id: 'phys-c6-16', topic: 'phys-oscillateur', lvl: 1, type: 'num', unit: 'J', a: 0.5, q: 'Un ressort de raideur 100 N·m⁻¹ fait osciller une masse sans frottement avec une amplitude de 10 cm. Quelle est l’énergie mécanique de l’oscillateur ?',
      x: '`E_M` = ½ `k X_m`² = ½ × 100 × 0,1² = 0,5 J.', ref: C6 + '#s5' },
    { id: 'phys-c6-17', topic: 'phys-oscillateur', lvl: 2, type: 'single', q: 'Une masse `m` pend au bout d’un ressort vertical (raideur `k`, longueur à vide `ℓ_0`), accroché en O ; l’axe `z` est vertical vers le haut, d’origine O. Quelle est la cote `z_e` de la position d’équilibre ?',
      o: ['−(`ℓ_0` + `m g`/`k`)', '−`ℓ_0`', '−(`ℓ_0` − `m g`/`k`)', '`m g`/`k`'], a: 0,
      x: 'À l’équilibre, la force de rappel `k`(−`z_e` − `ℓ_0`) compense le poids `m g` : −`z_e` − `ℓ_0` = `m g`/`k`. Le ressort est plus long que `ℓ_0` de `m g`/`k`, et la masse est sous O (cote négative).', ref: C6 + '#s6' },
    { id: 'phys-c6-18', topic: 'phys-oscillateur', lvl: 2, type: 'tf', a: false, q: 'Pour une masse suspendue à un ressort vertical, le poids change la pulsation propre des oscillations.',
      x: 'Faux. Avec `Z` = `z` − `z_e`, l’équation devient `Z̈` + (`k`/`m`) `Z` = 0 : la pulsation reste √(`k`/`m`). Le poids déplace seulement la position d’équilibre.', ref: C6 + '#s6' },
    { id: 'phys-c6-19', topic: 'phys-oscillateur', lvl: 1, type: 'num', unit: 'cm', a: 10, q: 'Une masse de 0,1 kg est suspendue à un ressort vertical de raideur 10 N·m⁻¹ (`g` = 10 m·s⁻²). De combien le ressort est-il allongé à l’équilibre, en cm ?',
      x: 'À l’équilibre, `k` Δ`ℓ` = `m g` : Δ`ℓ` = 0,1 × 10 / 10 = 0,1 m = 10 cm.', ref: C6 + '#s6' },

    /* ---------- chapitre 4 : pendule et amortissement (phys2/cours-4-pendule.html) ---------- */
    { id: 'phys-c7-01', topic: 'phys-pendule', lvl: 2, type: 'single', q: 'Un pendule simple (masse `m`, fil de longueur `l`) fait l’angle θ avec la verticale descendante ; {u_r} va de O vers la masse, {u_θ} dans le sens des θ croissants. Quelles sont les composantes du poids sur ({u_r}, {u_θ}) ?',
      o: ['(`m g` cos θ ; −`m g` sin θ)', '(−`m g` cos θ ; `m g` sin θ)', '(`m g` sin θ ; `m g` cos θ)', '(`m g` ; 0)'], a: 0,
      x: 'L’angle entre le poids et {u_r} est θ : `m g` cos θ sur {u_r}. La composante tangente, −`m g` sin θ, ramène la masse vers θ = 0. Contrôle en θ = 0 : tout le poids est le long du fil.', ref: C7 + '#s1' },
    { id: 'phys-c7-02', topic: 'phys-pendule', lvl: 2, type: 'single', q: 'Pour un pendule simple de longueur `l`, sans frottement, la 2e loi projetée sur {u_θ} donne…',
      o: ['θ̈ + (`g`/`l`) sin θ = 0', 'θ̈ − (`g`/`l`) sin θ = 0', 'θ̈ + (`g`/`l`) cos θ = 0', 'θ̈ + (`l`/`g`) sin θ = 0'], a: 0,
      x: 'Sur {u_θ} : −`m g` sin θ = `m l` θ̈ (l’accélération orthoradiale vaut `l` θ̈ car `r` = `l` est constant). On divise par `m l`.', ref: C7 + '#s1' },
    { id: 'phys-c7-03', topic: 'phys-pendule', lvl: 1, type: 'tf', a: false, q: 'La tension du fil d’un pendule simple intervient dans l’équation du mouvement obtenue en projetant la 2e loi sur {u_θ}.',
      x: 'Faux. La tension est portée par le fil, donc par {u_r} : elle n’apparaît que dans l’équation sur {u_r}, qui sert à la calculer.', ref: C7 + '#s1' },
    { id: 'phys-c7-04', topic: 'phys-pendule', lvl: 1, type: 'single', q: 'Quelle est la période des petites oscillations d’un pendule simple de longueur `l` ?',
      o: ['2π√(`l`/`g`)', '2π√(`g`/`l`)', '2π√(`m`/`k`)', '2π `l`/`g`'], a: 0,
      x: 'Pour de petits angles, θ̈ + (`g`/`l`) θ = 0 : `ω_0` = √(`g`/`l`) et `T_0` = 2π/`ω_0` = 2π√(`l`/`g`). Contrôle : √(m/(m·s⁻²)) = s.', ref: C7 + '#s2' },
    { id: 'phys-c7-05', topic: 'phys-pendule', lvl: 1, type: 'tf', a: false, q: 'Pour de petites oscillations, un pendule simple deux fois plus lourd oscille plus lentement.',
      x: 'Faux. La masse se simplifie dans l’équation : `T_0` = 2π√(`l`/`g`) ne dépend que de la longueur et de `g`.', ref: C7 + '#s2' },
    { id: 'phys-c7-06', topic: 'phys-pendule', lvl: 1, type: 'num', unit: 's', a: 2, q: 'Un pendule simple de 1 m de long oscille avec de petits angles. On prend `g` ≈ π² m·s⁻². Quelle est sa période ?',
      x: '`T_0` = 2π√(1/π²) = 2π/π = 2 s : le pendule « qui bat la seconde » (une seconde par aller).', ref: C7 + '#s2' },
    { id: 'phys-c7-07', topic: 'phys-pendule', lvl: 2, type: 'single', q: 'Pour doubler la période des petites oscillations d’un pendule simple, il faut multiplier sa longueur par…',
      o: ['4', '2', '√2', '8'], a: 0,
      x: '`T_0` est proportionnelle à √`l` : pour doubler √`l`, il faut multiplier `l` par 4.', ref: C7 + '#s2' },
    { id: 'phys-c7-08', topic: 'phys-pendule', lvl: 1, type: 'single', q: 'Un pendule simple (masse `m`, longueur `l`) fait l’angle θ avec la verticale. On prend l’énergie potentielle nulle au point le plus bas. Que vaut son énergie potentielle de pesanteur ?',
      o: ['`m g l`(1 − cos θ)', '`m g l` cos θ', '`m g l` sin θ', '`m g l`(1 − sin θ)'], a: 0,
      x: 'La masse est à la hauteur `l` − `l` cos θ au-dessus du point le plus bas. Contrôle : nulle en θ = 0, maximale aux extrémités.', ref: C7 + '#s3' },
    { id: 'phys-c7-09', topic: 'phys-pendule', lvl: 1, type: 'single', q: 'Que vaut l’énergie cinétique d’un pendule simple de longueur `l` et de masse `m`, en fonction de sa vitesse angulaire θ̇ ?',
      o: ['½ `m l`² θ̇²', '½ `m` θ̇²', '½ `m l` θ̇²', '`m g l` θ̇'], a: 0,
      x: 'La masse décrit un cercle de rayon `l` : sa vitesse vaut `v` = `l` θ̇, donc `E_c` = ½ `m`(`l` θ̇)².', ref: C7 + '#s3' },
    { id: 'phys-c7-10', topic: 'phys-pendule', lvl: 2, type: 'num', unit: 'm·s⁻¹', a: 2.83, q: 'Un pendule simple de 0,8 m est lâché sans vitesse depuis θ₀ = 60° (cos 60° = 0,5), sans frottement, avec `g` = 10 m·s⁻². Quelle est sa vitesse au point le plus bas ?',
      x: 'Conservation de l’énergie : ½ `m v`² = `m g l`(1 − cos θ₀), donc `v` = √(2 × 10 × 0,8 × 0,5) = √8 ≈ 2,83 m·s⁻¹. Valable même pour un grand angle.', ref: C7 + '#s3' },
    { id: 'phys-c7-11', topic: 'phys-amorti', lvl: 2, type: 'single', q: 'Une masse `m` attachée à un ressort horizontal (raideur `k`) subit en plus un frottement fluide {f} = −α {v}. Quelle équation obtient-on ?',
      o: ['`ẍ` + (α/`m`) `ẋ` + (`k`/`m`) `x` = 0', '`ẍ` + (α/`m`) `x` + (`k`/`m`) `ẋ` = 0', '`ẍ` + α `ẋ` + (`k`/`m`) `x` = 0', '`ẍ` + (`k`/`m`) `x` = −α'], a: 0,
      x: 'Sur `x` : −`k x` − α `ẋ` = `m ẍ`, puis on divise tout par `m`. Le frottement dépend de la vitesse : il donne un terme en `ẋ`.', ref: C7 + '#s4' },
    { id: 'phys-c7-12', topic: 'phys-amorti', lvl: 1, type: 'single', q: 'L’équation d’un oscillateur amorti s’écrit `ẍ` + (1/τ) `ẋ` + `ω_0`² `x` = 0, avec un frottement fluide {f} = −α {v}. Que vaut τ, et dans quelle unité ?',
      o: ['`m`/α, en secondes', 'α/`m`, en secondes', '`m`/α, en s⁻¹', '√(`m`/`k`), en secondes'], a: 0,
      x: 'En divisant par `m`, le coefficient de `ẋ` est α/`m` = 1/τ, donc τ = `m`/α. α est en kg·s⁻¹ : τ est en secondes, c’est un temps caractéristique.', ref: C7 + '#s4' },
    { id: 'phys-c7-13', topic: 'phys-amorti', lvl: 1, type: 'tf', a: true, q: 'Avec un frottement fluide, l’énergie mécanique d’un oscillateur diminue au cours du temps.',
      x: 'Vrai. La puissance du frottement, {f}·{v} = −α`v`², est négative : il prend de l’énergie au système à chaque instant.', ref: C7 + '#s4' },
    { id: 'phys-c7-14', topic: 'phys-amorti', lvl: 1, type: 'single', q: 'Un oscillateur amorti a `λ` = 1/(2τ) plus petit que sa pulsation propre `ω_0`. Dans quel régime est-il ?',
      o: ['pseudo-périodique', 'apériodique', 'critique', 'harmonique'], a: 0,
      x: 'Frottement faible (`λ` &lt; `ω_0`) : il oscille encore, avec une amplitude qui décroît en e<sup>−`λ t`</sup>. Harmonique, c’est sans frottement du tout.', ref: C7 + '#s5' },
    { id: 'phys-c7-15', topic: 'phys-amorti', lvl: 2, type: 'single', q: 'Une masse de 1 kg, un ressort de raideur 100 N·m⁻¹ et un frottement fluide de coefficient α = 30 kg·s⁻¹. Quel est le régime ? (On compare `λ` = α/(2`m`) à `ω_0`.)',
      o: ['apériodique', 'pseudo-périodique', 'critique'], a: 0,
      x: '`λ` = 30/2 = 15 s⁻¹ et `ω_0` = √100 = 10 rad·s⁻¹ : `λ` &gt; `ω_0`, frottement fort, pas d’oscillation. Le critique serait α = 20 kg·s⁻¹.', ref: C7 + '#s5' },
    { id: 'phys-c7-16', topic: 'phys-amorti', lvl: 2, type: 'tf', a: false, q: 'En régime pseudo-périodique, la pseudo-période est un peu plus courte que la période propre `T_0` de l’oscillateur sans frottement.',
      x: 'Faux. La pseudo-pulsation `ω` = √(`ω_0`² − `λ`²) est plus petite que `ω_0` : la pseudo-période 2π/`ω` est un peu plus longue que `T_0`.', ref: C7 + '#s5' },
    { id: 'phys-c7-17', topic: 'phys-amorti', lvl: 2, type: 'single', q: 'Quelle est la forme de la solution d’un oscillateur amorti en régime critique (`λ` = `ω_0`) ?',
      o: ['(`A` + `B t`) e<sup>−`ω_0 t`</sup>', '(`A` + `B t`) e<sup>`ω_0 t`</sup>', 'e<sup>−`λ t`</sup>(`A` cos `ω t` + `B` sin `ω t`)', '`A` cos(`ω_0 t`) + `B` sin(`ω_0 t`)'], a: 0,
      x: 'L’exposant est négatif : la masse revient à l’équilibre, le plus vite possible sans osciller. Le cours imprime e<sup>`ω_0 t`</sup> sans le signe moins : c’est une coquille.', ref: C7 + '#s5' },

    /* ---------- chapitre 5 : ondes et signal (phys2/cours-5-ondes.html) ---------- */
    { id: 'phys-c8-01', topic: 'phys-ondes', lvl: 1, type: 'num', unit: 'cm', a: 12.24, q: 'Un four à micro-ondes émet des ondes électromagnétiques de fréquence 2,45 GHz, qui se propagent à 3·10⁸ m·s⁻¹. Quelle est leur longueur d’onde, en cm ?',
      x: '`λ` = `c`/`f` = 3·10⁸ / 2,45·10⁹ ≈ 0,122 m ≈ 12 cm : centimétrique, malgré le nom « micro-ondes » (TD 8, Ex 2).', ref: C8 + '#s1' },
    { id: 'phys-c8-02', topic: 'phys-ondes', lvl: 1, type: 'single', q: 'Une onde de fréquence `f` se propage à la célérité `c`. Que vaut sa longueur d’onde ?',
      o: ['`c`/`f`', '`c` × `f`', '`f`/`c`', '1/`f`'], a: 0,
      x: 'La longueur d’onde est la distance parcourue pendant une période : `λ` = `c T` = `c`/`f`. Contrôle des unités : (m·s⁻¹)/(s⁻¹) = m.', ref: C8 + '#s1' },
    { id: 'phys-c8-03', topic: 'phys-ondes', lvl: 1, type: 'single', q: 'Un son de fréquence 30 kHz est…',
      o: ['un ultrason', 'un infrason', 'un son audible', 'une onde électromagnétique'], a: 0,
      x: 'L’oreille humaine entend de 20 Hz à 20 kHz. Au-dessus, ce sont des ultrasons ; en dessous de 20 Hz, des infrasons.', ref: C8 + '#s1' },
    { id: 'phys-c8-04', topic: 'phys-ondes', lvl: 1, type: 'tf', a: false, q: 'Une onde qui se propage le long d’une corde transporte de la matière de la main vers l’autre extrémité.',
      x: 'Faux. Une onde est une perturbation qui se déplace sans déplacement de matière : chaque point de la corde monte et descend sur place.', ref: C8 + '#s2' },
    { id: 'phys-c8-05', topic: 'phys-ondes', lvl: 1, type: 'single', q: 'Une onde s’écrit `s`(`x`, `t`) = `f`(`t` − `x`/`c`), avec `c` &gt; 0. Dans quel sens se propage-t-elle ?',
      o: ['vers les `x` croissants', 'vers les `x` décroissants', 'elle ne se propage pas', 'dans les deux sens'], a: 0,
      x: 'Le point d’abscisse `x` reproduit avec le retard `x`/`c` ce qui se passe en `x` = 0 : plus il est loin vers les `x` positifs, plus il est en retard. `f`(`t` + `x`/`c`) va dans l’autre sens.', ref: C8 + '#s2' },
    { id: 'phys-c8-06', topic: 'phys-ondes', lvl: 1, type: 'single', q: 'On secoue plus vite l’extrémité d’une corde tendue. La célérité de l’onde sur la corde…',
      o: ['ne change pas', 'augmente', 'diminue', 'double'], a: 0,
      x: 'La célérité dépend du milieu (la tension et la masse de la corde), pas de la source. Un geste plus rapide rend la bosse plus étroite, pas plus rapide (TD 8, Ex 1).', ref: C8 + '#s2' },
    { id: 'phys-c8-07', topic: 'phys-ondes', lvl: 1, type: 'single', q: 'Dans une onde sinusoïdale `s` = `A` cos(`ω t` − `k x`), que vaut la pulsation spatiale `k` ?',
      o: ['2π/`λ`', '2π/`T`', '`λ`/(2π)', '2π`λ`'], a: 0,
      x: '`k` = `ω`/`c` = 2π`f`/`c` = 2π/`λ`, en rad·m⁻¹. 2π/`T`, c’est la pulsation temporelle `ω`.', ref: C8 + '#s3' },
    { id: 'phys-c8-08', topic: 'phys-ondes', lvl: 2, type: 'num', unit: 'm·s⁻¹', a: 50, q: 'Une onde s’écrit `s`(`x`, `t`) = 3 cos(200π`t` − 4π`x`), avec `t` en secondes et `x` en mètres. Quelle est sa célérité ?',
      x: '`ω` = 200π rad·s⁻¹ et `k` = 4π rad·m⁻¹ : `c` = `ω`/`k` = 50 m·s⁻¹. Ou bien `f` = 100 Hz et `λ` = 2π/(4π) = 0,5 m, donc `c` = `λ f` = 50 m·s⁻¹.', ref: C8 + '#s3' },
    { id: 'phys-c8-09', topic: 'phys-ondes', lvl: 1, type: 'single', q: 'Dans quel sens se propage l’onde `s` = `A` cos(`ω t` + `k x`), avec `ω` et `k` positifs ?',
      o: ['vers les `x` décroissants', 'vers les `x` croissants', 'elle est stationnaire', 'on ne peut pas savoir'], a: 0,
      x: '`ω t` + `k x` = `ω`(`t` + `x`/`c`) : c’est la forme `f`(`t` + `x`/`c`), vers les `x` décroissants.', ref: C8 + '#s3' },
    { id: 'phys-c8-10', topic: 'phys-dephasage', lvl: 1, type: 'single', q: 'Deux signaux de même fréquence sont déphasés de Δφ = π. Ils sont…',
      o: ['en opposition de phase', 'en phase', 'en quadrature de phase', 'décalés d’une période entière'], a: 0,
      x: 'Δφ = 0 (à 2π près) : en phase ; Δφ = π : en opposition ; Δφ = π/2 : en quadrature. En opposition, quand l’un est au maximum, l’autre est au minimum.', ref: C8 + '#s4' },
    { id: 'phys-c8-11', topic: 'phys-dephasage', lvl: 2, type: 'single', q: 'Le signal `s_2` reproduit le signal `s_1` (pulsation `ω`) avec un retard Δ`t`. Que vaut le déphasage Δφ = φ₂ − φ₁ ?',
      o: ['−`ω` Δ`t`', '`ω` Δ`t`', '−Δ`t`/`T`', '2π Δ`t`'], a: 0,
      x: '`s_2`(`t`) = `s_1`(`t` − Δ`t`) = `A` cos(`ω t` − `ω` Δ`t` + φ₁) : φ₂ = φ₁ − `ω` Δ`t`. Un retard donne un déphasage négatif.', ref: C8 + '#s4' },
    { id: 'phys-c8-12', topic: 'phys-dephasage', lvl: 2, type: 'single', q: 'Deux signaux sinusoïdaux de 50 Hz : le second est en retard de 5 ms sur le premier. Ils sont…',
      o: ['en quadrature de phase, le second en retard', 'en opposition de phase', 'en phase', 'en quadrature de phase, le second en avance'], a: 0,
      x: 'Δφ = −2π`f` Δ`t` = −2π × 50 × 0,005 = −π/2 : quadrature, et le signe moins dit que le second est en retard. 5 ms, c’est un quart de la période de 20 ms.', ref: C8 + '#s4' },
    { id: 'phys-c8-13', topic: 'phys-dephasage', lvl: 2, type: 'num', unit: 'Hz', a: 85, q: 'Un auditeur est assis à 1 m devant un mur ; le son de l’enceinte lui arrive directement et après réflexion sur le mur (sans déphasage à la réflexion), avec `c` = 340 m·s⁻¹. Quelle est la plus basse fréquence affaiblie par interférence ?',
      x: 'Différence de chemin 2`D` : opposition de phase quand 2π`f` × 2`D`/`c` = π, soit `f` = `c`/(4`D`) = 340/4 = 85 Hz (puis 255 Hz, 425 Hz…). TD 8, Ex 3.', ref: C8 + '#s4' },
    { id: 'phys-c8-14', topic: 'phys-stationnaire', lvl: 1, type: 'single', q: 'Dans une onde stationnaire de longueur d’onde `λ`, quelle distance sépare deux nœuds consécutifs ?',
      o: ['`λ`/2', '`λ`', '`λ`/4', '2`λ`'], a: 0,
      x: 'L’amplitude vaut 2`A`|sin(`k x`)| : elle s’annule quand `k x` = `n`π, soit `x` = `n λ`/2. Un nœud et le ventre voisin sont séparés de `λ`/4.', ref: C8 + '#s5' },
    { id: 'phys-c8-15', topic: 'phys-stationnaire', lvl: 2, type: 'num', unit: 'Hz', a: 660, q: 'Une corde de guitare de 65 cm, fixée à ses deux bouts, porte des ondes qui se propagent à 286 m·s⁻¹. Quelle est la fréquence de son mode `n` = 3 ?',
      x: '`f_n` = `n c`/(2`L`) : le fondamental vaut 286/1,3 = 220 Hz, et le mode 3 vaut 3 × 220 = 660 Hz.', ref: C8 + '#s5' },
    { id: 'phys-c8-16', topic: 'phys-stationnaire', lvl: 2, type: 'single', q: 'Un tuyau de longueur `L`, fermé à un bout et ouvert à l’autre, vérifie `L` = `λ_n`/4 + `n λ_n`/2. Quelles sont ses fréquences propres (célérité `c`) ?',
      o: ['(2`n` + 1) `c`/(4`L`)', '`n c`/(2`L`)', '`n c`/(4`L`)', '(2`n` + 1) `c`/(2`L`)'], a: 0,
      x: '`L` = (2`n` + 1) `λ_n`/4, donc `λ_n` = 4`L`/(2`n` + 1) et `f_n` = `c`/`λ_n`. Seuls les multiples impairs du fondamental existent (TD 8, Ex 4). `n c`/(2`L`), c’est la corde fixée aux deux bouts.', ref: C8 + '#s5' },
    { id: 'phys-c8-17', topic: 'phys-stationnaire', lvl: 1, type: 'tf', a: false, q: 'Dans une onde stationnaire sur une corde, tous les points de la corde vibrent avec la même amplitude.',
      x: 'Faux. L’amplitude dépend de la position : nulle aux nœuds, maximale aux ventres. En revanche, tous les points vibrent à la même fréquence.', ref: C8 + '#s5' }
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
