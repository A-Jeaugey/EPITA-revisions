/* English text for data/phys2/ex-td.js (TD 6 to 8 and the October 2025 midterm, merged over the French file by id, field by field).
   The English sheets of the Moodle (TD 6, midterm 2025) are scans without usable text: the statements are translated
   faithfully with the vocabulary of the official English course (restoring force, spring constant, natural length,
   natural angular frequency, Newton’s second law, initial conditions, standing waves, nodes, antinodes…). Decimal points
   and thousands commas, as in the English course. The figures come from window.PHYS2_TDFIGS (French file), with English
   text for screen readers. Same notation helpers as the French file (X, E, P, ul). */
(function () {
  var R = window.REV;
  var F = window.PHYS2_FMT, X = F.X, E = F.E, P = F.P, ul = F.ul;
  var G = window.PHYS2_TDFIGS;
  if (!F || !G || !R || !R.i18n) return;
  var NOTE_WRITTEN = 'No published answer key: solution written and checked by calculation.';

  R.i18n.patch(window.PHYS2_EX, {

    /* ================= TD 6 ================= */
    'td6-ex1': {
      src: 'TD 6 · Ex 1', title: 'Forces on springs',
      intro: P('In each case, express the force exerted by the spring on the solid attached at M as a function of the spring constant $k$ and the natural length $ℓ_0$ of the spring, of the position $x$ or $z$ of the point M, of the position $x_H$ or $z_H$ of the point H where the spring is attached to a support, and of the unit vector $u⃗_x$ or $u⃗_z$. Positions are measured from the point O.') +
        P('In the last case, express the forces exerted by the two springs on each of the points M₁ and M₂, with coordinates $x_1$ and $x_2$. The two springs are assumed to be different, with characteristics $k$, $ℓ_0$ and $k′$, $ℓ′_0$.'),
      figs: [{ svg: G.ressorts('Six set-ups: 1, spring between O = H and M on the right; 2, M then the support H on the right; 3, the support H then M on the right; 4, vertical spring hanging from the ceiling at O = H, M below; 5, spring standing on the floor at O = H, M above; 6, two springs in series between O = H, M1 and M2.'), cap: 'The six set-ups (the $z$ axis points up in cases 4 and 5).' }],
      questions: [X('Express the force of the spring on M in cases 1 to 5, then the forces of the two springs on M₁ and on M₂ in case 6.')],
      hints: [X('First write the length $ℓ$ of the spring from the positions (always positive), then the unit vector $u⃗$ from H to M.'), X('$F⃗ = −k(ℓ − ℓ_0) u⃗$. Check: stretched spring, the force points from M to H.')],
      solution: [
        { t: 'Cases 1 to 3: horizontal', html: E('1 :  ℓ = x,  u⃗ = u⃗_x  ⇒  F⃗ = −k(x − ℓ_0) u⃗_x', '2 :  ℓ = x_H − x,  u⃗ = −u⃗_x  ⇒  F⃗ = k(x_H − x − ℓ_0) u⃗_x', '3 :  ℓ = x − x_H,  u⃗ = u⃗_x  ⇒  F⃗ = −k(x − x_H − ℓ_0) u⃗_x') },
        { t: 'Cases 4 and 5: vertical', html: E('4 :  ℓ = −z,  u⃗ = −u⃗_z  ⇒  F⃗ = k(−z − ℓ_0) u⃗_z', '5 :  ℓ = z,  u⃗ = u⃗_z  ⇒  F⃗ = −k(z − ℓ_0) u⃗_z') +
          P('In case 4, M is below O: its height $z$ is negative and the length is $−z$.') },
        { t: 'Case 6: two springs', html: P('Both springs act on M₁; on M₂, only the second one does.') +
          E('@t{on M₁ :}  F⃗_1 = −k(x_1 − ℓ_0) u⃗_x   @t{and}   F⃗_2 = k′(x_2 − x_1 − ℓ′_0) u⃗_x', '@t{on M₂ :}  F⃗_3 = −k′(x_2 − x_1 − ℓ′_0) u⃗_x') +
          P('$F⃗_2$ and $F⃗_3$ are opposite: it is the same spring, pulling its two ends towards each other (third law).') }],
      answer: ul(['1: $−k(x − ℓ_0) u⃗_x$; 2: $k(x_H − x − ℓ_0) u⃗_x$; 3: $−k(x − x_H − ℓ_0) u⃗_x$', '4: $k(−z − ℓ_0) u⃗_z$; 5: $−k(z − ℓ_0) u⃗_z$', '6: on M₁, $−k(x_1 − ℓ_0) u⃗_x + k′(x_2 − x_1 − ℓ′_0) u⃗_x$; on M₂, $−k′(x_2 − x_1 − ℓ′_0) u⃗_x$']),
      traps: [X('Writing $−kx$ without taking the position of the attachment point into account.'), X('In case 6, forgetting that M₁ is acted on by both springs.')],
      note: 'The official answer key writes the force on M₂ with $k$ instead of $k′$: it is a typo.'
    },

    'td6-ex2': {
      src: 'TD 6 · Ex 2', title: 'Vertical spring',
      intro: P('A ball of mass $m$ is hung from a vertical spring of spring constant $k$ and natural length $ℓ_0$. The ball is initially pulled down and then released. At the moment of release, the spring has length $L = 3ℓ_0/2$. The initial velocity is zero and friction is negligible. Take the origin O at the fixed point of the spring, with the $z$ axis vertical, pointing up.'),
      questions: [X('1. Add to the diagram the forces acting on the ball when it is at any point M of height $z$, the spring being stretched.'),
        X('2. Use Newton’s second law to determine the equilibrium position $z_e$ as a function of $m$, $k$, $ℓ_0$ and the gravitational field $g$.'),
        X('3. Use Newton’s second law to obtain the acceleration vector as a function of $m$, $k$, $ℓ_0$, $g$ and the unit vector $u⃗_z$.'),
        X('4. Project this expression on the relevant axis of the problem and write the resulting differential equation in its standard form, that is $z̈ + a ż + b z = c$. Find the expressions of the coefficients $a$, $b$ and $c$ as functions of $m$, $k$, $ℓ_0$ and $g$.'),
        X('5. With the change of variable $Z = z − z_e$, show that the differential equation takes the form $Z̈ + ω_0² Z = 0$. Give the expression of the natural angular frequency $ω_0$ as a function of $m$ and $k$.'),
        X('6. The solution of the previous equation has the general form $Z(t) = A cos(ω_0 t) + B sin(ω_0 t)$, where $A$ and $B$ are constants to be determined. Use the initial conditions to find their expressions and give the final expression of $z(t)$ as a function of $z_e$, $ℓ_0$ and $ω_0 t$.')],
      hints: [X('The ball is below O: $z$ &lt; 0 and the length of the spring is $−z$. The restoring force is $k(−z − ℓ_0) u⃗_z$.'), X('At equilibrium, the acceleration is zero. For question 6: $Z(0) = z(0) − z_e$ with $z(0) = −3ℓ_0/2$.')],
      solution: [
        { t: 'Questions 1 and 2: forces and equilibrium', html: P('The weight $P⃗ = −mg u⃗_z$ and the restoring force $F⃗ = k(−z − ℓ_0) u⃗_z$, upwards when the spring is stretched. At equilibrium:') +
          E('k(−z_e − ℓ_0) − mg = 0  ⇒  z_e = −(ℓ_0 + @f{mg}{k})') + P('At equilibrium, the spring is longer than $ℓ_0$ by $mg/k$.') },
        { t: 'Questions 3 and 4: equation of motion', html: E('a⃗ = [@f{k}{m}(−z − ℓ_0) − g] u⃗_z', 'z̈ + @f{k}{m} z = −(g + @f{kℓ_0}{m})') +
          P('So $a = 0$ (no friction), $b = k/m$ and $c = −(g + kℓ_0/m)$, which is also $(k/m) z_e$.') },
        { t: 'Question 5: change of variable', html: P('$Z = z − z_e$ gives $Z̈ = z̈$ and $(k/m) z = (k/m) Z + (k/m) z_e$: the constant term cancels with $c$.') + E('Z̈ + ω_0² Z = 0,   ω_0 = @r{k/m}') },
        { t: 'Question 6: initial conditions', html: E('Z(0) = A = −@f{3ℓ_0}{2} − z_e', 'Ż(0) = Bω_0 = 0  ⇒  B = 0', 'z(t) = z_e − (@f{3ℓ_0}{2} + z_e) cos(ω_0 t)') +
          P('Check: at $t = 0$, $z = −3ℓ_0/2$. The ball oscillates around $z_e$ with amplitude $|mg/k − ℓ_0/2|$.') }],
      answer: ul(['$z_e = −(ℓ_0 + mg/k)$', '$z̈ + (k/m) z = −(g + kℓ_0/m)$: $a = 0$, $b = k/m$, $c = −(g + kℓ_0/m)$', '$ω_0 = @r{k/m}$', '$z(t) = z_e − (3ℓ_0/2 + z_e) cos(ω_0 t)$']),
      traps: [X('Forgetting that $z$ is negative below O: the length is $−z$, not $z$.'), X('Taking $3ℓ_0/2$ as the amplitude: the amplitude is measured from the equilibrium.')],
      note: 'The official TD 6 answer key has two errors in this exercise: it states “$ω_0 = @r{g/l}$” (that is the angular frequency of the pendulum; here $ω_0 = @r{k/m}$) and takes $3ℓ_0/2$ as the initial value of the offset from equilibrium, hence “$y(t) = (3/2) ℓ_0 cos(ω_0 t)$”. Solution redone and checked (sympy).'
    },

    'td6-ex3': {
      src: 'TD 6 · Ex 3', title: 'Vibration mode of an HCl molecule',
      intro: P('The vibration frequency of the hydrogen chloride molecule HCl is measured by spectroscopy to be $f$ = 8.5·10¹³ Hz. In this exercise we look at a first simple model of the molecule, described as a mobile hydrogen atom linked to a fixed chlorine atom. The interaction between the two atoms is modelled by a spring of spring constant $k$.') +
        P('Data: $M_H$ = 1.0 g·mol⁻¹; $M_Cl$ = 35.5 g·mol⁻¹; Avogadro’s number $N_A$ = 6.0·10²³ mol⁻¹.'),
      questions: [X('1. Why is it reasonable to assume that the chlorine atom is fixed?'),
        X('We assume that the total energy of the molecule $E_total$ is equal to $hf/2$, where $h$ = 6.62·10⁻³⁴ J·s is Planck’s constant and $f$ the vibration frequency in hertz. The frequency is related to the natural angular frequency by $f = ω_0/(2π)$. 2. Calculate its spring constant $k$.'),
        X('3. When is the kinetic energy of the molecule maximal?'),
        X('4. By writing a relation between $E_total$ and the kinetic energy at a specific moment, calculate the maximum speed of the hydrogen atom.'),
        X('5. When is the elastic potential energy of the molecule maximal?'),
        X('6. By writing a relation between $E_total$ and the elastic potential energy at a specific moment, calculate the amplitude of its motion. The size of the H-Cl bond is 127 pm. Compare the amplitude of the motion with this value.')],
      hints: [X('Mass of an atom: $m_H = M_H/N_A$, with $M_H$ in kg·mol⁻¹.'), X('$ω_0 = 2πf = @r{k/m_H}$. The total energy is kinetic when passing through equilibrium, elastic at the extremes.')],
      solution: [
        { t: 'Question 1: the chlorine atom', html: P('Chlorine is 35.5 times heavier than hydrogen: for the same forces, it moves 35.5 times less. We assume it fixed.') },
        { t: 'Question 2: spring constant', html: E('m_H = @f{1.0·10⁻³}{6.0·10²³} ≈ 1.67·10⁻²⁷ kg', 'k = 4π²f² m_H = @f{4π²f²M_H}{N_A} ≈ 4.7·10² N·m⁻¹') },
        { t: 'Questions 3 and 4: maximum speed', html: P('The kinetic energy is maximal when passing through the equilibrium position, where the spring is neither stretched nor compressed ($E_pe$ = 0).') +
          E('@f{hf}{2} = ½ m_H v_max²  ⇒  v_max = @r{@f{hf}{m_H}} ≈ 5.8·10³ m·s⁻¹') },
        { t: 'Questions 5 and 6: amplitude', html: P('The elastic potential energy is maximal at the extremes of the motion, where the speed is zero.') +
          E('@f{hf}{2} = ½ k A²  ⇒  A = @r{@f{hf}{k}} ≈ 1.1·10⁻¹¹ m = 11 pm') + P('That is about 9 % of the bond length (127 pm).') }],
      answer: ul(['$k$ ≈ 4.7·10² N·m⁻¹', '$v_max$ ≈ 5.8·10³ m·s⁻¹ (when passing through equilibrium)', '$A$ ≈ 11 pm, about 9 % of the bond (at the extremes)']),
      traps: [X('Keeping $M_H$ in g·mol⁻¹: you need 1.0·10⁻³ kg·mol⁻¹.'), X('Confusing $f$ and $ω_0$: $ω_0 = 2πf$.')],
      note: 'The official answer key rounds the variation of the bond to 10 %; the calculation gives 11/127 ≈ 9 %.'
    },

    /* ================= TD 7 ================= */
    'td7-ex1': {
      src: 'TD 7 · Ex 1', title: 'Simple pendulum: the second law in the polar basis',
      intro: P('A ball of mass $M$ is hung from an inextensible string of length $l$. At the start, the string makes an angle $θ_0$ with the vertical and the angular velocity $θ̇$ of the mass is zero.') +
        P('Recall that, in the general case, the acceleration in polar coordinates is $a⃗ = (r̈ − rθ̇²) u⃗_r + (2ṙθ̇ + rθ̈) u⃗_θ$.'),
      figs: [{ svg: G.pendule('Simple pendulum: string of length l attached at O, angle theta with the vertical, polar basis u r along the string towards M and u theta perpendicular to it.'), cap: 'The pendulum and the polar basis at M.' }],
      questions: [X('1. Add the forces acting on the mass to the diagram.'), X('2. Use Newton’s second law to obtain the equation for the acceleration.'),
        X('3. Project the expression on the proposed axes.'), X('4. Write the resulting differential equation in its standard form.'), X('5. Solve the differential equation using the initial conditions.')],
      hints: [X('The string is taut: $r = l$ is constant, so $ṙ = r̈ = 0$.'), X('The weight projects as $Mg cos θ$ on $u⃗_r$ and $−Mg sin θ$ on $u⃗_θ$. For small angles, $sin θ ≈ θ$.')],
      solution: [
        { t: 'Questions 1 and 2', html: P('Two forces: the weight $P⃗ = M g⃗$, vertical downwards, and the tension $T⃗ = −T u⃗_r$, directed from M to O.') + E('P⃗ + T⃗ = M a⃗,   a⃗ = −lθ̇² u⃗_r + lθ̈ u⃗_θ') },
        { t: 'Question 3: projections', html: E('@t{on} u⃗_r :  Mg cos θ − T = −Mlθ̇²', '@t{on} u⃗_θ :  −Mg sin θ = Mlθ̈') + P('The first gives the tension, $T = Mg cos θ + Mlθ̇²$; the second, the motion.') },
        { t: 'Question 4: standard form', html: E('θ̈ + @f{g}{l} sin θ = 0') + P('For small angles (in radians), $sin θ ≈ θ$:') + E('θ̈ + ω_0² θ = 0,   ω_0 = @r{g/l}') },
        { t: 'Question 5: solution', html: E('θ(t) = A cos(ω_0 t) + B sin(ω_0 t)', 'θ(0) = A = θ_0,   θ̇(0) = Bω_0 = 0  ⇒  B = 0', 'θ(t) = θ_0 cos(@r{g/l} t)') + P('Period $T_0 = 2π@r{l/g}$, independent of the mass.') }],
      answer: ul(['$T = Mg cos θ + Mlθ̇²$', '$θ̈ + (g/l) sin θ = 0$, that is $θ̈ + (g/l) θ = 0$ for small angles', '$θ(t) = θ_0 cos(@r{g/l} t)$']),
      traps: [X('Forgetting the minus sign of the tangential component of the weight.'), X('Using $sin θ ≈ θ$ with $θ$ in degrees.')],
      note: NOTE_WRITTEN
    },

    'td7-ex2': {
      src: 'TD 7 · Ex 2', title: 'Simple pendulum: energy approach',
      intro: P('A mass $m$ is attached to an inextensible string of length $l$. It is located by the angle θ that the string makes with the vertical. Friction is neglected.'),
      questions: [X('1. Give the general expression of the gravitational potential energy of the system as a function of $m$, $g$, $l$ and θ. When is it maximal? When is it minimal?'),
        X('2. Give the general expression of the kinetic energy of the system as a function of $m$, $l$ and $θ̇$. When is it maximal? When is it minimal?'),
        X('3. Give the literal expression of the mechanical energy. What can be said about the mechanical energy in this particular case?'),
        X('4. Use the conservation of mechanical energy to recover the equation of a harmonic oscillator.'),
        X('5. The mass is released from rest with $θ(0) = θ_0$. Given the initial conditions, determine the time evolution of the angle θ. Express it as a function of θ, $l$ and $g$.'),
        X('6. Sketch the curve of θ as a function of time (the statement writes “between [2π ; 2π]”). Do the same for the kinetic, gravitational potential and mechanical energies.')],
      hints: [X('Origin of $E_p$ at the lowest point: the mass is at height $l(1 − cos θ)$ there.'), X('On a circle of radius $l$, $v = lθ̇$. Differentiate $E_M$ with respect to time, then use $sin θ ≈ θ$.')],
      solution: [
        { t: 'Questions 1 and 2', html: E('E_p = mgl(1 − cos θ)', 'E_c = ½ m l² θ̇²') + P('$E_p$ is minimal (zero) at θ = 0, maximal at the extremes θ = ±θ₀. $E_c$ is maximal at θ = 0, zero at the extremes where the mass turns round.') },
        { t: 'Question 3: mechanical energy', html: E('E_M = ½ m l² θ̇² + mgl(1 − cos θ)') + P('It is conserved: no friction, and the tension, perpendicular to the velocity, does no work.') },
        { t: 'Question 4: the equation', html: E('@f{dE_M}{dt} = m l² θ̇ θ̈ + mgl sin θ θ̇ = 0  ⇒  θ̈ + @f{g}{l} sin θ = 0') + P('For small angles, $θ̈ + (g/l) θ = 0$: harmonic oscillator of natural angular frequency $ω_0 = @r{g/l}$.') },
        { t: 'Question 5: time evolution', html: E('θ(t) = θ_0 cos(@r{g/l} t)') },
        { t: 'Question 6: the curves', html: P('θ(t) is a sinusoid of period $T_0 = 2π@r{l/g}$, between −θ₀ and θ₀. For small angles, $E_p ≈ ½ mgl θ_0² cos²(ω_0 t)$ and $E_c = ½ mgl θ_0² sin²(ω_0 t)$: they oscillate with period $T_0/2$, in antiphase, and their sum $E_M = ½ mgl θ_0²$ is a horizontal line. The curves are drawn in chapter 4, part 3.') }],
      answer: ul(['$E_p = mgl(1 − cos θ)$; $E_c = ½ ml²θ̇²$; $E_M$ constant', '$θ̈ + (g/l) θ = 0$ for small angles', '$θ(t) = θ_0 cos(@r{g/l} t)$']),
      traps: [X('Writing $E_p = mgl cos θ$: with the origin at the lowest point, it is $mgl(1 − cos θ)$.'), X('Writing $E_c = ½ mθ̇²$: the speed is $lθ̇$.')],
      note: NOTE_WRITTEN + ' The interval “[2π ; 2π]” in the statement is a typo.'
    },

    /* ================= TD 8 ================= */
    'td8-ex1': {
      src: 'TD 8 · Ex 1', title: 'Misconceptions about waves',
      intro: P('The following questions aim to correct a few bad reflexes about waves. All the questions are independent; the rope is always fixed at the end I and held in the hand at the point O. Scale: 10 cm per square on the vertical axis.'),
      questions: [X('1. In the middle of the rope there is a red point R. By moving the hand, the shape of the rope observed after 2 s shows a bump that has not yet reached R. Is there a way of moving the hand that lets the wave reach the red point after 2 s?'),
        X('2. The wave speed is 1 square per second. The hand is raised by 10 cm in 1 s and brought back to its initial position in 1 s. The instant when the hand starts moving is taken as the origin of time. Draw the shape of the rope at $t$ = 1 s (at $t$ = 6 s, the bump is between 4 and 6 squares from O).'),
        X('3. The wave speed on a first rope is 1 square per second, on a second one 2 squares per second. Same gesture of the hand. Draw the shape of the two ropes at $t$ = 3 s.'),
        X('4. On a rope, a bump and a trough of the same shape propagate in opposite directions. Sketch the rope when the centres of the two waves overlap.')],
      hints: [X('The wave speed depends on the rope, not on the hand.'), X('A point $x$ squares from O reproduces the gesture of the hand with a delay $x/c$.')],
      solution: [
        { t: 'Question 1: speeding up the wave?', html: P('No. In 2 s, the wavefront travels $2c$ whatever the gesture. Moving the hand faster makes the bump narrower, not faster. You would need a rope with a higher wave speed (more taut or lighter).') },
        { t: 'Question 2: shape at t = 1 s', html: P('At $t$ = 1 s, the hand has just reached the top (10 cm) and the wavefront is 1 square from O. Between $x$ = 0 and $x$ = 1 square, the rope rises from 0 (at the front) to 10 cm (at the hand): half a bump. Beyond that, the rope is still at rest.') },
        { t: 'Question 3: two ropes', html: P('Rope 1: the point at $x$ reproduces the gesture with a delay of $x$ s; at $t$ = 3 s, the bump covers $x$ from 1 to 3 squares, peak at 2. Rope 2: delay $x/2$; the bump covers $x$ from 2 to 6 squares, peak at 4. Same height (10 cm), twice as wide and twice as far.') },
        { t: 'Question 4: bump and trough', html: P('The displacements add up: a bump and a trough of the same shape cancel. At that instant, the rope is flat (but its points are moving). Afterwards, the bump and the trough carry on, unchanged.') }],
      answer: ul(['1: no, the wave speed depends only on the rope', '2: half a bump between O (10 cm) and 1 square', '3: same height; bump from 1 to 3 squares (rope 1), from 2 to 6 squares (rope 2)', '4: flat rope at that instant']),
      traps: [X('Thinking that a more energetic gesture speeds up the wave.'), X('Thinking that matter moves along with the wave.')],
      note: NOTE_WRITTEN + ' The ropes of questions 2 and 3 are drawn in chapter 5, part 2.'
    },

    'td8-ex2': {
      src: 'TD 8 · Ex 2', title: 'The microwave oven',
      intro: P('The principle of the microwave oven is to heat food using waves with a frequency of 2.45 GHz, which shake the water molecules 2.45 billion times per second. The speed of light is 300,000 km/s.'),
      questions: [X('1. Calculate the wavelength of the waves used in the microwave oven.'), X('2. Determine whether microwaves correspond to waves with micrometre wavelengths.'),
        X('3. Which range do they belong to?'), X('4. Can standing waves exist in the microwave oven? Is it a problem?')],
      hints: [X('$λ = c/f$, with $c$ = 3·10⁸ m·s⁻¹ and $f$ = 2.45·10⁹ Hz.'), X('The walls of the oven are metallic: they reflect the waves.')],
      solution: [
        { t: 'Questions 1 to 3', html: E('λ = @f{c}{f} = @f{3·10⁸}{2.45·10⁹} ≈ 0.12 m') + P('12 cm: this is a centimetre length, not a micrometre one (10⁻⁶ m). These are electromagnetic waves in the microwave range, between infrared and radio waves.') },
        { t: 'Question 4: standing waves', html: P('Yes: the waves are reflected by the metal walls and superpose into standing waves. At the nodes, spaced by λ/2 ≈ 6 cm, the amplitude is zero and the food heats little: the cooking is uneven. That is why the turntable rotates.') }],
      answer: ul(['λ ≈ 12 cm', 'not micrometric: microwave range (electromagnetic)', 'standing waves: nodes every 6 cm, hence the turntable']),
      traps: [X('Forgetting to convert GHz (10⁹) and km/s (10³).')],
      note: NOTE_WRITTEN
    },

    'td8-ex3': {
      src: 'TD 8 · Ex 3', title: 'Listening to music: the wall behind the listener',
      intro: P('The quality of the music you hear from a hi-fi system depends on how the loudspeakers are placed relative to the listener. In particular, you must absolutely avoid the configuration in which a wall stands too short a distance $D$ behind the listener.') +
        P('Suppose the wave coming from the loudspeaker is harmonic with frequency $f$. It is reflected by the wall with no phase shift for the pressure, the quantity to which the listener’s ear is sensitive. Let $c$ = 343 m·s⁻¹ be the speed of sound in air.'),
      questions: [X('1. With the help of a clear diagram, express the time offset Δτ between the two waves reaching the listener’s ear, the one coming directly from the loudspeaker and the one reflected by the wall.'),
        X('2. Deduce the phase shift Δφ between the two waves.'), X('3. Explain why there is a risk that the amplitude perceived by the listener decreases for certain frequencies.'),
        X('4. Express these frequencies as a function of an integer $n$. What condition must the distance $D$ satisfy so that none of them is in the audible range? Comment.'),
        X('5. Explain qualitatively why the harmful effect is avoided by moving the listener away from the wall. Why will covering the wall with a suitable coating have the same effect?')],
      hints: [X('The reflected wave goes from the ear to the wall and back: 2$D$ more.'), X('Minimum amplitude when the two waves are in antiphase: Δφ = (2$n$ + 1)π.')],
      solution: [
        { t: 'Questions 1 and 2', html: E('Δτ = @f{2D}{c}', '|Δφ| = ωΔτ = @f{4πfD}{c}') },
        { t: 'Question 3: the risk', html: P('The two waves have the same frequency and add up in the ear. If they arrive in antiphase, they cancel each other: the perceived amplitude decreases for those frequencies.') },
        { t: 'Question 4: the frequencies', html: E('@f{4πfD}{c} = (2n + 1)π  ⇒  f_n = (2n + 1) @f{c}{4D},  n ∈ ℕ') +
          P('No audible frequency: you need $f_0 = c/(4D)$ &gt; 20 kHz, that is $D$ &lt; 343/80,000 ≈ 4.3 mm. Impossible in practice: for $D$ = 1 m, 86 Hz, 257 Hz, 429 Hz… are weakened, right in the musical spectrum.') },
        { t: 'Question 5: the remedy', html: P('The further the wall, the longer the path travelled by the reflected wave: it arrives weakened and only partly cancels the direct wave. An absorbing coating also weakens the reflected wave, with the same effect.') }],
      answer: ul(['Δτ = 2$D$/$c$; Δφ = 4π$fD$/$c$', '$f_n$ = (2$n$ + 1)$c$/(4$D$)', '$D$ &lt; 4.3 mm: impossible; move away from the wall or absorb the reflection']),
      traps: [X('Counting $D$ instead of 2$D$ for the path difference.'), X('Looking for the frequencies “in phase”: it is the antiphase ones that weaken the sound.')],
      note: NOTE_WRITTEN
    },

    'td8-ex4': {
      src: 'TD 8 · Ex 4', title: 'Musical instrument: pipe closed at one end',
      intro: P('Consider a musical instrument modelled as a cavity of length $L$, closed at one end and open at the other. The speed of sound in air is $c$ = 340 m·s⁻¹. The condition on the normal modes of the instrument is given: $L = λ_n/4 + n λ_n/2$.'),
      questions: [X('1. Express, as a function of an integer $n$, the set of natural frequencies $f_n$ associated with the normal modes.'),
        X('2. What must the value of $L$ be for the lowest frequency of a standing wave in this instrument to be $f_1$ = 440 Hz?'),
        X('3. What is the next higher frequency $f_2$ that this instrument can emit?'),
        X('4. Where should a hole be placed in the instrument to remove $f_2$ from the spectrum of the emitted sound?')],
      hints: [X('$L = (2n + 1) λ_n/4$, then $f_n = c/λ_n$.'), X('The closed end is a vibration node, the open end an antinode; an open hole imposes an antinode.')],
      solution: [
        { t: 'Question 1: natural frequencies', html: E('L = (2n + 1) @f{λ_n}{4}  ⇒  λ_n = @f{4L}{2n + 1},   f_n = (2n + 1) @f{c}{4L},  n ∈ ℕ') + P('Only the odd multiples of the fundamental exist.') },
        { t: 'Questions 2 and 3', html: E('n = 0 :  L = @f{c}{4 × 440} = @f{340}{1,760} ≈ 0.193 m', 'n = 1 :  f = 3 × 440 = 1,320 Hz') },
        { t: 'Question 4: the hole', html: P('The 1,320 Hz mode ($λ = 4L/3$) has a vibration node at the closed end and another at λ/2 = 2$L$/3 from it (≈ 12.9 cm). A hole imposes a vibration antinode: placed at that node, it makes this mode impossible. This is the answer of the model; it does not say how the hole changes the fundamental.') }],
      answer: ul(['$f_n$ = (2$n$ + 1)$c$/(4$L$)', '$L$ ≈ 19.3 cm', '$f_2$ = 1,320 Hz', 'hole at 2$L$/3 from the closed end']),
      traps: [X('Taking $λ_n = 2L/n$ (string fixed at both ends): here, one end is open.')],
      note: NOTE_WRITTEN
    },

    /* ================= October 2025 midterm ================= */
    'p2025-ex1': {
      src: 'Midterm Oct. 2025 · Ex 1', title: 'A falling water drop, with and without friction',
      intro: P('A water drop, modelled as a sphere of radius $r$ = 2 mm, falls from the base of a cloud at an altitude $y(0)$ = 2,000 m above the ground. The origin of time is the instant when the drop leaves the cloud; its initial velocity is zero. Data: $g$ ≈ 10 m·s⁻²; density of water $ρ$ ≈ 1,000 kg·m⁻³; volume of a sphere $V = (4/3)πr³$. Calculators are not allowed.'),
      questions: [X('1. State Newton’s second law and use it, justifying every step, to obtain the expression of the acceleration. In this part, the only force acting on the drop is its weight. (1 pt)'),
        X('2. Give the expression of the velocity vector. (1 pt)  3. Give the expression of the position vector. (1 pt)'),
        X('4. Calculate the speed of the drop when it reaches the ground with these equations. (1 pt)  5. Do the same calculation with the mechanical energy theorem. (2 pts)'),
        X('6. In reality, the drop reaches the ground at 9.4 m/s. How can the difference be explained? (0.5 pt)'),
        X('For the rest, a friction force $f⃗ = −k v⃗$ is added, with $k$ = 3.2·10⁻⁵ N·s·m⁻¹. 7. Applying Newton’s second law, show that the equation satisfied by $v_y$ is $dv/dt + v/τ = −g$. (2 pts)'),
        X('8. Check that $v_y(t) = gτ(e^{−t/τ} − 1)$ is a solution and satisfies the initial condition. (1.5 pt)  9. Give the literal expression of τ and calculate its value (π ≈ 3). (1 pt)'),
        X('10. What is the speed $v(τ)$ after a time τ? (0.5 pt)  11. What speed does the drop finally reach? (0.5 pt)')],
      hints: [X('$y$ axis vertical, pointing up: $P⃗ = −mg u⃗_y$.'), X('With friction: $m dv_y/dt = −mg − k v_y$. For τ: $m = ρ × (4/3)πr³$.')],
      solution: [
        { t: 'Questions 1 to 3: free fall', html: E('ΣF⃗ = m a⃗  ⇒  −mg u⃗_y = m a⃗  ⇒  a⃗ = −g u⃗_y', 'v⃗ = −gt u⃗_y   (v⃗(0) = 0⃗)', 'y(t) = −@f{gt²}{2} + 2000') },
        { t: 'Questions 4 and 5: speed at the ground', html: E('y(T) = 0  ⇒  T = @r{@f{2 × 2000}{10}} = 20 s,   v = gT = 200 m·s⁻¹', 'mgh = ½ mv²  ⇒  v = @r{2gh} = @r{40,000} = 200 m·s⁻¹') },
        { t: 'Question 6: the difference', html: P('Air friction is not negligible: it slows the drop down, which reaches a terminal velocity.') },
        { t: 'Questions 7 and 8: equation with friction', html: E('m @f{dv_y}{dt} = −mg − k v_y  ⇒  @f{dv_y}{dt} + @f{k}{m} v_y = −g,   τ = @f{m}{k}') +
          E('@f{dv_y}{dt} = −g e^{−t/τ},   −g e^{−t/τ} + g(e^{−t/τ} − 1) = −g  ✓,   v_y(0) = gτ(1 − 1) = 0  ✓') },
        { t: 'Question 9: τ', html: E('m = ρ × @f{4}{3}πr³ = 1000 × 4 × 8·10⁻⁹ = 3.2·10⁻⁵ kg', 'τ = @f{m}{k} = @f{3.2·10⁻⁵}{3.2·10⁻⁵} = 1 s') },
        { t: 'Questions 10 and 11', html: E('|v(τ)| = gτ(1 − e^{−1}) ≈ 0.63 × 10 ≈ 6.3 m·s⁻¹', 'v_lim = gτ = 10 m·s⁻¹') +
          P('At τ, the speed has covered 63 % of the way to its limiting value. The curve in the paper levels off around 9.5 m/s (close to the actual 9.4 m/s) and reaches 63 % of that value around 2 s: it does not quite match the data.') }],
      answer: ul(['$a⃗ = −g u⃗_y$; $v⃗ = −gt u⃗_y$; $y = −gt²/2 + 2000$', '$v$ = 200 m·s⁻¹ at the ground (both methods)', 'τ = $m/k$ = 1 s; $v(τ)$ ≈ 6.3 m·s⁻¹; terminal velocity $gτ$ = 10 m·s⁻¹']),
      traps: [X('Forgetting that $f⃗$ depends on the velocity: the equation is about $v$, not $y$.'), X('Calculating $(4/3) × 3 × 8·10⁻⁹$ too fast: it is 3.2·10⁻⁸ m³.')],
      grading: 'printed on the paper: 12 points (breakdown per question above).',
      note: 'The official answer key changes the data (altitude 1,000 m, $k$ = 2.4·10⁻⁵) and makes a calculation error on the volume (2.4·10⁻⁸ m³ instead of 3.2·10⁻⁸); τ = 1 s remains correct. For $v(τ)$, it reads 3.2 m/s off the curve. Values recomputed here with the data of the paper.'
    },

    'p2025-ex2': {
      src: 'Midterm Oct. 2025 · Ex 2', title: 'Motion of the International Space Station (ISS)',
      intro: P('The ISS is a space station in low Earth orbit, about 400 km above the ground. Its mass is about 400 tonnes. The motion is assumed circular with constant angular velocity ω.') +
        P('Data: Earth radius $R_T$ ≈ 6,400 km; orbit altitude $h$ ≈ 400 km; mass of the Earth $M_T$ ≈ 6.4·10²⁴ kg; mass of the ISS ≈ 400 t; $G$ ≈ 6·10⁻¹¹ m³·kg⁻¹·s⁻²; gravitational force $F⃗ = −G (m_1 m_2/d²) u⃗_r$. Calculators are not allowed.'),
      questions: [X('1. Draw a diagram of the situation, show the vectors of the polar basis, then determine the expression of the position vector in the polar basis. (2 pts)'),
        X('2. Determine the expression of the velocity vector of the ISS in the polar basis. (1 pt)'),
        X('3. Determine the expression of the acceleration vector in the polar basis. Recall that, for a circular motion with constant angular velocity, $a⃗ = −rω² u⃗_r$. (1 pt)'),
        X('4. Applying Newton’s second law, show that $ω = @r{G M_T/(h + R_T)³}$. (2 pts)'),
        X('5. With $T = 2π/ω$, calculate the order of magnitude of the duration of one revolution of the ISS and give the result in hours. (2 pts)')],
      hints: [X('O at the centre of the Earth, $r = R_T + h$ constant.'), X('A single force, towards the centre: $−G M_T m/r² = −m r ω²$.')],
      solution: [
        { t: 'Questions 1 to 3', html: E('OM⃗ = r u⃗_r,   r = R_T + h', 'v⃗ = ṙ u⃗_r + rθ̇ u⃗_θ = rω u⃗_θ', 'a⃗ = −rω² u⃗_r') },
        { t: 'Question 4: the angular frequency', html: E('−G @f{M_T m}{r²} u⃗_r = −m r ω² u⃗_r  ⇒  ω² = @f{G M_T}{r³}  ⇒  ω = @r{@f{G M_T}{(R_T + h)³}}') + P('The mass of the ISS cancels out.') },
        { t: 'Question 5: order of magnitude', html: E('G M_T = 6·10⁻¹¹ × 6.4·10²⁴ ≈ 3.8·10¹⁴,   (6.8·10⁶)³ ≈ 3.1·10²⁰', 'ω ≈ @r{1.2·10⁻⁶} ≈ 1.1·10⁻³ rad·s⁻¹', 'T = @f{2π}{ω} ≈ 5.7·10³ s ≈ 1.6 h') + P('About an hour and a half: the actual period of the ISS is about 92 minutes.') }],
      answer: ul(['$OM⃗ = (R_T + h) u⃗_r$; $v⃗ = rω u⃗_θ$; $a⃗ = −rω² u⃗_r$', '$ω = @r{G M_T/(R_T + h)³}$ ≈ 1.1·10⁻³ rad·s⁻¹', '$T$ ≈ 5.7·10³ s ≈ 1.6 h']),
      traps: [X('Taking $r$ = 400 km: the radius of the orbit is measured from the centre of the Earth.'), X('Forgetting the cube: ω² = $GM_T/r³$.')],
      grading: 'printed on the paper: 8 points.',
      note: 'The official answer key rounds ω to 10⁻³ rad/s (that is 6,280 s) then writes “1.4 h”: 6,280 s is 1.7 h. With the data, $T$ ≈ 5.7·10³ s ≈ 1.6 h.'
    }
  });
})();
