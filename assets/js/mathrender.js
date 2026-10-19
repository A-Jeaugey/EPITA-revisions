/* Formules mathématiques — rendu KaTeX en copie locale (assets/vendor/katex/, KaTeX 0.16.11, licence MIT).
   Aucun CDN : marche en file:// et sur GitHub Pages. Chargé après core.js.

   DANS UNE PAGE
     <head>   <link rel="stylesheet" href="../assets/vendor/katex/katex.min.css">
     fin du <body>, AVANT les scripts qui ajoutent du contenu (qcm-engine, données, maths.js) :
              <script src="../assets/vendor/katex/katex.min.js"></script>
              <script src="../assets/vendor/katex/contrib/auto-render.min.js"></script>
              <script src="../assets/js/mathrender.js"></script>
     Raccourci (qcm/index.html, page d'une autre matière) : mathrender.js seul suffit. S'il ne trouve pas
     window.katex, il ajoute lui-même la feuille et les deux scripts depuis REV.root ; le rendu a lieu dès
     qu'ils sont chargés (un court instant où le source TeX est visible).

   ÉCRITURE
     \( … \) en ligne, \[ … \] en bloc. Rien d'autre : un $ reste un dollar (prix, Caml…).
     Dans une chaîne JavaScript (banque de QCM, données) la barre se double : 'Soit \\(x \\in \\R\\).'
     Macros du site : \R \N \Z \Q \C (ensembles de nombres), \card (Card), \P (probabilité, P droit),
     \E et \V (espérance, variance), \ent{a}{b} (intervalle d'entiers ⟦a, b⟧), \hl{…} (mise en évidence,
     couleur d'accent de la page : classe .mh, voir maths.css).
     Non rendus : <script>, <style>, <textarea>, <pre>, <code>, <option>, <svg>, tout élément de classe no-math
     (ou dans un tel élément) et ce qui est déjà rendu (.katex).

   RENDU AUTOMATIQUE
     Au chargement (tout le <body>), puis pour tout contenu ajouté plus tard par un script (cartes de QCM,
     corrigés, outils) grâce à un MutationObserver. L'espace insécable que REV.util.tidy place devant « : »
     ou entre un nombre et son unité est remise en espace simple avant le rendu.

   API (window.REV.math, aussi window.MathRender si REV est absent)
     render(el)            rend les formules de el (et de ses descendants) ; sans argument : document.body.
     tex(src, { display }) → HTML d'une formule (chaîne), pour les scripts qui fabriquent leur HTML ;
                           jamais d'exception (une erreur donne le source en rouge, classe katex-error).
     ready(fn)             appelle fn() dès que KaTeX est disponible (tout de suite s'il l'est).
     ok()                  true si KaTeX est chargé.
     errors                tableau des formules en erreur ({ src, msg }) ; chacune est aussi signalée par
                           console.warn('KaTeX : …') (les vérifications par navigateur le lisent).
     macros                les macros ci-dessus (objet partagé : une page peut en ajouter avant le rendu).
     options               les options passées à KaTeX (throwOnError false, strict ignore, trust limité à
                           \htmlClass). */
