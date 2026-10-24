/* English text for data/archi/ex-td.js (merged by id over the French file).
   Statements: the official English sheets Tutorial_01.pdf (“Number Bases”) and Tutorial_02.pdf (“Encoded
   Integers”), word for word, with the minus sign “−”. Vocabulary of Chapter_1.pdf and the tutorials: successive
   division / multiplication method, remainder, weight, sum of products, groups of 4 digits, carry (“0 carry 1”),
   borrow 1, multiplicand, multiplier, partial products, dividend, divisor, “record a binary point in the quotient”,
   “bring down an extra 0 to the remainder”, word, byte, most significant bit (MSB), sign bit, one’s / two’s
   complement, unsigned / signed overflow, patterns, ERROR.
   Numbers: decimal point in every base (1 0001.0110 1₂, 25.CC₁₆) and a comma between thousands in decimal (3,129;
   1,048,576), as in Chapter_1.pdf and Tutorial_01.pdf. The numbers, tables and tools come from window.ARCHI_TD (French
   file): num() and the table builders already write them the English way on an English page; this file only gives
   the words. */
(function () {
  'use strict';
  var T = window.ARCHI_TD, R = window.REV;
  if (!T || !R || !R.i18n) return;
  var D = T.DATA, OPS = D.OPS, B = T.B, H = T.H, W = T.W, pw = T.pw, tool = T.tool, calc = T.calc, tbl = T.tbl, dtext = T.dtext, sgn = T.sgn;
  var MINUS = '−', n = '<var>n</var>';
  var NOTE = 'Solution written and recomputed by a program (exact fractions); it matches the official tutorial answer key published on Moodle.';
  var L = {
    power: 'Power', value: 'Value', word: 'Word', binary: 'Binary', sign: 'Sign',
    conv: {
      head: ['Number to Convert', 'Source Form', 'Destination Form', 'Result'],
      forms: { 2: 'Binary', 10: 'Decimal', 16: 'Hexadecimal' },
      digits: function (d) { return '(' + d + ' digits after the point)'; },
      ans: ['Number to Convert', 'Result'],
      res: 'Result:',
      base: function (b) { return { 2: 'binary', 10: 'decimal', 16: 'hexadecimal' }[b]; }
    },
    digitsQ: function (d) { return '(' + d + ' digits after the point)'; },
    opsHead: ['Operation', 'Result', 'Decimal check'], rem: 'remainder',
    bits: 'Bits', uns: 'Unsigned', sig: 'Signed',
    op1: '1<sup>st</sup> operand', op2: '2<sup>nd</sup> operand', result: 'Result', ov: 'Signed Overflow', example: '8-bit example',
    P: 'Positive', N: 'Negative', yes: 'Yes', no: 'No', reads: function (v) { return 'the word reads ' + v; },
    operation: 'Operation', binres: 'Binary Result', decval: 'Decimal Value', u: 'Unsigned', s: 'Signed', err: 'ERROR'
  };
  var M = {};

  /* ===================== Tutorial 1 · Exercise 1 ===================== */
  M['td1-ex1'] = {
    src: 'Tutorial 1 · Ex 1', title: 'Powers of two',
    questions: [
      '<b>1.</b> Work out the following positive powers of two.' + T.powStatement(false) +
        '<p><b>From now on, you have to know the first positive powers of two by heart (at least from ' + pw(2, 0) + ' to ' + pw(2, 16) + ').</b></p>',
      '<b>2.</b> Work out the following negative powers of two.' + T.powStatement(true) +
        '<p><b>From now on, you have to know the first negative powers of two by heart (at least from ' + pw(2, -1) + ' to ' + pw(2, -5) + ').</b></p>'],
    hints: [
      'Each positive power is twice the previous one: ' + pw(2, n + '+1') + ' = 2 × ' + pw(2, n) + '. Landmark: ' + pw(2, 10) + ' = 1,024, a bit more than a thousand.',
      'A negative power is an inverse: ' + pw(2, '−' + n) + ' = 1 / ' + pw(2, n) + '. Each one is half the previous one: 0.5; 0.25; 0.125…',
      'Check: ' + pw(2, '−' + n) + ' has exactly ' + n + ' digits after the point, and they are the digits of ' + pw(5, n) + ' (' + pw(2, -3) + ' = 0.125 and ' + pw(5, 3) + ' = 125).'],
    solution: [
      { t: 'Question 1 · positive powers', html: '<p>Start from ' + pw(2, 0) + ' = 1 (any number to the power 0 is 1) and double each time. A few shortcuts, so that you do not have to redo everything:</p>' +
        calc([pw(2, 11) + ' = 2 × 1,024 = 2,048', pw(2, 16) + ' = ' + pw(2, 8) + ' × ' + pw(2, 8) + ' = 256 × 256 = 65,536', pw(2, 20) + ' = ' + pw(2, 10) + ' × ' + pw(2, 10) + ' = 1,024 × 1,024 = 1,048,576']) +
        '<p>Know without computing: ' + pw(2, 8) + ' = 256 (a byte can be arranged into 256 patterns), ' + pw(2, 10) + ' = 1,024, ' + pw(2, 16) + ' = 65,536.</p>' },
      { t: 'Question 2 · negative powers', html: '<p>' + pw(2, '−' + n) + ' = 1 / ' + pw(2, n) + ': start from ' + pw(2, -1) + ' = 0.5 and divide by 2 each time.</p>' +
        calc([pw(2, -4) + ' = 0.125 / 2 = 0.0625', pw(2, -5) + ' = 0.0625 / 2 = 0.03125', pw(2, -10) + ' = 0.0009765625']) +
        '<p>Check without dividing: ' + pw(2, '−' + n) + ' = ' + pw(5, n) + ' / ' + pw(10, n) + '. Since ' + pw(5, 10) + ' = 9,765,625, ' + pw(2, -10) + ' is 9765625 written with 10 digits after the point: 0.0009765625.</p>' },
      { t: 'What they are for', html: '<p>They are the weights of the digits of a binary number: ' + pw(2, 0) + ', ' + pw(2, 1) + ', ' + pw(2, 2) + '… to the left of the point, ' + pw(2, -1) + ', ' + pw(2, -2) + '… to the right. For example ' + B('101,01') + ' = 4 + 1 + 0.25 = 5.25. Practise until you answer without thinking:</p>' +
        tool('drill', { kind: 'pow2' }) }],
    answer: T.powAnswer(false, L) + T.powAnswer(true, L),
    traps: [
      pw(2, 0) + ' = 1, not 0 or 2.',
      pw(2, 10) + ' = 1,024, not 1,000; the gap grows: ' + pw(2, 20) + ' = 1,048,576, not 1,000,000.',
      'One zero too many or too few after the point: ' + pw(2, -4) + ' = 0.0625 (not 0.625). ' + pw(2, '−' + n) + ' has exactly ' + n + ' digits after the point.',
      pw(2, '−' + n) + ' is not negative: it is 1 / ' + pw(2, n) + ', a number between 0 and 1.',
      'In English, the comma separates thousands: 1,024 is one thousand and twenty-four (the French sheets write 1 024 and use the comma as the decimal point).'],
    note: NOTE
  };

  /* ===================== Tutorial 1 · Exercise 2 ===================== */
  var CONSIGNE = 'Convert the following numbers from the source form into the destination form. Do not write down the result in a fraction or a power form (e.g. write down 0.25 and not ¼ or ' + pw(2, -2) + ').';
  var CONV_HINTS = [
    'To base 10: write the sum of products digit × weight. After the hexadecimal point, the weights are ' + pw(16, -1) + ' = 0.0625 and ' + pw(16, -2) + ' = 0.00390625.',
    'From base 10: successive divisions for the integer part (remainders read from the last to the first), successive multiplications for the fractional part (integer parts read from the first to the last). Stop at the number of digits asked for, without rounding.',
    'Between base 2 and base 16: one hexadecimal digit = 4 bits. Group the bits by 4 starting from the point; pad with 0s on the left of the integer part and on the right of the fractional part.'];
  M['td1-ex2a'] = {
    src: 'Tutorial 1 · Ex 2.1', title: 'Conversions between bases 2, 10 and 16',
    intro: '<p><b>1.</b> ' + CONSIGNE + '</p>' + T.convStatement(D.CONV21, L),
    hints: CONV_HINTS,
    solution: T.convSteps(D.CONV21, [
      'Sum of products: the bits set to 1 have the weights ' + pw(2, 7) + ', ' + pw(2, 5) + ', ' + pw(2, 3) + ', ' + pw(2, 1) + ' and ' + pw(2, 0) + ': 128 + 32 + 8 + 2 + 1 = 171.',
      'A = 10 and B = 11; the weights are ' + pw(16, 2) + ' = 256, ' + pw(16, 1) + ' = 16 and ' + pw(16, 0) + ' = 1: 10 × 256 + 9 × 16 + 11 = 2,560 + 144 + 11 = 2,715.',
      'Divide successively by 2 until the quotient is 0, then read the remainders from the last to the first. Check: 128 + 64 + 16 + 8 + 2 = 218.',
      'Successive divisions by 16: 603 = 16 × 37 + 11, 37 = 16 × 2 + 5, 2 = 16 × 0 + 2. The remainder 11 is written B. Check: 2 × 256 + 5 × 16 + 11 = 603.',
      'Each hexadecimal digit gives exactly 4 bits: B = 1011, 8 = 1000, E = 1110.',
      '16 bits, so 4 full groups starting from the right: 1011 1101 1110 0110, that is B, D, E and 6.',
      'Weights 8 and 2 for the integer part, ' + pw(2, -1) + ' = 0.5 and ' + pw(2, -3) + ' = 0.125 after the point: 8 + 2 + 0.5 + 0.125 = 10.625.',
      'Integer part: 4 × 16 + 4 = 68. After the point: 4 × ' + pw(16, -1) + ' + 4 × ' + pw(16, -2) + ' = 0.25 + 0.015625 = 0.265625.',
      'Convert the two parts separately. Integer part: 17 = 16 + 1 = 1 0001₂. Fractional part, successive multiplications by 2: 0.84 → 0; 1.68 → 1; 1.36 → 1; 0.72 → 0; 1.44 → 1. Keep the 5 digits asked for. (The expansion never ends: 0.42 has no finite binary form.)',
      'Integer part: 17 = 16 + 1 = 11₁₆. Fractional part, successive multiplications by 16: 0.42 × 16 = 6.72 → 6; 0.72 × 16 = 11.52 → B; 0.52 × 16 = 8.32 → 8. Keep the 3 digits asked for.',
      'Each digit gives 4 bits, on both sides of the point: B = 1011, 6 = 0110, F = 1111, 3 = 0011.',
      'Groups of 4 starting from the point. To the left: 10 0101 → 0010 0101 (two 0s added on the left). To the right: 1100 11 → 1100 1100 (two 0s added on the right). 0010 = 2, 0101 = 5, 1100 = C.'
    ], L),
    answer: T.convAnswer(D.CONV21, L),
    traps: [
      '100101.110011 → 25.CC, not 25.33: the fractional part is grouped from the point and padded on the right (1100 11 → 1100 1100).',
      '44.44₁₆ is not 68.44: after the point, the weights are ' + pw(16, -1) + ' = 0.0625, then ' + pw(16, -2) + ' = 0.00390625.',
      'Multiplying the whole product: after 0.42 × 16 = 6.72, keep the digit 6 and go on with 0.72, not with 6.72.',
      '603 → 25B: a remainder of 11 is written B in base 16 (“2511” is wrong).',
      'The remainders of the divisions are read from the last to the first; the integer parts of the multiplications, from the first to the last.'],
    note: NOTE + ' “5 (or 3) digits after the point”: truncate, as the course and the exam answer keys do; here rounding would give the same result.'
  };
  M['td1-ex2b'] = {
    src: 'Tutorial 1 · Ex 2.2', title: 'Conversions: same question (homework)',
    intro: '<p><b>2.</b> Same question (homework).</p><p class="muted">Question 1 was: ' + CONSIGNE + '</p>' + T.convStatement(D.CONV22, L),
    hints: CONV_HINTS,
    solution: T.convSteps(D.CONV22, [
      '16 bits: the shortest way is through hexadecimal. Groups of 4: 1001 1001 0110 1100 = 996C₁₆, then 9 × 4,096 + 9 × 256 + 6 × 16 + 12 = 36,864 + 2,304 + 96 + 12 = 39,276. (Directly: 32,768 + 4,096 + 2,048 + 256 + 64 + 32 + 8 + 4, same total.)',
      'Weights ' + pw(16, 3) + ' = 4,096, ' + pw(16, 2) + ' = 256, 16 and 1; B = 11, E = 14: 4,096 + 2 × 256 + 11 × 16 + 14 = 4,096 + 512 + 176 + 14 = 4,798.',
      'Ten divisions by 2; read the remainders from the last to the first. A faster check through base 16: 631 = 2 × 256 + 7 × 16 + 7 = 277₁₆ = 0010 0111 0111₂.',
      '3,129 = 16 × 195 + 9; 195 = 16 × 12 + 3; 12 = 16 × 0 + 12. The remainder 12 is written C. Check: 12 × 256 + 3 × 16 + 9 = 3,129.',
      'One digit, 4 bits: B = 1011, D = 1101, 9 = 1001, F = 1111.',
      '18 bits: from the right, four full groups; 11 remains on the left, padded to 0011. 0011 0111 0110 1001 1001 gives 3, 7, 6, 9, 9.',
      'Integer part: 32 + 16 + 4 + 1 = 53. After the point, the bits set to 1 are at positions −1, −3, −4 and −7: 0.5 + 0.125 + 0.0625 + 0.0078125 = 0.6953125.',
      'Integer part: 10 × 256 + 4 × 16 + 12 = 2,636. After the point: 1 × ' + pw(16, -1) + ' + 4 × ' + pw(16, -2) + ' + 8 × ' + pw(16, -3) + ' = 0.0625 + 0.015625 + 0.001953125 = 0.080078125.',
      'Integer part: 48 = 32 + 16 = 11 0000₂. Fractional part, by 2: 0.24 → 0; 0.48 → 0; 0.96 → 0; 1.92 → 1; 1.84 → 1; 1.68 → 1; 1.36 → 1. Keep the 7 digits asked for.',
      'Integer part: 92 = 16 × 5 + 12, that is 5C. Fractional part, by 16: 0.47 × 16 = 7.52 → 7; 0.52 × 16 = 8.32 → 8; 0.32 × 16 = 5.12 → 5; 0.12 × 16 = 1.92 → 1. The next digit would be E (0.92 × 16 = 14.72): rounding would give 5C.7852, but you stop at the 4th digit without rounding.',
      '8 = 1000; D = 1101, E = 1110, C = 1100, A = 1010. The last 0 of the fractional part can be dropped: 1000.1101 1110 1100 1010₂ is also correct.',
      'Groups from the point. Integer part: 110 0101 0110 → 0110 0101 0110 (one 0 added on the left) = 656. Fractional part: 0110 1011 = 6B (the groups are already full).'
    ], L),
    answer: T.convAnswer(D.CONV22, L),
    traps: [
      '92.47 → 5C.7851, not 5C.7852: stop at the 4th digit, without rounding.',
      '110111011010011001 has 18 bits: the leftmost group has only 2 bits (11 → 3). Grouping from the left (1101 1101 1010 0110 01…) gives a wrong result.',
      '8.DECA: each digit gives exactly 4 bits, zeros included (C = 1100, A = 1010).',
      'A4C.148₁₆: 0.148₁₆ is not 0.148 but 1/16 + 4/256 + 8/4,096 = 0.080078125.',
      '3,129 is three thousand one hundred and twenty-nine: in English, the comma separates thousands (the French sheet writes 3 129).'],
    note: NOTE + ' “n digits after the point”: truncate, as the course and the exam answer keys do; for 92.47, rounding would give 5C.7852.'
  };

  /* ===================== Tutorial 1 · Exercise 3 ===================== */
  M['td1-ex3a'] = {
    src: 'Tutorial 1 · Ex 3.1', title: 'Binary additions',
    intro: '<p><b>1.</b> Perform the following binary additions:</p>',
    questions: T.opsQuestions(OPS.add, L),
    hints: [
      'Column by column, from right to left: 1 + 1 = 10 (0 carry 1); 1 + 1 + 1 = 11 (1 carry 1).',
      'With four numbers, a column can be worth 100₂ (four): write down 0 and carry 10₂ = 2.',
      'Decimal check: 170 + 206 = 376; 99 + 119 + 75 + 5 = 298.'],
    solution: [
      { t: '10101010 + 11001110', html: '<p>Line the two numbers up on the right and add column by column, from right to left, writing the carries above.</p>' +
        T.posedTool(OPS.add[0]) + '<p>The last carry creates a 9th digit: <b>' + B(OPS.add[0].res) + '</b>. Check: 170 + 206 = 376 = 256 + 64 + 32 + 16 + 8.</p>' },
      { t: '1100011 + 1110111 + 1001011 + 101', html: '<p>Same method, but a column can now hold up to four 1s, plus the carry. Write the column sum in binary, write down its last digit and carry the rest: 1 + 1 + 1 + 1 = 100₂, write down 0 and carry 10₂ (the next column receives 2, as much as a 1 two columns further left).</p>' +
        T.posedTool(OPS.add[1]) + '<p>Result: <b>' + B(OPS.add[1].res) + '</b>. Check: 99 + 119 + 75 + 5 = 298 = 256 + 32 + 8 + 2.</p>' +
        '<p class="sol-note">If carries of 10 bother you, add two numbers at a time: 1100011 + 1110111 = 11011010; + 1001011 = 100100101; + 101 = 100101010.</p>' }],
    answer: T.opsAnswer(OPS.add, L),
    traps: [
      'Forgetting the last carry: 10101010 + 11001110 has 9 digits (1 0111 1000), not 8.',
      'In a column worth 4 = 100₂, carrying 1 instead of 10₂.',
      'Lining 101 up on the left: the numbers are lined up on the right, on the ones column.'],
    note: NOTE
  };
  M['td1-ex3b'] = {
    src: 'Tutorial 1 · Ex 3.2', title: 'Binary subtractions',
    intro: '<p><b>2.</b> Perform the following binary subtractions:</p>',
    questions: T.opsQuestions(OPS.sub, L),
    hints: [
      'From right to left: 1 − 0 = 1, 1 − 1 = 0, 0 − 0 = 0. For 0 − 1, borrow 1.',
      'Course method: the top digit that is too small receives 10₂ (write a small 1 in front of it), and the bottom digit of the next column receives + 1.',
      'Check: result + bottom number = top number; in decimal, 225 − 155 = 70 and 1,894 − 438 = 1,456.'],
    solution: [
      { t: '11100001 − 10011011', html: '<p>Course method, from right to left. When the top digit is too small, borrow 1: it becomes 10₂ or 11₂, and the bottom digit of the next column receives + 1. If that bottom digit is already 1, you subtract 1 + 1 = 10₂, and you often have to borrow again.</p>' +
        T.posedTool(OPS.sub[0]) + '<p>Result: <b>' + B(OPS.sub[0].res) + '</b>. Check: 225 − 155 = 70 = 64 + 4 + 2; or 1000110 + 10011011 = 11100001.</p>' },
      { t: '11101100110 − 110110110', html: '<p>The bottom number has only 9 digits: pad it with 0s on the left (00110110110) to line it up with the 11 digits of the top number.</p>' +
        T.posedTool(OPS.sub[1]) + '<p>Result: <b>' + B(OPS.sub[1].res) + '</b>. Check: 1,894 − 438 = 1,456 = 1,024 + 256 + 128 + 32 + 16.</p>' }],
    answer: T.opsAnswer(OPS.sub, L),
    traps: [
      'Adding the borrow both to the top digit and to the bottom digit of the next column: the borrow is carried over only once (the course puts it at the bottom).',
      'A column “0 − (1 + 1)”: it is 0 − 10₂; borrow 1, 10 − 10 = 0, and the borrow goes on.',
      'Not checking: one addition (result + bottom number) gives back the top number.'],
    note: NOTE
  };
  M['td1-ex3c'] = {
    src: 'Tutorial 1 · Ex 3.3', title: 'Binary multiplications',
    intro: '<p><b>3.</b> Perform the following binary multiplications:</p>',
    questions: T.opsQuestions(OPS.mul, L),
    hints: [
      'One partial product per digit of the multiplier, from right to left: digit 1 → copy the multiplicand; digit 0 → a row of zeros. Each row is shifted one more place to the left.',
      'Then add the partial products, with the carries: three 1s in a column make 11₂.',
      'Check: 107 × 21 = 2,247; 140 × 37 = 5,180.'],
    solution: [
      { t: '1101011 × 10101', html: '<p>The multiplier 10101 has five digits: five partial products, each one shifted one more place. The course also writes down the rows of zeros:</p>' +
        T.posedTool(OPS.mul[0]) + '<p>Sum of the partial products: <b>' + B(OPS.mul[0].res) + '</b>. Check: ' + dtext(OPS.mul[0].dec) + '.</p>' },
      { t: '10001100 × 100101', html: '<p>The exam answer keys skip the rows of zeros: only the rows of the 1 digits of 100101 (weights ' + pw(2, 0) + ', ' + pw(2, 2) + ' and ' + pw(2, 5) + ') are written, shifted by 0, 2 and 5 places.</p>' +
        T.posedTool(OPS.mul[1]) + '<p>Result: <b>' + B(OPS.mul[1].res) + '</b>. Check: ' + dtext(OPS.mul[1].dec) + '.</p>' +
        '<p class="sol-note">The product is the same if you swap the two numbers: taking as multiplier the one with fewer 1s gives fewer rows.</p>' }],
    answer: T.opsAnswer(OPS.mul, L),
    traps: [
      'Skipping a row of zeros without shifting the next one: the partial product of the digit of weight ' + pw(2, '<var>k</var>') + ' is shifted by <var>k</var> places, whether the rows of zeros are written or not.',
      'Forgetting the carries of the final addition (three 1s in a column: 1 carry 1).'],
    note: NOTE
  };
  M['td1-ex3d'] = {
    src: 'Tutorial 1 · Ex 3.4', title: 'Binary divisions with digits after the point',
    intro: '<p><b>4.</b> Perform the following binary divisions:</p>',
    questions: T.opsQuestions(OPS.div, L),
    hints: [
      'Long division as in decimal: look for the smallest leading part of the dividend that contains the divisor. In binary, the divisor goes into it 0 or 1 time.',
      'At each step: record a 1 in the quotient and subtract the divisor, or record a 0 if the partial remainder is smaller; then bring down the next digit.',
      'When all the digits of the dividend have been brought down: record a binary point in the quotient, then bring down an extra 0 to the remainder at each step, as many times as the digits asked for. Stop there, without rounding.'],
    solution: [
      { t: '1100110 / 101, 6 digits', html: '<p>101 goes neither into 1 nor into 11: it goes into 110 one time. Record 1 in the quotient, subtract (110 − 101 = 1), bring down the next digit, and so on; record a 0 in the quotient each time the partial remainder is smaller than 101. After the last digit of the dividend, record the binary point and bring down extra 0s.</p>' +
        T.posedTool(OPS.div[0]) + '<p>Quotient: <b>' + B(OPS.div[0].res) + '</b> (remainder ' + B('11') + '). Check: 102 / 5 = 20.4; 20 = 10100₂ and 0.4 = 0.0110 0110…₂ (the pattern 0110 repeats). The 7th digit would be 1: rounding would give 10100.011010, but you stop at the 6th.</p>' },
      { t: '1011000100 / 1101, 4 digits', html: '<p>1101 goes one time into 10110, the first five digits of the dividend. Same method afterwards.</p>' +
        T.posedTool(OPS.div[1]) + '<p>Quotient: <b>' + B(OPS.div[1].res) + '</b> (remainder ' + B('101') + '). Check: 708 / 13 = 54 remainder 6; 54 = 110110₂, and 6/13 ≈ 0.46 starts with 0.0111₂ (0.4375).</p>' }],
    answer: T.opsAnswer(OPS.div, L),
    traps: [
      'Forgetting a 0 in the quotient when the partial remainder is smaller than the divisor: all the following digits are then shifted.',
      'Rounding the last digit: 1100110 / 101 gives 10100.011001; the 7th digit (1) is not added.',
      'Recording the point too early or too late: it goes in when you bring down the first extra 0, after the last digit of the dividend.'],
    note: NOTE + ' “n digits after the point”: you stop the division, so you truncate.'
  };
  M['td1-ex3e'] = {
    src: 'Tutorial 1 · Ex 3.5', title: 'Hexadecimal additions',
    intro: '<p><b>5.</b> Perform the following hexadecimal additions:</p>',
    questions: T.opsQuestions(OPS.hex, L),
    hints: [
      'Course method: add each column using the decimal values of the digits (A = 10 … F = 15), then convert the column result into hexadecimal: write down the right digit and propagate the carry.',
      'A sum from 16 to 31 gives a carry of 1 (E + E = 28 = 1C₁₆). With three numbers, a column is worth at most 15 × 3 + 2 = 47 = 2F₁₆: the carry can be 2.',
      'Decimal check: 48,830 + 51,966 = 100,796.'],
    solution: [
      { t: 'BEBE + CAFE', html: '<p>Column by column, from right to left, with the decimal values:</p>' +
        calc(['E + E = 14 + 14 = 28 = 1C₁₆ → write down C (carry = 1)', 'B + F + 1 = 11 + 15 + 1 = 27 = 1B₁₆ → B (carry = 1)', 'E + A + 1 = 14 + 10 + 1 = 25 = 19₁₆ → 9 (carry = 1)', 'B + C + 1 = 11 + 12 + 1 = 24 = 18₁₆ → 8 (carry = 1)', 'the last carry is written on the left: 1']) +
        T.posedTool(OPS.hex[0]) + '<p>Result: <b>' + H(OPS.hex[0].res) + '</b>. Check: ' + dtext(OPS.hex[0].dec) + ' = 189BC₁₆.</p>' },
      { t: '467 + 94C + F1A', html: '<p>Three numbers, as in the course example:</p>' +
        calc(['7 + C + A = 7 + 12 + 10 = 29 = 1D₁₆ → write down D (carry = 1)', '6 + 4 + 1 + 1 = 12 = C₁₆ → C (no carry)', '4 + 9 + F = 4 + 9 + 15 = 28 = 1C₁₆ → C (carry = 1)', 'the last carry is written on the left: 1']) +
        T.posedTool(OPS.hex[1]) + '<p>Result: <b>' + H(OPS.hex[1].res) + '</b>. Check: ' + dtext(OPS.hex[1].dec) + '.</p>' }],
    answer: T.opsAnswer(OPS.hex, L),
    traps: [
      'Writing the decimal sum of a column (28) instead of its hexadecimal digit (C, carry 1).',
      'Getting a letter wrong: B = 11, C = 12, D = 13, E = 14, F = 15; one unit off spoils the whole column.',
      'Forgetting the final carry: BEBE + CAFE has 5 digits.'],
    note: NOTE
  };

  /* ===================== Tutorial 2 · Exercise 1 ===================== */
  M['td2-ex1'] = {
    src: 'Tutorial 2 · Ex 1', title: 'Ranges of unsigned and signed integers',
    intro: '<p>Work out the decimal range of signed and unsigned binary numbers for each of the following word lengths: 4, 8, 16, 32 and ' + n + ' bits (for 32 and ' + n + ' bits, you can use a power of two notation).</p>' + T.rangesTable(L, true),
    hints: [
      'On ' + n + ' bits there are ' + pw(2, n) + ' words (patterns). As unsigned integers, they encode 0 to ' + pw(2, n) + ' − 1.',
      'As signed integers (two’s complement), half of the words, those whose most significant bit is 1, encode the negative integers: −' + pw(2, n + '−1') + ' to −1. The other half encodes 0 and the positive integers: 0 to ' + pw(2, n + '−1') + ' − 1.',
      'Useful powers: ' + pw(2, 7) + ' = 128, ' + pw(2, 15) + ' = 32,768, ' + pw(2, 16) + ' = 65,536, ' + pw(2, 31) + ' = 2,147,483,648, ' + pw(2, 32) + ' = 4,294,967,296.'],
    solution: [
      { t: 'Unsigned', html: '<p>The smallest word, 00…0, is 0. The largest, 11…1, is ' + pw(2, n + '−1') + ' + … + 2 + 1 = ' + pw(2, n) + ' − 1: one less than 100…0 = ' + pw(2, n) + ', which has one bit too many.</p>' +
        calc(['4 bits: 1111 = ' + pw(2, 4) + ' − 1 = 15', '8 bits: 1111 1111 = ' + pw(2, 8) + ' − 1 = 255', '16 bits: ' + pw(2, 16) + ' − 1 = 65,535', '32 bits: ' + pw(2, 32) + ' − 1 = 4,294,967,295']) },
      { t: 'Signed (two’s complement)', html: '<p>The most significant bit is the sign bit. The largest positive integer is 0111…1 = ' + pw(2, n + '−1') + ' − 1; the smallest negative integer is 1000…0 = −' + pw(2, n + '−1') + ' (its two’s complement gives the same word back). There is one more negative integer than positive ones, because 0 is in the “sign bit 0” half.</p>' +
        calc(['4 bits: 1000 = −8 … 0111 = 7', '8 bits: 1000 0000 = −128 … 0111 1111 = 127', '16 bits: −' + pw(2, 15) + ' = −32,768 … ' + pw(2, 15) + ' − 1 = 32,767', '32 bits: −' + pw(2, 31) + ' = −2,147,483,648 … ' + pw(2, 31) + ' − 1 = 2,147,483,647']) +
        '<p>On the wheel of 4-bit words, both ranges can be read at once: 0 to 15 inside, −8 to 7 outside.</p>' + tool('wheel', { value: 7 }) },
      { t: 'Seeing it on 8 bits', html: '<p>In this register, 0111 1111 is 127 as a signed integer. Click + 1: it becomes 1000 0000, that is −128 (signed overflow). Change the word size to see 4 and 16 bits.</p>' +
        tool('register', { n: 8, value: '01111111', sizes: [4, 8, 16] }) }],
    answer: T.rangesTable(L, false),
    traps: [
      'The unsigned maximum is ' + pw(2, n) + ' − 1, not ' + pw(2, n) + ': 256 does not fit in 8 bits (1 0000 0000 has 9).',
      'The signed range is not symmetric: −128 to 127 on 8 bits (neither −127 to 127 nor −128 to 128).',
      'Signed: it is ' + pw(2, n + '−1') + ', not ' + pw(2, n) + ': −' + pw(2, n + '−1') + ' to ' + pw(2, n + '−1') + ' − 1. Both encodings have ' + pw(2, n) + ' values.'],
    note: NOTE
  };

  /* ===================== Tutorial 2 · Exercise 2 ===================== */
  M['td2-ex2'] = {
    src: 'Tutorial 2 · Ex 2', title: 'Encoding negative integers on 8 bits',
    intro: '<p>Encode the following negative integers into 8-bit signed words: −1, −33, −60, −127, −128.</p>',
    hints: [
      'Course method: write the absolute value in binary on 8 bits, then take its two’s complement (invert each bit, then add one).',
      'Course shortcut: starting from the right, keep the bits up to the 1st one included and invert all the others.',
      'Check: the word of −<var>v</var>, read as an unsigned integer, is 256 − <var>v</var> (−1 → 255 = FF₁₆).'],
    solution: [
      { t: 'Method, on −33', html: '<p>A negative integer is encoded in two steps: its absolute value in binary on 8 bits, then the two’s complement of that word.</p>' +
        calc(['33 = 32 + 1 = ' + W('00100001'), 'invert each bit: ' + W('11011110'), 'add one: ' + W('11011111') + ' = DF₁₆']) +
        '<p>With the shortcut: 0010000<b>1</b> → keep the last 1, invert the rest → 1101111<b>1</b>. In the register, click “Two’s complement”:</p>' +
        tool('register', { n: 8, value: '00100001', sizes: [8] }) },
      { t: '−1, −60, −127', html: calc([
        '−1: ' + W('00000001') + ' → ' + W('11111110') + ' + 1 = ' + W('11111111'),
        '−60: ' + W('00111100') + ' → ' + W('11000011') + ' + 1 = ' + W('11000100'),
        '−127: ' + W('01111111') + ' → ' + W('10000000') + ' + 1 = ' + W('10000001')]) +
        '<p>They all start with 1: the sign bit of negative integers.</p>' },
      { t: '−128, the edge case', html: '<p>128 does not fit in an 8-bit signed word (the largest positive integer is 127): the “absolute value, then two’s complement” method does not start from a signed word. But −128 is the smallest 8-bit signed integer, the word ' + W('10000000') + '. The mechanical computation gives the same word: 128 = 10000000 as an unsigned integer; invert → 01111111; add one → 10000000.</p>' },
      { t: 'Check', html: '<p>Read as an unsigned integer, the word of −<var>v</var> is 256 − <var>v</var>:</p>' +
        calc(D.NEG8.map(function (r) { return W(r.w) + ' = ' + r.hex + '₁₆ = ' + r.u + ' = 256 − ' + (-r.v); })) }],
    answer: tbl(['Integer', 'Absolute value', 'One’s complement', '8-bit word', 'Hexadecimal'], D.NEG8.map(function (r) {
      return [T.D(sgn(r.v)), W(r.abs) + (r.v === -128 ? '<br><small>(unsigned)</small>' : ''), W(r.one), '<b>' + W(r.w) + '</b>', H(r.hex)];
    })),
    traps: [
      'Stopping at the one’s complement (forgetting to add one): 11011110 is −34, not −33.',
      'Only putting a 1 in front of the absolute value (10100001 for −33): this is not the course encoding; in two’s complement, 10100001 is −95.',
      'Taking the two’s complement of an absolute value written on fewer than 8 bits: first pad it to 8 bits (33 = 00100001).'],
    note: NOTE
  };

  /* ===================== Tutorial 2 · Exercise 3 ===================== */
  var SIGN_TBL = tbl([L.word, L.binary, 'MSB', L.sign, L.value], D.SIGNS.map(function (r) {
    return [H(r.h), W(r.w), r.w.charAt(0), '<b>' + (r.neg ? L.N : L.P) + '</b>', T.D(r.v)];
  }), { w: 36 });
  M['td2-ex3'] = {
    src: 'Tutorial 2 · Ex 3', title: 'Sign of a word and signed overflow',
    intro: '<p><b>For the whole exercise, we use the two’s complement encoding (used to encode signed integers).</b></p>',
    questions: [
      '<b>1.</b> Let us consider the following 8-bit words (in their hexadecimal form): FF, 27, 7E, 9A, B7, 6D, 81. Do they represent positive or negative integers?',
      '<b>2.</b> Write down the range of 8-bit words used to encode positive integers (use the hexadecimal form).',
      '<b>3.</b> Write down the range of 8-bit words used to encode negative integers (use the hexadecimal form).',
      '<b>4.</b> Complete the following table for the addition (write down <i>Yes</i> or <i>No</i> for the signed overflow).' + T.ovTable(D.OV_ADD, '+', L, true),
      '<b>5.</b> Complete the following table for the subtraction (write down <i>Yes</i> or <i>No</i> for the signed overflow).' + T.ovTable(D.OV_SUB, '-', L, true)],
    hints: [
      'The sign is read on the most significant bit, so on the first hexadecimal digit: 0 to 7 (0xxx) → positive, 8 to F (1xxx) → negative.',
      'On 8 signed bits, the exact result must stay between −128 and 127. A positive and a negative integer added together cannot leave this range.',
      'For a subtraction, think a − b = a + (−b): “positive − negative” behaves like “positive + positive”.'],
    solution: [
      { t: 'Question 1 · the sign of a word', html: '<p>Write each hexadecimal digit on 4 bits; the most significant bit (MSB) gives the sign: 0 → positive, 1 → negative. So just look at the first digit: 8 or more → negative.</p>' +
        SIGN_TBL + '<p class="sol-note">The value is not asked for; for a negative word it is read with the two’s complement (81 = 1000 0001 → two’s complement 0111 1111 = 127 → −127).</p>' },
      { t: 'Questions 2 and 3 · the ranges in hexadecimal', html: '<p>Positive integers: MSB 0, from ' + W('00000000') + ' to ' + W('01111111') + ', that is <b>' + H('00') + ' to ' + H('7F') + '</b> (0 to 127, zero included). Negative integers: MSB 1, from ' + W('10000000') + ' to ' + W('11111111') + ', that is <b>' + H('80') + ' to ' + H('FF') + '</b> (−128 to −1).</p>' },
      { t: 'Question 4 · the addition table', html: '<p>Reason on the exact result. Positive + positive: between 0 and 254; above 127 it does not fit, and the word obtained has its sign bit set to 1: a “negative” result reveals the overflow. Negative + negative: between −256 and −2; below −128, the word obtained has its sign bit set to 0. Positive + negative: between −128 and 126, always representable: never an overflow.</p>' +
        T.ovTable(D.OV_ADD, '+', L, false) +
        '<p>On the wheel of 4-bit words, the signed overflow is the step between 0111 (7) and 1000 (−8):</p>' + tool('wheel', { value: 6 }) },
      { t: 'Question 5 · the subtraction table', html: '<p>a − b = a + (−b): changing the sign of the 2nd operand brings you back to additions. Positive − negative = positive + positive: overflow if the result is negative. Negative − positive = negative + negative: overflow if the result is positive. Positive − positive and negative − negative: never.</p>' +
        T.ovTable(D.OV_SUB, '-', L, false) },
      { t: 'The rule to remember', html: '<p>Signed overflow <b>only</b> when you add two numbers of the same sign and the result has the other sign: P + P = N, N + N = P, P − N = N, N − P = P. The carry has nothing to do with it: 11111111 + 11111111 = 1 11111110 has a carry, but −1 + (−1) = −2 is right.</p>' +
        '<p class="sol-note">The sheet does not say where 0 belongs; here “positive” means “sign bit 0”, zero included. The answers do not change if 0 is left out (checked on the 65,536 pairs of 8-bit words).</p>' }],
    answer: '<p>1. ' + D.SIGNS.map(function (r) { return H(r.h) + ' ' + (r.neg ? 'negative' : 'positive'); }).join('; ') + '.</p>' +
      '<p>2. ' + H('00') + ' to ' + H('7F') + '. 3. ' + H('80') + ' to ' + H('FF') + '.</p>' +
      '<p>4. Additions: Yes for P + P = N and N + N = P; No for the four other rows.</p>' +
      tbl([L.op1, '+', L.op2, '=', L.result, L.ov], D.OV_ADD.map(function (r) { return [L[r.a], '+', L[r.b], '=', L[r.r], '<b>' + (r.ov ? L.yes : L.no) + '</b>']; })) +
      '<p>5. Subtractions: Yes for P − N = N and N − P = P; No for the six other rows.</p>' +
      tbl([L.op1, MINUS, L.op2, '=', L.result, L.ov], D.OV_SUB.map(function (r) { return [L[r.a], MINUS, L[r.b], '=', L[r.r], '<b>' + (r.ov ? L.yes : L.no) + '</b>']; })),
    traps: [
      'Judging the sign on the apparent decimal value: 81₁₆ “looks” positive, but 1000 0001 starts with 1: negative (−127).',
      'Confusing the carry with a signed overflow: the carry out signals an unsigned overflow, not a signed one.',
      'Applying the addition rule as it is to subtractions: “positive − positive” never overflows, “positive − negative” can.'],
    note: NOTE + ' Tables of questions 4 and 5 checked on all pairs of 8-bit words.'
  };

  /* ===================== Tutorial 2 · Exercise 4 ===================== */
  var T8_TXT = [
    'The addition gives 9 bits: 1 11101001. The carry out is lost: the word is 11101001. Unsigned: 239 + 250 = 489 > 255, ERROR (that is the carry). Signed: −17 + (−6) = −23, and 11101001 = −(00010111) = −23: right (negative + negative = negative).',
    'Result 00011101 = 29. Unsigned: 232 − 203 = 29. Signed: −24 − (−53) = 29. No overflow.',
    'The bottom number is larger as an unsigned integer (154 > 90): the subtraction has to borrow beyond the 8th bit. This is shown by putting a 1 in front of the top number (256 + 90 = 346): 1 01011010 − 10011010 = 11000000. Unsigned: 90 − 154 < 0, ERROR (the borrow that left the word). Signed: 90 − (−102) = 192 > 127, ERROR (positive − negative = negative). The word 11000000 reads 192 or −64: neither reading is the true result.',
    'Result 10000011, without a carry. Unsigned: 122 + 9 = 131, right. Signed: 122 + 9 = 131 > 127, ERROR: positive + positive = negative (the word reads −125).',
    'Result 11000010. Unsigned: 219 − 25 = 194. Signed: −37 − 25 = −62, and 11000010 = −(00111110) = −62.',
    'The addition gives 1 01110010: the carry is lost, the word is 01110010 (114). Unsigned: 128 + 242 = 370 > 255, ERROR. Signed: −128 + (−14) = −142 < −128, ERROR (negative + negative = positive).',
    'Result 10000101. Unsigned: 147 − 14 = 133. Signed: −109 − 14 = −123, and 10000101 = −(01111011) = −123.'
  ];
  M['td2-ex4'] = {
    src: 'Tutorial 2 · Ex 4', title: 'Operations on 8 bits: unsigned, signed, overflows',
    intro: '<p>Perform the following 8-bit binary operations (the two operands and the result are 8 bits wide). Then, convert the result into unsigned and signed decimal values. If an overflow occurs, write down ‘ERROR’ instead of the decimal value.</p>' + T.t8Table(L, true),
    hints: [
      'Perform each operation in binary: the result word is made of the 8 rightmost bits. A carry or a borrow that leaves the word is lost.',
      'Unsigned: overflow if an addition produces a carry out (result > 255), or if a subtraction a − b has a < b (result < 0).',
      'Signed: overflow for P + P = N, N + N = P, P − N = N, N − P = P (exercise 3). Check: redo the computation in decimal with the signed values of the operands.'],
    solution: [
      { t: 'Method', html: '<ol><li>Perform the operation in binary and keep the 8 rightmost bits: this is the “Binary Result”, always written, even when an overflow occurs.</li>' +
        '<li>Read this word as unsigned (sum of the weights) and as signed (MSB set to 1: two’s complement, then a minus sign).</li>' +
        '<li>Check each column in decimal: unsigned operands for “Unsigned”, signed operands for “Signed”. If the exact result leaves 0 … 255 or −128 … 127, write ERROR in that column.</li></ol>' +
        '<p>The register reads a word in both encodings; click the bits to change the word:</p>' + tool('register', { n: 8, value: '11101001', sizes: [8] }) }
    ].concat(D.T8.map(function (r, i) {
      return { t: (i + 1) + '. ' + r.a + ' ' + (r.op === '+' ? '+' : MINUS) + ' ' + r.b, html: T.t8Tool(r) + '<p>' + T8_TXT[i] + '</p>' +
        (r.borrow ? '<p class="sol-note">Same word with the course method IV.2.2 (Subtraction Using the Two’s Complement): a − b = a + two’s complement of b. 01011010 + 01100110 = 11000000, without a carry out: for a subtraction, the absence of a carry signals the borrow.</p>' : '') };
    })),
    answer: T.t8Table(L, false),
    traps: [
      'Leaving the “Binary Result” cell empty when an overflow occurs: always write the 8-bit word; ERROR only goes in the decimal column concerned.',
      'Taking the carry for a signed overflow: 11101111 + 11111010 has a carry (unsigned wrong), but the signed result −23 is right.',
      'Writing the unsigned reading in the signed column: 11000010 is 194 unsigned but −62 signed.',
      'Forgetting that P + P can overflow without a carry: 01111010 + 00001001 = 10000011, 131 unsigned but ERROR signed.'],
    note: NOTE
  };

  R.i18n.patch(window.ARCHI_EX, T.fmt(M));
})();
