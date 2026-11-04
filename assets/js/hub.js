/* Révisions S1 — page d'accueil (index.html et index.en.html), commune aux deux bimestres.
   La page montre le bimestre de REV.period (?b=b1 ou le bimestre en cours) : en-tête, bascule entre les bimestres,
   compte à rebours des examens, prochaine étape, matières du bimestre, outils (QCM, annales, fiches) comptés pour
   ce bimestre. Les données (banques de QCM, exercices, annales) sont chargées par la page avant ce fichier.
   Textes : REV.t('français') + REV.i18n.add en fin de fichier.
   Exercices d'entraînement d'une matière : EXS[id] ; nombre de sujets d'examen : nAnn(s). */
(function () {
  'use strict';
  var R = window.REV, U = R.util, $ = U.$, T = R.t, EN = R.lang === 'en';
  R.i18n.add({
    'Examens <span>B2</span>': '<span>B2</span> Exams', 'Partiels <span>S1</span>': '<span>S1</span> Midterms',
    'Le bimestre 2, au fur et à mesure des cours : le cours repris pas à pas, ce qui tombe vraiment à l’examen, des exercices d’annales corrigés et un QCM qui te repose les questions ratées au bon moment.':
      'Term 2, added as the courses come in: the course taken step by step, what really comes up in the exam, past exam exercises with solutions, and an MCQ that asks you the questions you missed again at the right time.',
    'Le cours repris pas à pas, ce qui tombe vraiment au partiel, des exercices d’annales corrigés et un QCM qui te repose les questions ratées au bon moment.':
      'The course taken step by step, what really comes up in the midterm, past exam exercises with solutions, and an MCQ that asks you the questions you missed again at the right time.',
    'terminé': 'finished', 'en cours': 'current',
    'Révisions S1 · EPITA promo 2031 · {p}': 'S1 Revision · EPITA class of 2031 · {p}',
    'Les matières du bimestre 2 arrivent au fur et à mesure des cours. Celles du bimestre 1 restent dans l’onglet B1.': 'Term 2 subjects are added as the courses come in. Term 1 subjects stay under the B1 tab.',
    'Les matières du bimestre 1, avec tous leurs supports. Les partiels ont eu lieu du 26 au 29 octobre ; tout reste disponible.': 'Term 1 subjects, with all their materials. The midterms took place from 26 to 29 October; everything stays available.',
    'Les examens de fin de semestre S1 et les rattrapages retrouvés, par matière et par année, avec les corrigés quand ils existent.': 'The S1 end-of-semester exams and retakes we found, by subject and by year, with the solutions when they exist.',
    'Tous les sujets de partiels de mi-semestre S1 retrouvés, par matière et par année, avec les corrigés quand ils existent.': 'Every S1 midterm paper we found, by subject and by year, with the solutions when they exist.',
    'Compte à rebours': 'Countdown', 'Modifier les dates': 'Change the dates', 'Les examens de ce bimestre sont passés.': 'The exams of this term are over.',
    'Aller au bimestre en cours': 'Go to the current term', 'Ajoute la date de ton examen pour lancer le décompte.': 'Add the date of your exam to start the countdown.',
    'Enregistrer': 'Save', 'Les dates des examens du bimestre ne sont pas encore connues.': 'The dates of this term’s exams are not known yet.', 'Reprendre': 'Resume', 'La dernière page que tu as ouverte.': 'The last page you opened.', 'Continuer': 'Continue', 'Commencer': 'Start',
    'chapitre {n}': 'chapter {n}', 'Répétition espacée': 'Spaced repetition',
    'Des questions ratées ou vues il y a quelques jours. C’est le moment de les reprendre.': 'Questions you missed or saw a few days ago. Now is the time to go over them again.',
    'Réviser maintenant': 'Review now', 'QCM': 'MCQ', 'Sprint de 10 questions': '10-question sprint',
    '{a} questions déjà vues sur {b}, dont {c} bien ancrées.': '{a} questions already seen out of {b}, {c} of them mastered.',
    '{n} questions t’attendent : cours, pièges et vrais QCM.': '{n} questions are waiting for you: course, traps and real MCQs.',
    'Lancer': 'Start', 'Annales': 'Past exams', 'Un exercice d’examen': 'An exam exercise',
    'Exercices des sujets des années précédentes, avec indices et corrigé détaillé.': 'Exercises from previous years’ papers, with hints and a detailed solution.',
    'S’entraîner': 'Practice', 'Les cours arrivent': 'Courses on the way',
    'Aucune matière de ce bimestre n’est encore prête. En attendant, les annales des examens de fin de semestre sont en ligne.': 'No subject of this term is ready yet. In the meantime, the end-of-semester past exams are online.',
    'Voir les annales': 'See the past exams', 'bientôt': 'soon', 'Le cours et les entraînements arriveront avec tes supports.': 'The course and the practice will come with your course materials.',
    'En attendant :': 'In the meantime:', 'prêt': 'ready', 'Ouvrir': 'Open', 'Entraînement': 'Practice', 'Fiche': 'Summary sheet',
    'Cours compris': 'Course understood', 'QCM bien ancrés': 'MCQs mastered', 'QCM déjà vus': 'MCQs seen', 'Exercices réussis': 'Exercises solved', 'à revoir': 'to review',
    'Aucune matière pour l’instant.': 'No subject yet.'
  });
  var P = R.period, PI = R.periodInfo(P), SUBJ = R.periodSubjects(P);
  var BANK = R.quiz.bank();
  var EXS = { elec: window.ELEC_EX, taa: window.TAA_EX, physique: window.PHYS_EX, caml: window.CAML_EX, archi: window.ARCHI_EX, maths: window.MATHS_EX, boole: window.BOOLE_EX };
  var A = window.ANNALES || { midterms: [], finals: [], retakes: [] };
  var MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  function nEx(sid) { return (EXS[sid] || []).length; }
  function pl(n, one, many) { return n + ' ' + (n === 1 ? one : many); }
  function ids(s) { return BANK.filter(function (q) { return q.s === s.id; }); }
  function nChap(s) {
    var n = s.chapters.length;
    if (EN) return (['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'][n] || n) + ' chapter' + (n > 1 ? 's' : '');
    return (['', 'Un', 'Deux', 'Trois', 'Quatre', 'Cinq', 'Six', 'Sept'][n] || n) + ' chapitre' + (n > 1 ? 's' : '');
  }
  /* sujets d'examen d'une matière : les fiches d'annales de la matière quand elle en a, sinon l'index d'Epidocs
     (bimestre 1 : partiels de mi-semestre, algo : TAA et Caml partagent les sujets d'avant 2023 ; bimestre 2 : examens
     de fin de semestre) */
  var OWN = { archi: window.ARCHI_EXAMS, maths: window.MATHS_EXAMS, boole: window.BOOLE_EXAMS };
  function nAnn(s) {
    if (OWN[s.id]) return OWN[s.id].length;
    var id = s.annalesId || s.id, list = P === 'b1' ? A.midterms : (A.finals || []);
    return list.filter(function (m) {
      if (m.subject !== id) return false;
      var v = (m.variant || '').toUpperCase();
      return (v !== 'TAA' && v !== 'CAML') || v === String(s.short).toUpperCase();
    }).length;
  }
  function startMin(id) { var o = R.exams.official(id); if (!o || !o.start || R.exams.get(id) !== o.date) return 1e4; var t = o.start.split(':'); return +t[0] * 60 + +t[1]; }
  function ready() { return SUBJ.filter(function (s) { return s.status === 'ready'; }); }
  /* matières prêtes, la plus urgente d'abord (date d'examen à venir), sinon dans l'ordre du registre */
  function byUrgency() {
    return ready().map(function (s, i) {
      var d = R.exams.daysLeft(R.exams.get(s.id)); return { s: s, d: d === null || d < 0 ? 999 : d, i: i };
    }).sort(function (a, b) { return a.d - b.d || startMin(a.s.id) - startMin(b.s.id) || a.i - b.i; }).map(function (x) { return x.s; });
  }
  function fmtDate(iso) { var p = iso.split('-'); return EN ? (+p[2]) + ' ' + (MONTHS[+p[1] - 1] || p[1]) + ' ' + p[0] : p[2] + '/' + p[1] + '/' + p[0]; }

  /* ---- en-tête et bascule entre les bimestres ---- */
  function renderHead() {
    var b2 = P === 'b2';
    $('#h-title').innerHTML = b2 ? T('Examens <span>B2</span>') : T('Partiels <span>S1</span>');
    $('#h-lead').textContent = b2 ? T('Le bimestre 2, au fur et à mesure des cours : le cours repris pas à pas, ce qui tombe vraiment à l’examen, des exercices d’annales corrigés et un QCM qui te repose les questions ratées au bon moment.')
      : T('Le cours repris pas à pas, ce qui tombe vraiment au partiel, des exercices d’annales corrigés et un QCM qui te repose les questions ratées au bon moment.');
    $('#h-period').textContent = PI.name;
    $('#periods').innerHTML = R.periods.map(function (p) {
      var on = p.id === P, n = R.periodSubjects(p.id).filter(function (s) { return s.status === 'ready'; }).length;
      var state = p.state === 'done' ? T('terminé') : p.id === R.currentPeriod ? T('en cours') : '';
      return '<a class="per' + (on ? ' on' : '') + (p.state === 'done' ? ' done' : '') + '" data-period="' + p.id + '" href="' + R.url(R.sharedPath('index.html', p.id)) + '"' + (on ? ' aria-current="page"' : '') + '>' +
        '<span class="per-k">' + p.short + (state ? ' · ' + state : '') + '</span><span class="per-t">' + p.name + '</span>' +
        '<span class="per-d">' + p.exams + ' · ' + (EN ? pl(n, 'subject', 'subjects') : pl(n, 'matière', 'matières')) + '</span></a>';
    }).join('');
    $('#h-foot').textContent = T('Révisions S1 · EPITA promo 2031 · {p}', { p: PI.name.toLowerCase() });
    $('#subj-note').textContent = b2 ? T('Les matières du bimestre 2 arrivent au fur et à mesure des cours. Celles du bimestre 1 restent dans l’onglet B1.')
      : T('Les matières du bimestre 1, avec tous leurs supports. Les partiels ont eu lieu du 26 au 29 octobre ; tout reste disponible.');
    $('#d-ann').textContent = b2 ? T('Les examens de fin de semestre S1 et les rattrapages retrouvés, par matière et par année, avec les corrigés quand ils existent.')
      : T('Tous les sujets de partiels de mi-semestre S1 retrouvés, par matière et par année, avec les corrigés quand ils existent.');
  }

  /* ---- compte à rebours ---- */
  function renderCount() {
    var box = $('#count'), list = ready();
    var dated = list.map(function (s) { return { s: s, iso: R.exams.get(s.id), d: R.exams.daysLeft(R.exams.get(s.id)) }; })
      .filter(function (x) { return x.iso && x.d !== null && x.d >= 0; }).sort(function (a, b) { return a.d - b.d || startMin(a.s.id) - startMin(b.s.id); });
    var past = list.length && list.every(function (s) { var d = R.exams.daysLeft(R.exams.get(s.id)); return d !== null && d < 0; });
    var html = '<span class="eyebrow">' + T('Compte à rebours') + '</span>';
    if (dated.length) {
      var n = dated[0];
      if (EN) html += '<div class="count-main"><span class="count-num">' + (n.d === 0 ? 'Today' : n.d) + '</span><span class="count-txt">' + (n.d === 0 ? 'is your ' + n.s.name + ' exam' : (n.d > 1 ? 'days' : 'day') + ' left before the ' + n.s.name + ' exam') + '</span></div>';
      else html += '<div class="count-main"><span class="count-num">' + (n.d === 0 ? 'J' : 'J−' + n.d) + '</span><span class="count-txt">' + (n.d === 0 ? 'C’est aujourd’hui : examen ' : 'avant l’examen ') + (/^[aeiouyhéèêàâîôû]/i.test(n.s.short) ? 'd’' : 'de ') + n.s.short + '</span></div>';
      html += '<div class="count-list">' + dated.map(function (x) { return '<div><span>' + x.s.name + '</span><span class="mono">' + fmtDate(x.iso) + '</span></div>'; }).join('') + '</div>';
      html += '<button type="button" class="linkish" id="editDates">' + T('Modifier les dates') + '</button>';
    } else if (past) {
      html += '<div class="count-main"><span class="count-num">✓</span><span class="count-txt">' + T('Les examens de ce bimestre sont passés.') + '</span></div>';
      html += '<div class="count-list"><div><span>' + PI.exams + '</span></div></div>';
      if (P !== R.currentPeriod) html += '<a class="btn" href="' + R.url(R.sharedPath('index.html', R.currentPeriod)) + '" data-period="' + R.currentPeriod + '">' + T('Aller au bimestre en cours') + ' →</a>';
    } else {
      html += '<div class="count-main"><span class="count-num">' + (EN ? '?' : 'J−?') + '</span><span class="count-txt">' + (list.length ? T('Ajoute la date de ton examen pour lancer le décompte.') : T('Les dates des examens du bimestre ne sont pas encore connues.')) + '</span></div>';
    }
    if (list.length && (!past || dated.length)) html += '<form id="dateForm"' + (dated.length ? ' hidden' : '') + '>' + list.map(function (s) {
      return '<label for="d-' + s.id + '">' + s.name + '</label><input type="date" id="d-' + s.id + '" value="' + R.exams.get(s.id) + '">';
    }).join('') + '<button class="btn" type="submit">' + T('Enregistrer') + '</button></form>';
    box.innerHTML = html;
    var f = $('#dateForm');
    if (f) f.addEventListener('submit', function (e) { e.preventDefault(); list.forEach(function (s) { R.exams.set(s.id, $('#d-' + s.id).value); }); renderCount(); });
    var ed = $('#editDates'); if (ed && f) ed.addEventListener('click', function () { f.hidden = !f.hidden; });
  }

  /* ---- prochaine étape ---- */
  function nextSection(s) {
    for (var i = 0; i < s.chapters.length; i++) {
      var c = s.chapters[i], done = R.progress.chapterDone(s.id, c.id);
      if (done < c.sections) return { c: c, i: i, done: done };
    }
    return null;
  }
  function renderToday() {
    var steps = [], d = R.store.load(), order = byUrgency(), top = order[0];
    var lastP = d.last && (d.last.period || 'b1');
    if (d.last && d.last.href && d.last.href !== 'index.html' && lastP === P) steps.push({ k: T('Reprendre'), t: d.last.title, d: T('La dernière page que tu as ouverte.'), href: d.last.href, go: T('Continuer') });
    for (var i = 0; i < order.length && steps.length < 2; i++) {
      var s = order[i], ns = nextSection(s);
      if (!ns) continue;
      var dd = EN ? (ns.done ? pl(ns.done, 'part', 'parts') + ' out of ' + ns.c.sections + ' marked as understood.' : 'Not started yet. Allow about 30 minutes.')
        : (ns.done ? ns.done + ' partie' + (ns.done > 1 ? 's' : '') + ' sur ' + ns.c.sections + ' marquée' + (ns.done > 1 ? 's' : '') + ' comme comprise' + (ns.done > 1 ? 's' : '') + '.' : 'Pas encore commencé. Compte environ 30 minutes.');
      steps.push({ k: s.short + ' · ' + T('chapitre {n}', { n: ns.i + 1 }), t: ns.c.title, d: dd, href: ns.c.path + (ns.done ? '#s' + (ns.done + 1) : ''), go: ns.done ? T('Continuer') : T('Commencer') });
    }
    if (top) {
      var st = R.qcm.stats(top.id, ids(top));
      if (st.due > 0) steps.push({ k: T('Répétition espacée') + ' · ' + top.short, t: EN ? pl(st.due, 'question', 'questions') + ' to review' : st.due + ' question' + (st.due > 1 ? 's' : '') + ' à revoir', d: T('Des questions ratées ou vues il y a quelques jours. C’est le moment de les reprendre.'), href: 'qcm/index.html#' + top.id + '-revision', go: T('Réviser maintenant') });
      else if (st.total) steps.push({ k: T('QCM') + ' · ' + top.short, t: T('Sprint de 10 questions'), d: st.seen ? T('{a} questions déjà vues sur {b}, dont {c} bien ancrées.', { a: st.seen, b: st.total, c: st.mastered }) : T('{n} questions t’attendent : cours, pièges et vrais QCM.', { n: st.total }), href: 'qcm/index.html#' + top.id + '-sprint', go: T('Lancer') });
      if (top.train) steps.push({ k: T('Annales') + ' · ' + top.short, t: T('Un exercice d’examen'), d: T('Exercices des sujets des années précédentes, avec indices et corrigé détaillé.'), href: top.train, go: T('S’entraîner') });
    } else {
      steps.push({ k: PI.short, t: T('Les cours arrivent'), d: T('Aucune matière de ce bimestre n’est encore prête. En attendant, les annales des examens de fin de semestre sont en ligne.'), href: 'annales/index.html', go: T('Voir les annales') });
    }
    $('#today').innerHTML = steps.slice(0, 3).map(function (s) {
      return '<a class="step" href="' + R.url(s.href) + '"><span class="k">' + U.esc(s.k) + '</span><span class="t">' + U.esc(s.t) + '</span><span class="d">' + U.esc(s.d) + '</span><span class="go">' + U.esc(s.go) + ' →</span></a>';
    }).join('');
  }

  /* ---- matières ---- */
  function meter(label, frac, txt) {
    return '<div class="meter"><div class="row"><span>' + label + '</span><span>' + txt + '</span></div><div class="bar"><i style="width:' + Math.round(frac * 100) + '%"></i></div></div>';
  }
  function renderSubjects() {
    var list = ready().concat(SUBJ.filter(function (s) { return s.status !== 'ready'; }));
    $('#subjects').innerHTML = list.map(function (s) {
      var na = nAnn(s), NEX = nEx(s.id), b1 = P === 'b1';
      var ann1 = b1 ? (EN ? 'midterm paper' : 'sujet de partiel') : (EN ? 'exam paper' : 'sujet d’examen'), annN = b1 ? (EN ? 'midterm papers' : 'sujets de partiel') : (EN ? 'exam papers' : 'sujets d’examen');
      if (s.status !== 'ready') {
        return '<article class="subj soon subj-' + s.id + '"><div class="subj-top"><h3>' + s.name + '</h3><span class="tag">' + T('bientôt') + '</span></div>' +
          '<p>' + T('Le cours et les entraînements arriveront avec tes supports.') + (na ? ' ' + T('En attendant :') + ' ' + pl(na, ann1, annN) + '.' : '') + '</p>' +
          '<div class="links"><a class="btn ghost" href="' + R.url('annales/index.html#' + (s.annalesId || s.id)) + '">' + T('Voir les annales') + '</a></div></article>';
      }
      var p = R.progress.subject(s.id), bank = ids(s), q = R.qcm.stats(s.id, bank);
      var chapters = s.chapters.map(function (c, i) {
        var done = Math.min(c.sections, R.progress.chapterDone(s.id, c.id));
        return '<li><a href="' + R.url(c.path) + '"><span>' + (i + 1) + '. ' + c.title + '</span><span class="mono">' + done + '/' + c.sections + '</span></a></li>';
      }).join('');
      var desc = EN ? s.exam + '. ' + nChap(s) + ', methods, ' + (NEX ? NEX + ' exercises with solutions, ' : '') + bank.length + ' MCQ questions' + (na ? ' and the ' + na + ' ' + annN + ' we found' : '') + '.'
        : s.exam + '. ' + nChap(s) + ', des méthodes, ' + (NEX ? NEX + ' exercices corrigés, ' : '') + bank.length + ' questions de QCM' + (na ? ' et les ' + na + ' ' + annN + ' retrouvés' : '') + '.';
      return '<article class="subj ready subj-' + s.id + '">' +
        '<div style="display:grid;gap:12px;align-content:start;min-width:0">' +
        '<div class="subj-top"><h3>' + s.name + '</h3><span class="tag">' + T('prêt') + '</span></div>' +
        '<span class="code">' + (s.code ? s.code + ' · ' : '') + s.course + '</span>' +
        '<p>' + desc + '</p>' +
        '<ul class="chapters">' + chapters + '</ul>' +
        '<div class="links"><a class="btn primary" href="' + R.url(s.path) + '">' + (s.open || T('Ouvrir')) + '</a>' + (s.train ? '<a class="btn" href="' + R.url(s.train) + '">' + T('Entraînement') + '</a>' : '') + (s.fiche ? '<a class="btn" href="' + R.url(s.fiche) + '">' + T('Fiche') + '</a>' : '') + '</div>' +
        '</div><div class="meters">' +
        meter(T('Cours compris'), p.pctRead, p.read + ' / ' + p.sections) +
        meter(T('QCM bien ancrés'), bank.length ? q.mastered / bank.length : 0, q.mastered + ' / ' + bank.length) +
        meter(T('QCM déjà vus'), bank.length ? q.seen / bank.length : 0, q.seen + ' / ' + bank.length) +
        (NEX ? meter(T('Exercices réussis'), p.ex.ok / NEX, p.ex.ok + ' / ' + NEX + (p.ex.review ? ' · ' + p.ex.review + ' ' + T('à revoir') : '')) : '') +
        '</div></article>';
    }).join('') || '<p class="muted">' + T('Aucune matière pour l’instant.') + '</p>';
  }

  function renderTools() {
    var sids = SUBJ.map(function (s) { return s.id; });
    $('#n-qcm').textContent = BANK.filter(function (q) { return sids.indexOf(q.s) >= 0; }).length;
    $('#n-ann').textContent = P === 'b1' ? A.midterms.length : (A.finals || []).length + (A.retakes || []).length + (window.BOOLE_EXAMS || []).filter(function (e) { return e.moodle; }).length;
    $('#n-fiche').textContent = ready().filter(function (s) { return s.fiche; }).length;
  }

  function all() { renderHead(); renderCount(); renderToday(); renderSubjects(); renderTools(); }
  all();
  R.store.on(function () { renderToday(); renderSubjects(); });

})();
