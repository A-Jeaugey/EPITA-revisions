/* Caml — exercices d'entraînement de l'année (Moodle 2026-27) : séminaire (01), TP « Premier pas en Caml » (03),
   TD listes (04, « td Caml 1 ») et TD ordre supérieur (05, « td Caml 2 »), plus la page Moodle « Hanoï ».
   Une fiche par exercice, kind 'td', exam null, ids lisibles et stables :
     sem-<partie>-<exercice> (séminaire ; sem-4-1a / sem-4-1b : les deux moitiés de l'exercice 4.1), sem-hanoi,
     tp-<n>, td-listes-<partie>-<n>, td-os-<partie>-<n> (numéros des documents).
   - Énoncés verbatim (texte des PDF relu sur les pages ; « ’a’ » de l'extraction remis en 'a'), exemples d'application
     en bloc de code. Coquilles des documents signalées dans la fiche (<p class="sol-note">) : Invalid_arg (TD listes
     3.3), 4.0 (TD listes 1.6), stammer (séminaire 2.2 : le texte et l'exemple ne donnent pas le même nombre),
     mult_rec (x, y-1) (page Moodle « Conseils pour la récursivité »).
   - Aucun corrigé officiel des TD sur le Moodle : corrections rédigées dans le style des corrigés de sujets (fonction
     chapeau, function, if imbriqués, aucune fonction prédéfinie hors failwith et invalid_arg, sauf quand l'énoncé en
     donne). Messages d'exception non fixés par un document : choix signalés dans la fiche.
   - also : fiche d'annales du même exercice (id pAAAA-exN de data/caml/ex-annales.js, qui n'a qu'une fiche pour un
     exercice retombé), near : exercice de sujet proche. Les sept reprises : assoc (2017, 2019d → p2019d-ex3),
     insert_nth (2018, 2020 → p2018-ex4), delete (p2020-ex2), remove_duplicates (p2023-ex2), second (Mystery
     p2019d-ex4), sublist (Mystery p2019-ex5), for_all2 et almost (2017, 2019 → p2019-ex4).
   - CODE : transcriptions exactes du toplevel OCaml 4.14 (« # phrase ;; », lignes suivantes décalées de deux
     espaces, puis la réponse de Caml, sans les lignes « Line 1, characters … »), une par clé, chaque clé exécutée
     dans un environnement vide. Pour changer un code : le relancer dans ocaml et recopier phrase ET réponse.
   Notation dans les textes : `code` → code Caml coloré en ligne (<code class="ml">, échappé par fmt, hors <pre>).
   Blocs : R(clé, sel, opts) → boucle d'interaction <pre data-ml-repl> (sel : '3', '0-2', '0,4-6' ; opts.mode :
   'guess' pour que l'élève tape ses réponses, 'reveal' pour les dévoiler une à une), S(clé, sel) → le code seul
   des mêmes phrases (<pre data-ml>, sans invite ni réponse), ml(lignes) → code écrit à la main, ex(lignes) →
   exemples recopiés d'un énoncé (texte du document, pas une sortie de Caml). Le fichier anglais (data/en/caml/ex-td.js) réutilise ces
   outils et les blocs via window.CAML_TD. */
