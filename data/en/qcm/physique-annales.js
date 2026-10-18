/* English text for data/qcm/physique-annales.js (MCQ questions of the physics midterms, partiel 1).
   November 2017 and November 2021: wording of the official English papers (“Physics Midterm 1”, “PHYSICS TEST”),
   word for word, except one slip: the 2021 paper printed option 3c as “Le mouvement est decelerated”.
   Other years: translated from the French papers, with the vocabulary of the English course.
   Sources are written “Midterm 2017 · MCQ · Q1” (the French src says QCM). Same notation as the French file. */
/* topic names (already given by data/en/qcm/physique.js; repeated in case this file is loaded alone) */
REV.i18n.topics({ 'phys-pva': 'Position, velocity, acceleration', 'phys-mouvement': 'Nature of motion', 'phys-trajectoire': 'Trajectory equation',
  'phys-vecteurs': 'Components and scalar product', 'phys-polaires': 'Polar coordinates and basis',
  'phys-polaires-va': 'Polar velocity and acceleration', 'phys-circulaire': 'Circular motion', 'phys-unites': 'Units and dimensional consistency' });
(function () {
  var FIG = window.PHYS_QFIG || {};
  function fig(base, alt) { if (!FIG.force || !base) return undefined; var o = {}; for (var k in base) o[k] = base[k]; o.alt = alt; return FIG.force(o); }
  function src(year, n) { return 'Midterm ' + year + ' · MCQ · Q' + n; }

  var A_UR = 'The acceleration vector in polar coordinates is given by {a} = (`ρ̈` − `ρ θ̇`²) {u_ρ} + (2`ρ̇ θ̇` + `ρ θ̈`) {u_θ}. ';
  var X_VPOL = 'The midterms write ρ and {u_ρ} what the course writes `r` and {u_r}. {V} = d(`ρ` {u_ρ})/d`t` = `ρ̇` {u_ρ} + `ρ` d{u_ρ}/d`t` = `ρ̇` {u_ρ} + `ρ θ̇` {u_θ}. Without the factor `ρ`, the second component would be in rad·s⁻¹, not m·s⁻¹; without that component, you forget that the basis turns.';
  var X_DUR = '{u_ρ} = cos θ {u_x} + sin θ {u_y} turns with the point: its derivative with respect to θ is {u_θ}, and you multiply by dθ/d`t` = `θ̇`. So it is neither {0} nor collinear to {u_ρ}: a vector of constant norm has a derivative perpendicular to it.';
  var X_PS = '{V_1} · {V_2} = ‖{V_1}‖ ‖{V_2}‖ cos θ, with θ = 180° for two vectors of opposite orientation: cos θ = −1, the product is −‖{V_1}‖ ‖{V_2}‖, strictly negative for non-zero vectors. This is the case {v} · {a} &lt; 0 of a decelerated motion. The scalar product is zero for two orthogonal vectors.';
  var COMP = 'The components of the force vector {F_1} in the diagram below are:';

  var E = {
    /* ================= November 2017 (official English paper; no answer key) ================= */
    'phys-p2017-q1': { src: src(2017, 1),
      q: 'The norm of the net force {R} of two non-vanishing forces {F_1} and {F_2}, which are collinear and of opposite orientation, is',
      x: 'No official answer key; answer checked. Two forces along the same direction with opposite orientations subtract: the norm of their sum is the difference of the norms, in absolute value since a norm is positive. `R` = 0 only if `F_1` = `F_2`; √(`F_1`² + `F_2`²) holds for two perpendicular forces; `F_1` + `F_2` for two forces pointing the same way.' },
    'phys-p2017-q2': { src: src(2017, 2),
      fig: fig(FIG.F2017, 'Axes O, x, y. The vector F1 starts at O and points up and to the right; α is the angle between the Oy axis and F1.'),
      q: 'The components of the vector force {F_1} sketched below are:',
      x: 'No official answer key; answer checked. α is measured from the O`y` axis, not from O`x`: the side adjacent to α is on `y` and takes the cosine; the sine goes on `x`. {F_1} points up and to the right: both components are positive. (`F_1` cos α ; `F_1` sin α) would be right if α were measured from O`x`.' },
    'phys-p2017-q3': { src: src(2017, 3),
      q: 'The scalar product between two collinear vectors which have opposite orientation is',
      o: ['strictly positive', 'vanishing', 'strictly negative'],
      x: 'No official answer key; the same question in May 2018 and in 2019 has the official answer “strictly negative”. ' + X_PS },
    'phys-p2017-q5': { src: src(2017, 5),
      q: 'The velocity vector reads in polar coordinates:',
      x: 'No official answer key; answer checked. ' + X_VPOL },
    'phys-p2017-q8': { src: src(2017, 8),
      q: 'The trajectory equation of the motion whose time-dependent equations are `x`(`t`) = `A` sin(ω`t`) and `y`(`t`) = `B` cos(ω`t`) (where `A`, `B` and ω are positive constants (`A` ≠ `B`)) is:',
      x: 'No official answer key; answer checked. sin(ω`t`) = `x`/`A` and cos(ω`t`) = `y`/`B`; sin² + cos² = 1 gives `x`²/`A`² + `y`²/`B`² = 1: an ellipse centred on O, with semi-axes `A` (along O`x`) and `B` (along O`y`). Adding `x`² and `y`² does not remove the time when `A` ≠ `B`.' },

    /* ================= 2018-2019 (French paper; no answer key) ================= */
    'phys-p2018-q1': { src: src(2018, 1),
      fig: fig(FIG.F2018, 'Axes O, x, y. The vector F1 starts at O and points down and to the right; α is the angle between the negative part of the Oy axis and F1. The vector F2 starts at O along the Ox axis, towards negative x.'),
      q: COMP,
      x: 'No official answer key; answer checked. α is measured from the negative part of the O`y` axis: the adjacent side (cosine) is on `y`, pointing down, hence −`F_1` cos α; the sine goes on `x`, pointing right, hence +`F_1` sin α. Method: find the side adjacent to the angle, then read the signs on the drawing.' },
    'phys-p2018-q2': { src: src(2018, 2),
      fig: fig(FIG.F2018, 'Axes O, x, y. The vector F1 starts at O and points down and to the right. The vector F2 starts at O along the Ox axis, towards negative x.'),
      q: 'The components of the force vector {F_2} in the diagram below are:',
      x: 'No official answer key; answer checked. {F_2} lies on the O`x` axis and points towards negative `x`: component −`F_2` on `x`, nothing on `y`. `F_2` is a norm, positive: the sign comes from the orientation.' },
    'phys-p2018-q4': { src: src(2018, 4),
      q: 'The velocity vector reads in polar coordinates:',
      x: 'No official answer key; same question as in 2017. ' + X_VPOL },
    'phys-p2018-q6': { src: src(2018, 6),
      q: A_UR + 'In the case of an accelerated circular motion of radius `R`, the acceleration vector is written',
      x: 'No official answer key; answer checked. Circular: ρ = `R` is constant, so `ρ̇` = `ρ̈` = 0. Accelerated: `θ̇` varies, `θ̈` ≠ 0, and the component `R θ̈` remains. The component −`R θ̇`² never disappears as long as the point turns.' },

    /* ================= May 2018, S1# section (French paper; official answer key) ================= */
    'phys-p2018s-q1': { src: src('2018#', 1),
      q: 'The norm of the net force {R} of two non-vanishing, orthogonal forces {F_1} and {F_2} is',
      x: 'Matches the official answer key. Two orthogonal vectors are the sides of a rectangle, and their sum is its diagonal: Pythagoras, `R` = √(`F_1`² + `F_2`²). With 3 N and 4 N you get 5 N, not 7 N.' },
    'phys-p2018s-q2': { src: src('2018#', 2),
      fig: fig(FIG.F2018S, 'Axes O, x, y. The vector F1 starts at O and points up and to the left; α is the angle between the Oy axis and F1.'),
      q: COMP,
      x: 'Matches the official answer key. α is measured from the O`y` axis: cosine on `y`, sine on `x`. {F_1} points up and to the left: negative component on `x`, positive on `y`.' },
    'phys-p2018s-q3': { src: src('2018#', 3),
      q: 'The scalar product between two collinear vectors which have opposite orientation is',
      o: ['strictly negative', 'vanishing', 'strictly positive'],
      x: 'Matches the official answer key: strictly negative. ' + X_PS },
    'phys-p2018s-q5': { src: src('2018#', 5),
      q: 'The velocity vector reads in polar coordinates:',
      x: 'Matches the official answer key. ' + X_VPOL },
    'phys-p2018s-q6': { src: src('2018#', 6),
      q: A_UR + 'In the case of a uniform circular motion of radius `R`, the acceleration vector is written',
      x: 'Matches the official answer key. Circular: `ρ̇` = `ρ̈` = 0; uniform: `θ̇` is constant, so `θ̈` = 0. What remains is −`R θ̇`² on {u_ρ}: the acceleration is centripetal, not zero.' },

    /* ================= 2019-2020 (French paper; official answer key with marking scheme) ================= */
    'phys-p2019-q1': { src: src(2019, 1),
      q: 'The scalar product of two non-zero, collinear vectors of opposite orientations is',
      o: ['strictly positive', 'zero', 'strictly negative'],
      x: 'Matches the official answer key. ' + X_PS },
    'phys-p2019-q2': { src: src(2019, 2),
      fig: fig(FIG.F2019, 'Axes O, x, y. The vector F1 starts at O and points down and to the left; α is the angle between the negative part of the Oy axis and F1.'),
      q: 'The components of the force vector {F_1} shown in the diagram below are:',
      x: 'Matches the official answer key. α is measured from the negative part of the O`y` axis: cosine on `y`, sine on `x`. {F_1} points down and to the left: both components are negative.' },
    'phys-p2019-q4': { src: src(2019, 4),
      q: 'The derivative with respect to the variable `t` of the function `f`(`t`) = `A` cos²(θ(`t`)), where `A` is a constant, is',
      x: 'Matches the official answer key. Two nested chain rules: (`u`²)′ = 2`u u`′ with `u` = cos θ, and (cos θ)′ = −`θ̇` sin θ. Hence −2`A θ̇` cos θ sin θ. The other two answers forget the minus sign or the factor `θ̇`.' },
    'phys-p2019-q5': { src: src(2019, 5),
      q: 'The velocity vector in cylindrical coordinates is written:',
      x: 'Matches the official answer key. Cylindrical coordinates add to polar ones the height `z`, on a fixed axis {u_z}: {OM} = `ρ` {u_ρ} + `z` {u_z}. Differentiating adds `ż` {u_z} to the velocity in polar coordinates. At the edge of the syllabus: this year’s course only covers polar coordinates; the coordinate help sheet on Moodle shows cylindrical ones.' },
    'phys-p2019-q6': { src: src(2019, 6),
      q: A_UR + 'In the case of a decelerated circular motion of radius `R`, the acceleration vector is written',
      x: 'Matches the official answer key. Circular: `ρ̇` = `ρ̈` = 0. Decelerated does not change the expression: `θ̈` simply has the opposite sign to `θ̇`. What remains is −`R θ̇`² on {u_ρ} and `R θ̈` on {u_θ}.' },
    'phys-p2019-q7': { src: src(2019, 7),
      q: 'The unit vector {u_ρ} of polar coordinates satisfies:',
      x: 'Matches the official answer key. ' + X_DUR },
    'phys-p2019-q8': { src: src(2019, 8),
      q: 'The equations of motion of a point in polar coordinates are `ρ`(`t`) = `ρ_0` e<sup>ω`t`</sup> and θ(`t`) = ω`t`; `ρ_0` and ω are positive constants. The equations of motion of this point in Cartesian coordinates are:',
      x: 'Matches the official answer key. `x` = `ρ` cos θ and `y` = `ρ` sin θ, with `ρ` = `ρ_0` e<sup>ω`t`</sup> and θ = ω`t`. The cosine goes on `x` because θ is measured from O`x`. The answer with `ρ_0` sin(ω`t`) forgets the exponential. The point moves along a spiral.' },

    /* ================= 2020-2021 (French paper; official answer key) ================= */
    'phys-p2020-q1': { src: src(2020, 1),
      q: 'The velocity vector in polar coordinates is written:',
      x: 'Matches the official answer key. ' + X_VPOL + ' Differentiate once: `ρ` instead of `ρ̇`, or `θ̈` instead of `θ̇`, are missing or extra derivatives.' },
    'phys-p2020-q2': { src: src(2020, 2),
      q: 'The unit vector {u_ρ} of polar coordinates satisfies:',
      x: 'Matches the official answer key. ' + X_DUR },
    'phys-p2020-q3': { src: src(2020, 3),
      q: A_UR + 'In the case of a uniform circular motion of radius `R`, the acceleration vector is written:',
      x: 'Matches the official answer key. Circular: `ρ̇` = `ρ̈` = 0; uniform: `θ̈` = 0. What remains is −`R θ̇`² on {u_ρ}: the acceleration points towards the centre.' },
    'phys-p2020-q4': { src: src(2020, 4),
      q: 'A point moves in the (`x`, `y`) plane from the time `t` = 1 s. Its equations of motion are `x`(`t`) = ln(`t`) and `y`(`t`) = `t` + 1/`t`. The velocity vector of this motion in Cartesian coordinates is:',
      x: 'Matches the official answer key. (ln `t`)′ = 1/`t`; (1/`t`)′ = −1/`t`², hence `ẏ` = 1 − 1/`t`². The trap is the minus sign in the derivative of 1/`t`.' },
    'phys-p2020-q7': { src: src(2020, 7),
      q: 'The velocity vector of a motion with equations of motion `x`(`t`) = −2`t`³ − `t` and `y`(`t`) = 4`t`² is:',
      x: 'Matches the official answer key. (`t`³)′ = 3`t`²: the exponent comes down as a factor and decreases by 1. So (−2`t`³)′ = −6`t`², (−`t`)′ = −1 and (4`t`²)′ = 8`t`.' },
    'phys-p2020-q8': { src: src(2020, 8),
      q: 'Consider a motion in the (`x`, `y`) plane whose equations of motion are `x`(`t`) = `R` cos(ω`t`) and `y`(`t`) = `R` sin(ω`t`), where `R` and ω are positive constants. The trajectory equation of this motion is:',
      x: 'Matches the official answer key. cos² + sin² = 1 gives `x`² + `y`² = `R`², which can also be written `x`²/`R`² + `y`²/`R`² = 1: a circle centred on O with radius `R`. The usual form was not offered as such: you had to recognise it. `x`² + `y`² = `R` is not dimensionally consistent (m² on one side, m on the other).' },

    /* ================= November 2021 (official English paper; official answer key) ================= */
    'phys-p2021-q1': {
      q: 'A motion is said uniform if',
      o: ['Its trajectory is a straight line.', 'Its acceleration is constant over time.', 'Its velocity is constant over time.', 'Its velocity and acceleration vary very few over time.'],
      x: 'Right answer: c, the norm of the velocity is constant. Careful: the official answer key circles d, which is a mistake; “vary very few” defines nothing. A straight trajectory means a rectilinear motion; a constant acceleration, a uniformly varied motion. A circular motion can be uniform.' },
    'phys-p2021-q2': {
      q: 'In polar coordinates, ({u_ρ}, {u_θ}), position vector {r}(`t`) = {OM}(`t`) has for expression:',
      o: ['{r}(`t`) = `ρ` {u_ρ} + θ {u_θ}', '{r}(`t`) = `ρ` {u_ρ}', '{r}(`t`) = θ {u_ρ} + `ρ` {u_θ}', '{r}(`t`) = `ρ` {u_θ}'],
      x: 'Matches the official answer key. {u_ρ} points along {OM} and OM = `ρ`, so {OM} = `ρ` {u_ρ}, with no component on {u_θ}. θ is an angle, dimensionless: it cannot be a component of a vector in metres.' },
    'phys-p2021-q3': {
      q: 'A moving particle has a rectilinear trajectory along the X-axis. Its trajectory equation is `x`(`t`) = 10 − 2`t`².',
      o: ['The motion is uniform.', 'The motion is uniformly circular.', 'The motion is decelerated.', 'Acceleration magnitude is 2 m/s²', 'None of these statements is correct'],
      x: 'None of the four statements of the paper is correct, and the official answer key circles nothing: the answer “None of these statements is correct” was added here. (The paper calls `x`(`t`) a “trajectory equation”: it is the equation of motion.) `ẋ` = −4`t` and `ẍ` = −4 m·s⁻²: the magnitude of the acceleration is 4 m·s⁻², not 2 (the factor 2 from differentiating `t`² is forgotten). `v a` = 16`t` > 0 for `t` > 0: the motion is accelerated, even though `x` decreases. It is neither uniform nor circular: it is a uniformly accelerated rectilinear motion, towards decreasing `x`.' },
    'phys-p2021-q4': {
      q: 'Consider a moving particle whose position at each instant `t` is given by its position vector {r}(`t`) = {OM}(`t`). Acceleration vector {a}(`t`) of this motion has for expression:',
      o: ['{a}(`t`) = d`r`(`t`)/d`t`²', '{a}(`t`) = d²{r}(`t`)/d`t`²', '{a}(`t`) = [d{r}(`t`)/d`t`]²', '`a`(`t`) = √`r`(`t`)'],
      x: 'Matches the official answer key. Acceleration is the derivative of velocity, itself the derivative of position: it is the second derivative of {OM}. Squaring the velocity does not give an acceleration: neither the right vector nor the right unit (m²·s⁻²).' },
    'phys-p2021-q5': {
      q: 'Two vectors are perpendicular if their scalar product is equal to zero.',
      x: 'Official answer key: true. {V_1} · {V_2} = ‖{V_1}‖ ‖{V_2}‖ cos θ is zero for θ = 90° when the vectors are non-zero. In kinematics: {v} · {a} = 0 with {a} ≠ {0}, the velocity keeps its norm and only its direction changes.' },

    /* ================= October 2022 (French paper; marked student paper, no answer key; several answers possible) ================= */
    'phys-p2022-q1': {
      q: 'The unit of an acceleration can be:',
      x: 'No official answer key; on the marked paper, b is accepted. An acceleration is a velocity (m·s⁻¹) divided by a time: m·s⁻². kg·m·s⁻¹ is the unit of momentum.' },
    'phys-p2022-q2': {
      q: 'Choose the correct statement(s):',
      o: ['A motion can be uniform along only one of its components', 'The trajectory equation tells you whether the motion is uniform', 'In a uniform circular motion, the acceleration is zero', 'In a uniform rectilinear motion, the acceleration is zero'],
      x: 'No official answer key; on the marked paper, a and d are accepted. a: projectile motion is uniform along `x` (`v_x` constant). b: false, `y`(`x`) no longer contains time, it says nothing about the speed. c: false, the acceleration is centripetal, with norm `R` ω². d: true, {v} is constant.' },
    'phys-p2022-q3': {
      q: 'A motion has the equations of motion `x`(`t`) = 4`t` and `y`(`t`) = 3`t`² − 6`t` + 5.',
      o: ['This motion is decelerated', 'This motion is uniform', 'The velocity is zero at one point of the trajectory', 'This motion is parabolic'],
      x: 'No official answer key; on the marked paper, “the velocity is zero” is crossed out and “parabolic” accepted. {v} = (4 ; 6`t` − 6) is never zero, since `v_x` = 4. With `t` = `x`/4: `y` = 3`x`²/16 − 3`x`/2 + 5, a parabola. {v} · {a} = 36(`t` − 1): decelerated before 1 s, accelerated after, so neither over the whole motion. ‖{v}‖ varies: it is not uniform.' },
    'phys-p2022-q4': {
      q: 'In cylindrical coordinates, the position vector is written:',
      x: 'No official answer key; on the marked paper, c is crossed out. As in polar coordinates, there is no component on {u_θ}; you add the height `z` on the fixed axis {u_z}. At the edge of the syllabus: the coordinate help sheet on Moodle shows this system, the course only covers polar coordinates.' },
    'phys-p2022-q5': {
      q: 'In polar coordinates, the velocity vector is written:',
      x: 'No official answer key; on the marked paper, d is accepted. ' + X_VPOL },
    'phys-p2022-q6': {
      q: 'For a uniform circular motion:',
      o: ['`θ̇` = constant', '`θ̇` = 0', '`θ̈` = 0', '`ρ̇` = 0'],
      x: 'No official answer key; on the marked paper, the marker adds c to the student’s answers a and d. Circular: `ρ` = `R` is constant, so `ρ̇` = 0. Uniform: `θ̇` is constant, and non-zero since the point turns, so `θ̈` = 0.' }
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
    if (e.fig === undefined) delete e.fig;
  });
  REV.i18n.qcm(E);
})();
