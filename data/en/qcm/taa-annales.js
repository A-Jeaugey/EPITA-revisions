/* English text for data/qcm/taa-annales.js (course questions of the algo midterms, TAA part).
   2019: wording and answers of the official English subject and answer key (“A little coursework…”);
   2021 to 2023: translated from the French papers. Copies of a question asked again (taa-p2021-q3, -q5,
   taa-p2022-q2) carry the same text as the original. */
/* topic names (already given by data/en/qcm/taa.js; repeated in case this file is loaded alone) */
REV.i18n.topics({ 'taa-signature': 'Signature and vocabulary', 'taa-hierarchie': 'Types and operations: the hierarchy', 'taa-precond': 'Preconditions',
  'taa-axiomes': 'Axioms', 'taa-liste-rec': 'Recursive lists', 'taa-liste-iter': 'Iterative lists' });
(function () {
  var AREAS = ['<code>types</code>', '<code>uses</code>', '<code>operations</code>', '<code>preconditions</code>', '<code>axioms</code>', '<code>with</code>'];
  var AXIOMS_PB = { q: 'What problems arise during the making of the set of axioms?',
    o: ['completeness', 'consistency', 'recursion', 'commutativity'],
    x: 'Answer keys of 2019 and 2021: “The problems that arise during the making of the set of axioms are the completeness and the consistency.” Completeness: having written enough axioms. Consistency: no contradictory axioms. The word of the course is consistency, not coherence.' };
  var AXIOMS_HOW = { q: 'How do we write axioms?',
    o: ['by application of observers to internal operations', 'by application of internal operations to observers', 'by copying the preconditions', 'by giving an example value for each operation'],
    x: 'Answer keys of 2019 and 2021: “We write axioms by application of observers to internal operations.” Example: <code>top(push(s, e)) = e</code>, with the observer <code>top</code> outside and the internal operation <code>push</code> inside.' };
  var PARTIAL = { q: 'What do you call an operation that is not defined everywhere?',
    o: ['an auxiliary operation', 'a partial operation', 'an observer', 'a constant'],
    x: 'Answer keys of 2021 and 2022: “An operation that is not defined everywhere is a partial operation.” Its domain of definition is written in the preconditions. The auxiliary operation is the one used to write this domain (2019 question).' };

  REV.i18n.qcm({
    /* ---------- questions of their own ---------- */
    'taa-p2019-q4': { q: 'Which areas make up the signature of an abstract type?',
      o: AREAS,
      x: 'Answer keys of 2019 and 2022: “the TYPES, USES and OPERATIONS areas”. The signature gives the types, defined and predefined, and the profile of each operation. The preconditions and the axioms give the properties of the operations, and <code>with</code> the type of the variables: these three areas are not part of it (that was the 2021 question). The trap: forgetting <code>uses</code>.' },
    'taa-p2021-q1': { q: 'What does an observer return?',
      o: ['a defined type', 'a predefined type', 'always a boolean', 'nothing: it reads the data without returning anything'],
      x: 'Answer keys of 2021 and 2022: “An observer returns a predefined type.” (In 2022: “What type of data does an observer return?”.) It takes at least one argument of a defined type and returns a type already designed, listed in <code>uses</code>: <code>length : list → integer</code>, <code>top : stack → element</code>. A defined type is what an internal operation returns. Boolean is only one case: <code>isempty</code> returns one, <code>length</code> returns an integer.' },
    'taa-p2022-q5': { q: 'Which of these operations define a recursive list (without boxes)?',
      o: ['<code>cons</code>', '<code>head</code>', '<code>tail</code>', '<code>nth</code>', '<code>first</code>', '<code>emptylist</code>'],
      x: 'Rephrased question: the paper asked “Give three operations that define a recursive list (without boxes).” 2022 answer key: “emptylist, cons, tail, first” (it lists four; three were enough). <code>head</code> returns a box: “without boxes” rules it out. <code>nth</code> belongs to the iterative list.' },
    'taa-p2023-q2': { q: 'Which of these operations define an iterative list (without boxes)?',
      o: ['<code>length</code>', '<code>access</code>', '<code>nth</code>', '<code>cons</code>', '<code>delete</code>', '<code>contents</code>'],
      x: 'Rephrased question: the paper asked “Give two operations that define an iterative list (without boxes).” No official answer key; on the marked paper, “length and delete” got 2 points out of 2. <code>length</code> and <code>nth</code> are enough to describe an iterative list; <code>insert</code>, <code>delete</code> and <code>emptylist</code> also work. <code>access</code> and <code>contents</code> use boxes, and <code>cons</code> belongs to the recursive list.' },

    /* ---------- questions the course already asks (same) ---------- */
    'taa-p2019-q1': { q: 'What does an internal operation return?',
      o: ['a predefined type', 'a defined type', 'a boolean', 'nothing: it changes the data'],
      x: '2019 answer key: “An internal operation returns a defined type.” It is the type being defined, listed in <code>types</code>: <code>cons : element × list → list</code>. A predefined type is what an observer returns.' },
    'taa-p2019-q2': { q: 'How do we call an operation used to specify the domain of definition of another one?',
      o: ['a precondition', 'a partial operation', 'an auxiliary operation', 'an internal operation'],
      x: '2019 answer key: “An operation used to specify the domain of definition of another one is an auxiliary operation.” Example: <code>ispresent</code> is used to write the precondition of <code>search</code>, search(e, λ) is-defined-iaoi ispresent(e, λ) = true. The precondition is this line, not an operation. The partial operation is <code>search</code>, the one whose domain is described.' },
    'taa-p2019-q3': AXIOMS_PB,
    'taa-p2019-q5': AXIOMS_HOW,
    'taa-p2021-q2': PARTIAL,
    'taa-p2021-q3': AXIOMS_PB,
    'taa-p2021-q4': { q: 'In an algebraic abstract type, which areas do not make up the signature of an abstract type?',
      o: AREAS,
      x: '2021 answer key: “The areas that do not make up the signature of an abstract type are the PRECONDITIONS, AXIOMS and WITH areas.” It is the reverse of the 2019 and 2022 question.' },
    'taa-p2021-q5': AXIOMS_HOW,
    'taa-p2022-q2': PARTIAL,
    'taa-p2022-q3': { q: 'What are the two ways of defining a list?',
      o: ['linked and contiguous', 'recursive and iterative', 'with or without boxes', 'as a stack and as a queue'],
      x: '2022 answer key: “The two ways of defining a list are the recursive one and the iterative one.” It is the same data; only the way you use it changes. Linked and contiguous refer to the representation in memory, not to the abstract type.' },
    'taa-p2023-q1': { q: 'The definition of an operation is made of?',
      o: ['its name and its axioms', 'a name and a profile', 'its profile and its precondition', 'its name only'],
      x: 'No official answer key; on the marked paper, the grader added “Made of a name and a profile”. The profile gives the types of the arguments and the type of the result, for example <code>length : list → integer</code>.' },
    'taa-p2023-q3': { q: 'What type of data does a constant return?',
      o: ['a predefined type', 'a defined type', 'a boolean', 'none: a constant has no result'],
      x: 'A constant is an operation with no argument: <code>emptylist : → list</code>, <code>emptystack : → stack</code>, <code>true : → boolean</code> in the boolean type. It returns the type being defined: it is an internal operation, never an observer. No official answer key; on the marked paper, the answer “predefined” got 0.' },
    'taa-p2023-q4': { q: 'What are the specifications of the profile of an observer?',
      o: ['a result of a defined type', 'at least one argument of a defined type and a result of a predefined type', 'a result of a predefined type, whatever its arguments', 'no argument'],
      x: 'No official answer key; on the marked paper, “It returns a predefined type” got partial credit, and the grader added “and takes an argument of a defined type”. Both conditions are needed: at least one argument of a defined type, a result of a predefined type.' }
  });
})();
