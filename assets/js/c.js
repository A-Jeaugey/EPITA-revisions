/* Prog · C — comportements propres aux pages de la matière (le reste : maths.js pour les numéros de parties, le
   sommaire, la barre de lecture, les boutons « J'ai compris » et les vérifications de fin de partie).
   - Coloration C : <pre class="cc">…</pre> (le texte brut du code, échappé en HTML). Chaque ligne devient
     <span class="ln"> (numéros en CSS) ; data-hl="2,5" surligne des lignes. Jetons : mots-clés .k, types .t, chaînes et
     caractères .s, nombres .n, commentaires .c, préprocesseur .p, fonctions de la bibliothèque standard .b.
   - Terminal : <pre class="term"> (lignes « $ commande » mises en évidence, sorties telles quelles ; les messages
     « error: » et « warning: » de gcc en rouge).
   - Attributs de vérification (lus par le script de relecture, sans effet à l'affichage) : data-prog="nom" (programme
     complet), data-run="nom" (sa sortie), data-sol / data-ex / data-out (corrigé, exemple, sortie d'un exercice).
   Aucune dépendance. Tout le code affiché est compilé avec gcc -Wall -Wextra -Werror -std=c99 et exécuté. */
(function () {
  'use strict';
  var R = window.REV; if (!R) return;
  var KW = /^(if|else|while|for|do|switch|case|default|break|continue|return|sizeof|const|static|struct|typedef|enum|goto)$/;
  var TY = /^(int|char|float|double|void|long|short|unsigned|signed|size_t|bool|FILE)$/;
  var BI = /^(printf|fgets|strlen|strcmp|strcpy|strcat|puts|putchar|getchar|scanf|main|malloc|free)$/;
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function line(src, st) {
    var out = '', i = 0, m, rest;
    if (st.com) {                                   // suite d'un commentaire /* … */
      var e = src.indexOf('*/');
      if (e < 0) return '<span class="c">' + esc(src) + '</span>';
      out += '<span class="c">' + esc(src.slice(0, e + 2)) + '</span>'; i = e + 2; st.com = false;
    }
    if (/^\s*#/.test(src.slice(i))) return out + '<span class="p">' + esc(src.slice(i)) + '</span>';
    while (i < src.length) {
      rest = src.slice(i);
      if ((m = /^\/\/.*/.exec(rest))) { out += '<span class="c">' + esc(m[0]) + '</span>'; i += m[0].length; continue; }
      if (rest.slice(0, 2) === '/*') {
        var end = rest.indexOf('*/', 2);
        if (end < 0) { out += '<span class="c">' + esc(rest) + '</span>'; st.com = true; break; }
        out += '<span class="c">' + esc(rest.slice(0, end + 2)) + '</span>'; i += end + 2; continue;
      }
      if ((m = /^("([^"\\]|\\.)*"|'([^'\\]|\\.)*')/.exec(rest))) { out += '<span class="s">' + esc(m[0]) + '</span>'; i += m[0].length; continue; }
      if ((m = /^\d+(\.\d+)?f?/.exec(rest))) { out += '<span class="n">' + m[0] + '</span>'; i += m[0].length; continue; }
      if ((m = /^[A-Za-z_]\w*/.exec(rest))) {
        var w = m[0], after = src.slice(i + w.length);
        if (KW.test(w)) out += '<span class="k">' + w + '</span>';
        else if (TY.test(w)) out += '<span class="t">' + w + '</span>';
        else if (BI.test(w) && /^\s*\(/.test(after)) out += '<span class="b">' + w + '</span>';
        else if (w === 'NULL' || w === 'stdin') out += '<span class="n">' + w + '</span>';
        else out += w;
        i += w.length; continue;
      }
      out += esc(src.charAt(i)); i++;
    }
    return out;
  }
  function paint(pre) {
    if (pre.getAttribute('data-cc-done')) return;
    pre.setAttribute('data-cc-done', '1');
    var src = pre.textContent.replace(/^\n+|\s+$/g, ''), hl = (pre.getAttribute('data-hl') || '').split(',').map(Number), st = { com: false };
    pre.innerHTML = src.split('\n').map(function (l, k) { return '<span class="ln' + (hl.indexOf(k + 1) >= 0 ? ' hl' : '') + '">' + (line(l, st) || ' ') + '</span>'; }).join('');
  }
  function paintTerm(pre) {
    if (pre.getAttribute('data-cc-done')) return;
    pre.setAttribute('data-cc-done', '1');
    pre.innerHTML = pre.textContent.replace(/^\n+|\s+$/g, '').split('\n').map(function (l) {
      if (/^\$ /.test(l)) return '<span class="cmd"><span class="pr">$</span> ' + esc(l.slice(2)) + '</span>';
      if (/\berror:|\bwarning:/.test(l)) return '<span class="er">' + esc(l) + '</span>';
      return esc(l);
    }).join('\n');
  }
  function mount(root) {
    (root || document).querySelectorAll('pre.cc').forEach(paint);
    (root || document).querySelectorAll('pre.term').forEach(paintTerm);
  }
  R.cc = { mount: mount, highlight: function (l) { return line(l, { com: false }); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mount(); }); else mount();
  new MutationObserver(function (ms) {
    ms.forEach(function (m) { m.addedNodes.forEach(function (nd) { if (nd.nodeType === 1 && (nd.matches('pre.cc,pre.term') || nd.querySelector('pre.cc,pre.term'))) mount(nd.parentNode || nd); }); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
