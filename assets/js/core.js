/* Révisions S1 — noyau partagé.
   Chargé de façon bloquante dans le <head> de chaque page :
   langue, thème, stockage local, registre des matières, progression, barre de navigation.

   Langues : chaque page X.html a une jumelle anglaise X.en.html (même dossier, mêmes ids, <html lang="en">).
   Le bouton FR | EN de la barre mène à la jumelle et retient le choix (clé rev-s1:lang) : une page ouverte
   dans l'autre langue redirige alors vers sa jumelle. Sur une page anglaise, les liens vers les pages .html
   du site sont réécrits vers les .en.html (y compris ceux ajoutés par les scripts) et REV.url() fait de même.
   Textes des scripts partagés : REV.t('texte français', { n: 3 }) rend la traduction déclarée par
   REV.i18n.add({ 'texte français': 'English text' }) quand la page est en anglais ({n} est remplacé).
   Données : les fichiers data/en/… chargés par les pages anglaises après les fichiers français appellent
   REV.i18n.patch(liste, { id: { champs anglais } }) (fusion champ par champ, tableaux élément par élément),
   REV.i18n.qcm({ id: { q, o, x, … } }) pour les questions et REV.i18n.topics({ notion: 'Name' }). */
(function () {
  'use strict';

  var script = document.currentScript;
  var ROOT = script ? script.src.replace(/assets\/js\/core\.js(?:[?#].*)?$/, '') : './';
  var KEY = 'rev-s1:v1';
  var DAY = 86400000;

  /* ---------- langue ---------- */
  var LANG = /\.en\.html$/i.test(location.pathname) || document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fr';
  var LANG_KEY = 'rev-s1:lang';
  function langPref() { try { var l = localStorage.getItem(LANG_KEY); return l === 'fr' || l === 'en' ? l : ''; } catch (e) { return ''; } }
  function setLangPref(l) { try { localStorage.setItem(LANG_KEY, l); } catch (e) { } }
  /* chemin de la page depuis la racine du site ('' pour la racine elle-même) */
  function here() {
    var h = location.href.split('#')[0].split('?')[0];
    return h.indexOf(ROOT) === 0 ? h.slice(ROOT.length) : '';
  }
  /* la même page dans la langue l */
  function twin(l) {
    var p = here();
    if (!p || /\/$/.test(p)) p += 'index.html';
    p = p.replace(/\.en\.html$/i, '.html');
    if (l === 'en') p = p.replace(/\.html$/i, '.en.html');
    return ROOT + p + location.search + location.hash;
  }
  /* sur une page anglaise : lien vers une page du site → sa version anglaise */
  var FOREIGN = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
  function enHref(h) {
    if (!h || h.charAt(0) === '#' || (FOREIGN.test(h) && h.indexOf(ROOT) !== 0)) return h;
    return h.replace(/^([^?#]*?)(\.en)?\.html(?=[?#]|$)/i, function (m, base, en) { return en ? m : base + '.en.html'; });
  }
  var pref = langPref();
  if (pref && pref !== LANG && !/[?&]lang=keep\b/.test(location.search)) { try { location.replace(twin(pref)); } catch (e) { } }

  var DICT = {};
  function t(fr, vars) {
    var s = LANG === 'en' && DICT[fr] != null ? DICT[fr] : fr;
    if (vars) s = String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
    return s;
  }
  function isObj(o) { return o && typeof o === 'object' && !Array.isArray(o); }
  /* fusion d'une traduction dans un objet : chaînes remplacées, objets fusionnés, tableaux élément par élément
     (null garde l'élément français ; un tableau anglais plus court ou plus long fixe la longueur).
     Les tableaux et objets imbriqués sont copiés avant d'être modifiés : un tableau d'options ou une figure
     partagés par plusieurs questions dans le fichier français ne sont jamais traduits pour toutes à la fois. */
  function merge(dst, src) {
    Object.keys(src).forEach(function (k) {
      var v = src[k], d = dst[k];
      if (v == null) return;
      if (Array.isArray(v) && Array.isArray(d)) {
        d = dst[k] = d.slice();
        v.forEach(function (x, i) { if (x == null) return; d[i] = isObj(x) && isObj(d[i]) ? merge(Object.assign({}, d[i]), x) : x; });
        d.length = v.length;
      } else if (isObj(v) && isObj(d)) dst[k] = merge(Object.assign({}, d), v);
      else dst[k] = v;
    });
    return dst;
  }
  var i18n = {
    lang: LANG,
    add: function (d) { if (LANG === 'en') for (var k in d) DICT[k] = d[k]; },
    has: function (fr) { return DICT[fr] != null; },
    merge: merge,
    /* patch(liste, { id: {…} }, 'id') pour un tableau d'objets, patch(objet, { clé: valeur }) pour une table */
    patch: function (target, map, key) {
      if (LANG !== 'en' || !target || !map) return target;
      if (Array.isArray(target)) {
        key = key || 'id';
        target.forEach(function (o) { var tr = o && map[o[key]]; if (tr) merge(o, tr); });
      } else merge(target, map);
      return target;
    },
    /* questions de QCM : appliquées par REV.quiz après le dédoublonnage (qui se fait sur le texte français) */
    qcm: function (map) { if (LANG !== 'en') return; var Q = window.QCM_EN = window.QCM_EN || {}; for (var k in map) Q[k] = map[k]; },
    topics: function (map) { if (LANG !== 'en') return; var T = window.QCM_TOPICS_EN = window.QCM_TOPICS_EN || {}; for (var k in map) T[k] = map[k]; },
    twin: twin, enHref: enHref
  };

  /* ---------- registre des matières ---------- */
  var SUBJECTS = [
    {
      id: 'elec', name: 'Électronique', short: 'Élec', code: 'SI-S1-ELEC-1-OAC',
      course: 'Outils d’analyse de circuits', path: 'elec/index.html', dir: 'elec/', status: 'ready',
      train: 'elec/entrainement.html', fiche: 'elec/fiche.html', open: 'Ouvrir l’élec',
      exam: 'Écrit · sans calculatrice ni document',
      chapters: [
        { id: 'bases', title: 'Les bases', path: 'elec/cours-1-bases.html', sections: 8 },
        { id: 'lois', title: 'Lois fondamentales', path: 'elec/cours-2-lois.html', sections: 8 },
        { id: 'theoremes', title: 'Thévenin, Norton, Millman', path: 'elec/cours-3-theoremes.html', sections: 8 }
      ]
    },
    {
      id: 'maths', name: 'Mathématiques', short: 'Maths', code: 'S1 · ECUE OBM et DP',
      course: 'Outils de base (OBM) · Dénombrement et probabilités (DP)', path: 'maths/index.html', dir: 'maths/', status: 'ready', annales: 'Maths PC',
      exam: 'Examen 1, semaine du 26 octobre : OBM 2 h et DP 2 h · DM 20 %, contrôle de cours 20 %, examen 60 % · APIS à l’examen 2',
      train: 'maths/entrainement.html', fiche: 'maths/fiche.html', open: 'Ouvrir les maths',
      chapters: [
        { id: 'logique', title: 'Logique', ecue: 'OBM', path: 'maths/cours-1-logique.html', sections: 8 },
        { id: 'ensembles', title: 'Ensembles', ecue: 'OBM', path: 'maths/cours-2-ensembles.html', sections: 8 },
        { id: 'fonctions', title: 'Fonctions', ecue: 'OBM', path: 'maths/cours-3-fonctions.html', sections: 8 },
        { id: 'raisonnement', title: 'Raisonnements', ecue: 'OBM', path: 'maths/cours-4-raisonnement.html', sections: 8 },
        { id: 'denombrement', title: 'Dénombrement', ecue: 'DP', path: 'maths/cours-5-denombrement.html', sections: 8 },
        { id: 'probabilites', title: 'Probabilités', ecue: 'DP', path: 'maths/cours-6-probabilites.html', sections: 8 },
        { id: 'variables', title: 'Variables aléatoires', ecue: 'DP', path: 'maths/cours-7-variables.html', sections: 8 }
      ]
    },
    {
      id: 'physique', name: 'Physique · Mécanique', short: 'Physique',
      course: 'Mécanique du point', path: 'physique/index.html', dir: 'physique/', status: 'ready', annales: 'Phys',
      train: 'physique/entrainement.html', fiche: 'physique/fiche.html', open: 'Ouvrir la physique',
      exam: 'Écrit · sans calculatrice ni document',
      chapters: [
        { id: 'cinematique', title: 'Cinématique cartésienne', path: 'physique/cours-1-cinematique.html', sections: 8 },
        { id: 'dynamique', title: 'Forces et lois de Newton', path: 'physique/cours-2-dynamique.html', sections: 8 },
        { id: 'energie', title: 'Travail et énergie', path: 'physique/cours-3-energie.html', sections: 8 },
        { id: 'polaires', title: 'Coordonnées polaires', path: 'physique/cours-4-polaires.html', sections: 8 }
      ]
    },
    {
      id: 'taa', name: 'Algo · Types abstraits', short: 'TAA', code: 'ALGO-S1 · ECUE TAA',
      course: 'Types algébriques abstraits', path: 'taa/index.html', dir: 'taa/', status: 'ready',
      exam: 'Écrit sur le sujet · 1 h cette année d’après le Moodle (30 min, noté sur 10, en 2024)',
      annalesId: 'algo', train: 'taa/entrainement.html', fiche: 'taa/fiche.html', open: 'Ouvrir TAA',
      chapters: [
        { id: 'types', title: 'Les types abstraits', path: 'taa/cours-1-types.html', sections: 8 },
        { id: 'listes', title: 'Les listes', path: 'taa/cours-2-listes.html', sections: 8 },
        { id: 'piles', title: 'Piles, files, ensembles', path: 'taa/cours-3-piles-files.html', sections: 8 }
      ]
    },
    {
      id: 'caml', name: 'Algo · Caml', short: 'Caml', code: 'ALGO-S1 · ECUE Caml',
      course: 'Caml et récursivité', path: 'caml/index.html', dir: 'caml/', status: 'ready',
      exam: 'Écrit · 1 h 30 · fin octobre',
      annalesId: 'algo', train: 'caml/entrainement.html', fiche: 'caml/fiche.html', open: 'Ouvrir Caml',
      chapters: [
        { id: 'bases', title: 'Les bases du langage', path: 'caml/cours-1-bases.html', sections: 8 },
        { id: 'recursivite', title: 'La récursivité', path: 'caml/cours-2-recursivite.html', sections: 8 },
        { id: 'listes', title: 'Les listes', path: 'caml/cours-3-listes.html', sections: 8 },
        { id: 'ordre', title: 'L’ordre supérieur', path: 'caml/cours-4-ordre-superieur.html', sections: 8 }
      ]
    },
    {
      id: 'archi', name: 'Architecture · Numération', short: 'Archi',
      course: 'Architecture des ordinateurs · Numération', path: 'archi/index.html', dir: 'archi/', status: 'ready', annales: 'Archi',
      exam: 'Examen 1 h, date non publiée · tests Moodle 10 %',
      train: 'archi/entrainement.html', fiche: 'archi/fiche.html', open: 'Ouvrir l’archi',
      chapters: [
        { id: 'bases', title: 'Bases de numération', path: 'archi/cours-1-bases.html', sections: 8 },
        { id: 'operations', title: 'Opérations en base 2 et 16', path: 'archi/cours-2-operations.html', sections: 8 },
        { id: 'entiers', title: 'Entiers signés et non signés', path: 'archi/cours-3-entiers.html', sections: 8 },
        { id: 'flottants', title: 'Nombres à virgule flottante', path: 'archi/cours-4-flottants.html', sections: 8 }
      ]
    }
  ];
  /* textes anglais du registre */
  var SUBJECTS_EN = {
    elec: { name: 'Electronics', short: 'Elec', course: 'Circuit analysis tools', open: 'Open Elec',
      exam: 'Written · no calculator, no documents', chapters: ['The basics', 'Fundamental laws', 'Thévenin, Norton, Millman'] },
    maths: { name: 'Mathematics', short: 'Maths', course: 'Basic mathematical tools (OBM) · Counting and probability (DP)', open: 'Open Maths',
      exam: 'Exam 1, week of 26 October: OBM 2 hr and DP 2 hr · homework 20%, course test 20%, exam 60% · APIS in exam 2',
      chapters: ['Logic', 'Sets', 'Functions', 'Reasoning', 'Counting', 'Probability', 'Random variables'] },
    physique: { name: 'Physics · Mechanics', short: 'Physics', course: 'Point mechanics', open: 'Open Physics',
      exam: 'Written · no calculator, no documents',
      chapters: ['Kinematics in Cartesian coordinates', 'Forces and Newton’s laws', 'Work and energy', 'Polar coordinates'] },
    taa: { name: 'Algo · Abstract types', short: 'TAA', course: 'Abstract algebraic types', open: 'Open TAA',
      exam: 'Written, on the exam paper · 1 hr this year according to Moodle (30 min, out of 10, in 2024)',
      chapters: ['Abstract types', 'Lists', 'Stacks, queues, sets'] },
    caml: { name: 'Algo · Caml', short: 'Caml', course: 'Caml and recursion', open: 'Open Caml',
      exam: 'Written · 1 hr 30 min · end of October',
      chapters: ['Language basics', 'Recursion', 'Lists', 'Higher-order functions'] },
    archi: { name: 'Architecture · Numeration', short: 'Archi', course: 'Computer architecture · Numeration', open: 'Open Archi',
      exam: 'Exam 1 hr, date not published · Moodle tests 10%',
      chapters: ['Number bases', 'Operations in base 2 and 16', 'Signed and unsigned integers', 'Floating-point numbers'] }
  };
  if (LANG === 'en') SUBJECTS.forEach(function (s) {
    var e = SUBJECTS_EN[s.id]; if (!e) return;
    ['name', 'short', 'course', 'open', 'exam'].forEach(function (k) { if (e[k]) s[k] = e[k]; });
    if (e.chapters && s.chapters) s.chapters.forEach(function (c, i) { if (e.chapters[i]) c.title = e.chapters[i]; });
  });
  function subject(id) { for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i]; return null; }

  /* ---------- stockage (toujours protégé : navigation privée, aperçus…) ---------- */
  var mem = null;
  function blank() { return { v: 1, read: {}, qcm: {}, ex: {}, exams: {}, last: null }; }
  function load() {
    if (mem) return mem;
    var d = null;
    try { d = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { d = null; }
    if (!d || d.v !== 1) d = blank();
    ['read', 'qcm', 'ex', 'exams'].forEach(function (k) { if (!d[k] || typeof d[k] !== 'object') d[k] = {}; });
    mem = d; return d;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* stockage indisponible */ } }
  function update(fn) { var d = load(); fn(d); save(); emit(); return d; }
  var listeners = [];
  function emit() { listeners.forEach(function (f) { try { f(mem); } catch (e) { } }); }
  window.addEventListener('storage', function (e) { if (e.key === KEY) { mem = null; load(); emit(); } });

  /* ---------- progression ---------- */
  var progress = {
    isRead: function (key) { return !!load().read[key]; },
    setRead: function (key, on) { update(function (d) { if (on) d.read[key] = Date.now(); else delete d.read[key]; }); },
    chapterDone: function (sid, cid) {
      var d = load(), n = 0, pre = sid + ':' + cid + ':';
      for (var k in d.read) if (k.indexOf(pre) === 0) n++;
      return n;
    },
    subject: function (sid) {
      var s = subject(sid); if (!s || !s.chapters) return null;
      var total = 0, done = 0;
      s.chapters.forEach(function (c) { total += c.sections; done += Math.min(c.sections, progress.chapterDone(sid, c.id)); });
      var q = qcm.stats(sid), ex = exo.stats(sid);
      return { sections: total, read: done, pctRead: total ? done / total : 0, qcm: q, ex: ex };
    }
  };

  /* ---------- QCM : répétition espacée (boîtes de Leitner) ---------- */
  var INTERVAL = [0, 1, 2, 4, 8, 16]; // en jours, indexé par la boîte
  var qcm = {
    get: function (id) { return load().qcm[id] || null; },
    record: function (id, ok) {
      update(function (d) {
        var s = d.qcm[id] || { n: 0, ok: 0, box: 0 };
        s.n++; if (ok) s.ok++;
        s.box = ok ? Math.min(5, (s.box || 0) + 1) : 1;
        s.last = Date.now(); s.lastOk = !!ok;
        s.due = s.last + INTERVAL[s.box] * DAY;
        d.qcm[id] = s;
      });
    },
    isDue: function (id, now) { var s = load().qcm[id]; return !!s && s.box < 5 && (s.due || 0) <= (now || Date.now()); },
    /* stats d'une matière à partir de la banque chargée (si elle l'est) ou des seuls ids vus */
    stats: function (sid, bank) {
      var d = load(), seen = 0, mastered = 0, due = 0, wrong = 0, now = Date.now();
      var ids = bank ? bank.map(function (q) { return q.id; }) : Object.keys(d.qcm).filter(function (k) { return k.indexOf(sid + '-') === 0; });
      ids.forEach(function (id) {
        var s = d.qcm[id]; if (!s) return;
        seen++; if (s.box >= 4) mastered++;
        if (s.box < 5 && (s.due || 0) <= now) due++;
        if (!s.lastOk) wrong++;
      });
      return { total: bank ? bank.length : null, seen: seen, mastered: mastered, due: due, wrong: wrong };
    },
    reset: function (prefix) { update(function (d) { for (var k in d.qcm) if (!prefix || k.indexOf(prefix) === 0) delete d.qcm[k]; }); }
  };

  /* ---------- exercices d'entraînement : auto-évaluation ---------- */
  var exo = {
    get: function (id) { return load().ex[id] || null; },
    set: function (id, state) { update(function (d) { if (state) d.ex[id] = { s: state, t: Date.now() }; else delete d.ex[id]; }); },
    stats: function (sid) {
      var d = load(), ok = 0, review = 0;
      for (var k in d.ex) if (k.indexOf(sid + '-') === 0) { if (d.ex[k].s === 'ok') ok++; else review++; }
      return { ok: ok, review: review };
    }
  };

  /* ---------- dates d'examen (saisies par l'élève) ---------- */
  var exams = {
    get: function (sid) { return load().exams[sid] || ''; },
    set: function (sid, iso) { update(function (d) { if (iso) d.exams[sid] = iso; else delete d.exams[sid]; }); },
    daysLeft: function (iso) {
      if (!iso) return null;
      var p = iso.split('-'); if (p.length !== 3) return null;
      var t = new Date(+p[0], +p[1] - 1, +p[2]); var n = new Date(); n.setHours(0, 0, 0, 0);
      return Math.round((t - n) / DAY);
    }
  };

  /* ---------- thème : système / clair / sombre ---------- */
  var THEME_KEY = 'rev-s1:theme';
  var theme = {
    get: function () { try { var t = localStorage.getItem(THEME_KEY); return t === 'light' || t === 'dark' ? t : 'system'; } catch (e) { return 'system'; } },
    apply: function (t) {
      var r = document.documentElement;
      if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t); else r.removeAttribute('data-theme');
    },
    set: function (t) { try { if (t === 'system') localStorage.removeItem(THEME_KEY); else localStorage.setItem(THEME_KEY, t); } catch (e) { } theme.apply(t); },
    cycle: function () { var o = ['system', 'light', 'dark'], t = o[(o.indexOf(theme.get()) + 1) % 3]; theme.set(t); return t; }
  };
  theme.apply(theme.get());

  /* ---------- utilitaires ---------- */
  var util = {
    $: function (s, r) { return (r || document).querySelector(s); },
    $$: function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); },
    nf: function (x, d) {
      if (d === undefined) d = 2;
      var p = Math.pow(10, d), v = Math.round(x * p) / p;
      return v.toLocaleString(LANG === 'en' ? 'en-GB' : 'fr-FR', { maximumFractionDigits: d }).replace(/^-/, '−'); // vrai signe moins
    },
    esc: function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); },
    shuffle: function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; },
    reduceMotion: function () { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); },
    inFrame: function () { try { return window.self !== window.top; } catch (e) { return true; } },
    tidy: tidy
  };

  /* ---------- typographie : « 15 V », « 6 pts », « bornes ? » ne se coupent pas en fin de ligne ----------
     Espace insécable entre un nombre et son unité et devant : ; ? ! », dans tout le texte affiché, y compris celui
     ajouté plus tard par les scripts (QCM, exercices, générateurs) grâce à un MutationObserver. */
  var UNIT = /(\d) (?=(?:[kmµM]?(?:V|A|W|Ω|Ω)|ms|s|min|h|pts?|%|°C)(?![A-Za-zÀ-ÿ0-9_]))/g;
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|CODE|PRE)$/;
  function tidyText(n) {
    if (n.data.indexOf(' ') < 0 || (n.parentNode && SKIP.test(n.parentNode.nodeName))) return;
    var t = n.data.replace(UNIT, '$1\u00a0').replace(/ ([:;?!»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
    if (t !== n.data) n.data = t;
  }
  function tidy(root) {
    if (!root) return;
    if (root.nodeType === 3) { tidyText(root); return; }
    if (root.nodeType !== 1 || SKIP.test(root.nodeName) || !document.createTreeWalker) return;
    var w = document.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */, null), n;
    while ((n = w.nextNode())) tidyText(n);
  }
  function watchTypography() {
    tidy(document.body);
    if (!window.MutationObserver) return;
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) for (var j = 0; j < list[i].addedNodes.length; j++) tidy(list[i].addedNodes[j]);
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* ---------- barre de navigation partagée ---------- */
  var ICONS = {
    system: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></svg>',
    light: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    dark: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
  };
  var DICT_CORE = {
    'Thème : système': 'Theme: system', 'Thème : clair': 'Theme: light', 'Thème : sombre': 'Theme: dark',
    'Accueil': 'Home', 'QCM': 'MCQ', 'Annales': 'Past exams', 'Fiches': 'Summaries', 'Révisions': 'Revision',
    'Navigation principale': 'Main navigation', 'Menu': 'Menu',
    'J’ai compris cette partie': 'I understand this part', 'Compris': 'Understood',
    'Langue': 'Language'
  };
  i18n.add(DICT_CORE);
  var THEME_LABEL = { system: t('Thème : système'), light: t('Thème : clair'), dark: t('Thème : sombre') };

  function navItems() {
    var items = [{ href: 'index.html', label: t('Accueil'), match: /^(index\.html)?$/ }];
    SUBJECTS.forEach(function (s) { if (s.status === 'ready') items.push({ href: s.path, label: s.short, match: new RegExp('^' + (s.dir || s.path)) }); });
    items.push({ href: 'qcm/index.html', label: t('QCM'), match: /^qcm\// });
    items.push({ href: 'annales/index.html', label: t('Annales'), match: /^annales\// });
    items.push({ href: 'fiches/index.html', label: t('Fiches'), match: /^fiches\// });
    return items;
  }
  function url(p) { var u = ROOT + p; return LANG === 'en' ? enHref(u) : u; }
  function buildShell() {
    var host = document.getElementById('shell');
    if (!host || host.dataset.built) return;
    host.dataset.built = '1';
    var cur = here().replace(/\.en\.html$/i, '.html');
    var links = navItems().map(function (it) {
      var on = it.match.test(cur);
      return '<a href="' + url(it.href) + '"' + (on ? ' aria-current="page"' : '') + '>' + it.label + '</a>';
    }).join('');
    var lang = ['fr', 'en'].map(function (l) {
      return '<a href="' + twin(l) + '" hreflang="' + l + '" lang="' + l + '" data-lang="' + l + '"' + (l === LANG ? ' aria-current="true"' : '') +
        ' title="' + (l === 'fr' ? 'Lire en français' : 'Read in English') + '">' + l.toUpperCase() + '</a>';
    }).join('');
    host.className = 'shell';
    host.innerHTML =
      '<div class="shell-in">' +
      '<a class="shell-brand" href="' + url('index.html') + '"><span class="shell-mark" aria-hidden="true">S1</span><span class="shell-name">' + t('Révisions') + '</span></a>' +
      '<nav class="shell-nav" id="shell-nav" aria-label="' + t('Navigation principale') + '">' + links + '</nav>' +
      '<div class="shell-tools">' +
      '<div class="shell-lang" role="group" aria-label="Langue · Language">' + lang + '</div>' +
      '<button type="button" class="shell-btn" id="shell-theme"></button>' +
      '<button type="button" class="shell-btn shell-menu" id="shell-menu" aria-expanded="false" aria-controls="shell-nav" aria-label="' + t('Menu') + '">' + ICONS.menu + '</button>' +
      '</div></div>';
    util.$$('.shell-lang a', host).forEach(function (a) {
      a.addEventListener('click', function (e) {
        var l = a.getAttribute('data-lang');
        setLangPref(l);
        if (l === LANG) { e.preventDefault(); return; }
        a.setAttribute('href', twin(l));
      });
    });
    langHint(host);
    var tb = document.getElementById('shell-theme');
    function paint() { var t = theme.get(); tb.innerHTML = ICONS[t]; tb.setAttribute('aria-label', THEME_LABEL[t]); tb.title = THEME_LABEL[t]; }
    paint();
    tb.addEventListener('click', function () { theme.cycle(); paint(); document.dispatchEvent(new CustomEvent('rev:theme')); });
    var mb = document.getElementById('shell-menu'), nav = document.getElementById('shell-nav');
    mb.addEventListener('click', function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', String(o)); });
  }

  /* ---------- boutons « J'ai compris » des sections de cours ---------- */
  function wireDoneButtons() {
    util.$$('[data-done]').forEach(function (b) {
      if (b.dataset.wired) return; b.dataset.wired = '1';
      var key = b.getAttribute('data-done');
      function paint() {
        var on = progress.isRead(key);
        b.setAttribute('aria-pressed', String(on));
        b.innerHTML = on ? '<span aria-hidden="true">✓</span> ' + t('Compris') : t('J’ai compris cette partie');
        util.$$('[data-toc-key="' + key + '"]').forEach(function (a) { a.classList.toggle('done', on); });
      }
      b.addEventListener('click', function () { progress.setRead(key, !progress.isRead(key)); paint(); });
      paint();
    });
  }

  /* ---------- dernière page visitée (pour « Reprendre ») ---------- */
  function rememberVisit() {
    var b = document.body; if (!b || !b.hasAttribute('data-resume')) return;
    var cur = here().replace(/\.en\.html$/i, '.html'); if (!cur) return;
    var d = load();
    d.last = { href: cur, title: b.getAttribute('data-resume') || document.title, t: Date.now() };
    save();
  }

  /* ---------- page anglaise : liens internes vers les pages anglaises ---------- */
  function localizeLinks(root) {
    if (LANG !== 'en' || !root || root.nodeType !== 1) return;
    var list = root.matches && root.matches('a[href]') ? [root] : [];
    list = list.concat(util.$$('a[href]', root));
    list.forEach(function (a) {
      if (a.hasAttribute('hreflang')) return;
      var h = a.getAttribute('href'), n = enHref(h);
      if (n !== h) a.setAttribute('href', n);
    });
  }
  function watchLinks() {
    if (LANG !== 'en') return;
    localizeLinks(document.body);
    if (window.MutationObserver) new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) for (var j = 0; j < list[i].addedNodes.length; j++) localizeLinks(list[i].addedNodes[j]);
    }).observe(document.body, { childList: true, subtree: true });
    /* filet de sécurité : un lien dont l'adresse a été changée après coup */
    document.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (a && !a.hasAttribute('hreflang')) { var h = a.getAttribute('href'), n = enHref(h); if (n !== h) a.setAttribute('href', n); }
    }, true);
  }

  /* ---------- navigateur non francophone, aucun choix fait : proposer l'anglais une fois ---------- */
  function langHint(host) {
    if (LANG !== 'fr' || pref) return;
    var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']).join(',').toLowerCase();
    if (!langs || /(^|,)fr/.test(langs)) return;
    var bar = document.createElement('div');
    bar.className = 'shell-hint'; bar.setAttribute('lang', 'en');
    bar.innerHTML = '<div class="shell-hint-in"><span>This whole site is also available in English.</span>' +
      '<a href="' + twin('en') + '" hreflang="en" data-go="en">Read in English</a>' +
      '<button type="button" data-go="fr" lang="fr">Rester en français</button></div>';
    host.appendChild(bar);
    util.$$('[data-go]', bar).forEach(function (b) {
      b.addEventListener('click', function () { setLangPref(b.getAttribute('data-go')); if (b.tagName === 'BUTTON') bar.remove(); });
    });
  }

  document.addEventListener('DOMContentLoaded', function () { buildShell(); wireDoneButtons(); rememberVisit(); watchTypography(); watchLinks(); });

  window.REV = {
    root: ROOT, lang: LANG, t: t, i18n: i18n,
    url: url,
    subjects: SUBJECTS, subject: subject,
    store: { load: load, save: save, update: update, on: function (f) { listeners.push(f); } },
    progress: progress, qcm: qcm, exo: exo, exams: exams, theme: theme, util: util,
    wireDoneButtons: wireDoneButtons
  };
})();
