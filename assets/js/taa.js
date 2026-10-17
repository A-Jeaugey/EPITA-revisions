/* TAA — comportements communs aux pages et petits outils interactifs.

   Pages : numéros de parties en piles d'assiettes (<span class="plates" data-n="3">), sommaire actif,
   barre de lecture, vérifications de fin de partie (<div data-check="id1,id2"> ou
   <div data-check-ref="taa/cours-1-types.html#s2" data-n="3">), blocs <pre data-spec>.

   Termes (R.taa.term) : parse('sommet(empiler(pilevide, a))'), show(t, options), eq(t, u).
     Syntaxe : appels f(a, b), atomes (pilevide, a, 3, Vrai…), opérateurs infixes ∈ et ou = + -
     (les plus faibles d'abord : ou, et, ∈ et =, puis + et -), parenthèses.

   Réécriture (R.taa.rewrite) : jeux d'axiomes PILE, FILE, LISTE, BOOL, ENSEMBLE, que l'on peut compléter.
     Chaque axiome : { id, l, r, c?, cv?, neq? } — l et r sont des termes (variables : celles de vars),
     c/cv une condition (« estvide(f) » doit valoir cv), eq/neq une égalité d'éléments (x = y).
     trace(terme, jeu) rend la suite des étapes (terme avant, position réécrite, axiome, conditions).

   Bancs : R.taa.stepper(el, opts), R.taa.stackBench(el), R.taa.queueBench(el), R.taa.ranksBench(el),
   R.taa.sorter(el, opts).

   Pages anglaises : les jeux d'axiomes sont renommés avec le vocabulaire des sujets anglais (push, pop, top,
   isempty, emptystack… voir EN_NAMES) ; les termes des bancs s'écrivent alors avec ces noms. */
