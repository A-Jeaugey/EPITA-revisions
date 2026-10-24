/* English text for data/archi/ex-td3.js (merged by id over the French file). Statements: Tutorial_03.pdf
   (“Floating-Point Numbers”), word for word; steps: the five-step methods of Chapter_2.pdf (III.1 and III.2) and the
   Key to Tutorial 3 (“E = e + bias = 7 + 127 = 6 + 128”, “denormalized mantissa”). The cards are rebuilt by
   window.ARCHI_TD3.build with the English words below; numbers are written the English way by the shared tools. */
(function () {
  'use strict';
  var T = window.ARCHI_TD, T3 = window.ARCHI_TD3, R = window.REV;
  if (!T || !T3 || !R || !R.i18n) return;
  var MINUS = '−';
  var BIAS = { single: '127', double: '1023' };
  var EN = {
    positive: 'positive', negative: 'negative', and: 'and', bias: 'bias', method: 'Course method (Chapter 2)',
    src: function (n) { return 'Tutorial 3 · Ex ' + n + (n === 2 || n === 4 ? ' (homework)' : ''); },
    t1: 'IEEE 754: encoding in single precision', t2: 'IEEE 754: encoding in double precision',
    t3: 'IEEE 754: decoding single-precision words', t4: 'IEEE 754: decoding double-precision words',
    q1: 'Convert the numbers below into their single-precision IEEE‑754 representations. Write down the final result in its binary form.',
    q2: '<i>(Homework.)</i> Convert the numbers below into their double-precision IEEE‑754 representations. Write down the final result in its binary form.',
    q3: 'Convert the single-precision IEEE‑754 words below into their associated representations. If a representation is a number, use the base-10 following form: <var>k</var>×2<sup><var>n</var></sup> where <var>k</var> and <var>n</var> are integers (either positive or negative).',
    q4: '<i>(Homework.)</i> Convert the double-precision IEEE‑754 words below into their associated representations. If a representation is a number, use the base-10 following form: <var>k</var>×2<sup><var>n</var></sup> where <var>k</var> and <var>n</var> are integers (either positive or negative).',
    intPart: function (i, s, pow) { return 'Integer part: ' + (pow ? i + ' is a power of two.' : i + ' = ' + s + '.'); },
    fracPart: function (x, d) { return 'Fractional part: successive multiplications of ' + x + ' by 2, until you get exactly 1 (' + d + ' bits).'; },
    shift: function (k, left) { return k === 0 ? 'The mantissa is already normalized.' : 'Normalize: move the point ' + k + ' place' + (k > 1 ? 's' : '') + ' to the ' + (left ? 'left' : 'right') + ', so that a single 1 stands before it. M = the digits after the point (the leading 1 is not stored).'; },
    exp: function (fmt, e) {
      var p = fmt === 'single' ? ['127', '128', '1000 0000'] : ['1023', '1024', '100 0000 0000'];
      return e < 0 ? 'Biased exponent: e is negative, so E is smaller than the bias and its most significant bit is 0.' :
        'Biased exponent. Tip from the key: ' + p[0] + ' = ' + p[1] + ' − 1, so E = (e − 1) + ' + p[1] + '; since ' + p[1] + ' = ' + T.B(p[2]) + ', just write e − 1 = ' + (e - 1) + ' in the bits on the right.';
    },
    result: 'Final result, in its binary form (S, E, M):',
    check: function (h) { return 'Check: in groups of 4 bits, the word is ' + h + '.'; },
    dots: '“0…0”: M is padded with 0s up to 52 bits, as in the key.',
    fields: 'Fields:', subShort: 'denormalized',
    inf: function (s) { return 'E holds only 1s and M = 0: this is ' + (s ? '−∞' : '+∞') + ' (S = ' + s + ').'; },
    nan: 'E holds only 1s and M ≠ 0: this is a NaN (Not a Number). A single 1 bit in M is enough.',
    zero: function (s) { return 'E = 0 and M = 0: this is ' + (s ? '−0' : '+0') + ' (S = ' + s + '). The standard tells +0 and −0 apart.'; },
    sub: 'E = 0 and M ≠ 0: denormalized mantissa. The exponent is fixed, e = 1 − bias, and m = (0.M)<sub>2</sub>: no hidden 1.',
    move: function (k, e, n) { return k ? 'Remove the point: it moves ' + k + ' place' + (k > 1 ? 's' : '') + ', so the exponent loses ' + k + ' (' + (e < 0 ? MINUS + (-e) : e) + ' − ' + k + ' = ' + (n < 0 ? MINUS + (-n) : n) + ').' : 'm = 1: no point to remove.'; },
    encMethod: function (fmt) {
      var b = BIAS[fmt];
      return '<ol><li>Determine the value of S according to the sign of the decimal number.</li><li>Convert the absolute value of the decimal number into its binary form (it can be a fraction).</li>' +
        '<li>Normalize the binary form. From this normalization, you can easily deduce M and e.</li><li>Work out E according to e and the bias: E = e + bias.</li>' +
        '<li>Write down the final result in its binary form.</li></ol><p>' + (fmt === 'single' ? 'Single precision: S on 1 bit, E on 8 bits, M on 23 bits, bias 127.' : 'Double precision: S on 1 bit, E on 11 bits, M on 52 bits, bias 1023.') +
        ' Tip from the key: ' + b + ' = ' + (fmt === 'single' ? '128' : '1024') + ' − 1, so E = (e − 1) + ' + (fmt === 'single' ? '128' : '1024') + '.</p>';
    },
    decMethod: function (fmt) {
      return '<p>' + (fmt === 'single' ? 'Single precision: 1 sign bit, 8 exponent bits, 23 mantissa bits, bias 127.' : 'Double precision: 1 sign bit, 11 exponent bits, 52 mantissa bits, bias 1023. The first 3 hexadecimal digits hold S and E.') + ' Look at E first:</p>' +
        '<ul><li>E holds only 0s: ±0 if M = 0, otherwise a denormalized number;</li><li>E holds only 1s: ±∞ if M = 0, otherwise NaN;</li><li>otherwise, a normalized number:</li></ul>' +
        '<ol><li>Determine the sign of the number according to the value of S.</li><li>Work out e according to E and the bias: e = E − bias.</li><li>Determine the value of m in its binary form: m = (1.M)<sub>2</sub>.</li>' +
        '<li>Write down the result in the following form: ± m × 2<sup>e</sup>.</li><li>Simplify if necessary by (re)moving the point and convert into decimal.</li></ol>';
    },
    h1: ['The five steps of the course: S, |x| in binary, normalization as (1.…)<sub>2</sub> × 2<sup>e</sup>, E = e + 127 on 8 bits, then the word S E M. M = the digits after the point, padded on the right with 0s up to 23 bits.',
      'All the fractional parts of this tutorial terminate: multiply by 2 until you get exactly 1 (0.25 gives 2 bits, 0.625 gives 3, 0.3125 gives 4).',
      'Tip from the key: 127 = 128 − 1, so E = (e − 1) + 128. Since 128 = <span class="bn">1000 0000</span>, for e = 7 write 6 = 110 in the bits on the right: E = <span class="bn">1000 0110</span>. If e is negative, E is less than 127 and starts with 0.'],
    h2: ['Same steps as in single precision, with E on 11 bits, M on 52 bits and the bias 1023.',
      'Tip: 1023 = 1024 − 1, so E = (e − 1) + 1024, and 1024 = <span class="bn">100 0000 0000</span> (11 bits). For e = 8: E = <span class="bn">100 0000 0111</span>.',
      '0.19140625 needs 8 multiplications, 0.2890625 needs 7. Check: 0.19140625 × 256 = 49 = <span class="bn">0011 0001</span>.'],
    h3: ['Split the word: 1 sign bit, then 8 exponent bits E, then 23 mantissa bits M.',
      'Normalized number: e = E − 127 and m = (1.M)<sub>2</sub>. To get an integer <var>k</var>, remove the point of m: the exponent goes down by as many places as there are digits after the point.',
      'Special cases: E = <span class="bn">1111 1111</span> gives ±∞ (M = 0) or NaN (M ≠ 0); E = 0 gives ±0 (M = 0) or a denormalized number: m = (0.M)<sub>2</sub> and e = 1 − 127 = −126.'],
    h4: ['First write the word in binary (4 bits per hexadecimal digit): S is the 1<sup>st</sup> bit, E the next 11 (first 3 hexadecimal digits), M the last 52 (last 13 digits).',
      'Normalized number: e = E − 1023 and m = (1.M)<sub>2</sub>, then remove the point of m and take as much off the exponent.',
      'Denormalized (E = 0, M ≠ 0): e = 1 − 1023 = −1022 and m = (0.M)<sub>2</sub>. E full of 1s: ±∞ if M = 0, NaN otherwise.'],
    tr1: ['Storing the 1 before the point in M: it is hidden. 142 = (1.000111)<sub>2</sub> × 2<sup>7</sup> gives M = <span class="bn">000111</span>0…0.',
      'Padding M on the left: the 0s go on the right, after the significant digits.',
      'Writing E without its leading zeros: for 0.3125, E = 125 = <span class="bn">0111 1101</span>, on 8 bits.',
      'Encoding −64.25 in two’s complement: in IEEE 754, x and −x differ only by the S bit.'],
    tr2: ['Using the bias 127: in double precision it is 1023, and E has 11 bits.',
      'Normalizing 256 as (0.1)<sub>2</sub> × 2<sup>9</sup>: a normalized mantissa starts with “1.”, so 256 = (1.0)<sub>2</sub> × 2<sup>8</sup> and M = 0…0.',
      'Writing E on 8 bits out of habit: <span class="bn">100 0000 0111</span> has 11 bits.'],
    tr3: ['Forgetting to carry the point over to the exponent: (1.01)<sub>2</sub> × 2<sup>−5</sup> = (101)<sub>2</sub> × 2<sup>−7</sup> = −5 × 2<sup>−7</sup> for word 1, not 5 × 2<sup>−5</sup>.',
      'Using m = (1.M)<sub>2</sub> when E = 0: it is (0.M)<sub>2</sub>, with e = −126 (not −127).',
      'Taking FF80 0000 for a NaN: M = 0, it is −∞.'],
    tr4: ['Keeping the bias 127: in double precision, e = E − 1023, and e = −1022 for a denormalized number.',
      'Thinking 8000 0000 0000 0000 is “nothing”: it is −0 (S = 1, E = 0, M = 0).',
      'Thinking a NaN needs many 1 bits in M: FFF0 0001 0000 0000 has only one.',
      'Splitting the word in the wrong place: E takes the first 3 hexadecimal digits minus the sign bit, that is 11 bits; it spills over into the 3<sup>rd</sup> digit (417 → 0 | 100 0001 0111).'],
    note: 'Solution written with the steps of the course and of the official Tutorial 3 key published on Moodle; every word was recomputed by a program and matches.'
  };
  var M = {};
  T3.build(EN).forEach(function (ex) { M[ex.id] = ex; });
  R.i18n.patch(window.ARCHI_EX, T.fmt(M));
})();
