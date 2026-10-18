/* English text for data/caml/ex-annales.js (merged by id over the French file).
   Official English wording, word for word, for the papers that exist in English: Oct. 2018 (p2018-ex2 to ex5),
   S1# Apr. 2019 (p2019d-ex2 to ex4), Oct. 2019 (p2019-ex2 to ex5) and Nov. 2020 (p2020-ex2, ex4, ex5), with the
   PDF extraction slips fixed (≠, “How many?”, + instead of *). The other papers only exist in French: their
   statements are translated with the vocabulary of the English papers. The code blocks are the French file’s
   (window.CAML_ML): the code and the Caml answers are the same in both languages. */
(function () {
  var M = window.CAML_ML || {};

  var NOTE_WRITTEN = 'No official answer key: solution written and run with OCaml 4.14.';
  var NOTE_RUN = 'Code run with OCaml 4.14.';
  window.REV.i18n.patch(window.CAML_EX, {
    'p2024-ex1': {
      src: 'Midterm Oct. 2024 · Ex 1',
      title: 'Checking a list of lists: check_list',
      intro: '<p>Write the function <code class="ml">check_list k lst</code> that takes as parameters:</p><ul><li>an integer <code class="ml">k</code></li><li>a list of lists <code class="ml">lst</code></li></ul><p>and that checks whether the list of lists <code class="ml">lst</code> contains only lists of length ≤ <code class="ml">k</code>.</p><p>The function has to raise an exception <code class="ml">Invalid_argument</code> if the parameter <code class="ml">k</code> is &lt; 0.</p><p>Reminder: the only functions that you can use are <code class="ml">failwith</code> and <code class="ml">invalid_arg</code> (no other predefined function of Caml).</p>' + M['p2024-ex1.ex'],
      hints: [
        'The test on <code class="ml">k</code> is about a parameter: do it only once, in a wrapper function, before any traversal. What should <code class="ml">check_list (-1) []</code> answer?',
        'No <code class="ml">List.length</code>: to know whether a sublist has at most <code class="ml">k</code> elements, move along the sublist while a counter goes down, and answer <code class="ml">false</code> as soon as there is no room left.',
        'You need two local recursive functions: one checks a sublist (cases <code class="ml">[]</code> and <code class="ml">_ :: l</code>), the other goes through the list of lists (cases <code class="ml">[]</code> and <code class="ml">l :: others</code>) and stops at the first <code class="ml">false</code> thanks to <code class="ml">&amp;&amp;</code>.'],
      solution: [
        { t: 'The idea', html: '<p>Two nested traversals: the list of lists, then each sublist. No length is computed: <code class="ml">List.length</code> is forbidden, and counting a long sublist to the end is useless. A counter <code class="ml">n</code> (starting at <code class="ml">k</code>) goes down as we move along the sublist: if the sublist ends, it is short enough; if an element is left while <code class="ml">n</code> is 0, it is too long.</p><p>The exception is about a parameter: it is tested only once, in the wrapper function, before the traversal. So <code class="ml">check_list (-1) []</code> does raise the exception.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">short_enough n l</code> (the sublist <code class="ml">l</code> has at most <code class="ml">n</code> elements): <code class="ml">[]</code> → <code class="ml">true</code>; <code class="ml">_ :: l</code> → we need <code class="ml">n &gt; 0</code>, then <code class="ml">short_enough (n-1) l</code>. Written <code class="ml">n &gt; 0 &amp;&amp; short_enough (n-1) l</code>, the recursive call is not evaluated if <code class="ml">n &gt; 0</code> is false: we stop as soon as the answer is known.</li><li><code class="ml">check</code> on the list of lists: <code class="ml">[]</code> → <code class="ml">true</code> (no sublist is too long); <code class="ml">l :: others</code> → <code class="ml">short_enough k l &amp;&amp; check others</code>. The first <code class="ml">false</code> stops everything.</li></ul>' },
        { t: 'The code and the Caml answer', html: M['p2024-ex1.sol'] + '<p>A sublist is never read beyond <code class="ml">k + 1</code> elements.</p>' },
        { t: 'Check on the examples', html: '<p>The four examples of the paper, then three edge cases: <code class="ml">k = 0</code> only accepts empty sublists, and the test on <code class="ml">k</code> comes before the traversal, even on an empty list.</p>' + M['p2024-ex1.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val check_list : int -&gt; \'a list list -&gt; bool = &lt;fun&gt;</code>.</p><p>Check on your script: the exception tested once, before the traversal; no predefined function; stopping as soon as a sublist is too long.</p>',
      traps: [
        'Calling <code class="ml">List.length</code>: it is a predefined function, so it is forbidden. Writing your own length function is allowed (with a specification), but it reads the whole sublist when <code class="ml">k + 1</code> elements are enough to conclude.',
        'Testing <code class="ml">k &lt; 0</code> inside the recursive function: the test is repeated at every call, and <code class="ml">check_list (-1) []</code> may answer <code class="ml">true</code> instead of raising the exception.',
        'Mixing up ≤ and &lt;: a sublist of length exactly <code class="ml">k</code> is accepted (<code class="ml">check_list 2 [[1; 2]; [4]; [5; 6]]</code> → <code class="ml">true</code>).',
        'Forgetting that an empty sublist is valid: <code class="ml">check_list 1 [[]; [2]; [3]]</code> → <code class="ml">true</code>.',
        'Writing <code class="ml">check_list -1 …</code> without brackets: Caml reads a subtraction. The examples write <code class="ml">(-1)</code>.'],
      grading: '7 points for the exercise, no breakdown. The Caml answer is part of the mark (header of the paper).',
      note: NOTE_WRITTEN
    },

    'p2024-ex2': {
      src: 'Midterm Oct. 2024 · Ex 2',
      title: 'Insertion sort: insert_x, then insertion_sort',
      questions: [
        '<b>1.</b> Write the function <code class="ml">insert_x x order lst</code> that takes as parameters:<ul><li>an element <code class="ml">x</code></li><li>a two-argument function <code class="ml">order</code> returning a boolean value</li><li>a list <code class="ml">lst</code> sorted according to the order induced by the function <code class="ml">order</code></li></ul>and that inserts the element <code class="ml">x</code> in the list <code class="ml">lst</code> sorted according to the order induced by the function <code class="ml">order</code>.' + M['p2024-ex2.ex1'],
        '<b>2.</b> Write the function <code class="ml">insertion_sort order lst</code> that takes as parameters:<ul><li>a list <code class="ml">lst</code></li><li>a two-argument function <code class="ml">order</code> returning a boolean value</li></ul>and that sorts the list <code class="ml">lst</code> according to the order induced by the function <code class="ml">order</code>. The function must use the previous function <code class="ml">insert_x x order lst</code>.' + M['p2024-ex2.ex2']],
      hints: [
        '<code class="ml">order</code> is used like any function: <code class="ml">order x e</code> is <code class="ml">true</code> when <code class="ml">x</code> must come before <code class="ml">e</code>. The examples use it with <code class="ml">x &lt; y</code> (increasing order) and <code class="ml">x &gt; y</code> (decreasing order).',
        'For <code class="ml">insert_x</code>: go along the sorted list. If <code class="ml">order x e</code> is true, <code class="ml">x</code> goes in front of <code class="ml">e</code> and the rest does not change; otherwise <code class="ml">e</code> stays in front and we insert further on. And if the list is empty?',
        'For <code class="ml">insertion_sort</code>: first sort the tail of the list (recursive call), then insert the head into that result with <code class="ml">insert_x</code>. Watch the order of the parameters: <code class="ml">insert_x x order lst</code>, but <code class="ml">insertion_sort order lst</code>.'],
      solution: [
        { t: 'The idea of insert_x', html: '<p>The list is already sorted according to <code class="ml">order</code>. We go along it from the start and stop as soon as <code class="ml">x</code> can go in front of the current element <code class="ml">e</code>, that is as soon as <code class="ml">order x e</code> is true: the rest is already sorted, we keep it as it is. Otherwise <code class="ml">e</code> stays in front and we insert <code class="ml">x</code> further on.</p><ul><li><code class="ml">[]</code> → <code class="ml">[x]</code>: end of the list reached, or empty list from the start (<code class="ml">insert_x 3 … []</code> → <code class="ml">[3]</code>).</li><li><code class="ml">e :: l</code> with <code class="ml">order x e</code> → <code class="ml">x :: e :: l</code>.</li><li><code class="ml">e :: l</code> otherwise → <code class="ml">e :: insert_x x order l</code>.</li></ul>' },
        { t: 'The idea of insertion_sort', html: '<p>Recursive reasoning on the list to sort: the empty list is sorted; for <code class="ml">e :: l</code>, sort <code class="ml">l</code> (assume the recursive call is right), then insert <code class="ml">e</code> in its place in that result with <code class="ml">insert_x</code>. This is what “must use the previous function” asks for.</p><p>No exception: the paper does not ask for one. And nothing assumes the type of the elements: the examples sort <code class="ml">int</code>, <code class="ml">char</code> and <code class="ml">float</code> values.</p>' },
        { t: 'The code and the Caml answer', html: M['p2024-ex2.sol'] },
        { t: 'Check on the examples', html: '<p>Some examples of the paper, then two edge cases: an equal element (<code class="ml">5</code> in <code class="ml">[1; 5; 9]</code>) and duplicates.</p>' + M['p2024-ex2.chk'] },
        { t: 'Unrolling a sort', html: '<p>With <code class="ml">o</code> the function <code class="ml">function x -&gt; function y -&gt; x &lt; y</code>: the recursive calls go down to the empty list, then the insertions are done on the way back, from the end of the list to its start.</p>' + M['p2024-ex2.trace'] },
        { t: 'Already set', html: '<p>The same exercise was in the S1# midterm of April 2019 (<a href="#p2019d-ex2">see that card</a>), with the comparison function as the <b>last</b> parameter: <code class="ml">insert x list comp</code>. Always read the order of the parameters in the statement and the examples.</p>' }],
      answer: '<p>Two functions, in this order, each followed by its Caml answer:</p><ul><li><code data-ml-ans>val insert_x : \'a -&gt; (\'a -&gt; \'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>val insertion_sort : (\'a -&gt; \'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li></ul>',
      traps: [
        'Swapping the parameters: <code class="ml">insert_x x order lst</code>, but <code class="ml">insertion_sort order lst</code>. The examples call them in this order.',
        'Writing <code class="ml">x &lt; e</code> instead of <code class="ml">order x e</code>: the sort then only works in increasing order, and the examples with <code class="ml">x &gt; y</code> are wrong.',
        'Forgetting the <code class="ml">[]</code> case of <code class="ml">insert_x</code>: <code class="ml">insert_x 3 … []</code> must give <code class="ml">[3]</code>, and without that case Caml shows a Warning 8.',
        'Going on after placing <code class="ml">x</code>: the rest is already sorted, keep it as it is.',
        'Writing an insertion again inside <code class="ml">insertion_sort</code> instead of calling <code class="ml">insert_x</code>: the paper requires using it.'],
      grading: '9 points for the exercise; the split between the two questions is not given.',
      note: NOTE_WRITTEN
    },

    'p2024-ex3': {
      src: 'Midterm Oct. 2024 · Ex 3',
      title: 'Mystery: an accumulator and a switch',
      intro: '<p>Let the function mystery defined below</p>' + M['p2024-ex3.fn'],
      questions: [
        '<b>1.</b> Give the type of the function mystery.',
        '<b>2.</b> Give the results of the successive evaluations of the following phrases.' + M['p2024-ex3.q']],
      hints: [
        'Find the role of each parameter of <code class="ml">tmp</code>: <code class="ml">lst</code> (what is left to read), <code class="ml">acc</code> (a stack), <code class="ml">switch</code> (a boolean that tells which phase we are in).',
        'Phase <code class="ml">switch = true</code>: each element read is put in the result <em>and</em> pushed onto <code class="ml">acc</code>. In which order are the elements in <code class="ml">acc</code> when the reading is over?',
        'Phase <code class="ml">switch = false</code>: <code class="ml">acc</code> is popped one element at a time. Unroll <code class="ml">mystery [1; 2]</code> by hand before the phrases of the paper.'],
      solution: [
        { t: 'The type', html: '<p><code class="ml">lst</code> is matched with <code class="ml">[]</code> and <code class="ml">h :: t</code>: it is a list, of type <code class="ml">\'a list</code> (nothing forces the type of the elements). The result is built with <code class="ml">[]</code> and <code class="ml">h :: …</code> from the elements of <code class="ml">lst</code>: <code class="ml">\'a list</code> too. <code class="ml">acc</code> and <code class="ml">switch</code> are parameters of <code class="ml">tmp</code>, not of <code class="ml">mystery</code>.</p><p>Caml first shows a warning: the case <code class="ml">(h :: t, false)</code> is not written. It never happens (<code class="ml">switch</code> only becomes <code class="ml">false</code> when the list is empty), but Caml cannot know that.</p>' + M['p2024-ex3.def'] },
        { t: 'The two phases', html: '<p>While <code class="ml">switch</code> is <code class="ml">true</code>, each element <code class="ml">h</code> is put in the result (<code class="ml">h :: …</code>) and pushed onto <code class="ml">acc</code> (<code class="ml">h :: acc</code>): when the reading is over, <code class="ml">acc</code> holds the elements from the last one to the first one. When <code class="ml">lst</code> is empty, <code class="ml">switch</code> becomes <code class="ml">false</code>: the head of <code class="ml">acc</code> is taken out and put in the result, and <code class="ml">tmp</code> is called again with <code class="ml">switch = true</code> on an empty list, which switches back to <code class="ml">false</code> at once. This empties <code class="ml">acc</code>, from the last element read to the first one.</p>' },
        { t: 'Trace of mystery [1; 2]', html: M['p2024-ex3.trace'] },
        { t: 'The evaluations', html: '<p><code class="ml">mystery lst</code> returns the list followed by its mirror. The first example is a palindrome: its mirror is itself, hence the repeated list. Caml splits the second answer over two lines, because it is long.</p>' + M['p2024-ex3.evals'] }],
      answer: '<ol><li><code data-ml-ans>val mystery : \'a list -&gt; \'a list = &lt;fun&gt;</code> (after a Warning 8: the case <code class="ml">(_::_, false)</code> is not handled).</li><li>(a) <code data-ml-ans>- : int list = [1; 2; 8; 2; 1; 1; 2; 8; 2; 1]</code><br>(b) <code data-ml-ans>- : string list = ["a"; "b"; "c"; "d"; "e"; "f"; "f"; "e"; "d"; "c"; "b"; "a"]</code></li></ol><p>mystery returns the list followed by its mirror.</p>',
      traps: [
        'Giving mystery three parameters (<code class="ml">\'a list -&gt; \'a list -&gt; bool -&gt; …</code>): <code class="ml">acc</code> and <code class="ml">switch</code> belong to <code class="ml">tmp</code>; mystery has only one.',
        'Thinking the result is only the mirror: the elements are also copied while reading (<code class="ml">h :: tmp t (h :: acc) true</code>).',
        'Being surprised by (a): the mirror of <code class="ml">[1; 2; 8; 2; 1]</code> is the same list, and the result repeats it.',
        'Writing <code class="ml">int list -&gt; int list</code>: nothing forces integers, it is <code class="ml">\'a list -&gt; \'a list</code>.'],
      grading: '4 points for the exercise (type and two evaluations), no breakdown.',
      note: NOTE_WRITTEN
    },

    'p2023-ex1': {
      src: 'Midterm Oct. 2023 · Ex 1',
      title: 'Multiple insertion: insert_mult',
      intro: '<p>Write the function <code class="ml">insert_mult n x lst</code> that takes as parameters:</p><ul><li>an integer <code class="ml">n</code></li><li>an element <code class="ml">x</code></li><li>a list <code class="ml">lst</code></li></ul><p>and that inserts the element <code class="ml">x</code> in the list <code class="ml">lst</code> after each group of <code class="ml">n</code> elements.</p><p>The function has to raise an exception <code class="ml">Invalid_argument</code> if the parameter <code class="ml">n</code> is negative or zero.</p>' + M['p2023-ex1.ex'],
      hints: [
        'The test on <code class="ml">n</code> is about a parameter: do it only once, in a wrapper function, before the traversal.',
        'Give the local recursive function a counter: how many elements are left to copy before inserting <code class="ml">x</code>? It starts at <code class="ml">n</code>.',
        'When the counter is 1, the current element closes a group: copy it, add <code class="ml">x</code>, then start again with the counter back at <code class="ml">n</code>. Look at <code class="ml">insert_mult 4 42 [10; 20; 30; 40]</code>: a full group at the end of the list is followed by <code class="ml">x</code>.'],
      solution: [
        { t: 'The idea', html: '<p>A wrapper function tests <code class="ml">n</code> only once, then starts a local recursive function <code class="ml">insert k lst</code>. Its extra parameter <code class="ml">k</code> is the number of elements still to copy before the next insertion: it starts at <code class="ml">n</code>, goes down by 1 at each element, and goes back to <code class="ml">n</code> after each insertion. <code class="ml">x</code> and <code class="ml">n</code> are still visible inside the local function: no need to pass them again.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">[]</code> → <code class="ml">[]</code>: nothing left to copy (a last incomplete group is not followed by <code class="ml">x</code>, and <code class="ml">insert_mult 1 42 []</code> → <code class="ml">[]</code>).</li><li><code class="ml">e :: l</code> with <code class="ml">k = 1</code>: <code class="ml">e</code> closes a group → <code class="ml">e :: x :: insert n l</code>.</li><li><code class="ml">e :: l</code> otherwise → <code class="ml">e :: insert (k-1) l</code>.</li></ul>' },
        { t: 'The code and the Caml answer', html: M['p2023-ex1.sol'] },
        { t: 'Check on the examples', html: '<p>The six examples of the paper, then two edge cases: a full group at the end of the list is followed by <code class="ml">x</code>, and the test on <code class="ml">n</code> comes first, even on an empty list.</p>' + M['p2023-ex1.chk'] },
        { t: 'The script marked 6.5 / 6.5', html: '<p>The script in the past exams counts down to 0 instead of 1: when the counter is 0, it inserts <code class="ml">x</code> before looking at the list. The guarded case comes first, so a full group at the end of the list is also followed by <code class="ml">x</code>. Same type, same six results: it got full marks. On your script, give only one version (header of the paper).</p>' + M['p2023-ex1.copy'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val insert_mult : int -&gt; \'a -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Testing <code class="ml">n &lt;= 0</code> inside the recursive function: the test is repeated at every element.',
        'Forgetting <code class="ml">x</code> after a last full group: <code class="ml">insert_mult 4 42 [10; 20; 30; 40]</code> → <code class="ml">[10; 20; 30; 40; 42]</code>.',
        'Adding <code class="ml">x</code> after a last incomplete group: <code class="ml">insert_mult 2 0 [1; 2; 3; 4; 5]</code> ends with <code class="ml">5</code>, without <code class="ml">0</code>.',
        'Forgetting to reset the counter to <code class="ml">n</code> after an insertion: <code class="ml">x</code> would be inserted only once.',
        'Writing <code class="ml">failwith</code>: the example expects <code class="ml">Invalid_argument</code>, with its message.'],
      grading: '6.5 points for the exercise; the script in the past exams got 6.5 / 6.5.',
      note: 'No official answer key: solution written and run with OCaml 4.14. The past exams contain a student script marked 18/20, quoted in the solution.'
    },

    'p2023-ex2': {
      src: 'Midterm Oct. 2023 · Ex 2',
      title: 'Removing duplicates: remove_x, then remove_duplicates',
      questions: [
        '<b>1.</b> Write the function <code class="ml">remove_x x lst</code> that takes as parameters:<ul><li>an element <code class="ml">x</code></li><li>a list <code class="ml">lst</code></li></ul>and that removes all the occurrences of the element <code class="ml">x</code> in the list <code class="ml">lst</code>.' + M['p2023-ex2.ex1'],
        '<b>2.</b> Write the function <code class="ml">remove_duplicates lst</code> that takes as parameter:<ul><li>a list <code class="ml">lst</code></li></ul>and that removes all the duplicates of the list <code class="ml">lst</code>. The function <b>must</b> use the previous function <code class="ml">remove_x x lst</code>.' + M['p2023-ex2.ex2']],
      hints: [
        '<code class="ml">remove_x</code> goes through the whole list (all occurrences must be removed): two cases, <code class="ml">[]</code> and <code class="ml">e :: l</code>; in the second one, <code class="ml">e</code> is kept or not.',
        'For <code class="ml">remove_duplicates</code>, look at the examples: the first occurrence is the one that stays, in its place (<code class="ml">[3; 1; 2; 2; 3; 1; 4; 5; 5]</code> → <code class="ml">[3; 1; 2; 4; 5]</code>).',
        'Keep the head <code class="ml">e</code>, remove all its other occurrences from the tail with <code class="ml">remove_x</code>, then go on with what is left.'],
      solution: [
        { t: 'remove_x', html: '<p>Full traversal: <code class="ml">[]</code> → <code class="ml">[]</code>; <code class="ml">e :: l</code> → if <code class="ml">e = x</code>, <code class="ml">e</code> is not kept and we go on (<code class="ml">remove_x x l</code>); otherwise <code class="ml">e :: remove_x x l</code>. No assumption on the type: <code class="ml">=</code> compares integers, strings, booleans or characters.</p>' },
        { t: 'remove_duplicates', html: '<p>For <code class="ml">e :: l</code>, <code class="ml">e</code> is the first occurrence of its value: keep it. Its other occurrences are all in <code class="ml">l</code>: <code class="ml">remove_x e l</code> removes them. Then go on with that result, which no longer contains <code class="ml">e</code>. So the first occurrence of each value stays in its place.</p>' + M['p2023-ex2.trace'] },
        { t: 'The code and the Caml answer', html: M['p2023-ex2.sol'] },
        { t: 'Check on the examples', html: '<p>Some examples of the paper and the empty list: Caml answers <code class="ml">\'a list</code>, because nothing tells the type of the elements.</p>' + M['p2023-ex2.chk'] }],
      answer: '<p>Two functions, each followed by its Caml answer:</p><ul><li><code data-ml-ans>val remove_x : \'a -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>val remove_duplicates : \'a list -&gt; \'a list = &lt;fun&gt;</code></li></ul>',
      traps: [
        'Keeping the last occurrence (“if <code class="ml">e</code> is still further on, drop it”): the order changes, <code class="ml">[3; 1; 2; 2; 3; 1; 4; 5; 5]</code> would give <code class="ml">[2; 3; 1; 4; 5]</code>.',
        'Not using <code class="ml">remove_x</code> in <code class="ml">remove_duplicates</code>: the paper requires it (“must”).',
        'Stopping <code class="ml">remove_x</code> at the first occurrence found: all of them must go.',
        'Adding a case <code class="ml">[e] -&gt; [e]</code>: useless (the marked script had it, without losing a point).'],
      grading: '5.5 points (the script in the past exams got 5.5 / 5.5); a note on the script, probably the marking scheme announced during the exam, gives 3 points to question 2, so 2.5 to question 1.',
      note: 'No official answer key: solution written and run with OCaml 4.14. The past exams contain a student script marked 18/20, quoted in the solution. It is also exercise 3.4 of this year’s lists tutorial, with the same examples.'
    },

    'p2023-ex3': {
      src: 'Midterm Oct. 2023 · Ex 3',
      title: 'Split: cutting a list into sublists',
      intro: '<p>Write the function <code class="ml">split sep lst</code> that takes as parameters:</p><ul><li>a one-argument predicate <code class="ml">sep</code></li><li>a list <code class="ml">lst</code></li></ul><p>and that cuts the list <code class="ml">lst</code> into sublists as soon as the predicate <code class="ml">sep</code> is satisfied by an element of <code class="ml">lst</code>. The elements of <code class="ml">lst</code> that satisfy the predicate <code class="ml">sep</code> are not part of any sublist.</p><p><b>If the sublists are not in the initial order, the exercise will be marked out of slightly less.</b> Sometimes fewer points are better than no points.</p>' + M['p2023-ex3.ex'],
      hints: [
        'The examples fix the edge cases: <code class="ml">split … []</code> → <code class="ml">[]</code> (not <code class="ml">[[]]</code>), and a separator at the head gives a first empty sublist (<code class="ml">[[]; [1]; …]</code>).',
        'Pure recursion: assume the call on the tail <code class="ml">l</code> already gives you its split, as a pair (current sublist, following sublists). What do you do with <code class="ml">e</code> depending on whether <code class="ml">sep e</code> is true or false?',
        'If <code class="ml">sep e</code> is true, the current sublist is over: it goes in front of the following ones, and an empty sublist starts. Otherwise, <code class="ml">e</code> is added at the head of the current sublist. A wrapper function handles the empty list then rebuilds the list of lists.'],
      solution: [
        { t: 'The idea', html: '<p>The recursive function <code class="ml">cut</code> returns a pair <code class="ml">(current, others)</code>: <code class="ml">current</code> is the first sublist (the elements before the first separator), <code class="ml">others</code> the list of the following sublists. The split is built from the end of the list, adding each element at the head: the initial order is kept without ever reversing a list.</p><p>The result of the recursive call is named with <code class="ml">let (current, others) = cut l in</code>: a single call, used twice.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">cut []</code> → <code class="ml">([], [])</code>: one empty sublist, nothing after it.</li><li><code class="ml">cut (e :: l)</code> with <code class="ml">sep e</code>: <code class="ml">e</code> is a separator. The current sublist of <code class="ml">l</code> becomes a following sublist, and a new empty sublist starts: <code class="ml">([], current :: others)</code>.</li><li><code class="ml">cut (e :: l)</code> otherwise: <code class="ml">e</code> joins the current sublist: <code class="ml">(e :: current, others)</code>.</li><li>Wrapper function: <code class="ml">[]</code> → <code class="ml">[]</code> (example 1); otherwise <code class="ml">current :: others</code>.</li></ul>' + M['p2023-ex3.trace'] },
        { t: 'The code and the Caml answer', html: M['p2023-ex3.sol'] },
        { t: 'Check on the examples', html: '<p>The four examples of the paper, then two cases the statement does not fix: a separator at the end gives a last empty sublist (as a separator at the head gives a first one), and with no separator there is a single sublist.</p>' + M['p2023-ex3.chk'] },
        { t: 'The script marked 6 / 8', html: '<p>The script in the past exams builds each sublist in an accumulator, reverses it, and stacks the sublists in a second accumulator: they come out in reverse order (<code class="ml">[[4; 5]; [1; 2]]</code>). The marker took off 2 points, margin note “order”, as the statement announced. The pure recursion of step 3 avoids the problem.</p>' }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val split : (\'a -&gt; bool) -&gt; \'a list -&gt; \'a list list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Returning <code class="ml">[[]]</code> for the empty list: the example expects <code class="ml">[]</code>.',
        'Building the sublists in an accumulator without putting them back in order: this is what cost the marked script 2 points.',
        'Forgetting the empty sublist when the separator is at the head, or when two separators follow each other.',
        'Keeping the separator in a sublist: it is part of none.',
        'Writing <code class="ml">sep = e</code>: <code class="ml">sep</code> is a predicate, it is applied (<code class="ml">sep e</code>).',
        'Calling <code class="ml">cut l</code> twice (once for <code class="ml">current</code>, once for <code class="ml">others</code>): the whole computation is done again; <code class="ml">let (current, others) = cut l in</code> avoids it.'],
      grading: '8 points for the exercise; from the statement and the script marked 6 / 8, sublists in reverse order cost 2 points.',
      note: 'No official answer key: solution written and run with OCaml 4.14. The past exams contain a student script marked 18/20, quoted in the solution.'
    },

    'p2022-ex2': {
      src: 'Midterm Oct. 2022 · Ex 2',
      title: 'Insertion after: insert_post',
      intro: '<p>Write the function <code class="ml">insert_post x f lst</code> that takes as parameters:</p><ul><li>an element <code class="ml">x</code></li><li>a one-argument function <code class="ml">f</code> returning a boolean value</li><li>a list <code class="ml">lst</code></li></ul><p>and that inserts the element <code class="ml">x</code> in the list <code class="ml">lst</code> just after the first element <code class="ml">y</code> such that <code class="ml">f y</code> is <code class="ml">true</code>.</p><p>The function has to raise an exception <code class="ml">Failure</code> if there is no element <code class="ml">y</code> after which <code class="ml">x</code> can be inserted.</p>' + M['p2022-ex2.ex'],
      hints: [
        '<code class="ml">f</code> is a one-argument function returning a boolean: it is applied to each element, <code class="ml">f e</code>.',
        'Go along the list: as soon as <code class="ml">f e</code> is true, <code class="ml">x</code> goes just after <code class="ml">e</code> and the rest is copied as it is. Otherwise keep <code class="ml">e</code> and go on.',
        'If you reach the empty list, no element was suitable: this is where <code class="ml">Failure</code> is raised, with the message of the example.'],
      solution: [
        { t: 'The idea', html: '<p>We look for the first element that satisfies <code class="ml">f</code>, and stop there: the rest of the list does not change. Reaching the end of the list without finding it is the error case: it is handled in the <code class="ml">[]</code> case, with no wrapper function (no parameter to check at the start).</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">[]</code> → <code class="ml">failwith "insert_post: x cannot be inserted"</code> (also for a list that is empty from the start).</li><li><code class="ml">e :: l</code> with <code class="ml">f e</code> → <code class="ml">e :: x :: l</code>: stop, the rest <code class="ml">l</code> is kept as it is.</li><li><code class="ml">e :: l</code> otherwise → <code class="ml">e :: insert_post x f l</code>.</li></ul>' },
        { t: 'The code and the Caml answer', html: '<p>This is the official answer key.</p>' + M['p2022-ex2.sol'] },
        { t: 'Check on the examples', html: '<p>The three examples of the paper, then the empty list and a one-element list that is suitable.</p>' + M['p2022-ex2.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val insert_post : \'a -&gt; (\'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Inserting after every element that satisfies <code class="ml">f</code>: only after the first one.',
        'Inserting before (<code class="ml">x :: e :: l</code>): it is just after <code class="ml">y</code>.',
        'Going on after the insertion (<code class="ml">e :: x :: insert_post x f l</code>): <code class="ml">x</code> would be inserted several times, and the end of the list would raise <code class="ml">Failure</code>.',
        'Returning the list without <code class="ml">x</code> when no element is suitable: the paper asks for <code class="ml">Failure</code>.'],
      grading: '3.5 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2022-ex3': {
      src: 'Midterm Oct. 2022 · Ex 3',
      title: 'Position of the maximum: pos_max',
      intro: '<p>Write the function <code class="ml">pos_max lst</code> that returns the position of the maximum element of the list <code class="ml">lst</code>. We assume that the list <code class="ml">lst</code> contains no duplicate and that the position of the first element of the list is 1.</p><p>The function has to raise an exception <code class="ml">Invalid_argument</code> if the list <code class="ml">lst</code> is initially empty.</p>' + M['p2022-ex3.ex'],
      hints: [
        '“Initially empty”: the test is about the starting list, not about the recursive calls (the list always ends up empty). Where do you put it?',
        'Go along the list keeping three pieces of information: the greatest value seen, its position, and the position of the current element.',
        'The wrapper function matches <code class="ml">e :: l</code> and starts the traversal of <code class="ml">l</code> with <code class="ml">e</code> as the maximum, at position 1; the next element is at position 2.'],
      solution: [
        { t: 'The idea', html: '<p>A wrapper function matches the starting list: empty, it is the exception; otherwise its head <code class="ml">e</code> is the first maximum, at position 1. A local recursive function goes through the rest with three extra parameters: <code class="ml">vmax</code> (the greatest element seen), <code class="ml">vpos</code> (its position) and <code class="ml">cur_pos</code> (the position of the current element).</p>' },
        { t: 'The cases of aux_max', html: '<ul><li><code class="ml">[]</code> → <code class="ml">vpos</code>: everything has been seen, return the position of the maximum.</li><li><code class="ml">e :: l</code> with <code class="ml">e &gt; vmax</code> → new maximum: <code class="ml">aux_max e cur_pos (cur_pos + 1) l</code>.</li><li><code class="ml">e :: l</code> otherwise → <code class="ml">aux_max vmax vpos (cur_pos + 1) l</code>.</li></ul><p>The first call is <code class="ml">aux_max e 1 2 l</code>. The maximum starts from the head of the list, not from <code class="ml">0</code>: the function works for negative numbers and for <code class="ml">float</code> values (last example).</p>' },
        { t: 'The code and the Caml answer', html: '<p>This is the first version of the official answer key.</p>' + M['p2022-ex3.sol'] },
        { t: 'Check on the examples', html: '<p>The four examples of the paper and a one-element list.</p>' + M['p2022-ex3.chk'] },
        { t: 'The second version of the official key', html: '<p>Pure recursion: <code class="ml">aux_max</code> returns the pair (maximum, position) of the list, computed from the end; a one-element list gives <code class="ml">(e, 1)</code>, and each element added in front shifts the position by 1. Caml shows a Warning 8 (the <code class="ml">[]</code> case of <code class="ml">aux_max</code> is not written; it never happens, the wrapper prevents it) that the key does not print.</p>' + M['p2022-ex3.v2'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val pos_max : \'a list -&gt; int = &lt;fun&gt;</code>.</p>',
      traps: [
        'Counting positions from 0: the first one is 1.',
        'Testing the empty list inside the recursive function: it becomes empty at the end of every traversal, which is not an error.',
        'Starting from a maximum equal to <code class="ml">0</code>: wrong for a list of negative numbers, and the type gets fixed to <code class="ml">int</code> (the last example uses <code class="ml">float</code> values).',
        'Returning the maximum instead of its position.',
        'In the version that returns a pair, calling <code class="ml">aux_max l</code> twice: name the result with <code class="ml">let … in</code>.'],
      grading: '4.5 points for the exercise, no breakdown.',
      note: 'Code run with OCaml 4.14; the second version of the key raises a warning that the key does not show (step 5).'
    },

    'p2022-ex4': {
      src: 'Midterm Oct. 2022 · Ex 4',
      title: 'Less: less2, then common',
      questions: [
        '<b>1.</b> Write the function <code class="ml">less2 p k l1 l2</code> with the following specifications:<ul><li>It takes as parameters a two-argument function <code class="ml">p</code>, a strictly positive integer <code class="ml">k</code> and two lists: [a<sub>1</sub>; a<sub>2</sub>; …; a<sub>n</sub>] and [b<sub>1</sub>; b<sub>2</sub>; …; b<sub>n</sub>]. The two lists are assumed to have the same length.</li><li>It returns <code class="ml">true</code> if the number of pairs of elements (a<sub>i</sub>, b<sub>i</sub>) such that p a<sub>i</sub> b<sub>i</sub> is <code class="ml">true</code> is strictly less than <code class="ml">k</code>, and <code class="ml">false</code> otherwise.</li><li>It raises an exception <code class="ml">Invalid_argument</code> if the parameter <code class="ml">k</code> is invalid.</li></ul>' + M['p2022-ex4.ex1'],
        '<b>2.</b> Use the previous function <code class="ml">less2</code> (whether you wrote it or not) to write the function <code class="ml">common k l1 l2</code> that checks whether the lists <code class="ml">l1</code> and <code class="ml">l2</code> have strictly more than <code class="ml">k</code> elements with the same values at the same positions. The two lists are assumed to have the same length and the parameter <code class="ml">k</code> is assumed to be positive or zero.' + M['p2022-ex4.ex2']],
      hints: [
        'The test on <code class="ml">k</code> (<code class="ml">Invalid_argument</code> if <code class="ml">k &lt;= 0</code>, from the example) is done once, before going through the two lists.',
        'Go through the two lists together (pattern <code class="ml">(e1 :: l1, e2 :: l2)</code>) with a counter: how many true pairs can still be accepted? As soon as the k-th true pair comes, the answer is <code class="ml">false</code>: no need to go on.',
        'For <code class="ml">common</code>: “strictly more than <code class="ml">k</code> equal pairs” is the opposite of “strictly fewer than <code class="ml">k + 1</code> equal pairs”. The predicate is equality, <code class="ml">function x -&gt; function y -&gt; x = y</code>.'],
      solution: [
        { t: 'The idea of less2', html: '<p>A wrapper function tests <code class="ml">k</code> once. The local recursive function <code class="ml">aux_less k (l1, l2)</code> goes through the two lists together; its <code class="ml">k</code> (the parameter is shadowed) is the number of true pairs still needed to reach <code class="ml">k</code>: each true pair takes it down by 1. When a true pair comes while it is 1, <code class="ml">k</code> true pairs have been found: the answer is <code class="ml">false</code>, without finishing the traversal.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">true</code>: fewer than <code class="ml">k</code> true pairs were found.</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> with <code class="ml">p e1 e2</code> → <code class="ml">k &lt;&gt; 1 &amp;&amp; aux_less (k - 1) (l1, l2)</code>: if <code class="ml">k</code> is 1, <code class="ml">&amp;&amp;</code> returns <code class="ml">false</code> without evaluating the call.</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> otherwise → <code class="ml">aux_less k (l1, l2)</code>.</li><li>Different lengths: the lists are “assumed to have the same length”, but a last case <code class="ml">_ -&gt; invalid_arg …</code> avoids the Warning 8 in the Caml answer.</li></ul>' },
        { t: 'The code and the Caml answer', html: M['p2022-ex4.sol'] + '<p>The official key is the same, without the last case. Caml then answers with a warning, which the key does not print:</p>' + M['p2022-ex4.off'] },
        { t: 'Check on the examples', html: '<p>The four examples of the paper, then a case where the k-th true pair comes: the answer is <code class="ml">false</code>.</p>' + M['p2022-ex4.chk1'] },
        { t: 'The function common', html: '<p>“Strictly more than <code class="ml">k</code> equal pairs” = “at least <code class="ml">k + 1</code>” = not (“strictly fewer than <code class="ml">k + 1</code>”). Since <code class="ml">k ≥ 0</code>, <code class="ml">k + 1 ≥ 1</code>: <code class="ml">less2</code> raises no exception. The official key writes the predicate <code class="ml">(=)</code>, the equality operator used as a two-argument function: it is the same as <code class="ml">function x -&gt; function y -&gt; x = y</code>.</p>' + M['p2022-ex4.sol2'] }],
      answer: '<p>Two functions, each followed by its Caml answer:</p><ul><li><code data-ml-ans>val less2 : (\'a -&gt; \'b -&gt; bool) -&gt; int -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code></li><li><code data-ml-ans>val common : int -&gt; \'a list -&gt; \'a list -&gt; bool = &lt;fun&gt;</code></li></ul>',
      traps: [
        'Counting all the true pairs then comparing with <code class="ml">k</code>: correct, but the traversal goes on when the answer is already known.',
        '“Strictly less than <code class="ml">k</code>”: with <code class="ml">k = 2</code> and exactly 2 true pairs, the answer is <code class="ml">false</code>.',
        'For <code class="ml">common</code>, calling <code class="ml">less2 … k</code> instead of <code class="ml">k + 1</code>, or forgetting the <code class="ml">not</code>.',
        'Writing <code class="ml">p (e1, e2)</code>: <code class="ml">p</code> takes two parameters, write <code class="ml">p e1 e2</code>.',
        'Testing <code class="ml">k</code> inside the recursive function, where it is a counter: the test is repeated at every pair and may fire along the way.'],
      grading: '5 points for the exercise; question 2 can be done even if question 1 is not (“whether you wrote it or not”).',
      note: 'Code run with OCaml 4.14; the official key lacks the last case of less2 and leaves out the Caml warning (step 3).'
    },

    'p2022-ex5': {
      src: 'Midterm Oct. 2022 · Ex 5',
      title: 'Mystery: type, evaluations, finding an application',
      questions: [
        '<b>1.</b> Give the type of the following function.' + M['p2022-ex5.fn'],
        '<b>2.</b> Assume the function mystery1 above is correct and in the Caml environment. Give the results of the successive evaluations of the following phrases if they are correct. If they are incorrect, write "Error".' + M['p2022-ex5.q2'],
        '<b>3.</b> Give an application of the function mystery1 returning the result below.' + M['p2022-ex5.q3']],
      hints: [
        'Type: <code class="ml">l2</code> holds integers (pattern <code class="ml">0::l2</code>, computation <code class="ml">i-1</code>); the elements of <code class="ml">l1</code> are never compared, their type is any type. The result is built with <code class="ml">[l1]</code> and <code class="ml">l3 :: …</code>.',
        '<code class="ml">aux</code> moves the elements of <code class="ml">l1</code> into <code class="ml">l3</code> while decreasing the head of <code class="ml">l2</code>. What does <code class="ml">l3</code> hold when that head reaches 0? In which order?',
        'Question 3: the result has three pieces, so <code class="ml">l2</code> has two numbers; the last piece is the rest of <code class="ml">l1</code>, in order; the others are reversed.'],
      solution: [
        { t: 'The type', html: '<p><code class="ml">l2</code> is matched with <code class="ml">0::l2</code> and its head is used in <code class="ml">i-1</code>: <code class="ml">int list</code>. The elements of <code class="ml">l1</code> are only moved: <code class="ml">\'a list</code>. The result is a list of pieces of <code class="ml">l1</code>: <code class="ml">\'a list list</code>. Caml first shows a Warning 8: the case <code class="ml">([], 1::_)</code> (no element left while <code class="ml">l2</code> still asks for some) is not handled.</p>' + M['p2022-ex5.def'] },
        { t: 'What mystery1 does', html: '<p><code class="ml">aux</code> takes the elements of <code class="ml">l1</code> one by one and pushes them onto the accumulator <code class="ml">l3</code> while decreasing the head of <code class="ml">l2</code>. When that head is 0, the piece <code class="ml">l3</code> is finished: it is added to the result and <code class="ml">l3</code> starts again from <code class="ml">[]</code>. When <code class="ml">l2</code> is empty, the rest of <code class="ml">l1</code> is the last piece, as it is. So <code class="ml">mystery1 l1 l2</code> cuts <code class="ml">l1</code> into pieces whose sizes are given by <code class="ml">l2</code>, each piece being <b>reversed</b>, plus the rest of <code class="ml">l1</code> in order.</p>' },
        { t: 'Trace on a small example', html: M['p2022-ex5.trace'] },
        { t: 'The evaluations', html: '<p>Pieces of 4, 1 and 2 elements, reversed, then the rest <code class="ml">[8; 9; 10]</code>. For the second one, 7 then 3 elements use up the list: the rest is the empty list, hence the final <code class="ml">[]</code>. Neither phrase is incorrect.</p>' + M['p2022-ex5.evals'] },
        { t: 'Question 3', html: '<p>Three pieces, so <code class="ml">l2</code> has two numbers. The first piece, <code class="ml">[5; 15; 5]</code>, is a reversed piece of 3 elements: it is a palindrome, so <code class="ml">l1</code> starts with <code class="ml">5; 15; 5</code>. Then a piece of 1 element, <code class="ml">[21]</code>, and the rest <code class="ml">[5; 1; 4]</code> as it is. This is the official answer. If <code class="ml">l2</code> asks for more elements than <code class="ml">l1</code> has, we hit the unhandled case: <code class="ml">Match_failure</code>.</p>' + M['p2022-ex5.q3sol'] }],
      answer: '<ol><li><code data-ml-ans>val mystery1 : \'a list -&gt; int list -&gt; \'a list list = &lt;fun&gt;</code> (after a Warning 8).</li><li><code data-ml-ans>- : int list list = [[4; 3; 2; 1]; [5]; [7; 6]; [8; 9; 10]]</code> then <code data-ml-ans>- : int list list = [[7; 6; 5; 4; 3; 2; 1]; [10; 9; 8]; []]</code></li><li><code class="ml">mystery1 [5; 15; 5; 21; 5; 1; 4] [3; 1]</code></li></ol>',
      traps: [
        'Forgetting that each piece is reversed: the accumulator <code class="ml">l3</code> stacks.',
        'Reversing the last piece too: <code class="ml">[l1]</code> gives it as it is.',
        'Forgetting the final <code class="ml">[]</code> of the second evaluation: when <code class="ml">l2</code> is empty, <code class="ml">[l1]</code> is added even if <code class="ml">l1</code> is empty.',
        'Writing <code class="ml">int list -&gt; int list -&gt; int list list</code>: nothing forces integers in <code class="ml">l1</code>.',
        'Answering “Error”: both phrases are correct; only a call that asks for too many elements raises an exception.'],
      grading: '3 points for the exercise (type, two evaluations, application), no breakdown.',
      note: 'Code run with OCaml 4.14; the official key gives the same results, without the warning.'
    },

    'p2021-ex2': {
      src: 'Midterm Nov. 2021 · Ex 2',
      title: 'Deleting an interval: remove_interval',
      intro: '<p>Write the function <code class="ml">remove_interval list i j</code> that deletes all the values between the places <code class="ml">i</code> and <code class="ml">j</code> in the list <code class="ml">list</code> (base 1). So all the values at places k with k ∈ [i, j] have to be deleted from the list <code class="ml">list</code>.</p><p>The function has to raise an exception:</p><ul><li><code class="ml">Invalid_argument</code> if <code class="ml">i</code> or <code class="ml">j</code> is negative or zero, or if i &gt; j</li><li><code class="ml">Failure</code> if the list is too short.</li></ul><p>Application examples with <code class="ml">list1</code> the list <code class="ml">[11; 2; 23; 14; 5; 26; -7; 18; 99]</code>:</p>' + M['p2021-ex2.ex'],
      hints: [
        'The three conditions of <code class="ml">Invalid_argument</code> are about the parameters: one wrapper function, a single test, before any traversal.',
        'Go along the list knowing the position of the current element (extra parameter, starting at 1). Three situations: before <code class="ml">i</code>, between <code class="ml">i</code> and <code class="ml">j</code>, after <code class="ml">j</code>.',
        'After <code class="ml">j</code>, return the rest as it is: no need to go on. If the list ends while the position has not gone past <code class="ml">j</code>, it is too short: <code class="ml">Failure</code>.'],
      solution: [
        { t: 'The idea', html: '<p>The wrapper function tests <code class="ml">i &lt;= 0 || j &lt;= 0 || j &lt; i</code> only once. The recursive function <code class="ml">remove</code> gets a pair (remaining list, position <code class="ml">n</code> of its head); <code class="ml">i</code> and <code class="ml">j</code> are still visible, no need to pass them.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">([], n)</code>: the list is over. If <code class="ml">n &lt;= j</code>, the place <code class="ml">j</code> does not exist: the list is too short (<code class="ml">Failure</code>); otherwise return <code class="ml">[]</code>.</li><li><code class="ml">(list, n)</code> with <code class="ml">n &gt; j</code>: the whole interval has been deleted, return the rest as it is (early stop).</li><li><code class="ml">(e :: q, n)</code> with <code class="ml">n &lt; i</code>: before the interval, keep <code class="ml">e</code>.</li><li><code class="ml">(e :: q, n)</code> otherwise: <code class="ml">n</code> is in [i, j], <code class="ml">e</code> is not kept.</li></ul><p>The order of the cases matters: the case <code class="ml">n &gt; j</code> comes before the last two. A list that ends exactly at <code class="ml">j</code> is valid: <code class="ml">remove_interval list1 6 9</code> reaches <code class="ml">([], 10)</code>, and 10 &gt; 9.</p>' },
        { t: 'The code and the Caml answer', html: '<p>This is the first version of the official answer key. The message “remove_internal” (not “remove_interval”) is a typo of the paper, kept by the key: copy the message of the example.</p>' + M['p2021-ex2.sol'] },
        { t: 'Check on the examples', html: '<p>First define <code class="ml">list1</code>, then the six examples of the paper and two edge cases.</p>' + M['p2021-ex2.sol_chk'] },
        { t: 'The second version of the official key', html: '<p>It brings <code class="ml">i</code> and <code class="ml">j</code> down instead of counting the position (patterns <code class="ml">(1, 1, e :: l)</code>, <code class="ml">(1, j, _ :: l)</code>, <code class="ml">(i, j, e :: l)</code>). It is correct, but its <code class="ml">Invalid_argument</code> message is “remove_internal: invalid ranks”, different from the example: keep the message of the statement.</p>' }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val remove_interval : \'a list -&gt; int -&gt; int -&gt; \'a list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Forgetting one of the three conditions of <code class="ml">Invalid_argument</code>: <code class="ml">i &lt;= 0</code>, <code class="ml">j &lt;= 0</code>, <code class="ml">i &gt; j</code>.',
        'Taking a list that ends exactly at <code class="ml">j</code> for too short: <code class="ml">remove_interval list1 6 9</code> is valid.',
        'Going on after <code class="ml">j</code>: the rest is returned as it is.',
        'Returning a list when it is too short (<code class="ml">remove_interval list1 5 12</code>): the paper asks for <code class="ml">Failure</code>.',
        'Counting places from 0: the statement says “base 1”.'],
      grading: '6 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2021-ex3': {
      src: 'Midterm Nov. 2021 · Ex 3',
      title: 'Alternating lists: alternate_list',
      intro: '<p>Write the function <code class="ml">alternate_list l1 l2</code> with the list l1 = [a<sub>1</sub>; a<sub>2</sub>; …; a<sub>n</sub>] and the list l2 = [b<sub>1</sub>; b<sub>2</sub>; …; b<sub>m</sub>] that builds the alternating list defined as follows:</p><ul><li>if the two lists have the same length, the elements alternate: see example 1 <code class="ml">(* ex 1 *)</code>;</li><li>if the list l1 is longer (n &gt; m), we alternate until l2 is used up (so some elements of l1 will be missing): see example 2;</li><li>if the list l2 is longer (m &gt; n), l1 is "repeated" until l2 is used up: [a<sub>1</sub>; b<sub>1</sub>; a<sub>2</sub>; b<sub>2</sub>; …; a<sub>n</sub>; b<sub>n</sub>; a<sub>1</sub>; b<sub>n+1</sub>; …; a<sub>k</sub>; b<sub>m</sub>]: see examples 3 and 4.</li></ul><p>Application examples:</p>' + M['p2021-ex3.ex'],
      hints: [
        'Two lists: think about the cases <code class="ml">[]</code> or not for each one. When <code class="ml">l2</code> is empty, it is over; when both are non-empty, take one element from each.',
        'When <code class="ml">l1</code> is used up but not <code class="ml">l2</code>, start again from the beginning of <code class="ml">l1</code>: the original list must stay reachable. A local function, defined inside the main function, can still see it.',
        'Watch the case where <code class="ml">l1</code> is empty from the start: starting <code class="ml">l1</code> again would loop forever. The example gives the answer: return <code class="ml">l2</code>.'],
      solution: [
        { t: 'The idea', html: '<p>A local function <code class="ml">aux</code> goes through the pair <code class="ml">(l1, l2)</code>; it is defined inside <code class="ml">alternate_list</code>, so it can still see <code class="ml">list1</code>, the <b>original</b> first list. When its first list is used up, it starts again from <code class="ml">list1</code>.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">([], l2)</code> → <code class="ml">aux (list1, l2)</code>: the first list starts again (if <code class="ml">l2</code> is empty too, the next call hits case 2 and returns <code class="ml">[]</code>).</li><li><code class="ml">(l1, [])</code> → <code class="ml">[]</code>: the second list is over, the remaining elements of <code class="ml">l1</code> are lost (example 2).</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> → <code class="ml">e1 :: e2 :: aux (l1, l2)</code>.</li><li>Wrapper: if <code class="ml">list1</code> is empty, return <code class="ml">list2</code> (example 5); otherwise <code class="ml">aux (list1, list2)</code>. Without this test, <code class="ml">aux ([], l2)</code> would call itself forever.</li></ul>' + M['p2021-ex3.trace'] },
        { t: 'The code and the Caml answer', html: '<p>This is the official answer key.</p>' + M['p2021-ex3.sol'] },
        { t: 'Check on the examples', html: '<p>Example 4, the last two examples of the paper and two empty lists.</p>' + M['p2021-ex3.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val alternate_list : \'a list -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Starting again with the tail <code class="ml">l1</code> instead of the original list: <code class="ml">list1</code> must stay at hand (parameter of the main function).',
        'Not handling <code class="ml">list1 = []</code> on its own: <code class="ml">aux ([], l2)</code> would call itself forever (Stack overflow).',
        'Adding the remaining elements of <code class="ml">l1</code> when <code class="ml">l2</code> is over: example 2 shows they are lost.',
        'Writing <code class="ml">[e1; e2] @ aux (l1, l2)</code>: correct, but <code class="ml">e1 :: e2 :: …</code> is enough and avoids <code class="ml">@</code>.'],
      grading: '5 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2021-ex4': {
      src: 'Midterm Nov. 2021 · Ex 4',
      title: 'Mystery: aux, mystery and a predicate',
      intro: '<p>Give the results of the successive evaluations of the following phrases if they are correct. If they are incorrect, write "Error".</p>' + M['p2021-ex4.q'],
      hints: [
        'Start with <code class="ml">aux</code>: depending on <code class="ml">p e</code>, <code class="ml">e</code> goes at the head of the first or the second list of the pair. Evaluate the second phrase before reading <code class="ml">mystery</code>.',
        'In <code class="ml">mystery</code>, <code class="ml">p</code> is applied to a single element (<code class="ml">p e</code> in <code class="ml">aux</code>). What happens with an <code class="ml">f</code> that has two parameters?',
        'For the last phrase, interleave the two lists (a1, b1, a2, b2, …, then the rest of the longer one), then sort each element with <code class="ml">p</code>, in that order.'],
      solution: [
        { t: 'aux', html: '<p><code class="ml">aux p e (r1, r2)</code> adds <code class="ml">e</code> at the head of <code class="ml">r1</code> if <code class="ml">p e</code> is true, at the head of <code class="ml">r2</code> otherwise. Its type: <code class="ml">p</code> is a function returning a boolean, <code class="ml">e</code> has the type of the elements of both lists. Caml writes this long type over two lines. Phrase 2: 10 is even, it goes at the head of the first list: <code class="ml">([10; 0; 2], [1; 3])</code>.</p>' },
        { t: 'mystery', html: '<p><code class="ml">mystery p (l1, l2)</code> takes one element from each list in turn (a1, b1, a2, b2, …), then the rest of the longer one, and sorts each element with <code class="ml">aux</code>: the result is the pair (elements that satisfy <code class="ml">p</code>, elements that do not), in that interleaving order. <code class="ml">aux p e1 (aux p e2 …)</code> puts <code class="ml">e1</code> in front of <code class="ml">e2</code>.</p>' + M['p2021-ex4.inter'] },
        { t: 'Phrase 4: Error', html: '<p><code class="ml">f</code> has two parameters: its type is <code class="ml">int -&gt; int -&gt; bool</code>. But <code class="ml">mystery</code> expects a one-argument predicate (<code class="ml">\'a -&gt; bool</code>), because <code class="ml">aux</code> computes <code class="ml">p e</code> and uses it as a boolean. Caml rejects the phrase: the answer is “Error”.</p>' },
        { t: 'Phrase 5', html: '<p>Interleaving order: 1, 10, 2, 11, 3, 12, 4, 13, 5, 14, then 6, 7, 8. The even ones, in that order: <code class="ml">[10; 2; 12; 4; 14; 6; 8]</code>; the odd ones: <code class="ml">[1; 11; 3; 13; 5; 7]</code>.</p>' },
        { t: 'The Caml answers', html: M['p2021-ex4.all'] }],
      answer: '<ol><li><code data-ml-ans>val aux : (\'a -&gt; bool) -&gt; \'a -&gt; \'a list * \'a list -&gt; \'a list * \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>- : int list * int list = ([10; 0; 2], [1; 3])</code></li><li><code data-ml-ans>val mystery : (\'a -&gt; bool) -&gt; \'a list * \'a list -&gt; \'a list * \'a list = &lt;fun&gt;</code></li><li>Error (<code class="ml">f</code> has two parameters, <code class="ml">mystery</code> expects a one-argument predicate).</li><li><code data-ml-ans>- : int list * int list = ([10; 2; 12; 4; 14; 6; 8], [1; 11; 3; 13; 5; 7])</code></li></ol>',
      traps: [
        'Giving a value for phrase 4: Caml rejects <code class="ml">mystery f</code> (“Error”), because <code class="ml">f</code> has two parameters.',
        'Forgetting that <code class="ml">aux</code> adds at the head: phrase 2 gives <code class="ml">([10; 0; 2], [1; 3])</code>, not <code class="ml">[0; 2; 10]</code>.',
        'Mixing up the order: <code class="ml">aux p e1 (aux p e2 …)</code> puts <code class="ml">e1</code> before <code class="ml">e2</code>.',
        'Thinking the longer list is cut: the case <code class="ml">(e1::l1, [])</code> goes on to the end.',
        'Forgetting the answers to the two definitions (<code class="ml">val aux : …</code> and <code class="ml">val mystery : …</code>).'],
      grading: '4 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2020-ex2': {
      src: 'Midterm Nov. 2020 · Ex 2',
      title: 'Deletion in a sorted list: delete',
      intro: '<p>Write the function <code class="ml">delete x list</code> that removes the first appearance of the value <code class="ml">x</code> (if it is present) from the sorted (in increasing order) list <code class="ml">list</code>.</p>',
      hints: [
        'The list is sorted in increasing order: while going along it, as soon as you see an element greater than <code class="ml">x</code>, you know that <code class="ml">x</code> is not further on.',
        'Three cases for <code class="ml">h :: q</code>: <code class="ml">h &gt; x</code> (stop, nothing to remove), <code class="ml">h = x</code> (remove this appearance and keep the rest), otherwise keep <code class="ml">h</code> and go on.',
        'And the empty list? <code class="ml">x</code> is absent: return the empty list, with no exception (“if it is present”).'],
      solution: [
        { t: 'The idea', html: '<p>We go along the list and stop as soon as the answer is known: either we find <code class="ml">x</code> (remove it, the rest does not change), or we go past <code class="ml">x</code> (it is absent, the list does not change). The paper gives no example; an absent <code class="ml">x</code> is not an error.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">[]</code> → <code class="ml">[]</code>: <code class="ml">x</code> is absent.</li><li><code class="ml">h :: q</code> with <code class="ml">h &gt; x</code> → <code class="ml">h :: q</code>, the list itself: the list is increasing, <code class="ml">x</code> cannot be further on.</li><li><code class="ml">h :: q</code> with <code class="ml">h = x</code> → <code class="ml">q</code>: only the first appearance is removed.</li><li><code class="ml">h :: q</code> otherwise (<code class="ml">h &lt; x</code>) → <code class="ml">h :: delete x q</code>.</li></ul>' },
        { t: 'The code and the Caml answer', html: '<p>This is the official answer key, with its example. The paper gave none.</p>' + M['p2020-ex2.sol'] },
        { t: 'Check', html: '<p>The example of the key, then: immediate stop (1 &gt; 0), an absent value greater than everything, the empty list. The last call shows the price of the early stop if the list is not sorted: 3 &gt; 2 stops the search, the 2 is not removed. That is expected, the statement guarantees a sorted list.</p>' + M['p2020-ex2.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val delete : \'a -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Removing all the appearances: only the first one (<code class="ml">delete 4 [1; 2; 2; 3; 4; 4; 4; 5]</code> keeps two 4s).',
        'Going through the whole list when <code class="ml">x</code> is absent: the list is sorted, stop as soon as <code class="ml">h &gt; x</code>.',
        'Raising an exception when <code class="ml">x</code> is absent: “if it is present” means the list is then returned unchanged.',
        'Returning <code class="ml">q</code> in the case <code class="ml">h &gt; x</code>: <code class="ml">h</code> would be lost.'],
      grading: '4 points for the exercise, no breakdown.',
      note: 'Code run with OCaml 4.14. It is also exercise 3.2 of this year’s lists tutorial.'
    },

    'p2020-ex4': {
      src: 'Midterm Nov. 2020 · Ex 4',
      title: 'Double search: search_both',
      intro: '<p>Write the function <code class="ml">search_both list a b</code> that tests whether the two distinct values <code class="ml">a</code> and <code class="ml">b</code> are in the list <code class="ml">list</code>.</p><p>Application examples:</p>' + M['p2020-ex4.ex'],
      hints: [
        'The simplest: a function that tells whether a value is present, called twice. It works, but the list is read twice.',
        'A single traversal: go on until you find <code class="ml">a</code> or <code class="ml">b</code>. If you find <code class="ml">a</code>, you only have to look for <code class="ml">b</code> in the rest, and the other way round.',
        'Another idea: two boolean parameters (<code class="ml">a</code> seen yet? <code class="ml">b</code> seen yet?), and the answer <code class="ml">true</code> as soon as both are true.'],
      solution: [
        { t: 'The idea', html: '<p>A single traversal, which stops as soon as the answer is known. Go on until the first of the two values: if it is <code class="ml">a</code>, you only have to look for <code class="ml">b</code> in the rest; if it is <code class="ml">b</code>, look for <code class="ml">a</code>. If the list ends before, neither is present.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">present x l</code>: <code class="ml">[]</code> → <code class="ml">false</code>; <code class="ml">e :: l</code> → <code class="ml">e = x || present x l</code> (<code class="ml">||</code> stops at the first <code class="ml">true</code>).</li><li><code class="ml">search</code>: <code class="ml">[]</code> → <code class="ml">false</code>; <code class="ml">e :: l</code> with <code class="ml">e = a</code> → <code class="ml">present b l</code>; with <code class="ml">e = b</code> → <code class="ml">present a l</code>; otherwise <code class="ml">search l</code>.</li></ul><p>Looking only in the rest is enough: if the other value were earlier, it would have been found first.</p>' },
        { t: 'The code and the Caml answer', html: M['p2020-ex4.sol'] },
        { t: 'Check on the examples', html: '<p>The three examples of the paper (in the second one, -4 comes before 21) and the empty list.</p>' + M['p2020-ex4.chk'] },
        { t: 'The official answer key', html: '<p>It gives two correct versions, but named <code class="ml">search v1 v2 l</code>, with the list last: in the exam, keep the name and the order of the parameters of the statement. Its first version is the one of step 3. The second one keeps two booleans, “v1 seen” and “v2 seen”:</p>' + M['p2020-ex4.off'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val search_both : \'a list -&gt; \'a -&gt; \'a -&gt; bool = &lt;fun&gt;</code>.</p>',
      traps: [
        'Renaming the function or changing the order of the parameters like the official key: keep <code class="ml">search_both list a b</code>.',
        '<code class="ml">present a list &amp;&amp; present b list</code>: correct, but two traversals; the expected idea is a single traversal that stops as soon as both values are found.',
        'After finding <code class="ml">a</code>, looking for <code class="ml">b</code> from the start of the list: the rest is enough.',
        'Assuming <code class="ml">a</code> comes before <code class="ml">b</code>: in the second example, -4 comes before 21.'],
      grading: '4 points for the exercise, no breakdown.',
      note: 'Solution written and run with OCaml 4.14, on the idea of the first version of the official key, which names the function search v1 v2 l (step 5).'
    },

    'p2020-ex5': {
      src: 'Midterm Nov. 2020 · Ex 5',
      title: 'Mystery: go and what',
      intro: '<p>The go function is defined as</p>' + M['p2020-ex5.fn'] + '<p>Give the results of the successive evaluations of the following phrases.</p>' + M['p2020-ex5.q'],
      hints: [
        '<code class="ml">go</code> splits the head <code class="ml">e</code> from the rest, then calls <code class="ml">what e list</code>. In <code class="ml">what</code>, the <code class="ml">e</code> of the pattern shadows the one of <code class="ml">go</code>.',
        '<code class="ml">what x (e :: list)</code> produces <code class="ml">e * x</code>, then calls itself with <code class="ml">e</code> as the new <code class="ml">x</code>. What is <code class="ml">x</code> at each step?',
        'Count the elements: a list of n elements gives n − 1 products.'],
      solution: [
        { t: 'What go does', html: '<p><code class="ml">what x lst</code> multiplies each element of <code class="ml">lst</code> by the one before it: the parameter <code class="ml">x</code> is the previous element, and the recursive call passes the current element <code class="ml">e</code> as the new <code class="ml">x</code>. <code class="ml">go</code> starts <code class="ml">what</code> with the head as the first “previous” element. Result: the list of the products of two neighbours, with one element fewer than the starting list. <code class="ml">e * x</code> forces integers: <code class="ml">int list -&gt; int list</code>.</p>' },
        { t: 'Trace of go [1; 2; 3; 4; 5]', html: M['p2020-ex5.trace'] },
        { t: 'The Caml answers', html: '<p>The official key also gives the answer to the definition.</p>' + M['p2020-ex5.evals'] }],
      answer: '<p><code data-ml-ans>val go : int list -&gt; int list = &lt;fun&gt;</code> for the definition, then:</p><ul><li><code data-ml-ans>- : int list = [1; 1; 1; 1]</code></li><li><code data-ml-ans>- : int list = []</code></li><li><code data-ml-ans>- : int list = [2; 6; 12; 20]</code></li><li><code data-ml-ans>- : int list = [42; 42; 42; 42; 42]</code></li></ul>',
      traps: [
        'Returning as many elements as the list: there is one fewer (<code class="ml">go [42]</code> → <code class="ml">[]</code>).',
        'Always multiplying by the starting head: <code class="ml">x</code> changes at each call.',
        'Mixing up the two <code class="ml">e</code>: the one in the pattern of <code class="ml">what</code> shadows the one of <code class="ml">go</code>.',
        'Writing <code class="ml">\'a list -&gt; \'a list</code>: the multiplication <code class="ml">*</code> forces integers.'],
      grading: '2 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2019-ex2': {
      src: 'Midterm Oct. 2019 · Ex 2',
      title: 'Dominoes: is_dominoes',
      intro: '<p>For this exercise, we are interested in the Domino game:</p><ul><li>A domino will be represented by a pair of integers (a, b)</li><li>A sequence of dominoes (chain) will be a list of pairs of integers [(a<sub>1</sub>, b<sub>1</sub>); (a<sub>2</sub>, b<sub>2</sub>); …; (a<sub>n</sub>, b<sub>n</sub>)].</li></ul><p>A domino chain is considered valid if the neighboring dominoes have the same number of points (see examples below).</p><p>Write the function <code class="ml">is_dominoes</code> that checks if a chain of dominoes is valid.</p><p>Application examples:</p>' + M['p2019-ex2.ex'],
      hints: [
        'Looking at the head is not enough: two neighbouring dominoes must be compared. Which pattern gives the first two elements of a list?',
        'Three cases: the empty list, the list of a single domino (always valid), and <code class="ml">(a, b) :: (c, d) :: l</code>.',
        'In the last case, compare <code class="ml">b</code> and <code class="ml">c</code>, then go on with the list without its first domino only: <code class="ml">(c, d) :: l</code>, not <code class="ml">l</code>.'],
      solution: [
        { t: 'The idea', html: '<p>A chain is valid if each domino “touches” the next one: the right part <code class="ml">b</code> of the first equals the left part <code class="ml">c</code> of the second. So two elements must be looked at together, with the pattern <code class="ml">(_, b) :: (c, d) :: l</code>. The course advice says it: when the head is not enough, three cases (empty, one element, at least two).</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">[]</code> and <code class="ml">[_]</code> (also written <code class="ml">_::[]</code>) → <code class="ml">true</code>: nothing to compare.</li><li><code class="ml">(_, b) :: (c, d) :: l</code> → <code class="ml">b = c &amp;&amp; is_dominoes ((c, d) :: l)</code>: check the joint, then the chain starting at the second domino. <code class="ml">&amp;&amp;</code> stops at the first wrong joint.</li></ul>' },
        { t: 'The code and the Caml answer', html: '<p>This is the first of the three versions of the official answer key. The type is <code class="ml">(\'a * \'a) list -&gt; bool</code>, not <code class="ml">(int * int) list</code>: nothing in the code forces integers, only that <code class="ml">b</code> and <code class="ml">c</code> have the same type.</p>' + M['p2019-ex2.sol'] },
        { t: 'Check on the examples', html: '<p>The three examples of the paper and a single domino.</p>' + M['p2019-ex2.chk'] },
        { t: 'Two variants', html: '<p>The official key also gives a version with a guarded pattern, which answers <code class="ml">false</code> as soon as a joint is wrong (same type):</p>' + M['p2019-ex2.v2'] + '<p>Without the single-domino case, Caml reports the forgotten case, and a valid chain ends in an exception: the last domino is left alone.</p>' + M['p2019-ex2.bad'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val is_dominoes : (\'a * \'a) list -&gt; bool = &lt;fun&gt;</code>.</p>',
      traps: [
        'Calling the function again on <code class="ml">l</code>: a domino is skipped, and the joint between <code class="ml">(c, d)</code> and the next one is never checked.',
        'Forgetting the single-domino case: Warning 8, and every non-empty chain ends in <code class="ml">Match_failure</code>.',
        'Comparing the wrong parts: the neighbouring parts are the right one of the first (<code class="ml">b</code>) and the left one of the second (<code class="ml">c</code>).',
        'Writing <code class="ml">(int * int) list -&gt; bool</code> in the Caml answer: Caml answers <code class="ml">(\'a * \'a) list -&gt; bool</code>.',
        'Expressing equality with the pattern <code class="ml">(a, b) :: (b, d) :: l</code>: Caml rejects a variable bound twice in a pattern.'],
      grading: '4 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2019-ex3': {
      src: 'Midterm Oct. 2019 · Ex 3',
      title: 'Deletion at rank i: remove_nth',
      intro: '<p>Write the function <code class="ml">remove_nth i list</code> that deletes the value at the rank i in the list <code class="ml">list</code>. The function has to raise an exception <code class="ml">Invalid_argument</code> if <code class="ml">i</code> is negative or zero, or an exception <code class="ml">Failure</code> if the list is too short.</p><p>Application examples:</p>' + M['p2019-ex3.ex'],
      hints: [
        'Two exceptions of different kinds: <code class="ml">Invalid_argument</code> for the rank (a parameter, tested once, in the wrapper function), <code class="ml">Failure</code> for a list that is too short (found during the traversal).',
        'Bring the rank down at each element: deleting the i-th element of <code class="ml">e :: q</code> means keeping <code class="ml">e</code> and deleting the (i − 1)-th element of <code class="ml">q</code>.',
        'When the rank is 1, the current element is the one to delete: return <code class="ml">q</code>. If the list runs out before, it is too short.'],
      solution: [
        { t: 'The idea', html: '<p>The wrapper function tests the rank only once: <code class="ml">i &lt; 1</code> → <code class="ml">invalid_arg</code>. The local recursive function <code class="ml">del</code> brings the rank down while going along the list; it is the one that finds out that the list is too short.</p>' },
        { t: 'The cases of del', html: '<ul><li><code class="ml">[]</code> → <code class="ml">failwith "out of bound"</code>: there is no i-th element.</li><li><code class="ml">e :: q</code> with <code class="ml">i = 1</code> → <code class="ml">q</code>: <code class="ml">e</code> is removed, the rest is kept as it is.</li><li><code class="ml">e :: q</code> otherwise → <code class="ml">e :: del (i-1) q</code>.</li></ul>' },
        { t: 'The code and the Caml answer', html: M['p2019-ex3.sol'] },
        { t: 'Check on the examples', html: '<p>The three examples of the paper, then the last element, a one-element list and the empty list. For the third example, Caml answers <code class="ml">Invalid_argument</code>: the <code class="ml">Invalid_arg</code> printed in the paper is a typo, that constructor does not exist.</p>' + M['p2019-ex3.chk'] },
        { t: 'The official key is wrong', html: '<p>Its three versions test the rank with <code class="ml">failwith "negative rank"</code>: they raise <code class="ml">Failure</code> instead of <code class="ml">Invalid_argument</code>, against the statement. Example with the first version:</p>' + M['p2019-ex3.off'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val remove_nth : int -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Writing <code class="ml">failwith "negative rank"</code> like the official key: the statement requires <code class="ml">Invalid_argument</code>.',
        'Copying <code class="ml">Invalid_arg</code>: that constructor does not exist (typo of the paper); <code class="ml">invalid_arg "…"</code> raises <code class="ml">Invalid_argument</code>.',
        'Testing the rank inside the recursive function: the test is repeated at every element.',
        'Returning the list unchanged when it is too short: the paper asks for <code class="ml">Failure</code>.',
        'Counting ranks from 0: the first element is at rank 1.'],
      grading: '5 points for the exercise, no breakdown.',
      note: 'The official key raises Failure instead of Invalid_argument for a negative or zero rank (step 5): solution written and run with OCaml 4.14.'
    },

    'p2019-ex4': {
      src: 'Midterms Nov. 2017 and Oct. 2019 · Ex 4',
      title: 'for_all2, then almost',
      intro: '<p>Statement of October 2019 (official English version). The November 2017 one (exercise 4, 5 points, same examples, in French only) differs in two details only: “a test function (a predicate) with two parameters” in question 1, and a shorter question 2, without the sentence on the exception: “Use the function for_all2 to define a function that checks whether two lists are \'quasi identical\': the values at the same places can differ by 1 at most.”</p>',
      questions: [
        '<b>1.</b> Write the Caml function <code class="ml">for_all2</code> with the following specifications:<ul><li>It takes a two-argument boolean function (a predicate): <code class="ml">p</code>, and two lists: [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>] and [b<sub>1</sub>; b<sub>2</sub>; ···; b<sub>n</sub>], as parameters.</li><li>It checks whether all pairs of elements a<sub>i</sub> b<sub>i</sub> satisfy the predicate p.</li><li>If a pair such that p a<sub>i</sub> b<sub>i</sub> is false is found, it returns false. Otherwise, it raises <code class="ml">Invalid_argument</code> if the two lists have different lengths.</li></ul>',
        '<b>2.</b> Use the function <code class="ml">for_all2</code> to define a function that verifies whether two integer lists are "quasi identical": difference between the values at the same place can not exceed 1. If no pair with a difference over one has been found and if the two lists have different lengths, an exception is raised.<p>Examples of utilisation:</p>' + M['p2019-ex4.ex']],
      hints: [
        'Two lists: usually four cases, here three are enough: both empty, both non-empty, and “one empty, the other not” (different lengths).',
        '“If a false pair is found, it returns false. Otherwise, … exception”: the pair must be tested before the recursive call. <code class="ml">p a b &amp;&amp; for_all2 p l1 l2</code> does it: if <code class="ml">p a b</code> is false, the call is not evaluated.',
        'For <code class="ml">almost</code>, write the predicate “the gap between <code class="ml">x</code> and <code class="ml">y</code> is at most 1” without <code class="ml">abs</code> (a predefined function): two comparisons are enough. Then a single line: <code class="ml">for_all2 near list1 list2</code>.'],
      solution: [
        { t: 'The idea of for_all2', html: '<p><code class="ml">for_all2 p [a1; …; an] [b1; …; bn]</code> computes <code class="ml">p a1 b1 &amp;&amp; p a2 b2 &amp;&amp; … &amp;&amp; p an bn</code>, stopping at the first false pair. The lengths are not compared in advance: they are found out when one list ends before the other. Since a false pair stops everything first, the exception is raised only if no false pair was found, exactly as “Otherwise” asks.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">true</code>: all the pairs have been checked.</li><li><code class="ml">(_, [])</code> or <code class="ml">([], _)</code> → <code class="ml">invalid_arg "for_all2: different lengths"</code>.</li><li><code class="ml">(a :: l1, b :: l2)</code> → <code class="ml">p a b &amp;&amp; for_all2 p l1 l2</code>.</li></ul><p>The two different-length patterns come before the last case, but they can only match if one of the lists is empty: the order changes nothing here.</p>' },
        { t: 'The code and the Caml answer', html: '<p>This is the 2019 official answer key (first of its three versions). The type of <code class="ml">for_all2</code> shows that the two lists may have different element types.</p>' + M['p2019-ex4.sol'] },
        { t: 'The function almost', html: '<p>“The difference can not exceed 1”: |x − y| ≤ 1, that is y − 2 &lt; x &lt; y + 2 for integers, without <code class="ml">abs</code>. The predicate <code class="ml">near</code> is defined locally, then passed to <code class="ml">for_all2</code>. The subtraction forces integers: <code class="ml">int list -&gt; int list -&gt; bool</code>. The exception of question 2 comes from <code class="ml">for_all2</code>, nothing to add.</p>' + M['p2019-ex4.sol2'] },
        { t: 'Check on the examples', html: '<p>The two examples, then: different lengths with no false pair (exception), a false pair before the end of the short list (<code class="ml">false</code>, no exception), two empty lists.</p>' + M['p2019-ex4.chk'] }],
      answer: '<p>Two functions, each followed by its Caml answer:</p><ul><li><code data-ml-ans>val for_all2 : (\'a -&gt; \'b -&gt; bool) -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code></li><li><code data-ml-ans>val almost : int list -&gt; int list -&gt; bool = &lt;fun&gt;</code></li></ul>',
      traps: [
        'Comparing the lengths before looking for a false pair: the statement wants <code class="ml">false</code> as soon as a pair is false, even if the lengths differ (<code class="ml">almost [1; 7; 3] [1; 2; 3; 4]</code> → <code class="ml">false</code>).',
        'Writing <code class="ml">abs (x - y) &lt;= 1</code>: <code class="ml">abs</code> is a predefined function, forbidden.',
        'Writing a traversal again inside <code class="ml">almost</code>: the statement asks to use <code class="ml">for_all2</code>.',
        'Forgetting the case <code class="ml">([], [])</code>, which returns <code class="ml">true</code>.',
        'Swapping the order in <code class="ml">&amp;&amp;</code> (<code class="ml">for_all2 p l1 l2 &amp;&amp; p a b</code>): the list is read to the end before the pair is tested, and the exception comes before the <code class="ml">false</code>.'],
      grading: '5 points for the exercise (in 2017 as in 2019), no breakdown.',
      note: 'Code run with OCaml 4.14. 2019 official answer key; no key for 2017. It is also exercise 2.8 of this year’s higher-order functions tutorial.'
    },

    'p2019-ex5': {
      src: 'Midterm Oct. 2019 · Ex 5',
      title: 'Mystery: what and is_that',
      intro: '<p>Give the results of the successive evaluations of the following phrases.</p>' + M['p2019-ex5.q'],
      hints: [
        '<code class="ml">what (x, y)</code> goes through two lists together: when does it return <code class="ml">true</code>? Try <code class="ml">what ([1; 2], [1; 2; 3])</code> then <code class="ml">what ([1; 2], [2; 1])</code>.',
        '<code class="ml">is_that x y</code> adds 1 for each position of <code class="ml">y</code> where <code class="ml">what (x, y)</code> is true, moving one element at a time.',
        'Do not forget the Caml answer to the definition: <code data-ml-ans>val mystery : … = &lt;fun&gt;</code>.'],
      solution: [
        { t: 'what', html: '<p><code class="ml">what (x, y)</code> compares <code class="ml">x</code> and <code class="ml">y</code> element by element: if <code class="ml">x</code> is used up, it is <code class="ml">true</code>; if <code class="ml">y</code> runs out before <code class="ml">x</code>, or if two elements differ, it is <code class="ml">false</code>. So it tells whether <code class="ml">x</code> is a <b>prefix</b> of <code class="ml">y</code> (the start of <code class="ml">y</code>).</p>' },
        { t: 'is_that', html: '<p><code class="ml">is_that x y</code> tests <code class="ml">what (x, y)</code> on <code class="ml">y</code>, then on its tail, and so on down to the empty list, adding 1 at each success. It counts the positions of <code class="ml">y</code> where <code class="ml">x</code> starts. So <code class="ml">mystery a b</code> is the number of occurrences of the list <code class="ml">a</code> (consecutive elements) in <code class="ml">b</code>. Nothing forces integers: only <code class="ml">=</code> is used, hence <code class="ml">\'a list -&gt; \'a list -&gt; int</code>.</p>' },
        { t: 'Trace of the second phrase', html: '<p>Each line: the position of <code class="ml">y</code> tested, the result of <code class="ml">what</code>, what it adds.</p>' + M['p2019-ex5.trace'] },
        { t: 'The Caml answers', html: M['p2019-ex5.all'] },
        { t: 'Going further', html: '<p>Overlapping occurrences count, and the empty list is a prefix of every non-empty position:</p>' + M['p2019-ex5.more'] + '<p>It is exercise 4.3 “sublist” of this year’s lists tutorial, with the same examples; the tutorial expects <code class="ml">0</code> for <code class="ml">sublist [] [1; 2]</code>: a solution of the tutorial must handle the empty list on its own.</p>' }],
      answer: '<ul><li><code data-ml-ans>val mystery : \'a list -&gt; \'a list -&gt; int = &lt;fun&gt;</code></li><li><code data-ml-ans>- : int = 1</code></li><li><code data-ml-ans>- : int = 2</code></li><li><code data-ml-ans>- : int = 0</code></li></ul><p>mystery a b counts the occurrences of the list a (consecutive elements) in the list b.</p>',
      traps: [
        'Forgetting the answer to the definition (<code class="ml">val mystery : \'a list -&gt; \'a list -&gt; int = &lt;fun&gt;</code>).',
        'Counting common elements instead of consecutive sublists: <code class="ml">mystery [1; 2] [2; 1]</code> → <code class="ml">0</code>.',
        'Writing <code class="ml">int list -&gt; int list -&gt; int</code>: nothing forces integers, only equality.',
        'Stopping at the first occurrence: <code class="ml">is_that</code> goes through the whole list.'],
      grading: '2 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2019d-ex2': {
      src: 'Midterm S1# Apr. 2019 · Ex 2',
      title: 'Insertion sort: insert, then insertion_sort',
      intro: '<p>The answer sheets gave the specifications: “The function insert x list comp adds the element x in its place in the list list sorted according to the function comp.” and “The function insertion_sort comp list sorts the list list in order according to the function comp.”</p>',
      questions: [
        '<b>1.</b> Write the function <code class="ml">insert</code> that adds an element in its place in a list sorted according to a given comparison function.<p>Examples of results:</p>' + M['p2019d-ex2.ex1'],
        '<b>2.</b> Use the function <code class="ml">insert</code> to write a function that sorts a list in order according to a given comparison function.<p>Examples of results:</p>' + M['p2019d-ex2.ex2']],
      hints: [
        'The order of the parameters is fixed by the examples and the answer sheets: <code class="ml">insert x list comp</code> (comparison last), <code class="ml">insertion_sort comp list</code>.',
        'For <code class="ml">insert</code>: if the list is empty, the result is <code class="ml">[x]</code>; if <code class="ml">comp x e</code> is true, <code class="ml">x</code> goes in front of <code class="ml">e</code> and we stop; otherwise <code class="ml">e</code> stays in front and we insert further on.',
        'For <code class="ml">insertion_sort</code>: first sort the tail (recursive call), then insert the head into that result with <code class="ml">insert</code>.'],
      solution: [
        { t: 'The idea of insert', html: '<p>The list is sorted according to <code class="ml">comp</code>. We move on as long as <code class="ml">x</code> must not go in front of the current element; as soon as <code class="ml">comp x e</code> is true, <code class="ml">x</code> goes in front of <code class="ml">e</code> and the rest, already sorted, is kept as it is.</p><ul><li><code class="ml">[]</code> → <code class="ml">x::[]</code>, that is <code class="ml">[x]</code>.</li><li><code class="ml">e::l</code> when <code class="ml">comp x e</code> → <code class="ml">x::e::l</code>.</li><li><code class="ml">e::l</code> otherwise → <code class="ml">e :: insert x l comp</code>.</li></ul>' },
        { t: 'The idea of insertion_sort', html: '<p>The empty list is sorted; for <code class="ml">e::l</code>, sort <code class="ml">l</code> (recursive call), then insert <code class="ml">e</code> in its place in the result. <code class="ml">insertion_sort comp</code> is written with <code class="ml">function</code>: its second parameter, the list, is matched directly.</p>' },
        { t: 'The code and the Caml answer', html: '<p>This is the official answer key (“Version profs”).</p>' + M['p2019d-ex2.sol'] },
        { t: 'Check on the examples', html: '<p>Examples of the paper. <code class="ml">String.length</code> only appears in the example, to define the order <code class="ml">longer</code>: in your function, no predefined function.</p>' + M['p2019d-ex2.chk'] },
        { t: 'The tail-recursive version of the key', html: '<p>The key also gives a version with an accumulator: the elements are inserted one by one into a growing sorted list. Same results on the examples, but not always with elements that are “equal” for the order: <code class="ml">"ab"</code> and <code class="ml">"cd"</code> have the same length, and the two sorts do not put them in the same order.</p>' + M['p2019d-ex2.term'] },
        { t: 'Set again in 2024', html: '<p>The same exercise came back in the October 2024 exam (<a href="#p2024-ex2">see that card</a>), with another order of the parameters: <code class="ml">insert_x x order lst</code>.</p>' }],
      answer: '<p>Two functions, each followed by its Caml answer:</p><ul><li><code data-ml-ans>val insert : \'a -&gt; \'a list -&gt; (\'a -&gt; \'a -&gt; bool) -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>val insertion_sort : (\'a -&gt; \'a -&gt; bool) -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></li></ul>',
      traps: [
        'Changing the order of the parameters: here <code class="ml">insert x list comp</code> (comparison last); in 2024 it was <code class="ml">insert_x x order lst</code>.',
        'Comparing with <code class="ml">&lt;=</code> instead of calling <code class="ml">comp</code>: the second example (decreasing order) would be wrong.',
        'Forgetting the empty list case: <code class="ml">insert 12 [] …</code> must give <code class="ml">[12]</code>.',
        'Writing an insertion again inside the sort instead of using <code class="ml">insert</code>.'],
      grading: '7 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2019d-ex3': {
      src: 'Midterms Nov. 2017 and S1# Apr. 2019 · Ex 3',
      title: 'Association: assoc',
      intro: '<p>Statement of April 2019 (official English version); the November 2017 one (exercise 3, 4 points, in French only) is the same, with the same examples.</p><p>Write down the function <code class="ml">assoc k list</code> where <code class="ml">k</code> is a natural and <code class="ml">list</code> a list of pairs (<em>key</em>, <em>value</em>) sorted in increasing order with respect to keys. We assume keys are always naturals. The function returns the value corresponding to the key <code class="ml">k</code>. It raises an exception if <code class="ml">k</code> is not a valid key or if it does not correspond to any pair.</p><p>Examples of applications:</p>' + M['p2019d-ex3.ex'],
      hints: [
        'Two exceptions, given by the examples: <code class="ml">Invalid_argument</code> for an invalid key (k ≤ 0: the French paper says the keys are non-zero naturals), tested once in the wrapper function; <code class="ml">Failure "not found"</code> during the search.',
        'The pattern <code class="ml">(key, value) :: l</code> directly gives the key and the value of the first pair.',
        'The list is sorted by increasing keys: as soon as a key is greater than <code class="ml">k</code>, <code class="ml">k</code> is not further on. No need to finish the traversal.'],
      solution: [
        { t: 'The idea', html: '<p>A wrapper function checks <code class="ml">k</code> only once: the keys are non-zero naturals, so <code class="ml">k &lt;= 0</code> is not a valid key. A local recursive function <code class="ml">search</code> goes through the pairs, <code class="ml">k</code> being still visible.</p>' },
        { t: 'The cases of search', html: '<ul><li><code class="ml">[]</code> → <code class="ml">failwith "not found"</code>: no pair has the key <code class="ml">k</code>.</li><li><code class="ml">(key, value) :: l</code> with <code class="ml">key = k</code> → <code class="ml">value</code>.</li><li><code class="ml">(key, value) :: l</code> with <code class="ml">k &lt; key</code> → <code class="ml">failwith "not found"</code>: the list is sorted, the next keys are even greater (early stop).</li><li>otherwise → <code class="ml">search l</code>.</li></ul>' },
        { t: 'The code and the Caml answer', html: '<p>This is the official answer key of April 2019, without its useless <code class="ml">rec</code>: it writes <code class="ml">let rec assoc</code>, whereas only <code class="ml">search</code> is recursive (Caml accepts it silently). The type shows that the value can be of any type, the key being an integer.</p>' + M['p2019d-ex3.sol'] },
        { t: 'Check on the examples', html: '<p>The three examples, then <code class="ml">k = 0</code> (invalid key), an absent key greater than all the others, and values of another type.</p>' + M['p2019d-ex3.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val assoc : int -&gt; (int * \'a) list -&gt; \'a = &lt;fun&gt;</code>.</p>',
      traps: [
        'Going through the whole list when the key is absent: the list is sorted, stop as soon as <code class="ml">key &gt; k</code>.',
        'Testing <code class="ml">k &lt; 0</code> instead of <code class="ml">k &lt;= 0</code>: the keys are “non-zero”, 0 is not a valid key.',
        'Testing <code class="ml">k</code> at every recursive call: that is the job of the wrapper function.',
        'Swapping the two exceptions: <code class="ml">Invalid_argument</code> for <code class="ml">k</code>, <code class="ml">Failure</code> for an absent key, as in the examples.',
        'Returning the pair instead of the value: <code class="ml">assoc 5 …</code> gives <code class="ml">"five"</code>.'],
      grading: '5 points in 2019 (4 in 2017), no breakdown.',
      note: 'Code run with OCaml 4.14. Official key of April 2019; no key for 2017. It is also exercise 5.1 of this year’s lists tutorial.'
    },

    'p2019d-ex4': {
      src: 'Midterm S1# Apr. 2019 · Ex 4',
      title: 'Mystery: two parameters m1 and m2',
      intro: '<p>The mystery function is defined as</p>' + M['p2019d-ex4.fn'] + '<p>Phrases given on the answer sheets:</p>' + M['p2019d-ex4.q'],
      questions: [
        '<b>1.</b> Give the results of the successive evaluations of the phrases on the answer sheets.',
        '<b>2.</b> What is the return value of mystery?'],
      hints: [
        'Look at the patterns of <code class="ml">mystery</code>: <code class="ml">[]</code> and <code class="ml">e::f::l</code>. Which one matches a one-element list?',
        '<code class="ml">aux_mystery m1 m2</code> keeps two values, with m1 ≤ m2 at the start. An element smaller than <code class="ml">m1</code> takes the place of <code class="ml">m1</code> (and the old <code class="ml">m1</code> becomes <code class="ml">m2</code>); an element in between replaces <code class="ml">m2</code>.',
        'At the end, the function returns <code class="ml">m2</code>. What are <code class="ml">m1</code> and <code class="ml">m2</code> once the whole list has been seen?'],
      solution: [
        { t: 'The type and the warning', html: '<p>The list is matched with <code class="ml">[]</code> and <code class="ml">e::f::l</code>: the one-element list is missing. Caml shows a Warning 8 (example of an unmatched case: <code class="ml">_::[]</code>), then the type: the elements are compared with <code class="ml">&lt;</code>, nothing forces their type, and the function returns <code class="ml">m2</code>, an element of the list: <code class="ml">\'a list -&gt; \'a</code>.</p>' },
        { t: 'What aux_mystery computes', html: '<p><code class="ml">m1</code> is the smallest element seen, <code class="ml">m2</code> the second smallest. At the start, the first two elements, in order (<code class="ml">if e &lt; f</code>). Then, for each element <code class="ml">e</code>: if it is smaller than <code class="ml">m1</code>, it becomes the smallest and the old <code class="ml">m1</code> becomes second; otherwise, if it is smaller than <code class="ml">m2</code>, it becomes second; otherwise nothing changes. At the end, <code class="ml">m2</code> is returned: <b>the second smallest element</b> of the list.</p>' + M['p2019d-ex4.trace'] },
        { t: 'The Caml answers', html: '<p>The three phrases of the answer sheet, then two more: the empty list raises the <code class="ml">failwith</code>, and a duplicate counts twice (<code class="ml">[2; 2; 5]</code> → <code class="ml">2</code>). Caml writes <code class="ml">4.</code>, not <code class="ml">4.0</code>. The position in <code class="ml">Match_failure</code> (line 1, column 14: the word <code class="ml">function</code>) depends on how the definition is typed.</p>' + M['p2019d-ex4.all'] },
        { t: 'The official answer key', html: '<p>It gives <code class="ml">val mystery : (\'a list) -&gt; \'a</code>, <code class="ml">- : float = 4.0</code> and “An error (Exception: match_failure)”, “warnings aside”: for a Mystery, the warning is not required. It is also exercise 1.6 “second” of this year’s lists tutorial, where a list that is too short raises <code class="ml">Failure "second: Not enough values"</code>.</p>' }],
      answer: '<ol><li><code data-ml-ans>val mystery : \'a list -&gt; \'a = &lt;fun&gt;</code> (after a Warning 8), <code data-ml-ans>- : int = 2</code>, <code data-ml-ans>- : float = 4.</code>, <code data-ml-ans>Exception: Match_failure ("//toplevel//", 1, 14).</code></li><li>mystery returns the second smallest element of the list, if it exists.</li></ol>',
      traps: [
        'Giving a value for <code class="ml">mystery [\'a\']</code>: no pattern matches a one-element list, it is <code class="ml">Match_failure</code> (not the <code class="ml">failwith "..."</code>, which is for the empty list).',
        'Answering the smallest element: the function returns <code class="ml">m2</code>, not <code class="ml">m1</code>.',
        'Writing <code class="ml">int list -&gt; int</code>: the function also works on <code class="ml">float</code> values (second phrase), the type is <code class="ml">\'a list -&gt; \'a</code>.',
        'Forgetting that duplicates count: <code class="ml">mystery [2; 2; 5]</code> → <code class="ml">2</code>.'],
      grading: '2 points for the exercise, no breakdown.',
      note: 'Code run with OCaml 4.14; the official key gives the same results, written slightly differently (step 4).'
    },

    'p2018-ex2': {
      src: 'Midterm Oct. 2018 · Ex 2',
      title: 'is_image',
      intro: '<p>Write the Caml function <code class="ml">is_image</code> with the following specifications (the English paper says “for_all2” here, a copy-and-paste slip):</p><ul><li>It takes a one-argument function, <code class="ml">f</code>, and two lists, [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>] and [b<sub>1</sub>; b<sub>2</sub>; ···; b<sub>n</sub>], as parameters.</li><li>It checks whether for all pairs of elements (a<sub>i</sub>, b<sub>i</sub>) that b<sub>i</sub> is the image of a<sub>i</sub> under f.</li><li>If a pair such that f a<sub>i</sub> ≠ b<sub>i</sub> is found, it returns false. Otherwise, it raises <code class="ml">Invalid_argument</code> if the two lists have different lengths.</li></ul><p><code data-ml-ans>val is_image : (\'a -&gt; \'b) -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code></p>' + M['p2018-ex2.ex'],
      hints: [
        'The type is given: <code class="ml">f</code> turns an <code class="ml">\'a</code> into a <code class="ml">\'b</code>, and <code class="ml">f e1</code> is compared with <code class="ml">e2</code>.',
        'Two lists read together: both empty, one empty and not the other, both non-empty.',
        '“If a false pair is found, it returns false. Otherwise… exception”: test the pair before the recursive call, with <code class="ml">&amp;&amp;</code>.'],
      solution: [
        { t: 'The idea', html: '<p>The answer key sums it up: <code class="ml">is_image</code> computes <code class="ml">f a1 = b1 &amp;&amp; f a2 = b2 &amp;&amp; … &amp;&amp; f an = bn</code>. The two lists are read together; <code class="ml">&amp;&amp;</code> stops at the first false pair, so the length exception only comes if all the pairs seen were right.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">true</code>.</li><li><code class="ml">([], _)</code> or <code class="ml">(_, [])</code> → <code class="ml">invalid_arg "different lengths"</code> (the statement gives no message).</li><li><code class="ml">(e1::l1, e2::l2)</code> → <code class="ml">f e1 = e2 &amp;&amp; is_image f l1 l2</code>.</li></ul>' },
        { t: 'The code and the Caml answer', html: '<p>This is the official answer key. <code class="ml">string_of_int</code> appears in an example, to build <code class="ml">f</code>: your function does not call it.</p>' + M['p2018-ex2.sol'] },
        { t: 'Check on the examples', html: '<p>The two examples of the paper, then: different lengths with no false pair (exception), a false pair before the end of the short list (<code class="ml">false</code>), two empty lists.</p>' + M['p2018-ex2.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val is_image : (\'a -&gt; \'b) -&gt; \'a list -&gt; \'b list -&gt; bool = &lt;fun&gt;</code>.</p>',
      traps: [
        'Comparing the lengths first: a false pair must give <code class="ml">false</code> before any exception.',
        'Writing <code class="ml">f (e1, e2)</code> or <code class="ml">f e1 e2</code>: <code class="ml">f</code> has only one parameter, compare <code class="ml">f e1</code> with <code class="ml">e2</code>.',
        'Swapping the order in <code class="ml">&amp;&amp;</code>: the recursive call would be evaluated before the pair is tested.',
        'Forgetting the case <code class="ml">([], [])</code>: it returns <code class="ml">true</code>.'],
      grading: '4 points for the exercise, no breakdown.',
      note: 'Code run with OCaml 4.14. The English paper wrongly starts with “Write the Caml function for_all2”.'
    },

    'p2018-ex3': {
      src: 'Midterm Oct. 2018 · Ex 3',
      title: 'How many?: how_many, then count_multiples',
      questions: [
        '<b>1.</b> Write the Caml function <code class="ml">how_many</code> with the following specifications:<ul><li>it takes a boolean function <code class="ml">f</code> and a list [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>] as parameters.</li><li>It returns the number of values a<sub>i</sub> such that f (a<sub>i</sub>) is true.</li></ul><p><code data-ml-ans>val how_many : (\'a -&gt; bool) -&gt; \'a list -&gt; int = &lt;fun&gt;</code></p>',
        '<b>2.</b> Use the function <code class="ml">how_many</code> to define the function <code class="ml">count_multiples n l</code> that returns the number of multiples of <code class="ml">n</code> in the list <code class="ml">l</code>.<p><code data-ml-ans>val count_multiples : int -&gt; int list -&gt; int = &lt;fun&gt;</code></p>'],
      hints: [
        'Full traversal: each element counts for 1 if it satisfies <code class="ml">f</code>, for 0 otherwise.',
        'Two cases, <code class="ml">[]</code> → 0 and <code class="ml">e :: l</code>; in the second one, <code class="ml">if f e then 1 else 0</code> is added to the count of <code class="ml">l</code>.',
        '<code class="ml">count_multiples n</code>: which predicate says “x is a multiple of n”? <code class="ml">x mod n = 0</code>. Just pass it to <code class="ml">how_many</code>.'],
      solution: [
        { t: 'how_many', html: '<p>The number of elements of <code class="ml">e :: l</code> that satisfy <code class="ml">f</code> is 1 or 0 for <code class="ml">e</code>, plus the number in <code class="ml">l</code>. For the empty list, 0. The paper gives no example, only the type, which you must find again in the Caml answer.</p>' },
        { t: 'count_multiples', html: '<p>Write the predicate as an anonymous function, <code class="ml">function x -&gt; x mod n = 0</code>, and pass it to <code class="ml">how_many</code>. The key writes <code class="ml">let count_multiples n = how_many (…)</code>: a <b>partial application</b>, <code class="ml">how_many</code> gets its first parameter and still waits for the list. The type shown is indeed <code class="ml">int -&gt; int list -&gt; int</code>.</p>' },
        { t: 'The code and the Caml answer', html: '<p>First version of each function in the official answer key (which forgets the <code class="ml">;;</code> after the two <code class="ml">how_many</code>).</p>' + M['p2018-ex3.sol'] },
        { t: 'Check', html: '<p>The paper gives no example: here are three. 0 is a multiple of 3.</p>' + M['p2018-ex3.chk'] },
        { t: 'The other versions of the key', html: '<p>A guarded pattern for <code class="ml">how_many</code>, a named local function for <code class="ml">count_multiples</code>: same types, same results.</p>' + M['p2018-ex3.v2'] }],
      answer: '<p>Two functions, each followed by its Caml answer:</p><ul><li><code data-ml-ans>val how_many : (\'a -&gt; bool) -&gt; \'a list -&gt; int = &lt;fun&gt;</code></li><li><code data-ml-ans>val count_multiples : int -&gt; int list -&gt; int = &lt;fun&gt;</code></li></ul>',
      traps: [
        'Writing a traversal again in <code class="ml">count_multiples</code>: the statement asks to use <code class="ml">how_many</code>.',
        'Writing <code class="ml">if f e then 1 + how_many f l</code> with no <code class="ml">else</code>: Caml rejects an <code class="ml">if</code> without <code class="ml">else</code> that returns an integer.',
        'Forgetting the brackets around <code class="ml">if … then 1 else 0</code>: <code class="ml">if f e then 1 else 0 + how_many f l</code> only adds the rest in the <code class="ml">else</code> case.',
        'Testing <code class="ml">n mod x = 0</code> instead of <code class="ml">x mod n = 0</code>.'],
      grading: '4 points for the exercise, no breakdown.',
      note: NOTE_RUN
    },

    'p2018-ex4': {
      src: 'Midterms Oct. 2018 (Ex 4) and Nov. 2020 (Ex 3)',
      title: 'Insertion at the rank i: insert_nth',
      intro: '<p>Statement of October 2018 (official English version); the November 2020 one is the same, with the same examples, without the <code class="ml">val insert_nth</code> line, and says “if i is negative or zero”.</p><p>Write the function <code class="ml">insert_nth x i list</code> that inserts the value <code class="ml">x</code> at the rank i in the list <code class="ml">list</code>. The function has to raise an exception <code class="ml">Invalid_argument</code> if <code class="ml">i</code> is negative or an exception <code class="ml">Failure</code> if the list is too short.</p><p><code data-ml-ans>val insert_nth : \'a -&gt; int -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code></p><p>Application examples:</p>' + M['p2018-ex4.ex'],
      hints: [
        'The rank is tested once, in a wrapper function (<code class="ml">Invalid_argument</code>); a list that is too short is found during the traversal (<code class="ml">Failure</code>).',
        'Inserting at place <code class="ml">i</code> in <code class="ml">e :: q</code> means keeping <code class="ml">e</code> and inserting at place <code class="ml">i − 1</code> in <code class="ml">q</code>. When the rank is 1, <code class="ml">x</code> goes at the head.',
        'Look at the second example: inserting at place 10 in a list of 9 elements is allowed (added at the end). In which order should the cases “rank 1” and “empty list” be written?'],
      solution: [
        { t: 'The idea', html: '<p>The wrapper function checks the rank (<code class="ml">i &lt; 1</code> → <code class="ml">invalid_arg</code>). The local function <code class="ml">insert</code> matches the pair (rank, list) and brings the rank down while going along the list. The key says it: an exception is raised if i ≤ 0 or if i is greater than the length of the list + 1.</p>' },
        { t: 'The cases, in this order', html: '<ul><li><code class="ml">(1, list)</code> → <code class="ml">x :: list</code>: we are at the right place, even if <code class="ml">list</code> is empty (added at the end of the list, second example).</li><li><code class="ml">(_, [])</code> → <code class="ml">failwith "out of bound"</code>: the list ends before place <code class="ml">i</code>.</li><li><code class="ml">(i, e::q)</code> → <code class="ml">e :: insert (i-1, q)</code>.</li></ul><p>The order matters: if <code class="ml">(_, [])</code> came first, adding at the end of the list would raise the exception.</p>' },
        { t: 'The code and the Caml answer', html: '<p>This is the official answer key, the same in 2018 and 2020.</p>' + M['p2018-ex4.sol'] },
        { t: 'Check on the examples', html: '<p>The four examples, then edge cases. For the fourth example, Caml answers <code class="ml">Invalid_argument</code>: the <code class="ml">Invalid_arg</code> printed in the paper is a typo, that constructor does not exist.</p>' + M['p2018-ex4.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val insert_nth : \'a -&gt; int -&gt; \'a list -&gt; \'a list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Putting the case <code class="ml">(_, [])</code> before <code class="ml">(1, list)</code>: <code class="ml">insert_nth 0 10 […9 elements]</code> would raise <code class="ml">Failure</code> instead of adding at the end.',
        'Copying <code class="ml">Invalid_arg</code>: that constructor does not exist; <code class="ml">invalid_arg "…"</code> raises <code class="ml">Invalid_argument</code>.',
        'Testing the rank at every recursive call: that is the job of the wrapper function.',
        'Inserting after the i-th element instead of placing it at rank i: <code class="ml">insert_nth 0 5 …</code> puts 0 in fifth position.'],
      grading: '5 points for the exercise (in 2018 as in 2020), no breakdown.',
      note: 'Code run with OCaml 4.14. It is also exercise 3.3 of this year’s lists tutorial, with the same examples.'
    },

    'p2018-ex5': {
      src: 'Midterm Oct. 2018 · Ex 5',
      title: 'Evaluations: decode and encode',
      intro: '<p>Give the results of the successive evaluations of the following phrases.</p>' + M['p2018-ex5.q'],
      hints: [
        '<code class="ml">decode</code> gets a list of pairs (number, element). What does the case <code class="ml">(1, e)</code> do? And the case <code class="ml">(nb, e)</code> with <code class="ml">nb</code> greater than 1?',
        'Unroll <code class="ml">decode [(1, \'a\'); (3, \'b\'); …]</code>: the pair <code class="ml">(3, \'b\')</code> produces a <code class="ml">\'b\'</code> and becomes <code class="ml">(2, \'b\')</code>.',
        '<code class="ml">encode</code> does the opposite: it counts consecutive equal elements. But read the printed code line by line: does Caml accept it as it is?'],
      solution: [
        { t: 'decode', html: '<p><code class="ml">decode</code> expands a list of pairs (number, element): <code class="ml">(nb, e)</code> produces <code class="ml">e</code>, then the pair <code class="ml">(nb-1, e)</code> is left to expand; <code class="ml">(1, e)</code> produces the last <code class="ml">e</code>. The type: the numbers are <code class="ml">int</code>, the elements of any type: <code class="ml">(int * \'a) list -&gt; \'a list</code>.</p>' + M['p2018-ex5.trace'] + M['p2018-ex5.dec'] },
        { t: 'encode', html: '<p><code class="ml">encode</code> does the opposite, it is “run-length encoding”: <code class="ml">encode_rec (nb, cur)</code> counts in <code class="ml">nb</code> the elements equal to <code class="ml">cur</code>; a different element closes the run <code class="ml">(nb, cur)</code> and opens a new one, <code class="ml">(1, e)</code>. The official answer key evaluates this version:</p>' + M['p2018-ex5.enc'] },
        { t: 'The code of the paper does not compile', html: '<p>The paper prints <code class="ml">encode-rec</code> (hyphen) instead of <code class="ml">encode_rec</code>: Caml reads a subtraction followed by <code class="ml">rec</code>, and rejects the phrase. <code class="ml">encode</code> is then not defined, and the next two phrases would give <code class="ml">Error: Unbound value encode</code>. The official key silently fixes this typo <b>and</b> a second one: the last line must call <code class="ml">encode_rec (1, e) l</code>, not <code class="ml">list</code>.</p>' + M['p2018-ex5.subj'] + '<p>With only the hyphen fixed, the first element is counted twice (the list starts again from the beginning):</p>' + M['p2018-ex5.half'] }],
      answer: '<ul><li><code data-ml-ans>val decode : (int * \'a) list -&gt; \'a list = &lt;fun&gt;</code></li><li><code data-ml-ans>- : string list = ["grr"; "grr"; "grr"; "grr"; "grr"; "grr"]</code></li><li><code data-ml-ans>- : char list = [\'a\'; \'b\'; \'b\'; \'b\'; \'c\'; \'d\'; \'e\'; \'e\'; \'e\'; \'e\']</code></li><li><code data-ml-ans>val encode : \'a list -&gt; (int * \'a) list = &lt;fun&gt;</code> (version of the key)</li><li><code data-ml-ans>- : (int * int) list = [(10, 0)]</code></li><li><code data-ml-ans>- : (int * char) list = [(3, \'b\'); (1, \'c\'); (2, \'a\'); (4, \'e\'); (2, \'d\')]</code></li></ul><p>The code printed in the paper gives <code class="ml">Error: Syntax error</code> for encode (typo <code class="ml">encode-rec</code>).</p>',
      traps: [
        'Forgetting the answers to the definitions (<code class="ml">val decode : …</code>, <code class="ml">val encode : …</code>).',
        'Writing <code class="ml">int list</code> instead of <code class="ml">string list</code> or <code class="ml">char list</code>: the type of the elements follows the examples.',
        'Reading <code class="ml">(nb, e)</code> as “repeat nb times then stop” without seeing the case <code class="ml">(1, e)</code>: it is the one that ends each run.',
        'Not seeing that the printed code does not compile: <code class="ml">encode-rec</code> reads as a subtraction. The key evaluates a fixed version.'],
      grading: '3 points for the exercise, no breakdown.',
      note: 'Code run with OCaml 4.14. The official key evaluates a version of encode with two typos of the paper fixed (step 3).'
    },

    'p2017-ex5': {
      src: 'Midterm Nov. 2017 · Ex 5',
      title: 'Combine it: combfilter',
      intro: '<p>Write the function <code class="ml">combfilter</code> with the following specifications:</p><ul><li>It takes as parameters a two-argument function <code class="ml">f</code> and two lists: [a<sub>1</sub>; a<sub>2</sub>; ···; a<sub>n</sub>] and [b<sub>1</sub>; b<sub>2</sub>; ···; b<sub>n</sub>].</li><li>It returns the list of all the pairs of elements (a<sub>i</sub>, b<sub>i</sub>) such that f a<sub>i</sub> b<sub>i</sub> is true. The order of the elements of the initial lists is kept.</li><li>It raises an exception if the two lists have different lengths.</li></ul><p>Example of use:</p>' + M['p2017-ex5.ex'],
      hints: [
        'Two lists read together: both empty, both non-empty, and everything else (different lengths).',
        'In the case <code class="ml">(e1 :: l1, e2 :: l2)</code>, keep the pair <code class="ml">(e1, e2)</code> at the head of the result if <code class="ml">f e1 e2</code> is true; otherwise move on.',
        'The statement only says “an exception”: <code class="ml">invalid_arg</code>, as for a parameter error (different lengths), is the most natural choice. Build the result with <code class="ml">::</code> to keep the order.'],
      solution: [
        { t: 'The idea', html: '<p>A filter on two lists at once: go through the pairs (a<sub>i</sub>, b<sub>i</sub>) in order and keep those that satisfy <code class="ml">f</code>. The result is built by adding each kept pair at the head of the rest, so in the initial order. Different lengths are found out when one list ends before the other.</p>' },
        { t: 'The cases', html: '<ul><li><code class="ml">([], [])</code> → <code class="ml">[]</code>.</li><li><code class="ml">(e1 :: l1, e2 :: l2)</code> → <code class="ml">(e1, e2) :: combfilter f l1 l2</code> if <code class="ml">f e1 e2</code>, otherwise <code class="ml">combfilter f l1 l2</code>.</li><li><code class="ml">_</code> (one list empty, the other not) → <code class="ml">invalid_arg "combfilter: different lengths"</code>.</li></ul><p>Here, unlike <code class="ml">for_all2</code>, the statement does not say “otherwise”: the whole list is read, and different lengths always raise the exception.</p>' },
        { t: 'The code and the Caml answer', html: '<p>Caml shows this type over two lines, because it is long.</p>' + M['p2017-ex5.sol'] },
        { t: 'Check', html: '<p>The example of the paper (first define <code class="ml">is_string_of_int</code>), different lengths, and another predicate.</p>' + M['p2017-ex5.chk'] }],
      answer: '<p>The code of step 3, followed by its Caml answer: <code data-ml-ans>val combfilter : (\'a -&gt; \'b -&gt; bool) -&gt; \'a list -&gt; \'b list -&gt; (\'a * \'b) list = &lt;fun&gt;</code>.</p>',
      traps: [
        'Returning <code class="ml">f e1 e2</code> or the list of the <code class="ml">e1</code>: the result is a list of pairs <code class="ml">(e1, e2)</code>.',
        'Building the result in an accumulator: the order would be reversed, whereas the statement asks to keep it.',
        'Forgetting the different-length case: Warning 8 and <code class="ml">Match_failure</code> instead of the required exception.',
        'Writing <code class="ml">string_of_int</code> in <code class="ml">combfilter</code>: the function only applies <code class="ml">f</code>; <code class="ml">string_of_int</code> is only used in the example.'],
      grading: '5 points for the exercise, no breakdown.',
      note: NOTE_WRITTEN
    }
  });
})();