(function () {
  'use strict';
  var R = window.REV, U = R.util, T = R.t, EN = R.lang === 'en';
  function esc(s) { return U.esc(String(s)); }
  R.i18n.add({
    'caractère inattendu : {c}': 'unexpected character: {c}', 'terme incomplet': 'incomplete term', 'parenthèse manquante': 'missing parenthesis',
    'symbole inattendu : {c}': 'unexpected symbol: {c}', 'parenthèse manquante après {f}': 'missing parenthesis after {f}', 'fin inattendue : {c}': 'unexpected end: {c}',
    'calcul': 'arithmetic', 'calcul sur les entiers': 'integer arithmetic',
    'Atelier de réécriture': 'Rewriting workshop', 'axiomes : {s}': 'axioms: {s}', 'Termes proposés': 'Suggested terms', 'Terme {n}': 'Term {n}',
    'Ton terme': 'Your term', 'Terme': 'Term', 'Appliquer un axiome': 'Apply one axiom', 'Tout réécrire': 'Rewrite everything', 'Recommencer': 'Start again',
    'Terme illisible : {m}.': 'Unreadable term: {m}.', 'Forme finale : plus aucun axiome ne s’applique.': 'Final form: no axiom applies any more.',
    ' {n} étape.': ' {n} step.', ' {n} étapes.': ' {n} steps.', 'Indéfini.': 'Undefined.',
    'Le sous-terme surligné viole une précondition : {m}.': 'The highlighted subterm violates a precondition: {m}.',
    'Prochain axiome : {a}': 'Next axiom: {a}', 'condition : ': 'condition: ', ' et ': ' and ',
    'Une pile': 'A stack', 'LIFO : dernier entré, premier sorti': 'LIFO: last in, first out', 'Le même état, écrit comme un terme :': 'The same state, written as a term:',
    'pile vide': 'empty stack', 'La démo s’arrête à 7 éléments. Une vraie pile n’a pas de limite.': 'The demo stops at 7 elements. A real stack has no limit.',
    '{t} : {x} devient le sommet.': '{t}: {x} becomes the top.',
    '<span class="rw-err">Impossible :</span> {t} viole la précondition {c}.': '<span class="rw-err">Impossible:</span> {t} violates the precondition {c}.',
    '{op} retire le sommet {x}. Axiome : {a}.': '{op} removes the top, {x}. Axiom: {a}.',
    '<span class="rw-err">Indéfini :</span> {t} n’existe pas (opération partielle).': '<span class="rw-err">Undefined:</span> {t} does not exist (partial operation).',
    '{op} = <b>{x}</b>. Axiome : {a}. La pile ne change pas : {op2} est un observateur.': '{op} = <b>{x}</b>. Axiom: {a}. The stack does not change: {op2} is an observer.',
    ' (axiome {a}).': ' (axiom {a}).', 'On repart de la constante {c}.': 'Back to the constant {c}.',
    'Empile quelques éléments, puis dépile : le dernier arrivé sort en premier.': 'Push a few elements, then pop: the last one in is the first one out.',
    'Une file': 'A queue', 'FIFO : premier entré, premier sorti': 'FIFO: first in, first out', '← sortie : premier': '← out: first', 'entrée : enfiler →': 'in: enqueue →',
    'file vide': 'empty queue', 'La démo s’arrête à 7 éléments.': 'The demo stops at 7 elements.',
    '{t} : {x} entre en queue de file, derrière les autres.': '{t}: {x} joins the back of the queue, behind the others.',
    '{op} retire le premier, {x}. Dans le terme, c’est l’élément enfilé en premier, donc le plus enfoui : il faut descendre jusqu’à lui avec l’axiome {a}.':
      '{op} removes the first one, {x}. In the term, it is the element enqueued first, so the most deeply buried: you reach it with the axiom {a}.',
    '{op} = <b>{x}</b> : le plus ancien, celui qui est au fond du terme.': '{op} = <b>{x}</b>: the oldest one, the one at the bottom of the term.',
    'Enfile a, b, c puis défile : a sort en premier.': 'Enqueue a, b, c then dequeue: a comes out first.',
    'Insérer, supprimer : les rangs bougent': 'Insert, delete: the ranks move', 'liste itérative': 'iterative list', 'rang k': 'rank k', 'liste vide': 'empty list',
    'Les éléments de rang ≥ {k} reculent d’un rang : leur rang dans λ′ vaut leur rang dans λ plus 1, d’où le <b>i − 1</b> dans l’axiome.':
      'The elements of rank ≥ {k} move back one rank: their rank in λ′ is their rank in λ plus 1, hence the <b>i − 1</b> in the axiom.',
    'Les éléments après le rang {k} avancent d’un rang, d’où le <b>i + 1</b> dans l’axiome.': 'The elements after rank {k} move forward one rank, hence the <b>i + 1</b> in the axiom.',
    'interne': 'internal', 'observateur': 'observer', 'constante': 'constant', 'Rôle de l’opération': 'Role of the operation', '<b>Oui.</b> ': '<b>Yes.</b> ', '<b>Non, {r}.</b> ': '<b>No: {r}.</b> ',
    'dépiler(p) n’est défini que si estvide(p) = Faux': 'pop(s) is defined only if isempty(s) = false',
    'sommet(p) n’est défini que si estvide(p) = Faux': 'top(s) is defined only if isempty(s) = false',
    'défiler(f) n’est défini que si estvide(f) = Faux': 'dequeue(q) is defined only if isempty(q) = false',
    'premier(f) n’est défini que si estvide(f) = Faux': 'first(q) is defined only if isempty(q) = false',
    'fin(λ) n’est défini que si λ ≠ listevide': 'tail(λ) is defined only if λ ≠ emptylist',
    'premier(λ) n’est défini que si λ ≠ listevide': 'first(λ) is defined only if λ ≠ emptylist',
    'pile': 'stack', 'file': 'queue', 'liste récursive': 'recursive list', 'booléen': 'boolean', 'ensemble': 'set'
  });
  /* vocabulaire des sujets anglais (sujets d'algo 2018 à 2020 en anglais : emptylist, cons, tail, head, contents,
     next, ispresent, search, concatenate, nth, modify, is-defined-iaoi) ; piles, files, ensembles : noms usuels */
  var EN_NAMES = {
    pilevide: 'emptystack', empiler: 'push', 'dépiler': 'pop', sommet: 'top', estvide: 'isempty',
    filevide: 'emptyqueue', enfiler: 'enqueue', 'défiler': 'dequeue', premier: 'first',
    listevide: 'emptylist', fin: 'tail', 'tête': 'head', contenu: 'contents', succ: 'next', longueur: 'length', 'concaténer': 'concatenate',
    'ième': 'nth', 'insérer': 'insert', supprimer: 'delete', 'accès': 'access', 'estprésent': 'ispresent', rechercher: 'search', modifier: 'modify',
    ensemblevide: 'emptyset', ajouter: 'add',
    Vrai: 'true', Faux: 'false', vrai: 'true', faux: 'false', non: 'not', et: 'and', ou: 'or'
  };
  /* variables renommées par jeu : s pour une pile ou un ensemble, q pour une file */
  var EN_VARS = { PILE: { p: 's' }, FILE: { f: 'q' }, ENSEMBLE: { e: 's' } };

  /* ------------------------------------------------------------------ pages */
  function platesSVG(n) {
    var s = '<svg viewBox="0 0 22 26" aria-hidden="true">';
    for (var i = 0; i < n; i++) {
      var w = i % 2 ? 17 : 20, x = (22 - w) / 2, y = 24 - i * 3.1;
      s += '<rect x="' + x + '" y="' + y.toFixed(1) + '" width="' + w + '" height="2.1" rx="1"/>';
    }
    return s + '</svg>';
  }

  function init() {
    U.$$('.plates[data-n]').forEach(function (el) { el.innerHTML = platesSVG(+el.dataset.n); el.setAttribute('aria-hidden', 'true'); });
    if (R.spec && R.spec.mount) R.spec.mount();
    var links = U.$$('.toc a[href^="#"]'), secs = U.$$('.sec[id]');
    links.forEach(function (a) {
      var sec = document.getElementById(a.getAttribute('href').slice(1));
      var b = sec && sec.querySelector('[data-done]');
      if (b) { a.setAttribute('data-toc-key', b.getAttribute('data-done')); a.classList.toggle('done', R.progress.isRead(b.getAttribute('data-done'))); }
    });
    if ('IntersectionObserver' in window && links.length) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); });
      }, { rootMargin: '-35% 0px -60% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    }
    var prog = document.getElementById('prog');
    if (prog) {
      var onScroll = function () { var h = document.documentElement.scrollHeight - window.innerHeight; prog.style.width = (h > 0 ? 100 * window.scrollY / h : 0) + '%'; };
      window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    }
    if (R.quiz) U.$$('[data-check]').forEach(function (el) { R.quiz.mountCheck(el, el.getAttribute('data-check').split(',').map(function (s) { return s.trim(); }), el.getAttribute('data-title')); });
    /* <div data-check-ref="taa/cours-1-types.html#s2" data-n="3"> : les premières questions de la banque
       qui renvoient à cette partie du cours ; rien à afficher si la banque n'en a pas. */
    if (R.quiz) U.$$('[data-check-ref]').forEach(function (el) {
      var ref = el.getAttribute('data-check-ref'), n = +el.getAttribute('data-n') || 3;
      var ids = R.quiz.bank().filter(function (q) { return q.ref === ref; }).slice(0, n).map(function (q) { return q.id; });
      if (ids.length) R.quiz.mountCheck(el, ids, el.getAttribute('data-title')); else el.hidden = true;
    });
    R.wireDoneButtons();
  }
  document.addEventListener('DOMContentLoaded', init);

  /* ------------------------------------------------------------------ termes */
  var INFIX = [['ou', 'or'], ['et', 'and'], ['∈', '='], ['+', '-']];
  function tokenize(s) {
    var out = [], i = 0, m;
    s = String(s).replace(/−/g, '-');
    while (i < s.length) {
      var c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      if ('(),∈=+-'.indexOf(c) >= 0) { out.push(c); i++; continue; }
      m = /^[^\s(),∈=+\-]+/.exec(s.slice(i));
      if (!m) throw new Error(T('caractère inattendu : {c}', { c: c }));
      out.push(m[0]); i += m[0].length;
    }
    return out;
  }
  function parse(s) {
    var tk = tokenize(s), p = 0;
    function peek() { return tk[p]; }
    function next() { return tk[p++]; }
    function level(k) {
      if (k >= INFIX.length) return primary();
      var a = level(k + 1);
      while (INFIX[k].indexOf(peek()) >= 0) { var op = next(); a = { f: op, args: [a, level(k + 1)], infix: true }; }
      return a;
    }
    function primary() {
      var t = next();
      if (t === undefined) throw new Error(T('terme incomplet'));
      if (t === '(') { var e = level(0); if (next() !== ')') throw new Error(T('parenthèse manquante')); return e; }
      if ('),∈=+'.indexOf(t) >= 0) throw new Error(T('symbole inattendu : {c}', { c: t }));
      if (peek() === '(') {
        next(); var args = [];
        if (peek() !== ')') { args.push(level(0)); while (peek() === ',') { next(); args.push(level(0)); } }
        if (next() !== ')') throw new Error(T('parenthèse manquante après {f}', { f: t }));
        return { f: t, args: args };
      }
      return { a: t };
    }
    var r = level(0);
    if (p < tk.length) throw new Error(T('fin inattendue : {c}', { c: tk[p] }));
    return r;
  }
  function isNum(t) { return t && t.a !== undefined && /^\d+$/.test(t.a); }
  function eq(t, u) {
    if (!t || !u) return false;
    if (t.a !== undefined || u.a !== undefined) return t.a === u.a;
    if (t.f !== u.f || t.args.length !== u.args.length) return false;
    for (var i = 0; i < t.args.length; i++) if (!eq(t.args[i], u.args[i])) return false;
    return true;
  }
  function str(t) {
    if (t.a !== undefined) return t.a;
    if (t.infix) return wrap(t.args[0], t.f) + ' ' + t.f + ' ' + wrap(t.args[1], t.f);
    return t.f + '(' + t.args.map(str).join(', ') + ')';
  }
  function prec(op) { for (var k = 0; k < INFIX.length; k++) if (INFIX[k].indexOf(op) >= 0) return k; return 99; }
  function wrap(t, op) { return t.infix && prec(t.f) <= prec(op) ? '(' + str(t) + ')' : str(t); }

  /* rôle d'une opération dans un jeu (pour la couleur) */
  function roleOf(name, set) { return set && set.roles && set.roles[name] || ''; }
  /* HTML d'un terme ; path = chemin (liste d'indices) du sous-terme à surligner */
  function show(t, opts) {
    opts = opts || {};
    function go(t, path) {
      var here = opts.path && path.length === opts.path.length && path.every(function (v, i) { return v === opts.path[i]; });
      var h;
      if (t.a !== undefined) h = esc(t.a);
      else if (t.infix) h = goWrap(t.args[0], path.concat(0), t.f) + ' ' + esc(t.f) + ' ' + goWrap(t.args[1], path.concat(1), t.f);
      else {
        var r = roleOf(t.f, opts.set);
        h = '<span' + (r ? ' class="o-' + r + '"' : '') + '>' + esc(t.f) + '</span>(' + t.args.map(function (a, i) { return go(a, path.concat(i)); }).join(', ') + ')';
      }
      return here ? '<span class="rx">' + h + '</span>' : h;
    }
    function goWrap(t, path, op) { return t.infix && prec(t.f) <= prec(op) ? '(' + go(t, path) + ')' : go(t, path); }
    return go(t, []);
  }

  /* ------------------------------------------------------------------ réécriture */
  function compile(set) {
    if (set.compiled) return set;
    set.vars = set.vars || {};
    set.axioms.forEach(function (ax) {
      ax.L = parse(ax.l); ax.R = parse(ax.r);
      if (ax.c) ax.C = parse(ax.c);
      if (ax.cv) ax.CV = parse(ax.cv);
    });
    set.compiled = true;
    return set;
  }
  function match(pat, t, vars, env) {
    if (pat.a !== undefined && vars[pat.a]) {
      if (env[pat.a]) return eq(env[pat.a], t);
      env[pat.a] = t; return true;
    }
    if (pat.a !== undefined) return t.a === pat.a;
    if (t.a !== undefined || t.f !== pat.f || t.args.length !== pat.args.length) return false;
    for (var i = 0; i < pat.args.length; i++) if (!match(pat.args[i], t.args[i], vars, env)) return false;
    return true;
  }
  function subst(t, env) {
    if (t.a !== undefined) return env[t.a] || t;
    return { f: t.f, args: t.args.map(function (a) { return subst(a, env); }), infix: t.infix };
  }
  function at(t, path) { return path.reduce(function (n, i) { return n.args[i]; }, t); }
  function replace(t, path, u) {
    if (!path.length) return u;
    var c = { f: t.f, args: t.args.slice(), infix: t.infix };
    c.args[path[0]] = replace(t.args[path[0]], path.slice(1), u);
    return c;
  }
  /* positions de l'intérieur vers l'extérieur, de gauche à droite (les arguments avant l'opération) :
     un sous-terme indéfini est toujours vu avant qu'un axiome ne le fasse disparaître, comme
     sommet(empiler(dépiler(pilevide), b)), indéfini et pas b. */
  function positions(t) {
    var out = [];
    (function walk(n, path) {
      if (n.args) n.args.forEach(function (a, i) { walk(a, path.concat(i)); });
      out.push(path);
    })(t, []);
    return out;
  }
  function builtin(t) {
    if (t.infix && (t.f === '+' || t.f === '-') && isNum(t.args[0]) && isNum(t.args[1])) {
      var v = t.f === '+' ? +t.args[0].a + +t.args[1].a : +t.args[0].a - +t.args[1].a;
      return { t: { a: String(v) }, ax: { id: 'calcul', text: T('calcul sur les entiers') } };
    }
    return null;
  }
  /* un pas : premier sous-terme réécrivable (le plus à l'intérieur, puis le plus à gauche) ;
     renvoie { path, before, after, ax, conds } ou null,
     ou { undef: chemin, msg } si une opération partielle est appliquée hors de son domaine */
  function step(t, set, depth) {
    compile(set);
    depth = depth || 0;
    var ps = positions(t);
    for (var k = 0; k < ps.length; k++) {
      var sub = at(t, ps[k]);
      if (sub.a !== undefined) continue;
      var b = builtin(sub);
      if (b) return { path: ps[k], after: replace(t, ps[k], b.t), ax: b.ax, conds: [] };
      if (set.partial && set.partial[sub.f] && sub.args.length && set.partial[sub.f].test(sub.args)) {
        return { path: ps[k], undef: true, msg: set.partial[sub.f].msg };
      }
      for (var j = 0; j < set.axioms.length; j++) {
        var ax = set.axioms[j], env = {};
        if (!match(ax.L, sub, set.vars, env)) continue;
        var conds = [];
        if (ax.eq || ax.neq) {
          var pair = (ax.eq || ax.neq).map(function (v) { return env[v]; });
          if (!pair[0] || !pair[1] || pair[0].a === undefined || pair[1].a === undefined) continue;
          var same = pair[0].a === pair[1].a;
          if (ax.eq ? !same : same) continue;
          conds.push({ text: str(pair[0]) + (same ? ' = ' : ' ≠ ') + str(pair[1]) });
        }
        if (ax.C) {
          if (depth > 6) continue;
          var ct = subst(ax.C, env), tr = trace(ct, set, depth + 1);
          var val = tr.length ? (tr[tr.length - 1].after || null) : ct;
          if (tr.length && tr[tr.length - 1].undef) continue;
          if (!val || !eq(val, ax.CV)) continue;
          conds.push({ text: str(ct) + ' = ' + str(ax.CV), steps: tr });
        }
        return { path: ps[k], after: replace(t, ps[k], subst(ax.R, env)), ax: ax, conds: conds };
      }
    }
    return null;
  }
  function trace(t, set, depth) {
    var out = [], cur = t, guard = 0;
    while (guard++ < 200) {
      var s = step(cur, set, depth);
      if (!s) break;
      s.before = cur;
      out.push(s);
      if (s.undef) break;
      cur = s.after;
    }
    return out;
  }
  function normal(t, set) { var tr = trace(t, set, 0); if (tr.length && tr[tr.length - 1].undef) return null; return tr.length ? tr[tr.length - 1].after : t; }

  function V(names) { var o = {}; names.split(/\s+/).forEach(function (n) { o[n] = 1; }); return o; }
  function emptyArg(name, msg) { return { test: function (args) { return args[0].a === name; }, msg: msg, constName: name }; }
  var SETS = {
    PILE: {
      name: 'pile', vars: V('p e'),
      roles: { pilevide: 'cst', empiler: 'int', 'dépiler': 'int', sommet: 'obs', estvide: 'obs' },
      partial: { 'dépiler': emptyArg('pilevide', 'dépiler(p) n’est défini que si estvide(p) = Faux'), sommet: emptyArg('pilevide', 'sommet(p) n’est défini que si estvide(p) = Faux') },
      axioms: [
        { id: 'A1', l: 'dépiler(empiler(p, e))', r: 'p' },
        { id: 'A2', l: 'sommet(empiler(p, e))', r: 'e' },
        { id: 'A3', l: 'estvide(pilevide)', r: 'Vrai' },
        { id: 'A4', l: 'estvide(empiler(p, e))', r: 'Faux' }
      ]
    },
    FILE: {
      name: 'file', vars: V('f e'),
      roles: { filevide: 'cst', enfiler: 'int', 'défiler': 'int', premier: 'obs', estvide: 'obs' },
      partial: { 'défiler': emptyArg('filevide', 'défiler(f) n’est défini que si estvide(f) = Faux'), premier: emptyArg('filevide', 'premier(f) n’est défini que si estvide(f) = Faux') },
      axioms: [
        { id: 'A1', l: 'premier(enfiler(f, e))', c: 'estvide(f)', cv: 'Vrai', r: 'e', text: 'estvide(f) = Vrai ⇒ premier(enfiler(f, e)) = e' },
        { id: 'A2', l: 'premier(enfiler(f, e))', c: 'estvide(f)', cv: 'Faux', r: 'premier(f)', text: 'estvide(f) = Faux ⇒ premier(enfiler(f, e)) = premier(f)' },
        { id: 'A3', l: 'défiler(enfiler(f, e))', c: 'estvide(f)', cv: 'Vrai', r: 'filevide', text: 'estvide(f) = Vrai ⇒ défiler(enfiler(f, e)) = filevide' },
        { id: 'A4', l: 'défiler(enfiler(f, e))', c: 'estvide(f)', cv: 'Faux', r: 'enfiler(défiler(f), e)', text: 'estvide(f) = Faux ⇒ défiler(enfiler(f, e)) = enfiler(défiler(f), e)' },
        { id: 'A5', l: 'estvide(filevide)', r: 'Vrai' },
        { id: 'A6', l: 'estvide(enfiler(f, e))', r: 'Faux' }
      ]
    },
    LISTE: {
      name: 'liste récursive', vars: V('λ λ2 e'),
      roles: { listevide: 'cst', cons: 'int', fin: 'int', premier: 'obs', longueur: 'obs', 'concaténer': 'int' },
      partial: { fin: emptyArg('listevide', 'fin(λ) n’est défini que si λ ≠ listevide'), premier: emptyArg('listevide', 'premier(λ) n’est défini que si λ ≠ listevide') },
      axioms: [
        { id: 'A2', l: 'fin(cons(e, λ))', r: 'λ' },
        { id: 'A3', l: 'premier(cons(e, λ))', r: 'e' }
      ]
    },
    BOOL: {
      name: 'booléen', vars: V('b'),
      roles: { vrai: 'cst', faux: 'cst', non: 'int', et: 'int', ou: 'int' },
      axioms: [
        { id: 'A1', l: 'non(vrai)', r: 'faux' },
        { id: 'A2', l: 'non(faux)', r: 'vrai' },
        { id: 'A3', l: 'vrai et b', r: 'b' },
        { id: 'A4', l: 'faux et b', r: 'faux' },
        { id: 'A5', l: 'vrai ou b', r: 'vrai' },
        { id: 'A6', l: 'faux ou b', r: 'b' }
      ]
    },
    ENSEMBLE: {
      name: 'ensemble', vars: V('x y e'),
      roles: { ensemblevide: 'cst', ajouter: 'int', supprimer: 'int', card: 'obs', '∈': 'obs' },
      axioms: [
        { id: 'A1', l: 'x ∈ ensemblevide', r: 'faux' },
        { id: 'A2', l: 'x ∈ ajouter(y, e)', eq: ['x', 'y'], r: 'vrai', text: 'x = y ⇒ (x ∈ ajouter(y, e)) = vrai' },
        { id: 'A3', l: 'x ∈ ajouter(y, e)', neq: ['x', 'y'], r: 'x ∈ e', text: 'x ≠ y ⇒ (x ∈ ajouter(y, e)) = (x ∈ e)' },
        { id: 'A4', l: 'x ∈ supprimer(y, e)', eq: ['x', 'y'], r: 'faux', text: 'x = y ⇒ (x ∈ supprimer(y, e)) = faux' },
        { id: 'A5', l: 'x ∈ supprimer(y, e)', neq: ['x', 'y'], r: 'x ∈ e', text: 'x ≠ y ⇒ (x ∈ supprimer(y, e)) = (x ∈ e)' },
        { id: 'A6', l: 'card(ensemblevide)', r: '0' },
        { id: 'A7', l: 'card(ajouter(x, e))', c: 'x ∈ e', cv: 'vrai', r: 'card(e)', text: 'x ∈ e = vrai ⇒ card(ajouter(x, e)) = card(e)' },
        { id: 'A8', l: 'card(ajouter(x, e))', c: 'x ∈ e', cv: 'faux', r: 'card(e) + 1', text: 'x ∈ e = faux ⇒ card(ajouter(x, e)) = card(e) + 1' },
        { id: 'A9', l: 'card(supprimer(x, e))', c: 'x ∈ e', cv: 'vrai', r: 'card(e) - 1', text: 'x ∈ e = vrai ⇒ card(supprimer(x, e)) = card(e) − 1' },
        { id: 'A10', l: 'card(supprimer(x, e))', c: 'x ∈ e', cv: 'faux', r: 'card(e)', text: 'x ∈ e = faux ⇒ card(supprimer(x, e)) = card(e)' }
      ]
    }
  };
  /* page anglaise : jeux renommés (opérations, constantes, variables) */
  function renameText(txt, vars) {
    return String(txt).replace(/[A-Za-zÀ-ÿ_][A-Za-zÀ-ÿ0-9_]*/g, function (w) { return vars && vars[w] || EN_NAMES[w] || w; });
  }
  function renameSet(key, set) {
    var vars = EN_VARS[key] || {}, nv = {};
    Object.keys(set.vars).forEach(function (v) { nv[vars[v] || v] = 1; });
    set.vars = nv;
    set.name = T(set.name);
    var roles = {};
    Object.keys(set.roles || {}).forEach(function (k) { roles[EN_NAMES[k] || k] = set.roles[k]; });
    set.roles = roles;
    if (set.partial) {
      var pa = {};
      Object.keys(set.partial).forEach(function (k) { var p = set.partial[k], c = EN_NAMES[p.constName] || p.constName; pa[EN_NAMES[k] || k] = { test: emptyArg(c).test, msg: T(p.msg) }; });
      set.partial = pa;
    }
    set.axioms.forEach(function (ax) {
      ['l', 'r', 'c', 'cv', 'text'].forEach(function (f) { if (ax[f]) ax[f] = renameText(ax[f], vars); });
      ['eq', 'neq'].forEach(function (f) { if (ax[f]) ax[f] = ax[f].map(function (v) { return vars[v] || v; }); });
    });
  }
  if (EN) Object.keys(SETS).forEach(function (k) { renameSet(k, SETS[k]); });
  /* nom anglais d'une opération sur une page anglaise, nom français sinon */
  function N(fr) { return EN ? (EN_NAMES[fr] || fr) : fr; }
  /* texte écrit avec les noms français → noms de la page (rien à faire sur une page française) */
  function renameIf(txt) { return EN ? renameText(txt) : txt; }
  function axText(ax) { return ax.text || (ax.l + ' = ' + ax.r).replace(/ - /g, ' − '); }

  /* ------------------------------------------------------------------ banc : réécriture pas à pas */
  /* opts : { set: 'PILE'|objet, presets: [termes], value: 'terme', label } */
  function stepper(el, opts) {
    var set = typeof opts.set === 'string' ? SETS[opts.set] : opts.set;
    compile(set);
    var id = 'rw' + Math.random().toString(36).slice(2, 7);
    el.classList.add('bench');
    el.innerHTML = '<div class="bench-head"><span>' + esc(opts.label || T('Atelier de réécriture')) + '</span><span>' + esc(T('axiomes : {s}', { s: set.name })) + '</span></div>' +
      '<div class="bench-body">' +
      (opts.presets && opts.presets.length > 1 ? '<div class="row" role="group" aria-label="' + T('Termes proposés') + '">' + opts.presets.map(function (p, i) { return '<button type="button" class="chip-btn" data-p="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(p.name || T('Terme {n}', { n: i + 1 })) + '</button>'; }).join('') + '</div>' : '') +
      (opts.editable ? '<label class="field" for="' + id + '-in">' + T('Ton terme') + '<input id="' + id + '-in" class="term-in" spellcheck="false" autocomplete="off" autocapitalize="off"></label>' : '') +
      '<div class="rw-now"><span class="lbl">' + T('Terme') + '</span><div class="term" aria-live="polite"></div><div class="rw-msg readout"></div></div>' +
      '<ol class="rw-steps"></ol></div>' +
      '<div class="ctrls"><div class="row"><button type="button" class="btn primary" data-a="step">' + T('Appliquer un axiome') + '</button><button type="button" class="btn" data-a="all">' + T('Tout réécrire') + '</button><button type="button" class="btn" data-a="reset">' + T('Recommencer') + '</button></div></div>';
    var termEl = el.querySelector('.term'), msg = el.querySelector('.rw-msg'), list = el.querySelector('.rw-steps'), input = el.querySelector('input');
    var cur = null, start = null, n = 0;
    function load(src) {
      try { start = parse(src); } catch (e) { start = null; termEl.innerHTML = ''; msg.innerHTML = '<span class="rw-err">' + T('Terme illisible : {m}.', { m: esc(e.message) }) + '</span>'; list.innerHTML = ''; return; }
      cur = start; n = 0; list.innerHTML = ''; paint();
    }
    function paint(hlPath) {
      var s = cur && step(cur, set, 0);
      termEl.innerHTML = cur ? show(cur, { set: set, path: s ? s.path : null }) : '';
      if (!cur) return;
      if (!s) msg.innerHTML = '<span class="rw-done">' + T('Forme finale : plus aucun axiome ne s’applique.') + '</span>' + (n ? T(n > 1 ? ' {n} étapes.' : ' {n} étape.', { n: n }) : '');
      else if (s.undef) msg.innerHTML = '<span class="rw-err">' + T('Indéfini.') + '</span> ' + T('Le sous-terme surligné viole une précondition : {m}.', { m: esc(s.msg) });
      else msg.innerHTML = T('Prochain axiome : {a}', { a: '<code>' + esc(axText(s.ax)) + '</code>' }) + (s.ax.id === 'calcul' ? '' : ' <span class="muted">(' + esc(s.ax.id) + ')</span>');
      el.querySelector('[data-a="step"]').disabled = !s || !!s.undef;
      el.querySelector('[data-a="all"]').disabled = !s || !!s.undef;
    }
    function doStep() {
      var s = cur && step(cur, set, 0);
      if (!s || s.undef) return false;
      n++;
      var li = document.createElement('li');
      li.innerHTML = '<div><div class="term">' + show(cur, { set: set, path: s.path }) + '</div><div class="rw-why">' +
        (s.ax.id === 'calcul' ? T('calcul') : esc(s.ax.id) + (EN ? ': ' : ' : ') + '<code>' + esc(axText(s.ax)) + '</code>') +
        (s.conds.length ? '<br>' + T('condition : ') + s.conds.map(function (c) { return '<code>' + esc(c.text) + '</code>' + (c.steps && c.steps.length ? ' (' + c.steps.map(function (k) { return k.ax.id; }).join(', ') + ')' : ''); }).join(T(' et ')) : '') + '</div></div>';
      list.appendChild(li);
      cur = s.after; paint();
      return true;
    }
    el.querySelector('[data-a="step"]').addEventListener('click', doStep);
    el.querySelector('[data-a="all"]').addEventListener('click', function () { var g = 0; while (g++ < 60 && doStep()); });
    el.querySelector('[data-a="reset"]').addEventListener('click', function () { if (start) { cur = start; n = 0; list.innerHTML = ''; paint(); } });
    U.$$('[data-p]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        U.$$('[data-p]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        var p = opts.presets[+b.dataset.p]; if (input) input.value = p.t; load(p.t);
      });
    });
    if (input) input.addEventListener('change', function () { U.$$('[data-p]', el).forEach(function (x) { x.setAttribute('aria-pressed', 'false'); }); load(input.value); });
    var first = opts.value || (opts.presets && opts.presets[0] && opts.presets[0].t) || '';
    if (input) input.value = first;
    load(first);
    return { load: load };
  }

  /* ------------------------------------------------------------------ banc : pile */
  function stackBench(el, opts) {
    opts = opts || {};
    var items = (opts.start || []).slice(), pool = opts.pool || ['a', 'b', 'c', 'd', 'e'], k = items.length;
    el.classList.add('bench');
    /* noms et variables du jeu PILE de la page (français ou anglais) */
    var P = EN ? 's' : 'p', VR = N('Vrai'), FX = N('Faux');
    function c(t) { return '<code>' + esc(renameIf(t)) + '</code>'; }
    el.innerHTML = '<div class="bench-head"><span>' + esc(opts.label || T('Une pile')) + '</span><span>' + T('LIFO : dernier entré, premier sorti') + '</span></div>' +
      '<div class="bench-body grid2" style="align-items:center"><div class="viz"><div class="pile-box" aria-live="polite"></div></div>' +
      '<div class="viz"><div><span class="muted" style="font-size:.85rem">' + T('Le même état, écrit comme un terme :') + '</span><div class="term" data-term></div></div><div class="readout" data-out></div></div></div>' +
      '<div class="ctrls"><div class="row"><button type="button" class="btn primary" data-a="push">' + N('empiler') + '</button><button type="button" class="btn" data-a="pop">' + N('dépiler') + '</button><button type="button" class="btn" data-a="top">' + N('sommet') + ' ?</button><button type="button" class="btn" data-a="empty">' + N('estvide') + ' ?</button><button type="button" class="btn" data-a="clear">' + N('pilevide') + '</button></div></div>';
    var box = el.querySelector('.pile-box'), tEl = el.querySelector('[data-term]'), out = el.querySelector('[data-out]');
    function term() { return items.reduce(function (acc, x) { return N('empiler') + '(' + acc + ', ' + x + ')'; }, N('pilevide')); }
    function paint(m) {
      box.innerHTML = items.length ? items.map(function (x, i) { return '<div class="plate' + (i === items.length - 1 ? ' top' : '') + '">' + esc(x) + '</div>'; }).join('') : '<div class="empty-note">' + T('pile vide') + '</div>';
      tEl.innerHTML = show(parse(term()), { set: SETS.PILE });
      if (m !== undefined) out.innerHTML = m;
    }
    el.querySelector('[data-a="push"]').addEventListener('click', function () {
      if (items.length >= 7) { paint(T('La démo s’arrête à 7 éléments. Une vraie pile n’a pas de limite.')); return; }
      var x = pool[k++ % pool.length]; items.push(x); paint(T('{t} : {x} devient le sommet.', { t: c('empiler(' + P + ', ' + x + ')'), x: esc(x) }));
    });
    el.querySelector('[data-a="pop"]').addEventListener('click', function () {
      if (!items.length) { paint(T('<span class="rw-err">Impossible :</span> {t} viole la précondition {c}.', { t: c('dépiler(pilevide)'), c: c('estvide(' + P + ') = Faux') })); return; }
      var x = items.pop(); paint(T('{op} retire le sommet {x}. Axiome : {a}.', { op: c('dépiler'), x: esc(x), a: c('dépiler(empiler(' + P + ', e)) = ' + P) }));
    });
    el.querySelector('[data-a="top"]').addEventListener('click', function () {
      if (!items.length) { paint(T('<span class="rw-err">Indéfini :</span> {t} n’existe pas (opération partielle).', { t: c('sommet(pilevide)') })); return; }
      paint(T('{op} = <b>{x}</b>. Axiome : {a}. La pile ne change pas : {op2} est un observateur.', { op: c('sommet'), x: esc(items[items.length - 1]), a: c('sommet(empiler(' + P + ', e)) = e'), op2: N('sommet') }));
    });
    el.querySelector('[data-a="empty"]').addEventListener('click', function () {
      paint(c('estvide') + ' = <b>' + (items.length ? FX : VR) + '</b>' + T(' (axiome {a}).', { a: items.length ? c('estvide(empiler(' + P + ', e)) = Faux') : c('estvide(pilevide) = Vrai') }));
    });
    el.querySelector('[data-a="clear"]').addEventListener('click', function () { items = []; paint(T('On repart de la constante {c}.', { c: c('pilevide') })); });
    paint(T('Empile quelques éléments, puis dépile : le dernier arrivé sort en premier.'));
  }

  /* ------------------------------------------------------------------ banc : file */
  function queueBench(el, opts) {
    opts = opts || {};
    var items = (opts.start || []).slice(), pool = opts.pool || ['a', 'b', 'c', 'd', 'e'], k = items.length;
    el.classList.add('bench');
    var F = EN ? 'q' : 'f', VR = N('Vrai'), FX = N('Faux');
    function c(t) { return '<code>' + esc(renameIf(t)) + '</code>'; }
    el.innerHTML = '<div class="bench-head"><span>' + esc(opts.label || T('Une file')) + '</span><span>' + T('FIFO : premier entré, premier sorti') + '</span></div>' +
      '<div class="bench-body"><div class="viz"><div class="file-ends"><span>' + T('← sortie : premier') + '</span><span>' + T('entrée : enfiler →') + '</span></div><div class="file-box" aria-live="polite"></div></div>' +
      '<div><span class="muted" style="font-size:.85rem">' + T('Le même état, écrit comme un terme :') + '</span><div class="term" data-term></div></div><div class="readout" data-out></div></div>' +
      '<div class="ctrls"><div class="row"><button type="button" class="btn primary" data-a="push">' + N('enfiler') + '</button><button type="button" class="btn" data-a="pop">' + N('défiler') + '</button><button type="button" class="btn" data-a="top">' + N('premier') + ' ?</button><button type="button" class="btn" data-a="empty">' + N('estvide') + ' ?</button><button type="button" class="btn" data-a="clear">' + N('filevide') + '</button></div></div>';
    var box = el.querySelector('.file-box'), tEl = el.querySelector('[data-term]'), out = el.querySelector('[data-out]');
    function term() { return items.reduce(function (acc, x) { return N('enfiler') + '(' + acc + ', ' + x + ')'; }, N('filevide')); }
    function paint(m) {
      box.innerHTML = items.length ? items.map(function (x, i) { return '<div class="plate' + (i === 0 ? ' top' : '') + '">' + esc(x) + '</div>'; }).join('') : '<div class="empty-note">' + T('file vide') + '</div>';
      tEl.innerHTML = show(parse(term()), { set: SETS.FILE });
      if (m !== undefined) out.innerHTML = m;
    }
    el.querySelector('[data-a="push"]').addEventListener('click', function () {
      if (items.length >= 7) { paint(T('La démo s’arrête à 7 éléments.')); return; }
      var x = pool[k++ % pool.length]; items.push(x); paint(T('{t} : {x} entre en queue de file, derrière les autres.', { t: c('enfiler(' + F + ', ' + x + ')'), x: esc(x) }));
    });
    el.querySelector('[data-a="pop"]').addEventListener('click', function () {
      if (!items.length) { paint(T('<span class="rw-err">Impossible :</span> {t} viole la précondition {c}.', { t: c('défiler(filevide)'), c: c('estvide(' + F + ') = Faux') })); return; }
      var x = items.shift();
      paint(T('{op} retire le premier, {x}. Dans le terme, c’est l’élément enfilé en premier, donc le plus enfoui : il faut descendre jusqu’à lui avec l’axiome {a}.', { op: c('défiler'), x: esc(x), a: c('défiler(enfiler(' + F + ', e)) = enfiler(défiler(' + F + '), e)') }));
    });
    el.querySelector('[data-a="top"]').addEventListener('click', function () {
      if (!items.length) { paint(T('<span class="rw-err">Indéfini :</span> {t} n’existe pas (opération partielle).', { t: c('premier(filevide)') })); return; }
      paint(T('{op} = <b>{x}</b> : le plus ancien, celui qui est au fond du terme.', { op: c('premier'), x: esc(items[0]) }));
    });
    el.querySelector('[data-a="empty"]').addEventListener('click', function () { paint(c('estvide') + ' = <b>' + (items.length ? FX : VR) + '</b>.'); });
    el.querySelector('[data-a="clear"]').addEventListener('click', function () { items = []; paint(T('On repart de la constante {c}.', { c: c('filevide') })); });
    paint(T('Enfile a, b, c puis défile : a sort en premier.'));
  }

  /* ------------------------------------------------------------------ banc : liste itérative (rangs) */
  function ranksBench(el, opts) {
    opts = opts || {};
    var base = (opts.start || ['a', 'b', 'c', 'd', 'e']).slice(), id = 'rk' + Math.random().toString(36).slice(2, 7);
    el.classList.add('bench');
    el.innerHTML = '<div class="bench-head"><span>' + esc(opts.label || T('Insérer, supprimer : les rangs bougent')) + '</span><span>' + T('liste itérative') + '</span></div>' +
      '<div class="bench-body">' +
      '<div class="row"><button type="button" class="chip-btn" data-op="ins" aria-pressed="true">' + N('insérer') + '(λ, k, x)</button><button type="button" class="chip-btn" data-op="sup" aria-pressed="false">' + N('supprimer') + '(λ, k)</button></div>' +
      '<div class="row"><label class="field" for="' + id + '-k">' + T('rang k') + '<select id="' + id + '-k"></select></label></div>' +
      '<div><div class="muted" style="font-size:.85rem;margin-bottom:4px">λ</div><div class="ranks" data-src></div></div>' +
      '<div><div class="muted" style="font-size:.85rem;margin-bottom:4px" data-rl>λ′</div><div class="ranks" data-res></div></div>' +
      '<div class="legend" data-leg></div><div class="readout" data-out></div></div>';
    var op = 'ins', kSel = el.querySelector('select');
    function opts2() {
      var n = base.length, max = op === 'ins' ? n + 1 : n, cur = +kSel.value || 2;
      kSel.innerHTML = '';
      for (var i = 1; i <= max; i++) kSel.insertAdjacentHTML('beforeend', '<option value="' + i + '">' + i + '</option>');
      kSel.value = String(Math.min(cur, max));
    }
    function cell(x, i, cls) { return '<div class="rank ' + (cls || '') + '"><b>' + i + '</b><span>' + esc(x) + '</span></div>'; }
    function paint() {
      var k = +kSel.value, n = base.length;
      el.querySelector('[data-src]').innerHTML = base.map(function (x, i) {
        var r = i + 1, c = r < k ? 'lo' : (op === 'sup' && r === k ? 'k gone' : 'hi');
        if (op === 'ins' && r >= k) c = 'hi';
        return cell(x, r, c);
      }).join('');
      var res = op === 'ins' ? base.slice(0, k - 1).concat(['x'], base.slice(k - 1)) : base.slice(0, k - 1).concat(base.slice(k));
      el.querySelector('[data-rl]').textContent = op === 'ins' ? 'λ′ = ' + N('insérer') + '(λ, ' + k + ', x)' : 'λ′ = ' + N('supprimer') + '(λ, ' + k + ')';
      el.querySelector('[data-res]').innerHTML = res.map(function (x, i) {
        var r = i + 1, c = r < k ? 'lo' : (op === 'ins' && r === k ? 'k' : 'hi');
        return cell(x, r, c);
      }).join('') || '<div class="empty-note">' + T('liste vide') + '</div>';
      var I = N('ième'), L = N('longueur'), sep = EN ? ': ' : ' : ';
      el.querySelector('[data-leg]').innerHTML = op === 'ins'
        ? '<span><i style="background:var(--accent-soft);border:1px solid var(--accent)"></i>1 ≤ i &lt; k' + sep + I + '(λ′, i) = ' + I + '(λ, i)</span><span><i style="background:var(--redex)"></i>i = k' + sep + I + '(λ′, i) = x</span><span><i style="background:var(--obs-soft);border:1px solid var(--obs)"></i>k &lt; i ≤ ' + L + '(λ) + 1' + sep + I + '(λ′, i) = ' + I + '(λ, i − 1)</span>'
        : '<span><i style="background:var(--accent-soft);border:1px solid var(--accent)"></i>1 ≤ i &lt; k' + sep + I + '(λ′, i) = ' + I + '(λ, i)</span><span><i style="background:var(--obs-soft);border:1px solid var(--obs)"></i>k ≤ i ≤ ' + L + '(λ) − 1' + sep + I + '(λ′, i) = ' + I + '(λ, i + 1)</span>';
      el.querySelector('[data-out]').innerHTML = op === 'ins'
        ? L + '(λ′) = ' + L + '(λ) + 1 = ' + (n + 1) + '. ' + T('Les éléments de rang ≥ {k} reculent d’un rang : leur rang dans λ′ vaut leur rang dans λ plus 1, d’où le <b>i − 1</b> dans l’axiome.', { k: k })
        : L + '(λ′) = ' + L + '(λ) − 1 = ' + (n - 1) + '. ' + T('Les éléments après le rang {k} avancent d’un rang, d’où le <b>i + 1</b> dans l’axiome.', { k: k });
    }
    U.$$('[data-op]', el).forEach(function (b) {
      b.addEventListener('click', function () { op = b.dataset.op; U.$$('[data-op]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); opts2(); paint(); });
    });
    kSel.addEventListener('change', paint);
    opts2(); kSel.value = String(opts.k || 3); paint();
  }

  /* ------------------------------------------------------------------ banc : classer les opérations */
  /* opts : { rows: [{ p: 'empiler : pile × élément → pile', r: 'int'|'obs'|'cst', why: '…' }], defined: 'pile' } */
  function sorter(el, opts) {
    var NAMES = { int: T('interne'), obs: T('observateur'), cst: T('constante') };
    el.classList.add('sorter');
    el.innerHTML = opts.rows.map(function (row, i) {
      return '<div class="sorter-row" data-i="' + i + '"><span class="t">' + esc(row.p) + '</span><div class="row" role="group" aria-label="' + T('Rôle de l’opération') + '">' +
        ['cst', 'int', 'obs'].map(function (r) { return '<button type="button" class="chip-btn" data-r="' + r + '" aria-pressed="false">' + NAMES[r] + '</button>'; }).join('') +
        '</div><div class="sorter-fb" hidden></div></div>';
    }).join('');
    U.$$('.sorter-row', el).forEach(function (rowEl) {
      var row = opts.rows[+rowEl.dataset.i], fb = rowEl.querySelector('.sorter-fb');
      U.$$('[data-r]', rowEl).forEach(function (b) {
        b.addEventListener('click', function () {
          U.$$('[data-r]', rowEl).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          var ok = b.dataset.r === row.r;
          rowEl.classList.toggle('ok', ok); rowEl.classList.toggle('no', !ok);
          fb.hidden = false;
          fb.innerHTML = (ok ? T('<b>Oui.</b> ') : T('<b>Non, {r}.</b> ', { r: NAMES[row.r] })) + row.why;
        });
      });
    });
  }

  R.taa = {
    platesSVG: platesSVG,
    term: { parse: parse, show: show, str: str, eq: eq },
    rewrite: { SETS: SETS, step: step, trace: trace, normal: normal, compile: compile, axText: axText, EN_NAMES: EN_NAMES, rename: renameIf },
    stepper: stepper, stackBench: stackBench, queueBench: queueBench, ranksBench: ranksBench, sorter: sorter
  };
})();
