/* Révisions S1 — moteur de questions.
   Banque : chaque fichier data/qcm/<matiere>.js ajoute ses questions à window.QCM_BANK
   et le nom lisible de ses notions à window.QCM_TOPICS.
   Question :
   { id:'elec-xxx', s:'elec', topic:'diviseur-tension', lvl:1..3,
     type:'single'|'multi'|'tf'|'num',
     q:'énoncé HTML', fig:{…spec circuit…} | '<svg…>',
     o:['option HTML', …],              // single / multi
     a: 0 | [0,2] | true | 2.5,          // bonne(s) réponse(s) ; num : valeur attendue
     unit:'V', tol:0.01,                 // num : unité affichée, tolérance relative
     x:'explication HTML', ref:'elec/cours-2-lois.html#s4', src:'Midterm 2024 · Ex 1' } */
(function () {
  'use strict';
  var R = window.REV, U = R.util;
  window.QCM_BANK = window.QCM_BANK || [];
  var LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

  function fig(q) {
    if (!q.fig) return '';
    var inner = typeof q.fig === 'string' ? q.fig : R.circuit(q.fig);
    return '<div class="qz-fig">' + inner + '</div>';
  }
  function optsOf(q) { return q.type === 'tf' ? ['Vrai', 'Faux'] : (q.o || []); }
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
  function topicName(t) { return (window.QCM_TOPICS && window.QCM_TOPICS[t]) || t; }

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
      if (opts.total) meta.push('<span class="qz-n">Question ' + (opts.index + 1) + ' / ' + opts.total + '</span>');
      meta.push('<span class="qz-chip">' + U.esc(topicName(q.topic)) + '</span>');
      if (q.src) meta.push('<span class="qz-chip qz-src">' + U.esc(q.src) + '</span>');
      if (q.type === 'multi') meta.push('<span class="qz-chip qz-multi">plusieurs réponses possibles</span>');
      return '<div class="qz-meta">' + meta.join('') + '</div>';
    }
    function render() {
      var o = optsOf(q), body = '', locked = state.done;
      var showing = state.done && !state.hidden;
      if (q.type === 'num') {
        body = '<form class="qz-num" novalidate><label class="sr-only" for="n-' + q.id + '">Ta réponse</label>' +
          '<input id="n-' + q.id + '" inputmode="decimal" autocomplete="off" placeholder="ex. 2,5 ou 5/2" value="' + U.esc(state.value) + '"' + (locked ? ' disabled' : '') + '>' +
          (q.unit ? '<span class="qz-unit">' + U.esc(q.unit) + '</span>' : '') +
          (locked || opts.mode === 'exam' ? '' : '<button class="qz-go" type="submit">Valider</button>') + '</form>';
      } else {
        body = '<div class="qz-opts" role="group" aria-label="Réponses">' + order.map(function (i, k) {
          var cls = 'qz-opt', picked = state.picked.indexOf(i) >= 0;
          if (showing) {
            var good = correctSet(q).indexOf(i) >= 0;
            if (good) cls += ' right'; else if (picked) cls += ' wrong';
          } else if (picked) cls += ' picked';
          return '<button type="button" class="' + cls + '" data-i="' + i + '"' + (locked ? ' disabled' : '') + ' aria-pressed="' + picked + '">' +
            '<span class="qz-key">' + LETTERS[k] + '</span><span class="qz-txt">' + o[i] + '</span></button>';
        }).join('') + '</div>';
        if (q.type === 'multi' && !locked && opts.mode !== 'exam') body += '<div class="qz-row"><button type="button" class="qz-go" data-validate>Valider</button></div>';
      }
      var fb = '';
      if (showing) {
        var skipped = !state.picked.length && !state.value;
        fb = '<div class="qz-fb ' + (state.ok ? 'ok' : 'no') + '" role="status"><b>' + (state.ok ? 'Juste.' : (skipped ? 'Sans réponse.' : 'Pas tout à fait.')) + '</b> ' +
          (state.ok ? '' : '<span class="qz-sol">Réponse attendue : ' + fmtAnswer(q) + '.</span> ') + (q.x || '') +
          (q.ref ? ' <a class="qz-ref" href="' + R.url(q.ref) + '">Revoir dans le cours →</a>' : '') + '</div>';
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
          if (r === null) { inp.setAttribute('aria-invalid', 'true'); inp.value = ''; inp.placeholder = 'un nombre : 2,5 ou 5/2'; inp.focus(); return; }
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
    host.innerHTML = '<div class="qz-check-head"><span class="qz-check-t">' + (title || 'Vérifie que c’est rentré') + '</span><span class="qz-check-s" aria-live="polite">0 / ' + qs.length + '</span></div>';
    var list = document.createElement('div'); list.className = 'qz-list'; host.appendChild(list);
    qs.forEach(function (q, i) {
      list.appendChild(Card(q, {
        index: i, total: qs.length, mode: 'check', shuffle: false,
        onAnswer: function (ok) {
          answered++; if (ok) score++;
          host.querySelector('.qz-check-s').textContent = score + ' / ' + qs.length + (answered === qs.length ? (score === qs.length ? ' · parfait' : ' · relis les explications') : '');
        }
      }));
    });
  }

  function byId(id) { var B = window.QCM_BANK || []; for (var i = 0; i < B.length; i++) if (B[i].id === id) return B[i]; return null; }

  /* Banque dédoublonnée. Une même question peut venir de plusieurs sources (un QCM hebdo repris au partiel,
     une question reposée d'une promo à l'autre) : on n'en garde qu'un exemplaire, le plus parlant
     (partiel > TD > cours > QCM hebdo), et les autres identifiants vont dans q.alt pour les filtres.
     Deux questions sont identiques si énoncé, options (dans n'importe quel ordre), bonne réponse et figure
     sont les mêmes ; « Vrai / Faux » et une question à choix « VRAI / FAUX » se confondent. */
  function nkey(t) {
    var s = String(t == null ? '' : t).replace(/<[^>]+>/g, '');
    if (s.normalize) s = s.normalize('NFKC');
    return s.toLowerCase().replace(/[’‘`´]/g, '\'').replace(/[−–—]/g, '-').replace(/\s+/g, '');
  }
  function figKey(q) {
    if (!q.fig) return '';
    if (typeof q.fig !== 'string') return JSON.stringify(q.fig);
    var m = /src="([^"]+)"/.exec(q.fig);
    return m ? m[1] : nkey(q.fig);
  }
  function dupKey(q) {
    var o = optsOf(q).map(nkey);
    var good = q.type === 'num' ? [String(q.a)] : correctSet(q).map(function (i) { return o[i]; });
    return [q.s, nkey(q.q), o.slice().sort().join('|'), good.sort().join('|'), figKey(q)].join('#');
  }
  function rank(id) { return /^[a-z]+-p20\d\d-/.test(id) ? 0 : /^[a-z]+-td/.test(id) ? 1 : /^[a-z]+-mcq/.test(id) ? 3 : 2; }
  var cache = { n: -1, list: [] };
  function bank() {
    var all = window.QCM_BANK || [];
    if (cache.n === all.length) return cache.list;
    var seen = {}, list = [];
    all.forEach(function (q) { delete q.alt; });
    all.forEach(function (q) {
      var k = dupKey(q), prev = seen[k];
      if (!prev) { seen[k] = q; list.push(q); return; }
      if (rank(q.id) < rank(prev.id)) {
        q.alt = [prev.id].concat(prev.alt || []); delete prev.alt;
        list[list.indexOf(prev)] = q; seen[k] = q;
      } else (prev.alt = prev.alt || []).push(q.id);
    });
    cache = { n: all.length, list: list };
    return list;
  }
  /* tous les identifiants d'une question (le sien et ceux de ses doublons) */
  function ids(q) { return q.alt ? [q.id].concat(q.alt) : [q.id]; }

  R.quiz = { Card: Card, mountCheck: mountCheck, byId: byId, bank: bank, ids: ids, correctSet: correctSet, fmtAnswer: fmtAnswer, optsOf: optsOf, topicName: topicName, parseNum: parseNum };
})();
