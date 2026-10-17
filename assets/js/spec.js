/* Révisions S1 — mise en forme des spécifications de types abstraits (notation du cours TAA).

   REV.spec(texte, options) → '<pre class="spec">…</pre>'

   Le texte suit la mise en page du cours : un mot-clé de section seul sur sa ligne
   (types, sorte, utilise, opérations, préconditions, axiomes, avec ; en anglais types, uses, operations,
   preconditions, axioms, with), puis les lignes de la section.
   L'indentation commune est retirée, le reste de la mise en page est gardé tel quel.
   Raccourcis acceptés à la saisie : -> (→), => (⇒), != (≠), <= (≤), >= (≥) et, dans les profils,
   « x » entre deux types (×).
   Dans « opérations », le nom avant « : » est mis en valeur ; dans « préconditions » et « axiomes »,
   « est-défini-ssi » (« is-defined-iaoi ») et « ⇒ » le sont aussi.

   Options :
     roles: true  colore chaque opération selon son rôle, déduit de son profil et des types définis
                  (section « types » ou « sorte ») : constante (aucun argument), opération interne
                  (résultat de type défini), observateur (un argument de type défini, résultat prédéfini).
                  À éviter dans une question qui demande justement de classer les opérations.
     hl: [n, …]   numéros de lignes (à partir de 1, lignes du texte sans les lignes vides du début)
                  à surligner.
     cls: '…'     classes ajoutées au <pre>. */
(function () {
  'use strict';
  var R = window.REV;
  if (!R) return;
  var SECTION = /^(types?|sortes?|sorts?|utilise|uses|op[ée]rations|pr[ée]conditions|axiomes|axioms|avec|with)$/i;
  var T = R.t || function (s) { return s; };
  if (R.i18n) R.i18n.add({
    'constante : aucun argument': 'constant: no argument',
    'opération interne : résultat de type défini': 'internal operation: result of a defined type',
    'observateur : argument de type défini, résultat de type prédéfini': 'observer: argument of a defined type, result of a predefined type'
  });
  var ROLE_TITLE = { cst: T('constante : aucun argument'), int: T('opération interne : résultat de type défini'), obs: T('observateur : argument de type défini, résultat de type prédéfini') };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function sym(s) { return s.replace(/->/g, '→').replace(/=>/g, '⇒').replace(/!=/g, '≠').replace(/<=/g, '≤').replace(/>=/g, '≥'); }
  function norm(t) { return t.trim().toLowerCase(); }

  function role(profile, defined) {
    var p = profile.split('→');
    if (p.length < 2) return '';
    var args = p[0].replace(/ x /g, ' × ').split('×').map(norm).filter(Boolean), res = norm(p[1]);
    if (!args.length) return 'cst';
    if (defined[res]) return 'int';
    if (args.some(function (a) { return defined[a]; })) return 'obs';
    return '';
  }

  function spec(text, opts) {
    opts = opts || {};
    var lines = String(text == null ? '' : text).replace(/\t/g, '    ').replace(/^\s*\n/, '').replace(/\s+$/, '').split('\n');
    var ind = Infinity, defined = {}, sec = '';
    lines.forEach(function (l) {
      if (l.trim()) ind = Math.min(ind, l.match(/^ */)[0].length);
      var t = l.trim();
      if (SECTION.test(t)) sec = t.toLowerCase();
      else if (/^(types?|sortes?|sorts?)$/.test(sec)) t.split(/[,;]/).forEach(function (n) { if (n.trim()) defined[norm(n)] = 1; });
    });
    if (ind === Infinity) ind = 0;
    var hl = {};
    (opts.hl || []).forEach(function (n) { hl[n] = 1; });
    sec = '';
    var out = lines.map(function (raw, k) {
      var l = raw.slice(ind), t = l.trim(), h;
      if (!t) return '';
      if (SECTION.test(t)) { sec = t.toLowerCase(); h = l.replace(t, '<span class="sp-k">' + esc(t) + '</span>'); }
      else {
        h = esc(sym(l));
        if (/^op/.test(sec)) {
          var rl = opts.roles ? role(sym(t.slice(t.indexOf(':') + 1)), defined) : '';
          h = h.replace(/^(\s*)([^:]*?\S)(\s*):(\s*)/, function (m, a, name, b, c) {
            return a + '<span class="sp-op' + (rl ? ' sp-' + rl : '') + '"' + (rl ? ' title="' + ROLE_TITLE[rl] + '"' : '') + '>' + name + '</span>' + b + '<span class="sp-c">:</span>' + c;
          });
          h = h.replace(/ x /g, ' × ');
        }
        if (/^pr|^ax/.test(sec)) h = h.replace(/est-défini-ssi|is-defined-iaoi/g, function (k) { return '<span class="sp-kw">' + k + '</span>'; }).replace(/⇒/g, '<span class="sp-kw">⇒</span>');
      }
      return hl[k + 1] ? '<span class="sp-hl">' + h + '</span>' : h;
    });
    return '<pre class="spec' + (opts.cls ? ' ' + opts.cls : '') + '">' + out.join('\n') + '</pre>';
  }

  /* Monte tous les <pre data-spec> d'une page (le texte du <pre> est la spécification ;
     data-roles="1" pour colorer les rôles, data-hl="3,4" pour surligner des lignes). */
  function mountAll(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('pre[data-spec]'), function (pre) {
      if (pre.dataset.specDone) return;
      var hl = (pre.getAttribute('data-hl') || '').split(',').map(Number).filter(Boolean);
      var wrap = document.createElement('div');
      wrap.innerHTML = spec(pre.textContent, { roles: pre.getAttribute('data-roles') === '1', hl: hl, cls: pre.getAttribute('data-cls') || '' });
      var out = wrap.firstChild;
      out.dataset.specDone = '1'; // pas « data-done » : réservé aux boutons « J’ai compris »
      if (pre.getAttribute('aria-label')) out.setAttribute('aria-label', pre.getAttribute('aria-label'));
      pre.parentNode.replaceChild(out, pre);
    });
  }

  R.spec = spec;
  R.spec.mount = mountAll;
  R.spec.role = role;
})();
