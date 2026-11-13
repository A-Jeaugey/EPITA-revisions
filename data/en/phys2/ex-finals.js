/* English text for data/phys2/ex-finals.js (end-of-semester exam cards, merged over the French file by id, field by field).
   Official English papers exist only for January 2016 and January 2017 (scans, not usable as text): the statements are
   translated faithfully with the vocabulary of the official English course (Newton’s second law, reaction of the
   support, work-kinetic energy theorem, mechanical energy, friction force, the Frenet basis, curvilinear abscissa,
   centripetal…). Decimal points, as in the English course.
   The figures come from window.PHYS2_FIGS (French file), with English text for screen readers.
   Same notation helpers as the French file (M, X, E, P, ul…): see its header. */
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

  var F = window.PHYS2_FIGS;
  var NOTE_OK = 'Answers recomputed; they match the official answer key.', NOTE_REDIGE = 'No official answer key: worked solution written and checked by calculation.';
  var POL = 'On a circle, the Frenet basis is the polar basis: $u⃗_T = u⃗_θ$, $u⃗_N = −u⃗_ρ$, $a_T = Rθ̈$, $a_N = Rθ̇² = V²/R$ (chapter 2, part 6).';
  function site(s) { return '<p class="muted">' + X(s) + '</p>'; }

  R.i18n.patch(window.PHYS2_EX, {
    'f2022d-ex2': {
      src: 'End-of-semester exam Dec. 2022 · Ex 2', title: 'Elliptical motion: initial conditions, velocity, acceleration',
      intro: P('A material point M moves on an ellipse whose equation in Cartesian coordinates is: $@f{x²}{a²} + @f{y²}{b²} = 1$ (see figure). The direction of $OM⃗$ relative to the O$x$ axis is given by the angle φ.') +
        P('The equations of motion of M can be written in the form:') + E('x(t) = x_0 cos(ωt + φ_0)', 'y(t) = y_0 sin(ωt + φ_0)') +
        P('where ω is a constant, and $x_0$, $y_0$, $φ_0$ are constants to be determined. Initial conditions: at time $t$ = 0, the point M is at M₀.'),
      figs: [{ svg: F.ell22('Ellipse centred at O, with semi-axes a along the x-axis and b along the y-axis; M0 at (a; 0); a point M located by the angle phi.'), cap: 'The ellipse; M₀ = ($a$; 0).' }],
      questions: [X('1. Determine $x_0$ and $φ_0$ from the initial conditions.'), X('2. Using the trajectory equation, deduce that $y = b sin(ωt)$.'),
        X('3. Determine the components of the velocity vector. Calculate its norm.'), X('4. Determine the components of the acceleration vector. Calculate its norm.'),
        X('5. Show that you can write $a⃗ = k OM⃗$ and determine the value of $k$.')],
      hints: [X('At $t$ = 0: $x(0) = x_0 cos φ_0 = a$ and $y(0) = y_0 sin φ_0 = 0$.'), X('Replace $x = a cos(ωt)$ in the equation of the ellipse: what remains is $y² = b² sin²(ωt)$.'), X('Differentiate twice: each coordinate comes back multiplied by $−ω²$.')],
      solution: [
        { t: 'Question 1: initial conditions', html: P('$y(0) = y_0 sin φ_0 = 0$ with $y_0 ≠ 0$: $φ_0 = 0$. Then $x(0) = x_0 = a$.') + E('x_0 = a   φ_0 = 0') },
        { t: 'Question 2: y(t)', html: P('With $x = a cos(ωt)$ in the trajectory equation:') + E('cos²(ωt) + @f{y²}{b²} = 1  ⇒  y² = b² sin²(ωt)') +
          P('With $y = y_0 sin(ωt)$, we identify $y_0 = b$ (taking $y_0 &gt; 0$, anti-clockwise direction): $y = b sin(ωt)$.') },
        { t: 'Question 3: velocity', html: E('v⃗ = −aω sin(ωt) u⃗_x + bω cos(ωt) u⃗_y', 'v = ω @r{a² sin²(ωt) + b² cos²(ωt)}') + P('The norm varies: the motion is not uniform (unless $a = b$, a circle).') },
        { t: 'Question 4: acceleration', html: E('a⃗ = −aω² cos(ωt) u⃗_x − bω² sin(ωt) u⃗_y', '‖a⃗‖ = ω² @r{a² cos²(ωt) + b² sin²(ωt)}') },
        { t: 'Question 5: a⃗ = k OM⃗', html: P('$OM⃗ = a cos(ωt) u⃗_x + b sin(ωt) u⃗_y$: each component of $a⃗$ is that of $OM⃗$ multiplied by $−ω²$.') + E('a⃗ = −ω² OM⃗   k = −ω²') +
          P('The acceleration points towards O, as for a circle: it is the same result as the ellipse of the 2018-2019 midterm.') }],
      answer: ul(['$x_0 = a$, $φ_0 = 0$; $y = b sin(ωt)$', '$v⃗ = (−aω sin(ωt) ; bω cos(ωt))$, $v = ω@r{a² sin²(ωt) + b² cos²(ωt)}$', '$a⃗ = (−aω² cos(ωt) ; −bω² sin(ωt))$', '$a⃗ = −ω² OM⃗$, $k = −ω²$']),
      traps: [X('Writing $‖v⃗‖ = ω(a + b)$: you do not add the components, you take the square root of the sum of the squares.'), X('Forgetting the sign of $k$: the acceleration points towards O, $k &lt; 0$.')],
      grading: 'Printed marking scheme: 5.5 points for the exercise.', note: 'Only a graded student copy is published: worked solution written and checked by calculation.'
    },

    'f2022-ex2': {
      src: 'End-of-semester exam Jan. 2022 · Ex 2', title: 'A circle travelled with αt²: velocity, curvilinear abscissa, acceleration',
      intro: P('Consider a material point M whose kinematics is described by the following equations of motion in Cartesian coordinates:') + E('x(t) = R cos(αt²)', 'y(t) = R sin(αt²)') + P('where $R$ and α are strictly positive constants.') +
        site('Questions 5 to 9 are asked in the Frenet basis: on a circle, it reads as the polar basis (chapter 2, part 6).'),
      questions: [X('1) Show that the point M has a circular trajectory with centre O and radius $R$.'), X('2) In Cartesian coordinates, write the position vector, then determine the velocity vector as a function of α, $R$ and $t$.'),
        X('3) Deduce that the norm of the velocity vector is $v(t) = 2αRt$. Is the motion uniform?'), X('4) Using a dimensional analysis, give the unit of α.'),
        X('5) The point M is initially at point A (at $t$ = 0): draw the Frenet basis at point A. Indicate the direction of the motion on the circle.'), X('6) From the previous questions, deduce the velocity vector in the Frenet basis.'),
        X('7) Determine the curvilinear abscissa $s(t)$ as a function of α, $R$ and $t$.'), X('8) Determine the time $t_1$ needed for the point M to complete one full turn, as a function of α.'),
        X('9) a. Give the normal and tangential components of the acceleration vector in the Frenet basis. b. Deduce the norm of the acceleration of the point M as a function of α, $R$ and $t$.')],
      hints: [X('Calculate $x² + y²$.'), X('Set θ = α$t²$: in polar coordinates M is at $ρ = R$, θ = α$t²$, so $v⃗ = Rθ̇ u⃗_θ$.'), X('$s$ is the distance travelled: $s = Rθ$. One turn: θ = 2π.')],
      solution: [
        { t: 'Questions 1 to 3: trajectory and velocity', html: E('x² + y² = R²(cos² + sin²) = R²') + P('Trajectory: a circle with centre O and radius $R$.') +
          E('OM⃗ = R cos(αt²) u⃗_x + R sin(αt²) u⃗_y', 'v⃗ = −2αRt sin(αt²) u⃗_x + 2αRt cos(αt²) u⃗_y', 'v = 2αRt @r{sin² + cos²} = 2αRt') +
          P('$v$ increases with $t$: the motion is <b>not uniform</b>, it is accelerated.') },
        { t: 'Question 4: unit of α', html: P('α$t²$ is an angle (dimensionless): α is expressed in s⁻² (rad·s⁻²). Check: $v = 2αRt$ is indeed in m·s⁻¹.') },
        { t: 'Questions 5 and 6: the Frenet basis and the velocity', html: P('At $t$ = 0, M is at A = ($R$; 0). θ = α$t²$ increases: M turns anti-clockwise. At A, $u⃗_T$ is tangent in the direction of motion ($u⃗_T = u⃗_y$) and $u⃗_N$ points towards the centre ($u⃗_N = −u⃗_x$).') +
          E('v⃗ = v u⃗_T = 2αRt u⃗_T') + P('This is $Rθ̇ u⃗_θ$ in polar coordinates, with θ̇ = 2α$t$.') },
        { t: 'Questions 7 and 8: curvilinear abscissa, full turn', html: E('s(t) = ∫_0^t 2αRt′ dt′ = αRt²   (= Rθ)', 'αt_1² = 2π  ⇒  t_1 = @r{@f{2π}{α}}') },
        { t: 'Question 9: acceleration', html: E('a_T = @f{dv}{dt} = 2αR   a_N = @f{v²}{R} = 4α²Rt²', '‖a⃗‖ = @r{a_T² + a_N²} = 2αR @r{1 + 4α²t⁴}') +
          P(POL + ' Check in Cartesian coordinates: differentiating $x$ and $y$ twice gives the same norm.') }],
      answer: ul(['Circle with centre O and radius $R$; $v = 2αRt$, accelerated (non-uniform) motion', 'α in s⁻²', '$v⃗ = 2αRt u⃗_T$; $s = αRt²$; $t_1 = @r{2π/α}$', '$a_T = 2αR$, $a_N = 4α²Rt²$, $‖a⃗‖ = 2αR@r{1 + 4α²t⁴}$']),
      traps: [X('Forgetting the derivative of α$t²$ (2α$t$) in front of the sine and the cosine.'), X('Taking $a_N = 0$ because $a_T$ is constant: as soon as M turns, $a_N = v²/R &gt; 0$.'), X('Writing $t_1 = 2π/α$: it is $t_1²$ that equals 2π/α.')],
      grading: 'Printed marking scheme: 11 points for the exercise.', note: NOTE_REDIGE
    },

    'f2022-ex3': {
      src: 'End-of-semester exam Jan. 2022 · Ex 3', title: 'From Cartesian to polar coordinates: ρ(t), θ(t), velocity',
      intro: P('A material point M follows, relative to a Cartesian frame $(u⃗_x, u⃗_y)$, a trajectory defined by the following equations of motion:') + E('x(t) = b sin(ωt)', 'y(t) = b[1 − cos(ωt)]') + P('with $b$ a strictly positive constant.'),
      questions: [X('1. a) Give the expression of the radial polar coordinate ρ($t$) of the motion of M. b) Knowing that $1 − cos(ωt) = 2 sin²(ωt/2)$, find the simplified expression of ρ($t$).'),
        X('2. a) Give the expression of the angular polar coordinate θ($t$). b) Knowing that $(1 − cos ωt)/sin ωt = tan(ωt/2)$, find the simplified expression of θ($t$).'),
        X('3. a) Give the expression of the position vector $OM⃗(t)$ in polar coordinates. b) Deduce the expression in polar coordinates of the velocity vector $v⃗(t)$ of the point M.')],
      hints: [X('ρ = $@r{x² + y²}$; expand, then use the given formula.'), X('tan θ = $y/x$: the given formula simplifies it directly.'), X('$v⃗ = ρ̇ u⃗_ρ + ρθ̇ u⃗_θ$.')],
      solution: [
        { t: 'Question 1: ρ(t)', html: E('ρ² = b² sin²(ωt) + b²(1 − cos ωt)² = b²(2 − 2cos ωt) = 2b²(1 − cos ωt)', 'ρ² = 4b² sin²(ωt/2)   ρ = 2b sin(ωt/2)') +
          P('For $0 &lt; ωt &lt; 2π$, sin($ωt$/2) &gt; 0: ρ is indeed positive. Otherwise, write ρ = 2$b$|sin($ωt$/2)|.') },
        { t: 'Question 2: θ(t)', html: E('tan θ = @f{y}{x} = @f{1 − cos ωt}{sin ωt} = tan(ωt/2)   θ = @f{ωt}{2}') +
          P('Check: ρ cos θ = 2$b$ sin($ωt$/2) cos($ωt$/2) = $b$ sin($ωt$) = $x$, and ρ sin θ = 2$b$ sin²($ωt$/2) = $y$.') },
        { t: 'Question 3: position and velocity', html: E('OM⃗ = 2b sin(ωt/2) u⃗_ρ', 'ρ̇ = bω cos(ωt/2)   θ̇ = ω/2', 'v⃗ = bω cos(ωt/2) u⃗_ρ + bω sin(ωt/2) u⃗_θ') +
          P('Norm: $v = bω$, constant. The trajectory is the circle with centre (0; $b$) and radius $b$, which passes through O.') }],
      answer: ul(['ρ = 2$b$ sin($ωt$/2)', 'θ = $ωt$/2', '$OM⃗ = 2b sin(ωt/2) u⃗_ρ$; $v⃗ = bω cos(ωt/2) u⃗_ρ + bω sin(ωt/2) u⃗_θ$']),
      traps: [X('Writing $OM⃗ = ρ u⃗_ρ + θ u⃗_θ$: there is no $u⃗_θ$ term in the position.'), X('Taking θ = $ωt$: the polar angle is seen from O, which is on the circle and not at its centre.')],
      grading: 'Printed marking scheme: 6 points for the exercise.', note: NOTE_REDIGE
    },

    'f2020-ex1': {
      src: 'End-of-semester exam Jan. 2020 · Ex 1', title: 'Inclined plane and pulley: acceleration, tension, reaction',
      intro: P('Consider an object of mass $m_1$ moving without friction on a plane inclined at an angle α to the horizontal; the pulley has negligible mass, and the strings have negligible mass and are inextensible. An object of mass $m$ moves vertically as shown in the figure.') +
        P('Given: α = 30°, $m_1$ = 0.8 kg, $m$ = 1 kg and $g$ = 10 m·s⁻². The angle α is also the angle between the vertical of the weight and the normal to the inclined plane.'),
      figs: [{ svg: F.plan20('Plane inclined at an angle alpha, mass m1 on the plane, a string passing over a pulley at the top, mass m hanging vertically.'), cap: 'Figure 1 of the paper (redrawn).' }],
      questions: [X('1- Represent the external forces acting on the systems $m_1$ and $m$.'), X('2- a) Apply Newton’s second law to the mass $m_1$ and to the mass $m$, to deduce the acceleration. Give the literal expression as a function of $m_1$, $m$, α and $g$. b) Give the numerical value.'),
        X('3- Calculate the tension of the string.'), X('4- Calculate the reaction of the inclined plane on the mass $m_1$.')],
      hints: [X('Inextensible string, ideal pulley: same acceleration $a$ for both masses, same tension $T$ on both sides.'), X('Project onto the axis of the plane for $m_1$ (upwards) and onto the downward vertical for $m$, then add the two equations.')],
      solution: [
        { t: 'Question 1: forces', html: ul(['On $m_1$: weight $P⃗_1$, reaction $R⃗$ perpendicular to the plane, tension $T⃗_1$ along the string, towards the pulley.', 'On $m$: weight $P⃗$, tension $T⃗$ upwards.']) },
        { t: 'Question 2: acceleration', html: P('Axis O$x$ along the plane, towards the pulley; for $m$, a vertical axis pointing down. Same $a$, same $T$.') +
          E('m_1: T − m_1g sin α = m_1a', 'm: mg − T = ma', 'a = g @f{m − m_1 sin α}{m + m_1} = 10 × @f{1 − 0.4}{1.8} = @f{10}{3} ≈ 3.3 m·s⁻²') },
        { t: 'Question 3: tension', html: E('T = m(g − a) = 1 × (10 − 10/3) = @f{20}{3} ≈ 6.7 N') },
        { t: 'Question 4: reaction', html: P('Along the normal to the plane, $m_1$ does not move: the reaction balances the normal component of the weight.') + E('R = m_1g cos α = 0.8 × 10 × @f{@r{3}}{2} = 4@r{3} ≈ 6.9 N') }],
      answer: ul(['$a = g(m − m_1 sin α)/(m + m_1) = 10/3 ≈ 3.3$ m·s⁻²', '$T = m(g − a) = 20/3 ≈ 6.7$ N', '$R = m_1g cos α = 4@r{3} ≈ 6.9$ N']),
      traps: [X('Writing $T = mg$: the mass accelerates, so the tension is smaller than its weight.'), X('Taking $m_1g sin α$ for the reaction: sin α goes with the axis of the plane, cos α with the normal.')],
      grading: 'Official answer key: 1.5 points for the literal expression, 0.5 for the numerical value, 1 for the tension.', note: NOTE_OK
    },

    'f2020-ex3': {
      src: 'End-of-semester exam Jan. 2020 · Ex 3', title: 'Quarter-circle chute: acceleration, reaction, leaving the surface',
      intro: P('A solid (S) of mass $m$, which can be treated as a material point, slides without friction on a chute shaped like a quarter circle with centre O and radius $r$. The solid (S) leaves the top A with an almost zero velocity. A position M of (S) at time $t$ is given by the angle θ. The chute lies in a vertical plane.'),
      figs: [{ svg: F.gout20('Quarter circle with centre O; A at the top; M located by the angle theta between the vertical OA and OM.'), cap: 'Figure 3 of the paper (redrawn).' }],
      questions: [X('1- Represent the external forces acting on the solid (S) at point M.'),
        X('2- Apply Newton’s second law to the system (S), working in the Frenet frame, to deduce the expressions of: a) the tangential component $a_T$ of the acceleration vector as a function of $g$ and θ; b) the norm of the reaction $R⃗$ of the chute on (S) as a function of $g$, θ and the velocity $V$ at point M.'),
        X('3- a) It can be shown that the square of the velocity at point M is: $V² = 2g r(1 − cos θ)$. Deduce the expression of the norm of the reaction as a function of $g$, θ and $m$. b) Determine the expression of the angle θ when the system (S) leaves the chute.')],
      hints: [X('Two forces: the weight and the reaction, perpendicular to the chute (no friction).'), X('Along $u⃗_T$: $mg sin θ = ma_T$. Along $u⃗_N$ (towards O): $mg cos θ − R = mV²/r$.'), X('The solid leaves the chute when $R$ becomes zero.')],
      solution: [
        { t: 'Question 1: forces', html: P('The weight $P⃗$, vertical, pointing down, and the reaction $R⃗$, perpendicular to the chute, pointing outwards (from O to M).') },
        { t: 'Question 2: second law', html: P('Frenet basis at M: $u⃗_T$ tangent, pointing forwards, $u⃗_N$ towards O. ' + POL) +
          E('along u⃗_T: mg sin θ = ma_T  ⇒  a_T = g sin θ', 'along u⃗_N: mg cos θ − R = m@f{V²}{r}  ⇒  R = m(g cos θ − @f{V²}{r})') },
        { t: 'Question 3: reaction and leaving the surface', html: E('R = m(g cos θ − 2g(1 − cos θ)) = mg(3 cos θ − 2)', 'R = 0  ⇔  cos θ = @f{2}{3}  ⇔  θ = arccos(2/3) ≈ 48°') +
          P('Beyond that, the formula would give $R &lt; 0$: the chute can only push, and the solid has left it.') }],
      answer: ul(['$a_T = g sin θ$', '$R = m(g cos θ − V²/r)$', '$R = mg(3 cos θ − 2)$; it leaves the chute for cos θ = 2/3']),
      traps: [X('Forgetting the term $mV²/r$: $R = mg cos θ$ is the answer for the inclined plane, not for the circle.'), X('Looking for the angle where the velocity vanishes: it is the reaction that vanishes.')],
      grading: 'Official answer key: 1 point for $a_T$, 1 for $R$, 1.5 for $R = mg(3 cos θ − 2)$, 1.5 for the angle.', note: NOTE_OK
    },

    'f2018j-ex1': {
      src: 'End-of-semester exam June 2018 · Ex 1', title: 'Circle travelled at V₀/(1 + αt): curvilinear abscissa, acceleration',
      intro: P('A material point describes a circle with centre O and radius $R$ with a velocity $V⃗$ of norm:') + E('V(t) = @f{V_0}{1 + αt}') + P('where $V_0$ and α are two positive constants.'),
      questions: [X('1- Express the curvilinear abscissa $s(t)$, knowing that $s(t = 0) = 0$.'), X('2- Express the components of the acceleration vector in the Frenet basis.')],
      hints: [X('$V = ds/dt$: $s$ is the antiderivative of $V$ that vanishes at 0.'), X('$a_T = dV/dt$ and $a_N = V²/R$.')],
      solution: [
        { t: 'Question 1: curvilinear abscissa', html: E('s(t) = ∫_0^t @f{V_0}{1 + αt′} dt′ = @f{V_0}{α} ln(1 + αt)') + P('Check: the derivative of $(V_0/α) ln(1 + αt)$ is $V_0/(1 + αt)$, and $s(0) = 0$.') },
        { t: 'Question 2: acceleration', html: E('a_T = @f{dV}{dt} = −@f{αV_0}{(1 + αt)²}   a_N = @f{V²}{R} = @f{V_0²}{R(1 + αt)²}') +
          P('$a_T &lt; 0$: the circular motion is decelerated; $a_N &gt; 0$, as always. ' + POL) }],
      answer: ul(['$s(t) = (V_0/α) ln(1 + αt)$', '$a_T = −αV_0/(1 + αt)²$; $a_N = V_0²/(R(1 + αt)²)$']),
      traps: [X('Differentiating instead of integrating to get $s$: $V$ is the derivative of $s$.'), X('Forgetting the minus sign of $a_T$: the speed decreases.')],
      grading: 'Printed marking scheme: 4 points for the exercise.', note: NOTE_OK
    },

    'f2018j-ex3': {
      src: 'End-of-semester exam June 2018 · Ex 3', title: 'The loop: speeds from energy, reaction from the second law',
      intro: P('A mass $m$ is released with no initial velocity from point A ($V_A$ = 0). At point B, it follows the circular profile of the loop BCB with centre O and radius $R$, turning anti-clockwise on the inside of the loop. Throughout the exercise, friction is negligible.'),
      figs: [{ svg: F.loop18('Track going down from A, at height h, to B, the bottom of a circular loop with centre O and radius R; C at the top; M located by the angle theta above the horizontal diameter O O1.'), cap: 'The loop; M is located by θ above the horizontal diameter OO₁.' }],
      questions: [X('1- Use the mechanical energy theorem between A and B to calculate the velocity $V_B$. Given: $g$ = 10 m·s⁻² and $h$ = 1 m.'),
        X('2- Use the mechanical energy theorem between point A and point M to express the velocity $V_M$ at point M, as a function of $g$, $R$ (radius), $h$ and the angle θ.'),
        X('3- Represent the reaction $R⃗_N$ exerted by the support on the mass $m$ at point M (the mass is inside the loop); express this reaction as a function of $g$, $h$, $m$, $R$ and the angle θ, using Newton’s second law in the Frenet basis $(u⃗_T, u⃗_N)$.')],
      hints: [X('Without friction, the mechanical energy is conserved. Height of M above B: $R + R sin θ$.'), X('Towards the centre: the reaction (towards O) and the component $mg sin θ$ of the weight.')],
      solution: [
        { t: 'Question 1: V_B', html: E('mgh = ½mV_B²  ⇒  V_B = @r{2gh} = @r{20} = 2@r{5} ≈ 4.5 m·s⁻¹') },
        { t: 'Question 2: V_M', html: E('mgh = ½mV_M² + mg(R + R sin θ)', 'V_M² = 2g(h − R − R sin θ)') },
        { t: 'Question 3: reaction', html: P('$R⃗_N$ is perpendicular to the loop, pointing towards O ($u⃗_N$). Along $u⃗_N$, the weight has the component $mg sin θ$ (M is above the diameter). ' + POL) +
          E('R_N + mg sin θ = m@f{V_M²}{R}', 'R_N = mg(@f{2h}{R} − 2 − 3 sin θ)') +
          P('At the top C (θ = 90°): $R_N = mg(2h/R − 5)$, positive only if $h ≥ 5R/2$ (chapter 2, part 5).') }],
      answer: ul(['$V_B = @r{2gh} = 2@r{5}$ m·s⁻¹', '$V_M² = 2g(h − R − R sin θ)$', '$R_N = mg(2h/R − 2 − 3 sin θ)$']),
      traps: [X('Measuring the height of M from O ($R sin θ$) instead of from B ($R + R sin θ$).'), X('Putting the weight on the wrong side: above the diameter, its component points towards the centre and adds to the reaction.')],
      grading: 'Printed marking scheme: 6 points for the exercise.', note: 'Answers recomputed; the official answer key is handwritten and partly legible.'
    },

    'f2018-ex2': {
      src: 'End-of-semester exam Jan. 2018 · Ex 2', title: 'Bead on a sphere: second law, equation of motion, reaction',
      intro: P('A bead of mass $m$ is released with no initial velocity from point A of a sphere of radius OM = $r$ and centre O. Friction is neglected. We study the motion while the bead is still in contact with the sphere.'),
      figs: [{ svg: F.sphere18('Quarter of a sphere with centre O; A at the top; bead at M, located by the angle theta from the vertical; weight P pointing down, reaction R pointing outwards.'), cap: 'The bead at M, located by θ from the vertical.' }],
      questions: [X('1- Give the components of the acceleration vector of the bead in the Frenet basis $(t⃗, n⃗)$, as a function of θ̈, θ̇, $r$.'),
        X('2- a) Write Newton’s second law in the Frenet basis. b) Deduce the differential equation of the motion and the norm of the reaction $R$.')],
      hints: [X('$V = rθ̇$: $a_T = rθ̈$, $a_N = rθ̇²$.'), X('Projection of the weight: $mg sin θ$ forwards, $mg cos θ$ towards O.')],
      solution: [
        { t: 'Question 1: acceleration', html: E('a⃗ = rθ̈ t⃗ + rθ̇² n⃗') + P(POL) },
        { t: 'Question 2: second law', html: E('along t⃗: mg sin θ = mrθ̈', 'along n⃗: mg cos θ − R = mrθ̇²') +
          P('Differential equation (tangential) and reaction (normal):') + E('θ̈ − @f{g}{r} sin θ = 0   R = m(g cos θ − rθ̇²)') +
          P('To go further: with energy, $rθ̇² = 2g(1 − cos θ)$, hence $R = mg(3 cos θ − 2)$ and the bead leaves the sphere at cos θ = 2/3 (chapter 2, parts 3 and 4).') }],
      answer: ul(['$a_T = rθ̈$, $a_N = rθ̇²$', 'θ̈ − ($g/r$) sin θ = 0', '$R = m(g cos θ − rθ̇²)$']),
      traps: [X('Putting the reaction in the tangential equation: without friction, it is normal.'), X('Writing $a_N = rθ̈$: the normal component contains θ̇², the tangential one θ̈.')],
      grading: 'Official answer key: 2 points for the acceleration, 2 for the second law, 1 for the equation and the reaction.', note: NOTE_OK
    },

    'f2018-ex3': {
      src: 'End-of-semester exam Jan. 2018 · Ex 3', title: 'Half-cylinder guide with friction: energies and friction force',
      intro: P('A point object of mass $m$ = 10 g is released from point A with no initial velocity. The half-cylinder guide of radius $R$ is fixed in the terrestrial reference frame. When the object passes for the first time through the lowest point B of the guide, its velocity is $V_B$ = 4 m/s. Let $f⃗$ be the friction force acting on $m$, of constant norm.'),
      figs: [{ svg: F.guide18('Half circle of radius R below its horizontal diameter; A on the rim, at the level of the centre; B at the lowest point, at z = 0.'), cap: 'The guide: A on the rim, B at the bottom ($z$ = 0).' }],
      questions: [X('1- Represent the external forces acting on the mass at any point M between A and B.'),
        X('2- Calculate the change in kinetic energy Δ$E_c$ and the change in gravitational potential energy Δ$E_p$ between points A and B. Deduce the change in mechanical energy Δ$E_m$. Given $R$ = 1 m and $g$ = 10 m/s².'),
        X('3- Determine the work of the friction force between A and B using the mechanical energy theorem. Deduce the norm of this force, assumed constant.')],
      hints: [X('A is at a height $R$ above B.'), X('The path AB is a quarter circle: length π$R$/2.')],
      solution: [
        { t: 'Question 1: forces', html: P('The weight $P⃗$, the normal reaction $R⃗_N$ (towards the centre of the guide) and the friction $f⃗$, tangent, opposite to the motion.') },
        { t: 'Question 2: energies', html: E('ΔE_c = ½mV_B² − 0 = ½ × 0.01 × 16 = 0.08 J', 'ΔE_p = mg(z_B − z_A) = −0.01 × 10 × 1 = −0.1 J', 'ΔE_m = 0.08 − 0.1 = −0.02 J') },
        { t: 'Question 3: friction', html: P('The normal reaction does no work; only the friction is non-conservative:') +
          E('W(f⃗) = ΔE_m = −0.02 J', 'W(f⃗) = −f × @f{πR}{2}  ⇒  f = @f{0.04}{π} ≈ 1.3·10⁻² N') +
          P('The official answer key takes π ≈ 3 and finds 1.33·10⁻² N.') }],
      answer: ul(['Δ$E_c$ = 0.08 J; Δ$E_p$ = −0.1 J; Δ$E_m$ = −0.02 J', '$W(f⃗)$ = −0.02 J; $f$ = 0.04/π ≈ 1.3·10⁻² N']),
      traps: [X('Forgetting to convert 10 g into 0.01 kg.'), X('Taking the straight-line distance AB ($R@r{2}$) instead of the arc π$R$/2.')],
      grading: 'Official answer key: 1 point for each change of energy, 0.5 for Δ$E_m$, 1 for the work, 0.5 for $f$.', note: NOTE_OK
    },

    'f2017-ex3': {
      src: 'End-of-semester exam Jan. 2017 · Ex 3', title: 'Curved then straight track: friction and velocity',
      intro: P('A point solid of mass $m$ moves on the track sketched below. The portion AB is an arc of a circle of radius $R$, angle θ and centre O; the portion BC is a horizontal segment. The solid is launched from point A with a velocity $V_A$ tangent to the circle.'),
      figs: [{ svg: F.piste17('Arc AB with centre O and angle theta, B at the lowest point, then a horizontal segment BC; velocity VA tangent at A.'), cap: 'The track ABC.' }],
      questions: [X('1- a) List the external forces acting on the solid between A and B, knowing that the friction on the part AB can be treated as a constant force $f$. Represent these forces. b) Use the work-kinetic energy theorem between A and B to express the friction force $f$ as a function of $R$, $g$, $V_A$, $V_B$, $m$ and θ. Do the calculation with: $m$ = 0.1 kg, $g$ = 10 m·s⁻², $R$ = 1.5 m, $V_A$ = 2 m·s⁻¹, $V_B$ = 3 m·s⁻¹; θ = 60° ≈ 1 rad.'),
        X('2- a) The friction on the path BC can be treated as a force $f$ = 0.1 N. Calculate the velocity at point C, knowing that BC = 2 m. b) Calculate the norm of the total reaction $R⃗$ acting on the solid during the path BC.')],
      hints: [X('Height of A above B: $R(1 − cos θ)$. Work of the friction along the arc: $−fRθ$.'), X('On BC, the weight does no work. The total reaction is the sum of the normal reaction and the friction, which are perpendicular.')],
      solution: [
        { t: 'Question 1: friction on the arc', html: P('Forces: weight $P⃗$, normal reaction $R⃗$ (does no work), friction $f⃗$ opposite to the motion. The velocity is not a force.') +
          E('½m(V_B² − V_A²) = mgR(1 − cos θ) − fRθ', 'f = @f{1}{Rθ}[mgR(1 − cos θ) − ½m(V_B² − V_A²)]', 'f = @f{0.75 − 0.25}{1.5} = @f{1}{3} N') },
        { t: 'Question 2: path BC', html: E('½m(V_C² − V_B²) = −f × BC  ⇒  V_C² = 9 − @f{2 × 0.1 × 2}{0.1} = 5   V_C = @r{5} m·s⁻¹') +
          E('R_tot = @r{(mg)² + f²} = @r{1 + 0.01} = @r{1.01} ≈ 1 N') }],
      answer: ul(['$f = [mgR(1 − cos θ) − ½m(V_B² − V_A²)]/(Rθ) = 1/3$ N', '$V_C = @r{5}$ m·s⁻¹; $R_tot = @r{1.01} ≈ 1$ N']),
      traps: [X('Drawing $V⃗_A$ as a force.'), X('Forgetting that the total reaction on BC includes the friction: $@r{R² + f²}$.')],
      grading: 'Printed marking scheme: 7 points for the exercise.', note: 'Answers recomputed; they match the official answer key (in English).'
    }
  });
})();