(function () {
  'use strict';
  var X = window.CAML_EX = window.CAML_EX || [];

  /* ---------- code exécuté (OCaml 4.14.1) ---------- */
  var CODE = {
    'sem-1-1': [
      '# let a = 6 + 3 * 2 ;;',
      'val a : int = 12',
      '# let b = 7 in 11 + b ;;',
      '- : int = 18',
      '# let a = 3 in let c = 2 + a ;;',
      'Error: Syntax error',
      '# let c = let a = 3 in 2 + a ;;',
      'val c : int = 5',
      '# let c = a * b ;;',
      'Error: Unbound value b',
      '# let a = 2 in b = 5 in a * b ;;',
      'Error: Syntax error',
      '# let a = 5 in let b = 2 * a in a * b ;;',
      '- : int = 50',
      '# let a = 5 and b = 2 * a in a * b ;;',
      '- : int = 120',
      '# (let x = 2 in x * (x - 1)) + (let x = 3 in x * (x + 1)) ;;',
      '- : int = 14',
      '# let x = 2 and y = 5 in',
      '    let y = x and z = y in',
      '      y + z ;;',
      '- : int = 7',
      '# let x = 2 and y = 5 in',
      '    let y = x in',
      '      let z = y in',
      '        y + z ;;',
      'Warning 26 [unused-var]: unused variable y.',
      '- : int = 4',
      '# let a=let a=let a=1 in 2*a and b=let b=2 in 2*b in let a=a+b and b=a-b in a*a-b*b ;;',
      'val a : int = 32'],
    'sem-1-1b': [
      '# let a = 3 in let c = 2 + a in c ;;',
      '- : int = 5',
      '# let a = 2 and b = 5 in a * b ;;',
      '- : int = 10',
      '# let a = 2 in let b = 5 in a * b ;;',
      '- : int = 10'],
    'sem-1-2': [
      '# 1. +. 2. ;;',
      '- : float = 3.',
      '# 1 + 1.5 ;;',
      'Error: This expression has type float but an expression was expected of type',
      '         int',
      '# 1 +. 1.5 ;;',
      'Error: This expression has type int but an expression was expected of type',
      '         float',
      '  Hint: Did you mean `1.\'?',
      '# 1 / 2 ;;',
      '- : int = 0',
      '# 5 / 2 = 4 / 2 ;;',
      '- : bool = true',
      '# 5 mod 2 ;;',
      '- : int = 1',
      '# 4 mod 2 ;;',
      '- : int = 0',
      '# 10-2 * 2 ;;',
      '- : int = 6',
      '# 10 * 24 mod 10 ;;',
      '- : int = 0',
      '# 24 mod 10 * 10 ;;',
      '- : int = 40',
      '# "A string" ;;',
      '- : string = "A string"',
      '# "" ;;',
      '- : string = ""',
      '# \'a\' ;;',
      '- : char = \'a\'',
      '# \'\' ;;',
      'Error: Illegal empty character literal \'\'',
      '  Hint: Did you mean \' \' or a type variable \'a?',
      '# "Hello Word" ^ \'!\' ;;',
      'Error: This expression has type char but an expression was expected of type',
      '         string',
      '# 1. < 3 ;;',
      'Error: This expression has type int but an expression was expected of type',
      '         float',
      '  Hint: Did you mean `3.\'?',
      '# 1 < 2 < 3 ;;',
      'Error: This expression has type int but an expression was expected of type',
      '         bool',
      '# "how do string comparisons work?" > "how do strings work?" ;;',
      '- : bool = false',
      '# \'Z\' < \'a\' ;;',
      '- : bool = true',
      '# let f x = x + 1 and g x = x + 1 in f = g ;;',
      'Exception: Invalid_argument "compare: functional value".',
      '# 1 < 2 && 3. > 5. ;;',
      '- : bool = false',
      '# false || (1/0 = 0) ;;',
      'Exception: Division_by_zero.',
      '# true || (1/0 = 0) ;;',
      '- : bool = true',
      '# true && (1/0 = 0) ;;',
      'Exception: Division_by_zero.',
      '# false && (1/0 = 0) ;;',
      '- : bool = false',
      '# false && (1.5 > 1) ;;',
      'Error: This expression has type int but an expression was expected of type',
      '         float',
      '  Hint: Did you mean `1.\'?'],
    'sem-2-1': [
      '# let f x = x * x ;;',
      'val f : int -> int = <fun>',
      '# f -4 ;;',
      'Error: This expression has type int -> int',
      '       but an expression was expected of type int',
      '# f 2 + 3 ;;',
      '- : int = 7',
      '# f (2 + 3) ;;',
      '- : int = 25',
      '# f f f 2 ;;',
      'Error: This function has type int -> int',
      '       It is applied to too many arguments; maybe you forgot a `;\'.',
      '# f 2 * f 2 * f 2 ;;',
      '- : int = 64',
      '# let g x =',
      '      let f x = x / 10 in',
      '        f x*10 + x mod 10 ;;',
      'val g : int -> int = <fun>',
      '# g 58 ;;',
      '- : int = 58',
      '# let f2 x = int_of_float sqrt float_of_int x ;;',
      'Error: This function has type float -> int',
      '       It is applied to too many arguments; maybe you forgot a `;\'.',
      '# f2 10 ;;',
      'Error: Unbound value f2',
      '# let g1 x = true && (x/0 = 0) ;;',
      'val g1 : int -> bool = <fun>',
      '# g1 0 ;;',
      'Exception: Division_by_zero.',
      '# let g2 x = false && (1.5 > x+1) ;;',
      'Error: This expression has type int but an expression was expected of type',
      '         float',
      '# g2 0 ;;',
      'Error: Unbound value g2',
      '# let g3 x = let a = 12 in x * x ;;',
      'Warning 26 [unused-var]: unused variable a.',
      'val g3 : int -> int = <fun>',
      '# g3 30 ;;',
      '- : int = 900'],
    'sem-2-1b': [
      '# let f x = x * x ;;',
      'val f : int -> int = <fun>',
      '# f (-4) ;;',
      '- : int = 16',
      '# f (f (f 2)) ;;',
      '- : int = 256',
      '# let f2 x = int_of_float (sqrt (float_of_int x)) ;;',
      'val f2 : int -> int = <fun>',
      '# f2 10 ;;',
      '- : int = 3',
      '# let g2 x = false && (1.5 > float_of_int (x+1)) ;;',
      'val g2 : int -> bool = <fun>',
      '# g2 0 ;;',
      '- : bool = false',
      '# let g3 x = x * x ;;',
      'val g3 : int -> int = <fun>'],
    'sem-2-2': [
      '# let mirror n = (n mod 10) * 10 + n / 10 ;;',
      'val mirror : int -> int = <fun>',
      '# mirror 15 ;;',
      '- : int = 51',
      '# let abba n = n * 100 + mirror n ;;',
      'val abba : int -> int = <fun>',
      '# abba 42 ;;',
      '- : int = 4224',
      '# let stammer n = abba (mirror n) * 10000 + abba n ;;',
      'val stammer : int -> int = <fun>',
      '# stammer 18 ;;',
      '- : int = 81181881',
      '# let stammer2 n = abba n * 10000 + abba (mirror n) ;;',
      'val stammer2 : int -> int = <fun>',
      '# stammer2 18 ;;',
      '- : int = 18818118'],
    'sem-2-3': [
      '# let power31 x =',
      '    let x2 = x * x in',
      '    let x3 = x2 * x in',
      '    let x5 = x3 * x2 in',
      '    let x10 = x5 * x5 in',
      '    let x20 = x10 * x10 in',
      '    let x30 = x20 * x10 in',
      '      x30 * x ;;',
      'val power31 : int -> int = <fun>',
      '# power31 2 ;;',
      '- : int = 2147483648',
      '# power31 (-1) ;;',
      '- : int = -1',
      '# power31 3 ;;',
      '- : int = 617673396283947'],
    'sem-2-6': [
      '# let sec_of_time h m s = h * 3600 + m * 60 + s ;;',
      'val sec_of_time : int -> int -> int -> int = <fun>',
      '# sec_of_time 23 13 59 ;;',
      '- : int = 83639',
      '# let time_of_sec s = (s / 3600, (s mod 3600) / 60, s mod 60) ;;',
      'val time_of_sec : int -> int * int * int = <fun>',
      '# time_of_sec 83639 ;;',
      '- : int * int * int = (23, 13, 59)',
      '# let add_times h1 m1 s1 h2 m2 s2 =',
      '    time_of_sec (sec_of_time h1 m1 s1 + sec_of_time h2 m2 s2) ;;',
      'val add_times : int -> int -> int -> int -> int -> int -> int * int * int =',
      '  <fun>',
      '# add_times 12 22 15 15 13 10 ;;',
      '- : int * int * int = (27, 35, 25)',
      '# add_times 0 59 59 0 0 1 ;;',
      '- : int * int * int = (1, 0, 0)'],
    'sem-3-3': [
      '# let max2 a b = if a > b then a else b ;;',
      'val max2 : \'a -> \'a -> \'a = <fun>',
      '# let min2 a b = if a < b then a else b ;;',
      'val min2 : \'a -> \'a -> \'a = <fun>',
      '# let max3 a b c =',
      '    if a > b then',
      '      if a > c then a else c',
      '    else',
      '      if b > c then b else c ;;',
      'val max3 : \'a -> \'a -> \'a -> \'a = <fun>',
      '# let min3 a b c =',
      '    if a < b then',
      '      if a < c then a else c',
      '    else',
      '      if b < c then b else c ;;',
      'val min3 : \'a -> \'a -> \'a -> \'a = <fun>',
      '# let middle3 a b c = max2 (min2 a b) (min2 (max2 a b) c) ;;',
      'val middle3 : \'a -> \'a -> \'a -> \'a = <fun>',
      '# let max4 a b c d = max2 (max2 a b) (max2 c d) ;;',
      'val max4 : \'a -> \'a -> \'a -> \'a -> \'a = <fun>',
      '# let min4 a b c d = min2 (min2 a b) (min2 c d) ;;',
      'val min4 : \'a -> \'a -> \'a -> \'a -> \'a = <fun>',
      '# max3 4 9 2 ;;',
      '- : int = 9',
      '# min3 4 9 2 ;;',
      '- : int = 2',
      '# middle3 4 9 2 ;;',
      '- : int = 4',
      '# middle3 7 7 1 ;;',
      '- : int = 7',
      '# max4 3 (-8) 12 5 ;;',
      '- : int = 12',
      '# min4 3 (-8) 12 5 ;;',
      '- : int = -8'],
    'sem-3-4': [
      '# let max2 a b = if a > b then a else b ;;',
      'val max2 : \'a -> \'a -> \'a = <fun>',
      '# let min2 a b = if a < b then a else b ;;',
      'val min2 : \'a -> \'a -> \'a = <fun>',
      '# let max3 a b c =',
      '    if a > b then',
      '      if a > c then a else c',
      '    else',
      '      if b > c then b else c ;;',
      'val max3 : \'a -> \'a -> \'a -> \'a = <fun>',
      '# let middle3 a b c = max2 (min2 a b) (min2 (max2 a b) c) ;;',
      'val middle3 : \'a -> \'a -> \'a -> \'a = <fun>',
      '# let highest_square_sum a b c =',
      '    let m = max3 a b c and n = middle3 a b c in',
      '      m * m + n * n ;;',
      'val highest_square_sum : int -> int -> int -> int = <fun>',
      '# highest_square_sum 3 2 1 ;;',
      '- : int = 13',
      '# highest_square_sum 1 (-5) 10 ;;',
      '- : int = 101',
      '# highest_square_sum (-1) (-2) (-3) ;;',
      '- : int = 5'],
    'sem-3-5': [
      '# let f1 x = match x with 0 -> 0 | y -> 1 / y ;;',
      'val f1 : int -> int = <fun>',
      '# let f2 x = match x with',
      '      _ when x > 0 -> _',
      '    | _ -> 0 ;;',
      'Error: Syntax error: wildcard "_" not expected.',
      '# let switchonoff x = match x with',
      '      "on" -> true',
      '    | "off" -> false ;;',
      'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
      'Here is an example of a case that is not matched:',
      '""',
      'val switchonoff : string -> bool = <fun>',
      '# let a = 42 and b = 666 in',
      '    match a * b - 27972 with',
      '      | 0            -> "zero"',
      '      | x when x > 0 -> "positive"',
      '      | _            -> "negative" ;;',
      '- : string = "zero"',
      '# let square x = match x with',
      '      x when x > 0 -> x * x',
      '    | x when x <= 0 -> invalid_arg "x has to be positive" ;;',
      'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
      'All clauses in this pattern-matching are guarded.',
      'val square : int -> int = <fun>',
      '# square 5 ;;',
      '- : int = 25',
      '# square (-5) ;;',
      'Exception: Invalid_argument "x has to be positive".',
      '# let parity n =',
      '    if n >= 0 then',
      '      match n mod 10 with',
      '          0 | 2 | 4 | 6 | 8 -> "even"',
      '        | 1 | 3 | 5 | 7 | 9 -> "odd"',
      '    else',
      '      failwith "negative"',
      '  in',
      '    parity 48 ;;',
      'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
      'Here is an example of a case that is not matched:',
      '10',
      '- : string = "even"',
      '# let grade a b =',
      '    match (a + b) / 2 with',
      '        x when x > 15 -> \'A\'',
      '      | x when x > 5 -> \'D\'',
      '      | 8 | 9 | 10    -> \'C\'',
      '      | x when x > 11 -> \'B\'',
      '      | _             -> \'E\' ;;',
      'val grade : int -> int -> char = <fun>',
      '# grade 12 14 ;;',
      '- : char = \'D\'',
      '# let h x y =',
      '    match x with',
      '        0 -> 0',
      '      | y -> 1',
      '      | _ -> -1 ;;',
      'Warning 11 [redundant-case]: this match case is unused.',
      'val h : int -> \'a -> int = <fun>',
      '# h 5 5 ;;',
      '- : int = 1',
      '# h 5 3 ;;',
      '- : int = 1'],
    'sem-3-5b': [
      '# let f2 x = match x with',
      '      _ when x > 0 -> x',
      '    | _ -> 0 ;;',
      'val f2 : int -> int = <fun>',
      '# let switchonoff x = match x with',
      '      "on" -> true',
      '    | "off" -> false',
      '    | _ -> invalid_arg "switchonoff: on or off" ;;',
      'val switchonoff : string -> bool = <fun>',
      '# let square x = match x with',
      '      x when x > 0 -> x * x',
      '    | _ -> invalid_arg "x has to be positive" ;;',
      'val square : int -> int = <fun>',
      '# let parity n =',
      '    if n >= 0 then',
      '      (match n mod 10 with',
      '          0 | 2 | 4 | 6 | 8 -> "even"',
      '        | _ -> "odd")',
      '    else',
      '      failwith "negative"',
      '  in',
      '    parity 48 ;;',
      '- : string = "even"',
      '# let grade a b =',
      '    match (a + b) / 2 with',
      '        x when x > 15 -> \'A\'',
      '      | x when x > 11 -> \'B\'',
      '      | 8 | 9 | 10    -> \'C\'',
      '      | x when x > 5  -> \'D\'',
      '      | _             -> \'E\' ;;',
      'val grade : int -> int -> char = <fun>',
      '# grade 12 14 ;;',
      '- : char = \'B\'',
      '# let h x y =',
      '    match x with',
      '        0 -> 0',
      '      | z when z = y -> 1',
      '      | _ -> -1 ;;',
      'val h : int -> int -> int = <fun>',
      '# h 5 5 ;;',
      '- : int = 1',
      '# h 5 3 ;;',
      '- : int = -1'],
    'sem-3-7': [
      '# let rate_eco w =',
      '    if w <= 500 then 3.4',
      '    else if w <= 1000 then 4.6',
      '    else if w <= 2000 then 5.1',
      '    else 6.9 ;;',
      'val rate_eco : int -> float = <fun>',
      '# let rate_standard w =',
      '    if w <= 500 then 4.6',
      '    else if w <= 1000 then 5.9',
      '    else if w <= 2000 then 6.5',
      '    else 7.2 ;;',
      'val rate_standard : int -> float = <fun>',
      '# let rate_express w =',
      '    if w <= 500 then 9.1',
      '    else if w <= 1000 then 11.',
      '    else if w <= 2000 then 13.5',
      '    else 14.2 ;;',
      'val rate_express : int -> float = <fun>',
      '# let rate w code =',
      '    if w < 0 then',
      '      invalid_arg "weight has to be positive"',
      '    else',
      '      if w > 3000 then',
      '        failwith "too heavy"',
      '      else',
      '        match code with',
      '            "eco" -> rate_eco w',
      '          | "standard" -> rate_standard w',
      '          | "express" -> rate_express w',
      '          | _ -> failwith "unknown code" ;;',
      'val rate : int -> string -> float = <fun>',
      '# rate 750 "eco" ;;',
      '- : float = 4.6',
      '# rate (-150) "standard" ;;',
      'Exception: Invalid_argument "weight has to be positive".',
      '# rate 150 "drone" ;;',
      'Exception: Failure "unknown code".',
      '# rate 3500 "express" ;;',
      'Exception: Failure "too heavy".',
      '# rate 3000 "express" ;;',
      '- : float = 14.2',
      '# rate 500 "standard" ;;',
      '- : float = 4.6'],
    'sem-3-7b': [
      '# let rate w code =',
      '    if w < 0 then',
      '      invalid_arg "weight has to be positive"',
      '    else',
      '      let (eco, standard, express) =',
      '        if w <= 500 then (3.4, 4.6, 9.1)',
      '        else if w <= 1000 then (4.6, 5.9, 11.)',
      '        else if w <= 2000 then (5.1, 6.5, 13.5)',
      '        else if w <= 3000 then (6.9, 7.2, 14.2)',
      '        else failwith "too heavy"',
      '      in',
      '        match code with',
      '            "eco" -> eco',
      '          | "standard" -> standard',
      '          | "express" -> express',
      '          | _ -> failwith "unknown code" ;;',
      'val rate : int -> string -> float = <fun>',
      '# rate 750 "eco" ;;',
      '- : float = 4.6',
      '# rate (-150) "standard" ;;',
      'Exception: Invalid_argument "weight has to be positive".',
      '# rate 150 "drone" ;;',
      'Exception: Failure "unknown code".',
      '# rate 3500 "express" ;;',
      'Exception: Failure "too heavy".'],
    'sem-3-9': [
      '# let count = function',
      '      (0, 0) -> 2',
      '    | (0, _) | (_, 0) -> 1',
      '    | _ -> 0 ;;',
      'val count : int * int -> int = <fun>',
      '# count (0, 0) ;;',
      '- : int = 2',
      '# count (0, 1) ;;',
      '- : int = 1',
      '# count (4, 5) ;;',
      '- : int = 0',
      '# let f = function',
      '      (0, _) -> 0',
      '    | (m, 0) -> 2 * m',
      '    | (m, n) -> m * n ;;',
      'val f : int * int -> int = <fun>',
      '# f (0, 7) ;;',
      '- : int = 0',
      '# f (3, 0) ;;',
      '- : int = 6',
      '# f (-3, 4) ;;',
      '- : int = -12',
      '# let and3 = function',
      '      (true, true, true) -> true',
      '    | _ -> false ;;',
      'val and3 : bool * bool * bool -> bool = <fun>',
      '# and3 (true, true, true) ;;',
      '- : bool = true',
      '# and3 (true, false, true) ;;',
      '- : bool = false'],
    'sem-4-10': [
      '# let rec power x n =',
      '    if n = 0 then',
      '      1.',
      '    else',
      '      x *. power x (n-1) ;;',
      'val power : float -> int -> float = <fun>',
      '# power 2. 10 ;;',
      '- : float = 1024.',
      '# power 1.5 0 ;;',
      '- : float = 1.',
      '# let rec fast_power x n =',
      '    if n = 0 then',
      '      1.',
      '    else',
      '      let p = fast_power x (n / 2) in',
      '        if n mod 2 = 0 then',
      '          p *. p',
      '        else',
      '          x *. p *. p ;;',
      'val fast_power : float -> int -> float = <fun>',
      '# fast_power 2. 10 ;;',
      '- : float = 1024.',
      '# fast_power 1.5 3 ;;',
      '- : float = 3.375',
      '# fast_power 2. 0 ;;',
      '- : float = 1.',
      '# fast_power 10. 15 ;;',
      '- : float = 1e+15'],
    'sem-4-1a': [
      '# let rec f1 n = match n with',
      '      0 -> 0',
      '    | n -> n + f1 (n-1) ;;',
      'val f1 : int -> int = <fun>',
      '# f1 4 ;;',
      '- : int = 10',
      '# f1 0 ;;',
      '- : int = 0',
      '# f1 (-1) ;;',
      'Stack overflow during evaluation (looping recursion?).',
      '# let rec f2 n d = match n with',
      '      n when n < 0       -> invalid_arg "f2: n < 0"',
      '    | 0                  -> 0',
      '    | n when n mod d = 0 -> n + f2 (n-1) d',
      '    | n                  -> f2 (n-1) d ;;',
      'val f2 : int -> int -> int = <fun>',
      '# f2 10 3 ;;',
      '- : int = 18',
      '# f2 (-2) 3 ;;',
      'Exception: Invalid_argument "f2: n < 0".',
      '# f2 5 0 ;;',
      'Exception: Division_by_zero.',
      '# let rec f3 d n =',
      '    if n <= 1 then',
      '      d',
      '    else',
      '      d * f3 (d - 1) (n - 1) ;;',
      'val f3 : int -> int -> int = <fun>',
      '# f3 5 3 ;;',
      '- : int = 60',
      '# f3 7 1 ;;',
      '- : int = 7',
      '# let rec f4 n =',
      '    if n <= 0 then 0',
      '    else',
      '      let r = f4 (n - 1) in',
      '      if n mod 4 = 0 then r + n else r ;;',
      'val f4 : int -> int = <fun>',
      '# f4 12 ;;',
      '- : int = 24',
      '# let f n =',
      '    let rec g n acc =',
      '      if n = 0 then',
      '        acc',
      '      else',
      '        g (n-1) (acc * 10 + 1)',
      '      in',
      '        g n 0 ;;',
      'val f : int -> int = <fun>',
      '# f 4 ;;',
      '- : int = 1111',
      '# f 0 ;;',
      '- : int = 0',
      '# let rec double = function',
      '      0 -> 0',
      '    | n -> n / 2 + double (2*n) ;;',
      'val double : int -> int = <fun>',
      '# double 0 ;;',
      '- : int = 0',
      '# double 1 ;;',
      '- : int = -1',
      '# let rec mystery x =',
      '    if x < 10 then',
      '      1',
      '    else',
      '      1 + mystery (x/10) ;;',
      'val mystery : int -> int = <fun>',
      '# mystery 2026 ;;',
      '- : int = 4',
      '# mystery 7 ;;',
      '- : int = 1',
      '# mystery (-345) ;;',
      '- : int = 1'],
    'sem-4-1b': [
      '# let rec print1 n =',
      '    if n = 0 then',
      '      ()',
      '    else',
      '      begin',
      '        print_int n; print_char \' \';',
      '        print1 (n-1)',
      '      end ;;',
      'val print1 : int -> unit = <fun>',
      '# print1 5 ;;',
      '5 4 3 2 1 - : unit = ()',
      '# let rec print2 n =',
      '    if n = 0 then',
      '      ()',
      '    else',
      '      begin',
      '        print2 (n-1);',
      '        print_int n; print_char \' \';',
      '      end ;;',
      'val print2 : int -> unit = <fun>',
      '# print2 5 ;;',
      '1 2 3 4 5 - : unit = ()',
      '# let rec g n d =',
      '    if n = 0 then',
      '      0',
      '    else',
      '      begin',
      '        print_int n; print_char \' \'; print_int d; print_newline();',
      '        if n mod d = 0 then',
      '          1 + g (n/10) d',
      '        else',
      '          g (n/10) (d-1);',
      '      end ;;',
      'val g : int -> int -> int = <fun>',
      '# g 435567 7 ;;',
      '435567 7',
      '43556 6',
      '4355 5',
      '435 5',
      '43 5',
      '4 4',
      '- : int = 3'],
    'sem-4-6': [
      '# let rec mult x y =',
      '    if y = 0 then',
      '      0',
      '    else',
      '      x + mult x (y - 1) ;;',
      'val mult : int -> int -> int = <fun>',
      '# mult 7 3 ;;',
      '- : int = 21',
      '# mult 7 0 ;;',
      '- : int = 0',
      '# let multiply x y =',
      '    let rec mult_rec = function',
      '        0 -> 0',
      '      | y -> x + mult_rec (y-1)',
      '    in',
      '    match x with',
      '      0 -> 0',
      '    | 1 -> y',
      '    | x ->',
      '        if y < 0 then',
      '          -mult_rec (-y)',
      '        else',
      '          mult_rec y ;;',
      'val multiply : int -> int -> int = <fun>',
      '# multiply 7 (-3) ;;',
      '- : int = -21',
      '# multiply (-2) 6 ;;',
      '- : int = -12',
      '# multiply (-2) (-6) ;;',
      '- : int = 12',
      '# multiply 0 5 ;;',
      '- : int = 0',
      '# multiply 1 (-4) ;;',
      '- : int = -4'],
    'sem-4-6b': [
      '# let multiply x y =',
      '    let rec mult_rec = function',
      '        0 -> 0',
      '      | y -> x + mult_rec (x, y-1)',
      '    in',
      '    match x with',
      '      0 -> 0',
      '    | 1 -> y',
      '    | x ->',
      '        if y < 0 then',
      '          -mult_rec (-y)',
      '        else',
      '          mult_rec y ;;',
      'Error: This expression has type \'a * \'b',
      '       but an expression was expected of type int'],
    'sem-4-8': [
      '# let rec fibo n =',
      '    if n <= 1 then',
      '      1',
      '    else',
      '      fibo (n-1) + fibo (n-2) ;;',
      'val fibo : int -> int = <fun>',
      '# fibo 0 ;;',
      '- : int = 1',
      '# fibo 5 ;;',
      '- : int = 8',
      '# fibo 10 ;;',
      '- : int = 89',
      '# let fibo2 n =',
      '    if n < 0 then',
      '      invalid_arg "fibo: n < 0"',
      '    else',
      '      let rec fib a b n =       (* a = F(k), b = F(k+1) *)',
      '        if n = 0 then',
      '          a',
      '        else',
      '          fib b (a + b) (n-1)',
      '      in',
      '        fib 1 1 n ;;',
      'val fibo2 : int -> int = <fun>',
      '# fibo2 10 ;;',
      '- : int = 89',
      '# fibo2 0 ;;',
      '- : int = 1',
      '# fibo2 50 ;;',
      '- : int = 20365011074',
      '# fibo2 (-3) ;;',
      'Exception: Invalid_argument "fibo: n < 0".'],
    'sem-4-8c': [
      '# let calls = ref 0 ;;',
      'val calls : int ref = {contents = 0}',
      '# let rec fibo_count n = incr calls; if n <= 1 then 1 else fibo_count (n-1) + fibo_count (n-2) ;;',
      'val fibo_count : int -> int = <fun>',
      '# fibo_count 10 ;;',
      '- : int = 89',
      '# !calls ;;',
      '- : int = 177',
      '# calls := 0 ;;',
      '- : unit = ()',
      '# fibo_count 25 ;;',
      '- : int = 121393',
      '# !calls ;;',
      '- : int = 242785',
      '# calls := 0 ;;',
      '- : unit = ()',
      '# fibo_count 30 ;;',
      '- : int = 1346269',
      '# !calls ;;',
      '- : int = 2692537'],
    'sem-4-9': [
      '# let reverse n =',
      '    let rec rev n =',
      '      if n < 10 then',
      '        string_of_int n',
      '      else',
      '        string_of_int (n mod 10) ^ rev (n / 10)',
      '    in',
      '      if n < 0 then',
      '        invalid_arg "reverse: n < 0"',
      '      else',
      '        rev n ;;',
      'val reverse : int -> string = <fun>',
      '# reverse 1234 ;;',
      '- : string = "4321"',
      '# reverse 1200 ;;',
      '- : string = "0021"',
      '# reverse 7 ;;',
      '- : string = "7"',
      '# let reverse_int n =',
      '    if n < 0 then',
      '      invalid_arg "reverse_int: n < 0"',
      '    else',
      '      let rec rev acc n =',
      '        if n = 0 then',
      '          acc',
      '        else',
      '          rev (acc * 10 + n mod 10) (n / 10)',
      '      in',
      '        rev 0 n ;;',
      'val reverse_int : int -> int = <fun>',
      '# reverse_int 1234 ;;',
      '- : int = 4321',
      '# reverse_int 1200 ;;',
      '- : int = 21',
      '# reverse_int 0 ;;',
      '- : int = 0',
      '# reverse_int (-12) ;;',
      'Exception: Invalid_argument "reverse_int: n < 0".'],
    'sem-hanoi': [
      '# let move source destination =',
      '    print_int source ;',
      '    print_string " -> " ;',
      '    print_int destination ;',
      '    print_newline() ;;',
      'val move : int -> int -> unit = <fun>',
      '# let hanoi n =',
      '    let rec play n source destination =',
      '      if n > 0 then',
      '        let other = 6 - source - destination in',
      '          begin',
      '            play (n-1) source other ;',
      '            move source destination ;',
      '            play (n-1) other destination',
      '          end',
      '    in',
      '    if n <= 0 then',
      '      invalid_arg "Hanoi: number of disks invalid"',
      '    else',
      '      play n 1 3 ;;',
      'val hanoi : int -> unit = <fun>',
      '# hanoi 3 ;;',
      '1 -> 3',
      '1 -> 2',
      '3 -> 2',
      '1 -> 3',
      '2 -> 1',
      '2 -> 3',
      '1 -> 3',
      '- : unit = ()',
      '# hanoi 1 ;;',
      '1 -> 3',
      '- : unit = ()',
      '# hanoi 0 ;;',
      'Exception: Invalid_argument "Hanoi: number of disks invalid".',
      '# let rec moves n =',
      '    if n = 0 then',
      '      0',
      '    else',
      '      2 * moves (n-1) + 1 ;;',
      'val moves : int -> int = <fun>',
      '# moves 3 ;;',
      '- : int = 7',
      '# moves 10 ;;',
      '- : int = 1023'],
    'td-listes-1-1': [
      '# let rec product = function',
      '      [] -> 1',
      '    | e :: l -> e * product l ;;',
      'val product : int list -> int = <fun>',
      '# product [2; 3; 7] ;;',
      '- : int = 42',
      '# product [-4; 5] ;;',
      '- : int = -20',
      '# product [] ;;',
      '- : int = 1'],
    'td-listes-1-1b': [
      '# let rec product = function',
      '      [] -> 0',
      '    | e :: l -> e * product l ;;',
      'val product : int list -> int = <fun>',
      '# product [2; 3; 7] ;;',
      '- : int = 0'],
    'td-listes-1-2': [
      '# let rec count x = function',
      '      [] -> 0',
      '    | e :: l ->',
      '        if e = x then',
      '          1 + count x l',
      '        else',
      '          count x l ;;',
      'val count : \'a -> \'a list -> int = <fun>',
      '# count 2 [1; 2; 3; 2; 2] ;;',
      '- : int = 3',
      '# count "b" ["a"; "b"; "c"] ;;',
      '- : int = 1',
      '# count \'a\' [] ;;',
      '- : int = 0'],
    'td-listes-1-2b': [
      '# let rec count x = function',
      '      [] -> 0',
      '    | x :: l -> 1 + count x l',
      '    | _ :: l -> count x l ;;',
      'Warning 11 [redundant-case]: this match case is unused.',
      'val count : \'a -> \'a list -> int = <fun>',
      '# count 2 [1; 2; 3] ;;',
      '- : int = 3'],
    'td-listes-1-3': [
      '# let rec search x = function',
      '      [] -> false',
      '    | e :: l -> e = x || search x l ;;',
      'val search : \'a -> \'a list -> bool = <fun>',
      '# search 3 [1; 2; 3; 4] ;;',
      '- : bool = true',
      '# search "z" ["a"; "b"] ;;',
      '- : bool = false',
      '# search \'a\' [] ;;',
      '- : bool = false'],
    'td-listes-1-3b': [
      '# let rec search x = function',
      '      [] -> false',
      '    | e :: l ->',
      '        if e = x then',
      '          true',
      '        else',
      '          search x l ;;',
      'val search : \'a -> \'a list -> bool = <fun>',
      '# search 3 [1; 2; 3; 4] ;;',
      '- : bool = true'],
    'td-listes-1-4': [
      '# let nth i lst =',
      '    if i <= 0 then',
      '      invalid_arg "nth: i <= 0"',
      '    else',
      '      let rec get i = function',
      '          [] -> failwith "nth: list too short"',
      '        | e :: l ->',
      '            if i = 1 then',
      '              e',
      '            else',
      '              get (i-1) l',
      '      in',
      '        get i lst ;;',
      'val nth : int -> \'a list -> \'a = <fun>',
      '# nth 3 [\'a\'; \'b\'; \'c\'; \'d\'] ;;',
      '- : char = \'c\'',
      '# nth 1 [42] ;;',
      '- : int = 42',
      '# nth 5 [\'a\'; \'b\'] ;;',
      'Exception: Failure "nth: list too short".',
      '# nth 0 [\'a\'; \'b\'] ;;',
      'Exception: Invalid_argument "nth: i <= 0".',
      '# nth (-1) [] ;;',
      'Exception: Invalid_argument "nth: i <= 0".',
      '# nth 1 [] ;;',
      'Exception: Failure "nth: list too short".'],
    'td-listes-1-5': [
      '# let rec maximum = function',
      '      [] -> failwith "maximum: empty list"',
      '    | [e] -> e',
      '    | e :: l ->',
      '        let m = maximum l in',
      '          if e > m then',
      '            e',
      '          else',
      '            m ;;',
      'val maximum : \'a list -> \'a = <fun>',
      '# maximum [3; 9; 2; 9; 1] ;;',
      '- : int = 9',
      '# maximum [-5] ;;',
      '- : int = -5',
      '# maximum ["pear"; "apple"; "plum"] ;;',
      '- : string = "plum"',
      '# maximum [] ;;',
      'Exception: Failure "maximum: empty list".'],
    'td-listes-1-5b': [
      '# let rec maximum = function',
      '      [] -> 0',
      '    | e :: l ->',
      '        if e > maximum l then',
      '          e',
      '        else',
      '          maximum l ;;',
      'val maximum : int list -> int = <fun>',
      '# maximum [-3; -8] ;;',
      '- : int = 0'],
    'td-listes-1-6': [
      '# let second lst =',
      '    let rec aux m1 m2 = function    (* m1 <= m2 : the two smallest seen so far *)',
      '        [] -> m2',
      '      | e :: l ->',
      '          if e < m1 then',
      '            aux e m1 l',
      '          else',
      '            if e < m2 then',
      '              aux m1 e l',
      '            else',
      '              aux m1 m2 l',
      '    in',
      '      match lst with',
      '          e1 :: e2 :: l ->',
      '            if e1 < e2 then',
      '              aux e1 e2 l',
      '            else',
      '              aux e2 e1 l',
      '        | _ -> failwith "second: Not enough values" ;;',
      'val second : \'a list -> \'a = <fun>',
      '# second [1; 3; 4; 2] ;;',
      '- : int = 2',
      '# second [3.5; 8.2; 9.5; 4.0] ;;',
      '- : float = 4.',
      '# second [\'a\'] ;;',
      'Exception: Failure "second: Not enough values".',
      '# second [] ;;',
      'Exception: Failure "second: Not enough values".',
      '# second [5; 5] ;;',
      '- : int = 5',
      '# second [9; 4] ;;',
      '- : int = 9'],
    'td-listes-2-1': [
      '# let arith_list n a1 r =',
      '    if n < 0 then',
      '      invalid_arg "arith_list: n < 0"',
      '    else',
      '      let rec build n a =',
      '        if n = 0 then',
      '          []',
      '        else',
      '          a :: build (n-1) (a + r)',
      '      in',
      '        build n a1 ;;',
      'val arith_list : int -> int -> int -> int list = <fun>',
      '# arith_list 12 2 1 ;;',
      '- : int list = [2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13]',
      '# arith_list 11 0 3 ;;',
      '- : int list = [0; 3; 6; 9; 12; 15; 18; 21; 24; 27; 30]',
      '# arith_list 4 10 (-5) ;;',
      '- : int list = [10; 5; 0; -5]',
      '# arith_list 0 5 5 ;;',
      '- : int list = []',
      '# arith_list (-1) 0 1 ;;',
      'Exception: Invalid_argument "arith_list: n < 0".'],
    'td-listes-2-2': [
      '# let rec append l1 l2 =',
      '    match l1 with',
      '        [] -> l2',
      '      | e :: l -> e :: append l l2 ;;',
      'val append : \'a list -> \'a list -> \'a list = <fun>',
      '# append [3;1;2] [8;4] ;;',
      '- : int list = [3; 1; 2; 8; 4]',
      '# append [] [9;7;8] ;;',
      '- : int list = [9; 7; 8]',
      '# append [\'a\'] [] ;;',
      '- : char list = [\'a\']'],
    'td-listes-2-2b': [
      '# let rec append l1 l2 =',
      '    match l1 with',
      '        [] -> l2',
      '      | e :: l -> e :: append l l2 ;;',
      'val append : \'a list -> \'a list -> \'a list = <fun>',
      '# append [[1]; [2; 3]] [[4]] ;;',
      '- : int list list = [[1]; [2; 3]; [4]]',
      '# append [1; 2] 3 ;;',
      'Error: This expression has type int but an expression was expected of type',
      '         int list',
      '# append [1; 2] [3] ;;',
      '- : int list = [1; 2; 3]'],
    'td-listes-3-1': [
      '# let rec is_increasing = function',
      '      [] | [_] -> true',
      '    | e1 :: e2 :: l -> e1 <= e2 && is_increasing (e2 :: l) ;;',
      'val is_increasing : \'a list -> bool = <fun>',
      '# is_increasing [1; 2; 2; 5] ;;',
      '- : bool = true',
      '# is_increasing [1; 3; 2] ;;',
      '- : bool = false',
      '# is_increasing [\'a\'; \'c\'; \'z\'] ;;',
      '- : bool = true',
      '# is_increasing [] ;;',
      '- : bool = true',
      '# is_increasing [42] ;;',
      '- : bool = true'],
    'td-listes-3-1b': [
      '# let rec is_increasing = function',
      '      [] -> true',
      '    | e1 :: e2 :: l -> e1 <= e2 && is_increasing l ;;',
      'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
      'Here is an example of a case that is not matched:',
      '_::[]',
      'val is_increasing : \'a list -> bool = <fun>',
      '# is_increasing [1; 3; 2; 4] ;;',
      '- : bool = true'],
    'td-listes-3-2': [
      '# let rec delete x = function',
      '      [] -> []',
      '    | e :: l ->',
      '        if e = x then',
      '          l',
      '        else',
      '          if e > x then',
      '            e :: l',
      '          else',
      '            e :: delete x l ;;',
      'val delete : \'a -> \'a list -> \'a list = <fun>',
      '# delete 4 [1; 2; 2; 3; 4; 4; 4; 5] ;;',
      '- : int list = [1; 2; 2; 3; 4; 4; 5]',
      '# delete 0 [1; 2; 3] ;;',
      '- : int list = [1; 2; 3]',
      '# delete 9 [1; 2; 3] ;;',
      '- : int list = [1; 2; 3]',
      '# delete "b" ["a"; "b"; "c"] ;;',
      '- : string list = ["a"; "c"]',
      '# delete 7 [] ;;',
      '- : int list = []'],
    'td-listes-3-2b': [
      '# let rec delete x = function',
      '      [] -> []',
      '    | h::q when h > x -> h :: q',
      '    | h::q when h = x -> q',
      '    | h::q -> h::delete x q ;;',
      'val delete : \'a -> \'a list -> \'a list = <fun>',
      '# delete 4 [1; 2; 2; 3; 4; 4; 4; 5] ;;',
      '- : int list = [1; 2; 2; 3; 4; 4; 5]'],
    'td-listes-3-3': [
      '# let insert_nth x i lst =',
      '    if i <= 0 then',
      '      invalid_arg "negative rank"',
      '    else',
      '      let rec insert i = function',
      '          l when i = 1 -> x :: l',
      '        | [] -> failwith "out of bound"',
      '        | e :: l -> e :: insert (i-1) l',
      '      in',
      '        insert i lst ;;',
      'val insert_nth : \'a -> int -> \'a list -> \'a list = <fun>',
      '# insert_nth 0 5 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
      '- : int list = [1; 2; 3; 4; 0; 5; 6; 7; 8; 9]',
      '# insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
      '- : int list = [1; 2; 3; 4; 5; 6; 7; 8; 9; 0]',
      '# insert_nth 0 12 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
      'Exception: Failure "out of bound".',
      '# insert_nth 0 (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
      'Exception: Invalid_argument "negative rank".',
      '# insert_nth \'a\' 1 [] ;;',
      '- : char list = [\'a\']',
      '# insert_nth \'a\' 2 [] ;;',
      'Exception: Failure "out of bound".',
      '# insert_nth \'a\' 0 [\'b\'] ;;',
      'Exception: Invalid_argument "negative rank".'],
    'td-listes-3-3b': [
      '# let insert_nth x i lst =',
      '    if i <= 0 then',
      '      invalid_arg "negative rank"',
      '    else',
      '      let rec insert i = function',
      '          [] -> failwith "out of bound"',
      '        | e :: l ->',
      '            if i = 1 then',
      '              x :: e :: l',
      '            else',
      '              e :: insert (i-1) l',
      '      in',
      '        insert i lst ;;',
      'val insert_nth : \'a -> int -> \'a list -> \'a list = <fun>',
      '# insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
      'Exception: Failure "out of bound".'],
    'td-listes-3-3c': [
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
      'val insert_nth : \'a -> int -> \'a list -> \'a list = <fun>',
      '# insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;',
      '- : int list = [1; 2; 3; 4; 5; 6; 7; 8; 9; 0]'],
    'td-listes-3-4': [
      '# let rec remove_x x = function',
      '      [] -> []',
      '    | e :: l ->',
      '        if e = x then',
      '          remove_x x l',
      '        else',
      '          e :: remove_x x l ;;',
      'val remove_x : \'a -> \'a list -> \'a list = <fun>',
      '# let rec remove_duplicates = function',
      '      [] -> []',
      '    | e :: l -> e :: remove_duplicates (remove_x e l) ;;',
      'val remove_duplicates : \'a list -> \'a list = <fun>',
      '# remove_duplicates [3; 1; 2; 2; 3; 1; 4; 5; 5] ;;',
      '- : int list = [3; 1; 2; 4; 5]',
      '# remove_duplicates ["cherry"; "banana"; "apple"; "apple"; "banana"; "cherry"] ;;',
      '- : string list = ["cherry"; "banana"; "apple"]',
      '# remove_duplicates [42; 13; 42; 7; 7; 13; 42; 42] ;;',
      '- : int list = [42; 13; 7]',
      '# remove_duplicates ["dog"; "cat"; "dog"; "rat"; "rat"; "bat"] ;;',
      '- : string list = ["dog"; "cat"; "rat"; "bat"]',
      '# remove_duplicates [true; true; false; true; false; true; false] ;;',
      '- : bool list = [true; false]',
      '# remove_duplicates [] ;;',
      '- : \'a list = []'],
    'td-listes-3-4b': [
      '# let rec search x = function',
      '      [] -> false',
      '    | e :: l -> e = x || search x l ;;',
      'val search : \'a -> \'a list -> bool = <fun>',
      '# let rec remove_duplicates = function',
      '      [] -> []',
      '    | e :: l ->',
      '        if search e l then',
      '          remove_duplicates l',
      '        else',
      '          e :: remove_duplicates l ;;',
      'val remove_duplicates : \'a list -> \'a list = <fun>',
      '# remove_duplicates [3; 1; 2; 2; 3; 1; 4; 5; 5] ;;',
      '- : int list = [2; 3; 1; 4; 5]'],
    'td-listes-3-5': [
      '# let rec reverse = function',
      '      [] -> []',
      '    | e :: l -> reverse l @ [e] ;;',
      'val reverse : \'a list -> \'a list = <fun>',
      '# reverse [1; 2; 3; 4] ;;',
      '- : int list = [4; 3; 2; 1]',
      '# let reverse2 lst =',
      '    let rec rev acc = function',
      '        [] -> acc',
      '      | e :: l -> rev (e :: acc) l',
      '    in',
      '      rev [] lst ;;',
      'val reverse2 : \'a list -> \'a list = <fun>',
      '# reverse2 [1; 2; 3; 4] ;;',
      '- : int list = [4; 3; 2; 1]',
      '# reverse2 ["a"] ;;',
      '- : string list = ["a"]',
      '# reverse2 [] ;;',
      '- : \'a list = []'],
    'td-listes-3-6': [
      '# let count_positive lst k =',
      '    if k <= 0 || lst = [] then',
      '      invalid_arg "count_positive: k <= 0 or empty list"',
      '    else',
      '      let rec less k = function',
      '          [] -> true',
      '        | e :: l ->',
      '            if e > 0 then',
      '              k > 1 && less (k-1) l',
      '            else',
      '              less k l',
      '      in',
      '        less k lst ;;',
      'val count_positive : int list -> int -> bool = <fun>',
      '# count_positive [] 42 ;;',
      'Exception: Invalid_argument "count_positive: k <= 0 or empty list".',
      '# count_positive [8; 12; -2; 6; 0] 4 ;;',
      '- : bool = true',
      '# count_positive [8; 12; -2; 6; 0] 3 ;;',
      '- : bool = false',
      '# count_positive [1] 0 ;;',
      'Exception: Invalid_argument "count_positive: k <= 0 or empty list".',
      '# count_positive [-3; 0] 1 ;;',
      '- : bool = true',
      '# let count_positive_sorted lst k =',
      '    if k <= 0 || lst = [] then',
      '      invalid_arg "count_positive: k <= 0 or empty list"',
      '    else',
      '      let rec shorter k = function    (* does the list have fewer than k elements? *)',
      '          [] -> true',
      '        | _ :: l -> k > 1 && shorter (k-1) l',
      '      in',
      '      let rec skip = function         (* skips the elements <= 0 *)',
      '          [] -> true',
      '        | e :: l ->',
      '            if e > 0 then',
      '              shorter k (e :: l)',
      '            else',
      '              skip l',
      '      in',
      '        skip lst ;;',
      'val count_positive_sorted : int list -> int -> bool = <fun>',
      '# count_positive_sorted [-2; 0; 6; 8; 12] 4 ;;',
      '- : bool = true',
      '# count_positive_sorted [-2; 0; 6; 8; 12] 3 ;;',
      '- : bool = false',
      '# count_positive_sorted [-2; -1] 1 ;;',
      '- : bool = true',
      '# count_positive_sorted [] 3 ;;',
      'Exception: Invalid_argument "count_positive: k <= 0 or empty list".'],
    'td-listes-4-1': [
      '# let rec equals l1 l2 =',
      '    match (l1, l2) with',
      '        ([], []) -> true',
      '      | (e1 :: r1, e2 :: r2) -> e1 = e2 && equals r1 r2',
      '      | _ -> false ;;',
      'val equals : \'a list -> \'a list -> bool = <fun>',
      '# equals [1; 2; 3] [1; 2; 3] ;;',
      '- : bool = true',
      '# equals [1; 2] [1; 2; 3] ;;',
      '- : bool = false',
      '# equals [\'a\'; \'b\'] [\'a\'; \'c\'] ;;',
      '- : bool = false',
      '# equals [] [] ;;',
      '- : bool = true'],
    'td-listes-4-1b': [
      '# let rec equals l1 l2 =',
      '    match (l1, l2) with',
      '        ([], []) -> true',
      '      | (e1 :: r1, e2 :: r2) -> e1 = e2 && equals r1 r2 ;;',
      'Warning 8 [partial-match]: this pattern-matching is not exhaustive.',
      'Here is an example of a case that is not matched:',
      '([], _::_)',
      'val equals : \'a list -> \'a list -> bool = <fun>',
      '# equals [1; 2] [1; 2; 3] ;;',
      'Exception: Match_failure ("//toplevel//", 2, 2).'],
    'td-listes-4-2': [
      '# let rec shared l1 l2 =',
      '    match (l1, l2) with',
      '        ([], _) | (_, []) -> []',
      '      | (e1 :: r1, e2 :: r2) ->',
      '          if e1 = e2 then',
      '            e1 :: shared r1 r2',
      '          else',
      '            if e1 < e2 then',
      '              shared r1 l2',
      '            else',
      '              shared l1 r2 ;;',
      'val shared : \'a list -> \'a list -> \'a list = <fun>',
      '# shared [1; 3; 6; 6; 8; 9] [2; 5; 6; 6; 8; 9] ;;',
      '- : int list = [6; 6; 8; 9]',
      '# shared [1; 2; 3] [3] ;;',
      '- : int list = [3]',
      '# shared [1; 6; 6; 7; 7; 7; 7; 9] [2; 5; 6; 6; 6; 8; 9] ;;',
      '- : int list = [6; 6; 9]',
      '# shared [] [1; 2] ;;',
      '- : int list = []'],
    'td-listes-4-3': [
      '# let sublist slst lst =',
      '    let rec prefix = function       (* is the first list a prefix of the second one? *)',
      '        ([], _) -> true',
      '      | (_, []) -> false',
      '      | (e1 :: l1, e2 :: l2) -> e1 = e2 && prefix (l1, l2)',
      '    in',
      '    let rec count = function',
      '        [] -> 0',
      '      | e :: l -> (if prefix (slst, e :: l) then 1 else 0) + count l',
      '    in',
      '      match slst with',
      '          [] -> 0',
      '        | _ -> count lst ;;',
      'val sublist : \'a list -> \'a list -> int = <fun>',
      '# sublist [1; 2] [1; 2] ;;',
      '- : int = 1',
      '# sublist [1; 2] [1; 1; 2; 3; 3; 1; 2; 3] ;;',
      '- : int = 2',
      '# sublist [1; 2] [2; 1] ;;',
      '- : int = 0',
      '# sublist [] [1; 2] ;;',
      '- : int = 0',
      '# sublist [1; 1] [1; 1; 1] ;;',
      '- : int = 2'],
    'td-listes-4-3b': [
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
      'val mystery : \'a list -> \'a list -> int = <fun>',
      '# mystery [1; 2] [1; 2] ;;',
      '- : int = 1',
      '# mystery [1; 2] [1; 1; 2; 3; 3; 1; 2; 3] ;;',
      '- : int = 2',
      '# mystery [1; 2] [2; 1] ;;',
      '- : int = 0',
      '# mystery [] [1; 2] ;;',
      '- : int = 2'],
    'td-listes-5-1': [
      '# let assoc k lst =',
      '    if k <= 0 then',
      '      invalid_arg "k not a natural"',
      '    else',
      '      let rec search = function',
      '          [] -> failwith "not found"',
      '        | (key, value) :: l ->',
      '            if key = k then',
      '              value',
      '            else',
      '              if key > k then',
      '                failwith "not found"',
      '              else',
      '                search l',
      '      in',
      '        search lst ;;',
      'val assoc : int -> (int * \'a) list -> \'a = <fun>',
      '# assoc 5 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")] ;;',
      '- : string = "five"',
      '# assoc 4 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")] ;;',
      'Exception: Failure "not found".',
      '# assoc (-1) [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")] ;;',
      'Exception: Invalid_argument "k not a natural".',
      '# assoc 9 [(1, \'a\'); (2, \'b\')] ;;',
      'Exception: Failure "not found".',
      '# assoc 0 [(1, \'a\')] ;;',
      'Exception: Invalid_argument "k not a natural".',
      '# assoc 1 [] ;;',
      'Exception: Failure "not found".'],
    'td-listes-5-2': [
      '# let rec append l1 l2 =',
      '    match l1 with',
      '        [] -> l2',
      '      | e :: l -> e :: append l l2 ;;',
      'val append : \'a list -> \'a list -> \'a list = <fun>',
      '# let rec flatten = function',
      '      [] -> []',
      '    | l :: others -> append l (flatten others) ;;',
      'val flatten : \'a list list -> \'a list = <fun>',
      '# flatten [[1;2]; [3]; [4;5;6]] ;;',
      '- : int list = [1; 2; 3; 4; 5; 6]',
      '# flatten [[(1,\'a\'); (2,\'b\')]; [(3,\'c\'); (4,\'d\'); (5,\'e\')]; []] ;;',
      '- : (int * char) list = [(1, \'a\'); (2, \'b\'); (3, \'c\'); (4, \'d\'); (5, \'e\')]',
      '# flatten [[]; []] ;;',
      '- : \'a list = []',
      '# flatten [] ;;',
      '- : \'a list = []'],
    'td-listes-5-2b': [
      '# let rec flatten = function',
      '      [] -> []',
      '    | [] :: others -> flatten others',
      '    | (e :: l) :: others -> e :: flatten (l :: others) ;;',
      'val flatten : \'a list list -> \'a list = <fun>',
      '# flatten [[1;2]; [3]; [4;5;6]] ;;',
      '- : int list = [1; 2; 3; 4; 5; 6]'],
    'td-listes-6-1': [
      '# let rec product = function',
      '      [] -> 1',
      '    | e :: l -> e * product l ;;',
      'val product : int list -> int = <fun>',
      '# let rec shared l1 l2 =',
      '    match (l1, l2) with',
      '        ([], _) | (_, []) -> []',
      '      | (e1 :: r1, e2 :: r2) ->',
      '          if e1 = e2 then',
      '            e1 :: shared r1 r2',
      '          else',
      '            if e1 < e2 then',
      '              shared r1 l2',
      '            else',
      '              shared l1 r2 ;;',
      'val shared : \'a list -> \'a list -> \'a list = <fun>',
      '# let prime_factors n =',
      '    let rec factors d n =',
      '      if n = 1 then',
      '        []',
      '      else',
      '        if n mod d = 0 then',
      '          d :: factors d (n / d)',
      '        else',
      '          factors (d + 1) n',
      '    in',
      '      factors 2 n ;;',
      'val prime_factors : int -> int list = <fun>',
      '# prime_factors 150 ;;',
      '- : int list = [2; 3; 5; 5]',
      '# prime_factors 45 ;;',
      '- : int list = [3; 3; 5]',
      '# prime_factors 1 ;;',
      '- : int list = []',
      '# let gcd u v =',
      '    if u <= 0 || v <= 0 then',
      '      invalid_arg "gcd: u and v must be > 0"',
      '    else',
      '      product (shared (prime_factors u) (prime_factors v)) ;;',
      'val gcd : int -> int -> int = <fun>',
      '# gcd 45 150 ;;',
      '- : int = 15',
      '# gcd 7 100 ;;',
      '- : int = 1',
      '# gcd 12 18 ;;',
      '- : int = 6',
      '# gcd 1 9 ;;',
      '- : int = 1',
      '# gcd 0 4 ;;',
      'Exception: Invalid_argument "gcd: u and v must be > 0".'],
    'td-listes-6-2': [
      '# let rec next = function',
      '      [] -> []',
      '    | e :: l ->',
      '        let rec run n = function    (* n = number of e already seen *)',
      '            x :: r when x = e -> run (n+1) r',
      '          | r -> n :: e :: next r',
      '        in',
      '          run 1 l ;;',
      'val next : int list -> int list = <fun>',
      '# next [1; 2; 1; 1] ;;',
      '- : int list = [1; 1; 1; 2; 2; 1]',
      '# let rec sequence n =',
      '    if n < 0 then',
      '      invalid_arg "sequence: n < 0"',
      '    else',
      '      if n = 0 then',
      '        [1]',
      '      else',
      '        next (sequence (n-1)) ;;',
      'val sequence : int -> int list = <fun>',
      '# sequence 5 ;;',
      '- : int list = [3; 1; 2; 2; 1; 1]',
      '# sequence 0 ;;',
      '- : int list = [1]',
      '# sequence 6 ;;',
      '- : int list = [1; 3; 1; 1; 2; 2; 2; 1]'],
    'td-os-1-1': [
      '# let succ = function x -> x + 1 ;;',
      'val succ : int -> int = <fun>',
      '# succ 5 ;;',
      '- : int = 6',
      '# (function x -> x + 1) 5 ;;',
      '- : int = 6',
      '# let times = function x -> function y -> x * y ;;',
      'val times : int -> int -> int = <fun>',
      '# let double = times 2 ;;',
      'val double : int -> int = <fun>',
      '# double 15 ;;',
      '- : int = 30',
      '# let double_fun f x = double (f x) ;;',
      'val double_fun : (\'a -> int) -> \'a -> int = <fun>',
      '# double_fun succ 2 ;;',
      '- : int = 6',
      '# double_fun (function x -> x + 1) ;;',
      '- : int -> int = <fun>',
      '# let double_succ = double_fun succ ;;',
      'val double_succ : int -> int = <fun>',
      '# double_succ 2 ;;',
      '- : int = 6'],
    'td-os-1-2': [
      '# let rec sigma n =',
      '    if n <= 0 then',
      '      0',
      '    else',
      '      n + sigma (n-1) ;;',
      'val sigma : int -> int = <fun>',
      '# sigma 10 ;;',
      '- : int = 55',
      '# sigma 0 ;;',
      '- : int = 0',
      '# let rec sigma_squares n =',
      '    if n <= 0 then',
      '      0',
      '    else',
      '      n * n + sigma_squares (n-1) ;;',
      'val sigma_squares : int -> int = <fun>',
      '# sigma_squares 3 ;;',
      '- : int = 14',
      '# let rec sum_f f n =',
      '    if n < 0 then',
      '      0',
      '    else',
      '      f n + sum_f f (n-1) ;;',
      'val sum_f : (int -> int) -> int -> int = <fun>',
      '# sum_f (function i -> i) 10 ;;',
      '- : int = 55',
      '# sum_f (function i -> i * i) 3 ;;',
      '- : int = 14',
      '# sum_f (function i -> 2 * i + 1) 4 ;;',
      '- : int = 25',
      '# let sigma2 = sum_f (function i -> i * i) ;;',
      'val sigma2 : int -> int = <fun>',
      '# sigma2 3 ;;',
      '- : int = 14'],
    'td-os-1-3': [
      '# let rec loop p f x =',
      '    if p x then',
      '      x',
      '    else',
      '      loop p f (f x) ;;',
      'val loop : (\'a -> bool) -> (\'a -> \'a) -> \'a -> \'a = <fun>',
      '# loop (function x -> x > 100) (function x -> 2 * x) 3 ;;',
      '- : int = 192',
      '# loop (function x -> x mod 7 = 0) (function x -> x + 1) 7 ;;',
      '- : int = 7',
      '# loop (function (a, b) -> b > 50) (function (a, b) -> (b, a + b)) (1, 1) ;;',
      '- : int * int = (34, 55)',
      '# let find_power x n =',
      '    if x < 2 then',
      '      invalid_arg "find_power: x < 2"',
      '    else',
      '      loop (function p -> p >= n) (function p -> p * x) 1 ;;',
      'val find_power : int -> int -> int = <fun>',
      '# find_power 2 100 ;;',
      '- : int = 128',
      '# find_power 3 27 ;;',
      '- : int = 27',
      '# find_power 10 1 ;;',
      '- : int = 1',
      '# find_power 1 5 ;;',
      'Exception: Invalid_argument "find_power: x < 2".'],
    'td-os-2-1': [
      '# let rec map f = function',
      '      [] -> []',
      '    | e :: l -> f e :: map f l ;;',
      'val map : (\'a -> \'b) -> \'a list -> \'b list = <fun>',
      '# map (function x -> x * x) [1; 2; 3] ;;',
      '- : int list = [1; 4; 9]',
      '# map string_of_int [4; 5] ;;',
      '- : string list = ["4"; "5"]',
      '# map (function x -> x > 0) [3; -1; 0] ;;',
      '- : bool list = [true; false; false]',
      '# map (function (a, b) -> a + b) [(1, 2); (10, 20)] ;;',
      '- : int list = [3; 30]',
      '# map (function x -> x + 1) [] ;;',
      '- : int list = []'],
    'td-os-2-2': [
      '# let rec for_all p = function',
      '      [] -> true',
      '    | e :: l -> p e && for_all p l ;;',
      'val for_all : (\'a -> bool) -> \'a list -> bool = <fun>',
      '# for_all (function x -> x mod 2 = 0) [2; 4; 6] ;;',
      '- : bool = true',
      '# for_all (function x -> x mod 2 = 0) [2; 3; 6] ;;',
      '- : bool = false',
      '# for_all (function s -> s <> "") ["a"; "bc"] ;;',
      '- : bool = true',
      '# for_all (function x -> x > 0) [] ;;',
      '- : bool = true'],
    'td-os-2-3': [
      '# let rec exists p = function',
      '      [] -> false',
      '    | e :: l -> p e || exists p l ;;',
      'val exists : (\'a -> bool) -> \'a list -> bool = <fun>',
      '# exists (function x -> x < 0) [3; -1; 2] ;;',
      '- : bool = true',
      '# exists (function x -> x < 0) [3; 1; 2] ;;',
      '- : bool = false',
      '# exists (function c -> c = \'z\') [\'a\'; \'z\'] ;;',
      '- : bool = true',
      '# exists (function x -> x < 0) [] ;;',
      '- : bool = false'],
    'td-os-2-4': [
      '# let rec is_sorted order = function',
      '      [] | [_] -> true',
      '    | e1 :: e2 :: l -> order e1 e2 && is_sorted order (e2 :: l) ;;',
      'val is_sorted : (\'a -> \'a -> bool) -> \'a list -> bool = <fun>',
      '# is_sorted (function x -> function y -> x < y) [1; 2; 3; 4; 5] ;;',
      '- : bool = true',
      '# is_sorted (function x -> function y -> x > y) [5; 4; 3; 2; 1] ;;',
      '- : bool = true',
      '# is_sorted (function x -> function y -> x < y) [1; 3; 2; 4; 5] ;;',
      '- : bool = false',
      '# is_sorted (function x -> function y -> x = y) [7; 7; 7; 7] ;;',
      '- : bool = true',
      '# is_sorted (function x -> function y -> x <= y) ["ant"; "bee"; "bee"] ;;',
      '- : bool = true',
      '# is_sorted (function x -> function y -> x < y) [] ;;',
      '- : bool = true'],
    'td-os-2-5': [
      '# let rec find p = function',
      '      [] -> failwith "find: not found"',
      '    | e :: l ->',
      '        if p e then',
      '          e',
      '        else',
      '          find p l ;;',
      'val find : (\'a -> bool) -> \'a list -> \'a = <fun>',
      '# find (function x -> x > 10) [3; 12; 40] ;;',
      '- : int = 12',
      '# find (function (k, v) -> v > 10) [(1, 5); (2, 12); (3, 40)] ;;',
      '- : int * int = (2, 12)',
      '# find (function x -> x > 10) [3] ;;',
      'Exception: Failure "find: not found".',
      '# find (function x -> x > 10) [] ;;',
      'Exception: Failure "find: not found".'],
    'td-os-2-6': [
      '# let rec filter p = function',
      '      [] -> []',
      '    | e :: l ->',
      '        if p e then',
      '          e :: filter p l',
      '        else',
      '          filter p l ;;',
      'val filter : (\'a -> bool) -> \'a list -> \'a list = <fun>',
      '# filter (function x -> x mod 2 = 0) [1; 2; 3; 4; 5; 6] ;;',
      '- : int list = [2; 4; 6]',
      '# filter (function x -> x > 10) [1; 2] ;;',
      '- : int list = []',
      '# filter (function s -> s <> "apple") ["banana"; "apple"; "cherry"; "apple"] ;;',
      '- : string list = ["banana"; "cherry"]',
      '# let remove_x x lst = filter (function e -> e <> x) lst ;;',
      'val remove_x : \'a -> \'a list -> \'a list = <fun>',
      '# remove_x 5 [5; 5; 2; 3; 5; 1] ;;',
      '- : int list = [2; 3; 1]'],
    'td-os-2-7': [
      '# let rec partition p = function',
      '      [] -> ([], [])',
      '    | e :: l ->',
      '        let (yes, no) = partition p l in',
      '          if p e then',
      '            (e :: yes, no)',
      '          else',
      '            (yes, e :: no) ;;',
      'val partition : (\'a -> bool) -> \'a list -> \'a list * \'a list = <fun>',
      '# partition (function x -> x mod 2 = 0) [1; 2; 3; 4; 5; 6] ;;',
      '- : int list * int list = ([2; 4; 6], [1; 3; 5])',
      '# partition (function x -> x > 0) [] ;;',
      '- : int list * int list = ([], [])',
      '# partition (function c -> c < \'n\') [\'z\'; \'a\'; \'q\'; \'b\'] ;;',
      '- : char list * char list = ([\'a\'; \'b\'], [\'z\'; \'q\'])',
      '# let partition_acc p lst =',
      '    let rec part yes no = function',
      '        [] -> (yes, no)',
      '      | e :: l ->',
      '          if p e then',
      '            part (e :: yes) no l',
      '          else',
      '            part yes (e :: no) l',
      '    in',
      '      part [] [] lst ;;',
      'val partition_acc : (\'a -> bool) -> \'a list -> \'a list * \'a list = <fun>',
      '# partition_acc (function x -> x mod 2 = 0) [1; 2; 3; 4; 5; 6] ;;',
      '- : int list * int list = ([6; 4; 2], [5; 3; 1])'],
    'td-os-2-8': [
      '# let rec for_all2 p l1 l2 =',
      '    match (l1, l2) with',
      '        ([], []) -> true',
      '      | (e1 :: r1, e2 :: r2) -> p e1 e2 && for_all2 p r1 r2',
      '      | _ -> invalid_arg "for_all2: different lengths" ;;',
      'val for_all2 : (\'a -> \'b -> bool) -> \'a list -> \'b list -> bool = <fun>',
      '# let almost l1 l2 =',
      '    for_all2 (function x -> function y -> x - y <= 1 && y - x <= 1) l1 l2 ;;',
      'val almost : int list -> int list -> bool = <fun>',
      '# almost [1; 2; 3; 4; 5] [1; 3; 2; 4; 6] ;;',
      '- : bool = true',
      '# almost [1; 2; 3; 4; 5] [1; 4; 3; 4; 5] ;;',
      '- : bool = false',
      '# almost [1; 2] [1; 2; 3] ;;',
      'Exception: Invalid_argument "for_all2: different lengths".',
      '# almost [1; 9] [1; 2; 3] ;;',
      '- : bool = false',
      '# almost [] [] ;;',
      '- : bool = true',
      '# for_all2 (function x -> function y -> y = string_of_int x) [1; 2] ["1"; "2"] ;;',
      '- : bool = true'],
    'td-os-2-8b': [
      '# let rec for_all2 p l1 l2 =',
      '    match (l1, l2) with',
      '        ([], []) -> true',
      '      | ([], _) | (_, []) -> invalid_arg "for_all2: different lengths"',
      '      | (e1 :: r1, e2 :: r2) -> for_all2 p r1 r2 && p e1 e2 ;;',
      'val for_all2 : (\'a -> \'b -> bool) -> \'a list -> \'b list -> bool = <fun>',
      '# for_all2 (function x -> function y -> x = y) [1; 9] [1; 2; 3] ;;',
      'Exception: Invalid_argument "for_all2: different lengths".'],
    'td-os-3-1': [
      '# let rec process_list f init =',
      '    function',
      '       []       -> init',
      '     | e :: lst -> f e (process_list f init lst) ;;',
      'val process_list : (\'a -> \'b -> \'b) -> \'b -> \'a list -> \'b = <fun>',
      '# let length lst = process_list (function e -> function call -> 1 + call) 0 lst ;;',
      'val length : \'a list -> int = <fun>',
      '# length [5; 6; 7] ;;',
      '- : int = 3',
      '# let sum lst = process_list (function e -> function call -> e + call) 0 lst ;;',
      'val sum : int list -> int = <fun>',
      '# sum [1; 2; 3; 4] ;;',
      '- : int = 10',
      '# let concatenate lst = process_list (function s -> function call -> s ^ call) "" lst ;;',
      'val concatenate : string list -> string = <fun>',
      '# concatenate ["Caml"; " and "; "recursion"] ;;',
      '- : string = "Caml and recursion"',
      '# concatenate [] ;;',
      '- : string = ""',
      '# let append l1 l2 = process_list (function e -> function call -> e :: call) l2 l1 ;;',
      'val append : \'a list -> \'a list -> \'a list = <fun>',
      '# append [1; 2] [3; 4] ;;',
      '- : int list = [1; 2; 3; 4]',
      '# let map f lst = process_list (function e -> function call -> f e :: call) [] lst ;;',
      'val map : (\'a -> \'b) -> \'a list -> \'b list = <fun>',
      '# map (function x -> x + 1) [1; 2; 3] ;;',
      '- : int list = [2; 3; 4]',
      '# let for_all p lst = process_list (function e -> function call -> p e && call) true lst ;;',
      'val for_all : (\'a -> bool) -> \'a list -> bool = <fun>',
      '# for_all (function x -> x > 0) [1; 2; 3] ;;',
      '- : bool = true',
      '# for_all (function x -> x > 0) [1; -2; 3] ;;',
      '- : bool = false',
      '# let sum_list lst =',
      '    process_list (function f -> function call -> function x -> f x +. call x) (function x -> 0.) lst ;;',
      'val sum_list : (\'a -> float) list -> \'a -> float = <fun>',
      '# let g = sum_list [sqrt; (function x -> x *. x); (function x -> 1.)] ;;',
      'val g : float -> float = <fun>',
      '# g 4. ;;',
      '- : float = 19.',
      '# sum_list [(function x -> 2. *. x); (function x -> x -. 1.)] 10. ;;',
      '- : float = 29.',
      '# sum_list [] 3. ;;',
      '- : float = 0.'],
    'td-os-3-1b': [
      '# let rec process_list f init =',
      '    function',
      '       []       -> init',
      '     | e :: lst -> f e (process_list f init lst) ;;',
      'val process_list : (\'a -> \'b -> \'b) -> \'b -> \'a list -> \'b = <fun>',
      '# let calls = ref 0 ;;',
      'val calls : int ref = {contents = 0}',
      '# let p x = incr calls; x > 0 ;;',
      'val p : int -> bool = <fun>',
      '# let for_all1 p lst = process_list (function e -> function call -> p e && call) true lst ;;',
      'val for_all1 : (\'a -> bool) -> \'a list -> bool = <fun>',
      '# for_all1 p [-1; 2; 3; 4; 5] ;;',
      '- : bool = false',
      '# !calls ;;',
      '- : int = 5',
      '# let rec for_all2 p = function',
      '      [] -> true',
      '    | e :: l -> p e && for_all2 p l ;;',
      'val for_all2 : (\'a -> bool) -> \'a list -> bool = <fun>',
      '# calls := 0 ;;',
      '- : unit = ()',
      '# for_all2 p [-1; 2; 3; 4; 5] ;;',
      '- : bool = false',
      '# !calls ;;',
      '- : int = 1'],
    'td-os-3-2': [
      '# let rec fold_left f a = function',
      '      [] -> a',
      '    | b :: l -> fold_left f (f a b) l ;;',
      'val fold_left : (\'a -> \'b -> \'a) -> \'a -> \'b list -> \'a = <fun>',
      '# fold_left (function acc -> function x -> acc + x) 0 [1; 2; 3; 4] ;;',
      '- : int = 10',
      '# fold_left (function acc -> function x -> x :: acc) [] [1; 2; 3] ;;',
      '- : int list = [3; 2; 1]',
      '# fold_left (function a -> function b -> a - b) 10 [1; 2; 3] ;;',
      '- : int = 4',
      '# let rec process_list f init =',
      '    function',
      '       []       -> init',
      '     | e :: lst -> f e (process_list f init lst) ;;',
      'val process_list : (\'a -> \'b -> \'b) -> \'b -> \'a list -> \'b = <fun>',
      '# process_list (function a -> function b -> a - b) 10 [1; 2; 3] ;;',
      '- : int = -8'],
    'tp-2': [
      '# let mystery n =',
      '    if n < 100 || n > 999 then',
      '      invalid_arg "mystery: not a 3-digits integer"',
      '    else',
      '      let is_square x =',
      '        let r = int_of_float (sqrt (float_of_int x)) in',
      '          r * r = x',
      '      in',
      '      let a = n / 100 and b = (n / 10) mod 10 and c = n mod 10 in',
      '      let smallest =',
      '        if a < b then',
      '          if a < c then a else c',
      '        else',
      '          if b < c then b else c',
      '      in',
      '        is_square n && is_square (a * a + b * b + c * c - smallest * smallest) ;;',
      'val mystery : int -> bool = <fun>',
      '# mystery 123 ;;',
      '- : bool = false',
      '# mystery 12345 ;;',
      'Exception: Invalid_argument "mystery: not a 3-digits integer".',
      '# mystery 324 ;;',
      '- : bool = true',
      '# mystery 99 ;;',
      'Exception: Invalid_argument "mystery: not a 3-digits integer".',
      '# let rec all n =',
      '    if n > 999 then',
      '      []',
      '    else',
      '      if mystery n then',
      '        n :: all (n + 1)',
      '      else',
      '        all (n + 1) ;;',
      'val all : int -> int list = <fun>',
      '# all 100 ;;',
      '- : int list = [100; 324; 400; 900]'],
    'tp-5': [
      '# let day_after d m y =',
      '    let leap = (y mod 4 = 0 && y mod 100 <> 0) || y mod 400 = 0 in',
      '    let days =',
      '      match m with',
      '          2 -> if leap then 29 else 28',
      '        | 4 | 6 | 9 | 11 -> 30',
      '        | 1 | 3 | 5 | 7 | 8 | 10 | 12 -> 31',
      '        | _ -> failwith "the day after:not a month number"',
      '    in',
      '      if d < 1 || d > days then',
      '        failwith ("the day after:this day does not exist for month " ^ string_of_int m)',
      '      else',
      '        if d < days then',
      '          (d + 1, m, y)',
      '        else',
      '          if m = 12 then',
      '            (1, 1, y + 1)',
      '          else',
      '            (1, m + 1, y) ;;',
      'val day_after : int -> int -> int -> int * int * int = <fun>',
      '# day_after 12 9 2024 ;;',
      '- : int * int * int = (13, 9, 2024)',
      '# day_after 28 2 2024 ;;',
      '- : int * int * int = (29, 2, 2024)',
      '# day_after 28 2 2025 ;;',
      '- : int * int * int = (1, 3, 2025)',
      '# day_after 31 12 2024 ;;',
      '- : int * int * int = (1, 1, 2025)',
      '# day_after 12 15 2005 ;;',
      'Exception: Failure "the day after:not a month number".',
      '# day_after 31 6 2029 ;;',
      'Exception: Failure "the day after:this day does not exist for month 6".',
      '# day_after 29 2 2100 ;;',
      'Exception: Failure "the day after:this day does not exist for month 2".',
      '# day_after 29 2 2000 ;;',
      '- : int * int * int = (1, 3, 2000)',
      '# day_after 0 3 2026 ;;',
      'Exception: Failure "the day after:this day does not exist for month 3".']
  };

  /* ---------- blocs de code ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function phrases(key) {
    var ph = [], cur = null;
    if (!CODE[key]) throw new Error('CAML_TD: transcription inconnue ' + key);
    CODE[key].forEach(function (l) { if (/^# /.test(l)) { cur = []; ph.push(cur); } if (cur) cur.push(l); });
    return ph;
  }
  function pick(key, sel) {
    var ph = phrases(key), idx = [];
    if (sel == null) ph.forEach(function (_, i) { idx.push(i); });
    else String(sel).split(',').forEach(function (part) {
      var m = /^(\d+)-(\d+)$/.exec(part);
      if (m) for (var i = +m[1]; i <= +m[2]; i++) idx.push(i); else idx.push(+part);
    });
    return idx.map(function (i) { if (!ph[i]) throw new Error('CAML_TD: ' + key + ' phrase ' + i); return ph[i].join('\n'); }).join('\n');
  }
  function R(key, sel, o) {
    o = o || {};
    return '<pre data-ml-repl' + (o.mode ? ' data-mode="' + o.mode + '"' : '') + (o.title ? ' data-title="' + esc(o.title) + '"' : '') + '>' + esc(pick(key, sel)) + '</pre>';
  }
  /* le code seul des phrases choisies (sans « # » ni réponse), une ligne vide entre deux phrases */
  function S(key, sel) {
    var out = [], on = false;
    pick(key, sel).split('\n').forEach(function (l) {
      if (/^# /.test(l)) { if (out.length) out.push(''); out.push(l.slice(2)); on = !/;;\s*$/.test(l); }
      else if (on) { out.push(l.replace(/^ {2}/, '')); on = !/;;\s*$/.test(l); }
    });
    return '<pre data-ml>' + esc(out.join('\n')) + '</pre>';
  }
  function lines(a) { return Array.isArray(a) ? a.join('\n') : String(a); }
  function ml(a) { return '<pre data-ml>' + esc(lines(a)) + '</pre>'; }
  function ex(a) { return '<pre data-ml-repl>' + esc(lines(a)) + '</pre>'; }
  /* `code` → <code class="ml">, hors des blocs <pre> */
  function md(s) {
    return String(s).split(/(<pre[\s\S]*?<\/pre>)/).map(function (part, i) {
      return i % 2 ? part : part.replace(/`([^`]+)`/g, function (_, c) { return '<code class="ml">' + esc(c) + '</code>'; });
    }).join('');
  }
  function fmt(o) {
    if (typeof o === 'string') return md(o);
    if (Array.isArray(o)) return o.map(fmt);
    if (o && typeof o === 'object') { var r = {}; Object.keys(o).forEach(function (k) { r[k] = /^(id|exam|kind|also|near|topics)$/.test(k) ? o[k] : fmt(o[k]); }); return r; }
    return o;
  }
  function add(e) { X.push(fmt(e)); }
  /* phrase d'introduction des réponses (traduite par le fichier anglais) */
  var LEAD = { code: 'Le code, suivi de la réponse de Caml :', all: 'Les réponses de Caml, phrase par phrase :' };
  function A(h) { return '<p>' + LEAD.code + '</p>' + h; }
  function AE(h) { return '<p>' + LEAD.all + '</p>' + h; }
  window.CAML_TD = { R: R, S: S, ml: ml, ex: ex, fmt: fmt, md: md, code: CODE, lead: LEAD };
  var NOTE = 'Pas de corrigé officiel (le Moodle n’en donne pas pour les TD) : correction rédigée, code exécuté avec OCaml 4.14.';
  var NOTE_SEM = 'Pas de corrigé officiel du séminaire : correction rédigée, code exécuté avec OCaml 4.14.';

  /* =====================================================================
     Séminaire (01, « Séminaire Caml – Exercices », septembre 2026) : « Sauf indication contraire,
     l'environnement est supposé vide au début de chaque exercice. »
     ===================================================================== */
  add({
    id: 'sem-1-1', exam: null, kind: 'td', order: 1021, src: 'Séminaire · Ex 1.1',
    title: 'Évaluations : définitions globales et locales', topics: ['bases', 'evaluation'], lvl: 1, time: 10,
    intro: '<p>Quels seront les résultats des évaluations successives par Caml de chacune des phrases suivantes ?</p>' +
      R('sem-1-1', null, { mode: 'guess', title: 'Séminaire, exercice 1.1' }) +
      '<p><em>Tape ta réponse sous chaque phrase (type et valeur, ou « Error »), puis compare avec celle de Caml.</em></p>',
    hints: [
      '`let x = e` (sans `in`) est une définition globale : Caml répond `val x : type = valeur`, et `x` existe pour la suite. `let x = e1 in e2` est une expression : Caml répond `- : type = valeur`, et `x` disparaît après.',
      'Un `let` sans `in` à l’intérieur d’une expression est une erreur de syntaxe.',
      'Avec `and`, les définitions sont simultanées : `let a = 5 and b = 2 * a` utilise l’<strong>ancien</strong> `a`.'],
    solution: [
      { t: 'Phrases 1 à 4', html: '<ul><li>`let a = 6 + 3 * 2` : `*` passe avant `+`, `a` vaut 12 (définition globale).</li>' +
        '<li>`let b = 7 in 11 + b` : une expression, 18. `b` n’existe plus après la phrase.</li>' +
        '<li>`let a = 3 in let c = 2 + a` : le second `let` n’a pas de `in`, ce n’est ni une expression ni une définition globale : erreur de syntaxe. Correction : `let a = 3 in let c = 2 + a in c` (5).</li>' +
        '<li>`let c = let a = 3 in 2 + a` : une définition globale dont la valeur est une expression : `c` vaut 5.</li></ul>' },
      { t: 'Phrases 5 à 8', html: '<ul><li>`let c = a * b` : `a` vaut 12, mais `b` était local à la phrase 2 : `Error: Unbound value b`.</li>' +
        '<li>`let a = 2 in b = 5 in a * b` : il manque un `let` ou un `and` : erreur de syntaxe. Corrections ci-dessous (10).</li>' +
        '<li>`let a = 5 in let b = 2 * a in a * b` : `b` vaut 10, résultat 50.</li>' +
        '<li>`let a = 5 and b = 2 * a in a * b` : `and` est simultané, le `a` de `2 * a` est le `a` global (12) : `b` vaut 24, résultat 5 × 24 = 120.</li></ul>' + R('sem-1-1b') },
      { t: 'Phrases 9 à 12', html: '<ul><li>(2 × 1) + (3 × 4) = 14 : chaque `x` est local à sa parenthèse.</li>' +
        '<li>`let y = x and z = y` : `y` vaut 2, et `z` prend l’ancien `y`, 5 : 7.</li>' +
        '<li>Les `let … in` sont emboîtés : `y` vaut 2, puis `z` vaut le nouveau `y`, 2 : 4. Caml prévient que le premier `y` (5) ne sert jamais (`Warning 26`).</li>' +
        '<li>Dernière phrase : `a` vaut 2 et `b` vaut 4 à l’intérieur, puis `a + b` = 6 et `a - b` = −2 (simultanés), et 6 × 6 − (−2) × (−2) = 32 : `val a : int = 32`.</li></ul>' }],
    answer: AE(R('sem-1-1')),
    traps: [
      'Répondre `val …` pour une expression `let … in` : seule une définition globale donne `val`.',
      'Croire qu’une définition locale existe encore à la phrase suivante.',
      'Lire `and` comme une suite de `let … in` : les définitions reliées par `and` ne se voient pas entre elles.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-1-2', exam: null, kind: 'td', order: 1022, src: 'Séminaire · Ex 1.2',
    title: 'Types et valeurs', topics: ['bases', 'evaluation'], lvl: 1, time: 12,
    intro: '<p>Quels sont les types et les valeurs associés aux expressions suivantes ?</p>' + R('sem-1-2', null, { mode: 'guess', title: 'Séminaire, exercice 1.2' }),
    hints: [
      'Entiers et flottants ne se mélangent pas : `+ - * /` pour les `int`, `+. -. *. /.` pour les `float`. Une comparaison exige deux valeurs du même type.',
      '`/` est la division entière ; `*`, `/` et `mod` ont la même priorité et se lisent de gauche à droite.',
      '`&&` et `||` n’évaluent leur partie droite que si c’est nécessaire.'],
    solution: [
      { t: 'Nombres', html: '<ul><li>`1. +. 2.` : `3.` (Caml écrit les flottants avec un point final). `1 + 1.5` et `1 +. 1.5` : erreurs de type, on ne mélange pas `int` et `float`.</li>' +
        '<li>`1 / 2` vaut 0 (division entière) ; `5 / 2 = 4 / 2` compare 2 et 2 : `true`.</li>' +
        '<li>`10-2 * 2` = 10 − 4 = 6. `10 * 24 mod 10` = 240 mod 10 = 0 ; `24 mod 10 * 10` = 4 × 10 = 40 : même priorité, de gauche à droite.</li></ul>' },
      { t: 'Caractères et chaînes', html: '<ul><li>`\'a\'` est un `char`, `"A string"` une `string`. `\'\'` n’existe pas : un caractère n’est jamais vide.</li>' +
        '<li>`^` concatène deux chaînes : `"Hello Word" ^ \'!\'` est refusé, il faut `"!"`.</li></ul>' },
      { t: 'Comparaisons', html: '<ul><li>`1. < 3` : deux types différents, erreur. `1 < 2 < 3` se lit `(1 < 2) < 3` : on compare un `bool` à un `int`, erreur.</li>' +
        '<li>Les chaînes se comparent caractère par caractère : `"how do string "` contre `"how do strings"`, l’espace (code 32) est avant `s` : `false`. `\'Z\' < \'a\'` : les majuscules sont avant les minuscules, `true`.</li>' +
        '<li>Deux fonctions ne se comparent pas : l’exception `Invalid_argument "compare: functional value"`.</li></ul>' },
      { t: 'Évaluation paresseuse de `&&` et `||`', html: '<ul><li>`false || (1/0 = 0)` : il faut évaluer la droite, `Division_by_zero`. `true || …` vaut `true` sans évaluer la droite.</li>' +
        '<li>`true && (1/0 = 0)` : exception ; `false && (1/0 = 0)` : `false`.</li>' +
        '<li>`false && (1.5 > 1)` : l’erreur de type est détectée avant toute évaluation, la paresse ne la cache pas.</li></ul>' }],
    answer: AE(R('sem-1-2')),
    traps: [
      'Écrire `3.0` dans une réponse de Caml : Caml écrit `3.`.',
      'Penser que la paresse de `&&` cache une erreur de type : le typage se fait avant l’évaluation.',
      'Enchaîner les comparaisons comme en maths (`1 < 2 < 3`) : il faut `1 < 2 && 2 < 3`.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-2-1', exam: null, kind: 'td', order: 1041, src: 'Séminaire · Ex 2.1',
    title: 'Types et applications de fonctions', topics: ['fonctions', 'evaluation'], lvl: 1, time: 12,
    intro: '<p>Les fonctions suivantes sont dans l’environnement :</p><ul><li>`sqrt : float -> float` (racine carrée)</li><li>`float_of_int : int -> float`</li><li>`int_of_float : float -> int`</li></ul>' +
      '<p>Évaluer les phrases suivantes, corriger les éventuelles erreurs :</p>' + R('sem-2-1', null, { mode: 'guess', title: 'Séminaire, exercice 2.1' }),
    hints: [
      'L’application d’une fonction passe avant tout autre opérateur : `f 2 + 3` se lit `(f 2) + 3`.',
      '`f -4` se lit comme une soustraction `f - 4`. Un argument négatif s’écrit entre parenthèses.',
      '`f f f 2` applique `f` à trois arguments : `f`, `f` et `2`. Pour composer, il faut des parenthèses.'],
    solution: [
      { t: 'La priorité de l’application', html: '<ul><li>`f -4` : Caml lit `f - 4`, il soustrait un entier à une fonction : erreur. Correction : `f (-4)` vaut 16.</li>' +
        '<li>`f 2 + 3` = `(f 2) + 3` = 7 ; `f (2 + 3)` = 25 ; `f 2 * f 2 * f 2` = 4 × 4 × 4 = 64.</li>' +
        '<li>`f f f 2` : `f` reçoit trois arguments, « too many arguments ». Correction : `f (f (f 2))` = 256.</li></ul>' },
      { t: 'Définition locale qui masque', html: '<p>Dans `g`, le `f` local (`x / 10`) masque le `f` global. `f x*10` se lit `(f x) * 10` : pour 58, 5 × 10 + 8 = 58. Sur un entier naturel, `g` rend son argument.</p>' },
      { t: 'Composer des fonctions', html: '<p>`int_of_float sqrt float_of_int x` applique `int_of_float` à trois arguments. Il faut composer : `int_of_float (sqrt (float_of_int x))`. Comme `f2` n’a pas été défini, `f2 10` donne `Unbound value f2`.</p>' },
      { t: 'Paresse et types', html: '<ul><li>`g1` est bien typée, mais `true && (x/0 = 0)` évalue toujours la division : `g1 0` déclenche `Division_by_zero` (et `g1` aussi pour tout `x`).</li>' +
        '<li>`g2` : `1.5 > x+1` compare un `float` et un `int` : erreur de type, même derrière `false &&`. Correction : `float_of_int (x+1)` ; `g2` vaut toujours `false`.</li>' +
        '<li>`g3` : `a` ne sert à rien (`Warning 26`) ; `g3 x` = `x * x`.</li></ul>' },
      { t: 'Les corrections', html: '<p>Les phrases corrigées et leurs réponses :</p>' + R('sem-2-1b') }],
    answer: AE(R('sem-2-1')),
    traps: [
      'Écrire `f -4` pour un argument négatif : il faut `f (-4)`. Les sujets écrivent toujours `(-1)` dans les exemples.',
      'Écrire `f f 2` pour `f (f 2)` : l’application se lit de gauche à droite, `(f f) 2`.',
      'Croire que `false &&` évite une erreur de type : le typage passe avant.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-2-2', exam: null, kind: 'td', order: 1042, src: 'Séminaire · Ex 2.2',
    title: 'Take a Chance : mirror, abba, stammer', topics: ['fonctions'], lvl: 1, time: 10,
    intro: '<p>Écrire les fonctions Caml suivantes :</p><ul><li><b>mirror</b> : prend en paramètre un entier positif n à deux chiffres non nuls et retourne son "miroir".</li>' +
      '<li><b>abba</b> : Utiliser `mirror` pour écrire une fonction qui pour tout nombre à deux chiffres non nuls ab calcule abba.</li>' +
      '<li><b>stammer</b> : Utiliser les deux fonctions précédentes pour écrire la fonction qui à partir de tout nombre de la forme ab, retourne l’entier abbabaab.</li></ul>' +
      '<p>(On ne s’occupera pas pour l’instant des résultats lorsque le paramètre n’est pas un entier positif à 2 chiffres non nuls.)</p><p>Exemples d’applications :</p>' +
      ex(['# mirror 15 ;;', '- : int = 51', '# abba 42 ;;', '- : int = 4224', '# stammer 18 ;;', '- : int = 81181881']),
    hints: [
      'Les chiffres de n : les dizaines `n / 10`, les unités `n mod 10`.',
      'abba : ab suivi de ba, c’est ab × 100 + ba.',
      'Un nombre de 8 chiffres formé de deux blocs de 4 : bloc1 × 10000 + bloc2. Lis bien l’exemple pour savoir quels blocs.'],
    solution: [
      { t: 'mirror et abba', html: '<p>`mirror n` échange les deux chiffres : unités × 10 + dizaines. `abba n` = `n * 100 + mirror n`.</p>' + R('sem-2-2', '0-3') },
      { t: 'stammer : le texte et l’exemple ne disent pas la même chose', html: '<p>Pour 18, « abbabaab » donne 1881 suivi de 8118, soit 18818118. L’exemple du séminaire donne 81181881 : 8118 suivi de 1881, c’est-à-dire baababba. La version qui respecte l’exemple :</p>' + R('sem-2-2', '4-5') +
        '<p>Celle qui suit le texte :</p>' + R('sem-2-2', '6-7') +
        '<p class="sol-note">Coquille du séminaire : le texte (abbabaab) et l’exemple (81181881) ne correspondent pas. À l’examen, les exemples sont la référence : « Vos fonctions doivent impérativement respecter les exemples d’applications donnés » (sujet 2024).</p>' }],
    answer: A(R('sem-2-2', '0,2,4')),
    traps: [
      'Écrire le miroir avec des chaînes de caractères : deux opérations entières suffisent.',
      'Recalculer abba à la main dans stammer : l’énoncé demande de réutiliser les fonctions précédentes.',
      'Oublier les parenthèses : `abba mirror n` applique `abba` à deux arguments. Il faut `abba (mirror n)`.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-2-3', exam: null, kind: 'td', order: 1043, src: 'Séminaire · Ex 2.3',
    title: 'Puissance : x³¹ avec le moins de multiplications', topics: ['fonctions', 'bases'], lvl: 2, time: 8,
    intro: '<p>Écrire la fonction `power31 : int -> int` qui à partir de x calcule x³¹ : la seule opération autorisée est la multiplication, et moins il y en a mieux c’est !</p>',
    hints: [
      'Multiplier x par lui-même 30 fois coûte 30 multiplications. Un carré double l’exposant en une seule multiplication.',
      'Garde les puissances intermédiaires dans des définitions locales `let … in`, pour ne jamais les recalculer.',
      'Cherche une suite d’exposants où chacun est la somme de deux exposants déjà obtenus, de 1 jusqu’à 31.'],
    solution: [
      { t: 'Principe', html: '<p>Chaque définition locale coûte une multiplication et réutilise des puissances déjà calculées : x² = x·x, x³ = x²·x, x⁵ = x³·x², x¹⁰ = x⁵·x⁵, x²⁰ = x¹⁰·x¹⁰, x³⁰ = x²⁰·x¹⁰, x³¹ = x³⁰·x. Soit <strong>7 multiplications</strong>, le minimum pour 31.</p>' +
        '<p>Par carrés successifs (x², x⁴, x⁸, x¹⁶ puis x¹⁶·x⁸·x⁴·x²·x), il en faut 8.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Sept définitions locales, une multiplication chacune :</p>' + R('sem-2-3') }],
    answer: A(R('sem-2-3', '0')),
    traps: [
      'Écrire `x * x * x * …` : 30 multiplications.',
      'Écrire `(x * x) * (x * x)` : la même multiplication est faite deux fois. Nomme-la avec `let … in`.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-2-6', exam: null, kind: 'td', order: 1046, src: 'Séminaire · Ex 2.6',
    title: 'Heures, minutes, secondes', topics: ['fonctions'], lvl: 1, time: 10,
    intro: '<p>On suppose ici les paramètres "valides" (minutes et secondes dans [0, 60[, heures ∈ ℕ).</p>',
    questions: [
      '<b>1.</b> Écrire la fonction `sec_of_time` qui convertit une durée représentée par 3 entiers (heures, minutes, secondes) en secondes. Exemple : 23h 13m 59s = 83639s',
      '<b>2.</b> Écrire la fonction `time_of_sec` qui convertit des secondes en heures, minutes, secondes (qui seront représentées par le triplet (h, mn, s)).',
      '<b>3.</b> Utiliser les deux fonctions précédentes pour écrire la fonction `add_times` qui additionne deux durées (représentées chacune par 3 entiers). Exemple : 12h 22m 15s + 15h 13m 10s = 27h 35m 25s<p>Exemples d’applications :</p>' +
        ex(['# sec_of_time 23 13 59 ;;', '- : int = 83639', '# time_of_sec 83639 ;;', '- : int * int * int = (23, 13, 59)', '# add_times 12 22 15 15 13 10 ;;', '- : int * int * int = (27, 35, 25)'])],
    hints: [
      '« 3 entiers » : trois paramètres `h m s`, pas un triplet. Le résultat de `time_of_sec`, lui, est un triplet.',
      'Pour `time_of_sec` : division entière et reste par 3600, puis par 60.',
      '`add_times` : convertis les deux durées en secondes, additionne, reconvertis.'],
    solution: [
      { t: 'Questions 1 et 2', html: R('sem-2-6', '0-3') + '<p>83639 = 23 × 3600 + 839, et 839 = 13 × 60 + 59. Le type `int * int * int` est celui d’un triplet.</p>' },
      { t: 'Question 3 : additionner deux durées', html: R('sem-2-6', '4-6') + '<p>Le type de `add_times` est trop long pour une ligne : Caml l’affiche sur deux. Les retenues (59 min 59 s + 1 s) sont gérées par la conversion.</p>' }],
    answer: A(R('sem-2-6', '0,2,4')),
    traps: [
      'Écrire `sec_of_time (h, m, s)` : c’est une fonction à un seul paramètre, un triplet, alors que les exemples donnent trois paramètres.',
      'Additionner heures, minutes et secondes séparément : il faut gérer les retenues, la conversion le fait pour toi.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-3-3', exam: null, kind: 'td', order: 1063, src: 'Séminaire · Ex 3.3',
    title: 'Ordres : max, min, milieu', topics: ['fonctions'], lvl: 1, time: 12,
    intro: '<p>Définir les fonctions suivantes :</p>',
    questions: [
      '<b>1.</b> `max2` et `min2` qui retournent respectivement le maximum et le minimum de 2 entiers ;',
      '<b>2.</b> `max3` et `min3` qui retournent respectivement le maximum et le minimum de 3 entiers sans utiliser les fonctions définies précédentes ;',
      '<b>3.</b> `middle3` qui retourne l’élément du milieu parmi 3 entiers (vous pouvez utiliser les fonctions précédentes) ;',
      '<b>4.</b> `max4` et `min4` qui retournent respectivement le maximum et le minimum de 4 entiers (utiliser les fonctions précédentes !).'],
    hints: [
      '`max2` : une alternative `if … then … else`.',
      '`max3` sans `max2` : deux alternatives imbriquées.',
      '`middle3` : le plus petit des deux premiers ne peut pas être le maximum, le plus grand des deux ne peut pas être le minimum…'],
    solution: [
      { t: 'Questions 1, 2 et 4', html: S('sem-3-3', '0-3,5-6') +
        '<p>`max4 a b c d` est le plus grand des maximums de deux paires. Caml répond `\'a -> \'a -> \'a` : rien n’impose des entiers, `>` compare tous les types de base.</p>' },
      { t: 'Question 3 : le milieu', html: '<p>Le milieu est le plus grand entre `min2 a b` et le plus petit de (`max2 a b`, `c`). Si `c` est le plus grand, c’est `max2 a b` ; s’il est au milieu, c’est `c` ; s’il est le plus petit, c’est `min2 a b`.</p>' + S('sem-3-3', '4') },
      { t: 'La réponse de Caml', html: '<p>Les sept définitions, puis quelques essais :</p>' + R('sem-3-3') }],
    answer: A(R('sem-3-3', '0-6')),
    traps: [
      'Utiliser `max` et `min` prédéfinies : l’exercice demande de les écrire.',
      'Oublier un cas d’égalité : `middle3 7 7 1` doit valoir 7.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-3-4', exam: null, kind: 'td', order: 1064, src: 'Séminaire · Ex 3.4',
    title: 'Somme des carrés des deux plus grands', topics: ['fonctions'], lvl: 1, time: 6,
    intro: '<p>Écrire la fonction `highest_square_sum` qui à partir de trois entiers retourne la somme des carrés des deux plus grands. Utiliser les fonctions définies à l’exercice 3.3.</p><p>Exemples d’applications :</p>' +
      ex(['# highest_square_sum 3 2 1 ;;', '- : int = 13', '# highest_square_sum 1 (-5) 10 ;;', '- : int = 101', '# highest_square_sum (-1) (-2) (-3) ;;', '- : int = 5']),
    hints: [
      'Les deux plus grands parmi trois : le maximum et le milieu.',
      'Calcule-les une fois, avec `let … in`, avant de les élever au carré.'],
    solution: [
      { t: 'Le code et la réponse de Caml', html: '<p>`max3` et `middle3` (exercice 3.3) donnent les deux plus grands. Les trois exemples sont conformes : avec des négatifs, les deux plus grands sont −1 et −2, d’où 1 + 4 = 5.</p>' + R('sem-3-4', '4-7') }],
    answer: A(R('sem-3-4', '4')),
    traps: [
      'Prendre les deux plus grands en valeur absolue : (−5)² compterait à tort dans le deuxième exemple.',
      'Écrire `max3 a b c * max3 a b c` : le calcul est fait deux fois.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-3-5', exam: null, kind: 'td', order: 1065, src: 'Séminaire · Ex 3.5',
    title: 'Évaluations : le filtrage', topics: ['filtrage', 'evaluation', 'exceptions'], lvl: 2, time: 15,
    intro: '<p>Quels seront les résultats des évaluations des phrases suivantes ? Corriger les éventuelles erreurs et tenter d’éliminer les "warning".</p>' +
      R('sem-3-5', null, { mode: 'guess', title: 'Séminaire, exercice 3.5' }),
    hints: [
      'Caml vérifie qu’un filtrage couvre tous les cas : sinon `Warning 8` à la définition, et `Match_failure` si un cas oublié arrive.',
      'Caml ne sait pas si des gardes `when` couvrent tout : un filtrage dont tous les cas sont gardés est signalé non exhaustif.',
      'Un nom dans un motif est une nouvelle variable : il attrape tout, et ne compare rien.'],
    solution: [
      { t: 'f1, f2 et switchonoff', html: '<ul><li>`f1` est correcte : `y` attrape tout ce qui n’est pas 0.</li><li>`f2` : `_` n’est qu’un motif, pas une valeur : erreur de syntaxe à droite de `->`.</li>' +
        '<li>`switchonoff` : une chaîne autre que `"on"` et `"off"` n’est pas filtrée (`Warning 8`, Caml cite `""`). Ajouter `| _ -> …` avec une exception.</li></ul>' },
      { t: 'Le match sur a * b − 27972, square', html: '<ul><li>42 × 666 = 27972 : `"zero"`.</li><li>`square` : les deux cas sont gardés, Caml ne voit pas qu’ils couvrent tout (`Warning 8`, « All clauses in this pattern-matching are guarded »). Remplacer la dernière garde par `_`. `square (-5)` déclenche bien l’exception.</li></ul>' },
      { t: 'parity, grade et h', html: '<ul><li>`parity` : pour Caml, `n mod 10` peut valoir 10 ou −1, valeurs non filtrées (`Warning 8`) ; le résultat est `"even"`. Remplacer le dernier motif par `_`, et entourer le `match` de parenthèses dans un `if`.</li>' +
        '<li>`grade 12 14` : (12 + 14) / 2 = 13. Les cas sont essayés dans l’ordre : 13 &gt; 15 non, 13 &gt; 5 oui : `\'D\'`. Les cas `\'C\'` et `\'B\'` ne servent jamais ; il faut les ranger du plus exigeant au moins exigeant.</li>' +
        '<li>`h` : le motif `y` est une nouvelle variable, il attrape tout ce qui n’est pas 0 (`Warning 11` : le cas `_` ne sert plus). `h 5 5` et `h 5 3` valent 1. Pour comparer au paramètre `y` : `| z when z = y -> 1`.</li></ul>' },
      { t: 'Les corrections', html: '<p>Les définitions corrigées, sans avertissement :</p>' + R('sem-3-5b') }],
    answer: AE(R('sem-3-5')),
    traps: [
      'Laisser un `Warning 8` dans une réponse d’examen : il montre un cas oublié. Traite-le, par exemple avec une exception.',
      'Écrire le nom d’un paramètre dans un motif pour le comparer : il est masqué par une nouvelle variable.',
      'Ranger les cas gardés dans n’importe quel ordre : le premier qui filtre gagne.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-3-7', exam: null, kind: 'td', order: 1067, src: 'Séminaire · Ex 3.7',
    title: 'Affranchissement : exceptions et ordre des tests', topics: ['exceptions', 'filtrage'], lvl: 2, time: 15,
    intro: '<p>Le but de cet exercice est d’écrire une fonction calculant le tarif d’affranchissement d’un colis de moins de 3kg pour les envois en France. Les tarifs sont donnés par le tableau suivant :</p>' +
      '<div class="tbl"><table><thead><tr><th>Poids jusqu’à</th><th>Économique</th><th>Standard</th><th>Express</th></tr></thead><tbody>' +
      '<tr><td>500g</td><td>3,4 €</td><td>4,6 €</td><td>9,1 €</td></tr><tr><td>1000g</td><td>4,6 €</td><td>5,9 €</td><td>11 €</td></tr><tr><td>2000g</td><td>5,1 €</td><td>6,5 €</td><td>13,5 €</td></tr><tr><td>3000g</td><td>6,9 €</td><td>7,2 €</td><td>14,2 €</td></tr></tbody></table></div>' +
      '<p>Les 3 types de tarifs seront représentés par les chaînes de caractères `"eco"`, `"standard"` et `"express"`.</p>',
    questions: [
      '<b>1.</b> Écrire la fonction `rate_eco` qui calcule le tarif d’envoi d’un colis en économique, à partir du poids.',
      '<b>2.</b> Écrire les fonctions `rate_standard` et `rate_express` analogues à `rate_eco`, pour les cas des envois aux tarifs normal et express.',
      '<b>3.</b> Écrire la fonction `rate`, qui permet de calculer le tarif d’affranchissement d’un colis connaissant son poids et le code du tarif.',
      '<b>4.</b> Peut-on résoudre ce problème avec moins de fonctions (essayer de réunir les fonctions de tarifs `rate_eco`, `rate_standard` et `rate_express` en une seule) ?' +
        ex(['# rate 750 "eco" ;;', '- : float = 4.6', '# rate (-150) "standard" ;;', 'Exception: Invalid_argument "weight has to be positive".', '# rate 150 "drone" ;;', 'Exception: Failure "unknown code".', '# rate 3500 "express" ;;', 'Exception: Failure "too heavy".'])],
    hints: [
      'Les exemples fixent les exceptions : poids négatif (`Invalid_argument`), poids trop grand et code inconnu (`Failure`).',
      'Les tests de validité se font une fois, dans `rate` : les fonctions de tarif peuvent supposer un poids entre 0 et 3000.',
      'Question 4 : une seule cascade de `if` sur le poids peut rendre les trois tarifs d’un coup, dans un triplet.'],
    solution: [
      { t: 'Questions 1 et 2', html: '<p>Une cascade de `if` sur le poids. Les montants sont des `float` : `11.` et non `11`.</p>' + S('sem-3-7', '0-2') },
      { t: 'Question 3 : la fonction rate', html: '<p>`rate` teste d’abord le poids (négatif, puis trop lourd), puis filtre le code. Un code inconnu tombe dans `_`.</p>' + R('sem-3-7', '3-9') },
      { t: 'Question 4 : une seule fonction', html: '<p>La cascade sur le poids rend le triplet des trois tarifs, ouvert par `let (eco, standard, express) = … in` ; le filtrage du code choisit dans le triplet.</p>' + R('sem-3-7b') }],
    answer: A(R('sem-3-7', '0-3')),
    traps: [
      'Écrire `11` au lieu de `11.` : toutes les branches doivent avoir le type `float`.',
      'Tester le code avant le poids : `rate (-150) "drone"` donnerait `unknown code`. L’ordre des tests décide de l’exception.',
      'Oublier le cas `_` du filtrage sur le code : `Warning 8`, puis `Match_failure` au lieu de `Failure "unknown code"`.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-3-9', exam: null, kind: 'td', order: 1069, src: 'Séminaire · Ex 3.9',
    title: '« Filtrage anonyme » : function sans match', topics: ['filtrage'], lvl: 1, time: 10,
    intro: '<p>Les fonctions à écrire doivent obligatoirement utiliser du filtrage mais sans `match` !</p>',
    questions: [
      '<b>1.</b> Écrire une fonction Caml qui compte le nombre de 0 d’un couple d’entiers.' + ex(['# count (0, 0) ;;', '- : int = 2', '# count (0, 1) ;;', '- : int = 1', '# count (4, 5) ;;', '- : int = 0']),
      '<b>2.</b> Écrire en Caml la fonction suivante : ∀(m, n) ∈ ℤ × ℤ, f(m, n) = 0 si m = 0 ; 2m si m ≠ 0 et n = 0 ; m.n si m ≠ 0 et n ≠ 0.',
      '<b>3.</b> Soit la fonction Caml `and3` définie ci-dessous. Trouver une fonction équivalente sans utiliser d’opérateurs logiques.' + ml(['let and3 (a, b, c) = a && b && c ;;'])],
    hints: [
      '`function` filtre directement son unique paramètre : `let f = function motif1 -> … | motif2 -> …`.',
      'Le paramètre est un couple : les motifs sont des couples, comme `(0, _)`.',
      'Les cas sont essayés dans l’ordre : place les plus précis d’abord.'],
    solution: [
      { t: 'Question 1 : compter les zéros', html: '<p>Trois cas : les deux nuls, un seul (motif « ou » `(0, _) | (_, 0)`, après le premier), aucun.</p>' + R('sem-3-9', '0-3') },
      { t: 'Question 2 : la fonction f', html: '<p>L’ordre des cas suit la définition : `m = 0` d’abord, puis `n = 0` (alors `m ≠ 0`), puis le cas général.</p>' + R('sem-3-9', '4-7') },
      { t: 'Question 3 : and3 sans opérateur logique', html: '<p>`and3` est vraie seulement pour `(true, true, true)` : un cas, et tout le reste.</p>' + R('sem-3-9', '8-10') }],
    answer: A(R('sem-3-9', '0,4,8')),
    traps: [
      'Placer `(0, _) | (_, 0)` avant `(0, 0)` : le couple `(0, 0)` serait compté une fois.',
      'Écrire `let count x y = …` : la fonction prend un couple, un seul paramètre.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-4-1a', exam: null, kind: 'td', order: 1081, src: 'Séminaire · Ex 4.1 (1/2)',
    title: 'Qu’est-ce ? Lire des fonctions récursives', topics: ['recursivite', 'mystery'], lvl: 2, time: 20,
    intro: '<p>Que calculent les fonctions suivantes (étudier tous les cas) ?</p>' + S('sem-4-1a', '0,4,8,11,13,16,19') +
      '<p><em>Entraînement aux exercices « Mystery » des sujets : donner le type, évaluer quelques appels, dire ce que fait la fonction.</em></p>',
    hints: [
      'Déroule chaque fonction sur un petit argument (3 ou 4) et écris les appels successifs.',
      '« Tous les cas » : regarde aussi les arguments négatifs, 0, et un diviseur nul. La récursion s’arrête-t-elle toujours ?',
      'Pour `double`, demande-toi si les appels se rapprochent du cas d’arrêt.'],
    solution: [
      { t: 'f1, f2, f3', html: '<ul><li>`f1 n` = 0 + 1 + … + n. Pour n &lt; 0, `n - 1` s’éloigne de 0 : la récursion ne s’arrête pas (`Stack overflow`).</li>' +
        '<li>`f2 n d` = la somme des multiples de `d` entre 1 et `n` (10 et 3 : 3 + 6 + 9 = 18). `n < 0` : `Invalid_argument` ; `d = 0` : `Division_by_zero`.</li>' +
        '<li>`f3 d n` = d × (d − 1) × … × (d − n + 1), un produit de n facteurs décroissants (5 × 4 × 3 = 60). Pour n ≤ 1, `d`.</li></ul>' + R('sem-4-1a', '1-3,5-7,9-10') },
      { t: 'f4, f', html: '<ul><li>`f4 n` = la somme des multiples de 4 entre 1 et `n` (12 : 4 + 8 + 12 = 24). Le `let r = … in` fait un seul appel récursif.</li>' +
        '<li>`f n` = le nombre formé de n chiffres 1 (`f 4` = 1111), construit avec un accumulateur : `acc * 10 + 1` à chaque étape.</li></ul>' + R('sem-4-1a', '12,14-15') },
      { t: 'double et mystery', html: '<ul><li>`double n` : pour n ≠ 0, l’appel se fait sur `2*n`, qui s’éloigne de 0 : mathématiquement, la récursion ne s’arrête jamais (réponse attendue). Seul `double 0` vaut 0.</li>' +
        '<li>`mystery x` = le nombre de chiffres de `x` (pour x ≥ 0) : 2026 en a 4. Pour tout x &lt; 10, donc tout négatif, 1.</li></ul>' + R('sem-4-1a', '17-18,20-22') +
        '<p class="sol-note">Sur machine, `double 1` rend −1 : les entiers de Caml ont 63 bits, `2*n` finit par déborder et valoir 0 après une soixantaine d’appels. Ce résultat n’a pas de sens mathématique : la réponse attendue reste « ne termine pas ».</p>' },
      { t: 'Les types', html: '<p>Les réponses de Caml aux sept définitions :</p>' + R('sem-4-1a', '0,4,8,11,13,16,19') }],
    answer: '<ul><li>`f1 n` : 0 + 1 + … + n (ne termine pas si n &lt; 0).</li><li>`f2 n d` : somme des multiples de d entre 1 et n (exception si n &lt; 0, division par zéro si d = 0).</li><li>`f3 d n` : d × (d − 1) × … × (d − n + 1).</li>' +
      '<li>`f4 n` : somme des multiples de 4 jusqu’à n.</li><li>`f n` : l’entier formé de n chiffres 1.</li><li>`double n` : ne termine pas pour n ≠ 0.</li><li>`mystery x` : le nombre de chiffres de x (1 pour tout x &lt; 10).</li></ul>',
    traps: [
      'Oublier les cas négatifs : `f1 (-1)` ne s’arrête pas, `mystery (-345)` vaut 1.',
      'Recopier `- : int = -1` pour `double 1` comme si c’était un vrai résultat : c’est un débordement.',
      'Donner le résultat sur un exemple sans dire ce que calcule la fonction : la question demande le cas général.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-4-1b', exam: null, kind: 'td', order: 1082, src: 'Séminaire · Ex 4.1 (2/2)',
    title: 'Qu’est-ce ? Affichages et ordre des appels', topics: ['recursivite', 'mystery', 'evaluation'], lvl: 2, time: 15,
    intro: '<p>Quels seront les résultats des évaluations successives des phrases suivantes et qu’est-ce qui sera affiché ?</p>' +
      R('sem-4-1b', null, { mode: 'reveal', title: 'Séminaire, exercice 4.1' }),
    hints: [
      '`print_int n; print_char \' \'` affiche avant ou après l’appel récursif, selon sa place dans la séquence.',
      'La réponse de Caml `- : unit = ()` vient après tout ce qui est affiché, sur la même ligne si rien n’est passé à la ligne.',
      'Pour `g`, note à chaque appel la valeur de `n` et de `d`, et si `n mod d = 0`.'],
    solution: [
      { t: 'print1 et print2', html: '<p>`print1` affiche `n` <strong>avant</strong> l’appel récursif : 5 4 3 2 1. `print2` appelle d’abord, et affiche au retour : les appels s’empilent jusqu’à 0, puis les affichages se font en remontant : 1 2 3 4 5. Le type est `int -> unit` : la fonction ne rend rien d’utile, elle affiche.</p>' + R('sem-4-1b', '0-3') },
      { t: 'g', html: '<p>À chaque appel, `g` affiche `n` et `d`, puis enlève le dernier chiffre de `n`. Si `n` est divisible par `d`, elle compte 1 et garde `d` ; sinon `d` baisse de 1.</p>' +
        '<ul><li>435567, 7 : reste 6, non → d = 6.</li><li>43556, 6 : reste 2, non → d = 5.</li><li>4355, 5 : oui, compte 1. 435, 5 : oui, compte 1.</li><li>43, 5 : non → d = 4. 4, 4 : oui, compte 1.</li><li>n = 0 : fin, 0.</li></ul>' +
        '<p>Le résultat, 3, s’affiche après les six lignes : `g` compte, parmi n, n/10, n/100…, ceux qui sont divisibles par le `d` du moment.</p>' + R('sem-4-1b', '4-5') }],
    answer: AE(R('sem-4-1b')),
    traps: [
      'Inverser les affichages de `print1` et `print2` : regarde si l’affichage est avant ou après l’appel.',
      'Oublier la réponse `- : unit = ()` (ou `- : int = …`) après l’affichage.',
      'Dans un `if … then … else`, une séquence `e1; e2` doit être entre `begin … end` (ou parenthèses).'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-4-6', exam: null, kind: 'td', order: 1086, src: 'Séminaire · Ex 4.6',
    title: 'Multiplication avec + et −, et fonction chapeau', topics: ['recursivite'], lvl: 2, time: 12,
    intro: '<p>Écrire une fonction qui calcule x × y ((x, y) ∈ ℕ²) en n’utilisant que les opérateurs + et -. Comment gérer les cas où (x, y) ∈ ℤ² ?</p>',
    hints: [
      'x × y = x + x × (y − 1), et x × 0 = 0 : la récursion porte sur y.',
      'Dans ℤ, si y &lt; 0, y − 1 s’éloigne de 0. Mais x × y = −(x × (−y)).',
      'Le signe se teste une fois, dans une fonction chapeau, qui appelle la fonction récursive avec un y positif.'],
    solution: [
      { t: 'Dans ℕ²', html: '<ul><li>`y = 0` : 0.</li><li>sinon : `x + mult x (y - 1)`.</li></ul>' + R('sem-4-6', '0-2') },
      { t: 'Dans ℤ² : la fonction chapeau', html: '<p>C’est l’exemple de la page Moodle « Conseils pour la récursivité » : `mult_rec` ne prend que `y` (`x` ne change pas, elle le prend dans le chapeau), et ne marche que pour y ≥ 0. Le chapeau élimine les cas x = 0 et x = 1, et appelle `mult_rec` avec −y si y &lt; 0.</p>' + R('sem-4-6', '3-8') },
      { t: 'La coquille de la page Moodle', html: '<p>La page écrit `x + mult_rec (x, y-1)`, alors que `mult_rec` prend un seul entier. Caml refuse la définition :</p>' + R('sem-4-6b') +
        '<p class="sol-note">Coquille de la page Moodle : il faut `mult_rec (y-1)`. C’est tout l’intérêt de l’exemple : `x` n’est plus un paramètre de la fonction récursive.</p>' }],
    answer: A(R('sem-4-6', '3')),
    traps: [
      'Tester le signe de `y` à chaque appel : une fonction chapeau le fait une fois.',
      'Recopier `mult_rec (x, y-1)` de la page Moodle : erreur de type.',
      'Écrire `-mult_rec -y` : Caml lit une soustraction. Il faut `-mult_rec (-y)`.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-4-8', exam: null, kind: 'td', order: 1088, src: 'Séminaire · Ex 4.8',
    title: 'Fibonacci : deux appels, puis un seul', topics: ['recursivite', 'accumulateur'], lvl: 2, time: 12,
    intro: '<p>Écrire une fonction calculant le nème terme (n ∈ ℕ) de la suite de Fibonacci définie par :</p><p>F(n) = 1 si n ≤ 1 ; F(n) = F(n − 1) + F(n − 2) sinon.</p>',
    hints: [
      'La définition se traduit directement, avec deux appels récursifs.',
      'Combien d’appels pour F(25) ? Dessine l’arbre des appels de F(5) : F(3) y est calculé deux fois.',
      'Pour ne rien recalculer, avance avec deux paramètres supplémentaires : deux termes consécutifs.'],
    solution: [
      { t: 'La traduction directe', html: R('sem-4-8', '0-3') +
        '<p>Chaque appel en lance deux : les mêmes valeurs sont recalculées un grand nombre de fois. Compté avec OCaml : 177 appels pour `fibo 10`, 242 785 pour `fibo 25`, 2 692 537 pour `fibo 30`. Le nombre d’appels croît comme F(n) lui-même.</p>' },
      { t: 'Avec deux accumulateurs', html: '<p>`fib a b n` avec a = F(k) et b = F(k + 1) : une étape donne F(k + 1) et F(k + 2), soit `fib b (a + b) (n-1)`. On part de F(0) = F(1) = 1. n étapes en tout.</p>' + R('sem-4-8', '4-8') }],
    answer: A(R('sem-4-8', '0,4')),
    traps: [
      'Croire que la version à deux appels convient pour de grands n : `fibo 50` demanderait des dizaines de milliards d’appels.',
      'Se tromper de cas de base : ici F(0) = F(1) = 1 (définition du séminaire), pas F(0) = 0.',
      'Oublier la fonction chapeau qui initialise les accumulateurs.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-4-9', exam: null, kind: 'td', order: 1089, src: 'Séminaire · Ex 4.9',
    title: 'Miroir : chaîne, puis entier avec accumulateur', topics: ['recursivite', 'accumulateur'], lvl: 2, time: 12,
    intro: '<p>Écrire une fonction qui "inverse" les chiffres d’un entier positif quelconque.</p><p>Deux versions :</p>',
    questions: [
      '<b>1.</b> Le résultat sera une chaîne de caractères contenant l’entier "miroir". Utiliser la fonction `string_of_int : int -> string`.' + ex(['# reverse 1234 ;;', '- : string = "4321"']),
      '<b>2.</b> Le résultat sera de type entier (sans utiliser la fonction précédente, ni chaînes de caractères).' + ex(['# reverse_int 1234 ;;', '- : int = 4321'])],
    hints: [
      'Le dernier chiffre est `n mod 10`, le reste du nombre `n / 10`.',
      'Version chaîne : le dernier chiffre en premier, puis le miroir du reste, collés avec `^`.',
      'Version entière : un accumulateur qui reçoit les chiffres un par un : `acc * 10 + n mod 10`.'],
    solution: [
      { t: 'Version 1 : une chaîne', html: '<ul><li>`n < 10` : le chiffre seul, `string_of_int n`.</li><li>sinon : le dernier chiffre, suivi du miroir de `n / 10`.</li></ul>' + R('sem-4-9', '0-3') },
      { t: 'Version 2 : un entier', html: '<p>`rev acc n` : `acc` contient le miroir des chiffres déjà enlevés. Chaque étape enlève le dernier chiffre de `n` et l’ajoute à droite de `acc`. Le chapeau lance `rev 0 n`.</p>' + R('sem-4-9', '4-8') +
        '<p>`reverse 1200` vaut `"0021"` mais `reverse_int 1200` vaut 21 : un entier n’a pas de zéros à gauche.</p>' }],
    answer: A(R('sem-4-9', '0,4')),
    traps: [
      'Version entière sans accumulateur : il faudrait connaître le nombre de chiffres pour placer chacun.',
      'Oublier que les zéros de tête disparaissent dans un entier : c’est normal, pas une erreur.',
      'Écrire `string_of_int n mod 10` : Caml lit `(string_of_int n) mod 10`, erreur de type.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-4-10', exam: null, kind: 'td', order: 1090, src: 'Séminaire · Ex 4.10',
    title: 'Puissance : classique, puis rapide', topics: ['recursivite'], lvl: 2, time: 12,
    intro: '<p>Soient x ∈ ℝ et n ∈ ℕ.</p>',
    questions: [
      '<b>1.</b> Écrire une fonction récursive calculant xⁿ en utilisant la méthode "classique" (par multiplications successives).',
      '<b>2.</b> Écrire une nouvelle fonction calculant xⁿ en utilisant la méthode de l’exponentiation rapide : essayer d’exprimer xⁿ en fonction de x<sup>⌊n/2⌋</sup> (⌊x⌋ est la partie entière inférieure de x).'],
    hints: [
      'x ∈ ℝ : x est un `float`, les opérateurs sont `*.`, et x⁰ vaut `1.`.',
      'Si n est pair, xⁿ = (x<sup>n/2</sup>)² ; s’il est impair, xⁿ = x × (x<sup>⌊n/2⌋</sup>)².',
      'Calcule x<sup>⌊n/2⌋</sup> une seule fois, avec `let p = … in`.'],
    solution: [
      { t: 'Question 1 : multiplications successives', html: R('sem-4-10', '0-2') + '<p>n multiplications, une par appel.</p>' },
      { t: 'Question 2 : exponentiation rapide', html: '<p>Un seul appel récursif par niveau, sur `n / 2` : environ log₂ n appels (4 pour n = 10 : 10, 5, 2, 1).</p>' + R('sem-4-10', '3-7') +
        '<p>Écrire `fast_power x (n/2) *. fast_power x (n/2)` referait deux fois le même calcul à chaque niveau : on retomberait à n multiplications, tout le gain serait perdu.</p>' }],
    answer: A(R('sem-4-10', '0,3')),
    traps: [
      'Mélanger `*` et `*.` : `x` est un `float`.',
      'Appeler deux fois `fast_power x (n/2)` : le gain disparaît.',
      'Oublier le facteur `x` quand n est impair.'],
    official: false, note: NOTE_SEM
  });

  add({
    id: 'sem-hanoi', exam: null, kind: 'td', order: 1099, src: 'Moodle · Hanoï',
    title: 'Les tours de Hanoï : deux appels récursifs', topics: ['recursivite'], lvl: 2, time: 15,
    intro: '<p>Légende d’É. Lucas (1883) : trois piquets ; on déplace un disque à la fois, jamais un grand disque sur un plus petit. Il faut déplacer les n disques du piquet 1 au piquet 3. Nombre minimum de déplacements pour n disques ? n = 1 : 1 coup ; n = 2 : 3 coups.</p>' +
      '<p>Compléter la fonction `play` (le `FIXME`) :</p>' +
      ml(['(* displays moves: source -> destination *)', 'let move source destination =', '  print_int source ;', '  print_string " -> " ;', '  print_int destination ;', '  print_newline()', ';;', '',
        'let hanoi n =', '  let rec play n source destination =', '    (* FIXME *)', '  in', '  if n <= 0 then', '    invalid_arg "Hanoi: number of disks invalid"', '  else', '    play n 1 3']) +
      ex(['# hanoi 3 ;;', '1 -> 3', '1 -> 2', '3 -> 2', '1 -> 3', '2 -> 1', '2 -> 3', '1 -> 3', '- : unit = ()']),
    hints: [
      'Pour déplacer n disques de `source` à `destination`, le plus grand doit passer seul : les n − 1 autres doivent d’abord être ailleurs.',
      'Trois étapes : n − 1 disques vers le troisième piquet, le grand vers la destination, puis les n − 1 disques sur lui.',
      'Le troisième piquet : les piquets sont 1, 2, 3, et 1 + 2 + 3 = 6.'],
    solution: [
      { t: 'Principe', html: '<ul><li>`n = 0` : rien à faire.</li><li>sinon, avec `other = 6 - source - destination` : `play (n-1) source other`, puis `move source destination` (le grand disque), puis `play (n-1) other destination`.</li></ul>' +
        '<p>Deux appels récursifs sur n − 1 : les appels tendent vers 0.</p>' },
      { t: 'Le code et la réponse de Caml', html: R('sem-hanoi', '0-4') + '<p>La sortie de `hanoi 3` est exactement celle de la page Moodle.</p>' },
      { t: 'Nombre de déplacements', html: '<p>Avec c(n) le nombre de coups : c(0) = 0 et c(n) = 2 c(n − 1) + 1, d’où c(n) = 2ⁿ − 1 : 7 pour 3 disques, 1023 pour 10.</p>' + R('sem-hanoi', '5-7') }],
    answer: A(R('sem-hanoi', '1')),
    traps: [
      'Déplacer le grand disque avant d’avoir libéré les n − 1 autres.',
      'Calculer le troisième piquet avec des `if` : `6 - source - destination` suffit.',
      'Oublier `begin … end` autour de la séquence dans le `if` : la séquence `a ; b ; c` doit être groupée.'],
    official: false, note: 'Fonction move et réponse de hanoi 3 : page Moodle « Hanoï ». play rédigée, code exécuté avec OCaml 4.14.'
  });

  /* =====================================================================
     TP (03, « Premier pas en Caml – Soyez fainéants MAIS efficaces ! », sept. 2026)
     ===================================================================== */
  add({
    id: 'tp-2', exam: null, kind: 'td', order: 2002, src: 'TP · Ex 2',
    title: 'Nombre mystère : exception sur le paramètre', topics: ['exceptions', 'fonctions'], lvl: 2, time: 15,
    intro: '<p>Soit un entier positif à 3 chiffres <i>myst</i> ayant les propriétés suivantes :</p><ul><li><i>myst</i> est un carré parfait (le carré d’un entier) ;</li><li>la somme des carrés des deux plus grands chiffres de <i>myst</i> est également un carré parfait.</li></ul>' +
      '<p>Écrire la fonction Caml `mystery : int -> bool` qui détermine si un entier donné est le nombre mystère <i>myst</i>. La fonction devra déclencher une exception si le paramètre n’est pas un nombre positif à trois chiffres.</p>' +
      ex(['# mystery 123 ;;', '- : bool = false', '# mystery 12345 ;;', 'Exception: Invalid_argument "mystery: not a 3-digits integer".']) +
      '<p>Fonctions utiles :</p><ul><li>`val sqrt : float -> float` Square root.</li><li>`val int_of_float : float -> int` Truncate the given floating-point number to an integer.</li><li>`val float_of_int : int -> float` Convert an integer to floating-point.</li></ul>' +
      '<p>Question subsidiaire : un tel nombre existe-t’il ?</p>',
    hints: [
      'Paramètre invalide : `invalid_arg`, avec le message de l’exemple, testé avant tout calcul.',
      'Carré parfait : la racine carrée tronquée `r`, puis `r * r = x`. Écris-le une fois, dans une fonction locale.',
      'Les deux plus grands chiffres : la somme des carrés des trois chiffres, moins le carré du plus petit.'],
    solution: [
      { t: 'Spécification', html: '<p>`mystery n` rend `true` si `n` a les deux propriétés. `n` hors de [100, 999] : `Invalid_argument "mystery: not a 3-digits integer"`.</p>' },
      { t: 'Principe', html: '<ul><li>`is_square x` : `r` = partie entière de √x, puis `r * r = x`.</li><li>chiffres : `a = n / 100`, `b = (n / 10) mod 10`, `c = n mod 10`.</li>' +
        '<li>somme des carrés des deux plus grands : a² + b² + c² moins le carré du plus petit.</li><li>`&&` : si `n` n’est pas un carré, la seconde condition n’est pas calculée.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Avec les deux exemples, un nombre qui convient et un nombre à deux chiffres :</p>' + R('tp-2', '0-4') },
      { t: 'Question subsidiaire', html: '<p>On teste tous les entiers de 100 à 999 :</p>' + R('tp-2', '5-6') +
        '<p>Quatre nombres conviennent. 324 = 18² : ses deux plus grands chiffres, 4 et 3, donnent 16 + 9 = 25 = 5². Les trois autres (100, 400, 900) n’y arrivent qu’avec un chiffre 0 parmi les deux plus grands : si l’on exige deux chiffres non nuls, <i>myst</i> = 324.</p>' }],
    answer: A(R('tp-2', '0')),
    traps: [
      'Oublier l’exception, ou lever `Failure` : l’exemple montre `Invalid_argument`.',
      'Comparer des flottants (`sqrt x = floor (sqrt x)`) : passe par un entier et vérifie `r * r = x`.',
      'Prendre les deux premiers chiffres au lieu des deux plus grands.'],
    official: false, note: 'Pas de corrigé officiel du TP : correction rédigée, code exécuté avec OCaml 4.14.'
  });

  add({
    id: 'tp-5', exam: null, kind: 'td', order: 2005, src: 'TP · Ex 5 (Level 1)',
    title: 'Lendemain : une date valide, deux exceptions', topics: ['exceptions', 'filtrage'], lvl: 2, time: 20,
    intro: '<p>Écrire une fonction qui calcule la date du lendemain à partir d’une date donnée. La fonction devra déclencher une exception si la date n’est pas valide.</p>' +
      '<p>Level 1</p><ul><li>En paramètre, une date est représentée par 3 entiers : jour mois année.</li><li>En résultat, une date est représentée par un triplet d’entiers (jour, mois, année).</li></ul>' +
      ex(['# day_after 12 9 2024 ;;', '- : int * int * int = (13, 9, 2024)', '# day_after 28 2 2024 ;;', '- : int * int * int = (29, 2, 2024)', '# day_after 28 2 2025 ;;', '- : int * int * int = (1, 3, 2025)', '# day_after 31 12 2024 ;;', '- : int * int * int = (1, 1, 2025)',
        '# day_after 12 15 2005 ;;', 'Exception: Failure "the day after:not a month number".', '# day_after 31 6 2029 ;;', 'Exception: Failure "the day after:this day does not exist for month 6".']),
    hints: [
      'Commence par le nombre de jours du mois : un filtrage sur le mois (30 ou 31, février à part). Un mois hors de 1..12 déclenche la première exception.',
      'Année bissextile : divisible par 4 mais pas par 100, ou divisible par 400.',
      'Puis trois cas : le jour n’existe pas (exception), ce n’est pas le dernier jour du mois, c’est le dernier jour (attention à décembre).'],
    solution: [
      { t: 'Spécification', html: '<p>`day_after d m y` rend le triplet du lendemain. Type : `int -> int -> int -> int * int * int`. Les exemples imposent `Failure` et ses deux messages ; le second contient le numéro du mois, construit avec `^` et `string_of_int` (fonctions données par le TP).</p>' },
      { t: 'Principe', html: '<ul><li>`leap` : l’année est-elle bissextile ?</li><li>`days` : le nombre de jours du mois `m` ; un mois invalide déclenche `failwith` dans le filtrage.</li>' +
        '<li>jour hors de 1..`days` : `failwith`.</li><li>`d < days` : `(d + 1, m, y)`. Sinon, dernier jour : `(1, 1, y + 1)` en décembre, `(1, m + 1, y)` ailleurs.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: R('tp-5') +
        '<p>2100 n’est pas bissextile (divisible par 100, pas par 400), 2000 l’est.</p>' }],
    answer: A(R('tp-5', '0')),
    traps: [
      'Oublier les années séculaires : 2100 n’est pas bissextile.',
      'Tester le jour avant le mois : `day_after 12 15 2005` doit signaler le mois.',
      'Écrire un `match` sans cas `_` pour le mois : `Warning 8`, puis `Match_failure` au lieu de l’exception demandée.'],
    official: false, note: 'Pas de corrigé officiel du TP : correction rédigée, code exécuté avec OCaml 4.14. Messages d’exception recopiés du sujet (« the day after:not a month number », sans espace après les deux-points).'
  });

  /* =====================================================================
     TD listes (04, « td Caml 1 – Septembre 2026 »)
     ===================================================================== */
  add({
    id: 'td-listes-1-1', exam: null, kind: 'td', order: 3011, src: 'TD listes · Ex 1.1',
    title: 'Produit des éléments d’une liste', topics: ['listes'], lvl: 1, time: 5,
    intro: '<p>Écrire une fonction qui calcule le produit de tous les éléments d’une liste d’entiers non nuls.</p>',
    hints: [
      'Une liste n’a que deux formes : `[]` ou `e :: l`. Écris la réponse pour chacune.',
      'Pour `e :: l`, suppose que l’appel récursif sur `l` rend déjà le produit de `l`. Que reste-t-il à faire avec `e` ?',
      'Liste vide : quel nombre ne change pas un produit ?'],
    solution: [
      { t: 'Spécification', html: '<p>`product lst` rend le produit des éléments de la liste d’entiers `lst`. Type attendu : `int list -> int`. Pas d’exception : la liste vide a un produit.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`[]` : le résultat est 1, l’élément neutre de la multiplication (cas d’arrêt).</li>' +
        '<li>`e :: l` : `e` multiplié par le produit de `l` (cas récursif, sur une liste plus courte).</li></ul>' +
        '<p>C’est un parcours complet : chaque élément compte, on va jusqu’au bout de la liste.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Avec l’exemple d’un produit négatif et la liste vide :</p>' + R('td-listes-1-1') },
      { t: 'Pourquoi pas 0 pour la liste vide', html: '<p>Avec `[] -> 0`, chaque produit finit par une multiplication par 0 :</p>' + R('td-listes-1-1b') +
        '<p>Le TD précise « entiers non nuls » : un 0 dans la liste donnerait 0 de toute façon. On pourrait alors s’arrêter dès qu’on le rencontre.</p>' }],
    answer: A(R('td-listes-1-1', '0')),
    traps: [
      'Rendre 0 pour la liste vide : le résultat vaut alors toujours 0.',
      'Oublier `rec` : Caml répond `Error: Unbound value product`.',
      'Écrire le motif `[e; l]` : c’est une liste de deux éléments, pas « un élément suivi d’une liste ». Le cas général s’écrit `e :: l`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-1-2', exam: null, kind: 'td', order: 3012, src: 'TD listes · Ex 1.2',
    title: 'Compter les occurrences d’une valeur', topics: ['listes'], lvl: 1, time: 6,
    intro: '<p>Écrire une fonction qui compte le nombre d’occurrences (apparitions) d’une valeur donnée dans une liste quelconque.</p>',
    hints: [
      'Deux paramètres : la valeur `x` et la liste. On ne filtre que la liste : `let rec count x = function …`.',
      'Pour `e :: l`, deux cas selon que `e` vaut `x` ou non. Dans les deux cas, il faut continuer sur `l`.',
      '« Liste quelconque » : ta fonction doit marcher pour des entiers, des chaînes, des caractères… Que doit rendre la liste vide ?'],
    solution: [
      { t: 'Spécification', html: '<p>`count x lst` rend le nombre de fois où `x` apparaît dans `lst`. La liste est quelconque : le type doit être polymorphe, `\'a -> \'a list -> int`.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`[]` : 0.</li><li>`e :: l` avec `e = x` : 1 de plus que le compte dans `l`.</li><li>`e :: l` sinon : le compte dans `l`.</li></ul>' +
        '<p>Parcours complet : tous les cas non vides sont récursifs.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Sur des entiers, des chaînes et la liste vide :</p>' + R('td-listes-1-2') },
      { t: 'Le piège du motif `x :: l`', html: '<p>Pour dire « la tête vaut `x` », on ne peut pas écrire `x` dans le motif : un nom dans un motif crée une <strong>nouvelle</strong> variable, qui attrape n’importe quelle tête. Le cas suivant ne sert plus jamais :</p>' +
        R('td-listes-1-2b') + '<p>La fonction compte alors tous les éléments. Pour comparer, il faut un test : `if e = x then …`, ou un motif gardé `e :: l when e = x -> …`.</p>' }],
    answer: A(R('td-listes-1-2', '0')),
    traps: [
      'Écrire `x :: l` comme motif pour « la tête vaut x » : `Warning 11` et la fonction compte tout.',
      'Oublier de continuer sur `l` quand `e = x` : on compterait au plus 1.',
      'Typer la liste en `int list` (avec un 0 ou un `+` sur les éléments) : la fonction ne marcherait plus sur une liste quelconque.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-1-3', exam: null, kind: 'td', order: 3013, src: 'TD listes · Ex 1.3',
    title: 'Recherche d’un élément', topics: ['listes'], lvl: 1, time: 5,
    intro: '<p>Écrire une fonction qui recherche si un élément est présent dans une liste.</p>',
    hints: [
      'Le résultat est un booléen. Que vaut-il pour la liste vide ?',
      'Dès que la tête vaut l’élément cherché, la réponse est connue : inutile de regarder la suite.',
      '`a || b` n’évalue pas `b` quand `a` est vrai : c’est exactement l’arrêt dont tu as besoin.'],
    solution: [
      { t: 'Spécification', html: '<p>`search x lst` rend `true` si `x` est un élément de `lst`, `false` sinon. Type : `\'a -> \'a list -> bool`.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`[]` : `false` (on a tout parcouru sans trouver).</li><li>`e :: l` avec `e = x` : `true`, et on s’arrête.</li><li>sinon : on cherche dans `l`.</li></ul>' +
        '<p>C’est un parcours partiel : il y a un second cas d’arrêt, « trouvé ».</p>' },
      { t: 'Le code et la réponse de Caml', html: R('td-listes-1-3') +
        '<p>`e = x || search x l` : si `e = x` est vrai, `||` n’évalue pas l’appel récursif. C’est la même chose que la version avec `if` :</p>' + R('td-listes-1-3b', '0') }],
    answer: A(R('td-listes-1-3', '0')),
    traps: [
      'Écrire `if e = x then true else false` : c’est simplement `e = x`.',
      'Compter puis comparer (`count x lst > 0`) : juste, mais on parcourt toute la liste même quand l’élément est en tête.',
      'Écrire `search x l || e = x` : le résultat est le même, mais l’appel récursif est fait d’abord, donc plus d’arrêt anticipé.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-1-4', exam: null, kind: 'td', order: 3014, src: 'TD listes · Ex 1.4',
    title: 'ième : le ième élément, deux exceptions', topics: ['listes', 'exceptions'], lvl: 2, time: 10, near: ['p2019-ex3'],
    intro: '<p>Écrire une fonction qui donne la valeur du ième élément d’une liste. La fonction devra déclencher une exception `Invalid_argument` si i est négatif ou nul, ou une exception `Failure` si la liste est trop courte.</p>',
    hints: [
      'Le test sur `i` ne dépend pas de la liste : fais-le une seule fois, dans une fonction chapeau, avant d’appeler la fonction récursive.',
      'Dans la fonction récursive, `i` vaut au moins 1. Si `i = 1`, la réponse est la tête. Sinon, le ième de `e :: l` est le (i − 1)-ième de `l`.',
      'Où tombe-t-on quand la liste est trop courte ? Sur `[]`, avec un `i` encore ≥ 1 : c’est là que se déclenche `Failure`.'],
    solution: [
      { t: 'Spécification', html: '<p>`nth i lst` rend l’élément de rang `i` de `lst` (le premier élément est au rang 1). Type : `int -> \'a list -> \'a`.</p>' +
        '<ul><li>`i ≤ 0` : `Invalid_argument` (paramètre invalide, quelle que soit la liste).</li><li>liste trop courte : `Failure`.</li></ul>' +
        '<p class="sol-note">Le TD ne fixe ni l’ordre des paramètres ni les messages : ici `i` d’abord, comme `insert_nth x i lst` et `remove_nth i list` dans les sujets, et des messages au choix.</p>' },
      { t: 'Principe : une fonction chapeau', html: '<p>La fonction chapeau `nth` teste `i` une fois. La fonction locale `get` ne voit que des rangs ≥ 1 :</p>' +
        '<ul><li>`[]` : la liste est trop courte, `failwith`.</li><li>`e :: l` et `i = 1` : `e`.</li><li>`e :: l` sinon : `get (i-1) l`.</li></ul>' +
        '<p>Chaque appel diminue `i` de 1 et raccourcit la liste : on atteint forcément `i = 1` ou `[]`.</p>' },
      { t: 'Le code et la réponse de Caml', html: R('td-listes-1-4') +
        '<p>`nth 1 []` donne `Failure` et non `Invalid_argument` : le rang 1 est valide, c’est la liste qui est trop courte.</p>' },
      { t: 'Lien avec les sujets', html: '<p>C’est le schéma de `remove_nth i list` (partiel oct. 2019, ex. 3, 5 points), de `insert_nth x i list` (2018 et 2020) et de `remove_interval` (2021) : test du rang dans le chapeau (`Invalid_argument`), `Failure` sur `[]` dans la fonction récursive.</p>' }],
    answer: A(R('td-listes-1-4', '0')),
    traps: [
      'Tester `i <= 0` à chaque appel récursif : le test ne sert qu’au premier appel. C’est le rôle de la fonction chapeau.',
      'Compter à partir de 0 : le premier élément est au rang 1.',
      'Écrire `invalid_arg` pour la liste trop courte, ou l’inverse : `Invalid_argument` pour un paramètre invalide, `Failure` quand le calcul échoue.',
      'Écrire `nth -1 lst` : Caml lit une soustraction. Il faut `nth (-1) lst`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-1-5', exam: null, kind: 'td', order: 3015, src: 'TD listes · Ex 1.5',
    title: 'Maximum d’une liste', topics: ['listes', 'exceptions'], lvl: 2, time: 8,
    intro: '<p>Écrire une fonction qui retourne la valeur maximum d’une liste.</p>',
    hints: [
      'La liste vide n’a pas de maximum : il faut une exception.',
      'Le maximum d’une liste d’un seul élément est cet élément : c’est un cas d’arrêt à part, `[e]`.',
      'Pour `e :: l`, calcule le maximum de `l` <strong>une seule fois</strong> (`let m = … in`), puis compare-le à `e`.'],
    solution: [
      { t: 'Spécification', html: '<p>`maximum lst` rend le plus grand élément de `lst`. Type : `\'a list -> \'a` (la comparaison `>` marche sur tous les types de base). Liste vide : `Failure` (choix : le TD ne dit rien).</p>' },
      { t: 'Principe et cas', html: '<ul><li>`[]` : `failwith`, la liste vide n’a pas de maximum.</li><li>`[e]` : `e`.</li><li>`e :: l` (au moins deux éléments) : `m`, le maximum de `l`, est calculé une fois ; on rend le plus grand de `e` et `m`.</li></ul>' +
        '<p>Le cas `[e]` doit venir avant `e :: l` : les motifs sont essayés dans l’ordre.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Sur des entiers, des chaînes, une liste d’un élément et la liste vide :</p>' + R('td-listes-1-5') },
      { t: 'Deux erreurs dans une version courante', html: R('td-listes-1-5b') +
        '<ul><li>`[] -> 0` : sur une liste de négatifs, le résultat 0 n’est même pas dans la liste. Et le 0 fige le type en `int list -> int`.</li>' +
        '<li>`maximum l` est écrit deux fois : chaque niveau peut lancer deux appels. Sur `[1; 2; …; 20]`, cela fait 1 048 575 appels (2²⁰ − 1), contre 20 avec `let m = maximum l in`.</li></ul>' }],
    answer: A(R('td-listes-1-5', '0')),
    traps: [
      'Rendre 0 (ou un autre nombre) pour la liste vide : faux pour une liste de négatifs, et le type n’est plus polymorphe.',
      'Écrire deux fois l’appel récursif : le temps double à chaque élément.',
      'Utiliser `max` : c’est une fonction prédéfinie, interdite à l’examen sauf indication.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-1-6', exam: null, kind: 'td', order: 3016, src: 'TD listes · Ex 1.6 (bonus)',
    title: 'Second : le deuxième plus petit élément', topics: ['listes', 'exceptions', 'accumulateur'], lvl: 3, time: 15, also: ['p2019d-ex4'],
    intro: '<p>Écrire une fonction qui retourne le deuxième plus petit élément d’une liste s’il existe.</p><p>Exemples d’application :</p>' +
      ex(['# second [1; 3; 4; 2] ;;', '- : int = 2', '# second [3.5; 8.2; 9.5; 4.0];;', '- : float = 4.0', "# second ['a'];;", 'Exception: Failure "second: Not enough values"']) +
      '<p><em>C’est la fonction `mystery` du contrôle d’avril 2019 (S1#, ex. 4, 2 points), à lire et évaluer.</em></p>',
    hints: [
      'Parcours la liste une seule fois en gardant deux valeurs : la plus petite vue jusqu’ici et la deuxième plus petite.',
      'Ces deux valeurs sont des paramètres supplémentaires d’une fonction auxiliaire. Pour les initialiser, il faut les deux premiers éléments : moins de deux éléments, c’est l’exception.',
      'Pour chaque nouvel élément `e` : trois cas selon sa place par rapport aux deux valeurs gardées.'],
    solution: [
      { t: 'Spécification', html: '<p>`second lst` rend le deuxième plus petit élément de `lst`. Moins de deux éléments : `Failure "second: Not enough values"` (message des exemples). Type : `\'a list -> \'a`.</p>' },
      { t: 'Principe : deux paramètres supplémentaires', html: '<p>`aux m1 m2 lst` parcourt `lst` en gardant `m1 ≤ m2`, les deux plus petits éléments vus :</p>' +
        '<ul><li>`[]` : la réponse est `m2`.</li><li>`e < m1` : `e` devient le plus petit, l’ancien `m1` passe deuxième.</li><li>sinon, `e < m2` : `e` devient le deuxième.</li><li>sinon : rien ne change.</li></ul>' +
        '<p>La fonction chapeau filtre `e1 :: e2 :: l` : elle range les deux premiers éléments dans l’ordre et lance `aux`. Tout autre cas (liste vide ou d’un élément) déclenche l’exception.</p>' },
      { t: 'Le code et la réponse de Caml', html: R('td-listes-1-6') +
        '<p class="sol-note">Coquille du TD : il écrit `- : float = 4.0`, Caml affiche `4.`. Avec des doublons, `second [5; 5]` rend 5 : le TD ne demande pas « strictement » plus grand.</p>' },
      { t: 'Le Mystery de 2019', html: '<p>Le sujet d’avril 2019 donnait cette fonction sous le nom `mystery`, sans le cas d’une liste d’un élément : `mystery [\'a\']` déclenchait `Match_failure`, et Caml affichait un `Warning 8` à la définition. Réponse attendue : « la fonction retourne le deuxième plus petit élément de la liste s’il existe ».</p>' }],
    answer: A(R('td-listes-1-6', '0')),
    traps: [
      'Trier la liste d’abord : bien plus long à écrire, et sans fonction prédéfinie il faut écrire le tri.',
      'Initialiser `m1` et `m2` à 0 : faux si tous les éléments sont plus grands, et le type n’est plus polymorphe.',
      'Oublier la liste d’un seul élément : `Match_failure` au lieu de l’exception demandée.',
      'Recopier `4.0` dans la réponse de Caml : Caml écrit `4.`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-2-1', exam: null, kind: 'td', order: 3021, src: 'TD listes · Ex 2.1',
    title: 'Liste arithmétique', topics: ['listes', 'accumulateur'], lvl: 2, time: 8,
    intro: '<p>Écrire la fonction `arith_list n a1 r` qui construit la liste des n premiers termes de la suite arithmétique de premier terme `a1` et de raison `r`.</p><p>Exemples d’applications :</p>' +
      ex(['# arith_list 12 2 1;;', '- : int list = [2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13]', '# arith_list 11 0 3;;', '- : int list = [0; 3; 6; 9; 12; 15; 18; 21; 24; 27; 30]']),
    hints: [
      'Le résultat est une liste : on la construit avec `::`, le premier terme en tête.',
      'Une fonction récursive à deux paramètres : le nombre de termes qu’il reste à produire, et le terme courant. Elle s’arrête quand il ne reste plus rien à produire.',
      'Et si `n` est négatif ? Teste-le une fois dans une fonction chapeau.'],
    solution: [
      { t: 'Spécification', html: '<p>`arith_list n a1 r` rend `[a1; a1 + r; a1 + 2r; …]` (n termes). Type : `int -> int -> int -> int list`. `n = 0` : la liste vide. `n < 0` : `Invalid_argument` (choix, le TD ne dit rien).</p>' },
      { t: 'Principe et cas', html: '<p>`build n a` construit les `n` termes à partir du terme courant `a` :</p><ul><li>`n = 0` : `[]`.</li><li>sinon : `a` en tête, suivi des `n − 1` termes à partir de `a + r`.</li></ul>' +
        '<p>`r` ne change pas : `build` le prend dans le chapeau, sans le passer en paramètre.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Les deux exemples du TD, une raison négative, puis n = 0 et n &lt; 0 :</p>' + R('td-listes-2-1') }],
    answer: A(R('td-listes-2-1', '0')),
    traps: [
      'Ajouter chaque terme en fin de liste avec `@` : le résultat est juste mais chaque ajout recopie toute la liste.',
      'Oublier le cas `n < 0` sans chapeau : `n` ne passe jamais par 0 et la récursion ne s’arrête pas (`Stack overflow`).',
      'Rendre un terme de trop ou de moins : vérifie la longueur sur le premier exemple (12 termes, de 2 à 13).'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-2-2', exam: null, kind: 'td', order: 3022, src: 'TD listes · Ex 2.2',
    title: 'Concaténation : append', topics: ['listes', 'deux-listes'], lvl: 1, time: 6,
    intro: '<p>Écrire une fonction qui concatène deux listes (l’équivalent de l’opérateur `@`).</p><p>Exemples d’applications :</p>' +
      ex(['# append [3;1;2] [8;4];;', '- : int list = [3; 1; 2; 8; 4]', '# append [] [9;7;8];;', '- : int list = [9; 7; 8]']),
    hints: [
      'Deux listes, mais une seule est parcourue. Laquelle ?',
      'La seconde liste est recopiée telle quelle à la fin : elle sert de cas d’arrêt.',
      'Pour `e :: l` (la première liste), `e` reste en tête du résultat.'],
    solution: [
      { t: 'Spécification', html: '<p>`append l1 l2` rend les éléments de `l1` suivis de ceux de `l2`. Type : `\'a list -> \'a list -> \'a list`.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`l1 = []` : le résultat est `l2`.</li><li>`l1 = e :: l` : `e` en tête, suivi de `append l l2`.</li></ul>' +
        '<p>On ne filtre que `l1` : pas besoin des quatre cas de deux listes, `l2` n’est jamais décomposée. Coût : la longueur de `l1`.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Les deux exemples du TD et une seconde liste vide :</p>' + R('td-listes-2-2') },
      { t: '`::` ou `@`', html: '<p>`::` ajoute <strong>un élément</strong> en tête d’une liste ; `append` (comme `@`) colle <strong>deux listes</strong>. Le second paramètre doit donc être une liste :</p>' + R('td-listes-2-2b', '1-3') }],
    answer: A(R('td-listes-2-2', '0')),
    traps: [
      'Décomposer les deux listes : inutile, et on risque d’en perdre des éléments.',
      'Écrire `l1 :: l2` pour concaténer : `::` attend un élément à gauche, pas une liste.',
      'Utiliser `@` dans la réponse : l’exercice demande justement de l’écrire.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-3-1', exam: null, kind: 'td', order: 3031, src: 'TD listes · Ex 3.1',
    title: 'Croissance ? Liste triée en ordre croissant', topics: ['listes', 'listes-triees'], lvl: 2, time: 8,
    intro: '<p>Écrire une fonction qui teste si une liste est triée en ordre croissant.</p>',
    hints: [
      'Regarder la tête seule ne suffit pas : il faut comparer deux éléments voisins. Le motif `e1 :: e2 :: l` les donne.',
      'Il y a donc trois cas : liste vide, un seul élément, au moins deux éléments.',
      'Après avoir comparé `e1` et `e2`, sur quelle liste rappeler la fonction pour comparer `e2` à l’élément suivant ?'],
    solution: [
      { t: 'Spécification', html: '<p>`is_increasing lst` rend `true` si chaque élément est inférieur ou égal au suivant. Type : `\'a list -> bool`. Les listes vides et d’un élément sont triées.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`[]` ou `[_]` : `true`.</li><li>`e1 :: e2 :: l` : `e1 <= e2`, et la suite `e2 :: l` doit être croissante.</li></ul>' +
        '<p>`&&` arrête le parcours au premier couple mal rangé : s’arrêter dès que la réponse est connue.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Avec des doublons, une liste mal rangée, des caractères, la liste vide et un seul élément :</p>' + R('td-listes-3-1') },
      { t: 'L’erreur classique : rappeler sur `l`', html: R('td-listes-3-1b') +
        '<p>En rappelant sur `l`, on ne compare jamais `e2` (3) avec l’élément suivant (2) : la réponse est fausse. Et sans le cas d’un seul élément, Caml prévient : `Warning 8`.</p>' }],
    answer: A(R('td-listes-3-1', '0')),
    traps: [
      'Rappeler sur `l` au lieu de `e2 :: l` : un couple de voisins sur deux n’est jamais comparé.',
      'Oublier la liste d’un élément : `Warning 8`, puis `Match_failure` à l’exécution.',
      'Écrire `<` au lieu de `<=` : `[1; 2; 2; 5]` serait refusée alors qu’elle est croissante.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-3-2', exam: null, kind: 'td', order: 3032, src: 'TD listes · Ex 3.2',
    title: 'Suppression dans une liste triée', topics: ['listes', 'listes-triees'], lvl: 2, time: 8, also: ['p2020-ex2'],
    intro: '<p>Écrire une fonction qui supprime d’une liste `lst` triée (en ordre croissant) la première occurrence d’un élément `x` (s’il est présent).</p>' +
      '<p><em>Même exercice au partiel de nov. 2020 (ex. 2, 4 points) : « Écrire la fonction `delete x list` qui supprime de la liste `list` triée en ordre croissant la première occurrence de la valeur `x` (si elle est présente). »</em></p>',
    hints: [
      'Seule la première occurrence part : une fois `x` trouvé, le reste de la liste est rendu tel quel.',
      'La liste est triée : si la tête est déjà plus grande que `x`, `x` n’est pas plus loin. On peut s’arrêter.',
      'Trois cas pour `e :: l` : `e = x`, `e > x`, `e < x`. Un seul continue la récursion.'],
    solution: [
      { t: 'Spécification', html: '<p>`delete x lst` rend `lst` sans la première occurrence de `x` ; si `x` est absent, `lst` inchangée. Type : `\'a -> \'a list -> \'a list`.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`[]` : `[]` (rien à supprimer).</li><li>`e = x` : on rend `l`, la suite sans `e` : fini.</li>' +
        '<li>`e > x` : `x` est absent (la liste est croissante), on rend la liste entière `e :: l` : fini.</li><li>`e < x` : on garde `e` et on continue dans `l`.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: R('td-listes-3-2') +
        '<p>`delete 0 [1; 2; 3]` s’arrête au premier élément (1 &gt; 0) : la suite n’est pas parcourue.</p>' },
      { t: 'Le corrigé officiel de 2020', html: '<p>Même idée, écrite avec des motifs gardés :</p>' + R('td-listes-3-2b') }],
    answer: A(R('td-listes-3-2', '0')),
    traps: [
      'Supprimer toutes les occurrences : `delete 4 [1; 2; 2; 3; 4; 4; 4; 5]` doit garder deux 4.',
      'Écrire `e > x -> l` : on perd `e`. La liste rendue est `e :: l`.',
      'Ne pas s’arrêter quand `e > x` : le résultat est juste, mais le sujet attend l’arrêt anticipé que permet le tri.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-3-3', exam: null, kind: 'td', order: 3033, src: 'TD listes · Ex 3.3',
    title: 'Insertion à la ième place : insert_nth', topics: ['listes', 'exceptions'], lvl: 2, time: 12, also: ['p2018-ex4'],
    intro: '<p>Écrire la fonction `insert_nth x i lst` qui insère la valeur `x` à la ième place dans la liste `lst`. La fonction devra déclencher une exception `Invalid_argument` si `i` est négatif ou nul, ou une exception `Failure` si la liste est trop courte.</p><p>Exemples d’applications :</p>' +
      ex(['# insert_nth 0 5 [1; 2; 3; 4; 5; 6; 7; 8; 9];;', '- : int list = [1; 2; 3; 4; 0; 5; 6; 7; 8; 9]', '# insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9];;', '- : int list = [1; 2; 3; 4; 5; 6; 7; 8; 9; 0]',
        '# insert_nth 0 12 [1; 2; 3; 4; 5; 6; 7; 8; 9];;', 'Exception: Failure "out of bound".', '# insert_nth 0 (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9];;', 'Exception: Invalid_arg "negative rank".']) +
      '<p><em>Mot pour mot l’exercice 4 du partiel d’oct. 2018 et l’exercice 3 du partiel de nov. 2020 (5 points chacun), mêmes exemples.</em></p>',
    hints: [
      'Le rang se teste une fois, dans une fonction chapeau : `Invalid_argument` si `i ≤ 0`.',
      'Regarde le deuxième exemple : insérer au rang 10 dans une liste de 9 éléments est permis (ajout à la fin). Le cas « rang atteint » doit donc passer avant le cas `[]`.',
      'Rang atteint (`i = 1`) : `x` se place devant la liste restante, quelle qu’elle soit, même vide.'],
    solution: [
      { t: 'Spécification', html: '<p>`insert_nth x i lst` rend `lst` avec `x` au rang `i` (les éléments suivants sont décalés). Type : `\'a -> int -> \'a list -> \'a list`.</p>' +
        '<ul><li>`i ≤ 0` : `Invalid_argument "negative rank"`.</li><li>`i` &gt; longueur + 1 : `Failure "out of bound"`. Le rang longueur + 1 est valide : c’est l’ajout en fin.</li></ul>' +
        '<p class="sol-note">Coquille du TD (et des sujets 2018 et 2020) : `Invalid_arg` n’existe pas, Caml affiche `Invalid_argument "negative rank"`.</p>' },
      { t: 'Principe et cas', html: '<p>Chapeau : test de `i`. Fonction récursive `insert i lst`, avec `i ≥ 1` :</p>' +
        '<ul><li>`i = 1` : `x :: lst`, quelle que soit `lst`.</li><li>`[]` avec `i > 1` : la liste est trop courte, `failwith`.</li><li>`e :: l` : on garde `e`, et `x` va au rang `i − 1` de `l`.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: R('td-listes-3-3') +
        '<p>Le motif gardé `l when i = 1` est placé avant `[]` : il attrape aussi la liste vide.</p>' },
      { t: 'L’ordre des cas compte', html: '<p>Si on teste `[]` d’abord (ici dans la version avec `if`), l’ajout en fin devient impossible :</p>' + R('td-listes-3-3b') +
        '<p>Le corrigé officiel de 2018 filtre le couple `(i, list)` avec `(1, list)` avant `(_, [])` :</p>' + R('td-listes-3-3c') }],
    answer: A(R('td-listes-3-3', '0')),
    traps: [
      'Traiter `[]` avant le cas `i = 1` : l’insertion en fin de liste (rang longueur + 1) déclenche `Failure`.',
      'Recopier `Invalid_arg` de l’énoncé : le constructeur est `Invalid_argument`, et la fonction s’appelle `invalid_arg`.',
      'Tester `i <= 0` dans la fonction récursive : le test est refait à chaque appel. Il se fait une fois, dans la fonction chapeau.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-3-4', exam: null, kind: 'td', order: 3034, src: 'TD listes · Ex 3.4',
    title: 'Suppression des doublons : remove_duplicates', topics: ['listes'], lvl: 2, time: 12, also: ['p2023-ex2'],
    intro: '<p>Écrire la fonction `remove_duplicates lst` qui prend en paramètre :</p><ul><li>une liste `lst`</li></ul><p>et qui supprime tous les doublons de la liste `lst`.</p>' +
      ex(['# remove_duplicates [3; 1; 2; 2; 3; 1; 4; 5; 5];;', '- : int list = [3; 1; 2; 4; 5]',
        '# remove_duplicates ["cherry"; "banana"; "apple"; "apple"; "banana"; "cherry"];;', '- : string list = ["cherry"; "banana"; "apple"]',
        '# remove_duplicates [42; 13; 42; 7; 7; 13; 42; 42];;', '- : int list = [42; 13; 7]',
        '# remove_duplicates ["dog"; "cat"; "dog"; "rat"; "rat"; "bat"];;', '- : string list = ["dog"; "cat"; "rat"; "bat"]',
        '# remove_duplicates [true; true; false; true; false; true; false];;', '- : bool list = [true; false]']) +
      '<p><em>Question 2 de l’examen d’oct. 2023 (ex. 2, 5,5 points), avec les mêmes exemples. Le sujet faisait d’abord écrire `remove_x x lst`, qui supprime toutes les occurrences de `x`, et imposait de l’utiliser.</em></p>',
    hints: [
      'Regarde les exemples : quelle occurrence est gardée, la première ou la dernière ?',
      'On garde la tête `e`. Ses copies plus loin dans la liste doivent disparaître avant de continuer : écris d’abord une fonction qui retire toutes les occurrences d’une valeur.',
      'Une fonction auxiliaire se documente : une phrase qui dit ce qu’elle fait.'],
    solution: [
      { t: 'Spécification', html: '<p>`remove_duplicates lst` rend `lst` où chaque valeur n’apparaît qu’une fois, à la place de sa <strong>première</strong> occurrence (les exemples le montrent : `[3; 1; 2; 4; 5]`). Type : `\'a list -> \'a list`, les exemples mêlent entiers, chaînes et booléens.</p>' },
      { t: 'Principe et cas', html: '<p>Fonction auxiliaire : `remove_x x lst` supprime toutes les occurrences de `x` dans `lst` (parcours complet). Puis :</p>' +
        '<ul><li>`[]` : `[]`.</li><li>`e :: l` : on garde `e` en tête, on retire toutes ses copies de `l`, et on recommence sur ce qui reste.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Les cinq exemples du TD, puis la liste vide :</p>' + R('td-listes-3-4') },
      { t: 'Une version qui garde la dernière occurrence', html: '<p>Supprimer `e` quand il réapparaît plus loin est aussi un « sans doublon », mais l’ordre ne respecte plus les exemples :</p>' + R('td-listes-3-4b', '1-2') +
        '<p>À l’examen, ta fonction doit donner exactement les résultats des exemples.</p>' }],
    answer: A(R('td-listes-3-4', '0-1')),
    traps: [
      'Garder la dernière occurrence au lieu de la première : `[2; 3; 1; 4; 5]` au lieu de `[3; 1; 2; 4; 5]`.',
      'Ne retirer que les doublons voisins : ce n’est vrai que pour une liste triée.',
      'Oublier de rappeler `remove_duplicates` sur la liste nettoyée : les autres valeurs gardent leurs doublons.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-3-5', exam: null, kind: 'td', order: 3035, src: 'TD listes · Ex 3.5',
    title: 'Inverse : avec @, puis avec un accumulateur', topics: ['listes', 'accumulateur'], lvl: 2, time: 12,
    intro: '<p>Écrire une fonction qui inverse une liste :</p>',
    questions: ['<b>1.</b> en utilisant l’opérateur `@` ;', '<b>2.</b> sans utiliser l’opérateur `@`.', 'Que pensez-vous de la complexité de ces deux fonctions ?'],
    hints: [
      'Avec `@` : l’inverse de `e :: l` est l’inverse de `l`, suivi de `e`. Attention, `@` colle deux listes.',
      'Sans `@` : parcours la liste en empilant chaque élément en tête d’une liste résultat, passée en paramètre (un accumulateur). Le premier élément lu finit au fond.',
      'Complexité : combien d’éléments `l1 @ l2` recopie-t-il ? Additionne sur tous les appels.'],
    solution: [
      { t: 'Version 1 : avec `@`', html: '<ul><li>`[]` : `[]`.</li><li>`e :: l` : `reverse l @ [e]` (`[e]` est la liste d’un élément).</li></ul>' + R('td-listes-3-5', '0-1') },
      { t: 'Version 2 : avec un accumulateur', html: '<p>`rev acc lst` : `acc` contient les éléments déjà lus, le dernier lu en tête.</p>' +
        '<ul><li>`[]` : tout est lu, `acc` est la liste inversée.</li><li>`e :: l` : `e` passe en tête de `acc`, on continue sur `l`.</li></ul>' +
        '<p>La fonction chapeau `reverse2` lance `rev` avec l’accumulateur vide.</p>' + R('td-listes-3-5', '2-5') },
      { t: 'Complexité', html: '<p>`l1 @ l2` recopie toute la liste `l1`. Dans la version 1, chaque niveau recopie la liste déjà inversée : 0 + 1 + … + (n − 1) = n(n − 1)/2 recopies pour n éléments. Le coût est <strong>quadratique</strong> : environ 200 millions de recopies pour 20 000 éléments.</p>' +
        '<p>La version 2 fait un seul `::` par élément : coût <strong>linéaire</strong> (n étapes). C’est le cas d’école de l’accumulateur.</p>' }],
    answer: A(R('td-listes-3-5', '0,2')),
    traps: [
      'Écrire `reverse l @ e` : `@` attend deux listes, il faut `[e]`.',
      'Écrire `[e] @ reverse l` : la liste n’est pas inversée, elle est recopiée dans le même ordre.',
      'Oublier la fonction chapeau : l’utilisateur devrait passer `[]` lui-même.',
      'Croire que l’accumulateur est toujours mieux : il renverse l’ordre, ce qui est voulu ici mais faux dans beaucoup d’exercices.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-3-6', exam: null, kind: 'td', order: 3036, src: 'TD listes · Ex 3.6',
    title: 'Positif : moins de k entiers positifs', topics: ['listes', 'exceptions', 'listes-triees'], lvl: 3, time: 15, near: ['p2022-ex4'],
    questions: [
      '<b>1.</b> Écrire la fonction `count_positive lst k` qui prend en paramètre :<ul><li>une liste `lst`</li><li>un entier `k`</li></ul>et qui renvoie `true` si la list `lst` contient strictement moins de `k` entiers positifs, `false` sinon. 0 n’est pas considéré comme positif. La fonction devra déclencher une exception `Invalid_argument` si `k` est négatif ou nul ou si `lst` est vide.<p>Exemples d’application :</p>' +
        ex(['# count_positive [] 42;;', 'Exception: Invalid_argument "count_positive: k <= 0 or empty list".', '# count_positive [8; 12; -2; 6; 0] 4;;', '- : bool = true', '# count_positive [8; 12; -2; 6; 0] 3;;', '- : bool = false']),
      '<b>2.</b> La liste `lst` est maintenant supposée triée. Réécrire la fonction précédente.'],
    hints: [
      'Les deux conditions de l’exception se testent une fois, dans une fonction chapeau.',
      'Dans la fonction récursive, fais baisser `k` à chaque positif rencontré. Dès que le k-ième positif est trouvé, la réponse est `false` : inutile d’aller plus loin.',
      'Question 2 : dans une liste triée en ordre croissant, les positifs sont tous à la fin. Une fois passés les éléments ≤ 0, il suffit de savoir s’il reste moins de `k` éléments.'],
    solution: [
      { t: 'Spécification', html: '<p>`count_positive lst k` rend `true` si `lst` contient strictement moins de `k` entiers &gt; 0. `k ≤ 0` ou `lst = []` : `Invalid_argument "count_positive: k <= 0 or empty list"` (message des exemples). Type : `int list -> int -> bool`.</p>' },
      { t: 'Question 1 : principe et cas', html: '<p>`less k lst` : « `lst` contient-elle moins de `k` positifs ? », avec `k ≥ 1` :</p>' +
        '<ul><li>`[]` : `true` (moins de `k ≥ 1` positifs : aucun).</li><li>`e > 0` : si `k = 1`, ce positif est le k-ième : `false`, on s’arrête. Sinon on cherche moins de `k − 1` positifs dans `l`. D’où `k > 1 && less (k-1) l`.</li><li>`e ≤ 0` : `less k l`.</li></ul>' +
        R('td-listes-3-6', '0-5') },
      { t: 'Question 2 : liste triée', html: '<p>`skip` passe les éléments ≤ 0. Au premier positif, tous les éléments restants sont positifs : on teste seulement s’il en reste moins de `k`, avec `shorter`, sans plus regarder les signes.</p>' + R('td-listes-3-6', '6-10') },
      { t: 'Lien avec les sujets', html: '<p>Le partiel d’oct. 2022 (ex. 4, 5 points) demandait `less2 p k l1 l2` : moins de `k` paires vérifiant un prédicat, avec la même exception sur `k` et le même arrêt `k <> 1 && …`.</p>' }],
    answer: A(R('td-listes-3-6', '0,6')),
    traps: [
      'Compter 0 comme positif : l’énoncé l’exclut.',
      'Compter tous les positifs puis comparer à `k` : juste, mais pas d’arrêt au k-ième positif.',
      'Tester `k` et la liste vide dans la fonction récursive : la liste devient vide à la fin de tout parcours, et l’exception partirait à tort.',
      'Question 2 : tester encore le signe de chaque élément après le premier positif.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-4-1', exam: null, kind: 'td', order: 3041, src: 'TD listes · Ex 4.1',
    title: 'Égalité de deux listes', topics: ['listes', 'deux-listes'], lvl: 1, time: 6,
    intro: '<p>Écrire une fonction qui teste si deux listes sont identiques.</p>',
    hints: [
      'Deux listes à parcourir en même temps : filtre le couple `(l1, l2)`.',
      'Quatre cas : les deux vides, la première seule vide, la seconde seule vide, les deux non vides.',
      'Deux listes non vides sont égales si leurs têtes sont égales et leurs suites aussi.'],
    solution: [
      { t: 'Spécification', html: '<p>`equals l1 l2` rend `true` si `l1` et `l2` ont les mêmes éléments dans le même ordre. Type : `\'a list -> \'a list -> bool`.</p>' },
      { t: 'Principe : les quatre cas', html: '<ul><li>`([], [])` : `true`.</li><li>`(e1 :: r1, e2 :: r2)` : `e1 = e2 && equals r1 r2` (arrêt à la première différence).</li><li>`([], _ :: _)` et `(_ :: _, [])` : longueurs différentes, `false`. Les deux sont regroupés dans `_`, placé en dernier.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Mêmes listes, longueurs différentes, éléments différents, deux listes vides :</p>' + R('td-listes-4-1') },
      { t: 'Si on oublie des cas', html: R('td-listes-4-1b') + '<p>Caml signale le cas manquant à la définition (`Warning 8`), puis échoue à l’exécution.</p>' }],
    answer: A(R('td-listes-4-1', '0')),
    traps: [
      'Oublier les cas de longueurs différentes : `Warning 8`, puis `Match_failure`.',
      'Placer `_ -> false` en premier : il attrape tout, les autres cas ne servent plus (`Warning 11`).',
      'Écrire simplement `l1 = l2` : juste en Caml, mais l’exercice demande la récursion.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-4-2', exam: null, kind: 'td', order: 3042, src: 'TD listes · Ex 4.2',
    title: 'Communs : éléments communs à deux listes croissantes', topics: ['listes', 'deux-listes', 'listes-triees'], lvl: 2, time: 12,
    intro: '<p>Soient deux listes d’éléments croissantes. Écrire une fonction qui construit la liste des éléments communs aux deux listes.</p><p>Exemples d’application :</p>' +
      ex(['# shared [1; 3; 6; 6; 8; 9] [2; 5; 6; 6; 8; 9] ;;', '- : int list = [6; 6; 8; 9]', '# shared [1; 2; 3] [3] ;;', '- : int list = [3]', '# shared [1; 6; 6; 7; 7; 7; 7; 9] [2; 5; 6; 6; 6; 8; 9];;', '- : int list = [6; 6; 9]']),
    hints: [
      'Si une des deux listes est vide, il n’y a plus rien en commun.',
      'Compare les deux têtes. Égales : c’est un élément commun. Différentes : la plus petite ne peut pas être dans l’autre liste (elle est croissante).',
      'Quand les têtes diffèrent, on n’avance que dans une liste : l’autre est passée <strong>entière</strong> à l’appel récursif.'],
    solution: [
      { t: 'Spécification', html: '<p>`shared l1 l2` (deux listes croissantes) rend la liste croissante des éléments communs ; un doublon est gardé autant de fois qu’il est dans les deux listes (`[6; 6; 9]` dans le troisième exemple). Type : `\'a list -> \'a list -> \'a list`.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`([], _)` ou `(_, [])` : `[]`.</li><li>`e1 = e2` : `e1` en tête, et on avance dans les deux listes.</li>' +
        '<li>`e1 < e2` : `e1` n’est pas dans `l2` (tous ses éléments sont ≥ `e2`), on avance dans `l1` : `shared r1 l2`.</li><li>sinon : on avance dans `l2` : `shared l1 r2`.</li></ul>' +
        '<p>Chaque appel retire au moins une tête : le coût est la somme des longueurs.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Les trois exemples du TD, puis une liste vide :</p>' + R('td-listes-4-2') }],
    answer: A(R('td-listes-4-2', '0')),
    traps: [
      'Rappeler sur `r1 r2` quand les têtes diffèrent : on perd la tête de l’autre liste, qui peut être commune plus loin.',
      'Chercher chaque élément de `l1` dans `l2` avec une recherche complète : on n’utilise pas l’ordre, et les doublons sont mal comptés.',
      'Oublier que les deux listes sont parcourues ensemble : filtre le couple `(l1, l2)`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-4-3', exam: null, kind: 'td', order: 3043, src: 'TD listes · Ex 4.3 (bonus)',
    title: 'Sublist : nombre d’apparitions d’une sous-liste', topics: ['listes', 'deux-listes', 'mystery'], lvl: 3, time: 15, also: ['p2019-ex5'],
    intro: '<p>Ecrire une fonction qui prend en paramètre deux listes `slst` et `lst` et qui retourne le nombre de fois où la liste `slst` est présente dans la liste `lst`.</p>' +
      ex(['# sublist [1; 2] [1; 2] ;;', '- : int = 1', '# sublist [1; 2] [1; 1; 2; 3; 3; 1; 2; 3] ;;', '- : int = 2', '# sublist [1; 2] [2; 1] ;;', '- : int = 0', '# sublist [] [1; 2];;', '- : int = 0']) +
      '<p><em>C’est le Mystery du partiel d’oct. 2019 (ex. 5, 2 points) : la fonction `mystery` du sujet calcule ce nombre, avec les trois premiers exemples.</em></p>',
    hints: [
      'Découpe le problème : d’abord une fonction qui dit si `slst` est un <strong>début</strong> (préfixe) d’une liste.',
      'Puis compte les positions de `lst` où `slst` commence : à chaque position, la liste qui reste est `e :: l`.',
      'Le dernier exemple : `sublist [] [1; 2]` vaut 0. Sans cas particulier, la liste vide serait un début de chaque position.'],
    solution: [
      { t: 'Spécification', html: '<p>`sublist slst lst` rend le nombre de positions de `lst` où commence une suite d’éléments consécutifs égale à `slst` ; 0 si `slst` est vide. Type : `\'a list -> \'a list -> int`.</p>' },
      { t: 'Principe', html: '<p>`prefix (a, b)` dit si `a` est un début de `b` : `([], _)` → `true` ; `(_, [])` → `false` ; deux têtes égales et `prefix` des suites.</p>' +
        '<p>`count lst` additionne 1 pour chaque position `e :: l` où `prefix (slst, e :: l)` est vrai. La fonction chapeau traite `slst = []` à part.</p>' },
      { t: 'Le code et la réponse de Caml', html: R('td-listes-4-3') +
        '<p>`sublist [1; 1] [1; 1; 1]` vaut 2 : deux apparitions qui se chevauchent sont comptées.</p>' },
      { t: 'Le Mystery de 2019', html: '<p>La fonction du sujet est la même sans le cas de la liste vide :</p>' + R('td-listes-4-3b') +
        '<p>Elle répond 2 pour `[]` : un corrigé du TD doit traiter la liste vide à part pour donner 0.</p>' }],
    answer: A(R('td-listes-4-3', '0')),
    traps: [
      'Oublier le cas `slst = []` : la réponse vaut alors la longueur de `lst`, pas 0.',
      'Après une apparition, sauter toute la sous-liste : les apparitions qui se chevauchent ne sont plus comptées.',
      'Comparer seulement les têtes : `prefix` doit comparer tous les éléments de `slst`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-5-1', exam: null, kind: 'td', order: 3051, src: 'TD listes · Ex 5.1',
    title: 'Association : assoc k lst', topics: ['listes', 'listes-triees', 'exceptions'], lvl: 2, time: 12, also: ['p2019d-ex3'],
    intro: '<p>Écrire la fonction `assoc k lst` où `lst` est une liste de couples (key, value) triés par clés (key) croissantes. Les clés sont des entiers naturels non nuls. Elle retourne la valeur (value) associée à la clé (key) `k`. Si `k` n’est pas valide ou si aucun couple n’a pour clé `k`, elle déclenche une exception.</p><p>Exemples d’applications :</p>' +
      ex(['# assoc 5 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;', '- : string = "five"', '# assoc 4 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;', 'Exception: Failure "not found".',
        '# assoc (-1) [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;', 'Exception: Invalid_argument "k not a natural".']) +
      '<p><em>Mot pour mot l’exercice 3 du contrôle de nov. 2017 (4 points) et du contrôle d’avril 2019 (S1#, 5 points), mêmes exemples.</em></p>',
    hints: [
      'Deux exceptions, comme dans les exemples : `k` invalide (`Invalid_argument`, testé une fois dans le chapeau) et clé absente (`Failure`).',
      'Les éléments de la liste sont des couples : le motif `(key, value) :: l` les ouvre directement.',
      'La liste est triée par clés croissantes : dès qu’une clé dépasse `k`, `k` n’est pas plus loin.'],
    solution: [
      { t: 'Spécification', html: '<p>`assoc k lst` rend la valeur associée à la clé `k`. `k ≤ 0` : `Invalid_argument "k not a natural"` (les clés sont des naturels non nuls). Clé absente : `Failure "not found"`. Type : `int -> (int * \'a) list -> \'a`.</p>' },
      { t: 'Principe et cas', html: '<p>Chapeau : test de `k`. Puis `search` parcourt la liste :</p>' +
        '<ul><li>`[]` : `failwith "not found"`.</li><li>`key = k` : `value`.</li><li>`key > k` : la clé est absente (liste triée), `failwith "not found"` sans aller plus loin.</li><li>sinon : `search l`.</li></ul>' +
        '<p>`k` ne change pas : `search` n’a que la liste en paramètre.</p>' },
      { t: 'Le code et la réponse de Caml', html: R('td-listes-5-1') +
        '<p>Le corrigé officiel d’avril 2019 a la même structure (il écrit `let rec assoc`, un `rec` inutile : seule `search` est récursive).</p>' }],
    answer: A(R('td-listes-5-1', '0')),
    traps: [
      'Tester `k` dans la fonction récursive : le test est refait à chaque élément.',
      'Oublier l’arrêt `key > k` : le résultat reste juste, mais le tri n’est pas utilisé (c’est noté).',
      'Rendre le couple au lieu de la valeur : le résultat doit être `"five"`, pas `(5, "five")`.',
      'Accepter `k = 0` : les clés sont non nulles, 0 n’est pas valide.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-5-2', exam: null, kind: 'td', order: 3052, src: 'TD listes · Ex 5.2',
    title: 'Aplatie : flatten', topics: ['listes'], lvl: 2, time: 8,
    intro: '<p>Écrire la fonction Caml `flatten` qui "aplatit" une liste de listes : toutes les sous-listes sont concaténées entre elles.</p><p>Exemples d’application :</p>' +
      ex(['# flatten [[1;2]; [3]; [4;5;6]];;', '- : int list = [1; 2; 3; 4; 5; 6]', "# flatten [[(1,'a'); (2,'b')]; [(3,'c'); (4,'d'); (5,'e')]; []];;", "- : (int * char) list = [(1, 'a'); (2, 'b'); (3, 'c'); (4, 'd'); (5, 'e')]"]),
    hints: [
      'Les éléments de la liste sont eux-mêmes des listes : le motif `l :: others` donne la première sous-liste `l`.',
      'Aplatir `l :: others`, c’est coller `l` devant l’aplatissement de `others`.',
      'Pour coller deux listes sans `@`, réutilise `append` (exercice 2.2).'],
    solution: [
      { t: 'Spécification', html: '<p>`flatten lst` rend la concaténation, dans l’ordre, des listes de `lst`. Type : `\'a list list -> \'a list`.</p>' },
      { t: 'Principe et cas', html: '<ul><li>`[]` : `[]`.</li><li>`l :: others` : `append l (flatten others)`.</li></ul><p>`append` est la fonction de l’exercice 2.2 : à l’examen, une fonction déjà écrite peut être réutilisée, et une fonction auxiliaire se documente.</p>' },
      { t: 'Le code et la réponse de Caml', html: '<p>Les deux exemples du TD, puis des sous-listes vides et la liste vide :</p>' + R('td-listes-5-2') },
      { t: 'Sans fonction auxiliaire', html: '<p>On peut aussi décomposer la première sous-liste dans le motif :</p>' + R('td-listes-5-2b') }],
    answer: A(R('td-listes-5-2', '0-1')),
    traps: [
      'Écrire `l :: flatten others` : on construit une liste de listes, pas une liste aplatie (erreur de type).',
      'Oublier les sous-listes vides : elles doivent disparaître sans erreur (deuxième exemple).',
      'Utiliser `@` alors que l’exercice 2.2 vient de l’écrire : préfère `append`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-6-1', exam: null, kind: 'td', order: 3061, src: 'TD listes · Ex 6.1',
    title: 'PGCD par décomposition en facteurs premiers', topics: ['listes', 'listes-triees', 'deux-listes'], lvl: 3, time: 20,
    intro: '<p>Le pgcd de deux entiers `u` et `v` peut se calculer de la manière suivante :</p><ul><li>en décomposant les nombres `u` et `v` en facteurs premiers,</li><li>puis en calculant le produit des facteurs communs.</li></ul>' +
      '<p>Ecrire la fonction `gcd` (Greatest Common Divisor) qui calcule le pgcd de deux entiers en calculant le produit de leurs facteurs communs.</p><p>Exemples d’application :</p>' +
      ex(['# gcd 45 150;;', '- : int = 15', '# gcd 7 100;;', '- : int = 1']),
    hints: [
      'Trois sous-problèmes : la liste des facteurs premiers d’un entier, les facteurs communs à deux listes, le produit d’une liste. Les deux derniers sont déjà écrits (exercices 4.2 et 1.1).',
      'Décomposition : essaie les diviseurs `d` à partir de 2. Si `d` divise `n`, garde `d` et continue avec `n / d` (le même `d` peut revenir). Sinon, passe à `d + 1`.',
      'Les facteurs sortent dans l’ordre croissant : `shared` peut s’en servir directement.'],
    solution: [
      { t: 'Spécification', html: '<p>`gcd u v` rend le pgcd de deux entiers strictement positifs. Type : `int -> int -> int`. `u ≤ 0` ou `v ≤ 0` : `Invalid_argument` (choix).</p>' },
      { t: 'Décomposer en facteurs premiers', html: '<p>`factors d n` (avec `d` le diviseur essayé) :</p><ul><li>`n = 1` : `[]`, tout est décomposé.</li><li>`d` divise `n` : `d :: factors d (n / d)`.</li><li>sinon : `factors (d + 1) n`.</li></ul>' +
        '<p>Un `d` qui divise `n` est forcément premier : ses propres facteurs, plus petits, ont déjà été retirés. Le chapeau `prime_factors` lance `factors 2 n`.</p>' },
      { t: 'Assembler', html: '<p>`gcd u v = product (shared (prime_factors u) (prime_factors v))` : `shared` (ex. 4.2) garde les facteurs communs avec leurs répétitions, `product` (ex. 1.1) les multiplie, et vaut 1 si aucun facteur n’est commun.</p>' + R('td-listes-6-1') }],
    answer: A(R('td-listes-6-1', '0-2,6')),
    traps: [
      'Avancer `d` même quand il divise `n` : un facteur répété (5 × 5 dans 150) ne serait compté qu’une fois.',
      'Rendre 0 comme produit de la liste vide : `gcd 7 100` doit valoir 1.',
      'Intersecter avec une recherche simple : les répétitions (2 × 2…) seraient mal comptées. `shared` sur des listes triées les compte juste.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-listes-6-2', exam: null, kind: 'td', order: 3062, src: 'TD listes · Ex 6.2 (bonus)',
    title: 'Suite « look and say »', topics: ['listes'], lvl: 3, time: 20,
    intro: '<p>Soit la suite suivante :</p>' + ml(['ligne 0 : 1          contient 1 "1"', 'ligne 1 : 11         contient 2 "1"', 'ligne 2 : 21         contient 1 "2" suivi de 1 "1"', 'ligne 3 : 1211       contient 1 "1" suivi de 1 "2" suivi de 2 "1"', 'ligne 4 : 111221     ...', 'ligne 5 : 312211', 'ligne 6 : 13112221', '...']) +
      '<p>Écrire une fonction `sequence` qui retourne la nème ligne de cette suite, sous forme d’une liste d’entiers.</p><p>Exemples d’applications :</p>' +
      ex(['# sequence 5 ;;', '- : int list = [3; 1; 2; 2; 1; 1]', '# sequence 0 ;;', '- : int list = [1]']),
    hints: [
      'Sépare le problème : une fonction `next` qui calcule la ligne suivante d’une ligne donnée, puis `sequence n` qui l’applique n fois à `[1]`.',
      'Pour `next` : lis la tête `e`, puis compte combien de fois `e` se répète au début de la suite. Ce compte est un paramètre supplémentaire.',
      'Quand la répétition s’arrête, écris le compte puis `e`, et recommence `next` sur ce qui reste.'],
    solution: [
      { t: 'Spécification', html: '<p>`sequence n` rend la ligne n (n ≥ 0) ; `next line` rend la ligne qui décrit `line`. Types : `int -> int list` et `int list -> int list`. `n < 0` : `Invalid_argument` (choix).</p>' },
      { t: 'La ligne suivante', html: '<p>`next (e :: l)` lance `run 1 l` : `run n r` sait que `e` a déjà été vu `n` fois.</p>' +
        '<ul><li>`r` commence par `e` : `run (n+1)` sur la suite.</li><li>sinon : la répétition est finie, on écrit `n :: e ::`, suivi de `next r`.</li></ul>' + R('td-listes-6-2', '0-1') },
      { t: 'La nème ligne', html: '<p>`sequence 0 = [1]` et `sequence n = next (sequence (n-1))` :</p>' + R('td-listes-6-2', '2-5') +
        '<p>`sequence 6` donne bien la ligne 6 de l’énoncé, 13112221.</p>' }],
    answer: A(R('td-listes-6-2', '0,2')),
    traps: [
      'Écrire `e` puis le compte : la ligne se lit « un 1, deux 2… », le compte vient d’abord.',
      'Compter toutes les occurrences de `e` dans la ligne au lieu des répétitions consécutives : 1211 contient trois 1, mais en deux groupes.',
      'Oublier le cas de base `sequence 0 = [1]`.'],
    official: false, note: NOTE
  });

  /* =====================================================================
     TD ordre supérieur (05, « td Caml 2 – Octobre 2026 ») : toutes les fonctions sont écrites à la main
     ===================================================================== */
  add({
    id: 'td-os-1-1', exam: null, kind: 'td', order: 4011, src: 'TD ordre supérieur · Ex 1.1',
    title: 'Try those examples : une fonction est une valeur', topics: ['ordre-superieur', 'evaluation'], lvl: 1, time: 8,
    intro: '<p>Évalue chaque phrase, dans l’ordre, avant de regarder la réponse de Caml (tape ta réponse : type et valeur).</p>' + R('td-os-1-1', null, { mode: 'guess', title: 'Try those examples' }),
    hints: [
      '`function x -> x + 1` est une valeur comme une autre : une fonction sans nom. On peut la nommer avec `let`, ou l’appliquer directement.',
      '`times` attend un premier entier et rend… une fonction qui attend le second. Que vaut `times 2` ?',
      '`double_fun f x = double (f x)` : `f` est un paramètre qui doit être une fonction. Son type se déduit de l’usage : son résultat est passé à `double`.'],
    solution: [
      { t: 'Fonctions anonymes', html: '<p>`let succ = function x -> x + 1` est la même définition que `let succ x = x + 1` : `val succ : int -> int = <fun>`. `(function x -> x + 1) 5` applique la fonction sans la nommer : 6.</p>' },
      { t: 'Plusieurs paramètres = une fonction qui rend une fonction', html: '<p>`times` est `function x -> function y -> x * y` : appliquée à `x`, elle rend `function y -> x * y`. Son type `int -> int -> int` se lit `int -> (int -> int)`.</p>' +
        '<p>`let double = times 2` est une <strong>application partielle</strong> : il manque un paramètre, le résultat est une fonction `int -> int`. `double 15` vaut 30.</p>' },
      { t: 'Une fonction en paramètre', html: '<p>`double_fun f x = double (f x)` : `f` est appliquée à `x`, et son résultat est doublé, donc c’est un `int`. Le type de `x` n’est pas contraint : `\'a`. D’où `(\'a -> int) -> \'a -> int`.</p>' +
        '<ul><li>`double_fun succ 2` = `double (succ 2)` = 6.</li><li>`double_fun (function x -> x + 1)` : il manque `x`, le résultat est une fonction `int -> int`.</li><li>`double_succ = double_fun succ` : même chose, nommée ; `double_succ 2` vaut 6.</li></ul>' }],
    answer: AE(R('td-os-1-1')),
    traps: [
      'Répondre une valeur pour `double_fun (function x -> x + 1)` : il manque un paramètre, c’est une fonction (`- : int -> int = <fun>`).',
      'Écrire `function x y -> …` : `function` n’a qu’un paramètre. Il faut `function x -> function y -> …`.',
      'Oublier la ligne `val … = <fun>` d’une définition : elle fait partie de la réponse de Caml.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-1-2', exam: null, kind: 'td', order: 4012, src: 'TD ordre supérieur · Ex 1.2',
    title: 'Sigma : généraliser une somme', topics: ['ordre-superieur', 'recursivite'], lvl: 1, time: 10,
    questions: [
      '<b>1.</b> Écrire une fonction qui calcule la somme suivante (sans utiliser la multiplication…) : Σ<sub>i=0</sub><sup>n</sup> i',
      '<b>2.</b> Écrire une fonction qui calcule la somme des carrés suivante : Σ<sub>i=0</sub><sup>n</sup> i²',
      '<b>3.</b> À l’aide d’une fonction d’ordre supérieur, nous pouvons généraliser le calcul d’une somme à n’importe quelle fonction. Écrire une fonction qui calcule, pour toute fonction f : Σ<sub>i=0</sub><sup>n</sup> f(i)'],
    hints: [
      'Σ<sub>i=0</sub><sup>n</sup> i = n + Σ<sub>i=0</sub><sup>n−1</sup> i : la récursion porte sur `n`, et s’arrête à 0.',
      'Questions 1 et 2 : seul le terme ajouté change (`n`, puis `n * n`). C’est lui qui devient un paramètre à la question 3.',
      'Question 3 : `f` est une fonction `int -> int` passée en paramètre ; le terme ajouté est `f n`. N’oublie pas le terme `f 0`.'],
    solution: [
      { t: 'Questions 1 et 2', html: '<ul><li>`n ≤ 0` : 0 (le terme i = 0 vaut 0).</li><li>sinon : `n + sigma (n-1)`, puis `n * n + sigma_squares (n-1)`.</li></ul>' + R('td-os-1-2', '0-4') },
      { t: 'Question 3 : la fonction en paramètre', html: '<p>`sum_f f n` = f(0) + f(1) + … + f(n). Le terme i = 0 ne vaut plus forcément 0 : on s’arrête en dessous de 0, et `f 0` est compté.</p>' + R('td-os-1-2', '5-8') +
        '<p>Type : `(int -> int) -> int -> int`. Le premier paramètre est une fonction : c’est une fonction d’ordre supérieur. Avec `function i -> 2 * i + 1`, on additionne les impairs : 1 + 3 + 5 + 7 + 9 = 25.</p>' },
      { t: 'Retrouver les questions 1 et 2', html: '<p>Une application partielle de `sum_f` redonne la somme des carrés :</p>' + R('td-os-1-2', '9-10') }],
    answer: A(R('td-os-1-2', '0,3,5')),
    traps: [
      'Question 3 : s’arrêter à `n = 0` en rendant 0 : on oublie le terme `f 0` (faux pour `function i -> 2 * i + 1`).',
      'Question 1 : écrire n(n + 1)/2 : l’énoncé interdit la multiplication.',
      'Écrire `sum_f f n-1` : Caml lit `(sum_f f n) - 1`, et la récursion ne s’arrête jamais. Il faut `sum_f f (n-1)`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-1-3', exam: null, kind: 'td', order: 4013, src: 'TD ordre supérieur · Ex 1.3 (bonus)',
    title: 'Loop et find_power', topics: ['ordre-superieur', 'recursivite', 'exceptions'], lvl: 2, time: 12,
    intro: '<p>prédicat = fonction booléenne représentant une propriété</p>',
    questions: [
      '<b>1.</b> Écrire une fonction `loop` qui, appliquée à un prédicat `p`, une fonction `f` et un entier `x`, rend la valeur fⁿ(x) où n est le plus petit entier qui vérifie p(fⁿ(x)) = Vrai.<br>Indication : fⁿ(x) désigne l’application de f à x, n fois : fⁿ(x) = f(f(f(… f(x) …))).',
      '<b>2.</b> Utiliser `loop` pour définir une fonction `find_power` qui, étant donnés deux entiers `x` et `n`, retourne la première puissance de `x` supérieure ou égale à `n`.'],
    hints: [
      'n peut valoir 0 : si `p x` est déjà vrai, la réponse est `x`.',
      'Sinon, la réponse est celle de `loop` à partir de `f x` : le prédicat et la fonction ne changent pas.',
      'Pour `find_power`, pars de x⁰ = 1, et choisis `p` (« est ≥ n ») et `f` (« multiplier par x ») avec des fonctions anonymes. Que se passe-t-il si x vaut 0 ou 1 ?'],
    solution: [
      { t: 'Question 1 : écrire loop', html: '<ul><li>`p x` vrai : `x` (n = 0).</li><li>sinon : `loop p f (f x)`.</li></ul>' + R('td-os-1-3', '0-3') +
        '<p>Type : `(\'a -> bool) -> (\'a -> \'a) -> \'a -> \'a`. Rien n’oblige `x` à être un entier : le dernier exemple fait avancer des couples de Fibonacci jusqu’à dépasser 50.</p>' },
      { t: 'Question 2 : find_power avec loop', html: '<p>Les puissances de `x` sont 1, x, x², … : on part de 1, `f` multiplie par `x`, `p` teste « ≥ n ». Pour x &lt; 2, les puissances ne grandissent pas (0, 0… ou 1, 1…) : `loop` ne s’arrêterait jamais. Le chapeau le refuse (choix : `Invalid_argument`).</p>' + R('td-os-1-3', '4-8') +
        '<p class="sol-note">L’énoncé ne dit pas si x⁰ = 1 compte : ici oui, donc `find_power 10 1` vaut 1.</p>' }],
    answer: A(R('td-os-1-3', '0,4')),
    traps: [
      'Appliquer `f` avant de tester `p` : on rate le cas n = 0.',
      'Écrire `find_power` avec sa propre récursion : la question demande d’utiliser `loop`.',
      'Oublier x = 0 ou x = 1 : la boucle ne termine pas.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-1', exam: null, kind: 'td', order: 4021, src: 'TD ordre supérieur · Ex 2.1',
    title: 'map : appliquer f à chaque élément', topics: ['ordre-superieur', 'listes'], lvl: 1, time: 6,
    intro: '<p>Pour chaque fonction, donner plusieurs exemples d’utilisation.</p><p>Écrire la fonction `map` qui applique une fonction `f` donnée à tous les éléments d’une liste et qui construit la liste des valeurs retournées.</p><p>`map f [a1; ...; an]` retourne `[f a1; f a2; ...; f an]`</p>',
    hints: [
      'Le résultat est une liste de même longueur : un élément produit par élément lu.',
      'Pour `e :: l` : la tête du résultat est `f e`, la suite est `map f l`.',
      'Pour les exemples : essaie une fonction qui change le type (`int` vers `bool` ou `string`).'],
    solution: [
      { t: 'Spécification', html: '<p>`map f lst` rend la liste des `f e` pour les `e` de `lst`, dans l’ordre. Type : `(\'a -> \'b) -> \'a list -> \'b list` : le type des éléments peut changer.</p>' },
      { t: 'Le code et des exemples', html: '<ul><li>`[]` : `[]`.</li><li>`e :: l` : `f e :: map f l`.</li></ul>' + R('td-os-2-1') +
        '<p>`map string_of_int` passe une fonction prédéfinie en paramètre, sans `function` (à l’examen, `string_of_int` n’est permise que si l’énoncé la donne). L’avant-dernier exemple ouvre un couple dans la fonction anonyme.</p>' }],
    answer: A(R('td-os-2-1', '0')),
    traps: [
      'Écrire `f e @ map f l` : `f e` est un élément, pas une liste.',
      'Oublier de passer `f` à l’appel récursif : `map l` est une erreur de type.',
      'Donner un type `(\'a -> \'a) -> …` : rien n’impose que `f` garde le type.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-2', exam: null, kind: 'td', order: 4022, src: 'TD ordre supérieur · Ex 2.2',
    title: 'for_all : tous les éléments vérifient p', topics: ['ordre-superieur', 'listes'], lvl: 1, time: 5,
    intro: '<p>prédicat = fonction booléenne représentant une propriété</p><p>Écrire la fonction `for_all` qui vérifie si tous les éléments d’une liste `lst` vérifient le prédicat `p` donné.</p>',
    hints: [
      'Que vaut « tous les éléments de la liste vide vérifient p » ?',
      'Dès qu’un élément ne vérifie pas `p`, la réponse est connue.',
      '`&&` n’évalue pas sa partie droite si la gauche est fausse.'],
    solution: [
      { t: 'Spécification', html: '<p>`for_all p lst` rend `true` si `p e` est vrai pour chaque `e` de `lst`. Type : `(\'a -> bool) -> \'a list -> bool`.</p>' },
      { t: 'Le code et des exemples', html: '<ul><li>`[]` : `true` (aucun élément ne contredit `p`).</li><li>`e :: l` : `p e && for_all p l`, qui s’arrête au premier élément faux.</li></ul>' + R('td-os-2-2') }],
    answer: A(R('td-os-2-2', '0')),
    traps: [
      'Rendre `false` pour la liste vide : `for_all p []` vaut `true`.',
      'Écrire `for_all p l && p e` : la réponse est la même, mais tout est parcouru avant de tester `e`.',
      'Écrire `if p e then for_all p l else false` : juste, mais c’est `p e && for_all p l`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-3', exam: null, kind: 'td', order: 4023, src: 'TD ordre supérieur · Ex 2.3',
    title: 'exists : au moins un élément vérifie p', topics: ['ordre-superieur', 'listes'], lvl: 1, time: 5,
    intro: '<p>Écrire la fonction `exists` qui vérifie si au moins un élément d’une liste `lst` vérifie le prédicat `p` donné.</p>',
    hints: [
      'Que vaut « un élément de la liste vide vérifie p » ?',
      'Dès qu’un élément vérifie `p`, la réponse est connue.',
      'C’est le symétrique de `for_all` : échange `true` / `false` et `&&` / `||`.'],
    solution: [
      { t: 'Spécification', html: '<p>`exists p lst` rend `true` si au moins un `e` de `lst` vérifie `p`. Type : `(\'a -> bool) -> \'a list -> bool`.</p>' },
      { t: 'Le code et des exemples', html: '<ul><li>`[]` : `false`.</li><li>`e :: l` : `p e || exists p l`, qui s’arrête au premier élément vrai.</li></ul>' + R('td-os-2-3') }],
    answer: A(R('td-os-2-3', '0')),
    traps: [
      'Rendre `true` pour la liste vide.',
      'Parcourir toute la liste avant de répondre : `||` permet de s’arrêter au premier élément qui convient.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-4', exam: null, kind: 'td', order: 4024, src: 'TD ordre supérieur · Ex 2.4',
    title: 'Liste triée selon un ordre donné : is_sorted', topics: ['ordre-superieur', 'listes', 'listes-triees'], lvl: 2, time: 8, near: ['p2024-ex2', 'p2019d-ex2'],
    intro: '<p>Écrire la fonction `is_sorted order lst` qui prend en paramètres :</p><ul><li>une liste `lst`</li><li>une fonction à deux paramètres `order` retournant une valeur booléenne</li></ul><p>et qui vérifie que la liste `lst` est triée selon l’ordre induit par la fonction `order`.</p>' +
      ex(['# is_sorted (function x -> function y -> x < y) [1; 2; 3; 4; 5];;', '- : bool = true', '# is_sorted (function x -> function y -> x > y) [5; 4; 3; 2; 1];;', '- : bool = true',
        '# is_sorted (function x -> function y -> x < y) [1; 3; 2; 4; 5];;', '- : bool = false', '# is_sorted (function x -> function y -> x = y) [7; 7; 7; 7];;', '- : bool = true']),
    hints: [
      'C’est l’exercice « Croissance ? » du TD listes, où la comparaison `<=` est remplacée par `order`.',
      'Trois cas : vide, un élément, au moins deux éléments `e1 :: e2 :: l`.',
      '`order e1 e2` est un booléen : `order` s’applique à deux paramètres, l’un après l’autre.'],
    solution: [
      { t: 'Spécification', html: '<p>`is_sorted order lst` rend `true` si `order e1 e2` est vrai pour chaque couple d’éléments voisins. Type : `(\'a -> \'a -> bool) -> \'a list -> bool`.</p>' },
      { t: 'Principe et code', html: '<ul><li>`[]` ou `[_]` : `true`.</li><li>`e1 :: e2 :: l` : `order e1 e2 && is_sorted order (e2 :: l)`.</li></ul>' + R('td-os-2-4') +
        '<p>Les quatre exemples du TD sont conformes. Le paramètre `order` est passé tel quel à l’appel récursif.</p>' },
      { t: 'Lien avec les sujets', html: '<p>L’examen d’oct. 2024 (ex. 2, 9 points) demandait `insert_x x order lst` puis `insertion_sort order lst`, avec la même fonction d’ordre écrite `(function x -> function y -> x < y)` ; le contrôle d’avril 2019 (S1#) aussi, avec la comparaison en dernier paramètre.</p>' }],
    answer: A(R('td-os-2-4', '0')),
    traps: [
      'Oublier de passer `order` à l’appel récursif : `is_sorted (e2 :: l)` est une erreur de type.',
      'Rappeler sur `l` au lieu de `e2 :: l` : un couple de voisins sur deux n’est jamais testé.',
      'Écrire `order (e1, e2)` : `order` prend deux paramètres, pas un couple.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-5', exam: null, kind: 'td', order: 4025, src: 'TD ordre supérieur · Ex 2.5',
    title: 'find : le premier élément qui vérifie un prédicat', topics: ['ordre-superieur', 'listes', 'exceptions'], lvl: 1, time: 6,
    intro: '<p>List searching</p><p>Modifier la fonction `exists` pour qu’elle retourne le premier élément de la liste vérifiant le prédicat.</p>',
    hints: [
      'Le résultat n’est plus un booléen mais un élément : que rendre quand aucun élément ne convient ?',
      'Il n’y a pas de valeur « par défaut » de type `\'a` : il faut une exception.',
      'Dès que `p e` est vrai, rends `e`.'],
    solution: [
      { t: 'Spécification', html: '<p>`find p lst` rend le premier élément de `lst` qui vérifie `p`. Aucun : `Failure "find: not found"` (choix : le TD ne dit rien). Type : `(\'a -> bool) -> \'a list -> \'a`.</p>' },
      { t: 'Le code et des exemples', html: '<ul><li>`[]` : `failwith`.</li><li>`p e` : `e`.</li><li>sinon : `find p l`.</li></ul>' + R('td-os-2-5') }],
    answer: A(R('td-os-2-5', '0')),
    traps: [
      'Rendre `0` ou `false` quand rien ne convient : le type ne serait plus polymorphe, et la réponse serait ambiguë.',
      'Continuer après avoir trouvé : c’est le premier élément qui est demandé.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-6', exam: null, kind: 'td', order: 4026, src: 'TD ordre supérieur · Ex 2.6',
    title: 'filter : garder les éléments qui vérifient p', topics: ['ordre-superieur', 'listes'], lvl: 1, time: 6, near: ['p2023-ex2'],
    intro: '<p>Écrire une fonction qui, à partir d’une liste, construit une nouvelle liste contenant les éléments qui satisfont un prédicat `p` donné.</p>',
    hints: [
      'Parcours complet : chaque élément est gardé ou non, puis on continue.',
      'Gardé : il reste en tête, devant le filtrage de la suite. L’ordre de la liste est conservé.'],
    solution: [
      { t: 'Spécification', html: '<p>`filter p lst` rend les éléments de `lst` qui vérifient `p`, dans l’ordre. Type : `(\'a -> bool) -> \'a list -> \'a list`.</p>' },
      { t: 'Le code et des exemples', html: '<ul><li>`[]` : `[]`.</li><li>`p e` : `e :: filter p l`.</li><li>sinon : `filter p l`.</li></ul>' + R('td-os-2-6', '0-3') },
      { t: 'Lien avec les sujets', html: '<p>La question 1 de l’examen d’oct. 2023 (`remove_x x lst` : supprimer toutes les occurrences de `x`) est un `filter` avec le prédicat « différent de x » :</p>' + R('td-os-2-6', '4-5') +
        '<p>À l’examen, `filter` n’est pas prédéfinie : il faut l’écrire avant de l’utiliser, ou écrire `remove_x` directement.</p>' }],
    answer: A(R('td-os-2-6', '0')),
    traps: [
      'Ajouter les éléments gardés à la fin avec `@` : coûteux, et inutile pour garder l’ordre.',
      'S’arrêter au premier élément refusé : tous les éléments doivent être examinés.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-7', exam: null, kind: 'td', order: 4027, src: 'TD ordre supérieur · Ex 2.7',
    title: 'partition : deux listes selon un prédicat', topics: ['ordre-superieur', 'listes', 'accumulateur'], lvl: 2, time: 12, near: ['p2021-ex4'],
    intro: '<p>Écrire une fonction qui, à partir d’une liste `l`, construit une paire de listes `(l1, l2)`, où `l1` est la liste contenant les éléments qui satisfont un prédicat `p` donné, et `l2` la liste des éléments ne vérifiant pas `p`.</p><p>Bonus : Préserver l’ordre initial des éléments dans chacune des deux listes résultantes.</p>',
    hints: [
      'Le résultat est un couple de listes. Pour la liste vide : `([], [])`.',
      'Pour `e :: l` : récupère le couple du reste avec `let (yes, no) = partition p l in`, puis place `e` dans la bonne liste.',
      'Pour le bonus : en ajoutant `e` en tête de la partition du reste, l’ordre est-il conservé ?'],
    solution: [
      { t: 'Spécification', html: '<p>`partition p lst` rend `(l1, l2)` : `l1` les éléments qui vérifient `p`, `l2` les autres. Type : `(\'a -> bool) -> \'a list -> \'a list * \'a list`.</p>' },
      { t: 'Récursion pure : l’ordre est conservé', html: '<p>On partitionne d’abord la suite, puis on met `e` en tête de la bonne liste. `e` étant avant les éléments de la suite, l’ordre initial est conservé : c’est le bonus.</p>' + R('td-os-2-7', '0-3') },
      { t: 'Avec deux accumulateurs : l’ordre est inversé', html: '<p>En « avançant » avec deux accumulateurs, chaque élément est empilé sur ceux déjà lus : les deux listes sortent à l’envers.</p>' + R('td-os-2-7', '4-5') +
        '<p>C’est l’avertissement de la page Moodle « Conseils pour les listes » : l’accumulateur « la plupart du temps n’est pas nécessaire » et peut donner un résultat différent de celui demandé.</p>' },
      { t: 'Lien avec les sujets', html: '<p>Le Mystery du partiel de nov. 2021 (ex. 4, 4 points) partitionnait deux listes entrelacées selon un prédicat, avec une fonction `aux p e (r1, r2)` qui place `e` dans la bonne liste du couple.</p>' }],
    answer: A(R('td-os-2-7', '0')),
    traps: [
      'Appeler deux fois `partition p l` (une pour chaque liste du couple) : le temps double à chaque élément. Un seul appel, ouvert avec `let (yes, no) = … in`.',
      'Utiliser des accumulateurs sans retourner les listes : l’ordre est inversé, le bonus est perdu.',
      'Écrire `(e :: yes, no)` dans les deux cas : `e` doit aller dans `no` quand `p e` est faux.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-2-8', exam: null, kind: 'td', order: 4028, src: 'TD ordre supérieur · Ex 2.8',
    title: 'for_all2 et almost', topics: ['ordre-superieur', 'deux-listes', 'exceptions'], lvl: 2, time: 15, also: ['p2019-ex4'],
    questions: [
      '<b>1.</b> Écrire la fonction Caml `for_all2` dont les spécifications sont les suivantes :<ul><li>Elle prend en paramètre une fonction booléenne (un prédicat) à deux paramètres : `p` ainsi que deux listes : [a1; a2; ⋯; an] et [b1; b2; ⋯; bn].</li><li>Elle vérifie si toutes les paires ai bi vérifient le prédicat `p`.</li><li>Si elle trouve une paire telle que `p ai bi` est faux, elle retourne faux. Sinon, elle déclenche une exception `Invalid_argument` si les deux listes sont de longueurs différentes.</li></ul>',
      '<b>2.</b> Utiliser la fonction `for_all2` pour définir une fonction qui vérifie si deux listes d’entiers sont "quasi-identiques" : la différence entre deux valeurs à la même place ne peut dépasser 1. Si aucune paire dont la différence dépasse 1 n’a été trouvée et si les deux listes sont de longueurs différentes, elle déclenche une exception.<p>Exemples d’utilisation :</p>' +
        ex(['# almost [1; 2; 3; 4; 5] [1; 3; 2; 4; 6];;', '- : bool = true', '# almost [1; 2; 3; 4; 5] [1; 4; 3; 4; 5];;', '- : bool = false'])],
    hints: [
      'Deux listes parcourues ensemble : filtre le couple `(l1, l2)`, avec les quatre cas.',
      '« Si elle trouve une paire fausse, elle retourne faux. Sinon… exception » : avec `p e1 e2 && …`, une paire fausse arrête le parcours <strong>avant</strong> d’atteindre la fin de la liste la plus courte.',
      'Question 2 : la différence ne dépasse pas 1, sans `abs` (prédéfinie) : deux comparaisons. Le prédicat s’écrit `function x -> function y -> …`.'],
    solution: [
      { t: 'Spécification', html: '<p>`for_all2 p l1 l2` : `true` si `p ai bi` est vrai pour toutes les paires ; `false` dès qu’une paire est fausse ; `Invalid_argument` si les longueurs diffèrent et qu’aucune paire fausse n’a été trouvée avant. Type : `(\'a -> \'b -> bool) -> \'a list -> \'b list -> bool`.</p>' },
      { t: 'Principe : les quatre cas', html: '<ul><li>`([], [])` : `true`.</li><li>`(e1 :: r1, e2 :: r2)` : `p e1 e2 && for_all2 p r1 r2`. Si `p e1 e2` est faux, la récursion n’est pas évaluée : c’est le « sinon » de l’énoncé.</li><li>une seule liste vide : `invalid_arg`.</li></ul>' },
      { t: 'Le code et la réponse de Caml', html: R('td-os-2-8') +
        '<p>`almost [1; 9] [1; 2; 3]` rend `false` sans exception : la paire (9, 2) est fausse avant la fin de la liste courte. La dernière phrase montre que les deux listes peuvent avoir des types différents.</p>' },
      { t: 'Si on teste la suite d’abord', html: '<p>En écrivant `for_all2 p r1 r2 && p e1 e2`, la fin des listes est atteinte avant de tester la paire fausse : l’exception part alors que l’énoncé demande `false`.</p>' + R('td-os-2-8b') },
      { t: 'Dans les sujets', html: '<p>Contrôle de nov. 2017 (ex. 4, 5 points) et partiel d’oct. 2019 (ex. 4, 5 points), même énoncé. Le corrigé officiel de 2019 écrit le prédicat `let near x y = (y - 2 < x) && (x < y + 2)` et le message `"for_all2: different lengths"`.</p>' }],
    answer: A(R('td-os-2-8', '0-1')),
    traps: [
      'Tester les longueurs d’abord (avec une fonction `length`) : l’exception partirait alors qu’une paire fausse existe, contre l’énoncé.',
      'Utiliser `abs` : fonction prédéfinie, interdite. Écris `x - y <= 1 && y - x <= 1`.',
      'Écrire `almost` avec sa propre récursion : la question demande d’utiliser `for_all2`.',
      'Oublier les cas de longueurs différentes : `Warning 8`, puis `Match_failure` au lieu de `Invalid_argument`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-3-1', exam: null, kind: 'td', order: 4031, src: 'TD ordre supérieur · Ex 3.1 (bonus)',
    title: 'Traitement récursif : process_list', topics: ['ordre-superieur', 'listes'], lvl: 3, time: 25,
    intro: '<p>On peut généraliser de nombreux traitements récursifs (non terminaux) d’une liste par la fonction suivante :</p>' +
      ml(['let rec process_list f init =', '  function', '     []       -> init', '   | e :: lst -> f e (process_list f init lst) ;;']) +
      '<ul><li>Dans le cas d’une liste vide, la fonction retourne une valeur d’arrêt : `init`</li><li>Dans le cas d’une liste de la forme `e::lst`, le résultat dépend de `e` et du traitement de la liste `lst`.</li></ul>' +
      '<p>On peut utiliser la fonction `process_list` pour calculer de nouvelles fonctions, sans récursivité. Par exemple, la fonction qui calcule la longueur d’une liste sera définie par :</p>' +
      ex(['# let length lst = process_list (function e -> function call -> 1 + call) 0 lst ;;', "val length : 'a list -> int = <fun>"]),
    questions: [
      '<b>1.</b> (a) Quel est le type de `process_list` ? (b) Que calcule `process_list f init [e1; ...; en]` ?',
      '<b>2.</b> Utiliser la fonction `process_list` pour définir, sans récursivité, les fonctions suivantes :<ul><li>(a) `sum` calcule la somme des éléments d’une liste.</li><li>(b) `concatenate` prend en paramètre une liste de chaînes de caractères et qui retourne la chaîne de caractères obtenue en concaténant les unes aux autres dans l’ordre les chaînes de la liste. Donner des exemples d’applications de `concatenate`.</li><li>(c) `append` concatène deux listes.</li><li>(d) `map`, appliquée à `f` et [e1; …; en], calcule [f(e1); …; f(en)].</li><li>(e) `for_all`, appliquée à une fonction booléenne `p` et une liste, vérifie si tous les éléments de la liste vérifient le prédicat `p`.</li><li>(f) Bonus : `sum_list` prend en paramètre une liste de fonctions réelles [f1; …; fn] et retourne la fonction f1 + ⋯ + fn. Donner des exemples d’application de `sum_list`. Donner des exemples d’application de résultats d’applications de `sum_list`.</li></ul>'],
    hints: [
      'Type : `init` est le résultat pour `[]`, donc du type du résultat (`\'b`). `f` reçoit un élément (`\'a`) et le résultat pour la suite (`\'b`), et rend un `\'b`.',
      'Déroule `process_list f init [e1; e2]` : `f e1 (f e2 init)`. Pour chaque fonction demandée, trouve la valeur pour `[]` (`init`) et comment combiner `e` avec `call`, le résultat pour la suite.',
      'Pour `append l1 l2` : la valeur d’arrêt n’est pas forcément `[]`. Pour `sum_list` : `init` et `call` sont des fonctions.'],
    solution: [
      { t: 'Question 1 : type et calcul', html: '<p>(a) `(\'a -> \'b -> \'b) -> \'b -> \'a list -> \'b`. (b) `process_list f init [e1; …; en]` = `f e1 (f e2 (… (f en init) …))` : on combine les éléments de droite à gauche, en partant de `init` (c’est un « fold_right »).</p>' + R('td-os-3-1', '0-2') },
      { t: 'Questions 2a à 2c', html: '<ul><li>`sum` : `init` = 0, on ajoute `e` à `call`.</li><li>`concatenate` : `init` = `""`, on colle `s` devant `call` avec `^`.</li><li>`append l1 l2` : on parcourt `l1` ; la valeur d’arrêt est `l2`, et on remet chaque `e` en tête.</li></ul>' + R('td-os-3-1', '3-9') },
      { t: 'Questions 2d et 2e', html: '<ul><li>`map` : `init` = `[]`, on met `f e` en tête de `call`.</li><li>`for_all` : `init` = `true`, on combine `p e && call`.</li></ul>' + R('td-os-3-1', '10-14') +
        '<p class="sol-note">Cette `for_all` ne s’arrête pas au premier élément faux : `call` (le résultat pour la suite) est calculé avant d’être passé à `f`. Sur `[-1; 2; 3; 4; 5]`, le prédicat est appelé 5 fois, contre 1 fois pour la version récursive du 2.2 (compté avec OCaml).</p>' },
      { t: 'Question 2f (bonus) : une somme de fonctions', html: '<p>Le résultat est une fonction : `init` est la fonction nulle `function x -> 0.`, et `f` combine la fonction `f` de la liste avec `call` (la somme des suivantes) en une nouvelle fonction `function x -> f x +. call x`.</p>' + R('td-os-3-1', '15-19') +
        '<p>`g 4.` = √4 + 4² + 1 = 19.</p>' }],
    answer: A(R('td-os-3-1', '0,3,5,8,10,12,15')),
    traps: [
      'Écrire la récursion dans `sum`, `map`… : la question demande de passer par `process_list`, sans `rec`.',
      '`append` : prendre `[]` comme valeur d’arrêt perd `l2`.',
      'Croire que la `for_all` obtenue s’arrête tôt : `call` est évalué avant `f`.',
      '`sum_list` : additionner des fonctions avec `+.` ; il faut construire `function x -> f x +. call x`.'],
    official: false, note: NOTE
  });

  add({
    id: 'td-os-3-2', exam: null, kind: 'td', order: 4032, src: 'TD ordre supérieur · Ex 3.2',
    title: 'fold_left : un accumulateur, de gauche à droite', topics: ['ordre-superieur', 'listes', 'accumulateur'], lvl: 2, time: 10,
    intro: '<p>Écrire la fonction `fold_left` définie par :</p>' + ml(["val fold_left : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a", '', 'fold_left f a [b1; ...; bn]   (* is *)   f (...(f (f a b1) b2) ...) bn']),
    hints: [
      '`a` joue le rôle d’un accumulateur : il est combiné avec chaque élément, de gauche à droite.',
      'Pour `b :: l` : le nouvel accumulateur est `f a b`, et on continue sur `l`.',
      'Liste vide : le résultat est l’accumulateur.'],
    solution: [
      { t: 'Principe et code', html: '<ul><li>`[]` : `a`.</li><li>`b :: l` : `fold_left f (f a b) l`.</li></ul>' + R('td-os-3-2', '0-3') +
        '<p>Avec `x :: acc`, l’accumulateur empile les éléments : la liste sort inversée (comme `reverse2` du TD listes).</p>' },
      { t: 'fold_left ou process_list', html: '<p>`fold_left` combine de gauche à droite : ((10 − 1) − 2) − 3 = 4. `process_list` (exercice 3.1) combine de droite à gauche : 1 − (2 − (3 − 10)) = −8.</p>' + R('td-os-3-2', '4-5') }],
    answer: A(R('td-os-3-2', '0')),
    traps: [
      'Écrire `f b a` : l’ordre des paramètres de `f` est fixé par le type `(\'a -> \'b -> \'a)` : accumulateur d’abord.',
      'Rendre `[]` ou 0 pour la liste vide : c’est l’accumulateur `a` qu’on rend.',
      'Confondre avec `process_list` : sur une opération non commutative (`-`), les résultats diffèrent.'],
    official: false, note: NOTE
  });

})();
