/* QCM d’électronique : questions de cours (Ex 1) des partiels nov. 2021 (promo 2026) et oct. 2022 (promo 2027).
   Énoncés et options verbatim, réponses du corrigé officiel.
   Déjà dans data/qcm/elec.js, donc absentes ici : 2021 Q3 et 2022 Q3 (elec-c2-05, courant dans un générateur),
   2021 Q4 (elec-c2-08, dipôles en série). */
(function () {
  var B = window.QCM_BANK = window.QCM_BANK || [];
  var C1 = 'elec/cours-1-bases.html', C2 = 'elec/cours-2-lois.html';
  var Q = [
    /* ---------- Partiel nov. 2021, Ex 1 ---------- */
    { id: 'elec-p2021-q1', topic: 'vocabulaire', lvl: 1, type: 'tf', keep: true, src: 'Partiel 2021 · Ex 1 · Q1',
      q: 'Une branche d’un circuit correspond à une portion de circuit située entre 2 nœuds consécutifs.',
      a: true,
      x: 'Vrai. C’est la définition du cours : une branche va d’un nœud au nœud suivant. Tous ses dipôles sont en série, parcourus par le même courant.', ref: C2 + '#s1' },
    { id: 'elec-p2021-q2', topic: 'appareils', lvl: 1, type: 'tf', keep: true, src: 'Partiel 2021 · Ex 1 · Q2',
      q: 'Pour mesurer la tension aux bornes d’un dipôle, on utilise un ampèremètre branché en série avec ce dipôle.',
      a: false,
      x: 'Faux. Une tension se mesure avec un voltmètre branché en dérivation (en parallèle) aux bornes du dipôle. L’ampèremètre se branche en série et mesure un courant.', ref: C1 + '#s6' },
    { id: 'elec-p2021-q5', topic: 'ohm', lvl: 1, type: 'single', keep: true, src: 'Partiel 2021 · Ex 1 · Q5',
      q: 'L’intensité de courant dans un résistor de 100 Ω est de 10 A. Quelle est la différence de potentiel à ses bornes ?',
      o: ['1000 A', '10 V', '110 V', '1000 V'], a: 3,
      x: 'Loi d’Ohm : <var>U</var> = <var>R</var><var>I</var> = 100 × 10 = 1000 V. « 1000 A » a la bonne valeur mais l’unité d’un courant ; 110 V additionne des ohms et des ampères, ce qui n’a pas de sens.', ref: C1 + '#s5' },
    { id: 'elec-p2021-q6', topic: 'ohm', lvl: 1, type: 'single', keep: true, src: 'Partiel 2021 · Ex 1 · Q6',
      q: 'Une résistance a une différence de potentiel de 100 V à ses bornes. Si le courant qui le traverse est de 0,1 A, quelle est la valeur de cette résistance ?',
      o: ['10 Ω', '100 Ω', '1 kΩ', 'Aucune de ces réponses.'], a: 2,
      x: '<var>R</var> = <var>U</var>/<var>I</var> = 100/0,1 = 1000 Ω = 1 kΩ. Diviser par 0,1 revient à multiplier par 10 : le piège est de multiplier par 0,1 et de trouver 10 Ω.', ref: C1 + '#s5' },

    /* ---------- Partiel oct. 2022, Ex 1 ---------- */
    { id: 'elec-p2022-q1', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2022 · Ex 1 · Q1',
      q: 'Qu’est-ce qu’un déplacement ordonné de charges électriques ?',
      o: ['Un courant', 'Une tension', 'Une résistance', 'Rien de tout cela'], a: 0,
      x: 'Par définition, le courant électrique est un déplacement ordonné (d’ensemble) de charges : <var>i</var> = d<var>q</var>/d<var>t</var>. Une tension est une différence de potentiels.', ref: C1 + '#s1' },
    { id: 'elec-p2022-q2', topic: 'grandeurs', lvl: 1, type: 'single', keep: true, src: 'Partiel 2022 · Ex 1 · Q2',
      q: 'Une différence de potentiels entre 2 points est :',
      o: ['Un courant', 'Une tension', 'Une résistance', 'Rien de tout cela'], a: 1,
      x: 'Une tension : <var>U</var><sub>AB</sub> = <var>V</var><sub>A</sub> − <var>V</var><sub>B</sub>. Un point seul a un potentiel ; une tension se mesure toujours entre deux points.', ref: C1 + '#s1' },
    { id: 'elec-p2022-q4', topic: 'appareils', lvl: 1, type: 'tf', keep: true, src: 'Partiel 2022 · Ex 1 · Q4',
      q: 'Pour mesurer l’intensité d’un courant dans un dipôle, on utilise un ampèremètre branché en parallèle avec ce dipôle.',
      a: false,
      x: 'Faux. L’ampèremètre se branche en série : il doit être traversé par le courant à mesurer. C’est le voltmètre qui se branche en parallèle.', ref: C1 + '#s6' },
    { id: 'elec-p2022-q5', topic: 'serie-parallele', lvl: 1, type: 'single', keep: true, src: 'Partiel 2022 · Ex 1 · Q5',
      q: 'Si deux dipôles sont parcourus par le même courant, on dit qu’ils sont :',
      o: ['En parallèle', 'En série'], a: 1,
      x: 'Des dipôles en série sont dans la même branche et ont le même courant ; en parallèle, c’est la tension qui est commune. La réciproque n’est pas tout à fait vraie (deux résistances égales en parallèle ont aussi le même courant), mais c’est la réponse attendue au partiel.', ref: C2 + '#s4' },
    { id: 'elec-p2022-q6', topic: 'ohm', lvl: 1, type: 'single', keep: true, src: 'Partiel 2022 · Ex 1 · Q6',
      q: 'Si l’on applique la loi d’Ohm avec <var>U</var> en V et <var>I</var> en mA, on obtient directement <var>R</var> en :',
      o: ['MΩ', 'kΩ', 'mΩ', 'Ω'], a: 1,
      x: '<var>R</var> = <var>U</var>/<var>I</var> : 1 V/1 mA = 1 V/10<sup>−3</sup> A = 10<sup>3</sup> Ω = 1 kΩ. À retenir : V/mA = kΩ, et kΩ × mA = V.', ref: C1 + '#s5' }
  ];
  Q.forEach(function (q) { q.s = 'elec'; });
  Array.prototype.push.apply(B, Q);
})();
