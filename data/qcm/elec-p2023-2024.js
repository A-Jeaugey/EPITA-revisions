/* Questions de QCM d’électronique : partiels de nov. 2023 (promo 2028) et d’oct. 2024 (promo 2029), Ex 1.
   Énoncés et options verbatim, ordre d’origine (keep). La question 2024 · Q2 (« Une branche… ») est déjà
   dans data/qcm/elec.js (elec-c2-02) : elle n’est pas reprise ici. */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var C1 = 'elec/cours-1-bases.html', C2 = 'elec/cours-2-lois.html';
  function r(n) { return '<var>R</var><sub>' + n + '</sub>'; }
  function i(n) { return '<var>I</var><sub>' + n + '</sub>'; }
  var Q = [
    /* ---------- Partiel oct. 2024 (promo 2029) ---------- */
    { id: 'elec-p2024-q1', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2024 · Ex 1 · Q1',
      q: 'Qu’est-ce qu’un courant électrique ?',
      o: ['Une différence de potentiels', 'Un déplacement ordonné de charges électriques', 'Un déplacement de charges électriques', 'Une dissipation de chaleur'], a: 1,
      x: 'Le courant est un déplacement <b>ordonné</b> de charges. L’agitation thermique déplace aussi des charges, mais en désordre, sans créer de courant : la réponse c est incomplète. La réponse a définit une tension, la d décrit l’effet Joule.',
      ref: C1 + '#s1' },
    { id: 'elec-p2024-q3', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2024 · Ex 1 · Q3',
      q: 'Quelle est l’unité d’une tension électrique ?',
      o: ['Des Watts (W)', 'Des Ampères (A)', 'Des Ohms (Ω)', 'Des Ohms fois des Ampères (Ω.A)'], a: 3,
      x: 'Le volt n’est pas proposé : passe par la loi d’Ohm. <var>U</var> = <var>R</var>·<var>I</var>, donc 1 V = 1 Ω × 1 A = 1 Ω·A. Le watt est l’unité de la puissance (1 W = 1 V·A).',
      ref: C1 + '#s5' },
    { id: 'elec-p2024-q4', topic: 'kirchhoff', lvl: 1, type: 'tf', keep: true, src: 'Partiel 2024 · Ex 1 · Q4',
      q: 'L’intensité du courant qui entre dans un dipôle passif est supérieure à l’intensité de celui qui en ressort.',
      a: false,
      x: 'Un dipôle ne stocke pas de charges : le courant qui en sort est égal au courant qui y entre. Une résistance consomme de l’énergie, pas du courant.',
      ref: C2 + '#s2' },
    { id: 'elec-p2024-q5', topic: 'serie-parallele', lvl: 2, type: 'single', keep: true, src: 'Partiel 2024 · Ex 1 · Q5',
      q: 'Soit le circuit ci-contre. Choisir l’affirmation correcte :',
      fig: { w: 460, h: 255, aria: 'Source E à gauche, R2 entre A et F, R1 entre A et B, R5 et R6 entre B et C, R3 entre B et D, R4 entre F et D, R7 entre C et D',
        wires: ['M60 100H420V220H60Z', 'M110 100V220', 'M260 40V220', 'M260 40H420V100'],
        parts: [{ t: 'E', x: 60, y: 160, d: 'v', p: 'n', l: 'E' },
          { t: 'R', x: 110, y: 160, d: 'v', l: 'R_2' },
          { t: 'R', x: 180, y: 100, l: 'R_1' }, { t: 'I', x: 228, y: 100, d: 'e', l: 'I_1' },
          { t: 'R', x: 345, y: 40, l: 'R_5' }, { t: 'I', x: 297, y: 40, d: 'w', l: 'I_5', lp: 's' },
          { t: 'R', x: 340, y: 100, l: 'R_6', lp: 's' }, { t: 'I', x: 390, y: 100, d: 'e', l: 'I_6', lp: 's' },
          { t: 'R', x: 260, y: 150, d: 'v', l: 'R_3', lp: 'w' }, { t: 'I', x: 260, y: 194, d: 's', l: 'I_3', len: 22 },
          { t: 'R', x: 185, y: 220, l: 'R_4' },
          { t: 'R', x: 420, y: 160, d: 'v', l: 'R_7', lp: 'w' }, { t: 'I', x: 375, y: 220, d: 'e', l: 'I_7', lp: 's' },
          { t: 'dot', x: 60, y: 100, r: 3 }, { t: 'dot', x: 420, y: 220, r: 3 },
          { t: 'dot', x: 110, y: 100 }, { t: 'dot', x: 260, y: 100 }, { t: 'dot', x: 420, y: 100 }, { t: 'dot', x: 260, y: 220 }, { t: 'dot', x: 110, y: 220 },
          { t: 'txt', x: 110, y: 86, s: 'A', c: 'cz-n' }, { t: 'txt', x: 271, y: 121, s: 'B', a: 'start', c: 'cz-n' },
          { t: 'txt', x: 432, y: 106, s: 'C', a: 'start', c: 'cz-n' }, { t: 'txt', x: 260, y: 245, s: 'D', c: 'cz-n' },
          { t: 'txt', x: 110, y: 245, s: 'F', c: 'cz-n' }] },
      o: [r(1) + ' et ' + r(2) + ' sont en série', r(2) + ' et ' + r(3) + ' sont en parallèle', r(3) + ' et ' + r(7) + ' sont en parallèle', r(5) + ' et ' + r(6) + ' sont en parallèle'], a: 3,
      x: r(5) + ' et ' + r(6) + ' sont toutes deux branchées entre B et C : elles sont en parallèle. Les sens opposés de ' + i(5) + ' et ' + i(6) + ' n’y changent rien. ' +
        'a est faux : en A, ' + r(1) + ' et ' + r(2) + ' rejoignent aussi la source <var>E</var> (trois dipôles au même nœud). b : ' + r(2) + ' est entre A et F, ' + r(3) + ' entre B et D. c : ' + r(3) + ' (B–D) et ' + r(7) + ' (C–D) n’ont qu’une borne commune.',
      ref: C2 + '#s4' },

    /* ---------- Partiel nov. 2023 (promo 2028) ---------- */
    { id: 'elec-p2023-q1', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q1',
      q: 'Qu’est-ce qu’une tension ?',
      o: ['Une différence de potentiels', 'Un déplacement ordonné de charges électriques', 'Un déplacement de charges électriques', 'Une dissipation de chaleur'], a: 0,
      x: 'Une tension est une différence de potentiels : <var>U</var><sub>AB</sub> = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub>. Le déplacement ordonné de charges, c’est le courant.',
      ref: C1 + '#s1' },
    { id: 'elec-p2023-q2', topic: 'ohm', lvl: 1, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q2',
      q: 'La résistance d’un dipôle est :',
      o: ['Sa durabilité', 'Sa force', 'Sa capacité à s’opposer au passage du courant'], a: 2,
      x: 'La résistance (en ohms) mesure l’opposition du dipôle au passage du courant : sous une même tension, plus <var>R</var> est grande, plus <var>I</var> = <var>U</var>/<var>R</var> est petit.',
      ref: C1 + '#s5' },
    { id: 'elec-p2023-q3', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q3',
      q: 'Quelle est l’unité de l’intensité d’un courant électrique ?',
      o: ['Des Volt (V)', 'Des Ampères (A)', 'Des Ohms (Ω)', 'Des Watts (W)'], a: 1,
      x: 'L’intensité se mesure en ampères (A). Le volt est l’unité de la tension, l’ohm celle de la résistance, le watt celle de la puissance.',
      ref: C1 + '#s1' },
    { id: 'elec-p2023-q4', topic: 'req', lvl: 2, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q4',
      q: 'Quelle est la résistance vue entre A et B ?',
      fig: { w: 440, h: 200, aria: 'Entre A et B, deux branches en parallèle : en haut R, puis 3R en parallèle avec 6R, puis R ; en bas 3R puis R',
        wires: ['M20 105H60', 'M60 35V180', 'M60 35H380', 'M160 35V95H270V35', 'M60 180H380', 'M380 35V180', 'M380 105H420'],
        parts: [{ t: 'R', x: 110, y: 35, l: 'R' }, { t: 'R', x: 215, y: 35, l: '3R' }, { t: 'R', x: 215, y: 95, l: '6R' }, { t: 'R', x: 325, y: 35, l: 'R' },
          { t: 'R', x: 140, y: 180, l: '3R' }, { t: 'R', x: 300, y: 180, l: 'R' },
          { t: 'dot', x: 60, y: 105 }, { t: 'dot', x: 380, y: 105 }, { t: 'dot', x: 160, y: 35 }, { t: 'dot', x: 270, y: 35 },
          { t: 'term', x: 20, y: 105, l: 'A', lp: 'n' }, { t: 'term', x: 420, y: 105, l: 'B', lp: 'n' }] },
      o: ['14<var>R</var>', '20<var>R</var>/9', '2<var>R</var>', '20<var>R</var>/8'], a: 2,
      x: 'Branche du haut : 3<var>R</var> // 6<var>R</var> = (3<var>R</var> × 6<var>R</var>)/(9<var>R</var>) = 2<var>R</var>, donc <var>R</var> + 2<var>R</var> + <var>R</var> = 4<var>R</var>. Branche du bas : 3<var>R</var> + <var>R</var> = 4<var>R</var>. Deux 4<var>R</var> en parallèle donnent 2<var>R</var>. 20<var>R</var>/9 correspond à l’oubli de la 6<var>R</var> (5<var>R</var> // 4<var>R</var>).',
      ref: C2 + '#s5' },
    { id: 'elec-p2023-q5', topic: 'kirchhoff', lvl: 2, type: 'single', keep: true, src: 'Partiel 2023 · Ex 1 · Q5',
      q: 'Soit le circuit ci-contre. Que peut-on dire de ' + r(2) + ' et ' + r(3) + ' ?',
      fig: { w: 400, h: 240, aria: 'Trois résistances R1, R2, R3 en parallèle ; 15 A arrivent, 5 A traversent R1, I2 traverse R2, 5 A traversent R3',
        wires: ['M20 40H370', 'M90 40V200H300V40', 'M90 120H300'],
        parts: [{ t: 'I', x: 52, y: 40, d: 'e', l: '15 A' },
          { t: 'R', x: 190, y: 40, l: 'R_1' }, { t: 'I', x: 250, y: 40, d: 'e', l: '5 A', lp: 's' },
          { t: 'R', x: 190, y: 120, l: 'R_2' }, { t: 'I', x: 250, y: 120, d: 'e', l: 'I_2', lp: 's' },
          { t: 'R', x: 190, y: 200, l: 'R_3' }, { t: 'I', x: 250, y: 200, d: 'e', l: '5 A', lp: 's' },
          { t: 'dot', x: 90, y: 40 }, { t: 'dot', x: 90, y: 120 }, { t: 'dot', x: 300, y: 40 }, { t: 'dot', x: 300, y: 120 }] },
      o: [r(2) + ' &lt; ' + r(3), r(2) + ' = ' + r(3), r(2) + ' &gt; ' + r(3), 'On ne peut rien dire'], a: 1,
      x: 'Loi des nœuds : ' + i(2) + ' = 15 − 5 − 5 = 5 A. Les trois résistances sont en parallèle, donc sous la même tension <var>U</var>. Avec <var>R</var> = <var>U</var>/<var>I</var> et trois courants égaux, ' + r(1) + ' = ' + r(2) + ' = ' + r(3) + '.',
      ref: C2 + '#s2' }
  ];
  Q.forEach(function (q) { q.s = 'elec'; });
  Array.prototype.push.apply(B, Q);
})();
