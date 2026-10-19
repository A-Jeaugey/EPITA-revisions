/* Maths (OBM · DP) — comportements communs des pages, calcul exact et outils pas à pas.
   Chargé après core.js, mathrender.js (formules KaTeX) et, s'il y a des QCM, qcm-engine.js et la banque.

   PAGES
   Numéros de parties : <span class="pn" data-n="3"></span> (le chiffre entouré au stylo rouge). Sommaire actif
   (.toc a[href^="#"] + .sec[id]), barre de lecture (#prog), vérifications de fin de partie (<div data-check="id1,id2">
   ou <div data-check-ref="maths/cours-1-logique.html#s2" data-n="3"> : les premières questions de la banque dont ref
   vaut cette partie ; le bloc se masque si la banque n'en a pas), boutons « J'ai compris »
   (data-done="maths:<chapitre>:sN" ; chapitres logique, ensembles, fonctions, raisonnement, denombrement,
   probabilites, variables).
   Outils déclarés dans le HTML : <div data-maths="truth" data-opts='{"f":"P => Q"}'></div> (JSON ; mêmes options que
   l'appel REV.maths.truth(el, opts)). Montés au chargement ET quand un script les ajoute plus tard (corrigés, QCM :
   MutationObserver). REV.maths.mount(root) monte un conteneur à la main ; un bloc monté porte data-maths-done.
   Dans data-opts, le TeX double ses barres (JSON) : "\\forall x \\in \\R, x^2 \\geq 0".

   CALCUL EXACT (REV.maths) — jamais de flottant pour une probabilité : BigInt et fractions { n, d } réduites, d > 0.
     F(n, d) fabrique une fraction (n, d : nombres, BigInt ou chaînes) ; frac(x) convertit '3/8', '0,25', '-2', 5,
       une fraction (null si illisible). fr.add / sub / mul / div / neg / cmp / eq / isZero / pow(f, k) / sum(liste) ;
       fr.str(f) → '3/8' (signe −) ; fr.tex(f) → '\frac{3}{8}' ; fr.dec(f, k) → '0,375' (k chiffres, arrondi exact,
       virgule en français, point en anglais) ; fr.sqrt(f) → { exact, tex, approx } (racine simplifiée).
     binom(n, k) → BigInt ; fact(n) → BigInt.
   LOGIQUE
     logic.parse('P => (Q et non R)') → arbre { t: 'var' | 'not' | 'and' | 'or' | 'xor' | 'imp' | 'iff', n, a, b } ou
       { error } ; connecteurs acceptés : ¬ ! ~ non not \neg · ∧ & et and \land \wedge · ∨ | ou or \lor \vee ·
       ⇒ => -> implique \Rightarrow \implies · ⇔ <=> <-> ssi iff \Leftrightarrow \iff · ⊕ xor ; variables : une
       lettre (P, Q, R…). Priorité : ¬, puis ∧, puis ∨ et ⊕, puis ⇒ (à droite), puis ⇔.
     logic.tex(arbre), logic.vars(arbre), logic.evaluate(arbre, { P: true, … }),
     logic.table(['P => Q', '!Q => !P']) → { vars, cols: [{ tex, node, fin }], rows: [{ env, vals }], finals, same,
       diff } (lignes dans l'ordre du cours : V V, V F, F V, F F) ; logic.equivalent(a, b) → bool.
   NÉGATION D'UNE PHRASE QUANTIFIÉE (TeX, ou ∀ ∃ ∈ ⇒ ∧ ∨ ¬ ≤ ≥ ≠ ℝ, ou forall exists in => et ou non <= >= !=)
     quant.parse('\forall x \in \R, \exists y \in \R, x + y > 0') → arbre { t: 'q' (q: 'A' | 'E', b : liaison) | 'not' |
       'and' | 'or' | 'imp' | 'iff' | 'atom' (s) } ; quant.tex(arbre) ; quant.negate(src) → { steps: [{ tex, rule,
       node }], result } : une règle par étape (¬∀ → ∃¬, ¬∃ → ∀¬, De Morgan, ¬(P ⇒ Q) ≡ P ∧ ¬Q, ¬(P ⇔ Q), ¬¬,
       relation niée : = ↔ ≠, < ↔ ≥, > ↔ ≤, ∈ ↔ ∉ ; double inégalité éclatée en deux).
   ENSEMBLES (diagramme de Venn à n = 2 ou 3 ensembles ; zone z = bits d'appartenance, bit i : dans le i-ème ensemble)
     sets.parse('\overline{A \cup B}', ['A','B'], 'E') → arbre ; sets.zones(arbre, n) → masque des zones (entier) ;
       opérations : ∪ \cup | + union · ∩ \cap & inter · \ \setminus - · complémentaire \overline{X}, X^c, X', !X, ¬X ;
       ∩ est prioritaire sur ∪ et \. sets.name(masque, noms, univers) → la plus courte écriture (TeX) de ces zones ;
       sets.zoneCounts({ A: 10, B: 8, AB: 3, E: 30 }, noms) → effectifs des zones (crible inversé) ou { error }.
   APPLICATIONS (diagramme sagittal)
     fn.props({ E, F, f }) → { app, inj, surj, bij, noImg, multi, collide: [x, y, image], noPre: [...] } ;
     fn.image(f, A) ; fn.preimage(E, f, B).
   ARBRE PONDÉRÉ (probabilités totales, Bayes)
     tree.compute({ first: [{ n, p }], second: { n, nb, p: [...] } }) → { first, cond, joint, total, bayes, error }.
   LOI D'UNE VARIABLE ALÉATOIRE FINIE
     law.make({ x: [...], p: [...] } | { law: 'binom', n, p } | { law: 'bern', p } | { law: 'unif', a, b }) →
       { x: [BigInt…], p: [fractions], sum, E, E2, V, sd, error } (V par Koenig-Huygens : E(X²) − E(X)²).

   OUTILS : REV.maths.tools.<nom>(el, opts), ou <div data-maths="<nom>" data-opts='…'> dans la page
   (rien ne s'anime tout seul ; les pas à pas ont Précédent / Suivant / Tout afficher / Recommencer)
     truth(el, { f: 'P => Q' | [...], sub: true, edit: true, quiz: false, presets: [...], title })
                      table de vérité qui se remplit d'après la formule tapée ; colonnes intermédiaires ; plusieurs
                      formules : verdict d'équivalence ; quiz : l'élève remplit la dernière colonne, puis Vérifier.
     negate(el, { src, edit: true, presets: [...], title })
                      négation d'une phrase quantifiée, une règle par étape, la partie qui change surlignée.
     venn(el, { n: 2 | 3, names, u: 'E', expr, edit, sizes: { A, B, AB, …, E }, compare: [expr1, expr2], title })
                      zones cliquables, expression tapée → zones coloriées, cardinaux et formule du crible.
     sagittal(el, { E: [...], F: [...], f: { a: '1', … }, names: ['E', 'F', 'f'], mode: 'props' | 'image' |
                      'preimage' | 'edit', A: [...], B: [...], title })
                      diagramme sagittal : application, injection, surjection, image directe et réciproque.
     tree(el, { first: [{ n: 'A', p: '1/3' }, { n: '\overline{A}' }], second: { n: 'B', nb: '\overline{B}',
                      p: ['1/2', '1/5'] }, edit: true, title })
                      arbre pondéré en fractions : chemin cliqué, probabilités totales, formule de Bayes.
     law(el, { x, p } | { law, n, p, a, b }, { name: 'X', edit: true, title })
                      diagramme en bâtons, espérance, variance, écart type (exacts, puis valeur approchée).
     pascal(el, { n: 6, pick: [5, 2], row: 4, mode: 'pascal' | 'sym' | 'row', modes: ['pascal', 'sym', 'row'],
                      build: false, edit: true, title })
                      triangle de Pascal en tableau n \ k (comme le cours) ; un clic sur un nombre :
                      'pascal' : ses deux « parents » (au-dessus à gauche, au-dessus) colorés et la relation
                      C(n, k) = C(n−1, k−1) + C(n−1, k) en nombres ; 'sym' : son symétrique C(n, n−k) ;
                      'row' : la ligne (row : celle choisie au départ), sa somme 2^n et le développement de
                      (x + y)^n. build : les lignes se
                      construisent une par une (Précédent / Suivant), avec le calcul de chaque case.
                      edit : champ « dernière ligne » (0 à 12). Les cases au-dessus de la diagonale sont hachurées.
     choose(el, { situations: [{ t, leaf, n, p, why }], examples: { arr: [{ t, n, p }], … }, title })
                      arbre « quelle formule ? » (diapositive « How to choose the formula ») : l'ordre compte ?
                      répétition ? tous les éléments ? → n^p (leaf 'list'), n! ('perm'), A_n^p ('arr'), C(n, p)
                      ('comb'), et C(n+p−1, p) ('multi', hors du cours : listes croissantes du TD 1 ex. 4.20).
                      Un clic sur une réponse suit la branche ; la feuille atteinte donne la formule, les modèles
                      de tirage et des exemples calculés exactement. situations : exercice (« Situation 2 / 5 ») ;
                      t et why en HTML (formules \( … \)) ; la réponse est jugée et le nombre calculé.
   DÉNOMBREMENT (REV.maths, BigInt)
     arr(n, p) → A_n^p (0 si p > n) ; count(leaf, n, p) → le nombre d'une feuille de l'arbre ; countTex(leaf, n, p) →
       « A_{10}^{3} = 10 \times 9 \times 8 = 720 » (milliers séparés : \, en français, {,} en anglais) ; intTex(x).
     pascal.rows(n) → lignes 0 à n (tableaux de BigInt) ; pascal.relation(n, k) → { value, edge, left, right }.
     choose.tree, choose.at(chemin) → nœud ou feuille ('1' = oui, '0' = non : '100' = ordre, sans répétition,
       pas tous → A) ; choose.path(leaf) → chemin de cette feuille.
     curve(el, { f: 'sin', fs: ['sq', 'abs', 'abs1', 'sqrt', 'inv', 'exp', 'ln', 'sin', 'cos'], dom: '[-pi, pi]',
                      mode: 'image' | 'preimage', modes: ['image', 'preimage'], A: '[0, pi/2]', B: '[0, 1]', name: 'h',
                      presets: [{ label, tex, f, dom, mode, A, B, name }], edit: true, title })
                      courbe d'une fonction usuelle (x², |x|, |x − 1|, √x, 1/x, eˣ, ln, sin, cos) sur son ensemble de
                      départ dom ; mode 'image' : l'élève règle A (menus des bornes, crochets ouvert / fermé), A est
                      coloré sur l'axe des abscisses, f(A) sur l'axe des ordonnées ; mode 'preimage' : B est coloré
                      sur l'axe des ordonnées (bande), f⁻¹(B) sur l'axe des abscisses. Bornes exactes en KaTeX (π/6,
                      √2/2, e^π, ln 2, ±∞), justifiées morceau par morceau de stricte monotonie (tableau de
                      variations) ; sin et cos : départ borné, réciproques exactes par le tableau des valeurs
                      remarquables (arcsin, arccos des multiples de π/6 et π/4), jamais par échantillonnage.
   COURBES (REV.maths.curve, calcul exact sans flottant pour les bornes)
     num('3pi/4' | 'sqrt2/2' | 'e^2' | 'ln2' | '-inf' | '1/2') → nombre exact { k, … } ; set('[-pi, pi]' | ']0, +inf[' |
       '{0, 1}' | 'R' | 'R+' | 'R*' | 'empty', unions avec U) → ensemble (liste d'intervalles { a, b, ac, bc }) ;
       image(f, dom, A) → { set, steps, AE, inside } ou { error } ; preimage(f, dom, B) → { set, steps } ou { error } ;
       tex(nombre), setTex(ensemble), same(ens1, ens2), fns (les neuf fonctions : f exacte, mono, inv, js).

   Textes affichés : REV.t('français') ; l'anglais est déclaré ci-dessous (REV.i18n.add). */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t, EN = R.lang === 'en';
  R.i18n.add({
    'Précédent': 'Previous', 'Suivant': 'Next', 'Tout afficher': 'Show all', 'Recommencer': 'Start again',
    'étape {i} / {n}': 'step {i} / {n}', 'Outil indisponible : {m}': 'Tool unavailable: {m}',
    'V': 'T', 'F': 'F', 'vraie': 'true', 'fausse': 'false', 'vrai': 'true', 'faux': 'false',
    /* table de vérité */
    'Table de vérité': 'Truth table', 'Formule': 'Formula', 'Afficher': 'Show',
    'Exemples :': 'Examples:',
    'Connecteurs : ¬ ou !, ∧ ou &, ∨ ou |, ⇒ ou =>, ⇔ ou <=>. Variables : une lettre (P, Q, R…).': 'Connectives: ¬ or !, ∧ or &, ∨ or |, ⇒ or =>, ⇔ or <=>. Variables: one letter (P, Q, R…).',
    'Formule incomplète.': 'Incomplete formula.', 'Parenthèse non fermée.': 'Unclosed bracket.', 'Symbole inconnu : « {c} ».': 'Unknown symbol: “{c}”.',
    'Il manque une proposition après « {c} ».': 'A statement is missing after “{c}”.', 'Mot inconnu : « {c} ».': 'Unknown word: “{c}”.',
    'Trop de variables (au plus 5).': 'Too many variables (5 at most).',
    '{k} variables : {n} lignes, une par combinaison de valeurs.': '{k} variables: {n} rows, one for each combination of values.',
    '1 variable : 2 lignes.': '1 variable: 2 rows.',
    'Ligne {i} : {env}. {res}': 'Row {i}: {env}. {res}',
    'Clique sur une ligne pour la lire.': 'Click a row to read it.',
    'Les colonnes {a} et {b} sont identiques à chaque ligne : les deux propositions sont équivalentes.': 'The columns {a} and {b} are identical on every row: the two statements are equivalent.',
    'Les colonnes {a} et {b} diffèrent à la ligne {i} : les deux propositions ne sont pas équivalentes.': 'The columns {a} and {b} differ on row {i}: the two statements are not equivalent.',
    'Vraie à toutes les lignes : c’est une tautologie.': 'True on every row: it is a tautology.',
    'Fausse à toutes les lignes : c’est une contradiction.': 'False on every row: it is a contradiction.',
    'Remplis la dernière colonne (clique : V, F), puis vérifie.': 'Fill in the last column (click: T, F), then check.',
    'Vérifier': 'Check', 'Solution': 'Solution', '{ok} / {n} cases justes.': '{ok} / {n} cells right.',
    'Tout est juste.': 'All correct.', 'Il reste des cases vides.': 'Some cells are still empty.',
    'case vide': 'empty cell',
    /* négation */
    'Négation pas à pas': 'Negation step by step', 'Phrase': 'Statement',
    'On écrit la négation de toute la phrase.': 'Write the negation of the whole statement.',
    '\\(\\neg\\forall\\) devient \\(\\exists\\) : la négation passe derrière le quantificateur, le domaine ne change pas.': '\\(\\neg\\forall\\) becomes \\(\\exists\\): the negation moves past the quantifier, the domain does not change.',
    '\\(\\neg\\exists\\) devient \\(\\forall\\) : la négation passe derrière le quantificateur, le domaine ne change pas.': '\\(\\neg\\exists\\) becomes \\(\\forall\\): the negation moves past the quantifier, the domain does not change.',
    'Loi de De Morgan : \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\).': 'De Morgan’s law: \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\).',
    'Loi de De Morgan : \\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\).': 'De Morgan’s law: \\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\).',
    'Négation d’une implication : \\(\\neg(P \\Rightarrow Q) \\equiv P \\land \\neg Q\\).': 'Negation of an implication: \\(\\neg(P \\Rightarrow Q) \\equiv P \\land \\neg Q\\).',
    'Négation d’une équivalence : \\(\\neg(P \\Leftrightarrow Q) \\equiv (P \\land \\neg Q) \\lor (\\neg P \\land Q)\\).': 'Negation of an equivalence: \\(\\neg(P \\Leftrightarrow Q) \\equiv (P \\land \\neg Q) \\lor (\\neg P \\land Q)\\).',
    'Double négation : \\(\\neg\\neg P \\equiv P\\).': 'Double negation: \\(\\neg\\neg P \\equiv P\\).',
    'Négation d’une relation : \\({a}\\) devient \\({b}\\).': 'Negation of a relation: \\({a}\\) becomes \\({b}\\).',
    'Une double inégalité, ce sont deux inégalités reliées par « et ».': 'A double inequality is two inequalities joined by “and”.',
    'Négation :': 'Negation:', 'Appuie sur « Suivant » pour la première règle.': 'Press “Next” for the first rule.',
    'Écris une phrase avec \\forall, \\exists, \\in, \\Rightarrow, \\land, \\lor, \\neg (ou ∀ ∃ ∈ ⇒ ∧ ∨ ¬, ou forall, exists, in, =>, et, ou, non).': 'Write a statement with \\forall, \\exists, \\in, \\Rightarrow, \\land, \\lor, \\neg (or ∀ ∃ ∈ ⇒ ∧ ∨ ¬, or forall, exists, in, =>, and, or, not).',
    'Phrase illisible : {m}': 'Cannot read the statement: {m}', 'quantificateur sans virgule': 'quantifier without a comma', 'phrase vide': 'empty statement',
    /* Venn */
    'Diagramme de Venn': 'Venn diagram', 'Ensemble': 'Set', 'Colorier': 'Shade', 'Effacer': 'Clear',
    'Clique sur les zones pour les colorier, ou tape une expression.': 'Click the regions to shade them, or type an expression.',
    'Opérations : ∪ ou |, ∩ ou &, \\ ou -, complémentaire : A\' ou !A ou \\overline{A}.': 'Operations: ∪ or |, ∩ or &, \\ or -, complement: A\' or !A or \\overline{A}.',
    'Zones coloriées : {e}': 'Shaded regions: {e}', 'Aucune zone coloriée.': 'No region shaded.',
    'zone {z}': 'region {z}', 'Cardinal : {c}': 'Cardinality: {c}', 'Formule du crible : ': 'Inclusion–exclusion formula: ',
    'Mêmes zones : les deux ensembles sont égaux.': 'Same regions: the two sets are equal.',
    'Zones différentes : les deux ensembles ne sont pas égaux.': 'Different regions: the two sets are not equal.',
    'Effectifs incohérents : une zone aurait un effectif négatif.': 'Inconsistent sizes: a region would have a negative size.',
    'Expression illisible.': 'Cannot read the expression.',
    /* sagittal */
    'Diagramme sagittal': 'Arrow diagram', 'Propriétés': 'Properties', 'Image directe': 'Direct image', 'Image réciproque': 'Reverse image', 'Modifier les flèches': 'Edit the arrows',
    '{f} est une application : chaque élément de {E} a exactement une image.': '{f} is a map: each element of {E} has exactly one image.',
    '{f} n’est pas une application : {x} n’a pas d’image.': '{f} is not a map: {x} has no image.',
    '{f} n’est pas une application : {x} a plusieurs images.': '{f} is not a map: {x} has several images.',
    'Injective : deux éléments distincts ont toujours des images distinctes.': 'Injective: two distinct elements always have distinct images.',
    'Pas injective : {x} ≠ {y} mais {fx} = {fy} = {z}.': 'Not injective: {x} ≠ {y} but {fx} = {fy} = {z}.',
    'Surjective : chaque élément de {F} a au moins un antécédent.': 'Surjective: every element of {F} has at least one preimage.',
    'Pas surjective : {y} n’a pas d’antécédent.': 'Not surjective: {y} has no preimage.',
    'Pas surjective : {y} n’ont pas d’antécédent.': 'Not surjective: {y} have no preimage.',
    'Bijective : injective et surjective.': 'Bijective: injective and surjective.',
    'Clique sur des éléments de {E} : leurs images s’allument dans {F}.': 'Click elements of {E}: their images light up in {F}.',
    'Clique sur des éléments de {F} : leurs antécédents s’allument dans {E}.': 'Click elements of {F}: their preimages light up in {E}.',
    'Clique sur un élément de {E}, puis sur son image dans {F} (recliquer sur la même image retire la flèche).': 'Click an element of {E}, then its image in {F} (clicking the same image again removes the arrow).',
    /* arbre */
    'Arbre pondéré': 'Probability tree', 'Probabilités totales : ': 'Law of total probability: ', 'Formule de Bayes : ': 'Bayes’ formula: ',
    'Clique sur une feuille : le chemin et son produit.': 'Click a leaf: its path and the product.',
    'Les probabilités des branches issues d’un même nœud doivent avoir pour somme 1.': 'The probabilities of the branches leaving one node must add up to 1.',
    'Probabilité illisible : « {v} ».': 'Cannot read the probability “{v}”.', 'Une probabilité est entre 0 et 1.': 'A probability is between 0 and 1.',
    'Chemin : on multiplie les probabilités le long des branches.': 'Path: multiply the probabilities along the branches.',
    /* loi */
    'Loi de {X}': 'Distribution of {X}', 'loi': 'distribution', 'binomiale': 'binomial', 'Bernoulli': 'Bernoulli', 'uniforme': 'uniform', 'donnée': 'given',
    'La somme des probabilités vaut {s}, pas 1.': 'The probabilities add up to {s}, not 1.',
    'Paramètres illisibles.': 'Cannot read the parameters.',
    'Espérance': 'Expected value', 'Variance (Koenig-Huygens)': 'Variance (König–Huygens)', 'Écart type': 'Standard deviation',
    'trait plein : espérance ; pointillés : espérance ± écart type.': 'solid line: expected value; dashed: expected value ± standard deviation.',
    /* triangle de Pascal */
    'Triangle de Pascal': 'Pascal’s triangle', 'Pascal': 'Pascal', 'Symétrie': 'Symmetry', 'Somme d’une ligne': 'Sum of a row',
    'Dernière ligne n': 'Last row n', 'Entre 0 et 12.': 'Between 0 and 12.',
    'Clique sur un nombre du triangle.': 'Click a number in the triangle.',
    'Clique sur un nombre : ses deux voisins du dessus s’allument.': 'Click a number: its two neighbours above light up.',
    'Clique sur un nombre : son symétrique dans la ligne s’allume.': 'Click a number: its mirror image in the row lights up.',
    'Clique sur une ligne : sa somme et le développement du binôme.': 'Click a row: its sum and the binomial expansion.',
    'Relation de Pascal : le nombre est la somme du nombre au-dessus à gauche et du nombre au-dessus.': 'Pascal’s formula: the number is the sum of the number above on the left and the number above.',
    'Bord du triangle : \\(\\binom{n}{0} = \\binom{n}{n} = 1\\).': 'Edge of the triangle: \\(\\binom{n}{0} = \\binom{n}{n} = 1\\).',
    'Symétrie : choisir les {k} éléments qu’on prend revient à choisir les {m} qu’on laisse.': 'Symmetry: choosing the {k} elements you take is the same as choosing the {m} you leave.',
    'Ligne {n} : la somme vaut \\(2^{{n}}\\), le nombre de parties d’un ensemble à {n} éléments.': 'Row {n}: the sum is \\(2^{{n}}\\), the number of subsets of a set with {n} elements.',
    'Ligne {n} : la somme vaut \\(2^{{n}}\\) (une seule partie : l’ensemble vide).': 'Row {n}: the sum is \\(2^{{n}}\\) (a single subset: the empty set).',
    'Les coefficients de la ligne sont ceux de la formule du binôme :': 'The numbers of the row are the coefficients of the binomial theorem:',
    'Ligne {n} : les bords valent 1, chaque autre case est la somme des deux cases au-dessus d’elle.': 'Row {n}: the edges are 1, every other cell is the sum of the two cells above it.',
    'Ligne 0 : \\(\\binom{0}{0} = 1\\) (une seule partie de l’ensemble vide : lui-même).': 'Row 0: \\(\\binom{0}{0} = 1\\) (the empty set has a single subset: itself).',
    'au-dessus à gauche': 'above on the left', 'au-dessus': 'above', 'le nombre choisi': 'the chosen number',
    /* arbre « quelle formule ? » */
    'Quelle formule ?': 'Which formula?', 'oui': 'yes', 'non': 'no',
    'L’ordre compte ?': 'Does order matter?', 'Répétition possible ?': 'Is repetition allowed?', 'Tous les éléments ?': 'Are we choosing all the elements?',
    'Échange deux éléments : obtiens-tu un autre résultat ? Podium, code, mot : oui. Main de cartes, comité : non.': 'Swap two elements: do you get a different result? Podium, code, word: yes. Hand of cards, committee: no.',
    'Un élément peut-il revenir ? Tirage avec remise, chiffres d’un code : oui. Personnes distinctes, sans remise : non.': 'Can an element come back? Picking with replacement, digits of a code: yes. Distinct people, without replacement: no.',
    'Range-t-on les n éléments, sans en laisser (p = n) ?': 'Do we order all n elements, leaving none out (p = n)?',
    'p-listes (p-uplets)': 'p-tuples (p-lists)', 'permutations': 'permutations', 'arrangements': 'arrangements', 'combinaisons': 'combinations',
    'combinaisons avec répétition (hors du cours)': 'combinations with repetition (not in the lecture)',
    'applications de E dans F ; tirages successifs avec remise ; mots, codes, mots de passe.': 'functions from E to F; successive picks with replacement; words, codes, passwords.',
    'bijections de F dans F ; ranger n objets ; anagrammes d’un mot aux lettres distinctes.': 'bijections from F to F; ordering n objects; anagrams of a word with distinct letters.',
    'applications injectives ; tirages successifs sans remise ; podiums, postes distincts.': 'injective functions; successive picks without replacement; podiums, distinct positions.',
    'parties à p éléments ; tirages simultanés ; mains de cartes, comités, groupes.': 'subsets with p elements; simultaneous picks; hands of cards, committees, groups.',
    'listes croissantes (TD 1, exercice 4.20) ; pas au programme de l’examen.': 'increasing lists (exercise sheet 1, exercise 4.20); not in the exam syllabus.',
    'Modèles : ': 'Models: ', 'Exemples': 'Examples', 'Réponds aux questions de l’arbre, en partant du haut.': 'Answer the questions of the tree, starting from the top.',
    'Codes à 4 chiffres': '4-digit codes', 'Applications d’un ensemble à 3 éléments dans un ensemble à 4 éléments': 'Functions from a 3-element set to a 4-element set',
    'Mots réponses d’un QCM de 5 questions à 6 lettres (TD 1 ex. 2.11)': '“Answering words” of a 5-question MCQ with 6 letters (exercise 2.11)',
    '6 élèves sur 6 chaises': '6 students on 6 chairs', 'Anagrammes de « computer »': 'Anagrams of “computer”',
    'Podiums d’une course de 10 coureurs': 'Podiums of a 10-runner race', 'Codes à 4 chiffres distincts': '4-digit codes with distinct digits',
    'Un président et un trésorier parmi 100 adhérents': 'A president and a treasurer out of 100 members',
    'Mains de 5 cartes dans un jeu de 32': '5-card hands from a 32-card deck', 'Comités de 3 élèves parmi 20': '3-student committees out of 20',
    'Listes croissantes de longueur 2 dans \\(\\ent{0}{4}\\)': 'Increasing lists of length 2 in \\(\\ent{0}{4}\\)',
    'Situation {i} / {n}': 'Situation {i} / {n}', 'Situation suivante': 'Next situation', 'Changer de réponse': 'Change the answer',
    'Bonne formule.': 'Right formula.', 'Ce n’est pas cette formule.': 'Not this formula.', 'La bonne : ': 'The right one: ',
    'Toutes les situations sont faites : {ok} / {n} du premier coup.': 'All situations done: {ok} / {n} at the first attempt.',
    /* courbe */
    'Courbe et images d’intervalles': 'Curve and images of intervals', 'Fonction': 'Function', 'Ensemble de départ': 'Input set',
    'Fonction inconnue.': 'Unknown function.', 'Choisis un ensemble de départ borné pour sin et cos.': 'Choose a bounded input set for sin and cos.',
    'Valeur non exacte pour cette fonction : choisis une autre borne.': 'No exact value for this function: choose another end point.',
    'Borne gauche de {S}': 'Left end of {S}', 'Borne droite de {S}': 'Right end of {S}',
    'Borne gauche fermée (cliquer pour l’ouvrir)': 'Closed left end (click to open it)', 'Borne gauche ouverte (cliquer pour la fermer)': 'Open left end (click to close it)',
    'Borne droite fermée (cliquer pour l’ouvrir)': 'Closed right end (click to open it)', 'Borne droite ouverte (cliquer pour la fermer)': 'Open right end (click to close it)',
    'Borne gauche plus grande que la borne droite.': 'The left end is greater than the right end.',
    'Courbe de {f} sur {E}': 'Graph of {f} on {E}', '{S}, sur l’axe des abscisses': '{S}, on the x-axis', '{S}, sur l’axe des ordonnées': '{S}, on the y-axis',
    '{A} n’est pas une partie de l’ensemble de départ : {fA} n’est pas défini. Voici l’image de la partie de A qui est dans l’ensemble de départ.': '{A} is not a subset of the input set: {fA} is not defined. Here is the image of the part of A that lies in the input set.',
    'On calcule l’image de chaque point.': 'Compute the image of each point.',
    'Sur {P}, {f} est strictement croissante :': 'On {P}, {f} is strictly increasing:', 'Sur {P}, {f} est strictement décroissante :': 'On {P}, {f} is strictly decreasing:',
    'Sur {P}, {f} est strictement croissante et prend les valeurs de {J} :': 'On {P}, {f} is strictly increasing and takes the values of {J}:',
    'Sur {P}, {f} est strictement décroissante et prend les valeurs de {J} :': 'On {P}, {f} is strictly decreasing and takes the values of {J}:',
    'aucune valeur de {B} n’y est prise.': 'it takes no value of {B} there.'
  });

  var esc = U.esc, MINUS = '−';
  function M() { return R.math || window.MathRender || null; }
  /* une formule TeX en HTML (KaTeX) ; sans KaTeX : le source */
  function tx(src, disp) { var m = M(); return m && m.tex ? m.tex(src, { display: !!disp }) : '<span class="katex-src">' + esc(src) + '</span>'; }
  /* un texte qui contient des \( … \) : les formules sont rendues ici (pas d'attente du MutationObserver) */
  function mathify(html) { return String(html).replace(/\\\((.+?)\\\)/g, function (m, s) { return tx(s); }); }
  function sepDec() { return EN ? '.' : ','; }

  /* ================================================================== 1. FRACTIONS EXACTES */
  var Z = BigInt(0), ONE = BigInt(1), TEN = BigInt(10);
  function big(x) { return typeof x === 'bigint' ? x : BigInt(x); }
  function babs(a) { return a < Z ? -a : a; }
  function gcd(a, b) { a = babs(a); b = babs(b); while (b !== Z) { var t = a % b; a = b; b = t; } return a; }
  function F(n, d) {
    n = big(n); d = d == null ? ONE : big(d);
    if (d === Z) throw new Error('division par 0');
    if (d < Z) { n = -n; d = -d; }
    var g = gcd(n, d); if (g > ONE) { n /= g; d /= g; }
    return { n: n, d: d };
  }
  function isF(x) { return x && typeof x === 'object' && typeof x.n === 'bigint' && typeof x.d === 'bigint'; }
  /* '3/8', '-3/8', '0,25', '0.25', '2', 5, 5n, fraction → fraction ; sinon null */
  function frac(x) {
    if (isF(x)) return F(x.n, x.d);
    if (typeof x === 'bigint') return F(x);
    if (typeof x === 'number') { if (!isFinite(x)) return null; x = String(x); }
    if (typeof x !== 'string') return null;
    var s = x.replace(/[\s\u00a0\u202f]/g, '').replace(/[−–]/g, '-').replace(/^\\frac\{(-?\d+)\}\{(-?\d+)\}$/, '$1/$2');
    var m = /^(-?)(\d+)\/(\d+)$/.exec(s);
    if (m) { if (/^0+$/.test(m[3])) return null; return F((m[1] ? -1n : 1n) * BigInt(m[2]), BigInt(m[3])); }
    m = /^(-?)(\d*)(?:[.,](\d+))?$/.exec(s);
    if (!m || (!m[2] && !m[3])) return null;
    var den = m[3] ? TEN ** BigInt(m[3].length) : ONE;
    var num = BigInt((m[2] || '0') + (m[3] || ''));
    return F(m[1] ? -num : num, den);
  }
  var fr = {
    add: function (a, b) { return F(a.n * b.d + b.n * a.d, a.d * b.d); },
    sub: function (a, b) { return F(a.n * b.d - b.n * a.d, a.d * b.d); },
    mul: function (a, b) { return F(a.n * b.n, a.d * b.d); },
    div: function (a, b) { return F(a.n * b.d, a.d * b.n); },
    neg: function (a) { return F(-a.n, a.d); },
    cmp: function (a, b) { var x = a.n * b.d, y = b.n * a.d; return x < y ? -1 : x > y ? 1 : 0; },
    eq: function (a, b) { return a.n === b.n && a.d === b.d; },
    isZero: function (a) { return a.n === Z; },
    pow: function (a, k) { var r = F(1); for (var i = 0; i < k; i++) r = fr.mul(r, a); return r; },
    sum: function (l) { return l.reduce(function (s, x) { return fr.add(s, x); }, F(0)); },
    str: function (a) { var s = (a.n < Z ? MINUS : '') + babs(a.n).toString(); return a.d === ONE ? s : s + '/' + a.d.toString(); },
    tex: function (a) { var s = babs(a.n).toString(); return (a.n < Z ? '-' : '') + (a.d === ONE ? s : '\\frac{' + s + '}{' + a.d.toString() + '}'); },
    /* valeur décimale à k chiffres après la virgule, arrondie au plus proche (exact, sans flottant) */
    dec: function (a, k) {
      k = k == null ? 4 : k;
      var p = TEN ** BigInt(k), neg = a.n < Z, n = babs(a.n) * p * 2n + a.d, q = n / (2n * a.d);
      var s = q.toString(); while (s.length <= k) s = '0' + s;
      var ip = s.slice(0, s.length - k), fp = k ? s.slice(-k).replace(/0+$/, '') : '';
      return (neg && q !== Z ? MINUS : '') + ip + (fp ? sepDec() + fp : '');
    },
    /* racine carrée d'une fraction positive : exacte si possible, sinon k√m / d simplifiée */
    sqrt: function (a, k) {
      if (a.n < Z) return null;
      if (a.n === Z) return { exact: F(0), tex: '0', approx: '0' };
      var nd = a.n * a.d, out = ONE, m = nd, f = 2n;
      while (f * f <= m && f <= 10000n) { while (m % (f * f) === Z) { m /= f * f; out *= f; } f++; }
      var c = F(out, a.d);  /* √(n/d) = √(n d) / d = c × √m */
      var exact = m === ONE ? c : null, t;
      if (exact) t = fr.tex(exact);
      else {
        var rad = '\\sqrt{' + m.toString() + '}';
        t = c.d === ONE ? (c.n === ONE ? rad : c.n.toString() + rad) : '\\frac{' + (c.n === ONE ? '' : c.n.toString()) + rad + '}{' + c.d.toString() + '}';
      }
      /* valeur approchée : isqrt(n d 10^(2k+2)) / (d 10^(k+1)) */
      k = k == null ? 4 : k;
      var sc = TEN ** BigInt(k + 1), v = isqrt(nd * sc * sc);
      return { exact: exact, tex: t, approx: fr.dec(F(v, a.d * sc), k) };
    }
  };
  function isqrt(n) { if (n < 2n) return n; var x = BigInt(Math.floor(Math.sqrt(Number(n)))); while (x * x > n) x--; while ((x + 1n) * (x + 1n) <= n) x++; return x; }
  function fact(n) { var r = ONE; for (var i = 2n; i <= big(n); i++) r *= i; return r; }
  function binom(n, k) { n = big(n); k = big(k); if (k < Z || k > n) return Z; var r = ONE; for (var i = ONE; i <= k; i++) r = r * (n - k + i) / i; return r; }

  /* ================================================================== 2. LOGIQUE DES PROPOSITIONS */
  var PREC = { iff: 1, imp: 2, or: 3, xor: 3, and: 4, not: 5, var: 6 };
  var OPTEX = { and: '\\land', or: '\\lor', xor: '\\oplus', imp: '\\Rightarrow', iff: '\\Leftrightarrow' };
  var WORDS = { non: 'not', not: 'not', et: 'and', and: 'and', ou: 'or', or: 'or', xor: 'xor', implique: 'imp', ssi: 'iff', iff: 'iff' };
  var TEXOPS = { neg: 'not', lnot: 'not', land: 'and', wedge: 'and', lor: 'or', vee: 'or', oplus: 'xor', Rightarrow: 'imp', implies: 'imp', Longrightarrow: 'imp',
    rightarrow: 'imp', Leftrightarrow: 'iff', iff: 'iff', Longleftrightarrow: 'iff', leftrightarrow: 'iff' };
  function lerr(m, v) { var e = new Error(T(m, v)); e.user = true; return e; }
  function ltokens(s) {
    var out = [], i = 0, sym = [['<=>', 'iff'], ['<->', 'iff'], ['=>', 'imp'], ['->', 'imp'], ['/\\', 'and'], ['\\/', 'or'], ['⇔', 'iff'], ['↔', 'iff'], ['⇒', 'imp'], ['→', 'imp'],
      ['∧', 'and'], ['&&', 'and'], ['&', 'and'], ['∨', 'or'], ['||', 'or'], ['|', 'or'], ['⊕', 'xor'], ['¬', 'not'], ['!', 'not'], ['~', 'not'], ['(', '('], [')', ')']];
    s = String(s).replace(/\\left|\\right/g, '');
    outer: while (i < s.length) {
      var c = s.charAt(i);
      if (/\s/.test(c) || c === '{' || c === '}') { i++; continue; }
      if (c === '\\' && /[a-zA-Z]/.test(s.charAt(i + 1))) {
        var m = /^\\([a-zA-Z]+)/.exec(s.slice(i));
        if (TEXOPS[m[1]]) { out.push({ k: TEXOPS[m[1]], s: m[0] }); i += m[0].length; continue; }
        throw lerr('Symbole inconnu : « {c} ».', { c: m[0] });
      }
      for (var j = 0; j < sym.length; j++) if (s.substr(i, sym[j][0].length) === sym[j][0]) { out.push({ k: sym[j][1], s: sym[j][0] }); i += sym[j][0].length; continue outer; }
      if (/[A-Za-zÀ-ÿ]/.test(c)) {
        var w = /^[A-Za-zÀ-ÿ]+\d*/.exec(s.slice(i))[0], lw = w.toLowerCase();
        if (WORDS[lw]) out.push({ k: WORDS[lw], s: w });
        else if (/^[A-Za-z]\d*$/.test(w)) out.push({ k: 'var', s: w });
        else throw lerr('Mot inconnu : « {c} ».', { c: w });
        i += w.length; continue;
      }
      throw lerr('Symbole inconnu : « {c} ».', { c: c });
    }
    return out;
  }
  function lparse(src) {
    var tk, p = 0;
    try { tk = ltokens(src); } catch (e) { return { error: e.message }; }
    if (!tk.length) return { error: T('Formule incomplète.') };
    function peek() { return tk[p] ? tk[p].k : null; }
    function need(prev) { if (p >= tk.length) throw lerr('Il manque une proposition après « {c} ».', { c: prev }); }
    function iff() { var a = imp(); while (peek() === 'iff') { var o = tk[p++].s; need(o); a = { t: 'iff', a: a, b: imp() }; } return a; }
    function imp() { var a = or(); if (peek() === 'imp') { var o = tk[p++].s; need(o); return { t: 'imp', a: a, b: imp() }; } return a; }
    function or() { var a = and(); while (peek() === 'or' || peek() === 'xor') { var k = peek(), o = tk[p++].s; need(o); a = { t: k, a: a, b: and() }; } return a; }
    function and() { var a = un(); while (peek() === 'and') { var o = tk[p++].s; need(o); a = { t: 'and', a: a, b: un() }; } return a; }
    function un() {
      var k = peek();
      if (k === 'not') { var o = tk[p++].s; need(o); return { t: 'not', a: un() }; }
      if (k === '(') { p++; var e = iff(); if (peek() !== ')') throw lerr('Parenthèse non fermée.'); p++; return e; }
      if (k === 'var') return { t: 'var', n: tk[p++].s.toUpperCase() };
      if (k == null) throw lerr('Formule incomplète.');
      throw lerr('Il manque une proposition après « {c} ».', { c: p ? tk[p - 1].s : '' });
    }
    try {
      var r = iff();
      if (p < tk.length) return { error: tk[p].k === ')' ? T('Parenthèse non fermée.') : T('Symbole inconnu : « {c} ».', { c: tk[p].s }) };
      return r;
    } catch (e) { return { error: e.user ? e.message : T('Formule incomplète.') }; }
  }
  function ltex(n) {
    if (n.t === 'var') return n.n;
    if (n.t === 'not') { var c = ltex(n.a); return '\\neg ' + (n.a.t === 'var' || n.a.t === 'not' ? c : '(' + c + ')'); }
    function side(x) { var s = ltex(x); return x.t === 'var' || x.t === 'not' || (x.t === n.t && (n.t === 'and' || n.t === 'or')) ? s : '(' + s + ')'; }
    return side(n.a) + ' ' + OPTEX[n.t] + ' ' + side(n.b);
  }
  function lvars(n, acc) {
    acc = acc || [];
    if (n.t === 'var') { if (acc.indexOf(n.n) < 0) acc.push(n.n); } else { lvars(n.a, acc); if (n.b) lvars(n.b, acc); }
    return acc;
  }
  function leval(n, env) {
    switch (n.t) {
      case 'var': return !!env[n.n];
      case 'not': return !leval(n.a, env);
      case 'and': return leval(n.a, env) && leval(n.b, env);
      case 'or': return leval(n.a, env) || leval(n.b, env);
      case 'xor': return leval(n.a, env) !== leval(n.b, env);
      case 'imp': return !leval(n.a, env) || leval(n.b, env);
      case 'iff': return leval(n.a, env) === leval(n.b, env);
    }
    return false;
  }
  /* table(['P => Q', …]) : variables par ordre alphabétique, première ligne « tout vrai » (ordre du cours) */
  function ltable(list) {
    list = Array.isArray(list) ? list : [list];
    var trees = [];
    for (var i = 0; i < list.length; i++) {
      var t = typeof list[i] === 'string' ? lparse(list[i]) : list[i];
      if (t.error) return { error: t.error, at: i };
      trees.push(t);
    }
    var vars = [];
    trees.forEach(function (t) { lvars(t, vars); });
    vars.sort();
    if (vars.length > 5) return { error: T('Trop de variables (au plus 5).') };
    var cols = [], keys = {};
    function collect(n, fin) {
      if (n.t === 'var') return;
      collect(n.a); if (n.b) collect(n.b);
      var k = ltex(n);
      if (keys[k] != null) { if (fin) cols[keys[k]].fin = true; return; }
      keys[k] = cols.length; cols.push({ tex: k, node: n, fin: !!fin });
    }
    trees.forEach(function (t) { if (t.t === 'var') { var k = t.n; if (keys[k] == null) { keys[k] = cols.length; cols.push({ tex: k, node: t, fin: true, isVar: true }); } } else collect(t, true); });
    /* les colonnes finales viennent en dernier, dans l'ordre des formules */
    var finals = trees.map(function (t) { return keys[ltex(t)]; });
    var order = cols.map(function (c, i) { return i; }).filter(function (i) { return finals.indexOf(i) < 0; }).concat(finals.filter(function (x, i, a) { return a.indexOf(x) === i; }));
    cols = order.map(function (i) { return cols[i]; });
    var fIdx = trees.map(function (t) { var k = ltex(t); for (var j = 0; j < cols.length; j++) if (cols[j].tex === k) return j; return -1; });
    var rows = [], nv = vars.length;
    for (var r = 0; r < (1 << nv); r++) {
      var env = {};
      vars.forEach(function (v, j) { env[v] = !((r >> (nv - 1 - j)) & 1); });
      rows.push({ env: env, vals: cols.map(function (c) { return leval(c.node, env); }) });
    }
    var same = null, diff = [];
    if (fIdx.length >= 2) {
      rows.forEach(function (row, i) { if (row.vals[fIdx[0]] !== row.vals[fIdx[1]]) diff.push(i); });
      same = !diff.length;
    }
    return { vars: vars, cols: cols, rows: rows, finals: fIdx, same: same, diff: diff, trees: trees };
  }
  function lequiv(a, b) { var t = ltable([a, b]); return !t.error && t.same; }

  /* ================================================================== 3. PHRASES QUANTIFIÉES (TeX) */
  /* écriture libre → TeX : symboles Unicode et mots usuels */
  function normQ(s) {
    s = String(s).replace(/[\u00a0\u202f]/g, ' ').replace(/\\text\{\s*(?:et|and)\s*\}/g, ' \\land ').replace(/\\text\{\s*(?:ou|or)\s*\}/g, ' \\lor ');
    var kept = [];   /* les \text{…} ne sont pas traduits */
    s = s.replace(/\\(?:text|mathrm|operatorname)\{[^{}]*\}/g, function (m) { kept.push(m); return '\u0001' + (kept.length - 1) + '\u0002'; });
    var rep = [[/∀/g, '\\forall '], [/∃/g, '\\exists '], [/∉/g, '\\notin '], [/∈/g, '\\in '], [/⇔|<=>/g, '\\Leftrightarrow '], [/⇒|=>/g, '\\Rightarrow '],
      [/∧/g, '\\land '], [/∨/g, '\\lor '], [/¬/g, '\\neg '], [/≤|<=/g, '\\leq '], [/≥|>=/g, '\\geq '], [/≠|!=/g, '\\neq '],
      [/ℝ/g, '\\R '], [/ℕ/g, '\\N '], [/ℤ/g, '\\Z '], [/ℚ/g, '\\Q '], [/ℂ/g, '\\C '], [/−/g, '-'],
      [/(^|[^\\a-zA-Z])(?:pour tout|for all|forall)(?![a-zA-Z])/gi, '$1\\forall '], [/(^|[^\\a-zA-Z])(?:il existe|there exists|exists)(?![a-zA-Z])/gi, '$1\\exists '],
      [/(^|[^\\a-zA-Z])in(?![a-zA-Z])/g, '$1\\in '], [/(^|[^\\a-zA-Z])(?:et|and)(?![a-zA-Z])/g, '$1\\land '], [/(^|[^\\a-zA-Z])(?:ou|or)(?![a-zA-Z])/g, '$1\\lor '],
      [/(^|[^\\a-zA-Z])(?:non|not)(?![a-zA-Z])/g, '$1\\neg ']];
    rep.forEach(function (r) { s = s.replace(r[0], r[1]); });
    s = s.replace(/\\in\s*([RNZQC])([*+])?(?![a-zA-Z{])/g, function (m, l, e) { return '\\in \\' + l + (e ? '^' + e : '') + ' '; });   /* x in R → x \in \R */
    s = s.replace(/\u0001(\d+)\u0002/g, function (m, i) { return kept[+i]; });
    return s.replace(/\s+/g, ' ').trim();
  }
  var QOPS = [['\\Leftrightarrow', 'iff'], ['\\Longleftrightarrow', 'iff'], ['\\iff', 'iff'], ['\\Rightarrow', 'imp'], ['\\Longrightarrow', 'imp'], ['\\implies', 'imp'],
    ['\\land', 'and'], ['\\wedge', 'and'], ['\\lor', 'or'], ['\\vee', 'or'], ['\\text{ et }', 'and'], ['\\text{ ou }', 'or'], ['\\text{ and }', 'and'], ['\\text{ or }', 'or']];
  function cmdAt(s, i) { var m = /^\\[a-zA-Z]+/.exec(s.slice(i)); return m ? m[0] : null; }
  /* repères de premier niveau : opérateurs (hors parenthèses et accolades), arrêt sur un quantificateur */
  function scanTop(s) {
    var ops = [], d = 0, i = 0;
    while (i < s.length) {
      var c = s.charAt(i);
      if (c === '\\') {
        var cm = cmdAt(s, i);
        if (!cm) { i += 2; continue; }
        if (cm === '\\left') { d++; i += 6; continue; }
        if (cm === '\\right') { d--; i += 7; continue; }
        if (cm === '\\llbracket') { d++; i += cm.length; continue; }
        if (cm === '\\rrbracket') { d--; i += cm.length; continue; }
        if (d === 0 && (cm === '\\forall' || cm === '\\exists')) break;
        if (d === 0) {
          var hit = null;
          for (var j = 0; j < QOPS.length; j++) {
            var op = QOPS[j][0];
            if (s.substr(i, op.length) === op && (op.charAt(op.length - 1) === '}' || !/[a-zA-Z]/.test(s.charAt(i + op.length)))) { hit = QOPS[j]; break; }
          }
          if (hit) { ops.push({ i: i, len: hit[0].length, k: hit[1] }); i += hit[0].length; continue; }
        }
        i += cm.length; continue;
      }
      if (c === '{' || c === '(') d++;
      else if (c === '}' || c === ')') d--;
      i++;
    }
    return ops;
  }
  function wrapped(s) {
    var open = s.charAt(0) === '(' ? 1 : s.indexOf('\\left(') === 0 ? 6 : 0;
    if (!open) return null;
    var d = 0, i = 0;
    while (i < s.length) {
      if (s.substr(i, 6) === '\\left(') { d++; i += 6; continue; }
      if (s.substr(i, 7) === '\\right)') { d--; i += 7; if (d === 0) return i === s.length ? s.slice(open, s.length - 7) : null; continue; }
      var c = s.charAt(i);
      if (c === '\\') { i += 2; continue; }
      if (c === '(' || c === '{') d++;
      else if (c === ')' || c === '}') { d--; if (d === 0) return i === s.length - 1 && c === ')' ? s.slice(open, i) : null; }
      i++;
    }
    return null;
  }
  function qerr(m) { var e = new Error(m); e.user = true; return e; }
  function qparse(src) {
    function P(s) {
      s = s.trim();
      if (!s) throw qerr(T('phrase vide'));
      var qm = /^\\(forall|exists)(?![a-zA-Z])/.exec(s);
      if (qm) {
        var rest = s.slice(qm[0].length), d = 0, inter = false, i = 0, cut = -1;
        while (i < rest.length) {
          var c = rest.charAt(i);
          if (c === '\\') { var cm = cmdAt(rest, i) || '\\'; if (cm === '\\left' || cm === '\\llbracket') d++; if (cm === '\\right' || cm === '\\rrbracket') d--; i += Math.max(cm.length, 2); continue; }
          if (c === '{' || c === '(') d++; else if (c === '}' || c === ')') d--;
          else if ((c === '[' || c === ']') && d === 0) inter = !inter;   /* intervalle ]a, b[ : sa virgule ne coupe pas */
          else if (c === ',' && d === 0 && !inter) { cut = i; break; }
          i++;
        }
        if (cut < 0) throw qerr(T('quantificateur sans virgule'));
        return { t: 'q', q: qm[1] === 'forall' ? 'A' : 'E', b: rest.slice(0, cut).trim(), a: P(rest.slice(cut + 1)) };
      }
      var ops = scanTop(s);
      var order = ['iff', 'imp', 'or', 'and'];
      for (var k = 0; k < order.length; k++) {
        var list = ops.filter(function (o) { return o.k === order[k]; });
        if (!list.length) continue;
        var o = order[k] === 'imp' ? list[0] : list[list.length - 1];   /* ⇒ à droite, les autres à gauche */
        return { t: order[k], a: P(s.slice(0, o.i)), b: P(s.slice(o.i + o.len)) };
      }
      var nm = /^\\(neg|lnot)(?![a-zA-Z])/.exec(s);
      if (nm) return { t: 'not', a: P(s.slice(nm[0].length)) };
      var w = wrapped(s);
      if (w != null) return P(w);
      return { t: 'atom', s: s };
    }
    try { return P(normQ(src)); } catch (e) { return { error: e.user ? e.message : String(e.message || e) }; }
  }
  var QSYM = { and: '\\land', or: '\\lor', imp: '\\Rightarrow', iff: '\\Leftrightarrow' };
  function qtex(n, hl) {
    var s;
    function inner(x, parent) {
      var t = qtex(x, hl);
      var need = x.t === 'q' || (x.t !== 'atom' && x.t !== 'not' && !(x.t === parent && (parent === 'and' || parent === 'or')));
      return need ? '\\left(' + t + '\\right)' : t;
    }
    switch (n.t) {
      case 'atom': s = n.s; break;
      case 'q': s = (n.q === 'A' ? '\\forall ' : '\\exists ') + n.b + ',\\ ' + qtex(n.a, hl); break;
      case 'not': s = '\\neg ' + (n.a.t === 'atom' && !REL_RE.test(n.a.s) && !/\s/.test(n.a.s.trim()) ? n.a.s : n.a.t === 'not' ? qtex(n.a, hl) : '\\left(' + qtex(n.a, hl) + '\\right)'); break;
      default: s = inner(n.a, n.t) + ' ' + QSYM[n.t] + ' ' + inner(n.b, n.t);
    }
    return hl && hl.indexOf(n) >= 0 ? '\\hl{' + s + '}' : s;
  }
  /* relations d'un atome (premier niveau) */
  var RELS = ['\\leqslant', '\\geqslant', '\\notin', '\\subseteq', '\\subset', '\\neq', '\\leq', '\\geq', '\\le', '\\ge', '\\ne', '\\in', '=', '<', '>'];
  var REL_RE = /\\(?:leqslant|geqslant|notin|subseteq|subset|neq|leq|geq|le|ge|ne|in)(?![a-zA-Z])|[=<>]/;
  var NEG = { '=': '\\neq', '\\neq': '=', '\\ne': '=', '<': '\\geq', '>': '\\leq', '\\leq': '>', '\\le': '>', '\\leqslant': '>', '\\geq': '<', '\\ge': '<', '\\geqslant': '<',
    '\\in': '\\notin', '\\notin': '\\in', '\\subset': '\\not\\subset', '\\subseteq': '\\not\\subseteq' };
  var FLIP = { '<': '>', '>': '<', '\\leq': '\\geq', '\\geq': '\\leq', '\\le': '\\ge', '\\ge': '\\le', '=': '=', '\\neq': '\\neq' };
  function rels(s) {
    var out = [], d = 0, i = 0;
    while (i < s.length) {
      var c = s.charAt(i);
      if (c === '\\') {
        var cm = cmdAt(s, i);
        if (!cm) { i += 2; continue; }
        if (cm === '\\left') { d++; i += 5; continue; }
        if (cm === '\\right') { d--; i += 6; continue; }
        if (d === 0 && RELS.indexOf(cm) >= 0) { out.push({ i: i, len: cm.length, r: cm }); }
        i += cm.length; continue;
      }
      if (c === '{' || c === '(') d++;
      else if (c === '}' || c === ')') d--;
      else if (d === 0 && (c === '=' || c === '<' || c === '>')) out.push({ i: i, len: 1, r: c });
      i++;
    }
    return out;
  }
  function isConst(s) { return /^[-+]?\s*(?:\d+(?:[.,]\d+|\{,\}\d+)?|\\pi|\\infty|\\frac\{\d+\}\{\d+\})$/.test(s.trim()); }
  function simpleVar(s) { return /^(?:[a-zA-Z]|\\(?:varepsilon|epsilon|alpha|beta|lambda|theta|delta))(?:_\{?\w+\}?)?$/.test(s.trim()); }
  function negAtom(a) {
    var r = rels(a.s);
    if (r.length !== 1 || !NEG[r[0].r]) return null;
    var L = a.s.slice(0, r[0].i).trim(), Rt = a.s.slice(r[0].i + r[0].len).trim(), nr = NEG[r[0].r];
    if (!L || !Rt) return null;
    if (isConst(L) && simpleVar(Rt) && FLIP[nr]) { var t = L; L = Rt; Rt = t; nr = FLIP[nr]; }
    return { node: { t: 'atom', s: L + ' ' + nr + ' ' + Rt }, from: r[0].r, to: NEG[r[0].r] };
  }
  function splitDouble(a) {
    var r = rels(a.s);
    if (r.length !== 2 || !FLIP[r[0].r] || !FLIP[r[1].r]) return null;
    var x = a.s.slice(0, r[0].i).trim(), y = a.s.slice(r[0].i + r[0].len, r[1].i).trim(), z = a.s.slice(r[1].i + r[1].len).trim();
    if (!x || !y || !z) return null;
    /* a < x ≤ b : « x > a et x ≤ b » (le terme du milieu à gauche, comme on l'écrit à la main) */
    return { t: 'and', a: { t: 'atom', s: y + ' ' + FLIP[r[0].r] + ' ' + x }, b: { t: 'atom', s: y + ' ' + r[1].r + ' ' + z } };
  }
  /* une règle, appliquée au premier ¬ réductible (de gauche à droite, de l'extérieur vers l'intérieur) */
  function qstep(n) {
    if (n.t === 'atom') return null;
    if (n.t === 'not') {
      var c = n.a, out = null;
      if (c.t === 'q') out = { n: { t: 'q', q: c.q === 'A' ? 'E' : 'A', b: c.b, a: { t: 'not', a: c.a } }, rule: c.q === 'A' ? '\\(\\neg\\forall\\) devient \\(\\exists\\) : la négation passe derrière le quantificateur, le domaine ne change pas.' : '\\(\\neg\\exists\\) devient \\(\\forall\\) : la négation passe derrière le quantificateur, le domaine ne change pas.' };
      else if (c.t === 'and') out = { n: { t: 'or', a: { t: 'not', a: c.a }, b: { t: 'not', a: c.b } }, rule: 'Loi de De Morgan : \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\).' };
      else if (c.t === 'or') out = { n: { t: 'and', a: { t: 'not', a: c.a }, b: { t: 'not', a: c.b } }, rule: 'Loi de De Morgan : \\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\).' };
      else if (c.t === 'imp') out = { n: { t: 'and', a: c.a, b: { t: 'not', a: c.b } }, rule: 'Négation d’une implication : \\(\\neg(P \\Rightarrow Q) \\equiv P \\land \\neg Q\\).' };
      else if (c.t === 'iff') out = { n: { t: 'or', a: { t: 'and', a: c.a, b: { t: 'not', a: c.b } }, b: { t: 'and', a: { t: 'not', a: c.a }, b: c.b } }, rule: 'Négation d’une équivalence : \\(\\neg(P \\Leftrightarrow Q) \\equiv (P \\land \\neg Q) \\lor (\\neg P \\land Q)\\).' };
      else if (c.t === 'not') out = { n: c.a, rule: 'Double négation : \\(\\neg\\neg P \\equiv P\\).' };
      else if (c.t === 'atom') {
        var na = negAtom(c);
        if (na) out = { n: na.node, rule: 'Négation d’une relation : \\({a}\\) devient \\({b}\\).', vars: { a: na.from, b: na.to } };
        else { var sp = splitDouble(c); if (sp) out = { n: { t: 'not', a: sp }, rule: 'Une double inégalité, ce sont deux inégalités reliées par « et ».', hlChild: true }; }
      }
      if (out) { out.hit = out.hlChild ? out.n.a : out.n; return out; }
      return null;
    }
    var keys = n.t === 'q' ? ['a'] : ['a', 'b'];
    for (var i = 0; i < keys.length; i++) {
      var r = qstep(n[keys[i]]);
      if (r) { var copy = {}; for (var k in n) copy[k] = n[k]; copy[keys[i]] = r.n; r.n = copy; return r; }
    }
    return null;
  }
  function qnegate(src) {
    var t = typeof src === 'string' ? qparse(src) : src;
    if (t.error) return { error: t.error };
    var cur = { t: 'not', a: t }, steps = [{ node: cur, tex: qtex(cur, [cur]), rule: T('On écrit la négation de toute la phrase.') }];
    for (var guard = 0; guard < 60; guard++) {
      var r = qstep(cur);
      if (!r) break;
      cur = r.n;
      steps.push({ node: cur, tex: qtex(cur, [r.hit]), rule: T(r.rule, r.vars) });
    }
    return { steps: steps, result: qtex(cur), node: cur, source: qtex(t) };
  }

  /* ================================================================== 4. ENSEMBLES (Venn) */
  function sparse(src, names, u) {
    names = names || ['A', 'B']; u = u || 'E';
    var s = String(src).replace(/[\u00a0\u202f]/g, ' ').replace(/\\left|\\right/g, '').replace(/\\setminus|\\backslash/g, ' \\ ')
      .replace(/\\cup/g, '∪').replace(/\\cap/g, '∩').replace(/\\(?:emptyset|varnothing)/g, '∅').replace(/\\complement\s*/g, '!')
      .replace(/\\overline\s*\{/g, '¯{').replace(/\\bar\s*\{/g, '¯{').replace(/\bunion\b/g, '∪').replace(/\binter\b/g, '∩');
    var p = 0;
    function ws() { while (/\s/.test(s.charAt(p))) p++; }
    function expr() {
      var a = term();
      for (;;) {
        ws(); var c = s.charAt(p);
        if (c === '∪' || c === '|' || c === '+') { p++; a = { t: 'u', a: a, b: term() }; }
        else if ((c === '\\' && !/[A-Za-z]/.test(s.charAt(p + 1))) || c === '-' || c === '−') { p++; a = { t: 'd', a: a, b: term() }; }
        else return a;
      }
    }
    function term() { var a = fac(); for (;;) { ws(); var c = s.charAt(p); if (c === '∩' || c === '&') { p++; a = { t: 'i', a: a, b: fac() }; } else return a; } }
    function fac() {
      ws(); var c = s.charAt(p), a;
      if (c === '!' || c === '¬') { p++; return post({ t: 'c', a: fac() }); }
      if (c === '(') { p++; a = expr(); ws(); if (s.charAt(p) !== ')') throw new Error('paren'); p++; return post(a); }
      if (c === '¯') { p += 2; a = expr(); ws(); if (s.charAt(p) !== '}') throw new Error('brace'); p++; return post({ t: 'c', a: a }); }
      if (c === '{') { p++; a = expr(); ws(); if (s.charAt(p) !== '}') throw new Error('brace'); p++; return post(a); }
      if (c === '∅') { p++; return post({ t: 'empty' }); }
      if (s.substr(p, 6) === '\\Omega' || c === 'Ω') { p += c === 'Ω' ? 1 : 6; if (u === 'Ω' || u === '\\Omega') return post({ t: 'all' }); throw new Error('name'); }
      if (/[A-Za-z]/.test(c)) {
        var nm = c; p++;
        if (nm === u) return post({ t: 'all' });
        var k = names.indexOf(nm);
        if (k < 0) throw new Error('name');
        return post({ t: 's', k: k });
      }
      throw new Error('syntax');
    }
    function post(a) {
      for (;;) {
        ws();
        if (s.substr(p, 3) === '^{c' && s.charAt(p + 3) === '}') { p += 4; a = { t: 'c', a: a }; }
        else if (s.substr(p, 2) === '^c' || s.substr(p, 2) === "^'") { p += 2; a = { t: 'c', a: a }; }
        else if (s.charAt(p) === "'" || s.charAt(p) === '’') { p++; a = { t: 'c', a: a }; }
        else return a;
      }
    }
    try { var r = expr(); ws(); if (p < s.length) return { error: T('Expression illisible.') }; return r; }
    catch (e) { return { error: T('Expression illisible.') }; }
  }
  function szones(t, n) {
    var full = (1 << (1 << n)) - 1;
    switch (t.t) {
      case 'all': return full;
      case 'empty': return 0;
      case 's': { var m = 0; for (var z = 0; z < (1 << n); z++) if ((z >> t.k) & 1) m |= 1 << z; return m; }
      case 'c': return full & ~szones(t.a, n);
      case 'u': return szones(t.a, n) | szones(t.b, n);
      case 'i': return szones(t.a, n) & szones(t.b, n);
      case 'd': return szones(t.a, n) & ~szones(t.b, n);
    }
    return 0;
  }
  function stex(t, names, u) {
    function w(x, p) { var s = stex(x, names, u); return (x.t === 'u' || x.t === 'd' || x.t === 'i') && x.t !== p ? '(' + s + ')' : (x.t === 'd' && p === 'd') ? '(' + s + ')' : s; }
    switch (t.t) {
      case 'all': return u === 'Ω' ? '\\Omega' : u;
      case 'empty': return '\\varnothing';
      case 's': return names[t.k];
      case 'c': return '\\overline{' + stex(t.a, names, u) + '}';
      case 'u': return w(t.a, 'u') + ' \\cup ' + w(t.b, 'u');
      case 'i': return w(t.a, 'i') + ' \\cap ' + w(t.b, 'i');
      case 'd': return w(t.a, 'x') + ' \\setminus ' + w(t.b, 'x');
    }
    return '';
  }
  /* la plus courte écriture d'un ensemble de zones (recherche en largeur, mémorisée par n) */
  var NAMECACHE = {};
  function sname(mask, names, u) {
    var n = names.length, key = n + ':' + names.join('') + ':' + u, best = NAMECACHE[key];
    if (!best) {
      best = {};
      var full = (1 << (1 << n)) - 1;
      var put = function (m, t, cost) { if (!best[m] || best[m].cost > cost) { best[m] = { t: t, cost: cost }; return true; } return false; };
      put(0, { t: 'empty' }, 1); put(full, { t: 'all' }, 1);
      for (var k = 0; k < n; k++) { var s = { t: 's', k: k }; put(szones(s, n), s, 1); put(szones({ t: 'c', a: s }, n), { t: 'c', a: s }, 2); }
      for (var round = 0; round < 8; round++) {
        var cur = Object.keys(best).map(function (m) { return [+m, best[m]]; }), changed = false;
        for (var i = 0; i < cur.length; i++) {
          var A = cur[i];
          changed = put(full & ~A[0], { t: 'c', a: A[1].t }, A[1].cost + 1) || changed;
          for (var j = 0; j < cur.length; j++) {
            var B = cur[j], c = A[1].cost + B[1].cost + 1;
            if (c > 17) continue;
            if (i < j) { changed = put(A[0] | B[0], { t: 'u', a: A[1].t, b: B[1].t }, c) || changed; changed = put(A[0] & B[0], { t: 'i', a: A[1].t, b: B[1].t }, c) || changed; }
            if (i !== j) changed = put(A[0] & ~B[0], { t: 'd', a: A[1].t, b: B[1].t }, c + 0.5) || changed;
          }
        }
        if (!changed) break;
      }
      NAMECACHE[key] = best;
    }
    if (best[mask]) return stex(best[mask].t, names, u);
    var parts = [];   /* dernier recours : la réunion des zones */
    for (var z = 0; z < (1 << n); z++) if ((mask >> z) & 1) parts.push(zoneTex(z, names, n));
    return parts.map(function (x) { return parts.length > 1 ? '(' + x + ')' : x; }).join(' \\cup ');
  }
  /* effectifs des zones à partir des cardinaux donnés (A, B, AB, …, E) : inversion du crible */
  function zoneCounts(sizes, names) {
    var n = names.length, out = [];
    function inter(mask) {   /* |∩ des ensembles de mask| ; mask 0 : E */
      if (!mask) return sizes.E != null ? frac(sizes.E) : null;
      var key = names.filter(function (x, i) { return (mask >> i) & 1; }).join('');
      var v = sizes[key];
      if (v == null) { var alt = Object.keys(sizes).filter(function (k) { return k.split('').sort().join('') === key.split('').sort().join(''); })[0]; v = alt != null ? sizes[alt] : null; }
      return v == null ? null : frac(v);
    }
    for (var z = 0; z < (1 << n); z++) {
      var tot = F(0), ok = true;
      for (var sup = 0; sup < (1 << n); sup++) {
        if ((sup & z) !== z) continue;
        var v = inter(sup);
        if (v == null) { ok = false; break; }
        var extra = 0; for (var b = 0; b < n; b++) if (((sup ^ z) >> b) & 1) extra++;
        tot = extra % 2 ? fr.sub(tot, v) : fr.add(tot, v);
      }
      out.push(ok ? tot : null);
    }
    if (out.some(function (v) { return v && v.n < Z; })) return { error: T('Effectifs incohérents : une zone aurait un effectif négatif.'), zones: out };
    return { zones: out };
  }

  /* ================================================================== 5. APPLICATIONS (sagittal) */
  function imgs(f, x) { var v = f[x]; return v == null ? [] : Array.isArray(v) ? v : [v]; }
  function fprops(o) {
    var E = o.E, Fs = o.F, f = o.f || {}, res = { app: true, inj: true, surj: true, noImg: [], multi: [], collide: null, noPre: [] };
    E.forEach(function (x) { var l = imgs(f, x); if (!l.length) res.noImg.push(x); if (l.length > 1) res.multi.push(x); });
    res.app = !res.noImg.length && !res.multi.length;
    var seen = {};
    E.forEach(function (x) { imgs(f, x).forEach(function (y) { if (seen[y] != null && seen[y] !== x && !res.collide) res.collide = [seen[y], x, y]; if (seen[y] == null) seen[y] = x; }); });
    res.inj = !res.collide;
    Fs.forEach(function (y) { if (seen[y] == null) res.noPre.push(y); });
    res.surj = !res.noPre.length;
    res.bij = res.app && res.inj && res.surj;
    return res;
  }
  function fimage(f, A) { var out = []; A.forEach(function (x) { imgs(f, x).forEach(function (y) { if (out.indexOf(y) < 0) out.push(y); }); }); return out; }
  function fpre(E, f, B) { return E.filter(function (x) { return imgs(f, x).some(function (y) { return B.indexOf(y) >= 0; }); }); }

  /* ================================================================== 6. ARBRE PONDÉRÉ */
  function tcompute(o) {
    var first = (o.first || []).map(function (b) { return { n: b.n, p: b.p == null || b.p === '' ? null : frac(b.p), raw: b.p }; });
    var err = null;
    first.forEach(function (b) { if (b.raw != null && b.raw !== '' && !b.p) err = T('Probabilité illisible : « {v} ».', { v: b.raw }); });
    var miss = first.filter(function (b) { return !b.p; });
    if (!err && miss.length === 1) {
      var rest = fr.sub(F(1), fr.sum(first.filter(function (b) { return b.p; }).map(function (b) { return b.p; })));
      if (rest.n < Z) err = T('Les probabilités des branches issues d’un même nœud doivent avoir pour somme 1.'); else miss[0].p = rest;
    }
    else if (!err && miss.length > 1) err = T('Les probabilités des branches issues d’un même nœud doivent avoir pour somme 1.');
    var sec = o.second || {}, cond = (sec.p || []).map(function (v) { var f = frac(v); if (!f && !err) err = T('Probabilité illisible : « {v} ».', { v: v }); return f; });
    var all = first.map(function (b) { return b.p; }).concat(cond);
    if (!err && all.some(function (p) { return !p || p.n < Z || fr.cmp(p, F(1)) > 0; })) err = T('Une probabilité est entre 0 et 1.');
    if (!err && !fr.eq(fr.sum(first.map(function (b) { return b.p; })), F(1))) err = T('Les probabilités des branches issues d’un même nœud doivent avoir pour somme 1.');
    if (err) return { error: err, first: first, cond: cond };
    var joint = first.map(function (b, i) { var c = cond[i]; return { B: fr.mul(b.p, c), nB: fr.mul(b.p, fr.sub(F(1), c)) }; });
    var total = fr.sum(joint.map(function (j) { return j.B; })), totalNB = fr.sub(F(1), total);
    var bayes = joint.map(function (j) { return { B: fr.isZero(total) ? null : fr.div(j.B, total), nB: fr.isZero(totalNB) ? null : fr.div(j.nB, totalNB) }; });
    return { first: first, cond: cond, joint: joint, total: total, totalNB: totalNB, bayes: bayes };
  }

  /* ================================================================== 7. LOI D'UNE VARIABLE ALÉATOIRE */
  function lawMake(o) {
    var xs, ps, err = null;
    if (o.law === 'binom') {
      var n = parseInt(o.n, 10), p = frac(o.p);
      if (!(n >= 1 && n <= 40) || !p || p.n < Z || fr.cmp(p, F(1)) > 0) return { error: T('Paramètres illisibles.') };
      xs = []; ps = [];
      for (var k = 0; k <= n; k++) { xs.push(BigInt(k)); ps.push(fr.mul(F(binom(n, k)), fr.mul(fr.pow(p, k), fr.pow(fr.sub(F(1), p), n - k)))); }
    } else if (o.law === 'bern') {
      var q = frac(o.p);
      if (!q || q.n < Z || fr.cmp(q, F(1)) > 0) return { error: T('Paramètres illisibles.') };
      xs = [0n, 1n]; ps = [fr.sub(F(1), q), q];
    } else if (o.law === 'unif') {
      var a = parseInt(o.a, 10), b = parseInt(o.b, 10);
      if (!(isFinite(a) && isFinite(b) && b >= a && b - a <= 40)) return { error: T('Paramètres illisibles.') };
      xs = []; ps = [];
      for (var v = a; v <= b; v++) { xs.push(BigInt(v)); ps.push(F(1, b - a + 1)); }
    } else {
      xs = (o.x || []).map(function (v) { var f = frac(v); return f; });
      ps = (o.p || []).map(function (v) { return frac(v); });
      if (!xs.length || xs.length !== ps.length || xs.some(function (x) { return !x; }) || ps.some(function (x) { return !x || x.n < Z; })) return { error: T('Paramètres illisibles.') };
    }
    xs = xs.map(function (x) { return isF(x) ? x : F(x); });
    var sum = fr.sum(ps);
    if (!fr.eq(sum, F(1))) err = T('La somme des probabilités vaut {s}, pas 1.', { s: fr.str(sum) });
    var E = fr.sum(xs.map(function (x, i) { return fr.mul(x, ps[i]); }));
    var E2 = fr.sum(xs.map(function (x, i) { return fr.mul(fr.mul(x, x), ps[i]); }));
    var V = fr.sub(E2, fr.mul(E, E));
    return { x: xs, p: ps, sum: sum, E: E, E2: E2, V: V, sd: fr.sqrt(V), error: err };
  }

  /* ================================================================== 8. OUTILS (visuels) */
  function head(title, right) {
    return '<div class="bench-head"><span class="bh-t"><span>' + title + '</span></span>' + (right ? '<span class="bh-r">' + right + '</span>' : '') + '</div>';
  }
  /* stepper(el, total, paint, start, offset) : paint(k) dessine l'état après k étapes ; offset décale le numéro affiché */
  function stepper(el, total, paint, start, offset) {
    var k = start == null ? 0 : start, off = offset || 0;
    var c = document.createElement('div');
    c.className = 'ctrls';
    c.innerHTML = '<div class="row">' +
      '<button type="button" class="btn" data-a="prev">' + T('Précédent') + '</button>' +
      '<button type="button" class="btn primary" data-a="next">' + T('Suivant') + '</button>' +
      '<button type="button" class="btn" data-a="end">' + T('Tout afficher') + '</button>' +
      '<button type="button" class="btn ghost" data-a="reset">' + T('Recommencer') + '</button>' +
      '<span class="cnt"></span></div>';
    el.appendChild(c);
    function go(j) {
      k = Math.max(0, Math.min(total, j));
      paint(k);
      c.querySelector('[data-a="prev"]').disabled = k <= 0;
      c.querySelector('[data-a="next"]').disabled = c.querySelector('[data-a="end"]').disabled = k >= total;
      c.querySelector('.cnt').textContent = T('étape {i} / {n}', { i: k + off, n: total + off });
    }
    c.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      go(a === 'prev' ? k - 1 : a === 'next' ? k + 1 : a === 'end' ? total : start == null ? 0 : start);
    });
    go(k);
    return { go: go, get: function () { return k; }, el: c, setTotal: function (t) { total = t; go(Math.min(k, t)); } };
  }
  function presetsHTML(list, attr) {
    if (!list || !list.length) return '';
    return '<div class="presets"><span class="hint">' + T('Exemples :') + '</span>' + list.map(function (p, i) {
      var lab = typeof p === 'string' ? p : Array.isArray(p) ? p.join('  ·  ') : p.label || p.src || (Array.isArray(p.f) ? p.f.join('  ·  ') : p.f);
      return '<button type="button" class="chip-btn" ' + attr + '="' + i + '">' + (typeof p === 'object' && p.tex ? tx(p.tex) : esc(lab)) + '</button>';
    }).join('') + '</div>';
  }
  function VF(b) { return '<span class="' + (b ? 'V' : 'F') + '">' + T(b ? 'V' : 'F') + '</span>'; }

  /* ---------- table de vérité ---------- */
  function truth(el, o) {
    o = o || {};
    var list = Array.isArray(o.f) ? o.f.slice() : [o.f || 'P => Q'];
    var edit = o.edit !== false, sub = o.sub !== false, quiz = !!o.quiz, presets = o.presets || null, guess = {};
    el.classList.add('bench', 'tvb');
    el.innerHTML = head(o.title || T('Table de vérité'), '') + '<div class="bench-body">' +
      (edit ? '<div class="fld-grid">' + list.map(function (f, i) { return '<label class="fld"><span>' + T('Formule') + (list.length > 1 ? ' ' + (i + 1) : '') + '</span><input type="text" spellcheck="false" autocomplete="off" data-i="' + i + '" value="' + esc(f) + '"></label>'; }).join('') + '</div>' +
        '<p class="hint">' + esc(T('Connecteurs : ¬ ou !, ∧ ou &, ∨ ou |, ⇒ ou =>, ⇔ ou <=>. Variables : une lettre (P, Q, R…).')) + '</p>' + presetsHTML(presets, 'data-p') : '') +
      '<div class="tv-scroll"></div><div class="readout" aria-live="polite"></div></div>' +
      (quiz ? '<div class="ctrls"><div class="row"><button type="button" class="btn primary" data-a="check">' + T('Vérifier') + '</button><button type="button" class="btn" data-a="sol">' + T('Solution') + '</button><span class="cnt"></span></div></div>' : '');
    var box = el.querySelector('.tv-scroll'), out = el.querySelector('.readout'), tab = null, sel = -1;
    function build() {
      tab = ltable(list); sel = -1; guess = {};
      if (tab.error) { box.innerHTML = ''; out.innerHTML = '<span class="err">' + esc(tab.error) + '</span>'; return; }
      var cols = tab.cols, fin = tab.finals, quizCols = quiz ? fin.filter(function (x, i, a) { return a.indexOf(x) === i; }) : [];
      var h = '<table class="tv"><thead><tr>' + tab.vars.map(function (v) { return '<th scope="col" class="var">' + tx(v) + '</th>'; }).join('');
      cols.forEach(function (c, j) { if (!sub && !c.fin) return; h += '<th scope="col" class="' + (c.fin ? 'fin' : 'sub') + '">' + tx(c.tex) + '</th>'; });
      h += '</tr></thead><tbody>';
      tab.rows.forEach(function (r, i) {
        h += '<tr data-r="' + i + '">' + tab.vars.map(function (v) { return '<td class="var">' + VF(r.env[v]) + '</td>'; }).join('');
        r.vals.forEach(function (b, j) {
          var c = cols[j]; if (!sub && !c.fin) return;
          h += '<td class="' + (c.fin ? 'fin' : 'sub') + '">' + (quizCols.indexOf(j) >= 0 ? '<button type="button" class="cell" data-c="' + i + ':' + j + '" aria-label="' + esc(T('case vide')) + '">?</button>' : VF(b)) + '</td>';
        });
        h += '</tr>';
      });
      box.innerHTML = h + '</tbody></table>';
      say();
    }
    function verdict() {
      if (tab.same != null) {
        var a = tx(tab.cols[tab.finals[0]].tex), b = tx(tab.cols[tab.finals[1]].tex);
        return tab.same ? T('Les colonnes {a} et {b} sont identiques à chaque ligne : les deux propositions sont équivalentes.', { a: a, b: b })
          : T('Les colonnes {a} et {b} diffèrent à la ligne {i} : les deux propositions ne sont pas équivalentes.', { a: a, b: b, i: tab.diff.map(function (x) { return x + 1; }).join(', ') });
      }
      var f = tab.finals[0], all = tab.rows.every(function (r) { return r.vals[f]; }), none = tab.rows.every(function (r) { return !r.vals[f]; });
      return all ? T('Vraie à toutes les lignes : c’est une tautologie.') : none ? T('Fausse à toutes les lignes : c’est une contradiction.') : '';
    }
    function say() {
      var k = tab.vars.length, h = '<p class="hint">' + (k === 1 ? T('1 variable : 2 lignes.') : T('{k} variables : {n} lignes, une par combinaison de valeurs.', { k: k, n: 1 << k })) + ' ' + (quiz ? T('Remplis la dernière colonne (clique : V, F), puis vérifie.') : T('Clique sur une ligne pour la lire.')) + '</p>';
      if (sel >= 0) {
        var r = tab.rows[sel];
        var env = tab.vars.map(function (v) { return tx(v) + ' ' + (r.env[v] ? T('vraie') : T('fausse')); }).join(', ');
        var res = tab.finals.filter(function (x, i, a) { return a.indexOf(x) === i; }).map(function (j) { return tx(tab.cols[j].tex) + ' ' + (r.vals[j] ? T('vraie') : T('fausse')); }).join(' ; ');
        h += '<p>' + T('Ligne {i} : {env}. {res}', { i: sel + 1, env: env, res: res }) + '.</p>';
      }
      if (!quiz) { var v = verdict(); if (v) h += '<p><b>' + v + '</b></p>'; }
      out.innerHTML = h;
    }
    box.addEventListener('click', function (e) {
      var c = e.target.closest('button.cell');
      if (c) {
        var key = c.getAttribute('data-c'), cur = guess[key];
        guess[key] = cur === true ? false : cur === false ? undefined : true;
        c.className = 'cell' + (guess[key] === true ? ' V' : guess[key] === false ? ' F' : '');
        c.textContent = guess[key] === true ? T('V') : guess[key] === false ? T('F') : '?';
        c.setAttribute('aria-label', guess[key] == null ? T('case vide') : guess[key] ? T('vrai') : T('faux'));
        return;
      }
      var tr = e.target.closest('tr[data-r]');
      if (tr && tab && !tab.error) {
        sel = +tr.getAttribute('data-r');
        U.$$('tr[data-r]', box).forEach(function (x) { x.classList.toggle('hit', x === tr); });
        say();
      }
    });
    if (quiz) el.querySelector('.ctrls').addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b || !tab || tab.error) return;
      var cells = U.$$('button.cell', box), ok = 0, empty = 0;
      cells.forEach(function (c) {
        var p = c.getAttribute('data-c').split(':'), want = tab.rows[+p[0]].vals[+p[1]], key = c.getAttribute('data-c');
        if (b.getAttribute('data-a') === 'sol') { guess[key] = want; c.className = 'cell ' + (want ? 'V' : 'F'); c.textContent = T(want ? 'V' : 'F'); }
        var g = guess[key];
        if (g == null) empty++;
        c.classList.toggle('good', g === want); c.classList.toggle('wrong', g != null && g !== want);
        if (g === want) ok++;
      });
      el.querySelector('.ctrls .cnt').textContent = T('{ok} / {n} cases justes.', { ok: ok, n: cells.length });
      var v = verdict();
      out.innerHTML = '<p><b>' + (ok === cells.length ? T('Tout est juste.') : empty ? T('Il reste des cases vides.') : '') + '</b></p>' + (ok === cells.length && v ? '<p>' + v + '</p>' : '');
    });
    if (edit) {
      U.$$('input[data-i]', el).forEach(function (inp) { inp.addEventListener('input', function () { list[+inp.getAttribute('data-i')] = inp.value; build(); }); });
      if (presets) U.$$('[data-p]', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var p = presets[+b.getAttribute('data-p')], v = Array.isArray(p) ? p : typeof p === 'object' ? p.f : p;
          v = Array.isArray(v) ? v : [v];
          U.$$('input[data-i]', el).forEach(function (inp, i) { if (v[i] != null) { inp.value = v[i]; list[i] = v[i]; } });
          build();
        });
      });
    }
    build();
    return { el: el, table: function () { return tab; } };
  }

  /* ---------- négation pas à pas ---------- */
  function negate(el, o) {
    o = o || {};
    var src = o.src || '\\forall x \\in \\R, \\exists y \\in \\R, x + y > 0', edit = o.edit !== false, presets = o.presets || null;
    el.classList.add('bench', 'ngb');
    el.innerHTML = head(o.title || T('Négation pas à pas'), '') + '<div class="bench-body">' +
      (edit ? '<label class="fld"><span>' + T('Phrase') + '</span><input type="text" spellcheck="false" autocomplete="off" value="' + esc(src) + '"></label>' +
        '<p class="hint">' + esc(T('Écris une phrase avec \\forall, \\exists, \\in, \\Rightarrow, \\land, \\lor, \\neg (ou ∀ ∃ ∈ ⇒ ∧ ∨ ¬, ou forall, exists, in, =>, et, ou, non).')) + '</p>' + presetsHTML(presets, 'data-p') : '') +
      '<div class="ng-src"></div><ol class="ng-steps"></ol><div class="readout ng-out" aria-live="polite"></div></div>';
    var list = el.querySelector('.ng-steps'), out = el.querySelector('.ng-out'), srcBox = el.querySelector('.ng-src'), res = null, st = null;
    function paint(k) {
      if (!res || res.error) return;
      U.$$('li', list).forEach(function (li, i) { li.classList.toggle('later', i > k); li.classList.toggle('now', i === k); });
      out.innerHTML = k >= res.steps.length - 1 ? '<p><b>' + T('Négation :') + '</b></p><p class="ng-res">' + tx(res.result) + '</p>' : (k === 0 ? '<p class="hint">' + T('Appuie sur « Suivant » pour la première règle.') + '</p>' : '');
    }
    function build() {
      res = qnegate(src);
      if (res.error) { srcBox.innerHTML = ''; list.innerHTML = ''; out.innerHTML = '<span class="err">' + esc(T('Phrase illisible : {m}', { m: res.error })) + '</span>'; if (st) st.setTotal(0); return; }
      srcBox.innerHTML = '<p class="ng-res">' + tx(res.source) + '</p>';
      list.innerHTML = res.steps.map(function (s) { return '<li><div class="ng-f">' + tx(s.tex) + '</div><div class="ng-rule">' + mathify(s.rule) + '</div></li>'; }).join('');
      if (!st) st = stepper(el, res.steps.length - 1, paint, 0, 1); else { st.setTotal(res.steps.length - 1); st.go(0); }
    }
    if (edit) {
      el.querySelector('input').addEventListener('input', function (e) { src = e.target.value; build(); });
      if (presets) U.$$('[data-p]', el).forEach(function (b) { b.addEventListener('click', function () { var p = presets[+b.getAttribute('data-p')]; src = typeof p === 'object' ? p.src : p; el.querySelector('input').value = src; build(); }); });
    }
    build();
    return { el: el, result: function () { return res; } };
  }

  /* ---------- diagramme de Venn ---------- */
  var VG = {
    2: { w: 400, h: 250, c: [[150, 128, 88], [250, 128, 88]], lab: [[92, 52], [308, 52]], zl: { 0: [40, 225], 1: [112, 132], 2: [288, 132], 3: [200, 132] } },
    3: { w: 400, h: 330, c: [[160, 125, 85], [240, 125, 85], [200, 195, 85]], lab: [[88, 52], [312, 52], [200, 312]], zl: { 0: [36, 312], 1: [128, 102], 2: [272, 102], 3: [200, 92], 4: [200, 240], 5: [150, 178], 6: [250, 178], 7: [200, 160] } }
  };
  function zoneOf(x, y, g, n) { var z = 0; for (var i = 0; i < n; i++) { var c = g.c[i], dx = x - c[0], dy = y - c[1]; if (dx * dx + dy * dy <= c[2] * c[2]) z |= 1 << i; } return z; }
  function zoneTex(z, names, n) { var parts = []; for (var i = 0; i < n; i++) parts.push((z >> i) & 1 ? names[i] : '\\overline{' + names[i] + '}'); return parts.join(' \\cap '); }
  function vennSVG(id, n, names, u, mask, counts) {
    var g = VG[n], h = '<svg viewBox="0 0 ' + g.w + ' ' + g.h + '" role="group" aria-label="' + esc(T('Diagramme de Venn')) + '"><defs>';
    for (var i = 0; i < n; i++) {
      var c = g.c[i];
      h += '<clipPath id="' + id + 'in' + i + '"><circle cx="' + c[0] + '" cy="' + c[1] + '" r="' + c[2] + '"/></clipPath>';
      h += '<clipPath id="' + id + 'out' + i + '"><path clip-rule="evenodd" d="M0 0H' + g.w + 'V' + g.h + 'H0Z M' + (c[0] - c[2]) + ' ' + c[1] + 'a' + c[2] + ' ' + c[2] + ' 0 1 0 ' + (2 * c[2]) + ' 0a' + c[2] + ' ' + c[2] + ' 0 1 0 ' + (-2 * c[2]) + ' 0Z"/></clipPath>';
    }
    h += '</defs><rect class="vn-u" x="6" y="6" width="' + (g.w - 12) + '" height="' + (g.h - 12) + '" rx="10"/>';
    for (var z = 0; z < (1 << n); z++) {
      var open = '', close = '';
      for (var k = 0; k < n; k++) { open += '<g clip-path="url(#' + id + ((z >> k) & 1 ? 'in' : 'out') + k + ')">'; close += '</g>'; }
      h += open + '<rect class="vn-zone' + ((mask >> z) & 1 ? ' on' : '') + '" data-z="' + z + '" x="7" y="7" width="' + (g.w - 14) + '" height="' + (g.h - 14) + '" rx="9" tabindex="0" role="button" aria-pressed="' + !!((mask >> z) & 1) + '" aria-label="' + esc(T('zone {z}', { z: zoneTex(z, names, n).replace(/\\overline\{(\w)\}/g, '$1̄').replace(/\\cap/g, '∩') })) + '"/>' + close;
    }
    for (var j = 0; j < n; j++) { var cc = g.c[j]; h += '<circle class="vn-set s' + j + '" cx="' + cc[0] + '" cy="' + cc[1] + '" r="' + cc[2] + '"/><text class="vn-name s' + j + '" x="' + g.lab[j][0] + '" y="' + g.lab[j][1] + '" text-anchor="middle">' + esc(names[j]) + '</text>'; }
    h += '<text class="vn-name u" x="' + (g.w - 22) + '" y="30" text-anchor="end">' + esc(u === '\\Omega' ? 'Ω' : u) + '</text>';
    if (counts) for (var q = 0; q < (1 << n); q++) if (counts[q]) h += '<text class="vn-card" x="' + g.zl[q][0] + '" y="' + (g.zl[q][1] + 5) + '">' + esc(fr.str(counts[q])) + '</text>';
    return h + '</svg>';
  }
  var vuid = 0;
  function venn(el, o) {
    o = o || {};
    var n = o.n === 3 || (o.names && o.names.length === 3) ? 3 : 2, names = (o.names || ['A', 'B', 'C']).slice(0, n), u = o.u || 'E';
    var id = 'vn' + (++vuid) + '-', edit = o.edit !== false, mask = 0, counts = null, cerr = null;
    if (o.sizes) { var zc = zoneCounts(o.sizes, names); counts = zc.zones; cerr = zc.error || null; }
    el.classList.add('bench', 'vnb');
    if (o.compare) {
      var A = sparse(o.compare[0], names, u), B = sparse(o.compare[1], names, u);
      if (A.error || B.error) { el.innerHTML = head(o.title || T('Diagramme de Venn'), '') + '<div class="bench-body"><p class="err">' + esc(T('Expression illisible.')) + '</p></div>'; return null; }
      var mA = szones(A, n), mB = szones(B, n);
      el.innerHTML = head(o.title || T('Diagramme de Venn'), '') + '<div class="bench-body"><div class="grid2">' +
        [[A, mA], [B, mB]].map(function (x, i) { return '<figure style="margin:0"><div class="fig">' + vennSVG(id + i, n, names, u, x[1], null) + '</div><figcaption class="fm" style="text-align:center">' + tx(stex(x[0], names, u)) + '</figcaption></figure>'; }).join('') +
        '</div><p class="readout"><b>' + (mA === mB ? T('Mêmes zones : les deux ensembles sont égaux.') : T('Zones différentes : les deux ensembles ne sont pas égaux.')) + '</b></p></div>';
      U.$$('.vn-zone', el).forEach(function (r) { r.removeAttribute('tabindex'); r.removeAttribute('role'); r.style.cursor = 'default'; });
      return { el: el, same: mA === mB };
    }
    el.innerHTML = head(o.title || T('Diagramme de Venn'), '') + '<div class="bench-body">' +
      (edit ? '<div class="fld-row"><label class="fld"><span>' + T('Ensemble') + '</span><input type="text" spellcheck="false" autocomplete="off" value="' + esc(o.expr || '') + '"></label><button type="button" class="btn" data-a="clear">' + T('Effacer') + '</button></div>' +
        '<p class="hint">' + esc(T('Opérations : ∪ ou |, ∩ ou &, \\ ou -, complémentaire : A\' ou !A ou \\overline{A}.')) + '</p>' : '') +
      '<div class="fig"></div><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout'), inp = el.querySelector('input');
    function draw() { fig.innerHTML = vennSVG(id, n, names, u, mask, counts); say(); }
    function say(err) {
      var h = '';
      if (err) h += '<p class="err">' + esc(err) + '</p>';
      else if (!mask) h += '<p class="hint">' + T('Clique sur les zones pour les colorier, ou tape une expression.') + '</p>';
      else h += '<p>' + T('Zones coloriées : {e}', { e: tx(sname(mask, names, u) || '') }) + '</p>';
      if (cerr) h += '<p class="err">' + esc(cerr) + '</p>';
      else if (counts && mask && !err) {
        var c = F(0), okc = true;
        for (var z = 0; z < (1 << n); z++) if ((mask >> z) & 1) { if (!counts[z]) { okc = false; break; } c = fr.add(c, counts[z]); }
        if (okc) h += '<p>' + T('Cardinal : {c}', { c: tx('\\card\\left(' + (sname(mask, names, u) || '') + '\\right) = ' + fr.tex(c)) }) + '</p>';
      }
      if (counts && !cerr) h += crible();
      out.innerHTML = h;
    }
    function inter(sub) { var c = F(0), ok = true; for (var z = 0; z < (1 << n); z++) if ((z & sub) === sub) { if (!counts[z]) ok = false; else c = fr.add(c, counts[z]); } return ok ? c : null; }
    function crible() {
      var subs = []; for (var s = 1; s < (1 << n); s++) subs.push(s);
      subs.sort(function (a, b) { return bits(a) - bits(b) || a - b; });
      var lhs = '\\card(' + names.join(' \\cup ') + ')', t1 = '', t2 = '', tot = F(0);
      for (var i = 0; i < subs.length; i++) {
        var v = inter(subs[i]); if (!v) return '';
        var sg = bits(subs[i]) % 2 ? '+' : '-', nm = names.filter(function (x, k) { return (subs[i] >> k) & 1; }).join(' \\cap ');
        t1 += (i ? ' ' + sg + ' ' : '') + '\\card(' + nm + ')'; t2 += (i ? ' ' + sg + ' ' : '') + fr.tex(v);
        tot = sg === '+' ? fr.add(tot, v) : fr.sub(tot, v);
      }
      return '<p>' + T('Formule du crible : ') + '</p><div class="fm">' + tx(lhs + ' = ' + t1, true) + '</div><div class="fm">' + tx('= ' + t2 + ' = ' + fr.tex(tot), true) + '</div>';
    }
    function bits(x) { var c = 0; while (x) { c += x & 1; x >>= 1; } return c; }
    function fromExpr(v) {
      if (!v.trim()) { mask = 0; draw(); return; }
      var t = sparse(v, names, u);
      if (t.error) { say(t.error); return; }
      mask = szones(t, n); draw();
    }
    function toggle(z) { mask ^= 1 << z; if (inp) inp.value = mask ? sname(mask, names, u) || '' : ''; draw(); var r = fig.querySelector('[data-z="' + z + '"]'); if (r) r.focus({ preventScroll: true }); }
    fig.addEventListener('click', function (e) {
      var svg = fig.querySelector('svg'); if (!svg || !svg.getScreenCTM) return;
      var pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      var m = svg.getScreenCTM(); if (!m) return;
      var p = pt.matrixTransform(m.inverse()), g = VG[n];
      if (p.x < 6 || p.y < 6 || p.x > g.w - 6 || p.y > g.h - 6) return;
      toggle(zoneOf(p.x, p.y, g, n));
    });
    fig.addEventListener('keydown', function (e) { var r = e.target.closest && e.target.closest('[data-z]'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); toggle(+r.getAttribute('data-z')); } });
    if (inp) inp.addEventListener('input', function () { fromExpr(inp.value); });
    var cl = el.querySelector('[data-a="clear"]'); if (cl) cl.addEventListener('click', function () { mask = 0; if (inp) inp.value = ''; draw(); });
    if (o.expr) fromExpr(o.expr); else draw();
    return { el: el, mask: function () { return mask; } };
  }

  /* ---------- diagramme sagittal ---------- */
  function sagittal(el, o) {
    o = o || {};
    var E = (o.E || ['a', 'b', 'c', 'd']).map(String), Fs = (o.F || ['1', '2', '3', '4']).map(String), f = {}, nm = o.names || ['E', 'F', 'f'];
    Object.keys(o.f || {}).forEach(function (k) { f[k] = o.f[k] == null ? null : Array.isArray(o.f[k]) ? o.f[k].map(String) : String(o.f[k]); });
    var mode = o.mode || 'props', A = (o.A || []).map(String), B = (o.B || []).map(String), pick = null;
    var modes = o.modes || ['props', 'image', 'preimage'].concat(o.edit ? ['edit'] : []);
    var LAB = { props: T('Propriétés'), image: T('Image directe'), preimage: T('Image réciproque'), edit: T('Modifier les flèches') };
    el.classList.add('bench', 'sgb');
    el.innerHTML = head(o.title || T('Diagramme sagittal'), '') + '<div class="bench-body">' +
      (modes.length > 1 ? '<div class="row" role="group">' + modes.map(function (m) { return '<button type="button" class="chip-btn" data-m="' + m + '" aria-pressed="' + (m === mode) + '">' + LAB[m] + '</button>'; }).join('') + '</div>' : '') +
      '<div class="fig"></div><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout');
    var GAP = 46, W = 420, top = 54, H = Math.max(E.length, Fs.length) * GAP + top + 20, XE = 100, XF = 320;
    function ys(list) { var off = top + (Math.max(E.length, Fs.length) - list.length) * GAP / 2; return list.map(function (x, i) { return off + i * GAP + GAP / 2; }); }
    function setTex(l) { return l.length ? '\\{' + l.map(lbl).join(',\\ ') + '\\}' : '\\varnothing'; }
    function lbl(x) { return /^[A-Za-z]$/.test(x) || /^-?\d+$/.test(x) ? x : '\\text{' + x + '}'; }
    function draw() {
      var yE = ys(E), yF = ys(Fs), img = fimage(f, A), pre = fpre(E, f, B), pr = fprops({ E: E, F: Fs, f: f });
      var h = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + esc(T('Diagramme sagittal')) + '"><defs><marker id="sgm' + el.__sid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sg-mk" d="M0 0L10 5L0 10z"/></marker><marker id="sgh' + el.__sid + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="sg-mk hl" d="M0 0L10 5L0 10z"/></marker></defs>';
      var ry = (H - top) / 2 + 6;
      h += '<ellipse class="sg-oval" cx="' + XE + '" cy="' + (top + (H - top - 20) / 2) + '" rx="62" ry="' + ry + '"/><ellipse class="sg-oval" cx="' + XF + '" cy="' + (top + (H - top - 20) / 2) + '" rx="62" ry="' + ry + '"/>';
      h += '<text class="sg-name" x="' + XE + '" y="26">' + esc(nm[0]) + '</text><text class="sg-name" x="' + XF + '" y="26">' + esc(nm[1]) + '</text>';
      h += '<text class="sg-name" x="' + ((XE + XF) / 2) + '" y="26" style="font-size:17px">' + esc(nm[2]) + '</text><path class="sg-ar" d="M' + (XE + 40) + ' 34H' + (XF - 40) + '" marker-end="url(#sgm' + el.__sid + ')"/>';
      E.forEach(function (x, i) {
        imgs(f, x).forEach(function (y) {
          var j = Fs.indexOf(y); if (j < 0) return;
          var x1 = XE + 15, y1 = yE[i], x2 = XF - 16, y2 = yF[j], mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 10;
          var hl = (mode === 'image' && A.indexOf(x) >= 0) || (mode === 'preimage' && B.indexOf(y) >= 0) || (mode === 'props' && pr.collide && pr.collide[2] === y);
          h += '<path class="sg-ar' + (hl ? ' hl' : '') + '" d="M' + x1 + ' ' + y1 + 'Q' + mx + ' ' + my + ' ' + x2 + ' ' + y2 + '" marker-end="url(#' + (hl ? 'sgh' : 'sgm') + el.__sid + ')"/>';
        });
      });
      E.forEach(function (x, i) {
        var c = (mode === 'image' && A.indexOf(x) >= 0) ? 'sel' : (mode === 'preimage' && pre.indexOf(x) >= 0) ? 'img' : (mode === 'edit' && pick === x) ? 'pick' : (mode === 'props' && (pr.noImg.indexOf(x) >= 0 || pr.multi.indexOf(x) >= 0 || (pr.collide && (pr.collide[0] === x || pr.collide[1] === x)))) ? 'bad' : '';
        h += '<g class="sg-el ' + c + '" data-e="' + i + '" tabindex="0" role="button" aria-label="' + esc(nm[0] + ' : ' + x) + '"><circle cx="' + XE + '" cy="' + yE[i] + '" r="15"/><text x="' + XE + '" y="' + (yE[i] + 6) + '">' + esc(x) + '</text></g>';
      });
      Fs.forEach(function (y, j) {
        var c = (mode === 'image' && img.indexOf(y) >= 0) ? 'img' : (mode === 'preimage' && B.indexOf(y) >= 0) ? 'sel' : (mode === 'props' && pr.noPre.indexOf(y) >= 0) ? 'bad' : '';
        h += '<g class="sg-el ' + c + '" data-f="' + j + '" tabindex="0" role="button" aria-label="' + esc(nm[1] + ' : ' + y) + '"><circle cx="' + XF + '" cy="' + yF[j] + '" r="15"/><text x="' + XF + '" y="' + (yF[j] + 6) + '">' + esc(y) + '</text></g>';
      });
      fig.innerHTML = h + '</svg>';
      var t = '';
      if (mode === 'props') {
        var fN = tx(nm[2]), eN = tx(nm[0]), fN2 = tx(nm[1]);
        if (!pr.app) t += '<p>' + (pr.noImg.length ? T('{f} n’est pas une application : {x} n’a pas d’image.', { f: fN, x: tx(lbl(pr.noImg[0])) }) : T('{f} n’est pas une application : {x} a plusieurs images.', { f: fN, x: tx(lbl(pr.multi[0])) })) + '</p>';
        else {
          t += '<p>' + T('{f} est une application : chaque élément de {E} a exactement une image.', { f: fN, E: eN }) + '</p>';
          t += '<p>' + (pr.inj ? T('Injective : deux éléments distincts ont toujours des images distinctes.') : T('Pas injective : {x} ≠ {y} mais {fx} = {fy} = {z}.', { x: tx(lbl(pr.collide[0])), y: tx(lbl(pr.collide[1])), fx: tx(nm[2] + '(' + lbl(pr.collide[0]) + ')'), fy: tx(nm[2] + '(' + lbl(pr.collide[1]) + ')'), z: tx(lbl(pr.collide[2])) })) + '</p>';
          t += '<p>' + (pr.surj ? T('Surjective : chaque élément de {F} a au moins un antécédent.', { F: fN2 }) : T(pr.noPre.length > 1 ? 'Pas surjective : {y} n’ont pas d’antécédent.' : 'Pas surjective : {y} n’a pas d’antécédent.', { y: pr.noPre.map(function (y) { return tx(lbl(y)); }).join(', ') })) + '</p>';
          if (pr.bij) t += '<p><b>' + T('Bijective : injective et surjective.') + '</b></p>';
        }
      } else if (mode === 'image') {
        t += '<p class="hint">' + T('Clique sur des éléments de {E} : leurs images s’allument dans {F}.', { E: tx(nm[0]), F: tx(nm[1]) }) + '</p><div class="fm">' + tx(nm[2] + '\\left(' + setTex(A) + '\\right) = ' + setTex(Fs.filter(function (y) { return img.indexOf(y) >= 0; }))) + '</div>';
      } else if (mode === 'preimage') {
        t += '<p class="hint">' + T('Clique sur des éléments de {F} : leurs antécédents s’allument dans {E}.', { E: tx(nm[0]), F: tx(nm[1]) }) + '</p><div class="fm">' + tx(nm[2] + '^{-1}\\left(' + setTex(B) + '\\right) = ' + setTex(pre)) + '</div>';
      } else t += '<p class="hint">' + T('Clique sur un élément de {E}, puis sur son image dans {F} (recliquer sur la même image retire la flèche).', { E: tx(nm[0]), F: tx(nm[1]) }) + '</p>';
      out.innerHTML = t;
    }
    function act(g) {
      if (g.hasAttribute('data-e')) {
        var x = E[+g.getAttribute('data-e')];
        if (mode === 'image') { var i = A.indexOf(x); if (i >= 0) A.splice(i, 1); else A.push(x); A.sort(function (a, b) { return E.indexOf(a) - E.indexOf(b); }); }
        else if (mode === 'edit') pick = pick === x ? null : x;
        else return;
      } else {
        var y = Fs[+g.getAttribute('data-f')];
        if (mode === 'preimage') { var j = B.indexOf(y); if (j >= 0) B.splice(j, 1); else B.push(y); B.sort(function (a, b) { return Fs.indexOf(a) - Fs.indexOf(b); }); }
        else if (mode === 'edit' && pick != null) { f[pick] = f[pick] === y ? null : y; pick = null; }
        else return;
      }
      var key = g.hasAttribute('data-e') ? '[data-e="' + g.getAttribute('data-e') + '"]' : '[data-f="' + g.getAttribute('data-f') + '"]';
      draw(); var again = fig.querySelector(key); if (again) again.focus();
    }
    fig.addEventListener('click', function (e) { var g = e.target.closest('.sg-el'); if (g) act(g); });
    fig.addEventListener('keydown', function (e) { var g = e.target.closest && e.target.closest('.sg-el'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); act(g); } });
    U.$$('[data-m]', el).forEach(function (b) { b.addEventListener('click', function () { mode = b.getAttribute('data-m'); pick = null; U.$$('[data-m]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); draw(); }); });
    el.__sid = ++vuid;
    draw();
    return { el: el, props: function () { return fprops({ E: E, F: Fs, f: f }); } };
  }

  /* ---------- arbre pondéré ---------- */
  function svgName(t) {   /* \overline{A} → A surligné (SVG) */
    var m = /^\\overline\{(.+)\}$/.exec(t);
    var plain = function (s) { return esc(s.replace(/\\|[{}]/g, '').replace(/_(\w)/g, '$1')); };
    return m ? '<tspan style="text-decoration:overline">' + plain(m[1]) + '</tspan>' : plain(t);
  }
  function tree(el, o) {
    o = o || {};
    var first = (o.first || [{ n: 'A', p: '1/3' }, { n: '\\overline{A}' }]).map(function (b) { return { n: b.n, p: b.p == null ? '' : String(b.p) }; });
    var sec = o.second || { n: 'B', nb: '\\overline{B}', p: ['1/2', '1/5'] };
    var cond = sec.p.map(String), edit = o.edit !== false, pick = null;
    el.classList.add('bench', 'trb');
    el.innerHTML = head(o.title || T('Arbre pondéré'), '') + '<div class="bench-body">' +
      (edit ? '<div class="tr-in">' + first.map(function (b, i) { return '<label class="fld"><span>' + tx('\\P(' + b.n + ')') + '</span><input type="text" inputmode="decimal" data-k="f' + i + '" value="' + esc(b.p) + '"></label>'; }).join('') +
        cond.map(function (c, i) { return '<label class="fld"><span>' + tx('\\P_{' + first[i].n + '}(' + sec.n + ')') + '</span><input type="text" inputmode="decimal" data-k="c' + i + '" value="' + esc(c) + '"></label>'; }).join('') + '</div>' : '') +
      '<div class="fig"></div><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout');
    function draw() {
      var r = tcompute({ first: first, second: { n: sec.n, nb: sec.nb, p: cond } });
      var k = first.length, W = 440, rowH = 44, H = k * 2 * rowH + 10, x0 = 22, x1 = 170, x2 = 330;
      var h = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + esc(T('Arbre pondéré')) + '">';
      var yRoot = H / 2;
      first.forEach(function (b, i) {
        var y1 = (2 * i + 1) * rowH + 5, on = pick && pick[0] === i, pv = r.first && r.first[i] && r.first[i].p;
        h += '<path class="tr-edge' + (on ? ' hl' : '') + '" d="M' + (x0 + 8) + ' ' + yRoot + 'L' + (x1 - 14) + ' ' + y1 + '"/>';
        h += '<text class="lw-t" x="' + ((x0 + x1) / 2 - 4) + '" y="' + ((yRoot + y1) / 2 - 8) + '" text-anchor="middle" style="fill:var(--ink);font-weight:600">' + esc(pv ? fr.str(pv) : '?') + '</text>';
        h += '<text class="sg-name" x="' + x1 + '" y="' + (y1 + 6) + '" style="font-size:18px">' + svgName(b.n) + '</text>';
        [[sec.n, cond[i], 0], [sec.nb, null, 1]].forEach(function (leaf, j) {
          var y2 = y1 + (j ? 1 : -1) * rowH / 2, on2 = on && pick[1] === j, cv = r.cond && r.cond[i] ? (j ? fr.sub(F(1), r.cond[i]) : r.cond[i]) : null;
          h += '<path class="tr-edge' + (on2 ? ' hl' : '') + '" d="M' + (x1 + 16) + ' ' + y1 + 'L' + (x2 - 14) + ' ' + y2 + '"/>';
          h += '<text class="lw-t" x="' + ((x1 + x2) / 2 + 4) + '" y="' + ((y1 + y2) / 2 + (j ? 14 : -6)) + '" text-anchor="middle" style="fill:var(--ink);font-weight:600">' + esc(cv ? fr.str(cv) : '?') + '</text>';
          h += '<g class="sg-el' + (on2 ? ' img' : '') + '" data-l="' + i + ':' + j + '" tabindex="0" role="button"><circle cx="' + x2 + '" cy="' + y2 + '" r="15" /><text x="' + x2 + '" y="' + (y2 + 6) + '">' + svgName(leaf[0]) + '</text></g>';
          var jv = r.joint && r.joint[i] ? (j ? r.joint[i].nB : r.joint[i].B) : null;
          if (jv) h += '<text class="lw-t" x="' + (x2 + 24) + '" y="' + (y2 + 5) + '">' + esc(fr.str(jv)) + '</text>';
        });
      });
      h += '<circle class="tr-node" cx="' + x0 + '" cy="' + yRoot + '" r="6"/></svg>';
      fig.innerHTML = h;
      var t = '';
      if (r.error) t = '<p class="err">' + esc(r.error) + '</p>';
      else {
        if (pick) {
          var i = pick[0], j = pick[1], ev = j ? sec.nb : sec.n, c = j ? fr.sub(F(1), r.cond[i]) : r.cond[i], jv = j ? r.joint[i].nB : r.joint[i].B;
          t += '<p>' + T('Chemin : on multiplie les probabilités le long des branches.') + '</p><div class="fm">' + tx('\\P(' + first[i].n + ' \\cap ' + ev + ') = \\P(' + first[i].n + ') \\times \\P_{' + first[i].n + '}(' + ev + ') = ' + fr.tex(r.first[i].p) + ' \\times ' + fr.tex(c) + ' = ' + fr.tex(jv), true) + '</div>';
        } else t += '<p class="hint">' + T('Clique sur une feuille : le chemin et son produit.') + '</p>';
        var terms = first.map(function (b) { return '\\P(' + b.n + ')\\,\\P_{' + b.n + '}(' + sec.n + ')'; }).join(' + ');
        var nums = first.map(function (b, i) { return fr.tex(r.first[i].p) + ' \\times ' + fr.tex(r.cond[i]); }).join(' + ');
        t += '<p>' + T('Probabilités totales : ') + '</p><div class="fm">' + tx('\\P(' + sec.n + ') = ' + terms, true) + '</div><div class="fm">' + tx('= ' + nums + ' = ' + fr.tex(r.total), true) + '</div>';
        var bi = pick ? pick[0] : 0;
        if (!fr.isZero(r.total)) t += '<p>' + T('Formule de Bayes : ') + '</p><div class="fm">' + tx('\\P_{' + sec.n + '}(' + first[bi].n + ') = \\frac{\\P(' + first[bi].n + ' \\cap ' + sec.n + ')}{\\P(' + sec.n + ')} = \\frac{' + fr.tex(r.joint[bi].B) + '}{' + fr.tex(r.total) + '} = ' + fr.tex(r.bayes[bi].B), true) + '</div>';
      }
      out.innerHTML = t;
    }
    function act(g) { var p = g.getAttribute('data-l').split(':').map(Number); pick = pick && pick[0] === p[0] && pick[1] === p[1] ? null : p; draw(); var a = fig.querySelector('[data-l="' + p.join(':') + '"]'); if (a) a.focus({ preventScroll: true }); }
    fig.addEventListener('click', function (e) { var g = e.target.closest('[data-l]'); if (g) act(g); });
    fig.addEventListener('keydown', function (e) { var g = e.target.closest && e.target.closest('[data-l]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); act(g); } });
    U.$$('input[data-k]', el).forEach(function (inp) {
      inp.addEventListener('input', function () { var k = inp.getAttribute('data-k'), i = +k.slice(1); if (k[0] === 'f') first[i].p = inp.value; else cond[i] = inp.value; draw(); });
    });
    draw();
    return { el: el, compute: function () { return tcompute({ first: first, second: { n: sec.n, nb: sec.nb, p: cond } }); } };
  }

  /* ---------- loi d'une variable aléatoire ---------- */
  function law(el, o) {
    o = o || {};
    var name = o.name || 'X', cfg = { law: o.law || '', n: o.n, p: o.p, a: o.a, b: o.b, x: o.x, pList: o.law ? null : o.p };
    var edit = o.edit !== false && !!o.law;
    el.classList.add('bench', 'lwb');
    el.innerHTML = head(o.title || T('Loi de {X}', { X: tx(name) }), '') + '<div class="bench-body">' +
      (edit ? '<div class="tr-in">' + (cfg.law === 'binom' ? '<label class="fld"><span>n</span><input type="number" min="1" max="30" data-k="n" value="' + esc(cfg.n) + '"></label>' : '') +
        (cfg.law === 'unif' ? '<label class="fld"><span>a</span><input type="number" data-k="a" value="' + esc(cfg.a) + '"></label><label class="fld"><span>b</span><input type="number" data-k="b" value="' + esc(cfg.b) + '"></label>' : '') +
        (cfg.law === 'binom' || cfg.law === 'bern' ? '<label class="fld"><span>p</span><input type="text" inputmode="decimal" data-k="p" value="' + esc(cfg.p) + '"></label>' : '') + '</div>' : '') +
      '<div class="fig"></div><p class="hint">' + T('trait plein : espérance ; pointillés : espérance ± écart type.') + '</p><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout');
    function num(f) { return Number(f.n) / Number(f.d); }   /* position sur le dessin seulement */
    function draw() {
      var L = lawMake(cfg.law ? cfg : { x: cfg.x, p: cfg.pList });
      if (!L.x) { fig.innerHTML = ''; out.innerHTML = '<p class="err">' + esc(L.error || T('Paramètres illisibles.')) + '</p>'; return; }
      var W = 460, H = 230, pl = 40, pr = 16, pt = 22, pb = 34, xs = L.x.map(num), ps = L.p.map(num);
      var lo = Math.min.apply(null, xs), hi = Math.max.apply(null, xs), pad = (hi - lo) * 0.06 + 0.5; lo -= pad; hi += pad;
      var pmax = Math.max.apply(null, ps) || 1;
      var X = function (v) { return pl + (v - lo) / (hi - lo) * (W - pl - pr); }, Y = function (v) { return H - pb - v / pmax * (H - pt - pb); };
      var bw = Math.max(4, Math.min(34, (W - pl - pr) / (xs.length * 1.8)));
      var h = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(T('Loi de {X}', { X: name })) + '">';
      h += '<line class="lw-axis" x1="' + pl + '" y1="' + (H - pb) + '" x2="' + (W - pr) + '" y2="' + (H - pb) + '"/>';
      xs.forEach(function (x, i) {
        h += '<rect class="lw-bar" x="' + (X(x) - bw / 2) + '" y="' + Y(ps[i]) + '" width="' + bw + '" height="' + (H - pb - Y(ps[i])) + '"/>';
        h += '<text class="lw-t" x="' + X(x) + '" y="' + (H - pb + 18) + '" text-anchor="middle">' + esc(fr.str(L.x[i])) + '</text>';
        if (xs.length <= 12) h += '<text class="lw-t" x="' + X(x) + '" y="' + (Y(ps[i]) - 6) + '" text-anchor="middle">' + esc(fr.str(L.p[i])) + '</text>';
      });
      if (!L.error) {
        var mu = num(L.E), sd = L.sd ? Number(L.sd.approx.replace(',', '.')) : 0;
        h += '<line class="lw-mu" x1="' + X(mu) + '" y1="' + (pt - 8) + '" x2="' + X(mu) + '" y2="' + (H - pb) + '"/>';
        if (sd > 0) [mu - sd, mu + sd].forEach(function (v) { h += '<line class="lw-sd" x1="' + X(v) + '" y1="' + (pt + 8) + '" x2="' + X(v) + '" y2="' + (H - pb) + '"/>'; });
      }
      fig.innerHTML = h + '</svg>';
      if (L.error) { out.innerHTML = '<p class="err">' + esc(L.error) + '</p>'; return; }
      var xsT = L.x.map(fr.tex), psT = L.p.map(fr.tex), E = fr.tex(L.E);
      var sumE = L.x.length <= 7 ? xsT.map(function (x, i) { return x + ' \\times ' + psT[i]; }).join(' + ') + ' = ' : '';
      var sumE2 = L.x.length <= 7 ? xsT.map(function (x, i) { return (x.charAt(0) === '-' || x.indexOf('frac') >= 0 ? '(' + x + ')' : x) + '^2 \\times ' + psT[i]; }).join(' + ') + ' = ' : '';
      var t = '<p><b>' + T('Espérance') + '</b></p><div class="fm">' + tx('\\E(' + name + ') = \\sum_{k} x_k\\,\\P(' + name + ' = x_k) = ' + sumE + E, true) + '</div>';
      t += '<p><b>' + T('Variance (Koenig-Huygens)') + '</b></p><div class="fm">' + tx('\\E(' + name + '^2) = ' + sumE2 + fr.tex(L.E2), true) + '</div><div class="fm">' + tx('\\V(' + name + ') = \\E(' + name + '^2) - \\E(' + name + ')^2 = ' + fr.tex(L.E2) + ' - \\left(' + E + '\\right)^2 = ' + fr.tex(L.V), true) + '</div>';
      t += '<p><b>' + T('Écart type') + '</b></p><div class="fm">' + tx('\\sigma(' + name + ') = \\sqrt{\\V(' + name + ')} = ' + L.sd.tex + (L.sd.exact ? '' : ' \\approx ' + L.sd.approx.replace(',', '{,}')), true) + '</div>';
      out.innerHTML = t;
    }
    U.$$('input[data-k]', el).forEach(function (inp) { inp.addEventListener('input', function () { cfg[inp.getAttribute('data-k')] = inp.value; draw(); }); });
    draw();
    return { el: el, make: function () { return lawMake(cfg.law ? cfg : { x: cfg.x, p: cfg.pList }); } };
  }

  /* ================================================================== 8 bis. DÉNOMBREMENT (exact, BigInt) */
  function arr(n, p) { n = big(n); p = big(p); if (p < Z || p > n) return Z; var r = ONE; for (var i = Z; i < p; i++) r *= n - i; return r; }
  /* entier → TeX, milliers séparés (\, en français, {,} en anglais) */
  function intTex(x) {
    var s = big(x).toString(), neg = s.charAt(0) === '-'; if (neg) s = s.slice(1);
    if (s.length > 3) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, EN ? '{,}' : '\\,');
    return (neg ? '-' : '') + s;
  }
  var LEAVES = ['list', 'perm', 'arr', 'comb', 'multi'];
  function count(leaf, n, p) {
    n = big(n); p = big(p == null ? n : p);
    switch (leaf) {
      case 'list': return n ** p;
      case 'perm': return fact(n);
      case 'arr': return arr(n, p);
      case 'comb': return binom(n, p);
      case 'multi': return binom(n + p - ONE, p);
    }
    return null;
  }
  function prodTex(n, p) { var t = []; for (var i = 0; i < p; i++) t.push(String(n - i)); return t.join(' \\times '); }
  /* « A_{10}^{3} = 10 \times 9 \times 8 = 720 » : la formule, son calcul quand il est court, le résultat */
  function countTex(leaf, n, p) {
    n = Number(n); p = p == null ? n : Number(p);
    var v = intTex(count(leaf, n, p)), mid = '';
    switch (leaf) {
      case 'list': return n + '^{' + p + '} = ' + v;
      case 'perm': return n + '! = ' + (n >= 2 && n <= 6 ? prodTex(n, n) + ' = ' : '') + v;
      case 'arr':
        if (p >= 2 && p <= 6) mid = prodTex(n, p) + ' = ';
        else if (p > 6) mid = '\\frac{' + n + '!}{' + (n - p) + '!} = ';
        return 'A_{' + n + '}^{' + p + '} = ' + mid + v;
      case 'comb':
        var q = Math.min(p, n - p);
        if (q >= 2 && q <= 5) mid = '\\frac{' + prodTex(n, q) + '}{' + q + '!} = ';
        else if (q > 5) mid = '\\frac{' + n + '!}{' + p + '!\\,' + (n - p) + '!} = ';
        return '\\binom{' + n + '}{' + p + '} = ' + mid + v;
      case 'multi': return '\\binom{' + n + ' + ' + p + ' - 1}{' + p + '} = \\binom{' + (n + p - 1) + '}{' + p + '} = ' + v;
    }
    return '';
  }
  function pascalRows(N) { var rows = []; for (var n = 0; n <= N; n++) { var r = []; for (var k = 0; k <= n; k++) r.push(binom(n, k)); rows.push(r); } return rows; }
  function pascalRel(n, k) {
    var o = { n: n, k: k, value: binom(n, k), edge: k === 0 || k === n };
    if (!o.edge) { o.left = { n: n - 1, k: k - 1, v: binom(n - 1, k - 1) }; o.right = { n: n - 1, k: k, v: binom(n - 1, k) }; }
    return o;
  }
  /* arbre « quelle formule ? » : chemin '1' = oui, '0' = non */
  var CHT = { q: 'order', y: { q: 'rep', y: { leaf: 'list' }, n: { q: 'all', y: { leaf: 'perm' }, n: { leaf: 'arr' } } },
    n: { q: 'rep', y: { leaf: 'multi' }, n: { leaf: 'comb' } } };
  function chAt(path) { var nd = CHT; for (var i = 0; i < path.length; i++) { if (!nd || nd.leaf) return null; nd = path.charAt(i) === '1' ? nd.y : nd.n; } return nd || null; }
  function chPath(leaf) {
    var found = null;
    (function walk(nd, p) { if (found) return; if (nd.leaf) { if (nd.leaf === leaf) found = p; return; } walk(nd.y, p + '1'); walk(nd.n, p + '0'); })(CHT, '');
    return found;
  }

  /* styles des deux outils (maths.css ne les a pas) : injectés une fois, aux couleurs du thème */
  function toolCSS() {
    if (typeof document === 'undefined' || document.getElementById('maths-denomb-css')) return;
    var st = document.createElement('style');
    st.id = 'maths-denomb-css';
    st.textContent = [
      '.pcb .pc-scroll{overflow-x:auto;min-width:0}',
      '.pcb table.pc{border-collapse:collapse;margin:0 auto;font-family:var(--font-ui);font-variant-numeric:tabular-nums}',
      '.pcb .pc th,.pcb .pc td{padding:0;text-align:center;border:1px solid var(--line);min-width:2.5rem;height:2.4rem}',
      '.pcb .pc thead th,.pcb .pc tbody th{background:var(--surface-2);color:var(--muted);font-weight:500;font-size:.9rem;padding:0 .3rem}',
      '.pcb .pc thead th:first-child{font-size:.82rem}',
      '.pcb .pc td.void{background:repeating-linear-gradient(135deg,transparent 0 6px,var(--line) 6px 7px)}',
      '.pcb .pc button{font:inherit;font-weight:600;font-size:1rem;width:100%;min-height:2.4rem;padding:0 .35rem;border:0;background:transparent;color:var(--ink);cursor:pointer}',
      '.pcb .pc tbody th button{font-weight:500;color:var(--muted)}',
      '.pcb .pc button:hover{background:var(--accent-soft)}',
      '.pcb .pc button:focus-visible{outline:2px solid var(--accent);outline-offset:-2px}',
      '.pcb .pc td.row{background:var(--accent-soft)}',
      '.pcb .pc td.pa{box-shadow:inset 0 0 0 3px var(--z2)} .pcb .pc td.pb{box-shadow:inset 0 0 0 3px var(--z3)}',
      '.pcb .pc td.tgt button,.pcb .pc td.mir button{background:var(--accent);color:var(--on-accent)}',
      '.pcb .pc td.new button{color:var(--accent)} .pcb .pc td.new{background:var(--accent-soft)}',
      '.pcb .pc td.later button{visibility:hidden}',
      '.pcb .pc-key{display:flex;flex-wrap:wrap;gap:4px 16px;font-family:var(--font-ui);font-size:.82rem;color:var(--muted)}',
      '.pcb .pc-key i{display:inline-block;width:.9rem;height:.9rem;margin-right:.35rem;vertical-align:-.1rem;border-radius:2px}',
      '.pcb .pc-key .ka{box-shadow:inset 0 0 0 3px var(--z2)} .pcb .pc-key .kb{box-shadow:inset 0 0 0 3px var(--z3)} .pcb .pc-key .kt{background:var(--accent)}',
      '.katex .pz2{color:var(--z2)} .katex .pz3{color:var(--z3)}',
      '.pcb .pc-in{display:flex;flex-wrap:wrap;gap:8px;align-items:end} .pcb .pc-in .fld{width:9rem}',
      '@media (max-width:440px){.pcb .pc th,.pcb .pc td{min-width:2.15rem}.pcb .pc button{padding:0 .2rem;font-size:.95rem}.pcb .bench-body,.chb .bench-body{padding:.8rem}}',
      '.chb .ch-tree,.chb .ch-tree ul{list-style:none;margin:0;padding:0}',
      '.chb .ch-tree ul{margin:.35rem 0 0 .55rem;padding-left:1rem;border-left:1.5px solid var(--line);display:grid;gap:.35rem}',
      '.chb .ch-tree li{position:relative;min-width:0}',
      '.chb .ch-tree ul>li::before{content:"";position:absolute;left:-1rem;top:1.15rem;width:.8rem;border-top:1.5px solid var(--line)}',
      '.chb .ch-q{font-family:var(--font-ui);font-weight:600;font-size:.98rem;line-height:1.3}',
      '.chb .ch-h{display:block;font-weight:400;font-size:.84rem;color:var(--muted);margin-top:.1rem}',
      '.chb .ch-br{display:flex;flex-wrap:wrap;align-items:center;gap:.35rem .6rem}',
      '.chb .ch-a{font:inherit;font-family:var(--font-ui);font-size:.88rem;font-weight:600;min-height:34px;min-width:3.2rem;border:1px solid var(--line);border-radius:999px;background:var(--surface);color:var(--ink);cursor:pointer;padding:.15rem .7rem}',
      '.chb .ch-a:hover{border-color:var(--accent)}',
      '.chb .ch-a:focus-visible{outline:2px solid var(--accent);outline-offset:2px}',
      '.chb .ch-a[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}',
      '.chb .ch-leaf{font-size:1.02rem;padding:.1rem .45rem;border-radius:var(--radius);border:1px dashed transparent}',
      '.chb .ch-leaf.off{color:var(--muted)}',
      '.chb li.on>.ch-br>.ch-leaf{border-color:var(--accent);background:var(--accent-soft)}',
      '.chb li.dim{opacity:.42}',
      '.chb li.on>ul{border-left-color:var(--accent)}',
      '.chb .ch-card{border-top:1px solid var(--line);padding-top:.8rem;display:grid;gap:.45rem}',
      '.chb .ch-card ul{margin:0;padding-left:1.2rem;display:grid;gap:.3rem}',
      '.chb .ch-card li>div{overflow-x:auto;overflow-y:hidden}',
      '.chb .ch-sit{background:var(--surface-2);border-radius:var(--radius);padding:.7rem .9rem;display:grid;gap:.35rem}',
      '.chb .ch-sit .lbl{color:var(--exam)}',
      '@media print{.pcb .pc td.later button{visibility:visible}.pcb .pc-scroll,.chb .ch-card li>div{overflow:visible !important}.chb li.dim{opacity:1}}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- triangle de Pascal ---------- */
  function pascal(el, o) {
    o = o || {};
    toolCSS();
    var N = Math.max(0, Math.min(12, o.n == null ? 6 : +o.n)), mode = o.mode || 'pascal';
    var modes = o.modes || ['pascal', 'sym', 'row'], build = !!o.build, edit = o.edit !== false;
    var pick = o.pick ? [+o.pick[0], +o.pick[1]] : null, rowPick = o.row != null && +o.row <= N ? +o.row : null, st = null, shown = N;
    var LAB = { pascal: T('Pascal'), sym: T('Symétrie'), row: T('Somme d’une ligne') };
    el.classList.add('bench', 'pcb');
    el.innerHTML = head(o.title || T('Triangle de Pascal'), '') + '<div class="bench-body">' +
      ((modes.length > 1 || edit) ? '<div class="pc-in">' + (modes.length > 1 ? '<div class="row" role="group">' + modes.map(function (m) { return '<button type="button" class="chip-btn" data-m="' + m + '" aria-pressed="' + (m === mode) + '">' + LAB[m] + '</button>'; }).join('') + '</div>' : '') +
        (edit ? '<label class="fld"><span>' + T('Dernière ligne n') + '</span><input type="number" min="0" max="12" value="' + N + '"></label>' : '') + '</div>' : '') +
      '<div class="pc-scroll"></div><div class="pc-key"></div><div class="readout" aria-live="polite"></div></div>';
    var box = el.querySelector('.pc-scroll'), out = el.querySelector('.readout'), key = el.querySelector('.pc-key');
    if (pick && (pick[0] > N || pick[1] > pick[0] || pick[1] < 0)) pick = null;
    function b(n, k) { return '\\binom{' + n + '}{' + k + '}'; }
    function draw() {
      var rows = pascalRows(N), rel = pick && mode === 'pascal' ? pascalRel(pick[0], pick[1]) : null;
      var h = '<table class="pc"><thead><tr><th scope="col">' + tx('n \\backslash k') + '</th>';
      for (var k = 0; k <= N; k++) h += '<th scope="col">' + k + '</th>';
      h += '</tr></thead><tbody>';
      rows.forEach(function (r, n) {
        var later = build && n > shown;
        h += '<tr><th scope="row">' + (mode === 'row' && !later ? '<button type="button" data-row="' + n + '" aria-label="n = ' + n + '">' + n + '</button>' : n) + '</th>';
        for (var k = 0; k <= N; k++) {
          if (k > n) { h += '<td class="void"></td>'; continue; }
          var c = [];
          if (later) c.push('later');
          if (build && n === shown && !later && shown > 0 && !pick && rowPick == null) c.push('new');
          if (pick && pick[0] === n && pick[1] === k && mode !== 'row') c.push('tgt');
          if (rel && !rel.edge && rel.left.n === n && rel.left.k === k) c.push('pa');
          if (rel && !rel.edge && rel.right.n === n && rel.right.k === k) c.push('pb');
          if (pick && mode === 'sym' && pick[0] === n && pick[0] - pick[1] === k && k !== pick[1]) c.push('mir');
          if (mode === 'row' && rowPick === n) c.push('row');
          h += '<td' + (c.length ? ' class="' + c.join(' ') + '"' : '') + '><button type="button" data-n="' + n + '" data-k="' + k + '"' + (later ? ' tabindex="-1" aria-hidden="true"' : '') + ' aria-label="C(' + n + ', ' + k + ') = ' + r[k] + '">' + r[k].toString() + '</button></td>';
        }
        h += '</tr>';
      });
      box.innerHTML = h + '</tbody></table>';
      key.innerHTML = rel && !rel.edge ? '<span><i class="kt"></i>' + T('le nombre choisi') + '</span><span><i class="ka"></i>' + T('au-dessus à gauche') + '</span><span><i class="kb"></i>' + T('au-dessus') + '</span>' : '';
      say();
    }
    function say() {
      var t = '';
      if (build && !pick && rowPick == null) {
        var n = shown;
        if (n === 0) t = '<p>' + mathify(T('Ligne 0 : \\(\\binom{0}{0} = 1\\) (une seule partie de l’ensemble vide : lui-même).')) + '</p>';
        else {
          var parts = [];
          for (var k = 0; k <= n; k++) parts.push(k === 0 || k === n ? '1' : binom(n - 1, k - 1) + ' + ' + binom(n - 1, k) + ' = ' + binom(n, k));
          t = '<p>' + T('Ligne {n} : les bords valent 1, chaque autre case est la somme des deux cases au-dessus d’elle.', { n: n }) + '</p><div class="fm">' + tx(parts.join(',\\quad '), true) + '</div>';
        }
      } else if (mode === 'row') {
        if (rowPick == null) t = '<p class="hint">' + T('Clique sur une ligne : sa somme et le développement du binôme.') + '</p>';
        else {
          var m = rowPick, terms = [], poly = [];
          for (var j = 0; j <= m; j++) {
            terms.push(binom(m, j).toString());
            var c = binom(m, j), xp = m - j, yp = j, mono = (xp ? 'x' + (xp > 1 ? '^{' + xp + '}' : '') : '') + (yp ? 'y' + (yp > 1 ? '^{' + yp + '}' : '') : '');
            poly.push((c === ONE && mono ? '' : c.toString()) + mono);
          }
          t = '<p>' + mathify(T(m ? 'Ligne {n} : la somme vaut \\(2^{{n}}\\), le nombre de parties d’un ensemble à {n} éléments.' : 'Ligne {n} : la somme vaut \\(2^{{n}}\\) (une seule partie : l’ensemble vide).', { n: m })) + '</p>' +
            '<div class="fm">' + tx('\\sum_{k=0}^{' + m + '} ' + b(m, 'k') + ' = ' + terms.join(' + ') + ' = ' + intTex(ONE << BigInt(m)) + ' = 2^{' + m + '}', true) + '</div>' +
            '<p>' + T('Les coefficients de la ligne sont ceux de la formule du binôme :') + '</p><div class="fm">' + tx('(x + y)^{' + m + '} = ' + poly.join(' + '), true) + '</div>';
        }
      } else if (!pick) t = '<p class="hint">' + T(mode === 'sym' ? 'Clique sur un nombre : son symétrique dans la ligne s’allume.' : 'Clique sur un nombre : ses deux voisins du dessus s’allument.') + '</p>';
      else if (mode === 'sym') {
        var n2 = pick[0], k2 = pick[1];
        t = '<p>' + T('Symétrie : choisir les {k} éléments qu’on prend revient à choisir les {m} qu’on laisse.', { k: k2, m: n2 - k2 }) + '</p><div class="fm">' + tx(b(n2, k2) + ' = ' + b(n2, n2 - k2) + ' = ' + intTex(binom(n2, k2)), true) + '</div>';
      } else {
        var r = pascalRel(pick[0], pick[1]);
        if (r.edge) t = '<p>' + mathify(T('Bord du triangle : \\(\\binom{n}{0} = \\binom{n}{n} = 1\\).')) + '</p><div class="fm">' + tx(b(r.n, r.k) + ' = 1', true) + '</div>';
        else t = '<p>' + T('Relation de Pascal : le nombre est la somme du nombre au-dessus à gauche et du nombre au-dessus.') + '</p><div class="fm">' +
          tx(b(r.n, r.k) + ' = \\htmlClass{pz2}{' + b(r.left.n, r.left.k) + '} + \\htmlClass{pz3}{' + b(r.right.n, r.right.k) + '} = \\htmlClass{pz2}{' + intTex(r.left.v) + '} + \\htmlClass{pz3}{' + intTex(r.right.v) + '} = ' + intTex(r.value), true) + '</div>';
      }
      out.innerHTML = t;
    }
    box.addEventListener('click', function (e) {
      var bt = e.target.closest('button'); if (!bt) return;
      if (bt.hasAttribute('data-row')) { rowPick = +bt.getAttribute('data-row'); draw(); var f = box.querySelector('[data-row="' + rowPick + '"]'); if (f) f.focus({ preventScroll: true }); return; }
      var n = +bt.getAttribute('data-n'), k = +bt.getAttribute('data-k');
      if (build && n > shown) return;
      if (mode === 'row') rowPick = n; else pick = pick && pick[0] === n && pick[1] === k ? null : [n, k];
      draw();
      var g = box.querySelector('[data-n="' + n + '"][data-k="' + k + '"]'); if (g) g.focus({ preventScroll: true });
    });
    U.$$('[data-m]', el).forEach(function (bt) {
      bt.addEventListener('click', function () { mode = bt.getAttribute('data-m'); U.$$('[data-m]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === bt)); }); if (mode === 'row' && rowPick == null && pick) rowPick = pick[0]; draw(); });
    });
    var inp = el.querySelector('input[type="number"]');
    if (inp) inp.addEventListener('input', function () {
      var v = parseInt(inp.value, 10);
      if (isNaN(v) || v < 0 || v > 12) { out.innerHTML = '<p class="err">' + T('Entre 0 et 12.') + '</p>'; return; }
      N = v; if (pick && pick[0] > N) pick = null; if (rowPick != null && rowPick > N) rowPick = null;
      if (st) { shown = Math.min(shown, N); st.setTotal(N); } else shown = N;
      draw();
    });
    if (build) { shown = 0; st = stepper(el, N, function (k) { shown = k; pick = null; rowPick = null; draw(); }, 0); }
    else draw();
    return { el: el, rows: function () { return pascalRows(N); } };
  }

  /* ---------- arbre « quelle formule ? » ---------- */
  var CHQ = {
    order: ['L’ordre compte ?', 'Échange deux éléments : obtiens-tu un autre résultat ? Podium, code, mot : oui. Main de cartes, comité : non.'],
    rep: ['Répétition possible ?', 'Un élément peut-il revenir ? Tirage avec remise, chiffres d’un code : oui. Personnes distinctes, sans remise : non.'],
    all: ['Tous les éléments ?', 'Range-t-on les n éléments, sans en laisser (p = n) ?']
  };
  var CHL = {
    list: { tex: 'n^p', name: 'p-listes (p-uplets)', what: 'applications de E dans F ; tirages successifs avec remise ; mots, codes, mots de passe.',
      ex: [{ t: 'Codes à 4 chiffres', n: 10, p: 4 }, { t: 'Applications d’un ensemble à 3 éléments dans un ensemble à 4 éléments', n: 4, p: 3 }, { t: 'Mots réponses d’un QCM de 5 questions à 6 lettres (TD 1 ex. 2.11)', n: 6, p: 5 }] },
    perm: { tex: 'n!', name: 'permutations', what: 'bijections de F dans F ; ranger n objets ; anagrammes d’un mot aux lettres distinctes.',
      ex: [{ t: '6 élèves sur 6 chaises', n: 6 }, { t: 'Anagrammes de « computer »', n: 8 }] },
    arr: { tex: 'A_n^p = \\frac{n!}{(n-p)!}', name: 'arrangements', what: 'applications injectives ; tirages successifs sans remise ; podiums, postes distincts.',
      ex: [{ t: 'Podiums d’une course de 10 coureurs', n: 10, p: 3 }, { t: 'Codes à 4 chiffres distincts', n: 10, p: 4 }, { t: 'Un président et un trésorier parmi 100 adhérents', n: 100, p: 2 }] },
    comb: { tex: '\\binom{n}{p} = \\frac{n!}{p!\\,(n-p)!}', name: 'combinaisons', what: 'parties à p éléments ; tirages simultanés ; mains de cartes, comités, groupes.',
      ex: [{ t: 'Mains de 5 cartes dans un jeu de 32', n: 32, p: 5 }, { t: 'Comités de 3 élèves parmi 20', n: 20, p: 3 }] },
    multi: { tex: '\\binom{n+p-1}{p}', name: 'combinaisons avec répétition (hors du cours)', what: 'listes croissantes (TD 1, exercice 4.20) ; pas au programme de l’examen.',
      ex: [{ t: 'Listes croissantes de longueur 2 dans \\(\\ent{0}{4}\\)', n: 5, p: 2 }] }
  };
  function choose(el, o) {
    o = o || {};
    toolCSS();
    var sits = o.situations || null, si = 0, path = '', firstTry = true, scored = false, score = 0, done = false, examples = o.examples || {};
    el.classList.add('bench', 'chb');
    el.innerHTML = head(o.title || T('Quelle formule ?'), '') + '<div class="bench-body">' +
      (sits ? '<div class="ch-sit" aria-live="polite"></div>' : '') + '<div class="ch-tree-box"></div><div class="readout ch-card" aria-live="polite"></div></div>' +
      (sits ? '<div class="ctrls"><div class="row"><button type="button" class="btn" data-a="redo">' + T('Changer de réponse') + '</button><button type="button" class="btn primary" data-a="next">' + T('Situation suivante') + '</button><span class="cnt"></span></div></div>' : '');
    var treeBox = el.querySelector('.ch-tree-box'), out = el.querySelector('.ch-card'), sitBox = el.querySelector('.ch-sit');
    function leafTex(l) { return tx(CHL[l].tex); }
    function nodeHTML(nd, p) {
      if (nd.leaf) return '';
      var q = CHQ[nd.q], h = '<div class="ch-q">' + T(q[0]) + '<span class="ch-h">' + mathify(T(q[1])) + '</span></div><ul>';
      [['1', nd.y, T('oui')], ['0', nd.n, T('non')]].forEach(function (br) {
        var bp = p + br[0], on = path.indexOf(bp) === 0, dim = path.length > p.length && path.indexOf(p) === 0 && path.charAt(p.length) !== br[0];
        h += '<li class="' + (on ? 'on' : '') + (dim ? ' dim' : '') + '"><div class="ch-br"><button type="button" class="ch-a" data-p="' + bp + '" aria-pressed="' + on + '">' + br[2] + '</button>' +
          (br[1].leaf ? '<span class="ch-leaf' + (br[1].leaf === 'multi' ? ' off' : '') + '">' + leafTex(br[1].leaf) + '</span>' : '') + '</div>' + nodeHTML(br[1], bp) + '</li>';
      });
      return h + '</ul>';
    }
    function exLine(e, leaf) { return '<li>' + mathify(T(e.t)) + '<div>' + tx(countTex(leaf, e.n, e.p)) + '</div></li>'; }
    function draw(focus) {
      treeBox.innerHTML = '<div class="ch-tree">' + nodeHTML(CHT, '') + '</div>';
      var nd = chAt(path), t = '';
      if (sits) {
        var s = sits[si];
        sitBox.innerHTML = done ? '<p><b>' + T('Toutes les situations sont faites : {ok} / {n} du premier coup.', { ok: score, n: sits.length }) + '</b></p>'
          : '<span class="lbl">' + T('Situation {i} / {n}', { i: si + 1, n: sits.length }) + '</span><div>' + mathify(s.t) + '</div>';
        if (!done && nd && nd.leaf) {
          var good = nd.leaf === s.leaf;
          t = '<p class="' + (good ? 'okmsg' : 'err') + '">' + T(good ? 'Bonne formule.' : 'Ce n’est pas cette formule.') + '</p>' +
            (s.why ? '<p>' + mathify(s.why) + '</p>' : '') +
            '<div class="fm">' + (good ? '' : '<span class="hint">' + T('La bonne : ') + '</span>') + tx(countTex(s.leaf, s.n, s.p), true) + '</div>';
          if (good) { var nx = el.querySelector('[data-a="next"]'); if (nx) nx.disabled = false; }
        } else if (!done) t = '<p class="hint">' + T('Réponds aux questions de l’arbre, en partant du haut.') + '</p>';
        var c = el.querySelector('.cnt'); if (c) c.textContent = score + ' / ' + sits.length;
      } else if (nd && nd.leaf) {
        var L = CHL[nd.leaf], ex = examples[nd.leaf] || L.ex;
        t = '<p><b>' + T(L.name) + '</b></p><div class="fm">' + tx(L.tex, true) + '</div><p>' + T('Modèles : ') + T(L.what) + '</p>' +
          '<p class="lbl">' + T('Exemples') + '</p><ul>' + ex.map(function (e) { return exLine(e, nd.leaf); }).join('') + '</ul>';
      } else t = '<p class="hint">' + T('Réponds aux questions de l’arbre, en partant du haut.') + '</p>';
      out.innerHTML = t;
      if (focus) { var f = treeBox.querySelector('[data-p="' + focus + '"]'); if (f) f.focus({ preventScroll: true }); }
    }
    treeBox.addEventListener('click', function (e) {
      var bt = e.target.closest('[data-p]'); if (!bt || done) return;
      var p = bt.getAttribute('data-p');
      if (sits && chAt(path) && chAt(path).leaf && chAt(path).leaf === sits[si].leaf) return;   /* réponse juste : figée */
      path = path === p ? p.slice(0, -1) : p;
      var nd = chAt(path);
      if (sits && nd && nd.leaf) { if (nd.leaf !== sits[si].leaf) firstTry = false; else if (firstTry && !scored) { score++; scored = true; } }
      draw(p);
    });
    if (sits) {
      el.querySelector('.ctrls').addEventListener('click', function (e) {
        var bt = e.target.closest('[data-a]'); if (!bt) return;
        if (bt.getAttribute('data-a') === 'redo') { if (done) { si = 0; score = 0; done = false; firstTry = true; scored = false; } path = ''; draw(); return; }
        if (si < sits.length - 1) { si++; path = ''; firstTry = true; scored = false; } else done = true;
        bt.disabled = true; draw();
      });
      el.querySelector('[data-a="next"]').disabled = true;
    }
    draw();
    return { el: el, path: function () { return path; } };
  }

  /* ================================================================== 8 ter. COURBES : IMAGES D'INTERVALLES EXACTES */
  /* Nombres exacts (bornes affichées) : { k: 'q', n, d } rationnel · { k: 'pi', n, d } (n/d)π · { k: 'rt', n, d, m } (n/d)√m
     (m sans facteur carré) · { k: 'e', x } e^x (x rationnel ou multiple de π) · { k: 'ln', x, s } s·ln x · { k: 'inf', s } ±∞.
     v : valeur approchée, seulement pour ranger les bornes et dessiner (deux nombres exacts distincts de ces formes ont
     des valeurs très éloignées). Égalité : même écriture réduite (cle). */
  var PI = Math.PI;
  function igcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
  function nq(n, d) { d = d == null ? 1 : d; if (d < 0) { n = -n; d = -d; } var g = igcd(n, d); n /= g; d /= g; if (!n) d = 1; return { k: 'q', n: n, d: d, v: n / d }; }
  function npi(n, d) { d = d == null ? 1 : d; if (!n) return nq(0); if (d < 0) { n = -n; d = -d; } var g = igcd(n, d); n /= g; d /= g; return { k: 'pi', n: n, d: d, v: n / d * PI }; }
  function nrt(n, d, m) {
    if (!n || !m) return nq(0);
    var s = 1, r = m;
    for (var f = 2; f * f <= r; f++) while (r % (f * f) === 0) { r /= f * f; s *= f; }
    n *= s; if (r === 1) return nq(n, d);
    if (d < 0) { n = -n; d = -d; } var g = igcd(n, d); n /= g; d /= g;
    return { k: 'rt', n: n, d: d, m: r, v: n / d * Math.sqrt(r) };
  }
  function ninf(s) { return { k: 'inf', s: s, v: s * Infinity }; }
  function nexp(x) {
    if (!x) return null;
    if (x.k === 'q' && x.n === 0) return nq(1);
    if (x.k === 'q' || x.k === 'pi') return { k: 'e', x: x, v: Math.exp(x.v) };
    if (x.k === 'ln') return x.s > 0 ? x.x : x.x.k === 'q' ? nq(x.x.d, x.x.n) : null;
    if (x.k === 'inf') return x.s > 0 ? ninf(1) : nq(0);
    return null;
  }
  function nln(x) {
    if (!x || x.v <= 0) return null;
    if (x.k === 'inf') return ninf(1);
    if (x.k === 'e') return x.x;
    if (x.k === 'q') { if (x.n === x.d) return nq(0); if (x.n < x.d) return { k: 'ln', x: nq(x.d, x.n), s: -1, v: -Math.log(x.d / x.n) }; }
    if (x.k === 'q' || x.k === 'pi') return { k: 'ln', x: x, s: 1, v: Math.log(x.v) };
    return null;
  }
  function ncle(x) {
    if (!x) return '?';
    switch (x.k) {
      case 'q': case 'pi': return x.k + x.n + '/' + x.d;
      case 'rt': return 'rt' + x.n + '/' + x.d + 'r' + x.m;
      case 'e': return 'e(' + ncle(x.x) + ')';
      case 'ln': return 'ln' + x.s + '(' + ncle(x.x) + ')';
      case 'inf': return 'inf' + x.s;
    }
    return '?';
  }
  function neq(a, b) { return ncle(a) === ncle(b); }
  function ncmp(a, b) { if (neq(a, b)) return 0; var d = a.v - b.v; return d < 0 ? -1 : d > 0 ? 1 : 0; }
  function nneg(x) {
    if (!x) return null;
    switch (x.k) {
      case 'q': return nq(-x.n, x.d);
      case 'pi': return npi(-x.n, x.d);
      case 'rt': return nrt(-x.n, x.d, x.m);
      case 'ln': return { k: 'ln', x: x.x, s: -x.s, v: -x.v };
      case 'inf': return ninf(-x.s);
    }
    return null;
  }
  /* somme de deux nombres de même sorte (rationnels, multiples de π), 0 neutre */
  function nadd(a, b) {
    if (!a || !b) return null;
    if (a.k === 'q' && a.n === 0) return b;
    if (b.k === 'q' && b.n === 0) return a;
    if (a.k === 'q' && b.k === 'q') return nq(a.n * b.d + b.n * a.d, a.d * b.d);
    if (a.k === 'pi' && b.k === 'pi') return npi(a.n * b.d + b.n * a.d, a.d * b.d);
    return null;
  }
  /* écriture TeX d'un nombre exact */
  function ntex(x) {
    if (!x) return '?';
    var sg = x.n < 0 ? '-' : '', a = Math.abs(x.n);
    switch (x.k) {
      case 'q': return sg + (x.d === 1 ? String(a) : '\\frac{' + a + '}{' + x.d + '}');
      case 'pi': return sg + (x.d === 1 ? (a === 1 ? '' : a) + '\\pi' : '\\frac{' + (a === 1 ? '' : a) + '\\pi}{' + x.d + '}');
      case 'rt': return sg + (x.d === 1 ? (a === 1 ? '' : a) + '\\sqrt{' + x.m + '}' : '\\frac{' + (a === 1 ? '' : a) + '\\sqrt{' + x.m + '}}{' + x.d + '}');
      case 'e': return x.x.k === 'q' && x.x.n === 1 && x.x.d === 1 ? 'e' : 'e^{' + ntex(x.x) + '}';
      case 'ln': return (x.s < 0 ? '-' : '') + '\\ln ' + (x.x.k === 'q' && x.x.d === 1 ? x.x.n : x.x.k === 'pi' && x.x.n === 1 && x.x.d === 1 ? '\\pi' : '\\left(' + ntex(x.x) + '\\right)');
      case 'inf': return x.s > 0 ? '+\\infty' : '-\\infty';
    }
    return '?';
  }
  /* écriture en texte (menus, étiquettes du dessin) */
  var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  function ntxt(x) {
    if (!x) return '?';
    var sg = x.n < 0 ? MINUS : '', a = Math.abs(x.n);
    switch (x.k) {
      case 'q': return sg + a + (x.d === 1 ? '' : '/' + x.d);
      case 'pi': return sg + (a === 1 ? '' : a) + 'π' + (x.d === 1 ? '' : '/' + x.d);
      case 'rt': return sg + (a === 1 ? '' : a) + '√' + x.m + (x.d === 1 ? '' : '/' + x.d);
      case 'e':
        if (x.x.k === 'q' && x.x.d === 1) return x.x.n === 1 ? 'e' : 'e' + String(x.x.n).split('').map(function (c) { return SUP[c]; }).join('');
        return 'e^(' + ntxt(x.x) + ')';
      case 'ln': return (x.s < 0 ? MINUS : '') + 'ln ' + ntxt(x.x);
      case 'inf': return x.s > 0 ? '+∞' : MINUS + '∞';
    }
    return '?';
  }
  /* étiquette SVG : comme ntxt, avec un vrai exposant pour e^(π/2) */
  function nsvg(x) {
    if (x && x.k === 'e' && !(x.x.k === 'q' && x.x.d === 1)) return 'e<tspan baseline-shift="super" font-size="75%">' + esc(ntxt(x.x)) + '</tspan>';
    return esc(ntxt(x));
  }
  /* lecture : '-pi/2', '3pi/4', 'sqrt2/2', '-sqrt(3)/2', '2sqrt2', 'e', 'e^2', 'e^(pi/2)', 'ln2', '-ln(pi)', '1/2', '0.5', '+inf' */
  function nparse(s) {
    s = String(s).replace(/[\s  ]/g, '').replace(/[−–]/g, '-').replace(/\\pi|π/g, 'pi').replace(/\\sqrt|√/g, 'sqrt').replace(/\\infty|∞/g, 'inf').replace(/\\ln/g, 'ln').replace(/[{}]/g, '');
    var m, sg;
    if ((m = /^([+-]?)inf(?:ty)?$/.exec(s))) return ninf(m[1] === '-' ? -1 : 1);
    if ((m = /^([+-]?)(\d*)pi(?:\/(\d+))?$/.exec(s))) return npi((m[1] === '-' ? -1 : 1) * (m[2] ? +m[2] : 1), m[3] ? +m[3] : 1);
    if ((m = /^([+-]?)(\d*)sqrt\(?(\d+)\)?(?:\/(\d+))?$/.exec(s))) return nrt((m[1] === '-' ? -1 : 1) * (m[2] ? +m[2] : 1), m[4] ? +m[4] : 1, +m[3]);
    if ((m = /^e(?:\^\(?([^()]+)\)?)?$/.exec(s))) { var ex = m[1] ? nparse(m[1]) : nq(1); return ex && (ex.k === 'q' || ex.k === 'pi') ? nexp(ex) : null; }
    if ((m = /^([+-]?)ln\(?([^()]+)\)?$/.exec(s))) { var l = nln(nparse(m[2])); return l && m[1] === '-' ? nneg(l) : l; }
    if ((m = /^([+-]?)(\d+)(?:\.(\d+))?(?:\/(\d+))?$/.exec(s))) {
      sg = m[1] === '-' ? -1 : 1;
      var den = m[3] ? Math.pow(10, m[3].length) : 1, num = +(m[2] + (m[3] || ''));
      return nq(sg * num, den * (m[4] ? +m[4] : 1));
    }
    return null;
  }
  /* intervalles { a, b, ac, bc } (ac, bc : bornes fermées) ; un ensemble = liste triée d'intervalles disjoints */
  function ivl(a, b, ac, bc) { return { a: a, b: b, ac: !!ac && a.k !== 'inf', bc: !!bc && b.k !== 'inf' }; }
  function iempty(I) { var c = ncmp(I.a, I.b); return c > 0 || (c === 0 && !(I.ac && I.bc)); }
  function ising(I) { return ncmp(I.a, I.b) === 0; }
  function iinter(I, J) {
    var ca = ncmp(I.a, J.a), cb = ncmp(I.b, J.b);
    var a = ca > 0 ? I.a : J.a, ac = ca === 0 ? I.ac && J.ac : ca > 0 ? I.ac : J.ac;
    var b = cb < 0 ? I.b : J.b, bc = cb === 0 ? I.bc && J.bc : cb < 0 ? I.bc : J.bc;
    var r = { a: a, b: b, ac: ac, bc: bc };
    return iempty(r) ? null : r;
  }
  function sunion(list) {
    var l = list.filter(function (I) { return I && !iempty(I); }).slice().sort(function (I, J) { return ncmp(I.a, J.a) || (I.ac === J.ac ? 0 : I.ac ? -1 : 1); });
    var out = [];
    l.forEach(function (I) {
      var c = out[out.length - 1];
      if (c) {
        var t = ncmp(I.a, c.b);
        if (t < 0 || (t === 0 && (c.bc || I.ac))) {
          var u = ncmp(I.b, c.b);
          if (u > 0) { c.b = I.b; c.bc = I.bc; } else if (u === 0) c.bc = c.bc || I.bc;
          return;
        }
      }
      out.push({ a: I.a, b: I.b, ac: I.ac, bc: I.bc });
    });
    return out;
  }
  function sinter(S1, S2) { var out = []; S1.forEach(function (I) { S2.forEach(function (J) { var r = iinter(I, J); if (r) out.push(r); }); }); return sunion(out); }
  function seq(S1, S2) {
    if (S1.length !== S2.length) return false;
    for (var i = 0; i < S1.length; i++) { var I = S1[i], J = S2[i]; if (!neq(I.a, J.a) || !neq(I.b, J.b) || I.ac !== J.ac || I.bc !== J.bc) return false; }
    return true;
  }
  var REALS = function () { return [ivl(ninf(-1), ninf(1), false, false)]; };
  /* lecture d'un ensemble : '[-pi, pi]', ']0, +inf[', '{0}', '{-1, 2}', 'R', 'R+', 'R-', 'R*', 'R+*', 'empty', unions avec U ou ∪ */
  function sparseSet(src) {
    var s = String(src).replace(/[  ]/g, ' ').replace(/\\R|ℝ/g, 'R').replace(/\\varnothing|\\emptyset|∅/g, 'empty').replace(/\\cup|∪/g, ' U ').replace(/\\left|\\right|\\\{|\\\}/g, function (m) { return m === '\\{' ? '{' : m === '\\}' ? '}' : ''; }).trim();
    var parts = s.split(/\s+U\s+/), out = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i].replace(/\s+/g, ''), m;
      if (!p || p === 'empty') continue;
      if (p === 'R') { out.push(REALS()[0]); continue; }
      if (p === 'R+' || p === 'R^+') { out.push(ivl(nq(0), ninf(1), true, false)); continue; }
      if (p === 'R-' || p === 'R^-') { out.push(ivl(ninf(-1), nq(0), false, true)); continue; }
      if (p === 'R+*' || p === 'R^{+*}' || p === 'R^+*' || p === 'R*+') { out.push(ivl(nq(0), ninf(1), false, false)); continue; }
      if (p === 'R*' || p === 'R^*') { out.push(ivl(ninf(-1), nq(0), false, false), ivl(nq(0), ninf(1), false, false)); continue; }
      if ((m = /^\{(.*)\}$/.exec(p))) {
        var els = m[1] ? m[1].split(',') : [];
        for (var j = 0; j < els.length; j++) { var x = nparse(els[j]); if (!x || x.k === 'inf') return null; out.push(ivl(x, x, true, true)); }
        continue;
      }
      if ((m = /^([\[\]])([^,]+),([^,]+)([\[\]])$/.exec(p))) {
        var a = nparse(m[2]), b = nparse(m[3]);
        if (!a || !b) return null;
        out.push(ivl(a, b, m[1] === '[', m[4] === ']'));
        continue;
      }
      return null;
    }
    return sunion(out);
  }
  /* écriture TeX d'un ensemble : ∅, ℝ, intervalles, singletons groupés entre accolades, réunions */
  function stexSet(S) {
    if (!S.length) return '\\varnothing';
    var parts = [], pts = [];
    function flush() { if (pts.length) { parts.push('\\{' + pts.join(', ') + '\\}'); pts = []; } }
    S.forEach(function (I) {
      if (ising(I)) { pts.push(ntex(I.a)); return; }
      flush();
      if (I.a.k === 'inf' && I.b.k === 'inf') { parts.push('\\R'); return; }
      parts.push('\\left' + (I.ac ? '[' : ']') + ntex(I.a) + ', ' + ntex(I.b) + '\\right' + (I.bc ? ']' : '['));
    });
    flush();
    return parts.join(' \\cup ');
  }

  /* fonctions usuelles : valeur exacte, monotonie par morceaux, réciproque sur un morceau, valeur approchée pour le dessin */
  var ASIN = { 'q0/1': [0, 1], 'q1/2': [1, 6], 'rt1/2r2': [1, 4], 'rt1/2r3': [1, 3], 'q1/1': [1, 2] };
  function nasin(y) {   /* arcsin d'une valeur du tableau (en multiple de π) ; sinon null */
    if (!y) return null;
    if (y.v < 0) { var r = nasin(nneg(y)); return r ? nneg(r) : null; }
    var t = ASIN[ncle(y)];
    return t ? npi(t[0], t[1]) : null;
  }
  function nacos(y) { var a = nasin(y); return a ? nadd(npi(1, 2), nneg(a)) : null; }
  function SIN12(r) {   /* sin(rπ/12), r entier ; null si la valeur n'est pas dans le tableau */
    r = ((r % 24) + 24) % 24;
    if (r >= 12) { var v = SIN12(r - 12); return v ? nneg(v) : null; }
    if (r > 6) r = 12 - r;
    return { 0: nq(0), 2: nq(1, 2), 3: nrt(1, 2, 2), 4: nrt(1, 2, 3), 6: nq(1) }[r] || null;
  }
  function ntrig(x, shift) {
    if (!x) return null;
    if (x.k === 'q' && x.n === 0) return SIN12(shift);
    if (x.k !== 'pi' || (12 * x.n) % x.d) return null;
    return SIN12(12 * x.n / x.d + shift);
  }
  function piece(a, b, ac, bc, dir, k) { var p = ivl(a, b, ac, bc); p.dir = dir; p.k = k; return p; }
  function trigPieces(cos) {
    var out = [];
    for (var k = -6; k <= 6; k++) {
      var even = ((k % 2) + 2) % 2 === 0;
      if (cos) out.push(piece(npi(k), npi(k + 1), true, true, even ? -1 : 1, k));
      else out.push(piece(npi(2 * k - 1, 2), npi(2 * k + 1, 2), true, true, even ? 1 : -1, k));
    }
    return out;
  }
  var NI = ninf(-1), PI_ = ninf(1);
  var CURVES = {
    sq: { tex: 'x^2', f: function (x) {
        if (x.k === 'q') return nq(x.n * x.n, x.d * x.d);
        if (x.k === 'rt') return nq(x.n * x.n * x.m, x.d * x.d);
        if (x.k === 'inf') return ninf(1);
        if (x.k === 'e') return nexp(x.x.k === 'q' ? nq(2 * x.x.n, x.x.d) : npi(2 * x.x.n, x.x.d));
        return null;
      }, js: function (v) { return v * v; }, dom: REALS,
      mono: function () { return [piece(NI, nq(0), false, true, -1), piece(nq(0), PI_, true, false, 1)]; },
      inv: function (y, p) { var r = CURVES.sqrt.f(y); return p.dir < 0 ? nneg(r) : r; },
      view: [-3, 3, -1, 9], xs: ['-inf', '-3', '-2', '-sqrt2', '-1', '-1/2', '0', '1/2', '1', 'sqrt2', '2', '3', '4', '+inf'], ys: ['-inf', '-1', '0', '1/4', '1', '2', '4', '9', '16', '+inf'],
      doms: ['R', '[0, +inf[', ']-inf, 0]'] },
    abs: { tex: '|x|', f: function (x) { return x.v < 0 ? nneg(x) : x; }, js: Math.abs, dom: REALS,
      mono: function () { return [piece(NI, nq(0), false, true, -1), piece(nq(0), PI_, true, false, 1)]; },
      inv: function (y, p) { return p.dir < 0 ? nneg(y) : y; },
      view: [-3, 3, -1, 4], xs: ['-inf', '-3', '-2', '-1', '-1/2', '0', '1/2', '1', '2', '3', '+inf'], ys: ['-inf', '-1', '0', '1/2', '1', '2', '3', '+inf'],
      doms: ['R', '[0, +inf['] },
    abs1: { tex: '|x - 1|', f: function (x) { if (x.k === 'inf') return ninf(1); if (x.k !== 'q') return null; return nq(Math.abs(x.n - x.d), x.d); },
      js: function (v) { return Math.abs(v - 1); }, dom: REALS,
      mono: function () { return [piece(NI, nq(1), false, true, -1), piece(nq(1), PI_, true, false, 1)]; },
      inv: function (y, p) { if (y.k !== 'q') return null; return p.dir < 0 ? nq(y.d - y.n, y.d) : nq(y.d + y.n, y.d); },
      view: [-2, 4, -1, 4], xs: ['-inf', '-2', '-1', '0', '1/2', '1', '2', '3', '4', '+inf'], ys: ['-inf', '-2', '-1', '0', '1/2', '1', '2', '3', '+inf'],
      doms: ['R', '[1, +inf[', ']-inf, 1]'] },
    sqrt: { tex: '\\sqrt{x}', f: function (x) {
        if (x.v < 0) return null;
        if (x.k === 'q') return x.n === 0 ? nq(0) : nrt(1, x.d, x.n * x.d);
        if (x.k === 'e') return nexp(x.x.k === 'q' ? nq(x.x.n, 2 * x.x.d) : npi(x.x.n, 2 * x.x.d));
        if (x.k === 'inf') return ninf(1);
        return null;
      }, js: function (v) { return v < 0 ? NaN : Math.sqrt(v); }, dom: function () { return [ivl(nq(0), PI_, true, false)]; },
      mono: function () { return [piece(nq(0), PI_, true, false, 1)]; },
      inv: function (y) { return CURVES.sq.f(y); },
      view: [-1, 9, -1, 3.5], xs: ['0', '1/4', '1', '2', '4', '9', '+inf'], ys: ['-inf', '-1', '0', '1/2', '1', '2', '3', '+inf'],
      doms: ['[0, +inf['] },
    inv: { tex: '\\frac{1}{x}', f: function (x) {
        if (x.k === 'q') return x.n === 0 ? null : nq(x.d, x.n);
        if (x.k === 'rt') return nrt(x.d, x.n * x.m, x.m);
        if (x.k === 'e') return nexp(nneg(x.x));
        if (x.k === 'inf') return nq(0);
        return null;
      }, js: function (v) { return v === 0 ? NaN : 1 / v; }, dom: function () { return [ivl(NI, nq(0), false, false), ivl(nq(0), PI_, false, false)]; },
      mono: function () { return [piece(NI, nq(0), false, false, -1), piece(nq(0), PI_, false, false, -1)]; },
      lim0: function (side) { return ninf(side === 'r' ? 1 : -1); },
      inv: function (y) { return CURVES.inv.f(y); },
      view: [-3, 3, -3, 3], xs: ['-inf', '-2', '-1', '-1/2', '0', '1/2', '1', '2', '+inf'], ys: ['-inf', '-2', '-1', '-1/2', '0', '1/2', '1', '2', '+inf'],
      doms: ['R*', ']0, +inf['] },
    exp: { tex: 'e^{x}', f: nexp, js: Math.exp, dom: REALS,
      mono: function () { return [piece(NI, PI_, false, false, 1)]; },
      inv: function (y) { return nln(y); },
      view: [-3, 2.5, -1, 8], xs: ['-inf', '-2', '-1', '0', '1/2', '1', 'ln2', '2', 'pi/2', 'pi', '+inf'], ys: ['-inf', '-1', '0', '1/2', '1', '2', 'e', 'e^2', '+inf'],
      doms: ['R'] },
    ln: { tex: '\\ln x', f: nln, js: function (v) { return v > 0 ? Math.log(v) : NaN; }, dom: function () { return [ivl(nq(0), PI_, false, false)]; },
      mono: function () { return [piece(nq(0), PI_, false, false, 1)]; },
      lim0: function () { return ninf(-1); },
      inv: function (y) { return nexp(y); },
      view: [-1, 8, -3, 2.5], xs: ['0', 'e^-1', '1/2', '1', '2', 'e', 'pi', 'e^2', '+inf'], ys: ['-inf', '-2', '-1', '0', '1', '2', '+inf'],
      doms: [']0, +inf['] },
    sin: { tex: '\\sin x', f: function (x) { return ntrig(x, 0); }, js: Math.sin, trig: true, dom: REALS,
      mono: function () { return trigPieces(false); },
      inv: function (y, p) { var a = nasin(y); if (!a) return null; return ((p.k % 2) + 2) % 2 === 0 ? nadd(npi(p.k), a) : nadd(npi(p.k), nneg(a)); },
      xs: ['-2pi', '-3pi/2', '-pi', '-5pi/6', '-3pi/4', '-2pi/3', '-pi/2', '-pi/3', '-pi/4', '-pi/6', '0', 'pi/6', 'pi/4', 'pi/3', 'pi/2', '2pi/3', '3pi/4', '5pi/6', 'pi', '3pi/2', '2pi'],
      ys: ['-inf', '-2', '-1', '-sqrt3/2', '-sqrt2/2', '-1/2', '0', '1/2', 'sqrt2/2', 'sqrt3/2', '1', '2', '3', '4', '+inf'],
      doms: ['[-pi, pi]', '[-pi/2, pi/2]', '[0, pi]', '[0, 2pi]', '[-2pi, 2pi]'] },
    cos: { tex: '\\cos x', f: function (x) { return ntrig(x, 6); }, js: Math.cos, trig: true, dom: REALS,
      mono: function () { return trigPieces(true); },
      inv: function (y, p) { var a = nacos(y); if (!a) return null; return ((p.k % 2) + 2) % 2 === 0 ? nadd(npi(p.k), a) : nadd(npi(p.k + 1), nneg(a)); },
      xs: null, ys: null, doms: ['[0, pi]', '[-pi, pi]', ']-pi, pi]', '[0, 2pi]', '[-2pi, 2pi]'] }
  };
  CURVES.cos.xs = CURVES.sin.xs; CURVES.cos.ys = CURVES.sin.ys;
  var CURVE_IDS = ['sq', 'abs', 'abs1', 'sqrt', 'inv', 'exp', 'ln', 'sin', 'cos'];
  /* valeur au bord d'un morceau : f(x) si x est dans le domaine (borne fermée ou fonction continue en x), sinon la limite */
  function cval(F, x, side) {
    if (x.k === 'q' && x.n === 0 && F.lim0) return F.lim0(side);
    return F.f(x);
  }
  function cerr(m) { return { error: T(m) }; }
  /* image d'un morceau de monotonie stricte P (intervalle non réduit à un point) */
  function cpieceImage(F, P) {
    var L = cval(F, P.a, 'r'), H = cval(F, P.b, 'l');
    if (!L || !H) return null;
    return P.dir > 0 ? ivl(L, H, P.ac, P.bc) : ivl(H, L, P.bc, P.ac);
  }
  /* départ réel : E ∩ domaine naturel ; les morceaux de monotonie qui le découpent */
  function cpieces(F, E) {
    var out = [];
    F.mono().forEach(function (M) {
      E.forEach(function (I) {
        var P = iinter(I, M);
        if (!P || (ising(P) && !ising(I))) return;
        P.dir = M.dir; P.k = M.k; out.push(P);
      });
    });
    return out;
  }
  function cimage(fid, dom, A) {
    var F = CURVES[fid]; if (!F) return cerr('Fonction inconnue.');
    var E = sinter(dom || F.dom(), F.dom()), AE = sinter(A, E), out = [], steps = [];
    if (F.trig && AE.some(function (I) { return I.a.k === 'inf' || I.b.k === 'inf'; })) return cerr('Choisis un ensemble de départ borné pour sin et cos.');
    var bad = false;
    cpieces(F, AE).forEach(function (P) {
      if (bad) return;
      if (ising(P)) { var v = F.f(P.a); if (!v) { bad = true; return; } out.push(ivl(v, v, true, true)); steps.push({ P: P, point: true, J: ivl(v, v, true, true) }); return; }
      var J = cpieceImage(F, P);
      if (!J) { bad = true; return; }
      out.push(J); steps.push({ P: P, dir: P.dir, J: J });
    });
    if (bad) return cerr('Valeur non exacte pour cette fonction : choisis une autre borne.');
    return { set: sunion(out), steps: steps, E: E, AE: AE, inside: seq(sunion(A), AE) };
  }
  function cpreimage(fid, dom, B) {
    var F = CURVES[fid]; if (!F) return cerr('Fonction inconnue.');
    var E = sinter(dom || F.dom(), F.dom()), out = [], steps = [], bad = false;
    if (F.trig && E.some(function (I) { return I.a.k === 'inf' || I.b.k === 'inf'; })) return cerr('Choisis un ensemble de départ borné pour sin et cos.');
    cpieces(F, E).forEach(function (P) {
      if (bad) return;
      if (ising(P)) { var v = F.f(P.a); if (!v) { bad = true; return; } var inB = B.some(function (I) { return iinter(I, ivl(v, v, true, true)); }); if (inB) out.push(ivl(P.a, P.a, true, true)); steps.push({ P: P, point: true, X: inB ? [ivl(P.a, P.a, true, true)] : [] }); return; }
      var J = cpieceImage(F, P);
      if (!J) { bad = true; return; }
      var X = [];
      B.forEach(function (Bi) {
        var K = iinter(J, Bi);
        if (!K || bad) return;
        var back = function (y) {
          if (neq(y, J.a)) return P.dir > 0 ? P.a : P.b;
          if (neq(y, J.b)) return P.dir > 0 ? P.b : P.a;
          var x = F.inv(y, P); if (!x) bad = true; return x;
        };
        var xa = back(K.a), xb = back(K.b);
        if (bad) return;
        X.push(P.dir > 0 ? ivl(xa, xb, K.ac, K.bc) : ivl(xb, xa, K.bc, K.ac));
      });
      X = sunion(X);
      out = out.concat(X);
      steps.push({ P: P, dir: P.dir, J: J, X: X });
    });
    if (bad) return cerr('Valeur non exacte pour cette fonction : choisis une autre borne.');
    return { set: sunion(out), steps: steps, E: E };
  }

  /* styles de l'outil courbe (maths.css ne les a pas) : injectés une fois, aux couleurs du thème */
  function curveCSS() {
    if (typeof document === 'undefined' || document.getElementById('maths-curve-css')) return;
    var st = document.createElement('style');
    st.id = 'maths-curve-css';
    st.textContent = [
      '.cvb .cv-ctl{display:grid;gap:.6rem}',
      '.cvb .cv-fns{display:flex;flex-wrap:wrap;gap:6px}',
      '.cvb .cv-fns .chip-btn{min-width:3rem}',
      '.cvb .cv-fns .chip-btn[aria-pressed="true"] .katex{color:var(--surface)}',
      '.cvb .cv-row{display:flex;flex-wrap:wrap;gap:8px;align-items:end}',
      '.cvb .cv-row .fld{width:auto;min-width:8.5rem;flex:1 1 9rem}',
      '.cvb .cv-iv{display:flex;flex-wrap:wrap;align-items:center;gap:6px}',
      '.cvb .cv-iv .nm{font-family:var(--font-ui);font-size:.95rem;font-weight:600;min-width:2.2rem}',
      '.cvb .cv-iv select{font:inherit;font-family:var(--font-ui);font-size:.98rem;color:var(--ink);background:var(--surface);border:1px solid var(--line);border-bottom:2px solid var(--pen);border-radius:3px;padding:.3rem .4rem;min-height:40px;min-width:4.6rem}',
      '.cvb .cv-br{font:inherit;font-family:var(--font-math);font-size:1.45rem;line-height:1;width:2.3rem;min-height:40px;border:1px solid var(--line);border-radius:4px;background:var(--surface);color:var(--accent);cursor:pointer;padding:0}',
      '.cvb .cv-br:disabled{color:var(--muted);opacity:.6;cursor:default}',
      '.cvb .cv-br:focus-visible,.cvb .cv-iv select:focus-visible{outline:2px solid var(--accent);outline-offset:1px}',
      '.cvb .cv-cur{font-size:1.02rem;overflow-x:auto;overflow-y:hidden}',
      '.cvb .fig svg{max-width:500px;margin:0 auto}',
      '.cvb svg .cv-grid{stroke:var(--line);stroke-width:1}',
      '.cvb svg .cv-ax{stroke:var(--rule);stroke-width:1.3}',
      '.cvb svg .cv-c{fill:none;stroke:var(--muted);stroke-width:2;stroke-linejoin:round}',
      '.cvb svg .cv-c.hl{stroke:var(--z1);stroke-width:4;stroke-linecap:round}',
      '.cvb svg .cv-dot{fill:var(--z1)}',
      '.cvb svg .cv-x{stroke:var(--z1);stroke-width:6;stroke-linecap:butt}',
      '.cvb svg .cv-y{stroke:var(--z2);stroke-width:6;stroke-linecap:butt}',
      '.cvb svg .cv-band{fill:var(--z2);fill-opacity:.12}',
      '.cvb svg .cv-g{stroke-width:1.2;stroke-dasharray:4 4;fill:none}',
      '.cvb svg .cv-g.x{stroke:var(--z1)} .cvb svg .cv-g.y{stroke:var(--z2)}',
      '.cvb svg .cv-e{stroke-width:2.2}',
      '.cvb svg .cv-e.x{stroke:var(--z1)} .cvb svg .cv-e.y{stroke:var(--z2)}',
      '.cvb svg .cv-e.c.x{fill:var(--z1)} .cvb svg .cv-e.c.y{fill:var(--z2)} .cvb svg .cv-e.o{fill:var(--surface)}',
      '.cvb svg .cv-t{font-family:var(--font-ui);font-size:13px;fill:var(--muted)}',
      '.cvb svg .cv-t.x{fill:var(--z1);font-weight:600} .cvb svg .cv-t.y{fill:var(--z2);font-weight:600}',
      '.cvb svg .cv-lab{font-family:var(--font-display);font-style:italic;font-size:15px;fill:var(--ink)}',
      '.cvb .cv-key{display:flex;flex-wrap:wrap;gap:4px 16px;font-family:var(--font-ui);font-size:.82rem;color:var(--muted)}',
      '.cvb .cv-key i{display:inline-block;width:1rem;height:.32rem;margin-right:.35rem;vertical-align:.18rem;border-radius:1px}',
      '.cvb .cv-key .kx{background:var(--z1)} .cvb .cv-key .ky{background:var(--z2)}',
      '.cvb .cv-steps{margin:0;padding-left:1.2rem;display:grid;gap:.35rem}',
      '.cvb .cv-steps li>div{overflow-x:auto;overflow-y:hidden;min-width:0}',
      '.cvb .cv-res{overflow-x:auto;overflow-y:hidden;background:var(--surface-2);border-radius:var(--radius);padding:.35rem .6rem}',
      '.katex .cvz1{color:var(--z1)} .katex .cvz2{color:var(--z2)}',
      '@media (max-width:440px){.cvb .bench-body{padding:.8rem}.cvb .cv-iv select{min-width:4.2rem}}',
      '@media print{.cvb .cv-ctl{display:none !important}.cvb .cv-res,.cvb .cv-cur,.cvb .cv-steps li>div{overflow:visible !important}}'
    ].join('\n');
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- courbe d'une fonction usuelle : image directe et image réciproque d'un intervalle ---------- */
  var CV_TXT = { sq: 'x²', abs: '|x|', abs1: '|x − 1|', sqrt: '√x', inv: '1/x', exp: 'eˣ', ln: 'ln x', sin: 'sin x', cos: 'cos x' };
  var CV_LAB = { sq: 'x^2', abs: '|x|', abs1: '|x-1|', sqrt: '\\sqrt{x}', inv: '\\tfrac{1}{x}', exp: 'e^x', ln: '\\ln x', sin: '\\sin x', cos: '\\cos x' };
  function curve(el, o) {
    o = o || {};
    curveCSS();
    var fs = (o.fs || CURVE_IDS).filter(function (k) { return CURVES[k]; });
    var fid = CURVES[o.f] ? o.f : fs[0], name = o.name || 'f', edit = o.edit !== false;
    var modes = o.modes || ['image', 'preimage'], mode = o.mode === 'preimage' ? 'preimage' : 'image';
    var st = { dom: null, A: null, B: null, note: null };
    var presets = o.presets || null, uid = ++vuid;
    function setFrom(c) {
      if (c.f && CURVES[c.f]) fid = c.f;
      if (c.mode) mode = c.mode === 'preimage' ? 'preimage' : 'image';
      name = c.name || o.name || 'f';
      var F = CURVES[fid];
      st.domSrc = c.dom || F.doms[0];
      st.dom = sparseSet(st.domSrc) || F.dom();
      var hull = function (S) { return S.length ? [ivl(S[0].a, S[S.length - 1].b, S[0].ac, S[S.length - 1].bc)] : S; };
      var dA = st.dom.length === 1 ? st.dom : hull(st.dom);
      st.A = c.A != null ? sparseSet(c.A) || dA : dA;
      st.B = c.B != null ? sparseSet(c.B) || [ivl(nq(0), nq(1), true, true)] : [ivl(nq(0), nq(1), true, true)];
    }
    setFrom({ f: fid, dom: o.dom, A: o.A, B: o.B, mode: mode, name: o.name });
    el.classList.add('bench', 'cvb');
    var LABM = { image: T('Image directe'), preimage: T('Image réciproque') };
    el.innerHTML = head(o.title || T('Courbe et images d’intervalles'), '') + '<div class="bench-body">' +
      (edit ? '<div class="cv-ctl">' +
        (fs.length > 1 ? '<div class="cv-fns" role="group" aria-label="' + esc(T('Fonction')) + '">' + fs.map(function (k) { return '<button type="button" class="chip-btn" data-f="' + k + '" aria-pressed="false">' + tx(CV_LAB[k]) + '</button>'; }).join('') + '</div>' : '') +
        '<div class="cv-row"><label class="fld"><span>' + T('Ensemble de départ') + '</span><select data-k="dom"></select></label>' +
        (modes.length > 1 ? '<div class="row" role="group">' + modes.map(function (m) { return '<button type="button" class="chip-btn" data-m="' + m + '" aria-pressed="false">' + LABM[m] + '</button>'; }).join('') + '</div>' : '') + '</div>' +
        '<div class="cv-iv"><span class="nm"></span><button type="button" class="cv-br" data-b="l"></button><select data-k="lo"></select><span aria-hidden="true">,</span><select data-k="hi"></select><button type="button" class="cv-br" data-b="r"></button></div>' +
        presetsHTML(presets, 'data-p') + '</div>' : '') +
      '<div class="cv-cur"></div><div class="fig"></div><div class="cv-key"></div><div class="readout" aria-live="polite"></div></div>';
    var fig = el.querySelector('.fig'), out = el.querySelector('.readout'), key = el.querySelector('.cv-key'), cur = el.querySelector('.cv-cur');
    function F() { return CURVES[fid]; }
    function setName() { return mode === 'image' ? 'A' : 'B'; }
    function curSet() { return mode === 'image' ? st.A : st.B; }
    function menuVals() {   /* valeurs proposées, plus les bornes du réglage courant si elles manquent */
      var src = mode === 'image' ? F().xs : F().ys, vals = src.map(nparse).filter(Boolean);
      var S = curSet();
      if (S.length) [S[0].a, S[S.length - 1].b].forEach(function (x) { if (!vals.some(function (v) { return neq(v, x); })) vals.push(x); });
      if (mode === 'image') st.dom.forEach(function (I) { [I.a, I.b].forEach(function (x) { if (!vals.some(function (v) { return neq(v, x); })) vals.push(x); }); });
      return vals.sort(function (a, b) { return a.v - b.v; });
    }
    function syncCtl() {
      if (!edit) return;
      U.$$('[data-f]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-f') === fid)); });
      U.$$('[data-m]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-m') === mode)); });
      var ds = el.querySelector('[data-k="dom"]'), doms = F().doms.slice();
      if (doms.indexOf(st.domSrc) < 0) doms.unshift(st.domSrc);
      ds.innerHTML = doms.map(function (d) { var S = sparseSet(d); return '<option value="' + esc(d) + '"' + (d === st.domSrc ? ' selected' : '') + '>' + esc(S ? setTxt(S) : d) + '</option>'; }).join('');
      var S = curSet(), vals = menuVals(), lo = S.length ? S[0].a : vals[0], hi = S.length ? S[S.length - 1].b : vals[vals.length - 1];
      el.querySelector('.cv-iv .nm').innerHTML = tx(setName() + ' =');
      ['lo', 'hi'].forEach(function (k) {
        var sel = el.querySelector('[data-k="' + k + '"]'), want = k === 'lo' ? lo : hi;
        sel.setAttribute('aria-label', T(k === 'lo' ? 'Borne gauche de {S}' : 'Borne droite de {S}', { S: setName() }));
        sel.innerHTML = vals.map(function (v, i) { return '<option value="' + i + '"' + (neq(v, want) ? ' selected' : '') + '>' + esc(ntxt(v)) + '</option>'; }).join('');
        sel.__vals = vals;
      });
      var I0 = S.length ? S[0] : null, I1 = S.length ? S[S.length - 1] : null, lb = el.querySelector('[data-b="l"]'), rb = el.querySelector('[data-b="r"]');
      var sing = S.length === 1 && ising(S[0]);
      lb.textContent = sing ? '{' : I0 && I0.ac ? '[' : ']'; rb.textContent = sing ? '}' : I1 && I1.bc ? ']' : '[';
      lb.disabled = sing || !I0 || I0.a.k === 'inf'; rb.disabled = sing || !I1 || I1.b.k === 'inf';
      lb.setAttribute('aria-label', T(I0 && I0.ac ? 'Borne gauche fermée (cliquer pour l’ouvrir)' : 'Borne gauche ouverte (cliquer pour la fermer)'));
      rb.setAttribute('aria-label', T(I1 && I1.bc ? 'Borne droite fermée (cliquer pour l’ouvrir)' : 'Borne droite ouverte (cliquer pour la fermer)'));
    }
    function setTxt(S) {   /* ensemble en texte, pour les menus */
      if (!S.length) return '∅';
      return S.map(function (I) { if (I.a.k === 'inf' && I.b.k === 'inf') return 'ℝ'; if (ising(I)) return '{' + ntxt(I.a) + '}'; return (I.ac ? '[' : ']') + ntxt(I.a) + ', ' + ntxt(I.b) + (I.bc ? ']' : '['); }).join(' ∪ ');
    }
    function fromCtl(which) {
      var lo = el.querySelector('[data-k="lo"]'), hi = el.querySelector('[data-k="hi"]');
      var a = lo.__vals[+lo.value], b = hi.__vals[+hi.value], S = curSet();
      var ac = S.length && !ising(S[0]) ? S[0].ac : true, bc = S.length && !ising(S[S.length - 1]) ? S[S.length - 1].bc : true;
      if (which === 'l') ac = !(S.length && S[0].ac);
      if (which === 'r') bc = !(S.length && S[S.length - 1].bc);
      st.note = null;
      if (ncmp(a, b) > 0) { st.note = T('Borne gauche plus grande que la borne droite.'); draw(); return; }
      var I = ivl(a, b, ac, bc);
      if (ising(I)) { I.ac = I.bc = true; }
      else if (iempty(I)) { I.ac = I.bc = true; }
      if (mode === 'image') st.A = [I]; else st.B = [I];
      draw();
    }
    function fset(S) { return stexSet(S); }
    function fn() { return name; }
    function defTex() { return fn() + ' : ' + fset(st.dom) + ' \\to \\R,\\ x \\mapsto ' + F().tex; }

    /* ---- dessin ---- */
    function draw() {
      syncCtl();
      var Fx = F(), S = curSet(), res = mode === 'image' ? cimage(fid, st.dom, st.A) : cpreimage(fid, st.dom, st.B);
      var xSet = res.error ? [] : mode === 'image' ? res.AE : res.set, ySet = res.error ? [] : mode === 'image' ? res.set : st.B;
      cur.innerHTML = tx(defTex());
      /* fenêtre : celle de la fonction, élargie aux bornes finies utiles */
      var v = Fx.view ? Fx.view.slice() : null;
      if (Fx.trig) {
        var d0 = st.dom[0].a.v, d1 = st.dom[st.dom.length - 1].b.v;
        v = [d0 - 0.25, d1 + 0.25, -1.6, 1.6];
      }
      function fin(x) { return x.k !== 'inf' && isFinite(x.v); }
      xSet.concat(mode === 'image' ? st.A : []).forEach(function (I) { [I.a, I.b].forEach(function (x) { if (fin(x)) { v[0] = Math.min(v[0], x.v - 0.3); v[1] = Math.max(v[1], x.v + 0.3); } }); });
      ySet.forEach(function (I) { [I.a, I.b].forEach(function (y) { if (fin(y) && Math.abs(y.v) <= 40) { v[2] = Math.min(v[2], y.v - 0.4); v[3] = Math.max(v[3], y.v + 0.4); } }); });
      /* place pour les étiquettes de l'axe des ordonnées, à gauche de l'axe */
      if (v[0] <= 0 && v[1] > 0 && v[0] > -0.12 * v[1] / 0.88) v[0] = -0.12 * v[1] / 0.88;
      var W = 420, H = 300, ml = 10, mr = 10, mt = 10, mb = 26;
      var X = function (x) { return ml + (x - v[0]) / (v[1] - v[0]) * (W - ml - mr); }, Y = function (y) { return mt + (v[3] - y) / (v[3] - v[2]) * (H - mt - mb); };
      var x0 = v[0] <= 0 && v[1] >= 0 ? X(0) : X(v[0]) + 34, y0 = v[2] <= 0 && v[3] >= 0 ? Y(0) : Y(v[2]);
      var cid = 'cvclip' + uid, h = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(T('Courbe de {f} sur {E}', { f: 'x ↦ ' + CV_TXT[fid], E: setTxt(st.dom) })) + '">';
      h += '<defs><clipPath id="' + cid + '"><rect x="' + ml + '" y="' + mt + '" width="' + (W - ml - mr) + '" height="' + (H - mt - mb) + '"/></clipPath></defs>';
      /* quadrillage léger : entiers, ou multiples de π/2 */
      var step = Fx.trig ? PI / 2 : (v[1] - v[0] > 12 ? 2 : 1);
      for (var gx = Math.ceil(v[0] / step) * step; gx <= v[1]; gx += step) h += '<line class="cv-grid" x1="' + X(gx) + '" y1="' + mt + '" x2="' + X(gx) + '" y2="' + (H - mb) + '"/>';
      var ystep = v[3] - v[2] > 14 ? 5 : v[3] - v[2] > 7 ? 2 : Fx.trig ? 0.5 : 1;
      for (var gy = Math.ceil(v[2] / ystep) * ystep; gy <= v[3]; gy += ystep) h += '<line class="cv-grid" x1="' + ml + '" y1="' + Y(gy) + '" x2="' + (W - mr) + '" y2="' + Y(gy) + '"/>';
      h += '<line class="cv-ax" x1="' + ml + '" y1="' + y0 + '" x2="' + (W - mr) + '" y2="' + y0 + '"/><line class="cv-ax" x1="' + x0 + '" y1="' + mt + '" x2="' + x0 + '" y2="' + (H - mb) + '"/>';
      h += '<text class="cv-lab" x="' + (W - mr - 4) + '" y="' + (y0 - 6) + '" text-anchor="end">x</text><text class="cv-lab" x="' + (x0 + 9) + '" y="' + (mt + 11) + '">y</text>';
      /* bande de B (image réciproque) */
      if (mode === 'preimage') ySet.forEach(function (I) { var ya = Math.min(Math.max(I.a.v, v[2]), v[3]), yb = Math.min(Math.max(I.b.v, v[2]), v[3]); if (yb >= ya) h += '<rect class="cv-band" clip-path="url(#' + cid + ')" x="' + ml + '" y="' + Y(yb) + '" width="' + (W - ml - mr) + '" height="' + Math.max(1.5, Y(ya) - Y(yb)) + '"/>'; });
      /* courbe sur l'ensemble de départ, coupée aux trous du domaine */
      function path(a, b, cls) {
        var lo = Math.max(a, v[0]), hi = Math.min(b, v[1]); if (!(hi > lo)) return '';
        var n = 360, d = '', pen = false;
        for (var i = 0; i <= n; i++) {
          var x = lo + (hi - lo) * i / n, y = Fx.js(x);
          if (!isFinite(y) || y > v[3] + 50 || y < v[2] - 50) { pen = false; continue; }
          d += (pen ? 'L' : 'M') + X(x).toFixed(2) + ' ' + Y(y).toFixed(2); pen = true;
        }
        return d ? '<path class="cv-c' + (cls ? ' ' + cls : '') + '" clip-path="url(#' + cid + ')" d="' + d + '"/>' : '';
      }
      function inner(I) { var e = 1e-9 * Math.max(1, Math.abs(I.a.v), Math.abs(I.b.v)); return [I.a.k === 'inf' ? -1e9 : I.a.v + (I.ac ? 0 : e), I.b.k === 'inf' ? 1e9 : I.b.v - (I.bc ? 0 : e)]; }
      st.dom.forEach(function (I) { var r = inner(I); h += path(r[0], r[1], ''); });
      xSet.forEach(function (I) {
        if (ising(I)) { var yy = Fx.js(I.a.v); if (isFinite(yy) && yy >= v[2] && yy <= v[3]) h += '<circle class="cv-dot" cx="' + X(I.a.v) + '" cy="' + Y(yy) + '" r="4.5"/>'; return; }
        var r = inner(I); h += path(r[0], r[1], 'hl');
      });
      /* repères pointillés */
      function vguide(x) { if (fin(x) && x.v >= v[0] && x.v <= v[1]) { var yy = Fx.js(x.v); var ty = isFinite(yy) ? Math.min(Math.max(Y(yy), mt), H - mb) : mt; h += '<line class="cv-g x" x1="' + X(x.v) + '" y1="' + y0 + '" x2="' + X(x.v) + '" y2="' + ty + '"/>'; } }
      function hguide(y) { if (fin(y) && y.v >= v[2] && y.v <= v[3]) h += '<line class="cv-g y" x1="' + ml + '" y1="' + Y(y.v) + '" x2="' + (W - mr) + '" y2="' + Y(y.v) + '"/>'; }
      xSet.forEach(function (I) { vguide(I.a); if (!ising(I)) vguide(I.b); });
      ySet.forEach(function (I) { hguide(I.a); if (!ising(I)) hguide(I.b); });
      /* les deux ensembles sur les axes : bornes pleines (fermées) ou creuses (ouvertes) */
      function onAxis(S2, axis) {
        S2.forEach(function (I) {
          var lo = axis === 'x' ? Math.max(I.a.v, v[0]) : Math.max(I.a.v, v[2]), hi = axis === 'x' ? Math.min(I.b.v, v[1]) : Math.min(I.b.v, v[3]);
          if (hi < lo) return;
          if (!ising(I)) h += axis === 'x' ? '<line class="cv-x" x1="' + X(lo) + '" y1="' + y0 + '" x2="' + X(hi) + '" y2="' + y0 + '"/>' : '<line class="cv-y" x1="' + x0 + '" y1="' + Y(lo) + '" x2="' + x0 + '" y2="' + Y(hi) + '"/>';
          [[I.a, I.ac], [I.b, I.bc]].forEach(function (e, j) {
            if (j && ising(I)) return;
            if (!fin(e[0])) return;
            var cx = axis === 'x' ? X(e[0].v) : x0, cy = axis === 'x' ? y0 : Y(e[0].v);
            if ((axis === 'x' && (e[0].v < v[0] || e[0].v > v[1])) || (axis === 'y' && (e[0].v < v[2] || e[0].v > v[3]))) return;
            h += '<circle class="cv-e ' + axis + ' ' + (e[1] ? 'c' : 'o') + '" cx="' + cx + '" cy="' + cy + '" r="4.5"/>';
          });
        });
      }
      onAxis(ySet, 'y'); onAxis(xSet, 'x');
      /* étiquettes : les bornes des deux ensembles d'abord, puis le quadrillage, sans chevauchement */
      var xl = [], yl = [];
      function labX(x, cls) { if (!fin(x) || x.v < v[0] || x.v > v[1]) return; var px = X(x.v), t = ntxt(x), w = 7 * t.length + 6; if (xl.some(function (q) { return Math.abs(q[0] - px) < (q[1] + w) / 2; })) return; xl.push([px, w]); h += '<text class="cv-t ' + cls + '" x="' + px + '" y="' + Math.min(y0 + 17, H - 6) + '" text-anchor="middle">' + nsvg(x) + '</text>'; }
      function labY(y, cls) { if (!fin(y) || y.v < v[2] || y.v > v[3]) return; var py = Y(y.v); if (yl.some(function (q) { return Math.abs(q - py) < 14; })) return; yl.push(py); h += '<text class="cv-t ' + cls + '" x="' + (x0 - 6) + '" y="' + (py + 4.5) + '" text-anchor="end">' + nsvg(y) + '</text>'; }
      xSet.forEach(function (I) { labX(I.a, 'x'); labX(I.b, 'x'); });
      ySet.forEach(function (I) { labY(I.a, 'y'); labY(I.b, 'y'); });
      yl.push(y0);
      st.dom.forEach(function (I) { labX(I.a, ''); labX(I.b, ''); });
      for (gx = Math.ceil(v[0] / step) * step; gx <= v[1]; gx += step) { var gq = Fx.trig ? npi(Math.round(2 * gx / PI), 2) : nq(Math.round(gx)); if (Math.abs(gx) > 1e-9) labX(gq, ''); }
      for (gy = Math.ceil(v[2] / ystep) * ystep; gy <= v[3]; gy += ystep) if (Math.abs(gy) > 1e-9) labY(Fx.trig ? nq(Math.round(gy * 2), 2) : nq(Math.round(gy)), '');
      fig.innerHTML = h + '</svg>';
      var nm = setName();
      key.innerHTML = '<span><i class="kx"></i>' + T('{S}, sur l’axe des abscisses', { S: tx(mode === 'image' ? 'A' : fn() + '^{-1}(B)') }) + '</span><span><i class="ky"></i>' + T('{S}, sur l’axe des ordonnées', { S: tx(mode === 'image' ? fn() + '(A)' : 'B') }) + '</span>';
      /* lecture */
      var t = '';
      if (st.note) t += '<p class="err">' + esc(st.note) + '</p>';
      if (res.error) { out.innerHTML = t + '<p class="err">' + esc(res.error) + '</p>'; return; }
      var nameS = fn();
      if (mode === 'image') {
        if (!res.inside) t += '<p class="err">' + T('{A} n’est pas une partie de l’ensemble de départ : {fA} n’est pas défini. Voici l’image de la partie de A qui est dans l’ensemble de départ.', { A: tx('A = ' + fset(st.A)), fA: tx(nameS + '(A)') }) + '</p>';
        var single = res.AE.every(ising);
        if (single && res.AE.length) t += '<p>' + T('On calcule l’image de chaque point.') + '</p><div class="fm">' + tx(res.AE.map(function (I) { return nameS + '\\left(' + ntex(I.a) + '\\right) = ' + ntex(F().f(I.a)); }).join(',\\quad ')) + '</div>';
        else if (res.steps.length) {
          t += '<ol class="cv-steps">';
          res.steps.forEach(function (s) {
            if (s.point) return;
            t += '<li>' + T(s.dir > 0 ? 'Sur {P}, {f} est strictement croissante :' : 'Sur {P}, {f} est strictement décroissante :', { P: tx(fset([s.P])), f: tx(nameS) }) + '<div>' + tx(nameS + '\\left(' + fset([s.P]) + '\\right) = ' + fset([s.J])) + '</div></li>';
          });
          t += '</ol>';
        }
        t += '<div class="cv-res">' + tx('\\htmlClass{cvz2}{' + nameS + '\\left(' + fset(st.A) + '\\right)} = \\htmlClass{cvz2}{' + fset(res.set) + '}', true) + '</div>';
      } else {
        t += '<ol class="cv-steps">';
        res.steps.forEach(function (s) {
          if (s.point) return;
          t += '<li>' + T(s.dir > 0 ? 'Sur {P}, {f} est strictement croissante et prend les valeurs de {J} :' : 'Sur {P}, {f} est strictement décroissante et prend les valeurs de {J} :', { P: tx(fset([s.P])), f: tx(nameS), J: tx(fset([s.J])) }) +
            (s.X.length ? '<div>' + tx(nameS + '(x) \\in ' + fset(st.B) + ' \\iff x \\in ' + fset(s.X)) + '</div>' : ' ' + T('aucune valeur de {B} n’y est prise.', { B: tx('B') })) + '</li>';
        });
        t += '</ol><div class="cv-res">' + tx('\\htmlClass{cvz1}{' + nameS + '^{-1}\\left(' + fset(st.B) + '\\right)} = \\htmlClass{cvz1}{' + fset(res.set) + '}', true) + '</div>';
      }
      out.innerHTML = t;
    }
    if (edit) {
      U.$$('[data-f]', el).forEach(function (b) { b.addEventListener('click', function () { setFrom({ f: b.getAttribute('data-f'), mode: mode }); st.note = null; draw(); }); });
      U.$$('[data-m]', el).forEach(function (b) { b.addEventListener('click', function () { mode = b.getAttribute('data-m'); st.note = null; draw(); }); });
      el.querySelector('[data-k="dom"]').addEventListener('change', function (e) {
        var d = e.target.value, S = sparseSet(d);
        if (!S) return;
        st.domSrc = d; st.dom = S;
        if (mode === 'image') st.A = S.length === 1 ? S : [ivl(S[0].a, S[S.length - 1].b, S[0].ac, S[S.length - 1].bc)];
        st.note = null; draw();
      });
      ['lo', 'hi'].forEach(function (k) { el.querySelector('[data-k="' + k + '"]').addEventListener('change', function () { fromCtl(null); }); });
      U.$$('.cv-br', el).forEach(function (b) { b.addEventListener('click', function () { fromCtl(b.getAttribute('data-b')); var again = el.querySelector('[data-b="' + b.getAttribute('data-b') + '"]'); if (again && !again.disabled) again.focus({ preventScroll: true }); }); });
      if (presets) U.$$('[data-p]', el).forEach(function (b) { b.addEventListener('click', function () { var p = presets[+b.getAttribute('data-p')]; setFrom({ f: p.f || fid, dom: p.dom, A: p.A, B: p.B, mode: p.mode || mode, name: p.name || 'f' }); st.note = null; draw(); }); });
    }
    draw();
    return { el: el, state: function () { return { f: fid, mode: mode, dom: st.dom, A: st.A, B: st.B }; }, result: function () { return mode === 'image' ? cimage(fid, st.dom, st.A) : cpreimage(fid, st.dom, st.B); } };
  }

  /* ================================================================== 9. PAGE */
  /* numéro de partie entouré à la main : un cercle un peu irrégulier, toujours le même pour un numéro donné */
  function pnHTML(n) {
    var pts = [], k = 26, start = -1.9 + (n % 3) * 0.35;
    for (var i = 0; i <= k; i++) {
      var a = start + i / k * (Math.PI * 2 + 0.5), r = 12.2 + 0.9 * Math.sin(i * 1.7 + n) + 0.5 * Math.cos(i * 0.9 + n * 2);
      pts.push((Math.cos(a) * r).toFixed(1) + ' ' + (Math.sin(a) * r * 0.94).toFixed(1));
    }
    return '<svg viewBox="-16 -16 32 32" aria-hidden="true"><path d="M' + pts.join('L') + '"/></svg><b>' + n + '</b>';
  }
  var MOUNT = { truth: truth, negate: negate, venn: venn, sagittal: sagittal, tree: tree, law: law, pascal: pascal, choose: choose, curve: curve };
  function mount(root) {
    if (!root || root.nodeType !== 1) return;
    function all(sel) { var l = U.$$(sel, root); if (root.matches && root.matches(sel)) l.unshift(root); return l; }
    all('.pn[data-n]').forEach(function (el) {
      if (el.getAttribute('data-pn-done')) return;
      el.setAttribute('data-pn-done', '1'); el.innerHTML = pnHTML(+el.getAttribute('data-n')); el.setAttribute('aria-hidden', 'true');
    });
    all('[data-maths]').forEach(function (el) {
      if (el.getAttribute('data-maths-done')) return;
      var f = MOUNT[el.getAttribute('data-maths')], op = {};
      if (!f) return;
      el.setAttribute('data-maths-done', '1');
      try { op = JSON.parse(el.getAttribute('data-opts') || '{}'); } catch (e) { op = {}; }
      try { f(el, op); } catch (e) { el.innerHTML = '<p class="err">' + esc(T('Outil indisponible : {m}', { m: e.message })) + '</p>'; if (window.console) console.error(e); }
    });
  }
  function init() {
    mount(document.body);
    if (window.MutationObserver) new MutationObserver(function (list) {
      for (var a = 0; a < list.length; a++) for (var b = 0; b < list[a].addedNodes.length; b++) {
        var nd = list[a].addedNodes[b];
        if (nd.nodeType === 1 && (nd.hasAttribute('data-maths') || nd.classList.contains('pn') || (nd.querySelector && nd.querySelector('[data-maths],.pn[data-n]')))) mount(nd);
      }
    }).observe(document.body, { childList: true, subtree: true });
    var links = U.$$('.toc a[href^="#"]'), secs = U.$$('.sec[id]');
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      var b = sec && sec.querySelector('[data-done]');
      if (b) { a.setAttribute('data-toc-key', b.getAttribute('data-done')); a.classList.toggle('done', R.progress.isRead(b.getAttribute('data-done'))); }
    });
    if ('IntersectionObserver' in window && links.length) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); });
      }, { rootMargin: '-35% 0px -60% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    }
    var prog = document.getElementById('prog');
    if (prog) {
      var onScroll = function () { var h = document.documentElement.scrollHeight - window.innerHeight; prog.style.width = (h > 0 ? 100 * window.scrollY / h : 0) + '%'; };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    if (R.quiz) U.$$('[data-check]').forEach(function (el) { R.quiz.mountCheck(el, el.getAttribute('data-check').split(',').map(function (s) { return s.trim(); }), el.getAttribute('data-title')); });
    U.$$('[data-check-ref]').forEach(function (el) {
      var ref = el.getAttribute('data-check-ref'), n = +el.getAttribute('data-n') || 3;
      var ids = R.quiz ? R.quiz.bank().filter(function (x) { return x.ref === ref; }).slice(0, n).map(function (x) { return x.id; }) : [];
      if (ids.length) R.quiz.mountCheck(el, ids, el.getAttribute('data-title')); else el.hidden = true;
    });
    R.wireDoneButtons();
  }
  if (typeof document !== 'undefined' && document.addEventListener && document.querySelectorAll) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  }

  R.maths = {
    F: F, frac: frac, fr: fr, binom: binom, fact: fact, tex: tx, mathify: mathify,
    logic: { parse: lparse, tex: ltex, vars: lvars, evaluate: leval, table: ltable, equivalent: lequiv },
    quant: { parse: qparse, tex: qtex, negate: qnegate, normalize: normQ },
    sets: { parse: sparse, zones: szones, tex: stex, name: sname, zoneCounts: zoneCounts },
    fn: { props: fprops, image: fimage, preimage: fpre },
    tree: { compute: tcompute }, law: { make: lawMake },
    arr: arr, count: count, countTex: countTex, intTex: intTex, leaves: LEAVES,
    pascal: { rows: pascalRows, relation: pascalRel }, choose: { tree: CHT, at: chAt, path: chPath },
    curve: { num: nparse, set: sparseSet, image: cimage, preimage: cpreimage, tex: ntex, txt: ntxt, setTex: stexSet, same: seq, fns: CURVES, ids: CURVE_IDS },
    tools: { truth: truth, negate: negate, venn: venn, sagittal: sagittal, tree: tree, law: law, pascal: pascal, choose: choose, curve: curve },
    truth: truth, negate: negate, venn: venn, sagittal: sagittal, stepper: stepper, pn: pnHTML, mount: mount
  };
})();
