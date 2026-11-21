/* Algo · LiMa — comportements propres aux pages de la matière (le reste : maths.js pour les numéros de parties, le
   sommaire, la barre de lecture, les boutons « J'ai compris » et les vérifications de fin de partie).
   - Coloration Python : <pre class="py">…</pre> (le texte brut du code, échappé en HTML). Chaque ligne devient
     <span class="ln"> (numéros en CSS) ; data-hl="2,5" surligne des lignes. Jetons : mots-clés .k, chaînes .s, nombres .n,
     commentaires .c, fonctions définies .f, fonctions natives .b. Monté au chargement et sur tout bloc ajouté par script.
   - Sortie : <pre class="out"> (rien à colorer ; « >>> » mis en évidence).
   Aucune dépendance. Tout le code affiché sur le site est exécuté avec Python 3 avant publication. */
(function () {
  'use strict';
  var R = window.REV; if (!R) return;
  var KW = /^(def|return|if|elif|else|while|for|in|and|or|not|True|False|None|raise|import|from|as|pass|break|continue|is|lambda|class|try|except)$/;
  var BI = /^(len|range|print|ord|chr|list|int|str|append|pop|insert|min|max|abs|sum|Exception|type|help|tuple)$/;
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function line(src) {
    var out = '', i = 0, m, rest;
    while (i < src.length) {
      rest = src.slice(i);
      if ((m = /^#.*/.exec(rest))) { out += '<span class="c">' + esc(m[0]) + '</span>'; i += m[0].length; continue; }
      if ((m = /^("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/.exec(rest))) { out += '<span class="s">' + esc(m[0]) + '</span>'; i += m[0].length; continue; }
      if ((m = /^\d+(\.\d+)?/.exec(rest))) { out += '<span class="n">' + m[0] + '</span>'; i += m[0].length; continue; }
      if ((m = /^[A-Za-z_]\w*/.exec(rest))) {
        var w = m[0], after = src.slice(i + w.length);
        if (KW.test(w)) out += '<span class="k">' + w + '</span>';
        else if (BI.test(w) && /^\s*\(/.test(after)) out += '<span class="b">' + w + '</span>';
        else if (/^\s*\(/.test(after) && /\bdef\s+$/.test(src.slice(0, i))) out += '<span class="f">' + w + '</span>';
        else out += w;
        i += w.length; continue;
      }
      out += esc(src.charAt(i)); i++;
    }
    return out;
  }
  function paint(pre) {
    if (pre.getAttribute('data-py-done')) return;
    pre.setAttribute('data-py-done', '1');
    var src = pre.textContent.replace(/^\n+|\s+$/g, ''), hl = (pre.getAttribute('data-hl') || '').split(',').map(Number);
    pre.innerHTML = src.split('\n').map(function (l, k) { return '<span class="ln' + (hl.indexOf(k + 1) >= 0 ? ' hl' : '') + '">' + (line(l) || ' ') + '</span>'; }).join('');
  }
  function paintOut(pre) {
    if (pre.getAttribute('data-py-done')) return;
    pre.setAttribute('data-py-done', '1');
    pre.innerHTML = esc(pre.textContent.replace(/^\n+|\s+$/g, '')).replace(/^(&gt;&gt;&gt;)/gm, '<span class="p">$1</span>');
  }
  function mount(root) {
    (root || document).querySelectorAll('pre.py').forEach(paint);
    (root || document).querySelectorAll('pre.out').forEach(paintOut);
  }
  R.lima = { mount: mount, highlight: line };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mount(); }); else mount();
  new MutationObserver(function (ms) {
    ms.forEach(function (m) { m.addedNodes.forEach(function (nd) { if (nd.nodeType === 1 && (nd.matches('pre.py,pre.out') || nd.querySelector('pre.py,pre.out'))) mount(nd.parentNode || nd); }); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
