/* Caml — exercices des sujets d’algo de mi-semestre (partie Caml), corrigés. Source : analyse des annales.
   Une fiche par exercice Caml des 9 sujets retrouvés (2017 à 2024, dont le contrôle S1# d’avril 2019, noté p2019d).
   Énoncés verbatim, exemples d’application compris (coquilles d’origine gardées et signalées dans la correction :
   « Invalid_arg », « remove_internal », « encode-rec »). Trois exercices sont retombés tels quels : une seule fiche,
   notée par le sujet qui a un corrigé officiel et une version anglaise :
   - assoc (nov. 2017 ex. 3 = avr. 2019 ex. 3) : p2019d-ex3 ;
   - for_all2 et almost (nov. 2017 ex. 4 ≈ oct. 2019 ex. 4) : p2019-ex4 ;
   - insert_nth (oct. 2018 ex. 4 = nov. 2020 ex. 3) : p2018-ex4.
   Tout le code est exécuté avec OCaml 4.14 : chaque bloc repl() est la transcription exacte de la boucle
   d’interaction (« # phrase ;; » puis la réponse de Caml, sans les lignes « Line 1, characters … »).
   Les blocs de code sont dans window.CAML_ML (clé « <id>.<nom> »), partagés avec data/en/caml/ex-annales.js :
   le code est le même dans les deux langues. Rendu : assets/js/caml.js (<pre data-ml-repl>, <pre data-ml>,
   <code class="ml">, <code data-ml-ans>). Champs : ceux des autres matières (intro, questions, hints, solution
   [{ t, html }], answer, traps, grading, official, note). */
