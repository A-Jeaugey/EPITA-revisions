/* English text for data/qcm/elec2.js (Electronics B2: Thévenin, Norton, Millman, superposition).
   Only the questions added by elec2.js are translated here: the ones remapped from the old chapter 3 already have
   their English in data/en/qcm/elec.js and elec-hebdo.js. Exam questions: faithful translation of the French papers
   (January 2016 and 2017 English papers are scans without text). */
(function () {
  var R = '<var>R</var>', E = '<var class="u">E</var>', I = '<var class="i">I</var>', U = '<var class="u">U</var>';
  function r(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function e(n) { return '<var class="u">E</var><sub>' + n + '</sub>'; }
  function i(n) { return '<var class="i">I</var><sub>' + n + '</sub>'; }
  var Eth = e('th'), Rth = r('th'), IN = i('N'), RN = r('N');

  REV.i18n.topics({
    thevenin: 'Thévenin', norton: 'Norton and equivalences', millman: 'Millman', superposition: 'Superposition',
    'elec2-methode': 'Choosing and checking a method'
  });

  REV.i18n.qcm({
    'elec-c3-18': { q: 'A resistor ' + r('0') + ' is in series with an ideal current source ' + i('0') + '. As far as the rest of the circuit is concerned…',
      o: ['it changes nothing: the current in the branch is ' + i('0') + ' whatever happens', 'it adds to ' + Rth, 'it halves the current ' + i('0'), 'it short-circuits the source'],
      x: 'The current source sets the current of its branch. ' + r('0') + ' only changes the voltage across the source, not what the rest of the circuit sees: in Millman, Thévenin or Norton, you ignore it (2017 and 2019 papers).' },
    'elec-c3-19': { q: 'A resistor ' + r('4') + ' is connected in parallel with an ideal voltage source ' + e('3') + '. As far as the rest of the circuit is concerned…',
      o: ['it changes nothing: the voltage between these two points is ' + e('3') + ' whatever happens', 'it adds in series with ' + e('3'), 'it cancels ' + e('3'), 'it goes in parallel with ' + Rth],
      x: 'The voltage source sets the voltage between its terminals; whatever is connected in parallel draws current from the source and changes nothing elsewhere (2018 and 2020 papers). However, when you turn the source off to find ' + Rth + ', it becomes a wire that short-circuits ' + r('4') + '.' },
    'elec-c3-20': { q: 'If a source does not appear in the final result, the calculation is necessarily wrong.',
      x: 'False. Two sources can have opposite contributions that cancel out: in the January 2019 paper, those of 2' + E + ' and ' + E + ' offset each other and ' + U + ' depends only on ' + I + '; in June 2018, it is those of 2' + I + ' and ' + I + '. Superposition shows it.' },
    'elec-c3-21': { src: 'Exam Jan. 2022 · Ex 2', q: 'A source ' + I + ' is in parallel with ' + R + ', the whole in series with 3' + R + ', the whole in parallel with 6' + R + '. What Norton generator do you see across 6' + R + '?',
      x: I + ' // ' + R + ' becomes ' + R + I + ' in series with ' + R + '; with 3' + R + ': ' + R + I + ' in series with 4' + R + ', i.e. a Norton ' + I + '/4 // 4' + R + '; finally 4' + R + ' // 6' + R + ' = 24' + R + '/10 = 12' + R + '/5.' },
    'elec-c3-22': { q: 'In the exam, “Determine the Thévenin generator seen by ' + r('4') + '”: what does ' + r('4') + ' represent?',
      o: ['The load: you disconnect it and look for what supplies it', 'A resistor to keep in ' + Rth, 'Thévenin’s resistance itself', 'A resistor to short-circuit'],
      x: 'The resistor “seen” is the load: ' + Eth + ' is the voltage across it when it is disconnected, ' + Rth + ' the resistance seen from its terminals with the sources turned off. You reconnect it at the end (voltage divider).' },
    'elec-c3-23': { q: 'Millman’s theorem comes from…',
      o: ['Kirchhoff’s current law', 'Kirchhoff’s voltage law', 'Thévenin’s theorem', 'the superposition theorem'],
      x: 'Millman is Kirchhoff’s current law at node A, with each branch current written using Ohm’s law. Lecture question from January 2016.' },
    'elec-c3-24': { q: 'In Millman, a branch made of a single resistor ' + r('k') + ' between node A and ground contributes…',
      o: ['0 to the numerator and 1/' + r('k') + ' to the denominator', '1/' + r('k') + ' to the numerator and nothing to the denominator', 'nothing at all', r('k') + ' to the denominator'],
      x: 'The other end of the branch is at 0 V: the branch “pushes” 0/' + r('k') + ' toward A, but its conductance 1/' + r('k') + ' counts in the denominator.' },
    'elec-c3-25': { q: 'In Millman, a current source ' + i('2') + ' flowing into A, in series with a resistor ' + r('2') + '…',
      o: ['gives + ' + i('2') + ' in the numerator, and ' + r('2') + ' appears nowhere', 'gives + ' + i('2') + ' in the numerator and 1/' + r('2') + ' in the denominator', 'gives ' + i('2') + '/' + r('2') + ' in the numerator', 'does not count'],
      x: 'The source sets the current of the branch: ' + r('2') + ' changes nothing (2016, 2017, 2018, 2019 papers). The current flows into A: + ' + i('2') + ' in the numerator.' },
    'elec-c3-26': { src: 'Exam Jan. 2018 · Ex 4', q: 'A branch reaches A through ' + r('3') + ', whose other end is connected to ground through a source ' + e('3') + ' with its arrow pointing down (toward ground), with ' + r('4') + ' in parallel with ' + e('3') + '. What does it contribute in Millman?',
      o: ['−' + e('3') + '/' + r('3') + ' in the numerator and 1/' + r('3') + ' in the denominator', '+' + e('3') + '/' + r('3') + ' in the numerator and 1/' + r('3') + ' + 1/' + r('4') + ' in the denominator', '−' + e('3') + '/(' + r('3') + ' + ' + r('4') + ') in the numerator', 'nothing: ' + r('4') + ' short-circuits it'],
      x: 'The other end of ' + r('3') + ' is at potential −' + e('3') + ' (arrow toward ground) whatever ' + r('4') + ' does, since it is in parallel with the source. Answer key: U = (' + e('1') + '/' + r('1') + ' − ' + i('1') + ' + ' + i('2') + ' − ' + e('3') + '/' + r('3') + ')/(1/' + r('1') + ' + 1/' + r('3') + ').' },
    'elec-f2018j-q7': { src: 'Exam June 2018 · Q7', q: 'You cannot apply the superposition theorem if… (2 answers)',
      o: ['the sources are not independent', 'the circuit is linear', 'the sources are independent', 'the circuit is not linear'],
      x: 'Superposition requires a linear circuit (resistors, sources) and independent sources: a source whose value depends on another quantity of the circuit cannot be turned off on its own.' },
    'elec-c3-28': { src: 'Exam Jan. 2021 · Ex 2', q: 'Superposition: the source ' + e('1') + ' = 15 V alone gives ' + i('2') + '′ = ' + e('1') + '/(6' + R + '), the source ' + i('0') + ' = 45 mA alone gives ' + i('2') + '″ = −' + i('0') + '/18, with ' + R + ' = 500 Ω. What is ' + i('2') + ' (in mA)?',
      x: i('2') + ' = 15/3,000 − 45/18 mA = 5 − 2.5 = 2.5 mA. You add the contributions with their signs, then do the numerical application.' },
    'elec-c3-29': { q: 'A circuit contains four independent sources. How many diagrams (“states”) must you study in superposition?',
      o: ['4, one per source', '2', '1', '16'],
      x: 'One state per source: you keep it, turn off the other three (voltage → wire, current → gap), then add the four contributions (January 2020 paper, Ex 2).' },
    'elec-c3-30': { q: 'You find ' + U + ' = (' + E + ' + ' + R + I + ')/5. Which of these checks is valid?',
      o: ['Set ' + I + ' to zero and check the voltage due to ' + E + ' alone', 'Check that ' + U + ' is positive', 'Check that ' + U + ' does not depend on ' + R, 'Replace ' + R + ' by 0 and check that ' + U + ' = 0'],
      x: I + ' = 0 means turning off the current source: you recover the contribution of ' + E + ' alone, often easy to compute with a divider. A voltage can be negative, and it generally depends on ' + R + '.' },
    'elec-c3-31': { q: 'Which expression cannot be a voltage?',
      o: ['(' + E + ' + ' + I + ')/' + R, '(' + E + ' + ' + R + I + ')/5', '2' + R + I + ' − ' + E, R + '(' + I + ' + ' + E + '/' + R + ')'],
      x: 'You do not add volts and amperes: ' + E + ' + ' + I + ' makes no sense. ' + R + I + ' is a voltage (Ohm’s law), ' + E + '/' + R + ' a current.' },
    'elec-c3-32': { q: '“Determine ' + U + ' using Millman’s theorem”: ' + U + ' is the voltage between two nodes A and B where all the branches arrive. What do you do first?',
      o: ['I take B as ground: ' + U + ' = <var class="v">V</var><sub>A</sub>', 'I disconnect the load', 'I turn off all the sources', 'I write a loop equation for each loop'],
      x: 'Millman gives a potential: you choose the reference (B), and ' + U + ' = <var class="v">V</var><sub>A</sub> − <var class="v">V</var><sub>B</sub> = <var class="v">V</var><sub>A</sub>. It is the first line of every answer key.' },
    'elec-f2018j-q9': { src: 'Exam June 2018 · Q9', q: 'Thévenin’s theorem replaces a complex generator dipole with:',
      o: ['an ideal voltage source in parallel with a resistor', 'an ideal current source in parallel with a resistor', 'an ideal voltage source in series with a resistor', 'an ideal current source in series with a resistor'],
      x: 'Thévenin: ' + Eth + ' in series with ' + Rth + '. Norton: ' + IN + ' in parallel with ' + RN + '.' },
    'elec-f2018j-q10': { src: 'Exam June 2018 · Q10', q: 'In Thévenin’s theorem, the voltage ' + Eth + ' of the generator is also called:',
      o: ['the open-circuit voltage', 'the short-circuit voltage', 'none of these answers'],
      x: Eth + ' is the voltage between A and B when nothing is connected: the open-circuit voltage. The short circuit gives the Norton current.' },
    'elec-f2016-q9': { src: 'Exam Jan. 2016 · Q9', q: 'To turn off a current source, you replace it with:',
      o: ['a wire', 'an open switch', 'a resistor', 'a voltage generator'],
      x: 'Zero current: nothing flows any more, it is a gap (open switch). Lecture questions from January 2016 and 2017.' },
    'elec-f2016-q10': { src: 'Exam Jan. 2016 · Q10', q: 'To turn off a voltage source, you replace it with:',
      o: ['a closed switch', 'a resistor', 'an open switch', 'a current generator'],
      x: 'Zero voltage: its two terminals are at the same potential, it is a wire (closed switch).' },
    'elec-f2016-q11': { src: 'Exam Jan. 2016 · Q11', q: 'A current source ' + I + ' in parallel with ' + R + ' is equivalent to a voltage source ' + E + ' in series with ' + R + '′ if and only if ' + E + ' =',
      o: [I, R + '·' + I, R + '′' + R + '/(' + R + ' + ' + R + '′)·' + I, 'none of these answers'],
      x: 'Norton → Thévenin transformation: ' + E + ' = ' + R + I + ', and the same resistance ' + R + '′ = ' + R + '. Same question in January 2019.' },
    'elec-f2016-q12': { src: 'Exam Jan. 2016 · Q12', q: 'Same equivalence (source ' + I + ' // ' + R + ' and source ' + E + ' in series with ' + R + '′): ' + R + '′ =',
      o: [R, R + '·' + R + '′/(' + R + ' + ' + R + '′)', R + '/(' + R + ' + ' + R + '′)', 'none of these answers'],
      x: 'The resistance does not change in a source transformation: ' + R + '′ = ' + R + ' (with the sources turned off, both circuits reduce to this resistance).' },
    'elec-f2018-q10': { src: 'Exam Jan. 2018 · Q10', q: 'A voltage generator ' + E + ' in series with a resistor ' + R + ' is equivalent to a current generator ' + I + ' in parallel with a resistor <var>r</var> if:',
      o: ['<var>r</var> = ' + R + ' and ' + E + ' = ' + R + '·' + I, R + '·' + E + ' = (' + R + '/<var>r</var>)·' + I + ' and <var>r</var> = ' + R, R + ' = <var>r</var> and ' + E + ' = ' + I + '/' + R, E + ' = ' + R + '·' + I + ' and <var>r</var> = ' + R + '/2'],
      x: 'Same resistance, and ' + I + ' = ' + E + '/' + R + ', i.e. ' + E + ' = ' + R + I + '.' }
  });
})();
