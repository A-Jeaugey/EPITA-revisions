/* English text for data/archi/ex-annales.js (merged over the French file by id, field by field).
   Statements are taken word for word from the English papers when they exist (B1 2025-2026 from Moodle; 2016-2017
   to 2023-2024 from Past-Exams; 2019-2020 from the English paper; 2020-2021 from the files named “midterm-2024” in
   folder 2025; 2021-2022 read on the image PDFs). Exam 1 2024-2025 has no English version: its statements use the
   wording of the 2023-2024 English paper. Vocabulary of Chapter_1.pdf, the Tutorials and the English papers
   (successive divisions, remainder, weight, groups of 4 digits, carry, borrow, partial products, dividend, divisor,
   two’s complement, 2’sC, unsigned / signed overflow, sign bit, MSB, ERROR, single / double precision, NaN).
   Decimal point everywhere, binary and hexadecimal included (1101.1000 1, BB.B4), comma as thousands separator.
   The cards are rebuilt with the French builder (window.ARCHI_EXB) and data (window.ARCHI_EXS), with the English
   text below; the hand-written cards (p2022-ex4, p2021-ex5, p2020-ex5) are written out in full. */
(function () {
  'use strict';
  var R = window.REV, SP = window.ARCHI_EXS || {};
  function nm(b) { return { 2: 'binary', 10: 'decimal', 16: 'hexadecimal', 8: 'octal' }[b] || 'base ' + b; }
  function ord(n) { var s = n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th'; return n + '<sup>' + s + '</sup>'; }
  function zs(n) { return n + (n > 1 ? ' zeros' : ' zero'); }
  var EN = {
    sep: '.', th: ',',
    form: function (b) { return { 2: 'Binary', 10: 'Decimal', 16: 'Hexadecimal' }[b] || 'Base ' + b; },
    digits: function (n) { return '(' + n + ' digits after the point)'; },
    conv: {
      head: ['Number to Convert', 'Source Form', 'Destination Form', 'Result'],
      stepTitle: function (i, x, f, t) { return 'Row ' + i + ' · ' + x + ': ' + nm(f) + ' → ' + nm(t); },
      to10: function (f, p) {
        if (f === 2) return 'Sum of products: each 1 bit contributes its weight, a power of 2' + (p.frac ? ' (after the point: 2<sup>−1</sup> = 0.5; 2<sup>−2</sup> = 0.25; 2<sup>−3</sup> = 0.125…)' : '') + '. Add up the weights of the 1 bits.';
        if (f === 16) return 'Sum of products: each digit (A = 10 … F = 15) times its weight, a power of 16' + (p.frac ? ' (after the point: 16<sup>−1</sup> = 0.0625; 16<sup>−2</sup> = 0.00390625)' : '') + '.';
        return 'Sum of products: each digit times its weight, a power of ' + f + '.';
      },
      from10: function (t, p, d) {
        var s = 'Integer part ' + p.int + ': successive divisions by ' + t + ', remainders read from bottom to top' + (t > 10 ? ' (a remainder from 10 to ' + (t - 1) + ' is written with a letter: 10 = A, 11 = B…)' : '') + '.';
        if (p.frac) s += ' Fractional part 0.' + p.frac + ': successive multiplications by ' + t + '; the integer part of each product gives a digit (read from top to bottom) and only the fractional part goes on to the next row' +
          (d ? ', up to the ' + ord(d) + ' digit.' : ', until the fractional part is 0.');
        return s;
      },
      round: function (f, t, d, end, rd) {
        var s = end && end <= d ? 'The expansion ends by itself at the ' + ord(end) + ' digit.' : end ? 'The expansion ends at the ' + ord(end) + ' digit, but only ' + d + ' are kept, without rounding.' : 'The base-' + t + ' expansion of 0.' + f + ' is infinite: stop at the ' + ord(d) + ' digit, without rounding.';
        return s + (rd ? ' Rounding would give ' + rd + ': wrong, the answer keys always truncate.' : end && end <= d ? '' : ' Here, rounding would give the same result.');
      },
      grp: function (t, k, pi) {
        var s = 'Groups of ' + k + ' bits starting from the point: leftwards for the integer part, rightwards for the fractional part; each group gives one ' + nm(t) + ' digit.';
        if (pi.ip) s += ' The integer part is completed on the left with ' + zs(pi.ip) + ': <span class="bn">' + pi.int.replace(',', '.') + '</span>.';
        if (pi.fp) s += ' The fractional part is completed on the right with ' + zs(pi.fp) + ': <span class="bn">' + pi.frac0 + '</span> becomes <span class="bn">' + pi.frac + '</span>.';
        return s;
      },
      ungrp: function (f, k) { return 'Each ' + nm(f) + ' digit gives exactly ' + k + ' bits, zeros included (otherwise the weights shift). At the end, the leading zeros of the integer part and the trailing zeros of the fractional part can be dropped.'; },
      via2: function (f, t, kf, kt) { return 'Bases ' + f + ' and ' + t + ' are both powers of 2 (' + f + ' = 2<sup>' + kf + '</sup>, ' + t + ' = 2<sup>' + kt + '</sup>): go through base 2, ' + kf + ' bits per ' + nm(f) + ' digit, then groups of ' + kt + ' bits starting from the point.'; },
      pow: function (f, t, pairs, raw, res) { return f + ' = ' + t + '<sup>2</sup>: each base-' + f + ' digit is written with two base-' + t + ' digits (' + pairs + '), hence ' + raw + ' = ' + res + '. You can also go through base 10 (tools below).'; },
      via10: function (f, t) { return f + ' and ' + t + ' are not powers of the same integer: go through base 10 (sum of products, then successive divisions by ' + t + ').'; },
      result: function (src, res) { return 'Result: ' + src + ' = <strong>' + res + '</strong>.'; }
    },
    ops: {
      head: ['Base', 'Operation'], ahead: ['Operation', 'Result'],
      base: function (b) { return 'Base ' + b; },
      title: function (op, b, s) { return { sub: 'Subtraction', add: 'Addition', div: 'Division', mul: 'Multiplication' }[op] + ' in base ' + b + ' · ' + s; },
      sub: function () { return 'Subtraction, column by column from right to left, with the course method: when the top digit is too small, borrow 1; it gains <span class="bn">10<sub>2</sub></span> (2) and the bottom digit of the next column gains 1. The bottom number is completed on the left with 0s.'; },
      add: function (b, n) {
        return b === 16 ? 'Add each column with the decimal values of the digits (A = 10 … F = 15), convert the total into hexadecimal, write down the right digit and carry the rest.' + (n > 2 ? ' With three terms, a column is at most 15 × 3 + 2 = 47: the carry can be 2.' : '')
          : 'Add column by column, from right to left: 1 + 1 = <span class="bn">10<sub>2</sub></span> (0 carry 1), 1 + 1 + 1 = <span class="bn">11<sub>2</sub></span> (1 carry 1).';
      },
      cols: function (cols, b) {
        return '<ul>' + cols.map(function (c, k) {
          if (!c.cs.length) return '<li>The carry ' + c.cin + ' is left: it is the leading digit.</li>';
          var terms = (c.cin ? [String(c.cin)] : []).concat(c.cs), vals = (c.cin ? [c.cin] : []).concat(c.cs.map(function (ch) { return parseInt(ch, 36); }));
          var lit = terms.join(' + '), num = vals.join(' + ');
          return '<li>Column ' + (k + 1) + ': ' + lit + (lit !== num ? ' = ' + num : '') + ' = ' + c.sum + ' = <span class="bn">' + c.sum.toString(b).toUpperCase() + '<sub>' + b + '</sub></span>: write down ' + c.d + (c.cout ? ', carry ' + c.cout + '.' : ', no carry.') + '</li>';
        }).join('') + '</ul>';
      },
      mul: function (pos) { return 'One partial product for each 1 of the multiplier, shifted by the position of that digit; a 0 digit would only give a row of zeros, which the answer keys skip. Here the 1s of the multiplier are at positions ' + pos.join(', ') + ': ' + pos.length + ' partial products, shifted by ' + pos.join(', ') + ' place' + (pos.length > 1 || pos[0] > 1 ? 's' : '') + ', then add them column by column with the carries.'; },
      div: function () { return 'Long division as in base 10: take the smallest leading part of the dividend that contains the divisor, record a 1 in the quotient and subtract the divisor; then bring down the next digit: if the remainder is smaller than the divisor, record a 0 in the quotient, otherwise a 1 and subtract.'; },
      check: function (expr, res) { return 'Check in base 10: ' + expr + ', and ' + res + ' is indeed that number.'; },
      rem0: 'The final remainder is 0: the division is exact, as in every past paper.'
    },
    n8: {
      op: 'Operation', bin: 'Binary Result', dec: 'Decimal Value', u: 'Unsigned', s: 'Signed', err: 'ERROR',
      title: function (i, s) { return 'Row ' + i + ' · ' + s; },
      read: function (w, u, s, c) {
        return s >= 0 ? w + ': MSB 0, it is ' + u + ' both unsigned and signed.'
          : w + ' is ' + u + ' unsigned; signed, its MSB is 1: 2’sC(' + w + ') = ' + c + ' = ' + (-s) + ', so it is ' + String(s).replace('-', '−') + '.';
      },
      addRes: function (r, carry) { return carry ? 'The 9<sup>th</sup> bit is the carry out: it is lost, leaving ' + r + ' on 8 bits. This carry signals an unsigned overflow.' : 'No carry out: the 8-bit result is ' + r + '.'; },
      subRes: function (r, borrow) { return borrow ? 'The first number is the smaller one (unsigned): the subtraction borrows beyond bit 7 (the 1 added in front, which does not exist on 8 bits). Keep the 8 bits: ' + r + '. This borrow out signals an unsigned overflow.' : 'No borrow beyond bit 7: the 8-bit result is ' + r + '.'; },
      uns: function (e, v) { return 'Unsigned: ' + e + (v == null ? ', outside 0 … 255: <strong>ERROR</strong>.' : ': <strong>' + v + '</strong>.'); },
      sig: function (e, v, extra) { return 'Signed: ' + e + (v == null ? ', outside −128 … 127: <strong>ERROR</strong>.' : ': <strong>' + v + '</strong>' + (extra ? ' (' + extra + ')' : '') + '.'); },
      neg: function (w, c, m) { return 'the word ' + w + ' starts with 1: 2’sC = ' + c + ' = ' + m + ', hence the minus sign'; },
      rule: function (na, nb, nr, op) {
        var s = function (n) { return n ? 'negative' : 'positive'; };
        return op === '+' ? 'Sign rule (Tutorial 2): ' + s(na) + ' + ' + s(nb) + ' gives a ' + s(nr) + ' result: two operands with the same sign and a result with the other sign, this is a signed overflow.'
          : 'Sign rule (Tutorial 2): ' + s(na) + ' − ' + s(nb) + ' gives a ' + s(nr) + ' result: operands with opposite signs and a result without the sign of the first one, this is a signed overflow.';
      }
    },
    ie: {
      h1: ['Number', 'S', 'E', 'M'], h2: ['IEEE-754 Representation (base 16)', 'Associated Representation'], field: 'Field', val: 'Value (binary)',
      a1: 'Single precision: the three fields in binary, without spaces, as on the worksheet.', a2: 'Double precision:',
      encTitle: function (x) { return 'Encode ' + x + ' in single precision'; },
      decTitle: function (w) { return 'Decode ' + w + ' (double precision)'; },
      enc: function (x, bin, nrm, e, E10, Eb, m, S) {
        return x + ' = ' + bin + ' = ' + nrm + ': move the point just after the first 1, ' + Math.abs(e) + ' place' + (Math.abs(e) > 1 ? 's' : '') + ' to the ' + (e >= 0 ? 'left' : 'right') + (e >= 0 ? '' : ' (negative exponent)') + '. ' +
          'S = ' + S + ' (positive number). E = ' + (e < 0 ? '−' + (-e) : e) + ' + 127 = ' + E10 + ' = ' + Eb + ', written on 8 bits. M = the digits after the point, ' + m + ', completed on the right with 0s up to 23 bits (the 1 before the point is not stored).';
      },
      fields: function (h3, b12, S, Eb, E10, mh) { return 'The first 3 hexadecimal digits ' + h3 + ' give the first 12 bits ' + b12 + ': S = ' + S + ' (first bit), E = ' + Eb + ' (the next 11) = ' + E10 + '. M = the last 13 hexadecimal digits, ' + mh + ' (52 bits).'; },
      nan: function (S) { return 'E is all 1s (2047 = 7FF<sub>16</sub>) and M is not 0: this is not a number, the representation is <strong>NaN</strong>' + (S === '1' ? ' (the sign of a NaN does not matter: do not write “−NaN”)' : ' (a single 1 bit in M is enough)') + '.'; },
      inf: function (S) { return 'E is all 1s (2047 = 7FF<sub>16</sub>) and M is 0: this is infinity, ' + (S === '1' ? '<strong>−∞</strong>' : '<strong>+∞</strong>') + ' since S = ' + S + '. This paper has no answer key: the expected writing is most likely “+∞”.'; },
      sub: function (v, p1022, mt, f, pn, res) { return 'E = 0 and M is not 0: denormalized number. No implicit 1, and the exponent is −1022 (not 0 − 1023): the value is ' + v + ' × ' + p1022 + '. Move the point ' + f + ' places to the right and subtract ' + f + ' from the exponent: ' + mt + ' × ' + pn + ' = <strong>' + res + '</strong>.'; },
      norm: function (E10, e, v, pe, kb, f, pn, res) {
        return 'E is neither 0 nor 2047: normalized number, exponent ' + E10 + ' − 1023 = ' + (e < 0 ? '−' + (-e) : e) + '; the value is ' + v + ' × ' + pe + '. ' +
          (f ? 'Move the point ' + f + ' place' + (f > 1 ? 's' : '') + ' to the right to get an (odd) integer and subtract ' + f + ' from the exponent: ' + kb + ' × ' + pn + ' = <strong>' + res + '</strong>.' : 'Representation: <strong>' + res + '</strong>.');
      }
    }
  };
  var K = window.ARCHI_EXB.make(EN);
  var bn = K.bn, w8 = K.w8, P = K.P, tool = K.tool, pow2 = K.pow2;
  function B(s) { return '<span class="bn">' + s + '</span>'; }
  var MAP = {};
  /* fiche fabriquée : mêmes données que la fiche française, textes anglais */
  function card(id, txt) { var sp = SP[id]; MAP[id] = sp ? K[sp.type](sp.spec, txt) : txt; }

  /* ---------- statements (verbatim) and shared texts ---------- */
  var K_CONV = P('Convert the following numbers from the source form into the destination form. Do not write down the result in a fraction or a power form (e.g. write down 0.25 and not ¼ or 2<sup>−2</sup>). Write down the result only (do not show any calculation).');
  var K_OP = P('Perform the operations below. <strong>Show all calculations.</strong>');
  var K_8 = 'Perform the following 8-bit binary operations (the two operands and the result are 8 bits wide). Then, convert the result into unsigned and signed decimal values. If an overflow occurs, write down ‘ERROR’ instead of the decimal value.';
  var K_IE1 = '1. Convert the numbers below into their <strong>single-precision</strong> IEEE-754 representations. Write down the final result in its <strong>binary form</strong> and specify the three fields.';
  var K_IE2 = '2. Convert the <strong>double-precision</strong> IEEE-754 words below into their associated representations. If a representation is a number, use the base-10 following form: <i>k</i>×2<sup><i>n</i></sup> where <i>k</i> and <i>n</i> are integers (either positive or negative).';
  function base8(op) { return '<p class="muted">The paper also asks for an addition in base 8 (' + op + '), not on this year’s syllabus: it is left out of this page.</p>'; }
  var OLD = 'The rows in base 8 and in the other bases follow the course methods, but this kind of row has not appeared since 2023 (bases 2, 10 and 16 only).';
  var H_TO10 = 'To base 10: write the sum of products, digit × weight. After the point, the weights are 2<sup>−1</sup> = 0.5; 2<sup>−2</sup> = 0.25; 2<sup>−3</sup> = 0.125… in binary and 16<sup>−1</sup> = 0.0625; 16<sup>−2</sup> = 0.00390625 in hexadecimal.';
  var H_FROM10 = 'From base 10: successive divisions for the integer part (remainders read from bottom to top), successive multiplications for the fractional part (integer parts read from top to bottom). “n digits after the point”: stop at the n-th digit, without rounding.';
  var H_FROM10S = H_FROM10.split(' “')[0];
  var H_GRP = 'Base 2 ↔ base 16: groups of 4 bits starting from the point, completed with 0s on the left of the integer part and on the right of the fractional part. Each hexadecimal digit gives exactly 4 bits.';
  var H_OLD = 'Bases 8 and 16: both powers of 2, go through base 2 (3 bits per octal digit, 4 per hexadecimal digit). Base 9 → base 3: 9 = 3<sup>2</sup>, each digit gives two digits. Otherwise, go through base 10.';
  var T_ROUND = 'Rounding the last digit asked for: the answer keys always truncate, you simply stop the multiplications.';
  var H_SUB = 'Subtraction: from right to left; when you borrow, the top digit gains 2 and the bottom digit of the next column gains 1.';
  var HX = '19 = 13<sub>16</sub>, write down 3 and carry 1';
  var H_HEX = 'Hexadecimal addition: add each column in decimal (A = 10 … F = 15), then rewrite the total in base 16: ' + HX + '.';
  function hex(s) { return H_HEX.replace(HX, s); }
  function hdiv(d, x) { return 'Division: ' + d + ' goes once into ' + x + '; for each digit brought down, record 1 in the quotient if the remainder contains the divisor, 0 otherwise.'; }
  var T_DIV0 = 'Forgetting a 0 in the quotient when the remainder is smaller than the divisor: the quotient loses a digit and everything shifts.';
  var T_HEXCOL = 'Leaving a column total in decimal: in base 16, 28 is written 1C, write down C and carry 1.';
  var T_BORROW = 'Adding the borrow to the top digit of the next column: with the course method, the bottom digit gains 1.';
  var H_N8 = ['Work out the 8-bit word first (addition or subtraction), and keep the 8 rightmost bits, even if there is a carry or a borrow beyond.',
    'For the decimal columns, redo the operation on the values: unsigned, the result must stay between 0 and 255; signed, between −128 and 127. Otherwise: ERROR.',
    'A word starting with 1 is negative when signed: take its two’s complement to read its absolute value.'];
  var T_N8 = ['Leaving the binary result empty when there is an overflow: always write the 8-bit word; ERROR only goes in the decimal column concerned.',
    'Mixing up carry and signed overflow: the carry (or borrow) out of bit 7 signals the unsigned overflow; the signed overflow is read on the signs.'];
  var H_IE = ['Encode: write the number in binary, normalize it as 1.… × 2<sup><i>e</i></sup>, then E = <i>e</i> + 127 on 8 bits and M = the digits after the point, completed on the right up to 23 bits.',
    'Decode a double-precision word (the statement says “words” but gives them in hexadecimal): the first 3 hexadecimal digits give S and E (11 bits, bias 1023), the last 13 give M (52 bits).',
    'E all 1s: infinity if M = 0, NaN otherwise; E = 0: denormalized, 0.M × 2<sup>−1022</sup>. For <i>k</i> × 2<sup><i>n</i></sup>, move the point until you get an odd integer and subtract as much from the exponent.'];
  var T_IE = ['Using the bias 127 for a double-precision word: it is 1023 (11 exponent bits).', 'Storing the 1 before the point in M: it is implicit.'];
  var NOTE_B1 = 'Official answer key from Moodle, for enrolled students only: every answer was recomputed by a program and matches.';
  var NOTE_NONE = 'No official answer key (the past exams only have the paper, in an adapted version): answers recomputed and checked by a program.';
  var NOTE_OK = 'All answers were recomputed by a program: the answer key is correct.';
  var G_CONV = function (p, n) { return p + ' points for the ' + n + ' rows; the breakdown is not printed. Only the result is expected.'; };
  var T_CONV = 'Conversions between bases 2, 10 and 16', T_OPS4 = 'Binary subtraction, hexadecimal addition, binary division and multiplication',
    T_OPS3 = 'Binary subtraction, hexadecimal addition, binary division', T_N8T = 'Operations on 8 bits: unsigned, signed, overflows',
    T_IET = 'IEEE 754: single-precision encoding, double-precision decoding';

  /* =====================================================================
     B1 Examination 2025-2026 (class of 2030), 1 hr, 20 points
     ===================================================================== */
  card('p2025-ex1', {
    src: 'B1 Exam 2025-2026 · Ex 1', title: T_CONV, intro: K_CONV,
    notes: {
      2: 'Trap: the result 210 looks decimal. In base 16, 210<sub>16</sub> = 2 × 256 + 1 × 16 + 0 = 528.',
      4: 'Trap: 0.28<sub>16</sub> is not 0.28. 0.28<sub>16</sub> = 2/16 + 8/256 = 0.125 + 0.03125 = 0.15625.',
      7: 'Completing on the left (' + B('0010 1101') + ' = 2D) would give BB.2D: wrong.'
    },
    hints: ['Rows 1, 2, 4 and 5. ' + H_TO10, 'Rows 3, 6 and 7. ' + H_FROM10, 'Row 8. ' + H_GRP],
    traps: ['Completing the last group on the wrong side: ' + B('1011 01') + ' after the point becomes ' + B('1011 0100') + ' (B4), not ' + B('0010 1101') + ' (2D).',
      'Reading 28.28<sub>16</sub> as 28.28: the integer part is 2 × 16 + 8 = 40 and the fractional part 0.15625.',
      'Writing a hexadecimal digit in decimal: 0.84 × 16 = 13.44 gives the digit D, not “13”.', T_ROUND],
    grading: G_CONV(4, 8), note: NOTE_B1
  });
  card('p2025-ex2', {
    src: 'B1 Exam 2025-2026 · Ex 2', title: 'Binary subtraction, three-term hexadecimal addition, binary division and multiplication', intro: K_OP,
    notes: { 3: 'This is exactly the multiplication of Exam 1 2023-2024 (Ex 2).' },
    hints: [H_SUB, H_HEX, hdiv('1001', '1010') + ' Multiplication: one row for each 1 of the multiplier, shifted by its position.'],
    traps: [T_DIV0, 'Shifting the partial products wrongly when skipping the 0s of the multiplier: 101010 has its 1s at positions 1, 3 and 5, hence shifts of 1, 3 and 5 places.', T_HEXCOL, T_BORROW],
    grading: '6 points for the 4 operations; the breakdown is not printed. All calculations must be shown.', note: NOTE_B1
  });
  card('p2025-ex3', {
    src: 'B1 Exam 2025-2026 · Ex 3', title: T_N8T, intro: P(K_8), hints: H_N8,
    traps: T_N8.concat(['Reading ' + B('10111101') + ' as 189 in the “Signed” column: signed, it is −67.',
      'Believing that a “positive − negative” subtraction cannot overflow: 84 − (−100) = 184 > 127.']),
    grading: '6 points for 3 rows of 3 cells; the breakdown is not printed.', note: NOTE_B1
  });
  card('p2025-ex4', {
    src: 'B1 Exam 2025-2026 · Ex 4', title: T_IET, q1: K_IE1, q2: K_IE2, hints: H_IE,
    traps: ['Writing E without its leading zeros: 0.09375 = ' + B('1.1<sub>2</sub>') + ' × 2<sup>−4</sup>, E = 123 = ' + B('01111011') + ', on 8 bits.',
      'Storing the 1 before the point: 320 = ' + B('1.01<sub>2</sub>') + ' × 2<sup>8</sup> gives M = ' + B('0100…0') + ', not ' + B('1010…0') + '.',
      T_IE[0], 'Believing a NaN needs many 1 bits in M: 7FF0 0001 0000 0000 is one.'],
    grading: '4 points for 4 rows (2 encodings, 2 decodings); the breakdown is not printed.', note: NOTE_B1
  });

  /* =====================================================================
     Exam 1 2024-2025 (class of 2029), 1 hr 30 min: adapted version, French only, no answer key
     ===================================================================== */
  var NOTE24 = NOTE_NONE + ' There is no English version: the statements use the wording of the 2023-2024 English paper.';
  card('p2024-ex1', {
    src: 'Exam 1 2024-2025 · Ex 1', title: T_CONV, intro: K_CONV,
    notes: { 1: 'Reading trap: 1BA follows a row whose answer is 443. 1BA<sub>16</sub> = 256 + 11 × 16 + 10 = 256 + 176 + 10 = 442.' },
    hints: ['Rows 1, 2, 5 and 6. ' + H_TO10, 'Rows 3, 4, 7 and 8. ' + H_FROM10, 'Rows 9 and 10. ' + H_GRP],
    traps: ['Rounding the 4<sup>th</sup> digit of 28.35: 0.35 × 16 = 5.6, then 0.6 × 16 = 9.6 endlessly; keep 1C.5999, not 1C.599A.',
      'Completing ' + B('1111 11') + ' on the left: after the point, complete on the right, ' + B('1111 1100') + ' = FC.',
      'Losing zeros from hexadecimal to binary: B7.53 → ' + B('1011 0111.0101 0011') + ' (the 5 and the 3 keep their 4 bits).',
      'Copying a neighbouring value: ' + B('1 1011 1011<sub>2</sub>') + ' = 443 and ' + B('1BA<sub>16</sub>') + ' = 442.'],
    grading: G_CONV(5, 10), note: NOTE24
  });
  card('p2024-ex2', {
    src: 'Exam 1 2024-2025 · Ex 2', title: 'Binary subtraction, three-term hexadecimal addition, binary division and multiplication', intro: K_OP,
    notes: { 1: 'First three-term hexadecimal addition in a paper, like the course example (3B5 + C1A + D2F); the 2025-2026 B1 exam keeps this format.' },
    hints: [H_SUB, hex('20 = 14<sub>16</sub>, write down 4 and carry 1'), hdiv('1010', '1011') + ' Multiplication: one row for each 1 of the multiplier, shifted by its position.'],
    traps: [T_DIV0, 'Shifting the partial products wrongly: 101100 has its 1s at positions 2, 3 and 5, hence shifts of 2, 3 and 5 places.', T_HEXCOL, T_BORROW],
    grading: '4 points for the 4 operations; the breakdown is not printed. All calculations must be shown.', note: NOTE24
  });
  card('p2024-ex3', {
    src: 'Exam 1 2024-2025 · Ex 3', title: T_N8T, intro: P(K_8),
    notes: {
      3: 'Limit case from the course: 127 + 1 gives ' + B('1000 0000') + ', which is 128 unsigned but −128 signed.',
      4: 'Another limit case: 255 + 1 “wraps around” to 0; signed, −1 + 1 = 0 is correct.'
    },
    hints: H_N8,
    traps: T_N8.concat([B('0111 1111') + ' + 1: no carry, so 128 is correct unsigned; but signed, 127 + 1 = 128 > 127: ERROR.',
      B('1111 1111') + ' + 1: the carry goes out (unsigned ERROR) while signed, −1 + 1 = 0 is correct.',
      'Reading ' + B('1010 1000') + ' as 168 when signed: it is −88 (2’sC = ' + B('0101 1000') + ' = 88).']),
    grading: '5 points for 5 rows of 3 cells; the breakdown is not printed.', note: NOTE24
  });
  card('p2024-ex4', {
    src: 'Exam 1 2024-2025 · Ex 4', title: T_IET, q1: K_IE1, q2: K_IE2,
    notes: { '0015 8000 0000 0000': 'Trap: 0015… looks like a denormalized number, but E = ' + B('000 0000 0001') + ' = 1 is not 0: the number is normalized, with the smallest possible exponent, 1 − 1023 = −1022.' },
    hints: H_IE,
    traps: ['Taking 0015 8000 0000 0000 for a denormalized number: E = 1, it is normalized (1.M × 2<sup>−1022</sup>).',
      'Answering NaN for 7FF0 0000 0000 0000: M is 0, it is +∞.',
      'Getting the direction of the exponent wrong: 0.15625 = ' + B('0.00101<sub>2</sub>') + ' = ' + B('1.01<sub>2</sub>') + ' × 2<sup>−3</sup>, so E = 124.', T_IE[0]],
    grading: '6 points for 6 rows (3 encodings, 3 decodings); the breakdown is not printed.', note: NOTE24
  });

  /* =====================================================================
     S1 – Examination 1 2023-2024 (class of 2028), 1 hr 30 min: first paper in the current format
     ===================================================================== */
  card('p2023-ex1', {
    src: 'Exam 1 2023-2024 · Ex 1', title: T_CONV, intro: K_CONV,
    notes: { 8: 'Each digit gives 4 bits: 8 → ' + B('1000') + ' and 1 → ' + B('0001') + '. Writing “' + B('1101 1100.11') + '” loses the inner zeros.' },
    hints: ['Rows 1, 2, 5 and 6. ' + H_TO10, 'Rows 3, 4, 7 and 8. ' + H_FROM10, 'Rows 9 and 10. ' + H_GRP],
    traps: ['Writing 12.3137 instead of 12.3D7: the integer part 13 of a product is written D in hexadecimal.',
      'Losing the inner zeros: DC.81 → ' + B('1101 1100.1000 0001') + '.',
      'Completing ' + B('1010100.10111') + ' on the wrong side: ' + B('0101 0100.1011 1000') + ' = 54.B8.', T_ROUND],
    grading: G_CONV(5, 10), note: NOTE_OK
  });
  card('p2023-ex2', {
    src: 'Exam 1 2023-2024 · Ex 2', title: T_OPS4, intro: K_OP,
    notes: { 3: 'The 2025-2026 B1 exam uses exactly this multiplication again.' },
    hints: [H_SUB, hex('4 + 9 = 13 = D<sub>16</sub>, write down D with no carry'), 'Division: 1100 goes once into 10010 (but not into 1001); for each digit brought down, record 1 in the quotient if the remainder contains the divisor, 0 otherwise.'],
    traps: [T_DIV0, 'Shifting the partial products wrongly: 101010 has its 1s at positions 1, 3 and 5.', T_HEXCOL,
      'Subtracting ' + B('11111111') + ' “in your head”: the borrows spread over almost every column; write the operation out.'],
    grading: '4 points for the 4 operations; the breakdown is not printed. All calculations must be shown.', note: NOTE_OK
  });
  card('p2023-ex3', {
    src: 'Exam 1 2023-2024 · Ex 3', title: T_N8T, intro: P(K_8),
    notes: { 3: 'Here the unsigned value overflows (200 − 226 < 0) but the signed one is correct: −56 − (−30) = −26.' },
    hints: H_N8,
    traps: T_N8.concat(['Writing ERROR in both columns as soon as one overflows: ' + B('11001000 − 11100010') + ' gives ERROR unsigned but −26 signed.',
      'Believing an addition without a carry never overflows: ' + B('01101001 + 01101110 = 11010111') + ', no carry, but 105 + 110 = 215 > 127 when signed.']),
    grading: '5 points for 5 rows of 3 cells; the breakdown is not printed.', note: NOTE_OK
  });
  card('p2023-ex4', {
    src: 'Exam 1 2023-2024 · Ex 4', title: T_IET, q1: K_IE1, q2: K_IE2,
    notes: { '000A 8000 0000 0000': 'This is the only denormalized number with an answer key in the past papers: the key does use 0.M × 2<sup>−1022</sup>; with −1023, you would get 21 × 2<sup>−1028</sup>, wrong.' },
    hints: H_IE,
    traps: ['Taking −1023 as the exponent of a denormalized number: it is −1022, like the smallest normalized number.',
      'Giving 6 × 2<sup>−173</sup> instead of 3 × 2<sup>−172</sup>: same value, but the answer keys always give an odd <i>k</i>.',
      'Writing “−NaN” for FFFF 0000 0000 0000: the sign of a NaN does not matter, the key writes NaN.', T_IE[1]],
    grading: '6 points for 6 rows (3 encodings, 3 decodings); the breakdown is not printed.', note: NOTE_OK
  });

  /* =====================================================================
     Midterm Exam S1 2022-2023 (class of 2027), 1 hr 30 min
     ===================================================================== */
  card('p2022-ex3', {
    src: 'Midterm 2022-2023 · Ex 3', title: 'Conversions, including bases 8, 7, 4 and 5', intro: K_CONV,
    notes: { 4: '151.32<sub>8</sub> is 105.40625: same result as row 4.', 6: 'Trap: same writing as the two previous rows, but here 151.32 is in base 16.' },
    hints: [H_TO10 + ' ' + H_FROM10S, H_GRP, H_OLD],
    traps: ['Reading 151.32<sub>16</sub> (row 7) as 151.32<sub>8</sub>: the source form changes from one row to the next.',
      'Multiplying the whole product: 0.88 × 16 = 14.08 gives E, then go on with 0.08 (0.08 × 16 = 1.28 gives 1).',
      T_ROUND + ' In base 7: 59.27 → 113.161.'],
    grading: G_CONV(5, 10), note: NOTE_OK + ' ' + OLD
  });
  MAP['p2022-ex4'] = {
    src: 'Midterm 2022-2023 · Ex 4 (and 2019-2020 · Ex 4)', title: 'On 8 bits: 250 + 10, 4 − 10, 120 + 10, −126 − 10',
    questions: [
      '<b>Part 1: Encoding unsigned integers</b><br>1. Let us consider the following 8-bit addition: 250 + 10<br>The two operands and the result are 8 bits wide. Write down the base-10 representation of the 8-bit result.',
      '2. Let us consider the following 8-bit subtraction: 4 − 10<br>The two operands and the result are 8 bits wide. Write down the base-10 representation of the 8-bit result.',
      '<b>Part 2: Encoding signed integers</b><br>3. Let us consider the following 8-bit addition: 120 + 10<br>The two operands and the result are 8 bits wide. Write down the base-10 representation of the 8-bit result.',
      '4. Let us consider the following 8-bit subtraction: −126 − 10<br>The two operands and the result are 8 bits wide. Write down the base-10 representation of the 8-bit result.'],
    hints: ['Write each number on 8 bits (the two’s complement for −126), do the operation and keep the 8 rightmost bits.',
      'Then read the word you get: unsigned (part 1), it is between 0 and 255; signed (part 2), between −128 and 127.'],
    solution: [
      { t: 'The idea: on 8 bits, the words form a cycle', html: P('An 8-bit word has no 9<sup>th</sup> bit: the carry or the borrow that goes out on the left is lost. After the largest word comes the smallest one again: unsigned, 255 + 1 gives 0 and 0 − 1 gives 255; signed, 127 + 1 gives −128. The wheel shows the same thing on 4 bits (16 words).') + tool('wheel', { value: 7 }) },
      { t: 'Part 1, question 1 · 250 + 10', html: P('250 = ' + w8('1111 1010') + ' and 10 = ' + w8('0000 1010') + '.') + tool('posed', { op: 'add', ops: ['11111010', '00001010'], base: 2, step: false }) +
        P('The 9<sup>th</sup> bit (the carry) is lost: ' + w8('0000 0100') + ' = <strong>4</strong> is left. The exact result, 260, is above 255 (unsigned overflow): the word is 260 − 256 = 4.') },
      { t: 'Part 1, question 2 · 4 − 10', html: P('4 = ' + w8('0000 0100') + ' and 10 = ' + w8('0000 1010') + '; 4 is the smaller one: the subtraction borrows beyond bit 7 (the 1 added in front).') + tool('posed', { op: 'sub', ops: ['100000100', '00001010'], base: 2, pad: true, step: false }) +
        P('Keep the 8 bits: ' + w8('1111 1010') + ' = <strong>250</strong>. The exact result, −6, is below 0 (unsigned overflow): the word is −6 + 256 = 250.') },
      { t: 'Part 2, question 3 · 120 + 10', html: P('120 = ' + w8('0111 1000') + ' and 10 = ' + w8('0000 1010') + ', two positive numbers.') + tool('posed', { op: 'add', ops: ['01111000', '00001010'], base: 2, step: false }) +
        P(w8('1000 0010') + ' starts with 1: it is negative. 2’sC(1000 0010) = ' + w8('0111 1110') + ' = 126, so the word is <strong>−126</strong>. The exact result, 130, is above 127 (signed overflow: positive + positive = negative): 130 − 256 = −126.') },
      { t: 'Part 2, question 4 · −126 − 10', html: P('−126 is encoded as 2’sC(' + w8('0111 1110') + ') = ' + w8('1000 0010') + '; 10 = ' + w8('0000 1010') + '.') + tool('posed', { op: 'sub', ops: ['10000010', '00001010'], base: 2, pad: true, step: false }) +
        P(w8('0111 1000') + ' starts with 0: it is <strong>120</strong>. The exact result, −136, is below −128 (signed overflow: negative − positive = positive): −136 + 256 = 120.') }],
    answer: K.ans(['8-bit operation', 'Result (base 10)'], [
      [['Unsigned: 250 + 10', '4'], { t: 'cyc', a: 250, op: '+', b: 10, sg: false }],
      [['Unsigned: 4 − 10', '250'], { t: 'cyc', a: 4, op: '-', b: 10, sg: false }],
      [['Signed: 120 + 10', '−126'], { t: 'cyc', a: 120, op: '+', b: 10, sg: true }],
      [['Signed: −126 − 10', '120'], { t: 'cyc', a: -126, op: '-', b: 10, sg: true }]]),
    traps: ['Answering “ERROR”: the question asks what the 8-bit word really contains (4, 250, −126, 120).',
      'Reading ' + B('1000 0010') + ' as 130 in part 2: signed, it is −126.',
      'Keeping the 9<sup>th</sup> bit: on 8 bits, the carry or the borrow that goes out on the left is lost.'],
    grading: '2 points for the 4 questions (in both papers); the breakdown is not printed.',
    note: 'Same questions in exercise 4 of 2019-2020 and of 2022-2023: they are the course examples (IV.1.4 and IV.2.5). Answers recomputed by a program.'
  };
  card('p2022-ex5', {
    src: 'Midterm 2022-2023 · Ex 5', title: T_OPS3, intro: K_OP + base8('7246 + 2653'),
    hints: [H_SUB, hex('8 + E = 22 = 16<sub>16</sub>, write down 6 and carry 1'), hdiv('1100', '10101')],
    traps: [T_DIV0, T_HEXCOL, T_BORROW],
    grading: '4 points for the 4 operations of the paper (including the base-8 addition); the breakdown is not printed.', note: NOTE_OK
  });

  /* =====================================================================
     Midterm Exam S1 2021-2022 (class of 2026), 1 hr 30 min
     ===================================================================== */
  card('p2021-ex3', {
    src: 'Midterm 2021-2022 · Ex 3', title: 'Conversions, including bases 8, 13, 5 and 7', intro: K_CONV,
    notes: { 9: 'Same row as in the 2020-2021 midterm (Ex 3).' },
    hints: [H_TO10 + ' ' + H_FROM10S, H_GRP, H_OLD],
    traps: ['In base 13, a remainder or an integer part of 10, 11 or 12 is written A, B or C (here 80 = 6 × 13 + 2: no letter).',
      'Losing zeros from base 8 to base 2: each digit gives 3 bits, 0.64<sub>8</sub> → ' + B('0.110 100') + ', then only the trailing 0s are dropped: ' + B('0.1101<sub>2</sub>') + '.', T_ROUND],
    grading: G_CONV(5, 10), note: NOTE_OK + ' ' + OLD
  });
  card('p2021-ex4', {
    src: 'Midterm 2021-2022 · Ex 4', title: T_OPS4, intro: K_OP + base8('5472 + 3521'),
    hints: [H_SUB, hex('7 + 7 = 14 = E<sub>16</sub>, write down E with no carry'), 'Multiplication: 1010110 has its 1s at positions 1, 2, 4 and 6; four partial products to add.'],
    traps: [T_DIV0, 'Adding four partial products at once: a column can be worth 4 = 100<sub>2</sub>, the carry then goes two places further.', T_HEXCOL],
    grading: '5 points for the 5 operations of the paper (including the base-8 addition); the breakdown is not printed.', note: NOTE_OK
  });
  MAP['p2021-ex5'] = {
    src: 'Midterm 2021-2022 · Ex 5', title: 'Negative powers of 2, patterns of a byte, number of bits when signed',
    questions: [
      '1. Work out the following negative powers of two:' + K.tbl(['Power', 'Answer'], ['2<sup>-8</sup>', '2<sup>-9</sup>', '2<sup>-10</sup>'].map(function (p) { return K.tr([K.td(p), K.td('')]); })),
      '2. In how many patterns can a byte be arranged?',
      '3. Determine the minimum number of bits required to encode the following signed number: <strong>8192</strong>',
      '4. Determine the minimum number of bits required to encode the following signed number: <strong>-8192</strong>'],
    hints: ['Question 1: start from 2<sup>−5</sup> = 0.03125 (to know by heart) and divide by 2 each time.',
      'Questions 3 and 4: on n signed bits, the range goes from −2<sup>n−1</sup> to 2<sup>n−1</sup> − 1. And 8192 = 2<sup>13</sup>.'],
    solution: [
      { t: 'Question 1 · divide by 2 each time', html: P('Each negative power of 2 is half the previous one:') +
        K.ans(['Power', 'Value'], [-5, -6, -7, -8, -9, -10].map(function (k) {
          return [[pow2(k), { '-5': '0.03125', '-6': '0.015625', '-7': '0.0078125', '-8': '0.00390625', '-9': '0.001953125', '-10': '0.0009765625' }[k]], { t: 'pow2', k: k }];
        })) + P('To practise the powers of 2:') + tool('drill', { kind: 'pow2' }) },
      { t: 'Question 2 · the patterns of a byte', html: P('A byte has 8 bits, each one is 0 or 1: 2<sup>8</sup> = <strong>256</strong> patterns, from ' + B('0000 0000') + ' to ' + B('1111 1111') + '.') },
      { t: 'Question 3 · 8192 when signed', html: P('On n signed bits, the largest integer is 2<sup>n−1</sup> − 1. As 8192 = 2<sup>13</sup>, you need 2<sup>n−1</sup> − 1 ≥ 2<sup>13</sup>, so n − 1 ≥ 14: <strong>15 bits</strong>. On 14 bits, the largest is 2<sup>13</sup> − 1 = 8191: 1 is missing.') +
        P('In binary, 8192 = ' + bn('10000000000000', 2) + ' (14 digits); a 0 is needed in front for the sign. Click 14: useful bits are lost.') + tool('register', { n: 15, value: '010000000000000', sizes: [14, 15, 16] }) },
      { t: 'Question 4 · −8192 when signed', html: P('The smallest integer on n signed bits is −2<sup>n−1</sup>. As −8192 = −2<sup>13</sup>, n − 1 = 13 is enough: <strong>14 bits</strong>, the word ' + bn('10000000000000', 2) + ' (sign bit 1, all the rest 0). The range is not symmetric: −8192 fits on 14 bits, 8192 does not.') +
        tool('register', { n: 14, value: '10000000000000', sizes: [14, 15, 16] }) }],
    answer: K.ans(['Question', 'Answer'], [
      [['1. 2<sup>−8</sup>', '0.00390625'], { t: 'pow2', k: -8 }], [['1. 2<sup>−9</sup>', '0.001953125'], { t: 'pow2', k: -9 }], [['1. 2<sup>−10</sup>', '0.0009765625'], { t: 'pow2', k: -10 }],
      [['2. Patterns of a byte', '256'], { t: 'patterns', n: 8 }],
      [['3. 8192 when signed', '15 bits'], { t: 'minbits', v: 8192 }], [['4. −8192 when signed', '14 bits'], { t: 'minbits', v: -8192 }]]),
    traps: ['Giving the same answer for 8192 and −8192: the signed range is not symmetric (15 bits versus 14).',
      'Counting the binary digits of 8192 (14) without adding the sign bit.',
      'Forgetting a zero: 2<sup>−8</sup> = 0.00390625, not 0.0390625. Each division by 2 adds one digit after the point.'],
    grading: '4 points for the 4 questions; the breakdown is not printed.', note: NOTE_OK
  };

  /* =====================================================================
     Midterm Exam S1 2020-2021 (class of 2025), 1 hr 30 min: different marking schemes in French and English
     ===================================================================== */
  card('p2020-ex3', {
    src: 'Midterm 2020-2021 · Ex 3', title: 'Conversions, including bases 8, 5, 9 and 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10S, H_GRP, H_OLD],
    traps: ['Hexadecimal → base 8: do not convert digit by digit; go through base 2, then groups of 3 bits starting from the point.',
      'Forgetting a zero digit in base 3: 40<sub>9</sub> gives 11 and 00, that is ' + B('1100<sub>3</sub>') + ', not ' + B('11<sub>3</sub>') + '.', T_ROUND],
    grading: G_CONV(5, 10), note: NOTE_OK + ' ' + OLD
  });
  MAP['p2020-ex5'] = {
    src: 'Midterm 2020-2021 · Ex 5 (and 2016-2017, 2018-2019 · Ex 6)', title: 'On n bits: how many integers, the largest, the smallest',
    questions: [
      '1. In terms of n, how many n-bit unsigned integers can be encoded?',
      '2. In terms of n, how many n-bit signed integers can be encoded?',
      '3. In terms of n, what is the largest n-bit unsigned integer that can be encoded?',
      '4. In terms of n, what is the largest n-bit signed integer that can be encoded?',
      '5. In terms of n, what is the smallest n-bit signed integer that can be encoded?',
      '6. The one’s complement inverts each bit of a word. Answer true or false. <span class="muted">(2020-2021 only)</span>'],
    hints: ['Try with n = 4: 16 words, from ' + B('0000') + ' to ' + B('1111') + '.', 'Signed (two’s complement), the MSB is the sign bit: half of the words are negative.'],
    solution: [
      { t: 'Questions 1 and 2 · how many words?', html: P('Each bit is 0 or 1: an n-bit word can be arranged into 2 × 2 × … × 2 = <strong>2<sup>n</sup></strong> patterns. Unsigned, they encode 0 … 2<sup>n</sup> − 1. Signed, the same 2<sup>n</sup> words are split into two halves (MSB 0: zero and positive integers; 1: negative integers): again <strong>2<sup>n</sup></strong> integers.') +
        P('On 4 bits: 16 words, from 0 to 15 unsigned (inside), from −8 to 7 signed (outside).') + tool('wheel', { value: 7 }) },
      { t: 'Question 3 · the largest unsigned integer', html: P('All bits at 1: 1 + 2 + 4 + … + 2<sup>n−1</sup> = <strong>2<sup>n</sup> − 1</strong>. On 8 bits: ' + B('1111 1111') + ' = 255 = 2<sup>8</sup> − 1.') },
      { t: 'Questions 4 and 5 · signed integers', html: P('Half of the words, 2<sup>n−1</sup>, encode the negative integers −2<sup>n−1</sup> … −1; the other 2<sup>n−1</sup> encode 0 … 2<sup>n−1</sup> − 1. The largest is ' + B('0111…1') + ' = <strong>2<sup>n−1</sup> − 1</strong>, the smallest ' + B('1000…0') + ' = <strong>−2<sup>n−1</sup></strong>: there is one more negative integer than positive ones.') +
        K.ans(['Bits', 'Unsigned', 'Signed'], [4, 8, 16].map(function (n) {
          return [[String(n), '0 … ' + K.dec(Math.pow(2, n) - 1), K.dec(-Math.pow(2, n - 1)) + ' … ' + K.dec(Math.pow(2, n - 1) - 1)], { t: 'range', n: n }];
        }), 2) + P('The register shows both readings of the same word; change its size with 4, 8, 16.') + tool('register', { n: 8, value: '01111111', sizes: [4, 8, 16] }) },
      { t: 'Question 6 · the one’s complement', html: P('<strong>True</strong>: this is the definition in the course (III.2). For example, ' + B('0011 0110') + ' becomes ' + B('1100 1001') + '. The two’s complement adds one to the one’s complement. Try the “One’s complement” button.') +
        tool('register', { n: 8, value: '00110110', sizes: [8] }) }],
    answer: K.ans(['Question', 'Answer'], [
      [['1. n-bit unsigned integers', '2<sup>n</sup>'], { t: 'kn', q: 'countU' }], [['2. n-bit signed integers', '2<sup>n</sup>'], { t: 'kn', q: 'countS' }],
      [['3. Largest unsigned', '2<sup>n</sup> − 1'], { t: 'kn', q: 'maxU' }], [['4. Largest signed', '2<sup>n−1</sup> − 1'], { t: 'kn', q: 'maxS' }],
      [['5. Smallest signed', '−2<sup>n−1</sup>'], { t: 'kn', q: 'minS' }], [['6. One’s complement', 'True'], { t: 'ones', w: '00110110' }]]),
    traps: ['Answering 2<sup>n</sup> for the largest unsigned integer: you start at 0, so you stop at 2<sup>n</sup> − 1.',
      'Answering 2<sup>n−1</sup> for the number of signed integers: there are as many as unsigned ones, 2<sup>n</sup>.',
      'Writing −(2<sup>n−1</sup> − 1) for the smallest signed integer: it is −2<sup>n−1</sup> (−128 on 8 bits).'],
    grading: '2020-2021: 6 points for the 6 questions in the French paper, 4 points in the English paper. 2016-2017 and 2018-2019: 4 points for questions 1 to 5.',
    note: 'Questions 1 to 5 are the same in 2016-2017 (Ex 6) and 2018-2019 (Ex 6); question 6 only exists in 2020-2021. The three answer keys give these answers, recomputed by a program.'
  };

  /* =====================================================================
     Midterm Exam S1 2019-2020 (class of 2024)
     ===================================================================== */
  card('p2019-ex3', {
    src: 'Midterm 2019-2020 · Ex 3', title: 'Conversions, including bases 8, 7, 9 and 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10S, H_GRP, H_OLD],
    traps: ['Writing 403.5 for 1027.5: 0.5 × 16 = 8, the base-16 fractional part is 8.',
      'Keeping the leading zeros: ' + B('0000 1101 1101.0101') + ' is written DD.5 (not 0DD.50).', T_ROUND],
    grading: G_CONV(4, 8), note: NOTE_OK + ' ' + OLD
  });
  card('p2019-ex5', {
    src: 'Midterm 2019-2020 · Ex 5', title: T_OPS3, intro: K_OP + base8('4257 + 7777'),
    notes: { 1: 'No 5<sup>th</sup> digit here: the last column produces no carry.', 2: 'This is the division of the 2016-2017 midterm (Ex 5).' },
    hints: [H_SUB, hex('9 + 1 = 10 = A<sub>16</sub>, write down A with no carry'), hdiv('1011', '1100')],
    traps: [T_DIV0, 'Adding a leading digit out of habit: 6CD9 + 8FA1 = FC7A, with no final carry.', T_HEXCOL],
    grading: '4 points for the 4 operations of the paper (including the base-8 addition); the breakdown is not printed.', note: NOTE_OK
  });

  /* =====================================================================
     Midterm Exam S1 2018-2019 (class of 2023): English answer key only
     ===================================================================== */
  card('p2018-ex3', {
    src: 'Midterm 2018-2019 · Ex 3', title: 'Conversions, including bases 8, 5, 9 and 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10S, H_GRP, H_OLD],
    traps: ['Rounding 141.3: 0.3 × 16 = 4.8 (4), then 0.8 × 16 = 12.8 (C); write 8D.4C, like the answer key, not 8D.4D.',
      'Completing ' + B('0110111') + ' on the left: after the point, ' + B('0110 1110') + ' = 6E.', 'Reading 0.3<sub>16</sub> as 0.3: D7.3<sub>16</sub> = 215 + 3/16 = 215.1875.'],
    grading: G_CONV(4, 8), note: NOTE_OK + ' ' + OLD
  });
  card('p2018-ex5', {
    src: 'Midterm 2018-2019 · Ex 5', title: T_OPS3, intro: K_OP + base8('7654 + 3210'),
    hints: [H_SUB, hex('8 + 4 = 12 = C<sub>16</sub>, write down C with no carry'), hdiv('1110', '10011')],
    traps: [T_DIV0, T_HEXCOL, T_BORROW],
    grading: '4 points for the 4 operations of the paper (including the base-8 addition); the breakdown is not printed.', note: NOTE_OK
  });

  /* =====================================================================
     Midterm Exam S1 2017-2018 (class of 2022)
     ===================================================================== */
  card('p2017-ex2', {
    src: 'Midterm 2017-2018 · Ex 2', title: 'Conversions, including bases 8, 5, 9 and 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10S, H_GRP, H_OLD],
    traps: ['0.4 in base 16: 0.4 × 16 = 6.4, then 0.4 comes back, hence 0.666…; with 2 digits, 7D.66.',
      'Losing 0s in the fractional part: 0.0625 = 2<sup>−4</sup> is written ' + B('0.0001<sub>2</sub>') + '.', T_ROUND],
    grading: G_CONV(4, 8), note: NOTE_OK + ' ' + OLD
  });
  card('p2017-ex3', {
    src: 'Midterm 2017-2018 · Ex 3', title: T_N8T, intro: P(K_8 + ' Write down the result only (do not show any calculation).'),
    notes: { 1: 'Here the carry goes out (unsigned ERROR) but the signed value is correct: −116 + 126 = 10.' },
    hints: H_N8,
    traps: T_N8.concat(['Writing ERROR when signed because of the carry of ' + B('10001100 + 01111110') + ': signed, −116 + 126 = 10 is correct.']),
    grading: '4 points for 4 rows of 3 cells; the breakdown is not printed. Only the result is expected.', note: NOTE_OK
  });
  card('p2017-ex4', {
    src: 'Midterm 2017-2018 · Ex 4', title: T_OPS3, intro: K_OP + base8('3734 + 4725'),
    hints: [H_SUB, hex('C + B = 23 = 17<sub>16</sub>, write down 7 and carry 1'), hdiv('1101', '10001')],
    traps: [T_DIV0, T_HEXCOL, T_BORROW],
    grading: '4 points for the 4 operations of the paper (including the base-8 addition); the breakdown is not printed.', note: NOTE_OK
  });

  /* =====================================================================
     Midterm Exam S1 2016-2017 (class of 2021): paper and answer key in English only
     ===================================================================== */
  card('p2016-ex3', {
    src: 'Midterm 2016-2017 · Ex 3', title: 'Conversions, including bases 8, 7, 9 and 3', intro: K_CONV,
    hints: [H_TO10 + ' ' + H_FROM10S, H_GRP, H_OLD],
    traps: ['Rounding 515.3: 0.3 × 16 = 4.8 (4), then 0.8 × 16 = 12.8 (C); the key writes 203.4C, not 203.4D. This proves the answer keys truncate.',
      'Forgetting the leading zero of a 2-digit group in base 3: 24<sub>9</sub> gives 02 and 11, that is ' + B('211<sub>3</sub>') + '.', 'Reading 0.9<sub>16</sub> as 0.9: 1AD.9<sub>16</sub> = 429 + 9/16 = 429.5625.'],
    grading: G_CONV(4, 8), note: NOTE_OK + ' ' + OLD
  });
  card('p2016-ex5', {
    src: 'Midterm 2016-2017 · Ex 5', title: T_OPS3, intro: K_OP + base8('5633 + 7247'),
    notes: { 2: 'The 2019-2020 midterm uses this division again.' },
    hints: [H_SUB, hex('B + 9 = 20 = 14<sub>16</sub>, write down 4 and carry 1'), hdiv('1011', '1100')],
    traps: [T_DIV0, 'Keeping the leading zeros of the subtraction result: ' + B('0 0110 1111') + ' is written ' + B('110 1111') + '.', T_HEXCOL],
    grading: '4 points for the 4 operations of the paper (including the base-8 addition); the breakdown is not printed.', note: NOTE_OK
  });

  R.i18n.patch(window.ARCHI_EX, MAP);
})();