(function () {
  var X = window.CAML_EX = window.CAML_EX || [];
  var M = window.CAML_ML = window.CAML_ML || {};
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function lines(a) { return esc(Array.prototype.slice.call(a).join('\n')); }
  /* boucle d’interaction : « # phrase ;; » (lignes suivantes décalées de deux espaces) puis la réponse de Caml */
  function repl() { return '<pre data-ml-repl>' + lines(arguments) + '</pre>'; }
  /* code seul */
  function ml() { return '<pre data-ml>' + lines(arguments) + '</pre>'; }

  var NOTE_REDIGE = 'Pas de corrigé officiel : correction rédigée, exécutée avec OCaml 4.14.';
  var NOTE_EXEC = 'Code exécuté avec OCaml 4.14.';

  /* =====================================================================
     Partiel du 30 octobre 2024 (promo 2029), épreuve Caml sur 20, 1 h 30
     ===================================================================== */
  M['p2024-ex1.ex'] = repl(
    '# check_list 2 [[1; 2]; [4]; [5; 6]];;',
    '- : bool = true',
    '# check_list 3 [[1; 2; 3]; [4; 5; 6; 7]; [8; 9; 10]];;',
    '- : bool = false',
    '# check_list 1 [[]; [2]; [3]];;',
    '- : bool = true',
    '# check_list (-1) [[1]; [2]; []];;',
    'Exception: Invalid_argument "check_list: k < 0".');
  M['p2024-ex1.sol'] = repl(
    '# let check_list k lst =',
    '    if k < 0 then',
    '      invalid_arg "check_list: k < 0"',
    '    else',
    '      let rec short_enough n = function',
    '          [] -> true',
    '        | _ :: l -> n > 0 && short_enough (n-1) l',
    '      in',
    '      let rec check = function',
    '          [] -> true',
    '        | l :: others -> short_enough k l && check others',
    '      in',
    '        check lst ;;',
    "val check_list : int -> 'a list list -> bool = <fun>");
  M['p2024-ex1.chk'] = repl(
    '# check_list 2 [[1; 2]; [4]; [5; 6]] ;;',
    '- : bool = true',
    '# check_list 3 [[1; 2; 3]; [4; 5; 6; 7]; [8; 9; 10]] ;;',
    '- : bool = false',
    '# check_list 1 [[]; [2]; [3]] ;;',
    '- : bool = true',
    '# check_list (-1) [[1]; [2]; []] ;;',
    'Exception: Invalid_argument "check_list: k < 0".',
    '# check_list 0 [[]; []] ;;',
    '- : bool = true',
    '# check_list 0 [[]; [1]] ;;',
    '- : bool = false',
    '# check_list (-1) [] ;;',
    'Exception: Invalid_argument "check_list: k < 0".');
  X.push({
    id: 'p2024-ex1', exam: 'p2024', kind: 'partiel', order: 1, src: 'Partiel oct. 2024 · Ex 1',
    title: 'Vérification liste de listes : check_list', pts: 7, topics: ['listes', 'exceptions', 'accumulateur'], lvl: 2, time: 18,
    intro: '<p>Écrire la fonction <code class="ml">check_list k lst</code> qui prend en paramètres :</p><ul><li>un entier <code class="ml">k</code></li><li>une liste de listes <code class="ml">lst</code></li></ul><p>et qui vérifie si la liste de listes <code class="ml">lst</code> contient uniquement des listes de longueur ≤ <code class="ml">k</code>.</p><p>La fonction devra déclencher une exception <code class="ml">Invalid_argument</code> si le paramètre <code class="ml">k</code> est &lt; 0.</p><p>Rappel : les seules fonctions que vous pouvez utiliser sont <code class="ml">failwith</code> et <code class="ml">invalid_arg</code> (aucune autre fonction prédéfinie de Caml).</p>' + M['p2024-ex1.ex'],
    hints: [
      'Le test sur <code class="ml">k</code> porte sur un paramètre : fais-le une seule fois, dans une fonction chapeau, avant tout parcours. Que doit répondre <code class="ml">check_list (-1) []</code> ?',
      'Pas de <code class="ml">List.length</code> : pour savoir si une sous-liste a au plus <code class="ml">k</code> éléments, avance dans la sous-liste en faisant descendre un compteur, et réponds <code class="ml">false</code> dès qu’il ne reste plus de place.',
      'Il faut deux fonctions récursives locales : l’une vérifie une sous-liste (cas <code class="ml">[]</code> et <code class="ml">_ :: l</code>), l’autre parcourt la liste de listes (cas <code class="ml">[]</code> et <code class="ml">l :: others</code>) et s’arrête au premier <code class="ml">false</code> grâce à <code class="ml">&amp;&amp;</code>.'],
    solution: [
      { t: 'Le principe', html: '<p>Deux parcours imbriqués : la liste de listes, puis chaque sous-liste. On ne calcule pas de longueur : <code class="ml">List.length</code> est interdite, et compter une longue sous-liste en entier est inutile. On descend un compteur <code class="ml">n</code> (au départ <code class="ml">k</code>) en avançant dans la sous-liste : si elle se termine, elle est assez courte ; s’il reste un élément alors que <code class="ml">n</code> vaut 0, elle est trop longue.</p><p>L’exception porte sur un paramètre : elle se teste une seule fois, dans la fonction chapeau, avant le parcours. Ainsi <code class="ml">check_list (-1) []</code> déclenche bien l’exception.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">short_enough n l</code> (la sous-liste <code class="ml">l</code> a au plus <code class="ml">n</code> éléments) : <code class="ml">[]</code> → <code class="ml">true</code> ; <code class="ml">_ :: l</code> → il faut <code class="ml">n &gt; 0</code>, puis <code class="ml">short_enough (n-1) l</code>. Écrit <code class="ml">n &gt; 0 &amp;&amp; short_enough (n-1) l</code>, l’appel récursif n’est pas évalué si <code class="ml">n &gt; 0</code> est faux : on s’arrête dès que la réponse est connue.</li><li><code class="ml">check</code> sur la liste de listes : <code class="ml">[]</code> → <code class="ml">true</code> (aucune sous-liste trop longue) ; <code class="ml">l :: others</code> → <code class="ml">short_enough k l &amp;&amp; check others</code>. Le premier <code class="ml">false</code> arrête tout.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: M['p2024-ex1.sol'] + '<p>La sous-liste n’est jamais parcourue plus loin que <code class="ml">k + 1</code> éléments.</p>' },
      { t: 'Vérifier sur les exemples', html: '<p>Les quatre exemples du sujet, puis trois cas limites : <code class="ml">k = 0</code> n’accepte que des sous-listes vides, et le test de <code class="ml">k</code> passe avant le parcours, même sur une liste vide.</p>' + M['p2024-ex1.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val check_list : int -&gt; \'a list list -&gt; bool = &lt;fun&gt;</code>.</p><p>À vérifier sur ta copie : l’exception testée une fois, avant le parcours ; aucune fonction prédéfinie ; l’arrêt dès qu’une sous-liste est trop longue.</p>',
    traps: [
      'Appeler <code class="ml">List.length</code> : c’est une fonction prédéfinie, donc interdite. Écrire ta propre fonction de longueur est permis (en la documentant), mais elle parcourt toute la sous-liste alors que <code class="ml">k + 1</code> éléments suffisent pour conclure.',
      'Tester <code class="ml">k &lt; 0</code> dans la fonction récursive : le test est refait à chaque appel, et <code class="ml">check_list (-1) []</code> risque de répondre <code class="ml">true</code> au lieu de l’exception.',
      'Confondre ≤ et &lt; : une sous-liste de longueur exactement <code class="ml">k</code> est acceptée (<code class="ml">check_list 2 [[1; 2]; [4]; [5; 6]]</code> → <code class="ml">true</code>).',
      'Oublier qu’une sous-liste vide est valide : <code class="ml">check_list 1 [[]; [2]; [3]]</code> → <code class="ml">true</code>.',
      'Écrire <code class="ml">check_list -1 …</code> sans parenthèses : Caml lit une soustraction. Les exemples écrivent <code class="ml">(-1)</code>.'],
    grading: '7 points pour l’exercice, sans détail. La réponse de Caml fait partie de la note (en-tête du sujet).',
    official: false, note: NOTE_REDIGE
  });

  M['p2024-ex2.ex1'] = repl(
    '# insert_x 3 (function x -> function y -> x < y) [];;',
    '- : int list = [3]',
    '# insert_x 7 (function x -> function y -> x < y) [1; 3; 5; 9];;',
    '- : int list = [1; 3; 5; 7; 9]',
    '# insert_x 5 (function x -> function y -> x > y) [10; 8; 6; 4; 2];;',
    '- : int list = [10; 8; 6; 5; 4; 2]',
    "# insert_x 'c' (function x -> function y -> x < y) ['d'; 'e'];;",
    "- : char list = ['c'; 'd'; 'e']",
    "# insert_x 'c' (function x -> function y -> x > y) ['e'];;",
    "- : char list = ['e'; 'c']");
  M['p2024-ex2.ex2'] = repl(
    '# insertion_sort (function x -> function y -> x > y) [];;',
    "- : 'a list = []",
    '# insertion_sort (function x -> function y -> x < y) [5; 3; 8; 1; 4];;',
    '- : int list = [1; 3; 4; 5; 8]',
    '# insertion_sort (function x -> function y -> x > y) [10; 20; 15; 5; 30];;',
    '- : int list = [30; 20; 15; 10; 5]',
    "# insertion_sort (function x -> function y -> x < y) ['d'; 'a'; 'c'; 'b'; 'e'];;",
    "- : char list = ['a'; 'b'; 'c'; 'd'; 'e']",
    '# insertion_sort (function x -> function y -> x < y) [1.1; 3.3; 2.2; 5.5; 4.4];;',
    '- : float list = [1.1; 2.2; 3.3; 4.4; 5.5]');
  M['p2024-ex2.sol'] = repl(
    '# let rec insert_x x order = function',
    '      [] -> [x]',
    '    | e :: l ->',
    '        if order x e then',
    '          x :: e :: l',
    '        else',
    '          e :: insert_x x order l ;;',
    "val insert_x : 'a -> ('a -> 'a -> bool) -> 'a list -> 'a list = <fun>",
    '# let rec insertion_sort order = function',
    '      [] -> []',
    '    | e :: l -> insert_x e order (insertion_sort order l) ;;',
    "val insertion_sort : ('a -> 'a -> bool) -> 'a list -> 'a list = <fun>");
  M['p2024-ex2.chk'] = repl(
    '# insert_x 7 (function x -> function y -> x < y) [1; 3; 5; 9] ;;',
    '- : int list = [1; 3; 5; 7; 9]',
    "# insert_x 'c' (function x -> function y -> x > y) ['e'] ;;",
    "- : char list = ['e'; 'c']",
    '# insert_x 5 (function x -> function y -> x < y) [1; 5; 9] ;;',
    '- : int list = [1; 5; 5; 9]',
    '# insertion_sort (function x -> function y -> x > y) [] ;;',
    "- : 'a list = []",
    '# insertion_sort (function x -> function y -> x < y) [5; 3; 8; 1; 4] ;;',
    '- : int list = [1; 3; 4; 5; 8]',
    '# insertion_sort (function x -> function y -> x < y) [1.1; 3.3; 2.2; 5.5; 4.4] ;;',
    '- : float list = [1.1; 2.2; 3.3; 4.4; 5.5]',
    '# insertion_sort (function x -> function y -> x < y) [3; 1; 3; 2] ;;',
    '- : int list = [1; 2; 3; 3]');
  M['p2024-ex2.trace'] = ml(
    'insertion_sort o [5; 3; 8]',
    '= insert_x 5 o (insertion_sort o [3; 8])',
    '= insert_x 5 o (insert_x 3 o (insertion_sort o [8]))',
    '= insert_x 5 o (insert_x 3 o (insert_x 8 o (insertion_sort o [])))',
    '= insert_x 5 o (insert_x 3 o (insert_x 8 o []))',
    '= insert_x 5 o (insert_x 3 o [8])',
    '= insert_x 5 o [3; 8]',
    '= 3 :: insert_x 5 o [8]',
    '= 3 :: 5 :: 8 :: []',
    '= [3; 5; 8]');
  X.push({
    id: 'p2024-ex2', exam: 'p2024', kind: 'partiel', order: 2, src: 'Partiel oct. 2024 · Ex 2',
    title: 'Tri insertion : insert_x, puis insertion_sort', pts: 9, topics: ['listes', 'ordre-superieur', 'listes-triees', 'construire', 'recursivite'], lvl: 2, time: 22,
    questions: [
      '<b>1.</b> Écrire la fonction <code class="ml">insert_x x order lst</code> qui prend en paramètres :<ul><li>un élément <code class="ml">x</code></li><li>une fonction à deux paramètres <code class="ml">order</code> retournant une valeur booléenne</li><li>une liste <code class="ml">lst</code> triée selon l’ordre induit par la fonction <code class="ml">order</code></li></ul>et qui insère l’élément <code class="ml">x</code> dans la liste <code class="ml">lst</code> triée selon l’ordre induit par la fonction <code class="ml">order</code>.' + M['p2024-ex2.ex1'],
      '<b>2.</b> Écrire la fonction <code class="ml">insertion_sort order lst</code> qui prend en paramètres :<ul><li>une liste <code class="ml">lst</code></li><li>une fonction à deux paramètres <code class="ml">order</code> retournant une valeur booléenne</li></ul>et qui trie la liste <code class="ml">lst</code> selon l’ordre induit par la fonction <code class="ml">order</code>. La fonction doit utiliser la fonction précédente <code class="ml">insert_x x order lst</code>.' + M['p2024-ex2.ex2']],
    hints: [
      '<code class="ml">order</code> s’utilise comme une fonction ordinaire : <code class="ml">order x e</code> vaut <code class="ml">true</code> quand <code class="ml">x</code> doit passer avant <code class="ml">e</code>. Les exemples l’emploient avec <code class="ml">x &lt; y</code> (ordre croissant) et <code class="ml">x &gt; y</code> (ordre décroissant).',
      'Pour <code class="ml">insert_x</code> : parcours la liste triée. Si <code class="ml">order x e</code> est vrai, <code class="ml">x</code> se place devant <code class="ml">e</code> et la suite ne change pas ; sinon <code class="ml">e</code> reste devant et on insère plus loin. Et si la liste est vide ?',
      'Pour <code class="ml">insertion_sort</code> : trie d’abord la queue de la liste (appel récursif), puis insère la tête dans ce résultat avec <code class="ml">insert_x</code>. Attention à l’ordre des paramètres : <code class="ml">insert_x x order lst</code>, mais <code class="ml">insertion_sort order lst</code>.'],
    solution: [
      { t: 'Le principe de insert_x', html: '<p>La liste est déjà triée selon <code class="ml">order</code>. On la parcourt depuis le début et on s’arrête dès que <code class="ml">x</code> peut se placer devant l’élément courant <code class="ml">e</code>, c’est-à-dire dès que <code class="ml">order x e</code> est vrai : la suite est déjà triée, on la garde telle quelle. Sinon, <code class="ml">e</code> reste devant et on insère <code class="ml">x</code> plus loin.</p><ul><li><code class="ml">[]</code> → <code class="ml">[x]</code> : fin de liste atteinte, ou liste vide au départ (<code class="ml">insert_x 3 … []</code> → <code class="ml">[3]</code>).</li><li><code class="ml">e :: l</code> avec <code class="ml">order x e</code> → <code class="ml">x :: e :: l</code>.</li><li><code class="ml">e :: l</code> sinon → <code class="ml">e :: insert_x x order l</code>.</li></ul>' },
      { t: 'Le principe de insertion_sort', html: '<p>Raisonnement récursif sur la liste à trier : la liste vide est triée ; pour <code class="ml">e :: l</code>, on trie <code class="ml">l</code> (on suppose que l’appel récursif est juste), puis on insère <code class="ml">e</code> à sa place dans ce résultat avec <code class="ml">insert_x</code>. C’est ce que demande « doit utiliser la fonction précédente ».</p><p>Aucune exception : l’énoncé n’en demande pas. Et rien ne suppose le type des éléments : les exemples trient des <code class="ml">int</code>, des <code class="ml">char</code> et des <code class="ml">float</code>.</p>' },
      { t: 'Le code et la réponse de Caml', html: M['p2024-ex2.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Quelques exemples du sujet, puis deux cas limites : un élément égal (<code class="ml">5</code> dans <code class="ml">[1; 5; 9]</code>) et des doublons.</p>' + M['p2024-ex2.chk'] },
      { t: 'Dérouler un tri', html: '<p>Avec <code class="ml">o</code> la fonction <code class="ml">function x -&gt; function y -&gt; x &lt; y</code> : les appels récursifs descendent jusqu’à la liste vide, puis les insertions se font en remontant, de la fin de la liste vers le début.</p>' + M['p2024-ex2.trace'] },
      { t: 'Déjà tombé', html: '<p>Le même exercice était au contrôle S1# d’avril 2019 (<a href="#p2019d-ex2">voir la fiche</a>), avec la fonction de comparaison en <b>dernier</b> paramètre : <code class="ml">insert x list comp</code>. Lis toujours l’ordre des paramètres dans l’énoncé et les exemples.</p>' }],
    answer: '<p>Deux fonctions, dans cet ordre, chacune suivie de sa réponse de Caml :</p><ul><li><code data-ml-ans>val insert_x : \'a -&gt; (\'a -&gt; \'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>val insertion_sort : (\'a -&gt; \'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li></ul>',
    traps: [
      'Inverser l’ordre des paramètres : <code class="ml">insert_x x order lst</code>, mais <code class="ml">insertion_sort order lst</code>. Les exemples les appellent dans cet ordre.',
      'Écrire <code class="ml">x &lt; e</code> au lieu de <code class="ml">order x e</code> : le tri ne marche plus que dans l’ordre croissant, et les exemples en <code class="ml">x &gt; y</code> sont faux.',
      'Oublier le cas <code class="ml">[]</code> de <code class="ml">insert_x</code> : <code class="ml">insert_x 3 … []</code> doit rendre <code class="ml">[3]</code>, et sans ce cas Caml affiche un Warning 8.',
      'Continuer le parcours après avoir placé <code class="ml">x</code> : la suite est déjà triée, on la garde telle quelle.',
      'Réécrire une insertion dans <code class="ml">insertion_sort</code> au lieu d’appeler <code class="ml">insert_x</code> : l’énoncé impose de l’utiliser.'],
    grading: '9 points pour l’exercice ; le partage entre les deux questions n’est pas indiqué.',
    official: false, note: NOTE_REDIGE
  });

  M['p2024-ex3.fn'] = ml(
    'let mystery lst =',
    '  let rec tmp lst acc switch = match (lst, switch) with',
    '       ([], true) -> tmp [] acc false',
    '     | ([], false) -> (match acc with',
    '                         [] -> []',
    '                       | h :: acc -> h :: tmp lst acc true)',
    '     | (h :: t, true) -> h :: tmp t (h :: acc) true',
    '  in',
    '     tmp lst [] true ;;');
  M['p2024-ex3.q'] = repl(
    '# mystery [1; 2; 8; 2; 1];;',
    '# mystery ["a"; "b"; "c"; "d"; "e"; "f"];;');
  M['p2024-ex3.def'] = repl(
    '# let mystery lst =',
    '    let rec tmp lst acc switch = match (lst, switch) with',
    '         ([], true) -> tmp [] acc false',
    '       | ([], false) -> (match acc with',
    '                           [] -> []',
    '                         | h :: acc -> h :: tmp lst acc true)',
    '       | (h :: t, true) -> h :: tmp t (h :: acc) true',
    '    in',
    '       tmp lst [] true ;;',
    'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
    'Here is an example of a case that is not matched:',
    '(_::_, false)',
    "val mystery : 'a list -> 'a list = <fun>");
  M['p2024-ex3.trace'] = ml(
    'mystery [1; 2]',
    '= tmp [1; 2] [] true',
    '= 1 :: tmp [2] [1] true',
    '= 1 :: 2 :: tmp [] [2; 1] true',
    '= 1 :: 2 :: tmp [] [2; 1] false',
    '= 1 :: 2 :: 2 :: tmp [] [1] true',
    '= 1 :: 2 :: 2 :: tmp [] [1] false',
    '= 1 :: 2 :: 2 :: 1 :: tmp [] [] true',
    '= 1 :: 2 :: 2 :: 1 :: tmp [] [] false',
    '= 1 :: 2 :: 2 :: 1 :: []',
    '= [1; 2; 2; 1]');
  M['p2024-ex3.evals'] = repl(
    '# mystery [1; 2] ;;',
    '- : int list = [1; 2; 2; 1]',
    '# mystery [1; 2; 8; 2; 1];;',
    '- : int list = [1; 2; 8; 2; 1; 1; 2; 8; 2; 1]',
    '# mystery ["a"; "b"; "c"; "d"; "e"; "f"];;',
    '- : string list =',
    '["a"; "b"; "c"; "d"; "e"; "f"; "f"; "e"; "d"; "c"; "b"; "a"]');
  X.push({
    id: 'p2024-ex3', exam: 'p2024', kind: 'partiel', order: 3, src: 'Partiel oct. 2024 · Ex 3',
    title: 'Mystery : un accumulateur et un interrupteur', pts: 4, topics: ['listes', 'mystery', 'evaluation', 'accumulateur'], lvl: 2, time: 10,
    intro: '<p>Soit la fonction mystery définie ci-dessous</p>' + M['p2024-ex3.fn'],
    questions: [
      '<b>1.</b> Donner le type de la fonction mystery.',
      '<b>2.</b> Donner les résultats des évaluations successives des phrases suivantes.' + M['p2024-ex3.q']],
    hints: [
      'Repère le rôle de chaque paramètre de <code class="ml">tmp</code> : <code class="ml">lst</code> (ce qui reste à lire), <code class="ml">acc</code> (une pile), <code class="ml">switch</code> (un booléen qui dit dans quelle phase on est).',
      'Phase <code class="ml">switch = true</code> : chaque élément lu est mis dans le résultat <em>et</em> empilé dans <code class="ml">acc</code>. Dans quel ordre sont les éléments dans <code class="ml">acc</code> à la fin de la lecture ?',
      'Phase <code class="ml">switch = false</code> : on dépile <code class="ml">acc</code> un élément à la fois. Déroule <code class="ml">mystery [1; 2]</code> à la main avant les phrases du sujet.'],
    solution: [
      { t: 'Le type', html: '<p><code class="ml">lst</code> est filtrée avec <code class="ml">[]</code> et <code class="ml">h :: t</code> : c’est une liste, de type <code class="ml">\'a list</code> (rien n’impose le type des éléments). Le résultat est construit avec <code class="ml">[]</code> et <code class="ml">h :: …</code> à partir des éléments de <code class="ml">lst</code> : <code class="ml">\'a list</code> aussi. <code class="ml">acc</code> et <code class="ml">switch</code> sont des paramètres de <code class="ml">tmp</code>, pas de <code class="ml">mystery</code>.</p><p>Caml affiche d’abord un avertissement : le cas <code class="ml">(h :: t, false)</code> n’est pas écrit. Il n’arrive jamais (<code class="ml">switch</code> ne passe à <code class="ml">false</code> que quand la liste est vide), mais Caml ne peut pas le savoir.</p>' + M['p2024-ex3.def'] },
      { t: 'Les deux phases', html: '<p>Tant que <code class="ml">switch</code> vaut <code class="ml">true</code>, chaque élément <code class="ml">h</code> est mis dans le résultat (<code class="ml">h :: …</code>) et empilé dans <code class="ml">acc</code> (<code class="ml">h :: acc</code>) : à la fin de la lecture, <code class="ml">acc</code> contient les éléments du dernier au premier. Quand <code class="ml">lst</code> est vide, <code class="ml">switch</code> passe à <code class="ml">false</code> : on sort la tête de <code class="ml">acc</code>, on la met dans le résultat, et on rappelle <code class="ml">tmp</code> avec <code class="ml">switch = true</code> sur une liste vide, ce qui repasse aussitôt à <code class="ml">false</code>. On vide ainsi <code class="ml">acc</code>, du dernier élément lu au premier.</p>' },
      { t: 'Trace de mystery [1; 2]', html: M['p2024-ex3.trace'] },
      { t: 'Les évaluations', html: '<p><code class="ml">mystery lst</code> rend la liste suivie de son miroir. Le premier exemple est un palindrome : son miroir est lui-même, d’où la liste répétée. Caml coupe la seconde réponse en deux lignes, car elle est longue.</p>' + M['p2024-ex3.evals'] }],
    answer: '<ol><li><code data-ml-ans>val mystery : \'a list -&gt; \'a list = &lt;fun&gt;</code> (précédé d’un Warning 8 : le cas <code class="ml">(_::_, false)</code> n’est pas traité).</li><li>(a) <code data-ml-ans>- : int list = [1; 2; 8; 2; 1; 1; 2; 8; 2; 1]</code><br>(b) <code data-ml-ans>- : string list = ["a"; "b"; "c"; "d"; "e"; "f"; "f"; "e"; "d"; "c"; "b"; "a"]</code></li></ol><p>mystery rend la liste suivie de son miroir.</p>',
    traps: [
      'Donner à mystery trois paramètres (<code class="ml">\'a list -&gt; \'a list -&gt; bool -&gt; …</code>) : <code class="ml">acc</code> et <code class="ml">switch</code> appartiennent à <code class="ml">tmp</code> ; mystery n’en a qu’un.',
      'Croire que le résultat est seulement le miroir : les éléments sont aussi recopiés pendant la lecture (<code class="ml">h :: tmp t (h :: acc) true</code>).',
      'Être surpris par (a) : le miroir de <code class="ml">[1; 2; 8; 2; 1]</code> est la même liste, le résultat la répète.',
      'Écrire <code class="ml">int list -&gt; int list</code> : rien n’impose des entiers, c’est <code class="ml">\'a list -&gt; \'a list</code>.'],
    grading: '4 points pour l’exercice (type et deux évaluations), sans détail.',
    official: false, note: NOTE_REDIGE
  });


  /* =====================================================================
     Partiel du 30 octobre 2023 (promo 2028), épreuve Caml sur 20
     ===================================================================== */
  M['p2023-ex1.ex'] = repl(
    '# insert_mult 0 1 [1; 2; 3; 4; 5];;',
    'Exception: Invalid_argument "insert_mult: n must be > 0".',
    '# insert_mult 4 42 [10; 20; 30; 40];;',
    '- : int list = [10; 20; 30; 40; 42]',
    '# insert_mult 2 0 [1; 2; 3; 4; 5];;',
    '- : int list = [1; 2; 0; 3; 4; 0; 5]',
    "# insert_mult 3 'x' ['a'; 'b'; 'c'; 'd'; 'e'; 'f'; 'g'];;",
    "- : char list = ['a'; 'b'; 'c'; 'x'; 'd'; 'e'; 'f'; 'x'; 'g']",
    '# insert_mult 1 42 [];;',
    '- : int list = []',
    '# insert_mult 1 42 [10];;',
    '- : int list = [10; 42]');
  M['p2023-ex1.sol'] = repl(
    '# let insert_mult n x lst =',
    '    if n <= 0 then',
    '      invalid_arg "insert_mult: n must be > 0"',
    '    else',
    '      let rec insert k = function',
    '          [] -> []',
    '        | e :: l ->',
    '            if k = 1 then',
    '              e :: x :: insert n l',
    '            else',
    '              e :: insert (k-1) l',
    '      in',
    '        insert n lst ;;',
    "val insert_mult : int -> 'a -> 'a list -> 'a list = <fun>");
  M['p2023-ex1.chk'] = repl(
    '# insert_mult 0 1 [1; 2; 3; 4; 5] ;;',
    'Exception: Invalid_argument "insert_mult: n must be > 0".',
    '# insert_mult 4 42 [10; 20; 30; 40] ;;',
    '- : int list = [10; 20; 30; 40; 42]',
    '# insert_mult 2 0 [1; 2; 3; 4; 5] ;;',
    '- : int list = [1; 2; 0; 3; 4; 0; 5]',
    "# insert_mult 3 'x' ['a'; 'b'; 'c'; 'd'; 'e'; 'f'; 'g'] ;;",
    "- : char list = ['a'; 'b'; 'c'; 'x'; 'd'; 'e'; 'f'; 'x'; 'g']",
    '# insert_mult 1 42 [] ;;',
    '- : int list = []',
    '# insert_mult 1 42 [10] ;;',
    '- : int list = [10; 42]',
    '# insert_mult 2 0 [1; 2; 3; 4] ;;',
    '- : int list = [1; 2; 0; 3; 4; 0]',
    '# insert_mult (-3) 0 [] ;;',
    'Exception: Invalid_argument "insert_mult: n must be > 0".');
  M['p2023-ex1.copy'] = repl(
    '# let insert_mult n x lst =',
    '    if n <= 0 then',
    '      invalid_arg "insert_mult: n must be > 0"',
    '    else',
    '      let rec aux count = function',
    '        | list when count = 0 -> x :: aux n list',
    '        | [] -> []',
    '        | h :: t -> h :: aux (count-1) t',
    '      in',
    '        aux n lst ;;',
    "val insert_mult : int -> 'a -> 'a list -> 'a list = <fun>",
    '# insert_mult 2 0 [1; 2; 3; 4; 5] ;;',
    '- : int list = [1; 2; 0; 3; 4; 0; 5]');
  X.push({
    id: 'p2023-ex1', exam: 'p2023', kind: 'partiel', order: 1, src: 'Partiel oct. 2023 · Ex 1',
    title: 'Insertion multiple : insert_mult', pts: 6.5, topics: ['listes', 'construire', 'exceptions', 'accumulateur', 'rangs'], lvl: 2, time: 15,
    intro: '<p>Écrire la fonction <code class="ml">insert_mult n x lst</code> qui prend en paramètres :</p><ul><li>un entier <code class="ml">n</code></li><li>un élément <code class="ml">x</code></li><li>une liste <code class="ml">lst</code></li></ul><p>et qui insère l’élément <code class="ml">x</code> dans la liste <code class="ml">lst</code> après chaque groupe de <code class="ml">n</code> éléments.</p><p>La fonction devra déclencher une exception <code class="ml">Invalid_argument</code> si le paramètre <code class="ml">n</code> est négatif ou nul.</p>' + M['p2023-ex1.ex'],
    hints: [
      'Le test sur <code class="ml">n</code> porte sur un paramètre : fais-le une seule fois, dans une fonction chapeau, avant le parcours.',
      'Donne un compteur à la fonction récursive locale : combien d’éléments reste-t-il à recopier avant d’insérer <code class="ml">x</code> ? Il part de <code class="ml">n</code>.',
      'Quand le compteur vaut 1, l’élément courant ferme un groupe : recopie-le, ajoute <code class="ml">x</code>, puis repars avec un compteur remis à <code class="ml">n</code>. Regarde <code class="ml">insert_mult 4 42 [10; 20; 30; 40]</code> : un groupe complet en fin de liste est suivi de <code class="ml">x</code>.'],
    solution: [
      { t: 'Le principe', html: '<p>Une fonction chapeau teste <code class="ml">n</code> une seule fois, puis lance une fonction récursive locale <code class="ml">insert k lst</code>. Son paramètre supplémentaire <code class="ml">k</code> est le nombre d’éléments qu’il reste à recopier avant la prochaine insertion : il part de <code class="ml">n</code>, descend de 1 à chaque élément, et revient à <code class="ml">n</code> après chaque insertion. <code class="ml">x</code> et <code class="ml">n</code> restent visibles dans la fonction locale : inutile de les repasser.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">[]</code> → <code class="ml">[]</code> : plus rien à recopier (un dernier groupe incomplet n’est pas suivi de <code class="ml">x</code>, et <code class="ml">insert_mult 1 42 []</code> → <code class="ml">[]</code>).</li><li><code class="ml">e :: l</code> avec <code class="ml">k = 1</code> : <code class="ml">e</code> ferme un groupe → <code class="ml">e :: x :: insert n l</code>.</li><li><code class="ml">e :: l</code> sinon → <code class="ml">e :: insert (k-1) l</code>.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: M['p2023-ex1.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les six exemples du sujet, puis deux cas limites : un groupe complet en fin de liste est suivi de <code class="ml">x</code>, et le test de <code class="ml">n</code> passe avant tout, même sur une liste vide.</p>' + M['p2023-ex1.chk'] },
      { t: 'La copie notée 6,5 / 6,5', html: '<p>La copie des annales compte jusqu’à 0 au lieu de 1 : quand le compteur vaut 0, elle insère <code class="ml">x</code> avant de regarder la liste. Le cas gardé est placé en premier, si bien qu’un groupe complet en fin de liste est aussi suivi de <code class="ml">x</code>. Même type, mêmes six résultats : elle a eu tous les points. Sur ta copie, ne présente qu’une version (en-tête du sujet).</p>' + M['p2023-ex1.copy'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val insert_mult : int -&gt; \'a -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Tester <code class="ml">n &lt;= 0</code> dans la fonction récursive : le test est refait à chaque élément.',
      'Oublier <code class="ml">x</code> après un dernier groupe complet : <code class="ml">insert_mult 4 42 [10; 20; 30; 40]</code> → <code class="ml">[10; 20; 30; 40; 42]</code>.',
      'Ajouter <code class="ml">x</code> après un dernier groupe incomplet : <code class="ml">insert_mult 2 0 [1; 2; 3; 4; 5]</code> se termine par <code class="ml">5</code>, sans <code class="ml">0</code>.',
      'Oublier de remettre le compteur à <code class="ml">n</code> après une insertion : <code class="ml">x</code> ne serait inséré qu’une fois.',
      'Écrire <code class="ml">failwith</code> : l’exemple attend <code class="ml">Invalid_argument</code>, avec son message.'],
    grading: '6,5 points pour l’exercice ; la copie des annales a eu 6,5 / 6,5.',
    official: false, note: 'Pas de corrigé officiel : correction rédigée et exécutée avec OCaml 4.14. Les annales contiennent une copie d’élève notée 18/20, citée dans la correction.'
  });

  M['p2023-ex2.ex1'] = repl(
    '# remove_x 1 [];;',
    '- : int list = []',
    '# remove_x "apple" ["banana"; "apple"; "cherry"; "date"; "apple"];;',
    '- : string list = ["banana"; "cherry"; "date"]',
    '# remove_x 5 [5; 5; 2; 3; 5; 1];;',
    '- : int list = [2; 3; 1]',
    '# remove_x true [true; false; true; false; true];;',
    '- : bool list = [false; false]',
    "# remove_x 'a' ['a'; 'b'; 'a'; 'c'; 'd'];;",
    "- : char list = ['b'; 'c'; 'd']");
  M['p2023-ex2.ex2'] = repl(
    '# remove_duplicates [3; 1; 2; 2; 3; 1; 4; 5; 5];;',
    '- : int list = [3; 1; 2; 4; 5]',
    '# remove_duplicates ["cherry"; "banana"; "apple"; "apple"; "banana"; "cherry"];;',
    '- : string list = ["cherry"; "banana"; "apple"]',
    '# remove_duplicates [42; 13; 42; 7; 7; 13; 42; 42];;',
    '- : int list = [42; 13; 7]',
    '# remove_duplicates ["dog"; "cat"; "dog"; "rat"; "rat"; "bat"];;',
    '- : string list = ["dog"; "cat"; "rat"; "bat"]',
    '# remove_duplicates [true; true; false; true; false; true; false];;',
    '- : bool list = [true; false]');
  M['p2023-ex2.sol'] = repl(
    '# let rec remove_x x = function',
    '      [] -> []',
    '    | e :: l ->',
    '        if e = x then',
    '          remove_x x l',
    '        else',
    '          e :: remove_x x l ;;',
    "val remove_x : 'a -> 'a list -> 'a list = <fun>",
    '# let rec remove_duplicates = function',
    '      [] -> []',
    '    | e :: l -> e :: remove_duplicates (remove_x e l) ;;',
    "val remove_duplicates : 'a list -> 'a list = <fun>");
  M['p2023-ex2.chk'] = repl(
    '# remove_x 5 [5; 5; 2; 3; 5; 1] ;;',
    '- : int list = [2; 3; 1]',
    "# remove_x 'a' ['a'; 'b'; 'a'; 'c'; 'd'] ;;",
    "- : char list = ['b'; 'c'; 'd']",
    '# remove_duplicates [3; 1; 2; 2; 3; 1; 4; 5; 5] ;;',
    '- : int list = [3; 1; 2; 4; 5]',
    '# remove_duplicates [true; true; false; true; false; true; false] ;;',
    '- : bool list = [true; false]',
    '# remove_duplicates [] ;;',
    "- : 'a list = []");
  M['p2023-ex2.trace'] = ml(
    'remove_duplicates [3; 1; 3; 1]',
    '= 3 :: remove_duplicates (remove_x 3 [1; 3; 1])',
    '= 3 :: remove_duplicates [1; 1]',
    '= 3 :: 1 :: remove_duplicates (remove_x 1 [1])',
    '= 3 :: 1 :: remove_duplicates []',
    '= [3; 1]');
  X.push({
    id: 'p2023-ex2', exam: 'p2023', kind: 'partiel', order: 2, src: 'Partiel oct. 2023 · Ex 2',
    title: 'Suppression doublons : remove_x, puis remove_duplicates', pts: 5.5, topics: ['listes', 'construire', 'recursivite'], lvl: 1, time: 12,
    questions: [
      '<b>1.</b> Écrire la fonction <code class="ml">remove_x x lst</code> qui prend en paramètres :<ul><li>un élément <code class="ml">x</code></li><li>une liste <code class="ml">lst</code></li></ul>et qui supprime toutes les occurrences de l’élément <code class="ml">x</code> dans la liste <code class="ml">lst</code>.' + M['p2023-ex2.ex1'],
      '<b>2.</b> Écrire la fonction <code class="ml">remove_duplicates lst</code> qui prend en paramètre :<ul><li>une liste <code class="ml">lst</code></li></ul>et qui supprime tous les doublons de la liste <code class="ml">lst</code>. La fonction <b>doit</b> utiliser la fonction précédente <code class="ml">remove_x x lst</code>.' + M['p2023-ex2.ex2']],
    hints: [
      '<code class="ml">remove_x</code> parcourt toute la liste (il faut retirer toutes les occurrences) : deux cas, <code class="ml">[]</code> et <code class="ml">e :: l</code> ; dans le second, on garde <code class="ml">e</code> ou non.',
      'Pour <code class="ml">remove_duplicates</code>, regarde les exemples : c’est la première occurrence qui reste, à sa place (<code class="ml">[3; 1; 2; 2; 3; 1; 4; 5; 5]</code> → <code class="ml">[3; 1; 2; 4; 5]</code>).',
      'Garde la tête <code class="ml">e</code>, retire toutes ses autres occurrences de la queue avec <code class="ml">remove_x</code>, puis continue sur ce qui reste.'],
    solution: [
      { t: 'remove_x', html: '<p>Parcours complet : <code class="ml">[]</code> → <code class="ml">[]</code> ; <code class="ml">e :: l</code> → si <code class="ml">e = x</code>, on ne garde pas <code class="ml">e</code> et on continue (<code class="ml">remove_x x l</code>) ; sinon <code class="ml">e :: remove_x x l</code>. Aucune hypothèse sur le type : <code class="ml">=</code> compare des entiers, des chaînes, des booléens ou des caractères.</p>' },
      { t: 'remove_duplicates', html: '<p>Pour <code class="ml">e :: l</code>, <code class="ml">e</code> est la première occurrence de sa valeur : on la garde. Ses autres occurrences sont toutes dans <code class="ml">l</code> : <code class="ml">remove_x e l</code> les retire. On continue sur le résultat, qui ne contient plus <code class="ml">e</code>. La première occurrence de chaque valeur reste donc à sa place.</p>' + M['p2023-ex2.trace'] },
      { t: 'Le code et la réponse de Caml', html: M['p2023-ex2.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Quelques exemples du sujet et la liste vide : Caml répond <code class="ml">\'a list</code>, car rien n’indique le type des éléments.</p>' + M['p2023-ex2.chk'] }],
    answer: '<p>Deux fonctions, chacune suivie de sa réponse de Caml :</p><ul><li><code data-ml-ans>val remove_x : \'a -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>val remove_duplicates : \'a list -&gt; \'a list = &lt;fun&gt;</code></li></ul>',
    traps: [
      'Garder la dernière occurrence (« si <code class="ml">e</code> est encore dans la suite, on l’enlève ») : l’ordre change, <code class="ml">[3; 1; 2; 2; 3; 1; 4; 5; 5]</code> donnerait <code class="ml">[2; 3; 1; 4; 5]</code>.',
      'Ne pas utiliser <code class="ml">remove_x</code> dans <code class="ml">remove_duplicates</code> : l’énoncé l’impose (« doit »).',
      'Arrêter <code class="ml">remove_x</code> à la première occurrence trouvée : il faut toutes les retirer.',
      'Ajouter un cas <code class="ml">[e] -&gt; [e]</code> : inutile (la copie notée l’avait, sans perdre de point).'],
    grading: '5,5 points (la copie des annales a eu 5,5 / 5,5) ; une annotation de la copie, sans doute le barème annoncé pendant l’épreuve, donne 3 points à la question 2, donc 2,5 à la question 1.',
    official: false, note: 'Pas de corrigé officiel : correction rédigée et exécutée avec OCaml 4.14. Les annales contiennent une copie d’élève notée 18/20, citée dans la correction. C’est aussi l’exercice 3.4 du TD listes de cette année, avec les mêmes exemples.'
  });

  M['p2023-ex3.ex'] = repl(
    "# split (function x -> x = ',') [];;",
    '- : char list list = []',
    '# split (function x -> x = 3) [1; 2; 3; 4; 5];;',
    '- : int list list = [[1; 2]; [4; 5]]',
    '# split (function x -> x = 20) [10; 20; 30; 40; 50];;',
    '- : int list list = [[10]; [30; 40; 50]]',
    '# split (function x -> x = 0) [0; 1; 0; 2; 0; 3; 0; 4];;',
    '- : int list list = [[]; [1]; [2]; [3]; [4]]');
  M['p2023-ex3.sol'] = repl(
    '# let split sep lst =',
    '    let rec cut = function',
    '        [] -> ([], [])',
    '      | e :: l ->',
    '          let (current, others) = cut l in',
    '            if sep e then',
    '              ([], current :: others)',
    '            else',
    '              (e :: current, others)',
    '    in',
    '      match lst with',
    '          [] -> []',
    '        | _ -> let (current, others) = cut lst in current :: others ;;',
    "val split : ('a -> bool) -> 'a list -> 'a list list = <fun>");
  M['p2023-ex3.chk'] = repl(
    "# split (function x -> x = ',') [] ;;",
    '- : char list list = []',
    '# split (function x -> x = 3) [1; 2; 3; 4; 5] ;;',
    '- : int list list = [[1; 2]; [4; 5]]',
    '# split (function x -> x = 20) [10; 20; 30; 40; 50] ;;',
    '- : int list list = [[10]; [30; 40; 50]]',
    '# split (function x -> x = 0) [0; 1; 0; 2; 0; 3; 0; 4] ;;',
    '- : int list list = [[]; [1]; [2]; [3]; [4]]',
    '# split (function x -> x = 0) [1; 0] ;;',
    '- : int list list = [[1]; []]',
    '# split (function x -> x = 0) [1; 2] ;;',
    '- : int list list = [[1; 2]]');
  M['p2023-ex3.trace'] = ml(
    'cut [5]             = ([5], [])',
    'cut [4; 5]          = ([4; 5], [])',
    'cut [3; 4; 5]       = ([], [[4; 5]])        (* sep 3 *)',
    'cut [2; 3; 4; 5]    = ([2], [[4; 5]])',
    'cut [1; 2; 3; 4; 5] = ([1; 2], [[4; 5]])',
    'split ... = [1; 2] :: [[4; 5]] = [[1; 2]; [4; 5]]');
  X.push({
    id: 'p2023-ex3', exam: 'p2023', kind: 'partiel', order: 3, src: 'Partiel oct. 2023 · Ex 3',
    title: 'Split : couper une liste en sous-listes', pts: 8, topics: ['listes', 'construire', 'ordre-superieur', 'recursivite'], lvl: 3, time: 22,
    intro: '<p>Écrire la fonction <code class="ml">split sep lst</code> qui prend en paramètres :</p><ul><li>un prédicat à un paramètre <code class="ml">sep</code></li><li>une liste <code class="ml">lst</code></li></ul><p>et qui coupe la liste <code class="ml">lst</code> en sous-listes dès que le prédicat <code class="ml">sep</code> est vérifié sur un élément de <code class="ml">lst</code>. Les éléments de <code class="ml">lst</code> qui vérifient le prédicat <code class="ml">sep</code> ne font partie d’aucune sous-liste.</p><p><b>Si les sous-listes ne sont pas dans l’ordre initial, l’exercice sera noté sur un peu moins.</b> Parfois il vaut mieux moins de points que pas de points.</p>' + M['p2023-ex3.ex'],
    hints: [
      'Les exemples fixent les cas limites : <code class="ml">split … []</code> → <code class="ml">[]</code> (pas <code class="ml">[[]]</code>), et un séparateur en tête donne une première sous-liste vide (<code class="ml">[[]; [1]; …]</code>).',
      'Récursion pure : suppose que l’appel sur la queue <code class="ml">l</code> te rend déjà son découpage, sous la forme d’un couple (sous-liste en cours, sous-listes suivantes). Que faire de <code class="ml">e</code> selon que <code class="ml">sep e</code> est vrai ou faux ?',
      'Si <code class="ml">sep e</code> est vrai, la sous-liste en cours est terminée : elle passe devant les suivantes, et une sous-liste vide commence. Sinon, <code class="ml">e</code> s’ajoute en tête de la sous-liste en cours. Une fonction chapeau traite la liste vide puis reforme la liste de listes.'],
    solution: [
      { t: 'Le principe', html: '<p>La fonction récursive <code class="ml">cut</code> rend un couple <code class="ml">(current, others)</code> : <code class="ml">current</code> est la première sous-liste (les éléments avant le premier séparateur), <code class="ml">others</code> la liste des sous-listes suivantes. Le découpage se construit depuis la fin de la liste, en ajoutant chaque élément en tête : l’ordre initial est conservé sans jamais retourner une liste.</p><p>On nomme le résultat de l’appel récursif avec <code class="ml">let (current, others) = cut l in</code> : un seul appel, utilisé deux fois.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">cut []</code> → <code class="ml">([], [])</code> : une sous-liste vide, rien après.</li><li><code class="ml">cut (e :: l)</code> avec <code class="ml">sep e</code> : <code class="ml">e</code> est un séparateur. La sous-liste en cours de <code class="ml">l</code> devient une sous-liste suivante, et une nouvelle sous-liste vide commence : <code class="ml">([], current :: others)</code>.</li><li><code class="ml">cut (e :: l)</code> sinon : <code class="ml">e</code> rejoint la sous-liste en cours : <code class="ml">(e :: current, others)</code>.</li><li>Fonction chapeau : <code class="ml">[]</code> → <code class="ml">[]</code> (exemple 1) ; sinon <code class="ml">current :: others</code>.</li></ul>' + M['p2023-ex3.trace'] },
      { t: 'Le code et la réponse de Caml', html: M['p2023-ex3.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les quatre exemples du sujet, puis deux cas que l’énoncé ne fixe pas : un séparateur en fin de liste donne une dernière sous-liste vide (comme un séparateur en tête en donne une première), et sans séparateur on obtient une seule sous-liste.</p>' + M['p2023-ex3.chk'] },
      { t: 'La copie notée 6 / 8', html: '<p>La copie des annales construit chaque sous-liste dans un accumulateur, la retourne, et empile les sous-listes dans un second accumulateur : elles sortent dans l’ordre inverse (<code class="ml">[[4; 5]; [1; 2]]</code>). Le correcteur a retiré 2 points, marge « ordre », comme l’annonçait l’énoncé. La récursion pure de l’étape 3 évite le problème.</p>' }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val split : (\'a -&gt; bool) -&gt; \'a list -&gt; \'a list list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Rendre <code class="ml">[[]]</code> pour la liste vide : l’exemple attend <code class="ml">[]</code>.',
      'Construire les sous-listes dans un accumulateur sans les remettre dans l’ordre : c’est ce qui a coûté 2 points à la copie notée.',
      'Oublier la sous-liste vide quand le séparateur est en tête, ou quand deux séparateurs se suivent.',
      'Garder le séparateur dans une sous-liste : il ne fait partie d’aucune.',
      'Écrire <code class="ml">sep = e</code> : <code class="ml">sep</code> est un prédicat, on l’applique (<code class="ml">sep e</code>).',
      'Appeler <code class="ml">cut l</code> deux fois (une pour <code class="ml">current</code>, une pour <code class="ml">others</code>) : tout le calcul est refait ; <code class="ml">let (current, others) = cut l in</code> l’évite.'],
    grading: '8 points pour l’exercice ; d’après l’énoncé et la copie notée 6 / 8, des sous-listes dans l’ordre inverse coûtent 2 points.',
    official: false, note: 'Pas de corrigé officiel : correction rédigée et exécutée avec OCaml 4.14. Les annales contiennent une copie d’élève notée 18/20, citée dans la correction.'
  });


  /* =====================================================================
     Partiel du 31 octobre 2022 (promo 2027), partie 2 Caml sur 16
     ===================================================================== */
  M['p2022-ex2.ex'] = repl(
    '# insert_post 42 (function y -> y mod 2 = 0) [5; -7; 2; 4; 1];;',
    '- : int list = [5; -7; 2; 42; 4; 1]',
    '# insert_post "toto" (function y -> y = "one") ["one"; "two"; "three"; "four"];;',
    '- : string list = ["one"; "toto"; "two"; "three"; "four"]',
    '# insert_post 4.1 (function y -> y < 0.) [1.1; 2.4; 2.];;',
    'Exception: Failure "insert_post: x cannot be inserted".');
  M['p2022-ex2.sol'] = repl(
    '# let rec insert_post x f = function',
    '      []     -> failwith "insert_post: x cannot be inserted"',
    '    | e :: l -> if f e then',
    '                   e :: x :: l',
    '                else',
    '                   e :: insert_post x f l ;;',
    "val insert_post : 'a -> ('a -> bool) -> 'a list -> 'a list = <fun>");
  M['p2022-ex2.chk'] = repl(
    '# insert_post 42 (function y -> y mod 2 = 0) [5; -7; 2; 4; 1] ;;',
    '- : int list = [5; -7; 2; 42; 4; 1]',
    '# insert_post "toto" (function y -> y = "one") ["one"; "two"; "three"; "four"] ;;',
    '- : string list = ["one"; "toto"; "two"; "three"; "four"]',
    '# insert_post 4.1 (function y -> y < 0.) [1.1; 2.4; 2.] ;;',
    'Exception: Failure "insert_post: x cannot be inserted".',
    '# insert_post 0 (function y -> y > 0) [] ;;',
    'Exception: Failure "insert_post: x cannot be inserted".',
    '# insert_post 0 (function y -> y > 0) [3] ;;',
    '- : int list = [3; 0]');
  X.push({
    id: 'p2022-ex2', exam: 'p2022', kind: 'partiel', order: 2, src: 'Partiel oct. 2022 · Ex 2',
    title: 'Insertion après : insert_post', pts: 3.5, topics: ['listes', 'ordre-superieur', 'construire', 'exceptions'], lvl: 1, time: 8,
    intro: '<p>Écrire la fonction <code class="ml">insert_post x f lst</code> qui prend en paramètres :</p><ul><li>un élément <code class="ml">x</code></li><li>une fonction à un paramètre <code class="ml">f</code> renvoyant une valeur booléenne</li><li>une liste <code class="ml">lst</code></li></ul><p>et qui insère l’élément <code class="ml">x</code> dans la liste <code class="ml">lst</code> juste après le premier élément <code class="ml">y</code> tel que <code class="ml">f y</code> est <code class="ml">true</code>.</p><p>La fonction devra déclencher une exception <code class="ml">Failure</code> s’il n’existe aucun élément <code class="ml">y</code> après lequel <code class="ml">x</code> peut être inséré.</p>' + M['p2022-ex2.ex'],
    hints: [
      '<code class="ml">f</code> est une fonction à un paramètre qui rend un booléen : on l’applique à chaque élément, <code class="ml">f e</code>.',
      'Parcours la liste : dès que <code class="ml">f e</code> est vrai, <code class="ml">x</code> se place juste derrière <code class="ml">e</code> et la suite est recopiée telle quelle. Sinon on garde <code class="ml">e</code> et on continue.',
      'Si on arrive à la liste vide, aucun élément ne convenait : c’est là que se déclenche <code class="ml">Failure</code>, avec le message de l’exemple.'],
    solution: [
      { t: 'Le principe', html: '<p>On cherche le premier élément qui vérifie <code class="ml">f</code>, et on s’arrête là : le reste de la liste ne change pas. Arriver au bout de la liste sans l’avoir trouvé, c’est le cas d’erreur : il se traite dans le cas <code class="ml">[]</code>, sans fonction chapeau (aucun paramètre à vérifier au départ).</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">[]</code> → <code class="ml">failwith "insert_post: x cannot be inserted"</code> (vaut aussi pour une liste vide au départ).</li><li><code class="ml">e :: l</code> avec <code class="ml">f e</code> → <code class="ml">e :: x :: l</code> : arrêt, la suite <code class="ml">l</code> est gardée telle quelle.</li><li><code class="ml">e :: l</code> sinon → <code class="ml">e :: insert_post x f l</code>.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel.</p>' + M['p2022-ex2.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les trois exemples du sujet, puis la liste vide et une liste d’un élément qui convient.</p>' + M['p2022-ex2.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val insert_post : \'a -&gt; (\'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Insérer après chaque élément qui vérifie <code class="ml">f</code> : seulement après le premier.',
      'Insérer avant (<code class="ml">x :: e :: l</code>) : c’est juste après <code class="ml">y</code>.',
      'Continuer après l’insertion (<code class="ml">e :: x :: insert_post x f l</code>) : <code class="ml">x</code> serait inséré plusieurs fois, et la fin de liste déclencherait <code class="ml">Failure</code>.',
      'Rendre la liste sans <code class="ml">x</code> quand aucun élément ne convient : l’énoncé demande <code class="ml">Failure</code>.'],
    grading: '3,5 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });

  M['p2022-ex3.ex'] = repl(
    '# pos_max [];;',
    'Exception: Invalid_argument "pos_max: empty list".',
    '# pos_max [1; 2; 3];;',
    '- : int = 3',
    '# pos_max [3; 2; 1];;',
    '- : int = 1',
    '# pos_max [8.5; 9.; -4.5];;',
    '- : int = 2');
  M['p2022-ex3.sol'] = repl(
    '# let pos_max = function',
    '      []     -> invalid_arg "pos_max: empty list"',
    '    | e :: l -> let rec aux_max vmax vpos cur_pos = function',
    '                       []     -> vpos',
    '                     | e :: l -> if e > vmax then',
    '                                    aux_max e cur_pos (cur_pos + 1) l',
    '                                 else',
    '                                    aux_max vmax vpos (cur_pos + 1) l',
    '                in',
    '                   aux_max e 1 2 l ;;',
    "val pos_max : 'a list -> int = <fun>");
  M['p2022-ex3.chk'] = repl(
    '# pos_max [] ;;',
    'Exception: Invalid_argument "pos_max: empty list".',
    '# pos_max [1; 2; 3] ;;',
    '- : int = 3',
    '# pos_max [3; 2; 1] ;;',
    '- : int = 1',
    '# pos_max [8.5; 9.; -4.5] ;;',
    '- : int = 2',
    '# pos_max [7] ;;',
    '- : int = 1');
  M['p2022-ex3.v2'] = repl(
    '# let pos_max = function',
    '      []    -> invalid_arg "pos_max: empty list"',
    '    | l     -> let rec aux_max = function',
    '                     [e] -> (e, 1)',
    '                   | e :: l -> let vmax, vpos = aux_max l',
    '                               in',
    '                                  if e > vmax then',
    '                                    (e, 1)',
    '                                  else',
    '                                    (vmax, vpos + 1)',
    '               in',
    '                  let _, vpos = aux_max l in vpos ;;',
    'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
    'Here is an example of a case that is not matched:',
    '[]',
    "val pos_max : 'a list -> int = <fun>",
    '# pos_max [8.5; 9.; -4.5] ;;',
    '- : int = 2');
  X.push({
    id: 'p2022-ex3', exam: 'p2022', kind: 'partiel', order: 3, src: 'Partiel oct. 2022 · Ex 3',
    title: 'Position du maximum : pos_max', pts: 4.5, topics: ['listes', 'accumulateur', 'rangs', 'exceptions'], lvl: 2, time: 12,
    intro: '<p>Écrire la fonction <code class="ml">pos_max lst</code> qui retourne la position de l’élément maximum de la liste <code class="ml">lst</code>. On suppose que la liste <code class="ml">lst</code> ne contient aucun doublon et la position du premier élément de la liste est 1.</p><p>La fonction devra déclencher une exception <code class="ml">Invalid_argument</code> si la liste <code class="ml">lst</code> est initialement vide.</p>' + M['p2022-ex3.ex'],
    hints: [
      '« Initialement vide » : le test porte sur la liste de départ, pas sur les appels récursifs (la liste finit toujours par être vide). Où le placer ?',
      'Parcours la liste en gardant trois informations : la plus grande valeur vue, sa position, et la position de l’élément courant.',
      'La fonction chapeau filtre <code class="ml">e :: l</code> et lance le parcours de <code class="ml">l</code> avec <code class="ml">e</code> comme maximum, en position 1 ; l’élément suivant est en position 2.'],
    solution: [
      { t: 'Le principe', html: '<p>Une fonction chapeau filtre la liste de départ : vide, c’est l’exception ; sinon, sa tête <code class="ml">e</code> est le premier maximum, en position 1. Une fonction récursive locale parcourt la suite avec trois paramètres supplémentaires : <code class="ml">vmax</code> (le plus grand élément vu), <code class="ml">vpos</code> (sa position) et <code class="ml">cur_pos</code> (la position de l’élément courant).</p>' },
      { t: 'Les cas de aux_max', html: '<ul><li><code class="ml">[]</code> → <code class="ml">vpos</code> : tout est vu, on rend la position du maximum.</li><li><code class="ml">e :: l</code> avec <code class="ml">e &gt; vmax</code> → nouveau maximum : <code class="ml">aux_max e cur_pos (cur_pos + 1) l</code>.</li><li><code class="ml">e :: l</code> sinon → <code class="ml">aux_max vmax vpos (cur_pos + 1) l</code>.</li></ul><p>Le premier appel est <code class="ml">aux_max e 1 2 l</code>. Le maximum part de la tête de la liste, pas de <code class="ml">0</code> : la fonction marche pour des négatifs et pour des <code class="ml">float</code> (dernier exemple).</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est la première version du corrigé officiel.</p>' + M['p2022-ex3.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les quatre exemples du sujet et une liste d’un élément.</p>' + M['p2022-ex3.chk'] },
      { t: 'La seconde version du corrigé officiel', html: '<p>Récursion pure : <code class="ml">aux_max</code> rend le couple (maximum, position) de la liste, calculé depuis la fin ; une liste d’un élément donne <code class="ml">(e, 1)</code>, et chaque élément ajouté devant décale la position de 1. Caml affiche un Warning 8 (le cas <code class="ml">[]</code> de <code class="ml">aux_max</code> n’est pas écrit ; il n’arrive jamais, la fonction chapeau l’empêche) que le corrigé n’imprime pas.</p>' + M['p2022-ex3.v2'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val pos_max : \'a list -&gt; int = &lt;fun&gt;</code>.</p>',
    traps: [
      'Compter les positions à partir de 0 : la première est 1.',
      'Tester la liste vide dans la fonction récursive : elle devient vide à la fin de chaque parcours, ce n’est pas une erreur.',
      'Partir d’un maximum égal à <code class="ml">0</code> : faux pour une liste de négatifs, et le type se fige à <code class="ml">int</code> (le dernier exemple utilise des <code class="ml">float</code>).',
      'Rendre le maximum au lieu de sa position.',
      'Dans la version qui rend un couple, appeler deux fois <code class="ml">aux_max l</code> : nomme le résultat avec <code class="ml">let … in</code>.'],
    grading: '4,5 points pour l’exercice, sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14 ; la seconde version du corrigé déclenche un avertissement que le corrigé n’affiche pas (étape 5).'
  });

  M['p2022-ex4.ex1'] = repl(
    '# less2 (function x -> function y -> x = y) 2 [] [];;',
    '- : bool = true',
    '# less2 (function x -> function y -> x = y) 0 [5; 1; 1; 2] [1; 5; 1; 4];;',
    'Exception: Invalid_argument "less: k <= 0".',
    '# less2 (function x -> function y -> x > y) 3 [5.; 1.1; 1.8; 2.5] [1.; 5.7; 1.9; 5.];;',
    '- : bool = true',
    '# less2 (function x -> function y -> x mod y = 0) 2 [5; 15; 5; 2] [7; 5 ; 4; 4];;',
    '- : bool = true');
  M['p2022-ex4.ex2'] = repl(
    "# common 0 ['a'; 'y'; 'c'] ['c'; 'a'; 'y'];;",
    '- : bool = false',
    '# common 2 [1; 2; 3; 4] [1; 2; 3; 5];;',
    '- : bool = true',
    "# common 1 ['a'; 'y'; 'c'] ['b'; 'y'; 'c'];;",
    '- : bool = true');
  M['p2022-ex4.off'] = repl(
    '# let less2 p k l1 l2 =',
    '    if k <= 0 then',
    '       invalid_arg "less: k <= 0"',
    '    else',
    '    let rec aux_less k = function',
    '       ([], [])              -> true',
    '     | (e1 :: l1, e2 :: l2) -> if p e1 e2 then',
    '                                  k <> 1 && aux_less (k - 1) (l1, l2)',
    '                                else',
    '                                  aux_less k (l1, l2)',
    '    in',
    '       aux_less k (l1, l2) ;;',
    'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
    'Here is an example of a case that is not matched:',
    '([], _::_)',
    "val less2 : ('a -> 'b -> bool) -> int -> 'a list -> 'b list -> bool = <fun>");
  M['p2022-ex4.sol'] = repl(
    '# let less2 p k l1 l2 =',
    '    if k <= 0 then',
    '      invalid_arg "less: k <= 0"',
    '    else',
    '      let rec aux_less k = function',
    '          ([], []) -> true',
    '        | (e1 :: l1, e2 :: l2) ->',
    '            if p e1 e2 then',
    '              k <> 1 && aux_less (k - 1) (l1, l2)',
    '            else',
    '              aux_less k (l1, l2)',
    '        | _ -> invalid_arg "less: different lengths"',
    '      in',
    '        aux_less k (l1, l2) ;;',
    "val less2 : ('a -> 'b -> bool) -> int -> 'a list -> 'b list -> bool = <fun>");
  M['p2022-ex4.chk1'] = repl(
    '# less2 (function x -> function y -> x = y) 2 [] [] ;;',
    '- : bool = true',
    '# less2 (function x -> function y -> x = y) 0 [5; 1; 1; 2] [1; 5; 1; 4] ;;',
    'Exception: Invalid_argument "less: k <= 0".',
    '# less2 (function x -> function y -> x > y) 3 [5.; 1.1; 1.8; 2.5] [1.; 5.7; 1.9; 5.] ;;',
    '- : bool = true',
    '# less2 (function x -> function y -> x mod y = 0) 2 [5; 15; 5; 2] [7; 5 ; 4; 4] ;;',
    '- : bool = true',
    '# less2 (function x -> function y -> x = y) 2 [1; 2; 3] [1; 2; 4] ;;',
    '- : bool = false');
  M['p2022-ex4.sol2'] = repl(
    '# let common k l1 l2 =',
    '    not (less2 (function x -> function y -> x = y) (k + 1) l1 l2) ;;',
    "val common : int -> 'a list -> 'a list -> bool = <fun>",
    "# common 0 ['a'; 'y'; 'c'] ['c'; 'a'; 'y'] ;;",
    '- : bool = false',
    '# common 2 [1; 2; 3; 4] [1; 2; 3; 5] ;;',
    '- : bool = true',
    "# common 1 ['a'; 'y'; 'c'] ['b'; 'y'; 'c'] ;;",
    '- : bool = true');
  X.push({
    id: 'p2022-ex4', exam: 'p2022', kind: 'partiel', order: 4, src: 'Partiel oct. 2022 · Ex 4',
    title: 'Less : less2, puis common', pts: 5, topics: ['listes', 'ordre-superieur', 'deux-listes', 'accumulateur', 'exceptions'], lvl: 3, time: 15,
    questions: [
      '<b>1.</b> Écrire la fonction <code class="ml">less2 p k l1 l2</code> dont les spécifications sont les suivantes :<ul><li>Elle prend en paramètre une fonction à deux paramètres <code class="ml">p</code>, un entier strictement positif <code class="ml">k</code> ainsi que deux listes : [a<sub>1</sub>; a<sub>2</sub>; …; a<sub>n</sub>] et [b<sub>1</sub>; b<sub>2</sub>; …; b<sub>n</sub>]. Les deux listes sont supposées de même longueur.</li><li>Elle retourne <code class="ml">true</code> si le nombre de paires d’éléments (a<sub>i</sub>, b<sub>i</sub>) tels que p a<sub>i</sub> b<sub>i</sub> est <code class="ml">true</code> est strictement plus petit que <code class="ml">k</code>, et <code class="ml">false</code> sinon.</li><li>Elle déclenche une exception <code class="ml">Invalid_argument</code> si le paramètre <code class="ml">k</code> est invalide.</li></ul>' + M['p2022-ex4.ex1'],
      '<b>2.</b> Utiliser la fonction précédente <code class="ml">less2</code> (qu’elle soit écrite ou pas) pour écrire la fonction <code class="ml">common k l1 l2</code> qui vérifie si les listes <code class="ml">l1</code> et <code class="ml">l2</code> ont strictement plus de <code class="ml">k</code> éléments de mêmes valeurs aux mêmes positions. Les deux listes sont supposées de même longueur et le paramètre <code class="ml">k</code> est supposé positif ou nul.' + M['p2022-ex4.ex2']],
    hints: [
      'Le test de <code class="ml">k</code> (<code class="ml">Invalid_argument</code> si <code class="ml">k &lt;= 0</code>, d’après l’exemple) se fait une fois, avant le parcours des deux listes.',
      'Parcours les deux listes ensemble (motif <code class="ml">(e1 :: l1, e2 :: l2)</code>) avec un compteur : combien de paires vraies peut-on encore accepter ? Dès que la k-ième paire vraie arrive, la réponse est <code class="ml">false</code> : inutile de continuer.',
      'Pour <code class="ml">common</code> : « strictement plus de <code class="ml">k</code> paires égales », c’est le contraire de « strictement moins de <code class="ml">k + 1</code> paires égales ». Le prédicat est l’égalité, <code class="ml">function x -&gt; function y -&gt; x = y</code>.'],
    solution: [
      { t: 'Le principe de less2', html: '<p>Une fonction chapeau teste <code class="ml">k</code> une fois. La fonction récursive locale <code class="ml">aux_less k (l1, l2)</code> parcourt les deux listes ensemble ; son <code class="ml">k</code> (le paramètre est masqué) est le nombre de paires vraies qu’il faudrait encore trouver pour atteindre <code class="ml">k</code> : chaque paire vraie le fait descendre de 1. Quand une paire vraie arrive alors qu’il vaut 1, on a trouvé <code class="ml">k</code> paires vraies : la réponse est <code class="ml">false</code>, sans finir le parcours.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">true</code> : moins de <code class="ml">k</code> paires vraies ont été trouvées.</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> avec <code class="ml">p e1 e2</code> → <code class="ml">k &lt;&gt; 1 &amp;&amp; aux_less (k - 1) (l1, l2)</code> : si <code class="ml">k</code> vaut 1, <code class="ml">&amp;&amp;</code> rend <code class="ml">false</code> sans évaluer l’appel.</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> sinon → <code class="ml">aux_less k (l1, l2)</code>.</li><li>Longueurs différentes : les listes sont « supposées de même longueur », mais un dernier cas <code class="ml">_ -&gt; invalid_arg …</code> évite le Warning 8 dans la réponse de Caml.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: M['p2022-ex4.sol'] + '<p>Le corrigé officiel est le même, sans le dernier cas. Caml répond alors par un avertissement, que le corrigé n’imprime pas :</p>' + M['p2022-ex4.off'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les quatre exemples du sujet, puis un cas où la k-ième paire vraie arrive : la réponse est <code class="ml">false</code>.</p>' + M['p2022-ex4.chk1'] },
      { t: 'La fonction common', html: '<p>« Strictement plus de <code class="ml">k</code> paires égales » = « au moins <code class="ml">k + 1</code> » = non (« strictement moins de <code class="ml">k + 1</code> »). Comme <code class="ml">k ≥ 0</code>, <code class="ml">k + 1 ≥ 1</code> : <code class="ml">less2</code> ne déclenche pas d’exception. Le corrigé officiel écrit le prédicat <code class="ml">(=)</code>, l’opérateur d’égalité employé comme fonction à deux paramètres : c’est la même chose que <code class="ml">function x -&gt; function y -&gt; x = y</code>.</p>' + M['p2022-ex4.sol2'] }],
    answer: '<p>Deux fonctions, chacune suivie de sa réponse de Caml :</p><ul><li><code data-ml-ans>val less2 : (\'a -&gt; \'b -&gt; bool) -&gt; int -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code></li><li><code data-ml-ans>val common : int -&gt; \'a list -&gt; \'a list -&gt; bool = &lt;fun&gt;</code></li></ul>',
    traps: [
      'Compter toutes les paires vraies puis comparer à <code class="ml">k</code> : juste, mais le parcours continue alors que la réponse est connue.',
      '« Strictement plus petit que <code class="ml">k</code> » : avec <code class="ml">k = 2</code> et exactement 2 paires vraies, la réponse est <code class="ml">false</code>.',
      'Pour <code class="ml">common</code>, appeler <code class="ml">less2 … k</code> au lieu de <code class="ml">k + 1</code>, ou oublier le <code class="ml">not</code>.',
      'Écrire <code class="ml">p (e1, e2)</code> : <code class="ml">p</code> prend deux paramètres, on écrit <code class="ml">p e1 e2</code>.',
      'Tester <code class="ml">k</code> dans la fonction récursive, où il sert de compteur : le test est refait à chaque paire et risque de se déclencher en cours de route.'],
    grading: '5 points pour l’exercice ; la question 2 peut être traitée même si la question 1 ne l’est pas (« qu’elle soit écrite ou pas »).',
    official: true, note: 'Code exécuté avec OCaml 4.14 ; le corrigé officiel n’a pas le dernier cas de less2 et omet l’avertissement de Caml (étape 3).'
  });

  M['p2022-ex5.fn'] = repl(
    '# let mystery1 l1 l2 =',
    '    let rec aux l3 = function',
    '        (l1, [])       -> [l1]',
    '      | (l1, 0::l2)    -> l3 :: aux [] (l1, l2)',
    '      | (e::l1, i::l2) -> aux (e::l3) (l1, (i-1)::l2)',
    '    in',
    '      aux [] (l1, l2) ;;');
  M['p2022-ex5.q2'] = repl(
    '# mystery1 [1; 2; 3; 4; 5; 6; 7; 8; 9; 10] [4; 1; 2];;',
    '# mystery1 [1; 2; 3; 4; 5; 6; 7; 8; 9; 10] [7; 3];;');
  M['p2022-ex5.q3'] = repl(
    '# mystery1 ???;;',
    '- : int list list = [[5; 15; 5]; [21]; [5; 1; 4]]');
  M['p2022-ex5.def'] = repl(
    '# let mystery1 l1 l2 =',
    '    let rec aux l3 = function',
    '        (l1, [])       -> [l1]',
    '      | (l1, 0::l2)    -> l3 :: aux [] (l1, l2)',
    '      | (e::l1, i::l2) -> aux (e::l3) (l1, (i-1)::l2)',
    '    in',
    '      aux [] (l1, l2) ;;',
    'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
    'Here is an example of a case that is not matched:',
    '([], 1::_)',
    "val mystery1 : 'a list -> int list -> 'a list list = <fun>");
  M['p2022-ex5.trace'] = ml(
    'mystery1 [1; 2; 3] [2]',
    '= aux [] ([1; 2; 3], [2])',
    '= aux [1] ([2; 3], [1])',
    '= aux [2; 1] ([3], [0])',
    '= [2; 1] :: aux [] ([3], [])',
    '= [2; 1] :: [[3]]',
    '= [[2; 1]; [3]]');
  M['p2022-ex5.evals'] = repl(
    '# mystery1 [1; 2; 3] [2] ;;',
    '- : int list list = [[2; 1]; [3]]',
    '# mystery1 [1; 2; 3; 4; 5; 6; 7; 8; 9; 10] [4; 1; 2];;',
    '- : int list list = [[4; 3; 2; 1]; [5]; [7; 6]; [8; 9; 10]]',
    '# mystery1 [1; 2; 3; 4; 5; 6; 7; 8; 9; 10] [7; 3];;',
    '- : int list list = [[7; 6; 5; 4; 3; 2; 1]; [10; 9; 8]; []]');
  M['p2022-ex5.q3sol'] = repl(
    '# mystery1 [5; 15; 5; 21; 5; 1; 4] [3; 1] ;;',
    '- : int list list = [[5; 15; 5]; [21]; [5; 1; 4]]',
    '# mystery1 [1; 2] [3] ;;',
    'Exception: Match_failure ("//toplevel//", 2, 19).');
  X.push({
    id: 'p2022-ex5', exam: 'p2022', kind: 'partiel', order: 5, src: 'Partiel oct. 2022 · Ex 5',
    title: 'Mystery : type, évaluations, application à trouver', pts: 3, topics: ['listes', 'mystery', 'evaluation', 'accumulateur'], lvl: 3, time: 12,
    questions: [
      '<b>1.</b> Donner le type de la fonction suivante.' + M['p2022-ex5.fn'],
      '<b>2.</b> On suppose la fonction mystery1 ci-dessus correcte et dans l’environnement Caml. Donner les résultats des évaluations successives des phrases suivantes si elles sont correctes. Si elles sont incorrectes indiquez "Erreur".' + M['p2022-ex5.q2'],
      '<b>3.</b> Donner une application de la fonction mystery1 renvoyant le résultat ci-dessous.' + M['p2022-ex5.q3']],
    hints: [
      'Type : <code class="ml">l2</code> contient des entiers (motif <code class="ml">0::l2</code>, calcul <code class="ml">i-1</code>) ; les éléments de <code class="ml">l1</code> ne sont jamais comparés, leur type est quelconque. Le résultat est construit avec <code class="ml">[l1]</code> et <code class="ml">l3 :: …</code>.',
      '<code class="ml">aux</code> déplace les éléments de <code class="ml">l1</code> dans <code class="ml">l3</code> en décrémentant la tête de <code class="ml">l2</code>. Que contient <code class="ml">l3</code> quand cette tête arrive à 0 ? Dans quel ordre ?',
      'Question 3 : le résultat a trois morceaux, donc <code class="ml">l2</code> a deux nombres ; le dernier morceau est le reste de <code class="ml">l1</code>, dans l’ordre ; les autres sont retournés.'],
    solution: [
      { t: 'Le type', html: '<p><code class="ml">l2</code> est filtrée avec <code class="ml">0::l2</code> et sa tête sert dans <code class="ml">i-1</code> : <code class="ml">int list</code>. Les éléments de <code class="ml">l1</code> sont seulement déplacés : <code class="ml">\'a list</code>. Le résultat est une liste de morceaux de <code class="ml">l1</code> : <code class="ml">\'a list list</code>. Caml affiche d’abord un Warning 8 : le cas <code class="ml">([], 1::_)</code> (plus d’élément à prendre alors que <code class="ml">l2</code> en demande encore) n’est pas traité.</p>' + M['p2022-ex5.def'] },
      { t: 'Ce que fait mystery1', html: '<p><code class="ml">aux</code> prend les éléments de <code class="ml">l1</code> un à un et les empile dans l’accumulateur <code class="ml">l3</code> en décrémentant la tête de <code class="ml">l2</code>. Quand cette tête vaut 0, le morceau <code class="ml">l3</code> est terminé : il est ajouté au résultat et <code class="ml">l3</code> repart de <code class="ml">[]</code>. Quand <code class="ml">l2</code> est vide, le reste de <code class="ml">l1</code> forme le dernier morceau, tel quel. <code class="ml">mystery1 l1 l2</code> découpe donc <code class="ml">l1</code> en morceaux dont <code class="ml">l2</code> donne les tailles, chaque morceau étant <b>retourné</b>, plus le reste de <code class="ml">l1</code> dans l’ordre.</p>' },
      { t: 'Trace sur un petit exemple', html: M['p2022-ex5.trace'] },
      { t: 'Les évaluations', html: '<p>Morceaux de 4, 1 et 2 éléments, retournés, puis le reste <code class="ml">[8; 9; 10]</code>. Pour la deuxième, 7 puis 3 éléments épuisent la liste : le reste est la liste vide, d’où le <code class="ml">[]</code> final. Aucune des deux phrases n’est incorrecte.</p>' + M['p2022-ex5.evals'] },
      { t: 'Question 3', html: '<p>Trois morceaux, donc <code class="ml">l2</code> a deux nombres. Le premier morceau, <code class="ml">[5; 15; 5]</code>, est un morceau retourné de 3 éléments : c’est un palindrome, <code class="ml">l1</code> commence donc par <code class="ml">5; 15; 5</code>. Puis un morceau de 1 élément, <code class="ml">[21]</code>, et le reste <code class="ml">[5; 1; 4]</code> tel quel. C’est la réponse officielle. Si <code class="ml">l2</code> demande plus d’éléments que <code class="ml">l1</code> n’en a, on tombe sur le cas non traité : <code class="ml">Match_failure</code>.</p>' + M['p2022-ex5.q3sol'] }],
    answer: '<ol><li><code data-ml-ans>val mystery1 : \'a list -&gt; int list -&gt; \'a list list = &lt;fun&gt;</code> (précédé d’un Warning 8).</li><li><code data-ml-ans>- : int list list = [[4; 3; 2; 1]; [5]; [7; 6]; [8; 9; 10]]</code> puis <code data-ml-ans>- : int list list = [[7; 6; 5; 4; 3; 2; 1]; [10; 9; 8]; []]</code></li><li><code class="ml">mystery1 [5; 15; 5; 21; 5; 1; 4] [3; 1]</code></li></ol>',
    traps: [
      'Oublier que chaque morceau est retourné : l’accumulateur <code class="ml">l3</code> empile.',
      'Retourner aussi le dernier morceau : <code class="ml">[l1]</code> le rend tel quel.',
      'Oublier le <code class="ml">[]</code> final de la deuxième évaluation : quand <code class="ml">l2</code> est vide, <code class="ml">[l1]</code> est ajouté même si <code class="ml">l1</code> est vide.',
      'Écrire <code class="ml">int list -&gt; int list -&gt; int list list</code> : rien n’impose des entiers dans <code class="ml">l1</code>.',
      'Répondre « Erreur » : les deux phrases sont correctes ; seul un appel qui demande trop d’éléments déclenche une exception.'],
    grading: '3 points pour l’exercice (type, deux évaluations, application), sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14 ; le corrigé officiel donne les mêmes résultats, sans l’avertissement.'
  });


  /* =====================================================================
     Partiel du 4 novembre 2021 (promo 2026), partie 2 Caml sur 15
     ===================================================================== */
  M['p2021-ex2.ex'] = repl(
    '# remove_interval list1 1 4;;',
    '- : int list = [5; 26; -7; 18; 99]',
    '# remove_interval list1 5 8;;',
    '- : int list = [11; 2; 23; 14; 99]',
    '# remove_interval list1 6 9;;',
    '- : int list = [11; 2; 23; 14; 5]',
    '# remove_interval list1 5 5;;',
    '- : int list = [11; 2; 23; 14; 26; -7; 18; 99]',
    '# remove_interval list1 9 6;;',
    'Exception: Invalid_argument "remove_interval: invalid ranks".',
    '# remove_interval list1 5 12;;',
    'Exception: Failure "remove_internal: list too short".');
  M['p2021-ex2.sol'] = repl(
    '# let remove_interval list i j =',
    '    if i <= 0 || j <= 0 || j < i then',
    '      invalid_arg "remove_interval: invalid ranks"',
    '    else',
    '      let rec remove = function        (* (list, n), n the current position *)',
    '          ([], n) -> if n <= j then failwith "remove_internal: list too short"',
    '                     else []',
    '        | (list, n) when n > j -> list',
    '        | (e :: q, n) when n < i -> e :: remove (q, n+1)',
    '        | (e :: q, n) (* in [i, j] *) -> remove (q, n+1)',
    '      in',
    '        remove (list, 1) ;;',
    "val remove_interval : 'a list -> int -> int -> 'a list = <fun>");
  M['p2021-ex2.sol_chk'] = repl(
    '# let list1 = [11; 2; 23; 14; 5; 26; -7; 18; 99] ;;',
    'val list1 : int list = [11; 2; 23; 14; 5; 26; -7; 18; 99]',
    '# remove_interval list1 1 4;;',
    '- : int list = [5; 26; -7; 18; 99]',
    '# remove_interval list1 5 8;;',
    '- : int list = [11; 2; 23; 14; 99]',
    '# remove_interval list1 6 9;;',
    '- : int list = [11; 2; 23; 14; 5]',
    '# remove_interval list1 5 5;;',
    '- : int list = [11; 2; 23; 14; 26; -7; 18; 99]',
    '# remove_interval list1 9 6;;',
    'Exception: Invalid_argument "remove_interval: invalid ranks".',
    '# remove_interval list1 5 12;;',
    'Exception: Failure "remove_internal: list too short".',
    '# remove_interval list1 0 3 ;;',
    'Exception: Invalid_argument "remove_interval: invalid ranks".',
    '# remove_interval [] 1 1 ;;',
    'Exception: Failure "remove_internal: list too short".');
  X.push({
    id: 'p2021-ex2', exam: 'p2021', kind: 'partiel', order: 2, src: 'Partiel nov. 2021 · Ex 2',
    title: 'Suppression intervalle : remove_interval', pts: 6, topics: ['listes', 'rangs', 'exceptions', 'construire', 'accumulateur'], lvl: 2, time: 15,
    intro: '<p>Écrire la fonction <code class="ml">remove_interval list i j</code> qui supprime toutes les valeurs comprises entre les places <code class="ml">i</code> et <code class="ml">j</code> dans la liste <code class="ml">list</code> (base 1). Toutes les valeurs aux places k avec k ∈ [i, j] devront donc être supprimées de la liste <code class="ml">list</code>.</p><p>La fonction devra déclencher une exception :</p><ul><li><code class="ml">Invalid_argument</code> si <code class="ml">i</code> ou <code class="ml">j</code> est négatif ou nul, ou si i &gt; j</li><li><code class="ml">Failure</code> si la liste est trop courte.</li></ul><p>Exemples d’applications avec <code class="ml">list1</code> la liste <code class="ml">[11; 2; 23; 14; 5; 26; -7; 18; 99]</code> :</p>' + M['p2021-ex2.ex'],
    hints: [
      'Les trois conditions d’<code class="ml">Invalid_argument</code> portent sur les paramètres : une fonction chapeau, un seul test, avant tout parcours.',
      'Parcours la liste en connaissant la position de l’élément courant (paramètre supplémentaire, qui part de 1). Trois situations : avant <code class="ml">i</code>, entre <code class="ml">i</code> et <code class="ml">j</code>, après <code class="ml">j</code>.',
      'Après <code class="ml">j</code>, on rend la suite telle quelle : inutile de continuer. Si la liste se termine alors que la position n’a pas dépassé <code class="ml">j</code>, elle est trop courte : <code class="ml">Failure</code>.'],
    solution: [
      { t: 'Le principe', html: '<p>La fonction chapeau teste <code class="ml">i &lt;= 0 || j &lt;= 0 || j &lt; i</code> une seule fois. La fonction récursive <code class="ml">remove</code> reçoit un couple (liste restante, position <code class="ml">n</code> de sa tête) ; <code class="ml">i</code> et <code class="ml">j</code> restent visibles, inutile de les passer.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">([], n)</code> : la liste est finie. Si <code class="ml">n &lt;= j</code>, la place <code class="ml">j</code> n’existe pas : la liste est trop courte (<code class="ml">Failure</code>) ; sinon on rend <code class="ml">[]</code>.</li><li><code class="ml">(list, n)</code> avec <code class="ml">n &gt; j</code> : tout l’intervalle est supprimé, on rend la suite telle quelle (arrêt anticipé).</li><li><code class="ml">(e :: q, n)</code> avec <code class="ml">n &lt; i</code> : avant l’intervalle, on garde <code class="ml">e</code>.</li><li><code class="ml">(e :: q, n)</code> sinon : <code class="ml">n</code> est dans [i, j], on ne garde pas <code class="ml">e</code>.</li></ul><p>L’ordre des cas compte : le cas <code class="ml">n &gt; j</code> passe avant les deux derniers. Une liste qui se termine exactement en <code class="ml">j</code> est valide : <code class="ml">remove_interval list1 6 9</code> arrive à <code class="ml">([], 10)</code>, et 10 &gt; 9.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est la première version du corrigé officiel. Le message « remove_internal » (et non « remove_interval ») est une coquille du sujet, reprise par le corrigé : on recopie le message de l’exemple.</p>' + M['p2021-ex2.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>On définit d’abord <code class="ml">list1</code>, puis les six exemples du sujet et deux cas limites.</p>' + M['p2021-ex2.sol_chk'] },
      { t: 'La seconde version du corrigé officiel', html: '<p>Elle fait descendre <code class="ml">i</code> et <code class="ml">j</code> au lieu de compter la position (motifs <code class="ml">(1, 1, e :: l)</code>, <code class="ml">(1, j, _ :: l)</code>, <code class="ml">(i, j, e :: l)</code>). Elle est juste, mais son message d’<code class="ml">Invalid_argument</code> est « remove_internal: invalid ranks », différent de l’exemple : garde le message de l’énoncé.</p>' }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val remove_interval : \'a list -&gt; int -&gt; int -&gt; \'a list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Oublier une des trois conditions d’<code class="ml">Invalid_argument</code> : <code class="ml">i &lt;= 0</code>, <code class="ml">j &lt;= 0</code>, <code class="ml">i &gt; j</code>.',
      'Prendre pour trop courte une liste qui se termine exactement en <code class="ml">j</code> : <code class="ml">remove_interval list1 6 9</code> est valide.',
      'Continuer le parcours après <code class="ml">j</code> : la suite se rend telle quelle.',
      'Rendre une liste quand elle est trop courte (<code class="ml">remove_interval list1 5 12</code>) : l’énoncé demande <code class="ml">Failure</code>.',
      'Compter les places à partir de 0 : l’énoncé dit « base 1 ».'],
    grading: '6 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });

  M['p2021-ex3.ex'] = repl(
    '# (* ex 1 *)',
    '  alternate_list ["a1"; "a2"; "a3"; "a4"; "a5"] ["b1"; "b2"; "b3"; "b4"; "b5"];;',
    '- : string list = ["a1"; "b1"; "a2"; "b2"; "a3"; "b3"; "a4"; "b4"; "a5"; "b5"]',
    '# (* ex 2 *)',
    '  alternate_list ["a1"; "a2"; "a3"; "a4"; "a5"] ["b1"; "b2"; "b3"];;',
    '- : string list = ["a1"; "b1"; "a2"; "b2"; "a3"; "b3"]',
    '# (* ex 3 *)',
    '  alternate_list ["a1"; "a2"; "a3"] ["b1"; "b2"; "b3"; "b4"; "b5"];;',
    '- : string list = ["a1"; "b1"; "a2"; "b2"; "a3"; "b3"; "a1"; "b4"; "a2"; "b5"]',
    '# (* ex 4 *)',
    '  alternate_list ["a1"; "a2"] ["b1"; "b2"; "b3"; "b4"; "b5"] ;;',
    '- : string list = ["a1"; "b1"; "a2"; "b2"; "a1"; "b3"; "a2"; "b4"; "a1"; "b5"]',
    '# alternate_list [] ["b1"; "b2"];;',
    '- : string list = ["b1"; "b2"]',
    '# alternate_list ["a1"] [];;',
    '- : string list = []');
  M['p2021-ex3.sol'] = repl(
    '# let alternate_list list1 list2 =',
    '    let rec aux = function',
    '        ([], l2)             -> aux (list1, l2)',
    '      | (l1, [])             -> []',
    '      | (e1 :: l1, e2 :: l2) -> e1 :: e2 :: aux (l1, l2)',
    '    in',
    '      match list1 with',
    '          []    -> list2',
    '        | list1 -> aux (list1, list2) ;;',
    "val alternate_list : 'a list -> 'a list -> 'a list = <fun>");
  M['p2021-ex3.chk'] = repl(
    '# alternate_list ["a1"; "a2"] ["b1"; "b2"; "b3"; "b4"; "b5"] ;;',
    '- : string list =',
    '["a1"; "b1"; "a2"; "b2"; "a1"; "b3"; "a2"; "b4"; "a1"; "b5"]',
    '# alternate_list [] ["b1"; "b2"] ;;',
    '- : string list = ["b1"; "b2"]',
    '# alternate_list ["a1"] [] ;;',
    '- : string list = []',
    '# alternate_list [] [] ;;',
    "- : 'a list = []");
  M['p2021-ex3.trace'] = ml(
    'alternate_list ["a1"; "a2"] ["b1"; "b2"; "b3"]',
    '= aux (["a1"; "a2"], ["b1"; "b2"; "b3"])',
    '= "a1" :: "b1" :: aux (["a2"], ["b2"; "b3"])',
    '= "a1" :: "b1" :: "a2" :: "b2" :: aux ([], ["b3"])',
    '= "a1" :: "b1" :: "a2" :: "b2" :: aux (["a1"; "a2"], ["b3"])   (* list1 again *)',
    '= "a1" :: "b1" :: "a2" :: "b2" :: "a1" :: "b3" :: aux (["a2"], [])',
    '= ["a1"; "b1"; "a2"; "b2"; "a1"; "b3"]');
  X.push({
    id: 'p2021-ex3', exam: 'p2021', kind: 'partiel', order: 3, src: 'Partiel nov. 2021 · Ex 3',
    title: 'Listes alternées : alternate_list', pts: 5, topics: ['listes', 'deux-listes', 'construire', 'recursivite'], lvl: 3, time: 15,
    intro: '<p>Écrire la fonction <code class="ml">alternate_list l1 l2</code> avec la liste l1 = [a<sub>1</sub>; a<sub>2</sub>; …; a<sub>n</sub>] et la liste l2 = [b<sub>1</sub>; b<sub>2</sub>; …; b<sub>m</sub>] qui construit la liste alternée définie de la manière suivante :</p><ul><li>si les deux listes sont de même longueur, on alterne les éléments : voir exemple 1 <code class="ml">(* ex 1 *)</code> ;</li><li>si la liste l1 est plus longue (n &gt; m), on alterne jusqu’à finir l2 (il manquera donc des éléments de l1) : voir exemple 2 ;</li><li>si la liste l2 est plus longue (m &gt; n), l1 est "répétée" jusqu’à finir l2 : [a<sub>1</sub>; b<sub>1</sub>; a<sub>2</sub>; b<sub>2</sub>; …; a<sub>n</sub>; b<sub>n</sub>; a<sub>1</sub>; b<sub>n+1</sub>; …; a<sub>k</sub>; b<sub>m</sub>] : voir exemples 3 et 4.</li></ul><p>Exemples d’applications :</p>' + M['p2021-ex3.ex'],
    hints: [
      'Deux listes : pense aux cas <code class="ml">[]</code> ou non pour chacune. Quand <code class="ml">l2</code> est vide, c’est fini ; quand les deux sont non vides, on prend un élément de chaque.',
      'Quand <code class="ml">l1</code> est épuisée mais pas <code class="ml">l2</code>, il faut repartir du début de <code class="ml">l1</code> : la liste d’origine doit rester accessible. Une fonction locale, définie dans la fonction principale, la voit encore.',
      'Attention au cas où <code class="ml">l1</code> est vide dès le départ : repartir de <code class="ml">l1</code> bouclerait sans fin. L’exemple donne la réponse : on rend <code class="ml">l2</code>.'],
    solution: [
      { t: 'Le principe', html: '<p>Une fonction locale <code class="ml">aux</code> parcourt le couple <code class="ml">(l1, l2)</code> ; elle est définie dans <code class="ml">alternate_list</code>, donc elle voit encore <code class="ml">list1</code>, la première liste <b>d’origine</b>. Quand sa première liste est épuisée, elle repart de <code class="ml">list1</code>.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">([], l2)</code> → <code class="ml">aux (list1, l2)</code> : on recommence la première liste (si <code class="ml">l2</code> est aussi vide, l’appel suivant tombe sur le cas 2 et rend <code class="ml">[]</code>).</li><li><code class="ml">(l1, [])</code> → <code class="ml">[]</code> : la seconde liste est finie, les éléments restants de <code class="ml">l1</code> sont perdus (exemple 2).</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> → <code class="ml">e1 :: e2 :: aux (l1, l2)</code>.</li><li>Fonction chapeau : si <code class="ml">list1</code> est vide, on rend <code class="ml">list2</code> (exemple 5) ; sinon <code class="ml">aux (list1, list2)</code>. Sans ce test, <code class="ml">aux ([], l2)</code> se rappellerait sans fin.</li></ul>' + M['p2021-ex3.trace'] },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel.</p>' + M['p2021-ex3.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>L’exemple 4, les deux derniers exemples du sujet et deux listes vides.</p>' + M['p2021-ex3.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val alternate_list : \'a list -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Recommencer avec la queue <code class="ml">l1</code> au lieu de la liste d’origine : il faut garder <code class="ml">list1</code> sous la main (paramètre de la fonction principale).',
      'Ne pas traiter <code class="ml">list1 = []</code> à part : <code class="ml">aux ([], l2)</code> se rappellerait sans fin (Stack overflow).',
      'Ajouter les éléments restants de <code class="ml">l1</code> quand <code class="ml">l2</code> est finie : l’exemple 2 montre qu’ils sont perdus.',
      'Écrire <code class="ml">[e1; e2] @ aux (l1, l2)</code> : juste, mais <code class="ml">e1 :: e2 :: …</code> suffit et évite <code class="ml">@</code>.'],
    grading: '5 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });

  M['p2021-ex4.q'] = repl(
    '# let aux p e (r1, r2) =',
    '    if p e then (e::r1, r2) else (r1, e::r2) ;;',
    '# aux (function x -> x mod 2 = 0) 10 ([0; 2], [1; 3]) ;;',
    '# let rec mystery p = function',
    '      ([], [])                    -> ([], [])',
    '    | (e1::l1, []) | ([], e1::l1) -> aux p e1 (mystery p (l1, []))',
    '    | (e1::l1, e2::l2)            -> aux p e1 (aux p e2 (mystery p (l1, l2))) ;;',
    '# let f x y = x - y = 0 in mystery f ([1; 2; 3; 4; 5; 6], [1; 2; 3; 4; 5; 6]) ;;',
    '# mystery (function x -> x mod 2 = 0) ([1; 2; 3; 4; 5; 6; 7; 8], [10; 11; 12; 13; 14]) ;;');
  M['p2021-ex4.all'] = repl(
    '# let aux p e (r1, r2) =',
    '    if p e then (e::r1, r2) else (r1, e::r2) ;;',
    "val aux : ('a -> bool) -> 'a -> 'a list * 'a list -> 'a list * 'a list =",
    '  <fun>',
    '# aux (function x -> x mod 2 = 0) 10 ([0; 2], [1; 3]) ;;',
    '- : int list * int list = ([10; 0; 2], [1; 3])',
    '# let rec mystery p = function',
    '      ([], [])                    -> ([], [])',
    '    | (e1::l1, []) | ([], e1::l1) -> aux p e1 (mystery p (l1, []))',
    '    | (e1::l1, e2::l2)            -> aux p e1 (aux p e2 (mystery p (l1, l2))) ;;',
    "val mystery : ('a -> bool) -> 'a list * 'a list -> 'a list * 'a list = <fun>",
    '# let f x y = x - y = 0 in mystery f ([1; 2; 3; 4; 5; 6], [1; 2; 3; 4; 5; 6]) ;;',
    'Error: This expression has type int -> int -> bool',
    '       but an expression was expected of type int -> bool',
    '       Type int -> bool is not compatible with type bool',
    '# mystery (function x -> x mod 2 = 0) ([1; 2; 3; 4; 5; 6; 7; 8], [10; 11; 12; 13; 14]) ;;',
    '- : int list * int list = ([10; 2; 12; 4; 14; 6; 8], [1; 11; 3; 13; 5; 7])');
  M['p2021-ex4.inter'] = ml(
    'mystery p ([1; 2; ...; 8], [10; 11; 12; 13; 14])',
    '= aux p 1 (aux p 10 (mystery p ([2; ...; 8], [11; 12; 13; 14])))',
    '= ...',
    '(* elements in the order 1, 10, 2, 11, 3, 12, 4, 13, 5, 14, 6, 7, 8 *)');
  X.push({
    id: 'p2021-ex4', exam: 'p2021', kind: 'partiel', order: 4, src: 'Partiel nov. 2021 · Ex 4',
    title: 'Mystery : aux, mystery et un prédicat', pts: 4, topics: ['listes', 'mystery', 'evaluation', 'ordre-superieur', 'deux-listes'], lvl: 3, time: 12,
    intro: '<p>Donner les résultats des évaluations successives des phrases suivantes si elles sont correctes. Si elles sont incorrectes indiquez "Erreur".</p>' + M['p2021-ex4.q'],
    hints: [
      'Commence par <code class="ml">aux</code> : selon <code class="ml">p e</code>, <code class="ml">e</code> va en tête de la première ou de la seconde liste du couple. Évalue la deuxième phrase avant de lire <code class="ml">mystery</code>.',
      'Dans <code class="ml">mystery</code>, <code class="ml">p</code> est appliqué à un seul élément (<code class="ml">p e</code> dans <code class="ml">aux</code>). Que se passe-t-il avec un <code class="ml">f</code> à deux paramètres ?',
      'Pour la dernière phrase, entrelace les deux listes (a1, b1, a2, b2, …, puis le reste de la plus longue), puis répartis chaque élément selon <code class="ml">p</code>, dans cet ordre.'],
    solution: [
      { t: 'aux', html: '<p><code class="ml">aux p e (r1, r2)</code> ajoute <code class="ml">e</code> en tête de <code class="ml">r1</code> si <code class="ml">p e</code> est vrai, en tête de <code class="ml">r2</code> sinon. Son type : <code class="ml">p</code> est une fonction qui rend un booléen, <code class="ml">e</code> a le type des éléments des deux listes. Caml écrit ce type long sur deux lignes. Phrase 2 : 10 est pair, il va en tête de la première liste : <code class="ml">([10; 0; 2], [1; 3])</code>.</p>' },
      { t: 'mystery', html: '<p><code class="ml">mystery p (l1, l2)</code> prend un élément de chaque liste à tour de rôle (a1, b1, a2, b2, …), puis le reste de la plus longue, et range chaque élément avec <code class="ml">aux</code> : le résultat est le couple (éléments qui vérifient <code class="ml">p</code>, éléments qui ne le vérifient pas), dans cet ordre d’entrelacement. <code class="ml">aux p e1 (aux p e2 …)</code> met <code class="ml">e1</code> devant <code class="ml">e2</code>.</p>' + M['p2021-ex4.inter'] },
      { t: 'Phrase 4 : Erreur', html: '<p><code class="ml">f</code> a deux paramètres : son type est <code class="ml">int -&gt; int -&gt; bool</code>. Or <code class="ml">mystery</code> attend un prédicat à un paramètre (<code class="ml">\'a -&gt; bool</code>), car <code class="ml">aux</code> calcule <code class="ml">p e</code> et s’en sert comme booléen. Caml refuse la phrase : c’est la réponse « Erreur ».</p>' },
      { t: 'Phrase 5', html: '<p>Ordre d’entrelacement : 1, 10, 2, 11, 3, 12, 4, 13, 5, 14, puis 6, 7, 8. Les pairs, dans cet ordre : <code class="ml">[10; 2; 12; 4; 14; 6; 8]</code> ; les impairs : <code class="ml">[1; 11; 3; 13; 5; 7]</code>.</p>' },
      { t: 'Les réponses de Caml', html: M['p2021-ex4.all'] }],
    answer: '<ol><li><code data-ml-ans>val aux : (\'a -&gt; bool) -&gt; \'a -&gt; \'a list * \'a list -&gt; \'a list * \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>- : int list * int list = ([10; 0; 2], [1; 3])</code></li><li><code data-ml-ans>val mystery : (\'a -&gt; bool) -&gt; \'a list * \'a list -&gt; \'a list * \'a list = &lt;fun&gt;</code></li><li>Erreur (<code class="ml">f</code> a deux paramètres, <code class="ml">mystery</code> attend un prédicat à un paramètre).</li><li><code data-ml-ans>- : int list * int list = ([10; 2; 12; 4; 14; 6; 8], [1; 11; 3; 13; 5; 7])</code></li></ol>',
    traps: [
      'Donner une valeur à la phrase 4 : Caml refuse <code class="ml">mystery f</code> (« Erreur »), car <code class="ml">f</code> a deux paramètres.',
      'Oublier que <code class="ml">aux</code> ajoute en tête : la phrase 2 donne <code class="ml">([10; 0; 2], [1; 3])</code>, pas <code class="ml">[0; 2; 10]</code>.',
      'Mélanger l’ordre : <code class="ml">aux p e1 (aux p e2 …)</code> place <code class="ml">e1</code> avant <code class="ml">e2</code>.',
      'Croire que la plus longue liste est tronquée : le cas <code class="ml">(e1::l1, [])</code> continue jusqu’au bout.',
      'Oublier les réponses des deux définitions (<code class="ml">val aux : …</code> et <code class="ml">val mystery : …</code>).'],
    grading: '4 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });


  /* =====================================================================
     Partiel du 9 novembre 2020 (promo 2025), partie 2 Caml sur 15
     ===================================================================== */
  M['p2020-ex2.sol'] = repl(
    '# let rec delete x = function',
    '      [] -> []',
    '    | h::q when h > x -> h :: q',
    '    | h::q when h = x -> q',
    '    | h::q -> h::delete x q ;;',
    "val delete : 'a -> 'a list -> 'a list = <fun>");
  M['p2020-ex2.chk'] = repl(
    '# delete 4 [1; 2; 2; 3; 4; 4; 4; 5];;',
    '- : int list = [1; 2; 2; 3; 4; 4; 5]',
    '# delete 0 [1; 2; 3] ;;',
    '- : int list = [1; 2; 3]',
    '# delete 9 [1; 2; 3] ;;',
    '- : int list = [1; 2; 3]',
    '# delete 3 [] ;;',
    '- : int list = []',
    '# delete 2 [1; 3; 2] ;;',
    '- : int list = [1; 3; 2]');
  X.push({
    id: 'p2020-ex2', exam: 'p2020', kind: 'partiel', order: 2, src: 'Partiel nov. 2020 · Ex 2',
    title: 'Suppression dans une liste triée : delete', pts: 4, topics: ['listes', 'listes-triees', 'construire'], lvl: 1, time: 8,
    intro: '<p>Écrire la fonction <code class="ml">delete x list</code> qui supprime de la liste <code class="ml">list</code> triée en ordre croissant la première occurrence de la valeur <code class="ml">x</code> (si elle est présente).</p>',
    hints: [
      'La liste est triée en ordre croissant : en la parcourant, dès qu’on voit un élément plus grand que <code class="ml">x</code>, on sait que <code class="ml">x</code> n’est pas plus loin.',
      'Trois cas pour <code class="ml">h :: q</code> : <code class="ml">h &gt; x</code> (on s’arrête, rien à supprimer), <code class="ml">h = x</code> (on supprime cette occurrence et on garde la suite), sinon on garde <code class="ml">h</code> et on continue.',
      'Et la liste vide ? <code class="ml">x</code> est absent : on rend la liste vide, sans exception (« si elle est présente »).'],
    solution: [
      { t: 'Le principe', html: '<p>On parcourt la liste et on s’arrête dès que la réponse est connue : soit on trouve <code class="ml">x</code> (on le retire, la suite ne change pas), soit on dépasse <code class="ml">x</code> (il est absent, la liste ne change pas). Le sujet ne donne aucun exemple ; un <code class="ml">x</code> absent n’est pas une erreur.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">[]</code> → <code class="ml">[]</code> : <code class="ml">x</code> est absent.</li><li><code class="ml">h :: q</code> avec <code class="ml">h &gt; x</code> → <code class="ml">h :: q</code>, la liste elle-même : la liste est croissante, <code class="ml">x</code> ne peut pas être plus loin.</li><li><code class="ml">h :: q</code> avec <code class="ml">h = x</code> → <code class="ml">q</code> : seule la première occurrence est retirée.</li><li><code class="ml">h :: q</code> sinon (<code class="ml">h &lt; x</code>) → <code class="ml">h :: delete x q</code>.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel, avec son exemple. Le sujet n’en donnait aucun.</p>' + M['p2020-ex2.sol'] },
      { t: 'Vérifier', html: '<p>L’exemple du corrigé, puis : arrêt immédiat (1 &gt; 0), valeur absente plus grande que tout, liste vide. Le dernier appel montre ce que coûte l’arrêt anticipé si la liste n’est pas triée : 3 &gt; 2 arrête la recherche, le 2 n’est pas supprimé. C’est normal, l’énoncé garantit une liste triée.</p>' + M['p2020-ex2.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val delete : \'a -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Supprimer toutes les occurrences : seulement la première (<code class="ml">delete 4 [1; 2; 2; 3; 4; 4; 4; 5]</code> garde deux 4).',
      'Parcourir toute la liste quand <code class="ml">x</code> est absent : la liste est triée, on s’arrête dès que <code class="ml">h &gt; x</code>.',
      'Déclencher une exception quand <code class="ml">x</code> est absent : « si elle est présente » veut dire que la liste est alors rendue inchangée.',
      'Rendre <code class="ml">q</code> dans le cas <code class="ml">h &gt; x</code> : on perdrait <code class="ml">h</code>.'],
    grading: '4 points pour l’exercice, sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14. C’est aussi l’exercice 3.2 du TD listes de cette année.'
  });

  M['p2020-ex4.ex'] = repl(
    '# search_both [12; 5; -4; 0; 7; 21; 3] 5 0;;',
    '- : bool = true',
    '# search_both [12; 5; -4; 0; 7; 21; 3] 21 (-4) ;;',
    '- : bool = true',
    '# search_both [12; 5; -4; 0; 7; 21; 3] 0 42;;',
    '- : bool = false');
  M['p2020-ex4.sol'] = repl(
    '# let search_both list a b =',
    '    let rec present x = function',
    '        [] -> false',
    '      | e :: l -> e = x || present x l',
    '    in',
    '    let rec search = function',
    '        [] -> false',
    '      | e :: l ->',
    '          if e = a then',
    '            present b l',
    '          else',
    '            if e = b then',
    '              present a l',
    '            else',
    '              search l',
    '    in',
    '      search list ;;',
    "val search_both : 'a list -> 'a -> 'a -> bool = <fun>");
  M['p2020-ex4.chk'] = repl(
    '# search_both [12; 5; -4; 0; 7; 21; 3] 5 0;;',
    '- : bool = true',
    '# search_both [12; 5; -4; 0; 7; 21; 3] 21 (-4) ;;',
    '- : bool = true',
    '# search_both [12; 5; -4; 0; 7; 21; 3] 0 42;;',
    '- : bool = false',
    '# search_both [] 1 2 ;;',
    '- : bool = false');
  M['p2020-ex4.off'] = repl(
    '# let search v1 v2 l =',
    '    let rec aux l found1 found2 = match l with',
    '        [] -> false',
    '       |e::l -> if e = v1 then',
    '                    found2 || aux l true false',
    '                else',
    '                if e = v2 then',
    '                    found1 || aux l false true',
    '                else',
    '                    aux l found1 found2',
    '    in aux l false false',
    '  ;;',
    "val search : 'a -> 'a -> 'a list -> bool = <fun>",
    '# search 21 (-4) [12; 5; -4; 0; 7; 21; 3] ;;',
    '- : bool = true');
  X.push({
    id: 'p2020-ex4', exam: 'p2020', kind: 'partiel', order: 4, src: 'Partiel nov. 2020 · Ex 4',
    title: 'Recherche double : search_both', pts: 4, topics: ['listes', 'accumulateur'], lvl: 2, time: 10,
    intro: '<p>Écrire la fonction <code class="ml">search_both list a b</code> qui vérifie si les deux valeurs <code class="ml">a</code> et <code class="ml">b</code> distinctes sont présentes dans la liste <code class="ml">list</code>.</p><p>Exemples d’application :</p>' + M['p2020-ex4.ex'],
    hints: [
      'Le plus simple : une fonction qui dit si une valeur est présente, appelée deux fois. Cela marche, mais la liste est parcourue deux fois.',
      'Un seul parcours : avance jusqu’à trouver <code class="ml">a</code> ou <code class="ml">b</code>. Si tu trouves <code class="ml">a</code>, il reste à chercher <code class="ml">b</code> dans la suite seulement, et inversement.',
      'Autre idée : deux paramètres booléens (déjà vu <code class="ml">a</code> ? déjà vu <code class="ml">b</code> ?), et la réponse <code class="ml">true</code> dès que les deux sont vrais.'],
    solution: [
      { t: 'Le principe', html: '<p>Un seul parcours, qui s’arrête dès que la réponse est connue. On avance jusqu’à la première des deux valeurs : si c’est <code class="ml">a</code>, il ne reste qu’à chercher <code class="ml">b</code> dans la suite ; si c’est <code class="ml">b</code>, à chercher <code class="ml">a</code>. Si la liste se termine avant, aucune des deux n’est présente.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">present x l</code> : <code class="ml">[]</code> → <code class="ml">false</code> ; <code class="ml">e :: l</code> → <code class="ml">e = x || present x l</code> (<code class="ml">||</code> s’arrête au premier <code class="ml">true</code>).</li><li><code class="ml">search</code> : <code class="ml">[]</code> → <code class="ml">false</code> ; <code class="ml">e :: l</code> avec <code class="ml">e = a</code> → <code class="ml">present b l</code> ; avec <code class="ml">e = b</code> → <code class="ml">present a l</code> ; sinon <code class="ml">search l</code>.</li></ul><p>Chercher dans la suite seulement suffit : si l’autre valeur était plus tôt, on l’aurait trouvée en premier.</p>' },
      { t: 'Le code et la réponse de Caml', html: M['p2020-ex4.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les trois exemples du sujet (dans le deuxième, -4 est avant 21) et la liste vide.</p>' + M['p2020-ex4.chk'] },
      { t: 'Le corrigé officiel', html: '<p>Il donne deux versions justes, mais nommées <code class="ml">search v1 v2 l</code>, avec la liste en dernier : à l’examen, garde le nom et l’ordre des paramètres de l’énoncé. Sa première version est celle de l’étape 3. La seconde garde deux booléens, « déjà vu v1 » et « déjà vu v2 » :</p>' + M['p2020-ex4.off'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val search_both : \'a list -&gt; \'a -&gt; \'a -&gt; bool = &lt;fun&gt;</code>.</p>',
    traps: [
      'Renommer la fonction ou changer l’ordre des paramètres comme le corrigé officiel : garde <code class="ml">search_both list a b</code>.',
      '<code class="ml">present a list &amp;&amp; present b list</code> : juste, mais deux parcours ; l’idée attendue est un seul parcours qui s’arrête dès que les deux valeurs sont trouvées.',
      'Après avoir trouvé <code class="ml">a</code>, chercher <code class="ml">b</code> depuis le début de la liste : la suite suffit.',
      'Supposer que <code class="ml">a</code> est avant <code class="ml">b</code> : dans le deuxième exemple, -4 est avant 21.'],
    grading: '4 points pour l’exercice, sans détail.',
    official: false, note: 'Correction rédigée et exécutée avec OCaml 4.14, sur l’idée de la première version du corrigé officiel, qui nomme la fonction search v1 v2 l (étape 5).'
  });

  M['p2020-ex5.fn'] = ml(
    'let go = function',
    '    [] -> []',
    '  | e :: list ->',
    '    let rec what x = function',
    '          [] -> []',
    '       | e :: list -> ( e * x ) ::( what e list )',
    '    in',
    '    what e list ;;');
  M['p2020-ex5.q'] = repl(
    '# go [1; 1; 1; 1; 1] ;;',
    '# go [42] ;;',
    '# go [1; 2; 3; 4; 5] ;;',
    '# go [2; 21; 2; 21; 2; 21] ;;');
  M['p2020-ex5.trace'] = ml(
    'go [1; 2; 3; 4; 5]',
    '= what 1 [2; 3; 4; 5]',
    '= 2*1 :: what 2 [3; 4; 5]',
    '= 2*1 :: 3*2 :: what 3 [4; 5]',
    '= 2*1 :: 3*2 :: 4*3 :: what 4 [5]',
    '= 2*1 :: 3*2 :: 4*3 :: 5*4 :: what 5 []',
    '= [2; 6; 12; 20]');
  M['p2020-ex5.evals'] = repl(
    '# let go = function',
    '      [] -> []',
    '    | e :: list ->',
    '      let rec what x = function',
    '            [] -> []',
    '         | e :: list -> ( e * x ) ::( what e list )',
    '      in',
    '      what e list ;;',
    'val go : int list -> int list = <fun>',
    '# go [1; 1; 1; 1; 1] ;;',
    '- : int list = [1; 1; 1; 1]',
    '# go [42] ;;',
    '- : int list = []',
    '# go [1; 2; 3; 4; 5] ;;',
    '- : int list = [2; 6; 12; 20]',
    '# go [2; 21; 2; 21; 2; 21] ;;',
    '- : int list = [42; 42; 42; 42; 42]');
  X.push({
    id: 'p2020-ex5', exam: 'p2020', kind: 'partiel', order: 5, src: 'Partiel nov. 2020 · Ex 5',
    title: 'Mystery : go et what', pts: 2, topics: ['listes', 'mystery', 'evaluation'], lvl: 1, time: 6,
    intro: '<p>Soit la fonction go définie ci-dessous</p>' + M['p2020-ex5.fn'] + '<p>Donner les résultats des évaluations successives des phrases suivantes.</p>' + M['p2020-ex5.q'],
    hints: [
      '<code class="ml">go</code> sépare la tête <code class="ml">e</code> du reste, puis appelle <code class="ml">what e list</code>. Dans <code class="ml">what</code>, le <code class="ml">e</code> du motif masque celui de <code class="ml">go</code>.',
      '<code class="ml">what x (e :: list)</code> produit <code class="ml">e * x</code>, puis se rappelle avec <code class="ml">e</code> comme nouveau <code class="ml">x</code>. Que vaut <code class="ml">x</code> à chaque étape ?',
      'Compte les éléments : une liste de n éléments donne n − 1 produits.'],
    solution: [
      { t: 'Ce que fait go', html: '<p><code class="ml">what x lst</code> multiplie chaque élément de <code class="ml">lst</code> par celui qui le précède : le paramètre <code class="ml">x</code> est l’élément précédent, et l’appel récursif passe l’élément courant <code class="ml">e</code> comme nouveau <code class="ml">x</code>. <code class="ml">go</code> lance <code class="ml">what</code> avec la tête comme premier « précédent ». Résultat : la liste des produits de deux voisins, avec un élément de moins que la liste de départ. <code class="ml">e * x</code> impose des entiers : <code class="ml">int list -&gt; int list</code>.</p>' },
      { t: 'Trace de go [1; 2; 3; 4; 5]', html: M['p2020-ex5.trace'] },
      { t: 'Les réponses de Caml', html: '<p>Le corrigé officiel donne aussi la réponse à la définition.</p>' + M['p2020-ex5.evals'] }],
    answer: '<p><code data-ml-ans>val go : int list -&gt; int list = &lt;fun&gt;</code> pour la définition, puis :</p><ul><li><code data-ml-ans>- : int list = [1; 1; 1; 1]</code></li><li><code data-ml-ans>- : int list = []</code></li><li><code data-ml-ans>- : int list = [2; 6; 12; 20]</code></li><li><code data-ml-ans>- : int list = [42; 42; 42; 42; 42]</code></li></ul>',
    traps: [
      'Rendre autant d’éléments que la liste : il y en a un de moins (<code class="ml">go [42]</code> → <code class="ml">[]</code>).',
      'Multiplier toujours par la tête de départ : <code class="ml">x</code> change à chaque appel.',
      'Confondre les deux <code class="ml">e</code> : celui du motif de <code class="ml">what</code> masque celui de <code class="ml">go</code>.',
      'Écrire <code class="ml">\'a list -&gt; \'a list</code> : la multiplication <code class="ml">*</code> impose des entiers.'],
    grading: '2 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });


  /* =====================================================================
     Partiel du 28 octobre 2019 (promo 2024), partie 2 Caml sur 16
     ===================================================================== */
  M['p2019-ex2.ex'] = repl(
    '# is_dominoes [] ;;',
    '- : bool = true',
    '# is_dominoes [(1,2); (2,3); (3,3); (3,6)] ;;',
    '- : bool = true',
    '# is_dominoes [(2,3); (2,4); (1,4)] ;;',
    '- : bool = false');
  M['p2019-ex2.sol'] = repl(
    '# let rec is_dominoes = function',
    '      | [] | _::[] -> true',
    '      | (_, b)::(c, d)::l -> (b = c) && is_dominoes ((c, d)::l) ;;',
    "val is_dominoes : ('a * 'a) list -> bool = <fun>");
  M['p2019-ex2.chk'] = repl(
    '# is_dominoes [] ;;',
    '- : bool = true',
    '# is_dominoes [(1,2); (2,3); (3,3); (3,6)] ;;',
    '- : bool = true',
    '# is_dominoes [(2,3); (2,4); (1,4)] ;;',
    '- : bool = false',
    '# is_dominoes [(5,1)] ;;',
    '- : bool = true');
  M['p2019-ex2.v2'] = repl(
    '# let rec is_dominoes = function',
    '      | [] | [_] -> true',
    '      | (_, b)::(c, _)::_ when b <> c -> false',
    '      | _::(c, d)::l -> is_dominoes ((c, d)::l) ;;',
    "val is_dominoes : ('a * 'a) list -> bool = <fun>");
  M['p2019-ex2.bad'] = repl(
    '# let rec is_dominoes = function',
    '      [] -> true',
    '    | (_, b)::(c, d)::l -> (b = c) && is_dominoes ((c, d)::l) ;;',
    'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
    'Here is an example of a case that is not matched:',
    '(_, _)::[]',
    "val is_dominoes : ('a * 'a) list -> bool = <fun>",
    '# is_dominoes [(1,2); (2,3)] ;;',
    'Exception: Match_failure ("//toplevel//", 1, 22).');
  X.push({
    id: 'p2019-ex2', exam: 'p2019', kind: 'partiel', order: 2, src: 'Partiel oct. 2019 · Ex 2',
    title: 'Dominos : is_dominoes', pts: 4, topics: ['listes', 'filtrage'], lvl: 2, time: 10,
    intro: '<p>Pour cet exercice, on s’intéresse au jeu de Dominos :</p><ul><li>Un domino sera représenté par un couple d’entiers (a, b)</li><li>Une suite de dominos (chaîne) sera donc une liste de couples d’entiers [(a<sub>1</sub>, b<sub>1</sub>); (a<sub>2</sub>, b<sub>2</sub>); …; (a<sub>n</sub>, b<sub>n</sub>)].</li></ul><p>On considère qu’une chaîne de dominos est valide si les parties voisines des dominos ont le même nombre de points (voir les exemples ci-dessous).</p><p>Écrire la fonction <code class="ml">is_dominoes</code> qui vérifie si une chaîne de dominos est valide.</p><p>Exemples d’applications :</p>' + M['p2019-ex2.ex'],
    hints: [
      'Regarder la tête ne suffit pas : il faut comparer deux dominos voisins. Quel motif donne les deux premiers éléments d’une liste ?',
      'Trois cas : la liste vide, la liste d’un seul domino (toujours valides), et <code class="ml">(a, b) :: (c, d) :: l</code>.',
      'Dans le dernier cas, compare <code class="ml">b</code> et <code class="ml">c</code>, puis continue sur la liste privée du premier domino seulement : <code class="ml">(c, d) :: l</code>, pas <code class="ml">l</code>.'],
    solution: [
      { t: 'Le principe', html: '<p>Une chaîne est valide si chaque domino « touche » le suivant : la partie droite <code class="ml">b</code> du premier égale la partie gauche <code class="ml">c</code> du second. Il faut donc regarder deux éléments à la fois, avec le motif <code class="ml">(_, b) :: (c, d) :: l</code>. Les conseils du cours le disent : quand la tête ne suffit pas, trois cas (vide, un élément, au moins deux).</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">[]</code> et <code class="ml">[_]</code> (écrit aussi <code class="ml">_::[]</code>) → <code class="ml">true</code> : rien à comparer.</li><li><code class="ml">(_, b) :: (c, d) :: l</code> → <code class="ml">b = c &amp;&amp; is_dominoes ((c, d) :: l)</code> : on vérifie la jonction, puis la chaîne qui commence au second domino. <code class="ml">&amp;&amp;</code> s’arrête à la première jonction fausse.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est la première des trois versions du corrigé officiel. Le type est <code class="ml">(\'a * \'a) list -&gt; bool</code>, pas <code class="ml">(int * int) list</code> : rien dans le code n’impose des entiers, seulement que <code class="ml">b</code> et <code class="ml">c</code> aient le même type.</p>' + M['p2019-ex2.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les trois exemples du sujet et un domino seul.</p>' + M['p2019-ex2.chk'] },
      { t: 'Deux variantes', html: '<p>Le corrigé officiel donne aussi une version avec un filtre gardé, qui répond <code class="ml">false</code> dès qu’une jonction est fausse (même type) :</p>' + M['p2019-ex2.v2'] + '<p>Sans le cas d’un seul domino, Caml signale le cas oublié, et une chaîne valide finit par une exception : le dernier domino reste seul.</p>' + M['p2019-ex2.bad'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val is_dominoes : (\'a * \'a) list -&gt; bool = &lt;fun&gt;</code>.</p>',
    traps: [
      'Rappeler la fonction sur <code class="ml">l</code> : on saute un domino, et la jonction entre <code class="ml">(c, d)</code> et le suivant n’est jamais vérifiée.',
      'Oublier le cas d’un seul domino : Warning 8, et toute chaîne non vide finit en <code class="ml">Match_failure</code>.',
      'Comparer les mauvaises parties : les parties voisines sont la droite du premier (<code class="ml">b</code>) et la gauche du second (<code class="ml">c</code>).',
      'Écrire <code class="ml">(int * int) list -&gt; bool</code> dans la réponse de Caml : Caml répond <code class="ml">(\'a * \'a) list -&gt; bool</code>.',
      'Exprimer l’égalité par le motif <code class="ml">(a, b) :: (b, d) :: l</code> : Caml refuse une variable liée deux fois dans un motif.'],
    grading: '4 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });

  M['p2019-ex3.ex'] = repl(
    '# remove_nth 5 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    '- : int list = [1; 2; 3; 4; 6; 7; 8; 9]',
    '# remove_nth 10 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    'Exception: Failure "out of bound".',
    '# remove_nth (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    'Exception: Invalid_arg "negative rank".');
  M['p2019-ex3.sol'] = repl(
    '# let remove_nth i list =',
    '    if i < 1 then',
    '      invalid_arg "negative rank"',
    '    else',
    '      let rec del i = function',
    '          [] -> failwith "out of bound"',
    '        | e :: q ->',
    '            if i = 1 then',
    '              q',
    '            else',
    '              e :: del (i-1) q',
    '      in',
    '        del i list ;;',
    "val remove_nth : int -> 'a list -> 'a list = <fun>");
  M['p2019-ex3.chk'] = repl(
    '# remove_nth 5 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    '- : int list = [1; 2; 3; 4; 6; 7; 8; 9]',
    '# remove_nth 10 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    'Exception: Failure "out of bound".',
    '# remove_nth (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    'Exception: Invalid_argument "negative rank".',
    '# remove_nth 9 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    '- : int list = [1; 2; 3; 4; 5; 6; 7; 8]',
    '# remove_nth 1 [7] ;;',
    '- : int list = []',
    '# remove_nth 1 [] ;;',
    'Exception: Failure "out of bound".');
  M['p2019-ex3.off'] = repl(
    '# let remove_nth i list =',
    '    if i < 1 then',
    '      failwith "negative rank"',
    '    else',
    '      let rec del = function',
    '          ([], _)   -> failwith "out of bound"',
    '        | (_::q, 1) -> q',
    '        | (e::q, i) -> e :: del (q, i-1)',
    '      in',
    '        del (list, i) ;;',
    "val remove_nth : int -> 'a list -> 'a list = <fun>",
    '# remove_nth (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
    'Exception: Failure "negative rank".');
  X.push({
    id: 'p2019-ex3', exam: 'p2019', kind: 'partiel', order: 3, src: 'Partiel oct. 2019 · Ex 3',
    title: 'Suppression du ième : remove_nth', pts: 5, topics: ['listes', 'rangs', 'exceptions', 'construire', 'accumulateur'], lvl: 2, time: 12,
    intro: '<p>Écrire la fonction <code class="ml">remove_nth i list</code> qui supprime la valeur à la ième place dans la liste <code class="ml">list</code>. La fonction devra déclencher une exception <code class="ml">Invalid_argument</code> si <code class="ml">i</code> est négatif ou nul, ou une exception <code class="ml">Failure</code> si la liste est trop courte.</p><p>Exemples d’applications :</p>' + M['p2019-ex3.ex'],
    hints: [
      'Deux exceptions de natures différentes : <code class="ml">Invalid_argument</code> pour le rang (un paramètre, testé une fois, dans la fonction chapeau), <code class="ml">Failure</code> pour la liste trop courte (découverte pendant le parcours).',
      'Fais descendre le rang à chaque élément : supprimer le ième de <code class="ml">e :: q</code>, c’est garder <code class="ml">e</code> et supprimer le (i − 1)ème de <code class="ml">q</code>.',
      'Quand le rang vaut 1, l’élément courant est celui à supprimer : on rend <code class="ml">q</code>. Si la liste se vide avant, elle est trop courte.'],
    solution: [
      { t: 'Le principe', html: '<p>La fonction chapeau teste le rang une seule fois : <code class="ml">i &lt; 1</code> → <code class="ml">invalid_arg</code>. La fonction récursive locale <code class="ml">del</code> fait descendre le rang en avançant dans la liste ; c’est elle qui découvre une liste trop courte.</p>' },
      { t: 'Les cas de del', html: '<ul><li><code class="ml">[]</code> → <code class="ml">failwith "out of bound"</code> : il n’y a pas de ième élément.</li><li><code class="ml">e :: q</code> avec <code class="ml">i = 1</code> → <code class="ml">q</code> : on retire <code class="ml">e</code>, la suite est gardée telle quelle.</li><li><code class="ml">e :: q</code> sinon → <code class="ml">e :: del (i-1) q</code>.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: M['p2019-ex3.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les trois exemples du sujet, puis le dernier élément, une liste d’un élément et la liste vide. Pour le troisième exemple, Caml répond <code class="ml">Invalid_argument</code> : le <code class="ml">Invalid_arg</code> imprimé dans le sujet est une coquille, ce constructeur n’existe pas.</p>' + M['p2019-ex3.chk'] },
      { t: 'Le corrigé officiel est faux', html: '<p>Ses trois versions testent le rang avec <code class="ml">failwith "negative rank"</code> : elles déclenchent <code class="ml">Failure</code> au lieu d’<code class="ml">Invalid_argument</code>, contrairement à l’énoncé. Exemple avec la première version :</p>' + M['p2019-ex3.off'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val remove_nth : int -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Écrire <code class="ml">failwith "negative rank"</code> comme le corrigé officiel : l’énoncé exige <code class="ml">Invalid_argument</code>.',
      'Recopier <code class="ml">Invalid_arg</code> : ce constructeur n’existe pas (coquille du sujet) ; <code class="ml">invalid_arg "…"</code> déclenche <code class="ml">Invalid_argument</code>.',
      'Tester le rang dans la fonction récursive : le test est refait à chaque élément.',
      'Rendre la liste inchangée quand elle est trop courte : l’énoncé demande <code class="ml">Failure</code>.',
      'Compter les rangs à partir de 0 : le premier élément est au rang 1.'],
    grading: '5 points pour l’exercice, sans détail.',
    official: false, note: 'Le corrigé officiel déclenche Failure au lieu d’Invalid_argument pour un rang négatif ou nul (étape 5) : correction rédigée, exécutée avec OCaml 4.14.'
  });

  M['p2019-ex4.ex'] = repl(
    '# almost [1; 2; 3; 4; 5] [1; 3; 2; 4; 6];;',
    '- : bool = true',
    '# almost [1; 2; 3; 4; 5] [1; 4; 3; 4; 5];;',
    '- : bool = false');
  M['p2019-ex4.sol'] = repl(
    '# let rec for_all2 p list1 list2 =',
    '     match (list1, list2) with',
    '         ([],[]) -> true',
    '       | (_,[]) | ([],_) -> invalid_arg "for_all2: different lengths"',
    '       | (a::l1,b::l2) -> p a b && for_all2 p l1 l2 ;;',
    "val for_all2 : ('a -> 'b -> bool) -> 'a list -> 'b list -> bool = <fun>");
  M['p2019-ex4.sol2'] = repl(
    '# let almost list1 list2 =',
    '     let near x y = (y - 2 < x) && (x < y + 2)',
    '     in',
    '       for_all2 near list1 list2 ;;',
    'val almost : int list -> int list -> bool = <fun>');
  M['p2019-ex4.chk'] = repl(
    '# almost [1; 2; 3; 4; 5] [1; 3; 2; 4; 6];;',
    '- : bool = true',
    '# almost [1; 2; 3; 4; 5] [1; 4; 3; 4; 5];;',
    '- : bool = false',
    '# almost [1; 2; 3] [1; 2; 3; 4] ;;',
    'Exception: Invalid_argument "for_all2: different lengths".',
    '# almost [1; 7; 3] [1; 2; 3; 4] ;;',
    '- : bool = false',
    '# almost [] [] ;;',
    '- : bool = true');
  X.push({
    id: 'p2019-ex4', exam: 'p2019', kind: 'partiel', order: 4, src: 'Partiels nov. 2017 et oct. 2019 · Ex 4',
    title: 'for_all2, puis almost', pts: 5, topics: ['listes', 'ordre-superieur', 'deux-listes', 'exceptions'], lvl: 2, time: 14,
    intro: '<p>Énoncé d’octobre 2019. Celui de novembre 2017 (exercice 4, 5 points, mêmes exemples) ne diffère que par deux détails : « une fonction de test (un prédicat) à deux paramètres » à la question 1, et une question 2 plus courte, sans la phrase sur l’exception : « Utiliser la fonction for_all2 pour définir une fonction qui vérifie si deux listes sont "quasi-identiques" : les valeurs aux même places ne peuvent différer de 1 au plus. »</p>',
    questions: [
      '<b>1.</b> Écrire la fonction Caml <code class="ml">for_all2</code> dont les spécifications sont les suivantes :<ul><li>Elle prend en paramètre une fonction booléenne (un prédicat) à deux paramètres : <code class="ml">p</code> ainsi que deux listes : [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>] et [b<sub>1</sub>; b<sub>2</sub>; ···; b<sub>n</sub>].</li><li>Elle vérifie si toutes les paires a<sub>i</sub> b<sub>i</sub> vérifient le prédicat p.</li><li>Si elle trouve une paire telle que p a<sub>i</sub> b<sub>i</sub> est faux, elle retourne faux. Sinon, elle déclenche une exception <code class="ml">Invalid_argument</code> si les deux listes sont de longueurs différentes.</li></ul>',
      '<b>2.</b> Utiliser la fonction <code class="ml">for_all2</code> pour définir une fonction qui vérifie si deux listes d’entiers sont "quasi-identiques" : la différence entre deux valeurs à la même place ne peut dépasser 1. Si aucune paire dont la différence dépasse 1 n’a été trouvée et si les deux listes sont de longueurs différentes, elle déclenche une exception.<p>Exemples d’utilisation :</p>' + M['p2019-ex4.ex']],
    hints: [
      'Deux listes : en général quatre cas, ici trois suffisent : les deux vides, les deux non vides, et « l’une vide, l’autre non » (longueurs différentes).',
      '« Si elle trouve une paire fausse, elle retourne faux. Sinon, … exception » : la paire doit être testée avant l’appel récursif. <code class="ml">p a b &amp;&amp; for_all2 p l1 l2</code> le fait : si <code class="ml">p a b</code> est faux, l’appel n’est pas évalué.',
      'Pour <code class="ml">almost</code>, écris le prédicat « l’écart entre <code class="ml">x</code> et <code class="ml">y</code> est au plus 1 » sans <code class="ml">abs</code> (fonction prédéfinie) : deux comparaisons suffisent. Puis une seule ligne : <code class="ml">for_all2 near list1 list2</code>.'],
    solution: [
      { t: 'Le principe de for_all2', html: '<p><code class="ml">for_all2 p [a1; …; an] [b1; …; bn]</code> calcule <code class="ml">p a1 b1 &amp;&amp; p a2 b2 &amp;&amp; … &amp;&amp; p an bn</code>, en s’arrêtant à la première paire fausse. Les longueurs ne se comparent pas à l’avance : on les découvre en arrivant au bout de l’une des listes avant l’autre. Comme une paire fausse arrête tout avant, l’exception n’est déclenchée que si aucune paire fausse n’a été trouvée, exactement comme le demande « Sinon ».</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">true</code> : toutes les paires ont été vérifiées.</li><li><code class="ml">(_, [])</code> ou <code class="ml">([], _)</code> → <code class="ml">invalid_arg "for_all2: different lengths"</code>.</li><li><code class="ml">(a :: l1, b :: l2)</code> → <code class="ml">p a b &amp;&amp; for_all2 p l1 l2</code>.</li></ul><p>Les deux motifs de longueurs différentes sont placés avant le dernier cas, mais ils ne peuvent filtrer que si l’une des listes est vide : l’ordre ne change rien ici.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel de 2019 (première de ses trois versions). Le type de <code class="ml">for_all2</code> montre que les deux listes peuvent avoir des types d’éléments différents.</p>' + M['p2019-ex4.sol'] },
      { t: 'La fonction almost', html: '<p>« La différence ne peut dépasser 1 » : |x − y| ≤ 1, soit y − 2 &lt; x &lt; y + 2 pour des entiers, sans <code class="ml">abs</code>. Le prédicat <code class="ml">near</code> est défini localement, puis passé à <code class="ml">for_all2</code>. La soustraction impose des entiers : <code class="ml">int list -&gt; int list -&gt; bool</code>. L’exception de la question 2 vient de <code class="ml">for_all2</code>, rien à ajouter.</p>' + M['p2019-ex4.sol2'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les deux exemples, puis : longueurs différentes sans paire fausse (exception), paire fausse avant la fin de la liste courte (<code class="ml">false</code>, pas d’exception), deux listes vides.</p>' + M['p2019-ex4.chk'] }],
    answer: '<p>Deux fonctions, chacune suivie de sa réponse de Caml :</p><ul><li><code data-ml-ans>val for_all2 : (\'a -&gt; \'b -&gt; bool) -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code></li><li><code data-ml-ans>val almost : int list -&gt; int list -&gt; bool = &lt;fun&gt;</code></li></ul>',
    traps: [
      'Comparer les longueurs avant de chercher une paire fausse : l’énoncé veut <code class="ml">false</code> dès qu’une paire est fausse, même si les longueurs diffèrent (<code class="ml">almost [1; 7; 3] [1; 2; 3; 4]</code> → <code class="ml">false</code>).',
      'Écrire <code class="ml">abs (x - y) &lt;= 1</code> : <code class="ml">abs</code> est une fonction prédéfinie, interdite.',
      'Réécrire un parcours dans <code class="ml">almost</code> : l’énoncé demande d’utiliser <code class="ml">for_all2</code>.',
      'Oublier le cas <code class="ml">([], [])</code>, qui rend <code class="ml">true</code>.',
      'Inverser l’ordre dans <code class="ml">&amp;&amp;</code> (<code class="ml">for_all2 p l1 l2 &amp;&amp; p a b</code>) : la liste est parcourue jusqu’au bout avant de tester la paire, et l’exception passe avant le <code class="ml">false</code>.'],
    grading: '5 points pour l’exercice (en 2017 comme en 2019), sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14. Corrigé officiel d’octobre 2019 ; aucun corrigé pour 2017. C’est aussi l’exercice 2.8 du TD ordre supérieur de cette année.'
  });

  M['p2019-ex5.q'] = repl(
    '# let mystery a b =',
    '    let rec what = function',
    '        ([], _) -> true',
    '      | (_, []) -> false',
    '      | (e::l1, f::l2) -> (e = f) && what (l1, l2)',
    '    in',
    '    let rec is_that x y = match y with',
    '        [] -> 0',
    '      | e::q -> (if what (x, y) then 1 else 0) + (is_that x q)',
    '    in',
    '      is_that a b ;;',
    '# mystery [1; 2] [1; 2] ;;',
    '# mystery [1; 2] [1; 1; 2; 3; 3; 1; 2; 3] ;;',
    '# mystery [1; 2] [2; 1] ;;');
  M['p2019-ex5.all'] = repl(
    '# let mystery a b =',
    '    let rec what = function',
    '        ([], _) -> true',
    '      | (_, []) -> false',
    '      | (e::l1, f::l2) -> (e = f) && what (l1, l2)',
    '    in',
    '    let rec is_that x y = match y with',
    '        [] -> 0',
    '      | e::q -> (if what (x, y) then 1 else 0) + (is_that x q)',
    '    in',
    '      is_that a b ;;',
    "val mystery : 'a list -> 'a list -> int = <fun>",
    '# mystery [1; 2] [1; 2] ;;',
    '- : int = 1',
    '# mystery [1; 2] [1; 1; 2; 3; 3; 1; 2; 3] ;;',
    '- : int = 2',
    '# mystery [1; 2] [2; 1] ;;',
    '- : int = 0');
  M['p2019-ex5.trace'] = ml(
    'is_that [1; 2] [1; 1; 2; 3; 3; 1; 2; 3]',
    '  what ([1; 2], [1; 1; 2; 3; 3; 1; 2; 3])  false   0',
    '  what ([1; 2], [1; 2; 3; 3; 1; 2; 3])     true    1',
    '  what ([1; 2], [2; 3; 3; 1; 2; 3])        false   0',
    '  what ([1; 2], [3; 3; 1; 2; 3])           false   0',
    '  what ([1; 2], [3; 1; 2; 3])              false   0',
    '  what ([1; 2], [1; 2; 3])                 true    1',
    '  what ([1; 2], [2; 3])                    false   0',
    '  what ([1; 2], [3])                       false   0',
    '  [] -> 0                                         total 2');
  M['p2019-ex5.more'] = repl(
    '# mystery [1; 1] [1; 1; 1] ;;',
    '- : int = 2',
    '# mystery [] [1; 2] ;;',
    '- : int = 2');
  X.push({
    id: 'p2019-ex5', exam: 'p2019', kind: 'partiel', order: 5, src: 'Partiel oct. 2019 · Ex 5',
    title: 'Mystery : what et is_that', pts: 2, topics: ['listes', 'mystery', 'evaluation', 'deux-listes'], lvl: 2, time: 8,
    intro: '<p>Donner les résultats des évaluations successives des phrases suivantes.</p>' + M['p2019-ex5.q'],
    hints: [
      '<code class="ml">what (x, y)</code> parcourt deux listes ensemble : quand rend-elle <code class="ml">true</code> ? Essaie <code class="ml">what ([1; 2], [1; 2; 3])</code> puis <code class="ml">what ([1; 2], [2; 1])</code>.',
      '<code class="ml">is_that x y</code> ajoute 1 pour chaque position de <code class="ml">y</code> où <code class="ml">what (x, y)</code> est vrai, en avançant d’un élément à la fois.',
      'N’oublie pas la réponse de Caml à la définition : <code data-ml-ans>val mystery : … = &lt;fun&gt;</code>.'],
    solution: [
      { t: 'what', html: '<p><code class="ml">what (x, y)</code> compare <code class="ml">x</code> et <code class="ml">y</code> élément par élément : si <code class="ml">x</code> est épuisée, c’est <code class="ml">true</code> ; si <code class="ml">y</code> s’épuise avant <code class="ml">x</code>, ou si deux éléments diffèrent, c’est <code class="ml">false</code>. Elle dit donc si <code class="ml">x</code> est un <b>préfixe</b> de <code class="ml">y</code> (le début de <code class="ml">y</code>).</p>' },
      { t: 'is_that', html: '<p><code class="ml">is_that x y</code> teste <code class="ml">what (x, y)</code> sur <code class="ml">y</code>, puis sur sa queue, et ainsi de suite jusqu’à la liste vide, en ajoutant 1 à chaque succès. Elle compte les positions de <code class="ml">y</code> où commence <code class="ml">x</code>. <code class="ml">mystery a b</code> est donc le nombre d’occurrences de la liste <code class="ml">a</code> (éléments consécutifs) dans <code class="ml">b</code>. Rien n’impose des entiers : seul <code class="ml">=</code> sert, d’où <code class="ml">\'a list -&gt; \'a list -&gt; int</code>.</p>' },
      { t: 'Trace de la deuxième phrase', html: '<p>Chaque ligne : la position de <code class="ml">y</code> testée, le résultat de <code class="ml">what</code>, ce qu’elle ajoute.</p>' + M['p2019-ex5.trace'] },
      { t: 'Les réponses de Caml', html: M['p2019-ex5.all'] },
      { t: 'Pour aller plus loin', html: '<p>Les occurrences qui se chevauchent comptent, et la liste vide est un préfixe de chaque position non vide : </p>' + M['p2019-ex5.more'] + '<p>C’est l’exercice 4.3 « sublist » du TD listes de cette année, avec les mêmes exemples ; le TD attend <code class="ml">0</code> pour <code class="ml">sublist [] [1; 2]</code> : un corrigé du TD doit traiter la liste vide à part.</p>' }],
    answer: '<ul><li><code data-ml-ans>val mystery : \'a list -&gt; \'a list -&gt; int = &lt;fun&gt;</code></li><li><code data-ml-ans>- : int = 1</code></li><li><code data-ml-ans>- : int = 2</code></li><li><code data-ml-ans>- : int = 0</code></li></ul><p>mystery a b compte les occurrences de la liste a (éléments consécutifs) dans la liste b.</p>',
    traps: [
      'Oublier la réponse de la définition (<code class="ml">val mystery : \'a list -&gt; \'a list -&gt; int = &lt;fun&gt;</code>).',
      'Compter des éléments communs au lieu de sous-listes consécutives : <code class="ml">mystery [1; 2] [2; 1]</code> → <code class="ml">0</code>.',
      'Écrire <code class="ml">int list -&gt; int list -&gt; int</code> : rien n’impose des entiers, seulement l’égalité.',
      'S’arrêter à la première occurrence : <code class="ml">is_that</code> parcourt toute la liste.'],
    grading: '2 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });


  /* =====================================================================
     Contrôle S1# du 23 avril 2019 (promo 2024), exercices 2 à 4 sur 14
     ===================================================================== */
  M['p2019d-ex2.ex1'] = repl(
    '# insert 12 [1;5;9;13;15;28] (function x -> function y -> x <= y) ;;',
    '- : int list = [1; 5; 9; 12; 13; 15; 28]',
    '# insert 12 [28;15;13;9;5;1] (function a -> function b -> a >= b) ;;',
    '- : int list = [28; 15; 13; 12; 9; 5; 1]',
    '# insert 12 [] (function a -> function b -> a >= b) ;;',
    '- : int list = [12]');
  M['p2019d-ex2.ex2'] = repl(
    '# insertion_sort (function x -> function y -> x >= y) [12;5;47;1;23;0;48;35;3;14;9;11;8;7;65] ;;',
    '- : int list = [65; 48; 47; 35; 23; 14; 12; 11; 9; 8; 7; 5; 3; 1; 0]',
    '# let longer s1 s2 = String.length s1 > String.length s2 ;;',
    'val longer : string -> string -> bool = <fun>',
    '# insertion_sort longer ["Caml"; "C#"; "Python"; "C"; "Javascript"];;',
    '- : string list = ["Javascript"; "Python"; "Caml"; "C#"; "C"]');
  M['p2019d-ex2.sol'] = repl(
    '# let rec insert x list comp =',
    '    match list with',
    '      | [] -> x::[]',
    '      | e::l when comp x e -> x::e::l',
    '      | e::l -> e :: insert x l comp ;;',
    "val insert : 'a -> 'a list -> ('a -> 'a -> bool) -> 'a list = <fun>",
    '# let rec insertion_sort comp = function',
    '      [] -> []',
    '    | e::l -> insert e (insertion_sort comp l) comp ;;',
    "val insertion_sort : ('a -> 'a -> bool) -> 'a list -> 'a list = <fun>");
  M['p2019d-ex2.chk'] = repl(
    '# insert 12 [1;5;9;13;15;28] (function x -> function y -> x <= y) ;;',
    '- : int list = [1; 5; 9; 12; 13; 15; 28]',
    '# insert 12 [] (function a -> function b -> a >= b) ;;',
    '- : int list = [12]',
    '# insertion_sort (function x -> function y -> x >= y) [12;5;47;1;23;0;48;35;3;14;9;11;8;7;65] ;;',
    '- : int list = [65; 48; 47; 35; 23; 14; 12; 11; 9; 8; 7; 5; 3; 1; 0]',
    '# let longer s1 s2 = String.length s1 > String.length s2 ;;',
    'val longer : string -> string -> bool = <fun>',
    '# insertion_sort longer ["Caml"; "C#"; "Python"; "C"; "Javascript"];;',
    '- : string list = ["Javascript"; "Python"; "Caml"; "C#"; "C"]');
  M['p2019d-ex2.term'] = repl(
    '# let insertion_sort_term comp l =',
    '    let rec sort accu = function',
    '         [] -> accu',
    '       | e::l -> sort (insert e accu comp) l',
    '    in',
    '    sort [] l ;;',
    "val insertion_sort_term : ('a -> 'a -> bool) -> 'a list -> 'a list = <fun>",
    '# insertion_sort_term longer ["Caml"; "C#"; "Python"; "C"; "Javascript"];;',
    '- : string list = ["Javascript"; "Python"; "Caml"; "C#"; "C"]',
    '# insertion_sort longer ["ab"; "cd"; "e"] ;;',
    '- : string list = ["cd"; "ab"; "e"]',
    '# insertion_sort_term longer ["ab"; "cd"; "e"] ;;',
    '- : string list = ["ab"; "cd"; "e"]');
  X.push({
    id: 'p2019d-ex2', exam: 'p2019d', kind: 'partiel', order: 2, src: 'Partiel S1# avr. 2019 · Ex 2',
    title: 'Tri par insertion : insert, puis insertion_sort', pts: 7, topics: ['listes', 'ordre-superieur', 'listes-triees', 'construire', 'recursivite'], lvl: 2, time: 18,
    intro: '<p>La feuille de réponses donnait les spécifications : « La fonction insert x list comp ajoute l’élément x à sa place dans la liste list triée selon l’ordre donné par la fonction comp. » et « La fonction insertion_sort comp list trie la liste list selon l’ordre donné par la fonction comp. »</p>',
    questions: [
      '<b>1.</b> Écrire la fonction <code class="ml">insert</code> qui ajoute un élément à sa place dans une liste triée selon un ordre donné par une fonction de comparaison.<p>Exemples d’applications :</p>' + M['p2019d-ex2.ex1'],
      '<b>2.</b> Utiliser la fonction <code class="ml">insert</code> pour écrire une fonction qui trie une liste selon un ordre donné par une fonction de comparaison.<p>Exemples d’applications :</p>' + M['p2019d-ex2.ex2']],
    hints: [
      'L’ordre des paramètres est fixé par les exemples et la feuille de réponses : <code class="ml">insert x list comp</code> (la comparaison en dernier), <code class="ml">insertion_sort comp list</code>.',
      'Pour <code class="ml">insert</code> : si la liste est vide, le résultat est <code class="ml">[x]</code> ; si <code class="ml">comp x e</code> est vrai, <code class="ml">x</code> se place devant <code class="ml">e</code> et on s’arrête ; sinon <code class="ml">e</code> reste devant et on insère plus loin.',
      'Pour <code class="ml">insertion_sort</code> : trie d’abord la queue (appel récursif), puis insère la tête dans ce résultat avec <code class="ml">insert</code>.'],
    solution: [
      { t: 'Le principe de insert', html: '<p>La liste est triée selon <code class="ml">comp</code>. On avance tant que <code class="ml">x</code> ne doit pas passer devant l’élément courant ; dès que <code class="ml">comp x e</code> est vrai, <code class="ml">x</code> se place devant <code class="ml">e</code> et la suite, déjà triée, est gardée telle quelle.</p><ul><li><code class="ml">[]</code> → <code class="ml">x::[]</code>, c’est-à-dire <code class="ml">[x]</code>.</li><li><code class="ml">e::l</code> quand <code class="ml">comp x e</code> → <code class="ml">x::e::l</code>.</li><li><code class="ml">e::l</code> sinon → <code class="ml">e :: insert x l comp</code>.</li></ul>' },
      { t: 'Le principe de insertion_sort', html: '<p>La liste vide est triée ; pour <code class="ml">e::l</code>, on trie <code class="ml">l</code> (appel récursif), puis on insère <code class="ml">e</code> à sa place dans le résultat. <code class="ml">insertion_sort comp</code> est écrite avec <code class="ml">function</code> : son second paramètre, la liste, est filtré directement.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel (« Version profs »).</p>' + M['p2019d-ex2.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Des exemples du sujet. <code class="ml">String.length</code> apparaît seulement dans l’exemple, pour définir l’ordre <code class="ml">longer</code> : dans ta fonction, aucune fonction prédéfinie.</p>' + M['p2019d-ex2.chk'] },
      { t: 'La version terminale du corrigé', html: '<p>Le corrigé donne aussi une version avec un accumulateur : on insère les éléments un par un dans une liste triée qui grandit. Mêmes résultats sur les exemples, mais pas toujours avec des éléments « égaux » pour l’ordre : <code class="ml">"ab"</code> et <code class="ml">"cd"</code> ont la même longueur, et les deux tris ne les rangent pas dans le même ordre.</p>' + M['p2019d-ex2.term'] },
      { t: 'Retombé en 2024', html: '<p>Le même exercice est revenu à l’examen d’octobre 2024 (<a href="#p2024-ex2">voir la fiche</a>), avec un autre ordre des paramètres : <code class="ml">insert_x x order lst</code>.</p>' }],
    answer: '<p>Deux fonctions, chacune suivie de sa réponse de Caml :</p><ul><li><code data-ml-ans>val insert : \'a -&gt; \'a list -&gt; (\'a -&gt; \'a -&gt; bool) -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>val insertion_sort : (\'a -&gt; \'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li></ul>',
    traps: [
      'Changer l’ordre des paramètres : ici <code class="ml">insert x list comp</code> (comparaison en dernier) ; en 2024 c’était <code class="ml">insert_x x order lst</code>.',
      'Comparer avec <code class="ml">&lt;=</code> au lieu d’appeler <code class="ml">comp</code> : le deuxième exemple (ordre décroissant) serait faux.',
      'Oublier le cas de la liste vide : <code class="ml">insert 12 [] …</code> doit rendre <code class="ml">[12]</code>.',
      'Réécrire une insertion dans le tri au lieu d’utiliser <code class="ml">insert</code>.'],
    grading: '7 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });

  M['p2019d-ex3.ex'] = repl(
    '# assoc 5 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;',
    '- : string = "five"',
    '# assoc 4 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;',
    'Exception: Failure "not found".',
    '# assoc (-1) [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;',
    'Exception: Invalid_argument "k not a natural".');
  M['p2019d-ex3.sol'] = repl(
    '# let assoc k list =',
    '    if k <= 0 then',
    '      invalid_arg "k not a natural"',
    '    else',
    '      let rec search = function',
    '          [] -> failwith "not found"',
    '        | (key, value) :: l ->',
    '            if key = k then',
    '              value',
    '            else',
    '              if k < key then',
    '                failwith "not found"',
    '              else',
    '                search l',
    '      in',
    '        search list ;;',
    "val assoc : int -> (int * 'a) list -> 'a = <fun>");
  M['p2019d-ex3.chk'] = repl(
    '# assoc 5 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;',
    '- : string = "five"',
    '# assoc 4 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;',
    'Exception: Failure "not found".',
    '# assoc (-1) [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;',
    'Exception: Invalid_argument "k not a natural".',
    '# assoc 0 [(1, "one")] ;;',
    'Exception: Invalid_argument "k not a natural".',
    '# assoc 9 [(1, "one"); (8, "eight")] ;;',
    'Exception: Failure "not found".',
    "# assoc 1 [(1, 'a'); (2, 'b')] ;;",
    "- : char = 'a'");
  X.push({
    id: 'p2019d-ex3', exam: 'p2019d', kind: 'partiel', order: 3, src: 'Partiels nov. 2017 et S1# avr. 2019 · Ex 3',
    title: 'Association : assoc', pts: 5, topics: ['listes', 'listes-triees', 'exceptions', 'filtrage', 'accumulateur'], lvl: 2, time: 12,
    intro: '<p>Énoncé d’avril 2019 ; celui de novembre 2017 (exercice 3, 4 points) est identique, avec les mêmes exemples.</p><p>Écrire la fonction <code class="ml">assoc k list</code> où <code class="ml">list</code> est une liste de couples (<em>key</em>, <em>value</em>) triés par clés (key) croissantes. Les clés sont des entiers naturels non nuls. Elle retourne la valeur (value) associée à la clé (key) <code class="ml">k</code>. Si <code class="ml">k</code> n’est pas valide ou si aucun couple n’a pour clé <code class="ml">k</code>, elle déclenche une exception.</p><p>Exemples d’applications :</p>' + M['p2019d-ex3.ex'],
    hints: [
      'Deux exceptions, données par les exemples : <code class="ml">Invalid_argument</code> pour une clé invalide (k ≤ 0 : les clés sont non nulles), testée une fois dans la fonction chapeau ; <code class="ml">Failure "not found"</code> pendant la recherche.',
      'Le motif <code class="ml">(key, value) :: l</code> donne directement la clé et la valeur du premier couple.',
      'La liste est triée par clés croissantes : dès qu’une clé dépasse <code class="ml">k</code>, <code class="ml">k</code> n’est pas plus loin. Inutile de finir le parcours.'],
    solution: [
      { t: 'Le principe', html: '<p>Une fonction chapeau vérifie <code class="ml">k</code> une seule fois : les clés sont des entiers naturels non nuls, donc <code class="ml">k &lt;= 0</code> n’est pas une clé valide. Une fonction récursive locale <code class="ml">search</code> parcourt les couples, <code class="ml">k</code> restant visible.</p>' },
      { t: 'Les cas de search', html: '<ul><li><code class="ml">[]</code> → <code class="ml">failwith "not found"</code> : aucun couple n’a la clé <code class="ml">k</code>.</li><li><code class="ml">(key, value) :: l</code> avec <code class="ml">key = k</code> → <code class="ml">value</code>.</li><li><code class="ml">(key, value) :: l</code> avec <code class="ml">k &lt; key</code> → <code class="ml">failwith "not found"</code> : la liste est triée, les clés suivantes sont encore plus grandes (arrêt anticipé).</li><li>sinon → <code class="ml">search l</code>.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel d’avril 2019, sans son <code class="ml">rec</code> inutile : il écrit <code class="ml">let rec assoc</code>, alors que seule <code class="ml">search</code> est récursive (Caml l’accepte sans rien dire). Le type montre que la valeur peut être de n’importe quel type, la clé étant un entier.</p>' + M['p2019d-ex3.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les trois exemples, puis <code class="ml">k = 0</code> (clé non valide), une clé absente plus grande que toutes, et des valeurs d’un autre type.</p>' + M['p2019d-ex3.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val assoc : int -&gt; (int * \'a) list -&gt; \'a = &lt;fun&gt;</code>.</p>',
    traps: [
      'Parcourir toute la liste quand la clé est absente : la liste est triée, on s’arrête dès que <code class="ml">key &gt; k</code>.',
      'Tester <code class="ml">k &lt; 0</code> au lieu de <code class="ml">k &lt;= 0</code> : les clés sont « non nulles », 0 n’est pas une clé valide.',
      'Tester <code class="ml">k</code> à chaque appel récursif : c’est le rôle de la fonction chapeau.',
      'Inverser les deux exceptions : <code class="ml">Invalid_argument</code> pour <code class="ml">k</code>, <code class="ml">Failure</code> pour une clé absente, comme dans les exemples.',
      'Renvoyer le couple au lieu de la valeur : <code class="ml">assoc 5 …</code> rend <code class="ml">"five"</code>.'],
    grading: '5 points en 2019 (4 en 2017), sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14. Corrigé officiel d’avril 2019 ; aucun corrigé pour 2017. C’est aussi l’exercice 5.1 du TD listes de cette année.'
  });

  M['p2019d-ex4.fn'] = repl(
    '# let mystery = function',
    '        [] -> failwith "..."',
    '      | e::f::l -> (let rec aux_mystery m1 m2 = function',
    '                         [] -> m2',
    '                      | e::l -> if e < m1 then aux_mystery e m1 l',
    '                                  else if e < m2 then aux_mystery m1 e l',
    '                                  else aux_mystery m1 m2 l',
    '                    in if e < f then aux_mystery e f l else aux_mystery f e l);;');
  M['p2019d-ex4.q'] = repl(
    '# mystery [1; 3; 4; 2];;',
    '# mystery [3.5; 8.2; 9.5; 4.0];;',
    "# mystery ['a'];;");
  M['p2019d-ex4.trace'] = ml(
    'mystery [1; 3; 4; 2]          (* e = 1, f = 3, 1 < 3 *)',
    '= aux_mystery 1 3 [4; 2]      (* 4 >= 1, 4 >= 3: nothing changes *)',
    '= aux_mystery 1 3 [2]         (* 2 >= 1, 2 < 3: m2 becomes 2 *)',
    '= aux_mystery 1 2 []',
    '= 2');
  M['p2019d-ex4.all'] = repl(
    '# let mystery = function',
    '        [] -> failwith "..."',
    '      | e::f::l -> (let rec aux_mystery m1 m2 = function',
    '                         [] -> m2',
    '                      | e::l -> if e < m1 then aux_mystery e m1 l',
    '                                  else if e < m2 then aux_mystery m1 e l',
    '                                  else aux_mystery m1 m2 l',
    '                    in if e < f then aux_mystery e f l else aux_mystery f e l);;',
    'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
    'Here is an example of a case that is not matched:',
    '_::[]',
    "val mystery : 'a list -> 'a = <fun>",
    '# mystery [1; 3; 4; 2];;',
    '- : int = 2',
    '# mystery [3.5; 8.2; 9.5; 4.0];;',
    '- : float = 4.',
    "# mystery ['a'];;",
    'Exception: Match_failure ("//toplevel//", 1, 14).',
    '# mystery [] ;;',
    'Exception: Failure "...".',
    '# mystery [2; 2; 5] ;;',
    '- : int = 2');
  X.push({
    id: 'p2019d-ex4', exam: 'p2019d', kind: 'partiel', order: 4, src: 'Partiel S1# avr. 2019 · Ex 4',
    title: 'Mystery : deux paramètres m1 et m2', pts: 2, topics: ['listes', 'mystery', 'evaluation', 'accumulateur', 'filtrage'], lvl: 2, time: 8,
    intro: '<p>Soit la fonction mystery définie ci-dessous</p>' + M['p2019d-ex4.fn'] + '<p>Phrases données sur les feuilles de réponses :</p>' + M['p2019d-ex4.q'],
    questions: [
      '<b>1.</b> Donner les résultats des évaluations successives des phrases données sur les feuilles de réponses.',
      '<b>2.</b> Que retourne la fonction mystery ?'],
    hints: [
      'Regarde les motifs de <code class="ml">mystery</code> : <code class="ml">[]</code> et <code class="ml">e::f::l</code>. Lequel filtre une liste d’un seul élément ?',
      '<code class="ml">aux_mystery m1 m2</code> garde deux valeurs, avec m1 ≤ m2 au départ. Un élément plus petit que <code class="ml">m1</code> prend la place de <code class="ml">m1</code> (et l’ancien <code class="ml">m1</code> devient <code class="ml">m2</code>) ; un élément entre les deux remplace <code class="ml">m2</code>.',
      'À la fin, la fonction rend <code class="ml">m2</code>. Que représentent <code class="ml">m1</code> et <code class="ml">m2</code> après avoir vu toute la liste ?'],
    solution: [
      { t: 'Le type et l’avertissement', html: '<p>La liste est filtrée avec <code class="ml">[]</code> et <code class="ml">e::f::l</code> : il manque la liste d’un élément. Caml affiche un Warning 8 (exemple de cas non filtré : <code class="ml">_::[]</code>), puis le type : les éléments sont comparés avec <code class="ml">&lt;</code>, rien n’impose leur type, et la fonction rend <code class="ml">m2</code>, un élément de la liste : <code class="ml">\'a list -&gt; \'a</code>.</p>' },
      { t: 'Ce que calcule aux_mystery', html: '<p><code class="ml">m1</code> est le plus petit élément vu, <code class="ml">m2</code> le deuxième plus petit. Au départ, les deux premiers éléments, rangés (<code class="ml">if e &lt; f</code>). Ensuite, pour chaque élément <code class="ml">e</code> : s’il est plus petit que <code class="ml">m1</code>, il devient le plus petit et l’ancien <code class="ml">m1</code> passe deuxième ; sinon, s’il est plus petit que <code class="ml">m2</code>, il devient deuxième ; sinon rien ne change. À la fin, on rend <code class="ml">m2</code> : <b>le deuxième plus petit élément</b> de la liste.</p>' + M['p2019d-ex4.trace'] },
      { t: 'Les réponses de Caml', html: '<p>Les trois phrases de la feuille, puis deux de plus : la liste vide déclenche le <code class="ml">failwith</code>, et un doublon compte deux fois (<code class="ml">[2; 2; 5]</code> → <code class="ml">2</code>). Caml écrit <code class="ml">4.</code> et non <code class="ml">4.0</code>. La position dans <code class="ml">Match_failure</code> (ligne 1, colonne 14 : le mot <code class="ml">function</code>) dépend de la façon dont la définition est tapée.</p>' + M['p2019d-ex4.all'] },
      { t: 'Le corrigé officiel', html: '<p>Il donne <code class="ml">val mystery : (\'a list) -&gt; \'a</code>, <code class="ml">- : float = 4.0</code> et « Une erreur (Exception : match_failure) », « hors warning éventuels » : pour un Mystery, l’avertissement n’est pas exigé. C’est aussi l’exercice 1.6 « second » du TD listes de cette année, où la liste trop courte déclenche <code class="ml">Failure "second: Not enough values"</code>.</p>' }],
    answer: '<ol><li><code data-ml-ans>val mystery : \'a list -&gt; \'a = &lt;fun&gt;</code> (après un Warning 8), <code data-ml-ans>- : int = 2</code>, <code data-ml-ans>- : float = 4.</code>, <code data-ml-ans>Exception: Match_failure ("//toplevel//", 1, 14).</code></li><li>mystery retourne le deuxième plus petit élément de la liste, s’il existe.</li></ol>',
    traps: [
      'Répondre une valeur pour <code class="ml">mystery [\'a\']</code> : aucun motif ne filtre une liste d’un élément, c’est <code class="ml">Match_failure</code> (pas le <code class="ml">failwith "..."</code>, réservé à la liste vide).',
      'Répondre le plus petit élément : la fonction rend <code class="ml">m2</code>, pas <code class="ml">m1</code>.',
      'Écrire <code class="ml">int list -&gt; int</code> : la fonction marche aussi sur des <code class="ml">float</code> (deuxième phrase), le type est <code class="ml">\'a list -&gt; \'a</code>.',
      'Oublier que les doublons comptent : <code class="ml">mystery [2; 2; 5]</code> → <code class="ml">2</code>.'],
    grading: '2 points pour l’exercice, sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14 ; le corrigé officiel donne les mêmes résultats, écrits un peu autrement (étape 4).'
  });


  /* =====================================================================
     Partiel du 29 octobre 2018 (promo 2023), partie 2 Caml sur 16
     ===================================================================== */
  M['p2018-ex2.ex'] = repl(
    '# is_image (function x -> x * 2) [1; 2; 3; 4; 5] [2; 4; 6; 8; 10] ;;',
    '- : bool = true',
    '# is_image (function x -> string_of_int x) [1; 2; 3; 4; 5] ["1"; "2"; "0"; "4"; "5"] ;;',
    '- : bool = false');
  M['p2018-ex2.sol'] = repl(
    '# let rec is_image f list1 list2 =',
    '     match (list1, list2) with',
    '         ([], []) -> true',
    '       | ([], _) | (_, []) -> invalid_arg "different lengths"',
    '       | (e1::l1, e2::l2) -> f e1 = e2 && is_image f l1 l2 ;;',
    "val is_image : ('a -> 'b) -> 'a list -> 'b list -> bool = <fun>");
  M['p2018-ex2.chk'] = repl(
    '# is_image (function x -> x * 2) [1; 2; 3; 4; 5] [2; 4; 6; 8; 10] ;;',
    '- : bool = true',
    '# is_image (function x -> string_of_int x) [1; 2; 3; 4; 5] ["1"; "2"; "0"; "4"; "5"] ;;',
    '- : bool = false',
    '# is_image (function x -> x * 2) [1; 2; 3] [2; 4] ;;',
    'Exception: Invalid_argument "different lengths".',
    '# is_image (function x -> x * 2) [1; 2; 3] [2; 5] ;;',
    '- : bool = false',
    '# is_image (function x -> x * 2) [] [] ;;',
    '- : bool = true');
  X.push({
    id: 'p2018-ex2', exam: 'p2018', kind: 'partiel', order: 2, src: 'Partiel oct. 2018 · Ex 2',
    title: 'is_image', pts: 4, topics: ['listes', 'ordre-superieur', 'deux-listes', 'exceptions'], lvl: 2, time: 10,
    intro: '<p>Écrire la fonction Caml <code class="ml">is_image</code> dont les spécifications sont les suivantes :</p><ul><li>Elle prend en paramètre une fonction à un paramètre : <code class="ml">f</code> ainsi que deux listes : [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>] et [b<sub>1</sub>; b<sub>2</sub>; ···; b<sub>n</sub>].</li><li>Elle vérifie pour toutes les paires (a<sub>i</sub>, b<sub>i</sub>) que b<sub>i</sub> est l’image de a<sub>i</sub> par f.</li><li>Si elle trouve une paire telle que f a<sub>i</sub> ≠ b<sub>i</sub>, elle retourne faux. Sinon, elle déclenche une exception <code class="ml">Invalid_argument</code> si les deux listes sont de longueurs différentes.</li></ul><p><code data-ml-ans>val is_image : (\'a -&gt; \'b) -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code></p>' + M['p2018-ex2.ex'],
    hints: [
      'Le type est donné : <code class="ml">f</code> transforme un <code class="ml">\'a</code> en <code class="ml">\'b</code>, et on compare <code class="ml">f e1</code> à <code class="ml">e2</code>.',
      'Deux listes parcourues ensemble : les deux vides, l’une vide et pas l’autre, les deux non vides.',
      '« Si elle trouve une paire fausse, elle retourne faux. Sinon… exception » : teste la paire avant l’appel récursif, avec <code class="ml">&amp;&amp;</code>.'],
    solution: [
      { t: 'Le principe', html: '<p>Le corrigé le résume : <code class="ml">is_image</code> calcule <code class="ml">f a1 = b1 &amp;&amp; f a2 = b2 &amp;&amp; … &amp;&amp; f an = bn</code>. On parcourt les deux listes ensemble ; <code class="ml">&amp;&amp;</code> s’arrête à la première paire fausse, si bien que l’exception de longueurs n’arrive que si toutes les paires vues étaient justes.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">true</code>.</li><li><code class="ml">([], _)</code> ou <code class="ml">(_, [])</code> → <code class="ml">invalid_arg "different lengths"</code> (l’énoncé ne donne pas de message).</li><li><code class="ml">(e1::l1, e2::l2)</code> → <code class="ml">f e1 = e2 &amp;&amp; is_image f l1 l2</code>.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel. <code class="ml">string_of_int</code> apparaît dans un exemple, pour construire <code class="ml">f</code> : ce n’est pas ta fonction qui l’appelle.</p>' + M['p2018-ex2.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les deux exemples du sujet, puis : longueurs différentes sans paire fausse (exception), paire fausse avant la fin de la liste courte (<code class="ml">false</code>), deux listes vides.</p>' + M['p2018-ex2.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val is_image : (\'a -&gt; \'b) -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code>.</p>',
    traps: [
      'Comparer les longueurs d’abord : une paire fausse doit donner <code class="ml">false</code> avant toute exception.',
      'Écrire <code class="ml">f (e1, e2)</code> ou <code class="ml">f e1 e2</code> : <code class="ml">f</code> n’a qu’un paramètre, on compare <code class="ml">f e1</code> à <code class="ml">e2</code>.',
      'Inverser l’ordre dans <code class="ml">&amp;&amp;</code> : l’appel récursif serait évalué avant le test de la paire.',
      'Oublier le cas <code class="ml">([], [])</code> : il rend <code class="ml">true</code>.'],
    grading: '4 points pour l’exercice, sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14. La version anglaise du sujet commence par erreur par « Write the Caml function for_all2 ».'
  });

  M['p2018-ex3.sol'] = repl(
    '# let rec how_many f = function',
    '      [] -> 0',
    '    | e::l -> (if f e then 1 else 0) + how_many f l ;;',
    "val how_many : ('a -> bool) -> 'a list -> int = <fun>",
    '# let count_multiples n = how_many (function x -> x mod n = 0) ;;',
    'val count_multiples : int -> int list -> int = <fun>');
  M['p2018-ex3.chk'] = repl(
    '# how_many (function x -> x > 0) [-1; 2; 0; 5] ;;',
    '- : int = 2',
    '# count_multiples 3 [1; 3; 6; 7; 9; 0] ;;',
    '- : int = 4',
    '# count_multiples 2 [] ;;',
    '- : int = 0');
  M['p2018-ex3.v2'] = repl(
    '# let rec how_many f = function',
    '      [] -> 0',
    '    | e::l when f e -> 1 + how_many f l',
    '    | _::l          -> how_many f l ;;',
    "val how_many : ('a -> bool) -> 'a list -> int = <fun>",
    '# let count_multiples n l =',
    '    let div a = a mod n = 0 in how_many div l ;;',
    'val count_multiples : int -> int list -> int = <fun>',
    '# count_multiples 3 [1; 3; 6; 7; 9; 0] ;;',
    '- : int = 4');
  X.push({
    id: 'p2018-ex3', exam: 'p2018', kind: 'partiel', order: 3, src: 'Partiel oct. 2018 · Ex 3',
    title: 'Combien ? : how_many, puis count_multiples', pts: 4, topics: ['listes', 'ordre-superieur'], lvl: 1, time: 10,
    questions: [
      '<b>1.</b> Écrire la fonction Caml <code class="ml">how_many</code> dont les spécifications sont les suivantes :<ul><li>Elle prend en paramètre une fonction booléenne <code class="ml">f</code> ainsi qu’une liste : [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>].</li><li>Elle recherche dans la liste les valeurs a<sub>i</sub> telle que f (a<sub>i</sub>) soit vrai et retourne le nombre de valeurs trouvées.</li></ul><p><code data-ml-ans>val how_many : (\'a -&gt; bool) -&gt; \'a list -&gt; int = &lt;fun&gt;</code></p>',
      '<b>2.</b> Utiliser la fonction <code class="ml">how_many</code> pour définir la fonction <code class="ml">count_multiples n l</code> qui retourne le nombre de multiples de <code class="ml">n</code> dans la liste <code class="ml">l</code>.<p><code data-ml-ans>val count_multiples : int -&gt; int list -&gt; int = &lt;fun&gt;</code></p>'],
    hints: [
      'Parcours complet : chaque élément compte pour 1 s’il vérifie <code class="ml">f</code>, pour 0 sinon.',
      'Deux cas, <code class="ml">[]</code> → 0 et <code class="ml">e :: l</code> ; dans le second, <code class="ml">if f e then 1 else 0</code> s’ajoute au compte de <code class="ml">l</code>.',
      '<code class="ml">count_multiples n</code> : quel prédicat dit « x est un multiple de n » ? <code class="ml">x mod n = 0</code>. Il suffit de le passer à <code class="ml">how_many</code>.'],
    solution: [
      { t: 'how_many', html: '<p>Le nombre d’éléments de <code class="ml">e :: l</code> qui vérifient <code class="ml">f</code>, c’est 1 ou 0 pour <code class="ml">e</code>, plus le nombre dans <code class="ml">l</code>. Pour la liste vide, 0. Le sujet ne donne pas d’exemple, seulement le type, qu’il faut retrouver dans la réponse de Caml.</p>' },
      { t: 'count_multiples', html: '<p>On écrit le prédicat avec une fonction anonyme, <code class="ml">function x -&gt; x mod n = 0</code>, et on le passe à <code class="ml">how_many</code>. Le corrigé écrit <code class="ml">let count_multiples n = how_many (…)</code> : une <b>application partielle</b>, <code class="ml">how_many</code> reçoit son premier paramètre et attend encore la liste. Le type affiché est bien <code class="ml">int -&gt; int list -&gt; int</code>.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Première version de chaque fonction dans le corrigé officiel (qui oublie les <code class="ml">;;</code> après les deux <code class="ml">how_many</code>).</p>' + M['p2018-ex3.sol'] },
      { t: 'Vérifier', html: '<p>Le sujet ne donne aucun exemple : en voici trois. 0 est un multiple de 3.</p>' + M['p2018-ex3.chk'] },
      { t: 'Les autres versions du corrigé', html: '<p>Un filtre gardé pour <code class="ml">how_many</code>, une fonction locale nommée pour <code class="ml">count_multiples</code> : mêmes types, mêmes résultats.</p>' + M['p2018-ex3.v2'] }],
    answer: '<p>Deux fonctions, chacune suivie de sa réponse de Caml :</p><ul><li><code data-ml-ans>val how_many : (\'a -&gt; bool) -&gt; \'a list -&gt; int = &lt;fun&gt;</code></li><li><code data-ml-ans>val count_multiples : int -&gt; int list -&gt; int = &lt;fun&gt;</code></li></ul>',
    traps: [
      'Réécrire un parcours dans <code class="ml">count_multiples</code> : l’énoncé demande d’utiliser <code class="ml">how_many</code>.',
      'Écrire <code class="ml">if f e then 1 + how_many f l</code> sans <code class="ml">else</code> : Caml refuse un <code class="ml">if</code> sans <code class="ml">else</code> qui rend un entier.',
      'Oublier les parenthèses autour de <code class="ml">if … then 1 else 0</code> : <code class="ml">if f e then 1 else 0 + how_many f l</code> n’ajoute le reste que dans le cas <code class="ml">else</code>.',
      'Tester <code class="ml">n mod x = 0</code> au lieu de <code class="ml">x mod n = 0</code>.'],
    grading: '4 points pour l’exercice, sans détail.',
    official: true, note: NOTE_EXEC
  });

  M['p2018-ex4.ex'] = repl(
    '# insert_nth 0 5 [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    '- : int list = [1; 2; 3; 4; 0; 5; 6; 7; 8; 9]',
    '# insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    '- : int list = [1; 2; 3; 4; 5; 6; 7; 8; 9; 0]',
    '# insert_nth 0 12 [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    'Exception: Failure "out of bound".',
    '# insert_nth 0 (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    'Exception: Invalid_arg "negative rank".');
  M['p2018-ex4.sol'] = repl(
    '# let insert_nth x i list =',
    '    if i < 1 then',
    '      invalid_arg "negative rank"',
    '    else',
    '      let rec insert = function',
    '          (1, list)    -> x :: list',
    '        | (_, [])   -> failwith "out of bound"',
    '        | (i, e::q) -> e :: insert(i-1, q)',
    '      in',
    '        insert (i, list) ;;',
    "val insert_nth : 'a -> int -> 'a list -> 'a list = <fun>");
  M['p2018-ex4.chk'] = repl(
    '# insert_nth 0 5 [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    '- : int list = [1; 2; 3; 4; 0; 5; 6; 7; 8; 9]',
    '# insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    '- : int list = [1; 2; 3; 4; 5; 6; 7; 8; 9; 0]',
    '# insert_nth 0 12 [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    'Exception: Failure "out of bound".',
    '# insert_nth 0 (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9];;',
    'Exception: Invalid_argument "negative rank".',
    '# insert_nth 0 1 [] ;;',
    '- : int list = [0]',
    '# insert_nth 0 2 [] ;;',
    'Exception: Failure "out of bound".',
    '# insert_nth 0 0 [1] ;;',
    'Exception: Invalid_argument "negative rank".');
  X.push({
    id: 'p2018-ex4', exam: 'p2018', kind: 'partiel', order: 4, src: 'Partiels oct. 2018 (Ex 4) et nov. 2020 (Ex 3)',
    title: 'Insertion à la ième place : insert_nth', pts: 5, topics: ['listes', 'rangs', 'exceptions', 'construire', 'filtrage'], lvl: 2, time: 12,
    intro: '<p>Énoncé d’octobre 2018 ; celui de novembre 2020 est le même, avec les mêmes exemples, sans la ligne <code class="ml">val insert_nth</code>.</p><p>Écrire la fonction <code class="ml">insert_nth x i list</code> qui insère la valeur <code class="ml">x</code> à la ième place dans la liste <code class="ml">list</code>. La fonction devra déclencher une exception <code class="ml">Invalid_argument</code> si <code class="ml">i</code> est négatif ou nul, ou une exception <code class="ml">Failure</code> si la liste est trop courte.</p><p><code data-ml-ans>val insert_nth : \'a -&gt; int -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></p><p>Exemples d’application :</p>' + M['p2018-ex4.ex'],
    hints: [
      'Le rang se teste une fois, dans une fonction chapeau (<code class="ml">Invalid_argument</code>) ; la liste trop courte se découvre pendant le parcours (<code class="ml">Failure</code>).',
      'Insérer à la place <code class="ml">i</code> dans <code class="ml">e :: q</code>, c’est garder <code class="ml">e</code> et insérer à la place <code class="ml">i − 1</code> dans <code class="ml">q</code>. Quand le rang vaut 1, <code class="ml">x</code> se place en tête.',
      'Regarde le deuxième exemple : insérer à la place 10 dans une liste de 9 éléments est permis (ajout en fin). Dans quel ordre écrire les cas « rang 1 » et « liste vide » ?'],
    solution: [
      { t: 'Le principe', html: '<p>La fonction chapeau vérifie le rang (<code class="ml">i &lt; 1</code> → <code class="ml">invalid_arg</code>). La fonction locale <code class="ml">insert</code> filtre le couple (rang, liste) et fait descendre le rang en avançant dans la liste. Le corrigé le dit : une exception est déclenchée si i ≤ 0 ou si i est supérieur à la longueur de la liste + 1.</p>' },
      { t: 'Les cas, dans cet ordre', html: '<ul><li><code class="ml">(1, list)</code> → <code class="ml">x :: list</code> : on est à la bonne place, même si <code class="ml">list</code> est vide (ajout en fin de liste, deuxième exemple).</li><li><code class="ml">(_, [])</code> → <code class="ml">failwith "out of bound"</code> : la liste est finie avant la place <code class="ml">i</code>.</li><li><code class="ml">(i, e::q)</code> → <code class="ml">e :: insert (i-1, q)</code>.</li></ul><p>L’ordre compte : si <code class="ml">(_, [])</code> passait en premier, l’ajout en fin de liste déclencherait l’exception.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>C’est le corrigé officiel, identique en 2018 et en 2020.</p>' + M['p2018-ex4.sol'] },
      { t: 'Vérifier sur les exemples', html: '<p>Les quatre exemples, puis des cas limites. Pour le quatrième exemple, Caml répond <code class="ml">Invalid_argument</code> : le <code class="ml">Invalid_arg</code> imprimé dans le sujet est une coquille, ce constructeur n’existe pas.</p>' + M['p2018-ex4.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val insert_nth : \'a -&gt; int -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Placer le cas <code class="ml">(_, [])</code> avant <code class="ml">(1, list)</code> : <code class="ml">insert_nth 0 10 […9 éléments]</code> déclencherait <code class="ml">Failure</code> au lieu d’ajouter en fin.',
      'Recopier <code class="ml">Invalid_arg</code> : ce constructeur n’existe pas ; <code class="ml">invalid_arg "…"</code> déclenche <code class="ml">Invalid_argument</code>.',
      'Tester le rang à chaque appel récursif : c’est le rôle de la fonction chapeau.',
      'Insérer après le ième élément au lieu de le placer au rang i : <code class="ml">insert_nth 0 5 …</code> met 0 en cinquième position.'],
    grading: '5 points pour l’exercice (en 2018 comme en 2020), sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14. C’est aussi l’exercice 3.3 du TD listes de cette année, avec les mêmes exemples.'
  });

  M['p2018-ex5.q'] = repl(
    '# let rec decode = function',
    '      [] -> []',
    '    | (1, e)::list -> e::decode list',
    '    | (nb, e)::list -> e::decode ((nb-1, e)::list) ;;',
    '# decode [(6, "grr")] ;;',
    "# decode [(1, 'a'); (3, 'b'); (1, 'c'); (1, 'd'); (4, 'e')] ;;",
    '# let encode list =',
    '    let rec encode_rec (nb, cur) = function',
    '        []   -> [(nb, cur)]',
    '      | e::list -> if e = cur then',
    '                      encode_rec (nb+1, cur) list',
    '                    else',
    '                      (nb, cur)::encode-rec (1, e) list',
    '    in',
    '      match list with',
    '          []   -> []',
    '        | e::l -> encode_rec (1, e) list',
    '# encode [0; 0; 0; 0; 0; 0; 0; 0; 0; 0] ;;',
    "# encode ['b';'b';'b'; 'c'; 'a';'a'; 'e';'e';'e';'e'; 'd';'d'] ;;");
  M['p2018-ex5.dec'] = repl(
    '# let rec decode = function',
    '      [] -> []',
    '    | (1, e)::list -> e::decode list',
    '    | (nb, e)::list -> e::decode ((nb-1, e)::list) ;;',
    "val decode : (int * 'a) list -> 'a list = <fun>",
    '# decode [(6, "grr")] ;;',
    '- : string list = ["grr"; "grr"; "grr"; "grr"; "grr"; "grr"]',
    "# decode [(1, 'a'); (3, 'b'); (1, 'c'); (1, 'd'); (4, 'e')] ;;",
    "- : char list = ['a'; 'b'; 'b'; 'b'; 'c'; 'd'; 'e'; 'e'; 'e'; 'e']");
  M['p2018-ex5.trace'] = ml(
    "decode [(1, 'a'); (3, 'b'); (1, 'c'); ...]",
    "= 'a' :: decode [(3, 'b'); (1, 'c'); ...]",
    "= 'a' :: 'b' :: decode [(2, 'b'); (1, 'c'); ...]",
    "= 'a' :: 'b' :: 'b' :: decode [(1, 'b'); (1, 'c'); ...]",
    "= 'a' :: 'b' :: 'b' :: 'b' :: decode [(1, 'c'); ...]",
    '= ...');
  M['p2018-ex5.enc'] = repl(
    '# let encode list =',
    '    let rec encode_rec (nb, cur) = function',
    '        []   -> [(nb, cur)]',
    '      | e::list -> if e = cur then',
    '                     encode_rec (nb+1, cur) list',
    '                   else',
    '                     (nb, cur)::encode_rec (1, e) list',
    '    in',
    '      match list with',
    '          []   -> []',
    '        | e::l -> encode_rec (1, e) l ;;',
    "val encode : 'a list -> (int * 'a) list = <fun>",
    '# encode [0; 0; 0; 0; 0; 0; 0; 0; 0; 0] ;;',
    '- : (int * int) list = [(10, 0)]',
    "# encode ['b';'b';'b'; 'c'; 'a';'a'; 'e';'e';'e';'e'; 'd';'d'] ;;",
    "- : (int * char) list = [(3, 'b'); (1, 'c'); (2, 'a'); (4, 'e'); (2, 'd')]",
    "# decode (encode ['b';'b';'b'; 'c'; 'a';'a'; 'e';'e';'e';'e'; 'd';'d']) ;;",
    "- : char list = ['b'; 'b'; 'b'; 'c'; 'a'; 'a'; 'e'; 'e'; 'e'; 'e'; 'd'; 'd']");
  M['p2018-ex5.subj'] = repl(
    '# let encode list =',
    '    let rec encode_rec (nb, cur) = function',
    '        []   -> [(nb, cur)]',
    '      | e::list -> if e = cur then',
    '                     encode_rec (nb+1, cur) list',
    '                   else',
    '                     (nb, cur)::encode-rec (1, e) list',
    '    in',
    '      match list with',
    '          []   -> []',
    '        | e::l -> encode_rec (1, e) list ;;',
    'Error: Syntax error');
  M['p2018-ex5.half'] = repl(
    '# let encode list =',
    '    let rec encode_rec (nb, cur) = function',
    '        []   -> [(nb, cur)]',
    '      | e::list -> if e = cur then',
    '                     encode_rec (nb+1, cur) list',
    '                   else',
    '                     (nb, cur)::encode_rec (1, e) list',
    '    in',
    '      match list with',
    '          []   -> []',
    '        | e::l -> encode_rec (1, e) list ;;',
    "val encode : 'a list -> (int * 'a) list = <fun>",
    '# encode [0; 0; 0; 0; 0; 0; 0; 0; 0; 0] ;;',
    '- : (int * int) list = [(11, 0)]');
  X.push({
    id: 'p2018-ex5', exam: 'p2018', kind: 'partiel', order: 5, src: 'Partiel oct. 2018 · Ex 5',
    title: 'Évaluations : decode et encode', pts: 3, topics: ['listes', 'mystery', 'evaluation', 'filtrage'], lvl: 2, time: 10,
    intro: '<p>Donner les résultats des évaluations successives des phrases suivantes.</p>' + M['p2018-ex5.q'],
    hints: [
      '<code class="ml">decode</code> reçoit une liste de couples (nombre, élément). Que fait le cas <code class="ml">(1, e)</code> ? Et le cas <code class="ml">(nb, e)</code> avec <code class="ml">nb</code> plus grand que 1 ?',
      'Déroule <code class="ml">decode [(1, \'a\'); (3, \'b\'); …]</code> : le couple <code class="ml">(3, \'b\')</code> produit un <code class="ml">\'b\'</code> et devient <code class="ml">(2, \'b\')</code>.',
      '<code class="ml">encode</code> fait l’inverse : elle compte les éléments égaux consécutifs. Mais relis le code imprimé ligne par ligne : est-il accepté par Caml tel quel ?'],
    solution: [
      { t: 'decode', html: '<p><code class="ml">decode</code> développe une liste de couples (nombre, élément) : <code class="ml">(nb, e)</code> produit <code class="ml">e</code>, puis le couple <code class="ml">(nb-1, e)</code> reste à développer ; <code class="ml">(1, e)</code> produit le dernier <code class="ml">e</code>. Le type : les nombres sont des <code class="ml">int</code>, les éléments de type quelconque : <code class="ml">(int * \'a) list -&gt; \'a list</code>.</p>' + M['p2018-ex5.trace'] + M['p2018-ex5.dec'] },
      { t: 'encode', html: '<p><code class="ml">encode</code> fait l’inverse, c’est le « codage par plages » : <code class="ml">encode_rec (nb, cur)</code> compte dans <code class="ml">nb</code> les éléments égaux à <code class="ml">cur</code> ; un élément différent ferme la plage <code class="ml">(nb, cur)</code> et en ouvre une nouvelle, <code class="ml">(1, e)</code>. Le corrigé officiel évalue cette version :</p>' + M['p2018-ex5.enc'] },
      { t: 'Le code du sujet ne compile pas', html: '<p>Le sujet imprime <code class="ml">encode-rec</code> (tiret) au lieu de <code class="ml">encode_rec</code> : Caml lit une soustraction suivie de <code class="ml">rec</code>, et refuse la phrase. <code class="ml">encode</code> n’est alors pas défini, et les deux phrases suivantes donneraient <code class="ml">Error: Unbound value encode</code>. Le corrigé officiel corrige silencieusement cette coquille <b>et</b> une seconde : la dernière ligne doit appeler <code class="ml">encode_rec (1, e) l</code>, pas <code class="ml">list</code>.</p>' + M['p2018-ex5.subj'] + '<p>Avec seulement le tiret corrigé, le premier élément est compté deux fois (la liste repart du début) :</p>' + M['p2018-ex5.half'] }],
    answer: '<ul><li><code data-ml-ans>val decode : (int * \'a) list -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>- : string list = ["grr"; "grr"; "grr"; "grr"; "grr"; "grr"]</code></li><li><code data-ml-ans>- : char list = [\'a\'; \'b\'; \'b\'; \'b\'; \'c\'; \'d\'; \'e\'; \'e\'; \'e\'; \'e\']</code></li><li><code data-ml-ans>val encode : \'a list -&gt; (int * \'a) list = &lt;fun&gt;</code> (version du corrigé)</li><li><code data-ml-ans>- : (int * int) list = [(10, 0)]</code></li><li><code data-ml-ans>- : (int * char) list = [(3, \'b\'); (1, \'c\'); (2, \'a\'); (4, \'e\'); (2, \'d\')]</code></li></ul><p>Le code imprimé dans le sujet donne <code class="ml">Error: Syntax error</code> pour encode (coquille <code class="ml">encode-rec</code>).</p>',
    traps: [
      'Oublier les réponses des définitions (<code class="ml">val decode : …</code>, <code class="ml">val encode : …</code>).',
      'Écrire <code class="ml">int list</code> au lieu de <code class="ml">string list</code> ou <code class="ml">char list</code> : le type des éléments suit les exemples.',
      'Lire <code class="ml">(nb, e)</code> comme « répéter nb fois puis s’arrêter » sans voir le cas <code class="ml">(1, e)</code> : c’est lui qui termine chaque plage.',
      'Ne pas voir que le code imprimé ne compile pas : <code class="ml">encode-rec</code> se lit comme une soustraction. Le corrigé, lui, évalue une version corrigée.'],
    grading: '3 points pour l’exercice, sans détail.',
    official: true, note: 'Code exécuté avec OCaml 4.14. Le corrigé officiel évalue une version de encode corrigée de deux coquilles du sujet (étape 3).'
  });


  /* =====================================================================
     Partiel du 6 novembre 2017 (promo 2022), exercices 3 à 5 sur 14
     ===================================================================== */
  M['p2017-ex5.ex'] = repl(
    '# let is_string_of_int e1 e2 = string_of_int e1 = e2 ;;',
    'val is_string_of_int : int -> string -> bool = <fun>',
    '# combfilter is_string_of_int [1; 2; 3; 4; 5] ["1"; "0"; "0"; "4"; "5"] ;;',
    '- : (int * string) list = [(1, "1"); (4, "4"); (5, "5")]');
  M['p2017-ex5.sol'] = repl(
    '# let rec combfilter f l1 l2 =',
    '    match (l1, l2) with',
    '        ([], []) -> []',
    '      | (e1 :: l1, e2 :: l2) ->',
    '          if f e1 e2 then',
    '            (e1, e2) :: combfilter f l1 l2',
    '          else',
    '            combfilter f l1 l2',
    '      | _ -> invalid_arg "combfilter: different lengths" ;;',
    "val combfilter : ('a -> 'b -> bool) -> 'a list -> 'b list -> ('a * 'b) list =",
    '  <fun>');
  M['p2017-ex5.chk'] = repl(
    '# let is_string_of_int e1 e2 = string_of_int e1 = e2 ;;',
    'val is_string_of_int : int -> string -> bool = <fun>',
    '# combfilter is_string_of_int [1; 2; 3; 4; 5] ["1"; "0"; "0"; "4"; "5"] ;;',
    '- : (int * string) list = [(1, "1"); (4, "4"); (5, "5")]',
    '# combfilter is_string_of_int [1; 2] ["1"] ;;',
    'Exception: Invalid_argument "combfilter: different lengths".',
    '# combfilter (function x -> function y -> x < y) [1; 5; 2] [3; 4; 9] ;;',
    '- : (int * int) list = [(1, 3); (2, 9)]');
  X.push({
    id: 'p2017-ex5', exam: 'p2017', kind: 'partiel', order: 5, src: 'Partiel nov. 2017 · Ex 5',
    title: 'Combine it : combfilter', pts: 5, topics: ['listes', 'ordre-superieur', 'deux-listes', 'construire', 'exceptions'], lvl: 2, time: 14,
    intro: '<p>Écrire la fonction <code class="ml">combfilter</code> dont les spécifications sont les suivantes :</p><ul><li>Elle prend en paramètre une fonction à deux paramètres : <code class="ml">f</code> ainsi que deux listes : [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>] et [b<sub>1</sub>; b<sub>2</sub>; ···; b<sub>n</sub>].</li><li>Elle retourne la liste de toutes les paires d’éléments (a<sub>i</sub>, b<sub>i</sub>) tels que f a<sub>i</sub> b<sub>i</sub> est vrai. L’ordre des éléments des listes initiales est préservé.</li><li>Elle déclenche une exception si les deux listes sont de longueurs différentes.</li></ul><p>Exemple d’utilisation :</p>' + M['p2017-ex5.ex'],
    hints: [
      'Deux listes parcourues ensemble : les deux vides, les deux non vides, et tout le reste (longueurs différentes).',
      'Dans le cas <code class="ml">(e1 :: l1, e2 :: l2)</code>, on garde le couple <code class="ml">(e1, e2)</code> en tête du résultat si <code class="ml">f e1 e2</code> est vrai ; sinon on passe à la suite.',
      'L’énoncé dit seulement « une exception » : <code class="ml">invalid_arg</code>, comme pour une erreur de paramètres (longueurs différentes), est le choix le plus naturel. Construis le résultat avec <code class="ml">::</code> pour garder l’ordre.'],
    solution: [
      { t: 'Le principe', html: '<p>Un filtre sur deux listes à la fois : on parcourt les paires (a<sub>i</sub>, b<sub>i</sub>) dans l’ordre et on garde celles qui vérifient <code class="ml">f</code>. Le résultat est construit en ajoutant chaque couple gardé en tête de la suite, donc dans l’ordre initial. Les longueurs différentes se découvrent quand une liste se termine avant l’autre.</p>' },
      { t: 'Les cas', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">[]</code>.</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> → <code class="ml">(e1, e2) :: combfilter f l1 l2</code> si <code class="ml">f e1 e2</code>, sinon <code class="ml">combfilter f l1 l2</code>.</li><li><code class="ml">_</code> (une liste vide, l’autre non) → <code class="ml">invalid_arg "combfilter: different lengths"</code>.</li></ul><p>Ici, contrairement à <code class="ml">for_all2</code>, l’énoncé ne dit pas « sinon » : toute la liste est parcourue, et des longueurs différentes déclenchent toujours l’exception.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Caml affiche ce type sur deux lignes, car il est long.</p>' + M['p2017-ex5.sol'] },
      { t: 'Vérifier', html: '<p>L’exemple du sujet (on définit d’abord <code class="ml">is_string_of_int</code>), des longueurs différentes, et un autre prédicat.</p>' + M['p2017-ex5.chk'] }],
    answer: '<p>Le code de l’étape 3, suivi de sa réponse de Caml : <code data-ml-ans>val combfilter : (\'a -&gt; \'b -&gt; bool) -&gt; \'a list -&gt; \'b list -&gt; (\'a * \'b) list = &lt;fun&gt;</code>.</p>',
    traps: [
      'Rendre <code class="ml">f e1 e2</code> ou la liste des <code class="ml">e1</code> : le résultat est une liste de couples <code class="ml">(e1, e2)</code>.',
      'Construire le résultat dans un accumulateur : l’ordre serait inversé, alors que l’énoncé demande de le préserver.',
      'Oublier le cas des longueurs différentes : Warning 8 et <code class="ml">Match_failure</code> au lieu de l’exception demandée.',
      'Écrire <code class="ml">string_of_int</code> dans <code class="ml">combfilter</code> : la fonction ne fait qu’appliquer <code class="ml">f</code> ; <code class="ml">string_of_int</code> sert seulement à l’exemple.'],
    grading: '5 points pour l’exercice, sans détail.',
    official: false, note: NOTE_REDIGE
  });

})();
