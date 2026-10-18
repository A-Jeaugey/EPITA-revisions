/* Archi (Architecture des ordinateurs · Numération) — comportements communs des pages, arithmétique exacte et
   visuels pas à pas. Chargé après core.js (et qcm-engine.js s'il y a des QCM).

   PAGES
   Numéros de parties : <span class="nib" data-n="3"></span> dessine un quartet (0011, les bits à 1 allumés).
   Sommaire actif (.toc a[href^="#"] + .sec[id]), barre de lecture (#prog), vérifications de fin de partie
   (<div data-check="id1,id2"> ou <div data-check-ref="archi/cours-1-bases.html#s2" data-n="3"> : les premières
   questions de la banque dont ref vaut cette partie ; le bloc se masque si la banque n'en a pas), boutons
   « J'ai compris » (data-done="archi:<chapitre>:sN", chapitres bases, operations, entiers, flottants).
   Outils déclarés dans le HTML : <div data-archi="divs" data-opts='{"n":"715","base":2}'></div> (JSON ; mêmes
   options que l'appel en JavaScript, noms : place, divs, mults, groups, converter, drill, posed, register,
   wheel, ieee). Ils sont montés au chargement ET quand un script les ajoute plus tard (cartes d'exercices
   ouvertes à la demande, corrigés, QCM : MutationObserver). REV.archi.mount(root) monte à la main un conteneur
   (et le conteneur lui-même) ; un bloc déjà monté porte data-archi-done et n'est jamais remonté.

   NOMBRES EXACTS (REV.archi) — aucun flottant JavaScript : BigInt et fractions { n, d } (réduites, d > 0).
     Q(n, d) fabrique une fraction ; q.add / sub / mul / div / cmp / neg / abs / floor / isInt / isZero / eq /
       powb(b, k) (b^k exact, k négatif permis) / str.
     parse('1011,01', 2) → { neg, int: '1011', frac: '01', base, q } ou { error: 'empty' | 'syntax' | 'digit' |
       'base', ch } ; virgule ou point ; espaces, espaces insécables et _ ignorés ; « − » vaut « - ».
     value(str, base) → fraction ou null. digit(v) / digitVal(c) : chiffre ↔ valeur (A = 10 … Z = 35).
     intStr(n, b) / strInt(s, b) : entier BigInt ↔ écriture. clean(s) : retire espaces et séparateurs.
     divisions(n, b) → [{ n, q, r, d }] : divisions successives (n = b × q + r, d le reste écrit en chiffre).
     multiplications(f, b, { digits | max }) → { steps: [{ x, p, v, d, r }], digits, exact, period, ends } :
       multiplications successives de 0 ≤ f < 1 ; digits = nombre de chiffres demandé (troncature : on garde les
       chiffres obtenus, comme les corrigés) ; sans digits, arrêt sur une partie fractionnaire nulle, déjà vue
       (period = { start, len } : rang du premier chiffre répété, longueur du motif) ou après max étapes (24).
     toBase(v, b, { digits | max }) → { neg, int, frac, divs, mults, exact, period, ends, base }.
     terms(parse(…)) → [{ c, v, pos, w }] : la somme des produits (w = b^pos exact).
     convert(str, from, to, { digits }) → { src, res, route: 'same' | 'groups' | 'via2' | 'direct10' | 'from10' |
       'via10', kf, kt } (route : la méthode du cours ; groups : paquets de bits ; via2 : 16 → 8 par la base 2).
     packs('1011,01', 4) → { int: [{ bits, pad, d }], frac: […] } : paquets de k bits à partir de la virgule, pad =
       zéros ajoutés (à gauche pour la partie entière, à droite pour la partie fractionnaire) ; unpacks('3D,7', 4).
   OPÉRATIONS POSÉES (calcul seul ; le visuel est posed plus bas)
     addCols(['1010110', '1011101'], 2) → { cols: [{ pos, ds, cin, s, d, cout }], result: { int, frac }, L, F } :
       plusieurs opérandes ; une retenue supérieure à 1 s'écrit dans la base (« 10 » en binaire).
     subCols(a, b, base) → { cols: [{ pos, t, s, bin, need, d, bout }], result, swap } : méthode du cours (le
       chiffre du haut reçoit la base, le chiffre du bas de la colonne suivante reçoit + 1) ; swap si a < b.
     mulCols(a, b, base, { zeros }) → { rows: [{ j, d, str, zero }], sum, result }.
     divCols(a, b, base, { digits }) → { events: [{ type: 'first' | 'down' | 'comma' | 'zero' | 'small', col, cur,
       qd, sub, rem }], quotient: { int, frac }, rem, exact } : division posée du cours, digits chiffres au plus
       après la virgule.
   ENTIERS SUR n BITS (mots : chaînes de 0 et de 1, bit de poids fort à gauche ; valeurs BigInt)
     bits(v, n) (v modulo 2^n sur n bits), range(n, signé) → { min, max }, encode(v, n, signé) → { ok, bits },
     decodeU(w), decodeS(w), ones(w), twos(w) → { inv, add, bits, lost }, addN(a, b) et subN(a, b) →
     { bits, carry, u: { a, b, r, overflow }, s: { a, b, r, overflow } } (dépassement non signé de la soustraction :
     a < b ; signé : résultat exact hors de l'intervalle), signExt(w, m), hex(w).
   IEEE 754 (FMT.single : 1 + 8 + 23, biais 127 ; FMT.double : 1 + 11 + 52, biais 1023)
     ieeeEncode('67,375', 'single', { round: 'nearest' | 'trunc' }) → { s, e, M, E, cls: 'zero' | 'subnormal' |
       'normal' | 'inf' | 'nan', bits, hex, exact, value, k, n, bin, lost } ; accepte aussi 'inf', '-inf', 'nan',
       '-0' et une fraction. Arrondi au plus proche (égalité vers le pair) par défaut, comme la norme ; tous les
       nombres des sujets 2023 à 2025 sont exacts.
     ieeeDecode('2844 0000 0000 0000') → { s, e, M, E, cls, bits, hex, value, k, n } : valeur = k × 2^n, k impair
       (la forme demandée par les sujets), format déduit de la longueur (8 ou 16 chiffres, 32 ou 64 bits).
     k2n(K, N) réduit K × 2^N ; sci(v, chiffres) → { m, e } écriture scientifique tronquée.
   ÉCRITURE (virgule en français, point en anglais, y compris en binaire et en hexadécimal)
     sep() → ',' ou '.' ; fmt(x, base, o) → texte ; num(x, base, o) → <span class="bn">…<sub>base</sub></span>.
       x : '1011,01', { int, frac, neg }, BigInt ou fraction (convertie, o.digits / o.max). Binaire en paquets de 4
       de part et d'autre de la virgule, décimal en milliers (espace fine ; virgule en anglais), autres bases sans
       paquets ; o.group (taille des paquets, 0 = aucun), o.sub (indice de base, défaut true), o.period (chiffres
       répétés soulignés), o.more (« … »). dec(fraction) → texte décimal. pw(b, k) → b<sup>k</sup>.
   VISUELS (rien ne s'anime tout seul ; Précédent / Suivant / Tout afficher / Recommencer ; step: false = tout
   afficher sans boutons ; start : étape de départ)
     place(el, { base, value, edit, also, title })  positions et poids, chiffres cliquables, somme des produits.
     divs(el, { n, base })                           divisions successives, restes lus de bas en haut.
     mults(el, { x, base, digits, max })            multiplications successives, développement infini signalé.
     groups(el, { value, from: 2, to: 16 })          paquets de 4 (ou 3) bits de part et d'autre de la virgule ;
                                                     from: 16, to: 2 pour le sens inverse.
     converter(el, { value, from, to, digits })      convertisseur : ton nombre, avec les étapes du cours.
     drill(el, { kind: 'nibble' | 'pow2' })          entraînement éclair (0 à 15 dans les trois bases, puissances de 2).
     posed(el, { op: 'add' | 'sub' | 'mul' | 'div', ops: [a, b, …], base, digits, zeros, pad })
                                                     opération posée colonne par colonne, retenues et emprunts.
     register(el, { n: 8, value, sizes: [4, 8, 16] }) registre cliquable : non signé, signé, hexadécimal,
                                                     complément à un et à deux, + 1 / − 1 et dépassements.
     wheel(el, { value })                            la roue des 16 mots de 4 bits (dépassements non signé et signé).
     ieee(el, { fmt, value } | { fmt, hex }, input, round) le mot IEEE 754 coloré par champs (S violet, E cuivre,
                                                     M bleu), en paquets de 4 avec l'hexadécimal, et ses étapes.

   Textes affichés : REV.t('français') ; l'anglais est déclaré ci-dessous (REV.i18n.add). */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t, EN = R.lang === 'en';
  R.i18n.add({
    'base {b}': 'base {b}', 'Précédent': 'Previous', 'Suivant': 'Next', 'Tout afficher': 'Show all', 'Recommencer': 'Start again',
    'étape {i} / {n}': 'step {i} / {n}', 'Étape {i} : ': 'Step {i}: ', 'Résultat : {r}.': 'Result: {r}.',
    /* positions et poids */
    'Positions et poids': 'Positions and weights',
    'Clique sur un chiffre pour l’augmenter de 1 (flèches haut et bas au clavier).': 'Click a digit to add 1 to it (up and down arrow keys too).',
    'position {k}, chiffre {c}': 'position {k}, digit {c}', 'position': 'position', 'poids': 'weight', 'chiffre': 'digit', 'reste': 'remainder',
    /* divisions successives */
    'Divisions successives': 'Successive divisions',
    'Appuie sur « Suivant » : on divise {n} par {b}.': 'Press “Next”: {n} is divided by {b}.',
    '{n} = {b} × {q} + {r} : le reste {r} est le chiffre de poids {p}.': '{n} = {b} × {q} + {r}: the remainder {r} is the digit of weight {p}.',
    'En base {b}, {r} s’écrit {d}.': 'In base {b}, {r} is written {d}.',
    'Le quotient vaut 0 : c’est la dernière division.': 'The quotient is 0: this is the last division.',
    'On lit les restes de bas en haut : le dernier reste est le chiffre de gauche.': 'Read the remainders from bottom to top: the last remainder is the leftmost digit.',
    /* multiplications successives */
    'déjà vu': 'already seen', 'Multiplications successives': 'Successive multiplications',
    'La partie fractionnaire est nulle : il n’y a rien à convertir.': 'The fractional part is 0: there is nothing to convert.',
    'La partie fractionnaire est nulle : la conversion est exacte. On lit les chiffres de haut en bas.': 'The fractional part is 0: the conversion is exact. Read the digits from top to bottom.',
    'La partie fractionnaire {x} est déjà apparue : les mêmes chiffres reviennent sans fin. Le développement en base {b} est infini (les chiffres soulignés se répètent).':
      'The fractional part {x} has already appeared: the same digits come back endlessly. The base-{b} expansion is infinite (the underlined digits repeat).',
    'On a les {n} chiffres demandés : on s’arrête là, sans arrondir. On lit les chiffres de haut en bas.': 'We have the {n} digits asked for: stop here, without rounding. Read the digits from top to bottom.',
    'On s’arrête ici : le développement continue ({p}).': 'We stop here: the expansion goes on ({p}).',
    'il est infini': 'it is infinite', 'il s’arrête après {n} chiffres': 'it ends after {n} digits', 'très long': 'very long',
    'Appuie sur « Suivant » : on multiplie {x} par {b}.': 'Press “Next”: {x} is multiplied by {b}.',
    '{x} × {b} = {p} : la partie entière {v} donne le chiffre de poids {w}, on garde {r} pour la ligne suivante.':
      '{x} × {b} = {p}: the integer part {v} gives the digit of weight {w}, and {r} is kept for the next line.',
    /* paquets */
    'Un chiffre → {k} bits': 'One digit → {k} bits', 'Paquets de {k} bits': 'Groups of {k} bits',
    'Chaque chiffre donne exactement {k} bits ; les zéros en tête de la partie entière et en fin de partie fractionnaire peuvent ensuite disparaître.':
      'Each digit gives exactly {k} bits; the leading zeros of the integer part and the trailing zeros of the fractional part can then be dropped.',
    'On part de la virgule : vers la gauche pour la partie entière, vers la droite pour la partie fractionnaire. Les zéros en pointillés complètent un paquet.':
      'Start from the point: leftwards for the integer part, rightwards for the fractional part. The dashed zeros complete a group.',
    /* convertisseur */
    'Convertisseur': 'Converter', 'ton nombre, avec les étapes': 'your number, with the steps', 'Nombre': 'Number', 'de la base': 'from base',
    'vers la base': 'to base', 'chiffres après la virgule': 'digits after the point', 'auto': 'auto',
    'Tape un nombre (virgule ou point).': 'Type a number (point or comma).',
    '« {c} » n’est pas un chiffre de la base {b} : ses chiffres vont de 0 à {m}.': '“{c}” is not a base-{b} digit: its digits go from 0 to {m}.',
    'Écriture non reconnue : des chiffres, au plus une virgule ou un point.': 'Not recognised: digits, with at most one point or comma.',
    '1. Vers la base 2': '1. To base 2', '2. De la base 2 vers la base {b}': '2. From base 2 to base {b}',
    '1. Vers la base 10 : la somme des produits': '1. To base 10: the sum of products', 'La somme des produits': 'The sum of products',
    'Partie entière : divisions successives': 'Integer part: successive divisions', 'Partie fractionnaire : multiplications successives': 'Fractional part: successive multiplications',
    'Même base : rien à faire.': 'Same base: nothing to do.',
    '{t} = 2<sup>{k}</sup> : des paquets de {k} bits, à partir de la virgule.': '{t} = 2<sup>{k}</sup>: groups of {k} bits, starting from the point.',
    '{f} = 2<sup>{k}</sup> : chaque chiffre donne {k} bits.': '{f} = 2<sup>{k}</sup>: each digit gives {k} bits.',
    '{f} et {t} sont deux puissances de 2 : on passe par la base 2.': '{f} and {t} are both powers of 2: go through base 2.',
    '{n} chiffres après la virgule demandés : on s’arrête là, sans arrondir.': '{n} digits after the point asked for: stop there, without rounding.',
    'Le développement est infini : les chiffres soulignés se répètent.': 'The expansion is infinite: the underlined digits repeat.',
    'Vers la base 10 : la somme des produits, chiffre × poids.': 'To base 10: the sum of products, digit × weight.',
    'Partie entière : divisions successives. Partie fractionnaire : multiplications successives.': 'Integer part: successive divisions. Fractional part: successive multiplications.',
    'Ni {f} ni {t} ne sont des puissances d’une même base : on passe par la base 10.': '{f} and {t} are not powers of the same base: go through base 10.',
    /* entraînement */
    'Puissances de 2 · entraînement': 'Powers of two · drill', 'De 0 à 15 · entraînement': '0 to 15 · drill', 'Vérifier': 'Check', 'Autre': 'Another',
    'Exact.': 'Right.', 'Non : la réponse est {r}.': 'No: the answer is {r}.', '({v} = {b})': '({v} = {b})', '{ok} / {n} justes': '{ok} / {n} right',
    /* opérations posées */
    'Addition posée': 'Addition', 'Soustraction posée': 'Subtraction', 'Multiplication posée': 'Multiplication', 'Division posée': 'Division',
    'On additionne colonne par colonne, de droite à gauche, en reportant les retenues.': 'Add column by column, from right to left, carrying over.',
    'Il reste la retenue {c} : on l’écrit.': 'The carry {c} is left: write it down.',
    'on pose {d}, on retient {c}.': 'write down {d}, carry {c}.', 'on pose {d}.': 'write down {d}.',
    'Le premier nombre est plus petit : on calcule l’inverse, et le résultat sera négatif.': 'The first number is smaller: compute the reverse subtraction; the result will be negative.',
    'On soustrait colonne par colonne, de droite à gauche. Quand le chiffre du haut est trop petit, on emprunte 1 : il gagne {b} et le chiffre du bas de la colonne suivante gagne 1.':
      'Subtract column by column, from right to left. When the top digit is too small, borrow 1: it gains {b}, and the bottom digit of the next column gains 1.',
    'on emprunte 1': 'borrow 1',
    'Un produit partiel par chiffre du multiplicateur, en partant de la droite, chacun décalé d’un rang de plus vers la gauche ; puis on les additionne.':
      'One partial product for each digit of the multiplier, starting from the right, each one shifted one more place to the left; then add the partial products.',
    'le chiffre de poids {p} du multiplicateur vaut 1 : on écrit le multiplicande, décalé de {j} rang(s).': 'the digit of weight {p} of the multiplier is 1: write down the multiplicand, shifted {j} place(s) left.',
    'le chiffre de poids {p} du multiplicateur vaut 0 : une ligne de zéros, décalée de {j} rang(s).': 'the digit of weight {p} of the multiplier is 0: write down zeros, shifted {j} place(s) left.',
    'chiffre de poids {p} : {a} × {d} = {r}, décalé de {j} rang(s).': 'digit of weight {p}: {a} × {d} = {r}, shifted {j} place(s) left.',
    'on additionne les produits partiels, colonne par colonne avec les retenues.': 'add the partial products, column by column with the carries.',
    'le chiffre de droite du multiplicateur vaut 1 : on écrit le multiplicande.': 'the rightmost digit of the multiplier is 1: write down the multiplicand.',
    'le chiffre de droite du multiplicateur vaut 0 : une ligne de zéros.': 'the rightmost digit of the multiplier is 0: write down zeros.',
    'Un seul chiffre dans cette colonne : on pose {d}.': 'Only one digit in this column: write down {d}.',
    'Il reste la retenue {c} : on pose {d}, on retient {r}.': 'The carry {c} is left: write down {d}, carry {r}.',
    'Division par zéro.': 'Division by zero.',
    'Le dividende à gauche, le diviseur à droite, le quotient sous le diviseur.': 'The dividend on the left, the divisor on the right, the quotient under the divisor.',
    'Le diviseur ({d}) est plus grand que le dividende : le quotient commence par 0.': 'The divisor ({d}) is greater than the dividend: the quotient starts with 0.',
    'Le diviseur ({d}) va {q} fois dans {c}, le plus petit début du dividende qui le contient. On écrit {q} au quotient et on soustrait : {c} − {s} = {r}.':
      'The divisor ({d}) goes into {c} (the shortest leading part of the dividend that contains it) {q} time(s). Record {q} in the quotient and subtract: {c} − {s} = {r}.',
    'Tous les chiffres du dividende sont abaissés et le reste n’est pas nul : on écrit une virgule au quotient, puis on ajoute un 0 au reste.':
      'All the digits of the dividend have been brought down and the remainder is not 0: record a point in the quotient, then bring down an extra 0 to the remainder.',
    'On ajoute un 0 au reste : {c}.': 'Bring down an extra 0 to the remainder: {c}.',
    'On abaisse le chiffre suivant ({x}) : {c}.': 'Bring down the next digit ({x}): {c}.',
    'C’est plus petit que le diviseur : on écrit 0 au quotient.': 'It is smaller than the divisor: record a 0 in the quotient.',
    'Le diviseur y va {q} fois : on écrit {q} au quotient et on soustrait : {c} − {s} = {r}.': 'The divisor goes into it {q} time(s): record {q} in the quotient and subtract: {c} − {s} = {r}.',
    'Le reste est nul : {a} / {d} = {q}.': 'The final remainder is 0: {a} / {d} = {q}.',
    'On a les chiffres demandés après la virgule : on s’arrête. {a} / {d} ≈ {q} (reste {r}).': 'We have the digits asked for after the point: stop. {a} / {d} ≈ {q} (remainder {r}).',
    'Quotient {q}, reste {r}.': 'Quotient {q}, remainder {r}.',
    /* registre */
    'Registre de {n} bits': '{n}-bit register', 'Taille du mot': 'Word size', 'Complément à un': 'One’s complement', 'Complément à deux': 'Two’s complement',
    'Effacer': 'Clear', 'bit {k}': 'bit {k}', 'binaire': 'binary', 'hexadécimal': 'hexadecimal', 'non signé': 'unsigned', 'signé': 'signed',
    'Le bit {k} vaut {p} en non signé ; le bit de poids fort ({m}) compte pour {s} en signé.': 'Bit {k} is worth {p} unsigned; the most significant bit ({m}) counts for {s} signed.',
    'Extension de signe : on recopie le bit de poids fort à gauche, la valeur signée ne change pas.': 'Sign extension: the sign bit is replicated to the left, the signed value does not change.',
    'Les bits de gauche retirés étaient des copies du bit de signe : la valeur signée ne change pas.': 'The bits removed on the left were copies of the sign bit: the signed value does not change.',
    'Des bits utiles sont perdus : la valeur change.': 'Useful bits are lost: the value changes.',
    'mot': 'word', 'tous les bits inversés': 'each bit inverted', 'Complément à un : chaque 0 devient 1, chaque 1 devient 0.': 'One’s complement: each 0 becomes 1, each 1 becomes 0.',
    '1. inverser (complément à un)': '1. invert each bit (one’s complement)', '2. ajouter 1': '2. add one', 'complément à deux': 'two’s complement',
    '{a} est la plus petite valeur signée sur {n} bits : son opposé ne tient pas sur {n} bits, le complément à deux redonne le même mot.':
      '{a} is the smallest {n}-bit signed value: its opposite does not fit in {n} bits, and the two’s complement gives the same word back.',
    'En signé, {a} devient {b} : le complément à deux donne l’opposé.': 'Signed, {a} becomes {b}: the two’s complement gives the opposite.',
    'La retenue qui sort à gauche est perdue.': 'The carry out on the left is left out.',
    'Dépassement non signé : {a} {o} 1 ne tient pas sur {n} bits, le mot repart à {r}.': 'Unsigned overflow: {a} {o} 1 does not fit in {n} bits, the word cycles back to {r}.',
    'Dépassement signé : {a} {o} 1 sort de l’intervalle, le mot vaut {r} en signé.': 'Signed overflow: {a} {o} 1 is out of range, the word is {r} signed.',
    'la retenue sortante est perdue': 'the carry out is left out', 'Pas de dépassement.': 'No overflow.',
    /* roue */
    'La roue des mots de 4 bits': 'The wheel of 4-bit words', 'non signé dedans, signé dehors': 'unsigned inside, signed outside',
    'Roue des 16 mots de 4 bits ; mot courant {w}': 'Wheel of the 16 four-bit words; current word {w}',
    'dépassement non signé': 'unsigned overflow', 'dépassement signé': 'signed overflow',
    'Non signé : {a} {o} = {r}': 'Unsigned: {a} {o} = {r}', 'hors de 0 … 15 : dépassement non signé, le mot vaut {v}.': 'out of 0 … 15: unsigned overflow, the word is {v}.',
    'Signé : {a} {o} = {r}': 'Signed: {a} {o} = {r}', 'hors de −8 … 7 : dépassement signé, le mot vaut {v}.': 'out of −8 … 7: signed overflow, the word is {v}.',
    'Le mot {w} : {u} en non signé, {s} en signé. Tourne la roue avec les boutons.': 'The word {w}: {u} unsigned, {s} signed. Turn the wheel with the buttons.',
    /* IEEE 754 */
    'Le mot en paquets de 4 bits, et son écriture hexadécimale': 'The word in groups of 4 bits, and its hexadecimal form',
    'NaN (« pas un nombre ») : {e} rempli de 1 et {m} non nul.': 'NaN (“not a number”): {e} all ones and {m} not zero.',
    'La valeur dépasse le plus grand nombre représentable : on obtient l’infini.': 'The value is above the largest representable number: the result is infinity.',
    'L’infini : {e} rempli de 1, {m} nul.': 'Infinity: {e} all ones, {m} zero.', '{s} = {v} : le signe.': '{s} = {v}: the sign.',
    'Zéro : {e} et {m} nuls ; seul {s} distingue +0 de −0.': 'Zero: {e} and {m} are zero; only {s} tells +0 from −0.',
    'Signe : le nombre est {p}, donc {s} = {v}.': 'Sign: the number is {p}, so {s} = {v}.', 'négatif': 'negative', 'positif': 'positive',
    'En binaire : {a} = {b}.': 'In binary: {a} = {b}.',
    'Le nombre est trop petit, même pour un dénormalisé : il est arrondi à 0.': 'The number is too small, even for a denormalized number: it is rounded to 0.',
    'Normalisé, il s’écrirait 1,… × {p} : l’exposant est plus petit que {m}. C’est un nombre dénormalisé : {e} = 0 et on écrit 0,{mm} × {q}.':
      'Normalized, it would be 1.… × {p}: the exponent is less than {m}. It is a denormalized number: {e} = 0 and it is written 0.{mm} × {q}.',
    'Normalisation : on déplace la virgule derrière le premier 1, de {k} rang(s) vers la {d} : {v}.': 'Normalization: move the point just after the first 1, {k} place(s) to the {d}: {v}.',
    'gauche': 'left', 'droite': 'right',
    'Exposant : {e} = {E} + {b} = {v} = {w}.': 'Exponent: {e} = {E} + {b} = {v} = {w}.',
    'Mantisse : les chiffres après la virgule, complétés à droite par des 0 jusqu’à {n} bits : {m} = {v}.': 'Mantissa: the digits after the point, padded on the right with 0s up to {n} bits: {m} = {v}.',
    'Il faudrait plus de {n} bits : on garde les {n} premiers, arrondis au plus proche (la valeur codée n’est pas exactement la valeur de départ).':
      'More than {n} bits would be needed: the first {n} are kept, rounded to nearest (the encoded value is not exactly the starting value).',
    'Il faudrait plus de {n} bits : on garde les {n} premiers, sans arrondir (la valeur codée n’est pas exactement la valeur de départ).':
      'More than {n} bits would be needed: the first {n} are kept, without rounding (the encoded value is not exactly the starting value).',
    'Le mot : {w}.': 'The word: {w}.', 'Valeur codée : {v}.': 'Encoded value: {v}.', 'Sur la copie (sans espace) :': 'On the exam paper (no spaces):',
    '{s} = {v} : le nombre est {p}.': '{s} = {v}: the number is {p}.',
    '{e} = {w} (rempli de 1) et {m} = 0 : c’est l’infini.': '{e} = {w} (all ones) and {m} = 0: this is infinity.', 'Représentation : {r}.': 'Associated representation: {r}.',
    '{e} = {w} (rempli de 1) et {m} ≠ 0 : ce n’est pas un nombre.': '{e} = {w} (all ones) and {m} ≠ 0: this is not a number.',
    '{e} = 0 et {m} = 0 : c’est zéro.': '{e} = 0 and {m} = 0: this is zero.',
    '{e} = 0 et {m} ≠ 0 : nombre dénormalisé. Pas de 1 avant la virgule, et l’exposant vaut {m0}.': '{e} = 0 and {m} ≠ 0: denormalized number. No 1 before the point, and the exponent is {m0}.',
    '{m} = {v} : la valeur est 0,{t} × {p}.': '{m} = {v}: the value is 0.{t} × {p}.',
    '{e} = {w} = {v} : l’exposant vaut {v} − {b} = {E}.': '{e} = {w} = {v}: the exponent is {v} − {b} = {E}.',
    '{m} = {v} : la valeur est 1,{t} × {p}.': '{m} = {v}: the value is 1.{t} × {p}.',
    'On déplace la virgule de {f} rang(s) vers la droite pour obtenir un entier (impair), et on retire {f} à l’exposant.': 'Move the point {f} place(s) to the right to get an (odd) integer, and take {f} off the exponent.',
    'En décimal : {v}.': 'In decimal: {v}.', 'IEEE 754': 'IEEE 754', 'Sens': 'Direction', 'Nombre → mot': 'Number → word', 'Mot → nombre': 'Word → number',
    'Format': 'Format', 'simple (32 bits)': 'single (32 bits)', 'double (64 bits)': 'double (64 bits)',
    'simple précision · 1 + 8 + 23 bits, biais 127': 'single precision · 1 + 8 + 23 bits, bias 127', 'double précision · 1 + 11 + 52 bits, biais 1023': 'double precision · 1 + 11 + 52 bits, bias 1023',
    'Nombre (décimal)': 'Number (decimal)', 'Mot en hexadécimal ({n} chiffres)': 'Hexadecimal word ({n} digits)',
    'Tape un nombre décimal (virgule ou point), ou inf, −inf, nan.': 'Type a decimal number (point or comma), or inf, −inf, nan.',
    'Tape un mot de {n} chiffres hexadécimaux (espaces permis) ou de {b} bits.': 'Type a word of {n} hexadecimal digits (spaces allowed) or of {b} bits.',
    'Outil indisponible : {m}': 'Tool unavailable: {m}'
  });

  /* ================================================================== 1. ARITHMÉTIQUE EXACTE
     Rien ne passe par les flottants de JavaScript : entiers BigInt et fractions exactes { n, d } (d > 0,
     fraction réduite). Aucune écriture 0n (syntaxe récente) : BigInt(…) seulement. */
  var Z = BigInt(0), ONE = BigInt(1), TWO = BigInt(2);
  function big(x) { return typeof x === 'bigint' ? x : BigInt(x); }
  function babs(a) { return a < Z ? -a : a; }
  function bgcd(a, b) { a = babs(a); b = babs(b); while (b !== Z) { var t = a % b; a = b; b = t; } return a; }
  function bpow(b, k) { b = big(b); k = Number(k); var r = ONE; while (k > 0) { if (k % 2) r *= b; b *= b; k = Math.floor(k / 2); } return r; }
  function bitlen(n) { n = babs(big(n)); return n === Z ? 0 : n.toString(2).length; }

  function Q(n, d) {
    n = big(n); d = d === undefined ? ONE : big(d);
    if (d === Z) throw new Error('archi : division par zéro');
    if (d < Z) { n = -n; d = -d; }
    var g = bgcd(n, d);
    if (g > ONE) { n /= g; d /= g; }
    return { n: n, d: d };
  }
  var q = {
    make: Q,
    add: function (a, b) { return Q(a.n * b.d + b.n * a.d, a.d * b.d); },
    sub: function (a, b) { return Q(a.n * b.d - b.n * a.d, a.d * b.d); },
    mul: function (a, b) { return Q(a.n * b.n, a.d * b.d); },
    div: function (a, b) { return Q(a.n * b.d, a.d * b.n); },
    cmp: function (a, b) { var x = a.n * b.d, y = b.n * a.d; return x < y ? -1 : x > y ? 1 : 0; },
    neg: function (a) { return { n: -a.n, d: a.d }; },
    abs: function (a) { return { n: babs(a.n), d: a.d }; },
    floor: function (a) { var f = a.n / a.d; if (a.n < Z && f * a.d !== a.n) f -= ONE; return f; },
    isInt: function (a) { return a.d === ONE; },
    isZero: function (a) { return a.n === Z; },
    eq: function (a, b) { return a.n === b.n && a.d === b.d; },
    powb: function (b, k) { k = Number(k); return k >= 0 ? Q(bpow(b, k)) : Q(ONE, bpow(b, -k)); },
    str: function (a) { return String(a.n) + (a.d === ONE ? '' : '/' + String(a.d)); }
  };

  /* ---------- chiffres ---------- */
  var DIG = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  function digit(v) { return DIG.charAt(Number(v)); }
  function digitVal(c) { return DIG.indexOf(String(c).toUpperCase()); }
  function intStr(n, b) { n = big(n); return n < Z ? '-' + (-n).toString(+b || 10).toUpperCase() : n.toString(+b || 10).toUpperCase(); }
  function strInt(s, b) {
    var n = Z, B = big(+b || 10); s = String(s);
    for (var i = 0; i < s.length; i++) n = n * B + big(digitVal(s.charAt(i)));
    return n;
  }
  /* espaces, espaces insécables, soulignés : séparateurs de paquets, ignorés ; « − » et « – » valent « - » */
  function clean(s) { return String(s == null ? '' : s).replace(/[\s\u00a0\u202f_]/g, '').replace(/[−–]/g, '-'); }

  /* parse('1011,01', 2) → { neg, int: '1011', frac: '01', base: 2, q: { n, d } }
     ou { error: 'empty' | 'syntax' | 'digit' | 'base', ch, base }. Virgule ou point comme séparateur. */
  function parse(str, base) {
    base = +base || 10;
    if (base < 2 || base > 36) return { error: 'base', base: base };
    var s = clean(str), neg = false;
    if (!s) return { error: 'empty' };
    if (s.charAt(0) === '-' || s.charAt(0) === '+') { neg = s.charAt(0) === '-'; s = s.slice(1); }
    var m = /^([0-9A-Za-z]*)(?:[.,]([0-9A-Za-z]*))?$/.exec(s);
    if (!m || (!m[1] && !m[2])) return { error: 'syntax' };
    var ip = (m[1] || '').toUpperCase(), fp = (m[2] || '').toUpperCase(), all = ip + fp;
    for (var i = 0; i < all.length; i++) {
      var v = digitVal(all.charAt(i));
      if (v < 0 || v >= base) return { error: 'digit', ch: all.charAt(i), base: base };
    }
    var n = strInt(all, base);
    return { neg: neg && n !== Z, int: ip.replace(/^0+(?=.)/, '') || '0', frac: fp, base: base, q: Q(neg ? -n : n, bpow(base, fp.length)) };
  }
  /* la valeur exacte d'une écriture, ou null */
  function value(str, base) { var p = parse(str, base); return p.error ? null : p.q; }

  /* ---------- base 10 → base b ---------- */
  /* divisions successives de l'entier n ≥ 0 : [{ n, q, r, d }] (d : le reste écrit comme chiffre) */
  function divisions(n, b) {
    var B = big(b), out = [];
    n = big(n);
    do { var qq = n / B, r = n % B; out.push({ n: n, q: qq, r: r, d: digit(r) }); n = qq; } while (n > Z);
    return out;
  }
  /* multiplications successives de la fraction f (0 ≤ f < 1) par b.
     o.digits : nombre de chiffres demandé (on s'arrête là : troncature, comme au partiel) ;
     sans o.digits : jusqu'à une partie fractionnaire nulle, une partie fractionnaire déjà vue (développement
     périodique) ou o.max étapes (24 par défaut).
     → { steps: [{ x, p, v, d, r }], digits, exact, period: { start, len } | null, ends }
       x : la partie fractionnaire multipliée, p = x × b, v = partie entière de p (le chiffre, d en lettre),
       r = partie fractionnaire de p ; period.start : rang du premier chiffre qui se répète ; ends : nombre de
       chiffres d'un développement fini mais plus long que ce qui est affiché. */
  function multiplications(f, b, o) {
    o = o || {};
    var B = big(b), D = f.d, x = f.n, seen = {}, steps = [], period = null;
    var want = o.digits != null && o.digits !== '' ? Math.max(0, +o.digits) : null;
    var max = want != null ? want : (o.max || 24);
    while (x !== Z && steps.length < max) {
      var k = String(x);
      if (seen[k] != null) {
        if (!period) period = { start: seen[k], len: steps.length - seen[k] };
        if (want == null) break;
      } else seen[k] = steps.length;
      var p = x * B, v = p / D, r = p % D;
      steps.push({ x: Q(x, D), p: Q(p, D), v: v, d: digit(v), r: Q(r, D) });
      x = r;
    }
    var exact = x === Z, ends = null;
    if (!exact && !period) {                 /* au-delà de ce qui est affiché : fini ou périodique ? */
      var y = x, i = steps.length, guard = 0;
      while (guard++ < 4000) {
        if (y === Z) { ends = i; break; }
        var ky = String(y);
        if (seen[ky] != null) { period = { start: seen[ky], len: i - seen[ky] }; break; }
        seen[ky] = i; y = (y * B) % D; i++;
      }
    }
    return { steps: steps, digits: steps.map(function (s) { return s.d; }).join(''), exact: exact, period: period, ends: ends };
  }
  /* toBase(v, b, { digits | max }) → { neg, int, frac, divs, mults, exact, period, ends, base } */
  function toBase(v, b, o) {
    o = o || {};
    var neg = v.n < Z, a = q.abs(v), ip = q.floor(a), f = q.sub(a, Q(ip));
    var divs = divisions(ip, b), mul = multiplications(f, b, o);
    return {
      neg: neg, int: divs.map(function (s) { return s.d; }).reverse().join(''), frac: mul.digits,
      divs: divs, mults: mul.steps, exact: mul.exact, period: mul.period, ends: mul.ends, base: +b
    };
  }
  /* base b → base 10 : la somme des produits. terms(p) → [{ c, v, pos, w }] (w = b^pos, exact) */
  function terms(p) {
    var out = [], ds = p.int + p.frac, L = p.int.length;
    for (var i = 0; i < ds.length; i++) {
      var pos = L - 1 - i;
      out.push({ c: ds.charAt(i), v: digitVal(ds.charAt(i)), pos: pos, w: q.powb(p.base, pos) });
    }
    return out;
  }
  /* conversion complète d'une écriture : convert('715,40625', 10, 2, { digits }) →
     { from, to, src: parse, res: toBase, route: 'same' | 'groups' | 'via2' | 'direct10' | 'from10' | 'via10',
       k (taille des paquets) } ; ou { error, … } */
  function pow2(b) { var k = 0; while ((1 << k) < b) k++; return (1 << k) === b ? k : 0; }
  function convert(str, from, to, o) {
    from = +from; to = +to; o = o || {};
    if (to < 2 || to > 36) return { error: 'base', base: to };
    var p = parse(str, from);
    if (p.error) return p;
    var res = toBase(p.q, to, o), kf = pow2(from), kt = pow2(to), route;
    if (from === to) route = 'same';
    else if (to === 10) route = 'direct10';
    else if (from === 10) route = 'from10';
    else if (kf && kt) route = (from === 2 || to === 2) ? 'groups' : 'via2';
    else route = 'via10';
    /* passage par une puissance de 2 : le résultat est exact, sans limite de chiffres */
    if ((route === 'groups' || route === 'via2') && (o.digits == null || o.digits === '')) res = toBase(p.q, to, { max: 4096 });
    return { from: from, to: to, src: p, res: res, route: route, k: route === 'groups' ? (from === 2 ? kt : kf) : 0, kf: kf, kt: kt };
  }

  /* ---------- paquets de k chiffres binaires (k = 4 pour l'hexadécimal, 3 pour l'octal) ----------
     packs('1011,01', 4) → { int: [{ bits: '1011', pad: 0, d: 'B' }], frac: [{ bits: '0100', pad: 2, d: '4' }] }
     pad : nombre de zéros ajoutés (à gauche pour la partie entière, à droite pour la partie fractionnaire). */
  function packs(bin, k) {
    var p = /^([01]*)(?:[.,]([01]*))?$/.exec(clean(bin));
    if (!p) return null;
    var ip = (p[1] || '0').replace(/^0+(?=.)/, ''), fp = p[2] || '';
    var ints = [], fracs = [], i;
    for (i = ip.length; i > 0; i -= k) {
      var s = ip.slice(Math.max(0, i - k), i), pad = k - s.length;
      s = new Array(pad + 1).join('0') + s;
      ints.unshift({ bits: s, pad: pad, d: digit(strInt(s, 2)) });
    }
    for (i = 0; i < fp.length; i += k) {
      var t = fp.slice(i, i + k), pd = k - t.length;
      t = t + new Array(pd + 1).join('0');
      fracs.push({ bits: t, pad: pd, d: digit(strInt(t, 2)) });
    }
    return { int: ints, frac: fracs, k: k };
  }
  /* chaque chiffre d'une base 2^k → k chiffres binaires : [{ d, bits }] */
  function unpacks(str, k) {
    var p = /^([0-9A-Za-z]*)(?:[.,]([0-9A-Za-z]*))?$/.exec(clean(str));
    if (!p) return null;
    function one(c) { var b = digitVal(c).toString(2); return { d: c.toUpperCase(), bits: new Array(k - b.length + 1).join('0') + b }; }
    return { int: (p[1] || '0').split('').map(one), frac: (p[2] || '').split('').map(one), k: k };
  }

  /* ================================================================== 2. OPÉRATIONS POSÉES (calculs)
     Les nombres sont des écritures (chaînes) dans la base donnée, positifs ; virgule ou point admis.
     Une colonne est repérée par sa position pos (puissance de la base) : 0 pour les unités, −1 après la virgule. */
  function splitNum(s) {
    var m = /^([0-9A-Za-z]*)(?:[.,]([0-9A-Za-z]*))?$/.exec(clean(s));
    return m ? { int: (m[1] || '0').toUpperCase(), frac: (m[2] || '').toUpperCase() } : { int: '0', frac: '' };
  }
  function digitAt(p, pos) {
    if (pos >= 0) { var i = p.int.length - 1 - pos; return i >= 0 ? digitVal(p.int.charAt(i)) : null; }
    var j = -pos - 1; return j < p.frac.length ? digitVal(p.frac.charAt(j)) : null;
  }
  function joinRes(map, top, F) {
    var ip = '', fp = '', pos;
    for (pos = top; pos >= 0; pos--) ip += digit(map[pos] || 0);
    for (pos = -1; pos >= -F; pos--) fp += digit(map[pos] || 0);
    return { int: ip.replace(/^0+(?=.)/, '') || '0', frac: fp };
  }
  /* addition de plusieurs nombres : retenues colonne par colonne (une retenue peut dépasser 1 quand on additionne
     plus de deux nombres : elle s'écrit alors dans la base, « 10 » pour 2 en binaire).
     → { base, L, F, ops, cols: [{ pos, ds, cin, s, d, cout }], result: { int, frac } } */
  function addCols(list, base) {
    var B = +base, ps = list.map(splitNum), L = 0, F = 0;
    ps.forEach(function (p) { L = Math.max(L, p.int.length); F = Math.max(F, p.frac.length); });
    var cols = [], carry = 0, res = {}, pos;
    for (pos = -F; pos < L || carry > 0; pos++) {
      var ds = ps.map(function (p) { return digitAt(p, pos); }), s = carry;
      ds.forEach(function (d) { if (d != null) s += d; });
      var d = s % B, cout = Math.floor(s / B);
      cols.push({ pos: pos, ds: ds, cin: carry, s: s, d: d, cout: cout });
      res[pos] = d; carry = cout;
    }
    return { op: 'add', base: B, L: L, F: F, ops: ps, cols: cols, result: joinRes(res, pos - 1, F) };
  }
  /* soustraction a − b, méthode du cours (« on emprunte 1 ») : quand le chiffre du haut est trop petit, il
     reçoit une dizaine de la base (petit 1 devant lui) et le chiffre du bas de la colonne suivante reçoit + 1.
     Si a < b, on calcule b − a (swap : true) : le résultat est négatif.
     → { base, L, F, ops: [haut, bas], cols: [{ pos, t, s, bin, need, d, bout }], result, swap } */
  function subCols(a, b, base) {
    var B = +base, pa = splitNum(a), pb = splitNum(b), swap = false;
    var va = value(pa.int + ',' + pa.frac, B), vb = value(pb.int + ',' + pb.frac, B);
    if (va && vb && q.cmp(va, vb) < 0) { var t0 = pa; pa = pb; pb = t0; swap = true; }
    var L = Math.max(pa.int.length, pb.int.length), F = Math.max(pa.frac.length, pb.frac.length);
    var cols = [], bin = 0, res = {};
    for (var pos = -F; pos < L; pos++) {
      var t = digitAt(pa, pos), s = digitAt(pb, pos), need = (s || 0) + bin, d, bout;
      if ((t || 0) >= need) { d = (t || 0) - need; bout = 0; } else { d = (t || 0) + B - need; bout = 1; }
      cols.push({ pos: pos, t: t, s: s, bin: bin, need: need, d: d, bout: bout });
      res[pos] = d; bin = bout;
    }
    return { op: 'sub', base: B, L: L, F: F, ops: [pa, pb], cols: cols, result: joinRes(res, L - 1, F), swap: swap };
  }
  /* multiplication de deux entiers : un produit partiel par chiffre du multiplicateur, décalé d'un rang à
     chaque fois, puis leur somme. o.zeros (défaut true, comme le cours) : écrire la ligne de zéros d'un chiffre 0.
     → { base, a, b, rows: [{ j, d, str, zero }], sum: addCols, result } */
  function mulCols(a, b, base, o) {
    o = o || {};
    var B = +base, A = strInt(clean(a), B), sb = clean(b).toUpperCase(), rows = [];
    for (var j = 0; j < sb.length; j++) {
      var dj = digitVal(sb.charAt(sb.length - 1 - j)), pr = A * big(dj);
      if (dj === 0 && o.zeros === false) continue;
      rows.push({ j: j, d: dj, str: dj === 0 ? new Array(clean(a).length + 1).join('0') : intStr(pr, B), zero: dj === 0 });
    }
    var sum = addCols(rows.map(function (r) { return r.str + new Array(r.j + 1).join('0'); }), B);
    return { op: 'mul', base: B, a: clean(a).toUpperCase(), b: sb, rows: rows, sum: sum, result: intStr(A * strInt(sb, B), B) };
  }
  /* division posée de deux entiers, comme dans le cours : on prend d'abord le plus petit début du dividende qui
     contient le diviseur, puis on abaisse un chiffre à la fois ; après le dernier chiffre, une virgule au quotient
     et un 0 ajouté au reste, autant de fois que de chiffres demandés après la virgule (o.digits).
     → { base, a, b, events: [{ type: 'first' | 'down' | 'comma' | 'zero' | 'small', col, cur, qd, sub, rem }],
         quotient: { int, frac }, rem, exact } */
  function divCols(a, b, base, o) {
    o = o || {};
    var B = +base, BB = big(B), sa = clean(a).toUpperCase().replace(/^0+(?=.)/, ''), Bv = strInt(clean(b), B);
    if (Bv === Z) return { error: 'zero' };
    var ev = [], qi = '', qf = '', rem, pos, p = 1, cur, qd;
    while (p < sa.length && strInt(sa.slice(0, p), B) < Bv) p++;
    cur = strInt(sa.slice(0, p), B);
    if (cur < Bv) { qi = '0'; rem = cur; pos = sa.length; ev.push({ type: 'small', col: sa.length - 1, cur: cur, qd: Z, sub: Z, rem: rem }); }
    else {
      qd = cur / Bv; rem = cur - qd * Bv; qi += digit(qd);
      ev.push({ type: 'first', col: p - 1, cur: cur, qd: qd, sub: qd * Bv, rem: rem }); pos = p;
    }
    for (; pos < sa.length; pos++) {
      cur = rem * BB + big(digitVal(sa.charAt(pos))); qd = cur / Bv; rem = cur - qd * Bv; qi += digit(qd);
      ev.push({ type: 'down', col: pos, digit: sa.charAt(pos), cur: cur, qd: qd, sub: qd * Bv, rem: rem });
    }
    var n = Math.max(0, +o.digits || 0);
    if (rem !== Z && n > 0) {
      ev.push({ type: 'comma', col: sa.length - 1, rem: rem });
      for (var k = 0; k < n && rem !== Z; k++) {
        cur = rem * BB; qd = cur / Bv; rem = cur - qd * Bv; qf += digit(qd);
        ev.push({ type: 'zero', col: sa.length + k, cur: cur, qd: qd, sub: qd * Bv, rem: rem });
      }
    }
    return { op: 'div', base: B, a: sa, b: clean(b).toUpperCase(), events: ev, quotient: { int: qi.replace(/^0+(?=.)/, '') || '0', frac: qf }, rem: rem, exact: rem === Z };
  }

  /* ================================================================== 3. ENTIERS SUR n BITS
     Mots binaires : chaînes de 0 et de 1, le bit de poids fort (MSB) à gauche. Valeurs : BigInt. */
  function bits(v, n) {                       /* v modulo 2^n, écrit sur n bits */
    var M = bpow(TWO, n), r = ((big(v) % M) + M) % M, s = r.toString(2);
    return new Array(n - s.length + 1).join('0') + s;
  }
  function range(n, signed) {
    return signed ? { min: -bpow(TWO, n - 1), max: bpow(TWO, n - 1) - ONE } : { min: Z, max: bpow(TWO, n) - ONE };
  }
  /* encode(v, n, signé ?) → { ok, bits, min, max } (ok faux : la valeur ne tient pas sur n bits) */
  function encode(v, n, signed) {
    v = big(v); var r = range(n, signed), ok = v >= r.min && v <= r.max;
    return { ok: ok, bits: ok ? bits(v, n) : null, min: r.min, max: r.max };
  }
  function decodeU(w) { return strInt(clean(w), 2); }
  function decodeS(w) { w = clean(w); var u = strInt(w, 2); return w.charAt(0) === '1' ? u - bpow(TWO, w.length) : u; }
  function ones(w) { return clean(w).replace(/[01]/g, function (c) { return c === '0' ? '1' : '0'; }); }
  /* complément à deux : inverser tous les bits, puis ajouter 1 (la retenue qui sort du mot est perdue) */
  function twos(w) {
    w = clean(w); var inv = ones(w), add = addCols([inv, '1'], 2), n = w.length;
    var r = add.result.int; r = r.length > n ? r.slice(-n) : new Array(n - r.length + 1).join('0') + r;
    return { inv: inv, add: add, bits: r, lost: add.cols.length > n && add.cols[n].d === 1 };
  }
  /* addition sur n bits : le mot résultat, la retenue sortante, les dépassements non signé (retenue) et signé
     (deux opérandes de même signe, résultat de l'autre signe). */
  function addN(a, b) {
    a = clean(a); b = clean(b);
    var n = Math.max(a.length, b.length), A = decodeU(a), Bv = decodeU(b), S = A + Bv, w = bits(S, n);
    var sa = a.charAt(0), sb = b.charAt(0), sr = w.charAt(0);
    return {
      bits: w, n: n, carry: S >= bpow(TWO, n) ? 1 : 0, cols: addCols([a, b], 2),
      u: { a: A, b: Bv, r: decodeU(w), overflow: S >= bpow(TWO, n) },
      s: { a: decodeS(a), b: decodeS(b), r: decodeS(w), overflow: sa === sb && sr !== sa }
    };
  }
  /* soustraction sur n bits : a − b = a + (complément à deux de b). Dépassement non signé : a < b (le résultat
     exact serait négatif) ; dépassement signé : le résultat exact sort de [−2^(n−1), 2^(n−1) − 1]. */
  function subN(a, b) {
    a = clean(a); b = clean(b);
    var n = Math.max(a.length, b.length), tw = twos(bits(decodeU(b), n)), sum = addN(bits(decodeU(a), n), tw.bits);
    var A = decodeU(a), Bv = decodeU(b), sA = decodeS(a), sB = decodeS(b), r = range(n, true), exact = sA - sB;
    return {
      bits: sum.bits, n: n, twos: tw, sum: sum, carry: sum.carry,
      u: { a: A, b: Bv, r: decodeU(sum.bits), overflow: A < Bv },
      s: { a: sA, b: sB, r: decodeS(sum.bits), overflow: exact < r.min || exact > r.max }
    };
  }
  function signExt(w, m) { w = clean(w); return w.length >= m ? w : new Array(m - w.length + 1).join(w.charAt(0)) + w; }

  /* ================================================================== 4. IEEE 754
     simple : 1 + 8 + 23 bits, biais 127 ; double : 1 + 11 + 52 bits, biais 1023. */
  var FMT = { single: { name: 'single', e: 8, m: 23, bias: 127, n: 32 }, double: { name: 'double', e: 11, m: 52, bias: 1023, n: 64 } };
  function hexOf(w) { var h = ''; for (var i = 0; i < w.length; i += 4) h += digit(strInt(w.slice(i, i + 4), 2)); return h; }
  function grp(s, k, sep) { var o = []; for (var i = 0; i < s.length; i += k) o.push(s.slice(i, i + k)); return o.join(sep == null ? ' ' : sep); }
  /* k × 2^n avec k impair (ou nul) */
  function k2n(K, N) { K = big(K); N = Number(N); if (K === Z) return { k: Z, n: 0 }; while (K % TWO === Z) { K /= TWO; N++; } return { k: K, n: N }; }
  function qFromK2n(k, n) { return n >= 0 ? Q(big(k) * bpow(TWO, n)) : Q(big(k), bpow(TWO, -n)); }
  /* encodage : x = écriture décimale (virgule ou point), « inf », « -inf », « nan », « -0 », ou fraction { n, d }.
     o.round : 'nearest' (défaut : au plus proche, égalité vers le pair, comme la norme) ou 'trunc' (vers zéro).
     → { fmt, s, e, M, E, cls: 'zero' | 'subnormal' | 'normal' | 'inf' | 'nan', bits, hex, exact, value, k, n,
         bin: toBase(|x|, 2) (pour les étapes), lost: valeur exacte − valeur codée } */
  function ieeeEncode(x, fmt, o) {
    var F = FMT[fmt] || FMT.single, round = (o && o.round) || 'nearest', s = 0, a, m = F.m, Emax = F.bias, Emin = 1 - F.bias;
    var allE = Math.pow(2, F.e) - 1;
    function out(cls, s, e, M, extra) {
      var w = String(s) + bits(e, F.e) + bits(M, m), r = { fmt: F.name, s: s, e: e, M: big(M), cls: cls, bits: w, hex: hexOf(w), E: e - F.bias, round: round };
      for (var k in extra) r[k] = extra[k];
      return r;
    }
    if (typeof x === 'string') {
      var t = clean(x).toLowerCase();
      if (/^[+-]?nan$/.test(t)) return out('nan', 0, allE, ONE << big(m - 1), { exact: true });
      if (/^[+-]?(inf|infini|infinity|∞)$/.test(t)) return out('inf', t.charAt(0) === '-' ? 1 : 0, allE, 0, { exact: true });
      var p = parse(t, 10);
      if (p.error) return p;
      if (p.q.n === Z) return out('zero', t.charAt(0) === '-' ? 1 : 0, 0, 0, { exact: true, value: Q(0) });
      a = p.q;
    } else a = x;
    if (a.n === Z) return out('zero', 0, 0, 0, { exact: true, value: Q(0) });
    if (a.n < Z) { s = 1; a = q.abs(a); }
    /* E tel que 2^E ≤ a < 2^(E+1) */
    var E = bitlen(a.n) - bitlen(a.d);
    if (q.cmp(a, q.powb(2, E)) < 0) E--;
    function rnd(v) {                        /* v ≥ 0 exact → entier */
      var f = v.n / v.d, r = v.n - f * v.d;
      if (r === Z || round === 'trunc') return f;
      var c = r * TWO;
      if (c > v.d || (c === v.d && f % TWO === ONE)) return f + ONE;
      return f;
    }
    var bin = toBase(a, 2, { max: Math.min(1200, m + 8 + Math.max(0, -E)) }), cls, e, M, K, N;
    if (E < Emin) {                          /* dénormalisé : 0,M × 2^Emin */
      var mant = rnd(q.div(a, q.powb(2, Emin - m)));
      if (mant === Z) return out('zero', s, 0, 0, { exact: false, value: Q(0), bin: bin, E0: E, underflow: true });
      if (mant === bpow(TWO, m)) { cls = 'normal'; e = 1; M = Z; } else { cls = 'subnormal'; e = 0; M = mant; }
      K = cls === 'normal' ? bpow(TWO, m) : mant; N = Emin - m;
    } else {
      var sig = rnd(q.div(a, q.powb(2, E - m)));   /* entre 2^m et 2^(m+1) */
      if (sig === bpow(TWO, m + 1)) { sig = bpow(TWO, m); E++; }
      if (E > Emax) {
        if (round === 'trunc') { cls = 'normal'; e = allE - 1; M = bpow(TWO, m) - ONE; K = bpow(TWO, m + 1) - ONE; N = Emax - m; }
        else return out('inf', s, allE, 0, { exact: false, bin: bin, E0: E, overflow: true });
      } else { cls = 'normal'; e = E + F.bias; M = sig - bpow(TWO, m); K = sig; N = E - m; }
    }
    var val = qFromK2n(K, N), kn = k2n(K, N), exact = q.eq(val, a);
    return out(cls, s, e, M, {
      exact: exact, value: s ? q.neg(val) : val, k: s ? -kn.k : kn.k, n: kn.n, bin: bin, E0: E,
      lost: q.sub(a, val)
    });
  }
  /* décodage d'un mot : hexadécimal (8 ou 16 chiffres, espaces permis) ou binaire (32 ou 64 bits).
     → { fmt, s, e, M, E, cls, bits, hex, value, k, n } ; value : fraction exacte (null pour l'infini et NaN) */
  function ieeeDecode(w, fmt) {
    var t = clean(w).toUpperCase().replace(/^0X/, ''), b;
    if (/^[01]+$/.test(t) && (t.length === 32 || t.length === 64)) b = t;
    else if (/^[0-9A-F]+$/.test(t) && (t.length === 8 || t.length === 16)) b = t.split('').map(function (c) { return bits(digitVal(c), 4); }).join('');
    else return { error: 'word' };
    var F = fmt ? FMT[fmt] : (b.length === 64 ? FMT.double : FMT.single);
    if (b.length !== F.n) return { error: 'length', fmt: F.name };
    var s = +b.charAt(0), e = parseInt(b.slice(1, 1 + F.e), 2), M = strInt(b.slice(1 + F.e), 2), allE = Math.pow(2, F.e) - 1;
    var r = { fmt: F.name, s: s, e: e, M: M, bits: b, hex: hexOf(b), E: e - F.bias };
    if (e === allE) { r.cls = M === Z ? 'inf' : 'nan'; r.value = null; return r; }
    var K, N;
    if (e === 0) { if (M === Z) { r.cls = 'zero'; r.value = Q(0); r.k = Z; r.n = 0; return r; } r.cls = 'subnormal'; K = M; N = 1 - F.bias - F.m; r.E = 1 - F.bias; }
    else { r.cls = 'normal'; K = bpow(TWO, F.m) + M; N = e - F.bias - F.m; }
    var kn = k2n(K, N);
    r.k = s ? -kn.k : kn.k; r.n = kn.n;
    r.value = s ? q.neg(qFromK2n(kn.k, kn.n)) : qFromK2n(kn.k, kn.n);
    return r;
  }
  /* écriture scientifique approchée d'une fraction : sci(v, 4) → { m: '1,024', e: -114 } (troncature) */
  function sci(v, nd) {
    nd = nd || 4;
    var a = q.abs(v); if (a.n === Z) return { m: '0', e: 0, neg: false };
    var e = String(a.n).length - String(a.d).length, ten = big(10);
    function scaled(k) { return k >= 0 ? q.div(a, Q(bpow(ten, k))) : q.mul(a, Q(bpow(ten, -k))); }
    if (q.cmp(scaled(e), Q(1)) < 0) e--;
    var t = q.floor(q.mul(scaled(e), Q(bpow(ten, nd - 1)))), ds = String(t);
    return { m: ds.charAt(0) + (ds.length > 1 ? sepChar() + ds.slice(1) : ''), e: e, neg: v.n < Z };
  }
  /* ================================================================== 5. ÉCRITURE DES NOMBRES
     Virgule en français, point en anglais (binaire et hexadécimal compris). Binaire : paquets de 4 chiffres de part
     et d'autre de la virgule (« 10 1100 1011,0110 1 »). Décimal : milliers séparés (espace fine en français,
     virgule en anglais, comme Chapter_1.pdf : 41,695). Autres bases : sans paquets. Chiffres en majuscules. */
  function sepChar() { return EN ? '.' : ','; }
  var GSEP10 = EN ? ',' : '\u202f', MINUS = '−';
  function gInt(s, g) { if (!g || s.length <= g) return [s]; var out = [], i = s.length; while (i > 0) { out.unshift(s.slice(Math.max(0, i - g), i)); i -= g; } return out; }
  function gFrac(s, g) { if (!g || s.length <= g) return [s]; var out = []; for (var i = 0; i < s.length; i += g) out.push(s.slice(i, i + g)); return out; }
  /* accepte '1011,01', { int, frac, neg }, une fraction { n, d } (convertie dans la base) ou un BigInt */
  function parts(x, base, o) {
    if (typeof x === 'bigint' || typeof x === 'number') { var v = big(x); return { neg: v < Z, int: intStr(babs(v), base), frac: '' }; }
    if (x && x.n != null && x.d != null) {
      var r = toBase(x, base, o), auto = !o || o.digits == null || o.digits === '';
      return { neg: r.neg, int: r.int, frac: r.frac, period: auto ? r.period : null, more: auto && !r.exact && !r.period };
    }
    if (typeof x === 'string') {
      var s = clean(x), neg = /^-/.test(s), m = /^[+-]?([0-9A-Za-z]*)(?:[.,]([0-9A-Za-z]*))?$/.exec(s);
      return m ? { neg: neg, int: (m[1] || '0').toUpperCase(), frac: (m[2] || '').toUpperCase() } : { neg: false, int: s, frac: '' };
    }
    return { neg: !!x.neg, int: x.int || '0', frac: x.frac || '' };
  }
  function groupOf(base, o) { return o && o.group != null ? o.group : base === 2 ? 4 : base === 10 ? 3 : 0; }
  /* texte : fmt('101101,01', 2) → '10 1101,01' */
  function fmt(x, base, o) {
    o = o || {}; base = +base || 10;
    var p = parts(x, base, o), g = groupOf(base, o), n = p.int.length + p.frac.length;
    var sp = base === 10 ? GSEP10 : (n > 12 && !o.nbsp ? ' ' : '\u00a0');
    var ip = base === 10 && p.int.length < 4 && o.group == null ? [p.int] : gInt(p.int, g);
    var s = (p.neg ? MINUS : '') + ip.join(sp), fr = p.frac;
    if (p.period && o.repeat !== false) {          /* texte : le motif répété jusqu'à 6 chiffres au moins */
      var motif = fr.slice(p.period.start, p.period.start + p.period.len);
      while (fr.length < Math.max(6, p.period.start + 2 * p.period.len)) fr += motif;
    }
    if (fr) s += sepChar() + (base === 10 ? [fr] : gFrac(fr, g)).join(sp);
    if (p.more || p.period || o.more) s += '…';
    return s;
  }
  /* HTML : <span class="bn">10 1101,01<sub>2</sub></span> ; o.sub (indice de base, défaut true),
     o.period ({ start, len } : chiffres répétés soulignés d'un trait), o.cls */
  function num(x, base, o) {
    o = o || {}; base = +base || 10;
    var p = parts(x, base, o), g = groupOf(base, o), per = o.period || p.period;
    if (per && o.repeat !== false) {                /* le motif répété jusqu'à 12 chiffres au moins, le premier souligné */
      var motif = p.frac.slice(per.start, per.start + per.len), ff = p.frac.slice(0, per.start + per.len);
      while (ff.length < Math.max(12, per.start + 2 * per.len)) ff += motif;
      p = { neg: p.neg, int: p.int, frac: ff };
    }
    var n = p.int.length + p.frac.length, sp = base === 10 ? GSEP10 : (n > 12 && !o.nbsp ? ' ' : '\u00a0');
    var ip = base === 10 && p.int.length < 4 && o.group == null ? [p.int] : gInt(p.int, g);
    var h = (p.neg ? MINUS : '') + esc(ip.join(sp));
    if (p.frac) {
      var fr = '', chunks = base === 10 ? [p.frac] : gFrac(p.frac, g), i = 0;
      chunks.forEach(function (c, ci) {
        if (ci) fr += sp;
        for (var j = 0; j < c.length; j++, i++) {
          var inP = per && i >= per.start && i < per.start + per.len;
          fr += inP ? '<span class="per">' + esc(c.charAt(j)) + '</span>' : esc(c.charAt(j));
        }
      });
      h += sepChar() + fr.replace(/<\/span><span class="per">/g, '');
    }
    if (p.more || o.more || (per && o.period !== false)) h += '…';
    return '<span class="bn' + (n > 12 && !o.nbsp ? ' w' : '') + (o.cls ? ' ' + o.cls : '') + '">' + h + (o.sub === false ? '' : '<sub>' + base + '</sub>') + '</span>';
  }
  /* une fraction en décimal (texte) : 157,625 ; 0,333… ; 1/3 → '0,(3)…' souligné en HTML */
  function dec(v, o) { return fmt(v, 10, Object.assign({ max: 30 }, o || {})); }
  function decH(v, o) { return num(v, 10, Object.assign({ max: 30, sub: false }, o || {})); }
  function pw(b, k) { return b + '<sup>' + (k < 0 ? MINUS + (-k) : k) + '</sup>'; }
  function esc(s) { return U.esc(String(s)); }
  function digitDec(c) { var v = digitVal(c); return v >= 10 ? String(v) : c; }

  /* ================================================================== 6. VISUELS (outils communs)
     Tous les outils pas à pas : rien ne s'anime tout seul, boutons Précédent / Suivant / Tout afficher /
     Recommencer, commentaire de l'étape dans une zone aria-live. */
  var uid = 0;
  function head(title, right) {
    return '<div class="bench-head"><span class="bh-t"><span>' + title + '</span></span>' + (right ? '<span class="bh-r">' + right + '</span>' : '') + '</div>';
  }
  function baseLabel(b) { return T('base {b}', { b: b }); }
  /* contrôles pas à pas : paint(k) dessine l'état après k étapes (0 ≤ k ≤ total) */
  function stepper(el, total, paint, start) {
    var k = start == null ? 1 : start;
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
      c.querySelector('.cnt').textContent = T('étape {i} / {n}', { i: k, n: total });
    }
    c.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]'); if (!b) return;
      var a = b.getAttribute('data-a');
      go(a === 'prev' ? k - 1 : a === 'next' ? k + 1 : a === 'end' ? total : start == null ? 1 : start);
    });
    go(k);
    return { go: go, get: function () { return k; } };
  }

  /* ---------- la numération de position : un nombre, ses positions, ses poids ----------
     REV.archi.place(el, { base: 2, value: '10011101,101', title, edit: true, also: [10, 16] })
       Chaque chiffre est un bouton : un clic l'augmente de 1 (flèches haut et bas aussi). Sous le tableau :
       la somme des produits et la valeur dans les bases de « also ». */
  function place(el, o) {
    if (!el) return null;
    o = o || {};
    var b = +o.base || 2, p = parts(o.value || '0', b), ints = p.int.split(''), fracs = p.frac.split('').filter(Boolean);
    var also = o.also || (b === 10 ? [2, 16] : b === 16 ? [10, 2] : [10, 16]), edit = o.edit !== false;
    el.classList.add('bench', 'pl');
    el.innerHTML = head(o.title || T('Positions et poids'), baseLabel(b)) +
      '<div class="bench-body"><div class="pl-scroll"><table class="pl-t"><tbody></tbody></table></div><div class="pl-out" aria-live="polite"></div>' +
      (edit ? '<p class="pl-help muted">' + T('Clique sur un chiffre pour l’augmenter de 1 (flèches haut et bas au clavier).') + '</p>' : '') + '</div>';
    var tb = el.querySelector('tbody'), out = el.querySelector('.pl-out');
    function cur() { return ints.join('') + (fracs.length ? ',' + fracs.join('') : ''); }
    function row(cls, label, cells) {
      var h = '<tr class="' + cls + '"><th scope="row">' + label + '</th>';
      cells.forEach(function (c, i) { if (i === ints.length && fracs.length) h += '<td class="pl-sep" aria-hidden="true">' + (cls === 'pl-dig' ? sepChar() : '') + '</td>'; h += c; });
      return h + '</tr>';
    }
    function build() {
      var pos = [], pows = [], ws = [], ds = [], all = ints.concat(fracs);
      all.forEach(function (c, i) {
        var k = ints.length - 1 - i, w = q.powb(b, k);
        pos.push('<td>' + (k < 0 ? MINUS + (-k) : k) + '</td>');
        pows.push('<td>' + pw(b, k) + '</td>');
        ws.push('<td>' + esc(dec(w)) + '</td>');
        ds.push('<td>' + (edit ? '<button type="button" class="pl-d" data-i="' + i + '" aria-label="' + esc(T('position {k}, chiffre {c}', { k: k, c: c })) + '">' + esc(c) + '</button>' : '<span class="pl-d">' + esc(c) + '</span>') + '</td>');
      });
      tb.innerHTML = row('pl-pos', T('position'), pos) + row('pl-pow', T('poids'), pows) + (b !== 10 ? row('pl-w', '', ws) : '') + row('pl-dig', T('chiffre'), ds);
      U.$$('.pl-d', tb).forEach(function (d) { d.classList.toggle('z', d.textContent === '0'); });
      var pr = parse(cur(), b), ts = terms(pr).filter(function (t) { return t.v; });
      var h = '<p class="pl-eq">' + num(cur(), b) + ' = ';
      if (!ts.length) h += '0';
      else {
        h += ts.map(function (t) { return t.v + '×' + pw(b, t.pos); }).join(' + ');
        if (b !== 10) h += '</p><p class="pl-eq">= ' + ts.map(function (t) { return esc(dec(q.mul(Q(t.v), t.w))); }).join(' + ');
      }
      h += '</p><p class="pl-eq pl-res">= ' + num(pr.q, 10, { max: 30 }) + also.filter(function (x) { return x !== 10 && x !== b; }).map(function (x) { return ' = ' + num(pr.q, x, { max: 24 }); }).join('') + '</p>';
      out.innerHTML = h;
    }
    tb.addEventListener('click', function (e) { var d = e.target.closest('button.pl-d'); if (d) bump(+d.getAttribute('data-i'), 1); });
    tb.addEventListener('keydown', function (e) {
      var d = e.target.closest('button.pl-d'); if (!d) return;
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); bump(+d.getAttribute('data-i'), e.key === 'ArrowUp' ? 1 : -1); }
    });
    function bump(i, s) {
      var arr = i < ints.length ? ints : fracs, j = i < ints.length ? i : i - ints.length;
      arr[j] = digit((digitVal(arr[j]) + s + b) % b);
      build();
      var nb = tb.querySelector('button[data-i="' + i + '"]'); if (nb) nb.focus();
    }
    build();
    return { value: function () { return cur(); }, set: function (v) { var pp = parts(v, b); ints = pp.int.split(''); fracs = pp.frac.split('').filter(Boolean); build(); } };
  }

  /* ---------- divisions successives (partie entière) ----------
     REV.archi.divs(el, { n: '715', base: 2, title, step: true }) : une ligne par division, flèche vers le haut,
     les restes lus de bas en haut. step: false → tout est affiché, sans boutons. */
  function divsTable(steps, b, k, cls) {
    var h = '<table class="dv-t' + (cls ? ' ' + cls : '') + '"><tbody>';
    steps.forEach(function (s, i) {
      var hide = i >= k ? ' class="later" aria-hidden="true"' : i === k - 1 ? ' class="now"' : '';
      h += '<tr' + hide + '><td class="dv-n">' + esc(fmt(s.n, 10)) + '</td><td class="dv-op">/ ' + b + ' =</td><td class="dv-q">' + esc(fmt(s.q, 10)) + '</td>' +
        '<td class="dv-r"><span class="lbl">' + T('reste') + '</span> <b>' + esc(fmt(s.r, 10)) + '</b>' + (Number(s.r) >= 10 ? ' <span class="dv-l">→ ' + s.d + '</span>' : '') + '</td></tr>';
    });
    return h + '</tbody></table>';
  }
  function divs(el, o) {
    if (!el) return null;
    o = o || {};
    var b = +o.base || 2, n = typeof o.n === 'bigint' ? o.n : strInt(clean(String(o.n).split(/[.,]/)[0] || '0'), 10), st = divisions(n, b), total = st.length + 1;
    var res = st.map(function (s) { return s.d; }).reverse().join('');
    el.classList.add('bench', 'dv');
    el.innerHTML = head(o.title || T('Divisions successives'), esc(fmt(n, 10)) + ' → ' + baseLabel(b)) +
      '<div class="bench-body"><div class="dv-wrap"><div class="dv-scroll"></div><div class="dv-arrow" aria-hidden="true"><i></i></div></div>' +
      '<p class="dv-res"></p><p class="readout" aria-live="polite"></p></div>';
    var box = el.querySelector('.dv-scroll'), resEl = el.querySelector('.dv-res'), say = el.querySelector('.readout'), wrap = el.querySelector('.dv-wrap');
    function paint(k) {
      var rows = Math.min(k, st.length);
      box.innerHTML = divsTable(st, b, rows);
      wrap.classList.toggle('done', k >= total);
      resEl.innerHTML = k >= total ? num(n, 10) + ' = ' + num(res, b) : '';
      var s = st[rows - 1];
      if (k === 0) say.innerHTML = T('Appuie sur « Suivant » : on divise {n} par {b}.', { n: esc(fmt(n, 10)), b: b });
      else if (k < total) {
        say.innerHTML = T('{n} = {b} × {q} + {r} : le reste {r} est le chiffre de poids {p}.', { n: esc(fmt(s.n, 10)), b: b, q: esc(fmt(s.q, 10)), r: esc(fmt(s.r, 10)), p: pw(b, rows - 1) }) +
          (Number(s.r) >= 10 ? ' ' + T('En base {b}, {r} s’écrit {d}.', { b: b, r: esc(fmt(s.r, 10)), d: s.d }) : '') +
          (s.q === Z ? ' ' + T('Le quotient vaut 0 : c’est la dernière division.') : '');
      } else say.innerHTML = T('On lit les restes de bas en haut : le dernier reste est le chiffre de gauche.');
    }
    if (o.step === false) { paint(total); return { result: res }; }
    stepper(el, total, paint, o.start == null ? 0 : o.start);
    return { result: res };
  }

  /* ---------- multiplications successives (partie fractionnaire) ----------
     REV.archi.mults(el, { x: '0,40625', base: 2, digits: null | 5, max: 12, title, step: true })
       digits : nombre de chiffres demandé (on s'arrête là, sans arrondir) ; sinon jusqu'à une partie
       fractionnaire nulle ou déjà vue (développement infini, signalé). */
  function multsTable(r, b, k) {
    var per = r.period, h = '<table class="mu-t"><tbody>';
    r.mults.forEach(function (s, i) {
      var cls = i >= k ? 'later' : i === k - 1 ? 'now' : '';
      if (per && (i === per.start || (k > per.start + per.len && i === per.start))) cls += ' rep';
      h += '<tr class="' + cls + '"' + (i >= k ? ' aria-hidden="true"' : '') + '><td class="mu-x">' + esc(dec(s.x)) + '</td><td class="mu-op">× ' + b + ' =</td>' +
        '<td class="mu-p"><b>' + esc(fmt(s.v, 10)) + '</b>' + esc(dec(s.r).replace(/^0/, '')) + '</td>' +
        '<td class="mu-d"><span class="lbl">' + T('chiffre') + '</span> <b>' + s.d + '</b></td></tr>';
    });
    if (per && k > r.mults.length) {
      h += '<tr class="rep ghost"><td class="mu-x">' + esc(dec(r.mults[per.start].x)) + '</td><td class="mu-op">× ' + b + ' =</td><td class="mu-p">…</td><td class="mu-d">' + T('déjà vu') + '</td></tr>';
    }
    return h + '</tbody></table>';
  }
  function mults(el, o) {
    if (!el) return null;
    o = o || {};
    var b = +o.base || 2, v = o.x && o.x.n != null && o.x.d != null ? o.x : value(String(o.x), 10) || Q(0), f = q.sub(q.abs(v), Q(q.floor(q.abs(v))));
    var want = o.digits != null && o.digits !== '' ? +o.digits : null;
    var r = toBase(f, b, want != null ? { digits: want } : { max: o.max || 16 }), n = r.mults.length, total = n + 1;
    if (want != null) r.period = null;
    var stopRep = want == null && r.period, stopMax = want == null && !r.exact && !r.period;
    el.classList.add('bench', 'mu');
    el.innerHTML = head(o.title || T('Multiplications successives'), esc(dec(f)) + ' → ' + baseLabel(b)) +
      '<div class="bench-body"><div class="dv-wrap mu-wrap"><div class="dv-scroll"></div><div class="dv-arrow down" aria-hidden="true"><i></i></div></div>' +
      '<p class="dv-res"></p><p class="readout" aria-live="polite"></p></div>';
    var box = el.querySelector('.dv-scroll'), resEl = el.querySelector('.dv-res'), say = el.querySelector('.readout'), wrap = el.querySelector('.dv-wrap');
    var fr = { int: '0', frac: r.frac };
    function paint(k) {
      var rows = Math.min(k, n);
      box.innerHTML = n ? multsTable(r, b, rows) : '';
      wrap.classList.toggle('done', k >= total);
      var s = r.mults[rows - 1];
      if (k >= total) {
        resEl.innerHTML = num(f, 10, { max: 30 }) + (r.exact || stopRep || want == null ? ' = ' : ' ≈ ') + (stopRep ? num(fr, b, { period: r.period }) : num(fr, b, { more: !r.exact && want == null }));
        if (!n) say.innerHTML = T('La partie fractionnaire est nulle : il n’y a rien à convertir.');
        else if (r.exact) say.innerHTML = T('La partie fractionnaire est nulle : la conversion est exacte. On lit les chiffres de haut en bas.');
        else if (stopRep) say.innerHTML = T('La partie fractionnaire {x} est déjà apparue : les mêmes chiffres reviennent sans fin. Le développement en base {b} est infini (les chiffres soulignés se répètent).', { x: esc(dec(r.mults[r.period.start].x)), b: b });
        else if (want != null) say.innerHTML = T('On a les {n} chiffres demandés : on s’arrête là, sans arrondir. On lit les chiffres de haut en bas.', { n: want });
        else say.innerHTML = T('On s’arrête ici : le développement continue ({p}).', { p: r.period ? T('il est infini') : r.ends ? T('il s’arrête après {n} chiffres', { n: r.ends }) : T('très long') });
      } else {
        resEl.innerHTML = '';
        if (k === 0) say.innerHTML = T('Appuie sur « Suivant » : on multiplie {x} par {b}.', { x: esc(dec(f)), b: b });
        else say.innerHTML = T('{x} × {b} = {p} : la partie entière {v} donne le chiffre de poids {w}, on garde {r} pour la ligne suivante.', {
          x: esc(dec(s.x)), b: b, p: esc(dec(s.p)), v: esc(fmt(s.v, 10)), w: pw(b, -rows), r: esc(dec(s.r))
        }) + (Number(s.v) >= 10 ? ' ' + T('En base {b}, {r} s’écrit {d}.', { b: b, r: esc(fmt(s.v, 10)), d: s.d }) : '');
      }
    }
    if (o.step === false) { paint(total); return { result: r }; }
    stepper(el, total, paint, o.start == null ? 0 : o.start);
    return { result: r };
  }

  /* ---------- paquets de 4 (ou de 3) de part et d'autre de la virgule ----------
     REV.archi.groups(el, { value: '1011 1011,1011 01', from: 2, to: 16, title })   binaire → base 2^k
     REV.archi.groups(el, { value: '3D7,5', from: 16, to: 2 })                      base 2^k → binaire
     Les zéros ajoutés pour compléter un paquet sont en pointillés : à gauche pour la partie entière, à droite pour
     la partie fractionnaire. */
  function packsHTML(pk, from, to, rev) {
    function one(g, side) {
      var bitsH = g.bits.split('').map(function (c, i) {
        var pad = side === 'i' ? i < g.pad : i >= g.bits.length - g.pad;
        return '<span class="gp-b' + (pad ? ' pad' : '') + (c === '1' ? ' one' : '') + '">' + c + '</span>';
      }).join('');
      var dg = '<span class="gp-d">' + esc(g.d) + '</span>';
      return '<span class="gp-g' + (g.pad ? ' padded' : '') + '">' + (rev ? dg + '<span class="gp-bits">' + bitsH + '</span>' : '<span class="gp-bits">' + bitsH + '</span>' + dg) + '</span>';
    }
    return '<div class="gp-row' + (rev ? ' rev' : '') + '">' + pk.int.map(function (g) { return one(g, 'i'); }).join('') +
      (pk.frac.length ? '<span class="gp-sep">' + sepChar() + '</span>' + pk.frac.map(function (g) { return one(g, 'f'); }).join('') : '') + '</div>';
  }
  function groups(el, o) {
    if (!el) return null;
    o = o || {};
    var from = +o.from || 2, to = +o.to || 16, rev = from !== 2, k = pow2(rev ? from : to) || 4, pk, binStr, other;
    if (!rev) { pk = packs(o.value, k); binStr = o.value; other = { int: pk.int.map(function (g) { return g.d; }).join('').replace(/^0+(?=.)/, ''), frac: pk.frac.map(function (g) { return g.d; }).join('') }; }
    else {
      var up = unpacks(o.value, k);
      pk = { int: up.int.map(function (g) { return { bits: g.bits, pad: 0, d: g.d }; }), frac: up.frac.map(function (g) { return { bits: g.bits, pad: 0, d: g.d }; }) };
      var bi = up.int.map(function (g) { return g.bits; }).join('').replace(/^0+(?=.)/, ''), bf = up.frac.map(function (g) { return g.bits; }).join('').replace(/0+$/, '');
      other = { int: bi, frac: bf }; binStr = bi + (bf ? ',' + bf : '');
    }
    el.classList.add('bench', 'gp');
    var src = rev ? num(parts(o.value, from), from) : num(parts(binStr, 2), 2), dst = rev ? num(other, 2) : num(other, to);
    el.innerHTML = head(o.title || (rev ? T('Un chiffre → {k} bits', { k: k }) : T('Paquets de {k} bits', { k: k })), rev ? baseLabel(from) + ' → ' + baseLabel(2) : baseLabel(2) + ' → ' + baseLabel(to)) +
      '<div class="bench-body"><div class="gp-scroll">' + packsHTML(pk, from, to, rev) + '</div>' +
      '<p class="gp-cap muted">' + (rev ? T('Chaque chiffre donne exactement {k} bits ; les zéros en tête de la partie entière et en fin de partie fractionnaire peuvent ensuite disparaître.', { k: k })
        : T('On part de la virgule : vers la gauche pour la partie entière, vers la droite pour la partie fractionnaire. Les zéros en pointillés complètent un paquet.')) + '</p>' +
      '<p class="dv-res">' + src + ' = ' + dst + '</p></div>';
    return { result: other };
  }

  /* ---------- le convertisseur : ton propre nombre, d'une base à une autre, avec les étapes ----------
     REV.archi.converter(el, { value: '715,40625', from: 10, to: 2, digits: '' }) */
  var BASES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  function converter(el, o) {
    if (!el) return null;
    o = o || {};
    var id = 'cv' + (++uid);
    function sel(name, v) {
      return '<select id="' + id + name + '" data-k="' + name + '">' + BASES.map(function (b) { return '<option value="' + b + '"' + (b === v ? ' selected' : '') + '>' + b + '</option>'; }).join('') + '</select>';
    }
    el.classList.add('bench', 'cv');
    el.innerHTML = head(o.title || T('Convertisseur'), T('ton nombre, avec les étapes')) +
      '<div class="bench-body"><div class="cv-form">' +
      '<label class="cv-f cv-num"><span>' + T('Nombre') + '</span><input id="' + id + 'v" data-k="v" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" value="' + esc(o.value || '') + '"></label>' +
      '<label class="cv-f"><span>' + T('de la base') + '</span>' + sel('f', +o.from || 10) + '</label>' +
      '<label class="cv-f"><span>' + T('vers la base') + '</span>' + sel('t', +o.to || 2) + '</label>' +
      '<label class="cv-f"><span>' + T('chiffres après la virgule') + '</span><input id="' + id + 'd" data-k="d" type="number" min="0" max="64" placeholder="' + esc(T('auto')) + '" value="' + esc(o.digits == null ? '' : o.digits) + '"></label>' +
      '</div><div class="cv-out" aria-live="polite"></div><div class="cv-steps"></div></div>';
    var out = el.querySelector('.cv-out'), stepsEl = el.querySelector('.cv-steps');
    function val(k) { return el.querySelector('[data-k="' + k + '"]').value; }
    function run() {
      var v = val('v'), f = +val('f'), t = +val('t'), d = val('d'), r = convert(v, f, t, { digits: d === '' ? null : d, max: 24 });
      stepsEl.innerHTML = '';
      if (r.error) {
        out.innerHTML = '<p class="cv-err">' + (r.error === 'empty' ? T('Tape un nombre (virgule ou point).') : r.error === 'digit' ? T('« {c} » n’est pas un chiffre de la base {b} : ses chiffres vont de 0 à {m}.', { c: esc(r.ch), b: f, m: digit(f - 1) }) : T('Écriture non reconnue : des chiffres, au plus une virgule ou un point.')) + '</p>';
        return;
      }
      var res = r.res, per = d === '' && res.period;
      var shown = { neg: res.neg, int: res.int, frac: res.frac };
      out.innerHTML = '<p class="cv-r">' + num({ neg: r.src.neg, int: r.src.int, frac: r.src.frac }, f) + (res.exact || per || d === '' ? ' = ' : ' ≈ ') +
        num(shown, t, per ? { period: res.period } : { more: !res.exact && d === '' }) + '</p>' +
        '<p class="muted cv-note">' + routeNote(r, d) + '</p>';
      var parts2 = [];
      var absq = q.abs(r.src.q), ip = q.floor(absq), fq = q.sub(absq, Q(ip));
      if (r.route === 'groups') {
        var g = document.createElement('div'); stepsEl.appendChild(g);
        groups(g, { value: r.src.int + (r.src.frac ? ',' + r.src.frac : ''), from: f, to: t });
        return;
      }
      if (r.route === 'via2') {
        var g1 = document.createElement('div'), g2 = document.createElement('div'); stepsEl.appendChild(g1); stepsEl.appendChild(g2);
        groups(g1, { value: r.src.int + (r.src.frac ? ',' + r.src.frac : ''), from: f, to: 2, title: T('1. Vers la base 2') });
        var bin = toBase(absq, 2, { max: 4096 });
        groups(g2, { value: bin.int + (bin.frac ? ',' + bin.frac : ''), from: 2, to: t, title: T('2. De la base 2 vers la base {b}', { b: t }) });
        return;
      }
      if (r.route === 'direct10' || r.route === 'via10') parts2.push(sumBox(r.src, r.route === 'via10' ? T('1. Vers la base 10 : la somme des produits') : T('La somme des produits')));
      stepsEl.insertAdjacentHTML('beforeend', parts2.join(''));
      if (r.route === 'from10' || r.route === 'via10') {
        var a = document.createElement('div'), m = document.createElement('div');
        stepsEl.appendChild(a);
        divs(a, { n: ip, base: t, step: false, title: (r.route === 'via10' ? '2. ' : '') + T('Partie entière : divisions successives') });
        if (fq.n !== Z) { stepsEl.appendChild(m); mults(m, { x: fq, base: t, digits: d === '' ? null : d, max: 24, step: false, title: (r.route === 'via10' ? '3. ' : '') + T('Partie fractionnaire : multiplications successives') }); }
      }
    }
    el.addEventListener('input', run);
    el.addEventListener('change', run);
    run();
    return { run: run };
  }
  function routeNote(r, d) {
    var f = r.from, t = r.to;
    if (r.route === 'same') return T('Même base : rien à faire.');
    if (r.route === 'groups') return f === 2 ? T('{t} = 2<sup>{k}</sup> : des paquets de {k} bits, à partir de la virgule.', { t: t, k: r.kt }) : T('{f} = 2<sup>{k}</sup> : chaque chiffre donne {k} bits.', { f: f, k: r.kf });
    if (r.route === 'via2') return T('{f} et {t} sont deux puissances de 2 : on passe par la base 2.', { f: f, t: t });
    var tail = d !== '' ? ' ' + T('{n} chiffres après la virgule demandés : on s’arrête là, sans arrondir.', { n: d }) : r.res.period ? ' ' + T('Le développement est infini : les chiffres soulignés se répètent.') : '';
    if (r.route === 'direct10') return T('Vers la base 10 : la somme des produits, chiffre × poids.');
    if (r.route === 'from10') return T('Partie entière : divisions successives. Partie fractionnaire : multiplications successives.') + tail;
    return T('Ni {f} ni {t} ne sont des puissances d’une même base : on passe par la base 10.', { f: f, t: t }) + tail;
  }
  function sumBox(p, title) {
    var ts = terms(p), nz = ts.filter(function (t) { return t.v; }), b = p.base;
    var h = '<div class="bench sm"><div class="bench-head"><span class="bh-t">' + title + '</span></div><div class="bench-body"><p class="pl-eq">' + num(parts(p.int + (p.frac ? ',' + p.frac : ''), b), b) + ' = ';
    h += nz.length ? nz.map(function (t) { return digitDec(t.c) + '×' + pw(b, t.pos); }).join(' + ') : '0';
    if (nz.length) h += '</p><p class="pl-eq">= ' + nz.map(function (t) { return esc(dec(q.mul(Q(t.v), t.w))); }).join(' + ');
    return h + '</p><p class="pl-eq pl-res">= ' + num(q.abs(p.q), 10, { max: 30 }) + '</p></div></div>';
  }

  /* ---------- entraînement : les entiers de 0 à 15, les puissances de 2 ----------
     REV.archi.drill(el, { kind: 'nibble' | 'pow2' }) : une question tirée au hasard, la réponse tapée, vérifiée. */
  function drill(el, o) {
    if (!el) return null;
    o = o || {};
    var kind = o.kind || 'nibble', id = 'dr' + (++uid), cur = null, ok = 0, seen = 0, last = -1;
    el.classList.add('bench', 'dr');
    el.innerHTML = head(o.title || (kind === 'pow2' ? T('Puissances de 2 · entraînement') : T('De 0 à 15 · entraînement')), '<span class="dr-sc" aria-live="polite"></span>') +
      '<div class="bench-body"><form class="dr-f" novalidate><label for="' + id + '" class="dr-q"></label>' +
      '<input id="' + id + '" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" inputmode="text">' +
      '<button type="submit" class="btn primary">' + T('Vérifier') + '</button><button type="button" class="btn" data-a="next">' + T('Autre') + '</button></form>' +
      '<p class="dr-fb" aria-live="polite"></p></div>';
    var qEl = el.querySelector('.dr-q'), inp = el.querySelector('input'), fb = el.querySelector('.dr-fb'), sc = el.querySelector('.dr-sc');
    function pick() {
      var v, from, to;
      if (kind === 'pow2') {
        do { v = Math.floor(Math.random() * 22) - 5; } while (v === last);
        last = v;
        cur = { ans: q.powb(2, v), v: v };
        qEl.innerHTML = pw(2, v) + ' = ?';
      } else {
        var bs = [[2, 10], [10, 2], [2, 16], [16, 2], [16, 10], [10, 16]];
        do { v = Math.floor(Math.random() * 16); } while (v === last);
        last = v;
        var pr = bs[Math.floor(Math.random() * bs.length)]; from = pr[0]; to = pr[1];
        var s = from === 2 ? bits(v, 4) : intStr(v, from);
        cur = { from: from, to: to, v: v, ans: Q(v) };
        qEl.innerHTML = num(s, from, { group: 0 }) + ' = ?<sub>' + to + '</sub>';
      }
      inp.value = ''; fb.textContent = ''; fb.className = 'dr-fb';
    }
    function check() {
      if (!cur) return;
      var raw = inp.value;
      if (EN && /^\s*\d{1,3}(,\d{3})+\s*$/.test(raw)) raw = raw.replace(/,/g, '');   /* 1,024 : séparateur de milliers */
      var base = kind === 'pow2' ? 10 : cur.to, g = parse(raw, base), good = !g.error && q.eq(g.q, cur.ans);
      if (!inp.value.trim()) return;
      seen++; if (good) ok++;
      var right = kind === 'pow2' ? num(cur.ans, 10, { sub: false }) : num(cur.to === 2 ? bits(cur.v, 4) : intStr(cur.v, cur.to), cur.to, { group: 0 });
      fb.className = 'dr-fb ' + (good ? 'ok' : 'no');
      fb.innerHTML = (good ? '✓ ' + T('Exact.') : T('Non : la réponse est {r}.', { r: right })) + (kind === 'nibble' && !good ? ' ' + T('({v} = {b})', { v: cur.v, b: bits(cur.v, 4).split('').map(function (c, i) { return c === '1' ? String(8 >> i) : null; }).filter(Boolean).join(' + ') || '0' }) : '');
      sc.textContent = T('{ok} / {n} justes', { ok: ok, n: seen });
    }
    el.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); if (fb.classList.contains('ok') || fb.classList.contains('no')) pick(); else check(); });
    el.querySelector('[data-a="next"]').addEventListener('click', function () { pick(); inp.focus(); });
    pick();
    return { pick: pick };
  }
  /* ---------- l'opération posée, colonne par colonne ----------
     REV.archi.posed(el, { op: 'add', ops: ['1010110', '1011101'], base: 2 })      addition (2 nombres ou plus)
     REV.archi.posed(el, { op: 'sub', ops: ['1101001', '110110'], base: 2, pad: true }) soustraction, emprunts du cours
     REV.archi.posed(el, { op: 'mul', ops: ['10110', '101'], base: 2, zeros: true })  multiplication (zeros: false =
       sans les lignes de zéros, comme les corrigés des sujets)
     REV.archi.posed(el, { op: 'div', ops: ['11111001', '110'], base: 2, digits: 1 })  division posée (digits : chiffres
       après la virgule au plus)
     Options communes : title, step (false : tout afficher sans boutons), start (étape de départ, 0 par défaut). */
  function cellsOf(str, endPos) {               /* chiffres d'une écriture entière, le dernier à la position endPos */
    var c = {}; str = String(str);
    for (var i = 0; i < str.length; i++) c[endPos + str.length - 1 - i] = esc(str.charAt(i));
    return c;
  }
  function numCells(p) {                          /* { int, frac } → cellules par position */
    var c = {}, i;
    for (i = 0; i < p.int.length; i++) c[p.int.length - 1 - i] = esc(p.int.charAt(i));
    for (i = 0; i < p.frac.length; i++) c[-1 - i] = esc(p.frac.charAt(i));
    return c;
  }
  function gridHTML(rows, top, F, curPos) {
    var h = '<table class="po-t"><tbody>';
    rows.forEach(function (r) {
      h += '<tr class="' + (r.cls || '') + '"><th class="po-o" scope="row">' + (r.op || '') + '</th>';
      for (var pos = top; pos >= -F; pos--) {
        if (pos === -1) h += '<td class="po-c">' + (r.comma ? sepChar() : '') + '</td>';
        var c = r.cells[pos], cls = (r.cc && r.cc[pos]) || '';
        if (curPos != null && pos === curPos && !r.nocur) cls += ' cur';
        h += '<td' + (cls ? ' class="' + cls.trim() + '"' : '') + '>' + (c == null ? '' : c) + '</td>';
      }
      h += '</tr>';
    });
    return h + '</tbody></table>';
  }
  function bn(x, b) { return num(x, b, { sub: false, group: 0 }); }
  function posed(el, o) {
    if (!el) return null;
    o = o || {};
    var op = o.op || 'add', b = +o.base || 2, ops = (o.ops || [o.a, o.b]).map(function (s) { return clean(s).toUpperCase(); });
    var titles = { add: T('Addition posée'), sub: T('Soustraction posée'), mul: T('Multiplication posée'), div: T('Division posée') };
    el.classList.add('bench', 'po');
    el.innerHTML = head(o.title || titles[op], baseLabel(b)) + '<div class="bench-body"><div class="po-scroll"></div><p class="readout" aria-live="polite"></p></div>';
    var box = el.querySelector('.po-scroll'), say = el.querySelector('.readout'), total, paint, result;
    var SIGN = { add: '+', sub: MINUS, mul: '×' };

    if (op === 'add') {
      var A = addCols(ops, b), top = A.cols[A.cols.length - 1].pos, F = A.F, n = A.cols.length;
      total = n; result = A.result;
      paint = function (k) {
        var carry = { cells: {}, cls: 'po-carry', nocur: true }, res = { cells: {}, cls: 'po-res', comma: F > 0 && k >= F };
        for (var i = 0; i < k; i++) {
          var c = A.cols[i];
          if (c.cout) carry.cells[c.pos + 1] = esc(intStr(c.cout, b));
          res.cells[c.pos] = esc(digit(c.d));
        }
        var rows = [carry];
        A.ops.forEach(function (p, i) { rows.push({ cells: numCells(p), op: i === A.ops.length - 1 ? '+' : '', comma: p.frac.length > 0, cls: i === A.ops.length - 1 ? 'po-last' : '' }); });
        rows.push(res);
        box.innerHTML = gridHTML(rows, top, F, k > 0 && k <= n ? A.cols[k - 1].pos : null);
        if (k === 0) { say.innerHTML = T('On additionne colonne par colonne, de droite à gauche, en reportant les retenues.'); return; }
        var cc = A.cols[k - 1], ts = [], nd = cc.ds.filter(function (d) { return d != null; }).length;
        if (cc.cin) ts.push(cc.cin);
        cc.ds.forEach(function (d) { if (d != null) ts.push(d); });
        var expr;
        if (!nd && cc.cin < b) expr = T('Il reste la retenue {c} : on l’écrit.', { c: bn(intStr(cc.cin, b), b) });
        else if (!nd) expr = T('Il reste la retenue {c} : on pose {d}, on retient {r}.', { c: bn(intStr(cc.cin, b), b), d: bn(digit(cc.d), b), r: bn(intStr(cc.cout, b), b) });
        else if (nd === 1 && !cc.cin) expr = T('Un seul chiffre dans cette colonne : on pose {d}.', { d: bn(digit(cc.d), b) });
        else {
          expr = ts.map(function (d) { return bn(intStr(d, b), b); }).join(' + ');
          if (b !== 2 && b !== 10 && ts.some(function (d) { return d >= 10; })) expr += ' = ' + ts.join(' + ');
          if (b !== 2 && b !== 10) expr += ' = ' + cc.s + '<sub>10</sub> = ' + num(intStr(cc.s, b), b, { group: 0 });
          else expr += ' = ' + bn(intStr(cc.s, b), b);
          expr += (EN ? ': ' : ' : ') + (cc.cout ? T('on pose {d}, on retient {c}.', { d: bn(digit(cc.d), b), c: bn(intStr(cc.cout, b), b) }) : T('on pose {d}.', { d: bn(digit(cc.d), b) }));
        }
        say.innerHTML = T('Étape {i} : ', { i: k }) + expr + (k === n ? ' ' + T('Résultat : {r}.', { r: num(A.result, b) }) : '');
      };
    }

    else if (op === 'sub') {
      var S = subCols(ops[0], ops[1], b), topS = S.L - 1, FS = S.F, ns = S.cols.length;
      total = ns; result = S.result;
      paint = function (k) {
        var tCells = numCells(S.ops[0]), sCells = numCells(S.ops[1]), res = { cells: {}, cls: 'po-res', comma: FS > 0 && k > FS };
        if (o.pad !== false) for (var pz = 0; pz < S.L; pz++) if (sCells[pz] == null) sCells[pz] = '<span class="pz">0</span>';
        for (var i = 0; i < k; i++) {
          var c = S.cols[i];
          if (c.bout) tCells[c.pos] = '<small class="bw">1</small>' + (tCells[c.pos] || '0');
          if (c.bin) sCells[c.pos] = '<small class="bw">1+</small>' + (c.s == null ? '0' : esc(digit(c.s)));
          res.cells[c.pos] = esc(digit(c.d));
        }
        var rows = [{ cells: tCells, comma: S.ops[0].frac.length > 0 }, { cells: sCells, op: MINUS, cls: 'po-last', comma: S.ops[1].frac.length > 0 }, res];
        box.innerHTML = gridHTML(rows, topS, FS, k > 0 ? S.cols[k - 1].pos : null);
        if (k === 0) { say.innerHTML = (S.swap ? T('Le premier nombre est plus petit : on calcule l’inverse, et le résultat sera négatif.') + ' ' : '') + T('On soustrait colonne par colonne, de droite à gauche. Quand le chiffre du haut est trop petit, on emprunte 1 : il gagne {b} et le chiffre du bas de la colonne suivante gagne 1.', { b: b === 2 ? bn('10', 2) + ' (2)' : bn('10', b) + ' (' + b + ')' }); return; }
        var cc = S.cols[k - 1], t = cc.t || 0, s = cc.s || 0, e;
        e = cc.bin ? bn(digit(t), b) + ' ' + MINUS + ' (' + bn(digit(s), b) + ' + 1) = ' + bn(digit(t), b) + ' ' + MINUS + ' ' + bn(intStr(cc.need, b), b) : bn(digit(t), b) + ' ' + MINUS + ' ' + bn(digit(s), b);
        if (cc.bout) e += ' → ' + T('on emprunte 1') + ' → ' + bn(intStr(t + b, b), b) + ' ' + MINUS + ' ' + bn(intStr(cc.need, b), b) + ' = ' + bn(digit(cc.d), b);
        else e += ' = ' + bn(digit(cc.d), b);
        say.innerHTML = T('Étape {i} : ', { i: k }) + e + '.' + (k === ns ? ' ' + T('Résultat : {r}.', { r: (S.swap ? MINUS : '') + num(S.result, b) }) : '');
      };
    }

    else if (op === 'mul') {
      var Mm = mulCols(ops[0], ops[1], b, { zeros: o.zeros }), nr = Mm.rows.length, topM = Math.max(Mm.result.length, Mm.a.length, Mm.b.length) - 1;
      Mm.rows.forEach(function (r) { topM = Math.max(topM, r.j + r.str.length - 1); });
      total = nr + 1; result = { int: Mm.result, frac: '' };
      paint = function (k) {
        var rows = [{ cells: cellsOf(Mm.a, 0), nocur: true }, { cells: cellsOf(Mm.b, 0), op: '×', cls: 'po-last', nocur: true }];
        Mm.rows.forEach(function (r, i) {
          var cl = (i === nr - 1 ? 'po-last' : '') + (i >= k ? ' later' : i === k - 1 ? ' now' : '');
          rows.push({ cells: cellsOf(r.str, r.j), op: i ? '+' : '', cls: cl, nocur: true });
        });
        rows.push({ cells: k > nr ? cellsOf(Mm.result, 0) : {}, cls: 'po-res' + (k > nr ? ' now' : ''), nocur: true });
        box.innerHTML = gridHTML(rows, topM, 0, null);
        if (k === 0) { say.innerHTML = T('Un produit partiel par chiffre du multiplicateur, en partant de la droite, chacun décalé d’un rang de plus vers la gauche ; puis on les additionne.'); return; }
        if (k <= nr) {
          var r = Mm.rows[k - 1];
          say.innerHTML = T('Étape {i} : ', { i: k }) + (b === 2
            ? (r.d ? (r.j ? T('le chiffre de poids {p} du multiplicateur vaut 1 : on écrit le multiplicande, décalé de {j} rang(s).', { p: pw(2, r.j), j: r.j }) : T('le chiffre de droite du multiplicateur vaut 1 : on écrit le multiplicande.'))
              : (r.j ? T('le chiffre de poids {p} du multiplicateur vaut 0 : une ligne de zéros, décalée de {j} rang(s).', { p: pw(2, r.j), j: r.j }) : T('le chiffre de droite du multiplicateur vaut 0 : une ligne de zéros.')))
            : T('chiffre de poids {p} : {a} × {d} = {r}, décalé de {j} rang(s).', { p: pw(b, r.j), a: bn(Mm.a, b), d: bn(digit(r.d), b), r: bn(r.str, b), j: r.j }));
          return;
        }
        say.innerHTML = T('Étape {i} : ', { i: k }) + T('on additionne les produits partiels, colonne par colonne avec les retenues.') + ' ' + T('Résultat : {r}.', { r: num(Mm.result, b) });
      };
    }

    else if (op === 'div') {
      var D = divCols(ops[0], ops[1], b, { digits: o.digits });
      if (D.error) { box.innerHTML = '<p class="cv-err">' + T('Division par zéro.') + '</p>'; return null; }
      var ev = D.events, ne = ev.length, nz = ev.filter(function (e) { return e.type === 'zero'; }).length, W = D.a.length + nz;
      total = ne; result = D.quotient;
      paint = function (k) {
        var lines = [{ cells: {}, cc: {} }], curL = lines[0], qs = '', i;
        for (i = 0; i < D.a.length; i++) lines[0].cells[i] = esc(D.a.charAt(i));
        function subRem(e) {
          var sub = intStr(e.sub, b), rem = intStr(e.rem, b), sl = { cells: {}, cc: {} }, rl = { cells: {}, cc: {} }, st = e.col - sub.length + 1;
          for (var j = 0; j < sub.length; j++) { sl.cells[st + j] = esc(sub.charAt(j)); sl.cc[st + j] = 'u'; }
          if (st > 0) { sl.cells[st - 1] = MINUS; sl.cc[st - 1] = 'mn'; } else sl.op = MINUS;
          for (j = 0; j < rem.length; j++) rl.cells[e.col - rem.length + 1 + j] = esc(rem.charAt(j));
          if (e.rem === Z) rl.zero = e.col;
          lines.push(sl, rl); curL = rl;
        }
        for (i = 0; i < k; i++) {
          var e = ev[i], now = i === k - 1;
          if (e.type === 'small') qs += '0';
          else if (e.type === 'first') { qs += digit(e.qd); if (now) for (var j = 0; j <= e.col; j++) lines[0].cc[j] = 'hl'; subRem(e); }
          else if (e.type === 'down' || e.type === 'zero') {
            if (curL.zero != null && e.col === curL.zero + 1) curL.cc[curL.zero] = (curL.cc[curL.zero] || '') + ' lead0';
            curL.cells[e.col] = esc(e.type === 'zero' ? '0' : e.digit); curL.cc[e.col] = (curL.cc[e.col] || '') + (now ? ' hl' : '') + (e.type === 'zero' ? ' z0' : '');
            if (e.type === 'down' && now) lines[0].cc[e.col] = 'src';
            qs += digit(e.qd);
            if (e.qd !== Z) subRem(e);
          } else if (e.type === 'comma') qs += sepChar();
        }
        var left = '<table class="po-t po-dl"><tbody>' + lines.map(function (l) {
          var h = '<tr><th class="po-o" scope="row">' + (l.op || '') + '</th>';
          for (var c = 0; c < W; c++) h += '<td' + (l.cc[c] ? ' class="' + l.cc[c].trim() + '"' : '') + '>' + (l.cells[c] == null ? '' : l.cells[c]) + '</td>';
          return h + '</tr>';
        }).join('') + '</tbody></table>';
        var right = '<div class="po-dr"><div class="po-dv">' + esc(D.b) + '</div><div class="po-dq">' + esc(qs) + '</div></div>';
        box.innerHTML = '<div class="po-div">' + left + right + '</div>';
        if (k === 0) { say.innerHTML = T('Le dividende à gauche, le diviseur à droite, le quotient sous le diviseur.'); return; }
        var ce = ev[k - 1], s = '', B2 = function (x) { return bn(intStr(x, b), b); };
        if (ce.type === 'small') s = T('Le diviseur ({d}) est plus grand que le dividende : le quotient commence par 0.', { d: bn(D.b, b) });
        else if (ce.type === 'first') s = T('Le diviseur ({d}) va {q} fois dans {c}, le plus petit début du dividende qui le contient. On écrit {q} au quotient et on soustrait : {c} − {s} = {r}.', { d: bn(D.b, b), q: bn(digit(ce.qd), b), c: B2(ce.cur), s: B2(ce.sub), r: B2(ce.rem) });
        else if (ce.type === 'comma') s = T('Tous les chiffres du dividende sont abaissés et le reste n’est pas nul : on écrit une virgule au quotient, puis on ajoute un 0 au reste.');
        else {
          var lead = ce.type === 'zero' ? T('On ajoute un 0 au reste : {c}.', { c: B2(ce.cur) }) : T('On abaisse le chiffre suivant ({x}) : {c}.', { x: bn(ce.digit, b), c: B2(ce.cur) });
          s = lead + ' ' + (ce.qd === Z ? T('C’est plus petit que le diviseur : on écrit 0 au quotient.') : T('Le diviseur y va {q} fois : on écrit {q} au quotient et on soustrait : {c} − {s} = {r}.', { q: bn(digit(ce.qd), b), c: B2(ce.cur), s: B2(ce.sub), r: B2(ce.rem) }));
        }
        if (k === ne) {
          var qq = num(D.quotient, b);
          s += ' ' + (D.exact ? T('Le reste est nul : {a} / {d} = {q}.', { a: bn(D.a, b), d: bn(D.b, b), q: qq })
            : (+o.digits > 0 ? T('On a les chiffres demandés après la virgule : on s’arrête. {a} / {d} ≈ {q} (reste {r}).', { a: bn(D.a, b), d: bn(D.b, b), q: qq, r: B2(D.rem) }) : T('Quotient {q}, reste {r}.', { q: qq, r: B2(D.rem) })));
        }
        say.innerHTML = T('Étape {i} : ', { i: k }) + s;
      };
    }
    if (!paint) return null;
    if (o.step === false) paint(total); else stepper(el, total, paint, o.start == null ? 0 : o.start);
    return { result: result };
  }
  /* ---------- le registre de bits cliquable ----------
     REV.archi.register(el, { n: 8, value: '0010 1100', sizes: [4, 8, 16], title })
       Un clic sur un bit l'inverse. En dessous : le mot, l'hexadécimal, la valeur non signée et la valeur signée
       (complément à deux). Boutons : complément à un, complément à deux (avec ses deux étapes), + 1, − 1, effacer. */
  function wordHTML(w, hl) {
    return '<span class="bn">' + gInt(w, 4).map(function (g) { return esc(g); }).join('\u00a0') + '</span>';
  }
  function register(el, o) {
    if (!el) return null;
    o = o || {};
    var n = +o.n || 8, sizes = o.sizes || [4, 8, 16], w = o.value != null ? bits(typeof o.value === 'string' ? decodeU(o.value) : o.value, n) : bits(0, n);
    el.classList.add('bench', 'rg');
    el.innerHTML = head(o.title || T('Registre de {n} bits', { n: '<span class="rg-n">' + n + '</span>' }),
      sizes.length > 1 ? '<span class="rg-sz" role="group" aria-label="' + esc(T('Taille du mot')) + '">' + sizes.map(function (s) { return '<button type="button" class="chip-btn" data-n="' + s + '" aria-pressed="' + (s === n) + '">' + s + '</button>'; }).join('') + '</span>' : '') +
      '<div class="bench-body"><div class="rg-scroll"><div class="rg-word"></div></div>' +
      '<dl class="rg-read"></dl><div class="readout rg-say" aria-live="polite"></div></div>' +
      '<div class="ctrls"><div class="row">' +
      '<button type="button" class="btn" data-a="ones">' + T('Complément à un') + '</button>' +
      '<button type="button" class="btn primary" data-a="twos">' + T('Complément à deux') + '</button>' +
      '<button type="button" class="btn" data-a="inc">+ 1</button><button type="button" class="btn" data-a="dec">' + MINUS + ' 1</button>' +
      '<button type="button" class="btn ghost" data-a="clr">' + T('Effacer') + '</button></div></div>';
    var word = el.querySelector('.rg-word'), read = el.querySelector('.rg-read'), say = el.querySelector('.rg-say');
    function paint() {
      var h = '';
      for (var i = 0; i < n; i++) {
        var k = n - 1 - i;
        h += '<button type="button" class="rg-b' + (w.charAt(i) === '1' ? ' one' : '') + (i === 0 ? ' msb' : '') + (k % 4 === 0 && k ? ' gap' : '') + '" data-i="' + i + '" aria-pressed="' + (w.charAt(i) === '1') + '" aria-label="' + esc(T('bit {k}', { k: k })) + '">' +
          '<span class="rg-i">' + k + '</span><span class="rg-v">' + w.charAt(i) + '</span></button>';
      }
      word.innerHTML = h;
      word.style.setProperty('--n', n);
      var u = decodeU(w), s = decodeS(w);
      read.innerHTML = '<div><dt>' + T('binaire') + '</dt><dd>' + num(w, 2, { group: 4 }) + '</dd></div>' +
        '<div><dt>' + T('hexadécimal') + '</dt><dd>' + num(hexOf(w), 16) + '</dd></div>' +
        '<div><dt>' + T('non signé') + '</dt><dd>' + num(u, 10, { sub: false }) + '</dd></div>' +
        '<div class="' + (w.charAt(0) === '1' ? 'neg' : '') + '"><dt>' + T('signé') + '</dt><dd>' + num(s, 10, { sub: false }) + '</dd></div>';
    }
    function rows(list) {                          /* petite opération posée : [{ l, w, op, cls }] */
      return '<table class="rg-ops"><tbody>' + list.map(function (r) {
        return '<tr class="' + (r.cls || '') + '"><th scope="row">' + (r.op || '') + '</th><td>' + (r.w ? wordHTML(r.w) : '') + '</td><td class="muted">' + (r.l || '') + '</td></tr>';
      }).join('') + '</tbody></table>';
    }
    function pad1() { return bits(1, n); }
    el.addEventListener('click', function (e) {
      var bt = e.target.closest('button'); if (!bt || !el.contains(bt)) return;
      if (bt.hasAttribute('data-i')) {
        var i = +bt.getAttribute('data-i');
        w = w.slice(0, i) + (w.charAt(i) === '1' ? '0' : '1') + w.slice(i + 1); paint();
        el.querySelector('.rg-b[data-i="' + i + '"]').focus();
        say.innerHTML = T('Le bit {k} vaut {p} en non signé ; le bit de poids fort ({m}) compte pour {s} en signé.', { k: n - 1 - i, p: num(bpow(TWO, n - 1 - i), 10, { sub: false }), m: n - 1, s: num(-bpow(TWO, n - 1), 10, { sub: false }) });
        return;
      }
      if (bt.hasAttribute('data-n')) {
        var nn = +bt.getAttribute('data-n'), sv = decodeS(w);
        var enc = encode(sv, nn, true);
        w = enc.ok ? enc.bits : bits(decodeU(w), nn);
        say.innerHTML = enc.ok && nn > n ? T('Extension de signe : on recopie le bit de poids fort à gauche, la valeur signée ne change pas.') : nn < n ? (enc.ok ? T('Les bits de gauche retirés étaient des copies du bit de signe : la valeur signée ne change pas.') : T('Des bits utiles sont perdus : la valeur change.')) : '';
        n = nn; U.$$('[data-n]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(+x.getAttribute('data-n') === n)); });
        var rn = el.querySelector('.rg-n'); if (rn) rn.textContent = n;
        paint(); return;
      }
      var a = bt.getAttribute('data-a'), old = w, r;
      if (a === 'ones') {
        w = ones(w); paint();
        say.innerHTML = rows([{ w: old, l: T('mot') }, { w: w, l: T('tous les bits inversés'), cls: 'res' }]) + '<p>' + T('Complément à un : chaque 0 devient 1, chaque 1 devient 0.') + '</p>';
      } else if (a === 'twos') {
        r = twos(old); w = r.bits; paint();
        var so = decodeS(old), sn = decodeS(w);
        say.innerHTML = rows([{ w: old, l: T('mot') }, { w: r.inv, l: T('1. inverser (complément à un)') }, { w: pad1(), op: '+', l: T('2. ajouter 1'), cls: 'last' }, { w: w, l: T('complément à deux'), cls: 'res' }]) +
          '<p>' + (so === sn && so !== Z ? T('{a} est la plus petite valeur signée sur {n} bits : son opposé ne tient pas sur {n} bits, le complément à deux redonne le même mot.', { a: num(so, 10, { sub: false }), n: n })
            : T('En signé, {a} devient {b} : le complément à deux donne l’opposé.', { a: num(so, 10, { sub: false }), b: num(sn, 10, { sub: false }) })) + (r.lost ? ' ' + T('La retenue qui sort à gauche est perdue.') : '') + '</p>';
      } else if (a === 'inc' || a === 'dec') {
        r = a === 'inc' ? addN(old, pad1()) : subN(old, pad1()); w = r.bits; paint();
        var msg = [];
        if (r.u.overflow) msg.push(T('Dépassement non signé : {a} {o} 1 ne tient pas sur {n} bits, le mot repart à {r}.', { a: num(r.u.a, 10, { sub: false }), o: a === 'inc' ? '+' : MINUS, n: n, r: num(r.u.r, 10, { sub: false }) }));
        if (r.s.overflow) msg.push(T('Dépassement signé : {a} {o} 1 sort de l’intervalle, le mot vaut {r} en signé.', { a: num(r.s.a, 10, { sub: false }), o: a === 'inc' ? '+' : MINUS, r: num(r.s.r, 10, { sub: false }) }));
        say.innerHTML = rows([{ w: old }, { w: pad1(), op: a === 'inc' ? '+' : MINUS, cls: 'last' }, { w: w, cls: 'res', l: r.carry && a === 'inc' ? T('la retenue sortante est perdue') : '' }]) + (msg.length ? '<p class="warn">' + msg.join(' ') + '</p>' : '<p>' + T('Pas de dépassement.') + '</p>');
      } else if (a === 'clr') { w = bits(0, n); paint(); say.innerHTML = ''; }
    });
    paint();
    return { value: function () { return w; }, set: function (v) { w = bits(typeof v === 'string' ? decodeU(v) : v, n); paint(); } };
  }

  /* ---------- la roue des mots de 4 bits ----------
     REV.archi.wheel(el, { value: 5, title }) : les 16 mots en cercle, la valeur non signée à l'intérieur, la
     valeur signée à l'extérieur. + 1 / − 1 / + 4 / − 4 : passer de 1111 à 0000 est un dépassement non signé,
     passer de 0111 à 1000 un dépassement signé. */
  function wheel(el, o) {
    if (!el) return null;
    o = o || {};
    var v = (+o.value || 0) & 15;
    el.classList.add('bench', 'wh');
    el.innerHTML = head(o.title || T('La roue des mots de 4 bits'), T('non signé dedans, signé dehors')) +
      '<div class="bench-body"><div class="wh-fig"></div><div class="readout wh-say" aria-live="polite"></div></div>' +
      '<div class="ctrls"><div class="row">' + [[-4, MINUS + ' 4'], [-1, MINUS + ' 1'], [1, '+ 1'], [4, '+ 4']].map(function (x) { return '<button type="button" class="btn' + (x[0] === 1 ? ' primary' : '') + '" data-d="' + x[0] + '">' + x[1] + '</button>'; }).join('') + '</div></div>';
    var fig = el.querySelector('.wh-fig'), say = el.querySelector('.wh-say');
    function pt(i, r) { var a = (-90 + (i + 0.5) * 22.5) * Math.PI / 180; return [160 + r * Math.cos(a), 160 + r * Math.sin(a)]; }
    function paint() {
      var s = '<svg viewBox="0 0 320 320" role="img" aria-label="' + esc(T('Roue des 16 mots de 4 bits ; mot courant {w}', { w: bits(v, 4) })) + '">';
      s += '<circle class="wh-ring" cx="160" cy="160" r="104"/>';
      /* frontières : 1111 | 0000 en haut (non signé), 0111 | 1000 en bas (signé) */
      var t0 = pt(-0.5, 70), t1 = pt(-0.5, 150), b0 = pt(7.5, 70), b1 = pt(7.5, 150);
      s += '<line class="wh-cut u" x1="' + t0[0] + '" y1="' + t0[1] + '" x2="' + t1[0] + '" y2="' + t1[1] + '"/>';
      s += '<line class="wh-cut s" x1="' + b0[0] + '" y1="' + b0[1] + '" x2="' + b1[0] + '" y2="' + b1[1] + '"/>';
      for (var i = 0; i < 16; i++) {
        var p = pt(i, 104), pi = pt(i, 72), po = pt(i, 140), on = i === v, neg = i >= 8;
        s += '<g class="wh-s' + (on ? ' on' : '') + (neg ? ' neg' : '') + '">' +
          '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="17"/>' +
          '<text class="wh-w" x="' + p[0].toFixed(1) + '" y="' + (p[1] + 3.5).toFixed(1) + '">' + bits(i, 4) + '</text>' +
          '<text class="wh-u" x="' + pi[0].toFixed(1) + '" y="' + (pi[1] + 4).toFixed(1) + '">' + i + '</text>' +
          '<text class="wh-sg" x="' + po[0].toFixed(1) + '" y="' + (po[1] + 4).toFixed(1) + '">' + (neg ? MINUS + (16 - i) : i) + '</text></g>';
      }
      s += '<text class="wh-lbl u" x="160" y="14">' + esc(T('dépassement non signé')) + '</text>';
      s += '<text class="wh-lbl s" x="160" y="314">' + esc(T('dépassement signé')) + '</text>';
      s += '</svg>';
      fig.innerHTML = s;
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-d]'); if (!b) return;
      var d = +b.getAttribute('data-d'), old = v, nv = (v + d + 16) & 15;
      var raw = v + d, uo = raw < 0 || raw > 15;
      var so = old >= 8 ? old - 16 : old, sr = so + d, sov = sr < -8 || sr > 7;
      v = nv; paint();
      var w0 = '<span class="bn">' + bits(old, 4) + '</span>', w1 = '<span class="bn">' + bits(v, 4) + '</span>', op = d > 0 ? '+ ' + d : MINUS + ' ' + (-d);
      var m = w0 + ' ' + op + ' → ' + w1 + '. ' + T('Non signé : {a} {o} = {r}', { a: old, o: op, r: raw < 0 ? MINUS + (-raw) : raw }) +
        (uo ? ', ' + T('hors de 0 … 15 : dépassement non signé, le mot vaut {v}.', { v: v }) : '.') + ' ' +
        T('Signé : {a} {o} = {r}', { a: so < 0 ? MINUS + (-so) : so, o: op, r: sr < 0 ? MINUS + (-sr) : sr }) +
        (sov ? ', ' + T('hors de −8 … 7 : dépassement signé, le mot vaut {v}.', { v: (v >= 8 ? MINUS + (16 - v) : v) }) : '.');
      say.innerHTML = m;
    });
    paint();
    say.innerHTML = T('Le mot {w} : {u} en non signé, {s} en signé. Tourne la roue avec les boutons.', { w: '<span class="bn">' + bits(v, 4) + '</span>', u: v, s: v >= 8 ? MINUS + (16 - v) : v });
    return { value: function () { return v; } };
  }

  /* ---------- IEEE 754 : le mot coloré par champs, avec l'encodage ou le décodage pas à pas ----------
     REV.archi.ieee(el, { fmt: 'single', value: '320' })                         encoder un réel
     REV.archi.ieee(el, { fmt: 'double', hex: '2844 0000 0000 0000' })            décoder un mot
     Options : mode ('encode' | 'decode', déduit), input (true : champ de saisie et choix du format),
     round ('nearest' par défaut, 'trunc'), title. S en violet, E en cuivre, M en bleu, partout. */
  function ieeeWordHTML(r) {
    var F = FMT[r.fmt], b = r.bits;
    function field(cls, lbl, s, from) {
      /* paquets de 4 : depuis la droite pour E (un entier), depuis la gauche pour M (des chiffres après la virgule) */
      var gs = cls === 'm' ? gFrac(s, 4) : gInt(s, 4), h = '', i = 0;
      gs.forEach(function (g) {
        h += '<span class="ie-g">';
        for (var j = 0; j < g.length; j++, i++) h += '<i class="' + (g.charAt(j) === '1' ? 'one' : '') + '" title="' + esc(T('bit {k}', { k: F.n - 1 - (from + i) })) + '">' + g.charAt(j) + '</i>';
        h += '</span>';
      });
      return '<span class="ie-f ie-' + cls + '"><span class="ie-lbl">' + lbl + '</span><span class="ie-bits">' + h + '</span></span>';
    }
    var nibs = '';
    for (var j = 0; j < F.n; j += 4) {
      var bb = '';
      for (var t = j; t < j + 4; t++) bb += '<i class="' + (t === 0 ? 's' : t <= F.e ? 'e' : 'm') + (b.charAt(t) === '1' ? ' one' : '') + '">' + b.charAt(t) + '</i>';
      nibs += '<span class="ie-nib"><span class="ie-nb">' + bb + '</span><span class="ie-hd">' + r.hex.charAt(j / 4) + '</span></span>';
    }
    return '<div class="ie-word">' + field('s', 'S', b.charAt(0), 0) + field('e', 'E · ' + F.e + ' bits', b.slice(1, 1 + F.e), 1) + field('m', 'M · ' + F.m + ' bits', b.slice(1 + F.e), 1 + F.e) + '</div>' +
      '<div class="ie-nibs" role="img" aria-label="' + esc(T('Le mot en paquets de 4 bits, et son écriture hexadécimale')) + '">' + nibs + '</div>' +
      '<p class="ie-hex">' + num(r.hex, 16, { group: 4, nbsp: true }) + '</p>';
  }
  function trimZ(s) { return s.replace(/0+$/, ''); }
  /* une mantisse : des chiffres après la virgule, en paquets de 4 depuis la gauche */
  function mantH(m) { return '<span class="bn w">' + esc(gFrac(m, 4).join(' ')) + '</span>'; }
  /* écriture décimale sans séparateurs de milliers (pour un champ de saisie) */
  function plain(v) { var t = toBase(v, 10, { max: 60 }); return (t.neg ? '-' : '') + t.int + (t.frac ? sepChar() + t.frac : ''); }
  function k2nHTML(k, n) { return (k < Z ? MINUS : '') + esc(String(babs(k))) + ' × ' + pw(2, n); }
  function valueHTML(v) {
    var t = toBase(q.abs(v), 10, { max: 40 });
    if (t.exact && t.int.length + t.frac.length <= 40) return num(v, 10, { sub: false, max: 40 });
    var s = sci(v, 4);
    return '≈ ' + (s.neg ? MINUS : '') + esc(s.m) + ' × ' + pw(10, s.e);
  }
  function ieeeSteps(r, mode, src) {
    var F = FMT[r.fmt], li = [];
    function L(x) { li.push('<li><div><p>' + x + '</p></div></li>'); }
    var sB = '<b class="ie-cs">S</b>', eB = '<b class="ie-ce">E</b>', mB = '<b class="ie-cm">M</b>';
    if (mode === 'encode') {
      if (r.cls === 'nan') { L(T('NaN (« pas un nombre ») : {e} rempli de 1 et {m} non nul.', { e: eB, m: mB })); return li; }
      if (r.cls === 'inf') {
        L(r.overflow ? T('La valeur dépasse le plus grand nombre représentable : on obtient l’infini.') : T('L’infini : {e} rempli de 1, {m} nul.', { e: eB, m: mB }));
        L(T('{s} = {v} : le signe.', { s: sB, v: r.s })); return li;
      }
      if (r.cls === 'zero' && !r.underflow) { L(T('Zéro : {e} et {m} nuls ; seul {s} distingue +0 de −0.', { e: eB, m: mB, s: sB })); return li; }
      L(T('Signe : le nombre est {p}, donc {s} = {v}.', { p: r.s ? T('négatif') : T('positif'), s: sB, v: r.s }));
      var bi = r.bin, shownF = bi.frac.length > 40 ? bi.frac.slice(0, 40) : bi.frac;
      L(T('En binaire : {a} = {b}.', { a: num(q.abs(value(src, 10) || Q(0)), 10, { sub: false, max: 30 }), b: num({ int: bi.int, frac: shownF }, 2, { period: bi.period && bi.period.start + bi.period.len <= shownF.length ? bi.period : null, more: !bi.exact && !(bi.period && bi.period.start + bi.period.len <= shownF.length) }) }));
      if (r.underflow) { L(T('Le nombre est trop petit, même pour un dénormalisé : il est arrondi à 0.')); return li; }
      var E = r.E0;
      if (r.cls === 'subnormal') {
        L(T('Normalisé, il s’écrirait 1,… × {p} : l’exposant est plus petit que {m}. C’est un nombre dénormalisé : {e} = 0 et on écrit 0,{mm} × {q}.', { p: pw(2, E), m: 1 - F.bias, e: eB, mm: mB, q: pw(2, 1 - F.bias) }));
      } else {
        var nd = r.exact ? trimZ(r.bits.slice(1 + F.e)) : (function () {
          var nb = toBase(q.abs(value(src, 10) || r.value), 2, { digits: Math.max(0, -E) + F.m + 6 }), all = (nb.int === '0' ? '' : nb.int) + nb.frac;
          return all.slice(all.indexOf('1') + 1, all.indexOf('1') + 1 + F.m + 4);
        })();
        L(T('Normalisation : on déplace la virgule derrière le premier 1, de {k} rang(s) vers la {d} : {v}.', {
          k: Math.abs(E), d: E >= 0 ? T('gauche') : T('droite'),
          v: num({ int: '1', frac: nd }, 2, { more: !r.exact }) + ' × ' + pw(2, E)
        }));
        L(T('Exposant : {e} = {E} + {b} = {v} = {w}.', { e: eB, E: r.E < 0 ? MINUS + (-r.E) : r.E, b: F.bias, v: r.e, w: num(bits(r.e, F.e), 2) }));
      }
      L(T('Mantisse : les chiffres après la virgule, complétés à droite par des 0 jusqu’à {n} bits : {m} = {v}.', { n: F.m, m: mB, v: mantH(bits(r.M, F.m)) }) +
        (r.exact ? '' : ' ' + (r.round === 'trunc' ? T('Il faudrait plus de {n} bits : on garde les {n} premiers, sans arrondir (la valeur codée n’est pas exactement la valeur de départ).', { n: F.m })
          : T('Il faudrait plus de {n} bits : on garde les {n} premiers, arrondis au plus proche (la valeur codée n’est pas exactement la valeur de départ).', { n: F.m }))));
      L(T('Le mot : {w}.', { w: num(r.hex, 16, { group: 4, nbsp: true }) }) + (r.exact ? '' : ' ' + T('Valeur codée : {v}.', { v: valueHTML(r.value) })) +
        '<span class="ie-copy">' + T('Sur la copie (sans espace) :') + ' ' + sB + ' <span class="bn">' + r.s + '</span> · ' + eB + ' <span class="bn">' + bits(r.e, F.e) + '</span> · ' + mB + ' <span class="bn">' + bits(r.M, F.m) + '</span></span>');
      return li;
    }
    /* décodage */
    L(T('{s} = {v} : le nombre est {p}.', { s: sB, v: r.s, p: r.s ? T('négatif') : T('positif') }));
    var allE = Math.pow(2, F.e) - 1, eb = r.bits.slice(1, 1 + F.e), mb = r.bits.slice(1 + F.e);
    if (r.cls === 'inf') { L(T('{e} = {w} (rempli de 1) et {m} = 0 : c’est l’infini.', { e: eB, w: num(eb, 2), m: mB })); L(T('Représentation : {r}.', { r: '<b>' + (r.s ? MINUS : '+') + '∞</b>' })); return li; }
    if (r.cls === 'nan') { L(T('{e} = {w} (rempli de 1) et {m} ≠ 0 : ce n’est pas un nombre.', { e: eB, w: num(eb, 2), m: mB })); L(T('Représentation : {r}.', { r: '<b>NaN</b>' })); return li; }
    if (r.cls === 'zero') { L(T('{e} = 0 et {m} = 0 : c’est zéro.', { e: eB, m: mB })); L(T('Représentation : {r}.', { r: '<b>' + (r.s ? MINUS : '+') + '0</b>' })); return li; }
    if (r.cls === 'subnormal') {
      L(T('{e} = 0 et {m} ≠ 0 : nombre dénormalisé. Pas de 1 avant la virgule, et l’exposant vaut {m0}.', { e: eB, m: mB, m0: MINUS + (F.bias - 1) }));
      L(T('{m} = {v} : la valeur est 0,{t} × {p}.', { m: mB, v: mantH(mb), t: '<span class="bn">' + esc(gFrac(trimZ(mb), 4).join('\u00a0')) + '</span><sub>2</sub>', p: pw(2, 1 - F.bias) }));
    } else {
      L(T('{e} = {w} = {v} : l’exposant vaut {v} − {b} = {E}.', { e: eB, w: num(eb, 2), v: r.e, b: F.bias, E: r.E < 0 ? MINUS + (-r.E) : r.E }));
      L(T('{m} = {v} : la valeur est 1,{t} × {p}.', { m: mB, v: mantH(mb), t: trimZ(mb) ? '<span class="bn">' + esc(gFrac(trimZ(mb), 4).join('\u00a0')) + '</span><sub>2</sub>' : '0', p: pw(2, r.E) }));
    }
    var tz = trimZ(mb);
    L((tz ? T('On déplace la virgule de {f} rang(s) vers la droite pour obtenir un entier (impair), et on retire {f} à l’exposant.', { f: tz.length }) + ' ' : '') +
      T('Représentation : {r}.', { r: '<b>' + k2nHTML(r.k, r.n) + '</b>' }) + ' ' + T('En décimal : {v}.', { v: valueHTML(r.value) }));
    return li;
  }
  function ieee(el, o) {
    if (!el) return null;
    o = o || {};
    var mode = o.mode || (o.hex != null || o.word != null ? 'decode' : 'encode'), fmtName = o.fmt || 'single', id = 'ie' + (++uid);
    var input = o.input !== false, src = mode === 'decode' ? (o.hex || o.word || '') : String(o.value == null ? '' : o.value);
    el.classList.add('bench', 'ie');
    el.innerHTML = head(o.title || T('IEEE 754'), '<span class="ie-fmt-l"></span>') +
      '<div class="bench-body">' + (input ? '<div class="ie-form">' +
        '<span class="ie-tg" role="group" aria-label="' + esc(T('Sens')) + '"><button type="button" class="chip-btn" data-m="encode">' + T('Nombre → mot') + '</button><button type="button" class="chip-btn" data-m="decode">' + T('Mot → nombre') + '</button></span>' +
        '<span class="ie-tg" role="group" aria-label="' + esc(T('Format')) + '"><button type="button" class="chip-btn" data-f="single">' + T('simple (32 bits)') + '</button><button type="button" class="chip-btn" data-f="double">' + T('double (64 bits)') + '</button></span>' +
        '<label class="cv-f ie-in"><span class="ie-in-l"></span><input id="' + id + '" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false"></label></div>' : '') +
      '<div class="ie-out" aria-live="polite"></div><ol class="steps ie-steps"></ol></div>';
    var out = el.querySelector('.ie-out'), st = el.querySelector('.ie-steps'), inp = el.querySelector('input');
    function run() {
      var F = FMT[fmtName];
      el.querySelector('.ie-fmt-l').textContent = fmtName === 'single' ? T('simple précision · 1 + 8 + 23 bits, biais 127') : T('double précision · 1 + 11 + 52 bits, biais 1023');
      if (input) {
        U.$$('[data-m]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-m') === mode)); });
        U.$$('[data-f]', el).forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-f') === fmtName)); });
        el.querySelector('.ie-in-l').textContent = mode === 'encode' ? T('Nombre (décimal)') : T('Mot en hexadécimal ({n} chiffres)', { n: F.n / 4 });
      }
      var r = mode === 'encode' ? ieeeEncode(src, fmtName, { round: o.round }) : ieeeDecode(src, fmtName);
      if (r.error) {
        out.innerHTML = '<p class="cv-err">' + (mode === 'encode' ? T('Tape un nombre décimal (virgule ou point), ou inf, −inf, nan.') : T('Tape un mot de {n} chiffres hexadécimaux (espaces permis) ou de {b} bits.', { n: F.n / 4, b: F.n })) + '</p>';
        st.innerHTML = ''; return;
      }
      out.innerHTML = ieeeWordHTML(r);
      st.innerHTML = ieeeSteps(r, mode, src).join('');
    }
    if (input) {
      inp.value = src;
      inp.addEventListener('input', function () { src = inp.value; run(); });
      el.querySelector('.ie-form').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        if (b.hasAttribute('data-m')) {
          var nm = b.getAttribute('data-m');
          if (nm !== mode) {
            var cur = mode === 'encode' ? ieeeEncode(src, fmtName, { round: o.round }) : ieeeDecode(src, fmtName);
            mode = nm;
            if (!cur.error) src = mode === 'decode' ? grp(cur.hex, 4) : (cur.value ? plain(cur.value) : (cur.cls === 'nan' ? 'nan' : cur.cls === 'inf' ? (cur.s ? '-inf' : 'inf') : '0'));
            inp.value = src;
          }
        }
        if (b.hasAttribute('data-f')) {
          var nf = b.getAttribute('data-f');
          if (nf !== fmtName) {
            if (mode === 'decode') { var dv = ieeeDecode(src, fmtName); fmtName = nf; if (!dv.error && dv.value) src = grp(ieeeEncode(dv.value, nf).hex, 4); else if (!dv.error) src = grp(ieeeEncode(dv.cls === 'nan' ? 'nan' : dv.cls === 'inf' ? (dv.s ? '-inf' : 'inf') : (dv.s ? '-0' : '0'), nf).hex, 4); inp.value = src; }
            else fmtName = nf;
          }
        }
        run();
      });
    }
    run();
    return { run: run };
  }

  /* ================================================================== 7. PAGE */
  /* numéro de partie : un quartet, les bits à 1 allumés (partie 5 → 0101) */
  function nibHTML(n) {
    var w = bits(n, 4), h = '';
    for (var i = 0; i < 4; i++) h += '<i class="' + (w.charAt(i) === '1' ? 'on' : '') + '"></i>';
    return h;
  }
  var MOUNT = { place: place, divs: divs, mults: mults, groups: groups, converter: converter, drill: drill, posed: posed, register: register, wheel: wheel, ieee: ieee };
  /* monte les numéros de parties et les outils déclarés dans un conteneur (et le conteneur lui-même) ;
     appelé au chargement puis pour tout bloc ajouté plus tard (cartes d'exercices, corrigés, QCM). */
  function mount(root) {
    if (!root || root.nodeType !== 1) return;
    function all(sel) { var l = U.$$(sel, root); if (root.matches && root.matches(sel)) l.unshift(root); return l; }
    all('.nib[data-n]').forEach(function (el) {
      if (el.getAttribute('data-nib-done')) return;
      el.setAttribute('data-nib-done', '1'); el.innerHTML = nibHTML(+el.getAttribute('data-n')); el.setAttribute('aria-hidden', 'true');
    });
    /* outils déclarés : <div data-archi="divs" data-opts='{"n":"715","base":2}'></div> */
    all('[data-archi]').forEach(function (el) {
      if (el.getAttribute('data-archi-done')) return;
      var f = MOUNT[el.getAttribute('data-archi')], op = {};
      if (!f) return;
      el.setAttribute('data-archi-done', '1');
      try { op = JSON.parse(el.getAttribute('data-opts') || '{}'); } catch (e) { op = {}; }
      try { f(el, op); } catch (e) { el.innerHTML = '<p class="cv-err">' + esc(T('Outil indisponible : {m}', { m: e.message })) + '</p>'; }
    });
  }
  function init() {
    mount(document.body);
    if (window.MutationObserver) new MutationObserver(function (list) {
      for (var a = 0; a < list.length; a++) for (var b = 0; b < list[a].addedNodes.length; b++) {
        var nd = list[a].addedNodes[b];
        if (nd.nodeType === 1 && (nd.hasAttribute('data-archi') || nd.classList.contains('nib') || (nd.querySelector && nd.querySelector('[data-archi],.nib[data-n]')))) mount(nd);
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

  R.archi = {
    /* nombres exacts */
    Q: Q, q: q, big: big, bpow: bpow, parse: parse, value: value, digit: digit, digitVal: digitVal, intStr: intStr, strInt: strInt, clean: clean,
    divisions: divisions, multiplications: multiplications, toBase: toBase, terms: terms, convert: convert, packs: packs, unpacks: unpacks,
    addCols: addCols, subCols: subCols, mulCols: mulCols, divCols: divCols,
    bits: bits, range: range, encode: encode, decodeU: decodeU, decodeS: decodeS, ones: ones, twos: twos, addN: addN, subN: subN, signExt: signExt, hex: hexOf,
    FMT: FMT, ieeeEncode: ieeeEncode, ieeeDecode: ieeeDecode, k2n: k2n, sci: sci,
    /* écriture */
    sep: sepChar, fmt: fmt, num: num, dec: dec, pw: pw,
    /* visuels */
    place: place, divs: divs, mults: mults, groups: groups, converter: converter, drill: drill, posed: posed, register: register, wheel: wheel, ieee: ieee,
    nib: nibHTML, stepper: stepper, mount: mount
  };
})();
