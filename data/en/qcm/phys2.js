/* English text for data/qcm/phys2.js (Physics B2: circular motion; new questions merged by id over the French bank).
   Vocabulary of the official English course: polar coordinates, reaction of the support, Newton’s second law,
   work-kinetic energy theorem, mechanical energy, friction force, the Frenet basis, curvilinear abscissa, loop.
   Same notation as the French file: {v} = vector, `x` = quantity in italics, subscript after “_”.
   `src` is translated here too (the engine only translates the midterm sources). Decimal points. */
REV.i18n.topics({
  'phys-polaires': 'Polar coordinates and basis',
  'phys-polaires-va': 'Polar velocity and acceleration',
  'phys-circulaire': 'Circular motion',
  'phys-dyncirc': 'Dynamics of circular motion',
  'phys-frenet': 'The Frenet basis (reading the papers)'
});
(function () {
  var S22 = 'End-of-semester exam Jan. 2022 · MCQ · ', S22D = 'End-of-semester exam Dec. 2022 · MCQ · ', S20 = 'End-of-semester exam Jan. 2020 · MCQ · ',
    S18 = 'End-of-semester exam Jan. 2018 · MCQ · ', S18J = 'End-of-semester exam June 2018 · MCQ · ';
  var E = {
    /* ---------- chapter 2, part 1: second law in the polar basis ---------- */
    'phys-c5-01': { q: 'A point of mass `m` describes a circle of radius `R` at speed `v`. Projected onto {u_r} (pointing outwards), the second law reads…',
      o: ['Σ`F_r` = −`m v`²/`R`', 'Σ`F_r` = `m v`²/`R`', 'Σ`F_r` = 0', 'Σ`F_r` = −`m g`'],
      x: 'On a circle, {a} = −`R θ̇`² {u_r} + `R θ̈` {u_θ}, and `R θ̇`² = `v`²/`R`. So the resultant of the forces towards the centre equals `m v`²/`R`: on {u_r}, which points outwards, it counts as −`m v`²/`R`.' },
    'phys-c5-02': { q: 'The centripetal force is one more force to add to the force diagram, next to the weight and the reaction.',
      x: 'False. `m v`²/`R` is what the real forces (weight, reaction, tension…) must provide towards the centre for the point to turn. Adding it to the force diagram would count it twice.' },
    'phys-c5-03': { q: 'A bead on a sphere is located by the angle θ between the upward vertical and the radius OM; {u_θ} points towards increasing θ. What are the components of the weight on ({u_r}, {u_θ})?',
      o: ['(−`m g` cos θ; `m g` sin θ)', '(−`m g` sin θ; `m g` cos θ)', '(`m g` cos θ; −`m g` sin θ)', '(−`m g`; 0)'],
      x: 'The angle between {P} and −{u_r} is θ: the cos θ component is along the radius, towards the centre (−`m g` cos θ). The tangential component, `m g` sin θ, pushes the bead forwards. Check at the top (θ = 0): all of the weight is along the radius.' },

    /* ---------- part 2: reaction of a support ---------- */
    'phys-c5-04': { q: 'An object slides without friction on top of a sphere of radius `R`, at an angle θ from the vertical. The reaction of the support is…',
      o: ['`N` = `m`(`g` cos θ − `v`²/`R`)', '`N` = `m g` cos θ', '`N` = `m`(`g` cos θ + `v`²/`R`)', '`N` = `m v`²/`R`'],
      x: 'Along {u_r}: `N` − `m g` cos θ = −`m v`²/`R`. The weight pulls towards the centre, the reaction pushes away: the faster the object goes, the smaller the reaction. `m g` cos θ alone is the answer for the inclined plane, without the term due to the turn.' },
    'phys-c5-05': { q: 'A 0.2 kg ball passes through the lowest point of a bowl of radius 0.5 m at a speed of 2 m·s⁻¹ (`g` = 10 m·s⁻²). What is the reaction of the bowl?',
      x: 'At the lowest point, the reaction points towards the centre and the weight points away from it: `N` − `m g` = `m v`²/`R`. `N` = 0.2 × (10 + 4/0.5) = 0.2 × 18 = 3.6 N, almost twice the weight (2 N).' },
    'phys-c5-06': { q: 'In the second law projected onto {u_θ}, the reaction of a frictionless support…',
      o: ['does not appear: it is perpendicular to the motion', 'balances the weight', 'equals `m R θ̈`', 'equals `m v`²/`R`'],
      x: 'Without friction, the reaction is perpendicular to the support, so it lies along the radius: its component on {u_θ} is zero. The tangential equation contains only the weight: it gives the differential equation of the motion, `θ̈` − (`g`/`R`) sin θ = 0 on a sphere.' },

    /* ---------- part 3: energy, then the second law ---------- */
    'phys-c5-07': { q: 'A bead starts from rest at the top of a sphere of radius `R` and slides without friction. Its speed at an angle θ from the vertical satisfies…',
      o: ['`v`² = 2`g R`(1 − cos θ)', '`v`² = 2`g R` cos θ', '`v`² = `g R`(1 − cos θ)', '`v`² = 2`g R` sin θ'],
      x: 'The reaction does no work, so the mechanical energy is conserved. From the top, the bead has gone down by `R` − `R` cos θ: ½`m v`² = `m g R`(1 − cos θ). At θ = 0, `v` = 0: this is indeed the starting point.' },
    'phys-c5-08': { q: 'In an exercise on motion on a circular support, why do you write the energy before the second law?',
      o: ['energy gives `v`² as a function of the position, without going through time', 'the second law is false on a circle', 'energy gives the reaction directly', 'so you do not have to project the weight'],
      x: 'The reaction projected onto the radius depends on `v`². The energy theorem relates `v` to the height, hence to θ, in one line. You then replace `v`² in the second law: `N` = `m g`(3 cos θ − 2) for the bead starting from the top.' },

    /* ---------- part 4: leaving the support ---------- */
    'phys-c5-09': { q: 'A bead starts from rest at the top of a sphere and slides without friction. It leaves the sphere when…',
      o: ['cos θ = 2/3', 'θ = 90°', 'its speed becomes zero', 'cos θ = 1/3'],
      x: '`N` = `m g`(3 cos θ − 2) vanishes for cos θ = 2/3, that is θ ≈ 48°. Beyond that, the calculation would give a negative reaction: a support cannot pull, so the bead is in free fall. This is question 3b of January 2020.' },
    'phys-c5-10': { q: 'The angle at which a bead released from the top leaves the sphere depends on its mass and on the radius of the sphere.',
      x: 'False. `N`/(`m g`) = 3 cos θ − 2: neither `m` nor `R` appears in it. Every bead released from the top leaves at cos θ = 2/3.' },

    /* ---------- part 5: the loop ---------- */
    'phys-c5-11': { q: 'At the top of a loop of radius `R`, travelled on the inside, the mass stays in contact if…',
      o: ['`v`² ≥ `g R`', '`v` ≥ 0', '`v`² ≥ 2`g R`', '`v`² ≤ `g R`'],
      x: 'At the top, the weight and the reaction both point towards the centre: `N` + `m g` = `m v`²/`R`. `N` ≥ 0 requires `v`² ≥ `g R`. A merely positive speed is not enough: the weight alone would bend the trajectory more than the circle does.' },
    'phys-c5-12': { q: 'A mass is released from rest at a height `h` above the bottom of a loop of radius 2 m, without friction. What minimum height lets it go all the way round?',
      x: 'At the top, at 2`R` above the bottom: `v`² = 2`g`(`h` − 2`R`). The condition `v`² ≥ `g R` gives `h` ≥ 5`R`/2 = 5 m. Starting from 2`R` = 4 m is not enough: the mass would reach the top with no speed.' },

    /* ---------- part 6: friction on an arc, Frenet ---------- */
    'phys-c5-13': { q: 'A friction force of constant norm 0.5 N opposes the motion along a quarter circle of radius 2 m. What is its work?',
      o: ['−π/2 J', '−1 J', '−π J', '+π/2 J'],
      x: 'The path is `R` × π/2 = π m long; the friction is opposite to the displacement: `W` = −`f` × π = −0.5π = −π/2 J. This is not the straight-line distance between the ends (2√2 m).' },
    'phys-c5-14': { q: 'On a circle travelled in the direction of increasing θ, the vector {u_N} of the Frenet basis is…',
      o: ['−{u_r}, pointing towards the centre', '{u_r}', '{u_θ}', '−{u_θ}'],
      x: '{u_N} is normal to the trajectory and points towards the inside of the curve: on a circle, towards the centre, so −{u_r}. {u_T}, tangent in the direction of motion, is {u_θ}.' },
    'phys-c5-15': { q: 'A point turns through an angle θ (in radians) on a circle of radius `R`, starting from θ = 0. Its curvilinear abscissa is…',
      o: ['`s` = `R` θ', '`s` = θ', '`s` = `R` sin θ', '`s` = 2π`R`'],
      x: 'The curvilinear abscissa is the distance travelled along the trajectory: on a circle, the length of an arc of angle θ is `R` θ. Its derivative gives the speed: `v` = `R θ̇`.' },

    /* ---------- end-of-semester exam MCQs ---------- */
    'phys-f2022-q1': { src: S22 + 'Q1', q: 'Three vectors {u_1}, {u_2} and {u_3} form an orthonormal basis if and only if:',
      o: ['they all have norm equal to 1 and are pairwise perpendicular', 'they have norm equal to 1 and are pairwise parallel', 'they all lie in the same plane', 'their sum is a zero vector'],
      x: 'No official answer key; answer checked. “Ortho”: pairwise perpendicular; “normal”: of norm 1. Three vectors in the same plane cannot form a basis of space.' },
    'phys-f2022-q2': { src: S22 + 'Q2', q: 'Motion of a particle in polar coordinates ({u_ρ}, {u_θ}). Only one of the statements below is false. Which one?',
      o: ['{OM}(`t`) = `ρ` {u_ρ}', '{v}(`t`) = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}', 'd{u_ρ}/d`t` = `θ̇` {u_θ}', 'd{u_θ}/d`t` = `θ̇` {u_ρ}'],
      x: 'No official answer key; answer checked. d{u_θ}/d`t` = −`θ̇` {u_ρ}: the minus sign is missing. It is what gives the term −`ρ θ̇`² of the acceleration, directed towards the centre.' },
    'phys-f2022-q7': { src: S22 + 'Q7', q: 'A particle M moves in the (`x`O`y`) plane with `x`(`t`) = `V_0` `t` cos(`t`) and `y`(`t`) = `V_0` `t` sin(`t`), `V_0` constant. At time `t` = π seconds, the particle is:',
      o: ['on the Y axis', 'on the X axis', 'at the origin of the axes', 'nowhere'],
      x: 'No official answer key; answer checked. `x`(π) = `V_0` π cos π = −`V_0` π and `y`(π) = `V_0` π sin π = 0: M is on the X axis, on the negative side. In polar coordinates, it is a spiral: `ρ` = `V_0` `t`, θ = `t`.' },
    'phys-f2022-q3': { src: S22 + 'Q3', q: 'About the vectors {u_T} and {u_N} that form the Frenet basis, at a point M of the trajectory of a moving object, only one statement is true. Which one?',
      o: ['{u_T} is a vector normal to the trajectory', '{u_N} is always directed towards the inside of the concavity of the trajectory', '{u_T} and {u_N} are collinear', 'the scalar product of {u_T} and {u_N} is equal to the radius of curvature'],
      x: 'No official answer key; answer checked. {u_T} is tangent, {u_N} is normal and turned towards the inside of the curve; they are perpendicular, so their scalar product is zero. On a circle, {u_N} points towards the centre.' },
    'phys-f2022-q4': { src: S22 + 'Q4', q: 'In the Frenet basis, the norm of the velocity vector `v`(`t`) is an antiderivative of the curvilinear abscissa `s`(`t`).',
      x: 'No official answer key; answer checked. It is the other way round: `v` = d`s`/d`t`, the speed is the derivative of the curvilinear abscissa, and `s` is an antiderivative of `v`. Question 5 of the same MCQ (“`s` is a derivative of `v`”) is false for the same reason.' },
    'phys-f2022-q6': { src: S22 + 'Q6', q: 'In the Frenet basis ({u_T}, {u_N}), a moving object with curvilinear abscissa `s`(`t`) and speed `v`(`t`), on a trajectory of radius of curvature `R`, has an acceleration:',
      o: ['{a} = `s̈` {u_T} + (`v`²/`R`) {u_N}', '{a} = `s̈` {u_T} + (`v`²/`R`²) {u_N}', '{a} = (2`v`/`R`) {u_T} + `R` {u_N}'],
      x: 'No official answer key; answer checked. `a_T` = d`v`/d`t` = `s̈` and `a_N` = `v`²/`R`. On a circle, this is the polar acceleration: `R θ̈` along {u_θ} and `R θ̇`² towards the centre.' },
    'phys-f2022d-q1': { src: S22D + 'Q1', q: 'In any motion, the velocity and the acceleration are always collinear.',
      x: 'False (answer ticked on the graded copy). They are collinear only for a rectilinear motion. In a uniform circular motion, they are even perpendicular: {v} tangent, {a} towards the centre.' },
    'phys-f2022d-q2': { src: S22D + 'Q2', q: 'For a circular motion of radius `R`, at any speed:',
      o: ['{v} = `R θ̇` {u_θ}', '{v} = `R` θ {u_θ}', '{a} = `R θ̇`² {u_r}', '{a} = −`R θ̇`² {u_r} + `R θ̈` {u_θ}'],
      x: 'Answers confirmed on the graded copy (options copied from the scanned paper, b and c reconstructed). `r` = `R` is constant: {v} = `R θ̇` {u_θ} and {a} = −`R θ̇`² {u_r} + `R θ̈` {u_θ}. Without the minus sign, the acceleration would point outwards.' },
    'phys-f2020-q4': { src: S20 + 'Q4', q: 'Newton’s second law is written:',
      o: ['Σ{F_ext} = `m` d{OM}/d`t`', 'Σ{F_ext} = `m` d²{V}/d`t`²', 'Σ{F_ext} = d{p}/d`t`'],
      x: 'Answer checked. Σ{F} = d{p}/d`t` with {p} = `m` {v}; for a constant mass, it is `m` {a}. Option a is `m` {v}, option b differentiates once too many.' },
    'phys-f2020-q5': { src: S20 + 'Q5', q: 'Give an example of a force acting at a distance:',
      o: ['a friction force', 'the electrostatic interaction', 'the restoring force'],
      x: 'Answer checked. The electrostatic interaction, like gravitation, acts without contact. Friction and the restoring force of a spring are contact forces.' },
    'phys-f2020-q8': { src: S20 + 'Q8', q: 'A ball simply released near the Earth’s surface falls vertically: in the terrestrial reference frame, its centre has a non-uniform rectilinear motion. What does the law of inertia say in this case?',
      o: ['that the forces acting on the ball balance each other', 'nothing', 'that the forces acting on the ball do not balance each other'],
      x: 'Official answer key: c. The law of inertia says: forces that balance each other ⇔ rest or uniform rectilinear motion. Here the motion is not uniform, so the forces do not balance each other (the weight wins).' },
    'phys-f2018-q4': { src: S18 + 'Q4', q: 'The work of a variable force {f}, making an angle α with the displacement vector d{l} along the path AB, is:',
      o: ['`W_AB`({f}) = ∫ `f` d`l` sin α', '`W_AB`({f}) = `f` · AB · cos α', '`W_AB`({f}) = ∫ `f` d`l` cos α'],
      x: 'Official answer key: c. The elementary work is {f} · d{l} = `f` d`l` cos α; for a variable force, you add up (integrate) along the path. `f` · AB · cos α only holds for a constant force on a straight path.' },
    'phys-f2018-q5': { src: S18 + 'Q5', q: 'The work-kinetic energy theorem is given by:',
      o: ['Δ`E_c` = `W`({P}), where {P} is the weight', 'Δ`E_c` = `W`({f}), where {f} is the friction force', 'Δ`E_c` = Σ `W`({F_ext})'],
      x: 'Official answer key: c. The change in kinetic energy equals the sum of the work of all the external forces. It is the change in mechanical energy that equals the work of friction.' },
    'phys-f2018-q6': { src: S18 + 'Q6', q: 'With friction (the only non-conservative force), the mechanical energy theorem is written:',
      o: ['Δ`E_m` = 0', 'Δ`E_m` = `W`({f_frott})', 'Δ`E_m` = Δ`E_c`'],
      x: 'Answer checked. The change in mechanical energy equals the work of the non-conservative forces. Δ`E_m` = 0 only without friction. The same question appears in June 2018.' },
    'phys-f2018-q7': { src: S18 + 'Q7', q: 'The work of a force {F} perpendicular to the displacement is:',
      o: ['strictly positive', 'zero', 'strictly negative', 'dependent on the speed'],
      x: 'Answer checked. cos 90° = 0: the force does no work. This is the case for the reaction of a frictionless support, even a curved one.' },
    'phys-f2018-q8': { src: S18 + 'Q8', q: 'A mass `m` slides on a track AB shaped as an arc of a circle with centre O (OA = OB = `R`), from A, at an angle θ from the vertical, to the lowest point B. The work of the weight along AB is:',
      o: ['`W`({P}) = −`m g R`(1 − cos θ)', '`W`({P}) = `m g R` cos θ', '`W`({P}) = `m g R`(1 − cos θ)'],
      x: 'Answer checked. The weight is conservative: `W` = `m g`(`z_A` − `z_B`). A is at a height `R` − `R` cos θ above B; the mass goes down, so the work is positive.' },
    'phys-f2018j-q2': { src: S18J + 'Q2', q: 'The acceleration vector of a decelerated circular motion, in the Frenet basis, is written:',
      o: ['{a} = (`a_T` &lt; 0; `a_N` &lt; 0)', '{a} = (`a_T` &lt; 0; `a_N` &gt; 0)', '{a} = (`a_T` &lt; 0; `a_N` = 0)', '{a} = (`a_T` = 0; `a_N` &gt; 0)'],
      x: 'Answer checked. Decelerated: the norm of the velocity decreases, `a_T` = d`v`/d`t` &lt; 0. `a_N` = `v`²/`R` is always positive as soon as the point turns.' },
    'phys-f2018j-q3': { src: S18J + 'Q3', q: 'In the Frenet basis, the velocity vector of a circular motion of radius `R` is written:',
      o: ['{v} = `R θ̇` {u_T}', '{v} = `R θ̈` {u_T}', '{v} = `R θ̇` {u_N}'],
      x: 'Official answer key: a. The velocity is tangent to the trajectory, with norm `R θ̇`: this is {v} = `R θ̇` {u_θ} from the course, with {u_T} = {u_θ}.' },
    'phys-f2018j-q6': { src: S18J + 'Q6', q: 'A conservative force is a force whose work is:',
      o: ['zero whatever the path', 'strictly positive', 'independent of the path followed'],
      x: 'Official answer key: c. The work of a conservative force depends only on the starting and end points. It is zero only on a closed path.' },
    'phys-f2018j-q7': { src: S18J + 'Q7', q: 'The mechanical energy theorem for any motion is given by:',
      o: ['Δ`E_m` = `W`({P}), where {P} is the weight', 'Δ`E_m` = `W`({f}), where {f} is the friction force', 'Δ`E_m` = Δ`E_c` + Δ`E_p`'],
      x: 'Official answer key: b. The change in mechanical energy equals the work of the non-conservative forces, here the friction. Option c is the definition of `E_m` (true, but it is not the theorem).' },
    'phys-f2018j-q8': { src: S18J + 'Q8', q: 'A mass `m` slides on a track AB shaped as an arc of a circle with centre O (OA = OB = `R`), of angle θ. The work of the friction force {f}, of constant norm, along AB is:',
      o: ['`W`({f}) = −`f R` cos θ', '`W`({f}) = `f`(1 − cos θ)', '`W`({f}) = −`f R` θ'],
      x: 'Answer checked. The friction is opposite to the displacement, along an arc of length `R` θ (θ in radians): `W` = −`f R` θ. Option b does not even have the dimension of a work.' }
  };

  /* same notation as the French file: {v} vector, `x` quantity, subscript after “_” */
  function sub(s) { return /^[xyzrθρ]$/.test(s) ? '<var>' + s + '</var>' : s; }
  function m(s) {
    return String(s)
      .replace(/\{([^{}_]+)(?:_([^{}]+))?\}/g, function (_, b, i) { return '<var class="vec">' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); })
      .replace(/`([^`_]+)(?:_([^`]+))?`/g, function (_, b, i) { return '<var>' + b + '</var>' + (i ? '<sub>' + sub(i) + '</sub>' : ''); });
  }
  Object.keys(E).forEach(function (id) {
    var e = E[id];
    if (e.q) e.q = m(e.q);
    if (e.x) e.x = m(e.x);
    if (e.o) e.o = e.o.map(m);
  });
  REV.i18n.qcm(E);
})();
