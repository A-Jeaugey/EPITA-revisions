/* Révisions S1 — noyau partagé.
   Chargé de façon bloquante dans le <head> de chaque page :
   thème, stockage local, registre des matières, progression, barre de navigation. */
(function () {
  'use strict';

  var script = document.currentScript;
  var ROOT = script ? script.src.replace(/assets\/js\/core\.js(?:[?#].*)?$/, '') : './';
  var KEY = 'rev-s1:v1';
  var DAY = 86400000;

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
    { id: 'maths', name: 'Mathématiques', short: 'Maths', status: 'soon', annales: 'Maths PC' },
    { id: 'physique', name: 'Physique', short: 'Physique', status: 'soon', annales: 'Phys' },
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
    { id: 'caml', name: 'Algo · Caml', short: 'Caml', status: 'soon', annalesId: 'algo' },
    { id: 'archi', name: 'Architecture', short: 'Archi', status: 'soon', annales: 'Archi' }
  ];
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
      return v.toLocaleString('fr-FR', { maximumFractionDigits: d });
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
  var THEME_LABEL = { system: 'Thème : système', light: 'Thème : clair', dark: 'Thème : sombre' };

  function navItems() {
    var items = [{ href: 'index.html', label: 'Accueil', match: /^(index\.html)?$/ }];
    SUBJECTS.forEach(function (s) { if (s.status === 'ready') items.push({ href: s.path, label: s.short, match: new RegExp('^' + (s.dir || s.path)) }); });
    items.push({ href: 'qcm/index.html', label: 'QCM', match: /^qcm\// });
    items.push({ href: 'annales/index.html', label: 'Annales', match: /^annales\// });
    items.push({ href: 'fiches/index.html', label: 'Fiches', match: /^fiches\// });
    return items;
  }
  function here() {
    var h = location.href.split('#')[0].split('?')[0];
    return h.indexOf(ROOT) === 0 ? h.slice(ROOT.length) : '';
  }
  function buildShell() {
    var host = document.getElementById('shell');
    if (!host || host.dataset.built) return;
    host.dataset.built = '1';
    var cur = here();
    var links = navItems().map(function (it) {
      var on = it.match.test(cur);
      return '<a href="' + ROOT + it.href + '"' + (on ? ' aria-current="page"' : '') + '>' + it.label + '</a>';
    }).join('');
    host.className = 'shell';
    host.innerHTML =
      '<div class="shell-in">' +
      '<a class="shell-brand" href="' + ROOT + 'index.html"><span class="shell-mark" aria-hidden="true">S1</span><span class="shell-name">Révisions</span></a>' +
      '<nav class="shell-nav" id="shell-nav" aria-label="Navigation principale">' + links + '</nav>' +
      '<div class="shell-tools">' +
      '<button type="button" class="shell-btn" id="shell-theme"></button>' +
      '<button type="button" class="shell-btn shell-menu" id="shell-menu" aria-expanded="false" aria-controls="shell-nav" aria-label="Menu">' + ICONS.menu + '</button>' +
      '</div></div>';
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
        b.innerHTML = on ? '<span aria-hidden="true">✓</span> Compris' : 'J’ai compris cette partie';
        util.$$('[data-toc-key="' + key + '"]').forEach(function (a) { a.classList.toggle('done', on); });
      }
      b.addEventListener('click', function () { progress.setRead(key, !progress.isRead(key)); paint(); });
      paint();
    });
  }

  /* ---------- dernière page visitée (pour « Reprendre ») ---------- */
  function rememberVisit() {
    var b = document.body; if (!b || !b.hasAttribute('data-resume')) return;
    var cur = here(); if (!cur) return;
    var d = load();
    d.last = { href: cur, title: b.getAttribute('data-resume') || document.title, t: Date.now() };
    save();
  }

  document.addEventListener('DOMContentLoaded', function () { buildShell(); wireDoneButtons(); rememberVisit(); watchTypography(); });

  window.REV = {
    root: ROOT,
    url: function (p) { return ROOT + p; },
    subjects: SUBJECTS, subject: subject,
    store: { load: load, save: save, update: update, on: function (f) { listeners.push(f); } },
    progress: progress, qcm: qcm, exo: exo, exams: exams, theme: theme, util: util,
    wireDoneButtons: wireDoneButtons
  };
})();
