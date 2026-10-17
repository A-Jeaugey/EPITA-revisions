/* English text for data/taa/ex-externes.js (merged by id over the French file).
   These sources only exist in French (January 2018 paper, Krisboul’s online course, Moodle): faithful translation.
   Names: those of the English algo papers and of the site (emptylist, head, tail, first, contents, next, nth,
   length, insert, delete, access, emptystack, push, pop, top, isempty, emptyqueue, enqueue, dequeue, emptyset,
   add, card, true, false, not, and, or, vect, modifynth, isinit, lowerlimit, upperlimit); made-up operations:
   hauteur → height, fond → bottom, dernier → last, existe → exists, existe-depuis → existsfrom, inclus → included,
   multiensemble → multiset (emptymultiset). Variables: stack s, queue q, set s, multiset ms. */
(function () {
  /* ---------- small helpers (same as the French file) ---------- */
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function c(s) { return '<code>' + esc(s).replace(/\((?=[^\s(),]+\()/g, '(<wbr>') + '</code>'; }
  function L() { return Array.prototype.slice.call(arguments).join('\n'); }
  function ol(items) { return '<ol>' + items.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>'; }
  function table(head, rows) {
    return '<div style="width:0;min-width:100%"><div class="tbl"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + x + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div></div>';
  }

  /* ---------- types of the course (site notation) ---------- */
  var VECTOR = L('types', '    vector', 'uses', '    integer, boolean, element', 'operations',
    '          vect : integer × integer → vector',
    '     modifynth : vector × integer × element → vector',
    '           nth : vector × integer → element',
    '        isinit : vector × integer → boolean',
    '    upperlimit : vector → integer',
    '    lowerlimit : vector → integer',
    'preconditions',
    '    nth(v, i) is-defined-iaoi lowerlimit(v) ≤ i ≤ upperlimit(v)',
    '                              & isinit(v, i) = true',
    'axioms',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) ⇒ nth(modifynth(v, i, e), i) = e',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) & lowerlimit(v) ≤ j ≤ upperlimit(v) & i ≠ j',
    '                ⇒ nth(modifynth(v, i, e), j) = nth(v, j)',
    '    isinit(vect(i, j), k) = false',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) ⇒ isinit(modifynth(v, i, e), i) = true',
    '    lowerlimit(v) ≤ i ≤ upperlimit(v) & lowerlimit(v) ≤ j ≤ upperlimit(v) & i ≠ j',
    '                ⇒ isinit(modifynth(v, i, e), j) = isinit(v, j)',
    '    lowerlimit(vect(i, j)) = i',
    '    lowerlimit(modifynth(v, i, e)) = lowerlimit(v)',
    '    upperlimit(vect(i, j)) = j',
    '    upperlimit(modifynth(v, i, e)) = upperlimit(v)',
    'with', '    vector v', '    integer i, j, k', '    element e');

  var LREC = L('types', '    list, box', 'uses', '    element', 'operations',
    '    emptylist : → list',
    '         cons : element × list → list',
    '         tail : list → list',
    '         head : list → box',
    '     contents : box → element',
    '        first : list → element',
    '         next : box → box',
    'preconditions',
    '    tail(λ) is-defined-iaoi λ ≠ emptylist',
    '    head(λ) is-defined-iaoi λ ≠ emptylist',
    '    first(λ) is-defined-iaoi λ ≠ emptylist',
    'axioms',
    '    first(λ) = contents(head(λ))',
    '    tail(cons(e, λ)) = λ',
    '    first(cons(e, λ)) = e',
    '    next(head(λ)) = head(tail(λ))',
    'with', '    list λ', '    element e');

  var STACK = L('types', '    stack', 'uses', '    boolean, element', 'operations',
    '    emptystack : → stack',
    '          push : stack × element → stack',
    '           pop : stack → stack',
    '           top : stack → element',
    '       isempty : stack → boolean',
    'preconditions',
    '    pop(s) is-defined-iaoi isempty(s) = false',
    '    top(s) is-defined-iaoi isempty(s) = false',
    'axioms',
    '    pop(push(s, e)) = s',
    '    top(push(s, e)) = e',
    '    isempty(emptystack) = true',
    '    isempty(push(s, e)) = false',
    'with', '    stack s', '    element e');

  var QUEUE = L('types', '    queue', 'uses', '    boolean, element', 'operations',
    '    emptyqueue : → queue',
    '       enqueue : queue × element → queue',
    '       dequeue : queue → queue',
    '         first : queue → element',
    '       isempty : queue → boolean',
    'preconditions',
    '    dequeue(q) is-defined-iaoi isempty(q) = false',
    '    first(q) is-defined-iaoi isempty(q) = false',
    'axioms',
    '    isempty(q) = true ⇒ first(enqueue(q, e)) = e',
    '    isempty(q) = false ⇒ first(enqueue(q, e)) = first(q)',
    '    isempty(q) = true ⇒ dequeue(enqueue(q, e)) = emptyqueue',
    '    isempty(q) = false ⇒ dequeue(enqueue(q, e)) = enqueue(dequeue(q), e)',
    '    isempty(emptyqueue) = true',
    '    isempty(enqueue(q, e)) = false',
    'with', '    queue q', '    element e');

  var SET = L('types', '    set', 'uses', '    element, boolean, integer', 'operations',
    '    emptyset : → set',
    '         add : element × set → set',
    '      delete : element × set → set',
    '       _ ∈ _ : element × set → boolean',
    '        card : set → integer',
    'axioms',
    '    x ∈ emptyset = false',
    '    x = y ⇒ (x ∈ add(y, s)) = true',
    '    x ≠ y ⇒ (x ∈ add(y, s)) = (x ∈ s)',
    '    x = y ⇒ (x ∈ delete(y, s)) = false',
    '    x ≠ y ⇒ (x ∈ delete(y, s)) = (x ∈ s)',
    '    card(emptyset) = 0',
    '    x ∈ s = true ⇒ card(add(x, s)) = card(s)',
    '    x ∈ s = false ⇒ card(add(x, s)) = card(s) + 1',
    '    x ∈ s = true ⇒ card(delete(x, s)) = card(s) − 1',
    '    x ∈ s = false ⇒ card(delete(x, s)) = card(s)',
    'with', '    set s', '    element x, y');

  var MULTI = L('types', '    multiset', 'uses', '    element, boolean, integer', 'operations',
    '    emptymultiset : → multiset',
    '              add : element × multiset → multiset',
    '           delete : element × multiset → multiset',
    '            _ ∈ _ : element × multiset → boolean',
    '             card : multiset → integer',
    '    nboccurrences : element × multiset → integer',
    'axioms',
    '    (x ∈ emptymultiset) = false',
    '    x = y ⇒ (x ∈ add(y, ms)) = true',
    '    x ≠ y ⇒ (x ∈ add(y, ms)) = (x ∈ ms)',
    '    nboccurrences(x, ms) ≤ 1 ⇒ (x ∈ delete(x, ms)) = false',
    '    x ≠ y ⇒ (x ∈ delete(y, ms)) = (x ∈ ms)',
    '',
    '    card(emptymultiset) = 0',
    '    card(add(x, ms)) = card(ms) + 1',
    '    x ∈ ms = true ⇒ card(delete(x, ms)) = card(ms) − 1',
    '    x ∈ ms = false ⇒ card(delete(x, ms)) = card(ms)',
    '',
    '    nboccurrences(x, emptymultiset) = 0',
    '    x = y ⇒ nboccurrences(x, add(y, ms)) = nboccurrences(x, ms) + 1',
    '    x ≠ y ⇒ nboccurrences(x, add(y, ms)) = nboccurrences(x, ms)',
    '    nboccurrences(x, ms) = 0 ⇒ nboccurrences(x, delete(x, ms)) = 0',
    '    nboccurrences(x, ms) ≥ 1 ⇒',
    '            nboccurrences(x, delete(x, ms)) = nboccurrences(x, ms) − 1',
    '    x ≠ y ⇒ nboccurrences(x, delete(y, ms)) = nboccurrences(x, ms)',
    'with', '    multiset ms', '    element x, y');

  /* ---------- January 2018 paper ---------- */
  var ORDERS = ['A B C D E F', 'B D E F A C', 'D E C B F A', 'F E D C B A'];
  function ord(o) { return c(o.replace(/ /g, ' ')); }
  var OK = '<b>✓</b>';

  REV.i18n.patch(window.TAA_EX, {
    'hyp-2018-p1-ex1': {
      src: 'Midterm of January 2018 · Ex 1',
      title: 'Stack or queue?',
      intro: '<p>Algorithmics midterm no. 1 of 9 January 2018 (class of 2022). This paper is not in the Past-Exams archive: it comes from HyperAnnales, with its official answer key.</p>' +
        '<p><b>Exercise 1 (Stack or queue? – 2 points)</b></p>' +
        '<p>The values A, B, C, D, E and F are added, in this order, to an empty linear structure. For each of the output orders given on the answer sheets, state whether the structure in question can be: a stack, a queue (it can be both), or neither of them (neither a stack nor a queue).</p>' +
        table(['Output order', 'stack', 'queue', 'neither'], ORDERS.map(function (o) { return [ord(o), '', '', '']; })),
      questions: ['For each of the four output orders, tick stack, queue or neither, as on the answer sheet.'],
      hints: [
        'A queue (FIFO) returns the elements in the order they came in. Only one of the four orders suits a queue.',
        'For a stack (LIFO), simulate: push A, B, C… until the letter to output is on top, then pop it. You can pop between two pushes.',
        'If the letter to output is already in the stack but not on top, the order is impossible for a stack.'],
      solution: [
        { t: 'The queue', html: '<p>A queue always returns the elements in their order of entry. The only possible output is ' + ord('A B C D E F') + ': the other three orders are not queues.</p>' },
        { t: 'A B C D E F', html: '<p>Push A, pop A, push B, pop B, and so on: a stack allows it. It is also the order of the queue. Tick <b>stack and queue</b>.</p>' },
        { t: 'B D E F A C', html: '<p>Push A and B, pop B. Push C and D, pop D. Push E, pop E. Push F, pop F. Now A must come out, but the top is C (A is underneath): impossible. Neither a stack nor a queue: <b>neither</b>.</p>' },
        { t: 'D E C B F A', html: '<p>Push A, B, C and D, pop D. Push E, pop E. Pop C, then B. Push F, pop F. Pop A. Everything works: <b>stack</b>.</p>' },
        { t: 'F E D C B A', html: '<p>Push everything, then pop everything: the order is reversed. <b>Stack</b>.</p>' },
        { t: 'Quick rule', html: '<p>Three letters that came in in the order x, y, z cannot come out of a stack in the order z, x, y. In ' + ord('B D E F A C') + ', D comes out before A, and A before C: that is this pattern. Of the 720 possible orders of A to F, 132 can be produced by a stack, only one by a queue.</p>' }],
      answer: { html: '<ul style="margin:0;padding-left:1.2rem"><li>' + ord(ORDERS[0]) + ': stack ' + OK + ' and queue ' + OK + '</li><li>' + ord(ORDERS[1]) + ': neither ' + OK + '</li><li>' +
        ord(ORDERS[2]) + ': stack ' + OK + '</li><li>' + ord(ORDERS[3]) + ': stack ' + OK + '</li></ul>' },
      traps: [
        ord('A B C D E F') + ': tick both columns, stack and queue.',
        'A stack does not only reverse the order: you can pop between two pushes (' + ord('D E C B F A') + ').',
        'A queue never changes the order.'],
      grading: '2 points for the exercise; the answer key gives no breakdown per line.'
    },

    /* ---------- Boolean ---------- */
    'kb-booleen': {
      src: 'Moodle practice exercise',
      title: 'The axioms of the Boolean type',
      intro: '<p>Practice exercise from the Moodle (1 October), whose solution was announced for “later”. Krisboul’s online course gives the same signature, without the axioms.</p>',
      specs: [{ code: L('types', '    boolean', 'operations',
        '       true : → boolean',
        '      false : → boolean',
        '        not : boolean → boolean',
        '    _ and _ : boolean × boolean → boolean',
        '     _ or _ : boolean × boolean → boolean'),
        cap: 'The character _ marks the place of an argument: we write ' + c('b1 and b2') + ', ' + c('b1 or b2') + '.' }],
      questions: [
        '1. Classify the operations: constants, internal operations, observers. Are there any preconditions?',
        '2. Write the axioms of ' + c('not') + ', ' + c('_ and _') + ' and ' + c('_ or _') + '.',
        '3. Compute ' + c('not((true and false) or not(false))') + ' with your axioms only.'],
      hints: [
        'Here, ' + c('boolean') + ' is the defined type. Look at the type of the result of each operation.',
        'Every boolean value is written ' + c('true') + ' or ' + c('false') + '. Describe each operation on these two constants.',
        'For ' + c('_ and _') + ' and ' + c('_ or _') + ', no need for all four combinations: split into cases on the first argument and keep the second one as a variable ' + c('b') + '.'],
      solution: [
        { t: 'Classifying the operations', html: '<p>' + c('boolean') + ' is the only type, listed in ' + c('types') + ': it is the defined type. ' + c('true') + ' and ' + c('false') + ' have no argument: they are <b>constants</b>. They return a defined type (boolean): so they are also internal operations, with no argument.</p>' +
          '<p>' + c('not') + ', ' + c('_ and _') + ' and ' + c('_ or _') + ' return a boolean: internal operations. No operation returns a predefined type: there is no observer. All of them are defined everywhere: <b>no precondition</b>.</p>' },
        { t: 'Method', html: '<p>With no observer to apply, we describe each internal operation on the two possible values, ' + c('true') + ' and ' + c('false') + '.</p>' },
        { t: 'not', html: '<p>Two cases: ' + c('not(true) = false') + ' and ' + c('not(false) = true') + '.</p>' },
        { t: 'and, or', html: '<p>Cases on the first argument. ' + c('true and b') + ' is worth whatever ' + c('b') + ' is worth; ' + c('false and b') + ' is ' + c('false') + ', whatever b. For or, it is the other way round: ' + c('true or b = true') + ' and ' + c('false or b = b') + '.</p>' +
          '<p>Variant without a variable: the ten lines of the truth tables (2 for not, 4 for and, 4 for or). It is correct too, but longer.</p>' },
        { t: 'The computation of question 3', html: ol([
          c('not((true and false) or not(false))'),
          c('= not((true and false) or true)') + ': ' + c('not(false) = true'),
          c('= not(false or true)') + ': ' + c('true and b = b') + ', with b = false',
          c('= not(true)') + ': ' + c('false or b = b') + ', with b = true',
          c('= false') + ': ' + c('not(true) = false')]) }],
      answer: { html: '<p>1. ' + c('true') + ' and ' + c('false') + ': constants (they return the defined type, boolean). ' + c('not') + ', ' + c('_ and _') + ', ' + c('_ or _') + ': internal operations. No observer, no precondition.</p><p>2. The axioms below. 3. ' + c('false') + '.</p>',
        spec: L('axioms', '    not(true) = false', '    not(false) = true', '    true and b = b', '    false and b = false', '    true or b = true', '    false or b = b', 'with', '    boolean b') },
      traps: [
        c('true and b = b') + ', not ' + c('= true') + '; ' + c('false or b = b') + ', not ' + c('= false') + '.',
        'Do not add a wrong axiom “on top”, such as ' + c('b and true = true') + ': it would contradict ' + c('false and true = false') + ' (consistency).',
        'Do not forget ' + c('not(false) = true') + '.',
        'A constant returns a <b>defined</b> type: here, ' + c('true : → boolean') + ' in the boolean type itself. At the 2023 midterm, the answer “predefined” got 0.',
        'With the profile ' + c('and : boolean × boolean → boolean') + ' of the online course, we write ' + c('and(true, b)') + '; with ' + c('_ and _') + ', we write ' + c('true and b') + '.'],
      note: 'No official answer key (the Moodle announced it for “later”): solution written and checked on all the truth tables.'
    },

    /* ---------- Vector (1) ---------- */
    'kb-vecteur-a': {
      src: 'Exercise built on the course',
      title: 'The Vector type: classify the operations, compute',
      intro: '<p>The Vector type from Krisboul’s online course, also given in the Moodle appendix. A vector has two limits and cells that are filled one by one with ' + c('modifynth') + '.</p>',
      specs: [{ code: VECTOR, cap: 'The Vector type of the course, in the site’s notation.' }],
      questions: [
        '1. Give the defined type and the predefined types, then classify each operation: internal operation or observer.',
        '2. Which operation is partial? Which one is an auxiliary operation, and why did the course add it?',
        '3. With ' + c('v = modifynth(modifynth(vect(1, 3), 2, a), 2, b)') + ', compute ' + c('nth(v, 2)') + ', ' + c('isinit(v, 1)') + ', ' + c('nth(v, 1)') + ', ' + c('lowerlimit(v)') + ' and ' + c('upperlimit(v)') + '.'],
      hints: [
        'Defined: listed in ' + c('types') + '. Predefined: listed in ' + c('uses') + '. Internal: result of a defined type. Observer: at least one argument of a defined type and a result of a predefined type.',
        'A partial operation has a precondition. Look at which operation is used to write this precondition.',
        'Read ' + c('v') + ' from the inside out. At each step, check the condition of the axiom (i between the limits, ' + c('i = j') + ' or ' + c('i ≠ j') + '). For ' + c('nth') + ', check the precondition first.'],
      solution: [
        { t: 'The types', html: '<p>' + c('vector') + ' is in ' + c('types') + ': defined type. ' + c('integer') + ', ' + c('boolean') + ' and ' + c('element') + ' are in ' + c('uses') + ': predefined types.</p>' },
        { t: 'The operations', html: table(['Operation', 'Result and role'], [
            [c('vect'), 'vector: internal operation. No argument of a defined type: it creates the vector from its limits.'],
            [c('modifynth'), 'vector: internal operation.'],
            [c('nth'), 'element: observer.'],
            [c('isinit'), 'boolean: observer.'],
            [c('lowerlimit') + '<br>' + c('upperlimit'), 'integer: observers.']]) +
          '<p>The course puts it this way: “vector is a defined type, integer and element are predefined types, which makes modifynth an internal operation and nth, lowerlimit and upperlimit observers”.</p>' },
        { t: 'Partial and auxiliary', html: '<p>' + c('nth') + ' is the only partial operation: you read neither a cell outside the limits, nor a cell that was never filled. To write its precondition, you need to know whether a cell has been filled: that is the role of ' + c('isinit') + '.</p>' +
          '<p>An operation used to specify the domain of definition of another one is an <b>auxiliary operation</b>. The course: “so we had to add an auxiliary operation isinit whose only purpose is to allow us to write a precondition on nth”.</p>' },
        { t: 'The limits', html: '<p>Let ' + c('v1 = modifynth(vect(1, 3), 2, a)') + ', so ' + c('v = modifynth(v1, 2, b)') + '. The axioms of the limits have no condition: ' + c('lowerlimit(v) = lowerlimit(v1) = lowerlimit(vect(1, 3)) = 1') + '. Likewise, ' + c('upperlimit(v) = 3') + '.</p>' },
        { t: 'nth(v, 2)', html: '<p>Precondition: 1 ≤ 2 ≤ 3, and ' + c('isinit(v, 2) = true') + ' (axiom of the modified cell, 2 is between the limits of v1). Then ' + c('nth(modifynth(v1, 2, b), 2) = b') + ': first axiom, same cell. The second write to cell 2 replaced a.</p>' },
        { t: 'isinit(v, 1) and nth(v, 1)', html: '<p>' + c('isinit(modifynth(v1, 2, b), 1)') + ': i = 2, j = 1, both between the limits, i ≠ j. So ' + c('= isinit(v1, 1)') + '. Same axiom: ' + c('= isinit(vect(1, 3), 1) = false') + '.</p>' +
          '<p>The precondition of ' + c('nth(v, 1)') + ' requires ' + c('isinit(v, 1) = true') + ': it does not hold. ' + c('nth(v, 1)') + ' is <b>not defined</b>.</p>' },
        { t: 'A typo in the source', html: '<p>On the online course page, the axiom of the i ≠ j case of isinit ends with ' + c('init(v, j)') + ': read ' + c('isinit(v, j)') + '.</p>' }],
      answer: { html: '<p>Defined: vector. Predefined: integer, boolean, element. Internal operations: ' + c('vect') + ', ' + c('modifynth') + '. Observers: ' + c('nth') + ', ' + c('isinit') + ', ' + c('lowerlimit') + ', ' + c('upperlimit') + '.</p>' +
        '<p>' + c('nth') + ' is partial; ' + c('isinit') + ' is the auxiliary operation: it is used to write the precondition of nth.</p>' +
        '<p>' + c('nth(v, 2) = b') + '; ' + c('isinit(v, 1) = false') + '; ' + c('nth(v, 1)') + ' not defined; ' + c('lowerlimit(v) = 1') + '; ' + c('upperlimit(v) = 3') + '.</p>' },
      traps: [
        c('vect(1, 3)') + ' gives the <b>limits</b> of the vector, not cell values.',
        'A cell that was never filled: ' + c('nth') + ' is not defined. It is not false: it is ' + c('isinit') + ' that is false.',
        c('vect') + ' is not a constant: it has two arguments (integers). It is an internal operation.',
        'The limits never change: ' + c('lowerlimit(modifynth(v, i, e)) = lowerlimit(v)') + '.'],
      note: 'Exercise built on the type of the course: the classification uses the sentences of the online course, the computations are written and checked.'
    },

    /* ---------- Vector (2) ---------- */
    'kb-vecteur-b': {
      src: 'Exercise built on the course',
      title: 'The Vector type: two cases with no axiom',
      intro: '<p>We take the Vector type of the course again (previous exercise). <b>Completeness</b>, according to the course: having written enough axioms to “be able to deduce a value for any application of an observer to an internal operation”.</p>' +
        '<p>The April 2019 midterm (S1# group) looked for two other flaws in this type: see exercise <a href="#p2019d-ex1">p2019d-ex1</a> (its English paper calls modifynth <em>modify</em>).</p>',
      specs: [{ code: VECTOR, cap: 'The Vector type of the course, in the site’s notation.' }],
      questions: [
        '1. Let ' + c('w = modifynth(vect(1, 3), 5, a)') + ': index 5 is outside the limits. Do the axioms give a value to ' + c('isinit(w, 5)') + '? To ' + c('isinit(w, 2)') + '? Suggest a fix.',
        '2. Let ' + c('u = modifynth(vect(1, 3), 2, a)') + '. What is ' + c('isinit(u, 7)') + ' according to the axioms? What value do you expect? Fix the axiom at fault.'],
      hints: [
        'For each term, look for an axiom whose left-hand side has the same form and whose condition (before ⇒) is true.',
        'Writing outside the limits makes no sense. There are two choices, as for add and delete in sets: a precondition, or an operation “with no effect”.',
        'Question 2: look at the axiom of the i ≠ j case of isinit. What condition is there on j? A cell outside the limits is never filled.'],
      solution: [
        { t: 'Question 1: i outside the limits', html: '<p>The two axioms of ' + c('isinit') + ' on ' + c('modifynth(v, i, e)') + ' require ' + c('lowerlimit(v) ≤ i ≤ upperlimit(v)') + '. Here v = vect(1, 3) and i = 5: the condition is false. No axiom gives ' + c('isinit(w, 5)') + ' or ' + c('isinit(w, 2)') + '. Nor ' + c('nth(w, 2)') + ': its precondition goes through isinit. Only the limits are known, because their axioms have no condition.</p>' +
          '<p>Axioms are missing, none contradicts another: this is a lack of <b>completeness</b>.</p>' },
        { t: 'The gap in the course', html: '<p>In the online course and the Moodle appendix, ' + c('modifynth') + ' has no precondition, whereas the axioms of isinit and nth only cover i between the limits.</p>' },
        { t: 'Fix: a precondition on modifynth', html: '<p>Writing to a cell that does not exist makes no sense: we make ' + c('modifynth') + ' partial. A term like w is then no longer defined, there is nothing left to compute. The conditions ' + c('lowerlimit(v) ≤ i ≤ upperlimit(v)') + ' of the axioms become redundant; you can leave them.</p>' +
          '<p>Another choice: declare modifynth “with no effect” outside the limits, as the course does for add and delete in sets. You must then write axioms for this case.</p>',
          spec: L('preconditions', '    modifynth(v, i, e) is-defined-iaoi lowerlimit(v) ≤ i ≤ upperlimit(v)') },
        { t: 'Question 2: j outside the limits', html: '<p>In ' + c('isinit(u, 7)') + ', i = 2 is between the limits, but j = 7 is not. The axiom of the i = j case does not apply (7 ≠ 2). The one of the i ≠ j case also requires ' + c('lowerlimit(v) ≤ j ≤ upperlimit(v)') + ': false. No axiom, whereas we expect false: cell 7 does not exist, it is never filled. The precondition on modifynth changes nothing here.</p>' +
          '<p>Fix: remove the condition on j from this axiom. We then go back up to vect, whose axiom holds for any k: ' + c('isinit(u, 7) = isinit(vect(1, 3), 7) = false') + '. The axiom of nth can keep its condition on j: outside the limits, the precondition of nth already rules the case out.</p>',
          spec: L('axioms', '    lowerlimit(v) ≤ i ≤ upperlimit(v) & i ≠ j', '                ⇒ isinit(modifynth(v, i, e), j) = isinit(v, j)') }],
      answer: { html: '<p>1. No axiom applies: the condition ' + c('lowerlimit(v) ≤ i ≤ upperlimit(v)') + ' is false. Lack of completeness. Fix: a precondition on modifynth.</p>' +
        '<p>2. No axiom either, whereas we expect false. Fix: remove the condition on j in the axiom of the i ≠ j case of isinit.</p>',
        spec: L('preconditions',
          '    nth(v, i) is-defined-iaoi lowerlimit(v) ≤ i ≤ upperlimit(v)',
          '                              & isinit(v, i) = true',
          '    modifynth(v, i, e) is-defined-iaoi lowerlimit(v) ≤ i ≤ upperlimit(v)',
          'axioms',
          '    …',
          '    lowerlimit(v) ≤ i ≤ upperlimit(v) & i ≠ j',
          '                ⇒ isinit(modifynth(v, i, e), j) = isinit(v, j)',
          '    …') },
      traps: [
        'Do not mix up the two flaws: a term with no axiom is a <b>completeness</b> problem; two axioms that give two different values is a <b>consistency</b> problem.',
        'No need for an axiom for ' + c('nth(modifynth(v, i, e), j)') + ' with j outside the limits: the precondition of nth rules this case out.',
        'The limits always have a value: their axioms have no condition.'],
      note: 'Built exercise: the course does not point out these two cases. Solution written and checked.'
    },

    /* ---------- Boxes ---------- */
    'kb-places': {
      src: 'Exercise built on the course',
      title: 'Boxes: move forward with next, read with contents',
      intro: '<p>A <b>box</b> is the cell that contains an element. In the recursive list, you reach it with ' + c('head') + ', move forward with ' + c('next') + ' and read the element with ' + c('contents') + '. Question 3 comes from the Moodle erratum on the video about iterative lists.</p>',
      specs: [
        { code: LREC, cap: 'The recursive list type of the course.' },
        { code: L('preconditions', '    access(λ, k) is-defined-iaoi λ ≠ emptylist & 1 ≤ k ≤ length(λ)', 'axioms', '    contents(access(λ, k)) = nth(λ, k)', '    next(access(λ, k)) = access(λ, k + 1)'),
          cap: 'Iterative list: the precondition of access and the two axioms on boxes.' },
        { code: L('p2 ← access(li, 2)', 'e ← contents(next(p2))'), cap: 'How next is used in the Moodle erratum.' }],
      questions: [
        '1. With ' + c('λ = cons(a, cons(b, cons(c, emptylist)))') + ', compute ' + c('contents(next(next(head(λ))))') + ', citing the axiom used at each step.',
        '2. What is ' + c('next(head(cons(a, emptylist)))') + '?',
        '3. Iterative list. ' + c('li') + ' is the list (lightning, sun, cloud, moon). What is ' + c('e') + ' after the two lines of the erratum? Justify with the axioms.'],
      hints: [
        'The axiom ' + c('next(head(λ)) = head(tail(λ))') + ' turns “move forward one box” into “look at the head of the tail”.',
        'To read a box ' + c('head(…)') + ', read the axiom ' + c('first(λ) = contents(head(λ))') + ' from right to left.',
        'In the iterative list, ' + c('next') + ' moves from rank k to rank k + 1.'],
      solution: [
        { t: 'Question 1: moving forward two boxes', html: ol([
          c('next(head(λ)) = head(tail(λ))') + ' (axiom of next) ' + c('= head(cons(b, cons(c, emptylist)))') + ' (' + c('tail(cons(e, λ)) = λ') + ').',
          c('next(head(cons(b, cons(c, emptylist)))) = head(tail(cons(b, cons(c, emptylist)))) = head(cons(c, emptylist))') + ' (same axioms).',
          c('contents(head(cons(c, emptylist))) = first(cons(c, emptylist))') + ' (' + c('first(λ) = contents(head(λ))') + ', read from right to left) ' + c('= c') + ' (' + c('first(cons(e, λ)) = e') + ').']) +
          '<p>Two boxes after the head: the 3<sup>rd</sup> element, ' + c('c') + '.</p>' },
        { t: 'Question 2: after the last box', html: '<p>' + c('next(head(cons(a, emptylist))) = head(tail(cons(a, emptylist))) = head(emptylist)') + '. But ' + c('head(λ)') + ' is defined only if ' + c('λ ≠ emptylist') + ': the term is <b>not defined</b>. There is no box after the last one.</p>' },
        { t: 'Question 3: next in the iterative list', html: '<p>' + c('e = contents(next(access(li, 2))) = contents(access(li, 3))') + ' (' + c('next(access(λ, k)) = access(λ, k + 1)') + ') ' + c('= nth(li, 3)') + ' (' + c('contents(access(λ, k)) = nth(λ, k)') + ') = cloud.</p>' +
          '<p>The precondition of access holds: li is not empty and 1 ≤ 3 ≤ 4. ' + c('p2') + ' is the box of sun; ' + c('next(p2)') + ', that of cloud.</p>' },
        { t: 'A typo in the erratum', html: '<p>On the erratum image, the line is written ' + c('e ← contents ( next( p2 ))))') + ': the two extra parentheses are a typo, read ' + c('contents(next(p2))') + '.</p>' }],
      answer: { html: '<p>1. ' + c('c') + ': we move forward two boxes from the head. 2. Not defined: we reach ' + c('head(emptylist)') + '. 3. ' + c('e') + ' = cloud, the 3<sup>rd</sup> element of li.</p>' },
      traps: [
        c('contents') + ' applies to a box, ' + c('first') + ' to a list: ' + c('contents(λ)') + ' and ' + c('first(head(λ))') + ' mean nothing.',
        c('next') + ' returns a box, not an element: it is ' + c('contents(next(p2))') + ' that is cloud.',
        'The axiom ' + c('first(λ) = contents(head(λ))') + ' can be used in both directions.'],
      note: 'Question 3: answer given by the Moodle erratum (the 3rd element). Questions 1 and 2 built: solution written and checked.'
    },

    /* ---------- Iterative operations written on the recursive list (1) ---------- */
    'kb-trad-a': {
      src: 'Online course (Krisboul)',
      title: 'Recursive list: length, nth and access',
      intro: '<p>The online course shows that the recursive list and the iterative list describe the same data: “only the way of using it differs”. It gives these correspondences, writes insert with the recursive operations, then adds: “The translation of the other operations is left as exercises.”</p>' +
        table(['Recursive list', 'Iterative list'], [[c('head(l)'), c('access(l, 1)')], [c('first(l)'), c('nth(l, 1)')], [c('tail(l)'), c('delete(l, 1)')], [c('cons(e, l)'), c('insert(l, 1, e)')]]) +
        '<p>We add three operations of the iterative list to the recursive list.</p>',
      specs: [
        { code: LREC, cap: 'The recursive list type of the course.' },
        { code: L('uses', '    element, integer', 'operations', '    length : list → integer', '       nth : list × integer → element', '    access : list × integer → box'),
          cap: 'The three operations to add. The recursive list did not use integer: we add it.' }],
      questions: [
        '1. Which of these operations are partial? Write their preconditions.',
        '2. Write the axioms of ' + c('length') + ', ' + c('nth') + ' and ' + c('access') + ' with the operations of the recursive list (emptylist, cons, head, next…).'],
      hints: [
        'A recursive list is either ' + c('emptylist') + ' or ' + c('cons(e, λ)') + ': write one axiom per form.',
        'For ' + c('nth(cons(e, λ), i)') + ', distinguish i = 1 (it is e) and i ≥ 2: you then look in λ, at rank i − 1.',
        'For ' + c('access') + ', start from the correspondence ' + c('head(l) ⇔ access(l, 1)') + ', then move forward with ' + c('next') + '.'],
      solution: [
        { t: 'Preconditions', html: '<p>' + c('length') + ' makes sense for every list: the empty list has 0 elements. ' + c('nth') + ' and ' + c('access') + ' only make sense for a rank that exists, from 1 to the length. Since ' + c('length(λ) ≥ 1') + ' implies ' + c('λ ≠ emptylist') + ', the condition on the rank is enough; also writing ' + c('λ ≠ emptylist &') + ', as the course does for access, is correct.</p>',
          spec: L('preconditions', '    nth(λ, i) is-defined-iaoi 1 ≤ i ≤ length(λ)', '    access(λ, i) is-defined-iaoi 1 ≤ i ≤ length(λ)') },
        { t: 'length', html: '<p>One axiom per form of list: the empty list has 0 elements, ' + c('cons') + ' adds one.</p>',
          spec: L('axioms', '    length(emptylist) = 0', '    length(cons(e, λ)) = length(λ) + 1') },
        { t: 'nth', html: '<p>' + c('nth(emptylist, i)') + ' is ruled out by the precondition. For ' + c('cons(e, λ)') + ': rank 1 is e; for a rank i ≥ 2, the element is in λ, one rank earlier. The bound ' + c('length(λ) + 1') + ' is the length of ' + c('cons(e, λ)') + '.</p>',
          spec: L('axioms', '    nth(cons(e, λ), 1) = e', '    2 ≤ i ≤ length(λ) + 1 ⇒ nth(cons(e, λ), i) = nth(λ, i − 1)') },
        { t: 'access', html: '<p>Rank 1 is the head. For rank i, start from the box of rank i − 1 and move forward one box: this is the axiom ' + c('next(access(l, k)) = access(l, k + 1)') + ' of the iterative list, read the other way round.</p>',
          spec: L('axioms', '    access(λ, 1) = head(λ)', '    2 ≤ i ≤ length(λ) ⇒ access(λ, i) = next(access(λ, i − 1))') },
        { t: 'Check on an example', html: '<p>With ' + c('λ = cons(a, cons(b, emptylist))') + ': ' + c('nth(λ, 2) = nth(cons(b, emptylist), 1) = b') + '. And ' + c('contents(access(λ, 2)) = contents(next(head(λ))) = contents(head(tail(λ))) = first(cons(b, emptylist)) = b') + ': we get ' + c('contents(access(l, k)) = nth(l, k)') + ' back.</p>' },
        { t: 'Two remarks on the sources', html: '<p>In the iterative list type of the course, ' + c('nth') + ' is partial but has no precondition: yours has one, as it should. On the online course page, the profile of cons is written ' + c('cons : list x element → list') + ' whereas its axioms write ' + c('cons(e, l)') + ': remember ' + c('cons : element × list → list') + ', as in the Moodle and handout 02.</p>' }],
      answer: { html: '<p>' + c('length') + ' is defined everywhere; ' + c('nth') + ' and ' + c('access') + ' are partial.</p>',
        spec: L('uses', '    element, integer', 'operations', '    length : list → integer', '       nth : list × integer → element', '    access : list × integer → box',
          'preconditions', '    nth(λ, i) is-defined-iaoi 1 ≤ i ≤ length(λ)', '    access(λ, i) is-defined-iaoi 1 ≤ i ≤ length(λ)',
          'axioms', '    length(emptylist) = 0', '    length(cons(e, λ)) = length(λ) + 1',
          '    nth(cons(e, λ), 1) = e', '    2 ≤ i ≤ length(λ) + 1 ⇒ nth(cons(e, λ), i) = nth(λ, i − 1)',
          '    access(λ, 1) = head(λ)', '    2 ≤ i ≤ length(λ) ⇒ access(λ, i) = next(access(λ, i − 1))',
          'with', '    list λ', '    integer i', '    element e') },
      traps: [
        'Shifting the ranks: when you go under the ' + c('cons') + ', rank i becomes i − 1.',
        c('access') + ' returns a <b>box</b> (its element is read with contents), ' + c('nth') + ' returns an <b>element</b>.',
        'No axiom for ' + c('nth(emptylist, i)') + ': the precondition rules this case out.',
        'The recursive list does not use ' + c('integer') + ': add it to ' + c('uses') + '.'],
      note: 'Exercise left to the reader by the online course: solution written and checked.'
    },

    /* ---------- Iterative operations written on the recursive list (2) ---------- */
    'kb-trad-b': {
      src: 'Online course (Krisboul)',
      title: 'Recursive list: delete and insert',
      intro: '<p>Follow-up to the previous exercise: we add the two internal operations of the iterative list to the recursive list. You can use ' + c('length') + ', defined in the previous exercise.</p>' +
        '<p>The online course writes insert as an algorithm: it sets aside the first i − 1 elements in a list l2, adds e, then puts them back in front.</p>',
      specs: [
        { code: L('operations', '    delete : list × integer → list', '    insert : list × integer × element → list'),
          cap: c('delete(λ, i)') + ' removes the element of rank i; ' + c('insert(λ, i, e)') + ' places e at rank i.' },
        { code: L('l2 ← emptylist', '(i − 1) times { l2 ← cons(first(l), l2) ; l ← tail(l) }', 'l ← cons(e, l)', '(i − 1) times { l ← cons(first(l2), l) ; l2 ← tail(l2) }'),
          cap: 'The insert algorithm of the online course.' }],
      questions: [
        '1. Write the preconditions of ' + c('delete') + ' and ' + c('insert') + '.',
        '2. Write their axioms with ' + c('emptylist') + ' and ' + c('cons') + ', without loops.',
        '3. Check: compute ' + c('insert(cons(a, cons(b, emptylist)), 3, c)') + ' and ' + c('delete(cons(a, cons(b, emptylist)), 2)') + '.'],
      hints: [
        c('insert') + ' accepts one more rank than ' + c('delete') + ': you can add at the end of the list.',
        'Rank 1: use the correspondences ' + c('tail(l) ⇔ delete(l, 1)') + ' and ' + c('cons(e, l) ⇔ insert(l, 1, e)') + '.',
        'Rank i ≥ 2: the first element does not move. Keep it at the front with ' + c('cons') + ' and work on the rest, at rank i − 1.'],
      solution: [
        { t: 'Preconditions', html: '<p>You can only delete an element that exists: rank from 1 to ' + c('length(λ)') + '. You insert at a rank from 1 to ' + c('length(λ) + 1') + ': the last one adds at the end of the list, and the empty list accepts rank 1.</p>',
          spec: L('preconditions', '    delete(λ, i) is-defined-iaoi 1 ≤ i ≤ length(λ)', '    insert(λ, i, e) is-defined-iaoi 1 ≤ i ≤ length(λ) + 1') },
        { t: 'delete', html: '<p>Rank 1: remove the first element, λ remains. Rank i ≥ 2: the first element stays, and we delete in λ at rank i − 1.</p>',
          spec: L('axioms', '    delete(cons(e, λ), 1) = λ', '    2 ≤ i ≤ length(λ) + 1 ⇒', '                delete(cons(e, λ), i) = cons(e, delete(λ, i − 1))') },
        { t: 'insert', html: '<p>Rank 1: e goes in front, that is ' + c('cons') + '; this axiom also holds for the empty list. Rank i ≥ 2: the list is not empty, its first element e2 stays in place and we insert in the rest at rank i − 1. Here λ is the rest: ' + c('length(λ) + 2') + ' is the length of the whole list, plus 1.</p>',
          spec: L('axioms', '    insert(λ, 1, e) = cons(e, λ)', '    2 ≤ i ≤ length(λ) + 2 ⇒', '                insert(cons(e2, λ), i, e) = cons(e2, insert(λ, i − 1, e))') },
        { t: 'The computations of question 3', html: ol([
          c('insert(cons(a, cons(b, emptylist)), 3, c)') + ' ' + c('= cons(a, insert(cons(b, emptylist), 2, c))') + ' ' + c('= cons(a, cons(b, insert(emptylist, 1, c)))') + ' ' + c('= cons(a, cons(b, cons(c, emptylist)))') + '.',
          c('delete(cons(a, cons(b, emptylist)), 2)') + ' ' + c('= cons(a, delete(cons(b, emptylist), 1))') + ' ' + c('= cons(a, emptylist)') + '.']) },
        { t: 'Link with the algorithm of the course', html: '<p>The algorithm does the same thing in two loops: it sets aside the first i − 1 elements, adds e, then puts them back. The axioms say it without a loop, one element at a time.</p>' }],
      answer: { html: '<p>3. ' + c('cons(a, cons(b, cons(c, emptylist)))') + ' and ' + c('cons(a, emptylist)') + '.</p>',
        spec: L('preconditions', '    delete(λ, i) is-defined-iaoi 1 ≤ i ≤ length(λ)', '    insert(λ, i, e) is-defined-iaoi 1 ≤ i ≤ length(λ) + 1',
          'axioms', '    delete(cons(e, λ), 1) = λ', '    2 ≤ i ≤ length(λ) + 1 ⇒', '                delete(cons(e, λ), i) = cons(e, delete(λ, i − 1))',
          '    insert(λ, 1, e) = cons(e, λ)', '    2 ≤ i ≤ length(λ) + 2 ⇒', '                insert(cons(e2, λ), i, e) = cons(e2, insert(λ, i − 1, e))',
          'with', '    list λ', '    integer i', '    element e, e2') },
      traps: [
        c('insert') + ' accepts i = length(λ) + 1 (adding at the end); ' + c('delete') + ' does not.',
        'In the i ≥ 2 case, keep the first element: ' + c('cons(e, delete(λ, i − 1))') + ', not ' + c('delete(λ, i − 1)') + ' alone.',
        'Order of the arguments: ' + c('cons(element, list)') + ', but ' + c('insert(list, rank, element)') + '.'],
      note: 'Exercise left to the reader by the online course: solution written and checked, including against the insert algorithm of the course.'
    },

    /* ---------- Concatenate, iterative list ---------- */
    'kb-concat': {
      src: 'Online course (Krisboul)',
      title: 'Concatenating two iterative lists',
      intro: '<p>Extension of the list type in the online course: “The concatenation of two lists is the operation that brings them together by putting them end to end. The elements of each one keep their original place within their own list, the second list being attached after the first one.”</p>' +
        '<p>The course asks for the possible preconditions and the axioms “for an iterative list and for a recursive list”. The recursive version came up at the 2018, 2020 and 2023 midterms (exercises <a href="#p2018-ex1">p2018-ex1</a> and <a href="#p2023-ex1b">p2023-ex1b</a>): here, you do the iterative version.</p>',
      specs: [{ code: L('operations', '    concatenate : list × list → list'),
        cap: 'On the iterative list, a list is observed with ' + c('length : list → integer') + ' and ' + c('nth : list × integer → element') + '.' }],
      questions: [
        '1. Is concatenate partial? Give its possible preconditions.',
        '2. Write its axioms for the iterative list: apply the observers ' + c('length') + ' and ' + c('nth') + ' to ' + c('concatenate(λ, λ2)') + '.',
        '3. Check with λ = {a, b} and λ2 = {c}: give the length of the result and its element at each rank.'],
      hints: [
        'Concatenating two lists, even empty ones, always makes sense.',
        'How many elements does the result have? That is the axiom of length.',
        'Split the ranks of the result into two zones: those that come from λ (1 to length(λ)), then those that come from λ2. In the second zone, rank i of the result is rank ' + c('i − length(λ)') + ' of λ2.'],
      solution: [
        { t: 'Preconditions', html: '<p>None: concatenate is defined for all lists, empty ones included.</p>' },
        { t: 'length', html: '<p>The result has the elements of both lists: ' + c('length(concatenate(λ, λ2)) = length(λ) + length(λ2)') + '.</p>' },
        { t: 'nth, zone by zone', html: '<p>Ranks 1 to length(λ): the elements of λ, in their place. Ranks length(λ) + 1 to length(λ) + length(λ2): the elements of λ2, shifted by length(λ). With non-strict bounds (≤), each rank of the result is in exactly one zone.</p>',
          spec: L('axioms', '    1 ≤ i ≤ length(λ) ⇒ nth(concatenate(λ, λ2), i) = nth(λ, i)', '    length(λ) + 1 ≤ i ≤ length(λ) + length(λ2)', '                ⇒ nth(concatenate(λ, λ2), i) = nth(λ2, i − length(λ))') },
        { t: 'Question 3', html: '<p>Length: 2 + 1 = 3. Ranks 1 and 2, first zone: ' + c('nth(λ, 1) = a') + ', ' + c('nth(λ, 2) = b') + '. Rank 3, second zone (3 ≤ 3 ≤ 3): ' + c('nth(λ2, 3 − 2) = c') + '. The result is {a, b, c}.</p>' },
        { t: 'The bounds of the online course', html: '<p>The online course writes these conditions with strict inequalities (' + c('1 < i < length(l)') + ' and ' + c('length(l) + 1 < i < length(l) + length(l2)') + '): ranks 1, length(l), length(l) + 1 and length(l) + length(l2) then have no axiom (in the example, none of the three ranks); you need ≤.</p>' },
        { t: 'And on the recursive list?', html: '<p>No observer to apply: split into cases on the form of the first list. ' + c('concatenate(emptylist, λ2) = λ2') + ' and ' + c('concatenate(cons(e, λ), λ2) = cons(e, concatenate(λ, λ2))') + '. This is the version the 2018, 2020 and 2023 midterms asked for.</p>' }],
      answer: { html: '<p>No precondition. Example: the concatenation of {a, b} and {c} is {a, b, c}.</p>',
        spec: L('operations', '    concatenate : list × list → list', 'preconditions', '    none', 'axioms',
          '    length(concatenate(λ, λ2)) = length(λ) + length(λ2)',
          '    1 ≤ i ≤ length(λ) ⇒ nth(concatenate(λ, λ2), i) = nth(λ, i)',
          '    length(λ) + 1 ≤ i ≤ length(λ) + length(λ2)',
          '                ⇒ nth(concatenate(λ, λ2), i) = nth(λ2, i − length(λ))',
          'with', '    list λ, λ2', '    integer i') },
      traps: [
        'Forgetting the axiom of ' + c('length') + ': without it, you do not know how many ranks the result has.',
        'Forgetting the shift: in the second zone, you read ' + c('nth(λ2, i − length(λ))') + ', not ' + c('nth(λ2, i)') + '.',
        'Strict bounds: with &lt; instead of ≤, the ranks at the edges of each zone no longer have an axiom.',
        'Inventing a precondition (' + c('λ ≠ emptylist') + '): there is none.'],
      note: 'The online course gives a solution, but with strict bounds: solution written from it, bounds corrected and checked.'
    },

    /* ---------- Search, iterative list ---------- */
    'kb-recherche': {
      src: 'Online course (Krisboul)',
      title: 'Searching in an iterative list',
      intro: '<p>Extension of the list type in the online course: “Searching consists in finding an element in a list and returning its box if it exists in the list. […] the problem is that the search is not defined for an element that is not present. So we need a precondition on the search, which we will describe with an auxiliary operation exists.”</p>' +
        '<p>The recursive version, with ' + c('ispresent') + ', came up at the 2018 and 2020 midterms: see exercise <a href="#p2018-ex1">p2018-ex1</a>. Here, we work on the iterative list. For it, the course gives:</p>',
      specs: [{ code: L('operations', '    search : element × list → box', '    exists : element × list → boolean',
        'preconditions', '    search(e, λ) is-defined-iaoi exists(e, λ) = true',
        'axioms', '    exists(e, emptylist) = false', '    e = e2 ⇒ exists(e2, insert(λ, i, e)) = true', '    e ≠ e2 ⇒ exists(e2, insert(λ, i, e)) = exists(e2, λ)', '    exists(e, λ) = true ⇒ contents(search(e, λ)) = e',
        'with', '    list λ', '    integer i', '    element e, e2'),
        cap: 'The axioms of the online course for the iterative list, in the site’s notation.' }],
      questions: [
        '1. Why is ' + c('search') + ' partial, and not ' + c('exists') + '? What does the course call an operation like exists?',
        '2. Compute ' + c('exists(a, delete(insert(emptylist, 1, a), 1))') + ' with these axioms. What do you notice?',
        '3. Suggest axioms that give a value to exists for every iterative list, using only the observers ' + c('length') + ' and ' + c('nth') + '.'],
      hints: [
        'A box only exists if the element is in the list. A true or false answer always exists.',
        'An iterative list is built with emptylist, insert and delete. For each of these operations, look for an axiom of exists.',
        'Question 3: go through the list rank by rank, like a loop. Add an operation ' + c('existsfrom(e, λ, i)') + ' that says whether e appears between rank i and the end.'],
      solution: [
        { t: 'Partial and auxiliary', html: '<p>' + c('search') + ' returns a box: if e is not in λ, there is no box to return. It is partial, and its precondition requires ' + c('exists(e, λ) = true') + '. ' + c('exists') + ' answers true or false for every list: it is defined everywhere. exists is used to specify the domain of definition of search: it is an <b>auxiliary operation</b>.</p>' },
        { t: 'Question 2: the case of delete', html: '<p>In the online course, the axioms of exists for the iterative list only handle emptylist and insert, nothing for delete. So the term ' + c('exists(a, delete(…))') + ' has no axiom, whereas we expect false: the list is empty. This is a lack of <b>completeness</b>.</p>' +
          '<p>A simple axiom on delete is not enough: if the removed element is e2, e2 may still be elsewhere in the list.</p>' },
        { t: 'Question 3: a complete version', html: '<p>In an iterative list, elements are read by their rank. So we describe exists with length and nth, thanks to one more operation, ' + c('existsfrom(e, λ, i)') + ': is e in λ between rank i and the end? After the last rank, the answer is false. At rank i, either we find e (true), or we carry on at rank i + 1.</p>',
          spec: L('operations', '    existsfrom : element × list × integer → boolean',
            'preconditions', '    existsfrom(e, λ, i) is-defined-iaoi i ≥ 1',
            'axioms', '    exists(e, λ) = existsfrom(e, λ, 1)',
            '    i > length(λ) ⇒ existsfrom(e, λ, i) = false',
            '    1 ≤ i ≤ length(λ) & nth(λ, i) = e ⇒ existsfrom(e, λ, i) = true',
            '    1 ≤ i ≤ length(λ) & nth(λ, i) ≠ e',
            '                ⇒ existsfrom(e, λ, i) = existsfrom(e, λ, i + 1)') },
        { t: 'Why it works', html: '<p>These axioms hold for every list, built with insert or with delete: length and nth have axioms for both. Those of the course for emptylist and insert remain true; you can keep them. existsfrom is not an auxiliary operation in the sense of the course: it is not used to write a precondition, but the axioms of exists.</p>' },
        { t: 'Back to question 2', html: '<p>With λ = ' + c('delete(insert(emptylist, 1, a), 1)') + ': ' + c('length(λ) = (0 + 1) − 1 = 0') + '. Then ' + c('exists(a, λ) = existsfrom(a, λ, 1)') + ', and 1 > 0 gives ' + c('false') + '.</p>' },
        { t: 'What the axiom of search says', html: '<p>' + c('contents(search(e, λ)) = e') + ' only fixes the contents of the returned box. If e appears several times, any of its boxes will do.</p>' }],
      answer: { html: '<p>1. search returns a box, which only exists if e is in λ: it is partial. exists is defined everywhere; it is used to write the precondition of search: it is an auxiliary operation.</p>' +
        '<p>2. No axiom applies (nothing for delete): lack of completeness. The expected value is false.</p><p>3. For example:</p>',
        spec: L('operations', '        search : element × list → box', '        exists : element × list → boolean', '    existsfrom : element × list × integer → boolean',
          'preconditions', '    search(e, λ) is-defined-iaoi exists(e, λ) = true', '    existsfrom(e, λ, i) is-defined-iaoi i ≥ 1',
          'axioms', '    exists(e, λ) = existsfrom(e, λ, 1)',
          '    i > length(λ) ⇒ existsfrom(e, λ, i) = false',
          '    1 ≤ i ≤ length(λ) & nth(λ, i) = e ⇒ existsfrom(e, λ, i) = true',
          '    1 ≤ i ≤ length(λ) & nth(λ, i) ≠ e',
          '                ⇒ existsfrom(e, λ, i) = existsfrom(e, λ, i + 1)',
          '    exists(e, λ) = true ⇒ contents(search(e, λ)) = e',
          'with', '    list λ', '    integer i', '    element e') },
      traps: [
        c('search') + ' is partial (precondition), ' + c('exists') + ' is defined everywhere.',
        'Profiles: element first, list second: ' + c('exists(e, λ)') + ', not ' + c('exists(λ, e)') + '.',
        'In the ' + c('e = e2') + ' case, stop on true: no recursive call.',
        'The iterative list has three internal list operations (emptylist, insert, delete): an axiom per case must not leave any of them out.'],
      note: 'The online course gives the axioms for emptylist and insert, nothing for delete: solution completed and checked.'
    },

    /* ---------- Stack ---------- */
    'kb-pile': {
      src: 'Exercise built on the course',
      title: 'Stack: compute, then add height and bottom',
      intro: '<p>The stack type of the course: the same in the online course, the Moodle and handout 03.</p>',
      specs: [{ code: STACK, cap: 'The stack type of the course.' }],
      questions: [
        '1. Compute ' + c('top(pop(push(push(emptystack, a), b)))') + ' and ' + c('isempty(pop(push(emptystack, a)))') + '.',
        '2. We add ' + c('height : stack → integer') + ' (the number of elements) and ' + c('bottom : stack → element') + ' (the element at the bottom, the first one pushed). Give their preconditions and their axioms.'],
      hints: [
        'First reduce the innermost part that has the form of an axiom: ' + c('pop(push(s, e)) = s') + '.',
        'Apply each new observer to the two ways of building a stack: ' + c('emptystack') + ' and ' + c('push(s, e)') + '.',
        'For bottom, you need a case: was the stack s empty before pushing e?'],
      solution: [
        { t: 'Question 1', html: ol([
          c('pop(push(push(emptystack, a), b)) = push(emptystack, a)') + ' (' + c('pop(push(s, e)) = s') + '), then ' + c('top(push(emptystack, a)) = a') + '.',
          c('isempty(pop(push(emptystack, a))) = isempty(emptystack) = true') + '.']) },
        { t: 'Preconditions', html: '<p>height makes sense for every stack: 0 for the empty stack. bottom makes no sense on the empty stack.</p>',
          spec: L('preconditions', '    bottom(s) is-defined-iaoi isempty(s) = false') },
        { t: 'height', html: '<p>One axiom per form of stack: the empty stack has 0 elements, push adds one.</p>',
          spec: L('axioms', '    height(emptystack) = 0', '    height(push(s, e)) = height(s) + 1') },
        { t: 'bottom', html: '<p>' + c('bottom(emptystack)') + ' is ruled out by the precondition. On ' + c('push(s, e)') + ': if s was empty, e is alone, so at the bottom; otherwise the bottom does not change.</p>',
          spec: L('axioms', '    isempty(s) = true ⇒ bottom(push(s, e)) = e', '    isempty(s) = false ⇒ bottom(push(s, e)) = bottom(s)') },
        { t: 'What about pop?', html: '<p>No axiom for ' + c('height(pop(s))') + ' or for ' + c('bottom(pop(s))') + '. pop has only one argument, of a defined type: replace s with ' + c('push(s, e)') + ', and ' + c('pop(push(s, e)) = s') + ' brings the computation back to the cases already handled. The course does the same: it writes no axiom for ' + c('top(pop(s))') + '.</p>' }],
      answer: { html: '<p>1. ' + c('a') + ' and ' + c('true') + '.</p><p>2. We add ' + c('integer') + ' to the types used:</p>',
        spec: L('uses', '    boolean, element, integer', 'operations', '    height : stack → integer', '    bottom : stack → element',
          'preconditions', '    bottom(s) is-defined-iaoi isempty(s) = false',
          'axioms', '    height(emptystack) = 0', '    height(push(s, e)) = height(s) + 1',
          '    isempty(s) = true ⇒ bottom(push(s, e)) = e', '    isempty(s) = false ⇒ bottom(push(s, e)) = bottom(s)',
          'with', '    stack s', '    element e') },
      traps: [
        'bottom behaves like ' + c('first') + ' in a queue: it needs the case ' + c('isempty(s) = true') + ' or ' + c('false') + '. top, on the other hand, has no case.',
        'An axiom ' + c('height(pop(s)) = height(s) − 1') + ' is useless; written for any stack s, it would also target the empty stack, where pop is not defined.',
        'Add ' + c('integer') + ' to ' + c('uses') + ': the stack type of the course does not use it.'],
      note: 'Exercise built on the stack type of the course: solution written and checked.'
    },

    /* ---------- Queue ---------- */
    'kb-file': {
      src: 'Exercise built on the course',
      title: 'Queue: compute, then add length and last',
      intro: '<p>The queue type of the course: the same in the online course, the Moodle and handout 04.</p>',
      specs: [{ code: QUEUE, cap: 'The queue type of the course.' }],
      questions: [
        '1. With ' + c('q3 = enqueue(enqueue(enqueue(emptyqueue, a), b), c)') + ', compute ' + c('first(dequeue(q3))') + ' and ' + c('dequeue(dequeue(q3))') + '.',
        '2. We add ' + c('length : queue → integer') + ' and ' + c('last : queue → element') + ' (the last one in). Give their preconditions and their axioms.'],
      hints: [
        'For ' + c('dequeue(enqueue(q, e))') + ', the axiom depends on q: if q is empty, you get emptyqueue; otherwise ' + c('enqueue(dequeue(q), e)') + '. Go down this way to the first element that came in.',
        'In the term, the first one in is the most deeply buried; the last one in is the outermost.',
        'Compare last with first: one of them needs a case on ' + c('isempty(q)') + ', the other does not.'],
      solution: [
        { t: 'first(dequeue(q3))', html: '<p>Let ' + c('q2 = enqueue(enqueue(emptyqueue, a), b)') + ': q2 is not empty.</p>' + ol([
          c('dequeue(enqueue(q2, c)) = enqueue(dequeue(q2), c)') + ' (' + c('isempty(q2) = false') + ').',
          c('dequeue(q2) = enqueue(dequeue(enqueue(emptyqueue, a)), b)') + ' (' + c('isempty(enqueue(emptyqueue, a)) = false') + ').',
          c('dequeue(enqueue(emptyqueue, a)) = emptyqueue') + ' (' + c('isempty(emptyqueue) = true') + ').',
          'So ' + c('dequeue(q3) = enqueue(enqueue(emptyqueue, b), c)') + '.',
          c('first(enqueue(enqueue(emptyqueue, b), c)) = first(enqueue(emptyqueue, b))') + ' (the inner queue is not empty) ' + c('= b') + ' (' + c('isempty(emptyqueue) = true') + ').']) },
        { t: 'dequeue(dequeue(q3))', html: '<p>' + c('dequeue(enqueue(enqueue(emptyqueue, b), c)) = enqueue(dequeue(enqueue(emptyqueue, b)), c) = enqueue(emptyqueue, c)') + '. Only c remains, the last one in.</p>' },
        { t: 'Preconditions', html: '<p>length is defined everywhere; last makes no sense on the empty queue.</p>',
          spec: L('preconditions', '    last(q) is-defined-iaoi isempty(q) = false') },
        { t: 'length and last', html: '<p>Apply each observer to ' + c('emptyqueue') + ' and to ' + c('enqueue(q, e)') + '. The last one in is e, whatever q: no case, unlike first.</p>',
          spec: L('axioms', '    length(emptyqueue) = 0', '    length(enqueue(q, e)) = length(q) + 1', '    last(enqueue(q, e)) = e') },
        { t: 'What about dequeue?', html: '<p>As for the stack, no axiom on ' + c('dequeue(q)') + ': the axioms of the queue rewrite ' + c('dequeue(enqueue(q, e))') + ' into emptyqueue or into ' + c('enqueue(dequeue(q), e)') + ', then length or last is applied.</p>' },
        { t: 'A typo in the source', html: '<p>On the online course page, the title above the queue says “The abstract type of a stack is the following” (and handout 04 writes ' + c('sorte Pile') + ', that is sort Stack): it is indeed the queue type.</p>' }],
      answer: { html: '<p>1. ' + c('first(dequeue(q3)) = b') + '; ' + c('dequeue(dequeue(q3)) = enqueue(emptyqueue, c)') + '.</p><p>2. We add ' + c('integer') + ' to the types used:</p>',
        spec: L('uses', '    boolean, element, integer', 'operations', '    length : queue → integer', '      last : queue → element',
          'preconditions', '    last(q) is-defined-iaoi isempty(q) = false',
          'axioms', '    length(emptyqueue) = 0', '    length(enqueue(q, e)) = length(q) + 1', '    last(enqueue(q, e)) = e',
          'with', '    queue q', '    element e') },
      traps: [
        'first is the oldest one (it needs the case ' + c('isempty(q)') + '), last the most recent one (no case).',
        c('dequeue(enqueue(q, e))') + ' is not q in general: it is ' + c('enqueue(dequeue(q), e)') + ' if q is not empty.',
        'FIFO queue: first in, first out. After two dequeues, the third one in remains.'],
      note: 'Exercise built on the queue type of the course: solution written and checked.'
    },

    /* ---------- Sets: union, intersection, inclusion ---------- */
    'kb-ens-a': {
      src: 'Exercise built on the course',
      title: 'Sets: union, intersection, inclusion',
      intro: '<p>The online course ends the set type with this remark: “It would be just as possible to add the classic operations on sets, such as union, intersection, complement and subset.” We do it here for union, intersection and inclusion. Reminder: adding an element that is already present, or deleting an absent element, has no effect.</p>',
      specs: [
        { code: SET, cap: 'The set type of the course. In these axioms, s denotes a set; x and y, elements.' },
        { code: L('operations', '       _ ∪ _ : set × set → set', '       _ ∩ _ : set × set → set', '    included : set × set → boolean'),
          cap: c('included(s1, s2)') + ' is true if every element of s1 is in s2.' }],
      questions: [
        '1. Write the axioms that give ' + c('x ∈ (s1 ∪ s2)') + ' and ' + c('x ∈ (s1 ∩ s2)') + '.',
        '2. Write the axioms of ' + c('included') + ', by cases on the way the first set is built: emptyset, add, delete.',
        '3. Do your axioms let you compute ' + c('card(s1 ∪ s2)') + '? What would be needed?'],
      hints: [
        'Method of the course: apply the observer ∈ to the new internal operations ∪ and ∩. Split into cases on ' + c('x ∈ s1') + '.',
        'emptyset is included in every set. ' + c('add(x, s1)') + ' is included in s2 if x is in s2 and if s1 is included in s2.',
        'For ' + c('delete(x, s1)') + ': s1 without x is included in s2 exactly when s1 is included in s2 with x added.'],
      solution: [
        { t: 'Union and intersection', html: '<p>Apply ∈ to ' + c('s1 ∪ s2') + ' and to ' + c('s1 ∩ s2') + ', by cases on ' + c('x ∈ s1') + '. Union: if x is in s1, it is in the union; otherwise, it all depends on s2. Intersection: if x is not in s1, it is not in the intersection; otherwise, it all depends on s2.</p>',
          spec: L('axioms', '    x ∈ s1 = true ⇒ (x ∈ (s1 ∪ s2)) = true', '    x ∈ s1 = false ⇒ (x ∈ (s1 ∪ s2)) = (x ∈ s2)', '    x ∈ s1 = false ⇒ (x ∈ (s1 ∩ s2)) = false', '    x ∈ s1 = true ⇒ (x ∈ (s1 ∩ s2)) = (x ∈ s2)') },
        { t: 'Short variant', html: '<p>With the operations of the boolean type, which is used: ' + c('(x ∈ (s1 ∪ s2)) = (x ∈ s1) or (x ∈ s2)') + ' and ' + c('(x ∈ (s1 ∩ s2)) = (x ∈ s1) and (x ∈ s2)') + '.</p>' },
        { t: 'included', html: '<p>included is an observer (boolean result), defined by cases on the first set. The delete case comes down to a smaller set on the left: s1 without x is included in s2 if and only if s1 is included in ' + c('add(x, s2)') + '.</p>',
          spec: L('axioms', '    included(emptyset, s2) = true', '    included(add(x, s1), s2) = (x ∈ s2) and included(s1, s2)', '    included(delete(x, s1), s2) = included(s1, add(x, s2))') },
        { t: 'Question 3: what about card?', html: '<p>No. The axioms of card only deal with emptyset, add and delete: nothing for ' + c('card(s1 ∪ s2)') + ', nor for ' + c('included(s1 ∪ s2, s3)') + '. For a complete type, you must apply <b>each</b> observer (∈, card, included) to each new internal operation.</p>' +
          '<p>The simplest way: define ∪ and ∩ by cases on the first set, like concatenate on the recursive list. Every term then comes down to emptyset, add and delete, and the values of ∈, card and included follow.</p>',
          spec: L('axioms', '    emptyset ∪ s2 = s2', '    add(x, s1) ∪ s2 = add(x, s1 ∪ s2)',
            '    x ∈ s2 = true ⇒ delete(x, s1) ∪ s2 = s1 ∪ s2', '    x ∈ s2 = false ⇒ delete(x, s1) ∪ s2 = delete(x, s1 ∪ s2)',
            '    emptyset ∩ s2 = emptyset',
            '    x ∈ s2 = true ⇒ add(x, s1) ∩ s2 = add(x, s1 ∩ s2)', '    x ∈ s2 = false ⇒ add(x, s1) ∩ s2 = s1 ∩ s2',
            '    delete(x, s1) ∩ s2 = delete(x, s1 ∩ s2)') },
        { t: 'What about the complement?', html: '<p>The complement assumes a reference set (all possible elements), which is not in the type: we leave it aside.</p>' }],
      answer: { html: '<p>Questions 1 and 2 below. Question 3: no, you must also apply card (and included) to ∪ and ∩; the simplest way is to define ∪ and ∩ by cases on the first set (step “Question 3”).</p>',
        spec: L('operations', '       _ ∪ _ : set × set → set', '       _ ∩ _ : set × set → set', '    included : set × set → boolean',
          'axioms', '    x ∈ s1 = true ⇒ (x ∈ (s1 ∪ s2)) = true', '    x ∈ s1 = false ⇒ (x ∈ (s1 ∪ s2)) = (x ∈ s2)', '    x ∈ s1 = false ⇒ (x ∈ (s1 ∩ s2)) = false', '    x ∈ s1 = true ⇒ (x ∈ (s1 ∩ s2)) = (x ∈ s2)',
          '    included(emptyset, s2) = true', '    included(add(x, s1), s2) = (x ∈ s2) and included(s1, s2)', '    included(delete(x, s1), s2) = included(s1, add(x, s2))',
          'with', '    set s1, s2', '    element x') },
      traps: [
        'In the axioms of the course, ' + c('s') + ' denotes a <b>set</b> (the French course writes ' + c('e') + '); x and y are elements.',
        'Union and intersection have no precondition: they make sense for all sets, empty ones included.',
        'Do not forget the delete case of included: delete is an internal operation of the type.',
        'Applying ∈ is not always enough: card is an observer too.'],
      note: 'Exercise built on a remark of the online course: solution written and checked.'
    },

    /* ---------- Multisets ---------- */
    'kb-ens-b': {
      src: 'Exercise built on the course',
      title: 'Multisets: one axiom is missing',
      intro: '<p>In a multiset, an element can appear several times. add always increases the cardinality; delete removes only one occurrence. Here is the type of the online course, identical to handout 05.</p>',
      specs: [{ code: MULTI, cap: 'The multiset type of the course, in the site’s notation.' }],
      questions: [
        '1. Let ' + c('m = add(a, add(a, emptymultiset))') + '. Compute ' + c('nboccurrences(a, m)') + ', then ' + c('a ∈ delete(a, m)') + ' with these axioms. What do you notice?',
        '2. Which axiom must be added?',
        '3. Why is the computation of ' + c('card(delete(a, delete(a, m)))') + ' blocked too?'],
      hints: [
        'For each term, list the axioms whose left-hand side has the same form, then look at their condition.',
        'For ' + c('x ∈ delete(x, ms)') + ', the course handles the case ' + c('nboccurrences(x, ms) ≤ 1') + '. What if there are at least two occurrences?',
        c('card(delete(x, ms))') + ' goes through ' + c('x ∈ ms') + '.'],
      solution: [
        { t: 'nboccurrences(a, m)', html: '<p>' + c('nboccurrences(a, add(a, add(a, emptymultiset)))') + ' ' + c('= nboccurrences(a, add(a, emptymultiset)) + 1') + ' ' + c('= nboccurrences(a, emptymultiset) + 1 + 1 = 2') + ' (axioms of the x = y case, then of emptymultiset).</p>' },
        { t: 'a ∈ delete(a, m)', html: '<p>Two axioms of ∈ deal with delete. ' + c('nboccurrences(x, ms) ≤ 1 ⇒ …') + ': here nboccurrences(a, m) = 2. ' + c('x ≠ y ⇒ …') + ': here x = y = a. Neither applies. Yet we expect true: one occurrence of a remains. This is a lack of <b>completeness</b>.</p>' },
        { t: 'The missing axiom', html: '<p>The online course and handout 05 have no axiom for ' + c('x ∈ delete(x, ms)') + ' when x appears at least twice in ms; you must add:</p>',
          spec: L('axioms', '    nboccurrences(x, ms) ≥ 2 ⇒ (x ∈ delete(x, ms)) = true') },
        { t: 'card is blocked too', html: '<p>The two axioms of card on delete need the value of ' + c('x ∈ ms') + '. For ' + c('card(delete(a, delete(a, m)))') + ', it is ' + c('a ∈ delete(a, m)') + ': without a value, card is blocked.</p>' +
          '<p>With the added axiom, ' + c('a ∈ delete(a, m) = true') + ', so ' + c('card(delete(a, delete(a, m))) = card(delete(a, m)) − 1 = (card(m) − 1) − 1 = 0') + '.</p>' },
        { t: 'Comparing with the set', html: '<p>In a set, delete removes the element for good: ' + c('x = y ⇒ (x ∈ delete(y, s)) = false') + ', with no condition. In a multiset, occurrences must be counted: that is the role of nboccurrences.</p>' }],
      answer: { html: '<p>1. ' + c('nboccurrences(a, m) = 2') + '; no axiom gives ' + c('a ∈ delete(a, m)') + ', which should be true. 2. The axiom below. 3. ' + c('card(delete(x, ms))') + ' goes through ' + c('x ∈ ms') + ', here ' + c('a ∈ delete(a, m)') + ', which has no value. With the added axiom, card is 0.</p>',
        spec: L('axioms', '    nboccurrences(x, ms) ≥ 2 ⇒ (x ∈ delete(x, ms)) = true') },
      traps: [
        'Set: adding an element that is already present changes nothing. Multiset: card always increases by 1.',
        'card counts all occurrences, nboccurrences those of a single element.',
        'A missing axiom is a completeness problem, not a consistency problem.'],
      note: 'Built exercise: the gap comes from the axioms of the course (online page and handout 05). Solution checked.'
    }
  });
})();
