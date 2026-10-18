/* English text for data/caml/ex-td.js (merged by id over the French file).
   This year's Moodle sheets (seminar, lab, lists tutorial, higher-order tutorial) only exist in French: they are
   translated with the vocabulary of the English algorithmics papers (2018-2020): “Write the function … with the
   following specifications”, “Application examples”, “raise an exception Invalid_argument”, “at the rank i”, “the
   Caml answer”, “predicate”, “sorted (in increasing order) list”. Course words: pattern matching, guard, wrapper
   function, extra parameter, accumulator, base case, higher-order function, partial application.
   Four tutorial exercises are word for word exam questions that exist in English: their statement follows the
   official English paper (insert_nth: Oct. 2018 / Nov. 2020, delete: Nov. 2020, assoc: April 2019, for_all2 and
   almost: Oct. 2019), with the lst of the tutorial for list.
   The Caml code is the same in both languages: every block comes from window.CAML_TD (French file), and the
   answers keep their code with an English first line. `code` in a string → <code class="ml">, as in French. */
(function () {
  'use strict';
  var T = window.CAML_TD, REV = window.REV;
  if (!T || !REV || !REV.i18n) return;
  var R = T.R, S = T.S, ml = T.ml, ex = T.ex;
  var NOTE = 'No official answer key (Moodle has none for the tutorials): solution written, code run with OCaml 4.14.';
  var NOTE_SEM = 'No official answer key for the seminar: solution written, code run with OCaml 4.14.';
  var NOTE_LAB = 'No official answer key for the lab: solution written, code run with OCaml 4.14.';
  var LEAD = { code: 'The code, followed by the Caml answer:', all: 'The Caml answers, phrase by phrase:' };
  var M = {};

  /* ===================== Seminar (01): “Unless stated otherwise, the environment is assumed empty at the start of
     each exercise.” ===================== */
  M['sem-1-1'] = {
    src: 'Seminar · Ex 1.1', title: 'Evaluations: global and local definitions',
    intro: '<p>What will be the results of the successive evaluations by Caml of each of the following phrases?</p>' +
      R('sem-1-1', null, { mode: 'guess', title: 'Seminar, exercise 1.1' }) +
      '<p><em>Type your answer under each phrase (type and value, or “Error”), then compare it with Caml’s.</em></p>',
    hints: [
      '`let x = e` (without `in`) is a global definition: Caml answers `val x : type = value`, and `x` exists for the following phrases. `let x = e1 in e2` is an expression: Caml answers `- : type = value`, and `x` disappears afterwards.',
      'A `let` without `in` inside an expression is a syntax error.',
      'With `and`, the definitions are simultaneous: `let a = 5 and b = 2 * a` uses the <strong>old</strong> `a`.'],
    solution: [
      { t: 'Phrases 1 to 4', html: '<ul><li>`let a = 6 + 3 * 2`: `*` comes before `+`, `a` is 12 (global definition).</li>' +
        '<li>`let b = 7 in 11 + b`: an expression, 18. `b` no longer exists after the phrase.</li>' +
        '<li>`let a = 3 in let c = 2 + a`: the second `let` has no `in`, so it is neither an expression nor a global definition: syntax error. Fix: `let a = 3 in let c = 2 + a in c` (5).</li>' +
        '<li>`let c = let a = 3 in 2 + a`: a global definition whose value is an expression: `c` is 5.</li></ul>' },
      { t: 'Phrases 5 to 8', html: '<ul><li>`let c = a * b`: `a` is 12, but `b` was local to phrase 2: `Error: Unbound value b`.</li>' +
        '<li>`let a = 2 in b = 5 in a * b`: a `let` or an `and` is missing: syntax error. Fixes below (10).</li>' +
        '<li>`let a = 5 in let b = 2 * a in a * b`: `b` is 10, result 50.</li>' +
        '<li>`let a = 5 and b = 2 * a in a * b`: `and` is simultaneous, the `a` of `2 * a` is the global `a` (12): `b` is 24, result 5 × 24 = 120.</li></ul>' + R('sem-1-1b') },
      { t: 'Phrases 9 to 12', html: '<ul><li>(2 × 1) + (3 × 4) = 14: each `x` is local to its parentheses.</li>' +
        '<li>`let y = x and z = y`: `y` is 2, and `z` takes the old `y`, 5: 7.</li>' +
        '<li>The `let … in` are nested: `y` is 2, then `z` is the new `y`, 2: 4. Caml warns that the first `y` (5) is never used (`Warning 26`).</li>' +
        '<li>Last phrase: inside, `a` is 2 and `b` is 4, then `a + b` = 6 and `a - b` = −2 (simultaneous), and 6 × 6 − (−2) × (−2) = 32: `val a : int = 32`.</li></ul>' }],
    traps: [
      'Answering `val …` for a `let … in` expression: only a global definition gives `val`.',
      'Believing that a local definition still exists in the next phrase.',
      'Reading `and` as a sequence of `let … in`: definitions joined by `and` do not see each other.'],
    note: NOTE_SEM
  };

  M['sem-1-2'] = {
    src: 'Seminar · Ex 1.2', title: 'Types and values',
    intro: '<p>What are the types and the values of the following expressions?</p>' + R('sem-1-2', null, { mode: 'guess', title: 'Seminar, exercise 1.2' }),
    hints: [
      'Integers and floats do not mix: `+ - * /` for `int`, `+. -. *. /.` for `float`. A comparison needs two values of the same type.',
      '`/` is the integer division; `*`, `/` and `mod` have the same priority and are read from left to right.',
      '`&&` and `||` only evaluate their right-hand side when it is needed.'],
    solution: [
      { t: 'Numbers', html: '<ul><li>`1. +. 2.`: `3.` (Caml writes floats with a final dot). `1 + 1.5` and `1 +. 1.5`: type errors, `int` and `float` do not mix.</li>' +
        '<li>`1 / 2` is 0 (integer division); `5 / 2 = 4 / 2` compares 2 and 2: `true`.</li>' +
        '<li>`10-2 * 2` = 10 − 4 = 6. `10 * 24 mod 10` = 240 mod 10 = 0; `24 mod 10 * 10` = 4 × 10 = 40: same priority, from left to right.</li></ul>' },
      { t: 'Characters and strings', html: '<ul><li>`\'a\'` is a `char`, `"A string"` a `string`. `\'\'` does not exist: a character is never empty.</li>' +
        '<li>`^` concatenates two strings: `"Hello Word" ^ \'!\'` is rejected, it needs `"!"`.</li></ul>' },
      { t: 'Comparisons', html: '<ul><li>`1. < 3`: two different types, error. `1 < 2 < 3` reads `(1 < 2) < 3`: a `bool` compared with an `int`, error.</li>' +
        '<li>Strings are compared character by character: `"how do string "` against `"how do strings"`, the space (code 32) comes before `s`: `false`. `\'Z\' < \'a\'`: capital letters come before small letters, `true`.</li>' +
        '<li>Two functions cannot be compared: the exception `Invalid_argument "compare: functional value"`.</li></ul>' },
      { t: 'Lazy evaluation of `&&` and `||`', html: '<ul><li>`false || (1/0 = 0)`: the right-hand side must be evaluated, `Division_by_zero`. `true || …` is `true` without evaluating the right-hand side.</li>' +
        '<li>`true && (1/0 = 0)`: exception; `false && (1/0 = 0)`: `false`.</li>' +
        '<li>`false && (1.5 > 1)`: the type error is found before any evaluation, laziness does not hide it.</li></ul>' }],
    traps: [
      'Writing `3.0` in a Caml answer: Caml writes `3.`.',
      'Thinking that the laziness of `&&` hides a type error: typing comes before evaluation.',
      'Chaining comparisons as in maths (`1 < 2 < 3`): write `1 < 2 && 2 < 3`.'],
    note: NOTE_SEM
  };

  M['sem-2-1'] = {
    src: 'Seminar · Ex 2.1', title: 'Types and function applications',
    intro: '<p>The following functions are in the environment:</p><ul><li>`sqrt : float -> float` (square root)</li><li>`float_of_int : int -> float`</li><li>`int_of_float : float -> int`</li></ul>' +
      '<p>Evaluate the following phrases, and fix the errors if any:</p>' + R('sem-2-1', null, { mode: 'guess', title: 'Seminar, exercise 2.1' }),
    hints: [
      'Function application comes before any other operator: `f 2 + 3` reads `(f 2) + 3`.',
      '`f -4` reads as a subtraction `f - 4`. A negative argument is written in parentheses.',
      '`f f f 2` applies `f` to three arguments: `f`, `f` and `2`. Composing needs parentheses.'],
    solution: [
      { t: 'The priority of application', html: '<ul><li>`f -4`: Caml reads `f - 4`, it subtracts an integer from a function: error. Fix: `f (-4)` is 16.</li>' +
        '<li>`f 2 + 3` = `(f 2) + 3` = 7; `f (2 + 3)` = 25; `f 2 * f 2 * f 2` = 4 × 4 × 4 = 64.</li>' +
        '<li>`f f f 2`: `f` gets three arguments, “too many arguments”. Fix: `f (f (f 2))` = 256.</li></ul>' },
      { t: 'A local definition that hides another one', html: '<p>In `g`, the local `f` (`x / 10`) hides the global `f`. `f x*10` reads `(f x) * 10`: for 58, 5 × 10 + 8 = 58. On a natural number, `g` returns its argument.</p>' },
      { t: 'Composing functions', html: '<p>`int_of_float sqrt float_of_int x` applies `int_of_float` to three arguments. The functions must be composed: `int_of_float (sqrt (float_of_int x))`. As `f2` was not defined, `f2 10` gives `Unbound value f2`.</p>' },
      { t: 'Laziness and types', html: '<ul><li>`g1` is well typed, but `true && (x/0 = 0)` always evaluates the division: `g1 0` raises `Division_by_zero` (and so does `g1` for any `x`).</li>' +
        '<li>`g2`: `1.5 > x+1` compares a `float` and an `int`: type error, even behind `false &&`. Fix: `float_of_int (x+1)`; `g2` is always `false`.</li>' +
        '<li>`g3`: `a` is useless (`Warning 26`); `g3 x` = `x * x`.</li></ul>' },
      { t: 'The fixes', html: '<p>The fixed phrases and their answers:</p>' + R('sem-2-1b') }],
    traps: [
      'Writing `f -4` for a negative argument: write `f (-4)`. The papers always write `(-1)` in their examples.',
      'Writing `f f 2` for `f (f 2)`: application is read from left to right, `(f f) 2`.',
      'Believing that `false &&` avoids a type error: typing comes first.'],
    note: NOTE_SEM
  };

  M['sem-2-2'] = {
    src: 'Seminar · Ex 2.2', title: 'Take a Chance: mirror, abba, stammer',
    intro: '<p>Write the following Caml functions:</p><ul><li><b>mirror</b>: takes a positive integer n with two non-zero digits as parameter and returns its "mirror".</li>' +
      '<li><b>abba</b>: Use `mirror` to write a function that, for any number ab with two non-zero digits, computes abba.</li>' +
      '<li><b>stammer</b>: Use the two previous functions to write the function that, from any number of the form ab, returns the integer abbabaab.</li></ul>' +
      '<p>(For now, we do not care about the results when the parameter is not a positive integer with 2 non-zero digits.)</p><p>Application examples:</p>' +
      ex(['# mirror 15 ;;', '- : int = 51', '# abba 42 ;;', '- : int = 4224', '# stammer 18 ;;', '- : int = 81181881']),
    hints: [
      'The digits of n: tens `n / 10`, units `n mod 10`.',
      'abba: ab followed by ba, that is ab × 100 + ba.',
      'An 8-digit number made of two 4-digit blocks: block1 × 10000 + block2. Read the example carefully to know which blocks.'],
    solution: [
      { t: 'mirror and abba', html: '<p>`mirror n` swaps the two digits: units × 10 + tens. `abba n` = `n * 100 + mirror n`.</p>' + R('sem-2-2', '0-3') },
      { t: 'stammer: the text and the example disagree', html: '<p>For 18, “abbabaab” gives 1881 followed by 8118, that is 18818118. The seminar’s example gives 81181881: 8118 followed by 1881, that is baababba. The version that matches the example:</p>' + R('sem-2-2', '4-5') +
        '<p>The one that follows the text:</p>' + R('sem-2-2', '6-7') +
        '<p class="sol-note">Slip in the seminar sheet: the text (abbabaab) and the example (81181881) do not match. At the exam, the examples are the reference: “Your functions must follow the given application examples” (2024 paper).</p>' }],
    traps: [
      'Writing the mirror with strings: two integer operations are enough.',
      'Computing abba again by hand inside stammer: the statement asks to reuse the previous functions.',
      'Forgetting parentheses: `abba mirror n` applies `abba` to two arguments. Write `abba (mirror n)`.'],
    note: NOTE_SEM
  };

  M['sem-2-3'] = {
    src: 'Seminar · Ex 2.3', title: 'Power: x³¹ with as few multiplications as possible',
    intro: '<p>Write the function `power31 : int -> int` that computes x³¹ from x: the only operation allowed is multiplication, and the fewer the better!</p>',
    hints: [
      'Multiplying x by itself 30 times costs 30 multiplications. A square doubles the exponent with a single multiplication.',
      'Keep the intermediate powers in local definitions `let … in`, so that they are never computed twice.',
      'Look for a sequence of exponents, from 1 to 31, where each one is the sum of two exponents already obtained.'],
    solution: [
      { t: 'Idea', html: '<p>Each local definition costs one multiplication and reuses powers already computed: x² = x·x, x³ = x²·x, x⁵ = x³·x², x¹⁰ = x⁵·x⁵, x²⁰ = x¹⁰·x¹⁰, x³⁰ = x²⁰·x¹⁰, x³¹ = x³⁰·x. That is <strong>7 multiplications</strong>, the minimum for 31.</p>' +
        '<p>With successive squares (x², x⁴, x⁸, x¹⁶, then x¹⁶·x⁸·x⁴·x²·x), it takes 8.</p>' },
      { t: 'The code and the Caml answer', html: '<p>Seven local definitions, one multiplication each:</p>' + R('sem-2-3') }],
    traps: [
      'Writing `x * x * x * …`: 30 multiplications.',
      'Writing `(x * x) * (x * x)`: the same multiplication is done twice. Name it with `let … in`.'],
    note: NOTE_SEM
  };

  M['sem-2-6'] = {
    src: 'Seminar · Ex 2.6', title: 'Hours, minutes, seconds',
    intro: '<p>We assume here that the parameters are "valid" (minutes and seconds in [0, 60[, hours ∈ ℕ).</p>',
    questions: [
      '<b>1.</b> Write the function `sec_of_time` that converts a duration given by 3 integers (hours, minutes, seconds) into seconds. Example: 23h 13m 59s = 83639s',
      '<b>2.</b> Write the function `time_of_sec` that converts seconds into hours, minutes, seconds (given as the triple (h, mn, s)).',
      '<b>3.</b> Use the two previous functions to write the function `add_times` that adds two durations (each one given by 3 integers). Example: 12h 22m 15s + 15h 13m 10s = 27h 35m 25s<p>Application examples:</p>' +
        ex(['# sec_of_time 23 13 59 ;;', '- : int = 83639', '# time_of_sec 83639 ;;', '- : int * int * int = (23, 13, 59)', '# add_times 12 22 15 15 13 10 ;;', '- : int * int * int = (27, 35, 25)'])],
    hints: [
      '“3 integers”: three parameters `h m s`, not a triple. The result of `time_of_sec`, however, is a triple.',
      'For `time_of_sec`: integer division and remainder by 3600, then by 60.',
      '`add_times`: convert both durations into seconds, add, convert back.'],
    solution: [
      { t: 'Questions 1 and 2', html: R('sem-2-6', '0-3') + '<p>83639 = 23 × 3600 + 839, and 839 = 13 × 60 + 59. The type `int * int * int` is the type of a triple.</p>' },
      { t: 'Question 3', html: R('sem-2-6', '4-6') + '<p>The type of `add_times` is too long for one line: Caml prints it on two. The carries (59 min 59 s + 1 s) are handled by the conversion.</p>' }],
    traps: [
      'Writing `sec_of_time (h, m, s)`: that is a one-parameter function, taking a triple, whereas the examples give three parameters.',
      'Adding hours, minutes and seconds separately: the carries must be handled, the conversion does it for you.'],
    note: NOTE_SEM
  };

  M['sem-3-3'] = {
    src: 'Seminar · Ex 3.3', title: 'Orders: max, min, middle',
    intro: '<p>Define the following functions:</p>',
    questions: [
      '<b>1.</b> `max2` and `min2` that return the maximum and the minimum of 2 integers;',
      '<b>2.</b> `max3` and `min3` that return the maximum and the minimum of 3 integers without using the functions defined before;',
      '<b>3.</b> `middle3` that returns the middle one of 3 integers (you may use the previous functions);',
      '<b>4.</b> `max4` and `min4` that return the maximum and the minimum of 4 integers (use the previous functions!).'],
    hints: [
      '`max2`: one conditional `if … then … else`.',
      '`max3` without `max2`: two nested conditionals.',
      '`middle3`: the smaller of the first two cannot be the maximum, the larger of the two cannot be the minimum…'],
    solution: [
      { t: 'Questions 1, 2 and 4', html: S('sem-3-3', '0-3,5-6') +
        '<p>`max4 a b c d` is the larger of the maxima of two pairs. Caml answers `\'a -> \'a -> \'a`: nothing forces integers, `>` compares all basic types.</p>' },
      { t: 'Question 3: the middle', html: '<p>The middle is the larger of `min2 a b` and the smaller of (`max2 a b`, `c`). If `c` is the largest, it is `max2 a b`; if it is in the middle, it is `c`; if it is the smallest, it is `min2 a b`.</p>' + S('sem-3-3', '4') },
      { t: 'The Caml answer', html: '<p>The seven definitions, then a few tries:</p>' + R('sem-3-3') }],
    traps: [
      'Using the predefined `max` and `min`: the exercise asks you to write them.',
      'Forgetting a case of equality: `middle3 7 7 1` must be 7.'],
    note: NOTE_SEM
  };

  M['sem-3-4'] = {
    src: 'Seminar · Ex 3.4', title: 'Sum of the squares of the two largest',
    intro: '<p>Write the function `highest_square_sum` that, from three integers, returns the sum of the squares of the two largest ones. Use the functions defined in exercise 3.3.</p><p>Application examples:</p>' +
      ex(['# highest_square_sum 3 2 1 ;;', '- : int = 13', '# highest_square_sum 1 (-5) 10 ;;', '- : int = 101', '# highest_square_sum (-1) (-2) (-3) ;;', '- : int = 5']),
    hints: [
      'The two largest of three: the maximum and the middle one.',
      'Compute them once, with `let … in`, before squaring them.'],
    solution: [
      { t: 'The code and the Caml answer', html: '<p>`max3` and `middle3` (exercise 3.3) give the two largest. The three examples match: with negative numbers, the two largest are −1 and −2, hence 1 + 4 = 5.</p>' + R('sem-3-4', '4-7') }],
    traps: [
      'Taking the two largest absolute values: (−5)² would wrongly count in the second example.',
      'Writing `max3 a b c * max3 a b c`: the computation is done twice.'],
    note: NOTE_SEM
  };

  M['sem-3-5'] = {
    src: 'Seminar · Ex 3.5', title: 'Evaluations: pattern matching',
    intro: '<p>What will be the results of the evaluations of the following phrases? Fix the errors if any and try to remove the "warnings".</p>' +
      R('sem-3-5', null, { mode: 'guess', title: 'Seminar, exercise 3.5' }),
    hints: [
      'Caml checks that a pattern matching covers every case: otherwise `Warning 8` at the definition, and `Match_failure` if a forgotten case occurs.',
      'Caml cannot tell whether `when` guards cover everything: a matching whose cases are all guarded is reported as not exhaustive.',
      'A name in a pattern is a new variable: it matches anything, and compares nothing.'],
    solution: [
      { t: 'f1, f2, switchonoff', html: '<ul><li>`f1` is correct: `y` matches everything that is not 0.</li><li>`f2`: `_` is only a pattern, not a value: syntax error on the right of `->`.</li>' +
        '<li>`switchonoff`: a string other than `"on"` and `"off"` is not matched (`Warning 8`, Caml quotes `""`). Add `| _ -> …` with an exception.</li></ul>' },
      { t: 'The match on a * b − 27972, square', html: '<ul><li>42 × 666 = 27972: `"zero"`.</li><li>`square`: both cases are guarded, Caml does not see that they cover everything (`Warning 8`, “All clauses in this pattern-matching are guarded”). Replace the last guard with `_`. `square (-5)` does raise the exception.</li></ul>' },
      { t: 'parity, grade, h', html: '<ul><li>`parity`: for Caml, `n mod 10` could be 10 or −1, values that are not matched (`Warning 8`); the result is `"even"`. Replace the last pattern with `_`, and put the `match` in parentheses inside an `if`.</li>' +
        '<li>`grade 12 14`: (12 + 14) / 2 = 13. Cases are tried in order: 13 > 15 no, 13 > 5 yes: `\'D\'`. The `\'C\'` and `\'B\'` cases are never used; they must be ordered from the most demanding to the least demanding.</li>' +
        '<li>`h`: the pattern `y` is a new variable, it matches everything that is not 0 (`Warning 11`: the `_` case is no longer used). `h 5 5` and `h 5 3` are 1. To compare with the parameter `y`: `| z when z = y -> 1`.</li></ul>' },
      { t: 'The fixes', html: '<p>The fixed definitions, without any warning:</p>' + R('sem-3-5b') }],
    traps: [
      'Leaving a `Warning 8` in an exam answer: it shows a forgotten case. Handle it, for instance with an exception.',
      'Writing the name of a parameter in a pattern to compare with it: it is hidden by a new variable.',
      'Ordering guarded cases at random: the first one that matches wins.'],
    note: NOTE_SEM
  };

  M['sem-3-7'] = {
    src: 'Seminar · Ex 3.7', title: 'Postage: exceptions and the order of the tests',
    intro: '<p>The aim of this exercise is to write a function computing the postage rate of a parcel under 3kg sent within France. The rates are given in the following table:</p>' +
      '<div class="tbl"><table><thead><tr><th>Weight up to</th><th>Economy</th><th>Standard</th><th>Express</th></tr></thead><tbody>' +
      '<tr><td>500g</td><td>€3.4</td><td>€4.6</td><td>€9.1</td></tr><tr><td>1000g</td><td>€4.6</td><td>€5.9</td><td>€11</td></tr><tr><td>2000g</td><td>€5.1</td><td>€6.5</td><td>€13.5</td></tr><tr><td>3000g</td><td>€6.9</td><td>€7.2</td><td>€14.2</td></tr></tbody></table></div>' +
      '<p>The 3 kinds of rates are represented by the strings `"eco"`, `"standard"` and `"express"`.</p>',
    questions: [
      '<b>1.</b> Write the function `rate_eco` that computes the economy rate of a parcel, from its weight.',
      '<b>2.</b> Write the functions `rate_standard` and `rate_express`, similar to `rate_eco`, for the standard and express rates.',
      '<b>3.</b> Write the function `rate`, that computes the postage of a parcel from its weight and the rate code.',
      '<b>4.</b> Can this problem be solved with fewer functions (try to merge the rate functions `rate_eco`, `rate_standard` and `rate_express` into a single one)?' +
        ex(['# rate 750 "eco" ;;', '- : float = 4.6', '# rate (-150) "standard" ;;', 'Exception: Invalid_argument "weight has to be positive".', '# rate 150 "drone" ;;', 'Exception: Failure "unknown code".', '# rate 3500 "express" ;;', 'Exception: Failure "too heavy".'])],
    hints: [
      'The examples fix the exceptions: negative weight (`Invalid_argument`), weight too large and unknown code (`Failure`).',
      'The validity tests are done once, in `rate`: the rate functions may assume a weight between 0 and 3000.',
      'Question 4: a single chain of `if` on the weight can return the three rates at once, in a triple.'],
    solution: [
      { t: 'Questions 1 and 2', html: '<p>A chain of `if` on the weight. The amounts are `float`: `11.` and not `11`.</p>' + S('sem-3-7', '0-2') },
      { t: 'Question 3', html: '<p>`rate` tests the weight first (negative, then too heavy), then matches the code. An unknown code falls into `_`.</p>' + R('sem-3-7', '3-9') },
      { t: 'Question 4: a single function', html: '<p>The chain on the weight returns the triple of the three rates, opened by `let (eco, standard, express) = … in`; the matching on the code picks one of them.</p>' + R('sem-3-7b') }],
    traps: [
      'Writing `11` instead of `11.`: all branches must have type `float`.',
      'Testing the code before the weight: `rate (-150) "drone"` would give `unknown code`. The order of the tests decides which exception is raised.',
      'Forgetting the `_` case of the matching on the code: `Warning 8`, then `Match_failure` instead of `Failure "unknown code"`.'],
    note: NOTE_SEM
  };

  M['sem-3-9'] = {
    src: 'Seminar · Ex 3.9', title: '“Anonymous matching”: function without match',
    intro: '<p>The functions to write must use pattern matching, but without `match`!</p>',
    questions: [
      '<b>1.</b> Write a Caml function that counts the number of 0 in a pair of integers.' + ex(['# count (0, 0) ;;', '- : int = 2', '# count (0, 1) ;;', '- : int = 1', '# count (4, 5) ;;', '- : int = 0']),
      '<b>2.</b> Write the following function in Caml: ∀(m, n) ∈ ℤ × ℤ, f(m, n) = 0 if m = 0; 2m if m ≠ 0 and n = 0; m.n if m ≠ 0 and n ≠ 0.',
      '<b>3.</b> Let `and3` be the Caml function defined below. Find an equivalent function without any logical operator.' + ml(['let and3 (a, b, c) = a && b && c ;;'])],
    hints: [
      '`function` matches its single parameter directly: `let f = function pattern1 -> … | pattern2 -> …`.',
      'The parameter is a pair: the patterns are pairs, such as `(0, _)`.',
      'Cases are tried in order: put the most precise ones first.'],
    solution: [
      { t: 'Question 1', html: '<p>Three cases: both zero, only one (“or” pattern `(0, _) | (_, 0)`, after the first one), none.</p>' + R('sem-3-9', '0-3') },
      { t: 'Question 2', html: '<p>The order of the cases follows the definition: `m = 0` first, then `n = 0` (so `m ≠ 0`), then the general case.</p>' + R('sem-3-9', '4-7') },
      { t: 'Question 3', html: '<p>`and3` is true only for `(true, true, true)`: one case, and everything else.</p>' + R('sem-3-9', '8-10') }],
    traps: [
      'Putting `(0, _) | (_, 0)` before `(0, 0)`: the pair `(0, 0)` would count once.',
      'Writing `let count x y = …`: the function takes a pair, a single parameter.'],
    note: NOTE_SEM
  };

  M['sem-4-1a'] = {
    src: 'Seminar · Ex 4.1 (1/2)', title: 'What is it? Reading recursive functions',
    intro: '<p>What do the following functions compute (study all cases)?</p>' + S('sem-4-1a', '0,4,8,11,13,16,19') +
      '<p><em>Practice for the “Mystery” exercises of the papers: give the type, evaluate a few calls, say what the function does.</em></p>',
    hints: [
      'Unfold each function on a small argument (3 or 4) and write down the successive calls.',
      '“All cases”: also look at negative arguments, 0, and a zero divisor. Does the recursion always stop?',
      'For `double`, ask yourself whether the calls get closer to the base case.'],
    solution: [
      { t: 'f1, f2, f3', html: '<ul><li>`f1 n` = 0 + 1 + … + n. For n &lt; 0, `n - 1` moves away from 0: the recursion never stops (`Stack overflow`).</li>' +
        '<li>`f2 n d` = the sum of the multiples of `d` between 1 and `n` (10 and 3: 3 + 6 + 9 = 18). `n < 0`: `Invalid_argument`; `d = 0`: `Division_by_zero`.</li>' +
        '<li>`f3 d n` = d × (d − 1) × … × (d − n + 1), a product of n decreasing factors (5 × 4 × 3 = 60). For n ≤ 1, `d`.</li></ul>' + R('sem-4-1a', '1-3,5-7,9-10') },
      { t: 'f4, f', html: '<ul><li>`f4 n` = the sum of the multiples of 4 between 1 and `n` (12: 4 + 8 + 12 = 24). The `let r = … in` makes a single recursive call.</li>' +
        '<li>`f n` = the number made of n digits 1 (`f 4` = 1111), built with an accumulator: `acc * 10 + 1` at each step.</li></ul>' + R('sem-4-1a', '12,14-15') },
      { t: 'double and mystery', html: '<ul><li>`double n`: for n ≠ 0, the call is made on `2*n`, which moves away from 0: mathematically, the recursion never stops (expected answer). Only `double 0` is 0.</li>' +
        '<li>`mystery x` = the number of digits of `x` (for x ≥ 0): 2026 has 4. For every x &lt; 10, so every negative number, 1.</li></ul>' + R('sem-4-1a', '17-18,20-22') +
        '<p class="sol-note">On a computer, `double 1` returns −1: Caml integers have 63 bits, `2*n` ends up overflowing to 0 after about sixty calls. This result has no mathematical meaning: the expected answer is still “does not terminate”.</p>' },
      { t: 'The types', html: '<p>The Caml answers to the seven definitions:</p>' + R('sem-4-1a', '0,4,8,11,13,16,19') }],
    answer: '<ul><li>`f1 n`: 0 + 1 + … + n (does not terminate if n &lt; 0).</li><li>`f2 n d`: sum of the multiples of d between 1 and n (exception if n &lt; 0, division by zero if d = 0).</li><li>`f3 d n`: d × (d − 1) × … × (d − n + 1).</li>' +
      '<li>`f4 n`: sum of the multiples of 4 up to n.</li><li>`f n`: the integer made of n digits 1.</li><li>`double n`: does not terminate for n ≠ 0.</li><li>`mystery x`: the number of digits of x (1 for every x &lt; 10).</li></ul>',
    traps: [
      'Forgetting negative cases: `f1 (-1)` never stops, `mystery (-345)` is 1.',
      'Copying `- : int = -1` for `double 1` as if it were a real result: it is an overflow.',
      'Giving the result on one example without saying what the function computes: the question asks for the general case.'],
    note: NOTE_SEM
  };

  M['sem-4-1b'] = {
    src: 'Seminar · Ex 4.1 (2/2)', title: 'What is it? Printing and the order of calls',
    intro: '<p>What will be the results of the successive evaluations of the following phrases, and what will be printed?</p>' +
      R('sem-4-1b', null, { mode: 'reveal', title: 'Seminar, exercise 4.1' }),
    hints: [
      '`print_int n; print_char \' \'` prints before or after the recursive call, depending on its place in the sequence.',
      'The Caml answer `- : unit = ()` comes after everything that is printed, on the same line if no new line was printed.',
      'For `g`, write down at each call the values of `n` and `d`, and whether `n mod d = 0`.'],
    solution: [
      { t: 'print1 and print2', html: '<p>`print1` prints `n` <strong>before</strong> the recursive call: 5 4 3 2 1. `print2` calls first and prints on the way back: the calls pile up down to 0, then the printing happens while going back up: 1 2 3 4 5. The type is `int -> unit`: the function returns nothing useful, it prints.</p>' + R('sem-4-1b', '0-3') },
      { t: 'g', html: '<p>At each call, `g` prints `n` and `d`, then removes the last digit of `n`. If `n` is divisible by `d`, it counts 1 and keeps `d`; otherwise `d` goes down by 1.</p>' +
        '<ul><li>435567, 7: remainder 6, no → d = 6.</li><li>43556, 6: remainder 2, no → d = 5.</li><li>4355, 5: yes, count 1. 435, 5: yes, count 1.</li><li>43, 5: no → d = 4. 4, 4: yes, count 1.</li><li>n = 0: end, 0.</li></ul>' +
        '<p>The result, 3, is shown after the six lines: `g` counts, among n, n/10, n/100…, the ones divisible by the current `d`.</p>' + R('sem-4-1b', '4-5') }],
    traps: [
      'Swapping the outputs of `print1` and `print2`: check whether the printing is before or after the call.',
      'Forgetting the answer `- : unit = ()` (or `- : int = …`) after the output.',
      'In an `if … then … else`, a sequence `e1; e2` must be inside `begin … end` (or parentheses).'],
    note: NOTE_SEM
  };

  M['sem-4-6'] = {
    src: 'Seminar · Ex 4.6', title: 'Multiplication with + and −, and a wrapper function',
    intro: '<p>Write a function that computes x × y ((x, y) ∈ ℕ²) using only the operators + and -. How can the cases where (x, y) ∈ ℤ² be handled?</p>',
    hints: [
      'x × y = x + x × (y − 1), and x × 0 = 0: the recursion is on y.',
      'In ℤ, if y &lt; 0, y − 1 moves away from 0. But x × y = −(x × (−y)).',
      'The sign is tested once, in a wrapper function, which calls the recursive function with a positive y.'],
    solution: [
      { t: 'In ℕ²', html: '<ul><li>`y = 0`: 0.</li><li>otherwise: `x + mult x (y - 1)`.</li></ul>' + R('sem-4-6', '0-2') },
      { t: 'In ℤ²: the wrapper function', html: '<p>This is the example of the Moodle page “Advice on recursion”: `mult_rec` only takes `y` (`x` does not change, it takes it from the wrapper), and only works for y ≥ 0. The wrapper removes the cases x = 0 and x = 1, and calls `mult_rec` with −y if y &lt; 0.</p>' + R('sem-4-6', '3-8') },
      { t: 'The slip of the Moodle page', html: '<p>The page writes `x + mult_rec (x, y-1)`, whereas `mult_rec` takes a single integer. Caml rejects the definition:</p>' + R('sem-4-6b') +
        '<p class="sol-note">Slip in the Moodle page: it should be `mult_rec (y-1)`. That is the whole point of the example: `x` is no longer a parameter of the recursive function.</p>' }],
    traps: [
      'Testing the sign of `y` at each call: a wrapper function does it once.',
      'Copying `mult_rec (x, y-1)` from the Moodle page: type error.',
      'Writing `-mult_rec -y`: Caml reads a subtraction. Write `-mult_rec (-y)`.'],
    note: NOTE_SEM
  };

  M['sem-4-8'] = {
    src: 'Seminar · Ex 4.8', title: 'Fibonacci: two calls, then one',
    intro: '<p>Write a function computing the nth term (n ∈ ℕ) of the Fibonacci sequence defined by:</p><p>F(n) = 1 if n ≤ 1; F(n) = F(n − 1) + F(n − 2) otherwise.</p>',
    hints: [
      'The definition translates directly, with two recursive calls.',
      'How many calls for F(25)? Draw the call tree of F(5): F(3) is computed twice in it.',
      'To compute nothing twice, move forward with two extra parameters: two consecutive terms.'],
    solution: [
      { t: 'The direct translation', html: R('sem-4-8', '0-3') +
        '<p>Each call starts two: the same values are computed again many times. Counted with OCaml: 177 calls for `fibo 10`, 242,785 for `fibo 25`, 2,692,537 for `fibo 30`. The number of calls grows like F(n) itself.</p>' },
      { t: 'With two accumulators', html: '<p>`fib a b n` with a = F(k) and b = F(k + 1): one step gives F(k + 1) and F(k + 2), that is `fib b (a + b) (n-1)`. It starts from F(0) = F(1) = 1. n steps in all.</p>' + R('sem-4-8', '4-8') }],
    traps: [
      'Believing that the two-call version is fine for large n: `fibo 50` would need tens of billions of calls.',
      'Getting the base case wrong: here F(0) = F(1) = 1 (the seminar’s definition), not F(0) = 0.',
      'Forgetting the wrapper function that initialises the accumulators.'],
    note: NOTE_SEM
  };

  M['sem-4-9'] = {
    src: 'Seminar · Ex 4.9', title: 'Mirror: a string, then an integer with an accumulator',
    intro: '<p>Write a function that "reverses" the digits of any positive integer.</p><p>Two versions:</p>',
    questions: [
      '<b>1.</b> The result is a string containing the "mirror" integer. Use the function `string_of_int : int -> string`.' + ex(['# reverse 1234 ;;', '- : string = "4321"']),
      '<b>2.</b> The result is an integer (without using the previous function, nor strings).' + ex(['# reverse_int 1234 ;;', '- : int = 4321'])],
    hints: [
      'The last digit is `n mod 10`, the rest of the number `n / 10`.',
      'String version: the last digit first, then the mirror of the rest, joined with `^`.',
      'Integer version: an accumulator that receives the digits one by one: `acc * 10 + n mod 10`.'],
    solution: [
      { t: 'Version 1: a string', html: '<ul><li>`n < 10`: the single digit, `string_of_int n`.</li><li>otherwise: the last digit, followed by the mirror of `n / 10`.</li></ul>' + R('sem-4-9', '0-3') },
      { t: 'Version 2: an integer', html: '<p>`rev acc n`: `acc` holds the mirror of the digits already removed. Each step removes the last digit of `n` and adds it to the right of `acc`. The wrapper starts `rev 0 n`.</p>' + R('sem-4-9', '4-8') +
        '<p>`reverse 1200` is `"0021"` but `reverse_int 1200` is 21: an integer has no leading zeros.</p>' }],
    traps: [
      'Integer version without an accumulator: you would need the number of digits to place each one.',
      'Forgetting that leading zeros vanish in an integer: that is expected, not an error.',
      'Writing `string_of_int n mod 10`: Caml reads `(string_of_int n) mod 10`, type error.'],
    note: NOTE_SEM
  };

  M['sem-4-10'] = {
    src: 'Seminar · Ex 4.10', title: 'Power: classic, then fast',
    intro: '<p>Let x ∈ ℝ and n ∈ ℕ.</p>',
    questions: [
      '<b>1.</b> Write a recursive function computing xⁿ with the "classic" method (successive multiplications).',
      '<b>2.</b> Write a new function computing xⁿ with fast exponentiation: try to express xⁿ in terms of x<sup>⌊n/2⌋</sup> (⌊x⌋ is the floor of x).'],
    hints: [
      'x ∈ ℝ: x is a `float`, the operators are `*.`, and x⁰ is `1.`.',
      'If n is even, xⁿ = (x<sup>n/2</sup>)²; if it is odd, xⁿ = x × (x<sup>⌊n/2⌋</sup>)².',
      'Compute x<sup>⌊n/2⌋</sup> only once, with `let p = … in`.'],
    solution: [
      { t: 'Question 1', html: R('sem-4-10', '0-2') + '<p>n multiplications.</p>' },
      { t: 'Question 2', html: '<p>A single recursive call per level, on `n / 2`: about log₂ n calls (4 for n = 10: 10, 5, 2, 1).</p>' + R('sem-4-10', '3-7') +
        '<p>Writing `fast_power x (n/2) *. fast_power x (n/2)` would do the same computation twice at each level: back to n multiplications, all the gain would be lost.</p>' }],
    traps: [
      'Mixing `*` and `*.`: `x` is a `float`.',
      'Calling `fast_power x (n/2)` twice: the gain disappears.',
      'Forgetting the factor `x` when n is odd.'],
    note: NOTE_SEM
  };

  M['sem-hanoi'] = {
    src: 'Moodle · Hanoi', title: 'The towers of Hanoi: two recursive calls',
    intro: '<p>É. Lucas’s legend (1883): three pegs; one disk is moved at a time, never a large disk on a smaller one. The n disks must go from peg 1 to peg 3. What is the minimum number of moves for n disks? n = 1: 1 move; n = 2: 3 moves.</p>' +
      '<p>Complete the function `play` (the `FIXME`):</p>' +
      ml(['(* displays moves: source -> destination *)', 'let move source destination =', '  print_int source ;', '  print_string " -> " ;', '  print_int destination ;', '  print_newline()', ';;', '',
        'let hanoi n =', '  let rec play n source destination =', '    (* FIXME *)', '  in', '  if n <= 0 then', '    invalid_arg "Hanoi: number of disks invalid"', '  else', '    play n 1 3']) +
      ex(['# hanoi 3 ;;', '1 -> 3', '1 -> 2', '3 -> 2', '1 -> 3', '2 -> 1', '2 -> 3', '1 -> 3', '- : unit = ()']),
    hints: [
      'To move n disks from `source` to `destination`, the largest one must move alone: the n − 1 others must be somewhere else first.',
      'Three steps: n − 1 disks to the third peg, the large one to the destination, then the n − 1 disks onto it.',
      'The third peg: the pegs are 1, 2, 3, and 1 + 2 + 3 = 6.'],
    solution: [
      { t: 'Idea', html: '<ul><li>`n = 0`: nothing to do.</li><li>otherwise, with `other = 6 - source - destination`: `play (n-1) source other`, then `move source destination` (the large disk), then `play (n-1) other destination`.</li></ul>' +
        '<p>Two recursive calls on n − 1: the calls get closer to 0.</p>' },
      { t: 'The code and the Caml answer', html: R('sem-hanoi', '0-4') + '<p>The output of `hanoi 3` is exactly the one of the Moodle page.</p>' },
      { t: 'Number of moves', html: '<p>With c(n) the number of moves: c(0) = 0 and c(n) = 2 c(n − 1) + 1, hence c(n) = 2ⁿ − 1: 7 for 3 disks, 1023 for 10.</p>' + R('sem-hanoi', '5-7') }],
    traps: [
      'Moving the large disk before the n − 1 others are out of the way.',
      'Computing the third peg with `if`: `6 - source - destination` is enough.',
      'Forgetting `begin … end` around the sequence in the `if`: the sequence `a ; b ; c` must be grouped.'],
    note: 'Function move and answer to hanoi 3: Moodle page “Hanoi”. play written here, code run with OCaml 4.14.'
  };

  /* ===================== Lab (03, “First steps in Caml – Be lazy BUT efficient!”) ===================== */
  M['tp-2'] = {
    src: 'Lab · Ex 2', title: 'Mystery number: an exception on the parameter',
    intro: '<p>Let <i>myst</i> be a positive 3-digit integer with the following properties:</p><ul><li><i>myst</i> is a perfect square (the square of an integer);</li><li>the sum of the squares of the two largest digits of <i>myst</i> is also a perfect square.</li></ul>' +
      '<p>Write the Caml function `mystery : int -> bool` that tells whether a given integer is the mystery number <i>myst</i>. The function has to raise an exception if the parameter is not a positive three-digit number.</p>' +
      ex(['# mystery 123 ;;', '- : bool = false', '# mystery 12345 ;;', 'Exception: Invalid_argument "mystery: not a 3-digits integer".']) +
      '<p>Useful functions:</p><ul><li>`val sqrt : float -> float` Square root.</li><li>`val int_of_float : float -> int` Truncate the given floating-point number to an integer.</li><li>`val float_of_int : int -> float` Convert an integer to floating-point.</li></ul>' +
      '<p>Extra question: does such a number exist?</p>',
    hints: [
      'Invalid parameter: `invalid_arg`, with the message of the example, tested before any computation.',
      'Perfect square: the truncated square root `r`, then `r * r = x`. Write it once, in a local function.',
      'The two largest digits: the sum of the squares of the three digits, minus the square of the smallest one.'],
    solution: [
      { t: 'Specifications', html: '<p>`mystery n` returns `true` if `n` has both properties. `n` outside [100, 999]: `Invalid_argument "mystery: not a 3-digits integer"`.</p>' },
      { t: 'Idea', html: '<ul><li>`is_square x`: `r` = integer part of √x, then `r * r = x`.</li><li>digits: `a = n / 100`, `b = (n / 10) mod 10`, `c = n mod 10`.</li>' +
        '<li>sum of the squares of the two largest: a² + b² + c² minus the square of the smallest one.</li><li>`&&`: if `n` is not a square, the second condition is not computed.</li></ul>' },
      { t: 'The code and the Caml answer', html: '<p>With the two examples, a number that fits and a two-digit number:</p>' + R('tp-2', '0-4') },
      { t: 'Extra question', html: '<p>All the integers from 100 to 999 are tested:</p>' + R('tp-2', '5-6') +
        '<p>Four numbers fit. 324 = 18²: its two largest digits, 4 and 3, give 16 + 9 = 25 = 5². The three others (100, 400, 900) only make it with a digit 0 among the two largest: if both digits must be non-zero, <i>myst</i> = 324.</p>' }],
    traps: [
      'Forgetting the exception, or raising `Failure`: the example shows `Invalid_argument`.',
      'Comparing floats (`sqrt x = floor (sqrt x)`): go through an integer and check `r * r = x`.',
      'Taking the first two digits instead of the two largest.'],
    note: NOTE_LAB
  };

  M['tp-5'] = {
    src: 'Lab · Ex 5 (Level 1)', title: 'The day after: a valid date, two exceptions',
    intro: '<p>Write a function that computes the date of the day after a given date. The function has to raise an exception if the date is not valid.</p>' +
      '<p>Level 1</p><ul><li>As parameter, a date is given by 3 integers: day month year.</li><li>As result, a date is a triple of integers (day, month, year).</li></ul>' +
      ex(['# day_after 12 9 2024 ;;', '- : int * int * int = (13, 9, 2024)', '# day_after 28 2 2024 ;;', '- : int * int * int = (29, 2, 2024)', '# day_after 28 2 2025 ;;', '- : int * int * int = (1, 3, 2025)', '# day_after 31 12 2024 ;;', '- : int * int * int = (1, 1, 2025)',
        '# day_after 12 15 2005 ;;', 'Exception: Failure "the day after:not a month number".', '# day_after 31 6 2029 ;;', 'Exception: Failure "the day after:this day does not exist for month 6".']),
    hints: [
      'Start with the number of days of the month: a pattern matching on the month (30 or 31, February apart). A month outside 1..12 raises the first exception.',
      'Leap year: divisible by 4 but not by 100, or divisible by 400.',
      'Then three cases: the day does not exist (exception), it is not the last day of the month, it is the last day (careful with December).'],
    solution: [
      { t: 'Specifications', html: '<p>`day_after d m y` returns the triple of the next day. Type: `int -> int -> int -> int * int * int`. The examples impose `Failure` and its two messages; the second one contains the month number, built with `^` and `string_of_int` (functions given by the lab).</p>' },
      { t: 'Idea', html: '<ul><li>`leap`: is the year a leap year?</li><li>`days`: the number of days of month `m`; an invalid month raises `failwith` inside the matching.</li>' +
        '<li>day outside 1..`days`: `failwith`.</li><li>`d < days`: `(d + 1, m, y)`. Otherwise, last day: `(1, 1, y + 1)` in December, `(1, m + 1, y)` in other months.</li></ul>' },
      { t: 'The code and the Caml answer', html: R('tp-5') +
        '<p>2100 is not a leap year (divisible by 100, not by 400), 2000 is.</p>' }],
    traps: [
      'Forgetting century years: 2100 is not a leap year.',
      'Testing the day before the month: `day_after 12 15 2005` must report the month.',
      'Writing a `match` on the month without a `_` case: `Warning 8`, then `Match_failure` instead of the required exception.'],
    note: 'No official answer key for the lab: solution written, code run with OCaml 4.14. Exception messages copied from the sheet (“the day after:not a month number”, no space after the colon).'
  };

  /* ===================== Lists tutorial (04, “td Caml 1”) ===================== */
  M['td-listes-1-1'] = {
    src: 'Lists tutorial · Ex 1.1', title: 'Product of the elements of a list',
    intro: '<p>Write a function that computes the product of all the elements of a list of non-zero integers.</p>',
    hints: [
      'A list has only two forms: `[]` or `e :: l`. Write the result for each one.',
      'For `e :: l`, assume that the recursive call on `l` already returns the product of `l`. What is left to do with `e`?',
      'Empty list: which number does not change a product?'],
    solution: [
      { t: 'Specifications', html: '<p>`product lst` returns the product of the elements of the integer list `lst`. Expected type: `int list -> int`. No exception: the empty list has a product.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`[]`: the result is 1, the neutral element of multiplication (base case).</li>' +
        '<li>`e :: l`: `e` times the product of `l` (recursive case, on a shorter list).</li></ul>' +
        '<p>It is a full traversal: every element counts, the list is read to the end.</p>' },
      { t: 'The code and the Caml answer', html: '<p>With the example of a negative product and the empty list:</p>' + R('td-listes-1-1') },
      { t: 'Why not 0 for the empty list', html: '<p>With `[] -> 0`, every product ends with a multiplication by 0:</p>' + R('td-listes-1-1b') +
        '<p>The tutorial says “non-zero integers”: a 0 in the list would give 0 anyway. One could then stop as soon as it is met.</p>' }],
    traps: [
      'Returning 0 for the empty list: the result is then always 0.',
      'Forgetting `rec`: Caml answers `Error: Unbound value product`.',
      'Writing the pattern `[e; l]`: it is a list of two elements, not “an element followed by a list”. The general case is written `e :: l`.'],
    note: NOTE
  };

  M['td-listes-1-2'] = {
    src: 'Lists tutorial · Ex 1.2', title: 'Counting the occurrences of a value',
    intro: '<p>Write a function that counts the number of occurrences (appearances) of a given value in any list.</p>',
    hints: [
      'Two parameters: the value `x` and the list. Only the list is matched: `let rec count x = function …`.',
      'For `e :: l`, two cases depending on whether `e` equals `x`. In both cases, the count goes on in `l`.',
      '“Any list”: your function must work for integers, strings, characters… What should the empty list return?'],
    solution: [
      { t: 'Specifications', html: '<p>`count x lst` returns the number of times `x` appears in `lst`. The list can be of any type: the type must be polymorphic, `\'a -> \'a list -> int`.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`[]`: 0.</li><li>`e :: l` with `e = x`: 1 more than the count in `l`.</li><li>`e :: l` otherwise: the count in `l`.</li></ul>' +
        '<p>Full traversal: all non-empty cases are recursive.</p>' },
      { t: 'The code and the Caml answer', html: '<p>On integers, strings and the empty list:</p>' + R('td-listes-1-2') },
      { t: 'The trap of the pattern `x :: l`', html: '<p>To say “the head is `x`”, you cannot write `x` in the pattern: a name in a pattern creates a <strong>new</strong> variable, which matches any head. The next case is never used again:</p>' +
        R('td-listes-1-2b') + '<p>The function then counts all the elements. To compare, you need a test: `if e = x then …`, or a guarded pattern `e :: l when e = x -> …`.</p>' }],
    traps: [
      'Writing `x :: l` as a pattern for “the head is x”: `Warning 11` and the function counts everything.',
      'Forgetting to go on in `l` when `e = x`: the count would be at most 1.',
      'Typing the list as `int list` (with a 0 or a `+` on the elements): the function would no longer work on any list.'],
    note: NOTE
  };

  M['td-listes-1-3'] = {
    src: 'Lists tutorial · Ex 1.3', title: 'Searching for an element',
    intro: '<p>Write a function that checks whether an element is in a list.</p>',
    hints: [
      'The result is a boolean. What is it for the empty list?',
      'As soon as the head is the element searched for, the answer is known: no need to look at the rest.',
      '`a || b` does not evaluate `b` when `a` is true: that is exactly the stop you need.'],
    solution: [
      { t: 'Specifications', html: '<p>`search x lst` returns `true` if `x` is an element of `lst`, `false` otherwise. Type: `\'a -> \'a list -> bool`.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`[]`: `false` (everything was read without finding it).</li><li>`e :: l` with `e = x`: `true`, and we stop.</li><li>otherwise: search in `l`.</li></ul>' +
        '<p>It is a partial traversal: there is a second base case, “found”.</p>' },
      { t: 'The code and the Caml answer', html: R('td-listes-1-3') +
        '<p>`e = x || search x l`: if `e = x` is true, `||` does not evaluate the recursive call. It is the same as the version with `if`:</p>' + R('td-listes-1-3b', '0') }],
    traps: [
      'Writing `if e = x then true else false`: it is simply `e = x`.',
      'Counting, then comparing (`count x lst > 0`): correct, but the whole list is read even when the element is the head.',
      'Writing `search x l || e = x`: same result, but the recursive call comes first, so there is no early stop.'],
    note: NOTE
  };

  M['td-listes-1-4'] = {
    src: 'Lists tutorial · Ex 1.4', title: 'nth: the nth element, two exceptions',
    intro: '<p>Write a function that gives the value of the ith element of a list. The function has to raise an exception `Invalid_argument` if i is negative or zero, or an exception `Failure` if the list is too short.</p>',
    hints: [
      'The test on `i` does not depend on the list: do it only once, in a wrapper function, before calling the recursive function.',
      'In the recursive function, `i` is at least 1. If `i = 1`, the answer is the head. Otherwise, the ith element of `e :: l` is the (i − 1)th element of `l`.',
      'Where do you end up when the list is too short? On `[]`, with an `i` still ≥ 1: that is where `Failure` is raised.'],
    solution: [
      { t: 'Specifications', html: '<p>`nth i lst` returns the element at the rank `i` of `lst` (the first element is at the rank 1). Type: `int -> \'a list -> \'a`.</p>' +
        '<ul><li>`i ≤ 0`: `Invalid_argument` (invalid parameter, whatever the list).</li><li>list too short: `Failure`.</li></ul>' +
        '<p class="sol-note">The tutorial fixes neither the order of the parameters nor the messages: here `i` comes first, as in `insert_nth x i lst` and `remove_nth i list` in the papers, and the messages are a free choice.</p>' },
      { t: 'Idea: a wrapper function', html: '<p>The wrapper function `nth` tests `i` once. The local function `get` only sees ranks ≥ 1:</p>' +
        '<ul><li>`[]`: the list is too short, `failwith`.</li><li>`e :: l` and `i = 1`: `e`.</li><li>`e :: l` otherwise: `get (i-1) l`.</li></ul>' +
        '<p>Each call decreases `i` by 1 and shortens the list: `i = 1` or `[]` is always reached.</p>' },
      { t: 'The code and the Caml answer', html: R('td-listes-1-4') +
        '<p>`nth 1 []` gives `Failure`, not `Invalid_argument`: the rank 1 is valid, it is the list that is too short.</p>' },
      { t: 'Link with the papers', html: '<p>It is the pattern of `remove_nth i list` (Oct. 2019 paper, ex. 3, 5 points), of `insert_nth x i list` (2018 and 2020) and of `remove_interval` (2021): the rank is tested in the wrapper (`Invalid_argument`), `Failure` on `[]` in the recursive function.</p>' }],
    traps: [
      'Testing `i <= 0` at each recursive call: the test is only useful at the first call. That is the job of the wrapper function.',
      'Counting from 0: the first element is at the rank 1.',
      'Using `invalid_arg` for a list that is too short, or the other way round: `Invalid_argument` for an invalid parameter, `Failure` when the computation fails.',
      'Writing `nth -1 lst`: Caml reads a subtraction. Write `nth (-1) lst`.'],
    note: NOTE
  };

  M['td-listes-1-5'] = {
    src: 'Lists tutorial · Ex 1.5', title: 'Maximum of a list',
    intro: '<p>Write a function that returns the maximum value of a list.</p>',
    hints: [
      'The empty list has no maximum: it needs an exception.',
      'The maximum of a one-element list is that element: it is a separate base case, `[e]`.',
      'For `e :: l`, compute the maximum of `l` <strong>only once</strong> (`let m = … in`), then compare it with `e`.'],
    solution: [
      { t: 'Specifications', html: '<p>`maximum lst` returns the largest element of `lst`. Type: `\'a list -> \'a` (the comparison `>` works on all basic types). Empty list: `Failure` (a choice: the tutorial says nothing).</p>' },
      { t: 'Idea and cases', html: '<ul><li>`[]`: `failwith`, the empty list has no maximum.</li><li>`[e]`: `e`.</li><li>`e :: l` (at least two elements): `m`, the maximum of `l`, is computed once; the result is the larger of `e` and `m`.</li></ul>' +
        '<p>The case `[e]` must come before `e :: l`: patterns are tried in order.</p>' },
      { t: 'The code and the Caml answer', html: '<p>On integers, strings, a one-element list and the empty list:</p>' + R('td-listes-1-5') },
      { t: 'Two errors in a common version', html: R('td-listes-1-5b') +
        '<ul><li>`[] -> 0`: on a list of negative numbers, the result 0 is not even in the list. And the 0 fixes the type to `int list -> int`.</li>' +
        '<li>`maximum l` is written twice: each level may start two calls. On `[1; 2; …; 20]`, that makes 1,048,575 calls (2²⁰ − 1), against 20 with `let m = maximum l in`.</li></ul>' }],
    traps: [
      'Returning 0 (or another number) for the empty list: wrong for a list of negative numbers, and the type is no longer polymorphic.',
      'Writing the recursive call twice: the time doubles with each element.',
      'Using `max`: it is a predefined function, forbidden at the exam unless stated.'],
    note: NOTE
  };

  M['td-listes-1-6'] = {
    src: 'Lists tutorial · Ex 1.6 (bonus)', title: 'Second: the second smallest element',
    intro: '<p>Write a function that returns the second smallest element of a list if it exists.</p><p>Application examples:</p>' +
      ex(['# second [1; 3; 4; 2] ;;', '- : int = 2', '# second [3.5; 8.2; 9.5; 4.0];;', '- : float = 4.0', "# second ['a'];;", 'Exception: Failure "second: Not enough values"']) +
      '<p><em>It is the `mystery` function of the April 2019 midterm (S1#, ex. 4, 2 points), to read and evaluate.</em></p>',
    hints: [
      'Read the list only once, keeping two values: the smallest seen so far and the second smallest.',
      'These two values are extra parameters of an auxiliary function. To initialise them, the first two elements are needed: fewer than two elements is the exception.',
      'For each new element `e`: three cases depending on its position with respect to the two values kept.'],
    solution: [
      { t: 'Specifications', html: '<p>`second lst` returns the second smallest element of `lst`. Fewer than two elements: `Failure "second: Not enough values"` (message of the examples). Type: `\'a list -> \'a`.</p>' },
      { t: 'Idea: two extra parameters', html: '<p>`aux m1 m2 lst` reads `lst` keeping `m1 ≤ m2`, the two smallest elements seen:</p>' +
        '<ul><li>`[]`: the answer is `m2`.</li><li>`e < m1`: `e` becomes the smallest, the old `m1` becomes second.</li><li>otherwise, `e < m2`: `e` becomes the second.</li><li>otherwise: nothing changes.</li></ul>' +
        '<p>The wrapper function matches `e1 :: e2 :: l`: it orders the first two elements and starts `aux`. Any other case (empty list or one element) raises the exception.</p>' },
      { t: 'The code and the Caml answer', html: R('td-listes-1-6') +
        '<p class="sol-note">Slip in the tutorial: it writes `- : float = 4.0`, Caml prints `4.`. With duplicates, `second [5; 5]` returns 5: the tutorial does not ask for “strictly” greater.</p>' },
      { t: 'The 2019 Mystery', html: '<p>The April 2019 paper gave this function under the name `mystery`, without the case of a one-element list: `mystery [\'a\']` raised `Match_failure`, and Caml printed a `Warning 8` at the definition. Expected answer: “the function returns the second smallest element of the list if it exists”.</p>' }],
    traps: [
      'Sorting the list first: much longer to write, and without predefined functions the sort must be written too.',
      'Initialising `m1` and `m2` to 0: wrong if all elements are larger, and the type is no longer polymorphic.',
      'Forgetting the one-element list: `Match_failure` instead of the required exception.',
      'Copying `4.0` into the Caml answer: Caml writes `4.`.'],
    note: NOTE
  };

  M['td-listes-2-1'] = {
    src: 'Lists tutorial · Ex 2.1', title: 'Arithmetic list',
    intro: '<p>Write the function `arith_list n a1 r` that builds the list of the first n terms of the arithmetic sequence with first term `a1` and common difference `r`.</p><p>Application examples:</p>' +
      ex(['# arith_list 12 2 1;;', '- : int list = [2; 3; 4; 5; 6; 7; 8; 9; 10; 11; 12; 13]', '# arith_list 11 0 3;;', '- : int list = [0; 3; 6; 9; 12; 15; 18; 21; 24; 27; 30]']),
    hints: [
      'The result is a list: it is built with `::`, the first term at the head.',
      'A recursive function with two parameters: the number of terms still to produce, and the current term. It stops when nothing is left to produce.',
      'What if `n` is negative? Test it once in a wrapper function.'],
    solution: [
      { t: 'Specifications', html: '<p>`arith_list n a1 r` returns `[a1; a1 + r; a1 + 2r; …]` (n terms). Type: `int -> int -> int -> int list`. `n = 0`: the empty list. `n < 0`: `Invalid_argument` (a choice, the tutorial says nothing).</p>' },
      { t: 'Idea and cases', html: '<p>`build n a` builds the `n` terms starting from the current term `a`:</p><ul><li>`n = 0`: `[]`.</li><li>otherwise: `a` at the head, followed by the `n − 1` terms starting from `a + r`.</li></ul>' +
        '<p>`r` does not change: `build` takes it from the wrapper, without passing it as a parameter.</p>' },
      { t: 'The code and the Caml answer', html: '<p>The two examples of the tutorial, a negative common difference, then n = 0 and n &lt; 0:</p>' + R('td-listes-2-1') }],
    traps: [
      'Adding each term at the end with `@`: the result is right, but each addition copies the whole list.',
      'Forgetting the case `n < 0` without a wrapper: `n` never reaches 0 and the recursion never stops (`Stack overflow`).',
      'Returning one term too many or too few: check the length on the first example (12 terms, from 2 to 13).'],
    note: NOTE
  };

  M['td-listes-2-2'] = {
    src: 'Lists tutorial · Ex 2.2', title: 'Concatenation: append',
    intro: '<p>Write a function that concatenates two lists (the equivalent of the operator `@`).</p><p>Application examples:</p>' +
      ex(['# append [3;1;2] [8;4];;', '- : int list = [3; 1; 2; 8; 4]', '# append [] [9;7;8];;', '- : int list = [9; 7; 8]']),
    hints: [
      'Two lists, but only one is traversed. Which one?',
      'The second list is copied as it is at the end: it is the base case.',
      'For `e :: l` (the first list), `e` stays at the head of the result.'],
    solution: [
      { t: 'Specifications', html: '<p>`append l1 l2` returns the elements of `l1` followed by those of `l2`. Type: `\'a list -> \'a list -> \'a list`.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`l1 = []`: the result is `l2`.</li><li>`l1 = e :: l`: `e` at the head, followed by `append l l2`.</li></ul>' +
        '<p>Only `l1` is matched: no need for the four cases of two lists, `l2` is never taken apart. Cost: the length of `l1`.</p>' },
      { t: 'The code and the Caml answer', html: '<p>The two examples of the tutorial and an empty second list:</p>' + R('td-listes-2-2') },
      { t: '`::` or `@`', html: '<p>`::` adds <strong>one element</strong> at the head of a list; `append` (like `@`) joins <strong>two lists</strong>. So the second parameter must be a list:</p>' + R('td-listes-2-2b', '1-3') }],
    traps: [
      'Taking both lists apart: useless, and elements may get lost.',
      'Writing `l1 :: l2` to concatenate: `::` expects an element on its left, not a list.',
      'Using `@` in the answer: the exercise asks precisely to write it.'],
    note: NOTE
  };

  M['td-listes-3-1'] = {
    src: 'Lists tutorial · Ex 3.1', title: 'Increasing? A list sorted in increasing order',
    intro: '<p>Write a function that tests whether a list is sorted in increasing order.</p>',
    hints: [
      'Looking at the head alone is not enough: two neighbouring elements must be compared. The pattern `e1 :: e2 :: l` gives them.',
      'So there are three cases: empty list, one element, at least two elements.',
      'After comparing `e1` and `e2`, on which list should the function be called again to compare `e2` with the next element?'],
    solution: [
      { t: 'Specifications', html: '<p>`is_increasing lst` returns `true` if each element is less than or equal to the next one. Type: `\'a list -> bool`. Empty and one-element lists are sorted.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`[]` or `[_]`: `true`.</li><li>`e1 :: e2 :: l`: `e1 <= e2`, and the rest `e2 :: l` must be increasing.</li></ul>' +
        '<p>`&&` stops the traversal at the first pair in the wrong order: stop as soon as the answer is known.</p>' },
      { t: 'The code and the Caml answer', html: '<p>With duplicates, a list in the wrong order, characters, the empty list and a single element:</p>' + R('td-listes-3-1') },
      { t: 'The classic error: calling again on `l`', html: R('td-listes-3-1b') +
        '<p>When calling again on `l`, `e2` (3) is never compared with the next element (2): the answer is wrong. And without the one-element case, Caml warns: `Warning 8`.</p>' }],
    traps: [
      'Calling again on `l` instead of `e2 :: l`: one pair of neighbours out of two is never compared.',
      'Forgetting the one-element list: `Warning 8`, then `Match_failure` at run time.',
      'Writing `<` instead of `<=`: `[1; 2; 2; 5]` would be rejected although it is increasing.'],
    note: NOTE
  };

  M['td-listes-3-2'] = {
    src: 'Lists tutorial · Ex 3.2', title: 'Deletion in a sorted list',
    intro: '<p>Write a function that removes the first appearance of an element `x` (if it is present) from a sorted (in increasing order) list `lst`.</p>' +
      '<p><em>Same exercise in the Nov. 2020 midterm (ex. 2, 4 points): “Write the function `delete x list` that removes the first appearance of the value `x` (if it is present) from the sorted (in increasing order) list `list`.”</em></p>',
    hints: [
      'Only the first appearance goes: once `x` is found, the rest of the list is returned as it is.',
      'The list is sorted: if the head is already greater than `x`, `x` is not further on. You can stop.',
      'Three cases for `e :: l`: `e = x`, `e > x`, `e < x`. Only one of them goes on with the recursion.'],
    solution: [
      { t: 'Specifications', html: '<p>`delete x lst` returns `lst` without the first appearance of `x`; if `x` is absent, `lst` unchanged. Type: `\'a -> \'a list -> \'a list`.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`[]`: `[]` (nothing to remove).</li><li>`e = x`: return `l`, the rest without `e`: done.</li>' +
        '<li>`e > x`: `x` is absent (the list is increasing), return the whole list `e :: l`: done.</li><li>`e < x`: keep `e` and go on in `l`.</li></ul>' },
      { t: 'The code and the Caml answer', html: R('td-listes-3-2') +
        '<p>`delete 0 [1; 2; 3]` stops at the first element (1 > 0): the rest is not read.</p>' },
      { t: 'The official 2020 answer key', html: '<p>Same idea, written with guarded patterns:</p>' + R('td-listes-3-2b') }],
    traps: [
      'Removing all the appearances: `delete 4 [1; 2; 2; 3; 4; 4; 4; 5]` must keep two 4.',
      'Writing `e > x -> l`: `e` is lost. The list to return is `e :: l`.',
      'Not stopping when `e > x`: the result is right, but the paper expects the early stop that the sorting allows.'],
    note: NOTE
  };

  M['td-listes-3-3'] = {
    src: 'Lists tutorial · Ex 3.3', title: 'Insertion at the rank i: insert_nth',
    intro: '<p>Write the function `insert_nth x i lst` that inserts the value `x` at the rank `i` in the list `lst`. The function has to raise an exception `Invalid_argument` if `i` is negative or zero, or an exception `Failure` if the list is too short.</p><p>Application examples:</p>' +
      ex(['# insert_nth 0 5 [1; 2; 3; 4; 5; 6; 7; 8; 9];;', '- : int list = [1; 2; 3; 4; 0; 5; 6; 7; 8; 9]', '# insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9];;', '- : int list = [1; 2; 3; 4; 5; 6; 7; 8; 9; 0]',
        '# insert_nth 0 12 [1; 2; 3; 4; 5; 6; 7; 8; 9];;', 'Exception: Failure "out of bound".', '# insert_nth 0 (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9];;', 'Exception: Invalid_arg "negative rank".']) +
      '<p><em>Word for word exercise 4 of the Oct. 2018 midterm and exercise 3 of the Nov. 2020 midterm (5 points each), same examples.</em></p>',
    hints: [
      'The rank is tested once, in a wrapper function: `Invalid_argument` if `i ≤ 0`.',
      'Look at the second example: inserting at the rank 10 in a list of 9 elements is allowed (adding at the end). So the case “rank reached” must come before the case `[]`.',
      'Rank reached (`i = 1`): `x` goes in front of the remaining list, whatever it is, even empty.'],
    solution: [
      { t: 'Specifications', html: '<p>`insert_nth x i lst` returns `lst` with `x` at the rank `i` (the following elements are shifted). Type: `\'a -> int -> \'a list -> \'a list`.</p>' +
        '<ul><li>`i ≤ 0`: `Invalid_argument "negative rank"`.</li><li>`i` > length + 1: `Failure "out of bound"`. The rank length + 1 is valid: it adds at the end.</li></ul>' +
        '<p class="sol-note">Slip in the tutorial (and in the 2018 and 2020 papers): `Invalid_arg` does not exist, Caml prints `Invalid_argument "negative rank"`.</p>' },
      { t: 'Idea and cases', html: '<p>Wrapper: test of `i`. Recursive function `insert i lst`, with `i ≥ 1`:</p>' +
        '<ul><li>`i = 1`: `x :: lst`, whatever `lst` is.</li><li>`[]` with `i > 1`: the list is too short, `failwith`.</li><li>`e :: l`: keep `e`, and `x` goes at the rank `i − 1` of `l`.</li></ul>' },
      { t: 'The code and the Caml answer', html: R('td-listes-3-3') +
        '<p>The guarded pattern `l when i = 1` comes before `[]`: it also matches the empty list.</p>' },
      { t: 'The order of the cases matters', html: '<p>If `[]` is tested first (here in the version with `if`), adding at the end becomes impossible:</p>' + R('td-listes-3-3b') +
        '<p>The official 2018 answer key matches the pair `(i, list)` with `(1, list)` before `(_, [])`:</p>' + R('td-listes-3-3c') }],
    traps: [
      'Handling `[]` before the case `i = 1`: inserting at the end of the list (rank length + 1) raises `Failure`.',
      'Copying `Invalid_arg` from the statement: the constructor is `Invalid_argument`, and the function is called `invalid_arg`.',
      'Testing `i <= 0` in the recursive function: the test is repeated at each call. It is done once, in the wrapper function.'],
    note: NOTE
  };

  M['td-listes-3-4'] = {
    src: 'Lists tutorial · Ex 3.4', title: 'Removing duplicates: remove_duplicates',
    intro: '<p>Write the function `remove_duplicates lst` that takes as parameter:</p><ul><li>a list `lst`</li></ul><p>and that removes all the duplicates from the list `lst`.</p>' +
      ex(['# remove_duplicates [3; 1; 2; 2; 3; 1; 4; 5; 5];;', '- : int list = [3; 1; 2; 4; 5]',
        '# remove_duplicates ["cherry"; "banana"; "apple"; "apple"; "banana"; "cherry"];;', '- : string list = ["cherry"; "banana"; "apple"]',
        '# remove_duplicates [42; 13; 42; 7; 7; 13; 42; 42];;', '- : int list = [42; 13; 7]',
        '# remove_duplicates ["dog"; "cat"; "dog"; "rat"; "rat"; "bat"];;', '- : string list = ["dog"; "cat"; "rat"; "bat"]',
        '# remove_duplicates [true; true; false; true; false; true; false];;', '- : bool list = [true; false]']) +
      '<p><em>Question 2 of the Oct. 2023 exam (ex. 2, 5.5 points), with the same examples. The paper first had `remove_x x lst` written, which removes all the appearances of `x`, and required using it.</em></p>',
    hints: [
      'Look at the examples: which appearance is kept, the first or the last?',
      'The head `e` is kept. Its copies further on in the list must disappear before going on: first write a function that removes all the appearances of a value.',
      'An auxiliary function must be documented: one sentence saying what it does.'],
    solution: [
      { t: 'Specifications', html: '<p>`remove_duplicates lst` returns `lst` where each value appears only once, at the place of its <strong>first</strong> appearance (the examples show it: `[3; 1; 2; 4; 5]`). Type: `\'a list -> \'a list`, the examples mix integers, strings and booleans.</p>' },
      { t: 'Idea and cases', html: '<p>Auxiliary function: `remove_x x lst` removes all the appearances of `x` from `lst` (full traversal). Then:</p>' +
        '<ul><li>`[]`: `[]`.</li><li>`e :: l`: keep `e` at the head, remove all its copies from `l`, and start again on what remains.</li></ul>' },
      { t: 'The code and the Caml answer', html: '<p>The five examples of the tutorial, then the empty list:</p>' + R('td-listes-3-4') },
      { t: 'A version that keeps the last appearance', html: '<p>Removing `e` when it appears again further on also gives a list “without duplicates”, but the order no longer follows the examples:</p>' + R('td-listes-3-4b', '1-2') +
        '<p>At the exam, your function must give exactly the results of the examples.</p>' }],
    traps: [
      'Keeping the last appearance instead of the first: `[2; 3; 1; 4; 5]` instead of `[3; 1; 2; 4; 5]`.',
      'Removing only neighbouring duplicates: that only works for a sorted list.',
      'Forgetting to call `remove_duplicates` again on the cleaned list: the other values keep their duplicates.'],
    note: NOTE
  };

  M['td-listes-3-5'] = {
    src: 'Lists tutorial · Ex 3.5', title: 'Reverse: with @, then with an accumulator',
    intro: '<p>Write a function that reverses a list:</p>',
    questions: ['<b>1.</b> using the operator `@`;', '<b>2.</b> without using the operator `@`.', 'What do you think of the complexity of these two functions?'],
    hints: [
      'With `@`: the reverse of `e :: l` is the reverse of `l`, followed by `e`. Careful, `@` joins two lists.',
      'Without `@`: read the list, pushing each element at the head of a result list passed as a parameter (an accumulator). The first element read ends up at the bottom.',
      'Complexity: how many elements does `l1 @ l2` copy? Add up over all the calls.'],
    solution: [
      { t: 'Version 1: with `@`', html: '<ul><li>`[]`: `[]`.</li><li>`e :: l`: `reverse l @ [e]` (`[e]` is the one-element list).</li></ul>' + R('td-listes-3-5', '0-1') },
      { t: 'Version 2: with an accumulator', html: '<p>`rev acc lst`: `acc` holds the elements already read, the last one read at the head.</p>' +
        '<ul><li>`[]`: everything is read, `acc` is the reversed list.</li><li>`e :: l`: `e` goes at the head of `acc`, go on with `l`.</li></ul>' +
        '<p>The wrapper function `reverse2` starts `rev` with the empty accumulator.</p>' + R('td-listes-3-5', '2-5') },
      { t: 'Complexity', html: '<p>`l1 @ l2` copies the whole list `l1`. In version 1, each level copies the list already reversed: 0 + 1 + … + (n − 1) = n(n − 1)/2 copies for n elements. The cost is <strong>quadratic</strong>: about 200 million copies for 20,000 elements.</p>' +
        '<p>Version 2 does one `::` per element: <strong>linear</strong> cost (n steps). It is the textbook case of the accumulator.</p>' }],
    traps: [
      'Writing `reverse l @ e`: `@` expects two lists, write `[e]`.',
      'Writing `[e] @ reverse l`: the list is not reversed, it is copied in the same order.',
      'Forgetting the wrapper function: the user would have to pass `[]` themselves.',
      'Believing that the accumulator is always better: it reverses the order, which is wanted here but wrong in many exercises.'],
    note: NOTE
  };

  M['td-listes-3-6'] = {
    src: 'Lists tutorial · Ex 3.6', title: 'Positive: fewer than k positive integers',
    questions: [
      '<b>1.</b> Write the function `count_positive lst k` that takes as parameters:<ul><li>a list `lst`</li><li>an integer `k`</li></ul>and that returns `true` if the list `lst` contains strictly fewer than `k` positive integers, `false` otherwise. 0 is not considered positive. The function has to raise an exception `Invalid_argument` if `k` is negative or zero or if `lst` is empty.<p>Application examples:</p>' +
        ex(['# count_positive [] 42;;', 'Exception: Invalid_argument "count_positive: k <= 0 or empty list".', '# count_positive [8; 12; -2; 6; 0] 4;;', '- : bool = true', '# count_positive [8; 12; -2; 6; 0] 3;;', '- : bool = false']),
      '<b>2.</b> The list `lst` is now assumed to be sorted. Write the previous function again.'],
    hints: [
      'Both conditions of the exception are tested once, in a wrapper function.',
      'In the recursive function, decrease `k` at each positive element met. As soon as the kth positive element is found, the answer is `false`: no need to go further.',
      'Question 2: in a list sorted in increasing order, the positive elements are all at the end. Once the elements ≤ 0 are skipped, you only need to know whether fewer than `k` elements remain.'],
    solution: [
      { t: 'Specifications', html: '<p>`count_positive lst k` returns `true` if `lst` contains strictly fewer than `k` integers > 0. `k ≤ 0` or `lst = []`: `Invalid_argument "count_positive: k <= 0 or empty list"` (message of the examples). Type: `int list -> int -> bool`.</p>' },
      { t: 'Question 1: idea and cases', html: '<p>`less k lst`: “does `lst` contain fewer than `k` positive integers?”, with `k ≥ 1`:</p>' +
        '<ul><li>`[]`: `true` (fewer than `k ≥ 1` positive integers: none).</li><li>`e > 0`: if `k = 1`, this positive element is the kth: `false`, stop. Otherwise, look for fewer than `k − 1` positive integers in `l`. Hence `k > 1 && less (k-1) l`.</li><li>`e ≤ 0`: `less k l`.</li></ul>' +
        R('td-listes-3-6', '0-5') },
      { t: 'Question 2: sorted list', html: '<p>`skip` skips the elements ≤ 0. At the first positive element, all the remaining elements are positive: only test whether fewer than `k` remain, with `shorter`, without looking at the signs any more.</p>' + R('td-listes-3-6', '6-10') },
      { t: 'Link with the papers', html: '<p>The Oct. 2022 midterm (ex. 4, 5 points) asked for `less2 p k l1 l2`: fewer than `k` pairs satisfying a predicate, with the same exception on `k` and the same stop `k <> 1 && …`.</p>' }],
    traps: [
      'Counting 0 as positive: the statement excludes it.',
      'Counting all the positive integers, then comparing with `k`: correct, but no stop at the kth positive integer.',
      'Testing `k` and the empty list in the recursive function: the list becomes empty at the end of every traversal, and the exception would be raised wrongly.',
      'Question 2: still testing the sign of each element after the first positive one.'],
    note: NOTE
  };

  M['td-listes-4-1'] = {
    src: 'Lists tutorial · Ex 4.1', title: 'Equality of two lists',
    intro: '<p>Write a function that tests whether two lists are identical.</p>',
    hints: [
      'Two lists traversed at the same time: match the pair `(l1, l2)`.',
      'Four cases: both empty, only the first empty, only the second empty, both non-empty.',
      'Two non-empty lists are equal if their heads are equal and their tails too.'],
    solution: [
      { t: 'Specifications', html: '<p>`equals l1 l2` returns `true` if `l1` and `l2` have the same elements in the same order. Type: `\'a list -> \'a list -> bool`.</p>' },
      { t: 'Idea: the four cases', html: '<ul><li>`([], [])`: `true`.</li><li>`(e1 :: r1, e2 :: r2)`: `e1 = e2 && equals r1 r2` (stop at the first difference).</li><li>`([], _ :: _)` and `(_ :: _, [])`: different lengths, `false`. Both are grouped in `_`, placed last.</li></ul>' },
      { t: 'The code and the Caml answer', html: '<p>Same lists, different lengths, different elements, two empty lists:</p>' + R('td-listes-4-1') },
      { t: 'If cases are forgotten', html: R('td-listes-4-1b') + '<p>Caml reports the missing case at the definition (`Warning 8`), then fails at run time.</p>' }],
    traps: [
      'Forgetting the cases of different lengths: `Warning 8`, then `Match_failure`.',
      'Putting `_ -> false` first: it matches everything, the other cases are no longer used (`Warning 11`).',
      'Simply writing `l1 = l2`: correct in Caml, but the exercise asks for recursion.'],
    note: NOTE
  };

  M['td-listes-4-2'] = {
    src: 'Lists tutorial · Ex 4.2', title: 'Shared: elements common to two increasing lists',
    intro: '<p>Let two lists of elements be increasing. Write a function that builds the list of the elements common to both lists.</p><p>Application examples:</p>' +
      ex(['# shared [1; 3; 6; 6; 8; 9] [2; 5; 6; 6; 8; 9] ;;', '- : int list = [6; 6; 8; 9]', '# shared [1; 2; 3] [3] ;;', '- : int list = [3]', '# shared [1; 6; 6; 7; 7; 7; 7; 9] [2; 5; 6; 6; 6; 8; 9];;', '- : int list = [6; 6; 9]']),
    hints: [
      'If one of the two lists is empty, nothing is common any more.',
      'Compare the two heads. Equal: it is a common element. Different: the smaller cannot be in the other list (it is increasing).',
      'When the heads differ, only one list moves forward: the other one is passed <strong>whole</strong> to the recursive call.'],
    solution: [
      { t: 'Specifications', html: '<p>`shared l1 l2` (two increasing lists) returns the increasing list of the common elements; a duplicate is kept as many times as it is in both lists (`[6; 6; 9]` in the third example). Type: `\'a list -> \'a list -> \'a list`.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`([], _)` or `(_, [])`: `[]`.</li><li>`e1 = e2`: `e1` at the head, and both lists move forward.</li>' +
        '<li>`e1 < e2`: `e1` is not in `l2` (all its elements are ≥ `e2`), move forward in `l1`: `shared r1 l2`.</li><li>otherwise: move forward in `l2`: `shared l1 r2`.</li></ul>' +
        '<p>Each call removes at least one head: the cost is the sum of the lengths.</p>' },
      { t: 'The code and the Caml answer', html: '<p>The three examples of the tutorial, then an empty list:</p>' + R('td-listes-4-2') }],
    traps: [
      'Calling again on `r1 r2` when the heads differ: the head of the other list, which may be common further on, is lost.',
      'Searching each element of `l1` in `l2` with a full search: the order is not used, and duplicates are counted wrongly.',
      'Forgetting that both lists are traversed together: match the pair `(l1, l2)`.'],
    note: NOTE
  };

  M['td-listes-4-3'] = {
    src: 'Lists tutorial · Ex 4.3 (bonus)', title: 'Sublist: number of appearances of a sublist',
    intro: '<p>Write a function that takes two lists `slst` and `lst` as parameters and returns the number of times the list `slst` is present in the list `lst`.</p>' +
      ex(['# sublist [1; 2] [1; 2] ;;', '- : int = 1', '# sublist [1; 2] [1; 1; 2; 3; 3; 1; 2; 3] ;;', '- : int = 2', '# sublist [1; 2] [2; 1] ;;', '- : int = 0', '# sublist [] [1; 2];;', '- : int = 0']) +
      '<p><em>It is the Mystery of the Oct. 2019 midterm (ex. 5, 2 points): the `mystery` function of the paper computes this number, with the first three examples.</em></p>',
    hints: [
      'Split the problem: first a function that tells whether `slst` is a <strong>beginning</strong> (prefix) of a list.',
      'Then count the positions of `lst` where `slst` starts: at each position, the remaining list is `e :: l`.',
      'The last example: `sublist [] [1; 2]` is 0. Without a special case, the empty list would be a beginning of every position.'],
    solution: [
      { t: 'Specifications', html: '<p>`sublist slst lst` returns the number of positions of `lst` where a sequence of consecutive elements equal to `slst` starts; 0 if `slst` is empty. Type: `\'a list -> \'a list -> int`.</p>' },
      { t: 'Idea', html: '<p>`prefix (a, b)` tells whether `a` is a beginning of `b`: `([], _)` → `true`; `(_, [])` → `false`; two equal heads and `prefix` of the tails.</p>' +
        '<p>`count lst` adds 1 for each position `e :: l` where `prefix (slst, e :: l)` is true. The wrapper function handles `slst = []` apart.</p>' },
      { t: 'The code and the Caml answer', html: R('td-listes-4-3') +
        '<p>`sublist [1; 1] [1; 1; 1]` is 2: two overlapping appearances are counted.</p>' },
      { t: 'The 2019 Mystery', html: '<p>The function of the paper is the same, without the case of the empty list:</p>' + R('td-listes-4-3b') +
        '<p>It answers 2 for `[]`: an answer to the tutorial must handle the empty list apart to give 0.</p>' }],
    traps: [
      'Forgetting the case `slst = []`: the answer is then the length of `lst`, not 0.',
      'After an appearance, skipping the whole sublist: overlapping appearances are no longer counted.',
      'Comparing only the heads: `prefix` must compare all the elements of `slst`.'],
    note: NOTE
  };

  M['td-listes-5-1'] = {
    src: 'Lists tutorial · Ex 5.1', title: 'Association: assoc k lst',
    intro: '<p>Write the function `assoc k lst` where `lst` is a list of pairs (key, value) sorted in increasing order with respect to keys (key). Keys are non-zero naturals. The function returns the value (value) corresponding to the key (key) `k`. It raises an exception if `k` is not valid or if no pair has the key `k`.</p><p>Application examples:</p>' +
      ex(['# assoc 5 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;', '- : string = "five"', '# assoc 4 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;', 'Exception: Failure "not found".',
        '# assoc (-1) [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")];;', 'Exception: Invalid_argument "k not a natural".']) +
      '<p><em>Word for word exercise 3 of the Nov. 2017 midterm (4 points) and of the April 2019 midterm (S1#, 5 points), same examples.</em></p>',
    hints: [
      'Two exceptions, as in the examples: invalid `k` (`Invalid_argument`, tested once in the wrapper) and missing key (`Failure`).',
      'The elements of the list are pairs: the pattern `(key, value) :: l` opens them directly.',
      'The list is sorted by increasing keys: as soon as a key is greater than `k`, `k` is not further on.'],
    solution: [
      { t: 'Specifications', html: '<p>`assoc k lst` returns the value corresponding to the key `k`. `k ≤ 0`: `Invalid_argument "k not a natural"` (keys are non-zero naturals). Missing key: `Failure "not found"`. Type: `int -> (int * \'a) list -> \'a`.</p>' },
      { t: 'Idea and cases', html: '<p>Wrapper: test of `k`. Then `search` reads the list:</p>' +
        '<ul><li>`[]`: `failwith "not found"`.</li><li>`key = k`: `value`.</li><li>`key > k`: the key is missing (sorted list), `failwith "not found"` without going further.</li><li>otherwise: `search l`.</li></ul>' +
        '<p>`k` does not change: `search` only has the list as parameter.</p>' },
      { t: 'The code and the Caml answer', html: R('td-listes-5-1') +
        '<p>The official April 2019 answer key has the same structure (it writes `let rec assoc`, a useless `rec`: only `search` is recursive).</p>' }],
    traps: [
      'Testing `k` in the recursive function: the test is done again for each element.',
      'Forgetting the stop `key > k`: the result is still right, but the sorting is not used (that is marked).',
      'Returning the pair instead of the value: the result must be `"five"`, not `(5, "five")`.',
      'Accepting `k = 0`: keys are non-zero, 0 is not valid.'],
    note: NOTE
  };

  M['td-listes-5-2'] = {
    src: 'Lists tutorial · Ex 5.2', title: 'Flattened: flatten',
    intro: '<p>Write the Caml function `flatten` that "flattens" a list of lists: all the sublists are concatenated together.</p><p>Application examples:</p>' +
      ex(['# flatten [[1;2]; [3]; [4;5;6]];;', '- : int list = [1; 2; 3; 4; 5; 6]', "# flatten [[(1,'a'); (2,'b')]; [(3,'c'); (4,'d'); (5,'e')]; []];;", "- : (int * char) list = [(1, 'a'); (2, 'b'); (3, 'c'); (4, 'd'); (5, 'e')]"]),
    hints: [
      'The elements of the list are lists themselves: the pattern `l :: others` gives the first sublist `l`.',
      'Flattening `l :: others` means putting `l` in front of the flattening of `others`.',
      'To join two lists without `@`, reuse `append` (exercise 2.2).'],
    solution: [
      { t: 'Specifications', html: '<p>`flatten lst` returns the concatenation, in order, of the lists of `lst`. Type: `\'a list list -> \'a list`.</p>' },
      { t: 'Idea and cases', html: '<ul><li>`[]`: `[]`.</li><li>`l :: others`: `append l (flatten others)`.</li></ul><p>`append` is the function of exercise 2.2: at the exam, a function already written can be reused, and an auxiliary function must be documented.</p>' },
      { t: 'The code and the Caml answer', html: '<p>The two examples of the tutorial, then empty sublists and the empty list:</p>' + R('td-listes-5-2') },
      { t: 'Without an auxiliary function', html: '<p>The first sublist can also be taken apart in the pattern:</p>' + R('td-listes-5-2b') }],
    traps: [
      'Writing `l :: flatten others`: it builds a list of lists, not a flattened list (type error).',
      'Forgetting empty sublists: they must vanish without error (second example).',
      'Using `@` when exercise 2.2 has just written it: prefer `append`.'],
    note: NOTE
  };

  M['td-listes-6-1'] = {
    src: 'Lists tutorial · Ex 6.1', title: 'GCD through prime factorisation',
    intro: '<p>The gcd of two integers `u` and `v` can be computed as follows:</p><ul><li>by decomposing the numbers `u` and `v` into prime factors,</li><li>then by computing the product of the common factors.</li></ul>' +
      '<p>Write the function `gcd` (Greatest Common Divisor) that computes the gcd of two integers by computing the product of their common factors.</p><p>Application examples:</p>' +
      ex(['# gcd 45 150;;', '- : int = 15', '# gcd 7 100;;', '- : int = 1']),
    hints: [
      'Three sub-problems: the list of the prime factors of an integer, the factors common to two lists, the product of a list. The last two are already written (exercises 4.2 and 1.1).',
      'Factorisation: try the divisors `d` from 2. If `d` divides `n`, keep `d` and go on with `n / d` (the same `d` may come back). Otherwise, move on to `d + 1`.',
      'The factors come out in increasing order: `shared` can use them directly.'],
    solution: [
      { t: 'Specifications', html: '<p>`gcd u v` returns the gcd of two positive integers. Type: `int -> int -> int`. `u ≤ 0` or `v ≤ 0`: `Invalid_argument` (a choice).</p>' },
      { t: 'Prime factorisation', html: '<p>`factors d n` (with `d` the divisor being tried):</p><ul><li>`n = 1`: `[]`, everything is decomposed.</li><li>`d` divides `n`: `d :: factors d (n / d)`.</li><li>otherwise: `factors (d + 1) n`.</li></ul>' +
        '<p>A `d` that divides `n` is necessarily prime: its own factors, smaller, have already been removed. The wrapper `prime_factors` starts `factors 2 n`.</p>' },
      { t: 'Putting it together', html: '<p>`gcd u v = product (shared (prime_factors u) (prime_factors v))`: `shared` (ex. 4.2) keeps the common factors with their repetitions, `product` (ex. 1.1) multiplies them, and gives 1 if no factor is common.</p>' + R('td-listes-6-1') }],
    traps: [
      'Moving `d` forward even when it divides `n`: a repeated factor (5 × 5 in 150) would only be counted once.',
      'Returning 0 as the product of the empty list: `gcd 7 100` must be 1.',
      'Intersecting with a simple search: repetitions (2 × 2…) would be counted wrongly. `shared` on sorted lists counts them right.'],
    note: NOTE
  };

  M['td-listes-6-2'] = {
    src: 'Lists tutorial · Ex 6.2 (bonus)', title: 'The “look and say” sequence',
    intro: '<p>Consider the following sequence:</p>' + ml(['line 0 : 1          contains 1 "1"', 'line 1 : 11         contains 2 "1"', 'line 2 : 21         contains 1 "2" followed by 1 "1"', 'line 3 : 1211       contains 1 "1" followed by 1 "2" followed by 2 "1"', 'line 4 : 111221     ...', 'line 5 : 312211', 'line 6 : 13112221', '...']) +
      '<p>Write a function `sequence` that returns the nth line of this sequence, as a list of integers.</p><p>Application examples:</p>' +
      ex(['# sequence 5 ;;', '- : int list = [3; 1; 2; 2; 1; 1]', '# sequence 0 ;;', '- : int list = [1]']),
    hints: [
      'Split the problem: a function `next` that computes the line after a given line, then `sequence n` that applies it n times to `[1]`.',
      'For `next`: read the head `e`, then count how many times `e` is repeated at the start of the rest. This count is an extra parameter.',
      'When the repetition stops, write the count then `e`, and start `next` again on what remains.'],
    solution: [
      { t: 'Specifications', html: '<p>`sequence n` returns line n (n ≥ 0); `next line` returns the line that describes `line`. Types: `int -> int list` and `int list -> int list`. `n < 0`: `Invalid_argument` (a choice).</p>' },
      { t: 'The next line', html: '<p>`next (e :: l)` starts `run 1 l`: `run n r` knows that `e` has already been seen `n` times.</p>' +
        '<ul><li>`r` starts with `e`: `run (n+1)` on the rest.</li><li>otherwise: the repetition is over, write `n :: e ::`, followed by `next r`.</li></ul>' + R('td-listes-6-2', '0-1') },
      { t: 'The nth line', html: '<p>`sequence 0 = [1]` and `sequence n = next (sequence (n-1))`:</p>' + R('td-listes-6-2', '2-5') +
        '<p>`sequence 6` does give line 6 of the statement, 13112221.</p>' }],
    traps: [
      'Writing `e` then the count: the line reads “one 1, two 2…”, the count comes first.',
      'Counting all the appearances of `e` in the line instead of the consecutive repetitions: 1211 contains three 1, but in two groups.',
      'Forgetting the base case `sequence 0 = [1]`.'],
    note: NOTE
  };

  /* ===================== Higher-order tutorial (05, “td Caml 2”: “Functionals” or “higher-order functions”) ===================== */
  M['td-os-1-1'] = {
    src: 'Higher-order tutorial · Ex 1.1', title: 'Try those examples: a function is a value',
    intro: '<p>Evaluate each phrase, in order, before looking at the Caml answer (type your answer: type and value).</p>' + R('td-os-1-1', null, { mode: 'guess', title: 'Try those examples' }),
    hints: [
      '`function x -> x + 1` is a value like any other: a function without a name. It can be named with `let`, or applied directly.',
      '`times` expects a first integer and returns… a function that expects the second one. What is `times 2`?',
      '`double_fun f x = double (f x)`: `f` is a parameter that must be a function. Its type follows from how it is used: its result is passed to `double`.'],
    solution: [
      { t: 'Anonymous functions', html: '<p>`let succ = function x -> x + 1` is the same definition as `let succ x = x + 1`: `val succ : int -> int = <fun>`. `(function x -> x + 1) 5` applies the function without naming it: 6.</p>' },
      { t: 'Several parameters = a function that returns a function', html: '<p>`times` is `function x -> function y -> x * y`: applied to `x`, it returns `function y -> x * y`. Its type `int -> int -> int` reads `int -> (int -> int)`.</p>' +
        '<p>`let double = times 2` is a <strong>partial application</strong>: one parameter is missing, the result is a function `int -> int`. `double 15` is 30.</p>' },
      { t: 'A function as a parameter', html: '<p>`double_fun f x = double (f x)`: `f` is applied to `x`, and its result is doubled, so it is an `int`. The type of `x` is not constrained: `\'a`. Hence `(\'a -> int) -> \'a -> int`.</p>' +
        '<ul><li>`double_fun succ 2` = `double (succ 2)` = 6.</li><li>`double_fun (function x -> x + 1)`: `x` is missing, the result is a function `int -> int`.</li><li>`double_succ = double_fun succ`: same thing, with a name; `double_succ 2` is 6.</li></ul>' }],
    traps: [
      'Answering a value for `double_fun (function x -> x + 1)`: one parameter is missing, it is a function (`- : int -> int = <fun>`).',
      'Writing `function x y -> …`: `function` has only one parameter. Write `function x -> function y -> …`.',
      'Forgetting the line `val … = <fun>` of a definition: it is part of the Caml answer.'],
    note: NOTE
  };

  M['td-os-1-2'] = {
    src: 'Higher-order tutorial · Ex 1.2', title: 'Sigma: generalising a sum',
    questions: [
      '<b>1.</b> Write a function that computes the following sum (without using multiplication…): Σ<sub>i=0</sub><sup>n</sup> i',
      '<b>2.</b> Write a function that computes the following sum of squares: Σ<sub>i=0</sub><sup>n</sup> i²',
      '<b>3.</b> With a higher-order function, the computation of a sum can be generalised to any function. Write a function that computes, for any function f: Σ<sub>i=0</sub><sup>n</sup> f(i)'],
    hints: [
      'Σ<sub>i=0</sub><sup>n</sup> i = n + Σ<sub>i=0</sub><sup>n−1</sup> i: the recursion is on `n`, and stops at 0.',
      'Questions 1 and 2: only the added term changes (`n`, then `n * n`). That term becomes a parameter in question 3.',
      'Question 3: `f` is a function `int -> int` passed as a parameter; the added term is `f n`. Do not forget the term `f 0`.'],
    solution: [
      { t: 'Questions 1 and 2', html: '<ul><li>`n ≤ 0`: 0 (the term i = 0 is 0).</li><li>otherwise: `n + sigma (n-1)`, then `n * n + sigma_squares (n-1)`.</li></ul>' + R('td-os-1-2', '0-4') },
      { t: 'Question 3: the function as a parameter', html: '<p>`sum_f f n` = f(0) + f(1) + … + f(n). The term i = 0 is no longer necessarily 0: the recursion stops below 0, and `f 0` is counted.</p>' + R('td-os-1-2', '5-8') +
        '<p>Type: `(int -> int) -> int -> int`. The first parameter is a function: it is a higher-order function. With `function i -> 2 * i + 1`, the odd numbers are added: 1 + 3 + 5 + 7 + 9 = 25.</p>' },
      { t: 'Getting questions 1 and 2 back', html: '<p>A partial application of `sum_f` gives the sum of squares again:</p>' + R('td-os-1-2', '9-10') }],
    traps: [
      'Question 3: stopping at `n = 0` with the result 0: the term `f 0` is forgotten (wrong for `function i -> 2 * i + 1`).',
      'Question 1: writing n(n + 1)/2: the statement forbids multiplication.',
      'Writing `sum_f f n-1`: Caml reads `(sum_f f n) - 1`, and the recursion never stops. Write `sum_f f (n-1)`.'],
    note: NOTE
  };

  M['td-os-1-3'] = {
    src: 'Higher-order tutorial · Ex 1.3 (bonus)', title: 'Loop and find_power',
    intro: '<p>predicate = boolean function representing a property</p>',
    questions: [
      '<b>1.</b> Write a function `loop` that, applied to a predicate `p`, a function `f` and an integer `x`, returns the value fⁿ(x) where n is the smallest integer such that p(fⁿ(x)) = True.<br>Hint: fⁿ(x) is f applied n times to x: fⁿ(x) = f(f(f(… f(x) …))).',
      '<b>2.</b> Use `loop` to define a function `find_power` that, given two integers `x` and `n`, returns the first power of `x` greater than or equal to `n`.'],
    hints: [
      'n may be 0: if `p x` is already true, the answer is `x`.',
      'Otherwise, the answer is the one of `loop` starting from `f x`: the predicate and the function do not change.',
      'For `find_power`, start from x⁰ = 1, and choose `p` (“is ≥ n”) and `f` (“multiply by x”) with anonymous functions. What happens if x is 0 or 1?'],
    solution: [
      { t: 'Question 1', html: '<ul><li>`p x` true: `x` (n = 0).</li><li>otherwise: `loop p f (f x)`.</li></ul>' + R('td-os-1-3', '0-3') +
        '<p>Type: `(\'a -> bool) -> (\'a -> \'a) -> \'a -> \'a`. Nothing forces `x` to be an integer: the last example moves pairs of Fibonacci numbers forward until one goes over 50.</p>' },
      { t: 'Question 2', html: '<p>The powers of `x` are 1, x, x², …: start from 1, `f` multiplies by `x`, `p` tests “≥ n”. For x &lt; 2, the powers do not grow (0, 0… or 1, 1…): `loop` would never stop. The wrapper rejects it (a choice: `Invalid_argument`).</p>' + R('td-os-1-3', '4-8') +
        '<p class="sol-note">The statement does not say whether x⁰ = 1 counts: here it does, so `find_power 10 1` is 1.</p>' }],
    traps: [
      'Applying `f` before testing `p`: the case n = 0 is missed.',
      'Writing `find_power` with its own recursion: the question asks to use `loop`.',
      'Forgetting x = 0 or x = 1: the loop never ends.'],
    note: NOTE
  };

  M['td-os-2-1'] = {
    src: 'Higher-order tutorial · Ex 2.1', title: 'map',
    intro: '<p>For each function, give several examples of use.</p><p>Write the function `map` that applies a given function `f` to all the elements of a list and builds the list of the returned values.</p><p>`map f [a1; ...; an]` returns `[f a1; f a2; ...; f an]`</p>',
    hints: [
      'The result is a list of the same length: one element produced for each element read.',
      'For `e :: l`: the head of the result is `f e`, the rest is `map f l`.',
      'For the examples: try a function that changes the type (`int` to `bool` or `string`).'],
    solution: [
      { t: 'Specifications', html: '<p>`map f lst` returns the list of the `f e` for the `e` of `lst`, in order. Type: `(\'a -> \'b) -> \'a list -> \'b list`: the type of the elements may change.</p>' },
      { t: 'The code and some examples', html: '<ul><li>`[]`: `[]`.</li><li>`e :: l`: `f e :: map f l`.</li></ul>' + R('td-os-2-1') +
        '<p>`map string_of_int` passes a predefined function as a parameter, without `function` (at the exam, `string_of_int` is only allowed if the statement gives it). The last example but one opens a pair in the anonymous function.</p>' }],
    traps: [
      'Writing `f e @ map f l`: `f e` is an element, not a list.',
      'Forgetting to pass `f` to the recursive call: `map l` is a type error.',
      'Giving a type `(\'a -> \'a) -> …`: nothing forces `f` to keep the type.'],
    note: NOTE
  };

  M['td-os-2-2'] = {
    src: 'Higher-order tutorial · Ex 2.2', title: 'for_all',
    intro: '<p>predicate = boolean function representing a property</p><p>Write the function `for_all` that checks whether all the elements of a list `lst` satisfy the given predicate `p`.</p>',
    hints: [
      'What is “all the elements of the empty list satisfy p”?',
      'As soon as an element does not satisfy `p`, the answer is known.',
      '`&&` does not evaluate its right-hand side if the left one is false.'],
    solution: [
      { t: 'Specifications', html: '<p>`for_all p lst` returns `true` if `p e` is true for each `e` of `lst`. Type: `(\'a -> bool) -> \'a list -> bool`.</p>' },
      { t: 'The code and some examples', html: '<ul><li>`[]`: `true` (no element contradicts `p`).</li><li>`e :: l`: `p e && for_all p l`, which stops at the first false element.</li></ul>' + R('td-os-2-2') }],
    traps: [
      'Returning `false` for the empty list: `for_all p []` is `true`.',
      'Writing `for_all p l && p e`: the answer is the same, but everything is read before testing `e`.',
      'Writing `if p e then for_all p l else false`: correct, but it is `p e && for_all p l`.'],
    note: NOTE
  };

  M['td-os-2-3'] = {
    src: 'Higher-order tutorial · Ex 2.3', title: 'exists',
    intro: '<p>Write the function `exists` that checks whether at least one element of a list `lst` satisfies the given predicate `p`.</p>',
    hints: [
      'What is “an element of the empty list satisfies p”?',
      'As soon as an element satisfies `p`, the answer is known.',
      'It is the mirror image of `for_all`: swap `true` / `false` and `&&` / `||`.'],
    solution: [
      { t: 'Specifications', html: '<p>`exists p lst` returns `true` if at least one `e` of `lst` satisfies `p`. Type: `(\'a -> bool) -> \'a list -> bool`.</p>' },
      { t: 'The code and some examples', html: '<ul><li>`[]`: `false`.</li><li>`e :: l`: `p e || exists p l`, which stops at the first true element.</li></ul>' + R('td-os-2-3') }],
    traps: [
      'Returning `true` for the empty list.',
      'Reading the whole list before answering: `||` lets you stop at the first element that fits.'],
    note: NOTE
  };

  M['td-os-2-4'] = {
    src: 'Higher-order tutorial · Ex 2.4', title: 'A list sorted by a given order: is_sorted',
    intro: '<p>Write the function `is_sorted order lst` that takes as parameters:</p><ul><li>a list `lst`</li><li>a two-argument function `order` returning a boolean value</li></ul><p>and that checks that the list `lst` is sorted according to the order given by the function `order`.</p>' +
      ex(['# is_sorted (function x -> function y -> x < y) [1; 2; 3; 4; 5];;', '- : bool = true', '# is_sorted (function x -> function y -> x > y) [5; 4; 3; 2; 1];;', '- : bool = true',
        '# is_sorted (function x -> function y -> x < y) [1; 3; 2; 4; 5];;', '- : bool = false', '# is_sorted (function x -> function y -> x = y) [7; 7; 7; 7];;', '- : bool = true']),
    hints: [
      'It is the exercise “Increasing?” of the lists tutorial, where the comparison `<=` is replaced by `order`.',
      'Three cases: empty, one element, at least two elements `e1 :: e2 :: l`.',
      '`order e1 e2` is a boolean: `order` is applied to two parameters, one after the other.'],
    solution: [
      { t: 'Specifications', html: '<p>`is_sorted order lst` returns `true` if `order e1 e2` is true for each pair of neighbouring elements. Type: `(\'a -> \'a -> bool) -> \'a list -> bool`.</p>' },
      { t: 'Idea and code', html: '<ul><li>`[]` or `[_]`: `true`.</li><li>`e1 :: e2 :: l`: `order e1 e2 && is_sorted order (e2 :: l)`.</li></ul>' + R('td-os-2-4') +
        '<p>The four examples of the tutorial match. The parameter `order` is passed as it is to the recursive call.</p>' },
      { t: 'Link with the papers', html: '<p>The Oct. 2024 exam (ex. 2, 9 points) asked for `insert_x x order lst` then `insertion_sort order lst`, with the same order function written `(function x -> function y -> x < y)`; so did the April 2019 midterm (S1#), with the comparison as the last parameter.</p>' }],
    traps: [
      'Forgetting to pass `order` to the recursive call: `is_sorted (e2 :: l)` is a type error.',
      'Calling again on `l` instead of `e2 :: l`: one pair of neighbours out of two is never tested.',
      'Writing `order (e1, e2)`: `order` takes two parameters, not a pair.'],
    note: NOTE
  };

  M['td-os-2-5'] = {
    src: 'Higher-order tutorial · Ex 2.5', title: 'find: the first element that satisfies a predicate',
    intro: '<p>List searching</p><p>Change the function `exists` so that it returns the first element of the list that satisfies the predicate.</p>',
    hints: [
      'The result is no longer a boolean but an element: what should be returned when no element fits?',
      'There is no “default” value of type `\'a`: it needs an exception.',
      'As soon as `p e` is true, return `e`.'],
    solution: [
      { t: 'Specifications', html: '<p>`find p lst` returns the first element of `lst` that satisfies `p`. None: `Failure "find: not found"` (a choice: the tutorial says nothing). Type: `(\'a -> bool) -> \'a list -> \'a`.</p>' },
      { t: 'The code and some examples', html: '<ul><li>`[]`: `failwith`.</li><li>`p e`: `e`.</li><li>otherwise: `find p l`.</li></ul>' + R('td-os-2-5') }],
    traps: [
      'Returning `0` or `false` when nothing fits: the type would no longer be polymorphic, and the answer would be ambiguous.',
      'Going on after finding it: the first element is the one asked for.'],
    note: NOTE
  };

  M['td-os-2-6'] = {
    src: 'Higher-order tutorial · Ex 2.6', title: 'filter',
    intro: '<p>Write a function that, from a list, builds a new list containing the elements that satisfy a given predicate `p`.</p>',
    hints: [
      'Full traversal: each element is kept or not, then the traversal goes on.',
      'Kept: it stays at the head, in front of the filtering of the rest. The order of the list is preserved.'],
    solution: [
      { t: 'Specifications', html: '<p>`filter p lst` returns the elements of `lst` that satisfy `p`, in order. Type: `(\'a -> bool) -> \'a list -> \'a list`.</p>' },
      { t: 'The code and some examples', html: '<ul><li>`[]`: `[]`.</li><li>`p e`: `e :: filter p l`.</li><li>otherwise: `filter p l`.</li></ul>' + R('td-os-2-6', '0-3') },
      { t: 'Link with the papers', html: '<p>Question 1 of the Oct. 2023 exam (`remove_x x lst`: remove all the appearances of `x`) is a `filter` with the predicate “different from x”:</p>' + R('td-os-2-6', '4-5') +
        '<p>At the exam, `filter` is not predefined: write it before using it, or write `remove_x` directly.</p>' }],
    traps: [
      'Adding the kept elements at the end with `@`: costly, and useless to keep the order.',
      'Stopping at the first rejected element: all the elements must be examined.'],
    note: NOTE
  };

  M['td-os-2-7'] = {
    src: 'Higher-order tutorial · Ex 2.7', title: 'partition',
    intro: '<p>Write a function that, from a list `l`, builds a pair of lists `(l1, l2)`, where `l1` is the list of the elements that satisfy a given predicate `p`, and `l2` the list of the elements that do not satisfy `p`.</p><p>Bonus: Keep the initial order of the elements in each of the two resulting lists.</p>',
    hints: [
      'The result is a pair of lists. For the empty list: `([], [])`.',
      'For `e :: l`: get the pair of the rest with `let (yes, no) = partition p l in`, then put `e` in the right list.',
      'For the bonus: when `e` is added at the head of the partition of the rest, is the order kept?'],
    solution: [
      { t: 'Specifications', html: '<p>`partition p lst` returns `(l1, l2)`: `l1` the elements that satisfy `p`, `l2` the others. Type: `(\'a -> bool) -> \'a list -> \'a list * \'a list`.</p>' },
      { t: 'Pure recursion: the order is kept', html: '<p>The rest is partitioned first, then `e` goes at the head of the right list. Since `e` comes before the elements of the rest, the initial order is kept: that is the bonus.</p>' + R('td-os-2-7', '0-3') },
      { t: 'With two accumulators: the order is reversed', html: '<p>When “moving forward” with two accumulators, each element is pushed on top of those already read: both lists come out reversed.</p>' + R('td-os-2-7', '4-5') +
        '<p>This is the warning of the Moodle page “Advice on lists”: the accumulator “most of the time is not necessary” and may give a result different from the one asked for.</p>' },
      { t: 'Link with the papers', html: '<p>The Mystery of the Nov. 2021 midterm (ex. 4, 4 points) partitioned two interleaved lists according to a predicate, with a function `aux p e (r1, r2)` that puts `e` in the right list of the pair.</p>' }],
    traps: [
      'Calling `partition p l` twice (once for each list of the pair): the time doubles with each element. A single call, opened with `let (yes, no) = … in`.',
      'Using accumulators without reversing the lists: the order is reversed, the bonus is lost.',
      'Writing `(e :: yes, no)` in both cases: `e` must go into `no` when `p e` is false.'],
    note: NOTE
  };

  M['td-os-2-8'] = {
    src: 'Higher-order tutorial · Ex 2.8', title: 'for_all2 and almost',
    intro: '<p>On two lists</p>',
    questions: [
      '<b>1.</b> Write the Caml function `for_all2` with the following specifications:<ul><li>It takes a two-argument boolean function (a predicate): `p`, and two lists: [a1; a2; ⋯; an] and [b1; b2; ⋯; bn], as parameters.</li><li>It checks whether all pairs of elements ai bi satisfy the predicate `p`.</li><li>If a pair such that `p ai bi` is false is found, it returns false. Otherwise, it raises `Invalid_argument` if the two lists have different lengths.</li></ul>',
      '<b>2.</b> Use the function `for_all2` to define a function that verifies whether two integer lists are "quasi identical": difference between the values at the same place can not exceed 1. If no pair with a difference over one has been found and if the two lists have different lengths, an exception is raised.<p>Examples of utilisation:</p>' +
        ex(['# almost [1; 2; 3; 4; 5] [1; 3; 2; 4; 6];;', '- : bool = true', '# almost [1; 2; 3; 4; 5] [1; 4; 3; 4; 5];;', '- : bool = false'])],
    hints: [
      'Two lists traversed together: match the pair `(l1, l2)`, with the four cases.',
      '“If a pair is false, it returns false. Otherwise… exception”: with `p e1 e2 && …`, a false pair stops the traversal <strong>before</strong> the end of the shorter list is reached.',
      'Question 2: the difference does not exceed 1, without `abs` (predefined): two comparisons. The predicate is written `function x -> function y -> …`.'],
    solution: [
      { t: 'Specifications', html: '<p>`for_all2 p l1 l2`: `true` if `p ai bi` is true for all pairs; `false` as soon as a pair is false; `Invalid_argument` if the lengths differ and no false pair was found before. Type: `(\'a -> \'b -> bool) -> \'a list -> \'b list -> bool`.</p>' },
      { t: 'Idea: the four cases', html: '<ul><li>`([], [])`: `true`.</li><li>`(e1 :: r1, e2 :: r2)`: `p e1 e2 && for_all2 p r1 r2`. If `p e1 e2` is false, the recursion is not evaluated: that is the “otherwise” of the statement.</li><li>only one empty list: `invalid_arg`.</li></ul>' },
      { t: 'The code and the Caml answer', html: R('td-os-2-8') +
        '<p>`almost [1; 9] [1; 2; 3]` returns `false` without an exception: the pair (9, 2) is false before the end of the shorter list. The last phrase shows that the two lists may have different types.</p>' },
      { t: 'If the rest is tested first', html: '<p>Writing `for_all2 p r1 r2 && p e1 e2`, the end of the lists is reached before the false pair is tested: the exception is raised whereas the statement asks for `false`.</p>' + R('td-os-2-8b') },
      { t: 'In the papers', html: '<p>Nov. 2017 midterm (ex. 4, 5 points) and Oct. 2019 midterm (ex. 4, 5 points), same statement. The official 2019 answer key writes the predicate `let near x y = (y - 2 < x) && (x < y + 2)` and the message `"for_all2: different lengths"`.</p>' }],
    traps: [
      'Testing the lengths first (with a `length` function): the exception would be raised although a false pair exists, against the statement.',
      'Using `abs`: a predefined function, forbidden. Write `x - y <= 1 && y - x <= 1`.',
      'Writing `almost` with its own recursion: the question asks to use `for_all2`.',
      'Forgetting the cases of different lengths: `Warning 8`, then `Match_failure` instead of `Invalid_argument`.'],
    note: NOTE
  };

  M['td-os-3-1'] = {
    src: 'Higher-order tutorial · Ex 3.1 (bonus)', title: 'Recursive processing: process_list',
    intro: '<p>Many recursive (non tail-recursive) processings of a list can be generalised by the following function:</p>' +
      ml(['let rec process_list f init =', '  function', '     []       -> init', '   | e :: lst -> f e (process_list f init lst) ;;']) +
      '<ul><li>For an empty list, the function returns a stopping value: `init`</li><li>For a list of the form `e::lst`, the result depends on `e` and on the processing of the list `lst`.</li></ul>' +
      '<p>The function `process_list` can be used to define new functions, without recursion. For example, the function that computes the length of a list is defined by:</p>' +
      ex(['# let length lst = process_list (function e -> function call -> 1 + call) 0 lst ;;', "val length : 'a list -> int = <fun>"]),
    questions: [
      '<b>1.</b> (a) What is the type of `process_list`? (b) What does `process_list f init [e1; ...; en]` compute?',
      '<b>2.</b> Use the function `process_list` to define, without recursion, the following functions:<ul><li>(a) `sum` computes the sum of the elements of a list.</li><li>(b) `concatenate` takes a list of strings as parameter and returns the string obtained by concatenating the strings of the list one after the other, in order. Give examples of applications of `concatenate`.</li><li>(c) `append` concatenates two lists.</li><li>(d) `map`, applied to `f` and [e1; …; en], computes [f(e1); …; f(en)].</li><li>(e) `for_all`, applied to a boolean function `p` and a list, checks whether all the elements of the list satisfy the predicate `p`.</li><li>(f) Bonus: `sum_list` takes a list of real functions [f1; …; fn] as parameter and returns the function f1 + ⋯ + fn. Give examples of applications of `sum_list`. Give examples of applications of results of applications of `sum_list`.</li></ul>'],
    hints: [
      'Type: `init` is the result for `[]`, so it has the type of the result (`\'b`). `f` gets an element (`\'a`) and the result for the rest (`\'b`), and returns a `\'b`.',
      'Unfold `process_list f init [e1; e2]`: `f e1 (f e2 init)`. For each function asked for, find the value for `[]` (`init`) and how to combine `e` with `call`, the result for the rest.',
      'For `append l1 l2`: the stopping value is not necessarily `[]`. For `sum_list`: `init` and `call` are functions.'],
    solution: [
      { t: 'Question 1', html: '<p>(a) `(\'a -> \'b -> \'b) -> \'b -> \'a list -> \'b`. (b) `process_list f init [e1; …; en]` = `f e1 (f e2 (… (f en init) …))`: the elements are combined from right to left, starting from `init` (it is a “fold_right”).</p>' + R('td-os-3-1', '0-2') },
      { t: 'Questions 2a to 2c', html: '<ul><li>`sum`: `init` = 0, add `e` to `call`.</li><li>`concatenate`: `init` = `""`, put `s` in front of `call` with `^`.</li><li>`append l1 l2`: traverse `l1`; the stopping value is `l2`, and each `e` goes back at the head.</li></ul>' + R('td-os-3-1', '3-9') },
      { t: 'Questions 2d and 2e', html: '<ul><li>`map`: `init` = `[]`, put `f e` at the head of `call`.</li><li>`for_all`: `init` = `true`, combine `p e && call`.</li></ul>' + R('td-os-3-1', '10-14') +
        '<p class="sol-note">This `for_all` does not stop at the first false element: `call` (the result for the rest) is computed before being passed to `f`. On `[-1; 2; 3; 4; 5]`, the predicate is called 5 times, against once for the recursive version of 2.2 (counted with OCaml).</p>' },
      { t: 'Question 2f (bonus): a sum of functions', html: '<p>The result is a function: `init` is the zero function `function x -> 0.`, and `f` combines the function `f` of the list with `call` (the sum of the next ones) into a new function `function x -> f x +. call x`.</p>' + R('td-os-3-1', '15-19') +
        '<p>`g 4.` = √4 + 4² + 1 = 19.</p>' }],
    traps: [
      'Writing the recursion inside `sum`, `map`…: the question asks to go through `process_list`, without `rec`.',
      '`append`: taking `[]` as the stopping value loses `l2`.',
      'Believing that the `for_all` obtained stops early: `call` is evaluated before `f`.',
      '`sum_list`: adding functions with `+.`; you must build `function x -> f x +. call x`.'],
    note: NOTE
  };

  M['td-os-3-2'] = {
    src: 'Higher-order tutorial · Ex 3.2', title: 'fold_left',
    intro: '<p>Write the function `fold_left` defined by:</p>' + ml(["val fold_left : ('a -> 'b -> 'a) -> 'a -> 'b list -> 'a", '', 'fold_left f a [b1; ...; bn]   (* is *)   f (...(f (f a b1) b2) ...) bn']),
    hints: [
      '`a` plays the part of an accumulator: it is combined with each element, from left to right.',
      'For `b :: l`: the new accumulator is `f a b`, and the traversal goes on with `l`.',
      'Empty list: the result is the accumulator.'],
    solution: [
      { t: 'Idea and code', html: '<ul><li>`[]`: `a`.</li><li>`b :: l`: `fold_left f (f a b) l`.</li></ul>' + R('td-os-3-2', '0-3') +
        '<p>With `x :: acc`, the accumulator piles up the elements: the list comes out reversed (like `reverse2` of the lists tutorial).</p>' },
      { t: 'fold_left or process_list', html: '<p>`fold_left` combines from left to right: ((10 − 1) − 2) − 3 = 4. `process_list` (exercise 3.1) combines from right to left: 1 − (2 − (3 − 10)) = −8.</p>' + R('td-os-3-2', '4-5') }],
    traps: [
      'Writing `f b a`: the order of the parameters of `f` is fixed by the type `(\'a -> \'b -> \'a)`: accumulator first.',
      'Returning `[]` or 0 for the empty list: the accumulator `a` is what is returned.',
      'Mixing it up with `process_list`: on an operation that is not commutative (`-`), the results differ.'],
    note: NOTE
  };

  /* answers: the same code, with the English first line (the French file starts them with T.lead) */
  (window.CAML_EX || []).forEach(function (e) {
    var m = M[e.id];
    if (!m || m.answer != null || typeof e.answer !== 'string') return;
    if (e.answer.indexOf('<p>' + T.lead.code + '</p>') === 0) m.answer = e.answer.replace(T.lead.code, LEAD.code);
    else if (e.answer.indexOf('<p>' + T.lead.all + '</p>') === 0) m.answer = e.answer.replace(T.lead.all, LEAD.all);
  });
  REV.i18n.patch(window.CAML_EX, T.fmt(M));
})();