(function () {
  'use strict';
  var W = window, R = W.REV || null;
  var MACROS = {
    '\\R': '\\mathbb{R}', '\\N': '\\mathbb{N}', '\\Z': '\\mathbb{Z}', '\\Q': '\\mathbb{Q}', '\\C': '\\mathbb{C}',
    '\\card': '\\operatorname{Card}', '\\P': '\\mathrm{P}', '\\E': '\\mathrm{E}', '\\V': '\\mathrm{V}',
    '\\ent': '\\llbracket #1, #2 \\rrbracket', '\\hl': '\\htmlClass{mh}{#1}'
  };
  var errors = [];
  var OPTIONS = {
    throwOnError: false, strict: 'ignore', output: 'htmlAndMathml', macros: MACROS,
    trust: function (c) { return c.command === '\\htmlClass'; }
  };
  var IGNORED_TAGS = ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'option', 'svg'];
  var DELIMS = [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }];
  function clean(s) { return String(s).replace(/[\u00a0\u202f]/g, ' '); }
  function note(src, msg) {
    errors.push({ src: src, msg: msg });
    try { console.warn('KaTeX : ' + msg + ' — ' + src); } catch (e) { /* console absente */ }
  }
  function ok() { return !!(W.katex && W.renderMathInElement); }

  /* une formule en HTML (chaîne) */
  function tex(src, o) {
    src = clean(src);
    if (!W.katex) return '<span class="katex-src">' + String(src).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }) + '</span>';
    var opt = {}; for (var k in OPTIONS) opt[k] = OPTIONS[k];
    opt.displayMode = !!(o && o.display); opt.throwOnError = true;
    try { return W.katex.renderToString(src, opt); }
    catch (e) {
      note(src, e && e.message || String(e));
      opt.throwOnError = false;
      try { return W.katex.renderToString(src, opt); } catch (e2) { return '<span class="katex-error">' + src + '</span>'; }
    }
  }

  /* jamais le texte d'un script ou d'une feuille de style : rendu, il déclencherait l'observateur sans fin */
  function skip(el) { return !el || (el.closest && el.closest('script, style, textarea, noscript, .katex, .no-math, [data-no-math]')); }
  function has(el) { var t = el.textContent || ''; return t.indexOf('\\(') >= 0 || t.indexOf('\\[') >= 0; }
  var busy = false;
  function render(el) {
    el = el || document.body;
    if (!el || !ok() || el.nodeType !== 1 || skip(el) || !has(el)) return;
    busy = true;
    try {
      W.renderMathInElement(el, {
        delimiters: DELIMS, ignoredTags: IGNORED_TAGS, ignoredClasses: ['no-math', 'katex'],
        throwOnError: false, strict: OPTIONS.strict, trust: OPTIONS.trust, macros: MACROS, output: OPTIONS.output,
        preProcess: clean,
        errorCallback: function (msg, err) { note(err && err.message ? err.message : msg, msg); }
      });
    } catch (e) { note('', e && e.message || String(e)); }
    busy = false;
    /* une formule mal écrite ne lève rien avec throwOnError false : on la relève ici */
    Array.prototype.forEach.call(el.querySelectorAll('.katex-error:not([data-noted])'), function (x) {
      x.setAttribute('data-noted', '1'); note(x.textContent, x.getAttribute('title') || 'erreur');
    });
  }

  var waiting = [];
  function ready(fn) { if (ok()) fn(); else waiting.push(fn); }
  function start() {
    render(document.body);
    if (W.MutationObserver) new MutationObserver(function (list) {
      if (busy) return;
      var seen = [];
      for (var i = 0; i < list.length; i++) for (var j = 0; j < list[i].addedNodes.length; j++) {
        var n = list[i].addedNodes[j];
        var el = n.nodeType === 1 ? n : n.nodeType === 3 ? n.parentNode : null;
        if (el && el.nodeType === 1 && seen.indexOf(el) < 0 && !skip(el) && has(el)) seen.push(el);
      }
      /* les éléments déjà contenus dans un autre de la liste sont rendus avec lui */
      seen.filter(function (e) { return !seen.some(function (o) { return o !== e && o.contains(e); }); }).forEach(render);
    }).observe(document.body, { childList: true, subtree: true });
    var w = waiting; waiting = []; w.forEach(function (f) { try { f(); } catch (e) { note('', e.message); } });
  }
  function boot() { if (document.body) start(); else document.addEventListener('DOMContentLoaded', start); }

  /* KaTeX absent : on le charge depuis la copie locale du site */
  function base() {
    if (R && R.root) return R.root;
    var s = document.currentScript && document.currentScript.src;
    return s ? s.replace(/assets\/js\/mathrender\.js(?:[?#].*)?$/, '') : '../';
  }
  function load() {
    var b = base() + 'assets/vendor/katex/';
    if (!document.querySelector('link[href$="katex.min.css"]')) {
      var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = b + 'katex.min.css'; document.head.appendChild(l);
    }
    function js(src, then) { var s = document.createElement('script'); s.src = src; s.onload = then; s.onerror = function () { note(src, 'chargement impossible'); }; document.head.appendChild(s); }
    js(b + 'katex.min.js', function () { js(b + 'contrib/auto-render.min.js', boot); });
  }

  var api = { render: render, tex: tex, ready: ready, ok: ok, errors: errors, macros: MACROS, options: OPTIONS };
  if (R) R.math = api;
  W.MathRender = api;
  if (ok()) boot(); else if (W.katex && !W.renderMathInElement) { var bb = base(); var s = document.createElement('script'); s.src = bb + 'assets/vendor/katex/contrib/auto-render.min.js'; s.onload = boot; document.head.appendChild(s); }
  else load();
})();
