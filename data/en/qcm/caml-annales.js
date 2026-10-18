/* English text for data/qcm/caml-annales.js (questions taken from the Caml part of the algorithm midterms,
   2017-2024). Wording of the English papers where they exist (2018, 2019, 2019#, 2020), otherwise translated with the
   same vocabulary. Sources (src) are translated by the MCQ engine (“Partiel 2023” → “Midterm 2023”).
   Same markup as the French file: `code`, {{Caml answer}}. */
/* topic names (already given by data/en/qcm/caml.js; repeated in case this file is loaded alone) */
REV.i18n.topics({
  'caml-exceptions': 'Exceptions: failwith, invalid_arg',
  'caml-chapeau': 'Wrapper functions, extra parameters',
  'caml-listes': 'The Caml list',
  'caml-motifs': 'List patterns',
  'caml-parcours': 'Traversing a list',
  'caml-construire': 'Building a list',
  'caml-triees': 'Sorted lists',
  'caml-deux-listes': 'Two lists',
  'caml-fonction-valeur': 'Functions as values, partial application',
  'caml-ordre-sup': 'Functions as parameters',
  'caml-mystery': 'Mystery: reading a function'
});
(function () {
  var E = {
    /* ---------- 2017 (class of 2022): midterm no. 1, 6 November 2017 ---------- */
    'caml-p2017-q1': { q: '`assoc k list` returns the value associated with the key `k` in a list of (key, value) pairs sorted by increasing keys. According to the paper, what must Caml answer to `assoc 4 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")] ;;`?',
      x: '4 is a valid key (non-zero natural number), but no pair has the key 4: `Failure "not found"`. `Invalid_argument "k not a natural"` is for `assoc (-1) …` or `assoc 0 …`. Same exercise in the April 2019 midterm (S1#) and in the lists tutorial (5.1).' },
    'caml-p2017-q2': { q: 'With this solution, how many pairs are examined when evaluating `assoc 4 [(1, "one"); (2, "two"); (3, "three"); (5, "five"); (8, "eight")]`?',
      x: 'Keys 1, 2, 3: smaller than 4, it goes on. Key 5: greater than 4, the list is sorted, 4 is not there: `failwith "not found"` without looking at (8, "eight"). That is the expected early stop.' },
    'caml-p2017-q3': { q: 'Two lists are “quasi identical” if the values at the same places differ by at most 1. What is the Caml answer to `almost [1; 2; 3; 4; 5] [1; 4; 3; 4; 5] ;;`?',
      x: 'At place 2, 2 and 4 differ by 2: `near 2 4` is false and `&&` stops the traversal. The paper forbids `abs`: the gap is written `x - y <= 1 && y - x <= 1`. Same exercise in 2019 and in the higher-order tutorial (2.8).' },
    'caml-p2017-q4': { q: 'What is the Caml answer to `almost [1; 2; 3; 4; 5] [1; 3; 2; 4; 6] ;;`?',
      x: 'Gaps 0, 1, 1, 0, 1: all at most 1. First example of the paper.' },
    'caml-p2017-q5': { q: '`combfilter f l1 l2` returns the list of the pairs (ai, bi) such that `f ai bi` is true. What is the Caml answer to this definition?',
      x: 'The result is a list of pairs: `(\'a * \'b) list`, with the brackets (without them, it would be a pair whose second component is a list). Caml splits this answer over two lines, `=` then `<fun>`; in an exam answer, one line is enough.' },
    /* ---------- 2018 (class of 2023): midterm 1, part 2, 29 October 2018 ---------- */
    'caml-p2018-q1': { q: '`is_image f l1 l2` checks that each bi is the image of ai under `f`. What is the Caml answer to `is_image (function x -> string_of_int x) [1; 2; 3; 4; 5] ["1"; "2"; "0"; "4"; "5"] ;;`?',
      x: '`string_of_int 3` is `"3"`, not `"0"`: the 3rd pair is false, `&&` stops. Official solution: the function computes `f a1 = b1 && f a2 = b2 && … && f an = bn`, and raises `Invalid_argument` if the lengths differ.' },
    'caml-p2018-q2': { q: 'What is the Caml answer to the second definition?',
      x: 'Partial application of `how_many`: the list is missing, and the type shows it. The paper gave this type: `val count_multiples : int -> int list -> int = <fun>`.' },
    'caml-p2018-q3': { q: 'With these definitions (official solution), what is the Caml answer to `count_multiples 3 [1; 3; 6; 7; 9; 0] ;;`?',
      x: '3, 6, 9 and 0: `0 mod 3 = 0`, so 0 is a multiple of 3. `how_many` counts, it does not build a list (that would be `filter`).' },
    'caml-p2018-q4': { q: 'The `insert_nth` paper shows `Exception: Invalid_arg "negative rank".` for a negative rank. What does Caml really answer to `insert_nth 0 (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;` with the official solution?',
      x: '`invalid_arg` raises `Invalid_argument`; `Invalid_arg` does not exist, it is a typo in the paper (repeated in 2020 and in the lists tutorial). Always write the real name in your Caml answer.' },
    'caml-p2018-q5': { q: 'With the official solution, what is the Caml answer to `insert_nth 0 10 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;`?',
      x: 'The pattern `(1, list)` comes before `(_, [])`: at rank 10 of a 9-element list, the value goes at the end. Example from the paper.' },
    'caml-p2018-q6': { q: 'What is the Caml answer to `decode [(1, \'a\'); (3, \'b\'); (1, \'c\'); (1, \'d\'); (4, \'e\')] ;;`?',
      x: 'Each (number, element) pair is expanded: `(3, \'b\')` gives `\'b\'` then `decode ((2, \'b\') :: …)`, down to `(1, \'b\')`. `decode [(6, "grr")]` gives `"grr"` six times. Type: `(int * \'a) list -> \'a list`.' },
    'caml-p2018-q7': { q: 'What is the Caml answer to `encode [\'b\'; \'b\'; \'b\'; \'c\'; \'a\'; \'a\'; \'e\'; \'e\'; \'e\'; \'e\'; \'d\'; \'d\'] ;;` (version of the official solution)?',
      x: '`encode` counts the repetitions of the current element `cur` and adds a pair at each change: the inverse of `decode` (run-length encoding). Careful: the printed paper contains `encode-rec` (syntax error) and ends with `encode_rec (1, e) list`, which would count the first element twice (`(4, \'b\')`); the official solution evaluates the version above.' },
    /* ---------- 2019# (class of 2024, S1# group): midterm no. 1, 23 April 2019 ---------- */
    'caml-p2019d-q1': { q: '`insert x list comp` adds `x` in its place in `list`, sorted by the comparison function `comp`. What is the Caml answer to this definition (official solution)?',
      x: 'The order of the types follows the order of the parameters: the comparison is the last one here. In 2024, `insert_x x order lst` puts it in the middle: always follow the order of the paper. `comp x e` compares two elements of the list: `\'a -> \'a -> bool`.' },
    'caml-p2019d-q2': { q: 'What is the Caml answer to `insertion_sort longer ["Caml"; "C#"; "Python"; "C"; "Javascript"] ;;`?',
      x: 'The order `longer` puts the longest string first: sorted by decreasing length. The strings are not changed: the list stays a `string list`. Example from the paper.' },
    'caml-p2019d-q4': { q: 'What is the Caml answer to `mystery [1; 3; 4; 2] ;;`?',
      x: '`e = 1`, `f = 3`: `aux_mystery 1 3 [4; 2]`. 4 ≥ 3: nothing changes. 2 < 3: `aux_mystery 1 2 []`, which returns 2. `m1` is the smallest element seen, `m2` the second smallest.' },
    'caml-p2019d-q5': { q: 'With the same function, what is the Caml answer to `mystery [3.5; 8.2; 9.5; 4.0] ;;`?',
      x: '`mystery` is polymorphic (`\'a list -> \'a`): `<` also compares floats. The second smallest is 4.0, which Caml writes `4.` (the official solution writes `4.0`).' },
    'caml-p2019d-q6': { q: 'With the same function, what happens with `mystery [\'a\'] ;;`?',
      o: ['Caml raises `Match_failure`: no pattern matches a one-element list.', 'Caml answers {{- : char = \'a\'}}.', 'Caml raises {{Exception: Failure "...".}}', 'Caml rejects the phrase: type error.'],
      x: 'The patterns are `[]` and `e :: f :: l` (at least two elements): `[\'a\']` matches neither. Caml had announced it at the definition (Warning 8, example `_::[]`). Official solution: “An error (Exception: match_failure)”. The lists tutorial (1.6, `second`) raises `Failure "second: Not enough values"` instead.' },
    'caml-p2019d-q7': { q: 'What does the function `mystery` compute?',
      o: ['the second smallest element of the list, if it exists', 'the smallest element of the list', 'the second element of the list', 'the largest element of the list'],
      x: 'Official solution: “The function mystery returns the second smallest element of the list if it exists.” Duplicates count: `mystery [2; 2; 5]` is 2. It is the `second` function of the lists tutorial (1.6).' },
    /* ---------- 2019 (class of 2024): midterm 1, part 2, October 2019 ---------- */
    'caml-p2019-q1': { q: 'A chain of dominoes is a list of pairs; it is valid if neighbouring halves have the same number of points. What is the Caml answer to this definition (official solution)?',
      x: 'Nothing forces integers: only the equality `b = c` compares the 2nd component of a pair with the 1st of the next one, which therefore have the same type `\'a`. The call is made on `(c, d) :: l` so as not to lose the next domino.' },
    'caml-p2019-q2': { q: 'The `remove_nth i list` paper requires an exception `Invalid_argument` if `i` is negative or zero, and `Failure` if the list is too short. What must Caml answer to `remove_nth (-2) [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;`?',
      x: 'The three versions of the official solution write `failwith "negative rank"` and so answer `Failure "negative rank"`: it is a mistake in the solution. Follow the paper: `invalid_arg "negative rank"`, tested once in the wrapper function.' },
    'caml-p2019-q3': { q: 'What is the Caml answer to `remove_nth 10 [1; 2; 3; 4; 5; 6; 7; 8; 9] ;;`?',
      x: 'There is no 10th element to remove: the list runs out and the `[]` case raises `Failure`. Compare with `insert_nth 0 10 …`, where place 10 exists (added at the end of the list).' },
    'caml-p2019-q4': { q: 'What is the Caml answer to `almost [1; 2; 3; 4; 5] [1; 3; 2; 4; 6] ;;`?',
      x: 'Gaps 0, 1, 1, 0, 1: all at most 1. Example from the paper, the same as in 2017.' },
    'caml-p2019-q6': { q: 'What is the Caml answer to `mystery [1; 2] [1; 1; 2; 3; 3; 1; 2; 3] ;;`?',
      x: '`what (x, y)` says whether `x` is a beginning (prefix) of `y`; `is_that` tries each position of `y` and counts the successes. `[1; 2]` starts at positions 2 and 6: 2. `mystery [1; 2] [1; 2]` is 1 and `mystery [1; 2] [2; 1]` is 0.' },
    'caml-p2019-q7': { q: 'What is the Caml answer to the definition of `mystery`?',
      x: '`e = f` compares an element of each list: same type `\'a`. Nothing else forces a type on the elements; the result is a count, an `int`. The local functions `what` and `is_that` do not appear.' },
    'caml-p2019-q8': { q: 'What does the function `mystery` compute? (`a` and `b` are two non-empty lists.)',
      o: ['the number of times `a` appears in `b`, as consecutive elements', 'the number of elements common to `a` and `b`', '`1` if `a` and `b` are equal, `0` otherwise', 'the position of `a` in `b`'],
      x: 'An occurrence is counted at each position of `b` where `a` starts, overlaps included: `mystery [1; 1] [1; 1; 1]` is 2. It is the `sublist` bonus of the lists tutorial (4.3), which also handles the empty list.' },
    /* ---------- 2020 (class of 2025): midterm 1, part 2, 9 November 2020 ---------- */
    'caml-p2020-q1': { q: '`delete x list` removes the first occurrence of `x` from the sorted list `list`. What is the Caml answer to `delete 4 [1; 2; 2; 3; 4; 4; 4; 5] ;;`?',
      x: 'Example from the official solution: a single 4 disappears, the rest is returned without being traversed.' },
    'caml-p2020-q3': { q: '`search_both list a b` checks that two distinct values `a` and `b` are in `list`. What is the Caml answer to this definition?',
      x: 'The types follow the order of the parameters in the paper: `list`, `a`, `b`. The official solution named its function `search v1 v2 l` (type `\'a -> \'a -> \'a list -> bool`): in the exam, keep the name and order of the paper. A single traversal: once one of the two values is found, only the other one is searched for.' },
    'caml-p2020-q4': { q: 'What is the Caml answer to `go [1; 2; 3; 4; 5] ;;`?',
      x: '`go` starts `what 1 [2; 3; 4; 5]`: `2 * 1 :: what 2 [3; 4; 5]`, then `3 * 2`, `4 * 3`, `5 * 4`, and `what 5 []` returns `[]`. The `e` of `what` hides the one of `go`: `x` keeps the previous element.' },
    'caml-p2020-q5': { q: 'With the same function, what is the Caml answer to `go [42] ;;`?',
      x: '`go [42]` starts `what 42 []`, which returns `[]`: a list of n elements gives n − 1 products, so none here. The `[]` case of `go` handles the empty list: no `Match_failure`.' },
    'caml-p2020-q6': { q: 'What does the function `go` compute?',
      o: ['the list of the products of two neighbouring elements', 'the product of all the elements', 'the list of the squares of the elements', 'the list of the products of each element with the first one'],
      x: 'Each element is multiplied by the one before it: `go [2; 21; 2; 21; 2; 21]` gives `[42; 42; 42; 42; 42]`, `go [1; 1; 1; 1; 1]` gives `[1; 1; 1; 1]`.' },
    /* ---------- 2021 (class of 2026): midterm 1, part 2, 4 November 2021 ---------- */
    'caml-p2021-q1': { q: '`remove_interval list i j` removes the values at places `i` to `j` (base 1). What is the Caml answer to `remove_interval list1 5 5 ;;`?',
      x: 'The interval [5, 5] contains only place 5, which holds 5: only that value disappears. `i = j` is valid; only `i > j` (or a rank ≤ 0) raises `Invalid_argument`.' },
    'caml-p2021-q2': { q: 'With the same function, what is the Caml answer to `remove_interval list1 9 6 ;;`?',
      x: '`i > j`: the ranks are invalid, the wrapper function raises `Invalid_argument` before any traversal. `Failure` (list too short) is for `remove_interval list1 5 12`. The message `remove_internal` is a typo in the paper, repeated in the official solution.' },
    'caml-p2021-q3': { q: 'When `list1` is shorter, it is “repeated” until `list2` is finished. What is the Caml answer to `alternate_list ["a1"; "a2"] ["b1"; "b2"; "b3"; "b4"; "b5"] ;;`?',
      x: 'When `l1` runs out, `aux` starts again from `list1`, the original list, still visible (parameter of the wrapper function). The wrapper handles `list1 = []`, otherwise `aux ([], l2)` would loop forever.' },
    'caml-p2021-q4': { q: 'What is the Caml answer to `aux (function x -> x mod 2 = 0) 10 ([0; 2], [1; 3]) ;;`?',
      x: '10 is even: it goes to the head of the first list of the pair. `aux` files an element according to the predicate `p`.' },
    'caml-p2021-q5': { q: '“If they are incorrect, write Error.” What is the Caml answer to `let f x y = x - y = 0 in mystery f ([1; 2; 3; 4; 5; 6], [1; 2; 3; 4; 5; 6]) ;;`?',
      x: '`mystery` expects a one-parameter predicate (`p e` must be a `bool`), and `f` takes two: type error, the phrase is not evaluated. Official solution: “Error”.' },
    'caml-p2021-q6': { q: 'What is the Caml answer to `mystery (function x -> x mod 2 = 0) ([1; 2; 3; 4; 5; 6; 7; 8], [10; 11; 12; 13; 14]) ;;`?',
      x: '`mystery` interleaves the two lists (1, 10, 2, 11, 3, 12…, then the rest of the longer one) and files them with `aux`: even numbers on one side, odd ones on the other, in interleaving order. It is a `partition` (higher-order tutorial, 2.7) on two lists.' },
    /* ---------- 2022 (class of 2027): midterm 1, part 2, 31 October 2022 ---------- */
    'caml-p2022-q1': { q: '`insert_post x f lst` inserts `x` just after the first element `y` such that `f y` is true. What is the Caml answer to `insert_post 4.1 (function y -> y < 0.) [1.1; 2.4; 2.] ;;`?',
      x: 'No element is negative: the traversal reaches `[]` without inserting, hence `Failure`, as the paper requires. The computation fails (nothing fits): it is `failwith`, not `invalid_arg`.' },
    'caml-p2022-q2': { q: '`pos_max lst` returns the position (from 1) of the maximum. What is the Caml answer to `pos_max [8.5; 9.; -4.5] ;;`?',
      x: 'Three extra parameters: the maximum seen (`vmax`), its position (`vpos`) and the current position, which starts at 2 because the first element is already taken. The result is a position, an `int`, even for a list of floats.' },
    'caml-p2022-q3': { q: '`common k l1 l2` checks that `l1` and `l2` have strictly more than `k` equal elements at the same positions. What is the Caml answer to `common 1 [\'a\'; \'y\'; \'c\'] [\'b\'; \'y\'; \'c\'] ;;`?',
      x: 'Two equal positions (`\'y\'`, `\'c\'`), and 2 > 1. `less2 (=) 2 …` is false (at least 2 equal pairs), and `common` takes its negation. `(=)` is equality used as a two-parameter function.' },
    'caml-p2022-q4': { q: '“Give the type of the following function.” Which type does Caml give to `mystery1`?',
      x: 'The pattern `0 :: l2` and `i-1` make `l2` an `int list`; the elements of `l1` go into lists (`l3`) stored in a list: `\'a list list`. Caml first prints a Warning 8 (case `([], 1::_)` not handled), missing from the official solution.' },
    'caml-p2022-q5': { q: 'What is the Caml answer to `mystery1 [1; 2; 3; 4; 5; 6; 7; 8; 9; 10] [4; 1; 2] ;;`?',
      x: '`l1` is cut into pieces of 4, 1 and 2 elements, each one reversed (the accumulator `l3` stacks them), then the rest `[8; 9; 10]` is added as it is when `l2` is empty.' },
    'caml-p2022-q6': { q: 'Which application of `mystery1` returns `[[5; 15; 5]; [21]; [5; 1; 4]]`?',
      x: 'Two reversed pieces of 3 and 1 elements, then the rest in order: the rest must therefore be `[5; 1; 4]` as it is. `[5; 15; 5]` is a palindrome, it stays the same once reversed. With `[3; 1; 3]`, the rest would be reversed.' },
    /* ---------- 2023 (class of 2028): B1 exam #1 (Caml), 30 October 2023 ---------- */
    'caml-p2023-q1': { q: '`insert_mult n x lst` inserts `x` after each group of `n` elements. What is the Caml answer to `insert_mult 2 0 [1; 2; 3; 4; 5] ;;`?',
      x: 'A counter starts at `n` and goes down at each element; at 1, `x` is inserted and the counter goes back to `n`. The last group (5) is incomplete: no `x` after it.' },
    'caml-p2023-q2': { q: 'With the same function, what is the Caml answer to `insert_mult 4 42 [10; 20; 30; 40] ;;` (example from the paper)?',
      x: 'A complete group at the end of the list is followed by `x`: the example of the paper settles it. That is the kind of detail the examples are there to settle: “Your functions must absolutely match the given examples” (2024).' },
    'caml-p2023-q3': { q: '`remove_x x lst` removes every occurrence of `x`. What is the Caml answer to `remove_x 5 [5; 5; 2; 3; 5; 1] ;;`?',
      x: 'Example from the paper: every occurrence of 5 disappears, the other elements stay in order.' },
    'caml-p2023-q4': { q: '`remove_duplicates` must use `remove_x`. What is the Caml answer to `remove_duplicates [3; 1; 2; 2; 3; 1; 4; 5; 5] ;;`?',
      x: 'The head is kept and all its copies are removed from the rest before going on: each value stays at its first place. The other answers would keep the last occurrence, sort, or keep only the unique values. It is also the lists tutorial (3.4).' },
    'caml-p2023-q5': { q: '`split sep lst` cuts `lst` into sublists at each element that satisfies `sep` (those elements disappear). What is the Caml answer to `split (function x -> x = 0) [0; 1; 0; 2; 0; 3; 0; 4] ;;`?',
      x: 'A separator at the head opens an empty piece: `[]` first (example from the paper). The script marked 18/20 returned `[[4]; [3]; [2]; [1]; []]`: 2 points out of 8 lost for the order, as the paper warned. Plain recursion keeps the order.' },
    /* ---------- 2024 (class of 2029): B1 exam (Caml), 30 October 2024 ---------- */
    'caml-p2024-q1': { q: '`check_list k lst` checks that the list of lists `lst` only contains lists of length ≤ `k`. What is the Caml answer to `check_list 1 [[]; [2]; [3]] ;;`?',
      x: 'Lengths 0, 1 and 1: all ≤ 1. Without `List.length`, `n` goes down while moving along the sublist, and it stops as soon as there is no room left (`n > 0 &&`): no need to measure the whole sublist.' },
    'caml-p2024-q2': { q: 'With the same function, what is the Caml answer to `check_list (-1) [[1]; [2]; []] ;;`?',
      x: 'The test `k < 0` is done once, before any traversal, by the wrapper function. The example of the paper fixes the exception and its message: `Invalid_argument "check_list: k < 0"`.' },
    'caml-p2024-q3': { q: 'What is the Caml answer to `insertion_sort (function x -> function y -> x > y) [] ;;` (example from the paper)?',
      x: 'Nothing says the type of the elements: the comparison `x > y` works for any type. Caml therefore answers `\'a list`, and that is exactly the Caml answer to copy.' },
    'caml-p2024-q4': { q: 'What is the Caml answer to `insert_x \'c\' (function x -> function y -> x > y) [\'e\'] ;;`?',
      x: 'The order is decreasing (`x > y`): `\'c\' > \'e\'` is false, `\'c\'` goes after `\'e\'`. The list is assumed sorted by `order`, and so is the result.' },
    'caml-p2024-q5': { q: '“Give the type of the function mystery.” Which `val` line does Caml print?',
      x: '`mystery` has only one parameter, `lst`: the parameters `acc` and `switch` belong to the local function `tmp`, which does not appear. The result is built with `h :: …`: a list of elements of the same type. Caml first prints a Warning 8: the case `(_::_, false)` is never reached but is not written.' },
    'caml-p2024-q6': { q: 'What is the Caml answer to `mystery ["a"; "b"; "c"; "d"; "e"; "f"] ;;`?',
      x: 'Phase `switch = true`: each element is copied and pushed onto `acc` (in reverse). At the end of `lst`, `acc` is popped: the mirror. With the first example, `[1; 2; 8; 2; 1]`, a palindrome, you cannot tell repetition from mirror; here you can.' },
    'caml-p2024-q7': { q: 'What does the function `mystery` compute?',
      o: ['the list followed by its mirror', 'the list repeated twice', 'the mirror of the list', 'the list without its duplicates'],
      x: '`mystery lst` = `lst @ rev lst`: `mystery [1; 2]` is `[1; 2; 2; 1]`, `mystery [1; 2; 8; 2; 1]` is `[1; 2; 8; 2; 1; 1; 2; 8; 2; 1]`, `mystery []` is `[]`.' }
  };

  /* same markup as the French file: `code`, {{Caml answer}} */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function m(s) {
    return String(s).replace(/\{\{([\s\S]+?)\}\}|`([^`]+)`/g, function (_, ans, code) {
      return ans != null ? '<code data-ml-ans>' + esc(ans) + '</code>' : '<code class="ml">' + esc(code) + '</code>';
    });
  }
  Object.keys(E).forEach(function (id) {
    var e = E[id];
    if (e.q) e.q = m(e.q);
    if (e.x) e.x = m(e.x);
    if (e.o) e.o = e.o.map(m);
  });
  REV.i18n.qcm(E);
})();
