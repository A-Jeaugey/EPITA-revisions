/* English text for data/taa/ex-annales.js (merged by id over the French file).
   Official English wording, word for word, for p2018-ex1 (= 2020), p2019-ex1 and p2019d-ex1 (English papers and
   answer keys in Past-Exams), with the PDF extraction slips fixed (≠, first, emptylist, list) and, as in the
   French file, ≤ for ⩽ and is-defined-iaoi for the site’s keyword. The other papers only exist in French.
   Operation names: those of the English papers (emptylist, head, tail, first, contents, next, nth, length, insert,
   delete, access, ispresent, search, concatenate, vect, modify, isinit, lowerlimit, upperlimit, reinitialize);
   names made up by a paper: mystère → mystery, supprime-sup → deletegreater, modifier → modify,
   backward list (2017): queue → rear, début → beginning, dernier → last, pred → previous. */
(function () {
  function sp() { return Array.prototype.slice.call(arguments).join('\n'); }
  var NOTE_WRITTEN = 'No official answer key: solution written and checked.';
  var NOTE_SCRIPT = 'Solution based on a marked student script (08/10), with the marker’s additions.';

  /* ---------- types recalled by the papers ---------- */
  var ITER_2017 = sp(
    'types',
    '    list, box',
    'uses',
    '    integer, element',
    'operations',
    '    emptylist : → list',
    '    access    : list × integer → box',
    '    contents  : box → element',
    '    nth       : list × integer → element',
    '    length    : list → integer',
    '    insert    : list × integer × element → list',
    '    delete    : list × integer → list',
    '    next      : box → box');
  var REC_2017 = sp(
    'types',
    '    list, box',
    'uses',
    '    element',
    'operations',
    '    emptylist : → list',
    '    head      : list → box',
    '    tail      : list → list',
    '    cons      : element × list → list',
    '    first     : list → element',
    '    contents  : box → element',
    '    next      : box → box');
  /* the English papers of 2018 and 2020, word for word */
  var REC_BOXES = sp(
    'types',
    '    list, box',
    'uses',
    '    element',
    'operations',
    '    emptylist : → list',
    '    head      : list → box',
    '    contents  : box → element',
    '    first     : list → element',
    '    cons      : element × list → list',
    '    tail      : list → list',
    '    next      : box → box',
    'preconditions',
    '    head(λ) is-defined-iaoi λ ≠ emptylist',
    '    tail(λ) is-defined-iaoi λ ≠ emptylist',
    '    first(λ) is-defined-iaoi λ ≠ emptylist',
    'axioms',
    '    first(cons(e, λ)) = e',
    '    tail(cons(e, λ)) = λ',
    '    contents(head(λ)) = first(λ)',
    '    next(head(λ)) = head(tail(λ))',
    'with',
    '    list    λ',
    '    element e');
  var REC_NO_BOXES = sp(
    'types',
    '    list',
    'uses',
    '    element',
    'operations',
    '    emptylist : → list',
    '    first     : list → element',
    '    cons      : element × list → list',
    '    tail      : list → list',
    'preconditions',
    '    tail(λ) is-defined-iaoi λ ≠ emptylist',
    '    first(λ) is-defined-iaoi λ ≠ emptylist',
    'axioms',
    '    first(cons(e, λ)) = e',
    '    tail(cons(e, λ)) = λ',
    'with',
    '    list    λ',
    '    element e');
  var ITER_2024 = sp(
    'types',
    '    list, box',
    'uses',
    '    integer, element',
    'operations',
    '    emptylist : → list',
    '    access    : list × integer → box',
    '    contents  : box → element',
    '    nth       : list × integer → element',
    '    length    : list → integer');
  var MYSTERY = sp(
    'operations',
    '    mystery : List × Integer × Integer → List',
    'preconditions',
    '    mystery(λ, x, y) is-defined-iaoi 1 ≤ x ≤ y ≤ length(λ)',
    'axioms',
    '    1 ≤ x ≤ y ≤ length(λ) ⇒ length(mystery(λ, x, y)) = length(λ) − y + x − 1',
    '    1 ≤ x ≤ y ≤ length(λ) & 1 ≤ i < x ⇒ nth(mystery(λ, x, y), i) = nth(λ, i)',
    '    1 ≤ x ≤ y ≤ length(λ) & x ≤ i ≤ length(λ) − y + x − 1 ⇒',
    '            nth(mystery(λ, x, y), i) = nth(λ, i + y − x + 1)',
    'with',
    '    λ : List',
    '    x, y, i : Integer');
  /* the English S1# paper of April 2019, word for word */
  var VECTOR = sp(
    'types',
    '    vector',
    'uses',
    '    integer, element, boolean',
    'operations',
    '    vect       : integer × integer → vector',
    '    modify     : vector × integer × element → vector',
    '    nth        : vector × integer → element',
    '    isinit     : vector × integer → boolean',
    '    lowerlimit : vector → integer',
    '    upperlimit : vector → integer',
    'preconditions',
    '    nth(v,i) is-defined-iaoi lowerlimit(v) ≤ i ≤ upperlimit(v) & isinit(v,i)=true',
    'axioms',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) ⇒ nth(modify(v,i,e),i) = e',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) & lowerlimit(v) ≤ j ≤ upperlimit(v) & i≠j',
    '            ⇒ nth(modify(v,i,e),j) = nth(v,j)',
    '',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) ⇒ isinit(modify(v,i,e),i)=true',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) & lowerlimit(v) ≤ j ≤ upperlimit(v)',
    '            ⇒ isinit(modify(v,i,e),j)=isinit(v, j)',
    '',
    '    lowerlimit(vect(i,j))=i',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) ⇒ lowerlimit(modify(v,i,e))=lowerlimit(v)',
    '',
    '    upperlimit(vect(i,j))=j',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) ⇒ upperlimit(modify(v,i,e))=upperlimit(v)',
    'with',
    '    vector  v',
    '    integer i, j, k',
    '    element e');

  /* ---------- Midterm Oct. 2024 ---------- */
  var CALLS_2024 = ['mystery(λ,3,5)', 'mystery(λ,1,4)', 'mystery(λ,6,9)', 'mystery(λ,8,8)', 'mystery(λ,1,9)'];
  function tab2024(res) {
    return '<div class="tbl"><table><thead><tr><th>Operation</th><th>Resulting list</th></tr></thead><tbody>' +
      CALLS_2024.map(function (c, i) { return '<tr><td>' + c + '</td><td>' + (res ? res[i] : '') + '</td></tr>'; }).join('') +
      '</tbody></table></div>';
  }

  REV.i18n.patch(window.TAA_EX, {
    'p2024-ex1': {
      src: 'Midterm Oct. 2024 · Ex 1',
      title: 'Iterative lists: mystery operation',
      intro: '<p>Consider the signature of the algebraic abstract type <em>iterative list</em> seen in class, an extract of which is given below.</p>',
      specs: [
        { code: ITER_2024, cap: 'Consider the following mystery operation:' },
        { code: MYSTERY }],
      questions: ['For each proposed list, give the resulting list after applying the mystery operation with the proposed arguments. On the five lines of the paper, the original list is the same: λ={1,1,2,3,5,5,8,9,9}.' + tab2024(null)],
      hints: [
        'Start with the length of the result: the first axiom gives it directly. Then look at which ranks i each of the two axioms on nth covers.',
        'For mystery(λ, 3, 5): ranks 1 and 2 are copied. For i ≥ 3, the axiom reads rank i + 5 − 3 + 1 of λ. Which ranks of λ are never read?',
        'Once one line is computed, name what mystery does, then check each line with the length. Also check the precondition: a term outside the domain would be undefined.'],
      solution: [
        { t: 'Reading the axioms', html: '<p>The precondition requires 1 ≤ x ≤ y ≤ length(λ). Here length(λ) = 9 and all five calls satisfy it: none is undefined. (In its last axiom, the French paper writes “ieme” without the accent: it is indeed ième, that is nth.)</p>' +
          '<ul><li>Length: length(λ) − y + x − 1 = length(λ) − (y − x + 1). The list loses y − x + 1 elements, as many as there are ranks from x to y.</li>' +
          '<li>Ranks 1 ≤ i &lt; x: nth(λ, i). The beginning is copied.</li>' +
          '<li>Ranks x ≤ i ≤ length of the result: nth(λ, i + y − x + 1). We skip y − x + 1 ranks.</li></ul>' +
          '<p>Ranks x to y of λ are never read: <strong>mystery(λ, x, y) deletes the elements of rank x to y</strong> (inclusive).</p>' },
        { t: 'Detailed computation of mystery(λ, 3, 5)', html: '<p>Length: 9 − 5 + 3 − 1 = 6.</p>' +
          '<ul><li>i = 1 and i = 2 (i &lt; 3): nth(λ, 1) = 1 and nth(λ, 2) = 1.</li>' +
          '<li>3 ≤ i ≤ 6: we read rank i + 5 − 3 + 1 = i + 3, that is ranks 6, 7, 8 and 9 of λ: 5, 8, 9, 9.</li></ul>' +
          '<p>Result: {1, 1, 5, 8, 9, 9}. The removed elements are those of ranks 3, 4 and 5: 2, 3 and 5.</p>' },
        { t: 'The other four lines', html: '<ul>' +
          '<li>mystery(λ, 1, 4): length 9 − 4 + 1 − 1 = 5. No rank before x = 1. Rank i reads rank i + 4: 5, 5, 8, 9, 9.</li>' +
          '<li>mystery(λ, 6, 9): length 9 − 9 + 6 − 1 = 5. Ranks 1 to 5 are copied; the last axiom would require 6 ≤ i ≤ 5: it applies to no rank.</li>' +
          '<li>mystery(λ, 8, 8): length 9 − 8 + 8 − 1 = 8. Ranks 1 to 7 are copied, rank 8 reads rank 9. Only one element is removed: the 8th, a 9.</li>' +
          '<li>mystery(λ, 1, 9): length 9 − 9 + 1 − 1 = 0. The precondition 1 ≤ 1 ≤ 9 ≤ 9 holds: the term is defined, it is the empty list.</li></ul>' }],
      answer: { html: tab2024(['{1, 1, 5, 8, 9, 9}', '{5, 5, 8, 9, 9}', '{1, 1, 2, 3, 5}', '{1, 1, 2, 3, 5, 5, 8, 9}', '{} (empty list)']) +
        '<p>mystery(λ, x, y) deletes the elements of rank x to y.</p>' },
      traps: [
        'Reading mystery as “keep ranks x to y”: that is wrong for all five lines of the paper.',
        'Getting the shift wrong: rank i ≥ x of the result comes from rank i + (y − x + 1) of λ, not from rank i + y − x.',
        'Answering “undefined” for mystery(λ, 1, 9): the precondition holds, the result is the empty list.',
        'Removing two elements for mystery(λ, 8, 8): with x = y, only one element disappears, the 8th.',
        'Counting ranks from 0: in the course, the first element is at rank 1.'],
      grading: '5 points for the table (five lines; the split is not given).',
      note: NOTE_WRITTEN
    },

    'p2024-ex2': {
      src: 'Midterm Oct. 2024 · Ex 2',
      title: 'Recursive lists: deletegreater',
      intro: '<p>Consider the algebraic abstract type <em>recursive list</em> seen in class and recalled below.</p>' +
        '<p>We add the operation <em>deletegreater</em>, which deletes from a list all the elements strictly greater than a given element.</p>',
      specs: [
        { code: REC_BOXES },
        { code: sp('operations', '    deletegreater : list × element → list') }],
      questions: ['Give the axioms allowing one to deduce a value for the deletion of the elements strictly greater than the element <em>x</em> in the <em>recursive list</em> λ. Specify the PRECONDITIONS if there are any.'],
      hints: [
        'Preconditions: what should deletegreater return on an empty list? Is there a list for which the operation makes no sense?',
        'Write the axioms on the two ways of building a list: emptylist, then cons(e, λ).',
        'For cons(e, λ), split into two cases that do not overlap, depending on e and x: is e kept or deleted? In both cases, you must carry on with λ.'],
      solution: [
        { t: 'The preconditions', html: '<p>deletegreater is defined for every list: on the empty list there is nothing to delete, and the result is the empty list. There is <strong>no precondition</strong>. Adding one (λ ≠ emptylist) would break the recursion, which always ends on deletegreater(emptylist, x).</p>' },
        { t: 'The emptylist case', html: '<p>Nothing to delete:</p>', spec: sp('axioms', '    deletegreater(emptylist, x) = emptylist') },
        { t: 'The cons(e, λ) case: two disjoint cases', html: '<ul><li>e &gt; x: e is strictly greater than x. We delete it and carry on with λ.</li>' +
          '<li>e ≤ x: we keep e at the front and carry on with λ.</li></ul>' +
          '<p>The two conditions do not overlap (consistency) and cover all cases (completeness). We assume, as the paper does, that elements can be compared.</p>',
          spec: sp('axioms', '    e > x ⇒ deletegreater(cons(e, λ), x) = deletegreater(λ, x)', '    e ≤ x ⇒ deletegreater(cons(e, λ), x) = cons(e, deletegreater(λ, x))') },
        { t: 'Check on an example', html: '<p>deletegreater(cons(3, cons(1, cons(4, emptylist))), 3): 3 ≤ 3, keep 3; 1 ≤ 3, keep 1; 4 &gt; 3, delete 4; what remains is deletegreater(emptylist, 3) = emptylist. Result: cons(3, cons(1, emptylist)).</p>' },
        { t: 'Accepted variant', html: '<p>With first and tail, keeping the emptylist case: “λ ≠ emptylist &amp; first(λ) &gt; x ⇒ deletegreater(λ, x) = deletegreater(tail(λ), x)” and “λ ≠ emptylist &amp; first(λ) ≤ x ⇒ deletegreater(λ, x) = cons(first(λ), deletegreater(tail(λ), x))”. You can also write not(e &gt; x) instead of e ≤ x.</p>' }],
      answer: { html: '<p>No precondition. One axiom for emptylist, two for cons(e, λ):</p>',
        spec: sp('preconditions', '    none', 'axioms',
          '    deletegreater(emptylist, x) = emptylist',
          '    e > x ⇒ deletegreater(cons(e, λ), x) = deletegreater(λ, x)',
          '    e ≤ x ⇒ deletegreater(cons(e, λ), x) = cons(e, deletegreater(λ, x))',
          'with', '    list λ', '    element e, x') },
      traps: [
        'Writing ≥ instead of &gt;: the elements equal to x would be deleted too.',
        'Stopping at the first element that is too large (e &gt; x ⇒ … = λ): the following elements are no longer filtered.',
        'Reversing the condition: the elements that are too large would be kept.',
        'Inventing the precondition λ ≠ emptylist: the recursive axiom would end on an undefined term.',
        'Forgetting the emptylist case (lack of completeness), or returning a box: the profile returns a list.'],
      grading: '5 points for the exercise, no breakdown.',
      note: NOTE_WRITTEN
    },

    /* ---------- Midterm Oct. 2023 ---------- */
    'p2023-ex1a': {
      src: 'Midterm Oct. 2023 · Ex 1, Q1 to Q4',
      title: 'A little coursework…: operation, iterative list, constant, observer',
      intro: '<p>Questions 1 to 4 of exercise 1 (10 points). Question 5, the axioms of concatenate, is solved in the <a href="#p2023-ex1b">next exercise</a>.</p>',
      questions: [
        '<b>1.</b> What does the definition of an operation consist of?',
        '<b>2.</b> Give two operations defining an iterative list (without boxes).',
        '<b>3.</b> What data type does a constant return?',
        '<b>4.</b> What are the specifications of the profile of an observer?'],
      hints: [
        'Question 1: in the operations area, how is each operation declared? Two words from the course.',
        'Question 3: a constant is an operation with no argument. Look at emptylist : → list in the list, emptystack : → stack in the stack. Is the type it returns the one being defined, or a type designed beforehand?',
        'Question 4: an observer must meet two conditions, one on its arguments, the other on its result.'],
      solution: [
        { t: 'Where the solution comes from', html: '<p>No official answer key for 2023: the past exams contain a marked student script, graded 08/10. The marker ticked in red, then added in green the marking scheme and the expected answers. The answers below follow these additions and the course.</p>' },
        { t: 'Question 1 (1 pt)', html: '<p><strong>A name (identifier) and a profile</strong>: the types of the arguments and the type of the result. This is the green addition on the script: “Composé d’un nom et d’un profil” (made up of a name and a profile). The script described the profile without using the word: partial credit.</p>' },
        { t: 'Question 2 (2 pts)', html: '<p>Two operations of the iterative list that do not use boxes, for example <strong>length and nth</strong>: these are the two observers that describe an iterative list (length(λ) = 3, nth(λ, 1) = e1…). Any pair among emptylist, nth, length, insert and delete works: the script got 2 points out of 2 with “length and delete”. Not access, contents or next, which use boxes.</p>' },
        { t: 'Question 3 (1 pt)', html: '<p><strong>A defined type.</strong> A constant is an operation with no argument. In each type of the course, it creates the starting value of the type being defined: emptylist : → list, emptystack : → stack, emptyqueue : → queue, and true : → boolean in the boolean type. It returns a result of a defined type: it is an internal operation. It cannot be an observer, since it has no argument of a defined type.</p>' +
          '<p>On the script, the student had written “prédéfini” (predefined) and got 0. The letters “pré” were then crossed out in green, the color of the expected answers.</p>' },
        { t: 'Question 4 (2 pts)', html: '<p>An observer has <strong>at least one argument of a defined type</strong> and a <strong>result of a predefined type</strong>. The script only gave the second condition: partial credit, and the green addition “et prend un argument de type défini” (and takes an argument of a defined type).</p>' },
        { t: 'Why “predefined” is tempting in question 3', html: '<p>The course sheet gives “Faux : → booléen” (false : → boolean) as an example of a constant, then an example where boolean is in uses, hence predefined. But false is the constant of the boolean type itself: there, boolean is the defined type.</p>' }],
      answer: { html: '<ol><li>A name and a profile (types of the arguments and type of the result).</li>' +
        '<li>For example length and nth (insert, delete or emptylist also work).</li>' +
        '<li>A defined type.</li>' +
        '<li>At least one argument of a defined type and a result of a predefined type.</li></ol>' +
        '<p><a href="../qcm/index.html#taa-p2023">The questions of this paper in the MCQ →</a></p>' },
      traps: [
        'Question 3: answering “predefined”. The constant returns the type being defined.',
        'Question 4: giving only one of the two conditions on the profile.',
        'Question 1: describing the profile without using the word “profile”.',
        'Question 2: naming access, contents or next, which use boxes.'],
      grading: 'from the margin of the script (in green), Q1 1 pt, Q2 2 pts, Q3 1 pt, Q4 2 pts; question 5 is worth 4 pts.',
      note: NOTE_SCRIPT
    },

    'p2023-ex1b': {
      src: 'Midterm Oct. 2023 · Ex 1, Q5',
      title: 'Recursive list without boxes: concatenate',
      intro: '<p><b>5.</b> Consider the algebraic abstract type <em>recursive list</em> (without boxes) seen in class and recalled below.</p>' +
        '<p>We propose to extend the properties of this type by allowing it to concatenate two lists, considering the following operation:</p>',
      specs: [
        { code: sp('operations', '    concatenate : list × list → list') },
        { code: REC_NO_BOXES, cap: 'The type <em>recursive list</em> (without boxes) recalled by the paper.' }],
      questions: ['Give the axioms allowing one to deduce a value for the concatenation of two <em>recursive lists</em> λ and λ2. Specify the PRECONDITIONS if there are any.'],
      hints: [
        'Preconditions: is there a pair of lists, empty ones included, for which concatenation makes no sense?',
        'Reason on the first list, with its two forms: emptylist and cons(e, λ).',
        'In the cons(e, λ) case, e stays at the front of the result. What remains to be concatenated behind it?'],
      solution: [
        { t: 'The preconditions', html: '<p>concatenate is defined for every pair of lists, empty ones included: there is <strong>no precondition</strong>. On the script, the student had started a precondition, then crossed it out: the answer got the point.</p>' },
        { t: 'The two cases of the first list', html: '<ul><li>First list empty: the result is λ2.</li><li>First list cons(e, λ): e stays at the front and, behind it, we concatenate λ and λ2.</li></ul>',
          spec: sp('axioms', '    concatenate(emptylist, λ2) = λ2', '    concatenate(cons(e, λ), λ2) = cons(e, concatenate(λ, λ2))') },
        { t: 'Check on an example', html: '<p>concatenate(cons(a, cons(b, emptylist)), cons(c, emptylist)) = cons(a, concatenate(cons(b, emptylist), cons(c, emptylist))) = cons(a, cons(b, concatenate(emptylist, cons(c, emptylist)))) = cons(a, cons(b, cons(c, emptylist))).</p>' },
        { t: 'What the script wrote', html: '<p>The script wrote concatenate(emptylist, λ2) = λ2 and concatenate(λ, emptylist) = λ (1 pt), then concat(λ, λ2) = cons(first(λ), concat(tail(λ), λ2)) (2 pts). This last axiom was accepted although its right-hand side is not defined for λ = emptylist: write “λ ≠ emptylist ⇒ …” instead. The second base axiom is true, but useless: it follows from the other two.</p>' }],
      answer: { html: '<p>No precondition. Two axioms, reasoning on the first list (this is also the official answer key of 2018):</p>',
        spec: sp('preconditions', '    none', 'axioms',
          '    concatenate(emptylist, λ2) = λ2',
          '    concatenate(cons(e, λ), λ2) = cons(e, concatenate(λ, λ2))',
          'with', '    list λ, λ2', '    element e') },
      traps: [
        'Inventing the precondition λ ≠ emptylist: concatenate is defined for all lists.',
        'Using head or next: the type is “without boxes”.',
        'Writing cons(first(λ), concatenate(tail(λ), λ2)) without the condition λ ≠ emptylist: for λ = emptylist, the right-hand side is not defined.',
        'Swapping the lists in the recursive call, or reasoning on the second list: the order of the elements is no longer preserved.',
        'Forgetting the base case concatenate(emptylist, λ2) = λ2: no concatenation can be computed to the end (lack of completeness).'],
      grading: 'from the margin of the script, preconditions 1 pt, base axioms 1 pt (most likely reading of the digit), recursive axiom 2 pts.',
      note: NOTE_SCRIPT
    },

    /* ---------- Midterm Oct. 2022 ---------- */
    'p2022-ex1': {
      src: 'Midterm Oct. 2022 · Ex 1',
      title: 'A little coursework…: observer, partial, lists, signature',
      questions: [
        '<b>1.</b> What data type does an observer return?',
        '<b>2.</b> What do we call an operation that is not defined everywhere?',
        '<b>3.</b> What are the two ways of defining a list?',
        '<b>4.</b> Which areas make up the signature of an abstract type?',
        '<b>5.</b> Give three operations defining a recursive list (without boxes).'],
      hints: [
        'Questions 1 and 2: reread the hierarchy of operations (defined and predefined types) and the part on preconditions.',
        'Question 3: the same list can be described either by the way it is built (an element followed by a list), or by the ranks of its elements.',
        'Question 5: rule out any operation that uses a box (head, contents, next) and any operation from the other way of describing a list.'],
      solution: [
        { t: 'Question 1', html: '<p><strong>A predefined type</strong> (a type designed beforehand, listed in uses). Example: length : list → integer. Official answer key: “An observer returns a predefined type.”</p>' },
        { t: 'Question 2', html: '<p><strong>A partial operation.</strong> Its domain of definition is written in the preconditions area, with is-defined-iaoi. Official answer key: “An operation that is not defined everywhere is a partial operation”.</p>' },
        { t: 'Question 3', html: '<p><strong>Recursive and iterative.</strong> It is the same data; only the way of using it changes. “Linked and contiguous” is about the representation in memory, not the abstract type. Official answer key: “The two ways of defining a list are the recursive one and the iterative one.”</p>' },
        { t: 'Question 4', html: '<p><strong>The types, uses and operations areas.</strong> preconditions, axioms and with are not part of it. Official answer key: “[…] the TYPES, USES and OPERATIONS areas.”</p>' },
        { t: 'Question 5', html: '<p><strong>Three among emptylist, cons, tail and first.</strong> head and next are excluded: they use boxes. The official answer key lists four for “three”: “emptylist, cons, tail, first”.</p>' }],
      answer: { html: '<ol><li>A predefined type.</li><li>A partial operation.</li><li>Recursive and iterative.</li><li>The types, uses and operations areas.</li><li>Three among emptylist, cons, tail, first.</li></ol>' +
        '<p><a href="../qcm/index.html#taa-p2022">The questions of this paper in the MCQ →</a></p>' },
      traps: [
        'Question 1: answering “a defined type”: that is what an internal operation returns.',
        'Question 5: naming head, contents or next (boxes), or an operation of the iterative list such as nth, length or insert.',
        'Question 3: answering “linked and contiguous”, which is about memory and not the abstract type.',
        'Question 4: forgetting uses, or adding preconditions, axioms, with.'],
      grading: '4 points for the five questions, no breakdown.'
    },

    /* ---------- Midterm Nov. 2021 ---------- */
    'p2021-ex2': {
      src: 'Midterm Nov. 2021 · Ex 2',
      title: 'A little coursework…: observer, partial, signature, axioms',
      questions: [
        '<b>1.</b> What does an observer return?',
        '<b>2.</b> What do we call an operation that is not defined everywhere?',
        '<b>3.</b> What problems arise during the making of the set of axioms?',
        '<b>4.</b> In an algebraic abstract type, which areas do not make up the signature of an abstract type?',
        '<b>5.</b> How do we write axioms?'],
      hints: [
        'Question 1: an observer queries the data without changing it. Is what it returns of the type being defined?',
        'Question 2: the domain of definition of such an operation is written in the preconditions area. What adjective does the course give it?',
        'Question 4: it is the opposite of “which areas make up the signature”. List the six areas of a specification, then remove those of the signature.'],
      solution: [
        { t: 'Question 1', html: '<p><strong>A predefined type.</strong> More precisely, an observer has at least one argument of a defined type and a result of a predefined type, like length : list → integer. Official answer key: “An observer returns a predefined type.”</p>' },
        { t: 'Question 2', html: '<p><strong>A partial operation.</strong> Its domain of definition is written in the preconditions. “Auxiliary” is the answer to another question (2019). Official answer key: “An operation that is not defined everywhere is a partial operation.”</p>' },
        { t: 'Question 3', html: '<p><strong>Completeness and consistency.</strong> Consistency: no contradictory axioms. Completeness: having written enough axioms. Official answer key: “[…] are the completeness and the consistency.”</p>' },
        { t: 'Question 4', html: '<p><strong>The preconditions, axioms and with areas.</strong> The signature is the types, uses and operations areas; the preconditions and the axioms give the properties of the operations, and with gives the types of the variables. Official answer key: “[…] the PRECONDITIONS, AXIOMS and WITH areas.”</p>' },
        { t: 'Question 5', html: '<p><strong>By applying observers to internal operations.</strong> Example: top(push(s, e)) = e. The observer top is on the outside, the internal operation push on the inside. Official answer key: “We write axioms by application of observers to internal operations.”</p>' }],
      answer: { html: '<ol><li>A predefined type.</li><li>A partial operation.</li><li>Completeness and consistency.</li><li>The preconditions, axioms and with areas.</li><li>By applying observers to internal operations.</li></ol>' +
        '<p><a href="../qcm/index.html#taa-p2021">The questions of this paper in the MCQ →</a></p>' },
      traps: [
        'Question 4: it is the opposite of the 2019 and 2022 question. Read “do not make up” carefully.',
        'Question 2: answering “auxiliary”, the answer to another question (2019).',
        'Question 3: writing “coherence” instead of “consistency”.',
        'Question 5: writing the opposite, “applying internal operations to observers”.'],
      grading: '4 points for the five questions, no breakdown.'
    },

    /* ---------- Midterm Oct. 2019 (official English paper and answer key) ---------- */
    'p2019-ex1': {
      src: 'Midterm Oct. 2019 · Ex 1',
      title: 'A little coursework…: internal, auxiliary, signature, axioms',
      questions: [
        '<b>1.</b> What does an internal operation return?',
        '<b>2.</b> How do we call an operation used to specify the domain of definition of another one?',
        '<b>3.</b> What problems arise during the making of the set of axioms?',
        '<b>4.</b> Which areas make up the signature of an abstract type?',
        '<b>5.</b> How do we write axioms?'],
      hints: [
        'Questions 1 and 4: reread the hierarchy of types (defined in types, predefined in uses) and the order of the areas of a specification.',
        'Question 2: think of ispresent, added only to write the precondition of search. What name does the course give to this role?',
        'Questions 3 and 5: the two properties the set of axioms must respect, then the method of the course (what is applied to what?).'],
      solution: [
        { t: 'Question 1', html: '<p><strong>A defined type</strong>: the type being defined, declared in the types area. Example: cons : element × list → list. Official answer key: “An internal operation returns a defined type”.</p>' },
        { t: 'Question 2', html: '<p><strong>An auxiliary operation.</strong> Examples: ispresent is used to write the precondition of search, search(e, λ) is-defined-iaoi ispresent(e, λ) = true; isinit, that of nth in the vector. It is not “a precondition” (that is not an operation), nor “a partial operation” (that is the operation whose domain is being described). Official answer key: “[…] is an auxiliary operation”.</p>' },
        { t: 'Question 3', html: '<p><strong>Completeness and consistency.</strong> Consistency: no contradictory axioms. Completeness: having written enough axioms. The word of the course is “consistency”, not “coherence”. Official answer key: “[…] are the completeness and the consistency.”</p>' },
        { t: 'Question 4', html: '<p><strong>The types, uses and operations areas.</strong> preconditions, axioms and with are not part of it. Official answer key: “[…] are the TYPES, USES and OPERATIONS areas.”</p>' },
        { t: 'Question 5', html: '<p><strong>By applying observers to internal operations.</strong> Example: top(push(s, e)) = e. The observer top is on the outside, the internal operation push on the inside. Official answer key: “We write axioms by application of observers to internal operations.”</p>' }],
      answer: { html: '<ol><li>A defined type.</li><li>An auxiliary operation.</li><li>Completeness and consistency.</li><li>The types, uses and operations areas.</li><li>By applying observers to internal operations.</li></ol>' +
        '<p><a href="../qcm/index.html#taa-p2019">The questions of this paper in the MCQ →</a></p>' },
      traps: [
        'Swapping internal operation (result of a defined type) and observer (result of a predefined type).',
        'Question 2: answering “a precondition” or “a partial operation”.',
        'Question 3: writing “coherence” instead of “consistency”.',
        'Question 4: forgetting uses, or adding preconditions, axioms, with.',
        'Question 5: writing the opposite, “applying internal operations to observers”.'],
      grading: '4 points for the five questions, no breakdown.'
    },

    /* ---------- S1# midterm of 23 April 2019 (official English paper and answer key) ---------- */
    'p2019d-ex1': {
      src: 'Midterm S1# Apr. 2019 · Ex 1',
      title: 'Vector: two errors to fix, then reinitialize',
      intro: '<p>Let the algebraic abstract data type <em>Vector</em> studied in the course defined as follows.</p>',
      specs: [{ code: VECTOR }],
      questions: [
        '<b>1.</b> This definition is incorrect. Indeed, this set of axioms has two problems. For each of these problems, precise its nature, give a description and give a solution to fix it.',
        '<b>2.</b> Now that the problems are solved, we have the algebraic type <em>Vector</em>. We suggest an extension to this type by defining a new operation: <em>reinitialize</em>. This will allow us to set a given position of the vector to its initial state (i.e. <em>uninitialized</em>). Its profile is the following: <code>reinitialize : vector × integer → vector</code>',
        '<b>(a)</b> Precise the possible domain of definition of this operation (the preconditions).',
        '<b>(b)</b> Give the axioms allowing a complete definition of this operation.'],
      hints: [
        'Only two kinds of problem: a missing axiom (completeness) or two axioms that contradict each other (consistency). For each observer, check that it is applied to vect and to modify.',
        'Look at the two axioms of isinit on modify: what does each one give when j = i?',
        'Question 2: apply all the observers of the type (isinit, nth, lowerlimit, upperlimit) to reinitialize, separating cell i from the other cells.'],
      solution: [
        { t: 'The method', html: '<p>Go through each observer (nth, isinit, lowerlimit, upperlimit) applied to each internal operation (vect, modify). lowerlimit and upperlimit are complete: one axiom on vect, one on modify. nth has no axiom on vect, and that is normal: its precondition requires an initialized cell. That leaves isinit.</p>' },
        { t: 'Problem 1: completeness', html: '<p><strong>Nature</strong>: completeness, an axiom is missing. <strong>Description</strong>: no axiom applies the observer isinit to vect. So we do not know whether a cell of a new vector is initialized, nor whether nth(vect(i, j), k) is defined, since its precondition uses isinit. <strong>Solution</strong>: add this axiom.</p>',
          spec: sp('axioms', '    isinit(vect(i, j), k) = false') },
        { t: 'Problem 2: consistency', html: '<p><strong>Nature</strong>: consistency, two axioms contradict each other. <strong>Description</strong>: the second axiom of isinit on modify does not exclude j = i. For j = i, it gives isinit(modify(v, i, e), i) = isinit(v, i), whereas the first one gives true. Example: v = vect(1, 3) and i = j = 2 give true on one side, false on the other (once the first problem is fixed). <strong>Solution</strong>: add “&amp; i ≠ j” to its condition.</p>',
          spec: sp('axioms', '    lowerlimit(v) ≤ i ≤ upperlimit(v) & lowerlimit(v) ≤ j ≤ upperlimit(v) & i ≠ j', '            ⇒ isinit(modify(v, i, e), j) = isinit(v, j)') },
        { t: 'Question 2 (a): no precondition', html: '<p>Any cell between the limits can be reset to its initial state, even a cell that is already uninitialized: it stays so. As for modify, the condition on i goes in the axioms. The official answer key: “There is no precondition.”</p>' },
        { t: 'Question 2 (b): the axioms', html: '<p>reinitialize returns a vector: it is an internal operation. We apply the four observers to it:</p>' +
          '<ul><li>isinit: false for cell i, unchanged for the other cells (j ≠ i);</li><li>nth: unchanged for j ≠ i;</li><li>lowerlimit and upperlimit: unchanged.</li></ul>' +
          '<p>No axiom for nth(reinitialize(v, i), i): this term is undefined, because the precondition of nth requires isinit = true. If cell j was not initialized, both sides of the third axiom are undefined: no contradiction.</p>' },
        { t: 'Accepted variants', html: '<ul><li>A precondition reinitialize(v, i) is-defined-iaoi lowerlimit(v) ≤ i ≤ upperlimit(v), then axioms without this condition: defensible, but the answer key says there is no precondition.</li><li>Two axioms, i &lt; j and j &lt; i, instead of i ≠ j.</li></ul>' },
        { t: 'The official answer key', html: '<p>Our answer follows it. The French version only has a few typos (“dans les postulat”, “element”, “Entier”); the English version leaves vrai, Faux and faux (true, false) in French in its axioms.</p>' }],
      answer: { html: '<p><strong>Question 1.</strong> Completeness: add isinit(vect(i, j), k) = false. Consistency: add “&amp; i ≠ j” to the second axiom of isinit on modify.</p><p><strong>Question 2.</strong> (a) No precondition. (b) Axioms:</p>',
        spec: sp('axioms',
          '    lowerlimit(v) ≤ i ≤ upperlimit(v) ⇒ isinit(reinitialize(v, i), i) = false',
          '    lowerlimit(v) ≤ i ≤ upperlimit(v) & lowerlimit(v) ≤ j ≤ upperlimit(v) & i ≠ j',
          '            ⇒ isinit(reinitialize(v, i), j) = isinit(v, j)',
          '    lowerlimit(v) ≤ i ≤ upperlimit(v) & lowerlimit(v) ≤ j ≤ upperlimit(v) & i ≠ j',
          '            ⇒ nth(reinitialize(v, i), j) = nth(v, j)',
          '    lowerlimit(reinitialize(v, i)) = lowerlimit(v)',
          '    upperlimit(reinitialize(v, i)) = upperlimit(v)',
          'with', '    vector v', '    integer i, j') },
      traps: [
        'Thinking the error is in nth or in the limits: only the axioms of isinit are faulty.',
        'Confusing the two natures: a missing axiom is completeness; two axioms that contradict each other is consistency.',
        'Writing an axiom for nth(reinitialize(v, i), i): this term is undefined.',
        'Inventing the precondition isinit(v, i) = true: reinitializing an empty cell is not an error.',
        'Forgetting lowerlimit and upperlimit: without them, we no longer know whether the limits change (lack of completeness).',
        'Forgetting “i ≠ j” in the new axioms: this recreates problem 2.'],
      grading: '6 points for the exercise, no breakdown per question.'
    },

    /* ---------- Midterm Oct. 2018, repeated in 2020 (official English paper and answer key) ---------- */
    'p2018-ex1': {
      src: 'Midterms 2018 and 2020 · Ex 1',
      title: 'Recursive lists: search for an element, concatenate',
      intro: '<p>Consider the algebraic abstract type <em>recursive list</em> seen in class and recalled below.</p>' +
        '<p>We propose to extend the properties of this type allowing it:</p><ul><li>to search for an element in a list</li><li>to concatenate two lists.</li></ul>' +
        '<p>The search for an item in a list will return the corresponding box to the element only if it exists. Then we have two operations for the search, the one which determines the existence of the element and the other one which determines the box for the latter, if it exists. As for the concatenation, it requires no auxiliary operation. We then consider the three following operations:</p>',
      specs: [
        { code: sp('operations', '    ispresent : element × list → boolean', '    search : element × list → box.', '', '    concatenate : list × list → list') },
        { code: REC_BOXES, cap: 'The type <em>recursive list</em> recalled by the paper.' }],
      questions: [
        '<b>1.</b> Give the axioms allowing one to deduce a value for the search for an element <em>e</em> in a recursive list λ. Specify the preconditions if there are any.',
        '<b>2.</b> Give the axioms allowing one to deduce a value for the concatenation of two recursive lists λ and λ2. Specify the preconditions if there are any.'],
      hints: [
        'First classify the three operations: ispresent returns a boolean; search only makes sense if the element is present; concatenate returns a list. Which ones are partial?',
        'For ispresent, apply it to the two ways of building a list: emptylist and cons(e′, λ). In the cons case, separate e = e′ and e ≠ e′.',
        'For concatenate, reason on the first list: what is concatenate(emptylist, λ2)? And concatenate(cons(e, λ), λ2)?'],
      solution: [
        { t: 'Question 1: ispresent', html: '<p>ispresent returns a boolean, a predefined type: it is an observer, defined for every list. Apply it to the two ways of building a list:</p>' +
          '<ul><li>emptylist: no element, so false;</li><li>cons(e′, λ) with e = e′: e is at the front, so true;</li><li>cons(e′, λ) with e ≠ e′: look further, in λ.</li></ul>' +
          '<p>ispresent uses the boolean type: add it to uses.</p>',
          spec: sp('axioms', '    ispresent(e, emptylist) = false', '    e = e′ ⇒ ispresent(e, cons(e′, λ)) = true', '    e ≠ e′ ⇒ ispresent(e, cons(e′, λ)) = ispresent(e, λ)') },
        { t: 'Question 1: search', html: '<p>search only makes sense if e is in the list: it is a partial operation. Its precondition uses ispresent, which serves as an auxiliary operation. An axiom then says that the returned box contains e.</p>',
          spec: sp('preconditions', '    search(e, λ) is-defined-iaoi ispresent(e, λ) = true', 'axioms', '    contents(search(e, λ)) = e') },
        { t: 'Going further: which box?', html: '<p>If e appears several times, contents(search(e, λ)) = e (the axiom of the official answer key) does not say which box is returned. To return the first occurrence, you can add these two axioms, or use them instead. In the e ≠ e′ case, the box found in λ is also a box of cons(e′, λ): that is what the course axiom next(head(λ)) = head(tail(λ)) says.</p>',
          spec: sp('axioms', '    e = e′ ⇒ search(e, cons(e′, λ)) = head(cons(e′, λ))', '    e ≠ e′ ⇒ search(e, cons(e′, λ)) = search(e, λ)') },
        { t: 'Question 2: concatenate', html: '<p>concatenate is defined for every pair of lists, empty ones included: <strong>no precondition</strong>. Reason on the first list. If it is empty, the result is λ2; otherwise, its first element stays at the front and the rest is concatenated.</p>' +
          '<p>Example: concatenate(cons(a, cons(b, emptylist)), λ2) = cons(a, concatenate(cons(b, emptylist), λ2)) = cons(a, cons(b, λ2)).</p>',
          spec: sp('axioms', '    concatenate(emptylist, λ2) = λ2', '    concatenate(cons(e, λ), λ2) = cons(e, concatenate(λ, λ2))') },
        { t: 'Accepted variants', html: '<ul><li>concatenate with first and tail, keeping the emptylist case: λ ≠ emptylist ⇒ concatenate(λ, λ2) = cons(first(λ), concatenate(tail(λ), λ2)).</li><li>Adding concatenate(λ, emptylist) = λ: it is true (a consequence of the two axioms), but useless.</li></ul>' },
        { t: 'The official answer key', html: '<p>It gives these axioms (2018, reused as is in 2020), but it does not add boolean to uses, and its comment speaks of “the list λ” for an axiom that writes λ2.</p>' }],
      answer: { html: '<p>Only one precondition, for search: ispresent and concatenate are defined everywhere.</p>',
        spec: sp('uses', '    element, boolean', 'preconditions',
          '    search(e, λ) is-defined-iaoi ispresent(e, λ) = true', 'axioms',
          '    ispresent(e, emptylist) = false',
          '    e = e′ ⇒ ispresent(e, cons(e′, λ)) = true',
          '    e ≠ e′ ⇒ ispresent(e, cons(e′, λ)) = ispresent(e, λ)',
          '    contents(search(e, λ)) = e',
          '    concatenate(emptylist, λ2) = λ2',
          '    concatenate(cons(e, λ), λ2) = cons(e, concatenate(λ, λ2))',
          'with', '    list λ, λ2', '    element e, e′') },
      traps: [
        'Taking λ ≠ emptylist as the precondition of search: it lets through lists where e is absent.',
        'Writing the third axiom of ispresent without “e ≠ e′”: when e is at the front and absent from the rest, two axioms give true and false (lack of consistency).',
        'Inventing a precondition for ispresent or for concatenate: both are defined everywhere.',
        'Swapping the lists in the recursive call, cons(e, concatenate(λ2, λ)), or reasoning on the second list: the order of the elements is no longer preserved.',
        'Forgetting the base case concatenate(emptylist, λ2) = λ2: no concatenation can be computed to the end (lack of completeness).'],
      grading: '5 points for the exercise (questions 1 and 2, no breakdown).'
    },

    /* ---------- Midterm Nov. 2017 (exercise 1 repeated in 2021) ---------- */
    'p2017-ex1': {
      src: 'Midterms 2017 and 2021 · Ex 1',
      title: 'Iterative list: modify',
      intro: '<p>Consider the algebraic abstract type <em>iterative list</em> seen in class, whose signature is recalled below.</p>' +
        '<p>We propose to extend this type by defining a new operation: <em>modify</em>. It will allow us to change the value of an existing element. Its profile is the following:</p>',
      specs: [
        { code: sp('operations', '    modify : list × integer × element → list'), cap: 'where <em>modify(l,i,e)</em> changes the value of the i<sup>th</sup> element of the list <em>l</em> by replacing it with the element <em>e</em>.' },
        { code: ITER_2017, cap: 'The signature of the iterative list recalled by the paper.' }],
      questions: [
        '<b>1.</b> Specify the possible domain of definition of this operation.',
        '<b>2.</b> Give the axioms defining this operation in a sufficiently complete way.'],
      hints: [
        'Question 1: modify changes an element that already exists. For which ranks i is there an element to change? Compare with the preconditions of insert and delete.',
        'Question 2: modify returns a list, it is an internal operation. Apply the observers of the iterative list to it: length, then nth.',
        'For nth(modify(λ, i, e), k), separate two cases that do not overlap: k = i and k ≠ i.'],
      solution: [
        { t: 'The method', html: '<p>modify returns a list, the defined type: it is an internal operation. To say what it does, we apply the observers of the iterative list to it. An iterative list is fully described by its length and its nth values: these are the two observers to apply to modify(λ, i, e).</p>' },
        { t: 'Question 1: the precondition', html: '<p>Only an existing element can be changed, so of rank 1 to length(λ): modify is partial. This is the domain of delete, not that of insert (1 ≤ i ≤ length(λ) + 1): modify does not create a cell. λ ≠ emptylist is redundant with 1 ≤ i ≤ length(λ), since length(emptylist) = 0; the answer key writes it anyway.</p>',
          spec: sp('preconditions', '    modify(λ, i, e) is-defined-iaoi λ ≠ emptylist & 1 ≤ i ≤ length(λ)') },
        { t: 'Question 2: length', html: '<p>Changing an element does not change the number of elements:</p>', spec: sp('axioms', '    length(modify(λ, i, e)) = length(λ)') },
        { t: 'Question 2: nth, two cases', html: '<p>We observe rank k of the result:</p><ul><li>k = i: it is the modified cell, it contains e;</li><li>k ≠ i, between 1 and length(λ): the cell has not changed, it contains nth(λ, k).</li></ul>' +
          '<p>Without “k ≠ i”, the second axiom would also apply to k = i and give nth(λ, i), whereas the first gives e: two values for the same term, a lack of consistency.</p>',
          spec: sp('axioms', '    k = i ⇒ nth(modify(λ, i, e), k) = e', '    1 ≤ k ≤ length(λ) & k ≠ i ⇒ nth(modify(λ, i, e), k) = nth(λ, k)') },
        { t: 'What we do not write', html: '<p>Nothing for access and contents: the axiom of the type, contents(access(λ, k)) = nth(λ, k), already applies to modify(λ, i, e). And modify shifts no rank: no nth(λ, k + 1) or nth(λ, k − 1), as for insert or delete.</p>' },
        { t: 'Accepted variants', html: '<ul><li>No precondition, but the condition 1 ≤ i ≤ length(λ) at the start of each axiom. The 2021 answer key says so: “Not specifying it here does not matter if the postulate exists at the level of the axioms.”</li>' +
          '<li>nth(modify(λ, i, e), i) = e instead of k = i ⇒ nth(modify(λ, i, e), k) = e.</li>' +
          '<li>Two axioms, 1 ≤ k &lt; i and i &lt; k ≤ length(λ), instead of k ≠ i.</li>' +
          '<li>modify(λ, i, e) = insert(delete(λ, i), i, e) is correct, but it is not the course method: no observer is applied. Do not give it on its own.</li></ul>' }],
      answer: { html: '<p>The one from the official 2021 answer key (the 2017 paper has none), written with λ:</p>',
        spec: sp('preconditions', '    modify(λ, i, e) is-defined-iaoi λ ≠ emptylist & 1 ≤ i ≤ length(λ)', 'axioms',
          '    length(modify(λ, i, e)) = length(λ)',
          '    k = i ⇒ nth(modify(λ, i, e), k) = e',
          '    1 ≤ k ≤ length(λ) & k ≠ i ⇒ nth(modify(λ, i, e), k) = nth(λ, k)',
          'with', '    list λ', '    integer i, k', '    element e') },
      traps: [
        'Copying the precondition of insert (1 ≤ i ≤ length(λ) + 1): modify does not create a cell.',
        'Forgetting “k ≠ i” in the last axiom: for k = i, two axioms give e and nth(λ, i). That is a lack of consistency as soon as e ≠ nth(λ, i).',
        'Forgetting the axiom on length: we no longer know how many elements the list has (lack of completeness).',
        'Shifting the ranks as for insert or delete (nth(λ, k + 1), nth(λ, k − 1)): modify shifts nothing.',
        'Writing an axiom without an observer on the left, such as “modify(λ, i, e) = …” alone, or only on contents(access(…)).'],
      grading: '2 points for the exercise, no breakdown per question (in 2017 as in 2021).'
    },

    'p2017-ex2': {
      src: 'Midterm Nov. 2017 · Ex 2',
      title: 'Backward recursive list',
      intro: '<p>Consider the algebraic abstract type <em>recursive list</em> seen in class, whose signature is recalled below.</p>' +
        '<p>We propose to define the type <em>backward recursive list</em> by replacing the operations <em>head</em>, <em>tail</em>, <em>first</em> and <em>next</em> with the operations <em>rear</em>, <em>beginning</em>, <em>last</em> and <em>previous</em> such that:</p>' +
        '<ul><li>The operation <em>rear</em> gives, for a non-empty list, the last box of the list,</li>' +
        '<li>The operation <em>beginning</em> gives, for a non-empty list, the list without its last element,</li>' +
        '<li>The operation <em>last</em> gives, for a non-empty list, the last element of the list,</li>' +
        '<li>The operation <em>previous</em> gives the previous box of a box in the list.</li></ul>',
      specs: [{ code: REC_2017 }],
      questions: [
        '<b>1.</b> Specify the possible domains of definition of these operations.',
        '<b>2.</b> Give the axioms defining the type <em>backward recursive list</em> in a sufficiently complete way.'],
      hints: [
        'The paper does not replace cons: it keeps its meaning from the course and still adds at the front. So we build from the front and observe from the end, as in a queue.',
        'For last and beginning, handle the two cases of cons(e, λ): λ empty (e is then the only element) and λ non-empty (the last element is in λ).',
        'For the boxes, write the mirror image of the two axioms of the course: first(λ) = contents(head(λ)) and next(head(λ)) = head(tail(λ)).'],
      solution: [
        { t: 'Chosen reading', html: '<p>The paper replaces head, tail, first and next, but keeps cons. We leave it its meaning from the course: cons(e, λ) adds e at the front. So we build from the front and observe from the end. This is the pattern of queues: add on one side, read on the other, hence an “empty list” case and a “non-empty list” case.</p>' },
        { t: 'Question 1: the preconditions', html: '<p>rear, beginning and last only make sense for a non-empty list. previous is not defined on the first box, but no operation can test “first box”: like next in the course, it gets no precondition. cons is defined everywhere.</p>',
          spec: sp('preconditions', '    rear(λ) is-defined-iaoi λ ≠ emptylist', '    beginning(λ) is-defined-iaoi λ ≠ emptylist', '    last(λ) is-defined-iaoi λ ≠ emptylist') },
        { t: 'Question 2: the boxes', html: '<p>The two axioms on boxes are the mirror image of those of the course, first(λ) = contents(head(λ)) and next(head(λ)) = head(tail(λ)):</p>',
          spec: sp('axioms', '    last(λ) = contents(rear(λ))', '    previous(rear(λ)) = rear(beginning(λ))') },
        { t: 'Question 2: last and beginning on cons', html: '<p>Apply last and beginning to the two cases of cons(e, λ):</p>' +
          '<ul><li>λ = emptylist: e is the only element. It is the last one, and without it nothing remains.</li><li>λ ≠ emptylist: the last element is that of λ. For beginning, remove the last element of λ and keep e at the front.</li></ul>',
          spec: sp('axioms', '    last(cons(e, emptylist)) = e', '    λ ≠ emptylist ⇒ last(cons(e, λ)) = last(λ)', '    beginning(cons(e, emptylist)) = emptylist', '    λ ≠ emptylist ⇒ beginning(cons(e, λ)) = cons(e, beginning(λ))') },
        { t: 'Check: reading the list backward', html: '<p>With λ = cons(a, cons(b, cons(c, emptylist))):</p>' +
          '<ul><li>last(λ) = last(cons(b, cons(c, emptylist))) = last(cons(c, emptylist)) = c;</li>' +
          '<li>beginning(λ) = cons(a, beginning(cons(b, cons(c, emptylist)))) = cons(a, cons(b, emptylist));</li>' +
          '<li>contents(previous(rear(λ))) = contents(rear(beginning(λ))) = last(beginning(λ)) = b.</li></ul>' +
          '<p>Likewise, contents(previous<sup>k</sup>(rear(λ))) = last(beginning<sup>k</sup>(λ)): each element can be read starting from the end, and last and beginning can be computed for any list. The axioms are complete.</p>' },
        { t: 'The other possible reading', html: '<p>With no answer key, a second reading exists: in the backward type, cons(e, λ) would place e <em>after</em> the last element. The axioms become a simple renaming: beginning(cons(e, λ)) = λ and last(cons(e, λ)) = e, with the same two axioms on boxes. This reading changes the meaning of cons without the paper saying so: if you choose it, state the assumption in one sentence. With cons at the front, these two axioms are wrong.</p>' }],
      answer: { html: '<p>Chosen reading: cons keeps its meaning from the course (adding at the front).</p>',
        spec: sp('types', '    list, box', 'uses', '    element', 'operations',
          '    emptylist : → list',
          '    cons      : element × list → list',
          '    rear      : list → box',
          '    beginning : list → list',
          '    last      : list → element',
          '    contents  : box → element',
          '    previous  : box → box',
          'preconditions',
          '    rear(λ) is-defined-iaoi λ ≠ emptylist',
          '    beginning(λ) is-defined-iaoi λ ≠ emptylist',
          '    last(λ) is-defined-iaoi λ ≠ emptylist',
          'axioms',
          '    last(λ) = contents(rear(λ))',
          '    previous(rear(λ)) = rear(beginning(λ))',
          '    last(cons(e, emptylist)) = e',
          '    λ ≠ emptylist ⇒ last(cons(e, λ)) = last(λ)',
          '    beginning(cons(e, emptylist)) = emptylist',
          '    λ ≠ emptylist ⇒ beginning(cons(e, λ)) = cons(e, beginning(λ))',
          'with', '    list λ', '    element e') },
      traps: [
        'Writing beginning(cons(e, λ)) = λ and last(cons(e, λ)) = e although cons adds at the front: that is the “mirror” reading, valid only if you state it.',
        'Forgetting the cons(e, emptylist) case: last(emptylist) is undefined, so the recursive axiom alone never concludes (lack of completeness).',
        'Writing rear(cons(e, λ)) = rear(λ): these two boxes are not the same. Going back with previous, you reach e in cons(e, λ), never in λ.',
        'Keeping first, tail, head or next in the new type: the paper says they are replaced.',
        'Putting a precondition on cons: cons is defined everywhere.'],
      grading: '4 points for the exercise, no breakdown.',
      note: 'No official answer key (blank answer sheets): solution written and checked on a model, with the chosen reading.'
    }
  });
})();
