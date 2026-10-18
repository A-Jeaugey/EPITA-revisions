/* English text for data/physique/ex-annales.js (merged over the French file by id, field by field).
   Statements of November 2017 (Ex 1, Ex 2) and November 2021 (Ex 1 to 4) are taken word for word from the English
   papers in Past-Exams (…-subject-en.pdf, folders 2022 and 2026), slips included; the other statements are
   translated with the vocabulary of the official English course (equations of motion, trajectory equation,
   reference frame, Newton’s second law, uniform, decelerated…). Decimal points, as in the English course.
   The figures come from window.PHYS_FIGS (French file), with English text for screen readers.
   Same notation helpers as the French file (M, X, E): see its header. */
(function () {
  var R = window.REV;
  /* ---------- notation ---------- */
  var VK = { OM: 'kp', OP: 'kp', OA: 'kp', CM: 'kp', r: 'kp', v: 'kv', V: 'kv', a: 'ka', F: 'kf', P: 'kf', R: 'kf', T: 'kf', f: 'kf' };
  var MARK = '[\\u0300-\\u036f]*';
  var RE_VEC = /^(OM|OP|OA|CM|[A-Za-z]|0)\u20d7/;
  var RE_FN = /^(Arctan|sin|cos|tan|ln)(?![A-Za-z])/;
  var RE_LET = new RegExp('^[A-Za-zÀ-ÖØ-öø-ɏḀ-ỿΑ-Ωα-ω]' + MARK);
  function grp(s, i) {
    for (var d = 0, j = i; j < s.length; j++) {
      if (s[j] === '{') d++;
      else if (s[j] === '}' && --d === 0) return { v: s.slice(i + 1, j), end: j + 1 };
    }
    throw new Error('accolade non fermée : ' + s);
  }
  function M(s) {
    var o = '', i = 0, m, g, c, rest, inner;
    while (i < s.length) {
      c = s[i]; rest = s.slice(i);
      if (c === '<') { var j = s.indexOf('>', i); o += s.slice(i, j + 1); i = j + 1; continue; }
      if (c === '&' && (m = /^&#?\w+;/.exec(rest))) { o += m[0]; i += m[0].length; continue; }
      if (c === '@') {
        var k = s[i + 1], a = [];
        for (i += 2; s[i] === '{'; i = g.end) { g = grp(s, i); a.push(g.v); }
        if (k === 'f') o += '<span class="frac"><span>' + M(a[0]) + '</span><span>' + M(a[1]) + '</span></span>';
        else if (k === 'r') o += '<span class="sqrt">√<span>' + M(a[0]) + '</span></span>';
        else if (k === 'c') o += '<span class="col">' + a.map(function (x) { return '<span>' + M(x) + '</span>'; }).join('') + '</span>';
        else if (k === 't') o += a[0];
        else throw new Error('commande inconnue @' + k);
        continue;
      }
      if (c === '_' || c === '^') {
        if (s[i + 1] === '{') { g = grp(s, i + 1); inner = g.v; i = g.end; }
        else { m = new RegExp('^.' + MARK).exec(s.slice(i + 1)); inner = m[0]; i += 1 + m[0].length; }
        inner = /^[A-Za-z]{2,}$/.test(inner) ? inner : M(inner);
        o += c === '_' ? '<sub>' + inner + '</sub>' : '<sup>' + inner + '</sup>';
        continue;
      }
      if ((m = RE_VEC.exec(rest))) {
        o += m[1] === '0' ? '<var class="vec up">0</var>' : '<var class="vec' + (VK[m[1]] ? ' ' + VK[m[1]] : '') + '">' + m[1] + '</var>';
        i += m[0].length; continue;
      }
      if ((m = RE_FN.exec(rest))) { o += m[1]; i += m[1].length; continue; }
      if ((m = RE_LET.exec(rest))) {
        var nx = s[i + m[0].length] || '';
        if (m[0] === 'd' && (RE_LET.test(s.slice(i + 1)) || nx === '²' || nx === '(' || nx === '')) o += 'd';
        else if (m[0] === 'e' && nx === '^') o += 'e';
        else o += '<var>' + m[0] + '</var>';
        i += m[0].length; continue;
      }
      o += c; i++;
    }
    return o;
  }
  /* texte avec formules entre $…$ */
  function X(s) { return s.replace(/\$([^$]+)\$/g, function (w, f) { return M(f); }); }
  /* équation centrée, une ligne par argument (une ligne trop longue passe à la ligne entre deux termes) */
  function E() { return '<div class="eq">' + Array.prototype.map.call(arguments, function (l) { return '<span>' + M(l) + '</span>'; }).join('') + '</div>'; }
  function ul(items) { return '<ul>' + items.map(function (x) { return '<li>' + X(x) + '</li>'; }).join('') + '</ul>'; }
  function P(s) { return '<p>' + X(s) + '</p>'; }
  function fig(svg, cap) { return '<figure class="fig" style="margin:0"><div class="mk-host">' + svg + '</div>' + (cap ? '<figcaption class="cap">' + X(cap) + '</figcaption>' : '') + '</figure>'; }
  /* QCM d’une question de cours : options a, b, c, d */
  function opts(list) { return '<ol type="a" style="margin:.3rem 0 0;padding-left:1.4rem;display:grid;gap:.15rem">' + list.map(function (x) { return '<li>' + X(x) + '</li>'; }).join('') + '</ol>'; }


  function site(s) { return '<p class="muted">' + X(s) + '</p>'; }
  var F = window.PHYS_FIGS;
  var NOTE_WRITTEN = 'No official answer key: worked solution written and checked.';

  R.i18n.patch(window.PHYS_EX, {
    /* ===================== October 2022 ===================== */
    'p2022-ex1': {
      src: 'Midterm Oct. 2022 · Ex 1', title: 'Lecture questions: units, nature of motion, polar coordinates',
      intro: '<p>Lecture questions (6 points – no negative points for the MCQ)</p><p>Select the correct answer(s):</p>',
      questions: [
        '1. The unit of an acceleration can be:' + opts(['m.s⁻¹', 'm.s⁻²', 'kg.m.s⁻¹', 'kg.s⁻²']),
        '2. Select the correct statement(s):' + opts(['A motion can be uniform along only one of its components', 'The trajectory equation tells whether the motion is uniform', 'In a uniform circular motion, the acceleration is zero', 'In a uniform rectilinear motion, the acceleration is zero']),
        X('3. A motion has the following equations of motion: $x(t) = 4t$ ; $y(t) = 3t² − 6t + 5$') + opts(['This motion is decelerated', 'This motion is uniform', 'The velocity vanishes at one point of the trajectory', 'This motion is parabolic']),
        '4. In cylindrical coordinates, the position vector reads:' + opts(['$OM⃗(t) = ρ u⃗_ρ$', '$OM⃗(t) = ρ u⃗_ρ + θ u⃗_θ$', '$OM⃗(t) = ρ u⃗_ρ + θ u⃗_θ + z u⃗_z$', '$OM⃗(t) = ρ u⃗_ρ + z u⃗_z$']),
        '5. In polar coordinates, the velocity vector reads:' + opts(['$v⃗(t) = ρθ̇ u⃗_θ$', '$v⃗(t) = ρ̇ u⃗_ρ$', '$v⃗(t) = ρ u⃗_θ$', '$v⃗(t) = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$']),
        '6. For a uniform circular motion:' + opts(['$θ̇ =$ constant', '$θ̇ = 0$', '$θ̈ = 0$', '$ρ̇ = 0$'])],
      hints: [
        'Go back to the definitions of the course: “uniform” means that the norm of the velocity is constant; accelerated or decelerated is read on the sign of the scalar product ' + M('v⃗·a⃗') + '.',
        X('Question 3: compute $v⃗ = (ẋ ; ẏ)$ and $a⃗ = (ẍ ; ÿ)$, then $v⃗·a⃗$. For the shape of the trajectory, get t from $x(t)$ and substitute it into $y(t)$.'),
        X('Questions 4 to 6: the position vector never has a component along $u⃗_θ$. On a circle, $ρ = R$ is constant; “uniform” adds $θ̇$ constant.')],
      solution: [
        { t: 'Question 1: unit of an acceleration', html: P('$a = @f{dv}{dt}$: a velocity (m·s⁻¹) divided by a time (s), that is <strong>m·s⁻²</strong>. Answer <strong>b</strong>.') +
          P('The others: m·s⁻¹ is the unit of a velocity; kg·m·s⁻¹ that of the momentum $p⃗ = m v⃗$; kg·s⁻² that of the stiffness of a spring (N·m⁻¹, midterm 2).') },
        { t: 'Question 2: what “uniform” means', html: ul([
          'a, true: each component can be described on its own. For a projectile, $x(t) = v_0 cosα · t$: the motion is uniform along $(Ox)$, not along $(Oy)$.',
          'b, false: the trajectory equation $y(x)$ no longer contains time. It gives the shape of the path, not how fast it is travelled: a circle can be travelled at constant speed or not.',
          'c, false: in a uniform circular motion, $a⃗ = −Rθ̇² u⃗_ρ ≠ 0⃗$ (centripetal acceleration). The direction of the velocity changes.',
          'd, true: uniform and rectilinear, $v⃗$ is constant in norm and direction, so $a⃗ = @f{dv⃗}{dt} = 0⃗$.']) + P('Answers <strong>a and d</strong>.') },
        { t: 'Question 3: differentiate, then judge', html: E('v⃗ = @c{ẋ}{ẏ} = @c{4}{6t − 6}   a⃗ = @c{ẍ}{ÿ} = @c{0}{6}') + ul([
          'a: $v⃗·a⃗ = 4 × 0 + (6t − 6) × 6 = 36(t − 1)$. Negative for $t &lt; 1$ s (decelerated), positive afterwards (accelerated). “Decelerated” on its own is false.',
          'b: $‖v⃗‖ = @r{16 + (6t − 6)²}$ varies: the motion is not uniform.',
          'c: $v_x = 4$ never vanishes, so $v⃗ ≠ 0⃗$ at all times: false.',
          'd: $t = @f{x}{4}$ gives $y = @f{3}{16}x² − @f{3}{2}x + 5$: a parabola. True.']) + P('Answer <strong>d</strong> only.') },
        { t: 'Question 4: cylindrical coordinates', html: P('Answer <strong>d</strong>: $OM⃗ = ρ u⃗_ρ + z u⃗_z$. The position vector has no component along $u⃗_θ$: θ is an angle, not a length.') +
          site('Cylindrical coordinates are not in this year’s written course (only a diagram on the Moodle help sheet): they are polar coordinates plus a coordinate $z$. In polar coordinates, $OM⃗ = ρ u⃗_ρ$.') },
        { t: 'Question 5: velocity in polar coordinates', html: P('Answer <strong>d</strong>: $v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$, obtained by differentiating $ρ u⃗_ρ$ with $@f{du⃗_ρ}{dt} = θ̇ u⃗_θ$. Options a and b keep only one term; c does not have the unit of a velocity.') },
        { t: 'Question 6: uniform circular motion', html: P('Circular: $ρ = R$ is constant, so $ρ̇ = 0$ (d). Uniform: $‖v⃗‖ = Rθ̇$ is constant, so $θ̇$ is constant (a) and $θ̈ = 0$ (c). $θ̇ = 0$ would mean that M does not move (b false).') +
          P('Answers <strong>a, c and d</strong>. On the script in the past exams, the marker circled c, which the student had missed.') }],
      answer: '<ol style="margin:0;padding-left:1.3rem"><li>b</li><li>a and d</li><li>d</li><li>d</li><li>d</li><li>a, c and d</li></ol>',
      traps: [
        X('Believing that a uniform circular motion has zero acceleration: it equals $Rθ̇²$, directed towards the centre.'),
        'Answering “decelerated” in question 3: the motion is decelerated until t = 1 s, then accelerated.',
        'Forgetting that several answers can be correct (questions 2 and 6).',
        X('Writing $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$: the position vector has no component along $u⃗_θ$.')],
      grading: '6 points for the six questions, no negative points; the breakdown is not printed.',
      note: 'No official answer key: worked solution written and checked; it matches the marker’s ticks on the marked script in the past exams.'
    },

    'p2022-ex2': {
      src: 'Midterm Oct. 2022 · Ex 2', title: 'A ball launched from a height h',
      intro: P('We study the trajectory of a ball in the plane, with a Cartesian coordinate system. The ball is launched with a velocity $v⃗_0$ making an angle $α$ with the horizontal, from the point of coordinates $(0, h)$. The position vector is:') +
        E('OM⃗(t) = (v_0 cosα)t u⃗_x + (−@f{1}{2}gt² + (v_0 sinα)t + h) u⃗_y') + P('where $g$ is the gravitational acceleration of the Earth.'),
      figs: [{ svg: F.tir22('Parabolic arc of the ball launched from point A at height h with velocity v0 at angle alpha; points M1, S at the apex, M2, M3, and P on the ground on the x-axis.'),
        cap: X('Diagram of the paper, redrawn. The ground is the $(Ox)$ axis; S is the apex, P the impact point.') }],
      questions: [
        '1. Give the equations of motion.',
        '2. Find the trajectory equation.',
        X('3. Calculate the velocity vector $v⃗(t)$ as a function of $v_0$, $α$, $t$ and $g$, and calculate its norm.'),
        X('4. Calculate the acceleration vector $a⃗(t)$ and calculate its norm.'),
        '5. Comment on the results of questions 3 and 4 by describing the motion along the Ox axis and along the Oy axis.',
        '6. On the diagram, draw the velocity and acceleration vectors at points M₁, M₂, M₃ and S.',
        X('7. Calculate the coordinates $(x_S , y_S)$ of the apex S of the trajectory.'),
        X('8. At what time $t′$ does the ball reach the apex?')],
      hints: [
        X('The equations of motion are the components of $OM⃗(t)$: read them in front of $u⃗_x$ and $u⃗_y$. For the trajectory, get t from $x(t)$ and substitute it into $y(t)$.'),
        X('Differentiate component by component: $v⃗ = (ẋ ; ẏ)$, then $a⃗ = (v̇_x ; v̇_y)$. To describe the motion along an axis, check whether that velocity component is constant, then compare the signs of $v_y$ and $a_y$.'),
        X('At the apex, the velocity is horizontal: $v_y(t′) = 0$. Do question 8 (the time) before question 7, then substitute $t′$ into $x(t)$ and $y(t)$.')],
      solution: [
        { t: 'Study framework', html: P('System under study: the ball, modelled as a material point M. Reference frame: terrestrial, assumed Galilean. Coordinate system: $(O, u⃗_x, u⃗_y)$, O on the ground below the launch point, $u⃗_y$ upwards. Origin of time: the launch, at point A.') +
          P('The paper gives $OM⃗(t)$: everything is done by differentiating. This expression comes from Newton’s second law: with the weight only, $a⃗ = g⃗$, then two integrations with $v⃗(0) = v⃗_0$ and $OM⃗(0) = OA⃗$.') },
        { t: 'Question 1: equations of motion', html: P('They are the coordinates of M, read in front of $u⃗_x$ and $u⃗_y$:') + E('x(t) = v_0 cosα · t', 'y(t) = −@f{1}{2} g t² + v_0 sinα · t + h') +
          P('Check: at $t = 0$, $x = 0$ and $y = h$: the ball does start from A. These are real-valued functions: no $u⃗_x$ or $u⃗_y$ in $x(t)$ and $y(t)$.') },
        { t: 'Question 2: trajectory equation', html: P('Eliminate t. From $x(t)$, $t = @f{x}{v_0 cosα}$ (with $cosα ≠ 0$). Substitute into $y(t)$:') +
          E('y = −@f{1}{2} g @f{x²}{v_0² cos²α} + v_0 sinα · @f{x}{v_0 cosα} + h', 'y(x) = −@f{g}{2v_0² cos²α} x² + x tanα + h') +
          P('This is a downward parabola (the coefficient of $x²$ is negative). No t is left.') },
        { t: 'Question 3: velocity vector', html: E('v⃗(t) = @f{dOM⃗}{dt} = ẋ u⃗_x + ẏ u⃗_y', 'v⃗(t) = v_0 cosα u⃗_x + (v_0 sinα − g t) u⃗_y') + P('Norm:') +
          E('‖v⃗‖ = @r{v_0² cos²α + (v_0 sinα − g t)²}', '‖v⃗‖ = @r{v_0² − 2v_0 g t sinα + g² t²}') + P('Check: at $t = 0$, $‖v⃗‖ = v_0$. Unit: m·s⁻¹.') },
        { t: 'Question 4: acceleration vector', html: E('a⃗(t) = @f{dv⃗}{dt} = 0 u⃗_x − g u⃗_y = −g u⃗_y', '‖a⃗‖ = g') + P('The acceleration is constant, vertical and downwards: it is $g⃗$. The motion is a free fall.') },
        { t: 'Question 5: the motion along each axis', html: ul([
          'Along $(Ox)$: $v_x = v_0 cosα$ is constant and $a_x = 0$: <strong>uniform</strong> motion (uniform and rectilinear when projected on the axis).',
          'Along $(Oy)$: $a_y = −g$ is constant: motion with <strong>constant acceleration</strong>. On the way up, $v_y &gt; 0$ and $a_y &lt; 0$: it is <strong>decelerated</strong>. After the apex, $v_y &lt; 0$: it is <strong>accelerated</strong>.',
          'For the whole motion, $v⃗·a⃗ = −g(v_0 sinα − g t)$: same conclusion, decelerated until the apex, accelerated afterwards.']) },
        { t: 'Question 6: the vectors on the diagram', html: fig(F.tir22v('Trajectory of the ball with, at points M1, S, M2 and M3, the velocity vector tangent to the trajectory and the acceleration vector pointing vertically down, the same everywhere.'), 'Velocity in green, acceleration in red. Drawn with $v_0 = 9$ m·s⁻¹, α = 55° and g = 10 m·s⁻².') +
          ul(['$v⃗$ is tangent to the trajectory, in the direction of motion. At the apex it is horizontal ($v_y = 0$) and its norm is the smallest: $v_0 cosα$. It is not zero.', '$a⃗$ is the same at every point: vertical, downwards, of norm $g$.']) },
        { t: 'Questions 8 then 7: time and coordinates of the apex', html: P('Question 8 is needed for question 7: always read all the questions before starting. At the apex, the velocity is horizontal:') +
          E('v_y(t′) = v_0 sinα − g t′ = 0   ⇒   t′ = @f{v_0 sinα}{g}') + P('Substitute into $x(t)$ and $y(t)$:') +
          E('x_S = v_0 cosα · @f{v_0 sinα}{g}', 'x_S = @f{v_0² sinα cosα}{g} = @f{v_0² sin(2α)}{2g}', 'y_S = −@f{1}{2} g @f{v_0² sin²α}{g²} + @f{v_0² sin²α}{g} + h', 'y_S = h + @f{v_0² sin²α}{2g}') +
          P('Another method: the apex of the parabola is where $@f{dy}{dx} = 0$, that is $x = @f{v_0² sinα cosα}{g}$. On the script in the past exams, the student copies $y(x)$ again in question 7: no point.') }],
      answer: ul([
        '$x(t) = v_0 cosα · t$ ; $y(t) = −½ g t² + v_0 sinα · t + h$',
        '$y(x) = −@f{g}{2v_0² cos²α} x² + x tanα + h$: a parabola',
        '$v⃗ = v_0 cosα u⃗_x + (v_0 sinα − g t) u⃗_y$ ; $‖v⃗‖ = @r{v_0² cos²α + (v_0 sinα − g t)²}$',
        '$a⃗ = −g u⃗_y$ ; $‖a⃗‖ = g$',
        'Along $(Ox)$: uniform; along $(Oy)$: decelerated on the way up, then accelerated (constant acceleration)',
        '$t′ = @f{v_0 sinα}{g}$ ; $x_S = @f{v_0² sinα cosα}{g}$ ; $y_S = h + @f{v_0² sin²α}{2g}$']),
      traps: [
        X('Putting $u⃗_x$ and $u⃗_y$ in the equations of motion: $x(t)$ and $y(t)$ are numbers.'),
        X('Leaving t in $y(x)$, or forgetting the $+ h$ in $y(x)$ and in $y_S$.'),
        'Saying that the motion along (Oy) is “decelerated” without more detail: decelerated on the way up, accelerated on the way down.',
        X('Drawing $v⃗$ as zero at the apex: only $v_y$ vanishes, $v⃗ = v_0 cosα u⃗_x$.'),
        X('Drawing $a⃗$ tangent to the trajectory: $a⃗ = −g u⃗_y$ at every point.')],
      grading: '8 points, breakdown not printed; on the marked script in the past exams, questions 1, 2 and 4 are worth 1 point each.',
      note: 'No official answer key (the past exams contain a marked script): worked solution written and checked.'
    },

    'p2022-ex3': {
      src: 'Midterm Oct. 2022 · Ex 3', title: 'Crankshaft: M in polar coordinates, P in Cartesian coordinates',
      intro: P('A crankshaft is a mechanical part of a combustion engine that converts a translation along the Oy axis (piston P) into a rotation (point M). The engine is assumed to rotate at constant angular velocity $ω$, hence the angular position over time $θ(t) = ωt$. The length $L$ is also constant.') +
        P('We first study the motion of point M in polar coordinates, then that of point P in Cartesian coordinates.'),
      figs: [{ svg: F.vil('Crankshaft: M turns on a circle of centre O and radius R, located by the angle theta from the x-axis; the connecting rod PM of length L links M to the piston P, which slides along the y-axis.'),
        cap: X('Diagram of the paper, redrawn: M turns on the circle of centre O and radius $R$; the connecting rod PM, of length $L$, links M to the piston P, which slides along the $(Oy)$ axis.') }],
      questions: [
        '1. On the diagram, draw the polar basis at point M.',
        '<b>Part 1: motion of point M in polar coordinates.</b><br>' + X('a. Give the expression of the derivative of the angular position, $θ̇(t)$.'),
        X('b. Give the expression of the position vector $OM⃗(t)$.'),
        X('c. Calculate the velocity vector $v⃗_M(t)$ as a function of the radius $R$ and the angular velocity $ω$.'),
        X('d. Calculate the acceleration vector $a⃗_M(t)$ as a function of the radius $R$ and the angular velocity $ω$.'),
        '<b>Part 2: motion of point P in Cartesian coordinates.</b><br>' + X('a. Using trigonometric relations, and the fact that P moves along the Oy axis, show that the position vector of point P is: $OP⃗ = (R.sinθ + L.cosθ) u⃗_y$') +
          '<br><span class="muted">' + X('Note from the site: with the angle θ of the diagram, this expression is wrong (see the solution). For b and c, start from the given expression anyway, as in the exam.') + '</span>',
        X('b. Find the velocity vector $v⃗_P(t)$ as a function of $R$, $L$ and $ω$.'),
        X('c. Find the acceleration vector $a⃗_P(t)$ as a function of $R$, $L$ and $ω$.')],
      hints: [
        X('M stays on the circle of centre O and radius R: $ρ = R$ is constant, so $ρ̇ = ρ̈ = 0$. And $θ = ωt$ gives $θ̇ = ω$, $θ̈ = 0$.'),
        X('Use the formulas of the course, $v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$ and $a⃗ = (ρ̈ − ρθ̇²) u⃗_ρ + (2ρ̇θ̇ + ρθ̈) u⃗_θ$, then substitute.'),
        X('For P, $u⃗_y$ is fixed: just differentiate the component $R sin(ωt) + L cos(ωt)$ twice with respect to time.')],
      solution: [
        { t: 'Question 1: the polar basis at M', html: fig(F.vilBase('Same diagram with, at point M, the vector u rho pointing from O to M and the vector u theta tangent to the circle, rotated by a quarter turn.'), 'The polar basis is drawn at point M: $u⃗_ρ$ (the $u⃗_r$ of the course) along $OM⃗$, $u⃗_θ$ rotated by +π/2.') +
          P('$u⃗_ρ = @f{OM⃗}{OM}$ is a unit vector pointing from O to M, that is outwards from the circle. $u⃗_θ$ is obtained by rotating $u⃗_ρ$ by +π/2 (anti-clockwise): it is tangent to the circle, in the direction of increasing θ.') },
        { t: 'Part 1, a: angular velocity', html: E('θ(t) = ωt   ⇒   θ̇ = @f{dθ}{dt} = ω') + P('ω is constant, so $θ̈ = 0$: the rotation is uniform. Unit of ω: rad·s⁻¹.') },
        { t: 'Part 1, b: position vector', html: P('M stays on the circle of centre O and radius R: $ρ = OM = R$, constant.') + E('OM⃗(t) = R u⃗_ρ') +
          P('No term along $u⃗_θ$ or $u⃗_z$: the script in the past exams writes $ρ u⃗_ρ + z u⃗_z$ and gets no point. Time is hidden in $u⃗_ρ$, which turns with M.') },
        { t: 'Part 1, c: velocity vector', html: P('With $ρ = R$, $ρ̇ = 0$ and $θ̇ = ω$ in the formula of the course:') + E('v⃗_M = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ = Rω u⃗_θ') +
          P('You can also differentiate directly: $@f{d(R u⃗_ρ)}{dt} = R @f{du⃗_ρ}{dt} = Rθ̇ u⃗_θ$. The velocity is tangent to the circle; its norm $Rω$ (m·s⁻¹) is constant.') },
        { t: 'Part 1, d: acceleration vector', html: E('a⃗_M = (ρ̈ − ρθ̇²) u⃗_ρ + (2ρ̇θ̇ + ρθ̈) u⃗_θ = −Rω² u⃗_ρ') +
          P('$ρ̈ = 0$, $ρ̇ = 0$ and $θ̈ = 0$: only the centripetal term is left, of norm $Rω²$ (m·s⁻²), directed from M to O. A constant angular velocity does not give a zero acceleration: the direction of $v⃗_M$ keeps changing.') },
        { t: 'Part 2, a: the expression of the paper is wrong', html: P('In the coordinate system of the diagram, $M = (R cosθ ; R sinθ)$ and $P = (0 ; y_P)$. The rod has length L:') +
          E('PM² = (R cosθ)² + (y_P − R sinθ)² = L²', 'y_P = R sinθ + @r{L² − R² cos²θ}') +
          P('If φ is the angle between the rod and the $(Oy)$ axis, the height of P above M is $L cosφ$, so $OP⃗ = (R sinθ + L cosφ) u⃗_y$. The expression of the paper uses the same angle θ for the crank and for the rod: it is wrong. For instance, at θ = 0 it gives $OP = L$, hence $PM = @r{R² + L²} ≠ L$.') +
          P('For b and c, start from the expression of the paper, as the marker did: 0.5 point each on the script in the past exams.') },
        { t: 'Part 2, b: velocity of P', html: P('$u⃗_y$ is fixed: only the component is differentiated, with θ = ωt.') +
          E('OP⃗ = (R sin(ωt) + L cos(ωt)) u⃗_y', 'v⃗_P = @f{dOP⃗}{dt} = (Rω cos(ωt) − Lω sin(ωt)) u⃗_y') +
          site('With the exact expression, you would get $v_P = Rω cos(ωt) + @f{R²ω sin(ωt) cos(ωt)}{@r{L² − R² cos²(ωt)}}$: this was not expected.') },
        { t: 'Part 2, c: acceleration of P', html: E('a⃗_P = @f{dv⃗_P}{dt} = (−Rω² sin(ωt) − Lω² cos(ωt)) u⃗_y = −ω² OP⃗') + P('P moves in a straight line along $(Oy)$, but not at constant speed.') }],
      answer: ul([
        'Polar basis at M: $u⃗_ρ$ along $OM⃗$, $u⃗_θ$ tangent to the circle (rotation by +π/2)',
        '$θ̇ = ω$ ; $OM⃗ = R u⃗_ρ$ ; $v⃗_M = Rω u⃗_θ$ ; $a⃗_M = −Rω² u⃗_ρ$',
        'Exact expression: $OP⃗ = (R sinθ + @r{L² − R² cos²θ}) u⃗_y$; the one of the paper is wrong',
        'With the expression of the paper: $v⃗_P = ω(R cos(ωt) − L sin(ωt)) u⃗_y$ ; $a⃗_P = −ω²(R sin(ωt) + L cos(ωt)) u⃗_y$']),
      traps: [
        X('Writing $OM⃗ = ρ u⃗_ρ + z u⃗_z$ or $ρ u⃗_ρ + θ u⃗_θ$: for M on the circle, $OM⃗ = R u⃗_ρ$.'),
        X('Differentiating $R u⃗_ρ$ while forgetting that $u⃗_ρ$ turns: $@f{du⃗_ρ}{dt} = θ̇ u⃗_θ$, not $0⃗$.'),
        X('Concluding $a⃗_M = 0⃗$ because ω is constant: the acceleration is centripetal, of norm $Rω²$.'),
        X('Differentiating $u⃗_y$: it is a fixed vector. Only the polar basis turns.')],
      grading: '6 points, breakdown not printed; on the marked script in the past exams, question 1.a is worth 1 point, questions 2.b and 2.c 0.5 point each.',
      note: 'No official answer key: worked solution written and checked. The expression imposed in 2.a does not match the diagram (see the solution).'
    },

    /* ===================== November 2021 (English paper: statements word for word) ===================== */
    'p2021-ex1': {
      src: 'Midterm Nov. 2021 · Ex 1', title: 'Lecture questions: uniform motion, polar coordinates, acceleration',
      intro: '<p>Lecture questions [2.5 POINTS] (No negative points)</p><p>Select the correct answer</p>',
      questions: [
        '1. A motion is said uniform if' + opts(['Its trajectory is a straight line.', 'Its acceleration is constant over time.', 'Its velocity is constant over time.', 'Its velocity and acceleration vary very few over time.']),
        X('2. In polar coordinates, $(u⃗_ρ, u⃗_θ)$, position vector $r⃗(t) = OM⃗(t)$ has for expression:') + opts(['$r⃗(t) = ρ u⃗_ρ + θ u⃗_θ$', '$r⃗(t) = ρ u⃗_ρ$', '$r⃗(t) = θ u⃗_ρ + ρ u⃗_θ$', '$r⃗(t) = ρ u⃗_θ$']),
        X('3. A moving particle has a rectilinear trajectory along the X-axis. Its trajectory equation is $x(t) = 10 − 2t²$.') + opts(['The motion is uniform.', 'The motion is uniformly circular.', 'The motion is decelerated.', 'Acceleration magnitude is 2 m/s²']),
        X('4. Consider a moving particle whose position at each instant $t$ is given by its position vector $r⃗(t) = OM⃗(t)$. Acceleration vector $a⃗(t)$ of this motion has for expression:') + opts(['$a⃗(t) = @f{dr(t)}{dt²}$', '$a⃗(t) = @f{d²r⃗(t)}{dt²}$', '$a⃗(t) = [@f{dr⃗(t)}{dt}]²$', '$a(t) = @r{r(t)}$']),
        '5. Two vectors are perpendicular if their scalar product is equal to zero.' + opts(['TRUE', 'FALSE'])],
      hints: [
        '“Uniform” is about the norm of the velocity: neither the acceleration nor the shape of the trajectory.',
        X('Question 3: differentiate $x(t)$ twice, then look at the sign of the product $v_x a_x$: positive, the motion is accelerated; negative, it is decelerated.'),
        'The position vector in polar coordinates has a single component; the acceleration is the second derivative of the position.'],
      solution: [
        { t: 'Question 1: uniform', html: P('Answer <strong>c</strong>: the velocity, in the sense of its norm (the speed), is constant. A circular motion can be uniform; a straight line can be travelled while speeding up (a false); a constant non-zero acceleration changes the velocity (b false).') +
          P('The official answer key circles d: this is a mistake, “vary very few” is not a definition.') },
        { t: 'Question 2: position in polar coordinates', html: P('Answer <strong>b</strong>: $r⃗ = OM⃗ = ρ u⃗_ρ$. ρ is the distance OM and $u⃗_ρ$ points from O to M; θ is an angle, it cannot multiply a vector to give a length.') },
        { t: 'Question 3: no option is correct', html: E('v_x = ẋ = −4t   a_x = ẍ = −4 @t{m·s⁻²}') + ul([
          'a: $|v_x| = 4t$ increases, the motion is not uniform.',
          'b: the path is rectilinear, not circular.',
          'c: $v_x a_x = 16t &gt; 0$ for $t &gt; 0$: the motion is <strong>accelerated</strong>, not decelerated. x decreases, but faster and faster.',
          'd: the magnitude of the acceleration is 4 m/s², not 2.']) + P('No answer is correct; the official answer key circles nothing. (The paper calls $x(t)$ a “trajectory equation”: it is an equation of motion.)') },
        { t: 'Question 4: second derivative', html: P('Answer <strong>b</strong>: $a⃗ = @f{dv⃗}{dt} = @f{d²r⃗}{dt²}$, the second derivative of the position with respect to time. Option c is the square of the velocity; a and d make no sense.') },
        { t: 'Question 5: perpendicular vectors', html: P('Answer <strong>a</strong>, TRUE: $u⃗·w⃗ = ‖u⃗‖ ‖w⃗‖ cos(u⃗, w⃗)$ is zero if and only if the cosine is zero (for non-zero vectors), that is when the angle is 90°.') }],
      answer: '<ol style="margin:0;padding-left:1.3rem"><li>c</li><li>b</li><li>none (accelerated; ' + M('‖a⃗‖ = 4') + ' m/s²)</li><li>b</li><li>a (TRUE)</li></ol>',
      traps: [
        'Believing that “x decreases” means “decelerated”: the velocity is negative and larger and larger in absolute value, the motion is accelerated.',
        X('Taking $‖a⃗‖ = 2$ m/s²: the second derivative of $−2t²$ is −4.'),
        X('Confusing $@f{d²r⃗}{dt²}$ (second derivative) with $(@f{dr⃗}{dt})²$ (square of the velocity).'),
        'Copying the official answer key in question 1: it circles d, the correct answer is c.'],
      grading: '2.5 points according to the paper (the answer key says “3 points” by hand), no negative points; the breakdown per question is not given.',
      note: 'Follows the official answer key, except in question 1 (it circles d; the correct answer is c). In question 3, no option is correct and the key circles nothing.'
    },

    'p2021-ex2': {
      src: 'Midterm Nov. 2021 · Ex 2', title: 'Polar basis, derivatives and velocity in polar coordinates',
      intro: P('Diagram below shows on the same plane, polar and cartesian coordinates representations.'),
      figs: [{ svg: F.pol21('Point M with Cartesian coordinates x and y and polar coordinates rho and theta; at O, the vectors u x and u y of the Cartesian basis and the vectors u rho and u theta of the polar basis.'),
        cap: X('Diagram of the paper, redrawn. Cartesian basis in black, polar basis in orange.') }],
      questions: [
        X('1. Express $u⃗_ρ$ and $u⃗_θ$, the unit vectors of the polar basis, as functions of $θ$ and cartesian unit vectors $u⃗_x$ and $u⃗_y$.'),
        X('2. a. Calculate $@f{du⃗_ρ}{dθ}$, derivative of unit vector $u⃗_ρ$ with respect to $θ$ angle.<br>b. Express $@f{du⃗_ρ}{dθ}$ as a function of $u⃗_θ$'),
        X('3. a. Calculate $@f{du⃗_θ}{dθ}$, derivative of unit vector $u⃗_θ$ with respect to $θ$.<br>b. Express $@f{du⃗_θ}{dθ}$ as a function of $u⃗_ρ$'),
        X('4. $M$ point represents position of a moving particle. Express its position vector $r⃗(t) = OM⃗(t)$ in cartesian basis and in polar basis.'),
        X('5. Give the general expression of velocity vector $v⃗(t)$ and then give its expression in polar basis. Detail your calculations.')],
      hints: [
        X('$u⃗_ρ$ is a vector of norm 1 making the angle θ with $u⃗_x$: project it onto $u⃗_x$ and $u⃗_y$. $u⃗_θ$ makes the angle θ + π/2 with $u⃗_x$.'),
        X('$u⃗_x$ and $u⃗_y$ are fixed: to differentiate with respect to θ, only the cosθ and sinθ are differentiated.'),
        X('For the velocity: $OM⃗ = ρ u⃗_ρ$ is a product of two functions of time. Then $@f{du⃗_ρ}{dt} = @f{du⃗_ρ}{dθ} · @f{dθ}{dt}$.')],
      solution: [
        { t: 'Question 1: polar basis in terms of the Cartesian basis', html: P('$u⃗_ρ$ is a unit vector at angle θ from $u⃗_x$; $u⃗_θ$ is rotated by +π/2, at angle θ + π/2 from $u⃗_x$. Since $cos(θ + π/2) = −sinθ$ and $sin(θ + π/2) = cosθ$:') +
          E('u⃗_ρ = cosθ u⃗_x + sinθ u⃗_y', 'u⃗_θ = −sinθ u⃗_x + cosθ u⃗_y') + P('Check: each vector has norm $@r{cos²θ + sin²θ} = 1$, and $u⃗_ρ·u⃗_θ = −cosθ sinθ + sinθ cosθ = 0$.') },
        { t: 'Question 2: derivative of the first basis vector', html: P('$u⃗_x$ and $u⃗_y$ do not depend on θ:') + E('@f{du⃗_ρ}{dθ} = −sinθ u⃗_x + cosθ u⃗_y = u⃗_θ') + P('This is the expression of $u⃗_θ$ found in question 1.') },
        { t: 'Question 3: derivative of the second basis vector', html: E('@f{du⃗_θ}{dθ} = −cosθ u⃗_x − sinθ u⃗_y = −u⃗_ρ') + P('Differentiating with respect to θ rotates the vector by +π/2: $u⃗_ρ$ becomes $u⃗_θ$, and $u⃗_θ$ becomes $−u⃗_ρ$.') },
        { t: 'Question 4: position vector in both bases', html: E('r⃗(t) = OM⃗(t) = x u⃗_x + y u⃗_y   (x = ρ cosθ, y = ρ sinθ)', 'r⃗(t) = OM⃗(t) = ρ u⃗_ρ') + P('The answer key adds $z u⃗_z$ in Cartesian coordinates; in the plane of the diagram, $z = 0$.') },
        { t: 'Question 5: velocity in polar coordinates, step by step', html: E('v⃗ = @f{dOM⃗}{dt} = @f{d(ρ u⃗_ρ)}{dt}', 'v⃗ = @f{dρ}{dt} u⃗_ρ + ρ @f{du⃗_ρ}{dt}', 'v⃗ = ρ̇ u⃗_ρ + ρ @f{du⃗_ρ}{dθ} @f{dθ}{dt}', 'v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ') +
          '<ol>' + ['Definition of the instantaneous velocity, with $OM⃗ = ρ u⃗_ρ$ (question 4).', 'Product rule: ρ and $u⃗_ρ$ both depend on time.', 'Chain rule: $u⃗_ρ$ depends on time through θ.', 'Question 2: $@f{du⃗_ρ}{dθ} = u⃗_θ$, and $@f{dθ}{dt} = θ̇$.'].map(function (x) { return '<li>' + X(x) + '</li>'; }).join('') + '</ol>' +
          P('$u⃗_ρ$ depends on time through θ: this is why the term $ρ @f{du⃗_ρ}{dt}$ exists. The answer key expects each line to be justified (2 points).') }],
      answer: ul([
        '$u⃗_ρ = cosθ u⃗_x + sinθ u⃗_y$ ; $u⃗_θ = −sinθ u⃗_x + cosθ u⃗_y$',
        '$@f{du⃗_ρ}{dθ} = −sinθ u⃗_x + cosθ u⃗_y = u⃗_θ$ ; $@f{du⃗_θ}{dθ} = −cosθ u⃗_x − sinθ u⃗_y = −u⃗_ρ$',
        '$OM⃗ = x u⃗_x + y u⃗_y = ρ u⃗_ρ$',
        '$v⃗ = @f{dOM⃗}{dt} = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$']),
      traps: [
        X('Putting the minus sign in the wrong place: $u⃗_θ = −sinθ u⃗_x + cosθ u⃗_y$.'),
        X('Writing $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$.'),
        X('Differentiating $ρ u⃗_ρ$ while forgetting the term $ρ @f{du⃗_ρ}{dt}$: you get $v⃗ = ρ̇ u⃗_ρ$, wrong as soon as θ varies.'),
        X('Forgetting the factor $@f{dθ}{dt}$: $@f{du⃗_ρ}{dt} = θ̇ u⃗_θ$, not $u⃗_θ$.')],
      grading: 'Question 1: 0.5 + 0.5; question 2: 1 (a) + 0.5 (b); question 3: 1 + 0.5; question 4: 1 + 1; question 5: 2.'
    },

    'p2021-ex3': {
      src: 'Midterm Nov. 2021 · Ex 3', title: 'Motion of a projectile: trajectory and maximal height',
      intro: P('Consider a projectile launched from the origin point (0;0) of a cartesian frame at instant $t = 0$ s. It is launched by forming an angle $α$ with the X-axis. $S$ point, called the apex, corresponds to the top of the trajectory.') +
        P('$r⃗(t) = OM⃗$, the position vector, is :') + E('OM⃗ = (v_0 cosα).t u⃗_x + [(v_0 sinα).t − 5t²] u⃗_y'),
      figs: [{ svg: F.tir21('Parabolic arc of a projectile launched from the origin with velocity v0 at angle alpha from the horizontal; S marks the apex.'), cap: X('Diagram of the paper, redrawn.') }],
      questions: [
        X('1. a. Give the hourly equations, $x(t)$ and $y(t)$, of this motion.<br>b. Give the trajectory equation of this motion.'),
        X('2. Give the expression of velocity vector $v⃗(t)$. Express its magnitude.'),
        X('3. At the top of trajectory, $V_y$ (the Y-axis component of velocity vector) is equal to zero. Calculate the maximal height reached by the projectile as a function of $V_0$ et $α$ angle.')],
      hints: [
        X('The equations of motion (the “hourly equations” of the paper) are read on $OM⃗$: $x(t)$ in front of $u⃗_x$, $y(t)$ in front of $u⃗_y$.'),
        X('Trajectory: get t from $x(t)$, then substitute it into $y(t)$. No t must be left.'),
        X('Apex: $v_y = v_0 sinα − 10t = 0$ gives the time; substitute it into $y(t)$.')],
      solution: [
        { t: 'Study framework', html: P('System under study: the projectile, modelled as a point M. Reference frame: terrestrial, assumed Galilean. Coordinate system $(O, u⃗_x, u⃗_y)$, $u⃗_y$ upwards; $t = 0$ at the launch. The term $5t²$ is $@f{1}{2}gt²$ with $g = 10$ m·s⁻²: quantities are in S.I. units.') },
        { t: 'Question 1.a: equations of motion', html: E('x(t) = v_0 cosα · t', 'y(t) = v_0 sinα · t − 5t²') + P('The paper calls them “hourly equations”: the usual name is equations of motion.') },
        { t: 'Question 1.b: trajectory equation', html: P('From $x(t)$: $t = @f{x}{v_0 cosα}$. Into $y(t)$:') + E('y = v_0 sinα · @f{x}{v_0 cosα} − 5 @f{x²}{v_0² cos²α}', 'y(x) = −@f{5}{v_0² cos²α} x² + x tanα') + P('A downward parabola.') },
        { t: 'Question 2: velocity vector and magnitude', html: E('v⃗(t) = @f{dOM⃗}{dt} = @f{dx}{dt} u⃗_x + @f{dy}{dt} u⃗_y', 'v⃗(t) = v_0 cosα u⃗_x + (v_0 sinα − 10t) u⃗_y', '‖v⃗‖ = @r{v_x² + v_y²} = @r{v_0² cos²α + (v_0 sinα − 10t)²}') },
        { t: 'Question 3: maximal height', html: E('v_y(t_S) = v_0 sinα − 10 t_S = 0   ⇒   t_S = @f{v_0 sinα}{10}') + P('Substitute into $y(t)$:') +
          E('y_{max} = v_0 sinα · @f{v_0 sinα}{10} − 5 @f{v_0² sin²α}{100}', 'y_{max} = @f{v_0² sin²α}{10} − @f{v_0² sin²α}{20} = @f{v_0² sin²α}{20}') + P('This is the general formula $@f{v_0² sin²α}{2g}$ with $g = 10$ m·s⁻²; it is in metres if $v_0$ is in m·s⁻¹.') }],
      answer: ul([
        '$x(t) = v_0 cosα · t$ ; $y(t) = v_0 sinα · t − 5t²$',
        '$y(x) = −@f{5}{v_0² cos²α} x² + x tanα$',
        '$v⃗ = v_0 cosα u⃗_x + (v_0 sinα − 10t) u⃗_y$ ; $‖v⃗‖ = @r{v_0² cos²α + (v_0 sinα − 10t)²}$',
        '$t_S = @f{v_0 sinα}{10}$ ; $y_{max} = @f{v_0² sin²α}{20}$']),
      traps: [
        'Keeping t in the trajectory equation.',
        X('Differentiating $5t²$ into $5t$: it is $10t$.'),
        X('Substituting the time of the apex into $x(t)$: $x(t_S)$ is the abscissa of the apex, not its height.'),
        X('Forgetting the square: $5 t_S² = @f{v_0² sin²α}{20}$, hence $y_{max} = @f{v_0² sin²α}{10} − @f{v_0² sin²α}{20}$.')],
      grading: 'Question 1.a: 0.5 + 0.5; question 1.b: 0.5 + 0.5; question 2: 1 (vector) + 1 (magnitude); question 3: 0.5 (time) + 1 (height).'
    },

    'p2021-ex4': {
      src: 'Midterm Nov. 2021 · Ex 4', title: 'Acceleration in polar coordinates: circular, then uniform circular',
      intro: P('For any motion, acceleration expression in polar coordinates is') + E('a⃗(t) = (ρ̈ − ρθ̇²) u⃗_ρ + (ρθ̈ + 2ρ̇θ̇) u⃗_θ'),
      questions: [
        '1. What is the acceleration expression if the motion is circular ? Justify your answer.',
        '2. What is the acceleration vector expression if the motion, in addition of being circular, is also uniform. Justify your answer.'],
      hints: [
        X('Circular: the radius ρ does not change. What are $ρ̇$ and $ρ̈$ then?'),
        X('Uniform: the norm of the velocity, $ρ|θ̇|$, is constant. With ρ = R constant, what about $θ̇$, then $θ̈$?'),
        X('The answer key also expects the norm of $a⃗$ in each case.')],
      solution: [
        { t: 'Question 1: circular motion', html: P('Circular, of centre O: the radius is constant, $ρ = R$, so $ρ̇ = 0$ and $ρ̈ = 0$.') +
          E('a⃗ = −Rθ̇² u⃗_ρ + Rθ̈ u⃗_θ', '‖a⃗‖ = @r{(Rθ̇²)² + (Rθ̈)²}') +
          P('The component $−Rθ̇²$ points towards the centre (centripetal); the component $Rθ̈$, tangent to the circle, changes the norm of the velocity $v = R|θ̇|$.') },
        { t: 'Question 2: circular and uniform', html: P('Uniform: $v = R|θ̇|$ is constant, so $θ̇$ is constant ($θ̇ = ω$) and $θ̈ = 0$.') +
          E('a⃗ = −Rθ̇² u⃗_ρ = −Rω² u⃗_ρ', '‖a⃗‖ = Rθ̇² = @f{v²}{R}') +
          P('The acceleration is not zero: it is centripetal, directed from M to O.') }],
      answer: ul(['Circular: $ρ̇ = ρ̈ = 0$, $a⃗ = −Rθ̇² u⃗_ρ + Rθ̈ u⃗_θ$, $‖a⃗‖ = @r{(Rθ̇²)² + (Rθ̈)²}$', 'Uniform circular: $θ̈ = 0$, $a⃗ = −Rθ̇² u⃗_ρ$, $‖a⃗‖ = Rθ̇²$']),
      traps: [
        X('Concluding $a⃗ = 0⃗$ for the uniform circular motion: $−Rθ̇² u⃗_ρ$ remains.'),
        X('Cancelling $θ̇$ instead of $θ̈$: uniform means $θ̇$ constant, not zero.'),
        X('Forgetting the minus sign: $a⃗$ points towards the centre, along $−u⃗_ρ$.'),
        X('Writing $‖a⃗‖ = Rθ̇² + Rθ̈$: the two components are orthogonal, you need the square root of the sum of the squares.')],
      grading: X('Question 1: 0.5 ($ρ̇ = ρ̈ = 0$) + 0.5 (vector) + 1 (norm); question 2: 0.5 ($θ̈ = 0$) + 0.5 (vector) + 1 (norm).')
    },

    /* ===================== 2020-2021 ===================== */
    'p2020-ex1': {
      src: 'Midterm 2020-2021 · Ex 1', title: 'Ellipse: trajectory, velocity and acceleration',
      intro: P('A particle moves in the (X,Y) plane; its equations of motion, in Cartesian coordinates, are:') +
        E('x(t) = @r{2} cos(ωt)', 'y(t) = 2@r{2} sin(ωt)') + P('($ω$ is a positive constant, in rad.s⁻¹).'),
      questions: [
        X('1- a) Show that the trajectory equation of this motion has the form $@f{x²}{a²} + @f{y²}{b²} = 1$, the equation of an elliptical trajectory, where $a$ and $b$ are positive constants.<br>b) Give the values of the constants $a$ and $b$.'),
        X('2- Express the components of the velocity vector $V⃗(t)$. Give its norm.'),
        X('3- a) Express the components of the acceleration vector $a⃗(t)$. Give its norm.<br>b) Express the acceleration vector $a⃗(t)$ as a function of the position vector $OM⃗(t)$.')],
      hints: [
        X('Isolate $cos(ωt)$ in $x(t)$ and $sin(ωt)$ in $y(t)$, then use $cos² + sin² = 1$.'),
        X('Differentiate each component: the derivative of $cos(ωt)$ is $−ω sin(ωt)$, that of $sin(ωt)$ is $ω cos(ωt)$.'),
        X('For the norm, write $sin² = 1 − cos²$ (or the reverse) to get $1 + 3cos²(ωt)$. Then compare $a⃗$ with $x u⃗_x + y u⃗_y$.')],
      solution: [
        { t: 'Question 1: trajectory equation', html: P('Isolate the cosine and the sine, then use $cos² + sin² = 1$:') +
          E('cos(ωt) = @f{x}{@r{2}}   sin(ωt) = @f{y}{2@r{2}}', '@f{x²}{2} + @f{y²}{8} = cos²(ωt) + sin²(ωt) = 1') +
          P('This is the required form with $a² = 2$ and $b² = 8$: <strong>$a = @r{2}$ and $b = 2@r{2}$</strong>. The ellipse is centred at O; its major axis is along $(Oy)$, since $b &gt; a$.') +
          fig(F.ell20('Ellipse of centre O, with semi-axes root 2 along x and 2 root 2 along y; at point M, the velocity is tangent and the acceleration points towards O.'), 'Ellipse with semi-axes √2 (along x) and 2√2 (along y), travelled anti-clockwise. At M, $a⃗$ points towards O (question 3.b).') },
        { t: 'Question 2: velocity', html: E('V⃗ = −@r{2}ω sin(ωt) u⃗_x + 2@r{2}ω cos(ωt) u⃗_y', 'V = @r{2ω² sin²(ωt) + 8ω² cos²(ωt)} = @r{2}ω @r{sin²(ωt) + 4cos²(ωt)}', 'V = @r{2}ω @r{1 + 3cos²(ωt)}') +
          P('We wrote $sin² + 4cos² = (sin² + cos²) + 3cos² = 1 + 3cos²$. The speed is not constant: it is $2@r{2}ω$ when M crosses the $(Ox)$ axis and $@r{2}ω$ on the $(Oy)$ axis.') },
        { t: 'Question 3.a: acceleration', html: E('a⃗ = −@r{2}ω² cos(ωt) u⃗_x − 2@r{2}ω² sin(ωt) u⃗_y', 'a = @r{2}ω² @r{cos²(ωt) + 4sin²(ωt)} = @r{2}ω² @r{1 + 3sin²(ωt)}') },
        { t: 'Question 3.b: acceleration in terms of position', html: E('a⃗ = −ω²(@r{2} cos(ωt) u⃗_x + 2@r{2} sin(ωt) u⃗_y)', 'a⃗ = −ω²(x u⃗_x + y u⃗_y) = −ω² OM⃗') +
          P('The acceleration always points towards the centre O of the ellipse. This relation holds whenever $x$ and $y$ are cosines and sines of the same angular frequency ω, with no added constant.') }],
      answer: ul([
        '$@f{x²}{2} + @f{y²}{8} = 1$: $a = @r{2}$, $b = 2@r{2}$',
        '$V⃗ = −@r{2}ω sin(ωt) u⃗_x + 2@r{2}ω cos(ωt) u⃗_y$ ; $V = @r{2}ω @r{1 + 3cos²(ωt)}$',
        '$a⃗ = −@r{2}ω² cos(ωt) u⃗_x − 2@r{2}ω² sin(ωt) u⃗_y$ ; $a = @r{2}ω² @r{1 + 3sin²(ωt)}$',
        '$a⃗ = −ω² OM⃗$']),
      traps: [
        'Forgetting the factor ω (or ω²) when differentiating.',
        X('Swapping a and b: $a$ is under $x²$, $b$ under $y²$.'),
        X('Splitting the root: $@r{1 + 3cos²}$ is not $1 + @r{3} cos$.'),
        X('Writing $a⃗ = ω² OM⃗$: there is a minus sign, the acceleration points towards O.')],
      grading: 'Question 1.a: 1; 1.b: 0.5; question 2: 0.5 (components) + 1 (norm); question 3.a: 0.5 + 1; 3.b: 0.5.'
    },

    'p2020-ex2': {
      src: 'Midterm 2020-2021 · Ex 2', title: 'A rectilinear trajectory: a segment travelled back and forth',
      intro: P('Consider a motion in the (X,Y) plane, with the equations of motion:') + E('x(t) = sin²(ωt)', 'y(t) = 1 + cos(2ωt)') + P('($ω$ is a positive constant).'),
      questions: [
        X('1- a) Find the trajectory equation. Give its nature. Given: $cos(2ωt) = 1 − 2sin²(ωt)$.<br>b) Draw this trajectory, knowing that $0 ≤ sin²(ωt) ≤ 1$.'),
        '2- Express the components of the velocity vector in Cartesian coordinates. Give its norm.'],
      hints: [
        X('Replace $cos(2ωt)$ by $1 − 2sin²(ωt)$ in $y(t)$, then recognise $x(t)$.'),
        X('The drawing is not a whole straight line: $x = sin²(ωt)$ never leaves [0 ; 1].'),
        X('Derivative of $sin²(ωt)$: $2ω sin(ωt) cos(ωt) = ω sin(2ωt)$. Derivative of $cos(2ωt)$: $−2ω sin(2ωt)$. Check with the trajectory: $v_y$ must equal $−2v_x$.')],
      solution: [
        { t: 'Question 1.a: trajectory equation', html: E('y = 1 + 1 − 2sin²(ωt) = 2 − 2sin²(ωt)', 'y(x) = 2 − 2x') +
          P('This is the equation of a straight line of slope −2. But $x = sin²(ωt)$ stays between 0 and 1: M only travels along a <strong>segment</strong> of this line.') },
        { t: 'Question 1.b: the drawing', html: fig(F.seg20('Line segment between the points 0, 2 and 1, 0; two arrows show that the point travels it in one direction, then in the other.'), 'The segment between (0 ; 2) and (1 ; 0), travelled back and forth.') +
          P('End points: $(0 ; 2)$ when $sin(ωt) = 0$, and $(1 ; 0)$ when $sin²(ωt) = 1$. At $t = 0$, M is at (0 ; 2); it reaches (1 ; 0) at $ωt = π/2$, comes back to (0 ; 2) at $ωt = π$, and so on. The official answer key speaks of “a straight line”: say that it is a segment.') },
        { t: 'Question 2: velocity', html: P('Differentiate with the chain rule:') +
          E('v_x = @f{d}{dt} sin²(ωt) = 2ω sin(ωt) cos(ωt) = ω sin(2ωt)', 'v_y = @f{d}{dt}(1 + cos(2ωt)) = −2ω sin(2ωt)') +
          E('V⃗ = ω sin(2ωt) u⃗_x − 2ω sin(2ωt) u⃗_y', 'V = @r{ω² sin²(2ωt) + 4ω² sin²(2ωt)} = @r{5} ω |sin(2ωt)|') +
          P('Check: on the line $y = 2 − 2x$, we must have $v_y = −2v_x$; this is the case. The velocity vanishes at the ends of the segment ($sin(2ωt) = 0$), where M turns back.') },
        { t: 'The official answer key is wrong in question 2', html: P('It writes $v_y = −2ω sin(ωt) cos(ωt)$: the derivative of $cos(2ωt)$ brings out $2ω$, not $ω$. It therefore finds $V = @r{2} ω |sin(2ωt)|$ instead of $@r{5} ω |sin(2ωt)|$.') }],
      answer: ul([
        '$y(x) = 2 − 2x$ with $0 ≤ x ≤ 1$: the segment from (0 ; 2) to (1 ; 0), travelled back and forth',
        '$V⃗ = ω sin(2ωt) u⃗_x − 2ω sin(2ωt) u⃗_y$',
        '$V = @r{5} ω |sin(2ωt)|$']),
      traps: [
        'Answering “a straight line” without more detail: M stays on a segment, which it travels in both directions.',
        X('Differentiating $cos(2ωt)$ into $−ω sin(2ωt)$: the derivative of the inside is $2ω$ (the mistake of the official answer key).'),
        X('Forgetting the absolute value: a norm is positive, $V = @r{5} ω |sin(2ωt)|$.')],
      grading: 'Question 1.a: 2; 1.b: 1; question 2: 1 (components) + 1 (norm).',
      note: 'Follows the official answer key, except in question 2: the key drops a factor 2 when differentiating y(t) (see the solution).'
    },

    /* ===================== 2019-2020 ===================== */
    'p2019-ex1': {
      src: 'Midterm 2019-2020 · Ex 1', title: 'The cycloid: velocity, acceleration and drawing',
      intro: P('The cycloid is the trajectory of a point of a circle of radius $R$ rolling without slipping on a straight line $(D)$. The cycloid can also be defined as the trajectory of a motion made of a uniform rectilinear motion and a uniform circular motion with the same speed.') +
        P('The equations of motion in Cartesian coordinates are:') + E('x(t) = A(ωt − sin(ωt))', 'y(t) = A(1 − cos(ωt))') + P('where $A$ and $ω$ are positive constants.'),
      questions: [
        '1- Find the Cartesian components of the velocity and acceleration vectors.',
        X('2- Deduce the norm of each of these vectors. Given: $1 − cos(α) = 2 sin²(α/2)$.'),
        X('3- Draw the cycloid $(y = f(x))$ over a time interval of 2 periods $(2T)$, knowing that the angular frequency $ω$ is related to the period $T$ by $ω = 2π/T$<br>(Take the values: $t = 0$ ; $t = T/4$ ; $t = T/2$ ; $t = 3T/4$ ; $t = T$).')],
      hints: [
        X('Differentiate $x(t) = Aωt − A sin(ωt)$ and $y(t) = A − A cos(ωt)$ term by term.'),
        X('In the norm of $V⃗$, expand $(1 − cos)²$ and use $cos² + sin² = 1$: $2(1 − cos(ωt))$ is left. Then apply the given identity with $α = ωt$.'),
        X('For the drawing, $ωt = 2πt/T$ is 0, π/2, π, 3π/2 and 2π at the five given times. The second period is the first one shifted by $2πA$ along x.')],
      solution: [
        { t: 'Question 1: velocity and acceleration', html: E('V⃗ = @f{dOM⃗}{dt} = ẋ u⃗_x + ẏ u⃗_y', 'V⃗ = Aω(1 − cos(ωt)) u⃗_x + Aω sin(ωt) u⃗_y', 'a⃗ = @f{dV⃗}{dt} = Aω² sin(ωt) u⃗_x + Aω² cos(ωt) u⃗_y') },
        { t: 'Question 2: norms', html: E('V = Aω @r{(1 − cos(ωt))² + sin²(ωt)}', 'V = Aω @r{2(1 − cos(ωt))}') + P('since $(1 − cos)² + sin² = 1 − 2cos + (cos² + sin²) = 2 − 2cos$.') +
          P('With the given identity and $α = ωt$: $2(1 − cos(ωt)) = 4 sin²(ωt/2)$, so') + E('V = 2Aω |sin(ωt/2)|', 'a = @r{A²ω⁴(sin²(ωt) + cos²(ωt))} = Aω²') +
          P('The absolute value is essential: a norm is positive, and $sin(ωt/2)$ changes sign after one period. The norm of the acceleration is constant, that of the velocity is not.') },
        { t: 'Question 3: table of values', html: P('With $ω = 2π/T$, the five times give $ωt = 0$, π/2, π, 3π/2 and 2π. Without a calculator, π ≈ 3.14 is enough.') +
          '<div class="tbl"><table><thead><tr><th>t</th><th>0</th><th>T/4</th><th>T/2</th><th>3T/4</th><th>T</th></tr></thead><tbody>' +
          '<tr><th>x / A</th><td>0</td><td>π/2 − 1 ≈ 0.57</td><td>π ≈ 3.14</td><td>3π/2 + 1 ≈ 5.71</td><td>2π ≈ 6.28</td></tr>' +
          '<tr><th>y / A</th><td>0</td><td>1</td><td>2</td><td>1</td><td>0</td></tr></tbody></table></div>' +
          P('Over the second period, $x(t + T) = x(t) + 2πA$ and $y(t + T) = y(t)$: copy the first arch, shifted by $2πA$.') },
        { t: 'Question 3: the drawing', html: fig(F.cyclo19('Cycloid over two periods: two arches of height 2A standing on the x-axis, with a cusp at x = 0, 2 pi A and 4 pi A; the points of the table are marked.'), 'Two arches of height 2A; the points of the table are in orange. At times 0, T and 2T, the velocity is zero and the curve has a cusp.') +
          P('The cusps are at $x = 0$, $2πA$ and $4πA$, on the $(Ox)$ axis: this is where $V = 2Aω|sin(ωt/2)|$ vanishes, because the point of the circle touching the ground is at rest. The top of each arch is at height $2A$, the diameter of the rolling circle (here its radius is A).') +
          site('Going a step further: $a⃗ = −ω² CM⃗$, where $C = (Aωt ; A)$ is the centre of the rolling circle. The acceleration always points from M to C, with the constant norm $Aω²$.') }],
      answer: ul([
        '$V⃗ = Aω(1 − cos(ωt)) u⃗_x + Aω sin(ωt) u⃗_y$ ; $a⃗ = Aω² sin(ωt) u⃗_x + Aω² cos(ωt) u⃗_y$',
        '$V = 2Aω |sin(ωt/2)|$ ; $a = Aω²$',
        'Two arches of height $2A$ between $x = 0$, $2πA$ and $4πA$, with a cusp each time the curve comes back to the axis']),
      traps: [
        X('Forgetting the absolute value: $@r{sin²} = |sin|$.'),
        X('Simplifying $@r{4 sin²(ωt/2)}$ into $2 sin²(ωt/2)$: the root also applies to the square.'),
        'Drawing arches that are rounded at the bottom: at times 0, T and 2T, the velocity is zero and the curve has a cusp.',
        'Drawing only one period: the paper asks for two (2T).'],
      grading: 'Question 1: 1 (velocity) + 1 (acceleration); question 2: 1.5 (norm of the velocity) + 0.5 (norm of the acceleration); question 3: 2.'
    },

    /* ===================== 2018-2019 ===================== */
    'p2018-ex3': {
      src: 'Midterm 2018-2019 · Ex 3', title: 'Uniform circular motion in Cartesian coordinates',
      intro: P('The Cartesian coordinates of a moving point M in the (xOy) plane are:') + E('x(t) = 2 cos(0.5t)@t{ and }y(t) = 2 sin(0.5t)') +
        site('Questions 3 and 4 (normal and tangential components of the acceleration in a Frenet frame, curvature radius) are not on this year’s syllabus: they are left out.'),
      questions: [
        '1- Find the equation and the nature of the trajectory.',
        '2- Find the components of the velocity and acceleration vectors and their norms.'],
      hints: [
        X('Square $x$ and $y$, then add them: $cos² + sin² = 1$.'),
        X('The derivative of $cos(0.5t)$ is $−0.5 sin(0.5t)$: do not forget the factor 0.5.'),
        X('Compare $a⃗$ with $OM⃗$: you should find a negative multiple.')],
      solution: [
        { t: 'Question 1: trajectory', html: E('x² + y² = 4cos²(0.5t) + 4sin²(0.5t) = 4') +
          P('This is the <strong>circle of centre O and radius 2</strong> (in metres, if quantities are in S.I. units; the paper does not say).') },
        { t: 'Question 2: velocity', html: E('V⃗ = −2 × 0.5 sin(0.5t) u⃗_x + 2 × 0.5 cos(0.5t) u⃗_y', 'V⃗ = −sin(0.5t) u⃗_x + cos(0.5t) u⃗_y', 'V = @r{sin²(0.5t) + cos²(0.5t)} = 1 @t{m·s⁻¹}') +
          P('The norm of the velocity is constant: the motion is uniform and circular.') },
        { t: 'Question 2: acceleration', html: E('a⃗ = −0.5 cos(0.5t) u⃗_x − 0.5 sin(0.5t) u⃗_y = −0.25 OM⃗', 'a = 0.5 @t{m·s⁻²}') +
          P('Check with the course: radius $R = 2$ m, angular velocity $ω = 0.5$ rad·s⁻¹, so $V = Rω = 1$ m·s⁻¹ and $a = Rω² = @f{V²}{R} = 0.5$ m·s⁻², directed towards O.') },
        { t: 'Check in polar coordinates', html: P('With $ρ = 2$ and $θ = 0.5t$: $OM⃗ = 2 u⃗_ρ$, $V⃗ = ρθ̇ u⃗_θ = u⃗_θ$ and $a⃗ = −ρθ̇² u⃗_ρ = −0.5 u⃗_ρ$. The norms are the same.') }],
      answer: ul([
        '$x² + y² = 4$: circle of centre O, radius 2',
        '$V⃗ = −sin(0.5t) u⃗_x + cos(0.5t) u⃗_y$ ; $V = 1$ m·s⁻¹, constant',
        '$a⃗ = −0.5 cos(0.5t) u⃗_x − 0.5 sin(0.5t) u⃗_y = −0.25 OM⃗$ ; $a = 0.5$ m·s⁻²']),
      traps: [
        X('Forgetting the factor 0.5 when differentiating $cos(0.5t)$ and $sin(0.5t)$.'),
        X('Concluding $a⃗ = 0⃗$ because the velocity has a constant norm: its direction changes.'),
        X('Writing $x² + y² = 2$: the radius is 2, its square is 4.')],
      grading: 'Exercise marked out of 4 points, questions 3 and 4 included; the breakdown is not printed.',
      note: NOTE_WRITTEN
    },

    /* ===================== May 2018 (S1# group) ===================== */
    'p2018s-ex1': {
      src: 'Midterm May 2018 (S1#) · Ex 1', title: 'Ellipse: trajectory, velocity, acceleration',
      intro: P('The equations of motion of a material point in the (xoy) plane are:') + E('x(t) = 2a.cos(ω.t)', 'y(t) = a sin(ω.t)') + P('($a$ and $ω$ are positive constants).') +
        site('Midterm 1 of 2018-2019 (exercise 1, 4 points) uses the same motion, with one more question: the relation between $a⃗$ and $OM⃗$, dealt with at the end of the solution.'),
      questions: [
        X('1- a) Show that the trajectory of this material point is elliptical. Recall the equation of an ellipse of centre O with semi-axes $A$ and $B$: $@f{x²}{A²} + @f{y²}{B²} = 1$ ($A$ and $B$ are positive constants).<br>b) Identify the constants $A$ and $B$ in terms of $a$.'),
        '2- Express the velocity vector, and deduce its norm.',
        '3- Same question for the acceleration vector.'],
      hints: [
        X('Divide: $@f{x}{2a} = cos(ωt)$ and $@f{y}{a} = sin(ωt)$. Square and add.'),
        X('Differentiate each component; in the norm, replace $4sin²$ by $3sin² + sin²$ to bring out $sin² + cos² = 1$.'),
        X('Watch the notation: $a$ is a length given by the paper, the norm of the acceleration is written $‖a⃗‖$.')],
      solution: [
        { t: 'Question 1: trajectory', html: E('@f{x}{2a} = cos(ωt)   @f{y}{a} = sin(ωt)', '@f{x²}{4a²} + @f{y²}{a²} = cos²(ωt) + sin²(ωt) = 1') +
          P('This holds for all t: the trajectory is the ellipse of centre O with <strong>$A = 2a$</strong> (semi-major axis, along $(Ox)$) and <strong>$B = a$</strong> (semi-minor axis, along $(Oy)$).') +
          fig(F.ell18('Ellipse of centre O, with semi-axes 2a along x and a along y; at point M, the velocity is tangent and the acceleration points towards O.'), 'Ellipse with semi-axes 2a and a, travelled anti-clockwise. At M, $a⃗$ points towards O.') },
        { t: 'Question 2: velocity', html: E('V⃗ = −2aω sin(ωt) u⃗_x + aω cos(ωt) u⃗_y', 'V = aω @r{4sin²(ωt) + cos²(ωt)} = aω @r{3sin²(ωt) + 1}') +
          P('We wrote $4sin² + cos² = 3sin² + (sin² + cos²) = 3sin² + 1$.') },
        { t: 'Question 3: acceleration', html: E('a⃗ = −2aω² cos(ωt) u⃗_x − aω² sin(ωt) u⃗_y', '‖a⃗‖ = aω² @r{4cos²(ωt) + sin²(ωt)} = aω² @r{3cos²(ωt) + 1}') },
        { t: 'Acceleration and position (2018-2019, question 3.b)', html: E('a⃗ = −ω²(2a cos(ωt) u⃗_x + a sin(ωt) u⃗_y) = −ω² OM⃗') +
          P('The acceleration points from M to the centre O of the ellipse; its norm is $ω² OM$.') }],
      answer: ul([
        '$@f{x²}{4a²} + @f{y²}{a²} = 1$: ellipse of centre O, $A = 2a$, $B = a$',
        '$V⃗ = −2aω sin(ωt) u⃗_x + aω cos(ωt) u⃗_y$ ; $V = aω @r{3sin²(ωt) + 1}$',
        '$a⃗ = −2aω² cos(ωt) u⃗_x − aω² sin(ωt) u⃗_y$ ; $‖a⃗‖ = aω² @r{3cos²(ωt) + 1}$',
        '$a⃗ = −ω² OM⃗$ (question 3.b of 2018-2019)']),
      traps: [
        X('Swapping the semi-axes: $A = 2a$ is under $x²$.'),
        X('Swapping sin and cos in the norms: $V$ contains $3sin²(ωt)$, $‖a⃗‖$ contains $3cos²(ωt)$.'),
        X('Confusing the constant $a$ with the norm $‖a⃗‖$ of the acceleration.')],
      grading: '6 points for the exercise, no breakdown per question. In 2018-2019, the same exercise was worth 4 points.'
    },

    'p2018s-ex2': {
      src: 'Midterm May 2018 (S1#) · Ex 2 · Part A', title: 'Helix: velocity and acceleration in Cartesian coordinates',
      intro: '<p><b>Part A</b> Cartesian coordinates</p>' + P('A material point M is located by its Cartesian coordinates $(x, y, z)$ such that:') +
        E('x(t) = R.cos(ω.t)', 'y(t) = R.sin(ω.t)', 'z(t) = H.ω.t') + P('where $R$, $ω$ and $H$ are positive constants.') +
        site('Part B (the same motion in cylindrical coordinates) is not on this year’s syllabus: it is left out. Questions 1 and 2 of exercise 2 of midterm 1, 2019-2020 (“helical motion”, 1.5 points each) are the same.'),
      questions: [
        X('1- Express the velocity vector of point M in the Cartesian basis $(u⃗_x, u⃗_y, u⃗_z)$. Calculate its norm.'),
        X('2- Express the acceleration vector of point M in the Cartesian basis $(u⃗_x, u⃗_y, u⃗_z)$. Calculate its norm.'),
        '3- a) What is the motion of point M in the (xOy) plane? Justify your answer by giving the trajectory equation in the (xoy) plane.<br>b) What is the motion of point M along the Oz axis? Justify your answer.'],
      hints: [
        X('Three components to differentiate; $z(t) = Hωt$ gives $v_z = Hω$.'),
        X('In the norm, group $R²ω²(sin² + cos²)$.'),
        X('For question 3, look at $(x, y)$ and at $z$ separately: $x² + y²$ on one side, $v_z$ on the other.')],
      solution: [
        { t: 'Question 1: velocity', html: E('V⃗ = −Rω sin(ωt) u⃗_x + Rω cos(ωt) u⃗_y + Hω u⃗_z', 'V = ω@r{R² sin²(ωt) + R² cos²(ωt) + H²}', 'V = ω@r{R² + H²}') +
          P('The norm of the velocity is constant: the motion is uniform.') },
        { t: 'Question 2: acceleration', html: E('a⃗ = −Rω² cos(ωt) u⃗_x − Rω² sin(ωt) u⃗_y + 0 u⃗_z', 'a = @r{R²ω⁴(cos²(ωt) + sin²(ωt))} = Rω²') +
          P('$a_z = 0$ because $v_z = Hω$ is constant. The official answer key writes $a_y = −Rω² sin²(ωt)$ by a slip of the pen; it is $−Rω² sin(ωt)$.') +
          P('$a⃗ = −ω²(x u⃗_x + y u⃗_y)$: the acceleration is horizontal and points towards the $(Oz)$ axis.') },
        { t: 'Question 3.a: in the (xOy) plane', html: E('x² + y² = R²(cos²(ωt) + sin²(ωt)) = R²') +
          P('In the $(xOy)$ plane, the point (x, y) travels along the circle of centre O and radius R at the constant speed $Rω$: <strong>uniform circular</strong> motion.') },
        { t: 'Question 3.b: along (Oz)', html: P('$z = Hωt$ and $v_z = Hω$ is constant: <strong>uniform rectilinear</strong> motion along $(Oz)$.') +
          P('Together they make a helix: at each turn, lasting $2π/ω$, M rises by $2πH$.') }],
      answer: ul([
        '$V⃗ = −Rω sin(ωt) u⃗_x + Rω cos(ωt) u⃗_y + Hω u⃗_z$ ; $V = ω@r{R² + H²}$',
        '$a⃗ = −Rω² cos(ωt) u⃗_x − Rω² sin(ωt) u⃗_y$ ; $a = Rω²$',
        'In $(xOy)$: $x² + y² = R²$, uniform circular motion; along $(Oz)$: uniform rectilinear']),
      traps: [
        X('Forgetting the component $Hω u⃗_z$, the derivative of $z(t) = Hωt$.'),
        X('Writing $V = Rω + Hω$: the components add up as squares under the root.'),
        'Saying that M has a circular motion: its trajectory is a helix; only its projection on the (xOy) plane is a circle.'],
      grading: 'Exercise marked out of 9 points with part B, no breakdown. In 2019-2020: 1.5 points for question 1 and 1.5 for question 2.'
    },

    /* ===================== November 2017 (English paper: statements word for word) ===================== */
    'p2017-ex1': {
      src: 'Midterm Nov. 2017 · Ex 1', title: 'Circular motion around C(1 ; 2)',
      intro: P('The time-dependent equations of a motion are given in Cartesian coordinates:') + E('x(t) = 1 + R sin(ω.t)', 'y(t) = 2 + R cos(ω.t)') + P('where $ω$ and $R$ are constants.'),
      questions: [
        X('1-Express the components of the velocity vector $V⃗$ as a function of time. Write its norm.'),
        X('2- Express the components of the acceleration vector $a⃗$ as a function of time. Write its norm.'),
        X('3- Find the trajectory equation $y = f(x)$. Describe its shape and its features.')],
      hints: [
        'The constants 1 and 2 disappear when differentiating.',
        X('Isolate $sin(ωt) = @f{x − 1}{R}$ and $cos(ωt) = @f{y − 2}{R}$, then use $sin² + cos² = 1$.'),
        X('Compare $a⃗$ with the vector $CM⃗$, where C(1 ; 2), rather than with $OM⃗$.')],
      solution: [
        { t: 'Question 1: velocity', html: E('V⃗ = Rω cos(ωt) u⃗_x − Rω sin(ωt) u⃗_y', 'V = @r{R²ω²(cos²(ωt) + sin²(ωt))} = |Rω|') +
          P('The paper does not say that R and ω are positive: the norm is $|Rω|$ ($Rω$ if they are positive). It is constant: the motion is uniform.') },
        { t: 'Question 2: acceleration', html: E('a⃗ = −Rω² sin(ωt) u⃗_x − Rω² cos(ωt) u⃗_y', 'a = |R|ω²') +
          P('With $C = (1 ; 2)$: $CM⃗ = R sin(ωt) u⃗_x + R cos(ωt) u⃗_y$, so $a⃗ = −ω² CM⃗$. The acceleration points towards C, the centre of the circle, not towards O.') },
        { t: 'Question 3: trajectory', html: E('sin(ωt) = @f{x − 1}{R}   cos(ωt) = @f{y − 2}{R}', '(x − 1)² + (y − 2)² = R²') +
          P('This is the <strong>circle of centre C(1 ; 2) and radius |R|</strong>. A circle is not the graph of a single function: “$y = f(x)$” gives two half-circles, $y = 2 ± @r{R² − (x − 1)²}$.') +
          P('With R and ω positive, M starts from $(1 ; 2 + R)$, at the top of the circle, with $V⃗ = Rω u⃗_x$: it turns clockwise. The motion is uniform and circular.') +
          fig(F.circ17('Circle of centre C with coordinates 1 and 2; at point M, the velocity is tangent to the circle, clockwise, and the acceleration points towards C.'), 'Circle of centre C(1 ; 2). At M, $V⃗$ is tangent (clockwise) and $a⃗$ points towards C.') }],
      answer: ul([
        '$V⃗ = Rω cos(ωt) u⃗_x − Rω sin(ωt) u⃗_y$ ; $V = |Rω|$',
        '$a⃗ = −Rω² sin(ωt) u⃗_x − Rω² cos(ωt) u⃗_y = −ω² CM⃗$ ; $a = |R|ω²$',
        '$(x − 1)² + (y − 2)² = R²$: circle of centre C(1 ; 2), radius |R|; uniform circular motion']),
      traps: [
        X('Writing $a⃗ = −ω² OM⃗$: the centre of the circle is C(1 ; 2), not O.'),
        'Giving “a circle of radius R” without its centre: the shape and its features are asked for.',
        X('Getting a sign wrong: the derivative of $cos(ωt)$ is $−ω sin(ωt)$.')],
      grading: '4 points, no breakdown per question.',
      note: NOTE_WRITTEN
    },

    'p2017-ex2': {
      src: 'Midterm Nov. 2017 · Ex 2', title: 'Spiral: position, velocity and acceleration in polar coordinates',
      intro: P('The components of the vector position $OM⃗$ are written in Cartesian coordinates as:') + E('x(t) = ae^{ω.t} cos(ω.t)', 'y(t) = ae^{ω.t} sin(ω.t)') + P('where $a$ and $ω$ are positive constants.') +
        site('Question 4 (components of the acceleration in Frenet’s basis, curvature radius) is not on this year’s syllabus: it is left out.'),
      questions: [
        X('1- Write the position vector $OM⃗$ in polar coordinates in the basis $(u⃗_ρ, u⃗_θ)$.'),
        X('2- Express in polar coordinates the velocity vector $V⃗$. Write its norm. Assume that $θ̇ = ω$.'),
        X('3- Express in polar coordinates the acceleration vector $a⃗$. Write its norm.')],
      hints: [
        X('Recognise $x = ρ cosθ$ and $y = ρ sinθ$: what are ρ and θ?'),
        X('$ρ = a e^{ωt}$: its derivative is $aω e^{ωt}$. Substitute into $v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$.'),
        X('Compute $ρ̈ − ρθ̇²$ and $2ρ̇θ̇ + ρθ̈$ separately: one of the two components vanishes.')],
      solution: [
        { t: 'Question 1: position vector', html: P('We recognise $x = ρ cosθ$ and $y = ρ sinθ$ with') + E('ρ = @r{x² + y²} = a e^{ωt}   θ = ωt', 'OM⃗ = a e^{ωt} u⃗_ρ') +
          P('ρ is indeed positive ($a &gt; 0$). The trajectory is a spiral: the distance to O grows while M turns.') },
        { t: 'Question 2: velocity', html: E('ρ̇ = aω e^{ωt}   θ̇ = ω', 'V⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ = aω e^{ωt} (u⃗_ρ + u⃗_θ)', 'V = @r{2} aω e^{ωt}') +
          P('The two components are equal: $V⃗$ always makes an angle of 45° with $u⃗_ρ$.') +
          fig(F.spir17('Arc of a spiral around O; at point M, the vectors u rho and u theta of the polar basis, and the velocity vector, at 45 degrees from u rho.'), 'Part of the spiral; at M, the polar basis and $V⃗$, at 45° from $u⃗_ρ$.') },
        { t: 'Question 3: acceleration', html: E('ρ̈ = aω² e^{ωt}   θ̈ = 0', 'ρ̈ − ρθ̇² = aω² e^{ωt} − aω² e^{ωt} = 0', '2ρ̇θ̇ + ρθ̈ = 2aω² e^{ωt}', 'a⃗ = 2aω² e^{ωt} u⃗_θ   ‖a⃗‖ = 2aω² e^{ωt}') +
          P('The radial component is zero: the acceleration is perpendicular to $OM⃗$.') +
          P('Check in Cartesian coordinates: differentiating $x(t)$ and $y(t)$ twice gives $ẍ = −2aω² e^{ωt} sin(ωt)$ and $ÿ = 2aω² e^{ωt} cos(ωt)$, hence the same norm.') }],
      answer: ul([
        '$OM⃗ = a e^{ωt} u⃗_ρ$',
        '$V⃗ = aω e^{ωt} (u⃗_ρ + u⃗_θ)$ ; $V = @r{2} aω e^{ωt}$',
        '$a⃗ = 2aω² e^{ωt} u⃗_θ$ ; $‖a⃗‖ = 2aω² e^{ωt}$']),
      traps: [
        X('Writing $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$: there is no component along $u⃗_θ$.'),
        X('Forgetting the term $−ρθ̇²$: you would wrongly find a radial component $aω² e^{ωt}$.'),
        X('Confusing the constant $a$ with the norm $‖a⃗‖$ of the acceleration.')],
      grading: 'Exercise marked out of 6 points, question 4 included; the breakdown is not printed.',
      note: NOTE_WRITTEN
    }
  });
})();
