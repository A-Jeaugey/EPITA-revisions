/* English text for data/physique/ex-td.js (merged by id over the French file).
   Tutorials 1 to 4: the wording of the official English sheets (Moodle EN/15-18), word for word, with decimal
   points and a few slips of the sheets fixed (“reach de 10 m/s”, “this values explains why the passangers”,
   “Determiner”, “is the the motion”, “of of m”, “until its hits”, “negligeable”, “stored in the batter”,
   “between points A et A’”) and “decelerated” for the sheet’s “deaccelerated”. Tutorial 5 has no English sheet:
   translated with the vocabulary of the English course (EN/14). Notation of the English course: weight W⃗,
   kinetic energy E_k, work W_A→B, “Newton’s second law”. Figures are drawn by the French file
   (window.PHYS_TD_FIG) with { en: true }: W⃗ for the weight, decimal points, English descriptions. */
(function () {
  'use strict';
  var F = window.PHYS_TD_FIG, R = window.REV;
  if (!F || !R || !R.i18n) return;
  var eq = F.eq, fr = F.fr, col = F.col, sq = F.sq, fig = F.fig, tbl = F.tbl, thd = F.thd, thdd = F.thdd, rd = F.rd, rdd = F.rdd;
  var EN = { en: true };
  var NOTE = 'No official answer key (Moodle only has them for tutorials 1 to 3): solution written and checked.';
  var TAB_E = ['', 'y(0) = h', 'y(t) = 0'];

  R.i18n.patch(window.PHYS_EX, F.fmt({

    /* ===================== Tutorial 1 — Kinematics in Cartesian coordinates ===================== */
    'td1-ex1': {
      title: 'Motion of a car',
      intro: '<p>A car is initially at rest and starts moving until it reaches a speed of 10 m/s. We assume that its trajectory is a straight line and we study its motion in a reference frame whose origin coincides with the entry of the driver’s home.</p>' +
        '<p>When the car starts, the position of the point being studied satisfies the following equation (expressed in meters):</p>' + eq('$x($t) = 1.25$t² + 7'),
      questions: [
        '<b>1.</b> Before the car starts, calculate how far from home the car was parked.',
        '<b>2.</b> Find the expression of the car’s velocity as a function of time. Calculate the time taken for the velocity to reach 10 m/s.',
        '<b>3.</b> What distance has it traveled by then?',
        '<b>4.</b> Calculate the value of the car’s acceleration during this starting phase.',
        '<b>5.</b> What must the car’s acceleration be if the driver wants to reach a speed of 10 m/s in only 2s?',
        '<b>6.</b> If the driver maintains the acceleration calculated in question 5 for 4s, what speed does the car reach? What distance does it travel?'],
      hints: [
        'The car starts at $t = 0: its starting position is $x(0). Velocity is the derivative of position: $v($t) = d$x/d$t.',
        '“Distance traveled” is not “position”: the car starts from $x(0) = 7 m, so the distance traveled is $x($t) − $x(0).',
        'Questions 5 and 6: with a constant acceleration $a and a start from rest, $v($t) = $a$t. Integrate once more without forgetting the starting position.'],
      solution: [
        { t: 'Question 1 · starting position', html: '<p>The car starts at $t = 0. Before that, it was parked at the position:</p>' + eq('$x(0) = 1.25 × 0² + 7 = 7 m') + '<p>It was parked <b>7 m</b> from the front door.</p>' },
        { t: 'Question 2 · velocity', html: '<p>Velocity is the derivative of position with respect to time:</p>' + eq('$v($t) = ' + fr('d$x', 'd$t') + ' = 2.5 $t') +
          '<p>($v in m·s⁻¹, $t in s.) The velocity reaches 10 m/s when 2.5 $t = 10, so $t = 10/2.5 = <b>4 s</b>.</p>' },
        { t: 'Question 3 · distance traveled', html: '<p>The distance traveled since the start is the difference between the positions:</p>' +
          eq('$d = $x(4) − $x(0)', '= (1.25 × 4² + 7) − 7', '= 27 − 7 = 20 m') + '<p>The car has traveled <b>20 m</b>; it is then 27 m from home.</p>' +
          '<p class="sol-note">Official answer key: it answers “$x(4) = 27 m”. That is the car’s position (its distance from home), not the distance traveled since the start.</p>' },
        { t: 'Question 4 · acceleration', html: '<p>Acceleration is the derivative of velocity:</p>' + eq('$a = ' + fr('d$v', 'd$t') + ' = 2.5 m·s⁻²') +
          '<p>It is constant: the motion is rectilinear and uniformly accelerated.</p>' },
        { t: 'Question 5 · 10 m/s in 2 s', html: '<p>The acceleration $a is constant, so $v($t) = ∫ $a d$t = $a$t + $v(0), with $v(0) = 0 (the car starts from rest):</p>' +
          eq('$v($t) = $a$t', '$v(2) = 2$a = 10 ⇒ $a = 5 m·s⁻²') },
        { t: 'Question 6 · for 4 s', html: '<p>Velocity after 4 s:</p>' + eq('$v(4) = 5 × 4 = 20 m·s⁻¹') +
          '<p>Position: integrate $v($t) = 5$t; the constant is the starting position, $x(0) = 7 m:</p>' + eq('$x($t) = ' + fr('5', '2') + ' $t² + 7 = 2.5 $t² + 7', '$x(4) = 2.5 × 16 + 7 = 47 m') +
          '<p>Distance traveled: $x(4) − $x(0) = 47 − 7 = <b>40 m</b>.</p><p class="sol-note">Official answer key: it stops at “$x(4) = 47 m”, which is the position, not the distance traveled.</p>' }],
      answer: '<ul><li>1. Parked 7 m from home.</li><li>2. $v($t) = 2.5 $t; 10 m/s is reached at $t = 4 s.</li><li>3. 20 m traveled (the car is then 27 m from home).</li><li>4. $a = 2.5 m·s⁻² (constant).</li><li>5. $a = 5 m·s⁻².</li><li>6. $v(4) = 20 m·s⁻¹; 40 m traveled (position 47 m).</li></ul>',
      traps: [
        'Answering 27 m (or 47 m) to “what distance has it traveled”: that is the position. The distance traveled is $x($t) − $x(0).',
        'Forgetting the integration constant: when integrating $v($t) = 5$t, the starting position (7 m) stays in $x($t).',
        'Taking $v(0) ≠ 0: “initially at rest” gives $v(0) = 0, so $a = Δ$v/Δ$t = 10/2.'],
      note: 'Official answer key followed, except in questions 3 and 6: it gives the position (27 m, 47 m) instead of the distance traveled (20 m, 40 m).'
    },

    'td1-ex2': {
      title: 'Motion of a TGV',
      intro: '<p>When it leaves the station of Strasbourg, the TGV on the Grand Est line leaves the area at a very low speed, until it reaches the high-speed line, which begins in a neighboring municipality. The TGV enters this line at a speed of 90 km/h and reaches 320 km/h in 5min 20s.</p>',
      questions: [
        '<b>1.</b> What is the average acceleration of the TGV from the moment it reaches the high-speed line?',
        '<b>2.</b> Automobile racers are accustomed to expressing the value of an acceleration in «g». g denotes the earth’s gravitational field: having an acceleration of «1g» means having an acceleration equal to that of a free falling body (g=10m/s²). Express the acceleration of the TGV in terms of g and show that this value explains why the passengers are not shaken when the train enters the high-speed line.',
        '<b>3.</b> A Formula 1 car can accelerate from zero speed to a speed of 180 km/h in 4s : express its acceleration in terms of g and comment on the difference compared with that of the TGV.'],
      hints: [
        'Average acceleration: $a = Δ$v/Δ$t, with Δ$v in m·s⁻¹ and Δ$t in s. To go from km/h to m/s, divide by 3.6.',
        '5 min 20 s is 5 × 60 + 20 = 320 s. “In terms of g”: divide the acceleration by $g = 10 m·s⁻².'],
      solution: [
        { t: 'Question 1 · average acceleration', html: '<p>Convert to SI units (km/h → m/s: divide by 3.6):</p>' +
          eq('$v_1 = 90 km/h = 25 m·s⁻¹', '$v_2 = 320 km/h ≈ 88.9 m·s⁻¹', 'Δ$t = 5 × 60 + 20 = 320 s') + '<p>Average acceleration:</p>' +
          eq('$a = ' + fr('Δ$v', 'Δ$t') + ' = ' + fr('88.9 − 25', '320') + ' ≈ 0.20 m·s⁻²') +
          '<p>The official answer key converts the difference directly: 320 − 90 = 230 km/h ≈ 64 m/s, then 64/320 = 0.2 m·s⁻².</p>' },
        { t: 'Question 2 · in terms of g', html: eq('$a/$g = 0.20/10 = 0.02', '$a ≈ 0.02 $g') +
          '<p>The TGV’s acceleration is 2 % of that of a free fall: it is very small, so the passengers are not shaken.</p>' },
        { t: 'Question 3 · Formula 1', html: eq('180 km/h = 180/3.6 = 50 m·s⁻¹', '$a = ' + fr('50 − 0', '4') + ' = 12.5 m·s⁻²', '$a/$g = 12.5/10 = 1.25') +
          '<p>The Formula 1 car accelerates at <b>1.25 $g</b>: more than a body in free fall, and about 60 times more than the TGV (12.5/0.20 ≈ 63). The driver is pressed into the seat.</p>' +
          '<p class="sol-note">Official answer key: it writes 50/4 = 12 m·s⁻² and 1.2 $g; the exact result is 12.5 m·s⁻² and 1.25 $g.</p>' }],
      answer: '<ul><li>1. $a ≈ 0.20 m·s⁻² (Δ$v ≈ 63.9 m·s⁻¹ in 320 s).</li><li>2. $a ≈ 0.02 $g: very small, no jolt.</li><li>3. Formula 1: $a = 12.5 m·s⁻² = 1.25 $g, about 60 times the TGV’s acceleration.</li></ul>',
      traps: [
        'Dividing km/h by seconds: convert to m/s first (÷ 3.6).',
        'Writing 5 min 20 s = 5.20 min: it is 320 s.',
        'Rounding too early: 50/4 is 12.5, not 12.'],
      note: 'Official answer key followed, except in question 3: 50/4 = 12.5 m·s⁻² (1.25 g), not 12 m·s⁻² (1.2 g).'
    },

    'td1-ex3': {
      title: 'Parabolic motion',
      intro: '<p>We study the free fall of a projectile that was launched from point O(0,0) at $t = 0 with an initial velocity @v_0 at an angle $α with the horizontal plane.</p><p>The equations of motion are:</p>' +
        eq('$x($t) = $v_0 cos($α) $t', '$y($t) = $v_0 sin($α) $t − ' + fr('1', '2') + ' $g $t²'),
      figs: [{ svg: F.parab(EN), cap: 'Figure from the tutorial sheet: launch from O, top S, impact point P.' }],
      questions: [
        '<b>1.</b> Describe the study framework (reference frame, system under study, coordinate system).',
        '<b>2.</b> Write the expression for the position vector in Cartesian coordinates.',
        '<b>3.</b> Establish the equation for the trajectory $y($x).',
        '<b>4.</b> Give the expression for the velocity vector and its norm.',
        '<b>5.</b> Give the expression for the acceleration vector and its norm.',
        '<b>6.</b> Name the nature of motion on each axis (accelerated, decelerated or uniform). Name the orientation as well (positive or negative with respect to the axis).',
        '<b>7.</b> Calculate the (horizontal) range of motion $x_{max}.',
        '<b>8.</b> Find the coordinates $x_s and $y_s of point S, the point of the trajectory with maximum height.'],
      hints: [
        'The study framework fits in three lines: reference frame (terrestrial, assumed Galilean), system, coordinate system. For $y($x), get $t from the equation of $x($t) and substitute it into $y($t).',
        'Differentiate each coordinate: $v_x = d$x/d$t, $v_y = d$y/d$t, then once more for @a. On $y, compare the sign of $v_y with that of $a_y.',
        'Range: the projectile lands at $y = 0 with $t ≠ 0. Top: the vertical component of the velocity is zero, $v_y = 0.'],
      solution: [
        { t: 'Question 1 · study framework', html: '<ul><li>Reference frame: terrestrial, assumed Galilean.</li><li>System: the projectile, modelled as a material point.</li><li>Coordinate system: Cartesian, frame (O, @u_x, @u_y), @u_y pointing up; time origin at the launch.</li></ul>' },
        { t: 'Question 2 · position vector', html: eq('@OM($t) = $x @u_x + $y @u_y', '@OM($t) = ' + col('$v_0 cos$α · $t', '$v_0 sin$α · $t − ' + fr('$g', '2') + ' $t²')) },
        { t: 'Question 3 · trajectory equation', html: '<p>From $x($t) = $v_0 cos$α · $t we get (for $α ≠ 90°):</p>' + eq('$t = ' + fr('$x', '$v_0 cos$α')) +
          '<p>Substitute into $y($t):</p>' + eq('$y = $v_0 sin$α · ' + fr('$x', '$v_0 cos$α'), '− ' + fr('$g', '2') + ' ' + fr('$x²', '$v_0² cos²$α'), '$y($x) = −' + fr('$g', '2 $v_0² cos²$α') + ' $x² + $x tan$α') +
          '<p>This is a downward-opening parabola. There is no $t left: that is the goal.</p>' },
        { t: 'Question 4 · velocity vector', html: eq('@v = ' + fr('d@OM', 'd$t') + ' = ' + col('$v_0 cos$α', '$v_0 sin$α − $g$t')) +
          eq('‖@v‖ = ' + sq('$v_x² + $v_y²'), '= ' + sq('($v_0 cos$α)² + ($v_0 sin$α − $g$t)²')) },
        { t: 'Question 5 · acceleration vector', html: eq('@a = ' + fr('d@v', 'd$t') + ' = ' + col('0', '−$g') + ' = −$g @u_y', '‖@a‖ = $g') +
          '<p>The acceleration is constant, vertical and points down: this is free fall (@a = @g).</p>' +
          '<p class="sol-note">Official answer key: it writes ‖@a‖ = 10 m·s⁻², which assumes $g = 10 m·s⁻², a value this exercise does not give; write ‖@a‖ = $g.</p>' },
        { t: 'Question 6 · nature of the motion', html: '<ul><li>On $x: $v_x = $v_0 cos$α is constant and positive, $a_x = 0: <b>uniform</b> motion, in the <b>positive</b> direction.</li>' +
          '<li>On $y: $a_y = −$g &lt; 0. While $t &lt; $v_0 sin$α/$g, $v_y &gt; 0: the projectile goes up (<b>positive</b> direction); $v_y and $a_y have opposite signs: the motion is <b>decelerated</b>. Then $v_y &lt; 0: it comes down (<b>negative</b> direction); $v_y and $a_y have the same sign: the motion is <b>accelerated</b>.</li></ul>' },
        { t: 'Question 7 · range', html: '<p>The range is the abscissa of the impact point P, where $y = 0:</p>' + eq('$y($t) = $t ($v_0 sin$α − ' + fr('$g', '2') + ' $t) = 0') +
          '<p>Solutions: $t = 0 (the launch) or</p>' + eq('$t_P = ' + fr('2 $v_0 sin$α', '$g')) + '<p>Substitute into $x($t):</p>' +
          eq('$x_{max} = $v_0 cos$α · $t_P', '= ' + fr('2 $v_0² sin$α cos$α', '$g') + ' = ' + fr('$v_0² sin(2$α)', '$g')) },
        { t: 'Question 8 · top', html: '<p>At the top S, the vertical velocity is zero:</p>' + eq('$v_y($t_S) = $v_0 sin$α − $g$t_S = 0', '$t_S = ' + fr('$v_0 sin$α', '$g')) +
          '<p>Substitute into @OM($t):</p>' + eq('$x_S = ' + fr('$v_0² sin$α cos$α', '$g') + ' = ' + fr('$x_{max}', '2'), '$y_S = ' + fr('$v_0² sin²$α', '$g') + ' − ' + fr('$v_0² sin²$α', '2$g'), '$y_S = ' + fr('$v_0² sin²$α', '2$g')) +
          '<p>The top is at half the range, reached halfway through the flight ($t_S = $t_P/2): the parabola is symmetric.</p>' }],
      traps: [
        'Leaving $t in $y($x): the trajectory equation depends on $x only.',
        'Saying the acceleration is zero at the top: @a = −$g @u_y everywhere. It is $v_y that vanishes, not @v ($v_x = $v_0 cos$α remains).',
        'Describing the motion along $y with a single word: it is decelerated on the way up, then accelerated on the way down.',
        'Confusing $t_S (top) and $t_P = 2$t_S (impact).']
    },

    'td1-ex4': {
      title: 'Measuring the depth of a well',
      intro: '<p>In order to establish a method for measuring the depth of a well, we seek to determine the motion of a pebble thrown horizontally above the ground. The motion is filmed and studied using motion-tracking software. The pebble’s positions are studied in a reference frame (O,x,y) whose origin coincides with the pebble’s starting position (after it has left the thrower’s hand). The model gives the expression for the pebble’s position (in meters) as a function of time:</p>' +
        eq('$x($t) = 0.5$t   and   $y($t) = −5$t²'),
      questions: [
        '<b>1.</b> Determine the expressions (or the values if they are constant) of the coordinates $v_x($t) and $v_y($t) of the pebble’s velocity vector. Comment on their signs.',
        '<b>2.</b> Calculate the initial values $v_x(0) and $v_y(0) and check that they are consistent with the fact that the pebble is thrown horizontally.',
        '<b>3.</b> During the fall, is the motion rectilinear? Is it uniform? Justify your answer using the expressions for $v_x($t) and $v_y($t).',
        '<b>4.</b> Determine the expressions of the coordinates $a_x($t) and $a_y($t) of the acceleration vector.',
        '<b>5.</b> Deduce the direction and magnitude of the acceleration vector using your answer above.',
        '<b>6.</b> Is this pebble in free fall? Justify your answer using the information given in the beginning. You may take $g ≈ 10 m·s⁻².',
        '<b>7.</b> The same throw is carried out from the edge of a well. The pebble reaches its bottom after a duration of 2s. What is the depth of the well?'],
      hints: [
        'Differentiate $x($t) and $y($t): $v_x = d$x/d$t, $v_y = d$y/d$t. A constant coordinate does not depend on $t.',
        'Rectilinear: does the direction of @v stay the same? Uniform: does the norm ‖@v‖ stay constant?',
        'Free fall: the weight is the only force, so @a = @g (vertical, pointing down, of magnitude $g). For the well, $y(2) gives the position of the pebble at the bottom.'],
      solution: [
        { t: 'Question 1 · velocity coordinates', html: eq('$v_x = ' + fr('d$x', 'd$t') + ' = 0.5 m·s⁻¹', '$v_y = ' + fr('d$y', 'd$t') + ' = −10 $t') +
          '<p>$v_x &gt; 0: the pebble moves towards increasing $x (to the right). $v_y &lt; 0 for $t &gt; 0: it goes down.</p>' },
        { t: 'Question 2 · initial values', html: eq('$v_x(0) = 0.5 m·s⁻¹ ; $v_y(0) = 0') + '<p>At the throw, the velocity has no vertical component: it is horizontal, consistent with a horizontal throw.</p>' },
        { t: 'Question 3 · rectilinear? uniform?', html: '<p><b>Rectilinear?</b> No. The ratio $v_y/$v_x = −20 $t changes with time: the direction of @v turns, the trajectory is curved (eliminating $t: $y = −20 $x², a parabola).</p>' +
          '<p><b>Uniform?</b> No. ‖@v‖ = ' + sq('0.25 + 100 $t²') + ' increases with $t: the motion is accelerated.</p>' +
          '<p>Axis by axis, as in the official answer key: along $x, uniform rectilinear motion; along $y, accelerated rectilinear motion; overall, accelerated curvilinear motion.</p>' },
        { t: 'Question 4 · acceleration coordinates', html: eq('$a_x = ' + fr('d$v_x', 'd$t') + ' = 0', '$a_y = ' + fr('d$v_y', 'd$t') + ' = −10 m·s⁻²') },
        { t: 'Question 5 · characteristics of @a', html: '<ul><li>Direction: vertical ($a_x = 0).</li><li>Orientation: pointing down ($a_y &lt; 0).</li><li>Magnitude: ‖@a‖ = 10 m·s⁻², constant.</li></ul>' },
        { t: 'Question 6 · free fall?', html: '<p>Yes. @a is vertical, points down and has magnitude 10 m·s⁻² ≈ $g: this is the acceleration of a body in free fall (subject to its weight only), according to the definition of “1 g” given in exercise 2.</p>' +
          '<p class="sol-note">The question refers to “the information given in the beginning”, which is not in this exercise: we use that definition.</p>' },
        { t: 'Question 7 · depth of the well', html: '<p>The origin is at the starting point, at the edge of the well. The pebble reaches the bottom at $t = 2.0 s:</p>' + eq('$y(2) = −5 × 2² = −20 m') +
          '<p>The bottom is 20 m below the starting point: the well is <b>20 m</b> deep.</p>' }],
      answer: '<ul><li>1-2. $v_x = 0.5 m·s⁻¹ (constant, to the right), $v_y = −10$t (downwards); $v_y(0) = 0: horizontal throw.</li><li>3. Neither rectilinear (parabola) nor uniform (‖@v‖ increases).</li><li>4-5. $a_x = 0, $a_y = −10 m·s⁻²: vertical, downwards, 10 m·s⁻².</li><li>6. @a = @g: free fall.</li><li>7. Depth: 20 m.</li></ul>',
      traps: [
        'Saying the motion is rectilinear because each coordinate moves along an axis: look at the whole trajectory, here a parabola.',
        'Confusing “uniform along $x” ($v_x constant) with “uniform motion” (‖@v‖ constant).',
        'Giving a negative depth: $y(2) = −20 m is a coordinate; the depth is 20 m.']
    },

    /* ===================== Tutorial 2 — Equilibrium of forces, Newton’s second law ===================== */
    'td2-ex1': {
      title: 'Force diagrams',
      intro: '<p>Draw a diagram in each of the following situations, adding the vectors representing the forces acting on the system being studied.</p>',
      questions: [
        '<b>1.</b> A book at rest on a table.',
        '<b>2.</b> A ball attached to a string, swinging along a circular path.',
        '<b>3.</b> A ball floating on water.',
        '<b>4.</b> A ball held stationary underwater by a person.'],
      hints: [
        'The system is a point (point mechanics): draw a cross and start each force from that cross.',
        'List the interactions: the Earth (the weight, always), then every object in contact with the system (table, string, water, hand). No contact, no force (except the weight).',
        'System at rest: the sum of the forces is zero, the arrows cancel out. The swinging ball is not in equilibrium.'],
      solution: [
        { t: 'Diagrams', html: fig(F.four(EN), 'Each system is a point, each arrow a force. In 4, the two downward forces are drawn slightly apart for readability: they act at the same point.') +
          '<ol><li>Book: weight @W (vertical, pointing down) and reaction force from the table @R (perpendicular to the table, pointing up).</li>' +
          '<li>Ball on a string: weight @W and tension in the string @T (along the string, from the ball towards the attachment point). Air resistance neglected.</li>' +
          '<li>Floating ball: weight @W and buoyant force @F_A (Archimedes’ principle: vertical, pointing up), exerted by the water.</li>' +
          '<li>Ball under water: weight @W, buoyant force @F_A pointing up and force of the hand @F_{hand} pointing down.</li></ol>' },
        { t: 'In equilibrium or not', html: '<p>“Equilibrium situations translate into a zero vector sum” (official answer key):</p>' +
          '<ul><li>1: @W + @R = @0, so $R = $W.</li><li>3: @W + @F_A = @0, so $F_A = $W.</li><li>4: @W + @F_A + @F_{hand} = @0, so $F_A = $W + $F_{hand}: the buoyant force is larger than the weight, which is why the ball has to be held down.</li>' +
          '<li>2: the ball is not in equilibrium (the direction of its velocity changes): @W + @T ≠ @0.</li></ul>' +
          '<p class="sol-note">The buoyant force is not in the course; it appears in the official answer key. It is the vertical, upward force that a fluid exerts on an immersed object.</p>' }],
      answer: '<p>1. @W, @R · 2. @W, @T · 3. @W, @F_A · 4. @W, @F_A, @F_{hand}.</p>',
      traps: [
        'Adding a “force of motion” in the direction of the velocity (ball on the string): a force always comes from an object acting on the system.',
        'Drawing the tension pointing down: @T pulls the ball towards the attachment point.',
        'Drawing @R and @W with different lengths for the book at rest: in equilibrium, they cancel out.']
    },

    'td2-ex2': {
      title: 'Determining forces in equilibrium',
      intro: '<p>A robot of mass $m is placed at point B on a slope with $α = 30°.</p>',
      figs: [{ svg: F.slope1(EN), cap: 'Figure 1: Overview' }, { svg: F.slope2(EN), cap: 'Figure 2: Zoom-in view' }],
      questions: [
        '<b>1.</b> Add to Figure 1 the forces acting on the robot: the weight, the reaction force from the surface, the friction with the surface (which opposes the motion), knowing that the robot remains stationary.',
        '<b>2.</b> Redraw the forces in Figure 2, decomposing them along the unit vectors of the coordinate basis shown.',
        '<b>3.</b> Give the expression of the weight @W in terms of $m, $g and $α.',
        '<b>4.</b> Using Newton’s second law, give the expressions for the reaction force @R and the friction force @f in terms of $m, $g and $α.'],
      hints: [
        '@W is vertical; @R is perpendicular to the slope; friction is parallel to the slope and stops the robot from sliding down.',
        'The basis is tilted: @u_x points down the slope, @u_y is perpendicular to it. The angle between @W and −@u_y is $α (two angles whose sides are perpendicular in pairs). The side opposite $α carries the sine.',
        'Robot at rest: @a = @0, so @W + @R + @f = @0. Project this equation on $x, then on $y.'],
      solution: [
        { t: 'Questions 1 and 2 · diagram and decomposition', html: fig(F.slopeForces(EN), 'Forces on the robot at B and decomposition of the weight in the basis (@u_x, @u_y).') +
          '<ul><li>@W: vertical, pointing down.</li><li>@R: perpendicular to the slope, pointing up (normal reaction).</li><li>@f: parallel to the slope, pointing up the slope: without it, the robot would slide down.</li></ul>' +
          '<p>Decompose the weight with Chasles’ relation: @W = @W_x + @W_y, with @W_x along the slope (down, along @u_x) and @W_y perpendicular to the slope (along −@u_y). @R and @f are already along the axes.</p>' },
        { t: 'Question 3 · expression of the weight', html: '<p>The angle between @W (vertical) and the normal to the slope is $α: these two angles have their sides perpendicular in pairs (the vertical is perpendicular to the horizontal, the normal to the slope). In the right triangle of the decomposition, $W_x is the side opposite $α and $W_y the adjacent side:</p>' +
          eq('@W = $m @g = ' + col('$m$g sin$α', '−$m$g cos$α'), '@W = $m$g sin$α @u_x − $m$g cos$α @u_y') },
        { t: 'Question 4 · reaction and friction', html: '<p>System: the robot (material point). Reference frame: terrestrial, assumed Galilean. The robot stays at rest: @a = @0. Newton’s second law gives:</p>' + eq('@W + @R + @f = $m @a = @0') +
          '<p>With @R = $R @u_y and @f = $f @u_x ($f is a component whose sign is unknown):</p>' + eq(col('$m$g sin$α', '−$m$g cos$α') + ' + ' + col('0', '$R') + ' + ' + col('$f', '0') + ' = ' + col('0', '0')) +
          '<p>On $x: $m$g sin$α + $f = 0, so $f = −$m$g sin$α. On $y: −$m$g cos$α + $R = 0, so $R = $m$g cos$α.</p>' + eq('@R = $m$g cos$α @u_y', '@f = −$m$g sin$α @u_x') +
          '<p>@f points up the slope (minus sign), with magnitude $m$g sin$α. With $α = 30°: $R = (√3/2) $m$g ≈ 0.87 $m$g and ‖@f‖ = $m$g/2.</p>' }],
      answer: '<p>@W = ($m$g sin$α ; −$m$g cos$α); @R = $m$g cos$α @u_y; @f = −$m$g sin$α @u_x (magnitude $m$g sin$α, up the slope). For $α = 30°: $R ≈ 0.87 $m$g, ‖@f‖ = 0.5 $m$g.</p>',
      traps: [
        'Swapping sine and cosine: the component along the slope is $m$g sin$α (it vanishes when the slope is flat, $α = 0).',
        'Writing $R = $m$g: on a slope, the reaction only balances the normal component of the weight, $m$g cos$α.',
        'Drawing @R vertical: the surface reaction force is perpendicular to the surface.',
        'Reading “$f = −$m$g sin$α” as a negative magnitude: it is the component along @u_x; the magnitude is $m$g sin$α.']
    },

    'td2-ex3': {
      title: 'Motion of a robot',
      intro: '<p>A robot with mass <b>m = 10kg</b> is at a point A on a horizontal surface. Its initial velocity is 2 m/s. Its motor exerts a force @F of magnitude <b>50N</b>, parallel to the ground, and directed towards increasing x values.</p>',
      questions: [
        '<b>Part I: Friction is neglected</b><br><b>1.</b> Draw a diagram of the robot and the forces acting on it.',
        '<b>2.</b> Using Newton’s second law, give the expression for the acceleration and calculate its value.',
        '<b>3.</b> Deduce the expression for its velocity.',
        '<b>4.</b> Deduce the expression for its position.',
        '<b>5.</b> How many meters does it travel in one minute?',
        '<b>Part II: Friction is no longer neglected</b><br>The force of friction is modelled by the formula @f = −$α @v, where @v is the velocity of the system and $α a proportionality coefficient with value 0.5 in S.I. units.<br><b>1.</b> What is the meaning of the minus sign «−» in the expression of the friction force?',
        '<b>2.</b> What is the unit of the coefficient of proportionality?',
        '<b>3.</b> Because of the form of the friction force, as the robot’s velocity increases, the magnitude of the friction force increases as well. The robot therefore accelerates more and more slowly, until its acceleration becomes zero. The motion of the robot eventually becomes uniform, with a constant, maximum velocity. At this maximum velocity, what can you say about the acceleration and the forces acting on the robot? Use Newton’s second law to determine the maximum velocity $v_{max} that the robot can reach.'],
      hints: [
        'Forces: weight, reaction from the ground, motor force. The ground is horizontal and the robot does not take off: $a_y = 0.',
        'Constant acceleration: integrate twice; the constants are $v(0) = 2 m/s and $x(0) = 0 (origin at A, $t = 0 at the start).',
        'Part II: unit of $α from dimensional consistency ([$f] = N = kg·m·s⁻²). At the maximum velocity, the velocity no longer changes: what is @a?'],
      solution: [
        { t: 'Part I · question 1 · diagram', html: fig(F.robot(EN), 'The robot (a point): weight, reaction from the ground, motor force; in part II the friction @f (dashed) is added, opposite to @v.') +
          '<p>@W vertical pointing down, @R vertical pointing up (horizontal ground), @F horizontal towards increasing $x.</p>' },
        { t: 'Part I · question 2 · acceleration', html: '<p>System: the robot. Reference frame: terrestrial, assumed Galilean. Frame: @u_x horizontal in the direction of @F, @u_y vertical pointing up, origin at A; $t = 0 at point A.</p><p>Newton’s second law:</p>' +
          eq('@W + @R + @F = $m @a') + eq(col('0', '−$m$g') + ' + ' + col('0', '$R') + ' + ' + col('$F', '0') + ' = ' + col('$m$a_x', '$m$a_y')) +
          '<p>The robot stays on the ground: $a_y = 0, so $R = $m$g. On $x:</p>' + eq('$a_x = ' + fr('$F', '$m') + ' = ' + fr('50', '10') + ' = 5 m·s⁻²') +
          '<p>For the same force, the larger the mass, the smaller the acceleration: this is inertia.</p>' +
          '<p class="sol-note">Official answer key: on its diagram, the upward vertical force carries the letter of the weight; it is @R. In its projection, that letter stands for the signed component of the weight, −$m$g.</p>' },
        { t: 'Part I · question 3 · velocity', html: eq('$v($t) = ∫ ' + fr('$F', '$m') + ' d$t = ' + fr('$F', '$m') + ' $t + $v(0)', '$v($t) = 5 $t + 2') + '<p>($v in m·s⁻¹, $t in s.)</p>' },
        { t: 'Part I · question 4 · position', html: eq('$x($t) = ' + fr('$F', '2$m') + ' $t² + $v(0) $t + $x(0)', '$x($t) = 2.5 $t² + 2 $t') + '<p>(Origin at A: $x(0) = 0.)</p>' },
        { t: 'Part I · question 5 · in one minute', html: eq('$x(60) = 2.5 × 60² + 2 × 60', '= 9000 + 120 = 9120 m') +
          '<p>The robot travels <b>9120 m ≈ 9.1 km</b> in one minute. It is then moving at $v(60) = 302 m·s⁻¹: without friction, the velocity increases without limit.</p>' },
        { t: 'Part II · question 1 · the minus sign', html: '<p>It means that @f points opposite to @v: friction always opposes the motion. Its magnitude is $α$v.</p>' },
        { t: 'Part II · question 2 · unit of $α', html: '<p>The equation must be dimensionally consistent: [$f] = [$α][$v]. A force is in newtons: [$W] = [$m][$g] = kg·m·s⁻².</p>' +
          eq('[$α] = ' + fr('[$f]', '[$v]') + ' = ' + fr('kg·m·s⁻²', 'm·s⁻¹') + ' = kg·s⁻¹') },
        { t: 'Part II · question 3 · maximum velocity', html: '<p>At the maximum velocity, the motion is uniform and rectilinear: @v is constant, so @a = @0. By Newton’s second law, the sum of the forces is zero: the forces cancel out.</p>' +
          eq('@W + @R + @F + @f = @0') + '<p>On $x: $F − $α$v_{max} = 0, hence:</p>' + eq('$v_{max} = ' + fr('$F', '$α') + ' = ' + fr('50', '0.5') + ' = 100 m·s⁻¹') + '<p>(That is 360 km/h.)</p>' }],
      answer: '<ul><li>$a = $F/$m = 5 m·s⁻² ($R = $m$g); $v($t) = 5$t + 2; $x($t) = 2.5$t² + 2$t; $x(60) = 9120 m.</li><li>The “−”: @f opposite to @v; $α in kg·s⁻¹.</li><li>At $v_{max}: @a = @0, the forces cancel out, $v_{max} = $F/$α = 100 m·s⁻¹.</li></ul>',
      traps: [
        'Writing @F = $m@a and forgetting @W and @R: Newton’s second law involves the sum of all the forces (here @W and @R cancel out).',
        'Forgetting the initial velocity: $v(0) = 2 m/s gives the term 2$t in $x($t).',
        'Giving $α in newtons: from dimensional consistency, it is in kg·s⁻¹.',
        'Thinking the motor force vanishes at maximum velocity: it is the sum of the forces that is zero; the motor is still pushing.']
    },

    /* ===================== Tutorial 3 — Dynamics ===================== */
    'td3-ex1': {
      title: 'Free fall of a parachutist',
      intro: '<p>We study the free fall of a parachutist of mass $m = 80 kg who jumps from a height of $y(0) = 3000 m with zero initial velocity.</p>',
      figs: [{ svg: F.vlim(EN), cap: 'Graph from the tutorial sheet (question 10): case of linear air resistance.' }],
      questions: [
        '<b>a. Case without air resistance</b><br><b>1.</b> Describe the study framework (reference frame, system under study, coordinate system).',
        '<b>2.</b> Using Newton’s second law, determine the acceleration vector.',
        '<b>3.</b> Determine the velocity vector.',
        '<b>4.</b> Determine the position vector.',
        '<b>5.</b> Calculate the duration of the fall.',
        '<b>6.</b> What is the velocity of the parachutist when it reaches the ground? Comment on your result.',
        '<b>b. Case with air resistance</b><br><b>7.</b> Using Newton’s second law, determine the acceleration vector.',
        '<b>8.</b> Show that the obtained equation can be rewritten as ' + fr('d$v', 'd$t') + ' + ' + fr('$v', '$τ') + ' = −$g. What is $τ? How is this equation called?',
        '<b>9.</b> Find the solution $v($t).',
        '<b>10.</b> The norm of the velocity vector depends on time according to the following function |$v($t)| = $g$τ (1 − exp(−$t/$τ)) and is plotted in the graph below. What is the maximum speed of the parachutist in this case? Compare to your answer to question 6.'],
      hints: [
        'Vertical axis $y pointing up, origin on the ground: the weight is −$m$g @u_y. Newton’s second law gives @a, then integrate twice with $v(0) = 0 and $y(0) = 3000 m.',
        'The fall ends when $y($T) = 0. For the speed at the ground, tell the component $v_y (negative) from the norm (positive).',
        'With air resistance: @f = −$α @v (model from the course). Project on @u_y, divide by $m and identify $τ. Solution: that of the equation without right-hand side ($A e<sup>−$t/$τ</sup>) plus a constant solution.'],
      solution: [
        { t: 'Question 1 · study framework', html: '<ul><li>Reference frame: terrestrial, assumed Galilean.</li><li>System: the parachutist, modelled as a material point of mass $m = 80 kg.</li><li>Coordinate system: Cartesian, axis (O, @u_y) vertical pointing up, O on the ground; $t = 0 at the jump.</li></ul>' },
        { t: 'Question 2 · acceleration', html: '<p>Forces involved: the weight only (air resistance neglected). Newton’s second law:</p>' + eq('Σ@F = $m @a ⇒ @W = $m @a', '$m @g = $m @a ⇒ @a = @g = −$g @u_y') + '<p>The acceleration does not depend on the mass.</p>' },
        { t: 'Question 3 · velocity', html: eq('$v_y($t) = ∫ −$g d$t = −$g$t + $c_1') + '<p>With zero initial velocity, $v_y(0) = 0, so $c_1 = 0:</p>' + eq('@v($t) = −$g$t @u_y') },
        { t: 'Question 4 · position', html: eq('$y($t) = ∫ −$g$t d$t = −' + fr('$g$t²', '2') + ' + $c_2') + '<p>$y(0) = 3000 m, so $c_2 = 3000 m:</p>' + eq('@OM($t) = (3000 − ' + fr('$g$t²', '2') + ') @u_y') },
        { t: 'Question 5 · duration of the fall', html: '<p>The parachutist reaches the ground at the instant $T when $y($T) = 0:</p>' + eq('3000 − ' + fr('$g$T²', '2') + ' = 0 ⇒ $T = ' + sq(fr('6000', '$g')), '$T = ' + sq(fr('6000', '9.81')) + ' ≈ 24.7 s') + '<p>(24.5 s with $g = 10 m·s⁻².)</p>' },
        { t: 'Question 6 · speed at the ground', html: eq('$v_y($T) = −$g$T ≈ −242.6 m·s⁻¹') +
          '<p>The speed reached is the norm: ‖@v‖ ≈ 243 m·s⁻¹, about 873 km/h (this is ' + sq('2$g$h') + ' with $h = 3000 m).</p>' +
          '<p>Comment: this is unrealistic. Over a 3000 m fall, air resistance cannot be neglected: that is part b.</p>' +
          '<p class="sol-note">Official answer key: it writes “$v($t) = −$g$t = 242 m/s”. The component $v_y is −242 m·s⁻¹ (the parachutist goes down); 242 m/s is the norm.</p>' },
        { t: 'Question 7 · acceleration with air resistance', html: '<p>We use the model from the course (fluid friction): @f = −$α @v, opposite to the velocity. Forces involved: @W and @f.</p>' +
          fig(F.chute(EN), 'On the way down, @v points down: @f = −$α @v points up.') +
          eq('@W + @f = $m @a', '−$m$g @u_y − $α$v_y @u_y = $m @a', '@a = (−$g − ' + fr('$α', '$m') + ' $v_y) @u_y') +
          '<p>During the fall $v_y &lt; 0, so −$α$v_y &gt; 0: the friction component does point up.</p>' +
          '<p class="sol-note">Official answer key: its intermediate line “$m$g − $α$v = $m$a” loses the sign of the weight; the component of the weight along @u_y is −$m$g, as in its next line.</p>' },
        { t: 'Question 8 · differential equation', html: '<p>With $a_y = d$v/d$t (write $v = $v_y):</p>' + eq(fr('d$v', 'd$t') + ' = −$g − ' + fr('$α', '$m') + ' $v', '⇒ ' + fr('d$v', 'd$t') + ' + ' + fr('$v', '$τ') + ' = −$g', '$τ = ' + fr('$m', '$α')) +
          '<p>$τ is in seconds ([$m]/[$α] = kg/(kg·s⁻¹) = s): it is a characteristic time. This is a <b>first-order linear differential equation</b>, with constant coefficients and a constant right-hand side (−$g).</p>' },
        { t: 'Question 9 · solution', html: '<p>Solution of the homogeneous equation ' + fr('d$v', 'd$t') + ' + ' + fr('$v', '$τ') + ' = 0: $v_h = $A e<sup>−$t/$τ</sup>.</p>' +
          '<p>The right-hand side is constant: look for a constant particular solution $v_p. Then d$v_p/d$t = 0 and $v_p/$τ = −$g, so $v_p = −$g$τ.</p>' + eq('$v($t) = $A e<sup>−$t/$τ</sup> − $g$τ') +
          '<p>Initial condition $v(0) = 0: $A − $g$τ = 0, so $A = $g$τ.</p>' + eq('$v($t) = $g$τ (e<sup>−$t/$τ</sup> − 1)') +
          '<p>$v($t) &lt; 0 for $t &gt; 0: the parachutist goes down. Its norm is |$v($t)| = $g$τ (1 − e<sup>−$t/$τ</sup>), the function plotted in question 10.</p>' },
        { t: 'Question 10 · terminal speed', html: '<p>The curve starts at 0 and tends to a horizontal asymptote: as $t → ∞, e<sup>−$t/$τ</sup> → 0 and |$v| → $g$τ. After 3$τ, it is already at 95 % of this value.</p>' +
          '<p>Maximum speed (terminal speed), read on the graph:</p>' + eq('$v_{lim} = $g$τ = 69.5 m·s⁻¹') +
          '<p>That is 250 km/h: much less than the 243 m·s⁻¹ of question 6. This is expected: air resistance opposes the motion. You can find $v_{lim} without solving the equation: at constant velocity, @a = @0, so @W + @f = @0 and $m$g = $α$v_{lim}.</p>' +
          '<p>From this (not asked): $τ = 69.5/9.81 ≈ 7.1 s and $α = $m/$τ ≈ 11.3 kg·s⁻¹.</p>' }],
      answer: '<ul><li>Without air resistance: @a = −$g @u_y; @v = −$g$t @u_y; @OM = (3000 − $g$t²/2) @u_y; $T ≈ 24.7 s; ‖@v‖ ≈ 243 m·s⁻¹ at the ground (unrealistic).</li>' +
        '<li>With air resistance: @a = (−$g − $α$v_y/$m) @u_y; $τ = $m/$α; first-order linear differential equation; $v($t) = $g$τ(e<sup>−$t/$τ</sup> − 1); $v_{lim} = $g$τ = 69.5 m·s⁻¹.</li></ul>',
      traps: [
        'Writing @a = +$g @u_y with an upward axis: the weight points down, @a = −$g @u_y.',
        'Giving “$v = −242 m/s” as the speed reached: the component is negative, the speed (norm) is positive.',
        'Forgetting the initial condition in the solution of the differential equation: the constant $A comes from $v(0) = 0.',
        'Writing $τ = $α/$m: from dimensional consistency, $τ = $m/$α is a time.']
    },

    'td3-ex2': {
      title: 'Penalty in rugby',
      intro: '<p>«<i>In rugby, a player scores a goal from a penalty kick when he kicks the ball over the crossbar and between the opposing team’s goal posts.</i>» (Extract from rule 2, “Game rules”, FFR - French Rugby Federation).</p>' +
        '<p>In this exercise, we will consider the rugby ball to be a material point centered at point M with mass m = 420g. The origin (O, x, y) is placed at the ball’s position right before the kick.</p>' +
        '<p>The ball is kicked by the player with an initial velocity @v_0, with norm ‖@v_0‖ = 23 m·s⁻¹ at an angle $β = 38° with the ground. We assume that the player is perfectly aligned with the opposing team’s goal posts at a distance $d = 40 m from them. The height of the crossbar is 3 m, while the height of the vertical posts is 8 m. We ignore here any resistance on the ball’s motion from the air.</p>',
      figs: [{ svg: F.rugby(EN), cap: 'Figure from the tutorial sheet, drawn to scale: goal post 8 m high, crossbar at 3 m, d = 40 m from the starting point O.' }],
      questions: [
        '<b>1.</b> Describe the study framework (reference frame, system under study, coordinate system).',
        '<b>2.</b> Using Newton’s second law, determine the acceleration vector.',
        '<b>3.</b> Determine the velocity vector.',
        '<b>4.</b> Determine the position vector.',
        '<b>5.</b> Establish the equation for the trajectory $y($x). What type of trajectory is it?',
        '<b>6.</b> Has the player scored the goal?'],
      hints: [
        'Same method as free fall: forces involved (the weight only), Newton’s second law, then two integrations. The constants come from @v_0 = ($v_0 cos$β ; $v_0 sin$β) and @OM(0) = @0.',
        'For $y($x), get $t from $x($t) and substitute it into $y($t).',
        'Goal scored if, at $x = $d = 40 m, the ball is above the crossbar (3 m) and below the top of the posts (8 m).'],
      solution: [
        { t: 'Question 1 · study framework', html: '<ul><li>Reference frame: terrestrial, assumed Galilean.</li><li>System: the ball, material point M of mass $m = 420 g.</li><li>Coordinate system: Cartesian, frame (O, @u_x, @u_y), @u_x horizontal towards the posts, @u_y vertical pointing up; $t = 0 at the kick.</li></ul>' },
        { t: 'Question 2 · acceleration', html: '<p>Air resistance neglected: the weight is the only force. Newton’s second law:</p>' + eq('@W = $m @a ⇒ $m @g = $m @a', '@a = @g = ' + col('0', '−$g')) },
        { t: 'Question 3 · velocity', html: '<p>Integrate each component; the constants are the components of the initial velocity, $v_0 cos$β and $v_0 sin$β:</p>' + eq('@v($t) = ' + col('$v_0 cos$β', '−$g$t + $v_0 sin$β')) },
        { t: 'Question 4 · position', html: '<p>Integrate again; @OM(0) = @0 (origin at the starting point):</p>' + eq('@OM($t) = ' + col('$v_0 $t cos$β', '−' + fr('$g$t²', '2') + ' + $v_0 $t sin$β')) },
        { t: 'Question 5 · trajectory', html: '<p>From $x($t): $t = ' + fr('$x', '$v_0 cos$β') + '. Substitute into $y($t):</p>' + eq('$y($x) = −' + fr('$g$x²', '2 $v_0² cos²$β') + ' + $x tan$β') + '<p>It is a <b>parabola</b> (opening downwards).</p>' },
        { t: 'Question 6 · goal?', html: '<p>At the posts, $x = $d = 40 m (with $g = 9.81 m·s⁻²):</p>' +
          eq('$y(40) = −' + fr('9.81 × 40²', '2 × 23² × cos²38°') + '+ 40 tan 38°', '$y(40) ≈ −23.9 + 31.3 ≈ 7.36 m') +
          '<p>3 m &lt; 7.36 m &lt; 8 m: the ball passes above the crossbar and below the top of the posts, in line with them. <b>The goal is scored.</b></p>' +
          fig(F.rugby({ en: true, traj: true }), 'Trajectory to scale: top at $x_S ≈ 26.2 m, $y_S ≈ 10.2 m; the ball is coming down when it passes the posts, at a height of 7.36 m.') +
          '<p>With $g = 10 m·s⁻², you get 6.90 m: same conclusion.</p>' +
          '<p class="sol-note">The official answer key stops at “$y(40) ≈ 7.36 m” and does not check that the ball passes below the top of the posts (8 m).</p>' }],
      answer: '<ul><li>@a = @g = (0 ; −$g); @v = ($v_0 cos$β ; −$g$t + $v_0 sin$β); @OM = ($v_0$t cos$β ; −$g$t²/2 + $v_0$t sin$β).</li><li>$y($x) = −$g$x²/(2$v_0² cos²$β) + $x tan$β: a parabola.</li><li>$y(40) ≈ 7.36 m, between 3 m and 8 m: goal scored.</li></ul>',
      traps: [
        'Projecting the initial velocity wrongly: $v_x(0) = $v_0 cos$β, $v_y(0) = $v_0 sin$β (the cosine goes with the angle measured from the horizontal).',
        'Calculator in radians: cos 38° ≈ 0.788 only in degrees.',
        'Concluding with “7.36 m &gt; 3 m” only: the ball must also stay below the top of the posts (8 m).',
        'Trying to use the mass (420 g): it cancels out in Newton’s second law.']
    },

    /* ===================== Tutorial 4 — Energy and work ===================== */
    'td4-ex1': {
      title: 'Free fall: energy',
      intro: '<p>A ball of mass $m is released at a height $y(0) = $h with no initial velocity. We are interested in its motion, neglecting friction, until it hits the ground with a velocity $v_{sol}.</p>',
      questions: [
        '<b>1.</b> Complete the following table by giving the expressions for each type of energy at the initial instant and when the ball hits the ground.' + tbl(TAB_E, [['Kinetic energy', '', ''], ['Potential energy', '', '']]),
        '<b>2.</b> Derive an expression for $v_{sol} using the theorem of mechanical energy conservation. Explain why this theorem can be used.',
        '<b>3.</b> Show that you can obtain the same expression for $v_{sol} using the work-kinetic energy theorem.'],
      hints: [
        'Kinetic energy: $E_k = ½ $m$v²; gravitational potential energy: $E_p = $m$g$y, zero on the ground.',
        'Mechanical energy is conserved when the only forces doing work are conservative. Which forces act on the ball?',
        'Work-kinetic energy theorem: $E_k(ground) − $E_k(0) = $W_{A→B}(@W). The work done by the weight is $m$g × (height fallen).'],
      solution: [
        { t: 'Question 1 · energy table', html: '<p>Axis $y vertical pointing up, potential energy taken as zero on the ground ($E_p = $m$g$y).</p>' +
          tbl(TAB_E, [['Kinetic energy', '0 (released with no velocity)', '½ $m $v_{sol}²'], ['Potential energy', '$m$g$h', '0']]) },
        { t: 'Question 2 · mechanical energy', html: '<p>System: the ball. Reference frame: terrestrial, assumed Galilean. Forces: the weight only (friction neglected). The weight is a conservative force: the mechanical energy $E_M = $E_k + $E_p is conserved.</p>' +
          eq('$E_M(0) = $E_M(ground)', '0 + $m$g$h = ½ $m $v_{sol}² + 0', '$v_{sol} = ' + sq('2$g$h')) },
        { t: 'Question 3 · work-kinetic energy theorem', html: '<p>Work-kinetic energy theorem between the release and the ground: the change in kinetic energy equals the sum of the work done by the forces, here only the work done by the weight. The ball falls by $h: $W_{A→B}(@W) = $m$g$h &gt; 0 (driving force).</p>' +
          eq('½ $m $v_{sol}² − 0 = $m$g$h', '$v_{sol} = ' + sq('2$g$h')) + '<p>Both theorems give the same result: for the weight, $W_{A→B}(@W) = −Δ$E_p.</p>' }],
      answer: '<p>At $y = $h: $E_k = 0, $E_p = $m$g$h. On the ground: $E_k = ½ $m $v_{sol}², $E_p = 0. Only the weight (conservative) does work: $v_{sol} = ' + sq('2$g$h') + ' with both theorems.</p>',
      traps: [
        'Writing $v_{sol} = 2$g$h: do not forget the square root (check the unit: ' + sq('m·s⁻² × m') + ' = m·s⁻¹).',
        'Writing $E_k = $m$g$h at the start: the ball is released with no velocity, $E_k(0) = 0.',
        'Using the conservation of mechanical energy without justifying it: say that only the weight, a conservative force, does work.'],
      note: NOTE
    },

    'td4-ex2': {
      title: 'Work done by a force',
      figs: [{ svg: F.work(EN), cap: 'Figure from the tutorial sheet: M moves from A to B; @F makes 30° with the line (AB), on the side of B.' }],
      questions: [
        '<b>1.</b> Using the figure above, calculate the work done by the constant force @F, of magnitude ‖@F‖ = 3N, as its point of application M moves from point A to point B.',
        '<b>2.</b> During a displacement from a point A at height $y_A to a point B at height $y_B, the work done by the weight of a ball of mass m = 500 g is $W_{AB} = 5.4 J.<br>a. Does the ball move upwards or downwards during this displacement?<br>b. Calculate the difference in height between points A and B.',
        '<b>3.</b> A child pulls a toy using a string that makes an angle α = 40° with the horizontal floor of the room. The child exerts on the toy a pulling force @T of magnitude ‖@T‖ = 10 N and moves it over a distance AB = 5 m. Calculate the work $W_{AB}(@T).'],
      hints: [
        'Constant force: $W_{A→B} = @F · @{AB} = $F × AB × cos(angle between @F and @{AB}). Check the direction of @{AB} (from A to B) on the figure.',
        'Work done by the weight: $W_{A→B}(@W) = $m$g($y_A − $y_B). It is positive when the object goes down. Mass in kg!',
        'The toy slides on the horizontal floor: the displacement is horizontal, and the string makes 40° with it.'],
      solution: [
        { t: 'Question 1 · work done by @F', html: '<p>The displacement goes from A to B: @{AB} points to the left, with length AB = 50 cm = 0.50 m. On the figure, @F makes an angle of 30° with the line (AB), on the side of B: the angle between @F and @{AB} is 30°.</p>' +
          eq('$W_{A→B}(@F) = @F · @{AB} = $F × AB × cos 30°', '= 3 × 0.50 × ' + fr('√3', '2') + ' = 0.75 √3 ≈ 1.3 J') +
          '<p>$W &gt; 0: the force is <b>driving</b> (positive work: @F has a component in the direction of the displacement).</p>' },
        { t: 'Question 2 · work done by the weight', html: '<p><b>a.</b> Work done by the weight: $W_{AB}(@W) = $m$g($y_A − $y_B) = 5.4 J &gt; 0, so $y_A &gt; $y_B: the ball moves <b>downwards</b> (the weight is driving).</p>' +
          '<p><b>b.</b> With $m = 500 g = 0.500 kg and $g = 10 m·s⁻²:</p>' + eq('$y_A − $y_B = ' + fr('$W_{AB}', '$m$g'), '= ' + fr('5.4', '0.500 × 10') + ' = 1.08 m') +
          '<p>The ball goes down by about 1.1 m (1.10 m with $g = 9.81 m·s⁻²: the exercise does not give $g).</p>' },
        { t: 'Question 3 · work done by the pulling force', html: '<p>The toy moves horizontally from A to B; @T makes 40° with the floor, hence with @{AB}:</p>' +
          eq('$W_{AB}(@T) = $T × AB × cos 40°', '= 10 × 5.0 × 0.766 ≈ 38 J') + '<p>Driving force. (cos 40° ≈ 0.766 needs a calculator: without one, leave 50 cos 40° J.)</p>' }],
      answer: '<ul><li>1. $W_{A→B}(@F) = 3 × 0.50 × cos 30° ≈ 1.3 J (driving).</li><li>2. $W_{AB}(@W) &gt; 0: the ball goes down, by 1.08 m (with $g = 10 m·s⁻²).</li><li>3. $W_{AB}(@T) = 50 cos 40° ≈ 38 J.</li></ul>',
      traps: [
        'Taking the angle with the wrong direction: it is the angle between the force and the displacement @{AB} (from A to B). With 150°, you would get −1.3 J.',
        'Forgetting to convert: 50 cm = 0.50 m, 500 g = 0.500 kg.',
        'Getting the sign of the weight’s work wrong: $W_{A→B}(@W) &gt; 0 when the object goes down.',
        'Writing $W = $F × AB without the cosine: only the component of the force along the displacement does work.'],
      note: NOTE
    },

    'td4-ex3': {
      title: 'Motion on an inclined plane',
      intro: '<p>We want to move a robot of mass m and zero initial velocity from point A. The robot is equipped with a motor that can exert a thrust force with magnitude ‖@F_p‖ = 250N. Friction can be modeled by a constant force of magnitude ‖@f‖ = 50N.</p>' +
        '<p>Data given: $α = 30°, $m = 100 kg, $g = 10 m/s², AB = 10 m, $h = 20 m.</p>',
      figs: [{ svg: F.ramp(EN), cap: 'Figure from the tutorial sheet, redrawn to scale: C is h = 20 m above the road, both slopes are at $α = 30°.' }],
      questions: [
        '<b>1. Motion along path AB</b><br>a. Draw the external forces acting on the robot along path AB.<br>b. Which forces do work?<br>c. Use the work-kinetic energy theorem between points A and B to calculate the velocity of the robot at point B.',
        '<b>2. Motion along path BC</b><br>a. Draw the external forces acting on the robot along path BC.<br>b. Which forces do work? Which forces are driving forces? Which forces are resistive forces?<br>c. We want the robot to reach point C. Is its motor powerful enough?',
        '<b>3. Motion along path CD</b><br>During the descent, the robot switches off its motor to avoid wasting energy. Even better, when it reaches a speed of 5 m/s, it activates a mechanism that keeps its speed constant and allows the excess energy gained during the descent to be stored in the battery.<br>a. Calculate the energy that the robot can store between points C and D.<br>b. If the robot returns to a horizontal surface, how far can the robot travel using the energy stored during the descent?'],
      hints: [
        'A force perpendicular to the displacement does no work. A constant force parallel to the displacement does work ±$F × length (+ if it points in the direction of motion).',
        'On BC, first compute the length BC = $h/sin $α, then the work done by each force; the weight does −$m$g$h of work on the way up. If the theorem gives a negative kinetic energy at C, what can you conclude?',
        'Part 3: the sheet does not give the speed at C. Take $v_C = 0, add up the work done along CD, then subtract the kinetic energy the robot keeps at 5 m/s.'],
      solution: [
        { t: 'Question 1 · path AB', html: fig(F.rampForces(EN), 'Forces on the robot: on the left along AB (horizontal road), on the right along BC (climb). Lengths not to scale.') +
          '<p><b>a.</b> Along AB: the weight @W (vertical), the reaction force from the road @R (perpendicular to the road), the thrust @F_p (in the direction of motion) and the friction @f (opposite to the motion).</p>' +
          '<p><b>b.</b> @W and @R are perpendicular to the horizontal displacement: they do no work. Forces doing work: @F_p (driving, $F_p × AB) and @f (resistive, −$f × AB).</p>' +
          '<p><b>c.</b> System: the robot; reference frame: terrestrial, assumed Galilean. Work-kinetic energy theorem between A ($v_A = 0) and B:</p>' +
          eq('½ $m $v_B² − 0 = $F_p · AB − $f · AB', '= (250 − 50) × 10 = 2000 J', '$v_B = ' + sq(fr('2 × 2000', '100')) + ' = √40 ≈ 6.3 m/s') },
        { t: 'Question 2 · path BC', html: '<p><b>a.</b> Along BC: @W (vertical), @R (perpendicular to the slope), @F_p (up the slope), @f (down the slope): figure above, on the right.</p>' +
          '<p><b>b.</b> @R does no work (perpendicular to the displacement). Driving force: @F_p. Resistive forces: @W (the robot goes up) and @f.</p>' +
          '<p><b>c.</b> Length of the slope: BC = $h/sin $α = 20/0.5 = 40 m. Work done from B to C:</p>' +
          eq('$W_{B→C}(@F_p) = 250 × 40 = 10 000 J', '$W_{B→C}(@f) = −50 × 40 = −2000 J', '$W_{B→C}(@W) = −$m$g$h = −20 000 J') + '<p>Work-kinetic energy theorem from B to C:</p>' +
          eq('½ $m $v_C² = ½ $m $v_B² + Σ$W', '= 2000 + 10 000 − 2000 − 20 000', '= −10 000 J &lt; 0') +
          '<p>A kinetic energy cannot be negative: the robot <b>does not reach C</b>, its motor is not powerful enough. Along the slope, $F_p − $f − $m$g sin $α = 250 − 50 − 500 = −300 N: the robot slows down from B on and stops after 2000/300 ≈ 6.7 m of climb.</p>' +
          '<p>To reach C, it would need (same thrust on AB and BC, work-kinetic energy theorem from A to C with $v_C ≥ 0) $F_p(AB + BC) − $f(AB + BC) − $m$g$h ≥ 0, that is $F_p ≥ 50 + 20 000/50 = 450 N.</p>' },
        { t: 'Question 3 · path CD', html: '<p class="sol-note">The statement is inconsistent: with these data, the robot never reaches C (question 2c). Part 3 still assumes it does, without giving its speed at C. Reading used here: the robot leaves C with zero velocity ($v_C = 0); slope CD is also at $α = 30°, so CD = 40 m.</p>' +
          '<p><b>a.</b> Along CD, motor off: @W is driving ($W_{C→D}(@W) = +$m$g$h = 20 000 J), @f is resistive ($W_{C→D}(@f) = −50 × 40 = −2000 J), @R does no work. Without the mechanism, the robot would gain 18 000 J of kinetic energy. The mechanism keeps it at 5 m/s: it keeps ½ × 100 × 5² = 1250 J of kinetic energy, the rest is stored.</p>' +
          eq('$E_{stored} = 20 000 − 2000 − 1250', '= 16 750 J ≈ 1.7 × 10⁴ J') +
          '<p><b>b.</b> On a horizontal road, the motor pushes with $F_p = 250 N; over a distance $d it does the work $F_p × $d:</p>' + eq('$d = ' + fr('$E_{stored}', '$F_p') + ' = ' + fr('16 750', '250') + ' = 67 m') +
          '<p>Another possible reading: if the robot moves at constant speed, the motor only balances friction (50 N) and the distance is 16 750/50 = 335 m.</p>' }],
      answer: '<ul><li>AB: @F_p and @f do work; $v_B = √40 ≈ 6.3 m/s.</li><li>BC: @F_p driving, @W and @f resistive; ½ $m $v_C² = −10 000 J &lt; 0: the motor is not powerful enough (it would need $F_p ≥ 450 N).</li><li>CD (with $v_C = 0): 16 750 J stored; 67 m of motor at 250 N.</li></ul>',
      traps: [
        'Counting work for @R: it is perpendicular to the displacement, its work is zero.',
        'Taking BC = $h = 20 m: the length of the slope is $h/sin $α = 40 m.',
        'Forgetting the sign of the work done by the weight: on the way up, $W_{B→C}(@W) = −$m$g$h.',
        'Writing $v_C = √(−200) and carrying on: $v_C² &lt; 0 means the robot does not reach C.',
        'Counting as stored the kinetic energy the robot keeps at 5 m/s.'],
      note: 'No official answer key: solution written and checked. The statement is inconsistent (the robot does not reach C): part 3 is solved assuming vC = 0.'
    },

    'td4-ex4': {
      title: 'Motion on a circular arc',
      intro: '<p>A solid with mass m is moving along the path ABC shown in the figure below. AB is an arc of a circle with radius R and angle θ, centered at point O, while BC is a horizontal segment. Along the AB arc, friction is negligible, while along the BC segment, friction is a constant force of magnitude $f, collinear to the velocity vector. The solid starts moving at point A with an initial velocity $v_A, that is tangent to the circle.</p>' +
        '<p>Data given: m = 0.1 kg, $g = 10 m/s², R = 1.6 m, $v_C = $v_A = 3 m/s, θ = 60°, BC = 2 m.</p>',
      figs: [{ svg: F.arc(EN), cap: 'Figure from the tutorial sheet: O is directly above B, OA = OB = R.' }],
      questions: [
        '<b>1.</b> How do the kinetic and the potential energies change during motion on the arc AB? What can we say about the mechanical energy?',
        '<b>2.</b> If $h is the difference in height between points A and B, show that $h = $R (1 − cos$θ)',
        '<b>3.</b> Express $v_B, the velocity at point B, in terms of R, $g, $v_A and θ. Calculate its numerical value.',
        '<b>4.</b> Express the force of friction $f along the BC segment in terms of m, $v_B, $v_C and BC. Calculate its numerical value.'],
      hints: [
        'On the arc, the reaction force is perpendicular to the path and there is no friction: only the weight does work.',
        'Measure heights from O: B is $R below O; A is $R cos$θ below O (projection of OA on the vertical).',
        'Conservation of mechanical energy between A and B ($E_p = 0 at the level of B), then the work-kinetic energy theorem on BC, where only friction does work.'],
      solution: [
        { t: 'Question 1 · how the energies change', html: '<p>From A to B, the solid goes down: the weight does positive work, the kinetic energy <b>increases</b> and the potential energy <b>decreases</b>. Friction is negligible and the reaction force is perpendicular to the path (it does no work): only the weight, a conservative force, does work. The mechanical energy <b>is conserved</b>: what $E_p loses, $E_k gains.</p>' },
        { t: 'Question 2 · difference in height', html: '<p>Vertical axis pointing up, origin at O. B is directly below O, at distance $R: its height is −$R. Radius OA makes the angle $θ with the vertical OB: the projection of OA on the vertical is $R cos$θ, and the height of A is −$R cos$θ.</p>' +
          eq('$h = $z_A − $z_B = −$R cos$θ − (−$R)', '$h = $R (1 − cos$θ)') + '<p>Numerical value: $h = 1.6 × (1 − 0.5) = 0.80 m.</p>' },
        { t: 'Question 3 · velocity at B', html: '<p>Conservation of mechanical energy between A and B, with zero potential energy at the level of B:</p>' +
          eq('½ $m $v_A² + $m$g$h = ½ $m $v_B² + 0', '$v_B = ' + sq('$v_A² + 2$g$R(1 − cos$θ)'), '$v_B = ' + sq('9 + 2 × 10 × 1.6 × 0.5'), '= √25 = 5.0 m/s') },
        { t: 'Question 4 · friction force', html: '<p>Along BC (horizontal): @W and @R are perpendicular to the displacement, only friction does work. It is collinear to the velocity and points the opposite way (it is friction): $W_{B→C}(@f) = −$f × BC. Work-kinetic energy theorem from B to C:</p>' +
          eq('½ $m $v_C² − ½ $m $v_B² = −$f · BC', '$f = ' + fr('$m($v_B² − $v_C²)', '2 BC'), '$f = ' + fr('0.10 × (25 − 9)', '2 × 2.0') + ' = 0.40 N') }],
      answer: '<ul><li>1. $E_k increases, $E_p decreases, $E_M constant.</li><li>2. $h = $R(1 − cos$θ) = 0.80 m.</li><li>3. $v_B = ' + sq('$v_A² + 2$g$R(1 − cos$θ)') + ' = 5.0 m/s.</li><li>4. $f = $m($v_B² − $v_C²)/(2 BC) = 0.40 N.</li></ul>',
      traps: [
        'Taking $h = $R cos$θ or $R sin$θ: draw the triangle, the drop is $R − $R cos$θ.',
        'Forgetting the initial kinetic energy: the solid is launched, $v_A = 3.0 m/s.',
        'Giving a negative friction force: $f is a magnitude; it is its work that is negative.',
        'Using conservation of mechanical energy on BC: with friction, it decreases.'],
      note: NOTE
    },

    'td4-ex5': {
      title: 'Puck game',
      intro: '<p>This game consists of a track on which a small, hard disk, similar to a hockey puck, with mass m is propelled and then released. The track lies in a vertical plane and consists of three sections connected to each other: a horizontal rectilinear section AB, a circular arc BC of radius R and angle θ, and lastly an inclined rectilinear section CD. The diagram below shows the trajectory followed by the puck’s center of mass G.</p>' +
        '<p>The shot is successful if the puck G reaches point D, which is at a height $h above the horizontal plane that contains AB. For the segment of length L between points A and A’, we will assume that a constant force of propulsion @F is applied on the puck. All sources of friction will be ignored throughout the exercise.</p>' +
        '<p>Data given: $L = 0.5 m ; $h = 1.5 m ; $g = 10 m·s⁻² ; $m = 5 kg. We also assume that OC = OB = R, and that the puck has zero initial velocity ($v_A = 0).</p>',
      figs: [{ svg: F.puck(EN), cap: 'Figure from the tutorial sheet: arc BC with centre O and angle θ, D at height h above AB.' }],
      questions: [
        '<b>1. Along the AA’ section</b><br>a. Draw all external forces that act on the puck between points A and A’.<br>b. Using the work-kinetic energy theorem between points A and A’, find the expression for the magnitude of the force @F in terms of L, m and the velocity of the puck at A’.',
        '<b>2. Along the A’B section</b>, what is the connection between the velocity at point B and the velocity at point A’? Justify your answer.',
        '<b>3. Along the BD section</b><br>a. Using the theorem of mechanical energy conservation, determine the expression for the velocity at point B, in terms of $g and $h, given that <b>the puck reaches point D with zero velocity.</b><br>b. Deduce the expression for the magnitude of the force @F, which is exerted on the puck between points A and A’, in terms of $g, $h, m and L. Calculate its numerical value.',
        '<b>4. Along the BC section</b>, use the theorem of mechanical energy conservation to express the velocity at point C in terms of $g, $h, R and θ.'],
      hints: [
        'Between A and A’: weight, reaction force from the track, propulsion force. Only @F is parallel to the displacement.',
        'With no friction and no propulsion, on a horizontal section, no force does work.',
        'Between B and D, only the weight does work: mechanical energy is conserved. For C, same geometry as in exercise 4: C is $R(1 − cos$θ) above B.'],
      solution: [
        { t: 'Question 1 · section AA’', html: '<p><b>a.</b> Between A and A’: the weight @W (vertical, pointing down), the reaction force from the track @R (vertical, pointing up: no friction) and the propulsion force @F (horizontal, in the direction of motion).</p>' +
          '<p><b>b.</b> @W and @R are perpendicular to the displacement: zero work. @F is constant and parallel to the displacement: $W_{A→A’}(@F) = $F$L. Work-kinetic energy theorem between A ($v_A = 0) and A’:</p>' +
          eq('½ $m $v_{A’}² − 0 = $F$L', '$F = ' + fr('$m $v_{A’}²', '2$L')) },
        { t: 'Question 2 · section A’B', html: '<p>Between A’ and B, the track is horizontal, with no propulsion and no friction: @W and @R are perpendicular to the displacement, the total work is zero. By the work-kinetic energy theorem, Δ$E_k = 0:</p>' + eq('$v_B = $v_{A’}') +
          '<p>(The forces cancel out: the puck moves in a straight line at constant speed, Newton’s first law.)</p>' },
        { t: 'Question 3 · section BD', html: '<p><b>a.</b> Between B and D, only the weight does work (@R is perpendicular to the path, no friction): mechanical energy is conserved. Potential energy taken as zero on AB; $v_D = 0:</p>' +
          eq('½ $m $v_B² + 0 = 0 + $m$g$h', '$v_B = ' + sq('2$g$h') + ' = √30 ≈ 5.5 m·s⁻¹') +
          '<p><b>b.</b> With $v_{A’} = $v_B (question 2):</p>' + eq('$F = ' + fr('$m $v_B²', '2$L') + ' = ' + fr('$m$g$h', '$L'), '$F = ' + fr('5.0 × 10 × 1.5', '0.50') + ' = 150 N') },
        { t: 'Question 4 · velocity at C', html: '<p>O is directly above B, at distance $R; C is on the circle, with the angle $θ between OB and OC. As in exercise 4, C is at height $R(1 − cos$θ) above B. Conservation of mechanical energy between B and C:</p>' +
          eq('½ $m $v_B² = ½ $m $v_C²', '+ $m$g$R(1 − cos$θ)', '$v_C = ' + sq('$v_B² − 2$g$R(1 − cos$θ)'), '$v_C = ' + sq('2$g($h − $R(1 − cos$θ))')) }],
      answer: '<ul><li>1. @W, @R, @F; $F = $m $v_{A’}²/(2$L).</li><li>2. $v_B = $v_{A’} (no force does work).</li><li>3. $v_B = ' + sq('2$g$h') + ' ≈ 5.5 m·s⁻¹; $F = $m$g$h/$L = 150 N.</li><li>4. $v_C = ' + sq('2$g($h − $R(1 − cos$θ))') + '.</li></ul>',
      traps: [
        'Counting work for the reaction force: with no friction, it is perpendicular to the track and does no work.',
        'Forgetting that $v_{A’} = $v_B: this is what links question 3a to question 3b.',
        'Writing the height of C with $R cos$θ: the height of C above B is $R − $R cos$θ.',
        'Forgetting the condition “reaches D with zero velocity”: it is what fixes $v_B.'],
      note: NOTE
    },

    /* ===================== Tutorial 5 — Kinematics in polar coordinates (no English sheet: translated) ===================== */
    'td5-ex1': {
      title: 'Polar basis',
      figs: [{ svg: F.polar(EN), cap: 'Diagram from the tutorial sheet: M located by r = OM and by the angle θ.' }],
      questions: [
        '<b>1.</b> Complete the diagram opposite by adding the vectors of the polar basis.',
        '<b>2.</b> Give the expression of the position vector in the polar basis.',
        '<b>3.</b> Which mathematical relation links position and velocity? Use it to find the expression of the velocity vector.',
        '<b>4.</b> Same question for the acceleration.'],
      hints: [
        '@u_r starts at M and points the same way as O to M; @u_θ is @u_r turned by +π/2 (anti-clockwise, the direction of increasing $θ).',
        'The position vector has a single component, along @u_r. For the velocity, differentiate @OM = $r @u_r as a product: @u_r depends on time through $θ.',
        'Write @u_r and @u_θ in the (fixed) Cartesian basis to differentiate them: d@u_r/d$t = ' + thd + ' @u_θ and d@u_θ/d$t = −' + thd + ' @u_r.'],
      solution: [
        { t: 'Question 1 · polar basis', html: fig(F.polar({ en: true, base: true }), 'Polar basis at M: @u_r along @OM, @u_θ turned by +π/2.') +
          '<p>@u_r: unit vector along (OM), pointing from O to M (@u_r = @OM/‖@OM‖). @u_θ: perpendicular unit vector, obtained by turning @u_r by +π/2 (anti-clockwise, increasing $θ). In the Cartesian basis:</p>' +
          eq('@u_r = cos$θ @u_x + sin$θ @u_y', '@u_θ = −sin$θ @u_x + cos$θ @u_y') + '<p>This basis is a moving basis: it turns with M.</p>' },
        { t: 'Question 2 · position vector', html: eq('@OM = $r @u_r') + '<p>No component along @u_θ: by definition, @u_r points towards M.</p>' },
        { t: 'Question 3 · velocity vector', html: '<p>Velocity is the derivative of the position vector with respect to time: @v = d@OM/d$t. Differentiate the product $r @u_r:</p>' +
          eq('@v = ' + rd + ' @u_r + $r ' + fr('d@u_r', 'd$t')) + '<p>@u_r depends on time through $θ($t):</p>' +
          eq(fr('d@u_r', 'd$t') + ' = ' + fr('d@u_r', 'd$θ') + ' ' + thd, '= ' + thd + ' (−sin$θ @u_x + cos$θ @u_y) = ' + thd + ' @u_θ') + eq('@v = ' + rd + ' @u_r + $r' + thd + ' @u_θ') },
        { t: 'Question 4 · acceleration vector', html: '<p>Acceleration is the derivative of velocity: @a = d@v/d$t. In the same way, d@u_θ/d$t = ' + thd + ' (−cos$θ @u_x − sin$θ @u_y) = −' + thd + ' @u_r. Differentiate each product:</p>' +
          eq('@a = ' + rdd + ' @u_r + ' + rd + ' ' + thd + ' @u_θ', '+ (' + rd + ' ' + thd + ' + $r' + thdd + ') @u_θ + $r' + thd + ' (−' + thd + ' @u_r)') +
          eq('@a = ($r̈ − $r' + thd + '²) @u_r', '+ (2' + rd + thd + ' + $r' + thdd + ') @u_θ') }],
      traps: [
        'Writing @OM = $r @u_r + $θ @u_θ: the position vector has no component along @u_θ (and $θ is an angle, not a length).',
        'Forgetting that @u_r and @u_θ turn: you would get @v = ' + rd + ' @u_r, which is wrong for a circular motion.',
        'Getting the sign in @u_θ wrong: it is −sin$θ @u_x + cos$θ @u_y (for $θ = 0, @u_θ = @u_y).',
        'Forgetting the factor 2 in front of ' + rd + thd + ': it comes from two terms ' + rd + thd + ' @u_θ.'],
      note: NOTE
    },

    'td5-ex2': {
      title: 'Motion of a merry-go-round',
      intro: '<p>In the plane, with an orthonormal frame (Oxy), the coordinates of the wooden horse of a merry-go-round, modelled as a material point M, are given as functions of time by the following parametric equations:</p>' +
        eq('$x($t) = $r_0 cos($ω$t)', '$y($t) = $r_0 sin($ω$t)'),
      questions: [
        '<b>1.</b> What are the units of the constants $r_0 and $ω?',
        '<b>2.</b> On a diagram, draw the vectors of the polar basis for an arbitrary position of the material point. Show the associated coordinates and the position vector @OM.',
        '<b>3.</b> Define the position vector @OM($t) in the polar basis, then express it in terms of the data of the exercise.',
        '<b>4.</b> At an arbitrary instant t, find the expression of the velocity vector @v in the polar basis.',
        '<b>5.</b> Deduce its norm ‖@v‖ and check that the result is dimensionally consistent.',
        '<b>6.</b> Show that in Cartesian coordinates the velocity vector is: @v = −$r_0 sin($ω$t) @u_x + $r_0 cos($ω$t) @u_y. Calculate its norm and deduce the link between $ω and the angular velocity ' + thd + '.',
        '<b>7.</b> Deduce the nature of the motion of the material point.',
        '<b>8.</b> Find the components of the acceleration vector @a in the polar basis, calculate its norm and give the orientation of this vector.'],
      hints: [
        'Match $x = $r cos$θ and $y = $r sin$θ: what are $r and $θ here?',
        'With $r constant, ' + rd + ' = ' + rdd + ' = 0: only $r' + thd + ' (velocity) and −$r' + thd + '² (acceleration) remain, plus $r' + thdd + ' if ' + thd + ' changes.',
        'Question 6: differentiate $x($t) and $y($t); the derivative of cos($ω$t) is −$ω sin($ω$t). Compare with the expression in the statement.'],
      solution: [
        { t: 'Question 1 · units', html: '<p>$x is a length and cos($ω$t) has no dimension: $r_0 is in <b>meters</b>. The argument of a cosine is an angle (in radians, dimensionless): $ω$t is in rad, so $ω is in <b>rad·s⁻¹</b>.</p>' },
        { t: 'Question 2 · diagram', html: fig(F.manege(EN), 'M on the circle of radius $r_0: polar coordinates ($r, $θ), position vector @OM and basis (@u_r, @u_θ) at M.') +
          '<p>@u_r starts at M and points the same way as @OM; @u_θ is tangent to the circle, turned by +π/2. The polar coordinates of M are $r = OM and $θ, the angle between @u_x and @OM.</p>' },
        { t: 'Question 3 · position vector', html: '<p>Definition: @OM = $r @u_r, with $r = OM. Here $x and $y have the form $x = $r cos$θ, $y = $r sin$θ with:</p>' +
          eq('$r = ' + sq('$x² + $y²') + ' = $r_0   and   $θ = $ω$t', '@OM($t) = $r_0 @u_r') + '<p>(@u_r turns with M: it depends on $t through $θ = $ω$t.)</p>' },
        { t: 'Question 4 · velocity vector', html: '<p>$r = $r_0 is constant: ' + rd + ' = 0. $θ = $ω$t: ' + thd + ' = $ω. With @v = ' + rd + ' @u_r + $r' + thd + ' @u_θ:</p>' + eq('@v = $r_0 $ω @u_θ') },
        { t: 'Question 5 · norm and dimensions', html: eq('‖@v‖ = $r_0 $ω') + '<p>Dimensions: [$r_0 $ω] = m × rad·s⁻¹ = m·s⁻¹ (the radian is dimensionless): it is indeed a speed.</p>' },
        { t: 'Question 6 · in Cartesian coordinates', html: '<p class="sol-note">The expression in the statement contains an error: the factor $ω is missing. As written, $r_0 sin($ω$t) is in meters, not in m·s⁻¹: it is not dimensionally a velocity. Reading used here: we show the corrected expression.</p><p>Differentiate the coordinates:</p>' +
          eq('$v_x = ' + fr('d$x', 'd$t') + ' = −$r_0 $ω sin($ω$t)', '$v_y = ' + fr('d$y', 'd$t') + ' = $r_0 $ω cos($ω$t)') +
          eq('@v = −$r_0 $ω sin($ω$t) @u_x', '+ $r_0 $ω cos($ω$t) @u_y') + '<p>Norm:</p>' +
          eq('‖@v‖ = $r_0 $ω ' + sq('sin²($ω$t) + cos²($ω$t)'), '= $r_0 $ω') +
          '<p>In polar coordinates, ‖@v‖ = $r_0 |' + thd + '|. The two norms are equal and $θ = $ω$t increases: <b>' + thd + ' = $ω</b>. The angular velocity is the constant $ω.</p>' +
          '<p>Note: @v = $r_0$ω (−sin$θ @u_x + cos$θ @u_y) = $r_0$ω @u_θ, which is question 4 again.</p>' },
        { t: 'Question 7 · nature of the motion', html: '<p>$r = $r_0 is constant: the trajectory is a circle with centre O and radius $r_0. ‖@v‖ = $r_0$ω is constant: the motion is uniform. It is a <b>uniform circular motion</b>.</p>' },
        { t: 'Question 8 · acceleration vector', html: '<p>With ' + rd + ' = ' + rdd + ' = 0 and ' + thdd + ' = 0 (' + thd + ' = $ω constant):</p>' +
          eq('@a = ($r̈ − $r' + thd + '²) @u_r + (2' + rd + thd + ' + $r' + thdd + ') @u_θ', '@a = −$r_0 $ω² @u_r', '‖@a‖ = $r_0 $ω²') +
          fig(F.manege({ en: true, kin: true }), 'Uniform circular motion: @v tangent to the circle, @a pointing towards the centre O.') +
          '<p>@a points along −@u_r, from M towards the centre O: the acceleration is <b>centripetal</b>. It is not zero even though the motion is uniform: the direction of @v keeps changing. (You can also write @a = −$ω² @OM.)</p>' }],
      answer: '<ul><li>1. $r_0 in m, $ω in rad·s⁻¹.</li><li>3. @OM = $r_0 @u_r ($r = $r_0, $θ = $ω$t).</li><li>4-5. @v = $r_0$ω @u_θ, ‖@v‖ = $r_0$ω (m·s⁻¹).</li><li>6. @v = −$r_0$ω sin($ω$t) @u_x + $r_0$ω cos($ω$t) @u_y (factor $ω missing in the statement); ' + thd + ' = $ω.</li><li>7. Uniform circular motion.</li><li>8. @a = −$r_0$ω² @u_r, ‖@a‖ = $r_0$ω², centripetal.</li></ul>',
      traps: [
        '“Uniform” does not mean “zero acceleration”: in uniform circular motion, @a = −$r_0$ω² @u_r ≠ @0.',
        'Copying the expression of question 6 without checking its dimensions: the factor $ω is missing.',
        'Giving $ω in rad (or in degrees): it is an angular velocity, in rad·s⁻¹.',
        'Writing @OM = $r_0 @u_r + $ω$t @u_θ: there is no component along @u_θ.'],
      note: 'No official answer key: solution written and checked. Question 6 of the statement forgets the factor ω in v⃗: this sheet shows the corrected expression.'
    },

    'td5-ex3': {
      title: 'Motion of a satellite',
      intro: '<p>A satellite of mass m = 300 kg moves on a circular orbit around the Earth at a height h = 6400 km above the ground. The radius of the Earth is R<sub>T</sub> = 6400 km. At time t, it is located at point M with polar coordinates (r, θ), as shown in the figure. The origin of the axes O is at the centre of the Earth.</p>',
      figs: [{ svg: F.sat(EN), cap: 'Figure from the tutorial sheet: circular orbit of radius $r = R<sub>T</sub> + $h around the centre O of the Earth.' }],
      questions: [
        '<b>1.</b> Give the expression of the position vector @OM in polar coordinates.',
        '<b>2.</b> Give the expression of the velocity vector @v in polar coordinates, using the fact that the radius r is constant, and its norm.',
        '<b>3.</b> Give the expression of the acceleration vector.',
        '<b>4.</b> Give the expression of the gravitational force acting on the satellite.',
        '<b>5.</b> Using Newton’s second law, give the expression of the acceleration vector.',
        '<b>6.</b> Using the equations established above, show that ' + thd + ' = $ω is constant, then show that the norm of the velocity vector can be written ‖@v‖ = $v = $r$ω.',
        '<b>7.</b> Show that the norm of the acceleration vector can be written ‖@a‖ = $a = ' + fr('$v²', '$r') + '.',
        '<b>8.</b> Using the previous results, find $v in terms of G, M<sub>T</sub> and r. (G = 6.67 · 10⁻¹¹ N·m²/kg² and M<sub>T</sub> = 6 · 10²⁴ kg.)',
        '<b>9.</b> Give the expression of the period T of revolution of the satellite. Calculate its value in hours.'],
      hints: [
        'The radius is constant: ' + rd + ' = ' + rdd + ' = 0 in the general polar formulas for @v and @a.',
        'Gravity is attractive: it points from M towards O, that is along −@u_r, with magnitude $G$M_T$m/$r².',
        'Project Newton’s second law on @u_θ (the force has no component along it), then on @u_r. Period: the time to go once round the orbit, 2π$r, at speed $v.'],
      solution: [
        { t: 'Question 1 · position vector', html: '<p>Framework: geocentric reference frame, assumed Galilean; system: the satellite (point M of mass $m); polar coordinates centred on O, the centre of the Earth.</p>' +
          eq('@OM = $r @u_r', '$r = R<sub>T</sub> + $h = 12 800 km', '= 1.28 × 10⁷ m') },
        { t: 'Question 2 · velocity vector', html: '<p>$r is constant: ' + rd + ' = 0, so</p>' + eq('@v = $r' + thd + ' @u_θ', '‖@v‖ = $r |' + thd + '|') },
        { t: 'Question 3 · acceleration vector', html: '<p>With ' + rd + ' = ' + rdd + ' = 0:</p>' + eq('@a = −$r' + thd + '² @u_r + $r' + thdd + ' @u_θ') },
        { t: 'Question 4 · gravitational force', html: '<p>Gravity is attractive: the Earth pulls the satellite towards its centre O, along −@u_r.</p>' + eq('@F = −' + fr('$G $M_T $m', '$r²') + ' @u_r') +
          '<p class="sol-note">The course writes the law of gravity without a minus sign; the safe form is this one, with @u_r pointing from O (the Earth) to M (the satellite).</p>' },
        { t: 'Question 5 · Newton’s second law', html: '<p>Only force: gravity. Newton’s second law: $m @a = @F, so</p>' + eq('@a = −' + fr('$G $M_T', '$r²') + ' @u_r') },
        { t: 'Question 6 · constant angular velocity', html: '<p>Match the two expressions of @a (questions 3 and 5), component by component.</p><p>Along @u_θ: $r' + thdd + ' = 0, so ' + thdd + ' = 0: the angular velocity ' + thd + ' is constant; call it $ω. Then:</p>' + eq('‖@v‖ = $v = $r$ω') + '<p>(With $ω &gt; 0, anti-clockwise rotation.)</p>' },
        { t: 'Question 7 · norm of the acceleration', html: '<p>Along @u_r: the acceleration component is −$r$ω², so ‖@a‖ = $r$ω². With $ω = $v/$r:</p>' + eq('$a = $r ' + fr('$v²', '$r²') + ' = ' + fr('$v²', '$r')) },
        { t: 'Question 8 · speed', html: '<p>Along @u_r, Newton’s second law also gives $a = $G$M_T/$r². Equate:</p>' + eq(fr('$v²', '$r') + ' = ' + fr('$G $M_T', '$r²') + ' ⇒ $v = ' + sq(fr('$G $M_T', '$r'))) +
          eq('$v = ' + sq(fr('6.67 × 10⁻¹¹ × 6 × 10²⁴', '1.28 × 10⁷')), '$v ≈ 5.6 × 10³ m·s⁻¹') + '<p>About 5.6 km/s. The mass of the satellite plays no part.</p>' },
        { t: 'Question 9 · period', html: '<p>In one period $T, the satellite covers the circumference 2π$r at speed $v:</p>' + eq('$T = ' + fr('2π$r', '$v') + ' = 2π ' + sq(fr('$r³', '$G $M_T'))) +
          eq('$T = ' + fr('2π × 1.28 × 10⁷', '5.59 × 10³'), '$T ≈ 1.44 × 10⁴ s ≈ 4.0 h') }],
      answer: '<ul><li>@OM = $r @u_r ($r = 1.28 × 10⁷ m); @v = $r' + thd + ' @u_θ; @a = −$r' + thd + '² @u_r + $r' + thdd + ' @u_θ.</li><li>@F = −($G$M_T$m/$r²) @u_r; @a = −($G$M_T/$r²) @u_r.</li><li>' + thd + ' = $ω constant, $v = $r$ω, $a = $v²/$r.</li><li>$v = ' + sq('$G$M_T/$r') + ' ≈ 5.6 × 10³ m·s⁻¹; $T = 2π$r/$v ≈ 1.44 × 10⁴ s ≈ 4.0 h.</li></ul>',
      traps: [
        'Taking $r = $h = 6400 km: the radius of the orbit is measured from the centre of the Earth, $r = R<sub>T</sub> + $h.',
        'Forgetting the minus sign of gravity: the force is attractive, pointing towards O.',
        'Forgetting to convert km to m before the numerical application.',
        'Saying the acceleration is zero because the speed is constant: it is centripetal and equals $v²/$r.'],
      note: NOTE
    }
  }));
})();
