/* English text for data/archi/exams.js (merged over the French file: ARCHI_TOPICS by key, ARCHI_EXAMS by `key`).
   English papers and answer keys (checked on disk in a clone of Epidocs/Past-Exams) are listed first; the 2020-2021
   English files are the ones named “midterm-2024” in folder 2025. */
(function () {
  var R = window.REV;
  R.i18n.patch(window.ARCHI_TOPICS, {
    'bases': 'Positional notation',
    'vers-10': 'To base 10',
    'depuis-10': 'From base 10',
    'fraction': 'Fractional parts, truncation',
    'paquets': 'Base 2 ↔ base 16 (groups)',
    'addition': 'Addition (bases 2 and 16)',
    'soustraction': 'Binary subtraction',
    'multiplication': 'Binary multiplication',
    'division': 'Binary division',
    'non-signe': 'Unsigned integers',
    'signe': 'Signed integers (two’s complement)',
    'depassement': 'Overflows',
    'plages': 'Ranges',
    'ieee-encodage': 'IEEE 754: encoding',
    'ieee-decodage': 'IEEE 754: decoding',
    'ieee-special': 'IEEE 754: special values',
    'codes': 'BCD, Gray, ASCII',
    'hors-programme': 'Not on the syllabus'
  });

  var PE = 'https://past-exams.epidocs.eu/S1/Midterms/Archi/';
  function f4(promo, sen, cen, sfr, cfr) {
    var o = [], d = PE + promo + '/';
    if (sen) o.push({ t: 'Paper (English)', url: d + sen });
    if (cen) o.push({ t: 'Answer key (English)', url: d + cen });
    if (sfr) o.push({ t: 'Paper (French)', url: d + sfr });
    if (cfr) o.push({ t: 'Answer key (French)', url: d + cfr });
    return o;
  }
  function std(promo) { var n = 'midterm-' + promo + '-s1-archi-'; return f4(promo, n + 'subject-en.pdf', n + 'correction-en.pdf', n + 'subject-fr.pdf', n + 'correction-fr.pdf'); }
  var NS = ' (not on the syllabus)';

  R.i18n.patch(window.ARCHI_EXAMS, {
    p2025: { title: 'B1 Examination 2025-2026', meta: 'class of 2030 · 1 hr · 20 points',
      note: 'Last year’s end-of-semester exam, provided on Moodle with its answer key, in French and English. It lasts 1 hr, against 1 hr 30 min for the previous papers, with fewer rows. Same layout as since 2023: conversions, operations, 8-bit operations, IEEE 754. The multiplication is the one of 2023-2024. The official answer key is entirely correct (recomputed).',
      files: [{ t: 'Paper and answer key, English and French: Moodle folder “Examen terminal 2025-2026” (enrolled students only)', url: 'https://moodle.epita.fr/mod/folder/view.php?id=108465' }],
      parts: [
        { t: 'Conversions between bases 2, 10 and 16 (8 rows)' },
        { t: 'Operations: binary subtraction, three-term hexadecimal addition, binary division and multiplication' },
        { t: '8-bit operations: binary result, unsigned and signed values (3 rows)' },
        { t: 'IEEE 754: single-precision encoding, double-precision decoding' }] },

    p2024: { title: 'Exam 1 2024-2025', meta: 'class of 2029 · 1 hr 30 min · 20 points',
      note: 'The past exams only have the French paper, in an adapted version (OpenDyslexic font, 6 pages): no English version and no answer key. The answers on this site are recomputed by a program. New features kept in 2025-2026: three-term hexadecimal addition, binary numbers written in groups of 4.',
      files: [{ t: 'Paper (French, adapted version)', url: PE + '2029/midterm-2029-s1-archi-subject-fr.pdf' }],
      parts: [
        { t: 'Conversions between bases 2, 10 and 16 (10 rows)' },
        { t: 'Operations: binary subtraction, three-term hexadecimal addition, binary division and multiplication' },
        { t: '8-bit operations (5 rows, including 127 + 1 and 255 + 1)' },
        { t: 'IEEE 754: single-precision encoding, double-precision decoding (including +∞)' }] },

    p2023: { title: 'Exam 1 2023-2024', meta: 'class of 2028 · 1 hr 30 min · 20 points',
      note: 'First paper in the current format: four exercises (conversions, operations, 8-bit operations, IEEE 754), no more powers of two, binary prefixes or base 8. Official answer key in English and French, entirely correct (recomputed), with the only denormalized number of the past papers.',
      files: std(2028),
      parts: [
        { t: 'Conversions between bases 2, 10 and 16 (10 rows)' },
        { t: 'Operations: binary subtraction, hexadecimal addition, binary division and multiplication' },
        { t: '8-bit operations (5 rows)' },
        { t: 'IEEE 754: single-precision encoding, double-precision decoding (including a denormalized number and a NaN)' }] },

    p2022: { title: 'Midterm Exam S1 2022-2023', meta: 'class of 2027 · 1 hr 30 min · 20 points',
      note: 'Last paper in the old format. Not on this year’s syllabus: exercises 1 (powers of two), 2 (binary prefixes) and 6 (memory map), and the base-8 addition of exercise 5. Exercise 4 is the one of 2019-2020. Official answer key in English and French, correct.',
      files: std(2027),
      parts: [
        { t: 'Simplify expressions as a power of two' + NS },
        { t: 'Binary prefixes: bytes and bits (Ki, Mi, Gi)' + NS },
        { t: 'Conversions, including bases 8, 7, 4 and 5 (10 rows)' },
        { t: 'On 8 bits: 250 + 10, 4 − 10, 120 + 10, −126 − 10' },
        { t: 'Operations: binary subtraction, hexadecimal addition, binary division (the base-8 addition is not on the syllabus)' },
        { t: 'Memories: address lines, highest addresses, memory map' + NS }] },

    p2021: { title: 'Midterm Exam S1 2021-2022', meta: 'class of 2026 · 1 hr 30 min · 20 points',
      note: 'The English files of the past exams are image PDFs (same content as the French ones). Not on this year’s syllabus: exercises 1 (powers of two) and 2 (binary prefixes), and the base-8 addition of exercise 4. The key writes “1 GB = 8 Gib” (exercise 2, not on the syllabus): correct only if GB is read as GiB. Otherwise, the official answer key is correct.',
      files: std(2026),
      parts: [
        { t: 'Simplify expressions as a power of two' + NS },
        { t: 'Binary prefixes: bytes and bits (Ki, Mi, Gi)' + NS },
        { t: 'Conversions, including bases 8, 13, 5 and 7 (10 rows)' },
        { t: 'Operations: subtraction, hexadecimal addition, division, multiplication (the base-8 addition is not on the syllabus)' },
        { t: 'Negative powers of 2, patterns of a byte, number of bits for ±8192 when signed' }] },

    p2020: { title: 'Midterm Exam S1 2020-2021', meta: 'class of 2025 · 1 hr 30 min · 20 points',
      note: 'No operations exercise in this paper. The English files are stored in folder 2025 under the name “midterm-2024”: they really are the English versions of 2020-2021. The marking schemes differ: exercise 4 is worth 3 points in French, 5 in English; exercise 5 is worth 6 points in French, 4 in English (this site follows the French one). Not on this year’s syllabus: exercises 1, 2 and 4. The official answer key is correct.',
      files: f4(2025, 'midterm-2024-s1-archi-subject-en.pdf', 'midterm-2024-s1-archi-correction-en.pdf', 'midterm-2025-s1-archi-subject-fr.pdf', 'midterm-2025-s1-archi-correction-fr.pdf'),
      parts: [
        { t: 'Simplify expressions as a power of two' + NS },
        { t: 'Binary prefixes: bits and bytes (Ki, Mi, Gi)' + NS },
        { t: 'Conversions, including bases 8, 5, 9 and 3 (10 rows)' },
        { t: 'Unknown bases: 22<sub>b</sub> × 25<sub>b</sub> = 50A<sub>b</sub>, 208<sub>a</sub> = 808<sub>b</sub>' + NS },
        { t: 'On n bits: number of integers, largest and smallest; one’s complement (true or false)' }] },

    p2019: { title: 'Midterm Exam S1 2019-2020', meta: 'class of 2024 · 1 hr 30 min · 20 points',
      note: 'The past exams have no French paper (the French statement comes from the French answer key). The division is the one of 2016-2017 and exercise 4 uses the course examples (same exercise in 2022-2023). Not on this year’s syllabus: exercises 1, 2 and 6, and the base-8 addition of exercise 5. The official answer key is correct.',
      files: f4(2024, 'midterm-2024-s1-archi-subject-en.pdf', 'midterm-2024-s1-archi-correction-en.pdf', null, 'midterm-2024-s1-archi-correction-fr.pdf'),
      parts: [
        { t: 'Simplify expressions as a power of two' + NS },
        { t: 'Binary prefixes: bits and bytes (Ki, Mi, Gi)' + NS },
        { t: 'Conversions, including bases 8, 7, 9 and 3 (8 rows)' },
        { t: 'On 8 bits: 250 + 10, 4 − 10, 120 + 10, −126 − 10' },
        { t: 'Operations: binary subtraction, hexadecimal addition, binary division (the base-8 addition is not on the syllabus)' },
        { t: 'Memories: address lines, highest addresses, memory map' + NS }] },

    p2018: { title: 'Midterm Exam S1 2018-2019', meta: 'class of 2023 · 1 hr 30 min · 20 points',
      note: 'The past exams only have the English answer key. Not on this year’s syllabus: exercises 1 (powers of two), 2 (binary prefixes) and 4 (unknown bases), and the base-8 addition of exercise 5. Exercise 6 is used again in 2020-2021. The official answer key is correct.',
      files: f4(2023, 'midterm-2023-s1-archi-subject-en.pdf', 'midterm-2023-s1-archi-correction-en.pdf', 'midterm-2023-s1-archi-subject-fr.pdf', null),
      parts: [
        { t: 'Simplify expressions as a power of two' + NS },
        { t: 'Binary prefixes: bits and bytes (Ki, Mi, Gi)' + NS },
        { t: 'Conversions, including bases 8, 5, 9 and 3 (8 rows)' },
        { t: 'Unknown bases: 124<sub>b</sub> = 103<sub>8</sub>, 208<sub>a</sub> = 808<sub>b</sub>' + NS },
        { t: 'Operations: binary subtraction, hexadecimal addition, binary division (the base-8 addition is not on the syllabus)' },
        { t: 'On n bits: number of integers, largest and smallest' }] },

    p2017: { title: 'Midterm Exam S1 2017-2018', meta: 'class of 2022 · 1 hr 30 min · 20 points',
      note: 'Not on this year’s syllabus: exercise 1 (powers of two, binary prefixes), exercise 5 (memory map) and the base-8 addition of exercise 4. Official answer key in English and French, correct.',
      files: std(2022),
      parts: [
        { t: 'Powers of two and binary prefixes' + NS },
        { t: 'Conversions, including bases 8, 5, 9 and 3 (8 rows)' },
        { t: '8-bit operations (4 rows, result only)' },
        { t: 'Operations: binary subtraction, hexadecimal addition, binary division (the base-8 addition is not on the syllabus)' },
        { t: 'Memories: address lines, highest addresses, memory map' + NS }] },

    p2016: { title: 'Midterm Exam S1 2016-2017', meta: 'class of 2021 · 1 hr 30 min · 20 points',
      note: 'Paper and answer key in English only. In exercise 2 (not on the syllabus), the paper says “4³⁷ bytes” and the key “2³⁷ bytes = 128 GiB”: a typo in the paper. Not on this year’s syllabus: exercises 1, 2 and 4, and the base-8 addition of exercise 5. The official answer key is correct.',
      files: f4(2021, 'midterm-2021-s1-archi-subject-en.pdf', 'midterm-2021-s1-archi-correction-en.pdf'),
      parts: [
        { t: 'Simplify expressions as a power of two' + NS },
        { t: 'Binary prefixes: bits and bytes (Ki, Mi, Gi)' + NS },
        { t: 'Conversions, including bases 8, 7, 9 and 3 (8 rows)' },
        { t: 'Unknown bases: 111<sub>b</sub> = 1121<sub>3</sub>, 200<sub>a</sub> = 20402<sub>b</sub>' + NS },
        { t: 'Operations: binary subtraction, hexadecimal addition, binary division (the base-8 addition is not on the syllabus)' },
        { t: 'On n bits: number of integers, largest and smallest' }] }
  }, 'key');
})();
