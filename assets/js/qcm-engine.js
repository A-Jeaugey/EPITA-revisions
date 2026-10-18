/* Révisions S1 — moteur de questions.
   Banque : chaque fichier data/qcm/<matiere>.js ajoute ses questions à window.QCM_BANK
   et le nom lisible de ses notions à window.QCM_TOPICS.
   Question :
   { id:'elec-xxx', s:'elec', topic:'diviseur-tension', lvl:1..3,
     type:'single'|'multi'|'tf'|'num',
     q:'énoncé HTML', fig:{…spec circuit…} | { code:'spécification TAA' } | '<svg…>',
     o:['option HTML', …],              // single / multi
     a: 0 | [0,2] | true | 2.5,          // bonne(s) réponse(s) ; num : valeur attendue
     unit:'V', tol:0.01,                 // num : unité affichée, tolérance relative
     x:'explication HTML', ref:'elec/cours-2-lois.html#s4', src:'Midterm 2024 · Ex 1' } */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t;
  window.QCM_BANK = window.QCM_BANK || [];
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
  R.i18n.add({
    'Vrai': 'True', 'Faux': 'False', 'Question {i} / {n}': 'Question {i} / {n}', 'plusieurs réponses possibles': 'several answers possible',
    'Ta réponse': 'Your answer', 'ex. 2,5 ou 5/2': 'e.g. 2.5 or 5/2', 'un nombre : 2,5 ou 5/2': 'a number: 2.5 or 5/2', 'Valider': 'Check',
    'Réponses': 'Answers', 'Juste.': 'Correct.', 'Sans réponse.': 'No answer.', 'Pas tout à fait.': 'Not quite.',
    'Réponse attendue : {a}.': 'Expected answer: {a}.', 'Revoir dans le cours →': 'Review it in the course →',
    'Vérifie que c’est rentré': 'Check that it stuck', ' · parfait': ' · perfect', ' · relis les explications': ' · reread the explanations'
  });

  /* Pages anglaises : textes de data/en/qcm/… (REV.i18n.qcm), posés sur la question en gardant le français dans q._fr
     pour le dédoublonnage ; la provenance (src) se traduit d'elle-même. */
  function srcEN(s) {
    return String(s).replace(/QCM hebdo promo (\d+) · n°\s?(\d+)/, 'Weekly MCQ, class of $1 · no. $2')
      .replace(/\bPartiels\b/g, 'Midterms').replace(/\bPartiel\b/g, 'Midterm').replace(/ et /g, ' and ').replace(/\bCours\b/g, 'Course');
  }
  function localize() {
    if (R.lang !== 'en') return;
    var E = window.QCM_EN || {};
    (window.QCM_BANK || []).forEach(function (q) {
      if (q.src) q.src = srcEN(q.src);
      if (q._fr || !E[q.id]) return;
      q._fr = { q: q.q, o: q.o && q.o.slice(), fig: q.fig && typeof q.fig === 'object' ? JSON.parse(JSON.stringify(q.fig)) : q.fig };
      R.i18n.merge(q, E[q.id]);
    });
  }

  function fig(q) {
    if (!q.fig) return '';
    /* fig : HTML, { code: 'spécification' } (types abstraits, voir spec.js) ou description de schéma (circuit.js) */
    var inner = typeof q.fig === 'string' ? q.fig
      : q.fig.code != null ? (R.spec ? R.spec(q.fig.code) : '<pre class="spec">' + U.esc(q.fig.code) + '</pre>')
      : R.circuit(q.fig);
    return '<div class="qz-fig">' + inner + '</div>';
  }
  function optsOf(q) { return q.type === 'tf' ? [T('Vrai'), T('Faux')] : (q.o || []); }
  function correctSet(q) {
    if (q.type === 'tf') return [q.a ? 0 : 1];
    if (q.type === 'multi') return (Array.isArray(q.a) ? q.a : [q.a]).slice().sort();
    return [q.a];
  }
  function parseNum(str) {
    if (str == null) return NaN;
    var s = String(str).trim().replace(/\s/g, '').replace(/,/g, '.').replace(/−/g, '-');
    var m = s.match(/^(-?[0-9.]+)\/(-?[0-9.]+)$/);
    if (m) return parseFloat(m[1]) / parseFloat(m[2]);
    if (!/^-?[0-9]*\.?[0-9]+(e-?[0-9]+)?$/i.test(s)) return NaN;
    return parseFloat(s);
  }
  function checkNum(q, val) {
    var v = parseNum(val); if (!isFinite(v)) return null;
    var t = q.tol == null ? 0.01 : q.tol, a = +q.a;
    return Math.abs(v - a) <= Math.max(Math.abs(a) * t, 1e-9);
  }
  function sameSet(a, b) { if (a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  function fmtAnswer(q) {
    if (q.type === 'num') return U.nf(+q.a, 4) + (q.unit ? ' ' + q.unit : '');
    var o = optsOf(q);
    return correctSet(q).map(function (i) { return o[i]; }).join(' · ');
  }
  function topicName(t) { return (R.lang === 'en' && window.QCM_TOPICS_EN && window.QCM_TOPICS_EN[t]) || (window.QCM_TOPICS && window.QCM_TOPICS[t]) || t; }

  /* ---- une carte question ----
     opts : { index, total, mode:'train'|'check'|'exam', onAnswer(ok, q, state), shuffle, record }
     En mode 'exam' : pas de correction affichée, la réponse reste modifiable jusqu'à submit(). */
  function Card(q, opts) {
    opts = opts || {};
    var el = document.createElement('article');
    el.className = 'qz';
    el.setAttribute('data-qid', q.id);
    var order = optsOf(q).map(function (_, i) { return i; });
    if (opts.shuffle && q.type !== 'tf' && !q.keep) order = U.shuffle(order);
    var state = { done: false, picked: [], ok: null, value: '', hidden: opts.mode === 'exam' };

    function head() {
      var meta = [];
      if (opts.total) meta.push('<span class="qz-n">' + T('Question {i} / {n}', { i: opts.index + 1, n: opts.total }) + '</span>');
      meta.push('<span class="qz-chip">' + U.esc(topicName(q.topic)) + '</span>');
      if (q.src) meta.push('<span class="qz-chip qz-src">' + U.esc(q.src) + '</span>');
      if (q.type === 'multi') meta.push('<span class="qz-chip qz-multi">' + T('plusieurs réponses possibles') + '</span>');
      return '<div class="qz-meta">' + meta.join('') + '</div>';
    }
    function render() {
      var o = optsOf(q), body = '', locked = state.done;
      var showing = state.done && !state.hidden;
      if (q.type === 'num') {
        body = '<form class="qz-num" novalidate><label class="sr-only" for="n-' + q.id + '">' + T('Ta réponse') + '</label>' +
          '<input id="n-' + q.id + '" inputmode="decimal" autocomplete="off" placeholder="' + T('ex. 2,5 ou 5/2') + '" value="' + U.esc(state.value) + '"' + (locked ? ' disabled' : '') + '>' +
          (q.unit ? '<span class="qz-unit">' + U.esc(q.unit) + '</span>' : '') +
          (locked || opts.mode === 'exam' ? '' : '<button class="qz-go" type="submit">' + T('Valider') + '</button>') + '</form>';
      } else {
        body = '<div class="qz-opts" role="group" aria-label="' + T('Réponses') + '">' + order.map(function (i, k) {
          var cls = 'qz-opt', picked = state.picked.indexOf(i) >= 0;
          if (showing) {
            var good = correctSet(q).indexOf(i) >= 0;
            if (good) cls += ' right'; else if (picked) cls += ' wrong';
          } else if (picked) cls += ' picked';
          return '<button type="button" class="' + cls + '" data-i="' + i + '"' + (locked ? ' disabled' : '') + ' aria-pressed="' + picked + '">' +
            '<span class="qz-key">' + LETTERS[k] + '</span><span class="qz-txt">' + o[i] + '</span></button>';
        }).join('') + '</div>';
        if (q.type === 'multi' && !locked && opts.mode !== 'exam') body += '<div class="qz-row"><button type="button" class="qz-go" data-validate>' + T('Valider') + '</button></div>';
      }
      var fb = '';
      if (showing) {
        var skipped = !state.picked.length && !state.value;
        fb = '<div class="qz-fb ' + (state.ok ? 'ok' : 'no') + '" role="status"><b>' + T(state.ok ? 'Juste.' : (skipped ? 'Sans réponse.' : 'Pas tout à fait.')) + '</b> ' +
          (state.ok ? '' : '<span class="qz-sol">' + T('Réponse attendue : {a}.', { a: fmtAnswer(q) }) + '</span> ') + (q.x || '') +
          (q.ref ? ' <a class="qz-ref" href="' + R.url(q.ref) + '">' + T('Revoir dans le cours →') + '</a>' : '') + '</div>';
      }
      el.innerHTML = head() + '<div class="qz-q">' + q.q + '</div>' + fig(q) + body + fb;
      wire();
    }
    function finish(ok) {
      state.done = true; state.ok = ok;
      if (opts.record !== false) R.qcm.record(q.id, ok);
      render();
      if (opts.onAnswer) opts.onAnswer(ok, q, state);
    }
    function evaluate() {
      if (q.type === 'num') { var r = checkNum(q, state.value); return r === true; }
      if (!state.picked.length) return false;
      return sameSet(state.picked.slice().sort(), correctSet(q));
    }
    function wire() {
      if (state.done) return;
      if (q.type === 'num') {
        var f = el.querySelector('form'), inp = el.querySelector('input');
        inp.addEventListener('input', function () { state.value = inp.value; inp.removeAttribute('aria-invalid'); if (opts.onPick) opts.onPick(); });
        f.addEventListener('submit', function (e) {
          e.preventDefault(); state.value = inp.value;
          if (opts.mode === 'exam') { if (opts.onEnter) opts.onEnter(); return; }
          var r = checkNum(q, inp.value);
          if (r === null) { inp.setAttribute('aria-invalid', 'true'); inp.value = ''; inp.placeholder = T('un nombre : 2,5 ou 5/2'); inp.focus(); return; }
          finish(r);
        });
        return;
      }
      U.$$('.qz-opt', el).forEach(function (b) {
        b.addEventListener('click', function () {
          var i = +b.getAttribute('data-i');
          if (q.type === 'multi') {
            var k = state.picked.indexOf(i);
            if (k >= 0) state.picked.splice(k, 1); else state.picked.push(i);
            render(); var nb = el.querySelector('[data-i="' + i + '"]'); if (nb) nb.focus();
            if (opts.onPick) opts.onPick();
          } else if (opts.mode === 'exam') {
            state.picked = [i]; render(); var nb2 = el.querySelector('[data-i="' + i + '"]'); if (nb2) nb2.focus();
            if (opts.onPick) opts.onPick();
          } else { state.picked = [i]; finish(correctSet(q)[0] === i); }
        });
      });
      var v = el.querySelector('[data-validate]');
      if (v) v.addEventListener('click', function () { if (state.picked.length) finish(evaluate()); });
    }
    /* raccourcis : 1-6 ou a-f pour choisir, Entrée pour valider */
    el.key = function (k) {
      if (state.done || q.type === 'num') return false;
      var n = '123456'.indexOf(k); if (n < 0 && k.length === 1) n = 'abcdef'.indexOf(k.toLowerCase());
      if (n >= 0 && n < order.length) { var b = el.querySelector('[data-i="' + order[n] + '"]'); if (b) { b.click(); return true; } }
      if (k === 'Enter' && q.type === 'multi') { var v = el.querySelector('[data-validate]'); if (v) { v.click(); return true; } }
      return false;
    };
    /* termine la question avec la réponse en cours (mode examen) */
    el.submit = function () { if (!state.done) finish(evaluate()); return state.ok; };
    el.reveal = function () { state.hidden = false; render(); };
    el.answered = function () { return state.done; };
    el.hasPick = function () { return q.type === 'num' ? !!String(state.value).trim() : state.picked.length > 0; };
    el.state = state; el.q = q;
    render();
    return el;
  }

  /* ---- vérification en fin de section de cours : toutes les questions visibles ---- */
  function mountCheck(host, ids, title) {
    if (typeof host === 'string') host = document.querySelector(host);
    if (!host) return;
    var qs = ids.map(byId).filter(Boolean);
    if (!qs.length) return;
    var score = 0, answered = 0;
    host.classList.add('qz-check');
    host.innerHTML = '<div class="qz-check-head"><span class="qz-check-t">' + (title || T('Vérifie que c’est rentré')) + '</span><span class="qz-check-s" aria-live="polite">0 / ' + qs.length + '</span></div>';
    var list = document.createElement('div'); list.className = 'qz-list'; host.appendChild(list);
    qs.forEach(function (q, i) {
      list.appendChild(Card(q, {
        index: i, total: qs.length, mode: 'check', shuffle: true,
        onAnswer: function (ok) {
          answered++; if (ok) score++;
          host.querySelector('.qz-check-s').textContent = score + ' / ' + qs.length + (answered === qs.length ? T(score === qs.length ? ' · parfait' : ' · relis les explications') : '');
        }
      }));
    });
  }

  function byId(id) { localize(); var B = window.QCM_BANK || []; for (var i = 0; i < B.length; i++) if (B[i].id === id) return B[i]; return null; }

  /* Banque dédoublonnée. Une même question peut venir de plusieurs sources (un QCM hebdo repris au partiel,
     une question reposée d'une promo à l'autre) : on n'en garde qu'un exemplaire, le plus parlant
     (partiel > TD > cours > QCM hebdo), et les autres identifiants vont dans q.alt pour les filtres.
     Deux questions sont identiques si énoncé, options (dans n'importe quel ordre), bonne réponse et figure
     sont les mêmes ; « Vrai / Faux » et une question à choix « VRAI / FAUX » se confondent.
     Une question reformulée se déclare à la main : same:'<id de l'autre exemplaire>'.
     Une question tombée ailleurs sans y avoir sa propre fiche le dit avec also:['elec-p2017-q3', …]. */
  function nkey(t) {
    var s = String(t == null ? '' : t).replace(/<[^>]+>/g, '');
    if (s.normalize) s = s.normalize('NFKC');
    return s.toLowerCase().replace(/[’‘`´]/g, '\'').replace(/[−–—]/g, '-').replace(/\s+/g, '');
  }
  function figKey(q) {
    var f = q._fr ? q._fr.fig : q.fig;
    if (!f) return '';
    if (typeof f !== 'string') return JSON.stringify(f);
    var m = /src="([^"]+)"/.exec(f);
    return m ? m[1] : nkey(f);
  }
  /* toujours sur le texte français, pour que les deux langues gardent les mêmes questions */
  function dupKey(q) {
    var fr = q._fr || q, o = (q.type === 'tf' ? ['Vrai', 'Faux'] : (fr.o || [])).map(nkey);
    var good = q.type === 'num' ? [String(q.a)] : correctSet(q).map(function (i) { return o[i]; });
    return [q.s, nkey(fr.q), o.slice().sort().join('|'), good.sort().join('|'), figKey(q)].join('#');
  }
  function rank(id) { return /^[a-z]+-p20\d\d[a-z]?-/.test(id) ? 0 : /^[a-z]+-td/.test(id) ? 1 : /^[a-z]+-mcq/.test(id) ? 3 : 2; }
  var cache = { n: -1, list: [] };
  function bank() {
    localize();
    var all = window.QCM_BANK || [];
    if (cache.n === all.length) return cache.list;
    var seen = {}, list = [], byKey = {}, later = [];
    all.forEach(function (q) { delete q.alt; byKey[q.id] = q; });
    all.forEach(function (q) {
      if (q.same && q.same !== q.id && byKey[q.same]) { later.push(q); return; }
      var k = dupKey(q), prev = seen[k];
      if (!prev) { seen[k] = q; list.push(q); return; }
      if (rank(q.id) < rank(prev.id)) {
        q.alt = [prev.id].concat(prev.alt || []); delete prev.alt;
        list[list.indexOf(prev)] = q; seen[k] = q;
      } else (prev.alt = prev.alt || []).push(q.id);
    });
    /* doublons déclarés : rattachés à l'exemplaire gardé de la question visée */
    later.forEach(function (q) {
      var m = byKey[q.same], hops = 0;
      while (m.same && byKey[m.same] && m.same !== m.id && hops++ < 5) m = byKey[m.same];
      var rep = seen[dupKey(m)];
      if (rep) (rep.alt = rep.alt || []).push(q.id); else list.push(q);
    });
    cache = { n: all.length, list: list };
    return list;
  }
  /* tous les identifiants d'une question (le sien et ceux de ses doublons) */
  function ids(q) { return q.alt || q.also ? [q.id].concat(q.alt || [], q.also || []) : [q.id]; }

  R.quiz = { Card: Card, mountCheck: mountCheck, byId: byId, bank: bank, ids: ids, correctSet: correctSet, fmtAnswer: fmtAnswer, optsOf: optsOf, topicName: topicName, parseNum: parseNum };
})();
